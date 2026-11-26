import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  session,
  stageFirstChecks,
  solidPixels,
  viewportShare,
  settle,
  openStill,
  playsAfter,
  until,
  stageView,
  cjkLeftovers,
  capitalGreek,
  overflowX,
  labelOverlaps
} from '../../../../tools/node/viz-testkit.mjs';
import { ROOT, resolveBook, vizCitations } from '../../../../tools/node/viz-common.mjs';

const BOOK = 'quantum-geometry';
const ID = 'lean4-zero-axiom-omega-math-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const THEORY = 'ch39-s36-lean4-zero-axiom-omega-math-architecture.html#sec-ch39-lean4-zero-axiom-omega-math-architecture';
const SECTION = '32.8';
const PI = Math.PI;
// scene, view, the declared still (a value of the rail), the end of the rail and the regime of the still of every card
const CARDS = {
  'cic-kernel-vs-axiom-and-real-tax': { scene: 'kernel', cam: 'panorama', still: 3, max: 4, regime: 'omega4' },
  'canonical-proj-ternion-zero-quotient': { scene: 'carrier', cam: 'face', still: 3, max: 3, regime: 'canon' },
  'typeclass-consistency-and-jet2-decide': { scene: 'master', cam: 'face', still: 7, max: 7, regime: 'c8' },
  'rational-schur-and-shadow-functor-bridge': { scene: 'bridge', cam: 'face', still: 32, max: 64, regime: 'least' },
  'three-step-omegacore-roadmap-benchmark': { scene: 'tasks', cam: 'panorama', still: 4, max: 4, regime: 'omega5' }
};
const IDS = Object.keys(CARDS);
const [KERNEL, CARRIER, MASTER, BRIDGE, TASKS] = IDS;
const DEFAULT = KERNEL;
const CAM_NAMES = ['panorama', 'face', 'under'];
// the rails that stop on whole numbers only
const RAILS_WHOLE = new Set([MASTER, BRIDGE]);
// the order of the theorem box of §32.8
const GIDS = [
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul',
  'D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor',
  'D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev',
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  'D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least',
  'D5/S3/Quantum/AURICOmega/GramIsometryExtension.existsUnique_linearIsometryEquiv_of_gram_preserving',
  'D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover',
  'D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced_den',
  'D5/S1/Depth/ContinuedFractions/FiniteRationalConvergentsLength.convergents_length_log',
  'D5/S3/FiniteGroups/Cyclic/VerifiedPrimeFactorStripping.stripFactors_correct',
  'D5/S0/Computability/BinaryNameComparison.name_compare_run',
  'D5/S3/Weil/BurnolGram/BurnolRationalDepthBudget.rationalQuarterDepth_integer_sound',
  'D5/S3/Weil/BurnolGram/BurnolRationalDepthBudget.rationalQuarterDepth_real_sound'
];
// the census taken in Lean v4.35.0 with Mathlib 56a005855ea1: declarations reachable from one proof of each task
const CENSUS = { omega: [396, 372, 379, 380], real: [7480, 7144, 17786, 7395], boom: 363, lean: 'v4.35.0', mathlib: '56a005855ea1' };
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const range = (n) => Array.from({ length: n }, (_, i) => i);

/* ---------- independent mathematics, written here and never calling the page ---------- */
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));
const sub = (a, b) => a.map((x, i) => x - b[i]);
const gcdN = (a, b) => (b ? gcdN(b, a % b) : a < 0n ? -a : a);
const fracN = (p, q = 1n) => {
  const g = gcdN(p, q) * (q < 0n ? -1n : 1n);
  return [p / g, q / g];
};
const [addN, subN, mulN, divN] = [([a, b], [c, d]) => fracN(a * d + c * b, b * d), ([a, b], [c, d]) => fracN(a * d - c * b, b * d), ([a, b], [c, d]) => fracN(a * c, b * d), ([a, b], [c, d]) => fracN(a * d, b * c)];
const cmpN = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
const numN = ([p, q]) => Number((p * 10n ** 40n) / q) / 1e40;
const intN = (n) => [BigInt(n), 1n];
const ONE = intN(1),
  ZERO = intN(0),
  HALF = [1n, 2n];
const eqN = (a, b) => cmpN(a, b) === 0;
const strN = ([p, q]) => `${p}`.replace('-', '−') + (q === 1n ? '' : `/${q}`);
/** The double x itself. */
function doubleN(x) {
  let q = 1n;
  while (!Number.isInteger(x)) {
    x *= 2;
    q *= 2n;
  }
  return fracN(BigInt(x), q);
}
/** The fraction a probe carries as two strings. */
const readN = ([p, q]) => [BigInt(p), BigInt(q)];
const parseN = (s) => {
  const [p, q = '1'] = s.split('/');
  return fracN(BigInt(p), BigInt(q));
};
const tupleN = (t) => `(${t.map((x) => `${x}`.replace('-', '−')).join(', ')})`;
/** A tuple of integers times the quaternion product, through the 4 × 4 matrix of the left factor. */
const leftN = ([w, x, y, z]) => [
  [w, -x, -y, -z],
  [x, w, -z, y],
  [y, z, w, -x],
  [z, -y, x, w]
];
const qmN = (a, b) => leftN(a).map((row) => dot(row, b) + 0);
const conjN = ([w, x, y, z]) => [w, -x + 0, -y + 0, -z + 0];
/** The canonical tuple of a nonzero one: divide by primes while all entries allow it, then fix the sign. */
function canonN(t) {
  let v = [...t];
  if (v.every((x) => x === 0)) return [1, 0, 0, 0];
  for (let p = 2; p <= Math.max(...v.map(Math.abs)); ) {
    if (v.every((x) => x % p === 0)) v = v.map((x) => x / p);
    else p++;
  }
  const lead = v.find((x) => x !== 0);
  return v.map((x) => (lead < 0 ? -x : x) + 0);
}
const gcdOf = (t) => t.reduce((g, x) => Number(gcdN(BigInt(g), BigInt(Math.abs(x)))), 0);
const triadN = (a, b, c) => canonN(qmN(qmN(a, conjN(b)), c));
const norm2N = (p) => dot(p, p);
/** The squared cosine of two lines, as a fraction. */
const kappaN = (a, b) => (norm2N(a) * norm2N(b) === 0 ? ZERO : fracN(BigInt(dot(a, b)) ** 2n, BigInt(norm2N(a)) * BigInt(norm2N(b))));
/** The rotation v ↦ p v p̄ on the three axes, as rows of fractions over ‖p‖². */
const turnN = (p) => {
  const cols = [[0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]].map((v) => qmN(qmN(p, v), conjN(p)).slice(1));
  return range(3).map((i) => cols.map((c) => fracN(BigInt(c[i]), BigInt(norm2N(p)))));
};
/** (x, −z, y): the rotation written on coordinates. */
const turnTextN = (p) =>
  `(${turnN(p)
    .map((row) => row.map((c, j) => [c, 'xyz'[j]]).filter(([c]) => c[0] !== 0n).map(([c, v], k) => `${c[0] < 0n ? '−' : k ? '+' : ''}${eqN(c, ONE) || eqN(c, intN(-1)) ? '' : strN(c).replace('−', '')}${v}`).join(''))
    .join(', ')})`;
/** The second-order jet of 1/(1 + x²) at a rational point, by solving (1 + x²)·j = 1 coefficient by coefficient. */
function jetN(x0) {
  const b0 = addN(ONE, mulN(x0, x0)),
    b1 = mulN(intN(2), x0),
    j0 = divN(ONE, b0),
    j1 = divN(mulN(intN(-1), mulN(b1, j0)), b0),
    j2 = divN(mulN(intN(-1), addN(mulN(b1, j1), j0)), b0);
  return [j0, j1, j2];
}
/** 2 + 2y + (3/2)y² and its vertex: the Schur value of A = 2, B = 1, C = 3/2. */
const formN = (y) => addN(addN(intN(2), mulN(intN(2), y)), mulN([3n, 2n], mulN(y, y)));
const VERTEX = [-2n, 3n],
  SCHUR = formN(VERTEX);
/** The least N with c·q < d·p·4^(N+1). */
function depthN(c, d, p, q) {
  let N = 0n;
  while (!(BigInt(c) * BigInt(q) < BigInt(d) * BigInt(p) * 4n ** (N + 1n))) N++;
  return Number(N);
}

/* the integer steps of the listing, by a cost model of its own: every function returns its value and its price */
const gcdCost = (m, n) => (m === 0 ? 0 : 1 + gcdCost(n % m, m));
const gcdV = (m, n) => (m === 0 ? n : gcdV(n % m, m));
/** The price of QRat.mkNorm and its value. */
function normC(n, d) {
  if (d === 0) return { v: [0, 1], c: 1 };
  if (n === 0) return { v: [0, 1], c: 2 };
  const g = gcdV(Math.abs(n), Math.abs(d)),
    s = d > 0 ? 1 : -1;
  return { v: [(s * n) / g, Math.abs(d) / g], c: 2 + gcdCost(Math.abs(n), Math.abs(d)) + 1 + (d < 0 ? 1 : 0) + 2 };
}
const fold = (extra, r, ...parts) => ({ v: r.v, c: extra + r.c + parts.reduce((s, p) => s + p.c, 0) });
const addC = (a, b) => fold(4, normC(a.v[0] * b.v[1] + b.v[0] * a.v[1], a.v[1] * b.v[1]), a, b),
  subC = (a, b) => fold(4, normC(a.v[0] * b.v[1] - b.v[0] * a.v[1], a.v[1] * b.v[1]), a, b),
  mulC = (a, b) => fold(2, normC(a.v[0] * b.v[0], a.v[1] * b.v[1]), a, b),
  invC = (a) => fold(0, normC(a.v[1], a.v[0]), a);
const free = (v) => ({ v, c: 0 });
/** The same value used again costs nothing more. */
const again = (a) => free(a.v);
const eqC = (a, v) => a.c + (a.v[0] === v[0] ? 2 : 1);
function tupleC(t) {
  const [w, x, y, z] = t.map(Math.abs),
    g1 = gcdV(w, x),
    g2 = gcdV(y, z),
    g = gcdV(g1, g2),
    c = gcdCost(w, x) + gcdCost(y, z) + gcdCost(g1, g2) + 1;
  if (g === 0) return c;
  const lead = t.findIndex((v) => v !== 0);
  return c + 4 + Math.min(lead + 1, 3) + 1 + 4;
}
/** A triad: three negations, two products of 16 multiplications and 12 sums, and the normalization. */
const triadC = (a, b, c) => 3 + 28 + 28 + tupleC(qmN(qmN(a, conjN(b)), c));
const sameC = (t, want) => 1 + (t.findIndex((v, i) => v !== want[i]) + 1 || 4) - 1;
/** κ: four inner products of 7 steps, two products, and the reduction. */
const kappaC = (a, b) => fold(30, normC(dot(a, b) ** 2, norm2N(a) * norm2N(b)));
const [P0, PHALF, PINF, QHALF, G120, G2] = [[1, 0, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [1, 0, 1, 0], [1, 1, 1, 1], [1, -1, -1, -1]];
const kappaPrice = (q, v) => eqC(kappaC(P0, q), v);
const triadPrice = (a, b, c, want) => triadC(a, b, c) + sameC(triadN(a, b, c), want);
function jetPrice() {
  const x = [free([1, 1]), free([1, 1]), free([0, 1])],
    sq = [mulC(x[0], x[0]), addC(mulC(x[0], x[1]), mulC(x[1], x[0])), addC(addC(mulC(x[0], x[2]), mulC(x[1], x[1])), mulC(x[2], x[0]))],
    base = [addC(free([1, 1]), sq[0]), addC(free([0, 1]), sq[1]), addC(free([0, 1]), sq[2])],
    i0 = invC(again(base[0])),
    u1 = mulC(again(base[1]), again(i0)),
    u2 = mulC(again(base[2]), again(i0)),
    j1 = subC(free([0, 1]), mulC(again(i0), again(u1))),
    j2 = mulC(again(i0), subC(mulC(again(u1), again(u1)), again(u2)));
  return base.reduce((s, b) => s + b.c, 0) + i0.c + u1.c + u2.c + eqC(again(i0), [1, 2]) + j1.c + eqC(again(j1), [-1, 2]) + j2.c + eqC(again(j2), [1, 4]);
}
const CONJ_STEPS = [
  kappaPrice(P0, [1, 1]),
  kappaPrice(PHALF, [1, 2]),
  kappaPrice(PINF, [0, 1]),
  kappaPrice(G120, [1, 4]),
  triadC(G120, P0, G120) + triadPrice(G2, P0, G120, P0),
  triadPrice(PHALF, PHALF, G120, G120),
  triadC(PHALF, P0, QHALF) + triadC(QHALF, P0, PHALF) + sameC(G120, [1, 1, 1, -1]),
  jetPrice()
];
const schurPrice = () => eqC(subC(free([2, 1]), mulC(mulC(free([1, 1]), invC(free([3, 2]))), free([1, 1]))), [4, 3]);
const TASK_STEPS = [
  CONJ_STEPS[0] + CONJ_STEPS[1] + CONJ_STEPS[2] + triadPrice(G120, P0, G120, G2) + CONJ_STEPS[4],
  triadPrice(PHALF, P0, QHALF, G120) + triadPrice(QHALF, P0, PHALF, [1, 1, 1, -1]) + CONJ_STEPS[6],
  CONJ_STEPS[7],
  // the depth: two products, a division, three comparisons and two divisions, the test; the certificate: six products and a comparison, with cq
  schurPrice() + (3 + 3 + 2) + 1 + (1 + 1 + 3 + 1 + 1)
];
const CONJ_LAWS = ['κ(p0, p0) = ⟨1, 1⟩', 'κ(p0, pHalf) = ⟨1, 2⟩', 'κ(p0, pInf) = ⟨0, 1⟩', 'κ(p0, g120) = ⟨1, 4⟩', 'gStep3 = p0', 'triad pHalf pHalf g120 = g120', 'triad pHalf p0 qHalf ≠ triad qHalf p0 pHalf', 'Jet2Rat.kappaJetAt ⟨1, 1⟩ = ⟨1/2, −1/2, 1/4⟩'];
const CONJ_TRUE = [eqN(kappaN(P0, P0), ONE), eqN(kappaN(P0, PHALF), HALF), eqN(kappaN(P0, PINF), ZERO), eqN(kappaN(P0, G120), [1n, 4n]), same(triadN(triadN(G120, P0, G120), P0, G120), P0), same(triadN(PHALF, PHALF, G120), G120), !same(triadN(PHALF, P0, QHALF), triadN(QHALF, P0, PHALF)), jetN(ONE).every((x, i) => eqN(x, [[1n, 2n], [-1n, 2n], [1n, 4n]][i]))];
const RAYS = { half: PHALF, past: P0, inf: PINF, g: G120 },
  RAY_NAME = { half: 'pHalf', past: 'p0', inf: 'pInf', g: 'g120' };
/** Four decimals of 1/√n, cut towards 0, by integer square roots; null when n is a square. */
function spinorN(n) {
  const r = range(20).find((k) => k * k === n);
  if (r !== undefined) return { root: r };
  let d = 0;
  while ((d + 1) ** 2 * n <= 100000000) d++;
  return { root: 0, d: fracN(BigInt(d), 10000n), rest: fracN(BigInt(d * d * n), 100000000n) };
}

/* ---------- what a printed decimal says ---------- */
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const supT = (n) => String(n).replace(/\d/g, (c) => SUP[c]);
const expOf = (e) => Number(e.replace('⁻', '-').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (d) => SUP.indexOf(d)));
const tenN = (e) => (e < 0 ? [1n, 10n ** BigInt(-e)] : [10n ** BigInt(e), 1n]);
/** The decimal a printed text names: 0.0205, −6.429×10⁻⁸. */
function decimalN(s) {
  const [m, e = '⁰'] = s.replace('−', '-').split('×10'),
    [whole, part = ''] = m.split('.');
  return mulN([BigInt(whole + part), 1n], tenN(expOf(e) - part.length));
}
const SCI = '\\d\\.\\d{2,3}×10⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+';
const VALUE = `(?:(?:1/2|1) [−+] ${SCI}|−?${SCI}|−?\\d+\\.\\d+)`;
/** What is wrong with the relation `sign printed` of a value: q the value as a fraction (null: irrational), x the value as a
    double; '' when it is right. “=” is written exactly when the printed decimal is the value; a rounding is within half a unit
    of the last digit; a value that is not 0, 1/2 or 1 is never printed as one of them. */
function wrongRelation(sign, printed, q, x) {
  const tail = /^(1\/2|1) ([−+]) (.*)$/.exec(printed);
  if (tail) {
    const L = tail[1] === '1' ? 1 : 0.5,
      d = q ? numN(subN(q, doubleN(L))) : x - L,
      size = numN(decimalN(tail[3]));
    if (sign !== '≈') return 'a difference after “=”';
    return Math.sign(d) === (tail[2] === '+' ? 1 : -1) && Math.abs(Math.abs(d) - size) <= 6e-4 * size ? '' : 'the difference';
  }
  const dec = decimalN(printed),
    exact = !!q && eqN(dec, q);
  if (sign === '=') return exact ? '' : 'not the value itself';
  if (exact) return 'the value itself after “≈”';
  const sci = printed.includes('×10'),
    unit = sci ? numN(tenN(expOf(printed.split('×10')[1]))) * 10 ** -printed.split('×10')[0].split('.')[1].length : 10 ** -printed.split('.')[1].length,
    v = q ? numN(q) : x;
  if ([0, 0.5, 1].includes(Math.abs(numN(dec)))) return 'printed as a landmark';
  return Math.abs(numN(dec) - v) <= 0.5000001 * unit + 1e-12 * Math.abs(v) ? '' : 'not the rounding';
}
/** The relation and the digits the page must print for a fraction. */
function said(q, d = 4) {
  const [p, r] = q,
    a = (p < 0n ? -p : p) * 10n ** BigInt(d),
    k = (2n * a + r) / (2n * r),
    s = String(k).padStart(d + 1, '0'),
    text = `${p < 0n && k > 0n ? '−' : ''}${s.slice(0, s.length - d)}.${s.slice(s.length - d)}`;
  return `${a === k * r ? '=' : '≈'} ${text}`;
}
/** A fraction with its decimal, a value beside 0, 1/2 or 1 written as a difference. */
function relFraction(q, d = 4) {
  const s = said(q, d),
    v = Number(s.slice(2).replace('−', '-'));
  if (s[0] === '≈' && [0, 0.5, 1].includes(v)) {
    const gap = numN(subN(q, doubleN(v))),
      t = Math.abs(gap).toExponential(3).split('e'),
      sci = `${t[0]}×10${Number(t[1]) < 0 ? '⁻' : ''}${supT(Math.abs(Number(t[1])))}`;
    return v === 0 ? `≈ ${gap < 0 ? '−' : ''}${sci}` : `≈ ${v === 1 ? '1' : '1/2'} ${gap < 0 ? '−' : '+'} ${sci}`;
  }
  return s;
}
const bothN = (q, d = 4) => `${strN(q)} ${relFraction(q, d)}`;
/* mixed inequalities: rounded or decimal digits in the same clause as < > ≤ ≥. Nothing is exempt. */
const SIGN = '[<>≤≥]';
function clauses(text) {
  let s = text.replace(/\s+/g, ' ');
  const out = [];
  for (let m; (m = /[(（]([^()（）]*)[)）]/.exec(s)); ) {
    out.push(m[1]);
    s = `${s.slice(0, m.index)}◦${s.slice(m.index + m[0].length)}`;
  }
  return [...out, s].flatMap((x) => x.split(/[，；。、,;:：¶]| · | ↔ | → | \/ |\.(?=\s|$)/)).map((x) => x.trim());
}
const MIXED = new RegExp(`≈.*${SIGN}|${SIGN}.*≈`);
/** A rounded value right beside an inequality sign, read through every parenthesis and separator but a comma, a stop or a dot. */
const BESIDE = new RegExp(`≈ ?[^，；。、,;:：·¶≈=]*?${SIGN} ?[−\\d|‖φκα√e]|${SIGN} ?≈`, 'g');
/** A decimal, rounded or exact, right beside an inequality sign. */
const DECIMAL = new RegExp(`\\d\\.\\d+°? ?${SIGN}|${SIGN} ?−?\\d+\\.\\d`, 'g');
const mixed = (text) => [...clauses(text).filter((x) => MIXED.test(x)), ...[...text.replace(/\s+/g, ' ').matchAll(DECIMAL)].map((m) => m[0]), ...[...text.replace(/\s+/g, ' ').matchAll(BESIDE)].map((m) => m[0])];

const T = await session();
const { page, check } = T;
// Headless Chromium can report driver diagnostics as warnings. They are harmless; every other warning is a failure.
const driverInfo = /KHR_parallel_shader_compile|GPU stall due to ReadPixels|SwiftShader|GL Driver Message|WEBGL_debug_renderer_info/;
const browserWarnings = [];
const watched = new WeakSet();
function watchPage(p) {
  if (watched.has(p)) return;
  watched.add(p);
  p.on('console', (m) => {
    if ((m.type() === 'info' || m.type() === 'warning') && driverInfo.test(m.text())) return;
    if (m.type() === 'warning') browserWarnings.push(`${p.url()}: ${m.text()}`);
  });
}
// The lab is a permanent night console: record every attempt to write data-tr-palette, from before page scripts run.
const paletteMutations = [],
  paletteDocuments = [];
async function watchPalette(context) {
  await context.exposeBinding('__lean4PaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__lean4PaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener(
      'DOMContentLoaded',
      () =>
        window
          .__lean4PaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined, dark: matchMedia('(prefers-color-scheme: dark)').matches })
          .catch(() => {}),
      { once: true }
    );
  });
  context.on('page', watchPage);
  context.pages().forEach(watchPage);
}
let colorScheme = 'dark';
await watchPalette(T.context);
const browserNewContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async (options) => {
  const context = await browserNewContext({ ...options, colorScheme });
  await watchPalette(context);
  return context;
};
watchPage(page);

// the shared gate: stage share, cards, drawer, honest labels, English, embeds, rail, cited figures, phone, cover, motion,
// and the lit-solid checks of kit.solid (opaque share, shading, turning, resting)
const gate = [];
T.check = (name, ok, detail) => {
  gate.push([name, !!ok]);
  return check(name, ok, detail);
};
await stageFirstChecks(T, BOOK, ID, { solid: true });
T.check = check;
{
  const ran = (re) => gate.some(([name]) => re.test(name));
  const esc = (s) => s.replace(/[-/]/g, '\\$&');
  for (const id of IDS) {
    const c = esc(id);
    check(
      `the shared gate went through ${id}: desktop in Chinese and English, the phone, the frame of a phone and the cited figures of both languages`,
      ran(new RegExp(`^desktop: card ${c} applies`)) &&
        ran(new RegExp(`^desktop: card ${c}: the stage, the tour bar`)) &&
        ran(new RegExp(`^English: card ${c}: the stage, the tour bar`)) &&
        ran(new RegExp(`^English: no Chinese left with card ${c}`)) &&
        ran(new RegExp(`^phone: card ${c} applies`)) &&
        ran(new RegExp(`^phone: card ${c}: the stage, the tour bar`)) &&
        ['zh', 'en'].every((lang) => ran(new RegExp(`^frame \\(${lang}, 334 × 620\\), ▶ card ${c}`)) && [334, 740].every((w) => ran(new RegExp(`^cited figure \\(${lang}, ${c}, ${w} × 500\\)`))))
    );
  }
  check('the shared gate ran whole and passed: solid, cards, evidence, rails, keys, short screens, cover and motion', gate.length > 200 && gate.every(([, ok]) => ok) && [/^evidence: green boxes/, /^short screen/, /^cover:/, /^rail|clock/i, /solid/i].every(ran), String(gate.length));
}

/* ---------- sources, registry, citations and dependencies ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
const suite = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
const registry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8'));
const entry = (registry.visualizations || []).find((v) => v.id === ID) || null;
const entryText = JSON.stringify(entry || {});
const deps = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'tests', 'dependencies.json'), 'utf8'));
// forbidden words are kept as code points so this suite itself carries no such identifier
const [numbered, ...forbidden] = [
  [103, 112, 116],
  [99, 108, 97, 117, 100, 101],
  [97, 110, 116, 104, 114, 111, 112, 105, 99],
  [111, 112, 101, 110, 97, 105],
  [103, 101, 109, 105, 110, 105],
  [99, 111, 100, 101, 120],
  [99, 111, 112, 105, 108, 111, 116],
  [111, 112, 117, 115],
  [115, 111, 110, 110, 101, 116],
  [104, 97, 105, 107, 117],
  [108, 108, 109],
  [97, 103, 101, 110, 116],
  [99, 104, 97, 116, 98, 111, 116],
  [100, 101, 101, 112, 109, 105, 110, 100]
].map((codes) => String.fromCharCode(...codes));
const identifiers = new RegExp(`\\b(?:${forbidden.join('|')}|${numbered}-?\\d)\\b`, 'i');
const shortAcronym = new RegExp(`\\b${String.fromCharCode(65, 73)}\\b`);
const cjkTerms = new RegExp(
  [
    [22823, 27169, 22411],
    [26234, 33021, 20307],
    [20154, 24037, 26234, 33021]
  ]
    .map((c) => String.fromCharCode(...c))
    .join('|')
);
const hangul = new RegExp('[' + [[0x1100, 0x11ff], [0x3130, 0x318f], [0xac00, 0xd7af]].map(([a, b]) => String.fromCharCode(a) + '-' + String.fromCharCode(b)).join('') + ']');
const literalColour = /#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i;
for (const [file, src] of Object.entries(sources)) {
  check(`source ${file}: no literal colour and no palette switch`, !literalColour.test(src) && !/\btrPalette\b|data-tr-palette|[?&]theme=/.test(src), (literalColour.exec(src) || [''])[0]);
  check(`source ${file}: no model, vendor or tool identifiers and no Hangul`, !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src) && !hangul.test(src), (identifiers.exec(src) || shortAcronym.exec(src) || [''])[0]);
  check(`source ${file}: no possessive ’s (the runtime splits it)`, !/[A-Za-z][’']s\b/.test(src), (/.{12}[A-Za-z][’']s\b/.exec(src) || [''])[0]);
}
check('reserved identifiers are absent from the suite and registry entry', [suite, entryText].every((src) => !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src) && !hangul.test(src)));
check(
  'the page loads exactly the shared theme, its own style sheet, the shell, the kit and main.js',
  same([...sources['index.html'].matchAll(/<(?:script src|link rel="stylesheet" href)="([^"]+)"/g)].map((m) => m[1]).filter((u) => !u.startsWith('https://fonts.')), ['../assets/theme.css', 'style.css', '../assets/shell.js', '../assets/kit.js', 'main.js'])
);
check(
  'registration: §32.8, live, five cards and the fifteen GIDs in order',
  !!entry &&
    entry.chapter === 32 &&
    entry.section === SECTION &&
    entry.status === 'live' &&
    entry.added === '2026-11-23' &&
    entry.capture_lock === 'links' &&
    entry.code === 'OMEGA//LEAN4' &&
    same(entry.presets, IDS) &&
    same(Object.keys(entry.preset_titles), IDS) &&
    same(entry.lean.map((x) => x.gid), GIDS) &&
    entry.theory.length === 1 &&
    entry.theory[0].label === '§32.8 · Lean 4 零公理形式化基座（OmegaMath）' &&
    entry.theory[0].label_en === '§32.8 · Zero-Axiom Lean 4 Formalization Architecture (OmegaMath)' &&
    entry.theory[0].href === '../zh/' + THEORY &&
    entry.theory[0].href_en === '../en/' + THEORY
);
check(
  'registration: the title of the page is the title of the registry in both languages',
  sources['index.html'].includes(`<title>OMEGA//LEAN4 · ${entry.title}</title>`) && sources['index.html'].includes(`data-title-en="OMEGA//LEAN4 · ${entry.title_en.replace('&', '&amp;')}"`)
);
check(
  'registration: the card titles of the registry are the card names of the page',
  IDS.every((id) => {
    const button = new RegExp(`data-preset="${id}"[^>]*>.*?<span class="cn zh">([^<]*)</span><span class="cn en">([^<]*)</span>`).exec(sources['index.html']);
    return !!button && entry.preset_titles[id].zh === button[1] && entry.preset_titles[id].en === button[2];
  })
);
const depList = deps.suites[ID + '.test.mjs'] || [];
// the complete read contract of this suite, written out: no other suite is consulted
const READS = [
  '@citations',
  '@lean-links',
  '@registry-entry',
  'books/quantum-geometry/book.toml',
  'package-lock.json',
  'package.json',
  'site.toml',
  'theme/generated/tokens.css',
  'theme/tokens.json',
  'theme/viz/favicon.svg',
  'theme/viz/kit.js',
  'theme/viz/shell.js',
  'theme/viz/solid-core.js',
  'theme/viz/theme.css',
  'theme/viz/vendor/three.core.min.js',
  'theme/viz/vendor/three.module.min.js',
  'tools/tbook/__init__.py',
  'tools/tbook/config.py',
  'tools/tbook/lean.py',
  'tools/tbook/mathrender.py',
  'tools/tbook/mdscan.py',
  'tools/tbook/model.py',
  'tools/tbook/paths.py',
  'tools/tbook/summary.py',
  'tools/tbook/viz.py'
];
check(
  'dependencies: exactly the 25 reads of this suite, each once, no chapter file and no other suite',
  READS.length === 25 && depList.length === 25 && same([...depList].sort(), READS) && !depList.some((d) => d.endsWith('.md')),
  JSON.stringify(depList)
);
check('the suite reads no chapter text', !/readFileSync\([^)]*\.md/.test(suite));

/* ---------- static text: pure green boxes, no written numbers, no mixed inequality ---------- */
const plain = (html) => html.replace(/<[^>]*>/g, '').replaceAll('&gt;', '>').replaceAll('&lt;', '<').replaceAll('&amp;', '&').replace(/\s+/g, ' ');
const BOXES = [...sources['index.html'].matchAll(/<div class="lean( [a-z]+)?">(.*?)<\/div>/g)].map((m) => ({
  kind: (m[1] || '').trim(),
  gid: (/data-lean-gid="([^"]+)"/.exec(m[2]) || [])[1] || null,
  zh: plain((/<span class="zh">(.*?)<\/span>(?=<span class="en">)/.exec(m[2]) || ['', ''])[1]),
  en: plain((/<span class="en">(.*?)<\/span>(?=<a data-lean-gid|<\/span>$)/.exec(m[2]) || ['', ''])[1])
}));
const GREEN = BOXES.filter((b) => !b.kind);
check('the panel holds fifteen green boxes in the order of the theorem box, then ARGUED, MODEL and NUM', same(GREEN.map((b) => b.gid), GIDS) && same(BOXES.slice(15).map((b) => b.kind), ['argued', 'model', 'num']) && BOXES.length === 18);
// a green box says what the frozen theorem says: no instance of the page, no computed number, no rounding, no drift
const INSTANCE = /页面|本页|舞台|探针|滑块|偏差|余量|数值|演示|这里的|相差|实例|手工推导|取到处|y\* =|this page|the page|on the page|stage|probe|slider|\bgap\b|drift|residue|instance|numerical|computes|differ by|derived by hand|attained at|≈|\d\.\d|10⁻|OmegaMath|公理|axiom\b|黎曼|Riemann/i;
check('green boxes: no instance, number, rounding, drift or remark of the page in any of the fifteen, in either language', GREEN.every((b) => b.zh.length > 20 && b.en.length > 30 && !INSTANCE.test(b.zh) && !INSTANCE.test(b.en) && !/MODEL|NUM|ARGUED/.test(b.zh + b.en)), GREEN.filter((b) => INSTANCE.test(b.zh) || INSTANCE.test(b.en)).map((b) => b.gid + ' ' + (INSTANCE.exec(b.zh) || INSTANCE.exec(b.en))[0]).join(' | '));
check('green boxes: no mixed inequality and no span the script fills', GREEN.every((b) => !mixed(b.zh).length && !mixed(b.en).length) && [...sources['index.html'].matchAll(/<div class="lean">(.*?)<\/div>/g)].every((m) => !/data-bench|\sid=/.test(m[1])));
const DRAWER_SPANS = ['master', 'axOmega', 'axReal', 'half', 'one', 'zero', 'quarter', 'schur', 'depth', 'bound', 'cenOmega', 'cenReal', 'steps'];
{
  // everything the reader sees before the script runs holds no computed number: the box NUM and the spans of the drawer are empty
  const body = sources['index.html'].slice(sources['index.html'].indexOf('<body')),
    tag = /<div class="lean num"><span class="ok">NUM<\/span><span><span class="zh">—<\/span><span class="en">—<\/span><\/span><\/div>/g,
    spans = [...sources['index.html'].matchAll(/<span data-bench="([a-zA-Z0-9]+)">(.*?)<\/span>/g)].map((m) => [m[1], m[2]]);
  check('index.html: the NUM box is empty until the script fills it', (sources['index.html'].match(tag) || []).length === 1);
  check('index.html: the numbers of the drawer are empty spans, each name once per language', same(spans.map((x) => x[0]), [...DRAWER_SPANS, ...DRAWER_SPANS]) && spans.every((x) => x[1] === '—'), JSON.stringify(spans));
  const decimals = [...plain(body.replace(/<button class="chip" data-speed[^>]*>[^<]*<\/button>/g, '')).matchAll(/(?<![§\d.])\d+\.\d+/g)].map((m) => m[0]);
  check('index.html: no decimal is written anywhere in the page text, the evidence or the drawer', !decimals.length, decimals.join(' '));
  check('index.html: no decimal, no “≈” and no mixed inequality in the description', [(/<meta name="description" content="([^"]*)"/.exec(sources['index.html']) || ['', '≈ 0.5 > 0'])[1]].every((d) => d.length > 100 && !/\d\.\d|≈/.test(d) && !mixed(plain(d)).length));
  check('index.html: the outputs are empty until the script writes them', ['cOut', 'xOut', 'yOut', 'nOut', 'roKey', 'roRoute', 'roTuple', 'roTurn', 'roMaster', 'roJet', 'roSchur', 'roDepth', 'roTask'].every((id) => sources['index.html'].includes(`<output id="${id}">—</output>`)));
  check('index.html: none of the measured or computed counts is written', ![...CENSUS.omega, ...CENSUS.real, CENSUS.boom, 699, 336, 304].some((n) => new RegExp(`(?<![\\d#])${n}(?!\\d)`).test(plain(body))));
  const said0 = mixed(plain(body));
  check('index.html: no rounded digits beside an inequality sign', !said0.length, said0.slice(0, 3).join(' | '));
  const js = sources['main.js'],
    code = js.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, ''),
    bare = code.replace(/<\/?(?:strong|sub|sup|span|i|b)\b[^<>]*>/g, ''),
    written = [...code.matchAll(/[=≈] ?−?\d+\.(?:\d{4}|\d{6}|\d{8}|\d{9})(?!\d)|\d\.\d+°|\d×10⁻|10⁻[⁰¹²³⁴⁵⁶⁷⁸⁹]/g)].map((m) => m[0]);
  check('main.js: no computed result is written into a sentence', !written.length && !/0\.7071|0\.9999|1\.3333|0\.0547|0\.0546|\b699\b|\b336\b|\b304\b/.test(code), written.join(' '));
  check('main.js: the census is written once, in one constant, and nowhere else', [...CENSUS.omega, ...CENSUS.real, CENSUS.boom].every((n) => (code.match(new RegExp(`(?<![\\d.])${n}(?![\\d.])`, 'g')) || []).length === 1) && code.includes('const CENSUS = {'));
  const chained = [...bare.matchAll(/\$\{[^{}]*(?:Rel|rel|relQ|both)\([^{}]*\)\}°? ?(?:&lt;|&gt;|[<>≤≥])|(?:&lt;|&gt;|[<>≤≥]) ?\$\{[^{}]*(?:Rel|relQ|both)\(/g)].map((m) => m[0]);
  check('main.js: no template puts an inequality sign beside a printed relation', !chained.length, chained.join(' | '));
  check(
    'main.js: the NUM box and the spans are filled before the evidence is copied into the drawer',
    js.indexOf('const BENCH = benchmarks();') > 0 && js.indexOf("document.querySelector(`#basis .lean.num .${lang}`).innerHTML = numText(say)") > js.indexOf('const BENCH = benchmarks();') && js.indexOf("$('drawerEvidence').append(") > js.indexOf('el.innerHTML = NUMBERS[el.dataset.bench]()')
  );
  check('main.js: one formatter writes every relation (no “= ${fmt(” or toFixed in a sentence)', !/= ?\$\{fmt\(|\.toFixed\(/.test(js) && js.includes('function rel(q, x, d = 4)'));
  check('main.js: the probe is read-only', js.includes('window.LEAN4_DEBUG = Object.freeze({'));
}
{
  // the detectors find what they must and leave the separated forms: the negative control of every later scan
  const bad = ['7/128 ≈ 0.0547 < 1/10', '0.0547 < 1/10', '0.0546875 < 0.1', 'S ≈ 1.3333 > 0', '2·d² = 0.99998082 < 1', '0 < 1/√2 ≈ 0.7071', 'κ ≈ 0.3333 ≤ 1', '≥ 1.0000', 'bound ≈ 0.0547 ≤ C', 'λ < ≈ 0', '（7/128 ≈ 0.0547 < 1/10）', '≈ 1.0002 (u) > 1', '2.0000 ≥ 1'],
    good = ['70 < 128，于是 (1/4)³ C ≤ 7/128 < 1/10（7/128 的值 ≈ 0.0547）', 'S = 4/3 ≈ 1.3333', '1 + x₀² = 2 ≥ 1，射流 (1/2, −1/2, 1/4)', 'N = 2 · 70 < 128 · 7/128 ≈ 0.054688', 'κ = 1/2 = 0.5000，Ad(p)', '396 ↔ 7480', '1/√2 ≈ 0.7071，截成四位后模方 2·d² = 0.99998082；√2', 'cq = 70 < dp·4³ = 128。'];
  check('the detector finds thirteen rounded or decimal digits beside an inequality sign, without exception, and leaves eight separated texts', bad.every((x) => mixed(x).length > 0) && good.every((x) => !mixed(x).length), JSON.stringify([bad.filter((x) => !mixed(x).length), good.filter((x) => mixed(x).length)]));
}
{
  // only the .viz blocks of the chapter: their src, their preset sequence and the full lab
  const cited = vizCitations(resolveBook(BOOK), ID);
  for (const lang of ['zh', 'en']) {
    const rows = cited.filter((c) => c.lang === lang),
      cards = rows.filter((c) => c.preset).map((c) => c.preset);
    check(`${lang} chapter: the five cards are cited in order, and the full lab once without a preset`, same(cards, IDS) && rows.filter((c) => !c.preset).length === 1, JSON.stringify(rows));
  }
  check('chapter: both editions cite the same sequence of cards', same(...['zh', 'en'].map((lang) => cited.filter((c) => c.lang === lang).map((c) => c.preset || null))));
}

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.LEAN4_DEBUG.state);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => {
    el.value = String(v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
  await settle(p);
}
const seek = (v, p = page) => input('#now', v, p);
const press = async (selector, p = page) => {
  await p.locator(selector).evaluate((b) => b.click());
  await settle(p);
};
async function pause(p = page) {
  await settle(p);
  await p.locator('#play').evaluate((b) => {
    if (b.getAttribute('aria-pressed') === 'true') b.click();
  });
  await settle(p);
}
/** Click a card and wait until it has played up to its still and parked there. */
async function pick(card, p = page) {
  await p.locator(`[data-preset="${card}"]`).evaluate((b) => b.click());
  await settle(p);
  const parked = await until(
    p,
    ([id, still]) => {
      const s = window.LEAN4_DEBUG.state;
      return s.preset === id && !s.blending && !s.playing && Math.abs(s.clock - still) < 1e-12;
    },
    [card, CARDS[card].still],
    // the clock advances at most 0.1 s per frame: with VIZ_SLOW_FRAMES=1000 a card takes up to 50 frames
    150000
  );
  if (!parked) await pause(p);
  // the probe computes live; the readouts are written on the next frame
  await settle(p);
  return parked;
}
async function setLang(lang, p = page) {
  await p.locator('[data-lang-set="' + lang + '"]').evaluate((b) => b.click());
  await settle(p);
}
async function setLens(v, p = page) {
  if ((await state(p)).lens !== v) await press('#lensToggleBtn', p);
}
/** Record every primitive of the next frame (the page calls sc.<primitive> by name at draw time). */
async function primitives(p = page) {
  return p.evaluate(async () => {
    const sc = window.TRV.solids[0],
      seen = [],
      names = ['surface', 'tube', 'line', 'circle', 'arrow', 'bead', 'ring', 'fan', 'poly', 'glass'],
      saved = {};
    for (const n of names) {
      saved[n] = sc[n];
      sc[n] = (...a) => {
        const style = n === 'circle' || n === 'glass' ? a[3] : n === 'line' || n === 'bead' || n === 'ring' || n === 'fan' ? a[1] : a[2];
        const key = n === 'surface' || n === 'tube' || n === 'poly' || n === 'glass' ? a[0] : (style && style.key) || n;
        const s = style || {};
        seen.push({ n, key: String(key).replace('~', ''), pts: n === 'tube' ? a[1] : n === 'line' || n === 'fan' ? a[0] : n === 'bead' || n === 'ring' ? [a[0]] : n === 'arrow' ? [a[0], a[1]] : n === 'poly' ? a[1].vertices : n === 'circle' ? [a[0], a[1], [a[2]]] : n === 'glass' ? [a[1], [a[2]]] : n === 'surface' ? [[0, 0], [Math.PI / 2, 0], [Math.PI / 2, Math.PI / 2], [Math.PI / 2, 1], [1, 2]].map(([u, v]) => a[1](u, v)) : null, alpha: typeof s.alpha === 'number' ? s.alpha : 1, dash: !!s.dash, colors: [s.color, s.fill, s.edges, ...(s.colors || [])].filter((c) => typeof c === 'string') });
        return saved[n](...a);
      };
    }
    window.TRV.kit.flush();
    for (const n of names) sc[n] = saved[n];
    const P = window.TRV.palette;
    return { seen, palette: { amber: P.amber, ok: P.ok, warn: P.warn, cyan: P.cyan, magenta: P.magenta, violet: P.violet, ink: P.ink, stage: P.stage } };
  });
}
/** The share of the stage that is opaque and violet: the ball itself, without the cyan, magenta and amber bodies. */
const violetShare = (p = page) =>
  p.evaluate(() => {
    const sc = window.TRV.solids[0],
      gl = sc.el.querySelector('canvas.solid-gl') || sc.el.querySelector('canvas');
    window.TRV.kit.flush();
    const c = document.createElement('canvas');
    c.width = gl.width;
    c.height = gl.height;
    const x = c.getContext('2d', { willReadFrequently: true });
    x.drawImage(gl, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height).data;
    let n = 0,
      all = 0;
    for (let i = 0; i < d.length; i += 4 * 7) {
      all++;
      const [r, g, b, a] = [d[i], d[i + 1], d[i + 2], d[i + 3]];
      if (a >= 250 && b > 24 && b > g * 1.08 && b > r * 1.04 && r >= g * 0.92) n++;
    }
    return n / all;
  });
const textOf = async (id, p = page) => (await p.locator('#' + id).textContent()).replace(/\s+/g, ' ').trim();
const tagText = (p = page) => p.locator('.stage .tags .tag:not([hidden])').allInnerTexts();
async function layout(p, label, figure = false) {
  const view = await stageView(p, '#stage', figure);
  const issues = [...view.layout, ...view.hud, ...(await labelOverlaps(p, '.stage .tag', 0)), ...(await capitalGreek(p))];
  check(label + ' framing and legible labels', !issues.length && (await overflowX(p)) === 0, JSON.stringify(issues));
}
/** The texts that follow the live regime: the HUD, the card note and the note of the tour bar. */
const regimeTexts = (p = page) =>
  p.evaluate(() => {
    const t = (s) => (document.querySelector(s) ? document.querySelector(s).textContent : '').replace(/\s+/g, ' ').trim();
    return { big: t('#hudBig'), sub: t('#hudSub'), note: t('#presetNote'), tour: t('#tour .tour-note'), legend: t('#legend') };
  });

/* ---------- the integer core of the page, against the one written here ---------- */
{
  const core = await page.evaluate(() => {
    const D = window.LEAN4_DEBUG,
      out = { normal: [], triad: [], kappa: [], jet: [], depth: [] },
      some = [];
    for (let w = -2; w <= 2; w++) for (let x = -2; x <= 2; x++) for (let y = -2; y <= 2; y++) for (let z = -2; z <= 2; z++) some.push([w, x, y, z]);
    for (const t of some) out.normal.push([t, D.core.normal(t)]);
    for (let i = 0; i < some.length; i += 37) for (let j = 5; j < some.length; j += 41) for (let k = 9; k < some.length; k += 113) out.triad.push([some[i], some[j], some[k], D.core.triad(some[i], some[j], some[k])]);
    for (let i = 0; i < some.length; i += 11) for (let j = 0; j < some.length; j += 17) out.kappa.push([some[i], some[j], D.core.kappa(some[i], some[j])]);
    for (let a = -9; a <= 9; a++) for (let b = 1; b <= 5; b++) out.jet.push([a, b, D.core.jet(a, b)]);
    for (let c = 1; c <= 9; c++) for (let d = 1; d <= 4; d++) for (const [p, q] of [[1, 10], [1, 50], [1, 1000], [2, 3], [5, 1]]) out.depth.push([c, d, p, q, D.core.depth(c, d, p, q)]);
    return out;
  });
  const lead = (p) => p.find((v) => v !== 0);
  check('normalize: all 625 tuples with entries up to 2 give the canonical tuple, the gcd and the sign computed here; the zero tuple goes to (1, 0, 0, 0)', core.normal.length === 625 && core.normal.every(([t, n]) => same(n.p, canonN(t)) && n.g === gcdOf(t) && (n.g === 0 || n.s === Math.sign(lead(t)))), JSON.stringify(core.normal.filter(([t, n]) => !same(n.p, canonN(t))).slice(0, 3)));
  check('triad: a · b̄ · c through 4 × 4 matrices, normalized, on sampled triples', core.triad.length > 500 && core.triad.every(([a, b, c, t]) => same(t, triadN(a, b, c))));
  check('κ: the squared inner product over both squared norms in lowest terms, ⟨0, 1⟩ on the zero tuple', core.kappa.length > 500 && core.kappa.every(([a, b, k]) => eqN(kappaN(a, b), [BigInt(k.num), BigInt(k.den)]) && gcdN(BigInt(k.num), BigInt(k.den)) === 1n));
  check('the jet at 95 rational points is the power series of 1/(1 + x²) solved here', core.jet.length === 95 && core.jet.every(([a, b, j]) => jetN(fracN(BigInt(a), BigInt(b))).every((x, i) => eqN(x, [BigInt(j[i].num), BigInt(j[i].den)]))));
  check('rationalQuarterDepth is the least N with cq < dp·4^(N+1) on 180 budgets', core.depth.length === 180 && core.depth.every(([c, d, p, q, N]) => N === depthN(c, d, p, q)));
  const list = await page.evaluate(() => [window.LEAN4_DEBUG.conjuncts(), window.LEAN4_DEBUG.tasks(), window.LEAN4_DEBUG.census()]);
  check('the eight conjuncts are the listed laws, all true, and take the integer steps of the cost model written here', same(list[0].map((c) => c.law), CONJ_LAWS) && same(list[0].map((c) => c.ok), CONJ_TRUE) && CONJ_TRUE.every(Boolean) && same(list[0].map((c) => c.steps), CONJ_STEPS), JSON.stringify([list[0].map((c) => c.steps), CONJ_STEPS]));
  check('the four tasks hold and take the steps of the cost model', list[1].every((t) => t.ok === true) && same(list[1].map((t) => t.steps), TASK_STEPS), JSON.stringify([list[1], TASK_STEPS]));
  check('the census of the page is the one taken in Lean', same([list[2].omega, list[2].real, list[2].boom, list[2].lean, list[2].mathlib], [CENSUS.omega, CENSUS.real, CENSUS.boom, CENSUS.lean, CENSUS.mathlib]) && same(list[2].axioms, { omega: [], real: ['propext', 'Classical.choice', 'Quot.sound'], axiom: ['kappa_refl_bad'] }) && same(list[2].tendsto, [false, false, true, false]));
}

/* ---------- the page as it opens ---------- */
{
  const p = await T.open(BOOK, ID, '?lang=zh', { reducedMotion: 'reduce' });
  await settle(p);
  const s = await state(p);
  check('the pipeline card opens by default, parked on stage 4 of the OmegaMath route', s.preset === DEFAULT && s.scene === 'kernel' && s.route === 'omega' && s.kernel.k === 3 && s.kernel.f === 0 && !s.playing && s.clock === 3);
  await p.context().close();
}
check(
  'three-column lab shell, strips outside the stage, badges, tagline, fonts and evidence spans',
  await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const asides = [...document.querySelectorAll('.sec h2 .aside')].map((el) => el.textContent.trim());
    return (
      !!q('.app.lab > header.top .status #scenePill') &&
      !!q('.app.lab > header.top .status #keyPill') &&
      !!q('#rail #lensPanel .lens-toggle#lensToggleBtn') &&
      !!q('#rail #presets') &&
      !!q('#rail #camChips') &&
      !!q('main.center > #stage > .scan') &&
      !!q('#stage > #hudTl #hudBig') &&
      !!q('#stage > .hud-tr #stageAct') &&
      !!q('#stage > button.handle#stageHandle') &&
      !!q('main.center > #tour #lensMirror') &&
      !!q('main.center > .strip #plot') &&
      !!q('main.center > .strip #plotB') &&
      !q('#stage .strip') &&
      !q('#stage canvas#plot') &&
      q('aside.col.side#evidence').firstElementChild.id === 'infoBtn' &&
      ['#routeChips', '#stageChips', '#taskChips', '#rayChips', '#multChips', '#cRange', '#xRange', '#guardBtn', '#yRange', '#nRange', '#targetChips'].every((s) => !!q('#evidence > #ctlPanel ' + s)) &&
      !!q('#evidence > #readouts') &&
      !!q('#evidence > #basis') &&
      !!q('footer.rail .clock #now') &&
      ['§32.8', '5', 'NUM', 'trureturing'].every((x) => asides.includes(x)) &&
      [...document.querySelectorAll('.tagline > span')].every((el) => el.querySelector('em') && el.firstChild.nodeType === 3) &&
      !!q('link[href*="fonts.googleapis.com/css2?family=Chakra+Petch"]') &&
      [...document.querySelectorAll('#basis .lean')].every((el) => el.children.length === 2 && [...el.children].every((c) => c.tagName === 'SPAN')) &&
      document.querySelectorAll('#basis .lean.frozen, #basis .lean.open').length === 0 &&
      document.querySelectorAll('#basis .lean.argued').length === 1 &&
      document.querySelectorAll('#basis .lean.model').length === 1 &&
      document.querySelectorAll('#basis .lean.num').length === 1 &&
      document.querySelectorAll('#basis .lean:not(.argued):not(.model):not(.num)').length === 15 &&
      document.querySelectorAll('#drawerEvidence .lean').length === 18 &&
      [...document.querySelectorAll('#drawer .sheet > div.zh, #drawer .sheet > div.en')].every((el) => el.querySelector('p.lede') && el.querySelectorAll('ol li b').length === 6 && el.querySelector('p.lede.refs a')) &&
      document.querySelectorAll('[id]').length === new Set([...document.querySelectorAll('[id]')].map((e) => e.id)).size
    );
  })
);
check(
  'the lens names, the route, stage, task, ray, multiple and target chips in both languages',
  await page.evaluate(() => {
    const seg = (c, l) => document.querySelector(`#lensToggleBtn .seg.${c} .${l}`).textContent;
    const of = (sel, key) => [...document.querySelectorAll(sel)].map((b) => b.dataset[key]);
    return (
      seg('off', 'zh') === '标准 Init · 有理算例' &&
      seg('off', 'en') === 'Rational examples with standard Init' &&
      seg('on', 'zh') === '传统实无穷与自定义公理对照（MODEL）· 计算阻断与滤子膨胀' &&
      seg('on', 'en') === 'Classical Continuum & Custom-Axiom Contrast (MODEL) · Blocked Evaluation & Filter Blowup' &&
      JSON.stringify(of('#routeChips [data-route]', 'route')) === JSON.stringify(['omega', 'real', 'axiom']) &&
      JSON.stringify(of('#stageChips [data-stage]', 'stage')) === JSON.stringify(['0', '1', '2', '3', '4']) &&
      JSON.stringify(of('#taskChips [data-task]', 'task')) === JSON.stringify(['0', '1', '2', '3']) &&
      JSON.stringify(of('#rayChips [data-ray]', 'ray')) === JSON.stringify(['half', 'past', 'inf', 'g']) &&
      JSON.stringify(of('#multChips [data-mult]', 'mult')) === JSON.stringify(['-4', '-3', '-2', '3', '4']) &&
      JSON.stringify(of('#targetChips [data-target]', 'target')) === JSON.stringify(['1/10', '1/50', '1/1000']) &&
      document.querySelector('#cRange').min === '1' && document.querySelector('#cRange').max === '8' &&
      document.querySelector('#nRange').min === '0' && document.querySelector('#nRange').max === '6' &&
      document.querySelector('#yRange').min === '-64' && document.querySelector('#yRange').max === '0'
    );
  })
);
check(
  'a card click starts a blend of the layers instead of a hard cut',
  await page.evaluate(() => {
    document.querySelector('[data-preset="rational-schur-and-shadow-functor-bridge"]').click();
    const s = window.LEAN4_DEBUG.state;
    return s.blending && s.layers.bridge < 1 && Object.entries(s.layers).some(([k, v]) => k !== 'bridge' && v > 0) && s.scene === 'bridge';
  })
);
await settle(page);
await until(page, () => !window.LEAN4_DEBUG.state.blending);
check('the blend ends on the layers of the card', (await state()).layers.bridge === 1 && Object.entries((await state()).layers).every(([k, v]) => k === 'bridge' || v === 0));
await pause();

/* ---------- the evidence and the drawer ---------- */
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  const refs = await page.locator('#drawer .refs a').evaluateAll((els) => els.filter((el) => getComputedStyle(el.parentElement).display !== 'none').map((el) => el.getAttribute('href')));
  check(lang + ' theory link', same(refs.filter((h) => h.startsWith('../../' + lang + '/')), ['../../' + lang + '/' + THEORY]) && refs.length === 2, JSON.stringify(refs));
  check(lang + ' cited declarations', same(await page.locator('#basis a[data-lean-gid]').evaluateAll((els) => els.map((el) => el.dataset.leanGid)), GIDS));
  const box = async (selector) => (await page.locator('#basis ' + selector + ' .' + lang).allTextContents()).join(' ').replace(/\s+/g, ' ');
  const model = await box('.lean.model'),
    argued = await box('.lean.argued'),
    drawer = (await page.locator('#drawer .sheet > div.' + lang).allTextContents()).join(' ').replace(/\s+/g, ' ');
  check(
    lang + ' MODEL box names the layers, the routes, the census of one proof per task and the drawing conventions',
    (lang === 'zh' ? ['三层架构', '证明即计算', '三条路线', '每项任务只取一份证明', '高度是 w/‖p‖', '轴测投影', '对径点', '外层壳、桥与椭球只示意', '不是 Lean 内核', '有限个元'] : ['three layers', 'proof as computation', 'one proof per task', 'height is w/‖p‖', 'axonometric projection', 'antipodes', 'outer shell, the bridge and the ellipsoid only indicate', 'not the Lean kernel', 'finitely many canonical elements']).every((x) => model.includes(x)),
    model.slice(0, 200)
  );
  check(
    lang + ' ARGUED box: the literature and the hand derivations',
    (lang === 'zh' ? ['文献结果，未在本书形式化', 'Coquand', 'Paulin-Mohring（1990）', 'de Moura 与 Ullrich（2021）', 'Carneiro（2019）', 'Hedberg（1998）', '欧拉（1748）', '手工推导', '在原始四元组上不成立'] : ['Literature results, not formalized in this book', 'Coquand and Paulin-Mohring (1990)', 'de Moura and Ullrich (2021)', 'Carneiro (2019)', 'Hedberg (1998)', 'Euler (1748)', 'Derived by hand', 'fail on raw tuples']).every((x) => argued.includes(x)) &&
      ['ℚP³ ≅ SO(3, ℚ)', 'κ = ⟨p, q⟩²/(‖p‖²‖q‖²)', 'Ad(p) ∈ SO(3, ℚ)', '‖a b* c‖² = ‖a‖²‖b‖²‖c‖² ≥ 1', 'CanonProjTernion', '(0, 0, 0, 0)', '(2, 0, 0, 0)', 'κ(p0, (b, a, 0, 0)) = 1/(1 + x²)', '1 + x₀² ≥ 1', '4/3 + (3/2)(y + 2/3)²'].every((x) => argued.includes(x)) &&
      (await page.locator('#basis .lean.argued a[data-lean-gid]').count()) === 0,
    argued.slice(-300)
  );
  check(
    lang + ' drawer states the five cards with the numbers of the script',
    ['= 0.5000', '= 1.0000', '= 0.0000', '= 0.2500', '≈ 1.3333', '70 < 2 · 4³ = 128', '(1/4)³ C ≤ 7/128 < 1/10', '≈ 0.0547', '(x, y, z) ↦ (x, −z, y)', 'g120 → (1, −1, −1, −1) → p0', '(1, 1, 1, 1) ≠ (1, 1, 1, −1)', '(1/2, −1/2, 1/4)', '⟨0, 1⟩ = ⟨1, 1⟩', lang === 'zh' ? 'omega_zero_axiom_master_check 列出 0 条公理' : '0 axioms for the finite theorem omega_zero_axiom_master_check', 'OmegaMath.Projective.Circle', lang === 'zh' ? 'OmegaShadowBridge.cayley_circle_unit 有 3 条' : 'OmegaShadowBridge.cayley_circle_unit has 3', CENSUS.real.join(' · '), CENSUS.omega.join(' · '), TASK_STEPS.join(' · '), 'MODEL'].every((x) => drawer.includes(x)) && (lang === 'zh' ? /不是证明/ : /not a proof/).test(drawer),
    drawer.slice(0, 300)
  );
}
// each green box as rendered: the frozen statement, its hypotheses and its conclusions, in both languages
{
  const rendered = await page.evaluate(() => [...document.querySelectorAll('#basis .lean:not(.argued):not(.model):not(.num)')].map((el) => ({ gid: el.querySelector('a[data-lean-gid]').dataset.leanGid, code: el.querySelector('a[data-lean-gid]').textContent, zh: el.querySelector('.zh').textContent.replace(/\s+/g, ' ').trim(), en: el.querySelector('.en').textContent.replace(/\s+/g, ' ').trim() })));
  check('as rendered the fifteen green boxes are the static ones: the script writes nothing into them', same(rendered.map((b) => [b.gid, b.zh, b.en]), GREEN.map((b) => [b.gid, b.zh.trim(), b.en.trim()])) && rendered.every((b) => b.gid.endsWith('.' + b.code)));
  const copies = await page.evaluate(() => [...document.querySelectorAll('#drawerEvidence .lean:not(.argued):not(.model):not(.num)')].map((el) => [el.querySelector('a[data-lean-gid]').dataset.leanGid, el.querySelector('.zh').textContent.replace(/\s+/g, ' ').trim(), el.querySelector('.en').textContent.replace(/\s+/g, ' ').trim()]));
  check('the drawer repeats the fifteen boxes in the same order and words', same(copies, rendered.map((b) => [b.gid, b.zh, b.en])));
  for (const [name, zh, en] of [
    ['exists_unitQuaternion_equiv', ['不交换', '链连通', '读数可任意接近 0', '特征秩为 5', '读取完备', '对每个 o ∈ M 存在双射 u', 'u(o) = 1', 'u(tri(x, y, z)) = u(x) u(y)⁻¹ u(z)', 'κ(x, y) = (1 + ⟨u(x), u(y)⟩)/2'], ['noncommutative', 'chain connected', 'readings come arbitrarily close to 0', 'feature rank 5', 'reading complete', 'for every o ∈ M there is a bijection u', 'u(o) = 1', 'u(tri(x, y, z)) = u(x) u(y)⁻¹ u(z)', 'κ(x, y) = (1 + ⟨u(x), u(y)⟩)/2']],
    ['kappa_eq_one_sub_dist_sq', ['对一切单位四元数 a、b', 'κ(a, b) = 1 − dist(a, b)²/4'], ['for all unit quaternions a and b', 'κ(a, b) = 1 − dist(a, b)²/4']],
    ['tri_eq_mul_inv_mul', ['o ∈ M', 'x · y = tri(x, o, y)', 'tri(o, x, o)', '对一切 x、y、z ∈ M，tri(x, y, z) = x · y⁻¹ · z'], ['o ∈ M', 'x · y = tri(x, o, y)', 'tri(o, x, o)', 'For all x, y, z ∈ M, tri(x, y, z) = x · y⁻¹ · z']],
    ['rayKernel_eq_bornProbability_spinor', ['rayKernel(x, y) = (2κ(x, y) − 1)² + (2κ(x, yi) − 1)²', 'ψ(qi) = I ψ(q)', 'x i x* 的 k、j、i 分量', 'rayKernel(x, y) = |ψ(x)†ψ(y)|²', 'bornProbability(ψ(y)ψ(y)†, ψ(x)ψ(x)†)', 'Tr(ρP)'], ['rayKernel(x, y) = (2κ(x, y) − 1)² + (2κ(x, yi) − 1)²', 'ψ(qi) = I ψ(q)', 'the k, j, i components of x i x*', 'rayKernel(x, y) = |ψ(x)†ψ(y)|²', 'bornProbability(ψ(y)ψ(y)†, ψ(x)ψ(x)†)', 'Tr(ρP)']],
    ['normSq_and_chebyshev', ['对每个四元数序列', '当且仅当', 'xn+2 = xn+1 xn* xn+1', 'xn+1 = Un(c)·x1 − Un−1(c)·x0', 'n = 0 时约定 U−1 = 0', '⟨x0, xn⟩ = Tn(c)', 'c = ⟨x0, x1⟩', '第一、二类切比雪夫多项式'], ['for every sequence', 'if and only if', 'xn+2 = xn+1 xn* xn+1', 'xn+1 = Un(c)·x1 − Un−1(c)·x0', 'with U−1 = 0 at n = 0', '⟨x0, xn⟩ = Tn(c)', 'c = ⟨x0, x1⟩', 'Chebyshev polynomials of the first and second kinds']],
    ['lagrange_gram_identity', ['对任意类型 ι、有限集 s ⊂ ι 与 u、v : ι → ℝ', '(Σi∈s ui²)(Σi∈s vi²) − (Σi∈s uivi)² = ½ Σi∈s Σj∈s (uivj − ujvi)²'], ['for every type ι, finite set s ⊂ ι and u, v : ι → ℝ', '(Σi∈s ui²)(Σi∈s vi²) − (Σi∈s uivi)² = ½ Σi∈s Σj∈s (uivj − ujvi)²']],
    ['schur_quadratic_is_least', ['m、n 是有限指标集', 'A 是 m × m 复厄米矩阵', 'C 是 n × n 复正定矩阵', 'S = A − B C⁻¹ BH', '对每个 x ∈ ℂm', 'x*S x', '{(x, y)* [A, B; BH, C] (x, y) : y ∈ ℂn}', 'IsLeast'], ['m and n be finite index sets', 'A an m × m complex Hermitian matrix', 'C an n × n complex positive definite matrix', 'S = A − B C⁻¹ BH', 'for every x ∈ ℂm', 'x*S x', '{(x, y)* [A, B; BH, C] (x, y) : y ∈ ℂn}', 'IsLeast']],
    ['existsUnique_linearIsometryEquiv_of_gram_preserving', ['E 是实内积空间', 'φ : ι → E 的像在 ℝ 上张成 E', 'σ 是 ι 的置换', '⟨φ(σ a), φ(σ b)⟩ = ⟨φ a, φ b⟩', '存在唯一的线性等距同构 U : E ≃ E', 'U(φ a) = φ(σ a)'], ['E be a real inner product space', 'whose range spans E over ℝ', 'σ a permutation of ι', '⟨φ(σ a), φ(σ b)⟩ = ⟨φ a, φ b⟩', 'exactly one linear isometric equivalence U : E ≃ E', 'U(φ a) = φ(σ a)']],
    ['rational_six_axis_open_cover', ['(1, 2, 0)、(1, −2, 0)、(0, 1, 2)、(0, 1, −2)、(2, 0, 1)、(−2, 0, 1)', '5 < 2⟨x, axisi⟩²', '每个 colori 是开集', '任意两点的内积不等于 0', '六个 colori 的并是整个球面'], ['(1, 2, 0), (1, −2, 0), (0, 1, 2), (0, 1, −2), (2, 0, 1), (−2, 0, 1)', '5 < 2⟨x, axisi⟩²', 'Every colori is open', 'have inner product ≠ 0', 'the union of the six colori is the whole sphere']],
    ['reduced_den', ['自然数 s、r', '0 < r', 'reduced s r = s/r 的分母等于 r / gcd(s, r)'], ['natural numbers s and r with 0 < r', 'reduced s r = s/r is r / gcd(s, r)']],
    ['convergents_length_log', ['对每个有理数 x', 'convergents x 的长度 ≤ 2 · Nat.log 2 (x 的分母) + 1', '以 2 为底取下整的对数'], ['for every rational x', 'convergents x has length ≤ 2 · Nat.log 2 (denominator of x) + 1', 'base 2 rounded down']],
    ['stripFactors_correct', ['G 是相等可判定的幺半群', '0 < m', 'xm = 1', 'm 的每个素因子都在 P 里', '0 < M、M ∣ m、xM = 1 且 M = orderOf x'], ['G be a monoid with decidable equality', '0 < m', 'xm = 1', 'every prime factor of m in P', '0 < M, M ∣ m, xM = 1 and M = orderOf x']],
    ['name_compare_run', ['对一切布尔列表 a、b、output、frame', '至多 2(|a| + |b|) + 4 步内停机', 'a、b 复原', '备份栈空', 'frame 不变', '压入 decide (a = b)'], ['for all Boolean lists a, b, output and frame', 'at most 2(|a| + |b|) + 4 steps', 'a and b are restored', 'the backups are empty', 'frame is unchanged', 'decide (a = b) is pushed']],
    ['rationalQuarterDepth_integer_sound', ['rationalQuarterDepth c d p q = Nat.log 4 ((c · q) / (d · p))', '自然数除法', '0 < d、0 < p 且 rationalQuarterDepth c d p q ≤ N', 'c · q < (d · p) · 4N+1'], ['rationalQuarterDepth c d p q = Nat.log 4 ((c · q) / (d · p))', 'the inner division in natural numbers', '0 < d, 0 < p and rationalQuarterDepth c d p q ≤ N', 'c · q < (d · p) · 4N+1']],
    ['rationalQuarterDepth_real_sound', ['0 < d、0 < p、0 < q、rationalQuarterDepth c d p q ≤ N', '实数 C ≤ c/d', '(1/4)N+1 · C < p/q'], ['0 < d, 0 < p, 0 < q and rationalQuarterDepth c d p q ≤ N', 'every real C ≤ c/d', '(1/4)N+1 · C < p/q']]
  ]) {
    const box = rendered.find((x) => x.code === name) || { zh: '', en: '' },
      missing = [...zh.filter((x) => !box.zh.includes(x)), ...en.filter((x) => !box.en.includes(x))];
    check(`${name}: the box states the theorem with its hypotheses and every conclusion in both languages`, !missing.length, missing.join(' | '));
  }
}

/* ---------- the NUM box and the drawer as rendered: every number against a value computed here ---------- */
const FRAME = { box: 2, mults: 6, sample: 8, reach: 5, dens: 30, lists: 4, budget: 8, x0: 8 };
/** What the box and the spans of the drawer must say for a frame, in a language. */
function expectedBench(lang, F, census = CENSUS) {
  const zh = lang === 'zh',
    list = (xs) => xs.join(zh ? '、' : ', '),
    none = zh ? '不符 0 处' : '0 failures',
    tuples = (2 * F.box + 1) ** 4 - 1,
    lines = (3 ** 4 - 1) / 2,
    dirs = (2 * F.reach + 1) ** 3 - 1;
  // the longest list of convergents: whole parts split off fractions until none is left
  let longest = 0;
  for (let r = 1; r <= F.dens; r++)
    for (let s = 0; s <= F.dens; s++) {
      let x = fracN(BigInt(s), BigInt(r)),
        n = 1;
      for (;;) {
        const rest = subN(x, intN(x[0] / x[1]));
        if (rest[0] === 0n) break;
        x = divN(ONE, rest);
        n++;
      }
      longest = Math.max(longest, n);
    }
  const pairs = range(F.lists + 1).reduce((s, n) => s + 2 ** n, 0) ** 2,
    most = 3 * F.lists + 4,
    total = CONJ_STEPS.reduce((s, n) => s + n, 0),
    spans = {
      master: `${total}`,
      axOmega: '0',
      axReal: '3',
      half: '= 0.5000',
      one: '= 1.0000',
      zero: '= 0.0000',
      quarter: '= 0.2500',
      schur: relFraction(SCHUR),
      depth: `= ${depthN(7, 2, 1, 10)}`,
      bound: relFraction([7n, 128n]),
      cenOmega: census.omega.join(' · '),
      cenReal: census.real.join(' · '),
      steps: TASK_STEPS.join(' · ')
    };
  const phrases = [
    zh ? `八条断言成立 8 条，步数 ${list(CONJ_STEPS)}，共 ${total} 步整数运算` : `Of the eight conjuncts 8 hold, in ${list(CONJ_STEPS)} steps, ${total} integer steps together`,
    zh ? 'κ 谱 1 = 1.0000、1/2 = 0.5000、0 = 0.0000、1/4 = 0.2500' : 'spectrum of κ 1 = 1.0000, 1/2 = 0.5000, 0 = 0.0000, 1/4 = 0.2500',
    zh ? `四项任务 ${list(TASK_STEPS)} 步` : `the four tasks take ${list(TASK_STEPS)} steps`,
    zh ? `normalize：${tuples} 个四元组的 ${F.mults} 种倍数归到同一本原代表，${none}` : `normalize: ${F.mults} multiples of ${tuples} tuples reach one primitive representative, ${none}`,
    zh ? `${lines} 个规范元上六条律（${lines ** 2} 对，${F.sample ** 5} 个五元组）与模方乘性${none}，Ad(p) 的正交与行列式${none}，格拉姆—拉格朗日恒等式（${lines ** 2} 对）${none}` : `on ${lines} canonical elements the six laws (${lines ** 2} pairs, ${F.sample ** 5} quintuples) and the multiplicative norm, ${none}; Ad(p) orthogonal with its determinant, ${none}; the Lagrange–Gram identity (${lines ** 2} pairs), ${none}`,
    zh ? 'Ad(g120) 把 e₁, e₂, e₃ 送到 e₂, e₃, e₁' : 'Ad(g120) sends e₁, e₂, e₃ to e₂, e₃, e₁',
    zh ? '边界反例：κ(z₀, z₀) = ⟨0, 1⟩，triad p0 p0 z₂ = (1, 0, 0, 0)' : 'Raw counterexamples: κ(z₀, z₀) = ⟨0, 1⟩, triad p0 p0 z₂ = (1, 0, 0, 0)',
    zh ? `赫维茨单位 24 个：576 对上 κ 与 1 − 弦长²/4 ${none}，射线核与旋量内积模方${none}；512 个三元组的群分解${none}；堆序列到 n = 6 与切比雪夫公式${none}` : `The 24 Hurwitz units: on 576 pairs κ vs 1 − chord²/4, ${none}; ray kernel vs squared spinor product, ${none}; the group on 512 triples, ${none}; the heap up to n = 6 vs the Chebyshev formulas, ${none}`,
    zh ? `65 个 y 上最小值 ${bothN(SCHUR)}，在 y = ${strN(VERTEX)} 取到` : `over 65 values of y is ${bothN(SCHUR)}, attained at y = ${strN(VERTEX)}`,
    zh ? `六轴：${dirs} 个整方向未被覆盖 0 个` : `Six axes: of ${dirs} integer directions 0 are not covered`,
    zh ? `分母 ≤ ${F.dens} 的 ${F.dens * (F.dens + 1)} 个分数：既约分母${none}，收敛子列表最长 ${longest}，长度界${none}` : `${F.dens * (F.dens + 1)} fractions with denominators ≤ ${F.dens}: reduced denominators, ${none}; longest list of convergents ${longest}, length bound, ${none}`,
    zh ? 'g120：M = 3、pHalf：M = 4、pInf：M = 2' : 'g120: M = 3, pHalf: M = 4, pInf: M = 2',
    zh ? `比较机：${pairs} 对列表最多 ${most} 步，${none}` : `The comparison machine: ${pairs} pairs of lists, at most ${most} steps, ${none}`,
    zh ? `深度：${F.budget ** 4} 组的整数不等式${none}，可再减小的 0 组；rationalQuarterDepth 7 2 1 10 = ${depthN(7, 2, 1, 10)}，70 < 128，7/128 ${relFraction([7n, 128n], 6)}` : `Depth: the integer inequality for ${F.budget ** 4} budgets, ${none}, 0 with a smaller depth; rationalQuarterDepth 7 2 1 10 = ${depthN(7, 2, 1, 10)}, 70 < 128, 7/128 ${relFraction([7n, 128n], 6)}`,
    zh ? `射流：${2 * F.x0 + 1} 个 x₀ 上逆元乘回${none}` : `Jets: inverse times base at ${2 * F.x0 + 1} points x₀, ${none}`,
    zh ? `Lean 实测（${census.lean}，Mathlib ${census.mathlib}，本页不重算）` : `Measured in Lean (${census.lean}, Mathlib ${census.mathlib}; not recomputed here)`,
    zh ? `OmegaMath ${list(census.omega)} 个、公理 ∅，Mathlib.Real ${list(census.real)} 个、公理 {propext, Classical.choice, Quot.sound}，其中只有 T3 用到 Filter.Tendsto` : `${list(census.omega)} for OmegaMath, axioms ∅, and ${list(census.real)} for Mathlib.Real, axioms {propext, Classical.choice, Quot.sound}, Filter.Tendsto only in T3`,
    zh ? `由 kappa_refl_bad 推出 False 的证明 ${census.boom} 个` : `the proof of False from kappa_refl_bad has ${census.boom}`,
    zh ? 'decide 在 (1 : ℝ) + 1 = 2 上停在 Classical.choice' : 'decide stops at Classical.choice on (1 : ℝ) + 1 = 2',
    zh ? '#eval (1 + 1 : ℝ) 只打印柯西列，1/2 : ℝ 是 noncomputable' : '#eval (1 + 1 : ℝ) prints a Cauchy sequence, 1/2 : ℝ is noncomputable',
    zh ? 'Rat.inv 依赖 propext 与 Quot.sound' : 'Rat.inv on propext and Quot.sound',
    zh ? 'integer_sound 与 real_sound 的所钉声明行缺少官方公理测量' : 'integer_sound and real_sound omit the official axiom measurement',
    zh ? '不检验定理的前提' : 'it does not check their hypotheses',
    zh ? '数值演示，不是证明。' : 'A numerical illustration, not a proof.'
  ];
  return { spans, phrases };
}
/** The audit of a page: the box, its copy and the spans against the numbers computed here; [] or what is wrong. */
async function auditBench(p, frame, census) {
  const seen = await p.evaluate(() => {
    const flat = (sel) => document.querySelector(sel).textContent.replace(/\s+/g, ' ').trim();
    return {
      box: Object.fromEntries(['zh', 'en'].map((l) => [l, flat('#basis .lean.num .' + l)])),
      copy: Object.fromEntries(['zh', 'en'].map((l) => [l, flat('#drawerEvidence .lean.num .' + l)])),
      spans: Object.fromEntries(['zh', 'en'].map((l) => [l, [...document.querySelectorAll(`#drawer .sheet > .${l} [data-bench]`)].map((e) => [e.dataset.bench, e.textContent.replace(/\s+/g, ' ')])]))
    };
  });
  const bad = [];
  if (!same(seen.box, seen.copy)) bad.push('the copy in the drawer');
  for (const lang of ['zh', 'en']) {
    const { spans, phrases } = expectedBench(lang, frame, census),
      text = seen.box[lang];
    bad.push(...phrases.filter((x) => text.split(x).length !== 2).map((x) => `${lang} box: ${x}`));
    if (/—(?!拉)|undefined|NaN|null|Infinity|∞/.test(text.replace('格拉姆—拉格朗日', '格拉姆拉格朗日'))) bad.push(`${lang} box: not filled`);
    if (!same(seen.spans[lang].map((x) => x[0]), Object.keys(spans))) bad.push(`${lang} spans: ${seen.spans[lang].map((x) => x[0]).join(' ')}`);
    for (const [key, s] of seen.spans[lang]) if (s !== spans[key]) bad.push(`${lang} drawer ${key}: ${s} (${spans[key]})`);
    bad.push(...mixed(text).map((x) => `${lang} chained: ${x}`));
  }
  return bad;
}
/** Open the page with the script replaced by a patched copy. */
async function patched(patches, query = '?lang=zh') {
  const p = await T.open(BOOK, ID, query, { reducedMotion: 'reduce' });
  await p.route(`**/${ID}/main.js*`, (route) => route.fulfill({ contentType: 'text/javascript; charset=utf-8', body: patches.reduce((js, [from, to]) => js.replace(from, to), sources['main.js']) }));
  await p.reload({ waitUntil: 'load' });
  await settle(p);
  return p;
}
const once = (patches) => patches.every(([from]) => sources['main.js'].split(from).length === 2);
{
  const bad = await auditBench(page, FRAME);
  check('NUM: the box in both languages, its copy and the spans of the drawer are the numbers computed here', !bad.length, bad.slice(0, 6).join(' | '));
}
{
  // the same sources with other samples and another census: every number of the box and of the drawer follows them
  const patches = [
      ['const FRAME = { box: 2, mults: [-3, -2, -1, 1, 2, 3], sample: 8, reach: 5, dens: 30, lists: 4, budget: 8, x0: 8 };', 'const FRAME = { box: 1, mults: [-5, 7], sample: 5, reach: 3, dens: 13, lists: 3, budget: 5, x0: 6 };'],
      ['omega: [396, 372, 379, 380],', 'omega: [401, 402, 403, 404],'],
      ['real: [7480, 7144, 17786, 7395],', 'real: [8001, 8002, 8003, 8004],'],
      ['boom: 363,', 'boom: 360,']
    ],
    other = { ...CENSUS, omega: [401, 402, 403, 404], real: [8001, 8002, 8003, 8004], boom: 360 };
  const p = await patched(patches);
  const bad = await auditBench(p, { box: 1, mults: 2, sample: 5, reach: 3, dens: 13, lists: 3, budget: 5, x0: 6 }, other);
  check('NUM: served with other samples and another census the box and the drawer follow them (they are computed, not written)', once(patches) && !bad.length, bad.slice(0, 6).join(' | '));
  const follow = await p.evaluate(() => ['roTask', 'hudSub', 'roKey'].map((id) => document.getElementById(id).textContent));
  check('NUM: the readouts follow the census too', follow[0].includes('401 ↔ 8001'), JSON.stringify(follow));
  await p.context().close();
}
for (const [what, patches, reads] of [
  // wrong laws in the script: the box counts the failures and the readouts say what the script computes
  ['a sign that is never flipped', [['s = op(r[lead] > 0) ? 1 : -1;', 's = op(r[lead] > 0) ? 1 : 1;']], (t) => /归到同一本原代表，不符 [1-9]\d* 处/.test(t.box) && t.roTuple.includes('↦ (−1, −1, 0, 0)') === false && /成立 [0-7] 条/.test(t.box)],
  ['a wrong quaternion product', [['op(op(op(op(a[0] * b[3]) + op(a[1] * b[2])) - op(a[2] * b[1])) + op(a[3] * b[0]))', 'op(op(op(op(a[0] * b[3]) + op(a[1] * b[2])) + op(a[2] * b[1])) + op(a[3] * b[0]))']], (t) => /成立 [0-7] 条/.test(t.box) && /与模方乘性不符 [1-9]\d* 处/.test(t.box)],
  ['a κ without the square', [['const kappa = (a, b) => mkNorm(op(dotZ(a, b) * dotZ(a, b)), op(dotZ(a, a) * dotZ(b, b)));', 'const kappa = (a, b) => mkNorm(dotZ(a, b), op(dotZ(a, a) * dotZ(b, b)));']], (t) => /与模方乘性不符 [1-9]\d* 处/.test(t.box) && !t.box.includes(`共 ${CONJ_STEPS.reduce((x, n) => x + n, 0)} 步`)],
  ['a wrong inverse jet', [['qMul(i0, qSub(qMul(u1, u1), u2))];', 'qMul(i0, qSub(u2, qMul(u1, u1)))];']], (t) => /逆元乘回不符 [1-9]\d* 处/.test(t.box) && t.box.includes('成立 7 条') && !t.roJet.includes('(1/2, −1/2, 1/4)')],
  ['a wrong Schur sign', [['const schur = (A, B, C) => qSub(A,', 'const schur = (A, B, C) => qAdd(A,']], (t) => t.sub.includes('') && t.roSchur.includes('· 8/3') && !t.drawer.includes('≈ 1.3333')],
  ['a depth one too small', [['for (n = Math.floor(n); !op(n < 4); k++) n = Math.floor(op(n / 4));\n    return k;', 'for (n = Math.floor(n); !op(n < 4); k++) n = Math.floor(op(n / 4));\n    return Math.max(0, k - 1);']], (t) => /的整数不等式不符 [1-9]\d* 处/.test(t.box) && t.box.includes('rationalQuarterDepth 7 2 1 10 = 1')],
  ['a machine that forgets the lengths', [['equalSoFar = equalSoFar && x === y;', 'equalSoFar = equalSoFar && (x === y || x === null || y === null);']], (t) => /步，不符 [1-9]\d* 处/.test(t.box)],
  ['a wrong rotation matrix', [['[w * w + x * x - y * y - z * z, 2 * (x * y - w * z), 2 * (x * z + w * y)],', '[w * w + x * x - y * y - z * z, 2 * (x * y + w * z), 2 * (x * z + w * y)],']], (t) => /Ad\(p\) 的正交与行列式不符 [1-9]\d* 处/.test(t.box)]
]) {
  const p = await patched(patches);
  const t = await p.evaluate(() => Object.fromEntries([['box', '#basis .lean.num .zh'], ['drawer', '#drawer .sheet > .zh'], ['sub', '#hudSub'], ...['roTuple', 'roJet', 'roSchur', 'roDepth', 'roMaster'].map((x) => [x, '#' + x])].map(([k, s]) => [k, document.querySelector(s).textContent.replace(/\s+/g, ' ')])));
  check(`NUM: with ${what} in the script the box and the readouts say so`, once(patches) && reads(t), JSON.stringify([once(patches), t.box.slice(0, 1200), t.roTuple, t.roJet, t.roSchur]));
  await p.context().close();
}

/* ---------- the five cards in both languages ---------- */
const frameOf = (m) => ({ scene: m.scene, lens: m.lens, route: m.route, task: m.tasks.task, kernel: m.kernel, tasks: m.tasks, ray: m.ray, mult: m.mult, t: m.carrier.t, k: m.master.k, x0: readN(m.master.x0), guard: m.guard, y: readN(m.bridge.y), N: m.bridge.N, target: parseN(m.target) });
/** Every number of the page at its frame, against the mathematics above. */
function verifyMath(m, label) {
  const v = frameOf(m),
    p = RAYS[v.ray],
    raw = p.map((x) => x * v.mult + 0),
    left = 7n * v.target[1],
    right = 2n * v.target[0] * 4n ** BigInt(v.N + 1);
  check(
    label + ' the frame: tuple, reading, conjunct, jet, form, certificate and task are the ones computed here',
    same(m.carrier.second.raw, raw) &&
      same(m.carrier.second.p, canonN(raw)) &&
      m.carrier.second.g === gcdOf(raw) &&
      m.carrier.second.s === Math.sign(v.mult) &&
      same(m.carrier.first.p, p) &&
      m.carrier.norm === norm2N(p) &&
      eqN(readN(m.carrier.kappa), kappaN(P0, p)) &&
      m.carrier.turn.every((row, i) => row.every((n, j) => eqN(fracN(BigInt(n), BigInt(norm2N(p))), turnN(p)[i][j]))) &&
      m.master.law === CONJ_LAWS[v.k] &&
      m.master.ok === true &&
      m.master.steps === CONJ_STEPS[v.k] &&
      m.master.jet.every((x, i) => eqN(readN(x), jetN(v.x0)[i])) &&
      eqN(readN(m.master.base[0]), addN(ONE, mulN(v.x0, v.x0))) &&
      eqN(readN(m.bridge.value), formN(v.y)) &&
      eqN(readN(m.bridge.S), SCHUR) &&
      m.bridge.least === eqN(formN(v.y), SCHUR) &&
      BigInt(m.bridge.left) === left &&
      BigInt(m.bridge.right) === right &&
      m.bridge.ok === left < right &&
      m.bridge.depth === depthN(7, 2, Number(v.target[0]), Number(v.target[1])) &&
      (m.bridge.ok === v.N >= m.bridge.depth) &&
      eqN(readN(m.bridge.bound), fracN(7n, 2n * 4n ** BigInt(v.N + 1))) &&
      m.tasks.steps === TASK_STEPS[v.task] &&
      m.tasks.omega === CENSUS.omega[v.task] &&
      m.tasks.real === CENSUS.real[v.task],
    JSON.stringify([m.carrier, m.master, m.bridge, m.tasks])
  );
}
/** The words of the readouts at a frame, in full. */
function expectedReadouts(m) {
  const v = frameOf(m),
    p = RAYS[v.ray],
    raw = p.map((x) => x * v.mult + 0),
    jet = jetN(v.x0),
    bound = fracN(7n, 2n * 4n ** BigInt(v.N + 1)),
    left = 7n * v.target[1],
    right = 2n * v.target[0] * 4n ** BigInt(v.N + 1);
  return {
    roRoute: '∅ · {propext, Classical.choice, Quot.sound} · {kappa_refl_bad}',
    roTuple: `${tupleN(raw)} ↦ ${tupleN(canonN(raw))} · ${gcdOf(raw)} · ${v.mult < 0 ? '−1' : '+1'} · ${norm2N(p)} · ${bothN(kappaN(P0, p))}`,
    roTurn: turnTextN(p),
    roMaster: `${v.k + 1}/8 · ${CONJ_LAWS[v.k]} · ${CONJ_STEPS[v.k]}`,
    roJet: `${strN(v.x0)} · (${jet.map(strN).join(', ')}) · ${jet.map((x) => relFraction(x)).join(' · ')}`,
    roSchur: `${strN(v.y)} · ${bothN(formN(v.y))} · ${strN(SCHUR)}`,
    roDepth: `N = ${v.N} · ${left} ${left < right ? '<' : '≥'} ${right} · ${strN(bound)} ${relFraction(bound, 6)}`,
    roTask: `T${v.task + 1} · ${CENSUS.omega[v.task]} ↔ ${CENSUS.real[v.task]} · ${TASK_STEPS[v.task]}`,
    cOut: `${v.k + 1}/8`,
    xOut: `= ${strN(v.x0)}`,
    yOut: `= ${strN(v.y)}`,
    nOut: `= ${v.N}`
  };
}
async function verifyReadouts(p, label) {
  const m = await state(p),
    want = expectedReadouts(m),
    got = {};
  for (const k of Object.keys(want)) got[k] = await textOf(k, p);
  check(label + ' the readouts and the outputs of the sliders are the numbers computed here, exact after “=”, rounded after “≈”', same(got, want), JSON.stringify(Object.keys(want).filter((k) => got[k] !== want[k]).map((k) => [k, got[k], want[k]])));
}
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  for (const id of IDS) {
    check(lang + '/' + id + ' plays up to its still and parks', await pick(id));
    const m = await state(),
      c = CARDS[id],
      zh = lang === 'zh';
    check(lang + '/' + id + ' scene, view, rail, regime and the fresh dials', m.preset === id && m.scene === c.scene && m.cam === c.cam && m.max === c.max && m.regime === c.regime && m.route === 'omega' && m.tasks.task === 0 && m.ray === 'half' && m.mult === -3 && m.guard === true && m.bridge.N === 2 && m.target === '1/10' && same(m.master.x0, ['1', '1']), JSON.stringify([m.scene, m.cam, m.max, m.regime]));
    verifyMath(m, lang + '/' + id);
    await verifyReadouts(page, lang + '/' + id);
    await layout(page, lang + '/' + id);
    const t = await regimeTexts(),
      big = { kernel: 'QRat (Init) 4/5 · #print axioms', carrier: '(−3, −3, 0, 0) ↦ (1, 1, 0, 0)', master: '8/8 · true', bridge: 'S = 4/3', tasks: '396 ↔ 7480' }[m.scene],
      subs = {
        kernel: ['#print axioms omega_zero_axiom_master_check', zh ? '隐式导入标准 Init' : 'implicit standard Init'],
        carrier: ['(2, 2, 0, 0)', '(−3, −3, 0, 0)', 'pHalf = (1, 1, 0, 0)', '‖p‖² = 2', 'κ = 1/2 = 0.5000', '(x, y, z) ↦ (x, −z, y)'],
        master: ['Jet2Rat.kappaJetAt ⟨1, 1⟩ = ⟨1/2, −1/2, 1/4⟩', zh ? '归约到 true，175 步整数运算' : 'reduces to true in 175 integer steps', 'x₀ = 1', '1 + x₀² = 2 ≥ 1', '(1/2, −1/2, 1/4)', '(0, 0, 0, 0)', '(2, 0, 0, 0)'],
        bridge: ['y = −2/3', '2 + 2y + (3/2)y² = 4/3 = S', 'N = 2', 'cq = 70 < dp·4³ = 128', '(1/4)³ C ≤ 7/128 < 1/10'],
        tasks: ['{0, 1/2, 1}', '396', '7480', `${TASK_STEPS[0]}`, zh ? '公理 0 条' : '0 axioms', zh ? '公理 3 条' : '3 axioms', 'triad pHalf p0 qHalf', '(1, 1, 1, 1)']
      }[m.scene];
    check(lang + '/' + id + ' HUD title and line state the card', t.big.includes(big) && subs.every((x) => t.sub.includes(x)), JSON.stringify([t, subs.filter((x) => !t.sub.includes(x))]));
    const ax = zh ? '公理' : 'axioms',
      key = { kernel: [zh ? '八项算例 · ∅' : 'eight checks · ∅', `${ax} 3 · False`], carrier: ['(−3, −3, 0, 0) ↦ (1, 1, 0, 0)', '2·d² = 0.99998082'], master: ['8/8 · 379', '17786'], bridge: ['S = 4/3 ≈ 1.3333', '7/128 ≈ 0.054688'], tasks: ['396', '7480'] }[m.scene];
    check(lang + '/' + id + ' the key readout puts the zero-axiom stack beside the contrast', (await textOf('roKey')) === key.join(' ↔ '), await textOf('roKey'));
    check(lang + '/' + id + ' the rail label', (await textOf('tau')) === { kernel: '4/5', carrier: zh ? '规范元' : 'canonical', master: '8/8', bridge: 'y = −2/3', tasks: '5/5' }[m.scene], await textOf('tau'));
    const readings = await page.locator('#readouts output').allTextContents();
    check(lang + '/' + id + ' one key and eight readouts, all populated', readings.length === 9 && (await page.locator('#readouts dl.ro > div.key').count()) === 1 && readings.every((x) => x && !/NaN|undefined|∞|^—$/.test(x)), JSON.stringify(readings));
    check(lang + '/' + id + ' the note of the card panel and of the tour bar agree and are not empty', t.note.length > 10 && t.note === t.tour, JSON.stringify(t));
    // the solid: an opaque violet body over an eighth of the stage or more, with light and shade
    const px = await solidPixels(page),
      violet = await violetShare();
    check(lang + '/' + id + ' the violet ball: opaque over ≥ 12% of the stage, shaded', px.share >= 0.12 && px.spread >= 0.04 && violet >= 0.12, JSON.stringify([px.share, px.spread, violet]));
  }
}
check('the registered stills are written on the cards', same(await page.$$eval('#presets [data-preset]', (els) => els.map((e) => Number(e.dataset.still))), IDS.map((id) => CARDS[id].still)));

/* ---------- the rails and the dials ---------- */
await setLang('en');
for (const [id, values] of [
  [KERNEL, [0, 1, 2, 3, 3.5, 4]],
  [CARRIER, [0, 0.5, 1, 1.5, 2, 3]],
  [MASTER, [0, 1, 2, 3, 4, 5, 6, 7]],
  [BRIDGE, [0, 8, 24, 32, 33, 64]],
  [TASKS, [0, 2, 2.5, 4]]
]) {
  await pick(id);
  for (const t of values) {
    await seek(t);
    const m = await state();
    check(`${id}: rail ${t}`, near(m.clock, t, 1e-12) && !m.playing && m.scene === CARDS[id].scene && near(m.at[m.scene], t, 1e-12));
    verifyMath(m, `${id} rail ${t}`);
    await verifyReadouts(page, `${id} rail ${t}`);
    const box = await page.locator('#stageHandle').boundingBox(),
      at = await page.evaluate((x) => window.LEAN4_DEBUG.dragTarget(x), t);
    check(`${id}: the handle sits on the current point at ${t}`, !!box && Math.hypot(box.x + box.width / 2 - at.x, box.y + box.height / 2 - at.y) < 1.5);
  }
}
// rails that count keep whole numbers; a stage and a normalization may stop half way and close to a whole place snap to it
for (const [id, v, want] of [
  [MASTER, 4.4, 4],
  [BRIDGE, 31.7, 32],
  [KERNEL, 2.5, 2.5],
  [KERNEL, 2.985, 3],
  [KERNEL, 2.97, 2.97],
  [CARRIER, 1.5, 1.5],
  [CARRIER, 2.01, 2],
  [CARRIER, 2.03, 2.03],
  [TASKS, 0.6, 0.6]
]) {
  await pick(id);
  await page.evaluate(() => (document.querySelector('#now').step = 'any'));
  await seek(v);
  check(`${id}: the rail takes ${v} to ${want}`, near((await state()).clock, want, 1e-12), String((await state()).clock));
}
// the native arrow keys of the focused range always move it, from both ends and from every whole place
for (const id of IDS) {
  await pick(id);
  const max = (await state()).max;
  for (const [from, key, sign] of [[0, 'ArrowRight', 1], [max, 'ArrowLeft', -1], [1, 'ArrowRight', 1], [1, 'ArrowLeft', -1], [2, 'ArrowLeft', -1]]) {
    await seek(from);
    await page.locator('#now').focus();
    await page.keyboard.press(key);
    await settle(page);
    const now = (await state()).clock;
    check(`${id}: ${key} on the focused rail moves it from ${from}`, (now - from) * sign > 1e-6, String(now));
  }
}
{
  await pick(KERNEL);
  await seek(1.5);
  const m = await state(),
    t = await regimeTexts();
  check('between two stages the HUD says so and no stage chip is pressed', m.regime === 'moving' && m.kernel.k === 1 && near(m.kernel.f, 0.5, 1e-12) && t.big.includes('QRat (Init) 2 → 3') && t.sub.includes('from stage 2 to stage 3') && (await textOf('tau')) === '2 → 3' && (await page.locator('#stageChips [aria-pressed="true"]').count()) === 0, JSON.stringify(t));
}
// the five stages of the three routes: what each does, and where it ends
for (const [route, end, texts] of [
  ['omega', 4, ['four integers', 'declares the OmegaSpace fields', `recomputes the examples in ${CONJ_STEPS.reduce((s, n) => s + n, 0)} integer steps`, '#print axioms omega_zero_axiom_master_check reports an empty list', '#eval runs natively']],
  ['real', 3, ['quotient of Cauchy sequences', 'typechecks', 'decide stops at Classical.choice', 'Official OmegaShadowBridge.cayley_circle_unit uses {propext, Classical.choice, Quot.sound}']],
  ['axiom', 2, ['axiom kappa_refl_bad is stated for all quadruples', 'The kernel accepts it', '⟨0, 1⟩ = ⟨1, 1⟩, hence False']]
]) {
  await pick(KERNEL);
  await press(`#routeChips [data-route="${route}"]`);
  check(`route ${route}: the rail ends at stage ${end + 1}, the chips beyond it are disabled`, (await state()).max === end && (await state()).route === route && (await page.$$eval('#stageChips [data-stage]', (els) => els.map((e) => e.disabled))).every((d, k) => d === k > end));
  for (let k = 0; k <= end; k++) {
    await press(`#stageChips [data-stage="${k}"]`);
    const m = await state(),
      t = await regimeTexts();
    check(`route ${route}, stage ${k + 1}: the HUD states what the stage does`, m.scene === 'kernel' && m.preset === null && m.kernel.k === k && m.regime === route + (k + 1) && t.sub.includes(texts[k]), t.sub);
    await layout(page, `route ${route}, stage ${k + 1}`);
  }
}
{
  await pick(KERNEL);
  const seen = [];
  for (const want of [4, 0 + 1, 2]) {
    await page.locator('#stageAct').evaluate((b) => b.click());
    await until(page, (k) => { const s = window.LEAN4_DEBUG.state; return !s.playing && s.kernel.f === 0 && s.kernel.k === k; }, want, 60000);
    await settle(page);
    seen.push((await state()).kernel.k);
  }
  check('the button on the stage goes one stage on, from the first again after the last, and the card stays marked', same(seen, [4, 1, 2]) && (await state()).preset === KERNEL, JSON.stringify(seen));
}
for (const ray of Object.keys(RAYS)) {
  await pick(CARRIER);
  await press(`#rayChips [data-ray="${ray}"]`);
  const m = await state(),
    t = await regimeTexts(),
    p = RAYS[ray];
  check(`ray ${RAY_NAME[ray]}: both raw tuples reach ${tupleN(p)}, with κ and an integer rotation`, m.ray === ray && m.preset === null && [`${RAY_NAME[ray]} = ${tupleN(p)}`, `‖p‖² = ${norm2N(p)}`, `κ = ${bothN(kappaN(P0, p))}`, `↦ ${turnTextN(p)}`].every((x) => t.sub.includes(x)) && turnN(p).flat().every((x) => x[1] === 1n), t.sub);
  verifyMath(m, `ray ${ray}`);
  await verifyReadouts(page, `ray ${ray}`);
  await layout(page, `ray ${ray}`);
  for (const mult of [-4, -3, -2, 3, 4]) {
    await press(`#multChips [data-mult="${mult}"]`);
    const u = await state();
    check(`ray ${RAY_NAME[ray]} × ${mult}: from the raw tuple at the start of the rail`, u.mult === mult && u.clock === 0 && u.regime === 'raw' && (await textOf('hudBig')).includes(tupleN(p.map((x) => x * mult + 0))));
    verifyMath(u, `ray ${ray} × ${mult}`);
  }
}
{
  await pick(CARRIER);
  await press('#stageAct');
  check('the button on the stage takes the next ray', (await state()).ray === 'past' && (await state()).preset === null);
}
for (const k of range(8)) {
  await input('#cRange', k + 1);
  const m = await state(),
    t = await regimeTexts();
  check(`conjunct ${k + 1}: the slider, the law, the steps and the detail on the HUD`, m.scene === 'master' && m.master.k === k && m.clock === k && m.preset === null && t.big.includes(`${k + 1}/8 · true`) && t.sub.includes(CONJ_LAWS[k]) && t.sub.includes(`${CONJ_STEPS[k]} integer steps`) && t.sub.includes(['κ = 1 = 1.0000', 'κ = 1/2 = 0.5000', 'κ = 0 = 0.0000', 'κ = 1/4 = 0.2500', '(1, 1, 1, 1) → (1, −1, −1, −1) → (1, 0, 0, 0)', 'triad pHalf pHalf g120 = (1, 1, 1, 1)', '(1, 1, 1, 1) ≠ (1, 1, 1, −1)', 'jet (1/2, −1/2, 1/4)'][k]), t.sub);
  await verifyReadouts(page, `conjunct ${k + 1}`);
  await layout(page, `conjunct ${k + 1}`);
}
for (const x of [-8, -3, 0, 2, 5, 8]) {
  await input('#xRange', x);
  const m = await state(),
    x0 = fracN(BigInt(x), 4n);
  check(`x₀ = ${strN(x0)}: the jet of 1/(1 + x²) in fractions, 1 + x₀² ≥ 1, on the last conjunct`, m.scene === 'master' && m.master.k === 7 && eqN(readN(m.master.x0), x0) && (await textOf('hudSub')).includes(`x₀ = ${strN(x0)}: 1 + x₀² = ${strN(addN(ONE, mulN(x0, x0)))} ≥ 1, jet (${jetN(x0).map(strN).join(', ')})`));
  verifyMath(m, `x₀ = ${strN(x0)}`);
  await verifyReadouts(page, `x₀ = ${strN(x0)}`);
  await layout(page, `x₀ = ${strN(x0)}`);
}
{
  await pick(MASTER);
  const on = await textOf('hudSub'),
    f1 = await primitives();
  await press('#guardBtn');
  const off = await textOf('hudSub'),
    f0 = await primitives(),
    end = (f, key) => f.seen.find((x) => x.key === key).pts[0];
  check('the guard: closed it stops (0, 0, 0, 0) and (2, 0, 0, 0); open it lets them through to p0 and the HUD names both broken laws', on.includes('Guard on') && off.includes('Guard off') && off.includes('κ(z₀, z₀) = ⟨0, 1⟩ ≠ ⟨1, 1⟩') && off.includes('triad p0 p0 z₂ = (1, 0, 0, 0) ≠ z₂') && (await state()).guard === false && (await page.getAttribute('#guardBtn', 'aria-pressed')) === 'false' && norm(sub(end(f0, 'z0'), [0, 0, 1])) < 0.2 && norm(sub(end(f1, 'z0'), [0, 0, 1])) > 1, JSON.stringify([on, off]));
  await layout(page, 'guard off');
  await press('#stageAct');
  check('the button on the stage closes the guard again', (await state()).guard === true && (await page.getAttribute('#guardBtn', 'aria-pressed')) === 'true');
}
for (const [y, N, target] of [
  [-64, 2, '1/10'],
  [0, 2, '1/10'],
  [-33, 0, '1/10'],
  [-31, 1, '1/10'],
  [-32, 3, '1/50'],
  [-32, 4, '1/1000'],
  [-32, 5, '1/1000'],
  [-12, 6, '1/10']
]) {
  await press(`#targetChips [data-target="${target}"]`);
  const depth = (await state()).bridge.N;
  check(`target ${target}: the chip sets N to rationalQuarterDepth`, depth === depthN(7, 2, 1, Number(target.split('/')[1])) && (await state()).bridge.ok === true);
  await input('#nRange', N);
  await input('#yRange', y);
  const m = await state(),
    q = fracN(BigInt(y), 48n),
    left = 7n * parseN(target)[1],
    right = 2n * 4n ** BigInt(N + 1),
    sub0 = await textOf('hudSub');
  check(`y = ${strN(q)}, N = ${N}, p/q = ${target}: the form against S, the certificate, the bridge`, m.scene === 'bridge' && m.preset === null && eqN(readN(m.bridge.y), q) && sub0.includes(`y = ${strN(q)}: 2 + 2y + (3/2)y² = ${strN(formN(q))} ${eqN(formN(q), SCHUR) ? '= S' : '≥ S = 4/3'}`) && sub0.includes(`cq = ${left} ${left < right ? '<' : '≥'} dp·4${supT(N + 1)} = ${right}`) && (left < right ? sub0.includes(`(1/4)${supT(N + 1)} C ≤ ${strN(fracN(7n, right))} < ${target}`) : sub0.includes('the bridge stays open')), sub0);
  const f = await primitives();
  check(`N = ${N}, p/q = ${target}: the amber bridge is drawn exactly when the integer certificate holds`, f.seen.some((x) => x.key === 'bridge') === left < right && f.seen.some((x) => x.key === 'real') === left < right);
  verifyMath(m, `y ${y} N ${N} ${target}`);
  await verifyReadouts(page, `y ${y} N ${N} ${target}`);
  await layout(page, `y ${y} N ${N} ${target}`);
}
{
  await press('#stageAct');
  check('the button on the stage goes back to the least value', (await state()).bridge.least === true && (await state()).regime === 'least');
}
for (const t of range(4)) {
  await press(`#taskChips [data-task="${t}"]`);
  const m = await state(),
    sub0 = await textOf('hudSub');
  check(`task ${t + 1}: the census, the axioms and the integer steps`, m.scene === 'tasks' && m.tasks.task === t && [`${CENSUS.omega[t]} declarations, 0 axioms, ${TASK_STEPS[t]} integer steps`, `Mathlib.Real ${CENSUS.real[t]}, 3 axioms`].every((x) => sub0.includes(x)) && (await textOf('hudBig')).includes(`${CENSUS.omega[t]} ↔ ${CENSUS.real[t]}`), sub0);
  await verifyReadouts(page, `task ${t + 1}`);
  for (const route of ['real', 'axiom', 'omega']) {
    await press(`#routeChips [data-route="${route}"]`);
    const u = await state(),
      f = await primitives(),
      amber = f.seen.filter((x) => x.n === 'poly' && x.colors.includes(f.palette.amber)).map((x) => x.key);
    check(`task ${t + 1} on ${route}: the amber prism is the present stage of the lane, fifteen prisms, the side trees only where a limit is taken`, u.scene === 'tasks' && u.tasks.route === route && same(amber, [`prism-${route}${u.tasks.k}`]) && f.seen.filter((x) => /^prism-/.test(x.key)).length === 15 && ((await tagText()).some((x) => /Filter\.Tendsto/.test(x)) === (t === 2)));
    await layout(page, `task ${t + 1} on ${route}`);
  }
}
{
  await pick(TASKS);
  const note = await textOf('roNote');
  check('the note of the readouts places the tasks on the three-step roadmap (MODEL)', ['MODEL', 'OmegaCore (T1, T2, T3)', 'Gram–Schur layer (T4)', 'one-way bridge Π into Mathlib'].every((x) => note.includes(x)), note);
  await pick(KERNEL);
  const boom = await textOf('roNote');
  check('the note of the pipeline gives the steps and the census of False', boom.includes(TASK_STEPS.join(', ')) && boom.includes(`reaches ${CENSUS.boom} declarations, axioms {kappa_refl_bad}`), boom);
  await pick(TASKS);
  await press('#stageAct');
  check('the button on the stage takes the next task', (await state()).tasks.task === 1 && (await state()).preset === null);
}

/* ---------- the drawing: heights are readings, rays and paths are where they are said to be ---------- */
{
  const R = 1.014;
  await pick(CARRIER);
  const f = await primitives(),
    at = (key) => f.seen.find((x) => x.key === key).pts[0];
  check(
    'the four stations lie on the sphere and the square of their height is κ(p0, p)',
    [['p0', P0], ['pHalf', PHALF], ['pInf', PINF], ['g120', G120]].every(([name, p]) => near(norm(at('st-' + name)), R, 1e-9) && near((at('st-' + name)[2] / R) ** 2, numN(kappaN(P0, p)), 1e-9))
  );
  const u = at('st-pHalf').map((x) => x / R);
  check('the eight integer points of the ray stand at 1 + 0.16·|k| on the line of pHalf, on both sides', [1, 2, 3, 4].every((k) => norm(sub(at('lattice' + k), u.map((x) => x * (1 + 0.16 * k)))) < 1e-9 && norm(sub(at('lattice' + -k), u.map((x) => -x * (1 + 0.16 * k)))) < 1e-9));
  check('the raw tuples (2, 2, 0, 0) and (−3, −3, 0, 0) are the points 2 and −3 of the ray; the amber point rests on the ball at pHalf', norm(sub(at('raw1'), at('lattice2'))) < 1e-9 && norm(sub(at('raw2'), at('lattice-3'))) < 1e-9 && norm(sub(at('current'), u.map((x) => x * R))) < 1e-9);
  const swing = f.seen.find((x) => x.key === 'swing').pts,
    slide = f.seen.find((x) => x.key === 'slide').pts;
  check('the division by the gcd runs along the ray from −3 to −1; the sign lock is half a great circle from −1 to +1 outside the ball', norm(sub(slide[0], at('lattice-3'))) < 1e-9 && norm(sub(slide.at(-1), at('lattice-1'))) < 1e-9 && norm(sub(swing[0], at('lattice-1'))) < 1e-9 && norm(sub(swing.at(-1), at('lattice1'))) < 1e-9 && swing.every((q) => near(norm(q), 1.16, 1e-9)) && swing.slice(5, -5).every((q) => q[1] < 0.3));
  const rings = f.seen.filter((x) => x.n === 'circle' && x.colors.includes(f.palette.cyan)).map((x) => [x.pts[0][2], x.pts[2][0]]);
  check('the two cyan circles are κ = 1/2 and κ = 1/4: the squares of their heights', same(rings.map(([h]) => Math.round(h * h * 1e9) / 1e9).sort(), [0.25, 0.5]) && rings.every(([h, r]) => near(h * h + (r / R) ** 2, 1, 1e-9)));
  const arrows = f.seen.filter((x) => x.n === 'arrow' && x.colors.includes(f.palette.cyan)),
    axes = f.seen.filter((x) => x.n === 'line' && x.colors.includes(f.palette.violet) && x.pts.length === 2).map((x) => sub(x.pts[1], x.pts[0]));
  // Ad(pHalf): e₁ ↦ e₁, e₂ ↦ e₃, e₃ ↦ −e₂, read off the arrows against the drawn axes
  const dirOf = (a) => sub(a.pts[1], a.pts[0]).map((x) => x / 0.8);
  check('the three cyan arrows are the images of the violet axes under Ad(p): x ↦ x, y ↦ z, z ↦ −y', arrows.length === 3 && axes.length === 3 && norm(sub(dirOf(arrows[0]), axes[0])) < 1e-9 && norm(sub(dirOf(arrows[1]), axes[2])) < 1e-9 && norm(sub(dirOf(arrows[2]), axes[1].map((x) => -x))) < 1e-9);
  await press('#rayChips [data-ray="g"]');
  const g = await primitives(),
    ga = g.seen.filter((x) => x.n === 'arrow' && x.colors.includes(g.palette.cyan)).map(dirOf),
    gx = g.seen.filter((x) => x.n === 'line' && x.colors.includes(g.palette.violet) && x.pts.length === 2).map((x) => sub(x.pts[1], x.pts[0]));
  check('for g120 the arrows are the 3-cycle x ↦ y ↦ z ↦ x', range(3).every((k) => norm(sub(ga[k], gx[(k + 1) % 3])) < 1e-9));
  await pick(MASTER);
  const s = await primitives(),
    path = s.seen.find((x) => x.key === 'beats').pts;
  check('the three beats run half a great circle from p0 to its antipode, with the stations at κ = 1/4, 1/4, 1', path.every((q) => near(norm(q), R, 1e-9)) && near(path[0][2], R, 1e-9) && near(path.at(-1)[2], -R, 1e-9) && near((path[20][2] / R) ** 2, 0.25, 1e-9) && near((path[40][2] / R) ** 2, 0.25, 1e-9));
  const fwd = s.seen.find((x) => x.key === 'fwd').pts,
    rev = s.seen.find((x) => x.key === 'rev').pts,
    key = (k) => s.seen.find((x) => x.key === k).pts[0];
  check('the two orders end in two points of the circle κ = 1/4: (1, 1, 1, 1) and (1, 1, 1, −1)', norm(sub(fwd.at(-1), key('st-g120'))) < 1e-9 && norm(sub(rev.at(-1), key('other'))) < 1e-9 && norm(sub(fwd.at(-1), rev.at(-1))) > 0.5 && [fwd, rev].every((q) => near((q.at(-1)[2] / R) ** 2, 0.25, 1e-9)) && norm(sub(fwd[0], key('st-pHalf'))) < 1e-9 && norm(sub(rev[0], key('qHalf'))) < 1e-9);
  check('eight plates over the ball: seven cyan, the present one amber', s.seen.filter((x) => /^plate\d$/.test(x.key)).length === 8 && s.seen.filter((x) => /^plate\d$/.test(x.key) && x.colors[0] === s.palette.cyan).length === 7 && s.seen.find((x) => x.key === 'plate7').colors[0] === s.palette.amber);
  await input('#xRange', -8);
  check('the bead of the jet on the ball is the line of (1, −2, 0, 0): its squared height is j₀ = 1/5', near(((await primitives()).seen.find((x) => x.key === 'jetBall').pts[0][2] / R) ** 2, 0.2, 1e-9));
  await pick(BRIDGE);
  const b = await primitives(),
    line = b.seen.find((x) => x.n === 'line' && x.pts.length === 2 && x.colors.includes(b.palette.ink) && near(x.pts[0][0], x.pts[1][0], 1e-12)),
    section = b.seen.find((x) => x.n === 'line' && x.dash && x.pts.length === 65 && x.colors.includes(b.palette.ink)).pts,
    right = Math.max(...section.map((q) => q[0])),
    cur = b.seen.find((x) => x.key === 'current').pts[0];
  check('the least section of the form touches the line x = 1, and the amber point sits on the line at the tangent point', near(right, line.pts[0][0], 2e-3) && right <= line.pts[0][0] + 1e-9 && near(cur[0], line.pts[0][0], 1e-12) && Math.abs(section.reduce((best, q) => (q[0] > best[0] ? q : best))[2] - cur[2]) < 0.03, JSON.stringify([right, line.pts[0], cur]));
  await input('#yRange', 0);
  const w = await primitives(),
    form = w.seen.find((x) => x.key === 'form').pts;
  const c0 = form[0].map((x, i) => (x + form[0][i]) / 2);
  check('away from the tangent point the ellipsoid grows and the amber point leaves the tangent', norm(sub(form[1], c0)) > norm(sub(b.seen.find((x) => x.key === 'form').pts[1], b.seen.find((x) => x.key === 'form').pts[0])) && Math.abs(w.seen.find((x) => x.key === 'current').pts[0][2] - cur[2]) > 0.1);
  const shell = b.seen.find((x) => x.key === 'shell');
  const tube = b.seen.find((x) => x.key === 'bridge').pts,
    cert = b.seen.find((x) => x.key === 'cert').pts[0];
  check('the bridge runs one way: from the ball outward along one direction to the shell outside', norm(tube[0]) < norm(tube.at(-1)) && near(norm(b.seen.find((x) => x.key === 'real').pts[0]), shell.pts[1][0], 1e-9) && norm(sub(cert.map((x) => x / norm(cert)), tube.at(-1).map((x) => x / norm(tube.at(-1))))) < 1e-9 && shell.pts[1][0] > 1.2 && b.seen.filter((x) => x.n === 'arrow' && x.colors.includes(b.palette.amber)).every((x) => norm(x.pts[1]) > norm(x.pts[0])));
  await pick(KERNEL);
  const k = await primitives(),
    prisms = (r) => k.seen.filter((x) => x.key.startsWith('prism-' + r));
  check('the pipeline: five prisms on the lane of OmegaMath, four on Mathlib.Real, three on axiom, a slab at the end of each of the last two, and the crystal False', prisms('omega').length === 5 && prisms('real').length === 4 && prisms('axiom').length === 3 && ['slab-real', 'slab-axiom', 'false'].every((x) => k.seen.some((y) => y.key === x)) && !k.seen.some((x) => x.key === 'slab-omega'));
  check('the cyan beam has reached stage 4, whose prism is amber; stage 5 waits in violet', prisms('omega')[3].colors[0] === k.palette.amber && prisms('omega').slice(0, 3).every((x) => x.colors[0] === k.palette.cyan) && prisms('omega')[4].colors[0] === k.palette.violet);
  check('no prism of the arch touches the ball', k.seen.filter((x) => x.n === 'poly' && /^prism-/.test(x.key)).every((x) => x.pts.every((q) => norm(q) > 1.03)));
}

/* ---------- every relation the page prints, in every area, over the cards, languages, lenses and layouts ---------- */
/** The values the page may write after a relation sign at a frame: [fraction or null, double]. */
function relationTable(v) {
  const q = (x) => [x, numN(x)],
    p = RAYS[v.ray],
    sp = spinorN(norm2N(p));
  return [
    ...[ONE, ZERO, HALF, [1n, 4n]].map(q),
    q(kappaN(P0, p)),
    ...jetN(v.x0).map(q),
    q(SCHUR),
    q(formN(v.y)),
    q(fracN(7n, 2n * 4n ** BigInt(v.N + 1))),
    q([7n, 128n]),
    ...(sp.root ? [] : [q(sp.rest), [null, 1 / Math.sqrt(norm2N(p))], q(sp.d)])
  ];
}
/** The relations found in a text: how many, and those that stand for no value of the frame. */
function relations(text, table) {
  const s = text.replace(/\s+/g, ' '),
    bad = [];
  let count = 0;
  for (const m of s.matchAll(new RegExp(`([=≈]) (${VALUE})(?!\\d|i| [+−] \\d)`, 'g'))) {
    count++;
    if (!table.some(([q, x]) => wrongRelation(m[1], m[2], q, x) === '')) bad.push(`${s.slice(Math.max(0, m.index - 24), m.index + m[0].length)} [no such value]`);
  }
  return { count, bad };
}
{
  const at = (over) => relationTable({ ray: 'half', x0: ONE, y: VERTEX, N: 2, ...over });
  const wrong = [
      ['κ = 0.5001', at({})],
      ['κ ≈ 0.5000', at({})],
      ['S = 1.3333', at({})],
      ['S ≈ 1.3334', at({})],
      ['7/128 = 0.0547', at({})],
      ['7/128 ≈ 0.0546', at({})],
      ['7/128 ≈ 0.054686', at({})],
      ['1/√2 = 0.7072', at({})],
      ['1/√2 ≈ 0.7072', at({})],
      ['2·d² ≈ 0.99998082', at({})],
      ['2·d² = 0.99998081', at({})],
      ['2·d² ≈ 1.0000', at({})],
      ['j₂ = 0.2501', at({})],
      ['j₁ = −0.5001', at({})],
      ['κ ≈ 0.3333', at({})]
    ].filter(([x, table]) => !relations(x, table).bad.length),
    right = [
      ['κ = 1/2 = 0.5000，Ad', at({})],
      ['S = 4/3 ≈ 1.3333', at({})],
      ['7/128 ≈ 0.054688 · 7/128 ≈ 0.0547', at({})],
      ['1/√2 ≈ 0.7071；2·d² = 0.99998082', at({})],
      ['· = 0.5000 · = −0.5000 · = 0.2500', at({})],
      ['d = 0.7071', at({})]
    ].filter(([x, table]) => relations(x, table).bad.length || !relations(x, table).count);
  check('the audit of relations finds fifteen wrong texts and leaves six right ones', !wrong.length && !right.length, JSON.stringify([wrong.map((x) => x[0]), right.map((x) => x[0])]));
}
/** Put a page through frames (each a list of [selector, value or null for a click]) in both languages and lenses, and read everything it writes. */
const readFrames = (p, frames) =>
  p.evaluate((frames) => {
    const text = (sel) => (document.querySelector(sel) || { textContent: '' }).textContent.replace(/\s+/g, ' ').trim(),
      out = [];
    for (const frame of frames) {
      for (const [sel, v] of frame) {
        const el = document.querySelector(sel);
        if (v === null) el.click();
        else {
          el.value = String(v);
          el.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
      for (const lang of ['en', 'zh']) {
        document.querySelector(`[data-lang-set="${lang}"]`).click();
        for (let lens = 0; lens < 2; lens++) {
          TRV.kit.flush();
          const s = window.LEAN4_DEBUG.state;
          out.push({
            lang,
            lens: s.lens,
            regime: s.regime,
            v: { ray: s.ray, x0: s.master.x0, y: s.bridge.y, N: s.bridge.N },
            texts: Object.fromEntries(['#keyPill', '#scenePill', '#hudBig', '#hudSub', '#presetNote', '#tour .tour-note', '#readouts', '#ctlPanel', '#tau', '#legend', '#formula', '#plotTitle', '#plotMeta', '#plotTitleB', '#plotMetaB'].map((x) => [x, text(x)])),
            tags: [...document.querySelectorAll('.stage .tags .tag:not([hidden])')].map((e) => e.textContent.replace(/\s+/g, ' ').trim())
          });
          document.getElementById('lensToggleBtn').click();
        }
      }
    }
    TRV.kit.flush();
    return out;
  }, frames);
/** The text of the areas, all of it (both languages, hidden blocks too), with ¶ between the blocks and the two languages. */
const areaTexts = (p = page, areas = ['#hudTl', '#readouts', '#basis', '#drawer', '#ctlPanel', 'header.top', 'footer.rail', '#tour', '#rail', '.strip']) =>
  p.evaluate((areas) => {
    TRV.kit.flush();
    return areas.map((sel) => {
      const el = document.querySelector(sel).cloneNode(true);
      for (const x of el.querySelectorAll('*'))
        if (!/^(?:A|B|CODE|EM|OUTPUT|STRONG|SUB|SUP)$/.test(x.tagName) && !(x.tagName === 'SPAN' && !/\b(?:zh|en|big|sub|aside|ok)\b/.test(x.className))) {
          x.prepend('¶');
          x.append('¶');
        }
      return [sel, el.textContent.replace(/\s+/g, ' ')];
    });
  }, areas);
const SWEEPS = {
  [KERNEL]: [...['omega', 'real', 'axiom'].flatMap((r) => range({ omega: 5, real: 4, axiom: 3 }[r]).map((k) => [[`#routeChips [data-route="${r}"]`, null], [`#stageChips [data-stage="${k}"]`, null]])), [['#routeChips [data-route="omega"]', null], ['#now', 1.5]]],
  [CARRIER]: [...Object.keys(RAYS).map((r) => [[`#rayChips [data-ray="${r}"]`, null]]), ...['half', 'g', 'inf'].flatMap((r) => [0, 0.5, 1.5, 2.5, 3].map((t) => [[`#rayChips [data-ray="${r}"]`, null], ['#now', t]])), ...[-4, 3].map((k) => [['#rayChips [data-ray="half"]', null], [`#multChips [data-mult="${k}"]`, null], ['#now', 3]])],
  [MASTER]: [...range(8).map((k) => [['#cRange', k + 1]]), ...[-8, -5, 0, 1, 7].map((x) => [['#xRange', x]]), [['#guardBtn', null], ['#cRange', 7]], [['#guardBtn', null], ['#cRange', 2]]],
  [BRIDGE]: [...[-64, -40, -33, -32, -10, 0].map((y) => [['#yRange', y]]), ...range(7).map((N) => [['#nRange', N]]), ...['1/10', '1/50', '1/1000'].map((t) => [[`#targetChips [data-target="${t}"]`, null]])],
  [TASKS]: range(4).flatMap((t) => [['omega', 4], ['real', 3], ['axiom', 2], ['omega', 2]].map(([r, k]) => [[`#taskChips [data-task="${t}"]`, null], [`#routeChips [data-route="${r}"]`, null], [`#stageChips [data-stage="${k}"]`, null]]))
};
for (const [where, query, viewport] of [
  ['desktop', '', { width: 1440, height: 900 }],
  ['phone', '', { width: 390, height: 844 }],
  ['figure', 'embed=1&', { width: 740, height: 500 }]
])
  for (const id of IDS) {
    const p = await T.open(BOOK, ID, `?${query}lang=zh&preset=${id}`, { viewport, reducedMotion: 'reduce' });
    await settle(p);
    const frames = await readFrames(p, SWEEPS[id]);
    const bad = [],
      beside = [],
      zeros = [];
    let count = 0;
    for (const f of frames) {
      const v = { ...f.v, x0: readN(f.v.x0), y: readN(f.v.y) },
        table = relationTable(v),
        at = `${f.lang}/lens ${f.lens}/${f.regime}`;
      for (const [sel, x] of [...Object.entries(f.texts), ...f.tags.map((t) => ['label', t])]) {
        const r = relations(x, table);
        count += r.count;
        bad.push(...r.bad.map((b) => `${at} ${sel}: ${b}`));
        beside.push(...mixed(x).map((b) => `${at} ${sel}: ${b}`));
        if (/NaN|undefined|Infinity|null/.test(x)) bad.push(`${at} ${sel}: ${x}`);
        if (/≈ −?0\.0+(?![\d×])|= −0\.0+(?!\d)|−0(?![.\d])/.test(x)) zeros.push(`${at} ${sel}: ${x}`);
      }
    }
    check(`${where}/${id}: in ${frames.length} frames every printed relation is “=” before a value of the frame itself or “≈” before its rounding (${count} relations)`, frames.length >= 44 && count >= 5 * frames.length && !bad.length, `${count} of ${frames.length}: ${[...new Set(bad)].slice(0, 5).join(' ¦ ')}`);
    check(`${where}/${id}: no rounding is printed as zero`, !zeros.length, zeros.slice(0, 3).join(' ¦ '));
    for (const [sel, x] of await areaTexts(p)) beside.push(...mixed(x).map((b) => `${sel}: ${b}`));
    check(`${where}/${id}: no rounded or decimal digits stand beside <, >, ≤ or ≥ in the HUD, the readouts, the evidence, the drawer, the notes, the labels, the rail and the strips, nothing exempt`, !beside.length, [...new Set(beside)].slice(0, 4).join(' ¦ '));
    await p.context().close();
  }

/* ---------- the stage-first contract on the five cards, in both languages, on a desktop and on a phone ---------- */
for (const lang of ['zh', 'en'])
  for (const [where, width, height, least] of [
    ['desktop', 1440, 900, 0.28],
    ['narrow desktop', 1081, 768, 0.18],
    ['phone', 390, 844, 0.4]
  ]) {
    const p = await T.open(BOOK, ID, '?lang=' + lang, { viewport: { width, height }, reducedMotion: 'reduce', locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
    await settle(p);
    for (const id of IDS) {
      await pick(id, p);
      await p.evaluate(() => scrollTo(0, 0));
      const view = await stageView(p, '#stage'),
        share = await viewportShare(p, '#stage'),
        labels = [...(await labelOverlaps(p, '.stage .tag', 0)), ...(await capitalGreek(p))],
        left = lang === 'en' ? await cjkLeftovers(p) : [],
        px = await solidPixels(p),
        violet = await violetShare(p),
        dom = await p.evaluate((cid) => {
          const b = document.querySelector(`[data-preset="${cid}"]`),
            top = (s) => document.querySelector(s).getBoundingClientRect().top,
            sizes = (s) => [...document.querySelectorAll(s)].filter((el) => el.getClientRects().length && el.scrollWidth > el.clientWidth + 1).map((el) => el.id || el.className);
          return { tourShown: document.querySelector('#tour').getClientRects().length > 0, pressed: b.getAttribute('aria-pressed'), note: document.querySelector('#presetNote').textContent.trim().length, tour: document.querySelector('#tour .what').textContent.trim().length, stage: top('#stage'), deck: top('#rail'), strip: top('.strip'), tourTop: top('#tour'), wide: sizes('#readouts dd, #readouts .note, #basis .lean, .field output, .pill, #tau, .ctl'), page: document.documentElement.scrollHeight };
        }, id);
      check(
        `stage first ${lang}/${where} ${width}×${height}/${id}: the stage holds its share, the regions and labels keep clear, the card is marked and explained`,
        share >= least && !view.layout.length && !view.hud.length && !labels.length && !left.length && (await overflowX(p)) <= 0 && dom.pressed === 'true' && dom.note > 10 && dom.tour > 10 && dom.stage < dom.strip && (width > 1080 ? !dom.tourShown : dom.tourShown && dom.stage < dom.tourTop && dom.tourTop < dom.strip && dom.stage < dom.deck) && !dom.wide.length,
        JSON.stringify({ share, view: [...view.layout, ...view.hud].slice(0, 3), labels: labels.slice(0, 3), left: left.slice(0, 3), dom })
      );
      check(`stage first ${lang}/${where}/${id}: the violet ball is opaque over ≥ 12% of the stage, lit and shaded`, px.share >= 0.12 && px.spread >= 0.04 && violet >= 0.12, JSON.stringify([px.share, px.spread, violet]));
      if (width === 390) check(`${lang}/390/${id}: the whole phone page stays under 7800 px (a full-page capture ends at 8192 px)`, dom.page < 7800, String(dom.page));
      const m = await state(p);
      check(`stage first ${lang}/${where}/${id}: the card rests on its still and its regime`, near(m.clock, CARDS[id].still, 1e-12) && m.regime === CARDS[id].regime && m.scene === CARDS[id].scene && !m.playing);
    }
    await p.context().close();
  }
{
  // on every card the light is fixed to the camera: turning the ball changes its light and shade
  for (const id of IDS) {
    await pick(id);
    const before = await solidPixels(page),
      cam = (await state()).camera;
    await page.evaluate(() => {
      TRV.solids[0].cam.yaw += 0.6;
      TRV.solids[0].cam.pitch += 0.5;
      TRV.kit.flush();
    });
    const after = await solidPixels(page);
    const dist = after.hist.reduce((s, h, k) => s + Math.abs(h - before.hist[k]), 0) / 2;
    check(`${id}: turning the camera changes light and shade and keeps ≥ 12% opaque`, dist >= 0.05 && after.share >= 0.12 && after.spread >= 0.04, JSON.stringify([dist, after.share, after.spread]));
    await page.evaluate((c) => {
      Object.assign(TRV.solids[0].cam, c);
      TRV.kit.flush();
    }, cam);
  }
}

/* ---------- the two lenses and the views ---------- */
await setLang('en');
check('desktop: the mirror lens button of the tour bar stays hidden', (await page.evaluate(() => innerWidth)) > 1080 && (await page.locator('#lensMirror').isHidden()));
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  const zh = lang === 'zh';
  for (const id of IDS) {
    await pick(id);
    const before = await state(),
      pill0 = await textOf('scenePill'),
      big0 = await textOf('hudBig'),
      sub0 = await textOf('hudSub'),
      f0 = await primitives();
    await press('#lensToggleBtn');
    const on = await state(),
      f1 = await primitives();
    const strength = (f, colour) => f.seen.filter((x) => ['tube', 'line', 'bead', 'fan', 'poly', 'ring', 'arrow'].includes(x.n) && x.colors.includes(f.palette[colour])).reduce((s, x) => s + x.alpha, 0);
    const want = {
      kernel: ['Classical.choice', '{propext, Classical.choice, Quot.sound}', 'noncomputable', 'kappa_refl_bad', '(0, 0, 0, 0)', 'False'],
      carrier: ['1/√2 ≈ 0.7071', '2·d² = 0.99998082', 'noncomputable', 'Quot.sound'],
      master: ['17786', '379', 'Classical.choice'],
      bridge: ['7395', '380', 'IsLeast', 'nlinarith'],
      tasks: ['7480', 'Classical.choice', zh ? '闭包里没有 Filter.Tendsto' : 'without Filter.Tendsto']
    }[on.scene];
    check(
      `${lang}/${id} the contrast lens renames the picture, says MODEL on the switch, the pill and the title, and keeps the state`,
      on.lens === 1 &&
        (await textOf('scenePill')) !== pill0 &&
        (await textOf('hudBig')) !== big0 &&
        (await textOf('hudSub')) !== sub0 &&
        /MODEL/.test(await textOf('hudBig')) &&
        /MODEL/.test(await textOf('scenePill')) &&
        /MODEL/.test(await page.locator('#lensToggleBtn .seg.on').innerText()) &&
        ['at', 'scene', 'preset', 'kernel', 'carrier', 'master', 'bridge', 'tasks', 'camera'].every((k) => same(on[k], before[k])) &&
        (await page.getAttribute('#lensToggleBtn', 'aria-pressed')) === 'true' &&
        (await page.getAttribute('#lensMirror', 'aria-pressed')) === 'true',
      JSON.stringify([await textOf('hudBig'), await textOf('hudSub')])
    );
    const sub1 = await textOf('hudSub');
    check(`${lang}/${id} the contrast lens writes its facts`, want.every((x) => sub1.includes(x)), JSON.stringify([sub1, want.filter((x) => !sub1.includes(x))]));
    check(`${lang}/${id} the contrast lens dims the zero-axiom cyan and never the magenta contrast`, strength(f1, 'cyan') < strength(f0, 'cyan') && strength(f1, 'magenta') >= strength(f0, 'magenta') - 1e-9, JSON.stringify([strength(f0, 'cyan'), strength(f1, 'cyan'), strength(f0, 'magenta'), strength(f1, 'magenta')]));
    const px = await solidPixels(page);
    check(`${lang}/${id} the violet ball stays opaque over ≥ 12% under the contrast lens`, px.share >= 0.12 && (await violetShare()) >= 0.12);
    await layout(page, `${lang}/${id} contrast lens`);
    await press('#lensToggleBtn');
    check(`${lang}/${id} the first lens is back`, (await state()).lens === 0 && (await textOf('hudSub')) === sub0);
  }
  await pick(CARRIER);
  await setLens(1);
  for (const ray of ['past', 'inf', 'g']) {
    await press(`#rayChips [data-ray="${ray}"]`);
    const text = await textOf('hudSub');
    check(`${lang}: on the ray of ${RAY_NAME[ray]} the norm is an integer and no root is written`, text.includes(`‖p‖ = ${spinorN(norm2N(RAYS[ray])).root}`) && !/≈/.test(text), text);
  }
  await setLens(0);
}
await pick(CARRIER);
const views = [];
for (const name of CAM_NAMES) {
  await press('[data-cam="' + name + '"]');
  check('selected view ' + name, (await state()).cam === name && (await page.getAttribute('[data-cam="' + name + '"]', 'aria-pressed')) === 'true');
  await until(page, () => !document.querySelector('#stage').hasAttribute('aria-busy'));
  views.push((await state()).camera);
  await layout(page, 'view ' + name);
}
check('the three views have distinct orientations', new Set(views.map((c) => [c.yaw, c.pitch].join('/'))).size === 3);
for (const id of IDS) {
  await pick(id);
  for (const name of CAM_NAMES) {
    await press('[data-cam="' + name + '"]');
    await layout(page, `${id} from ${name}`);
    check(`${id} from ${name}: the violet ball is opaque over ≥ 12%`, (await violetShare()) >= 0.12);
  }
}

/* ---------- the amber handle ---------- */
async function dragHandle(to) {
  const box = await page.locator('#stageHandle').boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move((box.x + box.width / 2 + to.x) / 2, (box.y + box.height / 2 + to.y) / 2, { steps: 4 });
  await page.mouse.move(to.x, to.y, { steps: 6 });
  await page.mouse.move(to.x, to.y);
  await page.mouse.up();
  await settle(page);
}
for (const [id, t] of [
  [KERNEL, 1],
  [CARRIER, 0],
  [MASTER, 2],
  [BRIDGE, 12],
  [TASKS, 2]
]) {
  await pick(id);
  const before = await state();
  await dragHandle(await page.evaluate((x) => window.LEAN4_DEBUG.dragTarget(x), t));
  const m = await state();
  check(`${id}: dragging the handle moves the rail to ${t}, leaves the camera alone and unmarks the card`, near(m.clock, t, RAILS_WHOLE.has(id) ? 1e-9 : 0.04) && same(m.camera, before.camera) && m.preset === null && !m.playing, String(m.clock));
}
for (const [id, keys] of [
  [KERNEL, [['ArrowRight', 4], ['ArrowLeft', 3], ['Home', 0], ['End', 4]]],
  [CARRIER, [['ArrowLeft', 2.5], ['Home', 0], ['ArrowUp', 0.5], ['End', 3]]],
  [MASTER, [['ArrowLeft', 6], ['Home', 0], ['ArrowUp', 1], ['End', 7]]],
  [BRIDGE, [['ArrowRight', 33], ['ArrowDown', 32], ['Home', 0], ['End', 64]]],
  [TASKS, [['ArrowLeft', 3], ['End', 4]]]
]) {
  await pick(id);
  await page.locator('#stageHandle').focus();
  for (const [key, want] of keys) {
    await page.keyboard.press(key);
    await settle(page);
    check(`${id}: ${key} on the handle goes to ${want}`, near((await state()).clock, want, 1e-12), String((await state()).clock));
  }
}

/* ---------- playback ---------- */
await pick(CARRIER);
for (const id of IDS) {
  const at = await playsAfter(page, () => page.locator(`[data-preset="${id}"]`).evaluate((b) => b.click()), () => ({ playing: window.LEAN4_DEBUG.state.playing, t: window.LEAN4_DEBUG.state.clock }));
  check(`${id}: a click on the card plays it`, at);
  check(`${id}: it parks on its still`, await until(page, ([c, s]) => { const m = window.LEAN4_DEBUG.state; return !m.playing && m.preset === c && Math.abs(m.clock - s) < 1e-12; }, [id, CARDS[id].still], 150000));
  await settle(page);
}
{
  await pick(BRIDGE);
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
  await page.keyboard.press(' ');
  check('Space plays on from the still', await until(page, () => window.LEAN4_DEBUG.state.playing && window.LEAN4_DEBUG.state.clock > 32));
  await page.keyboard.press(' ');
  check('a pause rests on a whole step of y', await until(page, () => { const m = window.LEAN4_DEBUG.state; return !m.playing && Number.isInteger(m.clock); }));
  await press('#rew');
  check('⏮ goes back to y = −4/3', (await state()).clock === 0 && same((await state()).bridge.y, ['-4', '3']));
}

/* ---------- colours ---------- */
for (const id of IDS) {
  await pick(id);
  const { seen, palette: P } = await primitives();
  const of = (key) => seen.filter((x) => x.key === key).flatMap((x) => x.colors);
  const amber = { kernel: ['current', 'prism-omega3'], carrier: ['current'], master: ['current', 'plate7'], bridge: ['arrow', 'bridge', 'current'], tasks: ['current', 'prism-omega4'] }[CARDS[id].scene];
  check(
    id + ' semantic stage colours: amber only on what is current, no green and no red, the ball violet',
    same([...new Set(seen.filter((x) => x.colors.includes(P.amber)).map((x) => x.key))].sort(), amber) && seen.filter((x) => x.key === 'current').length === 1 && seen.every((x) => !x.colors.includes(P.ok) && !x.colors.includes(P.warn)) && of('ball').includes(P.violet),
    JSON.stringify([...new Set(seen.filter((x) => x.colors.includes(P.amber)).map((x) => x.key))])
  );
  if (id === KERNEL) check('pipeline: the OmegaMath lane cyan, the two others and False magenta', of('lane-omega').includes(P.cyan) && ['lane-real', 'lane-axiom', 'false', 'slab-real', 'slab-axiom'].every((k) => of(k).includes(P.magenta)));
  if (id === CARRIER) check('carrier: rays, stations and arrows cyan, no magenta in the first lens', ['slide', 'swing', 'raw1', 'st-pHalf'].every((k) => of(k).includes(P.cyan)) && !seen.some((x) => x.colors.includes(P.magenta)));
  if (id === MASTER) check('conjuncts: the proven order cyan, the reversed order and the raw tuples magenta', ['fwd', 'beats', 'c1'].every((k) => of(k).includes(P.cyan)) && ['rev', 'other', 'z0', 'z2'].every((k) => of(k).includes(P.magenta)));
  if (id === BRIDGE) check('bridge: the form and the certificate cyan, the real shell magenta', of('form').includes(P.cyan) && of('cert').includes(P.cyan) && of('shell').includes(P.magenta) && of('real').includes(P.magenta));
}
{
  const bad = await page.evaluate(() => {
    const col = (v) => {
      const s = document.createElement('span');
      s.style.color = `var(${v})`;
      document.body.appendChild(s);
      const c = getComputedStyle(s).color;
      s.remove();
      return c;
    };
    const banned = [col('--amber'), col('--ok'), col('--warn')],
      bad = [];
    for (const el of document.querySelectorAll('#stage *, .strip *, #readouts *, .field output, .ctl *')) {
      if (el.closest('.handle') || el.matches('.hud-bl .sw.am') || el.closest('.tag.c-am')) continue; // the handle, the legend key and the label of what is current
      const cs = getComputedStyle(el);
      for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderLeftColor']) if (banned.includes(cs[prop])) bad.push(`${el.id || el.className || el.tagName} ${prop}`);
    }
    const amber = col('--amber');
    for (const el of document.querySelectorAll('#basis, #basis *')) if ([getComputedStyle(el).color, getComputedStyle(el).borderTopColor].includes(amber)) bad.push(`#basis ${el.className || el.tagName}`);
    return bad;
  });
  check('amber, green and red stay off the stage labels, the strips, the readouts, the dials and the evidence text', !bad.length, bad.slice(0, 3).join(' | '));
  check('sources name neither the warning colour nor an open box', !/P\.warn|--warn|c-wn|lean open/.test(Object.values(sources).join('\n')));
}

/* ---------- the two strips ---------- */
/** What the two plots draw on the next frame: lines, dots, bars and legend texts with their boxes. */
const stripFrame = (p = page) =>
  p.evaluate(() => {
    const kit = TRV.kit,
      plot = kit.plot,
      out = {},
      touched = [];
    kit.plot = (cv, o) => {
      const g = plot(cv, o),
        rec = { id: cv.id, w: cv.clientWidth, h: cv.clientHeight, y0: g.y0, y1: g.y1, lines: [], dots: [], bars: [], tops: [], texts: [], ticks: [] };
      out[cv.id] = rec;
      const line = g.line,
        dot = g.dot;
      g.line = (pts, color, s) => {
        const width = (s && s.width) || 1.6;
        rec.lines.push({ pts: pts.map((q) => [...q]), color, dash: !!(s && s.dash) });
        for (const q of pts) rec.tops.push(g.Y(q[1]) - width / 2);
        return line(pts, color, s);
      };
      g.dot = (x, y, color, r, s) => {
        rec.dots.push({ x, y, color });
        rec.tops.push(g.Y(y) - (r || 3.5));
        return dot(x, y, color, r, s);
      };
      g.ctx.fillRect = function (x, y, w, h) {
        rec.bars.push({ color: this.fillStyle, x: g.invX(x + w / 2), top: g.invY(y), foot: g.invY(y + h), alpha: this.globalAlpha });
        rec.tops.push(y);
        return CanvasRenderingContext2D.prototype.fillRect.call(this, x, y, w, h);
      };
      g.ctx.fillText = function (text, x, y, ...more) {
        const m = this.measureText(text);
        (/^10\.5px/.test(this.font) ? rec.texts : rec.ticks).push({ text, l: x - m.actualBoundingBoxLeft, r: x + m.actualBoundingBoxRight, t: y - m.actualBoundingBoxAscent, b: y + m.actualBoundingBoxDescent });
        return CanvasRenderingContext2D.prototype.fillText.call(this, text, x, y, ...more);
      };
      touched.push(g.ctx);
      return g;
    };
    try {
      kit.flush();
    } finally {
      kit.plot = plot;
      for (const c of touched) {
        delete c.fillText;
        delete c.fillRect;
      }
    }
    const { cyan, violet, magenta, amber } = TRV.palette;
    // canvas writes colours back in its own notation
    const c = document.createElement('canvas').getContext('2d'),
      norm = (x) => ((c.fillStyle = x), c.fillStyle);
    return { ...out, palette: { cyan, violet, magenta, amber }, canvas: { cyan: norm(cyan), magenta: norm(magenta) } };
  });
/** The legend rows sit in open headroom: the least distance (px) from the lowest legend ink, three pixels deeper for a
    platform font with a longer descent, to the topmost bar, curve, cursor or dot; and the share of head room above them. */
function legendChecks(label, f) {
  for (const id of ['plot', 'plotB']) {
    const r = f[id];
    if (!r) {
      check(`${label} #${id} is drawn`, false);
      continue;
    }
    const top = Math.min(...r.tops),
      bottom = Math.max(...r.texts.map((x) => x.b)) + 3,
      values = [...r.lines.flatMap((l) => l.pts.map((q) => q[1])), ...r.bars.flatMap((b) => [b.top, b.foot])],
      hi = Math.max(...values),
      lo = r.y0;
    check(
      `${label} #${id}: the legend clears every bar, curve, cursor and dot by ≥ 8 px with a deeper font descent, ≥ 35% of the plot is head room, and no legend or tick text is cut off`,
      r.texts.length >= 2 && r.h >= 118 && top - bottom >= 8 && (r.y1 - hi) / (r.y1 - lo) >= 0.35 && [...r.texts, ...r.ticks].every((x) => x.l >= -0.5 && x.r <= r.w + 0.5 && x.t >= -0.5),
      JSON.stringify({ gap: top - bottom, head: (r.y1 - hi) / (r.y1 - lo), h: r.h, w: r.w, cut: [...r.texts, ...r.ticks].filter((x) => !(x.l >= -0.5 && x.r <= r.w + 0.5 && x.t >= -0.5)) })
    );
  }
}
/** The two strips against the numbers of this suite. */
function stripValues(label, m, f) {
  const P = f.palette,
    bars = (color) => f.plot.bars.filter((b) => b.color === f.canvas[color]).sort((a, b) => a.x - b.x);
  const t = m.scene === 'master' ? (m.master.k < 5 ? 0 : m.master.k < 7 ? 1 : 2) : m.tasks.task;
  check(
    `${label} strip 1: four pairs of bars, the declarations of both stacks on a logarithmic axis, the integer steps as dots, the current task in full and under amber`,
    bars('cyan').length === 4 &&
      bars('magenta').length === 4 &&
      bars('cyan').every((b, k) => near(b.top, Math.log10(CENSUS.omega[k]), 1e-6) && near(b.foot, 1, 1e-6) && Math.abs(b.x - k) < 0.5) &&
      bars('magenta').every((b, k) => near(b.top, Math.log10(CENSUS.real[k]), 1e-6) && b.x > bars('cyan')[k].x) &&
      same(f.plot.dots.filter((d) => d.color === P.violet).map((d) => Math.round(10 ** d.y)), TASK_STEPS) &&
      bars('cyan').every((b, k) => (b.alpha === 1) === (k === t)) &&
      f.plot.lines.filter((l) => l.color === P.amber).every((l) => near((l.pts[0][0] + l.pts[1][0]) / 2, t, 1e-9)),
    JSON.stringify([f.plot.bars.map((b) => [b.color, b.x.toFixed(2), b.top]), t])
  );
  const goal = Math.log10(1 / Number(parseN(m.target)[1])),
    curve = f.plotB.lines.find((l) => l.color === P.cyan && l.pts.length === 7);
  check(
    `${label} strip 2: (7/2)/4^(N+1) for N = 0 … 6, the target dashed, the larger dots exactly from the certified depth on, amber at N`,
    curve.pts.every(([x, y], N) => x === N && near(y, Math.log10(numN(fracN(7n, 2n * 4n ** BigInt(N + 1)))), 1e-9)) &&
      f.plotB.lines.some((l) => l.color === P.magenta && l.dash && l.pts.every(([, y]) => near(y, goal, 1e-9))) &&
      f.plotB.lines.filter((l) => l.color === P.amber).every((l) => l.pts.every(([x]) => x === m.bridge.N)) &&
      curve.pts.every(([N, y]) => (y < goal) === (N >= depthN(7, 2, 1, Number(parseN(m.target)[1])))),
    JSON.stringify([goal, curve.pts])
  );
}
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  for (const id of IDS) {
    await pick(id);
    const f = await stripFrame();
    legendChecks(`${lang}/${id} desktop`, f);
    stripValues(`${lang}/${id}`, await state(), f);
  }
  for (const t of range(4)) {
    await press(`#taskChips [data-task="${t}"]`);
    const f = await stripFrame();
    legendChecks(`${lang} task ${t + 1}`, f);
    stripValues(`${lang} task ${t + 1}`, await state(), f);
  }
  for (const target of ['1/50', '1/1000', '1/10']) {
    await press(`#targetChips [data-target="${target}"]`);
    const f = await stripFrame();
    legendChecks(`${lang} target ${target}`, f);
    stripValues(`${lang} target ${target}`, await state(), f);
  }
}

/* ---------- narrow pages, the whole-lab embeds, cited figures and stills ---------- */
// a cited figure hides the deck, the evidence and the strips: its note names only the stage, the HUD and the tour bar
const HIDDEN_WORDS = /条带|小图|曲线|横轴|滑块|读数|左栏|右栏|旋钮|strip|plot|chart|curve\b|slider|readout|\bpanel|dial/i;
async function embedStrips(p, label, { firstScreen = false } = {}) {
  await p.evaluate(() => scrollTo(0, 0));
  await settle(p);
  const g = await p.evaluate(() => {
    const box = (s) => {
      const b = document.querySelector(s).getBoundingClientRect();
      return { l: b.left, r: b.right, t: b.top + scrollY, b: b.bottom + scrollY, h: b.height, w: b.width };
    };
    const all = (s) => [...document.querySelectorAll(s)].map((el) => {
      const b = el.getBoundingClientRect();
      return { l: b.left, r: b.right, t: b.top + scrollY, b: b.bottom + scrollY, h: b.height };
    });
    return { vh: innerHeight, stage: box('#stage'), tour: box('#tour'), strip: box('.strip'), rail: box('footer.rail'), plot: box('#plot'), plotB: box('#plotB'), panels: all('.strip .panel'), heads: all('.strip .panel .head'), embed: document.documentElement.hasAttribute('data-embed'), figure: document.documentElement.hasAttribute('data-figure') };
  });
  const inside = (a, b) => a.l >= b.l - 1 && a.r <= b.r + 1 && a.t >= b.t - 1 && a.b <= b.b + 1;
  const area = (a, b) => Math.max(0, Math.min(a.r, b.r) - Math.max(a.l, b.l)) * Math.max(0, Math.min(a.b, b.b) - Math.max(a.t, b.t));
  check(
    label + ': the strip holds #plot and #plotB whole, each ≥ 118 px tall under its heading, and ends above the rail',
    g.embed && !g.figure && g.plot.h >= 118 && g.plotB.h >= 118 && inside(g.plot, g.panels[0]) && inside(g.plotB, g.panels[1]) && g.panels.every((x) => inside(x, g.strip)) && area(g.panels[0], g.panels[1]) === 0 && g.plot.t >= g.heads[0].b - 1 && g.plotB.t >= g.heads[1].b - 1 && g.strip.b <= g.rail.t + 0.5 && g.stage.b <= g.tour.t + 0.5 && g.tour.b <= g.strip.t + 0.5,
    JSON.stringify(g)
  );
  if (firstScreen) check(label + ': the stage and the tour bar are on the first screen', g.stage.t >= 0 && g.tour.b <= g.vh + 0.5, JSON.stringify({ tour: g.tour, vh: g.vh }));
  legendChecks(label, await stripFrame(p));
}
async function mirrorLens(p, lang, label) {
  await p.evaluate(() => scrollTo(0, 0));
  const geo = await p.evaluate(() => {
    const box = (s) => {
      const b = document.querySelector(s).getBoundingClientRect();
      return { l: b.left, r: b.right, t: b.top, b: b.bottom };
    };
    const btn = document.querySelector('#lensMirror'),
      tour = document.querySelector('#tour'),
      note = document.querySelector('#tour .tour-note');
    return { btn: box('#lensMirror'), stage: box('#stage'), tour: box('#tour'), row: [box('#prevBtn'), box('#tour .what b'), box('#nextBtn'), ...(note && note.getClientRects().length ? [box('#tour .tour-note')] : [])], clipped: btn.scrollWidth > btn.clientWidth + 0.5, over: tour.scrollWidth > tour.clientWidth + 0.5, vw: innerWidth, vh: innerHeight, docW: document.documentElement.scrollWidth, text: btn.innerText.trim() };
  });
  const meet = (a, b) => a.l < b.r - 0.5 && b.l < a.r - 0.5 && a.t < b.b - 0.5 && b.t < a.b - 0.5;
  check(
    label + ': the mirror lens button fits the tour bar right under the stage, inside the first screen, no overlap and no overflow',
    (await p.locator('#lensMirror').isVisible()) && geo.btn.t >= geo.stage.b - 0.5 && geo.btn.b <= geo.vh && geo.btn.l >= geo.tour.l - 0.5 && geo.btn.r <= geo.tour.r + 0.5 && geo.row.every((b) => !meet(geo.btn, b)) && !geo.clipped && !geo.over && geo.docW <= geo.vw && geo.text === (lang === 'zh' ? '透镜' : 'LENS'),
    JSON.stringify(geo)
  );
  const before = await state(p),
    pressed = () => Promise.all(['#lensMirror', '#lensToggleBtn'].map((s) => p.getAttribute(s, 'aria-pressed')));
  await p.click('#lensMirror');
  await settle(p);
  const on = await state(p);
  check(label + ': the mirror button flips the lens, syncs both switches and keeps the experiment', before.lens === 0 && on.lens === 1 && same(await pressed(), ['true', 'true']) && ['at', 'scene', 'preset'].every((k) => same(on[k], before[k])));
  await layout(p, label + ' contrast lens from the mirror button');
  await p.locator('#lensToggleBtn').evaluate((b) => b.click());
  await settle(p);
  check(label + ': the rail switch flips it back and keeps the mirror in step', (await state(p)).lens === 0 && same(await pressed(), ['false', 'false']));
  await p.evaluate(() => scrollTo(0, 0));
}
for (const lang of ['zh', 'en']) {
  for (const [width, height, figure] of [
    [390, 844, false],
    [334, 500, true],
    [740, 500, true]
  ]) {
    colorScheme = width === 390 ? 'light' : 'dark';
    const p = await T.open(BOOK, ID, '?lang=' + lang + (figure ? '&embed=1&preset=' + DEFAULT : ''), { viewport: { width, height }, reducedMotion: 'reduce', locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
    await settle(p);
    const visited = new Set();
    for (let j = 0; j < IDS.length; j++) {
      const s = await state(p),
        id = s.preset;
      visited.add(id);
      check(`${lang}/${width}/${id} under reduced motion the card parks on its still`, near(s.clock, CARDS[id].still, 1e-12) && !s.playing && !s.blending && s.regime === CARDS[id].regime);
      await layout(p, `${lang}/${width}/${id}`, figure);
      const px = await solidPixels(p);
      check(`${lang}/${width}/${id} the violet ball is opaque over ≥ 12% of the stage`, px.share >= 0.12 && px.spread >= 0.04 && (await violetShare(p)) >= 0.12, JSON.stringify([px.share, await violetShare(p)]));
      if (lang === 'en') check('English ' + width + '/' + id, !(await cjkLeftovers(p)).length);
      if (!figure) {
        const fold = await p.evaluate(() => {
          scrollTo(0, 0);
          const b = (q) => document.querySelector(q).getBoundingClientRect();
          return { stage: b('#stage').bottom, stageH: b('#stage').height, tour: b('#tour').bottom, lens: b('#lensMirror').bottom, vh: innerHeight };
        });
        check(`${lang}/390×844/${id}: the stage (≥ 440 px) and the whole tour bar with its lens button end inside the first screen`, (await p.locator('#lensMirror').isVisible()) && fold.stageH >= 440 && fold.stage <= fold.vh && fold.tour <= fold.vh && fold.lens <= fold.vh, JSON.stringify(fold));
        legendChecks(`${lang}/390/${id}`, await stripFrame(p));
        // the fold also holds under the other lens
        await p.click('#lensMirror');
        await settle(p);
        const alt = await p.evaluate(() => [document.querySelector('#stage').getBoundingClientRect().bottom, document.querySelector('#tour').getBoundingClientRect().bottom, innerHeight]);
        check(`${lang}/390×844/${id}: the fold holds under the contrast lens`, alt[0] <= alt[2] && alt[1] <= alt[2], JSON.stringify(alt));
        await p.click('#lensMirror');
        await settle(p);
      } else {
        check(`${lang}/${width}/${id} a cited figure hides the strips, the deck and the evidence`, (await p.locator('.strip').isHidden()) && (await p.locator('#rail').isHidden()) && (await p.locator('#evidence').isHidden()) && (await p.locator('.tour .tour-note').isVisible()) && (await p.locator('#lensMirror').isHidden()));
        const note = await p.locator('.tour .tour-note').innerText();
        check(`${lang}/${width}/${id} the figure note names nothing the figure hides and has no sub- or superscripts`, note.length > 10 && !HIDDEN_WORDS.test(note) && (await p.locator('.tour .tour-note sub, .tour .tour-note sup').count()) === 0, note);
        const bar = await p.evaluate(() => {
          const n = document.querySelector('.tour .tour-note');
          return [n.scrollHeight, n.clientHeight];
        });
        check(`${lang}/${width}/${id} the figure note fits its two lines`, bar[0] <= bar[1] + 1, JSON.stringify(bar));
        const t = await regimeTexts(p),
          need = { kernel: ['4/5', 'omega_zero_axiom_master_check', 'Init'], carrier: ['(−3, −3, 0, 0) ↦ (1, 1, 0, 0)', 'κ = 1/2 = 0.5000'], master: ['8/8', '(1/2, −1/2, 1/4)'], bridge: ['S = 4/3', '70 < ', '128', '7/128 < 1/10'], tasks: ['396', '7480'] }[s.scene];
        check(`${lang}/${width}/${id} the HUD of the figure states the numbers of the caption`, need.every((x) => (t.big + ' ' + t.sub).includes(x)), JSON.stringify(t));
      }
      await p.locator('.tour [data-tour="next"]').click();
      await settle(p);
    }
    check(`${lang}/${width} ▶ visits all five cards`, visited.size === 5 && IDS.every((id) => visited.has(id)), JSON.stringify([...visited]));
    if (!figure) {
      await mirrorLens(p, lang, `${lang}/390`);
      // free play on a phone: the short note, still inside the first screen
      for (const [sel, v] of [
        ['#cRange', 1],
        ['#cRange', 5],
        ['#cRange', 7],
        ['#xRange', -8],
        ['#nRange', 0],
        ['#nRange', 6],
        ['#yRange', -64]
      ]) {
        await input(sel, v, p);
        const fold = await p.evaluate(() => {
          scrollTo(0, 0);
          return [document.querySelector('#tour').getBoundingClientRect().bottom, innerHeight];
        });
        check(`${lang}/390×844 free play ${sel} = ${v}: the tour bar stays inside the first screen`, fold[0] <= fold[1], JSON.stringify(fold));
        await layout(p, `${lang}/390 free play ${sel} = ${v}`);
      }
      for (const sel of ['#routeChips [data-route="real"]', '#stageChips [data-stage="3"]', '#routeChips [data-route="axiom"]', '#taskChips [data-task="2"]', '#rayChips [data-ray="g"]', '#rayChips [data-ray="inf"]', '#rayChips [data-ray="past"]', '#guardBtn', '#targetChips [data-target="1/1000"]']) {
        await press(sel, p);
        const fold = await p.evaluate(() => {
          scrollTo(0, 0);
          return [document.querySelector('#tour').getBoundingClientRect().bottom, innerHeight];
        });
        check(`${lang}/390×844 free play ${sel}: the tour bar stays inside the first screen`, fold[0] <= fold[1], JSON.stringify(fold));
        await layout(p, `${lang}/390 free play ${sel}`);
      }
      for (const yaw of [-PI / 2, PI / 2]) {
        await p.evaluate((y) => {
          TRV.kit.pause();
          TRV.solids[0].cam.yaw = y;
          TRV.kit.flush();
        }, yaw);
        await layout(p, `${lang} edge-on phone view ${yaw}`);
      }
    } else {
      // every state of a cited figure: the note follows the frame, fits its lines and still names only what is drawn
      for (const [id, values] of [
        [KERNEL, [0, 1, 2, 2.5, 4]],
        [CARRIER, [0, 1, 1.5, 2]],
        [MASTER, range(7)],
        [BRIDGE, [0, 64]],
        [TASKS, [0, 2, 3.5]]
      ])
        for (const v of values) {
          await pick(id, p);
          await input('#now', v, p);
          const t = await regimeTexts(p),
            bar = await p.evaluate(() => {
              const n = document.querySelector('.tour .tour-note');
              return [n.scrollHeight, n.clientHeight];
            });
          check(`${lang}/${width} figure ${id} at ${v}: the note is true to the frame, fits and names only what is drawn`, t.note === t.tour && t.tour.length > 10 && bar[0] <= bar[1] + 1 && !HIDDEN_WORDS.test(t.tour), JSON.stringify([t, bar]));
          await layout(p, `${lang}/${width} figure ${id} at ${v}`, true);
        }
      await pick(MASTER, p);
      await p.locator('#stageAct').click();
      await settle(p);
      check(`${lang}/${width} figure: the button on the stage opens the guard`, (await state(p)).guard === false);
      await layout(p, `${lang}/${width} figure with the guard open`, true);
      await pick(KERNEL, p);
      await p.locator('#stageAct').click();
      check(`${lang}/${width} figure: the button on the stage goes to stage 5`, await until(p, () => { const s = window.LEAN4_DEBUG.state; return !s.playing && s.kernel.k === 4 && s.kernel.f === 0; }, null, 60000));
      await settle(p);
      await layout(p, `${lang}/${width} figure after a step`, true);
      await pick(TASKS, p);
      for (let j = 0; j < 3; j++) {
        await p.locator('#stageAct').click();
        await settle(p);
        await layout(p, `${lang}/${width} figure task ${j + 2}`, true);
      }
      check(`${lang}/${width} figure: the button on the stage goes through the tasks`, (await state(p)).tasks.task === 3);
    }
    await p.context().close();
  }
  {
    // no sideways scrolling at any phone width, on any card, under either lens; the tour bar stays on the first screen
    const p = await T.open(BOOK, ID, '?lang=' + lang, { viewport: { width: 390, height: 844 }, reducedMotion: 'reduce', locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
    await settle(p);
    const wide = [];
    for (const id of IDS) {
      await pick(id, p);
      for (const lens of [0, 1]) {
        await setLens(lens, p);
        for (const width of [390, 360, 334, 320]) {
          await p.setViewportSize({ width, height: 844 });
          await settle(p);
          const over = await overflowX(p),
            fold = await p.evaluate(() => {
              scrollTo(0, 0);
              return [document.querySelector('#tour').getBoundingClientRect().bottom, innerHeight];
            });
          if (over > 0 || fold[0] > fold[1]) wide.push(`${id} lens ${lens} at ${width}: ${over}px, ${fold}`);
        }
      }
      await setLens(0, p);
    }
    check(`${lang}: at 390, 360, 334 and 320 px no card scrolls sideways and the tour bar ends on the first screen, under both lenses`, !wide.length, wide.slice(0, 4).join(' | '));
    await p.context().close();
  }
  colorScheme = 'dark';
  for (const [width, height] of [
    [390, 620],
    [740, 620],
    [1280, 760]
  ]) {
    const p = await T.open(BOOK, ID, '?embed=1&lang=' + lang, { viewport: { width, height }, reducedMotion: 'reduce', locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
    await settle(p);
    for (const id of IDS) {
      await pick(id, p);
      await embedStrips(p, `${lang}/embed ${width}×${height}/${id}`, { firstScreen: width >= 740 });
      check(`${lang}/embed ${width}×${height}/${id}: the violet ball is opaque over ≥ 12%`, (await solidPixels(p)).share >= 0.12 && (await violetShare(p)) >= 0.12, String(await violetShare(p)));
    }
    await pick(DEFAULT, p);
    await layout(p, `${lang}/embed ${width}×${height}`);
    await mirrorLens(p, lang, `${lang}/embed ${width}×${height}`);
    await p.context().close();
  }
  // a chapter embed that plays: each cited card starts at its beginning once it is in view and parks on its still
  for (const id of IDS) {
    const p = await T.open(BOOK, ID, `?embed=1&preset=${id}&lang=${lang}`, { viewport: { width: 740, height: 500 }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
    check(
      `${lang}/${id}: a cited figure plays and parks on its still`,
      await until(
        p,
        ([cid, still]) => {
          const s = window.LEAN4_DEBUG && window.LEAN4_DEBUG.state;
          return s && !s.playing && Math.abs(s.clock - still) < 1e-12 && s.preset === cid;
        },
        [id, CARDS[id].still],
        150000
      )
    );
    await p.context().close();
  }
  for (const id of IDS) {
    const p = await openStill(T, BOOK, ID, id, lang);
    const m = await state(p);
    verifyMath(m, `still ${lang}/${id}`);
    check(`still ${lang}/${id} parks on the declared frame, without handle, stage button and mirror button`, m.preset === id && m.regime === CARDS[id].regime && !m.playing && near(m.clock, CARDS[id].still, 1e-12) && near(Number(await p.getAttribute(`[data-preset="${id}"]`, 'data-still')), CARDS[id].still, 1e-12) && (await p.locator('#stageHandle').isHidden()) && (await p.locator('#stageAct').isHidden()) && (await p.locator('#lensMirror').isHidden()));
    const t = await regimeTexts(p),
      want = { kernel: ['4/5', 'omega_zero_axiom_master_check', 'Init'], carrier: ['‖p‖² = 2', 'κ = 1/2 = 0.5000'], master: ['8/8 · true', '(1/2, −1/2, 1/4)'], bridge: ['S = 4/3', '70 < dp·4³ = 128', '7/128 < 1/10'], tasks: ['396', '7480'] }[m.scene];
    check(`still ${lang}/${id} shows the numbers of its caption`, want.every((x) => (t.big + ' ' + t.sub).includes(x)), JSON.stringify(t));
    const px = await solidPixels(p);
    check(`still ${lang}/${id}: the violet ball is opaque over ≥ 12% of the frame`, px.share >= 0.12 && (await violetShare(p)) >= 0.12, JSON.stringify([px.share, await violetShare(p)]));
    const tags = (await tagText(p)).join(' | ');
    const labels = { kernel: ['z₀ → False', 'axiom', 'Mathlib.Real', 'propext', 'Classical.choice', 'Quot.sound', 'Filter.Tendsto', '4 #print axioms', '5 #eval', lang === 'zh' ? '八项算例 · ∅' : 'eight checks · ∅', 'κ(p0, pHalf) = 1/2'], carrier: ['(2, 2, 0, 0)', '(−3, −3, 0, 0)', 'pHalf = (1, 1, 0, 0)', 'κ = 1/2 = 0.5000', 'p0 · κ = 1 = 1.0000', 'pInf · κ = 0 = 0.0000', 'g120 · κ = 1/4 = 0.2500', 'Ad(p) = (x, −z, y)'], master: ['8/8 true', 'p0', 'pHalf', 'g120', 'pInf', '(1, 1, 1, −1)', 'z₀ = (0, 0, 0, 0)', 'z₂ = (2, 0, 0, 0)', 'x₀ = 1'], bridge: ['x = 1', 'S = 4/3 ≈ 1.3333', 'y = −2/3', '70 < 128', '7/128 < 1/10', 'Πℝ'], tasks: ['g120³ = p0', '396 ↔ 7480', 'False', 'Mathlib.Real', '5 #eval'] }[m.scene];
    check(`still ${lang}/${id} carries the labels its caption names`, labels.every((x) => tags.replace(/\s/g, '').toLowerCase().includes(x.replace(/\s/g, '').toLowerCase())), tags);
    const crossed = [...(await stageView(p, '#stage')).hud, ...(await labelOverlaps(p, '.stage .tag', 0)), ...(await capitalGreek(p))];
    check(`still ${lang}/${id}: the title, the legend and the labels keep clear of each other`, !crossed.length, JSON.stringify(crossed));
    await p.context().close();
  }
}
check('permanent dark console in both system schemes', !paletteMutations.length && paletteDocuments.every((x) => x.absent) && paletteDocuments.some((x) => x.dark) && paletteDocuments.some((x) => !x.dark));
check('zero console warnings', browserWarnings.length === 0, browserWarnings.slice(0, 3).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('zero browser or request errors', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));
await T.finish();
