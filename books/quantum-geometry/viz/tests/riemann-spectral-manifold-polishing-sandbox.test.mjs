import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  session,
  stageFirstChecks,
  settle,
  openStill,
  until,
  stageView,
  cjkLeftovers,
  capitalGreek,
  overflowX,
  labelOverlaps,
  viewportShare
} from '../../../../tools/node/viz-testkit.mjs';
import { ROOT, resolveBook, vizCitations } from '../../../../tools/node/viz-common.mjs';

const BOOK = 'quantum-geometry';
const ID = 'riemann-spectral-manifold-polishing-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const THEORY = 'ch39-s33-riemann-1854-1859-spectral-manifold-polishing.html#sec-ch39-riemann-1854-1859-spectral-manifold-polishing';
const PI = Math.PI;
const DEG = PI / 180;
// scene, rail parameter, the still of the rail and the parameters of the parked frame
const CARDS = {
  'riemann-1854-tangent-lantern-creases': { scene: 'lantern', param: 'n', still: 3 / 7, beta: 0, K: 0, delta: 0, y: 7, n: 6 },
  'osculating-ternion-sphere-base-swap': { scene: 'swap', param: 'beta', still: 1, beta: 1, K: 0, delta: 0, y: 7, n: 6 },
  'critical-half-toeplitz-spectral-glue': { scene: 'glue', param: 'K', still: 1, beta: 1, K: 24, delta: 0, y: 7, n: 6 },
  'counterfactual-offline-spike-breakdown': { scene: 'offline', param: 'delta', still: 0.625, beta: 1, K: 24, delta: 0.25, y: 7, n: 6 },
  'polished-isotropic-manifold-completion': { scene: 'polished', param: 'y', still: 1, beta: 1, K: 24, delta: 0, y: 10, n: 6 }
};
const IDS = Object.keys(CARDS);
const [CREASES, SWAP, GLUE, OFFLINE, POLISHED] = IDS;
const DEFAULT = POLISHED;
const GIDS = [
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq',
  'D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev',
  'D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_bounds',
  'D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_phases',
  'D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact',
  'D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness',
  'D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line',
  'D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion',
  'D5/S3/Zeros/CompletedZeta.xi_reading_eq_completed_zeta',
  'D5/S3/Zeros/CompletedZeta.xi_reading_reflection',
  'D5/S3/Weil/Mertens/IntegratedExplicit/WholeFormula.actual_integrated_explicit_formula',
  'D5/S3/Weil/Mertens/IntegratedExplicit/RHPowerThreshold.u_div_rpow_tendsto_zero_iff',
  'D5/S3/Weil/Probability/CanonicalLiCurvatureZeroFree.not_rh_forces_canonical_curvature_failure',
  'D5/S3/Weil/TestFunctions/FinitePowerSumToeplitzCircleCriterion.toeplitz_posSemidef_iff_norm_eq_one'
];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const f4 = (v) => (Math.abs(v) < 5e-5 ? 0 : v).toFixed(4);
const f2 = (v) => (Math.abs(v) < 5e-3 ? 0 : v).toFixed(2);

/* ---------- independent mathematics, written here and never calling the page ---------- */
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));
const sub = (a, b) => a.map((x, i) => x - b[i]);
const plus = (a, b) => a.map((x, i) => x + b[i]);
const scale = (a, k) => a.map((x) => x * k);
const unit = (a) => scale(a, 1 / norm(a));
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const angleOf = (a, b) => Math.atan2(norm(cross(a, b)), dot(a, b));
/* complex numbers as [re, im] */
const C = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1]],
  mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
  inv: (a) => [a[0] / (a[0] ** 2 + a[1] ** 2), -a[1] / (a[0] ** 2 + a[1] ** 2)],
  exp: (a) => [Math.exp(a[0]) * Math.cos(a[1]), Math.exp(a[0]) * Math.sin(a[1])],
  log: (a) => [Math.log(Math.hypot(a[0], a[1])), Math.atan2(a[1], a[0])],
  abs: (a) => Math.hypot(a[0], a[1])
};
C.div = (a, b) => C.mul(a, C.inv(b));
/** n^{−s}. */
const powNeg = (n, s) => C.exp([-s[0] * Math.log(n), -s[1] * Math.log(n)]);
/** ζ(s) by Euler and Maclaurin with 120 terms and nine Bernoulli corrections. */
function zeta(s) {
  const N = 120,
    B = [1 / 6, -1 / 30, 1 / 42, -1 / 30, 5 / 66, -691 / 2730, 7 / 6, -3617 / 510, 43867 / 798];
  let sum = [0, 0];
  for (let n = 1; n < N; n++) sum = C.add(sum, powNeg(n, s));
  const Ns = powNeg(N, s);
  sum = C.add(sum, C.div(scale(Ns, N), [s[0] - 1, s[1]]));
  sum = C.add(sum, scale(Ns, 0.5));
  let rising = s,
    fact = 2,
    pow = 1 / N;
  for (let j = 1; j <= B.length; j++) {
    sum = C.add(sum, scale(C.mul(rising, Ns), (B[j - 1] / fact) * pow));
    rising = C.mul(C.mul(rising, [s[0] + 2 * j - 1, s[1]]), [s[0] + 2 * j, s[1]]);
    fact *= (2 * j + 1) * (2 * j + 2);
    pow /= N * N;
  }
  return sum;
}
/** ln Γ(z) by Stirling after a shift of twelve. */
function lnGamma(z) {
  let shift = [0, 0],
    w = z;
  for (let k = 0; k < 12; k++) {
    shift = C.add(shift, C.log(w));
    w = [w[0] + 1, w[1]];
  }
  let out = C.add(C.mul([w[0] - 0.5, w[1]], C.log(w)), [-w[0] + 0.5 * Math.log(2 * PI), -w[1]]);
  const inv = C.inv(w),
    inv2 = C.mul(inv, inv);
  let p = inv;
  for (const c of [1 / 12, -1 / 360, 1 / 1260, -1 / 1680, 1 / 1188]) {
    out = C.add(out, scale(p, c));
    p = C.mul(p, inv2);
  }
  return [out[0] - shift[0], out[1] - shift[1]];
}
/** ½ s (s − 1) π^{−s/2} Γ(s/2) ζ(s). */
function xiBy(s) {
  const g = C.exp(C.add(lnGamma([s[0] / 2, s[1] / 2]), [(-s[0] / 2) * Math.log(PI), (-s[1] / 2) * Math.log(PI)]));
  return scale(C.mul(C.mul(s, [s[0] - 1, s[1]]), C.mul(g, zeta(s))), 0.5);
}
/** The Hardy function Z(t) = e^{iϑ(t)} ζ(1/2 + it), real. */
function hardy(t) {
  const th = lnGamma([0.25, t / 2])[1] - (t / 2) * Math.log(PI);
  return C.mul(C.exp([0, th]), zeta([0.5, t]))[0];
}
/** The eigenvalues of a real symmetric matrix by cyclic Jacobi rotations. */
function eigenvalues(M) {
  const n = M.length,
    A = M.map((r) => [...r]);
  for (let sweep = 0; sweep < 30; sweep++) {
    let offDiagonal = 0;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) offDiagonal += A[p][q] ** 2;
    if (offDiagonal < 1e-24) break;
    for (let p = 0; p < n; p++)
      for (let q = p + 1; q < n; q++) {
        if (Math.abs(A[p][q]) < 1e-300) continue;
        const th = (A[q][q] - A[p][p]) / (2 * A[p][q]),
          t = (th >= 0 ? 1 : -1) / (Math.abs(th) + Math.sqrt(th * th + 1)),
          c = 1 / Math.sqrt(t * t + 1),
          s = t * c;
        for (let k = 0; k < n; k++) {
          const a = A[k][p],
            b = A[k][q];
          A[k][p] = c * a - s * b;
          A[k][q] = s * a + c * b;
        }
        for (let k = 0; k < n; k++) {
          const a = A[p][k],
            b = A[q][k];
          A[p][k] = c * a - s * b;
          A[q][k] = s * a + c * b;
        }
      }
  }
  return A.map((r, i) => r[i]);
}
const leastEigenvalue = (M) => Math.min(...eigenvalues(M));
/** The four images of 1/2 ± δ ± iγ under (ρ − 1)/ρ, by complex division. */
const fourImages = (g, d) => [0.5 + d, 0.5 - d].flatMap((a) => [1, -1].map((s) => C.div([a - 1, s * g], [a, s * g])));
/** The 96 × 96 matrix [p_{j−k}] of their power sums, p_n = Σ u^n, with the powers taken by repeated multiplication. */
function toeplitz(us, size = 96) {
  const p = (n) => us.reduce((sum, u) => C.add(sum, C.exp(scale(C.log(u), n))), [0, 0]);
  const table = Array.from({ length: 2 * size - 1 }, (_, i) => p(i - size + 1));
  return { M: Array.from({ length: size }, (_, j) => Array.from({ length: size }, (_, k) => table[j - k + size - 1][0])), imag: Math.max(...table.map((z) => Math.abs(z[1]))), table };
}
/** The area of the Schwarz lantern as a sum of triangle areas, and the tilt of its normals from the radius. */
function lanternByTriangles(n, m) {
  const ring = (j) => Array.from({ length: n }, (_, i) => [Math.cos((2 * PI * (i + (j % 2) / 2)) / n), Math.sin((2 * PI * (i + (j % 2) / 2)) / n), j / m]);
  let area = 0,
    tilt = 0;
  const add = (a, b, c) => {
    const nn = cross(sub(b, a), sub(c, a)),
      mid = scale(plus(plus(a, b), c), 1 / 3),
      rad = unit([mid[0], mid[1], 0]);
    area += norm(nn) / 2;
    tilt = Math.max(tilt, Math.acos(Math.min(1, Math.abs(dot(unit(nn), rad)))));
  };
  for (let j = 0; j < m; j++) {
    const a = ring(j),
      b = ring(j + 1);
    for (let i = 0; i < n; i++) {
      const i1 = (i + 1) % n;
      if (j % 2 === 0) {
        add(a[i], a[i1], b[i]);
        add(a[i1], b[i1], b[i]);
      } else {
        add(a[i], a[i1], b[i1]);
        add(a[i], b[i1], b[i]);
      }
    }
  }
  return { ratio: area / (2 * PI), tilt: tilt / DEG };
}
/** r(d) of the plate surface at the blend β, from the twelve points of tangency. */
const plateRadius = (sites, beta) => (d) => (1 - beta) / Math.max(...sites.map((p) => dot(d, p))) + beta;
/** The jump of the normal across the seam of two neighbouring plates, at its middle, by finite differences. */
function jumpBy(sites, beta) {
  const r = plateRadius(sites, beta),
    a = sites[0],
    b = sites.find((p) => dot(p, a) > 0.4 && dot(p, a) < 0.9),
    mid = unit(plus(a, b)),
    across = unit(sub(b, a)),
    h = 1e-5,
    at = (t) => {
      const d = plus(scale(mid, Math.cos(t)), scale(across, Math.sin(t)));
      return scale(d, r(d));
    };
  return angleOf(sub(at(0), at(-h)), sub(at(h), at(0))) / DEG;
}
/** The angle defect of a corner: 2π minus the angle of its tangent cone, measured on a tiny circle around it. */
function defectBy(sites, corner, beta) {
  const r = plateRadius(sites, beta),
    d0 = unit(corner),
    apex = scale(d0, r(d0)),
    e1 = unit(cross(d0, Math.abs(d0[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])),
    e2 = cross(d0, e1),
    N = 6000,
    ray = (i) => {
      const a = (2 * PI * i) / N,
        d = unit(plus(d0, scale(plus(scale(e1, Math.cos(a)), scale(e2, Math.sin(a))), 1e-6)));
      return unit(sub(scale(d, r(d)), apex));
    };
  let total = 0;
  for (let i = 0; i < N; i++) total += angleOf(ray(i), ray(i + 1));
  return (2 * PI - total) / DEG;
}
const isPrime = (n) => {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
};
const PRIMES = Array.from({ length: 22027 }, (_, n) => n).filter(isPrime);
const EULER = 0.5772156649015329;
/** U(t) = t Σ_{n≤t} Λ(n)/n − ψ(t) − t ln t + (1 + γ) t, from the prime powers. */
function mangoldtU(t) {
  let over = 0,
    psi = 0;
  for (const p of PRIMES) {
    if (p > t) break;
    for (let q = p; q <= t; q *= p) {
      over += Math.log(p) / q;
      psi += Math.log(p);
    }
  }
  return t * over - psi - t * Math.log(t) + (1 + EULER) * t;
}
/** ∫_2^x dt/ln t by Simpson on ln t. */
function Li(x) {
  if (x <= 2) return 0;
  const a = Math.log(2),
    b = Math.log(x),
    N = 4000,
    h = (b - a) / N;
  let s = 0;
  for (let i = 0; i <= N; i++) s += (i === 0 || i === N ? 1 : i % 2 ? 4 : 2) * (Math.exp(a + i * h) / (a + i * h));
  return (s * h) / 3;
}
const rank2 = (rows) => {
  const R = rows.map((r) => [...r]);
  let rank = 0;
  for (let c = 0; c < R[0].length; c++) {
    const k = R.findIndex((r, i) => i >= rank && r[c]);
    if (k < 0) continue;
    [R[rank], R[k]] = [R[k], R[rank]];
    for (let i = 0; i < R.length; i++) if (i !== rank && R[i][c]) R[i] = R[i].map((x, j) => x ^ R[rank][j]);
    rank++;
  }
  return rank;
};

/** The crease of the plate surface r = (1 − β)/⟨u, p⟩ + β by its gradient: jump and defect (degrees) and drift of a corner. */
function creaseN(beta) {
  const c = Math.sqrt((1 + 1 / Math.sqrt(5)) / 2), // cos of half the angle between two points of tangency
    sinus = Math.sqrt(1 - c * c),
    jump = 2 * Math.atan(((1 - beta) * sinus) / (c * c) / ((1 - beta) / c + beta));
  // three points of tangency around the corner direction d = (0, 0, 1)
  const w = Math.sqrt((1 + 2 / Math.sqrt(5)) / 3),
    R = (1 - beta) / w + beta,
    d = [0, 0, 1],
    normals = [0, 120, 240].map((a) => {
      const p = [Math.sqrt(1 - w * w) * Math.cos(a * DEG), Math.sqrt(1 - w * w) * Math.sin(a * DEG), w];
      return plus(scale(d, R), scale(sub(p, scale(d, w)), (1 - beta) / (w * w)));
    }),
    edge = (a, b) => unit(cross(normals[a], normals[b]));
  // the three edges leave the corner in the directions opposite to these, so their angles are the angles of the faces
  const turn = 2 * PI - 3 * angleOf(edge(0, 1), edge(2, 0));
  return { jump: beta === 1 ? 0 : jump / DEG, defect: beta === 1 ? 0 : turn / DEG, drift: (1 - beta) * (1 / w - 1) };
}

/* ---------- exact numbers, written here: fractions [p, q] of integers, and what a printed decimal says ---------- */
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const gcdN = (a, b) => (b ? gcdN(b, a % b) : a < 0n ? -a : a);
const fracN = (p, q = 1n) => {
  const g = gcdN(p, q) * (q < 0n ? -1n : 1n);
  return [p / g, q / g];
};
const [addN, subN, mulN] = [([a, b], [c, d]) => fracN(a * d + c * b, b * d), ([a, b], [c, d]) => fracN(a * d - c * b, b * d), ([a, b], [c, d]) => fracN(a * c, b * d)];
const cmpN = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
const numN = ([p, q]) => Number((p * 10n ** 40n) / q) / 1e40;
const intN = (n) => [BigInt(n), 1n];
const HALF = [1n, 2n];
/** The double x itself. */
function doubleN(x) {
  let q = 1n;
  while (!Number.isInteger(x)) {
    x *= 2;
    q *= 2n;
  }
  return fracN(BigInt(x), q);
}
/** A parameter on a grid of 1/100: the decimal its double stands for; any other double is itself. */
const centN = (x) => (Math.round(x * 100) / 100 === x ? fracN(BigInt(Math.round(x * 100)), 100n) : doubleN(x));
const expOf = (e) => Number(e.replace('⁻', '-').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (d) => SUP.indexOf(d)));
const tenN = (e) => (e < 0 ? [1n, 10n ** BigInt(-e)] : [10n ** BigInt(e), 1n]);
/** The decimal a printed text names: 0.0205, −6.429×10⁻⁸. */
function decimalN(x) {
  const [m, e = '⁰'] = x.replace('−', '-').split('×10'),
    [whole, part = ''] = m.split('.');
  return mulN([BigInt(whole + part), 1n], tenN(expOf(e) - part.length));
}
const SCI = '\\d\\.\\d{3}×10⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+';
const VALUE = `(?:(?:1/2|1) [−+] ${SCI}|−?${SCI}|−?\\d+\\.\\d+)`;
/** What is wrong with the relation `sign printed` of a value: q the value as a fraction (null: irrational), x the value as a
    double, off: x − 1 to full accuracy, unit: '°', '%' or ''; '' when it is right. “=” is written exactly when the printed decimal
    is the value; a rounding is within half a unit of the last digit; a value that is not 0, 1/2 or 1 is never printed as one. */
function wrongRelation(sign, printed, q, x, off = {}, unit = '') {
  const tail = /^(1\/2|1) ([−+]) (.*)$/.exec(printed);
  if (tail) {
    const L = tail[1] === '1' ? 1 : 0.5,
      d = q ? numN(subN(q, doubleN(L))) : L in off ? off[L] : x - L,
      said = (tail[2] === '−' ? -1 : 1) * numN(decimalN(tail[3]));
    if (sign !== '≈') return 'a tail with =';
    if (Math.abs(d) > 6e-3) return 'a tail of a value far from its landmark';
    return Math.abs(said - d) <= 6e-4 * Math.abs(d) ? '' : `tail ${d}`;
  }
  const v = decimalN(printed);
  if (printed.includes('×10')) return sign === '=' || Math.abs(numN(v) - x) > 6e-4 * Math.abs(x) ? `digits ${x}` : '';
  if ((sign === '=') !== (!!q && cmpN(q, v) === 0)) return `exactness of ${q ? q.join('/') : x}`;
  if (sign === '≈' && (unit ? [0] : [0, 0.5, 1]).includes(numN(v)) && (!q || cmpN(q, v) !== 0)) return 'a landmark printed of another value';
  const half = 0.5 * 10 ** -(printed.split('.')[1] || '').length;
  return Math.abs(numN(v) - (q ? numN(q) : x)) <= half * (1 + 1e-9) + 1e-11 ? '' : `rounding of ${x}`;
}
/** The least power of ten above a drift, as printed; “= 0” of 0 alone. */
function belowText(x) {
  if (x === 0) return '= 0';
  let e = 0;
  while (cmpN(doubleN(x), tenN(e - 1)) < 0) e--;
  while (cmpN(doubleN(x), tenN(e)) >= 0) e++;
  return `< 10${e < 0 ? '⁻' : ''}${String(Math.abs(e)).replace(/\d/g, (d) => SUP[d])}`;
}
/** Four significant digits with a power of ten. */
const sciN = (x) => {
  const [m, e] = x.toExponential(3).split('e');
  return `${m.replace('-', '−')}×10${Number(e) < 0 ? '⁻' : ''}${String(Math.abs(Number(e))).replace(/\d/g, (d) => SUP[d])}`;
};
/** A value as the page must print it: q its fraction or null, x its double, d decimals. */
function said(q, x, d = 4) {
  if (q) {
    const a = (q[0] < 0n ? -q[0] : q[0]) * 10n ** BigInt(d);
    if (a % q[1] === 0n) {
      const t = String(a / q[1]).padStart(d + 1, '0');
      return `= ${q[0] < 0n ? '−' : ''}${t.slice(0, -d)}.${t.slice(-d)}`;
    }
  }
  const t = (q ? numN(q) : x).toFixed(d).replace('-', '−');
  if (Number(t.replace('−', '-')) === 0) return `≈ ${sciN(x)}`;
  for (const [L, name] of [[0.5, '1/2'], [1, '1']]) if (Number(t) === L) return `≈ ${name} ${x < L ? '−' : '+'} ${sciN(Math.abs(x - L))}`;
  return `≈ ${t}`;
}
const saidTiny = (x) => (Math.abs(x) < 5e-4 ? `≈ ${sciN(x)}` : said(null, x));
/* Digits that round a value to the nearest are no side of an inequality, whatever stands on its other side. Nothing is exempt:
   no name, no index and no area of the page is taken out before the search. A decimal that does stand beside a sign is the value
   itself, behind its own “=”. */
const SIGN = '[<>≤≥≪≫＜＞≦≧]';
/** The clauses of a text: what stands between two separators, every parenthesis read as a clause of its own. */
function clauses(text) {
  let x = text.replace(/\s+/g, ' ');
  const out = [];
  for (let m; (m = /[(（]([^()（）]*)[)）]/.exec(x)); ) {
    out.push(m[1]);
    x = `${x.slice(0, m.index)}◦${x.slice(m.index + m[0].length)}`;
  }
  return [...out, x].flatMap((y) => y.split(/[，；。、,;:：¶]| · | ↔ | → | \/ |\.(?=\s|$)/)).map((y) => y.trim());
}
const MIXED = new RegExp(`≈.*${SIGN}|${SIGN}.*≈`);
/** A rounded value right beside an inequality sign, read through every parenthesis and separator but a comma, a stop or a dot. */
const BESIDE = new RegExp(`≈ ?[^，；。、,;:：·¶≈=]*?${SIGN} ?[−\\d|‖φκα√e]|${SIGN} ?≈`, 'g');
/** A decimal right beside an inequality sign, unless it is exact and stands behind its “=”. */
const DECIMAL = new RegExp(`(?<![\\d.])(?<!= ?−?)\\d+\\.\\d+[°%]? ?${SIGN}|${SIGN} ?−?\\d+\\.\\d`, 'g');
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
// The lab is a permanent night console: record every attempt to write the palette switch, from before page scripts run.
const paletteMutations = [],
  paletteDocuments = [];
async function watchPalette(context) {
  await context.exposeBinding('__polishPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__polishPaletteAudit({ kind: 'mutation', value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener(
      'DOMContentLoaded',
      () =>
        window
          .__polishPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined, dark: matchMedia('(prefers-color-scheme: dark)').matches })
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
// and the lit-solid checks of kit.solid (opaque share, shading, turning, a hidden mark behind the ball, resting)
const gate = [];
T.check = (name, ok, detail) => {
  gate.push([name, !!ok]);
  return check(name, ok, detail);
};
await stageFirstChecks(T, BOOK, ID, { solid: true });
T.check = check;
{
  const ran = (re) => gate.some(([name]) => re.test(name));
  const esc = (x) => x.replace(/[-/]/g, '\\$&');
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

/* ---------- sources, registry, dependencies and citations ---------- */
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
  check(`source ${file}: no possessive ’s (the runtime splits it)`, !/[A-Za-z][’']s\b/.test(src));
}
check('reserved identifiers are absent from the suite and registry entry', [suite, entryText].every((src) => !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src) && !hangul.test(src)));
check(
  'registration: §31.6, live, five cards and the fifteen GIDs in order',
  !!entry &&
    entry.chapter === 31 &&
    entry.section === '31.6' &&
    entry.status === 'live' &&
    entry.added === '2026-11-22' &&
    entry.code === 'OMEGA//POLISH' &&
    entry.capture_lock === 'links' &&
    entry.title === '黎曼 1854 + 1859 双璧合龙沙盘：以已证 1/2 临界线谱磨光切板黎曼流形' &&
    entry.title_en === 'Riemann 1854 + 1859 Synthesis: Polishing Tangent-Plate Manifolds via the Proven 1/2 Critical-Line Spectrum' &&
    same(entry.presets, Object.keys(CARDS)) &&
    same(Object.keys(entry.preset_titles), Object.keys(CARDS)) &&
    same(entry.lean.map((x) => x.gid), GIDS) &&
    same(entry.theory, [
      {
        label: '§31.6 · 黎曼 1854+1859 双璧合龙与临界线谱磨光流形',
        label_en: "§31.6 · Riemann's 1854 + 1859 Synthesis and Critical-Line Spectral Manifold Polishing",
        href: '../zh/' + THEORY,
        href_en: '../en/' + THEORY
      }
    ])
);
check(
  'registration: the card titles of the registry are the card names of the page',
  !!entry &&
    Object.keys(CARDS).every((id) => {
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
check('the suite reads no chapter text and looks up no other suite', !/readFileSync\([^)]*\.md/.test(suite) && (suite.match(/deps\.suites\[/g) || []).length === 1);
check(
  'the page loads exactly the shared theme, its own style sheet, the shell, the kit and main.js',
  same([...sources['index.html'].matchAll(/<(?:script src|link rel="stylesheet" href)="([^"]+)"/g)].map((m) => m[1]).filter((u) => !u.startsWith('https://fonts.')), ['../assets/theme.css', 'style.css', '../assets/shell.js', '../assets/kit.js', 'main.js'])
);

/* ---------- static text: pure green boxes, no written numbers, no mixed inequality ---------- */
const plain = (html) => html.replace(/<[^>]*>/g, '').replaceAll('&gt;', '>').replaceAll('&lt;', '<').replaceAll('&amp;', '&').replace(/\s+/g, ' ');
const BOXES = [...sources['index.html'].matchAll(/<div class="lean( [a-z]+)?">(.*?)<\/div>/g)].map((m) => ({
  kind: (m[1] || '').trim(),
  gid: (/data-lean-gid="([^"]+)"/.exec(m[2]) || [])[1] || null,
  zh: plain((/<span class="zh">(.*?)<\/span><span class="en">/.exec(m[2]) || ['', ''])[1]),
  en: plain((/<span class="en">(.*?)<\/span>(?=<a data-lean-gid| <a href|<\/span>$)/.exec(m[2]) || ['', ''])[1])
}));
const GREEN = BOXES.filter((b) => !b.kind);
check('the panel holds fifteen green boxes in the order of the theorem box, then ARGUED twice, OPEN, MODEL and NUM', same(GREEN.map((b) => b.gid), GIDS) && same(BOXES.slice(15).map((b) => b.kind), ['argued', 'argued', 'open', 'model', 'num']) && BOXES.length === 20);
// a green box says what the frozen theorem says: no instance of the page, no computed number, no rounding, no drift, no remark
const INSTANCE = /页面|本页|舞台|探针|滑块|取样点|偏差|余量|数值|演示|这里的|相差|实例|手工推导|不检验|不断言|切点|外部|Alpöge|this page|the page|on the page|stage|probe|slider|\bgap\b|drift|residue|instance|numerical|computes|differ by|derived by hand|hand derivation|asserts|points of tangency|≈|\d\.\d|10⁻|γ₁|δ = 0|整系数|整数系数|integer.coefficient|integer coefficient/i;
check('green boxes: no instance, number, rounding, drift or remark of the page in any of the fifteen, in either language', GREEN.every((b) => b.zh.length > 30 && b.en.length > 30 && !INSTANCE.test(b.zh) && !INSTANCE.test(b.en)), GREEN.filter((b) => INSTANCE.test(b.zh) || INSTANCE.test(b.en)).map((b) => b.gid + ' ' + (INSTANCE.exec(b.zh) || INSTANCE.exec(b.en))[0]).join(' | '));
check('green boxes: no mixed inequality', GREEN.every((b) => !mixed(b.zh).length && !mixed(b.en).length));
check('RH and GRH stand in the ARGUED box alone, without a green badge; OPEN holds one box', GREEN.every((b) => !/Alpöge|DirichletLZerosOnLine/.test(b.zh + b.en)) && BOXES.filter((b) => b.kind === 'argued' && /Alpöge/.test(b.zh) && /Alpöge/.test(b.en) && !b.gid).length === 1 && BOXES.filter((b) => b.kind === 'open').length === 1 && BOXES.every((b) => !b.kind || !b.gid));
// the spans of computed numbers: name by name, the two languages of the cards and the view note, of the MODEL box and of the drawer
const SPANS = {
  rail: ['offset', 'ghost', 'ghost'],
  model: ['seam', 'turn', 'ring', 'zoom', 'classR', 'classLift', 'classLift'],
  drawer: ['jump', 'defect', 'n', 'ratio', 'limit', 'tilt', 'turn', 'zoom', 'lam0', 'offset', 'out', 'inn', 'lam', 'from', 'to', 'env', 'offset', 'meet0', 'meet1', 'ghost']
};
{
  const html = sources['index.html'],
    body = html.slice(html.indexOf('<body')),
    tag = /<div class="lean num"><span class="ok">NUM<\/span><span><span class="zh">—<\/span><span class="en">—<\/span><\/span><\/div>/g,
    spans = [...html.matchAll(/<span data-bench="([a-zA-Z0-9]+)">(.*?)<\/span>/g)].map((m) => [m[1], m[2]]);
  check('index.html: the NUM box is empty until the script fills it', (html.match(tag) || []).length === 1);
  check(
    'index.html: the numbers of the cards, of the drawer and of the MODEL box are empty spans, the same names in both languages',
    same(spans.map((x) => x[0]), [...SPANS.rail, ...SPANS.model, ...SPANS.model, ...SPANS.drawer, ...SPANS.drawer]) && spans.every((x) => x[1] === '—'),
    JSON.stringify(spans.map((x) => x[0]))
  );
  const text = plain(body.replace(/<button class="chip" data-speed[^>]*>[^<]*<\/button>/g, '')),
    decimals = [...text.matchAll(/(?<![§\d.])\d+\.\d+/g)].map((m) => m[0]),
    attributes = [...body.matchAll(/(?:aria-label|data-aria-en)="([^"]*)"/g)].map((m) => m[1]);
  check('index.html: no decimal is written anywhere in the page text, the cards, the evidence or the drawer', !decimals.length, decimals.join(' '));
  check('index.html: no decimal and no “≈” in a label read aloud', attributes.length > 10 && attributes.every((x) => !/\d\.\d|≈/.test(x)));
  check('index.html: no decimal, no “≈” and no mixed inequality in the description', [(/<meta name="description" content="([^"]*)"/.exec(html) || ['', '≈ 0.5 > 0'])[1]].every((d) => d.length > 100 && !/\d\.\d|≈/.test(d) && !mixed(plain(d)).length));
  check('index.html: no “≈” is written: every rounding comes from the script', !html.includes('≈'));
  check('index.html: the outputs of the sliders are empty until the script writes them', ['betaOut', 'modesOut', 'deltaOut'].every((id) => new RegExp(`id="${id}">—</output>`).test(html)));
  const said0 = mixed(plain(body));
  check('index.html: no rounded digits beside an inequality sign', !said0.length, said0.slice(0, 3).join(' | '));
  const js = sources['main.js'],
    code = js.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, ''),
    bare = code.replace(/<\/?(?:strong|sub|sup|span|i|b)\b[^<>]*>/g, ''),
    // decimals of a printed length (2, 4 or 8 places) after a relation sign or before a degree or percent sign, and powers of ten
    written = [...code.matchAll(/[=≈] ?[×−]?\d+\.(?:\d{2}|\d{4}|\d{8})(?!\d)(?=[^\n]*[`'])|\d\.\d+[°%]|10⁻[⁰¹²³⁴⁵⁶⁷⁸⁹]/g)].map((m) => m[0]);
  check('main.js: no computed result is written into a sentence', !written.length, written.join(' '));
  const chained = [...bare.matchAll(/\$\{[^{}]*(?:Rel|rel|num)\([^{}]*\)\}[°%]? ?(?:&lt;|&gt;|[<>≤≥])|(?:&lt;|&gt;|[<>≤≥]) ?\$\{[^{}]*(?:Rel|rel|num)\(/g)].map((m) => m[0]);
  // (at δ = 0 the least eigenvalue is 0 itself, and “= 0.0000 ≥ 0” is said of nothing else)
  check('main.js: the only relation that meets an inequality sign is the exact least eigenvalue at δ = 0', chained.length === 10 && chained.every((x) => x === '${lamRel(m)} ≥'), chained.join(' | '));
  check(
    'main.js: the NUM box and the spans are filled before the evidence is copied into the drawer',
    js.indexOf('const BENCH = benchmarks();') > 0 && js.indexOf('document.querySelector(`#basis .lean.num .${lang}`).innerHTML = numText(say)') > js.indexOf('const BENCH = benchmarks();') && js.indexOf("$('drawerEvidence').append(") > js.indexOf('el.innerHTML = NUMBERS[el.dataset.bench]()')
  );
  check('main.js: one formatter writes every relation (no “= ${fmt(” or toFixed in a sentence)', !/[=≈] ?\$\{fmt\(/.test(js) && (js.match(/\.toFixed\(/g) || []).length === 1 && js.includes('xFmt: (v) => v.toFixed(1)') && js.includes('function rel(q, x, d = 4, off = {}, marks = LANDMARKS)'));
}
{
  // the detectors find what they must and leave the separated forms: the negative control of every later scan
  const bad = ['‖u+‖ ≈ 1.0013 > 1', '‖u+‖ = 1.0013 · ≈ 1.0013 > 1 > ≈ 0.9988', '1 < ‖u+‖ ≈ 1.0013', 'λmin ≈ −0.2932 < 0', '≈ 0.0200 ≤ ≈ 0.4346', '差 ≈ 0.0200 ≤ 余下的质量', '≈ 0.0005 ≤ ≈ 0.0805', '≈ 63.43° > 0', '> ≈ 0.5', '2.0000 > 1', '0 ≤ 0.0046', '（‖u+‖ ≈ 1.0013 > 1）', '≈ 1.0013 (δ = 0.25) > 1', 'η ≈ 0.0079 ≥ 0'],
    good = ['‖u+‖ > 1 > ‖u−‖（值 ≈ 1.0013、≈ 0.9988），λmin < 0（值 ≈ −0.2932）；棱角高 Xδ−1/2 ≈ 0.1738。', '‖u+‖ > 1 > ‖u−‖ (values ≈ 1.0013, ≈ 0.9988), λmin < 0 (value ≈ −0.2932); spikes', 'λmin = 0.0000 ≥ 0', '两者之差 ≤ 余下质量乘 X1/2（值 ≈ 0.0200、≈ 0.4346）', 'κ 与 1 − 弦长²/4 的浮点偏差 < 10⁻¹⁵，相邻两点 κ ≈ 0.7236', 'δ = 0.25 · λmin < 0', 'U(X)/Xθ → 0 ⇔ θ > 1/2'];
  check('the detector finds fourteen rounded digits beside an inequality sign, without exception, and leaves seven separated texts', bad.every((x) => mixed(x).length > 0) && good.every((x) => !mixed(x).length), JSON.stringify([bad.filter((x) => !mixed(x).length), good.filter((x) => mixed(x).length)]));
}
{
  // the chapter embeds, in both languages, the five cards in order and then the whole lab
  const cited = vizCitations(resolveBook(BOOK), ID),
    want = [...Object.keys(CARDS), null];
  for (const lang of ['zh', 'en']) {
    const seq = cited.filter((c) => c.lang === lang).map((c) => c.preset || null);
    check(`${lang} chapter: the five cards in order, then the whole lab`, same([...new Set(seq)], want), JSON.stringify(seq));
  }
}

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.RIEMANN_POLISH_DEBUG.state);
const calcAt = (args) => page.evaluate((a) => window.RIEMANN_POLISH_DEBUG.calc(...a), args);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => {
    el.value = String(v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
  await settle(p);
}
const seek = (t, p = page) => input('#now', t, p);
/** Click a card and wait until it has played up to its still and parked there. */
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  await settle(p);
  const parked = await until(
    p,
    ([id, still]) => {
      const s = window.RIEMANN_POLISH_DEBUG.state;
      return s.preset === id && !s.blending && !s.playing && Math.abs(s.t - still) < 1e-9;
    },
    [card, CARDS[card].still],
    150000
  );
  await settle(p);
  return parked;
}
async function setLang(lang, p = page) {
  await p.click(`[data-lang-set="${lang}"]`);
  await settle(p);
}
const textOf = async (id, p = page) => (await p.locator('#' + id).innerText()).replaceAll('−', '-').replace(/\s+/g, ' ');
const tagText = (p = page) => p.locator('.stage .tags .tag:not([hidden])').allInnerTexts();
async function layout(p, label, figure = false) {
  const view = await stageView(p, '#stage', figure);
  const issues = [...view.layout, ...view.hud, ...(await labelOverlaps(p, '.stage .tag', 0)), ...(await capitalGreek(p))];
  check(label + ' framing and legible labels', !issues.length && (await overflowX(p)) === 0, JSON.stringify(issues));
}
/** Every colour a primitive of the next frame is drawn in. */
const primitiveColours = (p = page) =>
  p.evaluate(() => {
    const sc = window.TRV.solids[0],
      seen = [],
      names = ['surface', 'tube', 'line', 'circle', 'arrow', 'bead', 'ring', 'fan', 'poly', 'glass'],
      at = { surface: 2, tube: 2, poly: 2, circle: 3, glass: 3, line: 1, bead: 1, ring: 1, fan: 1, arrow: 2 },
      saved = {};
    for (const n of names) {
      saved[n] = sc[n];
      sc[n] = (...a) => {
        const s = a[at[n]] || {};
        seen.push({ n, key: String(['surface', 'tube', 'poly', 'glass'].includes(n) ? a[0] : s.key || n), width: s.width, colors: [s.color, s.fill, s.edges, ...(s.colors || [])].filter(Boolean) });
        return saved[n](...a);
      };
    }
    try {
      window.TRV.kit.flush();
    } finally {
      for (const n of names) sc[n] = saved[n];
    }
    const { violet, cyan, magenta, amber, stage, warn, ok } = window.TRV.palette;
    return { seen, violet, cyan, magenta, amber, stage, warn, ok };
  });

/* ---------- 1859: the zeros, the Cayley images and the Toeplitz form ---------- */
await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const GAMMA = await page.evaluate(() => window.RIEMANN_POLISH_DEBUG.gamma);
check('the 24 ordinates are zeros of ζ on the line (Euler–Maclaurin)', GAMMA.length === 24 && GAMMA.every((g) => C.abs(zeta([0.5, g])) < 1e-9), JSON.stringify(GAMMA.map((g) => C.abs(zeta([0.5, g])).toExponential(1))));
{
  let changes = 0,
    prev = hardy(1);
  for (let t = 1.05; t < 88; t += 0.05) {
    const z = hardy(t);
    if (z * prev < 0) changes++;
    prev = z;
  }
  check('no zero of ζ(1/2 + it) below t = 88 is missing from the table (sign changes of the Hardy function)', changes === 24, String(changes));
}
{
  const rows = await page.evaluate(() => [1, 2, 7, 24].flatMap((k) => [0, 0.01, 0.1, 0.25, 0.4].map((d) => ({ k, d, im: window.RIEMANN_POLISH_DEBUG.images(k, d), lambda: window.RIEMANN_POLISH_DEBUG.lambda(k, d) }))));
  const bad = rows.filter(({ k, d, im }) => {
    const [a, , b] = fourImages(GAMMA[k - 1], d);
    return !near(im.inn, C.abs(a), 1e-13) || !near(im.out, C.abs(b), 1e-13) || !near(im.theta, Math.atan2(a[1], a[0]), 1e-12) || !near(im.out * im.inn, 1, 1e-13) || !(d > 0 ? im.out > 1 && im.inn < 1 : im.out === 1 && im.inn === 1);
  });
  check('Cayley images: u₋ from 1/2 + δ, u₊ = 1/conj u₋ from 1/2 − δ, on the circle exactly at δ = 0', !bad.length, JSON.stringify(bad[0]));
  for (const { k, d, lambda } of rows) {
    const t = toeplitz(fourImages(GAMMA[k - 1], d)),
      least = leastEigenvalue(t.M);
    check(`Toeplitz λ_min of pair ${k} at δ = ${d} against a dense Jacobi eigenvalue`, near(lambda, least, 1e-10) && t.imag < 1e-11 && (d > 0 ? lambda < 0 : lambda === 0), `${lambda} | ${least}`);
  }
  for (const [d, rank] of [
    [0, 2],
    [0.25, 4],
    [0.4, 4]
  ]) {
    const m = await calcAt([1, 24, d]),
      ev = eigenvalues(toeplitz(fourImages(GAMMA[0], d)).M);
    check(`Toeplitz form of the first pair at δ = ${d}: rank ${rank}, as many eigenvalues away from 0, as many distinct images`, m.rank === rank && m.leanInstances.toeplitz.values === rank && ev.filter((x) => Math.abs(x) > 1e-3).length === rank && ev.filter((x) => Math.abs(x) < 1e-9).length === 96 - rank, JSON.stringify([m.rank, m.leanInstances.toeplitz.values]));
  }
  const sweep = await page.evaluate(() => Array.from({ length: 24 }, (_, k) => Array.from({ length: 41 }, (_, i) => window.RIEMANN_POLISH_DEBUG.lambda(k + 1, i / 100))));
  check('λ_min is 0 only at δ = 0 and strictly decreasing in δ, for each of the 24 pairs', sweep.every((r) => r[0] === 0 && r.every((v, i) => i === 0 || v < r[i - 1])));
  check('the first pair has the least eigenvalue of all 24 at every δ > 0', sweep[0].every((v, i) => sweep.every((r) => v <= r[i])));
  check('λ_min of the first pair: −0.2932 at δ = 0.25 and −0.7502 at δ = 0.40', f4(sweep[0][25]) === '-0.2932' && f4(sweep[0][40]) === '-0.7502');
  // the family is closed under z ↦ 1/conj z and N + 1 = 96 is at least its four distinct values (theorem premises)
  const us = fourImages(GAMMA[0], 0.25);
  check('theorem premises: four distinct nonzero images, closed under z ↦ 1/conj z', us.every((u) => C.abs(u) > 0 && us.some((v) => C.abs(C.add(v, scale(C.inv([u[0], -u[1]]), -1))) < 1e-13)) && new Set(us.map((u) => u.map((x) => x.toFixed(9)).join())).size === 4);
}

/* ---------- 1854: plates, corners and the lantern ---------- */
const SITES = await page.evaluate(() => window.RIEMANN_POLISH_DEBUG.sites);
const CORNERS = await page.evaluate(() => window.RIEMANN_POLISH_DEBUG.corners);
check(
  'the 12 points of tangency are the vertices of a regular icosahedron; 20 corners lie on three tangent planes each',
  SITES.length === 12 &&
    SITES.every((p) => near(norm(p), 1, 1e-12) && SITES.filter((q) => near(dot(p, q), 1 / Math.sqrt(5), 1e-12)).length === 5) &&
    CORNERS.length === 20 &&
    CORNERS.every((c) => SITES.filter((p) => near(dot(c.at, p), 1, 1e-12)).length === 3 && SITES.every((p) => dot(c.at, p) < 1 + 1e-9))
);
for (const beta of [0, 0.25, 0.5, 0.8, 1]) {
  const m = await calcAt([beta, 0, 0]);
  const jump = jumpBy(SITES, beta),
    defect = defectBy(SITES, CORNERS[3].at, beta),
    r = plateRadius(SITES, beta)(unit(CORNERS[7].at));
  check(
    `plates at β = ${beta}: normal jump, corner defect and drift against finite differences, a measured cone angle and the gradient of the surface`,
    near(m.crease.jump, jump, 2e-3) && near(m.crease.defect, defect, 2e-3) && ['jump', 'defect', 'drift'].every((k) => near(m.crease[k], creaseN(beta)[k], 1e-9)) && near(m.crease.drift, r - 1, 1e-12) && near(m.crease.defectSum, (20 * defect) / 720, 1e-3),
    JSON.stringify({ page: m.crease, jump, defect })
  );
}
{
  const m = await calcAt([0, 0, 0]);
  check('β = 0: jump 63.43°, defect 36.00°, drift 0.2584 and total defect 4π; β = 1: all zero', f2(m.crease.jump) === '63.43' && f2(m.crease.defect) === '36.00' && f4(m.crease.drift) === '0.2584' && near(m.crease.defectSum, 1, 1e-12) && same((await calcAt([1, 0, 0])).crease, { jump: 0, defect: 0, defectSum: 0, drift: 0 }));
}
for (const n of [3, 4, 6, 8, 10]) {
  const m = await calcAt([0, 0, 0, 7, n]),
    own = lanternByTriangles(n, n * n);
  check(`lantern n = ${n}, m = ${n * n}: the area ratio and the tilt against the sum over its triangles`, near(m.lantern.ratio, own.ratio, 1e-9) && near(m.lantern.tilt, own.tilt, 1e-6) && m.lantern.ratio < Math.sqrt(1 + PI ** 4 / 4), JSON.stringify([m.lantern, own]));
}
check('lantern limits √(1 + π⁴/4) = 5.0351 and 78.54°, and the m = n lantern tends to the cylinder', f4(Math.sqrt(1 + PI ** 4 / 4)) === '5.0351' && f2(Math.atan(PI ** 2 / 2) / DEG) === '78.54' && near(lanternByTriangles(200, 200).ratio, 1, 1e-2) && f4(lanternByTriangles(6, 6).ratio) === '1.2252');

/* ---------- the residuals, the explicit formula and the prime channels ---------- */
{
  const w = GAMMA.map((g) => 1 / (0.25 + g * g)),
    all = w.reduce((s, x) => s + x, 0);
  let ok = true,
    prev = 2;
  for (let K = 0; K <= 24; K++) {
    const m = await calcAt([1, K, 0]),
      eta = 1 - w.slice(0, K).reduce((s, x) => s + x, 0) / all;
    ok = ok && near(m.eta, eta, 1e-12) && m.eta < prev && m.lambda === 0 && m.offCircle === 0;
    prev = m.eta;
  }
  check('seam residual η_K = 1 − S_K/S_24 falls from 1 to 0; at δ = 0 λ_min = 0 and no drift for every K', ok && (await calcAt([1, 0, 0])).eta === 1 && (await calcAt([1, 24, 0])).eta === 0);
}
for (const [delta, y] of [
  [0, 7],
  [0.25, 7],
  [0.4, 1],
  [0.1, 10]
]) {
  const m = await calcAt([1, 24, delta, y]);
  check(`X^{δ−1/2} at δ = ${delta}, ln X = ${y}`, near(m.spike, Math.exp(y) ** (delta - 0.5), 1e-12) && near(m.base, 1 / Math.sqrt(Math.exp(y)), 1e-12) && near(m.envelope, (1 + 0.15 * y * y) / Math.sqrt(Math.exp(y)), 1e-12));
}
for (const y of [1, 3, 7, 10]) {
  const m = await calcAt([1, 24, 0, y]),
    I = m.leanInstances,
    X = Math.exp(y);
  let trivial = 0;
  for (let n = 1; n < 300; n++) trivial += X ** (-2 * n) / (2 * n * (2 * n + 1));
  const rhs = mangoldtU(X) - Math.log(2 * PI) + trivial;
  // e^{yρ}/(ρ(1 − ρ)) summed over the conjugate pairs, by complex arithmetic
  const lhs = GAMMA.reduce((s, g) => s + 2 * C.div(C.exp([y / 2, g * y]), C.mul([0.5, g], [0.5, -g]))[0], 0);
  const mass = 2 + EULER - Math.log(4 * PI),
    sum = GAMMA.reduce((s, g) => s + 2 / (0.25 + g * g), 0);
  check(
    `integrated explicit formula at ln X = ${y}: 24 pairs, the sieve side and the remaining mass`,
    near(I.explicit.lhs, lhs, 1e-8) && near(I.explicit.rhs, rhs, 1e-6) && near(I.explicit.tail, (mass - sum) * Math.sqrt(X), 1e-9) && Math.abs(lhs - rhs) <= (mass - sum) * Math.sqrt(X) && near(I.threshold.half, mangoldtU(X) / Math.sqrt(X), 1e-8),
    JSON.stringify([I.explicit, lhs, rhs])
  );
  const inX = PRIMES.filter((p) => p <= X && p !== 7),
    counts = [1, 2, 3, 4, 5, 6].map((a) => inX.filter((p) => p % 7 === a).length);
  // characters modulo 7 as powers of e^{2πi j/6} on the discrete logarithm of base 3
  const logs = {};
  for (let e = 0, v = 1; e < 6; e++, v = (3 * v) % 7) logs[v] = e;
  const chi = Math.max(
    ...[1, 2, 3, 4, 5].map((j) => C.abs(inX.reduce((s, p) => C.add(s, scale(C.exp([0, (2 * PI * j * logs[p % 7]) / 6]), Math.log(p))), [0, 0])))
  );
  check(
    `prime channels modulo 7 at ln X = ${y}: counts, shares, error against Li/6 and the largest character sum`,
    same(m.channels.count, counts) &&
      near(m.channels.worst, Math.max(...counts.map((c) => Math.abs((6 * c) / inX.length - 1))), 1e-12) &&
      near(m.channels.error, Math.max(...counts.map((c) => Math.abs(c - Li(X) / 6))) / X, 1e-9) &&
      near(m.channels.chi, chi / X, 1e-10) &&
      near(m.channels.bound, Math.log(7 * X) / Math.sqrt(X), 1e-12) &&
      m.channels.error <= m.channels.bound,
    JSON.stringify(m.channels)
  );
}

/* ---------- the remaining instances of the evidence panel ---------- */
{
  const I = (await calcAt([1, 24, 0.25])).leanInstances;
  const edges = [];
  CORNERS.forEach((a, i) => CORNERS.forEach((b, j) => i < j && a.of.filter((p) => b.of.includes(p)).length === 2 && edges.push([i, j])));
  const rows = SITES.map((_, p) => edges.map(([i, j]) => (CORNERS[i].of.includes(p) && CORNERS[j].of.includes(p) ? 1 : 0)));
  check('face boundary: 20 − 30 + 12 = 2, rank 11 over ℤ/2, each edge on two faces', edges.length === 30 && rank2(rows) === 11 && rows[0].every((_, e) => rows.reduce((s, r) => s + r[e], 0) === 2) && same(I.euler, { V: 20, E: 30, F: 12, rank: 11, constant: 0 }));
  check('unit quaternion reading: κ = 1 − dist²/4 on neighbouring points of tangency', near(I.chord.kappa, (1 + 1 / Math.sqrt(5)) / 2, 1e-12) && near(I.chord.byChord, I.chord.kappa, 1e-12) && f4(I.chord.kappa) === '0.7236' && f4(I.chord.dist2) === '1.1056' && I.model.drift < 1e-12);
  check('heap recurrence and Chebyshev formulas agree on twelve 30° steps and close', I.heap.steps === 12 && I.heap.gap < 1e-9 && I.heap.closes < 1e-9);
  const ver = (N, al) => N * (1 - Math.cos((1 / N) ** al));
  check('accumulated versine: the bounds at N = 24 and the three phases at N = 4096', near(I.sagitta.value, ver(24, 0.5), 1e-12) && I.sagitta.lower <= I.sagitta.value && I.sagitta.value <= I.sagitta.upper && [I.sagitta.lower, I.sagitta.value, I.sagitta.upper].map(f4).join() === '0.4983,0.4983,0.5000' && [I.sagitta.above, I.sagitta.at, I.sagitta.below].map(f4).join() === [ver(4096, 1), ver(4096, 0.5), ver(4096, 0.25)].map(f4).join() && f4(I.sagitta.below) === '31.9584');
  check('tetrahedral coboundary: no defect on four points of tangency', I.tetra.defects === 0 && I.tetra.edges === 0 && Math.abs(I.tetra.alternating) < 1e-9 && Math.abs(I.tetra.F123) > 1);
  check('Cayley criterion: 24 radial defects 0 on the line, 1.0013 and 0.9988 off it', I.cayley.worstOn < 1e-12 && I.radial < 1e-12 && I.cayley.off.map(f4).join() === '1.0013,0.9988' && near(I.cayley.off[0], C.abs(C.div([-0.75, GAMMA[0]], [0.25, GAMMA[0]])), 1e-12));
  const gap = (a, b) => C.abs(C.add(a, scale(b, -1)));
  check(
    'completed zeta: the theta integral, the product side and an Euler–Maclaurin evaluation agree; reflection holds',
    near(I.xi.atTwo[0][0], PI / 6, 1e-12) && near(I.xi.atTwo[1][0], PI / 6, 1e-10) && gap(I.xi.at[0], I.xi.at[1]) < 1e-9 && gap(I.xi.at[0], xiBy([0.75, 5])) < 1e-9 && gap(I.xi.at[0], I.xi.mirror) < 1e-10 && C.abs(I.xi.atZero[0]) < 1e-9 && C.abs(I.xi.atZero[1]) < 1e-9,
    JSON.stringify(I.xi)
  );
}
{
  // the drawn surface: smooth at δ = 0, K = 24, β = 1 up to the residual bumps; spikes of height X^{δ−1/2}|ρ_1|/|ρ_k|
  await pick(OFFLINE);
  const shape = await page.evaluate(() => {
    const D = window.RIEMANN_POLISH_DEBUG;
    return { first: D.radius(D.spikes[0]), anti: D.radius(D.spikes[0].map((x) => -x)), ninth: D.radius(D.spikes[8]), pole: D.radius([0, 0, -1]) };
  });
  const h = Math.exp(-0.25 * 7),
    h9 = (h * Math.hypot(0.5, GAMMA[0])) / Math.hypot(0.5, GAMMA[8]);
  check('off-line surface: the spike of pair 1 and its antipode are X^{−1/4} high, pair 9 in the ratio |ρ_1|/|ρ_9|', near(shape.first, 1 + h, 1e-3) && near(shape.anti, shape.first, 1e-9) && near(shape.ninth, 1 + h9, 2e-3) && shape.pole < 1 + h / 3, JSON.stringify(shape));
  await seek(0);
  const flat = await page.evaluate(() => window.RIEMANN_POLISH_DEBUG.radius(window.RIEMANN_POLISH_DEBUG.spikes[0]));
  check('back at δ = 0 the same place is X^{−1/2} high', near(flat, 1 + Math.exp(-3.5), 1e-3), String(flat));
}

/* ---------- the cards, in both languages ---------- */
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  const links = await page.locator('#drawer .refs a').evaluateAll((els) => els.filter((el) => getComputedStyle(el.parentElement).display !== 'none').map((el) => el.getAttribute('href')));
  check(lang + ' theory link', links.includes('../../' + lang + '/' + THEORY), JSON.stringify(links));
  check(lang + ' cited declarations: the fifteen in order, one green box each', same(await page.locator('#basis a[data-lean-gid]').evaluateAll((els) => els.map((el) => el.dataset.leanGid)), GIDS) && (await page.locator('#basis .lean:not(.num):not(.model):not(.argued):not(.open):not(.frozen)').count()) === 15);
  for (const id of Object.keys(CARDS)) {
    const want = CARDS[id];
    check(lang + '/' + id + ' plays up to its still and parks', await pick(id));
    const m = await state();
    check(
      lang + '/' + id + ' parks on its declared parameters',
      m.preset === id && m.scene === want.scene && ['beta', 'K', 'delta', 'y', 'n'].every((k) => near(m[k], want[k], 1e-12)) && near(Number(await page.getAttribute(`[data-preset="${id}"]`, 'data-still')), want.still, 1e-12),
      JSON.stringify(m.preset)
    );
    await layout(page, lang + '/' + id);
    const readings = await page.locator('#readouts output').allTextContents();
    check(lang + '/' + id + ' one key and six readouts, all populated', readings.length === 7 && (await page.locator('#readouts dl.ro > div.key').count()) === 1 && readings.every((t) => t && !/NaN|undefined|∞|^—$/.test(t)), JSON.stringify(readings));
    const zeroLam = m.delta === 0;
    check(
      lang + '/' + id + ' readouts show the computed numbers behind their relation signs',
      (await textOf('roCrease')) === `${m.beta === 1 ? '=' : '≈'} ${f2(m.crease.jump)}° · = ${f2(m.crease.defect)}° · ${m.beta === 1 ? '=' : '≈'} ${f4(m.crease.drift)}` &&
        (await textOf('roLantern')) === `= ${m.n} · = ${m.m} · ≈ ×${f4(m.lantern.ratio)} · ≈ ${f2(m.lantern.tilt)}°` &&
        (await textOf('roDecay')).startsWith(`≈ ${f4(m.spike)} · ≈ ${f4(m.base)} · `) &&
        (await textOf('roKey')) === `${zeroLam ? '=' : '≈'} ${f4(m.lambda)}` &&
        (await textOf('keyPill')) === `λmin ${zeroLam ? '=' : '≈'} ${f4(m.lambda)}`,
      [await textOf('roCrease'), await textOf('roLantern'), await textOf('roDecay'), await textOf('roKey'), await textOf('keyPill')].join(' | ')
    );
    check(
      lang + '/' + id + ' the rail label and the slider outputs carry their relation signs',
      (await textOf('tau')) === { n: `n = ${m.n} · m = ${m.m}`, beta: `β = ${f2(m.beta)}`, K: `K = ${m.K}`, delta: `δ = ${f2(m.delta)}`, y: `ln X = ${f2(m.y)}` }[want.param] &&
        (await textOf('betaOut')) === `= ${f2(m.beta)}` &&
        (await textOf('modesOut')) === `= ${m.K}` &&
        (await textOf('deltaOut')) === `= ${f2(m.delta)} · σ = ${f2(0.5 + m.delta)}`,
      [await textOf('tau'), await textOf('betaOut'), await textOf('modesOut'), await textOf('deltaOut')].join(' | ')
    );
    const big = await textOf('hudBig'),
      hs = await textOf('hudSub'),
      note = await textOf('presetNote');
    const facts = {
      [CREASES]: [['· ≈ ×4.7037'], ['≈ 0.1340', '≈ ×4.7037', '≈ 78.29°', '≈ 63.43°'], ['≈ ×4.7037', '√(1 + π⁴/4) ≈ 5.0351', '= 36.00°', '4π']],
      [SWAP]: [['= 0.00°'], ['β = 1', '= 0.00°'], ['1/2 + 1/2 = 1', '≈ 0.2584']],
      [GLUE]: [['λmin = 0.0000'], ['24', '‖uk‖ = 1.0000', 'λmin = 0.0000 ≥ 0'], ['‖uk‖ = 1.0000', 'λmin = 0.0000 ≥ 0', 'η = 0.0000']],
      [OFFLINE]: [['λmin ≈ -0.2932'], ['σ = 1/2 + δ = 0.75', '‖u+‖ > 1 > ‖u-‖', '≈ 1.0013', '≈ 0.9988', 'λmin < 0', '≈ -0.2932', 'Xδ-1/2 ≈ 0.1738'], ['‖u+‖ > 1 > ‖u-‖', '≈ 1.0013', '≈ 0.9988', 'λmin < 0', '≈ -0.2932', 'Xδ-1/2 ≈ 0.1738', 'X-1/2 ≈ 0.0302']],
      [POLISHED]: [['X-1/2 ≈ 0.0067'], ['X-1/2 ≈ 0.0067', '≈ 1.42%', 'ln X = 10.00'], ['≈ 0.0067', '≈ 1.42%', '≈ 0.6065']]
    }[id];
    check(lang + '/' + id + ' title, HUD line and note state the numbers of the frame', facts[0].every((x) => big.includes(x)) && facts[1].every((x) => hs.includes(x)) && facts[2].every((x) => note.includes(x)), [big, hs, note].join(' | '));
    check(lang + '/' + id + ' the tour bar repeats the note', await page.evaluate(() => document.querySelector('#tourBody .tour-note').textContent === document.querySelector('#presetNote').textContent && !!document.querySelector('#tourBody b#tourStep')));
    if (lang === 'en') check('English ' + id + ': no Chinese left', !(await cjkLeftovers(page)).length);
    // the drawing: violet, cyan, magenta (and the stage colour of the shading); amber only for the handle; never red, green
    const prim = await primitiveColours();
    const allowed = [prim.violet, prim.cyan, prim.magenta, prim.stage];
    check(lang + '/' + id + ' the stage draws in violet, cyan and magenta only', prim.seen.length > 4 && prim.seen.every((s) => s.colors.every((c) => allowed.includes(c))), JSON.stringify(prim.seen.filter((s) => s.colors.some((c) => !allowed.includes(c))).slice(0, 3)));
    const magenta = prim.seen.filter((s) => s.n !== 'surface' && s.colors.includes(prim.magenta)).length;
    if (id === GLUE || id === POLISHED) check(lang + '/' + id + ' the proven frame carries no magenta mark', magenta === 0, String(magenta));
    if (id === OFFLINE) check(lang + '/' + id + ' the split images are 96 magenta beads', prim.seen.filter((s) => s.n === 'bead' && s.colors.includes(prim.magenta)).length === 96);
    if (id === GLUE) check(lang + '/' + id + ' 48 cyan images on the circle and 24 cyan strings', prim.seen.filter((s) => s.n === 'bead' && /^u\d+/.test(s.key) && s.colors.includes(prim.cyan)).length === 48 && prim.seen.filter((s) => s.n === 'line' && s.width === 0.9 && s.colors.includes(prim.cyan)).length === 24);
  }
}

/* ---------- the evidence and the drawer as rendered ---------- */
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  const box = async (selector) => (await page.locator('#basis ' + selector + ' .' + lang).allTextContents()).join(' ').replace(/\s+/g, ' ');
  const argued = await box('.lean.argued'),
    open = await box('.lean.open'),
    model = await box('.lean.model'),
    drawer = (await page.locator('#drawer .sheet > div.' + lang).allTextContents()).join(' ').replace(/\s+/g, ' ');
  check(
    lang + ' ARGUED box: the critical line is the externally verified formalization fact of Levent Alpöge, with its replays',
    ['Levent Alpöge', 'RiemannHypothesis', 'DirichletLZerosOnLine', 'lean4lean', 'nanoda', 'con-leche', 'u_div_rpow_tendsto_zero_iff', 'cayley_critical_line_zeta_criterion', 'not_rh_forces_canonical_curvature_failure', 'propext', 'Classical.choice', 'Quot.sound'].every((x) => argued.includes(x)) &&
      (lang === 'zh' ? ['外部已核验的形式化事实', '不是本书冻结的声明', '不带绿色标签', '手工推导', '外尔曲率', '施瓦茨', '冯·科赫', '雷杰'] : ['externally verified formalization fact', 'not a declaration frozen for this book', 'no green badge', 'hand derivation', 'Weyl', 'Schwarz', 'von Koch', 'Regge']).every((x) => argued.includes(x)) &&
      (await page.locator('#basis .lean.argued a[data-lean-gid]').count()) === 0,
    argued.slice(0, 200)
  );
  check(
    lang + ' ARGUED box: the hand derivations that used to stand beside the theorems are marked as such',
    (lang === 'zh' ? ['手工推导：正十二面体', '在 z ↦ 1/conj z 下封闭', '由托普利茨判据 λmin < 0', '秩不超过 2，所以 λmin = 0', '360° − 3 × 108° = 36°'] : ['Derived by hand: the normals', 'closed under z ↦ 1/conj z', 'so λmin < 0 by the Toeplitz criterion', 'rank at most 2, so λmin = 0', '360° − 3 × 108° = 36°']).every((x) => argued.includes(x)) && ['arccos(1/√5)', '√(1 + m²(1 − cos(π/n))²)', '√(1 + π⁴/4)', '2 + γE − ln 4π'].every((x) => argued.includes(x)),
    argued.slice(-400)
  );
  check(
    lang + ' one OPEN box: the operator, ERH and automorphic L, simplicity, spin-2 gravity and the large-scale networks',
    (await page.locator('#basis .lean.open').count()) === 1 &&
      ['ERH', 'prob-ch34-gravity-dynamics-and-coupling', 'prob-ch39-tft-scale-and-seams'].every((x) => open.includes(x)) &&
      (lang === 'zh' ? ['自伴算子', '自守', '单重性', '对抗稳健性'] : ['self-adjoint', 'automorphic', 'simplicity', 'adversarial']).every((x) => open.includes(x)) &&
      !/RiemannHypothesis|DirichletLZerosOnLine|Alpöge|黎曼猜想（RH）/.test(open.replace(/扩展黎曼猜想|全广义黎曼猜想/g, ''))
  );
  check(lang + ' MODEL box names the drawing rules of the stage', (lang === 'zh' ? ['综合模型', '高 0.085 ηK', '反事实的假想', '角 40 θ', '半径 1.5 (1 + 120 (r − 1))', '1.05 + 0.09 (份额 − 1)', '±0.09'] : ['synthesis model', 'are 0.085 ηK high', 'counterfactual assumption', 'angle 40 θ', 'radius 1.5 (1 + 120 (r − 1))', '1.05 + 0.09 (share − 1)', '±0.09']).every((x) => model.includes(x)), model.slice(0, 300));
  check(
    lang + ' drawer: the numbers stand behind their signs, the inequalities between exact expressions',
    (lang === 'zh'
      ? ['法向跳变 ≈ 63.43°', '各亏 = 36.00°', 'n = 6 时 ≈ ×4.7037', '√(1 + π⁴/4) ≈ 5.0351', '角 40 θ', '放大 120 倍', 'arctan(π²/2) ≈ 78.54°', 'λmin = 0.0000', 'δ = 0.25 时 ‖u₊‖ > 1 > ‖u₋‖（值 ≈ 1.0013、≈ 0.9988），λmin < 0（值 ≈ −0.2932）', '从 ≈ 0.6065 退到 ≈ 0.0067', '(1 + 0.15 ln² X)', 'ln X ≈ 2.23 与 ln X ≈ 13.21']
      : ['normal jump is ≈ 63.43°', 'loses = 36.00°', 'at n = 6 it is ≈ ×4.7037', '√(1 + π⁴/4) ≈ 5.0351', 'angle 40 θ', 'magnified 120 times', 'arctan(π²/2) ≈ 78.54°', 'λmin = 0.0000', 'at δ = 0.25, ‖u₊‖ > 1 > ‖u₋‖ (values ≈ 1.0013, ≈ 0.9988), λmin < 0 (value ≈ −0.2932)', 'from ≈ 0.6065 to ≈ 0.0067', '(1 + 0.15 ln² X)', 'ln X ≈ 2.23 and at ln X ≈ 13.21']
    ).every((x) => drawer.includes(x)),
    drawer.slice(0, 400)
  );
}
check(
  'the RH note links the recommended proof and records for the original release',
  same(await page.locator('#basis .lean.argued a').evaluateAll((els) => els.map((a) => a.getAttribute('href'))), [
    'https://github.com/leanprover-community/riemann-hypothesis',
    'https://alpo.ge/remark.pdf',
    'https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/src/Statements.lean',
    'https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/src/Main.lean',
    'https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/README.md#public-kernel-replay-results',
    'https://leanprover-community.github.io/blog/posts/riemann-hypothesis/',
    'https://math.mit.edu/~drew/grh/',
    'https://math.mit.edu/~drew/grh/audit.log'
  ])
);
// each green box as rendered: the frozen statement, its hypotheses and every conclusion, in both languages
{
  const read = (root) =>
    page.evaluate((sel) => [...document.querySelectorAll(sel + ' .lean:not(.argued):not(.model):not(.num):not(.open)')].map((el) => ({ gid: el.querySelector('a[data-lean-gid]').dataset.leanGid, code: el.querySelector('a[data-lean-gid]').textContent, zh: el.querySelector('.zh').textContent.replace(/\s+/g, ' ').trim(), en: el.querySelector('.en').textContent.replace(/\s+/g, ' ').trim() })), root);
  const rendered = await read('#basis'),
    copies = await read('#drawerEvidence');
  check('as rendered the fifteen green boxes are the static ones: the script writes nothing into them', same(rendered.map((b) => [b.gid, b.zh, b.en]), GREEN.map((b) => [b.gid, b.zh.trim(), b.en.trim()])) && rendered.every((b) => b.gid.endsWith('.' + b.code)));
  check('the drawer repeats the fifteen boxes in the same order and words', same(copies, rendered));
  for (const [name, zh, en] of [
    ['exists_unitQuaternion_equiv', ['不交换', '链连通', '读数可任意接近 0', '特征秩为 5', '读取完备', '对每个 o ∈ M 存在双射 u', 'u(o) = 1', 'u(tri(x, y, z)) = u(x) u(y)⁻¹ u(z)', 'κ(x, y) = (1 + ⟨u(x), u(y)⟩)/2'], ['noncommutative', 'chain connected', 'readings come arbitrarily close to 0', 'feature rank 5', 'reading complete', 'for every o ∈ M there is a bijection u', 'u(o) = 1', 'u(tri(x, y, z)) = u(x) u(y)⁻¹ u(z)', 'κ(x, y) = (1 + ⟨u(x), u(y)⟩)/2']],
    ['kappa_eq_one_sub_dist_sq', ['对一切单位四元数 a、b', 'κ(a, b) = 1 − dist(a, b)²/4'], ['for all unit quaternions a and b', 'κ(a, b) = 1 − dist(a, b)²/4']],
    ['normSq_and_chebyshev', ['对每个四元数序列', '当且仅当', 'xn+2 = xn+1 xn* xn+1', 'xn+1 = Un(c)·x1 − Un−1(c)·x0', 'n = 0 时约定 U−1 = 0', '⟨x0, xn⟩ = Tn(c)', 'c = ⟨x0, x1⟩', '第一、二类切比雪夫多项式'], ['for every sequence', 'if and only if', 'xn+2 = xn+1 xn* xn+1', 'xn+1 = Un(c)·x1 − Un−1(c)·x0', 'with U−1 = 0 at n = 0', '⟨x0, xn⟩ = Tn(c)', 'c = ⟨x0, x1⟩', 'Chebyshev polynomials of the first and second kinds']],
    ['accumulated_sagitta_bounds', ['对一切实数 σ、T、α 与每个自然数 N', 'σ·rpow(T/N, α)', '全函数实数除法（T/0 = 0）', 'Real.rpow', 'N(θ²/2 − θ⁴/24) ≤ N(1 − cos θ)', 'N(1 − cos θ) ≤ N·θ²/2'], ['for all real σ, T and α and every natural number N', 'σ·rpow(T/N, α)', 'total real division of Lean (T/0 = 0)', 'Real.rpow', 'N(θ²/2 − θ⁴/24) ≤ N(1 − cos θ)', 'N(1 − cos θ) ≤ N·θ²/2']],
    ['accumulated_sagitta_phases', ['T > 0', 'T/0 = 0', 'Real.rpow', 'σ·rpow(T/N, α)', '全函数实数除法', '当 N ≥ 1 时 θN 就是普通实幂 σ(T/N)α', 'N(1 − cos θN)', '若 α > 1/2，它趋于 0', '若 α = 1/2，它趋于 σ²T/2', '若 σ ≠ 0、0 < α 且 α < 1/2，它趋于 +∞'], ['T > 0', 'T/0 = 0', 'Real.rpow', 'σ·rpow(T/N, α)', 'total real division', 'for N ≥ 1, θN is the ordinary real power σ(T/N)α', 'N(1 − cos θN)', 'to 0 if α > 1/2', 'to σ²T/2 if α = 1/2', 'to +∞ if σ ≠ 0, 0 < α and α < 1/2']],
    ['face_cycle_exact', ['有限顶点集 V 上的连通简单图（SimpleGraph）', '有向边集非空', '旋转系统', '|V| − |E| + |面| = 2', 'x(face(d)) + x(face(d⁻))', '∂x = 0 当且仅当 x 是常数', '∂ 的像等于 G 的圈空间', 'ℤ/2 上张成'], ['connected simple graph (SimpleGraph) on a finite vertex set V', 'nonempty set of darts', 'a rotation of G', '|V| − |E| + |faces| = 2', 'x(face(d)) + x(face(d⁻))', '∂x = 0 if and only if x is constant', 'the range of ∂ is the cycle space of G', 'ℤ/2-span']],
    ['tetra_defects_incidence_repair_and_exactness', ['V 是有限非空集', 'AddCommGroup', 'δF(r, i, j, k) = F(i, j, k) − F(r, j, k) + F(r, i, k) − F(r, i, j)', 'de(i, j, k) = e(j, k) − e(i, k) + e(i, j)', 'Σr faceErrors(r) = tetraDefects', '存在 r 使 |V|·faceErrors(r) ≤ tetraDefects', '对每个 e，tetraDefects ≤ 4|V|·edgeErrors(e)', 'δF 处处为 0 当且仅当存在 e 使 F = de 处处成立'], ['V be a finite nonempty set', 'AddCommGroup', 'δF(r, i, j, k) = F(i, j, k) − F(r, j, k) + F(r, i, k) − F(r, i, j)', 'de(i, j, k) = e(j, k) − e(i, k) + e(i, j)', 'Σr faceErrors(r) = tetraDefects', 'some r has |V|·faceErrors(r) ≤ tetraDefects', 'every e has tetraDefects ≤ 4|V|·edgeErrors(e)', 'δF = 0 everywhere if and only if F = de everywhere for some e']],
    ['cayley_ratio_norm_one_iff_critical_line', ['对每个复数 s', '‖(s − 1)/s‖ = 1 ⇔ Re s = 1/2', 's = 0 时按 Lean 的全函数除法约定 (s − 1)/s = 0'], ['for every complex number s', '‖(s − 1)/s‖ = 1 ⇔ Re s = 1/2', 'by the total division convention of Lean, (s − 1)/s = 0 at s = 0']],
    ['cayley_critical_line_zeta_criterion', ['对每个复数 s，‖(s − 1)/s‖ = 1 ⇔ Re s = 1/2', '(s − 1)/s = 0', 'RiemannHypothesis 成立，当且仅当', 'ζ(ρ) = 0、ρ ≠ 1 且不等于任何 −2(n + 1)', 'log‖(ρ − 1)/ρ‖ = 0', 'Real.log'], ['for every complex number s, ‖(s − 1)/s‖ = 1 ⇔ Re s = 1/2', '(s − 1)/s = 0 at s = 0', 'RiemannHypothesis holds if and only if', 'ζ(ρ) = 0, ρ ≠ 1 and ρ ≠ −2(n + 1) for all natural numbers n', 'log‖(ρ − 1)/ρ‖ = 0', 'Real.log']],
    ['xi_reading_eq_completed_zeta', ['s ≠ 0、s ≠ 1', 'ξ(s) = (1/2) s(s − 1) Λ(s)', 'ξ(s) = (1/2)(s(s − 1)Λ₀(s) + 1)', 'completedRiemannZeta₀'], ['s ≠ 0, s ≠ 1', 'ξ(s) = (1/2) s(s − 1) Λ(s)', 'ξ(s) = (1/2)(s(s − 1)Λ₀(s) + 1)', 'completedRiemannZeta₀']],
    ['xi_reading_reflection', ['对每个复数 s，ξ(1 − s) = ξ(s)', 'Λ₀'], ['for every complex s, ξ(1 − s) = ξ(s)', 'Λ₀']],
    ['actual_integrated_explicit_formula', ['对每个实数 y > 0', '按重数计入', 'Σρ eyρ/(ρ(1 − ρ)) = U(ey) − ln(2π) + T(y)', 'U(t) = t Σn≤t Λ(n)/n − ψ(t) − t ln t + (1 + γE)t', 'T(y) = Σn≥1 e−2ny/(2n(2n + 1))'], ['for every real y > 0', 'counted with multiplicity', 'Σρ eyρ/(ρ(1 − ρ)) = U(ey) − ln(2π) + T(y)', 'U(t) = t Σn≤t Λ(n)/n − ψ(t) − t ln t + (1 + γE)t', 'T(y) = Σn≥1 e−2ny/(2n(2n + 1))']],
    ['u_div_rpow_tendsto_zero_iff', ['hRH : RiemannHypothesis（定理的前提）', '对每个实数 θ', 'U(x)/xθ → 0 当且仅当 1/2 < θ', 'Real.rpow'], ['hRH : RiemannHypothesis (the premise of the theorem)', 'for every real θ', 'U(x)/xθ → 0 as x → ∞ if and only if 1/2 < θ', 'Real.rpow']],
    ['not_rh_forces_canonical_curvature_failure', ['若 ¬RiemannHypothesis', '存在自然数 N', '[cj−k] 不是半正定的', 'c0 = 1', 'cn = (ℓ|n|+1 − 2ℓ|n| + ℓ|n|−1)/(2ℓ1)', 'canonicalLiCurvature', 'canonicalLiCoefficient'], ['if ¬RiemannHypothesis', 'there is a natural number N', '[cj−k] is not positive semidefinite', 'c0 = 1', 'cn = (ℓ|n|+1 − 2ℓ|n| + ℓ|n|−1)/(2ℓ1)', 'canonicalLiCurvature', 'canonicalLiCoefficient']],
    ['toeplitz_posSemidef_iff_norm_eq_one', ['u : Fin m → ℂ', '|range(u)| ≤ N + 1', '每个 uj ≠ 0', '置换 σ', 'uσ(j) = (conj uj)⁻¹', '[pj−k]（pn = Σj ujn，n ∈ ℤ）半正定，当且仅当对一切 j 有 ‖uj‖ = 1'], ['u : Fin m → ℂ', '|range(u)| ≤ N + 1', 'every uj ≠ 0', 'σ a permutation of Fin m', 'uσ(j) = (conj uj)⁻¹ for all j', '[pj−k], pn = Σj ujn (n ∈ ℤ), is positive semidefinite if and only if ‖uj‖ = 1 for all j']]
  ]) {
    const box = rendered.find((x) => x.code === name) || { zh: '', en: '' },
      missing = [...zh.filter((x) => !box.zh.includes(x)), ...en.filter((x) => !box.en.includes(x))];
    check(`${name}: the box states the theorem with its hypotheses and every conclusion in both languages`, !missing.length, missing.join(' | '));
  }
}

/* ---------- the NUM box, the drawer and the MODEL box as rendered: every number against a value computed here ---------- */
const LAMBDA = new Map();
/** The least eigenvalue of the 96 × 96 matrix of the first pair at δ, by Jacobi rotations. */
function lambdaOf(d) {
  if (d === 0) return 0;
  if (!LAMBDA.has(d)) LAMBDA.set(d, leastEigenvalue(toeplitz(fourImages(GAMMA[0], d)).M));
  return LAMBDA.get(d);
}
const MASS = 2 + EULER - Math.log(4 * PI),
  SUM24 = GAMMA.reduce((x, g) => x + 2 / (0.25 + g * g), 0);
const YS = new Map();
/** Everything of the sieve and of the explicit formula at ln X = y. */
function atY(y) {
  if (YS.has(y)) return YS.get(y);
  const X = Math.exp(y),
    u = mangoldtU(X),
    inX = PRIMES.filter((p) => p <= X && p !== 7),
    counts = [1, 2, 3, 4, 5, 6].map((a) => inX.filter((p) => p % 7 === a).length),
    logs = {};
  for (let e = 0, v = 1; e < 6; e++, v = (3 * v) % 7) logs[v] = e;
  let trivial = 0;
  for (let n = 1; n < 300; n++) trivial += X ** (-2 * n) / (2 * n * (2 * n + 1));
  const lhs = GAMMA.reduce((x, g) => x + 2 * C.div(C.exp([y / 2, g * y]), C.mul([0.5, g], [0.5, -g]))[0], 0),
    rhs = u - Math.log(2 * PI) + trivial,
    out = {
      lhs,
      rhs,
      gap: Math.abs(lhs - rhs),
      tail: (MASS - SUM24) * Math.sqrt(X),
      half: u / Math.sqrt(X),
      more: u / X ** 0.75,
      // the largest |6c − N|·100/N as a fraction
      worstQ: fracN(BigInt(Math.max(...counts.map((c) => Math.abs(6 * c - inX.length)))) * 100n, BigInt(inX.length)),
      error: Math.max(...counts.map((c) => Math.abs(c - Li(X) / 6))) / X,
      bound: Math.log(7 * X) / Math.sqrt(X),
      chi: Math.max(...[1, 2, 3, 4, 5].map((j) => C.abs(inX.reduce((x, p) => C.add(x, scale(C.exp([0, (2 * PI * j * logs[p % 7]) / 6]), Math.log(p))), [0, 0])))) / X
    };
  YS.set(y, out);
  return out;
}
/** What the box and the spans must say in a language at the frames and sample sizes f; drift: the drifts the page measured. */
function expectedBench(lang, f) {
  const zh = lang === 'zh',
    list = (...xs) => xs.join(zh ? '、' : ', '),
    value = (...xs) => (zh ? `（值 ${list(...xs)}）` : ` (value${xs.length > 1 ? 's' : ''} ${list(...xs)})`),
    num = (x, d) => said(null, x, d),
    times = (x) => num(x).replace('≈ ', '≈ ×'),
    crease = creaseN(0),
    lant = lanternByTriangles(f.n, f.n * f.n),
    square = lanternByTriangles(f.n, f.n),
    us = fourImages(GAMMA[0], f.offset),
    out = num(C.abs(us[2])),
    inn = num(C.abs(us[0])),
    lam = saidTiny(lambdaOf(f.offset)),
    far = saidTiny(lambdaOf(f.far)),
    off = f.offset.toFixed(2),
    y = atY(f.y),
    y2 = f.y.toFixed(2),
    end = atY(10),
    spike = num(Math.exp((f.offset - 0.5) * f.y)),
    base = num(Math.exp(-f.y / 2)),
    from = num(Math.exp(-0.5)),
    to = num(Math.exp(-5)),
    jump = `≈ ${crease.jump.toFixed(2)}°`,
    limit = num(Math.sqrt(1 + PI ** 4 / 4)),
    tiltLimit = `≈ ${(Math.atan(PI ** 2 / 2) / DEG).toFixed(2)}°`,
    gap = f.n === 3 ? '= 0.5000' : num(2 * Math.sin(PI / (2 * f.n)) ** 2),
    // the accumulated versine by its Taylor series in θ² = 1/few, and by the half angle
    lower = subN(HALF, fracN(1n, 24n * BigInt(f.few))),
    sagitta = f.few * [1, 2, 3, 4, 5, 6].reduce((x, k) => x - ((-1) ** k * (1 / f.few) ** k) / [2, 24, 720, 40320, 3628800, 479001600][k - 1], 0),
    versine = (a) => 2 * f.N * Math.sin(f.N ** -a / 2) ** 2,
    steps = 360 / f.stepDeg;
  // where 1 + env y² = e^{δ y}, by bisection on ln
  const over = (t) => Math.log(1 + f.env * t * t) - f.offset * t,
    meets = [];
  for (let t = 0.05; t < 127; t += 0.05)
    if (over(t) * over(t + 0.05) < 0) {
      let [a, b] = [t, t + 0.05];
      for (let k = 0; k < 80; k++) over(a) * over((a + b) / 2) <= 0 ? (b = (a + b) / 2) : (a = (a + b) / 2);
      meets.push(num(a, 2));
    }
  const squeeze = [said(lower, numN(lower), 8), num(sagitta, 8), '= 0.50000000'],
    phases = list(saidTiny(versine(1)), num(versine(0.5)), num(versine(0.25)));
  const spans = {
    offset: off,
    ghost: '0.25',
    seam: String(f.seam),
    turn: '40',
    ring: '1.5',
    zoom: '120',
    classR: '1.05',
    classLift: '0.09',
    jump,
    defect: '= 36.00°',
    n: String(f.n),
    ratio: times(lant.ratio),
    limit,
    tilt: tiltLimit,
    lam0: '= 0.0000',
    out,
    inn,
    lam,
    from,
    to,
    env: f.env.toFixed(2),
    meet0: meets[0],
    meet1: meets[1]
  };
  const phrases = [
    zh ? '不检验定理的前提，也不计算规范李曲率' : 'it checks no hypothesis and computes no canonical Li curvature',
    zh ? '12 组 x y⁻¹ z 的模与 1 的浮点偏差' : 'norms of 12 transfers x y⁻¹ z vs 1, drift',
    zh ? '132 对切点的 κ 与 1 − 弦长²/4 的浮点偏差' : 'κ vs 1 − chord²/4 over 132 pairs, drift',
    (zh ? '相邻两点 κ ' : 'neighbours have κ ') + num((1 + 1 / Math.sqrt(5)) / 2) + (zh ? '、弦长² ' : ', chord² ') + num(2 - 2 / Math.sqrt(5)),
    zh ? `沿大圆每步 ${f.stepDeg}° 走 ${steps} 步` : `${steps} steps of ${f.stepDeg}° along a great circle`,
    (zh ? `N = ${f.few} 时下界 ≤ 累积矢高 ≤ 上界` : `N = ${f.few}, lower bound ≤ sagitta ≤ upper bound`) + value(...squeeze),
    (zh ? `N = ${f.N}、α = 1、1/2、1/4 时依次 ` : `at N = ${f.N}, α = 1, 1/2, 1/4 in turn `) + phases,
    (zh ? '法向跳变 ' : 'normal jump ') + jump + (zh ? '，顶点亏角 = 36.00°，20 个合计 = 720.00°，外漂 ' : ', corner defect = 36.00°, sum of all 20 = 720.00°, corner drift ') + num(crease.drift) + (zh ? '，β = 1 时三者依次 = 0.00°、= 0.00°、= 0.0000' : ', at β = 1 in turn = 0.00°, = 0.00°, = 0.0000'),
    zh ? '骨架 20 − 30 + 12 = 2，ℤ/2 边界矩阵的秩 11（F − 1 = 11，E − V + 1 = 11），全 1 标记的边界有 0 条非零边' : 'skeleton 20 − 30 + 12 = 2, ℤ/2 boundary of rank 11 (F − 1 = 11, E − V + 1 = 11), 0 edges in that of the all-ones labelling',
    zh ? '在 256 个有序四元组上按 10⁻⁹ 计数的缺陷 0 个' : '0 defects counted to 10⁻⁹ on 256 ordered quadruples',
    zh ? '锚在首点的边上链复原失败 0 处' : '0 failures of the edge cochain anchored at the first point',
    (zh ? `n = ${f.n}、m = ${f.n * f.n} 时离柱面的最大距离 ${gap}，面积比 ` : `n = ${f.n}, m = ${f.n * f.n}: largest distance from the cylinder ${gap}, area ratio `) + times(lant.ratio) + (zh ? '，法向斜 ' : ', tilt ') + `≈ ${lant.tilt.toFixed(2)}°`,
    (zh ? 'm = n² 的极限 √(1 + π⁴/4) ' : 'limits for m = n²: √(1 + π⁴/4) ') + limit + (zh ? '、arctan(π²/2) ' : ', arctan(π²/2) ') + tiltLimit,
    (zh ? `m = n = ${f.n} 时面积比 ` : `m = n = ${f.n}: area ratio `) + times(square.ratio),
    (zh ? `γ₁、δ = ${off} 时 ‖u+‖ > 1 > ‖u−‖` : `at γ₁, δ = ${off}, ‖u+‖ > 1 > ‖u−‖`) + value(out, inn),
    zh ? '幂和矩阵取 N = 95，96 ≥ 4' : 'power sums with N = 95, 96 ≥ 4',
    zh ? 'δ = 0 时 λmin = 0.0000（秩 2，2 个不同的像）' : 'at δ = 0, λmin = 0.0000 (rank 2, 2 distinct images)',
    (zh ? `δ = ${off}、${f.far.toFixed(2)} 时 λmin < 0` : `at δ = ${off}, ${f.far.toFixed(2)}, λmin < 0`) + value(lam, far),
    'ξ(2) ' + num(PI / 6),
    (zh ? `ln X = ${y2} 时 24 对之和 ` : `at ln X = ${y2}: 24 pairs `) + num(y.lhs) + (zh ? '，右端 ' : ', right side ') + num(y.rhs) + (zh ? '，两者之差 ≤ 余下质量乘 X1/2' : ', their gap ≤ the remaining mass times X1/2') + value(num(y.gap), num(y.tail)),
    (zh ? '24 对的系数和 ' : 'coefficients of the 24 pairs ') + num(SUM24) + (zh ? '，全部零点 2 + γE − ln 4π ' : ', of all zeros 2 + γE − ln 4π ') + num(MASS),
    `U(X)/X1/2 ${num(y.half)}${zh ? '，' : ', '}U(X)/X3/4 ${num(y.more)}`,
    (zh ? `ln X = ${y2} 时 Xδ−1/2 ${spike}（δ = ${off}），X−1/2 ` : `at ln X = ${y2}, Xδ−1/2 ${spike} (δ = ${off}), X−1/2 `) + base,
    zh ? `ln X 从 1 到 10，X−1/2 从 ${from} 到 ${to}` : `from ln X = 1 to 10, X−1/2 from ${from} to ${to}`,
    zh ? `虚线包络与 Xδ−1/2（δ = ${off}）在 ln X ${meets[0]} 与 ln X ${meets[1]} 处相交` : `the dashed envelope meets Xδ−1/2 (δ = ${off}) at ln X ${meets[0]} and at ln X ${meets[1]}`,
    (zh ? 'ln X = 10.00 时模 7 的最大份额偏离 ' : 'at ln X = 10.00, largest share gap modulo 7 ') + `${said(end.worstQ, numN(end.worstQ), 2)}%` + (zh ? '，|π(X; 7, a) − Li(X)/6|/X 的最大值 ' : ', largest |π(X; 7, a) − Li(X)/6|/X ') + num(end.error),
    zh ? '数值演示，不是证明。' : 'A numerical illustration, not a proof.'
  ];
  return { spans, phrases };
}
const DRIFTS = ['model', 'chord', 'heap', 'closes', 'tetra', 'circle', 'radial', 'xi', 'mirror'];
/** The audit of a page: the box, its copy and the spans against the numbers computed here; [] or what is wrong. */
async function auditBench(p, frame) {
  const seen = await p.evaluate(() => {
    const flat = (el) => el.textContent.replace(/\s+/g, ' ').trim(),
      names = (sel) => [...document.querySelectorAll(sel)].map((e) => [e.dataset.bench, flat(e)]);
    return {
      box: Object.fromEntries(['zh', 'en'].map((l) => [l, flat(document.querySelector('#basis .lean.num .' + l))])),
      copy: Object.fromEntries(['zh', 'en'].map((l) => [l, flat(document.querySelector('#drawerEvidence .lean.num .' + l))])),
      rail: names('#rail [data-bench]'),
      model: Object.fromEntries(['zh', 'en'].map((l) => [l, names(`#basis .lean.model .${l} [data-bench]`)])),
      modelCopy: Object.fromEntries(['zh', 'en'].map((l) => [l, names(`#drawerEvidence .lean.model .${l} [data-bench]`)])),
      drawer: Object.fromEntries(['zh', 'en'].map((l) => [l, names(`#drawer .sheet > .${l} [data-bench]`)])),
      bench: window.RIEMANN_POLISH_DEBUG.bench(),
      twice: [...document.querySelectorAll('[id]')].map((e) => e.id).filter((x, i, a) => a.indexOf(x) !== i)
    };
  });
  const bad = [];
  if (!same(seen.box, seen.copy) || !same(seen.model, seen.modelCopy)) bad.push('the copy in the drawer');
  if (seen.twice.length) bad.push('ids twice: ' + seen.twice.join(' '));
  const { drift } = seen.bench;
  if (!same(Object.keys(drift), DRIFTS)) bad.push('the drifts ' + Object.keys(drift).join(' '));
  if (!Object.values(drift).every((x) => Number.isFinite(x) && x >= 0 && x < 1e-10)) bad.push('a drift of 10⁻¹⁰ or more ' + JSON.stringify(drift));
  for (const lang of ['zh', 'en']) {
    const { spans, phrases } = expectedBench(lang, frame),
      text = seen.box[lang],
      covered = [];
    for (const x of phrases) {
      const k = text.indexOf(x);
      if (k < 0 || text.split(x).length !== 2) bad.push(`${lang} box: ${x}`);
      else covered.push([k, k + x.length]);
    }
    // no value of the box stands outside the phrases
    for (const m of text.matchAll(new RegExp(`[=≈] ×?${VALUE}`, 'g'))) if (!covered.some(([a, b]) => m.index >= a && m.index + m[0].length <= b)) bad.push(`${lang} box, not audited: ${m[0]}`);
    if (/—|undefined|NaN|null|Infinity|∞/.test(text)) bad.push(`${lang} box: not filled`);
    // every drift of the box is the least power of ten above the number the page measured, in order
    const printed = [...text.matchAll(/(?:浮点偏差|浮点余量|drift|residue) (= 0|< 10⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g)].map((m) => m[1]),
      want = DRIFTS.map((k) => belowText(drift[k]));
    if (!same(printed, want)) bad.push(`${lang} box: the drifts ${JSON.stringify([printed, want])}`);
    if (lang === 'en' && !text.includes('every drift is a floating-point one')) bad.push('en box: the drifts are not named');
    for (const [where, rows, names] of [
      ['rail', seen.rail, SPANS.rail],
      ['model', seen.model[lang], SPANS.model],
      ['drawer', seen.drawer[lang], SPANS.drawer]
    ]) {
      if (!same(rows.map((x) => x[0]), names)) bad.push(`${lang} ${where}: ${rows.map((x) => x[0]).join(' ')}`);
      for (const [key, x] of rows) if (x !== spans[key]) bad.push(`${lang} ${where} ${key}: ${x} (${spans[key]})`);
    }
    bad.push(...mixed(text).map((x) => `${lang} chained: ${x}`));
  }
  return bad;
}
const FRAME = { n: 6, offset: 0.25, far: 0.4, y: 7, few: 24, N: 4096, stepDeg: 30, env: 0.15, seam: 0.085 };
{
  const bad = await auditBench(page, FRAME);
  check('NUM: the box in both languages, its copy and the spans of the cards, of the MODEL box and of the drawer are the numbers computed here, each drift the least power of ten above it', !bad.length, bad.slice(0, 6).join(' | '));
}
{
  // the same sources with other frames and sample sizes: every number follows them, so none of them is written down
  const patches = [
    ["'riemann-1854-tangent-lantern-creases': CARD('lantern', 0, 0, 0, 7, 6, 'face', 3 / 7)", "'riemann-1854-tangent-lantern-creases': CARD('lantern', 0, 0, 0, 7, 5, 'face', 2 / 7)"],
    ["'counterfactual-offline-spike-breakdown': CARD('offline', 1, 24, 0.25, 7, 6, 'panorama', 0.625)", "'counterfactual-offline-spike-breakdown': CARD('offline', 1, 24, 0.2, 5, 6, 'panorama', 0.5)"],
    ['stepDeg = 30,', 'stepDeg = 45,'],
    ['few = 24,', 'few = 40,'],
    ['many = 4096,', 'many = 2500,'],
    ['const ENV = 0.15;', 'const ENV = 0.2;'],
    ['SEAM = 0.085,', 'SEAM = 0.072,']
  ];
  const p = await T.open(BOOK, ID, '?lang=zh', { reducedMotion: 'reduce' });
  await p.route(`**/${ID}/main.js*`, (route) => route.fulfill({ contentType: 'text/javascript; charset=utf-8', body: patches.reduce((js, [from, to]) => js.replace(from, to), sources['main.js']) }));
  await p.reload({ waitUntil: 'load' });
  await settle(p);
  const bad = await auditBench(p, { n: 5, offset: 0.2, far: 0.4, y: 5, few: 40, N: 2500, stepDeg: 45, env: 0.2, seam: 0.072 });
  check('NUM: served with n = 5, δ = 0.20, ln X = 5, N = 40 and 2500, 8 steps of 45°, another envelope and seam, the box, the cards, the MODEL box and the drawer follow them (they are computed, not written)', patches.every(([from]) => sources['main.js'].split(from).length === 2) && !bad.length, bad.slice(0, 6).join(' | '));
  await p.context().close();
}
{
  // and with a wrong law in the script the numbers change: the box measures the page, it does not repeat a text
  const from = '(1 - norm(sub(p, q)) ** 2 / 4)',
    p = await T.open(BOOK, ID, '?lang=zh', { reducedMotion: 'reduce' });
  await p.route(`**/${ID}/main.js*`, (route) => route.fulfill({ contentType: 'text/javascript; charset=utf-8', body: sources['main.js'].replace(from, '(1 - norm(sub(p, q)) ** 2 / 5)') }));
  await p.reload({ waitUntil: 'load' });
  await settle(p);
  const [gap, text] = await p.evaluate(() => [window.RIEMANN_POLISH_DEBUG.bench().drift.chord, document.querySelector('#basis .lean.num .zh').textContent.replace(/\s+/g, ' ')]);
  check('NUM: with a wrong chord law 1 − dist²/5 in the script the box shows its size', sources['main.js'].split(from).length === 2 && gap > 0.1 && text.includes(`κ 与 1 − 弦长²/4 的浮点偏差 ${belowText(gap)}，`), JSON.stringify([gap, text.slice(0, 200)]));
  await p.context().close();
}
{
  // the same for “=”: it is printed of a fraction only while the computed double agrees with it, and a law only while it holds
  const patches = [
      ['const defect = beta >= 1 ? 0 : TAU - 3 * angle;', 'const defect = beta >= 1 ? 0 : TAU - 3.1 * angle;'],
      ['    return 4 * Math.min(low(AA, DD, AD), low(BB, CC, BC));', '    return -4 * Math.min(low(AA, DD, AD), low(BB, CC, BC));']
    ],
    p = await T.open(BOOK, ID, `?lang=zh&preset=${CREASES}`, { reducedMotion: 'reduce' });
  await p.route(`**/${ID}/main.js*`, (route) => route.fulfill({ contentType: 'text/javascript; charset=utf-8', body: patches.reduce((js, [from, to]) => js.replace(from, to), sources['main.js']) }));
  await p.reload({ waitUntil: 'load' });
  await settle(p);
  const [note, ro, text, spans] = await p.evaluate(() => [...['#presetNote', '#roCrease', '#basis .lean.num .zh'].map((x) => document.querySelector(x).textContent.replace(/\s+/g, ' ')), [...document.querySelectorAll('#drawer .zh [data-bench="defect"]')].map((e) => e.textContent.replace(/\s+/g, ' '))]);
  check('with a wrong defect in the script no reading keeps its “= 36.00°”, and with a least eigenvalue of the wrong sign the box claims no “< 0”', patches.every(([from]) => sources['main.js'].split(from).length === 2) && [note, ro, text, spans.join(' ')].every((x) => x.includes('≈ 25.20°') && !x.includes('= 36.00°')) && /δ = 0\.25、0\.40 时 λmin（值 ≈ \d/.test(text) && !text.includes('λmin < 0'), JSON.stringify([note, ro, spans, text.slice(text.indexOf('幂和矩阵'), text.indexOf('幂和矩阵') + 120)]));
  await p.context().close();
}

/* ---------- the rail drives the parameter of each scene; notes and HUD follow ---------- */
await setLang('zh');
for (const [id, tests] of [
  [CREASES, [[0, { n: 3 }], [1, { n: 10 }]]],
  [SWAP, [[0, { beta: 0 }], [0.37, { beta: 0.37 }]]],
  [GLUE, [[0, { K: 0 }], [0.5, { K: 12 }]]],
  [OFFLINE, [[0, { delta: 0 }], [1, { delta: 0.4 }]]],
  [POLISHED, [[0, { y: 1 }], [0.5, { y: 5.5 }]]]
]) {
  await pick(id);
  for (const [t, want] of tests) {
    await seek(t);
    const m = await state(),
      [k, v] = Object.entries(want)[0];
    check(`${id}: rail ${t} sets ${k} = ${v}, the card stays`, near(m[k], v, 1e-12) && m.preset === id && !m.playing, JSON.stringify([m[k], m.preset]));
    const at = await page.evaluate((x) => window.RIEMANN_POLISH_DEBUG.dragTarget(x), t),
      box = await page.locator('#stageHandle').boundingBox();
    check(`${id}: the handle sits on the current value at rail ${t}`, !!box && Math.hypot(box.x + box.width / 2 - at.x, box.y + box.height / 2 - at.y) < 1.5);
  }
}
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  // ⏮ and the δ = 0 chip on the off-line card: back on the proven line, with the card still marked
  for (const [label, sel] of [
    ['⏮', '#rew'],
    ['δ = 0 chip', '#deltaZero']
  ]) {
    await pick(OFFLINE);
    await page.click(sel);
    await settle(page);
    const m = await state(),
      hs = await textOf('hudSub'),
      note = await textOf('presetNote');
    check(
      `${lang} ${label}: δ = 0, the card stays, HUD and note report λ_min = 0.0000 ≥ 0 and the closed circle`,
      m.delta === 0 && m.preset === OFFLINE && m.lambda === 0 && hs.includes('0.0000 ≥ 0') && note.includes('0.0000 ≥ 0') && !/< 0|0\.2932/.test(hs + note) && (await textOf('hudBig')).includes('λmin = 0.0000') && (await page.getAttribute('#deltaZero', 'aria-pressed')) === 'true',
      hs + ' | ' + note
    );
    const prim = await primitiveColours();
    check(`${lang} ${label}: no magenta mark is left on the stage`, prim.seen.filter((s) => s.n !== 'surface' && s.colors.includes(prim.magenta)).length === 0);
    check(`${lang} ${label}: the legend names no split images`, !/裂开|split/.test(await textOf('legend')));
  }
  // the offset slider to 0 from the off-line card: free play, the same truth in the HUD and the free-play note
  await pick(OFFLINE);
  await input('#deltaRange', 0);
  {
    const m = await state(),
      hs = await textOf('hudSub'),
      note = await textOf('presetNote');
    check(`${lang} δ slider to 0: free play, λ_min = 0.0000 ≥ 0 in the HUD and the note`, m.preset === null && m.delta === 0 && hs.includes('0.0000 ≥ 0') && note.includes('0.0000 ≥ 0') && !/< 0/.test(hs + note), hs + ' | ' + note);
  }
  await input('#deltaRange', 0.01);
  {
    const m = await state(),
      TINY = sciN(m.lambda).replaceAll('−', '-');
    check(`${lang} δ = 0.01: λ_min is strictly negative and printed with its sign`, m.lambda < 0 && (await textOf('hudBig')).includes('λmin ≈ ' + TINY) && new RegExp('λmin < 0(?:（值| \\(value) ≈ ' + TINY).test(await textOf('hudSub')) && (await textOf('roKey')) === '≈ ' + TINY && (await textOf('hudSub')).includes('≈ 1 + 4.999×10⁻⁵'), await textOf('hudBig'));
  }
  // the modes to 0 with an offset: nothing to move
  await input('#deltaRange', 0.25);
  await input('#modesRange', 0);
  {
    const m = await state(),
      hs = await textOf('hudSub'),
      note = await textOf('presetNote');
    check(`${lang} K = 0 with δ = 0.25: no pair to move, λ_min = 0.0000, no negative claim`, m.K === 0 && m.lambda === 0 && hs.includes('K = 0') && hs.includes('0.0000') && note.includes('K = 0') && !/< 0/.test(hs + note) && !(await textOf('roCayley')).includes('1.0013'), hs + ' | ' + note);
  }
  // the base slider on the completed manifold: creases come back, in words and numbers
  await pick(POLISHED);
  await input('#betaRange', 0.4);
  {
    const m = await state(),
      hs = await textOf('hudSub');
    check(`${lang} completed scene at β = 0.40: the HUD reports the creases`, m.scene === 'polished' && m.beta === 0.4 && hs.includes('β = 0.40') && hs.includes(f2(m.crease.jump) + '°') && !/没有接缝也没有折痕|no seam and no crease/.test(hs), hs);
    const prim = await primitiveColours();
    check(`${lang} completed scene at β = 0.40: the geodesic is broken and magenta`, prim.seen.some((s) => s.key === 'traj' && s.colors.includes(prim.magenta)));
  }
  await input('#modesRange', 5);
  check(`${lang} completed scene at K = 5: the HUD reports the seam residual`, (await textOf('hudSub')).includes('η ≈ ' + f4((await state()).eta)));
  await input('#deltaRange', 0.4);
  {
    const m = await state(),
      hs = await textOf('hudSub'),
      note = await textOf('presetNote');
    check(`${lang} completed scene off the line: HUD and note report λ_min < 0 and the spikes`, m.preset === null && m.delta === 0.4 && [hs, note].every((x) => new RegExp(`λmin < 0(?:（值| \\(value) ≈ ${f4(m.lambda)}`).test(x)) && /反事实|[Cc]ounterfactual/.test(hs), hs);
  }
  await layout(page, lang + ' completed scene, everything off');
  await page.click('#deltaZero');
  await settle(page);
  check(`${lang} the δ = 0 chip works in every scene`, (await state()).delta === 0 && !/< 0/.test(await textOf('hudSub')));
  // modes and offset belong to the ring: from the two scenes without it they open the scene that shows them
  await pick(SWAP);
  await input('#modesRange', 7);
  {
    const m = await state();
    check(`${lang} modes from the swap card open the glue scene with everything kept`, m.scene === 'glue' && m.K === 7 && m.beta === 1 && m.delta === 0 && m.preset === null && Number(await page.inputValue('#modesRange')) === 7);
  }
  await pick(CREASES);
  await input('#deltaRange', 0.3);
  {
    const m = await state();
    check(`${lang} the offset from the lantern card opens the off-line scene (K = 0: nothing to move)`, m.scene === 'offline' && m.delta === 0.3 && m.K === 0 && m.beta === 0 && (await textOf('hudSub')).includes('K = 0'));
  }
  // the swap card along its rail
  await pick(SWAP);
  await seek(0.5);
  check(`${lang} swap card at β = 0.50: note and HUD report the live jump`, (await textOf('presetNote')).includes('36.93°') && (await textOf('hudSub')).includes('36.93°') && (await textOf('hudBig')).includes('36.93°'));
  await pick(GLUE);
  await seek(0);
  check(`${lang} glue card at K = 0: no image, seams named, no claim about 24 pairs`, (await textOf('presetNote')).includes('K = 0') && (await textOf('hudSub')).includes('η = 1.0000') && !(await textOf('hudSub')).includes('24'));
}

/* ---------- every relation the page prints, in every area, over the cards, languages, lenses and layouts ---------- */
const APART = '(?:（值| \\(value)';
const LANTERNS = new Map();
const lanternAt = (n) => {
  if (!LANTERNS.has(n)) LANTERNS.set(n, lanternByTriangles(n, n * n));
  return LANTERNS.get(n);
};
/** The quantities the page writes a relation of at the frame v: [name, fraction or null, double, off, unit]. */
function relationTable(v) {
  const zeroIf = (c) => (c ? intN(0) : null),
    oneIf = (c) => (c ? intN(1) : null),
    d = centN(v.delta),
    on = v.delta === 0,
    us = fourImages(GAMMA[0], v.delta),
    // ln ‖u₊‖ = ½ ln(1 + 2 δ/‖1/2 − δ + iγ‖²), to full accuracy
    a = 0.5 * Math.log1p((2 * v.delta) / ((0.5 - v.delta) ** 2 + GAMMA[0] ** 2)),
    lam = v.K ? lambdaOf(v.delta) : 0,
    lamRow = [zeroIf(on || !v.K), lam],
    out = [oneIf(on), C.abs(us[2]), { 1: Math.expm1(a) }],
    inn = [oneIf(on), C.abs(us[0]), { 1: Math.expm1(-a) }],
    norm1 = [oneIf(on), v.K ? C.abs(us[2]) : 1, { 1: Math.expm1(a) }],
    crease = creaseN(v.beta),
    jump = [zeroIf(v.beta === 1), crease.jump, {}, '°'],
    defect = [v.beta === 1 ? intN(0) : v.beta === 0 ? intN(36) : null, crease.defect, {}, '°'],
    drift = [zeroIf(v.beta === 1), crease.drift],
    lant = lanternAt(v.n),
    gap = [v.n === 3 ? HALF : null, 2 * Math.sin(PI / (2 * v.n)) ** 2],
    tilt = [null, lant.tilt, {}, '°'],
    w = GAMMA.map((g) => 1 / (0.25 + g * g)),
    eta = [v.K === 0 ? intN(1) : zeroIf(v.K === 24), 1 - w.slice(0, v.K).reduce((x, y) => x + y, 0) / w.reduce((x, y) => x + y, 0)],
    base = [null, Math.exp(-v.y / 2)],
    spike = [null, Math.exp((v.delta - 0.5) * v.y)],
    y = atY(v.y),
    worst = [y.worstQ, numN(y.worstQ), {}, '%'];
  return {
    ratio: lant.ratio,
    split: [out, inn],
    rows: [
      ['λmin', ...lamRow],
      [`λmin < 0${APART}`, ...lamRow],
      ['‖u1‖|‖u\\+‖', ...out],
      ['‖uk‖', ...norm1],
      ['‖u−‖', ...inn],
      ['Xδ−1/2', ...spike],
      ['X−1/2|残差|residual', ...base],
      ['η', ...eta],
      ['跳变|jump(?: is| of)?|TpM ·', ...jump],
      ['亏角|各亏|defect|loses', ...defect],
      ['(?<!原来的切板，棱角)外漂|(?<!stood, corner )drift', ...drift],
      ['原来的切板，棱角外漂|stood, corner drift', null, creaseN(0).drift],
      ['最大距离|from the cylinder is', ...gap],
      ['法向斜|tilted(?: by)?', ...tilt],
      ['π⁴/4\\)', null, Math.sqrt(1 + PI ** 4 / 4)],
      ['β', centN(v.beta), v.beta],
      ['(?<!1/2 \\+ )(?<!线框与 )(?<!places at )δ', d, v.delta],
      ['线框与 δ|places at δ', [1n, 4n], 0.25],
      ['σ(?: = 1/2 \\+ δ)?', addN(HALF, d), 0.5 + v.delta],
      ['ln X', centN(v.y), v.y],
      ['最大份额偏离|share gap(?: of the six classes mod 7)?', ...worst],
      ['U\\(X\\)/X1/2', null, y.half],
      ['U\\(X\\)/X3/4', null, y.more],
      ['从|from', null, Math.exp(-0.5)],
      ['退到|to', null, Math.exp(-5)]
    ],
    lists: {
      roKey: [lamRow],
      roCayley: [out, inn, [zeroIf(on), Math.expm1(a)]],
      roCrease: [jump, defect, drift],
      roLantern: [v.n, v.n * v.n, 'ratio', tilt],
      roDecay: [spike, base, eta],
      roExplicit: [[null, y.lhs], [null, y.rhs], [null, y.gap], [null, y.tail]],
      roChannels: [worst, [null, y.error], [null, y.bound], [null, y.chi]],
      betaOut: [[centN(v.beta), v.beta]],
      modesOut: [v.K],
      deltaOut: [[d, v.delta], ['σ', addN(HALF, d), 0.5 + v.delta]]
    }
  };
}
const ITEM = new RegExp(`^([=≈]) (${VALUE})(°|%)?$`);
/** What is wrong with one printed item of a list; '' when it is right. */
function wrongItem(x, want, table) {
  if (typeof want === 'number') return x === `= ${want}` ? '' : `integer ${want}`;
  if (want === 'ratio') return x === `≈ ×${table.ratio.toFixed(4)}` ? '' : `ratio ${table.ratio}`;
  const named = typeof want[0] === 'string' ? want[0] : '',
    [q, v, off, unit] = named ? want.slice(1) : want,
    m = ITEM.exec(named && x.startsWith(named + ' ') ? x.slice(named.length + 1) : named ? '' : x);
  if (!m) return 'no relation';
  if ((m[3] || '') !== (unit || '')) return `unit ${unit}`;
  return wrongRelation(m[1], m[2], q, v, off, unit);
}
/** The relations found in a text, the wrong ones, and the printed values no row of the table stands for. */
function relations(text, table) {
  const x = text.replace(/\s+/g, ' '),
    bad = [],
    audited = new Set();
  let count = 0;
  const take = (end, whole, sign, printed, q, v, off, unit, seenUnit) => {
    count++;
    audited.add(end);
    const why = (unit || '') !== (seenUnit || '') ? `unit ${unit}` : wrongRelation(sign, printed, q, v, off, unit);
    if (why) bad.push(`${whole} [${why}]`);
  };
  // the pair of values behind the double inequality
  for (const m of x.matchAll(/‖u\+‖ > 1 > ‖u−‖(?:（值 | \(values )([^）)]*)[）)]/g)) {
    const from = m.index + m[0].indexOf(m[1]),
      items = [...m[1].matchAll(new RegExp(`([=≈]) (${VALUE})`, 'g'))];
    if (items.length !== 2 || m[1].split(/、|, /).length !== 2) bad.push(`${m[0]} [list]`);
    else items.forEach((it, i) => take(from + it.index + it[0].length, it[0], it[1], it[2], ...table.split[i]));
  }
  for (const m of x.matchAll(/≈ ×(\d+\.\d{4})/g)) {
    count++;
    audited.add(m.index + m[0].length);
    if (m[1] !== table.ratio.toFixed(4)) bad.push(`${m[0]} [ratio ${table.ratio}]`);
  }
  for (const [name, q, v, off, unit] of table.rows) for (const m of x.matchAll(new RegExp(`(?:${name}) ([=≈]) (${VALUE})(°|%)?`, 'g'))) take(m.index + m[0].length - (m[3] || '').length, m[0], m[1], m[2], q, v, off, unit, m[3]);
  // nothing is printed outside the audit: every value after a relation sign is one of those above
  for (const m of x.matchAll(new RegExp(`[=≈] ×?(${VALUE})`, 'g'))) if (!audited.has(m.index + m[0].length)) bad.push(`${x.slice(Math.max(0, m.index - 24), m.index + m[0].length)} [not audited]`);
  return { count, bad };
}
{
  // the audit itself: a relation of the wrong kind, a rounding in the wrong digit and a landmark of another value are all found
  const at = (over) => relationTable({ scene: 'offline', beta: 1, K: 24, delta: 0.25, y: 7, n: 6, ...over });
  const wrong = [
      ['λmin = −0.2932', at({})],
      ['λmin ≈ −0.2933', at({})],
      ['λmin ≈ 0.0000', at({ delta: 0 })],
      ['λmin < 0（值 = −0.2932）', at({})],
      ['‖u+‖ ≈ 1.0000', at({ delta: 0.01 })],
      ['‖u+‖ = 1.0000', at({ delta: 0.01 })],
      ['‖u+‖ > 1 > ‖u−‖（值 ≈ 0.9988、≈ 1.0013）', at({})],
      ['‖uk‖ ≈ 1.0000', at({ delta: 0 })],
      ['法向跳变 = 63.43°', at({ beta: 0 })],
      ['法向跳变 ≈ 0.00°', at({})],
      ['各亏 ≈ 36.00°', at({ beta: 0 })],
      ['最大距离 ≈ 0.5000', at({ n: 3 })],
      ['面积 ≈ ×4.7038', at({})],
      ['Xδ−1/2 = 0.1738', at({})],
      ['η ≈ 1.0000', at({ K: 0 })],
      ['δ ≈ 0.25', at({})],
      ['σ = 1/2 + δ = 0.25', at({})],
      ['最大份额偏离 = 1.42%', at({ y: 10 })],
      ['完全没有名字的量 ≈ 0.1234', at({})]
    ].filter(([x, table]) => !relations(x, table).bad.length),
    right = [
      ['反事实 σ = 1/2 + δ = 0.75：第一对的像裂开，‖u+‖ > 1 > ‖u−‖（值 ≈ 1.0013、≈ 0.9988），λmin < 0（值 ≈ −0.2932）；棱角高 Xδ−1/2 ≈ 0.1738。', at({})],
      ['‖u+‖ ≈ 1 + 4.999×10⁻⁵', at({ delta: 0.01 })],
      ['‖u+‖ = ‖u−‖ = 1.0000，λmin = 0.0000 ≥ 0；残差 X−1/2 ≈ 0.0302', at({ delta: 0 })],
      ['灯笼离柱面的最大距离 = 0.5000，面积却是柱面的 ≈ ×' + lanternAt(3).ratio.toFixed(4) + ' 倍', at({ n: 3 })],
      ['各亏 = 36.00°', at({ beta: 0 })]
    ].filter(([x, table]) => relations(x, table).bad.length || !relations(x, table).count);
  check('the audit of relations finds nineteen wrong texts and leaves five right ones', !wrong.length && !right.length, JSON.stringify([wrong.map((x) => x[0]), right.map((x) => [x[0], relations(...x).bad])]));
}
/** Put a page through frames (each a list of [range input, value]) in both languages and lenses, and read everything it writes. */
const readFrames = (p, frames) =>
  p.evaluate((frames) => {
    const text = (sel) => (document.querySelector(sel) || { textContent: '' }).textContent.replace(/\s+/g, ' ').trim(),
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
          const s = window.RIEMANN_POLISH_DEBUG.state;
          out.push({
            lang,
            lens: s.lens,
            preset: s.preset,
            v: { scene: s.scene, beta: s.beta, K: s.K, delta: s.delta, y: s.y, n: s.n },
            texts: Object.fromEntries(['#keyPill', '#scenePill', '#hudBig', '#hudSub', '#presetNote', '#tour .tour-note', '#roKeySub', '#roNote', '#tau', '#legend', '#plotTitle', '#plotMeta', '#plotTitleB', '#plotMetaB'].map((x) => [x, text(x)])),
            lists: Object.fromEntries(['roKey', 'roCayley', 'roCrease', 'roLantern', 'roDecay', 'roExplicit', 'roChannels', 'betaOut', 'modesOut', 'deltaOut'].map((x) => [x, text('#' + x)])),
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
const areaTexts = (p = page, areas = ['#hudTl', '#readouts', '#basis', '#drawer', '#ctlPanel', 'header.top', 'footer.rail', '#tour', '#rail', '.strip', '#legend', '.stage .tags']) =>
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
// the places of the rail, between them, and the sliders out of every scene
const at7 = (n) => [['now', (n - 3) / 7]];
const SWEEPS = {
  [CREASES]: [...[3, 4, 5, 6, 7, 10].map(at7), [['now', 0.37]], [['betaRange', 0.4]], [['modesRange', 5]], [['deltaRange', 0.3]]],
  [SWAP]: [...[0, 0.01, 0.25, 0.37, 0.5, 0.99, 1].map((x) => [['now', x]]), [['modesRange', 7]], [['deltaRange', 0.01]]],
  [GLUE]: [...[0, 1 / 24, 0.5, 23 / 24, 1].map((x) => [['now', x]]), [['betaRange', 0.4]], [['deltaRange', 0.01]], [['deltaRange', 0.25], ['modesRange', 0]], [['deltaRange', 0], ['betaRange', 1]]],
  [OFFLINE]: [...[0, 0.025, 0.2, 0.3333, 0.625, 1].map((x) => [['now', x]]), [['modesRange', 5]], [['modesRange', 0]], [['deltaRange', 0]], [['modesRange', 24], ['betaRange', 0]]],
  [POLISHED]: [...[0, 0.1, 1 / 3, 0.5, 0.777, 1].map((x) => [['now', x]]), [['betaRange', 0.4]], [['modesRange', 5]], [['deltaRange', 0.02]], [['deltaRange', 0.4]], [['deltaRange', 0], ['modesRange', 24], ['betaRange', 1]]]
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
      unmarked = [],
      zeros = [];
    let count = 0;
    for (const f of frames) {
      const table = relationTable(f.v),
        label = `${f.lang}/lens ${f.lens}/${f.v.scene}, β = ${f.v.beta}, K = ${f.v.K}, δ = ${f.v.delta}, ln X = ${f.v.y}, n = ${f.v.n}`;
      for (const [sel, x] of [...Object.entries(f.texts), ...f.tags.map((t) => ['label', t])]) {
        const r = relations(x, table);
        count += r.count;
        bad.push(...r.bad.map((b) => `${label} ${sel}: ${b}`));
        beside.push(...mixed(x).map((b) => `${label} ${sel}: ${b}`));
        if (/NaN|undefined|Infinity|∞(?!<)/.test(x.replace(/C∞|n → ∞/g, ''))) bad.push(`${label} ${sel}: ${x}`);
        // a printed 0.0000 or 0.00° is an exact zero: never the rounding of a residue
        if (/≈ −?0\.0+(?![\d×])/.test(x)) zeros.push(`${label} ${sel}: ${x}`);
      }
      for (const [key, x] of Object.entries(f.lists)) {
        beside.push(...mixed(x).map((b) => `${label} #${key}: ${b}`));
        if (key === 'roCayley' && f.v.K === 0) {
          if (!/^K = 0[：:]/.test(x)) unmarked.push(`${label} #${key}: ${x}`);
          continue;
        }
        const parts = x.split(' · '),
          want = table.lists[key];
        if (parts.length !== want.length) unmarked.push(`${label} #${key}: ${x}`);
        else
          parts.forEach((y, i) => {
            const why = wrongItem(y, want[i], table);
            count++;
            if (why) bad.push(`${label} #${key}: ${y} [${why}]`);
          });
      }
      const tau = { lantern: `n = ${f.v.n} · m = ${f.v.n ** 2}`, swap: `β = ${f2(f.v.beta)}`, glue: `K = ${f.v.K}`, offline: `δ = ${f2(f.v.delta)}`, polished: `ln X = ${f2(f.v.y)}` }[f.v.scene];
      if (f.texts['#tau'] !== tau) unmarked.push(`${label} #tau: ${f.texts['#tau']}`);
      if (!f.texts['#keyPill'].includes('λmin ' + (f.v.delta === 0 || !f.v.K ? '= 0.0000' : '≈ −'))) unmarked.push(`${label} #keyPill: ${f.texts['#keyPill']}`);
      for (const t of f.tags) if (/\d\.\d/.test(t) && !/[=≈] ×?[−\d]/.test(t)) unmarked.push(`${label} label: ${t}`);
    }
    check(`${where}/${id}: in ${frames.length} frames every printed relation is “=” before the value itself or “≈” before its rounding (${count} relations)`, frames.length >= 36 && count >= 24 * frames.length && !bad.length, `${count} of ${frames.length}: ${[...new Set(bad)].slice(0, 5).join(' ¦ ')}`);
    check(`${where}/${id}: every value of the rail, the sliders, the readouts and the labels carries its relation`, !unmarked.length, [...new Set(unmarked)].slice(0, 4).join(' ¦ '));
    check(`${where}/${id}: no rounding is printed as zero`, !zeros.length, zeros.slice(0, 3).join(' ¦ '));
    for (const [sel, x] of await areaTexts(p)) beside.push(...mixed(x).map((b) => `${sel}: ${b}`));
    check(`${where}/${id}: no rounded digits stand beside <, >, ≤ or ≥ in the HUD, the readouts, the evidence, the drawer, the notes, the labels, the rail and the strips, nothing exempt`, !beside.length, [...new Set(beside)].slice(0, 4).join(' ¦ '));
    await p.context().close();
  }
{
  // between two cards the drawing blends: a parameter off the grid stands behind “≈”, on the slider as in the readout
  await setLang('zh');
  await pick(SWAP);
  const seen = await page.evaluate(async () => {
    const flat = (q) => document.querySelector(q).textContent.replace(/\s+/g, ' '),
      out = [];
    document.querySelector('[data-preset="riemann-1854-tangent-lantern-creases"]').click();
    for (let k = 0; k < 400; k++) {
      await new Promise((r) => requestAnimationFrame(r));
      out.push({ beta: flat('#betaOut'), delta: flat('#deltaOut'), sub: flat('#roKeySub') });
      if (k > 3 && !window.RIEMANN_POLISH_DEBUG.state.blending) break;
    }
    return out;
  });
  const agree = (x) => x.sub.includes(`β ${x.beta} ·`) && x.sub.includes(`δ ${x.delta.split(' · ')[0]} ·`),
    prints = await page.evaluate(() => [0.5378, 0.54, 0.999999].map((x) => window.RIEMANN_POLISH_DEBUG.print.rel(x, 2).replace(/\s+/g, ' ')));
  check('between two cards the slider and the readout say the same relation of the blended parameters; a double off the grid is rounded behind “≈” and never printed as 1', seen.length > 0 && seen.every(agree) && seen.filter((x) => /^≈/.test(x.beta)).every((x) => /^≈ (?:0\.\d\d|1 − |\d\.\d{3}×)/.test(x.beta)) && same(prints, ['≈ 0.54', '≈ 0.54', '≈ 1 − 1.000×10⁻⁶']), JSON.stringify([seen.filter((x) => !agree(x)).slice(0, 2), prints]));
  await pick(POLISHED);
}

/* ---------- the stage-first contract on the five cards, in both languages, on a desktop and on a phone ---------- */
for (const lang of ['zh', 'en'])
  for (const [where, width, height, least] of [
    ['desktop', 1440, 900, 0.28],
    ['narrow desktop', 1081, 768, 0.17],
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
        dom = await p.evaluate((cid) => {
          const b = document.querySelector(`[data-preset="${cid}"]`),
            top = (q) => document.querySelector(q).getBoundingClientRect().top,
            sizes = (q) => [...document.querySelectorAll(q)].filter((el) => el.getClientRects().length && el.scrollWidth > el.clientWidth + 1).map((el) => el.id || el.className);
          return { tourShown: document.querySelector('#tour').getClientRects().length > 0, pressed: b.getAttribute('aria-pressed'), note: document.querySelector('#presetNote').textContent.trim().length, tour: document.querySelector('#tour .what').textContent.trim().length, stage: top('#stage'), deck: top('#rail'), strip: top('.strip'), tourTop: top('#tour'), wide: sizes('#readouts dd, #readouts .note, #basis .lean, .field output, .pill, #tau'), height: document.documentElement.scrollHeight };
        }, id);
      check(
        `stage first ${lang}/${where} ${width}×${height}/${id}: the stage holds its share, the regions and labels keep clear, the card is marked and explained`,
        share >= least && !view.layout.length && !view.hud.length && !labels.length && !left.length && (await overflowX(p)) <= 0 && dom.pressed === 'true' && dom.note > 10 && dom.tour > 10 && dom.stage < dom.strip && (width > 1080 ? !dom.tourShown : dom.tourShown && dom.stage < dom.tourTop && dom.tourTop < dom.strip && dom.stage < dom.deck) && !dom.wide.length,
        JSON.stringify({ share, view: [...view.layout, ...view.hud].slice(0, 3), labels: labels.slice(0, 3), left: left.slice(0, 3), dom })
      );
      const m = await state(p);
      check(`stage first ${lang}/${where}/${id}: the card rests on its still and its scene`, near(m.t, CARDS[id].still, 1e-12) && m.scene === CARDS[id].scene && !m.playing && !m.blending);
      // a full-page capture stops at 8192 px: the phone page stays below 8000 on every card
      if (width === 390) check(`stage first ${lang}/phone/${id}: the whole page is shorter than 8000 px`, dom.height > 2000 && dom.height < 8000, String(dom.height));
    }
    if (width === 390) {
      const wraps = await p.evaluate(() => [...document.querySelectorAll('#basis .lean')].every((el) => { const b = el.getBoundingClientRect(), k = el.querySelector('.ok').getBoundingClientRect(); return k.left >= b.left && k.top >= b.top && k.right < b.left + b.width / 2 && el.scrollWidth <= el.clientWidth + 1; }));
      check(`${lang}/phone: the badges stand at the head of their boxes and the statements use the whole line`, wraps);
    }
    await p.context().close();
  }

/* ---------- lenses, views, handle ---------- */
await setLang('zh');
await pick(GLUE);
{
  const before = await state(),
    plain = await primitiveColours(),
    name0 = await textOf('hudBig');
  await page.click('#lensToggleBtn');
  await settle(page);
  const on = await state(),
    over = await primitiveColours();
  const ghosts = (x) => x.seen.filter((s) => s.n === 'line' && s.colors.includes(x.magenta)).length;
  check('the contrast lens keeps the state, renames the picture and overlays 30 plate edges and 12 off-line places', on.lens === 1 && ['beta', 'K', 'delta', 'y', 'n', 't', 'preset', 'scene', 'lambda'].every((k) => same(on[k], before[k])) && (await textOf('hudBig')) !== name0 && ghosts(plain) === 0 && ghosts(over) === 42, String(ghosts(over)));
  check('the legend names the overlay', (await textOf('legend')).includes('δ = 0.25'));
  check('both lens switches are in step', same(await Promise.all(['#lensToggleBtn', '#mobileLensBtn'].map((s) => page.getAttribute(s, 'aria-pressed'))), ['true', 'true']));
  const seg = await page.locator('#lensToggleBtn').textContent();
  check('the two lens names', seg.includes('1854 + 1859 合龙 · σ = 1/2 谱圆弧磨光（MODEL）') && seg.includes('1854 切板与反事实离轴对照 · TpM 折痕 / δ ≠ 0 失稳') && seg.includes('1854 + 1859 Synthesis · σ = 1/2 Spectral Arc Polish (MODEL)') && seg.includes('1854 Plates & Off-Line Contrast · Creases & δ ≠ 0 Breakdown'));
  await page.click('#lensToggleBtn');
  await settle(page);
  check('the synthesis lens is back', (await state()).lens === 0 && ghosts(await primitiveColours()) === 0);
}
check('desktop: the mirror lens button of the tour bar stays hidden', (await page.evaluate(() => innerWidth)) > 1080 && (await page.locator('#mobileLensBtn').isHidden()));
{
  const views = [];
  for (const name of ['panorama', 'face', 'top']) {
    await page.click(`[data-cam="${name}"]`);
    await settle(page);
    views.push((await state()).camera);
    check('selected view ' + name, (await state()).cam === name && (await page.getAttribute(`[data-cam="${name}"]`, 'aria-pressed')) === 'true');
  }
  check('the three views have distinct orientations', new Set(views.map((c) => [c.yaw, c.pitch].join('/'))).size === 3);
}
for (const [id, from, to, key, tol] of [
  [CREASES, 3 / 7, 1, 'n', 1],
  [SWAP, 1, 0, 'beta', 0.12],
  [GLUE, 1, 4 / 24, 'K', 1],
  [OFFLINE, 0.625, 0.2, 'delta', 0.03],
  [POLISHED, 1, 0.35, 'y', 0.35]
]) {
  await pick(id);
  const cam = (await state()).camera,
    a = await page.evaluate((x) => window.RIEMANN_POLISH_DEBUG.dragTarget(x), from),
    b = await page.evaluate((x) => window.RIEMANN_POLISH_DEBUG.dragTarget(x), to);
  await page.mouse.move(a.x, a.y);
  await page.mouse.down();
  for (let k = 1; k <= 8; k++) await page.mouse.move(a.x + ((b.x - a.x) * k) / 8, a.y + ((b.y - a.y) * k) / 8);
  await page.mouse.up();
  await settle(page);
  const m = await state(),
    want = await page.evaluate(([k, t]) => ({ n: 3 + Math.round(7 * t), beta: t, K: Math.round(24 * t), delta: 0.4 * t, y: 1 + 9 * t })[k], [key, to]);
  check(`${id}: dragging the amber handle sets ${key} and leaves the camera alone`, Math.abs(m[key] - want) <= tol && m.preset === null && !m.playing && same(m.camera, cam), `${m[key]} of ${want}`);
}
{
  await pick(OFFLINE);
  await page.focus('#stageHandle');
  await page.keyboard.press('ArrowLeft');
  await settle(page);
  check('ArrowLeft on the handle takes one step off', near((await state()).delta, 0.24, 1e-12));
  await page.keyboard.press('Home');
  await settle(page);
  check('Home on the handle goes to δ = 0', (await state()).delta === 0);
  await page.keyboard.press('End');
  await settle(page);
  check('End on the handle goes to δ = 0.40', near((await state()).delta, 0.4, 1e-12));
}

/* ---------- strips ---------- */
/** The next frame of the two plots: every line and dot with its colour, and the axis ranges. */
const stripFrame = (p = page) =>
  p.evaluate(() => {
    const plot = TRV.kit.plot,
      out = [];
    TRV.kit.plot = (...args) => {
      const g = plot(...args),
        rec = { x: args[1].x, y: args[1].y, lines: [], dots: [] };
      out.push(rec);
      const { line, dot } = g;
      g.line = (pts, color, s) => {
        rec.lines.push({ pts: pts.map((q) => [...q]), color, dash: (s && s.dash) || null });
        return line(pts, color, s);
      };
      g.dot = (x, y, color, ...r) => {
        rec.dots.push({ x, y, color });
        return dot(x, y, color, ...r);
      };
      return g;
    };
    try {
      TRV.kit.flush();
    } finally {
      TRV.kit.plot = plot;
    }
    const { cyan, magenta, amber, violet, warn, ok } = TRV.palette;
    return { out, cyan, magenta, amber, violet, warn, ok };
  });
await pick(OFFLINE);
{
  const m = await state(),
    { out, cyan, magenta, amber } = await stripFrame();
  const [A, B] = out,
    pick1 = (rec, color, dash) => rec.lines.find((l) => l.color === color && !!l.dash === dash && l.pts.length > 2);
  check('strip 1: ln X ∈ [1, 10], the cyan X^{−1/2} and its dashed envelope X^{−1/2}(1 + 0.15 ln² X)', same(A.x, [1, 10]) && pick1(A, cyan, false).pts.every(([x, v]) => near(v, Math.exp(-x / 2), 1e-12)) && pick1(A, cyan, true).pts.every(([x, v]) => near(v, Math.exp(-x / 2) * (1 + 0.15 * x * x), 1e-12)) && near(pick1(A, cyan, false).pts.at(-1)[0], 10, 1e-9));
  check('strip 1: the magenta X^{δ−1/2} at the current δ stays above the cyan line', pick1(A, magenta, false).pts.every(([x, v]) => near(v, Math.exp((m.delta - 0.5) * x), 1e-12) && v > Math.exp(-x / 2)));
  check('strip 2: δ ∈ [0, 0.40], λ_min of the first pair against dense eigenvalues, 0 only at δ = 0', same(B.x, [0, 0.4]) && pick1(B, magenta, false).pts.every(([x, v], i) => (i === 0 ? x === 0 && v === 0 : v < 0)) && [8, 40, 80].every((i) => near(pick1(B, magenta, false).pts[i][1], leastEigenvalue(toeplitz(fourImages(GAMMA[0], pick1(B, magenta, false).pts[i][0])).M), 1e-9)));
  check('strip 2: the dashed line is 200 (‖u₊‖ − 1)', pick1(B, magenta, true).pts.every(([x, v]) => near(v, 200 * (C.abs(fourImages(GAMMA[0], x)[2]) - 1), 1e-9)) && B.dots.some((d) => d.color === cyan && d.x === 0 && d.y === 0));
  for (const [rec, x, y] of [
    [A, m.y, m.spike],
    [B, m.delta, m.lambda]
  ]) {
    const cursor = rec.lines.filter((l) => l.color === amber),
      dots = rec.dots.filter((d) => d.color === amber);
    check('one amber cursor and dot at the current value', cursor.length === 1 && cursor[0].pts.every((q) => near(q[0], x, 1e-12)) && dots.length === 1 && near(dots[0].x, x, 1e-12) && near(dots[0].y, y, 1e-12));
    const top = Math.max(...rec.lines.filter((l) => l.color !== amber).flatMap((l) => l.pts.map((q) => q[1])));
    const worst = rec === A ? Math.exp(-0.1) : top;
    check('≥ 35% of the range is headroom above the highest curve', (rec.y[1] - worst) / (rec.y[1] - rec.y[0]) >= 0.35, String((rec.y[1] - worst) / (rec.y[1] - rec.y[0])));
  }
  check('the strips draw in cyan, magenta and amber only', out.every((rec) => [...rec.lines, ...rec.dots].every((l) => [cyan, magenta, amber].includes(l.color))));
  await seek(0);
  const zero = await stripFrame();
  check('strip 1 at δ = 0: nothing magenta is drawn', !zero.out[0].lines.some((l) => l.color === zero.magenta));
}
/** The least gap (px) between the legend rows of both plots (key strokes and ink boxes) and every curve, as painted. */
const legendGaps = (p) =>
  p.evaluate(() => {
    const plot = TRV.kit.plot,
      res = [];
    TRV.kit.plot = (...args) => {
      const g = plot(...args),
        rec = { gap: Infinity, cursor: Infinity, rows: 0, overflow: false };
      res.push(rec);
      const curves = [],
        line = g.line,
        legend = g.legend;
      g.line = (pts, color, s) => {
        curves.push({ pts: pts.map((q) => [g.X(q[0]), g.Y(q[1])]), amber: color === TRV.palette.amber });
        return line(pts, color, s);
      };
      g.legend = (...rest) => {
        const ctx = g.ctx,
          { fillText, moveTo, lineTo } = ctx,
          boxes = [];
        let from = null;
        ctx.fillText = function (text, x, y, ...more) {
          const m = ctx.measureText(text);
          boxes.push({ l: x - m.actualBoundingBoxLeft, r: x + m.actualBoundingBoxRight, t: y - m.actualBoundingBoxAscent, b: y + m.actualBoundingBoxDescent });
          return fillText.call(this, text, x, y, ...more);
        };
        ctx.moveTo = function (x, y) {
          from = [x, y];
          return moveTo.call(this, x, y);
        };
        ctx.lineTo = function (x, y) {
          if (from) {
            boxes.push({ l: Math.min(from[0], x), r: Math.max(from[0], x), t: Math.min(from[1], y) - 1, b: Math.max(from[1], y) + 1 });
            rec.rows++;
          }
          return lineTo.call(this, x, y);
        };
        try {
          legend(...rest);
        } finally {
          delete ctx.fillText;
          delete ctx.moveTo;
          delete ctx.lineTo;
        }
        for (const b of boxes) {
          if (b.l < g.pl - 0.5 || b.r > g.pl + g.iw + 0.5) rec.overflow = true;
          for (const c of curves) {
            if (c.amber) {
              const x = c.pts[0][0],
                top = Math.min(...c.pts.map((q) => q[1]));
              if (x >= b.l - 3 && x <= b.r + 3) rec.cursor = Math.min(rec.cursor, top - b.b);
              continue;
            }
            for (let i = 1; i < c.pts.length; i++) {
              const [x0, y0] = c.pts[i - 1],
                [x1, y1] = c.pts[i];
              if (x1 < b.l || x0 > b.r) continue;
              for (const u of [0, 0.5, 1]) {
                const y = y0 + (y1 - y0) * u;
                rec.gap = Math.min(rec.gap, y - 1 > b.b ? y - 1 - b.b : y + 1 < b.t ? b.t - y - 1 : -1);
              }
            }
          }
        }
        return undefined;
      };
      return g;
    };
    try {
      TRV.kit.flush();
    } finally {
      TRV.kit.plot = plot;
    }
    return { res, canvas: ['#plot', '#plotB'].map((s) => document.querySelector(s).clientHeight) };
  });
async function legendChecks(p, label) {
  await p.evaluate(() => document.querySelector('.strip').scrollIntoView({ block: 'center' }));
  for (const d of [0, 0.1, 0.25, 0.4]) {
    await input('#deltaRange', d, p);
    const g = await legendGaps(p);
    check(`${label}, δ = ${d}: the legends stay ≥ 10 px clear of every curve and off the cursor`, g.res.length === 2 && g.res.every((r) => r.rows === 3 && r.gap >= 10 && r.cursor > 0 && !r.overflow), JSON.stringify(g));
  }
  await p.evaluate(() => scrollTo(0, 0));
}
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  await pick(OFFLINE);
  await legendChecks(page, lang + ' desktop');
}
{
  // no warning colour on the strips and on the stage, in pixels of the plots and in styles of the DOM
  const bad = await page.evaluate(() => {
    const colour = (v) => {
      const s = document.createElement('span');
      s.style.color = `var(${v})`;
      document.body.appendChild(s);
      const c = getComputedStyle(s).color;
      s.remove();
      return c;
    };
    const warn = colour('--warn'),
      ok = colour('--ok'),
      amber = colour('--amber'),
      out = [];
    const rgb = warn.match(/[\d.]+/g).slice(0, 3).map(Number);
    for (const id of ['#plot', '#plotB']) {
      const cv = document.querySelector(id),
        copy = document.createElement('canvas');
      copy.width = cv.width;
      copy.height = cv.height;
      const c = copy.getContext('2d', { willReadFrequently: true });
      c.drawImage(cv, 0, 0);
      const d = c.getImageData(0, 0, copy.width, copy.height).data;
      for (let i = 0; i < d.length; i += 4) if (d[i + 3] > 200 && rgb.every((x, k) => Math.abs(d[i + k] - x) < 8)) out.push(id + ' warn pixel');
    }
    const props = ['color', 'backgroundColor', 'borderTopColor', 'borderLeftColor'];
    for (const el of document.querySelectorAll('#stage *, .strip *, #readouts *, .field output')) {
      if (el.closest('.handle') || el.matches('.hud-bl .sw.am')) continue;
      for (const p of props) if ([warn, ok, amber].includes(getComputedStyle(el)[p])) out.push(`${el.id || el.className || el.tagName} ${p}`);
    }
    for (const el of document.querySelectorAll('body *')) {
      if (el.closest('.lean.open')) continue;
      for (const p of props) if (getComputedStyle(el)[p] === warn) out.push(`red outside the OPEN box: ${el.id || el.className || el.tagName} ${p}`);
    }
    for (const el of document.querySelectorAll('#basis .lean:not(.open), #basis .lean:not(.open) *')) if (props.some((p) => getComputedStyle(el)[p] === amber)) out.push('amber in the evidence ' + el.className);
    return { out: out.slice(0, 4), open: getComputedStyle(document.querySelector('#basis .lean.open .ok')).color === warn };
  });
  check('red only on the OPEN box, green and amber off the stage, the strips and the readouts', !bad.out.length && bad.open, JSON.stringify(bad));
}

/* ---------- narrow pages, cited figures, embeds and stills ---------- */
const FIGURE_TEXT = {
  [CREASES]: ['≈ 63.43°', 'n = 6', 'm = 36', '≈ ×4.7037'],
  [SWAP]: ['β = 1', '= 0.00°'],
  [GLUE]: ['24'],
  [OFFLINE]: ['δ = 0.25'],
  [POLISHED]: ['ln X = 10.00', '≈ 0.0067', '≈ 1.42%']
};
const pressed = (p) => Promise.all(['#mobileLensBtn', '#lensToggleBtn'].map((s) => p.getAttribute(s, 'aria-pressed')));
async function mirrorLens(p, label) {
  await p.evaluate(() => scrollTo(0, 0));
  const geo = await p.evaluate(() => {
    const box = (s) => {
      const b = document.querySelector(s).getBoundingClientRect();
      return { l: b.left, r: b.right, t: b.top, b: b.bottom };
    };
    const btn = document.querySelector('#mobileLensBtn');
    return { btn: box('#mobileLensBtn'), stage: box('#stage'), tour: box('#tour'), row: [box('#prevBtn'), box('#tour .what b'), box('#nextBtn')], clipped: btn.scrollWidth > btn.clientWidth + 0.5, vh: innerHeight };
  });
  const meet = (a, b) => a.l < b.r - 0.5 && b.l < a.r - 0.5 && a.t < b.b - 0.5 && b.t < a.b - 0.5;
  check(label + ' the mirror lens button sits in the tour bar under the stage, on the first screen, overlapping nothing', geo.btn.t >= geo.stage.b - 0.5 && geo.btn.b <= geo.vh && geo.btn.l >= geo.tour.l - 0.5 && geo.btn.r <= geo.tour.r + 0.5 && !geo.clipped && geo.row.every((b) => !meet(geo.btn, b)) && (await overflowX(p)) === 0, JSON.stringify(geo));
  const before = await state(p);
  await p.click('#mobileLensBtn');
  await settle(p);
  const on = await state(p);
  check(label + ' the mirror lens button switches the lens, syncs both switches and keeps the state', before.lens === 0 && on.lens === 1 && same(await pressed(p), ['true', 'true']) && ['beta', 'K', 'delta', 'y', 'n', 't', 'preset'].every((k) => same(on[k], before[k])));
  await layout(p, label + ' contrast lens');
  await p.click('#mobileLensBtn');
  await settle(p);
  check(label + ' and back', (await state(p)).lens === 0 && same(await pressed(p), ['false', 'false']));
}
for (const lang of ['zh', 'en']) {
  for (const [width, height, figure] of [
    [390, 844, false],
    [334, 500, true],
    [740, 500, true]
  ]) {
    colorScheme = width === 390 ? 'light' : 'dark';
    const p = await T.open(BOOK, ID, '?lang=' + lang + (figure ? '&embed=1&preset=' + DEFAULT : ''), { viewport: { width, height }, reducedMotion: 'reduce' });
    await settle(p);
    const visited = new Set();
    for (let j = 0; j < 5; j++) {
      const s = await state(p),
        id = s.preset;
      visited.add(id);
      check(`${lang}/${width}/${id} under reduced motion the card parks on its still`, near(s.t, CARDS[id].still, 1e-12) && !s.playing && !s.blending);
      await layout(p, `${lang}/${width}/${id}`, figure);
      if (lang === 'en') check(`English ${width}/${id}`, !(await cjkLeftovers(p)).length);
      if (!figure) {
        const fold = await p.evaluate(() => ({ bottom: document.querySelector('#mobileLensBtn').getBoundingClientRect().bottom + scrollY, stage: document.querySelector('#stage').getBoundingClientRect().height, vh: innerHeight }));
        check(`${lang}/390/${id}: the stage keeps ≥ 440 px and the mirror lens button ends inside the first screen`, (await p.locator('#mobileLensBtn').isVisible()) && fold.stage >= 440 && fold.bottom <= fold.vh, JSON.stringify(fold));
      } else {
        const note = (await p.locator('.tour .tour-note').innerText()).replace(/\s+/g, ' ');
        check(`${lang}/${width} cited frame of ${id}: strip hidden, one sentence with the numbers of the still, no scripts`, (await p.locator('.strip').isHidden()) && FIGURE_TEXT[id].every((x) => note.includes(x)) && (await p.locator('.tour .tour-note sub, .tour .tour-note sup').count()) === 0, note);
        check(`${lang}/${width} cited frame of ${id}: no mirror lens button`, await p.locator('#mobileLensBtn').isHidden());
      }
      await p.locator('.tour [data-tour="next"]').click();
      await settle(p);
    }
    check(`${lang}/${width} the tour visits all five cards`, visited.size === 5);
    if (figure) {
      // ⏮ in a cited off-line frame: the note follows the frame
      while ((await state(p)).preset !== OFFLINE) {
        await p.locator('.tour [data-tour="next"]').click();
        await settle(p);
      }
      await p.locator(width === 740 ? '#rewindBtn' : '#rew').click();
      await settle(p);
      const note = (await p.locator('.tour .tour-note').innerText()).replace(/\s+/g, ' '),
        hs = await textOf('hudSub', p);
      check(`${lang}/${width} cited off-line frame after ⏮: note and HUD speak of δ = 0 and the closed circle`, (await state(p)).delta === 0 && note.includes('δ = 0') && !note.includes('0.25') && hs.includes('0.0000 ≥ 0') && (await p.locator('.tour .tour-note sub, .tour .tour-note sup').count()) === 0, note + ' | ' + hs);
      await layout(p, `${lang}/${width} cited off-line frame after ⏮`, true);
    } else {
      await mirrorLens(p, lang + '/390');
      await legendChecks(p, lang + '/390');
    }
    await p.context().close();
  }
  for (const [width, height] of [
    [334, 620],
    [740, 620],
    [1280, 760]
  ]) {
    colorScheme = 'dark';
    const p = await T.open(BOOK, ID, '?embed=1&lang=' + lang, { viewport: { width, height }, reducedMotion: 'reduce' });
    await settle(p);
    const label = `${lang}/embed ${width}×${height}`;
    await layout(p, label);
    if (width !== 334) await mirrorLens(p, label);
    const g = await p.evaluate(() => {
      const b = (s) => {
        const r = document.querySelector(s).getBoundingClientRect();
        return { t: r.top + scrollY, b: r.bottom + scrollY, h: r.height };
      };
      return { embed: document.documentElement.hasAttribute('data-embed') && !document.documentElement.hasAttribute('data-figure'), strip: b('.strip'), plot: b('#plot'), plotB: b('#plotB'), rail: b('footer.rail'), tour: b('#tour') };
    });
    // the note under the stage follows the rail: ⏮ on the off-line card
    while ((await state(p)).preset !== OFFLINE) {
      await p.locator('.tour [data-tour="next"]').click();
      await settle(p);
    }
    const noteOf = async () => ((await p.locator('#tourBody .tour-note').textContent()) || '').replaceAll('−', '-').replace(/\s+/g, ' ');
    const at25 = await noteOf();
    await p.locator('#rew').click();
    await settle(p);
    const at0 = await noteOf();
    check(label + ' the tour note follows ⏮ from δ = 0.25 to δ = 0', /λmin < 0(?:（值| \(value) ≈ -0\.2932/.test(at25) && at0.includes('0.0000 ≥ 0') && !at0.includes('0.2932') && (await state(p)).preset === OFFLINE, at25 + ' | ' + at0);
    check(label + ' the whole-lab embed holds both plots whole between the tour bar and the rail', g.embed && g.plot.h >= 110 && g.plotB.h >= 110 && g.plot.b <= g.strip.b + 1 && g.plotB.b <= g.strip.b + 1 && g.strip.t >= g.tour.b - 1 && g.strip.b <= g.rail.t + 1, JSON.stringify(g));
    await legendChecks(p, label);
    await p.context().close();
  }
  {
    const p = await T.open(BOOK, ID, '?lang=' + lang, { viewport: { width: 1081, height: 900 }, reducedMotion: 'reduce' });
    await settle(p);
    await legendChecks(p, lang + '/1081');
    await p.context().close();
  }
  for (const id of Object.keys(CARDS)) {
    const p = await openStill(T, BOOK, ID, id, lang);
    const m = await state(p),
      prim = await primitiveColours(p);
    check(`still ${lang}/${id} parks on the declared frame, without buttons, with one amber ring`, !m.playing && near(m.t, CARDS[id].still, 1e-12) && m.preset === id && (await p.locator('#stageHandle').isHidden()) && (await p.locator('#mobileLensBtn').isHidden()) && prim.seen.filter((s) => s.colors.includes(prim.amber)).length === 1 && prim.seen.some((s) => s.n === 'ring' && s.key === 'now'));
    check(`still ${lang}/${id} stage colours`, prim.seen.every((s) => s.colors.every((c) => [prim.violet, prim.cyan, prim.magenta, prim.amber, prim.stage].includes(c))));
    const bad = await labelOverlaps(p, '.stage .tag', 0);
    check(`still ${lang}/${id} labels apart, none over the title`, !bad.length, JSON.stringify(bad));
    if (lang === 'en') check(`still en/${id}: no Chinese left`, !(await cjkLeftovers(p)).length);
    await p.context().close();
  }
}
check('permanent dark console in both system schemes', !paletteMutations.length && paletteDocuments.every((x) => x.absent) && paletteDocuments.some((x) => x.dark) && paletteDocuments.some((x) => !x.dark));
check('zero console warnings', browserWarnings.length === 0, browserWarnings.slice(0, 3).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('zero browser or request errors', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));
await T.finish();
