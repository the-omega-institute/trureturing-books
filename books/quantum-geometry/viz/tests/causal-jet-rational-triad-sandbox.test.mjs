import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  session,
  stageFirstChecks,
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
const ID = 'causal-jet-rational-triad-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const THEORY = 'ch39-s30-past-present-future-rational-jet-triad.html#sec-ch39-past-present-future-rational-jet-triad';
const SECTION = '39.6';
const PI = Math.PI;
const DEG = PI / 180;
const T_CAP = Math.acos(1 - 2 * 0.8) / PI;
// scene, view, the rail variable and the declared still (a value of the rail) of every card
const CARDS = {
  'past-zero-jet-halting-anchor': { scene: 'past', cam: 'panorama', rail: 't', still: 0, max: 1, plays: false, regime: 'anchor' },
  'present-half-midpoint-self-duality': { scene: 'present', cam: 'face', rail: 'alpha', still: 0.5, max: 1, plays: true, regime: 'on' },
  'future-one-curvature-closure': { scene: 'future', cam: 'under', rail: 't', still: 1, max: 1, plays: true, regime: 'closed' },
  'third-order-bianchi-ostrogradsky-cap': { scene: 'third', cam: 'panorama', rail: 't', still: T_CAP, max: 1, plays: true, regime: 'generic' },
  'one-to-zero-cosmic-heartbeat-loop': { scene: 'loop', cam: 'panorama', rail: 't', still: 3.5, max: 4, plays: true, regime: 'half' }
};
const IDS = Object.keys(CARDS);
const [PAST, PRESENT, FUTURE, THIRD, LOOP] = IDS;
const DEFAULT = PRESENT;
const CAM_NAMES = ['panorama', 'face', 'under'];
// the order of the theorem box of §39.6
const GIDS = [
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq',
  'D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent',
  'D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently',
  'D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum',
  'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift',
  'D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_phases',
  'D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line',
  'D5/S3/Zeros/CompletedZeta.xi_reading_eq_completed_zeta',
  'D5/S3/Zeros/CompletedZeta.xi_reading_reflection',
  'D5/S3/Zeros/Endpoints/XiEndpointValues.xi_reading_endpoint_values',
  'D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor',
  'D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight',
  'D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev',
  'D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport',
  'D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness'
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
/** a × b by the Levi-Civita symbol. */
function crossLC(a, b) {
  const eps = (i, j, k) => ((i - j) * (j - k) * (k - i)) / 2;
  return [0, 1, 2].map((i) => {
    let s = 0;
    for (let j = 0; j < 3; j++) for (let k = 0; k < 3; k++) s += eps(i, j, k) * a[j] * b[k];
    return s;
  });
}
/** (a × b) × c by the BAC-CAB rule: b (a·c) − a (b·c). */
const doubleCross = (a, b, c) => sub(scale(b, dot(a, c)), scale(a, dot(b, c)));
/** Quaternions as 4 × 4 real matrices of left multiplication: L(q) p = q p. */
const leftMatrix = ([w, x, y, z]) => [
  [w, -x, -y, -z],
  [x, w, -z, y],
  [y, z, w, -x],
  [z, -y, x, w]
];
const apply = (M, v) => M.map((row) => dot(row, v));
const qm = (a, b) => apply(leftMatrix(a), b);
const qinvM = ([w, x, y, z]) => scale([w, -x, -y, -z], 1 / (w * w + x * x + y * y + z * z));
/** exp of the pure quaternion v by its power series (40 terms). */
function qexpSeries(v) {
  let term = [1, 0, 0, 0],
    sum = [1, 0, 0, 0];
  const V = [0, ...v];
  for (let n = 1; n < 40; n++) {
    term = scale(qm(term, V), 1 / n);
    sum = plus(sum, term);
  }
  return sum;
}
const kap = (x, y) => (1 + dot(x, y)) / 2;
/** Solve M x = b by Gaussian elimination with partial pivoting. */
function solve(M, b) {
  const n = b.length,
    A = M.map((r, i) => [...r, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c], A[p]] = [A[p], A[c]];
    for (let r = c + 1; r < n; r++) {
      const k = A[r][c] / A[c][c];
      for (let j = c; j <= n; j++) A[r][j] -= k * A[c][j];
    }
  }
  const x = new Array(n).fill(0);
  for (let r = n - 1; r >= 0; r--) {
    let s = A[r][n];
    for (let j = r + 1; j < n; j++) s -= A[r][j] * x[j];
    x[r] = s / A[r][r];
  }
  return x;
}
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const mcomb = (A, B, k) => A.map((r, i) => r.map((x, j) => x + k * B[i][j]));
/** One step (I − αA) x₁ = (I + (1 − α)A) x₀ of a linear map A. */
const thetaStep = (A, x0, alpha) => solve(mcomb(eye(x0.length), A, -alpha), apply(mcomb(eye(x0.length), A, 1 - alpha), x0));
/** A deterministic stream of numbers in [−1, 1). */
function stream(seed) {
  let s = seed >>> 0;
  return () => {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return (s / 4294967296) * 2 - 1;
  };
}
/** The heartbeat built beat by beat: the landing is the heap doubling [m, x₀, m], and the next heading is the arrival
    heading −m turned by −β about the axis i, as a conjugation by exp(−iβ/2). */
function chainAt(t, beta) {
  let n = 0;
  while (t > n + 1 + 1e-12 && n < 3) n++;
  let x0 = [1, 0, 0, 0],
    m = [0, 0, 1, 0];
  const r = [Math.cos(beta / 2), -Math.sin(beta / 2), 0, 0];
  for (let k = 0; k < n; k++) {
    const landing = qm(qm(m, qinvM(x0)), m);
    m = qm(qm(r, scale(m, -1)), qinvM(r));
    x0 = landing;
  }
  const f = t - n;
  return { n, f, x0, m, land: qm(qm(m, qinvM(x0)), m), probe: plus(scale(x0, Math.cos(PI * f)), scale(m, Math.sin(PI * f))) };
}
/** Girard: the signed solid angle of the geodesic triangle abc of S² (angle sum − π, signed by the orientation of abc). */
function girardSigned(a, b, c) {
  const det = dot(a, crossLC(b, c));
  if (Math.abs(det) < 1e-12) return 0;
  const angle = (P, Q, R) => {
    const t1 = unit(sub(Q, scale(P, dot(P, Q)))),
      t2 = unit(sub(R, scale(P, dot(P, R))));
    return Math.acos(Math.max(-1, Math.min(1, dot(t1, t2))));
  };
  return Math.sign(det) * (angle(a, b, c) + angle(b, c, a) + angle(c, a, b) - PI);
}
/** ζ(s) for 0 < s < 1 by Euler–Maclaurin. */
function zetaEM(s) {
  const N = 24,
    B = [1 / 6, -1 / 30, 1 / 42, -1 / 30, 5 / 66, -691 / 2730, 7 / 6, -3617 / 510];
  let sum = 0;
  for (let n = 1; n < N; n++) sum += n ** -s;
  sum += N ** (1 - s) / (s - 1) + N ** -s / 2;
  let rising = s,
    fact = 2;
  for (let k = 1; k <= B.length; k++) {
    sum += (B[k - 1] / fact) * rising * N ** (-s - 2 * k + 1);
    rising *= (s + 2 * k - 1) * (s + 2 * k);
    fact *= (2 * k + 1) * (2 * k + 2);
  }
  return sum;
}
/** Γ(z) for z > 0 by Stirling's series after shifting by 14. */
function gammaStirling(z) {
  let shift = 1,
    x = z;
  while (x < 14) {
    shift *= x;
    x += 1;
  }
  const ser = 1 / (12 * x) - 1 / (360 * x ** 3) + 1 / (1260 * x ** 5) - 1 / (1680 * x ** 7) + 1 / (1188 * x ** 9);
  return (Math.exp((x - 0.5) * Math.log(x) - x + 0.5 * Math.log(2 * PI) + ser)) / shift;
}
/** ξ(s) = ½ s(s − 1) π^{−s/2} Γ(s/2) ζ(s) on (0, 1), ½ at both ends. */
const xiEM = (s) => (s <= 0 || s >= 1 ? 0.5 : 0.5 * s * (s - 1) * PI ** (-s / 2) * gammaStirling(s / 2) * zetaEM(s));
/** The area of the lune sector {colatitude ≤ θ, azimuth in a wedge of width δ} by the midpoint rule. */
function luneArea(theta, delta) {
  const N = 4000;
  let sum = 0;
  for (let k = 0; k < N; k++) sum += Math.sin((theta * (k + 0.5)) / N);
  return (sum * theta * delta) / N;
}
const V23 = [
  [5 / 13, -12 / 13, 0],
  [5 / 13, 12 / 13, 0]
];
/** The tetrahedron (x, y, z) = (j, k, w): V₀ the anchor, V₁ at the share s, V₂ and V₃ fixed; face phases by Girard. */
function tetraGirard(s) {
  const c = 1 - 2 * s,
    V = [[0, 0, 1], [Math.sqrt(1 - c * c), 0, c], ...V23],
    idx = [0, 1, 2, 3];
  const F = idx.map((i) => idx.map((j) => idx.map((k) => (i === j || j === k || k === i ? 0 : -girardSigned(V[i], V[j], V[k]) / 2 / DEG))));
  return { V, F };
}

/* ---------- exact numbers, written here: fractions [p, q] of integers, and what a printed decimal says ---------- */
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const gcdN = (a, b) => (b ? gcdN(b, a % b) : a < 0n ? -a : a);
const fracN = (p, q = 1n) => {
  const g = gcdN(p, q) * (q < 0n ? -1n : 1n);
  return [p / g, q / g];
};
const [addN, subN, mulN, divN] = [([a, b], [c, d]) => fracN(a * d + c * b, b * d), ([a, b], [c, d]) => fracN(a * d - c * b, b * d), ([a, b], [c, d]) => fracN(a * c, b * d), ([a, b], [c, d]) => fracN(a * d, b * c)];
const cmpN = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
const numN = ([p, q]) => {
  // 40 decimals are enough for every fraction of this page
  return Number((p * 10n ** 40n) / q) / 1e40;
};
const intN = (n) => [BigInt(n), 1n];
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
const strN = ([p, q]) => `${p}`.replace('-', '−') + (q === 1n ? '' : `/${q}`);
const expOf = (e) => Number(e.replace('⁻', '-').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (d) => SUP.indexOf(d)));
const tenN = (e) => (e < 0 ? [1n, 10n ** BigInt(-e)] : [10n ** BigInt(e), 1n]);
/** The decimal a printed text names: 0.0205, −6.429×10⁻⁸. */
function decimalN(s) {
  const [m, e = '⁰'] = s.replace('−', '-').split('×10'),
    [whole, part = ''] = m.split('.');
  return mulN([BigInt(whole + part), 1n], tenN(expOf(e) - part.length));
}
const SCI = '\\d\\.\\d{3}×10⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+';
const VALUE = `(?:(?:1/2|1) [−+] ${SCI}|−?${SCI}|−?\\d+\\.\\d+)`;
/** What is wrong with the relation `sign printed` of a value: q the value as a fraction (null: irrational), x the value as a
    double, off: x − 1/2 and x − 1 to full accuracy; '' when it is right. “=” is written exactly when the printed decimal is the
    value; a rounding is within half a unit of the last digit; a value that is not 0, 1/2 or 1 is never printed as one of them. */
function wrongRelation(sign, printed, q, x, off = {}) {
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
  if (printed.includes('×10')) {
    if (sign === '=' || Math.abs(numN(v) - x) > 6e-4 * Math.abs(x)) return `digits ${x}`;
    return '';
  }
  if ((sign === '=') !== (!!q && cmpN(q, v) === 0)) return `exactness of ${q ? strN(q) : x}`;
  if (sign === '≈' && [0, 0.5, 1].includes(numN(v)) && (q ? cmpN(q, v) !== 0 : true) && !/°$/.test(printed)) return 'a landmark printed of another value';
  const half = 0.5 * 10 ** -(printed.split('.')[1] || '').length;
  return Math.abs(numN(v) - (q ? numN(q) : x)) <= half * (1 + 1e-9) + 1e-12 ? '' : `rounding of ${x}`;
}
/** The least power of ten above a drift, as printed; “= 0” of 0 alone. */
function belowText(x) {
  if (x === 0) return '= 0';
  let e = 0;
  while (cmpN(doubleN(x), tenN(e - 1)) < 0) e--;
  while (cmpN(doubleN(x), tenN(e)) >= 0) e++;
  return `< 10${e < 0 ? '⁻' : ''}${String(Math.abs(e)).replace(/\d/g, (d) => SUP[d])}`;
}
/** A value as the page must print it: q its fraction or null, x its double, d decimals. */
function said(q, x, d = 4) {
  if (q) {
    const a = (q[0] < 0n ? -q[0] : q[0]) * 10n ** BigInt(d);
    if (a % q[1] === 0n) {
      const s = String(a / q[1]).padStart(d + 1, '0');
      return `= ${q[0] < 0n ? '−' : ''}${s.slice(0, -d)}.${s.slice(-d)}`;
    }
  }
  return `≈ ${(q ? numN(q) : x).toFixed(d).replace('-', '−')}`;
}
/* Digits that round a value to the nearest are no side of an inequality, whatever stands on its other side. Nothing is exempt:
   no name, no index and no area of the page is taken out before the search. */
const SIGN = '[<>≤≥≪≫＜＞≦≧]';
/** The clauses of a text: what stands between two separators, every parenthesis read as a clause of its own. */
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
  await context.exposeBinding('__triadPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__triadPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener(
      'DOMContentLoaded',
      () =>
        window
          .__triadPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined, dark: matchMedia('(prefers-color-scheme: dark)').matches })
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
  check(`source ${file}: no literal colour and no palette switch`, !literalColour.test(src) && !/\btrPalette\b|data-tr-palette|[?&]theme=/.test(src));
  check(`source ${file}: no model, vendor or tool identifiers and no Hangul`, !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src) && !hangul.test(src));
  check(`source ${file}: no possessive ’s (the runtime splits it)`, !/[A-Za-z][’']s\b/.test(src.replace(/it's|it’s/gi, '')));
}
check('reserved identifiers are absent from the suite and registry entry', [suite, entryText].every((src) => !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src) && !hangul.test(src)));
check(
  'the page loads exactly the shared theme, its own style sheet, the shell, the kit and main.js',
  same([...sources['index.html'].matchAll(/<(?:script src|link rel="stylesheet" href)="([^"]+)"/g)].map((m) => m[1]).filter((u) => !u.startsWith('https://fonts.')), ['../assets/theme.css', 'style.css', '../assets/shell.js', '../assets/kit.js', 'main.js'])
);
check(
  'registration: §39.6, live, five cards and the sixteen GIDs in order',
  !!entry &&
    entry.chapter === 39 &&
    entry.section === SECTION &&
    entry.status === 'live' &&
    entry.added === '2026-11-22' &&
    entry.capture_lock === 'links' &&
    entry.code === 'OMEGA//TRIAD' &&
    entry.title === '0 · 1/2 · 1 因果微分母核沙盘：三元数球面射流阶梯与中点自对偶验证仪' &&
    entry.title_en === '0 · 1/2 · 1 Causal-Differential Mother Triad: Spherical Jet Ladder & Midpoint Self-Duality Verifier' &&
    same(entry.presets, IDS) &&
    same(Object.keys(entry.preset_titles), IDS) &&
    same(entry.lean.map((x) => x.gid), GIDS) &&
    entry.theory.length === 1 &&
    entry.theory[0].label === '§39.6 · 过去现在未来与 0·1/2·1 纯有理因果射流母矩阵' &&
    entry.theory[0].label_en === '§39.6 · Past, Present, Future and the 0 · 1/2 · 1 Pure Rational Causal-Jet Matrix' &&
    entry.theory[0].href === '../zh/' + THEORY &&
    entry.theory[0].href_en === '../en/' + THEORY
);
check(
  'registration: the summaries name the ladder 0, 1/2, 1 in both languages',
  entry.summary.startsWith('在纯有理三元数单位球上构建连接 0（过去·零阶停机锚）') && entry.summary_en.startsWith('Builds on the pure rational ternion sphere the minimal-arc jet ladder linking 0 (Past')
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
check('the panel holds sixteen green boxes in the order of the theorem box, then ARGUED, MODEL and NUM', same(GREEN.map((b) => b.gid), GIDS) && same(BOXES.slice(16).map((b) => b.kind), ['argued', 'model', 'num']) && BOXES.length === 19);
// a green box says what the frozen theorem says: no instance of the page, no computed number, no rounding, no drift
const INSTANCE = /页面|本页|舞台|探针|滑块|取样点|偏差|余量|数值|演示|这里的|相差|实例|手工推导|this page|the page|on the page|stage|probe|slider|\bgap\b|drift|residue|instance|numerical|computes|differ by|derived by hand|≈|\d\.\d|10⁻|整系数|整数系数|integer.coefficient|integer coefficient/i;
check('green boxes: no instance, number, rounding, drift or remark of the page in any of the sixteen, in either language', GREEN.every((b) => b.zh.length > 30 && b.en.length > 30 && !INSTANCE.test(b.zh) && !INSTANCE.test(b.en)), GREEN.filter((b) => INSTANCE.test(b.zh) || INSTANCE.test(b.en)).map((b) => b.gid + ' ' + (INSTANCE.exec(b.zh) || INSTANCE.exec(b.en))[0]).join(' | '));
check('green boxes: no mixed inequality', GREEN.every((b) => !mixed(b.zh).length && !mixed(b.en).length));
{
  // everything the reader sees before the script runs holds no computed number: the box NUM and the spans of the drawer are empty
  const body = sources['index.html'].slice(sources['index.html'].indexOf('<body')),
    tag = /<div class="lean num"><span class="ok">NUM<\/span><span><span class="zh">—<\/span><span class="en">—<\/span><\/span><\/div>/g,
    spans = [...sources['index.html'].matchAll(/<span data-bench="([a-zA-Z0-9]+)">(.*?)<\/span>/g)].map((m) => [m[1], m[2]]);
  check('index.html: the NUM box is empty until the script fills it', (sources['index.html'].match(tag) || []).length === 1);
  check(
    'index.html: the numbers of the drawer and of the MODEL box are empty spans, each name once per language',
    same(spans.map((x) => x[0]), ['dottie', 'dottie', 'kappa0', 'landing', 'ito', 'back', 'refr', 'dF', 'kappa0', 'landing', 'ito', 'back', 'refr', 'dF']) && spans.every((x) => x[1] === '—'),
    JSON.stringify(spans)
  );
  const decimals = [...plain(body.replace(/<button class="chip" data-speed[^>]*>[^<]*<\/button>/g, '')).matchAll(/(?<![§\d.])\d+\.\d+/g)].map((m) => m[0]);
  check('index.html: no decimal is written anywhere in the page text, the evidence or the drawer', !decimals.length, decimals.join(' '));
  check('index.html: no decimal, no “≈” and no mixed inequality in the description', [(/<meta name="description" content="([^"]*)"/.exec(sources['index.html']) || ['', '≈ 0.5 > 0'])[1]].every((d) => d.length > 100 && !/\d\.\d|≈/.test(d) && !mixed(plain(d)).length));
  check('index.html: the outputs of the sliders are empty until the script writes them', ['sOut', 'alphaOut', 'sigmaOut', 'ctxOut'].every((id) => sources['index.html'].includes(`<output id="${id}">—</output>`)));
  const said0 = mixed(plain(body));
  check('index.html: no rounded digits beside an inequality sign', !said0.length, said0.slice(0, 3).join(' | '));
  const js = sources['main.js'],
    code = js.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, ''),
    bare = code.replace(/<\/?(?:strong|sub|sup|span|i|b)\b[^<>]*>/g, ''),
    // decimals of a printed length (2, 4 or 8 places) after a relation sign or before a degree sign, and powers of ten: the only one is
    // the named point of the line Re s = 1/2
    written = [...code.matchAll(/[=≈] ?−?\d+\.(?:\d{4}|\d{8})(?!\d)|\d\.\d+°|10⁻[⁰¹²³⁴⁵⁶⁷⁸⁹]/g)].map((m) => m[0]);
  check('main.js: no computed result is written into a sentence (the only long decimal is the named point LINE_AT)', same(written, ['= 14.1347']) && (js.match(/14\.1347/g) || []).length === 1, written.join(' '));
  const chained = [...bare.matchAll(/\$\{[^{}]*(?:Rel|rel)\([^{}]*\)\}°? ?(?:&lt;|&gt;|[<>≤≥])|(?:&lt;|&gt;|[<>≤≥]) ?\$\{[^{}]*Rel\(/g)].map((m) => m[0]);
  check('main.js: no template puts an inequality sign beside a printed relation', !chained.length, chained.join(' | '));
  check(
    'main.js: the NUM box and the spans are filled before the evidence is copied into the drawer',
    js.indexOf('const BENCH = benchmarks();') > 0 && js.indexOf("document.querySelector(`#basis .lean.num .${lang}`).innerHTML = numText(say)") > js.indexOf('const BENCH = benchmarks();') && js.indexOf("$('drawerEvidence').append(") > js.indexOf('el.innerHTML = NUMBERS[el.dataset.bench]()')
  );
  check('main.js: one formatter writes every relation (no “= ${fmt(” or toFixed in a sentence)', !/[=≈] ?\$\{fmt\(|\.toFixed\(/.test(js) && js.includes('function rel(q, x, d = 4, off = {}, marks = LANDMARKS)'));
}
{
  // the detectors find what they must and leave the separated forms: the negative control of every later scan
  const bad = ['‖x₁‖² ≈ 1.4404 > 1', 'α ≈ 0.1235 < 1/2', '1 < ‖x₁‖² ≈ 1.4404', '≈ 0.9975 < 1', 'δF ≈ 1.4×10⁻¹⁴ ≤ 10⁻¹³', 'κ ≈ 0.2930 ≥ 0', '> ≈ 0.5', 'α = 0.3000 < 1/2', '2.0000 > 1', '0 ≤ 0.0046', '（‖x₁‖² ≈ 2.0000 > 1）', '≈ 65.55° > 0', '≈ 1.0080 (α = 0) > 1'],
    good = ['α < 1/2（值 ≈ 0.1235）：‖x₁‖² > 1（值 ≈ 1.0019），这一步落在球面之外', 'α > 1/2 (value = 0.8000): ‖x₁‖² < 1 (value ≈ 0.6341), this step', '≈ 0.00803197 · < 10⁻¹⁶', '≈ 0.4971，两种算法的浮点偏差 < 10⁻¹⁴', '= 0（浮点余量 < 10⁻¹³°） · 0 / 256', '（四项 ≈ 25.06°、≈ −67.38°；浮点余量 < 10⁻¹³°）', '0 < a 且 a < 1/2', 'κ ≈ 0.7939；σ ≠ 0'];
  check('the detector finds thirteen rounded or decimal digits beside an inequality sign, without exception, and leaves eight separated texts', bad.every((x) => mixed(x).length > 0) && good.every((x) => !mixed(x).length), JSON.stringify([bad.filter((x) => !mixed(x).length), good.filter((x) => mixed(x).length)]));
}
{
  // only the .viz blocks of the chapter: their src, their preset sequence and the full lab
  const cited = vizCitations(resolveBook(BOOK), ID);
  for (const lang of ['zh', 'en']) {
    const rows = cited.filter((c) => c.lang === lang),
      cards = rows.filter((c) => c.preset).map((c) => c.preset);
    check(`${lang} chapter: the five cards are cited in order, and the full lab once without a preset`, same([...new Set(cards)], IDS) && rows.some((c) => !c.preset), JSON.stringify(rows));
  }
  check('chapter: both editions cite the same sequence of cards', same(...['zh', 'en'].map((lang) => cited.filter((c) => c.lang === lang).map((c) => c.preset || null))));
}

/* ---------- the midpoint theorem for any skew map, by elimination ---------- */
{
  const rand = stream(0x39750022);
  let worst = 0,
    onSphere = 0,
    tangency = 0,
    signs = true;
  for (let k = 0; k < 64; k++) {
    const A = eye(4).map((r) => r.map(() => 0));
    for (let i = 0; i < 4; i++)
      for (let j = i + 1; j < 4; j++) {
        A[i][j] = 1.5 * rand();
        A[j][i] = -A[i][j];
      }
    const x0 = unit([rand(), rand(), rand(), rand()]);
    for (const alpha of [0, 0.25, 0.5, 0.75, 1]) {
      const x1 = thetaStep(A, x0, alpha),
        dx = sub(x1, x0),
        drift = dot(x1, x1) - 1;
      worst = Math.max(worst, Math.abs(drift - (1 - 2 * alpha) * dot(dx, dx)), Math.abs(dot(dx, plus(x0, x1)) - drift));
      if (alpha === 0.5) {
        onSphere = Math.max(onSphere, Math.abs(drift));
        tangency = Math.max(tangency, Math.abs(dot(dx, plus(x0, x1))));
      } else signs = signs && Math.sign(drift) === Math.sign(1 - 2 * alpha);
    }
  }
  check('64 random skew 4 × 4 maps: ‖x₁‖² − ‖x₀‖² = (1 − 2α)‖Δx‖², and only α = 1/2 keeps the norm, with ⟨Δx, x₀ + x₁⟩ = 0', worst < 1e-11 && onSphere < 1e-12 && tangency < 1e-12 && signs, JSON.stringify({ worst, onSphere, tangency, signs }));
}

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.CAUSAL_TRIAD_DEBUG.state);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => {
    el.value = String(v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
  await settle(p);
}
const seek = (v, p = page) => input('#now', v, p);
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
      const s = window.CAUSAL_TRIAD_DEBUG.state;
      return s.preset === id && !s.blending && !s.playing && Math.abs(s.clock - still) < 1e-12;
    },
    [card, CARDS[card].still],
    // the clock advances at most 0.1 s per frame: with VIZ_SLOW_FRAMES=1000 the heartbeat takes ~50 frames
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
/** Record the colour of every primitive of the next frame (the page calls sc.<primitive> by name at draw time). */
async function primitiveColours(p = page) {
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
        seen.push({ n, key: String(key), colors: [s.color, s.fill, s.edges, ...(s.colors || [])].filter(Boolean) });
        return saved[n](...a);
      };
    }
    window.TRV.kit.flush();
    for (const n of names) sc[n] = saved[n];
    const P = window.TRV.palette;
    return { seen, palette: { amber: P.amber, ok: P.ok, warn: P.warn, cyan: P.cyan, magenta: P.magenta, violet: P.violet, stage: P.stage } };
  });
}
const textOf = async (id, p = page) => (await p.locator('#' + id).innerText()).replaceAll('−', '-');
const tagText = (p = page) => p.locator('.stage .tags .tag:not([hidden])').allInnerTexts();
async function layout(p, label, figure = false) {
  const view = await stageView(p, '#stage', figure);
  const issues = [...view.layout, ...view.hud, ...(await labelOverlaps(p, '.stage .tag', 0)), ...(await capitalGreek(p))];
  check(label + ' framing and legible labels', !issues.length && (await overflowX(p)) === 0, JSON.stringify(issues));
}
/** The three texts that follow the live regime: the HUD line, the card note and the note of the tour bar. */
const regimeTexts = (p = page) =>
  p.evaluate(() => {
    const t = (s) => (document.querySelector(s) ? document.querySelector(s).textContent : '').replaceAll('−', '-').replace(/\s+/g, ' ').trim();
    return { big: t('#hudBig'), sub: t('#hudSub'), note: t('#presetNote'), tour: t('#tour .tour-note'), legend: t('#legend') };
  });

/** Every number of the page at its t, α, σ and τ, against the mathematics above. */
function verifyMath(m, label) {
  const { t, alpha, sigma, tau } = m;
  const thc = Math.atan2(tau, 1),
    beta = 2 * thc,
    c = chainAt(t, beta);
  const gap = (a, b) => norm(sub(a, b));
  check(
    label + ' the beat: anchor, midpoint, probe and the heap doubling −x₀',
    m.n === c.n && near(m.f, c.f, 1e-12) && gap(m.x0, c.x0) < 1e-12 && gap(m.xHalf, c.m) < 1e-12 && gap(m.probe, c.probe) < 1e-12 && gap(m.land, c.land) < 1e-12 && gap(c.land, scale(c.x0, -1)) < 1e-12,
    JSON.stringify({ n: m.n, f: m.f })
  );
  const chord2 = dot(sub(c.probe, c.x0), sub(c.probe, c.x0));
  check(
    label + ' s = 1 − κ = chord²/4 = (1 − cos πf)/2, doubling κ₂ = (2κ₁ − 1)², half-beat 1/2 → 0, re-anchored s′ = 0',
    near(m.s, chord2 / 4, 1e-12) &&
      near(m.s, Math.sin((PI * c.f) / 2) ** 2, 1e-12) &&
      near(m.kappa, kap(c.x0, c.probe), 1e-12) &&
      near(m.kappa, 1 - m.s, 1e-12) &&
      near(m.doubled, (1 - 2 * m.s) ** 2, 1e-12) &&
      near(m.doubledHeap, kap(c.x0, qm(qm(c.probe, qinvM(c.x0)), c.probe)), 1e-12) &&
      near(m.doubled, m.doubledHeap, 1e-12) &&
      near(m.kHalf, 0.5, 1e-12) &&
      near(m.kHalfNext, 0, 1e-12) &&
      near(m.reAnchor, 0, 1e-12)
  );
  const A = leftMatrix([0, 0, sigma, 0]),
    one = [1, 0, 0, 0];
  const steps = Object.fromEntries(
    [
      ['ito', 0],
      ['mid', 0.5],
      ['back', 1],
      ['cur', alpha]
    ].map(([k, a]) => [k, { a, x: thetaStep(A, one, a) }])
  );
  const stepOk = (k, s) => {
    const { a, x } = steps[k],
      dx = sub(x, one),
      dx2 = dot(dx, dx);
    return (
      gap(s.x1, x) < 1e-12 &&
      near(s.norm2, dot(x, x), 1e-12) &&
      near(s.dx2, dx2, 1e-12) &&
      near(s.drift, s.law, 1e-12) &&
      near(s.drift, (1 - 2 * a) * dx2, 1e-12) &&
      near(s.drift, ((1 - 2 * a) * sigma * sigma) / (1 + a * a * sigma * sigma), 1e-12) &&
      near(s.tangency, dot(dx, plus(one, x)), 1e-12)
    );
  };
  check(
    label + ' the step: (I − αA)x₁ = (I + (1 − α)A)x₀ by elimination, drift = (1 − 2α)‖Δx‖², tangency',
    stepOk('cur', m.step) && stepOk('ito', m.steps.ito) && stepOk('mid', m.steps.mid) && stepOk('back', m.steps.back) && near(m.steps.mid.norm2, 1, 1e-12) && near(m.steps.mid.tangency, 0, 1e-12) && near(m.steps.ito.norm2, 1 + sigma * sigma, 1e-12) && near(m.steps.back.norm2, 1 / (1 + sigma * sigma), 1e-12) && near(m.stepAngle, 2 * Math.atan(sigma / 2) / DEG, 1e-9)
  );
  const om1 = [0, PI / 2, 0],
    omc = [0, 0, thc],
    omega2 = doubleCross(om1, omc, om1),
    ref = scale(qexpSeries(omega2), -1);
  check(
    label + ' the closure: Ω₂ = ‖ω₁‖² ω_ctx by BAC-CAB, x₁ = −exp Ω₂ by the series, κ(x₀, x₁) = (1 − cos ‖Ω₂‖)/2',
    gap(m.refr.omega2, omega2) < 1e-12 &&
      near(m.refr.phi, (PI * PI * thc) / 4, 1e-12) &&
      gap(m.refr.ref, ref) < 1e-11 &&
      near(m.refr.kRef, (1 - Math.cos((PI * PI * thc) / 4)) / 2, 1e-12) &&
      near(m.refr.kFreeRef, Math.cos((PI * PI * thc) / 8) ** 2, 1e-12) &&
      near(m.refr.norm2, 1, 1e-12) &&
      near(m.refr.deg, m.refr.phi / DEG, 1e-9)
  );
  check(
    label + ' the lune: the part up to s is the share s of 2θ_ctx (area by the midpoint rule)',
    near(m.lune.total, luneArea(PI, thc), 1e-6) && near(m.lune.part, luneArea(PI * c.f, thc), 1e-6) && near(m.lune.part, m.s * m.lune.total, 1e-12) && near(m.betaDeg, beta / DEG, 1e-9)
  );
  check(label + ' ξ(0) = ξ(1) = 1/2, ξ(s) by Euler–Maclaurin, ξ(1 − s) = ξ(s), and P₁ = 2.2(1 − 2s)', near(m.xi.at0, 0.5, 1e-12) && near(m.xi.at1, 0.5, 1e-12) && near(m.xi.at, xiEM(m.s), 1e-9) && near(m.xi.mirror, m.xi.at, 1e-12) && near(m.momentum, 2.2 * (1 - 2 * m.s), 1e-12));
}
/** The instances the evidence panel names, against constructions written here. */
function verifyInstances(m, I, label) {
  const c = chainAt(m.t, 2 * Math.atan2(m.tau, 1)),
    cosT = dot(c.x0, c.probe),
    th = Math.acos(Math.max(-1, Math.min(1, cosT)));
  // Chebyshev: the heap sequence from x₀ and the probe keeps ⟨x₀, x_n⟩ = cos nθ
  const seq = [c.x0, c.probe];
  while (seq.length < 7) seq.push(qm(qm(seq.at(-1), qinvM(seq.at(-2))), seq.at(-1)));
  const cheb = Math.max(...seq.map((x, n) => Math.abs(dot(c.x0, x) - Math.cos(n * th))));
  check(label + ' Chebyshev: ⟨x₀, x_n⟩ = cos nθ along the heap sequence, T₂ gives κ₂', cheb < 1e-7 && I.chebyshev.gap < 1e-11 && near(I.chebyshev.c, cosT, 1e-12) && near(I.chebyshev.t2, 2 * cosT * cosT - 1, 1e-12) && near(I.chebyshev.k2, cosT * cosT, 1e-12));
  check(label + ' chord reading, frozen heap, pinching twice, Krylov dimensions', I.chord < 1e-12 && I.model.frozen < 1e-12 && I.model.tri === 'x y⁻¹ z' && I.pinch.gap < 1e-15 && near(I.pinch.moved, Math.abs(Math.sin(2 * th) / 2), 1e-9) && same(I.krylov.frozen, [1, 1, 1, 1, 1]) && same(I.krylov.half, [1, 2, 2, 2, 2]));
  check(label + ' balanced sum: A A† = B B† = 1/2, S S† = 1, skew cross term', I.balanced.unitary < 1e-12 && I.balanced.halfA < 1e-12 && I.balanced.halfB < 1e-12 && I.balanced.skew < 1e-12);
  // rayKernel: ⟨x, y⟩² + ⟨x, y i⟩² = (1 − 2s)², and the two record weights (1 − 2s)² and 4s(1 − s)
  const yi = qm(c.probe, [0, 1, 0, 0]),
    ray = dot(c.x0, c.probe) ** 2 + dot(c.x0, yi) ** 2;
  check(
    label + ' Born readings: rayKernel = (1 − 2s)², weights (1 − 2s)² + 4s(1 − s) = 1',
    near(I.ray.value, ray, 1e-12) && near(ray, (1 - 2 * m.s) ** 2, 1e-12) && I.ray.gap < 1e-12 && I.ray.phaseGap < 1e-12 && near(I.weights.w0, (1 - 2 * m.s) ** 2, 1e-12) && near(I.weights.w1, 4 * m.s * (1 - m.s), 1e-12) && near(I.weights.sum, 1, 1e-12) && I.weights.gap < 1e-12 && I.weights.unread < 1e-15
  );
  check(label + ' double cover: 33 samples of x(t)², from 1 to −1', I.lift.samples === 33 && I.lift.gap < 1e-12 && I.lift.start === 1 && near(I.lift.end, -1, 1e-15));
  const taylor = [1, 0.5, 0.25].map((a) => {
    const x = 1e6 ** -a;
    return 1e6 * (x ** 2 / 2 - x ** 4 / 24 + x ** 6 / 720);
  });
  check(label + ' accumulated versines at N = 10⁶: 0, 1/2 and 499.9583', I.sagitta.every((x, k) => near(x, taylor[k], 1e-7)) && f4(I.sagitta[0]) === '0.0000' && f4(I.sagitta[1]) === '0.5000' && f4(I.sagitta[2]) === '499.9583');
  check(label + ' Cayley ratio: (1 − s)/s on the real segment, 1 on the line', (m.s > 1e-12 ? near(I.cayley.real, (1 - m.s) / m.s, 1e-9) : I.cayley.atZero && I.cayley.real === 0) && near(I.cayley.line, 1, 1e-15));
  check(label + ' ξ: both computations at s = 1/2 agree with Euler–Maclaurin', near(I.xi.half, xiEM(0.5), 1e-10) && near(I.xi.product, xiEM(0.5), 1e-10) && I.xi.gap < 1e-9 && I.xi.mirror < 1e-12 && f4(I.xi.half) === '0.4971');
  check(label + ' tree transport of the open chain: no loop, gauge gap 0', I.tree.edges === 2 && I.tree.vertices === 3 && I.tree.loops === 0 && I.tree.gap < 1e-12);
  check(label + ' heap re-anchoring: the landing is −x₀, [x₁, x₁, x₁] = x₁, two beats return', I.heap.gap < 1e-12 && I.heap.reAnchor < 1e-12 && I.heap.twice < 1e-12 && I.heap.half < 1e-12);
  // the tetrahedron by Girard, away from the two degenerate ends of the beat
  const alt = I.tetra.alternating;
  const shared = I.tetra.defects === 0 && same(I.tetra.faceErrors, [0, 0, 0, 0]) && I.tetra.edgeErrors === 0 && I.tetra.quadruples === 256 && near(alt, 0, 1e-9) && I.tetra.worst < 1e-9;
  if (m.s > 1e-6 && m.s < 1 - 1e-6) {
    const { V, F } = tetraGirard(m.s);
    let defects = 0,
      count = 0;
    for (let r = 0; r < 4; r++)
      for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++)
          for (let k = 0; k < 4; k++) {
            count++;
            if (Math.abs(F[i][j][k] - F[r][j][k] + F[r][i][k] - F[r][i][j]) > 1e-6) defects++;
          }
    check(
      label + ' tetrahedron: Girard face phases, 256 quadruples with δF = 0',
      shared &&
        count === 256 &&
        defects === 0 &&
        near(I.tetra.F123, F[1][2][3], 1e-6) &&
        near(I.tetra.F023, F[0][2][3], 1e-6) &&
        near(I.tetra.F013, F[0][1][3], 1e-6) &&
        near(I.tetra.F012, F[0][1][2], 1e-6) &&
        near(I.tetra.F023, -Math.atan2(120, 50) / DEG, 1e-9) &&
        near(I.tetra.F123, -Math.atan2(12 * (1 - 2 * m.s), 5 + 13 * Math.sqrt(1 - (1 - 2 * m.s) ** 2)) / DEG, 1e-9) &&
        V.every((v, k) => norm(sub(v, I.tetra.V[k])) < 1e-7),
      JSON.stringify([I.tetra.F123, F[1][2][3], I.tetra.F013, F[0][1][3]])
    );
  } else
    check(
      label + ' tetrahedron at an end of the beat: δF = 0 on 256 quadruples, the limits along the beat',
      shared && (m.s < 0.5 ? I.tetra.F012 === 0 && I.tetra.F013 === 0 && near(I.tetra.F123, I.tetra.F023, 1e-9) : near(I.tetra.F013, -Math.atan2(12, 5) / DEG, 1e-9) && near(I.tetra.F012, Math.atan2(12, 5) / DEG, 1e-9) && near(I.tetra.F123, Math.atan2(12, 5) / DEG, 1e-9))
    );
}
async function verifyCard(p, id) {
  const m = await state(p),
    c = CARDS[id];
  check(id + ' scene, view, rail, regime and preset', m.preset === id && m.scene === c.scene && m.cam === c.cam && m.rail === c.rail && m.max === c.max && m.regime === c.regime && near(m.sigma, 1, 1e-12) && near(m.tau, 0.5, 1e-12), JSON.stringify([m.preset, m.scene, m.cam, m.rail, m.max, m.regime]));
  verifyMath(m, id);
  verifyInstances(m, m.leanInstances, id);
}

await T.goto(BOOK, ID, '?lang=en');
await settle(page);
{
  const s = await state();
  check('the midpoint card opens by default, parked on α = 1/2 with the probe at s = 1/2', s.preset === DEFAULT && s.scene === 'present' && s.alpha === 0.5 && near(s.s, 0.5, 1e-12) && !s.playing && near(s.clock, 0.5, 1e-15));
  check(
    'default card: ‖x₁‖² = 2.0000, 1.0000, 0.5000 at α = 0, 1/2, 1, the rational landing 3/5 + (4/5)j',
    f4(s.steps.ito.norm2) === '2.0000' && f4(s.steps.mid.norm2) === '1.0000' && f4(s.steps.back.norm2) === '0.5000' && norm(sub(s.steps.mid.x1, [0.6, 0, 0.8, 0])) < 1e-15 && norm(sub(s.steps.ito.x1, [1, 0, 1, 0])) < 1e-15 && norm(sub(s.steps.back.x1, [0.5, 0, 0.5, 0])) < 1e-15 && f4(s.lune.total) === '0.9273' && f2(s.refr.deg) === '65.55' && f4(s.refr.kRef) === '0.2930' && f2(s.betaDeg) === '53.13'
  );
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
      !!q('#stage > button.handle#stageHandle') &&
      !!q('main.center > #tour #mobileLensBtn') &&
      !!q('main.center > .strip #plot') &&
      !!q('main.center > .strip #plotB') &&
      !q('#stage .strip') &&
      !q('#stage canvas#plot') &&
      q('aside.col.side#evidence').firstElementChild.id === 'infoBtn' &&
      ['#anchorChips', '#sRange', '#alphaRange', '#sigmaRange', '#ctxRange'].every((s) => !!q('#evidence > #ctlPanel ' + s)) &&
      !!q('#evidence > #readouts') &&
      !!q('#evidence > #basis') &&
      !!q('footer.rail .clock #now') &&
      ['§39.6', '5', 'NUM', 'trureturing'].every((x) => asides.includes(x)) &&
      [...document.querySelectorAll('.tagline > span')].every((el) => el.querySelector('em') && el.firstChild.nodeType === 3) &&
      !!q('link[href*="fonts.googleapis.com/css2?family=Chakra+Petch"]') &&
      [...document.querySelectorAll('#basis .lean')].every((el) => el.children.length === 2 && [...el.children].every((c) => c.tagName === 'SPAN')) &&
      document.querySelectorAll('#basis .lean.frozen, #basis .lean.open').length === 0 &&
      document.querySelectorAll('#basis .lean.argued').length === 1 &&
      document.querySelectorAll('#basis .lean.model').length === 1 &&
      document.querySelectorAll('#basis .lean.num').length === 1 &&
      document.querySelectorAll('#basis .lean:not(.argued):not(.model):not(.num)').length === 16 &&
      document.querySelectorAll('#drawerEvidence .lean').length === 19 &&
      [...document.querySelectorAll('#drawer .sheet > div.zh, #drawer .sheet > div.en')].every((el) => el.querySelector('p.lede') && el.querySelectorAll('ol li b').length === 7 && el.querySelector('p.lede.refs a') && el.querySelectorAll('table.matrix tbody tr').length === 5 && el.querySelectorAll('table.matrix thead th').length === 4)
    );
  })
);
check(
  'the two lens names and the three anchor chips in both languages',
  await page.evaluate(() => {
    const seg = (c, l) => document.querySelector(`#lensToggleBtn .seg.${c} .${l}`).textContent;
    const chips = [...document.querySelectorAll('#anchorChips [data-anchor]')].map((b) => [b.dataset.anchor, b.querySelector('.zh').textContent, b.querySelector('.en').textContent]);
    return (
      seg('off', 'zh') === '因果射流母核 · 0 / 1/2 / 1 球面阶梯' &&
      seg('off', 'en') === 'Causal-Jet Triad · 0 / 1/2 / 1 Spherical Ladder' &&
      seg('on', 'zh') === '跨界五维同构（MODEL）· 算符 / 黎曼 / TFT 对位' &&
      seg('on', 'en') === 'Cross-Domain Isomorphism (MODEL) · Dirac / Riemann / TFT' &&
      JSON.stringify(chips) === JSON.stringify([['0', '过去 · J⁰', 'Past · J⁰'], ['0.5', '现在 · J¹', 'Present · J¹'], ['1', '未来 · J²', 'Future · J²']])
    );
  })
);
check(
  'a card click starts a blend of the layers instead of a hard cut',
  await page.evaluate(() => {
    document.querySelector('[data-preset="future-one-curvature-closure"]').click();
    const s = window.CAUSAL_TRIAD_DEBUG.state;
    return s.blending && s.layers.lune < 1 && s.scene === 'future' && s.rail === 't';
  })
);
await settle(page);
await until(page, () => !window.CAUSAL_TRIAD_DEBUG.state.blending);
check('the blend ends on the layers of the card', (await state()).layers.lune === 1 && (await state()).layers.step === 0);
await pause();

/* ---------- multi-beat continuity: 1 ≡ 0′ ---------- */
{
  const rows = await page.evaluate(() => {
    const d = window.CAUSAL_TRIAD_DEBUG;
    return [0, 1, 2, 3].map((n) => {
      const before = d.calc(n === 0 ? 4 : n),
        after = d.calc(n === 0 ? 0 : n + 1e-9),
        low = d.calc(n + 1e-6),
        high = d.calc(n + 1 - 1e-6);
      return { n, end: before.probe, start: after.probe, sEnd: before.s, sStart: after.s, reAnchor: before.reAnchor, next: after.x0, land: before.land, low: low.s, high: high.s, nLow: low.n, nHigh: high.n };
    });
  });
  check(
    'the heartbeat is continuous: each landing (s = 1) is the next anchor (s = 0), and the last landing is the first anchor',
    rows.every((r) => norm(sub(r.end, r.start)) < 1e-8 && near(r.sEnd, 1, 1e-12) && near(r.sStart, 0, 1e-12) && norm(sub(r.land, r.next)) < 1e-12 && near(r.reAnchor, 0, 1e-12) && r.low < 1e-9 && r.high > 1 - 1e-9 && r.nLow === r.n && r.nHigh === r.n),
    JSON.stringify(rows.map((r) => [r.n, norm(sub(r.end, r.start)), r.sEnd, r.sStart]))
  );
  // speed is uniform: equal steps of t are equal angles on the sphere, across the landings too
  const angles = await page.evaluate(() => Array.from({ length: 161 }, (_, k) => window.CAUSAL_TRIAD_DEBUG.calc((k * 4) / 160).probe));
  const turns = angles.slice(1).map((q, k) => Math.acos(Math.max(-1, Math.min(1, dot(q, angles[k])))));
  check('the heartbeat runs at one speed: 160 equal steps of t are 160 equal arcs of π/40', turns.every((a) => near(a, PI / 40, 1e-6)), JSON.stringify([Math.min(...turns), Math.max(...turns)]));
  const flat = await page.evaluate(() => [0.5, 1.5, 2.5, 3.5].map((t) => window.CAUSAL_TRIAD_DEBUG.calc(t, 0.5, 1, 0).probe));
  check('at τ = 0 the heading does not turn: the midpoints alternate j, −j on one great circle', norm(sub(flat[0], [0, 0, 1, 0])) < 1e-12 && norm(sub(flat[1], [0, 0, -1, 0])) < 1e-12 && norm(sub(flat[2], flat[0])) < 1e-12 && norm(sub(flat[3], flat[1])) < 1e-12);
  const rational = await page.evaluate(() => [0.5, 1.5, 2.5, 3.5].map((t) => window.CAUSAL_TRIAD_DEBUG.calc(t).probe));
  check(
    'at τ = 1/2 the four midpoints are rational points: j, −(3j − 4k)/5, (−7j − 24k)/25, (117j + 44k)/125',
    [
      [0, 0, 1, 0],
      [0, 0, -3 / 5, 4 / 5],
      [0, 0, -7 / 25, -24 / 25],
      [0, 0, 117 / 125, 44 / 125]
    ].every((q, k) => norm(sub(q, rational[k])) < 1e-12),
    JSON.stringify(rational)
  );
}
check(
  'ξ along the segment: the theta integral and the product formula agree with Euler–Maclaurin',
  (await page.evaluate(() => Array.from({ length: 19 }, (_, k) => [(k + 1) / 20, window.CAUSAL_TRIAD_DEBUG.xi((k + 1) / 20)]))).every(([s, x]) => near(x.theta, xiEM(s), 1e-9) && near(x.product, xiEM(s), 1e-9))
);

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
    lang + ' MODEL box names the mother matrix, the five domains, the Dottie shadow (rounded, after ≈), the heartbeat and the toy',
    ['3 × 3', 'θ* ≈ 0.7391', 's* = 1/2', '{ω₁, ωctx, ω₁}', '2θctx', '[x₁, x₁, x₁] = x₁', 'L = q̈²/2', 'Q₂ = 1', 'P₁ = (11/5)(1 − 2s)', 'x y⁻¹ z', '(1 + ⟨x, y⟩)/2'].every((x) => model.includes(x)) && !model.includes('= 0.7391') && (lang === 'zh' ? ['母矩阵', '五个领域', '多蒂数', '心跳'] : ['mother matrix', 'five domains', 'Dottie', 'heartbeat']).every((x) => model.includes(x)),
    model.slice(0, 160)
  );
  check(
    lang + ' ARGUED box: the hand derivations that used to stand beside the theorems are marked as such',
    (lang === 'zh' ? ['手工推导', '没有规范不变的环路相位', '四面体的凸包不含球心'] : ['Derived by hand', 'no gauge-invariant loop phase', 'does not contain the centre']).every((x) => argued.includes(x)) && ['(1 − 2α)‖x₁ − x₀‖²', 'κ₂ = (1 + T₂(c))/2 = (2κ₁ − 1)²', 'rayKernel(x₀, x(s)) = (1 − 2s)²', '4s(1 − s)', '2θctxs', 's* = 1/2'].every((x) => argued.includes(x)),
    argued.slice(-400)
  );
  check(
    lang + ' ARGUED box names the literature',
    (lang === 'zh' ? ['狄拉克（1928）', '凯勒–狄拉克', '薛定谔（1932）', '利赫内罗维奇（1963）', '伊藤（1944）', '斯特拉托诺维奇（1966）', '霍奇（1941）', '比安基（1902）', '奥斯特罗格拉茨基（1850）', '伍达德（2015）', '洛夫洛克–霍恩德斯基'] : ['Dirac (1928)', 'Kähler–Dirac', 'Schrödinger (1932)', 'Lichnerowicz (1963)', 'Itô (1944)', 'Stratonovich (1966)', 'Hodge (1941)', 'Bianchi (1902)', 'Ostrogradsky (1850)', 'Woodard (2015)', 'Lovelock–Horndeski']).every((x) => argued.includes(x)) &&
      ['(d + d*)²', 'σ₁(D)² = σ₂(Δ)', 'D² = ∇*∇ + R/4', '∇*∇ + 3/2', 'DAF ≡ 0'].every((x) => argued.includes(x)),
    argued.slice(0, 200)
  );
  check(
    lang + ' ARGUED box: the external formal proof of classical RH and Dirichlet GRH is an external verified fact, not an open conjecture and without a green badge',
    /Alpöge/.test(argued) && (lang === 'zh' ? argued.includes('外部已核验的形式化事实') && argued.includes('不带绿色标签') : argued.includes('externally verified formal facts') && argued.includes('no green badge')) && !/猜想|conjecture|\bOPEN\b/i.test(argued) && (await page.locator('#basis .lean.argued a[data-lean-gid]').count()) === 0
  );
  check(
    lang + ' the RH note links the recommended proof and original records',
    (await page.locator('#basis .lean.argued .' + lang + ' a').evaluateAll((els) => els.map((a) => a.getAttribute('href')))).join(' ') ===
      ['https://github.com/leanprover-community/riemann-hypothesis', 'https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/src/Statements.lean', 'https://github.com/the-omega-institute/riemann-hypothesis/blob/b14f2bd19e5e12a4ba6b1d207e3c5fbb06e49ed6/src/Main.lean', 'https://math.mit.edu/~drew/grh/audit.log', 'https://leanprover-community.github.io/blog/posts/riemann-hypothesis/'].join(' ')
  );
  check(
    lang + ' drawer states the example and its degenerate ends',
    ['κ(x₀, x₀) = 1.0000', '(I − αA)x₁ = (I + (1 − α)A)x₀', '3/5 + (4/5)j', lang === 'zh' ? '‖x₁‖² > 1（值 = 2.0000）' : '‖x₁‖² > 1 (value = 2.0000)', lang === 'zh' ? '‖x₁‖² < 1（值 = 0.5000）' : '‖x₁‖² < 1 (value = 0.5000)', 'κ₂ = (2κ₁ − 1)² = 0', '‖Ω₂‖ ≈ 65.55°', 'F₁₂₃ − F₀₂₃ + F₀₁₃ − F₀₁₂ = 0', 'DAF ≡ 0', 's′ = 1 − κ(x₁, x₁) = 0'].every((x) => drawer.includes(x)) && (lang === 'zh' ? ['σ = 0 时三者重合', 'τ = 0 时没有月牙', '（MODEL）'] : ['At σ = 0 the three coincide', 'At τ = 0 there is no lune', '(MODEL)']).every((x) => drawer.includes(x)),
    drawer.slice(0, 200)
  );
  const table = await page.locator(`#drawer .sheet > div.${lang} table.matrix`).innerText().catch(() => '');
  const rows = await page.locator(`#drawer .sheet > div.${lang} table.matrix tr`).allTextContents();
  check(lang + ' the five-domain table: three columns 0, 1/2, 1 and five rows, marked MODEL', rows.length === 6 && rows[0].startsWith('MODEL') && ['Δ⁰ = I', 'Δ1/2', 'Δ¹', 'J⁰', 'J¹', 'J²', 'KV'].every((x) => rows.join(' ').includes(x)), table + rows.join(' | '));
}
// each green box as rendered: the frozen statement, its hypotheses and its conclusions, in both languages
{
  const rendered = await page.evaluate(() => [...document.querySelectorAll('#basis .lean:not(.argued):not(.model):not(.num)')].map((el) => ({ gid: el.querySelector('a[data-lean-gid]').dataset.leanGid, code: el.querySelector('a[data-lean-gid]').textContent, zh: el.querySelector('.zh').textContent.replace(/\s+/g, ' ').trim(), en: el.querySelector('.en').textContent.replace(/\s+/g, ' ').trim() })));
  check('as rendered the sixteen green boxes are the static ones: the script writes nothing into them', same(rendered.map((b) => [b.gid, b.zh, b.en]), GREEN.map((b) => [b.gid, b.zh.trim(), b.en.trim()])) && rendered.every((b) => b.gid.endsWith('.' + b.code)));
  const copies = await page.evaluate(() => [...document.querySelectorAll('#drawerEvidence .lean:not(.argued):not(.model):not(.num)')].map((el) => [el.querySelector('a[data-lean-gid]').dataset.leanGid, el.querySelector('.zh').textContent.replace(/\s+/g, ' ').trim(), el.querySelector('.en').textContent.replace(/\s+/g, ' ').trim()]));
  check('the drawer repeats the sixteen boxes in the same order and words', same(copies, rendered.map((b) => [b.gid, b.zh, b.en])));
  for (const [name, zh, en] of [
    ['exists_unitQuaternion_equiv', ['不交换', '链连通', '读数可任意接近 0', '特征秩为 5', '读取完备', '对每个 o ∈ M 存在双射 u', 'u(o) = 1', 'u(tri(x, y, z)) = u(x) u(y)⁻¹ u(z)', 'κ(x, y) = (1 + ⟨u(x), u(y)⟩)/2'], ['noncommutative', 'chain connected', 'readings come arbitrarily close to 0', 'feature rank 5', 'reading complete', 'for every o ∈ M there is a bijection u', 'u(o) = 1', 'u(tri(x, y, z)) = u(x) u(y)⁻¹ u(z)', 'κ(x, y) = (1 + ⟨u(x), u(y)⟩)/2']],
    ['kappa_eq_one_sub_dist_sq', ['对一切单位四元数 a、b', 'κ(a, b) = 1 − dist(a, b)²/4'], ['for all unit quaternions a and b', 'κ(a, b) = 1 − dist(a, b)²/4']],
    ['finite_record_pinching_idempotent', ['有限族', '自伴（Pk† = Pk）', '幂等（Pk² = Pk）', 'k ≠ l 时 PkPl = 0', 'Σk Pk = 1', 'unreadStateP ∘ unreadStateP = unreadStateP'], ['finite family', 'self-adjoint (Pk† = Pk)', 'idempotent (Pk² = Pk)', 'PkPl = 0 for k ≠ l', 'Σk Pk = 1', 'unreadStateP ∘ unreadStateP = unreadStateP']],
    ['observable_krylov_once_stable_permanently', ['同一标量域（ℝ 或 ℂ）上的有限维内积空间', 'Km = span{(T†)kC†y : k ≤ m, y ∈ Y}', 'Km = Km+1', '对每个自然数 r，Km+r = Km'], ['finite-dimensional inner product spaces over the same scalars (ℝ or ℂ)', 'Km = span{(T†)kC†y : k ≤ m, y ∈ Y}', 'If Km = Km+1', 'Km+r = Km for every natural number r']],
    ['crossProduct_is_skewAdjoint_of_balanced_sum', ['n × n 复方阵', 'S = A + B', 'S S† = 1', 'A A† = (1/2)·1', 'B B† = (1/2)·1', '(A B†)† = −(A B†)'], ['complex n × n matrices', 'S = A + B', 'S S† = 1', 'A A† = (1/2)·1', 'B B† = (1/2)·1', '(A B†)† = −(A B†)']],
    ['circle_double_cover_history_lift', ['square(z) = z²', 'γ(0) = square(z₀)', 'square ∘ η = γ', 'η(0) = z₀', '唯一连续路径', '不存在连续映射 f', 'η(0) = 1、η(1) = −1'], ['square(z) = z²', 'γ(0) = square(z₀)', 'square ∘ η = γ', 'η(0) = z₀', 'the only continuous path', 'there is no continuous map f', 'η(0) = 1 and η(1) = −1']],
    ['accumulated_sagitta_phases', ['T > 0', 'T/0 = 0', 'Real.rpow', 'σ·rpow(T/N, a)', '全函数实数除法', '当 N ≥ 1 时 θN 就是普通实幂 σ(T/N)a', 'N(1 − cos θN)', '若 a > 1/2，它趋于 0', '若 a = 1/2，它趋于 σ²T/2', '若 σ ≠ 0、0 < a 且 a < 1/2，它趋于 +∞'], ['T > 0', 'T/0 = 0', 'Real.rpow', 'σ·rpow(T/N, a)', 'total real division', 'for N ≥ 1, θN is the ordinary real power σ(T/N)a', 'N(1 − cos θN)', 'to 0 if a > 1/2', 'to σ²T/2 if a = 1/2', 'to +∞ if σ ≠ 0, 0 < a and a < 1/2']],
    ['cayley_ratio_norm_one_iff_critical_line', ['对每个复数 s', '‖(s − 1)/s‖ = 1 ⇔ Re s = 1/2', 's = 0 时按 Lean 的全函数除法约定 (s − 1)/s = 0'], ['for every complex number s', '‖(s − 1)/s‖ = 1 ⇔ Re s = 1/2', 'by the total division convention of Lean, (s − 1)/s = 0 at s = 0']],
    ['xi_reading_eq_completed_zeta', ['s ≠ 0、s ≠ 1', 'ξ(s) = (1/2) s(s − 1) Λ(s)', 'ξ(s) = (1/2)(s(s − 1)Λ₀(s) + 1)', 'completedRiemannZeta₀'], ['s ≠ 0, s ≠ 1', 'ξ(s) = (1/2) s(s − 1) Λ(s)', 'ξ(s) = (1/2)(s(s − 1)Λ₀(s) + 1)', 'completedRiemannZeta₀']],
    ['xi_reading_reflection', ['对每个复数 s，ξ(1 − s) = ξ(s)', 'Λ₀'], ['for every complex s, ξ(1 − s) = ξ(s)', 'Λ₀']],
    ['xi_reading_endpoint_values', ['ξ(0) = 1/2 且 ξ(1) = 1/2', 'Λ₀'], ['ξ(0) = 1/2 and ξ(1) = 1/2', 'Λ₀']],
    ['rayKernel_eq_bornProbability_spinor', ['rayKernel(x, y) = (2κ(x, y) − 1)² + (2κ(x, yi) − 1)²', 'ψ(qi) = I ψ(q)', 'x i x* 的 k、j、i 分量', 'rayKernel(x, y) = |ψ(x)†ψ(y)|²', 'bornProbability(ψ(y)ψ(y)†, ψ(x)ψ(x)†)', 'Tr(ρP)'], ['rayKernel(x, y) = (2κ(x, y) − 1)² + (2κ(x, yi) − 1)²', 'ψ(qi) = I ψ(q)', 'the k, j, i components of x i x*', 'rayKernel(x, y) = |ψ(x)†ψ(y)|²', 'bornProbability(ψ(y)ψ(y)†, ψ(x)ψ(x)†)', 'Tr(ρP)']],
    ['rank_one_born_pairing_weight', ['记录测量', '半正定且 Tr ρ = 1', 'Pk = φφ†', 'ρ = ψψ†', 'recordWeight(P, ρ, k) = |φ†ψ|²', 'recordWeight(P, ρ, k) = Tr(ρ Pk)', 'Σj recordWeight(P, ρ, j)·conditionalState(P, ρ, j)', '0⁻¹ = 0'], ['record measurement', 'positive semidefinite with Tr ρ = 1', 'Pk = φφ†', 'ρ = ψψ†', 'recordWeight(P, ρ, k) = |φ†ψ|²', 'recordWeight(P, ρ, k) = Tr(ρ Pk)', 'Σj recordWeight(P, ρ, j)·conditionalState(P, ρ, j)', '0⁻¹ = 0']],
    ['normSq_and_chebyshev', ['对每个四元数序列', '当且仅当', 'xn+2 = xn+1 xn* xn+1', 'xn+1 = Un(c)·x1 − Un−1(c)·x0', 'n = 0 时约定 U−1 = 0', '⟨x0, xn⟩ = Tn(c)', 'c = ⟨x0, x1⟩', '第一、二类切比雪夫多项式'], ['for every sequence', 'if and only if', 'xn+2 = xn+1 xn* xn+1', 'xn+1 = Un(c)·x1 − Un−1(c)·x0', 'with U−1 = 0 at n = 0', '⟨x0, xn⟩ = Tn(c)', 'c = ⟨x0, x1⟩', 'Chebyshev polynomials of the first and second kinds']],
    ['selected_tree_transport', ['命名生成树', '无序端点对不同', 'φu(r) = 1', 'φu(t(e)) = u(e)·φu(s(e))', 'φg·u(a) = g(a)·φu(a)·g(r)⁻¹', '对 u 连续', 'φuw(a) = φu(a)·φw(a)', 'u 恒为 1 时 φu(a) = 1'], ['named spanning tree', 'distinct unordered pairs of ends', 'φu(r) = 1', 'φu(t(e)) = u(e)·φu(s(e))', 'φg·u(a) = g(a)·φu(a)·g(r)⁻¹', 'continuous in u', 'φuw(a) = φu(a)·φw(a)', 'φu(a) = 1 when u is constantly 1']],
    ['tetra_defects_incidence_repair_and_exactness', ['V 是有限非空集', 'AddCommGroup', 'Σr faceErrors(r) = tetraDefects', '存在 r 使 |V|·faceErrors(r) ≤ tetraDefects', '对每个 edge : V × V → A，tetraDefects ≤ 4|V|·edgeErrors(edge)', 'F(i, j, k) − F(r, j, k) + F(r, i, k) − F(r, i, j) = 0 对一切 r、i、j、k 成立，当且仅当存在 edge : V × V → A 使 F(i, j, k) = edge(j, k) − edge(i, k) + edge(i, j)'], ['V be a finite nonempty set', 'AddCommGroup', 'Σr faceErrors(r) = tetraDefects', 'there is an r with |V|·faceErrors(r) ≤ tetraDefects', 'for every edge : V × V → A, tetraDefects ≤ 4|V|·edgeErrors(edge)', 'F(i, j, k) − F(r, j, k) + F(r, i, k) − F(r, i, j) = 0 for all r, i, j, k if and only if there is an edge : V × V → A with F(i, j, k) = edge(j, k) − edge(i, k) + edge(i, j)']]
  ]) {
    const box = rendered.find((x) => x.code === name) || { zh: '', en: '' },
      missing = [...zh.filter((x) => !box.zh.includes(x)), ...en.filter((x) => !box.en.includes(x))];
    check(`${name}: the box states the theorem with its hypotheses and every conclusion in both languages`, !missing.length, missing.join(' | '));
  }
}

/* ---------- the NUM box and the drawer as rendered: every number against a value computed here ---------- */
const ONE = intN(1);
/** The fractions of the step at the sampling a and the span g. */
const stepFrac = (a, g) => {
  const b = subN(ONE, a),
    g2 = mulN(g, g),
    den = addN(ONE, mulN(mulN(a, a), g2));
  return { norm2: divN(addN(ONE, mulN(mulN(b, b), g2)), den), drift: divN(mulN(subN(b, a), g2), den) };
};
/** What the box and the spans of the drawer must say at the frame (σ, τ, sizes of the samples), in a language: the phrases of the
    box, and the spans by name. */
function expectedBench(lang, { sigma, tau, places, alphas }, drift) {
  const zh = lang === 'zh',
    list = (xs) => xs.join(zh ? '、' : ', '),
    g = gridN(sigma, 20),
    g2 = mulN(g, g),
    four = intN(4),
    thc = Math.atan(tau),
    phi = (PI * PI * thc) / 4,
    end = (q, x, d = 2) => `${said(q, x, d)}°`,
    angle = (q45, x) => end(tau === 0 ? intN(0) : tau === 1 ? intN(q45) : null, x),
    norms = [intN(0), [1n, 2n], ONE].map((a) => stepFrac(a, g).norm2),
    landing = `${strN(divN(subN(four, g2), addN(four, g2)))} + (${strN(divN(mulN(four, g), addN(four, g2)))})j`,
    // N(1 − cos N^{−a}) by its Taylor series
    versine = [1, 0.5, 0.25].map((a) => {
      const x = 1e6 ** -a;
      return 1e6 * (x ** 2 / 2 - x ** 4 / 24 + x ** 6 / 720 - x ** 8 / 40320);
    }),
    half = versine[1] - 0.5;
  const sums = list([`≈ ${versine[0].toExponential(3).replace(/e-(\d+)/, (_, d) => `×10⁻${SUP[d]}`)}`, `≈ 1/2 − ${Math.abs(half).toExponential(3).replace(/e-(\d+)/, (_, d) => `×10⁻${SUP[d]}`)}`, `≈ ${versine[2].toFixed(4)}`]);
  const n = places + 1;
  // the fractions of the drift over the samplings: exactly one of them is 0
  const zeros = Array.from({ length: alphas + 1 }, (_, k) => fracN(BigInt(k), BigInt(alphas))).filter((a) => stepFrac(a, g).drift[0] === 0n);
  const theta = angle(45, thc / DEG),
    turn = angle(90, (2 * thc) / DEG),
    refr = end(tau === 0 ? intN(0) : null, phi / DEG),
    lune = said(tau === 0 ? intN(0) : null, 2 * thc),
    kRef = said(tau === 0 ? intN(0) : null, (1 - Math.cos(phi)) / 2);
  // the Dottie number by Newton's method
  let dottie = 0.7;
  for (let k = 0; k < 30; k++) dottie -= (Math.cos(dottie) - dottie) / (-Math.sin(dottie) - 1);
  const spans = {
    dottie: `≈ ${dottie.toFixed(4)}`,
    kappa0: '= 1.0000',
    landing,
    ito: said(norms[0], numN(norms[0])),
    back: said(norms[2], numN(norms[2])),
    refr,
    dF: belowText(Math.abs(drift.alternating)) + (drift.alternating ? '°' : '')
  };
  const phrases = [
    zh ? `s = k/${places}（k = 0 … ${places}）共 ${n} 点` : `over the ${n} places s = k/${places} (k = 0 … ${places}) of the beat`,
    zh ? '弦长² 是 0、2、4，s = 1 − κ 是 0、1/2、1' : 'the squared chords to x₀, x1/2, −x₀ are 0, 2, 4, and s = 1 − κ is 0, 1/2, 1',
    (zh ? `σ = ${strN(g)} 时 α = 0、1/2、1 的 ‖x₁‖² 依次 ` : `at σ = ${strN(g)} and α = 0, 1/2, 1, ‖x₁‖² is in turn `) + list(norms.map((q) => said(q, numN(q)))),
    zh ? `α = 1/2 落在 ${landing}` : `α = 1/2 lands on ${landing}`,
    zh ? `α = k/${alphas}（k = 0 … ${alphas}）` : `α = k/${alphas} (k = 0 … ${alphas})`,
    zh ? `漂移恰为 0 的有 ${zeros.length} 个（α = ${list(zeros.map(strN))}）` : `‖x₁‖² − 1 is exactly 0 for ${zeros.length} of them (α = ${list(zeros.map(strN))})`,
    zh ? 'T = 1 时是 1, 1, 1, 1, 1，T = 左乘 j 时是 1, 2, 2, 2, 2' : '1, 1, 1, 1, 1 with T = 1 and 1, 2, 2, 2, 2 with T = left multiplication by j',
    zh ? 'κ₁ = 1/2 时 κ₂ = (2κ₁ − 1)² = 0.0000' : 'κ₁ = 1/2 gives κ₂ = (2κ₁ − 1)² = 0.0000',
    zh ? 's = 0、1/2、1 处 (1 − 2s)² 依次 = 1.0000、= 0.0000、= 1.0000' : 'at s = 0, 1/2, 1, (1 − 2s)² is in turn = 1.0000, = 0.0000, = 1.0000',
    zh ? 'x(1) 的实部 = −1.0000' : 'the real part of x(1) is = −1.0000',
    zh ? `N = 10⁶ 时 a = 1、1/2、1/4 的累计正矢依次 ${sums}` : `N = 10⁶ the accumulated versines for a = 1, 1/2, 1/4 are in turn ${sums}`,
    zh ? 's = 1/2 + 14.1347i 处 |(s − 1)/s| = 1.0000' : 'at s = 1/2 + 14.1347i, |(s − 1)/s| = 1.0000',
    zh ? `ξ(0) = 0.5000，ξ(1) = 0.5000，ξ(1/2) ≈ ${xiEM(0.5).toFixed(4)}` : `ξ(0) = 0.5000, ξ(1) = 0.5000, ξ(1/2) ≈ ${xiEM(0.5).toFixed(4)}`,
    zh ? `τ = ${strN(gridN(tau, 20))} 时 θctx ${theta}，月牙面积 2θctx ${lune}，每拍航向转 ${turn}，‖Ω₂‖ = (π/2)²θctx ≈ ${phi.toFixed(4)} rad，即 ${refr}，κ(x₀, x₁) ${kRef}` : `at τ = ${strN(gridN(tau, 20))}, θctx ${theta}, the lune has area 2θctx ${lune}, the heading turns by ${turn} per beat, ‖Ω₂‖ = (π/2)²θctx ≈ ${phi.toFixed(4)} rad, that is ${refr}, κ(x₀, x₁) ${kRef}`,
    zh ? '开链 3 个顶点、2 条边、0 个环路' : 'the open chain has 3 vertices, 2 edges and 0 loops',
    zh ? `一拍 ${n} 点，每点 256 个有序四元组（每个锚点 64 个三元组），上边缘按 10⁻⁹ 度计数的缺陷共 0 个` : `${n} places with 256 ordered quadruples each (64 triples per anchor), 0 defects counted to 10⁻⁹ degrees`,
    zh ? '锚在 V₀ 的边上链复原失败 0 处' : '0 failures of the edge cochain anchored at V₀',
    zh ? '不检验定理的前提' : 'it does not check their hypotheses',
    zh ? '数值演示，不是证明。' : 'A numerical illustration, not a proof.'
  ];
  return { spans, phrases };
}
const DRIFTS = ['frozen', 'chord', 'law', 'tangency', 'pinch', 'sum', 'weights', 'unread', 'halfA', 'halfB', 'unitary', 'skew', 'chebyshev', 'ray', 'lift', 'xi', 'mirror', 'refr', 'tree', 'tetra', 'landing', 'back'];
/** The audit of a page: the box, its copy and the spans against the numbers computed here; [] or what is wrong. */
async function auditBench(p, frame) {
  const seen = await p.evaluate(() => {
    const flat = (sel) => document.querySelector(sel).textContent.replace(/\s+/g, ' ').trim();
    return {
      box: Object.fromEntries(['zh', 'en'].map((l) => [l, flat('#basis .lean.num .' + l)])),
      copy: Object.fromEntries(['zh', 'en'].map((l) => [l, flat('#drawerEvidence .lean.num .' + l)])),
      spans: Object.fromEntries(['zh', 'en'].map((l) => [l, [...document.querySelectorAll(`#drawer .sheet > .${l} [data-bench]`)].map((e) => [e.dataset.bench, e.textContent.replace(/\s+/g, ' ')])])),
      dottie: [...document.querySelectorAll('[data-bench="dottie"]')].map((e) => e.textContent),
      bench: window.CAUSAL_TRIAD_DEBUG.bench(),
      twice: [...document.querySelectorAll('[id]')].map((e) => e.id).filter((x, i, a) => a.indexOf(x) !== i)
    };
  });
  const bad = [];
  if (!same(seen.box, seen.copy)) bad.push('the copy in the drawer');
  if (seen.twice.length) bad.push('ids twice: ' + seen.twice.join(' '));
  if (!same([seen.bench.frame.sigma, seen.bench.frame.tau, seen.bench.places, seen.bench.alphas], [frame.sigma, frame.tau, frame.places, frame.alphas])) bad.push('the frame');
  const { drift } = seen.bench;
  if (!same(Object.keys(drift).filter((k) => k !== 'alternating'), DRIFTS.filter((k) => k !== 'alternating'))) bad.push('the drifts ' + Object.keys(drift).join(' '));
  if (!Object.values(drift).every((x) => Number.isFinite(x) && Math.abs(x) < 1e-12)) bad.push('a drift of 10⁻¹² or more');
  for (const lang of ['zh', 'en']) {
    const { spans, phrases } = expectedBench(lang, frame, drift),
      text = seen.box[lang];
    bad.push(...phrases.filter((x) => text.split(x).length !== 2).map((x) => `${lang} box: ${x}`));
    if (/—|undefined|NaN|null|Infinity|∞/.test(text)) bad.push(`${lang} box: not filled`);
    // every drift of the box is the least power of ten above the number the page measured, in order; none is written 0.0000
    const printed = [...text.matchAll(/(?:浮点偏差|浮点余量|drift|residue) (= 0|< 10⁻[⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g)].map((m) => m[1]);
    const want = DRIFTS.map((k) => belowText(Math.abs(drift[k])));
    if (!same(printed, want)) bad.push(`${lang} box: the drifts ${JSON.stringify([printed, want])}`);
    if ((text.match(lang === 'zh' ? /浮点/g : /\b(?:drift|residue)\b(?! is)/g) || []).length !== DRIFTS.length || (lang === 'en' && !text.includes('every drift is a floating-point one'))) bad.push(`${lang} box: a drift without its size`);
    if (!same(seen.spans[lang].map((x) => x[0]), ['kappa0', 'landing', 'ito', 'back', 'refr', 'dF'])) bad.push(`${lang} spans: ${seen.spans[lang].map((x) => x[0]).join(' ')}`);
    for (const [key, s] of seen.spans[lang]) if (s !== spans[key]) bad.push(`${lang} drawer ${key}: ${s} (${spans[key]})`);
    if (!(seen.dottie.length === 4 && seen.dottie.every((s) => s === spans.dottie))) bad.push(`dottie ${seen.dottie}`);
    bad.push(...mixed(text).map((x) => `${lang} chained: ${x}`));
  }
  return bad;
}
{
  const bad = await auditBench(page, { sigma: 1, tau: 0.5, places: 40, alphas: 200 });
  check('NUM: the box in both languages, its copy, the spans of the drawer and of the MODEL box are the numbers computed here (σ = 1, τ = 1/2, 41 places, 201 samplings), each drift the least power of ten above it', !bad.length, bad.slice(0, 6).join(' | '));
}
{
  // the same sources with another frame: every number of the box and of the drawer follows it, so none of them is written down
  const patches = [
    ['const FRAME = { sigma: 1, tau: 0.5 };', 'const FRAME = { sigma: 0.5, tau: 0.75 };'],
    ['const PLACES = 40;', 'const PLACES = 24;'],
    ['const ALPHAS = 200;', 'const ALPHAS = 80;']
  ];
  const p = await T.open(BOOK, ID, '?lang=zh', { reducedMotion: 'reduce' });
  await p.route(`**/${ID}/main.js*`, (route) => route.fulfill({ contentType: 'text/javascript; charset=utf-8', body: patches.reduce((js, [from, to]) => js.replace(from, to), sources['main.js']) }));
  await p.reload({ waitUntil: 'load' });
  await settle(p);
  const bad = await auditBench(p, { sigma: 0.5, tau: 0.75, places: 24, alphas: 80 });
  check('NUM: served with the frame σ = 1/2, τ = 3/4, 25 places and 81 samplings, the box and the drawer follow it (they are computed, not written)', patches.every(([from]) => sources['main.js'].split(from).length === 2) && !bad.length, bad.slice(0, 6).join(' | '));
  await p.context().close();
}
{
  // and with a wrong law in the script the numbers change: the box measures the page, it does not repeat a text
  const p = await T.open(BOOK, ID, '?lang=zh', { reducedMotion: 'reduce' });
  const from = 'law: (1 - 2 * alpha) * dx2,';
  await p.route(`**/${ID}/main.js*`, (route) => route.fulfill({ contentType: 'text/javascript; charset=utf-8', body: sources['main.js'].replace(from, 'law: (1 - 3 * alpha) * dx2,') }));
  await p.reload({ waitUntil: 'load' });
  await settle(p);
  const [law, text, ro] = await p.evaluate(() => [window.CAUSAL_TRIAD_DEBUG.bench().drift.law, document.querySelector('#basis .lean.num .zh').textContent, document.querySelector('#roStep').textContent]);
  check('NUM: with a wrong law (1 − 3α)‖Δx‖² in the script the box and the readout show its size', sources['main.js'].split(from).length === 2 && law > 0.1 && text.includes(`与 (1 − 2α)‖Δx‖² 的浮点偏差 ${belowText(law)}`) && !text.includes('与 (1 − 2α)‖Δx‖² 的浮点偏差 < 10⁻¹') && /· < 10/.test(ro) && !/< 10⁻¹\d/.test(ro), JSON.stringify([law, ro]));
  await p.context().close();
}
{
  // the same for “=”: it is printed of a fraction only while the computed double agrees with it
  const from = '[1, 0, (1 - alpha) * sigma, 0]);',
    p = await T.open(BOOK, ID, '?lang=zh', { reducedMotion: 'reduce' });
  await p.route(`**/${ID}/main.js*`, (route) => route.fulfill({ contentType: 'text/javascript; charset=utf-8', body: sources['main.js'].replace(from, '[1, 0, (1 - 0.9 * alpha) * sigma, 0]);') }));
  await p.reload({ waitUntil: 'load' });
  await settle(p);
  const [big, sub, step, text, spans] = await p.evaluate(() => ['#hudBig', '#hudSub', '#roStep', '#basis .lean.num .zh'].map((x) => document.querySelector(x).textContent).concat([[...document.querySelectorAll('#drawer .zh [data-bench="back"]')].map((e) => e.textContent)]));
  // ‖x₁‖² = (1 + 0.55²)/(1 + 0.5²) at α = 1/2, (1 + 0.1²)/2 at α = 1
  check('with a wrong step in the script no reading keeps its “= 1.0000”: the page says what it computes', sources['main.js'].split(from).length === 2 && [big, sub].every((x) => x.includes('‖x₁‖² ≈ 1.0420') && !x.includes('= 1.0000')) && step.startsWith('≈ 1.0420 · ') && text.includes('依次 = 2.0000、≈ 1.0420、≈ 0.5050') && same(spans, ['≈ 0.5050']), JSON.stringify([big, sub, step, spans]));
  await p.context().close();
}

/* ---------- the five cards in both languages ---------- */
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  for (const id of IDS) {
    check(lang + '/' + id + ' plays up to its still and parks', await pick(id));
    await verifyCard(page, id);
    await layout(page, lang + '/' + id);
    const m = await state(),
      I = m.leanInstances;
    const readings = await page.locator('#readouts output').allTextContents();
    check(lang + '/' + id + ' one key and six readouts, all populated', readings.length === 7 && (await page.locator('#readouts dl.ro > div.key').count()) === 1 && readings.every((t) => t && !/NaN|undefined|∞|^—$/.test(t)), JSON.stringify(readings));
    const key = { past: f4(m.kappa), present: f4(m.step.norm2), future: f4(m.s), third: f4(Math.abs(I.tetra.alternating)), loop: f4(m.s) }[m.scene];
    const t = await regimeTexts();
    check(lang + '/' + id + ' HUD title, pill and key readout', t.big.includes(key) && t.sub.length > 0 && (await textOf('roKey')).includes(`= ${f4(m.s)} ↔ = ${f4(1 - m.s)}`) && (await textOf('keyPill')) === `s = ${f4(m.s)} · 1 - s = ${f4(1 - m.s)}`, JSON.stringify([t, await textOf('roKey'), await textOf('keyPill')]));
    check(
      lang + '/' + id + ' the rail label and the outputs of the sliders carry their relation',
      (await textOf('tau')) === (m.scene === 'present' ? `α = ${f4(m.alpha)}` : `${m.scene === 'loop' ? `B${m.n} · ` : ''}s = ${f4(m.s)}`) && same(await Promise.all(['sOut', 'alphaOut', 'sigmaOut', 'ctxOut'].map((x) => textOf(x))), [`= ${f4(m.s)}`, '= 0.5000', '= 1.00', '= 0.50']),
      await textOf('tau')
    );
    {
      const zero = (x, unit = '') => (lang === 'zh' ? `= 0（浮点余量 ${belowText(x)}${x ? unit : ''}）` : `= 0 (residue ${belowText(x)}${x ? unit : ''})`);
      const want = {
        roStep: `= 1.0000 · = 0.00000000 · ${belowText(Math.abs(m.step.drift - m.step.law))}`,
        roTangent: `= 0.00000000 · ${zero(Math.abs(m.steps.mid.tangency))}`,
        roHeap: `= 0.5000 → = 0.0000 · = ${f4(m.kappa)} → = ${f4((1 - 2 * m.s) ** 2)}`,
        roLune: `${m.s === 0 ? '= 0.0000' : `≈ ${f4(2 * Math.atan(0.5) * m.s)}`} / ≈ 0.9273 · ≈ 65.55° · ≈ 0.2930`,
        roXi: `= 0.5000 · ${m.s === 0 || m.s === 1 ? '= 0.5000' : `≈ ${f4(xiEM(m.s))}`} · = 0.5000 · ${belowText(Math.abs(m.xi.at - m.xi.mirror))}`,
        roTetra: `${zero(Math.abs(I.tetra.alternating), '°')} · 0 / 256`
      };
      const got = {};
      for (const k of Object.keys(want)) got[k] = (await page.locator('#' + k).textContent()).replace(/\s+/g, ' ');
      check(lang + '/' + id + ' readouts: exact values after “=”, rounded ones after “≈”, residues as powers of ten', same(got, want), JSON.stringify(Object.keys(want).filter((k) => got[k] !== want[k]).map((k) => [got[k], want[k]])));
    }
    check(lang + '/' + id + ' the note of the card panel and of the tour bar agree and are not empty', t.note.length > 10 && t.note === t.tour, JSON.stringify(t));
  }
}
check('the registered stills are written on the cards', same(await page.$$eval('#presets [data-preset]', (els) => els.map((e) => Number(e.dataset.still))), IDS.map((id) => CARDS[id].still)));

/* ---------- the rails ---------- */
await pick(PRESENT);
for (const a of [0, 0.1, 0.25, 0.5, 0.62, 0.8, 1]) {
  await seek(a);
  const m = await state();
  check('rail α = ' + a, near(m.alpha, a, 1e-12) && m.rail === 'alpha' && !m.playing && near(m.s, 0.5, 1e-12));
  verifyMath(m, 'α=' + a);
  const box = await page.locator('#stageHandle').boundingBox(),
    at = await page.evaluate((x) => window.CAUSAL_TRIAD_DEBUG.dragTarget(x), a);
  check('handle sits on x₁(α) at α = ' + a, !!box && Math.hypot(box.x + box.width / 2 - at.x, box.y + box.height / 2 - at.y) < 1.5);
  check('α slider follows the rail at ' + a, near(Number(await page.inputValue('#alphaRange')), a, 0.0026) && (await textOf('alphaOut')) === `= ${f4(a)}` && (await textOf('tau')) === `α = ${f4(a)}`, await textOf('tau'));
}
check('the norm crosses 1 only at α = 1/2: 201 samples of the drift change sign once', await page.evaluate(() => Array.from({ length: 201 }, (_, k) => window.CAUSAL_TRIAD_DEBUG.calc(0.5, k / 200).step.drift).every((d, k) => (k < 100 ? d > 1e-4 : k === 100 ? Math.abs(d) < 1e-15 : d < -1e-4))));
// a pointer lands exactly on 1/2 when it comes close, so no reading can round to 1/2 while the words say otherwise
await seek(0.4972);
check('the rail snaps to α = 1/2 from 0.4972', (await state()).alpha === 0.5 && (await state()).regime === 'on');
await seek(0.48);
check('the rail keeps α = 0.48', near((await state()).alpha, 0.48, 1e-12) && (await state()).regime === 'out');
for (const id of [FUTURE, THIRD, PAST]) {
  await pick(id);
  for (const t of [0, 0.2, 0.5, 0.77, 1]) {
    await seek(t);
    const m = await state();
    check(`${id}: rail t = ${t}`, near(m.t, t, 1e-12) && m.rail === 't' && !m.playing && m.n === 0);
    verifyMath(m, `${id} t=${t}`);
    verifyInstances(m, m.leanInstances, `${id} t=${t}`);
    const box = await page.locator('#stageHandle').boundingBox(),
      at = await page.evaluate((x) => window.CAUSAL_TRIAD_DEBUG.dragTarget(x), t);
    check(`${id}: handle sits on the probe at t = ${t}`, !!box && Math.hypot(box.x + box.width / 2 - at.x, box.y + box.height / 2 - at.y) < 1.5);
    check(`${id}: s slider follows the rail at t = ${t}`, near(Number(await page.inputValue('#sRange')), m.s, 0.0026) && (await textOf('sOut')) === `${[0, 0.5, 1].includes(t) ? '=' : '≈'} ${f4(m.s)}` && (await textOf('tau')) === `s ${[0, 0.5, 1].includes(t) ? '=' : '≈'} ${f4(m.s)}`, await textOf('sOut'));
  }
  await seek(0.003);
  check(`${id}: the rail snaps to s = 0 from t = 0.003`, (await state()).t === 0);
  await seek(0.9965);
  check(`${id}: the rail snaps to s = 1 from t = 0.9965`, (await state()).t === 1 && near((await state()).s, 1, 1e-15));
}
await pick(LOOP);
for (const t of [0, 0.4, 1, 1.3, 2, 2.75, 3.5, 4]) {
  await seek(t);
  const m = await state();
  check('heartbeat rail t = ' + t, near(m.t, t, 1e-12) && !m.playing && m.max === 4);
  verifyMath(m, 'heartbeat t=' + t);
  verifyInstances(m, m.leanInstances, 'heartbeat t=' + t);
}
// inside a later beat the s slider spans that beat, and its 0 is the start of that beat
await seek(1.5);
await input('#sRange', 0);
check('s slider at 0 in B₁ stays in B₁', (await state()).n === 1 && (await state()).s === 0 && same((await state()).share, [0, 200]) && (await textOf('sOut')) === '= 0.0000' && (await textOf('tau')) === 'B1 · s = 0.0000', JSON.stringify(await state()).slice(0, 80));
await seek(1.5);
await input('#sRange', 1);
check('s slider at 1 in B₁ is the landing of B₁, read as the next 0′', (await state()).n === 1 && near((await state()).s, 1, 1e-12) && (await state()).regime === 'landed' && near((await state()).t, 2, 1e-12));

/* ---------- the sliders and the chips ---------- */
await pick(PRESENT);
for (const [sel, val, key] of [
  ['#alphaRange', 0, 'alpha'],
  ['#alphaRange', 1, 'alpha'],
  ['#sigmaRange', 2, 'sigma'],
  ['#sigmaRange', 0.4, 'sigma'],
  ['#sigmaRange', 0, 'sigma'],
  ['#sRange', 0.3, 's']
]) {
  await input(sel, val);
  const m = await state();
  check(`${sel} = ${val} on the Present card`, near(m[key], val, 1e-9) && m.scene === 'present' && m.preset === null && !m.playing && !m.blending);
  verifyMath(m, `${sel}=${val}`);
  verifyInstances(m, m.leanInstances, `${sel}=${val}`);
}
await pick(FUTURE);
await input('#alphaRange', 0.2);
check('a sampling slider on another card shows the step at once', (await state()).scene === 'present' && near((await state()).alpha, 0.2, 1e-12) && (await state()).rail === 'alpha' && near((await state()).clock, 0.2, 1e-12));
await pick(THIRD);
await input('#sigmaRange', 1.5);
check('a span slider on another card shows the step at once', (await state()).scene === 'present' && near((await state()).sigma, 1.5, 1e-12) && (await state()).layers.step === 1);
await pick(PAST);
await input('#ctxRange', 0.8);
check('a context slider on another card shows the closure at once', (await state()).scene === 'future' && near((await state()).tau, 0.8, 1e-12) && (await state()).rail === 't');
verifyMath(await state(), 'τ=0.8');
await pick(LOOP);
await input('#ctxRange', 1);
{
  const m = await state();
  check('on the heartbeat the context slider turns the headings: τ = 1, 90° per beat', m.scene === 'loop' && near(m.betaDeg, 90, 1e-9) && near(m.t, 3.5, 1e-12));
  verifyMath(m, 'heartbeat τ=1');
}
for (const [a, s] of [
  ['0', 0],
  ['0.5', 0.5],
  ['1', 1]
]) {
  await pick(FUTURE);
  await page.locator(`#anchorChips [data-anchor="${a}"]`).evaluate((b) => b.click());
  await settle(page);
  check(`anchor chip ${a} puts the probe on s = ${s} and lights up`, near((await state()).s, s, 1e-12) && (await page.getAttribute(`#anchorChips [data-anchor="${a}"]`, 'aria-pressed')) === 'true' && (await page.locator('#anchorChips [aria-pressed="true"]').count()) === 1);
}
await input('#sRange', 0.31);
check('off the three stations no anchor chip is lit', (await page.locator('#anchorChips [aria-pressed="true"]').count()) === 0);

/* ---------- the words follow the live regime ---------- */
const WORDS = {
  zh: { out: '球面之外', in: '球面之内', on: '正落在球面上', zero: '步幅 σ = 0', left: '已离开 x₀', parked: '停在 x₀', first: '第一个半拍', second: '第二个半拍', closed: '1/2 + 1/2', flat: 'τ = 0', noLune: '没有月牙', collapsed: '重合', antipodal: '对跖点', landed: '落拍', startBeat: 'B₀ 起拍', noTurn: '航向不转', free: '自由探索' },
  en: { out: 'outside', in: 'inside the sphere', on: 'on the sphere', zero: 'Span σ = 0', left: 'has left x₀', parked: 'x₀', first: 'irst half-beat', second: 'econd half-beat', closed: '1/2 + 1/2', flat: 'τ = 0', noLune: 'no lune', collapsed: 'meets V₀', antipodal: 'antipode', landed: 'land', startBeat: 'B₀ starts', noTurn: 'does not turn', free: 'Free play' }
};
const all = (t, w) => [t.sub, t.note, t.tour].every((x) => x.includes(w));
const none = (t, re) => [t.big, t.sub, t.note, t.tour].every((x) => !re.test(x));
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  const W = WORDS[lang];
  await pick(PRESENT);
  await input('#alphaRange', 0.3);
  let t = await regimeTexts(),
    m = await state();
  check(`${lang} α = 0.3: every text says the step ends outside`, m.regime === 'out' && all(t, W.out) && t.sub.includes('> 1') && t.note.includes('> 1') && t.sub.includes(f4(m.step.norm2)) && none(t, /exactly on the sphere|正落在球面上，|< 1，|sinks inside/) && t.note.startsWith(W.free), JSON.stringify(t));
  await input('#alphaRange', 0.5);
  t = await regimeTexts();
  check(`${lang} α = 1/2 in free play: every text says it lands on the sphere, none says > 1`, (await state()).regime === 'on' && t.sub.includes(W.on) && t.note.includes('1.0000') && none(t, /> 1|< 1,|< 1，/), JSON.stringify(t));
  await input('#alphaRange', 0.8);
  t = await regimeTexts();
  check(`${lang} α = 0.8: every text says the step sinks inside`, (await state()).regime === 'in' && all(t, W.in) && t.sub.includes('< 1') && none(t, /> 1，|> 1,|ends outside/), JSON.stringify(t));
  await input('#sigmaRange', 0);
  for (const a of [0, 0.5, 1]) {
    await input('#alphaRange', a);
    t = await regimeTexts();
    m = await state();
    check(`${lang} σ = 0, α = ${a}: no step, ‖x₁‖² = 1.0000, nothing outside or inside`, m.regime === 'zero' && f4(m.step.norm2) === '1.0000' && all(t, W.zero) && all(t, '1.0000') && none(t, /> 1|< 1|outside|球面之外|球面之内/) && !/α = 0 |α = 0 与|α = 0 and/.test(t.legend), JSON.stringify(t));
  }
  await pick(PAST);
  t = await regimeTexts();
  check(`${lang} past, s = 0: parked`, t.sub.includes(lang === 'zh' ? W.parked : 'Parked at x₀') && t.note.includes('1.0000') && none(t, new RegExp(W.left)), JSON.stringify(t));
  await input('#sRange', 0.25);
  t = await regimeTexts();
  check(`${lang} past, s = 0.25: the probe has left, no text claims it rests with κ = 1.0000`, (await state()).regime === 'left' && all(t, W.left) && t.sub.includes('0.7500') && none(t, /κ = 1\.0000/), JSON.stringify(t));
  await pick(FUTURE);
  for (const [s, regime, want] of [
    [0, 'start', 's = 0'],
    [0.2, 'first', W.first],
    [0.5, 'half', '1/2'],
    [0.7, 'second', W.second],
    [1, 'closed', '']
  ]) {
    await input('#sRange', s);
    t = await regimeTexts();
    check(`${lang} future, s = ${s}: ${regime}`, (await state()).regime === regime && t.sub.includes(want) && (regime === 'closed' ? t.note.includes(W.closed) && t.sub.includes('65.55') : none(t, /65\.55/) && !t.note.includes(W.closed)), JSON.stringify(t));
  }
  await input('#ctxRange', 0);
  for (const [s, regime] of [
    [0, 'flat-start'],
    [0.2, 'flat-first'],
    [0.5, 'flat-half'],
    [0.7, 'flat-second'],
    [1, 'flat-closed']
  ]) {
    await input('#sRange', s);
    t = await regimeTexts();
    const primitives = await primitiveColours();
    check(
      `${lang} future, τ = 0, s = ${s}: no lune and no refraction are drawn or claimed`,
      (await state()).regime === regime && all(t, W.flat) && t.sub.includes(W.noLune) && none(t, /65\.55|正好一半|exactly half|铺满|is full/) && !primitives.seen.some((x) => ['lune', 'refr', 'refracted'].includes(x.key)) && !/品红|magenta|lune|月牙/.test(t.legend),
      JSON.stringify(t)
    );
  }
  await pick(THIRD);
  for (const [s, regime, want] of [
    [0, 'collapsed', W.collapsed],
    [0.5, 'generic', '0.0000'],
    [1, 'antipodal', W.antipodal]
  ]) {
    await input('#sRange', s);
    t = await regimeTexts();
    check(`${lang} cap, s = ${s}: ${regime}, δF = 0.0000`, (await state()).regime === regime && all(t, want) && all(t, '0.0000'), JSON.stringify(t));
  }
  await pick(LOOP);
  for (const [x, regime, want] of [
    [0, 'start', ''],
    [0.3, 'running', 's ≈ 0.2061'],
    [0.5, 'half', '1/2'],
    [1, 'landed', W.landed],
    [1.5, 'half', '1/2'],
    [3, 'landed', W.landed],
    [4, 'landed', W.landed]
  ]) {
    await seek(x);
    t = await regimeTexts();
    check(`${lang} heartbeat, t = ${x}: ${regime}`, (await state()).regime === regime && t.sub.includes(want) && (regime !== 'landed' || t.sub.includes('s′ = 1 - κ(x₁, x₁) = 0.0000')) && (regime === 'landed' || none(t, /s′ = 0\.0000|1 - κ\(x₁, x₁\)/)), JSON.stringify(t));
  }
  await input('#ctxRange', 0);
  await seek(1.3);
  t = await regimeTexts();
  check(`${lang} heartbeat, τ = 0: the heading does not turn`, t.sub.includes(W.noTurn) && none(t, /53\.13/), JSON.stringify(t));
}

/* ---------- every relation the page prints, in every area, over the cards, languages, lenses and layouts ---------- */
const APART = '(?:（值| \\(value)';
/** The quantities the page writes a relation of at the frame v: [name, fraction or null, double, off]. */
function relationTable(v) {
  const sq = v.share ? fracN(BigInt(v.share[0]), BigInt(v.share[1])) : null,
    ofS = (f) => (sq ? f(sq) : null),
    s = sq ? numN(sq) : Math.sin((PI * v.f) / 2) ** 2,
    k = sq ? numN(subN(ONE, sq)) : Math.cos((PI * v.f) / 2) ** 2,
    h = sq ? numN(subN(sq, [1n, 2n])) : Math.sin(PI * (v.f - 0.5)) / 2,
    a = gridN(v.alpha, 200),
    g = gridN(v.sigma, 20),
    tq = gridN(v.tau, 20),
    thc = Math.atan(v.tau),
    phi = (PI * PI * thc) / 4,
    zeroIf = (c) => (c ? intN(0) : null),
    step = stepFrac(a, g),
    sqr = ofS((x) => mulN(subN(ONE, addN(x, x)), subN(ONE, addN(x, x)))),
    mom = ofS((x) => mulN([11n, 5n], subN(ONE, addN(x, x)))),
    { F } = v.f > 0 && v.f < 1 ? tetraGirard(s) : { F: null },
    faces = F ? { 'F₁₂₃': F[1][2][3], 'F₀₂₃': F[0][2][3], 'F₀₁₃': F[0][1][3], 'F₀₁₂': F[0][1][2] } : v.f === 0 ? { 'F₁₂₃': -Math.atan2(12, 5) / DEG, 'F₀₂₃': -Math.atan2(120, 50) / DEG, 'F₀₁₃': 0, 'F₀₁₂': 0 } : { 'F₁₂₃': Math.atan2(12, 5) / DEG, 'F₀₂₃': -Math.atan2(120, 50) / DEG, 'F₀₁₃': -Math.atan2(12, 5) / DEG, 'F₀₁₂': Math.atan2(12, 5) / DEG },
    faceQ = (key) => zeroIf((v.f === 0 && (key === 'F₀₁₃' || key === 'F₀₁₂')) || (v.f === 0.5 && key === 'F₁₂₃')),
    ksRef = [zeroIf(v.tau === 0), (1 - Math.cos(phi)) / 2];
  const turn = [v.tau === 0 ? intN(0) : v.tau === 1 ? intN(90) : null, (2 * thc) / DEG],
    refr = [zeroIf(v.tau === 0), phi / DEG],
    part = [zeroIf(v.tau === 0 || v.f === 0), 2 * thc * s],
    total = [zeroIf(v.tau === 0), 2 * thc];
  return {
    faces: ['F₁₂₃', 'F₀₂₃', 'F₀₁₃', 'F₀₁₂'].map((key) => [faceQ(key), faces[key]]),
    // N(1 − cos N^{−a}) at N = 10⁶ by the Taylor series
    versines: [1, 0.5, 0.25].map((e) => {
      const y = 1e6 ** -e;
      return [null, 1e6 * (y ** 2 / 2 - y ** 4 / 24 + y ** 6 / 720 - y ** 8 / 40320), e === 0.5 ? { 0.5: -1e6 * (y ** 4 / 24 - y ** 6 / 720) } : {}];
    }),
    rows: [
      ['1 − s', ofS((x) => subN(ONE, x)), k, { 0.5: -h, 1: -s }],
      ['(?<!− )(?<![A-Za-z(’])s', sq, s, { 0.5: h, 1: -k }],
      ['(?<![A-Za-z])κ(?:\\(x₀, x₀\\)|\\(x₀, x1/2\\))?', ofS((x) => subN(ONE, x)), k, { 0.5: -h, 1: -s }],
      ['κ\\(x₀, x₁\\)', ...ksRef],
      ['(?<!2)α', a, v.alpha],
      [`α [<>] 1/2${APART}`, a, v.alpha],
      ['(?<![A-Za-zα-ω₁])σ', g, v.sigma],
      ['τ', tq, v.tau],
      ['‖x₁‖²', step.norm2, numN(step.norm2)],
      [`‖x₁‖² [<>] 1${APART}`, step.norm2, numN(step.norm2)],
      ['⟨x₁ − x₀, x₀ \\+ x₁⟩|漂移|drift', step.drift, numN(step.drift)],
      ['δF|ΣF', intN(0), 0],
      ['s′(?: = 1 − κ\\(x₁, x₁\\))?', intN(0), 0],
      ['\\(2κ₁ − 1\\)²', intN(0), 0],
      ['\\(1 − 2s\\)²', sqr, 4 * h * h, { 1: -4 * s * k }],
      ['4s\\(1 − s\\)', ofS((x) => mulN(intN(4), mulN(x, subN(ONE, x)))), 4 * s * k, { 1: -4 * h * h }],
      ['月牙已铺|has spread', ...part],
      ['（全部|whole', ...total],
      ['折开|refracts it by|refracts the landing by|x₁ ·', ...refr],
      ['每拍转|heading turns by', ...turn],
      ['arctan\\(σ/2\\)', v.sigma === 0 ? intN(0) : v.sigma === 2 ? intN(90) : null, (2 * Math.atan(v.sigma / 2)) / DEG],
      ['P₁²/2', ofS(() => mulN([1n, 2n], mulN(mom, mom))), (2.2 * 2 * h) ** 2 / 2],
      ['(?<!E₂ = )P₁', mom, -2.2 * 2 * h],
      ['\\|\\(s − 1\\)/s\\|', s === 0 ? intN(0) : ofS((x) => divN(subN(ONE, x), x)), s === 0 ? 0 : k / s, { 1: s === 0 ? 0 : (-2 * h) / s }],
      ['14\\.1347i 处', ONE, 1],
      ...['F₁₂₃', 'F₀₂₃', 'F₀₁₃', 'F₀₁₂'].map((key) => [key, faceQ(key), faces[key]])
    ],
    lists: {
      roKey: [[sq, s, { 0.5: h, 1: -k }], [ofS((x) => subN(ONE, x)), k, { 0.5: -h, 1: -s }]],
      roStep: [[step.norm2, numN(step.norm2)], [step.drift, numN(step.drift)], 'drift'],
      roTangent: [[step.drift, numN(step.drift)], 'zero'],
      roHeap: [[[1n, 2n], 0.5], [intN(0), 0], [ofS((x) => subN(ONE, x)), k, { 0.5: -h, 1: -s }], [sqr, 4 * h * h, { 1: -4 * s * k }]],
      roLune: [part, total, refr, ksRef],
      roXi: [[[1n, 2n], 0.5], [v.f === 0 || v.f === 1 ? [1n, 2n] : null, xiEM(s)], [[1n, 2n], 0.5], 'drift'],
      roTetra: ['zero', 'count'],
      outs: [[sq, s, { 0.5: h, 1: -k }], [a, v.alpha], [g, v.sigma], [tq, v.tau]]
    },
    // the labels of the three samplings
    samplings: { 'α = 0': stepFrac(intN(0), g).norm2, 'α = 1/2': stepFrac([1n, 2n], g).norm2, 'α = 1': stepFrac(ONE, g).norm2, 'σ = 0': ONE }
  };
}
/** The relations found in a text, the wrong ones, and the printed values no row of the table stands for. */
function relations(text, table) {
  const s = text.replace(/\s+/g, ' ').replace(/F₁₂₃ − F₀₂₃ \+ F₀₁₃ − F₀₁₂/g, 'ΣF'),
    bad = [],
    audited = new Set();
  let count = 0;
  // `end`: where the printed value ends in s
  const take = (end, whole, sign, printed, q, x, off) => {
    count++;
    audited.add(end);
    const why = wrongRelation(sign, printed, q, x, off);
    if (why) bad.push(`${whole} [${why}]`);
  };
  // lists of values in a fixed order: the four terms of the alternating sum, the three accumulated versines
  const lists = [
    [/(?:四项|terms) ([^；;]*)[；;]/g, table.faces, '°'],
    [/累计正矢（N = 10⁶）：([^。]*)。|roughness a = 1, 1\/2, 1\/4: (.*)\.$/g, table.versines, '']
  ];
  for (const [re, values, unit] of lists)
    for (const m of s.matchAll(re)) {
      const body = m[1] === undefined ? m[2] : m[1],
        from = m.index + m[0].indexOf(body),
        items = [...body.matchAll(new RegExp(`([=≈]) (${VALUE})${unit}`, 'g'))];
      if (items.length !== values.length || body.split(/、|, /).length !== values.length) bad.push(`${m[0]} [list]`);
      else items.forEach((x, i) => take(from + x.index + x[0].length - unit.length, x[0], x[1], x[2], ...values[i]));
    }
  for (const [name, q, x, off] of table.rows) for (const m of s.matchAll(new RegExp(`(?:${name}) ([=≈]) (${VALUE})`, 'g'))) take(m.index + m[0].length, m[0], m[1], m[2], q, x, off);
  for (const m of s.matchAll(new RegExp(`and ([=≈]) (${VALUE})(?= at 1/2 \\+ 14\\.1347i)`, 'g'))) take(m.index + m[0].length, m[0], m[1], m[2], ONE, 1);
  // nothing is printed outside the audit: every value after a relation sign is one of those above
  for (const m of s.matchAll(new RegExp(`[=≈] (${VALUE})`, 'g'))) if (!audited.has(m.index + m[0].length)) bad.push(`${s.slice(Math.max(0, m.index - 24), m.index + m[0].length)} [not audited]`);
  return { count, bad };
}
{
  // the audit itself: a relation of the wrong kind, a rounding in the wrong digit and a landmark of another value are all found
  const at = (over) => relationTable({ scene: 'future', n: 0, f: 0.3, share: null, alpha: 0.5, sigma: 1, tau: 0.5, ...over });
  const wrong = [
      ['s = 0.2061', at({})],
      ['s ≈ 0.2062', at({})],
      ['1 − s = 0.7939', at({})],
      ['s ≈ 0.5000', at({ f: 0.5, share: [1, 2] })],
      ['s ≈ 0.8000', at({ f: T_CAP, share: [4, 5] })],
      ['‖x₁‖² = 1.0080', at({ alpha: 0.495 })],
      ['‖x₁‖² ≈ 1.0000', at({ alpha: 0.495, sigma: 0.05 })],
      ['‖x₁‖² > 1（值 ≈ 2.0000）', at({ alpha: 0 })],
      ['α = 0.1235', at({ alpha: 0.123456 })],
      ['α ≈ 0.3000', at({ alpha: 0.3 })],
      ['κ(x₀, x₁) = 0.2930', at({})],
      ['李三元组把它折开 = 65.55°', at({})],
      ['航向每拍转 = 53.13°', at({})],
      ['δF ≈ 0.0000', at({})],
      ['月牙已铺 = 0.1911（全部 ≈ 0.9273）', at({})],
      ['F₁₂₃ − F₀₂₃ + F₀₁₃ − F₀₁₂ = 0.0000（四项 = 0.00°、≈ −67.38°、≈ −33.69°、≈ 33.68°；浮点余量 = 0）', at({ f: 0.5, share: [1, 2] })]
    ].filter(([x, table]) => !relations(x, table).bad.length),
    right = [
      ['s ≈ 0.2061', at({})],
      ['s = 0.8000，1 − s = 0.2000', at({ f: T_CAP, share: [4, 5] })],
      ['‖x₁‖² ≈ 1 + 2.498×10⁻⁵', at({ alpha: 0.495, sigma: 0.05 })],
      ['α < 1/2（值 = 0.3000）：‖x₁‖² > 1（值 ≈ 1.3670）', at({ alpha: 0.3 })],
      ['F₁₂₃ − F₀₂₃ + F₀₁₃ − F₀₁₂ = 0.0000（四项 = 0.00°、≈ −67.38°、≈ −33.69°、≈ 33.69°；浮点余量 = 0）', at({ f: 0.5, share: [1, 2] })]
    ].filter(([x, table]) => relations(x, table).bad.length || !relations(x, table).count);
  check('the audit of relations finds sixteen wrong texts and leaves five right ones', !wrong.length && !right.length, JSON.stringify([wrong.map((x) => x[0]), right.map((x) => x[0])]));
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
          const s = window.CAUSAL_TRIAD_DEBUG.state;
          out.push({
            lang,
            lens: s.lens,
            v: { scene: s.scene, regime: s.regime, n: s.n, f: s.f, share: s.share, alpha: s.alpha, sigma: s.sigma, tau: s.tau },
            texts: Object.fromEntries(['#keyPill', '#scenePill', '#hudBig', '#hudSub', '#presetNote', '#tour .tour-note', '#roKeySub', '#roNote', '#tau', '#legend', '#plotTitle', '#plotMeta', '#plotTitleB', '#plotMetaB'].map((x) => [x, text(x)])),
            lists: Object.fromEntries(['roKey', 'roStep', 'roTangent', 'roHeap', 'roLune', 'roXi', 'roTetra'].map((x) => [x, text('#' + x)])),
            outs: ['sOut', 'alphaOut', 'sigmaOut', 'ctxOut'].map((x) => text('#' + x)),
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
// the places a pointer, a key, a slider and playback reach, the ends, and doubles beside the stations
const PLACES = [['now', 0], ['now', 0.0071], ['now', 0.123456], ['now', 1 / 3], ['now', 0.4999], ['now', 0.5], ['now', 0.507], ['now', 0.77], ['now', 0.9929], ['now', 1], ['sRange', 0], ['sRange', 0.005], ['sRange', 0.25], ['sRange', 0.3], ['sRange', 0.495], ['sRange', 0.5], ['sRange', 0.505], ['sRange', 0.8], ['sRange', 0.995], ['sRange', 1]];
const SWEEPS = {
  [PAST]: PLACES.map((x) => [x]),
  [PRESENT]: [
    ...[0, 0.05, 0.123456, 0.25, 0.3, 1 / 3, 0.49, 0.495, 0.5, 0.505, 0.51, 0.75, 0.9, 1].map((a) => [['now', a]]),
    ...[0, 0.05, 0.4, 1.5, 2].flatMap((g) => [0, 0.25, 0.495, 0.5, 0.505, 1].map((a) => [['sigmaRange', g], ['alphaRange', a]]))
  ],
  [FUTURE]: [...PLACES.map((x) => [x]), ...[0, 0.05, 0.75, 1].flatMap((c) => [0, 0.3, 0.5, 1].map((s) => [['ctxRange', c], ['sRange', s]]))],
  [THIRD]: PLACES.map((x) => [x]),
  [LOOP]: [...[0, 0.3, 0.5, 1, 1.3, 2, 2.75, 3.5, 4].map((x) => [['now', x]]), ...[0, 0.3, 0.5, 1].map((s) => [['now', 1.5], ['sRange', s]]), ...[0, 1].map((c) => [['ctxRange', c], ['now', 2.2]])]
};
for (const [where, query, viewport] of [
  ['desktop', '', { width: 1440, height: 900 }],
  ['phone', '', { width: 390, height: 844 }],
  ['figure', 'embed=1&', { width: 740, height: 500 }]
])
  for (const id of IDS) {
    const p = await T.open(BOOK, ID, `?${query}lang=zh&preset=${id}`, { viewport, reducedMotion: 'reduce' });
    await settle(p);
    // (a place set on the Present card moves the probe there; the rail is the sampling)
    const frames = await readFrames(p, SWEEPS[id]);
    const bad = [],
      beside = [],
      unmarked = [],
      zeros = [];
    let count = 0;
    for (const f of frames) {
      const table = relationTable(f.v),
        at = `${f.lang}/lens ${f.lens}/f = ${f.v.f}, α = ${f.v.alpha}, σ = ${f.v.sigma}, τ = ${f.v.tau}`;
      for (const [sel, x] of Object.entries(f.texts)) {
        const r = relations(x, table);
        count += r.count;
        bad.push(...r.bad.map((b) => `${at} ${sel}: ${b}`));
        beside.push(...mixed(x).map((b) => `${at} ${sel}: ${b}`));
        if (/NaN|undefined|Infinity/.test(x)) bad.push(`${at} ${sel}: ${x}`);
        // a printed 0.0000 or 0.00° is an exact zero: never the rounding of a residue
        if (/≈ −?0\.0+(?![\d×])/.test(x)) zeros.push(`${at} ${sel}: ${x}`);
      }
      for (const [key, list] of Object.entries(f.lists)) {
        beside.push(...mixed(list).map((b) => `${at} #${key}: ${b}`));
        const parts = list.split(/ · | ↔ | → | \/ /);
        // (the tetrahedron readout ends with “0 / 256”)
        const want = key === 'roTetra' ? ['zero', 'n', 'n'] : table.lists[key];
        if (parts.length !== want.length) bad.push(`${at} #${key}: ${list}`);
        else
          parts.forEach((x, i) => {
            const w = want[i];
            if (w === 'n') {
              if (!/^(?:0|256)$/.test(x)) bad.push(`${at} #${key}: ${x}`);
            } else if (w === 'drift') {
              if (!/^(?:= 0|< 10⁻1?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)$/.test(x)) unmarked.push(`${at} #${key}: ${x}`);
            } else if (w === 'zero') {
              if (!/^= 0(?:（浮点余量 | \(residue )(?:= 0|< 10⁻[⁰¹²³⁴⁵⁶⁷⁸⁹]+°?)[）)]$/.test(x)) unmarked.push(`${at} #${key}: ${x}`);
            } else {
              const m = new RegExp(`^([=≈]) (${VALUE})°?$`).exec(x);
              count++;
              if (!m) unmarked.push(`${at} #${key}: ${x}`);
              else {
                const why = wrongRelation(m[1], m[2], ...w);
                if (why) bad.push(`${at} #${key}: ${x} [${why}]`);
              }
            }
          });
      }
      f.outs.forEach((x, i) => {
        const m = new RegExp(`^([=≈]) (${VALUE})$`).exec(x),
          why = m ? wrongRelation(m[1], m[2], ...table.lists.outs[i]) : 'no relation';
        count++;
        if (why) bad.push(`${at} output ${i}: ${x} [${why}]`);
      });
      if (!/^(?:α|(?:B\d · )?s) [=≈] \S/.test(f.texts['#tau'])) unmarked.push(`${at} #tau: ${f.texts['#tau']}`);
      for (const tag of f.tags) {
        beside.push(...mixed(tag).map((b) => `${at} label: ${b}`));
        const m = new RegExp(`^(α = (?:0|1/2|1)|σ = 0)(?: ·|:) ‖x₁‖² ([=≈]) (${VALUE})$`).exec(tag);
        if (m) {
          count++;
          const why = wrongRelation(m[2], m[3], table.samplings[m[1]], numN(table.samplings[m[1]]));
          if (why) bad.push(`${at} label ${tag} [${why}]`);
        } else {
          const r = relations(tag, table);
          count += r.count;
          bad.push(...r.bad.map((b) => `${at} label: ${b}`));
          if (/\d\.\d/.test(tag) && !r.count) unmarked.push(`${at} label: ${tag}`);
        }
      }
    }
    check(`${where}/${id}: in ${frames.length} frames every printed relation is “=” before the value itself or “≈” before its rounding (${count} relations)`, frames.length >= 60 && count >= 18 * frames.length && !bad.length, `${count} of ${frames.length}: ${[...new Set(bad)].slice(0, 5).join(' ¦ ')}`);
    check(`${where}/${id}: every value of the rail, the sliders, the readouts and the labels carries its relation, every residue a power of ten`, !unmarked.length, [...new Set(unmarked)].slice(0, 4).join(' ¦ '));
    check(`${where}/${id}: no rounding is printed as zero`, !zeros.length, zeros.slice(0, 3).join(' ¦ '));
    for (const [sel, x] of await areaTexts(p)) beside.push(...mixed(x).map((b) => `${sel}: ${b}`));
    check(`${where}/${id}: no rounded or decimal digits stand beside <, >, ≤ or ≥ in the HUD, the readouts, the evidence, the drawer, the notes, the labels, the rail and the strips, nothing exempt`, !beside.length, [...new Set(beside)].slice(0, 4).join(' ¦ '));
    await p.context().close();
  }
{
  // beside a station the words and the values agree: no reading rounds onto the station it has not reached
  const rows = await page.evaluate(() => [0.4999999, 0.5 + 1e-7, 0.5 - 1e-9].map((a) => window.CAUSAL_TRIAD_DEBUG.calc(0.5, a).step.norm2));
  check('α beside 1/2: ‖x₁‖² is on its own side of 1', rows[0] > 1 && rows[1] < 1 && rows[2] > 1, JSON.stringify(rows));
  await setLang('en');
  await pick(PRESENT);
  await input('#alphaRange', 0.495);
  await input('#sigmaRange', 0.05);
  const sub = await page.locator('#hudSub').textContent();
  check('α = 0.495, σ = 0.05: the excess over 1 is written out, the exact inequality first and the value apart', sub.includes('α < 1/2 (value = 0.4950): ‖x₁‖² > 1 (value ≈ 1 + 2.498×10⁻⁵)') && !sub.includes('1.0000') && !mixed(sub).length, sub);
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
        dom = await p.evaluate((cid) => {
          const b = document.querySelector(`[data-preset="${cid}"]`),
            top = (s) => document.querySelector(s).getBoundingClientRect().top,
            sizes = (s) => [...document.querySelectorAll(s)].filter((el) => el.getClientRects().length && el.scrollWidth > el.clientWidth + 1).map((el) => el.id || el.className);
          return { tourShown: document.querySelector('#tour').getClientRects().length > 0, pressed: b.getAttribute('aria-pressed'), note: document.querySelector('#presetNote').textContent.trim().length, tour: document.querySelector('#tour .what').textContent.trim().length, stage: top('#stage'), deck: top('#rail'), strip: top('.strip'), tourTop: top('#tour'), wide: sizes('#readouts dd, #readouts .note, #basis .lean, .field output, .pill, #tau') };
        }, id);
      check(
        `stage first ${lang}/${where} ${width}×${height}/${id}: the stage holds its share, the regions and labels keep clear, the card is marked and explained`,
        share >= least && !view.layout.length && !view.hud.length && !labels.length && !left.length && (await overflowX(p)) <= 0 && dom.pressed === 'true' && dom.note > 10 && dom.tour > 10 && dom.stage < dom.strip && (width > 1080 ? !dom.tourShown : dom.tourShown && dom.stage < dom.tourTop && dom.tourTop < dom.strip && dom.stage < dom.deck) && !dom.wide.length,
        JSON.stringify({ share, view: [...view.layout, ...view.hud].slice(0, 3), labels: labels.slice(0, 3), left: left.slice(0, 3), dom })
      );
      const m = await state(p);
      check(`stage first ${lang}/${where}/${id}: the card rests on its still and its regime`, near(m.clock, CARDS[id].still, 1e-12) && m.regime === CARDS[id].regime && m.scene === CARDS[id].scene && !m.playing);
    }
    await p.context().close();
  }

/* ---------- the two lenses and the views ---------- */
await setLang('en');
check('desktop: the mirror lens button of the tour bar stays hidden', (await page.evaluate(() => innerWidth)) > 1080 && (await page.locator('#mobileLensBtn').isHidden()));
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  for (const id of IDS) {
    await pick(id);
    const before = await state(),
      tags0 = await tagText(),
      pill0 = await textOf('scenePill'),
      big0 = await textOf('hudBig');
    await page.locator('#lensToggleBtn').evaluate((b) => b.click());
    await settle(page);
    const on = await state();
    check(
      `${lang}/${id} the cross-domain lens renames the picture, says MODEL on the switch, the pill and the title, and keeps the state`,
      on.lens === 1 &&
        !same(await tagText(), tags0) &&
        (await textOf('scenePill')) !== pill0 &&
        (await textOf('hudBig')) !== big0 &&
        /MODEL/.test(await textOf('hudBig')) &&
        /MODEL/.test(await textOf('hudSub')) &&
        /MODEL/.test(await textOf('scenePill')) &&
        /MODEL/.test(await page.locator('#lensToggleBtn .seg.on').innerText()) &&
        ['t', 'alpha', 'sigma', 'tau', 'scene', 'preset'].every((k) => on[k] === before[k]) &&
        (await page.getAttribute('#lensToggleBtn', 'aria-pressed')) === 'true' &&
        (await page.getAttribute('#mobileLensBtn', 'aria-pressed')) === 'true',
      JSON.stringify([await tagText(), await textOf('hudBig')])
    );
    await layout(page, `${lang}/${id} cross-domain lens`);
    await page.locator('#lensToggleBtn').evaluate((b) => b.click());
    await settle(page);
    check(`${lang}/${id} the triad lens is back`, (await state()).lens === 0 && same(await tagText(), tags0));
  }
}
await pick(DEFAULT);
const views = [];
for (const name of CAM_NAMES) {
  await page.locator('[data-cam="' + name + '"]').evaluate((b) => b.click());
  await settle(page);
  check('selected view ' + name, (await state()).cam === name && (await page.getAttribute('[data-cam="' + name + '"]', 'aria-pressed')) === 'true');
  await until(page, () => !document.querySelector('#stage').hasAttribute('aria-busy'));
  views.push((await state()).camera);
  await layout(page, 'view ' + name);
}
check('the three views have distinct orientations', new Set(views.map((c) => [c.yaw, c.pitch].join('/'))).size === 3);

/* ---------- the amber handle ---------- */
async function dragHandle(from, to) {
  await page.locator('#stage').scrollIntoViewIfNeeded();
  await settle(page);
  const here = await state(),
    box = await page.locator('#stageHandle').boundingBox();
  // both ends are read in the frame the drag starts in
  const [a, b] = await page.evaluate(([x, y]) => [window.CAUSAL_TRIAD_DEBUG.dragTarget(x), window.CAUSAL_TRIAD_DEBUG.dragTarget(y)], [from, to]);
  check('the handle lies on its point before the drag', !!box && Math.hypot(box.x + box.width / 2 - a.x, box.y + box.height / 2 - a.y) < 1.5);
  await page.mouse.move(a.x, a.y);
  await page.mouse.down();
  await page.mouse.move(b.x, b.y);
  await page.mouse.up();
  await settle(page);
  const now = await state();
  check('dragging the handle leaves the camera alone, pauses and unmarks the card', same(now.camera, here.camera) && !now.playing && now.preset === null);
  return now;
}
await pick(PRESENT);
{
  const m = await dragHandle(0.5, 0.12);
  check('on the Present card the handle drags the sampling α, and the sliders and the rail follow', near(m.alpha, 0.12, 0.02) && near(m.clock, m.alpha, 1e-12) && near(Number(await page.inputValue('#alphaRange')), m.alpha, 0.0026) && m.step.norm2 > 1, String(m.alpha));
  verifyMath(m, 'dragged α');
  await page.locator('#stageHandle').focus();
  await page.keyboard.press('ArrowRight');
  await settle(page);
  check('ArrowRight on the handle adds 0.01 to α', near((await state()).alpha, m.alpha + 0.01, 1e-9));
  await page.keyboard.press('End');
  await settle(page);
  check('End on the handle goes to α = 1', (await state()).alpha === 1);
  await page.keyboard.press('Home');
  await settle(page);
  check('Home on the handle goes to α = 0', (await state()).alpha === 0);
  const back = await dragHandle(0, 0.5);
  check('a drag onto the sphere snaps to α = 1/2 exactly, ‖x₁‖² = 1', back.alpha === 0.5 && near(back.step.norm2, 1, 1e-12));
}
await pick(FUTURE);
{
  const m = await dragHandle(1, 0.35);
  check('on the Future card the handle drags the probe, and the s slider and the rail follow', near(m.t, 0.35, 0.02) && near(m.clock, m.t, 1e-12) && near(Number(await page.inputValue('#sRange')), m.s, 0.0026), String(m.t));
  verifyMath(m, 'dragged s');
}
await pick(THIRD);
{
  const before = (await state()).leanInstances.tetra;
  const m = await dragHandle(T_CAP, 0.45),
    after = m.leanInstances.tetra;
  check('dragging V₁ changes the face phases and leaves δF = 0', Math.abs(before.F123 - after.F123) > 5 && Math.abs(before.F013 - after.F013) > 5 && near(after.alternating, 0, 1e-9) && near(before.alternating, 0, 1e-9));
}
await pick(LOOP);
{
  const m = await dragHandle(3.5, 3.1);
  check('on the heartbeat the handle drags the place inside the beats', near(m.t, 3.1, 0.03) && m.n === 3, String(m.t));
}

/* ---------- playback ---------- */
for (const id of IDS.filter((x) => CARDS[x].plays)) check(id + ' plays', await playsAfter(page, () => page.locator('[data-preset="' + id + '"]').evaluate((b) => b.click()), () => ({ playing: window.CAUSAL_TRIAD_DEBUG.state.playing, t: window.CAUSAL_TRIAD_DEBUG.state.clock })));
await page.locator(`[data-preset="${PAST}"]`).evaluate((b) => b.click());
await settle(page);
check('the past card does not play by itself: it is parked at s = 0', !(await state()).playing && (await state()).t === 0);
await pick(FUTURE);
await page.locator('#play').evaluate((b) => b.click());
check('▶ on the closed beat starts again from s = 0', await until(page, () => window.CAUSAL_TRIAD_DEBUG.state.playing && window.CAUSAL_TRIAD_DEBUG.state.t < 0.9));
check('a single beat ends exactly on its landing s = 1 and stops', await until(page, () => !window.CAUSAL_TRIAD_DEBUG.state.playing && window.CAUSAL_TRIAD_DEBUG.state.t === 1, null, 150000));
await pick(LOOP);
await page.locator('#play').evaluate((b) => b.click());
check('▶ on the heartbeat runs on over the last landing into the first beat and keeps playing', await until(page, () => window.CAUSAL_TRIAD_DEBUG.state.playing && window.CAUSAL_TRIAD_DEBUG.state.t < 1.5 && window.CAUSAL_TRIAD_DEBUG.state.max === 4, null, 150000));
await pause();

/* ---------- colours ---------- */
for (const id of IDS) {
  await pick(id);
  const { seen, palette: P } = await primitiveColours();
  const of = (key) => seen.filter((x) => x.key === key).flatMap((x) => x.colors);
  check(
    id + ' semantic stage colours: amber only on the current point, no green and no red',
    seen.filter((x) => x.colors.includes(P.amber)).every((x) => x.key === 'probe') &&
      seen.filter((x) => x.key === 'probe').length === 1 &&
      of('probe').includes(P.amber) &&
      seen.every((x) => !x.colors.includes(P.ok) && !x.colors.includes(P.warn)) &&
      of('wall').includes(P.violet)
  );
  if (id === PRESENT) check('present: the midpoint step is cyan, the two ends are magenta', of('cayley').includes(P.cyan) && of('midpoint').includes(P.cyan) && of('ito').includes(P.magenta) && of('backward').includes(P.magenta));
  if (id === FUTURE) check('future: the beat is cyan, the lune and the refraction magenta', of('beat').includes(P.cyan) && of('lune').includes(P.magenta) && of('refr').includes(P.magenta) && of('refracted').includes(P.magenta));
  if (id === THIRD) check('cap: the cell is violet with magenta edges', of('tetra').includes(P.violet) && of('tetra').includes(P.magenta) && of('edge01').includes(P.magenta));
  if (id === LOOP) check('heartbeat: run beats are cyan, the landed cells violet', ['beat0', 'beat1', 'beat2', 'beat3'].every((k) => of(k).includes(P.cyan)) && of('cell-1').includes(P.violet) && of('cell1').includes(P.violet));
}
await pick(LOOP);
for (const [t, cells] of [
  [0.6, []],
  [1, ['cell-1']],
  [1.5, ['cell-1']],
  [2, ['cell-1', 'cell1']]
]) {
  await seek(t);
  const keys = (await primitiveColours()).seen.map((x) => x.key).filter((k) => /^cell-?1$/.test(k));
  check(`heartbeat t = ${t}: a 3-cell stands exactly at the landings already made`, same(keys, cells), JSON.stringify(keys));
}
const domColours = (p) =>
  p.evaluate(() => {
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
    for (const el of document.querySelectorAll('#stage *, .strip *, #readouts *, .field output, #anchorChips *')) {
      if (el.closest('.handle') || el.matches('.hud-bl .sw.am')) continue; // the handle, and the legend key of the current point
      const cs = getComputedStyle(el);
      for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderLeftColor']) if (banned.includes(cs[prop])) bad.push(`${el.id || el.className || el.tagName} ${prop}`);
    }
    const amber = col('--amber');
    for (const el of document.querySelectorAll('#basis, #basis *')) if ([getComputedStyle(el).color, getComputedStyle(el).borderTopColor].includes(amber)) bad.push(`#basis ${el.className || el.tagName}`);
    return bad;
  });
{
  const bad = await domColours(page);
  check('amber, green and red stay off the stage labels, the strips, the readouts and the evidence text', !bad.length, bad.slice(0, 3).join(' | '));
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
        dot = g.dot,
        arrow = g.arrow;
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
      g.arrow = (a, b, s) => {
        for (const q of [a, b]) rec.tops.push(g.Y(q[1]) - 5);
        return arrow(a, b, s);
      };
      g.ctx.fillText = function (text, x, y, ...more) {
        if (!/^10\.5px/.test(this.font)) {
          const m = this.measureText(text);
          rec.ticks.push({ text, l: x - m.actualBoundingBoxLeft, r: x + m.actualBoundingBoxRight });
        }
        if (/^10\.5px/.test(this.font)) {
          const m = this.measureText(text);
          rec.texts.push({ text, l: x - m.actualBoundingBoxLeft, r: x + m.actualBoundingBoxRight, t: y - m.actualBoundingBoxAscent, b: y + m.actualBoundingBoxDescent });
        }
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
      `${label} #${id}: the legend clears every curve, cursor and dot by ≥ 8 px with a deeper font descent, ≥ 35% head room, and no legend text is cut off`,
      r.texts.length >= 2 && r.h >= 118 && top - bottom >= 8 && (r.y1 - hi) / (hi - lo) >= 0.35 && r.texts.every((x) => x.l >= 0 && x.r <= r.w - 2 && x.t >= 0),
      JSON.stringify({ gap: top - bottom, head: (r.y1 - hi) / (hi - lo), h: r.h, texts: r.texts.map((x) => x.text) })
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
    const drift = f.plot.lines.find((l) => l.color === P.magenta);
    check(
      `${lang}/${id} strip 1: the drift (1 − 2α)‖Δx‖² over α ∈ [0, 1], zero line and dot at 1/2 in cyan, amber cursor at α`,
      !!drift &&
        near(drift.pts[0][0], 0) &&
        near(drift.pts.at(-1)[0], 1) &&
        drift.pts.every(([a, v]) => {
          const x = thetaStep(leftMatrix([0, 0, m.sigma, 0]), [1, 0, 0, 0], a);
          return near(v, dot(x, x) - 1, 1e-12);
        }) &&
        f.plot.lines.some((l) => l.color === P.cyan && l.pts.every(([, v]) => v === 0)) &&
        f.plot.dots.some((d) => d.color === P.cyan && d.x === 0.5 && d.y === 0) &&
        f.plot.lines.filter((l) => l.color === P.amber).length === 1 &&
        f.plot.lines.filter((l) => l.color === P.amber)[0].pts.every(([x]) => near(x, m.alpha, 1e-12)) &&
        f.plot.dots.filter((d) => d.color === P.amber).length === 1 &&
        near(f.plot.dots.find((d) => d.color === P.amber).y, m.step.drift, 1e-12)
    );
    const b = f.plotB,
      amberLine = b.lines.filter((l) => l.color === P.amber),
      amberDots = b.dots.filter((d) => d.color === P.amber);
    if (m.scene === 'third') {
      const e2 = b.lines.find((l) => l.color === P.cyan),
        ost = b.lines.find((l) => l.color === P.magenta);
      check(
        `${lang}/${id} strip 2 is the energy cap: E₂ = P₁²/2 ≥ 0 in cyan, H = P₁ in magenta over [−2.2, 2.2], amber at P₁ = 2.2(1 − 2s)`,
        !!e2 &&
          !!ost &&
          e2.pts.every(([p, v]) => near(v, (p * p) / 2, 1e-12) && v >= 0) &&
          ost.pts.every(([p, v]) => near(v, p, 1e-12)) &&
          near(Math.min(...ost.pts.map((q) => q[1])), -2.2, 1e-12) &&
          near(e2.pts[0][0], -2.2, 1e-12) &&
          near(e2.pts.at(-1)[0], 2.2, 1e-12) &&
          amberLine.length === 1 &&
          amberLine[0].pts.every(([x]) => near(x, 2.2 * (1 - 2 * m.s), 1e-12)) &&
          amberDots.length === 2 &&
          /MODEL/.test(await textOf('plotTitleB')) &&
          /Q₂ = 1/.test(await textOf('plotMetaB')) &&
          !/third|三阶/i.test((await textOf('plotTitleB')) + (await textOf('plotMetaB')))
      );
    } else {
      const s1 = b.lines.find((l) => l.color === P.magenta),
        s2 = b.lines.find((l) => l.color === P.cyan),
        env = b.lines.find((l) => l.color === P.violet && !l.dash),
        xi = b.lines.find((l) => l.color === P.violet && l.dash);
      check(
        `${lang}/${id} strip 2: s and 1 − s meet at (1/2, 1/2), 4s(1 − s) peaks at 1/2 and vanishes at 0 and 1, ξ(s) is symmetric, amber at s`,
        !!s1 &&
          !!s2 &&
          !!env &&
          !!xi &&
          s1.pts.every(([x, v]) => near(v, x, 1e-12)) &&
          s2.pts.every(([x, v]) => near(v, 1 - x, 1e-12)) &&
          env.pts.every(([x, v]) => near(v, 4 * x * (1 - x), 1e-12)) &&
          near(env.pts[0][1], 0) &&
          near(env.pts.at(-1)[1], 0) &&
          near(Math.max(...env.pts.map((q) => q[1])), 1, 1e-12) &&
          xi.pts.every(([x, v]) => near(v, xiEM(x), 1e-9)) &&
          amberLine.length === 1 &&
          amberLine[0].pts.every(([x]) => near(x, m.s, 1e-12)) &&
          amberDots.length === 2 &&
          near(amberDots[0].y, m.s, 1e-12) &&
          near(amberDots[1].y, 1 - m.s, 1e-12)
      );
    }
  }
  // the extremes of the span: the flat drift at σ = 0 and the tall one at σ = 2
  for (const v of [0, 0.05, 0.2, 0.7, 1.25, 1.95, 2]) {
    await input('#sigmaRange', v);
    const f = await stripFrame();
    legendChecks(`${lang} σ = ${v} desktop`, f);
    // the tick labels are decimals that are the values themselves, inside the canvas
    const g2 = mulN(gridN(v, 20), gridN(v, 20)),
      values = v === 0 ? [intN(0)] : [intN(0), g2, subN(intN(0), divN(g2, addN(ONE, g2)))],
      ticks = f.plot.ticks.filter((x) => /^[−-]?\d+(?:\.\d+)?$/.test(x.text) && x.text !== '1');
    check(
      `${lang} σ = ${v}: the tick labels of the drift plot are the values themselves and none is cut off`,
      ticks.length >= (v === 0 ? 1 : 2) && ticks.every((x) => x.l >= 0 && values.some((q) => cmpN(q, decimalN(x.text.replace('-', '−'))) === 0)) && f.plot.ticks.every((x) => x.l >= 0 && x.r <= f.plot.w + 0.5 && !/≈/.test(x.text)),
      JSON.stringify(f.plot.ticks)
    );
  }
}

/* ---------- narrow pages, the whole-lab embeds, cited figures and stills ---------- */
const FIGURE_TEXT = {
  [PAST]: ['s = 0', '1.0000'],
  [PRESENT]: ['α = 1/2', '1.0000'],
  [FUTURE]: ['1/2 + 1/2 = 1', '1.0000', '65.55°'],
  [THIRD]: ['0.0000'],
  [LOOP]: ['1/2', '0′']
};
// a cited figure hides the deck, the evidence and the strips: its note names only the stage, the HUD and the tour bar
const HIDDEN_WORDS = /条带|小图|曲线|横轴|滑块|读数|左栏|右栏|strip|plot|chart|curve\b|slider|readout|panel/i;
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
    const btn = document.querySelector('#mobileLensBtn'),
      tour = document.querySelector('#tour'),
      note = document.querySelector('#tour .tour-note');
    return { btn: box('#mobileLensBtn'), stage: box('#stage'), tour: box('#tour'), row: [box('#prevBtn'), box('#tour .what b'), box('#nextBtn'), ...(note && note.getClientRects().length ? [box('#tour .tour-note')] : [])], clipped: btn.scrollWidth > btn.clientWidth + 0.5, over: tour.scrollWidth > tour.clientWidth + 0.5, vw: innerWidth, vh: innerHeight, docW: document.documentElement.scrollWidth, text: btn.innerText.trim() };
  });
  const meet = (a, b) => a.l < b.r - 0.5 && b.l < a.r - 0.5 && a.t < b.b - 0.5 && b.t < a.b - 0.5;
  check(
    label + ': the mirror lens button fits the tour bar right under the stage, inside the first screen, no overlap and no overflow',
    (await p.locator('#mobileLensBtn').isVisible()) && geo.btn.t >= geo.stage.b - 0.5 && geo.btn.b <= geo.vh && geo.btn.l >= geo.tour.l - 0.5 && geo.btn.r <= geo.tour.r + 0.5 && geo.row.every((b) => !meet(geo.btn, b)) && !geo.clipped && !geo.over && geo.docW <= geo.vw && geo.text === (lang === 'zh' ? '透镜' : 'LENS'),
    JSON.stringify(geo)
  );
  const before = await state(p),
    pressed = () => Promise.all(['#mobileLensBtn', '#lensToggleBtn'].map((s) => p.getAttribute(s, 'aria-pressed')));
  await p.click('#mobileLensBtn');
  await settle(p);
  const on = await state(p);
  check(label + ': the mirror button flips the lens, syncs both switches and keeps the experiment', before.lens === 0 && on.lens === 1 && same(await pressed(), ['true', 'true']) && ['t', 'alpha', 'sigma', 'tau', 'scene', 'preset'].every((k) => on[k] === before[k]));
  await layout(p, label + ' cross-domain lens from the mirror button');
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
          return { stage: b('#stage').bottom, stageH: b('#stage').height, tour: b('#tour').bottom, lens: b('#mobileLensBtn').bottom, vh: innerHeight };
        });
        check(`${lang}/390×844/${id}: the stage (≥ 440 px) and the whole tour bar with its lens button end inside the first screen`, (await p.locator('#mobileLensBtn').isVisible()) && fold.stageH >= 440 && fold.stage <= fold.vh && fold.tour <= fold.vh && fold.lens <= fold.vh, JSON.stringify(fold));
        legendChecks(`${lang}/390/${id}`, await stripFrame(p));
        // the fold also holds under the other lens and in free play
        await p.click('#mobileLensBtn');
        await settle(p);
        const alt = await p.evaluate(() => [document.querySelector('#stage').getBoundingClientRect().bottom, document.querySelector('#tour').getBoundingClientRect().bottom, innerHeight]);
        check(`${lang}/390×844/${id}: the fold holds under the cross-domain lens`, alt[0] <= alt[2] && alt[1] <= alt[2], JSON.stringify(alt));
        await p.click('#mobileLensBtn');
        await settle(p);
      } else {
        check(`${lang}/${width}/${id} a cited figure hides the strips, the deck and the evidence`, (await p.locator('.strip').isHidden()) && (await p.locator('#rail').isHidden()) && (await p.locator('#evidence').isHidden()) && (await p.locator('.tour .tour-note').isVisible()) && (await p.locator('#mobileLensBtn').isHidden()));
        const note = await p.locator('.tour .tour-note').innerText();
        check(`${lang}/${width}/${id} the figure note states the numbers of the still`, FIGURE_TEXT[id].every((x) => note.includes(x)), note);
        check(`${lang}/${width}/${id} the figure note names nothing the figure hides and has no sub- or superscripts`, !HIDDEN_WORDS.test(note) && (await p.locator('.tour .tour-note sub, .tour .tour-note sup').count()) === 0, note);
        const bar = await p.evaluate(() => {
          const n = document.querySelector('.tour .tour-note');
          return [n.scrollHeight, n.clientHeight];
        });
        check(`${lang}/${width}/${id} the figure note fits its two lines`, bar[0] <= bar[1] + 1, JSON.stringify(bar));
      }
      await p.locator('.tour [data-tour="next"]').click();
      await settle(p);
    }
    check(`${lang}/${width} ▶ visits all five cards`, visited.size === 5 && IDS.every((id) => visited.has(id)), JSON.stringify([...visited]));
    if (!figure) {
      await mirrorLens(p, lang, `${lang}/390`);
      // free play on a phone: the short note, still inside the first screen
      for (const [sel, v] of [
        ['#alphaRange', 0.3],
        ['#sigmaRange', 0],
        ['#ctxRange', 0],
        ['#sRange', 0.2]
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
      // every regime of a cited figure: the note follows the frame and still names only what is drawn
      for (const [id, acts] of [
        [PRESENT, [['#now', 0.2], ['#now', 0.9], ['#sigmaRange', 0]]],
        [PAST, [['#now', 0.4]]],
        [FUTURE, [['#now', 0], ['#now', 0.3], ['#now', 0.5], ['#now', 0.8], ['#ctxRange', 0]]],
        [THIRD, [['#now', 0], ['#now', 1]]],
        [LOOP, [['#now', 0], ['#now', 0.3], ['#now', 1], ['#now', 2]]]
      ]) {
        for (const [sel, v] of acts) {
          await pick(id, p);
          await input(sel, v, p);
          const t = await regimeTexts(p),
            m = await state(p);
          const honest =
            m.scene === 'present'
              ? m.regime === 'zero'
                ? !/> 1|< 1/.test(t.tour) && t.tour.includes('σ = 0')
                : m.regime === 'out'
                  ? t.tour.includes('> 1')
                  : t.tour.includes('< 1')
              : m.scene === 'past'
                ? !/κ = 1\.0000/.test(t.tour)
                : m.scene === 'future'
                  ? m.regime === 'closed' || !/65\.55/.test(t.tour)
                  : m.scene === 'third'
                    ? t.tour.includes('0.0000')
                    : m.regime !== 'landed' || /s′ = 0\.0000/.test(t.tour);
          check(`${lang}/${width} figure ${id} after ${sel} = ${v} (${m.regime}): the note is true to the frame and names only what is drawn`, honest && t.note === t.tour && !HIDDEN_WORDS.test(t.tour), JSON.stringify(t));
          await layout(p, `${lang}/${width} figure ${id} ${sel} = ${v}`, true);
        }
      }
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
  // a chapter embed that plays: the card starts at its beginning once it is in view and parks on its still
  {
    const p = await T.open(BOOK, ID, `?embed=1&preset=${PRESENT}&lang=${lang}`, { viewport: { width: 740, height: 500 }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
    check(
      `${lang} a cited figure plays α from 0 up to 1/2 and parks there`,
      await until(p, () => {
        const s = window.CAUSAL_TRIAD_DEBUG && window.CAUSAL_TRIAD_DEBUG.state;
        return s && !s.playing && s.alpha === 0.5 && s.preset === 'present-half-midpoint-self-duality';
      }, null, 150000)
    );
    await p.context().close();
  }
  for (const id of IDS) {
    const p = await openStill(T, BOOK, ID, id, lang);
    const m = await state(p);
    await verifyCard(p, id);
    check(`still ${lang}/${id} parks on the declared frame, without handle and mirror button`, !m.playing && near(m.clock, CARDS[id].still, 1e-12) && near(Number(await p.getAttribute(`[data-preset="${id}"]`, 'data-still')), CARDS[id].still, 1e-12) && (await p.locator('#stageHandle').isHidden()) && (await p.locator('#mobileLensBtn').isHidden()));
    const t = await regimeTexts(p);
    const want = {
      [PAST]: () => f4(m.kappa) === '1.0000' && t.big.includes('1.0000'),
      [PRESENT]: () => f4(m.step.norm2) === '1.0000' && f4(m.steps.ito.norm2) === '2.0000' && f4(m.steps.back.norm2) === '0.5000' && t.big.includes('1.0000'),
      [FUTURE]: () => f4(m.s) === '1.0000' && f4(m.kHalfNext) === '0.0000' && f2(m.refr.deg) === '65.55' && t.sub.includes('65.55'),
      [THIRD]: () => f4(m.s) === '0.8000' && f4(Math.abs(m.leanInstances.tetra.alternating)) === '0.0000' && t.big.includes('0.0000'),
      [LOOP]: () => m.n === 3 && f4(m.s) === '0.5000' && t.big.includes('B3')
    }[id];
    check(`still ${lang}/${id} shows the numbers of its caption`, want(), JSON.stringify(t));
    await p.context().close();
  }
}
check('permanent dark console in both system schemes', !paletteMutations.length && paletteDocuments.every((x) => x.absent) && paletteDocuments.some((x) => x.dark) && paletteDocuments.some((x) => !x.dark));
check('zero console warnings', browserWarnings.length === 0, browserWarnings.slice(0, 3).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('zero browser or request errors', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));
await T.finish();
