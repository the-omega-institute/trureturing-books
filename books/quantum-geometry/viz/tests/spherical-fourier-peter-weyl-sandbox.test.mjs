import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { session, stageFirstChecks, settle, openStill, playsAfter, cjkLeftovers, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';
import { ROOT } from '../../../../tools/node/viz-common.mjs';

const BOOK = 'quantum-geometry';
const ID = 'spherical-fourier-peter-weyl-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const SUITE = path.join(ROOT, 'books', BOOK, 'viz', 'tests', ID + '.test.mjs');
const CHAPTER = 'ch39-s37-spherical-fourier-transform-peter-weyl-synthesis.html';
const PI = Math.PI;
// scene, the parameter its rail drives, the declared still (a rail time) and the parameters of the parked frame
const CARDS = {
  'spin-harmonic-shells-and-chebyshev-kernels': { scene: 'shells', still: 0.25, kappa: 0.25, j: 1, B: 4 },
  'clebsch-gordan-causal-triad-base': { scene: 'triad', still: 1, kappa: 0.25, j: 0.5, lam: 1 },
  'gibbs-overshoot-vs-positive-spherical-smoothing': { scene: 'gibbs', still: 1, B: 24 },
  'origin-free-heap-convolution-diagonalization': { scene: 'heap', still: 1, P: 576, group: '2T' },
  'observer-bandlimit-and-tft-s3-fft': { scene: 'bandlimit', still: 4 / 7, B: 4 }
};
const IDS = Object.keys(CARDS);
const [SHELLS, TRIAD, GIBBS, HEAP, BAND] = IDS;
// the sixteen frozen declarations of thm-ch39-spherical-fourier-peter-weyl-anchors, in order
const GIDS = [
  'D5/S3/Quantum/Analysis/CompactGroups/MatrixCoefficientDensity.dense_span_unitary_coefficients',
  'D5/S3/Quantum/Analysis/CompactGroups/UnitaryRepresentationKernel.exists_unitaryRep_ker_subset',
  'D5/S3/Quantum/Analysis/CompactGroups/SchurOrthogonality.integral_dual_mul_dual_inv_self',
  'D5/S3/Quantum/Analysis/CompactGroups/SchurOrthogonality.integral_dual_mul_dual_inv_eq_zero',
  'D5/S3/FiniteGroups/GroupAlgebra/CharacterKernelRank.finrank_span_sum_character_kernel',
  'D5/S3/FiniteGroups/GroupAlgebra/UnitaryCharacterKernel.posSemidef_sum_character_kernel_iff',
  'D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul',
  'D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor',
  'D5/S3/Fourier/FullBispectrumStability.cyclic_parseval',
  'D5/S3/Analytic/CompletedZetaMellinReconstruction.completed_zeta_mellin_reconstruction',
  'D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line',
  'D5/S3/Weil/TestFunctions/FinitePowerSumToeplitzCircleCriterion.toeplitz_posSemidef_iff_norm_eq_one',
  'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift'
];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const frac = (s) => {
  const [p, q] = String(s).replace('−', '-').split('/');
  return Number(p) / (q ? Number(q) : 1);
};

/* ---------- independent mathematics, written here and never calling the page ---------- */
/** χ_n(α) = sin((n + 1)α)/sin α, with its limits at α = 0 and π. */
const chiA = (n, a) => {
  const s = Math.sin(a);
  if (Math.abs(s) < 1e-12) return (Math.cos(a) > 0 ? 1 : (-1) ** n) * (n + 1);
  return Math.sin((n + 1) * a) / s;
};
const binom = (n, k) => {
  let r = 1n;
  for (let i = 0n; i < BigInt(k); i++) r = (r * (BigInt(n) - i)) / (i + 1n);
  return r;
};
/** U_n(c) = Σ_k (−1)^k C(n − k, k) (2c)^{n − 2k}, as a polynomial in κ = c²: χ itself for even n, χ² for odd n. */
function kappaPolyByBinomial(n) {
  const q = [];
  for (let k = 0; 2 * k <= n; k++) {
    const pow = n - 2 * k,
      coef = (k % 2 ? -1n : 1n) * binom(n - k, k) * 2n ** BigInt(pow);
    const deg = n % 2 ? (pow - 1) / 2 : pow / 2;
    q[deg] = (q[deg] || 0n) + coef;
  }
  for (let i = 0; i < q.length; i++) q[i] = q[i] || 0n;
  if (n % 2 === 0) return q.map(Number);
  const sq = new Array(2 * q.length).fill(0n);
  q.forEach((a, i) => q.forEach((b, k) => (sq[i + k + 1] += a * b)));
  return sq.map(Number);
}
const SUPERS = ['', '', '²', '³', '⁴', '⁵', '⁶'];
const polyString = (coef) =>
  coef
    .map((a, k) => [a, k])
    .filter(([a]) => a)
    .reverse()
    .map(([a, k], i) => {
      const body = k === 0 ? String(Math.abs(a)) : (Math.abs(a) === 1 ? '' : String(Math.abs(a))) + 'κ' + SUPERS[k];
      return i === 0 ? (a < 0 ? '−' : '') + body : (a < 0 ? ' − ' : ' + ') + body;
    })
    .join('');
/** Gauss–Legendre nodes and weights on [−1, 1] (Newton on P_n). */
function gauss(n) {
  const x = [],
    w = [];
  for (let i = 1; i <= n; i++) {
    let z = Math.cos((PI * (i - 0.25)) / (n + 0.5)),
      dp = 0;
    for (let it = 0; it < 100; it++) {
      let p0 = 1,
        p1 = z;
      for (let k = 2; k <= n; k++) [p0, p1] = [p1, ((2 * k - 1) * z * p1 - (k - 1) * p0) / k];
      dp = (n * (z * p1 - p0)) / (z * z - 1);
      const dz = p1 / dp;
      z -= dz;
      if (Math.abs(dz) < 1e-15) break;
    }
    x.push(z);
    w.push(2 / ((1 - z * z) * dp * dp));
  }
  return { x, w };
}
const G80 = gauss(80),
  G40 = gauss(40);
const integrate = (fn, a, b, G = G80) => G.x.reduce((s, x, i) => s + G.w[i] * fn(((b - a) * x + a + b) / 2), 0) * ((b - a) / 2);
/** c_n = ∫ 1{α < π/3} χ_n dg = (2/π) ∫₀^{π/3} sin((n + 1)α) sin α dα by Gauss–Legendre. */
const capCoef = (n) => (2 / PI) * integrate((a) => Math.sin((n + 1) * a) * Math.sin(a), 0, PI / 3);
/** The positive kernel K = (Σ_{a<M} χ_{a/2})²/M as a function of c = Re g, of integral 1 on S³. */
const posK = (c, M) => {
  let s = 0;
  const a0 = Math.acos(Math.max(-1, Math.min(1, c)));
  for (let a = 0; a < M; a++) s += chiA(a, a0);
  return (s * s) / M;
};
/** (1{α < π/3} ∗ K)(α) by direct quadrature on S³: (1/π) ∫₀^{π/3} ∫_{−1}^{1} K(cos β cos α + sin β sin α u) sin²β du dβ. */
const convolveCap = (alpha, M) =>
  (1 / PI) *
  integrate(
    (b) => Math.sin(b) ** 2 * integrate((u) => posK(Math.cos(b) * Math.cos(alpha) + Math.sin(b) * Math.sin(alpha) * u, M), -1, 1, G40),
    0,
    PI / 3
  );
/** The flat cap |x| < π/3: its Fourier coefficients by quadrature and its partial sum with |k| ≤ K. */
const flatA = Array.from({ length: 60 }, (_, k) => (1 / PI) * integrate((x) => Math.cos(k * x), -PI / 3, PI / 3));
const flatS = (x, K) => flatA[0] / 2 + Array.from({ length: K }, (_, i) => flatA[i + 1] * Math.cos((i + 1) * x)).reduce((s, v) => s + v, 0);
function overshoot(fn) {
  let hi = -Infinity,
    lo = Infinity,
    at = 0;
  for (let i = 0; i <= 30000; i++) {
    const x = (PI * i) / 30000,
      v = fn(x);
    if (v > hi) [hi, at] = [v, x];
    lo = Math.min(lo, v);
  }
  return { over: Math.max(0, hi - 1, -lo), at };
}
/** Si(π) by its power series. */
const SI_PI = (() => {
  let s = 0,
    term = PI;
  for (let k = 0; k < 40; k++) {
    s += term / (2 * k + 1);
    term *= (-PI * PI) / ((2 * k + 2) * (2 * k + 3));
  }
  return s;
})();
/* quaternions (floating) */
const qm = (x, y) => [
  x[0] * y[0] - x[1] * y[1] - x[2] * y[2] - x[3] * y[3],
  x[0] * y[1] + x[1] * y[0] + x[2] * y[3] - x[3] * y[2],
  x[0] * y[2] - x[1] * y[3] + x[2] * y[0] + x[3] * y[1],
  x[0] * y[3] + x[1] * y[2] - x[2] * y[1] + x[3] * y[0]
];
const qc = (x) => [x[0], -x[1], -x[2], -x[3]];
const qkey = (q) => q.map((v) => Math.round(v * 2)).join(',');
const dot4 = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
/** 2T by closure from i, j and (1 + i + j + k)/2. */
const T24 = (() => {
  const seen = new Map(),
    gens = [
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0.5, 0.5, 0.5, 0.5]
    ];
  const todo = [[1, 0, 0, 0]];
  while (todo.length) {
    const q = todo.pop();
    if (seen.has(qkey(q))) continue;
    seen.set(qkey(q), q.map((v) => Math.round(v * 2) / 2));
    for (const g of gens) todo.push(qm(q, g));
  }
  return [...seen.values()];
})();
const isQ8 = (q) => q.every((v) => Number.isInteger(v));
/** The class of q in 2T/Q_8: the m ∈ {0, 1, 2} with q ε^{−m} ∈ Q_8. */
const EPS = [0.5, 0.5, 0.5, 0.5];
const classOf = (q) => [0, 1, 2].find((m) => isQ8([...Array(m)].reduce((x) => qm(x, qc(EPS)), q)));
/** The 4 × 4 real matrix of left multiplication v ↦ q v, and the rotation v ↦ q v q̄ on the imaginary part. */
const leftMat = (q) => [0, 1, 2, 3].map((r) => [0, 1, 2, 3].map((c) => qm(q, [0, 1, 2, 3].map((k) => (k === c ? 1 : 0)))[r]));
const rotMat = (q) => [1, 2, 3].map((r) => [1, 2, 3].map((c) => qm(qm(q, [0, 1, 2, 3].map((k) => (k === c ? 1 : 0))), qc(q))[r]));
const mmul = (A, B) => A.map((row) => B[0].map((_, k) => row.reduce((s, a, i) => s + a * B[i][k], 0)));
const mT = (A) => A[0].map((_, i) => A.map((r) => r[i]));
const madd = (A, B, k = 1) => A.map((r, i) => r.map((v, j) => v + k * B[i][j]));
const mzero = (d) => Array.from({ length: d }, () => new Array(d).fill(0));
function jacobi(M) {
  const n = M.length,
    A = M.map((r) => [...r]);
  for (let sweep = 0; sweep < 80; sweep++) {
    let off = 0;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += A[p][q] ** 2;
    if (off < 1e-24) break;
    for (let p = 0; p < n; p++)
      for (let q = p + 1; q < n; q++) {
        if (Math.abs(A[p][q]) < 1e-300) continue;
        const th = (A[q][q] - A[p][p]) / (2 * A[p][q]),
          t = (th >= 0 ? 1 : -1) / (Math.abs(th) + Math.sqrt(th * th + 1)),
          c = 1 / Math.sqrt(t * t + 1),
          s = t * c;
        for (let k = 0; k < n; k++) [A[k][p], A[k][q]] = [c * A[k][p] - s * A[k][q], s * A[k][p] + c * A[k][q]];
        for (let k = 0; k < n; k++) [A[p][k], A[q][k]] = [c * A[p][k] - s * A[q][k], s * A[p][k] + c * A[q][k]];
      }
  }
  return A.map((r, i) => r[i]).sort((a, b) => a - b);
}
function rankFloat(M) {
  const A = M.map((r) => [...r]),
    n = A.length,
    m = A[0].length;
  let rank = 0;
  for (let c = 0; c < m && rank < n; c++) {
    let p = rank;
    for (let r = rank + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    if (Math.abs(A[p][c]) < 1e-9) continue;
    [A[rank], A[p]] = [A[p], A[rank]];
    for (let r = rank + 1; r < n; r++) {
      const f = A[r][c] / A[rank][c];
      for (let k = c; k < m; k++) A[r][k] -= f * A[rank][k];
    }
    rank++;
  }
  return rank;
}
/* complex numbers as [re, im] and ζ by Euler–Maclaurin */
const C = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1]],
  mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
  div: (a, b) => {
    const d = b[0] ** 2 + b[1] ** 2;
    return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d];
  },
  exp: (a) => [Math.exp(a[0]) * Math.cos(a[1]), Math.exp(a[0]) * Math.sin(a[1])],
  abs: (a) => Math.hypot(a[0], a[1])
};
function zeta(s) {
  const N = 120,
    B = [1 / 6, -1 / 30, 1 / 42, -1 / 30, 5 / 66, -691 / 2730, 7 / 6, -3617 / 510];
  const pw = (n) => C.exp([-s[0] * Math.log(n), -s[1] * Math.log(n)]);
  let sum = [0, 0];
  for (let n = 1; n < N; n++) sum = C.add(sum, pw(n));
  const Ns = pw(N);
  sum = C.add(sum, C.div(C.mul(Ns, [N, 0]), [s[0] - 1, s[1]]));
  sum = C.add(sum, C.mul(Ns, [0.5, 0]));
  let rising = s,
    fact = 2,
    p = 1 / N;
  for (let j = 1; j <= B.length; j++) {
    sum = C.add(sum, C.mul(C.mul(rising, Ns), [(B[j - 1] / fact) * p, 0]));
    rising = C.mul(C.mul(rising, [s[0] + 2 * j - 1, s[1]]), [s[0] + 2 * j, s[1]]);
    fact *= (2 * j + 1) * (2 * j + 2);
    p /= N * N;
  }
  return sum;
}

/* ---------- the session ---------- */
const T = await session();
const { check } = T;
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
const suite = fs.readFileSync(SUITE, 'utf8');

/* ---------- sources: syntax, reserved words, colours, contract ---------- */
for (const file of [path.join(DIR, 'main.js'), SUITE]) {
  let ok = true,
    why = '';
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  } catch (e) {
    ok = false;
    why = String(e.stderr || e.message).split('\n')[0];
  }
  check(`node --check ${path.basename(file)}`, ok, why);
}
// the reserved words, spelled backwards so that this file does not contain them either
const RESERVED = new RegExp(`\\b(${['edualc', 'supo', 'inimeg', 'xedoc', 'tpg', 'mll', 'tnega', 'stnega'].map((w) => [...w].reverse().join('')).join('|')})\\b`, 'i');
for (const [file, src] of [...Object.entries(sources), ['test.mjs', suite]]) check(`${file}: no reserved identifiers`, !RESERVED.test(src), (src.match(RESERVED) || [''])[0]);
for (const [file, src] of Object.entries(sources)) check(`${file}: no literal colour and no palette switch`, !/#[0-9a-fA-F]{3,8}\b(?![^<]*>)|rgba?\(|hsla?\(/.test(file === 'index.html' ? src.replace(/href="[^"]*"/g, '') : src) && !/\btrPalette\b|data-tr-palette|prefers-color-scheme/.test(src));
const html = sources['index.html'];
check('index.html loads exactly theme.css, style.css, shell.js, kit.js and main.js', same([...html.matchAll(/<(?:link rel="stylesheet"|script) (?:href|src)="([^"]+)"/g)].map((m) => m[1]).filter((u) => !/^https:/.test(u)), ['../assets/theme.css', 'style.css', '../assets/shell.js', '../assets/kit.js', 'main.js']));
check('the lab is the shared three-column dark .app.lab with #rail, #stage, .strip outside it and #evidence', /<div class="app lab" id="app">/.test(html) && /<aside class="col deck" id="rail"/.test(html) && /<aside class="col side" id="evidence"/.test(html) && /<footer class="rail">/.test(html) && !/grid-template-columns/.test(sources['style.css']));
check('breadcrumbs: § 39.7 to the chapter in each language, and the index crumb', html.includes(`<a class="crumb crumb-ch zh" id="crumbZh" href="../../zh/${CHAPTER}" target="_top">◂ 第 39 章 · §39.7</a>`) && html.includes(`<a class="crumb crumb-ch en" id="crumbEn" href="../../en/${CHAPTER}" target="_top">◂ Ch. 39 · §39.7</a>`) && html.includes('class="crumb" href="../"'));
check('lens panel aside §39.7 and the drawer cites 第 39 章 §39.7 / Chapter 39, §39.7', /id="lensPanel">\s*<h2>.*<span class="aside">§39\.7<\/span>/.test(html) && html.includes(`<p class="lede refs">书中：<a href="../../zh/${CHAPTER}" target="_top">第 39 章 §39.7`) && html.includes(`<p class="lede refs">In the book: <a href="../../en/${CHAPTER}" target="_top">Chapter 39, §39.7`));
check('the two lenses are named as specified', html.includes('ℱ<sub>Ω</sub> Ternion Spherical Rational Peter–Weyl Lens') && html.includes('Classical Flat ℝ Fourier &amp; S² Polar-Chart Contrast (MODEL)') && html.includes('id="mobileLensBtn"'));
check('five cards in order', same([...html.matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1]), IDS));
const BOXES = [...html.matchAll(/<div class="lean( [a-z]+)?">(.*?)<\/div>\n/g)].map((m) => ({ kind: (m[1] || '').trim(), body: m[2], gids: [...m[2].matchAll(/data-lean-gid="([^"]+)"/g)].map((g) => g[1]) }));
const green = BOXES.filter((b) => !b.kind);
check('sixteen green boxes, one per frozen declaration, in the order of the theorem', green.length === 16 && same(green.map((b) => b.gids), GIDS.map((g) => [g])), JSON.stringify(green.map((b) => b.gids)));
check('RH and Dirichlet GRH stand in one ARGUED box, without a Lean link; no green box speaks of them', BOXES.filter((b) => b.kind === 'argued' && /Alpöge/.test(b.body) && /DirichletLZerosOnLine/.test(b.body) && !b.gids.length).length === 1 && green.every((b) => !/Alpöge|DirichletLZerosOnLine/.test(b.body)));
check('red only for the open frontier: one OPEN box with Grand RH and ERH, no Lean link', BOXES.filter((b) => b.kind === 'open').length === 1 && BOXES.filter((b) => b.kind === 'open').every((b) => /Grand RH/.test(b.body) && /ERH/.test(b.body) && !b.gids.length) && !/\bvar\(--(red|warn)\)/.test(sources['style.css']));
check('the MODEL box names the temporal triad, the register 𝒦₀ → τ, the horizon ℋ½ and ℓ ⋆ σ ⋆ r', BOXES.some((b) => b.kind === 'model' && /𝒦<sub>0<\/sub>/.test(b.body) && /ℋ<sub>1\/2<\/sub>/.test(b.body) && /ℓ ⋆ σ ⋆ r/.test(b.body) && /past scalar trace anchor/.test(b.body)));
check('amber is kept for the current choice in the style sheet', (sources['style.css'].match(/var\(--amber\)/g) || []).length >= 3 && !/\.lean[^{]*\{[^}]*--amber/.test(sources['style.css']));

/* ---------- the quality gate ---------- */
await stageFirstChecks(T, BOOK, ID, { solid: true });

/* ---------- the mathematics of the page against the independent one ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await page.evaluate(() => document.fonts && document.fonts.ready);
await settle(page, 300);
const D = (fn, ...a) => page.evaluate(([src, args]) => new Function('d', 'args', `return (${src})(d, ...args)`)(window.PETER_WEYL_DEBUG, args), [fn.toString(), a]);
const state = () => page.evaluate(() => window.PETER_WEYL_DEBUG.state);

// characters
for (let n = 0; n <= 6; n++) {
  const want = kappaPolyByBinomial(n),
    got = await D((d, k) => d.kappaPoly(k), n),
    text = await D((d, k) => d.polyText(k), n);
  check(`χ_${n}/2${n % 2 ? '²' : ''} is ${polyString(want)} in κ with integer coefficients`, same(got, want) && text === polyString(want) && want.every(Number.isInteger), `${JSON.stringify(got)} | ${text}`);
}
check('the named polynomials: χ½² = 4κ, χ₁ = 4κ − 1, χ₂ = 16κ² − 12κ + 1', polyString(kappaPolyByBinomial(1)) === '4κ' && polyString(kappaPolyByBinomial(2)) === '4κ − 1' && polyString(kappaPolyByBinomial(4)) === '16κ² − 12κ + 1');
{
  const s = await state(),
    want = [0, 1, 2, 3, 4].map((n) => chiA(n, PI / 3));
  check('at κ = 1/4 (the turn by 120° about (1, 1, 1)) the characters are 1, 1, 0, −1, −1', s.kappa === 0.25 && s.chars.every((v, n) => near(v, want[n], 1e-12)) && near(want[2], 0, 1e-15), JSON.stringify(s.chars));
  const sweep = await D((d) => [0, 0.09, 0.37, 0.5, 0.81, 1].map((k) => d.calc({ kappa: k }).chars));
  check('characters on a sweep of κ equal sin((n + 1)α)/sin α with cos α = √κ', sweep.every((row, i) => row.every((v, n) => near(v, chiA(n, Math.acos(Math.sqrt([0, 0.09, 0.37, 0.5, 0.81, 1][i]))), 1e-10))));
  const exact = await D((d) => d.calc({ kappa: 0.37 }).exact);
  check('exact values at κ = 0.37: χ₁ = 12/25, χ₂ = −781/625 (fractions of the grid of 1/100)', exact[2] === '12/25' && exact[4] === '−781/625' && exact[1] === null, JSON.stringify(exact));
  const half = await D((d) => d.calc({ kappa: 0.81 }).exact);
  check('a perfect square κ = 0.81 gives the half-integer characters exactly: χ½ = 9/5', half[1] === '9/5' && near(frac(half[3]), chiA(3, Math.acos(0.9)), 1e-12), JSON.stringify(half));
}
// Schur, rank, eigenvalues, base-point group, frame
{
  const F = await D((d) => d.fixed);
  const gram = [0, 1, 2, 3, 4].map((a) => [0, 1, 2, 3, 4].map((b) => (2 / PI) * integrate((x) => Math.sin(x) ** 2 * chiA(a, x) * chiA(b, x), 0, PI)));
  check('Schur: the Weyl Gram matrix of χ₀ … χ₂ is the identity (Gauss–Legendre, against the page)', gram.every((r, a) => r.every((v, b) => near(v, a === b ? 1 : 0, 1e-10) && near(v, F.gram[a][b], 1e-9))));
  const K = (w) => T24.map((x) => T24.map((y) => {
    const a = qm(qc(x), y)[0];
    return w[0] + w[1] * 2 * a + w[2] * (4 * a * a - 1);
  }));
  const ev = jacobi(K([1, 1, 1])),
    evn = jacobi(K([1, -1, 1]));
  const counts = (e) => Object.entries(e.reduce((m, v) => ((m[Math.round(v)] = (m[Math.round(v)] || 0) + 1), m), {})).map(([v, k]) => [Number(v), k]).sort((a, b) => a[0] - b[0]);
  check('2T: the kernel of j = 0, 1/2, 1 has rank 14 = 1 + 4 + 9 (page and float elimination)', F.rank === 14 && rankFloat(K([1, 1, 1])) === 14);
  check('2T: eigenvalues 24 (×1), 12 (×4), 8 (×9), 0 (×10); with the weight −1 on j = 1/2, −12 (×4)', same(counts(ev), [[0, 10], [8, 9], [12, 4], [24, 1]]) && same(counts(evn), [[-12, 4], [0, 10], [8, 9], [24, 1]]) && same(F.eigPos, [0, 8, 12, 24]) && same(F.eigNeg, [-12, 0, 8, 24]), JSON.stringify([counts(ev), F.eigPos, F.eigNeg]));
  let fail = 0;
  for (let k = 0; k < 3000; k++) {
    const pick = () => T24[Math.floor(((k * 7919 + 13) * (pick.c = (pick.c || 1) + 1)) % 24)];
    const [o, x, y, z] = [pick(), pick(), pick(), pick()],
      tri = (a, b, c) => qm(qm(a, qc(b)), c);
    if (qkey(tri(tri(x, o, tri(o, y, o)), o, z)) !== qkey(tri(x, y, z))) fail++;
  }
  check('base-point group: tri(x, y, z) = x ⋆ y⁻¹ ⋆ z (page over all 24⁴, test on 3000 quadruples)', F.triFail === 0 && F.triCount === 24 ** 4 && fail === 0);
  check('S³ is parallelizable: x i, x j, x k orthonormal at the 24 points', F.frameFail === 0 && T24.every((x) => [[0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]].map((e) => qm(x, e)).every((u, a, arr) => arr.every((v, b) => near(dot4(u, v), a === b ? 1 : 0, 1e-12)))));
}
// the heap convolution on 2T and Q_8
for (const group of ['2T', 'Q8']) {
  const H = await D((d, g) => d.heap(g), group),
    els = await D((d, g) => d.elements(g), group);
  const G = group === '2T' ? T24 : T24.filter(isQ8);
  const idx = new Map(els.map((q, i) => [qkey(q), i]));
  check(`${group}: the page lists the group (closure from i, j, ε)`, els.length === G.length && G.every((q) => idx.has(qkey(q))));
  const F = new Array(els.length).fill(0);
  els.forEach((x, a) =>
    els.forEach((y, b) => {
      if (!H.f[a] || !H.g[b]) return;
      els.forEach((w, c) => (F[c] += H.f[a] * H.g[b] * H.h[idx.get(qkey(qm(qm(y, qc(x)), w)))]));
    })
  );
  check(`${group}: F = f ⊛ ḡ ⊛ h with h([y, x, w]) = h(y x⁻¹ w), summed here`, same(F, H.F), JSON.stringify(F));
  // F̂ = f̂ ĝ† ĥ in two representations the page does not use: left multiplication on ℝ⁴ and the rotation on ℝ³
  for (const [name, rep] of [
    ['left multiplication on ℝ⁴', leftMat],
    ['rotation on ℝ³', rotMat]
  ]) {
    const hat = (fn) => els.reduce((A, q, i) => (fn[i] ? madd(A, rep(q), fn[i]) : A), mzero(rep([1, 0, 0, 0]).length));
    const lhs = hat(F),
      rhs = mmul(mmul(hat(H.f), mT(hat(H.g))), hat(H.h));
    check(`${group}: F̂ = f̂ ĝ† ĥ in the ${name}`, lhs.every((r, i) => r.every((v, j) => near(v, rhs[i][j], 1e-9))));
  }
  // Parseval with the characters
  const OM = [[1, 0], [-0.5, Math.sqrt(3) / 2], [-0.5, -Math.sqrt(3) / 2]];
  const chars = group === '2T'
    ? [
        [1, () => [1, 0]],
        [1, (q) => OM[classOf(q)]],
        [1, (q) => OM[(2 * classOf(q)) % 3]],
        [2, (q) => [2 * q[0], 0]],
        [2, (q) => C.mul([2 * q[0], 0], OM[classOf(q)])],
        [2, (q) => C.mul([2 * q[0], 0], OM[(2 * classOf(q)) % 3])],
        [3, (q) => [4 * q[0] * q[0] - 1, 0]]
      ]
    : [
        [1, () => [1, 0]],
        [1, (q) => [q[2] === 0 && q[3] === 0 ? 1 : -1, 0]],
        [1, (q) => [q[1] === 0 && q[3] === 0 ? 1 : -1, 0]],
        [1, (q) => [q[1] === 0 && q[2] === 0 ? 1 : -1, 0]],
        [2, (q) => [2 * q[0], 0]]
      ];
  const energies = chars.map(([d, chi]) => {
    let t = [0, 0];
    els.forEach((x, a) => els.forEach((y, b) => (t = C.add(t, C.mul([H.f[a] * H.f[b], 0], chi(qm(qc(x), y)))))));
    return (d * t[0]) / els.length;
  });
  const total = energies.reduce((s, v) => s + v, 0),
    want = group === '2T' ? 46 : 15;
  check(`${group}: Parseval Σ|f|² = ${want} = (1/|G|) Σ d_ρ Tr(f̂_ρ† f̂_ρ), per representation as the page’s exact fractions`, H.lhs === want && H.rhs === String(want) && near(total, want, 1e-9) && energies.every((v, i) => near(v, frac(H.energies[i].energy), 1e-9)) && H.same, JSON.stringify([H.energies.map((e) => e.energy), energies.map((v) => v.toFixed(4))]));
  check(`${group}: the energy of F balances too (${H.lhsF})`, String(H.lhsF) === H.rhsF && H.lhsF === F.reduce((s, v) => s + v * v, 0));
  check(`${group}: |G|³ spatial multiplications against Σ 2d³ on the spectral side`, H.spaceMults === els.length ** 3 && H.blockMults === chars.reduce((s, [d]) => s + 2 * d ** 3, 0));
}
// Gibbs and the positive kernel
{
  const cap = await D((d) => d.cap);
  check('the cap coefficients c_n = ∫ 1{α < π/3} χ_n dg (Gauss–Legendre) and ‖f‖² = 1/3 − √3/(4π)', cap.coeffs.slice(0, 25).every((v, n) => near(v, capCoef(n), 1e-12)) && near(cap.norm2, 1 / 3 - Math.sqrt(3) / (4 * PI), 1e-14));
  for (const B of [4, 11, 24]) {
    const M = Math.floor(B / 2) + 1,
      pts = [0, 0.4, 0.9, PI / 3, 1.3, 2.2, PI];
    const got = await D((d, b, p) => p.map((a) => d.synth(a, b, 'pos')), B, pts);
    check(`2J_max = ${B}: the positive synthesis equals the convolution 1{α < π/3} ∗ (Σχ)²/M computed on S³ directly`, pts.every((a, i) => near(got[i], convolveCap(a, M), 2e-10)), JSON.stringify(got.map((v, i) => [v.toFixed(8), convolveCap(pts[i], M).toFixed(8)])));
  }
  for (const B of [0, 4, 24]) {
    const g = await D((d, b) => d.calc({ B: b }).gibbs, B);
    const flat = overshoot((x) => flatS(x, B + 1));
    check(`2J_max = ${B}: flat hard cutoff overshoot ${(100 * flat.over).toFixed(2)}% (|k| ≤ ${B + 1}) and the positive kernel 0`, near(g.flat.over, flat.over, 2e-6) && g.pos.over === 0 && g.pos.max <= 1 && g.pos.min >= 0, JSON.stringify([g.flat.over, flat.over, g.pos]));
  }
  const limit = await D((d) => d.gibbsLimit);
  check('the Gibbs limit (1/π) Si(π) − 1/2 = 0.08949', near(limit, SI_PI / PI - 0.5, 1e-10) && (100 * limit).toFixed(2) === '8.95');
  const o5 = overshoot((x) => flatS(x, 5)).over,
    o25 = overshoot((x) => flatS(x, 25)).over,
    o49 = overshoot((x) => flatS(x, 49)).over;
  check('the flat overshoot decreases towards the limit: 11.30% (|k| ≤ 5), 9.65% (25), then closer to 8.95% (49)', (100 * o5).toFixed(2) === '11.30' && (100 * o25).toFixed(2) === '9.65' && o49 < o25 && o49 > SI_PI / PI - 0.5, JSON.stringify([o5, o25, o49]));
  // on S³ the hard cutoff does not settle at the centre: (n + 1) c_n does not tend to 0
  const centre = [24, 25, 26, 27, 28, 29].map((B) => Array.from({ length: B + 1 }, (_, n) => (n + 1) * capCoef(n)).reduce((s, v) => s + v, 0));
  const terms = Array.from({ length: 40 }, (_, k) => 20 + k).filter((n) => n % 3 !== 0).map((n) => Math.abs((n + 1) * capCoef(n)));
  const num = await page.textContent('#basis .lean.num .en');
  check('S³ hard cutoff at 1: the terms (n + 1) c_n stay above 0.25 in size, and the NUM box prints the swinging partial sums', terms.every((v) => v > 0.25) && centre.every((v) => num.includes(v.toFixed(4).replace('-', '−'))) && Math.max(...centre) - Math.min(...centre) > 0.2, JSON.stringify(centre));
}
// the Mellin axis
{
  const M = await D((d) => d.mellin);
  const plancherel = (1 / (2 * PI)) * Array.from({ length: 24 }, (_, k) => integrate((t) => PI / Math.cosh(PI * t), -30 + 2.5 * k, -27.5 + 2.5 * k)).reduce((s, v) => s + v, 0);
  check('Mellin–Plancherel on σ = 1/2: (1/2π)∫|Γ(1/2 + it)|² dt = ∫ e^{−2x} dx = 1/2', near(M.onLine, 0.5, 1e-9) && near(plancherel, 0.5, 1e-9));
  check('off the line, σ = 3/4: Γ(3/2)/2^{3/2} ≠ 1/2', near(M.offLine, Math.sqrt(PI) / 2 / 2 ** 1.5, 1e-8) && Math.abs(M.offLine - 0.5) > 0.1);
  check('the theta-tail Mellin integral: Λ(2) = π/6, Λ(1/2 + iγ₁) ≈ 0, M real on the line', near(M.lambda2, PI / 6, 1e-9) && M.lambdaZero < 1e-8 && Math.abs(M.imag10) < 1e-10);
  check('γ₁ = 14.1347… is a zero of ζ on the line (Euler–Maclaurin)', C.abs(zeta([0.5, 14.134725141734693])) < 1e-9);
  check('Cayley: |(s − 1)/s| = 1 on σ = 1/2, < 1 at σ = 3/4', M.cayleyOn < 1e-14 && M.cayleyOff < 1 && near(M.cayleyOff, C.abs(C.div([-0.25, 14.134725141734693], [0.75, 14.134725141734693])), 1e-14));
}
// the butterflies, the cyclic Parseval and the Toeplitz forms of the twiddles
for (const B of [0, 2, 4, 7]) {
  const f = await D((d, b) => d.fft(b), B),
    K = 2 ** Math.max(1, Math.ceil(Math.log2(2 * B + 2)));
  const samples = Array.from({ length: K }, (_, k) => (Math.min((2 * PI * k) / K, 2 * PI - (2 * PI * k) / K) < PI / 3 - 1e-12 ? 1 : 0));
  const r = 21 / 20,
    a = r ** K + r ** -K;
  check(`K = ${K}: (K/2) log₂ K = ${(K / 2) * Math.log2(K)} butterflies against K² = ${K * K}, the same transform and Parseval`, f.K === K && f.mults === (K / 2) * Math.log2(K) && f.naive === K * K && f.naiveGap < 1e-12 && f.space === samples.reduce((s, v) => s + v, 0) && near(f.spec, f.space, 1e-10));
  check(`K = ${K}: Toeplitz of the twiddles has least eigenvalue K, pushed off the circle K(2 − r^K − r^{−K}) < 0`, near(f.lamOn, K, 1e-8) && near(f.lamOff, K * (2 - a), 1e-7) && f.lamOff < 0);
}
// the heap recursion, the ray kernel and the triad
{
  const s = await state();
  const c = 0.5,
    g = [c, ...[1, 1, 1].map((v) => (v * Math.sqrt(1 - c * c)) / Math.sqrt(3))];
  const xs = [[1, 0, 0, 0], g];
  for (let n = 1; n < 10; n++) xs.push(qm(qm(xs[n], qc(xs[n - 1])), xs[n]));
  check('heap: x₂ = x₁ x₀* x₁ has real part T₂(c) = 2κ − 1, and x_{n+1} = U_n(c) x₁ − U_{n−1}(c) x₀', near(s.cheb.t2, xs[2][0], 1e-12) && near(xs[2][0], 2 * 0.25 - 1, 1e-12) && s.cheb.gap < 1e-12 && xs.every((x, n) => n < 2 || near(x[0], Math.cos(n * Math.acos(c)), 1e-12)));
  const spinor = (q) => [[q[0], q[1]], [-q[2], q[3]]];
  const ov = C.add(C.mul([spinor([1, 0, 0, 0])[0][0], 0], spinor(g)[0]), [0, 0]);
  check('ray kernel at (1, g): R = κ + κ(1, g i) = |s(1)† s(g)|² = 1/2', near(s.ray.R, C.abs(ov) ** 2, 1e-12) && near(s.ray.R, 0.5, 1e-12) && near(s.ray.spinor, s.ray.R, 1e-12) && near(s.ray.page, s.ray.R, 1e-12));
  // D^{1/2}(g) ⊗ D^{1/2}(g): the singlet carries χ₀ = 1, the triplet χ₁ = 4κ − 1, the trace 4κ
  const Dm = [[[g[0], g[1]], [g[2], g[3]]], [[-g[2], g[3]], [g[0], -g[1]]]];
  const kron = (s1, s2, t1, t2) => C.mul(Dm[s1][t1], Dm[s2][t2]);
  const singlet = [[0, 1, 1 / Math.SQRT2], [1, 0, -1 / Math.SQRT2]];
  let sv = [0, 0];
  for (const [a1, a2, ca] of singlet) for (const [b1, b2, cb] of singlet) sv = C.add(sv, C.mul([ca * cb, 0], kron(a1, a2, b1, b2)));
  const t = await D((d) => [0, 0.5, 1].map((l) => d.calc({ kappa: 0.25, lam: l }).triad));
  const ORDER = [[0, 1], [0, 0], [1, 0], [1, 1]];
  let leak0 = 0;
  ORDER.forEach(([s1, s2], r) => ORDER.forEach(([t1, t2], k) => { if ((r === 0) !== (k === 0)) leak0 += C.abs(kron(s1, s2, t1, t2)) ** 2; }));
  check('Clebsch–Gordan: ⟨singlet| D ⊗ D |singlet⟩ = 1, trace 4κ = 1 at every λ, leakage √(Σ off-block) at λ = 0 and 0 at λ = 1', near(sv[0], 1, 1e-12) && near(sv[1], 0, 1e-12) && t.every((x) => near(x.trace[0], 1, 1e-12)) && near(t[0].leak, Math.sqrt(leak0), 1e-12) && t[2].leak < 1e-12 && t[1].leak > t[2].leak, JSON.stringify(t.map((x) => x.leak)));
  check('Clebsch–Gordan at λ = 1: the 1 × 1 block is χ₀ = 1 and the 3 × 3 block has trace χ₁ = 4κ − 1 = 0', near(s.triad.singlet[0], 1, 1e-12) && near(s.triad.singlet[1], 0, 1e-12) && near(s.triad.triplet[0], 0, 1e-12) && near(s.triad.triplet[1], 0, 1e-12) && near((await D((d) => d.calc({ kappa: 0.25, lam: 1 }).triad.mags))[0][0], 1, 1e-12));
}

/* ---------- the page: cards, stills, readouts, controls ---------- */
/** Pick a card, then put its rail on the declared still at once (the card stays picked), whatever the frame rate. */
async function pick(id, p = page) {
  await p.click(`[data-preset="${id}"]`);
  await settle(p);
  await p.evaluate((still) => {
    TRV.kit.pause();
    const r = document.getElementById('now');
    r.value = String(still);
    r.dispatchEvent(new Event('input', { bubbles: true }));
  }, CARDS[id].still);
  await settle(p);
}
for (const id of IDS) {
  await pick(id);
  const s = await state();
  check(`${id}: the card opens its scene`, s.scene === CARDS[id].scene && s.preset === id, JSON.stringify([s.scene, s.preset]));
}
check(`${SHELLS} plays by itself from κ = 0 up to its still`, await playsAfter(page, () => page.click(`[data-preset="${SHELLS}"]`), () => window.PETER_WEYL_DEBUG.state));
for (const lang of ['zh', 'en'])
  for (const id of IDS) {
    const p = await openStill(T, BOOK, ID, id, lang);
    const s = await p.evaluate(() => window.PETER_WEYL_DEBUG.state);
    const c = CARDS[id],
      note = (await p.textContent('#tourBody')) || '';
    const fine = near(s.t, c.still, 1e-12) && !s.playing && Object.entries(c).every(([k, v]) => k === 'scene' || k === 'still' || s[k] === v);
    check(`still ${lang}/${id}: parked on its declared frame`, fine && s.scene === c.scene, JSON.stringify([s.t, s.kappa, s.B, s.lam, s.P, s.group]));
    const hud = await p.textContent('#hudBig');
    const facts = {
      [SHELLS]: [s.chiLine.includes('= 0'), hud.includes('χ1 = 0')],
      [TRIAD]: [s.triad.leak < 1e-12, hud.includes('2 × 2 = 1 + 3')],
      [GIBBS]: [hud.includes(`${(100 * s.gibbs.flat).toFixed(2)}%`), hud.includes('0.00%')],
      [HEAP]: [s.heap.lhs === 46 && s.heap.rhs === '46' && s.heap.gap < 1e-9, hud.includes('46')],
      [BAND]: [s.band.dim === 55, hud.includes('55')]
    }[id];
    check(`still ${lang}/${id}: the title states the numbers of the frame`, facts.every(Boolean), hud);
    if (lang === 'en') {
      const left = await cjkLeftovers(p);
      check(`still en/${id}: no Chinese`, left.length === 0, left.slice(0, 2).join(' | '));
    }
    check(`still ${lang}/${id}: labels apart`, (await labelOverlaps(p, '.stage .tag')).length === 0);
    check(`still ${lang}/${id}: a note under the stage`, note.trim().length > 12);
    await p.context().close();
  }

// the figure a chapter cites: one short sentence, no scripts, the strip hidden
for (const id of IDS) {
  const p = await T.open(BOOK, ID, `?embed=1&lang=zh&preset=${id}`, { viewport: { width: 740, height: 500 }, reducedMotion: 'reduce' });
  await settle(p, 300);
  const note = await p.textContent('.tour .tour-note');
  check(`cited ${id}: the strip is hidden and the note carries no sub- or superscripts`, (await p.locator('.strip').isHidden()) && (await p.locator('.tour .tour-note sub, .tour .tour-note sup').count()) === 0 && note.trim().length > 10, note);
  await p.context().close();
}

// readouts: one key and six rows, populated
await pick(SHELLS);
{
  const rows = await page.$$eval('#readouts dl.ro > div', (els) => els.map((e) => e.querySelector('dd').textContent.trim()));
  check('readouts: one key and six rows, all populated', rows.length === 7 && rows.every((t) => t && !/NaN|undefined|^—$/.test(t)), JSON.stringify(rows));
  check('the key readout of the shells card is χ₁ = 4κ − 1 = 0', (await page.textContent('#roKey')).includes('χ1 = 4κ − 1 = 0'));
}
// controls: κ slider, j chips, band slider, group chips, lens, cameras
async function input(sel, value) {
  await page.locator(sel).evaluate((el, v) => {
    el.value = String(v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
  await settle(page);
}
await input('#kappaRange', 0.81);
{
  const s = await state();
  check('κ slider: κ = 0.81 sets the rail of the shells card and the card lets go', near(s.kappa, 0.81, 1e-12) && s.preset === null && !s.playing && (await page.textContent('#roKappa')).includes('c = ±0.9'));
}
for (const [j, n] of [['0', 0], ['0.5', 1], ['1.5', 3], ['2', 4]]) {
  await page.click(`#jChips [data-j="${j}"]`);
  await settle(page);
  const s = await state();
  check(`j chip ${j}: the current shell is n = ${n} and the title reads it`, s.n === n && (await page.textContent('#hudBig')).includes(`χ${n % 2 ? `${n}/2` : n / 2}`));
}
await pick(GIBBS);
await input('#bandRange', 10);
{
  const s = await state(),
    flat = overshoot((x) => flatS(x, 11)).over;
  check('band slider: 2J_max = 10 in the Gibbs card, and the overshoot follows', s.B === 10 && near(s.gibbs.flat, flat, 2e-6));
}
await pick(HEAP);
await page.click('#groupChips [data-group="Q8"]');
await settle(page);
{
  const s = await state();
  check('group chip Q₈: the heap scene shows Q₈ with Parseval 15 = 15', s.group === 'Q8' && s.heap.lhs === 15 && s.heap.rhs === '15' && (await page.textContent('#roKey')).includes('15 = 15'));
}
await page.click('#groupChips [data-group="2T"]');
await settle(page);
await page.click('#lensToggleBtn');
await settle(page);
check('both lens switches are in step', same(await Promise.all(['#lensToggleBtn', '#mobileLensBtn'].map((s) => page.getAttribute(s, 'aria-pressed'))), ['true', 'true']) && (await state()).lens === 1);
check('desktop: the mirror lens button of the tour bar stays hidden', await page.locator('#mobileLensBtn').isHidden());
await page.click('#lensToggleBtn');
await settle(page);
for (const cam of ['front', 'top', 'cut']) {
  await page.click(`#camChips [data-cam="${cam}"]`);
  await settle(page);
  check(`camera chip ${cam}`, (await state()).cam === cam);
}

/* ---------- colours on the stage: a spy on the primitives of kit.solid ---------- */
async function primitives(p = page) {
  return p.evaluate(() => {
    const sc = window.TRV.solids[0],
      seen = [],
      P = window.TRV.palette;
    const names = ['surface', 'poly', 'line', 'tube', 'bead', 'ring', 'fan', 'arrow', 'circle'];
    const orig = Object.fromEntries(names.map((n) => [n, sc[n]]));
    window.TRV.kit.flush();
    for (const n of names)
      sc[n] = (...a) => {
        const s = n === 'surface' || n === 'poly' || n === 'tube' ? a[2] : n === 'circle' ? a[3] : a[a.length - 1];
        const cols = [s && s.color, s && s.fill, ...((s && s.colors) || [])].filter(Boolean);
        seen.push({ n, key: typeof a[0] === 'string' ? a[0] : s && s.key, cols });
        return orig[n](...a);
      };
    sc.refresh();
    window.TRV.kit.flush();
    for (const n of names) sc[n] = orig[n];
    return { seen, amber: P.amber, magenta: P.magenta, cyan: P.cyan, violet: P.violet, ink: P.ink, stage: P.stage };
  });
}
for (const id of IDS) {
  await pick(id);
  for (const lens of [0, 1]) {
    if ((await state()).lens !== lens) {
      await page.click('#lensToggleBtn');
      await settle(page);
    }
    const pr = await primitives();
    const allowed = [pr.amber, pr.magenta, pr.cyan, pr.violet, pr.ink, pr.stage];
    const amberKeys = pr.seen.filter((s) => s.cols.includes(pr.amber));
    check(`${id}, lens ${lens + 1}: the stage draws in token colours only`, pr.seen.length > 4 && pr.seen.every((s) => s.cols.every((c) => allowed.includes(c))));
    const magenta = pr.seen.filter((s) => s.cols.includes(pr.magenta)).length;
    if (lens === 0) check(`${id}, lens 1: magenta only for the flat hard cutoff`, id === GIBBS ? magenta > 0 : magenta === 0, String(magenta));
    else check(`${id}, lens 2: magenta marks the S² poles or the hard cutoffs`, id === HEAP || magenta > 0);
    check(`${id}, lens ${lens + 1}: amber marks only the current choice`, amberKeys.every((s) => ['line', 'poly', 'ring', 'fan'].includes(s.n)) && amberKeys.length <= 8, JSON.stringify(amberKeys.slice(0, 8)));
  }
  if ((await state()).lens === 1) {
    await page.click('#lensToggleBtn');
    await settle(page);
  }
}

/* ---------- the amber handle: drag it, the camera stays ---------- */
for (const [id, key, t, want, tol] of [
  [SHELLS, 'kappa', 0.6, 0.6, 0.02],
  [TRIAD, 'lam', 0.3, 0.3, 0.03],
  [GIBBS, 'B', 0.5, 12, 1],
  [HEAP, 'P', 0.5, 288, 30],
  [BAND, 'B', 6 / 7, 6, 0]
]) {
  await pick(id);
  const cam = (await state()).camera;
  const from = await D((d) => d.dragTarget(window.PETER_WEYL_DEBUG.state.t)),
    to = await D((d, x) => d.dragTarget(x), t);
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, { steps: 8 });
  await page.mouse.up();
  await settle(page);
  const s = await state();
  check(`${id}: dragging the amber handle sets ${key} and leaves the camera alone`, Math.abs(s[key] - want) <= tol && s.preset === null && same(s.camera, cam), `${s[key]} of ${want}`);
}
await pick(SHELLS);
await page.focus('#stageHandle');
await page.keyboard.press('Home');
await settle(page);
check('Home on the handle goes to κ = 0', (await state()).kappa === 0);
await page.keyboard.press('ArrowRight');
await settle(page);
check('→ on the handle steps κ by 1/100', near((await state()).kappa, 0.01, 1e-12));

/* ---------- strips: outside the stage, the right curves ---------- */
await pick(SHELLS);
check('two strip charts below the stage, not inside it', (await page.locator('#stage .strip, #stage canvas#plot, #stage canvas#plotB').count()) === 0 && (await page.locator('main.center > .strip canvas').count()) === 2);
{
  const A = await D((d) => d.plots());
  const ok = A.a.scene === 'shells' && A.a.curves.every((cv) => cv.pts.every(([k, v]) => near(v, cv.sign > 0 ? chiA(cv.n, Math.acos(Math.sqrt(k))) : chiA(cv.n, PI - Math.acos(Math.sqrt(k))), 1e-9)));
  check('strip 1: the curves are χ_j(±√κ) for j = 0 … 2, both sheets for half-integers', ok && A.a.curves.length === 7);
  check('strip 2: the bars are the Parseval energies c_n² of the cap', A.b.bars.every((b) => near(b.full, capCoef(b.n) ** 2, 1e-12)));
}
await pick(GIBBS);
{
  const A = await D((d) => d.plots());
  check('strip 1 in the Gibbs card: the magenta flat partial sum and the cyan positive synthesis', A.a.curves.flat.every(([x, v]) => near(v, flatS(x, 25), 1e-9)) && A.a.curves.pos.filter((_, i) => i % 40 === 0).every(([x, v]) => near(v, convolveCap(x, 13), 2e-10)));
}
await pick(HEAP);
{
  const A = await D((d) => d.plots());
  check('strip 2 in the heap card: exact energies per irreducible representation', same(A.b.energies, (await D((d) => d.heap('2T'))).energies.map((e) => e.energy)));
}

/* ---------- narrow pages and frames: the mirror lens, no sideways scrolling ---------- */
for (const [query, vp, label] of [
  ['?lang=zh', { width: 390, height: 844 }, 'phone'],
  ['?embed=1&lang=en', { width: 740, height: 620 }, 'embedded lab']
]) {
  const p = await T.open(BOOK, ID, query, { viewport: vp });
  await settle(p, 300);
  const geo = await p.evaluate(() => {
    const b = document.getElementById('mobileLensBtn').getBoundingClientRect(),
      st = document.getElementById('stage').getBoundingClientRect();
    return { visible: b.width > 0 && b.height > 0, below: b.top >= st.bottom - 0.5, onScreen: b.bottom <= innerHeight };
  });
  check(`${label}: the mirror lens button sits in the tour bar under the stage`, geo.visible && geo.below && geo.onScreen, JSON.stringify(geo));
  await p.click('#mobileLensBtn');
  await settle(p);
  check(`${label}: the mirror switches the lens and both buttons agree`, (await p.evaluate(() => window.PETER_WEYL_DEBUG.state.lens)) === 1 && (await p.getAttribute('#lensToggleBtn', 'aria-pressed')) === 'true');
  check(`${label}: no sideways scrolling`, (await overflowX(p)) <= 0);
  await p.context().close();
}

check('zero page errors', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));
await T.finish();
