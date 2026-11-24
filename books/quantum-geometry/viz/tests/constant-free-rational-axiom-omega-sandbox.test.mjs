import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, capitalGreek, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';
import { ROOT, resolveBook, vizCitations } from '../../../../tools/node/viz-common.mjs';

const BOOK = 'quantum-geometry';
const ID = 'constant-free-rational-axiom-omega-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const THEORY = 'ch39-s29-constant-free-rational-axiom-omega.html#sec-ch39-constant-free-rational-axiom-omega';
const PI = Math.PI;
const DEG = PI / 180;
const PHI = (1 + Math.sqrt(5)) / 2;
const KSTAR = (PHI + 1) / 4;
const KCONJ = (2 - PHI) / 4;
// the card, its scene and the rail value t ∈ [0, 1] it parks on (N = 3 + 45t, θ = πt, κ₁ = 1 − t, λ = t)
const CARDS = {
  'pi-polyhedral-crease-residual': { scene: 'pi', still: 3 / 45 },
  'euler-tangent-escape-vs-cayley': { scene: 'euler', still: 0.5 },
  'chebyshev-rational-arc-doubling': { scene: 'cheb', still: 0.75 },
  'tetrahedral-rational-cap-vs-phi': { scene: 'phi', still: 1 - KSTAR },
  'pure-axiom-omega-constant-free-sphere': { scene: 'pure', still: 1 }
};
const ORDER = Object.keys(CARDS);
const [PI_CARD, E_CARD, C_CARD, F_CARD, R_CARD] = ORDER;
const GIDS = [
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonCompletion.subgroupModel_readingComplete_iff',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonCompletion.exists_subgroupModel_not_readingComplete',
  'D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev',
  'D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula',
  'D5/S3/Quantum/Algebra/Comparison/RoundTripPeriodMetric.comparison_classification_of_continuous_rays',
  'D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint',
  'D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_bounds',
  'D5/S3/Quantum/AURICOmega/ExponentialTail.exp_remainder_le',
  'D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line',
  'D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique',
  'D5/S1/Scale/Fibonacci.fib_cassini_from_golden_norm',
  'D5/S1/Depth/GoldenHurwitzBound.golden_hurwitz_bound',
  'D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact'
];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const f4 = (v) => (Math.abs(v) < 5e-5 ? 0 : v).toFixed(4);

/* ---------- independent mathematics, written here and never calling the page ---------- */
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));
const sub = (a, b) => a.map((x, i) => x - b[i]);
const plus = (a, b) => a.map((x, i) => x + b[i]);
const scale = (a, k) => a.map((x) => x * k);
const unit = (a) => scale(a, 1 / norm(a));
const crossV = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
/** Quaternions as 4 × 4 real matrices of left multiplication: L(q) p = q p. */
const leftMatrix = ([w, x, y, z]) => [
  [w, -x, -y, -z],
  [x, w, -z, y],
  [y, z, w, -x],
  [z, -y, x, w]
];
const qm = (a, b) => leftMatrix(a).map((row) => dot(row, b));
const conj = ([w, x, y, z]) => [w, -x, -y, -z];
const kap = (x, y) => (1 + dot(x, y)) / 2;
/** The heap of the card from x₀ = 1 and κ₁: x₁ = cos θ + sin θ·i with cos θ = 2κ₁ − 1, then xₙ₊₂ = xₙ₊₁ x̄ₙ xₙ₊₁. */
function heapOf(k1, n = 24) {
  const th = Math.acos(2 * k1 - 1),
    xs = [
      [1, 0, 0, 0],
      [Math.cos(th), Math.sin(th), 0, 0]
    ];
  while (xs.length <= n) xs.push(unit(qm(qm(xs[xs.length - 1], conj(xs[xs.length - 2])), xs[xs.length - 1])));
  return { th, xs };
}
/** The geodesic dome of frequency ν: icosahedron from the golden rectangles, Class I subdivision, defects by atan2. */
function dome(nu, withRank = true) {
  const raw = [];
  for (const s of [-1, 1]) for (const t of [-1, 1]) raw.push([0, s, t * PHI], [s, t * PHI, 0], [t * PHI, 0, s]);
  const faces0 = [];
  for (let i = 0; i < 12; i++)
    for (let j = i + 1; j < 12; j++)
      for (let k = j + 1; k < 12; k++) {
        const d2 = (a, b) => dot(sub(raw[a], raw[b]), sub(raw[a], raw[b]));
        if (Math.abs(d2(i, j) - 4) < 1e-9 && Math.abs(d2(j, k) - 4) < 1e-9 && Math.abs(d2(i, k) - 4) < 1e-9) faces0.push([i, j, k]);
      }
  const V = [],
    index = new Map(),
    F = [];
  const vid = (p) => {
    const q = unit(p),
      key = q.map((x) => (Math.abs(x) < 5e-9 ? 0 : x).toFixed(7)).join(' ');
    if (!index.has(key)) {
      index.set(key, V.length);
      V.push(q);
    }
    return index.get(key);
  };
  for (const [a, b, c] of faces0) {
    const pt = (i, j) => [0, 1, 2].map((t) => raw[a][t] * i + raw[b][t] * j + raw[c][t] * (nu - i - j));
    for (let i = 0; i < nu; i++)
      for (let j = 0; i + j < nu; j++) {
        F.push([vid(pt(i, j)), vid(pt(i + 1, j)), vid(pt(i, j + 1))]);
        if (i + j + 1 < nu) F.push([vid(pt(i + 1, j)), vid(pt(i + 1, j + 1)), vid(pt(i, j + 1))]);
      }
  }
  const sum = new Array(V.length).fill(0);
  for (const f of F)
    for (let t = 0; t < 3; t++) {
      const p = V[f[t]],
        u = sub(V[f[(t + 1) % 3]], p),
        v = sub(V[f[(t + 2) % 3]], p);
      sum[f[t]] += Math.atan2(norm(crossV(u, v)), dot(u, v));
    }
  const defects = sum.map((s) => 2 * PI - s);
  const edges = new Map();
  for (const f of F)
    for (let t = 0; t < 3; t++) {
      const a = f[t],
        b = f[(t + 1) % 3],
        k = a < b ? `${a},${b}` : `${b},${a}`;
      if (!edges.has(k)) edges.set(k, edges.size);
    }
  // the rank over ℤ₂ of ∂ : faces → edges, with BigInt rows (one bit per face)
  const rows = Array.from({ length: withRank ? edges.size : 0 }, () => 0n);
  if (withRank) F.forEach((f, fi) => {
    for (let t = 0; t < 3; t++) {
      const a = f[t],
        b = f[(t + 1) % 3];
      rows[edges.get(a < b ? `${a},${b}` : `${b},${a}`)] ^= 1n << BigInt(fi);
    }
  });
  let rank = 0;
  const pivots = [];
  for (let r of withRank ? rows : []) {
    for (const [bit, row] of pivots) if ((r >> bit) & 1n) r ^= row;
    if (r !== 0n) {
      let bit = 0n;
      while (!((r >> bit) & 1n)) bit++;
      for (const pv of pivots) if ((pv[1] >> bit) & 1n) pv[1] ^= r;
      pivots.push([bit, r]);
      rank++;
    }
  }
  return { V: V.length, E: edges.size, F: F.length, defects, sum: defects.reduce((a, b) => a + b, 0), max: Math.max(...defects), rank };
}
const FIB = [0n, 1n];
while (FIB.length < 45) FIB.push(FIB[FIB.length - 1] + FIB[FIB.length - 2]);
const gcdN = (a, b) => {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b) [a, b] = [b, a % b];
  return a;
};
const fracN = (p, q) => {
  if (q < 0n) [p, q] = [-p, -q];
  const g = gcdN(p, q) || 1n;
  return [p / g, q / g];
};
/** The tail of the exponential by another route than the page: |e^{iθ} − Σ_{k<N} (iθ)^k/k!| = (θᴺ/N!)·|S| with S nested from the
    inside, S = 1 + (iθ/(N + 1))(1 + (iθ/(N + 2))(…)), and θᴺ/N! through logarithms; the bound is (θᴺ/N!)/(1 − θ/(N + 1)). */
function expTail(N, th) {
  if (th === 0) return { left: 0, right: 0 };
  let a = 1,
    b = 0;
  for (let j = 70; j >= 1; j--) [a, b] = [1 - (b * th) / (N + j), (a * th) / (N + j)];
  let log = N * Math.log(th);
  for (let k = 2; k <= N; k++) log -= Math.log(k);
  const lg = (x) => (log + Math.log(x)) / Math.LN10;
  return { left: Math.exp(log) * Math.hypot(a, b), right: Math.exp(log) / (1 - th / (N + 1)), lgLeft: lg(Math.hypot(a, b)), lgRight: lg(1 / (1 - th / (N + 1))) };
}
/** A number as the page writes it: 0.0205, −6.429×10⁻⁸, 0. */
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const NUMBER = `−?\\d+(?:\\.\\d+)?(?:×10⁻?[${SUP}]+)?`;
function parseNumber(t) {
  const [m, e] = t.trim().replace('−', '-').split('×10');
  return e === undefined ? Number(m) : Number(`${m}e${e.replace('⁻', '-').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (d) => SUP.indexOf(d))}`);
}
/** The decimal logarithm of a printed positive number (also of one too small for a double). */
function parseLog10(t) {
  const [m, e] = t.trim().split('×10');
  return Math.log10(Number(m)) + (e === undefined ? 0 : Number(e.replace('⁻', '-').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (d) => SUP.indexOf(d))));
}
/* Exact comparisons, on fractions [p, q] of integers: a double, a printed decimal, the difference of two. */
/** The double x itself, from its bits: ±m·2^(e − 1075). */
function doubleN(x) {
  const bits = new BigUint64Array(new Float64Array([x]).buffer)[0],
    e = Number((bits >> 52n) & 2047n),
    m = (bits & ((1n << 52n) - 1n)) + (e ? 1n << 52n : 0n),
    k = Math.max(e, 1) - 1075,
    n = bits >> 63n ? -m : m;
  return k < 0 ? [n, 1n << BigInt(-k)] : [n << BigInt(k), 1n];
}
/** The decimal a printed text names: 0.0205, −6.429×10⁻⁸. */
function decimalN(t) {
  const [, sign, whole, part = '', e = ''] = /^(−?)(\d+)(?:\.(\d+))?(?:×10(⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+))?$/.exec(t.trim()) || [],
    k = e.replace('⁻', '-').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (d) => SUP.indexOf(d)),
    n = BigInt(whole + part) * (sign ? -1n : 1n),
    x = Number(k) - part.length;
  return x < 0 ? [n, 10n ** BigInt(-x)] : [n * 10n ** BigInt(x), 1n];
}
const cmpN = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
const subN = ([a, b], [c, d]) => [a * d - c * b, b * d];
/** rᴺ/N!/(1 − r/(N + 1)) at the double r, exactly. */
function tailBoundN(N, r) {
  const [p, q] = doubleN(r),
    n = BigInt(N);
  let f = 1n;
  for (let k = 2n; k <= n; k++) f *= k;
  return [p ** n * (n + 1n) * q, q ** n * f * ((n + 1n) * q - p)];
}
/** Fractions [lower, upper] of the squared remainder |e^{ir} − Σ_{k<N} (ir)^k/k!|² = (rᴺ/N!)²·|S|², S = Σ_j (ir)^j·N!/(N + j)!, at the
    double 0 < r ≤ π. The real and the imaginary part of S alternate, with terms that decrease from the first on (r² ≤ π² < (N + 1)(N + 2)
    for N ≥ 3): cut after a positive term they are above their limits, after a negative one below them, and above 0. */
function remainderSquaredN(N, r, m = 9) {
  const [p, q] = doubleN(r),
    n = BigInt(N);
  let re = 1n,
    im = 0n,
    d = 1n,
    power = 1n,
    upper = null;
  for (let j = 1; j <= 4 * m + 3; j++) {
    const f = q * (n + BigInt(j));
    [re, im, d, power] = [re * f, im * f, d * f, power * p];
    // iʲ = 1, i, −1, −i
    if (j % 2) im += j % 4 === 1 ? power : -power;
    else re += j % 4 === 0 ? power : -power;
    if (j === 4 * m + 1) upper = [re * re + im * im, d * d];
  }
  let f = 1n;
  for (let k = 2n; k <= n; k++) f *= k;
  const [a, b] = [p ** n, q ** n * f],
    times = ([x, y]) => [a * a * x, b * b * y];
  return [times([re * re + im * im, d * d]), times(upper)];
}
const squareN = ([a, b]) => [a * a, b * b];
/** A fraction of any size as a double (40 decimals). */
const floatN = ([a, b]) => Number((a * 10n ** 40n) / b) / 1e40;
const plusN = ([a, b], [c, d]) => [a * d + c * b, b * d];
/** One unit of the last printed digit: 0.0205 → 10⁻⁴, 6.429×10⁻⁸ → 10⁻¹¹; k/n of it. */
function unitN(text, k = 1n, n = 1n) {
  const [m, e] = text.trim().replace('−', '').split('×10'),
    one = `0.${'0'.repeat(Math.max(0, (m.split('.')[1] || '').length - 1))}1`,
    [a, b] = decimalN((m.includes('.') ? one : '1') + (e === undefined ? '' : `×10${e}`));
  return [a * k, b * n];
}
/** Whether the digits are the rounding to the nearest of a value that lies in [low, high] (a part in 10⁶ of the half unit is left to
    the double that was rounded). */
function nearestN(text, [low, high]) {
  const x = decimalN(text),
    half = unitN(text, 1000001n, 2000000n);
  return cmpN(subN(x, half), low) <= 0 && cmpN(high, plusN(x, half)) <= 0;
}
/** A lower bound as printed: positive, not above the value, and within a unit and a hundredth of it. */
const floorsN = (text, [low, high]) => decimalN(text)[0] > 0n && cmpN(decimalN(text), low) <= 0 && cmpN(plusN(decimalN(text), unitN(text, 101n, 100n)), high) > 0;
/** The same of an upper bound. */
const ceilsN = (text, [low, high]) => cmpN(decimalN(text), high) >= 0 && cmpN(subN(decimalN(text), unitN(text, 101n, 100n)), low) < 0;
/** exp_remainder_le as printed at the double r: the remainder to the nearest, then the bound rᴺ/N!/(1 − r/(N + 1)) from above. */
function auditTail(N, r, text) {
  const m = new RegExp(`^≈ (${NUMBER})(?:，上界|, bound) ≤ (${NUMBER})$`).exec(text);
  if (!m) return 'text';
  const bound = tailBoundN(N, r),
    [low, high] = remainderSquaredN(N, r),
    left = decimalN(m[1]),
    half = unitN(m[1], 1000001n, 2000000n);
  if (!ceilsN(m[2], [bound, bound])) return 'the printed bound';
  if (cmpN(squareN(bound), high) < 0) return 'remainder above the bound';
  if (cmpN(left, decimalN(m[2])) > 0) return 'left > right';
  if (cmpN(subN(left, half), [0n, 1n]) <= 0 || cmpN(squareN(subN(left, half)), low) > 0 || cmpN(high, squareN(plusN(left, half))) > 0) return 'the printed remainder';
  return '';
}
/** √5 in integers, 60 digits: ROOT5/S60 ≤ √5 < (ROOT5 + 1)/S60. */
const S60 = 10n ** 60n;
let ROOT5 = 3n * S60; // from above, by Newton
for (let y = 0n; ; ROOT5 = y) {
  y = (ROOT5 + (5n * S60 * S60) / ROOT5) / 2n;
  if (y >= ROOT5) break;
}
/** Fractions [low, high] of the two sides of Hurwitz at q = F_{n+1}/Fₙ and of their difference, without Binet:
    |φ − q| = |F_{n+1} − φFₙ|/Fₙ = 1/(Fₙ(F_{n+1} + ψFₙ)), ψ = (√5 − 1)/2, from F_{n+1}² − F_{n+1}Fₙ − Fₙ² = ±1. */
function hurwitzN(n) {
  const F = FIB[n],
    side = (root) => [2n * S60, F * (2n * S60 * FIB[n + 1] + (root - S60) * F)],
    least = (root) => [S60, root * F * F + S60 * F],
    dist = [side(ROOT5 + 1n), side(ROOT5)],
    bound = [least(ROOT5 + 1n), least(ROOT5)];
  return { dist, bound, gap: [subN(dist[0], bound[1]), subN(dist[1], bound[0])] };
}
/** Hurwitz at the step n as printed: the exact inequality, its two sides to the nearest, the margin from below. */
function auditHurwitz(n, text) {
  const m = new RegExp(`\\|φ − (\\d+(?:/\\d+)?)\\| > 1/\\(√5·(\\d+)² \\+ (\\d+)\\)(?:（左 ≈ (${NUMBER})，右 ≈ (${NUMBER})，差 ≥ (${NUMBER}) > 0）| \\(left ≈ (${NUMBER}), right ≈ (${NUMBER}), margin ≥ (${NUMBER}) > 0\\))`).exec(text);
  if (!m) return 'text';
  const [q, d, e] = [m[1], m[2], m[3]],
    [left, right, margin] = m.slice(4).filter((x) => x !== undefined),
    { dist, bound, gap } = hurwitzN(n);
  if (q !== (FIB[n] === 1n ? `${FIB[n + 1]}` : `${FIB[n + 1]}/${FIB[n]}`) || BigInt(d) !== FIB[n] || BigInt(e) !== FIB[n]) return 'the fraction';
  if (!nearestN(left, dist)) return 'left';
  if (!nearestN(right, bound)) return 'right';
  if (!floorsN(margin, gap)) return 'margin';
  return '';
}
/** π to 60 digits in integers (16 atan(1/5) − 4 atan(1/239)): (PI60 − 10)/S60 < π < (PI60 + 10)/S60. */
const PI60 = (() => {
  const atan = (n) => {
    let term = (S60 * 10n ** 10n) / n,
      sum = term;
    for (let k = 1n; term !== 0n; k++) {
      term /= n * n;
      sum += (k % 2n ? -1n : 1n) * (term / (2n * k + 1n));
    }
    return sum;
  };
  return (16n * atan(5n) - 4n * atan(239n)) / 10n ** 10n;
})();
/** Fractions [low, high] of N(s²/2 − s⁴/24), N(1 − cos s) and N·s²/2 at s = π/N; 1 − cos s by its alternating series. Each of the
    three grows with s on (0, π/3], so π from below gives the low end. */
function sagittaN(N) {
  const n = BigInt(N),
    ends = [PI60 - 10n, PI60 + 10n].map((p) => {
      let term = [1n, 1n],
        sum = [0n, 1n];
      const partial = [];
      for (let k = 1n; k <= 12n; k++) {
        term = [term[0] * p * p, term[1] * n * n * S60 * S60 * (2n * k - 1n) * 2n * k];
        sum = plusN(sum, k % 2n ? term : [-term[0], term[1]]);
        partial.push([sum[0] * n, sum[1]]);
      }
      return partial;
    });
  return { lo: ends.map((x) => x[1]), value: [ends[0][11], ends[1][10]], hi: ends.map((x) => x[0]) };
}
/** The accumulated sagitta as printed: the two bounds outwards, the value at this N to the nearest and “=” at N = 3 alone (3/2). */
function auditSagitta(N, text) {
  const m = new RegExp(`(${NUMBER}) ≤ N\\(1 − cos\\(π/N\\)\\) ≤ (${NUMBER})(?:（当前值 ([=≈]) (${NUMBER})）| \\(value ([=≈]) (${NUMBER})\\))`).exec(text);
  if (!m) return 'text';
  const [sign, value] = m.slice(3).filter((x) => x !== undefined),
    { lo, value: v, hi } = sagittaN(N);
  if (cmpN(lo[1], v[0]) >= 0 || cmpN(v[1], hi[0]) >= 0) return 'the theorem';
  if (!floorsN(m[1], lo)) return 'the lower bound';
  if (!ceilsN(m[2], hi)) return 'the upper bound';
  if (!nearestN(value, v) || (sign === '=') !== (N === 3)) return 'the value';
  if (N === 3 && cmpN(decimalN(value), [3n, 2n]) !== 0) return '3/2';
  if (cmpN(decimalN(m[1]), decimalN(value)) > 0 || cmpN(decimalN(value), decimalN(m[2])) > 0) return 'the order';
  return '';
}
/** The clauses of a text: what stands between two separators (，；。、：, , ; : · and the ¶ of areaText), every parenthesis taken out and
    read as a clause of its own. The k < n under a sum is its index, no relation. */
function clauses(text) {
  let t = text.replace(/\s+/g, ' ').replace(/Σk ?< ?(?:\d+|n)/g, 'Σ');
  const out = [];
  for (let m; (m = /[(（]([^()（）]*)[)）]/.exec(t)); ) {
    out.push(m[1]);
    t = `${t.slice(0, m.index)}◦${t.slice(m.index + m[0].length)}`;
  }
  return [...out, t].flatMap((x) => x.split(/[，；。、,;:：¶]| · |\.(?=\s|$)/)).map((x) => x.trim());
}
/** Digits that round a value to the nearest are no side of an inequality, whatever stands on its other side (0, 1 and e too): the clauses of
    a text with “≈” and “<”, “>”, “≤” or “≥” in them, and two decimals compared anywhere. */
const MIXED = /≈.*[<>≤≥＜＞≦≧]|[<>≤≥＜＞≦≧].*≈/;
const COMPARED = new RegExp(`(?<![\\d.])−?\\d+\\.\\d+(?:×10⁻?[${SUP}]+)? [≤≥<>] −?\\d+\\.\\d+`, 'g');
const mixed = (text) => [...clauses(text).filter((x) => MIXED.test(x)), ...[...text.replace(/\s+/g, ' ').matchAll(COMPARED)].map((m) => m[0])];
/** The remainder and its bound as printed in a note: the relation and the two texts, then the numbers. */
function printedTailText(note) {
  const m = new RegExp(`(?:(=) (0) ≤ (0)|(≈) (${NUMBER})(?:，上界|, bound) ≤ (${NUMBER}))(?=[；;])`).exec(note);
  return m ? m.slice(1).filter((x) => x !== undefined) : ['', 'NaN', 'NaN'];
}
function printedTail(note) {
  return printedTailText(note).slice(1).map(parseNumber);
}
/** A printed value without its relation. */
const bareText = (t) => t.trim().replace(/^[=≈] /, '');
/** The exact rational coefficients of the compositional inverse of 2X + 2 arcsin X up to degree n, by solving
    f(g(w)) = w order by order (another route than the page's Lagrange inversion). */
function inverseSeriesExact(n) {
  const add2 = ([a, b], [c, d]) => fracN(a * d + c * b, b * d),
    mul2 = ([a, b], [c, d]) => fracN(a * c, b * d);
  // f coefficients: f₁ = 4, f_{2k+1} = 2·C(2k, k)/(4^k (2k + 1)) for k ≥ 1
  const f = Array.from({ length: n + 1 }, () => [0n, 1n]);
  f[1] = [4n, 1n];
  for (let k = 1; 2 * k + 1 <= n; k++) {
    let c = 1n;
    for (let j = 1n; j <= BigInt(k); j++) c = (c * (BigInt(k) + j)) / j;
    f[2 * k + 1] = fracN(2n * c, 4n ** BigInt(k) * BigInt(2 * k + 1));
  }
  const g = Array.from({ length: n + 1 }, () => [0n, 1n]);
  const mulS = (A, B) => {
    const C = Array.from({ length: n + 1 }, () => [0n, 1n]);
    for (let i = 0; i <= n; i++) if (A[i][0]) for (let j = 0; i + j <= n; j++) if (B[j][0]) C[i + j] = add2(C[i + j], mul2(A[i], B[j]));
    return C;
  };
  for (let m = 1; m <= n; m++) {
    // coefficient of w^m in f(g) with g_m unknown: 4 g_m + (terms from g₁ … g_{m−1}) = [m = 1]
    g[m] = [0n, 1n];
    let total = [0n, 1n],
      pow = g.map((x) => x);
    for (let k = 1; k <= m; k += 1) {
      if (k > 1) pow = mulS(pow, g);
      if (f[k][0]) total = add2(total, mul2(f[k], pow[m]));
    }
    const want = m === 1 ? [1n, 1n] : [0n, 1n];
    g[m] = mul2(add2(want, [-total[0], total[1]]), [1n, 4n]);
  }
  return g;
}

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
  await context.exposeBinding('__rationalPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__rationalPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener(
      'DOMContentLoaded',
      () => window.__rationalPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined, dark: matchMedia('(prefers-color-scheme: dark)').matches }).catch(() => {}),
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
// and the lit-solid checks of kit.solid (opaque share, shading, turning, a hidden mark, resting)
await stageFirstChecks(T, BOOK, ID, { solid: true });

/* ---------- sources, registry, dependencies and the citing chapter ---------- */
const plain = (html) => html.replace(/<[^>]*>/g, '').replaceAll('&gt;', '>').replaceAll('&lt;', '<').replaceAll('&amp;', '&');
/** The numbers of the drawer by the names of their spans, in the order of the text (the same in both languages). */
const BENCH_KEYS = ['sagitta', 'sagittaBounds', 'defectSum', 'nu2First', 'nu2Last', 'nu2Limit', 'escape', 'compound', 'kStar', 'kConj', 'icoNear', 'icoFar'];
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
  check(`source ${file}: no literal colour and no palette switch`, !literalColour.test(src) && !/\btrPalette\b|data-tr-palette|[?&]theme=/.test(src));
  check(`source ${file}: no model, vendor or tool identifiers and no Hangul`, !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src) && !hangul.test(src));
  check(`source ${file}: no possessive ’s (the runtime splits it)`, !/[’']s\b/.test(src.replace(/it's|it’s/gi, '')));
}
check('no source asserts a single-valued log(−1) on the cut locus', Object.values(sources).every((src) => !/log\([−-]1\)/.test(src)));
check(
  'evidence and drawer wording: the exact hypotheses and scopes, in both languages',
  [
    // three_anchor_gram_det_formula: a real inner-product space, the centered inner-product determinant
    '任意实内积空间里',
    'in any real inner-product space',
    '定心内积格拉姆行列式 det G(x₀, x₁, x₂) = 4(1 − κ₂)(κ₂ − (2κ₁ − 1)²) = 0',
    'centered inner-product Gram determinant det G(x₀, x₁, x₂) = 4(1 − κ₂)(κ₂ − (2κ₁ − 1)²) = 0',
    '定心内积格拉姆行列式 det G₃',
    'the centered inner-product Gram determinant det G₃',
    // comparison_classification_of_continuous_rays: the data of the theorem
    '设 A 是有限维（因而完备的）实赋范代数，[X, Y] = XY − YX；L ⊆ A 是对交换子封闭的实线性子空间，G ≤ A<sup>×</sup> 是子群，exp(L) ⊆ G，且对一切 g ∈ G 有 g L g⁻¹ ⊆ L',
    'let A be a finite-dimensional (hence complete) real normed algebra with [X, Y] = XY − YX, L ⊆ A a real linear subspace closed under the commutator and G ≤ A<sup>×</sup> a subgroup with exp(L) ⊆ G and g L g⁻¹ ⊆ L for every g ∈ G',
    '对称的实双线性型 H',
    'a symmetric real bilinear form H on L',
    // exp_remainder_le
    '单位元范数为 1（NormOneClass）的完备实赋范代数里，0 ≤ r &lt; n + 1 且 ‖x‖ ≤ r 时',
    'in a unit-normed (NormOneClass) complete real normed algebra with 0 ≤ r &lt; n + 1 and ‖x‖ ≤ r',
    // face_cycle_exact: a rotation system of a finite simple graph
    '连通、有边、满足欧拉式 V − E + F = 2 的有限简单图旋转系统上',
    'on a finite connected simple graph with an edge and a rotation system satisfying the Euler formula V − E + F = 2',
    '有限简单图',
    'finite connected simple graph',
    // the strict radial escape is stated for θ ≠ 0 only
    'θ ≠ 0 时 N 步平直切线 (1 + iθ/N)ᵏ 的模方 (1 + θ²/N²)ᴺ 大于 1',
    'for θ ≠ 0, N flat tangent steps (1 + iθ/N)ᵏ reach the squared modulus (1 + θ²/N²)ᴺ > 1',
    '<span class="code">e · θ ≠ 0: |(1 + iθ/N)<sup>N</sup>|² &gt; 1</span>',
    // the count of Maxwell, the pairs of the icosahedron, the chart and its missing point
    'ℝ³ 中 N ≥ 3 个不共线的点',
    'for N ≥ 3 non-collinear points in ℝ³',
    'ΔE(3) = ΔE(4) = 0',
    '非对跖的相隔顶点对',
    'non-antipodal separated pairs',
    'S³(ℚ) = Q(ℚ³) ∪ {−1}',
    'exp₁(πi) = e<sup>iπ</sup> = −1',
    '明确标出 ∉ ℚ',
    'marked ∉ ℚ when irrational',
    // the signed pairs on the boundary of the unit ball
    '(σ, +1) ~ (−σ, −1)',
    '对跖等同 (σ, +1)',
    'antipodal identification (σ, +1)'
  ].every((x) => sources['index.html'].includes(x)) && !/纯有理 κ 账本只写有理|writes only rational readings/.test(sources['index.html'])
);
/* ---------- the NUM box and the drawer take their numbers from the script: none is written in the sources ---------- */
/** The numbers the page shows in its NUM box and its drawer, as this suite expects them (their values are computed below). */
const PRINTED = ['0.1340', '0.8036', '0.8225', '0.8038', '1.0472', '1.2374', '1.3353', '1.3436', '1.5141', '1.5162', '1.4885', '2.5216', '1.0000', '0.0000', '0.02048', '0.02690', '0.8198', '0.73908513', '0.6545', '0.0955', '0.7236', '0.2764', '0.01803', '0.01642', '0.001614', '6.2832', '720.00'];
const EXACT = ['12 − 30 + 20', '−1/768', '−1/25', '8/5', '10⁻¹⁴', '10⁻¹⁵', '10⁻¹⁶', '5² + 5', 'x₁₂', 'κ₅'];
{
  // (the comments of main.js name some of them; its code does not)
  const code = sources['main.js'].replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, ''),
    written = (src, list) => list.filter((x) => src.includes(x)),
    inPage = written(sources['index.html'], [...PRINTED, ...EXACT]),
    inCode = written(code, [...PRINTED, ...EXACT]);
  check('static: index.html (its meta description too) holds no number of the NUM box or the drawer, and no “≈” at all', !inPage.length && !sources['index.html'].includes('≈'), inPage.join(' | '));
  // the decimals left in the page file: the section number, the speed chip 0.5× and the first value of the output of λ
  const text = sources['index.html'].replace(/<link[^>]*>/g, ''),
    decimals = [...plain(text).matchAll(/\d+\.\d+/g)].map((m) => m[0]),
    meta = (/<meta name="description" content="([^"]*)"/.exec(text) || ['', '1.0'])[1];
  check('static: the only decimals of index.html are §32.5, the speed chip 0.5× and the output of λ; its description has none', decimals.length > 0 && decimals.every((x) => ['32.5', '0.5', '1.00'].includes(x)) && !/\d\.\d/.test(meta) && meta.length > 400, decimals.join(' '));
  check('static: the code of main.js holds none of them either, and no decimal of four digits or more after the point', code.length > 90000 && !inCode.length && !/\d\.\d{4}/.test(code), [...inCode, ...(code.match(/.{0,30}\d\.\d{4}/g) || [])].join(' | '));
  check(
    'static: the NUM box is an empty container, the numbers of the drawer are spans by name in both languages, and the script fills them before it copies the boxes into the drawer',
    sources['index.html'].includes('<div class="lean num" id="numEvidence"><span class="ok">NUM</span><span id="numEvidenceBody"><span class="zh">—</span><span class="en">—</span></span></div>') &&
      same([...sources['index.html'].matchAll(/<span data-bench="(\w+)">—<\/span>/g)].map((m) => m[1]), [...BENCH_KEYS, ...BENCH_KEYS]) &&
      sources['index.html'].split('data-bench=').length === 2 * BENCH_KEYS.length + 1 &&
      ["innerHTML = numText(say)", 'DRAWER[el.dataset.bench](say)'].every((x) => sources['main.js'].split(x).length === 2 && sources['main.js'].indexOf(x) < sources['main.js'].indexOf("$('drawerEvidence').append(")) &&
      ['sagBounds(BENCH.m, BENCH.I.sag, say)', 'tailRel(I.tail, say,', 'geodesic(', 'boundaryRank(', 'chebT(n, c)', 'chebU(n, c)', 'dottie()', 'dottieExact(3)', 'fibFacts(k + 1)', 'firstReturn(...q)', 'RATIONAL_RESIDUE', 'expTail('].every((x) => sources['main.js'].includes(x)),
    JSON.stringify([...sources['index.html'].matchAll(/data-bench="(\w+)"/g)].map((m) => m[1]))
  );
  check(
    'static: the lede of the drawer says in both languages that no decimal result is in the page file and that the script computes them',
    ['页面文件里不写任何小数结果：NUM 框与下面各条里的小数在打开页面时由脚本用整数、分数与双精度现算填入，实时读数随每一帧重算（NUM）', 'No decimal result is written in the page file: the decimals of the NUM box and of the items below are computed by the script in integers, fractions and doubles when the page opens, and the live readouts again on every frame (NUM)', '这是数值沙盘，不是证明', 'This is a numerical sandbox, not a proof'].every((x) => sources['index.html'].includes(x)) && !/每个数都由页面当场算出|Every number is computed on the page/.test(sources['index.html'])
  );
  check(
    'source: the readings of the icosahedron and of the two roots go through irrRel (“≈”) wherever main.js writes them',
    !/kText\(m\)\} = \$\{fmt|k2Text\(m\)\} = \$\{fmt|κ = \$\{fmt\(icoKappa/.test(sources['main.js']) && ['near', 'far'].every((k) => sources['main.js'].split(`irrRel(icoKappa.${k})`).length === 3 && sources['main.js'].split(`irrRel(ico.${k})`).length === 3) && ['KSTAR', 'KCONJ'].every((k) => sources['main.js'].split(`irrRel(${k})`).length === 4)
  );
}
/* ---------- the evidence boxes: a green box states the frozen theorem alone ---------- */
/** The boxes of the evidence panel as written in the source: the class, the GID, the two languages. */
const boxes = [...sources['index.html'].matchAll(/<div class="(lean[^"]*)"(?: id="\w+")?><span class="ok">([^<]*)<\/span><span(?: id="\w+")?><span class="zh">(.*?)<\/span><span class="en">(.*?)<\/span>(?:<a data-lean-gid="([^"]*)"[^>]*><code>([^<]*)<\/code><\/a>)?<\/span><\/div>/g)].map(([, cls, ok, zh, en, gid, code]) => ({ cls, ok, gid, code, zh: plain(zh), en: plain(en) }));
const greens = boxes.filter((b) => b.cls === 'lean'),
  argued = boxes.find((b) => b.cls === 'lean argued');
/** The NUM box as the page has filled it, in both languages: in the panel, and its copy in the drawer. */
const [numBox, numCopy] = await page.evaluate(() =>
  ['#basis .lean.num', '#drawerEvidence .lean.num'].map((sel) => Object.fromEntries(['zh', 'en'].map((l) => [l, document.querySelector(sel + ' .' + l).textContent.replace(/\s+/g, ' ').trim()])))
);
/** The items of the drawer as filled, in both languages. */
const items = await page.evaluate(() => Object.fromEntries(['zh', 'en'].map((l) => [l, [...document.querySelectorAll(`#drawer .sheet > .${l} ol > li`)].map((li) => li.textContent.replace(/\s+/g, ' ').trim())])));
check('evidence source: fifteen green boxes (each with its GID and the name of its declaration), then ARGUED, MODEL and NUM', same(boxes.map((b) => b.cls), [...Array(15).fill('lean'), 'lean argued', 'lean model', 'lean num']) && same(greens.map((b) => b.gid), GIDS) && greens.every((b) => b.ok === 'LEAN ✓' && b.gid.endsWith('.' + b.code)), JSON.stringify(boxes.map((b) => [b.cls, b.gid])));
{
  // no instance of the page, no drift, no hand derivation and no decimal in a green box: the theorem alone
  const foreign = /页面|本页|舞台|沙盘|\bthe page\b|\bpage\b|\bstage\b|drift|偏差|手工推导|hand derivation|文献|literature|\d\.\d|≈/i;
  // (subgroupModel and “model” are names of the theorems; the tags MODEL and NUM are not)
  const bad = greens.flatMap((b) => [b.zh, b.en].filter((t) => foreign.test(t) || /MODEL|NUM/.test(t)).map((t) => `${b.code}: ${(foreign.exec(t) || /MODEL|NUM/.exec(t))[0]}`));
  check('Q3: none of the fifteen green boxes names the page, a drift, a rounded number, a hand derivation or the literature', !bad.length, bad.join(' | '));
  check(
    'normSq_and_chebyshev: the green box names the convention U₋₁ = 0 at n = 0 in both languages (Uₙ₋₁ is the polynomial of index −1 there)',
    greens[4].code === 'normSq_and_chebyshev' && greens[4].zh.includes('xn+1 = Un(c)·x1 − Un−1(c)·x0（n = 0 时约定 U−1 = 0）') && greens[4].en.includes('xn+1 = Un(c)·x1 − Un−1(c)·x0 (with U−1 = 0 at n = 0) and'),
    greens[4].zh + ' | ' + greens[4].en
  );
  const instances = ['σ = (1, 1)', '240', 'S³(ℚ)', '4(1 − κ₂)', 'κ₂ = ', 'det G₃', '62', '0.73908513', 'κ₅', '8/5', 'u = tan', 'b₁ = 1/4', '12 − 30 + 20', 'exp(t·i)', 'Q(σ)'];
  const left = greens.flatMap((b) => instances.filter((x) => b.zh.includes(x) || b.en.includes(x)).map((x) => `${b.code}: ${x}`));
  check('Q3: the instances of the page have left the green boxes', !left.length, left.join(' | '));
}
{
  // comparison_classification_of_continuous_rays: every hypothesis and all eight conclusions, in order, in both languages
  const ray = greens[6];
  const hypotheses = ['[X, Y] = XY − YX', 'exp(L) ⊆ G', 'g L g⁻¹ ⊆ L', '0 ≤ φ(g) ≤ 1', 'φ(g) = 1 ⇔ g = 1', 'φ(g²) = (2φ(g) − 1)²', 'φ(kgk⁻¹) = φ(g)', 't ↦ φ(exp(tX))'];
  const clauses = [
    ['H(X, X) ≥ 0', 'H(X, X) = 0 ⇒ X = 0'],
    ['φ(exp(tX)) = cos²(t√(H(X, X)/2))'],
    ['exp(tX) = 1 ⇔ ∃ n ∈ ℤ', 't√(H(X, X)/2) = nπ'],
    ['[X, Y] = 0', 'X = 0', '∃ c ∈ ℝ', 'Y = cX'],
    ['H([C, X], Y) + H(X, [C, Y]) = 0'],
    ['dimℝ L ∈ {0, 1, 3}'],
    ['dimℝ L = 3', 'H(bi, bj) = δij', 'μ > 0', '[b₀, b₁] = μ b₂', '[b₁, b₂] = μ b₀', '[b₂, b₀] = μ b₁'],
    ['X ≠ 0', 'T > 0', 'exp(tX) = 1 ⇔ ∃ k ∈ ℤ', 't = kT', 'H(X, X) = 2π²/T²']
  ];
  const roman = ['(i)', '(ii)', '(iii)', '(iv)', '(v)', '(vi)', '(vii)', '(viii)'];
  const parts = (t) => {
    const at = roman.map((r) => t.indexOf(r + ' '));
    return at.every((x, i) => x >= 0 && (!i || x > at[i - 1])) ? [t.slice(0, at[0]), ...at.map((x, i) => t.slice(x, at[i + 1]))] : [];
  };
  for (const lang of ['zh', 'en']) {
    const p = parts(ray[lang]);
    const missing = p.length === 9 ? [...hypotheses.filter((h) => !p[0].includes(h)), ...clauses.flatMap((c, i) => c.filter((x) => !p[i + 1].includes(x)).map((x) => roman[i] + ' ' + x))] : ['the eight clauses in order'];
    check(`Q1 ${lang}: the classification of continuous rays states all hypotheses and the eight clauses (i) … (viii)`, ray.gid === GIDS[6] && !missing.length && !/定理的结论之中|among the conclusions/.test(ray[lang]) && (lang === 'zh' ? /有限维/.test(p[0]) && /对称的实双线性型 H/.test(p[0]) : /finite-dimensional/.test(p[0]) && /symmetric real bilinear form H on L/.test(p[0])), missing.join(' | '));
  }
}
{
  // what left the green boxes is in ARGUED (literature, hand derivations) and NUM (numbers), in both languages
  const argue = [
    'S³(ℚ) = Q(ℚ³) ∪ {−1}',
    'subgroupModel_readingComplete_iff',
    'exists_subgroupModel_not_readingComplete',
    'κ₂ = (1 + T₂(c))/2 = (2κ₁ − 1)²',
    'κ₃ = (1 + T₃(c))/2 = κ₁(4κ₁ − 3)²',
    'κ₂ = κ₃ = (2 − φ)/4',
    'κ₂ = κ₃ = (φ + 1)/4',
    'det G(x₀, x₁, x₂) = 4(1 − κ₂)(κ₂ − (2κ₁ − 1)²) = 0',
    '16κn² − 12κn + 1 = −(Fn·Fn+2 − Fn+1²)/Fn² = (−1)n/Fn²',
    'T = 2π',
    'H(i, i) = 2π²/T² = 1/2',
    'm/n² → 0',
    'Cheeger–Müller–Schrader',
    '1984',
    'ΔE(3) = ΔE(4) = 0',
    '5 < 6'
  ];
  const lang = { zh: ['手工推导', '不交并', '利普希茨—基灵高斯曲率测度弱收敛', 'm/n² 不趋于 0 时法向不收敛', '杆数减自由度', '仿射独立（不共面）', '不声称它就是'], en: ['Hand derivations', 'a disjoint union', 'Lipschitz–Killing Gaussian curvature measures converge weakly', 'when m/n² does not vanish the normals do not converge', 'bar-minus-DOF count', 'affinely independent (non-coplanar)', 'not claimed to be the witness'] };
  const numbers = ['det G₃ = 0.0000', '240', 'T = 2π', '2π²/T² = 1/2', 'H(i, i)', '≈ 0.73908513', '0.8036 ≤ N(1 − cos(π/N)) ≤ 0.8225', '≈ 0.02048', '(θ6/6!)/(1 − θ/7) ≤ 0.02690', '= 1.0000', '≈ 0.8198', '|φ − 8/5| > 1/(√5·5² + 5)', 'V − E + F = 2', 'F − 1 = E − V + 1', '19', '−1/25', '≈ 0.1340', '≈ 1.4885', '≈ 2.5216', 'n = 12', 'b₃ = −1/768', 'σ = (1, 1)'];
  for (const l of ['zh', 'en']) {
    const miss = [...[...argue, ...lang[l]].filter((x) => !argued[l].includes(x)), ...numbers.filter((x) => !numBox[l].includes(x))];
    check(`Q3 ${l}: the hand derivations, the literature and the numbers are in the ARGUED and NUM boxes`, !miss.length, miss.join(' | '));
    // the three inequalities of the box, against the theorems as fractions (N = 6; θ = 90° as a double; n = 5)
    const tail = new RegExp(`(≈ ${NUMBER}(?:，上界|, bound)) \\(θ6/6!\\)/\\(1 − θ/7\\) (≤ ${NUMBER})`).exec(numBox[l]),
      said = [auditSagitta(6, numBox[l]), tail ? auditTail(6, PI / 2, `${tail[1]} ${tail[2]}`) : 'text', auditHurwitz(5, numBox[l])];
    check(`NUM ${l}: the sagitta at N = 6, the tail at θ = 90°, N = 6 and Hurwitz at n = 5: outward bounds, sides to the nearest, a positive margin from below (fractions)`, said.every((x) => x === ''), JSON.stringify(said));
  }
  // the ray exp(t·i): the return period in t is 2π, the period of cos²(t/2) in t is 2π and in the half-angle π
  check(
    'ARGUED: the ray exp(t·i) has the least positive return period T = 2π and cos²(t/2) the least positive period 2π in t (π in the half-angle), in both languages',
    sources['index.html'].includes('单位四元数模型里射线 exp(t·i) 的最小正返回周期是 T = 2π（H(i, i) = 2π²/T² = 1/2），κ(1, exp(t·i)) = cos²(t/2) 关于 t 的最小正周期是 2π（关于半角 t/2 的周期是 π），π 作为连续射线的周期因子从这里进入。') &&
      sources['index.html'].includes('In the unit-quaternion model the ray exp(t·i) has least positive return period T = 2π (H(i, i) = 2π²/T² = 1/2), and κ(1, exp(t·i)) = cos²(t/2) has least positive period 2π in t (period π in the half-angle t/2): π enters here through the period of a continuous ray.') &&
      !/π 作为连续射线的周期从这里|π enters here, as the period/.test(sources['index.html'])
  );
  {
    // by the mathematics: e^{it} with e^{2πi} = 1, e^{πi} = −1; cos²(t/2) does not repeat at π
    const back = (t) => Math.hypot(Math.cos(t) - 1, Math.sin(t)),
      f = (t) => Math.cos(t / 2) ** 2,
      repeats = (g, T) => Array.from({ length: 40 }, (_, k) => 0.17 * k).every((t) => near(g(t + T), g(t), 1e-12));
    check('exp(t·i): back at 1 first at t = 2π (not at π), cos²(t/2) has period 2π and not π, cos² has period π, 2π²/T² = 1/2', back(2 * PI) < 1e-12 && back(PI) > 1.9 && Array.from({ length: 628 }, (_, k) => 0.005 + 0.01 * k).every((t) => back(t) > 1e-3) && repeats(f, 2 * PI) && !repeats(f, PI) && repeats((x) => Math.cos(x) ** 2, PI) && near((2 * PI ** 2) / (2 * PI) ** 2, 0.5, 1e-15));
  }
  // the facts quoted there, by the mathematics: the lantern, the square on the equator, κ₃ at the two roots
  const area = (m, n) => 2 * n * Math.sin(PI / n) * Math.sqrt(1 + (m * (1 - Math.cos(PI / n))) ** 2),
    tilt = (m, n) => Math.atan(m * (1 - Math.cos(PI / n)));
  check('the lantern of Schwarz: m/n² → 0 converges in area and normals, m = n² does neither, m = n³ diverges', near(area(1000, 1000), 2 * PI, 1e-3) && tilt(1000, 1000) < 0.01 && near(area(1e6, 1e3), 2 * PI * Math.sqrt(1 + PI ** 4 / 4), 1e-2) && tilt(1e6, 1e3) > 1.3 && area(1e9, 1e3) > 1e4);
  const rank = (pts) => {
    const rows = [];
    for (let i = 0; i < pts.length; i++)
      for (let j = i + 1; j < pts.length; j++) {
        const row = Array(3 * pts.length).fill(0),
          d = sub(pts[i], pts[j]);
        for (let t = 0; t < 3; t++) [row[3 * i + t], row[3 * j + t]] = [d[t], -d[t]];
        rows.push(row);
      }
    let r = 0;
    for (let c = 0; c < 3 * pts.length && r < rows.length; c++) {
      let piv = r;
      for (let k = r; k < rows.length; k++) if (Math.abs(rows[k][c]) > Math.abs(rows[piv][c])) piv = k;
      if (Math.abs(rows[piv][c]) < 1e-9) continue;
      [rows[r], rows[piv]] = [rows[piv], rows[r]];
      for (let k = r + 1; k < rows.length; k++) {
        const f = rows[k][c] / rows[r][c];
        rows[k] = rows[k].map((x, t) => x - f * rows[r][t]);
      }
      r++;
    }
    return r;
  };
  check('the rigidity matrix: rank 5 < 6 for the square on the equator, 6 for the tetrahedron, 3 for a triangle, 2 for three collinear points', rank([[1, 0, 0], [0, 1, 0], [-1, 0, 0], [0, -1, 0]]) === 5 && rank([[1, 0, 0], [0, 1, 0], [0, 0, 1], [-1, 0, 0]]) === 6 && rank([[1, 0, 0], [0, 1, 0], [-1, 0, 0]]) === 3 && rank([[1, 0, 0], [0, 0, 0], [-1, 0, 0]]) === 2);
  check('κ₂ = (2κ₁ − 1)² and κ₃ = κ₁(4κ₁ − 3)² exchange the two roots: (2 − φ)/4 at (φ + 1)/4 and the other way round', near((2 * KSTAR - 1) ** 2, KCONJ, 1e-15) && near(KSTAR * (4 * KSTAR - 3) ** 2, KCONJ, 1e-15) && near((2 * KCONJ - 1) ** 2, KSTAR, 1e-15) && near(KCONJ * (4 * KCONJ - 3) ** 2, KSTAR, 1e-15));
}
/* ---------- “=” and “≈”: one formatter in the source, exact decimals only in the text of the page ---------- */
check(
  'source: every relation before a computed number goes through the one formatter (no “= ${fmt(…)}”, “= ${sci(…)}” or “= ${kText(…)}”)',
  !/[=≈] ?\$\{(?:fmt|sci|fmtFloor|fmtCeil|sciFloor|sciCeil|digits|digitsOfLog|kText|k2Text|irrRel|ratRel|ratSci)\(/.test(sources['main.js'].replace(/\} ≈ \$\{fmt\((?:m\.k1|m\.heap\.k2)\)\}/g, '')) && /const eqRel = \(sym, val, d = 4\) =>/.test(sources['main.js']) && /const sciRel = \(val\) =>/.test(sources['main.js'])
);
{
  // (the text of the page as filled: the source itself has no decimal result)
  const filled = [numBox.zh, numBox.en, numCopy.zh, numCopy.en, ...items.zh, ...items.en].join(' ¶ '),
    said = [...filled.matchAll(/([^\s，；。、,;]+) = (−?\d+\.\d+)/g)].map((m) => m[0]),
    rounded = ['0.1340', '0.8038', '1.4885', '2.5216', '1.5141', '1.5162', '0.02048', '0.01803', '0.01642', '0.8198', '0.73908513', '0.6545', '0.0955', '0.7236', '0.2764', '6.2832'];
  check('the NUM box and the drawer: “= ” stands before a decimal only where the decimal is exact (1.0000, 0.0000, Σδ = 720.00°, Re s = 0.6)', said.length > 0 && said.every((t) => / = (?:1\.0000|0\.0000|720\.00|0\.6)$/.test(t)), JSON.stringify(said));
  check('the NUM box and the drawer: the rounded numbers follow “≈”, never “=”', rounded.every((x) => filled.includes('≈ ' + x) && !new RegExp('=\\s*' + x.replace('.', '\\.')).test(filled)), rounded.filter((x) => !filled.includes('≈ ' + x) || filled.includes('= ' + x)).join(' '));
  check(
    'the irrational (φ + 1)/4, (2 − φ)/4, (φ + 2)/5 and (3 − φ)/5 take ≈ before their four decimals in the NUM box, its copy and the items of the drawer, in both languages',
    ['(φ + 1)/4 ≈ 0.6545', '(2 − φ)/4 ≈ 0.0955', '(φ + 2)/5 ≈ 0.7236', '(3 − φ)/5 ≈ 0.2764'].every((x) => [numBox.zh, numBox.en, numCopy.zh, numCopy.en, items.zh[4], items.en[4]].every((t) => t.split(x).length === 2))
  );
}
check('source: σ = i = Q(σ) is claimed and ringed by one predicate, within 4 EPSILON of θ = 90°', sources['main.js'].includes('const ULPS = 4 * Number.EPSILON;') && sources['main.js'].includes('const isExactI = (th) => Math.abs(th - PI / 2) <= ULPS;') && (sources['main.js'].match(/PI \/ 2\) <=? /g) || []).length === 1 && (sources['main.js'].match(/isExactI\(m\.theta\)/g) || []).length === 2 && !/\bexactI\b/.test(sources['main.js']));
{
  // (the detector finds “≈” beside any inequality sign, an exact 0, 1 or e on the other side too, and leaves the separated forms)
  const found = [
      ...['|φ − 8/5| ≈ 0.01803 > 0.01641', '≈ 0.0205 ≤ 0.0269', '0.8036 ≤ 0.8038 ≤ 0.8225', 'N(1 − cos(π/N)) ≈ 0.8038 ≤ 0.8225', '≈ 2.088×10⁻⁵² ≤ 2.158×10⁻⁵²', 'x ≥ ≈ 0.1', '≈ 0.5 < 1.5'],
      ...['|z₆|² ≈ 1.4885 > 1', '|z6|² ≈ 4.2181 > 1', '≈ 1 + 1.480×10⁻³¹ > 1.', '≈ 1 − 3.046×10⁻⁵ < 1', '(1 + 1/6)⁶ ≈ 2.5216 < e', '≈ 2.5216 < e · = 1.0000', '差 ≈ 0.0016 > 0', 'θ ≈ 22° 时 |z₆|² > 1', '1 < |z₆|² ≈ 1.4885', '≈ 1.4885 (θ = 90°) > 1', '(1 + 1/N)ᴺ ≤ e ≈ 2.7183']
    ].map((t) => mixed(t).length),
    left = [
      ...['|z₆|² > 1（值 ≈ 1.4885），逃出球外', '|z₆|² > 1 (value ≈ 1.4885), off the sphere', '|z₆|² > 1（值 ≈ 1 + 1.480×10⁻³¹）', '|(s − 1)/s| < 1 (value ≈ 1 − 3.046×10⁻⁵).', '(1 + 1/6)⁶ < e（值 ≈ 2.5216） · = 1.0000', '≈ 1.4885 · (1 + 1/6)⁶ < e (value ≈ 2.5216)', 'θ ≈ 22° 时，|z₆|² > 1（值 ≈ 1.0240）'],
      ...['差 ≥ 0.001614 > 0）', '0.8036 ≤ N(1 − cos(π/N)) ≤ 0.8225（当前值 ≈ 0.8038）', '≈ 0.02048，上界 ≤ 0.02690', '|eiθ − Σk<6(iθ)k/k!| ≈ 0.02048, bound (θ6/6!)/(1 − θ/7) ≤ 0.02690', '= 0 ≤ 0', '5 < 6']
    ].flatMap(mixed);
  check('the detector of rounded digits beside an inequality sign: eighteen such texts are found (eleven of them beside an exact 0, 1 or e), thirteen separated ones are left', found.length === 18 && found.every((k) => k > 0) && !left.length, JSON.stringify([found, left]));
  const said = [...mixed(plain(sources['index.html'])), ...mixed((/<meta name="description" content="([^"]*)"/.exec(sources['index.html']) || ['', '≈ 0 > 0'])[1])];
  check('static text (and the meta description): no digits rounded to the nearest are a side of an inequality', !said.length, JSON.stringify(said));
  // the same of the sentences as main.js spells them: no “≈”, and no relation of a formatter, runs on into an inequality sign
  const chained = [...sources['main.js'].matchAll(/(?:≈ ?|(?:eqRel(?=\(null)|irrRel|ratRel|sciRel|ratSci|idRel|approx|z2Rel|offRel|accRel|sagRel|excessRel|gapRel|pRel)\([^{}]*\)\}) ?(?:&lt;|&gt;|[<>≤≥])/g)].map((m) => m[0]);
  check('source: no template of main.js puts “<”, “>”, “≤” or “≥” right after a rounded relation', !chained.length, chained.join(' | '));
}
check(
  'source: the endpoints are the values themselves (θ = 0, θ = π, λ = 0, λ = 1, a named κ₁), one test for the notes, the labels and the stage',
  sources['main.js'].includes("m.theta === 0 ? 'zero' : m.euler.atPi ? 'half' : 'live'") && sources['main.js'].includes('const atPi = th >= PI,') && sources['main.js'].includes("m.lambda === 1 ? 'pure' : m.lambda === 0 ? 'scaffold' : 'blend'") && !/m\.theta <= 1e|m\.theta > 1e-12|m\.k1 [<>]=? (?:1 - )?1e|m\.lambda [<>]=? (?:1 - )?1e/.test(sources['main.js'])
);
{
  // accumulated_sagitta_bounds: σ, T, α are any reals and N any natural number, so T/N and the power are the total ones of Lean
  const box = greens[8];
  check(
    'accumulated_sagitta_bounds: the green box states the totalized step angle s = σ·rpow(T/N, α) (T/0 = 0, Real.rpow, the ordinary power for N ≥ 1 and T > 0) in both languages',
    box.code === 'accumulated_sagitta_bounds' &&
      ['s = σ·rpow(T/N, α)', 'T/0 = 0', 'Real.rpow', 'N ≥ 1', 'T > 0', 'σ(T/N)α', 'N(s²/2 − s⁴/24) ≤ N(1 − cos s) ≤ N·s²/2'].every((x) => box.zh.includes(x) && box.en.includes(x)) &&
      box.zh.includes('对一切实数 σ、T、α 与每个自然数 N') &&
      box.en.includes('for all real σ, T, α and every natural number N') &&
      !/s = σ\(T\/N\)/.test(box.zh + box.en),
    box.zh + ' | ' + box.en
  );
  // by the mathematics: total division, and Real.rpow (|x|^y·cos(πy) for x < 0, 0^0 = 1, 0^y = 0)
  const div = (a, b) => (b === 0 ? 0 : a / b),
    rpow = (x, y) => (x > 0 ? x ** y : x < 0 ? (-x) ** y * Math.cos(PI * y) : y === 0 ? 1 : 0);
  const wrong = [];
  for (const N of [0, 1, 2, 3, 7, 48])
    for (const T of [-3, -1, -0.2, 0, 0.2, 1, 5])
      for (const a of [-1.5, -1, 0, 0.5, 1, 2, 2.5])
        for (const sigma of [-2, 0, 0.3, 1, PI]) {
          const x = sigma * rpow(div(T, N), a),
            mid = N * 2 * Math.sin(x / 2) ** 2,
            tol = 1e-12 * (1 + N * x ** 4);
          if (!(N * (x * x / 2 - x ** 4 / 24) <= mid + tol && mid <= (N * x * x) / 2 + tol)) wrong.push([N, T, a, sigma]);
          if (N >= 1 && T > 0 && x !== sigma * (T / N) ** a) wrong.push(['ordinary', N, T, a, sigma]);
        }
  check('the bounds hold on the totalized domain (N = 0, T ≤ 0 too), and rpow(T/N, α) is the ordinary power for N ≥ 1 and T > 0', !wrong.length, JSON.stringify(wrong.slice(0, 3)));
}
{
  // a rounding of the doubles is never printed 0.0000: NUM bounds the drifts, and 0.0000 is said of the identity det G₃ = 0 alone
  const zeros = [numBox.zh, numBox.en, ...items.zh, ...items.en].flatMap((t) => [...t.matchAll(/.{0,10}0\.0000/g)].map((m) => m[0]));
  check('the NUM box and the drawer: 0.0000 stands only in det G₃ = 0.0000, the coplanar identity (once in each language)', zeros.length === 2 && zeros.every((t) => t.endsWith('det G₃ = 0.0000')), JSON.stringify(zeros));
  check(
    'static text: the outputs open with their relation (N = 6, θ = 90°, κ₁ = 1/4, σ = (−1, 1), λ = 1.00), and the row of e says that 180° is a limit',
    ['id="nOut">= 6<', 'id="thetaOut">= 90°<', 'id="kOut">= 1/4<', 'id="probeAOut">= −1<', 'id="probeBOut">= 1<', 'id="lambdaOut">= 1.00<', '‖Q(σ)‖²（180°：lim Q）</span>', '‖Q(σ)‖² (180°: lim Q)</span>'].every((x) => sources['index.html'].includes(x))
  );
}
{
  // no tolerance of 10⁻¹² decides a relation or a landmark, no period comes from a chord of the doubles, nothing is declared and unused
  const js = sources['main.js'],
    body = (name, end) => js.slice(js.indexOf(name), js.indexOf(end, js.indexOf(name)));
  check(
    'source: “=” is decided on fractions (no tolerance in eqRel, sciRel, exactK, isExactI, paramAt), and the period is that of an exact κ₁',
    ['const eqRel =', 'const sciRel =', 'const rel =', 'const ratRel =', 'const isExactI ='].every((n) => js.includes(n) && !/1e-\d+/.test(body(n, ';\n'))) &&
      !/1e-\d+/.test(body('function exactK(k)', '\n  }\n')) &&
      !/1e-\d+/.test(body('function paramAt(s, t)', '\n  }\n')) &&
      js.includes('period = close ? close.step : 0;') &&
      !/period = n\b/.test(js)
  );
  const unused = [...js.matchAll(/^ {2}(?:const|let|function) (\w+)\b/gm)].map((m) => m[1]).filter((n) => js.match(new RegExp(`(?<!\\w|[\\w)\\]]\\.)${n}(?!\\w)`, 'g')).length < 2);
  check('source: every top-level name of main.js is used, PHI_CHIPS and CARD_OF are gone, and this suite declares no unused default card', !unused.length && !/PHI_CHIPS|CARD_OF/.test(js) && !new RegExp('const ' + 'DEFAULT').test(suite), unused.join(' '));
}
check('source: the English note of the sphere card names the cyan rings of rational fidelity', sources['main.js'].includes('the cyan rings of rational fidelity are κ(1, ·) = 1/2, 1/3, 1/4'));
check('reserved identifiers are absent from the suite and the registry entry', [suite, entryText].every((src) => !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src) && !hangul.test(src)));
check(
  'registration: §32.5, live, added 2026-11-22, capture_lock links, the exact titles and summaries',
  !!entry &&
    entry.code === 'OMEGA//RATIONAL' &&
    entry.status === 'live' &&
    entry.added === '2026-11-22' &&
    entry.capture_lock === 'links' &&
    entry.chapter === 32 &&
    entry.section === '32.5' &&
    entry.title === '无常数母公理与有理真球：π·e·φ 平直近似残差对比有理保真闭合' &&
    entry.title_en === 'Constant-Free AXIOM-Ω & Rational Sphere: π · e · φ Flat Residuals vs. Rational Fidelity Closure' &&
    entry.summary.startsWith('在同一座三维球面舞台上对照平直多面体与正 N 边形的弦弧矢高及 720° 顶点角亏（π）') &&
    entry.summary_en.startsWith('Contrasts on one 3D spherical stage flat polyhedral/polygonal sagitta gaps') &&
    entry.summary.includes('θ ≠ 0 时欧拉切线步 (1+iθ/N)ᴺ 的球外模方膨胀') &&
    entry.summary_en.includes('Euler tangent-step radial escape |(1+iθ/N)ᴺ|² > 1 (θ ≠ 0)'),
  entryText.slice(0, 200)
);
check(
  'registration: five cards in order, the fifteen GIDs in order, the theory anchors of §32.5',
  !!entry &&
    same(entry.presets, ORDER) &&
    same(Object.keys(entry.preset_titles), ORDER) &&
    same(entry.lean.map((x) => x.gid), GIDS) &&
    entry.theory.length === 1 &&
    entry.theory[0].label === '§32.5 · 拔除笛卡尔线性钉子与无常数有理重构' &&
    entry.theory[0].label_en === '§32.5 · Pulling the Last Cartesian Nail and Constant-Free Rational Reconstruction' &&
    entry.theory[0].href === '../zh/' + THEORY &&
    entry.theory[0].href_en === '../en/' + THEORY
);
check(
  'registration: the card titles of the registry are the card names of the page',
  !!entry &&
    ORDER.every((id) => {
      const button = new RegExp(`data-preset="${id}"[^>]*>.*?<span class="cn zh">([^<]*)</span><span class="cn en">([^<]*)</span>`).exec(sources['index.html']);
      return !!button && entry.preset_titles[id].zh === button[1] && entry.preset_titles[id].en === button[2];
    })
);
const depList = deps.suites[ID + '.test.mjs'] || [];
// the complete read contract of this suite, written out here: no other suite is consulted
const OWN_READS = ['@citations', '@lean-links', '@registry-entry', 'books/quantum-geometry/book.toml', 'theme/viz/solid-core.js'];
// what the server, the shared gate and the block parser read for every solid lab
const GATE_READS = [
  ...['package-lock.json', 'package.json', 'site.toml', 'theme/generated/tokens.css', 'theme/tokens.json'],
  ...['favicon.svg', 'kit.js', 'shell.js', 'theme.css', 'vendor/three.core.min.js', 'vendor/three.module.min.js'].map((f) => 'theme/viz/' + f),
  ...['__init__', 'config', 'lean', 'mathrender', 'mdscan', 'model', 'paths', 'summary', 'viz'].map((f) => `tools/tbook/${f}.py`)
];
check(
  'dependencies: exactly the five reads of this suite (citations, Lean links, registry entry, book.toml, solid runtime) and the files of the shared gate, no chapter file',
  same([...depList].sort(), [...OWN_READS, ...GATE_READS].sort()) && same(depList.filter((d) => !GATE_READS.includes(d)).sort(), OWN_READS) && !depList.some((d) => d.endsWith('.md')),
  JSON.stringify(depList)
);
check('the suite reads no chapter text directly (the citations come from the block parser)', !/readFileSync\([^)]*\.md/.test(suite));
// the chapter is being written in parallel: only its formal .viz blocks are read, in order, through tbook's parser
const citations = vizCitations(resolveBook(BOOK), ID);
for (const lang of ['zh', 'en']) {
  const seq = citations.filter((c) => c.lang === lang).map((c) => [c.preset, c.height]);
  check(
    `${lang}: §32.5 cites the five cards in order at height 500, then the whole lab at 620`,
    same(seq, [...ORDER.map((id) => [id, 500]), [null, 620]]),
    JSON.stringify(seq)
  );
}

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.RATIONAL_DEBUG.state);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => {
    el.value = String(v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
  await settle(p);
}
async function pause(p = page) {
  await settle(p);
  await p.locator('#play').evaluate((b) => {
    if (b.getAttribute('aria-pressed') === 'true') b.click();
  });
  await settle(p);
}
/** Click a card and wait until it has played up to its still and parked there. */
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  await settle(p);
  const parked = await until(
    p,
    ([id, still]) => {
      const s = window.RATIONAL_DEBUG.state;
      return s.preset === id && !s.blending && !s.playing && Math.abs(s.t - still) < 1e-12;
    },
    [card, CARDS[card].still],
    // the clock advances at most 0.1 s per frame: with VIZ_SLOW_FRAMES=1000 a 3 s sweep takes ~30 frames
    150000
  );
  if (!parked) await pause(p);
  await settle(p);
  return parked;
}
/** The code lines of the five cards (the longest is e · θ ≠ 0: |(1 + iθ/N)ᴺ|² > 1) stay inside their buttons, unclipped. */
async function codeChecks(p, where) {
  const codes = await p.evaluate(() => [...document.querySelectorAll('#presets .preset')].map((b) => {
    const c = b.querySelector('.code'),
      range = document.createRange();
    range.selectNodeContents(c);
    const t = range.getBoundingClientRect(),
      box = b.getBoundingClientRect();
    return { text: c.textContent, left: t.left - box.left, right: box.right - t.right, over: Math.max(b.scrollWidth - b.clientWidth, b.scrollHeight - b.clientHeight, c.scrollWidth - c.clientWidth) };
  }));
  check(`${where}: the code lines of the five cards do not overflow their buttons`, codes.length === 5 && codes[1].text === 'e · θ ≠ 0: |(1 + iθ/N)N|² > 1' && codes.every((c) => c.left >= 0 && c.right >= 0 && c.over <= 0), JSON.stringify(codes));
}
/** The marks of σ on the stage: the violet ring (σ = i = Q(σ)), the violet bead, or none. */
const sigmaMarks = (p = page) => p.evaluate(() => window.TRV.solids[0].marks().map((k) => k.key).filter((k) => k === 'sigma' || k === 'sigmaRing'));
/** σ = u·i with u = tan(θ/2) is i, the point Q(σ), only at θ = 90°: ring and label “σ = i = Q(σ)” there; one degree away the bead
    and the approximate label, on every stage wide enough for it, with all labels apart. set(d): the page at θ = d°. */
async function sigmaChecks(p, where, set, figure = false) {
  for (const d of [89, 90, 91]) {
    await set(d);
    const s = await state(p),
      labels = await tagText(p),
      marks = await sigmaMarks(p),
      u = Math.tan((d * DEG) / 2),
      apart = norm(sub([0, u], [Math.cos(d * DEG), Math.sin(d * DEG)]));
    check(
      d === 90
        ? `${where}: θ = 90°: σ = i = Q(σ) is written and ringed`
        : `${where}: θ = ${d}°: σ ≈ ${u.toFixed(2)}·i is a bead ${apart.toFixed(3)} away from Q(σ), and no label says σ = i = Q(σ)`,
      near(s.theta, d * DEG, 1e-12) &&
        (d === 90
          ? near(apart, 0, 1e-12) && labels.includes('σ = i = Q(σ)') && same(marks, ['sigmaRing'])
          : apart > 0.015 && apart < 0.06 && !labels.some((t) => t.includes('σ = i')) && labels.includes(`σ ≈ ${u.toFixed(2)}·i`) && same(marks, ['sigma'])),
      JSON.stringify([s.theta, labels, marks, apart])
    );
    await layout(p, `${where} θ = ${d}°`, figure);
  }
}
/** The text of the areas, all of it (both languages, hidden blocks too), with ¶ between the blocks and the two languages. */
const areaTexts = (p = page, areas = ['#hudTl', '#readouts', '#basis', '#drawer']) =>
  p.evaluate((areas) => {
    TRV.kit.flush();
    return areas.map((sel) => {
      const el = document.querySelector(sel).cloneNode(true);
      for (const x of el.querySelectorAll('*'))
        if (!/^(?:A|B|CODE|EM|OUTPUT|STRONG|SUB|SUP)$/.test(x.tagName) && !(x.tagName === 'SPAN' && !/\b(?:zh|en|big|sub|aside|ok)\b/.test(x.className))) {
          x.prepend('¶');
          x.append('¶');
        }
      return el.textContent.replace(/\s+/g, ' ');
    });
  }, areas);
const textOf = async (id, p = page) => (await p.locator('#' + id).innerText()).replaceAll('−', '-');
const tagText = (p = page) => p.locator('.stage .tags .tag:not([hidden])').allInnerTexts();
async function layout(p, label, figure = false) {
  const view = await stageView(p, '#stage', figure);
  const issues = [...view.layout, ...view.hud, ...(await labelOverlaps(p, '.stage .tag', 0)), ...(await capitalGreek(p))];
  check(label + ' framing and legible labels', !issues.length && (await overflowX(p)) === 0, JSON.stringify(issues));
}

/* ---------- independent checks of the mathematics ---------- */
// π: the domes ν = 1 … 4 and the polygons
const domes = [1, 2, 3, 4].map((nu) => dome(nu));
const pageDefects = await page.evaluate(() => [1, 2, 3, 4].map((nu) => window.RATIONAL_DEBUG.defects(nu)));
for (const [k, d] of domes.entries()) {
  const nu = k + 1,
    mine = [...d.defects].sort((a, b) => a - b),
    theirs = [...pageDefects[k]].sort((a, b) => a - b);
  check(
    `ν = ${nu}: V = 10ν² + 2 = ${d.V}, E = 30ν², F = 20ν², V − E + F = 2, every defect positive and Σδ = 4π (720°)`,
    d.V === 10 * nu * nu + 2 && d.E === 30 * nu * nu && d.F === 20 * nu * nu && d.V - d.E + d.F === 2 && d.defects.every((x) => x > 0) && near(d.sum, 4 * PI, 1e-9)
  );
  check(`ν = ${nu}: the page has the same vertex defects (sorted, to 10⁻⁹)`, mine.length === theirs.length && mine.every((x, i) => near(x, theirs[i], 1e-9)));
  check(`ν = ${nu}: the ℤ₂ face boundary has rank F − 1 = E − V + 1 (kernel: empty set and all faces)`, d.rank === d.F - 1 && d.rank === d.E - d.V + 1, String(d.rank));
}
check('ν²·largest defect: 1.0472, 1.2374, 1.3353, 1.3436 for ν = 1 … 4', same(domes.map((d, k) => f4((k + 1) ** 2 * d.max)), ['1.0472', '1.2374', '1.3353', '1.3436']));
const dome30 = dome(30, false),
  NU2_LIMIT = (6 * Math.sqrt(3)) / (3 * PHI + 2);
{
  const s = await state();
  check(
    'ν = 30: ν²·largest defect 1.5141 (independent count), below and near 6√3/(3φ + 2) = 1.5162; the page agrees',
    f4(900 * dome30.max) === '1.5141' && 900 * dome30.max < NU2_LIMIT && NU2_LIMIT - 900 * dome30.max < 0.003 && f4(NU2_LIMIT) === '1.5162' && near(s.fine.nu2max, 900 * dome30.max, 1e-9),
    String(900 * dome30.max)
  );
}

/* ---------- the NUM box and the drawer as rendered: every number against a value computed here ---------- */
const about = (x, d = 4) => `≈ ${x.toFixed(d)}`;
const digitsOf = (n, set) => String(n).replace(/\d/g, (d) => set[d]);
/** The modulus of (s − 1)/s at s = re − iu/2. */
const cayleyModulus = (re, u) => Math.sqrt(((re - 1) ** 2 + (u * u) / 4) / (re * re + (u * u) / 4));
/** What the box and the spans of the drawer say at the frame (N, θ), with the checks over the Fibonacci steps 1 … steps, the step n written
    out, and orbits of `orbit` steps: [the spans by name, the phrases of the box], in a language. */
function expectedBench(lang, { N, theta, steps, n, orbit }) {
  const zh = lang === 'zh',
    list = zh ? '、' : ', ',
    value = (law, v) => law + (zh ? `（值 ${v}）` : ` (value ${v})`),
    all = (k) => (zh ? `${k} 条全部成立` : `all ${k} hold`),
    escape = value(`|z${digitsOf(N, '₀₁₂₃₄₅₆₇₈₉')}|² > 1`, about((1 + (theta / N) ** 2) ** N)),
    compound = value(`(1 + 1/${N})${digitsOf(N, SUP)} < e`, about(floatN([BigInt(N + 1) ** BigInt(N), BigInt(N) ** BigInt(N)]))),
    off = value('|(s − 1)/s| < 1', about(cayleyModulus(0.6, theta === PI / 2 ? 1 : Math.tan(theta / 2)))),
    sums = [...new Set(domes.map((d) => `= ${(d.sum / DEG).toFixed(2)}°`))].join(', '),
    nu2 = domes.map((d, k) => f4((k + 1) ** 2 * d.max)),
    // the pairs of vertices of the icosahedron (0, ±1, ±φ), (±1, ±φ, 0), (±φ, 0, ±1), by their κ from the first
    ico = [-1, 1].flatMap((a) => [-1, 1].flatMap((b) => [[0, a, b * PHI], [a, b * PHI, 0], [b * PHI, 0, a]])).map(unit),
    ks = ico.slice(1).map((v) => kap(ico[0], v)).sort((a, b) => b - a),
    five = ico.map((v) => ico.filter((w) => near(kap(v, w), ks[0], 1e-9)).length),
    // the first return of the heap of κ₁ = p/q by its angle (another route than the integers of the page)
    back = [[1, 1], [3, 4], [1, 2], [1, 3], [1, 4], [0, 1]].map(([p, q]) => {
      const { xs } = heapOf(p / q, orbit);
      return [q === 1 ? `${p}` : `${p}/${q}`, xs.findIndex((x, k) => k > 0 && norm(sub(x, xs[0])) < 1e-6)];
    }),
    returning = back.filter(([, k]) => k > 0).sort((a, b) => a[1] - b[1]),
    never = back.filter(([, k]) => k < 0).map(([name]) => name),
    series = inverseSeriesExact(3).map(([p, q]) => (q === 1n ? `${p}` : `${p}/${q}`.replace('-', '−'))),
    ratios = Array.from({ length: n }, (_, k) => fracN(FIB[k + 3], FIB[k + 2])).map(([p, q]) => (q === 1n ? `${p}` : `${p}/${q}`)),
    kn = fracN(FIB[n + 2], 4n * FIB[n]),
    rest = fracN(n % 2 ? -1n : 1n, FIB[n] ** 2n),
    frac = ([p, q]) => `${p}/${q}`.replace('-', '−'),
    sub1 = domes[0];
  let lo = 0,
    hi = 1;
  for (let k = 0; k < 80; k++) {
    const t = (lo + hi) / 2;
    if (Math.cos(t) > t) lo = t;
    else hi = t;
  }
  const spans = {
    sagitta: about(1 - Math.cos(PI / N)),
    sagittaBounds: null, // audited on fractions below
    defectSum: sums,
    nu2First: `≈ ${nu2[0]}`,
    nu2Last: `≈ ${nu2[3]}`,
    nu2Limit: about(NU2_LIMIT),
    escape,
    compound,
    kStar: about(KSTAR),
    kConj: about(KCONJ),
    icoNear: about(ks[0]),
    icoFar: about(ks[9])
  };
  const phrases = [
    `1 − cos(π/${N}) ${spans.sagitta}`,
    `Σδ ${sums}`,
    zh ? `ν²·最大角亏 ≈ ${nu2.join('、')}（ν = 30 时 ${about(900 * dome30.max)}，向手工推导的极限 6√3/(3φ + 2) ${spans.nu2Limit} 靠近）` : `ν²·largest defect ≈ ${nu2.join(', ')} (${about(900 * dome30.max)} at ν = 30, approaching the limit 6√3/(3φ + 2) ${spans.nu2Limit} derived by hand)`,
    `V − E + F = ${[...new Set(domes.map((d) => d.V - d.E + d.F))].join(list)}`,
    `F − 1 = E − V + 1${zh ? '，' : ', '}${all(domes.filter((d) => d.rank === d.F - 1 && d.rank === d.E - d.V + 1).length)}`,
    zh ? `（ν = 1：${sub1.V} − ${sub1.E} + ${sub1.F} = ${sub1.V - sub1.E + sub1.F}，秩 ${sub1.rank}）` : `(ν = 1: ${sub1.V} − ${sub1.E} + ${sub1.F} = ${sub1.V - sub1.E + sub1.F}, rank ${sub1.rank})`,
    zh ? `θ = ${Math.round(theta / DEG)}°、N = ${N} 时 ${escape}，${compound}，‖Q(σ)‖² = 1.0000` : `at θ = ${Math.round(theta / DEG)}° and N = ${N}, ${escape}, ${compound}, ‖Q(σ)‖² = 1.0000`,
    zh ? `凯莱比的模在 Re s = 1/2 上 = 1.0000，在 Re s = 0.6 上 ${off}` : `the modulus of the Cayley ratio is = 1.0000 on Re s = 1/2, while at Re s = 0.6, ${off}`,
    zh ? `κ₁ = ${returning.map((x) => x[0]).join('、')} 的轨道在第 ${returning.map((x) => x[1]).join('、')} 步回到 x₀，κ₁ = ${never.join('、')} 的前 ${orbit} 步都不回到 x₀` : `the orbits of κ₁ = ${returning.map((x) => x[0]).join(', ')} return to x₀ at steps ${returning.map((x) => x[1]).join(', ')}, and that of κ₁ = ${never.join(', ')} does not return within ${orbit} steps`,
    zh ? 'κ₁ = 1/4 时 κ₂ = 1/4、κ₃ = 1，共面恒等式给出定心 det G₃ = 0.0000' : 'at κ₁ = 1/4, κ₂ = 1/4, κ₃ = 1 and, by the coplanar identity, the centered det G₃ = 0.0000',
    `T = 2π${zh ? '（扫描得 ' : ' (found by a scan, '}${about(2 * PI)}`,
    '2π²/T² = 1/2',
    `b₁ = ${series[1]}${zh ? '，' : ', '}b₃ = ${series[3]}`,
    zh ? `前 62 项在 π 处的部分和 ${about((lo + hi) / 2, 8)}` : `first 62 terms have at π the partial sum ${about((lo + hi) / 2, 8)}`,
    `(φ + 1)/4 ${spans.kStar}`,
    `(2 − φ)/4 ${spans.kConj}`,
    `(φ + 2)/5 ${spans.icoNear}`,
    `(3 − φ)/5 ${spans.icoFar}`,
    zh ? `（${ico.length} 个顶点，每个顶点 ${[...new Set(five)].join('、')} 个三角形）` : `(${ico.length} vertices, ${[...new Set(five)].join(', ')} triangles per vertex)`,
    zh ? `对跖顶点对读 κ = ${Math.abs(ks[10]) < 1e-12 ? 0 : ks[10]}` : `antipodal pairs read κ = ${Math.abs(ks[10]) < 1e-12 ? 0 : ks[10]}`,
    zh ? `斐波那契比 ${ratios.join('、')} …，前 ${steps} 个里不动点 ${Array.from({ length: steps }, (_, k) => [FIB[k + 3], FIB[k + 2]]).filter(([p, q]) => p * p === p * q + q * q).length} 个` : `Fibonacci ratios ${ratios.join(', ')}, …, of whose first ${steps} the number of fixed points is ${Array.from({ length: steps }, (_, k) => [FIB[k + 3], FIB[k + 2]]).filter(([p, q]) => p * p === p * q + q * q).length}`,
    `n = 0 … ${steps}${zh ? '，' : ', '}${all(Array.from({ length: steps + 1 }, (_, k) => FIB[k] * FIB[k + 2] - FIB[k + 1] ** 2n === (k % 2 ? 1n : -1n)).filter(Boolean).length)}`,
    zh ? `n = ${n} 时 κ${digitsOf(n, '₀₁₂₃₄₅₆₇₈₉')} = ${frac(kn)}，余数 ${frac(rest)}` : `κ${digitsOf(n, '₀₁₂₃₄₅₆₇₈₉')} = ${frac(kn)} and remainder ${frac(rest)} at n = ${n}`,
    `n = 1 … ${steps}${zh ? '），' : '), '}${all(Array.from({ length: steps }, (_, k) => hurwitzN(k + 1)).filter(({ gap }) => gap[0][0] > 0n).length)}`,
    zh ? '225 个有理点（σ = (a/d, b/d)，d ≤ 3，|a|、|b| ≤ 2d）的 ‖Q(σ)‖² − 1 用整数算最大是 0，核对 κ(1, Q(σ)) = 1/(1 + ‖σ‖²)，225 条全部成立，σ = (1, 1) 时为 1/3。' : 'for the 225 rational points (σ = (a/d, b/d), d ≤ 3, |a|, |b| ≤ 2d) the largest ‖Q(σ)‖² − 1 in integer arithmetic is 0, and κ(1, Q(σ)) = 1/(1 + ‖σ‖²), all 225 hold; it is 1/3 at σ = (1, 1).'
  ];
  return { spans, phrases };
}
/** The audit of a page: the box, its copy and the spans of the drawer against the numbers computed here; [] or what is wrong. */
async function auditBench(p, frame) {
  const seen = await p.evaluate(() => ({
      box: Object.fromEntries(['zh', 'en'].map((l) => [l, document.querySelector('#basis .lean.num .' + l).textContent.replace(/\s+/g, ' ').trim()])),
      copy: Object.fromEntries(['zh', 'en'].map((l) => [l, document.querySelector('#drawerEvidence .lean.num .' + l).textContent.replace(/\s+/g, ' ').trim()])),
      spans: Object.fromEntries(['zh', 'en'].map((l) => [l, [...document.querySelectorAll(`#drawer .${l} [data-bench]`)].map((e) => [e.dataset.bench, e.textContent.replace(/\s+/g, ' ')])])),
      bench: window.RATIONAL_DEBUG.bench(),
      twice: [...document.querySelectorAll('[id]')].map((e) => e.id).filter((x, i, a) => a.indexOf(x) !== i)
    })),
    bad = [];
  if (!same(seen.box, seen.copy)) bad.push('the copy in the drawer');
  if (seen.twice.length) bad.push('ids twice: ' + seen.twice.join(' '));
  for (const lang of ['zh', 'en']) {
    const { spans, phrases } = expectedBench(lang, frame),
      text = seen.box[lang];
    bad.push(...phrases.filter((x) => text.split(x).length !== 2).map((x) => `${lang} box: ${x}`));
    if (text.includes('—') || text.includes('undefined') || text.includes('NaN') || text.includes('null')) bad.push(`${lang} box: not filled`);
    // the inequalities of the box on fractions: the sagitta, the tail and Hurwitz
    const tail = new RegExp(`(≈ ${NUMBER}(?:，上界|, bound)) \\(θ${frame.N}/${frame.N}!\\)/\\(1 − θ/${frame.N + 1}\\) (≤ ${NUMBER})`).exec(text);
    for (const said of [auditSagitta(frame.N, text), tail ? auditTail(frame.N, frame.theta, `${tail[1]} ${tail[2]}`) : 'the tail', auditHurwitz(frame.n, text)]) if (said) bad.push(`${lang} box: ${said}`);
    // the drifts: the least power of ten above each, never above 10⁻¹⁴
    const drifts = [...text.matchAll(/(?:浮点偏差|floating-point drift|相差|iterating cos by) (= 0|< 10⁻([⁰¹²³⁴⁵⁶⁷⁸⁹]+))/g)],
      values = ['cheb', 'dist', 'gram', 'double', 'ray'].map((k) => seen.bench.drift[k]).concat(seen.bench.series.gap);
    if (drifts.length !== 6 || !drifts.every((m, k) => (values[k] === 0 ? m[1] === '= 0' : !!m[2] && cmpN(doubleN(values[k]), [1n, 10n ** BigInt(m[2].replace(/./g, (d) => SUP.indexOf(d)))]) < 0 && cmpN(doubleN(values[k]), [1n, 10n ** (BigInt(m[2].replace(/./g, (d) => SUP.indexOf(d))) + 1n)]) >= 0 && Number(m[2].replace(/./g, (d) => SUP.indexOf(d))) >= 14))) bad.push(`${lang} box: the drifts ${JSON.stringify([drifts.map((m) => m[1]), values])}`);
    // the spans of the drawer, each by its name
    if (!same(seen.spans[lang].map((x) => x[0]), BENCH_KEYS)) bad.push(`${lang} spans: ${seen.spans[lang].map((x) => x[0]).join(' ')}`);
    for (const [key, t] of seen.spans[lang]) if (key === 'sagittaBounds' ? auditSagitta(frame.N, t) !== '' || !text.includes(t) : t !== spans[key]) bad.push(`${lang} drawer ${key}: ${t}`);
    bad.push(...[...mixed(text), ...seen.spans[lang].flatMap(([, t]) => mixed(t))].map((x) => `${lang} chained: ${x}`));
  }
  // the drifts again from the points of the six heaps: T_n of the rational c = 2κ₁ − 1 in integers, the norms, κ = 1 − chord²/4
  const { heaps } = seen.bench;
  if (!same(heaps.map((h) => h.q), [[1, 1], [3, 4], [1, 2], [1, 3], [1, 4], [0, 1]])) bad.push('the six κ₁');
  for (const { q: [p1, q1], m } of heaps) {
    const c = BigInt(2 * p1 - q1),
      d = BigInt(q1);
    let a = 1n,
      b = c,
      top = 1n;
    for (let k = 0; k <= 12; k++) {
      const x = m.heap.xs[k],
        t = subN(doubleN(dot(m.heap.xs[0], x)), [a, top]),
        n1 = subN(doubleN(dot(x, x)), [1n, 1n]);
      if ([t, n1].some(([u, v]) => cmpN([u < 0n ? -u : u, v < 0n ? -v : v], [1n, 10n ** 14n]) >= 0)) bad.push(`the heap of ${p1}/${q1} at n = ${k}`);
      if (k <= 6 && Math.abs(kap(m.heap.xs[0], x) - (1 - dot(sub(m.heap.xs[0], x), sub(m.heap.xs[0], x)) / 4)) >= 1e-14) bad.push(`κ − (1 − chord²/4) of ${p1}/${q1} at n = ${k}`);
      [a, b] = [b, 2n * c * b - d * d * a];
      top *= d;
    }
  }
  return bad;
}
{
  const bad = await auditBench(page, { N: 6, theta: PI / 2, steps: 30, n: 5, orbit: 240 });
  check('NUM: the box in both languages, its copy and the twelve spans of the drawer are the numbers computed here (N = 6, θ = 90°, n = 5, Fibonacci steps to 30, orbits of 240 steps), each drift the least power of ten above it', !bad.length, bad.slice(0, 6).join(' | '));
  for (const x of PRINTED) check(`NUM: ${x} is rendered in the box (#basis) and in the drawer, in both languages`, [numBox, numCopy].every((b) => b.zh.includes(x) && b.en.includes(x)), x);
  for (const x of EXACT.filter((x) => !/^10⁻/.test(x))) check(`NUM: ${x} is rendered in the box (#basis) and in the drawer, in both languages`, [numBox, numCopy].every((b) => b.zh.includes(x) && b.en.includes(x)), x);
}
{
  // the same sources with another frame: every number of the box and of the drawer follows it, so none of them is written down
  const patches = [
    ['N: 6, theta: PI / 2, k1: 0.25, lambda: 1, probe: [6, 6] }', 'N: 7, theta: gridTheta(240), k1: 0.25, lambda: 1, probe: [6, 6] }'],
    ['const STEPS = 30;', 'const STEPS = 24;'],
    ['const SHOWN = 5;', 'const SHOWN = 6;'],
    ['const ORBIT = 240;', 'const ORBIT = 120;']
  ];
  const p = await T.open(BOOK, ID, '?lang=zh', { reducedMotion: 'reduce' });
  await p.route(`**/${ID}/main.js*`, (route) => route.fulfill({ contentType: 'text/javascript; charset=utf-8', body: patches.reduce((js, [from, to]) => js.replace(from, to), sources['main.js']) }));
  await p.reload({ waitUntil: 'load' });
  await settle(p);
  const bad = await auditBench(p, { N: 7, theta: (240 / 720) * PI, steps: 24, n: 6, orbit: 120 });
  check('NUM: served with the frame N = 7, θ = 60°, n = 6, 24 Fibonacci steps and orbits of 120 steps, the box and the drawer follow it (they are computed, not written)', patches.every(([from]) => sources['main.js'].split(from).length === 2) && !bad.length, bad.slice(0, 6).join(' | '));
  await p.context().close();
}
// the sagitta, its accumulated bounds and the rational polygon readings (Niven)
for (const N of [3, 4, 5, 6, 7, 12, 48]) {
  const s = 1 - Math.cos(PI / N),
    a = PI / N;
  check(`N = ${N}: sagitta > 0 and N(a²/2 − a⁴/24) ≤ N(1 − cos a) ≤ N a²/2`, s > 0 && N * (a * a / 2 - a ** 4 / 24) <= N * s + 1e-15 && N * s <= (N * a * a) / 2 + 1e-15 && N * (a * a / 2 - a ** 4 / 24) > 0);
}
// the page at N = 12, ν = 2 and back
await pick(PI_CARD);
{
  const s = await state();
  check(
    'the π card opens by default and parks on N = 6, ν = 1: sagitta 0.1340, accumulated 0.8038 in [0.80368, 0.82247], Σδ = 720.00°, κ = 3/4',
    s.preset === PI_CARD && s.scene === 'pi' && s.N === 6 && s.nu === 1 && f4(s.pi.sag) === '0.1340' && f4(s.pi.acc) === '0.8038' && s.pi.lo.toFixed(5) === '0.80368' && s.pi.hi.toFixed(5) === '0.82247' && s.pi.sumDeg.toFixed(2) === '720.00' && same(s.pi.kNq, [3, 4]),
    JSON.stringify(s.pi)
  );
  check('π card: the lean instances (sagitta bounds and face cycles) are the numbers above', near(s.leanInstances.sag.value, 6 * (1 - Math.cos(PI / 6)), 1e-12) && s.leanInstances.face.chi === 2 && s.leanInstances.face.rank === 19 && s.leanInstances.face.kernel === 1 && s.leanInstances.face.all);
  const note = await page.textContent('#roNote');
  check('π card: the note lists ν²·largest defect for ν = 1 … 4, the ν = 30 dome and the limit', ['1.0472', '1.2374', '1.3353', '1.3436', '1.5141', '1.5162'].every((x) => note.includes(x)), note);
}
// the formatters that round one side of an inequality: outwards always (the printed decimal itself, not its double), and by one
// unit of the last digit at most
{
  let seed = 20261122;
  const rand = () => (seed = (seed * 48271) % 2147483647) / 2147483647;
  const xs = [0, 1, 0.1, 0.0001, 1e-4, 0.3, 0.7, 0.1028, 0.10277167930707937, 0.8036766995055169, 9.9996e-8, 9.9994e-8, 1e-5, 1.0005e-5, 9.9995e-5, 5e-324, 1e-310, 2.5e-308, 1e-300, 0.001, 0.00099999, 999.99999, 1000, 0.0022, 5.545e-57, 0.5, 0.0625];
  for (let k = 0; k < 4000; k++) xs.push(rand() * 10 ** (3 * rand() - 2), 10 ** (-320 * rand()), Math.round(rand() * 1e4) / 1e4);
  // decimals of four significant digits: the double beside each lies above it or below it
  for (let k = 0; k < 2000; k++) xs.push(Number(`${1000 + Math.floor(9000 * rand())}e${Math.floor(-300 * rand()) - 3}`));
  const negative = [-0.10277, -0.5, -1e-4, -0.3, -0.7];
  const rows = await page.evaluate((list) => {
    const { fmtFloor, fmtCeil, sci, sciFloor, sciCeil } = window.RATIONAL_DEBUG.print;
    return list.map((x) => [fmtFloor(x), fmtCeil(x), sciFloor(x), sci(x), sciCeil(x)]);
  }, [...xs, ...negative]);
  const bad = [];
  for (const [i, x] of [...xs, ...negative].entries()) {
    const v = doubleN(x),
      [lo, hi, a, mid, b] = rows[i].map(decimalN);
    if (!(cmpN(lo, v) <= 0 && cmpN(v, hi) <= 0 && cmpN(subN(hi, lo), [1n, 10n ** 4n]) <= 0)) bad.push(['fmt', x, ...rows[i].slice(0, 2)]);
    if (!(cmpN(a, v) <= 0 && cmpN(v, b) <= 0 && cmpN(a, mid) <= 0 && cmpN(mid, b) <= 0 && (x > 0 ? a[0] > 0n : x === 0 ? a[0] === 0n && b[0] === 0n : b[0] < 0n))) bad.push(['sci', x, ...rows[i].slice(2)]);
    if (x > 1e-300 && cmpN(subN(b, a), [v[0] * 11n, v[1] * 10n ** 4n]) > 0) bad.push(['sci width', x, ...rows[i].slice(2)]);
    // a decimal that is the double itself stays itself
    if ([0, 1, 0.5, 0.0625, -0.5].includes(x) && rows[i][0] !== rows[i][1]) bad.push(['itself', x, ...rows[i].slice(0, 2)]);
  }
  check(`fmtFloor ≤ x ≤ fmtCeil and 0 < sciFloor ≤ x ≤ sciCeil as exact decimals on ${rows.length} numbers from 10⁻³²⁴ to 10³, within one unit of the last digit, 0 stays 0`, rows.length === xs.length + 5 && xs.length > 14000 && !bad.length, JSON.stringify(bad.slice(0, 3)));
}
// N = 3 … 48: the accumulated sagitta as printed, in both languages, against π to 60 digits in integers
check('π to 60 digits: 16 atan(1/5) − 4 atan(1/239)', String(PI60).startsWith('3141592653589793238462643383279502884197169399375105820974'));
{
  await pick(PI_CARD);
  const rows = await page.evaluate(() => {
    const out = [];
    for (let N = 3; N <= 48; N++) {
      const el = document.getElementById('now');
      el.value = String((N - 3) / 45);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      for (const lang of ['en', 'zh']) {
        document.querySelector(`[data-lang-set="${lang}"]`).click();
        TRV.kit.flush();
        const s = window.RATIONAL_DEBUG.state;
        out.push({ N, lang, preset: s.preset, at: s.N, sag: s.leanInstances.sag, note: document.getElementById('roNote').textContent });
      }
    }
    return out;
  });
  const bad = [];
  for (const r of rows) {
    const { lo, value, hi } = sagittaN(r.N),
      said = auditSagitta(r.N, r.note);
    const ok =
      r.at === r.N &&
      r.preset === PI_CARD &&
      r.note.includes(r.lang === 'zh' ? '（当前值 ' : ' (value ') &&
      said === '' &&
      !mixed(r.note).length &&
      // the doubles of the state lie outside the two bounds, no further than 10⁻¹³, and enclose the value
      cmpN(doubleN(r.sag.lo), lo[0]) < 0 &&
      cmpN(doubleN(r.sag.hi), hi[1]) > 0 &&
      near(r.sag.lo, floatN(lo[0]), 1e-13) &&
      near(r.sag.hi, floatN(hi[1]), 1e-13) &&
      near(r.sag.value, floatN(value[0]), 1e-13) &&
      r.sag.lo < r.sag.value &&
      r.sag.value < r.sag.hi;
    if (!ok) bad.push([r.N, r.lang, said, r.sag, r.note.slice(0, 90)]);
  }
  const at = (N, lang) => rows.find((r) => r.N === N && r.lang === lang).note;
  // (3(1 − cos 60°) = 1.5000 is the value itself)
  check('π card, N = 3 … 48 in both languages: printed lo ≤ N(s²/2 − s⁴/24) < N(1 − cos s) < N s²/2 ≤ printed hi within a unit (π to 60 digits, fractions), and the value beside them to the nearest', rows.length === 92 && !bad.length, JSON.stringify(bad.slice(0, 2)));
  check(
    'π card, N = 48: 0.1027 ≤ … ≤ 0.1029, value ≈ 0.1028; N = 6: 0.8036 ≤ … ≤ 0.8225, value ≈ 0.8038 (the lower bound is 0.80367669…)',
    [['en', (v) => ` (value ≈ ${v})`], ['zh', (v) => `（当前值 ≈ ${v}）`]].every(([l, say]) => at(48, l).includes(`0.1027 ≤ N(1 − cos(π/N)) ≤ 0.1029${say('0.1028')}`) && at(6, l).includes(`0.8036 ≤ N(1 − cos(π/N)) ≤ 0.8225${say('0.8038')}`)),
    at(48, 'en')
  );
  await pick(PI_CARD);
}
await input('#nRange', 12);
await page.click('[data-nu="2"]');
await settle(page);
{
  const s = await state();
  check('N slider and ν chip: N = 12, ν = 2, sagitta 0.0341, 42 vertices, Σδ = 720.00°, κ = cos²(π/12) is irrational', s.N === 12 && s.nu === 2 && f4(s.pi.sag) === '0.0341' && s.pi.V === 42 && s.pi.sumDeg.toFixed(2) === '720.00' && s.pi.kNq === null && s.preset === null);
  check('N = 12 sits on the rail: t = 9/45, and the rail and the slider read N = 12', near(s.t, 9 / 45, 1e-12) && (await page.textContent('#tau')).trim() === 'N = 12' && (await page.textContent('#nOut')) === '= 12');
  for (const N of [3, 4, 6]) {
    await input('#nRange', N);
    const r = await state();
    check(`N = ${N}: κ = cos²(π/N) is the rational ${['1/4', '1/2', '3/4'][[3, 4, 6].indexOf(N)]}`, same(r.pi.kNq, [[1, 4], [1, 2], [3, 4]][[3, 4, 6].indexOf(N)]) && near(r.pi.kN, Math.cos(PI / N) ** 2, 1e-12));
    const pill = await page.textContent('#keyPill');
    check(`N = ${N}: the pill calls the fraction a rational reading`, /^有理读数/.test(pill) && pill.includes(`κ = ${['1/4', '1/2', '3/4'][[3, 4, 6].indexOf(N)]}`) && !/[∉≈]/.test(pill), pill);
  }
  // N = 5: κ = cos²(π/5) = (φ + 1)/4 is irrational (Niven); the constant-free lens says so and never calls it rational
  await input('#nRange', 5);
  const five = await state();
  check('N = 5: κ = cos²(π/5) = (φ + 1)/4 ≈ 0.6545, no fraction, in the default lens', five.lens === 0 && five.pi.kNq === null && near(five.pi.kN, KSTAR, 1e-12));
  for (const [lang, sphere, rational] of [
    ['en', 'sphere reading', 'rational reading'],
    ['zh', '球面读数', '有理读数']
  ]) {
    await page.click(`[data-lang-set="${lang}"]`);
    await settle(page);
    const pill = await page.textContent('#keyPill'),
      title = await page.textContent('#hudTitle'),
      labels = (await page.locator('.stage .tags .tag:not([hidden])').allInnerTexts()).join(' | ');
    const said = [pill, title, labels].map((t) => t.replace(/\s+/g, ' '));
    check(
      `${lang}: N = 5: the pill is a sphere reading κ ≈ 0.6545 (κ ∉ ℚ), never a rational reading; the title and the label say it too, and no “=” or ∉ ℚ is put on the decimals`,
      pill.startsWith(sphere) &&
        !pill.includes(rational) &&
        said.every((t) => t.includes('≈ 0.6545 (κ ∉ ℚ)') && !/=\s*0\.6545[^0-9]*∉/.test(t) && !/=\s*0\.6545/.test(t) && !/0\.6545\s*∉/.test(t)) &&
        said[0].includes('κ ≈ 0.6545 (κ ∉ ℚ)') &&
        said[1].includes('κ ≈ 0.6545 (κ ∉ ℚ)') &&
        said[2].includes('κ(x₀, x₁) ≈ 0.6545 (κ ∉ ℚ)'),
      JSON.stringify(said)
    );
    await layout(page, `${lang}/desktop N = 5`);
  }
}
await page.click('[data-nu="1"]');
await settle(page);

// e: Euler steps against one Cayley step
await pick(E_CARD);
{
  const s = await state();
  const z2 = (1 + (PI / 2) ** 2 / 36) ** 6;
  check('the e card parks on θ = 90°, N = 6: |z₆|² = (1 + θ²/N²)⁶ > 1 (≈ 1.4885, rounded to 4 decimals), Q(σ) = i with ‖Q‖² = 1, σ = 1·i', s.scene === 'euler' && near(s.theta, PI / 2, 1e-12) && s.N === 6 && near(s.euler.z2, z2, 1e-12) && z2 > 1 && f4(s.euler.z2) === '1.4885' && near(s.euler.Q[0], 0, 1e-12) && near(s.euler.Q[1], 1, 1e-12) && near(s.euler.qNorm2, 1, 1e-15) && near(s.euler.u, 1, 1e-12));
  // the tangent steps by complex powers (polar form) against the page's step-by-step product
  const r = Math.sqrt(1 + (PI / 2) ** 2 / 36),
    a = Math.atan((PI / 2) / 6);
  check('the six tangent steps are (1 + iθ/6)ᵏ: radius rᵏ, angle k·atan(θ/6)', s.euler.pts.every(([x, y], k) => near(x, r ** k * Math.cos(k * a), 1e-12) && near(y, r ** k * Math.sin(k * a), 1e-12)));
  check('(1 + 1/6)⁶ < e, and (1 + 1/6)⁶ = 117649/46656 ≈ 2.5216 rounded to 4 decimals', f4(s.euler.compound) === '2.5216' && s.euler.compound < Math.E && near(s.euler.compound, 117649 / 46656, 1e-14));
  // exp_remainder_le: the Taylor tail by a long series, and the bound
  let re = 0,
    im = 0,
    tr = 1,
    ti = 0;
  for (let k = 0; k < 6; k++) {
    re += tr;
    im += ti;
    [tr, ti] = [(-ti * (PI / 2)) / (k + 1), (tr * (PI / 2)) / (k + 1)];
  }
  const left = Math.hypot(Math.cos(PI / 2) - re, Math.sin(PI / 2) - im),
    right = (PI / 2) ** 6 / 720 / (1 - PI / 2 / 7);
  check('exp tail at θ = 90°, N = 6: 0.0205 ≤ 0.0269, the page agrees', f4(left) === '0.0205' && f4(right) === '0.0269' && left <= right && near(s.leanInstances.tail.left, left, 1e-12) && near(s.leanInstances.tail.right, right, 1e-12));
  // cayley_ratio_norm_one_iff_critical_line: (s − 1)/s at s = 1/2 − i/2 is −Q = −i, of modulus 1; Re s = 0.6 gives 0.8198
  const ratio = (x, y) => {
    const d = x * x + y * y;
    return [((x - 1) * x + y * y) / d, (y * x - (x - 1) * y) / d];
  };
  const on = ratio(0.5, -0.5),
    off = ratio(0.6, -0.5);
  check('Cayley ratio on Re s = 1/2 is −Q(σ) with modulus 1; at Re s = 0.6 the modulus is 0.8198', near(on[0], 0, 1e-12) && near(on[1], -1, 1e-12) && near(Math.hypot(...on), 1, 1e-15) && f4(Math.hypot(...off)) === '0.8198' && near(s.leanInstances.cay.norm, 1, 1e-12) && f4(s.leanInstances.cay.off) === '0.8198' && s.leanInstances.cay.gapQ < 1e-12);
  check('continuous ray: κ(1, exp(t·i)) = cos²(t/2), T = 2π, H(i, i) = 1/2 = 2π²/T²', near(s.leanInstances.ray.H, 0.5, 1e-15) && near(s.leanInstances.ray.T, 2 * PI, 1e-15) && near(s.leanInstances.ray.law, 2 * PI ** 2 / (2 * PI) ** 2, 1e-15));
}
// every θ > 0 escapes, θ = 0 does not; the Cayley point stays on the circle; rational σ in ℚ³ by exact integers
{
  let escape = true;
  for (let N = 3; N <= 48; N++) for (let k = 1; k <= 18; k++) escape = escape && (1 + (k * 10 * DEG) ** 2 / (N * N)) ** N > 1;
  check('(1 + θ²/N²)ᴺ > 1 for θ = 10°, 20°, … 180° and N = 3 … 48; = 1 at θ = 0', escape && (1 + 0) ** 6 === 1);
  let exact = true;
  for (let a = -4n; a <= 4n; a++) for (let b = -4n; b <= 4n; b++) for (let c = -3n; c <= 3n; c++) for (const d of [1n, 2n, 3n, 5n]) {
    const n2 = a * a + b * b + c * c,
      D = d * d;
    exact = exact && (D - n2) ** 2n + 4n * D * n2 === (D + n2) ** 2n;
  }
  check('‖Q(σ)‖² = 1 exactly for σ = (a, b, c)/d ∈ ℚ³ (integers: (d² − n)² + 4d²n = (d² + n)²)', exact);
}
// the degenerate start of the e card: ⏮ puts θ = 0, and the notes say so (no escape)
await page.click('#rew');
await settle(page);
{
  const s = await state();
  const sub0 = await page.textContent('#hudSub'),
    note0 = await page.textContent('#presetNote'),
    tour0 = await page.textContent('#tour .tour-note');
  const claimsEscape = (t) => /> 1|逃出球外|off the sphere|escape;/.test(t.replace('no escape', '').replace('没有逸出', ''));
  check('⏮ on the e card: θ = 0, z₆ = 1, |z₆|² = 1, the card stays marked', s.theta === 0 && s.preset === E_CARD && s.euler.z2 === 1 && s.regime === 'zero');
  check(
    'θ = 0: the HUD line, the card note and the tour note say 1.0000 and no escape, never > 1',
    [sub0, note0, tour0].every((t) => t.includes('1.0000') && !claimsEscape(t) && /没有逸出|no escape/.test(t)),
    JSON.stringify([sub0, note0, tour0])
  );
}
// a tiny escape is written out: at θ = 1°, N = 48 the excess is 6.346·10⁻⁶ and the HUD never prints the value 1.0000 of |z₄₈|²
await input('#nRange', 48);
await input('#thetaRange', 1);
{
  const s = await state(),
    sub = await page.textContent('#hudSub'),
    excess = Math.expm1(48 * Math.log1p(DEG ** 2 / 48 ** 2));
  check('θ = 1°, N = 48: the excess 6.346×10⁻⁶ > 0 is written out on the HUD line', near(s.euler.excess, excess, 1e-15) && excess > 0 && sub.includes('|z48|² > 1（值 ≈ 1 + 6.346×10⁻⁶）') && !sub.includes('1.0000）') && !mixed(sub).length, sub);
}
// the Taylor tail keeps its digits at large N: at θ = 90°, N = 48 the two sides are 2.088·10⁻⁵² and 2.158·10⁻⁵²
{
  await input('#thetaRange', 90);
  const tail = (await state()).leanInstances.tail,
    mine = expTail(48, PI / 2),
    note = await page.textContent('#roNote'),
    [l, r] = printedTail(note);
  check(
    'θ = 90°, N = 48: the exponential tail is 2.088×10⁻⁵² ≤ 2.158×10⁻⁵² (nested sum, another route), never the rounding of a difference',
    tail.left <= tail.right && tail.left > 0 && tail.left < 1e-50 && near(tail.left / mine.left, 1, 1e-10) && near(tail.right / mine.right, 1, 1e-10) && tail.n === 48,
    JSON.stringify([tail, mine])
  );
  check('θ = 90°, N = 48: the remainder printed in the note is that of the state to the nearest, the bound that of the state from above', l <= r && near(l / tail.left, 1, 5.1e-4) && r >= tail.rightHi && near(r / tail.right, 1, 1.1e-3), note);
}
{
  // the theorem on the whole range (independent), then the page on a sample with both ends of the rail
  let bound = true;
  for (let N = 3; N <= 48; N++) for (let d = 1; d <= 180; d++) bound = bound && (({ left, right }) => left > 0 && left < right)(expTail(N, d * DEG));
  check('exp tail: 0 < left < right for N = 3 … 48 and θ = 1° … 180°; both are 0 at θ = 0', bound && expTail(6, 0).left === 0 && expTail(6, 0).right === 0);
  const bad = [];
  for (const N of [3, 24, 48])
    for (const d of [0, 1, 90, 179, 180]) {
      await input('#nRange', N);
      await input('#thetaRange', d);
      const s = await state(),
        t = s.leanInstances.tail,
        mine = expTail(N, d * DEG),
        [l, r] = printedTail(await page.textContent('#roNote'));
      const ok = d === 0 ? t.left === 0 && t.right === 0 && l === 0 && r === 0 : t.left < t.right && near(t.left / mine.left, 1, 1e-9) && near(t.right / mine.right, 1, 1e-9) && l <= r && l > 0;
      if (!ok) bad.push([N, d, t.left, t.right, mine.left, mine.right, l, r]);
    }
  check('exp tail on the page: left ≤ right in the state and in the note at N = 3, 24, 48 and θ = 0°, 1°, 90°, 179°, 180°', !bad.length, JSON.stringify(bad[0]));
  // the rail takes any θ: a tiny angle must not turn the inequality round by rounding
  await input('#nRange', 3);
  const tiny = [];
  for (const t of [1e-3, 1e-9, 1e-12, 3e-16]) {
    await input('#now', t);
    const x = (await state()).leanInstances.tail;
    if (!(x.left > 0 && x.left <= x.right)) tiny.push([t, x.left, x.right]);
  }
  check('exp tail: 0 < left ≤ right down to θ ≈ 10⁻¹⁵', !tiny.length, JSON.stringify(tiny));
}
// the printed tail on every N = 3 … 48 in both languages: the remainder to the nearest and the bound from above, as fractions at the
// double θ (also where θᴺ/N! is too small for a double), the two 0 at θ = 0 alone
{
  const rows = await page.evaluate(() => {
    const set = (id, v) => {
      const el = document.getElementById(id);
      el.value = String(v);
      el.dispatchEvent(new Event('input', { bubbles: true }));
    };
    const out = [];
    for (const lang of ['en', 'zh']) {
      document.querySelector(`[data-lang-set="${lang}"]`).click();
      for (let N = 3; N <= 48; N++) {
        set('nRange', N);
        for (const t of [0, 3e-16, 5e-13, 1e-9, 1e-5, 1 / 180, 0.1234567, 0.5, 179 / 180, 1]) {
          set('now', t);
          TRV.kit.flush();
          const s = window.RATIONAL_DEBUG.state;
          out.push({ lang, N, t, at: s.N, theta: s.theta, tail: s.leanInstances.tail, note: document.getElementById('roNote').textContent });
        }
      }
    }
    return out;
  });
  const bad = [];
  let below = 0;
  for (const r of rows) {
    const [sign, l, b] = printedTailText(r.note),
      x = r.tail;
    if (r.t === 0) {
      if (!(r.theta === 0 && sign === '=' && l === '0' && b === '0' && x.left === 0 && x.right === 0 && x.rightHi === 0 && !mixed(r.note).length)) bad.push([r.N, r.t, l, b]);
      continue;
    }
    const said = auditTail(r.N, r.theta, `${sign} ${l}${r.lang === 'zh' ? '，上界' : ', bound'} ≤ ${b}`);
    let ok = r.theta > 0 && r.at === r.N && sign === '≈' && said === '' && r.note.includes(`${l}${r.lang === 'zh' ? '，上界' : ', bound'} ≤ ${b}`) && !mixed(r.note).length;
    if (x.right >= 1e-290) {
      const bound = tailBoundN(r.N, r.theta),
        [low, high] = remainderSquaredN(r.N, r.theta);
      ok = ok && cmpN(squareN(doubleN(x.leftLo)), low) < 0 && cmpN(squareN(doubleN(x.leftHi)), high) > 0 && cmpN(doubleN(x.rightLo), bound) < 0 && cmpN(doubleN(x.rightHi), bound) > 0 && x.leftLo > 0 && near(x.leftHi / x.leftLo, 1, 3e-13) && near(x.rightHi / x.rightLo, 1, 3e-13);
    } else below++;
    if (!ok) bad.push([r.lang, r.N, r.t, said, sign, l, b, x]);
  }
  check('exp tail, N = 3 … 48 and ten θ from 0 to 180° (t = 3·10⁻¹⁶ too) in both languages: the printed remainder is the nearest, the printed bound an upper enclosure within 1.01 units of its last place, the doubles enclose both (fractions), “= 0 ≤ 0” at θ = 0 alone', rows.length === 920 && below > 40 && !bad.length, `${below} below the doubles; ${JSON.stringify(bad.slice(0, 3))}`);
}
// a tiny positive θ is a positive θ everywhere: no “θ = 0”, no “no escape”, no z₆ = 1, the excess written out
await pick(E_CARD);
for (const lang of ['en', 'zh']) {
  await page.click(`[data-lang-set="${lang}"]`);
  await settle(page);
  for (const t of [3e-16, 5e-13, 1e-9, 1e-5]) {
    await input('#now', t);
    for (const lens of [0, 1]) {
      const s = await state(),
        texts = { title: await page.textContent('#hudTitle'), sub: await page.textContent('#hudSub'), note: await page.textContent('#presetNote'), tour: await page.textContent('#tour .tour-note'), meta: await page.textContent('#plotMeta'), key: await page.textContent('#roKey'), clock: await page.textContent('#tau'), slider: await page.textContent('#thetaOut'), tags: (await tagText()).join(' | ') };
      const all = Object.values(texts),
        excess = (PI * t) ** 2 / 6, // (1 + θ²/36)⁶ − 1 to relative θ²
        sayExcess = [texts.sub, texts.note, ...(lens ? [texts.title, texts.tags] : [])],
        degs = 180 * t,
        th = [texts.sub, texts.note, texts.tour, texts.meta].map((x) => new RegExp(`θ ≈ (${NUMBER})°`).exec(x)),
        u = new RegExp(`u = tan\\(θ/2\\) ≈ (${NUMBER})`).exec(texts.note);
      check(
        `${lang}: rail t = ${t}, lens ${lens}: θ > 0 is live, θ and u are printed positive, |z₆|² > 1 (value ≈ 1 + ${excess.toExponential(3)}), nothing says θ = 0, no escape, z₆ = 1 or = 0.0000`,
        s.regime === 'live' &&
          s.preset === E_CARD &&
          s.lens === lens &&
          s.theta === PI * t &&
          s.euler.excess > 0 &&
          all.every((x) => !/θ = 0|没有逸出|no escape|z6 = (?:1|Q)\b|= 0\.00/.test(x)) &&
          sayExcess.every((x) => {
            const m = new RegExp(`\\|z6\\|² (?:> 1(?:（值| \\(value) )?≈ 1 \\+ (${NUMBER})`).exec(x);
            return !!m && near(parseNumber(m[1]) / excess, 1, 1e-3);
          }) &&
          [texts.sub, texts.note].every((x) => x.includes(lang === 'zh' ? '|z6|² > 1（值 ≈ 1 + ' : '|z6|² > 1 (value ≈ 1 + ')) &&
          all.every((x) => !mixed(x).length) &&
          near(parseNumber(bareText(texts.key)) / excess, 1, 1e-3) &&
          th.every((m) => !!m && near(parseNumber(m[1]) / degs, 1, 1e-3)) &&
          [texts.clock.replace('θ ', ''), texts.slider].every((x) => x.startsWith('≈ ') && near(parseNumber(bareText(x).replace('°', '')) / degs, 1, 1e-3)) &&
          !!u &&
          near(parseNumber(u[1]) / ((PI * t) / 2), 1, 1e-3) &&
          texts.tags.includes('σ ≈ ') &&
          !texts.tags.includes('σ = '),
        JSON.stringify([s.regime, s.theta, texts])
      );
      const marks = await sigmaMarks();
      check(`${lang}: rail t = ${t}, lens ${lens}: the stage marks σ and z₁ … z₆ for θ > 0 as the labels do`, same(marks, ['sigma']) && (await page.evaluate(() => window.TRV.solids[0].marks().filter((k) => /^z\d$/.test(k.key)).length)) === 6, JSON.stringify(marks));
      await layout(page, `${lang}/desktop t = ${t} lens ${lens}`);
      await page.click('#lensToggleBtn');
      await settle(page);
    }
  }
  // below the squares of the doubles the excess θ²/N is written from its logarithm
  await input('#now', 1e-200);
  const s = await state(),
    sub = await page.textContent('#hudSub'),
    m = new RegExp(`\\|z6\\|² > 1(?:（值| \\(value) ≈ 1 \\+ (${NUMBER})(?:）|\\))`).exec(sub);
  check(`${lang}: rail t = 10⁻²⁰⁰: still θ > 0, |z₆|² > 1 with its value 1 + θ²/6 written out`, s.regime === 'live' && s.theta > 0 && !!m && near(parseLog10(m[1]), 2 * Math.log10(PI * 1e-200) - Math.log10(6), 5e-4) && !/θ = 0|没有逸出|no escape/.test(sub), sub);
  // θ = 0 itself: ⏮, and Home on the rail keys
  await page.click('#rew');
  await settle(page);
  const zero = await state();
  check(`${lang}: ⏮ is θ = 0 itself: regime zero, z₆ = Q = 1 on the stage`, zero.theta === 0 && zero.regime === 'zero' && (await tagText()).includes('z6 = Q = 1') && same(await sigmaMarks(), []), JSON.stringify(await tagText()));
}
// u = tan(θ/2) is irrational at every rail position but θ = 0 and θ = 90°: beside 1/2 and 0.37 too it is only rounded
for (const lang of ['en', 'zh']) {
  await page.click(`[data-lang-set="${lang}"]`);
  await settle(page);
  for (const [t, want] of [
    [(2 * Math.atan(0.5)) / PI, 'σ ≈ 0.50·i'],
    [(2 * Math.atan(0.5000001)) / PI, 'σ ≈ 0.50·i'],
    [(2 * Math.atan(0.004)) / PI, 'σ ≈ 0.004000·i'],
    [(2 * Math.atan(0.37)) / PI, 'σ ≈ 0.37·i'],
    [1 / 3, 'σ ≈ 0.58·i']
  ]) {
    await input('#now', t);
    const labels = await tagText();
    check(`${lang}: u = tan(θ/2) = ${Math.tan((PI * t) / 2)}: the stage label is ${want}`, labels.includes(want) && labels.filter((x) => x.includes('σ') && x.includes('·i')).length === 1, JSON.stringify(labels));
  }
}
// 90° and 180° are the rail values 1/2 and 1 themselves, on the HUD, the label, the slider and the clock alike; 10⁻¹⁵ beside them
// (the next value a range input holds) θ is another angle, and 10⁻¹³ beside them too
for (const [t, theta, regime] of [
  [0.5, PI / 2, 'live'],
  [0.500000000000001, null, 'live'],
  [0.499999999999999, null, 'live'],
  [0.5 + 2e-13, null, 'live'],
  [0.5 - 2e-13, null, 'live'],
  [0.5 + 4e-12, null, 'live'],
  [1, PI, 'half'],
  [0.999999999999999, null, 'live'],
  [1 - 2e-13, null, 'live'],
  [1 - 4e-12, null, 'live']
]) {
  await input('#now', t);
  const s = await state(),
    sub = await page.textContent('#hudSub'),
    meta = await page.textContent('#plotMeta'),
    tau = (await page.textContent('#tau')).trim(),
    out = await page.textContent('#thetaOut'),
    labels = await tagText(),
    d = Math.round(2 * t) * 90;
  check(
    `rail t = ${t}: ${theta === null ? 'not a landmark: θ is approximate on every line and σ = i is not claimed' : 'the landmark itself, θ exact on every line'}`,
    s.regime === regime &&
      (theta === null
        ? Math.abs(s.theta - PI * t) < 1e-15 && s.theta !== PI / 2 && s.theta !== PI && sub.includes(`θ ≈ ${d}.00°`) && meta === `θ ≈ ${d}°` && tau === `θ ≈ ${d}.0°` && out === `≈ ${d}°` && !labels.includes('σ = i = Q(σ)')
        : s.theta === theta && s.thetaDeg === d && /θ = (?:90\.00|180)°/.test(sub) && meta === `θ = ${d}°` && tau === `θ = ${d}.0°` && out === `= ${d}°` && labels.includes('σ = i = Q(σ)') === (theta === PI / 2)),
    JSON.stringify([s.theta, s.regime, sub, meta, tau, out, labels])
  );
}
// the handle keys walk the grid of the rail and reach the ends exactly (a repeated sum would miss them by 10⁻¹⁵)
await pick(E_CARD);
await page.focus('#stageHandle');
for (let k = 0; k < 90; k++) await page.keyboard.press('ArrowLeft');
await settle(page);
check('ninety ArrowLeft on the handle from θ = 90° reach θ = 0 itself', (await state()).theta === 0 && (await state()).regime === 'zero', String((await state()).theta));
for (let k = 0; k < 180; k++) await page.keyboard.press('ArrowRight');
await settle(page);
check('and 180 ArrowRight reach θ = 180° itself', (await state()).theta === PI && (await state()).regime === 'half', String((await state()).theta));
await input('#nRange', 6);
await input('#thetaRange', 179);
{
  const s = await state(),
    note = await page.textContent('#roNote'),
    u = Math.tan((179 * DEG) / 2),
    off = Math.sqrt((0.16 + (u * u) / 4) / (0.36 + (u * u) / 4)),
    gap = 0.2 / (0.36 + (u * u) / 4) / (1 + off);
  check('θ = 179°: the modulus at Re s = 0.6 is below 1, by 3.046×10⁻⁵ (independent), the state agrees', near(s.leanInstances.cay.off, off, 1e-12) && near(s.leanInstances.cay.offGap / gap, 1, 1e-9) && off < 1 && 1 - off < 5e-5);
  check('θ = 179°: the note writes the gap of the Re s = 0.6 modulus and prints 1.0000 only for Re s = 1/2', note.includes('Re s = 1/2 上 = 1.0000；Re s = 0.6 上 |(s − 1)/s| < 1（值 ≈ 1 − 3.046×10⁻⁵）。') && (note.match(/1\.0000/g) || []).length === 1 && !mixed(note).length, note);
  const roE = await page.textContent('#roE'),
    hudSub = await page.textContent('#hudSub');
  check('θ = 179°, N = 6: the HUD line writes |z₆|² > 1 with the value ≈ 4.2181 apart, the row of e writes (1 + 1/6)⁶ < e with the value ≈ 2.5216 apart', hudSub.includes('|z6|² > 1（值 ≈ 4.2181），逃出球外') && roE === '≈ 4.2181 · (1 + 1/6)⁶ < e（值 ≈ 2.5216） · = 1.0000' && !mixed(hudSub).length && !mixed(roE).length, JSON.stringify([hudSub, roE]));
}
await input('#thetaRange', 180);
{
  const s = await state(),
    sub = await page.textContent('#hudSub'),
    note = await page.textContent('#roNote');
  check('θ = 180°: Q = −1, |z₆|² = (1 + π²/36)⁶ = 4.2789, the HUD says exp₁(πi) = e^{iπ} = −1 along the i-semicircle and κ(1, −1) = 0', s.euler.atPi && near(s.euler.Q[0], -1, 1e-15) && f4(s.euler.z2) === '4.2789' && /沿 i 半圆切向原像 πi，exp₁\(πi\) = eiπ = −1，κ\(1, −1\) = 0/.test(sub) && !/log/.test(sub) && s.preset === null, sub);
  check('θ = 180°: the Cayley ratio has no value (no substitute u = 0 in the state), and the note does not print one', ['norm', 'off', 'offGap', 'gapQ'].every((k) => s.leanInstances.cay[k] === null) && !/0\.6667|Re s = 0\.6/.test(note), JSON.stringify(s.leanInstances.cay));
}
// the marked card at the end of the rail, in both languages
await pick(E_CARD);
for (const lang of ['en', 'zh']) {
  await page.click(`[data-lang-set="${lang}"]`);
  await settle(page);
  await input('#now', 1);
  const s = await state(),
    texts = [await page.textContent('#hudSub'), await page.textContent('#presetNote')];
  check(`${lang}: the e card at θ = 180° names exp₁(πi) on the HUD line and in the card note, never log(−1)`, s.preset === E_CARD && s.regime === 'half' && texts.every((t) => t.includes('exp₁(πi) = eiπ = −1') && t.includes('κ(1, −1) = 0') && !/log/.test(t) && (lang === 'zh' ? t.includes('半圆') : t.includes('i-semicircle tangent preimage πi'))), JSON.stringify(texts));
  await layout(page, `${lang}/desktop θ = 180°`);
}

// σ = i only at θ = 90°: the marked card on the rail, then the slider, in both languages and lenses
for (const lang of ['en', 'zh']) {
  await page.click(`[data-lang-set="${lang}"]`);
  await settle(page);
  await pick(E_CARD);
  await codeChecks(page, `${lang}/desktop`);
  await sigmaChecks(page, `${lang}/desktop e card`, (d) => input('#now', d / 180));
  await page.click('#lensToggleBtn');
  await settle(page);
  await sigmaChecks(page, `${lang}/desktop flat lens`, (d) => input('#thetaRange', d));
  await page.click('#lensToggleBtn');
  await settle(page);
}

// the coincidence σ = i = Q(σ) is θ = 90° itself: at rail 0.5000001 (θ = 90.000018°) the bead and the approximate label stay
await pick(E_CARD);
for (const lang of ['en', 'zh']) {
  await page.click(`[data-lang-set="${lang}"]`);
  await settle(page);
  await input('#now', 0.5000001);
  const s = await state(),
    labels = await tagText(),
    marks = await sigmaMarks(),
    sub = await page.textContent('#hudSub'),
    note = await page.textContent('#presetNote');
  check(`${lang}: rail 0.5000001 (θ = 90.000018°): the bead sigma, σ ≈ 1.00·i, no ring and no label σ = i = Q(σ)`, near(s.theta / DEG, 90.000018, 1e-9) && same(marks, ['sigma']) && labels.includes('σ ≈ 1.00·i') && !labels.some((t) => t.includes('σ = i')), JSON.stringify([s.theta, labels, marks]));
  check(`${lang}: rail 0.5000001: θ ≈ 90.00° and u = tan(θ/2) ≈ 1.0000, not “=”`, sub.includes('θ ≈ 90.00°') && note.includes('u = tan(θ/2) ≈ 1.0000') && note.includes('θ ≈ 90°') && !/θ = 90|tan\(θ\/2\) = 1\.0000/.test(sub + note), JSON.stringify([sub, note]));
  await input('#now', 0.5);
  const at90 = [await page.textContent('#hudSub'), await page.textContent('#presetNote')];
  check(`${lang}: θ = 90°: θ = 90.00°, u = tan(θ/2) = 1.0000, ‖Q(σ)‖² = 1.0000 are exact, |z6|² > 1 is followed by its rounded value apart`, at90[0].includes('θ = 90.00°') && at90[1].includes('u = tan(θ/2) = 1.0000') && at90.every((t) => t.includes('‖Q(σ)‖² = 1.0000') && t.includes(lang === 'zh' ? '|z6|² > 1（值 ≈ 1.4885）' : '|z6|² > 1 (value ≈ 1.4885)') && !t.includes('= 1.4885') && !mixed(t).length), JSON.stringify(at90));
  {
    const note = await page.textContent('#roNote'),
      roE = await page.textContent('#roE'),
      off = cayleyModulus(0.6, 1).toFixed(4);
    check(
      `${lang}: θ = 90°: the note writes |(s − 1)/s| < 1 at Re s = 0.6 with the value ≈ ${off} apart, the row of e (1 + 1/6)⁶ < e with the value ≈ 2.5216 apart`,
      note.includes(lang === 'zh' ? `Re s = 1/2 上 = 1.0000；Re s = 0.6 上 |(s − 1)/s| < 1（值 ≈ ${off}）。` : `= 1.0000 on Re s = 1/2; at Re s = 0.6, |(s − 1)/s| < 1 (value ≈ ${off}).`) && roE === (lang === 'zh' ? '≈ 1.4885 · (1 + 1/6)⁶ < e（值 ≈ 2.5216） · = 1.0000' : '≈ 1.4885 · (1 + 1/6)⁶ < e (value ≈ 2.5216) · = 1.0000') && !mixed(note).length,
      JSON.stringify([note, roE])
    );
  }
}

// χ: the integer doubling law
await pick(C_CARD);
{
  const s = await state(),
    { xs } = heapOf(0.25);
  check('the doubling card parks on κ₁ = 1/4: κ₂ = 1/4, κ₃ = 1, x₃ = x₀, period 3, det G₃ = 0', s.scene === 'cheb' && s.k1 === 0.25 && near(s.heap.k2, 0.25, 1e-12) && near(s.heap.k3, 1, 1e-12) && s.heap.period === 3 && Math.abs(s.heap.det3) < 1e-12 && s.regime === 'three');
  check('the page heap is the independent heap (4 × 4 matrices) to 10⁻¹²', s.heap.xs.every((x, n) => norm(sub(x, xs[n])) < 1e-12));
  check('κ₁ = 1/4: the pill is a rational reading κ₂ = 1/4; the HUD names the centered det G₃ and the stage label stays short', (await page.textContent('#keyPill')).startsWith('有理读数') && (await page.textContent('#keyPill')).includes('κ₂ = 1/4') && (await page.textContent('#hudSub')).includes('定心 det G₃ = 0.0000') && (await tagText()).includes('det G₃ = 0.0000'));
  check('readouts and labels write the exact fractions 1/4 · 1/4 · 1', (await textOf('roCheb')).startsWith('= 1/4 · = 1/4 · = 1 · = 0.0000') && (await page.textContent('#kOut')) === '= 1/4' && (await page.textContent('#tau')).trim() === 'κ₁ = 1/4' && (await page.getAttribute('#chebChips [data-k="1/4"]', 'aria-pressed')) === 'true');
}
for (const k of [1, 0.75, 0.5, 1 / 3, 0.25, 0]) {
  const label = { 1: '1', 0.75: '3/4', 0.5: '1/2', 0.25: '1/4', 0: '0' }[k] || '1/3';
  await page.click(`#chebChips [data-k="${label}"]`);
  await settle(page);
  const s = await state(),
    { th, xs } = heapOf(k),
    c = 2 * k - 1;
  // Tₙ(c) = cos(nθ), Uₙ(c) = sin((n + 1)θ)/sin θ: another route than products or recursions
  const Tn = (n) => Math.cos(n * th),
    Un = (n) => (Math.abs(Math.sin(th)) < 1e-12 ? (n + 1) * Math.cos(th) ** n : Math.sin((n + 1) * th) / Math.sin(th));
  let cheb = 0;
  for (let n = 0; n <= 12; n++) {
    cheb = Math.max(cheb, Math.abs(dot(xs[0], s.heap.xs[n]) - Tn(n)), Math.abs(dot(s.heap.xs[n], s.heap.xs[n]) - 1));
    if (n < 12) cheb = Math.max(cheb, norm(sub(s.heap.xs[n + 1], sub(scale(xs[1], Un(n)), scale(xs[0], n ? Un(n - 1) : 0)))));
  }
  const u = s.heap.xs[0],
    v = s.heap.xs[1],
    w = s.heap.xs[2];
  const gram = [
    [dot(u, u), dot(u, v), dot(u, w)],
    [dot(v, u), dot(v, v), dot(v, w)],
    [dot(w, u), dot(w, v), dot(w, w)]
  ];
  const det = gram[0][0] * (gram[1][1] * gram[2][2] - gram[1][2] * gram[2][1]) - gram[0][1] * (gram[1][0] * gram[2][2] - gram[1][2] * gram[2][0]) + gram[0][2] * (gram[1][0] * gram[2][1] - gram[1][1] * gram[2][0]);
  check(
    `κ₁ = ${label}: κ₂ = (2κ₁ − 1)², κ₃ = κ₁(4κ₁ − 3)², ⟨x₀, xₙ⟩ = Tₙ(c), xₙ₊₁ = Uₙ(c)x₁ − Uₙ₋₁(c)x₀, det G₃ = 0, κ = 1 − chord²/4`,
    near(s.heap.k2, c * c, 1e-12) &&
      near(s.heap.k3, k * (4 * k - 3) ** 2, 1e-12) &&
      cheb < 1e-9 &&
      Math.abs(det) < 1e-12 &&
      near(s.heap.detLaw, 4 * (1 - s.heap.k2) * (s.heap.k2 - c * c), 1e-12) &&
      s.leanInstances.cheb.dot < 1e-9 &&
      s.leanInstances.dist.heap < 1e-12 &&
      s.leanInstances.gram.gap < 1e-12,
    String(cheb)
  );
  const want = { 1: 'frozen', 0: 'anti' }[k] || (k === 0.25 ? 'three' : 'live');
  check(`κ₁ = ${label}: the regime is ${want} and the HUD line says it`, s.regime === want && (want !== 'frozen' || /x₁ = x₀/.test(await page.textContent('#hudSub'))) && (want !== 'anti' || /对跖|antipode/.test(await page.textContent('#hudSub'))));
  const period = { 1: 1, 0.75: 6, 0.5: 4, 0.25: 3, 0: 2 }[k];
  check(`κ₁ = ${label}: the orbit returns to x₀ at step ${period || 'never (within 240)'}`, s.heap.period === (period || 0) && s.leanInstances.subgroup.period === (period || 0));
}
// at a general slider position κ₂ is a sphere reading; at the irrational root it is marked ∉ ℚ
const stageTags = async (p = page) => (await p.locator('.stage .tags .tag:not([hidden])').allTextContents()).map((t) => t.replace(/\s+/g, ' ').trim());
const said = async (p = page) => ({ pill: await p.textContent('#keyPill'), title: await p.textContent('#hudTitle'), sub: await p.textContent('#hudSub'), note: await p.textContent('#presetNote'), tour: await p.textContent('#tour .tour-note'), key: await p.textContent('#roKeySub'), tau: (await p.textContent('#tau')).trim(), out: await p.textContent('#kOut'), ro: await p.textContent('#roNote'), tags: await stageTags(p) });
/** κ₁ = 0.37: the double is not the decimal (it is no integer over a power of 2), so κ₁, κ₂ and κ₃ are all rounded; nothing is
    called irrational. */
function at037(x, marked) {
  const all = [x.pill, x.title, x.sub, x.key, x.tau, x.out, ...x.tags, ...(marked ? [x.note, x.tour] : [])];
  return (
    x.pill.startsWith('球面读数') &&
    x.pill.includes('κ₂ ≈ 0.0676') &&
    !x.pill.includes('有理') &&
    x.tau === 'κ₁ ≈ 0.3700' &&
    x.out === '≈ 0.3700' &&
    x.tags.includes('x₁ · κ₁ ≈ 0.3700') &&
    x.tags.includes('x₂ · κ₂ ≈ 0.0676') &&
    x.tags.includes('x₃ · κ₃ ≈ 0.8548') &&
    [x.sub, ...(marked ? [x.note] : [])].every((t) => t.includes('κ₁ ≈ 0.3700') && t.includes('κ₂ = (2κ₁ − 1)² ≈ 0.0676') && t.includes('κ₃ = κ₁(4κ₁ − 3)² ≈ 0.8548')) &&
    all.every((t) => !t.includes('∉') && !/= 0\.(?:3700|0676|8548)/.test(t))
  );
}
await pick(C_CARD);
await input('#kRange', 0.37);
{
  const x = await said();
  check('κ₁ = 0.37 from the slider: a sphere reading κ₂ ≈ 0.0676, κ₃ ≈ 0.8548 (the doubles are no such decimals) on the label, the HUD line, the rail and the slider, no ∉', near((await state()).k1, 0.37, 1e-15) && at037(x, false), JSON.stringify(x));
}
await pick(C_CARD);
await page.focus('#stageHandle');
for (let k = 0; k < 12; k++) await page.keyboard.press('ArrowLeft');
await settle(page);
{
  const x = await said();
  check('κ₁ = 0.37 by twelve ArrowLeft on the handle (t from 0.75 to 0.63): the same readings and relations', near((await state()).k1, 0.37, 1e-12) && at037(x, false), JSON.stringify(x));
}
// on the rail the card stays marked: its note says the same
await pick(C_CARD);
await input('#now', 0.63);
{
  const x = await said(),
    s = await state();
  check('κ₁ = 0.37 on the rail: the card note writes κ₃ = κ₁(4κ₁ − 3)² ≈ 0.8548 too, never “= 0.8548”', s.preset === C_CARD && near(s.k1, 0.37, 1e-12) && at037(x, true), JSON.stringify(x));
}
// the two irrational roots: κ₂ and κ₃ are both the other root, written with φ
for (const [k, kind, own, other, digits] of [
  [KSTAR, 'phi', '(φ + 1)/4', '(2 − φ)/4', '0.0955'],
  [KCONJ, 'conj', '(2 − φ)/4', '(φ + 1)/4', '0.6545']
]) {
  await input('#now', 1 - k);
  const x = await said(),
    ro = await page.textContent('#roCheb');
  check(
    `κ₁ = ${own} on the doubling scene: κ₂ = κ₃ = ${other} on the readout, the HUD line, the note, the labels and the pill (∉ ℚ), never “= ${digits}”`,
    (await state()).heap.exact.kind === kind &&
      ro.startsWith(`= ${own} · = ${other} · = ${other} · `) &&
      x.tau === `κ₁ = ${own}` &&
      x.out === `= ${own}` &&
      x.pill.startsWith('球面读数') &&
      x.pill.includes(`κ₂ = ${other} ∉ ℚ`) &&
      x.tags.includes(`x₁ · κ₁ = ${own}`) &&
      x.tags.includes(`x₂ · κ₂ = ${other}`) &&
      x.tags.includes(`x₃ · κ₃ = ${other}`) &&
      [x.sub, x.note].every((t) => t.includes(`κ₁ = ${own}`) && t.includes(`κ₂ = (2κ₁ − 1)² = ${other}`) && t.includes(`κ₃ = κ₁(4κ₁ − 3)² = ${other}`)) &&
      [x.pill, x.title, x.sub, x.note, x.tour, x.key, ro, ...x.tags].every((t) => !t.includes(digits) && !t.includes(digits === '0.0955' ? '0.6545' : '0.0955')),
    JSON.stringify([x, ro])
  );
  await layout(page, `zh/desktop doubling scene κ₁ = ${own}`);
}
// beside a root every reading is rounded and nothing is called irrational (κ₁ is the finite decimal 0.65450849)
await input('#now', 0.34549151);
{
  const x = await said();
  check('κ₁ = 0.65450849 on the doubling scene: κ₁ ≈ 0.6545, κ₂ ≈ 0.0955 (pill too), κ₃ ≈ 0.0955, no ∉', x.pill.startsWith('球面读数') && x.pill.includes('κ₂ ≈ 0.0955') && x.tags.includes('x₃ · κ₃ ≈ 0.0955') && [x.sub, x.note].every((t) => t.includes('κ₁ ≈ 0.6545') && t.includes('κ₂ = (2κ₁ − 1)² ≈ 0.0955') && t.includes('κ₃ = κ₁(4κ₁ − 3)² ≈ 0.0955')) && [x.pill, x.title, x.sub, x.note, x.tour, x.key, ...x.tags].every((t) => !t.includes('∉') && !/= 0\.(?:0955|6545)/.test(t)), JSON.stringify(x));
}
// beside κ₁ = 1/4 (and the other closing values) the orbit does not return: no period, no x₃ = x₀, no κ₃ = 1; a chord below 10⁻³ is
// called a near approach, never a return
for (const lang of ['en', 'zh']) {
  await page.click(`[data-lang-set="${lang}"]`);
  await settle(page);
  await pick(C_CARD);
  for (const t of [1 - 0.2500000000012, 1 - 0.2499999999988, 1 - 0.2500001, 1 - 0.2500000000004, 0.7499999999995, 0.750000000000002]) {
    await input('#now', t);
    const s = await state(),
      x = await said(),
      ro = await page.textContent('#roNote');
    check(
      `${lang}: κ₁ = ${1 - t} beside 1/4: period 0, regime live, neither the HUD line nor a label claims x₃ = x₀, κ₁ ≈ 0.2500 and κ₃ ≈ 1.0000`,
      s.heap.period === 0 &&
        s.regime === 'live' &&
        s.heap.exact === null &&
        near(s.k1, 1 - t, 1e-15) &&
        [x.title, x.sub, x.note, x.tour, x.pill, x.key, ...x.tags].every((y) => !/x₃ = x₀|x₃ 回到|x₃ is back|κ₃(?: = κ₁\(4κ₁ − 3\)²)? = 1/.test(y)) &&
        x.sub.includes('κ₁ ≈ 0.2500') &&
        x.sub.includes('κ₃ = κ₁(4κ₁ − 3)² ≈ 1.0000') &&
        x.tau === 'κ₁ ≈ 0.2500' &&
        x.out === '≈ 0.2500' &&
        ro.includes(lang === 'zh' ? '前 240 步无精确闭合（n = 3 处数值贴近，弦长 > 0）' : 'no exact return within 240 steps (numerical near-approach at step 3, chord > 0)') &&
        !/回到 x₀|returns to x₀/.test(ro) &&
        (await page.evaluate(() => !window.TRV.solids[0].marks().some((k) => k.key === 'closure'))),
      JSON.stringify([s.heap.period, s.k1, x, ro])
    );
  }
  // 1/4 itself, on the rail as the range input holds it
  await input('#now', 0.75);
  const s = await state(),
    x = await said();
  check(`${lang}: κ₁ = 1/4 itself: period 3, x₃ = x₀, κ₃ = 1, and the note says the return`, s.k1 === 0.25 && s.heap.period === 3 && s.heap.near === null && s.regime === 'three' && x.sub.includes('κ₁ = 1/4') && x.sub.includes('κ₃ = κ₁(4κ₁ − 3)² = 1') && x.ro.includes(lang === 'zh' ? '轨道在第 3 步回到 x₀' : 'the orbit returns to x₀ at step 3'), JSON.stringify([s.k1, s.heap.period, x.sub, x.ro]));
  // the ends: 10⁻¹⁰ beside κ₁ = 1 and κ₁ = 0 nothing is frozen, and the labels are those of the live heap
  for (const [t, regime] of [[0, 'frozen'], [1e-10, 'live'], [1 - 1e-10, 'live'], [1, 'anti']]) {
    await input('#now', t);
    const e = await state(),
      y = await said();
    check(`${lang}: rail t = ${t} on the doubling card: regime ${regime}, the label x₁ ${regime === 'frozen' ? 'stays away' : 'shows'}`, e.regime === regime && y.tags.some((z) => z.startsWith('x₁ · κ₁ ')) === (regime !== 'frozen') && (regime === 'live' ? !/κ₁ = [01]：|κ₁ = [01]:/.test(y.sub) : /κ₁ = [01][：:]/.test(y.sub)), JSON.stringify([e.regime, y.sub, y.tags]));
  }
}
check('the independent heap at κ₁ = 0.2500000000012 misses x₀ at step 3 by 8.3·10⁻¹² (3·2δ/sin θ)', near(norm(sub(heapOf(0.2500000000012, 3).xs[3], [1, 0, 0, 0])), (6 * 1.2e-12) / (Math.sqrt(3) / 2), 1e-15));
check('1 − κ₃ = (1 − κ₁)(4κ₁ − 1)², exactly, on every fraction p/q with q ≤ 40', (() => {
  for (let q = 1n; q <= 40n; q++) for (let p = 0n; p <= q; p++) if (q ** 3n - p * (4n * p - 3n * q) ** 2n !== (q - p) * (4n * p - q) ** 2n) return false;
  return true;
})());
// the closing values keep their periods
for (const [k, period] of [[1, 1], [0, 2], [0.25, 3], [0.5, 4], [KSTAR, 5], [KCONJ, 5], [0.75, 6], [1 / 3, 0], [0.2500000000012, 0], [0.5 + 1.2e-12, 0], [0.75 - 1.2e-12, 0], [KSTAR + 1.2e-12, 0], [0.25 + 2e-15, 0], [0.5 - 2e-15, 0], [0.75 + 2e-15, 0], [1 - 2e-15, 0], [2e-15, 0], [KSTAR - 4e-15, 0], [KCONJ + 4e-15, 0]]) {
  await input('#now', 1 - k);
  check(`κ₁ = ${k}: the orbit returns at step ${period || 'none'}`, (await state()).heap.period === period, String((await state()).heap.period));
}
check('κ₁ = 1/3 (cos θ = −1/3): no return to x₀ within 240 steps, by the independent heap too', (() => {
  const { xs } = heapOf(1 / 3, 240);
  return xs.slice(1).every((x) => norm(sub(x, xs[0])) > 1e-6);
})());
// the doubling law of the comparison data: κ(1, g²) = (2κ(1, g) − 1)² on random unit quaternions
{
  let worst = 0,
    s = 7;
  const r = () => ((s = (s * 48271) % 2147483647) / 2147483647) * 2 - 1;
  for (let k = 0; k < 64; k++) {
    const g = unit([r(), r(), r(), r()]);
    worst = Math.max(worst, Math.abs(kap([1, 0, 0, 0], qm(g, g)) - (2 * kap([1, 0, 0, 0], g) - 1) ** 2));
  }
  check('duplication: κ(1, g²) = (2κ(1, g) − 1)² on 64 random unit quaternions', worst < 1e-12, String(worst));
}
// the degenerate start of the doubling card: ⏮ gives κ₁ = 1
await pick(C_CARD);
await page.click('#rew');
await settle(page);
{
  const s = await state(),
    texts = [await page.textContent('#hudSub'), await page.textContent('#presetNote'), await page.textContent('#tour .tour-note')];
  check('⏮ on the doubling card: κ₁ = 1, x₁ = x₀, every note says the steps stay at x₀ (κ₂ = κ₃ = 1)', s.k1 === 1 && s.regime === 'frozen' && s.preset === C_CARD && texts.every((t) => /x₁ = x₀|x₁ 与银白的 x₀ 重合|x₁ sits on the silver x₀/.test(t) && /κ₂ = κ₃ = 1/.test(t) && !/x₃ = x₀/.test(t)), JSON.stringify(texts));
}

// φ: the tetrahedron at κ = 1/3 and the five-step heap
await pick(F_CARD);
{
  const s = await state();
  check('the φ card parks on κ₁ = (φ + 1)/4: P(κ₁) = 0, x₅ = x₀, gap 0, the diagonal reads (2 − φ)/4', s.scene === 'phi' && near(s.k1, KSTAR, 1e-15) && s.heap.P === 0 && s.heap.gap === 0 && (await textOf('roPhi')).startsWith('= 0 · = 0 · ') && near(s.heap.k2, KCONJ, 1e-12) && s.regime === 'exact' && s.heap.exact.kind === 'phi');
  check('16κ² − 12κ + 1 = 0 has the roots (φ + 1)/4 ≈ 0.6545 and (2 − φ)/4 ≈ 0.0955 (sum 3/4, product 1/16)', near(KSTAR + KCONJ, 0.75, 1e-15) && near(KSTAR * KCONJ, 1 / 16, 1e-15) && f4(KSTAR) === '0.6545' && f4(KCONJ) === '0.0955');
  // the regular tetrahedron of the page frame: all six κ = 1/3, Gram rank 3; five points of one κ need rank 4
  const T4 = [
    [1, 0, 0],
    [-1 / 3, (2 * Math.SQRT2) / 3, 0],
    [-1 / 3, -Math.SQRT2 / 3, Math.sqrt(2 / 3)],
    [-1 / 3, -Math.SQRT2 / 3, -Math.sqrt(2 / 3)]
  ];
  let allThird = true;
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) allThird = allThird && near(kap(T4[i], T4[j]), 1 / 3, 1e-12);
  check('the tetrahedron: six edges at κ = 1/3, Σ vertices = 0, ΔE(3) = ΔE(4) = 0 and ΔE(5) = 1 by N(N − 1)/2 − (3N − 6) = (N − 3)(N − 4)/2 (N ≥ 3)', allThird && norm(T4.reduce(plus, [0, 0, 0])) < 1e-12 && same([3, 4, 5].map((N) => (N * (N - 1)) / 2 - (3 * N - 6)), [0, 0, 1]) && [3, 4, 5, 6, 12].every((N) => (N * (N - 1)) / 2 - (3 * N - 6) === ((N - 3) * (N - 4)) / 2));
  // the Gram matrix (1 − c)I + cJ of five points with one cosine c has eigenvalues 1 − c (four times) and 1 + 4c: rank ≥ 4 unless c = 1
  check('five distinct points with one common κ cannot lie in ℝ³: rank (1 − c)I + cJ ≥ 4 for c ≠ 1', [-0.25, -1 / 3, 0, 0.3, 0.9].every((c) => (1 - c > 1e-12 ? 4 : 0) >= 4));
  check('the icosahedron (0, ±1, ±φ): κ = (φ + 2)/5 ≈ 0.7236 on adjacent pairs, (3 − φ)/5 ≈ 0.2764 on non-antipodal separated pairs, 0 on antipodal pairs', (() => {
    const a = unit([0, 1, PHI]),
      b = unit([0, -1, PHI]),
      c = unit([0, -1, -PHI]).map((x) => x),
      d = unit([1, PHI, 0]);
    return f4(kap(a, b)) === '0.7236' && near(kap(a, b), (PHI + 2) / 5, 1e-12) && near(kap(a, scale(d, -1)), (3 - PHI) / 5, 1e-12) && near(kap(a, c), 0, 1e-12);
  })());
  {
    const note = await page.textContent('#roNote');
    check('φ card: the note gives the Gram spectra (4/3, 4/3, 4/3, 0 and −1/3 < 0) and the icosahedron readings 0.7236, 0.2764 of adjacent and non-antipodal separated vertices', ['4/3', '−1/3 < 0', '0.7236', '0.2764', '相邻与非对跖相隔顶点'].every((x) => note.includes(x)), note);
  }
  check('φ instances: Cassini n = 0 … 30, Hurwitz n = 1 … 30, no Fibonacci ratio is a fixed point', s.leanInstances.golden.cassini && s.leanInstances.golden.hurwitz && s.leanInstances.golden.fixedGap > 0);
}
for (const [n, label] of [[1, '1/2'], [2, '3/4'], [3, '5/8'], [4, '2/3'], [5, '13/20'], [6, '21/32']]) {
  await page.click(`#phiChips [data-k="${label}"]`);
  await settle(page);
  const s = await state();
  const Fn = FIB[n],
    Fn1 = FIB[n + 1],
    Fn2 = FIB[n + 2];
  // exact: 16κ² − 12κ + 1 at κ = F_{n+2}/(4Fₙ) is (F_{n+2}² − 3F_{n+2}Fₙ + Fₙ²)/Fₙ² = −(FₙF_{n+2} − F_{n+1}²)/Fₙ²
  const num = Fn2 * Fn2 - 3n * Fn2 * Fn + Fn * Fn,
    cassini = Fn * Fn2 - Fn1 * Fn1;
  const k = Number(Fn2) / (4 * Number(Fn)),
    { xs } = heapOf(k, 6);
  const gap = 1 - kap(xs[0], xs[5]);
  check(
    `κ₁ = ${label} = F${n + 2}/(4F${n}): Cassini ${cassini}, P = (−1)^${n}/F${n}² exactly, gap ${gap.toExponential(2)} > 0, Hurwitz holds`,
    num === (n % 2 ? -1n : 1n) &&
      cassini === (n % 2 ? 1n : -1n) &&
      near(s.heap.P, Number(num) / Number(Fn * Fn), 1e-12) &&
      s.heap.exact.kind === 'fib' &&
      s.heap.exact.n === n &&
      s.leanInstances.golden.fib.cassini === Number(cassini) &&
      near(s.heap.gap, gap, 1e-12) &&
      gap > 1e-9 &&
      Math.abs(PHI - Number(Fn1) / Number(Fn)) > 1 / (Math.sqrt(5) * Number(Fn) ** 2 + Number(Fn)) &&
      near(s.leanInstances.golden.fib.dist, Math.abs(PHI - Number(Fn1) / Number(Fn)), 1e-12) &&
      s.regime === 'fib',
    JSON.stringify(s.heap.P)
  );
}
{
  const sub = await page.textContent('#hudSub');
  check('κ₁ = 21/32: the HUD writes the exact remainder (−1)⁶/F₆² = 1/64', sub.includes('1/64') && sub.includes('21/32'));
}
// |φ − F_{n+1}/Fₙ| > 1/(√5 Fₙ² + Fₙ) as printed, n = 1 … 30 in both languages; on the rail the note shows the steps up to n = 20, on the
// chips those up to n = 6. The exact values are fractions over √5 to 60 digits; the page takes the margin from Binet, this suite does not
check('√5 to 60 digits: r² ≤ 5·10¹²⁰ < (r + 1)²', ROOT5 * ROOT5 <= 5n * S60 * S60 && 5n * S60 * S60 < (ROOT5 + 1n) ** 2n);
check(
  'Hurwitz, n = 1 … 30: the margin |φ − q| − 1/(√5 Fₙ² + Fₙ) is positive and is (1 − (−φ)⁻ⁿ)/(φⁿ(√5 Fₙ² + Fₙ)) to 40 digits (fractions, with φⁿ = (Lₙ + √5 Fₙ)/2)',
  Array.from({ length: 30 }, (_, k) => k + 1).every((n) => {
    const { gap } = hurwitzN(n),
      F = FIB[n],
      L = FIB[n - 1] + FIB[n + 1], // the Lucas number
      phi = L * S60 + ROOT5 * F, // 2·10⁶⁰·φⁿ; (−φ)⁻ⁿ is the conjugate (Lₙ − √5 Fₙ)/2
      back = L * S60 - ROOT5 * F,
      binet = [(2n * S60 - back) * S60, phi * (ROOT5 * F * F + S60 * F)],
      off = subN(binet, gap[0]);
    return gap[0][0] > 0n && cmpN([(off[0] < 0n ? -off[0] : off[0]) * 10n ** 40n, off[1]], gap[0]) < 0;
  })
);
for (const lang of ['en', 'zh']) {
  await page.click(`[data-lang-set="${lang}"]`);
  await settle(page);
  const steps = await page.evaluate(() => Array.from({ length: 30 }, (_, k) => window.RATIONAL_DEBUG.hurwitz(k + 1)));
  const bad = [];
  for (const [k, f] of steps.entries()) {
    const n = k + 1,
      { dist, bound, gap } = hurwitzN(n),
      said = auditHurwitz(n, f.text),
      encloses = [[f.distLo, f.distHi, dist], [f.boundLo, f.boundHi, bound], [f.gapLo, f.gapHi, gap]].every(([lo, hi, [a, b]]) => lo > 0 && cmpN(doubleN(lo), a) < 0 && cmpN(b, doubleN(hi)) < 0 && near(hi / lo, 1, 3e-14));
    if (!(said === '' && encloses && f.boundHi < f.distLo && f.n === n && same(f.q, [Number(FIB[n + 1]), Number(FIB[n])]) && !mixed(f.text).length && f.text.startsWith('|φ − ') && f.text.endsWith(lang === 'zh' ? ' > 0）' : ' > 0)'))) bad.push([n, said, encloses, f]);
  }
  check(`${lang}: Hurwitz, n = 1 … 30: the exact inequality, each side to the nearest, the margin from below and > 0; the enclosures of the state hold and separate the sides (√5 to 60 digits, fractions)`, steps.length === 30 && !bad.length, JSON.stringify(bad.slice(0, 2)));
  const wrong = [],
    tail = lang === 'zh' ? '；四面体 ΔE(4) = 0，五点 ΔE(5) = 1。' : '; tetrahedron ΔE(4) = 0, five points ΔE(5) = 1.',
    read = async (n, how) => {
      const s = await state(),
        note = await page.textContent('#roNote'),
        said = auditHurwitz(n, note);
      if (!(s.regime === 'fib' && s.leanInstances.golden.fib.n === n && said === '' && note.endsWith(tail) && note.includes(steps[n - 1].text) && !mixed(note).length)) wrong.push([how, n, said, note]);
    };
  for (let n = 1; n <= 20; n++) {
    await input('#now', 1 - Number(FIB[n + 2]) / (4 * Number(FIB[n])));
    await read(n, 'rail');
  }
  for (const [n, label] of [[1, '1/2'], [2, '3/4'], [3, '5/8'], [4, '2/3'], [5, '13/20'], [6, '21/32']]) {
    await page.click(`#phiChips [data-k="${label}"]`);
    await settle(page);
    await read(n, 'chip');
    if (n === 5) {
      const note = await page.textContent('#roNote');
      check(`${lang}: the chip 13/20 (n = 5): |φ − 8/5| > 1/(√5·5² + 5), 0.01803 and 0.01642 to the nearest, the margin ≥ 0.001614 > 0`, note.includes(`|φ − 8/5| > 1/(√5·5² + 5)${lang === 'zh' ? '（左 ≈ 0.01803，右 ≈ 0.01642，差 ≥ 0.001614 > 0）' : ' (left ≈ 0.01803, right ≈ 0.01642, margin ≥ 0.001614 > 0)'}`), note);
    }
  }
  check(`${lang}: Hurwitz on the rail, n = 1 … 20, and on the six chips: the note as rendered`, !wrong.length, JSON.stringify(wrong.slice(0, 2)));
}
await page.click('#phiChips [data-k="conj"]');
await settle(page);
{
  const s = await state(),
    sub = await page.textContent('#hudSub');
  check('κ₁ = (2 − φ)/4, the conjugate root: the five steps close too (pentagram), the diagonals read (φ + 1)/4', near(s.k1, KCONJ, 1e-15) && s.heap.gap === 0 && near(s.heap.k2, KSTAR, 1e-12) && s.regime === 'exact' && s.heap.exact.kind === 'conj' && sub.includes('(2 − φ)/4') && (await page.getAttribute('#phiChips [data-k="conj"]', 'aria-pressed')) === 'true');
}
// the five-step gap is (1 − κ₁)(16κ₁² − 12κ₁ + 1)² exactly: (1 − T₅(2κ₁ − 1))/2 on every fraction p/q, q ≤ 40, in integers
{
  let identity = true;
  for (let q = 1n; q <= 40n; q++)
    for (let p = 0n; p <= q; p++) {
      const c = 2n * p - q,
        T5 = 16n * c ** 5n - 20n * c ** 3n * q ** 2n + 5n * c * q ** 4n,
        P = 16n * p * p - 12n * p * q + q * q;
      identity = identity && q ** 5n - T5 === 2n * (q - p) * P * P;
    }
  check('1 − κ(x₀, x₅) = (1 − κ₁)(16κ₁² − 12κ₁ + 1)², exactly, for 861 rational κ₁', identity);
}
// just beside the root the gap is positive and is never clipped to 0: κ₁ = 0.65450849 (rail 0.34549151)
await pick(F_CARD);
for (const lang of ['en', 'zh']) {
  await page.click(`[data-lang-set="${lang}"]`);
  await settle(page);
  await input('#now', 0.34549151);
  const s = await state(),
    // exact at κ₁ = 65450849/10⁸, in integers
    p = 65450849n,
    q = 100000000n,
    Pn = 16n * p * p - 12n * p * q + q * q,
    P = Number(Pn) / 1e16,
    gap = Number((q - p) * Pn * Pn) / 1e40,
    sub = await page.textContent('#hudSub'),
    ro = (await page.textContent('#roPhi')).split(' · ').map(bareText),
    key = bareText(await page.textContent('#roKey')),
    note = await page.textContent('#presetNote');
  const printed = (t) => [new RegExp(`1 − κ\\(x₀, x₅\\) ≈ (${NUMBER})`).exec(t), new RegExp(`16κ₁² − 12κ₁ \\+ 1 ≈ (${NUMBER})`).exec(t)].map((m) => (m ? m[1] : ''));
  const never0 = (list) => list.every((t) => t && parseNumber(t) !== 0 && t !== '0' && t !== '0.0000');
  check(`${lang}: κ₁ = 0.65450849: P = −6.429×10⁻⁸ ≠ 0 and the gap 1.428×10⁻¹⁵ > 0 (exact integers)`, s.regime === 'live' && near(s.k1, 0.65450849, 1e-15) && s.heap.P !== 0 && s.heap.gap > 1e-16 && near(s.heap.P / P, 1, 1e-6) && near(s.heap.gap / gap, 1, 1e-6), JSON.stringify([s.heap.P, P, s.heap.gap, gap]));
  check(`${lang}: κ₁ = 0.65450849: the HUD line, the card note and the readouts write both out, never 0 or 0.0000`, never0(printed(sub)) && never0(printed(note)) && never0([ro[0], ro[1], key]) && near(parseNumber(ro[0]) / P, 1, 1e-3) && near(parseNumber(ro[1]) / gap, 1, 1e-3), JSON.stringify([sub, note, ro, key]));
  // the flat lens puts the polynomial in the title and the pill
  await page.click('#lensToggleBtn');
  await settle(page);
  check(`${lang}: κ₁ = 0.65450849: the title and the pill of the flat lens write P out too`, (await page.textContent('#hudTitle')).includes('16κ₁² − 12κ₁ + 1 ≈ −6.429×10⁻⁸') && (await page.textContent('#keyPill')).includes('−6.429×10⁻⁸'));
  check(`${lang}: κ₁ = 0.65450849: κ₁ ≈ 0.6545, 1 − κ(x₀, x₅) ≈ 1.428×10⁻¹⁵ and 16κ₁² − 12κ₁ + 1 ≈ −6.429×10⁻⁸ on the HUD line and in the card note, none of them after “=”`, [sub, note].every((t) => ['κ₁ ≈ 0.6545', '1 − κ(x₀, x₅) ≈ 1.428×10⁻¹⁵', '16κ₁² − 12κ₁ + 1 ≈ −6.429×10⁻⁸'].every((x) => t.includes(x)) && !/(?:κ₁|κ\(x₀, x₅\)|12κ₁ \+ 1) = −?\d+\.\d/.test(t)), JSON.stringify([sub, note]));
  await layout(page, `${lang}/desktop κ₁ = 0.65450849 flat lens`);
  await page.click('#lensToggleBtn');
  await settle(page);
}
await page.click('#rew');
await settle(page);
{
  const s = await state();
  check('⏮ on the φ card: κ₁ = 1, the polynomial is 5 and the gap (1 − κ₁)P² is exactly 0', s.k1 === 1 && s.heap.P === 5 && s.heap.gap === 0 && s.regime === 'frozen' && (await textOf('roPhi')).startsWith('= 5 · = 0 · '));
  await page.click('#lensToggleBtn');
  await settle(page);
  check('κ₁ = 1 in the flat lens: 16κ₁² − 12κ₁ + 1 = 5 and 1 − κ(x₀, x₅) = 0 are exact', (await page.textContent('#hudTitle')).includes('16κ₁² − 12κ₁ + 1 = 5') && (await page.textContent('#roKeySub')).includes('1 − κ(x₀, x₅) = 0'));
  await page.click('#lensToggleBtn');
  await settle(page);
}
// the Dottie series: exact rational coefficients up to degree 15 and the sum at π
{
  const exact = inverseSeriesExact(15),
    series = await page.evaluate(() => window.RATIONAL_DEBUG.series());
  let theta = 0.5,
    lo = 0,
    hi = 1;
  for (let k = 0; k < 80; k++) {
    theta = (lo + hi) / 2;
    if (Math.cos(theta) > theta) lo = theta;
    else hi = theta;
  }
  check(
    'inverse of 2X + 2 arcsin X: b₁ = 1/4, b₃ = −1/768, b₅ = −1/61440, the page coefficients match the exact ones to degree 15',
    [[1, 1n, 4n], [3, -1n, 768n], [5, -1n, 61440n]].every(([i, p, q]) => exact[i][0] === p && exact[i][1] === q) && exact.every(([p, q], i) => near(series.coeffs[i], Number(p) / Number(q), 1e-15 + 1e-12 * Math.abs(Number(p) / Number(q))))
  );
  check('Σ bₙπⁿ (62 terms) = θ* = 0.73908513 with cos θ* = θ* (bisection), the page agrees', near(series.sum, theta, 1e-12) && theta.toFixed(8) === '0.73908513' && near(series.theta, theta, 1e-12), String(series.sum));
}

// the constant-free sphere: rational points, rings, probe and λ
await pick(R_CARD);
{
  const s = await state(),
    pts = await page.evaluate(() => window.RATIONAL_DEBUG.rational());
  // the set of σ as reduced integer fractions: expected from (a/d, b/d), observed from 6σ ∈ ℤ² of the page
  const gcdInt = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) [a, b] = [b, a % b];
    return a;
  };
  const reduced = (p, q) => {
    const g = gcdInt(p, q);
    return `${p / g}/${q / g}`;
  };
  const expectedKeys = new Set();
  for (const d of [1, 2, 3]) for (let a = -2 * d; a <= 2 * d; a++) for (let b = -2 * d; b <= 2 * d; b++) expectedKeys.add(`${reduced(a, d)},${reduced(b, d)}`);
  const sixths = pts.map((r) => [Math.round(r.sigma[0] * 6), Math.round(r.sigma[1] * 6)]),
    observedKeys = new Set(sixths.map(([p, q]) => `${reduced(p, 6)},${reduced(q, 6)}`));
  check(
    'the rational points are exactly the 225 values σ = (a/d, b/d), d ≤ 3, |a|, |b| ≤ 2d: equal sets of reduced fractions, no repetition',
    pts.length === 225 && expectedKeys.size === 225 && observedKeys.size === 225 && [...expectedKeys].every((k) => observedKeys.has(k)) && pts.every((r, i) => r.sigma.length === 2 && sixths[i].every((n, t) => near(r.sigma[t] * 6, n, 1e-12))),
    JSON.stringify([pts.length, expectedKeys.size, observedKeys.size])
  );
  check('each rational Q(σ) is on the sphere with κ(1, Q) = 1/(1 + ‖σ‖²)', pts.every((r) => {
    const n2 = r.sigma[0] ** 2 + r.sigma[1] ** 2,
      Q = [(1 - n2) / (1 + n2), (2 * r.sigma[0]) / (1 + n2), (2 * r.sigma[1]) / (1 + n2)];
    return norm(sub(Q, r.point)) < 1e-12 && near(norm(r.point), 1, 1e-12) && near(kap([1, 0, 0], r.point), 1 / (1 + n2), 1e-12);
  }));
  check('the sphere card parks on λ = 1 with the probe σ = (−1, 1): Q = (−1/3, −2/3, 2/3), κ = 1/3, integer remainder 0', s.scene === 'pure' && s.lambda === 1 && same(s.probe.coords, [[-1, 3], [-2, 3], [2, 3]]) && same(s.probe.kappa, [1, 3]) && s.probe.residue === 0 && s.regime === 'pure');
  check('every rational point has integer remainder 0 (page), and by the integers computed here', (await textOf('roKey')) === '= 0' && pts.every((r) => r.residue === 0));
  check('κ(1, Q) − (1 − ‖1 − Q‖²/4) = 0 on the probe', s.leanInstances.dist.probe < 1e-12);
}
await page.click('#rew');
await settle(page);
{
  const s = await state(),
    texts = [await page.textContent('#hudSub'), await page.textContent('#presetNote'), await page.textContent('#tour .tour-note')];
  check('⏮ on the sphere card: λ = 0, every note says the scaffold is laid over', s.lambda === 0 && s.regime === 'scaffold' && texts.every((t) => /λ = 0/.test(t)), JSON.stringify(texts));
}
await pick(R_CARD);
// the probe handle: drag it to σ = (−1, 0) on the visible side, then the arrow keys and the sliders step σ by 1/6
{
  const from = await page.locator('#stageHandle').boundingBox(),
    cam = (await state()).camera,
    to = await page.evaluate(() => window.RATIONAL_DEBUG.handleAt([-6, 0]));
  await page.mouse.move(from.x + from.width / 2, from.y + from.height / 2);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, { steps: 10 });
  await page.mouse.up();
  await settle(page);
  const s = await state();
  check('dragging the probe lands on σ = (−1, 0): Q = (0, −1, 0), κ = 1/2, the camera stays', same(s.probe.coords, [[0, 1], [-1, 1], [0, 1]]) && same(s.probe.kappa, [1, 2]) && !s.preset && same(s.camera, cam), JSON.stringify(s.probe));
  check('the probe sliders follow the handle', (await page.inputValue('#probeA')) === '-6' && (await page.inputValue('#probeB')) === '0' && (await textOf('probeAOut')) === '= -1');
  await page.focus('#stageHandle');
  await page.keyboard.press('ArrowRight');
  await settle(page);
  check('ArrowRight on the probe: σ = (−5/6, 0), Q has denominator 61', same((await state()).probe.coords, [[11, 61], [-60, 61], [0, 1]]));
  await input('#probeB', 3);
  check('the probe slider sets σ = (−5/6, 1/2): Q = (2, −60, 36)/70 in lowest terms, integer remainder 0', same((await state()).probe.coords, [[1, 35], [-6, 7], [18, 35]]) && (await state()).probe.residue === 0);
}

// the handle of the other scenes: drag the N-gon vertex, the Cayley point and the heap point x₁
for (const [card, target, read, want] of [
  [PI_CARD, 12, (s) => s.N, 12],
  [E_CARD, PI / 3, (s) => s.theta, PI / 3],
  [C_CARD, 0.5, (s) => s.k1, 0.5]
]) {
  await pick(card);
  const box = await page.locator('#stageHandle').boundingBox(),
    to = await page.evaluate((v) => window.RATIONAL_DEBUG.handleAt(v), target),
    cam = (await state()).camera;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, { steps: 12 });
  await page.mouse.up();
  await settle(page);
  const s = await state();
  check(`${card}: dragging the amber handle sets the quantity of the scene (${want}) and leaves the camera alone`, Math.abs(read(s) - want) < 0.02 && same(s.camera, cam) && !s.preset && !s.playing, String(read(s)));
  const before = read(s);
  await page.focus('#stageHandle');
  await page.keyboard.press('ArrowRight');
  await settle(page);
  check(`${card}: ArrowRight on the handle steps the quantity`, read(await state()) !== before);
}

/* ---------- “=” or “≈”: every relation the page writes before a number, against the value computed here ----------
   “=” only before the value itself, as a fraction of integers; “≈” only before digits that round it. The exact values: the double
   λ; the named fraction κ₁, or the double itself, and its polynomials; θ on the quarter degrees (the grid of the slider, the keys
   and the handle); the rational cases of cos²(π/N), 1 − cos(π/N), tan(θ/2) and arccos(2κ₁ − 1). Everything else is irrational. */
const VAL = `\\(φ \\+ 1\\)/4|\\(2 − φ\\)/4|1 [+−] ${NUMBER}|${NUMBER}(?:/\\d+)?`;
/** A value that stands apart, after the exact inequality it belongs to: “… > 1（值 ≈ …）”, “… > 1 (value ≈ …)”. */
const APART = '(?:（值| \\(value)';
const NAMED_K = [[1n, 1n], [3n, 4n], [1n, 2n], [1n, 3n], [1n, 4n], [0n, 1n], ...Array.from({ length: 20 }, (_, i) => fracN(FIB[i + 3], 4n * FIB[i + 1]))];
const quotient = ([p, q]) => Number(p) / Number(q);
/** κ₁ as a fraction: the named one or the double itself; null at the two irrational roots. */
const kappaN = (k1) => (k1 === KSTAR || k1 === KCONJ ? null : NAMED_K.find((r) => quotient(r) === k1) || doubleN(k1));
/** κ₁, κ₂, κ₃, 16κ₁² − 12κ₁ + 1 and the five-step gap as fractions (null at the roots, where the last two are 0). */
function heapN(k1) {
  const r = kappaN(k1);
  if (!r) return { k1: null, k2: null, k3: null, P: [0n, 1n], gap: [0n, 1n] };
  const [p, q] = r,
    P = 16n * p ** 2n - 12n * p * q + q ** 2n;
  return { k1: r, k2: [(2n * p - q) ** 2n, q ** 2n], k3: [p * (4n * p - 3n * q) ** 2n, q ** 3n], P: [P, q ** 2n], gap: [(q - p) * P ** 2n, q ** 5n] };
}
/** θ as a fraction of degrees when it is the double of a quarter degree, else null. */
const thetaN = (theta) => {
  const k = Math.round((theta / PI) * 720);
  return theta === (k / 720) * PI ? [BigInt(k), 4n] : null;
};
/** [the names of a quantity, its value, the exact fraction or null, the same two for a part written after “1 + ” or “1 − ”]. */
function relationTable({ scene, N, theta, k1, lambda }) {
  const c = 2 * k1 - 1,
    h = heapN(k1),
    sag = 2 * Math.sin(PI / (2 * N)) ** 2,
    excess = Math.expm1(N * Math.log1p((theta * theta) / (N * N))),
    one = [1n, 1n],
    zero = [0n, 1n],
    th = thetaN(theta),
    n = [1, 2, 3, 4, 5, 6].find((i) => k1 === Number(FIB[i + 2]) / (4 * Number(FIB[i]))),
    uOff = theta >= PI ? Infinity : theta === PI / 2 ? 1 : Math.tan(theta / 2),
    angle = new Map([[1, 0n], [0.75, 60n], [0.5, 90n], [0.25, 120n], [0, 180n], [KSTAR, 72n], [KCONJ, 144n]]).get(k1);
  return [
    ['κ₃ = κ₁\\(4κ₁ − 3\\)²', k1 * (4 * k1 - 3) ** 2, h.k3],
    ['κ₃', k1 * (4 * k1 - 3) ** 2, h.k3],
    ['κ₂ = \\(2κ₁ − 1\\)²', c * c, h.k2],
    ['κ₂', c * c, h.k2],
    ['κ₁', k1, h.k1],
    ['16κ₁² − 12κ₁ \\+ 1', quotient(h.P), h.P],
    ['1 − κ\\(x₀, x₅\\)|五步缺口|five-step gap|留下缺口|leave a gap', quotient(h.gap), h.gap],
    ['\\(−1\\)\\d+/F\\d+²', n ? (n % 2 ? -1 : 1) / Number(FIB[n]) ** 2 : NaN, n ? [n % 2 ? -1n : 1n, FIB[n] ** 2n] : null],
    ['\\(φ \\+ 1\\)/4', KSTAR, null],
    ['\\(2 − φ\\)/4', KCONJ, null],
    [scene === 'pi' ? 'κ\\(x₀, x₁\\)|κ' : 'κ\\(x₀, x₁\\)', Math.cos(PI / N) ** 2, { 3: [1n, 4n], 4: [1n, 2n], 6: [3n, 4n] }[N] || null],
    ['θ₁', angle === undefined ? Math.acos(c) / DEG : Number(angle), angle === undefined ? null : [angle, 1n]],
    ['θ', th ? quotient(th) : theta / DEG, th],
    ['λ', lambda, doubleN(lambda)],
    ['u = tan\\(θ/2\\)|σ', theta === PI / 2 ? 1 : Math.tan(theta / 2), theta === PI / 2 ? one : theta === 0 ? zero : null],
    ['1 − cos\\(π/\\d+\\)|s\\d+|矢高|sagitta', sag, N === 3 ? [1n, 2n] : null],
    [`N\\(1 − cos\\(π/N\\)\\)(?: ≤ ${NUMBER}(?:（当前值| \\(value))?`, N * sag, N === 3 ? [3n, 2n] : null],
    [`\\|z\\d+\\|²(?: > 1${APART})?|品红 \\d+ 步模方(?: > 1${APART})?|squared modulus(?: > 1${APART})?`, 1 + excess, theta === 0 ? one : null, excess, theta === 0 ? zero : null],
    ['模方余', excess, theta === 0 ? zero : null],
    [`\\(1 \\+ 1/\\d+\\)[${SUP}]+ < e${APART}`, (1 + 1 / N) ** N, [BigInt(N + 1) ** BigInt(N), BigInt(N) ** BigInt(N)]],
    // (at θ = 180° there is no point s: the ratio is not written there)
    [`\\|\\(s − 1\\)/s\\| < 1${APART}`, cayleyModulus(0.6, uOff), null, uOff === Infinity ? 0 : 0.2 / (0.36 + (uOff * uOff) / 4) / (1 + cayleyModulus(0.6, uOff)), null],
    ['凯莱一步模方|Cayley step|‖Q\\(σ\\)‖²', 1, one],
    ['‖Q\\(σ\\)‖² − 1|det G₃', 0, zero],
    ['部分和|partial sum', 0.7390851332151607, null],
    ['Σδ', 720, [720n, 1n]]
  ];
}
/** The relations found in a text: how many, and which are wrong. */
function relations(text, v) {
  // “besides the motionless κ₁ = 1” speaks of another κ₁ than the one of the frame
  const t = text.replace(/\s+/g, ' ').replace(/(?:不动的|motionless) κ₁ = 1/g, '');
  let count = 0;
  const bad = [];
  for (const [name, value, exact, part, partExact] of relationTable(v))
    for (const m of t.matchAll(new RegExp(`(?<![A-Za-z0-9₀-₉])(?:${name}) ([=≈]) (${VAL})`, 'g'))) {
      const [whole, sign, printed] = m;
      count++;
      if (printed.includes('φ')) {
        if (sign !== '=' || !near(printed.startsWith('(φ') ? KSTAR : KCONJ, value, 1e-12)) bad.push(whole);
        continue;
      }
      if (printed.includes('/')) {
        const [a, b] = printed.replace('−', '-').split('/').map(BigInt);
        if (sign !== '=' || !exact || cmpN([a, b], exact) !== 0) bad.push(whole);
        continue;
      }
      const tail = /^1 [+−] /.test(printed),
        digits = tail ? printed.slice(4) : printed,
        target = tail ? part : value,
        q = tail ? partExact : exact,
        nv = parseNumber(digits),
        [mantissa, e] = digits.split('×10'),
        half = 0.5 * 10 ** (-(mantissa.split('.')[1] || '').length + (e ? Math.round(Math.log10(parseNumber('1×10' + e))) : 0)),
        off = Math.abs(nv - target);
      // digits that are all 0 are written of 0 alone, and “=” of the fraction that the decimal is
      if (nv === 0 && target !== 0) bad.push(`${whole} [${target}]: a nonzero value printed 0`);
      if (!Number.isFinite(target) || off > half * (1 + 1e-6) + 1e-15 || (sign === '=') !== (!!q && cmpN(q, decimalN(digits)) === 0)) bad.push(`${whole} [${target}]`);
    }
  return { count, bad };
}
/** Put a page through frames (each a list of [range input, value]) in both languages and lenses, and read everything it writes. */
const readFrames = (p, frames) =>
  p.evaluate((frames) => {
    const text = (sel) => (document.querySelector(sel) || { textContent: '' }).textContent,
      out = [];
    for (const frame of frames) {
      for (const [id, v] of frame) {
        const el = document.getElementById(id);
        el.value = String(v);
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
      for (const lang of ['en', 'zh']) {
        document.querySelector(`[data-lang-set="${lang}"]`).click();
        for (let lens = 0; lens < 2; lens++) {
          TRV.kit.flush();
          const s = window.RATIONAL_DEBUG.state;
          out.push({
            lang,
            lens: s.lens,
            v: { scene: s.scene, N: s.N, theta: s.theta, k1: s.k1, lambda: s.lambda },
            named: !!s.heap.exact,
            // the readouts and the outputs of the sliders name their quantity in a label of its own: the name is put before each value
            texts: ['#keyPill', '#hudTitle', '#hudSub', '#presetNote', '#tour .tour-note', '#roKeySub', '#roNote', '#plotMeta', '#tau']
              .map(text)
              .concat(
                [...document.querySelectorAll('.stage .tags .tag:not([hidden])')].map((e) => e.textContent),
                [['#thetaOut', 'θ'], ['#kOut', 'κ₁'], ['#lambdaOut', 'λ'], ['#roKey', { pi: '矢高', euler: '模方余', phi: '16κ₁² − 12κ₁ + 1' }[s.scene] || '']].map(([sel, name]) => `${name} ${text(sel)}`),
                [['#roPi', ['矢高', 'N(1 − cos(π/N))', 'Σδ']], ['#roE', ['|z1|²', ' ', '‖Q(σ)‖²']], ['#roCheb', ['κ₁', 'κ₂', 'κ₃', 'det G₃']], ['#roPhi', ['16κ₁² − 12κ₁ + 1', '1 − κ(x₀, x₅)']], ['#roPure', ['', '', '', '部分和']]].map(([sel, names]) => text(sel).split(' · ').map((x, i) => (names[i] ? `${names[i]} ${x}` : '')).join(' ; '))
              ),
            hud: text('#hudTitle') + ' ¶ ' + text('#hudSub'),
            readouts: [...document.querySelectorAll('#readouts h2, #readouts dt, #readouts dd, #readouts .note')].map((e) => e.textContent).join(' ¶ '),
            outputs: ['#thetaOut', '#kOut', '#lambdaOut', '#nOut', '#probeAOut', '#probeBOut', '#roKey'].map(text),
            lists: ['#roPi', '#roE', '#roCheb', '#roPhi', '#roPure'].map(text)
          });
          document.getElementById('lensToggleBtn').click();
        }
      }
    }
    TRV.kit.flush();
    return out;
  }, frames);
// (beside 3/8, where 16κ² − 12κ + 1 = −5/4 turns, and beside 1 − KCONJ, where the gap is at most 1, the doubles of the two equal the
// rounded decimals: only the fractions tell)
const K1 = [1, 1 - 1e-10, 1 - KCONJ, 0.875, 0.75, 0.75 + 1e-9, 2 / 3, KSTAR, 0.65450849, 0.6545, 0.65, 21 / 32, 0.625, 0.5, 0.5 + 5e-13, 0.4999999, 0.375, 0.375 + 1e-9, 0.37, 1 / 3, 0.2500001, 0.2500000000012, 0.25 + 5e-13, 0.25, 0.123456, KCONJ, KSTAR + 2e-15, KCONJ - 2e-15, 0.01, 1e-7, 5e-13, 0];
const FRAMES = {
  [PI_CARD]: [3, 4, 5, 6, 7, 12, 48].map((N) => [['now', (N - 3) / 45]]),
  [E_CARD]: [0, 3e-16, 5e-13, 1e-9, 1e-7, 1e-4, 0.35 / 180, 1 / 180, (2 * Math.atan(0.5)) / PI, 0.123456, 1 / 16, 0.25, 1 / 3, 0.4999999999995, 0.5, 0.5000001, 91 / 180, 179 / 180, 1 - 1e-9, 1].map((t) => [['now', t]]),
  [C_CARD]: K1.map((k) => [['now', 1 - k]]),
  [F_CARD]: K1.map((k) => [['now', 1 - k]]),
  [R_CARD]: [0, 5e-13, 1e-9, 0.25, 0.35, 1 / 3, 0.5, 1 - 5e-13, 1].map((t) => [['now', t]])
};
const COMPOUND = new RegExp(`^\\(1 \\+ 1/(\\d+)\\)[${SUP}]+ < e${APART} ≈ \\d\\.\\d{4}[）)]$`);
for (const figure of [false, true])
  for (const id of ORDER) {
    const p = await T.open(BOOK, ID, `?${figure ? 'embed=1&' : ''}lang=zh&preset=${id}`, { viewport: figure ? { width: 740, height: 500 } : { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    await settle(p);
    // the whole page also takes N from its slider (the card is then unmarked)
    const extra = !figure && id === E_CARD ? [3, 48].flatMap((N) => [1, 45, 90, 180].map((d) => [['nRange', N], ['thetaRange', d]])) : [];
    const frames = await readFrames(p, [...FRAMES[id], ...extra]);
    let count = 0;
    const bad = [],
      irrational = [],
      beside = [],
      unmarked = [];
    for (const f of frames) {
      // every value of the readouts and the outputs carries its relation (the counts ΔE, the compound below e and the limit of Q are named in place)
      for (const x of [...f.outputs, ...f.lists.flatMap((l) => l.split(' · '))]) if (!/^[=≈] \S/.test(x) && !/^ΔE\(\d\) = \d$|^lim Q\(u·i\) = −1$/.test(x) && !COMPOUND.test(x)) unmarked.push(x);
      for (const x of [...mixed(f.hud), ...mixed(f.readouts)]) beside.push(`${f.lang}/lens ${f.lens}: ${x}`);
      for (const t of f.texts) {
        const r = relations(t, f.v);
        count += r.count;
        for (const b of r.bad) bad.push(`${f.lang}/lens ${f.lens}: ${b}`);
        for (const x of mixed(t)) beside.push(`${f.lang}/lens ${f.lens}: ${x}`);
        // ∉ ℚ is said only of a value known to be irrational: cos²(π/N) off N = 3, 4, 6, and the two roots
        const may = f.v.scene === 'pi' ? ![3, 4, 6].includes(f.v.N) : f.v.scene === 'cheb' && (f.v.k1 === KSTAR || f.v.k1 === KCONJ);
        if (t.includes('∉') && !may) irrational.push(t);
      }
    }
    check(`${figure ? 'figure' : 'page'}/${id}: every value of the readouts, the sliders and the key readout follows “=” or “≈”`, !unmarked.length, [...new Set(unmarked)].slice(0, 4).join(' | '));
    const least = { [PI_CARD]: 20, [E_CARD]: 18, [C_CARD]: 22, [F_CARD]: 18, [R_CARD]: 14 }[id];
    check(`${figure ? 'figure' : 'page'}/${id}: every relation written in ${frames.length} frames is “=” before the value itself or “≈” before its rounding (${count} relations)`, frames.length >= 20 && count >= least * (frames.length / 4) && !bad.length, `${count}: ${[...new Set(bad)].slice(0, 6).join(' | ')}`);
    // the four areas at the last frame, all of their text in both languages: the title block, the readouts, the evidence and the drawer
    for (const [k, t] of (await areaTexts(p)).entries()) beside.push(...mixed(t).map((x) => `${['#hudTl', '#readouts', '#basis', '#drawer'][k]}: ${x}`));
    check(`${figure ? 'figure' : 'page'}/${id}: no “≈” runs into “<”, “>”, “≤” or “≥” (beside 0, 1 or e neither) in #hudTl, #readouts, #basis, #drawer, the notes and the labels`, !beside.length, [...new Set(beside)].slice(0, 4).join(' | '));
    check(`${figure ? 'figure' : 'page'}/${id}: ∉ ℚ is said of irrational values only`, !irrational.length, irrational.slice(0, 2).join(' | '));
    await p.context().close();
  }

/* ---------- the edges of exactness: 180° outside the chart, near returns, outward roundings, “=” on every line ---------- */
/** Everything the page says of its frame, each text with single spaces. */
const spoken = (p = page) =>
  p.evaluate(() => {
    TRV.kit.flush();
    const t = (sel) => (document.querySelector(sel) || { textContent: '' }).textContent.replace(/\s+/g, ' ').trim();
    return {
      title: t('#hudTitle'),
      sub: t('#hudSub'),
      pill: t('#keyPill'),
      key: t('#roKey'),
      keySub: t('#roKeySub'),
      roE: t('#roE'),
      ro: t('#roNote'),
      note: t('#presetNote'),
      tour: t('#tour .tour-note'),
      meta: t('#plotMeta'),
      tau: t('#tau'),
      thetaOut: t('#thetaOut'),
      kOut: t('#kOut'),
      lambdaOut: t('#lambdaOut'),
      tags: [...document.querySelectorAll('.stage .tags .tag:not([hidden])')].map((e) => e.textContent.replace(/\s+/g, ' ').trim())
    };
  });
const LIM = 'limu→+∞ Q(u·i) = −1';
// Q(u·i) = ((1 − u²) + 2u·i)/(1 + u²) tends to −1 and is never −1: ‖Q(u·i) + 1‖² = 4/(1 + u²) > 0, on every frame before 180°
{
  await pick(E_CARD);
  const bad = [];
  for (const d of [1, 45, 90, 135, 179, 179.75]) {
    await input('#now', d / 180);
    const { theta, euler } = await state(),
      u = Math.tan(theta / 2),
      off = (euler.Q[0] + 1) ** 2 + euler.Q[1] ** 2;
    if (!(theta < PI && !euler.atPi && off > 0 && near(off * (1 + u * u), 4, 1e-9))) bad.push([d, euler.Q, off]);
  }
  check('Q(u·i) on the page: ‖Q(u·i) + 1‖² = 4/(1 + u²) > 0 at θ = 1° … 179.75°, Q is not −1', !bad.length, JSON.stringify(bad));
}
/** θ = 180° says the limit and nothing of a finite σ: neither ‖Q(σ)‖² nor Q(σ) nor e^{iθ} = Q(σ) is written of the frame. */
async function limitChecks(where, lang, lens, card, p = page) {
  const s = await state(p),
    x = await spoken(p),
    all = [x.title, x.sub, x.pill, x.keySub, x.roE, x.ro, x.tour, x.note, ...x.tags],
    inRoE = x.roE.split(' · '),
    lim = lang === 'zh' ? 'u → +∞ 时 lim Q(u·i) = −1' : 'lim Q(u·i) = −1 as u → +∞';
  check(
    `${where}: θ = 180° is the limit lim Q(u·i) = −1 with κ(1, −1) = 0, no finite σ is evaluated (title, HUD line, pill, readouts, notes, labels)`,
    s.regime === 'half' &&
      s.theta === PI &&
      s.lens === lens &&
      all.every((t) => !/Q\(σ\)|‖Q|e(?:iθ|iπ) = Q|1\.0000/.test(t)) &&
      x.sub.includes(lim) &&
      (!card || (x.note.includes(lim) && x.note.includes('κ(1, −1) = 0') && x.tour.includes(lim))) &&
      x.keySub === '· lim Q(u·i) = −1 · κ(1, −1) = 0' &&
      inRoE.length === 3 &&
      inRoE[2] === 'lim Q(u·i) = −1' &&
      (lens ? x.tags.includes('eiπ = −1') && !x.tags.includes(LIM) && x.title.includes('|z6|² ≈ 4.2789') : x.tags.includes(LIM) && x.title.endsWith(LIM) && x.pill.endsWith('κ(1, −1) = 0')) &&
      x.tau === 'θ = 180.0°' &&
      x.thetaOut === '= 180°',
    JSON.stringify(x)
  );
}
for (const lang of ['en', 'zh']) {
  await page.click(`[data-lang-set="${lang}"]`);
  await settle(page);
  await pick(E_CARD);
  for (const lens of [0, 1]) {
    if ((await state()).lens !== lens) await page.click('#lensToggleBtn');
    await input('#now', 0.5);
    await input('#now', 1);
    await limitChecks(`${lang}/lens ${lens}, rail t = 1`, lang, lens, true);
    await layout(page, `${lang}/desktop θ = 180° lens ${lens}`);
    await input('#now', 179 / 180);
    const x = await spoken();
    check(`${lang}/lens ${lens}: at θ = 179° the chart is back: ‖Q(σ)‖² = 1.0000 (or e^{iθ} = Q(σ)) and no limit`, (await state()).regime === 'live' && x.tags.includes(lens ? 'eiθ = Q(σ)' : '‖Q(σ)‖² = 1.0000') && x.roE.endsWith(' · = 1.0000') && [x.title, x.sub, x.pill, x.keySub, x.roE, x.note, x.tour, ...x.tags].every((t) => !/lim|κ\(1, −1\)/.test(t)), JSON.stringify(x));
  }
  // the End key of the handle and the slider
  await page.focus('#stageHandle');
  await page.keyboard.press('End');
  await settle(page);
  await limitChecks(`${lang}/lens 1, End on the handle`, lang, 1, false);
  await page.click('#lensToggleBtn');
  await input('#thetaRange', 120);
  await input('#thetaRange', 180);
  await limitChecks(`${lang}/lens 0, the slider at 180°`, lang, 0, false);
}
for (const lang of ['zh', 'en']) {
  const lim = lang === 'zh' ? 'u → +∞ 时 lim Q(u·i) = −1' : 'lim Q(u·i) = −1 as u → +∞';
  for (const width of [334, 740]) {
    const p = await T.open(BOOK, ID, `?embed=1&lang=${lang}&preset=${E_CARD}`, { viewport: { width, height: 500 }, reducedMotion: 'reduce' });
    await settle(p);
    await input('#now', 1, p);
    const x = await spoken(p);
    check(`${lang}/figure ${width}: θ = 180°: the figure note and the HUD line write the limit, never Q(σ)`, x.tour.includes(lim) && x.sub.includes(lim) && x.tags.includes(LIM) && [x.title, x.sub, x.tour, ...x.tags].every((t) => !/Q\(σ\)|1\.0000/.test(t)), JSON.stringify(x));
    await layout(p, `${lang}/figure ${width} θ = 180°`, true);
    await p.context().close();
  }
  const p = await T.open(BOOK, ID, `?lang=${lang}&preset=${E_CARD}`, { viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await settle(p);
  await input('#now', 1, p);
  for (const lens of [0, 1]) {
    await limitChecks(`${lang}/390 lens ${lens}`, lang, lens, true, p);
    await layout(p, `${lang}/390 θ = 180° lens ${lens}`);
    await p.click('#mobileLensBtn');
    await settle(p);
  }
  await p.context().close();
}

// a near return is not a return: κ₁ = cos²(π/7) as a double. Exactly: T₁ … T₂₄₀ at the rational c = 2κ₁ − 1 are never 1
await pick(C_CARD);
for (const lang of ['en', 'zh']) {
  await page.click(`[data-lang-set="${lang}"]`);
  await settle(page);
  for (const [t, n, digits] of [
    [0.1882550990706332, 7, '0.8117'],
    [Math.sin((2 * PI) / 7) ** 2, 7, '0.3887'],
    [Math.sin(PI / 8) ** 2, 8, '0.8536'],
    [Math.sin((3 * PI) / 11) ** 2, 11, '0.4288'],
    [Math.sin(PI / 12) ** 2, 12, '0.9330'],
    [0.4999999999995, 4, '0.5000'],
    [0.7499999999995, 3, '0.2500'],
    [0.2499999999995, 6, '0.7500']
  ]) {
    await input('#now', t);
    const s = await state(),
      x = await spoken();
    check(
      `${lang}: rail t = ${t} (κ₁ ≈ ${digits}): period 0, a near approach at step ${n} and no return; the rail, the slider and the HUD line write κ₁ ≈ ${digits}`,
      near(s.k1, 1 - t, 1e-15) &&
        s.heap.period === 0 &&
        s.leanInstances.subgroup.period === 0 &&
        s.heap.exact === null &&
        s.regime === 'live' &&
        s.heap.near.n === n &&
        s.heap.near.chord < 1e-10 &&
        x.ro.includes(lang === 'zh' ? `前 240 步无精确闭合（n = ${n} 处数值贴近，弦长 > 0）` : `no exact return within 240 steps (numerical near-approach at step ${n}, chord > 0)`) &&
        !/回到 x₀|returns to x₀/.test(x.ro) &&
        x.tau === `κ₁ ≈ ${digits}` &&
        x.kOut === `≈ ${digits}` &&
        x.sub.includes(`κ₁ ≈ ${digits}`) &&
        !/x₃ = x₀|x₃ 回到|x₃ is back/.test([x.sub, x.note, x.tour, ...x.tags].join(' ')),
      JSON.stringify([s.k1, s.heap.period, s.heap.near, x.ro, x.tau, x.kOut])
    );
    if (lang === 'en') {
      // xₙ = x₀ ⇔ Tₙ(c) = 1: the recursion on integers over qⁿ
      const [p, q] = doubleN(s.k1),
        c = 2n * p - q;
      let a = 1n,
        b = c,
        qn = q,
        returns = b === qn ? [1] : [];
      for (let k = 2; k <= 240; k++) {
        [a, b] = [b, 2n * c * b - q * q * a];
        qn *= q;
        if (b === qn) returns.push(k);
      }
      check(`κ₁ = ${s.k1}, the double itself: Tₙ(2κ₁ − 1) ≠ 1 for n = 1 … 240, in integers`, !returns.length, returns.join(' '));
    }
  }
  // far from every return the note says no return, and at 1/3 (never closing) too
  for (const t of [0.63, 2 / 3]) {
    await input('#now', t);
    const s = await state(),
      x = await spoken();
    check(`${lang}: rail t = ${t}: the least chord is ${s.heap.near.chord.toFixed(4)} ≥ 10⁻³: no return within 240 steps, not called a near approach`, s.heap.period === 0 && s.heap.near.chord > 1e-3 && x.ro.includes(lang === 'zh' ? '前 240 步不回到 x₀' : 'no return to x₀ within 240 steps') && !/贴近|near-approach/.test(x.ro), x.ro);
  }
}
// the exact landmarks keep their place within the rounding of the rail (chips, cards, keys), not 10⁻¹⁵ beside them
for (const [card, list] of [
  [C_CARD, [1, 0.75, 0.5, 1 / 3, 0.25, 0]],
  [F_CARD, [KSTAR, KCONJ, 0.625, 2 / 3, 0.65, 21 / 32]]
]) {
  await pick(card);
  for (const k of list) {
    await page.evaluate((k) => {
      const el = [...document.querySelectorAll('#ctlPanel [data-k]')].find((b) => {
        const [p, q] = b.dataset.k.split('/').map(Number);
        return b.closest('.field').getClientRects().length && Math.abs((b.dataset.k === 'phi' ? (3 + Math.sqrt(5)) / 8 : b.dataset.k === 'conj' ? (3 - Math.sqrt(5)) / 8 : q ? p / q : p) - k) < 1e-12;
      });
      el.click();
      TRV.kit.flush();
    }, k);
    const s = await state();
    const x = await spoken();
    // ▶ and ❚❚ at once: the clock writes the parameter back from t = 1 − κ₁, and the landmark survives (at t = 1 ▶ starts over)
    if (k > 0)
      await page.evaluate(() => {
        const el = document.getElementById('play');
        el.click();
        el.click();
        TRV.kit.flush();
      });
    const back = await state();
    check(`${card}: the chip κ₁ = ${k} is the landmark itself, named on the rail and the slider, and stays so when the clock writes it back`, s.k1 === k && s.heap.exact !== null && /^κ₁ = \S/.test(x.tau) && x.kOut === x.tau.slice(3) && back.k1 === k && !back.playing && same(back.heap.exact, s.heap.exact), JSON.stringify([s.k1, s.heap.exact, x.tau, x.kOut, back.k1]));
  }
}

// a κ₁ of the slider keeps its own double while the rail stands within four ulps of 1 of it (1 − t only rounds it); from there on the
// rail has a value of its own: the threshold is that of the landmarks, not 10⁻¹⁵
await pick(C_CARD);
{
  await input('#kRange', 0.95);
  const kept = (await state()).k1,
    seen = [];
  for (const t of [0.05, 0.0499999999999995, 0.0500000000000005]) {
    await input('#now', t);
    seen.push([t, (await state()).k1]);
  }
  const far = 0.049999999999999,
    off = 1 - far - kept;
  await input('#now', far);
  const moved = (await state()).k1;
  check('κ₁ = 0.95 of the slider: a rail 0 or 5·10⁻¹⁶ beside it keeps the double, a rail 9.99·10⁻¹⁶ beside it (above 4·2⁻⁵², below 10⁻¹⁵) is κ₁ = 1 − t itself', kept === 0.95 && seen.every(([, k]) => k === kept) && off > 2 ** -50 && off < 1e-15 && moved === 1 - far, JSON.stringify([kept, seen, off, moved]));
}

// the keys walk the multiples of 1/100 of the rail: the rational landmarks on them are met exactly, with their names
await pick(C_CARD);
await page.focus('#stageHandle');
{
  const met = [];
  for (const [steps, name, period] of [[25, '1/2', 4], [15, '13/20', 0], [10, '3/4', 6], [25, '1', 1]]) {
    for (let k = 0; k < steps; k++) await page.keyboard.press('ArrowLeft');
    await settle(page);
    const s = await state(),
      x = await spoken(),
      [p, q = 1] = name.split('/').map(Number);
    met.push([name, s.k1 === p / q && s.heap.period === period && x.tau === `κ₁ = ${name}` && x.kOut === `= ${name}`, s.k1, x.tau]);
  }
  check('ArrowLeft on the handle from κ₁ = 1/4 meets 1/2, 13/20, 3/4 and 1 themselves, named on the rail and the slider', met.every((m) => m[1]), JSON.stringify(met));
}

// exp_remainder_le as printed: the bound rᴺ/N!/(1 − r/(N + 1)) from above and the remainder to the nearest, as fractions of integers at
// the double r = θ
{
  // the two reproductions, on the page (the rail holds 15 significant digits of t) and on the double itself
  await pick(E_CARD);
  for (const lang of ['en', 'zh']) {
    await page.click(`[data-lang-set="${lang}"]`);
    await settle(page);
    for (const [t, want] of [
      [0.07374581709764938, '0.002201'],
      [1.0237668455786e-19, '5.546×10⁻⁵⁷']
    ]) {
      await input('#nRange', 3);
      await input('#now', t);
      const s = await state(),
        note = await page.textContent('#roNote'),
        [sign, l, r] = printedTailText(note),
        on = auditTail(3, s.theta, `${sign} ${l}${lang === 'zh' ? '，上界' : ', bound'} ≤ ${r}`),
        exact = await page.evaluate((r) => window.RATIONAL_DEBUG.tail(3, r), PI * t),
        off = auditTail(3, PI * t, exact.text),
        // the doubles of the state: the bound between rightLo and rightHi, the remainder between leftLo and leftHi (its alternating series
        // cut below and above it)
        encloses = [[s.theta, s.leanInstances.tail], [PI * t, exact]].every(([th, x]) => {
          const bound = tailBoundN(3, th),
            [low, high] = remainderSquaredN(3, th);
          return cmpN(doubleN(x.rightLo), bound) < 0 && cmpN(bound, doubleN(x.rightHi)) < 0 && cmpN(squareN(doubleN(x.leftLo)), low) < 0 && cmpN(low, high) <= 0 && cmpN(high, squareN(doubleN(x.leftHi))) < 0;
        });
      check(`${lang}: N = 3, rail t = ${t}: the printed right side ${want} is above the bound and the remainder (fractions), the doubles of the state enclose the two`, s.N === 3 && s.theta > 0 && on === '' && off === '' && r === want && exact.text.endsWith(`≤ ${want}`) && encloses, JSON.stringify([note, on, off, exact]));
    }
  }
  // the next double above x
  const next = (x, k) => {
    const buf = new Float64Array([x]),
      bits = new BigInt64Array(buf.buffer);
    bits[0] += BigInt(k);
    return buf[0];
  };
  // N = 3 … 12: the first double r whose bound exceeds a decimal of four digits (by bisection on fractions), and its neighbours
  const cases = [];
  let trapped = 0;
  for (let N = 3; N <= 12; N++)
    for (const D of ['0.0022', '0.0500', '0.1234', '0.0010', '0.0097', '1.000×10⁻⁴', '9.999×10⁻⁵', '5.545×10⁻⁷', '2.200×10⁻⁹', '1.001×10⁻²⁰', '7.777×10⁻³³', '5.545×10⁻⁵⁷', '3.000×10⁻¹²⁰']) {
      const target = decimalN(D);
      let lo = 1e-60,
        hi = PI;
      if (cmpN(tailBoundN(N, hi), target) <= 0 || cmpN(tailBoundN(N, lo), target) > 0) continue;
      // bisection on the doubles themselves
      const bitsOf = (x) => new BigInt64Array(new Float64Array([x]).buffer)[0],
        valueOf = (b) => new Float64Array(new BigInt64Array([b]).buffer)[0];
      let a = bitsOf(lo),
        b = bitsOf(hi);
      while (b - a > 1n) {
        const mid = (a + b) / 2n;
        if (cmpN(tailBoundN(N, valueOf(mid)), target) > 0) b = mid;
        else a = mid;
      }
      hi = valueOf(b);
      for (let k = -3; k <= 6; k++) cases.push([N, next(hi, k), D]);
      // a naive product of doubles that does not exceed D here would print D, below the bound
      let first = 1;
      for (let k = 1; k <= N; k++) first *= hi / k;
      if (first * (1 / (1 - hi / (N + 1))) <= parseNumber(D)) trapped++;
    }
  const texts = await page.evaluate((list) => list.map(([N, r]) => window.RATIONAL_DEBUG.tail(N, r).text), cases);
  const bad = cases.map(([N, r, D], i) => [N, r, D, texts[i], auditTail(N, r, texts[i])]).filter((x) => x[4]);
  check(`exp tail at ${cases.length} doubles around decimals of four digits, N = 3 … 12: the bound from above, the remainder to the nearest as exact fractions (a plain product of doubles would print below the bound ${trapped} times)`, cases.length >= 800 && trapped >= 10 && !bad.length, JSON.stringify(bad.slice(0, 3)));
  // every N, random angles, and below the doubles
  let seed = 5;
  const rand = () => (seed = (seed * 48271) % 2147483647) / 2147483647,
    more = [];
  for (let N = 3; N <= 48; N++) {
    for (let k = 0; k < 6; k++) more.push([N, PI * rand() ** 2], [N, PI * 10 ** (-20 * rand())]);
    more.push([N, PI * 1e-100], [N, PI * 1e-300]);
  }
  const moreTexts = await page.evaluate((list) => list.map(([N, r]) => window.RATIONAL_DEBUG.tail(N, r).text), more);
  const bad2 = more.map(([N, r], i) => [N, r, moreTexts[i], auditTail(N, r, moreTexts[i])]).filter((x) => x[3]);
  const below = moreTexts.filter((t) => /×10⁻(?:3[1-9]\d|[4-9]\d\d|\d{4})/.test(t.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (d) => SUP.indexOf(d)))).length;
  check(`exp tail at ${more.length} more angles, N = 3 … 48 (${below} of them below the doubles): the bound from above, the remainder to the nearest as exact fractions`, more.length === 644 && below > 100 && !bad2.length, JSON.stringify(bad2.slice(0, 3)));
}
// the drifts: 0 is written of 0 alone, a rounding of the doubles in significant digits
await pick(C_CARD);
for (const lang of ['en', 'zh']) {
  await page.click(`[data-lang-set="${lang}"]`);
  await settle(page);
  const seen = [];
  for (const label of ['1', '3/4', '1/2', '1/3', '1/4', '0']) {
    await page.click(`#chebChips [data-k="${label}"]`);
    await settle(page);
    const s = await state(),
      x = await spoken(),
      I = s.leanInstances,
      m = new RegExp(`(?:浮点偏差|floating-point drift) ([=≈] ${NUMBER}).*?(?:浮点偏差|floating-point drift) ([=≈] ${NUMBER})`).exec(x.ro) || [],
      want = [Math.max(I.cheb.rec, I.cheb.dot), I.dist.heap, Math.abs(s.heap.k2 - s.heap.k2law)],
      got = [m[1], m[2], x.key];
    seen.push(...want);
    check(
      `${lang}: κ₁ = ${label}: the drifts on the note and the key readout are “= 0” of 0 alone, else “≈ …×10⁻¹ⁿ”, never 0.0000, and all below 10⁻¹⁴ (NUM)`,
      got.every((t, i) => (want[i] === 0 ? t === '= 0' : !!t && t.startsWith('≈ ') && near(parseNumber(bareText(t)) / want[i], 1, 6e-4))) && !/(?:偏差|drift)[^，；;,]*0\.0000/.test(x.ro) && !/0\.0000/.test(x.key) && [...want, I.gram.gap, I.ray.dup].every((d) => d < 1e-14) && I.dottie.gap < 1e-15 && Math.abs(I.dottie.sum - I.dottie.theta) === I.dottie.gap,
      JSON.stringify([got, want])
    );
  }
  check(`${lang}: both an exact 0 and a rounding of the doubles were seen`, seen.includes(0) && seen.some((d) => d > 0), JSON.stringify(seen));
}

// λ: the rail at 0.9999999999995 is not 1, on any line; 1 is
await pick(R_CARD);
for (const lang of ['en', 'zh']) {
  await page.click(`[data-lang-set="${lang}"]`);
  await settle(page);
  if ((await state()).lens !== 1) await page.click('#lensToggleBtn');
  for (const [t, regime, sign, digits] of [
    [0.9999999999995, 'blend', '≈', '1.00'],
    [1, 'pure', '=', '1.00'],
    [0.5, 'blend', '=', '0.50'],
    [0.4999999999995, 'blend', '≈', '0.50'],
    [0.35, 'blend', '≈', '0.35'],
    [0.25, 'blend', '=', '0.25'],
    [5e-13, 'blend', '≈', '5.000×10⁻¹³']
  ]) {
    await input('#now', t);
    const s = await state(),
      x = await spoken(),
      text = `λ ${sign} ${digits}`,
      lines = { title: x.title, sub: x.sub, keySub: x.keySub, tau: x.tau, note: x.note, tour: x.tour };
    check(
      `${lang}: sphere card, rail t = ${t}: regime ${regime}, the title, the HUD line, the key readout, the rail, the notes and the slider all write ${text}`,
      s.lambda === t && s.regime === regime && s.preset === R_CARD && Object.values(lines).every((l) => l.includes(text) && !l.includes(`λ ${sign === '=' ? '≈' : '='}`)) && x.lambdaOut === `${sign} ${digits}` && x.tau === text,
      JSON.stringify([s.regime, lines, x.lambdaOut])
    );
  }
  await page.click('#lensToggleBtn');
  await settle(page);
}
// θ: whole degrees of the slider and of the keys, and quarter degrees of the handle are themselves on every line
await pick(E_CARD);
for (const [set, d] of [
  [() => input('#thetaRange', 60), 60],
  [() => input('#thetaRange', 1), 1],
  [() => input('#thetaRange', 89), 89],
  [() => input('#thetaRange', 179), 179],
  [() => input('#now', 0.25), 45],
  [() => input('#now', 0.0625), 11.25]
]) {
  await set();
  const s = await state(),
    x = await spoken();
  const whole = Number.isInteger(d);
  check(`θ = ${d}° set on the slider or the rail: thetaDeg is ${d}, “=” on the HUD line and, where the digits are whole, on the rail and the slider`, s.thetaDeg === d && x.sub.includes(`θ = ${d.toFixed(2)}°`) && (!whole || (x.tau === `θ = ${d}.0°` && x.thetaOut === `= ${d}°` && x.meta === `θ = ${d}°`)) && (whole || (x.tau.startsWith('θ ≈ ') && x.thetaOut === `≈ ${Math.round(d)}°`)), JSON.stringify([s.theta, s.thetaDeg, x.sub, x.tau, x.thetaOut]));
}
await input('#thetaRange', 90);
await page.focus('#stageHandle');
{
  const wrong = [];
  for (let d = 89; d >= 60; d--) {
    await page.keyboard.press('ArrowLeft');
    await settle(page);
    const s = await state(),
      x = await spoken();
    if (!(s.thetaDeg === d && x.sub.includes(`θ = ${d}.00°`) && x.tau === `θ = ${d}.0°` && x.thetaOut === `= ${d}°`)) wrong.push([d, s.theta, s.thetaDeg, x.tau]);
  }
  check('thirty ArrowLeft from 90°: every step is its whole degree itself on the HUD line, the rail and the slider', !wrong.length, JSON.stringify(wrong.slice(0, 2)));
}
for (const [t, sub] of [[0.4999999999995, 'θ ≈ 90.00°'], [0.333333333333333, 'θ ≈ 60.00°'], [0.123456, 'θ ≈ 22.22°']]) {
  await input('#now', t);
  const s = await state(),
    x = await spoken();
  check(`rail t = ${t} is no quarter degree: ${sub} on the HUD line, “≈” on the rail and the slider`, s.theta === PI * t && x.sub.includes(sub) && x.tau.startsWith('θ ≈ ') && x.thetaOut.startsWith('≈ '), JSON.stringify([s.theta, x.sub, x.tau, x.thetaOut]));
}
// the formatters themselves
{
  const got = await page.evaluate(() => {
    const { eqRel, sciRel, degRel } = window.RATIONAL_DEBUG.print;
    return [
      ...[[1, 2], [0.9999999999995, 2], [0.5, 2], [0, 2], [0.35, 2], [0.375, 4], [0.1, 4], [0.0625, 4], [0.03125, 4], [1e-13, 4], [1 + 2 ** -52, 4], [720, 2]].map(([x, d]) => eqRel(null, x, d)),
      eqRel('1/3', 1 / 3),
      ...[0, 0.5, 2 ** -52, 5.6e-4, 12340, 12345, 1e22, 1e23, 5e-324, 2 ** -12].map(sciRel),
      ...[[90, 2], [89.99999999991, 2], [0, 2], [11.25, 2], [11.25, 1], [180, 0]].map(([x, d]) => degRel(x, d))
    ];
  });
  const want = ['= 1.00', '≈ 1.00', '= 0.50', '= 0.00', '≈ 0.35', '= 0.3750', '≈ 0.1000', '= 0.0625', '≈ 0.0313', '≈ 1.000×10⁻¹³', '≈ 1.0000', '= 720.00', '= 1/3', '= 0', '= 0.5000', '≈ 2.220×10⁻¹⁶', '≈ 5.600×10⁻⁴', '= 1.234×10⁴', '≈ 1.234×10⁴', '= 1.000×10²²', '≈ 1.000×10²³', '≈ 4.941×10⁻³²⁴', '≈ 2.441×10⁻⁴', '= 90.00°', '≈ 90.00°', '= 0.00°', '= 11.25°', '≈ 11.3°', '= 180°'];
  // (12345 and 11.25 are ties of their last digit: either neighbour rounds them)
  const tie = { '≈ 1.234×10⁴': '≈ 1.235×10⁴', '≈ 11.3°': '≈ 11.2°' };
  check('eqRel, sciRel and degRel write “=” only of the decimal that the double is', got.length === want.length && got.every((x, i) => x === want[i] || x === tie[want[i]]), JSON.stringify(got.map((x, i) => [x, want[i]]).filter(([x, w]) => x !== w)));
}

/* ---------- lenses ---------- */
await pick(E_CARD);
{
  const before = await state(),
    pill0 = await textOf('scenePill'),
    title0 = await textOf('hudTitle'),
    tags0 = await tagText();
  await page.click('#lensToggleBtn');
  await settle(page);
  const on = await state(),
    pill1 = await textOf('scenePill'),
    title1 = await textOf('hudTitle'),
    tags1 = await tagText();
  check('the lens switch keeps the state and renames the pill, the title and the stage labels', on.lens === 1 && ['theta', 'N', 'k1', 'lambda', 'scene', 'preset', 't'].every((k) => same(on[k], before[k])) && pill1 !== pill0 && title1 !== title0 && !same(tags0, tags1));
  check('the flat lens is named MODEL on the pill and the title, and reads |z₆|² = 1.4885 on the stage', /MODEL/.test(pill1) && /MODEL/.test(title1) && tags1.some((t) => t.includes('1.4885')) && (await page.getAttribute('#mobileLensBtn', 'aria-pressed')) === 'true');
  await layout(page, 'flat lens on the e card');
  await page.click('#lensToggleBtn');
  await settle(page);
  check('back to the rational ledger', (await state()).lens === 0 && (await textOf('scenePill')) === pill0);
}

/* ---------- the strips: legend clearance (≥ 8 px from every curve, dot and cursor), computed here ---------- */
/** One strip as painted: the boxes of its legend rows (text ink and key strokes) and their least distance (px) to the
    curves of that strip, written here from the plot's axis map and the state. */
async function stripClearance(p, which) {
  return p.evaluate(([which, KS, KC]) => {
    const plot = TRV.kit.plot,
      s = window.RATIONAL_DEBUG.state;
    let n = 0,
      out = null;
    TRV.kit.plot = (...args) => {
      const g = plot(...args);
      if (n++ !== which) return g;
      const legend = g.legend;
      g.legend = (...rest) => {
        const ctx = g.ctx,
          fill = ctx.fillText,
          move = ctx.moveTo,
          line = ctx.lineTo,
          boxes = [];
        let from = null;
        ctx.fillText = function (text, x, y, ...more) {
          const m = ctx.measureText(text);
          boxes.push({ text, l: x - m.actualBoundingBoxLeft, r: x + m.actualBoundingBoxRight, t: y - m.actualBoundingBoxAscent, b: y + m.actualBoundingBoxDescent });
          return fill.call(this, text, x, y, ...more);
        };
        ctx.moveTo = function (x, y) {
          from = [x, y];
          return move.call(this, x, y);
        };
        ctx.lineTo = function (x, y) {
          if (from) boxes.push({ text: 'key', l: Math.min(from[0], x), r: Math.max(from[0], x), t: Math.min(from[1], y) - 1, b: Math.max(from[1], y) + 1 });
          return line.call(this, x, y);
        };
        try {
          legend(...rest);
        } finally {
          ctx.fillText = fill;
          ctx.moveTo = move;
          ctx.lineTo = line;
        }
        // the curves of the strip (2 px strokes) and its marks
        const curves =
          which === 0
            ? [(N) => 1 - Math.cos(Math.PI / N), (N) => Math.pow(1 + (s.theta * s.theta) / (N * N), N) - 1, () => 0]
            : [(k) => (2 * k - 1) ** 2, (k) => k * (4 * k - 3) ** 2, (k) => k];
        const dots = which === 0 ? [] : [[1, 1], [0.5, 0], [1 / 3, 1 / 9], [0.25, 0.25], [0, 1], [KS, KC], [KC, KS]];
        let gap = Infinity;
        // strip 1 draws its curves up to 1.1 (a steeper Euler excess leaves through the top with an arrow)
        const top = which === 0 ? 1.1 : g.y1;
        for (const b of boxes) {
          for (let x = Math.max(b.l - 4, g.pl); x <= Math.min(b.r + 4, g.pl + g.iw); x += 0.5) {
            const v = g.invX(x);
            for (const f of curves) {
              const y = f(v);
              if (!(y <= top)) continue;
              const c = g.Y(y);
              gap = Math.min(gap, c - 1 > b.b ? c - 1 - b.b : c + 1 < b.t ? b.t - c - 1 : -1);
            }
          }
          for (const [dx, dy] of dots) {
            const cx = g.X(dx),
              cy = g.Y(dy);
            if (cx + 4 < b.l || cx - 4 > b.r) continue;
            gap = Math.min(gap, cy - 4 > b.b ? cy - 4 - b.b : cy + 4 < b.t ? b.t - cy - 4 : -1);
          }
          // the amber cursor and its dots at the current value
          const cur = which === 0 ? s.N : s.k1,
            cx = g.X(cur),
            capTop = g.Y(which === 0 ? 0.7 : 1);
          if (cx + 4 >= b.l && cx - 4 <= b.r) gap = Math.min(gap, capTop - 4 > b.b ? capTop - 4 - b.b : -1);
        }
        out = { gap, rows: boxes.filter((b) => b.text !== 'key').map((b) => b.text), keys: boxes.filter((b) => b.text === 'key').length, canvas: g.H, width: g.W };
      };
      return g;
    };
    try {
      TRV.kit.flush();
    } finally {
      TRV.kit.plot = plot;
    }
    return out;
  }, [which, KSTAR, KCONJ]);
}
async function stripChecks(p, label) {
  for (const [which, rows] of [[0, 3], [1, 2]]) {
    const c = await stripClearance(p, which);
    check(`${label} strip ${which + 1}: the ${rows} legend rows sit in open headroom ≥ 8 px clear of every curve, dot and cursor (canvas ${c && c.canvas} px)`, !!c && c.rows.length >= rows && c.keys === rows && c.gap >= 8, JSON.stringify(c));
  }
}
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`);
  await settle(page);
  await stripChecks(page, lang + ' desktop');
}
// the worst case of strip 1: θ = 180° lifts the Euler excess
await pick(E_CARD);
await input('#thetaRange', 180);
await stripChecks(page, 'en desktop θ = 180°');
await page.click('[data-lang-set="zh"]');
await settle(page);
await stripChecks(page, 'zh desktop θ = 180°');
// the narrowest three-column lab has the narrowest strips
for (const lang of ['zh', 'en']) {
  const p = await T.open(BOOK, ID, '?lang=' + lang, { viewport: { width: 1081, height: 700 }, reducedMotion: 'reduce' });
  await settle(p);
  for (const th of [0, 90, 180]) {
    await input('#thetaRange', th, p);
    await stripChecks(p, `${lang}/1081×700 θ = ${th}°`);
  }
  await p.context().close();
}
// the rows of the readouts break between their values, never between “=” or “≈” and the value
for (const lang of ['zh', 'en']) {
  for (const width of [320, 390, 1081, 1440]) {
    const p = await T.open(BOOK, ID, `?lang=${lang}&preset=${C_CARD}`, { viewport: { width, height: 844 }, reducedMotion: 'reduce' });
    await settle(p);
    const wrong = [];
    for (const [card, t] of [[C_CARD, 0.1882550990706332], [E_CARD, 1], [E_CARD, 1e-9], [F_CARD, 0.34549151], [R_CARD, 1]]) {
      await p.evaluate((c) => document.querySelector(`[data-preset="${c}"]`).click(), card);
      await settle(p);
      await input('#now', t, p);
      wrong.push(
        ...(await p.evaluate(() =>
          ['roPi', 'roE', 'roCheb', 'roPhi', 'roPure'].flatMap((id) => {
            const out = document.getElementById(id),
              box = out.closest('dd').getBoundingClientRect();
            return [...out.children].filter((v) => v.getClientRects().length !== 1 || v.getBoundingClientRect().right > box.right + 0.5).map((v) => `${id}: ${v.textContent}`);
          })
        ))
      );
    }
    check(`${lang}/${width}: every value of the readouts stands whole on one line inside its row`, !wrong.length && (await overflowX(p)) === 0, wrong.slice(0, 3).join(' | '));
    await p.context().close();
  }
}
check('desktop: the mirror lens button of the tour bar stays hidden', (await page.evaluate(() => innerWidth)) > 1080 && (await page.locator('#mobileLensBtn').isHidden()));
// colour semantics: amber only for the handle, the active controls and the present
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
      out = [];
    for (const el of document.querySelectorAll('#stage *, .strip *, #readouts *, .field output')) {
      if (el.closest('.handle') || el.matches('.hud-bl .sw.am')) continue;
      const cs = getComputedStyle(el);
      for (const prop of ['color', 'backgroundColor', 'borderTopColor']) if (banned.includes(cs[prop])) out.push(`${el.id || el.className || el.tagName} ${prop}`);
    }
    return out;
  });
  check('semantic colours: no amber, green or red text in the stage, strips, readouts or outputs (but the handle)', !bad.length, bad.slice(0, 3).join(' | '));
}
{
  const ev = await page.evaluate(() => ({
    green: [...document.querySelectorAll('#basis .lean')].filter((b) => !/(^|\s)(num|model|argued|open|frozen)(\s|$)/.test(b.className)).map((b) => b.querySelector('a[data-lean-gid]').dataset.leanGid),
    kinds: [...document.querySelectorAll('#basis .lean')].map((b) => b.className),
    drawer: document.querySelector('#drawerEvidence').children.length
  }));
  check('evidence: fifteen green boxes cite the fifteen GIDs in order; then ARGUED, MODEL and NUM; the drawer repeats all eighteen', same(ev.green, GIDS) && same(ev.kinds.slice(15), ['lean argued', 'lean model', 'lean num']) && ev.drawer === 18, JSON.stringify(ev.kinds.slice(14)));
}

/* ---------- phones, embeds, cited figures and stills ---------- */
const FIGURE_TEXT = {
  [PI_CARD]: ['0.1340', '720.00°'],
  [E_CARD]: ['1.4885', '1.0000'],
  [C_CARD]: ['1/4', 'x₃ = x₀'],
  [F_CARD]: ['(φ + 1)/4', '(2 − φ)/4', '1/3'],
  [R_CARD]: ['1.00', '1/3']
};
for (const lang of ['zh', 'en']) {
  // 390 × 844: on every card the stage and the tour bar with the mirror lens button end inside the first screen
  {
    colorScheme = 'light';
    const p = await T.open(BOOK, ID, '?lang=' + lang, { viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await settle(p);
    const visited = new Set();
    for (let j = 0; j < ORDER.length; j++) {
      const s = await state(p);
      visited.add(s.preset);
      check(`${lang}/390/${s.preset}: under reduced motion the card parks on its still`, near(s.t, CARDS[s.preset].still, 1e-12) && !s.playing && !s.blending);
      const fold = await p.evaluate(() => {
        const r = (sel) => document.querySelector(sel).getBoundingClientRect();
        return { stage: r('#stage').bottom + scrollY, stageH: r('#stage').height, tour: r('#tour').bottom + scrollY, lens: r('#mobileLensBtn').bottom + scrollY, vh: innerHeight };
      });
      check(`${lang}/390/${s.preset}: #stage (≥ 440 px), #tour and #mobileLensBtn end inside the first screen`, (await p.locator('#mobileLensBtn').isVisible()) && fold.stageH >= 440 && fold.stage <= fold.vh && fold.tour <= fold.vh && fold.lens <= fold.vh, JSON.stringify(fold));
      await layout(p, `${lang}/390/${s.preset}`);
      if (lang === 'en') check(`English 390/${s.preset}`, !(await cjkLeftovers(p)).length);
      await p.locator('.tour [data-tour="next"]').click();
      await settle(p);
    }
    check(`${lang}/390: the tour visits all five cards`, visited.size === 5);
    await codeChecks(p, `${lang}/390`);
    // the mirror lens button flips the same lens as the rail switch
    const pressed = () => Promise.all(['#mobileLensBtn', '#lensToggleBtn'].map((sel) => p.getAttribute(sel, 'aria-pressed')));
    await p.evaluate(() => scrollTo(0, 0));
    await p.click('#mobileLensBtn');
    await settle(p);
    check(`${lang}/390: the mirror lens button switches the lens and syncs the rail switch`, (await state(p)).lens === 1 && same(await pressed(), ['true', 'true']));
    await layout(p, `${lang}/390 flat lens`);
    await p.click('#mobileLensBtn');
    await settle(p);
    check(`${lang}/390: and back`, (await state(p)).lens === 0 && same(await pressed(), ['false', 'false']));
    await p.context().close();
  }
  // the whole lab embedded in the chapter: the strip keeps both canvases and the legends their headroom
  for (const [width, height] of [[390, 620], [740, 620], [1280, 760]]) {
    colorScheme = 'dark';
    const p = await T.open(BOOK, ID, `?embed=1&lang=${lang}`, { viewport: { width, height }, reducedMotion: 'reduce' });
    await settle(p);
    const g = await p.evaluate(() => {
      const box = (el) => {
        const b = el.getBoundingClientRect();
        return { l: b.left, r: b.right, t: b.top + scrollY, b: b.bottom + scrollY, h: b.height };
      };
      const q = (s) => box(document.querySelector(s));
      return { embed: document.documentElement.hasAttribute('data-embed'), figure: document.documentElement.hasAttribute('data-figure'), strip: q('.strip'), plot: q('#plot'), plotB: q('#plotB'), rail: q('footer.rail'), panels: [...document.querySelectorAll('.strip .panel')].map(box), lens: getComputedStyle(document.querySelector('#mobileLensBtn')).display };
    });
    const inside = (a, b) => a.l >= b.l - 1 && a.r <= b.r + 1 && a.t >= b.t - 1 && a.b <= b.b + 1;
    check(
      `${lang}/embed ${width}×${height}: the strip holds #plot and #plotB whole (≥ 118 px each, inside their panels) above the rail, and the mirror lens button shows`,
      g.embed && !g.figure && g.plot.h >= 118 && g.plotB.h >= 118 && inside(g.plot, g.panels[0]) && inside(g.plotB, g.panels[1]) && inside(g.panels[0], g.strip) && inside(g.panels[1], g.strip) && g.strip.b <= g.rail.t + 0.5 && g.lens !== 'none',
      JSON.stringify(g)
    );
    await stripChecks(p, `${lang}/embed ${width}×${height}`);
    await layout(p, `${lang}/embed ${width}×${height}`);
    await p.context().close();
  }
  // cited figures of every card at 334 and 740 × 500: one short sentence with the still numbers, no sub- or superscripts
  for (const id of ORDER)
    for (const width of [334, 740]) {
      const p = await T.open(BOOK, ID, `?embed=1&lang=${lang}&preset=${id}`, { viewport: { width, height: 500 }, reducedMotion: 'reduce' });
      await settle(p);
      const s = await state(p),
        note = await p.locator('.tour .tour-note').innerText();
      check(`${lang}/figure ${width}/${id}: parked on the still, the strip and the mirror lens hidden`, s.preset === id && near(s.t, CARDS[id].still, 1e-12) && (await p.locator('.strip').isHidden()) && (await p.locator('#mobileLensBtn').isHidden()));
      check(`${lang}/figure ${width}/${id}: the note states the still numbers`, FIGURE_TEXT[id].every((x) => note.includes(x)), note);
      check(`${lang}/figure ${width}/${id}: the note has no sub- or superscripts`, (await p.locator('.tour .tour-note sub, .tour .tour-note sup').count()) === 0);
      await layout(p, `${lang}/figure ${width}/${id}`, true);
      if (id === E_CARD && width === 740) {
        await p.click('#rewindBtn');
        await settle(p);
        const z = await p.locator('.tour .tour-note').innerText(),
          sub = await p.textContent('#hudSub');
        check(`${lang}/figure 740: ⏮ on the e card turns the figure note and the HUD to θ = 0, no escape`, (await state(p)).theta === 0 && /θ = 0/.test(z) && z.includes('1.0000') && !/> 1/.test(z) && !/> 1/.test(sub), z);
      }
      await p.context().close();
    }
  // a 480 px iframe has a stage narrower than 480 px: the optional labels of the captions (stage ≥ 480 px) stay away
  for (const width of [480, 740]) {
    const p = await T.open(BOOK, ID, `?embed=1&lang=${lang}&preset=${E_CARD}`, { viewport: { width, height: 500 }, reducedMotion: 'reduce' });
    await settle(p);
    const stageW = await p.evaluate(() => document.querySelector('#stage').getBoundingClientRect().width),
      labels = await tagText(p),
      wide = width === 740;
    check(`${lang}/figure ${width}×500 on the e card: the stage is ${wide ? '≥' : '<'} 480 px wide and the label σ = i = Q(σ) ${wide ? 'shows' : 'stays away'}`, stageW >= 480 === wide && labels.includes('σ = i = Q(σ)') === wide, JSON.stringify([stageW, labels]));
    if (wide) await sigmaChecks(p, `${lang}/figure 740×500`, (d) => input('#now', d / 180, p), true);
    else {
      await layout(p, `${lang}/figure 480×500 on the e card`, true);
      for (const t of [179 / 180, 1]) {
        await input('#now', t, p);
        await layout(p, `${lang}/figure 480×500 on the e card, θ = ${Math.round(180 * t)}°`, true);
      }
    }
    await p.context().close();
  }
  // stills for PDF and EPUB
  for (const id of ORDER) {
    const p = await openStill(T, BOOK, ID, id, lang);
    const m = await state(p);
    check(`still ${lang}/${id}: parked on the declared frame, the handle and the mirror lens hidden`, !m.playing && near(m.t, CARDS[id].still, 1e-12) && (await p.locator('#stageHandle').isHidden()) && (await p.locator('#mobileLensBtn').isHidden()));
    const ring = await p.evaluate(() => {
      const mark = window.TRV.solids[0].marks().find((k) => k.key === 'current'),
        at = window.RATIONAL_DEBUG.project(window.RATIONAL_DEBUG.state.handle);
      return mark ? [mark.x - at.x, mark.y - at.y, mark.hidden] : null;
    });
    check(`still ${lang}/${id}: an amber ring marks the current point where the handle would be`, !!ring && Math.hypot(ring[0], ring[1]) < 1 && !ring[2], JSON.stringify(ring));
    // in a still the stage fills the frame over the tour bar and the strips: only its own title, legend and labels count
    const view = await stageView(p, '#stage', true),
      over = await labelOverlaps(p, '.stage .tag', 0);
    check(`still ${lang}/${id}: the title, the legend and the labels are whole and apart`, !view.hud.length && !over.length, JSON.stringify([view.hud, over]));
    const want = {
      [PI_CARD]: () => m.N === 6 && f4(m.pi.sag) === '0.1340',
      [E_CARD]: () => f4(m.euler.z2) === '1.4885' && near(m.euler.qNorm2, 1, 1e-15),
      [C_CARD]: () => m.k1 === 0.25 && near(m.heap.k2, 0.25, 1e-12) && m.heap.period === 3,
      [F_CARD]: () => near(m.k1, KSTAR, 1e-15) && m.heap.gap === 0,
      [R_CARD]: () => m.lambda === 1 && same(m.probe.kappa, [1, 3])
    }[id];
    check(`still ${lang}/${id}: the numbers of its caption`, want());
    await p.context().close();
  }
}
// a cited figure opens paused on the frame its caption names; ▶ plays the sweep again from its start and parks there
for (const id of [E_CARD, R_CARD]) {
  const p = await T.open(BOOK, ID, `?embed=1&lang=zh&preset=${id}`, { viewport: { width: 740, height: 500 } });
  await settle(p);
  const s = await state(p);
  check(`${id}: the cited figure opens paused on its still`, !s.playing && near(s.t, CARDS[id].still, 1e-12) && s.preset === id);
  check(`${id}: ▶ plays the sweep`, await playsAfter(p, () => p.click('#playBtn'), () => window.RATIONAL_DEBUG.state));
  const back = await until(p, (still) => !window.RATIONAL_DEBUG.state.playing && Math.abs(window.RATIONAL_DEBUG.state.t - still) < 1e-12, CARDS[id].still, 150000);
  check(`${id}: the sweep parks on the still again, the card still marked`, back && (await state(p)).preset === id);
  await p.context().close();
}
for (const id of ORDER) check(`${id} plays`, await playsAfter(page, () => page.click(`[data-preset="${id}"]`), () => window.RATIONAL_DEBUG.state));
check('permanent dark console in both system schemes', !paletteMutations.length && paletteDocuments.every((x) => x.absent) && paletteDocuments.some((x) => x.dark) && paletteDocuments.some((x) => !x.dark));
check('zero console warnings', browserWarnings.length === 0, browserWarnings.slice(0, 3).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('zero browser or request errors', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));
await T.finish();
