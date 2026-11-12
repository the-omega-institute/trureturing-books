#!/usr/bin/env node
// Browser regression suite for quantum-geometry/viz/mutual-observer-attractors (Playwright + Chromium):
//   node books/quantum-geometry/viz/tests/mutual-observer-attractors.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// stageFirstChecks first; then one check per control and per experiment card, and every property the page claims,
// against computations written here (bisection, the two-chain form of the orbit, finite differences, a sign scan,
// products instead of logarithms), never by calling the page's own functions.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'mutual-observer-attractors';
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID);

const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.MOA_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.MOA_DEBUG.seek(v), t); return state(); };
const card = async (id) => { await page.click(`[data-preset="${id}"]`); return state(); };
const slide = async (id, v) => { await page.evaluate(([i, x]) => { const el = document.getElementById(i); el.value = String(x); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); return state(); };

/* ---------- independent references ---------- */
function bisect(f, a, b) { let fa = f(a); for (let i = 0; i < 200; i++) { const m = (a + b) / 2, fm = f(m); if ((fm > 0) === (fa > 0)) { a = m; fa = fm; } else b = m; } return (a + b) / 2; }
const THETA = bisect((x) => Math.cos(x) - x, 0, 1);
/** The mutual orbit in its two-chain form: x_t is the t-fold cosine of x₀ for even t and of y₀ for odd t. */
function cosPow(x, n) { for (let i = 0; i < n; i++) x = Math.cos(x); return x; }
const chainX = (x0, y0, t) => cosPow(t % 2 ? y0 : x0, t), chainY = (x0, y0, t) => cosPow(t % 2 ? x0 : y0, t);
const g = (x) => Math.cos(Math.cos(x));
const H = 1e-5;
const slopeF = (Math.cos(THETA + H) - Math.cos(THETA - H)) / (2 * H);   // −sin θ*
const slopeG = (g(THETA + H) - g(THETA - H)) / (2 * H);                  // sin²θ*
const dcritBisect = (l1, l2) => bisect((d) => d * (l1 + l2 + d) - l1 * l2, 0, Math.max(l1, l2) + 1);

let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on the APART card at its last beat', s.preset === 'apart' && s.scene === 'mirror' && s.beat === 12 && !s.playing, JSON.stringify({ p: s.preset, b: s.beat }));
check('θ* agrees with bisection of cos x = x', Math.abs(s.theta - THETA) < 1e-13, `${s.theta} vs ${THETA}`);
check('the slope of one beat, −sin θ* ≈ −0.6736, and of one round, sin²θ* ≈ 0.4538 (finite differences)',
  Math.abs(slopeF + 0.6736) < 5e-5 && Math.abs(slopeG - 0.4538) < 5e-5 && Math.abs(slopeG - slopeF * slopeF) < 1e-8, `${slopeF} ${slopeG}`);

// the orbit of the page against the two-chain form, for the opening start (1.5, 0)
let worst = 0;
for (let t = 0; t <= 12; t++) worst = Math.max(worst, Math.abs(s.xs[t] - chainX(1.5, 0, t)), Math.abs(s.ys[t] - chainY(1.5, 0, t)));
check('APART: every beat of the orbit equals the two interleaved cosine chains', worst < 1e-14, `max error ${worst}`);
check('APART: round by round A falls from above and B rises from below, never crossing θ*',
  [0, 2, 4, 6, 8, 10].every((t) => s.xs[t] > s.xs[t + 2] && s.xs[t + 2] > THETA && s.ys[t] < s.ys[t + 2] && s.ys[t + 2] < THETA));
check('APART: the error ratio over the last round is near the finite-difference slope of g', Math.abs(s.roundRatio - slopeG) < 0.01, `${s.roundRatio}`);
check('APART: one beat, A reading B, multiplies the error by about the slope of cos', Math.abs(s.beatRatio - slopeF) < 0.01, `${s.beatRatio}`);
// no other balance: x = cos(cos x) changes sign exactly once on [−3, 3] (and so x = cos y, y = cos x meet once)
let changes = 0, prev = g(-3) - (-3);
for (let i = 1; i <= 60000; i++) { const x = -3 + 6 * i / 60000, v = g(x) - x; if ((v > 0) !== (prev > 0)) changes++; prev = v; }
check('the two readout curves meet once: g(x) − x changes sign exactly once on [−3, 3]', changes === 1, `${changes}`);

// SAME-START: on the diagonal, crossing θ* at every beat; the numbers of the chapter's table
s = await card('alone');
check('SAME-START: x₀ = y₀ = 0.1 in the beat view, and it plays', s.x0 === 0.1 && s.y0 === 0.1 && s.view === 'beat');
check('SAME-START: the card plays by itself', await until(page, () => { const d = window.MOA_DEBUG.state; return d.playing && d.t > 0; }));
await page.evaluate(() => window.MOA_DEBUG.jump(5.9));
check('SAME-START: the play stops at beat 6', await until(page, () => { const d = window.MOA_DEBUG.state; return !d.playing && d.t === 6; }));
s = await seek(12);
check('SAME-START: the pair stays on the diagonal', s.xs.every((x, t) => x === s.ys[t]));
check('SAME-START: the error changes sign at every beat', s.xs.slice(0, 12).every((x, t) => (x - THETA) * (s.xs[t + 1] - THETA) < 0));
const table = [0.1, 0.995004, 0.544499, 0.855387, 0.655927, 0.792483];
check('SAME-START: beats 0–5 match the isolated column of the chapter\'s table (6 decimals)', table.every((v, t) => Math.abs(s.xs[t] - v) < 5e-7), s.xs.slice(0, 6).join(', '));
s = await card('round');
s = await seek(10);
const rounds = [0.1, 0.544499, 0.655927, 0.702079, 0.722420, 0.731547];
check('ONE-ROUND: every second beat matches the mutual column of the chapter\'s table, y_k = x_{2k}', s.view === 'round' && rounds.every((v, k) => Math.abs(s.xs[2 * k] - v) < 5e-7 && (k === 0 || Math.abs(g(s.xs[2 * k - 2]) - s.xs[2 * k]) < 1e-14)));
check('ONE-ROUND: the round samples stay below θ* and rise monotonically', [0, 2, 4, 6, 8].every((t) => s.xs[t] < s.xs[t + 2] && s.xs[t + 2] < THETA));
{ // the card note: the rings are the even beats of the same-start orbit, so 2k cosine evaluations land in the same place either way
  let x = 0.1, ok = true; for (let n = 0; n <= 10; n++) { if (Math.abs(s.xs[n] - x) > 1e-14) ok = false; x = Math.cos(x); }
  check('ONE-ROUND: no speed-up — beat n of the orbit is n plain cosine evaluations of 0.1, and the ring after k rounds is beat 2k', ok); }

// any start in [0, 1.5]²: rounds monotone towards θ* and the limit is the consensus point
let okAll = true;
for (const [a, b] of [[0, 0], [0.3, 1.2], [1.5, 1.5], [0.74, 0.2], [1.1, 0.05]]) {
  await slide('x0', a); s = await slide('y0', b); s = await seek(12);
  const mono = (arr) => [0, 2, 4, 6, 8, 10].every((t) => Math.abs(arr[t + 2] - THETA) <= Math.abs(arr[t] - THETA) && (arr[t + 2] - THETA) * (arr[t] - THETA) >= 0);
  okAll = okAll && s.x0 === a && s.y0 === b && mono(s.xs) && mono(s.ys) && Math.abs(s.x - THETA) < 0.02 && Math.abs(s.y - THETA) < 0.02;
}
check('the start sliders move the orbit; from five starts the rounds close in on (θ*, θ*) from one side', okAll);
check('moving a slider leaves the card', s.preset === null);
await page.click('[data-view="beat"]'); s = await state();
check('the view chips switch to beat by beat', s.view === 'beat');
// pressing on the stage sets the start
const to = await page.evaluate(() => window.MOA_DEBUG.at(1.2, 0.4));
await page.mouse.move(to[0], to[1]); await page.mouse.down(); await page.mouse.up(); s = await state();
check('pressing on the stage puts the start there', Math.abs(s.x0 - 1.2) <= 0.011 && Math.abs(s.y0 - 0.4) <= 0.011, `${s.x0}, ${s.y0}`);

// D-CRIT: the play stops where the two cuts tie, at the root of d(l₁ + l₂ + d) = l₁l₂
s = await card('transition');
check('D-CRIT: the card switches to the cut scene and plays', s.scene === 'cut' && s.l1 === 1 && s.l2 === 1);
check('D-CRIT: the card plays by itself', await until(page, () => { const d = window.MOA_DEBUG.state; return d.playing && d.t > 0; }));
await page.evaluate(() => window.MOA_DEBUG.jump(window.MOA_DEBUG.tOf(0.43)));
check('D-CRIT: the play stops on its own', await until(page, () => !window.MOA_DEBUG.state.playing && window.MOA_DEBUG.state.t > 0.3));
s = await state();
const dc = dcritBisect(1, 1);
check('D-CRIT: closed-form d_crit equals bisection and √2 − 1', Math.abs(s.dcrit - dc) < 1e-12 && Math.abs(dc - (Math.SQRT2 - 1)) < 1e-12, `${s.dcrit} ${dc}`);
check('D-CRIT: it stops at d_crit, where the cuts tie and I = 0', Math.abs(s.d - dc) < 1e-9 && s.winner === 'tie' && Math.abs(s.sep - s.conn) < 1e-8 && s.I < 1e-8, JSON.stringify({ d: s.d, w: s.winner }));
s = await card('connected');
check('CONNECTED: d = 0.2, the connected cut wins, I = ln(1/(0.2 · 2.2)) ≈ 0.82',
  Math.abs(s.d - 0.2) < 1e-9 && s.winner === 'conn' && Math.abs(s.I - Math.log(1 / (0.2 * 2.2))) < 1e-12, `${s.I}`);

// the two sides of the transition for unequal intervals: the page's min against products, I against its closed form
await slide('l1', 1.5); s = await slide('l2', 0.6);
const dc2 = dcritBisect(1.5, 0.6);
check('the length sliders set l₁, l₂ and move d_crit (closed form = bisection)', s.l1 === 1.5 && s.l2 === 0.6 && Math.abs(s.dcrit - dc2) < 1e-12, `${s.dcrit} ${dc2}`);
let bad = [];
for (const t of [0, 0.1, 0.3, 0.45, 0.55, 0.7, 0.9, 1]) {
  s = await seek(t);
  const lhs = s.d * (s.l1 + s.l2 + s.d), rhs = s.l1 * s.l2, conn = lhs < rhs;
  const lenSep = Math.log(s.l1 / s.eps) + Math.log(s.l2 / s.eps), lenConn = Math.log(s.d / s.eps) + Math.log((s.l1 + s.l2 + s.d) / s.eps);
  const I = Math.max(0, Math.log(rhs / lhs));
  if (s.winner !== (conn ? 'conn' : 'sep') || Math.abs(s.sep - lenSep) > 1e-12 || Math.abs(s.conn - lenConn) > 1e-12 || Math.abs(s.I - I) > 1e-12 || (s.I > 0) !== conn || (s.d < dc2) !== conn) bad.push(t);
}
check('both sides of d_crit: the shorter cut is the connected one exactly when d(l₁ + l₂ + d) < l₁l₂, and only then I > 0', bad.length === 0, bad.join(','));
// dragging on the stage sets the gap
const p2 = await page.evaluate(() => window.MOA_DEBUG.at(0.5, 0.3));
await page.mouse.move(p2[0], p2[1]); await page.mouse.down(); await page.mouse.up(); s = await state();
check('pressing on the cut stage sets the gap to twice the distance from the middle', Math.abs(s.d - 1) < 0.02, `d = ${s.d}`);

// scenes, keys, transport
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('1'); s = await state(); check('key 1 switches to the mirrors scene', s.scene === 'mirror');
await page.keyboard.press('2'); s = await state(); check('key 2 switches to the cut scene', s.scene === 'cut');
await page.click('[data-scene="mirror"]'); s = await state(); check('the scene chip switches back', s.scene === 'mirror' && s.t === 0);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('ArrowRight'); s = await state(); check('→ steps one beat', s.beat === 1);
await page.keyboard.press('Space');
check('Space plays', await until(page, () => { const d = window.MOA_DEBUG.state; return d.playing && d.t > 1.2; }));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
await page.click('#rew'); s = await state(); check('⏮ goes back to beat 0', s.t === 0);
await page.click('[data-lang-set="en"]'); s = await state();
check('the key readout is rewritten in English', /Error ratio/.test(await page.textContent('#roKeyL')));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
