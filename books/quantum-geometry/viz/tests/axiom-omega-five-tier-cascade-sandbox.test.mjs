import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  session,
  stageFirstChecks,
  settle,
  openStill,
  playsAfter,
  until,
  stageView,
  cjkLeftovers,
  capitalGreek,
  overflowX,
  labelOverlaps,
  solidPixels
} from '../../../../tools/node/viz-testkit.mjs';
import { ROOT } from '../../../../tools/node/viz-common.mjs';

const BOOK = 'quantum-geometry';
const ID = 'axiom-omega-five-tier-cascade-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const THEORY = 'ch39-s25-axiom-omega-five-tier-deduction-cascade.html#sec-ch39-axiom-omega-five-tier-deduction-cascade';
const CHAPTER = 'ch39-s25-axiom-omega-five-tier-deduction-cascade.md';
const SECTION = '39.2';
const CARDS = {
  'tier1-numbers-arc-calculus': { tier: 1, rail: 60, play: false },
  'tier2-dottie-dual-relativity': { tier: 2, rail: 0.5, rsr: 0.36, play: false },
  'tier3-afgut-weinberg-three-eighths': { tier: 3, rail: 3, play: false },
  'tier4-prime-sagitta-critical-ridge': { tier: 4, rail: 4, sigma: 0.5, play: false },
  'tier5-geodesic-mind-bridge-erasure': { tier: 5, rail: 'end', beats: 4, play: true }
};
const IDS = Object.keys(CARDS);
const DEFAULT = 'tier2-dottie-dual-relativity';
const GIDS = [
  'D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint',
  'D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound',
  'D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null',
  'D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation',
  'D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification',
  'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift',
  'D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least',
  'D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product',
  'D5/S3/Weil/ZetaBridge/RightHalfStripRiemannReduction.golden_right_half_strip_implies_rh',
  'D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy',
  'D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently',
  'D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package'
];
const OPEN = [
  'ch22-s04-critical-line-and-rh.html#conj-riemann-hypothesis',
  'ch34-s25-generations-and-quantitative-boundary.html#prob-ch34-sm-generations-and-couplings',
  'ch34-s24-interaction-sign-and-sagitta-composition.html#prob-ch34-gravity-dynamics-and-coupling',
  'ch39-s22-ternion-field-transformer-and-rational-rotor-dynamics.html#prob-ch39-tft-scale-and-seams'
];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const f8 = (v) => (Math.abs(v) < 5e-9 ? 0 : v).toFixed(8);

/* ---------- independent mathematics, written here and never calling the page ---------- */
const DEG = Math.PI / 180;
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));
const sub = (a, b) => a.map((x, i) => x - b[i]);
const scale = (a, k) => a.map((x) => x * k);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
/** Determinant by Gaussian elimination with partial pivoting. */
function detGauss(M) {
  const A = M.map((r) => r.slice()),
    n = A.length;
  let d = 1;
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    if (Math.abs(A[p][c]) < 1e-300) return 0;
    if (p !== c) {
      [A[p], A[c]] = [A[c], A[p]];
      d = -d;
    }
    d *= A[c][c];
    for (let r = c + 1; r < n; r++) {
      const f = A[r][c] / A[c][c];
      for (let k = c; k < n; k++) A[r][k] -= f * A[c][k];
    }
  }
  return d;
}
/** Tier 1: three points of a great circle of S³ (unit quaternions), the kernel (1 + ⟨x, y⟩)/2 = cos²(d/2). */
function gramDet(epsDeg) {
  const e = epsDeg * DEG,
    X = [0, 1, 2].map((i) => [Math.cos(i * e), 0, Math.sin(i * e), 0]);
  return detGauss(X.map((a) => X.map((b) => (1 + dot(a, b)) / 2)));
}
/** θ* by bisection on cos t − t over (0, 1). */
function bisectFixedPoint() {
  let lo = 0,
    hi = 1;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (Math.cos(mid) - mid > 0) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}
const TS = bisectFixedPoint();
/** Tier 3: one generation from its hypercharges: (SU(2) dimension, colours, 6Y). Traces are kept in 36ths. */
function weinberg() {
  const FIELDS = [
    [2, 3, 1],
    [2, 1, -3],
    [1, 3, 4],
    [1, 3, -2],
    [1, 1, -6]
  ];
  let t36 = 0,
    q36 = 0;
  for (const [dim, colours, y6] of FIELDS) {
    const t3s = dim === 2 ? [3, -3] : [0]; // 6 T₃
    for (const t6 of t3s) {
      const q6 = t6 + y6; // 6 Q = 6 T₃ + 6 Y
      t36 += colours * t6 * t6;
      q36 += colours * q6 * q6;
    }
  }
  return { t36, q36 };
}
const isPrime = (n) => {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
};
const PRIMES97 = Array.from({ length: 98 }, (_, i) => i).filter(isPrime);
/** 1 − cos x by its Taylor series (x ≤ 1), independent of the page's 2 sin²(x/2). */
function versSeries(x) {
  let term = (x * x) / 2,
    s = 0;
  for (let k = 1; k < 12; k++) {
    s += term;
    term *= -(x * x) / ((2 * k + 1) * (2 * k + 2));
  }
  return s;
}
/* tier 5 in unit quaternions [w, x, y, z] */
const qmul = (a, b) => [
  a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
  a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
  a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
  a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
];
const qconj = (a) => [a[0], -a[1], -a[2], -a[3]];
const qrot = (axis, th) => {
  const n = scale(axis, 1 / norm(axis));
  return [Math.cos(th / 2), ...scale(n, Math.sin(th / 2))];
};
const toMRP = (q) => (q[0] >= 0 ? scale(q.slice(1), 1 / (1 + q[0])) : scale(q.slice(1), -1 / (1 - q[0])));
const fromMRP = (s) => {
  const s2 = dot(s, s);
  return [(1 - s2) / (1 + s2), ...scale(s, 2 / (1 + s2))];
};
const pointerOf = (q) => qmul(qmul(q, [0, 0, 0, 1]), qconj(q)).slice(1);
const qheap = (x, y, z) => qmul(qmul(x, qconj(y)), z);
/** max(D₊, D₋) of the two-denominator product of the rational ternions a, b (the formulas of §37.1). */
const dmax = (a, b) => Math.max(1 + dot(a, a) * dot(b, b) - 2 * dot(a, b), dot(a.map((x, i) => x + b[i]), a.map((x, i) => x + b[i])));
function geodesic(beats) {
  const step = (120 * DEG) / beats,
    q = [[1, 0, 0, 0], qrot([1, 0, 0], step)];
  for (let i = 1; i < beats; i++) q.push(qheap(q[i], q[i - 1], q[i]));
  const ps = q.map(pointerOf);
  let sGeo = 0;
  for (let i = 0; i < beats; i++) sGeo += 1 - dot(ps[i], ps[i + 1]);
  return { q, ps, sGeo, sJump: 1 - dot(ps[0], ps[beats]), step };
}
function triangle(a, b, c) {
  const S = 1 + dot(a, b) + dot(b, c) + dot(c, a),
    D = dot(a, cross(b, c));
  return { S, D, lhs: S * S + D * D, rhs: 2 * (1 + dot(a, b)) * (1 + dot(b, c)) * (1 + dot(c, a)) };
}

const T = await session();
const { page, check } = T;
// headless Chromium reports driver diagnostics as warnings; they are harmless, every other warning is a failure
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
// the lab is a permanent night console: record every attempt to write data-tr-palette, from before page scripts run
const paletteMutations = [],
  paletteDocuments = [];
async function watchPalette(context) {
  await context.exposeBinding('__omegaPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__omegaPaletteAudit({ kind: 'mutation', value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__omegaPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined, dark: matchMedia('(prefers-color-scheme: dark)').matches }).catch(() => {}), { once: true });
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

// the shared gate, with the lit-solid checks at the thresholds of this page (opaque share ≥ 14 %, spread ≥ 0.055)
await stageFirstChecks(T, BOOK, ID, { solid: { minShare: 0.14, minSpread: 0.055 } });

/* ---------- sources, registry, dependencies and the chapter ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
const suite = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
const registry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8'));
const entry = (registry.visualizations || []).find((v) => v.id === ID) || {};
const deps = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'tests', 'dependencies.json'), 'utf8'));
const chapters = Object.fromEntries(['zh', 'en'].map((l) => [l, fs.readFileSync(path.join(ROOT, 'books', BOOK, l, CHAPTER), 'utf8')]));
// forbidden words are kept as code points so that this suite itself carries no such identifier
const forbidden = [
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
  [99, 104, 97, 116, 98, 111, 116]
].map((codes) => String.fromCharCode(...codes));
const identifiers = new RegExp(`\\b(?:${forbidden.join('|')}|${String.fromCharCode(103, 112, 116)}-?\\d)\\b`, 'i');
const shortAcronym = new RegExp(`\\b${String.fromCharCode(65, 73)}\\b`);
const cjkTerms = new RegExp([[22823, 27169, 22411], [26234, 33021, 20307], [20154, 24037, 26234, 33021]].map((c) => String.fromCharCode(...c)).join('|'));
const literalColour = /#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i;
for (const [file, src] of Object.entries(sources)) {
  check(`source ${file}: no literal colour and no palette switch`, !literalColour.test(src) && !/\btrPalette\b|data-tr-palette|[?&]theme=/.test(src));
  check(`source ${file}: no model, vendor or tool identifiers`, !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src));
}
check('the suite and the registry entry carry no reserved identifiers', [suite, JSON.stringify(entry)].every((src) => !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src)));
check(
  'registration: live, chapter 39 §39.2, added 2026-11-19, five cards, twelve Lean theorems, theory link',
  entry.status === 'live' && entry.chapter === 39 && entry.section === SECTION && entry.added === '2026-11-19' && entry.code === 'OMEGA//CASCADE' &&
    same(entry.presets, IDS) && same((entry.lean || []).map((x) => x.gid), GIDS) &&
    entry.theory[0].href === '../zh/' + THEORY && entry.theory[0].href_en === '../en/' + THEORY &&
    IDS.every((c) => entry.preset_titles[c] && entry.preset_titles[c].zh && entry.preset_titles[c].en)
);
check('the suite is declared in dependencies.json with the chapter it reads', Array.isArray(deps.suites[ID + '.test.mjs']) && ['zh', 'en'].every((l) => deps.suites[ID + '.test.mjs'].includes(`books/${BOOK}/${l}/${CHAPTER}`)));
// every value the page prints for a card is a value of the §39.2 example in both languages of the chapter
const AUDIT = ['0.09375000', '0.50000000', '0.73908513', '0.54624683', '0.69282032', '1.00000000', '0.37500000', '0.61588148', '0.21171004', '0.53589838', '1.50000000', '0.00000000'];
check('the chapter (zh, en) states every audited value of the page', AUDIT.every((v) => chapters.zh.includes(v) && chapters.en.includes(v)));
check('the chapter (zh, en) cites the twelve theorems the page shows', GIDS.every((g) => chapters.zh.includes(g) && chapters.en.includes(g)));
check('the chapter (zh, en) names the four open problems the page names', ['conj-riemann-hypothesis', 'prob-ch34-sm-generations-and-couplings', 'prob-ch34-gravity-dynamics-and-coupling', 'prob-ch39-tft-scale-and-seams'].every((id) => chapters.zh.includes(id) && chapters.en.includes(id)));

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.OMEGA_CASCADE_DEBUG.state);
const calcOn = (s, p = page) => p.evaluate((x) => window.OMEGA_CASCADE_DEBUG.calc(x), s);
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
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  await settle(p);
  await until(p, (id) => { const s = window.OMEGA_CASCADE_DEBUG.state; return s.preset === id && !s.blending; }, card);
  await pause(p);
  // a card that plays is read on the frame it declares for its still
  if (CARDS[card].play) await seek(await cardStill(card, p), p);
}
async function seek(t, p = page) {
  await p.locator('#now').evaluate((el, v) => {
    el.value = String(v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, t);
  await settle(p);
}
const railMax = async (p = page) => Number(await p.getAttribute('#now', 'max'));
async function cardStill(card, p = page) {
  const v = await p.getAttribute(`[data-preset="${card}"]`, 'data-still');
  if (v === 'end') return railMax(p);
  return v == null || v === '' ? NaN : Number(v);
}
const textOf = async (id, p = page) => (await p.locator('#' + id).innerText()).replaceAll('−', '-');
async function layout(p, label, figure = false) {
  const view = await stageView(p, '#stage', figure);
  const issues = [...view.layout, ...view.hud, ...(await labelOverlaps(p, '.stage .tag', 0)), ...(await capitalGreek(p))];
  check(label + ' framing and legible labels', !issues.length && (await overflowX(p)) === 0, JSON.stringify(issues));
}

/* ---------- the claims of the page, against the mathematics above ---------- */
function verifyTier1(t1, label) {
  const det = gramDet(t1.eps),
    e = t1.eps * DEG;
  check(label + ' T1: det G₃ by elimination on S³, closed form, (6V)² of the tetrahedron, unit vectors with the kernel as inner product',
    near(t1.det, det, 1e-12) && near(t1.closed, 0.5 * Math.sin(e) ** 2 * (1 - Math.cos(e)) ** 2, 1e-12) && near(det, t1.closed, 1e-12) &&
      near((6 * t1.tetra) ** 2, det, 1e-12) && near(t1.volume ** 2, det, 1e-12) &&
      t1.vecs.every((v) => near(norm(v), 1, 1e-12)) &&
      t1.vecs.every((a, i) => t1.vecs.every((b, j) => near(dot(a, b), Math.cos(((i - j) * e) / 2) ** 2, 1e-12))));
  check(label + ' T1: step sagitta 1 − cos ε', near(t1.vers, 1 - Math.cos(e), 1e-12));
  let half = 0,
    one = 0;
  const M = t1.arc.M;
  for (let i = 0; i < M; i++) {
    half += 1 - Math.cos(Math.sqrt(1 / M));
    one += 1 - Math.cos(1 / M);
  }
  check(label + ' T1: arc sagitta over M steps locks at ½ for α = ½ and vanishes for α = 1',
    M === 4096 && near(t1.arc.half, half, 1e-9) && near(t1.arc.one, one, 1e-12) && Math.abs(half - 0.5) < 2e-5 && one < 2e-4);
}
function verifyTier2(t2, label) {
  const { beta, rsr } = t2;
  const want = [Math.sqrt((1 - rsr) * (1 - beta * beta)), Math.sqrt(1 - rsr) * beta, Math.sqrt(rsr)];
  check(label + ' T2: the budget point lies on the unit sphere and its squares are the three shares',
    want.every((x, i) => near(t2.point[i], x, 1e-12)) && near(dot(t2.point, t2.point), 1, 1e-12) && near(t2.sum, 1, 1e-12) &&
      near(t2.dtau2, want[0] ** 2, 1e-12) && near(t2.kin2, want[1] ** 2, 1e-12) && near(t2.grav2, rsr, 1e-12) && near(t2.dtau, want[0], 1e-12));
  check(label + ' T2: θ* by bisection and cos²θ*', near(t2.thetaStar, TS, 1e-12) && near(t2.cos2Star, Math.cos(TS) ** 2, 1e-12) && t2.thetaStar > 0 && t2.thetaStar < 1);
}
function verifyTier3(t3, label) {
  const { t36, q36 } = weinberg(),
    L = t3.ledger;
  check(label + ' T3: Tr T₃² = 2, Tr Q² = 16/3 and the ratio 3/8 from the hypercharges of one generation',
    t36 === 72 && q36 === 192 && L.trT.n * 36 === t36 * L.trT.d && L.trQ.n * 36 === q36 * L.trQ.d &&
      same(L.ratio, { n: 3, d: 8 }) && L.value === 0.375);
  const { V, F, edges, diagonals } = t3.frame,
    N = t3.N;
  const key = (a, b) => Math.min(a, b) + '-' + Math.max(a, b);
  const edgeSet = new Set(edges.map(([a, b]) => key(a, b)));
  const faceCount = new Map();
  for (const f of F) for (let i = 0; i < 3; i++) faceCount.set(key(f[i], f[(i + 1) % 3]), (faceCount.get(key(f[i], f[(i + 1) % 3])) || 0) + 1);
  const convex = N === 3 || F.every((f) => {
    const n = cross(sub(V[f[1]], V[f[0]]), sub(V[f[2]], V[f[0]]));
    const sides = V.map((p, i) => (f.includes(i) ? 0 : Math.sign(dot(n, sub(p, V[f[0]])))));
    return sides.every((s) => s <= 0) || sides.every((s) => s >= 0);
  });
  let missing = 0;
  for (let a = 0; a < N; a++) for (let b = a + 1; b < N; b++) if (!edgeSet.has(key(a, b)) && !diagonals.some((d) => key(d[0], d[1]) === key(a, b))) missing++;
  check(label + ' T3: a convex triangulation with 3N − 6 edges; the diagonals complete K_N; ΔE(N) = (N − 3)(N − 4)/2',
    V.length === N && V.every((p) => near(norm(p), 1, 1e-12)) && F.every((f) => f.length === 3) && edges.length === 3 * N - 6 &&
      (N === 3 || (V.length - edges.length + F.length === 2 && [...faceCount.values()].every((c) => c === 2))) && convex && missing === 0 &&
      diagonals.length === ((N - 3) * (N - 4)) / 2 && t3.dE === diagonals.length && t3.formula === t3.dE && t3.pairs === (N * (N - 1)) / 2 &&
      same(t3.table, [[3, 0], [4, 0], [5, 1], [6, 3]]));
}
function verifyTier4(t4, label) {
  const ps = PRIMES97.slice(0, t4.count);
  const total = ps.reduce((s, p) => s + versSeries(p ** -t4.sigma), 0),
    one = ps.reduce((s, p) => s + versSeries(1 / p), 0),
    lead = 0.5 * ps.reduce((s, p) => s + p ** (-2 * t4.sigma), 0);
  check(label + ' T4: primes by trial division, the sagitta staircase and its σ = 1 companion',
    same(t4.primes, ps) && t4.P === ps.at(-1) && near(t4.total, total, 1e-12) && near(t4.totalOne, one, 1e-12) && near(t4.lead, lead, 1e-12) &&
      t4.steps.every((v, i) => near(v, versSeries(ps[i] ** -t4.sigma), 1e-14)));
  check(label + ' T4: the five primes up to 11 at σ = ½ and σ = 1', f8(t4.eleven.half) === '0.61588148' && f8(t4.eleven.one) === '0.21171004');
}
let ceilingRef = null;
function verifyCeiling(t4) {
  if (ceilingRef == null) {
    const N = 1e6,
      comp = new Uint8Array(N + 1);
    ceilingRef = 0;
    for (let i = 2; i <= N; i++) {
      if (comp[i]) continue;
      ceilingRef += versSeries(1 / i);
      for (let j = i * i; j <= N; j += i) comp[j] = 1;
    }
  }
  check('T4: the cyan ring is the σ = 1 total over p ≤ 10⁶ (0.2229392…, the chapter’s 0.22293927 within the tail)',
    near(t4.ceiling, ceilingRef, 1e-11) && Math.abs(t4.ceiling - 0.22293927) < 5e-8 && t4.ceiling < 0.22612371);
}
function verifyTier5(t5, label) {
  const g = geodesic(t5.beats);
  check(label + ' T5: the heap geodesic σ_{t+1} = [σ_t, σ_{t−1}, σ_t] matches the quaternion law',
    t5.sigmas.length === t5.beats + 1 && t5.sigmas.every((s, i) => sub(s, toMRP(g.q[i])).every((x) => Math.abs(x) < 1e-12)) &&
      t5.pointers.every((p, i) => sub(p, g.ps[i]).every((x) => Math.abs(x) < 1e-12)) &&
      near(t5.sigmas[t5.beats][0], Math.tan(30 * DEG), 1e-12));
  check(label + ' T5: geodesic sagitta N(1 − cos(120°/N)) below the jump 1 − cos 120° = 1.5',
    near(t5.sagGeo, g.sGeo, 1e-12) && near(g.sGeo, t5.beats * (1 - Math.cos(g.step)), 1e-12) && near(t5.sagJump, 1.5, 1e-12) && t5.sagGeo < t5.sagJump);
  // the products the page performs: the heap steps, the tilt of y, the tilted heap and the exact heap
  const m = t5.sigmas,
    y = t5.bridge.y,
    z = t5.zNow,
    tilt = t5.tilt * DEG;
  const pairs = [];
  for (let i = 1; i < t5.beats; i++) pairs.push([m[i], scale(m[i - 1], -1)], [toMRP(qmul(fromMRP(m[i]), qconj(fromMRP(m[i - 1])))), m[i]]);
  const w = Math.tan(tilt / 4) === 0 ? [0, 0, 0] : [Math.tan(tilt / 4), 0, 0];
  const yq = fromMRP(y),
    yeq = qmul(yq, qrot([1, 0, 0], tilt)),
    ye = toMRP(yeq);
  pairs.push([y, w], [y, scale(ye, -1)], [toMRP(qmul(yq, qconj(yeq))), z], [y, scale(y, -1)], [[0, 0, 0], z]);
  const dMin = Math.min(...pairs.map(([a, b]) => dmax(a, b)));
  check(label + ' T5: every two-denominator product picks max(D₊, D₋) ≥ 0.5', near(t5.dMin, dMin, 1e-9) && t5.dMin >= 0.5);
  const composite = toMRP(qheap(yq, yeq, fromMRP(z)));
  check(label + ' T5: [y, y_ε, z] by quaternions, its residue, and [y, y, z] = z exactly',
    sub(t5.bridge.composite, composite).every((x) => Math.abs(x) < 1e-12) && near(t5.bridge.residue, norm(sub(composite, z)), 1e-12) &&
      t5.bridge.exactResidue === 0 && same(t5.bridge.exact, z) && (t5.tilt === 0 ? t5.bridge.residue === 0 : t5.bridge.residue > 0));
}
function verifyInstances(m, I, label) {
  check(label + ' instance: θ* and its residual', near(I.fixedPoint.thetaStar, TS, 1e-12) && I.fixedPoint.residual < 1e-12);
  check(label + ' instance: record time with both Fubini–Study angles π/4 and the bound πħ/(4E) = 1 = τ',
    near(I.recordTime.angle0, Math.PI / 4, 1e-12) && near(I.recordTime.angle1, Math.PI / 4, 1e-12) && near(I.recordTime.bound, 1, 1e-12) && I.recordTime.tau === 1 && I.recordTime.holds);
  const b = m.t2.beta;
  check(label + ' instance: the Minkowski form of (1, β) is (dτ/dt)² at r_s/r = 0', near(I.minkowski.form, 1 - b * b, 1e-12) && near(I.minkowski.flat, 1 - b * b, 1e-12));
  check(label + ' instance: cosh² r − sinh² r = 1 and 1/cosh r = √(1 − β²) at r = artanh β',
    near(I.bogoliubov.identity, 1, 1e-12) && near(I.bogoliubov.factor, Math.sqrt(1 - b * b), 1e-12) && near(Math.tanh(I.bogoliubov.rapidity), b, 1e-12));
  const N = m.t3.N;
  check(label + ' instance: anchored loop phases on K_N unchanged by a gauge, c = m − n + 1',
    I.anchored.n === N && I.anchored.m === (N * (N - 1)) / 2 && I.anchored.c === I.anchored.m - N + 1 && I.anchored.c + 0 + N === I.anchored.m + 1 && I.anchored.gap < 1e-9);
  const th = I.lift.theta * DEG;
  check(label + ' instance: the half-angle lift squares to the base point; one full turn lifts to −1',
    near(I.lift.z[0] ** 2 - I.lift.z[1] ** 2, Math.cos(th), 1e-12) && near(2 * I.lift.z[0] * I.lift.z[1], Math.sin(th), 1e-12) &&
      near(I.lift.fullTurn[0], -1, 1e-12) && Math.abs(I.lift.fullTurn[1]) < 1e-12 && near(I.lift.theta, m.t5.done * m.t5.step, 1e-9));
  // the Schur complement, solved here by Cramer's rule on the Gram matrix of the rotors 2, 3 | 5, 7
  const thp = [2, 3, 5, 7].map((p) => p ** -m.t4.sigma),
    K = thp.map((a) => thp.map((c) => (1 + Math.cos(a - c)) / 2));
  const x = [1, -1],
    rhs = [-(K[0][2] * x[0] + K[1][2] * x[1]), -(K[0][3] * x[0] + K[1][3] * x[1])];
  const dC = K[2][2] * K[3][3] - K[2][3] * K[3][2],
    yv = [(rhs[0] * K[3][3] - K[2][3] * rhs[1]) / dC, (K[2][2] * rhs[1] - rhs[0] * K[3][2]) / dC];
  const zv = [x[0], x[1], yv[0], yv[1]];
  let q = 0;
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) q += zv[i] * K[i][j] * zv[j];
  check(label + ' instance: Schur minimum equals x*Sx and no move of y does better',
    K.every((r, i) => r.every((v, j) => near(v, I.schur.K[i][j], 1e-12))) && near(I.schur.y[0], yv[0], 1e-9) && near(I.schur.y[1], yv[1], 1e-9) &&
      near(I.schur.min, q, 1e-12) && near(I.schur.xSx, q, 1e-12) && I.schur.worst >= -1e-12);
  const euler = PRIMES97.slice(0, m.t4.count).reduce((a, p) => a / (1 - 1 / (p * p)), 1);
  check(label + ' instance: truncated Euler product at s = 2 below π²/6', I.euler.P === m.t4.P && near(I.euler.product, euler, 1e-12) && I.euler.gap > 0 && near(I.euler.gap, Math.PI ** 2 / 6 - euler, 1e-12));
  const ps = m.t5.pointers,
    line = triangle(ps[0], ps[Math.floor(m.t5.beats / 2)], ps[m.t5.beats]),
    bridge = triangle(ps[0], m.t5.bridge.anchor, ps[m.t5.beats]);
  check(label + ' instance: shortest-gate triangles: S² + D² = 2(1 + a·b)(1 + b·c)(1 + c·a), D = 0 on one great circle only',
    near(I.holonomy.line.lhs, line.rhs, 1e-12) && near(I.holonomy.line.rhs, line.rhs, 1e-12) && Math.abs(I.holonomy.line.D) < 1e-12 &&
      near(I.holonomy.bridge.S, bridge.S, 1e-12) && near(I.holonomy.bridge.D, bridge.D, 1e-12) && near(bridge.lhs, bridge.rhs, 1e-12) && Math.abs(bridge.D) > 1e-3 && bridge.rhs > 0);
  // the observable Krylov ranks of (Tᵀ)^k e₃, T one beat about e₁
  const beat = qrot([1, 0, 0], (120 * DEG) / m.t5.beats),
    back = qconj(beat);
  const gens = [[0, 0, 1]];
  for (let k = 1; k <= 7; k++) gens.push(qmul(qmul(back, [0, ...gens[k - 1]]), beat).slice(1));
  const rank = (vs) => (Math.abs(detGauss([[...vs[0]], [...(vs[1] || [0, 0, 0])], [...(vs[2] || [0, 0, 0])]])) > 1e-9 ? 3 : vs.length > 1 && vs.some((v, i) => i && norm(cross(vs[0], v)) > 1e-9) ? 2 : 1);
  const dims = gens.map((_, m2) => {
    const vs = gens.slice(0, m2 + 1);
    let r = rank(vs.slice(0, 1));
    for (let i = 0; i < vs.length; i++) for (let j = i + 1; j < vs.length; j++) {
      if (norm(cross(vs[i], vs[j])) > 1e-9) r = Math.max(r, 2);
      for (let k = j + 1; k < vs.length; k++) if (Math.abs(dot(vs[i], cross(vs[j], vs[k]))) > 1e-9) r = 3;
    }
    return r;
  });
  check(label + ' instance: observable Krylov dimensions stop at the first repeat', same(I.krylov.dims, dims) && same(dims, [1, 2, 2, 2, 2, 2, 2, 2]));
  check(label + ' instance: the diagonal of the five tiers escapes; a one-point table does not', I.lawvere.escapes === true && I.lawvere.fixed === true && same(I.lawvere.diag, [false, false, false, false, false]));
}
function verifyAll(m, label) {
  verifyTier1(m.t1, label);
  verifyTier2(m.t2, label);
  verifyTier3(m.t3, label);
  verifyTier4(m.t4, label);
  verifyTier5(m.t5, label);
  verifyInstances(m, m.leanInstances, label);
}
async function verifyCard(p, id) {
  const m = await state(p),
    c = CARDS[id];
  const railWant = c.rail === 'end' ? m.max : c.rail;
  check(id + ' tier, rail, parameters and preset',
    m.preset === id && m.tier === c.tier && m.view === 'focus' && near(m.rail[c.tier], railWant, 1e-9) &&
      (c.rsr == null || m.rsr === c.rsr) && (c.sigma == null || m.sigma === c.sigma) && (c.beats == null || m.beats === c.beats));
  verifyAll(m, id);
  return m;
}

/* ---------- the page ---------- */
await T.goto(BOOK, ID, '?lang=en');
await settle(page);
check('the budget card opens by default', (await state()).preset === DEFAULT);
check('the probe exposes state, calc and presets', await page.evaluate((ids) => {
  const d = window.OMEGA_CASCADE_DEBUG;
  return Object.isFrozen(d) && typeof d.calc === 'function' && !!d.state && JSON.stringify(Object.keys(d.presets)) === JSON.stringify(ids) && Object.isFrozen(d.presets);
}, IDS));
check('three-column lab shell, panel badges, evidence boxes and drawer', await page.evaluate(() => {
  const q = (s) => document.querySelector(s);
  const asides = [...document.querySelectorAll('.sec h2 .aside')].map((el) => el.textContent.trim());
  return !!q('.app.lab > header.top .status #scenePill') && !!q('.app.lab > header.top .status #keyPill') &&
    !!q('#rail #lensPanel .lens-toggle') && !!q('#rail #presets') && !!q('#rail #ctlPanel #viewChips') &&
    !!q('main.center > #stage > .scan') && !!q('main.center > #stage > .vig') && !!q('#stage > #hudTl #hudBig') && !!q('#stage > .handle') &&
    !!q('main.center > .strip #plot') && !q('#stage .strip') && !q('#stage #plot') &&
    !!q('aside.col.side > #readouts') && q('aside.col.side > #evidence').firstElementChild.id === 'infoBtn' && document.querySelectorAll('#infoBtn').length === 1 &&
    ['§39.2', '5', 'NUM', 'trureturing'].every((x) => asides.includes(x)) &&
    [...document.querySelectorAll('#evidence .lean')].every((el) => el.children.length === 2 && [...el.children].every((c) => c.tagName === 'SPAN')) &&
    ['.lean.argued', '.lean.model', '.lean.num', '.lean.open'].every((s) => document.querySelectorAll('#evidence ' + s).length === 1) &&
    document.querySelectorAll('#evidence .lean:not(.argued):not(.model):not(.num):not(.open)').length === 12 &&
    /不是证明/.test(q('#drawer').textContent) && /not a proof/.test(q('#drawer').textContent) &&
    [...document.querySelectorAll('#drawer .sheet > div.zh, #drawer .sheet > div.en')].every((el) => el.querySelector('p.lede') && el.querySelectorAll('ol li b').length === 7 && el.querySelector('p.lede.refs a'));
}));
check('a card click starts a camera glide instead of a hard cut', await page.evaluate(() => {
  document.querySelector('[data-preset="tier4-prime-sagitta-critical-ridge"]').click();
  return window.OMEGA_CASCADE_DEBUG.state.blending;
}));
await settle(page);
await until(page, () => !window.OMEGA_CASCADE_DEBUG.state.blending);
check('the glide ends on the card', (await state()).tier === 4 && !(await state()).blending);

for (const lang of ['zh', 'en']) {
  await page.click('[data-lang-set="' + lang + '"]');
  await settle(page);
  const links = await page.locator('#drawer .refs a, #evidence .lean.open a').evaluateAll((els) => els.filter((el) => getComputedStyle(el.parentElement).display !== 'none').map((el) => el.getAttribute('href')));
  check(lang + ' theory and open-problem links', [THEORY, ...OPEN].every((x) => links.includes('../../' + lang + '/' + x)));
  check(lang + ' the twelve green boxes cite exactly the twelve theorems, in order',
    same(await page.locator('#evidence .lean:not(.argued):not(.model):not(.num):not(.open) a[data-lean-gid]').evaluateAll((els) => els.map((el) => el.dataset.leanGid)), GIDS) &&
      same(await page.locator('#evidence a[data-lean-gid]').evaluateAll((els) => els.map((el) => el.dataset.leanGid)), GIDS));
  const badge = async (sel) => (await page.locator('#evidence ' + sel + ' .' + lang).allTextContents()).join(' ').replace(/\s+/g, '');
  const num = await badge('.lean.num'),
    model = await badge('.lean.model'),
    argued = await badge('.lean.argued');
  check(lang + ' NUM says it is not a proof; MODEL owns the tower, the calibration and the fading bridge; ARGUED owns Mertens and 3/8',
    (lang === 'zh' ? /不是证明/ : /notaproof/).test(num) && model.includes('η') && model.includes('0.36') && model.includes('ε/ε₀') &&
      argued.includes('1874') && argued.includes('3/8') && argued.includes('1969'));
  for (const id of IDS) {
    await pick(id);
    const m = await verifyCard(page, id);
    await layout(page, lang + '/' + id);
    const outs = await page.locator('#readouts output').allTextContents();
    check(lang + '/' + id + ' one key and six readouts, all populated',
      outs.length === 7 && (await page.locator('#readouts dl.ro > div.key').count()) === 1 && outs.every((t) => t && !/NaN|undefined|^—$/.test(t)));
    const key = await textOf('roKey'),
      want = { 1: f8(m.t1.det), 2: f8(m.t2.sum), 3: f8(m.t3.ledger.value), 4: f8(m.t4.total), 5: f8(m.t5.sagGeo) }[m.tier];
    check(lang + '/' + id + ' key readout and status pill show this tier’s invariant', key === want && (await textOf('keyPill')).includes(want) && (await textOf('hudSub')).trim().length > 0);
    check(lang + '/' + id + ' the readouts print the audited values',
      (await textOf('roT1')).includes('0.09375000') && (await textOf('roT2')).includes('0.48000000 + 0.16000000 + 0.36000000 = 1.00000000') &&
        (await textOf('roT2')).includes('0.73908513') && (await textOf('roT3')).includes('3/8 = 0.37500000') && (await textOf('roT3')).includes('ΔE(6) = 3') &&
        (await textOf('roT4')).includes('0.61588148') && (await textOf('roT4')).includes('0.21171004') &&
        (await textOf('roT5')).includes('0.53589838 < 1.50000000'));
    const ctl = await page.evaluate(() => [...document.querySelectorAll('.tier-ctl')].filter((el) => !el.hidden).map((el) => Number(el.dataset.tier)));
    check(lang + '/' + id + ' only this tier’s controls are shown', same(ctl, [CARDS[id].tier]));
  }
}
await pick('tier2-dottie-dual-relativity');
check('tier 2 card: 0.48 + 0.16 + 0.36 = 1 and dτ/dt = 0.69282032', await state().then((m) => f8(m.t2.dtau2) === '0.48000000' && f8(m.t2.kin2) === '0.16000000' && f8(m.t2.grav2) === '0.36000000' && f8(m.t2.dtau) === '0.69282032' && f8(m.t2.thetaStar) === '0.73908513' && f8(m.t2.cos2Star) === '0.54624683'));

/* ---------- the invariants, swept through the page's own computation ---------- */
const sweep = await page.evaluate(() => {
  const d = window.OMEGA_CASCADE_DEBUG,
    out = { det: [], budget: [], frames: [], stairs: [], beats: [] };
  for (let e = 0; e <= 180; e += 7.5) out.det.push([e, d.calc({ eps: e }).t1.det]);
  for (const b of [0, 0.13, 0.5, 0.77, 0.99]) for (const r of [0, 0.2, 0.36, 0.95]) out.budget.push(d.calc({ beta: b, rsr: r }).t2);
  for (let n = 0; n <= 5; n++) out.frames.push(d.calc({ n3: n }).t3);
  for (const s of [0.4, 0.5, 0.75, 1, 1.2]) out.stairs.push(d.calc({ sigma: s, k4: 24 }).t4);
  for (let n = 2; n <= 8; n++) out.beats.push(d.calc({ beats: n, t5: n + 1 }).t5);
  return out;
});
check('T1 sweep: det G₃ is positive on (0°, 180°), zero at both ends, 3/32 at 60° and 1/2 at 90°',
  sweep.det.every(([e, v]) => near(v, gramDet(e), 1e-12) && (e === 0 || e === 180 ? Math.abs(v) < 1e-12 : v > 0)) &&
    f8(sweep.det.find(([e]) => e === 60)[1]) === '0.09375000' && f8(sweep.det.find(([e]) => e === 90)[1]) === '0.50000000');
sweep.budget.forEach((t2, i) => verifyTier2(t2, 'budget sweep ' + i));
sweep.frames.forEach((t3) => verifyTier3(t3, 'N = ' + t3.N));
check('T3 sweep: ΔE(N) for N = 3 … 8 is 0, 0, 1, 3, 6, 10', same(sweep.frames.map((t) => t.dE), [0, 0, 1, 3, 6, 10]));
sweep.stairs.forEach((t4) => verifyTier4(t4, 'σ = ' + t4.sigma));
verifyCeiling(sweep.stairs[0]);
check('T4 sweep: up to 97 the σ = ½ staircase passes the σ = 1 ring, the σ = 1 staircase stays below it',
  sweep.stairs[1].total > sweep.stairs[1].ceiling && sweep.stairs[3].total < sweep.stairs[3].ceiling && sweep.stairs.every((t, i) => !i || t.total < sweep.stairs[i - 1].total));
sweep.beats.forEach((t5) => verifyTier5(t5, 'N = ' + t5.beats));

/* ---------- controls ---------- */
await pick('tier1-numbers-arc-calculus');
for (const e of [0, 30, 60, 90, 120, 179, 180]) {
  await seek(e);
  const m = await state();
  check('T1 rail ε = ' + e, near(m.rail[1], e, 1e-9) && near(m.t1.eps, e, 1e-9) && near(m.t1.det, gramDet(e), 1e-12) && (await textOf('roT1')).includes(f8(m.t1.det)));
}
await pick('tier2-dottie-dual-relativity');
for (const r of [0, 0.2, 0.5, 0.95]) {
  await input('#rsrField', r);
  const m = await state();
  check('T2 control r_s/r = ' + r, m.rsr === r && m.preset === null && !m.playing && (await textOf('roT2')).includes('= 1.00000000'));
  verifyTier2(m.t2, 'r_s/r = ' + r);
}
for (const b of [0, 0.25, 0.99]) {
  await seek(b);
  verifyTier2((await state()).t2, 'β = ' + b);
}
await pick('tier3-afgut-weinberg-three-eighths');
for (let t = 0; t <= 5; t++) {
  await seek(t);
  const m = await state();
  check('T3 rail N = ' + (3 + t), m.t3.N === 3 + t && m.t3.dE === ((t) * (t - 1)) / 2 && (await textOf('roT3')).includes(`ΔE(${3 + t}) = ${(t * (t - 1)) / 2}`));
}
await pick('tier4-prime-sagitta-critical-ridge');
for (const [v, want] of [[0.3, 0.3], [0.4, 0.4], [0.505, 0.5], [0.75, 0.75], [0.995, 1], [1.2, 1.2]]) {
  await input('#sigmaField', v);
  const m = await state();
  check('T4 control σ = ' + v + ' (snaps to ' + want + ')', m.sigma === want && m.t4.sigma === want);
  verifyTier4(m.t4, 'σ = ' + want);
}
for (const t of [0, 4, 24]) {
  await seek(t);
  const m = await state();
  check('T4 rail P = ' + PRIMES97[t], m.t4.count === t + 1 && m.t4.P === PRIMES97[t]);
}
await pick('tier5-geodesic-mind-bridge-erasure');
for (const n of [2, 3, 6, 8, 4]) {
  await input('#beatsField', n);
  const m = await state();
  check('T5 control N = ' + n, m.beats === n && (await railMax()) === n + 1 && near(m.t5.sagGeo, n * (1 - Math.cos((120 * DEG) / n)), 1e-12) && m.t5.sagGeo < 1.5);
}
for (const [t, done, tiltDeg] of [[0, 0, 18], [2, 2, 18], [4, 4, 18], [4.5, 4, 9], [5, 4, 0]]) {
  await seek(t);
  const m = await state();
  check(`T5 rail t = ${t}: ${done} beats, tilt ${tiltDeg}°`, near(m.t5.done, done, 1e-9) && near(m.t5.tilt, tiltDeg, 1e-9) && (await textOf('roBridge')).includes(f8(m.t5.bridge.residue)));
  verifyTier5(m.t5, 't = ' + t);
}
check('T5 at the end of the rail: the residue prints 0.00000000', (await textOf('roBridge')).includes('0.00000000'));
const beforeLens = await state(),
  pill = await textOf('scenePill');
await page.click('#lensToggleBtn');
await settle(page);
const lensed = await state();
check('the lens changes the names, not the experiment', lensed.lens !== beforeLens.lens && (await textOf('scenePill')) !== pill &&
  ['tier', 'rsr', 'sigma', 'beats', 't', 'preset'].every((k) => same(lensed[k], beforeLens[k])) && same(lensed.rail, beforeLens.rail));
await page.click('#lensToggleBtn');
await settle(page);
await pick('tier1-numbers-arc-calculus');
const cams = [];
for (const v of ['tower', 'focus']) {
  await page.click('[data-view="' + v + '"]');
  await settle(page);
  const m = await state();
  check('view ' + v, m.view === v && (await page.getAttribute('[data-view="' + v + '"]', 'aria-pressed')) === 'true' && (v === 'tower') === (await page.locator('#omegaHandle').isHidden()));
  cams.push(m.camera.yaw + '/' + m.focus.join(','));
  await layout(page, 'view ' + v);
}
check('the two views look from different places', new Set(cams).size === 2);

/* ---------- the amber handle ---------- */
async function drag(tier, card, target, read, tol) {
  await pick(card);
  await page.locator('#stage').scrollIntoViewIfNeeded();
  await settle(page);
  const here = await state();
  const box = await page.locator('#omegaHandle').boundingBox();
  const start = { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  const end = await page.evaluate((v) => window.OMEGA_CASCADE_DEBUG.dragTarget(v), target);
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(end.x, end.y, { steps: 10 });
  await page.mouse.up();
  await settle(page);
  const after = await state();
  check(`tier ${tier}: dragging the handle sets the parameter and leaves the camera`, Math.abs(read(after) - (Array.isArray(target) ? target[0] : target)) < tol && same(after.camera, here.camera) && !after.playing && after.preset === null, JSON.stringify(read(after)));
  return after;
}
await pick('tier2-dottie-dual-relativity');
const at = await page.evaluate(() => {
  const d = window.OMEGA_CASCADE_DEBUG, s = d.state, b = document.querySelector('#omegaHandle').getBoundingClientRect();
  const t = d.dragTarget([s.rail[2], s.rsr]);
  return Math.hypot(b.x + b.width / 2 - t.x, b.y + b.height / 2 - t.y);
});
check('the handle sits on the budget point', at < 1.5, String(at));
await drag(1, 'tier1-numbers-arc-calculus', 90, (s) => s.rail[1], 1);
const t2drag = await drag(2, 'tier2-dottie-dual-relativity', [0.3, 0.5], (s) => s.rail[2], 0.03);
check('tier 2: the drag sets r_s/r too, and the point stays on the sphere', Math.abs(t2drag.rsr - 0.5) < 0.03 && near(t2drag.t2.sum, 1, 1e-12));
await drag(4, 'tier4-prime-sagitta-critical-ridge', 0.8, (s) => s.sigma, 0.02);
await page.locator('#omegaHandle').focus();
const sBefore = (await state()).sigma;
await page.keyboard.press('ArrowRight');
await settle(page);
check('tier 4: the arrow keys move σ, not the rail', near((await state()).sigma, sBefore + 0.01, 1e-9) && (await state()).t === 4);
// σ = 0.30 is the slider minimum and the left end of the ruler; Home lands there and ArrowLeft holds it
await page.keyboard.press('Home');
await settle(page);
const sLo = await state();
await page.keyboard.press('ArrowLeft');
await settle(page);
const sHeld = await state();
check('tier 4: Home sets σ = 0.30 at the left end of the ruler, ArrowLeft keeps it there',
  [sLo, sHeld].every((s) => s.sigma === 0.3 && s.t4.sigma === 0.3 && !!s.handle && near(s.handle[0], -0.6, 1e-12)) &&
    (await page.locator('#sigmaField').inputValue()) === '0.3', JSON.stringify([sLo.sigma, sHeld.sigma, sHeld.handle]));
verifyTier4(sHeld.t4, 'σ = 0.30 by keyboard');
await pick('tier3-afgut-weinberg-three-eighths');
check('tier 3 has no handle', await page.locator('#omegaHandle').isHidden());

/* ---------- playing and resting ---------- */
for (const id of IDS) {
  if (CARDS[id].play) check(id + ' plays', await playsAfter(page, () => page.click('[data-preset="' + id + '"]'), () => window.OMEGA_CASCADE_DEBUG.state));
  else {
    await page.click('[data-preset="' + id + '"]');
    await settle(page);
    const m = await state();
    await settle(page);
    check(id + ' rests on its frame', !m.playing && m.t === (await state()).t && near(m.t, CARDS[id].rail, 1e-9));
  }
}

/* ---------- colours, solids and the strip ---------- */
await pick(DEFAULT);
const colours = await page.evaluate(() => {
  const sc = window.TRV.solids[0],
    seen = [],
    names = ['surface', 'tube', 'line', 'circle', 'arrow', 'bead', 'ring', 'fan', 'poly', 'glass'],
    saved = {};
  for (const n of names) {
    saved[n] = sc[n];
    sc[n] = (...a) => {
      const s = (n === 'circle' || n === 'glass' ? a[3] : ['line', 'arrow', 'bead', 'ring', 'fan'].includes(n) ? a[n === 'arrow' ? 2 : 1] : a[2]) || {};
      seen.push({ key: String(['surface', 'tube', 'poly', 'glass'].includes(n) ? a[0] : s.key || n), colors: [s.color, s.fill, s.edges, ...(s.colors || [])].filter(Boolean) });
      return saved[n](...a);
    };
  }
  window.TRV.kit.flush();
  for (const n of names) sc[n] = saved[n];
  const P = window.TRV.palette;
  return { seen, amber: P.amber, ok: P.ok, warn: P.warn, violet: P.violet };
});
check('stage colours: amber only on the active tier and its point, never green or red, a violet core',
  colours.seen.filter((x) => x.colors.includes(colours.amber)).every((x) => /active|handle|cursor/i.test(x.key)) &&
    colours.seen.some((x) => /active/i.test(x.key)) && colours.seen.every((x) => !x.colors.includes(colours.ok) && !x.colors.includes(colours.warn)) &&
    colours.seen.find((x) => x.key === 'core').colors.includes(colours.violet));
const badColours = await page.evaluate(() => {
  const col = (v) => { const s = document.createElement('span'); s.style.color = `var(${v})`; document.body.appendChild(s); const c = getComputedStyle(s).color; s.remove(); return c; };
  const banned = [col('--amber'), col('--ok'), col('--warn')],
    bad = [];
  for (const el of document.querySelectorAll('#stage *, .strip *, #readouts *, #evidence .lean.model, #evidence .lean.model *')) {
    if (el.closest('.handle')) continue;
    const cs = getComputedStyle(el);
    for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderLeftColor']) if (banned.includes(cs[prop])) bad.push(`${el.id || el.className || el.tagName} ${prop}`);
  }
  return bad;
});
check('no amber, green or red in the stage, the strip, the readouts or the MODEL box', !badColours.length, badColours.slice(0, 3).join(' | '));
const marks = await page.evaluate(() => TRV.solids[0].marks().filter((m) => /^core/.test(m.key)).map((m) => [m.key, m.hidden]));
check('the column hides the mark on its far side and shows the one on its near side', same(marks, [['coreFront', false], ['coreBack', true]]));
for (const id of IDS) {
  const p = await T.open(BOOK, ID, '?lang=en&preset=' + id, { viewport: { width: 1440, height: 900 } });
  await settle(p);
  const a = await solidPixels(p);
  const initial = await p.evaluate(() => ({ ...TRV.solids[0].cam }));
  const turns = [];
  for (const axis of ['yaw', 'pitch']) {
    await p.evaluate((cam) => { Object.assign(TRV.solids[0].cam, cam); TRV.kit.flush(); }, initial);
    const b = await p.evaluate(() => { const r = TRV.solids[0].el.getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; });
    const x = b[0] + b[2] * 0.08,
      y = b[1] + b[3] * 0.65;
    await p.mouse.move(x, y);
    await p.mouse.down();
    for (let k = 1; k <= 6; k++) await p.mouse.move(x + (axis === 'yaw' ? b[2] * 0.05 * k : 0), y - (axis === 'pitch' ? b[3] * 0.05 * k : 0));
    await p.mouse.up();
    await settle(p);
    const c = await solidPixels(p);
    turns.push(c.hist.reduce((s, h, k) => s + Math.abs(h - a.hist[k]), 0) / 2);
  }
  check(`${id}: lit body share ≥ 0.14, spread ≥ 0.055, camera turn ≥ 0.08`, a.share >= 0.14 && a.spread >= 0.055 && Math.max(...turns) >= 0.08, JSON.stringify({ share: a.share, spread: a.spread, turns }));
  await p.context().close();
}
await pick('tier1-numbers-arc-calculus');
const strip = await page.evaluate(() => {
  const plot = TRV.kit.plot,
    traces = [];
  TRV.kit.plot = (...args) => {
    const g = plot(...args);
    for (const mth of ['line', 'dot', 'vline']) {
      const o = g[mth];
      g[mth] = (...ps) => { traces.push([mth, ...ps]); return o(...ps); };
    }
    return g;
  };
  try { TRV.kit.flush(); } finally { TRV.kit.plot = plot; }
  const cv = document.querySelector('#plot'),
    c = cv.getContext('2d', { willReadFrequently: true }),
    d = c.getImageData(0, 0, cv.width, cv.height).data;
  const s = document.createElement('span');
  s.style.color = 'var(--amber)';
  document.body.appendChild(s);
  const [ar, ag, ab] = getComputedStyle(s).color.match(/\d+/g).map(Number);
  s.remove();
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity, n = 0;
  for (let y = 0; y < cv.height; y++) for (let x = 0; x < cv.width; x++) {
    const i = 4 * (y * cv.width + x);
    if (d[i + 3] > 200 && Math.abs(d[i] - ar) < 26 && Math.abs(d[i + 1] - ag) < 26 && Math.abs(d[i + 2] - ab) < 26) { n++; x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  }
  return { traces, cyan: TRV.palette.cyan, amber: TRV.palette.amber, amberBox: { n, width: x1 - x0, height: y1 - y0, dpr: cv.width / cv.clientWidth, h: cv.height } };
});
const detLine = strip.traces.find(([mth, pts, color]) => mth === 'line' && color === strip.cyan);
check('T1 strip: the cyan curve is det G₃ over 0° … 180°', !!detLine && detLine[1][0][0] === 0 && detLine[1].at(-1)[0] === 180 && detLine[1].every(([e, v]) => near(v, gramDet(e), 1e-12)));
const cursor = strip.traces.filter(([mth, ...r]) => (mth === 'vline' || mth === 'dot') && r.includes(strip.amber));
check('T1 strip: the amber cursor sits at ε = 60°', cursor.length === 2 && cursor.every((r) => r[1] === 60));
const am = strip.amberBox;
check('T1 strip: the amber cursor is a narrow line across the plot', am.n > 10 && am.width < 12 * am.dpr && am.height > am.h * 0.45, JSON.stringify(am));

/* ---------- phone, cited frames and stills ---------- */
for (const lang of ['zh', 'en']) {
  for (const [width, height, figure] of [[390, 844, false], [334, 500, true], [740, 500, true]]) {
    colorScheme = width === 390 ? 'light' : 'dark';
    const p = await T.open(BOOK, ID, '?lang=' + lang + (figure ? '&embed=1&preset=' + DEFAULT : ''), { viewport: { width, height }, reducedMotion: 'reduce' });
    await settle(p);
    for (let j = 0; j < IDS.length; j++) {
      const id = (await state(p)).preset;
      await layout(p, lang + '/' + width + '/' + id, figure);
      if (lang === 'en') check('English ' + width + '/' + id, !(await cjkLeftovers(p)).length);
      if (figure) check('cited frame hides the strip ' + id, (await p.locator('.strip').isHidden()) && (await p.locator('.tour .tour-note').isVisible()));
      await p.locator(figure ? '[data-tour="next"]' : '[data-preset="' + IDS[(IDS.indexOf(id) + 1) % 5] + '"]').click();
      await settle(p);
    }
    await p.context().close();
  }
  for (const id of IDS) {
    const p = await openStill(T, BOOK, ID, id, lang);
    const m = await verifyCard(p, id);
    check('still ' + lang + '/' + id, !m.playing && near(m.t, await cardStill(id, p), 1e-9) && (await p.locator('#omegaHandle').isHidden()));
    if (id === 'tier5-geodesic-mind-bridge-erasure') check('still ' + lang + ': the bridge is erased, residue 0', m.t5.bridge.residue === 0 && m.t5.tilt === 0);
    await p.context().close();
  }
}
check('a permanent dark console in both system schemes', !paletteMutations.length && paletteDocuments.every((x) => x.absent) && paletteDocuments.some((x) => x.dark) && paletteDocuments.some((x) => !x.dark));
check('zero console warnings', browserWarnings.length === 0, browserWarnings.slice(0, 3).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('zero browser or request errors', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));
await T.finish();
