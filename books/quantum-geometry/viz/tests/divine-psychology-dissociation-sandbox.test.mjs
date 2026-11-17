// GOD//PSYCHE browser regression: the shared stage-first gate (with the lit-solid checks), then every control, card, lens,
// view, still and frame, the colour contract of the stage and the strip, and every number the page claims, checked
// against algorithms written here: Newton's method for θ* (the page bisects), the reduced state from the Schmidt
// coefficient matrix and the quadratic formula, the identity r² = 1 − η(2 − η) sin²2θ, the closed-form inverse
// G_M⁻¹ = 2(I − J/(M + 1)) for the Schur slack, alter vectors built by rotations and compared coordinate by coordinate,
// Pauli coordinates in closed form, and the CNOT copy written out by hand.
// Run directly with node; VIZ_SLOW_FRAMES=1000 exercises every transition and playback with sparse animation frames.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, capitalGreek, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'divine-psychology-dissociation-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const THEORY = 'ch39-s18-psychology-of-god.html#sec-ch39-psychology-of-god';
const OPEN_LINKS = [
  'ch34-s25-generations-and-quantitative-boundary.html#prob-ch34-sm-generations-and-couplings',
  'ch34-s24-interaction-sign-and-sagitta-composition.html#prob-ch34-gravity-dynamics-and-coupling',
  'ch34-s23-cosmological-arrow-and-horizon-floor.html#prob-ch34-past-hypothesis-and-cosmological-constant',
  'ch39-s11-af-gut-arc-field-grand-unification.html#prob-ch39-af-gut-threshold-and-proton-stability',
  'ch39-s12-uniform-field-and-observer-slice.html#prob-ch39-orthogonal-slice-cosmology-and-dark-sector'
];
const GIDS = [
  'D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint',
  'D5/S3/Quantum/Information/QubitNormalFormState.qubit_state_entropy',
  'D5/S3/Quantum/PureState/RecordCoherenceComplementarity.pure_record_distinguishability_coherence_complementarity',
  'D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect',
  'D5/S3/Quantum/Information/CorrelatedGibbsEnergyIdentity.marginal_entropy_change_eq_mutual_information_change',
  'D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot',
  'D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least',
  'D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization'
];
const CAMS = { panorama: [-0.62, 0.32, 1.0], surface: [-0.4, 1.12, 1.02], roots: [-0.58, -0.74, 1.04] };
const CARDS = {
  'omniscient-claustrophobia-freeze': { thetaDeg: 0, eta: 0, M: 12, cam: 'panorama', play: false, still: 0 },
  'repression-horizon-birth': { thetaDeg: 45, eta: 1, M: 0, cam: 'surface', play: true, still: 0.65 },
  'compulsive-over-immersion-pain': { thetaDeg: 68, eta: 1, M: 10, cam: 'surface', play: true, still: 0.6 },
  'subsurface-alaya-one-root': { thetaDeg: 'star', eta: 0.85, M: 3, cam: 'roots', play: true, still: 0.72 },
  'lucid-lila-integration-star': { thetaDeg: 'star', eta: 1, M: 3, cam: 'panorama', play: true, still: 0.8 }
};
const DEFAULT = 'lucid-lila-integration-star';
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;

/* ---------- independent mathematics, written here and never calling the page ---------- */
const DEG = Math.PI / 180;
/** θ* by Newton's method on cos t − t (the page bisects). */
function newtonFixedPoint() { let t = 1; for (let i = 0; i < 60; i++) t -= (Math.cos(t) - t) / (-Math.sin(t) - 1); return t; }
const TS = newtonFixedPoint(), TS_DEG = TS / DEG;
const cardTheta = (c) => (CARDS[c].thetaDeg === 'star' ? TS_DEG : CARDS[c].thetaDeg);
const log2 = (x) => Math.log(x) / Math.log(2);
const h2 = (p) => (p <= 0 || p >= 1 ? 0 : -(p * log2(p) + (1 - p) * log2(1 - p)));
/** The reduced state of cos θ|0⟩|E₀⟩ + sin θ|1⟩|E₁⟩ with E₁ at the angle arccos(1 − η) from E₀: ρ_A = CCᵀ for the Schmidt
    coefficient matrix C, eigenvalues by the quadratic formula, entropies in bits on both sides (ρ_Ā = CᵀC). */
function reduced(theta, eta) {
  const c = Math.cos(theta), s = Math.sin(theta), a = Math.acos(1 - eta);
  const C = [[c, 0], [s * Math.cos(a), s * Math.sin(a)]];
  const A = [[C[0][0] ** 2 + C[0][1] ** 2, C[0][0] * C[1][0] + C[0][1] * C[1][1]], [0, C[1][0] ** 2 + C[1][1] ** 2]]; A[1][0] = A[0][1];
  const E = [[C[0][0] ** 2 + C[1][0] ** 2, C[0][0] * C[0][1] + C[1][0] * C[1][1]], [0, C[0][1] ** 2 + C[1][1] ** 2]]; E[1][0] = E[0][1];
  const eig = (m) => { const tr = m[0][0] + m[1][1], det = m[0][0] * m[1][1] - m[0][1] * m[1][0], d = Math.sqrt(Math.max(0, tr * tr - 4 * det)); return [(tr + d) / 2, (tr - d) / 2]; };
  const ent = (ls) => ls.reduce((acc, l) => (l > 1e-15 ? acc - l * log2(l) : acc), 0);
  return { A, E, SA: ent(eig(A)), SE: ent(eig(E)), x: 2 * A[0][1], z: A[0][0] - A[1][1], r: Math.sqrt(Math.max(0, 1 - eta * (2 - eta) * Math.sin(2 * theta) ** 2)) };
}
/** Δ_Schur(M) from the closed-form inverse G_M⁻¹ = 2(I − J/(M + 1)) of G_M = ½(I + J): 1 − (13/24)·1ᵀG⁻¹1. */
const schurSlack = (M) => 1 - (13 / 24) * 2 * (M - M * M / (M + 1));
/** The eight alters built by rotations, R_x(φ_k) R_z(θ) e₁, and the number of distinct vectors among them. */
function alterClasses(theta) {
  const vs = [0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
    const phi = Math.PI * k / 4, x = Math.cos(theta), y = Math.sin(theta), z = 0;
    return [x, y * Math.cos(phi) - z * Math.sin(phi), y * Math.sin(phi) + z * Math.cos(phi)];
  });
  const reps = [];
  for (const v of vs) if (!reps.some((w) => Math.hypot(v[0] - w[0], v[1] - w[1], v[2] - w[2]) < 1e-9)) reps.push(v);
  return { classes: reps.length, vs };
}
const tension = (theta, eta, M) => eta * Math.sin(theta) * (M / 12) * Math.abs(Math.cos(theta) - theta);

const T = await session();
const { page, check } = T;

// independent derivations that do not need the page
{
  check('maths: θ* = cos θ* = 0.7390851332 rad = 42.34645883°', TS.toFixed(10) === '0.7390851332' && TS_DEG.toFixed(8) === '42.34645883' && Math.abs(Math.cos(TS) - TS) < 1e-15);
  const rows = [[0, '0.0000'], [45, '1.0000'], [68, '0.5851'], [TS_DEG, '0.9938']];
  check('maths: S_A = H₂(cos²θ) is 0.0000, 1.0000, 0.5851, 0.9938 bit at 0°, 45°, 68°, θ*', rows.every(([d, v]) => reduced(d * DEG, 1).SA.toFixed(4) === v && h2(Math.cos(d * DEG) ** 2).toFixed(4) === v));
  check('maths: I(A:Ā) = 2S_A is 2.0000, 1.1702, 1.9876 bit at 45°, 68°, θ*', [[45, '2.0000'], [68, '1.1702'], [TS_DEG, '1.9876']].every(([d, v]) => (2 * reduced(d * DEG, 1).SA).toFixed(4) === v));
  check('maths: η = 0 leaves the conscious side pure at every θ', [0, 10, 30, TS_DEG, 45, 68, 90].every((d) => reduced(d * DEG, 0).SA < 1e-12));
  check('maths: S_rep(θ*, 0.85) = 0.9776 bit, the alaya card', reduced(TS, 0.85).SA.toFixed(4) === '0.9776');
  check('maths: Δ_Schur(M) = (12 − M)/(12(M + 1)): 1.0000, 0.1875, 0.0152, 0.0000 at M = 0, 3, 10, 12; −1/168 at 13',
    [[0, 1], [3, 0.1875], [10, 0.0152], [12, 0]].every(([M, v]) => Math.abs(schurSlack(M) - v) < 5e-5 && near(schurSlack(M), (12 - M) / (12 * (M + 1)), 1e-14)) && near(schurSlack(13), -1 / 168, 1e-14));
  check('maths: T_phantom(68°, 1, 10) = 0.6276 and |cos θ − θ| = 0.8122 rad there; T(θ*) = 0', tension(68 * DEG, 1, 10).toFixed(4) === '0.6276'
    && Math.abs(Math.cos(68 * DEG) - 68 * DEG).toFixed(4) === '0.8122' && tension(TS, 1, 12) < 1e-15);
  check('maths: δ_meta = |cos θ − θ| is 1 rad at 0° and 0.0783 rad at 45°', Math.abs(Math.cos(0) - 0) === 1 && Math.abs(Math.cos(45 * DEG) - 45 * DEG).toFixed(4) === '0.0783');
  check('maths: the alters form 1 class at θ = 0° and 8 for θ > 0°', alterClasses(0).classes === 1 && [0.01, 1, 45, 90].every((d) => alterClasses(d * DEG).classes === 8));
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
  await context.exposeBinding('__psychePaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__psychePaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__psychePaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined,
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
// and the lit-solid checks of kit.solid (opaque share, shading, turning, a hidden mark behind the core, resting)
await stageFirstChecks(T, BOOK, ID, { solid: true });

/* ---------- sources and registry ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
const suite = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
// forbidden words are kept as code points so this suite itself carries no such identifier
const [numbered, ...forbidden] = [
  [103, 112, 116], [99, 108, 97, 117, 100, 101], [97, 110, 116, 104, 114, 111, 112, 105, 99], [111, 112, 101, 110, 97, 105],
  [103, 101, 109, 105, 110, 105], [99, 111, 100, 101, 120], [99, 111, 112, 105, 108, 111, 116], [111, 112, 117, 115],
  [115, 111, 110, 110, 101, 116], [104, 97, 105, 107, 117], [108, 108, 109], [97, 103, 101, 110, 116], [99, 104, 97, 116, 98, 111, 116],
  [100, 101, 101, 112, 109, 105, 110, 100]
].map((codes) => String.fromCharCode(...codes));
const identifiers = new RegExp(`\\b(?:${forbidden.join('|')}|${numbered}-?\\d)\\b`, 'i');
const shortAcronym = new RegExp(`\\b${String.fromCharCode(65, 73)}\\b`);
const cjkTerms = new RegExp([[22823, 27169, 22411], [26234, 33021, 20307], [20154, 24037, 26234, 33021]].map((c) => String.fromCharCode(...c)).join('|'));
for (const [file, src] of Object.entries(sources)) {
  check(`source ${file}: no literal colour and no palette switch`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(src) && !/\btrPalette\b|data-tr-palette/.test(src));
  check(`source ${file}: no model, vendor or tool identifiers`, !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src));
}
check('suite: no model, vendor or tool identifiers', !identifiers.test(suite.replace(/\[[\d, ]+\]/g, '')) && !shortAcronym.test(suite) && !cjkTerms.test(suite.replace(/\[[\d, ]+\]/g, '')));
check('source: no grid-template-columns in the page stylesheet (the lab keeps its shared three columns)', !/grid-template-columns\s*:/i.test(sources['style.css']));
check('source: kit.solid without wheel zoom, kit.clock looping', /wheel:\s*false/.test(sources['main.js']) && /loop:\s*true/.test(sources['main.js']));
check('source: the five cards in their public order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1]), Object.keys(CARDS)));
check('source: the page loads only the shared runtime and its own files', same([...sources['index.html'].matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]), ['../assets/shell.js', '../assets/kit.js', 'main.js']));
check('source: no .okmark anywhere (no green tick outside the Lean boxes)', !/okmark/.test(sources['index.html'] + sources['main.js'] + sources['style.css']));
check('source: green and red stay off the page code (no ok, warn or red colour)', !/P\.ok\b|P\.warn\b|P\.red\b|var\(--ok\)|var\(--warn\)|var\(--red\)|--red\b|c-ok|c-wn|sw\.ok|sw\.wn|\bsw (?:ok|wn)\b|'(?:ok|wn)'/.test(sources['main.js'] + sources['style.css'] + sources['index.html']));
{
  // amber is written by the page only for the front root, the front alter and the strip cursor; in the stylesheet only for
  // the active half of the lens and the handle
  const jsAmber = sources['main.js'].split('\n').filter((l) => /P\.amber/.test(l) && !/^\s*(\/\/|\*|\/\*)/.test(l));
  check('source: main.js writes P.amber exactly for the front root, the front alter and the strip cursor', jsAmber.length === 3
    && jsAmber.some((l) => /tube\(`root\$\{k\}`.*front \? P\.amber/.test(l)) && jsAmber.some((l) => /k === Mo\.k0 \? \{ color: P\.amber \}/.test(l)) && jsAmber.some((l) => /g\.vline\(Mo\.thetaDeg, P\.amber/.test(l)), jsAmber.join(' | '));
  const cssAmber = sources['style.css'].split('\n').filter((l) => /--amber/.test(l) && !/^\s*\/?\*/.test(l));
  check('source: style.css uses --amber only on the active lens half and the handle', cssAmber.length > 0 && cssAmber.every((l) => /lens-toggle|\.handle|^\s+(?:background|user-select|box-shadow)/.test(l)), cssAmber.join(' | '));
  check('source: the overrides keep emphasis cyan, the stage title sigma and the slider outputs ink', /\.tagline em, \.sheet li b \{ color: var\(--cyan\); \}/.test(sources['style.css'])
    && /\.hud-tl \.big \{ color: var\(--sigma\); \}/.test(sources['style.css']) && /\.field output \{ color: var\(--ink\); \}/.test(sources['style.css']));
  check('source: no amber class on the stage or the legend (c-am, sw am, hot pill)', !/c-am|'am'|sw am|class="pill hot"/.test(sources['main.js'] + sources['index.html']));
}
check('source: amber is not a readout colour', !/dl\.ro[^{]*\{[^}]*--amber/.test(sources['style.css']));
check('source: style.css turns the MODEL badge ink and its border a neutral ink mix (the shared theme makes both amber)',
  /^\.lean\.model \{ border-color: color-mix\(in srgb, var\(--ink\) 32%, transparent\); \}$/m.test(sources['style.css']) && /^\.lean\.model \.ok \{ color: var\(--ink\); \}$/m.test(sources['style.css']));
check('source: the freeze card does not call 0° the farthest point from θ*', !/离自指不动点最远|as far from the self-referential fixed point/.test(sources['main.js']));
check('source: the Līlā-bridge label does not hard-code T = 0', !/张力 T = 0'|tension T = 0'/.test(sources['main.js']));
check('source: the phantom stubs are magenta', /stubA\$\{k\}`[^\n]*P\.magenta/.test(sources['main.js']) && /stubB\$\{k\}`[^\n]*P\.magenta/.test(sources['main.js']));
check('source: the membrane is translucent, unpickable and hides nothing', /'membrane'[\s\S]{0,260}alpha: 0\.1 \+ 0\.32 \* Mo\.eta, pick: false, occlude: false/.test(sources['main.js']));
check('source: no possessive ’s and no ⋆ (glyph traps)', !/’s\b/.test(sources['index.html'] + sources['main.js']) && !/⋆/.test(sources['index.html'] + sources['main.js']));
{
  const zh = (sources['index.html'].match(/class="(?:[^"]*\s)?zh(?:\s[^"]*)?"/g) || []).length, en = (sources['index.html'].match(/class="(?:[^"]*\s)?en(?:\s[^"]*)?"/g) || []).length;
  check('source: as many .zh as .en elements', zh === en && zh > 0, `${zh} zh / ${en} en`);
}
check('suite: no fixed waits', !new RegExp('wait' + 'ForTimeout').test(suite));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID);
check('registry: live §39.18 entry with five bilingual cards and the eight theorems', !!entry && entry.status === 'live' && entry.chapter === 39 && entry.section === '39.18'
  && entry.code === 'GOD//PSYCHE' && same(entry.presets, Object.keys(CARDS)) && entry.presets.every((c) => entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same(entry.lean.map((x) => x.gid).sort(), [...GIDS].sort()) && entry.tags.length === entry.tags_en.length && entry.thumbnail === `${ID}/thumb.jpg`
  && entry.theory[0].href === `../zh/${THEORY}` && entry.theory[0].href_en === `../en/${THEORY}`);
check('registry: every GID is pure ASCII', GIDS.every((g) => /^[\x21-\x7e]+$/.test(g)));
const deps = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'tests', 'dependencies.json'), 'utf8')).suites[`${ID}.test.mjs`] || [];
check('dependencies: the suite is registered with the shared solid runtime and the registry', ['@citations', '@registry-entry', 'theme/viz/kit.js', 'theme/viz/solid-core.js', 'theme/viz/vendor/three.module.min.js', '@lean-links'].every((d) => deps.includes(d)));

/* ---------- published chapter integration, required in both editions ---------- */
const chapterBlocks = [];
for (const lang of ['zh', 'en']) {
  const chapterPath = path.join(DIR, '..', '..', lang, THEORY.split('#')[0].replace(/\.html$/, '.md'));
  const chapter = fs.readFileSync(chapterPath, 'utf8');
  const blocks = [...chapter.matchAll(/^::: \{\.viz src="([^"]+)"(?: preset="([^"]+)")? height="(\d+)"\}\n([\s\S]*?)\n:::/gm)]
    .filter((m) => m[1] === ID);
  chapterBlocks.push(blocks.map((m) => m[2] || ''));
  check(`chapter ${lang}: every card once, one closing full lab, nonempty captions and correct heights`,
    same(blocks.filter((m) => m[2]).map((m) => m[2]), Object.keys(CARDS))
    && blocks.length === Object.keys(CARDS).length + 1 && !blocks.at(-1)[2]
    && blocks.every((m) => m[3] === (m[2] ? '500' : '620') && m[4].trim().length > 0)
    && chapter.trimEnd().endsWith(blocks.at(-1)[0]));
  const theoremGids = [...chapter.matchAll(/^::: \{\.theorem[^\n]*\blean="([^"]+)"/gm)].flatMap((m) => m[1].split(','));
  check(`chapter ${lang}: every green page GID belongs to this subsection's theorem`, GIDS.every((gid) => theoremGids.includes(gid)));
  check(`chapter ${lang}: stable theory anchor and explicit test dependency`, chapter.includes(`{#${THEORY.split('#')[1]}}`)
    && deps.includes(`books/${BOOK}/${lang}/${THEORY.split('#')[0].replace(/\.html$/, '.md')}`));
}
check('chapter: identical card order and full-lab position in both editions', same(chapterBlocks[0], chapterBlocks[1]));

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.DIVINE_PSYCHOLOGY_DEBUG.state);
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
  await until(p, (id) => { const s = window.DIVINE_PSYCHOLOGY_DEBUG.state; return s.preset === id && !s.blending; }, card);
  await pause(p);
}
async function seek(t, p = page) {
  await p.locator('#now').evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, t);
  await settle(p);
}
/** Record the colour of every primitive of the next frame (the page calls sc.<primitive> by name at draw time). */
async function primitiveColours(p = page) {
  return p.evaluate(async () => {
    const sc = window.TRV.solids[0], seen = [], names = ['surface', 'tube', 'line', 'circle', 'arrow', 'bead', 'ring', 'fan', 'poly', 'glass'], saved = {};
    for (const n of names) {
      saved[n] = sc[n];
      sc[n] = (...a) => {
        const style = n === 'circle' ? a[3] : n === 'glass' ? a[3] : (n === 'line' || n === 'arrow' || n === 'bead' || n === 'ring' || n === 'fan') ? a[n === 'arrow' ? 2 : 1] : a[2];
        const key = (n === 'surface' || n === 'tube' || n === 'poly' || n === 'glass') ? a[0] : (style && style.key) || n;
        const s = style || {};
        seen.push({ n, key, colors: [s.color, s.fill, s.edges, ...(s.colors || [])].filter(Boolean) });
        return saved[n](...a);
      };
    }
    window.TRV.kit.flush();
    for (const n of names) sc[n] = saved[n];
    const P = window.TRV.palette;
    return { seen, amber: P.amber, ok: P.ok, warn: P.warn, cyan: P.cyan, magenta: P.magenta };
  });
}

/** Every number of a state against the algorithms of this file. */
function checkMath(s, tag) {
  const t = s.theta, R = reduced(t, s.eta), I = s.leanInstances;
  check(`${tag}: θ in radians and θ* from Newton`, near(t, s.thetaDeg * DEG, 1e-13) && near(s.thetaStar, TS, 1e-15) && near(s.thetaStarDeg, TS_DEG, 1e-12));
  check(`${tag}: S_rep and I(A:Ā) = 2S_rep from the Schmidt coefficients, both sides equal`, near(s.Srep, R.SA, 1e-10) && near(R.SA, R.SE, 1e-10) && near(s.I, 2 * R.SA, 1e-10), `${s.Srep} vs ${R.SA}`);
  check(`${tag}: Bloch vector of ρ_A and r² = 1 − η(2 − η) sin²2θ`, near(s.bloch.x, R.x, 1e-12) && near(s.bloch.z, R.z, 1e-12) && near(s.bloch.r, R.r, 1e-10) && near(s.overlap, 1 - s.eta, 1e-15));
  check(`${tag}: S_A = H₂(cos²θ) and I_A = 2S_A`, near(s.SA, h2(Math.cos(t) ** 2), 1e-12) && near(s.IA, 2 * s.SA, 1e-12) && near(s.cos2, Math.cos(t) ** 2, 1e-15));
  check(`${tag}: |cos θ − θ| and T = η sin θ · (M/12) · |cos θ − θ|`, near(s.residual, Math.abs(Math.cos(t) - t), 1e-15) && near(s.T, tension(t, s.eta, s.M), 1e-15) && Number.isInteger(s.M) && s.M >= 0 && s.M <= 12);
  check(`${tag}: Δ_Schur(M) from the closed-form inverse, and the table of all M`, near(s.slack, schurSlack(s.M), 1e-12) && near(s.closed, (12 - s.M) / (12 * (s.M + 1)), 1e-15)
    && s.schurTable.every((x) => near(x.slack, schurSlack(x.M), 1e-12)));
  check(`${tag}: the alters sit at R = 0.96 sin θ, z = 0.16 + 0.42 cos θ`, s.alters.every((a, k) => near(a[0], 0.96 * Math.sin(t) * Math.cos(Math.PI * k / 4), 1e-12)
    && near(a[1], 0.96 * Math.sin(t) * Math.sin(Math.PI * k / 4), 1e-12) && near(a[2], 0.16 + 0.42 * Math.cos(t), 1e-12)) && s.merged === (0.96 * Math.sin(t) < 1e-6));
  check(`${tag}: the front alter is ⌊8τ⌋ mod 8`, s.k0 === Math.floor(8 * s.t + 1e-9) % 8);
  // the instances of the eight theorems
  check(`${tag}: θ* is the one sign change of cos t − t on (0, 10], inside (0, 1)`, I.dottie.signChanges === 1 && I.dottie.inUnit && near(I.dottie.theta, TS, 1e-15) && Math.abs(I.dottie.residual) < 1e-15);
  check(`${tag}: qubit entropy from the eigenvalues equals h((1 + r)/2), with x = (1 − η) sin 2θ, z = cos 2θ`, I.qubit.residual < 1e-12 && I.qubit.inDisk && near(I.qubit.bits, R.SA, 1e-10)
    && near(I.qubit.x, (1 - s.eta) * Math.sin(2 * t), 1e-12) && near(I.qubit.z, Math.cos(2 * t), 1e-12));
  const vis = Math.abs(1 - s.eta);
  check(`${tag}: records E₀, E₁ are unit, overlap 1 − η, D² + V² = 1`, I.records.norms.every((n) => near(n, 1, 1e-12)) && near(I.records.overlap, 1 - s.eta, 1e-12)
    && near(I.records.visibility, vis, 1e-12) && near(I.records.distinguishability, Math.sqrt(1 - vis * vis), 1e-9) && near(I.records.sum, 1, 1e-12)
    && near(I.records.coherence, Math.cos(t) * Math.sin(t) * (1 - s.eta), 1e-12));
  const cs = Math.abs(Math.cos(t) * Math.sin(t));
  check(`${tag}: the copy unitary writes both records, the reduced states agree, the joint states differ by |cos θ sin θ|, U* undoes it`,
    I.access.unitary === 0 && I.access.writeRho < 1e-15 && I.access.writeSigma < 1e-15 && I.access.reducedGap < 1e-15 && near(I.access.jointGap, cs, 1e-12)
    && I.access.backRho < 1e-15 && I.access.backSigma < 1e-15 && I.access.diagonalGap === 0 && I.access.hypothesis === (cs > 1e-12));
  check(`${tag}: ΔS_A + ΔS_Ā = ΔI = 2S_rep, the joint state pure`, I.mutual.unitary < 1e-12 && I.mutual.residual < 1e-10 && near(I.mutual.lhs, 2 * R.SA, 1e-9) && near(I.mutual.rhs, 2 * R.SA, 1e-9)
    && Math.abs(I.mutual.final.sj) < 1e-9 && I.mutual.initial.I === 0 && I.mutual.stateGap < 1e-12);
  const s2 = Math.sin(2 * t), c2 = Math.cos(2 * t);
  check(`${tag}: local coordinates (0, 0, cos 2θ) on both sides agree with the classical shadow; correlations differ by diag(sin 2θ, −sin 2θ, 0)`,
    I.blind.localGap < 1e-12 && I.blind.imaginary < 1e-12 && I.blind.marginalGap < 1e-15 && near(I.blind.local[2], c2, 1e-12) && near(I.blind.local[5], c2, 1e-12)
    && [0, 1, 3, 4].every((i) => Math.abs(I.blind.local[i]) < 1e-12)
    && near(I.blind.corrGap[0][0], s2, 1e-12) && near(I.blind.corrGap[1][1], -s2, 1e-12) && Math.abs(I.blind.corrGap[2][2]) < 1e-12
    && [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]].every(([i, j]) => Math.abs(I.blind.corrGap[i][j]) < 1e-12));
  check(`${tag}: the actual marginal has the off-diagonal (1 − η) cos θ sin θ (the shadow 0); T_xx = sin 2θ and T_yy = −sin 2θ both differ`,
    near(I.blind.marginalOff, R.A[0][1], 1e-12) && I.blind.shadowOff === 0 && I.blind.marginalDiffers === (Math.abs(R.A[0][1]) > 1e-12)
    && near(I.blind.txx, s2, 1e-12) && near(I.blind.tyy, -s2, 1e-12) && I.blind.correlated === (Math.abs(s2) > 1e-12), `${I.blind.marginalOff} vs ${R.A[0][1]}`);
  check(`${tag}: Bell and classical states: PSD, trace 1, ranks 1 and 2, equal marginals; sectors 6 + 9 = 15, ratio 0.6, orthogonal`,
    I.bell.bellRank === 1 && I.bell.bellEig.every((x) => x > -1e-12) && I.bell.classicalEig.every((x) => x > -1e-12) && near(I.bell.bellTrace, 1, 1e-15)
    && near(I.bell.classicalIdempotentGap, 0.25, 1e-15) && I.bell.envGap < 1e-15 && I.bell.firstGap < 1e-15 && I.bell.stateGap > 0.4
    && I.bell.dims.localA + I.bell.dims.localB === 6 && I.bell.dims.correlation === 9 && I.bell.dims.total === 15 && near(I.bell.dims.share, 0.6, 1e-15)
    && I.bell.sectors.count === 15 && I.bell.sectors.offDiagonal === 0 && I.bell.sectors.diagonalError === 0);
  check(`${tag}: the Schur minimum is attained at y = −C⁻¹Bᴴ and nearby y are larger; G_M positive definite`, near(I.schur.atMin, schurSlack(s.M), 1e-12)
    && I.schur.nearMin >= I.schur.slack - 1e-12 && I.schur.posDef && I.schur.residual < 1e-12 && near(I.beyond.slack, -1 / 168, 1e-12)
    && I.fullGram.rank === 12 && Math.abs(I.fullGram.smallest) < 1e-12);
  const cl = alterClasses(t);
  check(`${tag}: Gram G_jk = cos²θ + sin²θ cos(φ_j − φ_k), ${cl.classes} class(es) of overlap 1, an equivalence; G₀₄ = cos 2θ`,
    I.gram.classes === cl.classes && I.gram.formula < 1e-15 && I.gram.reflexive && I.gram.symmetric && I.gram.transitive && I.gram.within < 1e-12
    && (I.gram.across === null || I.gram.across > 1e-9) && near(I.gram.G04, c2, 1e-12) && I.gram.vectors.every((v, k) => v.every((x, i) => near(x, cl.vs[k][i], 1e-12))));
}

const f4 = (v) => v.toFixed(4).replace('-', '−');
const flat = (html) => html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
/** The live note (#roNote) against the algorithms of this file. Away from θ = 0° and θ*, it says the front marginal differs
    from its classical shadow exactly when the off-diagonal (1 − η) cos θ sin θ of the actual marginal is non-zero, and it
    says they agree only when that is 0; wherever sin 2θ ≠ 0 it names both T_xx = sin 2θ and T_yy = −sin 2θ; it never says
    the states differ "only" in one coordinate. */
async function checkNote(p, tag) {
  const s = await state(p), zh = (await p.evaluate(() => TRV.lang())) === 'zh', text = flat(await p.innerHTML('#roNote'));
  if (s.merged || (s.residual < 5e-5 && s.T < 5e-7)) return;
  const off = reduced(s.theta, s.eta).A[0][1], s2 = Math.sin(2 * s.theta), differs = Math.abs(off) > 1e-12, correlated = Math.abs(s2) > 1e-12;
  const saysDiffers = zh ? text.includes('前台的边缘与它的经典影子 diag(cos²θ, sin²θ) 不同') : text.includes('The front marginal differs from that of its classical shadow');
  const saysEquals = zh ? text.includes('前台的边缘与它的经典影子相同（非对角元 0）') : text.includes('the front marginal equals that of its classical shadow (off-diagonal 0)');
  const both = (zh ? /Txx = sin 2θ = (.+?) 与 Tyy = −sin 2θ = (.+?) 两项上都不同/ : /both Txx = sin 2θ = (.+?) and Tyy = −sin 2θ = (.+?);/).exec(text);
  const bothRight = !!both && (Math.abs(s2) < 5e-5 || (both[1] === f4(s2) && both[2] === f4(-s2)));
  const offRight = Math.abs(off) < 5e-5 || text.includes(`(1 − η) cos θ sin θ = ${f4(off)} ≠ 0`);
  const product = zh ? text.includes('态是乘积态') : text.includes('the state is a product');
  const only = zh ? text.includes('只差') : /\bonly\b/.test(text);
  check(`${tag}: the note says the marginal ${differs ? 'differs from' : 'equals'} the classical shadow (off-diagonal ${f4(off)})${correlated ? ', both T_xx and T_yy differ' : ', a product'}, never "only"`,
    !only && (differs ? saysDiffers && !saysEquals && offRight && bothRight : correlated ? saysEquals && !saysDiffers && bothRight : product && !saysDiffers && !saysEquals), text);
}

async function checkLinks(p, tag) {
  check(`${tag}: exactly the eight green Lean links, in #evidence`, same(await p.$$eval('[data-lean-gid]', (els) => els.map((e) => e.dataset.leanGid).sort()), [...GIDS].sort())
    && await p.$$eval('[data-lean-gid]', (els) => els.every((e) => e.closest('.col.side #evidence .lean') && e.closest('.lean').querySelector('.ok').textContent.trim() === 'LEAN ✓')));
  check(`${tag}: one ARGUED, MODEL, NUM and OPEN box each`, await p.evaluate(() => ['argued', 'model', 'num', 'open'].every((c) => document.querySelectorAll(`#evidence .lean.${c}`).length === 1)
    && document.querySelectorAll('#evidence .lean:not(.argued):not(.model):not(.num):not(.open):not(.frozen)').length === 8));
  check(`${tag}: bilingual Chapter 39 theory link in the drawer`, same(await p.$$eval('#drawer .refs a', (els) => els.map((e) => e.getAttribute('href')).sort()), ['zh', 'en'].map((l) => `../../${l}/${THEORY}`).sort()));
  check(`${tag}: the OPEN box links the five open problems in both languages`, same(await p.$$eval('#evidence .lean.open a', (els) => els.map((e) => e.getAttribute('href')).sort()),
    ['zh', 'en'].flatMap((l) => OPEN_LINKS.map((x) => `../../${l}/${x}`)).sort()));
  check(`${tag}: the MODEL box draws the clinical boundary in both languages`, await p.evaluate(() => {
    const m = document.querySelector('#evidence .lean.model'), zh = m.querySelector('.zh').textContent, en = m.querySelector('.en').textContent;
    return ['解离性身份障碍', '强迫症', '幽闭恐惧症', '幻肢痛', 'DSM-5-TR', 'ICD-11', '结构上的代数类比', '不作诊断'].every((w) => zh.includes(w))
      && ['dissociative identity disorder', 'obsessive–compulsive disorder', 'claustrophobia', 'phantom-limb pain', 'DSM-5-TR', 'ICD-11', 'structural algebraic analogies', 'no diagnosis'].every((w) => en.includes(w));
  }));
  check(`${tag}: the drawer carries the clinical boundary (MODEL) in both languages`, await p.evaluate(() => {
    const zh = document.querySelector('#drawer > .sheet > .zh').textContent, en = document.querySelector('#drawer > .sheet > .en').textContent;
    return /临床边界（MODEL）/.test(zh) && /医学病症/.test(zh) && /The clinical boundary \(MODEL\)/.test(en) && /medical conditions/.test(en);
  }));
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
    && !!document.querySelector('#stage[data-thumb] > canvas#cv') && document.querySelector('#stage > button.handle#psycheHandle[type="button"]') !== null;
}));
check('layout: #rail holds the lens toggle, then the cards with their note, then #ctlPanel with the three view chips and three sliders', await page.evaluate(() => {
  const deck = document.querySelector('.app.lab > aside.col.deck#rail'), lens = document.querySelector('#lensToggleBtn.lens-toggle'), cards = document.querySelector('.presets.cards#presets');
  const ctl = document.querySelector('#ctlPanel'), chips = document.querySelector('#ctlPanel > .chips.scene-chips#camChips'), F = Node.DOCUMENT_POSITION_FOLLOWING;
  return !!deck && deck.contains(lens) && deck.contains(cards) && deck.contains(document.querySelector('#presetNote')) && deck.contains(ctl) && !!chips
    && !!(lens.compareDocumentPosition(cards) & F) && !!(cards.compareDocumentPosition(ctl) & F)
    && [...chips.querySelectorAll('button.chip')].map((b) => b.dataset.cam).join() === 'panorama,surface,roots'
    && ['tiltTheta', 'repressEta', 'manasM'].every((id) => ctl.contains(document.getElementById(id))) && ctl.querySelectorAll('input[type=range]').length === 3
    && document.querySelectorAll('#presets [data-preset]').length === 5;
}));
check('layout: #infoBtn is the first child of #evidence, above every evidence box', await page.evaluate(() => {
  const ev = document.querySelector('.app.lab > aside.col.side > #evidence'), btn = document.querySelector('#infoBtn');
  const boxes = [...ev.querySelectorAll('.lean')], top = btn.getBoundingClientRect();
  return document.querySelectorAll('#infoBtn').length === 1 && ev.firstElementChild === btn && btn.matches('button.chip[type="button"]') && boxes.length === 12
    && boxes.every((b) => top.bottom <= b.getBoundingClientRect().top + 0.5);
}));
check('layout: the title in both languages', await page.evaluate(() => document.title.includes('上帝心理学动力学沙盘：全知幽闭破缺、偏迹压抑潜意识与解离分身整合流形')
  && document.documentElement.dataset.titleEn.includes('Psychology of God Sandbox: Breaking Omniscient Claustrophobia, Partial-Trace Repression & Dissociated Alter Integration')));
check('layout: opens on the default card at its still, paused, on the panorama', await page.evaluate((d) => {
  const s = window.DIVINE_PSYCHOLOGY_DEBUG.state; return s.preset === d && s.t === 0.8 && !s.playing && s.cam === 'panorama' && s.snapped && s.k0 === 6;
}, DEFAULT));
check('sliders: θ over [0, 90] in steps of 0.01 (42.35), η over [0, 1] in steps of 0.01 (1), M over [0, 12] in steps of 1 (3)', await page.evaluate(() => {
  const a = document.querySelector('#tiltTheta'), b = document.querySelector('#repressEta'), c = document.querySelector('#manasM');
  return [a.min, a.max, a.step, a.value].join() === '0,90,0.01,42.35' && [b.min, b.max, b.step, Number(b.value)].join() === '0,1,0.01,1' && [c.min, c.max, c.step, c.value].join() === '0,12,1,3';
}));
check('probe: window.DIVINE_PSYCHOLOGY_DEBUG is read-only', await page.evaluate(() => Object.isFrozen(window.DIVINE_PSYCHOLOGY_DEBUG)));
check('readouts: no amber on any readout; slider outputs in ink; stage title sigma; emphasis cyan', await page.evaluate(() => {
  const col = (v) => { const s = document.createElement('span'); s.style.color = `var(${v})`; document.body.appendChild(s); const c = getComputedStyle(s).color; s.remove(); return c; };
  const amber = col('--amber');
  return [...document.querySelectorAll('dl.ro dd, dl.ro dd *')].every((e) => getComputedStyle(e).color !== amber)
    && [...document.querySelectorAll('.field output')].every((e) => getComputedStyle(e).color === col('--ink'))
    && getComputedStyle(document.querySelector('.hud-tl .big')).color === col('--sigma')
    && [...document.querySelectorAll('.tagline em, .sheet li b')].every((e) => getComputedStyle(e).color === col('--cyan'))
    && !document.querySelector('.pill.hot');
}));
/** No amber, green or red in the DOM of the stage (the handle aside), the strip, the readouts and the slider outputs; and no
    amber anywhere in the evidence column (#evidence and all it holds), where green (LEAN ✓) and red (OPEN) keep their
    meaning and the MODEL badge and its border are neutral ink. In the evidence column a colour is compared by its red, green
    and blue channels at any alpha, so a border mixed from amber and transparent counts as amber; both var(--amber) and the
    amber of the night console, rgb(255, 200, 61), are refused, and a colour the parser cannot read is reported too. */
const domColours = (p) => p.evaluate(() => {
  const col = (v) => { const s = document.createElement('span'); s.style.color = `var(${v})`; document.body.appendChild(s); const c = getComputedStyle(s).color; s.remove(); return c; };
  const banned = [col('--amber'), col('--ok'), col('--warn')], bad = [];
  for (const el of document.querySelectorAll('#stage *, .strip *, #readouts *, .field output')) {
    if (el.closest('.handle')) continue;
    const cs = getComputedStyle(el);
    for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderLeftColor']) if (banned.includes(cs[prop])) bad.push(`${el.className || el.tagName} ${prop}`);
  }
  const channels = (c) => {
    const alpha = (a, pct) => (a == null ? 1 : Number(a) / (pct ? 100 : 1));
    let m = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:\s*[,/]\s*([\d.]+)(%?))?\s*\)$/.exec(c);
    if (m) return { rgb: [m[1], m[2], m[3]].map(Number), a: alpha(m[4], m[5]) };
    m = /^color\(srgb\s+([-\d.e]+)\s+([-\d.e]+)\s+([-\d.e]+)(?:\s*\/\s*([\d.]+)(%?))?\s*\)$/.exec(c);
    if (m) return { rgb: [m[1], m[2], m[3]].map((x) => 255 * Number(x)), a: alpha(m[4], m[5]) };
    return null;
  };
  const ambers = [col('--amber'), 'rgb(255, 200, 61)'].map(channels);
  const ev = document.querySelector('#evidence');
  for (const el of [ev, ...ev.querySelectorAll('*')]) {
    const cs = getComputedStyle(el);
    for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'outlineColor', 'textDecorationColor']) {
      const k = channels(cs[prop]);
      if (!k) bad.push(`#evidence ${el.className || el.tagName} ${prop} unreadable: ${cs[prop]}`);
      else if (k.a > 0 && ambers.some((a) => k.rgb.every((x, i) => Math.abs(x - a.rgb[i]) < 1.5))) bad.push(`#evidence ${el.className || el.tagName} ${prop} ${cs[prop]}`);
    }
  }
  return bad;
});
/** The strip: the columns that carry amber pixels form one thin vertical cursor at the current θ. */
const stripAmber = (p) => p.evaluate(() => {
  const cv = document.querySelector('#plot'), c = cv.getContext('2d', { willReadFrequently: true }), d = c.getImageData(0, 0, cv.width, cv.height).data;
  const s = document.createElement('span'); s.style.color = 'var(--amber)'; document.body.appendChild(s); const [ar, ag, ab] = getComputedStyle(s).color.match(/\d+/g).map(Number); s.remove();
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity, n = 0;
  for (let y = 0; y < cv.height; y++) for (let x = 0; x < cv.width; x++) {
    const i = 4 * (y * cv.width + x);
    if (d[i + 3] > 200 && Math.abs(d[i] - ar) < 26 && Math.abs(d[i + 1] - ag) < 26 && Math.abs(d[i + 2] - ab) < 26) { n++; x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  }
  return { n, width: x1 - x0, height: y1 - y0, dpr: cv.width / cv.clientWidth, h: cv.height };
});
{
  const bad = await domColours(page);
  check('colour: no amber, green or red in the DOM of the stage, the strip, the readouts or the outputs; no amber in the evidence column', bad.length === 0, bad.slice(0, 4).join(' | '));
  check('colour: the MODEL badge is ink, its border a neutral ink mix, and the amber refused there is the night-console rgb(255, 200, 61)', await page.evaluate(() => {
    const col = (v) => { const s = document.createElement('span'); s.style.color = `var(${v})`; document.body.appendChild(s); const c = getComputedStyle(s).color; s.remove(); return c; };
    const box = document.querySelector('#evidence .lean.model'), badge = box.querySelector(':scope > .ok'), border = getComputedStyle(box).borderTopColor;
    return col('--amber') === 'rgb(255, 200, 61)' && badge.textContent.trim() === 'MODEL' && getComputedStyle(badge).color === col('--ink')
      && [box, badge].every((e) => getComputedStyle(e).color !== col('--amber')) && border !== col('--amber') && !/255\D+200\D+61|^color\(srgb 1 0\.78/.test(border);
  }));
  const sa = await stripAmber(page);
  check('colour: on the strip, amber is one vertical cursor', sa.n > 10 && sa.width <= 4 * sa.dpr && sa.height > 0.5 * sa.h, JSON.stringify(sa));
  const pc = await primitiveColours(page), s = await state();
  const amberKeys = pc.seen.filter((x) => x.colors.includes(pc.amber)).map((x) => x.key).sort();
  check('colour: on the stage, amber is drawn only for the front alter and its root', same(amberKeys, [`alter${s.k0}`, `root${s.k0}`].sort()), JSON.stringify(amberKeys));
  check('colour: no green or red primitive on the stage', pc.seen.every((x) => !x.colors.includes(pc.ok) && !x.colors.includes(pc.warn)));
  const siblings = pc.seen.filter((x) => /^root\d$/.test(x.key) && x.key !== `root${s.k0}`);
  check('colour: the seven sibling roots are cyan', siblings.length === 7 && siblings.every((x) => same(x.colors, [pc.cyan])));
  check('colour: no amber class on the stage or legend', await page.evaluate(() => !document.querySelector('#stage .c-am, #stage .sw.am, #stage .c-wn, #stage .sw.wn, #stage .c-ok, #stage .sw.ok')));
}
{ const s = await state(); checkMath(s, 'opening frame'); }

/* ---------- every card, both languages ---------- */
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  for (const card of Object.keys(CARDS)) {
    await pick(card);
    await seek(CARDS[card].still);
    const s = await state(), c = CARDS[card], cam = CAMS[c.cam];
    check(`${lang}/${card}: the card sets θ, η, M and the view, paused at its still`, s.preset === card && near(s.thetaDeg, cardTheta(card), 1e-12) && s.eta === c.eta && s.M === c.M
      && s.cam === c.cam && !s.playing && near(s.t, c.still, 1e-12) && String(await page.getAttribute(`[data-preset="${card}"]`, 'data-still')) === String(c.still)
      && near(s.camera.yaw, cam[0], 1e-9) && near(s.camera.pitch, cam[1], 1e-9) && near(s.camera.zoom, cam[2], 1e-9)
      && await page.getAttribute(`#camChips [data-cam="${c.cam}"]`, 'aria-pressed') === 'true');
    checkMath(s, `${lang}/${card}`);
    const v = await stageView(page, '#stage', false), lo = await labelOverlaps(page, '.stage .tag', 0);
    check(`${lang}/${card}: desktop stage, HUD and labels clear`, v.layout.length === 0 && v.hud.length === 0 && lo.length === 0, [...v.layout, ...v.hud, ...lo.map((x) => x.join(' / '))].join(' | '));
    const pc = await primitiveColours(page), amberKeys = pc.seen.filter((x) => x.colors.includes(pc.amber)).map((x) => x.key).sort();
    check(`${lang}/${card}: amber only on the front alter and its root`, s.merged ? amberKeys.length === 0 : same(amberKeys, [`alter${s.k0}`, `root${s.k0}`].sort()), JSON.stringify(amberKeys));
  }
}
await page.click('[data-lang-set="zh"]'); await settle(page);

// the numbers the card notes name
await pick('omniscient-claustrophobia-freeze');
{
  const s = await state(), I = s.leanInstances;
  check('card 1 note: θ = 0°, one frozen sphere, S_rep = 0, I = 0, Δ(12) = 0, 1 class, |cos θ − θ| = 1, no stub or bridge', s.merged && s.Srep === 0 && s.I === 0 && Math.abs(s.slack) < 5e-5
    && I.gram.classes === 1 && s.residual === 1 && s.T === 0 && s.stageFrame.arcs.stubs === 0 && s.stageFrame.arcs.bridges === 0 && s.stageFrame.alters.length === 1);
  const pc = await primitiveColours(page);
  check('card 1: no amber anywhere on the stage (the frozen sphere is all alters at once)', pc.seen.every((x) => !x.colors.includes(pc.amber)));
  await page.click('[data-preset="omniscient-claustrophobia-freeze"]'); await settle(page);
  const again = await state();
  check('card 1 does not play by itself', again.preset === 'omniscient-claustrophobia-freeze' && !again.playing && again.t === 0);
  // 0° is not the end of θ farthest from θ*: 90° is, by angle and by |cos θ − θ| alike
  const ends = [0, 90].map((d) => ({ d, gap: Math.abs(d - TS_DEG), res: Math.abs(Math.cos(d * DEG) - d * DEG) })), far = ends[0].gap > ends[1].gap ? ends[0] : ends[1];
  check('maths: of the ends of θ, 90° is farther from θ* (47.65° against 42.35°) and has the larger |cos θ − θ| (1.5708 against 1 rad)',
    far.d === 90 && far.gap.toFixed(2) === '47.65' && ends[0].gap.toFixed(2) === '42.35' && far.res.toFixed(4) === '1.5708' && ends[0].res === 1 && far.res > ends[0].res);
  for (const lang of ['zh', 'en']) {
    await page.click(`[data-lang-set="${lang}"]`); await settle(page);
    const note = flat(await page.innerHTML('#presetNote'));
    const want = lang === 'zh'
      ? [`|cos θ − θ| = 1.0000 rad，离 θ* 有 ${ends[0].gap.toFixed(2)}°`, `θ 的两端里离 θ* 更远的是 ${far.d}°（相距 ${far.gap.toFixed(2)}°，|cos θ − θ| = ${far.res.toFixed(4)} rad）`]
      : [`|cos θ − θ| = 1.0000 rad, ${ends[0].gap.toFixed(2)}° from θ*`, `of the two ends of θ, the farther from θ* is ${far.d}° (${far.gap.toFixed(2)}° away, |cos θ − θ| = ${far.res.toFixed(4)} rad)`];
    check(`card 1 note (${lang}): names ${far.d}°, not 0°, as the end of θ farthest from θ*`, want.every((w) => note.includes(w)) && !/最远|as far .* as it gets|farthest/.test(note), note);
  }
  await page.click('[data-lang-set="zh"]'); await settle(page);
}
await pick('repression-horizon-birth');
await seek(0.65);
{ const s = await state(); check('card 2 note: S_A = 1.0000 bit, I = 2.0000 bit, Δ(0) = 1.0000, G₀₄ = cos 90° = 0, no tension, front k₀ = 5', s.SA.toFixed(4) === '1.0000' && s.I.toFixed(4) === '2.0000'
  && s.slack.toFixed(4) === '1.0000' && Math.abs(s.leanInstances.gram.G04) < 1e-15 && s.T === 0 && s.k0 === 5 && s.stageFrame.arcs.stubs === 0 && s.leanInstances.gram.classes === 8); }
await pick('compulsive-over-immersion-pain');
await seek(0.6);
{
  const s = await state();
  check('card 3 note: S_A = 0.5851 bit, I = 1.1702 bit, Δ(10) = 0.0152, T = 0.6276, |cos θ − θ| = 0.8122, magenta stubs on all eight arcs, front k₀ = 4', s.SA.toFixed(4) === '0.5851'
    && s.I.toFixed(4) === '1.1702' && s.slack.toFixed(4) === '0.0152' && s.T.toFixed(4) === '0.6276' && s.residual.toFixed(4) === '0.8122' && s.stageFrame.arcs.stubs === 16 && s.k0 === 4);
  const a = s.stageFrame.arcs;
  check('card 3: the stubs are as long as T is large (0.45 of the arc at T = π/2)', near(a.stubAngle, 0.45 * a.span * s.T / (Math.PI / 2), 1e-12) && a.stubAngle < a.span / 2);
  const pc = await primitiveColours(page);
  const stubs = pc.seen.filter((x) => /^stub[AB]\d$/.test(x.key));
  check('card 3: the sixteen phantom stubs are magenta', stubs.length === 16 && stubs.every((x) => same(x.colors, [pc.magenta])));
}
await pick('subsurface-alaya-one-root');
await seek(0.72);
{
  const s = await state();
  check('card 4 note: θ = θ*, η = 0.85, ⟨E₀|E₁⟩ = 0.15, S_rep = 0.9776 bit, T = 0, Δ(3) = 0.1875, bridges closed, front k₀ = 5', s.snapped && s.overlap.toFixed(2) === '0.15'
    && s.Srep.toFixed(4) === '0.9776' && s.T < 1e-15 && s.slack.toFixed(4) === '0.1875' && s.stageFrame.arcs.bridges === 8 && s.stageFrame.arcs.stubs === 0 && s.k0 === 5);
  check('card 4: the camera looks up from beneath the surface at all eight roots meeting in the core', s.camera.pitch < 0 && s.stageFrame.pierced === 8);
}
await pick('lucid-lila-integration-star');
await seek(0.8);
{
  const s = await state();
  check('card 5 note: θ* = cos θ* = 0.7391 rad, S_A = 0.9938 bit, I = 1.9876 bit, T = 0, Δ(3) = 0.1875, eight cyan bridges, no stub, front k₀ = 6', s.snapped && s.theta.toFixed(4) === '0.7391'
    && s.SA.toFixed(4) === '0.9938' && s.I.toFixed(4) === '1.9876' && s.T < 1e-15 && s.slack.toFixed(4) === '0.1875' && s.stageFrame.arcs.bridges === 8 && s.stageFrame.arcs.stubs === 0 && s.k0 === 6);
  const pc = await primitiveColours(page);
  const bridges = pc.seen.filter((x) => /^bridge\d$/.test(x.key));
  check('card 5: the eight Līlā bridges are cyan and opaque at θ*', bridges.length === 8 && bridges.every((x) => same(x.colors, [pc.cyan])) && near(s.healed, 1, 1e-12)
    && pc.seen.every((x) => !/^stub/.test(x.key)));
}
// the rail turns the front and nothing else
{
  const ref = await state(), seen = new Set();
  for (const t of [0, 0.13, 0.26, 0.38, 0.5, 0.63, 0.76, 0.88, 0.99]) {
    await seek(t);
    const s = await state();
    seen.add(s.k0);
    check(`rail τ = ${t}: front k₀ = ⌊8τ⌋ = ${Math.floor(8 * t)}, θ, η, M, S, T and Δ unchanged`, s.k0 === Math.floor(8 * t) && s.thetaDeg === ref.thetaDeg && s.eta === ref.eta && s.M === ref.M
      && s.Srep === ref.Srep && s.T === ref.T && s.slack === ref.slack);
  }
  check('rail: the front visits all eight alters', seen.size === 8);
}

/* ---------- every control ---------- */
await pick(DEFAULT);
for (const v of [0, 0.01, 22.5, 42.34, 42.35, 45, 68, 90]) {
  await input('#tiltTheta', v);
  const s = await state();
  const want = v === 42.35 ? TS_DEG : v;
  check(`slider θ = ${v}: leaves the card, sets θ${v === 42.35 ? ' (snapped to θ*)' : ''}`, s.preset === null && near(s.thetaDeg, want, 1e-12) && s.snapped === (v === 42.35)
    && (await page.textContent('output[for="tiltTheta"]')) === v.toFixed(2));
  checkMath(s, `θ = ${v}`);
  await checkNote(page, `θ = ${v}`);
}
{ await input('#tiltTheta', 42.34); const s = await state(); check('slider θ = 42.34 is not θ*: the tension is small but not 0', !s.snapped && s.T > 0 && s.T < 1e-4); }
await input('#tiltTheta', 42.35);
for (const v of [0, 0.25, 0.5, 0.85, 1]) {
  await input('#repressEta', v);
  const s = await state();
  check(`slider η = ${v}: overlap 1 − η, membrane follows`, near(s.eta, v, 1e-12) && near(s.overlap, 1 - v, 1e-12) && s.preset === null);
  checkMath(s, `η = ${v}`);
}
{ await input('#repressEta', 0); const s = await state(); check('η = 0: the records are equal, nothing is repressed, S_rep = 0 at θ*', s.Srep === 0 && s.leanInstances.records.distinguishability === 0); }
await input('#repressEta', 1);
for (const v of [0, 1, 3, 6, 10, 12]) {
  await input('#manasM', v);
  const s = await state();
  check(`slider M = ${v}: Δ_Schur = (12 − M)/(12(M + 1)) = ${schurSlack(v).toFixed(4)}`, s.M === v && near(s.slack, schurSlack(v), 1e-12) && (await page.textContent('output[for="manasM"]')) === String(v));
  checkMath(s, `M = ${v}`);
}
await input('#manasM', 3);
// the blind-spot note at θ = 45°: at η = 0.5 the front marginal is not that of the classical shadow (off-diagonal
// (1 − η) cos θ sin θ = 0.25); at η = 1 it is, and the joint states differ in both T_xx = 1 and T_yy = −1
{
  const off = reduced(45 * DEG, 0.5).A[0][1], s2 = Math.sin(90 * DEG);
  check('maths: at θ = 45°, η = 0.5 the actual marginal has the off-diagonal 0.2500; sin 2θ = 1', f4(off) === '0.2500' && near(off, 0.5 * Math.cos(45 * DEG) * Math.sin(45 * DEG), 1e-15) && f4(s2) === '1.0000');
  const WANT = {
    0.5: {
      zh: ['前台的边缘与它的经典影子 diag(cos²θ, sin²θ) 不同：非对角元 (1 − η) cos θ sin θ = 0.2500 ≠ 0。', '关联却在 Txx = sin 2θ = 1.0000 与 Tyy = −sin 2θ = −1.0000 两项上都不同'],
      en: ['The front marginal differs from that of its classical shadow diag(cos²θ, sin²θ): its off-diagonal (1 − η) cos θ sin θ = 0.2500 ≠ 0.', 'yet differ in both Txx = sin 2θ = 1.0000 and Tyy = −sin 2θ = −1.0000;'],
      not: [/相同（非对角元 0）|只差/, /equals that of its classical shadow|\bonly\b/]
    },
    1: {
      zh: ['局部看不见关联：η = 1 时前台的边缘与它的经典影子相同（非对角元 0），联合态却在 Txx = sin 2θ = 1.0000 与 Tyy = −sin 2θ = −1.0000 两项上都不同'],
      en: ['The local view is blind to correlations: at η = 1 the front marginal equals that of its classical shadow (off-diagonal 0), yet the joint states differ in both Txx = sin 2θ = 1.0000 and Tyy = −sin 2θ = −1.0000;'],
      not: [/经典影子 diag\(cos²θ, sin²θ\) 不同|只差/, /differs from that of its classical shadow|\bonly\b/]
    }
  };
  await input('#tiltTheta', 45);
  for (const eta of [0.5, 1]) {
    await input('#repressEta', eta);
    const s = await state();
    check(`θ = 45°, η = ${eta}: the page computes the marginal off-diagonal ${f4((1 - eta) * 0.5)} and T_xx = −T_yy = 1`, near(s.leanInstances.blind.marginalOff, reduced(45 * DEG, eta).A[0][1], 1e-12)
      && s.leanInstances.blind.marginalDiffers === (eta < 1) && near(s.leanInstances.blind.txx, 1, 1e-12) && near(s.leanInstances.blind.tyy, -1, 1e-12));
    for (const lang of ['zh', 'en']) {
      await page.click(`[data-lang-set="${lang}"]`); await settle(page);
      const text = flat(await page.innerHTML('#roNote'));
      check(`θ = 45°, η = ${eta} (${lang}): the note says the marginal ${eta < 1 ? 'differs from' : 'equals'} the classical shadow and names both T_xx and T_yy`,
        WANT[eta][lang].every((w) => text.includes(w)) && !WANT[eta].not[lang === 'zh' ? 0 : 1].test(text), text);
      await checkNote(page, `θ = 45°, η = ${eta} (${lang})`);
    }
    await page.click('[data-lang-set="zh"]'); await settle(page);
  }
  // at θ = 90° the state is a product: marginal and correlations both equal those of the shadow, at any η
  await input('#tiltTheta', 90); await input('#repressEta', 0.5);
  await checkNote(page, 'θ = 90°, η = 0.5');
  await input('#repressEta', 1); await input('#tiltTheta', 42.35);
}
// the Līlā-bridge label states T = 0 only when T rounds to 0 at six decimals: at θ = 42.10°, η = 1, M = 12 the bridges are
// up (no stub, opacity above 0.5) while T = 0.0048
{
  const tText = (T) => (Math.abs(T) < 5e-7 ? '0' : Math.abs(T) >= 5e-5 ? T.toFixed(4) : T.toFixed(6));
  check('maths: T(42.10°, 1, 12) = 0.0048, T(42.34°, 1, 3) = 0.000032 and T(θ*, 1, 3) = 0 at six decimals',
    tension(42.1 * DEG, 1, 12).toFixed(4) === '0.0048' && tension(42.34 * DEG, 1, 3).toFixed(6) === '0.000032' && Math.abs(tension(TS, 1, 3)) < 5e-7);
  for (const [deg, M] of [[42.1, 12], [42.34, 3], [42.35, 3]]) {
    await input('#tiltTheta', deg); await input('#manasM', M);
    for (const lang of ['zh', 'en']) {
      await page.click(`[data-lang-set="${lang}"]`); await settle(page);
      const s = await state(), want = tText(tension(s.theta, 1, M)), label = s.labels.find((l) => l.name === 'bridges');
      const text = label ? flat(label.html) : '';
      check(`bridge label θ = ${deg}°, M = ${M} (${lang}): bridges up, no stub, the label reads T = ${want}`, s.lens === 0 && s.eta === 1 && near(s.T, tension(s.theta, 1, M), 1e-15)
        && s.stageFrame.arcs.stubs === 0 && s.stageFrame.arcs.bridges === 8 && s.healed > 0.5 && !!label
        && text === (lang === 'zh' ? `游戏之桥 · 张力 T = ${want}` : `Lila bridges · tension T = ${want}`) && (want === '0') === (deg === 42.35), text);
    }
    await page.click('[data-lang-set="zh"]'); await settle(page);
  }
  await input('#manasM', 3); await input('#tiltTheta', 42.35);
}
// the lens: the same state, two readings
{
  const before = await state();
  await page.click('#lensToggleBtn'); await settle(page);
  const a = await state();
  check('lens toggle: the partial-trace reading, same θ, η, M, front and card', a.lens === 1 && a.thetaDeg === before.thetaDeg && a.eta === before.eta && a.M === before.M && a.k0 === before.k0
    && a.preset === before.preset && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === 'true' && /PARTIAL TRACE|偏迹几何/.test(await page.textContent('#hudBig')));
  const pc = await primitiveColours(page), chords = pc.seen.filter((x) => x.n === 'line');
  check('lens 1: seven cyan Gram chords from the front alter', chords.length === 7 && chords.every((x) => same(x.colors, [pc.cyan])));
  check('lens 1: the labels read the Gram overlap of the antipode', a.labels.some((l) => l.name === 'antipode'));
  checkMath(a, 'lens 1');
  await page.click('#lensToggleBtn'); await settle(page);
  const b = await state();
  check('lens toggle: back to the divine-defence reading, no chords', b.lens === 0 && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === 'false' && !b.labels.some((l) => l.name === 'antipode')
    && (await primitiveColours(page)).seen.every((x) => x.n !== 'line'));
}
// the views
for (const name of ['surface', 'roots', 'panorama']) {
  await page.click(`#camChips [data-cam="${name}"]`); await settle(page);
  const s = await state(), cam = CAMS[name];
  check(`view chip ${name}: the camera goes to (${cam.join(', ')})`, s.cam === name && near(s.camera.yaw, cam[0], 1e-9) && near(s.camera.pitch, cam[1], 1e-9) && near(s.camera.zoom, cam[2], 1e-9)
    && await page.getAttribute(`#camChips [data-cam="${name}"]`, 'aria-pressed') === 'true');
  const v = await stageView(page, '#stage', false), lo = await labelOverlaps(page, '.stage .tag', 0);
  check(`view ${name}: stage, HUD and labels clear`, v.layout.length === 0 && v.hud.length === 0 && lo.length === 0, [...v.layout, ...v.hud, ...lo.map((x) => x.join(' / '))].join(' | '));
}

/* ---------- picking an alter, and the handle ---------- */
await pick(DEFAULT);
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const s0 = await state(), target = (s0.k0 + 3) % 8;
  let k = target, pt = await page.evaluate((j) => window.DIVINE_PSYCHOLOGY_DEBUG.alterPoint(j), k);
  for (let j = 1; pt && pt.hidden && j < 8; j++) { k = (target + j) % 8; if (k === s0.k0) continue; pt = await page.evaluate((x) => window.DIVINE_PSYCHOLOGY_DEBUG.alterPoint(x), k); }
  check('alters: a visible alter can be clicked', !!pt && !pt.hidden);
  if (pt) {
    await page.mouse.click(pt.x, pt.y); await settle(page);
    const s = await state();
    check(`alters: clicking alter ${k} brings it to the front, pauses, leaves the card, keeps the camera`, s.k0 === k && s.preset === null && !s.playing && same(s.camera, s0.camera));
    const pc = await primitiveColours(page), amberKeys = pc.seen.filter((x) => x.colors.includes(pc.amber)).map((x) => x.key).sort();
    check('alters: amber follows the new front', same(amberKeys, [`alter${k}`, `root${k}`].sort()));
  }
}
{
  const before = await state(), h = await page.evaluate(() => window.DIVINE_PSYCHOLOGY_DEBUG.handleBox());
  const target = await page.evaluate(() => window.DIVINE_PSYCHOLOGY_DEBUG.dragTarget(60));
  check('handle: a visible amber button on the front alter', !!h && await page.locator('#psycheHandle').isVisible() && !!before.handle
    && Math.hypot(before.handle.x - before.stageFrame.alters[before.k0][0], before.handle.y - before.stageFrame.alters[before.k0][1]) < 1);
  if (h && target) {
    await page.mouse.move(h.x, h.y); await page.mouse.down();
    check('handle: pointerdown starts a drag', await page.locator('#psycheHandle').evaluate((el) => el.classList.contains('dragging')));
    await page.mouse.move(target.x, target.y, { steps: 6 }); await page.mouse.up(); await settle(page);
    const after = await state();
    check('handle: drag sets θ ≈ 60° along the meridian and leaves the camera alone', Math.abs(after.thetaDeg - 60) < 0.6 && same(after.camera, before.camera) && after.preset === null
      && after.k0 === before.k0 && Number(await page.inputValue('#tiltTheta')).toFixed(2) === after.thetaDeg.toFixed(2), `${after.thetaDeg}`);
    checkMath(after, 'after the handle drag');
  }
  const t0 = (await state()).thetaDeg, c0 = (await state()).t;
  await page.locator('#psycheHandle').focus(); await page.keyboard.press('ArrowLeft'); await settle(page);
  const k = await state();
  check('handle: ← lowers θ by 0.25° and leaves the clock alone', near(k.thetaDeg, Math.round((t0 - 0.25) * 100) / 100, 1e-9) && k.t === c0, `${t0} → ${k.thetaDeg}`);
}

/* ---------- drawer, playback ---------- */
await page.click('#infoBtn'); await settle(page);
check('info button opens the theory drawer', await page.locator('#drawer [role="dialog"]').isVisible());
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').isHidden());
check('play advances the rail', await playsAfter(page, () => page.locator('#play').evaluate((b) => b.click()), () => window.DIVINE_PSYCHOLOGY_DEBUG.state));
await pause();
{ const a = await state(); await settle(page); const b = await state(); check('pause holds the clock', !a.playing && a.t === b.t); }
for (const card of Object.keys(CARDS).filter((c) => CARDS[c].play)) {
  check(`card ${card}: a click plays its story`, await playsAfter(page, () => page.click(`[data-preset="${card}"]`), () => window.DIVINE_PSYCHOLOGY_DEBUG.state));
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
    const bad = await domColours(p);
    check(`${tag}/${card}: no amber, green or red in the stage, strip and readout DOM; no amber in the evidence column`, bad.length === 0, bad.slice(0, 3).join(' | '));
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
  check(`still ${lang}/${card}: paused on the declared frame and view, no handle`, s.preset === card && !s.playing && near(s.t, CARDS[card].still, 1e-12) && s.cam === CARDS[card].cam
    && near(s.camera.pitch, CAMS[CARDS[card].cam][1], 1e-9) && await p.locator('#psycheHandle').isHidden() && await p.evaluate(() => TRV.still && TRV.shot && document.documentElement.dataset.trPalette === undefined));
  if (card === 'omniscient-claustrophobia-freeze') check(`still ${lang}/${card}: one frozen sphere, S = 0, Δ = 0`, s.merged && s.Srep === 0 && Math.abs(s.slack) < 5e-5);
  if (card === 'repression-horizon-birth') check(`still ${lang}/${card}: S = 1.0000 bit, I = 2.0000 bit, Δ = 1`, s.SA.toFixed(4) === '1.0000' && s.I.toFixed(4) === '2.0000' && s.slack === 1);
  if (card === 'compulsive-over-immersion-pain') check(`still ${lang}/${card}: S = 0.5851 bit, T = 0.6276`, s.SA.toFixed(4) === '0.5851' && s.T.toFixed(4) === '0.6276' && s.stageFrame.arcs.stubs === 16);
  if (card === 'subsurface-alaya-one-root') check(`still ${lang}/${card}: from below, eight roots into one core, T = 0`, s.camera.pitch < 0 && s.stageFrame.pierced === 8 && s.T < 1e-15);
  if (card === 'lucid-lila-integration-star') check(`still ${lang}/${card}: θ*, S = 0.9938 bit, eight bridges`, s.snapped && s.SA.toFixed(4) === '0.9938' && s.stageFrame.arcs.bridges === 8);
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
