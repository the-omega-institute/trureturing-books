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
const headA = () => page.textContent('#pATitle');
/** The heading of the first strip plot in the mirrors scene names both ways of looking and promises no pattern of
    sides: whether A changes side at a beat depends on the start (see the side sweep below). */
const neutralHead = ([zh, en]) => /逐拍/.test(zh) && /逐轮/.test(zh) && !/换边|交替|摇摆|同侧|异侧|越过|单侧/.test(zh)
  && /beat by beat/i.test(en) && /round by round/i.test(en) && !/swap|altern|swing|cross|side|not each/i.test(en);
const bothLangs = async (read) => {
  const zh = await read(); await page.click('[data-lang-set="en"]'); await settle(page);
  const en = await read(); await page.click('[data-lang-set="zh"]'); await settle(page);
  return [zh, en];
};

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
// all 13 plotted states, not only the rounds: A above θ*, B below θ* at every beat, so A never changes side here
check('APART: all 13 plotted states have A above θ* and B below θ* (page and two-chain reference)',
  s.xs.length === 13 && s.ys.length === 13 && s.xs.every((x, t) => x > THETA && s.ys[t] < THETA && chainX(1.5, 0, t) > THETA && chainY(1.5, 0, t) < THETA));
check('APART band: all 13 bars of A\'s error stand above θ*, each the two-chain error',
  !!s.band && s.band.bars.length === 13 && s.band.bars.every((b) => b.sign > 0 && Math.abs(b.e - (chainX(1.5, 0, b.n) - THETA)) < 1e-13));
{ const h = await bothLangs(headA);
  check('APART: the strip heading (中/EN) names beat by beat and round by round and promises no change of side', s.view === 'round' && neutralHead(h), h.join(' | ')); }
{ const blurb = await page.evaluate(() => `${document.querySelector('meta[name="description"]').content} ${document.querySelector('.tagline').textContent}`);
  check('description and tagline: the pair may cross sides beat by beat, not "always alternates"',
    (blurb.match(/逐拍可以换边/g) || []).length === 2 && (blurb.match(/may cross sides beat by beat/g) || []).length === 2 && !/左右交替|左右摇摆|alternating sides|swing from side to side/.test(blurb), blurb); }
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
// the band under the plane: one bar per cosine evaluation, its height the signed error on a symmetric log scale
{ const B = s.band; let ok = !!B && B.view === 'beat' && B.k === 12 && B.bars.length === 13;
  for (const b of (B ? B.bars : [])) { const e = chainX(0.1, 0.1, b.n) - THETA, h = Math.sign(e) * Math.log(1 + Math.abs(e) / 1e-3) / Math.log(801);
    ok = ok && Math.abs(b.e - e) < 1e-14 && Math.abs(b.h - h) < 1e-12 && b.sign === Math.sign(e) && Math.abs(b.h) <= 1; }
  check('SAME-START band: bar n is A\'s error x_n − θ* after n cosine evaluations, on the symmetric log scale, inside the band', ok);
  check('SAME-START band: the bars alternate above and below θ* at every count', B && B.bars.slice(0, 12).every((b, i) => b.sign === -B.bars[i + 1].sign));
  check('SAME-START band: it names the factor of one beat, −sin θ* (finite differences, 3 decimals)', B && B.factor.includes(`−${(-slopeF).toFixed(3)}`), B && B.factor);
  check('SAME-START band: the amber readout is the error at this count', B && Math.abs(B.now - (chainX(0.1, 0.1, 12) - THETA)) < 1e-14); }
s = await card('round');
s = await seek(10);
{ const B = s.band;
  check('ONE-ROUND band: the ringed (even) bars all lie below θ* and shrink, the odd ones above', B && B.view === 'round' && B.bars.filter((b) => b.n % 2 === 0).every((b, i, a) => b.sign < 0 && (i === 0 || Math.abs(b.h) < Math.abs(a[i - 1].h))) && B.bars.filter((b) => b.n % 2).every((b) => b.sign > 0));
  check('ONE-ROUND band: it names the factor of one round, sin²θ* (finite differences, 3 decimals), and two evaluations a round', B && B.factor.includes(slopeG.toFixed(3)) && /两次求值/.test(B.factor), B && B.factor);
  check('ONE-ROUND band: bars are drawn up to this count only (10 of 12)', B && B.k === 10 && B.bars.filter((b) => b.shown).length === 11); }
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

// sides beat by beat. cos falls on [0, π/2] and the orbit stays there, so A's next error has the sign opposite to B's:
// a start with both readings on one side of θ* crosses at every beat, one with them on opposite sides never does. The
// two-chain reference decides, beat by beat, for opposite starts, equal low and high starts, mixed same-side starts and
// starts next to θ*; the page's orbit and band must agree in both views, and the heading must stay true in either case.
const STARTS = [[1.5, 0, 'keep'], [0, 1.5, 'keep'], [0.2, 0.2, 'cross'], [1.3, 1.3, 'cross'], [0.3, 0.6, 'cross'], [1, 1.4, 'cross'], [0.74, 0.73, 'keep'], [0.74, 0.75, 'cross']];
const sides = (a, b) => Array.from({ length: 13 }, (_, t) => [Math.sign(chainX(a, b, t) - THETA), Math.sign(chainY(a, b, t) - THETA)]);
const kind = (sd) => (sd.slice(1).every(([x, y], t) => x === -sd[t][0] && y === -sd[t][1]) ? 'cross'
  : sd.every(([x, y]) => x === sd[0][0] && y === sd[0][1]) ? 'keep' : 'mixed');
/** What the page shows for the start (a, b) against the reference: '' when it agrees, else why not. */
const sideFault = (st, a, b, want) => {
  const sd = sides(a, b), rule = sd[0][0] === sd[0][1] ? 'cross' : 'keep';
  if (rule !== want || kind(sd) !== want) return `(${a}, ${b}): reference ${kind(sd)}, start rule ${rule}, expected ${want}`;
  if (st.x0 !== a || st.y0 !== b || st.beat !== 12) return `(${a}, ${b}): page start (${st.x0}, ${st.y0}) at beat ${st.beat}`;
  const err = Math.max(...st.xs.map((x, t) => Math.max(Math.abs(x - chainX(a, b, t)), Math.abs(st.ys[t] - chainY(a, b, t)))));
  if (!(st.xs.length === 13 && err < 1e-14)) return `(${a}, ${b}): orbit off the two chains by ${err}`;
  if (!st.xs.every((x, t) => Math.sign(x - THETA) === sd[t][0] && Math.sign(st.ys[t] - THETA) === sd[t][1])) return `(${a}, ${b}): sides differ from the reference`;
  if (!(st.band && st.band.view === st.view && st.band.bars.length === 13 && st.band.bars.every((bar) => bar.sign === sd[bar.n][0]))) return `(${a}, ${b}): band signs differ`;
  return '';
};
{
  const faults = [], heads = new Set(), seen = { keep: 0, cross: 0 };
  for (const view of ['beat', 'round']) {
    await page.click(`[data-view="${view}"]`); s = await state();
    if (s.view !== view || s.preset !== null) faults.push(`view chip ${view}: ${s.view}, card ${s.preset}`);
    for (const [a, b, want] of STARTS) {
      await slide('x0', a); await slide('y0', b); s = await seek(12);
      const f = sideFault(s, a, b, want), h = await bothLangs(headA);
      if (f) faults.push(`${view} ${f}`); else seen[want]++;
      if (!neutralHead(h)) faults.push(`${view} (${a}, ${b}) heading: ${h.join(' | ')}`);
      heads.add(h.join(' | '));
    }
  }
  check('sides: same-side starts cross θ* at every beat, opposite-side starts never do — eight starts × both views, page = two chains, band agrees',
    faults.length === 0 && seen.keep === 6 && seen.cross === 10, faults.slice(0, 3).join(' · '));
  check('sides: the strip heading is one neutral heading in both views and for every start (中/EN)', heads.size === 1 && neutralHead([...heads][0].split(' | ')), [...heads].join(' / '));
}
{ // a card, then the sliders over it; then the other scene and back
  const faults = [];
  const look = async (tag, a, b, want, view, preset) => {
    const h = await bothLangs(headA), f = sideFault(s, a, b, want);
    if (f) faults.push(`${tag}: ${f}`);
    if (s.view !== view || s.preset !== preset || s.scene !== 'mirror') faults.push(`${tag}: view ${s.view}, card ${s.preset}, scene ${s.scene}`);
    if (!neutralHead(h)) faults.push(`${tag} heading: ${h.join(' | ')}`);
  };
  s = await card('apart'); s = await seek(12); await look('APART card', 1.5, 0, 'keep', 'round', 'apart');
  s = await slide('y0', 0.6); s = await seek(12); await look('APART, then y₀ = 0.6', 1.5, 0.6, 'keep', 'round', null);
  s = await slide('x0', 0.2); s = await seek(12); await look('then x₀ = 0.2', 0.2, 0.6, 'cross', 'round', null);
  s = await card('alone'); s = await seek(12); await look('SAME-START card', 0.1, 0.1, 'cross', 'beat', 'alone');
  s = await slide('x0', 1); s = await seek(12); await look('SAME-START, then x₀ = 1', 1, 0.1, 'keep', 'beat', null);
  await page.click('[data-scene="cut"]'); s = await state();
  const cutHead = await bothLangs(headA);
  if (s.scene !== 'cut' || !/割/.test(cutHead[0]) || !/cut/i.test(cutHead[1])) faults.push(`cut scene heading: ${cutHead.join(' | ')}`);
  await page.click('[data-scene="mirror"]'); s = await state();
  if (s.t !== 0) faults.push(`back in the mirrors at t = ${s.t}`);
  s = await seek(12); await look('back from the cut scene', 1, 0.1, 'keep', 'beat', null);
  check('cards, sliders over them and the scene chips: the orbit, its sides and the neutral heading (中/EN) follow every change', faults.length === 0, faults.slice(0, 3).join(' · '));
}

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
