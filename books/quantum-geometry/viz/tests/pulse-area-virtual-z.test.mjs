#!/usr/bin/env node
// Browser regression suite for PULSE//AREA (books/quantum-geometry/viz/pulse-area-virtual-z/).
//   node books/quantum-geometry/viz/tests/pulse-area-virtual-z.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// The page turns Bloch vectors with unit quaternions and, for detuned pulses, multiplies slices in time order. The
// suite recomputes everything another way: complex state vectors and 2 × 2 complex matrices driven by the
// time-dependent Schrödinger equation i dψ/dt = H(t)ψ, H = ½(Ω(t)(cos φ X + sin φ Y) + ΔZ), integrated with classical
// Runge–Kutta; pulse areas by Simpson's rule on the envelope; the virtual-Z identity by matrix products. It reads the
// page only through window.PULSE_DEBUG and never calls the page's model.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'pulse-area-virtual-z';
const T = await session();
const { check } = T;
const PI = Math.PI, DEG = PI / 180, W0 = 2 * PI * 5, MHZ = 2 * PI / 1000;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const vdist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

/* ---------- independent model ---------- */
const G0 = Math.exp(-4.5);
const SHAPE = {
  square: () => 1,
  gauss: (tau, Tp) => { const s = Tp / 6; return (Math.exp(-((tau - Tp / 2) ** 2) / (2 * s * s)) - G0) / (1 - G0); }
};
function simpson(f, a, b, n = 20000) { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; }
// complex numbers as [re, im]; a state is [a, b]; a matrix is [[m00, m01], [m10, m11]]
const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]], ca = (a, b) => [a[0] + b[0], a[1] + b[1]], cs = (a, k) => [a[0] * k, a[1] * k];
const blochOf = ([a, b]) => { const ab = cm([a[0], -a[1]], b); return [2 * ab[0], 2 * ab[1], a[0] ** 2 + a[1] ** 2 - b[0] ** 2 - b[1] ** 2]; };
const stateOf = (r) => { const th = Math.acos(Math.max(-1, Math.min(1, r[2]))), ph = Math.atan2(r[1], r[0]); return [[Math.cos(th / 2), 0], [Math.sin(th / 2) * Math.cos(ph), Math.sin(th / 2) * Math.sin(ph)]]; };
/** −iHψ for H = ½[[Δ, Ω e^(−iφ)], [Ω e^(iφ), −Δ]]. */
function deriv(psi, om, phi, det) {
  const e1 = [Math.cos(phi), -Math.sin(phi)], e2 = [Math.cos(phi), Math.sin(phi)];
  const h0 = ca(cs(psi[0], det / 2), cs(cm(e1, psi[1]), om / 2)), h1 = ca(cs(cm(e2, psi[0]), om / 2), cs(psi[1], -det / 2));
  return [[h0[1], -h0[0]], [h1[1], -h1[0]]];
}
const axpy = (psi, k, h) => [ca(psi[0], cs(k[0], h)), ca(psi[1], cs(k[1], h))];
/** RK4 through one pulse from local time 0 to tau. */
function rk4(psi, p, tau, steps) {
  const n = Math.max(1, Math.ceil(steps * tau / p.T)), h = tau / n, om = (t) => p.A * SHAPE[p.shape](t, p.T);
  for (let i = 0; i < n; i++) {
    const t = i * h, k1 = deriv(psi, om(t), p.phi, p.det), k2 = deriv(axpy(psi, k1, h / 2), om(t + h / 2), p.phi, p.det);
    const k3 = deriv(axpy(psi, k2, h / 2), om(t + h / 2), p.phi, p.det), k4 = deriv(axpy(psi, k3, h), om(t + h), p.phi, p.det);
    psi = [0, 1].map((j) => ca(psi[j], cs(ca(ca(k1[j], cs(k2[j], 2)), ca(cs(k3[j], 2), k4[j])), h / 6)));
  }
  return psi;
}
/** A program from the page's settings: the hardware ('main') or the compared path. */
function program(s, kind) {
  const ph = (s.two ? [s.phi, s.phi2] : [s.phi]);
  let phases = ph.map((p) => p - s.sign * s.lam), shape = s.shape, A = s.peak, det = s.det * MHZ, pre = 0;
  if (kind === 'two') phases = phases.slice().reverse();
  if (kind === 'lam') { phases = ph; pre = s.lam * DEG; }
  if (kind === 'det') det = 0;
  if (kind === 'gauss') { shape = 'square'; A = s.areaSet / s.T; }
  return { pre, pulses: phases.map((p, i) => ({ t0: i * s.T, T: s.T, shape, A, phi: p * DEG, det })) };
}
/** The state at time t: an instantaneous Rz(pre) first (the literal circuit only), then the pulses in order. */
function run(s, kind, t, steps = 4000) {
  const pr = program(s, kind), r0 = s.r0;
  let psi = stateOf(r0);
  if (pr.pre) psi = [cm([Math.cos(pr.pre / 2), -Math.sin(pr.pre / 2)], psi[0]), cm([Math.cos(pr.pre / 2), Math.sin(pr.pre / 2)], psi[1])];
  for (const p of pr.pulses) { const tau = Math.max(0, Math.min(p.T, t - p.t0)); if (tau > 0) psi = rk4(psi, p, tau, steps); }
  return blochOf(psi);
}
/** Re tr U / 2 of the hardware propagator at t (the page's angle is 2 arccos of it): columns of U by RK4. */
function traceHalf(s, t) {
  const pr = program(s, 'main');
  let c0 = [[1, 0], [0, 0]], c1 = [[0, 0], [1, 0]];
  for (const p of pr.pulses) { const tau = Math.max(0, Math.min(p.T, t - p.t0)); if (tau > 0) { c0 = rk4(c0, p, tau, 4000); c1 = rk4(c1, p, tau, 4000); } }
  return (c0[0][0] + c1[1][0]) / 2;
}
const rotZ = (r, a) => [r[0] * Math.cos(a) - r[1] * Math.sin(a), r[0] * Math.sin(a) + r[1] * Math.cos(a), r[2]];
// 2 × 2 matrices for the virtual-Z identity
const mm = (A, B) => [0, 1].map((i) => [0, 1].map((j) => ca(cm(A[i][0], B[0][j]), cm(A[i][1], B[1][j]))));
const Rz = (l) => [[[Math.cos(l / 2), -Math.sin(l / 2)], [0, 0]], [[0, 0], [Math.cos(l / 2), Math.sin(l / 2)]]];
const Rphi = (phi, th) => { const c = Math.cos(th / 2), s = Math.sin(th / 2); return [[[c, 0], cm([0, -s], [Math.cos(phi), -Math.sin(phi)])], [cm([0, -s], [Math.cos(phi), Math.sin(phi)]), [c, 0]]]; };
const mdiff = (A, B) => Math.max(...[0, 1].flatMap((i) => [0, 1].map((j) => Math.hypot(A[i][j][0] - B[i][j][0], A[i][j][1] - B[i][j][1]))));

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.PULSE_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const seek = async (t) => { await page.evaluate((x) => window.PULSE_DEBUG.seek(x), t); return state(); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };
const chip = async (sel) => { await page.click(sel); await settle(page); };
/** The largest distance between the page's main and compared states and the RK4 computation at the current time. */
function err(s) {
  let e = vdist(run(s, 'main', s.t), s.r);
  if (s.ghost) e = Math.max(e, vdist(run(s, s.ghost, s.t), s.ghostState.r));
  return e;
}

let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on the QUARTER card at its still frame t = 25 ns', s.preset === 'quarter' && close(s.t, 25) && !s.playing && close(s.max, 25));

// cards: the end states, recomputed
check('QUARTER: 10 MHz for 25 ns has area π/2 (Simpson)', close(s.peak, 2 * PI * 0.01, 1e-15) && close(simpson((t) => s.peak * SHAPE.square(t, 25), 0, 25), PI / 2, 1e-12) && close(s.area, PI / 2, 1e-12));
check('QUARTER: the north pole goes to −y, P(0) = 1/2, the propagator angle is π/2', vdist(s.r, [0, -1, 0]) < 1e-12 && close(s.P0, 0.5, 1e-12) && close(s.angle, PI / 2, 1e-9) && err(s) < 1e-9, `rk4 error ${err(s)}`);
await pick('gauss'); s = await seek(25);
const gArea = simpson((t) => s.peak * SHAPE.gauss(t, 25), 0, 25);
check('SAME-AREA: the Gaussian envelope has area π/2 (Simpson on the envelope)', close(gArea, PI / 2, 1e-10), `${gArea}`);
check('SAME-AREA: it ends at the same point as the square pulse of the same area', vdist(s.r, [0, -1, 0]) < 1e-9 && vdist(s.ghostState.r, [0, -1, 0]) < 1e-9 && s.ghost === 'gauss' && err(s) < 1e-8);
s = await seek(6);
check('SAME-AREA: at 6 ns the Gaussian is behind the evenly moving square pulse', s.area < s.ghostState.area - 0.2 && err(s) < 1e-8 && close(s.ghostState.area, PI / 2 * 6 / 25, 1e-12));
await pick('half'); s = await seek(25);
check('HALF-TURN: area π takes the north pole to the south pole, P(0) = 0', vdist(s.r, [0, 0, -1]) < 1e-12 && close(s.P0, 0, 1e-12) && err(s) < 1e-9);
await pick('detune'); s = await seek(25);
const miss = Math.acos(run(s, 'main', 25).reduce((a, x, i) => a + x * run(s, 'det', 25)[i], 0)) / DEG;
check('DETUNED: the time-ordered slices agree with Runge–Kutta to 1e-6', err(s) < 1e-6, `error ${err(s)}`);
check('DETUNED: the same area π/2 misses the undetuned end by about 26°', close(s.area, PI / 2, 1e-12) && miss > 25.5 && miss < 26.5 && vdist(s.ghostState.r, [0, -1, 0]) < 1e-9, `${miss.toFixed(2)}°`);
check('DETUNED: the note gives the miss the suite computes', (await page.textContent('#roNote')).includes(`${miss.toFixed(1)}°`));
s = await seek(12.5);
check('DETUNED: in mid-pulse the axis is tilted out of the equator', s.axis && s.axis[2] > 0.1 && s.axis[2] < 0.5);
await pick('order'); s = await seek(50);
check('SWAP-ORDER: X then Y takes the north pole to −y; Y then X takes it to +x', vdist(s.r, [0, -1, 0]) < 1e-9 && vdist(s.ghostState.r, [1, 0, 0]) < 1e-9 && s.ghost === 'two' && close(s.max, 50) && err(s) < 1e-8);
await pick('vz'); s = await seek(25);
check('VIRTUAL-Z: the pulse is sent at φ − λ = −90°', s.phys.length === 1 && close(s.phys[0], -90));
check('VIRTUAL-Z: from |+⟩ both the hardware path and the literal circuit reach the north pole, P(0) = 1', vdist(s.r, [0, 0, 1]) < 1e-9 && vdist(s.ghostState.r, [0, 0, 1]) < 1e-9 && close(s.P0, 1, 1e-12) && err(s) < 1e-8);
const plus = [[Math.SQRT1_2, 0], [Math.SQRT1_2, 0]], lit = mm(Rphi(0, PI / 2), Rz(PI / 2));
const out = [ca(cm(lit[0][0], plus[0]), cm(lit[0][1], plus[1])), ca(cm(lit[1][0], plus[0]), cm(lit[1][1], plus[1]))];
check('VIRTUAL-Z: matrices: R_x(π/2) R_z(π/2)|+⟩ = e^(−iπ/4)|0⟩', close(out[0][0], Math.SQRT1_2, 1e-12) && close(out[0][1], -Math.SQRT1_2, 1e-12) && Math.hypot(...out[1]) < 1e-12);
check('VIRTUAL-Z: the mark of the Z takes 0 ns: the analog time is the pulse alone', (await page.textContent('#roTime')).includes('25.0 ns') && close(s.max, 25));
await pick('sign'); s = await seek(25);
check('WRONG-SIGN: sent at φ + λ = +90° the state reaches the south pole, P(0) = 0, while the circuit means the north pole', close(s.phys[0], 90) && vdist(s.r, [0, 0, -1]) < 1e-9 && vdist(s.ghostState.r, [0, 0, 1]) < 1e-9 && close(s.P0, 0, 1e-12));
await pick('carrier'); s = await seek(0.3);
check('CARRIER: lab frame, no drive: |+⟩ has turned 1.5 times about z to −x after 0.3 ns', s.frame === 'lab' && close(s.area, 0) && vdist(s.lab, rotZ([1, 0, 0], W0 * 0.3)) < 1e-12 && vdist(s.lab, [-1, 0, 0]) < 1e-12);
check('CARRIER: the two poles stay put (eigenstates of H₀)', vdist(s.labPoles[0], [0, 0, 1]) < 1e-12 && vdist(s.labPoles[1], [0, 0, -1]) < 1e-12);
check('CARRIER: the rail runs 0.4 ns, two carrier periods', close(s.max, 0.4));

// free play: random settings against Runge–Kutta, rotating and lab frame, the angle of the propagator
const rnd = (() => { let a = 7; return () => { a = (a * 1103515245 + 12345) % 2147483648; return a / 2147483648; }; })();
let worst = 0, worstAng = 0, worstLab = 0, zSame = 0;
await pick('quarter');
for (let k = 0; k < 6; k++) {
  await chip(`#shapeChips [data-shape="${k % 2 ? 'gauss' : 'square'}"]`);
  await setRange('area', (0.2 + 1.6 * rnd()).toFixed(2)); await setRange('dur', (5 + 30 * rnd()).toFixed(1));
  await setRange('phase', 5 * Math.round((360 * rnd() - 180) / 5)); await setRange('det', k < 3 ? 0 : (0.5 * Math.round(20 * rnd() - 10)).toFixed(1));
  await setRange('lam', k === 2 || k === 5 ? 15 * Math.round((360 * rnd() - 180) / 15) : 0);
  await chip(`#twoChips [data-two="${k === 4 ? 1 : 0}"]`);
  await chip(`#frameChips [data-frame="${k % 3 === 1 ? 'lab' : 'rot'}"]`);
  s = await state();
  for (const f of [0.3, 0.71, 1]) {
    s = await seek(s.max * f);
    worst = Math.max(worst, err(s));
    const w = traceHalf(s, s.t); worstAng = Math.max(worstAng, Math.abs(2 * Math.acos(Math.max(-1, Math.min(1, w))) - s.angle));
    if (s.frame === 'lab') worstLab = Math.max(worstLab, vdist(s.lab, rotZ(run(s, 'main', s.t), (W0 - s.det * MHZ) * s.t)));
    if (s.ghost === 'lam') zSame = Math.max(zSame, Math.abs(s.r[2] - s.ghostState.r[2]), vdist(rotZ(s.r, s.lam * DEG), s.ghostState.r));
  }
}
check('free play: six random programs × three times: main and compared states agree with Runge–Kutta', worst < 1e-6, `max error ${worst}`);
check('free play: the angle of the propagator is 2 arccos(Re tr U / 2) of the RK4 propagator', worstAng < 1e-5, `max error ${worstAng}`);
check('free play: the lab frame is the rotating-frame solution turned by (ω₀ − Δ)t about z', worstLab < 1e-6, `max error ${worstLab}`);
check('virtual Z: the hardware end equals the literal circuit turned back by λ about z (same height, same P(0))', zSame < 1e-8, `max error ${zSame}`);
let ident = 0;
for (let k = 0; k < 20; k++) { const phi = 6 * rnd(), th = 6 * rnd(), l = 6 * rnd(); ident = Math.max(ident, mdiff(mm(Rphi(phi, th), Rz(l)), mm(Rz(l), Rphi(phi - l, th))), mdiff(mm(mm(Rz(l), Rphi(phi, th)), Rz(-l)), Rphi(phi + l, th))); }
check('matrices: R_φ(θ)R_z(λ) = R_z(λ)R_{φ−λ}(θ) and R_z(λ)R_φ(θ)R_z(−λ) = R_{φ+λ}(θ) (20 random cases, independent of the page)', ident < 1e-12);

// controls
await pick('quarter');
await setRange('area', 1); s = await state();
check('the area slider sets the area and leaves the card', close(s.areaSet, PI, 1e-12) && s.preset === null && close(s.peak, PI / 25, 1e-12));
await setRange('dur', 10); s = await state();
check('the duration slider sets T, the rail follows, the area is kept', close(s.T, 10) && close(s.max, 10) && close(s.areaSet, PI, 1e-12));
await setRange('phase', 45); s = await seek(5);
check('the phase slider turns the axis on the equator', s.axis && close(s.axis[0], Math.cos(PI / 4), 1e-12) && close(s.axis[1], Math.sin(PI / 4), 1e-12) && close(s.axis[2], 0));
await setRange('det', 3); s = await state();
check('the detuning slider tilts the axis', s.det === 3 && s.axis[2] > 0 && s.ghost === 'det');
await setRange('det', 0); await setRange('lam', 60); s = await state();
check('the virtual-Z slider shifts the pulse to φ − λ', close(s.phys[0], -15) && s.ghost === 'lam');
await chip('#signChips [data-sign="-1"]'); s = await state();
check('the sign chips choose φ + λ', s.sign === -1 && close(s.phys[0], 105));
await chip('#signChips [data-sign="1"]'); await setRange('lam', 0);
await chip('#twoChips [data-two="1"]'); s = await state();
check('the second-pulse chip doubles the rail', s.two && close(s.max, 20) && s.phys.length === 2 && close(s.phys[1], 90) && s.ghost === 'two');
await setRange('phase2', -30); await page.click('#swap'); await settle(page); s = await state();
check('the swap button exchanges the two phases', close(s.phi, -30) && close(s.phi2, 45));
await chip('#twoChips [data-two="0"]');
await chip('#shapeChips [data-shape="gauss"]'); s = await state();
check('the shape chips switch to the Gaussian, keeping the area', s.shape === 'gauss' && close(simpson((t) => s.peak * SHAPE.gauss(t, s.T), 0, s.T), PI, 1e-9));
await chip('#frameChips [data-frame="lab"]'); check('the frame chips switch to the lab frame', (await state()).frame === 'lab');
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('f'); await settle(page); check('F toggles the frame back', (await state()).frame === 'rot');

// direct manipulation on the stage
await pick('quarter'); await seek(25);
let h = await page.evaluate(() => window.PULSE_DEBUG.handles());
let to = await page.evaluate(() => window.PULSE_DEBUG.env(12.5, 16));
await page.mouse.move(h.amp[0], h.amp[1]); await page.mouse.down(); await page.mouse.move(to[0], to[1], { steps: 5 }); await page.mouse.up(); s = await state();
check('dragging the top of the envelope to 16 MHz sets the area to 16 MHz × 25 ns', Math.abs(s.peak / MHZ - 16) < 0.2 && close(s.areaSet, s.peak * 25, 1e-9) && s.preset === null, `${s.peak / MHZ} MHz`);
const peak0 = s.peak;
h = await page.evaluate(() => window.PULSE_DEBUG.handles()); to = await page.evaluate(() => window.PULSE_DEBUG.env(15, 0));
await page.mouse.move(h.width[0], h.width[1]); await page.mouse.down(); await page.mouse.move(to[0], h.width[1], { steps: 5 }); await page.mouse.up(); s = await state();
check('dragging the right end to 15 ns keeps the height and shrinks the area', Math.abs(s.T - 15) < 0.3 && close(s.peak, peak0, 1e-9) && close(s.areaSet, peak0 * s.T, 1e-9) && close(s.max, s.T), `T = ${s.T}`);
to = await page.evaluate(() => window.PULSE_DEBUG.env(5, 2));
await page.mouse.click(to[0], to[1]); s = await state();
check('pressing inside the envelope plot moves the rail there', Math.abs(s.t - 5) < 0.2, `t = ${s.t}`);
const from = await page.evaluate(() => window.PULSE_DEBUG.screen(window.PULSE_DEBUG.state.r0));
await page.mouse.move(from[0], from[1]); await page.mouse.down(); await page.mouse.move(from[0] + 60, from[1] + 70, { steps: 5 }); await page.mouse.up(); s = await state();
check('dragging the amber ring moves the starting state on the sphere', vdist(s.r0, [0, 0, 1]) > 0.2 && close(Math.hypot(...s.r0), 1, 1e-12) && err(s) < 1e-8);
const cam0 = await page.evaluate(() => window.PULSE_DEBUG.camera()), b0 = await page.evaluate(() => window.PULSE_DEBUG.screen([0, 0, -1.6]));
await page.mouse.move(b0[0] + 90, b0[1]); await page.mouse.down(); await page.mouse.move(b0[0] + 160, b0[1] - 20, { steps: 4 }); await page.mouse.up();
check('dragging empty space orbits the camera', (await page.evaluate(() => window.PULSE_DEBUG.camera())).yaw !== cam0.yaw);

// playback and keyboard
await page.click('[data-preset="gauss"]');
check('clicking a card plays it', await until(page, () => { const d = window.PULSE_DEBUG.state; return d.playing && d.t > 0; }));
await page.evaluate(() => window.PULSE_DEBUG.seek(24.9)); await page.click('#play');
check('playback stops at the end of the rail', await until(page, () => { const d = window.PULSE_DEBUG.state; return !d.playing && d.t >= d.max - 1e-9; }));
await page.click('#rew'); check('⏮ returns to 0 ns', close((await state()).t, 0));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('ArrowRight'); check('→ steps an eighth of the rail', close((await state()).t, 25 / 8));
await page.keyboard.press('End'); check('End goes to the end', close((await state()).t, 25));
await page.keyboard.press('Home'); check('Home returns to 0', close((await state()).t, 0));
await page.keyboard.press('Space'); check('Space plays', await until(page, () => window.PULSE_DEBUG.state.t > 0));
await page.keyboard.press('Space'); const paused = await state(); check('Space pauses', !paused.playing);

await page.click('[data-lang-set="en"]'); await pick('quarter');
check('the stage title follows the language', (await page.textContent('#hudBig')).startsWith('Square'));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
