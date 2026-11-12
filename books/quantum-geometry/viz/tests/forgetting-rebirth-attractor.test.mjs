#!/usr/bin/env node
// Browser regression suite for ORTHO//SAMSARA (books/quantum-geometry/viz/forgetting-rebirth-attractor/).
//   node books/quantum-geometry/viz/tests/forgetting-rebirth-attractor.test.mjs   (or node tools/node/viz-test.mjs quantum-geometry)
// Independent model, written here and never taken from the page:
//   θ* by bisection on cos θ − θ; η₀ = ∫₀^θ* sec α dα by Simpson's rule; θ(η) = atan(sinh η) (not 2 atan eᵑ − π/2);
//   the Klein radius as sinh η / √(1 + sinh²η), the Poincaré radius as tan(θ/2); the gap 1 − tanh η as 2e^{−2η}/(1 + e^{−2η});
//   the Poincaré geodesics checked by fitting a circle through three of their points and testing |centre|² = R² + 1;
//   the angle-ruler walk re-simulated and its period found by scanning; pinching masses from the 2 × 2 entries;
//   the fractional map as |s − 1|/|s| with complex arithmetic.
// It reads the page through window.SAMSARA_DEBUG.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

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

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
