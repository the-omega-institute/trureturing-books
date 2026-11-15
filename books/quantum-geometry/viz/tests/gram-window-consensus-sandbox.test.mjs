// GRAM//CONSENSUS browser regression: the shared stage-first gate, then every claim of the page against geometry written
// here (never the page's own functions), and every control as a reader uses it.
// Run directly with node; VIZ_PHASE1=1 skips the repeated card/still matrix, VIZ_SLOW_FRAMES=1000 spaces animation
// frames a second apart (transitions are settled, playback is watched, nothing waits a fixed time).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'gram-window-consensus-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const PHASE1 = process.env.VIZ_PHASE1 === '1';
const CARDS = {
  'schur-cap-corridor': { M: 2, still: 2, dual: false, gram: 'caps', plays: false },
  'golden-triangle-m3': { M: 3, still: 3, dual: false, gram: 'caps', plays: true },
  'overconstrained-lock-m9': { M: 10, still: 9, dual: false, gram: 'ortho', plays: true },
  'forgetting-reopen': { M: 8, still: 8, dual: false, gram: 'caps', plays: false, released: [9] },
  'dual-window-consensus': { M: 3, still: 3, dual: true, gram: 'caps', plays: false, released: [9, 8, 7, 6, 5, 4] }
};
const GIDS = [
  'D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization',
  'D5/S3/QuantumContext/TwoAnchorGram.two_anchor_gram_det_formula',
  'D5/S3/QuantumContext/TwoAnchorGram.two_anchor_gram_det_pos_iff',
  'D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula',
  'D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff',
  'D5/S3/QuantumBounds/GramRealizability.gram_realizability',
  'D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq',
  'D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities',
  'D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape',
  'D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity',
  'D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal',
  'D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor',
  'D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance'
];
const FROZEN = [];
const THEORY = ['zh', 'en'].map((lang) => `../../${lang}/ch34-s18-gram-window-and-consensus.html#sec-ch34-gram-window-and-consensus`);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;

/* ---------- independent geometry (written for this suite; it shares no code with main.js) ---------- */
const DEG = Math.PI / 180, GOLDEN = Math.PI * (3 - Math.sqrt(5)), FOUR_PI = 4 * Math.PI;
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const crs = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const nrm = (a) => { const n = Math.hypot(...a); return a.map((x) => x / n); };
const record = (j) => { const b = (12 + 6 * (j - 1)) * DEG, p = (j - 1) * GOLDEN; return [Math.sin(b) * Math.cos(p), Math.sin(b) * Math.sin(p), Math.cos(b)]; };
const tilt = (eta, v) => [Math.cos(eta) * v[0] + Math.sin(eta) * v[2], v[1], -Math.sin(eta) * v[0] + Math.cos(eta) * v[2]];
/** The cap inequalities x·n ≥ h of the first M records of A (and of B = R_y(η)A). */
function capsOf(M, alphaDeg, etaDeg) {
  const h = Math.cos(alphaDeg * DEG), out = [];
  for (let j = 1; j <= M; j++) { out.push([record(j), h]); if (etaDeg != null) out.push([tilt(etaDeg * DEG, record(j)), h]); }
  return out;
}
const slack = (cs, p) => cs.reduce((m, [n, h]) => Math.min(m, dot(p, n) - h), Infinity);
/** A point deep inside: the best of 20 000 spiral points, refined by a shrinking compass search on max-min slack. */
function interior(cs) {
  let best = [0, 0, 1], bv = -Infinity;
  const N = 20000;
  for (let i = 0; i < N; i++) { const z = 1 - 2 * (i + 0.5) / N, r = Math.sqrt(1 - z * z), p = [r * Math.cos(i * GOLDEN), r * Math.sin(i * GOLDEN), z], s = slack(cs, p); if (s > bv) { bv = s; best = p; } }
  for (let step = 0.02; step > 1e-7;) {
    let moved = false;
    for (const d of [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]) { const q = nrm(best.map((x, k) => x + step * d[k])), s = slack(cs, q); if (s > bv) { bv = s; best = q; moved = true; } }
    if (!moved) step /= 2;
  }
  return { c: best, slack: bv };
}
/** Area of a convex cap intersection: from an interior point c, the exit distance ρ(ψ) of each geodesic by stepping
    and bisection, then |Ω| = ∫ (1 − cos ρ(ψ)) dψ by Simpson's rule. */
function areaOf(cs, nPsi = 6000) {
  if (!cs.length) return FOUR_PI;
  const { c, slack: s0 } = interior(cs);
  if (s0 <= 0) return 0;
  const e1 = nrm(crs(c, Math.abs(c[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])), e2 = crs(c, e1);
  const exit = (psi) => {
    const d = e1.map((x, k) => Math.cos(psi) * x + Math.sin(psi) * e2[k]), ok = (t) => slack(cs, c.map((x, k) => Math.cos(t) * x + Math.sin(t) * d[k])) >= 0;
    let t = 0;
    while (t < Math.PI && ok(t + 0.01)) t += 0.01;
    if (t >= Math.PI) return Math.PI;
    let lo = t, hi = t + 0.01;
    for (let k = 0; k < 50; k++) { const m = (lo + hi) / 2; if (ok(m)) lo = m; else hi = m; }
    return lo;
  };
  let s = 0;
  for (let k = 0; k <= nPsi; k++) s += (k === 0 || k === nPsi ? 1 : k % 2 ? 4 : 2) * (1 - Math.cos(exit(2 * Math.PI * k / nPsi)));
  return s * (2 * Math.PI / nPsi) / 3;
}
/** Deterministic Fibonacci count (a second, cruder check). */
function fibArea(cs, N) {
  let hit = 0;
  for (let i = 0; i < N; i++) { const z = 1 - 2 * (i + 0.5) / N, r = Math.sqrt(1 - z * z), p = [r * Math.cos(i * GOLDEN), r * Math.sin(i * GOLDEN), z]; if (slack(cs, p) >= 0) hit += 1; }
  return FOUR_PI * hit / N;
}
/** The eigenvalues of a symmetric 3 × 3 matrix by the trigonometric solution of its characteristic cubic. */
function eig3(A) {
  const p1 = A[0][1] ** 2 + A[0][2] ** 2 + A[1][2] ** 2, q = (A[0][0] + A[1][1] + A[2][2]) / 3;
  const p2 = (A[0][0] - q) ** 2 + (A[1][1] - q) ** 2 + (A[2][2] - q) ** 2 + 2 * p1, p = Math.sqrt(p2 / 6);
  if (p < 1e-15) return [q, q, q];
  const B = A.map((r, i) => r.map((x, j) => (x - (i === j ? q : 0)) / p));
  const detB = B[0][0] * (B[1][1] * B[2][2] - B[1][2] * B[2][1]) - B[0][1] * (B[1][0] * B[2][2] - B[1][2] * B[2][0]) + B[0][2] * (B[1][0] * B[2][1] - B[1][1] * B[2][0]);
  const phi = Math.acos(Math.max(-1, Math.min(1, detB / 2))) / 3;
  const l1 = q + 2 * p * Math.cos(phi), l3 = q + 2 * p * Math.cos(phi + 2 * Math.PI / 3);
  return [l3, 3 * q - l1 - l3, l1].sort((a, b) => a - b);
}
/** ‖x − P_S x‖² with P_S from Gram–Schmidt on the records (the Schur margin of the drawn caps). */
function schurCaps(M, x) {
  const basis = [];
  for (let j = 1; j <= M; j++) {
    let v = record(j);
    for (const b of basis) { const c = dot(v, b); v = v.map((t, k) => t - c * b[k]); }
    const n = Math.hypot(...v);
    if (n > 1e-9) basis.push(v.map((t) => t / n));
  }
  let r = x.slice();
  for (const b of basis) { const c = dot(r, b); r = r.map((t, k) => t - c * b[k]); }
  return { delta: dot(r, r), rank: basis.length };
}
const equiDelta = (M) => (M + 8) / (4 * (M + 2));
const equiDet = (M) => (2 / 3) ** (M - 1) * (M + 2) / 3;

// the benchmark table (six decimals) and the independent areas
const BENCH = { 1: 3.141593, 2: 2.297861, 3: 1.802272, 4: 1.412802, 5: 1.049640, 6: 0.720881, 7: 0.436215, 8: 0.208320, 9: 0.054604 };
const AREA = {}, DUAL = {};
for (let M = 0; M <= 10; M++) AREA[M] = areaOf(capsOf(M, 60));
for (const M of [1, 2, 3, 4, 5, 6, 7, 8, 9]) DUAL[M] = areaOf(capsOf(M, 60, 10));

const T = await session();
const { page, check } = T;

// headless Chromium can report driver diagnostics as warnings: harmless; every other warning fails the suite
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
// the shared night console is single-theme: the page never writes a palette override, before or after its scripts run
const paletteMutations = [], paletteDocuments = [];
async function watchPalette(context) {
  await context.exposeBinding('__gramPaletteAudit', ({ page: p }, rec) => { (rec.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...rec }); });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__gramPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__gramPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined,
      dark: matchMedia('(prefers-color-scheme: dark)').matches }).catch(() => {}), { once: true });
  });
  context.on('page', watchPage);
  context.pages().forEach(watchPage);
}
let requestedColorScheme = 'dark';
await watchPalette(T.context);
const browserNewContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async (options) => { const c = await browserNewContext({ ...options, colorScheme: requestedColorScheme }); await watchPalette(c); return c; };
watchPage(page);
await page.emulateMedia({ colorScheme: 'dark' });

/* ---------- the shared gate: desktop, phone, the frame in a chapter, cited cards, stills, cover, reduced motion, solid ---------- */
await stageFirstChecks(T, BOOK, ID, { solid: true, cards: !PHASE1, settle: 0 });

const state = (p = page) => p.evaluate(() => window.GRAM_WINDOW_DEBUG.state);
const setState = async (o, p = page) => { await p.evaluate((v) => window.GRAM_WINDOW_DEBUG.setState(v), o); await settle(p); return state(p); };
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
  await settle(p);
  return state(p);
}
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  await settle(p);
  if ((await state(p)).playing) await p.click('#play');
  await settle(p);
  return state(p);
}

/* ---------- source contract ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
for (const [file, src] of Object.entries(sources)) {
  check(`source ${file}: no literal colour or palette override`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(src) && !/\btrPalette\b|data-tr-palette|--warn\b/.test(src));
}
check('source: shared three-column grid (no grid-template-columns) and kit.solid with wheel:false', !/grid-template-columns\s*:/i.test(sources['style.css']) && /kit\.solid\([^)]*\boptions\b/.test(sources['main.js']) && /wheel:\s*false/.test(sources['main.js']));
check('source: the five cards in order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1]), Object.keys(CARDS)));
check('source: only the shared scripts', same([...sources['index.html'].matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]), ['../assets/shell.js', '../assets/kit.js', 'main.js']));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID) || {};
check('registry: live §34.18 entry with the five cards and the thirteen GIDs of its green boxes', entry.status === 'live' && entry.chapter === 34 && entry.section === '34.18'
  && same(entry.presets, Object.keys(CARDS)) && (entry.presets || []).every((c) => entry.preset_titles && entry.preset_titles[c] && entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same((entry.lean || []).map((x) => x.gid).sort(), [...GIDS].sort()), JSON.stringify({ status: entry.status, chapter: entry.chapter, section: entry.section, lean: (entry.lean || []).length }));

/* ---------- runtime contract and layout ---------- */
await T.goto(BOOK, ID, '?lang=en');
await settle(page);
check('runtime: shared scripts and styles only', same(await page.$$eval('script', (els) => els.map((e) => e.getAttribute('src'))), ['../assets/shell.js', '../assets/kit.js', 'main.js'])
  && same(await page.$$eval('link[rel="stylesheet"]', (els) => els.map((e) => e.getAttribute('href')).filter((h) => !h.startsWith('https:'))), ['../assets/theme.css', 'style.css']));
async function checkLinks(p, tag) {
  check(`${tag}: green evidence links are exactly the thirteen GIDs, no FROZEN box is left`,
    same(await p.$$eval('#evidence .lean:not(.frozen) [data-lean-gid]', (els) => els.map((e) => e.dataset.leanGid).sort()), [...GIDS].sort())
    && same(await p.$$eval('#evidence .lean.frozen [data-lean-gid]', (els) => els.map((e) => e.dataset.leanGid)), FROZEN)
    && await p.$$eval('#evidence .lean.frozen', (els) => els.length) === 0
    && await p.$$eval('#evidence .lean:not(.frozen) [data-lean-gid]', (els) => els.every((e) => e.closest('.lean').querySelector('.ok').textContent.trim() === 'LEAN ✓')));
  check(`${tag}: bilingual theory links`, same(await p.$$eval('#drawer a[href^="../../"]', (els) => els.map((e) => e.getAttribute('href')).sort()), [...THEORY].sort()));
}
await checkLinks(page, 'runtime');
check('layout: the three-column lab: deck | center (#stageWrap > canvas#stage, tour, strip) | side (#readouts, #evidence)', await page.evaluate(() => {
  const app = document.querySelector('#app.app.lab'), deck = app.querySelector(':scope > aside.col.deck'), center = app.querySelector(':scope > main.center'), side = app.querySelector(':scope > aside.col.side');
  if (!deck || !center || !side) return false;
  const d = deck.getBoundingClientRect(), c = center.getBoundingClientRect(), s = side.getBoundingClientRect();
  return getComputedStyle(app).display === 'grid' && getComputedStyle(app).gridTemplateColumns.trim().split(/\s+/).length === 3 && d.right <= c.left + 1 && c.right <= s.left + 1
    && !!center.querySelector(':scope > #stageWrap.stage > canvas#stage') && !!center.querySelector(':scope > .tour') && !!center.querySelector(':scope > .strip #plot')
    && !!center.querySelector(':scope > .strip #schurPlot') && !!side.querySelector(':scope > #readouts #gramMap') && !!side.querySelector(':scope > #evidence #infoBtn')
    && !!app.querySelector(':scope > footer.rail #now') && !!document.querySelector('#drawer #drawerClose') && !!document.querySelector('#stageWrap > .hud-tl')
    && !!document.querySelector('#stageWrap > .hud-tr.chips') && !!document.querySelector('#stageWrap > .hud-bl');
}));
check('layout: the brand is GRAM//CONSENSUS', (await page.locator('.brand .logo').getAttribute('data-text')) === 'GRAM//CONSENSUS');

/* ---------- the claims of the page, against the geometry of this suite ---------- */
let worst = 0, worstBench = 0;
for (let M = 0; M <= 10; M++) {
  const s = await setState({ t: M, alpha: 60, dual: false, gram: 'caps' });
  worst = Math.max(worst, Math.abs(s.area - AREA[M]));
  if (BENCH[M]) worstBench = Math.max(worstBench, Math.abs(s.area - BENCH[M]));
  check(`window M = ${M}: integer state`, s.M === M && s.integer && !s.dual);
}
check('corridor areas M = 0 … 10 at α = 60° match the radial integral of this suite', worst < 2e-6, `max |Δ| = ${worst}`);
check('corridor areas M = 1 … 9 match the six-decimal benchmark', worstBench < 6e-7, `max |Δ| = ${worstBench}`);
check('M = 10 shuts the corridor: 0 sr, and M = 0 is the whole sphere 4π', AREA[10] === 0 && near((await setState({ t: 10 })).area, 0, 1e-12) && (await state()).regions.shown.empty
  && near((await setState({ t: 0 })).area, FOUR_PI, 1e-12));
{
  const s = await setState({ t: 3 });
  const f = fibArea(capsOf(3, 60), 200000);
  check('Ω₃ against a 200 000-point Fibonacci count', Math.abs(s.area - f) < 3e-3, `${s.area} vs ${f}`);
  check('Ω₃ is a curved triangle: 3 vertices, 3 arcs, 14.3420% of the sphere', s.regions.shown.vertices === 3 && s.regions.shown.arcs === 3 && near(100 * s.fraction, 14.342028, 5e-6));
}
let qWorst = 0;
for (let M = 1; M <= 9; M++) {
  const s = await setState({ t: M }), q = Math.log(AREA[M - 1] / AREA[M]);
  qWorst = Math.max(qWorst, Math.abs(s.qNats - q), Math.abs(s.qBits - q / Math.log(2)));
}
check('reopening q_M = ln(|Ω_{M−1}|/|Ω_M|) in nats and bits for M = 1 … 9', qWorst < 3e-6, `max |Δ| = ${qWorst}`);
{
  const s = await setState({ t: 9 });
  check('q₉ = 1.338960 nats = 1.931710 bits and the telescoping sum ln(4π/|Ω₉|)', near(s.qNats, 1.338960, 6e-7) && near(s.qBits, 1.931710, 6e-7)
    && near(Math.log(FOUR_PI / s.area), Object.keys(BENCH).reduce((acc, m) => acc + Math.log(AREA[m - 1] / AREA[m]), 0), 2e-5));
  const t10 = await setState({ t: 10 });
  check('q₁₀ is infinite once the corridor is empty', t10.qInfinite && t10.qNats === null);
}
// two observers
let dWorst = 0;
for (const M of [1, 2, 3, 4, 5, 6, 7, 8, 9]) { const s = await setState({ t: M, dual: true, eta: 10 }); dWorst = Math.max(dWorst, Math.abs(s.consensus - DUAL[M]), Math.abs(s.area - DUAL[M])); }
check('consensus |Ω_A ∩ Ω_B| at η = 10° for M = 1 … 9 matches the radial integral', dWorst < 3e-6, `max |Δ| = ${dWorst}`);
{
  let s = await setState({ t: 3, dual: true, eta: 10 });
  check('η = 10°, M = 3: consensus 1.570105 sr, 87.1181% of the corridor of A', near(s.consensus, 1.570105, 6e-7) && near(s.consensusRatio, 0.871181, 6e-7));
  s = await setState({ t: 9 });
  check('η = 10°, M = 9: consensus 0.010419 sr, 19.0813%', near(s.consensus, 0.010419, 6e-7) && near(s.consensusRatio, 0.190813, 6e-7));
  s = await setState({ t: 9, eta: 35 });
  check('η = 35°, M = 9: no consensus at all', s.consensus === 0 && s.regions.shown.empty && areaOf(capsOf(9, 60, 35)) === 0);
  s = await setState({ t: 3, eta: 35 });
  check('η = 35°: back at M = 3 the consensus is there again', near(s.consensus, areaOf(capsOf(3, 60, 35)), 3e-6) && s.consensus > 0.9);
  s = await setState({ t: 3, eta: 0 });
  check('η = 0: B coincides with A, consensus = corridor of A', near(s.consensus, AREA[3], 2e-6));
}
// block Gram spectrum: nonzero eigenvalues are those of WᵀW, rank 3, λ_min = 0 exactly
for (const [M, dual, eta] of [[3, true, 10], [9, true, 10], [2, false, 10], [5, false, 10], [1, true, 30]]) {
  const s = await setState({ t: M, dual, eta, gram: 'caps' });
  const rows = []; for (let j = 1; j <= M; j++) rows.push(record(j)); if (dual) for (let j = 1; j <= M; j++) rows.push(tilt(eta * DEG, record(j)));
  const WtW = [0, 1, 2].map((i) => [0, 1, 2].map((k) => rows.reduce((acc, r) => acc + r[i] * r[k], 0))), ev = eig3(WtW), pos = ev.filter((l) => l > 1e-9), rank = pos.length;
  check(`block Gram (M = ${M}, ${dual ? 'A and B' : 'A'}): size, rank, nullity, λ⁺_min and λ_min`, s.block.n === rows.length && s.block.rank === rank && s.block.nullity === rows.length - rank
    && near(s.block.lambdaPlus, Math.min(...pos), 1e-9) && (rows.length > rank ? s.block.lambdaMin === 0 : near(s.block.lambdaMin, Math.min(...pos), 1e-9))
    && Math.abs(s.block.rawMin) < (rows.length > rank ? 1e-12 : 1e9), JSON.stringify(s.block));
}
{
  const s3 = await setState({ t: 3, dual: true, eta: 10 }), s9 = await setState({ t: 9 });
  check('block Gram benchmark: K₃ λ⁺ = 0.167199 (nullity 3), K₉ λ⁺ = 2.744723 (nullity 15)', near(s3.block.lambdaPlus, 0.167199, 6e-7) && s3.block.nullity === 3 && near(s9.block.lambdaPlus, 2.744723, 6e-7) && s9.block.nullity === 15);
}
// the Schur margin of three families
let eqW = 0, orW = 0;
for (let M = 1; M <= 10; M++) {
  const e = await setState({ t: M, dual: false, gram: 'equi' }), o = await setState({ gram: 'ortho' });
  eqW = Math.max(eqW, Math.abs(e.schur.delta - equiDelta(M)), Math.abs(e.schur.Q - 3 * M / (4 * (M + 2))), Math.abs(e.schur.detG - equiDet(M)), Math.abs(e.schur.detH - equiDet(M) * equiDelta(M)));
  orW = Math.max(orW, Math.abs(o.schur.delta - (1 - M / 4)), Math.abs(o.schur.Q - M / 4), Math.abs(o.schur.detG - 1));
  check(`orthonormal M = ${M}: the bordered Gram is ≥ 0 exactly when Δ ≥ 0`, (o.schur.lambdaMinH >= -1e-9) === (1 - M / 4 >= -1e-12));
}
check('equicorrelated r = 1/3: Q = 3M/(4(M+2)), Δ = (M+8)/(4(M+2)), det G = (2/3)^{M−1}(M+2)/3, det G_{M+1} = det G · Δ', eqW < 1e-12, `${eqW}`);
check('orthonormal: Q = M/4, Δ = 1 − M/4 (0 at M = 4, −1/4 at M = 5)', orW < 1e-12 && near((await setState({ t: 4, gram: 'ortho' })).schur.delta, 0, 1e-12) && near((await setState({ t: 5 })).schur.delta, -0.25, 1e-12));
{
  const s = await setState({ t: 9, gram: 'equi' });
  check('equicorrelated never over-constrains: Δ > 1/4 for every M', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].every((M) => equiDelta(M) > 0.25) && s.schur.delta > 0.25);
}
// the drawn caps: Δ = ‖P_{S⊥}x‖² from Gram–Schmidt; M = 2: sin²δ; M ≥ 3: 0
for (const x of [[0.3, -0.2, 0.93], [0.05, 0.4, 0.9], [-0.6, 0.1, 0.79]]) for (const M of [1, 2, 3, 6]) {
  const s = await setState({ t: M, dual: false, gram: 'caps', x }), ref = schurCaps(M, nrm(x));
  check(`drawn caps M = ${M}, x = ${x}: Δ = ‖P⊥x‖² (Gram–Schmidt) and det G_{M+1} = det G_M · Δ`, near(s.schur.delta, ref.delta, 1e-10) && s.schur.rank === ref.rank
    && near(s.schur.detH, s.schur.detG * s.schur.delta, 1e-10) && (M < 3 || near(s.schur.delta, 0, 1e-10)));
}
{
  const v1 = record(1), v2 = record(2), m = nrm(v1.map((a, k) => a + v2[k])), n = nrm(crs(v1, v2));
  const x = nrm(m.map((a, k) => Math.cos(25 * DEG) * a + Math.sin(25 * DEG) * n[k]));
  const s = await pick('schur-cap-corridor');
  check('SCHUR · LENS: M = 2, x is 25° off the anchor plane, Δ = sin²25° = 0.178606', s.preset === 'schur-cap-corridor' && s.M === 2 && s.schurShown
    && 1 - dot(s.x, x) < 1e-12 && near(s.schur.delta, Math.sin(25 * DEG) ** 2, 1e-12) && near(s.schur.delta, dot(s.x, n) ** 2, 1e-12));
  check('SCHUR · LENS: det G₂ = 1 − (v₁·v₂)² = 0.220489 and det G₃ = det G₂ · Δ = 0.039381', near(s.schur.detG, 1 - dot(v1, v2) ** 2, 1e-12) && near(s.schur.detG, 0.220489, 6e-7)
    && near(s.schur.detH, 0.039381, 6e-7));
  const onPlane = nrm(m);
  const z = await setState({ x: onPlane, t: 2 });
  check('x on the dashed great circle span(v₁, v₂): Δ = 0 and det G(v₁, v₂, x) = 0', near(z.schur.delta, 0, 1e-12) && near(z.leanInstances.threeAnchor.detX, 0, 1e-12));
}
// the instances of the cited theorems
{
  const s = await setState({ t: 2, dual: true, eta: 10, gram: 'caps', x: [0.2, 0.1, 0.97] }), I = s.leanInstances;
  check('LEAN instance, unit Gram: unit records, distinct records < 1, ⟨v_j, w_j⟩ < 1 at η = 10°', I.unitGram.unitResidual < 1e-12 && I.unitGram.offDiagonalMax < 1 && I.unitGram.crossDiagonalMax < 1 && !I.unitGram.crossAllOne && !I.unitGram.sameAnchors);
  const z = (await setState({ eta: 0 })).leanInstances;
  check('LEAN instance, unit Gram: at η = 0 every ⟨v_j, w_j⟩ = 1 and w_j = v_j', z.unitGram.crossAllOne && z.unitGram.sameAnchors);
  const v1 = record(1), v2 = record(2), v3 = record(3), tri = (a, b, c) => dot(a, crs(b, c)) ** 2;
  check('LEAN instance, two anchors: det G₂ = formula = ‖v₁ × v₂‖² > 0', near(I.twoAnchor.det, 1 - dot(v1, v2) ** 2, 1e-12) && I.twoAnchor.residual < 1e-12 && I.twoAnchor.positive && I.twoAnchor.independent);
  check('LEAN instance, three anchors: det G₃(v₁, v₂, v₃) = 0.041133 = (v₁·(v₂ × v₃))² > 0, and the formula for (v₁, v₂, x)', near(I.threeAnchor.det3, tri(v1, v2, v3), 1e-12) && near(I.threeAnchor.det3, 0.041133, 6e-7)
    && I.threeAnchor.det3Positive && I.threeAnchor.residual < 1e-12 && near(I.threeAnchor.detX, tri(v1, v2, nrm([0.2, 0.1, 0.97])), 1e-12));
  check('LEAN instance, unitary extension: G_B = G_A and W_B = R_y(η) W_A with R_y orthogonal', I.unitary.gramResidual < 1e-12 && I.unitary.rotationResidual < 1e-12 && I.unitary.orthogonalResidual < 1e-12);
  check('LEAN instance, projections: six identities and Δ = ‖P_{S⊥}x‖²', ['idempotentS', 'idempotentPerp', 'crossSP', 'crossPS', 'sumResidual', 'deltaResidual'].every((k) => I.projection[k] < 1e-10));
  check('LEAN instance, escape (M = 2): a unit e ⊥ S with P_S e = 0, distance 1, ‖I − P_S‖ = 1', I.escape.exists && near(I.escape.norm, 1, 1e-12) && I.escape.projection < 1e-10 && near(I.escape.distance, 1, 1e-10)
    && near(I.escape.operatorNorm, 1, 1e-10) && Math.abs(Math.abs(dot(I.escape.e, nrm(crs(v1, v2)))) - 1) < 1e-9);
  check('LEAN instance, escape (M = 3): no escape direction left in ℝ³', !(await setState({ t: 3 })).leanInstances.escape.exists);
  check('LEAN instance, history capacity: the standard basis pairs perfectly, N = d = 3', I.capacity.basisPairing < 1e-15 && I.capacity.d === 3 && I.capacity.records === 3);
  const sv = (await setState({ t: 4, alpha: 60 })).leanInstances.surviving;
  check('LEAN instance, surviving copy: undoing the phases leaves ρ₀₁ cos α ≠ ρ₀₁', sv.copies === 4 && near(sv.oldestOverlap, 0.5, 1e-12) && sv.residual < 1e-12 && near(sv.gap, 0.25, 1e-12));
  check('LEAN instance, common factor: 13 contexts share one Gram window', I.common.contexts === 13 && I.common.spread < 1e-12);
  const lb = (await setState({ t: 9, dual: false, alpha: 60, eta: 10 })).leanInstances.landauer, q9 = Math.log(AREA[8] / AREA[9]);
  check('LEAN instance, Landauer balance (M = 9): −ΔS = q₉, I, D ≥ 0, −ΔS ≤ β·Q with slack I + D', lb.I >= 0 && lb.D >= 0 && lb.negDeltaS <= lb.betaQ && lb.residual < 1e-14
    && lb.fromQ && near(lb.negDeltaS, q9, 3e-6) && near(lb.betaQ - lb.negDeltaS, lb.I + lb.D, 1e-14) && near(lb.reversibleBetaQ, lb.negDeltaS, 0) && lb.I + lb.D > 0, JSON.stringify(lb));
  for (const t of [0, 10]) {
    const l0 = (await setState({ t })).leanInstances.landauer;
    check(`LEAN instance, Landauer balance (M = ${t}): q undefined or infinite, −ΔS falls back to ln 2`, !l0.fromQ && near(l0.negDeltaS, Math.log(2), 1e-15)
      && l0.I >= 0 && l0.D >= 0 && l0.negDeltaS <= l0.betaQ && l0.residual < 1e-14, JSON.stringify(l0));
  }
  await setState({ t: 2, dual: true, eta: 10, gram: 'caps', x: [0.2, 0.1, 0.97] });
  for (const M of [3, 5, 6]) {
    const R = (await setState({ t: M })).leanInstances.realize, eq = R.find((r) => r.kind === 'equi'), or = R.find((r) => r.kind === 'ortho');
    check(`LEAN instance, Gram realizability (M = ${M}): equicorrelated H ≥ 0 factors as OᵀO; orthonormal H ≥ 0 iff M ≤ 4`, eq.psd && eq.residual < 1e-10 && or.psd === (M <= 4) && (M <= 4 || or.lambdaMin < 0));
  }
}
await setState({ t: 3, alpha: 60, eta: 10, dual: false, gram: 'caps' });

/* ---------- every control, as a reader uses it ---------- */
for (const M of [1, 4, 9, 10]) {
  const s = await input('#windowSize', M);
  check(`window slider ${M}: depth, card left`, s.t === M && s.M === M && s.preset === null && near(s.area, AREA[M], 2e-6));
}
for (const a of [35, 48, 75]) {
  const s = await input('#coherenceAngle', a), ref = areaOf(capsOf(s.M, a));
  check(`α slider ${a}°: state and area at M = ${s.M}`, s.alphaDeg === a && near(s.area, ref, 3e-6), `${s.area} vs ${ref}`);
}
{
  const s = await input('#coherenceAngle', 35);
  const six = await input('#windowSize', 6);
  check('a tighter α_coh = 35° shuts the corridor already at M = 6', six.area === 0 && areaOf(capsOf(6, 35)) === 0 && s.alphaDeg === 35);
  await input('#coherenceAngle', 60); await input('#windowSize', 3);
}
{
  await setState({ dual: false, t: 3 });
  const s = await input('#tiltAngle', 20);
  check('η slider: turning B switches the consensus on, area matches', s.dual && s.etaDeg === 20 && near(s.consensus, areaOf(capsOf(3, 60, 20)), 3e-6)
    && await page.locator('#observerChips [data-observer="dual"]').getAttribute('aria-pressed') === 'true' && await page.locator('#observerPanel [data-observer="dual"]').getAttribute('aria-pressed') === 'true');
  await page.click('#observerChips [data-observer="single"]'); await settle(page);
  check('stage chip A: back to one observer, panel chips follow', !(await state()).dual && await page.locator('#observerPanel [data-observer="single"]').getAttribute('aria-pressed') === 'true');
  await page.click('#observerPanel [data-observer="dual"]'); await settle(page);
  check('panel chip A and B: two observers, stage chips follow', (await state()).dual && await page.locator('#observerChips [data-observer="dual"]').getAttribute('aria-pressed') === 'true');
  await input('#tiltAngle', 10); await page.click('#observerChips [data-observer="single"]'); await settle(page);
}
for (const g of ['equi', 'ortho', 'caps']) {
  await page.click(`#gramChips [data-gram="${g}"]`); await settle(page);
  const s = await state();
  check(`Gram family chip ${g}: the side panel follows`, s.gram === g && s.schur.kind === g && (await page.locator('#gramTitle').textContent()).length > 0);
}
{
  await setState({ t: 9, dual: false, gram: 'caps' });
  await page.click('#forgetBtn'); await settle(page);
  const s = await state();
  check('forget the oldest record v₉: M 9 → 8, 0.054604 → 0.208320 sr, q₉ = 1.338960 nats', s.t === 8 && near(s.area, AREA[8], 2e-6) && same(s.trace.released, [9]) && s.trace.forget
    && near(s.trace.beforeArea, AREA[9], 2e-6) && near(s.trace.q, Math.log(AREA[8] / AREA[9]), 3e-6) && near(s.trace.q, 1.338960, 6e-7));
  check('forget: the readout reports the step just taken', /1\.338960/.test(await page.locator('#roQ').textContent()));
  await page.click('#forgetBtn'); await settle(page);
  const s2 = await state();
  check('forget again: M 8 → 7 by q₈', s2.t === 7 && near(s2.trace.q, Math.log(AREA[7] / AREA[8]), 3e-6));
  await page.locator('#now').evaluate((el) => { el.value = '5.5'; el.dispatchEvent(new Event('input', { bubbles: true })); }); await settle(page);
  check('moving the rail drops the trace of the forgetting', (await state()).trace === null && near((await state()).t, 5.5, 1e-12));
  await setState({ t: 1 }); await page.click('#forgetBtn'); await settle(page);
  check('forget at M = 1 empties the window: the whole sphere', (await state()).t === 0 && (await page.locator('#forgetBtn').isDisabled()));
}
{
  await setState({ t: 3, dual: false, gram: 'caps' });
  await page.locator('#gramMap').scrollIntoViewIfNeeded(); await settle(page);
  const c = await page.evaluate(() => window.GRAM_WINDOW_DEBUG.gramCell(0, 1));
  await page.mouse.click(c.x, c.y); await settle(page);
  const s = await state();
  check('heatmap: a click selects the cell v₁ · v₂ and the caption reads its inner product', same(s.selected, [0, 1]) && (await page.locator('#gramCaption').textContent()).includes(dot(record(1), record(2)).toFixed(6)));
  await page.mouse.click(c.x, c.y); await settle(page);
  check('heatmap: a second click clears the selection', (await state()).selected === null);
}
{
  await setState({ t: 3, dual: false, x: [0.05, -0.08, 1] });
  await page.locator('#stageWrap').scrollIntoViewIfNeeded(); await settle(page);
  const before = await state(), h = await page.evaluate(() => window.GRAM_WINDOW_DEBUG.handleBox());
  check('candidate handle is shown on the stage', !!h && await page.locator('#candidateHandle').isVisible());
  if (h) {
    const cam = before.camera, axis = [Math.sin(cam.yaw) * Math.sin(cam.pitch), Math.cos(cam.yaw) * Math.sin(cam.pitch), Math.cos(cam.pitch)];
    const a = 14 * DEG, x0 = before.x, c = Math.cos(a), sn = Math.sin(a), d = dot(axis, x0), cr = crs(axis, x0);
    const goal = nrm(x0.map((v, k) => v * c + cr[k] * sn + axis[k] * d * (1 - c)));
    await page.mouse.move(h.x, h.y); await page.mouse.down();
    check('candidate handle: pointerdown enters the drag', await page.locator('#candidateHandle').evaluate((el) => el.classList.contains('dragging')));
    const tgt = await page.evaluate((p) => window.GRAM_WINDOW_DEBUG.spherePoint(p), goal);
    await page.mouse.move(tgt.x, tgt.y, { steps: 6 }); await page.mouse.up(); await settle(page);
    const after = await state();
    check('candidate handle: x follows the pointer over the sphere, the camera stays', tgt.front && Math.acos(Math.min(1, dot(after.x, goal))) < 2.5 * DEG && same(after.camera, before.camera), `${Math.acos(Math.min(1, dot(after.x, goal))) / DEG}°`);
    check('candidate margin: min_j x·v_j − cos α from this suite', near(after.marginX, slack(capsOf(3, 60), after.x), 1e-12) && after.insideX === (after.marginX >= 0));
  }
}
await page.click('#infoBtn'); await settle(page);
check('the info button opens the theory drawer', await page.locator('#drawer [role="dialog"]').isVisible());
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').isHidden());
await setState({ t: 2 });
check('▶ plays the rail', await playsAfter(page, () => page.click('#play'), () => window.GRAM_WINDOW_DEBUG.state));
if ((await state()).playing) await page.click('#play');
await settle(page);
const held = await state(); await settle(page, 60);
check('❚❚ holds the rail', !held.playing && (await state()).t === held.t);
await page.click('#rew'); await settle(page);
check('⏮ returns to the empty window: 4π', (await state()).t === 0 && near((await state()).area, FOUR_PI, 1e-12));
await page.locator('body').click({ position: { x: 4, y: 4 } });
await setState({ t: 4 }); await page.keyboard.press('ArrowRight'); await settle(page);
check('→ steps one record deeper', (await state()).t === 5);

/* ---------- the cards, picked as a reader picks them ---------- */
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  for (const [card, c] of Object.entries(CARDS)) {
    if (c.plays) {
      check(`${lang}/${card}: the card plays the rail`, await playsAfter(page, () => page.click(`[data-preset="${card}"]`), () => window.GRAM_WINDOW_DEBUG.state));
      if ((await state()).playing) await page.click('#play');
      await settle(page);
    } else await pick(card);
    const s = await state();
    check(`${lang}/${card}: applies its state`, s.preset === card && s.dual === c.dual && s.gram === c.gram && s.alphaDeg === 60 && s.etaDeg === 10
      && (c.plays || s.t === c.M) && await page.locator(`[data-preset="${card}"]`).getAttribute('aria-pressed') === 'true'
      && Number(await page.locator(`[data-preset="${card}"]`).getAttribute('data-still')) === c.still, JSON.stringify({ t: s.t, preset: s.preset }));
    if (c.released) check(`${lang}/${card}: the trace of the forgetting`, s.trace && same(s.trace.released, c.released) && s.trace.t === c.M);
    if (lang === 'en') check(`${lang}/${card}: no Chinese left on the page`, (await cjkLeftovers(page)).length === 0);
  }
}
{
  const f = await pick('forgetting-reopen');
  check('FORGET · 9 → 8: 0.054604 → 0.208320 sr, q₉ = 1.338960 nats = 1.931710 bits', near(f.trace.beforeArea, 0.054604, 6e-7) && near(f.area, 0.208320, 6e-7) && near(f.trace.q, 1.338960, 6e-7)
    && near(f.trace.q / Math.log(2), 1.931710, 6e-7));
  const d = await pick('dual-window-consensus');
  check('A ∩ B: from 0.010419 sr at M = 9 back to 1.570105 sr at M = 3 by forgetting six records each', near(d.trace.beforeArea, 0.010419, 6e-7) && near(d.consensus, 1.570105, 6e-7) && d.dual);
  const g = await pick('golden-triangle-m3');
  check('GOLDEN · M = 3: x starts inside Ω₃', g.preset === 'golden-triangle-m3' && slack(capsOf(3, 60), g.x) > 0);
  const o = await setState({ t: 10, gram: 'ortho' });
  check('LOCK · M = 9 → 10: the corridor shuts, the orthonormal Δ = −3/2', o.area === 0 && near(o.schur.delta, -1.5, 1e-12));
}

/* ---------- ?theme= query, dark/light systems × zh/en × desktop/phone/embed ---------- */
for (const theme of ['dark', 'light']) {
  const p = await T.open(BOOK, ID, `?lang=en&theme=${theme}`, { viewport: { width: 1280, height: 860 } });
  await settle(p);
  check(`?theme=${theme}: the page runs on the shared night console without a palette override`, await p.evaluate(() => document.documentElement.dataset.trPalette === undefined && !!window.GRAM_WINDOW_DEBUG.state.preset));
  await p.context().close();
}
for (const scheme of ['dark', 'light']) for (const lang of ['zh', 'en']) for (const [width, height, embed] of [[1440, 900, false], [390, 844, false], [740, 620, true]]) {
  requestedColorScheme = scheme;
  const p = await T.open(BOOK, ID, `?lang=${lang}${embed ? '&embed=1' : ''}`, { viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US', reducedMotion: 'reduce' });
  await p.emulateMedia({ colorScheme: scheme }); await settle(p);
  const tag = `${scheme}/${lang}/${width}x${height}/${embed ? 'embed' : width < 500 ? 'phone' : 'desktop'}`;
  check(`${tag}: requested system colour, no palette override`, await p.evaluate((s) => matchMedia(`(prefers-color-scheme: ${s})`).matches && document.documentElement.dataset.trPalette === undefined, scheme));
  await checkLinks(p, tag);
  if (width >= 1081) check(`${tag}: deck | center | side`, await p.evaluate(() => {
    const app = document.querySelector('.app.lab'), q = (sel) => app.querySelector(sel).getBoundingClientRect();
    const d = q(':scope > .deck'), c = q(':scope > .center'), s = q(':scope > .side');
    return d.right <= c.left + 1 && c.right <= s.left + 1 && ['#readouts', '#evidence'].every((x) => app.querySelector(`.side ${x}`).getBoundingClientRect().height > 0);
  }));
  for (const card of Object.keys(CARDS)) {
    await pick(card, p);
    const s = await state(p), view = await stageView(p, '#stageWrap', false), overlaps = await labelOverlaps(p, '.stage .tag', 0);
    check(`${tag}/${card}: card applied`, s.preset === card && !s.playing);
    check(`${tag}/${card}: stage layout, HUD, labels and overflow`, view.layout.length === 0 && view.hud.length === 0 && overlaps.length === 0 && await overflowX(p) <= 0, [...view.layout, ...view.hud, ...overlaps].join(' | '));
    if (lang === 'en') check(`${tag}/${card}: no Chinese leftovers`, (await cjkLeftovers(p)).length === 0);
  }
  await p.context().close();
}

/* ---------- the stills a chapter prints ---------- */
if (!PHASE1) for (const lang of ['zh', 'en']) for (const [card, c] of Object.entries(CARDS)) {
  const p = await openStill(T, BOOK, ID, card, lang), s = await state(p);
  check(`still ${lang}/${card}: declared frame, paused`, s.preset === card && !s.playing && s.t === c.still && await p.evaluate(() => TRV.still && TRV.shot));
  if (card === 'golden-triangle-m3') check(`still ${lang}/${card}: Ω₃ = 1.802272 sr`, near(s.area, 1.802272, 6e-7));
  if (card === 'overconstrained-lock-m9') check(`still ${lang}/${card}: Ω₉ = 0.054604 sr and the orthonormal Δ₉ = −5/4`, near(s.area, 0.054604, 6e-7) && near(s.schur.delta, -1.25, 1e-12));
  if (card === 'forgetting-reopen') check(`still ${lang}/${card}: 0.208320 sr with the trace of Ω₉`, near(s.area, 0.208320, 6e-7) && s.trace && near(s.trace.beforeArea, 0.054604, 6e-7));
  if (card === 'dual-window-consensus') check(`still ${lang}/${card}: consensus 1.570105 sr with the trace of 0.010419 sr`, near(s.area, 1.570105, 6e-7) && s.trace && near(s.trace.beforeArea, 0.010419, 6e-7));
  if (card === 'schur-cap-corridor') check(`still ${lang}/${card}: Δ = 0.178606`, near(s.schur.delta, 0.178606, 6e-7));
  await p.context().close();
}

check('palette: every observed document stayed without an override', paletteDocuments.length > 0 && paletteDocuments.every((r) => r.absent), JSON.stringify(paletteDocuments.filter((r) => !r.absent)));
check('palette: dark and light startup documents were observed', paletteDocuments.some((r) => r.dark) && paletteDocuments.some((r) => !r.dark));
check('palette: zero attempted writes', paletteMutations.length === 0, JSON.stringify(paletteMutations));
check('zero page, console and request errors', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
check('zero browser console warnings after driver filtering', browserWarnings.length === 0, browserWarnings.slice(0, 4).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, T.warnings.map((w) => `${w.name}: ${w.detail}`).join(' | '));
await T.finish();
