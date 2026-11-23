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
  labelOverlaps
} from '../../../../tools/node/viz-testkit.mjs';
import { ROOT, resolveBook, vizCitations } from '../../../../tools/node/viz-common.mjs';

const BOOK = 'quantum-geometry';
const ID = 'real-error-prime-adelic-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const THEORY = 'ch39-s31-real-error-axis-and-prime-adelic-closure.html#sec-ch39-real-error-axis-and-prime-adelic-closure';
const SECTION = '31.4';
const PI = Math.PI;
const TAU = 2 * PI;
const DEG = PI / 180;
const LAPS = 50;
// scene and still of each card on its own rail: s, s, N − 1, τ, τ
const CARDS = {
  'real-tangent-error-magnifier': { scene: 'tangent', still: 0.8 },
  'linear-add-mul-vs-curved-rodrigues': { scene: 'rodrigues', still: 0.5 },
  'adelic-prime-curvature-reclaim': { scene: 'adelic', still: 4 },
  'prime-orthogonal-torus-and-rivets': { scene: 'rivets', still: 7.5 },
  'incommensurable-ergodic-anti-deadlock': { scene: 'ergodic', still: 315 }
};
const IDS = Object.keys(CARDS);
const [CARD1, CARD2, CARD3, CARD4, CARD5] = IDS;
const DEFAULT = CARD1;
const CAM_NAMES = ['panorama', 'face', 'top'];
const GIDS = [
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq',
  'D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev',
  'D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences',
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  'D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification',
  'D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula',
  'D5/S3/Arith/Congruence/PadicObservationDistance.observation_distance_eq_padic_valuation',
  'D5/S3/ConceptDynamics/RefinementGeometry/RefinementUltrametric.refinementDistance_ultrametric',
  'D5/S3/Axis/PrimeAxisEscape.prime_axis_escape',
  'D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product',
  'D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence',
  'D5/S3/Fourier/TorusOrbitClosure.result',
  'D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result',
  'D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact'
];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const f4 = (v) => (Math.abs(v) < 5e-5 ? 0 : v).toFixed(4);
const f2 = (v) => (Math.abs(v) < 5e-3 ? 0 : v).toFixed(2);

/* ---------- independent mathematics, written here and never calling the page ---------- */
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));
const sub = (a, b) => a.map((x, i) => x - b[i]);
const scale = (a, k) => a.map((x) => x * k);
/** The arc, the point and the image of a deficit s, by cutting the line from the top of a unit circle with its tangent. */
function tangentRef(s) {
  const theta = Math.acos(1 - 2 * s); // s = (1 − cos θ)/2
  const p = [Math.sin(theta), 1 - Math.cos(theta)]; // on the circle of radius 1 about (0, 1)
  const k = 2 / (2 - p[1]); // (0, 2) + k (p − (0, 2)) meets the second coordinate 0
  return { theta, x: (k * p[0]) / 2 };
}
/** 2 dx/dθ by central differences of the projection. */
function magnification(s) {
  const { theta } = tangentRef(s),
    h = 1e-5,
    at = (t) => tangentRef((1 - Math.cos(t)) / 2).x;
  return (2 * (at(theta + h) - at(theta - h))) / (2 * h);
}
/* rotations as 3 × 3 matrices (axis and angle), never quaternions */
const mat = (f) => [0, 1, 2].map((i) => [0, 1, 2].map((j) => f(i, j)));
const mm = (A, B) => mat((i, j) => A[i][0] * B[0][j] + A[i][1] * B[1][j] + A[i][2] * B[2][j]);
function turn(u, angle) {
  const K = [
    [0, -u[2], u[1]],
    [u[2], 0, -u[0]],
    [-u[1], u[0], 0]
  ];
  const K2 = mm(K, K);
  return mat((i, j) => (i === j ? 1 : 0) + Math.sin(angle) * K[i][j] + (1 - Math.cos(angle)) * K2[i][j]);
}
/** tan(angle/2) times the axis of a rotation matrix (infinite at a half turn). */
const gibbs = (R) => {
  const d = 1 + R[0][0] + R[1][1] + R[2][2];
  return [(R[2][1] - R[1][2]) / d, (R[0][2] - R[2][0]) / d, (R[1][0] - R[0][1]) / d];
};
const angleOf = (R) => Math.acos(Math.min(1, Math.max(-1, (R[0][0] + R[1][1] + R[2][2] - 1) / 2))) / DEG;
const E1 = [0, -1, 0],
  E2 = [1, 0, 0];
/* primes by a sieve, valuations by repeated division of big integers */
const PRIMES = (() => {
  const out = [];
  for (let n = 2; n <= 30; n++) if (!out.some((p) => n % p === 0)) out.push(n);
  return out;
})();
function factor(n) {
  const out = {};
  let m = BigInt(n);
  for (const p of PRIMES) while (m % BigInt(p) === 0n) {
    out[p] = (out[p] || 0) + 1;
    m /= BigInt(p);
  }
  return out;
}
/** N ∏ p^(−v_p(N)) as an exact fraction of big integers. */
function adelicFraction(n) {
  let num = BigInt(n),
    den = 1n;
  for (const [p, v] of Object.entries(factor(n))) den *= BigInt(p) ** BigInt(v);
  return num === den;
}
/** The cells of the 8³ grid met up to time T, by stepping from one crossing to the next. */
function cellsMet(w, T, n = 8) {
  const idx = [0, 0, 0],
    count = [0, 0, 0],
    seen = new Set(['0,0,0']);
  for (;;) {
    const next = w.map((x, i) => ((count[i] + 1) * TAU) / (n * x)),
      t = Math.min(...next);
    if (t > T + 1e-9) break;
    next.forEach((s, i) => {
      if (s - t < 1e-9) {
        count[i]++;
        idx[i] = count[i] % n;
      }
    });
    if (T - t > 1e-9) seen.add(idx.join(','));
  }
  return seen;
}
const LOGS = [2, 3, 5].map(Math.log);
/** |sum of e^{inφ}, n = 1 … N| / N in closed form. */
const geometric = (phi, N) => (Math.abs(Math.sin(phi / 2)) < 1e-12 ? 1 : Math.abs(Math.sin((N * phi) / 2) / Math.sin(phi / 2)) / N);

/* ---------- printed numbers: exact fractions of big integers, never the page's own printers ---------- */
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const superOf = (n) => String(n).replace('-', '⁻').replace(/\d/g, (d) => SUP[d]);
/** A printed decimal (0.0205, −6.429×10⁻⁸) as a fraction. */
function decimalN(text) {
  const [m, e = '⁰'] = text.replace('−', '-').split('×10'),
    [whole, part = ''] = m.split('.'),
    k = Number([...e].map((c) => (c === '⁻' ? '-' : SUP.indexOf(c))).join('')) - part.length;
  return k < 0 ? [BigInt(whole + part), 10n ** BigInt(-k)] : [BigInt(whole + part) * 10n ** BigInt(k), 1n];
}
const numberOf = (text) => {
  const [m, e = '⁰'] = text.replace('−', '-').split('×10');
  return Number(`${m}e${[...e].map((c) => (c === '⁻' ? '-' : SUP.indexOf(c))).join('')}`);
};
/** A double as a fraction of a whole number and a power of two. */
function doubleN(x) {
  let k = 0n;
  for (; !Number.isInteger(x); k++) x *= 2;
  return [BigInt(x), 2n ** k];
}
const gcdN = (a, b) => (b ? gcdN(b, a % b) : a < 0n ? -a : a);
const fracOf = (p, q) => {
  const [a, b] = [BigInt(p), BigInt(q)],
    g = gcdN(a, b);
  return `${a < 0n ? '−' : ''}${(a < 0n ? -a : a) / g}${b === g ? '' : '/' + b / g}`;
};
const NUM = '−?\\d+(?:\\.\\d+)?(?:×10⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?';
/** Is the relation before the digits right? q: the exact fraction of the value, or of its square (root), or null: then the double v
    tells an exact decimal from a rounded one (v is good to 10⁻¹¹, and no value here comes within 10⁻⁹ of a decimal it is not). */
function relationBad(sign, text, v, { q = null, root = false } = {}) {
  const [n, d] = decimalN(text),
    [mantissa] = text.replace('−', '-').split('×10'),
    unit = 10 ** -(mantissa.split('.')[1] || '').length * (text.includes('×10') ? numberOf('1×10' + text.split('×10')[1]) : 1),
    exact = q ? (root ? n * n * BigInt(q[1]) === BigInt(q[0]) * d * d : n * BigInt(q[1]) === BigInt(q[0]) * d) : Math.abs(numberOf(text) - v) < 1e-9;
  if (!(Math.abs(numberOf(text) - v) <= unit / 2 + 1e-9)) return `${sign} ${text} is not the rounding of ${v}`;
  if (n === 0n && v !== 0 && !exact) return `${sign} ${text}: digits all 0 of ${v}`;
  if ((sign === '=') !== exact) return `${sign} ${text} of ${v}`;
  return '';
}
/** The clauses of a text: what stands between two separators (，；。、：, , ; : · and the ¶ between two texts), every parenthesis taken
    out and read as a clause of its own. Nothing is exempt. */
function clauses(text) {
  let t = text.replace(/\s+/g, ' ');
  const out = [];
  for (let m; (m = /[(（]([^()（）]*)[)）]/.exec(t)); ) {
    out.push(m[1]);
    t = `${t.slice(0, m.index)}◦${t.slice(m.index + m[0].length)}`;
  }
  return [...out, t].flatMap((x) => x.split(/[，；。、,;:：¶]| · |\.(?=\s|$)/)).map((x) => x.trim());
}
/** Digits that round a value to the nearest are no side of an inequality, whatever stands on its other side. Read twice: clause by
    clause, and sentence by sentence (up to the next ；。; or full stop, parentheses included). */
const MIXED = /≈.*[<>≤≥＜＞≦≧]|[<>≤≥＜＞≦≧].*≈/;
const sentences = (text) => text.replace(/\s+/g, ' ').split(/[；。;¶]|\.(?=\s|$)/);
const mixed = (text) => [...clauses(text), ...sentences(text)].filter((x) => MIXED.test(x));

const T = await session({ reducedMotion: 'no-preference' });
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
  await context.exposeBinding('__paletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__paletteAudit({ kind: 'mutation', value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener(
      'DOMContentLoaded',
      () => window.__paletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined, dark: matchMedia('(prefers-color-scheme: dark)').matches }).catch(() => {}),
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
await stageFirstChecks(T, BOOK, ID, { solid: true });
{
  // what the gate has read: every card, in both languages, on the desktop, the phone and in the frames of a chapter
  const names = T.results.map((r) => r.name),
    seen = (head) => names.some((n) => n.startsWith(head)),
    missing = [];
  for (const id of IDS)
    for (const head of [`desktop: card ${id}`, `English: card ${id}`, `English: no Chinese left with card ${id}`, `phone: card ${id}`, `frame (zh, 334 × 620), ▶ card ${id}`, `frame (en, 334 × 620), ▶ card ${id}`, ...['zh', 'en'].flatMap((l) => [334, 740].map((w) => `cited figure (${l}, ${id}, ${w} × 500)`))]) if (!seen(head)) missing.push(head);
  check('the shared gate has read all five cards in both languages, on the desktop, the phone and in the frames of a chapter', !missing.length, missing.slice(0, 4).join(' | '));
}

/* ---------- sources, registry, dependencies, citations ---------- */
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
const cjkTerms = new RegExp([[22823, 27169, 22411], [26234, 33021, 20307], [20154, 24037, 26234, 33021]].map((c) => String.fromCharCode(...c)).join('|'));
const hangul = new RegExp('[' + [[0x1100, 0x11ff], [0x3130, 0x318f], [0xac00, 0xd7af]].map(([a, b]) => String.fromCharCode(a) + '-' + String.fromCharCode(b)).join('') + ']');
const literalColour = /#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i;
for (const [file, src] of Object.entries(sources)) {
  check(`source ${file}: no literal colour and no palette switch`, !literalColour.test(src) && !/\btrPalette\b|data-tr-palette|[?&]theme=/.test(src));
  check(`source ${file}: no model, vendor or tool identifiers and no Hangul`, !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src) && !hangul.test(src));
  check(`source ${file}: no possessive ’s (the runtime splits it)`, !/[a-z][’']s\b/i.test(src.replace(/it's|it’s/gi, '')));
}
check('reserved identifiers are absent from the suite and registry entry', [suite, entryText].every((src) => !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src) && !hangul.test(src)));
check(
  'registration: §31.4, live, five cards and the fifteen GIDs in order',
  !!entry &&
    entry.chapter === 31 &&
    entry.section === SECTION &&
    entry.status === 'live' &&
    entry.added === '2026-11-22' &&
    entry.code === 'OMEGA//ADELIC' &&
    entry.capture_lock === 'links' &&
    entry.title === '实数误差放大轴 vs 素数本原闭合与阿代尔归元沙盘' &&
    entry.title_en === 'Real Error-Magnification Axis vs. Prime Adelic Closure & Ergodic Anti-Deadlock' &&
    same(entry.presets, IDS) &&
    same(Object.keys(entry.preset_titles), IDS) &&
    same(entry.lean.map((x) => x.gid), GIDS) &&
    entry.theory.length === 1 &&
    entry.theory[0].href === '../zh/' + THEORY &&
    entry.theory[0].href_en === '../en/' + THEORY
);
check(
  'registration: the card titles of the registry are the card names of the page',
  !!entry &&
    IDS.every((id) => {
      const button = new RegExp(`data-preset="${id}"[^>]*>.*?<span class="cn zh">([^<]*)</span><span class="cn en">([^<]*)</span>`).exec(sources['index.html']);
      return !!button && entry.preset_titles[id].zh === button[1] && entry.preset_titles[id].en === button[2];
    })
);
const DEPENDENCIES = [
  '@citations',
  'books/quantum-geometry/book.toml',
  '@registry-entry',
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
  'tools/tbook/viz.py',
  '@lean-links'
];
check('dependencies: the suite is registered with exactly these twenty-five reads, in this order', DEPENDENCIES.length === 25 && same(deps.suites[ID + '.test.mjs'], DEPENDENCIES), JSON.stringify(deps.suites[ID + '.test.mjs']));
/* ---------- the evidence boxes: a green box states the frozen theorem alone ---------- */
const plain = (html) => html.replace(/<[^>]*>/g, '').replaceAll('&gt;', '>').replaceAll('&lt;', '<').replaceAll('&amp;', '&');
/** The boxes of the evidence panel as written in the source: the class, the GID, the two languages. */
const boxes = [...sources['index.html'].matchAll(/<div class="(lean[^"]*)"(?: id="\w+")?><span class="ok">([^<]*)<\/span><span(?: id="\w+")?><span class="zh">(.*?)<\/span><span class="en">(.*?)<\/span>(?:<a data-lean-gid="([^"]*)"[^>]*><code>([^<]*)<\/code><\/a>)?<\/span><\/div>/g)].map(([, cls, ok, zh, en, gid, code]) => ({ cls, ok, gid, code, zh: plain(zh), en: plain(en) }));
const greens = boxes.filter((b) => b.cls === 'lean'),
  argued = { zh: boxes.filter((b) => b.cls === 'lean argued').map((b) => b.zh).join(' '), en: boxes.filter((b) => b.cls === 'lean argued').map((b) => b.en).join(' ') };
check('evidence source: fifteen green boxes in the order of the registry (each with its GID and the name of its declaration), then two ARGUED, MODEL and NUM', same(boxes.map((b) => b.cls), [...Array(15).fill('lean'), 'lean argued', 'lean argued', 'lean model', 'lean num']) && same(greens.map((b) => b.gid), GIDS) && greens.every((b) => b.ok === 'LEAN ✓' && (b.gid.endsWith('.' + b.code) || b.gid.endsWith('/' + b.code))), JSON.stringify(boxes.map((b) => [b.cls, b.gid, b.code])));
{
  // no instance of the page, no drift, no hand derivation, no decimal and no “≈” in a green box
  const foreign = /页面|本页|舞台|沙盘|卡片|\bthe page\b|\bpages?\b|\bstage\b|\bcards?\b|drift|偏差|手工推导|by hand|文献|literature|\d\.\d|≈|整系数|整数系数|integer[- ]coefficient|s = 1\/2|N = 5|N = 6|N = 12|截到|cut at|ζ|arccos|15624|81000|五边形|pentagon/i;
  const bad = greens.flatMap((b) => [b.zh, b.en].filter((x) => foreign.test(x) || /MODEL|NUM/.test(x)).map((x) => `${b.code}: ${(foreign.exec(x) || /MODEL|NUM/.exec(x))[0]}`));
  check('none of the fifteen green boxes names the page, an instance, a drift, a rounded number, a hand derivation or the literature', greens.length === 15 && !bad.length, bad.join(' | '));
  const balanced = greens.every((b) => b.zh.endsWith('：') && b.en.endsWith(': '));
  check('each green box is one statement that ends at the link to its declaration', balanced);
}
/** What each theorem assumes and concludes, word for word in the green box, in the order of the registry. */
const STATEMENTS = [
  [
    ['设 C 是集合 M 上的三元比较', '有 x、y、z 使 tri(x, y, z) ≠ tri(z, y, x)', '对每个 ε > 0，任意两点由相邻读数都大于 1 − ε 的有限链相连', '读数可任意接近 0', 'κ 是某个映射 M → ℝ⁵ 的内积', '读取完备', '对每个 o ∈ M 存在双射 u : M ≃ 单位四元数，u(o) = 1', 'u(tri(x, y, z)) = u(x) u(y)⁻¹ u(z)', 'κ(x, y) = (1 + ⟨u(x), u(y)⟩)/2'],
    ['let C be a ternary comparison on a set M', 'tri(x, y, z) ≠ tri(z, y, x) for some x, y, z', 'for every ε > 0 any two points are joined by a finite chain whose consecutive readings exceed 1 − ε', 'readings come arbitrarily close to 0', 'κ is the inner product of some map M → ℝ⁵', 'reading complete', 'for every o ∈ M there is a bijection u : M ≃ unit quaternions with u(o) = 1', 'u(tri(x, y, z)) = u(x) u(y)⁻¹ u(z)', 'κ(x, y) = (1 + ⟨u(x), u(y)⟩)/2']
  ],
  [['对一切单位四元数 a、b', 'κ(a, b) = (1 + ⟨a, b⟩)/2', 'κ(a, b) = 1 − dist(a, b)²/4'], ['for all unit quaternions a and b', 'κ(a, b) = (1 + ⟨a, b⟩)/2', 'κ(a, b) = 1 − dist(a, b)²/4']],
  [
    ['对每个四元数序列', 'x0、x1 的模方为 1', '对一切自然数 n 有 xn+2 = xn+1 xn* xn+1（x* 是共轭），当且仅当对一切自然数 n，xn 的模方为 1、xn+1 = Un(c)·x1 − Un−1(c)·x0（n = 0 时 U−1 = 0）、⟨x0, xn⟩ = Tn(c)，其中 c = ⟨x0, x1⟩', 'Tn、Un 是第一、二类切比雪夫多项式'],
    ['for every sequence', 'x0 and x1 have squared norm 1', 'xn+2 = xn+1 xn* xn+1 for every natural number n (x* the conjugate) if and only if, for every natural number n, xn has squared norm 1, xn+1 = Un(c)·x1 − Un−1(c)·x0 (with U−1 = 0 at n = 0) and ⟨x0, xn⟩ = Tn(c), where c = ⟨x0, x1⟩', 'Chebyshev polynomials of the first and second kinds']
  ],
  [
    ['E = ℝ × ℝ³', '(s, x)∘(t, y) = (st + x·y, s y + t x)', '‖(s, x)‖ = |s| + ‖x‖', '‖v‖ ≤ m', '满足 P2', '2 × 2 复矩阵半正定', '满足 PB', 'Q(b + D(a, b) − a∘c, c + a∘b + D(a, c)) = Q(b − D(a, b) + a∘c, c − a∘b − D(a, c))', 'Q(b, c) = α(b∘b) + α(c∘c) + 2α(D(b, c))', '存在取向 ε（plus 或 minus）', 'D(a, b) = crossD ε a b，即 plus 时 (0, x × y)、minus 时 (0, −(x × y))', 'Consequences', 'D(a + r·1, b + q·1) = D(a, b)', '‖D(a, b)‖ ≤ ‖a‖‖b‖', '(a∘b)∘c − a∘(b∘c) = D(D(a, b), c) − D(a, D(b, c))', 'MatrixInterfaces', 'φ(a∘b) − iφ(D(a, b))'],
    ['E = ℝ × ℝ³', '(s, x)∘(t, y) = (st + x·y, s y + t x)', '‖(s, x)‖ = |s| + ‖x‖', '‖v‖ ≤ m', 'satisfy P2', '2 × 2 complex matrix', 'positive semidefinite', 'and PB', 'Q(b + D(a, b) − a∘c, c + a∘b + D(a, c)) = Q(b − D(a, b) + a∘c, c − a∘b − D(a, c))', 'Q(b, c) = α(b∘b) + α(c∘c) + 2α(D(b, c))', 'there is an orientation ε (plus or minus)', 'D(a, b) = crossD ε a b', '(0, x × y) for plus and (0, −(x × y)) for minus', 'Consequences', 'D(a + r·1, b + q·1) = D(a, b)', '‖D(a, b)‖ ≤ ‖a‖‖b‖', '(a∘b)∘c − a∘(b∘c) = D(D(a, b), c) − D(a, D(b, c))', 'MatrixInterfaces', 'φ(a∘b) − iφ(D(a, b))']
  ],
  [['任意指标集 I 的有限子集 S', 'u、v : I → ℝ', '(Σi∈S ui²)(Σi∈S vi²) − (Σi∈S uivi)² = ½ Σi∈SΣj∈S (uivj − ujvi)²'], ['every finite subset S of any index set I', 'u, v : I → ℝ', '(Σi∈S ui²)(Σi∈S vi²) − (Σi∈S uivi)² = ½ Σi∈SΣj∈S (uivj − ujvi)²']],
  [['ℚ 上每个非平凡的实值绝对值 f', '或者与通常的绝对值等价', '恰有一个自然数 p，p 是素数且 f 与 p 进绝对值等价', 'f(x) ≤ f(y) ⇔ g(x) ≤ g(y)'], ['every nontrivial real-valued absolute value f on ℚ', 'is equivalent to the usual absolute value, or there is exactly one natural number p such that p is prime and f is equivalent to the p-adic absolute value', 'f(x) ≤ f(y) ⇔ g(x) ≤ g(y)']],
  [['对每个有理数 x ≠ 0，|x| · ∏p |x|p = 1', '乘积取遍全体素数（有限支撑乘积）', 'p 进范数'], ['for every rational x ≠ 0, |x| · ∏p |x|p = 1', 'over all primes (a finitely supported product)', 'the p-adic norm']],
  [['p 是素数，x ≠ y 是整数', 'p1−k，k 是使 x 与 y 模 pk 的余数不同的最小自然数', 'observationDistance(x, y) = p−vp(x − y)'], ['p be a prime and x ≠ y integers', 'p1−k with k the least natural number at which x and y have different remainders modulo pk', 'observationDistance(x, y) = p−vp(x − y)']],
  [['任意集合 X 上任意一列读数', '任意自然数视界 h 与一切 x、y、z ∈ X', 'd(x, y) = h − m(x, y)', '不超过 h 且使前 m 级读数全部相同的最大深度', 'd(x, z) ≤ max(d(x, y), d(y, z))'], ['any sequence of readouts on any set X', 'any natural number h as horizon and all x, y, z ∈ X', 'd(x, y) = h − m(x, y)', 'the greatest depth, at most h, such that the first m readouts all agree', 'd(x, z) ≤ max(d(x, y), d(y, z))']],
  [['对任意有限素数集 S，∏p∈S p + 1 模每个 p ∈ S 同余于 1', '存在不属于 S 的素数 q 整除 ∏p∈S p + 1'], ['for any finite set S of primes, ∏p∈S p + 1 is congruent to 1 modulo every p ∈ S', 'there is a prime q not in S that divides ∏p∈S p + 1']],
  [['对每个 Re s > 1 的复数 s，Σn∈ℕ n−s = ∏p (1 − p−s)−1', '取遍全体素数'], ['for every complex number s with Re s > 1, Σn∈ℕ n−s = ∏p (1 − p−s)−1', 'over all primes']],
  [['以全体素数 p 为指标的实数族 (ln p)p 在 ℚ 上线性无关'], ['(ln p)p indexed by all primes p is linearly independent over ℚ']],
  [['I 是有限指标集，g、z 是环面 (S¹)I 上的点', 'z 属于 {gn : n ∈ ℕ} 的闭包，当且仅当对每个 k : I → ℤ，∏i giki = 1 蕴含 ∏i ziki = 1'], ['I be a finite index set and g, z points of the torus (S¹)I', 'z lies in the closure of {gn : n ∈ ℕ} if and only if, for every k : I → ℤ, ∏i giki = 1 implies ∏i ziki = 1']],
  [['I 是有限指标集，g ∈ (S¹)I，G 是 g 的整数幂子群的闭包，μ 是 G 上总质量为 1 的哈尔测度', 'G 等于 {gn : n ∈ ℕ} 的闭包', '对每个连续函数 f : G → ℂ，N → ∞ 时 (1/N) Σn=1N f(gn) → ∫G f dμ'], ['I be a finite index set, g ∈ (S¹)I, G the closure of the subgroup of integer powers of g and μ the Haar measure of total mass 1 on G', 'G equals the closure of {gn : n ∈ ℕ}', 'for every continuous f : G → ℂ, (1/N) Σn=1N f(gn) → ∫G f dμ as N → ∞']],
  [['有限顶点集上的连通简单图（SimpleGraph），有向边（dart）集非空', '球面旋转系统', 'V − E + F = 2', '对每个 ℤ₂（ZMod 2）面标号 x 与每条有向边 d，边界 ∂x 在 d 所在的边上等于 x(face d) + x(face d.symm)', '对每个 x，∂x = 0 当且仅当 x 是常数', '∂ 的像等于 G 的简单圈空间'], ['connected simple graph (SimpleGraph) on a finite vertex set with a nonempty set of darts (directed edges)', 'spherical rotation system', 'V − E + F = 2', 'for every ℤ₂ (ZMod 2) labelling x of the faces and every dart d, the boundary ∂x on the edge of d is x(face d) + x(face d.symm)', 'for every x, ∂x = 0 if and only if x is constant', 'the image of ∂ is the simple cycle space of G']]
];
{
  const missing = STATEMENTS.flatMap(([zh, en], k) => [...zh.filter((x) => !greens[k].zh.includes(x)), ...en.filter((x) => !greens[k].en.includes(x))].map((x) => `${greens[k].code}: ${x}`));
  check('the fifteen green boxes state the hypotheses and the conclusions of their theorems, in both languages', STATEMENTS.length === 15 && !missing.length, missing.slice(0, 4).join(' | '));
}
{
  // what left the green boxes: hand derivations in ARGUED, the frame of the computation in MODEL
  const model = boxes.find((b) => b.cls === 'lean model'),
    want = [
      ['dist(o, P) = 2√s', 'ARGUED ①', argued],
      ['xn = cos nθ + sin nθ·i', 'ARGUED ②', argued],
      ['‖x₁ × x₂‖²', 'ARGUED ②', argued],
      ['P 取为 cos θ + sin θ·i|state P is cos θ + sin θ·i', 'MODEL', model],
      ['不检验各条定理的前提|does not check the hypotheses of the theorems', 'MODEL', model]
    ],
    missing = want.filter(([x, , b]) => ['zh', 'en'].some((l, i) => !b[l].includes(x.split('|').length === 2 ? x.split('|')[i] : x))).map(([x, w]) => `${w}: ${x}`);
  check('the derivations by hand and the frame of the computation stand in ARGUED and MODEL, in both languages', !missing.length, missing.join(' | '));
}
/* ---------- the NUM box and the drawer take their numbers from the script: none is written in the sources ---------- */
const BENCH_KEYS = ['err', 'flat', 'axis'];
/** Numbers the page shows in its NUM box, its drawer, its notes or its readouts (their values are computed below). */
const PRINTED = ['126.87', '53.13', '109.47', '35.26', '180.00', '120.00', '4.8990', '1.7889', '0.2000', '25.0000', '297.9', '112.1', '331.6', '0.0047', '0.0031', '1.6439', '1.6447', '1.6449', '0.2940', '8.8204', '6.25%', '6.3%', '100.0', '15624', '81000', '15552', '15625', '10⁻¹', '1.0000', '0.0000'];
{
  const code = sources['main.js'].replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, ''),
    inPage = PRINTED.filter((x) => sources['index.html'].includes(x)),
    inCode = PRINTED.filter((x) => code.includes(x));
  check('static: index.html (its meta description too) holds no number of the NUM box, the drawer or the notes, and no “≈” at all', !inPage.length && !sources['index.html'].includes('≈'), inPage.join(' | '));
  const text = sources['index.html'].replace(/<link[^>]*>/g, ''),
    decimals = [...plain(text).matchAll(/\d+\.\d+/g)].map((m) => m[0]),
    meta = (/<meta name="description" content="([^"]*)"/.exec(text) || ['', '1.0'])[1];
  check('static: the only decimals of index.html are §31.4, the two chips of s and the speed chip; its description has none', decimals.length > 0 && decimals.every((x) => ['31.4', '0.5', '0.80', '0.96'].includes(x)) && !/\d\.\d/.test(meta) && meta.length > 600, decimals.join(' '));
  check('static: the code of main.js holds none of those numbers, and no decimal of four digits or more after the point', code.length > 90000 && !inCode.length && !/\d\.\d{4}/.test(code), inCode.join(' | '));
  check('static: the registry entry holds no decimal of a computed number', !/\d\.\d{2}/.test(entryText.replace(/2026-11-22/g, '')), (entryText.match(/.{0,20}\d\.\d{2}.{0,10}/) || [''])[0]);
  check(
    'static: the NUM box is an empty container, the numbers of the drawer are spans by name in both languages, and the script fills them before it copies the boxes into the drawer',
    sources['index.html'].includes('<div class="lean num" id="numEvidence"><span class="ok">NUM</span><span id="numEvidenceBody"><span class="zh">—</span><span class="en">—</span></span></div>') &&
      same([...sources['index.html'].matchAll(/<span data-bench="(\w+)">—<\/span>/g)].map((m) => m[1]), [...BENCH_KEYS, ...BENCH_KEYS]) &&
      sources['index.html'].split('data-bench=').length === 2 * BENCH_KEYS.length + 1 &&
      ['.innerHTML = keep(numText(say));', 'el.innerHTML = keep(DRAWER[el.dataset.bench](say));'].every((x) => sources['main.js'].split(x).length === 2 && sources['main.js'].indexOf(x) < sources['main.js'].indexOf("$('drawerEvidence').append(")) &&
      sources['index.html'].includes('id="sOut">—</output>') &&
      sources['index.html'].includes('id="nOut">—</output>'),
    JSON.stringify([...sources['index.html'].matchAll(/data-bench="(\w+)"/g)].map((m) => m[1]))
  );
  check('static: the lede of the drawer says in both languages that no computed decimal is in the page file and that a green box states the theorem alone', ['页面文件里不写任何算出来的小数：NUM 框与下面各条里的小数在打开页面时由脚本现算填入，实时读数随每一帧重算（NUM）', 'No computed decimal is written in the page file: the decimals of the NUM box and of the items below are computed by the script when the page opens, and the live readouts again on every frame (NUM)', '绿框只写冻结定理本身的前提与结论', 'A green box states the hypotheses and conclusions of the frozen theorem alone', '这是数值沙盘，不是证明', 'This is a numerical sandbox, not a proof'].every((x) => sources['index.html'].includes(x)) && !/每个数都由页面当场算出|Every number is computed on the page/.test(sources['index.html']));
  check('source: no printed value bypasses the relation layer (no “= ${fmt(…)}”, “≈ ${…}” or bare toFixed in a text)', !/[=≈] ?\$\{(?:fmt|digits|sci|kit\.fix)\(/.test(code) && !/≈ ?\$\{/.test(code) && !/toFixed\(/.test(code.replace(/kit\.fix/g, '')), (code.match(/.{0,40}(?:≈ ?\$\{|toFixed\().{0,40}/) || [''])[0]);
  // the detector finds “≈” beside any inequality sign, an exact side too, and leaves the separated forms
  const found = ['≈ 1.6439 < 1.6449', '0.0031 ≈ x ≤ 1', 'x ≥ ≈ 0.1', 'θ ≈ 22° 时 s > 0', '|·| ≈ 0.0031 < 0.0032', '（值 ≈ 1.5 > 1）', 'Σk<8 ak ≈ 1.2', '≈ 0.0047 （a, b ≤ 12）'].map((x) => mixed(x).length),
    left = ['2√s ≤ 2。值 ≈ 1.7889', 'dist ≈ 1.7889；浮点偏差 < 10⁻¹⁵', 'series ≈ 1.6439, product ≈ 1.6447', 'a, b ≤ 30; the gap ≈ 53.13°', '= 0 ≤ 0'].flatMap(mixed);
  check('the detector of rounded digits beside an inequality sign: eight such texts are found, five separated ones are left', found.length === 8 && found.every((k) => k > 0) && !left.length, JSON.stringify([found, left]));
  const said = [...mixed(plain(sources['index.html'])), ...mixed(meta), ...boxes.flatMap((b) => [...mixed(b.zh), ...mixed(b.en)])];
  check('static text (and the meta description): no rounded digits are a side of an inequality', !said.length, JSON.stringify(said.slice(0, 2)));
}
check('the suite reads no chapter text', !/readFileSync\([^)]*\.md/.test(suite));
{
  // the section cites the five cards in the order of the page and closes with the whole lab, in both languages alike
  const cited = vizCitations(resolveBook(BOOK), ID);
  const seq = (lang) => cited.filter((c) => c.lang === lang).map((c) => c.preset);
  check('citations: both languages cite the five cards in order and end with the whole lab', same(seq('zh'), seq('en')) && same(seq('zh').filter(Boolean), IDS) && seq('zh').at(-1) === null, JSON.stringify(cited));
}
check(
  'two lenses: the exact names of the specification',
  ['弯曲球面与阿代尔本相 · κ / ∏<sub>p</sub> |N|<sub>p</sub> ≡ 1', 'Curved Sphere &amp; Adelic Closure · κ / ∏<sub>p</sub> |N|<sub>p</sub> ≡ 1', '平直实数误差放大轴（MODEL 对照）· x = √(s/(1−s)) → ∞', 'Flat Real Error-Magnification Axis (MODEL) · x = √(s/(1−s)) → ∞'].every((w) => sources['index.html'].includes(w))
);
check('the page has no open problem: no red OPEN box', !/class="lean open"/.test(sources['index.html']));
check(
  'the composition carries coefficient 1 on the cross product, never 2',
  sources['index.html'].includes('(x₁ + x₂ + x₁ × x₂)/(1 − x₁·x₂)') && ![...Object.values(sources)].some((src) => /2\s*x₁\s*×\s*x₂|2\(x₁\s*×\s*x₂\)/.test(src))
);
check(
  'the exactness box does not claim the pentagons, and the count is marked as derived by hand',
  argued.zh.includes('给出 F₅ = 12，与 F₆ 无关；面边界的正合定理不谈五边形') && argued.en.includes('give F₅ = 12, whatever F₆ is; the exactness theorem of the face boundary says nothing about pentagons') && greens.every((b) => !/五边形|pentagon|F₅/i.test(b.zh + b.en))
);
check(
  'the compact phase torus and the hyperbolic geodesics are kept apart, in the evidence and in the drawer',
  (sources['index.html'].match(/SL₂\(ℤ\)\\ℍ²/g) || []).length >= 4 && sources['index.html'].includes('𝕋<sup>∞</sup>')
);

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.REAL_PRIME_DEBUG.state);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => {
    el.value = String(v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
  await settle(p);
}
const seek = (t, p = page) => input('#now', t, p);
async function pause(p = page) {
  await settle(p);
  await p.locator('#play').evaluate((b) => {
    if (b.getAttribute('aria-pressed') === 'true') b.click();
  });
  await settle(p);
}
/** Click a card and wait until it has played up to its still and parked there. */
async function pick(card, p = page) {
  await p.evaluate((id) => document.querySelector(`[data-preset="${id}"]`).click(), card);
  await settle(p);
  const parked = await until(
    p,
    ([id, still]) => {
      const s = window.REAL_PRIME_DEBUG.state;
      return s.preset === id && !s.blending && !s.playing && Math.abs(s.t - still) < 1e-9;
    },
    [card, CARDS[card].still],
    // the clock advances at most 0.1 s per frame: with VIZ_SLOW_FRAMES=1000 a sweep of 6 s takes ~60 frames
    150000
  );
  if (!parked) await pause(p);
  await settle(p);
  return parked;
}
const textOf = async (id, p = page) => (await p.locator('#' + id).innerText()).replaceAll('−', '-');
const tagText = (p = page) => p.locator('.stage .tags .tag:not([hidden])').allInnerTexts();
async function setLang(lang, p = page) {
  await p.click('[data-lang-set="' + lang + '"]');
  await settle(p);
}
async function layout(p, label, figure = false) {
  const view = await stageView(p, '#stage', figure);
  const issues = [...view.layout, ...view.hud, ...(await labelOverlaps(p, '.stage .tag', 0)), ...(await capitalGreek(p))];
  check(label + ' framing and legible labels', !issues.length && (await overflowX(p)) === 0, JSON.stringify(issues));
}

/* ---------- the numbers of the page against the mathematics above ---------- */
await T.goto(BOOK, ID, '?lang=en');
await settle(page);
{
  const s = await state();
  check('the tangent card opens by default, parked on its still', s.preset === DEFAULT && s.scene === 'tangent' && near(s.s, 0.8, 1e-12) && !s.playing && s.lens === 0);
}
const table = await page.evaluate(() => {
  const D = window.REAL_PRIME_DEBUG,
    out = { s: [], N: [] };
  for (let k = 0; k <= 99; k++) out.s.push(D.calc(k / 100));
  for (let n = 1; n <= 30; n++) out.N.push(D.calc(0.5, n).ade);
  return out;
});
const num = (v) => (v === 'Infinity' ? Infinity : v);
{
  const bad = { tangent: [], err: [], slope: [], bound: [], coax: [], orth: [], cheb: [], lag: [] };
  for (const m of table.s) {
    const s = m.tan.s,
      ref = tangentRef(s);
    if (!near(m.tan.theta, ref.theta, 1e-9) || !near(m.tan.x, ref.x, 1e-9 * (1 + ref.x))) bad.tangent.push(s);
    if (!near(m.tan.err, 1 / (1 - s), 1e-9 / (1 - s)) || !near(m.tan.errX, 1 + ref.x * ref.x, 1e-7 * (1 + ref.x ** 2)) || !near(m.tan.kappa, (1 + Math.cos(ref.theta)) / 2, 1e-12)) bad.err.push(s);
    if (s > 0 && !near(m.tan.err / magnification(s), 1, 1e-4)) bad.slope.push([s, m.tan.err, magnification(s)]);
    if (!(m.tan.chord >= 0 && m.tan.chord < 2 && near(m.tan.chord, 2 * Math.sin(ref.theta / 2), 1e-9) && m.tan.theta < PI)) bad.bound.push(s);
    // coaxial: two turns by θ about one axis, as matrices, against the flat coordinate 2x put back on the circle
    const twice = angleOf(mm(turn(E1, ref.theta), turn(E1, ref.theta))),
      exact = (2 * ref.theta) / DEG,
      folded = exact <= 180 ? exact : 360 - exact,
      flat = (2 * Math.atan(2 * ref.x)) / DEG;
    if (!near(twice, folded, 1e-5) || !near(m.rod.coax.exactDeg, exact, 1e-7) || !near(m.rod.coax.flatDeg, flat, 1e-7) || !near(m.rod.coax.gapDeg, exact - flat, 1e-7)) bad.coax.push(s);
    // orthogonal: the product of the two rotation matrices and its own axis
    const R = mm(turn(E1, ref.theta), turn(E2, ref.theta)),
      g = gibbs(R),
      flatV = [0, 1, 2].map((i) => ref.x * (E1[i] + E2[i]));
    const cosAxis = s > 0 ? dot(g, flatV) / (norm(g) * norm(flatV)) : 1;
    if (norm(sub(m.rod.orth.exact, g)) > 1e-6 * (1 + norm(g)) || norm(sub(m.rod.orth.flat, flatV)) > 1e-7 * (1 + ref.x) || m.rod.orth.formulaGap > 1e-9 * (1 + norm(g)) || !near(m.rod.orth.axisDeg, Math.acos(Math.min(1, cosAxis)) / DEG, 2e-4) || m.rod.orth.normGap > 1e-9 * (1 + ref.x ** 2) ** 2) bad.orth.push([s, m.rod.orth, g]);
    // n equal steps on the circle: cos nθ by the angle, the heap by products, T_n by its recurrence
    if (!m.rod.cheb.steps.every((q) => near(q.cos, Math.cos(q.n * ref.theta), 1e-7) && near(q.T, Math.cos(q.n * ref.theta), 1e-7) && near(q.flat, q.n * ref.x, 1e-7 * (1 + q.flat))) || m.rod.cheb.steps.length !== 9 || m.rod.cheb.chebGap > 1e-9 || m.rod.cheb.closedGap > 1e-9 || m.rod.cheb.normGap > 1e-9) bad.cheb.push(s);
    const I = m.instances;
    if (!near(I.lagrange.left, ref.x ** 4, 1e-6 * (1 + ref.x ** 4)) || !near(I.lagrange.left, I.lagrange.right, 1e-9 * (1 + ref.x ** 4)) || Math.abs(I.cross.scalar) > 1e-9 * (1 + ref.x ** 2) || I.cross.gap > 1e-9 * (1 + ref.x ** 2) || I.model.gap > 1e-9 || I.model.sGap > 1e-9) bad.lag.push(s);
  }
  for (const [k, what] of [
    ['tangent', 'x = tan(θ/2) is where the line from the antipode meets the tangent'],
    ['err', 'A_err = 1/(1 − s) = 1 + x² = 1/κ'],
    ['slope', 'A_err is 2 dx/dθ of the projection'],
    ['bound', 'the arc stays below π and the chord below 2'],
    ['coax', 'the coaxial sum turns 2θ, the flat sum 2 arctan 2x'],
    ['orth', 'the composition (x₁ + x₂ + x₁ × x₂)/(1 − x₁·x₂) is the product of the two rotation matrices'],
    ['cheb', 'n equal steps stay on the circle, T_n(cos θ) = cos nθ'],
    ['lag', 'Lagrange identity, cross product, κ = 1 − dist²/4']
  ])
    check(`s = 0 … 0.99: ${what}`, bad[k].length === 0, JSON.stringify(bad[k].slice(0, 2)));
  const at = (s) => table.s[Math.round(100 * s)];
  check('s = 0: x = 0, A_err = 1, no gap anywhere', at(0).tan.x === 0 && at(0).tan.err === 1 && at(0).rod.coax.gapDeg === 0 && at(0).rod.orth.axisDeg === 0);
  check('s = 1/2: x = 1 and A_err = 2; coaxial 180° against 126.87°, gap 53.13° = arccos(3/5)', near(at(0.5).tan.x, 1, 1e-12) && near(at(0.5).tan.err, 2, 1e-12) && at(0.5).rod.coax.antipode && num(at(0.5).rod.coax.gibbs) === Infinity && near(at(0.5).rod.coax.exactDeg, 180, 1e-9) && f2(at(0.5).rod.coax.flatDeg) === '126.87' && near(at(0.5).rod.coax.gapDeg, Math.acos(3 / 5) / DEG, 1e-9) && f2(at(0.5).rod.coax.gapDeg) === '53.13');
  check('s = 1/2: the orthogonal pair turns 120° about (1, 1, 1)/√3, the flat sum 109.47°, the axis is off by 35.26°', near(at(0.5).rod.orth.exactDeg, 120, 1e-9) && f2(at(0.5).rod.orth.flatDeg) === '109.47' && near(at(0.5).rod.orth.axisDeg, Math.atan(1 / Math.SQRT2) / DEG, 1e-9) && f2(at(0.5).rod.orth.axisDeg) === '35.26');
  check('s = 0.80 and 0.96: x = 2 and 4.8990, A_err = 5 and 25', f4(at(0.8).tan.x) === '2.0000' && f4(at(0.8).tan.err) === '5.0000' && f4(at(0.96).tan.x) === '4.8990' && f4(at(0.96).tan.err) === '25.0000' && f2(at(0.8).tan.gapDeg) === '53.13');
  check('A_err grows without bound while the chord does not: s = 0.99 has 100 and 1.9900', f4(at(0.99).tan.err) === '100.0000' && f4(at(0.99).tan.chord) === '1.9900');
}
{
  const bad = [];
  for (const A of table.N) {
    const f = factor(A.N),
      prime = PRIMES.includes(A.N);
    const rows = PRIMES.map((p) => ({ p, v: f[p] || 0 }));
    const back = A.hops.reduce((acc, h) => (h.from === acc && h.from / h.p === h.to ? h.to : NaN), A.N);
    const factors = Object.entries(f).reduce((n, [, v]) => n + v, 0);
    const ok =
      adelicFraction(A.N) &&
      A.product === 1 &&
      Math.abs(A.logSum) < 1e-12 &&
      A.isPrime === prime &&
      A.rows.every((r, i) => r.p === rows[i].p && r.v === rows[i].v && r.den === r.p ** r.v && near(r.abs * r.den, 1, 1e-12) && r.residue === A.N % r.p && r.born === r.p <= A.N) &&
      same(A.blind, PRIMES.filter((p) => p <= A.N && A.N % p !== 0)) &&
      A.hops.length === factors &&
      (A.N === 1 ? A.end === 1 && !A.hops.length : back === 1 && A.end === 1) &&
      (!prime || (A.hops.length === 1 && A.hops[0].p === A.N && A.blind.length === PRIMES.filter((p) => p < A.N).length));
    if (!ok) bad.push(A.N);
    // the escape: remainder 1 at every prime of the list, and q a prime divisor outside it
    const S = PRIMES.filter((p) => p < A.N),
      value = S.reduce((a, b) => a * BigInt(b), 1n) + 1n,
      q = BigInt(A.euclid.q);
    let isPrime = q > 1n;
    for (let d = 2n; d * d <= q; d++) if (q % d === 0n) isPrime = false;
    if (!(same(A.euclid.S, S) && BigInt(A.euclid.value) === value && A.euclid.residues.every((r) => r === 1) && value % q === 0n && isPrime && !S.includes(A.euclid.q))) bad.push('escape ' + A.N);
  }
  check('N = 1 … 30: |N|_∞ ∏_p |N|_p = 1 exactly, valuations, blind rings, hops back to the unit, and the escaping prime', bad.length === 0, JSON.stringify(bad));
  const A = (n) => table.N[n - 1];
  check('N = 5: the rings 2 and 3 are blind, one hop of 1/5; N = 6: no new ring, 1/2 and 1/3; N = 12: 1/4 and 1/3', same(A(5).blind, [2, 3]) && same(A(5).hops, [{ p: 5, from: 5, to: 1 }]) && !A(6).isPrime && same(A(6).active.map((r) => [r.p, r.den]), [[2, 2], [3, 3]]) && same(A(12).active.map((r) => [r.p, r.den]), [[2, 4], [3, 3]]));
  check('N = 5: the primes below it give 2·3 + 1 = 7, a prime outside the list (the theorem does not name 5)', A(5).euclid.value === 7 && A(5).euclid.q === 7);
  check('N = 1: no prime is born, no hop, product 1', A(1).born.length === 0 && A(1).hops.length === 0 && A(1).product === 1 && A(1).echoes.length === 0);
}
{
  const { cage, constants, fixed } = await page.evaluate(() => ({ cage: REAL_PRIME_DEBUG.cage, constants: REAL_PRIME_DEBUG.constants, fixed: REAL_PRIME_DEBUG.state.instances.fixed }));
  const edges = new Map();
  cage.faces.forEach((f, k) => f.forEach((a, i) => {
    const b = f[(i + 1) % f.length],
      key = [a, b].sort((x, y) => x - y).join('-');
    edges.set(key, [...(edges.get(key) || []), k]);
  }));
  const degree = cage.verts.map((_, v) => [...edges.keys()].filter((e) => e.split('-').map(Number).includes(v)).length);
  const planar = cage.faces.every((f) => {
    const [a, b, c] = f.map((i) => cage.verts[i]),
      u = sub(b, a),
      w = sub(c, a),
      n = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]];
    return f.every((i) => Math.abs(dot(n, sub(cage.verts[i], a))) < 1e-9);
  });
  // the kernel of the face boundary over the two-element field: one dimension for each connected piece of the dual graph
  const root = cage.faces.map((_, i) => i),
    find = (i) => (root[i] === i ? i : find(root[i]));
  for (const fs2 of edges.values()) if (fs2.length === 2) root[find(fs2[0])] = find(fs2[1]);
  const pieces = new Set(cage.faces.map((_, i) => find(i))).size;
  const F5 = cage.faces.filter((f) => f.length === 5).length,
    F6 = cage.faces.filter((f) => f.length === 6).length;
  check(
    'the cage: 60 vertices on the sphere, 90 edges between two faces each, 12 pentagons and 20 hexagons, every vertex with three edges, V − E + F = 2',
    cage.verts.length === 60 && edges.size === 90 && [...edges.values()].every((x) => x.length === 2) && F5 === 12 && F6 === 20 && F5 + F6 === cage.faces.length && degree.every((d) => d === 3) && planar && cage.verts.every((v) => near(norm(v), 1, 1e-12)) && 60 - 90 + cage.faces.length === 2,
    JSON.stringify({ V: cage.verts.length, E: edges.size, F5, F6 })
  );
  check('the count Σ(6 − n)Fₙ = 12 and the boundary rank 31 = F − 1 = E − V + 1 with a one-dimensional kernel', fixed.cage.count === 12 && 5 * F5 + 6 * F6 === 2 * edges.size && pieces === 1 && fixed.cage.rank === cage.faces.length - pieces && fixed.cage.rank === edges.size - cage.verts.length + 1 && fixed.cage.kernel === 1);
  check('constants: 30 integers, 50 turns at the still, 8 cells for each phase', constants.N_MAX === 30 && constants.S_MAX === 0.99 && Math.floor(constants.STILL5 / TAU) === LAPS && constants.CELLS === 8 && constants.TAU5 === 377 && constants.TAU5 > TAU * 60 && constants.GRID === 10000 && constants.TICK === 100 && same([1, 2, 3, 4, 5].map((k) => constants['STILL' + k]), IDS.map((id) => CARDS[id].still)));
  // the phases: cells met, by stepping over the crossings, at several times
  const times = [0, 1, TAU, 40, 150.5, TAU * LAPS, TAU * 60];
  const orbits = await page.evaluate((ts) => ts.map((t) => REAL_PRIME_DEBUG.calc(0.5, 1, t).orb5), times);
  const wrong = orbits.filter((o, i) => {
    const log = cellsMet(LOGS, times[i]).size,
      ratio = cellsMet([1, 2, 3], times[i]).size;
    return o.logCells !== log || o.ratioCells !== ratio || o.total !== 512 || o.laps !== Math.floor(times[i] / TAU + 1e-9) || !o.log.every((a, k) => Math.cos(a - LOGS[k] * times[i]) > 1 - 1e-9) || !o.ratio.every((a, k) => Math.cos(a - (k + 1) * times[i]) > 1 - 1e-9);
  });
  check('cells met by ln 2 : ln 3 : ln 5 and by 1 : 2 : 3, at seven times', wrong.length === 0, JSON.stringify(wrong.map((o) => [o.tau, o.logCells, o.ratioCells])));
  const last = orbits[5];
  check('after 50 turns the prime logarithms have met all 512 cells, the rational beat 32 (6.3%) at any time', last.logCells === 512 && last.ratioCells === 32 && f2(100 * last.ratioShare) === '6.25' && cellsMet([1, 2, 3], TAU * 60).size === 32);
  // dense sampling never meets a cell the crossing list does not know
  const met = cellsMet(LOGS, 60);
  let stray = 0;
  for (let k = 0; k < 60000; k++) {
    const t = k * 0.001;
    if (!met.has(LOGS.map((x) => Math.floor(((((x * t) % TAU) / TAU) * 8)) % 8).join(','))) stray++;
  }
  check('dense sampling of the orbit stays inside the cells of the crossing list', stray === 0, String(stray));
  // the rational loop closes after 2π; the prime logarithms would need ln 2/ln 3 rational
  const back = await page.evaluate((t) => REAL_PRIME_DEBUG.calc(0.5, 1, t).orb5, TAU);
  check('1 : 2 : 3 is back at its start after 2π, ln 2 : ln 3 : ln 5 is not', back.ratio.every((a) => Math.cos(a) > 1 - 1e-12) && back.log.some((a) => Math.cos(a) < 0.999));
  // independence in big integers, over the same box
  let zeros = 0,
    vectors = 0,
    least = Infinity;
  const pow = (b, e) => b ** BigInt(Math.abs(e));
  for (let a = -12; a <= 12; a++)
    for (let b = -12; b <= 12; b++)
      for (let c = -12; c <= 12; c++) {
        if (!a && !b && !c) continue;
        vectors++;
        const up = [[2n, a], [3n, b], [5n, c]].filter(([, e]) => e > 0).reduce((m, [q, e]) => m * pow(q, e), 1n),
          down = [[2n, a], [3n, b], [5n, c]].filter(([, e]) => e < 0).reduce((m, [q, e]) => m * pow(q, e), 1n);
        if (up === down) zeros++;
        least = Math.min(least, Math.abs(Math.log(Number(up)) - Math.log(Number(down))));
      }
  check('no nonzero integer combination up to 12 vanishes; the closest is 2⁶·3⁵ against 5⁶', zeros === 0 && fixed.independence.zeros === 0 && fixed.independence.vectors === vectors && vectors === 15624 && near(fixed.independence.least, Math.log(15625 / 15552), 1e-12) && near(least, fixed.independence.least, 1e-9) && same(fixed.independence.witness.map(Math.abs), [6, 5, 6]));
  // the other instances
  const digits = (n, p) => Array.from({ length: 6 }, (_, k) => Math.floor(n / p ** k) % p);
  let broken = 0,
    triples = 0;
  for (const p of [2, 3, 5]) {
    const d = (x, y) => {
      const a = digits(x, p),
        b = digits(y, p);
      let k = 0;
      while (k < 6 && a[k] === b[k]) k++;
      return 6 - k;
    };
    for (let x = 1; x <= 30; x++) for (let y = 1; y <= 30; y++) for (let z = 1; z <= 30; z++) {
      triples++;
      if (d(x, z) > Math.max(d(x, y), d(y, z))) broken++;
    }
  }
  check('refined readings: 81000 triples of base-p digits, no broken strong triangle inequality', broken === 0 && fixed.ultrametric.violations === 0 && fixed.ultrametric.triples === triples && triples === 81000);
  check('observation distance on 300 pairs, eleven absolute values in 55 separated pairs, 900 fractions with product 1', fixed.observe.pairs === 300 && fixed.observe.equal === 300 && fixed.ostrowski.values === 11 && fixed.ostrowski.pairs === 55 && fixed.ostrowski.separated === 55 && fixed.product.fractions === 900 && fixed.product.balanced === 900 && fixed.product.gap < 1e-12);
  let sum = 0,
    product = 1;
  for (let n = 1000; n >= 1; n--) sum += 1 / (n * n);
  for (let n = 2; n <= 1000; n++) {
    let p = true;
    for (let d = 2; d * d <= n; d++) if (n % d === 0) p = false;
    if (p) product *= (n * n) / (n * n - 1);
  }
  check('Euler product at s = 2 cut at 1000: series 1.6439, product 1.6447, limit 1.6449', near(fixed.euler.sum, sum, 1e-12) && near(fixed.euler.product, product, 1e-9) && f4(sum) === '1.6439' && f4(product) === '1.6447' && f4(fixed.euler.limit) === '1.6449' && sum < product && product < fixed.euler.limit);
  const ks = [[1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, -1], [2, -1, 0]];
  check(
    'equidistribution: five character averages over 1000 powers in closed form, all below 0.0032; the rational relation stays at 1',
    fixed.equi.n === 1000 && fixed.equi.log.every((v, i) => near(v, geometric(TAU * dot(ks[i], LOGS), 1000), 1e-9) && v < 0.0032) && near(fixed.equi.rationalTrivial, 1, 1e-12) && fixed.equi.rationalFree < 1e-9
  );
  check('closure: the rational element keeps (2, −1, 0) and (3, 0, −1); the point (1, −1, 1) breaks the first', same(fixed.closure.kept, [true, true]) && fixed.closure.broken === -1 && same(fixed.closure.relations, [[2, -1, 0], [3, 0, -1]]) && fixed.closure.relations.every((k) => near(Math.cos(dot(k, [1, 2, 3]) * (TAU / 8)), 1, 1e-12)) && near(Math.cos(dot([2, -1, 0], [0, PI, 0])), -1, 1e-12));
  check('prime count up to 30 and the two mean densities', fixed.density.count === PRIMES.length && near(fixed.density.linear, 1 / Math.log(30), 1e-12) && near(fixed.density.log, 30 / Math.log(30), 1e-12));
}

/* ---------- the relation before every printed value, on the whole grid of s, of τ, of the cells and of N ---------- */
{
  const said = await page.evaluate(() => {
    const D = REAL_PRIME_DEBUG.said,
      out = { s: [], tau: [], share: [], log: [] };
    for (let k = 0; k <= 9900; k++) out.s.push(D.s(k / 10000));
    for (let k = 0; k <= 1200; k++) out.tau.push(D.tau(k / 100));
    for (let k = 0; k <= 512; k++) out.share.push([D.share(k, 512), D.share(k, 512, 2)]);
    for (let n = 1; n <= 30; n++) out.log.push(D.log(n));
    return out;
  });
  const bad = [],
    exactAngles = {};
  const judge = (what, text, v, o, unit = '') => {
    const m = new RegExp(`^([=≈]) (${NUM})${unit}$`).exec(text),
      why = m ? relationBad(m[1], m[2], v, o) : 'text';
    if (why) bad.push(`${what}: ${text} [${why}]`);
    return m && m[1] === '=';
  };
  said.s.forEach((t, k) => {
    const S = BigInt(k),
      G = 10000n,
      R = G - S,
      v = k / 10000,
      y = k / (10000 - k),
      x = Math.sqrt(y),
      theta = (2 * Math.atan(x)) / DEG,
      flat = (2 * Math.atan(2 * x)) / DEG,
      angles = { theta, left: 180 - theta, turn: 2 * theta, flat, gap: 2 * theta - flat, both: (2 * Math.acos((10000 - k) / 10000)) / DEG, bothFlat: (2 * Math.atan(Math.SQRT2 * x)) / DEG, axis: Math.atan(x / Math.SQRT2) / DEG };
    judge('s', t.s, v, { q: [S, G] });
    judge('κ', t.kappa, 1 - v, { q: [R, G] });
    judge('A_err', t.err, 10000 / (10000 - k), { q: [G, R] });
    judge('x', t.x, x, { q: [S, R], root: true });
    judge('x + x', t.double, 2 * x, { q: [4n * S, R], root: true });
    judge('dist', t.dist, 2 * Math.sqrt(v), { q: [4n * S, G], root: true });
    judge('1 − x₁·x₂', t.denom, 1 - y, { q: [R - S, R] });
    judge('x⁴', t.fourth, y * y, { q: [S * S, R * R] });
    if (k) judge('scale', t.scale, 200 / Math.sqrt(2 * y + y * y), { q: [40000n * R * R, S * (2n * R + S)], root: true }, '%');
    for (const [name, a] of Object.entries(angles)) if (judge(name, t[name], a, {}, '°')) (exactAngles[name] = exactAngles[name] || []).push(k);
  });
  check(`s = 0 … 0.99 in steps of 1/10000: every one of ${said.s.length * 17 - 1} printed values stands after “=” exactly when its digits are the value (fractions, squares and angles recomputed here)`, said.s.length === 9901 && !bad.length, bad.slice(0, 4).join(' | '));
  check('the exact angles of the grid: θ, 180° − θ and 2θ at s = 0, 1/4, 1/2, 3/4; the flat sum at 0 and 1/5; the gap at 0; the two orthogonal turns at 0 and 1/2, their flat sum at 0 and 3/5; the axis at 0 and 2/5', same(exactAngles, { theta: [0, 2500, 5000, 7500], left: [0, 2500, 5000, 7500], turn: [0, 2500, 5000, 7500], flat: [0, 2000], gap: [0], both: [0, 5000], bothFlat: [0, 6000], axis: [0, 4000] }), JSON.stringify(exactAngles));
  bad.length = 0;
  said.tau.forEach((t, k) => {
    judge('τ', t.tau, k / 100, { q: [BigInt(k), 100n] });
    t.phases.forEach((text, i) => {
      const v = ((((k / 100) * LOGS[i]) % TAU) / DEG + 360) % 360,
        m = new RegExp(`^([=≈]) (${NUM})°$`).exec(text);
      if (!m || (m[1] === '=') !== (k === 0) || !(Math.abs(numberOf(m[2]) - v) <= 0.05 + 1e-9) || (k && numberOf(m[2]) === 0)) bad.push(`τ = ${k / 100}, ln ${[2, 3, 5][i]}: ${text} [${v}]`);
    });
  });
  check('τ = 0 … 12 in steps of 1/100: “=” before τ and before the phases at τ = 0 alone, “≈” before every other phase', said.tau.length === 1201 && !bad.length, bad.slice(0, 4).join(' | '));
  said.share.forEach(([one, two], k) => {
    judge('share', one, (100 * k) / 512, { q: [BigInt(100 * k), 512n] }, '%');
    judge('share', two, (100 * k) / 512, { q: [BigInt(100 * k), 512n] }, '%');
  });
  said.log.forEach((t, i) => judge('ln', t, Math.log(i + 1), i ? {} : { q: [0n, 1n] }));
  check('shares of 512 cells (32/512 is ≈ 6.3% and = 6.25%, 512/512 is = 100.0%) and ln 1 … ln 30', !bad.length && same(said.share[32], ['≈ 6.3%', '= 6.25%']) && said.share[512][0] === '= 100.0%' && said.log[0] === '= 0.0000' && said.log.slice(1).every((t) => t.startsWith('≈ ')), bad.slice(0, 4).join(' | '));
  // the drifts: the least power of ten above them, as fractions
  let seed = 20261123;
  const rand = () => (seed = (seed * 48271) % 2147483647) / 2147483647,
    xs = [0, 1e-15, 1e-14, 9.999999999999999e-16, 1.0000000000000001e-15, 5e-324, 1, 0.5, 2.220446049250313e-16];
  for (let k = 0; k < 2000; k++) xs.push(10 ** (-18 * rand() - 8));
  const below = await page.evaluate((list) => list.map((x) => REAL_PRIME_DEBUG.said.below(x)), xs);
  const wrong = xs.filter((x, i) => {
    const m = /^&lt; 10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+)$/.exec(below[i]);
    if (x === 0) return below[i] !== '= 0';
    if (!m) return true;
    const e = Number([...m[1]].map((c) => (c === '⁻' ? '-' : SUP.indexOf(c))).join('')),
      [p, q] = doubleN(x),
      under = (k) => (k < 0 ? p * 10n ** BigInt(-k) < q : p < q * 10n ** BigInt(k));
    return !under(e) || under(e - 1);
  });
  check(`drifts: “= 0” of 0 alone, else “<” the least power of ten above the double, on ${xs.length} numbers`, !wrong.length, wrong.slice(0, 3).join(' '));
}
/* ---------- the NUM box and the drawer, as the page has filled them ---------- */
const textsOfFrame = { s: [4, 5], coax: [1, 2], chips: [[0, 1], [1, 2], [4, 5], [24, 25]], N: 5, tau: 7.5, cheb: 8, cells: 8, horizon: 6, cut: 1000, range: 12, avg: 1000, laps: 50, nmax: 30 };
/** The phrases of the NUM box and the spans of the drawer for a frame, from the mathematics of this suite alone. */
function expectedBench(lang, f) {
  const zh = lang === 'zh',
    list = zh ? '、' : ', ';
  const ratT = (p2, q2, d = 4) => {
    const t = (p2 / q2).toFixed(d).replace('-', '−'),
      [n, m] = decimalN(t);
    return `${n * BigInt(q2) === BigInt(p2) * m ? '=' : '≈'} ${t}`;
  };
  const rootT = (p2, q2, d = 4) => {
    const t = Math.sqrt(p2 / q2).toFixed(d),
      [n, m] = decimalN(t);
    return `${n * n * BigInt(q2) === BigInt(p2) * m * m ? '=' : '≈'} ${t}`;
  };
  const angT = (v, d = 2) => `${Math.abs(Number(v.toFixed(d)) - v) < 1e-9 ? '=' : '≈'} ${v.toFixed(d)}°`;
  const bare = (t) => (t.startsWith('= ') ? t.slice(2) : t);
  const aboutT = (v, d = 4) => `≈ ${v.toFixed(d)}`;
  const all = (n) => (zh ? `${n} 条全部成立` : `all ${n} hold`);
  const pct = (k, n, d) => `${ratT(100 * k, n, d)}%`;
  const ledger = (n) => [n, ...Object.entries(factor(n)).map(([q2, v]) => `1/${q2 ** v}`)].join(' × ');
  const err = f.chips.map(([p2, q2]) => (zh ? `s = ${fracOf(p2, q2)} 时 x ${rootT(p2, q2 - p2)}、Aerr ${ratT(q2, q2 - p2)}` : `at s = ${fracOf(p2, q2)}, x ${rootT(p2, q2 - p2)} and Aerr ${ratT(q2, q2 - p2)}`)).join(zh ? '；' : '; ');
  // the two compositions at s = p/q: y = p/(q − p)
  const [cp, cq] = f.coax,
    x = Math.sqrt(cp / (cq - cp)),
    curved = (4 * Math.atan(x)) / DEG,
    flat = (2 * Math.atan(2 * x)) / DEG,
    axis = Math.atan(x / Math.SQRT2) / DEG,
    both = (2 * Math.acos(1 - cp / cq)) / DEG,
    bothFlat = (2 * Math.atan(Math.SQRT2 * x)) / DEG,
    // cos(2θ − φ) with cos θ = (q − 2p)/q, cos φ = (q − 5p)/(q + 3p) and sin 2θ sin φ = 16 p(q − 2p)(q − p)/(q²(q + 3p))
    gapCos = fracOf((2 * (cq - 2 * cp) ** 2 - cq ** 2) * (cq - 5 * cp) + 16 * cp * (cq - 2 * cp) * (cq - cp), cq ** 2 * (cq + 3 * cp)),
    axisCos = fracOf(2 * cq - 3 * cp, 2 * cq - cp);
  const S = PRIMES.filter((q2) => q2 < f.N),
    value = S.reduce((a, b) => a * b, 1) + 1;
  let q = 2;
  while (value % q) q++;
  let sum = 0,
    product = 1;
  for (let n = f.cut; n >= 1; n--) sum += 1 / (n * n);
  for (let n = 2; n <= f.cut; n++) {
    let prime = true;
    for (let d = 2; d * d <= n; d++) if (n % d === 0) prime = false;
    if (prime) product *= (n * n) / (n * n - 1);
  }
  // the closest integer combination of ln 2, ln 3, ln 5
  let least = Infinity,
    pair = null,
    zeros = 0;
  for (let a = -f.range; a <= f.range; a++)
    for (let b = -f.range; b <= f.range; b++)
      for (let c = -f.range; c <= f.range; c++) {
        if (!a && !b && !c) continue;
        const sides = [1, -1].map((sg) => [[2, sg * a], [3, sg * b], [5, sg * c]].filter(([, e]) => e > 0)),
          [u, v] = sides.map((g) => g.reduce((m, [q2, e]) => m * BigInt(q2) ** BigInt(e), 1n));
        if (u === v) zeros++;
        const l = Math.abs(Math.log(Number(u)) - Math.log(Number(v)));
        if (u < v && l < least - 1e-12) [least, pair] = [l, sides.map((g, i) => `${g.map(([q2, e]) => q2 + (e > 1 ? superOf(e) : '')).join('·') || '1'} = ${[u, v][i]}`)];
      }
  const best = Math.max(...[[1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, -1], [2, -1, 0]].map((k) => geometric(TAU * dot(k, LOGS), f.avg)));
  const total = f.cells ** 3,
    ratio = cellsMet([1, 2, 3], TAU * f.laps, f.cells).size,
    logs = cellsMet(LOGS, TAU * f.laps, f.cells).size,
    phases = LOGS.map((l) => aboutT(((((f.tau * l) % TAU) / DEG) + 360) % 360, 1) + '°').join(list),
    [ap, aq] = f.s;
  const shown = [f.N, 6, 12].map((n) => `${ledger(n)} = 1`).join(list);
  const spans = { err, flat: bare(angT(flat)), axis: bare(angT(axis)) };
  const phrases = zh
    ? [
        `切线放大：${err}。`,
        `s = k/100，k = 0 … 99`,
        `s = ${fracOf(ap, aq)} 时 dist ${rootT(4 * ap, aq)}，κ ${ratT(aq - ap, aq)}。`,
        `只用乘法到 n = ${f.cheb}`,
        `合成（s = ${fracOf(cp, cq)}，x ${rootT(cp, cq - cp)}）：同轴弯曲 ${bare(angT(curved))}，平直 ${bare(angT(flat))}，差 arccos(${gapCos}) ${angT(curved - flat)}；正交弯曲 ${bare(angT(both))}，平直 ${bare(angT(bothFlat))}，转轴偏 ½ arccos(${axisCos}) ${angT(axis)}；`,
        `½(x₁x₂ − x₂x₁) 的标量部分 = 0，`,
        `s = ${fracOf(cp, cq)} 时两边都是 x⁴ ${ratT(cp * cp, (cq - cp) ** 2)}；`,
        `共 ${PRIMES.length + 1} 个，由 |p|p < 1 逐对分开，${all((PRIMES.length * (PRIMES.length + 1)) / 2)}。`,
        `N = 1 … ${f.nmax} 用整数逐次除尽后乘积等于 1，${all(f.nmax)}（${shown}）；`,
        `分数 a/b（a、b = 1 … ${f.nmax}）用整数核对，${all(f.nmax ** 2)}；`,
        `比较，${all(f.nmax * PRIMES.length)}。`,
        `视界 ${f.horizon}），x、y、z = 1 … ${f.nmax}，${all(3 * f.nmax ** 3)}。`,
        `N = ${f.N}，S = {${S.join(', ')}}，${S.join('·')} + 1 = ${value}，它对 S 中素数的余数是 1，q = ${q}（定理不说 N 本身就是那个新素数）。`,
        `s = 2，截到 ${f.cut}，级数 ${aboutT(sum)}，乘积 ${aboutT(product)}，π²/6 ${aboutT((PI * PI) / 6)}。`,
        `绝对值不超过 ${f.range} 的 ${(2 * f.range + 1) ** 3 - 1} 组非零整系数里使 2a3b5c = 1 的有 ${zeros} 组（用整数比较）；最接近的是 ${pair[0]} 对 ${pair[1]}，|a ln 2 + b ln 3 + c ln 5| ${aboutT(least)}。`,
        `ζ = e2πi/${f.cells}，k = (2, −1, 0) 与 (3, 0, −1) 的特征在 g 上等于 1，${all(2)}，前一条在点 (1, −1, 1) 上等于 −1，`,
        `N = ${f.avg}，5 个非平凡特征平均的最大模 ${aboutT(best)}。`,
        `V − E + F = 60 − 90 + 32 = 2，F₅ = 12，F₆ = 20，𝔽₂ 上边界的秩是 31 = F − 1 = E − V + 1，核维数是 1。`,
        `τ = ${f.tau.toFixed(2)} 时 3 只环转到 ${phases}。`,
        `${total} 个相位格里，到 ${f.laps} 圈为止 1 : 2 : 3 到过 ${ratio}/${total} ${pct(ratio, total, 2)}，ln 2 : ln 3 : ln 5 到过 ${logs}/${total} ${pct(logs, total, 2)}；`
      ]
    : [
        `Tangent magnification: ${err}. `,
        `s = k/100, k = 0 … 99`,
        `at s = ${fracOf(ap, aq)}, dist ${rootT(4 * ap, aq)} and κ ${ratT(aq - ap, aq)}. `,
        `by products alone to n = ${f.cheb}`,
        `Composition (s = ${fracOf(cp, cq)}, x ${rootT(cp, cq - cp)}): coaxial curved ${bare(angT(curved))}, flat ${bare(angT(flat))}, gap arccos(${gapCos}) ${angT(curved - flat)}; orthogonal curved ${bare(angT(both))}, flat ${bare(angT(bothFlat))}, axis off by ½ arccos(${axisCos}) ${angT(axis)}; `,
        `the scalar part of ½(x₁x₂ − x₂x₁) = 0, `,
        `at s = ${fracOf(cp, cq)} both sides are x⁴ ${ratT(cp * cp, (cq - cp) ** 2)}; `,
        `are ${PRIMES.length + 1}, separated pair by pair by |p|p < 1, ${all((PRIMES.length * (PRIMES.length + 1)) / 2)}. `,
        `N = 1 … ${f.nmax} divided out in whole numbers leaves the product 1, ${all(f.nmax)} (${shown}); `,
        `the fractions a/b (a, b = 1 … ${f.nmax}) in whole numbers, ${all(f.nmax ** 2)}; `,
        `against −vp(N), ${all(f.nmax * PRIMES.length)}. `,
        `horizon ${f.horizon}), x, y, z = 1 … ${f.nmax}, ${all(3 * f.nmax ** 3)}. `,
        `N = ${f.N}, S = {${S.join(', ')}}, ${S.join('·')} + 1 = ${value}, its remainder at the primes of S is 1, q = ${q} (the theorem does not say that N itself is the new prime). `,
        `s = 2, cut at ${f.cut}, series ${aboutT(sum)}, product ${aboutT(product)}, π²/6 ${aboutT((PI * PI) / 6)}. `,
        `of the ${(2 * f.range + 1) ** 3 - 1} nonzero integer vectors with entries up to ${f.range}, ${zeros} give 2a3b5c = 1 (compared in whole numbers); the closest is ${pair[0]} against ${pair[1]}, |a ln 2 + b ln 3 + c ln 5| ${aboutT(least)}. `,
        `ζ = e2πi/${f.cells}, the characters of k = (2, −1, 0) and (3, 0, −1) are 1 on g, ${all(2)}, and the first is −1 at the point (1, −1, 1), `,
        `N = ${f.avg}, the largest modulus among the averages of 5 nontrivial characters ${aboutT(best)}. `,
        `V − E + F = 60 − 90 + 32 = 2, F₅ = 12, F₆ = 20, the boundary over 𝔽₂ has rank 31 = F − 1 = E − V + 1 and a kernel of dimension 1. `,
        `at τ = ${f.tau.toFixed(2)} the 3 rings stand at ${phases}. `,
        `of the ${total} phase cells, up to ${f.laps} turns 1 : 2 : 3 has met ${ratio}/${total} ${pct(ratio, total, 2)} and ln 2 : ln 3 : ln 5 has met ${logs}/${total} ${pct(logs, total, 2)}; `
      ];
  return { spans, phrases };
}
/** The audit of a page: the box, its copy in the drawer and the spans of the drawer against the numbers computed here. */
async function auditBench(p, f) {
  const seen = await p.evaluate(() => ({
      box: Object.fromEntries(['zh', 'en'].map((l) => [l, document.querySelector('#basis .lean.num .' + l).textContent.replace(/\s+/g, ' ').trim()])),
      copy: Object.fromEntries(['zh', 'en'].map((l) => [l, document.querySelector('#drawerEvidence .lean.num .' + l).textContent.replace(/\s+/g, ' ').trim()])),
      spans: Object.fromEntries(['zh', 'en'].map((l) => [l, [...document.querySelectorAll(`#drawer .${l} [data-bench]`)].map((e) => [e.dataset.bench, e.textContent.replace(/\s+/g, ' ')])])),
      bench: window.REAL_PRIME_DEBUG.bench(),
      twice: [...document.querySelectorAll('[id]')].map((e) => e.id).filter((x, i, a) => a.indexOf(x) !== i),
      green: [...document.querySelectorAll('#basis .lean')].filter((e) => e.className === 'lean').map((e) => e.textContent.replace(/\s+/g, ' ').trim()),
      greenCopy: [...document.querySelectorAll('#drawerEvidence .lean')].filter((e) => e.className === 'lean').map((e) => e.textContent.replace(/\s+/g, ' ').trim())
    })),
    bad = [];
  if (!same(seen.box, seen.copy) || seen.green.length !== 15 || !same(seen.green, seen.greenCopy)) bad.push('the copies in the drawer');
  if (seen.twice.length) bad.push('ids twice: ' + seen.twice.join(' '));
  for (const lang of ['zh', 'en']) {
    const { spans, phrases } = expectedBench(lang, f),
      text = seen.box[lang] + ' ';
    bad.push(...phrases.filter((x) => text.split(x).length !== 2).map((x) => `${lang} box: ${x}`));
    if (/—|undefined|NaN|null|∞\D|Infinity/.test(text.replace(/\|·\|∞/g, ''))) bad.push(`${lang} box: not filled`);
    // the drifts: the least power of ten above each, as fractions
    const drifts = [...text.matchAll(/(?:浮点偏差|floating-point drift) (= 0|< 10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+))/g)],
      values = ['model', 'heap', 'compose', 'cross', 'lagrange', 'logs'].map((k) => seen.bench.drift[k]);
    const okDrift = (m, v) => {
      if (v === 0) return m[1] === '= 0';
      if (!m[2]) return false;
      const e = Number([...m[2]].map((c) => (c === '⁻' ? '-' : SUP.indexOf(c))).join('')),
        [n, d] = doubleN(v);
      return e <= -10 && n * 10n ** BigInt(-e) < d && !(n * 10n ** BigInt(1 - e) < d);
    };
    if (drifts.length !== 6 || !drifts.every((m, k) => okDrift(m, values[k])) || seen.bench.drift.scalar !== 0) bad.push(`${lang} box: the drifts ${JSON.stringify([drifts.map((m) => m[1]), seen.bench.drift])}`);
    // the spans of the drawer, each by its name
    if (!same(seen.spans[lang].map((x) => x[0]), BENCH_KEYS)) bad.push(`${lang} spans: ${seen.spans[lang].map((x) => x[0]).join(' ')}`);
    for (const [key, t] of seen.spans[lang]) if (t !== spans[key]) bad.push(`${lang} drawer ${key}: ${t} for ${spans[key]}`);
    bad.push(...[...mixed(text), ...seen.spans[lang].flatMap(([, t]) => mixed(t))].map((x) => `${lang} chained: ${x}`));
    // no decimal of the box stands without “=”, “≈” or (an exact angle of the two compositions) a separator before it
    const loose = [...text.matchAll(/(\S+) (−?\d+\.\d+°?%?)/g)].filter(([, before]) => !/[=≈]$/.test(before)).map((m) => m[0]);
    if (!loose.every((x) => /(?:弯曲|平直|curved|flat) \d+\.\d+°$/.test(x))) bad.push(`${lang} box: ${loose.join(' | ')}`);
  }
  // the drifts of the box are those of the instances at s = k/100, taken from the page one by one
  const worst = await p.evaluate(() => {
    const D = REAL_PRIME_DEBUG,
      out = { model: 0, heap: 0, scalar: 0, cross: 0, lagrange: 0, compose: 0 };
    for (let k = 0; k <= 99; k++) {
      const m = D.calc(k / 100),
        I = m.instances,
        up = (key, v) => (out[key] = Math.max(out[key], v));
      up('model', Math.max(I.model.gap, I.model.sGap));
      up('heap', Math.max(I.cheb.gap, I.cheb.closedGap, I.cheb.normGap));
      up('scalar', Math.abs(I.cross.scalar));
      up('cross', I.cross.gap);
      up('lagrange', Math.abs(I.lagrange.left - I.lagrange.right));
      up('compose', m.rod.orth.formulaGap);
    }
    return out;
  });
  for (const [k, v] of Object.entries(worst)) if (seen.bench.drift[k] !== v) bad.push(`drift ${k}: ${seen.bench.drift[k]} for ${v}`);
  return bad;
}
{
  const bad = await auditBench(page, textsOfFrame);
  check('NUM: the box in both languages, its copy and the spans of the drawer are the numbers computed here (s = 4/5, s = 1/2, N = 5, τ = 7.50, n to 8, 512 cells, 50 turns), each drift the least power of ten above it', !bad.length, bad.slice(0, 5).join(' | '));
  const rendered = await page.evaluate(() => ['#basis', '#drawer'].map((q) => document.querySelector(q).textContent));
  for (const x of ['≈ 126.87°', '≈ 53.13°', '≈ 109.47°', '≈ 35.26°', '≈ 297.9°', '≈ 112.1°', '≈ 331.6°', '= 6.25%', '≈ 1.7889', '≈ 4.8990']) check(`NUM: “${x}” is rendered in the panel and in the drawer, in both languages`, rendered.every((t) => t.split(x).length >= 3), x);
}
{
  // the same sources with another frame: every number of the box, of the drawer and of the card notes follows it
  const patches = [
      ['STILL1 = 0.8,', 'STILL1 = 0.96,'],
      ['STILL2 = 0.5,', 'STILL2 = 0.4,'],
      ['STILL3 = 4,', 'STILL3 = 6,'],
      ['STILL4 = 7.5,', 'STILL4 = 3.3,'],
      ['N_MAX = 30,', 'N_MAX = 24,'],
      ['const CHEB_N = 8;', 'const CHEB_N = 6;'],
      ['CELLS = 8;', 'CELLS = 6;'],
      ['const HORIZON = 6,', 'const HORIZON = 5,'],
      ['CUT = 1000,', 'CUT = 400,'],
      ['RANGE = 12,', 'RANGE = 5,'],
      ['AVG_N = 1000,', 'AVG_N = 300,'],
      ['LAPS = 50;', 'LAPS = 20;']
    ],
    frame = { s: [24, 25], coax: [2, 5], chips: [[0, 1], [1, 2], [4, 5], [3, 4]], N: 7, tau: 3.3, cheb: 6, cells: 6, horizon: 5, cut: 400, range: 5, avg: 300, laps: 20, nmax: 24 };
  const p = await T.open(BOOK, ID, '?lang=zh', { reducedMotion: 'reduce' });
  await p.route(`**/${ID}/main.js*`, (route) => route.fulfill({ contentType: 'text/javascript; charset=utf-8', body: patches.reduce((js, [from, to]) => js.replace(from, to), sources['main.js']) }));
  await p.route((u) => new RegExp(`/${ID}/(?:index\\.html)?$`).test(u.pathname), async (route) => {
    const res = await route.fetch();
    await route.fulfill({ response: res, body: (await res.text()).replace('data-s="0.96"', 'data-s="0.75"') });
  });
  await p.reload({ waitUntil: 'load' });
  await settle(p);
  const bad = await auditBench(p, frame);
  check('NUM: served with another frame (s = 24/25, s = 2/5, N = 7, τ = 3.30, n to 6, 216 cells, 20 turns, other ranges and chips) the box and the drawer follow it: they are computed, not written', patches.every(([from]) => sources['main.js'].split(from).length === 2) && !bad.length, bad.slice(0, 5).join(' | '));
  const notes = await p.evaluate((ids) => ids.map((id) => {
    document.querySelector(`[data-preset="${id}"]`).click();
    TRV.kit.flush();
    return document.getElementById('presetNote').textContent;
  }), IDS);
  check('the notes of the cards follow the same frame', notes[0].includes('s = 0.96') && notes[0].includes('≈ 23.07°') && notes[0].includes('约 25 倍') && notes[1].includes('s = 2/5') && notes[1].includes('= 1/3') && notes[1].includes('转轴偏 30.00°') && notes[2].includes('N = 7') && notes[2].includes('2、3、5') && notes[2].includes('N = 8'), JSON.stringify(notes.slice(0, 3)));
  await p.context().close();
}

/* ---------- cards, rails, controls ---------- */
for (const id of IDS) {
  const parked = await pick(id);
  const m = await state();
  check(`${id}: plays up to its still and parks, on its own scene`, parked && m.scene === CARDS[id].scene && m.preset === id && near(m.t, CARDS[id].still, 1e-9) && m.regime === 'live');
  check(`${id}: the declared still is on the card`, near(Number(await page.getAttribute(`[data-preset="${id}"]`, 'data-still')), CARDS[id].still, 1e-9));
  await layout(page, `desktop en ${id}`);
}
check('each rail has its own range and quantity', same(await page.evaluate(() => Object.values(REAL_PRIME_DEBUG.presets).map((p) => p.scene)), IDS.map((id) => CARDS[id].scene)));
// ▶ on a parked card plays the sweep again from its start
for (const id of [CARD1, CARD3, CARD5]) {
  await pick(id);
  check(`${id}: ▶ replays the sweep from the start`, await playsAfter(page, () => page.evaluate(() => document.querySelector('#play').click()), () => window.REAL_PRIME_DEBUG.state));
  const again = await until(page, ([still]) => { const s = window.REAL_PRIME_DEBUG.state; return !s.playing && Math.abs(s.t - still) < 1e-9; }, [CARDS[id].still], 150000);
  check(`${id}: the replay parks on the still again`, again);
}
// s: slider, chips and rail set one quantity; the other scenes give way to the tangent scene
await pick(CARD1);
for (const v of [0, 0.5, 0.8, 0.96]) {
  await page.evaluate((s) => document.querySelector(`#sChips [data-s="${s}"]`).click(), v);
  await settle(page);
  const m = await state();
  check(`chip s = ${v}: sets the deficit, leaves the card, keeps the scene`, near(m.s, v, 1e-12) && m.preset === null && m.scene === 'tangent' && near(m.t, v, 1e-12) && (await page.getAttribute(`#sChips [data-s="${v}"]`, 'aria-pressed')) === 'true' && near(Number(await page.inputValue('#sRange')), v, 1e-9));
  check(`chip s = ${v}: readouts`, (await textOf('roTangent')).includes(f4(1 / (1 - v))) && (await textOf('hudBig')).includes(f4(1 / (1 - v))), await textOf('roTangent'));
}
await input('#sRange', 0.33);
check('the s slider moves the rail and unpresses the chips', near((await state()).s, 0.33, 1e-12) && (await page.locator('#sChips [aria-pressed="true"]').count()) === 0 && near((await state()).t, 0.33, 1e-12));
await pick(CARD4);
await input('#sRange', 0.5);
{
  const m = await state();
  check('moving s on the rivets scene shows the tangent scene', m.scene === 'tangent' && near(m.s, 0.5, 1e-12) && m.preset === null && !m.blending);
}
await input('#nRange', 12);
{
  const m = await state();
  check('moving N on the tangent scene shows the adelic scene with 12 × 1/4 × 1/3 = 1.0000', m.scene === 'adelic' && m.N === 12 && m.t === 11 && (await textOf('hudBig')).includes('12 × 1/4 × 1/3 = 1.0000') && (await textOf('roKey')) === '= 1.0000', await textOf('hudBig'));
}
// +1 from 1 to 30, one integer at a time
await input('#nRange', 1);
{
  const bad = [];
  for (let n = 1; n < 30; n++) {
    await page.evaluate(() => document.querySelector('#stepPlusBtn').click());
    await settle(page);
    const m = await state(),
      big = await textOf('hudBig'),
      sub2 = await textOf('hudSub');
    const prime = PRIMES.includes(n + 1);
    if (!(m.N === n + 1 && m.ade.product === 1 && m.gear === n + 1 && big.endsWith('= 1.0000') && (prime ? /is prime/.test(sub2) : /is composite: no new ring/.test(sub2)))) bad.push([n + 1, m.N, big, sub2]);
  }
  check('+1 steps N = 1 → 30 one integer at a time, primes and composites named live, product 1.0000 throughout', bad.length === 0, JSON.stringify(bad[0] || null));
  check('+1 stops at 30', await page.locator('#stepPlusBtn').isDisabled());
}
// on the disc a bead stands on the arrow exactly when its prime divides N
for (const n of [5, 6, 12, 29, 30]) {
  await input('#nRange', n);
  const marks = await page.evaluate(() => {
    const ray = REAL_PRIME_DEBUG.constants.RAY,
      ms = TRV.solids[0].marks().filter((m) => /^clock/.test(m.key));
    return ms.map((m) => ({ p: Number(m.key.slice(5)), on: Math.abs(Math.atan2(m.p[1], m.p[0]) - ray) < 1e-6, r: Math.hypot(m.p[0], m.p[1]) }));
  });
  check(`N = ${n}: one bead on every ring p ≤ N at the logarithmic radius, on the arrow exactly for the divisors`, marks.length === PRIMES.filter((p) => p <= n).length && marks.every((m) => m.on === (n % m.p === 0) && near(m.r, 1 + 0.62 * Math.log(m.p), 1e-9)), JSON.stringify(marks));
}
// a resting rail stands on a whole number
await pick(CARD3);
await seek(6.37);
check('a resting rail stands on a whole number: 6.37 → N = 7', (await state()).N === 7 && (await state()).t === 6 && (await state()).gear === 7);
// … and on the grid of s and τ, so that every printed value has an exact one behind it
await pick(CARD1);
await seek(0.33371234);
check('a resting rail stands on the grid of s: 0.33371234 → s = 0.3337', (await state()).s === 0.3337 && (await state()).t === 0.3337 && (await textOf('tau')) === 's = 0.3337' && (await textOf('sOut')) === '= 0.3337' && (await page.inputValue('#sRange')) === '0.33', JSON.stringify([await textOf('tau'), await textOf('sOut')]));
for (const [card, key] of [[CARD4, 'tau4'], [CARD5, 'tau5']]) {
  await pick(card);
  await seek(7.123456);
  check(`a resting rail stands on the grid of τ: 7.123456 → 7.12 (${key})`, (await state())[key] === 7.12 && (await state()).t === 7.12 && (await textOf('tau')) === 'τ = 7.12', await textOf('tau'));
}
// while a card plays, the quantity walks on its grid and the label of the rail is that quantity, frame by frame
for (const [card, key, per, label] of [[CARD1, 's', 10000, (v) => `s = ${v.toFixed(4)}`], [CARD4, 'tau4', 100, (v) => `τ = ${v.toFixed(2)}`], [CARD5, 'tau5', 100, (v) => `τ = ${v.toFixed(2)}`]]) {
  await page.evaluate((c) => document.querySelector(`[data-preset="${c}"]`).click(), card);
  const seen = [];
  for (let k = 0; k < 4; k++) {
    const last = seen.length ? seen[seen.length - 1].v : 0;
    await until(page, ([q, from]) => { const m = window.REAL_PRIME_DEBUG.state; return m[q] > from || !m.playing; }, [key, last], 60000);
    seen.push(await page.evaluate((q) => ({ v: window.REAL_PRIME_DEBUG.state[q], playing: window.REAL_PRIME_DEBUG.state.playing, label: document.getElementById('tau').textContent.trim() }), key));
  }
  check(`${card}: played, the quantity stands on its grid and the rail names it exactly`, seen.some((x) => x.playing) && seen.every((x) => x.v > 0 && Math.round(x.v * per) / per === x.v && x.label === label(x.v)), JSON.stringify(seen));
}

/* ---------- the degenerate states, live ---------- */
const DEGENERATE = {
  [CARD1]: { zh: ['s = 0', '没有放大', /(?:A\s*err|放大率) = 1\.0000/], en: ['s = 0', 'nothing is magnified', /(?:A\s*err|magnification) = 1\.0000/] },
  [CARD2]: { zh: ['s = 0', '误差', /= 0\.00°/], en: ['s = 0', 'gaps', /= 0\.00°/] },
  [CARD3]: { zh: ['N = 1', '单位球', /= 1\.0000/], en: ['N = 1', 'unit ball', /= 1\.0000/] },
  [CARD4]: { zh: ['τ = 0', '零点', /12 枚/], en: ['τ = 0', 'zero', /12 magenta/] },
  [CARD5]: { zh: ['τ = 0', '起点', /./], en: ['τ = 0', 'start', /./] }
};
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  for (const id of IDS) {
    await pick(id);
    const before = { sub: await textOf('hudSub'), note: await textOf('presetNote'), tour: await page.locator('.tour-note').innerText() };
    await seek(0);
    const m = await state(),
      sub2 = await textOf('hudSub'),
      note = await textOf('presetNote'),
      tour = (await page.locator('.tour-note').innerText()).replaceAll('−', '-');
    const [a, , rx] = DEGENERATE[id][lang];
    check(
      `${lang} ${id}: at the start of the rail the HUD, the card note and the tour note all state the degenerate frame`,
      m.preset === id && m.regime === 'zero' && sub2.startsWith(a) && note.includes(a) && note === tour && note.includes(DEGENERATE[id][lang][1]) && rx.test(note) && sub2 !== before.sub && note !== before.note && tour !== before.tour,
      JSON.stringify({ sub2, note, tour })
    );
    await layout(page, `${lang} ${id} at the start of the rail`);
    await seek(CARDS[id].still);
    check(`${lang} ${id}: back on the still the live texts return`, (await textOf('hudSub')) === before.sub && (await textOf('presetNote')) === before.note && (await page.locator('.tour-note').innerText()) === before.tour);
  }
  // free play: the sliders leave the card, and the idle note states the degenerate frame too
  await pick(CARD1);
  await page.evaluate(() => document.querySelector('#sChips [data-s="0"]').click());
  await settle(page);
  check(`${lang} free play at s = 0`, /^(自由探索：此刻 s = 0|Free play: right now s = 0)/.test(await textOf('presetNote')) && (await textOf('presetNote')).includes('1.0000') && (await textOf('hudSub')).startsWith('s = 0') && (await textOf('roTangent')) === '= 0.0000 · = 0.00° · = 0.0000 · = 1.0000', (await textOf('presetNote')) + ' | ' + (await textOf('roTangent')));
  await input('#nRange', 1);
  check(`${lang} free play at N = 1`, /^(自由探索：此刻 N = 1|Free play: right now N = 1)/.test(await textOf('presetNote')) && (await textOf('hudSub')).startsWith('N = 1') && (await state()).regime === 'zero', await textOf('presetNote'));
  {
    const colours = await primitives();
    check(`${lang} N = 1 draws no arrow, no hop, no prime ring and no clock`, !colours.seen.some((x) => /^(hop|ring|clock)/.test(x.key) || x.n === 'arrow'), JSON.stringify(colours.seen.map((x) => x.key).filter((k) => /^(hop|ring|clock|arrow)/.test(k))));
  }
  await input('#nRange', 2);
  check(`${lang} free play leaves the degenerate text at N = 2`, !/N = 1/.test(await textOf('presetNote')) && (await textOf('hudSub')).startsWith('N = 2'), await textOf('presetNote'));
}
/* the rodrigues scene before, at and past the antipode */
await setLang('en');
await pick(CARD2);
for (const [s, rx] of [
  [0.3, /^Coaxial: 1 - x₁·x₂ ≈ 0\.5714 turns to 2θ ≈ 132\.84°, the flat sum only/],
  [0.5, /^Coaxial: 1 - x₁·x₂ = 0 reaches o exactly \(2θ = 180\.00°\), the flat sum only ≈ 126\.87°, short by ≈ 53\.13°\. Orthogonal: without x₁ × x₂ the axis is off by ≈ 35\.26°/],
  [0.6, /^Coaxial: 1 - x₁·x₂ = -0\.5000 turns to 2θ ≈ 203\.07°, past o/],
  [0.75, /^Coaxial: 1 - x₁·x₂ = -2\.0000 turns to 2θ = 240\.00°, past o/],
  [0.8, /^Coaxial: 1 - x₁·x₂ = -3\.0000 turns to 2θ ≈ 253\.74°, past o, the flat sum only ≈ 151\.93°/]
]) {
  await seek(s);
  check(`rodrigues at s = ${s}`, rx.test(await textOf('hudSub')), await textOf('hudSub'));
}

{
  await seek(0.8);
  const tags = await tagText();
  check('long vectors on the second ball share one smaller scale, and the label says which', tags.some((x) => /vectors at ≈ 41%/.test(x)), JSON.stringify(tags));
  await layout(page, 'rodrigues at s = 0.8');
  await seek(0.96);
  await layout(page, 'rodrigues at s = 0.96');
  await seek(0.99);
  {
    const marks = await page.evaluate(() => TRV.solids[0].marks().filter((k) => /^(flatX|run)/.test(k.key)).map((k) => [k.key, k.p[0]]));
    check('rodrigues at s = 0.99: no flat bead is drawn beyond the plate', marks.every(([, x]) => x <= 11.2), JSON.stringify(marks));
    await layout(page, 'rodrigues at s = 0.99');
  }
  await seek(0.5);
  check('at s = 1/2 the vectors are drawn at their own length', !(await tagText()).some((x) => /vectors at/.test(x)));
}
await pick(CARD1);
for (const s of [0.2, 0.5, 0.96, 0.99]) {
  await seek(s);
  await layout(page, `tangent at s = ${s}`);
}

/* ---------- what the page writes on every frame: “=”, “≈” and the inequality signs, in both languages and under both lenses ---------- */
/** Put a page through frames (values of the rail of the marked card) and read everything it writes about them. */
const readFrames = (p, values) =>
  p.evaluate((values) => {
    const text = (sel) => (document.querySelector(sel) || { textContent: '' }).textContent.replace(/\s+/g, ' ').trim(),
      now = document.getElementById('now'),
      out = [];
    for (const v of values) {
      now.value = v;
      now.dispatchEvent(new Event('input', { bubbles: true }));
      for (const lang of ['en', 'zh']) {
        document.querySelector(`[data-lang-set="${lang}"]`).click();
        for (let lens = 0; lens < 2; lens++) {
          TRV.kit.flush();
          const st = window.REAL_PRIME_DEBUG.state;
          out.push({
            lang,
            lens: st.lens,
            v: { scene: st.scene, s: st.s, N: st.N, tau4: st.tau4, tau5: st.tau5, share: [st.orb5.logCells, st.orb5.ratioCells, st.orb5.total], least: st.instances.fixed.independence.least },
            hud: ['#hudBig', '#hudSub'].map(text),
            tags: [...document.querySelectorAll('.stage .tags .tag:not([hidden])')].map((e) => e.textContent.replace(/\s+/g, ' ').trim()),
            note: text('#roNote'),
            ro: Object.fromEntries(['roKey', 'roTangent', 'roAdd', 'roOrbit', 'roCage', 'roPrimes', 'tau', 'sOut', 'nOut', 'keyPill', 'plotMetaB', 'roKeySub'].map((id) => [id, text('#' + id)])),
            said: ['#presetNote', '#tour .tour-note'].map(text),
            areas: ['#hudTl', '#readouts'].map(text)
          });
          document.getElementById('lensToggleBtn').click();
        }
      }
    }
    TRV.kit.flush();
    return out;
  }, values);
/** The quantities of a frame: the names a text may put before a relation, the value, its exact form. */
function quantitiesOf(v) {
  const S = BigInt(Math.round(v.s * 10000)),
    G = 10000n,
    R = G - S,
    y = Number(S) / Number(R),
    x = Math.sqrt(y),
    theta = (2 * Math.atan(x)) / DEG,
    flat = (2 * Math.atan(2 * x)) / DEG,
    tau = v.scene === 'ergodic' ? v.tau5 : v.tau4,
    T100 = BigInt(Math.round(tau * 100)),
    [logCells, ratioCells, total] = v.share;
  return [
    ['2 dx/dθ = 1 \\+ x²', 1 + y, { q: [G, R] }],
    ['κ = 1 − dist²/4|κ', 1 - Number(S) / 10000, { q: [R, G] }],
    ['Aerr = 1/κ|Aerr', 1 + y, { q: [G, R] }],
    ['dist\\(o, P\\)', 2 * Math.sqrt(v.s), { q: [4n * S, G], root: true }],
    ['1 − x₁·x₂', 1 - y, { q: [R - S, R] }],
    ['x⁴', y * y, { q: [S * S, R * R] }],
    ['x \\+ x', 2 * x, { q: [4n * S, R], root: true }],
    ['x', x, { q: [S, R], root: true }],
    ['2θ', 2 * theta, {}, '°'],
    ['θ', theta, {}, '°'],
    ['s', v.s, { q: [S, G] }],
    ['ln \\d+', Math.log(v.N), v.N === 1 ? { q: [0n, 1n] } : {}],
    ['τ', tau, { q: [T100, 100n] }],
    ['1/ln 30', 1 / Math.log(30), {}],
    ['30/ln 30', 30 / Math.log(30), {}],
    ['\\|a ln 2 \\+ b ln 3 \\+ c ln 5\\|', Math.log(15625 / 15552), {}],
    [`${logCells}/${total}`, (100 * logCells) / total, { q: [BigInt(100 * logCells), BigInt(total)] }, '%'],
    [`${ratioCells}/${total}`, (100 * ratioCells) / total, { q: [BigInt(100 * ratioCells), BigInt(total)] }, '%'],
    // without a name of their own: the angles after a word, the scale of the vectors, the phases
    [null, 180 - theta, {}, '°'],
    [null, flat, {}, '°'],
    [null, 2 * theta - flat, {}, '°'],
    [null, (2 * Math.acos(Number(R) / 10000)) / DEG, {}, '°'],
    [null, (2 * Math.atan(Math.SQRT2 * x)) / DEG, {}, '°'],
    [null, Math.atan(x / Math.SQRT2) / DEG, {}, '°'],
    [null, 2 * x, { q: [4n * S, R], root: true }],
    [null, 1 + y, { q: [G, R] }],
    ...(S ? [[null, 200 / Math.sqrt(2 * y + y * y), { q: [40000n * R * R, S * (2n * R + S)], root: true }, '%']] : []),
    ...LOGS.map((l) => [null, (((v.tau4 * l) % TAU) / DEG + 360) % 360, v.tau4 === 0 ? { q: [0n, 1n] } : { irrational: true }, '°']),
    [null, 1, { q: [1n, 1n] }]
  ];
}
/** The relations of a text and the decimals without one: how many, and which are wrong. */
function relations(text, v) {
  const table = quantitiesOf(v),
    bad = [];
  let t = text,
    count = 0;
  for (const [name, value, o, unit = ''] of table) {
    if (!name) continue;
    t = t.replace(new RegExp(`(?<![A-Za-zΑ-ω0-9₀-₉+·/] ?)(?:${name}) ([=≈]) (${NUM})${unit}(?![/\\d])`, 'g'), (whole, sign, digits) => {
      count++;
      const why = relationBad(sign, digits, value, o);
      if (why) bad.push(`${whole} [${why}]`);
      return '◦';
    });
  }
  // what is left: a decimal (or a whole number of degrees or percent) after “=”, after “≈”, or alone, where only an exact one may stand
  for (const m of t.matchAll(new RegExp(`(?:([=≈]) )?(?<![\\d.])(−?\\d+\\.\\d+(?:×10⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?|−?\\d+(?=[°%]))([°%]?)`, 'g'))) {
    count++;
    const [whole, sign = '=', digits, unit] = m;
    const fits = table.some(([, value, o, u = '']) => u === unit && (o.irrational ? sign === '≈' && Math.abs(numberOf(digits) - value) <= 0.05 + 1e-9 : relationBad(sign, digits, value, o) === ''));
    if (!fits) bad.push(`${whole} in “${text.slice(Math.max(0, m.index - 12), m.index + 40)}”`);
  }
  return { count, bad };
}
const S_FRAMES = ['0', '0.0001', '0.01', '0.1', '0.2', '0.25', '0.3337', '0.4', '0.5', '0.6', '0.64', '0.75', '0.8', '0.9', '0.96', '0.99'];
const RAIL_FRAMES = {
  [CARD1]: S_FRAMES,
  [CARD2]: S_FRAMES,
  [CARD3]: ['0', '1', '3', '4', '5', '11', '28', '29'],
  [CARD4]: ['0', '0.01', '0.1', '1', '3.33', '7.5', '9.06', '12'],
  [CARD5]: ['0', '0.01', '1', '6.28', '6.29', '40.5', '315', '377']
};
for (const [size, viewport] of [['desktop', { width: 1440, height: 900 }], ['phone', { width: 390, height: 844 }]])
  for (const id of IDS) {
    const p = await T.open(BOOK, ID, '?lang=zh', { viewport, reducedMotion: 'reduce' });
    await settle(p);
    await p.evaluate((c) => document.querySelector(`[data-preset="${c}"]`).click(), id);
    await settle(p);
    const frames = await readFrames(p, RAIL_FRAMES[id]),
      bad = [],
      beside = [],
      unmarked = [];
    let count = 0;
    for (const f of frames) {
      const where = `${f.lang}/lens ${f.lens}`,
        judge = (t) => {
          const r = relations(t, f.v);
          count += r.count;
          bad.push(...r.bad.map((b) => `${where}: ${b}`));
        };
      [...f.hud, ...f.tags, f.note].forEach(judge);
      // the lists of the readouts, the outputs of the sliders and the label of the rail: each value after its relation
      const tangent = f.ro.roTangent.split(' · '),
        add = f.ro.roAdd.split(/ · | \/ /),
        orbit = f.ro.roOrbit.split(' · ');
      judge(tangent.map((x, i) => `${['s', 'θ', 'x', 'Aerr'][i]} ${x}`).join(' ; '));
      judge(['2θ ' + add[0], ...add.slice(1)].join(' ; '));
      judge([`${f.v.share[0]}/${f.v.share[2]} ${orbit[0]}`, `${f.v.share[1]}/${f.v.share[2]} ${orbit[1]}`].join(' ; '));
      judge('s ' + f.ro.sOut);
      judge(f.ro.tau);
      const railed = { tangent: /^s = 0\.\d{4}$/, rodrigues: /^s = 0\.\d{4}$/, adelic: new RegExp(`^N = ${f.v.N}$`), rivets: /^τ = \d+\.\d\d$/, ergodic: /^τ = \d+\.\d\d$/ }[f.v.scene];
      if (!railed.test(f.ro.tau) || !/^= 0\.\d{4}$/.test(f.ro.sOut) || f.ro.nOut !== `= ${f.v.N}` || f.ro.roKey !== '= 1.0000' || !f.ro.keyPill.endsWith('|N|p = 1.0000') || !f.ro.plotMetaB.endsWith(') = ln 1 = 0') || orbit[2] !== `τ = ${f.v.tau5.toFixed(2)}`) unmarked.push(JSON.stringify(f.ro));
      for (const x of [...tangent, ...add, ...orbit.slice(0, 2)]) if (!/^[=≈] \S+$/.test(x)) unmarked.push(x);
      if (tangent.length !== 4 || add.length !== 4 || orbit.length !== 3) unmarked.push(JSON.stringify([tangent, add, orbit]));
      for (const t of [...f.hud, ...f.tags, f.note, ...f.said, ...f.areas, ...Object.values(f.ro)]) for (const x of mixed(t)) beside.push(`${where}: ${x}`);
    }
    check(`${size}/${id}: every value of the readouts, of both sliders, of the key pill and of the rail follows “=” or “≈”`, !unmarked.length, [...new Set(unmarked)].slice(0, 3).join(' | '));
    check(`${size}/${id}: in ${frames.length} frames every relation is “=” before the value itself or “≈” before its rounding, and no rounded decimal stands alone (${count} values)`, frames.length === 4 * RAIL_FRAMES[id].length && count >= 10 * frames.length && !bad.length, `${count}: ${[...new Set(bad)].slice(0, 5).join(' | ')}`);
    const areas = await p.evaluate(() => ['#hudTl', '#readouts', '#basis', '#drawer'].map((q) => [...document.querySelectorAll(q + ' *')].filter((e) => !e.children.length || e.matches('p, li, dd, .zh, .en')).map((e) => e.textContent).join(' ¶ ')));
    for (const [k, t] of areas.entries()) beside.push(...mixed(t).map((x) => `${['#hudTl', '#readouts', '#basis', '#drawer'][k]}: ${x}`));
    check(`${size}/${id}: no “≈” runs into “<”, “>”, “≤” or “≥” in #hudTl, #readouts, #basis, #drawer, the notes and the labels (clause by clause and sentence by sentence, nothing exempt)`, !beside.length, [...new Set(beside)].slice(0, 4).join(' | '));
    await p.context().close();
  }
// the notes of the cards: the numbers of their stills, each after its relation
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  const want = {
    [CARD1]: lang === 'zh' ? ['s = 0.80', '只剩 ≈ 53.13°', 'x = 2', '约 5 倍'] : ['s = 0.80', 'only ≈ 53.13°', 'x = 2', 'about 5 times'],
    [CARD2]: lang === 'zh' ? ['s = 1/2', '1 − x₁·x₂ = 0', '2θ = 180.00°', 'x + x = 2 只到 ≈ 126.87°', '差 ≈ 53.13°', '转轴偏 ≈ 35.26°'] : ['s = 1/2', '1 − x₁·x₂ = 0', '2θ = 180.00°', 'x + x = 2 stops at ≈ 126.87°', 'short by ≈ 53.13°', 'off by ≈ 35.26°'],
    [CARD3]: ['N = 5', 'ln 5', '|5|2 = |5|3 = 1', 'p = 5', 'N = 6'],
    [CARD4]: ['V − E + F = 2', '12'],
    [CARD5]: ['32/512 ≈ 6.3%', lang === 'zh' ? '停在 50 圈之后，512 个格子全部到过' : 'parked after 50 turns, it has met all 512 cells']
  };
  for (const id of IDS) {
    await pick(id);
    const note = (await page.textContent('#presetNote')).replace(/\s+/g, ' ');
    check(`${lang} ${id}: the note carries the numbers of the still after “=” or “≈”`, want[id].every((x) => note.includes(x)) && !mixed(note).length, note);
  }
}
/* ---------- the matrix: five cards, two languages, desktop and phone ---------- */
for (const [size, viewport] of [['desktop', { width: 1440, height: 900 }], ['phone', { width: 390, height: 844 }]])
  for (const lang of ['zh', 'en']) {
    const p = await T.open(BOOK, ID, '?lang=' + lang, { viewport, reducedMotion: 'reduce', locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
    await settle(p);
    for (const id of IDS) {
      await p.evaluate((c) => document.querySelector(`[data-preset="${c}"]`).click(), id);
      await settle(p);
      const m = await state(p);
      check(`${size}/${lang}/${id}: opens on its still`, m.preset === id && m.scene === CARDS[id].scene && near(m.t, CARDS[id].still, 1e-9) && !m.playing);
      await layout(p, `${size}/${lang}/${id}`);
      if (lang === 'en') check(`${size}/${lang}/${id}: no Chinese left`, !(await cjkLeftovers(p)).length);
      const wide = await p.evaluate(() => [...document.querySelectorAll('#basis .lean, #readouts dd, #presetNote, .lens-toggle .seg')].filter((e) => e.getClientRects().length && e.scrollWidth > e.clientWidth + 1).map((e) => e.className + ' ' + e.textContent.slice(0, 30)));
      check(`${size}/${lang}/${id}: no evidence box, readout or note is wider than its column`, !wide.length, wide.slice(0, 3).join(' | '));
    }
    await p.click('#infoBtn');
    const drawer = await p.evaluate(() => ({ open: !document.getElementById('drawer').hidden, boxes: document.querySelectorAll('#drawerEvidence .lean').length, wide: [...document.querySelectorAll('#drawer .lean, #drawer li')].filter((e) => e.getClientRects().length && e.scrollWidth > e.clientWidth + 1).length }));
    check(`${size}/${lang}: the drawer opens with the nineteen evidence boxes, none wider than the sheet`, drawer.open && drawer.boxes === 19 && drawer.wide === 0, JSON.stringify(drawer));
    await p.keyboard.press('Escape');
    await p.context().close();
  }

/* ---------- colours: one role each, amber only on the current probe ---------- */
async function primitives(p = page) {
  return p.evaluate(() => {
    const sc = window.TRV.solids[0],
      seen = [],
      names = ['surface', 'tube', 'line', 'circle', 'arrow', 'bead', 'ring', 'fan', 'poly', 'glass'],
      saved = {};
    for (const n of names) {
      saved[n] = sc[n];
      sc[n] = (...a) => {
        const style = (n === 'circle' || n === 'glass' ? a[3] : n === 'arrow' || n === 'surface' || n === 'tube' || n === 'poly' ? a[2] : a[1]) || {};
        const key = ['surface', 'tube', 'poly', 'glass'].includes(n) ? a[0] : style.key || n;
        seen.push({ n, key: String(key), colors: [style.color, style.fill, style.edges, ...(style.colors || [])].filter(Boolean), alpha: style.alpha == null ? 1 : style.alpha });
        return saved[n](...a);
      };
    }
    window.TRV.kit.flush();
    for (const n of names) sc[n] = saved[n];
    const P = window.TRV.palette;
    return { seen, amber: P.amber, ok: P.ok, warn: P.warn, cyan: P.cyan, magenta: P.magenta, violet: P.violet, stage: P.stage, sigma: P.sigma, ink: P.ink };
  });
}
for (const id of IDS) {
  await pick(id);
  const c = await primitives();
  const amber = c.seen.filter((x) => x.colors.includes(c.amber));
  check(`${id}: amber only on the current probe, no green, no red on the stage`, amber.length === 1 && amber[0].key === 'probe' && c.seen.every((x) => !x.colors.includes(c.ok) && !x.colors.includes(c.warn)), JSON.stringify(amber));
}
await pick(CARD3);
for (const n of [5, 6, 12]) {
  await input('#nRange', n);
  const c = await primitives();
  const of = (rx, color) => c.seen.filter((x) => rx.test(x.key)).every((x) => same(x.colors, [color]));
  check(`N = ${n}: prime rings, hops and clock beads cyan, echoes and unborn rings violet, the Archimedean arrow magenta`, c.seen.some((x) => /^ring/.test(x.key)) && of(/^ring/, c.cyan) && of(/^hop/, c.cyan) && of(/^clock/, c.cyan) && c.seen.filter((x) => x.n === 'arrow').every((x) => [c.magenta, c.cyan].includes(x.colors[0])) && c.seen.some((x) => x.n === 'arrow' && x.colors[0] === c.magenta) && c.seen.filter((x) => x.n === 'line').every((x) => [c.cyan, c.violet].includes(x.colors[0])));
  // a prime ring stands alone; a composite reuses old rings, each with a violet echo on both sides, next to its own echoes
  const m = await state(),
    violet = c.seen.filter((x) => x.n === 'line' && x.colors[0] === c.violet && x.alpha > 0.5).length;
  check(`N = ${n}: ${PRIMES.includes(n) ? 'the new ring carries no echo line' : 'every reused ring carries two violet echo lines'}`, violet === m.ade.echoes.length + (PRIMES.includes(n) ? 0 : 2 * m.ade.active.length), `${violet}`);
}
await pick(CARD4);
{
  const c = await primitives();
  const cage = c.seen.find((x) => x.n === 'poly');
  check('rivets: 12 magenta and 20 violet faces, three cyan rings', !!cage && cage.colors.filter((x) => x === c.magenta).length === 12 && cage.colors.filter((x) => x === c.violet).length === 20 && c.seen.filter((x) => /^gimbal/.test(x.key)).length === 3 && c.seen.filter((x) => /^gimbal|^phase/.test(x.key)).every((x) => same(x.colors, [c.cyan])));
}
await pick(CARD5);
{
  const c = await primitives();
  check('ergodic: the closed loop magenta, the prime-logarithm orbit cyan, the torus violet', c.seen.filter((x) => x.key === 'loop').every((x) => same(x.colors, [c.magenta])) && c.seen.some((x) => x.n === 'line' && x.colors[0] === c.cyan) && c.seen.some((x) => x.key === 'torus' && x.colors.includes(c.violet)));
}
const badColours = await page.evaluate(() => {
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
  for (const el of document.querySelectorAll('#stage *, .strip *, #readouts *, .field output, #basis .lean.model, #basis .lean.model *')) {
    if (el.closest('.handle') || el.matches('.hud-bl .sw.am')) continue; // the handle, and the legend key of the current quantity
    const cs = getComputedStyle(el);
    for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderLeftColor']) if (banned.includes(cs[prop])) bad.push(`${el.id || el.className || el.tagName} ${prop}`);
  }
  return bad;
});
check('amber, green and red colour no title, label, readout or MODEL box', !badColours.length, badColours.slice(0, 3).join(' | '));

/* ---------- views, lenses, handle ---------- */
for (const id of IDS) {
  await pick(id);
  const views = [];
  for (const name of CAM_NAMES) {
    await page.evaluate((n) => document.querySelector(`[data-cam="${n}"]`).click(), name);
    await settle(page);
    const c = await state();
    check(`${id}: selected view ${name}`, c.cam === name && c.preset === id && (await page.getAttribute(`[data-cam="${name}"]`, 'aria-pressed')) === 'true');
    views.push([c.camera.yaw, c.camera.pitch].join('/'));
    await layout(page, `${id} view ${name}`);
  }
  check(`${id}: the three views have distinct orientations`, new Set(views).size === 3);
}
for (const id of IDS) {
  await pick(id);
  const before = await state(),
    tags0 = await tagText(),
    big0 = await textOf('hudBig');
  await page.click('#lensToggleBtn');
  await settle(page);
  const on = await state();
  check(`${id}: the flat lens is named MODEL, changes the reading and keeps the state`, on.lens === 1 && ['s', 'N', 'tau4', 'tau5', 'scene', 'preset', 't'].every((k) => same(on[k], before[k])) && (await textOf('hudBig')).includes('MODEL') && (await textOf('hudBig')) !== big0 && !same(await tagText(), tags0) && (await page.getAttribute('#mobileLensBtn', 'aria-pressed')) === 'true' && /MODEL/.test(await textOf('scenePill')));
  const flatTitle = { [CARD1]: 'x = 2.0000', [CARD2]: 'x + x = 2.0000', [CARD3]: '= 5', [CARD4]: 'F₅ = 0', [CARD5]: '1 : 2 : 3 · 32/512 ≈ 6.3%' }[id];
  check(`${id}: the title of the flat lens names the flat reading`, (await textOf('hudBig')).includes(flatTitle), await textOf('hudBig'));
  await layout(page, `${id} flat lens`);
  await page.click('#lensToggleBtn');
  await settle(page);
  check(`${id}: the curved lens is back`, (await state()).lens === 0 && same(await tagText(), tags0) && (await textOf('hudBig')) === big0 && (await page.getAttribute('#mobileLensBtn', 'aria-pressed')) === 'false');
}
{
  // the flat lens really dims the cyan closure of the adelic scene
  await pick(CARD3);
  const bright = (await primitives()).seen.filter((x) => /^(ring|hop)/.test(x.key)).map((x) => x.alpha);
  await page.click('#lensToggleBtn');
  await settle(page);
  const dim = (await primitives()).seen.filter((x) => /^(ring|hop)/.test(x.key)).map((x) => x.alpha);
  await page.click('#lensToggleBtn');
  await settle(page);
  check('the flat lens dims the cyan prime closure and draws it as its own faded object', bright.length > 0 && bright.length === dim.length && bright.every((a) => a === 1) && dim.every((a) => a < 0.5));
}
check('desktop: the mirror lens button of the tour bar stays hidden', (await page.evaluate(() => innerWidth)) > 1080 && (await page.locator('#mobileLensBtn').isHidden()));
async function dragHandle(from, to) {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await page.mouse.move((from.x + to.x) / 2, (from.y + to.y) / 2, { steps: 4 });
  await page.mouse.move(to.x, to.y, { steps: 6 });
  await settle(page);
  const held = await state();
  await page.mouse.up();
  await settle(page);
  return held;
}
for (const [id, target, read, tol] of [
  [CARD1, 0.5, (m) => m.s, 0.02],
  [CARD2, 0.3, (m) => m.s, 0.02],
  [CARD3, 11, (m) => m.N - 1, 0],
  [CARD4, 8.1, (m) => m.tau4, 0.1]
]) {
  await pick(id);
  await page.locator('#stage').scrollIntoViewIfNeeded();
  await settle(page);
  const here = await state();
  const [from, to] = await page.evaluate(([a, b]) => [REAL_PRIME_DEBUG.dragTarget(a), REAL_PRIME_DEBUG.dragTarget(b)], [here.t, target]);
  const box = await page.locator('#stageHandle').boundingBox();
  check(`${id}: the handle lies on the current quantity`, !!box && Math.hypot(box.x + box.width / 2 - from.x, box.y + box.height / 2 - from.y) < 1.5);
  const held = await dragHandle(from, to),
    after = await state();
  check(`${id}: dragging the handle sets the quantity, keeps the camera and the scale while held, leaves the card`, Math.abs(read(after) - target) <= tol + 1e-9 && same(after.camera, here.camera) && near(held.unit, here.unit, 1e-9) && after.preset === null && !after.playing && after.scene === CARDS[id].scene, JSON.stringify([read(after), target, held.unit, here.unit]));
}
await pick(CARD5);
{
  const box = await page.locator('#stageHandle').boundingBox(),
    s = await state();
  const at = await page.evaluate((t) => REAL_PRIME_DEBUG.dragTarget(t), s.t);
  check(`${CARD5}: the handle lies on the moving point of the cyan orbit`, !!box && Math.hypot(box.x + box.width / 2 - at.x, box.y + box.height / 2 - at.y) < 1.5);
}
await pick(CARD1);
await page.locator('#stageHandle').focus();
await page.keyboard.press('ArrowRight');
await settle(page);
check('ArrowRight on the handle adds one hundredth to s', near((await state()).s, 0.81, 1e-12) && !(await state()).playing);
await page.keyboard.press('ArrowLeft');
await page.keyboard.press('ArrowLeft');
await settle(page);
check('ArrowLeft takes it off again', near((await state()).s, 0.79, 1e-12));
await page.keyboard.press('Home');
await settle(page);
check('Home on the handle goes to s = 0', (await state()).s === 0);
await page.keyboard.press('End');
await settle(page);
check('End on the handle goes to s = 0.99', near((await state()).s, 0.99, 1e-12));
await input('#nRange', 5);
await page.locator('#stageHandle').focus();
await page.keyboard.press('ArrowUp');
await settle(page);
check('ArrowUp on the adelic handle steps to N = 6', (await state()).N === 6);
for (const id of IDS) check(id + ' plays', await playsAfter(page, () => page.evaluate((c) => document.querySelector(`[data-preset="${c}"]`).click(), id), () => window.REAL_PRIME_DEBUG.state));

/* ---------- the two strips ---------- */
/** What the strips draw, and the least vertical gap (px) between each legend row and the curves, bars and cursor. */
async function strips(p) {
  return p.evaluate(() => {
    const plot = TRV.kit.plot,
      out = [];
    TRV.kit.plot = (...args) => {
      const g = plot(...args),
        rec = { lines: [], rects: [], dots: [], boxes: [], x: args[1].x, y: args[1].y };
      out.push(rec);
      rec.g = g;
      for (const m of ['line', 'rect', 'dot']) {
        const original = g[m];
        g[m] = (...a) => {
          rec[m + 's'].push(a);
          return original(...a);
        };
      }
      const legend = g.legend;
      g.legend = (...rest) => {
        const ctx = g.ctx,
          fill = ctx.fillText,
          move = ctx.moveTo,
          line = ctx.lineTo;
        let from = null;
        ctx.fillText = function (text, x, y, ...more) {
          const m = ctx.measureText(text);
          rec.boxes.push({ text, l: x - m.actualBoundingBoxLeft, r: x + m.actualBoundingBoxRight, t: y - m.actualBoundingBoxAscent, b: y + m.actualBoundingBoxDescent });
          return fill.call(this, text, x, y, ...more);
        };
        ctx.moveTo = function (x, y) {
          from = [x, y];
          return move.call(this, x, y);
        };
        ctx.lineTo = function (x, y) {
          if (from) rec.boxes.push({ text: 'key', l: Math.min(from[0], x), r: Math.max(from[0], x), t: Math.min(from[1], y) - 1, b: Math.max(from[1], y) + 1 });
          return line.call(this, x, y);
        };
        try {
          legend(...rest);
        } finally {
          ctx.fillText = fill;
          ctx.moveTo = move;
          ctx.lineTo = line;
        }
      };
      return g;
    };
    try {
      TRV.kit.flush();
    } finally {
      TRV.kit.plot = plot;
    }
    const P = TRV.palette;
    return out.slice(-2).map((rec, k) => {
      const g = rec.g,
        half = (s) => ((s && s.width) || 1.6) / 2;
      let gap = Infinity;
      const meets = (b, l, r) => b.l - 3 < r && b.r + 3 > l;
      const away = (b, t, btm) => (t > b.b ? t - b.b : btm < b.t ? b.t - btm : -1);
      for (const b of rec.boxes) {
        for (const [pts, , s] of rec.lines)
          for (let i = 1; i < pts.length; i++) {
            const x0 = g.X(pts[i - 1][0]),
              x1 = g.X(pts[i][0]),
              y0 = g.Y(pts[i - 1][1]),
              y1 = g.Y(pts[i][1]);
            if (meets(b, Math.min(x0, x1), Math.max(x0, x1))) gap = Math.min(gap, away(b, Math.min(y0, y1) - half(s), Math.max(y0, y1) + half(s)));
          }
        for (const [xa, ya, xb, yb] of rec.rects) if (meets(b, g.X(xa), g.X(xb))) gap = Math.min(gap, away(b, Math.min(g.Y(ya), g.Y(yb)), Math.max(g.Y(ya), g.Y(yb))));
      }
      const tops = [...rec.lines.filter(([, c]) => c !== P.amber).flatMap(([pts]) => pts.map((q) => q[1])), ...rec.rects.flatMap(([, ya, , yb]) => [ya, yb])];
      const max = Math.max(...tops);
      return {
        k,
        gap,
        headroom: (rec.y[1] - max) / (rec.y[1] - rec.y[0]),
        rows: rec.boxes.filter((b) => b.text !== 'key').map((b) => b.text),
        keys: rec.boxes.filter((b) => b.text === 'key').length,
        inside: rec.boxes.every((b) => b.l >= g.pl - 1 && b.r <= g.pl + g.iw + 1 && b.t >= 0),
        canvas: document.querySelectorAll('.strip canvas')[k].clientHeight,
        x: rec.x,
        y: rec.y,
        lines: rec.lines.map(([pts, c]) => ({ color: c === P.cyan ? 'cyan' : c === P.magenta ? 'magenta' : c === P.amber ? 'amber' : 'other', n: pts.length, pts: pts.length > 3 ? [pts[0], pts[Math.floor(pts.length / 2)], pts[pts.length - 1]] : pts })),
        rects: rec.rects.map(([xa, ya, xb, yb, c, s]) => ({ x: (xa + xb) / 2, y: [ya, yb], color: c === P.cyan ? 'cyan' : c === P.magenta ? 'magenta' : 'other', alpha: s.alpha })),
        dots: rec.dots.map(([x, y, c]) => [x, y, c === P.amber])
      };
    });
  });
}
function stripChecks(label, [a, b]) {
  for (const s of [a, b]) check(`${label} strip ${s.k + 1}: legend rows ≥ 8 px clear of every curve and bar, upper headroom ≥ 38%, legend inside the plot`, s.gap >= 8 && s.headroom >= 0.38 && s.inside && s.keys === 3, JSON.stringify({ gap: s.gap, headroom: s.headroom, canvas: s.canvas, rows: s.rows, keys: s.keys, inside: s.inside }));
  check(`${label}: both strip canvases are at least 118 px tall`, a.canvas >= 118 && b.canvas >= 118, JSON.stringify([a.canvas, b.canvas]));
}
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  await pick(CARD1);
  const [a, b] = await strips(page);
  stripChecks(lang + ' desktop', [a, b]);
  const mags = a.lines.filter((l) => l.color === 'magenta'),
    cy = a.lines.find((l) => l.color === 'cyan');
  check(`${lang} strip 1: A_err = 1/(1 − s) rises from 1 to 25 and x from 0 to 4.8990 over [0, 0.96], the chord stays below 2, one amber cursor`, same(a.x, [0, 0.96]) && mags.length === 2 && near(mags[0].pts[0][1], 1, 1e-12) && near(mags[0].pts[1][1], 1 / (1 - 0.48), 1e-9) && near(mags[0].pts[2][1], 25, 1e-9) && near(mags[1].pts[2][1], Math.sqrt(24), 1e-9) && !!cy && near(cy.pts[2][1], 2 * Math.sqrt(0.96), 1e-12) && cy.pts[2][1] < 2 && a.lines.filter((l) => l.color === 'amber').length === 1 && a.lines.filter((l) => l.color === 'amber')[0].pts.every((q) => near(q[0], 0.8, 1e-12)), JSON.stringify(a.lines));
  const nNow = (await state()).N;
  const up = b.rects.filter((r) => r.color === 'magenta'),
    down = b.rects.filter((r) => r.color === 'cyan');
  const balanced = Array.from({ length: 30 }, (_, i) => i + 1).every((n) => {
    const u = up.filter((r) => near(r.x, n, 1e-9)),
      d = down.filter((r) => near(r.x, n, 1e-9)),
      f = factor(n),
      total = d.reduce((sum, r) => sum + (r.y[0] - r.y[1]), 0);
    const count = Object.values(f).reduce((x, y) => x + y, 0);
    return (n === 1 ? u.length === 0 : u.length === 1 && near(u[0].y[1], Math.log(n), 1e-12)) && d.length === count && near(total, Math.log(n), 1e-9) && (!PRIMES.includes(n) || (d.length === 1 && d[0].alpha > 0.9)) && (PRIMES.includes(n) || d.every((r) => r.alpha < 0.6));
  });
  check(`${lang} strip 2: ln N up, −v_p(N) ln p down, balanced for N = 1 … 30; a prime has one bright new channel`, balanced && b.lines.some((l) => l.color === 'cyan' && l.pts.every((q) => q[1] === 0)) && b.lines.filter((l) => l.color === 'amber').every((l) => l.pts.every((q) => q[0] === nNow)) && b.dots.some((d) => d[0] === nNow && d[1] === 0 && d[2]) && b.lines.filter((l) => l.color === 'amber').length === 1);
  check(`${lang} strips: the meta lines state the laws`, /1\/\(1 - s\)/.test((await textOf('plotMeta')).replaceAll('−', '-')) && (await textOf('plotMetaB')).endsWith(') = ln 1 = 0'), (await textOf('plotMeta')) + ' | ' + (await textOf('plotMetaB')));
}
{
  // the smallest strip canvas, 118 px, with 3 px in reserve for faces with a deeper descent than the local ones
  const p = await T.open(BOOK, ID, '?lang=zh', { reducedMotion: 'reduce' });
  await settle(p);
  await p.addStyleTag({ content: '.strip canvas { height: 118px !important; min-height: 118px !important; flex: none !important; }' });
  await p.evaluate(() => window.dispatchEvent(new Event('resize')));
  await settle(p);
  const low = await strips(p);
  check('on a 118 px canvas both legends keep 8 px and 3 px in reserve from every curve, bar and cursor', low.every((s) => s.canvas === 118 && s.gap >= 11), JSON.stringify(low.map((s) => [s.canvas, s.gap])));
  await p.context().close();
}
check('the strips lie outside the stage, below the tour bar', await page.evaluate(() => !document.querySelector('#stage .strip') && document.querySelector('.strip').getBoundingClientRect().top >= document.querySelector('#tour').getBoundingClientRect().bottom - 1 || getComputedStyle(document.querySelector('#tour')).display === 'none'));

/* ---------- narrow pages, embeds, cited figures, stills ---------- */
const MIRROR_KEEP = ['s', 'N', 'tau4', 'tau5', 'scene', 'preset', 't'];
async function mirrorLens(p, label) {
  await p.evaluate(() => scrollTo(0, 0));
  const geo = await p.evaluate(() => {
    const box = (s) => {
      const b = document.querySelector(s).getBoundingClientRect();
      return { l: b.left, r: b.right, t: b.top, b: b.bottom };
    };
    const btn = document.querySelector('#mobileLensBtn');
    return { btn: box('#mobileLensBtn'), tour: box('#tour'), stage: box('#stage'), row: [box('#prevBtn'), box('#tour .what b'), box('#nextBtn')], clipped: btn.scrollWidth > btn.clientWidth + 0.5, vh: innerHeight, docW: document.documentElement.scrollWidth, vw: innerWidth };
  });
  const meet = (a, b) => a.l < b.r - 0.5 && b.l < a.r - 0.5 && a.t < b.b - 0.5 && b.t < a.b - 0.5;
  check(`${label}: the mirror lens button sits in the tour bar under the stage, on the first screen, clear of ◀, the name and ▶`, (await p.locator('#mobileLensBtn').isVisible()) && geo.btn.t >= geo.stage.b - 0.5 && geo.btn.b <= geo.tour.b + 0.5 && geo.btn.b <= geo.vh && geo.row.every((b) => !meet(geo.btn, b)) && !geo.clipped && geo.docW <= geo.vw, JSON.stringify(geo));
  const before = await state(p),
    pressed = () => Promise.all(['#mobileLensBtn', '#lensToggleBtn'].map((s) => p.getAttribute(s, 'aria-pressed')));
  await p.click('#mobileLensBtn');
  await settle(p);
  const on = await state(p);
  check(`${label}: it switches to the flat lens, keeps both switches in step and keeps the experiment`, before.lens === 0 && on.lens === 1 && same(await pressed(), ['true', 'true']) && MIRROR_KEEP.every((k) => same(on[k], before[k])) && /MODEL/.test(await textOf('hudBig', p)));
  await layout(p, label + ' flat lens');
  await p.click('#mobileLensBtn');
  await settle(p);
  check(`${label}: and back`, (await state(p)).lens === 0 && same(await pressed(), ['false', 'false']));
}
/** The strips of the whole lab embedded in a chapter: both canvases whole, apart, above the rail. */
async function stripEmbedChecks(p, label) {
  await p.evaluate(() => scrollTo(0, 0));
  await settle(p);
  const g = await p.evaluate(() => {
    const box = (el) => {
      const b = el.getBoundingClientRect();
      return { l: b.left, r: b.right, t: b.top + scrollY, b: b.bottom + scrollY, h: b.height };
    };
    const q = (s) => box(document.querySelector(s));
    return { strip: q('.strip'), rail: q('footer.rail'), tour: q('#tour'), stage: q('#stage'), plot: q('#plot'), plotB: q('#plotB'), panels: [...document.querySelectorAll('.strip .panel')].map(box), heads: [...document.querySelectorAll('.strip .panel .head')].map(box), vh: innerHeight, embed: document.documentElement.hasAttribute('data-embed'), figure: document.documentElement.hasAttribute('data-figure') };
  });
  const inside = (a, b) => a.l >= b.l - 1 && a.r <= b.r + 1 && a.t >= b.t - 1 && a.b <= b.b + 1,
    area = (a, b) => Math.max(0, Math.min(a.r, b.r) - Math.max(a.l, b.l)) * Math.max(0, Math.min(a.b, b.b) - Math.max(a.t, b.t));
  const [pa, pb] = g.panels;
  check(`${label}: the strip holds both plots whole (≥ 118 px each), apart, under their headings and above the rail; stage, then tour, then strip`, g.embed && !g.figure && g.plot.h >= 118 && g.plotB.h >= 118 && inside(g.plot, pa) && inside(g.plotB, pb) && inside(pa, g.strip) && inside(pb, g.strip) && g.plot.t >= g.heads[0].b - 1 && g.plotB.t >= g.heads[1].b - 1 && area(pa, pb) === 0 && g.strip.b <= g.rail.t + 0.5 && g.stage.b <= g.tour.t + 0.5 && g.tour.b <= g.strip.t + 0.5 && g.stage.t >= 0, JSON.stringify(g));
  stripChecks(label, await strips(p));
}
const FIGURE_TEXT = {
  [CARD1]: ['s = 0.80', '≈ 53.13°', 'x = 2'],
  [CARD2]: ['s = 1/2', '≈ 53.13°', '≈ 35.26°'],
  [CARD3]: ['N = 5', '5 × 1/5 = 1'],
  [CARD4]: ['12', 'ln 2'],
  [CARD5]: ['1 : 2 : 3', 'ln 2 : ln 3 : ln 5']
};
for (const lang of ['zh', 'en']) {
  // the phone: on every card the stage and the tour bar, with the mirror lens button, stay on the first screen
  {
    colorScheme = 'light';
    const p = await T.open(BOOK, ID, '?lang=' + lang, { viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await settle(p);
    const visited = [];
    for (let j = 0; j < IDS.length; j++) {
      const s = await state(p);
      visited.push(s.preset);
      const fold = await p.evaluate(() => {
        scrollTo(0, 0);
        const b = (q) => document.querySelector(q).getBoundingClientRect();
        return { stage: b('#stage').bottom, stageH: b('#stage').height, tour: b('#tour').bottom, btn: b('#mobileLensBtn').bottom, vh: innerHeight };
      });
      check(`${lang}/390×844/${s.preset}: the stage (≥ 440 px), the tour bar and the mirror lens button stay inside the first screen`, fold.stageH >= 440 && fold.stage <= fold.vh && fold.tour <= fold.vh && fold.btn <= fold.vh, JSON.stringify(fold));
      await layout(p, `${lang}/390×844/${s.preset}`);
      if (lang === 'en') check(`English 390/${s.preset}`, !(await cjkLeftovers(p)).length);
      await mirrorLens(p, `${lang}/390×844/${s.preset}`);
      await p.locator('.tour [data-tour="next"]').click();
      await settle(p);
    }
    check(`${lang}/390×844: five steps visit all five cards`, same([...visited].sort(), [...IDS].sort()), JSON.stringify(visited));
    stripChecks(`${lang}/390×844`, await strips(p));
    await p.context().close();
  }
  // the whole lab in a chapter
  for (const [width, height] of [
    [390, 620],
    [740, 620],
    [1280, 760]
  ]) {
    colorScheme = 'dark';
    const label = `${lang}/embed ${width}×${height}`;
    const p = await T.open(BOOK, ID, '?embed=1&lang=' + lang, { viewport: { width, height }, reducedMotion: 'reduce' });
    await settle(p);
    await layout(p, label);
    await mirrorLens(p, label);
    await stripEmbedChecks(p, label);
    await p.context().close();
  }
  // the cited figures: what a chapter shows
  for (const width of [334, 740])
    for (const id of IDS) {
      const label = `${lang}/figure ${width}×500/${id}`;
      const p = await T.open(BOOK, ID, `?embed=1&lang=${lang}&preset=${id}`, { viewport: { width, height: 500 }, reducedMotion: 'no-preference' });
      await settle(p);
      const m = await state(p);
      check(`${label}: opens parked on the declared frame`, m.preset === id && !m.playing && near(m.t, CARDS[id].still, 1e-9));
      await layout(p, label, true);
      const note = await p.locator('.tour .tour-note').innerText();
      check(`${label}: the note states the numbers of the still, without scripts, and names no gold or amber`, FIGURE_TEXT[id].every((x) => note.includes(x)) && (await p.locator('.tour .tour-note sub, .tour .tour-note sup').count()) === 0 && !/金|琥珀|gold|amber/i.test(note), note);
      const whole = () => p.evaluate(() => { const n = document.querySelector('.tour .tour-note'); return n.scrollHeight <= n.clientHeight + 1 && n.scrollWidth <= n.clientWidth + 1; });
      check(`${label}: the note is whole, without scrolling`, await whole(), note);
      check(`${label}: strip, side columns and mirror lens button are not there`, (await p.locator('.strip').isHidden()) && (await p.locator('#rail').isHidden()) && (await p.locator('#evidence').isHidden()) && (await p.locator('#mobileLensBtn').isHidden()));
      if (lang === 'en') check(`${label}: no Chinese left`, !(await cjkLeftovers(p)).length);
      // ⏮ in the frame: the note follows the degenerate frame
      await p.evaluate(() => [...document.querySelectorAll('#rewindBtn, #rew')].find((b) => b.getClientRects().length).click());
      await settle(p);
      const start = await p.locator('.tour .tour-note').innerText();
      check(`${label}: ⏮ rewrites the note for the degenerate frame`, (await state(p)).regime === 'zero' && start.startsWith(DEGENERATE[id][lang][0]) && start !== note && !/金|琥珀|gold|amber/i.test(start) && (await whole()), start);
      await layout(p, `${label} at the start`, true);
      // free play in the frame (the handle moved by a key): the note names only the stage, the tour bar and the rail
      const handle = p.locator('#stageHandle');
      await handle.focus();
      await p.keyboard.press('ArrowRight');
      await settle(p);
      const idle = await p.locator('.tour .tour-note').innerText();
      check(`${label}: the free-play note of the frame names only what it shows`, (await state(p)).preset === null && /^(自由探索|Free play)/.test(idle) && !/滑块|透镜|视角|slider|lens|view/i.test(idle) && (await whole()), idle);
      await layout(p, `${label} free play`, true);
      await p.keyboard.press('Home');
      await settle(p);
      const idleZero = await p.locator('.tour .tour-note').innerText();
      check(`${label}: free play at the start of the rail states the degenerate frame`, idleZero.startsWith(DEGENERATE[id][lang][0]) && (await whole()), idleZero);
      await p.context().close();
    }
  for (const id of IDS) {
    const p = await openStill(T, BOOK, ID, id, lang);
    const m = await state(p);
    check(`still ${lang}/${id} parks on the declared frame, without handle or mirror button`, !m.playing && near(m.t, CARDS[id].still, 1e-9) && m.scene === CARDS[id].scene && (await p.locator('#stageHandle').isHidden()) && (await p.locator('#mobileLensBtn').isHidden()));
    const want = {
      [CARD1]: () => f4(m.tan.x) === '2.0000' && f4(m.tan.err) === '5.0000',
      [CARD2]: () => f2(m.rod.coax.gapDeg) === '53.13' && f2(m.rod.orth.axisDeg) === '35.26',
      [CARD3]: () => m.N === 5 && m.ade.product === 1,
      [CARD4]: () => m.instances.fixed.cage.F5 === 12,
      [CARD5]: () => m.orb5.logCells === 512 && m.orb5.ratioCells === 32
    }[id];
    check(`still ${lang}/${id} carries the numbers of its caption`, want());
    const marks = await p.evaluate(() => TRV.solids[0].marks().map((k) => [k.key, k.hidden]));
    check(`still ${lang}/${id}: the amber point of the current quantity is in view`, marks.some(([k, hidden]) => k === 'probe' && !hidden), JSON.stringify(marks.filter(([k]) => k === 'probe')));
    await p.context().close();
  }
}
// reduced motion: cards park at once
{
  const p = await T.open(BOOK, ID, '?lang=zh', { reducedMotion: 'reduce' });
  await settle(p);
  for (const id of IDS) {
    await p.evaluate((c) => document.querySelector(`[data-preset="${c}"]`).click(), id);
    await settle(p);
    const s = await state(p);
    check(`reduced motion: ${id} parks on its still at once`, s.preset === id && !s.playing && !s.blending && near(s.t, CARDS[id].still, 1e-9));
  }
  await p.context().close();
}
check('permanent dark console in both system schemes', !paletteMutations.length && paletteDocuments.every((x) => x.absent) && paletteDocuments.some((x) => x.dark) && paletteDocuments.some((x) => !x.dark));
check('zero console warnings', browserWarnings.length === 0, browserWarnings.slice(0, 3).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('zero browser or request errors', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));
await T.finish();
