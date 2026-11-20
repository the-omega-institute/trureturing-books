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
import { ROOT } from '../../../../tools/node/viz-common.mjs';

const BOOK = 'quantum-geometry';
const ID = 'dyad-relation-future-field-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const THEORY = 'ch39-s28-dyad-relation-future-and-second-order-field.html#sec-ch39-dyad-relation-future-and-second-order-field';
const SECTION = '39.5';
const PI = Math.PI;
const DEG = PI / 180;
const TH_MAX = (2 * PI) / 3;
// scene, view and the two angles of the context relation (degrees); every card plays θ₁ from 0 to its still π/3
const CARDS = {
  'dyad-orthogonal-relation-span': { scene: 'dyad', cam: 'top', thc: 45, psi: 60 },
  'first-order-zeno-vs-transport': { scene: 'zeno', cam: 'face', thc: 45, psi: 90 },
  'second-order-free-heap-geodesic': { scene: 'free', cam: 'face', thc: 0, psi: 90 },
  'curvature-lie-triple-refraction': { scene: 'curve', cam: 'panorama', thc: 45, psi: 90 },
  'bianchi-jacobi-second-order-cap': { scene: 'bianchi', cam: 'panorama', thc: 45, psi: 90 }
};
const STILL = PI / 3;
const DEFAULT = 'curvature-lie-triple-refraction';
const CAM_NAMES = ['panorama', 'face', 'top'];
const CURSOR = /present/;
const GIDS = [
  'D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences',
  'D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum',
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul',
  'D5/S3/Quantum/AURICOmega/UnitQuaternionPolar.exists_eq_cos_arccos_add_sin_smul',
  'D5/S3/Observer/AgencyHolonomy/ActionLoopRequiresMemory.policy_change_implies_memory_change',
  'D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.reflectionSeq_eq_pow',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonReflection.kappa_reflectionSeq_add',
  'D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification',
  'D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy',
  'D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness',
  'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv'
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
const conj = ([w, x, y, z]) => [w, -x, -y, -z];
const qinvM = (a) => scale(conj(a), 1 / dot(a, a));
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
/** A deterministic stream of points on S³ (another generator than the page). */
function* randomUnits(seed, n) {
  let s = seed >>> 0;
  const rand = () => {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return (s / 4294967296) * 2 - 1;
  };
  for (let k = 0; k < n; k++) yield unit([rand(), rand(), rand(), rand()]);
}
/** The beat from scratch: x_t = 1, x_{t−1} = exp(−ω₁), the free step by matrices, the refraction by the series. */
function beat(th1, thc, psi) {
  const om1 = [th1, 0, 0],
    omc = [thc * Math.cos(psi), 0, thc * Math.sin(psi)];
  const omega2 = doubleCross(om1, omc, om1);
  const xNow = [1, 0, 0, 0],
    xPrev = qexpSeries(scale(om1, -1));
  const xFree = qm(qm(xNow, qinvM(xPrev)), xNow);
  const xNext = qm(qm(xFree, qinvM(xNow)), qm(xNow, qexpSeries(omega2)));
  return { om1, omc, omega2, xNow, xPrev, xFree, xNext };
}
/** The same update for any x_{t−1}, x_t and a context relation given at x_t (a vector of the body frame). */
function update(xPrev, xNow, omc) {
  const r = qm(qinvM(xPrev), xNow),
    s = norm(r.slice(1)),
    th = Math.atan2(s, r[0]);
  const om1 = s > 1e-15 ? scale(r.slice(1), th / s) : [0, 0, 0];
  const xFree = qm(qm(xNow, qinvM(xPrev)), xNow);
  return { xFree, xNext: qm(qm(xFree, qinvM(xNow)), qm(xNow, qexpSeries(doubleCross(om1, omc, om1)))) };
}
/* 2 × 2 complex matrices as { re: [[…]], im: [[…]] } */
const M2 = (re, im) => ({ re, im });
const mmul2 = (A, B) =>
  M2(
    [0, 1].map((i) => [0, 1].map((j) => A.re[i][0] * B.re[0][j] - A.im[i][0] * B.im[0][j] + A.re[i][1] * B.re[1][j] - A.im[i][1] * B.im[1][j])),
    [0, 1].map((i) => [0, 1].map((j) => A.re[i][0] * B.im[0][j] + A.im[i][0] * B.re[0][j] + A.re[i][1] * B.im[1][j] + A.im[i][1] * B.re[1][j]))
  );
const madd2 = (A, B, k = 1) => M2(A.re.map((r, i) => r.map((x, j) => x + k * B.re[i][j])), A.im.map((r, i) => r.map((x, j) => x + k * B.im[i][j])));
const mscale2 = (A, k) => M2(A.re.map((r) => r.map((x) => x * k)), A.im.map((r) => r.map((x) => x * k)));
const dagger2 = (A) => M2([0, 1].map((i) => [0, 1].map((j) => A.re[j][i])), [0, 1].map((i) => [0, 1].map((j) => -A.im[j][i])));
const I2 = M2(
  [
    [1, 0],
    [0, 1]
  ],
  [
    [0, 0],
    [0, 0]
  ]
);
const SX = M2(
  [
    [0, 1],
    [1, 0]
  ],
  [
    [0, 0],
    [0, 0]
  ]
);
const SY = M2(
  [
    [0, 0],
    [0, 0]
  ],
  [
    [0, -1],
    [1, 0]
  ]
);
const SZ = M2(
  [
    [1, 0],
    [0, -1]
  ],
  [
    [0, 0],
    [0, 0]
  ]
);
const sigma = (a) => madd2(madd2(mscale2(SX, a[0]), SY, a[1]), SZ, a[2]);
const times_i = (A) => M2(A.im.map((r) => r.map((x) => -x)), A.re);
const mdist = (A, B) => Math.max(...[0, 1].flatMap((i) => [0, 1].map((j) => Math.hypot(A.re[i][j] - B.re[i][j], A.im[i][j] - B.im[i][j]))));
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
  await context.exposeBinding('__dyadPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__dyadPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener(
      'DOMContentLoaded',
      () =>
        window
          .__dyadPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined, dark: matchMedia('(prefers-color-scheme: dark)').matches })
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
await stageFirstChecks(T, BOOK, ID, { solid: true });

/* ---------- sources, registry and dependencies ---------- */
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
// Hangul syllables and jamo, by code point range
const hangul = new RegExp('[' + [[0x1100, 0x11ff], [0x3130, 0x318f], [0xac00, 0xd7af]].map(([a, b]) => String.fromCharCode(a) + '-' + String.fromCharCode(b)).join('') + ']');
const literalColour = /#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i;
for (const [file, src] of Object.entries(sources)) {
  check(`source ${file}: no literal colour and no palette switch`, !literalColour.test(src) && !/\btrPalette\b|data-tr-palette|[?&]theme=/.test(src));
  check(`source ${file}: no model, vendor or tool identifiers and no Hangul`, !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src) && !hangul.test(src));
  check(`source ${file}: no possessive ’s (the runtime splits it)`, !/[’']s\b/.test(src.replace(/it's|it’s/gi, '')));
}
check('reserved identifiers are absent from the suite and registry entry', [suite, entryText].every((src) => !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src) && !hangul.test(src)));
check(
  'registration: §39.5, live, five cards and the thirteen GIDs in order',
  !!entry &&
    entry.chapter === 39 &&
    entry.section === SECTION &&
    entry.status === 'live' &&
    entry.added === '2026-11-20' &&
    entry.code === 'OMEGA//RELATIONS' &&
    entry.title === '二元·关系·未来：三元数场两阶关系因果推演沙盘' &&
    entry.title_en === 'Dyad · Relation · Future: Two-Order Relational Field Sandbox' &&
    same(entry.presets, Object.keys(CARDS)) &&
    same(Object.keys(entry.preset_titles), Object.keys(CARDS)) &&
    same(entry.lean.map((x) => x.gid), GIDS) &&
    entry.theory[0].href === '../zh/' + THEORY &&
    entry.theory[0].href_en === '../en/' + THEORY
);
check(
  'registration: the card titles of the registry are the card names of the page',
  !!entry &&
    Object.keys(CARDS).every((id) => {
      const button = new RegExp(`data-preset="${id}"[^>]*>.*?<span class="cn zh">([^<]*)</span><span class="cn en">([^<]*)</span>`).exec(sources['index.html']);
      return !!button && entry.preset_titles[id].zh === button[1] && entry.preset_titles[id].en === button[2];
    })
);
// Q03: Jacobi annihilates the cyclic sum and Bianchi the alternating sum; single double brackets do not vanish, and the toy
// L = q̈²/2 is a higher-derivative Lagrangian with a fourth-order equation of motion
const overclaims = ['三阶恒为零', '三阶的东西', '几何的三阶', '三阶奥斯特罗格拉茨基', '三阶 H', 'third order vanishes', 'of third order is zero', 'Third order brings', 'geometric third order', 'third-order Ostrogradsky', 'third order H', 'A dynamical third order'];
check(
  'no third-order overclaim: the page and the registry name the cyclic Jacobi sum, the alternating Bianchi sum and the 4th-order toy',
  [...Object.values(sources), entryText].every((src) => overclaims.every((w) => !src.includes(w))) &&
    ['雅可比轮换和', 'cyclic Jacobi', '高阶导数（四阶方程）', 'higher-derivative (4th-order EOM)', 'Q₂ = 1', 'P₂ = 0'].every((w) => sources['main.js'].includes(w) || sources['index.html'].includes(w)) &&
    entry.preset_titles['bianchi-jacobi-second-order-cap'].zh === '二阶选型（MODEL）：雅可比轮换和与四面体面相位上边缘 δF 为零' &&
    entry.preset_titles['bianchi-jacobi-second-order-cap'].en === 'Second-order choice (MODEL): cyclic Jacobi sum and tetrahedral coboundary δF vanish' &&
    entry.summary.includes('雅可比轮换和') &&
    entry.summary_en.includes('cyclic Jacobi sum')
);
// Q2: the measured number is the simplicial coboundary δF of the face phases; d_A F = 0 is the continuum identity of the
// literature, and no label may present the measured number as DF
check(
  'the measured cap is the simplicial coboundary δF: no DF label in the page or the registry, d_A F = 0 stays in the ARGUED box',
  [...Object.values(sources), entryText].every((src) => !/\bDF\b/.test(src)) &&
    ['δF = 0', 'δF=0', 'δF'].every((w) => sources['index.html'].includes(w)) &&
    sources['main.js'].includes("'δF = '") &&
    entry.preset_titles['bianchi-jacobi-second-order-cap'].zh.includes('δF') &&
    entry.preset_titles['bianchi-jacobi-second-order-cap'].en.includes('δF') &&
    entry.summary.includes('δF = 0') &&
    entry.summary_en.includes('δF = 0') &&
    /class="lean argued"[^]*?d<sub>A<\/sub>F = 0/.test(sources['index.html'])
);
// Q9-2: stopping at second order is a choice of the model: the description, the card, the drawer and the stage title say
// MODEL, and the gauge-lens title names δF the simplicial coboundary; no page text calls second order the cap
check(
  'the second-order card is named a MODEL choice in the description, the card, the drawer and the stage titles',
  ['二阶选型（MODEL）：雅可比三项', 'Second-order choice (MODEL): the cyclic sum', '<b>二阶选型（MODEL）。</b>', '<b>Second-order choice (MODEL).</b>'].every((w) => sources['index.html'].includes(w)) &&
    sources['main.js'].includes("bianchi: [['二阶选型（MODEL）', 'SECOND-ORDER CHOICE (MODEL)'], ['单纯上边缘', 'SIMPLICIAL COBOUNDARY']]") &&
    [...Object.values(sources), entryText].every((src) => !/二阶封顶|second[- ]order (?:is the )?cap\b|BIANCHI CLOSURE|比安基闭合/i.test(src))
);
check(
  'the first-order card title sets no 60° threshold',
  !!entry && entry.preset_titles['first-order-zeno-vs-transport'].zh === '一阶：θ₁ = 0 冻住，拉开至 60° 起步' && !sources['index.html'].includes('θ₁ = 60° 才走') && !entryText.includes('才走')
);
check('the gauge lens names the ball the gauge group in both languages', sources['main.js'].includes("L('规范群 SU(2)', 'gauge group SU(2)')") && !sources['main.js'].includes('联络空间'));
const depList = deps.suites[ID + '.test.mjs'] || [];
check(
  'dependencies: the suite is registered with citations, registry entry, Lean links and the solid runtime',
  ['@citations', '@registry-entry', '@lean-links', 'books/quantum-geometry/book.toml', 'theme/viz/solid-core.js', 'theme/viz/vendor/three.module.min.js', 'tools/tbook/viz.py'].every((d) => depList.includes(d)) &&
    !depList.some((d) => d.endsWith('.md'))
);
check('the suite reads no chapter text', !/readFileSync\([^)]*\.md/.test(suite));

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.DYAD_RELATION_DEBUG.state);
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
      const s = window.DYAD_RELATION_DEBUG.state;
      return s.preset === id && !s.blending && !s.playing && Math.abs(s.th1 - still) < 1e-12;
    },
    [card, STILL],
    // the clock advances at most 0.1 s per frame: with VIZ_SLOW_FRAMES=1000 the 3 s sweep to 60° takes ~30 frames
    150000
  );
  if (!parked) await pause(p);
  // the probe computes live; the readouts are written on the next frame
  await settle(p);
  return parked;
}
async function seek(t, p = page) {
  await p.locator('#now').evaluate((el, v) => {
    el.value = String(v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, t);
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
        const style = n === 'circle' || n === 'glass' ? a[3] : n === 'line' || n === 'arrow' || n === 'bead' || n === 'ring' || n === 'fan' ? a[n === 'arrow' ? 2 : 1] : a[2];
        const key = n === 'surface' || n === 'tube' || n === 'poly' || n === 'glass' ? a[0] : (style && style.key) || n;
        const s = style || {};
        seen.push({ n, key: String(key), colors: [s.color, s.fill, s.edges, ...(s.colors || [])].filter(Boolean) });
        return saved[n](...a);
      };
    }
    window.TRV.kit.flush();
    for (const n of names) sc[n] = saved[n];
    const P = window.TRV.palette;
    return { seen, amber: P.amber, ok: P.ok, warn: P.warn };
  });
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
    for (const el of document.querySelectorAll('#stage *, .strip *, #readouts *, .field output')) {
      if (el.closest('.handle') || el.matches('.hud-bl .sw.am')) continue; // the handle, and the legend key of the present
      const cs = getComputedStyle(el);
      for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderLeftColor']) if (banned.includes(cs[prop])) bad.push(`${el.id || el.className || el.tagName} ${prop}`);
    }
    const channels = (c) => {
      const alpha = (a, pct) => (a == null ? 1 : Number(a) / (pct ? 100 : 1));
      let m = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.]+)(%?))?\s*\)$/.exec(c);
      if (m) return { rgb: [m[1], m[2], m[3]].map(Number), a: alpha(m[4], m[5]) };
      m = /^color\(srgb\s+([-\d.e]+)\s+([-\d.e]+)\s+([-\d.e]+)(?:\s*\/\s*([\d.]+)(%?))?\s*\)$/.exec(c);
      if (m) return { rgb: [m[1], m[2], m[3]].map((x) => 255 * Number(x)), a: alpha(m[4], m[5]) };
      return null;
    };
    const amber = channels(col('--amber'));
    const ev = document.querySelector('#basis');
    for (const el of [ev, ...ev.querySelectorAll('*')]) {
      const cs = getComputedStyle(el);
      for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'outlineColor', 'textDecorationColor']) {
        const k = channels(cs[prop]);
        if (!k) bad.push(`#basis ${el.className || el.tagName} ${prop} unreadable: ${cs[prop]}`);
        else if (k.a > 0 && amber && k.rgb.every((x, i) => Math.abs(x - amber.rgb[i]) < 1.5)) bad.push(`#basis ${el.className || el.tagName} ${prop} ${cs[prop]}`);
      }
    }
    return bad;
  });
/** A strip canvas: the columns that carry amber pixels form one thin vertical cursor at the current θ₁. */
const stripAmber = (p, id) =>
  p.evaluate((sel) => {
    const cv = document.querySelector(sel),
      c = cv.getContext('2d', { willReadFrequently: true }),
      d = c.getImageData(0, 0, cv.width, cv.height).data;
    const s = document.createElement('span');
    s.style.color = 'var(--amber)';
    document.body.appendChild(s);
    const [ar, ag, ab] = getComputedStyle(s).color.match(/\d+/g).map(Number);
    s.remove();
    let x0 = Infinity,
      x1 = -Infinity,
      y0 = Infinity,
      y1 = -Infinity,
      n = 0;
    for (let y = 0; y < cv.height; y++)
      for (let x = 0; x < cv.width; x++) {
        const i = 4 * (y * cv.width + x);
        if (d[i + 3] > 200 && Math.abs(d[i] - ar) < 26 && Math.abs(d[i + 1] - ag) < 26 && Math.abs(d[i + 2] - ab) < 26) {
          n++;
          x0 = Math.min(x0, x);
          x1 = Math.max(x1, x);
          y0 = Math.min(y0, y);
          y1 = Math.max(y1, y);
        }
      }
    return { n, width: x1 - x0, height: y1 - y0, dpr: cv.width / cv.clientWidth, h: cv.height };
  }, id);
const textOf = async (id, p = page) => (await p.locator('#' + id).innerText()).replaceAll('−', '-');
const tagText = (p = page) => p.locator('.stage .tags .tag:not([hidden])').allInnerTexts();
async function layout(p, label, figure = false) {
  const view = await stageView(p, '#stage', figure);
  const issues = [...view.layout, ...view.hud, ...(await labelOverlaps(p, '.stage .tag', 0)), ...(await capitalGreek(p))];
  check(label + ' framing and legible labels', !issues.length && (await overflowX(p)) === 0, JSON.stringify(issues));
}

/** Every number of the page at its θ₁, θ_ctx and ψ, against the mathematics above. */
function verifyMath(m, label) {
  const th1 = m.th1,
    thc = m.thc,
    psi = m.psi;
  const b = beat(th1, thc, psi);
  const qGap = (a, c) => norm(sub(a, c));
  check(
    label + ' the five states: x_t = 1, x_{t−1} = exp(−ω₁), the heap reflection and the refracted step',
    qGap(m.xNow, [1, 0, 0, 0]) < 1e-12 &&
      qGap(m.xPrev, [Math.cos(th1), -Math.sin(th1), 0, 0]) < 1e-12 &&
      qGap(m.xPrev, b.xPrev) < 1e-12 &&
      qGap(m.xFree, b.xFree) < 1e-12 &&
      qGap(m.xFree, [Math.cos(th1), Math.sin(th1), 0, 0]) < 1e-12 &&
      qGap(m.xNext, b.xNext) < 1e-11
  );
  const phi = th1 * th1 * thc * Math.sin(psi);
  check(
    label + ' Lie triple Ω₂ = ‖ω₁‖² ω_ctx,⊥ with norm θ₁²θ_ctx sin ψ, perpendicular to ω₁',
    qGap(m.omega2, b.omega2) < 1e-12 && near(m.phi, phi, 1e-12) && near(dot(m.omega2, b.om1), 0, 1e-12) && near(m.phiDeg, phi / DEG, 1e-9)
  );
  check(
    label + ' readings: cos²(θ₁/2), cos²θ₁, cos²(φ/2), (1 + cos θ₁ cos φ)/2 and ‖x_{t+1}‖² = 1',
    near(m.kPrevNow, Math.cos(th1 / 2) ** 2, 1e-12) &&
      near(m.kNowFree, Math.cos(th1 / 2) ** 2, 1e-12) &&
      near(m.kPrevFree, Math.cos(th1) ** 2, 1e-12) &&
      near(m.kFreeNext, Math.cos(phi / 2) ** 2, 1e-11) &&
      near(m.kNowNext, (1 + Math.cos(th1) * Math.cos(phi)) / 2, 1e-11) &&
      near(m.kNowNext, kap(b.xNow, b.xNext), 1e-11) &&
      near(m.normNext2, 1, 1e-12)
  );
  // the chordal chart: distance to the centre 2 sin(θ/2), and κ(x_t, ·) = 1 − d²/4
  const chartOk = ['prev', 'free', 'next'].every((k) => {
    const q = { prev: b.xPrev, free: b.xFree, next: b.xNext }[k],
      d = norm(m.chart[k]);
    return near(d, 2 * Math.sin(Math.acos(Math.max(-1, Math.min(1, q[0]))) / 2), 1e-9) && near(kap([1, 0, 0, 0], q), 1 - (d * d) / 4, 1e-9);
  });
  check(label + ' chordal chart: the drawn distance reads κ(x_t, ·) = 1 − d²/4', chartOk && (th1 < 1e-9 || near(dot(unit(m.chart.prev), [-1, 0, 0]), 1, 1e-9)));
  const e1 = [1, 0, 0],
    e2 = [Math.cos(psi), 0, Math.sin(psi)],
    e3 = crossLC(e1, e2);
  check(
    label + ' dyad: E₃ = E₁ × E₂ ⊥ E₁, E₂, ‖E₃‖² = sin²ψ = Lagrange, scalar part 0, volume sin²ψ',
    qGap(m.dyad.e3, e3) < 1e-12 &&
      near(m.dyad.norm2, Math.sin(psi) ** 2, 1e-12) &&
      near(m.dyad.dot31, 0, 1e-12) &&
      near(m.dyad.dot32, 0, 1e-12) &&
      near(m.dyad.scalar, 0, 1e-12) &&
      near(m.dyad.lagrangeLeft, 1 - Math.cos(psi) ** 2, 1e-12) &&
      near(m.dyad.lagrangeRight, m.dyad.lagrangeLeft, 1e-12) &&
      near(m.dyad.volume, Math.sin(psi) ** 2, 1e-12) &&
      near(dot(m.dyad.b23, e3), 0, 1e-12) &&
      near(dot(m.dyad.b31, e3), 0, 1e-12)
  );
  check(
    label + ' brackets of the triad close: [E₂, E₃] = E₁ − cos ψ E₂, [E₃, E₁] = E₂ − cos ψ E₁',
    qGap(m.dyad.b23, sub(e1, scale(e2, Math.cos(psi)))) < 1e-12 && qGap(m.dyad.b31, sub(e2, scale(e1, Math.cos(psi)))) < 1e-12
  );
  check(label + ' holonomy of E₁, E₂, Ê₃: (S, D) = (1 + cos ψ, sin ψ), phase −ψ/2', near(m.holo.S, 1 + Math.cos(psi), 1e-12) && near(m.holo.D, Math.sin(psi), 1e-12) && near(m.holo.phase, -psi / 2 / DEG, 1e-9));
  const polarTheta = Math.acos(Math.cos(th1) * Math.cos(phi)) / DEG;
  check(label + ' polar form of x_t⁻¹ x_{t+1}', near(m.polar.theta, polarTheta, 1e-7) && polarWitness(b, m.polar) && m.polar.gap < 1e-12, JSON.stringify(m.polar));
}
/** exists_eq_cos_arccos_add_sin_smul on x_t⁻¹ x_{t+1}: n is pure with ‖n‖ = 1 (also where the vector part vanishes)
    and q = cos(arccos Re q) + sin(arccos Re q)·n, with q computed here from the beat b. */
function polarWitness(b, polar) {
  const q = qm(qinvM(b.xNow), b.xNext),
    th = Math.acos(Math.max(-1, Math.min(1, q[0]))),
    n = polar.n;
  const rebuilt = [Math.cos(th), ...scale(n, Math.sin(th))];
  return n.length === 3 && polar.nRe === 0 && near(norm(n), 1, 1e-12) && near(polar.nNorm, 1, 1e-12) && norm(sub(rebuilt, q)) < 1e-11 && near(polar.theta, th / DEG, 1e-7);
}
/** The instances the evidence panel names, against constructions written here. */
function verifyInstances(m, I, label) {
  const th1 = m.th1,
    thc = m.thc,
    psi = m.psi;
  // SO(4) equivariance of the update on 16 base-point changes of our own
  let drift = 0;
  const units = [...randomUnits(0x9e3779b9, 32)];
  const b = beat(th1, thc, psi);
  for (let k = 0; k < 16; k++) {
    const gL = units[2 * k],
      gR = units[2 * k + 1],
      move = (q) => qm(qm(gL, q), gR);
    const omcR = qm(qm(qinvM(gR), [0, ...b.omc]), gR).slice(1);
    const u = update(move(b.xPrev), move(b.xNow), omcR);
    drift = Math.max(drift, norm(sub(u.xNext, move(b.xNext))), norm(sub(u.xFree, move(b.xFree))), Math.abs(kap(move(b.xNow), u.xNext) - m.kNowNext));
  }
  // the published bound: the drift stays below 10⁻¹⁴ on both sides
  check(label + ' SO(4): 16 base-point changes move nothing but the frame (drift < 1e-14)', drift < 1e-14 && I.so4.pairs === 16 && I.so4.drift < 1e-14, String(drift) + ' | ' + String(I.so4.drift));
  // tri x y z = x y⁻¹ z in the group at any base point o
  let triDrift = 0;
  for (const o of randomUnits(77, 16)) {
    const star = (x, y) => qm(qm(x, qinvM(o)), y),
      inv = (x) => qm(qm(o, qinvM(x)), o);
    triDrift = Math.max(triDrift, norm(sub(star(star(b.xNow, inv(b.xPrev)), b.xNow), b.xFree)));
  }
  check(label + ' the transfer in the group at 16 base points', triDrift < 1e-12 && I.triBase.bases === 16 && I.triBase.drift < 1e-12);
  // the reflection sequence and the powers of b in the group at a: a (a⁻¹ b)ⁿ
  const seq = [b.xPrev, b.xNow];
  while (seq.length < 7) seq.push(qm(qm(seq.at(-1), qinvM(seq.at(-2))), seq.at(-1)));
  const step = qm(qinvM(b.xPrev), b.xNow);
  let pw = b.xPrev,
    powGap = 0;
  for (let n = 0; n < 7; n++) {
    powGap = Math.max(powGap, norm(sub(seq[n], pw)));
    pw = qm(pw, step);
  }
  let kAdd = 0;
  for (let a = 0; a <= 3; a++) for (let n = 0; n <= 3; n++) kAdd = Math.max(kAdd, Math.abs(kap(seq[a], seq[a + n]) - kap(seq[0], seq[n])));
  check(
    label + ' reflection sequence = powers, and κ depends only on the gap',
    powGap < 1e-12 &&
      kAdd < 1e-12 &&
      I.reflection.powGap < 1e-12 &&
      I.reflection.kAdd < 1e-12 &&
      near(I.reflection.kappas[1], Math.cos(th1 / 2) ** 2, 1e-12) &&
      near(I.reflection.kappas[2], Math.cos(th1) ** 2, 1e-12)
  );
  check(
    label + ' policy: frozen at θ₁ = 0, a changed action comes with a changed memory',
    I.policy.frozen < 1e-12 &&
      near(I.policy.actionChange, norm(sub(b.xFree, b.xNow)), 1e-12) &&
      near(I.policy.memoryChange, norm(sub(b.xPrev, b.xNow)), 1e-12) &&
      (I.policy.actionChange < 1e-12 || I.policy.memoryChange > 0)
  );
  // the open chain as a tree: root phase 1, transported e^{iθ₁}, gauged away
  const u = [Math.cos(th1), Math.sin(th1)];
  check(
    label + ' tree transport: root 1, e^{±iθ₁} at the ends, gauge makes both edges 1',
    I.tree.edges === 2 &&
      I.tree.vertices === 3 &&
      same(I.tree.rootPhase, [1, 0]) &&
      near(I.tree.phases.free[0], u[0], 1e-12) &&
      near(I.tree.phases.free[1], u[1], 1e-12) &&
      near(I.tree.phases.prev[1], -u[1], 1e-12) &&
      I.tree.gap < 1e-12
  );
  // loops c = m + 1 − n of the drawn graphs, counted from their edge lists
  const loopsOf = (n, edges) => {
    const parent = [...Array(n).keys()],
      find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
    let off = 0;
    for (const [a, c] of edges) {
      const ra = find(a),
        rc = find(c);
      if (ra === rc) off++;
      else parent[ra] = rc;
    }
    return off;
  };
  check(
    label + ' loop counts: chain 0, triangle 1, tetrahedron 3',
    I.loops.chain === loopsOf(3, [[0, 1], [1, 2]]) &&
      I.loops.triangle === loopsOf(3, [[0, 1], [1, 2], [2, 0]]) &&
      I.loops.tetra === loopsOf(4, [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]]) &&
      same([I.loops.chain, I.loops.triangle, I.loops.tetra], [0, 1, 3])
  );
  // the shortest-gate holonomy of E₁, E₂, Ê₃ with our own Pauli matrices
  const a = [1, 0, 0],
    bb = [Math.cos(psi), 0, Math.sin(psi)],
    c = [0, -1, 0];
  const S = 1 + dot(a, bb) + dot(bb, c) + dot(c, a),
    D = dot(a, crossLC(bb, c)),
    R = Math.hypot(S, D);
  const rotor = (x, y) => mscale2(madd2(I2, mmul2(sigma(y), sigma(x))), 1 / Math.sqrt(2 * (1 + dot(x, y))));
  const loop = mmul2(mmul2(rotor(c, a), rotor(bb, c)), rotor(a, bb));
  const want = mscale2(madd2(mscale2(I2, S), times_i(sigma(a)), -D), 1 / R);
  check(
    label + ' triangle holonomy: S² + D² = 2(1 + a·b)(1 + b·c)(1 + c·a), rotor loop, projections',
    mdist(loop, want) < 1e-12 &&
      near(S * S + D * D, 2 * (1 + dot(a, bb)) * (1 + dot(bb, c)) * (1 + dot(c, a)), 1e-12) &&
      near(I.holonomy.S, S, 1e-12) &&
      near(I.holonomy.D, D, 1e-12) &&
      near(I.holonomy.sum, I.holonomy.product, 1e-12) &&
      I.holonomy.rotorGap < 1e-12 &&
      I.holonomy.stateGap < 1e-12 &&
      near(I.holonomy.phase, (-Math.atan2(D, S) * 180) / PI, 1e-9)
  );
  // the balanced unitary sum A = 1/√2, B = Ê₃/√2 as −iσ·n/√2
  const A = mscale2(I2, 1 / Math.SQRT2),
    B = mscale2(times_i(sigma(c)), -1 / Math.SQRT2),
    Ssum = madd2(A, B),
    AB = mmul2(A, dagger2(B));
  const zero = mscale2(I2, 0);
  check(
    label + ' balanced sum: S S† = 1, A A† = B B† = 1/2, (A B†)† = −A B†',
    mdist(mmul2(Ssum, dagger2(Ssum)), I2) < 1e-12 &&
      mdist(mmul2(B, dagger2(B)), mscale2(I2, 0.5)) < 1e-12 &&
      mdist(madd2(dagger2(AB), AB), zero) < 1e-12 &&
      I.balanced.unitary < 1e-12 &&
      I.balanced.halfA < 1e-12 &&
      I.balanced.halfB < 1e-12 &&
      I.balanced.skew < 1e-12
  );
  // the tetrahedron n₀, E₁, E₂, Ê₃ with F = −Ω/2 (Girard) in degrees
  const n0 = unit(plus(plus(a, bb), c)),
    V = [n0, a, bb, c],
    idx = [0, 1, 2, 3];
  const F = idx.map((i) => idx.map((j) => idx.map((k) => (-girardSigned(V[i], V[j], V[k]) / 2) * (180 / PI))));
  let defects = 0,
    quadruples = 0;
  for (const r of idx)
    for (const i of idx)
      for (const j of idx)
        for (const k of idx) {
          quadruples++;
          if (Math.abs(F[i][j][k] - F[r][j][k] + F[r][i][k] - F[r][i][j]) > 1e-7) defects++;
        }
  const alt = F[1][2][3] - F[0][2][3] + F[0][1][3] - F[0][1][2];
  check(
    label + ' tetrahedron: Girard face phases, 0 defects, anchored repair, alternating sum 0',
    defects === 0 &&
      near(alt, 0, 1e-7) &&
      I.tetra.defects === 0 &&
      same(I.tetra.faceErrors, [0, 0, 0, 0]) &&
      I.tetra.edgeErrors === 0 &&
      quadruples === 4 ** 4 &&
      I.tetra.quadruples === quadruples &&
      I.tetra.triplesPerAnchor === quadruples / idx.length &&
      I.tetra.triplesPerAnchor === 64 &&
      near(I.tetra.alternating, 0, 1e-9) &&
      near(I.tetra.F123, F[1][2][3], 1e-6) &&
      near(I.tetra.F023, F[0][2][3], 1e-6) &&
      near(I.tetra.F013, F[0][1][3], 1e-6) &&
      near(I.tetra.F012, F[0][1][2], 1e-6) &&
      near(I.tetra.F123, -psi / 2 / DEG, 1e-9)
  );
  // the Jacobi identity on a = ω₁, b = ω_ctx, c = (π/2) n₀ by BAC-CAB
  const ja = [th1, 0, 0],
    jb = [thc * Math.cos(psi), 0, thc * Math.sin(psi)],
    jc = scale(n0, PI / 2);
  const terms = [doubleCross(ja, jb, jc), doubleCross(jb, jc, ja), doubleCross(jc, ja, jb)];
  check(
    label + ' Jacobi: three double brackets close head to tail',
    norm(terms.reduce(plus, [0, 0, 0])) < 1e-12 &&
      I.jacobi.sum < 1e-12 &&
      I.jacobi.terms.every((t, k) => norm(sub(t, terms[k])) < 1e-12) &&
      norm(sub(I.jacobi.c, jc)) < 1e-12
  );
  check(label + ' the model: x_t = 1, tri = x y⁻¹ z, κ = (1 + ⟨x, y⟩)/2', I.model.unitNow < 1e-15 && I.model.tri === 'x y⁻¹ z' && I.model.kappa === '(1 + ⟨x, y⟩)/2');
}
async function verifyCard(p, id) {
  const m = await state(p),
    c = CARDS[id];
  check(
    id + ' scene, view, angles and preset',
    m.preset === id && m.scene === c.scene && m.cam === c.cam && near(m.thcDeg, c.thc, 1e-9) && near(m.psiDeg, c.psi, 1e-9),
    JSON.stringify([m.preset, m.scene, m.cam, m.thcDeg, m.psiDeg])
  );
  verifyMath(m, id);
  verifyInstances(m, m.leanInstances, id);
}

await T.goto(BOOK, ID, '?lang=en');
await settle(page);
{
  const s = await state();
  check('the refraction card opens by default, parked on its still', s.preset === DEFAULT && s.scene === 'curve' && near(s.th1, STILL, 1e-12) && !s.playing);
  check(
    'default card: the numbers of the brief',
    f4(s.phi) === '0.8613' &&
      near(s.phi, PI ** 3 / 36, 1e-12) &&
      f2(s.phiDeg) === '49.35' &&
      f4(s.kFreeNext) === '0.8257' &&
      near(s.kFreeNext, 0.82573138, 1e-8) &&
      f4(s.kNowNext) === '0.6629' &&
      f4(s.normNext2) === '1.0000' &&
      f4(s.kPrevNow) === '0.7500' &&
      f4(s.kPrevFree) === '0.2500' &&
      near(s.leanInstances.holonomy.S, 1, 1e-12) &&
      near(s.leanInstances.holonomy.D, 1, 1e-12) &&
      near(s.leanInstances.holonomy.phase, -45, 1e-9) &&
      f2(s.leanInstances.polar.theta) === '70.99'
  );
}
check(
  'three-column lab shell, panel badges, tagline, fonts and evidence spans',
  await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const asides = [...document.querySelectorAll('.sec h2 .aside')].map((el) => el.textContent.trim());
    return (
      !!q('.app.lab > header.top .status #scenePill') &&
      !!q('.app.lab > header.top .status #keyPill') &&
      !!q('#rail #lensPanel .lens-toggle') &&
      !!q('#rail #presets') &&
      !!q('#rail #camChips') &&
      !!q('main.center > #stage > .scan') &&
      !!q('main.center > #stage > .vig') &&
      !!q('#stage > #hudTl #hudBig') &&
      !!q('#stage > button.handle#relHandle') &&
      !!q('main.center > .strip #plot') &&
      !!q('main.center > .strip #plotB') &&
      !q('#stage .strip') &&
      !q('#stage canvas#plot') &&
      q('aside.col.side#evidence').firstElementChild.id === 'infoBtn' &&
      !!q('#evidence > #ctlPanel #theta1Range') &&
      !!q('#evidence > #ctlPanel #ctxRange') &&
      !!q('#evidence > #ctlPanel #planeRange') &&
      !!q('#evidence > #readouts') &&
      !!q('#evidence > #basis') &&
      ['§39.5', '5', 'NUM', 'trureturing'].every((x) => asides.includes(x)) &&
      [...document.querySelectorAll('.tagline > span')].every((el) => el.querySelector('em') && el.firstChild.nodeType === 3) &&
      !!q('link[href*="fonts.googleapis.com/css2?family=Chakra+Petch"]') &&
      [...document.querySelectorAll('#basis .lean')].every((el) => el.children.length === 2 && [...el.children].every((c) => c.tagName === 'SPAN')) &&
      document.querySelectorAll('#basis .lean.frozen').length === 0 &&
      document.querySelectorAll('#basis .lean.argued').length === 1 &&
      document.querySelectorAll('#basis .lean.model').length === 1 &&
      document.querySelectorAll('#basis .lean.num').length === 1 &&
      document.querySelectorAll('#basis .lean:not(.argued):not(.model):not(.num)').length === 13 &&
      document.querySelectorAll('#drawerEvidence .lean').length === 16 &&
      [...document.querySelectorAll('#drawer .sheet > div.zh, #drawer .sheet > div.en')].every((el) => el.querySelector('p.lede') && el.querySelectorAll('ol li b').length === 7 && el.querySelector('p.lede.refs a'))
    );
  })
);
check(
  'the shortest-gate box says the name states no minimality',
  await page.evaluate(() => {
    const box = document.querySelector('#basis a[data-lean-gid$="shortest_gate_triangle_holonomy"]').closest('.lean');
    return box.querySelector('.en').textContent.includes('rotor a b') && /only a name/.test(box.textContent) && /只是名字/.test(box.textContent);
  })
);
check(
  'the shortest-gate box states both hypotheses of the projection clause: ψ†ψ = 1 and P_a ψ = ψ',
  await page.evaluate(() => {
    const box = document.querySelector('#basis a[data-lean-gid$="shortest_gate_triangle_holonomy"]').closest('.lean');
    const zh = box.querySelector('.zh').textContent,
      en = box.querySelector('.en').textContent;
    return (
      zh.includes('从满足 ψ†ψ = 1 与 P_a ψ = ψ 的单位本征旋量 ψ 出发依次作归一化投影到 b、c、a，回到 (S − iD)/√(S² + D²)·ψ') &&
      en.includes('sequentially applying normalized projections onto b, c and a to a unit eigenspinor ψ (ψ†ψ = 1, P_a ψ = ψ) returns (S − iD)/√(S² + D²)·ψ') &&
      !/eigenstate of a onto/.test(en)
    );
  })
);
check(
  'a card click starts a blend of the layers and the angles instead of a hard cut',
  await page.evaluate(() => {
    document.querySelector('[data-preset="second-order-free-heap-geodesic"]').click();
    const s = window.DYAD_RELATION_DEBUG.state;
    return s.blending && s.layers.heap < 1 && s.scene === 'free' && s.thcDeg > 0;
  })
);
await settle(page);
await until(page, () => !window.DYAD_RELATION_DEBUG.state.blending);
check('the blend ends on the scene and angles of the card', (await state()).layers.heap === 1 && (await state()).thcDeg === 0);
await pause();
check(
  'the probe exposes the card table and the mathematics',
  await page.evaluate(() => {
    const d = window.DYAD_RELATION_DEBUG;
    const c = d.calc(Math.PI / 3, 45, 90),
      z = d.calc(0, 45, 90);
    return (
      Object.keys(d.presets).length === 5 &&
      Object.values(d.presets).every((p) => p.play && Math.abs(p.still - Math.PI / 3) < 1e-15) &&
      Math.abs(c.phi - Math.PI ** 3 / 36) < 1e-12 &&
      Math.abs(z.kPrevNow - 1) < 1e-15 &&
      Math.abs(z.leanInstances.policy.actionChange) < 1e-15 &&
      Math.hypot(...z.xFree.map((x, i) => x - z.xNow[i])) < 1e-15
    );
  })
);

for (const lang of ['zh', 'en']) {
  await page.click('[data-lang-set="' + lang + '"]');
  await settle(page);
  const links = await page
    .locator('#drawer .refs a')
    .evaluateAll((els) => els.filter((el) => getComputedStyle(el.parentElement).display !== 'none').map((el) => el.getAttribute('href')));
  check(lang + ' theory link', same(links.filter((h) => h.startsWith('../../' + lang + '/')), ['../../' + lang + '/' + THEORY]) && links.length === 2, JSON.stringify(links));
  check(lang + ' cited declarations', same(await page.locator('#basis a[data-lean-gid]').evaluateAll((els) => els.map((el) => el.dataset.leanGid)), GIDS));
  const badgeText = async (selector) => (await page.locator('#basis ' + selector + ' .' + lang).allTextContents()).join(' ').replace(/\s+/g, '');
  const numeric = await badgeText('.lean.num');
  const model = await badgeText('.lean.model');
  const argued = await badgeText('.lean.argued');
  const drawer = (await page.locator('#drawer .sheet > div.' + lang).allTextContents()).join(' ');
  check(lang + ' NUM box carries the computed table', ['0.7500', '0.2500', 'π³/36', '0.8613', '49.35°', '0.8257', '0.6629', '1.0000', '−45°', '0.0000'].every((x) => numeric.includes(x)));
  check(
    lang + ' MODEL box names the update, the chart and the toys',
    ['2+1=3', '[x', '{ω₁,ω', '2sin(θ/2)', 'L=q̇²/2', 'L=q̈²/2'].every((x) => model.includes(x)),
    model.slice(0, 120)
  );
  check(
    lang + ' ARGUED box names the literature',
    (lang === 'zh' ? ['杨振宁', '米尔斯', '比安基', '贝纳布', '奥斯特罗格拉茨基', '雅各布森'] : ['Yang', 'Mills', 'Bianchi', 'Bénabou', 'Ostrogradsky', 'Jacobson']).every((x) => argued.includes(x)) &&
      ['F=dA+A∧A', 'd', 'F=0'].every((x) => argued.includes(x))
  );
  const tetraBox = (await page.locator('#basis a[data-lean-gid$="tetra_defects_incidence_repair_and_exactness"]').evaluate((a, l) => a.closest('.lean').querySelector('.' + l).textContent, lang)) || '';
  check(
    lang + ' tetrahedron box counts 4⁴ = 256 ordered quadruples, 64 triples per anchor',
    (lang === 'zh' ? tetraBox.includes('256 个有序四元组（每个锚点 64 个三元组）') : tetraBox.includes('all 256 ordered quadruples (64 triples per anchor)')) && !/\b64 (个)?有序四元组|all 64 ordered/.test(tetraBox),
    tetraBox.slice(0, 80)
  );
  check(lang + ' drawer states the example', ['0.7500', '0.2500', 'π³/36', '0.8613', '0.8257', '0.6629', '−45°', '2 + 1 = 3'].every((x) => drawer.includes(x)));
  // Q1, Q2, Q4: the drawer names the order sheet a proxy, gives the factors ½, 2, ¼ of the ordinary commutator, pairs the
  // measured δF with the continuum identity of the literature, and conditions the step on the supplied context
  check(
    lang + ' drawer: order sheet as a proxy, the commutator factors, δF on the simplex and the supplied context',
    (lang === 'zh'
      ? ['换序片', '旋子次序不交换的示意', 'E₃ = ½[A₁, A₂]Lie', '= 2[ω₁, ωctx]×', '= ¼[Ft,ctx, At]Lie', '单形上测得 δF = 0', '文献中的类比', '给定的语境', '自主闭合为 [xt, xt−1, xt]', '为条件']
      : ['order sheet', 'rotor-order noncommutativity', 'E₃ = ½[A₁, A₂]Lie', '= 2[ω₁, ωctx]×', '= ¼[Ft,ctx, At]Lie', 'δF = 0 is measured on the simplex', 'analogue in the literature', 'supplied context', 'closes autonomously on (xt−1, xt) as [xt, xt−1, xt]', 'conditional on the supplied xctx']
    ).every((x) => drawer.includes(x)) && !/\bDF\b/.test(drawer),
    drawer.slice(0, 80)
  );
  check(
    lang + ' MODEL box: rotor-order sheet, no evaluated F, the factors ½ and ¼, and the supplied context x_ctx',
    ['exp(sω₁)exp(uωctx)', 'exp(uωctx)exp(sω₁)', 'F=dA+A∧A', 'E₃=½[A₁,A₂]Lie', 'Ft,ctx=[At,Actx]Lie=2[ω₁,ωctx]×', 'Ω₂={ω₁,ωctx,ω₁}=¼[Ft,ctx,At]Lie', 'xctx=xtexp(ωctx)', '[xt,xt−1,xt]'].every((x) => model.includes(x)),
    model.slice(0, 120)
  );
  check(
    lang + ' the cap readout is the tetrahedral coboundary δF',
    (await page.locator('#roCap').evaluate((o, l) => o.closest('div').querySelector('dt .' + l).textContent, lang)).includes(lang === 'zh' ? '四面体面相位上边缘 δF' : 'tetrahedral face coboundary δF')
  );
  for (const id of Object.keys(CARDS)) {
    check(lang + '/' + id + ' plays up to its still and parks', await pick(id));
    await verifyCard(page, id);
    await layout(page, lang + '/' + id);
    const readings = await page.locator('#readouts output').allTextContents();
    check(
      lang + '/' + id + ' one key and five readouts, all populated',
      readings.length === 6 && (await page.locator('#readouts dl.ro > div').count()) === 6 && (await page.locator('#readouts dl.ro > div.key').count()) === 1 && readings.every((t) => t && !/NaN|undefined|^—$/.test(t))
    );
    const m = await state();
    const I = m.leanInstances;
    const key = {
      dyad: f4(m.dyad.norm2),
      zeno: f4(m.kPrevNow),
      free: f4(m.kNowFree),
      curve: f4(m.phi),
      bianchi: f4(Math.abs(I.tetra.alternating))
    }[m.scene];
    check(
      lang + '/' + id + ' HUD title, pill and key readout',
      (await textOf('hudBig')).includes(key) &&
        (m.scene !== 'bianchi' || ((await textOf('hudBig')).includes('δF = ' + key) && !/\bDF\b/.test(await textOf('hudBig')))) &&
        (m.scene !== 'free' || (await textOf('hudSub')).startsWith(lang === 'zh' ? '自由一步 x' : 'The free step x')) && (await textOf('keyPill')).includes(f4(m.kNowNext)) && (await textOf('roKey')).includes(f4(m.kNowNext)) && (await textOf('hudSub')).trim().length > 0
    );
    check(
      lang + '/' + id + ' readouts show the computed numbers',
      (await textOf('roSpacing')).includes(`${f4(m.kPrevNow)} · ${f4(m.kNowFree)} · ${f4(m.kPrevFree)} · 0.0000`) &&
        (await textOf('roTriple')).includes(f4(m.phi)) &&
        (await textOf('roTriple')).includes(f4(m.kFreeNext)) &&
        (await textOf('roTriple')).includes('1.0000') &&
        (await textOf('roDyad')).includes(f4(m.dyad.norm2)) &&
        (await textOf('roHolo')).includes(`(${f4(I.holonomy.S)}, ${f4(I.holonomy.D)})`) &&
        (await textOf('roHolo')).includes('c = 0 / 1 / 3') &&
        (await textOf('roCap')).includes('0.0000 · 0.0000')
    );
  }
}
/* the card numbers of the brief */
await pick('dyad-orthogonal-relation-span');
{
  const m = await state();
  check('dyad at ψ = 60°: ‖[E₁, E₂]‖² = 0.7500 = 1 − 1/4, orthogonal, scalar 0', f4(m.dyad.norm2) === '0.7500' && near(m.dyad.lagrangeLeft, 0.75, 1e-12) && f4(m.dyad.dot31) === '0.0000' && f4(m.dyad.scalar) === '0.0000');
  const ortho = await page.evaluate(() => window.DYAD_RELATION_DEBUG.calc(Math.PI / 3, 45, 90));
  check('dyad at ψ = 90°: an orthonormal triad, [E₂, E₃] = E₁ and [E₃, E₁] = E₂', near(ortho.dyad.norm2, 1, 1e-12) && norm(sub(ortho.dyad.b23, [1, 0, 0])) < 1e-12 && norm(sub(ortho.dyad.b31, ortho.dyad.e2)) < 1e-12);
}
await pick('second-order-free-heap-geodesic');
{
  const m = await state();
  check('free heap at 60°: κ 0.7500 = 0.7500, two apart 0.2500, no refraction', f4(m.kPrevNow) === '0.7500' && f4(m.kNowFree) === '0.7500' && f4(m.kPrevFree) === '0.2500' && m.phi === 0 && norm(sub(m.xNext, m.xFree)) < 1e-15);
}
/* the rail: θ₁ across [0, 120°] */
await pick(DEFAULT);
for (const t of [0, 0.3, PI / 4, PI / 3, PI / 2, 1.9, TH_MAX]) {
  await seek(t);
  const m = await state();
  check('rail θ₁ = ' + t.toFixed(4), near(m.th1, t, 1e-12) && !m.playing);
  verifyMath(m, 'θ₁=' + t.toFixed(4));
  verifyInstances(m, m.leanInstances, 'θ₁=' + t.toFixed(4));
  check('readouts at θ₁ = ' + t.toFixed(4), (await textOf('roKey')).includes(f4(m.kNowNext)) && (await textOf('roSpacing')).includes(f4(m.kPrevNow)));
  check('θ₁ slider follows the rail at ' + t.toFixed(4), Number(await page.inputValue('#theta1Range')) === Math.round(t / DEG));
  const at = await page.evaluate((x) => window.DYAD_RELATION_DEBUG.dragTarget(x), t);
  const box = await page.locator('#relHandle').boundingBox();
  check('handle sits on x_{t−1} at θ₁ = ' + t.toFixed(4), !!box && Math.hypot(box.x + box.width / 2 - at.x, box.y + box.height / 2 - at.y) < 1.5);
}
check(
  'zeno: at θ₁ = 0 the three states coincide and the next step is x_t',
  await page.evaluate(() => {
    const z = window.DYAD_RELATION_DEBUG.calc(0, 45, 90);
    const d = (a, b) => Math.hypot(...a.map((x, i) => x - b[i]));
    return d(z.xPrev, z.xNow) < 1e-15 && d(z.xFree, z.xNow) < 1e-15 && d(z.xNext, z.xNow) < 1e-15 && z.kPrevNow === 1;
  })
);
/* the three sliders */
await pick(DEFAULT);
for (const [sel, val, keyDeg] of [
  ['#ctxRange', 0, 'thcDeg'],
  ['#ctxRange', 90, 'thcDeg'],
  ['#planeRange', 30, 'psiDeg'],
  ['#planeRange', 0, 'psiDeg'],
  ['#theta1Range', 100, 'th1Deg'],
  ['#theta1Range', 20, 'th1Deg'],
  ['#theta1Range', 90, 'th1Deg'],
  ['#planeRange', 90, 'psiDeg']
]) {
  await input(sel, val);
  const m = await state();
  check(`${sel} = ${val}°`, near(m[keyDeg], val, 1e-9) && m.preset === null && !m.playing && !m.blending);
  verifyMath(m, sel + '=' + val);
  verifyInstances(m, m.leanInstances, sel + '=' + val);
}
/* Q5: turning on a context relation from the free card shows the curvature scene and the refracted next step at once */
for (const lang of ['zh', 'en']) {
  await page.click('[data-lang-set="' + lang + '"]');
  await settle(page);
  await pick('second-order-free-heap-geodesic');
  const before = await state();
  await input('#ctxRange', 45);
  const m = await state(),
    hs = await textOf('hudSub');
  check(
    lang + ' free card, then θ_ctx = 45°: the curvature scene at once, with the refracted κ(x_t, x_{t+1}) = 0.6629 in the HUD',
    before.scene === 'free' &&
      before.thcDeg === 0 &&
      m.scene === 'curve' &&
      !m.blending &&
      m.preset === null &&
      m.layers.refr === 1 &&
      m.layers.heap === 0 &&
      near(m.thcDeg, 45, 1e-9) &&
      near(m.psiDeg, 90, 1e-9) &&
      near(m.th1, STILL, 1e-12) &&
      f4(m.kNowNext) === '0.6629' &&
      hs.includes('0.6629') &&
      !hs.includes('0.7500') &&
      (await textOf('roKey')).includes('0.6629') &&
      Number(await page.inputValue('#ctxRange')) === 45,
    hs
  );
  verifyMath(m, lang + ' free → θ_ctx = 45°');
}
/* the curvature scene at θ_ctx = 0 and at θ₁ = 0: no Lie triple, and the HUD says why */
await pick(DEFAULT);
await input('#ctxRange', 0);
{
  const m = await state(),
    hs = await textOf('hudSub');
  check(
    'curvature scene at θ_ctx = 0°: no transverse relation, Ω₂ = 0, x_{t+1} = x^free_{t+1} on the geodesic',
    m.scene === 'curve' && m.phi === 0 && f4(m.kNowNext) === '0.7500' && /^θctx = 0°: no transverse relation, Ω₂ = 0/.test(hs) && hs.includes('stays on the geodesic') && hs.includes('0.7500'),
    hs
  );
}
await seek(0);
{
  const m = await state(),
    hs = await textOf('hudSub');
  check('curvature scene at θ₁ = 0°: frozen at x_t, Ω₂ = 0, κ(x_t, x_{t+1}) = 1.0000', m.th1 === 0 && m.phi === 0 && /^θ₁ = 0°: frozen at xt, Ω₂ = 0/.test(hs) && hs.includes('1.0000'), hs);
}
/* the boundaries of the sliders */
// θ₁ = 0: the vector part of x_t⁻¹ x_{t+1} vanishes and the polar witness is still a unit pure quaternion
await pick(DEFAULT);
await seek(0);
{
  const m = await state(),
    I = m.leanInstances;
  check(
    'θ₁ = 0: ‖n‖ = 1, n pure, q = cos(arccos Re q) + sin(arccos Re q)·n, and the readout says ‖n‖ = 1.0000',
    m.th1 === 0 && polarWitness(beat(0, m.thc, m.psi), I.polar) && near(I.polar.theta, 0, 1e-12) && f4(I.polar.nNorm) === '1.0000' && (await textOf('roNote')).includes('‖n‖ = 1.0000'),
    JSON.stringify(I.polar)
  );
}
{
  // the whole slider domain, through the read-only probe: θ₁ in whole degrees over [0°, 120°], θ_ctx and ψ in {0°, 45°, 90°}
  const rows = await page.evaluate(() => {
    const out = [];
    for (let d = 0; d <= 120; d++)
      for (const thc of [0, 45, 90])
        for (const psi of [0, 45, 90]) {
          const c = window.DYAD_RELATION_DEBUG.calc((d * Math.PI) / 180, thc, psi);
          out.push([c.th1, c.thc, c.psi, c.polar]);
        }
    return out;
  });
  const bad = rows.filter(([th1, thc, psi, polar]) => !polarWitness(beat(th1, thc, psi), polar));
  check(
    'the polar witness has ‖n‖ = 1 across all 121 integer θ₁ values × {0°, 45°, 90°}² (' + rows.length + ' grid frames)',
    rows.length === 121 * 9 && bad.length === 0,
    JSON.stringify(bad.slice(0, 2))
  );
}
// ψ = 0: E₂ = E₁, E₃ = 0, the span is one line; the cited instances still evaluate (on E₁, E₁, Ê₃)
for (const lang of ['zh', 'en']) {
  await page.click('[data-lang-set="' + lang + '"]');
  await settle(page);
  await pick('dyad-orthogonal-relation-span');
  await input('#planeRange', 0);
  const m = await state(),
    I = m.leanInstances;
  const hs = await textOf('hudSub'),
    rn = await textOf('roNote');
  check(
    lang + ' ψ = 0°: E₂ = E₁ and E₃ = 0 are reported as collinear, one-dimensional',
    m.scene === 'dyad' &&
      m.psiDeg === 0 &&
      m.preset === null &&
      norm(sub(m.dyad.e2, m.dyad.e1)) < 1e-15 &&
      norm(m.dyad.e3) === 0 &&
      hs.includes('E₂ = E₁') &&
      hs.includes('[E₁, E₂] = 0') &&
      rn.includes('E₂ = E₁') &&
      rn.includes('E₃ = 0') &&
      (lang === 'zh' ? /共线/.test(hs) && /一维/.test(hs) && /一维/.test(rn) && !/三维/.test(hs + rn) : /collinear/.test(hs) && /one-dimensional/.test(hs + rn) && !/three dimensions|plane of E₁/.test(hs + rn)),
    hs + ' | ' + rn
  );
  check(
    lang + ' ψ = 0°: the instances read (S, D) = (2, 0) on E₁, E₁, Ê₃, and the readouts stay valid',
    near(I.holonomy.S, 2, 1e-12) &&
      near(I.holonomy.D, 0, 1e-12) &&
      I.holonomy.rotorGap < 1e-12 &&
      I.holonomy.stateGap < 1e-12 &&
      I.balanced.skew < 1e-12 &&
      I.tetra.defects === 0 &&
      (await textOf('roHolo')).includes('(2.0000, 0.0000)') &&
      (await textOf('roDyad')).startsWith('0.0000 · 0.0000 · 0.0000 · 0.0000') &&
      (await textOf('roCap')).includes('0.0000 · 0.0000') &&
      (await page.locator('#readouts output').allTextContents()).every((t) => t && !/NaN|undefined|∞|^—$/.test(t))
  );
  verifyMath(m, lang + ' ψ=0');
  verifyInstances(m, I, lang + ' ψ=0');
  await layout(page, lang + ' collinear dyad ψ = 0°');
}
// θ₁ = 120°, θ_ctx = 90°: at ψ = 0° both orders run along ω₁ and through the antipode; at ψ = 6° they pass 5° from it.
// No drawn edge may jump across the ball, no sampled vertex may be dropped, and a run is cut only at the antipode itself
/** The inverse of the chordal chart: the drawn point p (‖p‖ < 2) is cos θ + sin θ p̂ with 2 sin(θ/2) = ‖p‖. */
const unchart = (p) => {
  const d = norm(p);
  if (d < 1e-15) return [1, 0, 0, 0];
  const th = 2 * Math.asin(Math.min(1, d / 2));
  return [Math.cos(th), ...scale(p, Math.sin(th) / d)];
};
/** The two far edges of the reversed order exp(uω_ctx) exp(sω₁) as great circles cos α A + sin α B, α ∈ [0, end]:
    s ↦ exp(ω_ctx) exp(sω₁) and u ↦ exp(uω_ctx) exp(ω₁). */
function reversedEdges(m) {
  const chat = [Math.cos(m.psi), 0, Math.sin(m.psi)],
    C = qexpSeries(scale(chat, m.thc)),
    X = qexpSeries([m.th1, 0, 0]);
  return [
    { A: C, B: qm(C, [0, 1, 0, 0]), end: m.th1 },
    { A: X, B: qm([0, ...chat], X), end: m.thc }
  ].map((e) => ({ ...e, samples: Array.from({ length: 25 }, (_, i) => (i / 24) * e.end) }));
}
/** The real part of exp(sω₁) exp(uω_ctx), by our own series and matrices (s and u may leave [0, 1]). */
const patchReal = (m, s, u) => qm(qexpSeries([m.th1 * s, 0, 0]), qexpSeries(scale([Math.cos(m.psi), 0, Math.sin(m.psi)], m.thc * u)))[0];
/** The continuous minimum of the real part of the patch exp(sω₁) exp(uω_ctx) over (s, u) ∈ [0, 1]², and its argmin.
    Inside the square the only critical point is a saddle, so the minimum lies on the four edges. Along an edge, with t the
    angle run (t = sθ₁ or uθ_ctx), the real part is a cos t + b sin t; a = the value at t = 0 and b = the value at
    t = π/2 are read from patchReal on the extended edge, the candidates are both ends and every stationary point
    atan2(b, a) + kπ on the edge, and each candidate is evaluated again as a product of two series exponentials. Below
    cos 175° the patch comes within 5° of the antipode −x_t and the page may only draw its outline. */
function patchMinimum(m) {
  let best = { lowest: Infinity, s: NaN, u: NaN };
  if (!(m.th1 > 0 && m.thc > 0)) return best;
  const edges = [
    { end: m.thc, at: (t) => [0, t / m.thc] },
    { end: m.th1, at: (t) => [t / m.th1, 0] },
    { end: m.thc, at: (t) => [1, t / m.thc] },
    { end: m.th1, at: (t) => [t / m.th1, 1] }
  ];
  for (const e of edges) {
    const a = patchReal(m, ...e.at(0)),
      b = patchReal(m, ...e.at(PI / 2)),
      t0 = Math.atan2(b, a);
    const ts = [0, e.end, ...[-2, -1, 0, 1, 2].map((k) => t0 + k * PI).filter((t) => t > 0 && t < e.end)];
    for (const t of ts) {
      const [s, u] = e.at(t),
        w = patchReal(m, s, u);
      if (w < best.lowest) best = { lowest: w, s, u };
    }
  }
  return best;
}
const patchLowest = (m) => patchMinimum(m).lowest;
/** The lowest real part of the patch on the (n + 1) × (n + 1) grid s, u ∈ {0, 1/n, …, 1}. */
function patchGridLowest(m, n) {
  const chat = [Math.cos(m.psi), 0, Math.sin(m.psi)],
    rows = Array.from({ length: n + 1 }, (_, i) => qexpSeries([(m.th1 * i) / n, 0, 0])),
    cols = Array.from({ length: n + 1 }, (_, j) => qexpSeries(scale(chat, (m.thc * j) / n)));
  let lowest = Infinity;
  for (const r of rows) for (const c of cols) lowest = Math.min(lowest, qm(r, c)[0]);
  return lowest;
}
/** What the next frame draws: every sc.line, and the key of every sc.surface. */
const drawnFrame = (p = page) =>
  p.evaluate(() => {
    const sc = window.TRV.solids[0],
      line = sc.line,
      surface = sc.surface,
      lines = [],
      surfaces = [];
    sc.line = (pts, style) => {
      lines.push({ pts: pts.map((q) => [...q]), width: style && style.width, dash: (style && style.dash) || null, color: style && style.color });
      return line(pts, style);
    };
    sc.surface = (key, ...rest) => {
      surfaces.push(key);
      return surface(key, ...rest);
    };
    try {
      window.TRV.kit.flush();
    } finally {
      sc.line = line;
      sc.surface = surface;
    }
    return { lines, surfaces, magenta: window.TRV.palette.magenta };
  });
const segLengths = (pts) => pts.slice(1).map((p, i) => norm(sub(p, pts[i])));
const onBoundary = (p) => Math.abs(norm(p) - 2) < 1e-9;
/** The dashed reversed-order runs of a frame, in drawing order. At ψ = 0° both edges lie on one great circle, so a run is
    matched to its edge by where it starts: a run that starts inside the ball starts an edge at that edge's first sample,
    and a run that starts on the boundary sphere continues the same edge from the antipode. Every inner point, inverted
    through our own chart, must lie on the great circle of that edge; α is its angle along the edge. */
function reversedRuns(m, drawn) {
  const edges = reversedEdges(m);
  const dashed = drawn.lines.filter((l) => l.color === drawn.magenta && l.width === 1.3 && same(l.dash, [4, 4]));
  let current = -1;
  const runs = dashed.map((l) => {
    if (!onBoundary(l.pts[0])) current = edges.findIndex((e) => norm(sub(unchart(l.pts[0]), e.A)) < 1e-9);
    const edge = current,
      e = edges[edge],
      inner = l.pts.filter((p) => !onBoundary(p)).map(unchart);
    const fit = !!e && inner.length > 1 && inner.every((q) => norm(sub(q, plus(scale(e.A, dot(q, e.A)), scale(e.B, dot(q, e.B))))) < 1e-9);
    const alphas = fit ? inner.map((q) => Math.atan2(dot(q, e.B), dot(q, e.A))) : [];
    return { edge, fit, pts: l.pts, alphas, ends: [onBoundary(l.pts[0]), onBoundary(l.pts.at(-1))], inside: l.pts.slice(1, -1).every((p) => !onBoundary(p)), longest: Math.max(...segLengths(l.pts)) };
  });
  // every sample of an edge that is not the antipode itself is a drawn vertex of that edge (none dropped)
  const kept = edges.map((e, k) => {
    const alphas = runs.filter((r) => r.edge === k).flatMap((r) => r.alphas);
    return e.samples.every((a) => (Math.cos(a) * e.A[0] + Math.sin(a) * e.B[0] < -1 + 1e-12) !== alphas.some((x) => Math.abs(x - a) < 1e-9));
  });
  return { edges, runs, kept };
}
const rising = (xs) => xs.slice(1).every((x, i) => x > xs[i]);
await pick(DEFAULT);
await input('#theta1Range', 120);
await input('#ctxRange', 90);
await input('#planeRange', 0);
{
  const m = await state();
  const drawn = await drawnFrame();
  const { edges, runs, kept } = reversedRuns(m, drawn);
  const magentaJumps = drawn.lines.filter((l) => l.color === drawn.magenta && !same(l.dash, [3, 4])).flatMap((l) => segLengths(l.pts));
  // the antipode lies on each reversed edge exactly once: at s = 3/4 (α = 90°) and at u = 2/3 (α = 60°)
  check(
    'θ₁ = 120°, θ_ctx = 90°, ψ = 0°: each reversed-order edge is cut at the antipode into two runs that end on the boundary sphere along ∓ω₁, no vertex dropped',
    near(m.th1Deg, 120, 1e-9) &&
      near(m.thcDeg, 90, 1e-9) &&
      m.psiDeg === 0 &&
      edges.every((e) => e.samples.filter((a) => Math.cos(a) * e.A[0] + Math.sin(a) * e.B[0] < -1 + 1e-12).length === 1) &&
      runs.length === 4 &&
      same(runs.map((r) => r.edge).sort(), [0, 0, 1, 1]) &&
      runs.every((r) => r.fit && r.inside && r.ends.filter(Boolean).length === 1 && rising(r.alphas)) &&
      runs.every((r) => r.pts.filter(onBoundary).every((p) => near(Math.abs(p[0]), 2, 1e-9) && Math.hypot(p[1], p[2]) < 1e-9)) &&
      runs.reduce((n, r) => n + r.pts.length, 0) === 2 * (25 - 1 + 2) &&
      kept.every(Boolean) &&
      Math.max(...runs.map((r) => r.longest)) < 0.4 &&
      Math.max(...magentaJumps) < 0.4,
    JSON.stringify({ runs: runs.map((r) => [r.edge, r.fit, r.pts.length, r.ends, r.longest.toFixed(3)]), kept, longest: Math.max(...magentaJumps) })
  );
  // T3: collinear relations have no sheet, no patch label, no Lie triple, and the next step is the free step
  const shown = await tagText();
  check(
    'θ₁ = 120°, θ_ctx = 90°, ψ = 0°: rank 1, no sheet, no patch label, Ω₂ = 0 and x_{t+1} = x^free_{t+1}',
    !drawn.surfaces.includes('plaquette') &&
      m.sheetFilled === false &&
      !shown.some((t) => /order sheet|换序片|order outline|换序轮廓/.test(t)) &&
      m.phi === 0 &&
      norm(sub(m.xNext, m.xFree)) < 1e-15 &&
      near(m.kNowNext, m.kNowFree, 1e-15),
    JSON.stringify({ surfaces: drawn.surfaces, shown })
  );
  for (const lang of ['zh', 'en']) {
    await page.click('[data-lang-set="' + lang + '"]');
    await settle(page);
    const hs = await textOf('hudSub');
    check(
      lang + ' ψ = 0° on the curvature scene: the HUD reports collinear relations, Ω₂ = 0 and the next step on the geodesic',
      hs.includes('ψ = 0°') &&
        hs.includes('Ω₂ = 0') &&
        hs.includes(f4(m.kNowNext)) &&
        (lang === 'zh' ? hs.includes('共线') && hs.includes('没有二维的片') && hs.includes('留在测地线上') : hs.includes('collinear') && hs.includes('no two-dimensional sheet') && hs.includes('stays on the geodesic')) &&
        !/rotates the next step|转过|unwrapped arc|展开弧长/.test(hs),
      hs
    );
  }
  await layout(page, 'antipodal seam θ₁ = 120°, θ_ctx = 90°, ψ = 0°');
}
// ψ = 6°: both reversed edges pass 5.2° and 6° from the antipode without reaching it; each stays one continuous run
await input('#planeRange', 6);
{
  const m = await state();
  const drawn = await drawnFrame();
  const { edges, runs, kept } = reversedRuns(m, drawn);
  const closest = edges.map((e) => Math.min(...Array.from({ length: 2001 }, (_, i) => Math.cos((i / 2000) * e.end) * e.A[0] + Math.sin((i / 2000) * e.end) * e.B[0])));
  check(
    'θ₁ = 120°, θ_ctx = 90°, ψ = 6°: each reversed-order edge is one continuous run from its first to its last sample, no vertex dropped, every chord < 0.4',
    m.psiDeg === 6 &&
      closest.every((w) => w > -1 + 1e-3 && w < Math.cos(170 * DEG)) &&
      runs.length === 2 &&
      same(runs.map((r) => r.edge).sort(), [0, 1]) &&
      runs.every((r) => r.fit && !r.ends[0] && !r.ends[1] && r.inside && rising(r.alphas) && near(r.alphas[0], 0, 1e-9) && near(r.alphas.at(-1), edges[r.edge].end, 1e-9) && r.pts.length > 25) &&
      kept.every(Boolean) &&
      Math.max(...runs.map((r) => r.longest)) < 0.4 &&
      drawn.surfaces.includes('plaquette') &&
      m.sheetFilled === true &&
      patchLowest(m) > Math.cos(175 * DEG),
    JSON.stringify({ closest, lowest: patchLowest(m), runs: runs.map((r) => [r.edge, r.fit, r.pts.length, r.ends, r.longest.toFixed(3)]), kept })
  );
  const hs = await textOf('hudSub');
  check(
    'ψ = 6°: the HUD names the order sheet, the unwrapped arc along the perpendicular great circle and the endpoint angle from x^free',
    /order sheet/.test(hs) &&
      hs.includes(`turns along the perpendicular great circle by unwrapped arc ${f2(m.phiDeg)}° (endpoint angle ${f2(m.bend)}° from xfreet+1), off the geodesic`) &&
      near(m.bend, m.phiDeg, 1e-9) &&
      !/collinear|rotates the next step/.test(hs),
    hs
  );
}
// Q7-1: ψ = 1°: the patch exp(sω₁) exp(uω_ctx) comes within 5° of the antipode (at s = 9/10, u = 4/5 it is about 1° from
// −x_t), so the page leaves the plaquette unfilled and draws only its outline; one predicate, so the stage tag, the legend
// and the HUD all say outline, in both languages and under both lenses
await input('#planeRange', 1);
{
  const m = await state();
  const drawn = await drawnFrame();
  const lowest = patchLowest(m);
  const outlineEdges = drawn.lines.filter((l) => l.color === drawn.magenta && l.width === 1.8 && !l.dash);
  check(
    'θ₁ = 120°, θ_ctx = 90°, ψ = 1°: the patch nears the antipode, the plaquette is not filled and its far edges are drawn as the outline',
    m.psiDeg === 1 &&
      near(m.th1Deg, 120, 1e-9) &&
      near(m.thcDeg, 90, 1e-9) &&
      lowest < Math.cos(175 * DEG) &&
      m.sheetFilled === false &&
      !drawn.surfaces.includes('plaquette') &&
      outlineEdges.length >= 2 &&
      m.phi > 1e-6 &&
      Math.abs(Math.sin(m.phi)) > 1e-6,
    JSON.stringify({ lowest, sheetFilled: m.sheetFilled, surfaces: drawn.surfaces, outlineEdges: outlineEdges.length, phi: m.phi })
  );
  const OUTLINE_TAG = { zh: ['换序轮廓', '换序轮廓（F 示意）'], en: ['order outline', 'order outline (F proxy)'] };
  for (const lens of [0, 1]) {
    if ((await state()).lens !== lens) {
      await page.click('#lensToggleBtn');
      await settle(page);
    }
    for (const lang of ['zh', 'en']) {
      await page.click('[data-lang-set="' + lang + '"]');
      await settle(page);
      const tags = (await tagText()).map((t) => t.replace(/\s+/g, ' ').trim()),
        hs = await textOf('hudSub'),
        legend = (await page.locator('#legend').textContent()).replace(/\s+/g, ' ');
      check(
        `${lang} ${lens ? 'gauge' : 'ontology'} lens, ψ = 1°: the stage tag, the legend and the HUD name the order outline near the antipode, not the sheet`,
        (await state()).lens === lens &&
          tags.some((t) => t === OUTLINE_TAG[lang][lens]) &&
          !tags.some((t) => /order sheet|换序片/.test(t)) &&
          (lang === 'zh'
            ? hs.includes('ω₁ 与 ωctx 贴近对跖边界改绘品红换序轮廓；Ω₂ 沿垂直大圆展开弧长') && !hs.includes('换序片')
            : hs.includes('ω₁ and ωctx trace the magenta order outline near the antipode; Ω₂ turns along the perpendicular great circle') && !/order sheet/.test(hs)) &&
          legend.includes(lang === 'zh' ? '换序轮廓与折射' : 'outline and refraction') &&
          !/sheet|换序片/.test(legend),
        JSON.stringify({ tags, hs, legend })
      );
    }
    await layout(page, `near-antipodal outline θ₁ = 120°, θ_ctx = 90°, ψ = 1°, ${lens ? 'gauge' : 'ontology'} lens`);
  }
  await page.click('#lensToggleBtn');
  await settle(page);
  check(
    'ψ = 1°: back on the ontology lens, in English',
    (await state()).lens === 0 && (await page.evaluate(() => document.querySelector('[data-lang-set][aria-pressed="true"]').dataset.langSet)) === 'en'
  );
}
// T9-1: θ₁ = 103°, θ_ctx = 79°, ψ = 5°: the 21 × 21 grid of the patch stays 174.77° from x_t, but between its nodes, on the
// edge s = 1 at u* = atan2(cos 5° sin 103°, −cos 103°)/79° ≈ 0.974, the continuous patch reaches
// −hypot(cos 103°, cos 5° sin 103°) ≈ −0.99638761 < cos 175°: 175.13° from x_t, 4.87° from −x_t. The page must decide on
// the continuous minimum, so the plaquette is not filled and every label says outline, in both languages and both lenses
await input('#theta1Range', 103);
await input('#ctxRange', 79);
await input('#planeRange', 5);
{
  const m = await state();
  const { lowest, s, u } = patchMinimum(m),
    exact = -Math.hypot(Math.cos(103 * DEG), Math.cos(5 * DEG) * Math.sin(103 * DEG)),
    uStar = Math.atan2(Math.cos(5 * DEG) * Math.sin(103 * DEG), -Math.cos(103 * DEG)) / (79 * DEG),
    coarse = patchGridLowest(m, 20),
    dense = patchGridLowest(m, 400);
  check(
    'θ₁ = 103°, θ_ctx = 79°, ψ = 5°: the continuous minimum of the patch is −hypot(cos 103°, cos 5° sin 103°) at s = 1, u = u*, below cos 175°, where the 21 × 21 grid stays above',
    near(m.th1Deg, 103, 1e-9) &&
      near(m.thcDeg, 79, 1e-9) &&
      m.psiDeg === 5 &&
      near(lowest, exact, 1e-12) &&
      exact.toFixed(8) === '-0.99638761' &&
      near(s, 1, 1e-12) &&
      near(u, uStar, 1e-12) &&
      u > 0 &&
      u < 1 &&
      near(patchReal(m, 1, uStar), exact, 1e-12) &&
      lowest < Math.cos(175 * DEG) &&
      near(Math.acos(lowest) / DEG, 175.128, 5e-4) &&
      near(180 - Math.acos(lowest) / DEG, 4.872, 5e-4) &&
      coarse > Math.cos(175 * DEG) &&
      near(Math.acos(coarse) / DEG, 174.771, 5e-4) &&
      dense >= lowest - 1e-12 &&
      dense - lowest < 1e-4,
    JSON.stringify({ lowest, exact, s, u, uStar, coarse, dense })
  );
  const OUTLINE_TAG = { zh: ['换序轮廓', '换序轮廓（F 示意）'], en: ['order outline', 'order outline (F proxy)'] };
  for (const lens of [0, 1]) {
    if ((await state()).lens !== lens) {
      await page.click('#lensToggleBtn');
      await settle(page);
    }
    for (const lang of ['zh', 'en']) {
      await page.click('[data-lang-set="' + lang + '"]');
      await settle(page);
      const now = await state(),
        drawn = await drawnFrame(),
        outlineEdges = drawn.lines.filter((l) => l.color === drawn.magenta && l.width === 1.8 && !l.dash),
        tags = (await tagText()).map((t) => t.replace(/\s+/g, ' ').trim()),
        hs = await textOf('hudSub'),
        legend = (await page.locator('#legend').textContent()).replace(/\s+/g, ' ');
      check(
        `${lang} ${lens ? 'gauge' : 'ontology'} lens, θ₁ = 103°, θ_ctx = 79°, ψ = 5°: no plaquette, the solid outline edges are drawn, and the stage tag, the HUD and the legend name the order outline`,
        now.lens === lens &&
          now.sheetFilled === false &&
          !drawn.surfaces.includes('plaquette') &&
          outlineEdges.length >= 2 &&
          tags.some((t) => t === OUTLINE_TAG[lang][lens]) &&
          !tags.some((t) => /order sheet|换序片/.test(t)) &&
          (lang === 'zh' ? hs.includes('换序轮廓') && !hs.includes('换序片') : hs.includes('order outline') && !/order sheet/.test(hs)) &&
          legend.includes(lang === 'zh' ? '换序轮廓与折射' : 'outline and refraction') &&
          !/sheet|换序片/.test(legend),
        JSON.stringify({ sheetFilled: now.sheetFilled, surfaces: drawn.surfaces, outlineEdges: outlineEdges.length, tags, hs, legend })
      );
    }
  }
  await page.click('#lensToggleBtn');
  await settle(page);
  check(
    'θ₁ = 103°, θ_ctx = 79°, ψ = 5°: back on the ontology lens, in English',
    (await state()).lens === 0 && (await page.evaluate(() => document.querySelector('[data-lang-set][aria-pressed="true"]').dataset.langSet)) === 'en'
  );
}
// back to θ₁ = 120°, θ_ctx = 90° for the turns past the antipode
await input('#theta1Range', 120);
await input('#ctxRange', 90);
// θ₁ = 120°, θ_ctx = 90°, ψ = 90°: ‖Ω₂‖ = 2π³/9 turns past the antipode; the end lies the shorter way from x^free
await input('#planeRange', 90);
{
  const m = await state(),
    phi = 2 * PI ** 3 / 9,
    bend = Math.acos(Math.cos(phi)) / DEG;
  const hs = await textOf('hudSub');
  check(
    'θ₁ = 120°, θ_ctx = 90°, ψ = 90°: the HUD gives the unwrapped turn 394.78° and the end-point angle 34.78°',
    near(m.phi, phi, 1e-12) &&
      f2(m.phiDeg) === '394.78' &&
      near(m.bend, bend, 1e-9) &&
      f2(bend) === '34.78' &&
      hs.includes('394.78°') &&
      hs.includes('34.78°') &&
      /unwrapped arc 394\.78° \(endpoint angle 34\.78° from xfreet\+1\), off the geodesic|展开弧长 394\.78°（距 xfreet\+1 最短测地角 34\.78°），偏离原测地线/.test(hs) &&
      !/rotates the next step|转过/.test(hs),
    hs
  );
  verifyMath(m, 'wrapped turn');
}
/** a and b both occur in s, a first. */
const inOrder = (s, a, b) => s.includes(a) && s.includes(b) && s.indexOf(a) < s.indexOf(b);
const currentLang = () => page.evaluate(() => document.querySelector('[data-lang-set][aria-pressed="true"]').dataset.langSet);
async function setLang(lang) {
  await page.click('[data-lang-set="' + lang + '"]');
  await settle(page);
}
// arch-2: at θ_ctx = ψ = 90° the turn is ‖Ω₂‖ = (π/2)θ₁²; at a whole number of half turns exp(Ω₂) = ±1 and the end
// x_{t+1} = ±x^free_{t+1} lands back on the geodesic: θ₁ = 2 rad gives 360° (+), θ₁ = √2 rad gives 180° (−)
{
  const langBefore = await currentLang();
  for (const [t, turn, sign] of [
    [2, '360.00', 1],
    [Math.SQRT2, '180.00', -1]
  ]) {
    await seek(t);
    const m = await state();
    check(
      `θ₁ = ${t.toFixed(4)} rad, θ_ctx = ψ = 90°: ‖Ω₂‖ = ${turn}° and x_{t+1} = ${sign > 0 ? '' : '−'}x^free_{t+1}`,
      m.scene === 'curve' &&
        near(m.th1, t, 1e-12) &&
        near(m.thcDeg, 90, 1e-9) &&
        near(m.psiDeg, 90, 1e-9) &&
        near(m.phi, (PI / 2) * t * t, 1e-12) &&
        f2(m.phiDeg) === turn &&
        norm(sub(m.xNext, scale(m.xFree, sign))) < 1e-9,
      JSON.stringify({ phiDeg: m.phiDeg, xNext: m.xNext, xFree: m.xFree })
    );
    verifyMath(m, 'half turns ' + turn);
    for (const lang of ['zh', 'en']) {
      await setLang(lang);
      const hs = await textOf('hudSub'),
        rn = await textOf('roNote');
      check(
        `${lang} θ₁ = ${t.toFixed(4)} rad: the HUD lands x_{t+1} back on the geodesic after ${turn}°, not off it`,
        hs.includes(turn + '°') &&
          hs.includes(f4(m.kNowNext)) &&
          hs.includes(sign > 0 ? 'xt+1 = xfreet+1' : 'xt+1 = -xfreet+1') &&
          (lang === 'zh' ? hs.includes('终点落回原测地线') && !/离开测地线/.test(hs) : hs.includes('landing back on the geodesic') && !/off the geodesic/.test(hs)),
        hs
      );
      check(
        `${lang} θ₁ = ${t.toFixed(4)} rad: the readout note names the degenerate refraction triangle`,
        sign > 0
          ? lang === 'zh'
            ? rn.includes('折射三角形退化为开线段') && rn.includes('有效环路 0') && !rn.includes('非退化')
            : rn.includes('collapses to an open segment') && rn.includes('0 active loops') && !rn.includes('non-degenerate')
          : lang === 'zh'
            ? rn.includes('xt+1 = -xfreet+1 落在同一大圆上') && rn.includes('参考 3 顶点闭路图 c = 1') && !rn.includes('非退化')
            : rn.includes('xt+1 = -xfreet+1 lies on the same great circle') && rn.includes('reference 3-vertex cycle graph c = 1') && !rn.includes('non-degenerate'),
        rn
      );
    }
  }
  await setLang(langBefore);
}
// quality-1: the refraction triangle x_t → x^free_{t+1} → x_{t+1} → x_t closes only when the refraction is nonzero; the
// loop counts c of the readout belong to the three reference graphs of anchored_phase_classification
{
  const langBefore = await currentLang();
  await pick(DEFAULT);
  const generic = await state();
  await input('#ctxRange', 0);
  const flat = await state();
  check(
    'θ₁ = 60°, θ_ctx = 0° on the curvature scene: Ω₂ = 0 and x_{t+1} = x^free_{t+1}, while the default card refracts',
    flat.scene === 'curve' &&
      near(flat.th1, STILL, 1e-12) &&
      flat.thcDeg === 0 &&
      flat.phi === 0 &&
      norm(sub(flat.xNext, flat.xFree)) < 1e-15 &&
      generic.scene === 'curve' &&
      norm(sub(generic.xNext, generic.xFree)) > 0.1 &&
      Math.abs(Math.sin(generic.phi)) > 0.1
  );
  for (const lang of ['zh', 'en']) {
    await setLang(lang);
    const rn = await textOf('roNote');
    const dt = await page.locator('#roHolo').evaluate((o, l) => o.closest('div').querySelector('dt .' + l).textContent, lang);
    check(
      lang + ' θ_ctx = 0°: the readout note reports the collapsed refraction triangle with 0 active loops',
      (lang === 'zh'
        ? rn.includes('xt+1 = xfreet+1，折射三角形退化为开线段（有效环路 0；参考三角形图 c = 1）') && !rn.includes('非退化闭合三角形')
        : rn.includes('xt+1 = xfreet+1, so the refraction triangle collapses to an open segment (0 active loops; reference 3-cycle c = 1)') && !rn.includes('non-degenerate closed triangle')),
      rn
    );
    check(
      lang + ' the holonomy readout names its loop counts as the three reference graphs',
      dt === (lang === 'zh' ? '三角形和乐 (S, D)、相位与三类参考图环路数 c（链/三角/四面体）' : 'Triangle holonomy (S, D), phase and reference-graph loops c (chain/3-cycle/K₄)') &&
        (await textOf('roHolo')).includes('c = 0 / 1 / 3'),
      dt
    );
  }
  await input('#ctxRange', 45);
  for (const lang of ['zh', 'en']) {
    await setLang(lang);
    const rn = await textOf('roNote');
    check(lang + ' θ_ctx = 45°: the refraction triangle is non-degenerate, c = 1', rn.includes(lang === 'zh' ? '非退化闭合三角形 c = 1' : 'the non-degenerate closed triangle has c = 1') && !/0 active loops|有效环路 0/.test(rn), rn);
  }
  await seek(0);
  for (const lang of ['zh', 'en']) {
    await setLang(lang);
    const rn = await textOf('roNote');
    check(
      lang + ' θ₁ = 0°: the three points coincide, 0 active loops',
      rn.includes(lang === 'zh' ? 'θ₁ = 0° 时三点重合于 xt（退化无环，有效环路 0）' : 'at θ₁ = 0° all three points coincide at xt (degenerate, 0 active loops)') && rn.includes('‖n‖ = 1.0000'),
      rn
    );
  }
  const boxes = await page.locator('#basis a[data-lean-gid$="anchored_phase_classification"]').evaluate((a) => [a.closest('.lean').querySelector('.zh').textContent, a.closest('.lean').querySelector('.en').textContent]);
  check(
    'the anchored-classification box counts a non-degenerate 3-vertex cycle, the refraction triangle only when its three vertices are pairwise distinct',
    boxes[0].includes('非退化闭合三顶点环路（如三顶点两两互异时的 xt → xfreet+1 → xt+1 → xt），n = 3、m = 3，c = 1') &&
      boxes[1].includes('a non-degenerate 3-vertex cycle (such as xt → xfreet+1 → xt+1 → xt when its three vertices are pairwise distinct) has n = 3, m = 3, c = 1') &&
      !boxes[0].includes('折射非零') &&
      !boxes[1].includes('refraction is nonzero'),
    boxes.join(' | ').slice(0, 160)
  );
  await setLang(langBefore);
}
// T5-1: at the full turn ‖Ω₂‖ = 2π (θ₁ = 2 rad, θ_ctx = ψ = 90°) the unwrapped refraction is 360°, nonzero, yet
// exp(Ω₂) = +1 puts x_{t+1} on x^free_{t+1}: two of the three vertices coincide, so no 3-vertex loop may be claimed,
// and the anchored-classification box qualifies its 3-vertex cycle by pairwise distinct vertices, not by nonzero refraction
{
  const langBefore = await currentLang();
  await pick(DEFAULT);
  await input('#ctxRange', 90);
  await input('#planeRange', 90);
  await seek(2);
  const m = await state();
  // independent: exp of a pure quaternion of norm 2π is +1, so x_{t+1} = x^free_{t+1}·(+1)
  const turn = 2 * 2 * (PI / 2) * Math.sin(PI / 2);
  check(
    'full turn θ₁ = 2 rad, θ_ctx = ψ = 90°: ‖Ω₂‖ = 2π = 360.00° is nonzero, yet exp(Ω₂) = +1 and x_{t+1} = x^free_{t+1}',
    m.scene === 'curve' &&
      near(m.th1, 2, 1e-12) &&
      near(m.thcDeg, 90, 1e-9) &&
      near(m.psiDeg, 90, 1e-9) &&
      near(turn, 2 * PI, 1e-15) &&
      near(m.phi, 2 * PI, 1e-12) &&
      m.phi > 6 &&
      f2(m.phiDeg) === '360.00' &&
      near(Math.cos(m.phi), 1, 1e-12) &&
      norm(sub(m.xNext, m.xFree)) < 1e-9 &&
      norm(sub(m.xFree, m.xNow)) > 0.5,
    JSON.stringify({ phi: m.phi, xNext: m.xNext, xFree: m.xFree })
  );
  verifyMath(m, 'full turn 2π');
  const boxes = await page
    .locator('#basis a[data-lean-gid$="anchored_phase_classification"]')
    .evaluate((a) => [a.closest('.lean').querySelector('.zh').textContent, a.closest('.lean').querySelector('.en').textContent]);
  for (const lang of ['zh', 'en']) {
    await setLang(lang);
    const rn = await textOf('roNote'),
      basis = boxes[lang === 'zh' ? 0 : 1];
    check(
      `${lang} full turn 360.00°: the readout note collapses the refraction triangle, claims no 3-vertex loop`,
      (lang === 'zh'
        ? rn.includes('xt+1 = xfreet+1，折射三角形退化为开线段（有效环路 0；参考三角形图 c = 1）') && !rn.includes('非退化') && !rn.includes('同一大圆')
        : rn.includes('xt+1 = xfreet+1, so the refraction triangle collapses to an open segment (0 active loops; reference 3-cycle c = 1)') &&
          !rn.includes('non-degenerate') &&
          !rn.includes('same great circle')),
      rn
    );
    check(
      `${lang} full turn 360.00°: #basis qualifies the 3-vertex cycle by pairwise distinct vertices, not by nonzero refraction`,
      (lang === 'zh'
        ? basis.includes('如三顶点两两互异时的 xt → xfreet+1 → xt+1 → xt') && !basis.includes('折射非零')
        : basis.includes('such as xt → xfreet+1 → xt+1 → xt when its three vertices are pairwise distinct') && !basis.includes('refraction is nonzero')),
      basis.slice(0, 160)
    );
  }
  await setLang(langBefore);
}
// quality-2: the drawer states the parameter conditions of its numbers, ψ > 0° for the span and θ₁ = 60° for 0.7500, 0.2500
{
  const items = await page.evaluate(() => Object.fromEntries(['zh', 'en'].map((l) => [l, [...document.querySelectorAll(`#drawer .sheet > div.${l} ol > li`)].map((li) => li.textContent)])));
  check(
    'drawer item 2 qualifies the three-dimensional span by ψ > 0° and names the ψ = 0° collapse, in both languages',
    inOrder(items.zh[1], 'ψ > 0°', '张满三维') &&
      items.zh[1].includes('ψ = 0° 时两方向共线、E₃ = 0，退化为一维') &&
      inOrder(items.en[1], 'For ψ > 0°', 'fill three dimensions') &&
      items.en[1].includes('at ψ = 0° the two coincide, E₃ = 0, and the span collapses to one line'),
    items.zh[1] + ' | ' + items.en[1]
  );
  check(
    'drawer item 4 gives 0.7500 and 0.2500 at θ₁ = 60° and 1.0000 at θ₁ = 0°, in both languages',
    inOrder(items.zh[3], 'θ₁ = 60° 时', '0.7500') &&
      inOrder(items.zh[3], '0.7500', '隔一步 0.2500') &&
      items.zh[3].includes('θ₁ = 0° 时三点重合、读数均为 1.0000') &&
      inOrder(items.en[3], 'at θ₁ = 60°', '0.7500') &&
      inOrder(items.en[3], '0.7500', 'two apart 0.2500') &&
      items.en[3].includes('at θ₁ = 0° the points coincide and both read 1.0000'),
    items.zh[3] + ' | ' + items.en[3]
  );
}
// quality-3: the ARGUED box qualifies the symmetric-space bracket, apart from the ordinary commutator of Yang–Mills
for (const lang of ['zh', 'en']) {
  const argued = await page.locator('#basis .lean.argued .' + lang).textContent();
  check(
    lang + ' ARGUED box: the isotropy bracket of G/H and its unit-S³ form, after the ordinary commutator of the gauge field',
    inOrder(argued, 'Fμν = [Aμ, Aν]', lang === 'zh' ? '对称空间 G/H 曲率由商李括号给出 R(X, Y)Z = −[[X, Y]𝔥, Z]' : 'the curvature of a symmetric space G/H via the isotropy Lie bracket, R(X, Y)Z = −[[X, Y]𝔥, Z]') &&
      argued.includes('R(a, b)c = −[[a, b]×, c]× = −¼[[a, b]Lie, c]Lie'),
    argued.slice(0, 160)
  );
}
// the unit-S³ bracket identity of that box, checked independently on random pure quaternions: with a × b and
// [a, b]_Lie = ab − ba = 2 a × b, −(a × b) × c = −¼[[a, b]_Lie, c]_Lie = ⟨b, c⟩a − ⟨a, c⟩b (sectional curvature 1)
{
  const crossV = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const lie = (a, b) => scale(crossV(a, b), 2);
  let worst = 0;
  for (let k = 0; k < 64; k++) {
    const [a, b, c] = [0, 1, 2].map((j) => [Math.sin(1.3 * k + 0.7 * j + 0.1), Math.cos(2.1 * k - j), Math.sin(0.9 * k * j + 1.7)]);
    const lhs = scale(crossV(crossV(a, b), c), -1),
      viaLie = scale(lie(lie(a, b), c), -0.25),
      sphere = sub(scale(a, dot(b, c)), scale(b, dot(a, c)));
    worst = Math.max(worst, norm(sub(lhs, viaLie)), norm(sub(lhs, sphere)));
  }
  check('unit S³: −[[a, b]×, c]× = −¼[[a, b]Lie, c]Lie = ⟨b, c⟩a − ⟨a, c⟩b on 64 triples', worst < 1e-12, String(worst));
}
/* the lens and the views */
check('desktop: the mirror lens button of the tour bar stays hidden', (await page.evaluate(() => innerWidth)) > 1080 && (await page.locator('#mobileLensBtn').isHidden()));
await pick(DEFAULT);
const beforeLens = await state();
const tags0 = await tagText(),
  pill0 = await textOf('scenePill'),
  big0 = await textOf('hudBig');
await page.click('#lensToggleBtn');
await settle(page);
const lens = await state();
check(
  'the gauge lens renames the picture and keeps the experiment',
  lens.lens === 1 &&
    !same(await tagText(), tags0) &&
    (await tagText()).some((t) => t.includes('order sheet (F proxy)')) &&
    (await tagText()).some((t) => t.replace(/\s+/g, ' ').includes('Ω₂ = ¼[Ft,ctx, At]')) &&
    !(await tagText()).some((t) => t.includes('[D')) &&
    (await textOf('scenePill')) !== pill0 &&
    (await textOf('hudBig')) !== big0 &&
    ['th1', 'thc', 'psi', 'scene', 'preset', 't'].every((k) => lens[k] === beforeLens[k]) &&
    (await page.getAttribute('#lensToggleBtn', 'aria-pressed')) === 'true'
);
await layout(page, 'gauge lens');
// Q1, T1, T2: under the gauge lens the drawn E₃ is ½ of the ordinary commutator, the magenta sheet is only a proxy of F,
// the refraction arc is ¼[F_{t,ctx}, A_t], the measured cap is the coboundary δF, and the Jacobi tag names its cyclic sum
const flat = (tags) => tags.map((t) => t.replace(/\s+/g, ' ').trim());
for (const lang of ['zh', 'en']) {
  await page.click('[data-lang-set="' + lang + '"]');
  await settle(page);
  for (const [id, want, banned] of [
    ['dyad-orthogonal-relation-span', ['½[A1, A2]'], ['F12', 'F₁₂', '= [A']],
    ['curvature-lie-triple-refraction', [lang === 'zh' ? '换序片（F 示意）' : 'order sheet (F proxy)', 'Ω₂ = ¼[Ft,ctx, At]'], ['[D', '= [F']],
    ['bianchi-jacobi-second-order-cap', ['δF = 0.0000', 'Σcyc[[A, B], C] = 0.0000'], ['DF', '[[A, A], A]']]
  ]) {
    await pick(id);
    const tags = flat(await tagText()),
      big = await textOf('hudBig');
    check(
      lang + ' gauge lens on ' + id + ': ' + want.join(' · '),
      (await state()).lens === 1 &&
        want.every((w) => tags.some((t) => t.includes(w))) &&
        banned.every((b) => tags.every((t) => !t.includes(b))) &&
        (id !== 'bianchi-jacobi-second-order-cap' || (big.includes('δF = 0.0000') && !/\bDF\b/.test(big))),
      JSON.stringify(tags) + ' | ' + big
    );
    if (id === 'bianchi-jacobi-second-order-cap')
      // Q9-2: under the gauge lens the measured δF is named the simplicial coboundary, never Bianchi (the continuum
      // d_A F = 0 stays in the ARGUED box)
      check(
        lang + ' gauge lens on the cap: the stage title names δF the simplicial coboundary, not Bianchi',
        big === (lang === 'zh' ? '单纯上边缘 · δF = 0.0000' : 'SIMPLICIAL COBOUNDARY · δF = 0.0000') && !/Bianchi|比安基/i.test(big),
        big
      );
    if (id === 'curvature-lie-triple-refraction') {
      // Seat 3 Advisory 1: the gauge reading is a structural analogy, and every place that names it says MODEL — the lit
      // half of the lens switch, the scene pill and the curvature title on the stage; the MODEL box keeps the
      // inhomogeneous shift g ∂t(g⁻¹) of A_t under a local gauge transformation
      const named = {
        lens: (await state()).lens,
        pressed: await page.getAttribute('#lensToggleBtn', 'aria-pressed'),
        seg: await page.locator('#lensToggleBtn .seg.on').innerText(),
        pill: await page.locator('#scenePill').innerText(),
        big
      };
      check(
        lang + ' gauge lens names its reading MODEL: the lit half of the lens switch, the scene pill and the curvature stage title',
        named.lens === 1 && named.pressed === 'true' && /MODEL/.test(named.seg) && /MODEL/.test(named.pill) && /MODEL/.test(named.big),
        JSON.stringify(named)
      );
      const modelBox = (await page.locator('#basis .lean.model .' + lang).textContent()).replace(/\s+/g, ' ');
      check(
        lang + ' MODEL box: under a local gauge transformation g(x), A_t shifts inhomogeneously by g ∂t(g⁻¹)',
        modelBox.includes('g ∂t(g⁻¹)') &&
          (lang === 'zh'
            ? modelBox.includes('局部规范变换 g(x) 下，At 多出非齐次的平移项 g ∂t(g⁻¹)，并不协变地变换')
            : modelBox.includes('under a general local gauge transformation g(x), At shifts inhomogeneously by g ∂t(g⁻¹) rather than transforming covariantly')),
        modelBox.slice(modelBox.indexOf('g(x)') - 40, modelBox.indexOf('g(x)') + 120)
      );
      // T7-A2: the identity Ω₂ = ¼[F_{t,ctx}, A_t] is qualified by the chosen constant-connection gauge
      check(
        lang + ' MODEL box: Ω₂ = ¼[F_{t,ctx}, A_t]_Lie holds in the chosen constant-connection gauge A_t = ω₁, A_ctx = ω_ctx',
        lang === 'zh'
          ? modelBox.includes('= ¼[Ft,ctx, At]Lie 只在选定的常值联络规范 At = ω₁、Actx = ωctx 中成立')
          : modelBox.includes('= ¼[Ft,ctx, At]Lie holds in the chosen constant-connection gauge At = ω₁, Actx = ωctx'),
        modelBox.slice(modelBox.indexOf('¼[') - 20, modelBox.indexOf('¼[') + 120)
      );
    }
  }
}
await page.click('#lensToggleBtn');
await settle(page);
{
  const tags = flat(await tagText());
  check(
    'the ontology lens names the cyclic Jacobi sum and the alternating face sum on the cap',
    (await state()).lens === 0 && tags.some((t) => t.includes('cyclic Jacobi sum 0.0000')) && tags.some((t) => t.includes('F₁₂₃ − F₀₂₃ + F₀₁₃ − F₀₁₂ = 0.0000')),
    JSON.stringify(tags)
  );
  // Q9-2: stopping at second order is a choice of the model, and the stage title of the cap says MODEL
  for (const lang of ['zh', 'en']) {
    await page.click('[data-lang-set="' + lang + '"]');
    await settle(page);
    const big = await textOf('hudBig'),
      pill = await textOf('scenePill');
    check(
      lang + ' ontology lens on the cap: the stage title and the scene pill name the second-order choice MODEL',
      (await state()).lens === 0 &&
        (await state()).preset === 'bianchi-jacobi-second-order-cap' &&
        big === (lang === 'zh' ? '二阶选型（MODEL） · δF = 0.0000' : 'SECOND-ORDER CHOICE (MODEL) · δF = 0.0000') &&
        /MODEL/.test(pill) &&
        !/CAP|封顶|Bianchi|比安基/i.test(big),
      big + ' | ' + pill
    );
  }
}
/* Q11-1, Q12-1, Q12-2: the Jacobi card in its three states. At θ₁ = 0 (⏮, or the θ₁ slider) or θ_ctx = 0, a = ω₁ = 0 or
   b = ω_ctx = 0 and all three double brackets [[a, b], c], [[b, c], a], [[c, a], b] are identically 0: the stage draws no
   arrow, only the violet start. At ψ = 0 with θ₁ > 0 and θ_ctx > 0, ω₁ ∥ ω_ctx makes [[a, b], c] = 0 while the other two
   are nonzero and opposite: two antiparallel arrows, and no zero-length one. At θ₁ > 0, θ_ctx > 0 and ψ > 0 (the parked
   60°, 45°, 90° frame) the three magenta arrows are nonzero and return head to tail to the violet start. The HUD line, the
   card note in the rail and its copy in the tour bar say the same on every path: the marked card (parked, ⏮, the rail),
   free play after a slider, and the cited figure with its short sentence. */
/** The three Jacobi terms at θ₁, θ_ctx, ψ (rad), written here: a = θ₁ E₁, b = θ_ctx (cos ψ E₁ + sin ψ E₃), c = (π/2) n₀
    with n₀ the unit sum of E₁, E₂ = (cos ψ, 0, sin ψ) and Ê₃ = E₁ × E_z. */
function jacobiTermsAt(th1, thc, psi) {
  const e1 = [1, 0, 0],
    e2 = [Math.cos(psi), 0, Math.sin(psi)],
    e3hat = crossLC(e1, [0, 0, 1]);
  const a = scale(e1, th1),
    b = scale(e2, thc),
    c = scale(unit(plus(plus(e1, e2), e3hat)), PI / 2);
  return [doubleCross(a, b, c), doubleCross(b, c, a), doubleCross(c, a, b)];
}
/** The arrows and the violet start bead of the next frame, as the page hands them to the solid. */
const drawnArrows = (p = page) =>
  p.evaluate(() => {
    const sc = window.TRV.solids[0],
      P = window.TRV.palette,
      arrows = [],
      starts = [],
      arrow = sc.arrow,
      bead = sc.bead;
    sc.arrow = (a, b, s) => {
      arrows.push({ from: [...a], to: [...b], magenta: !!s && s.color === P.magenta });
      return arrow(a, b, s);
    };
    sc.bead = (q, s) => {
      if (s && s.key === 'jacobiStart') starts.push([...q]);
      return bead(q, s);
    };
    try {
      window.TRV.kit.flush();
    } finally {
      sc.arrow = arrow;
      sc.bead = bead;
    }
    return { arrows, starts };
  });
const CAP = 'bianchi-jacobi-second-order-cap';
const CAP_TEXT = {
  zh: {
    zero: 'θ₁ = 0 或 θctx = 0：雅可比三项本身均为 0；四面体四个面的相位交错相消。',
    collinear: 'ψ = 0°：ω₁ 与 ωctx 共线，首项 [[a, b], c] = 0，其余两项反向相消回到起点；四面体四个面的相位交错相消。',
    live: '雅可比三项首尾相接回到起点；四面体四个面的相位交错相消。',
    noteLive: [
      'θ₁ > 0、θctx > 0 且 ψ > 0°（如停帧的 60°、45°、ψ = 90°）时三支品红箭头 [[a, b], c]、[[b, c], a]、[[c, a], b] 各自不为零',
      '雅可比轮换和为 0.0000',
      '（θ₁ = 0 或 θctx = 0 时三项均为 0；ψ = 0° 共线时首项为 0、其余两项反向相消）'
    ],
    noteZero: ['此刻 θ₁ = 0 或 θctx = 0，雅可比三项 [[a, b], c]、[[b, c], a]、[[c, a], b] 本身均为 0', '没有品红箭头，只剩紫色起点', '雅可比轮换和为 0.0000'],
    hint: '拖琥珀手柄、时间轴或滑块改 θ₁、θctx 与 ψ，换透镜或视角。随时可以再选一张卡。',
    idle: '自由探索：拖琥珀手柄、时间轴或滑块改 θ₁、θctx 与 ψ，换透镜或视角。随时可以再选一张卡。',
    idleZero: ['自由探索：此刻 θ₁ = 0 或 θctx = 0，雅可比三项 [[a, b], c]、[[b, c], a]、[[c, a], b] 本身均为 0，没有品红箭头，只剩紫色起点'],
    idleCollinear: ['自由探索：此刻 ψ = 0°，ω₁ 与 ωctx 共线，首项 [[a, b], c] = 0', '其余两支品红箭头 [[b, c], a]、[[c, a], b] 方向相反，相消回到紫色起点'],
    idleThree: ['自由探索：此刻 θ₁ > 0、θctx > 0 且 ψ > 0°，三支品红箭头 [[a, b], c]、[[b, c], a]、[[c, a], b] 各自不为零，首尾相接回到紫色起点'],
    figLive: '雅可比轮换和 0.0000，四个面的交错和 0.0000。',
    figZero: 'θ₁ = 0：雅可比三项均为 0，四个面的交错和 0.0000。',
    nonzeroClaim: /各自不为零/,
    vanishClaim: /均为 0/
  },
  en: {
    zero: 'θ₁ = 0 or θctx = 0: all three Jacobi terms vanish; the four face phases of the tetrahedron cancel.',
    collinear: 'ψ = 0°: ω₁ and ωctx are collinear, so [[a, b], c] = 0 and the other two opposite terms cancel back to the start; the four face phases of the tetrahedron cancel.',
    live: 'The three Jacobi terms return head to tail to their start; the four face phases of the tetrahedron cancel.',
    noteLive: [
      'for θ₁ > 0, θctx > 0 and ψ > 0° (such as the parked 60°, 45°, ψ = 90° frame) none of the three magenta arrows [[a, b], c], [[b, c], a] and [[c, a], b] is zero',
      'cyclic Jacobi sum 0.0000',
      '(at θ₁ = 0 or θctx = 0 all three terms vanish; at collinear ψ = 0° the first term is 0 and the other two cancel opposite to each other)'
    ],
    noteZero: ['right now θ₁ = 0 or θctx = 0, so all three Jacobi terms [[a, b], c], [[b, c], a] and [[c, a], b] vanish', 'no magenta arrow, only the violet start', 'cyclic Jacobi sum 0.0000'],
    hint: 'Drag the amber handle, the rail or the sliders to set θ₁, θctx and ψ; switch the lens or the view. Pick a card again at any time.',
    idle: 'Free play: drag the amber handle, the rail or the sliders to set θ₁, θctx and ψ; switch the lens or the view. Pick a card again at any time.',
    idleZero: ['Free play: right now θ₁ = 0 or θctx = 0, so all three Jacobi terms [[a, b], c], [[b, c], a] and [[c, a], b] vanish: no magenta arrow, only the violet start'],
    idleCollinear: [
      'Free play: right now ψ = 0°, ω₁ and ωctx are collinear, so the first term [[a, b], c] = 0',
      'the other two magenta arrows [[b, c], a] and [[c, a], b] point opposite ways and cancel back to the violet start'
    ],
    idleThree: ['Free play: right now θ₁ > 0, θctx > 0 and ψ > 0°, so none of the three magenta arrows [[a, b], c], [[b, c], a] and [[c, a], b] is zero, yet they return head to tail to the violet start'],
    figLive: 'Cyclic Jacobi sum 0.0000, alternating face sum 0.0000.',
    figZero: 'θ₁ = 0: all three Jacobi terms are 0, alternating face sum 0.0000.',
    nonzeroClaim: /none of (?:the three|them)[^.;]*zero/,
    vanishClaim: /all three[^.;]*(?:vanish|are 0)/
  }
};
/** The HUD line, the card note in the rail and its copy in the tour bar (one HTML), as read. */
async function capNote(p = page) {
  const text = async (s) => (await p.locator(s).innerText()).replace(/\s+/g, ' ').trim();
  return {
    hud: await textOf('hudSub', p),
    rail: await text('#presetNote'),
    tour: await text('#tour .tour-note'),
    same: (await p.locator('#presetNote').innerHTML()) === (await p.locator('#tour .tour-note').innerHTML())
  };
}
/** Every phrase in both the rail note and its tour-bar copy. */
const inBoth = (n, words) => words.every((w) => n.rail.includes(w) && n.tour.includes(w));
/** No sentence of the HUD or the notes claims what the frame does not show. */
const claims = (re, n) => re.test(n.hud) || re.test(n.rail) || re.test(n.tour);
{
  const langBefore = await currentLang();
  for (const lang of ['zh', 'en']) {
    await setLang(lang);
    const want = CAP_TEXT[lang];
    /** Free play on the Jacobi scene at a frame where all three terms vanish: the regime first, then the hint. */
    const idleZero = (n) => n.hud === want.zero && inBoth(n, [...want.idleZero, want.hint]) && n.rail !== want.idle && !claims(want.nonzeroClaim, n) && n.same;
    check(lang + ' Q11-1: the Jacobi card plays up to 60° and parks', await pick(CAP));
    const m = await state(),
      terms = jacobiTermsAt(m.th1, m.thc, m.psi),
      longest = Math.max(...terms.map(norm)),
      k = Math.min(1, 0.95 / longest),
      drawn = await drawnArrows(),
      J0 = drawn.starts[0] || [NaN, NaN, NaN],
      mag = drawn.arrows.filter((a) => a.magenta);
    // the three arrows are k·[[a, b], c], k·[[b, c], a], k·[[c, a], b] laid head to tail from the violet start
    let at = J0,
      chain = mag.length === 3;
    mag.forEach((a, i) => {
      chain = chain && norm(sub(a.from, at)) < 1e-9 && norm(sub(sub(a.to, a.from), scale(terms[i], k))) < 1e-9;
      at = a.to;
    });
    check(
      lang + ' Q11-1: at θ₁ = 60°, θ_ctx = 45°, ψ = 90° the stage draws three nonzero magenta Jacobi arrows head to tail from the violet start back to it',
      m.scene === 'bianchi' &&
        m.preset === CAP &&
        near(m.th1, STILL, 1e-12) &&
        near(m.thcDeg, 45, 1e-9) &&
        near(m.psiDeg, 90, 1e-9) &&
        terms.every((t) => norm(t) > 0.1) &&
        m.leanInstances.jacobi.lengths.every((l, i) => l > 0.1 && near(l, norm(terms[i]), 1e-12)) &&
        drawn.starts.length === 1 &&
        drawn.arrows.length === 3 &&
        chain &&
        norm(sub(at, J0)) < 1e-9,
      JSON.stringify({ lengths: m.leanInstances.jacobi.lengths, arrows: drawn.arrows, starts: drawn.starts })
    );
    const live = await capNote();
    check(
      lang + ' Q12-2: at 60°, 45°, ψ = 90° the HUD has the head-to-tail line, and the card note (rail and tour bar) qualifies the nonzero arrows by θ₁ > 0, θ_ctx > 0 and ψ > 0°',
      live.hud === want.live && inBoth(live, want.noteLive) && live.same,
      JSON.stringify(live)
    );
    await page.click('#rew');
    await settle(page);
    const z = await state(),
      zeroTerms = jacobiTermsAt(z.th1, z.thc, z.psi),
      zdrawn = await drawnArrows();
    check(
      lang + ' Q11-1: ⏮ sets θ₁ = 0 on the same card; the three Jacobi terms are [0, 0, 0] here and on the page',
      z.th1 === 0 &&
        !z.playing &&
        z.preset === CAP &&
        z.scene === 'bianchi' &&
        (await page.getAttribute(`[data-preset="${CAP}"]`, 'aria-pressed')) === 'true' &&
        zeroTerms.every((t) => norm(t) === 0) &&
        same(z.leanInstances.jacobi.lengths, [0, 0, 0]) &&
        z.leanInstances.jacobi.terms.every((t) => t.every((x) => x === 0)) &&
        z.leanInstances.jacobi.sum === 0,
      JSON.stringify(z.leanInstances.jacobi)
    );
    check(
      lang + ' Q11-1: at θ₁ = 0 the stage draws no arrow, only the violet start where the arrows began',
      zdrawn.arrows.length === 0 && zdrawn.starts.length === 1 && norm(sub(zdrawn.starts[0], J0)) < 1e-12,
      JSON.stringify(zdrawn)
    );
    const noteZero = await capNote();
    check(
      lang + ' Q11-1: at θ₁ = 0 the HUD and the card note (rail and tour bar) say that all three Jacobi terms vanish, and claim no nonzero arrow',
      noteZero.hud === want.zero && inBoth(noteZero, want.noteZero) && !claims(want.nonzeroClaim, noteZero) && noteZero.same,
      JSON.stringify(noteZero)
    );
    // the rail back to 60°: the card is still marked, three arrows grow back and the note returns to the nonzero sentence
    await seek(STILL);
    const back = await drawnArrows(),
      noteBack = await capNote();
    check(
      lang + ' Q11-1: the rail back to 60° restores the three arrows, the head-to-tail HUD line and the qualified note',
      (await state()).preset === CAP && back.arrows.filter((a) => a.magenta).length === 3 && noteBack.hud === want.live && inBoth(noteBack, want.noteLive) && noteBack.same,
      JSON.stringify(noteBack)
    );
    // Q12-1: the θ₁ slider at 0 hands the scene to free play, and the free-play note names the vanishing terms
    await input('#theta1Range', 0);
    const t0 = await state(),
      tdrawn = await drawnArrows(),
      noteT = await capNote();
    check(
      lang + ' Q12-1: the θ₁ slider at 0 on the Jacobi scene: free play, [0, 0, 0], no arrow, only the violet start',
      t0.scene === 'bianchi' &&
        t0.preset === null &&
        t0.th1 === 0 &&
        near(t0.thcDeg, 45, 1e-9) &&
        near(t0.psiDeg, 90, 1e-9) &&
        same(t0.leanInstances.jacobi.lengths, [0, 0, 0]) &&
        tdrawn.arrows.length === 0 &&
        tdrawn.starts.length === 1,
      JSON.stringify({ lengths: t0.leanInstances.jacobi.lengths, drawn: tdrawn })
    );
    check(
      lang + ' Q12-1: after the θ₁ slider the HUD, the free-play note and its tour-bar copy say that all three Jacobi terms vanish, keep the free-play hint and claim no nonzero arrow',
      idleZero(noteT),
      JSON.stringify(noteT)
    );
    // θ_ctx = 0: b = ω_ctx = 0 vanishes the three terms too (the slider hands the stage to free play, the scene stays)
    await pick(CAP);
    await input('#ctxRange', 0);
    const c = await state(),
      cdrawn = await drawnArrows(),
      noteC = await capNote();
    check(
      lang + ' Q11-1: θ_ctx = 0 on the Jacobi scene: free play, [0, 0, 0], no arrow, the violet start, and the HUD says the three terms vanish',
      c.scene === 'bianchi' &&
        c.preset === null &&
        c.thc === 0 &&
        near(c.th1, STILL, 1e-12) &&
        jacobiTermsAt(c.th1, c.thc, c.psi).every((t) => norm(t) === 0) &&
        same(c.leanInstances.jacobi.lengths, [0, 0, 0]) &&
        cdrawn.arrows.length === 0 &&
        cdrawn.starts.length === 1 &&
        noteC.hud === want.zero,
      noteC.hud + ' | ' + JSON.stringify(cdrawn)
    );
    check(
      lang + ' Q12-1: after the θ_ctx slider the HUD, the free-play note and its tour-bar copy say that all three Jacobi terms vanish, keep the free-play hint and claim no nonzero arrow',
      idleZero(noteC),
      JSON.stringify(noteC)
    );
    await layout(page, lang + ' Q11-1 θ_ctx = 0 on the Jacobi scene');
    // ψ = 0 at 60°, 45°: ω₁ ∥ ω_ctx, [[a, b], c] = 0 and the other two terms are nonzero and opposite
    await pick(CAP);
    await input('#planeRange', 0);
    const q = await state(),
      qTerms = jacobiTermsAt(q.th1, q.thc, q.psi),
      qk = Math.min(1, 0.95 / Math.max(...qTerms.map(norm))),
      qdrawn = await drawnArrows(),
      qmag = qdrawn.arrows.filter((a) => a.magenta),
      qvec = qmag.map((a) => sub(a.to, a.from)),
      qstart = qdrawn.starts[0] || [NaN, NaN, NaN],
      noteQ = await capNote();
    check(
      lang + ' Q12-1: ψ = 0 at 60°, 45°: the Jacobi norms are [0, > 0.5, > 0.5] here and on the page, the last two opposite',
      q.scene === 'bianchi' &&
        q.preset === null &&
        near(q.th1, STILL, 1e-12) &&
        near(q.thcDeg, 45, 1e-9) &&
        q.psi === 0 &&
        norm(qTerms[0]) < 1e-12 &&
        qTerms.slice(1).every((t) => norm(t) > 0.5) &&
        norm(plus(qTerms[1], qTerms[2])) < 1e-12 &&
        q.leanInstances.jacobi.lengths[0] < 1e-12 &&
        q.leanInstances.jacobi.lengths.slice(1).every((l) => l > 0.5) &&
        q.leanInstances.jacobi.lengths.every((l, i) => near(l, norm(qTerms[i]), 1e-12)) &&
        q.leanInstances.jacobi.sum < 1e-12,
      JSON.stringify(q.leanInstances.jacobi)
    );
    check(
      lang + ' Q12-1: at ψ = 0 the stage draws exactly two antiparallel magenta arrows, none of zero length, from the violet start back to it',
      qdrawn.arrows.length === 2 &&
        qmag.length === 2 &&
        qvec.every((v) => norm(v) > 1e-9) &&
        qvec.every((v, i) => norm(sub(v, scale(qTerms[i + 1], qk))) < 1e-9) &&
        dot(qvec[0], qvec[1]) / (norm(qvec[0]) * norm(qvec[1])) < -1 + 1e-9 &&
        qdrawn.starts.length === 1 &&
        norm(sub(qmag[0].from, qstart)) < 1e-9 &&
        norm(sub(qmag[1].from, qmag[0].to)) < 1e-9 &&
        norm(sub(qmag[1].to, qstart)) < 1e-9,
      JSON.stringify(qdrawn)
    );
    check(
      lang + ' Q12-1: at ψ = 0 the HUD, the free-play note and its tour-bar copy say that [[a, b], c] = 0 and the other two opposite terms cancel, with the free-play hint; no claim of three nonzero or three vanishing terms',
      noteQ.hud === want.collinear &&
        inBoth(noteQ, [...want.idleCollinear, want.hint]) &&
        !claims(want.nonzeroClaim, noteQ) &&
        !claims(want.vanishClaim, noteQ) &&
        noteQ.same,
      JSON.stringify(noteQ)
    );
    await layout(page, lang + ' Q12-1 ψ = 0 on the Jacobi scene');
    // ψ above 0 again in free play: three arrows, and the free-play note names the head-to-tail state
    await input('#planeRange', 45);
    const h = await state(),
      hdrawn = await drawnArrows(),
      noteH = await capNote();
    check(
      lang + ' Q12-1: ψ = 45° in free play: three nonzero arrows, the head-to-tail HUD line and the free-play note of the three-term state with the hint',
      h.preset === null &&
        h.scene === 'bianchi' &&
        h.leanInstances.jacobi.lengths.every((l) => l > 1e-9) &&
        hdrawn.arrows.filter((a) => a.magenta).length === 3 &&
        noteH.hud === want.live &&
        inBoth(noteH, [...want.idleThree, want.hint]) &&
        noteH.same,
      JSON.stringify(noteH)
    );
    // free play on another scene keeps the plain hint
    await pick(DEFAULT);
    await input('#planeRange', 90);
    const o = await state(),
      noteO = await capNote();
    check(
      lang + ' Q12-1: free play on another scene keeps the plain free-play note',
      o.preset === null && o.scene === 'curve' && noteO.rail === want.idle && noteO.tour === want.idle && noteO.same,
      JSON.stringify(noteO)
    );
  }
  await setLang(langBefore);
}
/* Q12-1: the cited Jacobi figure (?embed=1&preset=…) at 740 × 500 and 334 × 500. The visible ⏮ sets θ₁ = 0 on the same
   card: the HUD and the short tour-bar sentence say that the three Jacobi terms vanish, with no sub- or superscripts; the
   rail back to 60° restores the parked sentence */
for (const lang of ['zh', 'en']) {
  const want = CAP_TEXT[lang];
  for (const [width, height] of [
    [740, 500],
    [334, 500]
  ]) {
    colorScheme = 'dark';
    const label = `${lang}/figure ${width}×${height} Q12-1`;
    const p = await T.open(BOOK, ID, `?embed=1&preset=${CAP}&lang=${lang}`, { viewport: { width, height }, reducedMotion: 'reduce' });
    await settle(p);
    const read = async () => ({ ...(await capNote(p)), tags: await p.locator('#tour .tour-note sub, #tour .tour-note sup').count() });
    const s0 = await state(p),
      n0 = await read(),
      d0 = await drawnArrows(p);
    check(
      label + ': the cited figure parks the Jacobi card at 60° with its short sentence and three arrows',
      (await p.evaluate(() => document.documentElement.hasAttribute('data-figure'))) &&
        s0.preset === CAP &&
        near(s0.th1, STILL, 1e-12) &&
        !s0.playing &&
        n0.hud === want.live &&
        n0.tour === want.figLive &&
        n0.tags === 0 &&
        n0.same &&
        d0.arrows.filter((a) => a.magenta).length === 3,
      JSON.stringify(n0)
    );
    let rewind = null;
    for (const s of ['#rewindBtn', '#rew']) if (!rewind && (await p.locator(s).isVisible())) rewind = s;
    check(label + ': a ⏮ button is visible in the cited frame', !!rewind, String(rewind));
    if (rewind) await p.click(rewind);
    await settle(p);
    const z = await state(p),
      nz = await read(),
      dz = await drawnArrows(p);
    check(
      label + ': ⏮ sets θ₁ = 0 on the same card; the HUD and the tour-bar sentence say that the three Jacobi terms vanish, with no sub- or superscripts and no nonzero claim',
      z.th1 === 0 &&
        !z.playing &&
        z.preset === CAP &&
        same(z.leanInstances.jacobi.lengths, [0, 0, 0]) &&
        dz.arrows.length === 0 &&
        dz.starts.length === 1 &&
        nz.hud === want.zero &&
        nz.tour === want.figZero &&
        nz.tags === 0 &&
        nz.same &&
        !claims(want.nonzeroClaim, nz),
      JSON.stringify(nz)
    );
    await layout(p, label + ' at θ₁ = 0', true);
    await seek(STILL, p);
    const b = await state(p),
      nb = await read(),
      db = await drawnArrows(p);
    check(
      label + ': the rail back to 60° restores the parked sentence, the head-to-tail HUD line and the three arrows',
      b.preset === CAP &&
        near(b.th1, STILL, 1e-12) &&
        nb.hud === want.live &&
        nb.tour === want.figLive &&
        nb.tags === 0 &&
        nb.same &&
        db.arrows.filter((a) => a.magenta).length === 3,
      JSON.stringify(nb)
    );
    await p.context().close();
  }
}
// back on the Jacobi card at its parked frame for the checks below
await pick(CAP);
await pick('curvature-lie-triple-refraction');
{
  const tags = flat(await tagText());
  check('the ontology lens names the order sheet and the Lie triple', tags.some((t) => t === 'order sheet') && tags.some((t) => t.includes('Ω₂ = {ω₁, ωctx, ω₁}')), JSON.stringify(tags));
}
check('the ontology lens is back', (await state()).lens === 0 && same(await tagText(), tags0));
const views = [];
for (const name of CAM_NAMES) {
  await page.click('[data-cam="' + name + '"]');
  await settle(page);
  check('selected view ' + name, (await state()).cam === name && (await page.getAttribute('[data-cam="' + name + '"]', 'aria-pressed')) === 'true');
  await until(page, () => !document.querySelector('#stage').hasAttribute('aria-busy'));
  views.push((await state()).camera);
  await layout(page, 'view ' + name);
}
check('the three views have distinct orientations', new Set(views.map((c) => [c.yaw, c.pitch].join('/'))).size === 3);
/* the amber handle */
await pick(DEFAULT);
await page.locator('#stage').scrollIntoViewIfNeeded();
await settle(page);
const here = await state(),
  hbox = await page.locator('#relHandle').boundingBox();
const from = await page.evaluate(() => DYAD_RELATION_DEBUG.dragTarget(DYAD_RELATION_DEBUG.state.th1));
const to = await page.evaluate(() => DYAD_RELATION_DEBUG.dragTarget(Math.PI / 2));
check('the handle lies on the past state', !!hbox && Math.hypot(hbox.x + hbox.width / 2 - from.x, hbox.y + hbox.height / 2 - from.y) < 1.5);
await page.mouse.move(from.x, from.y);
await page.mouse.down();
await page.mouse.move(to.x, to.y, { steps: 10 });
await page.mouse.up();
await settle(page);
const pulled = await state();
check('dragging the handle sets θ₁ and leaves the camera alone', Math.abs(pulled.th1 - PI / 2) < 0.01 && same(pulled.camera, here.camera) && !pulled.playing && !pulled.preset, String(pulled.th1));
verifyMath(pulled, 'dragged');
await page.locator('#relHandle').focus();
await page.keyboard.press('ArrowRight');
await settle(page);
check('ArrowRight on the handle adds one degree', near((await state()).th1, pulled.th1 + DEG, 1e-9) && !(await state()).playing);
await page.keyboard.press('ArrowLeft');
await page.keyboard.press('ArrowLeft');
await settle(page);
check('ArrowLeft on the handle takes one degree off', near((await state()).th1, pulled.th1 - DEG, 1e-9));
await page.keyboard.press('Home');
await settle(page);
check('Home on the handle goes to θ₁ = 0', (await state()).th1 === 0);
for (const id of Object.keys(CARDS)) check(id + ' plays', await playsAfter(page, () => page.click('[data-preset="' + id + '"]'), () => window.DYAD_RELATION_DEBUG.state));
/* colours, marks and the strip */
for (const id of Object.keys(CARDS)) {
  await pick(id);
  const colors = await primitiveColours(page);
  check(
    id + ' semantic stage colours: amber only on the present',
    colors.seen.filter((x) => x.colors.includes(colors.amber)).every((x) => CURSOR.test(x.key)) &&
      colors.seen.some((x) => x.key === 'present' && x.colors.includes(colors.amber)) &&
      colors.seen.every((x) => !x.colors.includes(colors.ok) && !x.colors.includes(colors.warn))
  );
}
await pick(DEFAULT);
await page.click('[data-cam="panorama"]');
await settle(page);
const marks = await page.evaluate(() => TRV.solids[0].marks().map((m) => [m.key, m.hidden]));
check('the far wall hides the far antipode mark and leaves the present visible', marks.some(([k, h]) => k === 'antiB' && h) && marks.some(([k, h]) => k === 'present' && !h), JSON.stringify(marks));
const prism = await page.evaluate(() => {
  const plot = TRV.kit.plot,
    traces = [];
  let canvas = 0;
  TRV.kit.plot = (...args) => {
    const graph = plot(...args);
    const which = canvas++;
    for (const method of ['line', 'dot', 'vline']) {
      const original = graph[method];
      graph[method] = (...params) => {
        traces.push([which, method, ...params]);
        return original(...params);
      };
    }
    return graph;
  };
  try {
    TRV.kit.flush();
  } finally {
    TRV.kit.plot = plot;
  }
  const { cyan, violet, magenta, amber } = TRV.palette;
  return { traces, cyan, violet, magenta, amber };
});
const m0 = await state();
const lineOf = (which, color) => prism.traces.find(([w, method, pts, c]) => w === which && method === 'line' && c === color && pts.length > 2);
{
  const spacingTrace = lineOf(0, prism.cyan),
    nextTrace = lineOf(0, prism.magenta);
  check('strip 1 samples κ = cos²(θ₁/2) over [0°, 120°]', !!spacingTrace && spacingTrace[2][0][0] === 0 && near(spacingTrace[2].at(-1)[0], 120, 1e-9) && spacingTrace[2].every(([x, v]) => near(v, Math.cos((x * DEG) / 2) ** 2, 1e-12)));
  check(
    'strip 1 samples κ(x_t, x_{t+1}) at the current θ_ctx and ψ',
    !!nextTrace &&
      nextTrace[2].every(([x, v]) => {
        const th = x * DEG,
          phi = th * th * m0.thc * Math.sin(m0.psi);
        return near(v, kap([1, 0, 0, 0], beat(th, m0.thc, m0.psi).xNext), 1e-9) && near(v, (1 + Math.cos(th) * Math.cos(phi)) / 2, 1e-12);
      })
  );
  const energy = lineOf(1, prism.cyan),
    ost = prism.traces.find(([w, method, pts, c]) => w === 1 && method === 'line' && c === prism.magenta),
    residual = lineOf(1, prism.violet);
  check(
    'strip 2: E = p²/2 has a floor, the 4th-order toy H = P₁Q₂ + P₂²/2 is the line H = P₁ on Q₂ = 1, P₂ = 0, the residual is 0',
    !!energy &&
      !!ost &&
      !!residual &&
      energy[2].every(([p, v]) => near(v, (p * p) / 2, 1e-12) && v >= 0) &&
      ost[2].every(([p, v]) => near(v, p, 1e-12)) &&
      Math.min(...ost[2].map(([, v]) => v)) < -2 &&
      residual[2].every(([, v]) => v === 0)
  );
  for (const which of [0, 1]) {
    const cursors = prism.traces.filter(([w, method, ...rest]) => w === which && (method === 'dot' || method === 'vline') && rest.includes(prism.amber));
    const x = which === 0 ? m0.th1Deg : m0.th1;
    check(`strip ${which + 1}: one amber cursor and dot at the current θ₁`, cursors.length === 2 && cursors.every((row) => near(row[2], x, 1e-12)));
  }
}
{
  const title = await textOf('plotTitleB'),
    meta = await textOf('plotMetaB'),
    aria = await page.getAttribute('#plotB', 'aria-label');
  check(
    'strip 2 names the non-degenerate higher-derivative toy (4th-order EOM) and its slice, not third order',
    /non-degenerate higher-derivative toy \(4th-order EOM\)|非退化高阶玩具（四阶方程）/.test(title) && !/third|三阶/i.test(title) && /Q₂ = 1, P₂ = 0/.test(meta) && /4th-order EOM|四阶方程/.test(aria) && /Q₂ = 1(、|, )P₂ = 0/.test(aria) && !/third|三阶/i.test(aria),
    title + ' | ' + meta + ' | ' + aria
  );
}
// arch-1: the violet y = 0 reference of strip 2 is the discrete cyclic Jacobi sum and the tetrahedral δF = 0; the title, the
// legend and the description never call it Bianchi = 0 (the continuum d_A F = 0 stays in the ARGUED box and the drawer)
{
  const langBefore = await currentLang();
  const bianchi = /Bianchi|比安基/;
  for (const lang of ['zh', 'en']) {
    await setLang(lang);
    const key = await page.evaluate(() => {
      const plot = TRV.kit.plot,
        legends = [];
      let canvas = 0;
      TRV.kit.plot = (...args) => {
        const graph = plot(...args),
          which = canvas++,
          original = graph.legend;
        graph.legend = (items, ...rest) => {
          legends.push([which, items.map((item) => item.slice(0, 2))]);
          return original(items, ...rest);
        };
        return graph;
      };
      try {
        TRV.kit.flush();
      } finally {
        TRV.kit.plot = plot;
      }
      return { legends, violet: TRV.palette.violet, magenta: TRV.palette.magenta };
    });
    const title = await page.locator('#plotTitleB').textContent();
    const stripB = key.legends.find(([w]) => w === 1);
    const violetLabel = ((stripB && stripB[1]) || []).find(([c]) => c === key.violet),
      magentaLabel = ((stripB && stripB[1]) || []).find(([c]) => c === key.magenta);
    check(
      lang + ' strip 2: the title and the violet legend name the cyclic Jacobi sum and the tetrahedral δF = 0, not Bianchi = 0; the magenta legend names the non-degenerate higher-derivative toy',
      title.includes(lang === 'zh' ? '雅可比轮换和与四面体 δF = 0' : 'cyclic Jacobi & tetrahedral δF = 0') &&
        !bianchi.test(title) &&
        !!violetLabel &&
        violetLabel[1] === (lang === 'zh' ? '雅可比轮换和、四面体 δF = 0' : 'cyclic Jacobi, tetrahedral δF = 0') &&
        !bianchi.test(violetLabel[1]) &&
        // Q7-A1: the magenta line is named the non-degenerate higher-derivative toy, in the title and the legend
        title.includes(lang === 'zh' ? '非退化高阶玩具（四阶方程）无能量下界' : 'non-degenerate higher-derivative toy (4th-order EOM): no floor') &&
        // Q9-2: the strip title names stopping at second order a choice of the model
        title.startsWith(lang === 'zh' ? '二阶选型（MODEL）：' : 'Second-order choice (MODEL): ') &&
        !!magentaLabel &&
        magentaLabel[1] === (lang === 'zh' ? '非退化高阶玩具 H = P₁' : 'non-degenerate higher-derivative toy H = P₁'),
      title + ' | ' + JSON.stringify(key.legends)
    );
  }
  await setLang(langBefore);
  const tag = /<canvas id="plotB"[^>]*>/.exec(sources['index.html']);
  const attr = (name) => (tag && new RegExp(`${name}="([^"]*)"`).exec(tag[0])?.[1]) || '';
  check(
    'strip 2 description: the violet y = 0 reference line is the cyclic Jacobi sum and the tetrahedral δF = 0, in both languages',
    attr('aria-label').includes('紫色参考线 y = 0 是雅可比轮换和与四面体 δF = 0') &&
      attr('data-aria-en').includes('the violet reference line y = 0 is the cyclic Jacobi sum and the tetrahedral δF = 0') &&
      !bianchi.test(attr('aria-label') + attr('data-aria-en')) &&
      !/Bianchi = 0|alternating Bianchi|比安基与雅可比|比安基交错和/.test(sources['main.js']),
    attr('aria-label') + ' | ' + attr('data-aria-en')
  );
}
/** Strip 2 as painted: the least gap (px) between the three legend rows (each row's key stroke and the ink box of its
    text, as the canvas draws them) and the curves E = p²/2 (cyan) and H = P₁ (magenta), each a 2 px stroke; and how the
    title wraps. The two curves are written here; the page gives only its axis map and the boxes it paints. */
async function stripBHeadroom(p) {
  return p.evaluate(() => {
    const plot = TRV.kit.plot;
    let canvas = 0,
      gap = Infinity,
      boxes = [];
    TRV.kit.plot = (...args) => {
      const g = plot(...args);
      if (canvas++ !== 1) return g;
      const legend = g.legend;
      g.legend = (...rest) => {
        const ctx = g.ctx,
          fill = ctx.fillText,
          move = ctx.moveTo,
          line = ctx.lineTo;
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
        for (const b of boxes)
          for (let x = Math.max(b.l, g.pl); x <= Math.min(b.r, g.pl + g.iw); x += 0.5) {
            const v = g.invX(x);
            for (const y of [(v * v) / 2, v]) {
              const c = g.Y(y);
              gap = Math.min(gap, c - 1 > b.b ? c - 1 - b.b : c + 1 < b.t ? b.t - c - 1 : -1);
            }
          }
      };
      return g;
    };
    try {
      TRV.kit.flush();
    } finally {
      TRV.kit.plot = plot;
    }
    const h2 = document.querySelector('#plotTitleB'),
      pieces = [...h2.querySelectorAll('.nb')].map((s) => ({ text: s.textContent, tops: [...new Set([...s.getClientRects()].map((r) => Math.round(r.top)))] })),
      lines = [...new Set(pieces.map((s) => s.tops[0]))].map((top) => pieces.filter((s) => s.tops[0] === top).map((s) => s.text));
    return {
      gap,
      rows: boxes.filter((b) => b.text !== 'key').map((b) => b.text),
      keys: boxes.filter((b) => b.text === 'key').length,
      canvas: document.querySelector('#plotB').clientHeight,
      title: h2.textContent,
      lines,
      whole: pieces.every((s) => s.tops.length === 1),
      // the pieces are spans inside the heading: they keep its face, size and colour (the theme sets the formula span of
      // a strip heading in the data face, dimmed)
      same: [...h2.querySelectorAll('.nb')].every((s) => ['fontFamily', 'fontSize', 'fontWeight', 'letterSpacing', 'color'].every((k) => getComputedStyle(s)[k] === getComputedStyle(h2)[k])),
      overflow: h2.scrollWidth > h2.clientWidth + 0.5
    };
  });
}
/** The headroom and title checks of strip 2 at one size and language. */
function stripBChecks(label, s) {
  check(label + ' strip 2: the three legend rows sit in open headroom, ≥ 3 px clear of the cyan E = p²/2 and the magenta H = P₁', s.rows.length === 3 && s.keys === 3 && s.gap >= 3, JSON.stringify(s));
  check(
    label + ' strip 2: the title breaks only between whole pieces (hyphenated words, δF = 0, the bracket) set in the face and colour of the title, fits its width and leaves no lone piece on its last line',
    s.whole && s.same && !s.overflow && s.lines.length >= 1 && (s.lines.length === 1 || s.lines.at(-1).length >= 2) && s.lines.flat().join('').replace(/\s/g, '') === s.title.replace(/\s/g, ''),
    JSON.stringify(s.lines)
  );
}
{
  const langBefore = await currentLang();
  for (const lang of ['zh', 'en']) {
    await setLang(lang);
    stripBChecks(lang + ' desktop', await stripBHeadroom(page));
  }
  await setLang(langBefore);
}
/** T11-1: the strip of the whole lab embedded in a chapter (?embed=1 without a preset). The shared theme gives an embedded
    strip a fixed 160 px; at 601–1080 px the two plots are stacked 170 px each, so that height cut #plot short and pushed
    #plotB out of the strip, and wider frames squeezed the wrapped title of strip 2. The strip holds both canvases whole
    (≥ 118 px each, side by side or stacked, the panels apart), ends above the rail, and the legend of strip 2 stays ≥ 3 px
    clear of E = p²/2; the stage row and the tour bar of the first screen are untouched, the strip follows below them. */
async function stripEmbedChecks(p, label, { firstScreen = false, belowFold = false } = {}) {
  await p.evaluate(() => scrollTo(0, 0));
  await settle(p);
  const g = await p.evaluate(() => {
    const box = (el) => {
      const b = el.getBoundingClientRect();
      return { l: b.left, r: b.right, t: b.top + scrollY, b: b.bottom + scrollY, h: b.height, w: b.width };
    };
    const q = (s) => box(document.querySelector(s));
    const center = document.querySelector('.lab .center');
    return {
      vh: innerHeight,
      vw: innerWidth,
      doc: document.documentElement.scrollHeight,
      stage: q('#stage'),
      tour: q('#tour'),
      strip: q('.strip'),
      rail: q('footer.rail'),
      now: q('#now'),
      plot: q('#plot'),
      plotB: q('#plotB'),
      panels: [...document.querySelectorAll('.strip .panel')].map(box),
      heads: [...document.querySelectorAll('.strip .panel .head')].map(box),
      rows: [...center.children].filter((el) => getComputedStyle(el).display !== 'none').map((el) => el.id || el.className),
      embed: document.documentElement.hasAttribute('data-embed'),
      figure: document.documentElement.hasAttribute('data-figure')
    };
  });
  const area = (a, b) => Math.max(0, Math.min(a.r, b.r) - Math.max(a.l, b.l)) * Math.max(0, Math.min(a.b, b.b) - Math.max(a.t, b.t));
  const inside = (a, b) => a.l >= b.l - 1 && a.r <= b.r + 1 && a.t >= b.t - 1 && a.b <= b.b + 1;
  const [pa, pb] = g.panels,
    [ha, hb] = g.heads;
  check(
    label + ' T11-1: the strip holds #plot and #plotB whole, each ≥ 118 px tall under its heading, the two panels apart, and ends above the rail',
    g.embed &&
      !g.figure &&
      g.panels.length === 2 &&
      g.strip.b >= g.plotB.b - 1 &&
      g.strip.b >= g.plot.b - 1 &&
      g.plot.h >= 118 &&
      g.plotB.h >= 118 &&
      inside(g.plot, pa) &&
      inside(g.plotB, pb) &&
      inside(pa, g.strip) &&
      inside(pb, g.strip) &&
      g.plot.t >= ha.b - 1 &&
      g.plotB.t >= hb.b - 1 &&
      area(pa, pb) === 0 &&
      area(g.plot, g.plotB) === 0 &&
      g.strip.b <= g.rail.t + 0.5,
    JSON.stringify(g)
  );
  // the stage keeps the embed track clamp(280px, 100vh − 150px, 520px); the tour bar follows it, then the strip, then the
  // rail with the clock; where asked, stage and tour bar fill the first screen and the strip runs on below the fold
  const track = Math.max(280, Math.min(g.vh - 150, 520));
  check(
    label +
      ' T11-1: rows of the middle column: stage (embed track kept), tour bar, strip; the rail and its clock follow' +
      (firstScreen ? '; stage and tour bar stay in the first screen' : '') +
      (belowFold ? ', the strip runs on below the fold of the scrolling frame' : ''),
    same(g.rows, ['stage', 'tour', 'strip']) &&
      Math.abs(g.stage.h - track) <= 1 &&
      g.stage.b <= g.tour.t + 0.5 &&
      g.tour.b <= g.strip.t + 0.5 &&
      g.rail.t >= g.strip.b - 0.5 &&
      g.now.w > 0.4 * g.rail.w &&
      inside(g.now, g.rail) &&
      (!firstScreen || (g.stage.t >= 0 && g.tour.b <= g.vh + 0.5)) &&
      (!belowFold || (g.strip.t < g.vh && g.strip.b > g.vh && g.doc > g.vh)),
    JSON.stringify({ track, rows: g.rows, stage: g.stage, tour: g.tour, strip: g.strip, rail: g.rail, now: g.now, vh: g.vh, doc: g.doc })
  );
  stripBChecks(label, await stripBHeadroom(p));
}
const badColors = await domColours(page);
check('semantic badge and readout colours', !badColors.length, badColors.slice(0, 3).join(' | '));
for (const id of ['#plot', '#plotB']) {
  const am = await stripAmber(page, id);
  check(id + ': the amber strip cursor is narrow and spans the plot', am.n > 10 && am.width < 12 * am.dpr && am.height > am.h * 0.45, JSON.stringify(am));
}

/* narrow pages, cited figures and stills */
const MIRROR_KEEP = ['th1', 'thc', 'psi', 'scene', 'preset', 't'];
/** Q5-adv-2, Q6-1: wherever the rail with the lens switch sits below the first screen (a phone, a narrow window, the whole
    lab embedded in a chapter without a preset), the tour bar right under the stage carries the mirror lens button. It
    fits its row without overlap, clipping or horizontal overflow, flips the same lens as the rail switch, names the
    gauge reading MODEL, and the two switches stay in step both ways. `railGap` is the least drop from the button to
    the rail. */
async function mirrorLens(p, lang, label, railGap) {
  await p.evaluate(() => scrollTo(0, 0));
  const geo = await p.evaluate(() => {
    const box = (s) => {
      const b = document.querySelector(s).getBoundingClientRect();
      return { l: b.left, r: b.right, t: b.top + scrollY, b: b.bottom + scrollY };
    };
    const clip = (el) => el.scrollWidth > el.clientWidth + 0.5 || el.scrollHeight > el.clientHeight + 0.5;
    const btn = document.querySelector('#mobileLensBtn'),
      tour = document.querySelector('#tour'),
      note = document.querySelector('#tour .tour-note');
    return {
      btn: box('#mobileLensBtn'),
      stage: box('#stage'),
      tour: box('#tour'),
      row: [box('#prevBtn'), box('#tour .what b'), box('#nextBtn'), ...(note && note.getClientRects().length ? [box('#tour .tour-note')] : [])],
      rail: box('#rail'),
      clipped: clip(btn),
      nameClipped: clip(document.querySelector('#tour .what b')),
      tourOverflow: tour.scrollWidth > tour.clientWidth + 0.5,
      name: btn.getAttribute('aria-label'),
      text: btn.innerText.trim(),
      vw: innerWidth,
      vh: innerHeight,
      docW: document.documentElement.scrollWidth
    };
  });
  const meet = (a, b) => a.l < b.r - 0.5 && b.l < a.r - 0.5 && a.t < b.b - 0.5 && b.t < a.b - 0.5;
  check(
    label + ' the mirror lens button is visible in the tour bar right under the stage, far above the rail',
    (await p.locator('#mobileLensBtn').isVisible()) &&
      geo.btn.t >= geo.stage.b - 0.5 &&
      geo.btn.t - geo.stage.b < 60 &&
      geo.btn.b <= geo.vh &&
      geo.btn.l >= geo.tour.l - 0.5 &&
      geo.btn.r <= geo.tour.r + 0.5 &&
      geo.btn.t >= geo.tour.t - 0.5 &&
      geo.btn.b <= geo.tour.b + 0.5 &&
      geo.rail.t > geo.vh &&
      geo.rail.t - geo.btn.b > railGap,
    JSON.stringify(geo)
  );
  check(
    label + ' the mirror lens button fits its row: no overlap with ◀, the card name, ▶ or the note, no clipped text, no horizontal overflow',
    geo.row.every((b) => !meet(geo.btn, b)) &&
      !geo.clipped &&
      !geo.nameClipped &&
      !geo.tourOverflow &&
      geo.btn.r - geo.btn.l < 0.25 * geo.vw &&
      geo.docW <= geo.vw &&
      (await overflowX(p)) === 0 &&
      geo.text === (lang === 'zh' ? '透镜' : 'LENS') &&
      geo.name === (lang === 'zh' ? '切换双透镜' : 'Switch lens'),
    JSON.stringify(geo)
  );
  const before = await state(p),
    pill0 = await textOf('scenePill', p),
    pressed = () => Promise.all(['#mobileLensBtn', '#lensToggleBtn'].map((s) => p.getAttribute(s, 'aria-pressed')));
  await p.click('#mobileLensBtn');
  await settle(p);
  const on = await state(p);
  check(
    label + ' the mirror lens button switches to the gauge lens, syncs both switches and keeps the experiment',
    before.lens === 0 && on.lens === 1 && same(await pressed(), ['true', 'true']) && (await textOf('scenePill', p)) !== pill0 && MIRROR_KEEP.every((k) => same(on[k], before[k])),
    JSON.stringify({ before: before.lens, on: on.lens, pressed: await pressed() })
  );
  const gauge = {
    seg: await p.locator('#lensToggleBtn .seg.on .' + lang).textContent(),
    pill: await p.locator('#scenePill').textContent(),
    big: await textOf('hudBig', p)
  };
  check(
    label + ' the gauge lens reached from the mirror button is named MODEL on the rail switch, the scene pill and (curvature) the stage title',
    /MODEL/.test(gauge.seg) && /MODEL/.test(gauge.pill) && (on.scene !== 'curve' || /MODEL/.test(gauge.big)),
    JSON.stringify(gauge)
  );
  await layout(p, label + ' gauge lens from the mirror button');
  await p.click('#mobileLensBtn');
  await settle(p);
  const off = await state(p);
  check(
    label + ' the mirror lens button switches back to the ontology lens',
    off.lens === 0 && same(await pressed(), ['false', 'false']) && (await textOf('scenePill', p)) === pill0 && MIRROR_KEEP.every((k) => same(off[k], before[k])),
    JSON.stringify(await pressed())
  );
  await p.click('#lensToggleBtn');
  await settle(p);
  check(label + ' the rail switch keeps the mirror button in step', (await state(p)).lens === 1 && same(await pressed(), ['true', 'true']));
  await p.click('#lensToggleBtn');
  await settle(p);
  check(label + ' both switches back to the ontology lens', (await state(p)).lens === 0 && same(await pressed(), ['false', 'false']));
  await p.evaluate(() => scrollTo(0, 0));
}
const FIGURE_TEXT = {
  'dyad-orthogonal-relation-span': ['0.7500'],
  'first-order-zeno-vs-transport': ['0.7500'],
  'second-order-free-heap-geodesic': ['0.7500', '0.2500'],
  // Q12-adv-1: the cited curvature frame names the θ₁ of its numbers
  'curvature-lie-triple-refraction': ['θ₁ = 60°', '0.8613', '49.35°', '0.6629'],
  'bianchi-jacobi-second-order-cap': ['0.0000']
};
for (const lang of ['zh', 'en']) {
  for (const [width, height, figure] of [
    [390, 844, false],
    [334, 500, true],
    [740, 500, true]
  ]) {
    colorScheme = width === 390 ? 'light' : 'dark';
    const p = await T.open(BOOK, ID, '?lang=' + lang + (figure ? '&embed=1&preset=' + DEFAULT : ''), { viewport: { width, height }, reducedMotion: 'reduce' });
    await settle(p);
    // T9-A1: ▶ of the tour bar steps through the cards and wraps around, so five steps from any card visit all five
    const visited = new Set();
    for (let j = 0; j < Object.keys(CARDS).length; j++) {
      const s = await state(p),
        id = s.preset;
      visited.add(id);
      check(lang + '/' + width + '/' + id + ' under reduced motion the card parks on its still', near(s.th1, STILL, 1e-12) && !s.playing && !s.blending);
      await layout(p, lang + '/' + width + '/' + id, figure);
      if (figure && width === 740 && id === 'curvature-lie-triple-refraction') {
        // the crowded 740 × 500 frame: every label takes the free place nearest its anchor, so none is pushed across
        // the stage (ω_ctx once fell 220 px down the column, far from its white arrow, before any side step was tried)
        const shifts = await p.evaluate(() =>
          [...document.querySelectorAll('.stage .tags .tag:not([hidden])')].map((el) => {
            const [tx = 0, ty = 0] = (el.style.translate || '').trim().split(/\s+/).map((v) => parseFloat(v) || 0);
            return { text: el.innerText.trim(), tx, ty, d: Math.hypot(tx, ty) };
          })
        );
        check(
          lang + '/740 ' + id + ': every label stays within 110 px of its anchor (ω_ctx included)',
          shifts.length > 0 && shifts.some((s) => s.text === 'ωctx') && shifts.every((s) => s.d <= 110),
          JSON.stringify(shifts)
        );
      }
      if (lang === 'en') check('English ' + width + '/' + id, !(await cjkLeftovers(p)).length);
      if (!figure) {
        // the phone (390 × 844): on every card the stage keeps ≥ 440 px and the mirror lens button in the tour bar ends
        // inside the first screen, though the English header is taller and an English card name wraps to three lines
        const fold = await p.evaluate(() => {
          const b = document.querySelector('#mobileLensBtn').getBoundingClientRect();
          return { bottom: b.bottom + scrollY, stage: document.querySelector('#stage').getBoundingClientRect().height, vh: innerHeight };
        });
        check(
          lang + '/390/' + id + ': the stage keeps ≥ 440 px and the mirror lens button ends inside the first screen (bottom ≤ innerHeight)',
          (await p.locator('#mobileLensBtn').isVisible()) && fold.stage >= 440 && fold.bottom <= fold.vh,
          JSON.stringify(fold)
        );
      }
      if (figure) {
        check('cited frame hides the strip ' + id, (await p.locator('.strip').isHidden()) && (await p.locator('.tour .tour-note').isVisible()));
        const note = await p.locator('.tour .tour-note').innerText();
        check(lang + ' figure note of ' + id + ' states the still numbers', FIGURE_TEXT[id].every((x) => note.includes(x)), note);
        check(lang + ' figure note of ' + id + ' has no sub- or superscripts', (await p.locator('.tour .tour-note sub, .tour .tour-note sup').count()) === 0);
      }
      await p.locator('.tour [data-tour="next"]').click();
      await settle(p);
    }
    check(lang + '/' + width + ' the loop lays out all five cards', visited.size === 5 && Object.keys(CARDS).every((id) => visited.has(id)), JSON.stringify([...visited]));
    if (figure) check(lang + '/' + width + ' cited figure hides the mirror lens button', await p.locator('#mobileLensBtn').isHidden());
    if (width === 390) {
      // Q5-adv-2: on a phone the rail with the lens switch sits below the evidence, thousands of pixels down; the tour bar
      // under the stage carries a mirror lens button that fits the 390 px row and flips the same lens. Five steps of ▶
      // bring the loop back to the default curvature card, where the checks run as a reader first meets the page
      check(lang + '/390 the loop ends on the default curvature card', (await state(p)).preset === DEFAULT, (await state(p)).preset);
      await mirrorLens(p, lang, lang + '/390', 1000);
      stripBChecks(lang + '/390', await stripBHeadroom(p));
      await p.evaluate(() => scrollTo(0, 0));
      for (const yaw of [-Math.PI / 2, Math.PI / 2]) {
        await p.evaluate((y) => {
          TRV.kit.pause();
          TRV.solids[0].cam.yaw = y;
          TRV.kit.flush();
        }, yaw);
        await layout(p, lang + ' edge-on phone view ' + yaw);
      }
    }
    await p.context().close();
  }
  // Q6-1: the chapter embeds the whole lab as ?embed=1 without a preset (data-embed, no data-figure). In that frame the
  // rail with the lens switch also sits below the first screen, so the tour bar shows the mirror lens button; a cited
  // figure of the same size (?embed=1&preset=…, data-figure) keeps it hidden
  for (const width of [390, 740]) {
    colorScheme = 'dark';
    const p = await T.open(BOOK, ID, '?embed=1&lang=' + lang, { viewport: { width, height: 620 }, reducedMotion: 'reduce' });
    await settle(p);
    const attrs = await p.evaluate(() => ({ embed: document.documentElement.hasAttribute('data-embed'), figure: document.documentElement.hasAttribute('data-figure') }));
    check(lang + '/embed ' + width + '×620 is the whole lab embed: data-embed without data-figure', attrs.embed && !attrs.figure, JSON.stringify(attrs));
    // the curvature card, where the stage title also carries MODEL under the gauge lens
    check(lang + '/embed ' + width + '×620 parks the curvature card', (await pick(DEFAULT, p)) && (await state(p)).scene === 'curve');
    await layout(p, lang + '/embed ' + width + '×620');
    await mirrorLens(p, lang, lang + '/embed ' + width + '×620', 200);
    await stripEmbedChecks(p, lang + '/embed ' + width + '×620', { firstScreen: width === 740, belowFold: width === 740 });
    await p.context().close();
    const f = await T.open(BOOK, ID, '?embed=1&preset=' + DEFAULT + '&lang=' + lang, { viewport: { width, height: 620 }, reducedMotion: 'reduce' });
    await settle(f);
    check(
      lang + '/figure ' + width + '×620 cited figure keeps the mirror lens button hidden',
      (await f.evaluate(() => document.documentElement.hasAttribute('data-figure') && getComputedStyle(document.querySelector('#mobileLensBtn')).display === 'none')) &&
        (await f.locator('#mobileLensBtn').isHidden())
    );
    await f.context().close();
  }
  // A7-1: an external page may give the whole-lab embed a frame wider than 1080 px; the mirror lens button still shows in
  // the tour bar, fits its row and flips the same lens as the rail switch
  {
    colorScheme = 'dark';
    const p = await T.open(BOOK, ID, '?embed=1&lang=' + lang, { viewport: { width: 1280, height: 760 }, reducedMotion: 'reduce' });
    await settle(p);
    const geo = await p.evaluate(() => {
      const box = (s) => {
        const b = document.querySelector(s).getBoundingClientRect();
        return { l: b.left, r: b.right, t: b.top, b: b.bottom };
      };
      const btn = document.querySelector('#mobileLensBtn'),
        tour = document.querySelector('#tour');
      return {
        embed: document.documentElement.hasAttribute('data-embed'),
        figure: document.documentElement.hasAttribute('data-figure'),
        display: getComputedStyle(btn).display,
        btn: box('#mobileLensBtn'),
        tour: box('#tour'),
        row: [box('#prevBtn'), box('#tour .what b'), box('#nextBtn')],
        clipped: btn.scrollWidth > btn.clientWidth + 0.5,
        tourOverflow: tour.scrollWidth > tour.clientWidth + 0.5,
        vw: innerWidth
      };
    });
    const meet = (a, b) => a.l < b.r - 0.5 && b.l < a.r - 0.5 && a.t < b.b - 0.5 && b.t < a.b - 0.5;
    check(
      lang + '/embed 1280×760: the whole-lab embed wider than 1080 px shows the mirror lens button in the tour bar, fitting its row',
      geo.vw > 1080 &&
        geo.embed &&
        !geo.figure &&
        geo.display !== 'none' &&
        (await p.locator('#mobileLensBtn').isVisible()) &&
        geo.btn.l >= geo.tour.l - 0.5 &&
        geo.btn.r <= geo.tour.r + 0.5 &&
        geo.btn.t >= geo.tour.t - 0.5 &&
        geo.btn.b <= geo.tour.b + 0.5 &&
        geo.row.every((b) => !meet(geo.btn, b)) &&
        !geo.clipped &&
        !geo.tourOverflow,
      JSON.stringify(geo)
    );
    const pressed = () => Promise.all(['#mobileLensBtn', '#lensToggleBtn'].map((s) => p.getAttribute(s, 'aria-pressed')));
    await p.click('#mobileLensBtn');
    await settle(p);
    check(lang + '/embed 1280×760: the mirror lens button switches to the gauge lens and syncs the rail switch', (await state(p)).lens === 1 && same(await pressed(), ['true', 'true']));
    await layout(p, lang + '/embed 1280×760 gauge lens from the mirror button');
    await p.click('#mobileLensBtn');
    await settle(p);
    check(lang + '/embed 1280×760: the mirror lens button switches back', (await state(p)).lens === 0 && same(await pressed(), ['false', 'false']));
    await stripEmbedChecks(p, lang + '/embed 1280×760', { firstScreen: true });
    await p.context().close();
  }
  for (const id of Object.keys(CARDS)) {
    const p = await openStill(T, BOOK, ID, id, lang);
    const m = await state(p);
    await verifyCard(p, id);
    check('still ' + lang + '/' + id + ' parks on the declared frame', !m.playing && near(m.t, STILL, 1e-12) && near(Number(await p.getAttribute(`[data-preset="${id}"]`, 'data-still')), STILL, 1e-12) && (await p.locator('#relHandle').isHidden()));
    check('still ' + lang + '/' + id + ' hides the mirror lens button', await p.locator('#mobileLensBtn').isHidden());
    const want = {
      'dyad-orthogonal-relation-span': () => f4(m.dyad.norm2) === '0.7500' && f4(m.dyad.dot31) === '0.0000',
      'first-order-zeno-vs-transport': () => f4(m.kPrevNow) === '0.7500',
      'second-order-free-heap-geodesic': () => f4(m.kPrevNow) === '0.7500' && f4(m.kNowFree) === '0.7500' && f4(m.kPrevFree) === '0.2500',
      'curvature-lie-triple-refraction': () => f4(m.phi) === '0.8613' && f2(m.phiDeg) === '49.35' && f4(m.kNowNext) === '0.6629',
      'bianchi-jacobi-second-order-cap': () => f4(m.leanInstances.jacobi.sum) === '0.0000' && f4(Math.abs(m.leanInstances.tetra.alternating)) === '0.0000'
    }[id];
    check('still ' + lang + '/' + id + ' shows the numbers of its caption', want());
    await p.context().close();
  }
}
check('permanent dark console in both system schemes', !paletteMutations.length && paletteDocuments.every((x) => x.absent) && paletteDocuments.some((x) => x.dark) && paletteDocuments.some((x) => !x.dark));
check('zero console warnings', browserWarnings.length === 0, browserWarnings.slice(0, 3).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('zero browser or request errors', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));
await T.finish();
