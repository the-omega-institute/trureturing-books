// INDRA//NET browser regression: the shared stage-first gate, then every control, card, lens, pick, still and frame,
// and every number the page claims, checked against algorithms written here (the icosahedron recognized by its dot
// products, the reflections iterated with a separately built mixing matrix, θ* by Newton's method, Krylov ranks by
// row reduction, the ribbon re-sampled for its crossings, face boundaries and GF(2) ranks recounted, the swap unitary
// re-multiplied, the page table walked again).
// Run directly with node; VIZ_SLOW_FRAMES=1000 exercises every transition and playback with sparse animation frames.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, capitalGreek, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'indra-net-single-particle-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const BOOK_DIR = path.resolve(DIR, '..', '..');
const THEORY = 'ch39-s13-single-cosmic-field-and-indra-net.html';
const THEORY_SEC = `${THEORY}#sec-ch39-single-cosmic-field-and-indra-net`;   // the drawer and the registry land on the section heading
const OPEN_LINKS = [
  'ch39-s12-uniform-field-and-observer-slice.html#prob-ch39-orthogonal-slice-cosmology-and-dark-sector',
  'ch39-s11-af-gut-arc-field-grand-unification.html#prob-ch39-af-gut-threshold-and-proton-stability'
];
const GIDS = [
  'D5/S3/Quantum/Algebra/FutureWordOrthogonalResidual.future_word_orthogonal_residual',
  'D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization',
  'D5/S0/Diagonal/RecursivePageTable.recursive_page_table_walk',
  'D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint',
  'D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact',
  'D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq',
  'D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor'
];
const CARDS = {
  'yoneda-isomorphic-jewel-net': { lens: 'indra', drive: 'focus', still: 0.35 },
  'wheeler-single-ribbon-knots': { lens: 'wheeler', drive: 'now', still: 0.5 },
  'spherical-mirror-limb-foreshortening': { lens: 'indra', drive: 'orbit', still: 0 },
  'dottie-infinite-reflection-convergence': { lens: 'indra', drive: 'depth', still: 'end' },
  'observable-cosmos-single-jewel': { lens: 'indra', drive: 'zoom', still: 'end' }
};
const VIEW0 = [2.827, 0.5];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const stillT = (c) => (CARDS[c].still === 'end' ? 1 : CARDS[c].still);

/* ---------- independent mathematics, written here and never calling the page ---------- */
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const sub = (a, b) => a.map((x, i) => x - b[i]);
const nrm = (a) => Math.sqrt(dot(a, a));
const unit = (a) => a.map((x) => x / nrm(a));
/** θ*: Newton's method on cos t − t from 1. */
const THETA = (() => { let t = 1; for (let k = 0; k < 60; k++) t -= (Math.cos(t) - t) / (-Math.sin(t) - 1); return t; })();
/** The adjacency of the net from the positions: outer pairs at the shortest distance, and every outer jewel to the centre. */
function adjacency(pos) {
  const n = pos.length, adj = pos.map(() => []);
  let dmin = Infinity;
  for (let i = 1; i < n; i++) for (let j = i + 1; j < n; j++) dmin = Math.min(dmin, nrm(sub(pos[i], pos[j])));
  for (let i = 1; i < n; i++) { adj[0].push(i); adj[i].push(0); for (let j = i + 1; j < n; j++) if (Math.abs(nrm(sub(pos[i], pos[j])) - dmin) < 1e-9) { adj[i].push(j); adj[j].push(i); } }
  return adj.map((l) => l.sort((a, b) => a - b));
}
/** The reflections Ψ⁽ᵐ⁾ = cos(K_εΨ⁽ᵐ⁻¹⁾) from δ_{x₀}, with K_εΨ(x) = (1 − ε)Ψ(x) + ε·mean of the neighbours. */
function reflect(adj, eps, x0, steps) {
  let psi = adj.map((_, x) => (x === x0 ? 1 : 0));
  const out = [psi];
  for (let m = 1; m <= steps; m++) { psi = psi.map((v, x) => Math.cos((1 - eps) * v + eps * adj[x].reduce((s, y) => s + psi[y], 0) / adj[x].length)); out.push(psi); }
  return out;
}
/** Rank of a list of vectors by row reduction with partial pivoting. */
function rank(rows) {
  const M = rows.map((r) => r.slice()); let rk = 0;
  for (let c = 0; c < (M[0] || []).length && rk < M.length; c++) {
    let p = rk; for (let r = rk + 1; r < M.length; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    if (Math.abs(M[p][c]) < 1e-9) continue;
    [M[rk], M[p]] = [M[p], M[rk]];
    for (let r = 0; r < M.length; r++) if (r !== rk) { const f = M[r][c] / M[rk][c]; M[r] = M[r].map((x, j) => x - f * M[rk][j]); }
    rk++;
  }
  return rk;
}
/** The effects (K_εᵀ)ʲδ_{x₀}: ⟨e_j, Ψ⟩ = (K_εʲΨ)(x₀), built as rows of K_εʲ. */
function effects(adj, eps, x0, m) {
  const n = adj.length, K = adj.map((l, x) => adj.map((_, y) => (x === y ? 1 - eps : 0) + (l.includes(y) ? eps / l.length : 0)));
  let row = adj.map((_, y) => (y === x0 ? 1 : 0)); const out = [row];
  for (let j = 1; j <= m; j++) { row = adj.map((_, y) => row.reduce((s, r, k) => s + r * K[k][y], 0)); out.push(row); }
  return out.map((r) => r.slice(0, n));
}
/** The crossings of a closed polyline with z = c: count and the sign of each, in path order. */
function crossings(path, c) {
  const out = [];
  for (let i = 0; i < path.length; i++) { const a = path[i][2] - c, b = path[(i + 1) % path.length][2] - c; if ((a < 0 && b >= 0) || (a >= 0 && b < 0)) out.push(b > a ? 1 : -1); }
  return out;
}
/** The ribbon re-sampled along great circles, 200 points per edge (the page uses 20). */
function ribbonPath(pos, cycle) {
  const pts = [];
  cycle.forEach((a, i) => {
    const p = pos[a], q = pos[cycle[(i + 1) % cycle.length]], om = Math.acos(Math.max(-1, Math.min(1, dot(p, q)))), s = Math.sin(om);
    for (let k = 0; k < 200; k++) { const t = k / 200; pts.push(p.map((x, j) => (x * Math.sin((1 - t) * om) + q[j] * Math.sin(t * om)) / s)); }
  });
  return pts;
}
const LOG_OBS = Math.log10(4.40e26 / 1.616255e-35);

const T = await session();
const { page, check } = T;
{
  check('maths: θ* = 0.7390851332 with sin θ* = 0.6736120292 = √(1 − θ*²)', THETA.toFixed(10) === '0.7390851332' && Math.sin(THETA).toFixed(10) === '0.6736120292' && near(Math.sin(THETA), Math.sqrt(1 - THETA * THETA), 1e-15));
  check('maths: R_obs/ℓ_P = 2.72 × 10⁶¹, log₁₀ = 61.43', (4.40e26 / 1.616255e-35).toExponential(2) === '2.72e+61' && LOG_OBS.toFixed(2) === '61.43');
}

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
const paletteMutations = [], paletteDocuments = [];
async function watchPalette(context) {
  await context.exposeBinding('__indraPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__indraPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__indraPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined,
      dark: matchMedia('(prefers-color-scheme: dark)').matches }).catch(() => {}), { once: true });
  });
  context.on('page', watchPage);
  context.pages().forEach(watchPage);
}
let colorScheme = 'dark';
await watchPalette(T.context);
const browserNewContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async (options) => { const context = await browserNewContext({ ...options, colorScheme }); await watchPalette(context); return context; };
watchPage(page);

await stageFirstChecks(T, BOOK, ID, { solid: true });

/* ---------- sources and registry ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
const suite = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
const [numbered, ...forbidden] = [
  [103, 112, 116], [99, 108, 97, 117, 100, 101], [97, 110, 116, 104, 114, 111, 112, 105, 99], [111, 112, 101, 110, 97, 105],
  [103, 101, 109, 105, 110, 105], [99, 111, 100, 101, 120], [99, 111, 112, 105, 108, 111, 116], [111, 112, 117, 115],
  [115, 111, 110, 110, 101, 116], [104, 97, 105, 107, 117], [108, 108, 109], [97, 103, 101, 110, 116], [99, 104, 97, 116, 98, 111, 116]
].map((codes) => String.fromCharCode(...codes));
const identifiers = new RegExp(`\\b(?:${forbidden.join('|')}|${numbered}-?\\d)\\b`, 'i');
const shortAcronym = new RegExp(`\\b${String.fromCharCode(65, 73)}\\b`);
for (const [file, src] of Object.entries(sources)) {
  check(`source ${file}: no literal colour and no palette switch`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(src) && !/\btrPalette\b|data-tr-palette/.test(src));
  check(`source ${file}: no model, vendor or tool identifiers`, !identifiers.test(src) && !shortAcronym.test(src));
}
check('suite: no model, vendor or tool identifiers', !identifiers.test(suite.replace(/\[[\d, ]+\]/g, '')) && !shortAcronym.test(suite));
check('source: no grid-template-columns in the page stylesheet', !/grid-template-columns\s*:/i.test(sources['style.css']));
check('source: kit.solid without wheel zoom, kit.clock looping', /wheel:\s*false/.test(sources['main.js']) && /loop:\s*true/.test(sources['main.js']));
check('source: the five cards in their public order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1]), Object.keys(CARDS)));
check('source: the page loads only the shared runtime and its own files', same([...sources['index.html'].matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]), ['../assets/shell.js', '../assets/kit.js', 'main.js']));
check('source: no .okmark anywhere', !/okmark/.test(sources['index.html'] + sources['main.js'] + sources['style.css']));
check('source: green and red stay off the stage', !/P\.ok\b|P\.warn\b|var\(--ok\)|var\(--warn\)|c-wn|sw wn/.test(sources['main.js'] + sources['style.css']));
check('source: amber is not a readout colour', !/dl\.ro[^{]*\{[^}]*--amber/.test(sources['style.css']));
{
  // page-authored amber only on the chosen lens segment, the handle and the chief's ring on the stage (the chosen card is the shared theme's)
  const amberRules = [...sources['style.css'].replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^}]*)\}/g)].filter((m) => /--amber/.test(m[2]));
  const allowed = (sel) => /^\.lens-toggle\[aria-pressed="(?:true|false)"\] \.seg\.(?:on|off)$/.test(sel) || /^\.handle(?:$|[.:[])/.test(sel);
  const bad = amberRules.flatMap((m) => m[1].split(',').map((x) => x.trim())).filter((sel) => !allowed(sel));
  check('source: page-authored amber only on the chosen lens segment and the handle (no legend swatch, pill or slider value)', amberRules.length > 0 && bad.length === 0, bad.join(' | '));
  const uses = [...sources['main.js'].matchAll(/^.*P\.amber.*$/gm)].map((m) => m[0].trim());
  check('source: the script uses amber once, for the ring of the chief on the stage (no plot marker, tag or pill)', uses.length === 1 && /^sc\.circle\(c0, AX\.D, /.test(uses[0])
    && !/c-am\b|sw am\b/.test(sources['main.js']) && !/pill hot|c-am\b/.test(sources['index.html']), JSON.stringify(uses));
}
{
  // the linear mixing word and the nonlinear reflection are two different objects, and the page says which theorem covers which
  const box = (gid) => (sources['index.html'].match(new RegExp(`<div class="lean">(?:(?!<div class="lean).)*data-lean-gid="[^"]*\\.${gid}"(?:(?!<div class="lean).)*</div>`, 's')) || [''])[0];
  const word = box('future_word_orthogonal_residual'), dottie = box('rational_inverse_endpoint');
  check('source: the word box calls (K_ε^j Ψ)(x₀) the linear mixing word, not the output of Ψ ↦ cos(K_εΨ), and keeps the 4 + 9 / 2 + 11 split there',
    /\(K<sub>ε<\/sub><sup>j<\/sup>Ψ\)\(x₀\)/.test(word) && /线性的混合观测读字/.test(word) && /linear mixing observation word/.test(word) && /非线性反射 Ψ ↦ cos/.test(word) && /nonlinear reflection Ψ ↦ cos/.test(word)
    && /4 维可见子空间、留下 9 维残差/.test(word) && /2 维、留下 11 维/.test(word) && /at most 4 dimensions and leaves a residual of 9/.test(word) && /spans 2 and leaves 11/.test(word)
    && !/反射 j 次后读到/.test(sources['index.html']) && !/after j reflections/.test(sources['index.html']));
  check('source: the Dottie box calls Ψ⁽ᵐ⁾ = cos(K_εΨ⁽ᵐ⁻¹⁾) the nonlinear contraction, apart from the linear word', /非线性的、由余弦阻尼的 Dottie 压缩/.test(dottie) && /nonlinear Dottie contraction/.test(dottie));
  check('source: the drawer and the note keep the word linear and the reflection nonlinear', /这里读的是线性的混合观测读字，不是上一条的非线性反射/.test(sources['index.html'])
    && /linear mixing observation word, not the nonlinear reflection/.test(sources['index.html']) && /线性读字/.test(sources['main.js']) && /the linear word/.test(sources['main.js']));
}
check('source: the page never claims a finite fibre is the whole space', !/H<sub>x<\/sub> ≅ H<sub>tot<\/sub>|H_x ≅ H_tot/.test(sources['index.html'] + sources['main.js']));
{
  const zh = (sources['index.html'].match(/class="(?:[^"]*\s)?zh(?:\s[^"]*)?"/g) || []).length, en = (sources['index.html'].match(/class="(?:[^"]*\s)?en(?:\s[^"]*)?"/g) || []).length;
  check('source: as many .zh as .en elements', zh === en && zh > 0, `${zh} zh / ${en} en`);
}
check('suite: no fixed waits', !new RegExp('wait' + 'ForTimeout').test(suite));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID);
check('registry: live §39.13 entry with five bilingual cards and the seven theorems', !!entry && entry.status === 'live' && entry.chapter === 39 && entry.section === '39.13'
  && entry.code === 'INDRA//NET' && entry.capture_lock === 'links' && same(entry.presets, Object.keys(CARDS)) && entry.presets.every((c) => entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same(entry.lean.map((x) => x.gid).sort(), [...GIDS].sort()) && entry.tags.length === entry.tags_en.length
  && entry.theory[0].href === `../zh/${THEORY_SEC}` && entry.theory[0].href_en === `../en/${THEORY_SEC}`);
const deps = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'tests', 'dependencies.json'), 'utf8')).suites[`${ID}.test.mjs`] || [];
check('dependencies: the suite is registered with the shared solid runtime and the registry', ['@citations', '@registry-entry', 'theme/viz/kit.js', 'theme/viz/solid-core.js', 'theme/viz/vendor/three.module.min.js', '@lean-links'].every((d) => deps.includes(d)));
for (const lang of ['zh', 'en']) {
  const file = path.join(BOOK_DIR, lang, THEORY.replace(/\.html$/, '.md'));
  if (!fs.existsSync(file)) continue;
  const cited = [...fs.readFileSync(file, 'utf8').matchAll(/::: \{\.viz src="indra-net-single-particle-sandbox"(?: preset="([^"]+)")?/g)].map((m) => m[1]).filter(Boolean);
  check(`chapter ${lang}: every cited card exists`, cited.every((c) => c in CARDS), JSON.stringify(cited));
}

/* ---------- helpers ---------- */
const state = (p = page) => p.evaluate(() => window.INDRA_NET_DEBUG.state);
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
  await until(p, (id) => { const s = window.INDRA_NET_DEBUG.state; return s.preset === id && !s.blending; }, card);
  await pause(p);
}
async function seek(t, p = page) {
  await p.locator('#now').evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, t);
  await settle(p);
}

/* ---------- the net itself, checked once ---------- */
let NET = null;
function checkNet(s) {
  const pos = s.basePositions, outer = pos.slice(1), inv5 = 1 / Math.sqrt(5);
  const dots = new Set();
  for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) dots.add(Math.round(dot(outer[i], outer[j]) * 1e9) / 1e9);
  check('net: one jewel at the centre, twelve unit vectors whose dot products are ±1/√5 and −1 only (an icosahedron)', same(pos[0], [0, 0, 0]) && outer.every((p) => near(nrm(p), 1, 1e-12))
    && [...dots].every((d) => [inv5, -inv5, -1].some((x) => near(d, x, 1e-8))) && [...dots].length === 3);
  const adj = adjacency(pos);
  check('net: 30 edges, every outer jewel with five outer neighbours and the centre, 20 faces', s.edges.length === 30 && adj.slice(1).every((l) => l.length === 6) && adj[0].length === 12 && s.faces.length === 20
    && s.edges.every(([i, j]) => adj[i].includes(j)) && s.faces.every(([a, b, c]) => adj[a].includes(b) && adj[b].includes(c) && adj[a].includes(c)));
  const cyc = s.ribbon;
  check('ribbon: a Hamiltonian cycle on the twelve outer jewels along edges of the net', cyc.length === 12 && new Set(cyc).size === 12 && cyc.every((a) => a >= 1 && a <= 12)
    && cyc.every((a, i) => near(dot(pos[a], pos[cyc[(i + 1) % 12]]), inv5, 1e-12)));
  check('ribbon: six of its edges cross the equator, alternating up and down', cyc.filter((a, i) => Math.sign(pos[a][2]) !== Math.sign(pos[cyc[(i + 1) % 12]][2])).length === 6);
  // the records and their Gram matrix
  const R = s.records, G = R.map((a) => R.map((b) => dot(a, b)));
  const off = Math.max(...G.flatMap((r, a) => r.filter((_, b) => b !== a)));
  check('records: thirteen unit vectors, overlap 1 only on the diagonal, the largest other overlap 1/4 + 3/(4√5) = 0.5854', R.every((r) => near(nrm(r), 1, 1e-12)) && G.every((r, a) => near(r[a], 1, 1e-12))
    && near(off, 0.25 + 0.75 * inv5, 1e-12) && off.toFixed(4) === '0.5854');
  NET = { adj, pos, G };
}

/** Every number of a state against the algorithms of this file. */
function checkMath(s, tag) {
  const I = s.leanInstances, adj = NET.adj;
  check(`${tag}: the net has not moved (positions = scale × base)`, s.positions.every((p, k) => p.every((x, i) => near(x, s.scale * s.basePositions[k][i], 1e-12))) && near(s.scale, 1 - 0.8 * s.zeta, 1e-12));
  // the reflections
  const fields = reflect(adj, s.eps, s.focus, 24), errs = fields.map((f) => Math.max(...f.map((x) => Math.abs(x - THETA))));
  check(`${tag}: Ψ⁽ᵐ⁾ from δ_{x₀} with the mixing matrix built here`, s.psi.every((x, k) => near(x, fields[s.m][k], 1e-12)) && s.errs.every((x, m) => near(x, errs[m], 1e-12)) && near(s.err, errs[s.m], 1e-12));
  check(`${tag}: e_m ≤ (sin 1)^m·e₀ for m ≤ 24 and the limit is θ* everywhere`, errs.every((x, m) => x <= Math.sin(1) ** m * errs[0] + 1e-12) && s.limit.every((x) => near(x, THETA, 1e-12)) && near(s.thetaStar, THETA, 1e-15));
  if (s.m >= 1) check(`${tag}: the reported ratio is e_m/e_{m−1}`, near(s.ratio, errs[s.m] / errs[s.m - 1], 1e-9));
  // the word and its residual
  const E = effects(adj, s.eps, s.focus, s.m), dim = rank(E), W = I.word;
  check(`${tag}: the word of x₀ spans ${dim} dimensions (row reduction here), the residual 13 − ${dim}`, W.dim === dim && W.residualDim === 13 - dim && W.length === s.m + 1);
  const expect = s.eps === 0 ? 1 : Math.min(s.m + 1, s.focus === 0 ? 2 : 4);
  check(`${tag}: ε = ${s.eps}: ${s.focus === 0 ? 'the centre' : 'an outer chief'} reads min(m + 1, ${s.eps === 0 ? 1 : s.focus === 0 ? 2 : 4}) dimensions`, dim === expect, `${dim} vs ${expect}`);
  check(`${tag}: the residual witness is a unit vector orthogonal to every effect; the words and projections of Ψ and Ψ + r agree`, near(W.residualNorm, 1, 1e-9)
    && E.every((e) => Math.abs(dot(e, W.residual)) < 1e-9) && W.wordGap < 1e-12 && W.projGap < 1e-12);
  // the letters are the linear mixing observations (K_εʲΨ)(x₀) = ⟨e_j, Ψ⟩ of the shown field, j = 0 … m (no cosine in them)
  check(`${tag}: the word letters are the linear (K_εʲΨ)(x₀), j = 0 … ${s.m}, computed here as ⟨e_j, Ψ⟩`, W.word.length === s.m + 1 && W.word.every((x, j) => near(x, dot(E[j], s.psi), 1e-12)));
  // Gram, swap
  check(`${tag}: Gram diagonal 1, every other overlap < 1, thirteen classes; the image of x₀ overlaps it at 1`, near(I.gram.diagMin, 1, 1e-12) && near(I.gram.offMax, 0.25 + 0.75 / Math.sqrt(5), 1e-12) && I.gram.classes === 13 && near(I.gram.imageOverlap, 1, 1e-12));
  if (s.focus === 0) check(`${tag}: no rotation takes jewel 1 to the centre, the page says so`, I.swap.exists === false);
  else {
    const g = I.swap.perm, U = I.swap.U, A = [0, 1, 2, 3].map((r) => s.records.map((c) => c[r])), B = [0, 1, 2, 3].map((r) => g.map((y) => s.records[y][r]));
    const UA = U.map((row) => A[0].map((_, c) => row.reduce((t, x, k) => t + x * A[k][c], 0)));
    const UtU = [0, 1, 2, 3].map((i) => [0, 1, 2, 3].map((j) => U.reduce((t, row) => t + row[i] * row[j], 0)));
    const auto = g[0] === 0 && new Set(g).size === 13 && adj.every((l, x) => l.every((y) => adj[g[x]].includes(g[y])));
    check(`${tag}: the swap g takes jewel 1 to x₀ and is an automorphism; BᵀB = AᵀA; U unitary with B = UA`, I.swap.exists && g[1] === s.focus && auto
      && g.every((y, a) => g.every((z, b) => near(NET.G[y][z], NET.G[a][b], 1e-12))) && UtU.every((r, i) => r.every((x, j) => near(x, i === j ? 1 : 0, 1e-9)))
      && UA.every((r, i) => r.every((x, c) => near(x, B[i][c], 1e-9))));
  }
  // page table
  const lookup = (x, slot) => (slot === 0 ? x : adj[x][slot - 1] != null ? adj[x][slot - 1] : x), walk = (x, p) => p.reduce(lookup, x);
  const t = I.table;
  check(`${tag}: page table rooted at x₀: [i, j] reaches data, [self, i] reaches leaf, self^d returns to the root for d ≤ m`, t.root === s.focus && t.selfFixed && t.leaf === lookup(s.focus, 1)
    && t.data === lookup(t.leaf, 1) && t.walkIJ === walk(s.focus, [1, 1]) && t.walkIJ === t.data && t.walkSelfI === t.leaf && t.depths.length === s.m + 1 && t.depths.every((x) => x === s.focus));
  // θ*, faces, objectivity
  check(`${tag}: θ* with |cos θ* − θ*| < 1e-15, one sign change on (0, 2], sin θ* = √(1 − θ*²)`, near(I.dottie.theta, THETA, 1e-15) && I.dottie.residual < 1e-15 && I.dottie.signChanges === 1
    && near(I.dottie.sinTheta, Math.sin(THETA), 1e-15) && near(I.dottie.sqrt, Math.sin(THETA), 1e-15) && I.dottie.boundOk);
  const F = I.faces, X = F.X.map((a) => s.faces[a]);
  const bnd = s.edges.filter(([i, j]) => X.filter((f) => f.includes(i) && f.includes(j)).length === 1).map(([i, j]) => `${i}-${j}`).sort();
  const rib = s.ribbon.map((a, i) => { const b = s.ribbon[(i + 1) % 12]; return a < b ? `${a}-${b}` : `${b}-${a}`; }).sort();
  // the boundary map over GF(2), reduced here
  const M = s.faces.map((f) => s.edges.map(([i, j]) => (f.includes(i) && f.includes(j) ? 1 : 0)));
  let rk = 0; const Mm = M.map((r) => r.slice());
  for (let c = 0; c < 30 && rk < 20; c++) { const p = Mm.findIndex((r, k) => k >= rk && r[c]); if (p < 0) continue; [Mm[rk], Mm[p]] = [Mm[p], Mm[rk]]; for (let r = 0; r < 20; r++) if (r !== rk && Mm[r][c]) Mm[r] = Mm[r].map((x, j) => x ^ Mm[rk][j]); rk++; }
  check(`${tag}: ∂ has rank 19 over GF(2), kernel {0, 1}; the ribbon is the boundary of ten faces (and of the other ten)`, rk === 19 && F.rank === 19 && F.kernel === 1 && F.Xsize === 10 && F.complement === 10
    && same(bnd, rib) && F.boundaryIsRibbon && !F.conflict && F.V - F.E + F.F === 2);
  const lim = NET.pos.map((_, x) => reflect(adj, s.eps, x, 500)[500]);
  check(`${tag}: all thirteen chiefs reach θ*: the common factor`, I.objective.contexts === 13 && near(I.objective.factor, THETA, 1e-15) && lim.every((l) => l.every((x) => near(x, THETA, 1e-12))) && I.objective.gap < 1e-12);
  // mirror clarities for the current view
  const c0 = s.positions[s.focus];
  check(`${tag}: every image's clarity is (1 + D·d̂)/2 = cos² of the bisector angle`, s.mirror.length === 12 && s.mirror.every((im) => {
    const d = unit(sub(s.positions[im.y], c0)), cl = (1 + dot(s.view, d)) / 2;
    return near(im.clarity, cl, 1e-12) && near(im.cosTheta ** 2, cl, 1e-9);
  }));
  // knots on the slice
  const path = ribbonPath(s.positions.map((p) => p.map((x) => x / (s.scale || 1))), s.ribbon).map((p) => p.map((x) => x * s.scale));
  const cr = crossings(path, s.zNow);
  check(`${tag}: knots at z = ${s.zNow.toFixed(3)}: ${cr.length}, alternating, Σq = 0 (re-sampled here)`, s.knots.length === cr.length && s.knots.reduce((a, k) => a + k.q, 0) === 0
    && s.knots.every((k, i) => i === 0 || k.q === -s.knots[i - 1].q) && s.knots.every((k) => near(k.p[2], s.zNow, 1e-12)));
  check(`${tag}: the cosmic scale is 10^(61.43ζ)`, near(s.logScale, LOG_OBS * s.zeta, 1e-12));
}

async function checkLinks(p, tag) {
  check(`${tag}: exactly the seven green Lean links, in #evidence`, same(await p.$$eval('[data-lean-gid]', (els) => els.map((e) => e.dataset.leanGid).sort()), [...GIDS].sort())
    && await p.$$eval('[data-lean-gid]', (els) => els.every((e) => e.closest('.col.side #evidence .lean') && e.closest('.lean').querySelector('.ok').textContent.trim() === 'LEAN ✓')));
  check(`${tag}: one ARGUED, MODEL, NUM and OPEN box each`, await p.evaluate(() => ['argued', 'model', 'num', 'open'].every((c) => document.querySelectorAll(`#evidence .lean.${c}`).length === 1)
    && document.querySelectorAll('#evidence .lean:not(.argued):not(.model):not(.num):not(.open):not(.frozen)').length === 7));
  check(`${tag}: bilingual §39.13 theory link in the drawer, on the section fragment`, same(await p.$$eval('#drawer .refs a', (els) => els.map((e) => e.getAttribute('href')).sort()), ['zh', 'en'].map((l) => `../../${l}/${THEORY_SEC}`).sort()));
  check(`${tag}: the OPEN box links the §39.12 and §39.11 problems in both languages`, same(await p.$$eval('#evidence .lean.open a', (els) => els.map((e) => e.getAttribute('href')).sort()),
    ['zh', 'en'].flatMap((l) => OPEN_LINKS.map((x) => `../../${l}/${x}`)).sort()));
  check(`${tag}: the ARGUED box names Reeh–Schlieder and the MODEL box keeps H_x apart from H_tot`, await p.evaluate(() => /Reeh–Schlieder/.test(document.querySelector('#evidence .lean.argued').textContent)
    && /H<sub>tot<\/sub>/.test(document.querySelector('#evidence .lean.model').innerHTML)));
}

/* ---------- runtime contract ---------- */
await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
await checkLinks(page, 'runtime');
{ const s = await state(); checkNet(s); }
check('layout: the shared three-column lab, the stage and the strip in the middle', await page.evaluate(() => {
  const app = document.querySelector('.app.lab'), deck = app.querySelector(':scope > .deck'), center = app.querySelector(':scope > .center'), side = app.querySelector(':scope > .side');
  const d = deck.getBoundingClientRect(), c = center.getBoundingClientRect(), s = side.getBoundingClientRect();
  return getComputedStyle(app).gridTemplateColumns.trim().split(/\s+/).length === 3 && d.right <= c.left + 1 && c.right <= s.left + 1
    && !!center.querySelector(':scope > #stage') && !!center.querySelector(':scope > .tour#tour') && !!center.querySelector(':scope > .strip #plot')
    && !document.querySelector('#stage #plot') && !!side.querySelector(':scope > #readouts dl.ro') && !!side.querySelector(':scope > #evidence')
    && !!document.querySelector('#stage[data-thumb] > canvas#cv') && document.querySelector('#stage > button.handle#indraHandle[type="button"]') !== null;
}));
check('layout: #rail holds the lens toggle, the cards and #ctlPanel with the four sliders', await page.evaluate(() => {
  const deck = document.querySelector('.app.lab > aside.col.deck#rail'), lens = document.querySelector('#lensToggleBtn.lens-toggle'), cards = document.querySelector('.presets.cards#presets');
  const ctl = document.querySelector('#ctlPanel'), F = Node.DOCUMENT_POSITION_FOLLOWING;
  return !!deck && deck.contains(lens) && deck.contains(cards) && deck.contains(ctl) && !!(lens.compareDocumentPosition(cards) & F) && !!(cards.compareDocumentPosition(ctl) & F)
    && ['focusJewel', 'mirrorCurvature', 'reflectionDepth', 'cosmicZoom'].every((id) => ctl.contains(document.getElementById(id)) && document.getElementById(id).type === 'range')
    && document.querySelectorAll('#presets [data-preset]').length === 5;
}));
check('layout: #infoBtn is the first child of #evidence, above every evidence box', await page.evaluate(() => {
  const ev = document.querySelector('.app.lab > aside.col.side > #evidence'), btn = document.querySelector('#infoBtn');
  const boxes = [...ev.querySelectorAll('.lean')], top = btn.getBoundingClientRect();
  return ev.firstElementChild === btn && btn.matches('button.chip[type="button"]') && boxes.length === 11 && boxes.every((b) => top.bottom <= b.getBoundingClientRect().top + 0.5);
}));
check('layout: opens on the first card at its still, paused: the chief is jewel 4, facing the camera', await page.evaluate(() => { const s = window.INDRA_NET_DEBUG.state; return s.preset === 'yoneda-isomorphic-jewel-net' && s.t === 0.35 && !s.playing && s.focus === 4 && !window.INDRA_NET_DEBUG.jewelPoint(4).hidden; }));
check('sliders: x₀ over 0 … 12, ε over [0, 1], m over 0 … 24, ζ over [0, 1]', await page.evaluate(() => {
  const g = (id) => document.getElementById(id);
  return g('focusJewel').max === '12' && g('focusJewel').step === '1' && g('mirrorCurvature').max === '1' && g('reflectionDepth').max === '24' && g('reflectionDepth').step === '1' && g('cosmicZoom').max === '1';
}));
check('readouts: no amber on any readout', await page.evaluate(() => {
  const probe = document.createElement('span'); probe.style.color = 'var(--amber)'; document.body.appendChild(probe);
  const amber = getComputedStyle(probe).color; probe.remove();
  return [...document.querySelectorAll('dl.ro dd, dl.ro dd *')].every((e) => getComputedStyle(e).color !== amber);
}));
check('stage: no warn-red and no ok-green label or swatch', await page.evaluate(() => !document.querySelector('#stage .c-wn, #stage .sw.wn, #stage .c-ok, #stage .sw.ok')));
check('amber: no header pill, slider value, legend swatch or stage tag is amber', await page.evaluate(() => {
  const probe = document.createElement('span'); probe.style.color = 'var(--amber)'; document.body.appendChild(probe);
  const amber = getComputedStyle(probe).color; probe.remove();
  const els = [...document.querySelectorAll('.status .pill, .status .pill *, .field output, #legend, #legend *, #stage .tag, #stage .tag *')];
  return els.length > 10 && els.every((e) => { const cs = getComputedStyle(e); return ![cs.color, cs.backgroundColor, cs.borderTopColor, cs.borderLeftColor].includes(amber); });
}));
{ const s = await state(); checkMath(s, 'opening frame'); }

/* ---------- every card, both languages ---------- */
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  for (const card of Object.keys(CARDS)) {
    await pick(card);
    await seek(stillT(card));
    const s = await state(), c = CARDS[card];
    check(`${lang}/${card}: the card sets lens and drive, paused at its still`, s.preset === card && s.lens === c.lens && s.drive === c.drive && !s.playing && near(s.tau, stillT(card), 1e-12)
      && String(await page.getAttribute(`[data-preset="${card}"]`, 'data-still')) === String(c.still) && near(s.camera.pitch, VIEW0[1], 1e-9)
      && near(s.camera.yaw, c.drive === 'orbit' ? VIEW0[0] + 2 * Math.PI * stillT(card) : VIEW0[0], 1e-9));
    checkMath(s, `${lang}/${card}`);
    const v = await stageView(page, '#stage', false), lo = await labelOverlaps(page, '.stage .tag', 0);
    check(`${lang}/${card}: desktop stage, HUD and labels clear`, v.layout.length === 0 && v.hud.length === 0 && lo.length === 0, [...v.layout, ...v.hud, ...lo.map((x) => x.join(' / '))].join(' | '));
  }
}
await page.click('[data-lang-set="zh"]'); await settle(page);

// the numbers the card notes name
await pick('yoneda-isomorphic-jewel-net');
{
  const seen = [];
  for (const t of [0, 0.08, 0.31, 0.5, 0.77, 0.999]) { await seek(t); const s = await state(); seen.push(s); check(`card 1 at τ = ${t}: the chief is jewel ${Math.min(12, Math.floor(13 * t))}`, s.focus === Math.min(12, Math.floor(13 * t))); }
  check('card 1: as the chief changes, not one jewel moves', seen.every((s) => same(s.positions, seen[0].positions)));
}
await pick('wheeler-single-ribbon-knots');
for (const [t, n] of [[0, 0], [0.18, 2], [0.5, 6], [0.62, 6], [0.82, 2], [1, 0]]) {
  await seek(t); const s = await state();
  check(`card 2 at τ = ${t}: z_now = ${(-1.25 + 2.5 * t).toFixed(3)}, ${n} knots`, near(s.zNow, -1.25 + 2.5 * t, 1e-12) && s.knots.length === n);
  checkMath(s, `card 2 at τ = ${t}`);
}
await seek(0.5);
{ const s = await state(); check('card 2 note: at τ = 0.5 the slice passes the centre with six knots of alternating sign, Σq = 0, ten faces', near(s.zNow, 0, 1e-12) && s.knots.length === 6 && s.knots.reduce((a, k) => a + k.q, 0) === 0 && s.leanInstances.faces.Xsize === 10); }
await pick('spherical-mirror-limb-foreshortening');
{
  const s = await state();
  check('card 3: the centre is the chief; its mirror has twelve images, the clearest near 1 and the most squashed near 0', s.focus === 0 && s.mirror.length === 12 && Math.max(...s.mirror.map((m) => m.clarity)) > 0.9 && Math.min(...s.mirror.map((m) => m.clarity)) < 0.1);
  await seek(0.25); const s2 = await state();
  check('card 3: the rail turns the view by 90° about the vertical, the images slide, the net stays', near(s2.camera.yaw, VIEW0[0] + Math.PI / 2, 1e-9) && same(s2.positions, s.positions) && !same(s2.mirror, s.mirror));
  checkMath(s2, 'card 3 at τ = 0.25');
}
await pick('dottie-infinite-reflection-convergence');
for (const [t, m] of [[0, 0], [0.5, 12], [1, 24]]) { await seek(t); const s = await state(); check(`card 4 at τ = ${t}: m = ${m}`, s.m === m && s.focus === 0); checkMath(s, `card 4 at m = ${m}`); }
{ const s = await state(); check('card 4 note: e₂₄ = 2.80 × 10⁻⁵ and the ratio of the last steps is sin θ* to 3 decimals', s.err.toExponential(2) === '2.80e-5' && Math.abs(s.ratio - Math.sin(THETA)) < 1e-3); }
await pick('observable-cosmos-single-jewel');
await seek(1);
{ const s = await state(); check('card 5 note: ζ = 1, log₁₀(R/ℓ_P) = 61.43, the net shrunk to 0.2', near(s.zeta, 1, 1e-12) && s.logScale.toFixed(2) === '61.43' && near(s.scale, 0.2, 1e-12)); }

/* ---------- every control ---------- */
await pick('yoneda-isomorphic-jewel-net');
for (const v of [0, 1, 7, 12]) { await input('#focusJewel', v); const s = await state(); check(`slider x₀ = ${v}: leaves the card`, s.preset === null && s.focus === v && s.drive === 'free'); checkMath(s, `x₀ = ${v}`); }
for (const v of [0, 0.25, 1]) { await input('#mirrorCurvature', v); const s = await state(); check(`slider ε = ${v}`, near(s.eps, v, 1e-12)); checkMath(s, `ε = ${v}`); }
await input('#mirrorCurvature', 0.5);
for (const v of [0, 1, 3, 9, 24]) { await input('#reflectionDepth', v); const s = await state(); check(`slider m = ${v}`, s.m === v); checkMath(s, `m = ${v}`); }
await input('#reflectionDepth', 2);
for (const v of [0, 0.5, 1]) { await input('#cosmicZoom', v); const s = await state(); check(`slider ζ = ${v}`, near(s.zeta, v, 1e-12) && near(s.scale, 1 - 0.8 * v, 1e-12)); checkMath(s, `ζ = ${v}`); }
await input('#cosmicZoom', 0);
{
  const before = await state();
  await page.click('#lensToggleBtn'); await settle(page);
  const a = await state();
  check('lens toggle: to the Wheeler ribbon, same chief, ε, m and ζ', a.lens === 'wheeler' && a.focus === before.focus && a.eps === before.eps && a.m === before.m && a.zeta === before.zeta
    && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === 'true');
  checkMath(a, 'Wheeler lens');
  await page.click('#lensToggleBtn'); await settle(page);
  check('lens toggle: back to the net', (await state()).lens === 'indra' && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === 'false');
}
// free play: the rail is the time of the slice
{ await seek(0.3); const s = await state(); check('free play: the rail sets z_now', s.drive === 'free' && near(s.zNow, -1.25 + 0.75, 1e-12)); }

/* ---------- picking jewels: a click, a hidden jewel, the handle ---------- */
await pick('yoneda-isomorphic-jewel-net');
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const pts = await page.evaluate(() => Array.from({ length: 13 }, (_, k) => window.INDRA_NET_DEBUG.jewelPoint(k)));
  const vis = pts.map((p, k) => [p, k]).filter(([p, k]) => !p.hidden && k !== 6), hid = pts.map((p, k) => [p, k]).filter(([p]) => p.hidden);
  if (vis.length) {
    const [p, k] = vis[0], before = await state();
    await page.mouse.click(p.x, p.y); await settle(page);
    const s = await state();
    check(`click: the visible jewel ${k} becomes the chief, the camera and the net stay`, s.focus === k && s.preset === null && same(s.camera, before.camera) && same(s.positions, before.positions), `${s.focus}`);
  }
  if (hid.length) {
    const [p, k] = hid[0];
    await page.mouse.click(p.x, p.y); await settle(page);
    check(`click: jewel ${k}, hidden behind another, cannot be picked`, (await state()).focus !== k);
  }
}
{
  await input('#focusJewel', 1);
  const before = await state(), h = await page.evaluate(() => window.INDRA_NET_DEBUG.handleBox());
  const pts = await page.evaluate(() => Array.from({ length: 13 }, (_, k) => window.INDRA_NET_DEBUG.jewelPoint(k)));
  const target = pts.map((p, k) => [p, k]).find(([p, k]) => !p.hidden && k !== 1 && k !== 0);
  check('handle: a visible amber button by the ring of the chief', !!h && await page.locator('#indraHandle').isVisible() && !!before.handle);
  if (h && target) {
    await page.mouse.move(h.x, h.y); await page.mouse.down();
    check('handle: pointerdown starts a drag', await page.locator('#indraHandle').evaluate((el) => el.classList.contains('dragging')));
    await page.mouse.move(target[0].x, target[0].y, { steps: 8 }); await page.mouse.up(); await settle(page);
    const after = await state();
    check(`handle: dragged onto jewel ${target[1]}, it becomes the chief; the camera stays`, after.focus === target[1] && same(after.camera, before.camera), `${after.focus}`);
    checkMath(after, 'after the handle drag');
  }
  const f0 = (await state()).focus;
  await page.locator('#indraHandle').focus(); await page.keyboard.press('ArrowRight'); await settle(page);
  check('handle: → moves the chief to the next jewel', (await state()).focus === (f0 + 1) % 13);
}

/* ---------- drawer, playback ---------- */
await page.click('#infoBtn'); await settle(page);
check('info button opens the theory drawer', await page.locator('#drawer [role="dialog"]').isVisible());
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').isHidden());
check('play advances the rail', await playsAfter(page, () => page.locator('#play').evaluate((b) => b.click()), () => window.INDRA_NET_DEBUG.state));
await pause();
{ const a = await state(); await settle(page); const b = await state(); check('pause holds the clock', !a.playing && a.t === b.t); }
for (const card of Object.keys(CARDS)) {
  check(`card ${card}: a click plays its story`, await playsAfter(page, () => page.click(`[data-preset="${card}"]`), () => window.INDRA_NET_DEBUG.state));
  await pause();
}

/* ---------- desktop and phone, both languages ---------- */
for (const lang of ['zh', 'en']) for (const [width, height, scheme] of [[1440, 900, 'dark'], [390, 844, 'light']]) {
  colorScheme = scheme;
  const p = await T.open(BOOK, ID, `?lang=${lang}`, { viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US', reducedMotion: 'reduce' });
  await settle(p);
  const tag = `${lang}/${width}x${height}/${scheme}`;
  check(`${tag}: no palette attribute under a ${scheme} system scheme`, await p.evaluate(() => document.documentElement.dataset.trPalette === undefined));
  await checkLinks(p, tag);
  for (const card of Object.keys(CARDS)) {
    await pick(card, p); const s = await state(p);
    check(`${tag}/${card}: card applies`, s.preset === card && !s.playing);
    const v = await stageView(p, '#stage', false), lo = await labelOverlaps(p, '.stage .tag', 0), cg = await capitalGreek(p), ox = await overflowX(p);
    check(`${tag}/${card}: layout, HUD, labels, capitals and overflow`, v.layout.length === 0 && v.hud.length === 0 && lo.length === 0 && cg.length === 0 && ox <= 0,
      [...v.layout, ...v.hud, ...lo.map((x) => x.join(' / ')), ...cg, `overflow ${ox}`].join(' | '));
    if (lang === 'en') check(`${tag}/${card}: no Chinese on screen`, (await cjkLeftovers(p)).length === 0);
  }
  await p.context().close();
}
colorScheme = 'dark';

/* ---------- the cited frames a chapter will use ---------- */
for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) for (const width of [334, 740]) {
  const p = await T.open(BOOK, ID, `?embed=1&lang=${lang}&preset=${card}`, { viewport: { width, height: 500 }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
  await settle(p);
  await p.evaluate(() => { TRV.kit.pause(); TRV.kit.flush(); });
  const tag = `cited ${width}x500 ${lang}/${card}`;
  const s = await state(p), v = await stageView(p, '#stage', true), lo = await labelOverlaps(p, '.stage .tag', 0), cg = await capitalGreek(p), ox = await overflowX(p);
  check(`${tag}: opens on the card`, s.preset === card && await p.evaluate(() => document.documentElement.dataset.figure === '1'));
  check(`${tag}: stageView layout and HUD empty`, v.layout.length === 0 && v.hud.length === 0, [...v.layout, ...v.hud].join(' | '));
  check(`${tag}: labels apart, capitals kept, no sideways scroll`, lo.length === 0 && cg.length === 0 && ox === 0, JSON.stringify({ lo, cg, ox }));
  if (lang === 'en') check(`${tag}: no Chinese on screen`, (await cjkLeftovers(p)).length === 0);
  check(`${tag}: the strip is not in the frame, the note is one short sentence without scripts`, await p.evaluate(() => {
    const st = document.querySelector('.strip'), note = document.querySelector('.tour .tour-note');
    return (!st || getComputedStyle(st).display === 'none') && !document.querySelector('#stage #plot') && !!note && note.textContent.length < 140 && !note.querySelector('sub, sup');
  }));
  await p.context().close();
}

/* ---------- the stills a chapter prints ---------- */
for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) {
  const p = await openStill(T, BOOK, ID, card, lang), s = await state(p);
  check(`still ${lang}/${card}: paused on the declared frame, no handle`, s.preset === card && !s.playing && near(s.t, stillT(card), 1e-12) && await p.locator('#indraHandle').isHidden()
    && await p.evaluate(() => TRV.still && TRV.shot && document.documentElement.dataset.trPalette === undefined));
  if (card === 'yoneda-isomorphic-jewel-net') check(`still ${lang}/${card}: the chief is jewel 4, in front of the net`, s.focus === 4 && s.mirror.length === 12);
  if (card === 'wheeler-single-ribbon-knots') check(`still ${lang}/${card}: six knots, Σq = 0`, s.knots.length === 6 && s.knots.reduce((a, k) => a + k.q, 0) === 0);
  if (card === 'spherical-mirror-limb-foreshortening') check(`still ${lang}/${card}: the centre chief, twelve images`, s.focus === 0 && s.mirror.length === 12);
  if (card === 'dottie-infinite-reflection-convergence') check(`still ${lang}/${card}: m = 24, e = 2.80 × 10⁻⁵`, s.m === 24 && s.err.toExponential(2) === '2.80e-5');
  if (card === 'observable-cosmos-single-jewel') check(`still ${lang}/${card}: ζ = 1, 10^61.43`, near(s.zeta, 1, 1e-12) && s.logScale.toFixed(2) === '61.43');
  checkMath(s, `still ${lang}/${card}`);
  await p.context().close();
}

check('palette: every observed document stayed without data-tr-palette', paletteDocuments.length > 0 && paletteDocuments.every((r) => r.absent), JSON.stringify(paletteDocuments.filter((r) => !r.absent)));
check('palette: dark and light system schemes were both observed', paletteDocuments.some((r) => r.dark) && paletteDocuments.some((r) => !r.dark));
check('palette: zero attempted writes', paletteMutations.length === 0, JSON.stringify(paletteMutations));
check('zero page, console and request errors', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
check('zero browser console warnings after driver filtering', browserWarnings.length === 0, browserWarnings.slice(0, 4).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, T.warnings.map((w) => `${w.name}: ${w.detail}`).join(' | '));
await T.finish();
