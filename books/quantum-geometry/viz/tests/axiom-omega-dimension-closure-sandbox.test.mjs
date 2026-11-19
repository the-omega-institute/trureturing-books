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
const ID = 'axiom-omega-dimension-closure-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const THEORY =
  'ch39-s24-axiom-omega-origin-free-ternary-comparison-closure.html#sec-ch39-axiom-omega-origin-free-ternary-comparison-closure';
const SECTION = '39.1';
const CARDS = {
  'origin-free-ternary-bridge': { focus: 'bridge', b: 1, eps: 60, kernel: 'mother', cam: 'cutaway' },
  'dimension-sieve-1d-2d-deadlock': { focus: 'sieve2', b: 1, eps: 60, kernel: 'mother', cam: 'panorama' },
  'three-sphere-noncompact-elimination': { focus: 'sieve3', b: 1, eps: 60, kernel: 'mother', cam: 'panorama' },
  'peter-weyl-rank-five-kernel': { focus: 'kernel', b: 1, eps: 60, kernel: 'mother', cam: 'panorama' },
  'cartan-three-form-closed-field': { focus: 'field', b: 1, eps: 60, kernel: 'mother', cam: 'cutaway' }
};
const DEFAULT = 'origin-free-ternary-bridge';
const GIDS = [
  'D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel',
  'D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization',
  'D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight',
  'D5/S3/QuantumBounds/GramRealizability.gram_realizability',
  'D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula',
  'D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff',
  'D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences',
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  'D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum',
  'D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact',
  'D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness'
];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const f4 = (v) => (Math.abs(v) < 5e-5 ? 0 : v).toFixed(4);

/* ---------- independent mathematics, written here and never calling the page ---------- */
const PI = Math.PI,
  DEG = PI / 180;
/* unit quaternions as 2 × 2 complex matrices q ↦ w I − i(x σ₁ + y σ₂ + z σ₃), entries [re, im] */
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const mm = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce((s, x, k) => [s[0] + cmul(x, B[k][j])[0], s[1] + cmul(x, B[k][j])[1]], [0, 0])));
const dag = (A) => A[0].map((_, j) => A.map((row) => [row[j][0], -row[j][1]]));
const toM = ([w, x, y, z]) => [
  [[w, -z], [-y, -x]],
  [[y, -x], [w, z]]
];
const fromM = (M) => [(M[0][0][0] + M[1][1][0]) / 2, -(M[0][1][1] + M[1][0][1]) / 2, (M[1][0][0] - M[0][1][0]) / 2, (M[1][1][1] - M[0][0][1]) / 2];
const heapM = (x, y, z) => fromM(mm(mm(toM(x), dag(toM(y))), toM(z)));
const dist4 = (a, b) => Math.hypot(...a.map((x, i) => x - b[i]));
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
/** slerp on S³ (the standard sin-weighted formula) */
function slerp(p, q, t) {
  const c = Math.max(-1, Math.min(1, dot(p, q))),
    om = Math.acos(c);
  if (om < 1e-12) return p.slice();
  return p.map((x, i) => (Math.sin((1 - t) * om) * x + Math.sin(t * om) * q[i]) / Math.sin(om));
}
const Q1 = [1, 0, 0, 0],
  QI = [0, 1, 0, 0],
  QJ = [0, 0, 1, 0],
  QK = [0, 0, 0, 1];
const neg = (q) => q.map((x) => -x);
/** the bridge: from x = i to 1 (b ∈ [0, 1]) and from 1 to z = j (b ∈ [1, 2]), constant speed on great circles */
const bridge = (b) => (b <= 1 ? slerp(QI, Q1, b) : slerp(Q1, QJ, b - 1));
/** Gaussian elimination determinant */
function detGE(M) {
  const A = M.map((r) => r.slice()),
    n = A.length;
  let d = 1;
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    if (Math.abs(A[p][c]) < 1e-15) return 0;
    if (p !== c) { [A[p], A[c]] = [A[c], A[p]]; d = -d; }
    d *= A[c][c];
    for (let r = c + 1; r < n; r++) {
      const f = A[r][c] / A[c][c];
      for (let k = c; k < n; k++) A[r][k] -= f * A[c][k];
    }
  }
  return d;
}
const anchor = (t) => [0, 0, Math.sin(t), Math.cos(t)];
const FEATURES = {
  mother: (q) => [1, ...q].map((x) => x / Math.SQRT2),
  half: (q) => q.slice(),
  integer: (q) => q.flatMap((a) => q.map((b) => a * b))
};
function gramOf(kernel, e) {
  const F = [0, 1, 2].map((k) => FEATURES[kernel](anchor(k * e)));
  const G = F.map((u) => F.map((v) => dot(u, v)));
  return { G, det: detGE(G), F };
}
const motherClosed = (e) => 0.5 * Math.sin(e) ** 2 * (1 - Math.cos(e)) ** 2;
/* real 3 × 3 helpers */
const mmr = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const gapR = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.abs(x - B[i][j]))));
/** the Ad matrices of the flows, in closed form */
const AD = {
  aff: (s) => [[1, 0], [0, Math.exp(s)]],
  heis: (s) => [[1, 0, 0], [0, 1, 0], [0, s, 1]],
  sl2: (s) => [[1, 0, 0], [0, Math.exp(s), 0], [0, 0, Math.exp(-s)]],
  su2: (s) => [[Math.cos(PI * s), -Math.sin(PI * s), 0], [Math.sin(PI * s), Math.cos(PI * s), 0], [0, 0, 1]]
};
const NORM = { aff: (s) => Math.exp(s), heis: (s) => (s + Math.sqrt(s * s + 4)) / 2, sl2: (s) => Math.exp(s), su2: () => 1 };
/** Killing forms from matrix representations: ad by commutators, coordinates by least squares on the entries */
function killingFromMatrices(basis) {
  const n = basis.length,
    flat = (M) => M.flatMap((row) => row.flatMap((c) => (Array.isArray(c) ? c : [c, 0])));
  const vecs = basis.map(flat);
  const gram = vecs.map((u) => vecs.map((v) => dot(u, v)));
  const solve = (A, b) => {
    const M = A.map((row, i) => [...row, b[i]]);
    for (let c = 0; c < n; c++) {
      let p = c;
      for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
      [M[p], M[c]] = [M[c], M[p]];
      for (let r = 0; r < n; r++) if (r !== c) { const f = M[r][c] / M[c][c]; for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k]; }
    }
    return M.map((row, i) => row[n] / row[i]);
  };
  const isC = Array.isArray(basis[0][0][0]);
  const mul = (A, B) => (isC ? mm(A, B) : mmr(A, B));
  const sub = (A, B) => A.map((row, i) => row.map((x, j) => (isC ? [x[0] - B[i][j][0], x[1] - B[i][j][1]] : x - B[i][j])));
  const coords = (M) => solve(gram, vecs.map((v) => dot(v, flat(M))));
  const ad = basis.map((X) => {
    const cols = basis.map((Y) => coords(sub(mul(X, Y), mul(Y, X))));
    return cols[0].map((_, i) => cols.map((col) => col[i]));
  });
  return ad.map((A) => ad.map((B) => mmr(A, B).reduce((s, row, i) => s + row[i], 0)));
}
const C = (re, im = 0) => [re, im];
const KILLING_REPS = {
  aff: [[[1, 0], [0, 0]], [[0, 1], [0, 0]]],
  heis: [[[0, 1, 0], [0, 0, 0], [0, 0, 0]], [[0, 0, 0], [0, 0, 1], [0, 0, 0]], [[0, 0, 1], [0, 0, 0], [0, 0, 0]]],
  sl2: [[[1, 0], [0, -1]], [[0, 1], [0, 0]], [[0, 0], [1, 0]]],
  su2: [
    [[C(0), C(0, -1)], [C(0, -1), C(0)]],
    [[C(0), C(-1)], [C(1), C(0)]],
    [[C(0, -1), C(0)], [C(0), C(0, 1)]]
  ]
};
const SIGNATURE = { aff: '(+, 0)', heis: '(0, 0, 0)', sl2: '(+, +, −)', su2: '(−, −, −)' };
/** the η-volume of a geodesic ball of S³(1), in closed form */
const volume = (d) => PI * (2 * d - Math.sin(2 * d));
/** an icosahedron from the golden-ratio coordinates, turned so that a vertex is the north pole */
function icosahedron() {
  const ph = (1 + Math.sqrt(5)) / 2,
    raw = [];
  for (const a of [-1, 1]) for (const b of [-1, 1]) raw.push([0, a, b * ph], [a, b * ph, 0], [b * ph, 0, a]);
  const n = Math.hypot(1, ph),
    V0 = raw.map((v) => v.map((x) => x / n)),
    top = V0[1];
  // rotate top onto +z
  const axis = [top[1], -top[0], 0],
    an = Math.hypot(...axis),
    ang = Math.acos(top[2]),
    k = axis.map((x) => x / an);
  const rot = (v) => {
    const c = Math.cos(ang),
      s = Math.sin(ang),
      kv = [k[1] * v[2] - k[2] * v[1], k[2] * v[0] - k[0] * v[2], k[0] * v[1] - k[1] * v[0]],
      kd = dot(k, v);
    return v.map((x, i) => x * c + kv[i] * s + k[i] * kd * (1 - c));
  };
  const V = V0.map(rot),
    edgeLen = 2 / n,
    adj = (a, b) => Math.abs(dist4(V[a], V[b]) - edgeLen) < 1e-9;
  const F = [],
    E = [];
  for (let a = 0; a < 12; a++) for (let b = a + 1; b < 12; b++) if (adj(a, b)) { E.push([a, b]); for (let c = b + 1; c < 12; c++) if (adj(a, c) && adj(b, c)) F.push([a, b, c]); }
  return { V, E, F };
}
const ICO = icosahedron();
function icoBoundary(d) {
  const polar = ICO.F.map((f) => {
    const c = [0, 1, 2].map((i) => ICO.V[f[0]][i] + ICO.V[f[1]][i] + ICO.V[f[2]][i]);
    return Math.acos(c[2] / Math.hypot(...c));
  });
  const label = polar.map((p) => (p <= d + 1e-9 ? 1 : 0));
  const edges = ICO.E.filter(([a, b]) => ICO.F.filter((f) => f.includes(a) && f.includes(b)).reduce((s, f) => s + label[ICO.F.indexOf(f)], 0) % 2 === 1);
  return { filled: label.reduce((a, b) => a + b, 0), edges: edges.length, euler: 12 - ICO.E.length + ICO.F.length };
}
/** the simplicial cochain instance, counted by brute force */
function tetraCounts(raise) {
  const n = 4,
    V = [0, 1, 2, 3],
    e = (a, b) => a * b + a - 2 * b;
  const F = (i, j, k) => e(j, k) - e(i, k) + e(i, j) + (raise && i === 0 && j === 1 && k === 2 ? 1 : 0);
  let defects = 0;
  const face = V.map(() => 0);
  let edgeErr = 0;
  for (const r of V) for (const i of V) for (const j of V) for (const k of V) if (F(i, j, k) - F(r, j, k) + F(r, i, k) - F(r, i, j) !== 0) defects++;
  for (const r of V) for (const i of V) for (const j of V) for (const k of V) if (F(i, j, k) !== F(r, j, k) - F(r, i, k) + F(r, i, j)) face[r]++;
  for (const i of V) for (const j of V) for (const k of V) if (F(i, j, k) !== e(j, k) - e(i, k) + e(i, j)) edgeErr++;
  return { n, defects, face, edgeErr };
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
  await context.exposeBinding('__axiomPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__axiomPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__axiomPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined, dark: matchMedia('(prefers-color-scheme: dark)').matches }).catch(() => {}), { once: true });
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

// the shared gate (stage share, cards, drawer, honest labels, English, embeds, rail, cited figures, phone, cover, motion)
// with the lit-solid checks at this page's stricter thresholds: opaque share ≥ 14 %, shading spread ≥ 0.055
await stageFirstChecks(T, BOOK, ID, { solid: { minShare: 0.14, minSpread: 0.055 } });

/* ---------- sources, registry and lock ---------- */
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
const cjkTerms = new RegExp([[22823, 27169, 22411], [26234, 33021, 20307], [20154, 24037, 26234, 33021]].map((c) => String.fromCharCode(...c)).join('|'));
const literalColour = /#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i;
for (const [file, src] of Object.entries(sources)) {
  check(`source ${file}: no literal colour and no palette switch`, !literalColour.test(src) && !/\btrPalette\b|data-tr-palette|[?&]theme=/.test(src));
  check(`source ${file}: no model, vendor or tool identifiers`, !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src));
}
check('reserved identifiers are absent from the suite and registry entry', [suite, entryText].every((src) => !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src)));
check(
  'registration: §39.1, live, five cards, eleven GIDs in order, theory links',
  !!entry && entry.chapter === 39 && entry.section === SECTION && entry.code === 'AXIOM//OMEGA' && entry.status === 'live' && entry.added === '2026-11-19' &&
    same(entry.presets, Object.keys(CARDS)) && same(entry.lean.map((x) => x.gid), GIDS) &&
    entry.theory[0].href === '../zh/' + THEORY && entry.theory[0].href_en === '../en/' + THEORY
);
const lock = JSON.parse(fs.readFileSync(path.join(ROOT, 'trureturing.lock.json'), 'utf8'));
check('every cited GID is a frozen theorem of the lock', GIDS.every((g) => lock.declarations[g] && lock.declarations[g].kind === 'theorem'));
check('the evidence panel has argued, model and numerical boxes', ['lean argued', 'lean model', 'lean num'].every((c) => sources['index.html'].includes(`class="${c}"`)));
check('the probe exposes state, calc and presets', /window\.AXIOM_OMEGA_DEBUG = Object\.freeze\(\{[\s\S]*get state\(\)[\s\S]*calc,[\s\S]*presets:/.test(sources['main.js']));

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.AXIOM_OMEGA_DEBUG.state);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
  await settle(p);
}
async function pause(p = page) {
  await settle(p);
  await p.locator('#play').evaluate((b) => { if (b.getAttribute('aria-pressed') === 'true') b.click(); });
  await settle(p);
}
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  await settle(p);
  await until(p, (id) => { const s = window.AXIOM_OMEGA_DEBUG.state; return s.preset === id && !s.blending; }, card);
  await pause(p);
}
async function seek(t, p = page) {
  await p.locator('#now').evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, t);
  await settle(p);
}
const textOf = async (id, p = page) => (await p.locator('#' + id).innerText()).replaceAll('−', '-');
async function layout(p, label, figure = false) {
  const view = await stageView(p, '#stage', figure);
  const issues = [...view.layout, ...view.hud, ...(await labelOverlaps(p, '.stage .tag', 0)), ...(await capitalGreek(p))];
  check(label + ' framing and legible labels', !issues.length && (await overflowX(p)) === 0, JSON.stringify(issues));
}
const qname = (q) => {
  for (const [n, b] of [['1', Q1], ['i', QI], ['j', QJ], ['k', QK]]) {
    if (dist4(q, b) < 1e-9) return '+' + n;
    if (dist4(q, neg(b)) < 1e-9) return '-' + n;
  }
  return null;
};

/** Every number of the state, against the algebra written here. */
function verifyMath(m, label) {
  const o = bridge(m.b);
  const xoz = heapM(QI, o, QJ),
    zox = heapM(QJ, o, QI);
  check(label + ' bridge and both orders (2 × 2 matrices)', dist4(m.bridge, o) < 1e-12 && dist4(m.xoz, xoz) < 1e-12 && dist4(m.zox, zox) < 1e-12 && near(m.gap, dist4(xoz, zox), 1e-12));
  const s = m.drive.bridge;
  check(label + ' carried points are the great-circle points at fraction s', dist4(m.carryZ, slerp(QJ, xoz, s)) < 1e-9 && dist4(m.carryX, slerp(QI, zox, s)) < 1e-9);
  // Laws (I) and (II) at the bridge, on points written here
  const u = [0.5, 0.5, -0.5, 0.5],
    v = [Math.cos(1.1), 0, Math.sin(1.1), 0];
  const kap = (a, b) => (1 + dot(a, b)) / 2;
  const mine = [
    dist4(heapM(QI, QI, QJ), QJ),
    dist4(heapM(QI, QJ, QJ), QI),
    dist4(heapM(heapM(QI, o, QJ), u, v), heapM(QI, o, heapM(QJ, u, v))),
    Math.abs(kap(heapM(QI, u, v), heapM(QJ, u, v)) - kap(QI, QJ)),
    Math.abs(kap(heapM(u, v, QI), heapM(u, v, QJ)) - kap(QI, QJ))
  ];
  check(label + ' laws (I) and (II) hold here and on the page', Math.max(...mine) < 1e-12 && m.laws.max < 1e-12);
  for (const k of ['aff', 'heis', 'sl2', 'su2']) {
    const sv = k === 'aff' ? m.drive.sieve2 : m.drive.sieve3;
    check(`${label} Ad flow of ${k} at s = ${sv.toFixed(3)}`, gapR(m[k].M, AD[k](sv)) < 1e-9 && near(m[k].norm, NORM[k](sv), 1e-9));
  }
  const e = m.epsEff * DEG,
    g = gramOf(m.kernel, e);
  check(label + ' three-anchor Gram matrix and determinant (' + m.kernel + ')', gapR(m.gram.G, g.G) < 1e-12 && near(m.gram.det, g.det, 1e-10) && near(m.gram.lean, g.det, 1e-10));
  check(label + ' Cholesky rows reproduce G₃ and their volume is √det', gapR(mmr(m.gram.L, m.gram.L[0].map((_, j) => m.gram.L.map((r) => r[j]))), g.G) < 1e-8 && near(Math.abs(m.gram.L[0][0] * m.gram.L[1][1] * m.gram.L[2][2]), Math.sqrt(Math.max(0, g.det)), 1e-6));
  if (m.kernel === 'mother') check(label + ' closed form ½ sin²ε (1 − cos ε)²', near(m.gram.det, motherClosed(e), 1e-10));
  if (m.kernel === 'half') check(label + ' j = ½ alone: coplanar features, det 0, negative κ', Math.abs(m.gram.det) < 1e-10 && m.kernelMin === -1 && near(m.kernelAntipode, -1, 1e-12));
  if (m.kernel === 'integer') check(label + ' integer j alone: κ(o, −o) = 1', near(m.kernelAntipode, 1, 1e-12));
  if (m.kernel === 'mother') check(label + ' mother kernel separates the antipode', near(m.kernelAntipode, 0, 1e-12) && m.kernelMin === 0 && m.rank === 5);
  const d = PI * m.drive.field;
  check(label + ' η-volume and boundary area', near(m.field.d, d, 1e-12) && near(m.field.volume, volume(d), 1e-8) && near(m.field.area, 4 * PI * Math.sin(d) ** 2, 1e-10) && m.field.inPlus === d <= PI / 2);
  const ico = icoBoundary(d);
  check(label + ' icosahedral ℤ₂ boundary', m.field.ico.filled === ico.filled && m.field.ico.edges === ico.edges && m.field.ico.euler === 2 && ico.euler === 2 && m.field.ico.cycle);
  const sig = m.killing;
  check(label + ' Killing signatures', Object.entries(SIGNATURE).every(([k, s2]) => sig[k].signature === s2));
}
/** The instances the evidence panel names, against algebra written here. */
function verifyInstances(m, label) {
  const I = m.leanInstances,
    e = m.epsEff * DEG;
  check(label + ' partition readout κ(1, ·) = ½ on i, j, k and 1 at 1', I.partition.one === 1 && [I.partition.i, I.partition.j, I.partition.k].every((x) => near(x, 0.5, 1e-15)));
  check(label + ' unit features: overlap 1 only for equal points; q ⊗ q agrees at ±k', I.unitGram.worstSame < 1e-12 && I.unitGram.leastOther > 1e-6 && I.unitGram.integerEqual && near(I.unitGram.integerOverlap, 1, 1e-12));
  check(label + ' Born weight cos²(ε/2) and the unread decomposition', near(I.born.weight, Math.cos(e / 2) ** 2, 1e-12) && near(I.born.overlapSq, Math.cos(e / 2) ** 2, 1e-12) && I.born.unreadGap < 1e-12 && near(I.born.total, 1, 1e-12));
  check(label + ' Gram realizability Q = O†O', I.gramRealizability.chol < 1e-8 && I.gramRealizability.pairing < 1e-8);
  const g = gramOf(m.kernel, e);
  check(label + ' three-anchor determinant formula', near(I.gramDet.cofactor, g.det, 1e-10) && near(I.gramDet.lean, g.det, 1e-10) && (I.gramDet.closed === null || near(I.gramDet.closed, g.det, 1e-10)));
  // independence: Gram–Schmidt on the explicit features
  const F = g.F.map((r) => r.slice());
  let rank = 0;
  const basis = [];
  for (const f of F) {
    let w = f.slice();
    for (const b of basis) { const c = dot(w, b); w = w.map((x, i) => x - c * b[i]); }
    const n = Math.hypot(...w);
    if (n > 1e-6) { basis.push(w.map((x) => x / n)); rank++; }
  }
  // the squared volume from Gram–Schmidt equals det G₃; where its sign is unambiguous it decides independence
  let vol2 = 1;
  {
    const ortho = [];
    for (const f of g.F) {
      let w = f.slice();
      for (const o of ortho) { const c = dot(w, o); w = w.map((x, i) => x - c * o[i]); }
      const n = Math.hypot(...w);
      vol2 *= n * n;
      if (n > 1e-12) ortho.push(w.map((x) => x / n));
    }
  }
  check(label + ' det G₃ is the squared volume, positive exactly when the features are independent',
    near(I.gramPos.det, vol2, 1e-12) && (vol2 > 1e-10 ? rank === 3 && I.gramPos.pivot > 0 : vol2 < 1e-14 ? rank < 3 : true));
  // the brackets of −iσⱼ: [e₁, e₂] = 2e₃ and cyclic
  check(label + ' su(2) brackets are twice the cross product', I.spin.residual < 1e-12 && near(I.spin.brackets[0][1][2], 2, 1e-12) && near(I.spin.brackets[1][2][0], 2, 1e-12) && near(I.spin.brackets[2][0][1], 2, 1e-12));
  const u5 = FEATURES.mother(anchor(0)),
    v5 = FEATURES.mother(anchor(e));
  const lhs = dot(u5, u5) * dot(v5, v5) - dot(u5, v5) ** 2;
  check(label + ' Lagrange–Gram identity', near(I.lagrange.lhs, lhs, 1e-12) && near(I.lagrange.rhs, lhs, 1e-12) && near(lhs, 1 - Math.cos(e / 2) ** 4, 1e-12));
  // the balanced split of the bridge, computed here with the same convention (S = w I + Σ qⱼ (−iσⱼ))
  const S = toM(m.bridge),
    iS3 = [[C(0, 1), C(0)], [C(0), C(0, -1)]],
    I2 = [[C(1), C(0)], [C(0), C(1)]];
  const plus = I2.map((r, i) => r.map((x, j) => [(x[0] + iS3[i][j][0]) / 2, (x[1] + iS3[i][j][1]) / 2])),
    minus = I2.map((r, i) => r.map((x, j) => [(x[0] - iS3[i][j][0]) / 2, (x[1] - iS3[i][j][1]) / 2]));
  const A = mm(S, plus),
    B = mm(S, minus),
    AB = mm(A, dag(B)),
    ABd = dag(AB);
  const skew = Math.max(...AB.flatMap((r, i) => r.map((x, j) => Math.hypot(ABd[i][j][0] + x[0], ABd[i][j][1] + x[1]))));
  const halfA = Math.max(...mm(A, dag(A)).flatMap((r, i) => r.map((x, j) => Math.hypot(x[0] - (i === j ? 0.5 : 0), x[1]))));
  check(label + ' balanced unitary sum: skew-adjoint cross term', skew < 1e-12 && halfA < 1e-12 && I.balanced.skew < 1e-12 && I.balanced.halfA < 1e-12 && I.balanced.halfB < 1e-12 && I.balanced.sum < 1e-12 && I.balanced.unitary < 1e-12);
  const ex = tetraCounts(false),
    up = tetraCounts(true);
  check(label + ' simplicial cochain counts (exact and raised)',
    I.tetra.exact.defects === ex.defects && ex.defects === 0 && I.tetra.raised.defects === up.defects && up.defects === 10 &&
      same(I.tetra.raised.faceErrors, up.face) && same(up.face, [7, 1, 1, 1]) && I.tetra.raised.edgeErrors === up.edgeErr && up.edgeErr === 1 &&
      up.face.reduce((a, b) => a + b, 0) === up.defects && up.face.some((f) => 4 * f <= up.defects) && up.defects <= 4 * 4 * up.edgeErr);
}
async function verifyCard(p, id) {
  const m = await state(p),
    c = CARDS[id];
  check(id + ' focus, bridge, step, kernel, view and preset', m.preset === id && m.focus === c.focus && near(m.b, c.b) && near(m.eps, c.eps) && m.kernel === c.kernel && m.cam === c.cam);
  verifyMath(m, id);
  return m;
}
/** The numbers each card's caption and still name, at s = 1. */
function verifyCardEnd(m, id) {
  if (id === 'origin-free-ternary-bridge') check(id + ' ends on +k and −k, 2 apart', qname(m.carryZ) === '+k' && qname(m.carryX) === '-k' && near(m.gap, 2, 1e-12));
  if (id === 'dimension-sieve-1d-2d-deadlock') check(id + ' ends with ‖Ad‖ = e and one meeting point on ℝ', near(m.aff.norm, Math.E, 1e-12) && near(m.line.carryZ, m.line.carryX, 1e-12) && near(m.line.xyz, m.line.zyx, 1e-12));
  if (id === 'three-sphere-noncompact-elimination') check(id + ' ends with ‖Ad‖ = φ, e, 1', near(m.heis.norm, (1 + Math.sqrt(5)) / 2, 1e-12) && near(m.sl2.norm, Math.E, 1e-12) && near(m.su2.norm, 1, 1e-12));
  if (id === 'peter-weyl-rank-five-kernel') check(id + ' ends with det G₃ = 3/32', near(m.gram.det, 3 / 32, 1e-12) && m.rank === 5);
  if (id === 'cartan-three-form-closed-field') check(id + ' ends with 2π² and no boundary', near(m.field.volume, 2 * PI * PI, 1e-8) && m.field.area < 1e-12 && m.field.ico.edges === 0);
}

await T.goto(BOOK, ID, '?lang=en');
await settle(page);
check('the bridge card opens by default', (await state()).preset === DEFAULT);
check(
  'three-column lab shell, panel badges, tagline, fonts and evidence spans',
  await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const asides = [...document.querySelectorAll('.sec h2 .aside')].map((el) => el.textContent.trim());
    return (
      !!q('.app.lab > header.top .status #scenePill') && !!q('.app.lab > header.top .status #keyPill') &&
      !!q('#rail #lensPanel .lens-toggle') && !!q('#rail #presets') && !!q('#rail #ctlPanel #camChips') && !!q('#rail #ctlPanel #kernelChips') &&
      !!q('main.center > #stage > .scan') && !!q('main.center > #stage > .vig') && !!q('#stage > #hudTl #hudBig') && !!q('#stage > button.handle#bridgeHandle') &&
      !!q('main.center > .strip #plot') && !q('#stage .strip') && !q('#stage #plot') &&
      !!q('aside.col.side > #readouts') && q('aside.col.side > #evidence').firstElementChild.id === 'infoBtn' &&
      ['§39.1', '5', 'NUM', 'trureturing'].every((x) => asides.includes(x)) &&
      [...document.querySelectorAll('.tagline > span')].every((el) => el.querySelector('em') && el.firstChild.nodeType === 3) &&
      !!q('link[href*="fonts.googleapis.com/css2?family=Chakra+Petch"]') &&
      [...document.querySelectorAll('#evidence .lean')].every((el) => el.children.length === 2 && [...el.children].every((c) => c.tagName === 'SPAN')) &&
      [...document.querySelectorAll('#drawer .sheet > div.zh, #drawer .sheet > div.en')].every((el) => el.querySelector('p.lede') && el.querySelector('ol li b') && el.querySelector('p.lede.refs a'))
    );
  })
);
check('the probe carries its card table', same(Object.keys(await page.evaluate(() => window.AXIOM_OMEGA_DEBUG.presets)), Object.keys(CARDS)) && (await page.evaluate(() => typeof window.AXIOM_OMEGA_DEBUG.calc.heap === 'function')));
check(
  'a card click starts a blend instead of a hard cut',
  await page.evaluate(() => {
    document.querySelector('[data-preset="peter-weyl-rank-five-kernel"]').click();
    document.querySelector('[data-preset="origin-free-ternary-bridge"]').click();
    const s = window.AXIOM_OMEGA_DEBUG.state;
    return s.preset === 'origin-free-ternary-bridge' && s.focus === 'bridge';
  })
);
await settle(page);
await until(page, () => !window.AXIOM_OMEGA_DEBUG.state.blending);
await pick('peter-weyl-rank-five-kernel');
await input('#anchorStep', 120);
check('the step slider leaves the card', (await state()).preset === null && near((await state()).eps, 120));
check('a card click blends the step back', await page.evaluate(() => { document.querySelector('[data-preset="peter-weyl-rank-five-kernel"]').click(); const s = window.AXIOM_OMEGA_DEBUG.state; return s.blending && s.eps > 60; }));
await settle(page);
await until(page, () => !window.AXIOM_OMEGA_DEBUG.state.blending);
check('the blend ends on the card', near((await state()).eps, 60) && !(await state()).blending);

/* a stricter turning check than the shared gate: the histogram of light and shade moves by ≥ 0.08 */
{
  await pick(DEFAULT);
  const a = await solidPixels(page),
    cam = await page.evaluate(() => ({ ...TRV.solids[0].cam }));
  const dists = [];
  for (const [dy, dp] of [[0.4, 0], [0, 0.35]]) {
    await page.evaluate(([dy, dp, c]) => { Object.assign(TRV.solids[0].cam, { yaw: c.yaw + dy, pitch: c.pitch + dp }); TRV.kit.flush(); }, [dy, dp, cam]);
    const b = await solidPixels(page);
    dists.push(b.hist.reduce((s, h, k) => s + Math.abs(h - a.hist[k]), 0) / 2);
  }
  await page.evaluate((c) => { Object.assign(TRV.solids[0].cam, c); TRV.kit.flush(); }, cam);
  check('solid: opaque share ≥ 14 %, spread ≥ 0.055 and turning moves the shading by ≥ 0.08', a.share >= 0.14 && a.spread >= 0.055 && Math.max(...dists) >= 0.08, JSON.stringify({ share: a.share, spread: a.spread, dists }));
}

for (const lang of ['zh', 'en']) {
  await page.click('[data-lang-set="' + lang + '"]');
  await settle(page);
  const links = await page.locator('#drawer .refs a').evaluateAll((els) => els.filter((el) => getComputedStyle(el.parentElement).display !== 'none').map((el) => el.getAttribute('href')));
  check(lang + ' theory link', links.includes('../../' + lang + '/' + THEORY));
  check(lang + ' cited declarations in order', same(await page.locator('#evidence a[data-lean-gid]').evaluateAll((els) => els.map((el) => el.dataset.leanGid)), GIDS));
  const boxText = async (selector) => (await page.locator('#evidence ' + selector + ' .' + lang).allTextContents()).join(' ').replace(/\s+/g, '');
  const numeric = await boxText('.lean.num'),
    gramBox = await boxText('[class="lean"]:has([data-lean-gid$=".three_anchor_gram_det_formula"])'),
    tetraBox = await boxText('[class="lean"]:has([data-lean-gid$=".tetra_defects_incidence_repair_and_exactness"])'),
    faceBox = await boxText('[class="lean"]:has([data-lean-gid$=".face_cycle_exact"])');
  check(lang + ' the numbers in the evidence text are the computed ones',
    numeric.includes('3/32=0.09375') && numeric.includes('2π²=19.7392') && numeric.includes('1.6180') &&
      gramBox.includes('3/32=0.09375') && gramBox.includes('1/2') && tetraBox.includes('7,1,1,1') && tetraBox.includes('10≤4·4·1=16') &&
      faceBox.includes('12−30+20=2') && faceBox.includes('5') && faceBox.includes('142.62°'));
  check(lang + ' the face-boundary threshold is the last face centre', near(Math.max(...ICO.F.map((f) => { const c = [0, 1, 2].map((i) => ICO.V[f[0]][i] + ICO.V[f[1]][i] + ICO.V[f[2]][i]); return Math.acos(c[2] / Math.hypot(...c)); })) / DEG, 142.62, 0.005));
  for (const id of Object.keys(CARDS)) {
    await pick(id);
    await seek(1);
    const m = await verifyCard(page, id);
    verifyCardEnd(m, id);
    verifyInstances(m, lang + '/' + id);
    await layout(page, lang + '/' + id);
    const readings = await page.locator('#readouts output').allTextContents();
    check(lang + '/' + id + ' one key and six readouts, all populated',
      readings.length === 7 && (await page.locator('#readouts dl.ro > div').count()) === 7 && (await page.locator('#readouts dl.ro > div.key').count()) === 1 && readings.every((t) => t && !/NaN|undefined|^—$/.test(t)));
    check(lang + '/' + id + ' key readout and pill show det G₃', (await textOf('roKey')).includes(f4(m.gram.det)) && (await textOf('keyPill')).includes(f4(m.gram.det)));
    const hudBig = await textOf('hudBig');
    const want = {
      bridge: f4(m.gap),
      sieve2: f4(m.aff.norm),
      sieve3: f4(m.heis.norm),
      kernel: f4(m.gram.det),
      field: f4(m.field.volume)
    }[m.focus];
    check(lang + '/' + id + ' HUD title names the key quantity of the card', hudBig.includes(want) && (await textOf('hudSub')).trim().length > 0, hudBig);
    check(lang + '/' + id + ' the zoomed station is the driven one', Object.entries(m.zoom).every(([k, z]) => ({ sieve2: 'ul', sieve3: 'ur', kernel: 'll', field: 'lr' }[m.focus] === k ? z > 1.2 : z === 1)));
  }
}

/* ---------- controls ---------- */
await pick(DEFAULT);
await seek(1);
for (const b of [0, 0.25, 0.5, 1, 1.5, 1.99, 2]) {
  await input('#bridgePos', b);
  const m = await state();
  check('bridge slider ' + b, near(m.b, b) && m.focus === 'bridge' && !m.playing && m.preset === null && near(m.t, 1));
  verifyMath(m, 'b=' + b);
  verifyInstances(m, 'b=' + b);
  if (b === 0) check('bridge at x: [x, x, z] = z for both orders', qname(m.xoz) === '+j' && qname(m.zox) === '+j' && m.gap < 1e-12);
  if (b === 2) check('bridge at z: [x, z, z] = x for both orders', qname(m.xoz) === '+i' && qname(m.zox) === '+i' && m.gap < 1e-12);
  if (b === 1) check('bridge at 1: [i, 1, j] = +k ≠ −k = [j, 1, i]', qname(m.xoz) === '+k' && qname(m.zox) === '-k' && (await textOf('roBridge')).includes('+k') && (await textOf('roBridge')).includes('-k'));
  check('two-order readout ' + b, (await textOf('roBridge')).includes(f4(m.gap)) && (await textOf('roHeap')).startsWith('0.0000'));
}
for (const t of [0, 0.3, 0.5, 1]) {
  await seek(t);
  const m = await state();
  check('rail carries in the bridge card, s = ' + t, near(m.drive.bridge, t) && m.drive.field === 1 && m.drive.kernel === 1);
  verifyMath(m, 'carry s=' + t);
}
await pick('peter-weyl-rank-five-kernel');
await seek(1);
for (const eps of [1, 30, 45, 60, 90, 120, 150, 179]) {
  await input('#anchorStep', eps);
  const m = await state();
  check('step slider ' + eps, near(m.eps, eps) && m.focus === 'kernel' && m.preset === null && near(m.epsEff, eps));
  verifyMath(m, 'ε=' + eps);
  verifyInstances(m, 'ε=' + eps);
  if (eps === 60) check('det G₃(60°) = 3/32', near(m.gram.det, 3 / 32, 1e-12));
  if (eps === 90) check('det G₃(90°) = 1/2', near(m.gram.det, 0.5, 1e-12));
  check('key readout ' + eps, (await textOf('roKey')).includes(f4(m.gram.det)));
}
for (const kernel of ['half', 'integer', 'mother']) {
  for (const eps of [60, 90]) {
    await input('#anchorStep', eps);
    await page.click(`[data-kernel="${kernel}"]`);
    await settle(page);
    const m = await state();
    check(`kernel chip ${kernel} at ${eps}°`, m.kernel === kernel && (await page.getAttribute(`[data-kernel="${kernel}"]`, 'aria-pressed')) === 'true' && m.focus === 'kernel');
    verifyMath(m, `${kernel}/${eps}`);
    if (kernel === 'integer' && eps === 90) check('integer kernel flattens at 90° (γ(0) and γ(180°) are not separated)', Math.abs(m.gram.det) < 1e-12);
    if (kernel === 'integer' && eps === 60) check('integer kernel is not flat at 60°', near(m.gram.det, 0.84375, 1e-12));
    const flat = await page.evaluate(() => { const sc = TRV.solids[0]; let poly = false; const save = sc.poly; sc.poly = (...a) => { if (a[0] === 'gram') poly = true; return save(...a); }; TRV.kit.flush(); sc.poly = save; return poly; });
    check(`kernel ${kernel} at ${eps}°: solid box exactly when det > 0`, flat === m.gram.det >= 1e-6);
  }
}
await pick('peter-weyl-rank-five-kernel');
for (const t of [0, 0.5, 1]) {
  await seek(t);
  const m = await state();
  check('rail opens the anchors, s = ' + t, near(m.epsEff, 60 * t, 1e-9));
  verifyMath(m, 'spread s=' + t);
}
await pick('cartan-three-form-closed-field');
for (const t of [0, 0.25, 0.5, 0.6, 0.9, 1]) {
  await seek(t);
  const m = await state();
  verifyMath(m, 'fill s=' + t);
  check('field readout s = ' + t, (await textOf('roField')).includes(f4(m.field.volume)) && (await textOf('roField')).includes(f4(m.field.area)));
}
for (const id of ['dimension-sieve-1d-2d-deadlock', 'three-sphere-noncompact-elimination']) {
  await pick(id);
  for (const t of [0, 0.4, 1]) {
    await seek(t);
    verifyMath(await state(), id + ' s=' + t);
  }
}
const beforeLens = await state(),
  title = await textOf('scenePill');
await page.click('#lensToggleBtn');
await settle(page);
const lens = await state();
check('changing the lens preserves the experiment', lens.lens !== beforeLens.lens && (await textOf('scenePill')) !== title && ['b', 'eps', 'kernel', 'preset', 't', 'focus'].every((k) => lens[k] === beforeLens[k]));
await layout(page, 'second lens');
await page.click('#lensToggleBtn');
await settle(page);
const views = [];
for (const name of ['panorama', 'cutaway', 'above']) {
  await page.click('[data-cam="' + name + '"]');
  await settle(page);
  check('selected view ' + name, (await state()).cam === name && (await page.getAttribute('[data-cam="' + name + '"]', 'aria-pressed')) === 'true');
  await until(page, () => !document.querySelector('#stage').hasAttribute('aria-busy'));
  views.push((await state()).camera);
  await layout(page, 'view ' + name);
}
check('the three views have distinct orientations', new Set(views.map((c) => [c.yaw, c.pitch].join('/'))).size === 3);

/* the amber handle: drag the bridge along x → 1 → z, arrow keys */
await pick(DEFAULT);
await page.locator('#stage').scrollIntoViewIfNeeded();
await settle(page);
const here = await state(),
  box = await page.locator('#bridgeHandle').boundingBox();
const start = await page.evaluate(() => AXIOM_OMEGA_DEBUG.dragTarget(AXIOM_OMEGA_DEBUG.state.b));
const end = await page.evaluate(() => AXIOM_OMEGA_DEBUG.dragTarget(1.5));
check('the handle sits on the projected bridge', !!box && Math.hypot(box.x + box.width / 2 - start.x, box.y + box.height / 2 - start.y) < 1.5);
await page.mouse.move(start.x, start.y);
await page.mouse.down();
await page.mouse.move(end.x, end.y, { steps: 10 });
await page.mouse.up();
await settle(page);
const pulled = await state();
check('dragging the handle moves the bridge and leaves the camera', Math.abs(pulled.b - 1.5) < 0.02 && same(pulled.camera, here.camera) && !pulled.playing && !pulled.preset, JSON.stringify(pulled.b));
verifyMath(pulled, 'dragged');
await page.locator('#bridgeHandle').focus();
await page.keyboard.press('ArrowRight');
await settle(page);
check('arrow keys move the bridge by 0.01 without touching the rail', near((await state()).b, pulled.b + 0.01, 1e-9) && (await state()).t === pulled.t);
await pick('peter-weyl-rank-five-kernel');
check('the handle shows only in the bridge card', await page.locator('#bridgeHandle').isHidden());

for (const id of Object.keys(CARDS)) check(id + ' plays', await playsAfter(page, () => page.click('[data-preset="' + id + '"]'), () => window.AXIOM_OMEGA_DEBUG.state));

/* ---------- colours ---------- */
async function primitiveColours(p = page) {
  return p.evaluate(() => {
    const sc = window.TRV.solids[0],
      seen = [],
      names = ['surface', 'tube', 'line', 'circle', 'arrow', 'bead', 'ring', 'fan', 'poly', 'glass'],
      saved = {};
    for (const n of names) {
      saved[n] = sc[n];
      sc[n] = (...a) => {
        const style = n === 'circle' || n === 'glass' ? a[3] : n === 'line' || n === 'bead' || n === 'ring' || n === 'fan' ? a[1] : n === 'arrow' ? a[2] : a[2];
        const s = style || {};
        seen.push({ n, key: String(n === 'surface' || n === 'tube' || n === 'poly' || n === 'glass' ? a[0] : s.key || n), colors: [s.color, s.fill, s.edges, ...(s.colors || [])].filter(Boolean) });
        return saved[n](...a);
      };
    }
    window.TRV.kit.flush();
    for (const n of names) sc[n] = saved[n];
    const P = window.TRV.palette;
    return { seen, amber: P.amber, ok: P.ok, warn: P.warn, palette: ['violet', 'cyan', 'magenta', 'sigma', 'blue'].map((k) => P[k]) };
  });
}
for (const id of Object.keys(CARDS)) {
  await pick(id);
  const colours = await primitiveColours();
  check(id + ': stage colours are violet, cyan, magenta, silver and blue only (amber stays on the handle)',
    colours.seen.length > 20 && colours.seen.every((x) => x.colors.every((c) => colours.palette.includes(c))) && colours.seen.every((x) => !x.colors.includes(colours.amber) && !x.colors.includes(colours.ok) && !x.colors.includes(colours.warn)));
  const roles = Object.fromEntries(colours.seen.map((x) => [x.key, x.colors]));
  check(id + ': the body is violet; the sieved candidates magenta', roles.s3.includes(colours.palette[0]) && roles.heis.includes(colours.palette[2]) && roles.sl2.includes(colours.palette[2]) && roles.su2.includes(colours.palette[0]));
  const marks = await page.evaluate(() => TRV.solids[0].marks().map((m) => m.hidden));
  check(id + ': the body hides a mark behind it and leaves one in front', marks.includes(true) && marks.includes(false));
}
const domColours = await page.evaluate(() => {
  const col = (v) => { const s = document.createElement('span'); s.style.color = `var(${v})`; document.body.appendChild(s); const c = getComputedStyle(s).color; s.remove(); return c; };
  const banned = [col('--amber'), col('--ok'), col('--warn')],
    bad = [];
  for (const el of document.querySelectorAll('#stage *, .strip *, #readouts *, .field output')) {
    if (el.closest('.handle')) continue;
    const cs = getComputedStyle(el);
    for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderLeftColor']) if (banned.includes(cs[prop])) bad.push(`${el.id || el.className || el.tagName} ${prop}`);
  }
  const amber = col('--amber');
  for (const el of [document.querySelector('#evidence'), ...document.querySelectorAll('#evidence *')]) {
    const cs = getComputedStyle(el);
    for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderLeftColor']) if (cs[prop] === amber) bad.push(`#evidence ${el.className || el.tagName} ${prop}`);
  }
  return bad;
});
check('no amber, green or red in the stage, strip, readouts or evidence', !domColours.length, domColours.slice(0, 3).join(' | '));

/* ---------- the strip: det G₃ along ε for the three kernels; the amber cursor at the current step ---------- */
await pick('peter-weyl-rank-five-kernel');
await seek(1);
const strip = await page.evaluate(() => {
  const plot = TRV.kit.plot,
    traces = [];
  TRV.kit.plot = (...args) => {
    const graph = plot(...args);
    for (const method of ['line', 'dot', 'vline']) {
      const original = graph[method];
      graph[method] = (...params) => { traces.push([method, ...params]); return original(...params); };
    }
    return graph;
  };
  try { TRV.kit.flush(); } finally { TRV.kit.plot = plot; }
  const { cyan, magenta, amber } = TRV.palette;
  return { traces, cyan, magenta, amber };
});
const lines = strip.traces.filter(([m]) => m === 'line');
const curve = (color, dashed) => lines.find(([, , c, o]) => c === color && !!(o && o.dash) === dashed);
for (const [kernel, color, dashed] of [['mother', strip.cyan, false], ['half', strip.magenta, false], ['integer', strip.magenta, true]]) {
  const tr = curve(color, dashed);
  check('strip curve ' + kernel, !!tr && tr[1][0][0] === 0 && tr[1].at(-1)[0] === 180 && tr[1].every(([eps, v]) => near(v, gramOf(kernel, eps * DEG).det, 1e-9)));
}
const cursors = strip.traces.filter(([m, ...rest]) => (m === 'dot' || m === 'vline') && rest.includes(strip.amber));
check('strip: one amber cursor and dot at the current step', lines.length === 3 && cursors.length === 2 && cursors.every((r) => near(r[1], 60)), JSON.stringify({ lines: lines.length, cursors: cursors.map((r) => [r[0], r[1]]) }));
const am = await page.evaluate(() => {
  const cv = document.querySelector('#plot'),
    c = cv.getContext('2d', { willReadFrequently: true }),
    d = c.getImageData(0, 0, cv.width, cv.height).data;
  const s = document.createElement('span');
  s.style.color = 'var(--amber)';
  document.body.appendChild(s);
  const [ar, ag, ab] = getComputedStyle(s).color.match(/\d+/g).map(Number);
  s.remove();
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity, n = 0;
  for (let y = 0; y < cv.height; y++)
    for (let x = 0; x < cv.width; x++) {
      const i = 4 * (y * cv.width + x);
      if (d[i + 3] > 200 && Math.abs(d[i] - ar) < 26 && Math.abs(d[i + 1] - ag) < 26 && Math.abs(d[i + 2] - ab) < 26) { n++; x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    }
  return { n, width: x1 - x0, height: y1 - y0, dpr: cv.width / cv.clientWidth, h: cv.height };
});
check('amber strip cursor is narrow and spans the plot', am.n > 10 && am.width < 12 * am.dpr && am.height > am.h * 0.48, JSON.stringify(am));

/* ---------- other frames: phone, cited figures, stills ---------- */
for (const lang of ['zh', 'en']) {
  for (const [width, height, figure] of [[390, 844, false], [334, 500, true], [740, 500, true]]) {
    colorScheme = width === 390 ? 'light' : 'dark';
    const p = await T.open(BOOK, ID, '?lang=' + lang + (figure ? '&embed=1&preset=' + DEFAULT : ''), { viewport: { width, height }, reducedMotion: 'reduce' });
    await settle(p);
    for (let j = 0; j < Object.keys(CARDS).length; j++) {
      const id = (await state(p)).preset;
      await layout(p, lang + '/' + width + '/' + id, figure);
      if (lang === 'en') check('English ' + width + '/' + id, !(await cjkLeftovers(p)).length);
      if (figure) check('cited frame hides the strip ' + id, (await p.locator('.strip').isHidden()) && (await p.locator('.tour .tour-note').isVisible()));
      await p.locator(figure ? '[data-tour="next"]' : '[data-preset="' + Object.keys(CARDS)[(j + 1) % 5] + '"]').click();
      await settle(p);
    }
    if (width === 390) {
      for (const yaw of [-Math.PI / 2, 0.4]) {
        await p.evaluate((y) => { TRV.kit.pause(); TRV.solids[0].cam.yaw = y; TRV.kit.flush(); }, yaw);
        await layout(p, lang + ' turned phone view ' + yaw);
      }
    }
    await p.context().close();
  }
  for (const id of Object.keys(CARDS)) {
    const p = await openStill(T, BOOK, ID, id, lang);
    const m = await verifyCard(p, id);
    verifyCardEnd(m, id);
    check('still ' + lang + '/' + id, !m.playing && near(m.t, 1) && (await p.locator('#bridgeHandle').isHidden()));
    await p.context().close();
  }
}
check('permanent dark console in both system schemes', !paletteMutations.length && paletteDocuments.every((x) => x.absent) && paletteDocuments.some((x) => x.dark) && paletteDocuments.some((x) => !x.dark));
check('zero console warnings', browserWarnings.length === 0, browserWarnings.slice(0, 3).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('zero browser or request errors', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));
await T.finish();
