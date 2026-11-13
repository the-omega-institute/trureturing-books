#!/usr/bin/env node
// Browser regression suite for ORTHO//SAMSARA (books/quantum-geometry/viz/forgetting-rebirth-attractor/).
//   node books/quantum-geometry/viz/tests/forgetting-rebirth-attractor.test.mjs   (or node tools/node/viz-test.mjs quantum-geometry)
// Independent model, written here and never taken from the page:
//   θ* by bisection on cos θ − θ; η₀ = ∫₀^θ* sec α dα by Simpson's rule; θ(η) = atan(sinh η) (not 2 atan eᵑ − π/2);
//   the Klein radius as sinh η / √(1 + sinh²η), the Poincaré radius as tan(θ/2); the gap 1 − tanh η as 2e^{−2η}/(1 + e^{−2η});
//   the Poincaré geodesics checked by fitting a circle through three of their points and testing |centre|² = R² + 1;
//   the angle-ruler walk re-simulated and its period found by scanning; pinching masses from the 2 × 2 entries;
//   the fractional map as |s − 1|/|s| with complex arithmetic.
// The solid beside the disk (kit.solid) is checked against the same model: the disk points of the staircase at
//   (tanh η, 0, 1) or (tan(θ/2), 0, 0), each sheet point on the line from the projection centre through its disk point
//   (cross product), the first step on t² − x² = 1; the tower's points over the wheel's points at their round's height;
//   the hemisphere's points on the unit sphere and projected back from the south pole onto (s − 1)/s.
// It reads the page through window.SAMSARA_DEBUG.
import { session, stageFirstChecks, solidChecks, solidPixels, settle, until, openStill } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'forgetting-rebirth-attractor';
const T = await session();
const { check } = T;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const rel = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps * Math.max(Math.abs(a), Math.abs(b), 1e-300);

/* ---------- independent model ---------- */
let lo = 0, hi = 1;
for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (Math.cos(m) - m > 0) lo = m; else hi = m; }
const THETA = (lo + hi) / 2;
function simpson(f, a, b, n = 2000) { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; }
const ETA0 = simpson((a) => 1 / Math.cos(a), 0, THETA);
const thetaOf = (eta) => Math.atan(Math.sinh(eta));
const kleinR = (eta) => { const s = Math.sinh(eta); return s / Math.sqrt(1 + s * s); };
const poincareR = (eta) => Math.tan(thetaOf(eta) / 2);
const gapK = (eta) => { const e = Math.exp(-2 * eta); return 2 * e / (1 + e); };
const gapP = (eta) => { const e = Math.exp(-eta); return 2 * e / (1 + e); };
/** Circle through three points: [cx, cy, R]. */
function circle3(a, b, c) {
  const d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
  const a2 = a[0] ** 2 + a[1] ** 2, b2 = b[0] ** 2 + b[1] ** 2, c2 = c[0] ** 2 + c[1] ** 2;
  const ux = (a2 * (b[1] - c[1]) + b2 * (c[1] - a[1]) + c2 * (a[1] - b[1])) / d, uy = (a2 * (c[0] - b[0]) + b2 * (a[0] - c[0]) + c2 * (b[0] - a[0])) / d;
  return [ux, uy, Math.hypot(a[0] - ux, a[1] - uy)];
}
/** The angle-ruler walk, re-simulated: start at θ*, add dth, a step that would reach 90° is the rim, then back to 0. */
function walk(dth, rounds) {
  const th = [THETA], rim = [false];
  let wipes = 0;
  while (wipes <= rounds) {
    const x = th[th.length - 1];
    if (rim[rim.length - 1]) { wipes++; if (wipes > rounds) break; th.push(0); rim.push(false); }
    else if (x + dth >= Math.PI / 2) { th.push(Math.PI / 2); rim.push(true); }
    else { th.push(x + dth); rim.push(false); }
  }
  const n0 = rim.indexOf(true) + 1;
  let p = 1;
  for (; p < th.length; p++) { let ok = true; for (let n = n0; n + p < th.length; n++) if (th[n] !== th[n + p]) { ok = false; break; } if (ok) break; }
  return { th, rim, n0, p };
}
const cdiv = (a, b) => { const d = b[0] ** 2 + b[1] ** 2; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
const cayleyAbs = (s) => { const w = cdiv([s[0] - 1, s[1]], s); return Math.hypot(w[0], w[1]); };

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.SAMSARA_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const seek = async (t) => { await page.evaluate((x) => window.SAMSARA_DEBUG.seek(x), t); return state(); };
// a card plays for up to ~40 animation frames; on a loaded machine or with VIZ_SLOW_FRAMES=1000 that takes minutes
const stopped = (id) => until(page, (c) => { const s = window.SAMSARA_DEBUG.state; return s.preset === c && !s.playing; }, id, 300000);
const plays = () => until(page, () => window.SAMSARA_DEBUG.state.playing);
const clickAt = async (x, y) => { const p = await page.evaluate(([a, b]) => window.SAMSARA_DEBUG.point(a, b), [x, y]); await page.mouse.move(p[0], p[1]); await page.mouse.down(); await page.mouse.up(); return state(); };
const setRange = async (id, v) => { await page.evaluate(([i, x]) => { const el = document.getElementById(i); el.value = String(x); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); return state(); };

// opening card and the constants
let s = await state();
check('opens on STAIRCASE in the Klein disk at k = 8, Δη = 1', s.preset === 'staircase' && s.scene === 'stair' && s.model === 'klein' && s.mu === 0 && s.k === 8 && s.dEta === 1);
check('θ* is the root of cos θ = θ (bisection): 0.739085…', close(s.thetaStar, THETA, 1e-12) && close(THETA, 0.7390851332, 1e-9));
check('η₀ = ∫₀^θ* sec α dα (Simpson) = 0.817326…', close(s.eta0, ETA0, 1e-10) && close(ETA0, 0.81732635, 1e-7), `${s.eta0} vs ${ETA0}`);

// both radii, their conversion, both proper-time rates, the gaps: every step of the rail
let worst = 0, below = true, positive = true;
for (const [k, a] of s.steps.entries()) {
  const eta = ETA0 + k;
  const r = kleinR(eta), rho = poincareR(eta);
  worst = Math.max(worst, Math.abs(a.eta - eta), Math.abs(a.rBK - r), Math.abs(a.rhoP - rho), Math.abs(a.theta - thetaOf(eta)));
  worst = Math.max(worst, Math.abs(a.rhoP - a.rBK / (1 + Math.sqrt(1 - a.rBK * a.rBK))), Math.abs(rho - Math.tan(thetaOf(eta) / 2)));
  worst = Math.max(worst, Math.abs(a.dtdtBK - a.dtdtP) / a.sech, Math.abs(a.sech - 2 / (Math.exp(eta) + Math.exp(-eta))) / a.sech, Math.abs(a.dtdtBK - Math.cos(thetaOf(eta))) / a.sech);
  if (!rel(a.gapBK, gapK(eta), 1e-9) || !rel(a.gapP, gapP(eta), 1e-9)) worst = Math.max(worst, 1);
  below = below && a.rBK < 1 && a.rhoP < 1;
  positive = positive && a.gapBK > 0 && a.gapP > 0;
}
check('11 steps: Klein r = sinh η/√(1 + sinh²η), Poincaré ρ = tan(θ/2) = r/(1 + √(1 − r²)), θ = atan(sinh η); the proper-time rates agree', worst < 1e-9, String(worst));
check('every finite step has r_BK < 1, ρ_P < 1 and a positive gap', below && positive);
check('the chapter\'s table: k = 1 has sin θ = 0.948571, k = 8 has cos θ = 0.000296', close(s.steps[1].rBK, 0.948571, 1e-6) && close(s.steps[8].sech, 0.000296, 1e-6));
check('the remainder δ = π/2 − θ equals atan(1/sinh η) at every step (k = 2: 0.119389, as in the chapter\'s table)', s.steps.every((a, k) => rel(a.delta, Math.atan(1 / Math.sinh(ETA0 + k)), 1e-9) && a.delta > 0) && close(s.steps[2].delta, 0.119389, 1e-6));
check('STAIRCASE: the key readout is the Klein gap at k = 8 (≈ 4.39 × 10⁻⁸)', rel(s.curGap, gapK(ETA0 + 8), 1e-6) && s.key.includes('4.39') && s.key.includes('10⁻⁸'), s.key);
check('STAIRCASE: the magnifier field is the power of ten above the gap', s.magU === Math.pow(10, Math.ceil(Math.log10(s.curGap / 0.72))) && s.curGap / s.magU > 0.07 && s.curGap / s.magU <= 0.72);
check('Klein: the geodesic through the current step is a straight chord x = r', s.wall.every((p) => close(p[0], s.cur.rBK, 1e-12)));
await pick('staircase');
check('STAIRCASE plays by itself when clicked', await plays());
const stopS = await stopped('staircase'); s = await state();
check('STAIRCASE stops at k = 8', stopS && s.k === 8, `${stopS} k = ${s.k}`);

// the staircase card note: a larger step and more steps, and the magnifier keeps narrowing while the gap stays open
check('the HORIZON GAP card is gone (merged into STAIRCASE)', (await page.locator('[data-preset="horizon_gap"]').count()) === 0);
s = await setRange('dEta', 1.5);
const e10 = ETA0 + 15;
let zoomOk = true, prevU = Infinity;
for (let k = 4; k <= 10; k++) { s = await seek(k); zoomOk = zoomOk && s.magU < prevU && s.curGap > 0 && s.curGap <= 0.72 * s.magU; prevU = s.magU; }
check('Δη = 1.5: from k = 4 to 10 the magnifier field narrows at every step and the gap always shows in it', s.dEta === 1.5 && zoomOk);
check('Δη = 1.5, k = 10: gap 2e^{−2η}/(1 + e^{−2η}) ≈ 3.6 × 10⁻¹⁴ at η = η₀ + 15, still > 0 and r < 1', rel(s.curGap, gapK(e10), 1e-6) && close(s.curGap, 3.6e-14, 0.1e-14) && s.cur.rBK < 1, String(s.curGap));

// KLEIN → POINCARÉ
const clickPlays = async (id) => { await page.click(`[data-preset="${id}"]`); return page.evaluate(() => { const s = window.SAMSARA_DEBUG.state; return s.playing && s.preset !== null; }); };
check('KLEIN → POINCARÉ plays a transition when clicked', await clickPlays('klein_vs_poincare'));
check('KLEIN → POINCARÉ stops in the Poincaré disk', await stopped('klein_vs_poincare'));
s = await state();
check('KLEIN → POINCARÉ: k = 3, μ = 1, the current point at ρ = tanh(η/2)', s.k === 3 && s.mu === 1 && s.model === 'poincare' && close(s.curPoint[0], poincareR(ETA0 + 3), 1e-12));
const [cx, cy, R] = circle3(s.wall[3], s.wall[24], s.wall[44]);
check('POINCARÉ: the geodesic through the step lies on one circle (fit through three points)', s.wall.every((p) => close(Math.hypot(p[0] - cx, p[1] - cy), R, 1e-9)));
check('POINCARÉ: that circle meets the unit circle at right angles (|centre|² = R² + 1)', close(cx * cx + cy * cy, R * R + 1, 1e-8) && close(cy, 0, 1e-9));
const hd = (q) => Math.log((1 + q) / (1 - q));
check('POINCARÉ: neighbouring steps are Δη = 1 apart in the metric 4|dz|²/(1 − |z|²)²', s.steps.slice(0, 9).every((a, i) => close(hd(s.steps[i + 1].rhoP) - hd(a.rhoP), 1, 1e-9)));
check('KLEIN: neighbouring steps are Δη apart in Klein distance artanh r', s.steps.slice(0, 9).every((a, i) => close(Math.atanh(s.steps[i + 1].rBK) - Math.atanh(a.rBK), 1, 1e-6)));

// the model chips and the M key
await page.click('#modelChips [data-model="klein"]'); s = await state();
check('the model chip sends the disk back to Klein and leaves the card', s.mu === 0 && s.model === 'klein' && s.preset === null);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('m'); s = await state();
check('M switches to the Poincaré disk', s.mu === 1 && s.model === 'poincare');
await page.keyboard.press('m'); s = await state();
check('M again switches back to Klein', s.mu === 0);

// dragging along the ray (Klein): x = tanh(η₀ + 2) sets k = 2
s = await clickAt(kleinR(ETA0 + 2), 0);
check('dragging to x = tanh(η₀ + 2) on the ray sets k ≈ 2', Math.abs(s.k - 2) < 0.05 && s.scene === 'stair', String(s.k));

// the Δη slider
s = await setRange('dEta', 0.5);
check('the Δη slider sets the step and the staircase follows (k = 3 ↦ η₀ + 1.5)', s.dEta === 0.5 && close(s.steps[3].eta, ETA0 + 1.5, 1e-12));

// ANGLE RULER
await pick('erase_reset');
check('ANGLE RULER plays by itself', await plays());
check('ANGLE RULER stops by itself', await stopped('erase_reset'));
s = await state();
const dth = Math.asin(kleinR(ETA0 + 1)) - THETA, Wk = walk(dth, 5);
check('ANGLE RULER: Δθ is the staircase\'s first step θ₁ − θ*', close(s.walk.dth, dth, 1e-12) && close(dth, 0.509606, 1e-5), String(dth));
check('ANGLE RULER: the walk matches the re-simulation, state by state', s.walk.th.length === Wk.th.length && s.walk.th.every((x, i) => close(x, Wk.th[i], 1e-12)) && s.walk.light.every((x, i) => x === Wk.rim[i]));
check('ANGLE RULER: the first wipe is at the 2nd step (θ* + 2Δθ > 90°); the rounds have period 5', Wk.rim[2] && !Wk.rim[1] && s.walk.n0 === 3 && s.walk.p === Wk.p && Wk.p === 5);
check('ANGLE RULER: rim states sit on the rim (|p| = 1), all others strictly inside', s.walk.points.every((p, i) => (Wk.rim[i] ? close(Math.hypot(...p), 1, 1e-12) : Math.hypot(...p) < 1)));
check('ANGLE RULER: stops in round 2 (n = round-2 start + 2)', s.n === Wk.n0 + Wk.p + 2);
// pinching ledger for ρ = ½[[1 + c, s], [s, 1 − c]]: ‖ρ‖² = diag² + off², off = ρ₀₁² + ρ₁₀²
let pinchOk = true;
for (const x of Wk.th) {
  const c = Math.cos(x), sn = Math.sin(x), r = [[(1 + c) / 2, sn / 2], [sn / 2, (1 - c) / 2]];
  const all = r.flat().reduce((a, v) => a + v * v, 0), diag = r[0][0] ** 2 + r[1][1] ** 2, off = r[0][1] ** 2 + r[1][0] ** 2;
  pinchOk = pinchOk && close(all, diag + off, 1e-12) && close(off, sn * sn / 2, 1e-12) && close(all, 1, 1e-12);
}
check('the pinching ledger: ‖ρ‖² = ‖diag‖² + ‖off-diag‖² = 1 and the discarded part is s²/2, at every state', pinchOk);
s = await seek(2);
check('on the rim (n = 2): the key prints 1.000000 = 0.5000 + 0.5000 (axial bias gone)', s.key.includes('1.000000') && s.key.includes('0.5000 + 0.5000'), s.key);
s = await seek(3);
check('after the wipe (n = 3) the walker is back at the centre', close(Math.hypot(...s.walk.points[3]), 0, 1e-12));

// FOLD THE WHEEL
check('FOLD plays a transition when clicked', await clickPlays('quotient_fold'));
check('FOLD stops folded', await stopped('quotient_fold'));
s = await state();
const pts = s.walk.points, n0 = s.walk.n0, pp = s.walk.p;
let fibre = true, distinct = new Set();
for (let n = n0; n < pts.length; n++) { const m = n0 + ((n - n0) % pp); fibre = fibre && close(pts[n][0], pts[m][0], 1e-12) && close(pts[n][1], pts[m][1], 1e-12) && Wk.th[n] === Wk.th[m]; distinct.add(pts[n].map((v) => v.toFixed(9)).join(',')); }
check('FOLD: n and n + p land on the same point and carry the same angle (target constant on fibres of n mod p)', s.fold === 1 && fibre && s.walk.constant);
check('FOLD: the 25 steps after the first wipe land on exactly p = 5 points', pts.length - n0 === 25 && distinct.size === 5);
check('FOLD: each position carries 5 visits', s.walk.mult && s.walk.mult.length === 5 && s.walk.mult.every(([, m]) => m === 5));
{ // the fold drawn as a motion: each later-round state turned along its own circle (same radius) from its unrolled spoke
  const tr = s.walk.trails || [], step = 2 * Math.PI / 6;
  let ok = tr.length > 0;
  for (const t of tr) { const q = pts[t.n], j = Math.round(t.from / step); ok = ok && j >= 1 && close(t.from, j * step, 1e-12) && close(t.to, 0, 1e-12) && close(Math.hypot(q[0], q[1]), t.r, 1e-12) && close(Math.atan2(q[1], q[0]), 0, 1e-9); }
  check('FOLD: every later-round state has an arc of its own radius from its spoke j·60° to the first spoke', ok, String(tr.length)); }
s = await setRange('fold', 0.5);
{ const q = s.walk.points, step = 2 * Math.PI / 6; let ok = s.fold === 0.5 && s.preset === null;
  for (let n = n0; n < q.length; n++) { const r = Math.hypot(q[n][0], q[n][1]); if (r < 0.02) continue; const j = s.walk.round[n]; ok = ok && close(Math.atan2(q[n][1], q[n][0]), Math.atan2(Math.sin(0.5 * j * step), Math.cos(0.5 * j * step)), 1e-9); }
  check('the fold slider at f = 0.5 turns round j to half its angle, j·30°, and leaves the card', ok); }
await page.click('#foldChips [data-fold="0"]'); s = await state();
check('the fold chips unroll the wheel: rounds on 6 different spokes', s.fold === 0 && new Set(s.walk.points.filter((p) => Math.hypot(...p) > 0.2).map((p) => Math.atan2(p[1], p[0]).toFixed(6))).size === 6);

// (s − 1)/s
await pick('cayley');
check('(s − 1)/s plays by itself', await plays());
check('(s − 1)/s stops at j = 6', await stopped('cayley'));
s = await state();
const c6 = 0.5 + Math.pow(2, -5);
check('(s − 1)/s: c = 1/2 + 2⁻⁵, circle centre 1 − 1/(2c), radius 1/(2c)', close(s.cayley.c, c6, 1e-12) && close(s.cayley.centre, 1 - 1 / (2 * c6), 1e-12) && close(s.cayley.radius, 1 / (2 * c6), 1e-12));
check('(s − 1)/s: each sampled image has |w| = |s − 1|/|s| < 1 and lies on the image circle', s.cayley.samples.every((q) => close(q.abs, cayleyAbs(q.s), 1e-12) && q.abs < 1 && close(Math.hypot(q.w[0] - s.cayley.centre, q.w[1]), s.cayley.radius, 1e-12)));
check('(s − 1)/s: on Re s = 1/2 the modulus is exactly 1, and off it it is not (complex arithmetic)', [-3, -0.4, 0.7, 5].every((y) => close(cayleyAbs([0.5, y]), 1, 1e-12)) && cayleyAbs([0.6, 1]) < 1 && cayleyAbs([0.4, 1]) > 1);
let rad = true;
for (let j = 0; j <= 10; j++) { s = await seek(j); rad = rad && s.cayley.radius < 1 && close(s.cayley.radius, 1 / (1 + Math.pow(2, 2 - j)), 1e-12); }
check('(s − 1)/s: on all 11 integer steps the image radius 1/(2c) stays below 1', rad);
s = await clickAt(-0.6, 0);
check('dragging in the fractional scene puts the image circle\'s leftmost point under the pointer', Math.abs((s.cayley.centre - s.cayley.radius) + 0.6) < 0.02, String(s.cayley.centre - s.cayley.radius));

// scenes, rail and keyboard
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('1'); check('key 1 opens the staircase', (await state()).scene === 'stair');
await page.keyboard.press('2'); check('key 2 opens the wheel', (await state()).scene === 'samsara');
await page.keyboard.press('3'); check('key 3 opens the fractional map', (await state()).scene === 'cayley');
await page.click('#sceneChips [data-scene="stair"]'); check('the scene chips switch scenes', (await state()).scene === 'stair');
await page.keyboard.press('Home'); check('Home goes to k = 0', (await state()).k === 0);
await page.keyboard.press('ArrowRight'); check('→ steps k by 1', (await state()).k === 1);
await page.keyboard.press('End'); check('End goes to k = 10', (await state()).k === 10);
await page.click('#rew'); check('⏮ goes back to k = 0', (await state()).k === 0);
await page.click('#speedChips [data-speed="2.5"]'); check('the speed chips select 2.5×', (await page.getAttribute('#speedChips [data-speed="2.5"]', 'aria-pressed')) === 'true');
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.SAMSARA_DEBUG.state.k > 0));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
await page.click('#play'); check('▶ plays', await plays());
await page.click('#play'); check('▶ again pauses', !(await state()).playing);
s = await setRange('now', 4);
check('the rail sets k', s.k === 4);

// English
await page.click('[data-lang-set="en"]'); await pick('staircase'); await stopped('staircase');
await settle(page);
const hudEn = (await page.textContent('#hudBig')).trim();
check('English: the HUD reads “Staircase · k = 8”', hudEn === 'Staircase · k = 8', hudEn);

/* ---------- the solid beside the disk (kit.solid): its geometry against the state, by independent algorithms ---------- */
const solid = async () => { await settle(page); return page.evaluate(() => window.SAMSARA_DEBUG.solid); };
const sub3 = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross3 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const len3 = (a) => Math.hypot(a[0], a[1], a[2]);
/** C, Q, H on one line, in that order (Q between C and H). */
const onRay = (C, Q, H) => { const u = sub3(Q, C), v = sub3(H, C); return len3(cross3(u, v)) <= 1e-9 * len3(u) * len3(v) && u[0] * v[0] + u[1] * v[1] + u[2] * v[2] > 0 && len3(v) > len3(u); };
/** The staircase solid against the model: disk points by `radius`, rays through them, rings climbing, step 0 exact. */
function stairSolid(m, mu, radius) {
  let disk = m.mu === mu && close(m.diskZ, 1 - mu, 1e-12) && close(m.C[2], -mu, 1e-12) && m.C[0] === 0 && m.C[1] === 0, rays = true, climb = true, inside = true;
  for (const a of m.steps) {
    const eta = ETA0 + a.k * s.dEta;
    disk = disk && rel(a.Q[0], radius(eta), 1e-9) && a.Q[1] === 0 && close(a.Q[2], 1 - mu, 1e-12);
    rays = rays && onRay(m.C, a.Q, a.H);
    inside = inside && a.Q[0] < 1 && a.H[0] < a.H[2] + mu;
    if (a.k > 0) climb = climb && a.H[2] > m.steps[a.k - 1].H[2];
  }
  const h0 = m.steps[0].H, sh = Math.sinh(ETA0), ch = Math.cosh(ETA0);
  return { disk, rays, climb, inside, exact: close(h0[0], sh, 1e-9) && close(h0[2], ch, 1e-9) && close(h0[2] * h0[2] - h0[0] * h0[0], 1, 1e-9) };
}
await pick('staircase'); await stopped('staircase');
s = await state();
let g3 = await solid();
check('solid: the staircase is drawn with kit.solid (WebGL) beside the disk', g3.mode === 'webgl' && !!g3.model && g3.model.scene === 'stair');
{ const r = stairSolid(g3.model, 0, kleinR);
  check('solid (Klein): the centre is the origin, the disk is t = 1, and step k sits on it at (tanh η_k, 0, 1)', r.disk);
  check('solid (Klein): each sheet point lies on the ray from the centre through its disk point, beyond it', r.rays);
  check('solid (Klein): the rings climb the sheet step by step, and no ray reaches the rim or the cone through it', r.climb && r.inside);
  check('solid (Klein): step 0 is drawn exactly on the hyperboloid, (sinh η₀, 0, cosh η₀) with t² − x² = 1', r.exact);
  check('solid (Klein): the amber ring and bead are step k = 8', g3.model.kNow === 8 && g3.model.now.H.every((v, i) => close(v, g3.model.steps[8].H[i], 1e-12))); }
{ const lay = await page.evaluate(() => {
    const b = document.getElementById('flat').getBoundingClientRect(), d = window.SAMSARA_DEBUG.solid;
    return { W: b.width, H: b.height, r3: d.r3, r2: d.r2, disk: d.disk, marks: window.TRV.solids[0].marks().map((m) => [m.x - b.left, m.y - b.top]) };
  });
  const inBox = (p, r, e) => p[0] >= r.x - e && p[0] <= r.x + r.w + e && p[1] >= r.y - e && p[1] <= r.y + r.h + e;
  const apart = lay.r3.x + lay.r3.w <= lay.r2.x || lay.r3.y + lay.r3.h <= lay.r2.y;
  check('layout: the solid and the disk have parts of their own, and the top band of the stage is not the disk\'s', apart && lay.r2.y > 0.08 * lay.H, JSON.stringify([lay.r3, lay.r2]));
  check('layout: every bead and ring of the solid lies in the solid\'s part', lay.marks.length > 0 && lay.marks.every((p) => inBox(p, lay.r3, 2)), String(lay.marks.length));
  check('layout: the disk lies in its own part', inBox([lay.disk.cx - lay.disk.R, lay.disk.cy - lay.disk.R], lay.r2, 1) && inBox([lay.disk.cx + lay.disk.R, lay.disk.cy + lay.disk.R], lay.r2, 1)); }

await pick('klein_vs_poincare'); await stopped('klein_vs_poincare');
s = await state(); g3 = await solid();
{ const r = stairSolid(g3.model, 1, poincareR);
  check('solid (Poincaré): the centre is (0, 0, −1), the disk is t = 0, and step k sits on it at (tan(θ_k/2), 0, 0)', r.disk);
  check('solid (Poincaré): each sheet point lies on the ray from (0, 0, −1) through its disk point, beyond it', r.rays && r.climb && r.inside);
  check('solid (Poincaré): step 0 is still exactly (sinh η₀, 0, cosh η₀) on the hyperboloid', r.exact); }

await pick('erase_reset'); await stopped('erase_reset');
s = await state(); g3 = await solid();
{ const m = g3.model, dh = g3.towerStep;
  const over = m.pts.length === s.walk.points.length && m.pts.every((p, n) => close(p[0], s.walk.points[n][0], 1e-12) && close(p[1], s.walk.points[n][1], 1e-12));
  const lifted = dh > 0 && m.pts.every((p, n) => close(p[2], s.walk.round[n] * dh, 1e-12));
  check('solid (tower): every state stands over its point of the flat wheel, round j at height j·Δh', m.scene === 'samsara' && over && lifted);
  check('solid (tower): the walker is at the current state n', m.walker.every((v, i) => close(v, m.pts[s.n][i], 1e-12))); }
await pick('quotient_fold'); await stopped('quotient_fold');
s = await state(); g3 = await solid();
{ const m = g3.model, pts = m.pts.slice(s.walk.n0), keys = new Set(pts.map((p) => p.map((v) => v.toFixed(9)).join(',')));
  check('solid (tower): folded, every round is lowered onto the disk (height 0) over its folded point', s.fold === 1 && m.pts.every((p, n) => close(p[2], 0, 1e-12) && close(p[0], s.walk.points[n][0], 1e-12) && close(p[1], s.walk.points[n][1], 1e-12)));
  check('solid (tower): folded, the 25 steps after the first wipe stand on exactly 5 points', pts.length === 25 && keys.size === 5); }

await pick('cayley'); await stopped('cayley');
s = await state(); g3 = await solid();
{ const m = g3.model;
  const sphere = m.samples.every((q) => close(len3(q.p), 1, 1e-12) && q.p[2] > 0);
  const back = m.samples.every((q) => { const w = cdiv([q.s[0] - 1, q.s[1]], q.s), k = 1 + q.p[2]; return close(q.p[0] / k, w[0], 1e-12) && close(q.p[1] / k, w[1], 1e-12); });
  const line = m.samples.every((q) => onRay(m.south, [q.w[0], q.w[1], 0], q.p));
  check('solid (hemisphere): the lift of each sample image w lies on the unit sphere, above the equator', m.scene === 'cayley' && close(m.c, s.cayley.c, 1e-12) && sphere);
  check('solid (hemisphere): projected from the south pole, each lift lands back on (s − 1)/s (complex arithmetic)', back);
  check('solid (hemisphere): south pole, image w and its lift lie on one line, in that order', line); }
// the hemisphere as drawn, read off the frame itself (the picking ray cast, the WebGL picture and the marks), not the
// model: points of the upper unit sphere at every 15° of azimuth, from the default view and after half a turn, are met
// by the dome exactly where they are whenever they face the viewer; the lifted circle of the current line lies on the
// opaque dome and is seen there (amber in the picture, not the dome's grey); sample lifts facing the viewer are seen,
// the ones on its far side and the images w inside the dome are hidden
{ const DIRS = [];
  for (let a = 0; a < 24; a++) for (const th of [35, 65]) { const ph = a * Math.PI / 12, t = th * Math.PI / 180; DIRS.push({ a, p: [Math.sin(t) * Math.cos(ph), Math.sin(t) * Math.sin(ph), Math.cos(t)] }); }
  const domeRays = () => page.evaluate((dirs) => {
    const sc = window.TRV.solids[0]; window.TRV.kit.flush();
    const zc = window.SAMSARA_DEBUG.solid.frame.zc, D = sc.facing();
    return dirs.map(({ a, p }) => {
      if (p[0] * D[0] + p[1] * D[1] + p[2] * D[2] < 0.25) return null;
      const w = [p[0], p[1], p[2] - zc], q = sc.p(w), h = sc.hitAt(q[0], q[1]);
      return { a, id: h ? h.id : null, err: h ? Math.hypot(h.point[0] - w[0], h.point[1] - w[1], h.point[2] - w[2]) : Infinity };
    }).filter(Boolean);
  }, DIRS);
  const turn = (d) => page.evaluate((x) => { const sc = window.TRV.solids[0]; sc.view([sc.cam.yaw + x, sc.cam.pitch], 0); window.TRV.kit.flush(); }, d);
  const near = await domeRays(); await turn(Math.PI); const far = await domeRays(); await turn(-Math.PI); await settle(page);
  const rays = near.concat(far), bad = rays.filter((r) => r.id !== 'dome' || !(r.err < 2e-3)), seen = new Set(rays.map((r) => r.a));
  check('solid (hemisphere, drawn): the opaque dome covers every azimuth — each sphere point facing the viewer is where the ray meets the dome, both sides',
    near.length >= 16 && far.length >= 16 && seen.size === 24 && !bad.length, `${near.length}+${far.length} rays, ${seen.size}/24 azimuths, ${bad.slice(0, 3).map((r) => `${r.a * 15}°: ${r.id} ${r.err.toExponential(1)}`).join(', ')}`);
  // the lifted circle of the line Re s = c₆, by inverse stereographic projection computed here
  const ctr = 1 - 1 / (2 * c6), rad = 1 / (2 * c6), ring = [];
  for (let i = 0; i < 144; i++) { const a = 2 * Math.PI * i / 144, wx = ctr + rad * Math.cos(a), wy = rad * Math.sin(a), q = wx * wx + wy * wy; ring.push([2 * wx / (1 + q), 2 * wy / (1 + q), (1 - q) / (1 + q)]); }
  const pic = await page.evaluate((pts) => {
    const sc = window.TRV.solids[0]; window.TRV.kit.flush();
    const gl = sc.el.querySelector('canvas.solid-gl'); if (!gl) return null;
    const cp = document.createElement('canvas'); cp.width = gl.width; cp.height = gl.height; const c = cp.getContext('2d'); c.drawImage(gl, 0, 0);
    const d = c.getImageData(0, 0, cp.width, cp.height).data, gr = gl.getBoundingClientRect(), sr = sc.el.getBoundingClientRect(), k = gl.width / gr.width;
    const hsv = (r, g, b) => { const M = Math.max(r, g, b), m = Math.min(r, g, b), C = M - m; let h = 0; if (C) h = M === r ? ((g - b) / C) % 6 : M === g ? (b - r) / C + 2 : (r - g) / C + 4; return [(h * 60 + 360) % 360, M ? C / M : 0, M / 255]; };
    const amber = hsv(...window.TRV.rgb.amber.map((x) => 255 * x));
    const zc = window.SAMSARA_DEBUG.solid.frame.zc, D = sc.facing(), beads = window.SAMSARA_DEBUG.solid.model.samples.map((q) => sc.p([q.p[0], q.p[1], q.p[2] - zc]));
    let n = 0, hit = 0;
    for (const p of pts) {
      if (p[0] * D[0] + p[1] * D[1] + p[2] * D[2] < 0.3) continue;
      const q = sc.p([p[0], p[1], p[2] - zc]);
      if (beads.some((b) => Math.hypot(b[0] - q[0], b[1] - q[1]) < 10)) continue;       // the tube, not a sample bead
      const x0 = (q[0] + sr.left - gr.left) * k, y0 = (q[1] + sr.top - gr.top) * k, R = Math.ceil(3 * k);
      let amb = false;
      for (let y = Math.round(y0) - R; y <= Math.round(y0) + R && !amb; y++) for (let x = Math.round(x0) - R; x <= Math.round(x0) + R && !amb; x++) {
        if (x < 0 || y < 0 || x >= cp.width || y >= cp.height) continue;
        const i = 4 * (y * cp.width + x), v = hsv(d[i], d[i + 1], d[i + 2]), dh = Math.abs(v[0] - amber[0]);
        amb = d[i + 3] > 200 && v[1] > 0.35 && v[2] > 0.25 && Math.min(dh, 360 - dh) < 20;
      }
      n++; if (amb) hit++;
    }
    return { n, hit };
  }, ring);
  check('solid (hemisphere, drawn): the lifted circle of the current line is seen on the opaque dome (amber in the picture wherever it faces the viewer)',
    !!pic && pic.n >= 20 && pic.hit >= 0.9 * pic.n, JSON.stringify(pic));
  const mk = await page.evaluate(() => { const sc = window.TRV.solids[0]; window.TRV.kit.flush(); return { D: sc.facing(), marks: sc.marks().map((m) => [m.key, m.hidden]) }; });
  const hid = new Map(mk.marks), smp = (await solid()).model.samples, face = (p) => p[0] * mk.D[0] + p[1] * mk.D[1] + p[2] * mk.D[2];
  // how far the dome lies in front of an image w (on the disk, inside the sphere): the ray w + tD leaves the unit sphere at
  // t = −w·D + √((w·D)² + 1 − |w|²); the marks call a point hidden when a solid is more than 0.02 in front of it
  const exitT = (w) => { const b = w[0] * mk.D[0] + w[1] * mk.D[1]; return -b + Math.sqrt(b * b + 1 - w[0] * w[0] - w[1] * w[1]); };
  const lifts = smp.map((q, i) => [face(q.p), hid.get(`p${i}`)]), inner = smp.map((q, i) => [exitT(q.w), hid.get(`w${i}`)]);
  check('solid (hemisphere, drawn): sample lifts facing the viewer are seen, those behind the dome hidden; the images w deep under the dome are hidden',
    lifts.some(([f]) => f > 0.1) && lifts.every(([f, h]) => (f > 0.1 ? h === false : f < -0.1 ? h === true : true))
      && inner.some(([t]) => t > 0.03) && inner.every(([t, h]) => (t > 0.03 ? h === true : t < 0.01 ? h === false : true)),
    JSON.stringify({ lifts, inner })); }

// the disk is the only handle: a drag on it moves the state and leaves the solid; a drag in the top band turns it
await pick('staircase'); await stopped('staircase');
{ const c0 = (await solid()).camera;
  s = await clickAt(kleinR(ETA0 + 3), 0);
  const c1 = (await solid()).camera;
  check('a drag on the disk sets the step (k ≈ 3) and does not turn the solid', Math.abs(s.k - 3) < 0.05 && c1.yaw === c0.yaw && c1.pitch === c0.pitch, `${s.k} ${JSON.stringify([c0, c1])}`);
  const b = await page.evaluate(() => { const r = document.getElementById('stage').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; });
  await page.mouse.move(b[0] + b[2] * 0.06, b[1] + b[3] * 0.08); await page.mouse.down();
  for (let k = 1; k <= 6; k++) await page.mouse.move(b[0] + b[2] * (0.06 + 0.05 * k), b[1] + b[3] * 0.08);
  await page.mouse.up();
  const s2 = await state(), c2 = (await solid()).camera;
  check('a drag along the top band turns the solid and leaves the step alone', Math.abs(c2.yaw - c1.yaw) > 0.5 && s2.k === s.k, `${JSON.stringify(c2)} k ${s2.k}`); }

// the lit solid itself (kit.solid): shading, turning, hidden marks, resting inside a book; last, since it turns the camera
await pick('staircase'); await stopped('staircase');
// readiness for the rest lines: the embedded card makes its first WebGL context only once it is seen on screen, and
// before that parked() is also true; hand the embed to solidChecks only after a context has actually existed
const TE = Object.create(T);
TE.open = async (...a) => {
  const em = await T.open(...a);
  if (!/embed=1/.test(a[2] || '')) return em;
  await settle(em);
  check('solid (embed): the card on screen actually creates its first WebGL context before the rest checks',
    await until(em, () => window.TRV.solids && window.TRV.solids[0] && window.TRV.solids[0].contexts > 0, null, 120000));
  return em;
};
await solidChecks(TE, BOOK, ID, page);

/* ---------- cited figures at the size a chapter shows them ----------
   A chapter cites a card in an iframe 500 px high: about 334 px wide on a 390 px phone, 760 px in a book page. In the
   phone's frame a long note once took ~180 px of the 500 and left the stage ~210 px: the tower and the disk shrank to a few pixels, and the disk, its magnifier and their labels ran into the legend collided with the
   captions and the legend, and the lit solid shrank to a few per cent of the stage. These checks look at the frame
   itself: nothing scrolls; the complete note stays short and needs no internal scrolling; the stage keeps most of
   the frame; no ink of the flat canvas or the WebGL canvas and no label lies under the title, its second line or the
   legend; the solid draws nothing inside the flat drawings; labels stay on the stage and apart; the lit solid covers
   ≥ 12 % of the stage at the card's first and last frame; and the exact disk keeps a radius ≥ 40 px. */
{
  const FIG = ['erase_reset', 'cayley', 'staircase', 'klein_vs_poincare', 'quotient_fold'];
  /** Everything about the frame, in viewport pixels; `panels` and `read` come from the page's own probe. */
  const facts = (pg) => pg.evaluate(async () => {
    const sc = window.TRV.solids[0]; await sc.ready; window.TRV.kit.flush();
    const st = sc.el, sr = st.getBoundingClientRect(), vp = { w: innerWidth, h: innerHeight };
    const box = (b) => ({ x: b.left, y: b.top, w: b.width, h: b.height });
    const textBox = (el) => { const rg = document.createRange(); rg.selectNodeContents(el); return box(rg.getBoundingClientRect()); };
    const words = [];
    for (const id of ['hudBig', 'hudSub']) { const el = document.getElementById(id); if (el && el.textContent.trim()) words.push([id, textBox(el)]); }
    document.querySelectorAll('#legend > span').forEach((el, k) => words.push([`legend ${k + 1}`, box(el.getBoundingClientRect())]));
    const image = (cv) => {
      if (!cv) return null;
      const cp = document.createElement('canvas'); cp.width = cv.width; cp.height = cv.height; const c = cp.getContext('2d'); c.drawImage(cv, 0, 0);
      const r = cv.getBoundingClientRect(); return { d: c.getImageData(0, 0, cp.width, cp.height).data, w: cp.width, h: cp.height, k: cv.width / r.width, x: r.left, y: r.top };
    };
    const flat = image(document.getElementById('flat')), gl = image(st.querySelector('canvas.solid-gl'));
    const ink = (im, b) => {
      if (!im) return 0;
      let n = 0;
      for (let y = Math.max(0, Math.floor((b.y - im.y) * im.k)); y < Math.min(im.h, Math.ceil((b.y + b.h - im.y) * im.k)); y++)
        for (let x = Math.max(0, Math.floor((b.x - im.x) * im.k)); x < Math.min(im.w, Math.ceil((b.x + b.w - im.x) * im.k)); x++) if (im.d[4 * (y * im.w + x) + 3] > 8) n++;
      return n;
    };
    const cut = (a, b) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
    const tags = [...st.querySelectorAll('.tags .tag')].filter((t) => !t.hidden && t.textContent.trim() && t.getClientRects().length).map((t) => [t.textContent.trim(), box(t.getBoundingClientRect())]);
    const fb = document.getElementById('flat').getBoundingClientRect();
    const panels = (() => [['the disk and its magnifier', window.SAMSARA_DEBUG.solid.r2]])().map(([what, b]) => [what, { x: fb.left + b.x, y: fb.top + b.y, w: b.w, h: b.h }]);
    const what = document.querySelector('.tour .tour-note'), note = document.getElementById('presetNote'), tour = document.getElementById('tour');
    const full = what.textContent.trim().endsWith(note.textContent.trim()) && note.textContent.trim().length > 20;
    const scrolls = what.scrollHeight > what.clientHeight + 1, oy = getComputedStyle(what).overflowY;
    what.scrollTop = what.scrollHeight; const reached = what.scrollTop + what.clientHeight >= what.scrollHeight - 1; what.scrollTop = 0;
    const btns = [...tour.querySelectorAll('[data-tour]')].map((b) => b.getBoundingClientRect()).every((b) => b.width > 0 && b.top >= 0 && b.bottom <= vp.h + 0.5 && b.left >= 0 && b.right <= vp.w + 0.5);
    const out = {
      vp, docScroll: document.documentElement.scrollHeight - innerHeight, docWide: document.documentElement.scrollWidth - innerWidth,
      stageH: sr.height, tourH: tour.getBoundingClientRect().height, noteH: what.clientHeight, note: { full, scrolls, scrollable: !scrolls || oy === 'auto' || oy === 'scroll', reached, btns },
      under: [], solidIn: [], tagOut: [], tagHit: [], read: (() => { const d = window.SAMSARA_DEBUG.solid; return { R: d.disk.R, r3: d.r3, r2: d.r2 }; })()
    };
    for (const [w, b] of words) {
      const f = ink(flat, b), g = ink(gl, b);
      if (f) out.under.push(`flat ink under ${w}: ${f}`);
      if (g) out.under.push(`solid under ${w}: ${g}`);
      for (const [t, tb] of tags) if (cut(tb, b) > 1) out.under.push(`label “${t}” on ${w}`);
    }
    for (const [w, b] of panels) { const g = ink(gl, b); if (g) out.solidIn.push(`${w}: ${g}`); }
    for (const [t, b] of tags) if (b.x < sr.left - 1 || b.y < sr.top - 1 || b.x + b.w > sr.right + 1 || b.y + b.h > sr.bottom + 1) out.tagOut.push(t);
    for (let i = 0; i < tags.length; i++) for (let j = i + 1; j < tags.length; j++) {
      const a = tags[i][1], b = tags[j][1], c = cut(a, b);
      if (c > 0.3 * Math.min(a.w * a.h, b.w * b.h)) out.tagHit.push(`${tags[i][0]} / ${tags[j][0]}`);
    }
    return out;
  });
  const share = async (pg, t) => { await pg.evaluate(([d, x]) => window[d].seek(x), ['SAMSARA_DEBUG', t]); await settle(pg); return solidPixels(pg); };
  for (const [tag, vp, lang, cards] of [['phone frame 334 × 500', { width: 334, height: 500 }, 'en', FIG], ['phone frame 334 × 500', { width: 334, height: 500 }, 'zh', ['staircase', 'quotient_fold']], ['book page 760 × 500', { width: 760, height: 500 }, 'en', FIG]]) {
    const bad = { frame: [], note: [], words: [], solid: [], labels: [], share: [], read: [] };
    for (const card of cards) {
      const pg = await T.open(BOOK, ID, `?embed=1&lang=${lang}&preset=${card}`, { viewport: vp, locale: lang === 'en' ? 'en-US' : 'zh-CN' });
      await until(pg, () => window.TRV.solids && window.TRV.solids[0] && window.TRV.solids[0].contexts > 0, null, 120000);
      await until(pg, (d) => !window[d].state.playing, 'SAMSARA_DEBUG', 120000);
      await settle(pg);
      const f = await facts(pg), id = `${card} (${lang})`;
      if (f.docScroll > 0 || f.docWide > 0 || f.stageH < 0.72 * f.vp.h) bad.frame.push(`${id}: scroll ${f.docScroll}/${f.docWide}, stage ${Math.round(f.stageH)} px`);
      if (f.tourH > 84 || !f.note.full || f.note.scrolls || !f.note.reached || !f.note.btns) bad.note.push(`${id}: ${Math.round(f.tourH)} px ${JSON.stringify(f.note)}`);
      if (f.under.length) bad.words.push(`${id}: ${f.under.slice(0, 3).join(', ')}`);
      if (f.solidIn.length) bad.solid.push(`${id}: ${f.solidIn.join(', ')}`);
      if (f.tagOut.length || f.tagHit.length) bad.labels.push(`${id}: ${[...f.tagOut.map((t) => `off stage: ${t}`), ...f.tagHit].slice(0, 3).join(', ')}`);
      if (!(f.read.R >= 40)) bad.read.push(`${id}: ${JSON.stringify(f.read)}`);
      const max = await pg.evaluate((d) => window[d].state.max, 'SAMSARA_DEBUG');
      for (const t of [0, max]) { const px = await share(pg, t); if (!(px && px.share >= 0.12 && px.spread >= 0.04)) bad.share.push(`${id} at ${+t.toFixed(2)}: ${px ? (px.share * 100).toFixed(1) : '—'} %`); }
      await pg.context().close();
    }
    const what = `${tag}, ${lang}, ${cards.length === FIG.length ? 'every cited card' : cards.join(' + ')}`;
    check(`cited figure, ${what}: nothing scrolls and the stage keeps ≥ 72 % of the frame`, !bad.frame.length, bad.frame.join(' | '));
    check(`cited figure, ${what}: the note bar stays ≤ 84 px, holds the card's complete note without internal scrolling, ◀ ▶ in the frame`, !bad.note.length, bad.note.join(' | '));
    check(`cited figure, ${what}: no flat drawing, no solid and no label under the title, its second line or the legend`, !bad.words.length, bad.words.join(' | '));
    check(`cited figure, ${what}: the solid draws nothing inside the part of the disk and its magnifier`, !bad.solid.length, bad.solid.join(' | '));
    check(`cited figure, ${what}: every label stays on the stage, and no two labels sit on each other`, !bad.labels.length, bad.labels.join(' | '));
    check(`cited figure, ${what}: the lit solid covers ≥ 12 % of the stage at the card's first and last frame`, !bad.share.length, bad.share.join(' | '));
    check(`cited figure, ${what}: the exact disk keeps a radius ≥ 40 px`, !bad.read.length, bad.read.join(' | '));
  }
}


// Publication stills use clock coordinates and retain the values the captions describe.
for (const lang of ['zh', 'en']) for (const [card, time] of [['staircase', 8], ['erase_reset', Wk.n0 + Wk.p + 2]]) {
  const pg = await openStill(T, BOOK, ID, card, lang);
  const q = await pg.evaluate(() => window.SAMSARA_DEBUG.state);
  const declared = await pg.getAttribute(`[data-preset="${card}"]`, 'data-still');
  check(`still ${card} (${lang}): its declared frame matches the clock and caption`,
    !q.playing && Math.abs(q.t - time) < 1e-9 && (declared === 'end' ? q.t === q.max : Number(declared) === q.t) && ((card === 'staircase' ? q.k : q.n) === time), JSON.stringify({ q, declared }));
  await pg.context().close();
}

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
