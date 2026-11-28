#!/usr/bin/env node
// Browser regression suite for omega-math/viz/omega-math-workbench (Playwright + Chromium):
//   node books/omega-math/viz/tests/omega-math-workbench.test.mjs        (or node tools/node/viz-test.mjs omega-math)
// stageFirstChecks is the battery every stage-first page must pass, here with the lit-solid checks. After it come the
// checks of this page: one for every control, and one for each property the page claims, against independent
// mathematics written below in big integers (never by calling the page's own functions). The page is read through
// its read-only probe window.OMEGALAB_DEBUG, whose fractions are [numerator, denominator] pairs of decimal strings.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../../../../tools/node/viz-common.mjs';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, labelOverlaps, overflowX } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'omega-math';
const ID = 'omega-math-workbench';
const CARDS = {
  'bargmann-gram-triad': { scene: 'bargmann', still: 16, max: 16 },
  'jet2-osculating-sphere': { scene: 'jet', still: 8, max: 8 },
  'pi-free-haar-peter-weyl': { scene: 'haar', still: 12, max: 16 },
  'hecke-p5-and-omega-fractran': { scene: 'hecke', still: 6, max: 6 }
};
const [TRIAD, JET, HAAR, HECKE] = Object.keys(CARDS);
const GIDS = [
  'D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_scale',
  'D5/S3/Quantum/AURICOmega/ProjectiveOverlapScaling.kappa_scale',
  'D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_add_spread_eq_one',
  'D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit',
  'D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure',
  'D5/S3/Quantum/AURICOmega/OmegaCircleClosure.projective_circle_mul_normSq'
];
const range = (n) => Array.from({ length: n }, (_, i) => i);

/* ---------- independent mathematics, written here and never calling the page ---------- */
const absN = (a) => (a < 0n ? -a : a);
/** The gcd by the binary (Stein) method, unlike the page's Euclid. */
function steinN(a, b) {
  a = absN(a);
  b = absN(b);
  if (!a) return b;
  if (!b) return a;
  let s = 0n;
  while (!((a | b) & 1n)) {
    a >>= 1n;
    b >>= 1n;
    s++;
  }
  while (!(a & 1n)) a >>= 1n;
  while (b) {
    while (!(b & 1n)) b >>= 1n;
    if (a > b) [a, b] = [b, a];
    b -= a;
  }
  return a << s;
}
const Q = (p, q = 1n) => {
  p = BigInt(p);
  q = BigInt(q);
  if (q === 0n) throw new Error('zero denominator');
  const g = steinN(p, q) * (q < 0n ? -1n : 1n);
  return [p / g, q / g];
};
const addQ = ([a, b], [c, d]) => Q(a * d + c * b, b * d),
  subQ = ([a, b], [c, d]) => Q(a * d - c * b, b * d),
  mulQ = ([a, b], [c, d]) => Q(a * c, b * d),
  divQ = ([a, b], [c, d]) => Q(a * d, b * c);
const ZERO = Q(0),
  ONE = Q(1);
/** Equal as rationals, by cross multiplication (the probe's pairs are reduced, but the test does not rely on it). */
const eqQ = (x, y) => BigInt(x[0]) * BigInt(y[1]) === BigInt(y[0]) * BigInt(x[1]);
/** A probe fraction, also reduced and with a positive denominator. */
const reducedQ = (x) => {
  const [p, q] = x.map(BigInt);
  return q > 0n && steinN(p, q) === 1n;
};
const strQ = ([p, q]) => `${p}${BigInt(q) === 1n ? '' : '/' + q}`;
const Z = (t) => t.map(BigInt);
/** Quaternion product through the 4 × 4 matrix of right multiplication by b (the page multiplies componentwise). */
const rightM = ([w, x, y, z]) => [
  [w, -x, -y, -z],
  [x, w, z, -y],
  [y, -z, w, x],
  [z, y, -x, w]
];
const qmulN = (a, b) => rightM(b).map((row) => row.reduce((s, v, j) => s + v * a[j], 0n));
const conjN = ([w, x, y, z]) => [w, -x, -y, -z];
const dotN = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0n);
/** The canonical line: divide by primes while all entries allow it, then make the first nonzero entry positive. */
function canonN(t) {
  let v = Z(t);
  if (v.every((x) => x === 0n)) return null;
  const top = v.reduce((m, x) => (absN(x) > m ? absN(x) : m), 0n);
  for (let p = 2n; p <= top; ) {
    if (v.every((x) => x % p === 0n)) v = v.map((x) => x / p);
    else p++;
  }
  const lead = v.find((x) => x !== 0n);
  return lead < 0n ? v.map((x) => -x) : v;
}
const kappaN = (a, b) => Q(dotN(a, b) ** 2n, dotN(a, a) * dotN(b, b));
const O = Z([1, 0, 0, 0]);
/** det G₃ directly: the 3 × 3 Gram determinant by Sarrus, over ‖a‖²‖b‖²‖c‖². */
function gramDetN(a, b, c) {
  const V = [a, b, c],
    G = V.map((u) => V.map((v) => dotN(u, v)));
  const det =
    G[0][0] * G[1][1] * G[2][2] + G[0][1] * G[1][2] * G[2][0] + G[0][2] * G[1][0] * G[2][1] - G[0][2] * G[1][1] * G[2][0] - G[0][0] * G[1][2] * G[2][1] - G[0][1] * G[1][0] * G[2][2];
  return Q(det, G[0][0] * G[1][1] * G[2][2]);
}
/** The point of the rail: c(k) = (16 − k)·[b, o, b] + k·c on canonical representatives. */
function railPointN(b, c, k) {
  const bb = canonN(b),
    c0 = canonN(qmulN(qmulN(bb, conjN(O)), bb)),
    ce = canonN(c);
  return { bb, c0, c: canonN(c0.map((v, i) => (16n - BigInt(k)) * v + BigInt(k) * ce[i])) };
}
/** The jet of κ = 1/(1 + x²) at x₀: solve (1 + x₀² + 2x₀η + η²)(j₀ + j₁η + j₂η²) = 1 one coefficient at a time. */
function jetN(x0) {
  const b0 = addQ(ONE, mulQ(x0, x0)),
    b1 = mulQ(Q(2), x0),
    j0 = divQ(ONE, b0),
    j1 = divQ(subQ(ZERO, mulQ(b1, j0)), b0),
    j2 = divQ(subQ(ZERO, addQ(mulQ(b1, j1), j0)), b0);
  return [j0, j1, j2];
}
const fN = (x) => divQ(ONE, addQ(ONE, mulQ(x, x)));
/** The α-step of §7.4 on the Cayley circle at x₀ = P/Q: x₀ = R(x₀), R′ = ωJR with ω = 2/(1 + x₀²), J(X, Y) = (−Y, X);
    solve (I − αhωJ)x₁ = (I + (1 − α)hωJ)x₀ by Cramer's rule. */
function alphaStepN(P, Qd, h, al) {
  const n = BigInt(P * P + Qd * Qd),
    X = Q(BigInt(Qd * Qd - P * P), n),
    Y = Q(BigInt(2 * P * Qd), n),
    x0 = Q(P, Qd),
    om = divQ(Q(2), addQ(ONE, mulQ(x0, x0))),
    a = mulQ(mulQ(al, h), om),
    b = mulQ(mulQ(subQ(ONE, al), h), om),
    r = [subQ(X, mulQ(b, Y)), addQ(Y, mulQ(b, X))],
    det = addQ(ONE, mulQ(a, a));
  const x1 = [divQ(subQ(r[0], mulQ(a, r[1])), det), divQ(addQ(mulQ(a, r[0]), r[1]), det)],
    n2 = addQ(mulQ(x1[0], x1[0]), mulQ(x1[1], x1[1])),
    d = [subQ(x1[0], X), subQ(x1[1], Y)],
    d2 = addQ(mulQ(d[0], d[0]), mulQ(d[1], d[1]));
  return { x1, n2, d2 };
}
/** The secant drift by its definition: (f(x₀ + h) − f(x₀))/h − f′(x₀). */
const driftN = (x0, h) => subQ(divQ(subQ(fN(addQ(x0, h)), fN(x0)), h), jetN(x0)[1]);
/** E[w^{2a} x^{2b} y^{2c} z^{2d}] on S³ from the Gaussian moments (2a − 1)!! and the rising product 4·6·…·(2m + 2). */
const dfact = (n) => (n <= 0 ? 1n : BigInt(n) * dfact(n - 2));
function haarN(pw) {
  const m = pw.reduce((s, x) => s + x, 0);
  let den = 1n;
  for (let j = 0; j < m; j++) den *= BigInt(4 + 2 * j);
  return Q(pw.reduce((s, a) => s * dfact(2 * a - 1), 1n), den);
}
const CHIN = [[ONE], [Q(-1), Q(4)], [ONE, Q(-12), Q(16)]];
const evalN = (p, x) => p.reduce((s, c, n) => addQ(s, mulQ(c, range(n).reduce((acc) => mulQ(acc, x), ONE))), ZERO);
function pairN(i, j) {
  let s = ZERO;
  CHIN[i].forEach((a, m) => CHIN[j].forEach((b, n) => (s = addQ(s, mulQ(mulQ(a, b), haarN([m + n, 0, 0, 0]))))));
  return s;
}
/** ⟨χᵢ, χⱼ⟩ as a float, by the trapezoid rule on the angle (the classical integral with π). */
function pairFloat(i, j) {
  const f = (t) => {
    const k = Math.cos(t) ** 2,
      c = (p) => p.reduce((s, x, n) => s + (Number(x[0]) / Number(x[1])) * k ** n, 0);
    return c(CHIN[i]) * c(CHIN[j]) * Math.sin(t) ** 2;
  };
  const n = 4000;
  let s = (f(0) + f(Math.PI)) / 2;
  for (let r = 1; r < n; r++) s += f((Math.PI * r) / n);
  return (2 / Math.PI) * s * (Math.PI / n);
}
const S5N = [
  [1, 2, 0, 0],
  [1, -2, 0, 0],
  [1, 0, 2, 0],
  [1, 0, -2, 0],
  [1, 0, 0, 2],
  [1, 0, 0, -2]
].map(Z);
const chi1N = (p) => subQ(mulQ(Q(4), kappaN(O, p)), ONE);
const heckeSumN = (q) => S5N.reduce((s, sv) => addQ(s, chi1N(qmulN(q, sv))), ZERO);
const nonzeroBox = (n) => {
  const span = range(2 * n + 1).map((k) => k - n),
    out = [];
  for (const w of span) for (const x of span) for (const y of span) for (const z of span) if (w || x || y || z) out.push(Z([w, x, y, z]));
  return out;
};

/* ---------- the quality gate ---------- */
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID, { solid: true });

/* ---------- the page ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page);
const state = async () => {
  await settle(page);
  return page.evaluate(() => window.OMEGALAB_DEBUG.state);
};
/** Move the rail to v without leaving the card (the input event of the range, as a reader's drag does). */
const rail = async (v) => {
  await page.evaluate((x) => {
    const el = document.getElementById('now');
    el.value = String(x);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    TRV.kit.flush();
  }, v);
  return state();
};
/** Click a card, stop its playback and put the rail on its declared still (the card stays marked). */
const pick = async (card) => {
  await page.click(`[data-preset="${card}"]`);
  await settle(page);
  await page.evaluate(() => TRV.kit.pause());
  return rail(CARDS[card].still);
};
/** Set a range dial and fire its input event, as the reader's drag does. */
const dial = async (id, v) => {
  await page.evaluate(([el, x]) => {
    const input = document.getElementById(el);
    input.value = String(x);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }, [id, v]);
  return state();
};
const press = async (sel) => {
  await page.locator(sel).evaluate((b) => b.click());
  return state();
};

let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on the triad card, parked at its still', s.preset === TRIAD && s.scene === 'bargmann' && s.t === 16 && !s.playing, JSON.stringify([s.preset, s.t, s.playing]));
const declared = await page.evaluate(() => [...document.querySelectorAll('[data-preset]')].map((b) => [b.dataset.preset, b.dataset.still]));
check('four cards, each declares its still', JSON.stringify(declared) === JSON.stringify(Object.entries(CARDS).map(([id, c]) => [id, String(c.still)])), JSON.stringify(declared));
const green = await page.$$eval('#basis .lean:not(.num):not(.model):not(.argued):not(.open):not(.frozen) a[data-lean-gid]', (as) => as.map((a) => a.dataset.leanGid));
check('six green boxes, one for each frozen theorem of the registry', JSON.stringify(green) === JSON.stringify(GIDS), green.join(' | '));
{
  const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'books', BOOK, 'viz', 'visualizations.json'), 'utf8')),
    entry = registry.visualizations.find((v) => v.id === ID);
  check('registry: live, the six GIDs, five chapters', !!entry && entry.status === 'live' && JSON.stringify(entry.lean.map((x) => x.gid)) === JSON.stringify(GIDS) && entry.theory.length === 5);
}

/* ---------- 1. Bargmann–Gram ---------- */
{
  // every whole step of the rail of the card: κ, B and det G₃ against the 3 × 3 Gram determinant of the test
  let worst = '';
  for (let k = 0; k <= 16; k++) {
    s = await rail(k);
    const L = s.ledger,
      { bb, c0, c } = railPointN([1, 1, 0, 0], [1, 0, 1, 0], k),
      det = gramDetN(O, bb, c),
      Bn = Q(dotN(O, bb) * dotN(bb, c) * dotN(c, O), dotN(O, O) * dotN(bb, bb) * dotN(c, c));
    const ok =
      L.c.join() === c.join() &&
      L.c0.join() === c0.join() &&
      eqQ(L.kab, kappaN(O, bb)) &&
      eqQ(L.kbc, kappaN(bb, c)) &&
      eqQ(L.kca, kappaN(c, O)) &&
      eqQ(L.B, Bn) &&
      eqQ(L.det, det) &&
      [L.kab, L.kbc, L.kca, L.B, L.det].every(reducedQ) &&
      BigInt(det[0]) >= 0n;
    if (!ok && !worst) worst = `k = ${k}: page ${strQ(L.det)} vs ${strQ(det)}`;
  }
  check('triad: κ, B and det G₃ on all 17 steps equal the Gram determinant (reduced fractions, det ≥ 0)', !worst, worst);
  s = await rail(16);
  check('triad still: o, pHalf, qHalf give κ = 1/2, 1/4, 1/2, B = 1/4, det G₃ = 1/4', eqQ(s.ledger.kab, Q(1, 2)) && eqQ(s.ledger.kbc, Q(1, 4)) && eqQ(s.ledger.kca, Q(1, 2)) && eqQ(s.ledger.B, Q(1, 4)) && eqQ(s.ledger.det, Q(1, 4)) && s.key === '1/4', s.key);
  s = await rail(0);
  check('triad at k = 0: c = [b, o, b] = (0, 1, 0, 0) and det G₃ = 0', s.ledger.c.join() === '0,1,0,0' && eqQ(s.ledger.det, ZERO));
  check('the anchors [0:1], [1:1], [1:0]: κ = 1, 1/2, 0 and spread = 0, 1/2, 1', ['1', '1/2', '0'].every((v, i) => strQ(s.ledger.anchors[i].kappa) === v) && ['0', '1/2', '1'].every((v, i) => strQ(s.ledger.anchors[i].spread) === v));
  // the dials of b and of the end of the rail
  s = await dial('bw', 2);
  s = await dial('bx', -1);
  s = await dial('by', 3);
  s = await dial('bz', 1);
  s = await dial('cw', 0);
  s = await dial('cx', 1);
  s = await dial('cy', -2);
  s = await dial('cz', 3);
  {
    const k = s.ledger.k,
      { bb, c } = railPointN([2, -1, 3, 1], [0, 1, -2, 3], k);
    check('the dials set b and c, leave the card, and the ledger follows (det G₃ = Gram determinant)', s.preset === null && s.b.join() === '2,-1,3,1' && s.c.join() === '0,1,-2,3' && s.ledger.b.join() === bb.join() && eqQ(s.ledger.det, gramDetN(O, bb, c)), JSON.stringify([s.preset, s.b, s.c, strQ(s.ledger.det)]));
  }
  s = await press('[data-bg="double"]');
  {
    const { bb, c0 } = railPointN([2, -1, 3, 1], [0, 1, -2, 3], 0);
    check('geodesic doubling: c = [b, o, b] = b·ō·b, det G₃ = 0 exactly', s.at.bargmann === 0 && s.ledger.c.join() === c0.join() && eqQ(s.ledger.det, ZERO) && eqQ(gramDetN(O, bb, c0), ZERO));
  }
  s = await press('[data-bg="triad"]');
  check('orthogonal-axis triad: b = pHalf, c = qHalf, det G₃ = 1/4', s.b.join() === '1,1,0,0' && s.c.join() === '1,0,1,0' && s.at.bargmann === 16 && eqQ(s.ledger.det, Q(1, 4)));
  s = await dial('bw', 4);
  s = await dial('bx', 4);
  check('b = (4, 4, 0, 0) is the line of pHalf: the same κ and det G₃', s.ledger.b.join() === '1,1,0,0' && eqQ(s.ledger.det, Q(1, 4)) && (await page.textContent('#roV1')).includes('4·'));
  s = await press('#stageAct');
  check('the stage button sends c to [b, o, b]', s.at.bargmann === 0 && eqQ(s.ledger.det, ZERO));
  s = await press('#stageAct');
  check('… and back to the end of the rail', s.at.bargmann === 16 && eqQ(s.ledger.det, Q(1, 4)));
  // det G₃ ≥ 0 and the formula on all pairs of lines with entries in [−1, 1] (independent enumeration)
  const lines = nonzeroBox(1).filter((t) => canonN(t).join() === t.join());
  let bad = 0;
  for (const b of lines)
    for (const c of lines) {
      const d = gramDetN(O, b, c),
        f = subQ(addQ(ONE, mulQ(Q(2), Q(dotN(O, b) * dotN(b, c) * dotN(c, O), dotN(b, b) * dotN(c, c)))), addQ(addQ(kappaN(O, b), kappaN(b, c)), kappaN(c, O)));
      if (!eqQ(d, f) || d[0] < 0n) bad++;
    }
  const bench = await page.evaluate(() => window.OMEGALAB_DEBUG.bench());
  check('the page benchmark covers the same 40 lines and 1600 triples, with no failure', bench.lines === lines.length && bench.gramPairs === lines.length ** 2 && bench.gramBad === 0 && bench.negative === 0 && bench.flatBad === 0 && bad === 0, JSON.stringify([bench.lines, lines.length, bad]));
}

/* ---------- 2. jets ---------- */
s = await pick(JET);
check('jet card: x₀ = 1, the jet (1/2, −1/2, 1/4)', s.scene === 'jet' && s.ledger.j.map(strQ).join() === '1/2,-1/2,1/4' && s.ledger.check.map(strQ).join() === '1,0,0', s.ledger.j.map(strQ).join());
{
  let worst = '';
  for (let k = 0; k <= 8; k++) {
    s = await rail(k);
    const h = Q(k, 16),
      want = k ? driftN(Q(1), h) : ZERO;
    if (!eqQ(s.ledger.h, h) || !eqQ(s.ledger.D, want) || !eqQ(s.ledger.jetD, mulQ(Q(1, 4), h))) worst ||= `k = ${k}: ${strQ(s.ledger.D)} vs ${strQ(want)}`;
  }
  check('secant drift D(h) at h = 0, 1/16, …, 1/2 equals (f(x₀ + h) − f(x₀))/h − f′(x₀)', !worst, worst);
  check('jet still: h = 1/2, D = 3/26, j₂h = 1/8', strQ(s.ledger.h) === '1/2' && strQ(s.ledger.D) === '3/26' && strQ(s.ledger.jetD) === '1/8');
  check('jet still: the α = 1/2 Cayley step lands on (−8/17, 15/17), the α = 0 step on (−1/2, 1) with ‖x₁‖² = 5/4', s.ledger.steps[2].x1.map(strQ).join() === '-8/17,15/17' && strQ(s.ledger.steps[2].n2) === '1' && s.ledger.steps[0].x1.map(strQ).join() === '-1/2,1' && strQ(s.ledger.steps[0].n2) === '5/4');
  let worst2 = '';
  for (const a of ['0', '1/4', '1/2', '3/4', '1']) {
    s = await press(`[data-alpha="${a}"]`);
    const [p, q = '1'] = a.split('/'),
      al = Q(p, q),
      st = alphaStepN(1, 1, Q(1, 2), al),
      L = s.ledger.step;
    const ok = s.alpha === a && L.x1.every((v, i) => eqQ(v, st.x1[i])) && eqQ(L.n2, st.n2) && eqQ(subQ(st.n2, ONE), mulQ(subQ(ONE, mulQ(Q(2), al)), st.d2)) && eqQ(L.drift, subQ(st.n2, ONE)) && (a !== '1/2' || eqQ(st.n2, ONE));
    if (!ok) worst2 ||= `α = ${a}: ${L.x1.map(strQ)} vs ${st.x1.map(strQ)}`;
  }
  check('the α chips: x₁ solves (I − αhωJ)x₁ = (I + (1 − α)hωJ)x₀, ‖x₁‖² − 1 = (1 − 2α)‖Δx‖², α = 1/2 on the circle', !worst2, worst2);
  s = await press('[data-alpha="1/2"]');
  // the amber handle is the focus x₀: dragging it to the top of the circle chooses [0 : 1]
  const box = await page.locator('#stageHandle').boundingBox(),
    to = await page.evaluate(() => window.OMEGALAB_DEBUG.focusTarget(0, 1));
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, { steps: 8 });
  await page.mouse.up();
  s = await state();
  check('dragging the amber focus to the top of the Cayley circle picks [0 : 1] (κ = 1)', s.P === 0 && s.Q === 1 && eqQ(s.ledger.kappa, ONE), `[${s.P} : ${s.Q}]`);
  await page.locator('#stageHandle').focus();
  await page.keyboard.press('ArrowRight');
  s = await state();
  check('→ on the focus handle moves P by one: [1 : 1]', s.P === 1 && s.Q === 1);
  await page.evaluate(() => document.activeElement.blur());
}
{
  // P and Q dials: x₀ = −5/3 and its jet; κ, spread and the Cayley image of the pair (Lean instances)
  s = await dial('pP', -5);
  s = await dial('pQ', 3);
  const x0 = Q(-5, 3),
    j = jetN(x0),
    k = Q(9, 34),
    X = Q(9 - 25, 34),
    Y = Q(2 * -5 * 3, 34);
  check('the dials P = −5, Q = 3: x₀ = −5/3, jet by solving (1 + x²)·j = 1', s.preset === null && eqQ(s.ledger.s0, x0) && s.ledger.j.every((v, i) => eqQ(v, j[i])) && s.ledger.check.map(strQ).join() === '1,0,0');
  check('κ = Q²/(P² + Q²) = 9/34, κ + spread = 1, X² + Y² = 1 (instances of the frozen theorems)', eqQ(s.ledger.kappa, k) && eqQ(addQ(s.ledger.kappa.map(BigInt), s.ledger.spread.map(BigInt)), ONE) && eqQ(s.ledger.X, X) && eqQ(s.ledger.Y, Y) && eqQ(addQ(mulQ(X, X), mulQ(Y, Y)), ONE));
}
s = await press('[data-anchor="2:2"]');
check('[2 : 2]: κ = 1/2, the reading of [1 : 1] (kappa_scale with k = 2)', s.P === 2 && s.Q === 2 && eqQ(s.ledger.kappa, Q(1, 2)) && eqQ(s.ledger.kappaReduced, Q(1, 2)) && (await page.textContent('#roV1')).includes('2·[1 : 1]'));
s = await press('[data-anchor="1:0"]');
check('[1 : 0]: κ = 0, spread = 1, Cayley image (−1, 0) (cayley_antipodal_closure); the jet of κ in u = Q/P is (0, 0, 1)', s.ledger.chart === 'u' && eqQ(s.ledger.kappa, ZERO) && eqQ(s.ledger.spread, ONE) && eqQ(s.ledger.X, Q(-1)) && eqQ(s.ledger.Y, ZERO) && s.ledger.j.map(strQ).join() === '0,0,1');
s = await press('[data-anchor="0:1"]');
check('[0 : 1]: κ = 1, Cayley image (1, 0), jet (1, 0, −1)', eqQ(s.ledger.kappa, ONE) && eqQ(s.ledger.X, ONE) && s.ledger.j.map(strQ).join() === '1,0,-1');
s = await dial('pQ', 0);
check('the zero pair is refused: P = 0, Q = 0 becomes [1 : 0]', s.P === 1 && s.Q === 0);
s = await press('#stageAct');
check('the stage button steps x₀ along its stops', s.P === 1 && s.Q === 1);
{
  const bench = await page.evaluate(() => window.OMEGALAB_DEBUG.bench());
  let bad = 0;
  for (let P = -12; P <= 12; P++)
    for (let Qd = 1; Qd <= 12; Qd++) for (let k = 1; k <= 8; k++) {
      const x0 = Q(P, Qd),
        h = Q(k, 8),
        closed = divQ(mulQ(h, subQ(addQ(mulQ(Q(3), mulQ(x0, x0)), mulQ(Q(2), mulQ(x0, h))), ONE)), mulQ(mulQ(addQ(ONE, mulQ(x0, x0)), addQ(ONE, mulQ(x0, x0))), addQ(ONE, mulQ(addQ(x0, h), addQ(x0, h)))));
      if (!eqQ(closed, driftN(x0, h))) bad++;
    }
  check('the closed secant drift equals its definition on 300 points × 8 steps; the page reports 324 pairs, no failure', bad === 0 && bench.jets === 324 && bench.jetBad === 0 && bench.driftBad === 0 && bench.circleBad === 0 && bench.scaleBad === 0, JSON.stringify([bad, bench.jets]));
}

/* ---------- 3. Haar ---------- */
s = await pick(HAAR);
check('Haar card: E[κⁿ] = 1, 1/4, 1/8, 5/64, 7/128 (double factorials over 4·6·…·(2n + 2))', s.ledger.kmom.map(strQ).join() === '1,1/4,1/8,5/64,7/128' && s.ledger.kmom.every((x, n) => eqQ(x, haarN([n, 0, 0, 0]))));
check('Haar still: κ = 1/4 on the nodal shell of χ₁, χ₁ = 0, χ₂ = −1, ⟨χ₁, χ₂⟩ = 0', strQ(s.ledger.level) === '1/4' && eqQ(s.ledger.chiI, ZERO) && eqQ(s.ledger.chiJ, Q(-1)) && eqQ(s.ledger.value, ZERO) && s.key === '0');
{
  let worst = '';
  for (let k = 0; k <= 16; k++) {
    s = await rail(k);
    const kap = Q(16 - k, 16);
    if (!eqQ(s.ledger.level, kap) || !eqQ(s.ledger.chiI, evalN(CHIN[1], kap)) || !eqQ(s.ledger.chiJ, evalN(CHIN[2], kap))) worst ||= `k = ${k}`;
  }
  check('the rail lowers κ from 1 to 0 in steps of 1/16, χ₁(κ) and χ₂(κ) exact', !worst, worst);
}
{
  let worst = '';
  for (const i of [0, 1, 2])
    for (const j of [0, 1, 2]) {
      await press(`[data-ci="${i}"]`);
      s = await press(`[data-cj="${j}"]`);
      const want = i === j ? ONE : ZERO,
        num = pairFloat(i, j);
      if (!eqQ(s.ledger.value, want) || !eqQ(s.ledger.value, pairN(i, j)) || Math.abs(num - Number(want[0])) > 1e-9) worst ||= `(${i}, ${j}): ${strQ(s.ledger.value)}, quadrature ${num}`;
    }
  check('Peter–Weyl: ⟨χᵢ, χⱼ⟩ = δᵢⱼ for all nine pairs, exactly and by the classical integral with π', !worst, worst);
}
{
  let worst = '';
  for (const pw of [
    [0, 0, 0, 0],
    [1, 0, 0, 0],
    [2, 1, 0, 0],
    [1, 1, 1, 1],
    [3, 0, 2, 1],
    [3, 3, 3, 3]
  ]) {
    for (const [i, c] of ['a', 'b', 'c', 'd'].entries()) s = await dial('m' + c, pw[i]);
    if (!eqQ(s.ledger.E, haarN(pw)) || s.mono.join() !== pw.join()) worst ||= `${pw}: ${strQ(s.ledger.E)} vs ${strQ(haarN(pw))}`;
  }
  check('the monomial dials: E[w^{2a}x^{2b}y^{2c}z^{2d}/‖q‖^{2m}] for six exponents, by Gaussian moments', !worst, worst);
}
s = await press('#stageAct');
check('the stage button steps the character pair: (χ₂, χ₂) → (χ₀, χ₁), ⟨χ₀, χ₁⟩ = 0', s.ci === 0 && s.cj === 1 && eqQ(s.ledger.value, ZERO), `${s.ci}, ${s.cj}`);

/* ---------- 4. Hecke p = 5 and Ω-FRACTRAN ---------- */
s = await pick(HECKE);
{
  const q = Z([2, 1, 3, -1]),
    total = heckeSumN(q);
  check('Hecke still: q = (2, 1, 3, −1), Σ χ₁(q s) = −2/75 = −(2/5)·χ₁(q)', s.q.join() === '2,1,3,-1' && eqQ(s.ledger.total, total) && strQ(total) === '-2/75' && eqQ(s.ledger.rhs, mulQ(Q(-2, 5), chi1N(q))) && eqQ(s.ledger.partial, total));
  check('the Ramanujan margin 4·5 − (2/5)² = 496/25 > 0 and λ = −2/5', strQ(s.ledger.margin) === '496/25' && strQ(s.ledger.lambda) === '-2/5' && eqQ(subQ(Q(20), mulQ(Q(-2, 5), Q(-2, 5))), Q(496, 25)));
  let worst = '';
  for (let n = 0; n <= 6; n++) {
    s = await rail(n);
    const part = S5N.slice(0, n).reduce((acc, sv) => addQ(acc, chi1N(qmulN(q, sv))), ZERO);
    if (!eqQ(s.ledger.partial, part)) worst ||= `n = ${n}`;
  }
  check('the rail sums χ₁ over the first n jumps, n = 0 … 6', !worst, worst);
  check('each jump has norm 5: ‖q s‖² = 5‖q‖²', s.ledger.jumps.every((j, i) => BigInt(j.n2) === 5n * dotN(q, q) && j.p.join() === qmulN(q, S5N[i]).join()));
  check('the meridian slice: [x : w]·[2 : 1] has squared norm 5·(x² + w²) (projective_circle_mul_normSq)', BigInt(s.ledger.slice.left) === BigInt(s.ledger.slice.right) && s.ledger.slice.prod.join() === [1n * 1n + 2n * 2n, 2n * 1n - 1n * 2n].join());
}
{
  // the eigen-relation on every nonzero q with entries in [−2, 2], computed here; the page's benchmark agrees
  let bad = 0;
  const box = nonzeroBox(2);
  for (const q of box) if (!eqQ(heckeSumN(q), mulQ(Q(-2, 5), chi1N(q)))) bad++;
  const bench = await page.evaluate(() => window.OMEGALAB_DEBUG.bench());
  check(`Σ χ₁(q s) = −(2/5) χ₁(q) on all ${box.length} nonzero q of [−2, 2]⁴; the page benchmark agrees`, bad === 0 && bench.heckeTried === box.length && bench.heckeBad === 0 && bench.normBad === 0, JSON.stringify([bad, bench.heckeTried]));
}
for (const [id, v] of [
  ['qw', -3],
  ['qx', 0],
  ['qy', 2],
  ['qz', 4]
])
  s = await dial(id, v);
check('the q dials: q = (−3, 0, 2, 4) and the relation still holds', s.preset === null && s.q.join() === '-3,0,2,4' && eqQ(s.ledger.total, heckeSumN(Z([-3, 0, 2, 4]))) && eqQ(s.ledger.total, s.ledger.rhs));
s = await dial('qw', 0);
s = await dial('qy', 0);
s = await dial('qz', 0);
check('the zero state is refused: the moved entry falls back to 1', s.q.some((v) => v !== 0), s.q.join());
s = await press('[data-mode="fractran"]');
{
  const X = Z([1, 2, 0, 0]),
    Y = Z([1, 0, 2, 0]),
    xy = qmulN(X, Y),
    yx = qmulN(Y, X),
    a = qmulN(xy, conjN(Y)),
    b = qmulN(yx, conjN(Y)),
    g = await page.evaluate(() => window.OMEGALAB_DEBUG.gates());
  check('Ω-FRACTRAN: ψ_XY = (1, 2, 2, 4), ψ_YX = (1, 2, 2, −4), both of norm 25', xy.join() === '1,2,2,4' && yx.join() === '1,2,2,-4' && dotN(xy, xy) === 25n && g.psiXY.join() === xy.join() && g.psiYX.join() === yx.join());
  check('the gate Ȳ/5 passes ψ_XY to (1, 2, 0, 0) and blocks ψ_YX (remainders (0, 4, 0, 2))', g.xy.pass && g.xy.out.join() === a.map((v) => v / 5n).join() && g.xy.out.join() === '1,2,0,0' && !g.yx.pass && g.yx.raw.join() === b.join() && b.map((v) => ((v % 5n) + 5n) % 5n).join() === '0,4,0,2' && g.yx.rem.join() === '0,4,0,2');
  check('FRACTRAN mode: the rail has four steps and ends at the gate', s.mode === 'fractran' && s.max === 3 && s.at.hecke === 3);
}
s = await press('#stageAct');
check('the stage button switches back to the Hecke web', s.mode === 'hecke' && s.max === 6);

/* ---------- lens, views, handle, keyboard ---------- */
s = await pick(TRIAD);
const before = JSON.stringify(s.ledger),
  bigBefore = await page.textContent('#hudBig');
s = await press('#lensToggleBtn');
check('the lens changes names, not the state', s.lens === 1 && JSON.stringify(s.ledger) === before && (await page.textContent('#hudBig')) !== bigBefore && (await page.getAttribute('#lensToggleBtn', 'aria-pressed')) === 'true');
s = await press('#lensToggleBtn');
check('… and back', s.lens === 0);
const yaw0 = s.camera.yaw,
  pitch0 = s.camera.pitch;
s = await press('[data-cam="pole"]');
check('the view chips turn the camera (over o)', s.cam === 'pole' && (await until(page, (p) => Math.abs(window.OMEGALAB_DEBUG.state.camera.pitch - p) > 0.5, pitch0)));
s = await press('[data-cam="card"]');
await until(page, (y) => Math.abs(window.OMEGALAB_DEBUG.state.camera.pitch - 0.4) < 1e-6 && Math.abs(window.OMEGALAB_DEBUG.state.camera.yaw - y) < 1e-6, yaw0);
await pick(TRIAD);
{
  const box = await page.locator('#stageHandle').boundingBox(),
    to = await page.evaluate(() => window.OMEGALAB_DEBUG.dragTarget(4));
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, { steps: 6 });
  await page.mouse.up();
  s = await state();
  const { bb, c } = railPointN([1, 1, 0, 0], [1, 0, 1, 0], 4);
  check('dragging the amber handle moves c along the rail', s.at.bargmann === 4 && s.preset === null && eqQ(s.ledger.det, gramDetN(O, bb, c)), `k = ${s.at.bargmann}`);
}
await page.locator('#stageHandle').focus();
await page.keyboard.press('ArrowRight');
s = await state();
check('→ on the handle moves one step', s.at.bargmann === 5);
await page.keyboard.press('Home');
s = await state();
check('Home on the handle goes to the start', s.at.bargmann === 0);
await page.evaluate(() => document.activeElement.blur());
check('Space plays', await playsAfter(page, () => page.keyboard.press(' '), () => window.OMEGALAB_DEBUG.state));
await page.keyboard.press(' ');
check('Space pauses', !(await state()).playing);
await page.locator('[data-speed="2"]').evaluate((b) => b.click());
check('a card plays from its start', await playsAfter(page, () => page.click(`[data-preset="${JET}"]`), () => window.OMEGALAB_DEBUG.state));
check('… and parks on its still', await until(page, () => { const d = window.OMEGALAB_DEBUG.state; return !d.playing && d.t === 8 && d.preset === 'jet2-osculating-sphere'; }));
await page.locator('[data-speed="1"]').evaluate((b) => b.click());
check('no stage labels on top of each other after all this', (await labelOverlaps(page, '.stage .tag')).length === 0);
check('no sideways scrolling', (await overflowX(page)) <= 0);

/* ---------- the stills a chapter would print ---------- */
const CAPTIONS = {
  [TRIAD]: (d) => strQ(d.ledger.det) === '1/4' && strQ(d.ledger.kbc) === '1/4' && d.at.bargmann === 16,
  [JET]: (d) => d.ledger.j.map(strQ).join() === '1/2,-1/2,1/4' && strQ(d.ledger.h) === '1/2',
  [HAAR]: (d) => strQ(d.ledger.level) === '1/4' && strQ(d.ledger.value) === '0' && d.ci === 1 && d.cj === 2,
  [HECKE]: (d) => strQ(d.ledger.total) === '-2/75' && d.mode === 'hecke' && d.at.hecke === 6
};
for (const [card, ok] of Object.entries(CAPTIONS))
  for (const lang of ['zh', 'en']) {
    const p = await openStill(T, BOOK, ID, card, lang),
      d = await p.evaluate(() => window.OMEGALAB_DEBUG.state);
    check(`still ${card} (${lang}): the frame carries the numbers of its note`, d.preset === card && !d.playing && ok(d), JSON.stringify([d.preset, d.t]));
    await p.context().close();
  }

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
