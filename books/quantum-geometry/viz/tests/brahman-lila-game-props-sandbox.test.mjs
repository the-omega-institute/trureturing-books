// LILA//PROPS browser regression: the shared stage-first gate, then every control, card, lens, still and frame, and
// every number the page claims, checked against algorithms written here (Newton's method for θ*, explicit vectors and
// Gram–Schmidt for the Schur freedom, the closed form sin²(Kδ/2)/(K² sin²(δ/2)) of the Fejér kernel, powers of the
// single-pass weight computed through cos² by repeated squaring, the angular argmin of the props).
// Run directly with node; VIZ_SLOW_FRAMES=1000 exercises every transition and playback with sparse animation frames.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, capitalGreek, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'brahman-lila-game-props-sandbox';
const NAME = 'BRAHMAN_LILA_DEBUG';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const THEORY = 'ch39-s17-divine-lila-and-awakening-props.html#sec-ch39-divine-lila-and-awakening-props';
const GIDS = [
  'D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least',
  'D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary',
  'D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent',
  'D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure'
];
const CARDS = {
  'omniscient-zeno-deadlock': { lens: 'props', drive: 'avatarLap', M: 12, K: 1, still: 0.5 },
  'amnesia-birth-open-corridor': { lens: 'props', drive: 'avatarLap', M: 2, K: 1, still: 0.28 },
  'relic-attractor-deja-vu': { lens: 'worldlines', drive: 'avatarLap', M: 3, K: 5, still: 0.3333 },
  'classic-permission-lock-flip': { lens: 'props', drive: 'tuneAlpha', M: 3, K: 4, still: 1 },
  'lila-raft-return-and-new-seed': { lens: 'worldlines', drive: 'avatarLap', M: 1, K: 6, still: 0.8333 }
};
// The theorems the §38.9 theorem environments cite (lean=): every green Lean link of this page must be one of them.
const SECTION_LEAN = [
  'D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least',
  'D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitored_return_conservation',
  'D5/S3/Quantum/Measurements/FiniteMemoryHistoryCapacity.finite_memory_history_capacity',
  'D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal',
  'D5/S3/Fourier/Asymptotics/TorusObservationWindowReturns.result',
  'D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization',
  'D5/S3/Quantum/Algebra/FutureWordOrthogonalResidual.future_word_orthogonal_residual',
  'D5/S0/Diagonal/RecursivePageTable.recursive_page_table_walk',
  'D5/S0/Computability/DescriptionComplexity/LookupProgramUpperBound.lookup_program_upper_bound',
  'D5/S3/ConceptDynamics/DefinitionEscapeAdjudication/RetrospectiveLookupFailure.lookup_copy_zero_loss_and_nonanticipating_failure',
  'D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent',
  'D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently',
  'D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase',
  'D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.context_parameters_can_select_distinct_fixed_points',
  'D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor',
  'D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight',
  'D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary'
];
const VIEW0 = [0.5, 0.5];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const DEG = Math.PI / 180;

/* ---------- independent mathematics, written here and never calling the page ---------- */
function newtonDottie() { let t = 1; for (let k = 0; k < 60; k++) t -= (Math.cos(t) - t) / (-Math.sin(t) - 1); return t; }
const TSTAR = newtonDottie(), TSTAR_DEG = TSTAR / DEG;
/** The Schur freedom by explicit vectors in ℝ¹³ and Gram–Schmidt (see the HONG//AWAKEN suite for the same construction). */
function schurByVectors(M, D = 12, rho = 0.5) {
  const vec = (i) => { const v = new Array(D + 1).fill(0); v[i] = Math.sqrt(1 - rho); v[D] = Math.sqrt(rho); return v; };
  const dotv = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const b = new Array(D + 1).fill(0); for (let i = 0; i < D; i++) vec(i).forEach((x, k) => { b[k] += x / D; });
  const basis = [];
  for (let i = 0; i < M; i++) { let v = vec(i); for (const q of basis) { const c = dotv(v, q); v = v.map((x, k) => x - c * q[k]); } const n = Math.sqrt(dotv(v, v)); basis.push(v.map((x) => x / n)); }
  let r = b.slice(); for (const q of basis) { const c = dotv(r, q); r = r.map((x, k) => x - c * q[k]); }
  return { ratio: dotv(r, r) / dotv(b, b), varB: dotv(b, b), residual: dotv(r, r) };
}
/** cos²⁴ by repeated squaring of cos²: (((c²)²)²)·((c²)²)… = c^{24} = c¹⁶·c⁸. */
function lock24(aDeg) { const c2 = Math.cos(aDeg * DEG - TSTAR) ** 2, c4 = c2 * c2, c8 = c4 * c4, c16 = c8 * c8; return c16 * c8; }
const pass1 = (aDeg) => (1 + Math.cos(2 * (aDeg * DEG - TSTAR))) / 2;
const gF = (aDeg) => 1 / (1 + 100 * (1 - Math.cos(2 * (aDeg * DEG - TSTAR))) / 2);
/** The Fejér kernel in closed form. */
function fejerClosed(aDeg, K) { const d = 12 * (aDeg * DEG - TSTAR); const s = Math.sin(d / 2); return Math.abs(s) < 1e-12 ? 1 : (Math.sin(K * d / 2) / (K * s)) ** 2; }
const strideOf = (M) => Math.min(1, Math.sqrt(schurByVectors(M).ratio / schurByVectors(3).ratio));
const gapDeg = (a, b) => { const d = Math.abs(((a - b) % 360 + 360) % 360); return Math.min(d, 360 - d); };
const PROPS = [['pyramid', 0], ['classic60', 60], ['trilithon', 120], ['classic180', 180], ['stele', 240], ['classic300', 300]];

const T = await session();
const { page, check } = T;

{
  check('maths: θ* = 0.7390851332151607 rad = 42.34645883°', near(TSTAR, 0.7390851332151607, 2e-16) && TSTAR_DEG.toFixed(8) === '42.34645883');
  const t = [0, 1, 3, 12].map((m) => schurByVectors(m).ratio);
  check('maths: Δ_Schur(0, 1, 3, 12) = 1.0000, 0.4583, 0.1875, 0.0000 from explicit vectors', t.map((x) => x.toFixed(4)).join() === '1.0000,0.4583,0.1875,0.0000' && Math.abs(t[3]) < 1e-12
    && Array.from({ length: 13 }, (_, m) => m).every((m) => near(schurByVectors(m).ratio, (12 - m) / (12 * (m + 1)), 1e-12))
    && Array.from({ length: 12 }, (_, m) => m).every((m) => schurByVectors(m).ratio > schurByVectors(m + 1).ratio));
  check('maths: twelve passes are below 0.12% at 0° and 90° and 100.00% at θ*: 0.0706%, 0.0076%', lock24(0) < 0.0012 && lock24(90) < 0.0012 && (100 * lock24(0)).toFixed(4) === '0.0706'
    && (100 * lock24(90)).toFixed(4) === '0.0076' && (100 * lock24(TSTAR_DEG)).toFixed(2) === '100.00');
  check('maths: the Fabry–Pérot gate is 2.16% at 0°, 1.80% at 90°, 1 at θ*', (100 * gF(0)).toFixed(2) === '2.16' && (100 * gF(90)).toFixed(2) === '1.80' && near(gF(TSTAR_DEG), 1, 1e-15));
  check('maths: the Fejér kernel of five epochs at α = 40° is 0.5999', fejerClosed(40, 5).toFixed(4) === '0.5999');
}

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
  await context.exposeBinding('__lilaPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__lilaPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__lilaPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined,
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
  [115, 111, 110, 110, 101, 116], [104, 97, 105, 107, 117], [108, 108, 109], [97, 103, 101, 110, 116], [99, 104, 97, 116, 98, 111, 116],
  [100, 101, 101, 112, 109, 105, 110, 100]
].map((codes) => String.fromCharCode(...codes));
const identifiers = new RegExp(`\\b(?:${forbidden.join('|')}|${numbered}-?\\d)\\b`, 'i');
const shortAcronym = new RegExp(`\\b${String.fromCharCode(65, 73)}\\b`);
const cjkTerms = [[0x5927, 0x6a21, 0x578b], [0x667a, 0x80fd, 0x4f53], [0x4eba, 0x5de5, 0x667a, 0x80fd]].map((c) => String.fromCharCode(...c));
for (const [file, src] of Object.entries(sources)) {
  check(`source ${file}: no literal colour and no palette switch`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(src) && !/\btrPalette\b|data-tr-palette/.test(src));
  check(`source ${file}: no model, vendor or tool identifiers`, !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.some((w) => src.includes(w)));
}
check('suite: no model, vendor or tool identifiers', !identifiers.test(suite.replace(/\[[\d, x]+\]/g, '')) && !shortAcronym.test(suite));
check('source: no grid-template-columns in the page stylesheet (the lab keeps its shared three columns)', !/grid-template-columns\s*:/i.test(sources['style.css']));
check('source: kit.solid without wheel zoom, kit.clock looping', /wheel:\s*false/.test(sources['main.js']) && /loop:\s*true/.test(sources['main.js']));
check('source: the five cards in their public order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1]), Object.keys(CARDS)));
check('source: the page loads only the shared runtime and its own files', same([...sources['index.html'].matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]), ['../assets/shell.js', '../assets/kit.js', 'main.js']));
check('source: no .okmark anywhere (no green tick outside the Lean boxes)', !/okmark/.test(sources['index.html'] + sources['main.js'] + sources['style.css']));
check('source: green and red stay off the stage (no ok, warn or red colour in the page code)', !/P\.(?:ok|warn|red)\b|var\(--(?:ok|warn|red|tr-ok|tr-warn)\)|\bc-wn\b|sw (?:ok|wn)\b/.test(sources['main.js'] + sources['style.css']));
check('source: amber in the script only for the avatar and the strip cursor', [...sources['main.js'].matchAll(/^.*P\.amber.*$/gm)].map((m) => m[0]).every((l) => /sc\.bead\(av|g\.vline\(|g\.dot\(/.test(l))
  && (sources['main.js'].match(/P\.amber/g) || []).length === 5);
check('source: amber in the stylesheet only on the active lens half and the handle', sources['style.css'].replace(/\/\*[\s\S]*?\*\//g, '').split('}').filter((r) => /--amber/.test(r))
  .every((r) => /^\s*(?:\.lens-toggle\[aria-pressed="false"\] \.seg\.off, \.lens-toggle\[aria-pressed="true"\] \.seg\.on|\.handle(?:[:.\s,][^{]*)?)\s*\{/.test(r)));
check('source: amber is not a readout or label colour; the beams are silver', !/dl\.ro[^{]*\{[^}]*--amber/.test(sources['style.css']) && !/c-am/.test(sources['main.js'] + sources['style.css'])
  && /tube\(`beam-\$\{c\.deg\}`[^;]*P\.sigma/.test(sources['main.js']));
check('source (Rule 2): the header pills are plain (no .hot), slider outputs are ink, tagline and drawer emphasis are cyan', !/\bpill hot\b|\.pill\.hot|classList\.(?:add|toggle)\(['"]hot['"]/.test(sources['index.html'] + sources['main.js'])
  && /(?:^|\n)\.field output \{ color: var\(--ink\); \}/.test(sources['style.css']) && /(?:^|\n)\.tagline em, \.sheet li b \{ color: var\(--cyan\); \}/.test(sources['style.css']));
check('source: the drawer carries a MODEL note on the macroscopic decoherence boundary (Joos–Zeh, Zurek) in both languages', (() => {
  const dr = sources['index.html'].slice(sources['index.html'].indexOf('<div class="drawer"'));
  return (dr.match(/<div class="lean model">/g) || []).length === 2 && /Joos–Zeh/.test(dr) && /Zurek/.test(dr) && /退相干边界/.test(dr) && /decoherence boundary/.test(dr);
})());
check('source: θ* in degrees is 42.34645883 (or 42.35), never 42.34647', !/42\.3464[6-9]/.test(sources['index.html'] + sources['main.js']) && sources['index.html'].includes('42.34645883°'));
{
  const zh = (sources['index.html'].match(/class="(?:[^"]*\s)?zh(?:\s[^"]*)?"/g) || []).length, en = (sources['index.html'].match(/class="(?:[^"]*\s)?en(?:\s[^"]*)?"/g) || []).length;
  check('source: as many .zh as .en elements', zh === en && zh > 0, `${zh} zh / ${en} en`);
}
check('suite: no fixed waits', !new RegExp('wait' + 'ForTimeout').test(suite));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID);
check('registry: the page cites only theorems of the §38.9 lean= list (the power-series endpoint of θ* is §38.8, not here)', GIDS.every((g) => SECTION_LEAN.includes(g))
  && !/DottieInverseSeries/.test(sources['index.html'] + JSON.stringify(entry || {})));
check('registry: live §38.9 entry with five bilingual cards and the four theorems', !!entry && entry.status === 'live' && entry.chapter === 38 && entry.section === '38.9'
  && entry.code === 'LILA//PROPS' && same(entry.presets, Object.keys(CARDS)) && entry.presets.every((c) => entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same(entry.lean.map((x) => x.gid).sort(), [...GIDS].sort()) && entry.tags.length === entry.tags_en.length && entry.capture_lock === 'links'
  && entry.theory[0].href === `../zh/${THEORY}` && entry.theory[0].href_en === `../en/${THEORY}` && GIDS.every((g) => /^[\x21-\x7e]+$/.test(g)));
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
    same(blocks.filter((m) => m[2]).map((m) => m[2]).sort(), Object.keys(CARDS).sort())
    && blocks.length === Object.keys(CARDS).length + 1 && !blocks.at(-1)[2]
    && blocks.every((m) => m[3] === (m[2] ? '500' : '620') && m[4].trim().length > 0)
    && chapter.trimEnd().endsWith(blocks.at(-1)[0]));
  const theoremGids = [...chapter.matchAll(/^::: \{\.theorem[^\n]*\blean="([^"]+)"/gm)].flatMap((m) => m[1].split(','));
  check(`chapter ${lang}: the copied theorem list matches lean=`, same(SECTION_LEAN, theoremGids));
  check(`chapter ${lang}: every green page GID belongs to this subsection's theorem`, GIDS.every((gid) => theoremGids.includes(gid)));
  check(`chapter ${lang}: stable theory anchor and explicit test dependency`, chapter.includes(`{#${THEORY.split('#')[1]}}`)
    && deps.includes(`books/${BOOK}/${lang}/${THEORY.split('#')[0].replace(/\.html$/, '.md')}`));
}
check('chapter: identical card order and full-lab position in both editions', same(chapterBlocks[0], chapterBlocks[1]));

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate((n) => window[n].state, NAME);
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
  await until(p, ([n, id]) => { const s = window[n].state; return s.preset === id && !s.blending; }, [NAME, card]);
  await pause(p);
}
async function seek(t, p = page) {
  await p.locator('#now').evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, t);
  await settle(p);
}

/** Every number of a state against the algorithms of this file. */
function checkMath(s, tag) {
  const a = s.alphaDeg, I = s.leanInstances, sv = schurByVectors(s.M);
  check(`${tag}: α from the drive`, s.drive === 'tuneAlpha' ? near(a, TSTAR_DEG * s.tau, 1e-9) : a >= 0 && a <= 90);
  check(`${tag}: Δ_Schur(M) from explicit vectors, stride min(1, √(Δ/Δ(3))), ψ = 360°·τ·ν`, Number.isInteger(s.M) && near(s.schur, sv.ratio, 1e-12) && near(s.stride, strideOf(s.M), 1e-12)
    && near(s.psi, 360 * s.tau * strideOf(s.M), 1e-9) && near(s.psiMod, ((s.psi % 360) + 360) % 360, 1e-9));
  const best = PROPS.map(([k, d]) => [k, gapDeg(s.psiMod, d)]).sort((x, y) => x[1] - y[1])[0];
  check(`${tag}: the nearest prop by angular distance`, s.near.key === best[0] && near(s.near.gap, best[1], 1e-9), `${s.near.key} ${best[0]}`);
  check(`${tag}: one pass cos², twelve passes cos²⁴, Fabry–Pérot g_F`, near(s.onePass, pass1(a), 1e-12) && near(s.lock, lock24(a), 1e-12) && near(s.cavity, gF(a), 1e-12) && near(s.beams, s.lock, 0));
  check(`${tag}: the Fejér kernel of K epochs and the rings at each relic`, Number.isInteger(s.K) && s.K >= 1 && s.K <= 8 && near(s.interference, fejerClosed(a, s.K), 1e-10)
    && s.rings.every((r, j) => near(r.prox, Math.exp(-((gapDeg(s.psiMod, [0, 120, 240][j]) / 25) ** 2)), 1e-12) && near(r.strength, r.prox * s.interference, 1e-12)));
  check(`${tag}: the real axis does not drift`, s.axisDrift === 0);
  const R = 0.86, r0 = 0.24;
  check(`${tag}: the avatar lies just off the torus surface`, (() => { const [x, y, z] = s.avatar, rho = Math.hypot(x, y) - R, d = Math.hypot(rho, z); return d > r0 * 0.75 && d < r0 + 0.04; })());
  // the Lean instances
  const A = sv.varB;
  check(`${tag}: Schur: the minimum over y equals A − BC⁻¹Bᴴ, random y do no better, the ratio is Δ_Schur`, near(I.schur.A, A, 1e-12) && I.schur.residual < 1e-12 && I.schur.randomGap >= -1e-12
    && near(I.schur.complement, sv.residual, 1e-12) && near(I.schur.ratio, sv.ratio, 1e-12) && I.schur.formulaGap < 1e-12 && I.schur.M === s.M);
  check(`${tag}: θ* agrees with Newton, in (0, 1), cos t − t decreasing`, near(I.dottie.theta, TSTAR, 2e-16) && I.dottie.residual < 1e-15 && I.dottie.inUnit && I.dottie.maxSlope <= -1);
  check(`${tag}: J = [[0, −1], [1, 0]]: Jᴴ = −J, JJᴴ = I, J² = −I`, I.fold.skewAdjoint === 0 && I.fold.unitary === 0 && I.fold.square === 0 && same(I.fold.surfaceToDeep, [0, 1]));
  check(`${tag}: the reader basis is a record measurement, its unread state idempotent, weight cos²(α − θ*)`, I.record.selfAdjoint < 1e-15 && I.record.idempotent < 1e-15 && I.record.orthogonal < 1e-15
    && I.record.complete < 1e-15 && I.record.idempotence < 1e-15 && near(I.record.weight, pass1(a), 1e-12));
  check(`${tag}: the raft: 3K records, copy loss 0, none non-anticipating, no positive gain`, I.raft.records === 3 * s.K && I.raft.loss === 0 && I.raft.nonAnticipating === 0 && I.raft.gainPositive === false
    && I.raft.observed.every((x) => Number.isInteger(x) && x >= 0 && x < 12));
}

async function checkLinks(p, tag) {
  check(`${tag}: exactly the four green Lean links, in #evidence`, same(await p.$$eval('[data-lean-gid]', (els) => els.map((e) => e.dataset.leanGid).sort()), [...GIDS].sort())
    && await p.$$eval('[data-lean-gid]', (els) => els.every((e) => e.closest('.col.side #evidence .lean') && e.closest('.lean').querySelector('.ok').textContent.trim() === 'LEAN ✓')));
  check(`${tag}: one ARGUED, MODEL and NUM box each in #evidence, no OPEN box`, await p.evaluate(() => ['argued', 'model', 'num'].every((c) => document.querySelectorAll(`#evidence .lean.${c}`).length === 1)
    && !document.querySelector('.lean.open') && document.querySelectorAll('#evidence .lean:not(.argued):not(.model):not(.num):not(.open):not(.frozen)').length === 4));
  check(`${tag}: bilingual chapter 38 theory link in the drawer`, same(await p.$$eval('#drawer .refs a', (els) => els.map((e) => e.getAttribute('href')).sort()), ['zh', 'en'].map((l) => `../../${l}/${THEORY}`).sort()));
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
    && !!document.querySelector('#stage[data-thumb] > canvas#cv') && document.querySelector('#stage > button.handle#lilaHandle[type="button"]') !== null;
}));
check('layout: #rail is the left deck holding the lens toggle, then the cards with their note, then #ctlPanel with three sliders', await page.evaluate(() => {
  const deck = document.querySelector('.app.lab > aside.col.deck#rail'), lens = document.querySelector('#lensToggleBtn.lens-toggle'), cards = document.querySelector('.presets.cards#presets');
  const ctl = document.querySelector('#ctlPanel'), F = Node.DOCUMENT_POSITION_FOLLOWING;
  return !!deck && deck.contains(lens) && deck.contains(cards) && deck.contains(document.querySelector('#presetNote')) && deck.contains(ctl)
    && !!(lens.compareDocumentPosition(cards) & F) && !!(cards.compareDocumentPosition(ctl) & F) && ['#amnesiaM', '#basisAlpha', '#epochCount'].every((q) => ctl.contains(document.querySelector(q)))
    && ctl.querySelectorAll('input[type=range]').length === 3 && document.querySelectorAll('#presets [data-preset]').length === 5;
}));
check('layout: #infoBtn is the first child of #evidence, above every evidence box', await page.evaluate(() => {
  const ev = document.querySelector('.app.lab > aside.col.side > #evidence'), btn = document.querySelector('#infoBtn');
  const boxes = [...ev.querySelectorAll('.lean')], top = btn.getBoundingClientRect();
  return document.querySelectorAll('#infoBtn').length === 1 && ev.firstElementChild === btn && btn.matches('button.chip[type="button"]') && boxes.length === 7
    && boxes.every((b) => top.bottom <= b.getBoundingClientRect().top + 0.5);
}));
check('layout: opens on the permission-lock card at its still, paused', await page.evaluate((n) => { const s = window[n].state; return s.preset === 'classic-permission-lock-flip' && s.t === 1 && !s.playing; }, NAME));
check('sliders: M over [0, 12] step 1, α over [0, 90] step 0.01, K over [1, 8] step 1', await page.evaluate(() => {
  const a = document.querySelector('#amnesiaM'), b = document.querySelector('#basisAlpha'), c = document.querySelector('#epochCount');
  return a.min === '0' && a.max === '12' && a.step === '1' && b.min === '0' && b.max === '90' && b.step === '0.01' && c.min === '1' && c.max === '8' && c.step === '1';
}));
check('colours: every MODEL badge (evidence and drawer) is ink and every MODEL border neutral, never amber (not rgb(255, 200, 61))', await page.evaluate(() => {
  const probe = (prop, value) => { const e = document.createElement('span'); e.style.borderStyle = 'solid'; e.style[prop] = value; document.body.appendChild(e); const st = getComputedStyle(e), v = prop === 'color' ? st.color : st.borderTopColor; e.remove(); return v; };
  const amber = probe('color', 'var(--amber)'), ink = probe('color', 'var(--ink)');
  const inkEdge = probe('borderColor', 'color-mix(in srgb, var(--ink) 32%, transparent)'), amberEdge = probe('borderColor', 'color-mix(in srgb, var(--amber) 40%, transparent)');
  const boxes = [...document.querySelectorAll('.lean.model')];
  return amber === 'rgb(255, 200, 61)' && ink !== amber && inkEdge !== amberEdge && boxes.length === 3 && boxes.every((b) => {
    const st = getComputedStyle(b), ok = getComputedStyle(b.querySelector('.ok')).color, edges = [st.borderTopColor, st.borderRightColor, st.borderBottomColor, st.borderLeftColor];
    return ok === ink && ok !== amber && ok !== 'rgb(255, 200, 61)' && edges.every((c) => c === inkEdge && c !== amberEdge && !c.includes('255, 200, 61'));
  });
}));
check('readouts, labels and legend: no amber text', await page.evaluate(() => {
  const probe = document.createElement('span'); probe.style.color = 'var(--amber)'; document.body.appendChild(probe);
  const amber = getComputedStyle(probe).color; probe.remove();
  return [...document.querySelectorAll('dl.ro dd, dl.ro dd *, .stage .tag, .hud-bl *, .hud-tl *')].every((e) => getComputedStyle(e).color !== amber);
}));
check('colours (Rule 2): amber whitelist — no header pill, slider output, tagline emphasis or drawer bold computes to amber (rgb(255, 200, 61) / var(--amber))', await page.evaluate(() => {
  const probe = document.createElement('span'); probe.style.color = 'var(--amber)'; document.body.appendChild(probe);
  const amber = getComputedStyle(probe).color; probe.remove();
  const banned = new Set([amber, 'rgb(255, 200, 61)']);
  const pills = [...document.querySelectorAll('header .pill')], outs = [...document.querySelectorAll('.field output')];
  const paints = (e) => { const st = getComputedStyle(e); return [st.color, st.borderTopColor, st.borderRightColor, st.borderBottomColor, st.borderLeftColor].some((c) => banned.has(c)); };
  const els = [...pills, ...document.querySelectorAll('.pill *'), ...outs, ...document.querySelectorAll('.tagline em, .sheet li b')];
  return amber === 'rgb(255, 200, 61)' && pills.length === 2 && outs.length === 3 && !document.querySelector('.pill.hot') && !els.some(paints);
}));
check('stage: no warn-red or ok-green swatch or label', await page.evaluate(() => !document.querySelector('#stage .c-wn, #stage .sw.wn, #stage .sw.ok, #stage .c-ok, .strip .sw.wn')));
{ const s = await state(); checkMath(s, 'opening frame'); }

/* ---------- every card, both languages ---------- */
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  for (const card of Object.keys(CARDS)) {
    await pick(card);
    await seek(CARDS[card].still);
    const s = await state(), c = CARDS[card];
    check(`${lang}/${card}: the card sets lens, drive, M, K and camera, paused at its still`, s.preset === card && s.lens === c.lens && s.drive === c.drive && s.M === c.M && s.K === c.K && !s.playing
      && near(s.tau, c.still, 1e-12) && String(await page.getAttribute(`[data-preset="${card}"]`, 'data-still')) === String(c.still)
      && near(s.camera.yaw, VIEW0[0], 1e-9) && near(s.camera.pitch, VIEW0[1], 1e-9) && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === String(c.lens === 'worldlines'));
    checkMath(s, `${lang}/${card}`);
    const v = await stageView(page, '#stage', false), lo = await labelOverlaps(page, '.stage .tag', 0);
    check(`${lang}/${card}: desktop stage, HUD and labels clear`, v.layout.length === 0 && v.hud.length === 0 && lo.length === 0, [...v.layout, ...v.hud, ...lo.map((x) => x.join(' / '))].join(' | '));
  }
}
await page.click('[data-lang-set="zh"]'); await settle(page);

// the numbers the card notes name
await pick('omniscient-zeno-deadlock');
{
  await seek(0); const a = await state(); await seek(0.5); const b = await state(); await seek(0.9); const c = await state();
  check('card 1: M = 12, Δ = 0, ν = 0: the avatar is at the same point at τ = 0, 0.5 and 0.9 (by the pyramid)', b.schur === 0 && b.stride === 0 && same(a.avatar, b.avatar) && same(b.avatar, c.avatar)
    && b.psiMod === 0 && b.near.key === 'pyramid');
  check('card 1: α = 18°: one pass 0.8300, the lock 10.70%, one worldline', b.onePass.toFixed(4) === '0.8300' && (100 * b.lock).toFixed(2) === '10.70' && b.K === 1);
}
await pick('amnesia-birth-open-corridor');
await seek(0.28);
{ const s = await state(); check('card 2 at τ = 0.28: Δ = 0.2778, full stride, ψ = 100.8° toward the trilithon (19.2°), lock 5.82%', s.schur.toFixed(4) === '0.2778' && s.stride === 1 && s.psiMod.toFixed(1) === '100.8'
  && s.near.key === 'trilithon' && s.near.gap.toFixed(1) === '19.2' && (100 * s.lock).toFixed(2) === '5.82'); }
await pick('relic-attractor-deja-vu');
await seek(0.3333);
{ const s = await state(); check('card 3 at τ = 1/3: at the trilithon (ψ = 120.0°), K = 5, I = 0.60, lock 98.01%, rings only there', s.psiMod.toFixed(1) === '120.0' && s.near.key === 'trilithon'
  && s.interference.toFixed(2) === '0.60' && (100 * s.lock).toFixed(2) === '98.01' && s.rings[1].strength > 0.59 && s.rings[0].strength < 1e-6 && s.rings[2].strength < 1e-6); }
await pick('classic-permission-lock-flip');
for (const [t, want] of [[0, '0.0706'], [0.5, '18.6849'], [1, '100.0000']]) {
  await seek(t); const s = await state();
  check(`card 4 at τ = ${t}: α = θ*·τ, the lock at ${want}%`, near(s.alphaDeg, TSTAR_DEG * t, 1e-9) && (100 * s.lock).toFixed(4) === want, `${100 * s.lock}`);
}
check('card 4 note: the half-widths of one pass and of twelve passes are ±45° and ±13.70°', (Math.acos(Math.sqrt(0.5)) / DEG).toFixed(2) === '45.00' && (Math.acos(0.5 ** (1 / 24)) / DEG).toFixed(2) === '13.70'
  && near(lock24(TSTAR_DEG + 13.70), 0.5, 2e-3) && near(pass1(TSTAR_DEG + 45), 0.5, 1e-12));
{ const s = await state(); check('card 4 at τ = 1: α = θ*, one pass and the cavity at 1, beams full, the avatar back at the pyramid', near(s.onePass, 1, 1e-15) && near(s.cavity, 1, 1e-15) && s.beams === s.lock && s.near.key === 'pyramid'); }
await pick('lila-raft-return-and-new-seed');
await seek(0.8333);
{ const s = await state(); check('card 5 at τ = 5/6: Δ = 0.4583, the avatar by the classics at 300°, all beams, 18 records with loss 0', s.schur.toFixed(4) === '0.4583' && s.near.key === 'classic300'
  && s.psiMod.toFixed(0) === '300' && s.lock.toFixed(4) === '1.0000' && s.leanInstances.raft.records === 18 && s.leanInstances.raft.loss === 0); }

/* ---------- every control ---------- */
await pick('omniscient-zeno-deadlock');
for (const v of [0, 1, 3, 8, 12]) {
  await input('#amnesiaM', v);
  const s = await state();
  check(`slider M = ${v}: leaves the card, Δ_Schur(M)`, s.preset === null && s.M === v && near(s.schur, (12 - v) / (12 * (v + 1)), 1e-12) && s.drive === 'avatarLap');
  checkMath(s, `M = ${v}`);
}
for (const v of [0, 15, 42.35, 60, 90]) {
  await input('#basisAlpha', v);
  const s = await state();
  check(`slider α = ${v}°: sets the reader basis angle`, s.preset === null && near(s.alphaDeg, v, 1e-9));
  checkMath(s, `α = ${v}`);
}
for (const v of [1, 3, 6, 8]) {
  await input('#epochCount', v);
  const s = await state();
  check(`slider K = ${v}: K worldlines, 3K records`, s.K === v && s.leanInstances.raft.records === 3 * v);
  checkMath(s, `K = ${v}`);
}
{
  const before = await state();
  await page.click('#lensToggleBtn'); await settle(page);
  const a = await state();
  check('lens toggle: to worldlines with the same M, α and K, the amber half moves', a.lens === 'worldlines' && a.M === before.M && a.alphaDeg === before.alphaDeg && a.K === before.K
    && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === 'true' && await page.evaluate(() => /I<sub>K<\/sub>|IK/.test(document.querySelector('#hudBig').innerHTML)));
  checkMath(a, 'worldlines lens');
  await page.click('#lensToggleBtn'); await settle(page);
  const b = await state();
  check('lens toggle: back to the props', b.lens === 'props' && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === 'false');
}

/* ---------- the controls show the state: each <output> and slider after extreme values ---------- */
{
  const shown = () => page.evaluate(() => Object.fromEntries(['amnesiaM', 'basisAlpha', 'epochCount'].map((id) => [id, [document.querySelector(`output[for="${id}"]`).textContent, Number(document.getElementById(id).value)]])));
  const expect = (s) => { const a = Math.round(s.alphaDeg * 100) / 100; return { amnesiaM: [`${s.M}`, s.M], basisAlpha: [`${a.toFixed(2)}°`, a], epochCount: [`${s.K}`, s.K] }; };
  // start from a card whose values differ from every extreme (M = 3, K = 4, α = θ*), then pull each slider to its ends
  await pick('classic-permission-lock-flip');
  for (const [sel, v, want] of [['#amnesiaM', 12, ['amnesiaM', '12']], ['#epochCount', 1, ['epochCount', '1']], ['#basisAlpha', 0, ['basisAlpha', '0.00°']],
    ['#epochCount', 8, ['epochCount', '8']], ['#amnesiaM', 0, ['amnesiaM', '0']], ['#basisAlpha', 90, ['basisAlpha', '90.00°']], ['#amnesiaM', 3, ['amnesiaM', '3']]]) {
    await input(sel, v);
    const s = await state(), out = await shown(), exp = expect(s);
    check(`controls: after ${sel} → ${v}, the output reads ${want[1]} and every output and slider matches the state`, out[want[0]][0] === want[1] && same(out, exp), JSON.stringify({ out, exp }));
  }
  const s = await state();
  check('K = 8 on the slider: eight worldlines per relic, 24 records, the Fejér kernel of eight epochs', s.K === 8 && s.leanInstances.raft.records === 24 && near(s.interference, fejerClosed(s.alphaDeg, 8), 1e-10));
}

/* ---------- the handle: drag along the protractor without turning the camera ---------- */
await pick('classic-permission-lock-flip');
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const before = await state(), h = await page.evaluate((n) => window[n].handleBox(), NAME);
  check('α handle: a visible amber button on the protractor at α = θ*', !!h && await page.locator('#lilaHandle').isVisible() && !!before.handle);
  if (h) {
    await page.mouse.move(h.x, h.y); await page.mouse.down();
    check('α handle: pointerdown starts a drag', await page.locator('#lilaHandle').evaluate((el) => el.classList.contains('dragging')));
    for (const v of [38, 33, 28, 24, 20]) { const q = await page.evaluate(([n, x]) => window[n].dragTarget(x), [NAME, v]); await page.mouse.move(q.x, q.y, { steps: 2 }); }
    await page.mouse.up(); await settle(page);
    const after = await state();
    check('α handle: drag sets α ≈ 20° and leaves the camera alone', Math.abs(after.alphaDeg - 20) <= 0.5 && same(after.camera, before.camera) && after.preset === null, `${after.alphaDeg}`);
    checkMath(after, 'after the α drag');
  }
  const a0 = (await state()).alphaDeg;
  await page.locator('#lilaHandle').focus(); await page.keyboard.press('ArrowLeft'); await settle(page);
  const k = await state();
  check('α handle: ← lowers α by 0.1°', near(k.alphaDeg, a0 - 0.1, 1e-9), `${a0} → ${k.alphaDeg}`);
}

/* ---------- drawer, playback ---------- */
await page.click('#infoBtn'); await settle(page);
check('info button opens the theory drawer, with the decoherence MODEL note', await page.locator('#drawer [role="dialog"]').isVisible() && await page.locator('#drawer .lean.model').first().isVisible());
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').isHidden());
check('play advances the rail', await playsAfter(page, () => page.locator('#play').evaluate((b) => b.click()), () => window.BRAHMAN_LILA_DEBUG.state));
await pause();
{ const a = await state(); await settle(page); const b = await state(); check('pause holds the clock', !a.playing && a.t === b.t); }
for (const card of Object.keys(CARDS)) {
  check(`card ${card}: a click plays its story`, await playsAfter(page, () => page.click(`[data-preset="${card}"]`), () => window.BRAHMAN_LILA_DEBUG.state));
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
    return (!st || getComputedStyle(st).display === 'none') && !document.querySelector('#stage #plot') && !!note && note.textContent.length < 140 && !note.querySelector('sub, sup') && !/’s\b/.test(note.textContent);
  }));
  await p.context().close();
}

/* ---------- the stills a chapter prints ---------- */
for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) {
  const p = await openStill(T, BOOK, ID, card, lang), s = await state(p);
  check(`still ${lang}/${card}: paused on the declared frame, no handle`, s.preset === card && !s.playing && near(s.t, CARDS[card].still, 1e-12) && await p.locator('#lilaHandle').isHidden()
    && await p.evaluate(() => TRV.still && TRV.shot && document.documentElement.dataset.trPalette === undefined));
  if (card === 'omniscient-zeno-deadlock') check(`still ${lang}/${card}: Δ = 0, the avatar by the pyramid`, s.schur === 0 && s.near.key === 'pyramid');
  if (card === 'amnesia-birth-open-corridor') check(`still ${lang}/${card}: ψ = 100.8°`, s.psiMod.toFixed(1) === '100.8');
  if (card === 'relic-attractor-deja-vu') check(`still ${lang}/${card}: at the trilithon, I = 0.60`, s.near.key === 'trilithon' && s.interference.toFixed(2) === '0.60');
  if (card === 'classic-permission-lock-flip') check(`still ${lang}/${card}: the lock at 100.00%`, (100 * s.lock).toFixed(2) === '100.00' && near(s.alphaDeg, TSTAR_DEG, 1e-9));
  if (card === 'lila-raft-return-and-new-seed') check(`still ${lang}/${card}: by the classics at 300°`, s.near.key === 'classic300');
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
