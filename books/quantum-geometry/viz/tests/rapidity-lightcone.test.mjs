#!/usr/bin/env node
// Browser regression suite for RAPIDITY//CONE (books/quantum-geometry/viz/rapidity-lightcone/).
//   node books/quantum-geometry/viz/tests/rapidity-lightcone.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// The page writes its boosts and turns with cosh/sinh and cos/sin. The suite works with matrix exponentials instead:
// B(η) = exp(ηK) with K = [[0, −1], [−1, 0]] and the turn exp(sJ) with J = [[0, 1], [−1, 0]], each summed as a power
// series; light-cone beads are checked in the coordinates u = t + x, u′ = t − x; the proper time of a leg is read as
// the time coordinate after boosting the leg into its own rest frame (again by the power series).
// It reads the page through window.CONE_DEBUG.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'rapidity-lightcone';
const T = await session();
const { check } = T;
const LN2 = Math.log(2);
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const near = (u, v, eps = 1e-9) => close(u[0], v[0], eps) && close(u[1], v[1], eps);

/* ---------- independent model: power series of 2 × 2 matrices ---------- */
const mm = (A, B) => [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]], [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]];
function expm(G, a) {
  let term = [[1, 0], [0, 1]], sum = [[1, 0], [0, 1]];
  for (let n = 1; n < 60; n++) {
    term = mm(term, G).map((r) => r.map((x) => x * a / n));
    sum = sum.map((r, i) => r.map((x, j) => x + term[i][j]));
  }
  return sum;
}
const apply = (A, v) => [A[0][0] * v[0] + A[0][1] * v[1], A[1][0] * v[0] + A[1][1] * v[1]];
const K = [[0, -1], [-1, 0]], J = [[0, 1], [-1, 0]];
const B = (eta, v, k = 1) => apply(expm(K, eta), v).map((x) => k * x);
const R = (s, v) => apply(expm(J, s), v);
/** Proper time of a future-directed timelike leg d: boost it into its rest frame and read the time. */
const restTau = (d) => { const r = 0.5 * Math.log((d[0] + d[1]) / (d[0] - d[1])); const w = B(r, d); return w[0]; };

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.CONE_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const seek = async (t) => { await page.evaluate((x) => window.CONE_DEBUG.seek(x), t); return state(); };
// a card plays for up to ~35 animation frames; with VIZ_SLOW_FRAMES=1000 that is longer than until()'s default 30 s
const stopped = (id) => until(page, (c) => { const s = window.CONE_DEBUG.state; return s.preset === c && !s.playing; }, id, 120000);
const plays = () => until(page, () => window.CONE_DEBUG.state.playing);
const clickAt = async (t, x) => { const p = await page.evaluate(([a, b]) => window.CONE_DEBUG.point(a, b), [t, x]); await page.mouse.move(p[0], p[1]); await page.mouse.down(); await page.mouse.up(); return state(); };

// BOOST ln 2 (the opening card): the chapter's example
let s = await state();
check('opens on BOOST ln 2 in the boost scene at η = ln 2', s.preset === 'boost' && s.scene === 'boost' && close(s.eta, LN2, 1e-12) && s.k === 1);
const e4 = B(LN2, [5, 3]);
check('BOOST: exp(ln 2 · K) takes (5, 3) to (4, 0), and the page agrees', near(e4, [4, 0], 1e-12) && near(s.boost.event, e4, 1e-12));
const E = expm(K, LN2);
check('BOOST: cosh ln 2 = 5/4, sinh ln 2 = 3/4, β = 3/5 (matrix entries of the series)', close(E[0][0], 1.25, 1e-12) && close(-E[0][1], 0.75, 1e-12) && close(s.boost.cosh, 1.25, 1e-12) && close(s.boost.sinh, 0.75, 1e-12) && close(s.boost.beta, 0.6, 1e-12));
check('BOOST: the key readout prints t² − x² = 16.0000', s.key.includes('16.0000'));
await pick('boost');
check('BOOST plays by itself when clicked', await plays());
check('BOOST stops at η = ln 2 by itself', await stopped('boost') && close((await state()).eta, LN2, 1e-9));
let worst = 0;
for (let i = 0; i <= 22; i++) { s = await seek(i * 0.1); worst = Math.max(worst, Math.abs(s.boost.event[0] ** 2 - s.boost.event[1] ** 2 - 16), Math.hypot(s.boost.event[0] - B(s.eta, [5, 3])[0], s.boost.event[1] - B(s.eta, [5, 3])[1])); }
check('the boosted event stays on t² − x² = 16 and matches the series at 23 points of the rail', worst < 1e-9, String(worst));

// CIRCLE / HYPERBOLA
await pick('circle');
check('CIRCLE plays by itself', await plays());
check('CIRCLE stops at s = 1.5', await stopped('circle'));
s = await state();
const rt = R(1.5, [5, 3]), bt = B(1.5, [5, 3]);
check('CIRCLE: the turned and boosted events match the series at s = 1.5', s.scene === 'orbit' && close(s.s, 1.5, 1e-9) && near(s.orbit.turned, rt, 1e-9) && near(s.orbit.boosted, bt, 1e-9));
check('CIRCLE: the turn keeps t² + x² = 34, the boost keeps t² − x² = 16', close(rt[0] ** 2 + rt[1] ** 2, 34, 1e-9) && close(bt[0] ** 2 - bt[1] ** 2, 16, 1e-9));
check('CIRCLE: the turned point is outside the light cone, the boosted one inside', Math.abs(rt[1]) > Math.abs(rt[0]) && bt[0] > Math.abs(bt[1]));
let crossT = null, crossB = false;
for (let i = 0; i <= 400; i++) { const x = -0.5 + 2 * i / 400, r = R(x, [5, 3]), b = B(x, [5, 3]); if (crossT == null && x > 0 && Math.abs(r[1]) > r[0]) crossT = x; if (b[0] <= Math.abs(b[1])) crossB = true; }
check('CIRCLE: on the rail the turn leaves the cone near s = 1.33 (as the note says) and the boost never does', crossT != null && Math.abs(crossT - 1.33) < 0.01 && !crossB, String(crossT));

// NULL CALIPER
await pick('caliper');
check('CALIPER plays by itself', await plays());
check('CALIPER stops at w = 3', await stopped('caliper'));
s = await state();
const qf = (v) => v[0] * v[0] - v[1] * v[1];
check('CALIPER: (3, 3) and (−3, 3) are null, (0, 3) has t² − x² = −9', close(s.w, 3, 1e-9) && near(s.caliper.plus, [3, 3], 1e-9) && near(s.caliper.minus, [-3, 3], 1e-9) && close(qf(s.caliper.plus), 0, 1e-9) && close(qf(s.caliper.minus), 0, 1e-9) && close(qf(s.caliper.spatial), -9, 1e-9));
check('CALIPER: sum 2(0, w) and difference 2|w|(1, 0)', near([s.caliper.plus[0] + s.caliper.minus[0], s.caliper.plus[1] + s.caliper.minus[1]], [0, 6]) && near([s.caliper.plus[0] - s.caliper.minus[0], s.caliper.plus[1] - s.caliper.minus[1]], [6, 0]));
worst = 0;
for (let i = 0; i <= 20; i++) { s = await seek(i * 0.5); const w = s.w; worst = Math.max(worst, Math.abs(qf(s.caliper.plus)), Math.abs(qf(s.caliper.minus)), Math.abs(qf(s.caliper.spatial) + w * w), Math.abs(s.caliper.plus[1] - w)); }
check('CALIPER: for 21 values of w both arrows stay null and q(0, w) = −w²', worst < 1e-9, String(worst));

// CONE FIXED
await pick('cone');
check('CONE plays by itself', await plays());
check('CONE stops at η = 1', await stopped('cone'));
s = await state();
let beadOk = s.boost.beads.length === 8;
const want = []; for (const j of [1, 2, 3, 4]) want.push(B(1, [j, j]), B(1, [j, -j]));
for (let i = 0; i < 8; i++) beadOk = beadOk && near(s.boost.beads[i], want[i], 1e-9);
check('CONE: the eight beads match the series at η = 1', beadOk);
const lc = (v) => [v[0] + v[1], v[0] - v[1]];
check('CONE: in coordinates u = t + x, u′ = t − x each bead keeps u or u′ = 0 and the other is scaled by e^∓1', s.boost.beads.every((b, i) => { const j = Math.floor(i / 2) + 1, [u, u2] = lc(b); return i % 2 === 0 ? close(u2, 0, 1e-9) && close(u, 2 * j * Math.exp(-1), 1e-9) : close(u, 0, 1e-9) && close(u2, 2 * j * Math.exp(1), 1e-9); }));

// SCALE k
await pick('scale');
check('SCALE plays by itself', await plays());
check('SCALE stops at η = ln 2', await stopped('scale'));
s = await state();
check('SCALE: k = 1.5 sends (5, 3) to (6, 0), t² − x² = 36 = 2.25 × 16', s.k === 1.5 && near(s.boost.event, B(LN2, [5, 3], 1.5), 1e-9) && near(s.boost.event, [6, 0], 1e-9) && close(qf(s.boost.event), 2.25 * 16, 1e-9));
check('SCALE: the unit tick has t² − x² = k² = 2.25 and the beads stay null', close(qf(s.boost.tick), 2.25, 1e-9) && s.boost.beads.every((b) => close(qf(b), 0, 1e-9)));
check('SCALE: q(kBv) = q(kBe₀) · q(v) for random v (series)', [[2.3, -0.7], [-1.1, 4.2], [0.4, 0.4]].every((v) => close(qf(B(LN2, v, 1.5)), qf(B(LN2, [1, 0], 1.5)) * qf(v), 1e-9)));
await page.evaluate(() => { const el = document.getElementById('k'); el.value = '0.5'; el.dispatchEvent(new Event('input', { bubbles: true })); });
s = await state();
check('the scale slider: k = 0.5 leaves the card and puts the event on t² − x² = 4', s.k === 0.5 && s.preset === null && close(qf(s.boost.event), 4, 1e-9));
await page.evaluate(() => { const el = document.getElementById('k'); el.value = '1'; el.dispatchEvent(new Event('input', { bubbles: true })); });

// dragging the event along its hyperbola (boost scene)
await seek(0.6); s = await clickAt(5, -3);
check('dragging in the boost scene to (5, −3) moves the event there along t² − x² = 16', Math.hypot(s.boost.event[0] - 5, s.boost.event[1] + 3) < 0.15 && close(qf(s.boost.event), 16, 1e-9) && s.preset === null, JSON.stringify(s.boost.event));

// NULL PATH
// these two cards move A with a transition, which settle() would finish: read the state straight after the click
const clickPlays = async (id) => { await page.click(`[data-preset="${id}"]`); return page.evaluate(() => { const s = window.CONE_DEBUG.state; return s.playing && s.preset !== null; }); };
check('NULL PATH plays by itself (A starts moving from (5, 3))', await clickPlays('light'));
check('NULL PATH stops with A = (5, 5)', await stopped('light'));
s = await state();
check('NULL PATH: both legs null, τ = 0, no ticks; the rest worldline 10 ticks', near(s.apex, [5, 5]) && close(s.paths.tauBent, 0, 1e-9) && s.paths.ticksBent === 0 && close(s.paths.tauRest, 10, 1e-9) && s.paths.ticksRest === 10);

// BENT 8 · REST 10
check('TWINS plays by itself (A starts moving from (5, 0))', await clickPlays('twins'));
check('TWINS stops with A = (5, 3)', await stopped('twins'));
s = await state();
check('TWINS: τ = 4 + 4 = 8 against 10, read off in each leg\'s rest frame', near(s.apex, [5, 3]) && close(restTau([5, 3]), 4, 1e-9) && close(restTau([5, -3]), 4, 1e-9) && close(s.paths.tau1, 4, 1e-9) && close(s.paths.tau2, 4, 1e-9) && close(s.paths.tauRest, 10, 1e-12) && s.paths.ticksBent === 8 && s.paths.ticksRest === 10);
check('TWINS: the HUD and the key readout print 8.000 and 10.000', s.key.includes('8.000') && s.key.includes('10.000'));

// ANY FRAME
await pick('frames');
check('FRAMES plays by itself', await plays());
check('FRAMES stops at η = ln 2', await stopped('frames'));
s = await state();
check('FRAMES: A becomes (4, 0) and P becomes (12.5, −7.5) (series)', near(s.paths.A, B(LN2, [5, 3]), 1e-9) && near(s.paths.A, [4, 0], 1e-9) && near(s.paths.P, [12.5, -7.5], 1e-9));
check('FRAMES: the leg coordinate times are 4 and 8.5, the proper times still 8 and 10', close(s.paths.dt1, 4, 1e-9) && close(s.paths.dt2, 8.5, 1e-9) && close(s.paths.tauBent, 8, 1e-9) && close(s.paths.tauRest, 10, 1e-9));
worst = 0;
for (let i = 0; i <= 14; i++) {
  s = await seek(i * LN2 / 7);
  const A = B(s.etaP, [5, 3]), Pp = B(s.etaP, [10, 0]);
  worst = Math.max(worst, Math.abs(s.paths.tauBent - restTau(A) - restTau([Pp[0] - A[0], Pp[1] - A[1]])), Math.abs(s.paths.tauRest - restTau(Pp)), Math.abs(s.paths.tauBent - 8));
}
check('FRAMES: at 15 frames from η = −ln 2 to ln 2 the totals stay 8 and 10 (rest-frame reading)', worst < 1e-9, String(worst));

// dragging the turning point is clamped to the diamond
await seek(LN2); s = await clickAt(2, 6);
check('dragging A to (2, 6) clamps it to the diamond edge (2, 2)', Math.hypot(s.apex[0] - 2, s.apex[1] - 2) < 0.1 && Math.abs(s.apex[1]) <= s.apex[0] + 1e-9 && s.preset === null, JSON.stringify(s.apex));
await page.click('#apexReset'); s = await state();
check('“A back to (5, 3)” resets the turning point', near(s.apex, [5, 3]));

// caliper drag
await page.click('#sceneChips [data-scene="caliper"]'); s = await clickAt(1, -2);
check('dragging in the caliper scene sets w to the pointer\'s x', Math.abs(s.w + 2) < 0.08, String(s.w));

// scenes, rail and keyboard
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('1'); check('key 1 opens the compare scene', (await state()).scene === 'orbit');
await page.keyboard.press('2'); check('key 2 opens the boost scene', (await state()).scene === 'boost');
await page.keyboard.press('3'); check('key 3 opens the caliper scene', (await state()).scene === 'caliper');
await page.keyboard.press('4'); check('key 4 opens the worldline scene', (await state()).scene === 'paths');
await page.click('#sceneChips [data-scene="boost"]'); check('the scene chips switch scenes', (await state()).scene === 'boost');
await page.keyboard.press('Home'); check('Home goes to η = −0.6', close((await state()).eta, -0.6, 1e-9));
await page.keyboard.press('ArrowRight'); check('→ steps η by 0.1', close((await state()).eta, -0.5, 1e-9));
await page.keyboard.press('End'); check('End goes to η = 1.6', close((await state()).eta, 1.6, 1e-9));
await page.click('#rew'); check('⏮ goes back to η = −0.6', close((await state()).eta, -0.6, 1e-9));
await page.click('#speedChips [data-speed="2.5"]'); check('the speed chips select 2.5×', (await page.getAttribute('#speedChips [data-speed="2.5"]', 'aria-pressed')) === 'true');
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.CONE_DEBUG.state.eta > -0.6 + 1e-6));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
await page.click('#play'); check('▶ plays', await plays());
await page.click('#play'); check('▶ again pauses', !(await state()).playing);
await page.evaluate(() => { const el = document.getElementById('now'); el.value = String(0.6 + Math.log(2)); el.dispatchEvent(new Event('input', { bubbles: true })); });
s = await state();
check('the rail sets η and the event follows', close(s.eta, LN2, 1e-9) && near(s.boost.event, [4, 0], 1e-9));

// English
await page.click('[data-lang-set="en"]'); await pick('twins'); await stopped('twins');
check('English: the HUD reads “Worldlines · η = 0.000”', (await page.textContent('#hudBig')).trim() === 'Worldlines · η = 0.000');

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
