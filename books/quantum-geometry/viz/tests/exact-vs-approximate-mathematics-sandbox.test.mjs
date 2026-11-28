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
const ID = 'exact-vs-approximate-mathematics-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const THEORY = 'ch39-s34-exact-structural-mathematics-vs-flat-approximation.html#sec-ch39-exact-structural-mathematics-vs-flat-approximation';
const SECTION = '32.6';
const PI = Math.PI;
// scene, view, the declared still (a value of the rail), the end of the rail and the regime of the still of every card
const CARDS = {
  'structural-topological-exactness-vs-flat-decimal': { scene: 'struct', cam: 'panorama', still: 9, max: 21, regime: 'gon' },
  'pure-integer-111-three-beat-closure': { scene: 'beat', cam: 'face', still: 3, max: 3, regime: 'closed' },
  'dense-rational-cayley-sphere-constellation': { scene: 'stars', cam: 'panorama', still: 6, max: 8, regime: 'finite' },
  'complete-ternary-star-vs-flat-addition-derailment': { scene: 'chain', cam: 'under', still: 11, max: 23, regime: 'run' },
  'prime-topological-adelic-rigidity-alarm': { scene: 'prime', cam: 'face', still: 0.05, max: 0.2, regime: 'broken' }
};
const IDS = Object.keys(CARDS);
const [STRUCT, BEAT, STARS, CHAIN, PRIME] = IDS;
const DEFAULT = BEAT;
const CAM_NAMES = ['panorama', 'face', 'under'];
// the order of the theorem box of §32.6
const GIDS = [
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul',
  'D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor',
  'D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_hopf',
  'D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev',
  'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift',
  'D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact',
  'D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness',
  'D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification',
  'D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula',
  'D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product',
  'D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence',
  'D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line',
  'D5/S3/Weil/TestFunctions/FinitePowerSumToeplitzCircleCriterion.toeplitz_posSemidef_iff_norm_eq_one'
];
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
/** Forty decimals are enough for every fraction of this page. */
const numN = ([p, q]) => Number((p * 10n ** 40n) / q) / 1e40;
const intN = (n) => [BigInt(n), 1n];
const ONE = intN(1),
  ZERO = intN(0),
  HALF = [1n, 2n];
const eqN = (a, b) => cmpN(a, b) === 0;
const strN = ([p, q]) => `${p}`.replace('-', '−') + (q === 1n ? '' : `/${q}`);
const tupN = (v) => `(${v.map(strN).join(', ')})`;
/** The double x itself. */
function doubleN(x) {
  let q = 1n;
  while (!Number.isInteger(x)) {
    x *= 2;
    q *= 2n;
  }
  return fracN(BigInt(x), q);
}
/** A parameter on a slider grid of 1/n: the decimal its double stands for; any other double is itself. */
const gridN = (x, n) => (Math.round(x * n) / n === x ? fracN(BigInt(Math.round(x * n)), BigInt(n)) : doubleN(x));
/** The fraction a probe carries as two strings. */
const readN = ([p, q]) => [BigInt(p), BigInt(q)];
/** The left multiplication of a rational quaternion as a 4 × 4 matrix, and the product through it. */
const leftN = ([w, x, y, z]) => {
  const m = ([p, q]) => [-p, q];
  return [
    [w, m(x), m(y), m(z)],
    [x, w, m(z), y],
    [y, z, w, m(x)],
    [z, m(y), x, w]
  ];
};
const sumN = (xs) => xs.reduce(addN, ZERO);
const qmN = (a, b) => leftN(a).map((row) => sumN(row.map((x, i) => mulN(x, b[i]))));
const dotN = (a, b) => sumN(a.map((x, i) => mulN(x, b[i])));
const seedN = (s) => s.split(',').map((t) => {
  const [p, q = '1'] = t.split('/');
  return fracN(BigInt(p), BigInt(q));
});
/** Q(σ) = (1 + σ)(1 − σ)⁻¹, by solving (1 − σ)-multiplication: x (1 − σ) = 1 + σ, so x = (1 + σ)(1 + σ)/(1 + ‖σ‖²). */
function cayleyN(s) {
  const up = [ONE, ...s],
    sq = qmN(up, up),
    n = addN(ONE, dotN(s, s));
  return sq.map((x) => divN(x, n));
}
/** a × b by the Levi-Civita symbol, in fractions. */
const crossN = (a, b) =>
  range(3).map((i) => {
    let s = ZERO;
    for (let j = 0; j < 3; j++)
      for (let k = 0; k < 3; k++) {
        const eps = ((i - j) * (j - k) * (k - i)) / 2;
        if (eps) s = addN(s, mulN(intN(eps), mulN(a[j], b[k])));
      }
    return s;
  });
/** g ⋆ h from the product (1 + g)(1 + h) of quaternions: its vector part over its real part. */
function starN(g, h) {
  const q = qmN([ONE, ...g], [ONE, ...h]);
  return q.slice(1).map((x) => divN(x, q[0]));
}
/** The rotation matrix of the half-tangent vector g: ((1 − ‖g‖²)1 + 2ggᵀ + 2[g]×)/(1 + ‖g‖²). */
function rotationN(g) {
  const n = dotN(g, g),
    d = addN(ONE, n);
  return range(3).map((i) =>
    range(3).map((j) => {
      const e = range(3).map((k) => (k === j ? ONE : ZERO)),
        c = crossN(g, e)[i];
      return divN(addN(addN(i === j ? subN(ONE, n) : ZERO, mulN(intN(2), mulN(g[i], g[j]))), mulN(intN(2), c)), d);
    })
  );
}
/** The alternating chain of (3 + 4i)/5 and (3 + 4j)/5: integer numerators by 4 × 4 integer matrices acting from the right. */
const CHAIN_N = (() => {
  const right = ([w, x, y, z]) => [
    [w, -x, -y, -z],
    [x, w, z, -y],
    [y, -z, w, x],
    [z, y, -x, w]
  ];
  const A = right([3n, 4n, 0n, 0n]),
    B = right([3n, 0n, 4n, 0n]);
  let v = [1n, 0n, 0n, 0n];
  const out = [{ v, flat: [1n, 0n, 0n, 0n] }];
  for (let K = 1; K <= 24; K++) {
    v = (K % 2 ? A : B).map((row) => row.reduce((s, a, i) => s + a * v[i], 0n));
    out.push({ v, flat: [1n, BigInt(Math.ceil(K / 2)), BigInt(Math.floor(K / 2)), 0n] });
  }
  return out;
})();
/** The rational points of the two-sphere with denominator at most D, without −1, by a search over all triples. */
function nodesN(D) {
  const out = new Set();
  for (let d = 1; d <= D; d++)
    for (let w = -d; w <= d; w++)
      for (let x = -d; x <= d; x++)
        for (let y = -d; y <= d; y++) {
          if (w * w + x * x + y * y !== d * d || w === -d) continue;
          const g = Number(gcdN(gcdN(BigInt(w), BigInt(x)), gcdN(BigInt(y), BigInt(d))));
          if (g === 1) out.add([w, x, y, d].join());
        }
  return out;
}
/** The semiperimeter of the inscribed N-gon from its corners. */
function semiN(N) {
  let s = 0;
  for (let k = 0; k < N; k++) s += Math.hypot(Math.cos((2 * PI * (k + 1)) / N) - Math.cos((2 * PI * k) / N), Math.sin((2 * PI * (k + 1)) / N) - Math.sin((2 * PI * k) / N));
  return s / 2;
}
/** The Gauss linking integral of two closed polygons by the midpoint rule. */
function gaussLinking(A, B) {
  let sum = 0;
  for (let i = 0; i < A.length; i++) {
    const a0 = A[i],
      a1 = A[(i + 1) % A.length],
      a = a0.map((x, k) => (x + a1[k]) / 2),
      da = sub(a1, a0);
    for (let j = 0; j < B.length; j++) {
      const b0 = B[j],
        b1 = B[(j + 1) % B.length],
        r = a.map((x, k) => x - (b0[k] + b1[k]) / 2),
        db = sub(b1, b0);
      sum += (r[0] * (da[1] * db[2] - da[2] * db[1]) + r[1] * (da[2] * db[0] - da[0] * db[2]) + r[2] * (da[0] * db[1] - da[1] * db[0])) / norm(r) ** 3;
    }
  }
  return sum / (4 * PI);
}
/** Betti numbers of the boundary of the 4-simplex: ranks of the boundary matrices modulo a prime. */
function bettiN() {
  const P = 10007,
    subsets = range(6).map((k) => range(32).filter((m) => range(5).filter((i) => (m >> i) & 1).length === k));
  const rank = (rows) => {
    const A = rows.map((r) => r.map((x) => ((x % P) + P) % P));
    let r = 0;
    for (let c = 0; A.length && c < A[0].length && r < A.length; c++) {
      const p = A.findIndex((row, i) => i >= r && row[c]);
      if (p < 0) continue;
      [A[r], A[p]] = [A[p], A[r]];
      let inv = 1;
      for (let e = P - 2, b = A[r][c]; e; e = Math.floor(e / 2), b = (b * b) % P) if (e % 2) inv = (inv * b) % P;
      for (let i = r + 1; i < A.length; i++) {
        const k = (A[i][c] * inv) % P;
        if (k) A[i] = A[i].map((x, j) => (((x - k * A[r][j]) % P) + P) % P);
      }
      r++;
    }
    return r;
  };
  const ranks = range(5).map((d) =>
    d === 0 || d === 4
      ? 0
      : rank(
          subsets[d + 1].map((s) =>
            subsets[d].map((t) => {
              if ((s & t) !== t) return 0;
              const gone = Math.log2(s ^ t),
                before = range(gone).filter((i) => (s >> i) & 1).length;
              return before % 2 ? -1 : 1;
            })
          )
        )
  );
  const f = range(4).map((d) => subsets[d + 1].length);
  return { f, betti: f.map((n, d) => n - ranks[d] - ranks[d + 1]) };
}
/** The least eigenvalue of a real symmetric matrix: Householder tridiagonal form, then Sturm bisection. */
function leastEigen(M) {
  const n = M.length,
    A = M.map((r) => r.slice());
  for (let k = 0; k < n - 2; k++) {
    let s = 0;
    for (let i = k + 1; i < n; i++) s += A[i][k] ** 2;
    s = Math.sqrt(s);
    if (s === 0) continue;
    const alpha = A[k + 1][k] > 0 ? -s : s,
      v = new Array(n).fill(0);
    for (let i = k + 1; i < n; i++) v[i] = A[i][k];
    v[k + 1] -= alpha;
    const vv = dot(v, v);
    if (vv === 0) continue;
    const p = A.map((r) => (2 * dot(r, v)) / vv),
      K = dot(p, v) / vv,
      w = p.map((x, i) => x - K * v[i]);
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) A[i][j] -= v[i] * w[j] + w[i] * v[j];
  }
  const d = range(n).map((i) => A[i][i]),
    e = range(n - 1).map((i) => A[i + 1][i]);
  const below = (x) => {
    let count = 0,
      q = 1;
    for (let i = 0; i < n; i++) {
      q = d[i] - x - (i ? (e[i - 1] * e[i - 1]) / q : 0);
      if (q === 0) q = 1e-300;
      if (q < 0) count++;
    }
    return count;
  };
  let lo = -1e4,
    hi = 1e4;
  for (let k = 0; k < 120; k++) {
    const mid = (lo + hi) / 2;
    if (below(mid) >= 1) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
}
const GAMMA1 = 14.134725141734695;
/** The (N + 1) × (N + 1) Toeplitz matrix of the power sums of the four Cayley images, written out entry by entry. */
function toeplitzN(delta, N = 95) {
  const u = [0.5 - delta, 0.5 + delta].map((re) => {
    const d = re * re + GAMMA1 * GAMMA1;
    // (ρ − 1)/ρ = 1 − 1/ρ
    return [1 - re / d, GAMMA1 / d];
  });
  const roots = [...u, ...u.map(([a, b]) => [a, -b])].map(([a, b]) => [Math.hypot(a, b), Math.atan2(b, a)]);
  return range(N + 1).map((j) => range(N + 1).map((k) => roots.reduce((s, [r, t]) => s + r ** (j - k) * Math.cos(t * (j - k)), 0)));
}
const lambdaMemo = new Map();
const lambdaN = (delta) => {
  if (!lambdaMemo.has(delta)) lambdaMemo.set(delta, delta === 0 ? 0 : leastEigen(toeplitzN(delta)));
  return lambdaMemo.get(delta);
};
const PRIMES = [2, 3, 5, 7, 11, 13];
const numberN = (p) => ({ 2: 42, 3: 42, 5: 30, 7: 42, 11: 66, 13: 78 })[p];
const factorsN = (n) => PRIMES.filter((r) => n % r === 0);
/** N · ∏_{r ≠ p} 1/r · 1/(p + δ), as a fraction. */
const adelicN = (p, dq) => factorsN(numberN(p)).reduce((acc, r) => divN(acc, r === p ? addN(intN(r), dq) : intN(r)), intN(numberN(p)));
/** Four decimals of a fraction, cut towards 0. */
const cutN = ([p, q]) => {
  const a = ((p < 0n ? -p : p) * 10000n) / q;
  return fracN(p < 0n ? -a : a, 10000n);
};
/** The powers of −0.5 + 0.8660i as pairs of fractions. */
const ZPOW_N = (() => {
  const z = [fracN(-1n, 2n), fracN(433n, 500n)],
    out = [[ONE, ZERO]];
  for (let k = 1; k <= 3; k++) {
    const [a, b] = out[k - 1];
    out.push([subN(mulN(a, z[0]), mulN(b, z[1])), addN(mulN(a, z[1]), mulN(b, z[0]))]);
  }
  return out;
})();
const zNormN = (k) => dotN(ZPOW_N[k], ZPOW_N[k]);
const Z_GAP = Math.hypot(numN(subN(ZPOW_N[3][0], ONE)), numN(ZPOW_N[3][1]));

/* ---------- what a printed decimal says ---------- */
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹',
  SUB = '₀₁₂₃₄₅₆₇₈₉';
const subT = (n) => String(n).replace(/\d/g, (c) => SUB[c]),
  supT = (n) => String(n).replace(/\d/g, (c) => SUP[c]);
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
const round = (x, d = 4) => `≈ ${x.toFixed(d).replace('-', '−')}`;
/** The least power of ten above a drift, with its sign; “= 0” of 0. */
function belowText(x) {
  if (x === 0) return '= 0';
  let e = Math.ceil(Math.log10(x)) + 1;
  while (cmpN(doubleN(x), tenN(e - 1)) < 0) e--;
  return `< 10${e < 0 ? '⁻' : ''}${supT(Math.abs(e))}`;
}
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
  await context.exposeBinding('__exactPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__exactPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener(
      'DOMContentLoaded',
      () =>
        window
          .__exactPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined, dark: matchMedia('(prefers-color-scheme: dark)').matches })
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
  'registration: §32.6, live, five cards and the fifteen GIDs in order',
  !!entry &&
    entry.chapter === 32 &&
    entry.section === SECTION &&
    entry.status === 'live' &&
    entry.added === '2026-11-23' &&
    entry.capture_lock === 'links' &&
    entry.code === 'OMEGA//EXACT' &&
    same(entry.presets, IDS) &&
    same(Object.keys(entry.preset_titles), IDS) &&
    same(entry.lean.map((x) => x.gid), GIDS) &&
    entry.theory.length === 1 &&
    entry.theory[0].label === '§32.6 · 精确结构数学对比平直度量近似' &&
    entry.theory[0].label_en === '§32.6 · Exact Structural Mathematics vs. Flat Metric Approximation' &&
    entry.theory[0].href === '../zh/' + THEORY &&
    entry.theory[0].href_en === '../en/' + THEORY
);
check(
  'registration: the title of the page is the title of the registry in both languages',
  sources['index.html'].includes(`<title>OMEGA//EXACT · ${entry.title}</title>`) && sources['index.html'].includes(`data-title-en="OMEGA//EXACT · ${entry.title_en.replace('&', '&amp;')}"`)
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
const INSTANCE = /页面|本页|舞台|探针|滑块|偏差|余量|数值|演示|这里的|相差|实例|手工推导|this page|the page|on the page|stage|probe|slider|\bgap\b|drift|residue|instance|numerical|computes|differ by|derived by hand|≈|\d\.\d|10⁻|黎曼|Riemann|Alpöge/i;
check('green boxes: no instance, number, rounding, drift or remark of the page in any of the fifteen, in either language', GREEN.every((b) => b.zh.length > 30 && b.en.length > 30 && !INSTANCE.test(b.zh) && !INSTANCE.test(b.en) && !/MODEL|NUM|ARGUED/.test(b.zh + b.en)), GREEN.filter((b) => INSTANCE.test(b.zh) || INSTANCE.test(b.en)).map((b) => b.gid + ' ' + (INSTANCE.exec(b.zh) || INSTANCE.exec(b.en))[0]).join(' | '));
check('green boxes: no mixed inequality and no span the script fills', GREEN.every((b) => !mixed(b.zh).length && !mixed(b.en).length) && [...sources['index.html'].matchAll(/<div class="lean">(.*?)<\/div>/g)].every((m) => !/data-bench|\sid=/.test(m[1])));
{
  // everything the reader sees before the script runs holds no computed number: the box NUM and the spans of the drawer are empty
  const body = sources['index.html'].slice(sources['index.html'].indexOf('<body')),
    tag = /<div class="lean num"><span class="ok">NUM<\/span><span><span class="zh">—<\/span><span class="en">—<\/span><\/span><\/div>/g,
    spans = [...sources['index.html'].matchAll(/<span data-bench="([a-zA-Z0-9]+)">(.*?)<\/span>/g)].map((m) => [m[1], m[2]]);
  check('index.html: the NUM box is empty until the script fills it', (sources['index.html'].match(tag) || []).length === 1);
  const drawer = ['link', 'quads', 'semi', 'short', 'quarter', 'zNorm', 'zGap', 'five', 'qNorm', 'flat', 'adele', 'lam'];
  check('index.html: the numbers of the drawer and of the MODEL box are empty spans, each name once per language', same(spans.map((x) => x[0]), ['gamma', 'gamma', ...drawer, ...drawer]) && spans.every((x) => x[1] === '—'), JSON.stringify(spans));
  const decimals = [...plain(body.replace(/<button class="chip" data-speed[^>]*>[^<]*<\/button>/g, '')).matchAll(/(?<![§\d.])\d+\.\d+/g)].map((m) => m[0]);
  check('index.html: no decimal is written anywhere in the page text, the evidence or the drawer', !decimals.length, decimals.join(' '));
  check('index.html: no decimal, no “≈” and no mixed inequality in the description', [(/<meta name="description" content="([^"]*)"/.exec(sources['index.html']) || ['', '≈ 0.5 > 0'])[1]].every((d) => d.length > 100 && !/\d\.\d|≈/.test(d) && !mixed(plain(d)).length));
  check('index.html: the outputs are empty until the script writes them', ['nOut', 'dOut', 'kOut', 'deltaOut', 'roKey', 'roLock', 'roGon', 'roBeat', 'roStar', 'roChain', 'roPrime'].every((id) => sources['index.html'].includes(`<output id="${id}">—</output>`)));
  const said0 = mixed(plain(body));
  check('index.html: no rounded digits beside an inequality sign', !said0.length, said0.slice(0, 3).join(' | '));
  const js = sources['main.js'],
    code = js.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, ''),
    bare = code.replace(/<\/?(?:strong|sub|sup|span|i|b)\b[^<>]*>/g, ''),
    written = [...code.matchAll(/[=≈] ?−?\d+\.(?:\d{4}|\d{6}|\d{8}|\d{9})(?!\d)|\d\.\d+°|\d×10⁻|10⁻[⁰¹²³⁴⁵⁶⁷⁸⁹]/g)].map((m) => m[0]);
  check('main.js: no computed result is written into a sentence (the only long decimal is the tabulated ordinate GAMMA1)', !written.length && (code.match(/14\.1347/g) || []).length === 1 && !/0\.8660|3\.1058|0\.9929|0\.0117|7\.62|244140625|999956/.test(code), written.join(' '));
  const chained = [...bare.matchAll(/\$\{[^{}]*(?:Rel|rel|relQ)\([^{}]*\)\}°? ?(?:&lt;|&gt;|[<>≤≥])|(?:&lt;|&gt;|[<>≤≥]) ?\$\{[^{}]*(?:Rel|relQ)\(/g)].map((m) => m[0]);
  check('main.js: no template puts an inequality sign beside a printed relation', !chained.length, chained.join(' | '));
  check(
    'main.js: the NUM box and the spans are filled before the evidence is copied into the drawer',
    js.indexOf('const BENCH = benchmarks();') > 0 && js.indexOf("document.querySelector(`#basis .lean.num .${lang}`).innerHTML = numText(say)") > js.indexOf('const BENCH = benchmarks();') && js.indexOf("$('drawerEvidence').append(") > js.indexOf('el.innerHTML = NUMBERS[el.dataset.bench]()')
  );
  check('main.js: one formatter writes every relation (no “= ${fmt(” or toFixed in a sentence)', !/= ?\$\{fmt\(|\.toFixed\(/.test(js) && js.includes('function rel(q, x, d = 4)'));
  check('main.js: the probe is read-only and the rotor chain runs in big integers', js.includes('window.EXACT_DEBUG = Object.freeze({') && js.includes('nums: [1n, 0n, 0n, 0n]'));
}
{
  // the detectors find what they must and leave the separated forms: the negative control of every later scan
  const bad = ['N sin(π/N) ≈ 3.1058 < π', '3.1058 < π', '‖x‖² ≈ 73.0001 > 1', '‖x‖² = 73.0000 > 1', '|z|² = 0.999956 < 1', '0 < |z³ − 1| ≈ 7.62×10⁻⁵', '𝒜 ≈ 0.9929 < 1', '≈ 0.9929 < 1', 'λ ≈ −0.0117 < 0', 'λ < ≈ 0', '（𝒜 ≈ 0.9929 < 1）', '≈ 1.0002 (u) > 1', '2.0000 ≥ 1'],
    good = ['N sin(π/N) < π（值 ≈ 3.1058）', '|z|² < 1 (value = 0.999956): it', '𝒜 = 140/141 < 1（值 ≈ 0.9929）', 'λmin < 0 (value ≈ −0.0117).', '= 1.0000 ↔ ≈ 0.9929', '‖xflat,12‖² > 1（值 = 73.0000）。', '浮点偏差 < 10⁻¹⁵。星座', '𝒜 = 700000000/700000001 < 1。'];
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
const state = (p = page) => p.evaluate(() => window.EXACT_DEBUG.state);
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
      const s = window.EXACT_DEBUG.state;
      return s.preset === id && !s.blending && !s.playing && Math.abs(s.clock - still) < 1e-12;
    },
    [card, CARDS[card].still],
    // the clock advances at most 0.1 s per frame: with VIZ_SLOW_FRAMES=1000 a card takes up to 40 frames
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
        seen.push({ n, key: String(key).replace('~', ''), pts: n === 'tube' ? a[1] : n === 'line' || n === 'fan' ? a[0] : n === 'bead' || n === 'ring' ? [a[0]] : n === 'poly' ? a[1].vertices : null, alpha: typeof s.alpha === 'number' ? s.alpha : 1, colors: [s.color, s.fill, s.edges, ...(s.colors || [])].filter(Boolean) });
        return saved[n](...a);
      };
    }
    window.TRV.kit.flush();
    for (const n of names) sc[n] = saved[n];
    const P = window.TRV.palette;
    return { seen, palette: { amber: P.amber, ok: P.ok, warn: P.warn, cyan: P.cyan, magenta: P.magenta, violet: P.violet, ink: P.ink, stage: P.stage } };
  });
}
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

/* ---------- the integer locks, against constructions written here ---------- */
await T.goto(BOOK, ID, '?lang=en');
await settle(page);
{
  const L = await page.evaluate(() => window.EXACT_DEBUG.locks());
  const b = bettiN();
  check('χ(S³): the f-vector 5, 10, 10, 5 of the boundary of the 4-simplex, χ = 0, Betti numbers 1, 0, 0, 1 by ranks modulo 10007', same(L.complex.f, b.f) && same(b.f, [5, 10, 10, 5]) && L.complex.chi === 0 && same(L.complex.betti, b.betti) && same(b.betti, [1, 0, 0, 1]));
  const gauss = gaussLinking(L.hopf[0], L.hopf[1]);
  check('the two drawn Hopf circles: Gauss linking integral ±1, the page counts 1', near(Math.abs(gauss), 1, 2e-3) && L.link === 1, String(gauss));
  // they are the stereographic images of two fibres { x e^{iθ} }: pulled back to S³ they are great circles on one Clifford torus
  const ok = L.hopf.every((pts) =>
    pts.every((p) => {
      const s = p.map((x) => x / (1.1 / Math.tan((78 * PI) / 360))),
        n = dot(s, s),
        q = [(1 - n) / (1 + n), ...s.map((x) => (2 * x) / (1 + n))];
      // the axis i is drawn upright: σ = (z, x, y) in world coordinates
      return near(q[0] ** 2 + q[3] ** 2, Math.cos((78 * PI) / 180) ** 2, 1e-9) && near(q[1] ** 2 + q[2] ** 2, Math.sin((78 * PI) / 180) ** 2, 1e-9);
    })
  );
  const least = Math.min(...L.hopf.flat().map(norm));
  check('the Hopf circles lie on the Clifford torus and clear the ball', ok && least > 1.05, String(least));
  // the tetrahedron: four geodesic faces of area π each (Girard), signs by orientation, areas modulo the sphere
  const V = L.corners.map((v) => v.map((x) => x / Math.sqrt(3)));
  const girard = (i, j, k) => {
    if (new Set([i, j, k]).size < 3) return 0;
    const [A, B, C] = [V[i], V[j], V[k]],
      cr = (a, c) => [a[1] * c[2] - a[2] * c[1], a[2] * c[0] - a[0] * c[2], a[0] * c[1] - a[1] * c[0]],
      angle = (P, Q, R) => {
        const u = cr(P, Q),
          w = cr(P, R);
        return Math.acos(dot(u, w) / norm(u) / norm(w));
      };
    return Math.sign(dot(A, cr(B, C))) * ((angle(A, B, C) + angle(B, C, A) + angle(C, A, B) - PI) / PI);
  };
  let zero = 0,
    full = 0,
    worst = 0;
  for (const r of range(4)) for (const i of range(4)) for (const j of range(4)) for (const k of range(4)) {
    const c = girard(i, j, k) - girard(r, j, k) + girard(r, i, k) - girard(r, i, j);
    worst = Math.max(worst, Math.abs(c - Math.round(c)));
    if (Math.round(c) % 4 === 0) zero++;
    if (Math.abs(Math.round(c)) === 4) full++;
  }
  check('the tetrahedron: Girard areas ±1 (in units of π), 256 quadruples with δF = 0 modulo 4, 24 of them the whole sphere', worst < 1e-9 && zero === 256 && full === 24 && L.tetra.zero === 256 && L.tetra.quadruples === 256 && L.tetra.whole4 === 24 && same(L.tetra.faceErrors, [0, 0, 0, 0]) && L.tetra.edgeErrors === 0);
  check('K₄ in the sphere: 4 − 6 + 4 = 2, kernel {0, 1}, image of 2³ elements = the cycle space of 2^{6−4+1} elements', L.tetra.V === 4 && L.tetra.E === 6 && L.tetra.faces === 4 && L.tetra.kernel === 2 && L.tetra.image === 8 && L.tetra.even === 8);
  for (const N of range(22).map((k) => k + 3)) {
    const m = await page.evaluate((n) => window.EXACT_DEBUG.calc('struct', n - 3).gon, N);
    if (!(m.N === N && near(m.semi, semiN(N), 1e-12) && near(m.short, PI - semiN(N), 1e-12) && near(m.sagitta, 1 - Math.cos(PI / N), 1e-12) && m.semi < PI)) check(`N-gon ${N}`, false, JSON.stringify(m));
  }
  check('the semiperimeter of the N-gon, N = 3 … 24, by its corners; always short of π; 3.1058 at N = 12', near(semiN(12), 3.1058285412302489, 1e-12) && range(22).every((k) => semiN(k + 3) < PI && (k === 0 || semiN(k + 3) > semiN(k + 2))));
}
/* ---------- the three beats ---------- */
{
  const B = await page.evaluate(() => window.EXACT_DEBUG.beats()),
    Z = await page.evaluate(() => window.EXACT_DEBUG.zpow());
  const g1 = [ONE, ONE, ONE],
    g2 = starN(g1, g1),
    g3 = starN(g2, g1),
    Q1 = cayleyN(g1),
    Q2 = qmN(Q1, Q1),
    Q3 = qmN(Q2, Q1);
  const got = (v) => v.map(readN),
    sameV = (a, b) => a.every((x, i) => eqN(x, b[i]));
  check('g₁ = (1, 1, 1) → g₂ = (−1, −1, −1) → g₃ = (0, 0, 0), by the product of 1 + g', tupN(g2) === '(−1, −1, −1)' && tupN(g3) === '(0, 0, 0)' && [g1, g2, g3].every((g, k) => sameV(got(B.g[k + 1]), g)));
  check('Q(1, 1, 1) = (−1 + i + j + k)/2, Q² = Q(−1, −1, −1), Q³ = +1, squared norms 1', tupN(Q1) === '(−1/2, 1/2, 1/2, 1/2)' && sameV(Q2, cayleyN(g2)) && tupN(Q3) === '(1, 0, 0, 0)' && [Q1, Q2, Q3].every((q, k) => sameV(got(B.Q[k + 1]), q) && eqN(dotN(q, q), ONE)));
  const R = rotationN(g1),
    sends = range(3).map((j) => range(3).findIndex((i) => eqN(R[i][j], ONE)));
  check('R(g₁) is the rational permutation e₁ ↦ e₂ ↦ e₃ ↦ e₁', same(sends, [1, 2, 0]) && R.flat().every((x) => eqN(x, ONE) || eqN(x, ZERO)) && same(B.axes, sends));
  const q1 = [HALF, HALF, HALF, HALF];
  check('the spinor q₁ = (1 + i + j + k)/2: q₁² = Q(g₁), q₁³ = −1', sameV(qmN(q1, q1), Q1) && tupN(qmN(qmN(q1, q1), q1)) === '(−1, 0, 0, 0)' && sameV(got(B.square), Q1) && sameV(got(B.cube), [intN(-1), ZERO, ZERO, ZERO]));
  check('z = −0.5 + 0.8660i: |z|² = 0.999956, z³ = 0.999934 + 0.000038104i, the gap 7.62×10⁻⁵', Z.every((z, k) => sameV(got(z), ZPOW_N[k])) && eqN(zNormN(1), [249989n, 250000n]) && eqN(ZPOW_N[3][0], [999934n, 1000000n]) && eqN(ZPOW_N[3][1], [38104n, 1000000000n]) && Z_GAP.toExponential(2) === '7.62e-5');
  // the ray kernel of 1 and Q is 1/2, not the reading 1/4: both stand on the page
  const I = [ZERO, ONE, ZERO, ZERO],
    ray = addN(mulN(Q1[0], Q1[0]), mulN(qmN(Q1, I)[0], qmN(Q1, I)[0]));
  const bench = await page.evaluate(() => window.EXACT_DEBUG.bench());
  check('κ(1, Q) = 1/4 and rayKernel(1, Q) = 1/2', eqN(mulN(HALF, addN(ONE, Q1[0])), [1n, 4n]) && eqN(ray, HALF) && eqN(readN(bench.rayOne), HALF));
}
/* ---------- the constellation ---------- */
{
  const N = await page.evaluate(() => window.EXACT_DEBUG.nodes());
  const mine = nodesN(17);
  check('the rational points of the slice with denominators up to 17, without −1, are exactly those of a search over all triples', mine.size === N.list.length && N.list.every((n) => mine.has(n.join())) && new Set(N.list.map((n) => n.join())).size === N.list.length, `${mine.size} ${N.list.length}`);
  check('their numbers by denominator bound 1, 3, …, 17', same(N.count, range(9).map((k) => nodesN(2 * k + 1).size)) && range(9).every((k) => nodesN(2 * k + 2).size === nodesN(2 * k + 1).size), JSON.stringify(N.count));
  const onS3 = N.list.every(([w, x, y, d]) => {
    const q = [w, x, y].map((n) => fracN(BigInt(n), BigInt(d))),
      full = [...q, ZERO],
      s = full.slice(1).map((c) => divN(c, addN(ONE, full[0])));
    return eqN(dotN(full, full), ONE) && cayleyN(s).every((c, i) => eqN(c, full[i]));
  });
  check('every node is Q(σ) of a rational σ = Im q/(1 + Re q)', onS3);
  for (const [seed, q, kappa] of [
    ['1/2,0,0', '(3/5, 4/5, 0, 0)', [4n, 5n]],
    ['1,1,0', '(−1/3, 2/3, 2/3, 0)', [1n, 3n]],
    ['1,1,1', '(−1/2, 1/2, 1/2, 1/2)', [1n, 4n]],
    ['2,1,2', '(−4/5, 2/5, 1/5, 2/5)', [1n, 10n]],
    ['1/3,1/3,1/3', '(1/2, 1/2, 1/2, 1/2)', [3n, 4n]],
    ['0,0,0', '(1, 0, 0, 0)', ONE]
  ]) {
    const m = await page.evaluate((s) => window.EXACT_DEBUG.calc('stars', 6, s).star, seed),
      Q = cayleyN(seedN(seed)),
      tail = Q.map(cutN);
    check(`seed (${seed}): Q = ${q}, κ = ${strN(kappa)}, squared norm 1, four-decimal copy`, tupN(Q) === q && m.Q.every((x, i) => eqN(readN(x), Q[i])) && eqN(readN(m.kappa), kappa) && eqN(readN(m.norm), ONE) && eqN(fracN(BigInt(m.squares[0]), BigInt(m.squares[1])), ONE) && eqN(readN(m.tail2), dotN(tail, tail)));
  }
  check('the point (3/5, 4/5) is 25/25 and ends in decimals, the tetrahedral point does not', (await page.evaluate(() => window.EXACT_DEBUG.calc('stars', 6, '1/2,0,0').star.squares)).join('/') === '25/25' && cmpN(dotN(cayleyN(seedN('1,1,0')).map(cutN), cayleyN(seedN('1,1,0')).map(cutN)), ONE) < 0);
  // the four axes of the regular tetrahedron read κ = 1/3 pairwise on the sphere of directions
  check('two axes of the regular tetrahedron: (1 − 1/3)/2 = 1/3', eqN(divN(subN(ONE, [1n, 3n]), intN(2)), [1n, 3n]));
}
/* ---------- the chain ---------- */
{
  const C = await page.evaluate(() => window.EXACT_DEBUG.chain());
  const ok = C.every((c, K) => c.nums.every((n, i) => BigInt(n) === CHAIN_N[K].v[i]) && BigInt(c.den) === 5n ** BigInt(K) && CHAIN_N[K].v.reduce((s, n) => s + n * n, 0n) === 25n ** BigInt(K) && (K === 0 || CHAIN_N[K].v.some((n) => n % 5n !== 0n)) && same(c.norm, ['1', '1']) && c.flat.every((n, i) => BigInt(n) === CHAIN_N[K].flat[i]) && BigInt(c.flat2) === CHAIN_N[K].flat.reduce((s, n) => s + n * n, 0n));
  check('q_K, K = 0 … 24: numerators by integer matrices, denominator 5^K in lowest terms, squared norm 25^K/25^K = 1; the flat sum 1 + ⌈K/2⌉i + ⌊K/2⌋j', C.length === 25 && ok);
  check('K = 12: 5¹² = 244140625, ‖x_flat‖² = 73; K = 2: (9, 12, 12, 16)/25, ‖x_flat‖² = 3; K = 24: 289', C[12].den === '244140625' && C[12].flat2 === '73' && same(C[2].nums, ['9', '12', '12', '16']) && C[2].flat2 === '3' && C[24].flat2 === '289' && C[1].flat2 === '2');
  check('a ⋆ b = (1/2, 1/2, 1/4), and its twist is the cross product (0, 0, 1/4)', tupN(starN([HALF, ZERO, ZERO], [ZERO, HALF, ZERO])) === '(1/2, 1/2, 1/4)' && tupN(crossN([HALF, ZERO, ZERO], [ZERO, HALF, ZERO])) === '(0, 0, 1/4)');
}
/* ---------- the nudged prime ---------- */
{
  const rows = await page.evaluate(() => [2, 3, 5, 7, 11, 13].flatMap((p) => [0, 0.005, 0.05, 0.13, 0.2].map((d) => [p, d, window.EXACT_DEBUG.calc('prime', d, '1/2,0,0', p).prime])));
  check(
    'the adelic product of N(p) with one nudged weight, p = 2 … 13 and δ = 0 … 0.2: exactly p/(p + δ), and 1 at δ = 0 alone',
    rows.every(([p, d, m]) => {
      const want = adelicN(p, gridN(d, 200));
      return m.N === numberN(p) && same(m.parts, factorsN(numberN(p))) && eqN(readN(m.A), want) && eqN(want, divN(intN(p), addN(intN(p), gridN(d, 200)))) && (d === 0 ? eqN(want, ONE) : cmpN(want, ONE) < 0) && eqN(readN(m.cut), factorsN(numberN(p)).reduce((acc, r) => mulN(acc, cutN([1n, BigInt(r)])), intN(numberN(p))));
    })
  );
  check('p = 7, δ = 1/20: 𝒜 = 140/141; the four-decimal weights 42 × 0.5000 × 0.3333 × 0.1428 = 0.99950004', eqN(adelicN(7, [1n, 20n]), [140n, 141n]) && eqN(readN(rows.find(([p]) => p === 7)[2].cut), [99950004n, 100000000n]));
  const deltas = [0, 0.005, 0.02, 0.05, 0.1, 0.2],
    page_ = await page.evaluate((ds) => ds.map((d) => window.EXACT_DEBUG.lambda(d)), deltas);
  check('the least eigenvalue of the 96 × 96 Toeplitz matrix, by Householder and bisection on the whole matrix: 0 at δ = 0, negative beyond', deltas.every((d, i) => near(page_[i], lambdaN(d), 1e-7)) && page_[0] === 0 && page_.slice(1).every((x) => x < 0) && page_.every((x, i) => i === 0 || x < page_[i - 1]), JSON.stringify([page_, deltas.map(lambdaN)]));
  check('δ = 0: the 96 × 96 matrix is positive semidefinite up to rounding', leastEigen(toeplitzN(0)) > -1e-9, String(leastEigen(toeplitzN(0))));
  const m = rows.find(([p, d]) => p === 7 && d === 0.05)[2],
    out = Math.hypot(0.45 - 1, GAMMA1) / Math.hypot(0.45, GAMMA1),
    inn = Math.hypot(0.55 - 1, GAMMA1) / Math.hypot(0.55, GAMMA1);
  check('the mirror pair: ‖u(1/2 − δ)‖ > 1 and ‖u(1/2 + δ)‖ < 1 are reciprocal, on the circle at δ = 0', near(m.out, out, 1e-12) && near(m.inn, inn, 1e-12) && near(m.out * m.inn, 1, 1e-14) && out > 1 && inn < 1 && rows.filter(([, d]) => d === 0).every(([, , x]) => x.out === 1 && x.inn === 1));
}

/* ---------- the page as it opens ---------- */
{
  const s = await state();
  check('the three-beat card opens by default, parked on beat 3 at the north pole', s.preset === DEFAULT && s.scene === 'beat' && s.beat.k === 3 && s.beat.f === 0 && !s.playing && s.clock === 3 && same(s.beat.g, [['0', '1'], ['0', '1'], ['0', '1']]) && same(s.beat.norm, ['1', '1']));
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
      ['#nRange', '#beatChips', '#stepBtn', '#seedChips', '#dRange', '#kRange', '#primeChips', '#resetBtn', '#deltaRange'].every((s) => !!q('#evidence > #ctlPanel ' + s)) &&
      !!q('#evidence > #readouts') &&
      !!q('#evidence > #basis') &&
      !!q('footer.rail .clock #now') &&
      ['§32.6', '5', 'NUM', 'trureturing'].every((x) => asides.includes(x)) &&
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
  'the lens names, the beat, seed and prime chips and the buttons in both languages',
  await page.evaluate(() => {
    const seg = (c, l) => document.querySelector(`#lensToggleBtn .seg.${c} .${l}`).textContent;
    const of = (sel, key) => [...document.querySelectorAll(sel)].map((b) => b.dataset[key]);
    return (
      seg('off', 'zh') === 'AXIOM-Ω 精确结构—有理账本 · 零误差闭合' &&
      seg('off', 'en') === 'AXIOM-Ω Exact Structural–Rational Ledger · Zero-Error Closure' &&
      seg('on', 'zh') === '平直度量截断对照（MODEL）· 小数尾流与脱轨' &&
      seg('on', 'en') === 'Flat Metric Truncation Contrast (MODEL) · Decimal Tails & Derailment' &&
      JSON.stringify(of('#beatChips [data-beat]', 'beat')) === JSON.stringify(['0', '1', '2', '3']) &&
      JSON.stringify(of('#seedChips [data-seed]', 'seed')) === JSON.stringify(['1/2,0,0', '1,1,0', '1,1,1', '2,1,2', '1/3,1/3,1/3', '0,0,0']) &&
      JSON.stringify(of('#primeChips [data-prime]', 'prime')) === JSON.stringify(['2', '3', '5', '7', '11', '13']) &&
      document.querySelector('#kRange').min === '1' && document.querySelector('#kRange').max === '24' &&
      document.querySelector('#deltaRange').min === '0' && document.querySelector('#deltaRange').max === '0.2'
    );
  })
);
check(
  'a card click starts a blend of the layers instead of a hard cut',
  await page.evaluate(() => {
    document.querySelector('[data-preset="complete-ternary-star-vs-flat-addition-derailment"]').click();
    const s = window.EXACT_DEBUG.state;
    return s.blending && s.layers.chain < 1 && s.layers.beat > 0 && s.scene === 'chain';
  })
);
await settle(page);
await until(page, () => !window.EXACT_DEBUG.state.blending);
check('the blend ends on the layers of the card', (await state()).layers.chain === 1 && (await state()).layers.beat === 0);
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
    lang + ' MODEL box names the two ledgers, the prime loops, the coupling, the enlargements and the drawing conventions',
    ['AXIOM-Ω', 'γp', '(p + δ)⁻¹', 'δeff = δ', '1/2 ± δ', '≈ 14.1347i', '(i + j + k)/√3'].every((x) => model.includes(x)) && (lang === 'zh' ? ['反事实', '放大 8 倍', '放大 220 倍', '维拉索', '对数刻度', '绕 i 轴转进前半切片'] : ['counterfactual', '8 times', '220 times', 'Villarceau', 'logarithmic scale', 'turned about the axis i into its front half']).every((x) => model.includes(x)),
    model.slice(0, 200)
  );
  check(
    lang + ' ARGUED box: the literature and the hand derivations',
    (lang === 'zh' ? ['文献结果，未在本书形式化', '罗德里格斯（1840）', '凯莱（1846）', '赫维茨（1896）', '霍普夫（1931）', '尼文（1956）', '怀尔德伯格（2005）', '冯·科赫（1901）', '手工推导', '并不移动 ζ 的零点'] : ['Literature results, not formalized in this book', 'Rodrigues (1840)', 'Cayley (1846)', 'Hurwitz (1896)', 'Hopf (1931)', 'Niven (1956)', 'Wildberger (2005)', 'von Koch (1901)', 'Derived by hand', 'does not move the zeros of ζ']).every((x) => argued.includes(x)) && ['‖Q(σ)‖² = 1', 'κ(1, Q(σ)) = 1/(1 + ‖σ‖²)', 'u² = −3', 'e₁ ↦ e₂ ↦ e₃ ↦ e₁', 'q₁³ = −1', '25K', '5K', '1 + 2c', 'ξ(1 − s) = ξ(s)'].every((x) => argued.includes(x)),
    argued.slice(-300)
  );
  check(
    lang + ' ARGUED box: classical RH and Dirichlet GRH are an external verified fact, not an open conjecture and without a green badge; the page derives no number from them',
    /Alpöge/.test(argued) && (lang === 'zh' ? argued.includes('外部已核验的形式化事实') && argued.includes('不带绿色标签') && argued.includes('页面也不用它推导任何一个数') : argued.includes('externally verified formalization fact') && argued.includes('no green badge') && argued.includes('derives no number from it')) && !/猜想|conjecture|\bOPEN\b/i.test(argued) && (await page.locator('#basis .lean.argued a[data-lean-gid]').count()) === 0
  );
  check(
    lang + ' the RH note links the recommended proof and original records',
    (await page.locator('#basis .lean.argued .' + lang + ' a').evaluateAll((els) => els.map((a) => a.getAttribute('href')))).join(' ') ===
      ['https://github.com/leanprover-community/riemann-hypothesis', 'https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/src/Statements.lean', 'https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/src/Main.lean', 'https://math.mit.edu/~drew/grh/audit.log', 'https://leanprover-community.github.io/blog/posts/riemann-hypothesis/'].join(' ')
  );
  check(
    lang + ' drawer states the five cards with the numbers of the script',
    ['5 − 10 + 10 − 5 = 0', '256/256', '≈ 3.1058', '≈ 0.0358', '(2, 2, 2)/(1 − 3) = (−1, −1, −1)', '= 0.2500', '= 0.999956', '≈ 7.62×10⁻⁵', '(1, 1, 0) ↦ (−1/3, 2/3, 2/3, 0)', '5¹² = 244140625', '= 73.0000', '42 · (1/2) · (1/3) · (1/7) = 1', '140/141', '≈ 0.9929', '≈ −0.0117', 'MODEL'].every((x) => drawer.includes(x)) && (lang === 'zh' ? /不是证明/ : /not a proof/).test(drawer),
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
    ['rayKernel_eq_hopf', ['对一切单位四元数 x、y', 'rayKernel(x, y) = (1 + ⟨hopf(x), hopf(y)⟩)/2', 'hopf(x) = x i x*', '(2κ(x, yi) − 1)²'], ['for all unit quaternions x and y', 'rayKernel(x, y) = (1 + ⟨hopf(x), hopf(y)⟩)/2', 'hopf(x) = x i x*', '(2κ(x, yi) − 1)²']],
    ['normSq_and_chebyshev', ['对每个四元数序列', '当且仅当', 'xn+2 = xn+1 xn* xn+1', 'xn+1 = Un(c)·x1 − Un−1(c)·x0', 'n = 0 时约定 U−1 = 0', '⟨x0, xn⟩ = Tn(c)', 'c = ⟨x0, x1⟩', '第一、二类切比雪夫多项式'], ['for every sequence', 'if and only if', 'xn+2 = xn+1 xn* xn+1', 'xn+1 = Un(c)·x1 − Un−1(c)·x0', 'with U−1 = 0 at n = 0', '⟨x0, xn⟩ = Tn(c)', 'c = ⟨x0, x1⟩', 'Chebyshev polynomials of the first and second kinds']],
    ['circle_double_cover_history_lift', ['square(z) = z²', 'γ(0) = square(z₀)', 'square ∘ η = γ', 'η(0) = z₀', '唯一连续路径', '不存在连续映射 f', 'η(0) = 1、η(1) = −1'], ['square(z) = z²', 'γ(0) = square(z₀)', 'square ∘ η = γ', 'η(0) = z₀', 'the only continuous path', 'there is no continuous map f', 'η(0) = 1 and η(1) = −1']],
    ['face_cycle_exact', ['有限连通简单图', '至少有一条有向边', '旋转系统', '|V| − |E| + |面| = 2', 'x(d 的面) + x(d 的反向的面)', '边界为 0 当且仅当 x 是常数', '边界映射的像恰是简单圈空间'], ['finite connected simple graph', 'at least one dart', 'rotation system', '|V| − |E| + |faces| = 2', 'x(face of d) + x(face of the reverse of d)', 'it is 0 if and only if x is constant', 'the image of the boundary map is exactly the simple cycle space']],
    ['tetra_defects_incidence_repair_and_exactness', ['V 是有限非空集', 'AddCommGroup', 'Σr faceErrors(r) = tetraDefects', '存在 r 使 |V|·faceErrors(r) ≤ tetraDefects', '对每个 edge : V × V → A，tetraDefects ≤ 4|V|·edgeErrors(edge)', '对一切 r、i、j、k 成立，当且仅当存在 edge : V × V → A'], ['V be a finite nonempty set', 'AddCommGroup', 'Σr faceErrors(r) = tetraDefects', 'there is an r with |V|·faceErrors(r) ≤ tetraDefects', 'for every edge : V × V → A, tetraDefects ≤ 4|V|·edgeErrors(edge)', 'for all r, i, j, k if and only if there is an edge : V × V → A']],
    ['rational_absolute_value_classification', ['ℚ 上每个非平凡的实值绝对值 f', '通常的实绝对值等价', '存在唯一的素数 p'], ['every nontrivial real-valued absolute value f on ℚ', 'equivalent to the standard real absolute value', 'there is a unique prime p']],
    ['rational_padic_product_formula', ['对每个有理数 x ≠ 0', '|x| · ∏p padicNormp(x) = 1', '∏ᶠ'], ['for every rational x ≠ 0', '|x| · ∏p padicNormp(x) = 1', '∏ᶠ']],
    ['riemann_zeta_dirichlet_sum_eq_euler_product', ['若 Re s > 1', 'Σn n−s = ∏p (1 − p−s)⁻¹', 'p 取遍全部素数'], ['with Re s > 1', 'Σn n−s = ∏p (1 − p−s)⁻¹', 'p over all primes']],
    ['prime_log_rational_independence', ['全部素数 p 的实对数 log p 在 ℚ 上线性无关'], ['the real logarithms log p of all primes p are linearly independent over ℚ']],
    ['cayley_ratio_norm_one_iff_critical_line', ['对每个复数 s', '‖(s − 1)/s‖ = 1 ⇔ Re s = 1/2', 's = 0 时按 Lean 的全函数除法约定 (s − 1)/s = 0'], ['for every complex number s', '‖(s − 1)/s‖ = 1 ⇔ Re s = 1/2', 'by the total division convention of Lean, (s − 1)/s = 0 at s = 0']],
    ['toeplitz_posSemidef_iff_norm_eq_one', ['不同取值个数不超过 N + 1', '每个 uj ≠ 0', '置换 σ', 'uσ(j) = (conj uj)⁻¹', 'pn = Σj ujn', '半正定，当且仅当对一切 j 有 ‖uj‖ = 1'], ['at most N + 1 distinct values', 'every uj ≠ 0', 'σ a permutation of Fin m', 'uσ(j) = (conj uj)⁻¹', 'pn = Σj ujn', 'positive semidefinite if and only if ‖uj‖ = 1 for all j']]
  ]) {
    const box = rendered.find((x) => x.code === name) || { zh: '', en: '' },
      missing = [...zh.filter((x) => !box.zh.includes(x)), ...en.filter((x) => !box.en.includes(x))];
    check(`${name}: the box states the theorem with its hypotheses and every conclusion in both languages`, !missing.length, missing.join(' | '));
  }
}

/* ---------- the NUM box and the drawer as rendered: every number against a value computed here ---------- */
/** What the box and the spans of the drawer must say for a frame, in a language. */
function expectedBench(lang, { N, K, delta, tiny, eulerP, eulerN, logBox, gammaText = '≈ 14.1347' }, lift) {
  const zh = lang === 'zh',
    list = (xs) => xs.join(zh ? '、' : ', '),
    none = zh ? '不符 0 处' : '0 failures',
    valued = (law, r) => law + (zh ? `（值 ${r}）` : ` (value ${r})`),
    A = adelicN(7, delta),
    tinyA = adelicN(7, tiny),
    d = strN(delta),
    semi = semiN(N),
    semiText = N === 6 ? '= 3.0000' : round(semi),
    flat2 = (k) => CHAIN_N[k].flat.reduce((s, n) => s + n * n, 0n),
    flats = list([1, 2, K, 24].map((k) => `‖xflat,${k}‖² = ${flat2(k)}.0000`));
  // the prime product and the zeta sum at s = 2, summed the other way round
  const primes = [];
  for (let n = 2; n <= eulerP; n++) if (primes.every((q) => q * q > n || n % q)) primes.push(n);
  const product = primes.reduceRight((acc, q) => acc * ((q * q) / (q * q - 1)), 1);
  let sum = 0;
  for (let n = 1; n <= eulerN; n++) sum += 1 / n / n;
  let least = Infinity,
    tried = 0,
    ties = 0;
  for (let a = -logBox; a <= logBox; a++)
    for (let b = -logBox; b <= logBox; b++)
      for (let c = -logBox; c <= logBox; c++) {
        if (!a && !b && !c) continue;
        tried++;
        const v = Math.abs(a * Math.LN2 + b * Math.log(3) + c * Math.log(5));
        if (v < 1e-12) ties++;
        least = Math.min(least, v);
      }
  const sh = numN(delta),
    cay = (re) => Math.hypot(re - 1, GAMMA1) / Math.hypot(re, GAMMA1),
    near1 = (x) => round(x),
    lam = lambdaN(sh);
  const spans = {
    link: '= 1',
    quads: '256/256',
    semi: semiText,
    short: round(PI - semi),
    quarter: '= 0.2500',
    zNorm: '= 0.999956',
    zGap: '≈ 7.62×10⁻⁵',
    five: `= ${5n ** BigInt(K)}`,
    qNorm: '= 1.0000',
    flat: `= ${flat2(K)}.0000`,
    adele: said(A),
    lam: round(lam)
  };
  const phrases = [
    zh ? '有 5、10、10、5 个面，χ = 0，贝蒂数 1, 0, 0, 1' : 'has 5, 10, 10, 5 faces, χ = 0, Betti numbers 1, 0, 0, 1',
    zh ? '环绕数 1；' : 'linking number 1 by signed crossings',
    zh ? '正四面体 256 个有序四元组 δF 模 4 归零 256 个，其中在 ℤ 里是 ±4 的 24 个，各锚点的面错误 0, 0, 0, 0，边上链错误 0' : 'of the 256 ordered quadruples of the regular tetrahedron 256 have δF = 0 modulo 4, 24 of them ±4 in ℤ, face errors 0, 0, 0, 0, edge errors 0',
    zh ? 'V − E + F = 4 − 6 + 4 = 2，ℤ/2 面边界的核 2 个、像 8 个，圈空间 8 个' : 'V − E + F = 4 − 6 + 4 = 2, the ℤ/2 face boundary 2 kernel and 8 image elements, the cycle space 8',
    `N = ${N}${zh ? '：' : ': '}${valued('N sin(π/N) < π', semiText)}${zh ? `，短 ${round(PI - semi)}` : `, short by ${round(PI - semi)}`}`,
    list(['g₁ = (1, 1, 1)', 'g₂ = (−1, −1, −1)', 'g₃ = (0, 0, 0)']),
    list(['Q = (−1/2, 1/2, 1/2, 1/2)', 'Q² = (−1/2, −1/2, −1/2, −1/2)', 'Q³ = (1, 0, 0, 0)']),
    zh ? 'R(g₁) 把 e₁, e₂, e₃ 送到 e₂, e₃, e₁；q₁³ = (−1, 0, 0, 0)' : 'R(g₁) sends e₁, e₂, e₃ to e₂, e₃, e₁; q₁³ = (−1, 0, 0, 0)',
    zh ? 'κ(1, Q) = 1/4，而 rayKernel(1, Q) = 1/2' : 'κ(1, Q) = 1/4, while rayKernel(1, Q) = 1/2',
    `zdec³ = 0.999934 + 0.000038104i${zh ? '，' : ', '}${valued('|zdec³ − 1| > 0', '≈ 7.62×10⁻⁵')}`,
    zh ? `576 对上 κ 与 1 − 弦长²/4 ${none}，rayKernel 与旋量内积模方${none}，与霍普夫像的内积${none}；512 个三元组上基点 Q 的群分解${none}；堆序列 1, Q, … 到 n = 6 与切比雪夫公式${none}；整圈提升（33 个采样点）的浮点偏差 ${belowText(lift)}` : `on 576 pairs κ vs 1 − chord²/4, ${none}; rayKernel vs the squared spinor product, ${none}, vs the product of Hopf images, ${none}; on 512 triples the group at the base point Q, ${none}; the heap 1, Q, … up to n = 6 vs the Chebyshev formulas, ${none}; the lift of the full turn (33 samples), floating-point drift ${belowText(lift)}`,
    zh ? `${nodesN(17).size} 个点的 ‖Q‖² = 1、逆映射与 κ = 1/(1 + ‖σ‖²) ${none}` : `${nodesN(17).size} points, ‖Q‖² = 1, the inverse and κ = 1/(1 + ‖σ‖²), ${none}`,
    list(['1/2,0,0', '1,1,0', '1,1,1', '2,1,2'].map((s) => `${tupN(seedN(s))} ↦ ${tupN(cayleyN(seedN(s)))}${zh ? '，' : ', '}κ = ${strN(divN(ONE, addN(ONE, dotN(seedN(s), seedN(s)))))}`)),
    zh ? `5K 与不可约${none}，5${supT(K)} = ${5n ** BigInt(K)}，‖q${subT(K)}‖² = 1.0000；${flats}` : `lowest terms for K = 0 … 24, ${none}; 5${supT(K)} = ${5n ** BigInt(K)}, ‖q${subT(K)}‖² = 1.0000; ${flats}`,
    zh ? `288 个有理数的乘积公式${none}，p 进大小的乘性与超度量${none}；6 个 p 的 N(p) 在 δ = 0 时 𝒜 = 1 的有 6 个` : `the product formula on 288 rationals, ${none}; p-adic sizes multiplicative and ultrametric, ${none}; of the 6 choices of p, 6 have 𝒜 = 1 at δ = 0`,
    `p = 7${zh ? '，' : ', '}δ = ${d}${zh ? '：' : ': '}${valued(`𝒜 = ${strN(A)} < 1`, said(A))}${zh ? '；' : '; '}δ = ${strN(tiny)}${zh ? '：' : ': '}𝒜 = ${strN(tinyA)} < 1`,
    zh ? `不超过 ${eulerP} 的 ${primes.length} 个素数的乘积 ${round(product)}，前 ${eulerN} 项的和 ${round(sum)}` : `the product over the ${primes.length} primes up to ${eulerP}, ${round(product)}, the first ${eulerN} terms, ${round(sum)}`,
    zh ? `2a3b5c = 1 在 ${tried} 个非零指数里有 ${ties} 个，|a ln 2 + b ln 3 + c ln 5| 最小 ${round(least)}` : `2a3b5c = 1 for ${ties} of ${tried} nonzero exponents, least |a ln 2 + b ln 3 + c ln 5| ${round(least)}`,
    zh ? `凯莱比在 1/2 + iγ₁ 处 = 1.0000，在 1/2 ∓ ${d} + iγ₁ 处 ${near1(cay(0.5 - sh))} 与 ${near1(cay(0.5 + sh))}` : `Cayley ratio at 1/2 + iγ₁ = 1.0000, at 1/2 ∓ ${d} + iγ₁ ${near1(cay(0.5 - sh))} and ${near1(cay(0.5 + sh))}`,
    zh ? `96 × 96 托普利茨矩阵 λmin 在 δ = 0 时 = 0.0000，δ = ${d} 时 ${round(lam)}` : `96 × 96 Toeplitz matrix, λmin = 0.0000 at δ = 0 and ${round(lam)} at δ = ${d}`,
    zh ? '不检验定理的前提' : 'it does not check their hypotheses',
    zh ? '数值演示，不是证明。' : 'A numerical illustration, not a proof.'
  ];
  return { spans, phrases, gammaText };
}
const FRAME = { N: 12, K: 12, delta: [1n, 20n], tiny: [1n, 100000000n], eulerP: 1000, eulerN: 100000, logBox: 6 };
/** The audit of a page: the box, its copy and the spans against the numbers computed here; [] or what is wrong. */
async function auditBench(p, frame) {
  const seen = await p.evaluate(() => {
    const flat = (sel) => document.querySelector(sel).textContent.replace(/\s+/g, ' ').trim();
    return {
      box: Object.fromEntries(['zh', 'en'].map((l) => [l, flat('#basis .lean.num .' + l)])),
      copy: Object.fromEntries(['zh', 'en'].map((l) => [l, flat('#drawerEvidence .lean.num .' + l)])),
      spans: Object.fromEntries(['zh', 'en'].map((l) => [l, [...document.querySelectorAll(`#drawer .sheet > .${l} [data-bench]`)].map((e) => [e.dataset.bench, e.textContent.replace(/\s+/g, ' ')])])),
      gamma: [...document.querySelectorAll('[data-bench="gamma"]')].map((e) => e.textContent),
      bench: window.EXACT_DEBUG.bench()
    };
  });
  const bad = [];
  if (!same(seen.box, seen.copy)) bad.push('the copy in the drawer');
  for (const lang of ['zh', 'en']) {
    const { spans, phrases } = expectedBench(lang, frame, seen.bench.lift),
      text = seen.box[lang];
    bad.push(...phrases.filter((x) => text.split(x.replace(/ /g, ' ')).length !== 2).map((x) => `${lang} box: ${x}`));
    if (/—|undefined|NaN|null|Infinity|∞/.test(text)) bad.push(`${lang} box: not filled`);
    if (!same(seen.spans[lang].map((x) => x[0]), Object.keys(spans))) bad.push(`${lang} spans: ${seen.spans[lang].map((x) => x[0]).join(' ')}`);
    for (const [key, s] of seen.spans[lang]) if (s !== spans[key]) bad.push(`${lang} drawer ${key}: ${s} (${spans[key]})`);
    bad.push(...mixed(text).map((x) => `${lang} chained: ${x}`));
  }
  if (!(seen.gamma.length === 4 && seen.gamma.every((s) => s === '≈ 14.1347'))) bad.push(`gamma ${seen.gamma}`);
  if (!(seen.bench.lift >= 0 && seen.bench.lift < 1e-12)) bad.push(`lift ${seen.bench.lift}`);
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
  check('NUM: the box in both languages, its copy and the spans of the drawer and of the MODEL box are the numbers computed here', !bad.length, bad.slice(0, 6).join(' | '));
}
{
  // the same sources with another frame: every number of the box and of the drawer follows it, so none of them is written down
  const patches = [
    ['const FRAME = { N: 12, K: 12, p: 7, delta: [1n, 20n], tiny: [1n, 100000000n] };', 'const FRAME = { N: 17, K: 9, p: 7, delta: [1n, 8n], tiny: [1n, 1000n] };'],
    ['const EULER_P = 1000;', 'const EULER_P = 200;'],
    ['const EULER_N = 100000;', 'const EULER_N = 5000;'],
    ['const LOG_BOX = 6;', 'const LOG_BOX = 3;']
  ];
  const p = await patched(patches);
  const bad = await auditBench(p, { N: 17, K: 9, delta: [1n, 8n], tiny: [1n, 1000n], eulerP: 200, eulerN: 5000, logBox: 3 });
  check('NUM: served with the frame N = 17, K = 9, δ = 1/8 and 1/1000, primes up to 200, 5000 terms and exponents up to 3, the box and the drawer follow it (they are computed, not written)', once(patches) && !bad.length, bad.slice(0, 6).join(' | '));
  await p.context().close();
}
for (const [what, patches, reads] of [
  // wrong laws in the script: the box counts the failures and the readouts keep no exact “=”
  ['a wrong Cayley map', [['return [quo(minus(ONE, n), d), ...s.map((x) => quo(times(TWO, x), d))];', 'return [quo(minus(ONE, n), d), ...s.map((x) => quo(x, d))];']], (t) => /逆映射与 κ = 1\/\(1 \+ ‖σ‖²\) 不符 [1-9]\d* 处/.test(t.box) && !t.roStar.includes('25/25')],
  ['a wrong rotor step', [['const stepA = common(cayley(A_HALF)),', 'const stepA = common(cayley([frac(1n, 4n), ZERO, ZERO])),']], (t) => /不可约不符 [1-9]\d* 处/.test(t.box) && !t.roChain.includes('244140625')],
  ['a chain with a wrong product', [['a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1], a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];\n    const stepA', 'a[0] * b[2] - a[1] * b[3] + a[2] * b[0] - a[3] * b[1], a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];\n    const stepA']], (t) => /不可约不符 [1-9]\d* 处/.test(t.box) && !/‖q₁₂‖² = 1\.0000/.test(t.box)],
  ['wrong corners of the tetrahedron', [['    [-1, -1, 1]\n  ];', '    [1, 1, 2]\n  ];']], (t) => t.box.includes('归零 232 个') && t.roLock === '0 · 1 · 232/256'],
  ['a wrong spinor', [['const q1 = [HALF, HALF, HALF, HALF],', 'const q1 = [HALF, HALF, HALF, frac(-1n, 2n)],']], (t) => !t.box.includes('送到 e₂, e₃, e₁')],
  ['a wrong adelic weight', [['const base = r === p ? plus(whole(r), delta) : whole(r);', 'const base = r === p ? plus(whole(r + 1), delta) : whole(r);']], (t) => t.box.includes('𝒜 = 1 的有 0 个') && !t.roPrime.includes('0.9929')]
]) {
  const p = await patched(patches);
  const t = await p.evaluate(() => Object.fromEntries([['box', '#basis .lean.num .zh'], ...['roStar', 'roChain', 'roLock', 'roPrime'].map((x) => [x, '#' + x])].map(([k, s]) => [k, document.querySelector(s).textContent.replace(/\s+/g, ' ')])));
  check(`NUM: with ${what} in the script the box and the readouts say so`, once(patches) && reads(t), JSON.stringify([once(patches), t.box.slice(0, 900), t.roStar, t.roChain, t.roLock, t.roPrime]));
  await p.context().close();
}

/* ---------- the five cards in both languages ---------- */
const frameOf = (m) => ({ N: m.gon.N, k: m.beat.k, f: m.beat.f, sigma: m.star.sigma.map(readN), D: m.star.D, K: m.chain.K, p: m.prime.p, delta: m.prime.delta, scene: m.scene, lens: m.lens });
/** Every number of the page at its frame, against the mathematics above. */
function verifyMath(m, label) {
  const v = frameOf(m),
    Q = cayleyN(v.sigma),
    tail = Q.map(cutN),
    want = adelicN(v.p, gridN(v.delta, 200));
  check(
    label + ' the frame: polygon, beat, point, rotor and product are the ones computed here',
    near(m.gon.semi, semiN(v.N), 1e-12) &&
      m.beat.z.every((z, i) => eqN(readN(z), ZPOW_N[v.k][i])) &&
      eqN(readN(m.beat.z2), zNormN(v.k)) &&
      m.star.Q.every((x, i) => eqN(readN(x), Q[i])) &&
      eqN(readN(m.star.tail2), dotN(tail, tail)) &&
      m.star.count === nodesN(v.D).size &&
      m.chain.nums.every((n, i) => BigInt(n) === CHAIN_N[v.K].v[i]) &&
      eqN(readN(m.prime.A), want) &&
      near(m.prime.lambda, lambdaN(v.delta), 1e-7),
    JSON.stringify(v, (_, x) => (typeof x === 'bigint' ? String(x) : x))
  );
}
/** The words of the readouts at a frame, in full. */
function expectedReadouts(m, lang) {
  const v = frameOf(m),
    zh = lang === 'zh',
    Q = cayleyN(v.sigma),
    kappa = divN(ONE, addN(ONE, dotN(v.sigma, v.sigma))),
    den = Q.reduce((d, [, q]) => (d / gcdN(d, q)) * q, 1n),
    A = adelicN(v.p, gridN(v.delta, 200)),
    beatQ = [[ONE, ZERO, ZERO, ZERO], cayleyN([ONE, ONE, ONE])];
  beatQ.push(qmN(beatQ[1], beatQ[1]));
  beatQ.push(qmN(beatQ[2], beatQ[1]));
  const g = ['(0, 0, 0)', '(1, 1, 1)', '(−1, −1, −1)', '(0, 0, 0)'][v.k],
    flat2 = CHAIN_N[v.K].flat.reduce((s, n) => s + n * n, 0n),
    semi = v.N === 6 ? '= 3.0000' : round(semiN(v.N)),
    lam = v.delta === 0 ? '= 0.0000' : relDouble(lambdaN(v.delta));
  return {
    roLock: '0 · 1 · 256/256',
    roGon: `N = ${v.N} · ${semi} · ${round(PI - semiN(v.N))} · ${v.N === 3 ? '= 0.5000' : round(1 - Math.cos(PI / v.N))}`,
    roBeat: `k = ${v.k} · ${g} · ${tupN(beatQ[v.k])} · ${v.k % 3 ? '= 1/4 = 0.2500' : '= 1.0000'}`,
    roStar: `${tupN(v.sigma)} ↦ ${tupN(Q)} · = ${den * den}/${den * den} = 1.0000 · = ${strN(kappa)}${kappa[1] === 1n ? '' : ` ${said(kappa)}`}`,
    roChain: `K = ${v.K} · ${5n ** BigInt(v.K)} · = 1.0000 · = ${flat2}.0000`,
    roPrime: `N = ${numberN(v.p)} · 𝒜 ${relFraction(A)} · ${lam}`,
    nOut: `= ${v.N}`,
    dOut: `= ${v.D}`,
    kOut: `= ${v.K}`,
    deltaOut: relFraction(gridN(v.delta, 200), 3),
    zh
  };
}
/** The relation of a fraction, a value beside a landmark written as a difference. */
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
/** The relation of an irrational double. */
function relDouble(x, d = 4) {
  if (Math.abs(x) < 0.5 * 10 ** -d) {
    const t = Math.abs(x).toExponential(3).split('e');
    return `≈ ${x < 0 ? '−' : ''}${t[0]}×10⁻${supT(Math.abs(Number(t[1])))}`;
  }
  return round(x, d);
}
async function verifyReadouts(p, label) {
  const m = await state(p),
    lang = await p.evaluate(() => document.documentElement.dataset.lang),
    want = expectedReadouts(m, lang),
    got = {};
  delete want.zh;
  for (const k of Object.keys(want)) got[k] = await textOf(k, p);
  check(label + ' the readouts and the outputs of the sliders are the numbers computed here, exact after “=”, rounded after “≈”', same(got, want), JSON.stringify(Object.keys(want).filter((k) => got[k] !== want[k]).map((k) => [k, got[k], want[k]])));
}
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  for (const id of IDS) {
    check(lang + '/' + id + ' plays up to its still and parks', await pick(id));
    const m = await state(),
      c = CARDS[id];
    check(lang + '/' + id + ' scene, view, rail, regime, seed and prime', m.preset === id && m.scene === c.scene && m.cam === c.cam && m.max === c.max && m.regime === c.regime && m.prime.p === 7 && tupN(m.star.sigma.map(readN)) === '(1/2, 0, 0)', JSON.stringify([m.scene, m.cam, m.max, m.regime]));
    verifyMath(m, lang + '/' + id);
    await verifyReadouts(page, lang + '/' + id);
    await layout(page, lang + '/' + id);
    const t = await regimeTexts(),
      zh = lang === 'zh',
      big = { struct: 'δF = 0.0000 · 256/256', beat: 'k = 3 · ‖Q³‖² = 1.0000', stars: 'κ = 4/5 = 0.8000', chain: 'K = 12 · ‖q₁₂‖² = 1.0000', prime: '𝒜 ≈ 0.9929' }[m.scene],
      v = (law, r) => law + (zh ? `（值 ${r}）` : ` (value ${r})`),
      subs = {
        struct: ['χ(S³) = 5 − 10 + 10 − 5 = 0', '256/256', v('N sin(π/N) < π', '≈ 3.1058')],
        beat: ['g₃ = g₂ ★ g₁ = (0, 0, 0)/(1 + 3) = (0, 0, 0)', 'Q³ = +1', '‖Q³‖² = 1.0000', 'e₁ ↦ e₁', v('|zdec³|² < 1', '≈ 0.999868'), v('|zdec³ − 1| > 0', '≈ 7.62×10⁻⁵')],
        stars: ['σ = (1/2, 0, 0) ↦ Q = (3/5, 4/5, 0, 0)', '‖Q‖² = 25/25 = 1.0000', 'κ = 4/5 = 0.8000', zh ? `分母不超过 13 的切片点已有 ${nodesN(13).size} 个` : `${nodesN(13).size} points of the slice have denominators up to 13`],
        chain: ['5¹² = 244140625', '‖q₁₂‖² = 1.0000', 'a ★ b = (1/2, 1/2, 1/4)', v('‖xflat,12‖² > 1', '= 73.0000')],
        prime: ['δ₇ = 0.050', '42 = 2·3·7', '(7 + δ)⁻¹', v('𝒜 = 140/141 < 1', '≈ 0.9929'), v('λmin < 0', '≈ −0.0117'), 'MODEL']
      }[m.scene];
    check(lang + '/' + id + ' HUD title and line state the card', t.big.includes(big) && subs.every((x) => t.sub.includes(x)), JSON.stringify([t, subs.filter((x) => !t.sub.includes(x))]));
    const key = { struct: ['δF = 0.0000 (256/256)', 'N sin(π/N) ≈ 3.1058'], beat: ['‖Q³‖² = 1.0000', '|zdec³|² ≈ 0.999868'], stars: ['‖Q‖² = 1.0000', '‖Qdec‖² = 1.0000'], chain: ['‖q₁₂‖² = 1.0000', '‖xflat,12‖² = 73.0000'], prime: ['𝒜(δ = 0) = 1.0000', '𝒜(δ) ≈ 0.9929'] }[m.scene];
    check(lang + '/' + id + ' the key readout puts the exact track beside the flat one', (await textOf('roKey')) === key.join(' ↔ '), await textOf('roKey'));
    check(lang + '/' + id + ' the rail label', (await textOf('tau')) === { struct: 'N = 12', beat: 'k = 3', stars: 'D = 13', chain: 'K = 12', prime: 'δ₇ = 0.050' }[m.scene], await textOf('tau'));
    const readings = await page.locator('#readouts output').allTextContents();
    check(lang + '/' + id + ' one key and six readouts, all populated', readings.length === 7 && (await page.locator('#readouts dl.ro > div.key').count()) === 1 && readings.every((x) => x && !/NaN|undefined|∞|^—$/.test(x)), JSON.stringify(readings));
    check(lang + '/' + id + ' the note of the card panel and of the tour bar agree and are not empty', t.note.length > 10 && t.note === t.tour, JSON.stringify(t));
    // the solid: an opaque violet body over an eighth of the stage or more, with light and shade
    const px = await solidPixels(page);
    check(lang + '/' + id + ' the violet ball: opaque over ≥ 12% of the stage, shaded', px.share >= 0.12 && px.spread >= 0.04, JSON.stringify([px.share, px.spread]));
  }
}
check('the registered stills are written on the cards', same(await page.$$eval('#presets [data-preset]', (els) => els.map((e) => Number(e.dataset.still))), IDS.map((id) => CARDS[id].still)));

/* ---------- the rails and the dials ---------- */
await setLang('en');
for (const [id, values] of [
  [STRUCT, [0, 3, 9, 15, 21]],
  [BEAT, [0, 1, 2, 3]],
  [STARS, [0, 1, 4, 8]],
  [CHAIN, [0, 1, 11, 22, 23]],
  [PRIME, [0, 0.005, 0.05, 0.125, 0.2]]
]) {
  await pick(id);
  for (const t of values) {
    await seek(t);
    const m = await state();
    check(`${id}: rail ${t}`, near(m.clock, t, 1e-12) && !m.playing && m.scene === CARDS[id].scene && near(m.at[m.scene], t, 1e-12));
    verifyMath(m, `${id} rail ${t}`);
    await verifyReadouts(page, `${id} rail ${t}`);
    const box = await page.locator('#stageHandle').boundingBox(),
      at = await page.evaluate((x) => window.EXACT_DEBUG.dragTarget(x), t);
    check(`${id}: the handle sits on the current point at ${t}`, !!box && Math.hypot(box.x + box.width / 2 - at.x, box.y + box.height / 2 - at.y) < 1.5);
  }
}
// whole rails keep whole numbers, δ its grid of 1/200, and a beat may stop half way
for (const [id, v, want] of [
  [STRUCT, 4.4, 4],
  [STARS, 2.6, 3],
  [CHAIN, 7.5, 8],
  [PRIME, 0.0512, 0.05],
  [BEAT, 1.5, 1.5],
  [BEAT, 1.02, 1]
]) {
  await pick(id);
  await page.evaluate(() => (document.querySelector('#now').step = 'any'));
  await seek(v);
  check(`${id}: the rail takes ${v} to ${want}`, near((await state()).clock, want, 1e-12), String((await state()).clock));
}
{
  await pick(BEAT);
  await seek(1.5);
  const m = await state(),
    t = await regimeTexts();
  check('half way through a beat the HUD says that the beat is running and takes no reading', m.regime === 'moving' && m.beat.k === 1 && near(m.beat.f, 0.5, 1e-12) && t.big.includes('k = 1 → 2') && t.sub.includes('Beat 2 is running') && (await textOf('tau')) === 'k = 1 → 2' && (await page.locator('#beatChips [aria-pressed="true"]').count()) === 0);
}
for (const [sel, v, scene, get, want] of [
  ['#nRange', 5, 'struct', (m) => m.gon.N, 5],
  ['#dRange', 9, 'stars', (m) => m.star.D, 9],
  ['#kRange', 24, 'chain', (m) => m.chain.K, 24],
  ['#kRange', 1, 'chain', (m) => m.chain.K, 1],
  ['#deltaRange', 0.1, 'prime', (m) => m.prime.delta, 0.1]
]) {
  await input(sel, v);
  const m = await state();
  check(`${sel} = ${v} shows its card, moves the rail and unmarks the cards`, m.scene === scene && near(get(m), want, 1e-12) && m.preset === null && !m.playing && near(m.clock, m.at[scene], 1e-12));
  await verifyReadouts(page, `${sel} = ${v}`);
}
for (const k of [0, 1, 2, 3]) {
  await press(`#beatChips [data-beat="${k}"]`);
  const m = await state();
  check(`beat chip k = ${k}`, m.scene === 'beat' && m.beat.k === k && m.beat.f === 0 && (await page.getAttribute(`#beatChips [data-beat="${k}"]`, 'aria-pressed')) === 'true');
}
{
  // the step button: from the pole, one beat at a time, and round again
  await pick(BEAT);
  const seen = [];
  for (const want of [1, 2, 3, 1]) {
    await page.locator('#stepBtn').evaluate((b) => b.click());
    await until(page, (k) => { const s = window.EXACT_DEBUG.state; return !s.playing && s.beat.f === 0 && s.beat.k === k; }, want, 60000);
    await settle(page);
    seen.push((await state()).beat.k);
  }
  check('the step button plays one beat at a time, from the pole again after the third, and the card stays marked', same(seen, [1, 2, 3, 1]) && (await state()).preset === BEAT, JSON.stringify(seen));
  await page.locator('#stageAct').evaluate((b) => b.click());
  check('the button on the stage steps too', await until(page, () => { const s = window.EXACT_DEBUG.state; return !s.playing && s.beat.k === 2 && s.beat.f === 0; }, null, 60000));
  await settle(page);
  const t = await regimeTexts();
  check('beat 2: g₂ = g₁ ★ g₁ = (2, 2, 2)/(1 − 3) = (−1, −1, −1), κ(1, Q²) = 1/4, e₁ ↦ e₃', ['g₂ = g₁ ★ g₁ = (2, 2, 2)/(1 − 3) = (−1, −1, −1)', 'Q² = (−1/2, −1/2, −1/2, −1/2)', 'κ(1, Q²) = 1/4 = 0.2500', 'e₁ ↦ e₃'].every((x) => t.sub.includes(x)), t.sub);
  await seek(1);
  const u = await regimeTexts();
  check('beat 1: g₁ = (1, 1, 1), Q = (−1/2, 1/2, 1/2, 1/2), κ(1, Q) = 1/4, e₁ ↦ e₂', ['g₁ = (1, 1, 1)', 'Q = (−1/2, 1/2, 1/2, 1/2)', 'κ(1, Q) = 1/4 = 0.2500', '‖Q‖² = 1.0000', 'e₁ ↦ e₂'].every((x) => u.sub.includes(x)), u.sub);
}
for (const [seed, q, k] of [
  ['1,1,0', '(−1/3, 2/3, 2/3, 0)', '= 1/3 ≈ 0.3333'],
  ['1,1,1', '(−1/2, 1/2, 1/2, 1/2)', '= 1/4 = 0.2500'],
  ['2,1,2', '(−4/5, 2/5, 1/5, 2/5)', '= 1/10 = 0.1000'],
  ['1/3,1/3,1/3', '(1/2, 1/2, 1/2, 1/2)', '= 3/4 = 0.7500'],
  ['0,0,0', '(1, 0, 0, 0)', ''],
  ['1/2,0,0', '(3/5, 4/5, 0, 0)', '= 4/5 = 0.8000']
]) {
  await press(`#seedChips [data-seed="${seed}"]`);
  const m = await state(),
    text = await textOf('hudSub');
  check(`seed chip (${seed}): σ ↦ Q on the HUD, κ ${k}`, m.scene === 'stars' && m.preset === null && tupN(m.star.sigma.map(readN)) === tupN(seedN(seed)) && text.includes(`↦ Q = ${q}`) && (await page.getAttribute(`#seedChips [data-seed="${seed}"]`, 'aria-pressed')) === 'true' && (seed === '0,0,0' || text.includes(`κ ${k}`)), text);
  await verifyReadouts(page, `seed (${seed})`);
  await layout(page, `seed (${seed})`);
}
{
  await pick(STARS);
  await press('#stageAct');
  check('the button on the stage takes the next seed', tupN((await state()).star.sigma.map(readN)) === '(1, 1, 0)' && (await state()).preset === null);
  const counts = [];
  for (const t of range(9)) {
    await seek(t);
    counts.push([(await state()).star.count, (await primitives()).seen.filter((x) => x.n === 'poly').map((x) => x.pts.length / 6)[0]]);
  }
  check('the constellation draws exactly the counted points at every bound, more at each', counts.every(([a, b]) => a === b) && counts.every(([a], i) => i === 0 || a > counts[i - 1][0]), JSON.stringify(counts));
  const beads = (await primitives()).seen.find((x) => x.n === 'poly').pts;
  check('every drawn bead lies on the violet sphere', range(beads.length / 6).every((k) => { const c = range(3).map((i) => range(6).reduce((s, j) => s + beads[6 * k + j][i], 0) / 6); return near(norm(c), 1.006, 1e-9); }));
}
for (const p of PRIMES) {
  await pick(PRIME);
  await press(`#primeChips [data-prime="${p}"]`);
  const m = await state(),
    text = await textOf('hudSub');
  check(`prime chip ${p}: N = ${numberN(p)} and 𝒜 = ${strN(adelicN(p, [1n, 20n]))} at δ = 1/20`, m.scene === 'prime' && m.prime.p === p && m.prime.N === numberN(p) && text.includes(`𝒜 = ${strN(adelicN(p, [1n, 20n]))} < 1`) && text.includes(`${numberN(p)} = ${factorsN(numberN(p)).join('·')}`) && (await page.getAttribute(`#primeChips [data-prime="${p}"]`, 'aria-pressed')) === 'true', text);
  await verifyReadouts(page, `prime ${p}`);
  await press('#resetBtn');
  const z = await state();
  check(`prime ${p}: one press of the reset gives δ = 0, 𝒜 = 1 and λ = 0, the images on the circle`, z.prime.delta === 0 && z.prime.p === p && same(z.prime.A, ['1', '1']) && z.prime.lambda === 0 && z.regime === 'locked' && (await textOf('hudSub')).includes('𝒜 = 1.0000') && (await textOf('roPrime')).endsWith('𝒜 = 1.0000 · = 0.0000'));
}
{
  await pick(PRIME);
  await press('#stageAct');
  check('the button δ = 0 on the stage resets too', (await state()).prime.delta === 0 && (await state()).regime === 'locked');
  const locked = await primitives();
  const of = (f, key) => f.seen.filter((x) => x.key === key).flatMap((x) => x.colors);
  check('δ = 0: three closed cyan loops, a cyan balance, no magenta on the stage', ['loop0', 'loop1', 'loop2'].every((k) => of(locked, k).includes(locked.palette.cyan)) && !locked.seen.some((x) => x.colors.includes(locked.palette.magenta)));
  const closed = locked.seen.filter((x) => /^loop/.test(x.key)).every((x) => norm(sub(x.pts[0], x.pts.at(-1))) < 1e-9 && x.pts.every((q) => near(norm(q), 1.014, 1e-9)));
  await seek(0.05);
  const broken = await primitives(),
    open = broken.seen.filter((x) => /^open/.test(x.key));
  check('δ = 0.05: exactly the loop of p = 7 is magenta and open, the two others stay closed on the sphere', closed && open.length === 1 && open[0].key === 'open2' && open[0].colors.includes(broken.palette.magenta) && norm(sub(open[0].pts[0], open[0].pts.at(-1))) > 0.1 && broken.seen.filter((x) => /^loop/.test(x.key)).length === 2);
  // the mirror pair is drawn off the ring by the stated enlargement, reciprocal in the logarithm
  const at = (key) => broken.seen.find((x) => x.key === key).pts[0],
    log = 0.5 * Math.log(((0.55 * 0.55 + GAMMA1 ** 2) / (0.45 * 0.45 + GAMMA1 ** 2)));
  check('the mirror pair is drawn 220 times its logarithmic offset outside and inside the ring of radius 1.3, at 8 times its angle, with its conjugates', near(norm(at('uout')), 1.3 * (1 + 220 * log), 1e-9) && near(norm(at('uin')), 1.3 * (1 - 220 * log), 1e-9) && near(at('uout')[2], -at('uoutbar')[2], 1e-12) && near(at('uin')[2], -at('uinbar')[2], 1e-12) && near(Math.atan2(at('uout')[2], at('uout')[0]), 8 * Math.atan2(GAMMA1, GAMMA1 ** 2 + 0.0025 - 0.25), 1e-9));
}
/* ---------- the drawing keeps the norms ---------- */
{
  await pick(CHAIN);
  await seek(23);
  const f = await primitives(),
    tube = f.seen.find((x) => x.key === 'chain').pts;
  check('the rotor chain hugs the sphere: every point of the drawn path over 24 steps is at the distance 1.014 from the centre', tube.length > 250 && tube.every((q) => near(norm(q), 1.014, 1e-9)));
  const beads = range(25).map((K) => f.seen.find((x) => x.key === 'q' + K).pts[0]);
  check(
    'each bead is its q_K: the height is the real part, the first coordinate the i part, the rest turned into the front half',
    beads.every((b, K) => {
      const q = CHAIN_N[K].v.map((n) => Number((n * 10n ** 30n) / 5n ** BigInt(K)) / 1e30);
      return near(b[2] / 1.014, q[0], 1e-9) && near(b[0] / 1.014, q[1], 1e-9) && near(b[1] / 1.014, -Math.hypot(q[2], q[3]), 1e-9);
    })
  );
  const flat = f.seen.find((x) => x.key === 'flat').pts,
    d = flat.map((q) => Math.hypot(q[0], q[1]));
  check('the flat sum stays in the tangent plane of the north pole and only moves out', flat.every((q) => near(q[2], 1.004, 1e-12)) && d.every((x, i) => i === 0 || x >= d[i - 1] - 1e-12) && near(d.at(-1), 1.5, 1e-9) && near(flat.at(-1)[0], -flat.at(-1)[1], 1e-12));
  await pick(BEAT);
  const b = await primitives(),
    arcs = range(3).map((k) => b.seen.find((x) => x.key === 'arc' + k).pts);
  check('the three arcs are thirds of one great circle and close at the pole', arcs.every((a) => a.every((q) => near(norm(q), 1.035, 1e-9) && near(q[1], 0, 1e-12))) && norm(sub(arcs[2].at(-1), arcs[0][0])) < 1e-9 && range(2).every((k) => norm(sub(arcs[k].at(-1), arcs[k + 1][0])) < 1e-9) && near(arcs[0].at(-1)[2], -0.5 * 1.035, 1e-9) && near(arcs[1].at(-1)[2], -0.5 * 1.035, 1e-9) && same(b.seen.find((x) => x.key === 'current').pts[0].map((x) => Math.round(x * 1e9) / 1e9 + 0), [0, 0, 1.035]));
  await pick(STRUCT);
  const s = await primitives(),
    gon = s.seen.filter((x) => x.n === 'line' && x.colors.includes(s.palette.magenta) && x.pts.length === 12)[0];
  const cam = (await state()).camera,
    R = [Math.cos(cam.yaw), -Math.sin(cam.yaw), 0],
    U = [Math.sin(cam.yaw) * Math.sin(cam.pitch), Math.cos(cam.yaw) * Math.sin(cam.pitch), Math.cos(cam.pitch)];
  const corners = gon.pts.map((q) => [dot(q, R), dot(q, U)]);
  check('the magenta 12-gon: its corners are on the outline circle and its half perimeter is the value printed', corners.every((q) => near(Math.hypot(...q), 1, 1e-9)) && near(corners.reduce((acc, q, k) => acc + Math.hypot(q[0] - corners[(k + 1) % 12][0], q[1] - corners[(k + 1) % 12][1]), 0) / 2, semiN(12), 1e-9));
  check('the geodesic tetrahedron: six great-circle edges on the sphere', s.seen.filter((x) => /^tetra\d\d$/.test(x.key)).length === 6 && s.seen.filter((x) => /^tetra\d\d$/.test(x.key)).every((x) => x.pts.every((q) => near(norm(q), 1.014, 1e-9))));
}

/* ---------- every relation the page prints, in every area, over the cards, languages, lenses and layouts ---------- */
/** The values the page may write after a relation sign at a frame: [fraction or null, double]. */
function relationTable(v) {
  const Q = cayleyN(v.sigma),
    tail = Q.map(cutN),
    A = adelicN(v.p, gridN(v.delta, 200)),
    flat2 = [CHAIN_N[v.K].flat.reduce((s, n) => s + n * n, 0n), 1n],
    cut = factorsN(numberN(v.p)).reduce((acc, r) => mulN(acc, cutN([1n, BigInt(r)])), intN(numberN(v.p))),
    q = (x) => [x, numN(x)],
    cay = (re) => Math.hypot(re - 1, GAMMA1) / Math.hypot(re, GAMMA1),
    z = [0, 1, 2, 3].map((k) => zNormN(k));
  return [
    q(ONE),
    q(ZERO),
    [v.N === 6 ? intN(3) : null, semiN(v.N)],
    [null, PI - semiN(v.N)],
    [v.N === 3 ? HALF : null, 1 - Math.cos(PI / v.N)],
    q(divN(ONE, addN(ONE, dotN(v.sigma, v.sigma)))),
    ...[[4n, 5n], [1n, 3n], [1n, 4n], [1n, 10n]].map(q),
    q(dotN(tail, tail)),
    ...z.map(q),
    [null, Z_GAP],
    q([999934n, 1000000n]),
    q(flat2),
    q(A),
    q(cut),
    q(gridN(v.delta, 200)),
    [v.delta === 0 ? ZERO : null, lambdaN(v.delta)],
    [v.delta === 0 ? ONE : null, cay(0.5 - v.delta)],
    [v.delta === 0 ? ONE : null, cay(0.5 + v.delta)],
    q(subN(doubleN(0.1), [1n, 10n]))
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
  const at = (over) => relationTable({ N: 12, k: 3, f: 0, sigma: seedN('1,1,0'), D: 13, K: 12, p: 7, delta: 0.05, ...over });
  const wrong = [
      ['N sin(π/N) = 3.1058', at({})],
      ['N sin(π/N) ≈ 3.1059', at({})],
      ['κ = 0.3333', at({})],
      ['κ ≈ 0.3334', at({})],
      ['κ ≈ 0.2500', at({})],
      ['‖x‖² ≈ 73.0000', at({})],
      ['‖x‖² = 72.0000', at({})],
      ['𝒜 = 0.9929', at({})],
      ['𝒜 ≈ 0.9930', at({})],
      ['𝒜 ≈ 1.0000', at({ delta: 0 })],
      ['|z|² ≈ 0.999956', at({})],
      ['|z|² ≈ 1.0000', at({})],
      ['λ ≈ −0.0118', at({})],
      ['gap = 7.62×10⁻⁵', at({})],
      ['δ ≈ 0.050', at({})]
    ].filter(([x, table]) => !relations(x, table).bad.length),
    right = [
      ['N sin(π/N) ≈ 3.1058，短 ≈ 0.0358', at({})],
      ['κ = 1/3 ≈ 0.3333', at({})],
      ['‖x‖² = 73.0000', at({})],
      ['𝒜 ≈ 0.9929 · ≈ −0.0117', at({})],
      ['|z|² = 0.999956，≈ 7.62×10⁻⁵', at({})],
      ['δ₇ = 0.050', at({})]
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
          const s = window.EXACT_DEBUG.state;
          out.push({
            lang,
            lens: s.lens,
            regime: s.regime,
            v: { N: s.gon.N, k: s.beat.k, f: s.beat.f, sigma: s.star.sigma, D: s.star.D, K: s.chain.K, p: s.prime.p, delta: s.prime.delta },
            texts: Object.fromEntries(['#keyPill', '#scenePill', '#hudBig', '#hudSub', '#presetNote', '#tour .tour-note', '#readouts', '#ctlPanel', '#tau', '#legend', '#plotTitle', '#plotMeta', '#plotTitleB', '#plotMetaB'].map((x) => [x, text(x)])),
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
  [STRUCT]: [3, 4, 5, 6, 7, 12, 17, 24].map((n) => [['#nRange', n]]),
  [BEAT]: [...[0, 1, 2, 3].map((k) => [[`#beatChips [data-beat="${k}"]`, null]]), ...[0.4, 1.5, 2.9].map((t) => [['#now', t]])],
  [STARS]: [...['1/2,0,0', '1,1,0', '1,1,1', '2,1,2', '1/3,1/3,1/3', '0,0,0'].map((s) => [[`#seedChips [data-seed="${s}"]`, null]]), ...[1, 7, 17].map((d) => [['#dRange', d]])],
  [CHAIN]: [1, 2, 3, 6, 12, 13, 23, 24].map((k) => [['#kRange', k]]),
  [PRIME]: [...[0, 0.005, 0.05, 0.135, 0.2].map((d) => [['#deltaRange', d]]), ...PRIMES.map((p) => [[`#primeChips [data-prime="${p}"]`, null], ['#deltaRange', 0.05]]), [['#primeChips [data-prime="2"]', null], ['#deltaRange', 0.2]], [['#primeChips [data-prime="13"]', null], ['#resetBtn', null]]]
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
      const v = { ...f.v, sigma: f.v.sigma.map(readN) },
        table = relationTable(v),
        at = `${f.lang}/lens ${f.lens}/${f.regime}`;
      for (const [sel, x] of [...Object.entries(f.texts), ...f.tags.map((t) => ['label', t])]) {
        const r = relations(x, table);
        count += r.count;
        bad.push(...r.bad.map((b) => `${at} ${sel}: ${b}`));
        beside.push(...mixed(x).map((b) => `${at} ${sel}: ${b}`));
        if (/NaN|undefined|Infinity|null/.test(x)) bad.push(`${at} ${sel}: ${x}`);
        if (/≈ −?0\.0+(?![\d×])|= −0\.0+(?!\d)/.test(x)) zeros.push(`${at} ${sel}: ${x}`);
      }
    }
    check(`${where}/${id}: in ${frames.length} frames every printed relation is “=” before a value of the frame itself or “≈” before its rounding (${count} relations)`, frames.length >= 28 && count >= 12 * frames.length && !bad.length, `${count} of ${frames.length}: ${[...new Set(bad)].slice(0, 5).join(' ¦ ')}`);
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
      check(`stage first ${lang}/${where}/${id}: the violet ball is opaque over ≥ 12% of the stage`, px.share >= 0.12 && px.spread >= 0.04, JSON.stringify([px.share, px.spread]));
      if (width === 390) check(`${lang}/390/${id}: the whole phone page stays under 7800 px (a full-page capture ends at 8192 px)`, dom.page < 7800, String(dom.page));
      const m = await state(p);
      check(`stage first ${lang}/${where}/${id}: the card rests on its still and its regime`, near(m.clock, CARDS[id].still, 1e-12) && m.regime === CARDS[id].regime && m.scene === CARDS[id].scene && !m.playing);
    }
    await p.context().close();
  }

/* ---------- the two lenses and the views ---------- */
await setLang('en');
check('desktop: the mirror lens button of the tour bar stays hidden', (await page.evaluate(() => innerWidth)) > 1080 && (await page.locator('#lensMirror').isHidden()));
for (const lang of ['zh', 'en']) {
  await setLang(lang);
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
    const strength = (f, colour) => f.seen.filter((x) => ['tube', 'line', 'bead', 'fan', 'poly'].includes(x.n) && x.colors.includes(f.palette[colour])).reduce((s, x) => s + x.alpha, 0);
    const want = {
      struct: [lang === 'zh' ? '短 ≈ 0.0358' : 'short of π by ≈ 0.0358', '≈ 0.0341', '≈ 5.551×10⁻¹⁸'],
      beat: ['zdec = −0.5 + 0.8660i', lang === 'zh' ? '|zdec|² < 1（值 = 0.999956）' : '|zdec|² < 1 (value = 0.999956)', 'zdec³ = 0.999934 + 0.000038104i', lang === 'zh' ? '|zdec³ − 1| > 0（值 ≈ 7.62×10⁻⁵）' : '|zdec³ − 1| > 0 (value ≈ 7.62×10⁻⁵)'],
      stars: ['(0.6000, 0.8000, 0.0000, 0.0000)', '‖Qdec‖² = 1.0000'],
      chain: ['xflat,12 = (1, 6, 6, 0)', lang === 'zh' ? '‖xflat,12‖² > 1（值 = 73.0000）' : '‖xflat,12‖² > 1 (value = 73.0000)'],
      prime: ['∏ = 42 × 0.5000 × 0.3333 × 0.1428', lang === 'zh' ? '∏ < 1（值 ≈ 0.9995）' : '∏ < 1 (value ≈ 0.9995)']
    }[on.scene];
    check(
      `${lang}/${id} the flat lens renames the picture, says MODEL on the switch, the pill and the title, prints the decimals and keeps the state`,
      on.lens === 1 &&
        (await textOf('scenePill')) !== pill0 &&
        (await textOf('hudBig')) !== big0 &&
        (await textOf('hudSub')) !== sub0 &&
        /MODEL/.test(await textOf('hudBig')) &&
        /MODEL/.test(await textOf('scenePill')) &&
        /MODEL/.test(await page.locator('#lensToggleBtn .seg.on').innerText()) &&
        ['at', 'scene', 'preset', 'star', 'chain', 'prime', 'beat', 'gon', 'camera'].every((k) => same(on[k], before[k])) &&
        (await page.getAttribute('#lensToggleBtn', 'aria-pressed')) === 'true' &&
        (await page.getAttribute('#lensMirror', 'aria-pressed')) === 'true',
      JSON.stringify([await textOf('hudBig'), await textOf('hudSub')])
    );
    const sub1 = await textOf('hudSub');
    check(`${lang}/${id} the flat lens writes its numbers`, want.every((x) => sub1.includes(x)), JSON.stringify([sub1, want.filter((x) => !sub1.includes(x))]));
    check(`${lang}/${id} the flat lens dims the exact cyan and never the flat magenta`, strength(f1, 'cyan') < strength(f0, 'cyan') && strength(f1, 'magenta') >= strength(f0, 'magenta') - 1e-9, JSON.stringify([strength(f0, 'cyan'), strength(f1, 'cyan'), strength(f0, 'magenta'), strength(f1, 'magenta')]));
    await layout(page, `${lang}/${id} flat lens`);
    await press('#lensToggleBtn');
    check(`${lang}/${id} the exact lens is back`, (await state()).lens === 0 && (await textOf('hudSub')) === sub0);
  }
  // the tetrahedral point has a decimal tail: the lens draws and writes it
  await pick(STARS);
  await press('#seedChips [data-seed="1,1,0"]');
  await setLens(1);
  const tail = cayleyN(seedN('1,1,0')).map(cutN),
    t2 = dotN(tail, tail),
    text = await textOf('hudSub');
  check(`${lang}: the four-decimal copy of (−1/3, 2/3, 2/3, 0) leaves the sphere`, (await state()).regime === 'tail' && text.includes('(−0.3333, 0.6666, 0.6666, 0.0000)') && text.includes(lang === 'zh' ? `‖Qdec‖² < 1（值 ${relFraction(t2)}）` : `‖Qdec‖² < 1 (value ${relFraction(t2)})`) && (await primitives()).seen.some((x) => x.key === 'tail'), text);
  await setLens(0);
}
await pick(DEFAULT);
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
  [STRUCT, 1],
  [BEAT, 1],
  [CHAIN, 6],
  [PRIME, 0.15]
]) {
  await pick(id);
  const before = await state();
  await dragHandle(await page.evaluate((x) => window.EXACT_DEBUG.dragTarget(x), t));
  const m = await state();
  check(`${id}: dragging the handle moves the rail to ${t}, leaves the camera alone and unmarks the card`, near(m.clock, t, id === BEAT ? 0.03 : 1e-9) && same(m.camera, before.camera) && m.preset === null && !m.playing, String(m.clock));
}
{
  await pick(STARS);
  const to = await page.evaluate(() => window.EXACT_DEBUG.seedTarget('1,1,0'));
  await dragHandle(to);
  const m = await state();
  check('on the constellation the handle drops on the nearest rational point: (1, 1, 0)', to.depth > 0 && tupN(m.star.sigma.map(readN)) === '(1, 1, 0)' && m.preset === null && same(m.star.norm, ['1', '1']), tupN(m.star.sigma.map(readN)));
  await page.locator('#stageHandle').focus();
  await page.keyboard.press('ArrowRight');
  await settle(page);
  check('ArrowRight on the handle adds 1/4 to the first coordinate, still an exact point', tupN((await state()).star.sigma.map(readN)) === '(5/4, 1, 0)' && same((await state()).star.norm, ['1', '1']));
  await page.keyboard.press('ArrowDown');
  await settle(page);
  check('ArrowDown takes 1/4 off the second coordinate', tupN((await state()).star.sigma.map(readN)) === '(5/4, 3/4, 0)');
  await page.keyboard.press('Home');
  await settle(page);
  check('Home on the handle gives σ = 0, Q = 1', tupN((await state()).star.sigma.map(readN)) === '(0, 0, 0)');
  await page.keyboard.press('End');
  await settle(page);
  check('End on the handle gives the seed (1/2, 0, 0)', tupN((await state()).star.sigma.map(readN)) === '(1/2, 0, 0)');
  for (const [id, keys] of [
    [STRUCT, [['ArrowRight', 10], ['ArrowLeft', 9], ['Home', 0], ['End', 21]]],
    [CHAIN, [['ArrowUp', 12], ['ArrowDown', 11], ['Home', 0], ['End', 23]]],
    [PRIME, [['ArrowRight', 0.055], ['Home', 0], ['End', 0.2]]]
  ]) {
    await pick(id);
    await page.locator('#stageHandle').focus();
    for (const [key, want] of keys) {
      await page.keyboard.press(key);
      await settle(page);
      check(`${id}: ${key} on the handle goes to ${want}`, near((await state()).clock, want, 1e-12), String((await state()).clock));
    }
  }
}

/* ---------- playback ---------- */
await pick(BEAT);
for (const id of IDS) {
  const at = await playsAfter(page, () => page.locator(`[data-preset="${id}"]`).evaluate((b) => b.click()), () => ({ playing: window.EXACT_DEBUG.state.playing, t: window.EXACT_DEBUG.state.clock }));
  check(`${id}: a click on the card plays it`, at);
  check(`${id}: it parks on its still`, await until(page, ([c, s]) => { const m = window.EXACT_DEBUG.state; return !m.playing && m.preset === c && Math.abs(m.clock - s) < 1e-12; }, [id, CARDS[id].still], 150000));
  await settle(page);
}
{
  await pick(CHAIN);
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
  await page.keyboard.press(' ');
  check('Space plays on from the still', await until(page, () => window.EXACT_DEBUG.state.playing && window.EXACT_DEBUG.state.clock > 11));
  await page.keyboard.press(' ');
  check('a pause rests on a whole number of steps', await until(page, () => { const m = window.EXACT_DEBUG.state; return !m.playing && Number.isInteger(m.clock) && m.chain.f === 0; }));
  await press('#rew');
  check('⏮ goes back to the first step', (await state()).clock === 0 && (await state()).chain.K === 1);
}

/* ---------- colours ---------- */
for (const id of IDS) {
  await pick(id);
  const { seen, palette: P } = await primitives();
  const of = (key) => seen.filter((x) => x.key === key).flatMap((x) => x.colors);
  check(
    id + ' semantic stage colours: amber only on the current point, no green and no red, the ball violet',
    seen.filter((x) => x.colors.includes(P.amber)).every((x) => x.key === 'current') && seen.filter((x) => x.key === 'current').length === 1 && of('current').includes(P.amber) && seen.every((x) => !x.colors.includes(P.ok) && !x.colors.includes(P.warn)) && of('ball').includes(P.violet)
  );
  if (id === STRUCT) check('locks: Hopf circles and tetrahedron cyan, polygon and ruler magenta', ['hopf0', 'hopf1', 'tetra01', 'corner0'].every((k) => of(k).includes(P.cyan)) && seen.some((x) => x.n === 'line' && x.colors.includes(P.magenta)) && seen.filter((x) => x.n === 'fan' && x.colors.includes(P.magenta)).length === 12);
  if (id === BEAT) check('beats: three cyan arcs and stations, the four-decimal z magenta', ['arc0', 'arc1', 'arc2', 'station0', 'axis'].every((k) => of(k).includes(P.cyan)) && ['z1', 'z2', 'z3'].every((k) => of(k).includes(P.magenta)));
  if (id === STARS) check('constellation: cyan points and circles, no magenta in the exact lens', of('stars13').includes(P.cyan) && !seen.some((x) => x.colors.includes(P.magenta)));
  if (id === CHAIN) check('chain: the rotor cyan, the flat sum magenta', of('chain').includes(P.cyan) && of('flat').includes(P.magenta) && of('flatEnd').includes(P.magenta));
  if (id === PRIME) check('prime: closed loops cyan, the open loop and the mirror pair magenta', of('loop0').includes(P.cyan) && of('open2').includes(P.magenta) && ['uout', 'uin', 'uoutbar', 'uinbar'].every((k) => of(k).includes(P.magenta)));
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
      if (el.closest('.handle') || el.matches('.hud-bl .sw.am')) continue; // the handle, and the legend key of the current point
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
/** What the two plots draw on the next frame: lines, dots and legend texts with their boxes. */
const stripFrame = (p = page) =>
  p.evaluate(() => {
    const kit = TRV.kit,
      plot = kit.plot,
      out = {},
      touched = [];
    kit.plot = (cv, o) => {
      const g = plot(cv, o),
        rec = { id: cv.id, w: cv.clientWidth, h: cv.clientHeight, y0: g.y0, y1: g.y1, lines: [], dots: [], tops: [], texts: [], ticks: [] };
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
      for (const c of touched) delete c.fillText;
    }
    const { cyan, violet, magenta, amber } = TRV.palette;
    return { ...out, palette: { cyan, violet, magenta, amber } };
  });
/** The legend rows sit in open headroom: the least distance (px) from the lowest legend ink, three pixels deeper for a
    platform font with a longer descent, to the topmost curve, cursor or dot; and the share of head room above the curves. */
function legendChecks(label, f) {
  for (const id of ['plot', 'plotB']) {
    const r = f[id];
    if (!r) {
      check(`${label} #${id} is drawn`, false);
      continue;
    }
    const top = Math.min(...r.tops),
      bottom = Math.max(...r.texts.map((x) => x.b)) + 3,
      values = r.lines.flatMap((l) => l.pts.map((q) => q[1])),
      hi = Math.max(...values),
      lo = Math.min(...values);
    check(
      `${label} #${id}: the legend clears every curve, cursor and dot by ≥ 8 px with a deeper font descent, ≥ 35% head room, and no legend or tick text is cut off`,
      r.texts.length >= 2 && r.h >= 118 && top - bottom >= 8 && (r.y1 - hi) / (hi - lo) >= 0.35 && [...r.texts, ...r.ticks].every((x) => x.l >= -0.5 && x.r <= r.w + 0.5 && x.t >= -0.5),
      JSON.stringify({ gap: top - bottom, head: (r.y1 - hi) / (hi - lo), h: r.h, w: r.w, cut: [...r.texts, ...r.ticks].filter((x) => !(x.l >= -0.5 && x.r <= r.w + 0.5 && x.t >= -0.5)) })
    );
  }
}
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  for (const id of IDS) {
    await pick(id);
    const m = await state(),
      f = await stripFrame(),
      P = f.palette;
    legendChecks(`${lang}/${id} desktop`, f);
    const flat = f.plot.lines.find((l) => l.color === P.magenta),
      one = f.plot.lines.find((l) => l.color === P.cyan);
    check(
      `${lang}/${id} strip 1: over K = 1 … 24 the cyan ‖q_K‖² is 1 and the magenta ‖x_flat,K‖² is 1 + ⌈K/2⌉² + ⌊K/2⌋², amber at K`,
      flat.pts.length === 24 &&
        flat.pts.every(([x, y], i) => x === i + 1 && y === 1 + Math.ceil(x / 2) ** 2 + Math.floor(x / 2) ** 2) &&
        one.pts.length === 24 &&
        one.pts.every(([x, y], i) => x === i + 1 && y === 1) &&
        f.plot.lines.filter((l) => l.color === P.amber).every((l) => l.pts.every(([x]) => x === m.chain.K)) &&
        same(f.plot.dots.filter((d) => d.color === P.amber).map((d) => d.y).sort((a, b) => a - b), [1, Number(m.chain.flat2)].sort((a, b) => a - b))
    );
    const b = f.plotB,
      curve = b.lines.find((l) => l.color === P.magenta && !l.dash),
      lam = b.lines.find((l) => l.color === P.magenta && l.dash);
    // the left axis runs from its floor to 1, the right one from −0.2 to 0
    const floor = Number(b.ticks.map((x) => x.text).find((x) => /^0\.9\d*$/.test(x)));
    check(
      `${lang}/${id} strip 2: 𝒜 = p/(p + δ) on the left axis and the least Toeplitz eigenvalue on the right, both locked at δ = 0 alone, amber at δ`,
      floor === (m.prime.p === 7 ? 0.96 : floor) &&
        curve.pts.every(([x, y]) => near(y, (m.prime.p / (m.prime.p + x) - floor) / (1 - floor), 1e-9)) &&
        lam.pts.filter((_, i) => i % 10 === 0).every(([x, y]) => near(y, 1 + lambdaN(x) / 0.2, 1e-6)) &&
        near(curve.pts[0][1], 1) &&
        near(lam.pts[0][1], 1) &&
        curve.pts.slice(1).every(([, y]) => y < 1) &&
        lam.pts.slice(1).every(([, y]) => y < 1) &&
        lam.pts.every(([, y]) => y >= 0) &&
        curve.pts.every(([, y]) => y >= 0) &&
        b.lines.some((l) => l.color === P.cyan && l.pts.every(([, y]) => y === 1)) &&
        b.dots.some((d) => d.color === P.cyan && d.x === 0 && d.y === 1) &&
        b.lines.filter((l) => l.color === P.amber).every((l) => l.pts.every(([x]) => near(x, m.prime.delta, 1e-12))) &&
        b.dots.filter((d) => d.color === P.amber).length === 2,
      JSON.stringify([floor, curve.pts[0], lam.pts[0]])
    );
  }
  for (const p of PRIMES) {
    await press(`#primeChips [data-prime="${p}"]`);
    const f = await stripFrame();
    legendChecks(`${lang} p = ${p}`, f);
    check(`${lang} p = ${p}: the curve of 𝒜 stays on the plot and on its side of the floor`, f.plotB.lines.filter((l) => l.color === f.palette.magenta).every((l) => l.pts.every(([, y]) => y >= 0 && y <= 1)));
  }
}

/* ---------- narrow pages, the whole-lab embeds, cited figures and stills ---------- */
// a cited figure hides the deck, the evidence and the strips: its note names only the stage, the HUD and the tour bar
const HIDDEN_WORDS = /条带|小图|曲线|横轴|滑块|读数|左栏|右栏|旋钮|strip|plot|chart|curve\b|slider|readout|panel|dial/i;
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
  await layout(p, label + ' flat lens from the mirror button');
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
      if (lang === 'en') check('English ' + width + '/' + id, !(await cjkLeftovers(p)).length);
      if (!figure) {
        const fold = await p.evaluate(() => {
          scrollTo(0, 0);
          const b = (q) => document.querySelector(q).getBoundingClientRect();
          return { stage: b('#stage').bottom, stageH: b('#stage').height, tour: b('#tour').bottom, lens: b('#lensMirror').bottom, vh: innerHeight };
        });
        check(`${lang}/390×844/${id}: the stage (≥ 440 px) and the whole tour bar with its lens button end inside the first screen`, (await p.locator('#lensMirror').isVisible()) && fold.stageH >= 440 && fold.stage <= fold.vh && fold.tour <= fold.vh && fold.lens <= fold.vh, JSON.stringify(fold));
        legendChecks(`${lang}/390/${id}`, await stripFrame(p));
        // the fold also holds under the other lens and in free play
        await p.click('#lensMirror');
        await settle(p);
        const alt = await p.evaluate(() => [document.querySelector('#stage').getBoundingClientRect().bottom, document.querySelector('#tour').getBoundingClientRect().bottom, innerHeight]);
        check(`${lang}/390×844/${id}: the fold holds under the flat lens`, alt[0] <= alt[2] && alt[1] <= alt[2], JSON.stringify(alt));
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
          need = { struct: ['256/256', '3.1058'], beat: ['Q³ = +1', '1.0000', '7.62×10⁻⁵'], stars: ['(3/5, 4/5, 0, 0)', '4/5 = 0.8000'], chain: ['244140625', '1.0000', '73.0000'], prime: ['140/141', '0.9929', '−0.0117'] }[s.scene];
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
        ['#nRange', 3],
        ['#nRange', 24],
        ['#kRange', 24],
        ['#dRange', 17],
        ['#deltaRange', 0.2]
      ]) {
        await input(sel, v, p);
        const fold = await p.evaluate(() => {
          scrollTo(0, 0);
          return [document.querySelector('#tour').getBoundingClientRect().bottom, innerHeight];
        });
        check(`${lang}/390×844 free play ${sel} = ${v}: the tour bar stays inside the first screen`, fold[0] <= fold[1], JSON.stringify(fold));
        await layout(p, `${lang}/390 free play ${sel} = ${v}`);
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
      // every state of a cited figure: the note follows the frame and still names only what is drawn; the stage button works
      for (const [id, acts] of [
        [STRUCT, [['#now', 0], ['#now', 3], ['#now', 21]]],
        [BEAT, [['#now', 0], ['#now', 1], ['#now', 1.5], ['#now', 2]]],
        [STARS, [['#now', 0], ['#now', 8]]],
        [CHAIN, [['#now', 0], ['#now', 23]]],
        [PRIME, [['#now', 0], ['#now', 0.2]]]
      ]) {
        for (const [sel, v] of acts) {
          await pick(id, p);
          await input(sel, v, p);
          const t = await regimeTexts(p);
          check(`${lang}/${width} figure ${id} after ${sel} = ${v}: the note is true to the frame and names only what is drawn`, t.note === t.tour && t.tour.length > 10 && !HIDDEN_WORDS.test(t.tour), JSON.stringify(t));
          await layout(p, `${lang}/${width} figure ${id} ${sel} = ${v}`, true);
        }
      }
      await pick(PRIME, p);
      await p.locator('#stageAct').click();
      await settle(p);
      check(`${lang}/${width} figure: the button δ = 0 on the stage restores the exact state`, (await state(p)).prime.delta === 0 && (await state(p)).regime === 'locked');
      await pick(BEAT, p);
      await p.locator('#stageAct').click();
      check(`${lang}/${width} figure: the button on the stage takes the first beat`, await until(p, () => { const s = window.EXACT_DEBUG.state; return !s.playing && s.beat.k === 1 && s.beat.f === 0; }, null, 60000));
      await settle(p);
      await layout(p, `${lang}/${width} figure after a step`, true);
    }
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
          const s = window.EXACT_DEBUG && window.EXACT_DEBUG.state;
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
      want = { struct: ['256/256', '3.1058'], beat: ['‖Q³‖² = 1.0000', '7.62×10⁻⁵'], stars: ['25/25', '4/5 = 0.8000'], chain: ['5¹² = 244140625', '‖q₁₂‖² = 1.0000', '73.0000'], prime: ['140/141', '0.9929', '−0.0117'] }[m.scene];
    check(`still ${lang}/${id} shows the numbers of its caption`, want.every((x) => (t.big + ' ' + t.sub).includes(x)), JSON.stringify(t));
    const px = await solidPixels(p);
    check(`still ${lang}/${id}: the violet ball is opaque over ≥ 12% of the frame`, px.share >= 0.12, String(px.share));
    const tags = (await tagText(p)).join(' | ');
    const labels = { struct: ['χ(S³) = 0', 'Hopf = 1', 'δF = 0.0000 · 256/256', 'π'], beat: ['Q³ = +1', 'κ = 1/4 = 0.2500', 'g₁ = (1, 1, 1)', 'g₂ = (−1, −1, −1)', 'zdec = −0.5 + 0.8660i', '7.62×10⁻⁵', '×5000'], stars: ['Q = (3/5, 4/5, 0, 0)', 'κ = 4/5 = 0.8000', 'κ = 1/3 ≈ 0.3333', 'κ = 1/4 = 0.2500', '(1, 1, 0)', '(1, 1, 1)'], chain: ['q₁₂', 'xflat,12'], prime: ['𝒜 = 140/141', 'u(1/2 − δ)', 'u(1/2 + δ)', '‖u‖ = 1'] }[m.scene];
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
