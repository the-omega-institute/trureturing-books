#!/usr/bin/env node
// Browser regression suite for omega-math/viz/ternion-cayley-lab (Playwright + Chromium):
//   node books/omega-math/viz/tests/ternion-cayley-lab.test.mjs        (or node tools/node/viz-test.mjs omega-math)
// stageFirstChecks is the battery every stage-first page must pass, here with the lit-solid checks. After it come the
// checks of this page: one for every control, and one for each property the page claims, against independent
// mathematics written below in big integers (never by calling the page's own functions). The page is read through
// its read-only probe window.OMEGASPIN_DEBUG, whose fractions are [numerator, denominator] pairs of decimal strings.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from '../../../../tools/node/viz-common.mjs';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, labelOverlaps, overflowX } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'omega-math';
const ID = 'ternion-cayley-lab';
const CARDS = {
  'qp1-antipodal-circle': { scene: 'circle', still: 16, max: 16 },
  'canonical-ternion-noncomm': { scene: 'ternion', still: 16, max: 16 },
  'pythspinor-720-double-cover': { scene: 'spinor', still: 6, max: 6 },
  'cayley3d-vs-taylor-drift': { scene: 'cayley', still: 12, max: 12 }
};
const [CIRCLE, TERNION, SPINOR, CAYLEY] = Object.keys(CARDS);
const GIDS = [
  'D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure',
  'D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_assoc',
  'D5/S3/Quantum/AURICOmega/OmegaTernionHeap.quadratic_kernel',
  'D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_orthogonal',
  'D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.ad_hom',
  'D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.heap_norm_preserved'
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
const join = (t) => t.map(String).join();
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
/** The canonical ray: divide by primes while all entries allow it, then make the first nonzero entry positive. */
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
const O = Z([1, 0, 0, 0]),
  PH = Z([1, 1, 0, 0]),
  QH = Z([1, 0, 1, 0]);
/** Ad(p) as an explicit 3 × 3 rational matrix (the formula of Definition 5.3), not through p·v·conj(p). */
function adMatrix([w, x, y, z]) {
  const N = w * w + x * x + y * y + z * z;
  return [
    [w * w + x * x - y * y - z * z, 2n * (x * y - w * z), 2n * (x * z + w * y)],
    [2n * (x * y + w * z), w * w - x * x + y * y - z * z, 2n * (y * z - w * x)],
    [2n * (x * z - w * y), 2n * (y * z + w * x), w * w - x * x - y * y + z * z]
  ].map((row) => row.map((v) => Q(v, N)));
}
const matQ = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, v, k) => addQ(s, mulQ(v, B[k][j])), ZERO)));
const vecQ = (A, v) => A.map((row) => row.reduce((s, x, j) => addQ(s, mulQ(x, v[j])), ZERO));
const tQ = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const isIdentity = (A) => A.every((row, i) => row.every((v, j) => eqQ(v, i === j ? ONE : ZERO)));
/** A probe vector [num, den] as three rationals. */
const probeVec = ([num, den]) => num.map((v) => Q(v, den));
const eqVec = (u, v) => u.every((x, i) => eqQ(x, v[i]));
const normQ = (v) => v.reduce((s, x) => addQ(s, mulQ(x, x)), ZERO);
/** The point of the circle rail from the reduced pair through the chart x = p/q (the page uses the raw pair). */
function circleN(Pn, Qn, k) {
  const p = BigInt(k) * BigInt(Pn),
    q = 16n - BigInt(k) + BigInt(k) * BigInt(Qn),
    g = steinN(p, q);
  let [pr, qr] = [p / g, q / g];
  if (qr < 0n || (qr === 0n && pr < 0n)) [pr, qr] = [-pr, -qr];
  if (qr === 0n) return { raw: [p, q], red: [pr, qr], X: Q(-1), Y: ZERO, kappa: ZERO, spread: ONE };
  const x = Q(pr, qr),
    x2 = mulQ(x, x),
    X = divQ(subQ(ONE, x2), addQ(ONE, x2)),
    Y = divQ(mulQ(Q(2), x), addQ(ONE, x2));
  return { raw: [p, q], red: [pr, qr], X, Y, kappa: divQ(addQ(ONE, X), Q(2)), spread: divQ(subQ(ONE, X), Q(2)) };
}
/** g^n for a reduced spinor by repeated multiplication (not the heap), reduced by the positive gcd with the radius. */
function powSpinorN(g, n) {
  let num = Z([1, 0, 0, 0]),
    r = 1n;
  for (let i = 0; i < n; i++) {
    num = qmulN(num, g.num);
    r *= g.r;
  }
  const c = num.reduce((m, v) => steinN(m, v), r);
  return { num: num.map((v) => v / c), r: r / c };
}
/** The Pell exponents of the heap radii: r_n = r_1^{e_n}, e_{n+2} = 2e_{n+1} + e_n. */
const PELL = [0n, 1n];
for (let i = 2; i <= 6; i++) PELL.push(2n * PELL[i - 1] + PELL[i - 2]);
/** The dual-chart product of §5.2, written from the definition with the test's own fractions. */
function starN(A, B) {
  const dot3 = (u, v) => u.reduce((s, x, i) => addQ(s, mulQ(x, v[i])), ZERO),
    a = dot3(A, A),
    b = dot3(B, B),
    c = dot3(A, B),
    cr = [subQ(mulQ(A[1], B[2]), mulQ(A[2], B[1])), subQ(mulQ(A[2], B[0]), mulQ(A[0], B[2])), subQ(mulQ(A[0], B[1]), mulQ(A[1], B[0]))],
    N = range(3).map((i) => addQ(addQ(mulQ(subQ(ONE, a), B[i]), mulQ(subQ(ONE, b), A[i])), mulQ(Q(2), cr[i]))),
    Dp = subQ(addQ(ONE, mulQ(a, b)), mulQ(Q(2), c)),
    s = range(3).map((i) => addQ(A[i], B[i])),
    Dm = dot3(s, s),
    plus = BigInt(Dp[0]) * BigInt(Dm[1]) >= BigInt(Dm[0]) * BigInt(Dp[1]);
  return { a, b, Dp, Dm, N, plus };
}
/** The Taylor step T₂ = I + X + X²/2 with X = [σ]× as rational matrices. */
function taylorN(sig) {
  const [x, y, z] = sig,
    X = [
      [ZERO, subQ(ZERO, z), y],
      [z, ZERO, subQ(ZERO, x)],
      [subQ(ZERO, y), x, ZERO]
    ],
    X2 = matQ(X, X);
  return range(3).map((i) => range(3).map((j) => addQ(addQ(i === j ? ONE : ZERO, X[i][j]), mulQ(Q(1, 2), X2[i][j]))));
}

/* ---------- the quality gate ---------- */
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID, { solid: true });

/* ---------- the page ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page);
const state = async () => {
  await settle(page);
  return page.evaluate(() => window.OMEGASPIN_DEBUG.state);
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
check('opens on the circle card, parked at its still', s.preset === CIRCLE && s.scene === 'circle' && s.t === 16 && !s.playing, JSON.stringify([s.preset, s.t, s.playing]));
const declared = await page.evaluate(() => [...document.querySelectorAll('[data-preset]')].map((b) => [b.dataset.preset, b.dataset.still]));
check('four cards, each declares its still', JSON.stringify(declared) === JSON.stringify(Object.entries(CARDS).map(([id, c]) => [id, String(c.still)])), JSON.stringify(declared));
const green = await page.$$eval('#basis .lean:not(.num):not(.model):not(.argued):not(.open):not(.frozen) a[data-lean-gid]', (as) => as.map((a) => a.dataset.leanGid));
check('six green boxes, one for each frozen theorem of the registry', JSON.stringify(green) === JSON.stringify(GIDS), green.join(' | '));
{
  const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'books', BOOK, 'viz', 'visualizations.json'), 'utf8')),
    entry = registry.visualizations.find((v) => v.id === ID);
  check('registry: the six GIDs and four chapters', !!entry && JSON.stringify(entry.lean.map((x) => x.gid)) === JSON.stringify(GIDS) && entry.theory.length === 4);
}

/* ---------- 1. ℚP¹ and the antipodal closure ---------- */
{
  let worst = '';
  for (let k = 0; k <= 16; k++) {
    s = await rail(k);
    const L = s.ledger,
      want = circleN(1, 0, k);
    const ok =
      join(L.raw) === join(want.raw) &&
      join(L.red) === join(want.red) &&
      eqQ(L.X, want.X) &&
      eqQ(L.Y, want.Y) &&
      eqQ(L.kappa, want.kappa) &&
      eqQ(L.spread, want.spread) &&
      eqQ(L.unitCircle, ONE) &&
      eqQ(L.sum, ONE) &&
      [L.X, L.Y, L.kappa, L.spread].every(reducedQ);
    if (!ok && !worst) worst = `k = ${k}: page (${strQ(L.X)}, ${strQ(L.Y)}) vs (${strQ(want.X)}, ${strQ(want.Y)})`;
  }
  check('circle: on all 17 steps of [k : 16 − k] the Cayley image, κ and spread equal the chart x = p/q (reduced, X² + Y² = 1)', !worst, worst);
  s = await rail(4);
  check('circle at k = 4: [4 : 12] = 4·[1 : 3], κ = 9/10 unchanged by the factor 4', join(s.ledger.raw) === '4,12' && join(s.ledger.red) === '1,3' && strQ(s.ledger.kappa) === '9/10' && (await page.textContent('#roV1')).includes('4·[1 : 3]'));
  s = await rail(16);
  check('circle still: [16 : 0] lands on the antipode: κ = 0, spread = 1, (X, Y) = (−1, 0) (cayley_antipodal_closure, p = 16)', s.ledger.antipodal && join(s.ledger.raw) === '16,0' && eqQ(s.ledger.kappa, ZERO) && eqQ(s.ledger.spread, ONE) && eqQ(s.ledger.X, Q(-1)) && eqQ(s.ledger.Y, ZERO) && s.key === '(−1, 0)', s.key);
  check('the anchors [0:1], [1:1], [1:0]: κ = 1, 1/2, 0 and spread = 0, 1/2, 1', ['1', '1/2', '0'].every((v, i) => strQ(s.ledger.anchors[i].kappa) === v) && ['0', '1/2', '1'].every((v, i) => strQ(s.ledger.anchors[i].spread) === v));
  s = await dial('pP', -5);
  s = await dial('pQ', 3);
  {
    const want = circleN(-5, 3, 16);
    check('the dials P = −5, Q = 3 set the end, leave the card, and the image follows (κ = 9/34)', s.preset === null && s.P === -5 && s.Q === 3 && eqQ(s.ledger.X, want.X) && eqQ(s.ledger.Y, want.Y) && strQ(s.ledger.kappa) === '9/34', JSON.stringify([s.preset, strQ(s.ledger.kappa)]));
  }
  s = await dial('pP', 0);
  s = await dial('pQ', 0);
  check('the zero pair is refused: P = 0, Q = 0 becomes [1 : 0]', s.P === 1 && s.Q === 0);
  s = await press('[data-anchor="1:1"]');
  check('anchor [1:1]: the end κ = 1/2, Cayley image (0, 1) at the end of the rail', s.at.circle === 16 && eqQ(s.ledger.kappa, Q(1, 2)) && eqQ(s.ledger.X, ZERO) && eqQ(s.ledger.Y, ONE));
  s = await press('[data-anchor="0:1"]');
  check('anchor [0:1]: κ = 1, Cayley image (1, 0)', eqQ(s.ledger.kappa, ONE) && eqQ(s.ledger.X, ONE));
  s = await press('[data-anchor="1:0"]');
  s = await press('#stageAct');
  {
    let bad = '';
    for (let k = 0; k <= 16; k++) {
      const L = (await rail(k)).ledger,
        want = circleN(-1, 0, k);
      if (!eqQ(L.X, want.X) || !eqQ(L.Y, want.Y)) bad ||= `k = ${k}`;
    }
    check('the stage button walks to [−1 : 0] from the other side and still closes at (−1, 0)', s.P === -1 && s.Q === 0 && !bad && eqQ((await state()).ledger.X, Q(-1)), bad);
  }
  // the antipodal closure of every [p : 0] and the circle law on the page's benchmark box, against this test
  const bench = await page.evaluate(() => window.OMEGASPIN_DEBUG.bench());
  let bad = 0;
  for (let p = -12; p <= 12; p++)
    for (let q = 0; q <= 12; q++) {
      if (!p && !q) continue;
      const w = circleN(p, q, 16);
      if (!eqQ(addQ(mulQ(w.X, w.X), mulQ(w.Y, w.Y)), ONE) || !eqQ(addQ(w.kappa, w.spread), ONE)) bad++;
    }
  check('X² + Y² = 1 and κ + spread = 1 on 324 pairs here; the page benchmark agrees (24 antipodes, no failure)', bad === 0 && bench.pairs === 324 && bench.circleBad === 0 && bench.scaleBad === 0 && bench.antipodes === 24 && bench.antiBad === 0, JSON.stringify([bad, bench.pairs, bench.antipodes]));
}

/* ---------- 2. canonical ternions and their two orders ---------- */
s = await pick(TERNION);
{
  const L = s.ledger,
    raw = Z([-2, -2, 0, 0]),
    a = canonN(raw),
    ab = canonN(qmulN(qmulN(a, conjN(O)), QH)),
    ba = canonN(qmulN(qmulN(QH, conjN(O)), a));
  check('ternion card: k·a = (−2, −2, 0, 0) has the canonical tuple (1, 1, 0, 0) = pHalf', join(L.raw) === join(raw) && join(L.a) === join(a) && join(a) === join(PH) && (await page.textContent('#roV1')).includes('−2·(1, 1, 0, 0)'));
  check('[pHalf, p₀, qHalf] = (1, 1, 1, 1) ≠ (1, 1, 1, −1) = [qHalf, p₀, pHalf], overlap 1/4', join(L.ab) === join(ab) && join(ab) === '1,1,1,1' && join(L.ba) === join(ba) && join(ba) === '1,1,1,-1' && !L.sameRay && eqQ(L.kappa, kappaN(ab, ba)) && strQ(L.kappa) === '1/4');
  const v0 = [Q(2, 7), Q(3, 7), Q(6, 7)],
    eAB = vecQ(adMatrix(ab), v0),
    eBA = vecQ(adMatrix(ba), v0),
    hom = matQ(adMatrix(a), adMatrix(QH));
  check('the rotation matrices: Ad(a·b) = Ad(a)·Ad(b) as matrices (ad_hom), and they send v₀ = (2, 3, 6)/7 to (6, 2, 3)/7', eqVec(probeVec(L.endAB), eAB) && eqVec(probeVec(L.endAB2), eAB) && adMatrix(qmulN(a, QH)).every((row, i) => row.every((v, j) => eqQ(v, hom[i][j]))) && eAB.map(strQ).join() === '6/7,2/7,3/7');
  check('… and the other order to (3, −6, −2)/7: the two points differ', eqVec(probeVec(L.endBA), eBA) && eBA.map(strQ).join() === '3/7,-6/7,-2/7' && L.apart);
  {
    const sq = canonN(qmulN(ab, ab)),
      cube = canonN(qmulN(qmulN(ab, ab), ab));
    check('the three beats of g120 = (1, 1, 1, 1): (1, −1, −1, −1), then (1, 0, 0, 0) = p₀ (projective closure)', join(L.pow2) === join(sq) && join(sq) === '1,-1,-1,-1' && join(L.pow3) === join(cube) && join(cube) === '1,0,0,0' && L.closes && (await page.textContent('#roV3')).includes('= p₀'));
  }
  check('outer associativity: [[a, p₀, b], a, b] = [a, p₀, [b, a, b]] exactly (triad_assoc)', join(L.assocL) === join(qmulN(qmulN(qmulN(qmulN(a, conjN(O)), QH), conjN(a)), QH)) && join(L.assocL) === join(L.assocR) && L.assocOk);
  // the rail turns: the first half applies the right factor, the second the left one
  s = await rail(8);
  check('the rail at 8/16 has finished the first turn (the second leg starts)', s.ledger.leg === 2 && s.at.ternion === 8);
}
{
  for (const [id, v] of [
    ['aw', 2],
    ['ax', -1],
    ['ay', 3],
    ['az', 1]
  ])
    s = await dial(id, v);
  s = await dial('sk', 3);
  const raw = Z([6, -3, 9, 3]),
    a = canonN(raw),
    ab = canonN(qmulN(a, QH)),
    ba = canonN(qmulN(QH, a));
  check('the dials a = (2, −1, 3, 1), k = 3: raw (6, −3, 9, 3) → canonical (2, −1, 3, 1), both orders follow', s.preset === null && join(s.ledger.raw) === join(raw) && join(s.ledger.a) === join(a) && join(s.ledger.ab) === join(ab) && join(s.ledger.ba) === join(ba), JSON.stringify([s.ledger.raw, s.ledger.a]));
  s = await dial('sk', -4);
  check('k = −4: the sign lock brings the canonical tuple back to (2, −1, 3, 1)', join(s.ledger.raw) === join(Z([-8, 4, -12, -4])) && join(s.ledger.a) === join(a));
  s = await dial('sk', 0);
  check('k = 0 is refused (it is no scaling of a ray)', s.k !== 0 && join(s.ledger.a) === join(a));
  for (const id of ['aw', 'ax', 'ay', 'az']) s = await dial(id, 0);
  check('the zero quadruple is refused: the moved entry falls back to 1', s.a.some((v) => v !== 0), s.a.join());
  s = await press('[data-order="ba"]');
  check('the order chip [b, p₀, a] moves the amber point to the other path', s.order === 'ba');
  s = await press('#stageAct');
  check('the stage button swaps the order back', s.order === 'ab');
  const bench = await page.evaluate(() => window.OMEGASPIN_DEBUG.bench());
  const lines = [];
  for (const w of [-1, 0, 1]) for (const x of [-1, 0, 1]) for (const y of [-1, 0, 1]) for (const z of [-1, 0, 1]) if (w || x || y || z) lines.push(Z([w, x, y, z]));
  const canonLines = lines.filter((t) => join(canonN(t)) === join(t));
  let noncomm = 0;
  for (const p of canonLines) for (const q of canonLines) if (join(canonN(qmulN(p, q))) !== join(canonN(qmulN(q, p)))) noncomm++;
  check(`the page benchmark: ${canonLines.length} canonical rays, the same count of noncommuting pairs, ad_hom and associativity without failure`, bench.lines === canonLines.length && bench.noncomm === noncomm && bench.homBad === 0 && bench.scaleRayBad === 0 && bench.assocBad === 0 && bench.assocTried === 7776, JSON.stringify([bench.lines, bench.noncomm, noncomm]));
}

/* ---------- 3. PythSpinors and the 720° double cover ---------- */
s = await pick(SPINOR);
{
  const L = s.ledger,
    g = { num: Z([1, 1, 1, 1]), r: 2n };
  check('spinor card: Φ(3, 1, 1, 1) = (6, 6, 6, 6; 12) reduces to (1, 1, 1, 1; 2), ‖num‖² = 144 = 12²', join(L.G.num) === '6,6,6,6' && L.G.r === '12' && join(L.Gred.num) === '1,1,1,1' && L.Gred.r === '2' && L.liftNormSq === '144' && L.liftOk);
  let worst = '';
  const wantSpin = ['1', '3/4', '1/4', '0', '1/4', '3/4', '1'],
    wantProj = ['1', '1/4', '1/4', '1', '1/4', '1/4', '1'];
  for (let n = 0; n <= 6; n++) {
    const b = L.beats[n],
      pw = powSpinorN(g, n),
      raw = { num: Z(b.raw.num), r: BigInt(b.raw.r) },
      w = Q(pw.num[0], pw.r),
      ks = divQ(addQ(ONE, w), Q(2)),
      kp = mulQ(w, w);
    const ok =
      join(b.red.num) === join(pw.num) &&
      BigInt(b.red.r) === pw.r &&
      raw.r === 12n ** PELL[n] &&
      dotN(raw.num, raw.num) === raw.r * raw.r &&
      eqQ(b.norm, ONE) &&
      eqQ(b.kspin, ks) &&
      eqQ(b.kproj, kp) &&
      strQ(b.kspin) === wantSpin[n] &&
      strQ(b.kproj) === wantProj[n] &&
      eqQ(b.bridge, kp);
    if (!ok && !worst) worst = `beat ${n}: page ${JSON.stringify(b.red)} vs ${pw.num}; ${pw.r}`;
  }
  check('six beats: heapAt(e, Φ, n) reduces to gⁿ (direct powers), radius 12^Pell(n), ‖num‖²/r² = 1, κ_spin and κ_proj = (2κ_spin − 1)²', !worst, worst);
  check('beat 3 is −e = (−1, 0, 0, 0; 1) with κ_spin = 0; beat 6 is +e with κ_spin = 1', join(L.beats[3].red.num) === '-1,0,0,0' && L.beats[3].red.r === '1' && strQ(L.beats[3].kspin) === '0' && join(L.beats[6].red.num) === '1,0,0,0' && strQ(L.beats[6].kspin) === '1');
  s = await rail(3);
  check('the rail at beat 3: the key reads (−1, 0, 0, 0; 1)', s.key === '(−1, 0, 0, 0; 1)' && strQ(s.ledger.now.kspin) === '0', s.key);
}
{
  s = await press('[data-gen="1,1,0,0"]');
  const ok1 = join(s.ledger.Gred.num) === '0,1,0,0' && join(s.ledger.beats[2].red.num) === '-1,0,0,0' && join(s.ledger.beats[4].red.num) === '1,0,0,0';
  check('generator Φ(1, 1, 0, 0) = (0, 1, 0, 0; 1): beat 2 is −e, beat 4 is +e', ok1);
  s = await press('[data-gen="2,1,0,0"]');
  {
    const g = { num: Z([3, 4, 0, 0]), r: 5n };
    let bad = '';
    for (let n = 0; n <= 6; n++) {
      const pw = powSpinorN(g, n),
        b = s.ledger.beats[n];
      if (join(b.red.num) !== join(pw.num) || BigInt(b.red.r) !== pw.r || !eqQ(b.norm, ONE)) bad ||= `beat ${n}`;
    }
    check('generator Φ(2, 1, 0, 0) = (3, 4, 0, 0; 5): every beat on the unit sphere, never back to ±e', !bad && s.ledger.beats.slice(1).every((b) => b.red.r !== '1'), bad);
  }
  for (const [id, v] of [
    ['la', 1],
    ['lb', -2],
    ['lc', 3],
    ['ld', 1]
  ])
    s = await dial(id, v);
  {
    const [a, b, c, d] = [1n, -2n, 3n, 1n],
      sq = b * b + c * c + d * d,
      num = [a * a - sq, 2n * a * b, 2n * a * c, 2n * a * d],
      r = a * a + sq;
    check('the lift dials (1, −2, 3, 1): Φ = (−13, −4, 6, 2; 15), ‖num‖² = r², the bridge holds on all beats', s.preset === null && join(s.ledger.G.num) === join(num) && BigInt(s.ledger.G.r) === r && dotN(num, num) === r * r && s.ledger.beats.every((x) => eqQ(x.bridge, x.kproj) && eqQ(x.norm, ONE)));
  }
  for (const id of ['la', 'lb', 'lc', 'ld']) s = await dial(id, 0);
  check('the zero quadruple is refused for the lift', s.lift.some((v) => v !== 0));
  s = await press('[data-gen="3,1,1,1"]');
  s = await press('#stageAct');
  check('the stage button steps to the next generator', s.lift.join() === '1,1,0,0');
  const bench = await page.evaluate(() => window.OMEGASPIN_DEBUG.bench());
  check('the page benchmark: 624 lifts with ‖num‖² = r², 4368 bridge pairs and 4368 heap beats without failure', bench.lifts === 624 && bench.liftBad === 0 && bench.bridgeTried === 4368 && bench.bridgeBad === 0 && bench.heapTried === 4368 && bench.heapBad === 0, JSON.stringify([bench.lifts, bench.bridgeTried, bench.heapTried]));
}

/* ---------- 4. the rational Cayley rotation against the Taylor truncation ---------- */
s = await pick(CAYLEY);
{
  const L = s.ledger,
    sig = [Q(1, 2), Q(1, 2), ZERO],
    R = adMatrix(Z([2, 1, 1, 0])), // Cayley s = Ad(d, x, y, z) for s = (x, y, z)/d
    Rp = L.Rred.M.map((row) => row.map((v) => Q(v, L.Rred.den)));
  check('Cayley card: R(1/2, 1/2, 0) = (1/3)·[(2, 1, 2), (1, 2, −2), (−2, 2, 1)] = Ad(2, 1, 1, 0)', Rp.every((row, i) => row.every((v, j) => eqQ(v, R[i][j]))) && L.Rred.den === '3' && join(L.Rred.M.flat()) === '2,1,2,1,2,-2,-2,2,1');
  check('RᵀR = I and det R = 1 (cayley_orthogonal)', isIdentity(matQ(tQ(R), R)) && L.orth && strQ(L.det) === '1');
  let v = [ZERO, ZERO, ONE],
    w = [ZERO, ZERO, ONE],
    worst = '';
  const T2 = taylorN(sig);
  for (let n = 0; n <= 12; n++) {
    s = await rail(n);
    const M = s.ledger;
    if (!eqVec(probeVec(M.now), v) || !eqQ(M.norm, ONE) || !eqVec(probeVec(M.tnow), w) || !eqQ(M.tnorm, normQ(w)) || !eqQ(normQ(w), [17n ** BigInt(n), 16n ** BigInt(n)])) worst ||= `n = ${n}`;
    v = vecQ(R, v);
    w = vecQ(T2, w);
  }
  check('twelve steps: R(σ)ⁿv₀ exact with ‖·‖² = 1; the Taylor point has ‖·‖² = (17/16)ⁿ', !worst, worst);
  s = await rail(12);
  check('Cayley still: R¹²v₀ has denominator 3¹² = 531441, the Taylor norm² is 17¹²/16¹² > 2.069', s.ledger.now[1] === '531441' && strQ(s.ledger.tnorm) === `${17n ** 12n}/${16n ** 12n}` && Number(17n ** 12n) / Number(16n ** 12n) > 2.069);
  // the dual chart chain τₙ = σ ★ τₙ₋₁, recomputed here
  let tau = [ZERO, ZERO, ZERO],
    bad = '';
  for (let n = 1; n <= 12; n++) {
    const st = starN(sig, tau),
      ps = s.ledger.stars[n],
      sum = addQ(st.Dp, st.Dm),
      prod = mulQ(addQ(ONE, st.a), addQ(ONE, st.b)),
      big = st.plus ? st.Dp : st.Dm;
    const out = st.N.map((x) => (st.plus ? divQ(x, st.Dp) : subQ(ZERO, divQ(x, st.Dm))));
    if (!eqQ(ps.Dp, st.Dp) || !eqQ(ps.Dm, st.Dm) || !eqQ(sum, prod) || !eqQ(ps.sum, sum) || BigInt(big[0]) * 2n < BigInt(big[1]) || ps.plusBranch !== st.plus || !eqVec(ps.out, out)) bad ||= `n = ${n}`;
    tau = out;
  }
  check('the dual chart: D₊, D₋ and the branch of all twelve steps; D₊ + D₋ = (1 + a)(1 + b) and max(D₊, D₋) ≥ 1/2', !bad, bad);
}
{
  s = await press('[data-sig="1,0,0,1"]');
  const R = adMatrix(PH);
  check('σ = (1, 0, 0): Cayley(1, 0, 0) = Ad(pHalf) = [(1, 0, 0), (0, 0, −1), (0, 1, 0)], an integer matrix', s.ledger.adPHalf && s.ledger.Rred.den === '1' && join(s.ledger.Rred.M.flat()) === '1,0,0,0,0,-1,0,1,0' && R.flat().map(strQ).join() === '1,0,0,0,0,-1,0,1,0');
  s = await rail(4);
  check('… whose fourth power brings v₀ back: R⁴v₀ = v₀, while the Taylor norm² is (5/4)⁴', join(s.ledger.now[0]) === '0,0,1' && s.ledger.now[1] === '1' && strQ(s.ledger.tnorm) === '625/256');
  for (const [id, v] of [
    ['sx', 2],
    ['sy', -1],
    ['sz', 3],
    ['sd', 5]
  ])
    s = await dial(id, v);
  {
    const R = adMatrix(Z([5, 2, -1, 3]));
    check('the σ dials (2, −1, 3)/5: R = Ad(5, 2, −1, 3), RᵀR = I, the iterates stay on the sphere', s.preset === null && s.ledger.Rred.M.map((row) => row.map((v) => Q(v, s.ledger.Rred.den))).every((row, i) => row.every((v, j) => eqQ(v, R[i][j]))) && isIdentity(matQ(tQ(R), R)) && s.ledger.norms.every((x) => eqQ(x, ONE)));
  }
  s = await press('#stageAct');
  check('the stage button steps to the next generator', s.sig.join() === '1,1,0' && s.d === 2);
  const bench = await page.evaluate(() => window.OMEGASPIN_DEBUG.bench());
  check('the page benchmark: 375 parameters with CᵀC = N²I, det = N³ and twelve unit iterates; the dual chart without failure', bench.sigmas === 375 && bench.orthBad === 0 && bench.detBad === 0 && bench.iterBad === 0 && bench.duals > 0 && bench.sumBad === 0 && bench.boundBad === 0 && bench.numBad === 0, JSON.stringify([bench.sigmas, bench.duals]));
}

/* ---------- lens, views, handle, keyboard ---------- */
s = await pick(CIRCLE);
const before = JSON.stringify(s.ledger),
  bigBefore = await page.textContent('#hudBig');
s = await press('#lensToggleBtn');
check('the lens changes names, not the state', s.lens === 1 && JSON.stringify(s.ledger) === before && (await page.textContent('#hudBig')) !== bigBefore && (await page.getAttribute('#lensToggleBtn', 'aria-pressed')) === 'true');
s = await press('#lensToggleBtn');
check('… and back', s.lens === 0);
const pitch0 = s.camera.pitch;
s = await press('[data-cam="pole"]');
check('the view chips turn the camera (from above)', s.cam === 'pole' && (await until(page, (p) => Math.abs(window.OMEGASPIN_DEBUG.state.camera.pitch - p) > 0.5, pitch0)));
s = await press('[data-cam="card"]');
await until(page, () => Math.abs(window.OMEGASPIN_DEBUG.state.camera.pitch - 0.25) < 1e-6);
await pick(CIRCLE);
{
  const box = await page.locator('#stageHandle').boundingBox(),
    to = await page.evaluate(() => window.OMEGASPIN_DEBUG.dragTarget(8));
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, { steps: 6 });
  await page.mouse.up();
  s = await state();
  check('dragging the amber handle moves the point along the rail to [8 : 8] = 8·[1 : 1]', s.at.circle === 8 && s.preset === null && join(s.ledger.red) === '1,1' && eqQ(s.ledger.kappa, Q(1, 2)), `k = ${s.at.circle}`);
}
await page.locator('#stageHandle').focus();
await page.keyboard.press('ArrowRight');
s = await state();
check('→ on the handle moves one step', s.at.circle === 9);
await page.keyboard.press('Home');
s = await state();
check('Home on the handle goes to the start', s.at.circle === 0);
await page.evaluate(() => document.activeElement.blur());
check('Space plays', await playsAfter(page, () => page.keyboard.press(' '), () => window.OMEGASPIN_DEBUG.state));
await page.keyboard.press(' ');
check('Space pauses', !(await state()).playing);
await page.locator('[data-speed="2"]').evaluate((b) => b.click());
check('a card plays from its start', await playsAfter(page, () => page.click(`[data-preset="${SPINOR}"]`), () => window.OMEGASPIN_DEBUG.state));
check('… and parks on its still', await until(page, () => { const d = window.OMEGASPIN_DEBUG.state; return !d.playing && d.t === 6 && d.preset === 'pythspinor-720-double-cover'; }));
await page.locator('[data-speed="1"]').evaluate((b) => b.click());
check('no stage labels on top of each other after all this', (await labelOverlaps(page, '.stage .tag')).length === 0);
check('no sideways scrolling', (await overflowX(page)) <= 0);

/* ---------- the stills a chapter would print ---------- */
const CAPTIONS = {
  [CIRCLE]: (d) => join(d.ledger.raw) === '16,0' && strQ(d.ledger.kappa) === '0' && strQ(d.ledger.X) === '-1' && d.at.circle === 16,
  [TERNION]: (d) => join(d.ledger.ab) === '1,1,1,1' && join(d.ledger.ba) === '1,1,1,-1' && d.at.ternion === 16,
  [SPINOR]: (d) => join(d.ledger.now.red.num) === '1,0,0,0' && strQ(d.ledger.now.kspin) === '1' && strQ(d.ledger.beats[3].kspin) === '0' && d.at.spinor === 6,
  [CAYLEY]: (d) => strQ(d.ledger.norm) === '1' && strQ(d.ledger.M2) === '17/16' && Math.abs(Number(d.ledger.tnorm[0]) / Number(d.ledger.tnorm[1]) - 2.0699) < 1e-3 && d.at.cayley === 12
};
for (const [card, ok] of Object.entries(CAPTIONS))
  for (const lang of ['zh', 'en']) {
    const p = await openStill(T, BOOK, ID, card, lang),
      d = await p.evaluate(() => window.OMEGASPIN_DEBUG.state);
    check(`still ${card} (${lang}): the frame carries the numbers of its note`, d.preset === card && !d.playing && ok(d), JSON.stringify([d.preset, d.t]));
    await p.context().close();
  }

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
