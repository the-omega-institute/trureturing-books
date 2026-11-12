#!/usr/bin/env node
// Browser regression suite for SHIFT//RULE (books/quantum-geometry/viz/parameter-shift/).
//   node books/quantum-geometry/viz/tests/parameter-shift.test.mjs      (or: node tools/node/viz-test.mjs quantum-geometry)
// The page turns a Bloch vector and takes a dot product, and gets the tangent slope from the commutator formula on
// 2 × 2 density matrices. The suite works with state vectors instead: |ψ₀⟩ from the Bloch vector, U = e^{−iθY/2}
// applied to it, f = ⟨ψ|m·σ|ψ⟩; slopes come from a Richardson-extrapolated numerical derivative of that f; the shot
// estimates are recomputed from the page's raw counts and their scatter compared with the binomial variance.
// It reads the page through window.SHIFT_DEBUG.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'parameter-shift';
const T = await session();
const { check } = T;
const PI = Math.PI, DEG = PI / 180, Q = PI / 2;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;

/* ---------- independent model: state vectors ---------- */
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
const conj = (a) => [a[0], -a[1]];
/** The pure state with Bloch vector r (unit). */
function ket(r) {
  const al = Math.acos(Math.max(-1, Math.min(1, r[2]))), be = Math.atan2(r[1], r[0]);
  return [[Math.cos(al / 2), 0], [Math.sin(al / 2) * Math.cos(be), Math.sin(al / 2) * Math.sin(be)]];
}
/** e^{−iθY/2} = [[c, −s], [s, c]] (real). */
const evolve = (v, th) => { const c = Math.cos(th / 2), s = Math.sin(th / 2); return [cadd([c * v[0][0], c * v[0][1]], [-s * v[1][0], -s * v[1][1]]), cadd([s * v[0][0], s * v[0][1]], [c * v[1][0], c * v[1][1]])]; };
/** ⟨ψ| m·σ |ψ⟩ with m·σ = [[mz, mx − i my], [mx + i my, −mz]]. */
function expect(v, m) {
  const A = [[[m[2], 0], [m[0], -m[1]]], [[m[0], m[1]], [-m[2], 0]]];
  const Av = [cadd(cmul(A[0][0], v[0]), cmul(A[0][1], v[1])), cadd(cmul(A[1][0], v[0]), cmul(A[1][1], v[1]))];
  return cadd(cmul(conj(v[0]), Av[0]), cmul(conj(v[1]), Av[1]))[0];
}
const fOf = (r0, m) => (th) => expect(evolve(ket(r0), th), m);
/** Richardson-extrapolated central difference. */
const deriv = (f, x) => { const d = (h) => (f(x + h) - f(x - h)) / (2 * h); return (4 * d(1e-4) - d(2e-4)) / 3; };
const meanSd = (xs) => { const n = xs.length, m = xs.reduce((a, x) => a + x, 0) / n; return [m, Math.sqrt(xs.reduce((a, x) => a + (x - m) ** 2, 0) / (n - 1))]; };

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.SHIFT_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const plays = () => until(page, () => { const s = window.SHIFT_DEBUG.state; return s.playing && s.t > 0; });
const seek = async (t) => { await page.evaluate((x) => window.SHIFT_DEBUG.seek(x), t); await settle(page); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };

// SHIFT ±90°: the example of Chapter 12
let s = await state();
const fz = fOf([0, 0, 1], [0, 0, 1]);
check('opens on SHIFT ±90° with f = cos θ at θ = 60°', s.preset === 'shift' && s.scene === 'curve' && s.model === 'z' && close(s.theta, PI / 3, 1e-12));
check('SHIFT: f(60°) = 1/2, f(150°) = −√3/2, f(−30°) = √3/2 (state vectors)', close(s.f, 0.5, 1e-12) && close(s.fPlus, -Math.sqrt(3) / 2, 1e-12) && close(s.fMinus, Math.sqrt(3) / 2, 1e-12)
  && close(fz(PI / 3), s.f, 1e-12) && close(fz(5 * PI / 6), s.fPlus, 1e-12) && close(fz(-PI / 6), s.fMinus, 1e-12));
check('SHIFT: half the difference is −√3/2 ≈ −0.8660254038', close(s.shift, -0.8660254038, 1e-10));
check('SHIFT: the commutator slope equals the numerical derivative of the state-vector f', close(s.slope, deriv(fz, PI / 3), 1e-8) && close(s.slope, -Math.sin(PI / 3), 1e-12));
check('SHIFT: the HUD and the key readout print −0.8660', (await page.textContent('#hudSub')).includes('−0.8660') && (await page.textContent('#ro .key')).includes('−0.866025'));

// the magenta chord as drawn: the canvas calls of one synchronous repaint are intercepted and the segment is read off
// them, then compared with the two sampled points (θ ∓ h, f(θ ∓ h)) placed in pixels from the state-vector f
/** Every solid magenta two-point stroke on the stage canvas during one repaint, in viewport pixels. */
const magentaSegments = () => page.evaluate(() => {
  const C = CanvasRenderingContext2D.prototype, keep = { beginPath: C.beginPath, moveTo: C.moveTo, lineTo: C.lineTo, stroke: C.stroke };
  const cv = document.getElementById('cv'), probe = document.createElement('canvas').getContext('2d'), paths = new Map(), out = [];
  probe.strokeStyle = TRV.palette.magenta;
  C.beginPath = function () { paths.set(this, []); return keep.beginPath.call(this); };
  C.moveTo = function (x, y) { if (!paths.has(this)) paths.set(this, []); paths.get(this).push([[x, y]]); return keep.moveTo.call(this, x, y); };
  C.lineTo = function (x, y) { const p = paths.get(this); if (p && p.length) p[p.length - 1].push([x, y]); return keep.lineTo.call(this, x, y); };
  C.stroke = function (...a) { if (this.canvas === cv && this.strokeStyle === probe.strokeStyle && !this.getLineDash().length) out.push((paths.get(this) || []).map((sp) => sp.slice())); return keep.stroke.apply(this, a); };
  try { TRV.kit.flush(); } finally { Object.assign(C, keep); }
  const r = cv.getBoundingClientRect();
  return out.filter((sp) => sp.length === 1 && sp[0].length === 2).map((sp) => sp[0].map(([x, y]) => [r.left + x, r.top + y]));
});
/** Pixels of the curve plot, anchored on its points at θ = 0 and θ = π, where f = cos θ is 1 and −1. */
const pixelMap = async () => {
  const [a, b] = await page.evaluate(() => [window.SHIFT_DEBUG.curvePoint(0), window.SHIFT_DEBUG.curvePoint(Math.PI)]);
  return { X: (x) => a[0] + (b[0] - a[0]) * x / PI, Y: (y) => a[1] + (b[1] - a[1]) * (1 - y) / 2, y: (py) => 1 - 2 * (py - a[1]) / (b[1] - a[1]) };
};
const offLine = ([[x0, y0], [x1, y1]], [x, y]) => Math.abs((y1 - y0) * (x - x0) - (x1 - x0) * (y - y0)) / Math.hypot(x1 - x0, y1 - y0);
/** The drawn chord at θ (the longest magenta segment across θ) and how far the two samples at θ ∓ h lie from its line. */
async function chord(th, h) {
  const m = await pixelMap(), xt = m.X(th), segs = await magentaSegments();
  const c = segs.filter((sg) => Math.min(sg[0][0], sg[1][0]) < xt && Math.max(sg[0][0], sg[1][0]) > xt).sort((u, v) => Math.abs(v[1][0] - v[0][0]) - Math.abs(u[1][0] - u[0][0]))[0];
  if (!c) return { off: Infinity, spans: false, msg: 'no magenta segment across θ' };
  const pts = [th - h, th + h].map((x) => [m.X(x), m.Y(fz(x))]), at = (px) => m.y(c[0][1] + (c[1][1] - c[0][1]) * (px - c[0][0]) / (c[1][0] - c[0][0]));
  return { off: Math.max(...pts.map((p) => offLine(c, p))), spans: Math.min(c[0][0], c[1][0]) <= pts[0][0] + 0.5 && Math.max(c[0][0], c[1][0]) >= pts[1][0] - 0.5,
    msg: `drawn line at θ ∓ h: ${at(pts[0][0]).toFixed(4)}, ${at(pts[1][0]).toFixed(4)}; samples ${fz(th - h).toFixed(4)}, ${fz(th + h).toFixed(4)}` };
}
check('the pixel anchors: f(0) = 1 and f(π) = −1 for the state-vector f = cos θ', close(fz(0), 1, 1e-12) && close(fz(PI), -1, 1e-12));
// the SHIFT card does not draw the small-step chord (the text has not met it yet), so the chord is read on SMALL STEP,
// which stands at the same θ = 60° with the same h = 30°
await pick('step'); await seek(PI + PI / 3); s = await state();
let ch = await chord(s.theta, 30 * DEG);
check('SMALL STEP at θ = 60°: the magenta chord on the canvas joins the samples (30°, √3/2) and (90°, 0) and reaches both', s.focus === 'step' && close(s.theta, PI / 3, 1e-12) && ch.off < 0.75 && ch.spans && close(fz(PI / 6), Math.sqrt(3) / 2, 1e-12) && close(fz(PI / 2), 0, 1e-12), `${ch.msg}; ${ch.off.toFixed(2)} px off`);
// an extremum: at θ = 0 the slope is 0, and so is the small-step difference f′(θ)·sin h / h
await seek(PI); s = await state();
const h30r = 30 * DEG;
check('θ = 0: the commutator slope, half the ±90° difference and the ±30° difference are all 0, like the state-vector derivative', close(s.theta, 0, 1e-12) && Math.abs(s.slope) < 1e-12 && Math.abs(s.shift) < 1e-12 && Math.abs(s.fd) < 1e-12
  && Math.abs(deriv(fz, 0)) < 1e-8 && Math.abs((fz(h30r) - fz(-h30r)) / (2 * h30r)) < 1e-12);
ch = await chord(s.theta, h30r);
check('θ = 0: the chord is level at cos 30° through both samples, not at the top of the curve', ch.off < 0.75 && ch.spans, `${ch.msg}; ${ch.off.toFixed(2)} px off`);
let ro = await page.textContent('#ro'), rn = await page.textContent('#roNote');
check('θ = 0 (zh): no difference / slope ratio is shown as computed, and the note says both are 0', ro.includes('斜率为 0，没有比值') && !ro.includes('差分 / 斜率') && rn.includes('同为 0'), `${ro} | ${rn}`);
await page.click('[data-lang-set="en"]'); await settle(page);
ro = await page.textContent('#ro'); rn = await page.textContent('#roNote');
check('θ = 0 (en): the same in English', ro.includes('slope 0: no ratio') && !ro.includes('difference / slope') && rn.includes('both 0'), `${ro} | ${rn}`);
await page.click('[data-lang-set="zh"]'); await settle(page);
await seek(PI + PI / 3); await setRange('h', 90); s = await state();
ch = await chord(s.theta, 90 * DEG);
check('h = 90°: the chord reaches the two cyan settings θ ± 90° and passes through both', s.h === 90 && ch.off < 0.75 && ch.spans, `${ch.msg}; ${ch.off.toFixed(2)} px off`);
await pick('shift');
check('SHIFT plays by itself when clicked', await plays());
// the card runs from 0° to 60°; bring the playing clock to 58° instead of waiting out the whole sweep, then let the page stop itself
const near = await page.evaluate(() => { const d = window.SHIFT_DEBUG, t = d.state; if (t.playing) d.scrub(Math.max(t.t, Math.PI + Math.PI / 3 - 2 * Math.PI / 180)); return d.state; });
check('SHIFT is still short of 60° and playing after the jump to 58° (or has already stopped by itself)', near.playing ? near.theta < Math.PI / 3 - 1e-6 : Math.abs(near.theta - Math.PI / 3) < 1e-9, String(near.theta));
check('SHIFT stops at θ = 60° by itself', await until(page, () => { const s = window.SHIFT_DEBUG.state; return !s.playing && Math.abs(s.theta - Math.PI / 3) < 1e-9; }));

// ANY ANGLE: the tilted case, a full sweep
await pick('anywhere');
check('ANY ANGLE plays by itself', await plays());
await seek(2 * PI * 0.83); s = await state();
const ft = fOf(s.r0, s.m);
check('ANY ANGLE: r₀ = (0.48, 0.60, 0.64), m = (0.80, 0.36, 0.48), unit vectors', s.model === 'tilt' && close(Math.hypot(...s.r0), 1, 1e-12) && close(Math.hypot(...s.m), 1, 1e-12));
const c0 = (ft(0) + ft(PI)) / 2, a0 = (ft(0) - ft(PI)) / 2, b0 = (ft(Q) - ft(-Q)) / 2;
check('ANY ANGLE: c, a, b from the state-vector f at 0, ±90°, 180° match the page (0.216, 0.6912, 0.2816)', close(s.coeffs.c, c0, 1e-12) && close(s.coeffs.a, a0, 1e-12) && close(s.coeffs.b, b0, 1e-12) && close(c0, 0.216, 1e-12) && close(a0, 0.6912, 1e-12) && close(b0, 0.2816, 1e-12));
let worstF = 0; for (let i = 0; i <= 90; i++) { const x = -PI + 2 * PI * i / 90; worstF = Math.max(worstF, Math.abs(ft(x) - (c0 + a0 * Math.cos(x) + b0 * Math.sin(x)))); }
check('ANY ANGLE: f has only a constant and the first harmonic (91 angles)', worstF < 1e-12, String(worstF));
const sw = await page.evaluate(() => window.SHIFT_DEBUG.sweep(72));
let worstShift = 0, worstSlope = 0;
for (const [x, sh, sl] of sw) { const d = deriv(ft, x); worstShift = Math.max(worstShift, Math.abs(sh - d), Math.abs((ft(x + Q) - ft(x - Q)) / 2 - d)); worstSlope = Math.max(worstSlope, Math.abs(sl - d)); }
check('ANY ANGLE: half the ±90° difference equals the slope at 73 angles of a full turn', worstShift < 1e-8, String(worstShift));
check('ANY ANGLE: the commutator slope equals the numerical derivative at the same angles', worstSlope < 1e-8, String(worstSlope));
check('ANY ANGLE: the page state agrees at the current angle', close(s.shift, deriv(ft, s.theta), 1e-8) && close(s.f, ft(s.theta), 1e-12));

// SMALL STEP: the ±30° chord is short by the factor sin h / h
await pick('step');
check('SMALL STEP plays by itself', await plays());
await seek(PI / 3 + PI); s = await state();
const h30 = 30 * DEG, fd30 = (fz(PI / 3 + h30) - fz(PI / 3 - h30)) / (2 * h30);
check('SMALL STEP: h = 30°, the difference −0.8270 is 4.5% short of the slope (sin h / h = 0.9549)', s.h === 30 && close(s.fd, fd30, 1e-12) && close(s.fd, -0.8270, 5e-5) && close(s.fd / s.slope, 0.9549, 5e-5));
let worstRatio = 0; for (const [x, , sl, fd] of await page.evaluate(() => window.SHIFT_DEBUG.sweep(36))) if (Math.abs(sl) > 1e-3) worstRatio = Math.max(worstRatio, Math.abs(fd / sl - Math.sin(h30) / h30));
check('SMALL STEP: the same factor at every angle of the sweep', worstRatio < 1e-9, String(worstRatio));
await setRange('h', 3); s = await state();
const err3 = Math.abs(s.fd - deriv(fz, s.theta)), err30 = Math.abs(fd30 - deriv(fz, PI / 3));
const h3 = 3 * DEG, ratioExp = (1 - Math.sin(h30) / h30) / (1 - Math.sin(h3) / h3);
check('the step slider: h = 3° leaves the card and the error shrinks about 100-fold (like h²), never to zero', s.h === 3 && s.preset === null && err3 > 1e-6 && Math.abs(err30 / err3 / ratioExp - 1) < 1e-3 && err30 / err3 > 95 && err30 / err3 < 101, `${err30 / err3}`);
await page.click('#modelChips [data-model="tilt"]'); s = await state();
check('the curve chips switch to the tilted state and axis', s.model === 'tilt' && close(s.f, ft(s.theta), 1e-12));
await page.click('#modelChips [data-model="z"]');

// SHOTS: the counts, the estimates and their scatter
await pick('noise');
check('SHOTS plays by itself', await plays());
await seek(200); s = await state();
check('SHOTS: θ = 60°, N = 100, h = 6°, 200 trials', s.scene === 'shots' && close(s.theta, PI / 3, 1e-12) && s.N === 100 && s.h === 6 && s.trials === 200);
let smp = await page.evaluate(() => window.SHIFT_DEBUG.samples());
const h6 = 6 * DEG;
const recon = (k, N) => { const m = k.map((n) => 2 * n / N - 1); return [(m[0] - m[1]) / 2, (m[2] - m[3]) / (2 * h6)]; };
let worstRec = 0; smp.k.forEach((k, i) => { const [e, d] = recon(k, 100); worstRec = Math.max(worstRec, Math.abs(e - smp.est[i]), Math.abs(d - smp.fd[i])); });
check('SHOTS: every estimate is recomputed from the raw counts of +1', smp.k.length === 200 && worstRec < 1e-12, String(worstRec));
const angles = [PI / 3 + Q, PI / 3 - Q, PI / 3 + h6, PI / 3 - h6], pr = angles.map((x) => (1 + fz(x)) / 2);
let worstFreq = 0; for (let j = 0; j < 4; j++) { const fr = smp.k.reduce((a, k) => a + k[j], 0) / (200 * 100); worstFreq = Math.max(worstFreq, Math.abs(fr - pr[j]) / Math.sqrt(pr[j] * (1 - pr[j]) / 20000)); }
check('SHOTS: the share of +1 at each setting is (1 + f)/2 within 4 standard errors', worstFreq < 4, String(worstFreq));
const sdS = Math.sqrt((1 - fz(angles[0]) ** 2) + (1 - fz(angles[1]) ** 2)) / 20, sdF = Math.sqrt((1 - fz(angles[2]) ** 2) + (1 - fz(angles[3]) ** 2)) / (2 * h6 * 10);
check('SHOTS: predicted widths 0.0354 and 0.5826, ratio 16.5', close(s.shots.sdShift, sdS, 1e-12) && close(s.shots.sdFd, sdF, 1e-12) && close(sdS, 0.0354, 5e-5) && close(sdF, 0.5826, 5e-5) && close(sdF / sdS, 16.5, 0.05));
const [mS, ssS] = meanSd(smp.est), [mF, ssF] = meanSd(smp.fd);
check('SHOTS: both clouds centre on the slope −0.866 within 4 standard errors', Math.abs(mS + Math.sqrt(3) / 2) < 4 * sdS / Math.sqrt(200) && Math.abs(mF - (fz(PI / 3 + h6) - fz(PI / 3 - h6)) / (2 * h6)) < 4 * sdF / Math.sqrt(200), `${mS} ${mF}`);
check('SHOTS: the measured widths are within 20% of the predicted ones, and the page reports the same', Math.abs(ssS / sdS - 1) < 0.2 && Math.abs(ssF / sdF - 1) < 0.2 && close(s.shots.sd, ssS, 1e-12) && close(s.shots.fdSd, ssF, 1e-12), `${ssS} ${ssF}`);
check('SHOTS: dots that fall off the gauge (|value| > 3.2) are counted', s.offGauge === smp.fd.filter((v) => Math.abs(v) > 3.2).length);
const offRaw = smp.k.map((k) => recon(k, 100)[1]).filter((v) => Math.abs(v) > 3.2).length;
check('SHOTS (seed 1): none of the 200 small-step dots falls off the ±3.2 gauge (recounted from the raw counts), and the card note says none does', offRaw === 0 && s.offGauge === 0 && !(await page.textContent('#presetNote')).includes('落出'), `${offRaw} ${s.offGauge}`);
await page.click('#shotChips [data-shots="10"]'); await settle(page); await setRange('h', 1); s = await state();
const smp10 = await page.evaluate(() => window.SHIFT_DEBUG.samples());
const off10 = smp10.k.filter((k) => Math.abs((2 * k[2] / 10 - 1) - (2 * k[3] / 10 - 1)) / (2 * DEG) > 3.2).length;
check('N = 10, h = 1°: dots that do fall off the gauge are counted, recounted here from the raw counts', s.N === 10 && s.h === 1 && s.trials === 200 && smp10.k.length === 200 && off10 > 0 && s.offGauge === off10, `${s.offGauge} ${off10}`);
await setRange('h', 6);
await page.click('#shotChips [data-shots="1000"]'); s = await state();
smp = await page.evaluate(() => window.SHIFT_DEBUG.samples());
check('the shots chips: N = 1000 narrows both predicted widths by √10 and leaves the card', s.N === 1000 && close(s.shots.sdShift, sdS / Math.sqrt(10), 1e-12) && close(s.shots.sdFd, sdF / Math.sqrt(10), 1e-12) && s.preset === null);
check('N = 1000: the measured width of the ±90° cloud is within 20% of the prediction', Math.abs(meanSd(smp.est)[1] / (sdS / Math.sqrt(10)) - 1) < 0.2);
const before = smp.k[0].join();
await page.click('#redraw'); s = await state();
check('Redraw draws new shots', s.seed === 2 && (await page.evaluate(() => window.SHIFT_DEBUG.samples())).k[0].join() !== before);
await page.keyboard.press('Home'); s = await state();
check('Home in the shots scene goes back to 0 trials', s.trials === 0);

// dragging the curve and the dial sets θ
await page.click('#sceneChips [data-scene="curve"]'); await pick('shift'); await until(page, () => !window.SHIFT_DEBUG.state.playing);
let pt = await page.evaluate(() => window.SHIFT_DEBUG.curvePoint(-1));
await page.mouse.move(pt[0], pt[1]); await page.mouse.down(); await page.mouse.up(); s = await state();
check('clicking the curve at θ = −1 rad moves the angle there', Math.abs(s.theta + 1) < 0.02 && s.preset === null, String(s.theta));
pt = await page.evaluate(() => window.SHIFT_DEBUG.dialPoint(Math.sin(2), Math.cos(2)));
await page.mouse.move(pt[0], pt[1]); await page.mouse.down(); await page.mouse.up(); s = await state();
check('clicking the dial at the arrow direction 2 rad sets θ = 2', Math.abs(s.theta - 2) < 0.02 && close(s.f, Math.cos(s.theta), 1e-12), String(s.theta));

// scenes, rail and keyboard
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('2'); check('key 2 opens the shots scene', (await state()).scene === 'shots');
await page.keyboard.press('1'); s = await state(); check('key 1 opens the curve scene and keeps θ', s.scene === 'curve' && Math.abs(s.theta - 2) < 0.02);
await page.keyboard.press('Home'); check('Home goes to θ = −180°', close((await state()).theta, -PI, 1e-9));
await page.keyboard.press('ArrowRight'); check('→ steps 15°', close((await state()).theta, -PI + 15 * DEG, 1e-9));
await page.keyboard.press('End'); check('End goes to θ = 180°', close((await state()).theta, PI, 1e-9));
await page.click('#rew'); check('⏮ goes back to θ = −180°', close((await state()).theta, -PI, 1e-9));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.SHIFT_DEBUG.state.t > 0));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
await setRange('now', PI + 1); s = await state();
check('the rail sets θ and the readouts follow', close(s.theta, 1, 1e-9) && close(s.shift, -Math.sin(1), 1e-12));

// English
// the printed stills of SHIFT and SMALL STEP (opened as viz-thumbs.mjs does) tell different things: SHIFT hides the
// small-step chord, which the text has not met yet; SMALL STEP marks the chord and the gap of its bar to the tangent
{
  const shot = await T.goto(BOOK, ID, '?shot=1&lang=zh&preset=shift', await T.newPage());
  const look = async () => { await settle(shot); return shot.evaluate(() => ({ s: window.SHIFT_DEBUG.state, tags: Array.from(document.querySelectorAll('#stage .tag')).filter((e) => !e.hidden).map((e) => e.textContent), legend: document.getElementById('legend').textContent, ticks: null })); };
  let v = await look();
  check('SHIFT still: θ = 60°, the two cyan values are labelled, and nothing names the small step', v.s.focus === 'shift' && close(v.s.theta, PI / 3, 1e-12)
    && v.tags.includes(`f(θ+90°) ${fz(PI / 3 + Q).toFixed(3).replace('-', '−')}`) && v.tags.includes(`f(θ−90°) ${fz(PI / 3 - Q).toFixed(3).replace('-', '−')}`)
    && !v.tags.some((x) => x.includes('弦') || x.includes('30°')) && !v.legend.includes('小步长'), `${v.tags.join(' | ')} / ${v.legend}`);
  await T.goto(BOOK, ID, '?shot=1&lang=zh&preset=step', shot); v = await look();
  const gap = 100 * Math.abs(1 - fd30 / deriv(fz, PI / 3));
  check('SMALL STEP still: the chord is named and the gauge marks the gap the suite computes (4.5%)', v.s.focus === 'step' && close(v.s.theta, PI / 3, 1e-12)
    && v.tags.includes('±30° 的弦') && v.tags.includes(`短 ${gap.toFixed(1)}%`) && gap.toFixed(1) === '4.5' && v.legend.includes('小步长'), `${gap} / ${v.tags.join(' | ')}`);
  await shot.close();
}
await page.click('[data-lang-set="en"]'); await pick('noise'); await seek(200);
check('English: the HUD reads “200 trials · 100 shots each”', (await page.textContent('#hudBig')).trim() === '200 trials · 100 shots each');
check('English: the SHOTS note does not claim dots off the gauge', !(await page.textContent('#presetNote')).includes('off the gauge'));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
