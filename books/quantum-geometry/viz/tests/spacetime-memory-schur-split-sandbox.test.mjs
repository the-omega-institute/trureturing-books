import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, solidPixels, settle, openStill, playsAfter, until, stageView, cjkLeftovers, capitalGreek, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';
import { ROOT, resolveBook, vizCitations } from '../../../../tools/node/viz-common.mjs';

const BOOK = 'quantum-geometry';
const ID = 'spacetime-memory-schur-split-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const THEORY = 'ch38-s12-spacetime-motion-equivalence-and-memory-schur-split.html#sec-ch38-spacetime-motion-equivalence-and-memory-schur-split';
const SECTION = '38.12';
// scene, view, the declared still (a value of the rail), the end of the rail and the regime of the still of every card
const CARDS = {
  'isotropic-arc-memory-schur-split': { scene: 'split', cam: 'panorama', still: 20, max: 60, regime: 'mixed' },
  'minkowski-minus-from-pythagorean-budget': { scene: 'minus', cam: 'panorama', still: 30, max: 40, regime: 'mixed' },
  'memory-capacity-three-regime-phase': { scene: 'regimes', cam: 'panorama', still: 4, max: 8, regime: 'finite' },
  'dual-observer-simultaneity-rotor-tilt': { scene: 'dual', cam: 'panorama', still: 60, max: 60, regime: 'swapped' },
  'forgetting-generates-space-and-kv-cache': { scene: 'forget', cam: 'panorama', still: 12, max: 12, regime: 'forgetting' }
};
const IDS = Object.keys(CARDS);
const [SPLIT, MINUS, REGIMES, DUAL, FORGET] = IDS;
const DEFAULT = SPLIT;
// the order of the evidence panel
const GIDS = [
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.kappa_eq_one_sub_dist_sq',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul',
  'D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.reflectionSeq_eq_pow',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.kappa_reflectionSeq_add',
  'D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities',
  'D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least',
  'D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras',
  'D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean',
  'D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass',
  'D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null',
  'D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation',
  'D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound',
  'D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal',
  'D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently'
];
const OPEN_IDS = ['prob-ch34-gravity-dynamics-and-coupling', 'prob-appendix-d-time-horizon'];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const range = (n) => Array.from({ length: n }, (_, i) => i);

/* ---------- independent mathematics, written here and never calling the page ---------- */
const gcdN = (a, b) => (b ? gcdN(b, a % b) : a < 0n ? -a : a);
const fracN = (p, q = 1n) => {
  const g = (gcdN(p, q) || 1n) * (q < 0n ? -1n : 1n);
  return [p / g, q / g];
};
const [addN, subN, mulN, divN] = [([a, b], [c, d]) => fracN(a * d + c * b, b * d), ([a, b], [c, d]) => fracN(a * d - c * b, b * d), ([a, b], [c, d]) => fracN(a * c, b * d), ([a, b], [c, d]) => fracN(a * d, b * c)];
const cmpN = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
const eqN = (a, b) => cmpN(a, b) === 0;
const numN = ([p, q]) => Number((p * 10n ** 40n) / q) / 1e40;
const intN = (n) => [BigInt(n), 1n];
const ONE = intN(1),
  ZERO = intN(0);
const strN = ([p, q]) => `${p}`.replace('-', '−') + (q === 1n ? '' : `/${q}`);
/** The fraction a probe carries as two strings. */
const readN = (v) => (v && v.q ? [BigInt(v.q[0]), BigInt(v.q[1])] : null);
/** The rational square root of a fraction, or null. */
function rootN([p, q]) {
  const isq = (n) => {
    let x = 0n;
    while ((x + 1n) * (x + 1n) <= n) x++;
    return x;
  };
  if (p < 0n) return null;
  const a = isq(p),
    b = isq(q);
  return a * a === p && b * b === q ? [a, b] : null;
}
/** The point of the unit quarter circle whose half-angle tangent is u, found by the quaternion of the turn: the rotation of
    (1, 0) by the unit complex number ((1 + iu)/|1 + iu|)², written without any root: (1 + iu)² / (1 + u²). */
function circleN(u) {
  const re = subN(ONE, mulN(u, u)),
    im = mulN(intN(2), u),
    n = addN(ONE, mulN(u, u));
  return { cos: divN(re, n), sin: divN(im, n) };
}
/** [p:q] of the ratio Δx : Δτ, in lowest terms. */
function slopeN(cos, sin) {
  if (cos[0] === 0n) return [1, 0];
  const r = divN(sin, cos);
  return [Number(r[0]), Number(r[1])];
}
const WEIGHTS_N = range(8).map((i) => fracN(BigInt(8 - i), 36n));
/** The share inside a window of capacity M, added up mode by mode. */
const insideN = (M) => {
  let s = ZERO;
  for (let k = 0; k < M; k++) s = addN(s, WEIGHTS_N[k]);
  return s;
};
/** The rotation Ad(q) v = q v conj(q) / |q|² of a quaternion q = (w, x, y, z), entry by entry from the general formula. */
function adN([w, x, y, z]) {
  const n = [w, x, y, z].reduce((s, a) => addN(s, mulN(a, a)), ZERO),
    m = (a, b) => mulN(a, b),
    t = (a) => mulN(intN(2), a);
  const R = [
    [subN(subN(addN(m(w, w), m(x, x)), m(y, y)), m(z, z)), t(subN(m(x, y), m(w, z))), t(addN(m(x, z), m(w, y)))],
    [t(addN(m(x, y), m(w, z))), subN(addN(subN(m(w, w), m(x, x)), m(y, y)), m(z, z)), t(subN(m(y, z), m(w, x)))],
    [t(subN(m(x, z), m(w, y))), t(addN(m(y, z), m(w, x))), addN(subN(subN(m(w, w), m(x, x)), m(y, y)), m(z, z))]
  ];
  return R.map((row) => row.map((e) => divN(e, n)));
}
/** A first-in-first-out window simulated with a queue: after n beats with capacity M, what it keeps and what it lost. */
function fifoN(n, M) {
  const queue = [],
    lost = [];
  for (let b = 1; b <= n; b++) {
    queue.push(b);
    if (queue.length > M) lost.push(queue.shift());
  }
  return { kept: queue.length, lost: lost.length, oldest: queue[0] || null };
}
/** Complex fractions [re, im]. */
const cmulN = ([a, b], [c, d]) => [subN(mulN(a, c), mulN(b, d)), addN(mulN(a, d), mulN(b, c))];
const conjN = ([a, b]) => [a, subN(ZERO, b)];
const cstr = (z) => (eqN(z[1], ZERO) ? strN(z[0]) : `${strN(z[0])} ${z[1][0] < 0n ? '−' : '+'} ${strN(z[1]).replace('−', '')}i`);

/* ---------- what a printed decimal says ---------- */
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
const supT = (n) => String(n).replace(/\d/g, (c) => SUP[c]);
const expOf = (e) => Number(e.replace('⁻', '-').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (d) => SUP.indexOf(d)));
const tenN = (e) => (e < 0 ? [1n, 10n ** BigInt(-e)] : [10n ** BigInt(e), 1n]);
function decimalN(s) {
  const [m, e = '⁰'] = s.replace('−', '-').split('×10'),
    [whole, part = ''] = m.split('.');
  return mulN([BigInt(whole + part), 1n], tenN(expOf(e) - part.length));
}
/** The relation and the digits the page must print for a fraction (4 decimals). */
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
    const gap = numN(subN(q, v === 0.5 ? [1n, 2n] : intN(v))),
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
const BESIDE = new RegExp(`≈ ?[^，；。、,;:：·¶≈=]*?${SIGN} ?[−\\d|‖φκα√e]|${SIGN} ?≈`, 'g');
const DECIMAL = new RegExp(`\\d\\.\\d+°? ?${SIGN}|${SIGN} ?−?\\d+\\.\\d`, 'g');
const mixed = (text) => [...clauses(text).filter((x) => MIXED.test(x)), ...[...text.replace(/\s+/g, ' ').matchAll(DECIMAL)].map((m) => m[0]), ...[...text.replace(/\s+/g, ' ').matchAll(BESIDE)].map((m) => m[0])];
/** Every “p/q = d.dddd” or “p/q ≈ d.dddd” of a text: [] or what is wrong. A value beside a landmark may follow “≈” as a
    difference. A decimal after “=” must be the value; one after “≈” must round it and must not be the value. */
function fractionRelations(text) {
  const bad = [];
  for (const m of text.replace(/\s+/g, ' ').matchAll(/(−?\d+)\/(\d+) ([=≈]) (−?\d+\.\d{4})(?!\d)/g)) {
    const q = fracN(BigInt(m[1].replace('−', '-')), BigInt(m[2])),
      want = said(q);
    if (`${m[3]} ${m[4]}` !== want) bad.push(`${m[0]} (want ${want})`);
  }
  return bad;
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
  await context.exposeBinding('__spacetimePaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__spacetimePaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__spacetimePaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined, dark: matchMedia('(prefers-color-scheme: dark)').matches }).catch(() => {}), { once: true });
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
  for (const id of IDS)
    check(`the shared gate went through ${id} on the desktop in both languages and on the phone`, ran(new RegExp(`^desktop: card ${id} applies`)) && ran(new RegExp(`^English: no Chinese left with card ${id}`)) && ran(new RegExp(`^phone: card ${id} applies`)));
  check('the shared gate ran whole and passed: solid, cards, evidence, rails, keys, short screens, cover and motion', gate.length > 150 && gate.every(([, ok]) => ok) && [/^evidence: green boxes/, /^short screen/, /^cover:/, /^rail/, /solid/i].every(ran), String(gate.length));
}

/* ---------- sources, registry and citations ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
const suite = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
const registry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8'));
const entry = (registry.visualizations || []).find((v) => v.id === ID) || null;
const entryText = JSON.stringify(entry || {});
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
check('reserved identifiers are absent from the suite and the registry entry', [suite, entryText].every((src) => !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src) && !hangul.test(src)));
check('the suite waits on states, never a fixed time', !/waitForTimeout\(/.test(suite));
check(
  'the page loads exactly the shared theme, its own style sheet, the shell, the kit and main.js',
  same([...sources['index.html'].matchAll(/<(?:script src|link rel="stylesheet" href)="([^"]+)"/g)].map((m) => m[1]).filter((u) => !u.startsWith('https://fonts.')), ['../assets/theme.css', 'style.css', '../assets/shell.js', '../assets/kit.js', 'main.js'])
);
check(
  'registration: §38.12, live, five cards in order and the sixteen GIDs in order',
  !!entry &&
    entry.chapter === 38 &&
    entry.section === SECTION &&
    entry.status === 'live' &&
    entry.code === 'OMEGA//SPACETIME' &&
    same(entry.presets, IDS) &&
    same(Object.keys(entry.preset_titles || {}), IDS) &&
    same((entry.lean || []).map((x) => x.gid), GIDS) &&
    (entry.theory || []).some((t) => t.href === '../zh/' + THEORY && t.href_en === '../en/' + THEORY),
  JSON.stringify(entry && { chapter: entry.chapter, section: entry.section, status: entry.status, code: entry.code })
);
check(
  'registration: the title and the card titles of the registry are those of the page',
  !!entry &&
    sources['index.html'].includes(`<title>OMEGA//SPACETIME · ${entry.title}</title>`) &&
    sources['index.html'].includes(`data-title-en="OMEGA//SPACETIME · ${String(entry.title_en).replaceAll('&', '&amp;')}"`) &&
    IDS.every((id) => {
      const button = new RegExp(`data-preset="${id}"[^>]*>.*?<span class="cn zh">([^<]*)</span><span class="cn en">([^<]*)</span>`).exec(sources['index.html']);
      return !!button && entry.preset_titles[id].zh === button[1] && entry.preset_titles[id].en === button[2].replaceAll('&amp;', '&');
    })
);
{
  // the .viz blocks of the chapter, once it cites the page: their cards exist, and both editions cite the same sequence
  const cited = vizCitations(resolveBook(BOOK), ID),
    seq = (lang) => cited.filter((c) => c.lang === lang).map((c) => c.preset || null);
  check('chapter citations: every cited card exists on the page and both editions cite the same sequence', cited.every((c) => !c.preset || IDS.includes(c.preset)) && same(seq('zh'), seq('en')), JSON.stringify(cited));
}

/* ---------- static text: pure green boxes, no written numbers, no mixed inequality ---------- */
const plain = (html) => html.replace(/<[^>]*>/g, '').replaceAll('&gt;', '>').replaceAll('&lt;', '<').replaceAll('&amp;', '&').replace(/\s+/g, ' ');
const BOXES = [...sources['index.html'].matchAll(/<div class="lean( [a-z]+)?">(.*?)<\/div>/g)].map((m) => ({
  kind: (m[1] || '').trim(),
  gid: (/data-lean-gid="([^"]+)"/.exec(m[2]) || [])[1] || null,
  zh: plain((/<span class="zh">(.*?)<\/span>(?=<span class="en">)/.exec(m[2]) || ['', ''])[1]),
  en: plain((/<span class="en">(.*?)<\/span>(?=<a data-lean-gid|<\/span>$)/.exec(m[2]) || ['', ''])[1]),
  raw: m[2]
}));
const GREEN = BOXES.filter((b) => !b.kind);
check('the panel holds sixteen green boxes in the order of the brief, then ARGUED, MODEL, OPEN and NUM', same(GREEN.map((b) => b.gid), GIDS) && same(BOXES.slice(16).map((b) => b.kind), ['argued', 'model', 'open', 'num']) && BOXES.length === 20, JSON.stringify(BOXES.map((b) => b.kind || b.gid)));
// a green box says what the frozen theorem says: no instance of the page, no computed number, no reading of the page
const INSTANCE = /页面|本页|舞台|探针|滑块|偏差|余量|数值|演示|这里的|实例|手工推导|窗内|窗外|时空|记忆|观察者|同时|遗忘|this page|the page|on the page|stage|probe|slider|\bgap\b|drift|residue|instance|numerical|computes|derived by hand|inside|outside|spacetime|memory|observer|simultane|forget|≈|\d\.\d|10⁻|MODEL|NUM|ARGUED/i;
check('green boxes: no instance, number, rounding or reading of the page in any of the sixteen, in either language', GREEN.every((b) => b.zh.length > 20 && b.en.length > 30 && !INSTANCE.test(b.zh) && !INSTANCE.test(b.en)), GREEN.filter((b) => INSTANCE.test(b.zh) || INSTANCE.test(b.en)).map((b) => b.gid + ' ' + (INSTANCE.exec(b.zh) || INSTANCE.exec(b.en))[0]).join(' | '));
check('green boxes: no mixed inequality and no span the script fills', GREEN.every((b) => !mixed(b.zh).length && !mixed(b.en).length && !/data-bench|\sid=/.test(b.raw)));
{
  const statements = [
    ['exists_unitQuaternion_equiv', ['不交换', '链连通', '读数可任意接近 0', '特征秩为 5', '读取完备', 'u(o) = 1', 'u(tri(x, y, z)) = u(x) u(y)⁻¹ u(z)', 'κ(x, y) = (1 + ⟨u(x), u(y)⟩)/2'], ['noncommutative', 'chain connected', 'touches zero', 'feature rank 5', 'reading complete', 'u(o) = 1', 'u(tri(x, y, z)) = u(x) u(y)⁻¹ u(z)', 'κ(x, y) = (1 + ⟨u(x), u(y)⟩)/2']],
    ['kappa_eq_one_sub_dist_sq', ['对一切单位四元数 a、b', 'κ(a, b) = 1 − dist(a, b)²/4'], ['for all unit quaternions a and b', 'κ(a, b) = 1 − dist(a, b)²/4']],
    ['tri_eq_mul_inv_mul', ['x · y = tri(x, o, y)', 'tri(o, x, o)', 'tri(x, y, z) = x · y⁻¹ · z'], ['x · y = tri(x, o, y)', 'tri(o, x, o)', 'tri(x, y, z) = x · y⁻¹ · z']],
    ['normSq_and_chebyshev', ['当且仅当', 'xn+2 = xn+1 xn* xn+1', '⟨x0, xn⟩ = Tn(c)', 'c = ⟨x0, x1⟩'], ['if and only if', 'xn+2 = xn+1 xn* xn+1', '⟨x0, xn⟩ = Tn(c)', 'c = ⟨x0, x1⟩']],
    ['reflectionSeq_eq_pow', ['x0 = a、x1 = b、xn+2 = tri(xn+1, xn, xn+1)', 'x · y = tri(x, a, y)', '对每个 n ∈ ℕ 有 xn = bn'], ['x0 = a, x1 = b, xn+2 = tri(xn+1, xn, xn+1)', 'x · y = tri(x, a, y)', 'xn = bn for every n ∈ ℕ']],
    ['kappa_reflectionSeq_add', ['对一切 m、n ∈ ℕ，κ(xm, xm+n) = κ(a, xn)'], ['For all m, n ∈ ℕ, κ(xm, xm+n) = κ(a, xn)']],
    ['orthogonal_complement_projection_identities', ['完备内积空间', '闭子空间', 'Q = I − P，P ∘ P = P，Q ∘ Q = Q，P ∘ Q = 0，Q ∘ P = 0，P + Q = I'], ['complete inner product space', 'closed subspace', 'Q = I − P, P ∘ P = P, Q ∘ Q = Q, P ∘ Q = 0, Q ∘ P = 0 and P + Q = I']],
    ['schur_quadratic_is_least', ['A 是 m × m 复厄米矩阵', 'C 是 n × n 复正定矩阵', 'S = A − B C⁻¹ BH', 'IsLeast'], ['A an m × m complex Hermitian matrix', 'C an n × n complex positive definite matrix', 'S = A − B C⁻¹ BH', 'IsLeast']],
    ['complementary_context_probability_pythagoras', ['Re Tr(ρρ) − 1/|d| = ‖s‖²', '‖PV s‖² = Σl Σj (p(l, j) − 1/|d|)²', 'residualMass(V, s) = ‖PV⊥ s‖²'], ['Re Tr(ρρ) − 1/|d| = ‖s‖²', '‖PV s‖² = Σl Σj (p(l, j) − 1/|d|)²', 'residualMass(V, s) = ‖PV⊥ s‖²']],
    ['pinching_hilbert_schmidt_pythagorean', ['⟨A, B⟩ = Tr(A†B)', '保留对角元', '⟨ρ, ρ⟩ = ⟨𝒫(ρ), 𝒫(ρ)⟩ + ⟨ρ − 𝒫(ρ), ρ − 𝒫(ρ)⟩'], ['⟨A, B⟩ = Tr(A†B)', 'diagonal entries kept', '⟨ρ, ρ⟩ = ⟨𝒫(ρ), 𝒫(ρ)⟩ + ⟨ρ − 𝒫(ρ), ρ − 𝒫(ρ)⟩']],
    ['pinching_discarded_coherence_mass', ['⟨ρ − 𝒫(ρ), ρ − 𝒫(ρ)⟩ = |ρ01|² + |ρ10|²'], ['⟨ρ − 𝒫(ρ), ρ − 𝒫(ρ)⟩ = |ρ01|² + |ρ10|²']],
    ['eq_smul_minkowski_of_null', ['η(t, w) = t² − ‖w‖²', 'η(v) = 0 推出 S(v) = 0', 'S = S(1, 0) · η', '不要求 d 的下界'], ['η(t, w) = t² − ‖w‖²', 'η(v) = 0 implies S(v) = 0', 'S = S(1, 0) · η', 'no lower bound on d']],
    ['bogoliubov_norm_conservation', ['对每个实数 r，|cosh r|² − |sinh r|² = 1'], ['for every real r, |cosh r|² − |sinh r|² = 1']],
    ['record_time_lower_bound', ['fsAngle(a, b) = arccos ‖⟨a, b⟩‖', '⟨m0, m1⟩ = 0', 'energy > 0、hbar > 0', 'π · hbar / (4 · energy) ≤ τ'], ['fsAngle(a, b) = arccos ‖⟨a, b⟩‖', '⟨m0, m1⟩ = 0', 'energy > 0, hbar > 0', 'π · hbar / (4 · energy) ≤ τ']],
    ['surviving_copy_blocks_reversal', ['conj(ol(i, j)) · ol(i, j) = 1', 'ok(i, j) ≠ 1', 'ρij ≠ 0', '≠ ρij'], ['conj(ol(i, j)) · ol(i, j) = 1', 'ok(i, j) ≠ 1', 'ρij ≠ 0', '≠ ρij']],
    ['observable_krylov_once_stable_permanently', ['𝒪m = span{(T*)k(C* y) : k ≤ m, y ∈ Y}', '若 𝒪m = 𝒪m+1', '𝒪m+r = 𝒪m'], ['𝒪m = span{(T*)k(C* y) : k ≤ m, y ∈ Y}', 'If 𝒪m = 𝒪m+1', '𝒪m+r = 𝒪m']]
  ];
  for (const [name, zh, en] of statements) {
    const box = GREEN.find((b) => b.gid.endsWith('.' + name)) || { zh: '', en: '' },
      missing = [...zh.filter((x) => !box.zh.includes(x)), ...en.filter((x) => !box.en.includes(x))];
    check(`${name}: the green box states the theorem with its hypotheses and its conclusion in both languages`, !missing.length, missing.join(' | '));
  }
}
{
  const open = BOXES.find((b) => b.kind === 'open'),
    argued = BOXES.find((b) => b.kind === 'argued'),
    model = BOXES.find((b) => b.kind === 'model');
  check('the OPEN box names both open problems in both languages and has no Lean link', !!open && OPEN_IDS.every((x) => open.zh.includes(x) && open.en.includes(x)) && !open.gid && /3\+1/.test(open.zh) && /Einstein/.test(open.en));
  check('the ARGUED box marks literature and hand derivations, the MODEL box the readings', !!argued && argued.zh.includes('文献结果，未在本书形式化') && argued.zh.includes('手工推导') && argued.en.includes('Literature results, not formalized in this book') && argued.en.includes('Derived by hand') && !!model && model.zh.includes('不是球上原有的两根轴') && model.en.includes('not two axes the sphere carries'));
  const body = sources['index.html'].slice(sources['index.html'].indexOf('<body'));
  check('index.html: the NUM box is empty until the script fills it', (sources['index.html'].match(/<div class="lean num"><span class="ok">NUM<\/span><span><span class="zh">—<\/span><span class="en">—<\/span><\/span><\/div>/g) || []).length === 1);
  const spans = [...sources['index.html'].matchAll(/<span data-bench="([a-zA-Z]+)">(.*?)<\/span>/g)].map((m) => [m[1], m[2]]),
    DRAWER_SPANS = ['kTime', 'kSpace', 'cosh', 'sinh', 'hyp', 'regime', 'dualB', 'kept', 'lost'];
  check('index.html: the numbers of the drawer are empty spans, each name once per language', same(spans.map((x) => x[0]), [...DRAWER_SPANS, ...DRAWER_SPANS]) && spans.every((x) => x[1] === '—'), JSON.stringify(spans));
  const decimals = [...plain(body.replace(/<button class="chip" data-speed[^>]*>[^<]*<\/button>/g, '')).matchAll(/(?<![§\d.])\d+\.\d+/g)].map((m) => m[0]);
  check('index.html: no decimal is written anywhere in the page text, the evidence or the drawer', !decimals.length, decimals.join(' '));
  check('index.html: no decimal, no “≈” and no mixed inequality in the description', [(/<meta name="description" content="([^"]*)"/.exec(sources['index.html']) || ['', '≈ 0.5 > 0'])[1]].every((d) => d.length > 100 && !/\d\.\d|≈/.test(d) && !mixed(plain(d)).length));
  check('index.html: the outputs are empty until the script writes them', ['uOut', 'etaOut', 'mOut', 'sigmaOut', 'kOut', 'roKey', 'roPair', 'roMink', 'roLoad', 'roRegime', 'roRotor', 'roFifo'].every((id) => sources['index.html'].includes(`<output id="${id}">—</output>`)));
  check('index.html: no rounded digits beside an inequality sign', !mixed(plain(body)).length, mixed(plain(body)).slice(0, 3).join(' | '));
  const js = sources['main.js'],
    code = js.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, ''),
    written = [...code.matchAll(/[=≈] ?−?\d+\.(?:\d{4}|\d{6})(?!\d)|\d×10⁻|10⁻[⁰¹²³⁴⁵⁶⁷⁸⁹]/g)].map((m) => m[0]);
  check('main.js: no computed result is written into a sentence', !written.length && !/0\.6400|0\.3600|1\.6667|1\.3333|0\.7222|0\.4243/.test(code), written.join(' '));
  const chained = [...code.replace(/<\/?(?:strong|sub|sup|span|i|b)\b[^<>]*>/g, '').matchAll(/\$\{[^{}]*(?:rel|relQ|both|say)\([^{}]*\)\}°? ?(?:&lt;|&gt;|[<>≤≥])|(?:&lt;|&gt;|[<>≤≥]) ?\$\{[^{}]*(?:rel|relQ|both|say)\(/g)].map((m) => m[0]);
  check('main.js: no template puts an inequality sign beside a printed relation', !chained.length, chained.join(' | '));
  check('main.js: one formatter writes every relation (no toFixed in a sentence)', !/\.toFixed\(/.test(js) && js.includes('function rel(q, x, d = 4)'));
  check('main.js: the NUM box and the spans are filled before the evidence is copied into the drawer', js.indexOf('const BENCH = benchmarks();') > 0 && js.indexOf('numText(sayIt)') > js.indexOf('const BENCH = benchmarks();') && js.indexOf("$('drawerEvidence').append(") > js.indexOf('el.innerHTML = NUMBERS[el.dataset.bench]()'));
  check('main.js: the probe is frozen', js.includes('window.SPACETIME_DEBUG = Object.freeze({'));
  check('main.js: red and green are never drawn on the stage or in the strips', !/P\.(?:warn|ok)\b/.test(js));
}
{
  const bad = ['16/25 ≈ 0.6400 < 1', '0.4243 < 1/2', 'κ ≈ 0.7222 ≤ 1', '≥ 1.0000', '（13/18 ≈ 0.7222 < 1）', 'λ < ≈ 0'],
    good = ['Δτ/Δt > 0（值 ≈ 0.8498）', '16/25 = 0.6400 加 9/25 = 0.3600', 'π · hbar / (4 · energy) ≤ τ', '4 + 8 = 12'];
  check('the detector finds rounded or decimal digits beside an inequality sign and leaves separated texts', bad.every((x) => mixed(x).length > 0) && good.every((x) => !mixed(x).length), JSON.stringify([bad.filter((x) => !mixed(x).length), good.filter((x) => mixed(x).length)]));
  check('the relation detector: 16/25 = 0.6400 and 13/18 ≈ 0.7222 pass, 13/18 = 0.7222 and 16/25 ≈ 0.6400 fail', !fractionRelations('16/25 = 0.6400 · 13/18 ≈ 0.7222').length && fractionRelations('13/18 = 0.7222 · 16/25 ≈ 0.6400').length === 2);
}

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.SPACETIME_DEBUG.state);
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
      const s = window.SPACETIME_DEBUG.state;
      return s.preset === id && !s.blending && !s.playing && Math.abs(s.clock - still) < 1e-12;
    },
    [card, CARDS[card].still],
    150000
  );
  if (!parked) await pause(p);
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
const textOf = async (id, p = page) => (await p.locator('#' + id).textContent()).replace(/\s+/g, ' ').trim();
const tagText = (p = page) => p.locator('.stage .tags .tag:not([hidden])').allInnerTexts();
async function layout(p, label, figure = false) {
  const view = await stageView(p, '#stage', figure);
  const issues = [...view.layout, ...view.hud, ...(await labelOverlaps(p, '.stage .tag', 0)), ...(await capitalGreek(p))];
  check(label + ' framing and legible labels', !issues.length && (await overflowX(p)) === 0, JSON.stringify(issues));
}
/** Every text a reader sees that the script writes: HUD, notes, readouts, tags, pills, outputs, plot titles. */
const liveTexts = (p = page) =>
  p.evaluate(() => {
    const t = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '');
    return [...['#hudBig', '#hudSub', '#legend', '#presetNote', '#tour .tour-note', '#roNote', '#scenePill', '#keyPill', '#plotTitle', '#plotMeta', '#plotTitleB', '#plotMetaB', '#tau', '#formula'].map((s) => t(document.querySelector(s))), ...[...document.querySelectorAll('#readouts output, #ctlPanel output, .stage .tags .tag:not([hidden])')].map(t)];
  });

/* ---------- the exact core of the page, against the one written here ---------- */
{
  const core = await page.evaluate(() => {
    const D = window.SPACETIME_DEBUG;
    return {
      split: Array.from({ length: 61 }, (_, k) => D.core.split(k)),
      regime: Array.from({ length: 9 }, (_, M) => D.core.regime(M)),
      dual: Array.from({ length: 61 }, (_, k) => D.core.dual(k)),
      fifo: Array.from({ length: 7 }, (_, i) => Array.from({ length: 13 }, (_, n) => D.core.fifo(n, i + 1))),
      load: Array.from({ length: 21 }, (_, e) => [0, 12, 15, 20, 30, 40].map((k) => D.core.load(e, k))),
      slopes: D.slopes,
      weights: D.weights()
    };
  });
  const badSplit = core.split.filter((s, k) => {
    const u = fracN(BigInt(k), 60n),
      c = readN(s.cos),
      si = readN(s.sin),
      want = circleN(u);
    const onCircle = eqN(addN(mulN(c, c), mulN(si, si)), ONE),
      half = k === 60 ? eqN(c, ZERO) : eqN(divN(si, addN(ONE, c)), u),
      trig = near(numN(c), Math.cos(2 * Math.atan(k / 60)), 1e-12) && near(numN(si), Math.sin(2 * Math.atan(k / 60)), 1e-12),
      shares = eqN(readN(s.kt), mulN(c, c)) && eqN(readN(s.ks), mulN(si, si)) && eqN(readN(s.sum), ONE),
      slope = same(s.slope, slopeN(want.cos, want.sin)),
      hyper = k === 60 ? s.cosh === null : eqN(readN(s.cosh), divN(ONE, c)) && eqN(readN(s.sinh), divN(si, c)) && eqN(subN(mulN(readN(s.cosh), readN(s.cosh)), mulN(readN(s.sinh), readN(s.sinh))), ONE);
    return !(s.exact && eqN(c, want.cos) && eqN(si, want.sin) && onCircle && half && trig && shares && slope && hyper && eqN(readN(s.u), u));
  });
  check('the 61 stops of u are the rational points of the circle with half-angle tangent u, their shares add to 1, [p:q] and the hyperbola follow', !badSplit.length, JSON.stringify(badSplit.slice(0, 2)));
  check('the slope chips [0:1], [3:4], [5:12], [8:15], [1:0] are the stops 0, 20, 12, 15, 60', same(core.slopes, { '0:1': 0, '3:4': 20, '5:12': 12, '8:15': 15, '1:0': 60 }) && Object.entries(core.slopes).every(([name, k]) => same(core.split[k].slope, name.split(':').map(Number))));
  check('the weights of the eight modes are (9 − k)/36', same(core.weights.map((w) => w.map(String)), WEIGHTS_N.map((w) => w.map(String))));
  const badRegime = core.regime.filter((r, M) => {
    const kt = insideN(M),
      root = rootN(kt);
    return !(r.exact && eqN(readN(r.kt), kt) && eqN(readN(r.ks), subN(ONE, kt)) && eqN(kt, fracN(BigInt(M * (17 - M)), 72n)) && near(r.cos.x, Math.sqrt(numN(kt)), 1e-12) && (root ? eqN(readN(r.cos), root) : r.cos.q === null) && r.regime === (M === 0 ? 'photon' : M === 8 ? 'whole' : 'finite'));
  });
  check('the nine capacities: the share inside is the sum of the first M weights, M(17 − M)/72, and the regimes photon, finite, whole', !badRegime.length, JSON.stringify(badRegime.slice(0, 2)));
  const badDual = core.dual.filter((d, k) => {
    const sigma = fracN(BigInt(k), 60n),
      R = adN([ONE, sigma, ZERO, ZERO]),
      M = d.matrix.map((row) => row.map((x) => [BigInt(x[0]), BigInt(x[1])])),
      g = gcdN(60n, BigInt(k)) || 1n;
    return !(d.exact && M.every((row, i) => row.every((x, j) => eqN(x, R[i][j]))) && eqN(readN(d.bTime), mulN(R[2][1], R[2][1])) && eqN(readN(d.bSpace), mulN(R[1][1], R[1][1])) && eqN(readN(d.aTime), ZERO) && eqN(readN(d.aSpace), ONE) && eqN(readN(d.sumB), ONE) && same(d.rotor, [Number(60n / g), Number(BigInt(k) / g), 0, 0]));
  });
  check('the 61 rotors: R(σ) is the matrix of Ad(1 + σi) entry by entry, B reads sin²α inside and cos²α outside, A reads 0 and 1', !badDual.length, JSON.stringify(badDual.slice(0, 1)));
  const badFifo = core.fifo.flatMap((row, i) => row.filter((f, n) => {
    const q = fifoN(n, i + 1);
    return !(f.kept === q.kept && f.lost === q.lost && f.seq === i + 1 && f.ch === 8 - (i + 1) && f.seq + f.ch === 8);
  }));
  check('the 91 windows: what a queue of capacity M keeps and loses after n beats, and the slots adding to 8', !badFifo.length, JSON.stringify(badFifo.slice(0, 2)));
  const badLoad = core.load.flatMap((row, e) => row.filter((l, i) => {
    const k = [0, 12, 15, 20, 30, 40][i],
      eta = fracN(BigInt(e), 20n),
      c = circleN(fracN(BigInt(k), 60n)).cos,
      sq = mulN(subN(ONE, eta), mulN(c, c)),
      root = rootN(sq);
    return !(eqN(readN(l.eta), eta) && eqN(readN(l.keep), subN(ONE, eta)) && eqN(readN(l.clock2), sq) && (root ? eqN(readN(l.clock), root) : l.clock.q === null && near(l.clock.x, Math.sqrt(numN(sq)), 1e-12)) && near(l.theta, Math.asin(Math.sqrt(e / 20)), 1e-12));
  }));
  check('the horizon load: η = e/20, 1 − η, and the composite clock √((1 − η) κ_time), exact only where it is a rational square', !badLoad.length, JSON.stringify(badLoad.slice(0, 2)));
}

/* ---------- the page as it opens ---------- */
{
  const p = await T.open(BOOK, ID, '?lang=zh', { reducedMotion: 'reduce' });
  await settle(p);
  const s = await state(p);
  check('the split card opens by default, parked on u = 1/3, [3:4], with 16/25 inside and 9/25 outside', s.preset === DEFAULT && s.scene === 'split' && s.clock === 20 && !s.playing && eqN(readN(s.split.kt), [16n, 25n]) && eqN(readN(s.split.ks), [9n, 25n]) && same(s.split.slope, [3, 4]));
  const sub = await textOf('hudSub', p);
  check('as it opens the HUD prints 16/25 = 0.6400 and 9/25 = 0.3600 and their sum', sub.includes('16/25 = 0.6400') && sub.includes('9/25 = 0.3600') && sub.includes('[3:4]'), sub);
  await p.context().close();
}
check(
  'three-column lab shell: deck, stage, strips outside the stage, evidence with the theory button first',
  await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    return (
      !!q('.app.lab > header.top .status #scenePill') &&
      !!q('#rail #lensPanel .lens-toggle#lensToggleBtn') &&
      !!q('#rail #presets') &&
      !!q('#rail #camChips') &&
      !!q('main.center > #stage > #hudTl #hudBig') &&
      !!q('#stage > .hud-tr #stageAct') &&
      !!q('#stage > button.handle#stageHandle') &&
      !!q('main.center > #tour #tourBody') &&
      !!q('main.center > #tour #lensMirror') &&
      !!q('main.center > .strip #plot') &&
      !!q('main.center > .strip #plotB') &&
      !q('#stage .strip') &&
      !q('#stage canvas#plot') &&
      q('aside.col.side#evidence').firstElementChild.id === 'infoBtn' &&
      ['#slopeChips', '#uRange', '#loadBtn', '#etaRange', '#mRange', '#sigmaRange', '#kRange'].every((s) => !!q('#evidence > #ctlPanel ' + s)) &&
      !!q('#evidence > #readouts') &&
      !!q('#evidence > #basis') &&
      !!q('footer.rail .clock #now') &&
      document.body.dataset.vizId === 'spacetime-memory-schur-split-sandbox' &&
      q('.app.lab').id === 'app' &&
      document.querySelectorAll('[id]').length === new Set([...document.querySelectorAll('[id]')].map((e) => e.id)).size
    );
  })
);
check(
  'the crumb, the logo, the lenses and the five cards carry the words of the brief',
  await page.evaluate(() => {
    const t = (s) => document.querySelector(s).textContent;
    const seg = (c, l) => t(`#lensToggleBtn .seg.${c} .${l}`);
    const codes = [...document.querySelectorAll('#presets .preset .code')].map((e) => e.textContent);
    return (
      t('.crumb .zh') === '◂ 第 38 章 · §38.12' &&
      t('.crumb .en') === '◂ Ch. 38 · §38.12' &&
      document.querySelector('.logo').dataset.text === 'OMEGA//SPACETIME' &&
      seg('off', 'zh') === '无标签圆弧本体与有理舒尔勾股账本 · κ_mem + (1 − κ_mem) ≡ 1' &&
      seg('off', 'en') === 'Unlabeled Arc Ontology & Rational Schur Pythagoras · κ_mem + (1 − κ_mem) ≡ 1' &&
      seg('on', 'zh') === '观察者记忆主观分类与闵可夫斯基减号读法（MODEL）· Δτ² = Δt² − Δx²' &&
      seg('on', 'en') === 'Observer Memory Classification & Minkowski Minus Reading (MODEL) · Δτ² = Δt² − Δx²' &&
      document.querySelector('#lensPanel .aside').textContent === '§38.12' &&
      JSON.stringify(codes) === JSON.stringify(['Γ ⊂ 𝕋₃ · PW + PW⊥ ≡ I', 'Δτ² + Δx² ≡ Δt² ↦ Δτ² = Δt² − Δx²', 'M = 0 · 1 ≤ M < MΩ · M = MΩ', 'WA ↔ R(σAB) WB', 'FIFO M · KV-Cache ↔ (𝕋₃)K']) &&
      JSON.stringify([...document.querySelectorAll('#presets .cn.zh')].map((e) => e.textContent)) === JSON.stringify(['无标签圆弧与记忆窗舒尔二分', '勾股正定账本移项生闵氏减号', '记忆容量三态相变与静质量税', '双观察者旋子错位与同时性相对性', '遗忘生空与序列时间↔通道空间互换']) &&
      JSON.stringify([...document.querySelectorAll('#presets .cn.en')].map((e) => e.textContent)) === JSON.stringify(['Unlabeled arc & memory Schur split', 'Pythagorean budget transposed to −', 'Three memory regimes & rest-mass tax', 'Dual memory frames & simultaneity', 'Forgetting makes space & KV-Cache swap']) &&
      JSON.stringify([...document.querySelectorAll('#slopeChips [data-slope]')].map((b) => b.dataset.slope)) === JSON.stringify(['0:1', '3:4', '5:12', '8:15', '1:0'])
    );
  })
);
{
  const links = await page.evaluate(() => [...document.querySelectorAll('#drawer .refs a')].map((a) => [a.getAttribute('href'), a.textContent]));
  check(
    'the drawer links the chapter section in both languages',
    same(links, [
      ['../../zh/' + THEORY, '第 38 章 §38.12 时空运动的本体等效与观察者记忆舒尔补强行分类'],
      ['../../en/' + THEORY, 'Chapter 38 §38.12 Ontological Equivalence of Spatial and Temporal Motion and Observer-Memory Schur Classification']
    ]),
    JSON.stringify(links)
  );
  const gids = await page.locator('#basis a[data-lean-gid]').evaluateAll((els) => els.map((el) => el.dataset.leanGid));
  check('the sixteen Lean links of the evidence panel, in order, and the drawer repeats all twenty boxes', same(gids, GIDS) && (await page.locator('#drawerEvidence .lean').count()) === 20);
}

/* ---------- the NUM box and the drawer as rendered: every number against a value computed here ---------- */
{
  // what the box must say, computed here with the same sample sizes
  let contexts = 0;
  for (const x of range(9)) for (const y of range(9)) for (const z of range(9)) if ((x - 4) ** 2 + (y - 4) ** 2 + (z - 4) ** 2 <= 16) contexts++;
  const overlaps = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [-4, 3, 5], [0, 1, 1], [-1, 0, 1], [1, 0, 1]].map(([a, b, c]) => [fracN(BigInt(a), BigInt(c)), fracN(BigInt(b), BigInt(c))]);
  const written = [...overlaps, [[3n, 5n], ZERO]].reduce(cmulN, [[1n, 2n], ZERO]),
    undone = overlaps.reduce((v, o) => cmulN(v, conjN(o)), written);
  // the Krylov tower of the shift, by ranks over the rationals written here
  const Tm = [[0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0], [0, 0, 0, 1]];
  const rank = (rows) => {
    const M = rows.map((r) => r.map((x) => intN(x)));
    let rk = 0;
    for (let c = 0; c < 4; c++) {
      const piv = M.findIndex((r, i) => i >= rk && r[c][0] !== 0n);
      if (piv < 0) continue;
      [M[rk], M[piv]] = [M[piv], M[rk]];
      for (let i = 0; i < M.length; i++) if (i !== rk && M[i][c][0] !== 0n) M[i] = M[i].map((x, j) => subN(x, mulN(divN(M[i][c], M[rk][c]), M[rk][j])));
      rk++;
    }
    return rk;
  };
  const tower = [];
  let v = [1, 0, 0, 1],
    gen = [v];
  for (let k = 0; k <= 8; k++) {
    tower.push(rank(gen));
    v = range(4).map((j) => range(4).reduce((s, i) => s + Tm[i][j] * v[i], 0));
    gen = [...gen, v];
  }
  const stableAt = tower.findIndex((d, k) => d === tower[k + 1]);
  const box = await page.evaluate(() => Object.fromEntries(['zh', 'en'].map((l) => [l, document.querySelector('#basis .lean.num .' + l).textContent.replace(/\s+/g, ' ')])));
  const copy = await page.evaluate(() => Object.fromEntries(['zh', 'en'].map((l) => [l, document.querySelector('#drawerEvidence .lean.num .' + l).textContent.replace(/\s+/g, ' ')])));
  const phrases = {
    zh: ['u 的 61 站中有理点 61 个', '[0:1]、[3:4]、[5:12]、[8:15]、[1:0] 各落在它的一站', '60 站上 cosh² r − sinh² r = 1', 'ℝ × ℝ¹ 上 343 个整系数二次型有 7 个', 'ℝ × ℝ² 上 729 个中有 3 个在 24 个有理零向量上为 0', '124 条整数直线', '6561 个高斯整数矩阵', `${contexts} 个有理布洛赫向量`, '168 个二次型在 97 个 y 上', '有理单位四元数 5 个', '225 对等间距读数', '125 个三元组', '十二拍 b = (99 + 20i)/101', '八个权重之和 1', 'σ 的 61 站', '91 种容量与拍数', '8 份记录，其中 7 份重叠的模为 1、一份为 3/5', `经通道成 ${cstr(written)}`, `逆转那 7 份后为 ${cstr(undone)}，不回到 1/2`, `克雷洛夫塔的维数 ${tower.join('、')}，在 m = ${stableAt} 处第一次不再增长`, 'fsAngle/(π/4) = 1.0000', '不检验定理的前提', '数值演示，不是证明。'],
    en: ['of the 61 stops of u, 61 are rational points', 'the slope buttons [0:1], [3:4], [5:12], [8:15], [1:0] each land on their stop', 'on 60 stops cosh² r − sinh² r = 1', 'of 343 integer quadratic forms on ℝ × ℝ¹, 7 vanish', 'of 729 on ℝ × ℝ², 3 vanish on 24 rational null vectors', 'on 124 integer lines', 'on 6561 Gaussian integer matrices', `on ${contexts} rational Bloch vectors`, 'for 168 quadratic forms the least value over 97 values of y', '5 rational unit quaternions', '225 equally spaced readings', 'the group on 125 triples', 'Twelve beats b = (99 + 20i)/101', 'The eight weights add to 1', 'at the 61 stops of σ', 'for 91 capacities and beats', '8 records, 7 with overlaps of modulus 1 and one of 3/5', `becomes ${cstr(written)} through the channel`, `and ${cstr(undone)} after the 7 are reversed, not 1/2 again`, `The Krylov tower has dimensions ${tower.join(', ')}, first stops growing at m = ${stableAt}`, 'fsAngle/(π/4) = 1.0000', 'it does not check their hypotheses', 'A numerical illustration, not a proof.']
  };
  for (const lang of ['zh', 'en']) {
    const missing = phrases[lang].filter((x) => !box[lang].includes(x)),
      failures = lang === 'zh' ? box[lang].match(/不符 (\d+) 处/g) || [] : box[lang].match(/(\d+) failures/g) || [];
    check(`NUM (${lang}): the box states the computed instances, every check with 0 failures, and its copy in the drawer is the same`, !missing.length && failures.length >= 20 && failures.every((x) => /\b0\b|不符 0 处/.test(x)) && box[lang] === copy[lang] && !mixed(box[lang]).length && !/undefined|NaN|Infinity|\[object/.test(box[lang]), JSON.stringify([missing, failures.filter((x) => !/\b0\b|不符 0 处/.test(x))]));
  }
  const spans = await page.evaluate(() => Object.fromEntries(['zh', 'en'].map((l) => [l, [...document.querySelectorAll(`#drawer .sheet > .${l} [data-bench]`)].map((e) => [e.dataset.bench, e.textContent])])));
  const want = [['kTime', relFraction([16n, 25n])], ['kSpace', relFraction([9n, 25n])], ['cosh', relFraction([5n, 3n])], ['sinh', relFraction([4n, 3n])], ['hyp', relFraction(ONE)], ['regime', relFraction(insideN(4))], ['dualB', relFraction(ONE)], ['kept', String(fifoN(12, 4).kept)], ['lost', String(fifoN(12, 4).lost)]];
  check('the drawer prints 16/25 = 0.6400, 9/25 = 0.3600, 5/3 ≈ 1.6667, 4/3 ≈ 1.3333, 13/18 ≈ 0.7222, the kept 4 and the forgotten 8', same(spans.zh, want) && same(spans.en, want) && want[0][1] === '= 0.6400' && want[5][1] === '≈ 0.7222', JSON.stringify(spans.zh));
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
for (const [what, patches, reads] of [
  ['weights over 35 instead of 36', [['const WEIGHTS = range(MODES).map((i) => frac(BigInt(MODES - i), 36n));', 'const WEIGHTS = range(MODES).map((i) => frac(BigInt(MODES - i), 35n));']], (t) => t.box.includes('八个权重之和 36/35') && /M\(17 − M\)\/72 不符 [1-9]\d* 处/.test(t.box)],
  ['a sine off by one in its numerator', [['        b = 2n * G * K,', '        b = 2n * G * K + 1n,']], (t) => /cos²φ \+ sin²φ = 1 不符 [1-9]\d* 处/.test(t.box) && !t.sub.includes('9/25 = 0.3600')],
  ['a window that never forgets', [['lost: Math.max(0, n - M),', 'lost: 0,']], (t) => /槽位和为 8 不符 [1-9]\d* 处/.test(t.box)]
]) {
  const p = await patched(patches);
  const t = await p.evaluate(() => ({ box: document.querySelector('#basis .lean.num .zh').textContent.replace(/\s+/g, ' '), sub: document.querySelector('#hudSub').textContent }));
  check(`NUM: with ${what} in the script the box says so (the box is computed, not written)`, once(patches) && reads(t), JSON.stringify([once(patches), t.box.slice(0, 600)]));
  await p.context().close();
}

/* ---------- the five cards in both languages ---------- */
function expectedReadouts(m) {
  const sp = m.scene === 'minus' ? m.minus : m.split,
    u = readN(sp.u),
    k = Math.round(sp.k),
    pt = circleN(u),
    mi = circleN(readN(m.minus.u)),
    cosh = divN(ONE, mi.cos),
    sinh = divN(mi.sin, mi.cos),
    M = m.regimes.M,
    kt = insideN(M),
    sigma = readN(m.dual.sigma),
    R = adN([ONE, sigma, ZERO, ZERO]),
    f = fifoN(m.forget.n, m.kseq),
    eta = fracN(BigInt(m.eta), 20n),
    sq = mulN(subN(ONE, eta), mulN(mi.cos, mi.cos)),
    root = rootN(sq),
    slope = slopeN(pt.cos, pt.sin),
    deg = (Math.acos(numN(R[1][1])) * 180) / Math.PI,
    zh = m.lang === 'zh';
  const clock = root ? relFraction(root) : `≈ ${Math.sqrt(numN(sq)).toFixed(4)}`;
  return {
    roPair: `${strN(u)} · [${slope[0]}:${slope[1]}] · ${strN(pt.cos)} · ${strN(pt.sin)}`,
    roMink: `${strN(cosh)} · ${strN(sinh)} · ${bothN(ONE)}`,
    roLoad: `${strN(eta)} · ${strN(subN(ONE, eta))} · √(${strN(sq)}) ${clock}${m.load.on ? '' : zh ? '（负载仪关）' : ' (gauge off)'}`,
    roRegime: `${M} · ${bothN(kt)} · ${bothN(subN(ONE, kt))}`,
    roRotor: `${strN(sigma)} · ${Math.abs(deg - Math.round(deg)) < 1e-9 ? Math.round(deg) + '°' : '≈ ' + deg.toFixed(2) + '°'} · 0 ↔ ${strN(mulN(R[2][1], R[2][1]))}`,
    roFifo: `${m.forget.n} · ${f.kept} · ${f.lost} · ${m.kseq} + ${8 - m.kseq} = 8`,
    uOut: `= ${strN(fracN(BigInt(Math.round(m.at.split)), 60n))}`,
    mOut: `= ${Math.round(m.at.regimes)}`,
    sigmaOut: `= ${strN(fracN(BigInt(Math.round(m.at.dual)), 60n))}`,
    kOut: `= ${m.kseq}`,
    etaOut: `= ${strN(eta)}`,
    _k: k
  };
}
async function verifyReadouts(p, label) {
  const m = { ...(await state(p)), lang: await p.evaluate(() => document.documentElement.dataset.lang) },
    want = expectedReadouts(m),
    got = {};
  for (const k of Object.keys(want).filter((x) => !x.startsWith('_'))) got[k] = await textOf(k, p);
  const diff = Object.keys(got).filter((k) => got[k] !== want[k]);
  check(label + ' the readouts and the outputs of the dials are the numbers computed here, exact after “=”, rounded after “≈”', !diff.length, JSON.stringify(diff.map((k) => [k, got[k], want[k]])));
}
async function auditRelations(p, label) {
  const texts = await liveTexts(p),
    bad = texts.flatMap(fractionRelations),
    chained = texts.flatMap(mixed);
  check(label + ' every printed fraction and its decimal: “=” only for the value itself, “≈” for a rounding; no rounded digits beside an inequality', !bad.length && !chained.length, JSON.stringify([bad.slice(0, 3), chained.slice(0, 3)]));
}
for (const lang of ['zh', 'en']) {
  await setLang(lang);
  for (const id of IDS) {
    check(lang + '/' + id + ' plays up to its still and parks', await pick(id));
    const m = await state(),
      c = CARDS[id],
      zh = lang === 'zh';
    check(lang + '/' + id + ' scene, view, rail, regime and the fresh dials', m.preset === id && m.scene === c.scene && m.cam === c.cam && m.max === c.max && m.regime === c.regime && m.eta === 10 && m.kseq === 4 && m.load.on === (id === MINUS), JSON.stringify([m.scene, m.cam, m.max, m.regime, m.load.on]));
    await verifyReadouts(page, lang + '/' + id);
    await auditRelations(page, lang + '/' + id);
    await layout(page, lang + '/' + id);
    const sub = await textOf('hudSub'),
      big = await textOf('hudBig'),
      key = await textOf('roKey');
    const want = {
      split: [['[3:4]'], ['4/5', '3/5', '16/25 = 0.6400', '9/25 = 0.3600', '= 1.0000'], '16/25 + 9/25 = 1'],
      minus: [['Δτ² = 9/25'], ['u = 1/2', '1 − 16/25 = 9/25', zh ? '合成钟速 ≈ 0.4243' : 'composite clock ≈ 0.4243'], '9/25 = 1 − 16/25'],
      regimes: [['M = 4/8'], ['13/18 ≈ 0.7222', '5/18 ≈ 0.2778'], '13/18 + 5/18 = 1'],
      dual: [['σ = 1'], ['σ = 1', '90°', '1 = 1.0000'], 'A 0 + 1 = 1 · B 1 + 0 = 1'],
      forget: [['n = 12'], [zh ? '第 12 拍' : 'beat 12', '4 + 8 = 12'], '4 + 8 = 12 · 4 + 4 = 8']
    }[m.scene];
    check(lang + '/' + id + ' the HUD title, its line and the key readout state the card', want[0].every((x) => big.includes(x)) && want[1].every((x) => sub.includes(x)) && key === want[2], JSON.stringify([big, sub, key]));
    const legend = await textOf('legend');
    check(lang + '/' + id + ' the legend names violet, cyan, magenta and the amber handle', (await page.locator('#legend .sw').evaluateAll((els) => els.map((e) => e.className.replace('sw ', '')))).join(' ') === 'vi cy mg am' && legend.length > 10);
    const readings = await page.locator('#readouts output').allTextContents();
    check(lang + '/' + id + ' one key and six readouts, all populated', readings.length === 7 && readings.every((x) => x && !/NaN|undefined|∞|^—$/.test(x)), JSON.stringify(readings));
    const px = await solidPixels(page);
    check(lang + '/' + id + ' the violet ball: opaque over ≥ 12% of the stage, shaded', px.share >= 0.12 && px.spread >= 0.04, JSON.stringify([px.share, px.spread]));
  }
}
check('the declared stills are written on the cards', same(await page.$$eval('#presets [data-preset]', (els) => els.map((e) => Number(e.dataset.still))), IDS.map((id) => CARDS[id].still)));

/* ---------- the lens: names and weights change, the state stays ---------- */
await setLang('zh');
for (const id of IDS) {
  await pick(id);
  if (id === FORGET) await input('#kRange', 3);
  if (id === MINUS) await input('#etaRange', 14);
  const before = await state(),
    big0 = await textOf('hudBig'),
    legend0 = await textOf('legend');
  await setLens(1);
  const after = await state(),
    big1 = await textOf('hudBig'),
    legend1 = await textOf('legend');
  check(`${id}: the observer lens keeps every parameter and the clock`, after.lens === 1 && same(after.at, before.at) && after.scene === before.scene && after.eta === before.eta && after.kseq === before.kseq && same(after.load, before.load) && after.clock === before.clock && same(after.camera, before.camera), JSON.stringify([before.at, after.at]));
  check(`${id}: the observer lens renames the picture (MODEL) and the mirror button follows`, big0 !== big1 && /MODEL/.test(big1) && !/MODEL/.test(big0) && (await page.locator('#lensMirror').getAttribute('aria-pressed')) === 'true' && (id === DUAL || id === REGIMES ? true : legend0 !== legend1), JSON.stringify([big0, big1]));
  await verifyReadouts(page, `${id} (observer lens)`);
  await auditRelations(page, `${id} (observer lens)`);
  await setLens(0);
  check(`${id}: back to the ontology lens, the same state`, same((await state()).at, before.at) && (await textOf('hudBig')) === big0);
}
{
  await pick(SPLIT);
  await setLens(1);
  const tags = (await tagText()).join(' | ');
  check('the observer lens labels the legs Δτ and Δx only, as readings of the window; no axis of time or space is drawn on the sphere', /Δτ = 4\/5/.test(tags) && /Δx = 3\/5/.test(tags) && !/时间轴|空间轴|time axis|space axis/i.test(tags), tags);
  await setLens(0);
  const tags0 = (await tagText()).join(' | ');
  check('the ontology lens labels inside and outside of the window, without time or space', /P\s*W\s*d\s*=\s*4\/5/.test(tags0) && !/Δτ|Δx|时间|空间|\btime\b|\bspace\b/i.test(tags0), tags0);
}

/* ---------- the dials ---------- */
await setLang('en');
for (const [chip, k, slope] of [
  ['0:1', 0, [0, 1]],
  ['5:12', 12, [5, 12]],
  ['8:15', 15, [8, 15]],
  ['1:0', 60, [1, 0]],
  ['3:4', 20, [3, 4]]
]) {
  await press(`#slopeChips [data-slope="${chip}"]`);
  const m = await state();
  check(`slope chip [${chip}] shows the split card at u = ${k}/60 and lights its chip`, m.scene === 'split' && m.clock === k && same(m.split.slope, slope) && m.preset === null && (await page.locator(`#slopeChips [data-slope="${chip}"]`).getAttribute('aria-pressed')) === 'true');
  await verifyReadouts(page, `slope ${chip}`);
  await auditRelations(page, `slope ${chip}`);
  await layout(page, `slope ${chip}`);
}
for (const [sel, v, check1] of [
  ['#uRange', 36, (m) => m.scene === 'split' && m.clock === 36 && same(m.split.slope, [15, 8])],
  ['#etaRange', 20, (m) => m.scene === 'minus' && m.eta === 20 && m.load && m.load.on === true],
  ['#mRange', 0, (m) => m.scene === 'regimes' && m.clock === 0 && m.regimes.regime === 'photon'],
  ['#mRange', 8, (m) => m.scene === 'regimes' && m.clock === 8 && m.regimes.regime === 'whole'],
  ['#sigmaRange', 30, (m) => m.scene === 'dual' && m.clock === 30 && eqN(readN(m.dual.bTime), [16n, 25n])],
  ['#kRange', 7, (m) => m.scene === 'forget' && m.kseq === 7 && m.forget.ch === 1]
]) {
  await input(sel, v);
  const m = await state();
  check(`${sel} = ${v} steers its card`, check1(m) && m.preset === null, JSON.stringify([m.scene, m.clock, m.eta, m.kseq]));
  await verifyReadouts(page, `${sel} = ${v}`);
  await auditRelations(page, `${sel} = ${v}`);
}
{
  await pick(MINUS);
  const on = (await state()).load.on;
  await press('#loadBtn');
  const off = await state();
  check('the load button switches the horizon gauge of the minus card off and on, and the readout says so', on === true && off.load.on === false && off.scene === 'minus' && /gauge off/.test(await textOf('roLoad')));
  await press('#loadBtn');
  check('… and on again', (await state()).load.on === true && !/gauge off/.test(await textOf('roLoad')));
  await input('#etaRange', 10);
  const m = await state();
  check('η = 1/2 is the crossover: the archive keeps 1/2 inside and turns 45°', eqN(readN(m.load.keep), [1n, 2n]) && near(m.load.theta, Math.PI / 4, 1e-12));
  await input('#etaRange', 20);
  check('η → 1 turns the archive all the way, 90°, out of the window', near((await state()).load.theta, Math.PI / 2, 1e-12) && eqN(readN((await state()).load.keep), ZERO));
}
for (const [id, act, wantFn] of [
  [SPLIT, 'next landmark', (a, b) => a.clock === 20 && b.clock === 60],
  [MINUS, 'gauge', (a, b) => a.load.on !== b.load.on],
  [REGIMES, 'capacity', (a, b) => b.clock === (a.clock + 1) % 9],
  [DUAL, 'rotor flip', (a, b) => b.clock === (a.clock === 60 ? 0 : 60)]
]) {
  await pick(id);
  const a = await state();
  await press('#stageAct');
  const b = await state();
  check(`${id}: the stage button (${act}) acts on its card`, b.scene === a.scene && wantFn(a, b), JSON.stringify([a.clock, b.clock, a.load.on, b.load.on]));
}
{
  await pick(FORGET);
  await seek(5);
  const ok = await playsAfter(page, () => page.locator('#stageAct').evaluate((b) => b.click()), () => ({ playing: window.SPACETIME_DEBUG.state.playing, t: window.SPACETIME_DEBUG.state.clock }));
  check('forget: the stage button plays one beat forward', ok && (await until(page, () => { const s = window.SPACETIME_DEBUG.state; return !s.playing && Math.abs(s.clock - 6) < 1e-12; }, null, 60000)));
}
for (const name of ['face', 'under', 'panorama']) {
  await press(`[data-cam="${name}"]`);
  check(`view ${name} turns the camera and keeps the ball opaque`, (await state()).cam === name && (await solidPixels(page)).share >= 0.12);
}

/* ---------- the rails ---------- */
for (const [id, values] of [
  [SPLIT, [0, 12, 15, 20, 36, 60]],
  [MINUS, [0, 20, 30, 40]],
  [REGIMES, [0, 1, 4, 7, 8]],
  [DUAL, [0, 15, 30, 60]],
  [FORGET, [0, 3, 4, 5, 12]]
]) {
  await pick(id);
  for (const t of values) {
    await seek(t);
    const m = await state();
    check(`${id}: rail ${t}`, near(m.clock, t, 1e-12) && !m.playing && m.scene === CARDS[id].scene && near(m.at[m.scene], t, 1e-12));
    await verifyReadouts(page, `${id} rail ${t}`);
    await auditRelations(page, `${id} rail ${t}`);
    const box = await page.locator('#stageHandle').boundingBox(),
      at = await page.evaluate((x) => window.SPACETIME_DEBUG.dragTarget(x), t);
    check(`${id}: the handle sits on the current point at ${t}`, !!box && Math.hypot(box.x + box.width / 2 - at.x, box.y + box.height / 2 - at.y) < 1.5);
  }
}
{
  // a beat half way: the oldest record of the window is turning out, and the counts are those of the last whole beat
  await pick(FORGET);
  await seek(6.5);
  const m = await state();
  check('forget: half way to beat 7 the window keeps 4, has lost 2, and says it is moving', m.forget.n === 6 && near(m.forget.f, 0.5, 1e-9) && m.forget.kept === 4 && m.forget.lost === 2 && m.regime === 'moving');
  const t = await textOf('hudSub');
  check('forget: the moving beat is written “≈”, never “=”', (await textOf('hudBig')).includes('n ≈ 6.50') && /beat 6 going to 7/.test(t), (await textOf('hudBig')) + ' | ' + t);
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
  [SPLIT, 12],
  [MINUS, 20],
  [REGIMES, 2],
  [DUAL, 30],
  [FORGET, 7]
]) {
  await pick(id);
  const before = await state();
  await dragHandle(await page.evaluate((x) => window.SPACETIME_DEBUG.dragTarget(x), t));
  const m = await state();
  check(`${id}: dragging the handle moves the rail to ${t}, leaves the camera alone and unmarks the card`, near(m.clock, t, id === FORGET ? 0.06 : 1e-9) && same(m.camera, before.camera) && m.preset === null && !m.playing, String(m.clock));
}
{
  // every stop of the rotor keeps the header on one line, so a drag never moves the stage under the pointer
  await pick(DUAL);
  const heights = [];
  for (let k = 0; k <= 60; k++) {
    await seek(k);
    heights.push(await page.evaluate(() => Math.round(document.querySelector('header.top').getBoundingClientRect().height)));
  }
  check('dual: the header keeps one height at all 61 stops of σ (long fractions give way to decimals in the pills)', new Set(heights).size === 1, JSON.stringify([...new Set(heights)]));
  for (const t of [10, 31, 45]) {
    await dragHandle(await page.evaluate((x) => window.SPACETIME_DEBUG.dragTarget(x), t));
    check(`dual: a second drag lands on ${t} as well`, (await state()).clock === t, String((await state()).clock));
  }
}
for (const [id, keys] of [
  [SPLIT, [['ArrowRight', 21], ['ArrowLeft', 20], ['Home', 0], ['End', 60]]],
  [REGIMES, [['ArrowLeft', 3], ['Home', 0], ['ArrowUp', 1], ['End', 8]]],
  [DUAL, [['ArrowLeft', 59], ['Home', 0], ['End', 60]]]
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
for (const id of IDS) {
  const at = await playsAfter(page, () => page.locator(`[data-preset="${id}"]`).evaluate((b) => b.click()), () => ({ playing: window.SPACETIME_DEBUG.state.playing, t: window.SPACETIME_DEBUG.state.clock }));
  check(`${id}: a click on the card plays it`, at);
  check(`${id}: it parks on its still`, await until(page, ([c, s]) => { const m = window.SPACETIME_DEBUG.state; return !m.playing && m.preset === c && Math.abs(m.clock - s) < 1e-12; }, [id, CARDS[id].still], 150000));
  await settle(page);
}
check(
  'a card click starts a blend of the layers instead of a hard cut',
  await page.evaluate(() => {
    document.querySelector('[data-preset="dual-observer-simultaneity-rotor-tilt"]').click();
    const s = window.SPACETIME_DEBUG.state;
    return s.blending && s.layers.dual < 1 && s.scene === 'dual';
  })
);
await settle(page);
await until(page, () => !window.SPACETIME_DEBUG.state.blending);
await pause();

/* ---------- colour discipline: red and green never on the stage or in the strips, amber only for the present ---------- */
{
  const p = await T.open(BOOK, ID, '?lang=zh', { reducedMotion: 'reduce' });
  await p.evaluate(() => {
    const seen = (window.__plotColours = new Set());
    for (const prop of ['fillStyle', 'strokeStyle']) {
      const d = Object.getOwnPropertyDescriptor(CanvasRenderingContext2D.prototype, prop);
      Object.defineProperty(CanvasRenderingContext2D.prototype, prop, {
        configurable: true,
        get() {
          return d.get.call(this);
        },
        set(v) {
          d.set.call(this, v);
          if (this.canvas && (this.canvas.id === 'plot' || this.canvas.id === 'plotB')) seen.add(d.get.call(this));
        }
      });
    }
  });
  const used = { prims: [], plots: [] };
  for (const id of IDS) {
    await pick(id, p);
    for (const lens of [0, 1]) {
      await setLens(lens, p);
      const rec = await p.evaluate(() => {
        const sc = window.TRV.solids[0],
          seen = [],
          names = ['surface', 'tube', 'line', 'circle', 'arrow', 'bead', 'ring', 'fan', 'poly', 'glass'],
          saved = {};
        for (const n of names) {
          saved[n] = sc[n];
          sc[n] = (...a) => {
            const style = n === 'circle' || n === 'glass' ? a[3] : n === 'line' || n === 'bead' || n === 'ring' || n === 'fan' ? a[1] : a[2];
            const s = style || {};
            seen.push({ n, key: s.key || (typeof a[0] === 'string' ? a[0] : n), colors: [s.color, s.fill, s.edges, ...(s.colors || [])].filter((c) => typeof c === 'string') });
            return saved[n](...a);
          };
        }
        window.TRV.kit.flush();
        for (const n of names) sc[n] = saved[n];
        return seen;
      });
      used.prims.push(...rec.map((r) => ({ ...r, card: id })));
    }
    await setLens(0, p);
  }
  const P = await p.evaluate(() => {
    const c = document.createElement('canvas').getContext('2d'),
      norm = (x) => {
        c.fillStyle = '#000';
        c.fillStyle = x;
        return c.fillStyle;
      },
      Q = window.TRV.palette;
    return { amber: Q.amber, warn: Q.warn, ok: Q.ok, nwarn: norm(Q.warn), nok: norm(Q.ok), plots: [...window.__plotColours] };
  });
  const red = used.prims.filter((r) => r.colors.some((c) => c === P.warn || c === P.ok));
  check('no red and no green in any primitive of the stage, on any card, in either lens', !red.length, JSON.stringify(red.slice(0, 2)));
  const amber = used.prims.filter((r) => r.colors.includes(P.amber)).map((r) => `${r.n}:${r.key}`);
  check('amber on the stage only for the current point (bead “current”) and its still ring', amber.length > 0 && amber.every((x) => x === 'bead:current' || x === 'ring:halo'), JSON.stringify([...new Set(amber)]));
  check('no red and no green in the strip plots', P.plots.length > 3 && !P.plots.includes(P.nwarn) && !P.plots.includes(P.nok), JSON.stringify(P.plots));
  await p.context().close();
}

/* ---------- the tour note stays within two lines at 305 px, in both languages, on every card and in both lenses ---------- */
for (const lang of ['zh', 'en'])
  for (const [mode, query, height] of [
    ['cited figure', (id) => `?embed=1&lang=${lang}&preset=${id}`, 500],
    ['page', (id) => `?lang=${lang}&preset=${id}`, 760]
  ])
    for (const id of IDS) {
      const p = await T.open(BOOK, ID, query(id), { reducedMotion: 'reduce', viewport: { width: 305, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
      await settle(p);
      if (mode === 'cited figure') check(`cited figure ${lang}/${id} hides #lensMirror`, await p.locator('#lensMirror').isHidden());
      for (const lens of [0, 1]) {
        await setLens(lens, p);
        const r = await p.evaluate(() => {
          const n = document.querySelector('#tourBody .tour-note');
          return n ? { h: n.scrollHeight, box: n.getBoundingClientRect().height, text: n.textContent, shown: n.getClientRects().length > 0 } : null;
        });
        check(`${mode} (${lang}, 305 px) ${id}, lens ${lens}: the note of #tourBody stays within two lines (≤ 34 px)`, !!r && r.shown && r.text.length > 8 && r.h <= 34 && r.box <= 34, JSON.stringify(r));
      }
      await p.context().close();
    }

/* ---------- stills, narrow lens controls and the probe ---------- */
for (const lang of ['zh', 'en'])
  for (const id of IDS) {
    const p = await openStill(T, BOOK, ID, id, lang);
    const m = await state(p);
    check(`still ${lang}/${id} parks on the declared frame, without handle and stage button`, m.preset === id && m.regime === CARDS[id].regime && !m.playing && near(m.clock, CARDS[id].still, 1e-12) && (await p.locator('#stageHandle').isHidden()) && (await p.locator('#stageAct').isHidden()));
    check(`still ${lang}/${id} hides #lensMirror`, await p.locator('#lensMirror').isHidden());
    const t = (await textOf('hudBig', p)) + ' ' + (await textOf('hudSub', p)),
      want = { split: ['[3:4]', '16/25'], minus: ['Δτ² = 9/25'], regimes: ['M = 4/8', '13/18'], dual: ['σ = 1'], forget: ['n = 12', '4 + 8 = 12'] }[m.scene];
    check(`still ${lang}/${id} shows the numbers of its caption`, want.every((x) => t.includes(x)), t);
    const px = await solidPixels(p);
    check(`still ${lang}/${id}: the violet ball is opaque over ≥ 12% of the frame`, px.share >= 0.12, String(px.share));
    const crossed = [...(await stageView(p, '#stage')).hud, ...(await labelOverlaps(p, '.stage .tag', 0)), ...(await capitalGreek(p))];
    check(`still ${lang}/${id}: the title, the legend and the labels keep clear of each other`, !crossed.length, JSON.stringify(crossed));
    if (lang === 'en') {
      const left = await cjkLeftovers(p);
      check(`still en/${id}: no Chinese`, !left.length, left.slice(0, 2).join(' | '));
    }
    await p.context().close();
  }
for (const lang of ['zh', 'en']) {
  for (const [mode, query, width, height] of [
    ['phone', `?lang=${lang}`, 390, 844],
    ['full-lab embed', `?embed=1&lang=${lang}`, 740, 620]
  ]) {
    const page = await T.open(BOOK, ID, query, { viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US', reducedMotion: 'reduce' });
    const label = `${mode} (${lang}, ${width}×${height})`;
    await settle(page);
    if (mode === 'phone') {
      const h = await page.evaluate(() => document.documentElement.scrollHeight);
      check(`${label}: the whole lab stays under 8192 px tall, so that a full-page capture works`, h < 8192, String(h));
    }
    await seek(12, page);
    const before = await state(page);
    const mirror = page.locator('#lensMirror');
    const railSwitch = page.locator('#lensToggleBtn');
    const ariaPressed = () => Promise.all([mirror.getAttribute('aria-pressed'), railSwitch.getAttribute('aria-pressed')]);
    const initialPressed = await ariaPressed();
    check(`${label}: both switches start unpressed in lens 0`, before.lens === 0 && same(initialPressed, ['false', 'false']), JSON.stringify({ lens: before.lens, initialPressed }));
    for (const lens of [1, 0]) {
      const geometry = await page.evaluate(() => {
        window.scrollTo(0, 0);
        const tour = document.querySelector('#tour');
        const mirror = document.querySelector('#lensMirror');
        const stageBottom = document.querySelector('#stage').getBoundingClientRect().bottom;
        const bar = tour.getBoundingClientRect();
        const button = mirror.getBoundingClientRect();
        const overlaps = [...tour.querySelectorAll('button, .what b, .tour-note')]
          .filter((el) => el !== mirror && el.getClientRects().length)
          .filter((el) => {
            const box = el.getBoundingClientRect();
            return button.left < box.right && box.left < button.right && button.top < box.bottom && box.top < button.bottom;
          })
          .map((el) => el.id || el.className || el.tagName);
        const clipped = [tour, mirror].some((el) => el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight);
        const cornersReachable = [button.left + 2, button.right - 2].every((x) =>
          [button.top + 2, button.bottom - 2].every((y) => mirror.contains(document.elementFromPoint(x, y)))
        );
        return { bar: bar.toJSON(), button: button.toJSON(), stageBottom, width: innerWidth, height: innerHeight, overlaps, clipped, cornersReachable };
      });
      const { bar, button } = geometry;
      check(
        `${label}, lens ${1 - lens}: the tour and #lensMirror fit the first screen without clipping or overlap`,
        (await mirror.isVisible()) && bar.top >= geometry.stageBottom && bar.top >= 0 && bar.bottom <= geometry.height && bar.left >= 0 && bar.right <= geometry.width &&
          button.top >= bar.top && button.bottom <= bar.bottom && button.left >= bar.left && button.right <= bar.right &&
          !geometry.clipped && geometry.cornersReachable && geometry.overlaps.length === 0,
        JSON.stringify(geometry)
      );
      await page.click('#lensMirror');
      await settle(page);
      const after = await state(page);
      const switches = await ariaPressed();
      const pressed = String(lens === 1);
      const changed = Object.keys(before).filter((key) => key !== 'lens' && !same(before[key], after[key]));
      check(
        `${label}: clicking #lensMirror switches to lens ${lens}, preserves the experiment and syncs both switches`,
        after.lens === lens && changed.length === 0 && same(switches, [pressed, pressed]),
        JSON.stringify({ lens: after.lens, switches, changed })
      );
    }
    await page.context().close();
  }
}
check(
  'the probe is read-only',
  await page.evaluate(() => {
    const D = window.SPACETIME_DEBUG;
    let threw = false;
    try {
      'use strict';
      D.state = 1;
    } catch (e) {
      threw = true;
    }
    return Object.isFrozen(D) && typeof D.state === 'object' && (threw || D.state !== 1);
  })
);
for (const lang of ['zh', 'en']) {
  colorScheme = 'light';
  const p = await T.open(BOOK, ID, `?lang=${lang}`, { reducedMotion: 'reduce', locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
  await settle(p);
  check(`desktop (${lang}, 1440 px) hides #lensMirror`, (await p.viewportSize()).width > 1080 && (await p.locator('#lensMirror').isHidden()));
  check(`${lang}: no model or tool identifier in the text a reader sees`, await p.evaluate(([words, num]) => !new RegExp(`\\b(?:${words.join('|')}|${num}-?\\d)\\b`, 'i').test(document.body.innerText), [forbidden, numbered]));
  await p.context().close();
  colorScheme = 'dark';
}
check('permanent dark console in both system schemes', !paletteMutations.length && paletteDocuments.every((x) => x.absent) && paletteDocuments.some((x) => x.dark) && paletteDocuments.some((x) => !x.dark));
check('zero console warnings', browserWarnings.length === 0, browserWarnings.slice(0, 3).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('zero browser or request errors', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));
await T.finish();
