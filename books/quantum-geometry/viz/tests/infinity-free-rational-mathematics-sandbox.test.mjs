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
const ID = 'infinity-free-rational-mathematics-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const THEORY = 'ch39-s35-infinity-free-transcendental-free-rational-mathematics.html#sec-ch39-infinity-free-transcendental-free-rational-mathematics';
const SECTION = '32.7';
const PI = Math.PI;
// scene, view, the declared still (a value of the rail), the end of the rail and the regime of the still of every card
const CARDS = {
  'homogeneous-projective-antipodal-closure': { scene: 'loop', cam: 'face', still: 2, max: 4, regime: 'pole' },
  'lazy-prime-escape-and-decidable-horizon': { scene: 'escape', cam: 'panorama', still: 3, max: 3, regime: 'escaped' },
  'rational-cayley-rotor-vs-taylor-series': { scene: 'cayley', cam: 'panorama', still: 11, max: 23, regime: 'run' },
  'chebyshev-rational-harmonic-oscillator': { scene: 'cheb', cam: 'face', still: 12, max: 24, regime: 'run' },
  'limit-free-jet-ring-and-telescoping-stokes': { scene: 'jet', cam: 'face', still: 1, max: 1.5, regime: 'run' }
};
const IDS = Object.keys(CARDS);
const [LOOP, ESCAPE, CAYLEY, CHEB, JET] = IDS;
const DEFAULT = LOOP;
const CAM_NAMES = ['panorama', 'face', 'high'];
// the order of the theorem box of §32.7
const GIDS = [
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul',
  'D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev',
  'D5/S3/Quantum/AURICOmega/ExponentialTail.exp_remainder_le',
  'D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover',
  'D5/S1/Depth/ContinuedFractions/FiniteRationalConvergents.reduced_den',
  'D5/S1/Depth/ContinuedFractions/FiniteRationalConvergentsLength.convergents_length_log',
  'D5/S3/Axis/PrimeAxisEscape.prime_axis_escape',
  'D5/S3/FiniteGroups/Cyclic/VerifiedPrimeFactorStripping.stripFactors_correct',
  'D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula',
  'D5/S3/Constants/Irrationality/LogNaturalIrrationality.irrational_log_natCast',
  'D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport',
  'D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness',
  'D5/S0/Computability/BinaryNameComparison.name_compare_run'
];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const range = (n) => Array.from({ length: n }, (_, i) => i);
const nearV = (a, b, tol = 1e-9) => a.length === b.length && a.every((x, i) => near(x, b[i], tol));

/* ---------- independent mathematics, written here and never calling the page ---------- */
const gcdN = (a, b) => (b ? gcdN(b, a % b) : a < 0n ? -a : a);
const fracN = (p, q = 1n) => {
  const g = gcdN(p, q) * (q < 0n ? -1n : 1n);
  return [p / g, q / g];
};
const intN = (n) => [BigInt(n), 1n];
const ONE = intN(1),
  ZERO = intN(0),
  HALF = [1n, 2n];
const [addN, subN, mulN, divN] = [([a, b], [c, d]) => fracN(a * d + c * b, b * d), ([a, b], [c, d]) => fracN(a * d - c * b, b * d), ([a, b], [c, d]) => fracN(a * c, b * d), ([a, b], [c, d]) => fracN(a * d, b * c)];
const negN = ([a, b]) => [-a, b];
const cmpN = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
const eqN = (a, b) => cmpN(a, b) === 0;
const powN = (q, n) => [q[0] ** BigInt(n), q[1] ** BigInt(n)];
/** Forty decimals are enough for every fraction of this page. */
const numN = ([p, q]) => Number((p * 10n ** 40n) / q) / 1e40;
const sgnT = (n) => `${n}`.replace('-', '−');
const strN = ([p, q]) => sgnT(p) + (q === 1n ? '' : `/${q}`);
const tupN = (v) => `(${v.map(strN).join(', ')})`;
const dotN = (a, b) => a.reduce((s, x, i) => addN(s, mulN(x, b[i])), ZERO);
const sameV = (a, b) => a.length === b.length && a.every((x, i) => eqN(x, b[i]));
const parseN = (s) => {
  const [p, q = '1'] = s.split('/');
  return fracN(BigInt(p), BigInt(q));
};
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
const readV = (v) => v.map(readN);
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹',
  SUB = '₀₁₂₃₄₅₆₇₈₉';
const subT = (n) => String(n).replace(/\d/g, (c) => SUB[c]),
  supT = (n) => String(n).replace('-', '⁻').replace(/\d/g, (c) => SUP[c]);

/** The pair at t = k/240 on the way (0, 1) → (1, 1) → (1, 0) → (1, −1) → (0, −1), up to sign and a common factor. */
function pairN(k) {
  const corner = [[0n, 1n], [1n, 1n], [1n, 0n], [1n, -1n], [0n, -1n]],
    side = Math.min(3, Math.floor(k / 240)),
    u = BigInt(k - 240 * side),
    [a, b] = [corner[side], corner[side + 1]];
  let [P, Q] = [0, 1].map((i) => a[i] * (240n - u) + b[i] * u);
  const g = gcdN(P, Q) * (Q < 0n || (Q === 0n && P < 0n) ? -1n : 1n);
  return [P / g, Q / g];
}
/** κ, s and C of a pair from the square of the Gaussian integer Q + iP over its norm. */
function circleN([P, Q]) {
  const n = P * P + Q * Q,
    C = [fracN(Q * Q - P * P, n), fracN(2n * P * Q, n)];
  return { n, C, kappa: mulN(HALF, addN(ONE, C[0])), spread: mulN(HALF, subN(ONE, C[0])) };
}
/** ℚP¹ with both entries at most M in size: a set of normalized pairs from a search over the whole square. */
function scalesN(M) {
  const out = new Set();
  for (let P = -M; P <= M; P++)
    for (let Q = -M; Q <= M; Q++) {
      if (!P && !Q) continue;
      const g = Number(gcdN(BigInt(P), BigInt(Q))) * (Q < 0 || (Q === 0 && P < 0) ? -1 : 1);
      out.add([P / g, Q / g].join());
    }
  return out;
}
const nodesMemo = new Map();
/** The rational points of the two-sphere with denominator at most D, by a search over all triples. */
function nodesN(D) {
  if (!nodesMemo.has(D)) {
    const out = new Set();
    for (let d = 1; d <= D; d++)
      for (let w = -d; w <= d; w++)
        for (let x = -d; x <= d; x++)
          for (let y = -d; y <= d; y++) {
            if (w * w + x * x + y * y !== d * d) continue;
            if (Number(gcdN(gcdN(BigInt(w), BigInt(x)), gcdN(BigInt(y), BigInt(d)))) === 1) out.add([w, x, y, d].join());
          }
    nodesMemo.set(D, out);
  }
  return nodesMemo.get(D);
}
/** Partial quotients by Euclid on whole numbers (b > 0), and the convergents by the recurrence of their terms. */
function euclidN(a, b) {
  const q = [];
  while (b) {
    const f = a >= 0n ? a / b : -((-a + b - 1n) / b);
    q.push(f);
    [a, b] = [b, a - f * b];
  }
  let [h0, h1, k0, k1] = [0n, 1n, 1n, 0n];
  const list = q.map((f) => {
    [h0, h1, k0, k1] = [h1, f * h1 + h0, k1, f * k1 + k0];
    return fracN(h1, k1);
  });
  return { q, list };
}
const cfText = (x) => {
  const [a, ...rest] = euclidN(...x).q.map(sgnT);
  return rest.length ? `[${a}; ${rest.join(', ')}]` : `[${a}]`;
};
const boundN = (x) => {
  let k = 0;
  while (2n ** BigInt(k + 1) <= x[1]) k++;
  return 2 * k + 1;
};
/** Prime factors by a sieve-free division from below. */
function factorN(n) {
  const out = [];
  for (let d = 2n; n > 1n; d++) while (n % d === 0n) {
    out.push(d);
    n /= d;
  }
  return out;
}
const escapeMemo = new Map();
function escapeN(S) {
  const key = S.join();
  if (!escapeMemo.has(key)) {
    const product = S.reduce((a, p) => a * BigInt(p), 1n),
      parts = factorN(product + 1n);
    escapeMemo.set(key, { product, N: product + 1n, residues: S.map((p) => (product + 1n) % BigInt(p)), parts, q: parts[0] });
  }
  return escapeMemo.get(key);
}
const factorText = (e) => {
  const count = {};
  e.parts.forEach((p) => (count[p] = (count[p] || 0) + 1));
  return `${e.N}${e.parts.length > 1 ? ' = ' + Object.entries(count).map(([p, n]) => p + (n > 1 ? supT(n) : '')).join(' × ') : ''}`;
};
const setText = (S) => `{${S.join(', ')}}`;
/** Quaternion products of rational quaternions, by the rule (s, u)(t, v) = (st − u·v, sv + tu + u × v). */
const crossN = (a, b) => range(3).map((i) => subN(mulN(a[(i + 1) % 3], b[(i + 2) % 3]), mulN(a[(i + 2) % 3], b[(i + 1) % 3])));
function qmN([s, ...u], [t, ...v]) {
  const c = crossN(u, v);
  return [subN(mulN(s, t), dotN(u, v)), ...range(3).map((i) => addN(addN(mulN(s, v[i]), mulN(t, u[i])), c[i]))];
}
const conjN = ([w, ...u]) => [w, ...u.map(negN)];
/** The rotation R(σ)v = q v q⁻¹ of the quaternion q = 1 + σ. */
function turnN(sigma, v) {
  const q = [ONE, ...sigma],
    n = dotN(q, q);
  return qmN(qmN(q, [ZERO, ...v]), conjN(q)).slice(1).map((x) => divN(x, n));
}
const SIGMA = [HALF, HALF, ZERO],
  V0 = [ZERO, ZERO, ONE];
/** R^N v₀ by quaternions, and exp₂(X)^N v₀ by its two coordinates on v₀ and σ × v₀: (a, b) ↦ (¾a − ½b, a + ¾b). */
const ORBIT_N = (() => {
  const w = crossN(SIGMA, V0),
    out = [{ v: V0, a: ONE, b: ZERO }];
  for (let N = 1; N <= 24; N++) {
    const { v, a, b } = out[N - 1];
    out.push({ v: turnN(SIGMA, v), a: subN(mulN([3n, 4n], a), mulN(HALF, b)), b: addN(a, mulN([3n, 4n], b)) });
  }
  return out.map(({ v, a, b }) => ({ v, den: v.reduce((d, [, q]) => (d / gcdN(d, q)) * q, 1n), norm: dotN(v, v), taylor: range(3).map((i) => addN(mulN(a, V0[i]), mulN(b, w[i]))) }));
})();
/** ((3 + 4i)/5)^t as Gaussian integers over 5^t. */
const HEAP_N = (() => {
  const out = [[1n, 0n]];
  for (let t = 1; t <= 24; t++) out.push([3n * out[t - 1][0] - 4n * out[t - 1][1], 4n * out[t - 1][0] + 3n * out[t - 1][1]]);
  return out.map(([a, b], t) => [fracN(a, 5n ** BigInt(t)), fracN(b, 5n ** BigInt(t))]);
})();
const kappaHeap = (t) => mulN(HALF, addN(ONE, HEAP_N[t][0]));
const DTH = Math.atan2(4, 3);
const eulerN = (t) => Math.exp(t * Math.log1p(DTH * DTH));
/** The closed form of the jet of 1/(1 + x²), and of the secant. */
function jetN(x) {
  const D = addN(ONE, mulN(x, x));
  return [divN(ONE, D), negN(divN(mulN(intN(2), x), mulN(D, D))), divN(subN(mulN(intN(3), mulN(x, x)), ONE), powN(D, 3))];
}
function secantN(x, h) {
  const y = addN(x, h),
    slope = negN(divN(addN(mulN(intN(2), x), h), mulN(addN(ONE, mulN(x, x)), addN(ONE, mulN(y, y)))));
  return { slope, error: subN(slope, jetN(x)[1]) };
}
const CHAIN_N = [
  ['1', '0', '0', '0'],
  ['1/3', '2/3', '2/3', '0'],
  ['-1/3', '-2/3', '2/3', '0'],
  ['-2/3', '1/3', '2/3', '0']
].map((v) => v.map(parseN));

/* ---------- what a printed decimal says ---------- */
const expOf = (e) => Number(e.replace('⁻', '-').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (d) => SUP.indexOf(d)));
const tenN = (e) => (e < 0 ? [1n, 10n ** BigInt(-e)] : [10n ** BigInt(e), 1n]);
/** The decimal a printed text names: 0.0205, −6.429×10⁻⁸. */
function decimalN(s) {
  const [m, e = '⁰'] = s.replace('−', '-').split('×10'),
    [whole, part = ''] = m.split('.');
  return mulN([BigInt(whole + part), 1n], tenN(expOf(e) - part.length));
}
const SCI = '\\d\\.\\d{2,3}×10⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+';
const VALUE = `(?:−?(?:1/2|1) [−+] ${SCI}|−?${SCI}|−?\\d+\\.\\d+)`;
/** What is wrong with the relation `sign printed` of a value: q as a fraction (null: irrational), x as a double; '' if right. */
function wrongRelation(sign, printed, q, x) {
  const tail = /^(−?)(1\/2|1) ([−+]) (.*)$/.exec(printed);
  if (tail) {
    const L = (tail[1] ? -1 : 1) * (tail[2] === '1' ? 1 : 0.5),
      d = q ? numN(subN(q, doubleN(L))) : x - L,
      size = numN(decimalN(tail[4]));
    if (sign !== '≈') return 'a difference after “=”';
    return Math.sign(d) === (tail[3] === '+' ? 1 : -1) && Math.abs(Math.abs(d) - size) <= 6e-4 * size ? '' : 'the difference';
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
/** The relation and the digits the page must print for a fraction; a value beside a landmark is written as a difference. */
function said(q, d = 4) {
  const [p, r] = q,
    a = (p < 0n ? -p : p) * 10n ** BigInt(d),
    k = (2n * a + r) / (2n * r),
    s = String(k).padStart(d + 1, '0'),
    text = `${p < 0n && k > 0n ? '−' : ''}${s.slice(0, s.length - d)}.${s.slice(s.length - d)}`,
    exact = a === k * r,
    v = Number(text.replace('−', '-'));
  if (!exact && [0, 0.5, 1].includes(Math.abs(v))) {
    const gap = numN(subN(q, doubleN(v))),
      t = Math.abs(gap).toExponential(3).split('e'),
      sci = `${t[0]}×10${supT(Number(t[1]))}`;
    return v === 0 ? `≈ ${gap < 0 ? '−' : ''}${sci}` : `≈ ${v < 0 ? '−' : ''}${Math.abs(v) === 1 ? '1' : '1/2'} ${gap < 0 ? '−' : '+'} ${sci}`;
  }
  return `${exact ? '=' : '≈'} ${text}`;
}
const round = (x, d = 4) => `≈ ${x.toFixed(d).replace('-', '−')}`;
const brief = (q, most = 17) => (strN(q).length <= most ? strN(q) : said(q).replace(/^= /, ''));
const signed = (q) => (q[0] < 0n ? brief(q) : `+${brief(q)}`);
const jetSet = (j) => `{${brief(j[0])}, ${brief(j[1])}, ${signed(j[2])}}`;
const jetBig = (j) => (jetSet(j).length <= 22 ? jetSet(j) : `κ′ ${said(j[1])}`);
const jetPoly = (j) => {
  const put = (q, tail) => `${q[0] < 0n ? '−' : '+'} ${strN([q[0] < 0n ? -q[0] : q[0], q[1]])} ${tail}`;
  return `${strN(j[0])} ${put(j[1], 'η')} ${put(j[2], 'η²')}`;
};
const over5 = (q, t) => (t < 2 ? strN(q) : `${sgnT(q[0])}/5${supT(t)}`);
const waveN = (t) => (t === 0 ? said(kappaHeap(0)) : t <= 8 ? `= ${strN(kappaHeap(t))} ${said(kappaHeap(t))}` : `= ${over5(kappaHeap(t), t)} ${said(kappaHeap(t))}`);
const chebN = (t) => (t < 3 ? strN(HEAP_N[t][0]) : over5(HEAP_N[t][0], t));
const pairT = ([P, Q]) => `[${sgnT(P)} : ${Q}]`;
const share = ([p, q]) => `= ${p}/${q} ${said([p, q])}`;
const valuedT = (zh) => (law, r) => law + (zh ? `（值 ${r}）` : ` (value ${r})`);
function errorT(x, h, zh) {
  const { error } = secantN(x, h);
  if (eqN(error, ZERO)) return zh ? '偏差 = 0（3x² + 2xh = 1 时割线与切线同斜率）' : 'error = 0 (at 3x² + 2xh = 1 the secant has the slope of the tangent)';
  return valuedT(zh)(`${zh ? '偏差' : 'error'}${strN(error).length <= 17 ? ' ' + strN(error) : ''} ${error[0] > 0n ? '>' : '<'} 0`, said(error));
}
const taylorT = (N, zh) => valuedT(zh)(`‖exp₂(X)${supT(N)}v₀‖² > 1`, said(powN([17n, 16n], N)));
const eulerT = (t, zh) => valuedT(zh)(`|(1 + iΔθ)${supT(t)}|² > 1`, round(eulerN(t)));
const firstT = (N, zh) => valuedT(zh)(`(3/2)${supT(N)} > 1`, said(powN([3n, 2n], N)));
const orbitT = (N) => `(${ORBIT_N[N].v.map(([p, q]) => sgnT(p * (ORBIT_N[N].den / q))).join(', ')})/${ORBIT_N[N].den}`;

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
const flatten = (text) => text.replace(/\s+/g, ' ');
const mixed = (text) => [...clauses(text).filter((x) => MIXED.test(x)), ...[...flatten(text).matchAll(DECIMAL)].map((m) => m[0]), ...[...flatten(text).matchAll(BESIDE)].map((m) => m[0])];

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
    if (m.type() === 'warning' && !driverInfo.test(m.text())) browserWarnings.push(`${p.url()}: ${m.text()}`);
  });
}
// The lab is a permanent night console: record every attempt to write data-tr-palette, from before page scripts run.
const paletteMutations = [],
  paletteDocuments = [];
async function watchPalette(context) {
  await context.exposeBinding('__finitePaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__finitePaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener(
      'DOMContentLoaded',
      () => window.__finitePaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined, dark: matchMedia('(prefers-color-scheme: dark)').matches }).catch(() => {}),
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
  'registration: §32.7, live, five cards in the order of the chapter and the fifteen GIDs in order',
  !!entry &&
    entry.chapter === 32 &&
    entry.section === SECTION &&
    entry.status === 'live' &&
    entry.added === '2026-11-23' &&
    entry.capture_lock === 'links' &&
    entry.code === 'OMEGA//FINITE' &&
    same(entry.presets, IDS) &&
    same(Object.keys(entry.preset_titles), IDS) &&
    same(entry.lean.map((x) => x.gid), GIDS) &&
    entry.theory.length === 1 &&
    entry.theory[0].label === '§32.7 · 无无穷·无超越数的有限有理数学' &&
    entry.theory[0].label_en === '§32.7 · Infinity-Free and Transcendental-Free Finite Rational Mathematics' &&
    entry.theory[0].href === '../zh/' + THEORY &&
    entry.theory[0].href_en === '../en/' + THEORY
);
check(
  'registration: the title of the page is the title of the registry in both languages',
  sources['index.html'].includes(`<title>OMEGA//FINITE · ${entry.title}</title>`) && sources['index.html'].includes(`data-title-en="OMEGA//FINITE · ${entry.title_en.replaceAll('&', '&amp;')}"`)
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
check('dependencies: exactly the 25 reads of this suite, each once, no chapter file and no other suite', READS.length === 25 && depList.length === 25 && same([...depList].sort(), READS) && !depList.some((d) => d.endsWith('.md')), JSON.stringify(depList));
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
check('the panel holds fifteen green boxes in the order of the theorem box, then two ARGUED, MODEL and NUM', same(GREEN.map((b) => b.gid), GIDS) && same(BOXES.slice(15).map((b) => b.kind), ['argued', 'argued', 'model', 'num']) && BOXES.length === 19);
// a green box says what the frozen theorem says: no instance of the page, no computed number, no rounding, no drift
const INSTANCE = /页面|本页|舞台|探针|滑块|偏差|余量|数值|演示|这里的|相差|实例|手工推导|this page|the page|on the page|stage|probe|slider|\bgap\b|drift|residue|instance|numerical|computes|differ by|derived by hand|≈|\d\.\d|10⁻|531441|30031|17\/16|3\/5/i;
check('green boxes: no instance, number, rounding, drift or remark of the page in any of the fifteen, in either language', GREEN.every((b) => b.zh.length > 30 && b.en.length > 30 && !INSTANCE.test(b.zh) && !INSTANCE.test(b.en) && !/MODEL|NUM|ARGUED/.test(b.zh + b.en)), GREEN.filter((b) => INSTANCE.test(b.zh) || INSTANCE.test(b.en)).map((b) => b.gid + ' ' + (INSTANCE.exec(b.zh) || INSTANCE.exec(b.en))[0]).join(' | '));
check('green boxes: no mixed inequality and no span the script fills', GREEN.every((b) => !mixed(b.zh).length && !mixed(b.en).length) && [...sources['index.html'].matchAll(/<div class="lean">(.*?)<\/div>/g)].every((m) => !/data-bench|\sid=/.test(m[1])));
{
  // everything the reader sees before the script runs holds no computed number: the box NUM and the spans of the drawer are empty
  const body = sources['index.html'].slice(sources['index.html'].indexOf('<body')),
    tag = /<div class="lean num"><span class="ok">NUM<\/span><span><span class="zh">—<\/span><span class="en">—<\/span><\/span><\/div>/g,
    spans = [...sources['index.html'].matchAll(/<span data-bench="([a-zA-Z0-9]+)">(.*?)<\/span>/g)].map((m) => [m[1], m[2]]);
  check('index.html: the NUM box is empty until the script fills it', (sources['index.html'].match(tag) || []).length === 1);
  const drawer = ['anchors', 'lattice', 'scales', 'cf', 'escape', 'escape6', 'matrix', 'three', 'cayley', 'det', 'taylor', 'cheb', 'kappa12', 'heap', 'euler', 'jet1', 'jet2', 'secant', 'error', 'stokes'];
  check('index.html: the numbers of the drawer are empty spans, each name once per language', same(spans.map((x) => x[0]), [...drawer, ...drawer]) && spans.every((x) => x[1] === '—'), JSON.stringify(spans));
  const decimals = [...plain(body.replace(/<button class="chip" data-speed[^>]*>[^<]*<\/button>/g, '')).matchAll(/(?<![§\d.])\d+\.\d+/g)].map((m) => m[0]);
  check('index.html: no decimal is written anywhere in the page text, the evidence or the drawer', !decimals.length, decimals.join(' '));
  check('index.html: no “≈” anywhere and no computed result of the page', !/≈/.test(sources['index.html']) && !/531441|30031|509|32125393|138133009|302680|−18\/41|5\/82|246|256\/256/.test(plain(body)), (/531441|30031|509|32125393|138133009|302680|−18\/41|5\/82|246|256\/256/.exec(plain(body)) || [''])[0]);
  check('index.html: no decimal, no “≈” and no mixed inequality in the description', [(/<meta name="description" content="([^"]*)"/.exec(sources['index.html']) || ['', '≈ 0.5 > 0'])[1]].every((d) => d.length > 100 && !/\d\.\d|≈/.test(d) && !mixed(plain(d)).length));
  check('index.html: the outputs are empty until the script writes them', ['mOut', 'nOut', 'tOut', 'roKey', 'roLoop', 'roHorizon', 'roPrime', 'roCayley', 'roCheb', 'roJet'].every((id) => sources['index.html'].includes(`<output id="${id}">—</output>`)));
  const said0 = mixed(plain(body));
  check('index.html: no rounded digits beside an inequality sign', !said0.length, said0.slice(0, 3).join(' | '));
  const js = sources['main.js'],
    code = js.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, ''),
    bare = code.replace(/<\/?(?:strong|sub|sup|span|i|b)\b[^<>]*>/g, ''),
    written = [...code.matchAll(/[=≈] ?−?\d+\.(?:\d{4}|\d{6}|\d{8}|\d{9})(?!\d)|\d\.\d+°|\d×10⁻|10⁻[⁰¹²³⁴⁵⁶⁷⁸⁹]/g)].map((m) => m[0]);
  check('main.js: no computed result is written into a sentence', !written.length && !/531441|30031|509|32125393|138133009|302680|314959|2\.0699|129\.74|1713|0\.5658|18\/41|5\/82|0\.0610|256/.test(code), written.join(' '));
  const chained = [...bare.matchAll(/\$\{[^{}]*(?:Rel|rel|relQ)\([^{}]*\)\}°? ?(?:&lt;|&gt;|[<>≤≥])|(?:&lt;|&gt;|[<>≤≥]) ?\$\{[^{}]*(?:Rel|relQ)\(/g)].map((m) => m[0]);
  check('main.js: no template puts an inequality sign beside a printed relation', !chained.length, chained.join(' | '));
  check(
    'main.js: the NUM box and the spans are filled before the evidence is copied into the drawer',
    js.indexOf('const BENCH = benchmarks();') > 0 && js.indexOf('document.querySelector(`#basis .lean.num .${lang}`).innerHTML = numText(say)') > js.indexOf('const BENCH = benchmarks();') && js.indexOf("$('drawerEvidence').append(") > js.indexOf('el.innerHTML = NUMBERS[el.dataset.bench](say)')
  );
  check('main.js: one formatter writes every relation (no “= ${fmt(” or toFixed in a sentence)', !/= ?\$\{fmt\(|\.toFixed\(/.test(js) && js.includes('function rel(q, x, d = 4)'));
  check('main.js: the probe is read-only and the orbit runs in big integers', js.includes('window.FINITE_DEBUG = Object.freeze({') && js.includes('const rotor = (s) => matMul(inverse(matSub(IDENT, skew(s))), matAdd(IDENT, skew(s)));'));
}
{
  // the detectors find what they must and leave the separated forms: the negative control of every later scan
  const bad = ['‖exp₂‖² ≈ 2.0699 > 1', '2.0699 > 1', '1 < ≈ 2.0699', '‖R‖² = 1.0000 > 0', 'error ≈ 0.0610 > 0', '0 < 5/82 ≈ 0.0610', 'κ ≈ 0.5658 ≤ 1', '≈ 0.5658 < 1', '1713.2039 > 1', '（值 ≈ 2.0699 > 1）', '≈ 2.0699 (u) > 1', '1.0000 ≥ 1'],
    good = ['‖exp₂(X)¹²v₀‖² > 1（值 ≈ 2.0699）。', '(3/2)¹² > 1 (value ≈ 129.7463).', '偏差 5/82 > 0（值 ≈ 0.0610）', 'P² + Q² = 1 > 0，κ = 0/1 = 0.0000', '5 ≤ 2⌊log₂ 12⌋ + 1 = 7。∏p + 1 = 31', 'κ = 0.0000 ↔ x = 1/0', '7/12: 5 ≤ 7', 'error < 0 (value ≈ −0.0012)'];
  check('the detector finds twelve rounded or decimal digits beside an inequality sign, without exception, and leaves eight separated texts', bad.every((x) => mixed(x).length > 0) && good.every((x) => !mixed(x).length), JSON.stringify([bad.filter((x) => !mixed(x).length), good.filter((x) => mixed(x).length)]));
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
const state = (p = page) => p.evaluate(() => window.FINITE_DEBUG.state);
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
      const s = window.FINITE_DEBUG.state;
      return s.preset === id && !s.blending && !s.playing && Math.abs(s.clock - still) < 1e-12;
    },
    [card, CARDS[card].still],
    // the clock advances at most 0.1 s per frame: with VIZ_SLOW_FRAMES=1000 a card takes up to 45 frames
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
        seen.push({ n, key: String(key).replace('~', ''), pts: n === 'tube' ? a[1] : n === 'line' || n === 'fan' ? a[0] : n === 'bead' || n === 'ring' ? [a[0]] : n === 'arrow' ? [a[0], a[1]] : n === 'poly' ? a[1].vertices : null, width: s.width || null, dash: !!(s.dash && s.dash.length), alpha: typeof s.alpha === 'number' ? s.alpha : 1, colors: [s.color, s.fill, s.edges, ...(s.colors || [])].filter(Boolean) });
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

/* ---------- the projective pairs, against a walk round the square written here ---------- */
await T.goto(BOOK, ID, '?lang=en');
await settle(page);
{
  const rows = await page.evaluate(() => Array.from({ length: 961 }, (_, k) => window.FINITE_DEBUG.calc('loop', k / 240).loop));
  let bad = 0;
  const seen = new Set();
  rows.forEach((o, k) => {
    const [P, Q] = pairN(k),
      c = circleN([P, Q]);
    seen.add([P, Q].join());
    if (!(o.k === k && BigInt(o.P) === P && BigInt(o.Q) === Q && BigInt(o.den) === c.n && c.n > 0n && eqN(readN(o.kappa), c.kappa) && eqN(readN(o.spread), c.spread) && sameV(readV(o.C), c.C) && eqN(dotN(c.C, c.C), ONE) && (Q === 0n ? o.x === null : eqN(readN(o.x), fracN(P, Q))))) bad++;
  });
  check('[P : Q] at the 961 places of the rail: reduced, P² + Q² > 0, κ = Q²/(P² + Q²), s = P²/(P² + Q²), C on the rational circle', bad === 0 && rows.length === 961, String(bad));
  check('the rail meets 960 different scales and closes: both ends are [0 : 1]', seen.size === 960 && rows[0].P === '0' && rows[960].P === '0' && rows[960].Q === '1');
  check(
    'the four anchors: [0 : 1], [1 : 1], [1 : 0] with C = (−1, 0) and κ = 0/1, [−1 : 1]',
    same([0, 240, 480, 720].map((k) => [rows[k].P, rows[k].Q, rows[k].kappa.join('/'), tupN(readV(rows[k].C))].join(' ')), ['0 1 1/1 (1, 0)', '1 1 1/2 (0, 1)', '1 0 0/1 (−1, 0)', '-1 1 1/2 (0, −1)'])
  );
  // nothing jumps at [1 : 0]: neighbouring places of the rail are neighbours on the circle
  const C = rows.map((o) => readV(o.C).map(numN));
  check('the circle is run through without a jump, at [1 : 0] too', C.slice(1).every((c, i) => Math.hypot(c[0] - C[i][0], c[1] - C[i][1]) < 0.0085) && C.every((c) => near(Math.hypot(...c), 1, 1e-12)));
  const sc = await page.evaluate(() => [1, 2, 3, 5, 8, 12].map((M) => window.FINITE_DEBUG.scales(M)));
  check('ℚP¹ with entries up to M, M = 1 … 12: the same sets as a search over the square, 184 scales at M = 12', [1, 2, 3, 5, 8, 12].every((M, i) => { const mine = scalesN(M); return mine.size === sc[i].length && sc[i].every((x) => mine.has(x.join())); }) && sc[5].length === 184);
}
/* ---------- the finite lattice, continued fractions and primes ---------- */
{
  const N = await page.evaluate(() => window.FINITE_DEBUG.nodes());
  const mine = nodesN(16);
  check('the rational points of the slice with denominators up to 16 are exactly those of a search over all triples', mine.size === N.list.length && N.list.every((n) => mine.has(n.join())) && new Set(N.list.map((n) => n.join())).size === N.list.length, `${mine.size} ${N.list.length}`);
  check('their numbers by horizon M = 1 … 16, and the numbers of scales; 246 and 184 at M = 12', range(16).every((k) => N.lattice[k + 1] === nodesN(k + 1).size && N.scales[k + 1] === scalesN(k + 1).size) && N.lattice[12] === 246 && N.scales[12] === 184, JSON.stringify(N.lattice));
  const axes = [[1, 2, 0], [1, -2, 0], [0, 1, 2], [0, 1, -2], [2, 0, 1], [-2, 0, 1]];
  check(
    'the six integer axes have squared norm 5 and 5 < 2⟨x, axis⟩² covers the lattice without an orthogonal pair in one colour',
    axes.every((a) => a.reduce((s, x) => s + x * x, 0) === 5) &&
      N.list.every(([w, x, y, d]) => axes.some((a) => 5 * d * d < 2 * (w * a[0] + x * a[1] + y * a[2]) ** 2)) &&
      axes.every((a) => { const own = N.list.filter(([w, x, y, d]) => 5 * d * d < 2 * (w * a[0] + x * a[1] + y * a[2]) ** 2); return own.every((u) => own.every((v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2] !== 0)); })
  );
  const tested = ['7/12', '5/8', '3/11', '5/12', '1/7', '0', '3', '-7/5', '34/55', '355/113', '-1/12', '13/8'],
    got = await page.evaluate((xs) => xs.map((s) => window.FINITE_DEBUG.cf(s)), tested);
  check(
    'continued fractions: the recursive list of the page against the recurrence of the convergents, length within 2⌊log₂ den⌋ + 1',
    tested.every((s, i) => { const x = parseN(s), e = euclidN(...x); return same(got[i].terms, e.q.map(String)) && sameV(readV(got[i].list), e.list) && eqN(e.list.at(-1), x) && got[i].bound === boundN(x) && e.q.length <= boundN(x); }),
    JSON.stringify(got[0])
  );
  check('7/12 = [0; 1, 1, 2, 2]: five convergents 0, 1, 1/2, 3/5, 7/12, bound 7', cfText(parseN('7/12')) === '[0; 1, 1, 2, 2]' && readV(got[0].list).map(strN).join(', ') === '0, 1, 1/2, 3/5, 7/12' && got[0].bound === 7);
  check(
    'the squares of Euclid: as many as the sum of the partial quotients, they tile the rectangle without overlap',
    ['7/12', '5/8', '3/11', '5/12', '1/7'].every((s) => {
      const x = parseN(s),
        sq = got[tested.indexOf(s)].squares,
        [a, b] = x.map(Number),
        cell = Array.from({ length: a * b }, () => 0);
      for (const [l, o, side] of sq) for (let i = l; i < l + side; i++) for (let j = o; j < o + side; j++) if (i < b && j < a) cell[j * b + i]++;
      return sq.length === Number(euclidN(...x).q.slice(1).reduce((t, q) => t + q, 0n)) && cell.every((c) => c === 1) && sq.reduce((t, [, , side]) => t + side * side, 0) === a * b;
    })
  );
  const sets = [[2], [2, 3], [2, 3, 5], [3, 7], [5, 7], [2, 3, 5, 7], [2, 3, 5, 7, 11], [2, 3, 5, 7, 11, 13], [2, 3, 5, 31], [2, 3, 5, 7, 31]],
    esc = await page.evaluate((s) => s.map((x) => window.FINITE_DEBUG.escape(x)), sets);
  check(
    'prime escape on ten sets: ∏p + 1 leaves remainder 1 everywhere, its factors multiply back, the least one is a prime outside S',
    sets.every((S, i) => { const e = escapeN(S); return BigInt(esc[i].N) === e.N && same(esc[i].residues, S.map(() => '1')) && same(esc[i].parts, e.parts.map(String)) && BigInt(esc[i].q) === e.q && !S.map(BigInt).includes(e.q) && factorN(e.q).length === 1 && e.parts.reduce((a, b) => a * b, 1n) === e.N; })
  );
  check('{2, 3, 5} → 31; {2, 3, 5, 7, 11, 13} → 30031 = 59 × 509 → 59; {3, 7} → 22 = 2 × 11 → 2', factorText(escapeN([2, 3, 5])) === '31' && factorText(escapeN([2, 3, 5, 7, 11, 13])) === '30031 = 59 × 509' && escapeN([2, 3, 5, 7, 11, 13]).q === 59n && factorText(escapeN([3, 7])) === '22 = 2 × 11' && escapeN([3, 7]).q === 2n);
}
/* ---------- the Cayley rotation and the truncated exponential ---------- */
{
  const M = await page.evaluate(() => window.FINITE_DEBUG.matrices()),
    O = await page.evaluate(() => window.FINITE_DEBUG.orbit());
  const R = M.R.map(readV),
    col = (j) => turnN(SIGMA, range(3).map((i) => (i === j ? ONE : ZERO)));
  check('R(1/2, 1/2, 0) = 1/3 · (2 1 2; 1 2 −2; −2 2 1), by conjugation with the quaternion 1 + σ', range(3).every((i) => range(3).every((j) => eqN(R[i][j], col(j)[i]))) && R.map(tupN).join(' ') === '(2/3, 1/3, 2/3) (1/3, 2/3, −2/3) (−2/3, 2/3, 1/3)');
  check('RᵀR = I, det R = 1, and (R + I)⁻¹(R − I) = X: (R + I)X = R − I', range(3).every((i) => range(3).every((j) => eqN(R.reduce((s, row) => addN(s, mulN(row[i], row[j])), ZERO), i === j ? ONE : ZERO))) && eqN(readN(M.det), ONE) && range(3).every((i) => range(3).every((j) => { const X = M.XBACK.map(readV); return eqN(range(3).reduce((s, k) => addN(s, mulN(addN(R[i][k], k === i ? ONE : ZERO), X[k][j])), ZERO), subN(R[i][j], i === j ? ONE : ZERO)); })) && same(M.XBACK, M.X));
  check(
    'R^N v₀ and exp₂(X)^N v₀, N = 0 … 24: by quaternions and by the two coordinates of the plane; denominators 3^N, squared norms 1 and (17/16)^N, Euler (3/2)^N',
    O.length === 25 && O.every((o, N) => sameV(readV(o.v), ORBIT_N[N].v) && BigInt(o.den) === 3n ** BigInt(N) && ORBIT_N[N].den === 3n ** BigInt(N) && eqN(readN(o.norm), ONE) && eqN(ORBIT_N[N].norm, ONE) && sameV(readV(o.w), ORBIT_N[N].taylor) && eqN(readN(o.taylor), powN([17n, 16n], N)) && eqN(dotN(ORBIT_N[N].taylor, ORBIT_N[N].taylor), powN([17n, 16n], N)) && eqN(readN(o.euler), powN([3n, 2n], N)))
  );
  check('N = 12: (302680, −302680, −314959)/531441, (17/16)¹² ≈ 2.0699, (3/2)¹² ≈ 129.7463', orbitT(12) === '(302680, −302680, −314959)/531441' && said(powN([17n, 16n], 12)) === '≈ 2.0699' && said(powN([3n, 2n], 12)) === '≈ 129.7463');
}
/* ---------- the Chebyshev heap ---------- */
{
  const H = await page.evaluate(() => window.FINITE_DEBUG.heap());
  check('x_t = ((3 + 4i)/5)^t by Gaussian integers, t = 0 … 24: the heap of the page, T_t(3/5), κ_t = (1 + T_t)/2 in [0, 1], squared norm 1', H.xs.length === 25 && H.xs.every((x, t) => sameV(readV(x), [...HEAP_N[t], ZERO, ZERO]) && eqN(readN(H.T[t]), HEAP_N[t][0]) && eqN(readN(H.kappa[t]), kappaHeap(t)) && eqN(readN(H.norm[t]), ONE) && cmpN(kappaHeap(t), ZERO) >= 0 && cmpN(kappaHeap(t), ONE) <= 0));
  check('t = 12: T = 32125393/5¹², κ = 138133009/5¹² ≈ 0.5658; the explicit Euler steps (1 + Δθ²)¹² ≈ 1713.2039', over5(HEAP_N[12][0], 12) === '32125393/5¹²' && waveN(12) === '= 138133009/5¹² ≈ 0.5658' && round(eulerN(12)) === '≈ 1713.2039');
  const cheb = await page.evaluate(() => [0, 1, 5, 12, 24].map((t) => window.FINITE_DEBUG.calc('cheb', t).cheb.euler));
  check('the Euler norm on the page', [0, 1, 5, 12, 24].every((t, i) => Math.abs(cheb[i] - eulerN(t)) <= 1e-9 * eulerN(t)));
}
/* ---------- jets, secants, the chain and the tetrahedron ---------- */
{
  const xs = range(37).map((k) => `${k - 18}/12`),
    j = await page.evaluate((s) => s.map((x) => window.FINITE_DEBUG.jet(x)), xs);
  check('κ(x + η) in ℚ[η]/(η³) at 37 points against the closed form', xs.every((x, i) => sameV(readV(j[i]), jetN(parseN(x)))));
  check('κ(1 + η) = 1/2 − 1/2 η + 1/4 η², κ(1/2 + η) = 4/5 − 16/25 η − 16/125 η²', jetPoly(jetN(ONE)) === '1/2 − 1/2 η + 1/4 η²' && jetPoly(jetN(HALF)) === '4/5 − 16/25 η − 16/125 η²' && jetSet(jetN(ONE)) === '{1/2, −1/2, +1/4}');
  // the quotient ring: the product of the jet with 1 + (x + η)² is 1 modulo η³, and its second derivative is twice the last entry
  check('the jet times 1 + (x + η)² is 1 modulo η³', xs.every((x, i) => { const [a, b, c] = readV(j[i]), q = parseN(x), D = addN(ONE, mulN(q, q)), t = mulN(intN(2), q); return eqN(mulN(a, D), ONE) && eqN(addN(mulN(a, t), mulN(b, D)), ZERO) && eqN(addN(addN(a, mulN(b, t)), mulN(c, D)), ZERO); }));
  const pairs = ['1/2', '1/4', '1/8', '1/16'].flatMap((h) => ['0', '1/3', '1/2', '1', '3/2'].map((x) => [x, h])),
    sec = await page.evaluate((ps) => ps.map(([x, h]) => window.FINITE_DEBUG.secant(x, h)), pairs);
  check('the secants at twenty pairs x, h against −(2x + h)/((1 + x²)(1 + (x + h)²))', pairs.every(([x, h], i) => { const s = secantN(parseN(x), parseN(h)); return eqN(readN(sec[i].slope), s.slope) && eqN(readN(sec[i].error), s.error); }));
  check('x = 1, h = 1/4: slope −18/41, error 5/82; x = 1/2, h = 1/4: the secant has exactly the slope −16/25 of the tangent', strN(secantN(ONE, [1n, 4n]).slope) === '−18/41' && strN(secantN(ONE, [1n, 4n]).error) === '5/82' && eqN(secantN(HALF, [1n, 4n]).error, ZERO) && strN(secantN(HALF, [1n, 4n]).slope) === '−16/25');
  const S = await page.evaluate(() => window.FINITE_DEBUG.stokes());
  const prod = (a, b) => qmN(a, conjN(b)),
    steps = [1, 2, 3].map((k) => prod(CHAIN_N[k], CHAIN_N[k - 1]));
  check('the chain x₀ … x₃ of rational unit quaternions; (x₃x₂⁻¹)(x₂x₁⁻¹)(x₁x₀⁻¹) = x₃x₀⁻¹', S.chain.every((v, k) => sameV(readV(v), CHAIN_N[k]) && eqN(dotN(CHAIN_N[k], CHAIN_N[k]), ONE)) && sameV(qmN(qmN(steps[2], steps[1]), steps[0]), prod(CHAIN_N[3], CHAIN_N[0])) && sameV(readV(S.product), prod(CHAIN_N[3], CHAIN_N[0])) && S.same === true && same(S.product, S.direct));
  // twice the signed area of the horizontal projection, by the cross product of two sides
  const area = (i, j_, k) => { const [a, b, c] = [i, j_, k].map((n) => CHAIN_N[n]), d = (u, v, n) => subN(v[n], u[n]); return subN(mulN(d(a, b, 1), d(a, c, 2)), mulN(d(a, b, 2), d(a, c, 1))); };
  let zero = 0;
  for (const r of range(4)) for (const i of range(4)) for (const k of range(4)) for (const l of range(4)) if (eqN(addN(subN(area(i, k, l), area(r, k, l)), subN(area(r, i, l), area(r, i, k))), ZERO)) zero++;
  check('δF = 0 on 256 of 256 ordered quadruples, with face values that are not all zero', zero === 256 && S.zero === 256 && S.quadruples === 256 && same(S.faceErrors, [0, 0, 0, 0]) && sameV(readV(S.areas), [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]].map((f) => area(...f))) && S.areas.some((x) => x[0] !== '0') && S.faces > 0);
  // the comparison machine on every pair of words of up to four bits
  const words = [[]];
  for (let k = 0; k < words.length; k++) if (words[k].length < 4) for (const bit of [false, true]) words.push([...words[k], bit]);
  const runs = await page.evaluate((ws) => ws.map((a) => ws.map((b) => window.FINITE_DEBUG.compareRun(a, b))), words);
  check('the comparison machine: 961 runs decide equality, restore the operands and halt within 2(|a| + |b|) + 4 steps', words.length === 31 && words.every((a, i) => words.every((b, k) => { const r = runs[i][k]; return r.out === (a.join() === b.join()) && r.kept && r.steps <= 2 * (a.length + b.length) + 4; })));
}
/* ---------- the drawn geometry ---------- */
{
  const g = await page.evaluate(() => {
    const G = window.FINITE_DEBUG.geometry,
      us = [0, 1, 2, 5, 12, 24];
    return { rho: G.rho, circle: ['0/1', '1/2', '1/1', '2/1', '3/1', '7/2'].map((s) => G.circle(s)), cayley: us.map((n) => G.cayley(n)), taylor: us.map((n) => G.taylor(n)), heap: us.map((n) => G.heap(n)), euler: us.map((n) => G.euler(n)), witch: [0, 0.5, 1, 1.5].map((x) => G.witch(x)), knot: [0, 1, 2, 3].map((u) => G.knot(u, 3)) };
  });
  const us = [0, 1, 2, 5, 12, 24];
  check('the circle: C([P : Q]) at radius ρ, 1 at the lower and −1 at the upper pole', [0, 120, 240, 480, 720, 840].every((k, i) => { const [c1, c2] = circleN(pairN(k)).C.map(numN); return nearV(g.circle[i], [g.rho * c2, 0, -g.rho * c1], 1e-9); }));
  check('the beads of the orbit are R^N v₀ on the sphere, the Taylor beads (17/16)^{N/2} out', us.every((N, i) => nearV(g.cayley[i], ORBIT_N[N].v.map((x) => 1.014 * numN(x)), 1e-9) && nearV(g.taylor[i], ORBIT_N[N].taylor.map((x) => 1.014 * numN(x)), 1e-9)));
  check('the heap beads stand at x_t, the Euler beads at t arctan Δθ on the radius ρ + 0.08 ln|1 + iΔθ|^t', us.every((t, i) => { const r = g.rho + 0.04 * Math.log(eulerN(t)), a = t * Math.atan(DTH); return nearV(g.heap[i], [g.rho * numN(HEAP_N[t][1]), 0, -g.rho * numN(HEAP_N[t][0])], 1e-9) && nearV(g.euler[i], [r * Math.sin(a), 0, -r * Math.cos(a)], 1e-9); }));
  check('the curve of κ: the point over x is at (2ρx, ρ(1 − 2κ)), the meeting of Agnesi of the sight line and the circle', [0, 0.5, 1, 1.5].every((x, i) => { const k = 1 / (1 + x * x); return nearV(g.witch[i], [2 * g.rho * x, 0, g.rho * (1 - 2 * k)], 1e-12) && near(g.rho * (1 - 2 * k), (-g.rho * (1 - x * x)) / (1 + x * x), 1e-12); }));
  check('the knot runs out along the gate, one step off it, and ends on top of the upright ring', g.knot[0][1] === 0 && g.knot[1][1] === 0 && g.knot[0][0] < 0 && g.knot[1][0] < g.knot[0][0] && g.knot[2][1] < 0 && near(g.knot[2][2], 0) && nearV(g.knot[3], [0, 0, 1.06], 1e-9));
}

/* ---------- the page as it opens ---------- */
{
  const s = await state();
  check('the projective card opens by default, parked on [1 : 0]', s.preset === DEFAULT && s.scene === 'loop' && s.loop.P === '1' && s.loop.Q === '0' && s.loop.den === '1' && same(s.loop.kappa, ['0', '1']) && tupN(readV(s.loop.C)) === '(−1, 0)' && !s.playing && s.clock === 2);
  const share_ = await viewportShare(page, '#stage');
  check('the stage holds at least a third of the viewport', share_ >= 0.33, String(share_));
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
      ['#pairChips', '#mRange', '#cfChips', '#setChips', '#takeBtn', '#nRange', '#tRange', '#xChips', '#hChips'].every((s) => !!q('#evidence > #ctlPanel ' + s)) &&
      !!q('#evidence > #readouts') &&
      !!q('#evidence > #basis') &&
      !!q('footer.rail .clock #now') &&
      ['§32.7', '5', 'NUM', 'trureturing'].every((x) => asides.includes(x)) &&
      [...document.querySelectorAll('.tagline > span')].every((el) => el.querySelector('em') && el.firstChild.nodeType === 3) &&
      !!q('link[href*="fonts.googleapis.com/css2?family=Chakra+Petch"]') &&
      [...document.querySelectorAll('#basis .lean')].every((el) => el.children.length === 2 && [...el.children].every((c) => c.tagName === 'SPAN')) &&
      document.querySelectorAll('#basis .lean.frozen, #basis .lean.open').length === 0 &&
      document.querySelectorAll('#basis .lean.argued').length === 2 &&
      document.querySelectorAll('#basis .lean.model').length === 1 &&
      document.querySelectorAll('#basis .lean.num').length === 1 &&
      document.querySelectorAll('#basis .lean:not(.argued):not(.model):not(.num)').length === 15 &&
      document.querySelectorAll('#drawerEvidence .lean').length === 19 &&
      [...document.querySelectorAll('#drawer .sheet > div.zh, #drawer .sheet > div.en')].every((el) => el.querySelector('p.lede') && el.querySelectorAll('ol li b').length === 6 && el.querySelector('p.lede.refs a')) &&
      document.querySelectorAll('[id]').length === new Set([...document.querySelectorAll('[id]')].map((e) => e.id)).size
    );
  })
);
check(
  'the lens names, the chips and the sliders in both languages',
  await page.evaluate(() => {
    const seg = (c, l) => document.querySelector(`#lensToggleBtn .seg.${c} .${l}`).textContent;
    const of = (sel, key) => JSON.stringify([...document.querySelectorAll(sel)].map((b) => b.dataset[key]));
    return (
      seg('off', 'zh') === 'Math_Ω 有限有理账本 · 无无穷无超越数精确闭合' &&
      seg('off', 'en') === 'Math_Ω Finite Rational Ledger · Infinity-Free & Transcendental-Free Closure' &&
      seg('on', 'zh') === '传统无穷超越对照（MODEL）· 奇点发散与级数截断' &&
      seg('on', 'en') === 'Classical Infinite–Transcendental Contrast (MODEL) · Blowups & Series Drift' &&
      of('#pairChips [data-pair]', 'pair') === JSON.stringify(['0', '12', '18', '24', '30', '36']) &&
      of('#cfChips [data-cf]', 'cf') === JSON.stringify(['7/12', '5/8', '3/11', '5/12', '1/7']) &&
      of('#setChips [data-set]', 'set') === JSON.stringify(['2', '2,3', '2,3,5', '3,7', '2,3,5,7,11,13']) &&
      of('#xChips [data-x]', 'x') === JSON.stringify(['0/1', '1/3', '1/2', '2/3', '1/1', '5/4', '3/2']) &&
      of('#hChips [data-h]', 'h') === JSON.stringify(['1/2', '1/4', '1/8', '1/16']) &&
      ['1', '24'].join() === [document.querySelector('#nRange').min, document.querySelector('#nRange').max].join() &&
      ['0', '24'].join() === [document.querySelector('#tRange').min, document.querySelector('#tRange').max].join() &&
      ['1', '16'].join() === [document.querySelector('#mRange').min, document.querySelector('#mRange').max].join()
    );
  })
);
check(
  'a card click starts a blend of the layers instead of a hard cut',
  await page.evaluate(() => {
    document.querySelector('[data-preset="rational-cayley-rotor-vs-taylor-series"]').click();
    const s = window.FINITE_DEBUG.state;
    return s.blending && s.layers.cayley < 1 && s.layers.loop > 0 && s.scene === 'cayley';
  })
);
await settle(page);
await until(page, () => !window.FINITE_DEBUG.state.blending);
check('the blend ends on the layers of the card', (await state()).layers.cayley === 1 && (await state()).layers.loop === 0);
await pause();

/* ---------- the evidence and the drawer ---------- */
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  const refs = await page.locator('#drawer .refs a').evaluateAll((els) => els.map((el) => el.getAttribute('href')));
  check(lang + ' theory link', same(refs.filter((h) => h.startsWith('../../' + lang + '/')), ['../../' + lang + '/' + THEORY]) && refs.length === 2, JSON.stringify(refs));
  check(lang + ' cited declarations', same(await page.locator('#basis a[data-lean-gid]').evaluateAll((els) => els.map((el) => el.dataset.leanGid)), GIDS));
  const box = async (selector) => (await page.locator('#basis ' + selector + ' .' + lang).allTextContents()).join(' ').replace(/\s+/g, ' ');
  const model = await box('.lean.model'),
    argued = await box('.lean.argued'),
    drawer = (await page.locator('#drawer .sheet > div.' + lang).allTextContents()).join(' ').replace(/\s+/g, ' ');
  check(
    lang + ' MODEL box names the program, the horizon cap, the contrast and the drawing conventions',
    ['Math_Ω', 'MΩ', '{w + xi + yj}', 'ℚ≤M', '(2x, 1 − 2κ)', 'xiyj − xjyi'].every((x) => model.includes(x)) && (lang === 'zh' ? ['都是诠释', '不是对标准数学的反驳', '对数刻度', '只示意大小', '不构造三元比较分类的那组数据'] : ['are interpretations', 'not a refutation of standard mathematics', 'logarithmic', 'only indicate a size', 'constructs no data of the classification of ternary comparisons']).every((x) => model.includes(x)),
    model.slice(0, 200)
  );
  check(
    lang + ' ARGUED boxes: the hand derivations and the literature',
    (lang === 'zh' ? ['手工推导', '文献结果，未在本书形式化', '图灵 1936', '巴拿赫与塔斯基 1924', '罗宾逊 1947', '凯莱 1846', '怀尔德伯格 2005', '科克 1981', '塔斯基 1948', '马季亚谢维奇 1970', '林德曼 1882', '半周旋转', '转速本来不同', '箕舌线'] : ['Derived by hand', 'Literature results, not formalized in this book', 'Turing 1936', 'Banach and Tarski 1924', 'Robinson 1947', 'Cayley 1846', 'Wildberger 2005', 'Kock 1981', 'Tarski 1948', 'Matiyasevich 1970', 'Lindemann 1882', 'half-turns', 'turn at different speeds', 'witch of Agnesi']).every((x) => argued.includes(x)) &&
      ['P² + Q² ≥ 1', '[c₂ : 1 + c₁]', '(1 + n)(I + X)', 'X = (R + I)⁻¹(R − I)', '2 arctan‖σ‖', '1 + n²/4', 'aN+1 = 2aN − 9aN−1', '(1 + u)(1 − u + u²) = 1', '−(2x + h)/((1 + x²)(1 + (x + h)²))', '(x₃x₂⁻¹)(x₂x₁⁻¹)(x₁x₀⁻¹) = x₃x₀⁻¹'].every((x) => argued.includes(x)),
    argued.slice(0, 300)
  );
  check(lang + ' ARGUED and MODEL: no mixed inequality, no green link', !mixed(argued).length && !mixed(model).length && (await page.locator('#basis .lean.argued a[data-lean-gid], #basis .lean.model a[data-lean-gid]').count()) === 0);
  check(
    lang + ' drawer states the five cards with the numbers of the script',
    ['[1 : 0] ↦ κ = 0', 'C = (−1, 0)', '= 246', '= 184', '[0; 1, 1, 2, 2]', '5 ≤ 7', '∏p + 1 = 31', '∏p + 1 = 30031 = 59 × 509', 'q = 59', '1/3 · [(2, 1, 2), (1, 2, −2), (−2, 2, 1)]', '= 531441', '= 1.0000', '≈ 2.0699', '32125393/5¹²', '= 138133009/5¹² ≈ 0.5658', '≈ 1713.2039', 'κ(1 + η) = 1/2 − 1/2 η + 1/4 η²', 'κ(1/2 + η) = 4/5 − 16/25 η − 16/125 η²', '= −18/41 ≈ −0.4390', '= 5/82 ≈ 0.0610', '256/256', 'MODEL'].every((x) => drawer.includes(x)) && (lang === 'zh' ? /不是证明/ : /not a proof/).test(drawer) && !mixed(drawer).length,
    JSON.stringify([drawer.slice(0, 600), mixed(drawer)])
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
    ['normSq_and_chebyshev', ['对每个四元数序列', '当且仅当', 'xn+2 = xn+1 xn* xn+1', 'xn+1 = Un(c)·x1 − Un−1(c)·x0', 'n = 0 时 U−1 = 0', '⟨x0, xn⟩ = Tn(c)', 'c = ⟨x0, x1⟩'], ['for every sequence', 'if and only if', 'xn+2 = xn+1 xn* xn+1', 'xn+1 = Un(c)·x1 − Un−1(c)·x0', 'with U−1 = 0 at n = 0', '⟨x0, xn⟩ = Tn(c)', 'c = ⟨x0, x1⟩']],
    ['exp_remainder_le', ['完备的实赋范代数', 'NormOneClass', '0 ≤ r < n + 1', '‖x‖ ≤ r', '‖exp x − Σk<n xk/k!‖ ≤ (rn/n!)/(1 − r/(n + 1))'], ['complete real normed algebra', 'NormOneClass', '0 ≤ r < n + 1', '‖x‖ ≤ r', '‖exp x − Σk<n xk/k!‖ ≤ (rn/n!)/(1 − r/(n + 1))']],
    ['rational_six_axis_open_cover', ['(1, 2, 0)、(1, −2, 0)、(0, 1, 2)、(0, 1, −2)、(2, 0, 1)、(−2, 0, 1)', '5 < 2⟨x, axisi⟩²', '每个 colori 是 S² 的开集', '对每个 i 与一切 x、y ∈ colori，⟨x, y⟩ ≠ 0', '六个 colori 之并是 S²'], ['(1, 2, 0), (1, −2, 0), (0, 1, 2), (0, 1, −2), (2, 0, 1), (−2, 0, 1)', '5 < 2⟨x, axisi⟩²', 'every colori is open in S²', 'for every i and all x, y ∈ colori, ⟨x, y⟩ ≠ 0', 'the union of the six colori is S²']],
    ['reduced_den', ['对一切自然数 s 与 r > 0', 'reduced(s, r) = s/r', 'r/gcd(s, r)'], ['for all natural numbers s and r > 0', 'reduced(s, r) = s/r', 'r/gcd(s, r)']],
    ['convergents_length_log', ['convergents(x)', '⌊x⌋ + 1/z', '对每个有理数 x', '≤ 2⌊log₂ den(x)⌋ + 1', '既约分母'], ['convergents(x)', '⌊x⌋ + 1/z', 'For every rational x', '≤ 2⌊log₂ den(x)⌋ + 1', 'in lowest terms']],
    ['prime_axis_escape', ['任意有限素数集 S', '模每个 p ∈ S 同余于 1', '存在不属于 S 的素数 q 整除 ∏p∈S p + 1'], ['any finite set S of primes', 'congruent to 1 modulo every p ∈ S', 'there is a prime q not in S that divides ∏p∈S p + 1']],
    ['stripFactors_correct', ['DecidableEq', '幺半群', 'm > 0', 'xm = 1', '含有 m 的全部素因子', 'xn/p = 1', 'M > 0，M 整除 m，xM = 1，且 M 等于 x 的阶 orderOf(x)'], ['monoid with decidable equality', 'm > 0', 'xm = 1', 'contain every prime divisor of m', 'xn/p = 1', 'M > 0, M divides m, xM = 1 and M = orderOf(x)']],
    ['rational_padic_product_formula', ['对每个有理数 x ≠ 0', '|x| · ∏p padicNormp(x) = 1', '∏ᶠ'], ['for every rational x ≠ 0', '|x| · ∏p padicNormp(x) = 1', '∏ᶠ']],
    ['irrational_log_natCast', ['对每个自然数 n ≥ 2', 'Real.log', '无理数'], ['for every natural number n ≥ 2', 'Real.log', 'irrational']],
    ['selected_tree_transport', ['命名生成树', 'φu(r) = 1', 'φu(t(e)) = u(e)·φu(s(e))', 'φg·u(a) = g(a)·φu(a)·g(r)⁻¹', '对 u 连续', 'φuw(a) = φu(a)·φw(a)', 'u 恒为 1 时 φu(a) = 1'], ['named spanning tree', 'φu(r) = 1', 'φu(t(e)) = u(e)·φu(s(e))', 'φg·u(a) = g(a)·φu(a)·g(r)⁻¹', 'continuous in u', 'φuw(a) = φu(a)·φw(a)', 'φu(a) = 1 when u is constantly 1']],
    ['tetra_defects_incidence_repair_and_exactness', ['V 是有限非空集', 'AddCommGroup', 'Σr faceErrors(r) = tetraDefects', '存在 r 使 |V|·faceErrors(r) ≤ tetraDefects', 'tetraDefects ≤ 4|V|·edgeErrors(edge)', '当且仅当存在 edge : V × V → A'], ['V be a finite nonempty set', 'AddCommGroup', 'Σr faceErrors(r) = tetraDefects', 'there is an r with |V|·faceErrors(r) ≤ tetraDefects', 'tetraDefects ≤ 4|V|·edgeErrors(edge)', 'if and only if there is an edge : V × V → A']],
    ['name_compare_run', ['对一切布尔列表 a、b、output、frame', 'compareMachine', '(none, none, true)', '至多 2(|a| + |b|) + 4 步', 'decide(a = b) :: output', '左右栈仍为 a 与 b', '备份栈为空'], ['for all Boolean lists a, b, output and frame', 'compareMachine', '(none, none, true)', 'within 2(|a| + |b|) + 4 steps', 'decide(a = b) :: output', 'the stacks a and b restored', 'the backup stacks empty']]
  ]) {
    const b = rendered.find((x) => x.code === name);
    check(`green box ${name}: the hypotheses and the conclusions of the frozen statement in both languages`, !!b && zh.every((x) => b.zh.includes(x)) && en.every((x) => b.en.includes(x)), JSON.stringify([zh.filter((x) => !b.zh.includes(x)), en.filter((x) => !b.en.includes(x))]));
  }
}

/* ---------- the NUM box and the numbers of the drawer: recomputed here for a frame ---------- */
/** Every phrase of the box and every span of the drawer for a frame, from the mathematics above. */
function expectedBench(lang, f) {
  const zh = lang === 'zh',
    none = zh ? '不符 0 处' : '0 failures',
    sep = zh ? '，' : ', ',
    semi = zh ? '；' : '; ',
    v = valuedT(zh),
    e1 = escapeN(f.S),
    e2 = escapeN(f.S6),
    scaleList = [...scalesN(f.M)].map((s) => s.split(',').map(Number)),
    finite = scaleList.filter(([, Q]) => Q).map(([P, Q]) => fracN(BigInt(P), BigInt(Q))),
    longest = Math.max(...finite.map((x) => euclidN(...x).q.length)),
    nodes = [...nodesN(f.M)].map((s) => s.split(',').map(Number)),
    axes = [[1, 2, 0], [1, -2, 0], [0, 1, 2], [0, 1, -2], [2, 0, 1], [-2, 0, 1]],
    colour = axes.reduce((t, a) => t + nodes.filter(([w, x, y, d]) => 5 * d * d < 2 * (w * a[0] + x * a[1] + y * a[2]) ** 2).length ** 2, 0),
    small = nodes.filter((n) => n[3] <= 3).length,
    triples = Math.ceil(small / 5) ** 3,
    rationals = finite.filter((x) => x[0] !== 0n).length + 2,
    anchors = [0, 240, 480, 720].map((k) => { const c = circleN(pairN(k)); return `${pairT(pairN(k))} ↦ κ = ${strN(c.kappa)}${sep}C = ${tupN(c.C)}`; }).join(semi),
    th = Math.SQRT1_2,
    tail = Math.hypot(Math.cos(th) - 1 + th * th / 2, Math.sin(th) - th),
    bound = divN(mulN(powN(f.r, 3), [1n, 6n]), subN(ONE, mulN(f.r, [1n, 4n]))),
    words = 2 ** (f.names + 1) - 1,
    bits = (n) => n.toString(2).length,
    secs = [f.x, f.x2].map((x) => secantN(x, f.h)),
    law = (x) => (zh ? `斜率 ${strN(secantN(x, f.h).slope)}，${errorT(x, f.h, zh)}` : `slope ${strN(secantN(x, f.h).slope)}, ${errorT(x, f.h, zh)}`),
    jets = [f.x, f.x2].map((x) => jetN(x)),
    list = (j) => [said(j[0]), said(j[1]), said(j[2])].join(zh ? '、' : ', ');
  // the least distance of ln 2 … ln M from fractions of denominator up to M, by the floor and the ceiling
  let least = Infinity;
  for (let n = 2; n <= f.M; n++) for (let q = 1; q <= f.M; q++) { const y = q * Math.log(n), g = y - Math.floor(y); least = Math.min(least, Math.min(g, 1 - g) / q); }
  const kt = f.t <= 8 ? `= ${strN(kappaHeap(f.t))} ${said(kappaHeap(f.t))}` : waveN(f.t);
  const spans = {
    anchors,
    lattice: `= ${nodes.length}`,
    scales: `= ${scaleList.length}`,
    cf: `[0; 1, 1, 2, 2]${sep}5 ≤ 7`,
    escape: `∏p + 1 = ${factorText(e1)}${sep}q = ${e1.q}`,
    escape6: `∏p + 1 = ${factorText(e2)}${sep}q = ${e2.q}`,
    matrix: '1/3 · [(2, 1, 2), (1, 2, −2), (−2, 2, 1)]',
    three: `= ${3n ** BigInt(f.N)}`,
    cayley: '= 1.0000',
    det: '= 1.0000',
    taylor: said(powN([17n, 16n], f.N)),
    cheb: over5(HEAP_N[f.t][0], f.t),
    kappa12: kt,
    heap: '= 1.0000',
    euler: round(eulerN(f.t)),
    jet1: `κ(${strN(f.x)} + η) = ${jetPoly(jets[0])}`,
    jet2: `κ(${strN(f.x2)} + η) = ${jetPoly(jets[1])}`,
    secant: `= ${strN(secs[0].slope)} ${said(secs[0].slope)}`,
    error: `= ${strN(secs[0].error)} ${said(secs[0].error)}`,
    stokes: '256/256'
  };
  const phrases = [
    anchors,
    zh ? `高度不超过 ${f.M} 的标度 ${scaleList.length} 个，‖C‖² = 1、逐点相异、读回 [P : Q] 与 κ + s = 1 ${none}，连分数最长 ${longest} 项、对上界 2⌊log₂ q⌋ + 1 ${none}；600 个 s/r 的既约分母${none}` : `${scaleList.length} scales of height up to ${f.M}: ‖C‖² = 1, distinct points, [P : Q] read back and κ + s = 1, ${none}; continued fractions of at most ${longest} terms, against 2⌊log₂ q⌋ + 1, ${none}; denominators of 600 fractions s/r, ${none}`,
    zh ? `视界 M = ${f.M}：切片格点 ${nodes.length} 个，未被六轴盖住 0 个，同色 ${colour} 个有序对里正交 0 对；${small} 个格点两两的 κ 与 1 − 弦长²/4 ${none}，基点 (3 + 4i)/5 的群分解在 ${triples} 个三元组上${none}，[y, x, x] = y ${none}` : `Horizon M = ${f.M}: ${nodes.length} lattice points of the slice, 0 not covered by the six axes, 0 orthogonal among ${colour} ordered pairs of one colour; on pairs of ${small} of them κ vs 1 − chord²/4, ${none}; the group at the base point (3 + 4i)/5 on ${triples} triples, ${none}; [y, x, x] = y, ${none}`,
    ...[[f.S, e1], [f.S6, e2]].map(([S, e]) => (zh ? `S = ${setText(S)} 给出 ∏p + 1 = ${factorText(e)}，各环余数 ${e.residues.join(', ')}，q = ${e.q}` : `S = ${setText(S)} gives ∏p + 1 = ${factorText(e)}, remainders ${e.residues.join(', ')}, q = ${e.q}`)),
    zh ? `乘积公式在 ${rationals} 个有理数上${none}；n = 2 … ${f.M} 的 log n 与分母不超过 ${f.M} 的分数的最小距离 ${round(least)}` : `the product formula on ${rationals} rationals, ${none}; the least distance of log 2 … log ${f.M} from fractions of denominator up to ${f.M} ${round(least)}`,
    zh ? `凯莱：R = 1/3 · [(2, 1, 2), (1, 2, −2), (−2, 2, 1)]，det R = 1.0000，逆映射找回 X ${none}` : `Cayley: R = 1/3 · [(2, 1, 2), (1, 2, −2), (−2, 2, 1)], det R = 1.0000, the inverse returns X, ${none}`,
    `R${supT(f.N)}v₀ = ${orbitT(f.N)}${sep}${zh ? '分母' : 'denominator'} 3${supT(f.N)} = ${3n ** BigInt(f.N)}${sep}‖R${supT(f.N)}v₀‖² = 1.0000`,
    zh ? `N = 0 … 24 的模方、分母 3N 与泰勒模方 (17/16)N ${none}` : `squared norm, denominator 3N and Taylor norm (17/16)N for N = 0 … 24, ${none}`,
    `${taylorT(f.N, zh)}${sep}${zh ? '一阶欧拉 ' : 'first-order Euler '}${firstT(f.N, zh)}`,
    zh ? `r = ${strN(f.r)} 时界是 ${strN(bound)}，而 ‖exp X − exp₂(X)‖ ${round(tail)}` : `with r = ${strN(f.r)} the bound is ${strN(bound)}, while ‖exp X − exp₂(X)‖ ${round(tail)}`,
    `T${f.t}(3/5) = ${over5(HEAP_N[f.t][0], f.t)}${sep}κ${f.t} ${kt}${sep}‖x${f.t}‖² = 1.0000${sep}${eulerT(f.t, zh)}${sep}Δθ ${round(DTH)}`,
    zh ? `t = 2 … 24 的堆递推与切比雪夫公式${none}` : `the heap for t = 2 … 24 vs the Chebyshev formulas, ${none}`,
    ...jets.map((j, i) => `κ(${strN([f.x, f.x2][i])} + η) = ${jetPoly(j)}${zh ? '，即 ' : ', that is '}${list(j)}`),
    zh ? `49 个切点与闭式、与 (1 + x²)κ = 1 ${none}` : `49 points vs the closed form and (1 + x²)κ = 1, ${none}`,
    zh ? `h = ${strN(f.h)} 在 x = ${strN(f.x)}：${law(f.x)}；在 x = ${strN(f.x2)}：${law(f.x2)}` : `h = ${strN(f.h)} at x = ${strN(f.x)}: ${law(f.x)}; at x = ${strN(f.x2)}: ${law(f.x2)}`,
    zh ? `粗链乘积等于首尾比 ${none}；四面体的面值 8/9, 2/9, −2/3, 0，δF = 0 有 256/256 个，各锚点的面错误 0, 0, 0, 0；路径 x₀x₁x₂x₃ 上有理相位的根相位${none}` : `The chain product vs the ends, ${none}; face values 8/9, 2/9, −2/3, 0, δF = 0 on 256/256, face errors 0, 0, 0, 0; the root phase of rational phases on x₀x₁x₂x₃, ${none}`,
    zh ? '(1, 1, 1): 12 → 3，(1, 0, 0): 24 → 4' : '(1, 1, 1): 12 → 3, (1, 0, 0): 24 → 4',
    zh ? `${words} 个不超过 ${f.names} 位的词、${words * words} 次运行${none}` : `${words} words of at most ${f.names} bits, ${words * words} runs, ${none}`,
    zh ? `${e1.q} 与 ${e2.q} 的二进制名用` : `the binary names of ${e1.q} and ${e2.q} are found ${e1.q === e2.q ? 'equal' : 'different'} in`,
    zh ? `${e1.q === e2.q ? '相等' : '不等'}，上界 ${2 * (bits(e1.q) + bits(e2.q)) + 4} 步` : `steps, bound ${2 * (bits(e1.q) + bits(e2.q)) + 4}`,
    zh ? '不检验定理的前提' : 'it does not check their hypotheses',
    zh ? '数值演示，不是证明。' : 'A numerical illustration, not a proof.'
  ];
  return { spans, phrases, v };
}
const FRAME = { M: 12, N: 12, t: 12, x: ONE, x2: HALF, h: [1n, 4n], S: [2, 3, 5], S6: [2, 3, 5, 7, 11, 13], r: [3n, 4n], names: 3 };
/** The audit of a page: the box, its copy and the spans against the numbers computed here; [] or what is wrong. */
async function auditBench(p, frame) {
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
    const { spans, phrases } = expectedBench(lang, frame),
      text = seen.box[lang];
    bad.push(...phrases.filter((x) => !text.includes(x)).map((x) => `${lang} box: ${x}`));
    if (/—|undefined|NaN|null|Infinity|∞/.test(text)) bad.push(`${lang} box: not filled`);
    if (!same(seen.spans[lang].map((x) => x[0]), Object.keys(spans))) bad.push(`${lang} spans: ${seen.spans[lang].map((x) => x[0]).join(' ')}`);
    for (const [key, s] of seen.spans[lang]) if (s !== spans[key]) bad.push(`${lang} drawer ${key}: ${s} (${spans[key]})`);
    bad.push(...mixed(text).map((x) => `${lang} chained: ${x}`));
    // every relation of the box is “=” before digits that are the value or “≈” before a rounding: no decimal stands without one
    for (const m of text.matchAll(/(.{0,3})(?<![\d.])\d+\.\d+/g)) if (!/[=≈] ?−?$/.test(m[1])) bad.push(`${lang} a decimal without a relation: ${m[0]}`);
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
  // the same sources with another frame: every number of the box and of the drawer follows it, so none of them is written down
  const patches = [['const FRAME = { M: 12, N: 12, t: 12, x: [1n, 1n], x2: [1n, 2n], h: [1n, 4n], S: [2, 3, 5], S6: [2, 3, 5, 7, 11, 13], r: [3n, 4n], names: 3 };', 'const FRAME = { M: 9, N: 7, t: 5, x: [1n, 3n], x2: [3n, 2n], h: [1n, 8n], S: [2, 7], S6: [3, 5, 11], r: [4n, 5n], names: 2 };']];
  const p = await patched(patches);
  const bad = await auditBench(p, { M: 9, N: 7, t: 5, x: [1n, 3n], x2: [3n, 2n], h: [1n, 8n], S: [2, 7], S6: [3, 5, 11], r: [4n, 5n], names: 2 });
  check('NUM: served with another frame (M = 9, N = 7, t = 5, x = 1/3 and 3/2, h = 1/8, {2, 7} and {3, 5, 11}, r = 4/5, two bits) the box and the drawer follow it: they are computed, not written', once(patches) && !bad.length, bad.slice(0, 6).join(' | '));
  await p.context().close();
}
for (const [what, patches, reads] of [
  // wrong laws in the script: the box counts the failures and the readouts keep no exact “=”
  ['a wrong circle', [['return { P: p, Q: q, den: d, kappa: frac(q * q, d), spread: frac(p * p, d), C: [frac(q * q - p * p, d), frac(2n * p * q, d)],', 'return { P: p, Q: q, den: d, kappa: frac(q * q, d), spread: frac(p * p, d), C: [frac(q * q + p * p, d), frac(2n * p * q, d)],']], (t) => /κ \+ s = 1 不符 [1-9]\d* 处/.test(t.box) && !t.roLoop.includes('(−1, 0)')],
  ['a wrong fidelity', [['kappa: frac(q * q, d), spread', 'kappa: frac(q * p, d), spread']], (t) => /κ \+ s = 1 不符 [1-9]\d* 处/.test(t.box)],
  ['an Euler step for the Cayley map', [['const rotor = (s) => matMul(inverse(matSub(IDENT, skew(s))), matAdd(IDENT, skew(s)));', 'const rotor = (s) => matAdd(IDENT, skew(s));']], (t) => /\(17\/16\)N 不符 [1-9]\d* 处/.test(t.box) && !/‖R¹²v₀‖² = 1\.0000/.test(t.box) && !t.roCayley.includes('531441')],
  ['a wrong Taylor coefficient', [['EXP2 = matAdd(matAdd(IDENT, X), matScale(matMul(X, X), HALF))', 'EXP2 = matAdd(matAdd(IDENT, X), matMul(X, X))']], (t) => /\(17\/16\)N 不符 [1-9]\d* 处/.test(t.box) && !t.roCayley.includes('2.0699')],
  ['a heap that repeats the wrong factor', [['xs.push(mulQ(mulQ(xs[t - 1], conjQ(xs[t - 2])), xs[t - 1]));', 'xs.push(mulQ(mulQ(xs[t - 1], conjQ(xs[t - 2])), xs[t - 2]));']], (t) => /切比雪夫公式不符 [1-9]\d* 处/.test(t.box) && !t.roCheb.includes('0.5658')],
  ['a jet inverse that stops after one term', [['return jetAdd(jetAdd([ONE, ZERO, ZERO], u.map(neg)), u2).map((x) => quo(x, a[0]));', 'return jetAdd([ONE, ZERO, ZERO], u.map(neg)).map((x) => quo(x, a[0]));']], (t) => /\(1 \+ x²\)κ = 1 不符 [1-9]\d* 处/.test(t.box) && !t.roJet.includes('+1/4')],
  ['a product plus two', [['N = product + 1n,', 'N = product + 2n,']], (t) => t.roPrime.includes('32 = 2⁵') && !t.box.includes('∏p + 1 = 31，')],
  ['a cochain with a wrong sign', [['F = (i, j, k) => plus(minus(edge(j, k), edge(i, k)), edge(i, j)),', 'F = (i, j, k) => plus(plus(edge(j, k), edge(i, k)), edge(i, j)),']], (t) => !t.box.includes('256/256') && /δF = 0 有 \d+\/256/.test(t.box)],
  ['a machine that forgets a bit', [["else st.left.unshift(x);", "else if (st.left.length) st.left.unshift(x);"]], (t) => /次运行不符 [1-9]\d* 处/.test(t.box)]
]) {
  const p = await patched(patches);
  const t = await p.evaluate(() => Object.fromEntries([['box', '#basis .lean.num .zh'], ...['roLoop', 'roPrime', 'roCayley', 'roCheb', 'roJet'].map((x) => [x, '#' + x])].map(([k, s]) => [k, document.querySelector(s).textContent.replace(/\s+/g, ' ')])));
  check(`NUM: with ${what} in the script the box and the readouts say so`, once(patches) && reads(t), JSON.stringify([once(patches), t.box.slice(0, 700), t.roLoop, t.roPrime, t.roCayley, t.roCheb, t.roJet]));
  await p.context().close();
}

/* ---------- the five cards in both languages ---------- */
const frameOf = (m) => ({ pair: [BigInt(m.loop.P), BigInt(m.loop.Q)], S: m.S, M: m.M, cf: parseN(m.cf), N: m.cayley.N, t: m.cheb.t, x: readN(m.jet.x), h: parseN(m.h), scene: m.scene, lens: m.lens });
/** Every number of the probe at its frame, against the mathematics above. */
function verifyMath(m, label) {
  const v = frameOf(m),
    c = circleN(v.pair),
    e = escapeN(v.S),
    cf = euclidN(...v.cf),
    s = secantN(v.x, v.h);
  check(
    label + ' the frame: pair, escape, lattice, orbit, heap and jet are the ones computed here',
    BigInt(m.loop.den) === c.n && c.n > 0n && sameV(readV(m.loop.C), c.C) && eqN(readN(m.loop.kappa), c.kappa) &&
      BigInt(m.escape.N) === e.N && BigInt(m.escape.q) === e.q && m.escape.lattice === nodesN(v.M).size && m.escape.scales === scalesN(v.M).size && m.escape.terms === cf.q.length && m.escape.bound === boundN(v.cf) &&
      sameV(readV(m.cayley.v), ORBIT_N[v.N].v) && eqN(readN(m.cayley.norm), ONE) && sameV(readV(m.cayley.w), ORBIT_N[v.N].taylor) &&
      sameV(readV(m.cheb.x), [...HEAP_N[v.t], ZERO, ZERO]) && eqN(readN(m.cheb.kappa), kappaHeap(v.t)) && Math.abs(m.cheb.euler - eulerN(v.t)) <= 1e-9 * eulerN(v.t) &&
      sameV(readV(m.jet.j), jetN(v.x)) && eqN(readN(m.jet.slope), s.slope) && eqN(readN(m.jet.error), s.error),
    JSON.stringify(v, (_, x) => (typeof x === 'bigint' ? String(x) : x))
  );
}
/** The words of the readouts at a frame, in full. */
function expectedReadouts(m) {
  const v = frameOf(m),
    c = circleN(v.pair),
    e = escapeN(v.S),
    s = secantN(v.x, v.h);
  return {
    roLoop: `${pairT(v.pair)} · ${c.n} · ${share(c.kappa)} · ${share(c.spread)} · ${tupN(c.C)}`,
    roHorizon: `M = ${v.M} · ${nodesN(v.M).size} · ${scalesN(v.M).size} · ${strN(v.cf)}: ${euclidN(...v.cf).q.length} ≤ ${boundN(v.cf)}`,
    roPrime: `${setText(v.S)} · ${factorText(e)} · ${e.residues.join(', ')} · q = ${e.q}`,
    roCayley: `N = ${v.N} · ${3n ** BigInt(v.N)} · = 1.0000 · ${said(powN([17n, 16n], v.N))}`,
    roCheb: `${v.t} · ${chebN(v.t)} · ${said(kappaHeap(v.t))} · = 1.0000`,
    roJet: `${strN(v.x)} · ${jetSet(jetN(v.x))} · ${brief(s.slope)} · ${strN(s.error).length <= 17 ? strN(s.error) + ' ' : ''}${said(s.error)}`,
    mOut: `= ${v.M}`,
    nOut: `= ${v.N}`,
    tOut: `= ${v.t}`
  };
}
async function verifyReadouts(p, label) {
  const m = await state(p),
    want = expectedReadouts(m),
    got = {};
  for (const k of Object.keys(want)) got[k] = await textOf(k, p);
  check(label + ' the readouts and the outputs of the sliders are the numbers computed here, exact after “=”, rounded after “≈”', same(got, want), JSON.stringify(Object.keys(want).filter((k) => got[k] !== want[k]).map((k) => [k, got[k], want[k]])));
}
/** What the HUD title and line must say at a frame in the finite ledger, on a wide stage. */
function expectedHud(m, zh) {
  const v = frameOf(m),
    c = circleN(v.pair),
    e = escapeN(v.S),
    secant = `${zh ? `h = ${strN(v.h)} 的割线斜率` : `the secant of h = ${strN(v.h)} has slope`} ${brief(secantN(v.x, v.h).slope)}${zh ? '，' : ', '}${errorT(v.x, v.h, zh)}`;
  return {
    loop: { big: `${pairT(v.pair)} · κ ${said(c.kappa)}`, sub: [`P² + Q² = ${c.n} > 0`, `κ ${share(c.kappa)}`, `s ${share(c.spread)}`, `C = ${tupN(c.C)}`] },
    escape: { big: `q = ${e.q} ∉ S`, sub: [`M = ${v.M}`, `εself = 1/${v.M}`, `${strN(v.cf)} = ${cfText(v.cf)}`, `${euclidN(...v.cf).q.length} ≤ 2⌊log₂ ${v.cf[1]}⌋ + 1 = ${boundN(v.cf)}`, `∏p + 1 = ${factorText(e)}`, `q = ${e.q} ∉ S`, zh ? `球面格点 ${nodesN(v.M).size} 个，圆上标度 ${scalesN(v.M).size} 个` : `${nodesN(v.M).size} lattice points and ${scalesN(v.M).size} scales of the circle`] },
    cayley: { big: `N = ${v.N} · ‖R${supT(v.N)}v₀‖² = 1.0000`, sub: ['σ = (1/2, 1/2, 0)', '1 + ‖σ‖² = 3/2', `R${supT(v.N)}v₀ = ${orbitT(v.N)}`, `3${supT(v.N)} = ${3n ** BigInt(v.N)}`, `‖R${supT(v.N)}v₀‖² = 1.0000`, 'det R = 1.0000', taylorT(v.N, zh)] },
    cheb: { big: `t = ${v.t} · ‖x${v.t}‖² = 1.0000`, sub: ['c = 3/5', 'xt+1 = 2c xt − xt−1', `T${v.t}(c) = ${chebN(v.t)}`, `κ${v.t} ${waveN(v.t)}`, `‖x${v.t}‖² = 1.0000`, ...(v.t ? [eulerT(v.t, zh)] : [])] },
    jet: { big: `x = ${strN(v.x)} · ${jetBig(jetN(v.x))}`, sub: [...(strN(jetN(v.x)[2]).length <= 10 ? [`κ(${strN(v.x)} + η) = ${jetPoly(jetN(v.x))}`] : [jetSet(jetN(v.x))]), `j₀ ${said(jetN(v.x)[0])}`, `j₁ ${said(jetN(v.x)[1])}`, `j₂ ${said(jetN(v.x)[2])}`, secant, 'δF = 0.0000', '256/256'] }
  }[v.scene];
}
/** Every mixed inequality on the whole visible page, the notes, the HUD, the labels and the readouts. */
async function noMixed(p, label) {
  const texts = await p.evaluate(() => ['#hudBig', '#hudSub', '#legend', '#presetNote', '#tour .what', '#readouts', '#ctlPanel', '#scenePill', '#keyPill', '#tau', '#formula', '#basis', '.strip'].map((s) => (document.querySelector(s) ? document.querySelector(s).innerText : '')).concat([...document.querySelectorAll('.stage .tag:not([hidden])')].map((e) => e.innerText)));
  const bad = texts.flatMap(mixed);
  check(label + ' no rounded or decimal digits beside an inequality sign anywhere on the page', !bad.length, bad.slice(0, 4).join(' | '));
}
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  for (const id of IDS) {
    check(lang + '/' + id + ' plays up to its still and parks', await pick(id));
    const m = await state(),
      c = CARDS[id],
      zh = lang === 'zh';
    check(lang + '/' + id + ' scene, view, rail, regime and parameters', m.preset === id && m.scene === c.scene && m.cam === c.cam && m.max === c.max && m.regime === c.regime && same([m.S, m.M, m.cf, m.h], [[2, 3, 5], 12, '7/12', '1/4']), JSON.stringify([m.scene, m.cam, m.max, m.regime, m.S]));
    verifyMath(m, lang + '/' + id);
    await verifyReadouts(page, lang + '/' + id);
    await layout(page, lang + '/' + id);
    const t = await regimeTexts(),
      want = expectedHud(m, zh);
    check(lang + '/' + id + ' HUD title and line state the card', t.big.includes(want.big) && want.sub.every((x) => t.sub.includes(x)), JSON.stringify([t.big, t.sub, want.sub.filter((x) => !t.sub.includes(x))]));
    const key = { loop: ['κ = 0.0000', 'x = 1/0'], escape: ['q = 31', zh ? '全体素数' : 'all primes'], cayley: ['‖R¹²v₀‖² = 1.0000', 'exp₂: ≈ 2.0699'], cheb: ['‖x12‖² = 1.0000', `${zh ? '欧拉' : 'Euler'}: ≈ 1713.2039`], jet: ['κ′ = −0.5000', `${zh ? '割线' : 'secant'}: ≈ −0.4390`] }[m.scene];
    check(lang + '/' + id + ' the key readout puts the finite track beside the classical one', (await textOf('roKey')) === key.join(' ↔ '), await textOf('roKey'));
    check(lang + '/' + id + ' the rail label', (await textOf('tau')) === { loop: 't = 2 · [1 : 0]', escape: 'q', cayley: 'N = 12', cheb: 't = 12', jet: 'x = 1' }[m.scene], await textOf('tau'));
    const readings = await page.locator('#readouts output').allTextContents();
    check(lang + '/' + id + ' one key and six readouts, all populated', readings.length === 7 && (await page.locator('#readouts dl.ro > div.key').count()) === 1 && readings.every((x) => x && !/NaN|undefined|∞|^—$/.test(x)), JSON.stringify(readings));
    check(lang + '/' + id + ' the note of the card panel and of the tour bar agree and are not empty', t.note.length > 10 && t.note === t.tour, JSON.stringify(t));
    await noMixed(page, lang + '/' + id);
    // the solid: an opaque violet body over an eighth of the stage or more, with light and shade
    const px = await solidPixels(page);
    check(lang + '/' + id + ' the violet ball: opaque over ≥ 12% of the stage, shaded', px.share >= 0.12 && px.spread >= 0.04, JSON.stringify([px.share, px.spread]));
  }
}
check('the registered stills are written on the cards', same(await page.$$eval('#presets [data-preset]', (els) => els.map((e) => Number(e.dataset.still))), IDS.map((id) => CARDS[id].still)));

/* ---------- the rails and the dials ---------- */
await setLang('en');
for (const [id, values] of [
  [LOOP, [0, 0.25, 1, 23 / 12, 2, 25 / 12, 3, 3.5, 4]],
  [ESCAPE, [0, 1, 2, 3]],
  [CAYLEY, [0, 1, 11, 22, 23]],
  [CHEB, [0, 1, 2, 8, 12, 24]],
  [JET, [0, 0.25, 0.5, 7 / 12, 1, 1.5]]
]) {
  await pick(id);
  for (const t of values) {
    await seek(t);
    const m = await state();
    check(`${id}: rail ${t}`, near(m.clock, t, 1e-9) && !m.playing && m.scene === CARDS[id].scene && near(m.at[m.scene], t, 1e-9), String(m.clock));
    verifyMath(m, `${id} rail ${t}`);
    await verifyReadouts(page, `${id} rail ${t}`);
    const box = await page.locator('#stageHandle').boundingBox(),
      at = await page.evaluate((x) => window.FINITE_DEBUG.dragTarget(x), t);
    check(`${id}: the handle sits on the current point at ${t}`, !!box && Math.hypot(box.x + box.width / 2 - at.x, box.y + box.height / 2 - at.y) < 1.5);
    const w = expectedHud(m, false),
      text = await regimeTexts();
    if (id !== ESCAPE) check(`${id}: the HUD at ${t}`, text.big.includes(w.big) && w.sub.every((x) => text.sub.includes(x)), JSON.stringify([text.big, text.sub, w.big, w.sub.filter((x) => !text.sub.includes(x))]));
    await noMixed(page, `${id} rail ${t}`);
  }
}
{
  // the four beats of the escape
  await pick(ESCAPE);
  for (const [u, regime, big, sub] of [
    [0, 'list', 'S = {2, 3, 5}', 'slot 0 at the gate'],
    [1, 'product', '∏p = 30', '∏p = 30 stands on slot 0 of every ring'],
    [2, 'one', '∏p + 1 = 31', 'remainder 1 on every ring'],
    [3, 'escaped', 'q = 31 ∉ S', 'the new prime q = 31 ∉ S opens its own ring']
  ]) {
    await seek(u);
    const m = await state(),
      t = await regimeTexts();
    check(`escape beat ${u}: ${regime}`, m.regime === regime && t.big.includes(big) && t.sub.includes(sub) && t.note === t.tour, JSON.stringify([m.regime, t.big, t.sub]));
    const f = await primitives(),
      residues = f.seen.filter((x) => /^residue/.test(x.key)).map((x) => x.pts[0]);
    // the bead of every ring: on the gate (the negative x axis) for the product, one slot off it for the product plus one
    const want = [2, 3, 5].map((p, i) => { const r = 1.14 + 0.085 * i, a = PI + (2 * PI * (u >= 2 ? 1 : 0)) / p; return [r * Math.cos(a), r * Math.sin(a), 0]; });
    check(`escape beat ${u}: the residue beads stand where the remainders put them`, u === 0 ? residues.length === 0 : residues.length === 3 && residues.every((q, i) => nearV(q, want[i], 1e-9)), JSON.stringify(residues));
    check(`escape beat ${u}: the upright ring of q is there only after the escape, with 31 slots`, f.seen.some((x) => x.key === 'ringQ') === (u === 3) && (u !== 3 || f.seen.find((x) => x.key === 'slotsQ31').pts.length === 31 * 6));
  }
  await seek(1.5);
  check('half way the HUD says that the number is leaving', (await state()).regime === 'moving' && (await textOf('hudSub')).includes('is leaving the rings of S') && (await textOf('tau')) === '1 → 2');
}
// whole rails keep whole numbers, loop and jet their twelfths, and a beat of the escape may stop half way
for (const [id, v, want] of [
  [CAYLEY, 4.4, 4],
  [CHEB, 7.5, 8],
  [LOOP, 1.97, 2],
  [LOOP, 0.6, 7 / 12],
  [JET, 0.52, 0.5],
  [ESCAPE, 1.5, 1.5],
  [ESCAPE, 1.02, 1]
]) {
  await pick(id);
  await page.evaluate(() => (document.querySelector('#now').step = 'any'));
  await seek(v);
  check(`${id}: the rail takes ${v} to ${want}`, near((await state()).clock, want, 1e-9), String((await state()).clock));
}
for (const [sel, v, scene, get, want] of [
  ['#nRange', 5, 'cayley', (m) => m.cayley.N, 5],
  ['#nRange', 24, 'cayley', (m) => m.cayley.N, 24],
  ['#nRange', 1, 'cayley', (m) => m.cayley.N, 1],
  ['#tRange', 0, 'cheb', (m) => m.cheb.t, 0],
  ['#tRange', 24, 'cheb', (m) => m.cheb.t, 24],
  ['#tRange', 7, 'cheb', (m) => m.cheb.t, 7],
  ['#mRange', 1, 'escape', (m) => m.M, 1],
  ['#mRange', 5, 'escape', (m) => m.M, 5],
  ['#mRange', 16, 'escape', (m) => m.M, 16]
]) {
  await input(sel, v);
  const m = await state();
  check(`${sel} = ${v} shows its card, moves its quantity and unmarks the cards`, m.scene === scene && get(m) === want && m.preset === null && !m.playing && near(m.clock, m.at[scene], 1e-12));
  verifyMath(m, `${sel} = ${v}`);
  await verifyReadouts(page, `${sel} = ${v}`);
  await layout(page, `${sel} = ${v}`);
  await noMixed(page, `${sel} = ${v}`);
}
{
  // the lattice: exactly the counted points at every horizon, all on the violet sphere, and the lift beyond it
  const counts = [];
  for (const M of [1, 3, 5, 8, 12, 16]) {
    await input('#mRange', M);
    const f = await primitives(),
      mesh = f.seen.find((x) => x.key === 'lattice' + M);
    counts.push([M, nodesN(M).size, mesh.pts.length / 6, (await state()).escape.lattice]);
    check(`M = ${M}: every drawn bead lies on the violet sphere and is a rational point of the lattice`, range(mesh.pts.length / 6).every((k) => { const c = range(3).map((i) => range(6).reduce((s, j) => s + mesh.pts[6 * k + j][i], 0) / 6); return near(Math.hypot(...c), 1.006, 1e-9) && [...nodesN(M)].some((n) => { const [w, x, y, d] = n.split(',').map(Number); return nearV(c, [(1.006 * x) / d, (-1.006 * y) / d, (-1.006 * w) / d], 1e-9); }); }));
  }
  check('the lattice draws exactly the counted points at M = 1, 3, 5, 8, 12, 16', counts.every(([, a, b, c]) => a === b && b === c), JSON.stringify(counts));
  await input('#mRange', 4);
  check('a fraction beyond the horizon is lifted on demand', (await textOf('roNote')).includes('The height of 7/12 exceeds M: lifted to 12 on demand.'), await textOf('roNote'));
  await input('#mRange', 12);
  check('inside the horizon nothing is lifted', !(await textOf('roNote')).includes('lifted'));
}
for (const k of [0, 12, 18, 24, 30, 36]) {
  await press(`#pairChips [data-pair="${k}"]`);
  const m = await state();
  check(`pair chip ${pairT(pairN(k * 20))}`, m.scene === 'loop' && pairT([BigInt(m.loop.P), BigInt(m.loop.Q)]) === pairT(pairN(k * 20)) && (await page.locator(`#pairChips [data-pair="${k}"]`).textContent()).trim() === pairT(pairN(k * 20)) && (await page.getAttribute(`#pairChips [data-pair="${k}"]`, 'aria-pressed')) === 'true' && m.preset === null);
  await verifyReadouts(page, `pair ${k}`);
  await layout(page, `pair ${k}`);
}
for (const s of ['5/8', '3/11', '5/12', '1/7', '7/12']) {
  await press(`#cfChips [data-cf="${s}"]`);
  const m = await state(),
    x = parseN(s),
    sq = (await primitives()).seen.filter((f) => f.n === 'fan');
  check(`continued fraction ${s} = ${cfText(x)}: terms within the bound, and the squares on the stage`, m.scene === 'escape' && m.cf === s && (await textOf('hudSub')).includes(`${s} = ${cfText(x)}`) && sq.length === Number(euclidN(...x).q.slice(1).reduce((t, q) => t + q, 0n)), String(sq.length));
  await verifyReadouts(page, `cf ${s}`);
  await layout(page, `cf ${s}`);
}
for (const s of ['2', '2,3', '3,7', '2,3,5,7,11,13', '2,3,5']) {
  await press(`#setChips [data-set="${s}"]`);
  const S = s.split(',').map(Number),
    e = escapeN(S),
    m = await state(),
    t = await regimeTexts();
  check(`set ${setText(S)}: ∏p + 1 = ${factorText(e)} and the new prime ${e.q}`, m.scene === 'escape' && same(m.S, S) && m.regime === 'escaped' && t.big.includes(`q = ${e.q} ∉ S`) && t.sub.includes(`∏p + 1 = ${factorText(e)}`) && (await page.getAttribute(`#setChips [data-set="${s}"]`, 'aria-pressed')) === 'true', JSON.stringify(t));
  await verifyReadouts(page, `set ${s}`);
  await layout(page, `set ${s}`);
}
{
  // the constructive step: the escaped prime joins S and the next one is made, again and again
  let S = [2, 3, 5];
  for (const btn of ['#takeBtn', '#stageAct', '#takeBtn']) {
    const q = Number(escapeN(S).q);
    S = [...S, q].sort((a, b) => a - b);
    await page.locator(btn).evaluate((b) => b.click());
    check(`${btn} takes ${q} into S and plays the next escape`, await until(page, (want) => { const s = window.FINITE_DEBUG.state; return !s.playing && s.regime === 'escaped' && s.S.join() === want; }, S.join(), 60000));
    await settle(page);
    const m = await state();
    check(`S = ${setText(S)}: ${factorText(escapeN(S))} gives ${escapeN(S).q}`, BigInt(m.escape.q) === escapeN(S).q && (await textOf('hudBig')).includes(`q = ${escapeN(S).q} ∉ S`) && m.preset === null);
    await verifyReadouts(page, `S = ${S}`);
    await layout(page, `S = ${S}`);
  }
  check('six primes: the button starts again from {2, 3, 5}', S.length === 6);
  await page.locator('#takeBtn').evaluate((b) => b.click());
  check('the full list starts again', await until(page, () => { const s = window.FINITE_DEBUG.state; return !s.playing && s.regime === 'escaped' && s.S.join() === '2,3,5'; }, null, 60000));
  await settle(page);
}
for (const s of ['0/1', '1/3', '1/2', '2/3', '1/1', '5/4', '3/2']) {
  for (const h of ['1/2', '1/4', '1/8', '1/16']) {
    await press(`#xChips [data-x="${s}"]`);
    await press(`#hChips [data-h="${h}"]`);
    const m = await state(),
      x = parseN(s),
      t = await regimeTexts(),
      w = expectedHud(m, false).sub,
      meet = eqN(secantN(x, parseN(h)).error, ZERO);
    check(`x = ${s}, h = ${h}: the jet, the secant and its error on the HUD`, m.scene === 'jet' && eqN(readN(m.jet.x), x) && m.h === h && m.regime === (x[0] === 0n ? 'apex' : meet ? 'meet' : 'run') && w.every((y) => t.sub.includes(y)) && (await page.getAttribute(`#xChips [data-x="${s}"]`, 'aria-pressed')) === 'true' && (await page.getAttribute(`#hChips [data-h="${h}"]`, 'aria-pressed')) === 'true', JSON.stringify([t.sub, w.filter((y) => !t.sub.includes(y))]));
    await verifyReadouts(page, `x = ${s}, h = ${h}`);
    await layout(page, `x = ${s}, h = ${h}`);
    await noMixed(page, `x = ${s}, h = ${h}`);
    // the note and the picture agree on whether there is a gap
    const gap = (await primitives()).seen.filter((f) => f.n === 'arrow');
    check(`x = ${s}, h = ${h}: an arrow in the magnifier exactly when there is an error, and the note says so`, (gap.length === 1) === !meet && t.note.includes(meet ? 'has the slope of the tangent here' : 'leaves a wedge of error') && t.note.includes(x[0] === 0n ? 'the osculating circle is the great circle' : 'the pale cyan band is the osculating circle'), JSON.stringify([gap.length, t.note]));
  }
}
check('exactly one of the 28 pairs makes the secant as steep as the tangent: x = 1/2, h = 1/4', ['0/1', '1/3', '1/2', '2/3', '1/1', '5/4', '3/2'].flatMap((x) => ['1/2', '1/4', '1/8', '1/16'].map((h) => [x, h])).filter(([x, h]) => eqN(secantN(parseN(x), parseN(h)).error, ZERO)).join() === '1/2,1/4');
{
  await pick(JET);
  const seen = [];
  for (const want of ['1/8', '1/16', '1/2', '1/4']) {
    await press('#stageAct');
    seen.push((await state()).h === want);
  }
  check('the button on the stage halves h and comes round', seen.every(Boolean) && (await state()).preset === null);
  await pick(LOOP);
  await page.locator('#stageAct').evaluate((b) => b.click());
  check('the button on the stage slides across [1 : 0] from [1 : 1] to [−1 : 1], the card stays marked', await until(page, (id) => { const s = window.FINITE_DEBUG.state; return !s.playing && s.preset === id && s.loop.P === '-1' && s.loop.Q === '1'; }, LOOP, 60000));
  await settle(page);
  // while it plays every frame is an exact pair: the loop never shows a division by zero
  await page.evaluate(() => {
    window.__pairs = [];
    const watch = () => {
      const s = window.FINITE_DEBUG.state;
      window.__pairs.push([s.loop.k, s.loop.den, document.getElementById('hudBig').textContent, document.getElementById('roLoop').textContent]);
      if (s.clock < 3.9) requestAnimationFrame(watch);
    };
    document.querySelector('[data-preset="homogeneous-projective-antipodal-closure"]').click();
    requestAnimationFrame(watch);
  });
  await until(page, () => !window.FINITE_DEBUG.state.playing && window.FINITE_DEBUG.state.clock === 2, null, 60000);
  await page.locator('#play').evaluate((b) => b.click());
  await until(page, () => !window.FINITE_DEBUG.state.playing && window.FINITE_DEBUG.state.clock === 4, null, 60000);
  const pairs = await page.evaluate(() => window.__pairs);
  check('every frame of the way round shows an exact pair on the grid with P² + Q² > 0, and no NaN or ∞', pairs.length > 10 && pairs.every(([k, den, big, ro]) => Number.isInteger(k) && BigInt(den) > 0n && !/NaN|∞|undefined/.test(big + ro)) && Math.max(...pairs.map((x) => x[0])) > 480, JSON.stringify(pairs.slice(0, 2)));
  check('the way round ends where it began: [0 : 1]', (await state()).loop.P === '0' && (await textOf('tau')) === 't = 4 · [0 : 1]');
}

/* ---------- the drawing keeps what it claims ---------- */
{
  await pick(CAYLEY);
  await seek(23);
  const f = await primitives(),
    at = (key) => f.seen.find((x) => x.key === key);
  check('24 steps: every point of the cyan tube and every bead is at the distance 1.014 from the centre, every Taylor bead at (17/16)^{N/2} times it', at('orbit').pts.every((q) => near(Math.hypot(...q), 1.014, 1e-9)) && range(25).every((N) => nearV(at('orbit' + N).pts[0], ORBIT_N[N].v.map((x) => 1.014 * numN(x)), 1e-9)) && range(24).every((k) => near(Math.hypot(...at('taylor' + (k + 1)).pts[0]), 1.014 * (17 / 16) ** ((k + 1) / 2), 1e-9)));
  check('the two tracks lie in the plane across the axis σ', [...at('orbit').pts, ...at('taylor').pts].every((q) => near((q[0] + q[1]) / Math.SQRT2, 0, 1e-9)));
  await pick(CHEB);
  const g = await primitives(),
    b = (key) => g.seen.find((x) => x.key === key);
  check('the heap beads sit on the great circle and the Euler beads leave it', range(13).every((k) => near(Math.hypot(...b('heap' + k).pts[0]), 1.03, 1e-9)) && range(12).every((k) => near(Math.hypot(...b('euler' + (k + 1)).pts[0]), 1.03 + 0.04 * Math.log(eulerN(k + 1)), 1e-9)));
  // the wave stands at the heights of the beads: seen from the front the height on the screen is 1 − 2κ
  const cam = (await state()).camera,
    U = [Math.sin(cam.yaw) * Math.sin(cam.pitch), Math.cos(cam.yaw) * Math.sin(cam.pitch), Math.cos(cam.pitch)];
  const high = (p) => p[0] * U[0] + p[1] * U[1] + p[2] * U[2];
  check('the wave shows κ_t: every point stands at 1.03 (1 − 2κ_t) on the scale of the ball', range(12).every((t) => near(high(b('wave' + t).pts[0]), 1.03 * (1 - 2 * numN(kappaHeap(t))) * U[2], 1e-9)) && near(high(b('waveNow').pts[0]), 1.03 * (1 - 2 * numN(kappaHeap(12))) * U[2], 1e-9));
  await pick(JET);
  const j = await primitives(),
    c = (key) => j.seen.find((x) => x.key === key);
  check('the witch is drawn to the scale of the ball and the current point is on it', c('witch').pts.every((q) => { const x = q[0] / 2.06; return near(q[2], 1.03 * (1 - 2 / (1 + x * x)), 1e-9) && q[1] === 0; }) && nearV(c('current').pts[0], [2.06, 0, 0], 1e-9) && near(c('next').pts[0][0], 2.06 * 1.25, 1e-9));
  // the tangent line through the point has the slope −κ′ = 1/2 and the secant 18/41 in the drawing
  const lines = j.seen.filter((x) => x.n === 'line' && x.pts.length === 2),
    slope = (l) => (l.pts[1][2] - l.pts[0][2]) / (l.pts[1][0] - l.pts[0][0]),
    tan = lines.find((l) => l.width === 3 && l.colors.includes(j.palette.cyan)),
    secant = lines.find((l) => l.width === 2.4 && l.colors.includes(j.palette.magenta));
  check('in the drawing the cyan tangent rises by 1/2 and the magenta secant by 18/41', near(slope(tan), 0.5, 1e-9) && near(slope(secant), 18 / 41, 1e-9));
  // the osculating band: a circle through the point with the tangent of the curve and its second derivative
  const band = j.seen.find((x) => x.n === 'line' && x.width === 8).pts,
    mid = band[30],
    [p0, p1, p2] = [band[0], mid, band[60]],
    circ = (A, B, C) => { const a = Math.hypot(B[0] - C[0], B[2] - C[2]), b2 = Math.hypot(A[0] - C[0], A[2] - C[2]), c2 = Math.hypot(A[0] - B[0], A[2] - B[2]), area2 = Math.abs((B[0] - A[0]) * (C[2] - A[2]) - (C[0] - A[0]) * (B[2] - A[2])); return (a * b2 * c2) / (2 * area2); };
  check('the osculating band has the radius (1 + κ′²)^{3/2}/|κ″| on the scale 2ρ', near(circ(p0, p1, p2), (2 * 1.03 * 1.25 ** 1.5) / 0.5, 1e-6) && near(mid[0], 2.06, 1e-6), String(circ(p0, p1, p2)));
  await seek(0);
  const apex = (await primitives()).seen.find((x) => x.n === 'line' && x.width === 8).pts;
  check('at x = 0 the osculating circle is the great circle of the ball', apex.every((q) => near(Math.hypot(q[0], q[2]), 1.03, 1e-9)));
  await pick(LOOP);
  const l = await primitives();
  check('at [1 : 0] two parallel magenta arrows leave the upper pole and no landing point is drawn; the ruler is cracked', l.seen.filter((x) => x.n === 'arrow').length === 2 && l.seen.filter((x) => x.n === 'arrow').every((x) => x.colors.includes(l.palette.magenta) && near(x.pts[0][2], 1.03, 1e-9) && near(x.pts[1][2], 1.03, 1e-9) && x.dash) && !l.seen.some((x) => x.key === 'landing'));
  await seek(1);
  const k = await primitives();
  check('at [1 : 1] the sight line lands at x = 1 on the ruler', nearV(k.seen.find((x) => x.key === 'landing').pts[0], [2.06, 0, -1.03], 1e-9) && k.seen.filter((x) => x.n === 'arrow').length === 0);
  await seek(23 / 12);
  check('just before [1 : 0] the sight line runs off the ruler', (await primitives()).seen.filter((x) => x.n === 'arrow').length === 1 && !(await primitives()).seen.some((x) => x.key === 'landing'));
}

/* ---------- the two lenses and the views ---------- */
const strength = (f, name) => f.seen.filter((x) => x.colors.includes(f.palette[name]) && !x.colors.includes(f.palette.violet)).reduce((s, x) => Math.max(s, x.alpha), 0);
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  const zh = lang === 'zh';
  for (const id of IDS) {
    await pick(id);
    const before = await state(),
      f0 = await primitives(),
      pill0 = await textOf('scenePill'),
      big0 = await textOf('hudBig'),
      sub0 = await textOf('hudSub');
    await press('#lensToggleBtn');
    const on = await state(),
      f1 = await primitives(),
      sub1 = await textOf('hudSub');
    const want = {
      loop: [zh ? 'x = P/Q 在这里要做 1/0' : 'x = P/Q would divide 1/0 here'],
      escape: [zh ? '一只已装完的袋子' : 'one completed bag', 'S = {2, 3, 5}'],
      cayley: ['17/16', taylorT(12, zh), firstT(12, zh)],
      cheb: ['arccos(3/5) ≈ 0.9273', eulerT(12, zh)],
      jet: ['h = 1/4', '−18/41', errorT(ONE, [1n, 4n], zh), '−1/2']
    }[on.scene];
    check(
      `${lang}/${id} the contrast lens renames the picture, says MODEL on the switch, the pill and the title, and keeps the state`,
      on.lens === 1 && (await textOf('scenePill')) !== pill0 && (await textOf('hudBig')) !== big0 && sub1 !== sub0 && /MODEL/.test(await textOf('hudBig')) && /MODEL/.test(await textOf('scenePill')) && /MODEL/.test(await page.locator('#lensToggleBtn .seg.on').innerText()) && ['at', 'scene', 'preset', 'S', 'M', 'cf', 'h', 'loop', 'cayley', 'cheb', 'jet', 'camera'].every((k) => same(on[k], before[k])) && (await page.getAttribute('#lensToggleBtn', 'aria-pressed')) === 'true' && (await page.getAttribute('#lensMirror', 'aria-pressed')) === 'true',
      JSON.stringify([await textOf('hudBig'), sub1])
    );
    check(`${lang}/${id} the contrast lens writes its numbers`, want.every((x) => sub1.includes(x)), JSON.stringify([sub1, want.filter((x) => !sub1.includes(x))]));
    check(`${lang}/${id} the contrast lens dims the exact cyan and never the classical magenta`, strength(f1, 'cyan') < strength(f0, 'cyan') && strength(f1, 'magenta') >= strength(f0, 'magenta') - 1e-9, JSON.stringify([strength(f0, 'cyan'), strength(f1, 'cyan'), strength(f0, 'magenta'), strength(f1, 'magenta')]));
    await layout(page, `${lang}/${id} contrast lens`);
    await noMixed(page, `${lang}/${id} contrast lens`);
    await press('#lensToggleBtn');
    check(`${lang}/${id} the finite ledger is back`, (await state()).lens === 0 && (await textOf('hudSub')) === sub0);
  }
}
await pick(DEFAULT);
const views = [];
for (const name of CAM_NAMES) {
  await press('[data-cam="' + name + '"]');
  check('selected view ' + name, (await state()).cam === name && (await page.getAttribute('[data-cam="' + name + '"]', 'aria-pressed')) === 'true');
  views.push((await state()).camera);
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
  [LOOP, 1],
  [LOOP, 2.5],
  [ESCAPE, 1],
  [CAYLEY, 6],
  [CHEB, 3],
  [JET, 0.5]
]) {
  await pick(id);
  const before = await state();
  await dragHandle(await page.evaluate((x) => window.FINITE_DEBUG.dragTarget(x), t));
  const m = await state();
  check(`${id}: dragging the handle moves the rail to ${t}, leaves the camera alone and unmarks the card`, near(m.clock, t, id === ESCAPE ? 0.05 : 1e-9) && same(m.camera, before.camera) && m.preset === null && !m.playing, String(m.clock));
  const box = await page.locator('#stageHandle').boundingBox(),
    at = await page.evaluate((x) => window.FINITE_DEBUG.dragTarget(x), m.clock);
  check(`${id}: after the drag the handle is on the point again`, Math.hypot(box.x + box.width / 2 - at.x, box.y + box.height / 2 - at.y) < 1.5);
}
for (const [id, keys] of [
  [LOOP, [['ArrowRight', 25 / 12], ['ArrowLeft', 2], ['Home', 0], ['End', 4]]],
  [ESCAPE, [['ArrowLeft', 2], ['Home', 0], ['ArrowUp', 1], ['End', 3]]],
  [CAYLEY, [['ArrowUp', 12], ['ArrowDown', 11], ['Home', 0], ['End', 23]]],
  [CHEB, [['ArrowRight', 13], ['Home', 0], ['End', 24]]],
  [JET, [['ArrowRight', 13 / 12], ['ArrowLeft', 1], ['Home', 0], ['End', 1.5]]]
]) {
  await pick(id);
  await page.locator('#stageHandle').focus();
  for (const [key, want] of keys) {
    await page.keyboard.press(key);
    await settle(page);
    check(`${id}: ${key} on the handle goes to ${want}`, near((await state()).clock, want, 1e-9) && near((await state()).at[CARDS[id].scene], want, 1e-9), String((await state()).clock));
  }
}

/* ---------- playback ---------- */
await pick(CAYLEY);
for (const id of IDS) {
  const at = await playsAfter(page, () => page.locator(`[data-preset="${id}"]`).evaluate((b) => b.click()), () => ({ playing: window.FINITE_DEBUG.state.playing, t: window.FINITE_DEBUG.state.clock }));
  check(`${id}: a click on the card plays it`, at);
  check(`${id}: it parks on its still`, await until(page, ([c, s]) => { const m = window.FINITE_DEBUG.state; return !m.playing && m.preset === c && Math.abs(m.clock - s) < 1e-12; }, [id, CARDS[id].still], 150000));
  await settle(page);
}
{
  await pick(CAYLEY);
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
  await page.keyboard.press(' ');
  check('Space plays on from the still', await until(page, () => window.FINITE_DEBUG.state.playing && window.FINITE_DEBUG.state.clock > 11));
  await page.keyboard.press(' ');
  check('a pause rests on a whole number of steps', await until(page, () => { const m = window.FINITE_DEBUG.state; return !m.playing && Number.isInteger(m.clock) && m.cayley.f === 0; }));
  await press('#rew');
  check('⏮ goes back to the first step', (await state()).clock === 0 && (await state()).cayley.N === 1);
}

/* ---------- colours ---------- */
await setLang('en');
for (const id of IDS) {
  await pick(id);
  const { seen, palette: P } = await primitives();
  const of = (key) => seen.filter((x) => x.key === key).flatMap((x) => x.colors);
  const amber = seen.filter((x) => x.colors.includes(P.amber)).map((x) => x.key);
  check(
    id + ' semantic stage colours: amber only on the current point (and its copy on the wave), no green and no red, the ball violet',
    same(amber.sort(), id === CHEB ? ['current', 'waveNow'] : ['current']) && seen.every((x) => !x.colors.includes(P.ok) && !x.colors.includes(P.warn)) && of('ball').includes(P.violet),
    JSON.stringify(amber)
  );
  if (id === LOOP) check('loop: circle, scales and anchors cyan, ruler and sight lines magenta', ['loop', 'gone', 'scales6', 'anchor0', 'anchor1', 'anchor3'].every((k) => of(k).includes(P.cyan)) && !seen.some((x) => x.key === 'anchor2') && seen.filter((x) => x.n === 'line' && x.colors.includes(P.magenta)).length > 8);
  if (id === ESCAPE) check('escape: lattice, rings, beads and the ring of q cyan, no magenta in the finite ledger', ['lattice12', 'residue0', 'residue2', 'ringQ', 'slotsQ31'].every((k) => of(k).includes(P.cyan)) && !seen.some((x) => x.colors.includes(P.magenta)));
  if (id === CAYLEY) check('cayley: the orbit cyan, the Taylor track magenta, the axis violet', ['orbit', 'orbit0', 'orbit12'].every((k) => of(k).includes(P.cyan)) && ['taylor', 'taylor1', 'taylor12'].every((k) => of(k).includes(P.magenta)) && seen.some((x) => x.n === 'arrow' && x.colors.includes(P.violet)));
  if (id === CHEB) check('cheb: the great circle, the beads and the wave cyan, the Euler track magenta', ['great', 'heap0', 'heap12', 'wave0', 'wave11'].every((k) => of(k).includes(P.cyan)) && ['euler', 'euler12'].every((k) => of(k).includes(P.magenta)));
  if (id === JET) check('jet: the curve, the chain and the touch cyan, the secant magenta', ['witch', 'step0', 'step1', 'step2', 'end0', 'end3', 'lensTouch'].every((k) => of(k).includes(P.cyan)) && ['next', 'lensNext'].every((k) => of(k).includes(P.magenta)));
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
/** What the two plots draw on the next frame: lines, polygons, dots and legend texts with their boxes. */
const stripFrame = (p = page) =>
  p.evaluate(() => {
    const kit = TRV.kit,
      plot = kit.plot,
      out = {},
      touched = [];
    kit.plot = (cv, o) => {
      const g = plot(cv, o),
        rec = { id: cv.id, w: cv.clientWidth, h: cv.clientHeight, y0: g.y0, y1: g.y1, lines: [], polys: [], dots: [], tops: [], texts: [], ticks: [] };
      out[cv.id] = rec;
      const line = g.line,
        dot = g.dot,
        poly = g.poly;
      g.line = (pts, color, s) => {
        const width = (s && s.width) || 1.6;
        rec.lines.push({ pts: pts.map((q) => [...q]), color, dash: !!(s && s.dash) });
        for (const q of pts) rec.tops.push(g.Y(q[1]) - width / 2);
        return line(pts, color, s);
      };
      g.poly = (pts, color, s) => {
        rec.polys.push({ pts: pts.map((q) => [...q]), color });
        for (const q of pts) rec.tops.push(g.Y(q[1]));
        return poly(pts, color, s);
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
      lo = r.y0;
    check(
      `${label} #${id}: the legend clears every curve, cursor and dot by ≥ 8 px with a deeper font descent, ≥ 35% head room, and no legend or tick text is cut off`,
      r.texts.length >= 2 && r.h >= 118 && top - bottom >= 8 && (r.y1 - hi) / (r.y1 - lo) >= 0.35 && [...r.texts, ...r.ticks].every((x) => x.l >= -0.5 && x.r <= r.w + 0.5 && x.t >= -0.5),
      JSON.stringify({ gap: top - bottom, head: (r.y1 - hi) / (r.y1 - lo), h: r.h, w: r.w, cut: [...r.texts, ...r.ticks].filter((x) => !(x.l >= -0.5 && x.r <= r.w + 0.5 && x.t >= -0.5)) })
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
    const n = id === CHEB ? m.cheb.t : m.cayley.N,
      taylor = f.plot.lines.find((l) => l.color === P.magenta),
      one = f.plot.lines.find((l) => l.color === P.cyan);
    check(
      `${lang}/${id} strip 1: over N = 1 … 24 the cyan ‖R^N v₀‖² is 1 and the magenta Taylor norm is (17/16)^N, amber at ${id === CHEB ? 't' : 'N'}`,
      taylor.pts.length === 24 && taylor.pts.every(([x, y], i) => x === i + 1 && near(y, (17 / 16) ** x, 1e-12)) && one.pts.length === 24 && one.pts.every(([x, y], i) => x === i + 1 && y === 1) && f.plot.lines.filter((l) => l.color === P.amber).every((l) => l.pts.every(([x]) => x === n)) && nearV(f.plot.dots.filter((d) => d.color === P.amber).map((d) => d.y).sort((a, b) => a - b), id === CHEB ? [1] : [1, (17 / 16) ** n], 1e-12) && (await textOf('plotMeta')) === (id === CHEB ? `t = ${n}` : `N = ${n}`)
    );
    const b = f.plotB,
      jet = b.lines.find((l) => l.color === P.cyan),
      sec = b.lines.find((l) => l.color === P.magenta),
      x0 = numN(readN(m.jet.x)),
      h = parseN(m.h);
    check(
      `${lang}/${id} strip 2: the cyan κ′(x) = −2x/(1 + x²)² and the magenta secant slope over rational x, the band between them, amber at x`,
      jet.pts.length === 37 && jet.pts.every(([x, y], i) => near(x, i / 24, 1e-12) && near(y, (-2 * x) / (1 + x * x) ** 2, 1e-12)) && sec.pts.every(([x, y], i) => near(y, numN(secantN(fracN(BigInt(i), 24n), h).slope), 1e-12)) && b.polys.length === 1 && b.polys[0].color === P.magenta && b.polys[0].pts.length === 74 && b.lines.filter((l) => l.color === P.amber).every((l) => l.pts.every(([x]) => near(x, x0, 1e-12))) && nearV(b.dots.filter((d) => d.color === P.amber).map((d) => d.y), [numN(jetN(readN(m.jet.x))[1]), numN(secantN(readN(m.jet.x), h).slope)], 1e-12)
    );
  }
  for (const h of ['1/2', '1/8', '1/16']) {
    await press(`#hChips [data-h="${h}"]`);
    const f = await stripFrame();
    legendChecks(`${lang} h = ${h}`, f);
    check(`${lang} h = ${h}: the legend names the step and the curves stay on the plot`, f.plotB.texts.some((x) => x.text.includes(`h = ${h}`)) && f.plotB.lines.every((l) => l.pts.every(([, y]) => y >= f.plotB.y0 - 1e-9)));
  }
}

/* ---------- narrow pages, the whole-lab embeds, cited figures and stills ---------- */
// a cited figure hides the deck, the evidence and the strips: its note names only the stage, the HUD and the tour bar
const HIDDEN_WORDS = /条带|小图|横轴|滑块|读数|左栏|右栏|旋钮|strip|plot|chart|slider|readout|panel|dial/i;
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
    if (!figure) {
      const tall = await p.evaluate(() => document.documentElement.scrollHeight);
      check(`${lang}/390: the whole phone page is shorter than 7800 px`, tall < 7800, String(tall));
    }
    const visited = new Set();
    for (let j = 0; j < IDS.length; j++) {
      const s = await state(p),
        id = s.preset;
      visited.add(id);
      check(`${lang}/${width}/${id} under reduced motion the card parks on its still`, near(s.clock, CARDS[id].still, 1e-12) && !s.playing && !s.blending && s.regime === CARDS[id].regime);
      await layout(p, `${lang}/${width}/${id}`, figure);
      await noMixed(p, `${lang}/${width}/${id}`);
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
        await layout(p, `${lang}/390/${id} contrast lens`);
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
          need = { loop: ['[1 : 0]', 'P² + Q² = 1 > 0', 'κ = 0/1 = 0.0000', 'C = (−1, 0)'], escape: ['∏p + 1 = 31', 'q = 31 ∉ S', 'M = 12'], cayley: ['531441', '‖R¹²v₀‖² = 1.0000', '≈ 2.0699'], cheb: ['t = 12', '138133009/5¹²', '‖x12‖² = 1.0000'], jet: ['{1/2, −1/2, +1/4}', '−18/41', '5/82', '≈ 0.0610'] }[s.scene];
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
        ['#nRange', 1],
        ['#nRange', 24],
        ['#tRange', 0],
        ['#tRange', 24],
        ['#mRange', 16],
        ['#mRange', 1]
      ]) {
        await input(sel, v, p);
        const fold = await p.evaluate(() => {
          scrollTo(0, 0);
          return [document.querySelector('#tour').getBoundingClientRect().bottom, innerHeight];
        });
        check(`${lang}/390×844 free play ${sel} = ${v}: the tour bar stays inside the first screen`, fold[0] <= fold[1], JSON.stringify(fold));
        await layout(p, `${lang}/390 free play ${sel} = ${v}`);
      }
      for (const [sel, name] of [['#setChips [data-set="2,3,5,7,11,13"]', 'six primes'], ['#xChips [data-x="3/2"]', 'x = 3/2'], ['#xChips [data-x="0/1"]', 'x = 0']]) {
        await press(sel, p);
        await layout(p, `${lang}/390 ${name}`);
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
        [LOOP, [0, 0.5, 1, 3, 4]],
        [ESCAPE, [0, 1, 1.5, 2]],
        [CAYLEY, [0, 23]],
        [CHEB, [0, 24]],
        [JET, [0, 0.5, 1.5]]
      ]) {
        for (const v of acts) {
          await pick(id, p);
          await seek(v, p);
          const t = await regimeTexts(p);
          check(`${lang}/${width} figure ${id} at ${v}: the note is true to the frame and names only what is drawn`, t.note === t.tour && t.tour.length > 10 && !HIDDEN_WORDS.test(t.tour), JSON.stringify(t));
          await layout(p, `${lang}/${width} figure ${id} at ${v}`, true);
          const bar = await p.evaluate(() => { const n = document.querySelector('.tour .tour-note'); return [n.scrollHeight, n.clientHeight]; });
          check(`${lang}/${width} figure ${id} at ${v}: the note fits its two lines`, bar[0] <= bar[1] + 1, JSON.stringify(bar));
        }
      }
      await pick(ESCAPE, p);
      await p.locator('#stageAct').click();
      check(`${lang}/${width} figure: the button on the stage takes 31 into S`, await until(p, () => { const s = window.FINITE_DEBUG.state; return !s.playing && s.S.join() === '2,3,5,31' && s.regime === 'escaped'; }, null, 60000));
      await settle(p);
      await layout(p, `${lang}/${width} figure after a step`, true);
      await pick(JET, p);
      await p.locator('#stageAct').click();
      await settle(p);
      check(`${lang}/${width} figure: the button on the stage halves h`, (await state(p)).h === '1/8');
      await layout(p, `${lang}/${width} figure h = 1/8`, true);
      await pick(LOOP, p);
      await p.locator('#stageAct').click();
      check(`${lang}/${width} figure: the button on the stage slides across [1 : 0]`, await until(p, () => { const s = window.FINITE_DEBUG.state; return !s.playing && s.loop.P === '-1' && s.loop.Q === '1'; }, null, 60000));
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
          const s = window.FINITE_DEBUG && window.FINITE_DEBUG.state;
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
      want = expectedHud(m, lang === 'zh');
    check(`still ${lang}/${id} the printed frame states the numbers of the caption`, t.big.includes(want.big) && want.sub.every((x) => t.sub.includes(x)), JSON.stringify([t.big, t.sub, want.sub.filter((x) => !t.sub.includes(x))]));
    check(`still ${lang}/${id} an amber ring stands in for the handle`, (await primitives(p)).seen.some((x) => x.key === 'halo' && x.n === 'ring'));
    const labels = await tagText(p);
    check(`still ${lang}/${id} labels are printed and none overlaps another`, labels.length >= 4 && !(await labelOverlaps(p, '.stage .tag', 0)).length, JSON.stringify(labels));
    if (lang === 'en') check(`still en/${id} no Chinese left`, !(await cjkLeftovers(p)).length);
    await p.context().close();
  }
}

/* ---------- every relation the page prints, over many frames ---------- */
{
  // each “= decimal” and “≈ decimal” of the HUD and the readouts is decided against the fraction named before it
  await setLang('en');
  const audit = async (label) => {
    const m = await state(),
      v = frameOf(m),
      c = circleN(v.pair),
      rows = [
        ['κ', c.kappa, (await textOf('roLoop')).match(new RegExp(`· = ${c.kappa[0]}/${c.kappa[1]} ([=≈]) (${VALUE})`))],
        ['s', c.spread, (await textOf('roLoop')).match(new RegExp(`${c.spread[0]}/${c.spread[1]} ([=≈]) (${VALUE}) · \\(`))],
        ['Taylor', powN([17n, 16n], v.N), (await textOf('roCayley')).match(new RegExp(`([=≈]) (${VALUE})$`))],
        ['κ_t', kappaHeap(v.t), (await textOf('roCheb')).match(new RegExp(`([=≈]) (${VALUE}) · = 1\\.0000$`))],
        ['error', secantN(v.x, v.h).error, (await textOf('roJet')).match(new RegExp(`([=≈]) (${VALUE})$`))]
      ];
    for (const [name, q, hit] of rows) {
      const bad = hit ? wrongRelation(hit[1], hit[2], q, numN(q)) : 'not found';
      if (bad) return check(`${label} ${name}: ${bad}`, false, hit ? hit[0] : '');
    }
    return true;
  };
  let ok = true;
  await pick(LOOP);
  for (const t of [0, 1 / 12, 5 / 12, 11 / 12, 1, 23 / 12, 2, 25 / 12, 2.75, 47 / 12, 4]) {
    await seek(t);
    ok = (await audit(`loop ${t}`)) && ok;
  }
  await pick(CAYLEY);
  for (const t of [0, 3, 7, 15, 23]) {
    await seek(t);
    ok = (await audit(`cayley ${t}`)) && ok;
  }
  await pick(CHEB);
  for (const t of [0, 1, 2, 6, 17, 24]) {
    await seek(t);
    ok = (await audit(`cheb ${t}`)) && ok;
  }
  await pick(JET);
  for (const t of [0, 1 / 12, 0.5, 11 / 12, 1.25, 1.5]) {
    await seek(t);
    ok = (await audit(`jet ${t}`)) && ok;
  }
  check('every printed relation over 28 frames is exact after “=” and a rounding after “≈”', ok);
}

/* ---------- the console is clean ---------- */
check('no browser warnings on any page', browserWarnings.length === 0, browserWarnings.slice(0, 3).join(' | '));
check('the page never writes data-tr-palette, in either colour scheme', paletteMutations.length === 0 && paletteDocuments.length > 10 && paletteDocuments.every((d) => d.absent) && paletteDocuments.some((d) => d.dark) && paletteDocuments.some((d) => !d.dark), JSON.stringify(paletteMutations.slice(0, 2)));
check('no page error, console error or failed request over the whole suite', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
