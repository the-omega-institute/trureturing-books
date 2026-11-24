import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, viewportShare, settle, openStill, playsAfter, until, stageView, cjkLeftovers, capitalGreek, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';
import { ROOT, resolveBook, vizCitations } from '../../../../tools/node/viz-common.mjs';

const BOOK = 'quantum-geometry';
const ID = 'holographic-arc-manifold-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const THEORY = 'ch39-s32-holographic-arc-manifold-and-solenoid-unity.html#sec-ch39-holographic-arc-manifold-and-solenoid-unity';
const PI = Math.PI;
const TAU = 2 * PI;
const DEG = PI / 180;
const LN2 = Math.log(2);
// the card, its scene and the rail value t ∈ [0, 1] it parks on (N = 6 + 30t, φ = 360°·t, log₂ x = 12t − 6, X = 1.5 + 14.5t)
const CARDS = {
  'tangent-scales-vs-chartfree-arc': { scene: 'scales', still: 12 / 30 },
  'meridian-zero-one-infinity-closure': { scene: 'meridian', still: 0.75 },
  'add-mul-lie-spinor-flows': { scene: 'flows', still: 0.25 },
  'logarithmic-arclength-pole-deceleration': { scene: 'clock', still: 0.75 },
  'prime-solenoid-vs-flat-sawtooth': { scene: 'prime', still: 5.5 / 14.5 }
};
const ORDER = Object.keys(CARDS);
const [S_CARD, M_CARD, F_CARD, K_CARD, P_CARD] = ORDER;
const DEFAULT = S_CARD;
const GIDS = [
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul',
  'D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev',
  'D5/S3/Quantum/Algebra/InvariantMetric/LowDimensionInvariantMetric.exists_basis_bracket_eq_smul_cross',
  'D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum',
  'D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.logarithmic_charge_conservation',
  'D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.logarithmicCharge_eq_zero_iff',
  'D5/S1/Solenoid/ThroatTransitionCocycle.three_lift_difference_cocycle',
  'D5/S3/Arith/AbsoluteValues/OstrowskiClassification.rational_absolute_value_classification',
  'D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula',
  'D5/S3/Arith/Congruence/PadicBallFiberCorrespondence.congruenceFiber_eq_closedBall_inter_range',
  'D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product',
  'D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence',
  'D5/S3/Fourier/Asymptotics/TorusOrbitEquidistribution.result'
];
const LENS = {
  zh: ['全息圆弧流形 · M_Ω 无切板光滑闭合', '传统黎曼切板对照（MODEL）· T_pM 鳞片与横截锯齿'],
  en: ['Holographic Arc Manifold · Chart-Free M_Ω', 'Riemannian Tangent-Plate Contrast (MODEL) · Scales &amp; Sawtooth']
};
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const f4 = (v) => (Math.abs(v) < 5e-5 ? 0 : v).toFixed(4);

/* ---------- independent mathematics, written here and never calling the page ---------- */
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));
const sub = (a, b) => a.map((x, i) => x - b[i]);
const unit = (a) => a.map((x) => x / norm(a));
/** Quaternions as 4 × 4 real matrices of left multiplication. */
const leftMatrix = ([w, x, y, z]) => [
  [w, -x, -y, -z],
  [x, w, -z, y],
  [y, z, w, -x],
  [z, -y, x, w]
];
const qm = (a, b) => leftMatrix(a).map((row) => dot(row, b));
const conj = ([w, x, y, z]) => [w, -x, -y, -z];
/** x₀ = e^{75°·i}, x₁ turned by 360°/N, xₙ₊₂ = xₙ₊₁ x̄ₙ xₙ₊₁ (renormalized at every step). */
function heapOf(N) {
  const e = (a) => [Math.cos(a), Math.sin(a), 0, 0],
    xs = [e(75 * DEG), e(75 * DEG + TAU / N)];
  while (xs.length <= N) xs.push(unit(qm(qm(xs[xs.length - 1], conj(xs[xs.length - 2])), xs[xs.length - 1])));
  return xs;
}
/** Polynomial vector fields a(x)∂ₓ: [a∂, b∂] = (a b′ − b a′)∂, coefficients by integers. */
const deriv = (a) => a.slice(1).map((c, i) => c * (i + 1));
const pmul = (a, b) => {
  const out = new Array(Math.max(1, a.length + b.length - 1)).fill(0);
  a.forEach((x, i) => b.forEach((y, j) => (out[i + j] += x * y)));
  return out;
};
const trim = (a) => {
  const b = a.slice();
  while (b.length && b[b.length - 1] === 0) b.pop();
  return b;
};
const padd = (a, b, t = 1) => Array.from({ length: Math.max(a.length, b.length) }, (_, i) => (a[i] || 0) + t * (b[i] || 0));
const polyBracket = (a, b) => trim(padd(pmul(a, deriv(b)), pmul(b, deriv(a)), -1));
const peval = (a, x) => a.reduceRight((s, c) => s * x + c, 0);
const FIELD = { plus: [1], div: [0, 0, 1], mul: [0, 1] };
/** 2 × 2 matrices of the Möbius flows x ↦ x + s, x/(1 − sx), eˢx at s → 0. */
const E = [[0, 1], [0, 0]],
  Fm = [[0, 0], [-1, 0]],
  H2 = [[0.5, 0], [0, -0.5]];
const mm = (a, b) => a.map((r) => b[0].map((_, j) => r[0] * b[0][j] + r[1] * b[1][j]));
const mc = (a, b, s = 1, t = 1) => a.map((r, i) => r.map((x, j) => s * x + t * b[i][j]));
const comm = (a, b) => mc(mm(a, b), mm(b, a), 1, -1);
const tr = (a) => a[0][0] + a[1][1];
/** Chebyshev by the least common multiple: ψ(X) = ln lcm(1, …, ⌊X⌋). */
const gcdN = (a, b) => (b ? gcdN(b, a % b) : a);
const lcmTo = (n) => {
  let l = 1n;
  for (let k = 2n; k <= BigInt(n); k++) l = (l / gcdN(l, k)) * k;
  return l;
};
const psi = (X) => Math.log(Number(lcmTo(Math.floor(X + 1e-9))));
const PP = [];
for (let n = 2; n <= 16; n++) {
  let p = 2;
  while (n % p) p++;
  let k = n,
    m = 0;
  while (k % p === 0) {
    k /= p;
    m++;
  }
  if (k === 1) PP.push({ n, p, m });
}

/* ---------- exact numbers, written here: fractions [p, q] of integers, and what a printed relation says ---------- */
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const fracN = (p, q = 1) => {
  const [a, b] = [BigInt(p), BigInt(q)],
    g = gcdN(a < 0n ? -a : a, b) || 1n;
  return [a / g, b / g];
};
const mulN = ([a, b], [c, d]) => fracN(a * c, b * d);
const subN = ([a, b], [c, d]) => fracN(a * d - c * b, b * d);
const cmpN = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
const numN = ([p, q]) => Number(p) / Number(q);
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
const tenN = (e) => (e < 0 ? [1n, 10n ** BigInt(-e)] : [10n ** BigInt(e), 1n]);
const expOf = (e) => Number(e.replace('⁻', '-').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (d) => SUP.indexOf(d)));
/** The decimal a printed text names: 0.0205, −6.429×10⁻⁸. */
function decimalN(t) {
  const [m, e = '⁰'] = t.replace('−', '-').split('×10'),
    [whole, part = ''] = m.split('.');
  return mulN([BigInt(whole + part), 1n], tenN(expOf(e) - part.length));
}
const SCI = '\\d\\.\\d{3}×10⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+';
const VALUE = `(?:−?\\d+(?:/2)? [−+] ${SCI}|−?${SCI}|−?\\d+\\.\\d+)`;
const MARKS = [-1, -0.5, 0, 0.5, 1, 2];
/** What is wrong with the relation `sign printed` of a value: q the value as a fraction (null: irrational), x the value as a double,
    off: x − v to full accuracy for the landmarks v where the double has lost it; '' when it is right. “=” is written exactly when
    the printed decimal is the value; a rounding is within half a unit of the last digit; a value that is not a landmark is never
    printed as one, and one that is zero in the decimals shown is written in significant digits. */
function wrongRelation(sign, printed, q, x, off = {}, marks = MARKS) {
  const tail = /^(−?\d+(?:\/2)?) ([−+]) (.*)$/.exec(printed);
  if (tail) {
    const [n, d = '1'] = tail[1].replace('−', '-').split('/'),
      v = Number(n) / Number(d),
      gap = v in off ? off[v] : q ? numN(subN(q, doubleN(v))) : x - v,
      written = (tail[2] === '−' ? -1 : 1) * numN(decimalN(tail[3]));
    if (sign !== '≈') return 'a tail with =';
    if (!marks.includes(v) || Math.abs(gap) > 6e-3) return 'a tail of a value far from its landmark';
    return Math.abs(written - gap) <= 6e-4 * Math.abs(gap) ? '' : `tail ${gap}`;
  }
  const v = decimalN(printed);
  if (printed.includes('×10')) return sign === '=' || Math.abs(numN(v) - x) > 6e-4 * Math.abs(x) ? `digits of ${x}` : '';
  if ((sign === '=') !== (!!q && cmpN(q, v) === 0)) return `exactness of ${q ? strN(q) : x}`;
  if (sign === '≈' && marks.includes(numN(v))) return 'a landmark printed of another value';
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
/** A value as the page must print it in d decimals: q its fraction or null, x its double. */
function said(q, x, d = 4) {
  if (q && (q[0] * 10n ** BigInt(d)) % q[1] === 0n) return `= ${numN(q).toFixed(d).replace('-', '−')}`;
  return `≈ ${x.toFixed(d).replace('-', '−')}`;
}
const sciText = (x) => {
  const [m, e] = x.toExponential(3).split('e');
  return `${m.replace('-', '−')}×10${String(Number(e)).replace('-', '⁻').replace(/\d/g, (d) => SUP[d])}`;
};
/* Digits that round a value to the nearest are no side of an inequality, whatever stands on its other side. Nothing is exempt:
   no name, no index and no area of the page is taken out before the search. */
const SIGN = '[<>≤≥≪≫＜＞≦≧]';
/** The clauses of a text: what stands between two separators, every parenthesis read as a clause of its own. */
function clauses(text) {
  let t = text.replace(/\s+/g, ' ');
  const out = [];
  for (let m; (m = /[(（]([^()（）]*)[)）]/.exec(t)); ) {
    out.push(m[1]);
    t = `${t.slice(0, m.index)}◦${t.slice(m.index + m[0].length)}`;
  }
  return [...out, t].flatMap((x) => x.split(/[，；。、,;:：¶]| · | → | \/ |\.(?=\s|$)/)).map((x) => x.trim());
}
const MIXED = new RegExp(`≈.*${SIGN}|${SIGN}.*≈`);
/** A rounded value right beside an inequality sign, read through every parenthesis and separator but a comma, a stop or a dot. */
const BESIDE = new RegExp(`≈ ?[^，；。、,;:：·¶≈=]*?${SIGN} ?[−\\d|‖φκτψ√e]|${SIGN} ?≈`, 'g');
/** A decimal, rounded or exact, right beside an inequality sign. */
const DECIMAL = new RegExp(`\\d\\.\\d+°? ?${SIGN}|${SIGN} ?−?\\d+\\.\\d`, 'g');
const mixed = (text) => {
  const t = text.replace(/\s+/g, ' ');
  return [...clauses(t).filter((x) => MIXED.test(x)), ...[...t.matchAll(DECIMAL)].map((m) => m[0]), ...[...t.matchAll(BESIDE)].map((m) => m[0])];
};

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
  await context.exposeBinding('__manifoldPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__manifoldPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener(
      'DOMContentLoaded',
      () => window.__manifoldPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined, dark: matchMedia('(prefers-color-scheme: dark)').matches }).catch(() => {}),
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
const gate = [];
T.check = (name, ok, detail) => {
  gate.push([name, !!ok]);
  return check(name, ok, detail);
};
await stageFirstChecks(T, BOOK, ID, { solid: true });
T.check = check;
{
  const ran = (re) => gate.some(([name]) => re.test(name)),
    esc = (x) => x.replace(/[-/]/g, '\\$&');
  for (const id of ORDER) {
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

/* ---------- sources, registry, dependencies and the citing chapter ---------- */
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
  check(`source ${file}: no red (the page has no open problem)`, !/--warn|P\.warn|lean open|c-wn|class="sw wn/.test(src));
}
check('reserved identifiers are absent from the suite and the registry entry', [suite, entryText].every((src) => !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src) && !hangul.test(src)));
check(
  'registration: §31.5, live, added 2026-11-22, capture_lock links, the exact code and titles',
  !!entry &&
    entry.code === 'OMEGA//MANIFOLD' &&
    entry.status === 'live' &&
    entry.added === '2026-11-22' &&
    entry.capture_lock === 'links' &&
    entry.chapter === 31 &&
    entry.section === '31.5' &&
    entry.title === '全息圆弧流形（M_Ω）沙盘：超越黎曼切板，同流形光滑统一加法、乘法、ln 与素数螺线环' &&
    entry.title_en === 'Holographic Circular-Arc Manifold (M_Ω): Beyond Flat Tangent Plates, Unifying +, ×, ln & Prime Solenoid Loops' &&
    entry.summary.startsWith('对比拼满平直切空间鳞片 T_pM 的伪光滑黎曼流形与无切板三元闭合的全息圆弧流形') &&
    entry.summary.endsWith('以及螺线管内周长为 ln p 的光滑素数环与平直横截阶梯伪影。') &&
    entry.summary_en.startsWith('Contrasts flat tangent-plate Riemannian manifolds against the chart-free Holographic Circular-Arc Manifold') &&
    entry.summary_en.endsWith('smooth prime solenoid loops of length ln p whose flat cross-sections yield Chebyshev\'s staircase.'),
  entryText.slice(0, 200)
);
check(
  'registration: five cards in order, the fifteen GIDs in order, the theory anchors of §31.5',
  !!entry &&
    same(entry.presets, ORDER) &&
    same(Object.keys(entry.preset_titles), ORDER) &&
    same(entry.lean.map((x) => x.gid), GIDS) &&
    entry.theory.length === 1 &&
    entry.theory[0].label === '§31.5 · 全息圆弧流形与阿代尔螺线管同体' &&
    entry.theory[0].label_en === '§31.5 · The Holographic Circular-Arc Manifold and Adelic Solenoid Unity' &&
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
check('the two lenses carry their exact names in both languages', ['zh', 'en'].every((lang) => LENS[lang].every((name) => sources['index.html'].includes(`<span class="${lang}">${name}</span>`))));
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
  READS.length === 25 && depList.length === 25 && same([...depList].sort(), READS) && !depList.some((d) => d.endsWith('.md')) && suite.split('deps.suites[').length === 3,
  JSON.stringify(depList)
);
check('the suite reads no chapter text directly (the citations come from the block parser)', !/readFileSync\([^)]*\.md/.test(suite));
// the chapter is being written in parallel: only its formal .viz blocks are read, in order, through tbook's parser
const citations = vizCitations(resolveBook(BOOK), ID);
for (const lang of ['zh', 'en']) {
  const seq = citations.filter((c) => c.lang === lang).map((c) => [c.preset, c.height]);
  check(
    `${lang}: §31.5 cites the five cards in order at height 500, then the whole lab at 620`,
    same(seq, [...ORDER.map((id) => [id, 500]), [null, 620]]),
    JSON.stringify(seq)
  );
}

/* ---------- static text: pure green boxes, no written numbers, no mixed inequality ---------- */
const plain = (html) => html.replace(/<[^>]*>/g, '').replaceAll('&gt;', '>').replaceAll('&lt;', '<').replaceAll('&amp;', '&').replace(/\s+/g, ' ');
const BOXES = [...sources['index.html'].matchAll(/<div class="lean( [a-z]+)?">(.*?)<\/div>/g)].map((m) => ({
  kind: (m[1] || '').trim(),
  badge: (/<span class="ok">([^<]*)<\/span>/.exec(m[2]) || [])[1],
  gid: (/data-lean-gid="([^"]+)"/.exec(m[2]) || [])[1] || null,
  zh: plain((/<span class="zh">(.*?)<\/span>(?=<span class="en">)/.exec(m[2]) || ['', ''])[1]),
  en: plain((/<span class="en">(.*?)<\/span>(?=<a data-lean-gid|<\/span>$)/.exec(m[2]) || ['', ''])[1])
}));
const GREEN = BOXES.filter((b) => !b.kind);
check(
  'the panel holds fifteen green boxes in the order of the theorem box of §31.5, then ARGUED, MODEL and NUM',
  same(GREEN.map((b) => b.gid), GIDS) && GREEN.every((b) => b.badge === 'LEAN ✓') && same(BOXES.slice(15).map((b) => [b.kind, b.badge]), [['argued', 'ARGUED'], ['model', 'MODEL'], ['num', 'NUM']]) && BOXES.length === 18
);
// a green box says what the frozen theorem says: no instance of the page, no computed number, no rounding, no drift
const INSTANCE = /页面|本页|舞台|探针|滑块|取样|偏差|余量|数值|演示|这里的|相差|实例|手工推导|刻度|命名的环|this page|the page|on the page|stage|probe|slider|\bgap\b|drift|residue|instance|numerical|computes|differ by|derived by hand|off by|named loop|≈|\d\.\d|10⁻|整系数|整数系数|integer.coefficient/i;
check(
  'green boxes: no instance, number, rounding, drift or remark of the page in any of the fifteen, in either language',
  GREEN.every((b) => b.zh.length > 30 && b.en.length > 30 && !INSTANCE.test(b.zh) && !INSTANCE.test(b.en)),
  GREEN.filter((b) => INSTANCE.test(b.zh) || INSTANCE.test(b.en)).map((b) => b.gid + ' ' + (INSTANCE.exec(b.zh) || INSTANCE.exec(b.en))[0]).join(' | ')
);
check('green boxes: no mixed inequality', GREEN.every((b) => !mixed(b.zh).length && !mixed(b.en).length));
// the hypotheses and conclusions of each frozen statement, in order, in both languages
const STATEMENT = [
  [['不交换', '链连通', '可任意接近 0', '特征秩为 5', '读取完备', '每个 o ∈ M', '双射 u : M ≃ 单位四元数', 'u(o) = 1', 'u(tri(x, y, z)) = u(x) u(y)⁻¹ u(z)', 'κ(x, y) = (1 + ⟨u(x), u(y)⟩)/2'], ['noncommutative', 'chain connected', 'touches zero', 'feature rank 5', 'reading complete', 'for every o ∈ M', 'a bijection u : M ≃ unit quaternions', 'u(o) = 1', 'u(tri(x, y, z)) = u(x) u(y)⁻¹ u(z)', 'κ(x, y) = (1 + ⟨u(x), u(y)⟩)/2']],
  [['一切单位四元数 a、b', 'κ(a, b) = (1 + ⟨a, b⟩)/2', 'κ(a, b) = 1 − dist(a, b)²/4'], ['all unit quaternions a and b', 'κ(a, b) = (1 + ⟨a, b⟩)/2', 'κ(a, b) = 1 − dist(a, b)²/4']],
  [['每个三元比较', '一切 o、x、y、z ∈ M', 'tri(x, y, z) = x · y⁻¹ · z', '单位元是 o', 'a · b = tri(a, o, b)', 'a⁻¹ = tri(o, a, o)'], ['every ternary comparison', 'all o, x, y, z ∈ M', 'tri(x, y, z) = x · y⁻¹ · z', 'identity o', 'a · b = tri(a, o, b)', 'a⁻¹ = tri(o, a, o)']],
  [['每个四元数序列', 'x0、x1 的模方为 1', '对一切 n ≥ 0 有 xn+2 = xn+1 xn* xn+1', '当且仅当', '对一切 n ≥ 0，xn 的模方为 1', 'xn+1 = Un(c)·x1 − Un−1(c)·x0（n = 0 时 U−1 = 0）', '⟨x0, xn⟩ = Tn(c)', 'c = ⟨x0, x1⟩', '第一、二类切比雪夫多项式'], ['every sequence', 'x0 and x1 have squared norm 1', 'xn+2 = xn+1 xn* xn+1 for every n ≥ 0', 'if and only if', 'for every n ≥ 0, xn has squared norm 1', 'xn+1 = Un(c)·x1 − Un−1(c)·x0 (with U−1 = 0 at n = 0)', '⟨x0, xn⟩ = Tn(c)', 'c = ⟨x0, x1⟩', 'Chebyshev polynomials of the first and second kinds']],
  [['实李代数', 'dimℝ L = 3', '不交换', '实双线性型', 'ad 不变', 'Φ([x, y], z) = −Φ(y, [x, z])', 'x ≠ 0 时 Φ(x, x) > 0', '则存在', 'c > 0', 'Φ(bi, bj) = δij', '标准正交', '对称正定', '一切 x、y ∈ L', '三维叉积'], ['noncommutative real Lie algebra', 'dimℝ L = 3', 'real bilinear form', 'ad-invariant', 'Φ([x, y], z) = −Φ(y, [x, z])', 'Φ(x, x) > 0 for x ≠ 0', 'Then there are', 'c > 0', 'Φ(bi, bj) = δij', 'Φ-orthonormal', 'symmetric positive-definite', 'for all x, y ∈ L', 'three-dimensional cross product']],
  [['n × n 复方阵（n 有限）', 'S = A + B', 'S S† = 1', 'A A† = (1/2)·1', 'B B† = (1/2)·1', '(A B†)† = −(A B†)'], ['complex n × n matrices (n finite)', 'S = A + B', 'S S† = 1', 'A A† = (1/2)·1', 'B B† = (1/2)·1', '(A B†)† = −(A B†)']],
  [['非零复数 zm', '一切正整数 m、n 有 zmnn = zm', '对数荷是 ln‖z1‖', '每个线程 z 与每个正整数 m', 'm·ln‖zm‖ 等于 z 的对数荷'], ['nonzero complex number zm', 'zmnn = zm for all positive integers m and n', 'logarithmic charge is ln‖z1‖', 'every thread z and every positive integer m', 'm·ln‖zm‖ equals the logarithmic charge']],
  [['每个复数幂线程 z', 'zmnn = zm', 'ln‖z1‖ = 0', '当且仅当', '一切正整数 m，‖zm‖ = 1'], ['every complex power thread z', 'zmnn = zm', 'ln‖z1‖ = 0', 'if and only if', '‖zm‖ = 1 for every positive integer m']],
  [['θm ∈ ℝ/ℤ', 'n·θmn = θm', '投影取 θ1', 'U 是任意集合', '投影两两相同', '投影都为 0', 'sβ(u) = sα(u) + kαβ(u)', 'sγ(u) = sβ(u) + kβγ(u)', 'sγ(u) = sα(u) + kαγ(u)', '唯一确定', 'kαγ(u) = kαβ(u) + kβγ(u)'], ['θm ∈ ℝ/ℤ', 'n·θmn = θm', 'projection takes θ1', 'U be any set', 'equal projections', 'projections are 0', 'sβ(u) = sα(u) + kαβ(u)', 'sγ(u) = sβ(u) + kβγ(u)', 'sγ(u) = sα(u) + kαγ(u)', 'the only map', 'kαγ(u) = kαβ(u) + kβγ(u)']],
  [['每个非平凡的实值绝对值 f', '通常的绝对值等价', '恰有一个自然数 p', 'p 是素数', 'p 进绝对值等价', 'f(x) ≤ f(y) ⇔ g(x) ≤ g(y)'], ['every nontrivial real-valued absolute value f', 'the usual absolute value', 'exactly one natural number p', 'p is prime', 'the p-adic absolute value', 'f(x) ≤ f(y) ⇔ g(x) ≤ g(y)']],
  [['每个有理数 x ≠ 0', '|x| · ∏p |x|p = 1', '全体素数', '有限支撑', 'p 进范数'], ['every rational x ≠ 0', '|x| · ∏p |x|p = 1', 'all primes', 'finitely supported', 'p-adic norm']],
  [['每个素数 p、自然数 k 与整数 x', '模 pk 与 x 同余的全体整数', '以 x 为心、p−k 为半径的闭球', 'ℤ 在 ℚp 中的像的交'], ['every prime p, natural number k and integer x', 'all integers congruent to x modulo pk', 'closed ball of centre x and radius p−k', 'the image of ℤ in ℚp']],
  [['每个 Re s > 1 的复数 s', 'Σn∈ℕ n−s = ∏p (1 − p−s)−1', '全体素数'], ['every complex number s with Re s > 1', 'Σn∈ℕ n−s = ∏p (1 − p−s)−1', 'all primes']],
  [['全体素数 p 为指标', '(ln p)p', '在 ℚ 上线性无关'], ['indexed by all primes p', '(ln p)p', 'linearly independent over ℚ']],
  [['I 是有限指标集', 'g ∈ (S¹)I', '整数幂子群的闭包', '总质量为 1 的哈尔测度', '{gn : n ∈ ℕ} 的闭包', '每个连续函数 f : G → ℂ', '(1/N) Σn=1N f(gn) → ∫G f dμ'], ['I be a finite index set', 'g ∈ (S¹)I', 'closure of the subgroup of integer powers', 'Haar measure of total mass 1', 'closure of {gn : n ∈ ℕ}', 'every continuous f : G → ℂ', '(1/N) Σn=1N f(gn) → ∫G f dμ']]
];
GREEN.forEach((b, i) => {
  const missing = ['zh', 'en'].flatMap((lang, j) => {
    let at = 0;
    return STATEMENT[i][j].filter((x) => {
      const k = b[lang].indexOf(x, at);
      if (k >= 0) at = k;
      return b[lang].indexOf(x) < 0;
    });
  });
  check(`green box ${i + 1}, ${GIDS[i].split('.').slice(-1)[0] === 'result' ? 'TorusOrbitEquidistribution.result' : GIDS[i].split('.').slice(-1)[0]}: the hypotheses and conclusions of the frozen statement in both languages`, !missing.length, missing.join(' | '));
});
check('green box 5: symmetry of Φ is a conclusion (the basis is orthonormal), not a hypothesis', GREEN[4].zh.split('对称').length === 2 && GREEN[4].zh.indexOf('对称') > GREEN[4].zh.indexOf('则存在') && GREEN[4].en.split('symmetric').length === 2 && GREEN[4].en.indexOf('symmetric') > GREEN[4].en.indexOf('Then there are'));
const BENCH_KEYS = ['quarter', 'ln2', 'cayley', 'steps', 'blade'];
{
  // everything the reader sees before the script runs holds no computed number: the NUM box, the spans of the drawer and the
  // outputs of the sliders are empty
  const html = sources['index.html'],
    body = html.slice(html.indexOf('<body')),
    spans = [...html.matchAll(/<span data-bench="([a-zA-Z0-9]+)">(.*?)<\/span>/g)].map((m) => [m[1], m[2]]);
  check('index.html: the NUM box is empty until the script fills it', html.split('<div class="lean num"><span class="ok">NUM</span><span><span class="zh">—</span><span class="en">—</span></span></div>').length === 2);
  check('index.html: the numbers of the drawer are empty spans, each name once per language', same(spans.map((x) => x[0]), [...BENCH_KEYS, ...BENCH_KEYS]) && spans.every((x) => x[1] === '—') && html.split('data-bench=').length === 11, JSON.stringify(spans));
  check('index.html: the outputs of the sliders are empty until the script writes them', ['nOut', 'phiOut', 'lxOut', 'xOut'].every((id) => new RegExp(`<output for="\\w+" id="${id}">—</output>`).test(html)));
  const decimals = [...plain(body.replace(/<button class="chip" data-speed[^>]*>[^<]*<\/button>/g, '')).matchAll(/(?<![§\d.])\d+\.\d+/g)].map((m) => m[0]);
  check('index.html: no decimal and no “≈” is written anywhere in the page text, the evidence or the drawer', !decimals.length && !plain(body).includes('≈'), decimals.join(' '));
  const described = (/<meta name="description" content="([^"]*)"/.exec(html) || ['', '≈ 0.5 > 0'])[1];
  check('index.html: no decimal, no “≈” and no mixed inequality in the description', described.length > 100 && !/\d\.\d|≈/.test(described) && !mixed(plain(described)).length);
  const chained = mixed(plain(body.replace(/<(?:div|p|li|section|span class="(?:zh|en)"|dt|h2|label)\b/g, '¶$&')));
  check('index.html: no rounded digits beside an inequality sign', !chained.length, chained.slice(0, 3).join(' | '));
  const js = sources['main.js'],
    code = js.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\s)\/\/ .*$/gm, '$1'),
    written = [...code.matchAll(/[=≈] ?−?\d+\.\d{2,}(?!\d|[;,)\]*/ ])|\b[01]\.0000|\d\.\d+°|10⁻[⁰¹²³⁴⁵⁶⁷⁸⁹]/g)].map((m) => m[0]);
  check('main.js: no computed result is written into a sentence', !written.length, written.join(' '));
  check('main.js: one formatter writes every relation (no “= ${fmt(” and no toFixed in a sentence)', !/[=≈] ?\$\{fmt\(|\.toFixed\(/.test(js) && js.split('function rel(q, x, d = 4, off = {}, marks = LANDMARKS)').length === 2);
  const beside = [...code.matchAll(/\$\{[^{}]*(?:Rel|rel|irr)\([^{}]*\)\}°? ?(?:&lt;|&gt;|[<>≤≥])|(?:&lt;|&gt;|[<>≤≥]) ?\$\{[^{}]*(?:Rel|irr)\(/g)].map((m) => m[0]);
  check('main.js: no template puts an inequality sign beside a printed relation', !beside.length, beside.join(' | '));
  const fill = "document.querySelector(`#basis .lean.num .${lang}`).innerHTML = numText(say);",
    spanFill = 'el.innerHTML = NUMBERS[el.dataset.bench](say);',
    clone = "$('drawerEvidence').append(";
  check(
    'main.js: the NUM box and the spans are filled once, from benchmarks(), before the evidence is copied into the drawer',
    [fill, spanFill, clone, 'const BENCH = benchmarks();'].every((x) => js.split(x).length === 2) && js.indexOf('const BENCH = benchmarks();') < js.indexOf(fill) && js.indexOf(fill) < js.indexOf(clone) && js.indexOf(spanFill) < js.indexOf(clone)
  );
}
{
  // the detectors find what they must and leave the separated forms: the negative control of every later scan
  const bad = ['κ ≈ 0.9698 < 1', '1 > κ ≈ 0.9698', '≈ 0.0031 ≤ 0.004', 'V₊ ≈ 1.0197 ≥ 0', '> ≈ 0.5', 'x = 0.5000 < 1', '0 ≤ 0.0046', '（ψ ≈ 6.0403 > 6）', '≈ 53.13° < 60°', 'τ ≈ 2.0794 ≤ 3', '2π ≈ 6.2832 > 6', '< 1.5708', '(value ≈ 0.6931) < 1'],
    good = ['续接 18 步回到 x₀，浮点偏差 < 10⁻¹⁴', 'Δφ = π/2 ≈ 1.5708，有限；x ≥ 0 时', 'κ ≈ 0.9698; on x ≥ 0 their mean', 'X ≤ 16。ψ ≈ 6.0403', '0 < κ 且 κ < 1（值 ≈ 0.9698）', 'ψ(7) = ln 420 ≈ 6.0403, jump ln 7 ≈ 1.9459', 'closing drift < 10⁻¹³; π²/6 ≈ 1.6449', '1 ≤ a, b ≤ 16'];
  check('the detector finds thirteen rounded or decimal digits beside an inequality sign, without exception, and leaves eight separated texts', bad.every((x) => mixed(x).length > 0) && good.every((x) => !mixed(x).length), JSON.stringify([bad.filter((x) => !mixed(x).length), good.filter((x) => mixed(x).length)]));
}

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.MANIFOLD_DEBUG.state);
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
      const s = window.MANIFOLD_DEBUG.state;
      return s.preset === id && !s.blending && !s.playing && Math.abs(s.t - still) < 1e-12;
    },
    [card, CARDS[card].still],
    // the clock advances at most 0.1 s per frame: on a busy machine a 5 s sweep can take ~50 slow frames
    150000
  );
  if (!parked) await pause(p);
  await settle(p);
  return parked;
}
const flat = (t) => t.replace(/\s+/g, ' ');
const textOf = async (id, p = page) => flat(await p.locator('#' + id).innerText()).replaceAll('−', '-');
const tagText = async (p = page) => (await p.locator('.stage .tags .tag:not([hidden])').allInnerTexts()).map(flat);
async function layout(p, label, figure = false) {
  const view = await stageView(p, '#stage', figure);
  const issues = [...view.layout, ...view.hud, ...(await labelOverlaps(p, '.stage .tag', 0)), ...(await capitalGreek(p))];
  check(label + ' framing and legible labels', !issues.length && (await overflowX(p)) === 0, JSON.stringify(issues));
}

/* ---------- the shell: three columns, strips under the stage, one drawer button ---------- */
{
  const shell = await page.evaluate(() => {
    const q = (s) => document.querySelector(s),
      box = (s) => q(s).getBoundingClientRect();
    return {
      inStage: !!q('#stage .strip, #stage #plot, #stage #plotB'),
      order: [...q('main.center').children].map((el) => el.id || el.className),
      strip: [...document.querySelectorAll('.strip canvas')].map((c) => c.id),
      first: q('#evidence').firstElementChild.id,
      info: document.querySelectorAll('#infoBtn').length,
      columns: [box('#rail').right <= box('#stage').left, box('#stage').right <= box('#evidence').left],
      rail: !!q('footer.rail #now')
    };
  });
  check(
    'the lab shell: rail, stage and evidence side by side, #tour then .strip (#plot, #plotB) under the stage, #infoBtn first in #evidence, the clock rail at the bottom',
    !shell.inStage && same(shell.order, ['stage', 'tour', 'strip']) && same(shell.strip, ['plot', 'plotB']) && shell.first === 'infoBtn' && shell.info === 1 && shell.columns.every(Boolean) && shell.rail,
    JSON.stringify(shell)
  );
}

/* ---------- scales: plates, creases, the heap continuation and the bump ---------- */
await pick(S_CARD);
{
  const s = await state();
  check(
    'the scales card opens by default and parks on N = 18: crease 20.00°, 360.00° in all, κ = cos²(π/18) = 0.9698, back on x₀ after 18 steps',
    s.preset === DEFAULT && s.scene === 'scales' && s.N === 18 && s.scales.crease.toFixed(2) === '20.00' && s.scales.sum.toFixed(2) === '360.00' && near(s.scales.kappa, Math.cos(PI / 18) ** 2, 1e-12) && f4(s.scales.kappa) === '0.9698' && s.scales.closure < 1e-12,
    JSON.stringify({ ...s.scales, xs: 0 })
  );
  check('the bump card default: shown, B(1/2) = 1, B(1/10) = e^{8 − 100 − 100/81} = 3.227·10⁻⁴¹', s.bump === true && near(s.scales.bumpHalf, 1, 1e-12) && near(s.scales.bumpTenth / Math.exp(8 - 100 - 100 / 81), 1, 1e-9));
  check('the readout writes the crease, the total and the bump', (await textOf('roScale')) === '= 20.00° · = 360.00° · ≈ 0.0154 · = 1.0000 · ≈ 3.227×10⁻⁴¹', await textOf('roScale'));
  const sub = await textOf('hudSub');
  check('HUD: the exact line of the frame, the drift of the closure as a power of ten', sub.includes('360°/18 = 20.00°，合计 = 360.00°') && sub.includes(`浮点偏差 ${belowText(s.scales.closure)}`) && !sub.includes('0.0000'), sub);
}
for (const N of [6, 7, 12, 25, 36]) {
  await input('#nRange', N);
  const s = await state(),
    mine = heapOf(N),
    c = Math.cos(TAU / N);
  let gap = 0,
    cheb = 0;
  s.scales.xs.forEach((q, n) => {
    gap = Math.max(gap, norm(sub(q, mine[n])));
    cheb = Math.max(cheb, Math.abs(dot(mine[0], q) - Math.cos(n * Math.acos(c))), Math.abs(dot(q, q) - 1), Math.abs(q[2]) + Math.abs(q[3]));
  });
  check(
    `N = ${N}: the heap points are the independent ones (4 × 4 matrices), ⟨x₀, xₙ⟩ = cos(n·360°/N), all on one great circle, x_N = x₀, crease 360°/N, total 360°`,
    s.N === N && gap < 1e-10 && cheb < 1e-10 && s.scales.closure < 1e-10 && near(s.scales.crease, 360 / N, 1e-9) && near(s.scales.sum, 360, 1e-8) && near(s.scales.corner, 1 / Math.cos(PI / N) - 1, 1e-12) && s.leanInstances.cheb.gap < 1e-9 && s.leanInstances.cheb.n === N && s.preset === null,
    JSON.stringify([gap, cheb, s.scales.closure])
  );
}
{
  // the plates: every corner lies in the tangent plane of its centre, outside the ball, and clear of the neighbours of its row
  let tangent = 0,
    inside = 0,
    meets = 0,
    crease = 0;
  for (const N of [6, 9, 12, 18, 27, 36]) {
    const pl = await page.evaluate((n) => window.MANIFOLD_DEBUG.plates(n), N);
    const rows = new Map();
    for (const p of pl) {
      for (const q of p.q) {
        tangent = Math.max(tangent, Math.abs(dot(q, p.n) - 1));
        if (norm(q) < 1 - 1e-9) inside++;
      }
      rows.set(p.row, [...(rows.get(p.row) || []), p]);
    }
    for (const row of rows.values())
      row.forEach((p, k) => {
        const next = row[(k + 1) % row.length];
        // beyond the neighbouring tangent plane a corner would pass through it: n′·q ≥ 1
        for (const q of p.q) if (dot(q, next.n) >= 1) meets++;
        for (const q of next.q) if (dot(q, p.n) >= 1) meets++;
      });
    const mer = rows.get(0);
    mer.forEach((p, k) => (crease = Math.max(crease, Math.abs(Math.acos(dot(p.n, mer[(k + 1) % mer.length].n)) / DEG - 360 / N))));
    if (mer.length !== N) crease = Infinity;
  }
  check('the plates: flat and tangent to the sphere, never inside it, neighbours of a row never meet, and those of the meridian meet their neighbours at exactly 360°/N', tangent < 1e-12 && inside === 0 && meets === 0 && crease < 1e-6, JSON.stringify([tangent, inside, meets, crease]));
}
{
  // the bump is C^∞ and not analytic: at its foot it beats every power of u, yet it is positive inside
  const B = await page.evaluate(() => [0, 0.02, 0.05, 0.1, 0.25, 0.5, 0.75, 0.9, 1, -0.2, 1.3].map((u) => window.MANIFOLD_DEBUG.bump(u)));
  const want = (u) => (u <= 0 || u >= 1 ? 0 : Math.exp(8 - u ** -2 - (1 - u) ** -2));
  check('the bump: 0 outside (0, 1), symmetric, the independent values, and B(u)/u²⁰ → 0 at the foot', [0, 0.02, 0.05, 0.1, 0.25, 0.5, 0.75, 0.9, 1, -0.2, 1.3].every((u, i) => Math.abs(B[i] - want(u)) <= 1e-12 * Math.max(1, want(u))) && near(B[4], B[6], 1e-15) && B[3] / 0.1 ** 20 < 1e-20 && B[2] / 0.05 ** 20 < 1e-100 && B[4] > 0);
  await page.click('[data-bump="off"]');
  await settle(page);
  check('the bump chip removes it (state, label)', (await state()).bump === false && !(await tagText()).some((t) => t.includes('C∞')));
  await page.click('[data-bump="on"]');
  await settle(page);
  check('and puts it back', (await state()).bump === true && (await tagText()).some((t) => t.includes('C∞')));
}
{
  const a = (await state()).scales;
  check('Lean instances of the heap: base points, reading and Chebyshev all agree to 10⁻⁹', await page.evaluate(() => {
    const I = window.MANIFOLD_DEBUG.state.leanInstances;
    return I.equiv < 1e-9 && I.dist < 1e-12 && I.tri < 1e-9 && I.cheb.gap < 1e-9;
  }), JSON.stringify(a.closure));
}

/* ---------- meridian: 0 · 1 · ∞ · −1 on one closed circle ---------- */
await pick(M_CARD);
{
  const s = await state();
  check(
    'the meridian card parks on φ = 270°: x = −1, κ = 1/2; the one-sided unit secants of step 10⁻⁴ differ by 2 sin(step/2) at 0 and ∞ (no corner), 3600 chords add to 7200 sin(π/3600)',
    s.scene === 'meridian' && near(s.phiDeg, 270, 1e-9) && near(s.mer.x, -1, 1e-12) && near(s.mer.kappa, 0.5, 1e-12) && [s.mer.jump0, s.mer.jumpInf].every((j) => near(j, 2 * Math.sin(0.5e-4), 1e-11)) && near(s.mer.length, 7200 * Math.sin(PI / 3600), 1e-11) && s.regime === 'neg'
  );
  check('labels name 0, 1, ∞, −1 with κ = 1, 1/2, 0, 1/2', same((await tagText()).map((t) => t.replaceAll('−', '-')).sort(), ['-1 · κ = 1/2', '0 · κ = 1', '1 · κ = 1/2', '∞ · κ = 0']), JSON.stringify(await tagText()));
}
for (const [chip, deg, x, kap] of [['0', 0, 0, 1], ['1', 90, 1, 0.5], ['inf', 180, '∞', 0], ['-1', 270, -1, 0.5]]) {
  await page.click(`#xChips [data-x="${chip}"]`);
  await settle(page);
  const s = await state();
  check(`x chip ${chip}: φ = ${deg}°, κ = ${kap}, the chip is pressed`, near(s.phiDeg, deg, 1e-9) && near(s.mer.kappa, kap, 1e-12) && (x === '∞' ? s.mer.x === '∞' && s.mer.tau === '∞' : near(s.mer.x, x, 1e-12)) && (chip !== '0' || s.mer.tau === '−∞') && (await page.getAttribute(`#xChips [data-x="${chip}"]`, 'aria-pressed')) === 'true');
}
check('at ∞ the HUD says φ = 180°, x = ∞, κ = 0 and at 0 it says x = 0, κ = 1', await (async () => {
  await page.click('#xChips [data-x="inf"]');
  await settle(page);
  const a = await textOf('hudSub');
  await page.click('#xChips [data-x="0"]');
  await settle(page);
  const b = await textOf('hudSub');
  return /φ = 180\.0°/.test(a) && /x = ∞/.test(a) && /κ = 0/.test(a) && a.includes('只差 ≈ 1.000×10⁻⁴') && /φ = 0\.0°/.test(b) && /x = 0/.test(b) && /κ = 1/.test(b) && b.includes('只差 ≈ 1.000×10⁻⁴');
})());
{
  // κ, x, τ and the metric by other routes on a dense set of angles, through 0, 1, ∞, −1 and back
  let worst = 0,
    speed = 0;
  for (const deg of [1, 17, 45, 89, 91, 133, 179, 181, 200, 271, 315, 359]) {
    await input('#phiRange', deg);
    const s = await state(),
      a = deg * DEG,
      t = Math.sin(a / 2) / Math.cos(a / 2),
      chord = Math.hypot(1 - Math.cos(a), Math.sin(a));
    worst = Math.max(worst, Math.abs(s.mer.x - t) / Math.max(1, Math.abs(t)), Math.abs(s.mer.kappa - (1 - chord ** 2 / 4)), Math.abs(s.mer.kappa - 1 / (1 + t * t)), Math.abs(s.mer.tau - 0.5 * Math.log((1 - s.mer.kappa) / s.mer.kappa)));
    // the handle sits on the circle at that point: (sin φ, 0, −cos φ)
    speed = Math.max(speed, norm(sub(s.handle, [Math.sin(a), 0, -Math.cos(a)])));
  }
  check('x = tan(φ/2), κ = 1/(1 + x²) = 1 − chord²/4 and ln|x| = ½ ln((1 − κ)/κ) on twelve angles of the whole circle, the handle on the circle', worst < 1e-8 && speed < 1e-12, JSON.stringify([worst, speed]));
  // the total length in the coordinate x, with the metric factor 2/(1 + x²) dx over the whole projective line (both charts)
  let len = 0;
  for (let k = 0; k < 2000; k++) {
    const h = 1 / 2000,
      u = (k + 0.5) * h;
    len += 4 * ((2 / (1 + u * u)) * h); // x ∈ [−1, 1] twice, and w = 1/x ∈ [−1, 1] twice by symmetry
  }
  check('∫ 2 dx/(1 + x²) over both charts (|x| ≤ 1 and |1/x| ≤ 1) is 2π: finite, no singular point', near(len, TAU, 1e-6));
}

/* ---------- flows: V₊, V÷, V× ---------- */
await pick(F_CARD);
{
  const s = await state();
  check('the flows card parks on φ = 90°: V₊ = V÷ = V× = 1.0000, mean 1', s.scene === 'flows' && near(s.phiDeg, 90, 1e-9) && near(s.mer.plus, 1, 1e-12) && near(s.mer.div, 1, 1e-12) && near(s.mer.mul, 1, 1e-12));
  check('page residuals: the three brackets, the mean and the geometric mean stay within 10⁻¹² of 0 over the whole circle', [s.lie.r1, s.lie.r2, s.lie.r3, s.lie.mean, s.lie.geo].every((r) => r < 1e-12));
  check('page Killing form: −8 on V₊ + V÷, +8 on V₊ − V÷, +2 on V×', s.lie.killing.rotation === -8 && s.lie.killing.difference === 8 && s.lie.killing.mul === 2);
}
check(
  'independently in the coordinate x (integer polynomials): [∂ₓ, x²∂ₓ] = 2x∂ₓ, [x∂ₓ, ∂ₓ] = −∂ₓ, [x∂ₓ, x²∂ₓ] = x²∂ₓ',
  same(polyBracket(FIELD.plus, FIELD.div), [0, 2]) && same(polyBracket(FIELD.mul, FIELD.plus), [-1]) && same(polyBracket(FIELD.mul, FIELD.div), [0, 0, 1])
);
check(
  'independently by matrices: [V₊, V÷] = 2V×, [V×, V₊] = −V₊, [V×, V÷] = V÷ (vector fields bracket with the opposite sign), Killing form 4 tr(AB): −8, 8, 2',
  same(comm(E, Fm), mc(H2, H2, -1, -1)) && same(comm(H2, E), E) && same(comm(H2, Fm), mc(Fm, Fm, -0.5, -0.5)) && 4 * tr(mm(mc(E, Fm), mc(E, Fm))) === -8 && 4 * tr(mm(mc(E, Fm, 1, -1), mc(E, Fm, 1, -1))) === 8 && 4 * tr(mm(H2, H2)) === 2
);
{
  // the page flows are the pushforwards f(φ) = 2 a(x)/(1 + x²) of ∂ₓ, x²∂ₓ, x∂ₓ, and their flows are x + s, x/(1 − sx), eˢx
  const angles = Array.from({ length: 47 }, (_, k) => (k + 0.31) * (TAU / 47)),
    got = await page.evaluate((as) => as.map((a) => window.MANIFOLD_DEBUG.flows(a)), angles);
  let push = 0,
    mean = 0,
    geo = 0,
    flow = 0;
  angles.forEach((a, k) => {
    const x = Math.tan(a / 2),
      c = 2 / (1 + x * x),
      h = 1e-5;
    const want = [FIELD.plus, FIELD.div, FIELD.mul].map((f) => peval(f, x) * c);
    push = Math.max(push, ...want.map((v, i) => Math.abs(v - got[k][i])));
    mean = Math.max(mean, Math.abs((got[k][0] + got[k][1]) / 2 - 1));
    geo = Math.max(geo, Math.abs(got[k][2] ** 2 - got[k][0] * got[k][1]), Math.abs(Math.abs(got[k][2]) - 2 * Math.sqrt(1 / (1 + x * x)) * Math.sqrt((x * x) / (1 + x * x))));
    // dφ/ds of the one-parameter flows by central differences of φ = 2 atan2 of the moved point
    const ang = (u, v) => 2 * Math.atan2(u, v),
      S = Math.sin(a / 2),
      C = Math.cos(a / 2);
    const fl = [(s) => ang(S + s * C, C), (s) => ang(S, C - s * S), (s) => ang(S * Math.exp(s / 2), C * Math.exp(-s / 2))];
    fl.forEach((g, i) => (flow = Math.max(flow, Math.abs((g(h) - g(-h)) / (2 * h) - got[k][i]))));
  });
  check('V₊, V÷, V× are the pushforwards of ∂ₓ, x²∂ₓ, x∂ₓ, generate x + s, x/(1 − sx), eˢx, average to 1 and satisfy V×² = V₊V÷', push < 1e-10 && mean < 1e-12 && geo < 1e-10 && flow < 1e-8, JSON.stringify([push, mean, geo, flow]));
  // smooth through both poles: the one-sided difference quotients of V× agree there
  const d = await page.evaluate(() => [0, Math.PI].map((p) => [1e-4, -1e-4].map((h) => (window.MANIFOLD_DEBUG.flows(p + h)[2] - window.MANIFOLD_DEBUG.flows(p)[2]) / h)));
  check('V× has no corner at 0 and ∞: its one-sided slopes there are 1, 1 and −1, −1', d[0].every((v) => near(v, 1, 1e-6)) && d[1].every((v) => near(v, -1, 1e-6)), JSON.stringify(d));
}
{
  // the commutator of the two flows, measured on points of the line
  const s = 1e-4;
  let worst = 0;
  for (const x of [-2, -0.5, 0.3, 1, 3]) {
    const p = (y, t) => y + t,
      q = (y, t) => y / (1 - t * y);
    const loop = q(p(q(p(x, s), s), -s), -s); // φ^Y_{−s} φ^X_{−s} φ^Y_s φ^X_s = x + s²[X, Y] + O(s³)
    worst = Math.max(worst, Math.abs((loop - x) / (s * s) - 2 * x));
  }
  check('the flows do not commute: going round x + s, x/(1 − sx) and back moves x by s²·2x, the bracket 2V×', worst < 2e-2, String(worst));
}
for (const [deg, r, plus, div, mul] of [[0, 'zero', 2, 0, 0], [180, 'inf', 0, 2, 0], [60, 'pos', 1.5, 0.5, Math.sqrt(3) / 2], [300, 'neg', 1.5, 0.5, -Math.sqrt(3) / 2]]) {
  await input('#phiRange', deg);
  const s = await state();
  check(`φ = ${deg}°: V₊ = ${plus}, V÷ = ${div}, V× = ${f4(mul)}, regime ${r}`, near(s.mer.plus, plus, 1e-9) && near(s.mer.div, div, 1e-9) && near(s.mer.mul, mul, 1e-9) && s.regime === r && near(s.t, deg / 360, 1e-9));
}

/* ---------- clock: equal steps ln 2, finite arcs ---------- */
await pick(K_CARD);
{
  const s = await state();
  check('the clock card parks on x = 8: φ = 165.75°, κ = 1/65, V× = 16/65 = 0.2462, τ = 3 ln 2 = 2.0794', s.scene === 'clock' && near(s.mer.x, 8, 1e-9) && near(s.mer.kappa, 1 / 65, 1e-12) && near(s.mer.mul, 16 / 65, 1e-12) && near(s.mer.tau, 3 * LN2, 1e-12) && s.phiDeg.toFixed(2) === '165.75' && f4(s.mer.mul) === '0.2462');
  // exact fractions of the meridian readings by BigInt: (1 + xy)²/((1 + x²)(1 + y²)) at x = 2ᵏ, y = 2ᵏ⁺¹
  const frac = (k) => {
    const x = 2n ** BigInt(Math.max(k, 0)),
      X = 2n ** BigInt(Math.max(-k, 0)), // x/X = 2ᵏ
      y = 2n ** BigInt(Math.max(k + 1, 0)),
      Y = 2n ** BigInt(Math.max(-k - 1, 0));
    let p = (X * Y + x * y) ** 2n,
      q = (X * X + x * x) * (Y * Y + y * y);
    const g = gcdN(p, q);
    return [Number(p / g), Number(q / g)];
  };
  check(
    'meridian readings 81/85, 9/10, 9/10, 81/85, 1089/1105 (BigInt): the page has the same fractions, and they are not 4/5',
    same([-2, -1, 0, 1, 2].map(frac), [[81, 85], [9, 10], [9, 10], [81, 85], [1089, 1105]]) && s.steps.every((st, i) => same(st.q, frac(i - 2)) && near(st.kappa, st.q[0] / st.q[1], 1e-12) && near(st.dtau, LN2, 1e-15) && st.delta === 0.5) && s.steps.every((st) => Math.abs(st.kappa - 0.8) > 0.05)
  );
  check('δ = 1/2 gives the Cayley step fidelity κ(1, Q(δ·i)) = 4/5 by the chord of Q = (1 − δ² + 2δi)/(1 + δ²)', (() => {
    const d = 0.5,
      q = [(1 - d * d) / (1 + d * d), (2 * d) / (1 + d * d)];
    return near(1 - Math.hypot(1 - q[0], q[1]) ** 2 / 4, 0.8, 1e-15);
  })());
  check('readout: Δτ ≈ 0.6931, δ = 1/2, 4/5, then 9/10, 81/85, 1089/1105', (await textOf('roClock')) === '≈ 0.6931 · = 1/2 · = 4/5 · = 9/10, 81/85, 1089/1105', await textOf('roClock'));
  // the quarter circle from x = 1 to x = 0 is finite although ∫ dx/x diverges: chord sum against ln 2 steps
  let quarter = 0;
  for (let k = 0; k < 4000; k++) {
    const a = ((k / 4000) * PI) / 2,
      b = (((k + 1) / 4000) * PI) / 2;
    quarter += Math.hypot(Math.cos(b) - Math.cos(a), Math.sin(b) - Math.sin(a));
  }
  check('the arc from x = 1 to x = 0 is π/2 = 1.5708 while ln(1/2ⁿ) = −n ln 2 has no bound', near(quarter, PI / 2, 1e-6) && f4(quarter) === '1.5708');
  // the coil is the unwrapped clock: equal heights per doubling, one turn per doubling
  const co = await page.evaluate((h) => [-2, -1, 0, 1, 2, 3].map((k) => window.MANIFOLD_DEBUG.coil(k * h)), LN2);
  check('the coil: the doublings 1/4 … 8 stand at equal heights one turn apart', co.slice(1).every((c, i) => near(c[2] - co[i][2], co[1][2] - co[0][2], 1e-12) && near(c[0], co[0][0], 1e-12) && near(c[1], co[0][1], 1e-9)) && co[1][2] > co[0][2]);
  // dφ/sin φ = dx/x: the clock integrates the multiplication flow
  let clk = 0;
  for (let k = 0; k < 20000; k++) {
    const a = PI / 2,
      b = 2 * Math.atan(8),
      h = (b - a) / 20000;
    clk += h / Math.sin(a + (k + 0.5) * h);
  }
  check('∫ dφ/sin φ from x = 1 to x = 8 is 3 ln 2', near(clk, 3 * LN2, 1e-7));
}
for (const [k, label] of [[-2, '1/4'], [-1, '1/2'], [0, '1'], [1, '2'], [2, '4'], [3, '8']]) {
  await page.click(`#dyChips [data-k="${k}"]`);
  await settle(page);
  const s = await state();
  check(`doubling chip ${label}: x = ${label}, τ = ${k} ln 2, the rail stands at ${(k + 6) / 12}, the chip is pressed and the label is exact`, near(s.mer.x, 2 ** k, 1e-9) && near(s.mer.tau, k * LN2, 1e-9) && near(s.t, (k + 6) / 12, 1e-9) && (await page.getAttribute(`#dyChips [data-k="${k}"]`, 'aria-pressed')) === 'true' && (await textOf('hudSub')).includes(`x = ${label}`));
}
await input('#lxRange', -6);
check('the rail of the clock ends at x = 1/64, short of 0: τ = −6 ln 2', near((await state()).mer.x, 1 / 64, 1e-9) && near((await state()).mer.tau, -6 * LN2, 1e-9) && (await state()).t === 0);

/* ---------- prime: loops and the flat blade ---------- */
await pick(P_CARD);
{
  const s = await state();
  check('the prime card parks on X = 7: ψ(7) = ln 420 = 6.0403, the blade meets γ₇ and jumps ln 7 = 1.9459, 5 windings counted', s.scene === 'prime' && s.X === 7 && near(s.prime.psi, psi(7), 1e-12) && lcmTo(7) === 420n && f4(s.prime.psi) === '6.0403' && s.prime.hit.n === 7 && near(s.prime.jump, Math.log(7), 1e-15) && s.prime.count === 5 && same(s.prime.counted, [2, 3, 4, 5, 7]) && s.regime === 'hit');
  const tagsNow = await tagText();
  check('the four named loops are labelled on the stage', ['γ₂', 'γ₃', 'γ₅', 'γ₇'].every((g) => tagsNow.some((t) => t.startsWith(g))), JSON.stringify(tagsNow));
  const pw = await page.evaluate(() => window.MANIFOLD_DEBUG.powers());
  check('the prime powers up to 16 are 2, 3, 4, 5, 7, 8, 9, 11, 13, 16 with their primes and exponents', same(pw.map((w) => [w.n, w.p, w.m]), PP.map((w) => [w.n, w.p, w.m])) && same(PP.map((w) => w.n), [2, 3, 4, 5, 7, 8, 9, 11, 13, 16]));
  const grid = Array.from({ length: 291 }, (_, k) => Math.round((1.5 + k / 20) * 100) / 100),
    got = await page.evaluate((xs) => xs.map((x) => window.MANIFOLD_DEBUG.psi(x)), grid);
  check('ψ(X) = ln lcm(1, …, ⌊X⌋) on 291 values of X ∈ [1.5, 16]', grid.every((x, i) => near(got[i], psi(x), 1e-12)));
  // the loops: closed, with no corner, wound m times, at height affine in m ln p, circumference proportional to ln p
  let closed = 0,
    corner = 0,
    wind = 0,
    embedded = Infinity,
    prop = 0,
    height = 0;
  const zs = [];
  for (const w of PP) {
    const n = 256,
      [a, b] = await page.evaluate(([p, m, k]) => [window.MANIFOLD_DEBUG.loop(p, m, k), window.MANIFOLD_DEBUG.loop(p, m, 2 * k)], [w.p, w.m, n]);
    closed = Math.max(closed, norm(sub(a[0], a[a.length - 1])));
    // the largest turning angle of the polygon halves when the sampling doubles, the seam included
    const maxTurn = (pts) => {
      const q = pts.slice(0, -1);
      let m = 0;
      for (let i = 0; i < q.length; i++) {
        const u = unit(sub(q[(i + 1) % q.length], q[i])),
          v = unit(sub(q[(i + 2) % q.length], q[(i + 1) % q.length]));
        m = Math.max(m, Math.acos(Math.min(1, dot(u, v))));
      }
      return m;
    };
    const ta = maxTurn(a),
      tb = maxTurn(b);
    corner = Math.max(corner, Math.abs(ta / tb - 2));
    let turns = 0;
    for (let i = 1; i < a.length; i++) {
      const d = Math.atan2(a[i][1], a[i][0]) - Math.atan2(a[i - 1][1], a[i - 1][0]);
      turns += d - TAU * Math.round(d / TAU);
    }
    wind = Math.max(wind, Math.abs(turns / TAU - w.m));
    // strands of a cable stay apart: points far apart along the curve are far apart in space
    if (w.m > 1)
      for (let i = 0; i < a.length - 1; i += 4)
        for (let j = i + 1; j < a.length - 1; j += 4) {
          const gap = Math.min(j - i, a.length - 1 - (j - i));
          if (gap > n / 2) embedded = Math.min(embedded, norm(sub(a[i], a[j])));
        }
    const z = a.slice(0, -1).reduce((s0, p) => s0 + p[2], 0) / (a.length - 1);
    zs.push([w.m * Math.log(w.p), z]);
    if (w.m === 1) {
      let L = 0;
      for (let i = 1; i < b.length; i++) L += norm(sub(b[i], b[i - 1]));
      prop = Math.max(prop, Math.abs(L / Math.log(w.p) - TAU * 0.28));
    }
  }
  for (const [t, z] of zs) height = Math.max(height, Math.abs(z - (zs[0][1] + ((zs[zs.length - 1][1] - zs[0][1]) * (t - zs[0][0])) / (zs[zs.length - 1][0] - zs[0][0]))));
  check(
    'the loops: closed, no corner anywhere (turning halves with the step), wound m times, circumference proportional to ln p, height affine in m ln p, strands of a cable apart',
    closed < 1e-12 && corner < 0.02 && wind < 1e-9 && prop < 1e-3 && height < 1e-9 && embedded > 0.03,
    JSON.stringify([closed, corner, wind, prop, height, embedded])
  );
}
for (const { n, p, m } of PP) {
  await page.click(`#ppChips [data-n="${n}"]`);
  await settle(page);
  const s = await state();
  const before = psi(n - 0.01);
  check(`X = ${n}: the blade meets the ${m}-fold winding of γ_${p}, ψ jumps from ${f4(before)} to ${f4(psi(n))} by ln ${p}`, s.X === n && s.prime.hit.p === p && s.prime.hit.m === m && near(s.prime.psi - before, Math.log(p), 1e-12) && near(s.prime.jump, Math.log(p), 1e-12) && (await page.getAttribute(`#ppChips [data-n="${n}"]`, 'aria-pressed')) === 'true');
}
await input('#xRange', 6.5);
{
  const s = await state();
  check('X = 6.5: between two loops ψ = ln 60 = 4.0943 and nothing jumps; the HUD names the next jump at 7', near(s.prime.psi, Math.log(60), 1e-12) && s.prime.jump === 0 && s.regime === 'between' && /X = 7/.test(await textOf('hudSub')) && near(s.t, 5 / 14.5, 1e-12));
}
await page.click('#rew');
await settle(page);
{
  const s = await state();
  check('⏮ on the prime scene: X = 1.5, ψ = 0, the HUD and the note say the blade is below γ₂', s.X === 1.5 && s.prime.psi === 0 && s.regime === 'below' && /ψ = 0/.test(await textOf('hudSub')));
}

/* ---------- the instances of the cited theorems, recomputed here ---------- */
{
  const I = (await state()).leanInstances,
    A = I.arith;
  check('quaternion instances: equivalence, distance reading, base points, cross product (c = 2) and the skew term are all 0 up to the drift of the doubles', I.equiv < 1e-9 && I.dist < 1e-12 && I.tri < 1e-9 && I.cross.gap < 1e-12 && I.cross.invariant < 1e-12 && I.cross.c === 2 && I.skew.unitary < 1e-12 && I.skew.halves < 1e-12 && I.skew.skew < 1e-12 && near(I.skew.cross, 0.5, 1e-12));
  check('solenoid instances: charge ln 2 at every level, compatible threads, zero charge ⇔ unit modulus, cocycle of three lifts', I.charge.gap < 1e-12 && I.charge.compat < 1e-9 && near(I.charge.q, LN2, 1e-15) && I.zero.unit < 1e-12 && I.zero.off > 0.05 && I.lifts.visible < 1e-12 && I.lifts.cocycle < 1e-9 && I.lifts.tower < 1e-9);
  // the profinite number 1! + 2! + 3! + … is compatible under reduction (the third lift of the cocycle)
  const sf = (mod) => {
    let s = 0n,
      f = 1n;
    for (let j = 1n; j <= 40n; j++) {
      f *= j;
      s += f;
    }
    return s % BigInt(mod);
  };
  let tower = true;
  for (let a = 1; a <= 24; a++) for (let b = 1; a * b <= 24; b++) tower = tower && sf(a * b) % BigInt(a) === sf(a);
  check('Σ j! is a compatible family of residues (BigInt), so the third lift is a point of the solenoid', tower);
  // arithmetic, by other routes
  const primes = [];
  for (let n = 2; n <= 1000; n++) if (primes.every((p) => n % p)) primes.push(n);
  const series = Array.from({ length: 1000 }, (_, k) => 1 / (k + 1) ** 2).reverse().reduce((a, b) => a + b, 0),
    euler = Math.exp(-primes.reduce((s, p) => s + Math.log1p(-1 / (p * p)), 0));
  check('ζ(2) cut at 1000: series 1.6439, product 1.6447, limit π²/6 = 1.6449', near(A.series, series, 1e-12) && near(A.euler, euler, 1e-10) && f4(series) === '1.6439' && f4(euler) === '1.6447' && f4(PI ** 2 / 6) === '1.6449');
  let none = true,
    count = 0,
    best = [Infinity, null];
  for (let a = -6n; a <= 6n; a++) for (let b = -6n; b <= 6n; b++) for (let c = -6n; c <= 6n; c++) for (let d = -6n; d <= 6n; d++) {
    if (!a && !b && !c && !d) continue;
    count++;
    const up = [[2n, a], [3n, b], [5n, c], [7n, d]].reduce((v, [p, e]) => (e > 0n ? v * p ** e : v), 1n),
      down = [[2n, a], [3n, b], [5n, c], [7n, d]].reduce((v, [p, e]) => (e < 0n ? v * p ** -e : v), 1n);
    if (up === down) none = false;
    const gap = Math.abs(Number(a) * LN2 + Number(b) * Math.log(3) + Number(c) * Math.log(5) + Number(d) * Math.log(7));
    if (gap < best[0]) best = [gap, [up, down].sort((x, y) => (x < y ? -1 : 1))];
  }
  check('ln 2, ln 3, ln 5, ln 7: none of 28560 integer relations, the closest is 250047 against 250000', none && count === 28560 && A.vectors === 28560 && A.relations === 0 && best[1][0] === 250000n && best[1][1] === 250047n && same(A.closest, [250047, 250000]));
  const CH = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1], [1, 1, 0, 0], [1, -1, 1, 0], [0, 1, 0, -1]],
    lp = [2, 3, 5, 7].map(Math.log);
  // |Σ e^{iwn}|/N = |sin(Nw/2)/(N sin(w/2))|, the closed form of the geometric sum
  const weyl = Math.max(...CH.map((k) => {
    const w = TAU * dot(k, lp);
    return Math.abs(Math.sin(500 * w) / (1000 * Math.sin(w / 2)));
  }));
  check('seven characters along the orbit of (e^{2πi ln p}): the largest average at N = 1000 is 0.0031 (closed form of the geometric sum)', near(A.weyl, weyl, 1e-9) && f4(weyl) === '0.0031' && A.characters === 7);
  check('absolute values, product formula and congruence balls: 10 pairs apart, 256 fractions exact, 12816 comparisons without a mismatch', A.pairs === 10 && A.apart === 10 && A.fractions === 256 && A.product === 0 && A.fibreTests === 4 * 4 * 801 && A.fibre === 0);
}

/* ---------- the handle of every scene: drag, arrows ---------- */
for (const [card, target, read, want, tol] of [
  [S_CARD, 9, (s) => s.N, 9, 0.5],
  [M_CARD, 200 * DEG, (s) => s.phiDeg, 200, 1],
  [F_CARD, 150 * DEG, (s) => s.phiDeg, 150, 1],
  [K_CARD, 2 * Math.atan(2), (s) => s.mer.x, 2, 0.06],
  [P_CARD, 11, (s) => s.X, 11, 0.2]
]) {
  await pick(card);
  const box = await page.locator('#stageHandle').boundingBox(),
    to = await page.evaluate((v) => window.MANIFOLD_DEBUG.handleAt(v), target),
    cam = (await state()).camera;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, { steps: 14 });
  await page.mouse.up();
  await settle(page);
  const s = await state();
  check(`${card}: dragging the amber handle sets the quantity of the scene (${want}) and leaves the camera alone`, Math.abs(read(s) - want) < tol && same(s.camera, cam) && !s.preset && !s.playing, String(read(s)));
  const before = read(s);
  await page.focus('#stageHandle');
  await page.keyboard.press('ArrowRight');
  await settle(page);
  const after = read(await state());
  check(`${card}: ArrowRight on the handle steps the quantity up`, after > before, `${before} → ${after}`);
  await page.keyboard.press('Home');
  await settle(page);
  check(`${card}: Home puts the rail at its start`, (await state()).t === 0);
}

/* ---------- lenses: the same state, another overlay, the MODEL reading ---------- */
for (const card of ORDER) {
  await pick(card);
  const before = await state(),
    pill0 = await textOf('scenePill'),
    title0 = await textOf('hudTitle'),
    tags0 = await tagText(),
    legend0 = await textOf('legend');
  await page.click('#lensToggleBtn');
  await settle(page);
  const on = await state(),
    pill1 = await textOf('scenePill'),
    title1 = await textOf('hudTitle'),
    tags1 = await tagText();
  check(
    `${card}: the lens switch keeps the state and renames the pill and the title (MODEL)`,
    on.lens === 1 && ['N', 'phi', 'X', 'scene', 'preset', 't', 'bump'].every((k) => same(on[k], before[k])) && pill1 !== pill0 && title1 !== title0 && /MODEL/.test(pill1) && /MODEL/.test(title1) && (await page.getAttribute('#mobileLensBtn', 'aria-pressed')) === 'true' && (card === S_CARD || card === P_CARD || (await textOf('legend')) !== legend0) && !same(tags0, tags1),
    JSON.stringify([title1, tags1])
  );
  await layout(page, `${card}, plate lens`);
  await page.click('#lensToggleBtn');
  await settle(page);
  check(`${card}: and back`, (await state()).lens === 0 && (await textOf('scenePill')) === pill0);
}

/* ---------- the strips: legend clearance (≥ 10 px from every curve, dot and cursor), computed here ---------- */
/** One strip as painted: the boxes of its legend rows (text ink and key strokes, all legend calls of the frame) and
    their least distance (px) to the curves of that strip, written here from the plot's axis map and the state. */
async function stripClearance(p, which) {
  return p.evaluate(([which, powers]) => {
    const plot = TRV.kit.plot,
      s = window.MANIFOLD_DEBUG.state;
    let n = 0,
      g = null;
    // one entry per legend key: the box of its key stroke and of every text run after it
    const entries = [];
    const grow = (l, t, r, b) => {
      const e = entries[entries.length - 1];
      Object.assign(e, { l: Math.min(e.l, l), t: Math.min(e.t, t), r: Math.max(e.r, r), b: Math.max(e.b, b) });
    };
    TRV.kit.plot = (...args) => {
      const made = plot(...args);
      if (n++ !== which) return made;
      g = made;
      const legend = made.legend,
        ctx = made.ctx;
      made.legend = (...rest) => {
        const { fillText, moveTo, lineTo } = ctx;
        let from = null;
        ctx.moveTo = function (x, y) {
          from = [x, y];
          return moveTo.call(this, x, y);
        };
        ctx.lineTo = function (x, y) {
          entries.push({ text: '', l: Infinity, t: Infinity, r: -Infinity, b: -Infinity });
          grow(Math.min(from[0], x), Math.min(from[1], y) - 1, Math.max(from[0], x), Math.max(from[1], y) + 1);
          return lineTo.call(this, x, y);
        };
        ctx.fillText = function (text, x, y, ...more) {
          const m = ctx.measureText(text);
          grow(x - m.actualBoundingBoxLeft, y - m.actualBoundingBoxAscent, x + m.actualBoundingBoxRight, y + m.actualBoundingBoxDescent);
          entries[entries.length - 1].text += text;
          return fillText.call(this, text, x, y, ...more);
        };
        try {
          legend(...rest);
        } finally {
          // the wrappers shadow the prototype methods on this one context
          for (const k of ['fillText', 'moveTo', 'lineTo']) delete ctx[k];
        }
      };
      return made;
    };
    try {
      TRV.kit.flush();
    } finally {
      TRV.kit.plot = plot;
    }
    if (!g) return null;
    const R = Math.PI / 180,
      stair = (x) => powers.reduce((v, w) => v + (w.n <= x ? Math.log(w.p) : 0), 0);
    const curves = which === 0 ? [(x) => 1 + Math.cos(x * R), (x) => 1 - Math.cos(x * R), (x) => Math.sin(x * R), () => 1] : [(x) => x, stair];
    // the amber cursor: its value, its top (the page ends it at the curves' top and 41 px under the plot's edge) and its dots
    const cur = which === 0 ? (s.phiDeg > 180 ? 360 - s.phiDeg : s.phiDeg) : s.X,
      cursorTop = Math.max(g.Y(which === 0 ? 2.05 : 16.6), g.pt + 41),
      dotTops = which === 0 ? curves.slice(0, 3).map((f) => g.Y(f(cur)) - 3) : [g.Y(stair(s.X + 1e-9)) - 3.2];
    let gap = Infinity;
    for (const b of entries) {
      for (let x = Math.max(b.l - 4, g.pl); x <= Math.min(b.r + 4, g.pl + g.iw); x += 0.5)
        for (const f of curves) {
          const c = g.Y(f(g.invX(x)));
          gap = Math.min(gap, c - 1 > b.b ? c - 1 - b.b : c + 1 < b.t ? b.t - c - 1 : -1);
        }
      const cx = g.X(cur);
      if (cx + 4 >= b.l && cx - 4 <= b.r) gap = Math.min(gap, cursorTop - b.b, ...dotTops.map((y) => y - b.b));
    }
    const overlap = entries.some((a, i) => entries.some((b, j) => j > i && a.l < b.r && b.l < a.r && a.t < b.b && b.t < a.b));
    const outside = entries.some((e) => e.l < g.pl || e.r > g.pl + g.iw + 0.5 || e.t < 0);
    return { gap, overlap, outside, keys: entries.length, rows: entries.map((e) => e.text), canvas: g.H, width: g.W, range: [g.y0, g.y1] };
  }, [which, PP]);
}
async function stripChecks(p, label) {
  for (const [which, keys] of [[0, 4], [1, 2]]) {
    const c = await stripClearance(p, which);
    check(
      `${label} strip ${which + 1}: the ${keys} legend keys sit in open headroom ≥ 10 px clear of every curve, dot and cursor, rows apart (canvas ${c && c.canvas} px)`,
      !!c && c.keys === keys && c.gap >= 10 && !c.overlap && !c.outside && near(c.range[0], which ? -1.2 : -0.15, 1e-9) && near(c.range[1], which ? 24.5 : 3.1, 1e-9),
      JSON.stringify(c)
    );
  }
}
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`);
  await settle(page);
  for (const card of [F_CARD, P_CARD]) {
    await pick(card);
    await stripChecks(page, `${lang} desktop ${card}`);
  }
}
await page.click('[data-lang-set="zh"]');
await settle(page);
// the narrowest three-column lab has the narrowest strips; sweep the cursors
for (const lang of ['zh', 'en']) {
  const p = await T.open(BOOK, ID, '?lang=' + lang, { viewport: { width: 1081, height: 700 }, reducedMotion: 'reduce' });
  await settle(p);
  await p.click(`[data-preset="${F_CARD}"]`);
  await settle(p);
  for (const d of [0, 45, 90, 180, 315]) {
    await input('#phiRange', d, p);
    await stripChecks(p, `${lang}/1081×700 φ = ${d}°`);
  }
  await p.click(`[data-preset="${P_CARD}"]`);
  await settle(p);
  for (const x of [1.5, 5, 10, 16]) {
    await input('#xRange', x, p);
    await stripChecks(p, `${lang}/1081×700 X = ${x}`);
  }
  await p.context().close();
}
// the stage keeps its box while a quantity is swept, so that a drag follows the pointer
for (const lang of ['zh', 'en'])
  for (const [width, height, query] of [[1440, 900, ''], [1081, 700, ''], [740, 500, '&embed=1'], [390, 844, '']]) {
    const p = await T.open(BOOK, ID, `?lang=${lang}${query}${query ? '&preset=' + P_CARD : ''}`, { viewport: { width, height }, reducedMotion: 'reduce' });
    await settle(p);
    const boxes = new Set();
    const sweep = async (card, selector, values) => {
      if (!query) {
        await p.locator(`[data-preset="${card}"]`).evaluate((b) => b.click());
        await settle(p);
      }
      const box = () => p.locator('#stage').evaluate((el) => [el.getBoundingClientRect().top + scrollY, el.getBoundingClientRect().height].map((x) => x.toFixed(1)).join(' + '));
      const seen = new Set([await box()]);
      for (const v of values) {
        await input(selector, v, p);
        seen.add(await box());
      }
      if (seen.size > 1) boxes.add(card + ': ' + [...seen].join(' | '));
    };
    await sweep(P_CARD, '#xRange', [1.5, 6.5, 7, 10.3, 13, 16]);
    await sweep(P_CARD, '#now', [0.123456, (7 - 1.5) / 14.5 - 1e-5, (7 - 1.5) / 14.5 + 1e-5, 0.99999]);
    if (!query) {
      await sweep(S_CARD, '#nRange', [6, 18, 36]);
      await sweep(M_CARD, '#phiRange', [0, 91, 180, 181, 270]);
      await sweep(M_CARD, '#now', [0.00001, 0.2500001, 0.4999999, 0.50001, 0.7499999]);
      await sweep(F_CARD, '#phiRange', [0, 90, 179, 201, 300]);
      await sweep(F_CARD, '#now', [0.00001, 0.2500001, 0.4999999, 0.50001, 0.7499999]);
      await sweep(K_CARD, '#lxRange', [-6, 0.35, 3, 6]);
      await sweep(K_CARD, '#now', [0.123456, 0.5000001, 0.75]);
    }
    check(`${lang}/${width}×${height}${query ? ' cited' : ''}: sweeping a quantity never moves or resizes the stage`, boxes.size === 0, [...boxes].join('; '));
    await p.context().close();
  }
check('desktop: the mirror lens button of the tour bar stays hidden', (await page.evaluate(() => innerWidth)) > 1080 && (await page.locator('#mobileLensBtn').isHidden()));
// colour semantics: amber only for the handle, the active controls and the strip cursors
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
      if (el.closest('.handle')) continue;
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

/* ---------- the NUM box and the numbers of the drawer: computed by the page when it opens, recomputed here ---------- */
const FRAME = { N: 18, X: 7, places: 24, points: 72, bases: 16, thread: 12, lift: 24, cut: 1000, height: 16, reach: 400, depth: 3, exponent: 6, angles: 720, chords: 3600, secant: 1e-4 };
const DRIFTS = ['closure', 'cheb', 'equiv', 'dist', 'tri', 'cross', 'invariant', 'balanced', 'skew', 'compat', 'charge', 'unit', 'visible', 'cocycle', 'tower', 'r1', 'r2', 'r3', 'mean', 'geo', 'psi'];
const ln = Math.log;
/** The arithmetic of a frame by other routes: exact counts, the closest pair by logarithms, the closed form of the geometric sums. */
function arithOf(f) {
  const primes = [];
  for (let n = 2; n <= f.cut; n++) if (primes.every((p) => n % p)) primes.push(n);
  let best = [Infinity, null];
  for (let a = -f.exponent; a <= f.exponent; a++)
    for (let b = -f.exponent; b <= f.exponent; b++)
      for (let c = -f.exponent; c <= f.exponent; c++)
        for (let d = -f.exponent; d <= f.exponent; d++) {
          const l = a * LN2 + b * ln(3) + c * ln(5) + d * ln(7);
          if ((a || b || c || d) && l > 0 && l < best[0]) best = [l, [a, b, c, d]];
        }
  const side = (sign) => [2n, 3n, 5n, 7n].reduce((v, p, i) => (sign * best[1][i] > 0 ? v * p ** BigInt(sign * best[1][i]) : v), 1n),
    lp = [2, 3, 5, 7].map(ln),
    CH = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1], [1, 1, 0, 0], [1, -1, 1, 0], [0, 1, 0, -1]];
  return {
    series: Array.from({ length: f.cut }, (_, k) => 1 / (k + 1) ** 2).reverse().reduce((a, b) => a + b, 0),
    euler: Math.exp(-primes.reduce((s, p) => s + Math.log1p(-1 / (p * p)), 0)),
    vectors: (2 * f.exponent + 1) ** 4 - 1,
    pair: [side(1), side(-1)],
    weyl: Math.max(...CH.map((k) => Math.abs(Math.sin((f.cut * TAU * dot(k, lp)) / 2) / (f.cut * Math.sin((TAU * dot(k, lp)) / 2)))))
  };
}
const tenText = (x) => `10${String(Math.round(Math.log10(x))).replace('-', '⁻').replace(/\d/g, (d) => SUP[d])}`;
/** What the box and the spans must say of a frame: phrases that occur once each, in order, and the spans of the drawer. */
function expectedBench(lang, f) {
  const zh = lang === 'zh',
    sep = zh ? '、' : ', ',
    A = arithOf(f),
    c = Math.cos(PI / f.N),
    crease = said(fracN(360, f.N), 360 / f.N, 2) + '°',
    arc = said(f.N === 6 ? fracN(3, 4) : null, c * c),
    corner = said(null, 1 / c - 1),
    tenth = `≈ ${sciText(Math.exp(8 - 100 - 100 / 81))}`,
    chord = 2 * f.chords * Math.sin(PI / f.chords),
    // 2π − 2n sin(π/n) by its series: no digits are lost
    short = (PI ** 3 / (3 * f.chords ** 2)) * (1 - PI ** 2 / (20 * f.chords ** 2)),
    jump = `≈ ${sciText(2 * Math.sin(f.secant / 2))}`,
    step = tenText(f.secant),
    logs = [2, 3, 5, 7].map((p) => `ln ${p} ${said(null, ln(p))}`).join(sep),
    arcs = [-2, -1, 0, 1, 2, 3].map((k) => (k === 0 ? '= 90.00°' : `≈ ${((2 * Math.atan(2 ** k)) / DEG).toFixed(2)}°`)).join(sep),
    kappas = [-2, -1, 0, 1, 2, 3].map((k) => strN(k < 0 ? fracN(4 ** -k, 1 + 4 ** -k) : fracN(1, 1 + 4 ** k))).join(sep),
    marks = ['1/4', '1/2', '1', '2', '4', '8'].join(sep),
    // (1 + xy)²/((1 + x²)(1 + y²)) at x = 2ᵏ, y = 2ᵏ⁺¹, with 4ᵏ cleared from numerator and denominator
    near2 = (k) => strN(k < 0 ? fracN((2 ** (-2 * k - 1) + 1) ** 2, (4 ** -k + 1) * (4 ** (-k - 1) + 1)) : fracN((1 + 2 ** (2 * k + 1)) ** 2, (1 + 4 ** k) * (1 + 4 ** (k + 1)))),
    neighbours = [-2, -1, 0, 1, 2].map(near2).join(sep),
    hit = PP.find((w) => w.n === f.X),
    blade = `X = ${f.X}${zh ? '：' : ': '}ψ(${f.X}) = ln ${lcmTo(f.X)} ${said(null, psi(f.X))}`,
    jumpLaw = `ln ${hit.p} ${said(null, ln(hit.p))}`,
    cayley = '= 4/5 = 0.8000',
    ps = [2, 3, 5, 7].join(sep),
    fibre = 4 * (f.depth + 1) * (2 * f.reach + 1);
  return {
    spans: { quarter: said(null, PI / 2), ln2: said(null, LN2), cayley, steps: [0, 1, 2].map(near2).join(sep), blade },
    phrases: zh
      ? [
          '打开页面时由脚本现算，不检验各条定理的前提。',
          `切板 N = ${f.N}：每缝折 360°/${f.N} ${crease}，合计 = 360.00°，角外伸 sec(π/${f.N}) − 1 ${corner}，κ(x₀, x₁) = cos²(π/${f.N}) ${arc}，鼓包 B(1/2) = 1.0000、B(1/10) ${tenth}。`,
          'N = 6 … 36 各续接 N 步回到 x₀，浮点偏差',
          '与 Uₙ、Tₙ 及模方 1 逐项比较到 n = N，浮点偏差',
          `46 组固定的三元组与经线上 ${f.places} 个基点 o：u(x) = o⁻¹x 前后的括号与 κ，浮点偏差`,
          `κ 与 1 − dist²/4（经线上 ${f.points} 个点，对 1 与 o），浮点偏差`,
          `[x₁, x₀, x₁] 与 ${f.bases} 个基点群里的 x₁ · x₀⁻¹ · x₁，浮点偏差`,
          '纯四元数的 ab − ba 与 2 倍叉积，浮点偏差',
          '点积的 ad 不变性，浮点偏差',
          '的 S S† = 1 与 A A† = B B† = 1/2，浮点偏差',
          '(A B†)† + A B† 与 0，浮点偏差',
          `线程 zm = exp((ln 2 + iφ)/m)（m = 1 … ${f.thread}）的相容，浮点偏差`,
          'm·ln‖zm‖ 与 ln 2，浮点偏差',
          '荷 0 的线程 exp(iφ/m) 的模与 1，浮点偏差',
          `m = 1 … ${f.lift}）的投影，浮点偏差`,
          '上链律，浮点偏差',
          '各级相容，浮点偏差',
          `|·|∞ 与 |·|p（p = ${ps}）的 10 对里分开 10 对`,
          `乘积公式用整数核对 ${f.height ** 2} 个分数 a/b（a、b 取 1 … ${f.height}），不合 0 个`,
          `同余与闭球比较 ${fibre} 次（x = 1，p = ${ps}，k = 0 … ${f.depth}，y = −${f.reach} … ${f.reach}），不合 0 次`,
          `s = 2、截到 ${f.cut}：级数 ${said(null, A.series)}，乘积 ${said(null, A.euler)}，π²/6 ${said(null, PI ** 2 / 6)}`,
          `2a3b5c7d = 1 用整数核对 ${A.vectors} 组非零指数（−${f.exponent} … ${f.exponent}），成立 0 组，最接近的一组是 ${A.pair[0]} 对 ${A.pair[1]}`,
          `7 个非平凡特征沿 g, g², …, g${f.cut}（g 的坐标是 e2πi ln p）的平均，模最大 ${said(null, A.weyl)}。`,
          `闭圆：${f.chords} 段弦长之和 ${said(null, chord)}，比 2π ${said(null, TAU)} 少 ≈ ${sciText(short)}`,
          `从 x = 1 到 x = 0 的弧 π/2 ${said(null, PI / 2)}`,
          `两侧单位割线（步长 ${step}）之差在 0 处 ${jump}、在 ∞ 处 ${jump}。`,
          `${f.angles} 个角上：[V₊, V÷] − 2V×，浮点偏差`,
          '[V×, V₊] + V₊，浮点偏差',
          '[V×, V÷] − V÷，浮点偏差',
          '½(V₊ + V÷) − 1，浮点偏差',
          'V×² − V₊V÷，浮点偏差',
          '基灵型在 V₊ + V÷、V₊ − V÷、V× 上是 −8、8、2。',
          `翻倍 x = ${marks}：φ ${arcs}；κ = ${kappas}；相邻两点 κ = ${neighbours}；每步 Δτ = ln 2 ${said(null, LN2)}，凯莱步 1/(1 + δ²) ${cayley}（δ = 1/2）。`,
          `环长 ${logs}；${blade}，跳 ${jumpLaw}；`,
          'ψ(X) 与 ln lcm(1, …, X)（X = 1 … 16），浮点偏差',
          '数值演示，不是证明。'
        ]
      : [
          'Computed by the script when the page opens, without checking the hypotheses of the theorems; every drift is a floating-point one.',
          `Plates N = ${f.N}: crease 360°/${f.N} ${crease}, total = 360.00°, corner stand-off sec(π/${f.N}) − 1 ${corner}, κ(x₀, x₁) = cos²(π/${f.N}) ${arc}, bump B(1/2) = 1.0000, B(1/10) ${tenth}.`,
          'For N = 6 … 36, N steps back to x₀, drift',
          'against Uₙ, Tₙ and squared norm 1 up to n = N, drift',
          `46 fixed triples and ${f.places} base points o of the meridian: the bracket and κ before and after u(x) = o⁻¹x, drift`,
          `κ against 1 − dist²/4 (${f.points} points of the meridian, to 1 and to o), drift`,
          `[x₁, x₀, x₁] against x₁ · x₀⁻¹ · x₁ in the groups at ${f.bases} base points, drift`,
          'ab − ba of pure quaternions against 2 times the cross product, drift',
          'ad-invariance of the dot product, drift',
          'S S† = 1 and A A† = B B† = 1/2, drift',
          '(A B†)† + A B† against 0, drift',
          `The thread zm = exp((ln 2 + iφ)/m), m = 1 … ${f.thread}: compatibility, drift`,
          'm·ln‖zm‖ against ln 2, drift',
          'moduli of the thread exp(iφ/m) of charge 0 against 1, drift',
          `m = 1 … ${f.lift}): projections, drift`,
          'cocycle law, drift',
          '; compatibility, drift',
          `Of the 10 pairs of |·|∞ and |·|p (p = ${ps}), told apart: 10`,
          `product formula in integers on ${f.height ** 2} fractions a/b (a, b = 1 … ${f.height}), failures: 0`,
          `congruence against closed ball, ${fibre} comparisons (x = 1, p = ${ps}, k = 0 … ${f.depth}, y = −${f.reach} … ${f.reach}), mismatches: 0`,
          `s = 2 cut at ${f.cut}: series ${said(null, A.series)}, product ${said(null, A.euler)}, π²/6 ${said(null, PI ** 2 / 6)}`,
          `2a3b5c7d = 1 in integers on ${A.vectors} nonzero exponents (−${f.exponent} … ${f.exponent}), solutions: 0, the closest pair being ${A.pair[0]} and ${A.pair[1]}`,
          `averages of 7 nontrivial characters along g, g², …, g${f.cut} (coordinates e2πi ln p of g), largest modulus ${said(null, A.weyl)}.`,
          `The closed circle: ${f.chords} chords add to ${said(null, chord)}, short of 2π ${said(null, TAU)} by ≈ ${sciText(short)}`,
          `the arc from x = 1 to x = 0, π/2 ${said(null, PI / 2)}`,
          `one-sided unit secants (step ${step}) differ by ${jump} at 0 and ${jump} at ∞.`,
          `At ${f.angles} angles: [V₊, V÷] − 2V×, drift`,
          '[V×, V₊] + V₊, drift',
          '[V×, V÷] − V÷, drift',
          '½(V₊ + V÷) − 1, drift',
          'V×² − V₊V÷, drift',
          'Killing form on V₊ + V÷, V₊ − V÷, V×: −8, 8, 2.',
          `Doublings x = ${marks}: φ ${arcs}; κ = ${kappas}; neighbouring κ = ${neighbours}; every step Δτ = ln 2 ${said(null, LN2)}, Cayley step 1/(1 + δ²) ${cayley} (δ = 1/2).`,
          `Loop lengths ${logs}; ${blade}, jump ${jumpLaw};`,
          'ψ(X) against ln lcm(1, …, X) (X = 1 … 16), drift',
          'A numerical illustration, not a proof.'
        ]
  };
}
/** The audit of a page: the box, its copy in the drawer and the spans against the numbers computed here; [] or what is wrong. */
async function auditBench(p, frame) {
  const seen = await p.evaluate(() => {
    const flat = (sel) => document.querySelector(sel).textContent.replace(/\s+/g, ' ').trim();
    return {
      box: Object.fromEntries(['zh', 'en'].map((l) => [l, flat('#basis .lean.num .' + l)])),
      copy: Object.fromEntries(['zh', 'en'].map((l) => [l, flat('#drawerEvidence .lean.num .' + l)])),
      spans: Object.fromEntries(['zh', 'en'].map((l) => [l, [...document.querySelectorAll(`#drawer .sheet > .${l} [data-bench]`)].map((e) => [e.dataset.bench, e.textContent.replace(/\s+/g, ' ')])])),
      bench: window.MANIFOLD_DEBUG.bench(),
      twice: [...document.querySelectorAll('[id]')].map((e) => e.id).filter((x, i, a) => a.indexOf(x) !== i)
    };
  });
  const bad = [];
  if (!same(seen.box, seen.copy)) bad.push('the copy in the drawer');
  if (seen.twice.length) bad.push('ids twice: ' + seen.twice.join(' '));
  if (!same([seen.bench.frame.N, seen.bench.frame.X, seen.bench.places], [frame.N, frame.X, frame.places])) bad.push('the frame');
  const { drift } = seen.bench;
  if (!same(Object.keys(drift), DRIFTS)) bad.push('the drifts ' + Object.keys(drift).join(' '));
  if (!Object.values(drift).every((x) => Number.isFinite(x) && x >= 0 && x < 1e-12)) bad.push('a drift of 10⁻¹² or more: ' + JSON.stringify(drift));
  for (const lang of ['zh', 'en']) {
    const { spans, phrases } = expectedBench(lang, frame),
      text = seen.box[lang];
    let at = -1;
    for (const x of phrases) {
      const k = text.indexOf(x);
      if (k <= at || text.split(x).length !== 2) bad.push(`${lang} box: ${x}`);
      else at = k;
    }
    if (/—|undefined|NaN|null|Infinity/.test(text)) bad.push(`${lang} box: not filled`);
    // every drift of the box is the least power of ten above the number the page measured, in order; none is written 0.0000
    const printed = [...text.matchAll(/(?:浮点偏差|drift) (= 0|< 10⁻[⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g)].map((m) => m[1]);
    if (!same(printed, DRIFTS.map((k) => belowText(drift[k])))) bad.push(`${lang} box: the drifts ${JSON.stringify(printed)}`);
    if (text.split(lang === 'zh' ? '浮点偏差' : ', drift').length !== DRIFTS.length + 1 || /0\.0000/.test(text)) bad.push(`${lang} box: a drift without its size`);
    if (!same(seen.spans[lang].map((x) => x[0]), BENCH_KEYS)) bad.push(`${lang} spans: ${seen.spans[lang].map((x) => x[0]).join(' ')}`);
    for (const [key, t] of seen.spans[lang]) if (t !== spans[key]) bad.push(`${lang} drawer ${key}: ${t} (${spans[key]})`);
    bad.push(...mixed(text).map((x) => `${lang} chained: ${x}`), ...seen.spans[lang].flatMap(([, t]) => mixed(t)));
  }
  return bad;
}
const patched = async (patches, query = '?lang=zh') => {
  const p = await T.open(BOOK, ID, query, { reducedMotion: 'reduce' });
  await p.route(`**/${ID}/main.js*`, (route) => route.fulfill({ contentType: 'text/javascript; charset=utf-8', body: patches.reduce((js, [from, to]) => js.replace(from, to), sources['main.js']) }));
  await p.reload({ waitUntil: 'load' });
  await settle(p);
  return p;
};
const once = (patches) => patches.every(([from]) => sources['main.js'].split(from).length === 2);
{
  const bad = await auditBench(page, FRAME);
  check('NUM: the box in both languages, its copy in the drawer and the spans are the numbers computed here, in order; each of the 21 drifts the least power of ten above it', !bad.length, bad.slice(0, 6).join(' | '));
  const box = flat(await page.evaluate(() => document.querySelector('#basis .lean.num .zh').textContent));
  check('NUM: the numbers of the chapter are among them', ['≈ 53.13°', '≈ 126.87°', '≈ 0.6931', '≈ 1.0986', '≈ 1.6094', '≈ 1.9459', '≈ 6.0403', '≈ 1.5708', '≈ 0.9698', '≈ 6.2832'].every((x) => box.includes(x)), box.slice(0, 200));
}
{
  // the same sources with other sizes: every number of the box and of the drawer follows them, so none of them is written down
  const patches = [
      ["const FRAME = { scene: 'scales', N: 18, phi: 1.5 * PI, X: 7, bump: true },", "const FRAME = { scene: 'scales', N: 24, phi: 1.5 * PI, X: 11, bump: true },"],
      ['PLACES = 24;', 'PLACES = 12;'],
      ['const BASES = 16,', 'const BASES = 9,'],
      ['POINTS = 72,', 'POINTS = 36,'],
      ['THREAD = 12,', 'THREAD = 8,'],
      ['LIFT = 24,', 'LIFT = 18,'],
      ['CUT = 1000,', 'CUT = 400,'],
      ['HEIGHT = 16,', 'HEIGHT = 12,'],
      ['REACH = 400,', 'REACH = 100,'],
      ['DEPTH = 3,', 'DEPTH = 2,'],
      ['EXPONENT = 6,', 'EXPONENT = 4,'],
      ['const ANGLES = 720;', 'const ANGLES = 360;'],
      ['CHORDS = 3600;', 'CHORDS = 1800;'],
      ['const SECANT = 1e-4,', 'const SECANT = 1e-3,']
    ],
    p = await patched(patches),
    bad = await auditBench(p, { N: 24, X: 11, places: 12, points: 36, bases: 9, thread: 8, lift: 18, cut: 400, height: 12, reach: 100, depth: 2, exponent: 4, angles: 360, chords: 1800, secant: 1e-3 });
  check('NUM: served with fourteen other sizes (N = 24, X = 11, other samples, cuts and steps) the box and the drawer follow them: they are computed, not written', once(patches) && !bad.length, bad.slice(0, 6).join(' | '));
  await p.context().close();
}
{
  // with a wrong law in the script the numbers change: the box and the readouts measure the page, they do not repeat a text
  const patches = [['const heap = (x, y, z) => qmul(qmul(x, qinv(y)), z);', 'const heap = (x, y, z) => scale(qmul(qmul(x, qinv(y)), z), 1.01);']],
    p = await patched(patches);
  const [drift, text, sub, ro] = await p.evaluate(() => [window.MANIFOLD_DEBUG.bench().drift, document.querySelector('#basis .lean.num .zh').textContent, document.querySelector('#hudSub').textContent, document.querySelector('#roKey').textContent].map((x) => (typeof x === 'string' ? x.replace(/\s+/g, ' ') : x)));
  check('NUM: with a heap that stretches by 1 % the box, the HUD and the readout show the size of the error', once(patches) && drift.closure > 0.1 && text.includes(`各续接 N 步回到 x₀，浮点偏差 ${belowText(drift.closure)}`) && text.includes(`u(x) = o⁻¹x 前后的括号与 κ，浮点偏差 ${belowText(drift.equiv)}`) && !/< 10⁻/.test(ro) && !/浮点偏差 < 10⁻/.test(sub), JSON.stringify([drift.closure, drift.equiv, ro, sub]));
  await p.context().close();
}
{
  // the same for “=”: it is printed of a fraction only while the computed double agrees with it
  const patches = [['mul: atInf || atZero ? 0 : sn(phi),', 'mul: atInf || atZero ? 0 : 0.9 * sn(phi),']],
    p = await patched(patches, `?lang=zh&preset=${F_CARD}`);
  await p.locator(`[data-preset="${F_CARD}"]`).evaluate((b) => b.click());
  await settle(p);
  const [sub, mer] = await p.evaluate(() => ['#hudSub', '#roMer'].map((x) => document.querySelector(x).textContent.replace(/\s+/g, ' ')));
  check('with a wrong V× in the script no reading keeps its “= 1.0000”: the page says what it computes', once(patches) && sub.includes('V× = sin φ ≈ 0.9000') && mer.endsWith('≈ 0.9000'), JSON.stringify([sub, mer]));
  await p.context().close();
}

{
  // a wrong reading κ: the fractions 4/5, 9/10, 81/85 and 1089/1105 are named only while the computed readings agree with them
  const patches = [['const kappa = (x, y) => (1 + dot(x, y)) / 2;', 'const kappa = (x, y) => (1.1 + dot(x, y)) / 2.1;']],
    p = await patched(patches);
  const [drift, text, clockRow, spans] = await p.evaluate(() => [window.MANIFOLD_DEBUG.bench().drift, document.querySelector('#basis .lean.num .zh').textContent.replace(/\s+/g, ' '), document.querySelector('#roClock').textContent, [...document.querySelectorAll('#drawer [data-bench="cayley"], #drawer [data-bench="steps"]')].map((e) => e.textContent)]);
  check('NUM: with a wrong κ in the script the box, the readout and the drawer name none of the exact fractions and show the size of the error', once(patches) && drift.dist > 0.04 && text.includes(`对 1 与 o），浮点偏差 ${belowText(drift.dist)}`) && [text, clockRow, ...spans].every((x) => !/4\/5 = 0\.8000|81\/85|1089\/1105|9\/10/.test(x)) && text.includes('凯莱步 1/(1 + δ²) ≈ 0.8095（'), JSON.stringify([drift.dist, clockRow, spans]));
  await p.context().close();
}

/* ---------- every printed relation of the page, frame by frame: “=” before the value itself, “≈” before a rounding ---------- */
/** Where a frame stands, by its state alone: the values of the page written here, as [fraction or null, double, off]. */
function tableOf(v) {
  const k = Math.round((v.phi / TAU) * 1440),
    grid = Math.abs(v.phi - (k / 1440) * TAU) < 1e-12,
    deg = v.phi / DEG,
    l = !grid && v.phi < PI ? 2 * Math.log2(Math.tan(v.phi / 2)) : NaN,
    h = Math.round(l),
    dyadic = Math.abs(l - h) < 1e-10,
    zero = grid && k % 1440 === 0,
    inf = grid && k === 720,
    [C, S] = [Math.cos(v.phi / 2), Math.sin(v.phi / 2)],
    two = (x) => (grid && Math.abs(2 * x - Math.round(2 * x)) < 1e-9 ? Math.round(2 * x) : null),
    c2 = two(Math.cos(v.phi)),
    s2 = two(Math.sin(v.phi)),
    // 2^h = P/Q and, for even h, x = a/b
    [P, Q] = h >= 0 ? [2 ** h, 1] : [1, 2 ** -h],
    [a, b] = h >= 0 ? [2 ** (h / 2), 1] : [1, 2 ** (-h / 2)],
    pick = (onGrid, onDyadic) => (onGrid !== null && onGrid !== undefined ? onGrid : dyadic ? onDyadic : null),
    cosQ = pick(c2 === null ? null : fracN(c2, 2), dyadic ? fracN(Q - P, P + Q) : null),
    half = (n) => (c2 === null ? null : fracN(n, 4)),
    kq = pick(half(2 + (c2 || 0)), dyadic ? fracN(Q, P + Q) : null),
    pq = pick(c2 === null ? null : fracN(2 + c2, 2), dyadic ? fracN(2 * Q, P + Q) : null),
    dq = pick(c2 === null ? null : fracN(2 - c2, 2), dyadic ? fracN(2 * P, P + Q) : null),
    mq = pick(s2 === null ? null : fracN(s2, 2), dyadic && h % 2 === 0 ? fracN(2 * a * b, a * a + b * b) : null),
    x = zero ? 0 : inf ? Infinity : Math.tan(v.phi / 2),
    xq = zero ? fracN(0) : grid && k === 360 ? fracN(1) : grid && k === 1080 ? fracN(-1) : dyadic && h % 2 === 0 ? fracN(a, b) : null,
    one = xq && xq[0] ** 2n === xq[1] ** 2n,
    tau = zero ? -Infinity : inf ? Infinity : ln(Math.abs(x)),
    c = Math.cos(PI / v.N),
    X20 = Math.round(v.X * 20),
    Xq = Math.abs(v.X - X20 / 20) < 1e-12 ? fracN(X20, 20) : null,
    hit = PP.find((w) => w.n === v.X),
    values = {
      crease: [fracN(360, v.N), 360 / v.N, {}, [0]],
      total: [fracN(360), 360, {}, [0]],
      arc: [v.N === 6 ? fracN(3, 4) : null, c * c],
      corner: [null, 1 / c - 1],
      deg: [grid ? fracN(k, 4) : null, deg, {}, [0]],
      kappa: [kq, C * C, { 1: -S * S }],
      plus: [pq, 2 * C * C, { 2: -2 * S * S, 1: Math.cos(v.phi) }],
      div: [dq, 2 * S * S, { 2: -2 * C * C, 1: -Math.cos(v.phi) }],
      cos: [cosQ, Math.cos(v.phi), { 1: -2 * S * S, '-1': 2 * C * C }],
      mul: [mq, Math.sin(v.phi), { 1: -2 * Math.sin(v.phi / 2 - PI / 4) ** 2, '-1': 2 * Math.sin(v.phi / 2 + PI / 4) ** 2 }],
      x: [xq, x],
      tau: [one ? fracN(0) : null, tau],
      X: [Xq, v.X, {}, Array.from({ length: 16 }, (_, i) => i + 1)],
      lnX: [null, ln(v.X)],
      psi: [v.X < 2 ? fracN(0) : null, psi(v.X)],
      jump: [hit ? null : fracN(0), hit ? ln(hit.p) : 0],
      secant: [null, 2 * Math.sin(0.5e-4)],
      chord: [null, 7200 * Math.sin(PI / 3600)],
      short: [null, PI ** 3 / (3 * 3600 ** 2)],
      bump: [null, Math.exp(8 - 100 - 100 / 81)],
      one: [fracN(1), 1],
      fifths: [fracN(4, 5), 0.8],
      ln2: [null, LN2],
      turn: [null, TAU],
      quarter: [null, PI / 2]
    },
    exactX = xq ? `= ${strN(xq)}` : inf ? '= ∞' : null,
    exactXX = Xq ? `= ${Xq[1] === 1n ? Xq[0] : numN(Xq).toFixed(2)}` : null,
    exactTau = zero ? '→ −∞' : inf ? '→ +∞' : one ? '= 0' : null,
    zeroLn = (key) => (values[key][1] === 0 ? '= 0' : null);
  return {
    values,
    names: { x: exactX, X: exactXX, tau: exactTau, psi: zeroLn('psi'), jump: zeroLn('jump') },
    rows: [
      ['360°/\\d+', 'crease'],
      ['合计|total', 'total'],
      ['sec\\(π/N\\) − 1', 'corner'],
      ['B\\(1/10\\)', 'bump'],
      ['(?<!sin |cos |[A-Za-z\\d])φ', 'deg'],
      ['1/\\(1 \\+ x²\\)|(?<![A-Za-z\\d])κ', v.scene === 'scales' ? 'arc' : 'kappa'],
      ['V[₊+](?: = 2κ)?', 'plus'],
      ['V÷(?: = 2\\(1 − κ\\))?', 'div'],
      ['(?:V× = )?sin φ|V×|手柄处', 'mul'],
      ['cos φ|V[₊+] − 1', 'cos'],
      ['τ = ln x|τ|½ ln\\(\\(1 − κ\\)/κ\\)', 'tau'],
      ['(?<!ln |[A-Za-z])x(?: = tan\\(φ/2\\))?', 'x'],
      ['X', 'X'],
      ['ψ(?:\\((?:X|[\\d.]+)\\))?', 'psi'],
      ['ln 2', 'ln2'],
      ['2π', 'turn'],
      ['π/2', 'quarter'],
      ['4/5', 'fifths'],
      ['(?:0|∞) 处|只差|differ by(?: only)?', 'secant'],
      ['弦长之和|chords add to', 'chord'],
      ['6\\.2832 (?:少|by)', 'short'],
      ['折痕|crease', 'crease'],
      ['跳变|jump', 'jump']
    ],
    // a value named by what follows it, not by what stands before it
    after: [
      ['at the handle', 'mul'],
      ['at ∞', 'secant']
    ],
    logs: Object.fromEntries([2, 3, 5, 7, 11, 13].map((p) => [p, ln(p)])),
    key: { scales: ['drift', 'crease'], meridian: ['secant', 'x'], flows: ['one', 'cos'], clock: ['ln2', 'tau'], prime: ['psi', 'psi'] }[v.scene][v.lens],
    lists: { roScale: ['crease', 'total', 'corner', 'one', 'bump'], roMer: ['x', 'kappa', 'tau', 'plus', 'div', 'mul'], roPrime: ['X', 'lnX', 'psi', 'count'] }
  };
}
/** The relations found in a text, the wrong ones, and the printed values no row of the table stands for. */
function relations(text, table) {
  const t = text.replace(/\s+/g, ' '),
    bad = [],
    audited = new Set();
  let count = 0;
  const take = (end, whole, sign, printed, key) => {
    count++;
    audited.add(end);
    const [q, x, off, marks] = typeof key === 'string' ? table.values[key] : key,
      why = wrongRelation(sign, printed, q, x, off, marks);
    if (why) bad.push(`${whole} [${why}]`);
  };
  for (const [name, key] of table.rows) for (const m of t.matchAll(new RegExp(`(?:${name}) ([=≈]) (${VALUE})`, 'g'))) take(m.index + m[0].length, m[0], m[1], m[2], key);
  for (const [p, x] of Object.entries(table.logs)) for (const m of t.matchAll(new RegExp(`ln ${p} ([=≈]) (${VALUE})`, 'g'))) take(m.index + m[0].length, m[0], m[1], m[2], [null, x]);
  for (const [tail, key] of table.after) for (const m of t.matchAll(new RegExp(`([=≈]) (${VALUE})(?= ${tail})`, 'g'))) take(m.index + m[0].length, m[0], m[1], m[2], key);
  // nothing is printed outside the audit: every value after a relation sign is one of those above
  for (const m of t.matchAll(new RegExp(`[=≈] (${VALUE})`, 'g'))) if (!audited.has(m.index + m[0].length)) bad.push(`${t.slice(Math.max(0, m.index - 24), m.index + m[0].length)} [not audited]`);
  return { count, bad };
}
/** What is wrong with one value of a list: its exact name, or its relation. */
function listed(printed, key, table, unit = '') {
  if (key === 'drift') return /^(?:= 0|< 10⁻[⁰¹²³⁴⁵⁶⁷⁸⁹]+)$/.test(printed) ? '' : 'no drift';
  const name = table.names[key];
  if (name) return printed === name ? '' : `not ${name}`;
  const m = new RegExp(`^([=≈]) (${VALUE})${unit}$`).exec(printed);
  if (!m) return 'no relation';
  const [q, x, off, marks] = table.values[key];
  return wrongRelation(m[1], m[2], q, x, off, marks);
}
{
  // the audit itself: a relation of the wrong kind, a rounding in the wrong digit and a landmark of another value are all found
  const at = (over) => tableOf({ scene: 'meridian', lens: 0, N: 18, phi: 1.5 * PI, X: 7, ...over });
  const wrong = [
      ['φ ≈ 270.0°', at({})],
      ['κ ≈ 0.5000', at({})],
      ['κ = 0.4857', at({ phi: 4.684 })],
      ['x = 1.0353', at({ phi: 2 * Math.atan(2 ** 0.05), scene: 'clock' })],
      ['τ = 2.0794', at({ phi: 2 * Math.atan(8), scene: 'clock' })],
      ['τ ≈ 2.0795', at({ phi: 2 * Math.atan(8), scene: 'clock' })],
      ['V× = sin φ = 0.2462', at({ phi: 2 * Math.atan(8), scene: 'clock' })],
      ['360°/18 ≈ 20.00°', at({ scene: 'scales' })],
      ['360°/7 = 51.43°', at({ scene: 'scales', N: 7 })],
      ['κ = 0.9698', at({ scene: 'scales' })],
      ['ψ(7) = 6.0403', at({ scene: 'prime' })],
      ['X ≈ 7.00', at({ scene: 'prime', X: 6.9996 })],
      ['ln 7 = 1.9459', at({ scene: 'prime' })],
      ['π/2 = 1.5708', at({})],
      ['4/5 ≈ 0.8000', at({})],
      ['κ ≈ 1.0000', at({ phi: 1e-5 })],
      ['V× ≈ 0.0000', at({ phi: 1e-5, scene: 'flows' })],
      ['y ≈ 0.1234', at({})]
    ].filter(([x, table]) => !relations(x, table).bad.length),
    right = [
      ['φ = 270.0°：x = tan(φ/2) = −1，κ = 0.5000；整圈弧长 2π ≈ 6.2832', at({})],
      ['κ ≈ 1 − 2.500×10⁻¹¹，V₊ ≈ 2 − 5.000×10⁻¹¹，V× ≈ 1.000×10⁻⁵', at({ phi: 1e-5 })],
      ['V÷ = 2(1 − κ) = 1.6000，κ = 1/(1 + x²) = 0.2000', at({ phi: 2 * Math.atan(2), scene: 'clock' })],
      ['X ≈ 7 − 4.000×10⁻⁴：ψ ≈ 4.0943', at({ scene: 'prime', X: 6.9996 })],
      ['360°/16 = 22.50°，κ ≈ 0.9619', at({ scene: 'scales', N: 16 })]
    ].filter(([x, table]) => relations(x, table).bad.length || !relations(x, table).count);
  check('the audit of relations finds eighteen wrong texts and leaves five right ones', !wrong.length && !right.length, JSON.stringify([wrong.map((x) => x[0]), right.map((x) => [x[0], relations(...x).bad])]));
  // the formatter of the page on its own, against the same rule
  const cases = [[null, 0.69314718, 4], [[1, 2], 0.5, 4], [[1, 3], 1 / 3, 4], [[16, 65], 16 / 65, 4], [[9, 2], 4.5, 2], [null, 0.99999, 4], [null, -0.99999, 4], [null, 1.99999, 4], [null, 4e-7, 4], [null, 57295.7795, 4], [[1, 2], 0.6, 4], [[-1, 1], -1, 4], [[45, 4], 11.25, 2], [[361, 4], 90.25, 1], [null, 0.50001, 4]],
    got = await page.evaluate((list) => list.map((c) => window.MANIFOLD_DEBUG.relation(...c)), cases),
    want = ['≈ 0.6931', '= 0.5000', '≈ 0.3333', '≈ 0.2462', '= 4.50', '≈ 1 − 1.000×10⁻⁵', '≈ −1 + 1.000×10⁻⁵', '≈ 2 − 1.000×10⁻⁵', '≈ 4.000×10⁻⁷', '≈ 5.730×10⁴', '≈ 0.6000', '= −1.0000', '= 11.25', '≈ 90.3', '≈ 1/2 + 1.000×10⁻⁵'];
  // a relation sign and its digits never part at the end of a line: a no-break space stands between them
  const parted = await page.evaluate(() => {
    const raw = (sel) => [...document.querySelectorAll(sel)].map((e) => e.textContent);
    return [...raw('#readouts output, .field output, #tau').filter((x) => /[=≈<] /.test(x.replace(/\u00a0/g, '_'))), ...raw('#hudTl, #readouts, #presetNote, .stage .tag, #keyPill, #basis .lean.num, [data-bench]').filter((x) => x.replace(/\u00a0/g, '_').includes('≈ '))];
  });
  check('a relation sign and its digits never part at the end of a line', !parted.length, parted.slice(0, 3).join(' | '));
  check('the one formatter: “=” for fifteen cases only where the decimal is the fraction and the double agrees, landmarks by their distance', same(got, want), JSON.stringify(got));
  const drifts = [0, 1e-16, 9.99e-16, 1e-15, 2.2e-15, 1, 0.18, 5e-324],
    below = await page.evaluate((xs) => xs.map((x) => window.MANIFOLD_DEBUG.below(x)), drifts);
  check('a drift is written as the least power of ten above it, “= 0” of 0 alone', same(below, drifts.map(belowText)) && below[0] === '= 0' && below[3] === '< 10⁻¹⁴' && below[5] === '< 10¹', JSON.stringify(below));
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
          const s = window.MANIFOLD_DEBUG.state;
          out.push({
            lang,
            lens: s.lens,
            v: { scene: s.scene, lens: s.lens, N: s.N, phi: s.phi, X: s.X, regime: s.regime },
            drift: [s.scales.closure, s.leanInstances.cheb.gap, s.lie],
            texts: Object.fromEntries(['#keyPill', '#hudTitle', '#hudSub', '#presetNote', '#tour .tour-note', '#roKeySub', '#roNote', '#tau', '#plotMeta', '#plotMetaB'].map((x) => [x, text(x)])),
            lists: Object.fromEntries(['roKey', 'roScale', 'roMer', 'roLie', 'roClock', 'roPrime'].map((x) => [x, text('#' + x)])),
            outs: ['nOut', 'phiOut', 'lxOut', 'xOut'].map((x) => text('#' + x)),
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
const areaTexts = (p = page, areas = ['#hudTl', '#readouts', '#basis', '#drawer', '#ctlPanel', 'header.top', 'footer.rail', '#tour', '#rail', '.strip', '#stage .tags']) =>
  p.evaluate((areas) => {
    TRV.kit.flush();
    return areas.map((sel) => {
      const found = document.querySelector(sel);
      if (!found) return [sel, ''];
      const el = found.cloneNode(true);
      for (const x of el.querySelectorAll('*'))
        if (!/^(?:A|B|CODE|EM|OUTPUT|STRONG|SUB|SUP)$/.test(x.tagName) && !(x.tagName === 'SPAN' && (x.dataset.bench || !/\b(?:zh|en|big|sub|aside|ok|tag)\b/.test(x.className)))) {
          x.prepend('¶');
          x.append('¶');
        }
      return [sel, el.textContent.replace(/\s+/g, ' ')];
    });
  }, areas);
// the places a pointer, a key, a slider and playback reach, the ends, and doubles beside the landmarks
const TURNS = [...[0, 1, 30, 45, 60, 89, 90, 91, 120, 150, 180, 181, 210, 240, 269, 270, 271, 300, 330, 359, 360].map((x) => ['phiRange', x]), ...[0, 1e-7, 1e-5, 0.123456, 0.2499999, 0.2500001, 1 / 3, 0.4999999, 0.5000001, 0.7499999, 0.75, 0.7500001, 0.9999999, 1].map((x) => ['now', x])];
const SWEEPS = {
  [S_CARD]: Array.from({ length: 31 }, (_, k) => [['nRange', 6 + k]]),
  [M_CARD]: TURNS.map((x) => [x]),
  [F_CARD]: TURNS.map((x) => [x]),
  [K_CARD]: [...[-6, -5.5, -3, -2.5, -2, -1, -0.5, -0.05, 0, 0.05, 0.5, 1, 1.5, 2, 2.35, 3, 4, 5.95, 6].map((x) => [['lxRange', x]]), ...[0, 0.123456, 0.4999999, 0.5, 0.5000001, 0.75, 1].map((x) => [['now', x]])],
  [P_CARD]: [...[1.5, 1.9, 2, 2.1, 3, 4, 5, 6.5, 6.9, 7, 7.1, 8, 9, 10, 11, 13, 15.9, 16].map((x) => [['xRange', x]]), ...[0, 1e-7, 0.123456, 5.5 / 14.5 - 1e-5, 5.5 / 14.5 - 1e-6, 5.5 / 14.5, 5.5 / 14.5 + 1e-6, 0.9999999, 1].map((x) => [['now', x]])]
};
for (const [where, query, viewport] of [
  ['desktop', '', { width: 1440, height: 900 }],
  ['phone', '', { width: 390, height: 844 }],
  ['figure', 'embed=1&', { width: 740, height: 500 }]
])
  for (const id of ORDER) {
    const p = await T.open(BOOK, ID, `?${query}lang=zh&preset=${id}`, { viewport, reducedMotion: 'reduce' });
    await settle(p);
    const frames = await readFrames(p, SWEEPS[id]);
    const bad = [],
      beside = [],
      unmarked = [],
      zeros = [];
    let count = 0;
    for (const f of frames) {
      const table = tableOf(f.v),
        at = `${f.lang}/lens ${f.lens}/N = ${f.v.N}, φ = ${f.v.phi}, X = ${f.v.X}`;
      const textOfFrame = [...Object.entries(f.texts), ...f.tags.map((x) => ['label', x])];
      for (const [sel, x] of textOfFrame) {
        // (the reading of the first strip on the negative half is −φ = 360° − φ)
        const mirrored = sel === '#plotMeta' && f.v.phi > PI,
          r = relations(x, mirrored ? tableOf({ ...f.v, phi: TAU - f.v.phi }) : table);
        count += r.count;
        bad.push(...r.bad.map((b) => `${at} ${sel}: ${b}`));
        beside.push(...mixed(x).map((b) => `${at} ${sel}: ${b}`));
        if (/NaN|undefined|Infinity/.test(x)) bad.push(`${at} ${sel}: ${x}`);
        if (/\d\.\d/.test(x.replace(/ψ\([\d.]+\)/g, 'ψ')) && !r.count && sel === 'label') unmarked.push(`${at} ${sel}: ${x}`);
        // a printed 0.0000 or 0.00° is an exact zero, never the rounding of a residue; a drift is a power of ten
        if (/≈ −?0\.0+(?![\d×])/.test(x)) zeros.push(`${at} ${sel}: ${x}`);
        for (const m of x.matchAll(/(?:浮点偏差|浮点余量(?:最大)?|drift|residue) (\S+ ?\S*)/g)) if (!/^(?:= 0|< 10⁻[⁰¹²³⁴⁵⁶⁷⁸⁹]+)(?![\d.]\d)/.test(m[1])) unmarked.push(`${at} ${sel}: ${m[0]}`);
      }
      for (const [key, list] of Object.entries(f.lists)) {
        beside.push(...mixed(list).map((b) => `${at} #${key}: ${b}`));
        const parts = list.split(' · ');
        const want = key === 'roKey' ? [table.key] : key === 'roLie' ? ['drift', 'drift', 'drift', 'drift', 'drift'] : table.lists[key];
        if (key === 'roClock') {
          if (list !== '≈ 0.6931 · = 1/2 · = 4/5 · = 9/10, 81/85, 1089/1105') bad.push(`${at} #${key}: ${list}`);
          continue;
        }
        if (parts.length !== want.length) bad.push(`${at} #${key}: ${list}`);
        else
          parts.forEach((x, i) => {
            count++;
            const why = want[i] === 'count' ? (x === `= ${PP.filter((w) => w.n <= f.v.X).length}` ? '' : 'the count') : listed(x, want[i], table, ['crease', 'total'].includes(want[i]) ? '°' : '');
            if (why) bad.push(`${at} #${key}: ${x} [${why}]`);
          });
      }
      if (f.lists.roLie !== ['r1', 'r2', 'r3', 'mean', 'geo'].map((k) => belowText(f.drift[2][k])).join(' · ')) bad.push(`${at} #roLie: ${f.lists.roLie}`);
      if (f.v.scene === 'scales' && f.v.lens === 0 && f.lists.roKey !== belowText(f.drift[0])) bad.push(`${at} #roKey: ${f.lists.roKey}`);
      const X = (y) => listed(y, 'X', table),
        outs = [f.outs[0] === `= ${f.v.N}` ? '' : 'N', listed(f.outs[1], 'deg', table, '°'), f.outs[2].startsWith('x ') ? listed(f.outs[2].slice(2), 'x', table) : 'no x', X(f.outs[3])],
        tau = f.texts['#tau'],
        rail = { scales: () => (tau === `N = ${f.v.N}` ? '' : 'N'), prime: () => (tau.startsWith('X ') ? X(tau.slice(2)) : 'no X'), clock: () => (tau.startsWith('τ ') ? listed(tau.slice(2), 'tau', table) : 'no τ') }[f.v.scene] || (() => (tau.startsWith('φ ') ? listed(tau.slice(2), 'deg', table, '°') : 'no φ'));
      outs.forEach((why, i) => why && unmarked.push(`${at} output ${i}: ${f.outs[i]} [${why}]`));
      if (rail()) unmarked.push(`${at} #tau: ${tau} [${rail()}]`);
      // the title and the line of the stage name the place by its exact name where it has one
      if (f.v.scene === 'meridian' && f.v.lens === 0 && table.names.x && f.texts['#keyPill'] !== `x ${table.names.x}`) bad.push(`${at} #keyPill: ${f.texts['#keyPill']}`);
      if (f.v.scene === 'prime' && table.names.X && !f.texts['#hudSub'].startsWith(`X ${table.names.X}`)) bad.push(`${at} #hudSub: ${f.texts['#hudSub']}`);
      if (f.v.scene === 'prime' && !table.names.X && /ψ\(\d/.test(f.texts['#hudTitle'])) bad.push(`${at} #hudTitle: ${f.texts['#hudTitle']}`);
    }
    check(`${where}/${id}: in ${frames.length} frames every printed relation is “=” before the value itself or “≈” before its rounding (${count} relations)`, frames.length >= 100 && count >= 14 * frames.length && !bad.length, `${count} of ${frames.length}: ${[...new Set(bad)].slice(0, 5).join(' ¦ ')}`);
    check(`${where}/${id}: the rail, the sliders, the labels and the drifts carry their relation`, !unmarked.length, [...new Set(unmarked)].slice(0, 4).join(' ¦ '));
    check(`${where}/${id}: no rounding is printed as zero`, !zeros.length, zeros.slice(0, 3).join(' ¦ '));
    for (const [sel, x] of await areaTexts(p)) beside.push(...mixed(x).map((b) => `${sel}: ${b}`));
    check(`${where}/${id}: no rounded or decimal digits stand beside <, >, ≤ or ≥ in the HUD, the readouts, the evidence, the drawer, the notes, the labels, the rail and the strips, nothing exempt`, !beside.length, [...new Set(beside)].slice(0, 4).join(' ¦ '));
    await p.context().close();
  }

/* ---------- the stage-first contract on the five cards, in both languages, on desktops and on phones ---------- */
for (const lang of ['zh', 'en'])
  for (const [where, width, height, least] of [
    ['desktop', 1440, 900, 0.28],
    ['narrow desktop', 1081, 768, 0.18],
    ['phone', 390, 844, 0.4],
    ['small phone', 360, 740, 0.4]
  ]) {
    const p = await T.open(BOOK, ID, '?lang=' + lang, { viewport: { width, height }, reducedMotion: 'reduce', locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
    await settle(p);
    for (const id of ORDER) {
      await p.locator(`[data-preset="${id}"]`).evaluate((b) => b.click());
      await settle(p);
      await p.evaluate(() => scrollTo(0, 0));
      const view = await stageView(p, '#stage'),
        share = await viewportShare(p, '#stage'),
        labels = [...(await labelOverlaps(p, '.stage .tag', 0)), ...(await capitalGreek(p))],
        left = lang === 'en' ? await cjkLeftovers(p) : [],
        dom = await p.evaluate((cid) => {
          const b = document.querySelector(`[data-preset="${cid}"]`),
            top = (s) => document.querySelector(s).getBoundingClientRect().top,
            wide = (s) => [...document.querySelectorAll(s)].filter((el) => el.getClientRects().length && el.scrollWidth > el.clientWidth + 1).map((el) => el.id || el.className || el.tagName);
          return { tourShown: document.querySelector('#tour').getClientRects().length > 0, pressed: b.getAttribute('aria-pressed'), note: document.querySelector('#presetNote').textContent.trim().length, tour: document.querySelector('#tour .what').textContent.trim().length, stage: top('#stage'), deck: top('#rail'), strip: top('.strip'), tourTop: top('#tour'), wide: wide('#readouts dd, #readouts .note, #basis .lean, #ctlPanel .field, #presetNote, header.top, .strip .head') };
        }, id);
      check(
        `stage first ${lang}/${where} ${width}×${height}/${id}: the stage holds its share, the regions and labels keep clear, the card is marked and explained`,
        share >= least && !view.layout.length && !view.hud.length && !labels.length && !left.length && (await overflowX(p)) <= 0 && dom.pressed === 'true' && dom.note > 10 && dom.tour > 10 && dom.stage < dom.strip && (width > 1080 ? !dom.tourShown : dom.tourShown && dom.stage < dom.tourTop && dom.tourTop < dom.strip && dom.stage < dom.deck) && !dom.wide.length,
        JSON.stringify({ share, view: [...view.layout, ...view.hud].slice(0, 3), labels: labels.slice(0, 3), left: left.slice(0, 3), dom })
      );
      const m = await state(p);
      check(`stage first ${lang}/${where}/${id}: the card rests on its still and its scene`, near(m.t, CARDS[id].still, 1e-12) && m.scene === CARDS[id].scene && m.preset === id && !m.playing);
    }
    await p.context().close();
  }

/* ---------- phones, embeds, cited figures and stills ---------- */
const FIGURE_TEXT = {
  [S_CARD]: ['N = 18', '360°/18 = 20.00°', '< 10⁻¹'],
  [M_CARD]: ['x = −1', 'κ = 0.5000', '0', '1', '∞'],
  [F_CARD]: ['φ = 90.0°', 'V₊', 'V÷', 'V× = 1.0000'],
  [K_CARD]: ['x = 8', 'τ ≈ 2.0794', 'π/2 ≈ 1.5708', 'ln 2 ≈ 0.6931'],
  [P_CARD]: ['X = 7', 'ψ ≈ 6.0403', 'γ₇', 'ln 7 ≈ 1.9459']
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
    // the mirror lens button flips the same lens as the rail switch
    const pressed = () => Promise.all(['#mobileLensBtn', '#lensToggleBtn'].map((sel) => p.getAttribute(sel, 'aria-pressed')));
    await p.evaluate(() => scrollTo(0, 0));
    await p.click('#mobileLensBtn');
    await settle(p);
    check(`${lang}/390: the mirror lens button switches the lens and syncs the rail switch`, (await state(p)).lens === 1 && same(await pressed(), ['true', 'true']));
    for (const id of ORDER) {
      await p.locator(`[data-preset="${id}"]`).evaluate((b) => b.click());
      await settle(p);
      await layout(p, `${lang}/390 plate lens ${id}`);
    }
    await p.evaluate(() => scrollTo(0, 0));
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
        note = flat(await p.locator('.tour .tour-note').innerText()),
        fits = await p.locator('.tour .tour-note').evaluate((el) => el.scrollHeight <= el.clientHeight + 1);
      check(`${lang}/figure ${width}/${id}: parked on the still, the strip and the mirror lens hidden`, s.preset === id && near(s.t, CARDS[id].still, 1e-12) && (await p.locator('.strip').isHidden()) && (await p.locator('#mobileLensBtn').isHidden()));
      check(`${lang}/figure ${width}/${id}: the note states the still numbers and shows whole`, FIGURE_TEXT[id].every((x) => note.includes(x)) && fits, note);
      check(`${lang}/figure ${width}/${id}: the note has no sub- or superscripts`, (await p.locator('.tour .tour-note sub, .tour .tour-note sup').count()) === 0);
      await layout(p, `${lang}/figure ${width}/${id}`, true);
      if (id === M_CARD && width === 740) {
        await p.click('#rewindBtn');
        await settle(p);
        const z = flat(await p.locator('.tour .tour-note').innerText()),
          sub0 = flat(await p.textContent('#hudSub'));
        check(`${lang}/figure 740: ⏮ on the meridian card turns the figure note and the HUD to x = 0, κ = 1`, (await state(p)).phi === 0 && /x = 0/.test(z) && z.includes('κ = 1.0000') && /φ = 0\.0°/.test(sub0) && /x = 0/.test(sub0) && /κ = 1/.test(sub0), z);
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
        at = window.MANIFOLD_DEBUG.project(window.MANIFOLD_DEBUG.state.handle);
      return mark ? [mark.x - at.x, mark.y - at.y, mark.hidden] : null;
    });
    check(`still ${lang}/${id}: an amber ring marks the current point where the handle would be`, !!ring && Math.hypot(ring[0], ring[1]) < 1 && !ring[2], JSON.stringify(ring));
    // in a still the stage fills the frame over the tour bar and the strips: only its own title, legend and labels count
    const view = await stageView(p, '#stage', true),
      over = await labelOverlaps(p, '.stage .tag', 0);
    check(`still ${lang}/${id}: the title, the legend and the labels are whole and apart`, !view.hud.length && !over.length, JSON.stringify([view.hud, over]));
    const want = {
      [S_CARD]: () => m.N === 18 && m.scales.crease.toFixed(2) === '20.00' && m.scales.closure < 1e-10,
      [M_CARD]: () => near(m.mer.x, -1, 1e-12) && near(m.mer.kappa, 0.5, 1e-12),
      [F_CARD]: () => near(m.mer.plus, 1, 1e-12) && near(m.mer.div, 1, 1e-12) && near(m.mer.mul, 1, 1e-12),
      [K_CARD]: () => near(m.mer.x, 8, 1e-9) && f4(m.mer.tau) === '2.0794',
      [P_CARD]: () => m.X === 7 && f4(m.prime.psi) === '6.0403' && f4(m.prime.jump) === '1.9459'
    }[id];
    check(`still ${lang}/${id}: the numbers of its caption`, want());
    await p.context().close();
  }
}
// a cited figure opens paused on the frame its caption names; ▶ plays the sweep again from its start and parks there
for (const id of [M_CARD, P_CARD]) {
  const p = await T.open(BOOK, ID, `?embed=1&lang=zh&preset=${id}`, { viewport: { width: 740, height: 500 } });
  await settle(p);
  const s = await state(p);
  check(`${id}: the cited figure opens paused on its still`, !s.playing && near(s.t, CARDS[id].still, 1e-12) && s.preset === id);
  check(`${id}: ▶ plays the sweep`, await playsAfter(p, () => p.click('#playBtn'), () => window.MANIFOLD_DEBUG.state));
  const back = await until(p, (still) => !window.MANIFOLD_DEBUG.state.playing && Math.abs(window.MANIFOLD_DEBUG.state.t - still) < 1e-12, CARDS[id].still, 150000);
  check(`${id}: the sweep parks on the still again, the card still marked`, back && (await state(p)).preset === id);
  await p.context().close();
}
for (const id of ORDER) check(`${id} plays`, await playsAfter(page, () => page.click(`[data-preset="${id}"]`), () => window.MANIFOLD_DEBUG.state));
check('permanent dark console in both system schemes', !paletteMutations.length && paletteDocuments.every((x) => x.absent) && paletteDocuments.some((x) => x.dark) && paletteDocuments.some((x) => !x.dark));
check('zero console warnings', browserWarnings.length === 0, browserWarnings.slice(0, 3).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('zero browser or request errors', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));
await T.finish();
