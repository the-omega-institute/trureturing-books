// AFGUT//UNIFY browser regression: the shared stage-first gate, then every control, card, lens, scene, still and frame,
// and every number the page claims, checked against algorithms written here (bisection for the running crossings, the
// Weinberg angle through g and g′, the N_c traces summed over an explicit list of Weyl fermions, the chiral hopping
// through the eigenvectors of σ_x, fundamental-cycle holonomies, brute-force tetrahedral defect counts).
// Run directly with node; VIZ_SLOW_FRAMES=1000 exercises every transition and playback with sparse animation frames.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, capitalGreek, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'af-gut-arc-field-unification-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const THEORY = 'ch39-s11-af-gut-arc-field-grand-unification.html';
const OPEN_LINKS = [
  `${THEORY}#prob-ch39-af-gut-threshold-and-proton-stability`,
  'ch34-s23-cosmological-arrow-and-horizon-floor.html#prob-ch34-past-hypothesis-and-cosmological-constant',
  'ch34-s24-interaction-sign-and-sagitta-composition.html#prob-ch34-gravity-dynamics-and-coupling',
  'ch34-s25-generations-and-quantitative-boundary.html#prob-ch34-sm-generations-and-couplings'
];
const GIDS = [
  'D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula',
  'D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary',
  'D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification',
  'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift',
  'D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness',
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity'
];
const CARDS = {
  'concentric-four-field-monad': { scene: 'fields', drive: 'phase', still: 0.5 },
  'weinberg-angle-rg-running': { scene: 'weinberg', drive: 'run', still: 'end' },
  'higgs-cross-concept-zitterbewegung': { scene: 'higgs', drive: 'phase', still: 0.75 },
  'einstein-pythagorean-clock-balance': { scene: 'balance', drive: 'phase', still: 0.6 },
  'afgut-ledger-split-vs-unify': { scene: 'fields', drive: 'morph', still: 'end' }
};
const VIEW0 = [0.55, 0.34];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const rel = (a, b, tol = 1e-10) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));
const stillT = (c) => (CARDS[c].still === 'end' ? 1 : CARDS[c].still);

/* ---------- independent physics, written here and never calling the page ---------- */
const MZ = 91.1876, EP = 1.220890e19, AINV = 127.930, S2 = 0.23129, AS = 0.1180;
const LMZ = Math.log10(MZ), LEP = Math.log10(EP);
// the three inverse couplings at M_Z, α₁ in the GUT normalization (α₁ = (5/3)α_Y), and their one-loop slopes per decade
const INV0 = [(3 / 5) * (1 - S2) * AINV, S2 * AINV, 1 / AS];
const SLOPE = [41 / 10, -19 / 6, -7].map((b) => b * Math.log(10) / (2 * Math.PI));
const inv = (lm, i) => INV0[i] - SLOPE[i] * (lm - LMZ);
/** sin²θ_W from the couplings themselves: g² = 4π α₂, g′² = 4π α_Y with α_Y⁻¹ = (5/3)α₁⁻¹, sin² = g′²/(g² + g′²). */
const sin2 = (lm) => { const g2 = 4 * Math.PI / inv(lm, 1), gp2 = 4 * Math.PI / (5 / 3 * inv(lm, 0)); return gp2 / (g2 + gp2); };
/** The scale where two inverse couplings cross, by bisection on [log M_Z, log E_P]. */
function crossing(i, j) {
  let a = LMZ, b = LEP; const f = (x) => inv(x, i) - inv(x, j);
  for (let k = 0; k < 200; k++) { const m = (a + b) / 2; if (Math.sign(f(m)) === Math.sign(f(a))) a = m; else b = m; }
  return (a + b) / 2;
}
/** Tr(T₃²)/Tr(Q²) summed over one generation of Weyl fermions (with ν_R), each colour component counted once. */
function weinbergTrace(Nc, anomalyFree) {
  const YQ = anomalyFree ? 1 / (2 * Nc) : 1 / 6;
  // [multiplicity, T₃, Y] for every Weyl component: Q_L doublet, u_R, d_R, L doublet, e_R, ν_R
  const parts = [
    [Nc, 0.5, YQ], [Nc, -0.5, YQ], [Nc, 0, YQ + 0.5], [Nc, 0, YQ - 0.5],
    [1, 0.5, -0.5], [1, -0.5, -0.5], [1, 0, -1], [1, 0, 0]
  ];
  let t3 = 0, q2 = 0;
  for (const [n, T, Y] of parts) { t3 += n * T * T; q2 += n * (T + Y) ** 2; }
  return { t3, q2, ratio: t3 / q2 };
}
/** The chiral hopping through the eigenvectors (1, ±1)/√2 of σ_x: ψ(θ) = ½[(1, 1)e^{−iθ} + (1, −1)e^{iθ}]. */
function hop(theta) {
  const L = [(Math.cos(-theta) + Math.cos(theta)) / 2, (Math.sin(-theta) + Math.sin(theta)) / 2];
  const R = [(Math.cos(-theta) - Math.cos(theta)) / 2, (Math.sin(-theta) - Math.sin(theta)) / 2];
  return { PL: L[0] ** 2 + L[1] ** 2, PR: R[0] ** 2 + R[1] ** 2 };
}
/** The schematic clock vector of the balance, from its definition (MODEL). */
function clockVector(t) {
  const T = 2 * Math.PI * t, A = 0.66 + 0.24 * Math.sin(T);
  const w = [1 + 0.45 * Math.cos(T), 0.9 + 0.45 * Math.cos(T - Math.PI / 2), 0.85 + 0.45 * Math.cos(T - Math.PI), 0.8 + 0.45 * Math.cos(T - 1.5 * Math.PI)];
  const n = Math.sqrt(w.reduce((s, x) => s + x * x, 0));
  return [Math.cos(A), ...w.map((x) => Math.sin(A) * x / n)];
}
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const angleGap = (a, b) => Math.abs(wrap(a - b));
/** Holonomy of each fundamental cycle of K₄ for the star tree at vertex 0: root → s, edge s → t, t → root. */
function cycleHolonomies(u, edges) {
  const treeEdge = (a) => edges.findIndex(([s, t], e) => e < 3 && s === 0 && t === a);
  return edges.slice(3).map(([s, t], k) => wrap(u[treeEdge(s)] + u[3 + k] - u[treeEdge(t)]));
}
/** Tetrahedral counts by brute force, with the face indicator's sign from the product of differences. */
function tetraCounts(A, q) {
  const V = [0, 1, 2, 3];
  const omega = (i, j, k) => (i < 3 && j < 3 && k < 3 && i !== j && j !== k && i !== k ? Math.sign((j - i) * (k - i) * (k - j)) : 0);
  const F = (i, j, k) => A[j][k] - A[i][k] + A[i][j] + q * omega(i, j, k);
  const d = (r, i, j, k) => F(i, j, k) - F(r, j, k) + F(r, i, k) - F(r, i, j);
  let tetra = 0; const face = [0, 0, 0, 0]; let edge = 0;
  for (const r of V) for (const i of V) for (const j of V) for (const k of V) if (d(r, i, j, k) !== 0) { tetra++; face[r]++; }
  for (const i of V) for (const j of V) for (const k of V) if (F(i, j, k) !== A[j][k] - A[i][k] + A[i][j]) edge++;
  return { tetra, face, edge };
}

const T = await session();
const { page, check } = T;

// independent derivations that do not need the page
{
  const c12 = crossing(0, 1), s12 = sin2(c12);
  check('physics: α₁⁻¹ = α₂⁻¹ at log₁₀(μ₁₂/GeV) = 13.0060 with 42.408, where sin²θ_W = 0.3750', c12.toFixed(4) === '13.0060' && inv(c12, 0).toFixed(3) === '42.408' && near(s12, 0.375, 1e-12), `${c12} ${inv(c12, 0)} ${s12}`);
  check('physics: the three crossings sit at 10^13.01, 10^14.38 and 10^16.99 GeV', crossing(0, 1).toFixed(2) === '13.01' && crossing(0, 2).toFixed(2) === '14.38' && crossing(1, 2).toFixed(2) === '16.99');
  check('physics: sin²θ_W(M_Z) = 0.23129 and α_G(E_P) = 1', near(sin2(LMZ), 0.23129, 1e-12) && near((10 ** LEP / EP) ** 2, 1, 1e-12));
  const fixed3 = weinbergTrace(3, false), anom3 = weinbergTrace(3, true);
  check('physics: N_c = 3 gives Tr(T₃²) = 2 and Tr(Q²) = 16/3 on the Weyl list, the ratio 3/8', near(fixed3.t3, 2, 1e-14) && near(fixed3.q2, 16 / 3, 1e-14) && near(fixed3.ratio, 0.375, 1e-14) && near(anom3.ratio, 0.375, 1e-14));
  let roots = [];
  for (let k = 0; k < 6000; k++) {
    const a = 0.05 + k * 0.001, b = a + 0.001, f = (n) => weinbergTrace(n, true).ratio - weinbergTrace(n, false).ratio;
    if (Math.sign(f(a)) !== Math.sign(f(b)) || f(a) === 0) roots.push(Math.abs(f(a)) < Math.abs(f(b)) ? a : b);
  }
  roots = roots.filter((r, i) => !i || r - roots[i - 1] > 0.01);
  check('physics: on N_c ∈ (0, 6] the anomaly-free and fixed-charge curves cross once, at N_c = 3', roots.length === 1 && Math.abs(roots[0] - 3) < 0.002, JSON.stringify(roots));
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
// The lab is a permanent night console: record every attempt to write data-tr-palette, from before page scripts run.
const paletteMutations = [], paletteDocuments = [];
async function watchPalette(context) {
  await context.exposeBinding('__afgutPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__afgutPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__afgutPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined,
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

// the shared gate: stage share, cards, drawer, honest labels, English, embeds, rail, cited figures, phone, cover, motion,
// and the lit-solid checks of kit.solid
await stageFirstChecks(T, BOOK, ID, { solid: true });

/* ---------- sources and registry ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
const suite = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
// forbidden words are kept as code points so this suite itself carries no such identifier
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
check('source: no grid-template-columns in the page stylesheet (the lab keeps its shared three columns)', !/grid-template-columns\s*:/i.test(sources['style.css']));
check('source: kit.solid without wheel zoom, kit.clock looping', /wheel:\s*false/.test(sources['main.js']) && /loop:\s*true/.test(sources['main.js']));
check('source: the five cards in their public order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1]), Object.keys(CARDS)));
check('source: the page loads only the shared runtime and its own files', same([...sources['index.html'].matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]), ['../assets/shell.js', '../assets/kit.js', 'main.js']));
check('source: no .okmark anywhere (no green tick outside the Lean boxes)', !/okmark/.test(sources['index.html'] + sources['main.js'] + sources['style.css']));
check('source: green and red stay off the stage (no ok or warn colour in the page code)', !/P\.ok\b|P\.warn\b|var\(--ok\)|var\(--warn\)/.test(sources['main.js'] + sources['style.css']));
check('source: amber is not a readout colour', !/dl\.ro[^{]*\{[^}]*--amber/.test(sources['style.css']));
{
  const zh = (sources['index.html'].match(/class="(?:[^"]*\s)?zh(?:\s[^"]*)?"/g) || []).length, en = (sources['index.html'].match(/class="(?:[^"]*\s)?en(?:\s[^"]*)?"/g) || []).length;
  check('source: as many .zh as .en elements', zh === en && zh > 0, `${zh} zh / ${en} en`);
}
check('suite: no fixed waits', !new RegExp('wait' + 'ForTimeout').test(suite));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID);
check('registry: live §39.11 entry with five bilingual cards and the six theorems', !!entry && entry.status === 'live' && entry.chapter === 39 && entry.section === '39.11'
  && entry.code === 'AFGUT//UNIFY' && same(entry.presets, Object.keys(CARDS)) && entry.presets.every((c) => entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same(entry.lean.map((x) => x.gid).sort(), [...GIDS].sort()) && entry.tags.length === entry.tags_en.length
  && entry.theory[0].href === `../zh/${THEORY}` && entry.theory[0].href_en === `../en/${THEORY}`);
const deps = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'tests', 'dependencies.json'), 'utf8')).suites[`${ID}.test.mjs`] || [];
check('dependencies: the suite is registered with the shared solid runtime and the registry', ['@citations', '@registry-entry', 'theme/viz/kit.js', 'theme/viz/solid-core.js', 'theme/viz/vendor/three.module.min.js', '@lean-links'].every((d) => deps.includes(d)));

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.AFGUT_UNIFY_DEBUG.state);
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
  await until(p, (id) => { const s = window.AFGUT_UNIFY_DEBUG.state; return s.preset === id && !s.blending; }, card);
  await pause(p);
}
async function seek(t, p = page) {
  await p.locator('#now').evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, t);
  await settle(p);
}

/** Every number of a state against the algorithms of this file. */
function checkMath(s, tag) {
  const lm = s.logMu, I = s.leanInstances;
  check(`${tag}: α_i⁻¹(μ) from the M_Z inputs`, [0, 1, 2].every((i) => rel(s.alphaInv[i], inv(lm, i), 1e-12)), JSON.stringify(s.alphaInv));
  check(`${tag}: sin²θ_W(μ) agrees with g′²/(g² + g′²)`, rel(s.sin2W, sin2(lm), 1e-12), `${s.sin2W} vs ${sin2(lm)}`);
  check(`${tag}: α_G = (μ/E_P)²`, rel(s.alphaG, (10 ** lm / EP) ** 2, 1e-9) && rel(s.mu, 10 ** lm, 1e-12));
  const want = [(EP / 10 ** lm) ** 2, inv(lm, 1), inv(lm, 2), inv(lm, 0)];
  check(`${tag}: the shells are F_pos ↔ α_G⁻¹, F_rot ↔ α₂⁻¹, F_col ↔ α₃⁻¹, F_scl ↔ α₁⁻¹ with radius 0.24 + 0.76·√(min(α⁻¹, 64)/64)`,
    want.every((x, k) => rel(s.fieldInv[k], x, 1e-9) && near(s.radii[k], 0.24 + 0.76 * Math.sqrt(Math.min(Math.max(x, 0), 64) / 64), 1e-12) && s.offScale[k] === (x > 64)));
  const th = Math.PI * s.phiH * s.tau, h = hop(th);
  check(`${tag}: hopping θ = πΦ̃_Hτ, P_L and P_R from the σ_x eigenvectors, β = 1/√(1 + Φ̃²)`, near(s.higgs.theta, th, 1e-12) && near(s.higgs.PL, h.PL, 1e-12) && near(s.higgs.PR, h.PR, 1e-12)
    && near(s.higgs.beta, 1 / Math.sqrt(1 + s.phiH ** 2), 1e-12) && near(s.higgs.masses[0], 80.38 * s.phiH, 1e-9) && near(s.higgs.masses[1], 91.19 * s.phiH, 1e-9) && near(s.higgs.vev, 246.22 * s.phiH, 1e-9));
  const u = clockVector(s.tau);
  check(`${tag}: the clock vector is the unit vector of the model and its squares sum to 1`, u.every((x, k) => near(s.clock[k], x, 1e-12)) && near(s.balance.total, 1, 1e-12)
    && near(s.balance.rate2, u[0] ** 2, 1e-12) && near(s.balance.load, 1 - u[0] ** 2, 1e-12) && s.balance.delta < 1e-12);
  // 1. covariant commutator: ‖[U, M]‖ = 2m|sin((Y_L − Y_R)χ/2)| for U = diag(e^{iY_Lχ}, e^{iY_Rχ}), M = mσ_x
  const chi = 2 * Math.PI * (s.tau + 0.15);
  check(`${tag}: UF = F′U and UF − FU = (F′ − F)U to rounding, the commutator 2m|sin(χ/4)|`, I.commutator.semiconj < 1e-14 && I.commutator.residual < 1e-14 && I.commutator.unitary < 1e-14
    && near(I.commutator.chi, chi, 1e-12) && near(I.commutator.norm, 2 * s.phiH * Math.abs(Math.sin(chi / 4)), 1e-12) && I.commutator.chargeGap === 0.5);
  // 2. the fold J = −iσ_x
  check(`${tag}: J = −iσ_x is skew-adjoint and unitary with J² = −1, and moves P_L to cos²θ`, I.fold.skewAdjoint === 0 && I.fold.unitary === 0 && I.fold.square === 0
    && near(I.fold.PL, h.PL, 1e-12) && near(I.fold.PR, h.PR, 1e-12));
  // 3. anchored phase classification on K₄
  const a = I.anchored, cyc = cycleHolonomies(a.phases, s.edges);
  const g = [0, 0.3, -1.1, 2.4], ug = a.phases.map((x, e) => x + g[s.edges[e][0]] - g[s.edges[e][1]]), cyc2 = cycleHolonomies(ug, s.edges);
  check(`${tag}: the three loop coordinates are the fundamental-cycle holonomies, unchanged by anchored gauges (the page’s and one written here)`,
    a.coords.every((x, k) => angleGap(x, cyc[k]) < 1e-12) && a.gauged.every((x, k) => angleGap(x, cyc[k]) < 1e-12) && cyc2.every((x, k) => angleGap(x, cyc[k]) < 1e-12)
    && a.invariance < 1e-12 && a.sectionResidual < 1e-12 && a.recoverResidual < 1e-12 && a.anchoredAtRoot && s.gauge[0] === 0);
  const cycleRank = s.edges.length - 4 + 1;
  check(`${tag}: counts n = 4, m = 6, |T| = 3, c = m − n + 1 = 3, c + a + n = m + k`, a.n === 4 && a.m === 6 && a.tree === 3 && a.c === cycleRank && a.c === 3 && a.counts === true && a.c + a.a + a.n === a.m + a.k);
  // 4. the double cover
  const dc = I.doubleCover;
  check(`${tag}: the spinor is the lift e^{iφ/2} of φ = 720°·τ, its continuation from 1 agrees`, dc.liftResidual < 1e-12 && dc.contResidual < 1e-9
    && near(s.spinor.phi, 4 * Math.PI * s.tau, 1e-12) && near(s.spinor.lift[0], Math.cos(2 * Math.PI * s.tau), 1e-12) && near(s.spinor.lift[1], Math.sin(2 * Math.PI * s.tau), 1e-12)
    && near(dc.atOneTurn[0], -1, 1e-15) && near(dc.atTwoTurns[0], 1, 1e-15));
  // 5. tetrahedral defects from the page's edge potential, counted here
  const A = I.tetra.edge, flat = tetraCounts(A, 0), mono = tetraCounts(A, 1);
  const antisym = [0, 1, 2, 3].every((i) => [0, 1, 2, 3].every((j) => A[i][j] === -A[j][i] && Number.isInteger(A[i][j])));
  check(`${tag}: no monopole: tetraDefects = 0, every faceErrors 0, the edge potential reproduces F`, antisym && flat.tetra === 0 && flat.edge === 0 && I.tetra.actual.tetraDefects === 0
    && same(I.tetra.actual.faceErrors, flat.face) && I.tetra.actual.exact && I.tetra.actual.cocycle);
  check(`${tag}: one monopole charge: 24 defects = Σ faceErrors (6 each), 4·6 ≤ 24, 24 ≤ 16·edgeErrors with 6 errors`, mono.tetra === 24 && same(mono.face, [6, 6, 6, 6]) && mono.edge === 6
    && I.tetra.monopole.tetraDefects === 24 && I.tetra.monopole.sum === 24 && same(I.tetra.monopole.faceErrors, mono.face) && I.tetra.monopole.anchorBound && I.tetra.monopole.edgeBound
    && I.tetra.monopole.edgeErrors === 6 && !I.tetra.monopole.exact && !I.tetra.monopole.cocycle);
  // 6. Lagrange
  check(`${tag}: Lagrange on u and e₀: 1 − (dτ/dt)² = ½ΣΣ(u_i v_j − u_j v_i)² = Σ η²`, I.lagrange.residual < 1e-14 && I.lagrange.loadResidual < 1e-14 && near(I.lagrange.lhs, 1 - u[0] ** 2, 1e-12) && near(I.lagrange.norm, 1, 1e-14));
}

async function checkLinks(p, tag) {
  check(`${tag}: exactly the six green Lean links, in #evidence`, same(await p.$$eval('[data-lean-gid]', (els) => els.map((e) => e.dataset.leanGid).sort()), [...GIDS].sort())
    && await p.$$eval('[data-lean-gid]', (els) => els.every((e) => e.closest('.col.side #evidence .lean') && e.closest('.lean').querySelector('.ok').textContent.trim() === 'LEAN ✓')));
  check(`${tag}: one ARGUED, MODEL, NUM and OPEN box each`, await p.evaluate(() => ['argued', 'model', 'num', 'open'].every((c) => document.querySelectorAll(`#evidence .lean.${c}`).length === 1)
    && document.querySelectorAll('#evidence .lean:not(.argued):not(.model):not(.num):not(.open):not(.frozen)').length === 6));
  check(`${tag}: bilingual §39.11 theory link in the drawer`, same(await p.$$eval('#drawer .refs a', (els) => els.map((e) => e.getAttribute('href')).sort()), ['zh', 'en'].map((l) => `../../${l}/${THEORY}`).sort()));
  check(`${tag}: the OPEN box links the §39.11 problem and the three Chapter 34 problems in both languages`, same(await p.$$eval('#evidence .lean.open a', (els) => els.map((e) => e.getAttribute('href')).sort()),
    ['zh', 'en'].flatMap((l) => OPEN_LINKS.map((x) => `../../${l}/${x}`)).sort()));
}

/* ---------- runtime contract ---------- */
await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
await checkLinks(page, 'runtime');
check('layout: the shared three-column lab, the stage and the strip in the middle', await page.evaluate(() => {
  const app = document.querySelector('.app.lab'), deck = app.querySelector(':scope > .deck'), center = app.querySelector(':scope > .center'), side = app.querySelector(':scope > .side');
  const d = deck.getBoundingClientRect(), c = center.getBoundingClientRect(), s = side.getBoundingClientRect();
  return getComputedStyle(app).gridTemplateColumns.trim().split(/\s+/).length === 3 && d.right <= c.left + 1 && c.right <= s.left + 1
    && !!center.querySelector(':scope > #stage') && !!center.querySelector(':scope > .tour#tour') && !!center.querySelector(':scope > .strip #plot')
    && !document.querySelector('#stage #plot') && !!side.querySelector(':scope > #readouts dl.ro') && !!side.querySelector(':scope > #evidence')
    && !!document.querySelector('#stage[data-thumb] > canvas#cv') && document.querySelector('#stage > button.handle#afgutHandle[type="button"]') !== null;
}));
check('layout: #rail is the left deck holding the lens toggle, then the cards with their note, then #ctlPanel', await page.evaluate(() => {
  const deck = document.querySelector('.app.lab > aside.col.deck#rail'), lens = document.querySelector('#lensToggleBtn.lens-toggle'), cards = document.querySelector('.presets.cards#presets');
  const ctl = document.querySelector('#ctlPanel'), F = Node.DOCUMENT_POSITION_FOLLOWING;
  return !!deck && document.querySelectorAll('#rail').length === 1 && deck.contains(lens) && deck.contains(cards) && deck.contains(document.querySelector('#presetNote')) && deck.contains(ctl)
    && !!(lens.compareDocumentPosition(cards) & F) && !!(cards.compareDocumentPosition(ctl) & F) && ctl.contains(document.querySelector('#logMu')) && ctl.contains(document.querySelector('#phiH'))
    && document.querySelectorAll('#presets [data-preset]').length === 5;
}));
check('layout: #infoBtn is the first child of #evidence, above every evidence box', await page.evaluate(() => {
  const ev = document.querySelector('.app.lab > aside.col.side > #evidence'), btn = document.querySelector('#infoBtn');
  const boxes = [...ev.querySelectorAll('.lean')], top = btn.getBoundingClientRect();
  return document.querySelectorAll('#infoBtn').length === 1 && ev.firstElementChild === btn && btn.matches('button.chip[type="button"]') && boxes.length === 10
    && boxes.every((b) => top.bottom <= b.getBoundingClientRect().top + 0.5);
}));
check('layout: opens on the default card at its still, paused', await page.evaluate(() => { const s = window.AFGUT_UNIFY_DEBUG.state; return s.preset === 'concentric-four-field-monad' && s.t === 0.5 && !s.playing; }));
check('sliders: log₁₀(μ/GeV) runs over [1.9599, 19.0867], Φ̃_H over [0, 1.5]', await page.evaluate(() => {
  const m = document.querySelector('#logMu'), f = document.querySelector('#phiH');
  return m.type === 'range' && m.min === '1.9599' && m.max === '19.0867' && f.type === 'range' && f.min === '0' && f.max === '1.5' && Number(f.value) === 1;
}));
check('readouts: no amber on any readout', await page.evaluate(() => {
  const probe = document.createElement('span'); probe.style.color = 'var(--amber)'; document.body.appendChild(probe);
  const amber = getComputedStyle(probe).color; probe.remove();
  return [...document.querySelectorAll('dl.ro dd, dl.ro dd *')].every((e) => getComputedStyle(e).color !== amber);
}));
check('stage: no warn-red label', await page.evaluate(() => !document.querySelector('#stage .c-wn, #stage .sw.wn')));
{ const s = await state(); checkMath(s, 'opening frame'); }

/* ---------- every card, both languages ---------- */
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  for (const card of Object.keys(CARDS)) {
    await pick(card);
    await seek(stillT(card));
    const s = await state(), c = CARDS[card];
    check(`${lang}/${card}: the card sets scene, drive and camera, paused at its still`, s.preset === card && s.scene === c.scene && s.drive === c.drive && !s.playing && near(s.tau, stillT(card), 1e-12)
      && String(await page.getAttribute(`[data-preset="${card}"]`, 'data-still')) === String(c.still) && near(s.camera.yaw, VIEW0[0], 1e-9) && near(s.camera.pitch, VIEW0[1], 1e-9));
    checkMath(s, `${lang}/${card}`);
    const v = await stageView(page, '#stage', false), lo = await labelOverlaps(page, '.stage .tag', 0);
    check(`${lang}/${card}: desktop stage, HUD and labels clear`, v.layout.length === 0 && v.hud.length === 0 && lo.length === 0, [...v.layout, ...v.hud, ...lo.map((x) => x.join(' / '))].join(' | '));
  }
}
await page.click('[data-lang-set="zh"]'); await settle(page);

// the numbers the card notes name
await pick('concentric-four-field-monad');
await seek(0.5);
{
  const s = await state();
  check('card 1 note: at M_Z, α₃⁻¹ = 8.47, α₂⁻¹ = 29.59, α₁⁻¹ = 59.00, α_G⁻¹ = 1.79 × 10³⁴ off the scale; at τ = 0.5 the spinor reads −1',
    s.logMu === LMZ && s.alphaInv[2].toFixed(2) === '8.47' && s.alphaInv[1].toFixed(2) === '29.59' && s.alphaInv[0].toFixed(2) === '59.00' && s.alphaGInv.toExponential(2) === '1.79e+34'
    && s.offScale[0] === true && s.offScale.slice(1).every((x) => !x) && near(s.spinor.lift[0], -1, 1e-12) && s.morph === 1 && s.lens === 'monad');
  check('card 1: the cell carries no monopole (tetraDefects = 0)', s.leanInstances.tetra.actual.tetraDefects === 0);
}
await pick('weinberg-angle-rg-running');
await seek(0);
{
  const s = await state();
  check('card 2 at τ = 0: μ₁₂, α₁⁻¹ = α₂⁻¹ = 42.41 and sin²θ_W = 0.3750', near(s.logMu, crossing(0, 1), 1e-9) && s.alphaInv[0].toFixed(2) === '42.41' && near(s.alphaInv[0], s.alphaInv[1], 1e-9) && s.sin2W.toFixed(4) === '0.3750');
  check('card 2: the two N_c curves read N_c/(2(N_c + 1)) and 9(N_c + 1)/(4(9 + 5N_c)) on N_c = 1 … 6, both 3/8 at 3',
    s.weinberg.anom.every((x, k) => near(x, weinbergTrace(k + 1, true).ratio, 1e-14)) && s.weinberg.fixed.every((x, k) => near(x, weinbergTrace(k + 1, false).ratio, 1e-14))
    && s.weinberg.atThree.every((x) => near(x, 0.375, 1e-15)));
  check('card 2: the crossings the OPEN box quotes', near(s.crossings.c12, crossing(0, 1), 1e-9) && near(s.crossings.c13, crossing(0, 2), 1e-9) && near(s.crossings.c23, crossing(1, 2), 1e-9));
}
await seek(0.5);
{ const s = await state(); check('card 2: the rail runs the scale linearly from μ₁₂ to M_Z', near(s.logMu, (crossing(0, 1) + LMZ) / 2, 1e-9) && s.drive === 'run'); checkMath(s, 'card 2 at τ = 0.5'); }
await seek(1);
{ const s = await state(); check('card 2 at τ = 1: back at M_Z, sin²θ_W = 0.2313', s.logMu === LMZ && s.sin2W.toFixed(4) === '0.2313' && Number(await page.inputValue('#logMu')).toFixed(4) === '1.9599'); }
await pick('higgs-cross-concept-zitterbewegung');
await seek(0.75);
{ const s = await state(); check('card 3 note: θ = 135°, P_L = P_R = 0.50, (m_W, m_Z) = (80.38, 91.19) GeV, v = 246.22 GeV', Math.round(s.higgs.theta * 180 / Math.PI) === 135
  && s.higgs.PL.toFixed(2) === '0.50' && s.higgs.PR.toFixed(2) === '0.50' && s.higgs.masses[0].toFixed(2) === '80.38' && s.higgs.masses[1].toFixed(2) === '91.19' && s.higgs.vev.toFixed(2) === '246.22'); }
await seek(0.5);
{ const s = await state(); check('card 3: at τ = 0.5 the state is on sheet R', near(s.higgs.PR, 1, 1e-12)); }
await pick('einstein-pythagorean-clock-balance');
await seek(0.6);
{ const s = await state(); check('card 4 note: at τ = 0.6, (dτ/dt)² = 0.7540, Σ η² = 0.2460, Δ = 0.000000', s.balance.rate2.toFixed(4) === '0.7540' && s.balance.load.toFixed(4) === '0.2460' && s.balance.delta.toFixed(6) === '0.000000'); }
for (const t of [0, 0.13, 0.37, 0.81, 1]) { await seek(t); const s = await state(); check(`card 4: the total stays 1 and the sides level at τ = ${t}`, near(s.balance.total, 1, 1e-12) && s.balance.delta < 1e-12); }
await pick('afgut-ledger-split-vs-unify');
await seek(0);
{ const s = await state(); check('card 5 at τ = 0: the split ledger at E_P, α_G = 1', s.morph === 0 && s.lens === 'ledger' && s.logMu === LEP && near(s.alphaG, 1, 1e-12)
  && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === 'true'); }
await seek(1);
{
  const s = await state();
  check('card 5 note: at τ = 1 the monad, the gravity shell innermost with α_G⁻¹ = 1, gauge shells at 33.27, 49.46, 52.41', s.morph === 1 && s.lens === 'monad' && near(s.fieldInv[0], 1, 1e-9)
    && s.radii[0] === Math.min(...s.radii) && s.alphaInv.map((x) => x.toFixed(2)).join() === '33.27,49.46,52.41' && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === 'false');
}

/* ---------- every control ---------- */
await pick('concentric-four-field-monad');
for (const v of [1.9599, 8, 13.006, 18.3, 19.0867]) {
  await input('#logMu', v);
  const s = await state();
  check(`slider log μ = ${v}: leaves the card, sets the scale`, s.preset === null && near(s.logMu, Math.min(Math.max(v, LMZ), LEP), 1e-9) && s.drive === 'phase');
  checkMath(s, `log μ = ${v}`);
}
{ await input('#logMu', 13.006); const s = await state(); check('slider at 13.006: sin²θ_W = 0.3750, the SU(2) and U(1) shells at one radius', s.sin2W.toFixed(4) === '0.3750' && Math.abs(s.radii[1] - s.radii[3]) < 2e-5); }
{ await input('#logMu', 19.0867); const s = await state(); check('slider at the top: E_P, α_G = 1.0000, on the scale', s.logMu === LEP && s.alphaG.toFixed(4) === '1.0000' && s.offScale[0] === false); }
for (const v of [0, 0.5, 1, 1.5]) {
  await input('#phiH', v);
  const s = await state();
  check(`slider Φ̃_H = ${v}: masses (80.38, 91.19)·Φ̃_H, β = 1/√(1 + Φ̃²)`, near(s.phiH, v, 1e-12) && near(s.higgs.masses[0], 80.38 * v, 1e-9) && near(s.higgs.beta, 1 / Math.sqrt(1 + v * v), 1e-12));
  checkMath(s, `Φ̃_H = ${v}`);
}
{ await input('#phiH', 0); await seek(0.8); const s = await state(); check('Φ̃_H = 0: the bridge is cut, the state stays on sheet L at every τ, β = 1', s.higgs.PL === 1 && s.higgs.beta === 1 && s.higgs.masses[0] === 0); }
await input('#phiH', 1);
// lens: the same state, two readings, a smooth morph
{
  await input('#logMu', 1.9599);
  const before = await state();
  await page.click('#lensToggleBtn'); await settle(page);
  const a = await state();
  check('lens toggle: to the split ledger (m = 0), same scale and Φ̃_H, the amber segment moves', a.lens === 'ledger' && a.morph === 0 && a.preset === null && near(a.logMu, before.logMu, 1e-12) && a.phiH === before.phiH
    && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === 'true');
  checkMath(a, 'ledger lens');
  await page.click('#lensToggleBtn'); await settle(page);
  const b = await state();
  check('lens toggle: back to the single-cell monad (m = 1)', b.lens === 'monad' && b.morph === 1 && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === 'false');
  // the morph passes through intermediate values (a tween, not a cut)
  const seen = await page.evaluate(() => new Promise((resolve) => {
    const vals = [];
    const tick = () => { const m = window.AFGUT_UNIFY_DEBUG.state.morph; vals.push(m); if (m <= 0 || vals.length > 600) resolve(vals); else requestAnimationFrame(tick); };
    document.getElementById('lensToggleBtn').click(); requestAnimationFrame(tick);
  }));
  check('lens toggle: the morph runs through intermediate shapes', seen.some((m) => m > 0.05 && m < 0.95) || seen.length <= 2, JSON.stringify(seen.slice(0, 8)));
  await settle(page);
  await page.click('#lensToggleBtn'); await settle(page);
}
for (const sc of ['weinberg', 'higgs', 'balance', 'fields']) {
  await page.click(`#sceneChips [data-scene="${sc}"]`); await settle(page);
  const s = await state();
  check(`scene chip ${sc}`, s.scene === sc && s.preset === null);
  const v = await stageView(page, '#stage', false), lo = await labelOverlaps(page, '.stage .tag', 0);
  check(`scene ${sc}: stage, HUD and labels clear`, v.layout.length === 0 && v.hud.length === 0 && lo.length === 0, [...v.layout, ...v.hud, ...lo.map((x) => x.join(' / '))].join(' | '));
}

/* ---------- the handle: drag in 3D without turning the camera ---------- */
await pick('concentric-four-field-monad');
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const before = await state(), h = await page.evaluate(() => window.AFGUT_UNIFY_DEBUG.handleBox());
  const target = await page.evaluate(() => window.AFGUT_UNIFY_DEBUG.dragTarget(13.0));
  check('scale handle: a visible amber button on the ladder at M_Z', !!h && await page.locator('#afgutHandle').isVisible() && before.handle && before.handle.kind === 'mu');
  if (h && target) {
    await page.mouse.move(h.x, h.y); await page.mouse.down();
    check('scale handle: pointerdown starts a drag', await page.locator('#afgutHandle').evaluate((el) => el.classList.contains('dragging')));
    await page.mouse.move(target.x, target.y, { steps: 6 }); await page.mouse.up(); await settle(page);
    const after = await state();
    check('scale handle: drag sets log₁₀ μ ≈ 13.0 and leaves the camera alone', Math.abs(after.logMu - 13) < 0.12 && same(after.camera, before.camera) && after.preset === null, `${after.logMu}`);
    checkMath(after, 'after the scale drag');
  }
  const m0 = (await state()).logMu, t0 = (await state()).t;
  await page.locator('#afgutHandle').focus(); await page.keyboard.press('ArrowLeft'); await settle(page);
  const k = await state();
  check('scale handle: ← lowers log₁₀ μ by 0.1 and leaves the clock alone', near(k.logMu, m0 - 0.1, 1e-9) && k.t === t0, `${m0} → ${k.logMu}`);
}
await pick('higgs-cross-concept-zitterbewegung');
{
  const before = await state(), h = await page.evaluate(() => window.AFGUT_UNIFY_DEBUG.handleBox()), target = await page.evaluate(() => window.AFGUT_UNIFY_DEBUG.dragTarget(0.5));
  check('Φ̃_H handle: shown on top of the magenta pole', !!h && before.handle && before.handle.kind === 'phi');
  if (h && target) {
    await page.mouse.move(h.x, h.y); await page.mouse.down(); await page.mouse.move(target.x, target.y, { steps: 6 }); await page.mouse.up(); await settle(page);
    const after = await state();
    check('Φ̃_H handle: drag sets Φ̃_H ≈ 0.50, camera unchanged', Math.abs(after.phiH - 0.5) <= 0.02 && same(after.camera, before.camera), `${after.phiH}`);
    checkMath(after, 'after the Φ̃_H drag');
  }
}
await pick('einstein-pythagorean-clock-balance');
check('balance scene: no handle (nothing to drag on the stage)', await page.locator('#afgutHandle').isHidden());

/* ---------- drawer, playback ---------- */
await page.click('#infoBtn'); await settle(page);
check('info button opens the theory drawer', await page.locator('#drawer [role="dialog"]').isVisible());
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').isHidden());
check('play advances the rail', await playsAfter(page, () => page.locator('#play').evaluate((b) => b.click()), () => window.AFGUT_UNIFY_DEBUG.state));
await pause();
{ const a = await state(); await settle(page); const b = await state(); check('pause holds the clock', !a.playing && a.t === b.t); }
for (const card of Object.keys(CARDS)) {
  check(`card ${card}: a click plays its story`, await playsAfter(page, () => page.click(`[data-preset="${card}"]`), () => window.AFGUT_UNIFY_DEBUG.state));
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

/* ---------- the cited frames a chapter will use: 334 × 500 and 740 × 500, both languages ---------- */
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
  check(`still ${lang}/${card}: paused on the declared frame, no handle`, s.preset === card && !s.playing && near(s.t, stillT(card), 1e-12) && await p.locator('#afgutHandle').isHidden()
    && await p.evaluate(() => TRV.still && TRV.shot && document.documentElement.dataset.trPalette === undefined));
  if (card === 'concentric-four-field-monad') check(`still ${lang}/${card}: the vector has turned once, the spinor reads −1`, near(s.spinor.phi, 2 * Math.PI, 1e-12) && near(s.spinor.lift[0], -1, 1e-12));
  if (card === 'weinberg-angle-rg-running') check(`still ${lang}/${card}: back at M_Z, sin²θ_W = 0.2313`, s.logMu === LMZ && s.sin2W.toFixed(4) === '0.2313');
  if (card === 'higgs-cross-concept-zitterbewegung') check(`still ${lang}/${card}: θ = 135°, P_L = P_R = 0.50`, s.higgs.PL.toFixed(2) === '0.50' && s.higgs.PR.toFixed(2) === '0.50');
  if (card === 'einstein-pythagorean-clock-balance') check(`still ${lang}/${card}: Σ = 1.000000, Δ = 0.000000`, s.balance.total.toFixed(6) === '1.000000' && s.balance.delta.toFixed(6) === '0.000000');
  if (card === 'afgut-ledger-split-vs-unify') check(`still ${lang}/${card}: the monad at E_P, α_G = 1.0000`, s.morph === 1 && s.logMu === LEP && s.alphaG.toFixed(4) === '1.0000');
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
