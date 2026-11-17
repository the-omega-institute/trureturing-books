// UNIFORM//SLICE browser regression: the shared stage-first gate, then every control, card, lens, still and frame, and
// every number the page claims, checked against algorithms written here (the moiré reading in closed form from the
// in-plane geometry, the Dirichlet factor from its closed form, the Weyl average term by term, the partial trace of
// the Bell density by index sums, the three Pauli sectors by Hilbert–Schmidt products, pinching by hand).
// Run directly with node; VIZ_SLOW_FRAMES=1000 exercises every transition and playback with sparse animation frames.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, capitalGreek, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'uniform-field-observer-slice-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const BOOK_DIR = path.resolve(DIR, '..', '..');
const THEORY = 'ch39-s12-uniform-field-and-observer-slice.html';
const THEORY_SEC = `${THEORY}#sec-ch39-uniform-field-and-observer-slice`;   // the drawer and the registry land on the section heading
const OPEN_LINKS = [
  `${THEORY}#prob-ch39-orthogonal-slice-cosmology-and-dark-sector`,
  'ch34-s23-cosmological-arrow-and-horizon-floor.html#prob-ch34-past-hypothesis-and-cosmological-constant',
  'ch39-s11-af-gut-arc-field-grand-unification.html#prob-ch39-af-gut-threshold-and-proton-stability'
];
const GIDS = [
  'D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal',
  'D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar',
  'D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot',
  'D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight',
  'D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean',
  'D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points'
];
const CARDS = {
  'isotropic-singlet-ontology': { lens: 'sea', drive: 'tilt', still: 'end' },
  'tilted-slice-moire-emergence': { lens: 'slice', drive: 'tilt', still: 'end' },
  'phase-sweep-motionless-flow': { lens: 'slice', drive: 'sweep', still: 0.25 },
  'orthogonal-dark-sector-clock-load': { lens: 'slice', drive: 'load', still: 0.5 },
  'horizon-aperture-homogenization': { lens: 'slice', drive: 'aperture', still: 'end' }
};
const VIEW0 = [0.62, 0.56];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const stillT = (c) => (CARDS[c].still === 'end' ? 1 : CARDS[c].still);

/* ---------- independent mathematics, written here and never calling the page ---------- */
const A = 0.5, HALF = 1.3, ETA_SLICE = 0.3, DEG = Math.PI / 180;
const lm = (thetaDeg) => A / (2 * Math.sin(thetaDeg * DEG / 2));                 // the moiré period
const alphaOf = (thetaDeg) => 2 * Math.sin(thetaDeg * DEG / 2);                   // a / L_M, the phase step per cell
/** |D_W| in closed form (W = 1, or α an integer, gives 1). */
function dirichlet(alpha, W) {
  const s = Math.sin(Math.PI * alpha);
  return Math.abs(s) < 1e-12 ? 1 : Math.abs(Math.sin(W * Math.PI * alpha) / (W * s));
}
/** The aperture reading at in-plane (u, v): on the bisector plane Δk·x = −|Δk|v, and the cells step by a along Δk = −|Δk|e₂. */
function reading(thetaDeg, phiDeg, W, v) {
  const k = 2 * Math.PI / lm(thetaDeg);
  let s = 0;
  for (let i = 0; i < W; i++) s += Math.cos((-k * (v - i * A) - phiDeg * DEG) / 2) ** 2;
  return s / W;
}
/** The Weyl average (1/N)Σ_{i<N} cos²(π(ρ + iα)). */
const weyl = (rho, alpha, N) => { let s = 0; for (let i = 0; i < N; i++) s += Math.cos(Math.PI * (rho + i * alpha)) ** 2; return s / N; };
/** The partial traces of a 4 × 4 density by index sums (basis |ab⟩ = 2a + b). */
const traceOut = (R, keep) => [0, 1].map((i) => [0, 1].map((j) => [0, 1].reduce((s, k) => s + (keep === 'first' ? R[2 * i + k][2 * j + k] : R[2 * k + i][2 * k + j]), 0)));
const bellDensity = [[0.5, 0, 0, 0.5], [0, 0, 0, 0], [0, 0, 0, 0], [0.5, 0, 0, 0.5]];
const classicalDensity = [[0.5, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0.5]];
const dtdt = (eta) => Math.sqrt(1 - ETA_SLICE ** 2 - eta ** 2);

const T = await session();
const { page, check } = T;

// independent facts that do not need the page
{
  check('maths: L_M(1.05°) = 54.568a and L_M(36°) = 1.618a, the golden ratio', (lm(1.05) / A).toFixed(3) === '54.568' && near(lm(36) / A, (1 + Math.sqrt(5)) / 2, 1e-12));
  check('maths: α(36°) = 2 sin 18° = (√5 − 1)/2', near(alphaOf(36), (Math.sqrt(5) - 1) / 2, 1e-15));
  check('maths: |D₂₀| at θ = 36° is 0.0486', dirichlet(alphaOf(36), 20).toFixed(4) === '0.0486');
  check('maths: dτ/dt = √3/2 = 0.8660 at η_dark = 0.40', dtdt(0.4).toFixed(4) === '0.8660' && near(dtdt(0.4), Math.sqrt(3) / 2, 1e-12));
  const m = traceOut(bellDensity, 'first');
  check('maths: the Bell marginal is ½·1 and the classical mixture has the same', same(m, [[0.5, 0], [0, 0.5]]) && same(traceOut(classicalDensity, 'first'), m) && same(traceOut(classicalDensity, 'second'), traceOut(bellDensity, 'second')));
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
  await context.exposeBinding('__slicePaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__slicePaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__slicePaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined,
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
check('source: green and red stay off the stage (no ok or warn colour in the page code)', !/P\.ok\b|P\.warn\b|var\(--ok\)|var\(--warn\)|c-wn|sw wn/.test(sources['main.js'] + sources['style.css']));
check('source: amber is not a readout colour', !/dl\.ro[^{]*\{[^}]*--amber/.test(sources['style.css']));
{
  // page-authored amber only on the chosen lens segment and the handle (the chosen card is the shared theme's)
  const amberRules = [...sources['style.css'].replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/([^{}]+)\{([^}]*)\}/g)].filter((m) => /--amber/.test(m[2]));
  const allowed = (sel) => /^\.lens-toggle\[aria-pressed="(?:true|false)"\] \.seg\.(?:on|off)$/.test(sel) || /^\.handle(?:$|[.:[])/.test(sel);
  const bad = amberRules.flatMap((m) => m[1].split(',').map((x) => x.trim())).filter((sel) => !allowed(sel));
  check('source: page-authored amber only on the chosen lens segment and the handle (no legend swatch, pill or slider value)', amberRules.length > 0 && bad.length === 0, bad.join(' | '));
  check('source: no amber in the page script (plot markers, stage, tags) and no amber pill', !/P\.amber|c-am\b|sw am\b/.test(sources['main.js']) && !/pill hot|c-am\b/.test(sources['index.html']));
}
check('source: no possessive ’s in the visible text (it splits under capitals)', !/’s\b/.test(sources['index.html'] + sources['main.js']));
{
  const zh = (sources['index.html'].match(/class="(?:[^"]*\s)?zh(?:\s[^"]*)?"/g) || []).length, en = (sources['index.html'].match(/class="(?:[^"]*\s)?en(?:\s[^"]*)?"/g) || []).length;
  check('source: as many .zh as .en elements', zh === en && zh > 0, `${zh} zh / ${en} en`);
}
check('suite: no fixed waits', !new RegExp('wait' + 'ForTimeout').test(suite));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID);
check('registry: live §39.12 entry with five bilingual cards and the six theorems', !!entry && entry.status === 'live' && entry.chapter === 39 && entry.section === '39.12'
  && entry.code === 'UNIFORM//SLICE' && entry.capture_lock === 'links' && same(entry.presets, Object.keys(CARDS)) && entry.presets.every((c) => entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same(entry.lean.map((x) => x.gid).sort(), [...GIDS].sort()) && entry.tags.length === entry.tags_en.length
  && entry.theory[0].href === `../zh/${THEORY_SEC}` && entry.theory[0].href_en === `../en/${THEORY_SEC}`);
const deps = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'tests', 'dependencies.json'), 'utf8')).suites[`${ID}.test.mjs`] || [];
check('dependencies: the suite is registered with the shared solid runtime and the registry', ['@citations', '@registry-entry', 'theme/viz/kit.js', 'theme/viz/solid-core.js', 'theme/viz/vendor/three.module.min.js', '@lean-links'].every((d) => deps.includes(d)));
// the chapter is written in a separate change; check its cards only once it exists
for (const lang of ['zh', 'en']) {
  const file = path.join(BOOK_DIR, lang, THEORY.replace(/\.html$/, '.md'));
  if (!fs.existsSync(file)) continue;
  const cited = [...fs.readFileSync(file, 'utf8').matchAll(/::: \{\.viz src="uniform-field-observer-slice-sandbox"(?: preset="([^"]+)")?/g)].map((m) => m[1]).filter(Boolean);
  check(`chapter ${lang}: every cited card exists`, cited.every((c) => c in CARDS), JSON.stringify(cited));
}

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.UNIFORM_SLICE_DEBUG.state);
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
  await until(p, (id) => { const s = window.UNIFORM_SLICE_DEBUG.state; return s.preset === id && !s.blending; }, card);
  await pause(p);
}
async function seek(t, p = page) {
  await p.locator('#now').evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, t);
  await settle(p);
}

/** Every number of a state against the algorithms of this file. */
function checkMath(s, tag) {
  const I = s.leanInstances, th = s.theta, f = s.frame, h = th * DEG / 2;
  check(`${tag}: L_M = a/(2 sin(θ/2)), |Δk| = 2π/L_M, α = 2 sin(θ/2)`, near(f.LM, lm(th), 1e-12) && near(f.dkLen, 2 * Math.PI / lm(th), 1e-9) && near(f.alpha, alphaOf(th), 1e-12));
  check(`${tag}: the slice is the bisector plane and Δk lies in it, along −e₂`, near(f.n[1], -Math.sin(h), 1e-12) && near(f.n[2], Math.cos(h), 1e-12)
    && near(f.dk[0] * f.n[0] + f.dk[1] * f.n[1] + f.dk[2] * f.n[2], 0, 1e-9) && f.dk.every((x, i) => near(x, -f.dkLen * f.e2[i], 1e-9)));
  check(`${tag}: the 125 nodes are the 5 × 5 × 5 lattice of spacing a, unmoved`, s.nodesPos.length === 125 && s.nodesPos.every((p, k) => {
    const i = Math.floor(k / 25), j = Math.floor(k / 5) % 5, l = k % 5;
    return p[0] === (i - 2) * A && p[1] === (j - 2) * A && p[2] === (l - 2) * A;
  }));
  // the slice reading: closed form against the page's grid samples
  const worst = Math.max(...s.slice.sample.map((q) => Math.abs(q.w - reading(th, s.phiDeg, s.W, q.v))));
  check(`${tag}: every sampled slice reading is the mean of cos²(½(Δk·x − φ)) over the aperture`, worst < 1e-12, `max error ${worst}`);
  check(`${tag}: contrast ΔI/Ī = |sin(Wπα)/(W sin πα)|`, near(s.contrast, dirichlet(alphaOf(th), s.W), 1e-12), `${s.contrast} vs ${dirichlet(alphaOf(th), s.W)}`);
  // the contour model ½ + ½·amp·cos(−|Δk|v + phase0) the page draws from: it must be the reading itself, sign included
  const model = (v) => 0.5 + 0.5 * s.amp * Math.cos(-f.dkLen * v + s.phase0);
  const mWorst = Math.max(...s.slice.sample.map((q) => Math.abs(model(q.v) - reading(th, s.phiDeg, s.W, q.v))), Math.abs(model(0) - reading(th, s.phiDeg, s.W, 0)));
  check(`${tag}: amp = contrast ≥ 0 and ½ + ½·amp·cos(−|Δk|v + phase0) is the aperture reading at every sample`, s.amp >= 0 && near(s.amp, s.contrast, 1e-12) && mWorst < 1e-9, `max error ${mWorst}`);
  const lvl = { peak: 0.5 + s.amp / 2, void: 0.5 - s.amp / 2, half: 0.5 };
  const lWorst = Math.max(0, ...s.levels.map(([kind, v]) => Math.abs(reading(th, s.phiDeg, s.W, v) - lvl[kind])));
  check(`${tag}: every contour line sits on its level: peaks at ½ + amp/2, blind zones at ½ − amp/2, dashed lines at ½`, s.levels.every(([, v]) => Math.abs(v) <= HALF)
    && (s.amp >= 1e-9 || s.levels.length === 0) && (s.amp < 1e-9 || lm(th) > 2 * HALF || s.levels.some(([kind]) => kind === 'peak')) && lWorst < 1e-9, `max error ${lWorst}`);
  if (lm(th) <= 2 * HALF) check(`${tag}: the slice spans a period, so its brightest and darkest points bound ½ ± ½ contrast`,
    s.slice.hi <= 0.5 + s.contrast / 2 + 1e-12 && s.slice.lo >= 0.5 - s.contrast / 2 - 1e-12);
  check(`${tag}: the sweep moves the fringes by L_M·φ/360°; dτ/dt = √(1 − 0.30² − η²)`, near(s.shift, lm(th) * s.phiDeg / 360, 1e-12) && near(s.dtdt, dtdt(s.eta), 1e-12));
  // 1. the Bell marginals
  check(`${tag}: Bell pair normalized, trace 1, idempotent; every node ½·1, Tr ρ = 1, ‖∇ρ‖ = 0, S = ln 2; thermal S = 125 ln 2`,
    near(I.bell.normalized, 1, 1e-15) && near(I.bell.trace, 1, 1e-15) && I.bell.idempotent < 1e-15 && I.bell.offHalf < 1e-15 && I.bell.traces.every((x) => near(x, 1, 1e-15))
    && I.bell.grad === 0 && near(I.bell.marginalPurity, 0.5, 1e-15) && near(I.bell.nodeEntropy, Math.LN2, 1e-15) && I.bell.globalEntropy === 0 && near(I.bell.thermalEntropy, 125 * Math.LN2, 1e-9) && I.bell.nodes === 125);
  // 2. the Weyl–Haar average
  const rho = -s.phiDeg / 360;
  check(`${tag}: the Weyl averages (1/N)Σ cos²(π(ρ + iα)) for N = 1 … 20, and the gap at W`, I.haar.averages.every((x, k) => near(x, weyl(rho, alphaOf(th), k + 1), 1e-12))
    && near(I.haar.gapAtW, Math.abs(weyl(rho, alphaOf(th), s.W) - 0.5), 1e-12) && I.haar.gapAtW <= s.contrast / 2 + 1e-12);
  // 3. the blind spot
  const b = I.blind;
  check(`${tag}: sectors 3 + 3 + 9 = 15, mutually orthogonal, ratio 9/15; equal marginals, ‖ρ_Bell − ρ_cl‖ = 1/√2`, b.dims.A === 3 && b.dims.B === 3 && b.dims.C === 9 && b.total === 15
    && near(b.ratio, 0.6, 1e-15) && b.orthogonal < 1e-12 && near(b.selfNorm, 4, 1e-12) && b.sameA < 1e-15 && b.sameB < 1e-15 && near(b.distance, Math.SQRT1_2, 1e-15) && b.clIdem > 0.2 && near(b.clTrace, 1, 1e-15));
  // 4. the rank-one Born pairing at the slice centre: cos²(φ/2)
  const w0 = Math.cos(s.phiDeg * DEG / 2) ** 2;
  check(`${tag}: at the centre |φ*ψ|² = Tr(ρP) = cos²(φ/2), I_slice + I_⊥ = 1, the unread state is the weighted ensemble`, near(I.born.w0, w0, 1e-12) && near(I.born.trace0, w0, 1e-12)
    && near(I.born.w1, 1 - w0, 1e-12) && near(I.born.sum, 1, 1e-12) && I.born.unreadResidual < 1e-12 && I.born.complete < 1e-12 && I.born.orthogonal < 1e-12);
  // 5. pinching the dark ring's state |+⟩⟨+|
  check(`${tag}: pinching |+⟩⟨+|: 1 = ½ + ½, discarded mass |ρ₀₁|² + |ρ₁₀|² = ½, I_EM(90°) = 0`, near(I.pinching.total, 1, 1e-15) && near(I.pinching.kept, 0.5, 1e-15)
    && near(I.pinching.discarded, 0.5, 1e-15) && I.pinching.residual < 1e-15 && near(I.pinching.offDiagonal, 0.5, 1e-15) && Math.abs(I.pinching.IEM) < 1e-15);
  // 6. two contexts
  check(`${tag}: same text and rule, meanings (F, F, F) ≠ (T, T, T); the lens decides which one is shown`, I.context.textSame && I.context.ruleSame && same(I.context.baseline, [false, false, false])
    && same(I.context.alternate, [true, true, true]) && same(I.context.now, s.lens === 'sea' ? I.context.baseline : I.context.alternate) && near(I.context.seaReading, 0.5, 1e-15) && near(I.context.sliceReading, w0, 1e-12));
}

async function checkLinks(p, tag) {
  check(`${tag}: exactly the six green Lean links, in #evidence`, same(await p.$$eval('[data-lean-gid]', (els) => els.map((e) => e.dataset.leanGid).sort()), [...GIDS].sort())
    && await p.$$eval('[data-lean-gid]', (els) => els.every((e) => e.closest('.col.side #evidence .lean') && e.closest('.lean').querySelector('.ok').textContent.trim() === 'LEAN ✓')));
  check(`${tag}: one ARGUED, MODEL, NUM and OPEN box each`, await p.evaluate(() => ['argued', 'model', 'num', 'open'].every((c) => document.querySelectorAll(`#evidence .lean.${c}`).length === 1)
    && document.querySelectorAll('#evidence .lean:not(.argued):not(.model):not(.num):not(.open):not(.frozen)').length === 6));
  check(`${tag}: bilingual §39.12 theory link in the drawer, on the section fragment`, same(await p.$$eval('#drawer .refs a', (els) => els.map((e) => e.getAttribute('href')).sort()), ['zh', 'en'].map((l) => `../../${l}/${THEORY_SEC}`).sort()));
  check(`${tag}: the OPEN box links the §39.12, §34.23 and §39.11 problems in both languages`, same(await p.$$eval('#evidence .lean.open a', (els) => els.map((e) => e.getAttribute('href')).sort()),
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
    && !!document.querySelector('#stage[data-thumb] > canvas#cv') && document.querySelector('#stage > button.handle#sliceHandle[type="button"]') !== null;
}));
check('layout: #rail is the left deck holding the lens toggle, then the cards with their note, then #ctlPanel with the four sliders', await page.evaluate(() => {
  const deck = document.querySelector('.app.lab > aside.col.deck#rail'), lens = document.querySelector('#lensToggleBtn.lens-toggle'), cards = document.querySelector('.presets.cards#presets');
  const ctl = document.querySelector('#ctlPanel'), F = Node.DOCUMENT_POSITION_FOLLOWING;
  return !!deck && deck.contains(lens) && deck.contains(cards) && deck.contains(document.querySelector('#presetNote')) && deck.contains(ctl)
    && !!(lens.compareDocumentPosition(cards) & F) && !!(cards.compareDocumentPosition(ctl) & F)
    && ['tiltTheta', 'phaseSweep', 'apertureScale', 'orthoDarkLoad'].every((id) => ctl.contains(document.getElementById(id)) && document.getElementById(id).type === 'range')
    && document.querySelectorAll('#presets [data-preset]').length === 5;
}));
check('layout: #infoBtn is the first child of #evidence, above every evidence box', await page.evaluate(() => {
  const ev = document.querySelector('.app.lab > aside.col.side > #evidence'), btn = document.querySelector('#infoBtn');
  const boxes = [...ev.querySelectorAll('.lean')], top = btn.getBoundingClientRect();
  return document.querySelectorAll('#infoBtn').length === 1 && ev.firstElementChild === btn && btn.matches('button.chip[type="button"]') && boxes.length === 10
    && boxes.every((b) => top.bottom <= b.getBoundingClientRect().top + 0.5);
}));
check('layout: opens on the first card at its still, paused, in the ontology lens', await page.evaluate(() => { const s = window.UNIFORM_SLICE_DEBUG.state; return s.preset === 'isotropic-singlet-ontology' && s.t === 1 && !s.playing && s.lens === 'sea'; }));
check('sliders: θ over [1, 60]°, φ over [0, 360]°, W over [1, 20] in whole cells, η_dark over [0, 0.8]', await page.evaluate(() => {
  const g = (id) => document.getElementById(id);
  return g('tiltTheta').min === '1' && g('tiltTheta').max === '60' && g('phaseSweep').min === '0' && g('phaseSweep').max === '360' && g('apertureScale').min === '1' && g('apertureScale').max === '20'
    && g('apertureScale').step === '1' && g('orthoDarkLoad').min === '0' && g('orthoDarkLoad').max === '0.8';
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
    check(`${lang}/${card}: the card sets lens, drive and camera, paused at its still`, s.preset === card && s.lens === c.lens && s.drive === c.drive && !s.playing && near(s.tau, stillT(card), 1e-12)
      && String(await page.getAttribute(`[data-preset="${card}"]`, 'data-still')) === String(c.still) && near(s.camera.yaw, VIEW0[0], 1e-9) && near(s.camera.pitch, VIEW0[1], 1e-9));
    checkMath(s, `${lang}/${card}`);
    const v = await stageView(page, '#stage', false), lo = await labelOverlaps(page, '.stage .tag', 0);
    check(`${lang}/${card}: desktop stage, HUD and labels clear`, v.layout.length === 0 && v.hud.length === 0 && lo.length === 0, [...v.layout, ...v.hud, ...lo.map((x) => x.join(' / '))].join(' | '));
  }
}
await page.click('[data-lang-set="zh"]'); await settle(page);

// the numbers the card notes name
await pick('isotropic-singlet-ontology');
await seek(1);
{
  const s = await state(), reads = await page.evaluate(() => [[0, 0], [0.4, -0.7], [-1.1, 1.2], [0.9, 0.3]].map(([u, v]) => window.UNIFORM_SLICE_DEBUG.readAt(u, v)));
  check('card 1: the ontology lens reads ½ at every point of the slice, θ = 36°', s.lens === 'sea' && s.shown.flat === 0.5 && reads.every((x) => x === 0.5) && near(s.theta, 36, 1e-12));
}
await seek(0);
{ const s = await state(); check('card 1 at τ = 0: θ = 1.05°, and the slice still reads ½', near(s.theta, 1.05, 1e-12) && s.shown.flat === 0.5); }
await pick('tilted-slice-moire-emergence');
await seek(0);
{ const s = await state(); check('card 2 at τ = 0: θ = 1.05°, L_M = 54.568a', near(s.theta, 1.05, 1e-12) && (s.frame.LM / A).toFixed(3) === '54.568' && s.lens === 'slice'); checkMath(s, 'card 2 at τ = 0'); }
await seek(1);
{
  const s = await state(), reads = await page.evaluate(() => [-0.6, -0.2, 0.1, 0.55].map((v) => window.UNIFORM_SLICE_DEBUG.readAt(0.3, v)));
  check('card 2 at its still: θ = 36°, L_M = 1.618a, contrast 1.0000, the readings are cos²ΔΦ', near(s.theta, 36, 1e-12) && (s.frame.LM / A).toFixed(3) === '1.618' && s.contrast.toFixed(4) === '1.0000'
    && reads.every((x, k) => near(x, reading(36, 0, 1, [-0.6, -0.2, 0.1, 0.55][k]), 1e-12)) && near(s.slice.hi, 1, 2e-3) && near(s.slice.lo, 0, 2e-3));
}
await pick('phase-sweep-motionless-flow');
await seek(0.25);
{
  const s = await state();
  check('card 3 note: at τ = 0.25, φ = 90°, the peak has moved L_M/4 = 0.405a and the nodes by 0', near(s.phiDeg, 90, 1e-9) && (s.shift / A).toFixed(3) === '0.405' && near(s.shift, lm(36) / 4, 1e-12));
  const before = s.nodesPos; await seek(0.8); const s2 = await state();
  check('card 3: sweeping on, the fringes move and every node stays exactly where it was', same(s2.nodesPos, before) && near(s2.shift, lm(36) * 0.8, 1e-12) && !same(s2.slice.sample, s.slice.sample));
}
await pick('orthogonal-dark-sector-clock-load');
await seek(0.5);
{ const s = await state(); check('card 4 note: η_dark = 0.40, dτ/dt = 0.8660, I_EM(90°) = 0.0000', near(s.eta, 0.4, 1e-12) && s.dtdt.toFixed(4) === '0.8660' && Math.abs(s.leanInstances.pinching.IEM).toFixed(4) === '0.0000'); }
for (const t of [0, 0.3, 1]) { await seek(t); const s = await state(); check(`card 4: at τ = ${t} the load is ${0.8 * t}, the slice contrast of the ring stays 0`, near(s.eta, 0.8 * t, 1e-12) && Math.abs(s.leanInstances.pinching.IEM) < 1e-15 && near(s.dtdt, dtdt(0.8 * t), 1e-12) && s.ringMinor > 0); }
await pick('horizon-aperture-homogenization');
for (const [t, W] of [[0, 1], [0.5, 11], [1, 20]]) { await seek(t); const s = await state(); check(`card 5 at τ = ${t}: W = ${W}, contrast |D_W| = ${dirichlet(alphaOf(36), W).toFixed(4)}`, s.W === W && near(s.contrast, dirichlet(alphaOf(36), W), 1e-12)); checkMath(s, `card 5 at W = ${W}`); }
{ const s = await state(); check('card 5 note: W = 20, ΔI/Ī = 0.0486, the readings within ½ ± 0.0243', s.contrast.toFixed(4) === '0.0486' && s.slice.hi <= 0.5 + 0.0244 && s.slice.lo >= 0.5 - 0.0244); }
{
  // the contrast oscillates beneath the decaying envelope 1/(W sin πα); it does not fall cell by cell
  const a36 = alphaOf(36), D = (W) => dirichlet(a36, W), env = (W) => 1 / (W * Math.sin(Math.PI * a36));
  const rises = Array.from({ length: 19 }, (_, k) => k + 1).filter((W) => D(W + 1) > D(W));
  check('maths: at θ = 36° |D_W| rises again at some steps (W = 3 → 4: 0.1582 → 0.2672) and stays under 1/(W sin πα) → 0', D(3).toFixed(4) === '0.1582' && D(4).toFixed(4) === '0.2672'
    && rises.length >= 5 && rises.includes(3) && Array.from({ length: 20 }, (_, k) => k + 1).every((W) => D(W) <= env(W) + 1e-12) && env(20) < 0.054, JSON.stringify(rises));
  const at = [];
  for (const t of [2 / 19, 3 / 19]) { await seek(t); const q = await state(); at.push([q.W, q.contrast]); }
  check('card 5: the page reads 0.1582 at W = 3 and 0.2672 at W = 4, as its note says', at[0][0] === 3 && at[1][0] === 4 && at[0][1].toFixed(4) === '0.1582' && at[1][1].toFixed(4) === '0.2672', JSON.stringify(at));
  const note = await page.locator('#presetNote').innerText();
  check('card 5 note: names the oscillation under the 1/W envelope with W = 3 and W = 4, not a steady fade', /振荡/.test(note) && /0\.1582/.test(note) && /0\.2672/.test(note) && !/一路变淡/.test(note), note);
  await seek(1);
}

/* ---------- every control ---------- */
await pick('tilted-slice-moire-emergence');
for (const v of [1, 1.05, 12, 36, 60]) {
  await input('#tiltTheta', v);
  const s = await state();
  check(`slider θ = ${v}: leaves the card, sets the turn`, s.preset === null && near(s.theta, v, 1e-9) && s.drive === 'free');
  checkMath(s, `θ = ${v}`);
}
{ const s = await state(); check('θ = 60°: α = 1, the cells sample one period each, so no aperture can average the fringes away', near(s.frame.alpha, 1, 1e-12) && near(dirichlet(s.frame.alpha, 20), 1, 1e-9)); }
// regression: at θ = 60°, W = 2, φ = 0 a closed-form fallback lost the sign of D_W and put a blind zone where the reading is 1
await input('#apertureScale', 2);
{
  const s = await state(), centre = await page.evaluate(() => window.UNIFORM_SLICE_DEBUG.readAt(0, 0));
  const model0 = 0.5 + 0.5 * s.amp * Math.cos(s.phase0), nearest = (kind) => Math.min(Infinity, ...s.levels.filter(([k]) => k === kind).map(([, v]) => Math.abs(v)));
  check('θ = 60°, W = 2, φ = 0: the centre reads 1, the contour model says 1, a peak line runs through the centre', near(s.theta, 60, 1e-9) && s.W === 2 && s.phiDeg === 0
    && near(centre, 1, 1e-12) && near(reading(60, 0, 2, 0), 1, 1e-12) && near(model0, 1, 1e-12) && near(s.amp, 1, 1e-12) && nearest('peak') < 1e-9 && nearest('void') > 0.2,
    `centre ${centre}, model ${model0}, amp ${s.amp}, phase0 ${s.phase0}`);
  checkMath(s, 'θ = 60°, W = 2, φ = 0');
}
await input('#apertureScale', 1);
await input('#tiltTheta', 36);
for (const v of [0, 90, 180, 359]) { await input('#phaseSweep', v); const s = await state(); check(`slider φ = ${v}°`, near(s.phiDeg, v, 1e-9)); checkMath(s, `φ = ${v}`); }
await input('#phaseSweep', 0);
for (const v of [1, 2, 7, 13, 20]) { await input('#apertureScale', v); const s = await state(); check(`slider W = ${v}`, s.W === v && near(s.contrast, dirichlet(alphaOf(36), v), 1e-12)); checkMath(s, `W = ${v}`); }
await input('#apertureScale', 1);
for (const v of [0, 0.4, 0.8]) { await input('#orthoDarkLoad', v); const s = await state(); check(`slider η_dark = ${v}: dτ/dt = ${dtdt(v).toFixed(4)}`, near(s.eta, v, 1e-12) && near(s.dtdt, dtdt(v), 1e-12)); }
await input('#orthoDarkLoad', 0.4);
// lens: the same parameters, two readings
{
  const before = await state();
  await page.click('#lensToggleBtn'); await settle(page);
  const a = await state();
  check('lens toggle: to the ontology sea, same θ, φ, W and η; the amber segment moves', a.lens === 'sea' && a.theta === before.theta && a.phiDeg === before.phiDeg && a.W === before.W && a.eta === before.eta
    && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === 'true' && a.shown.flat === 0.5);
  checkMath(a, 'sea lens');
  await page.click('#lensToggleBtn'); await settle(page);
  const b = await state();
  check('lens toggle: back to the observer slice', b.lens === 'slice' && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === 'false' && b.shown.flat === null);
}

/* ---------- the handle: drag in 3D without turning the camera ---------- */
await pick('tilted-slice-moire-emergence');
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const before = await state(), h = await page.evaluate(() => window.UNIFORM_SLICE_DEBUG.handleBox());
  const target = await page.evaluate(() => window.UNIFORM_SLICE_DEBUG.dragTarget(20));
  check('θ handle: a visible amber button at the tip of the slice normal', !!h && await page.locator('#sliceHandle').isVisible() && !!before.handle);
  if (h && target) {
    await page.mouse.move(h.x, h.y); await page.mouse.down();
    check('θ handle: pointerdown starts a drag', await page.locator('#sliceHandle').evaluate((el) => el.classList.contains('dragging')));
    await page.mouse.move(target.x, target.y, { steps: 6 }); await page.mouse.up(); await settle(page);
    const after = await state();
    check('θ handle: drag sets θ ≈ 20° and leaves the camera alone', Math.abs(after.theta - 20) < 0.6 && same(after.camera, before.camera) && after.preset === null, `${after.theta}`);
    checkMath(after, 'after the θ drag');
  }
  const t0 = (await state()).theta;
  await page.locator('#sliceHandle').focus(); await page.keyboard.press('ArrowRight'); await settle(page);
  const k = await state();
  check('θ handle: → raises θ by 0.5°', near(k.theta, t0 + 0.5, 1e-9), `${t0} → ${k.theta}`);
}

/* ---------- drawer, playback ---------- */
await page.click('#infoBtn'); await settle(page);
check('info button opens the theory drawer', await page.locator('#drawer [role="dialog"]').isVisible());
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').isHidden());
check('play advances the rail', await playsAfter(page, () => page.locator('#play').evaluate((b) => b.click()), () => window.UNIFORM_SLICE_DEBUG.state));
await pause();
{ const a = await state(); await settle(page); const b = await state(); check('pause holds the clock', !a.playing && a.t === b.t); }
for (const card of Object.keys(CARDS)) {
  check(`card ${card}: a click plays its story`, await playsAfter(page, () => page.click(`[data-preset="${card}"]`), () => window.UNIFORM_SLICE_DEBUG.state));
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
  check(`still ${lang}/${card}: paused on the declared frame, no handle`, s.preset === card && !s.playing && near(s.t, stillT(card), 1e-12) && await p.locator('#sliceHandle').isHidden()
    && await p.evaluate(() => TRV.still && TRV.shot && document.documentElement.dataset.trPalette === undefined));
  if (card === 'isotropic-singlet-ontology') check(`still ${lang}/${card}: the sea at θ = 36°, ½ everywhere`, s.lens === 'sea' && s.shown.flat === 0.5 && near(s.theta, 36, 1e-12));
  if (card === 'tilted-slice-moire-emergence') check(`still ${lang}/${card}: θ = 36°, L_M = 1.618a`, (s.frame.LM / A).toFixed(3) === '1.618' && s.lens === 'slice');
  if (card === 'phase-sweep-motionless-flow') check(`still ${lang}/${card}: φ = 90°, shift 0.405a`, near(s.phiDeg, 90, 1e-9) && (s.shift / A).toFixed(3) === '0.405');
  if (card === 'orthogonal-dark-sector-clock-load') check(`still ${lang}/${card}: dτ/dt = 0.8660, I_EM = 0`, s.dtdt.toFixed(4) === '0.8660' && Math.abs(s.leanInstances.pinching.IEM) < 1e-15);
  if (card === 'horizon-aperture-homogenization') check(`still ${lang}/${card}: W = 20, contrast 0.0486`, s.W === 20 && s.contrast.toFixed(4) === '0.0486');
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
