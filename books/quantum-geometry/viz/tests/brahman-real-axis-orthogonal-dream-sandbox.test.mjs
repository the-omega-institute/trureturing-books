// BRAHMAN//DREAM browser regression: the shared stage-first gate, then every control, card, view, lens, still and frame,
// and every number the page claims, checked against algorithms written here (J as the map (x, y) ↦ (−y, x), the Born
// weight from explicit dot products, the Möbius normal tracked by finite differences of the ribbon surface, the
// reversal of records from explicit record vectors, the common phase in the complex picture, the Dottie number by
// bisection). Run directly with node; VIZ_SLOW_FRAMES=1000 exercises every transition and playback with sparse frames.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, capitalGreek, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'brahman-real-axis-orthogonal-dream-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
// The published subsection and its stable anchor, shared by the registry and the drawer.
const THEORY = 'ch39-s15-brahman-real-axis-and-orthogonal-dream.html#sec-ch39-brahman-real-axis-and-orthogonal-dream';
const GIDS = [
  'D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary',
  'D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square',
  'D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean',
  'D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq',
  'D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight',
  'D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem',
  'D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint',
  'D5/S3/ObserverMemory/JointCoherentReversal.joint_coherent_reversal',
  'D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal',
  'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift'
];
const CARDS = {
  'turiya-zero-tilt-pure-brahman': { thetaDeg: 0, gramM: 0, deltaAB: 30, view: 'brahman', lens: 'mandukya', drive: 'phase', play: false, still: 0 },
  'waking-consensus-dottie-lock': { thetaDeg: 42.35, gramM: 4, deltaAB: 30, view: 'panorama', lens: 'mandukya', drive: 'phase', play: true, still: 0.5 },
  'insider-double-imaginary-solidity': { thetaDeg: 60, gramM: 4, deltaAB: 30, view: 'insider', lens: 'algebra', drive: 'phase', play: true, still: 0.4 },
  'private-dream-and-seed-sleep': { thetaDeg: 77.5, gramM: 1, deltaAB: 55, view: 'panorama', lens: 'mandukya', drive: 'sleep', play: true, still: 0.5 },
  'kalpa-mobius-lucid-awakening': { thetaDeg: 42.35, gramM: 3, deltaAB: 45, view: 'panorama', lens: 'mandukya', drive: 'kalpa', play: true, still: 0.5 }
};
const DEFAULT_CARD = 'waking-consensus-dottie-lock';
const VIEWS = { panorama: [-0.52, 0.5], brahman: [-0.52, 0], insider: [null, 1.53] };
const D = Math.PI / 180, TAU = 2 * Math.PI;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const vnear = (a, b, tol = 1e-9) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((x, k) => near(x, b[k], tol));
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));

/* ---------- independent algebra, written here and never calling the page ---------- */
const dot = (a, b) => a.reduce((t, x, k) => t + x * b[k], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const len = (a) => Math.sqrt(dot(a, a));
/** J on H_ℝ = ℝ² ⊕ ℝ², as the map (x, y) ↦ (−y, x). */
const Jmap = (v) => [-v[2], -v[3], v[0], v[1]];
/** The zone and the consensus of the Māṇḍūkya reading (the page's MODEL, restated). */
const zone = (t, M) => {
  const matches = [
    ['turiya', t === 0 && M === 0], ['susupti', t === 90 && M === 0],
    ['svapna', t > 45 && t < 90 && [1, 2].includes(M)],
    ['jagrat', Math.round(t * 100) === Math.round(dottie / D * 100) && M >= 3]
  ];
  return matches.find(([, yes]) => yes)?.[0] || 'unmapped';
};
const consensus = (M) => (M >= 3 ? 'lock' : M >= 1 ? 'drift' : 'dissolved');
/** The ribbon of the page, restated, and its unit normal along the centre line tracked continuously from u = 0. */
const R_RIB = 1.2, H_RIB = 0.16, Z_RIB = -0.5;
const ribbon = (u, v) => [R_RIB * Math.cos(u) + v * H_RIB * Math.sin(u / 2) * Math.cos(u), R_RIB * Math.sin(u) + v * H_RIB * Math.sin(u / 2) * Math.sin(u), Z_RIB + v * H_RIB * Math.cos(u / 2)];
function trackedNormal(to, steps = 2000) {
  let prev = null;
  for (let j = 0; j <= steps; j++) {
    const u = to * j / steps, h = 1e-5;
    const du = ribbon(u + h, 0).map((x, k) => (x - ribbon(u - h, 0)[k]) / (2 * h)), dv = ribbon(u, h).map((x, k) => (x - ribbon(u, -h)[k]) / (2 * h));
    let n = cross(du, dv); n = n.map((x) => x / len(n));
    if (prev && dot(n, prev) < 0) n = n.map((x) => -x);
    if (!prev) { const r = [Math.cos(u), Math.sin(u), 0]; if (dot(n, r) < 0) n = n.map((x) => -x); }   // start on the outer face
    prev = n;
  }
  return prev;
}
/** Complex helpers for the reversal of records and the common phase. */
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cabs = (a) => Math.hypot(a[0], a[1]);
const conj = (a) => [a[0], -a[1]];
/** The overlap Σ_a r(0, a)·conj(r(1, a)) of a record given by its two rows of complex amplitudes. */
const overlap01 = (r) => r[0].reduce((t, x, a) => { const u = cmul(x, conj(r[1][a])); return [t[0] + u[0], t[1] + u[1]]; }, [0, 0]);
/** The cosine fixed point by bisection on [0, 1]. */
const dottie = (() => { let a = 0, b = 1; for (let k = 0; k < 200; k++) { const m = (a + b) / 2; if (Math.cos(m) - m > 0) a = m; else b = m; } return (a + b) / 2; })();

const T = await session();
const { page, check } = T;

// independent derivations that do not need the page
{
  const t = 42.35 * D;
  check('maths: at θ = 42.35° cos²θ = 0.5462, sin²θ = 0.4538; at 60° 0.2500, 0.7500; at 77.5° sin²θ = 0.9532', [Math.cos(t) ** 2, Math.sin(t) ** 2, Math.cos(60 * D) ** 2, Math.sin(60 * D) ** 2, Math.sin(77.5 * D) ** 2].map((x) => x.toFixed(4)).join() === '0.5462,0.4538,0.2500,0.7500,0.9532');
  check('maths: cos²30° = 0.7500, cos²45° = 0.5000, cos²55° = 0.3290', [30, 45, 55].map((d) => (Math.cos(d * D) ** 2).toFixed(4)).join() === '0.7500,0.5000,0.3290');
  const v = [0.3, -0.7, 0.2, 0.9];
  check('maths: J² = −1, J preserves length, ⟨v, Jv⟩ = 0', vnear(Jmap(Jmap(v)), v.map((x) => -x), 1e-15) && near(len(Jmap(v)), len(v), 1e-15) && Math.abs(dot(v, Jmap(v))) < 1e-15);
  const n0 = trackedNormal(0), n1 = trackedNormal(TAU), n2 = trackedNormal(2 * TAU);
  check('maths: the normal carried once round the Möbius ribbon comes back reversed, twice round it comes back', vnear(n1, n0.map((x) => -x), 1e-6) && vnear(n2, n0, 1e-6));
  check('maths: the Dottie number 42.3465°, cos²θ* = 0.5462', (dottie / D).toFixed(4) === '42.3465' && (Math.cos(dottie) ** 2).toFixed(4) === '0.5462');
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
  await context.exposeBinding('__brahmanPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__brahmanPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__brahmanPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined,
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
  [115, 111, 110, 110, 101, 116], [104, 97, 105, 107, 117], [108, 108, 109], [97, 103, 101, 110, 116], [99, 104, 97, 116, 98, 111, 116],
  [100, 101, 101, 112, 109, 105, 110, 100]
].map((codes) => String.fromCharCode(...codes));
const identifiers = new RegExp(`\\b(?:${forbidden.join('|')}|${numbered}-?\\d)\\b`, 'i');
const shortAcronym = new RegExp(`\\b${String.fromCharCode(65, 73)}\\b`);
const cjkWords = new RegExp([[22823, 27169, 22411], [26234, 33021, 20307], [20154, 24037, 26234, 33021]].map((c) => String.fromCharCode(...c)).join('|'));
for (const [file, src] of Object.entries(sources)) {
  check(`source ${file}: no literal colour and no palette switch`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(src) && !/\btrPalette\b|data-tr-palette/.test(src));
  check(`source ${file}: no model, vendor or tool identifiers`, !identifiers.test(src) && !shortAcronym.test(src) && !cjkWords.test(src));
}
check('suite: no model, vendor or tool identifiers', !identifiers.test(suite.replace(/\[[\d, ]+\]/g, '')) && !shortAcronym.test(suite) && !cjkWords.test(suite.replace(/\[[\d, ]+\]/g, '')));
check('source: no grid-template-columns in the page stylesheet (the lab keeps its shared three columns)', !/grid-template-columns\s*:/i.test(sources['style.css']));
check('source: #stage is an inline-size container and .hud-tl has no fixed top', /#stage\s*\{[^}]*container-type:\s*inline-size/.test(sources['style.css']) && !/\.hud-tl[^{]*\{[^}]*\btop\s*:/.test(sources['style.css']));
check('source: kit.solid without wheel zoom, kit.clock looping', /wheel:\s*false/.test(sources['main.js']) && /loop:\s*true/.test(sources['main.js']));
check('source: the five cards in their public order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1]), Object.keys(CARDS)));
check('source: the three views as scene chips', same([...sources['index.html'].matchAll(/data-view="([^"]+)"/g)].map((m) => m[1]), ['panorama', 'brahman', 'insider'])
  && /class="chips scene-chips" id="viewChips"/.test(sources['index.html']));
check('source: the page loads only the shared runtime and its own files', same([...sources['index.html'].matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]), ['../assets/shell.js', '../assets/kit.js', 'main.js']));
check('source: no .okmark anywhere (no green tick outside the Lean boxes)', !/okmark/.test(sources['index.html'] + sources['main.js'] + sources['style.css']));
check('source: green and red stay off the stage (no ok or warn colour in the page code)', !/P\.ok\b|P\.warn\b|var\(--ok\)|var\(--warn\)|var\(--red\)|c-ok\b|c-wn\b|sw (?:ok|wn)\b/.test(sources['main.js'] + sources['style.css']));
{
  const rules = [...sources['style.css'].matchAll(/([^{}]+)\{([^}]*)\}/g)].filter((m) => /--amber/.test(m[2])).map((m) => m[1].trim());
  check('source: --amber only in the rules of the active lens half and the handle', rules.length > 0 && rules.every((sel) => /lens-toggle\[aria-pressed|\.handle/.test(sel)), JSON.stringify(rules));
  const lines = sources['main.js'].split('\n').filter((l) => /P\.amber/.test(l));
  check('source: P.amber only on the state Ψ (arrow and bead) and the strip cursor', lines.length === 3 && lines.filter((l) => /sc\.arrow\(ORIGIN, tip/.test(l)).length === 1
    && lines.filter((l) => /sc\.bead\(tip/.test(l)).length === 1 && lines.filter((l) => /g\.vline\(m\.thetaDeg/.test(l)).length === 1, lines.join(' | '));
  check('source: no amber colour in the page markup (no c-am class, amber swatch or --amber), none named in the page code', !/\bc-am\b|\bsw am\b|--amber/.test(sources['index.html']) && !/\bc-am\b|'am'|--amber/.test(sources['main.js']));
}
{
  const zh = (sources['index.html'].match(/class="(?:[^"]*\s)?zh(?:\s[^"]*)?"/g) || []).length, en = (sources['index.html'].match(/class="(?:[^"]*\s)?en(?:\s[^"]*)?"/g) || []).length;
  check('source: as many .zh as .en elements', zh === en && zh > 0, `${zh} zh / ${en} en`);
}
check('suite: no fixed waits', !new RegExp('wait' + 'ForTimeout').test(suite));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID);
check('registry: live §38.7 entry with five bilingual cards and the ten theorems', !!entry && entry.status === 'live' && entry.chapter === 38 && entry.section === '38.7'
  && entry.code === 'BRAHMAN//DREAM' && same(entry.presets, Object.keys(CARDS)) && entry.presets.every((c) => entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same(entry.lean.map((x) => x.gid).sort(), [...GIDS].sort()) && entry.tags.length === entry.tags_en.length && entry.capture_lock === 'links'
  && entry.theory[0].href === `../zh/${THEORY}` && entry.theory[0].href_en === `../en/${THEORY}`);
check('registry: every Lean GID is pure ASCII', entry.lean.every((x) => /^[\x21-\x7e]+$/.test(x.gid)));
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
  check(`chapter ${lang}: every green page GID belongs to this subsection's theorem`, GIDS.every((gid) => theoremGids.includes(gid)));
  check(`chapter ${lang}: stable theory anchor and explicit test dependency`, chapter.includes(`{#${THEORY.split('#')[1]}}`)
    && deps.includes(`books/${BOOK}/${lang}/${THEORY.split('#')[0].replace(/\.html$/, '.md')}`));
}
check('chapter: identical card order and full-lab position in both editions', same(chapterBlocks[0], chapterBlocks[1]));
check('inner-product boundary: real block geometry, standard complex embedding and J-induced complex scalars stay distinct',
  sources['index.html'].includes('I 与 JI 的该权重为 1') && sources['index.html'].includes('standard ℂ⁴')
  && sources['index.html'].includes('J-induced ℂ²'));


/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.BRAHMAN_DREAM_DEBUG.state);
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
  await until(p, (id) => { const s = window.BRAHMAN_DREAM_DEBUG.state; return s.preset === id && !s.blending && !s.cameraMoving; }, card);
  await pause(p);
}
async function seek(t, p = page) {
  await p.locator('#now').evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, t);
  await settle(p);
}
const stillT = (c) => CARDS[c].still;

/** Every number of a state against the algorithms of this file. */
function checkMath(s, tag) {
  const th = s.theta, c = Math.cos(th), sn = Math.sin(th), phi = Math.PI + 2 * TAU * s.tau;
  check(`${tag}: θ in radians, the sleep drive sets θ = 65° + 25°τ`, near(th, s.thetaDeg * D, 1e-15) && (s.drive !== 'sleep' || near(s.thetaDeg, 65 + 25 * s.tau, 1e-9)));
  check(`${tag}: the budget cos²θ + sin²θ = 1, the zone and the consensus of the reading`, near(s.cos2 + s.sin2, 1, 1e-15) && near(s.budget, 1, 1e-15) && s.zone === zone(s.thetaDeg, s.gramM) && s.consensus === consensus(s.gramM));
  // H_ℝ: I = (1, 0, 0, 0), I(τ) = (cos φ, sin φ, 0, 0), Ψ = cos θ I − sin θ J I(τ)
  const Itau = [Math.cos(phi), Math.sin(phi), 0, 0], JI = Jmap(Itau), Psi = [1, 0, 0, 0].map((x, k) => c * x - sn * JI[k]);
  check(`${tag}: Ψ = cos θ·I − sin θ·J I(τ), φ = 180° + 720°τ, a unit vector with ⟨I, Ψ⟩ = cos θ`, vnear(s.Psi4, Psi, 1e-12) && vnear(s.JItau, JI, 1e-12) && near(len(s.Psi4), 1, 1e-12) && near(s.overlapIPsi, c, 1e-12)
    && vnear(s.Psi, [Psi[2], Psi[3], Psi[0]], 1e-12));
  const drift = consensus(s.gramM) === 'drift' ? ({ 1: 18, 2: 9 })[s.gramM] * Math.sin(2 * TAU * s.tau) : 0;
  const delta = Math.min(180, Math.max(0, s.deltaAB + drift));
  check(`${tag}: the dream angle Δ = Δθ_AB, drifting by (18°/M) sin ϑ only for M = 1, 2`, near(s.delta, delta, 1e-9) && near(s.drift, drift, 1e-12));
  const aA = phi + Math.PI / 2, uA = [Math.cos(aA), Math.sin(aA), 0, 0], uB = [Math.cos(aA + delta * D), Math.sin(aA + delta * D), 0, 0];
  const pA = Jmap(uA), pB = Jmap(uB);
  check(`${tag}: ψ_A = J u_A, ψ_B = J u_B lie in the dream coordinates, ⟨I, ψ_A⟩ = 0`, vnear(s.psiA4, pA, 1e-12) && vnear(s.psiB4, pB, 1e-12) && s.psiA4[0] === 0 && s.psiA4[1] === 0
    && Math.abs(s.overlapIA) === 0 && near(s.alphaA, aA, 1e-12));
  check(`${tag}: ⟨ψ_A, ψ_B⟩² = ⟨u_A, u_B⟩² = cos²Δ ≥ 0`, near(s.born, dot(pA, pB) ** 2, 1e-12) && near(s.born, Math.cos(delta * D) ** 2, 1e-12) && near(s.gramPsiPsi, s.gramUU, 1e-12) && s.born >= 0);
  check(`${tag}: the sea has radius sin θ, the dream contents sit at 0.82 sin θ`, near(s.seaRadius, sn, 1e-15) && near(s.dreamRadius, 0.82 * sn, 1e-15));
  const vt = 2 * TAU * s.tau, n = trackedNormal(vt, Math.max(200, Math.round(2000 * s.tau)));
  check(`${tag}: the spinor at ϑ = 720°τ, its lift e^{iϑ/2}, its flag the tracked Möbius normal`, near(s.vartheta, vt, 1e-12) && vnear(s.lift, [Math.cos(vt / 2), Math.sin(vt / 2)], 1e-12)
    && vnear(s.flag, n, 1e-5) && vnear(s.spinorAt, ribbon(vt, 0), 1e-12) && s.ribbon.radius === R_RIB && s.ribbon.halfWidth === H_RIB && s.ribbon.z === Z_RIB);
  check(`${tag}: e^{−2θ} is the comparison curve`, near(s.eRef, Math.exp(-2 * th), 1e-15));
  // the instances of the Lean theorems
  const L = s.leanInstances;
  check(`${tag}: J is skew-adjoint and unitary with J² = −1 and JᵀJ = 1`, L.blockJ.skewAdjoint === 0 && L.blockJ.unitary === 0 && L.blockJ.square === 0 && L.blockJ.gramIdentity === 0
    && same(s.J, [[0, 0, -1, 0], [0, 0, 0, -1], [1, 0, 0, 0], [0, 1, 0, 0]]));
  check(`${tag}: the balanced split at 45°: AAᴴ = ½, BᴴB = ½, ABᴴ + BAᴴ = 0, 2ABᴴ = J, (2ABᴴ)² = −1`, [L.relative.halfA, L.relative.halfB, L.relative.cross, L.relative.isJ, L.relative.square].every((x) => x < 1e-15));
  check(`${tag}: pinching: 1 = (cos⁴θ + sin⁴θ) + 2cos²θ sin²θ`, near(L.pinching.total, 1, 1e-14) && near(L.pinching.kept, c ** 4 + sn ** 4, 1e-14) && near(L.pinching.discarded, 2 * c * c * sn * sn, 1e-14)
    && L.pinching.residual < 1e-15 && near(L.pinching.rho01, -c * sn, 1e-15));
  check(`${tag}: equal Gram matrices AᵀA = (JA)ᵀ(JA), JA − J·A = 0, J unitary`, L.gram.equal < 1e-15 && L.gram.image === 0 && L.gram.unitary === 0 && near(L.gram.gramA[0][1], Math.cos(delta * D), 1e-12));
  check(`${tag}: Born weight Tr(ρ_B P_A) = cos²Δ, the two outcomes sum to 1, the unread state decomposes; the record I reads ψ_A with weight 0`, near(L.bornWeight.weight, Math.cos(delta * D) ** 2, 1e-12)
    && near(L.bornWeight.sum, 1, 1e-12) && L.bornWeight.unreadResidual < 1e-12 && Math.abs(L.bornWeight.weightOfI) < 1e-15);
  // the common phase in the complex picture z = x + iy
  const toC = (v) => [[v[0], v[2]], [v[1], v[3]]], a = toC(pA), z = toC(pB);
  const p = (w) => { let t = [0, 0]; for (let k = 0; k < 2; k++) { const u = cmul(conj(a[k]), w[k]); t = [t[0] + u[0], t[1] + u[1]]; } return t[0] ** 2 + t[1] ** 2; };
  const q = (w) => { let t = [0, 0]; for (let k = 0; k < 2; k++) { const u = cmul(a[k], w[k]); t = [t[0] + u[0], t[1] + u[1]]; } return cmul(t, t); };
  const turned = (w, al) => w.map((x) => cmul([Math.cos(al), Math.sin(al)], x));
  check(`${tag}: common phase: p = |⟨ψ_A, z⟩|² is unchanged by every common phase (J included), q = (Σ a_k z_k)² turns by e^{2iα}`,
    near(L.commonPhase.p, p(z), 1e-12) && L.commonPhase.alphas.every((al, k) => near(L.commonPhase.pAfter[k], p(turned(z, al)), 1e-12) && near(L.commonPhase.pAfter[k], p(z), 1e-12))
    && L.commonPhase.qRotates < 1e-12 && L.commonPhase.alphas.every((al, k) => vnear(L.commonPhase.qAfter[k], q(turned(z, al)), 1e-12)) && near(L.commonPhase.hermitian[0], p(z), 1e-12) && Math.abs(L.commonPhase.hermitian[1]) < 1e-12);
  check(`${tag}: the Dottie instance`, L.dottie.residual < 1e-15 && L.dottie.inUnit && L.dottie.roots === 1 && near(L.dottie.theta, dottie, 1e-12));
  // records: M phase-only copies e^{iχ_k} and one which-path copy (cos Δ, sin Δ)
  const rho01 = -c * sn;
  let written = [rho01, 0], restored;
  const recs = Array.from({ length: s.gramM }, (_, k) => [[[1, 0], [0, 0]], [[Math.cos(0.7 + 1.3 * k), Math.sin(0.7 + 1.3 * k)], [0, 0]]]);
  for (const r of recs) written = cmul(overlap01(r), written);
  restored = written; for (const r of recs) restored = cmul(overlap01(r.map((row) => row.map(conj))), restored);
  const which = [[[1, 0], [0, 0]], [[Math.cos(delta * D), 0], [Math.sin(delta * D), 0]]];
  let blocked = cmul(overlap01(which), written); for (const r of recs) blocked = cmul(overlap01(r.map((row) => row.map(conj))), blocked);
  check(`${tag}: joint reversal of the M phase records restores ρ₀₁; a kept which-path copy leaves |ρ₀₁|·|1 − cos Δ|`, recs.every((r) => near(cabs(overlap01(r)), 1, 1e-12)) && L.reversal.unimodular
    && L.reversal.restoredResidual < 1e-14 && Math.hypot(restored[0] - rho01, restored[1]) < 1e-14 && near(L.reversal.blockedResidual, Math.hypot(blocked[0] - rho01, blocked[1]), 1e-12)
    && near(L.reversal.blockedResidual, Math.abs(rho01) * Math.abs(1 - Math.cos(delta * D)), 1e-12) && near(L.reversal.rho01, rho01, 1e-15) && L.reversal.copies === s.gramM);
  // continue a square root of e^{iv} from 1 along v ∈ [0, ϑ], choosing at each step the root nearer the last one
  let prev = [1, 0];
  for (let j = 1; j <= 400; j++) {
    const v = vt * j / 400, r = [Math.cos(Math.atan2(Math.sin(v), Math.cos(v)) / 2), Math.sin(Math.atan2(Math.sin(v), Math.cos(v)) / 2)], alt = [-r[0], -r[1]];
    prev = Math.hypot(r[0] - prev[0], r[1] - prev[1]) <= Math.hypot(alt[0] - prev[0], alt[1] - prev[1]) ? r : alt;
  }
  check(`${tag}: the double cover: (e^{iϑ/2})² = e^{iϑ}, the continuation from 1 ends at the page's lift, −1 after one turn, +1 after two`, L.doubleCover.liftResidual < 1e-12 && L.doubleCover.contResidual < 1e-9
    && vnear(prev, s.lift, 1e-6) && near(L.doubleCover.atOneTurn[0], -1, 1e-15) && near(L.doubleCover.atTwoTurns[0], 1, 1e-15));
}

async function checkLinks(p, tag) {
  check(`${tag}: exactly the ten green Lean links, in #evidence`, same(await p.$$eval('[data-lean-gid]', (els) => els.map((e) => e.dataset.leanGid).sort()), [...GIDS].sort())
    && await p.$$eval('[data-lean-gid]', (els) => els.every((e) => e.closest('.col.side #evidence .lean') && e.closest('.lean').querySelector('.ok').textContent.trim() === 'LEAN ✓')));
  check(`${tag}: one MODEL and one NUM box, no OPEN, no ARGUED`, await p.evaluate(() => document.querySelectorAll('#evidence .lean.model').length === 1 && document.querySelectorAll('#evidence .lean.num').length === 1
    && document.querySelectorAll('#evidence .lean.open, #evidence .lean.argued').length === 0 && document.querySelectorAll('#evidence .lean:not(.model):not(.num):not(.frozen)').length === 10));
  check(`${tag}: the MODEL box frames the Māṇḍūkya mapping and the solidity inside the dream`, await p.evaluate(() => { const t = document.querySelector('#evidence .lean.model').textContent; return /Māṇḍūkya/.test(t) && /Turīya/.test(t) && /(诠释|interpretation)/.test(t) && /(虚虚得实|two imaginaries make a real)/.test(t); }));
  check(`${tag}: bilingual chapter link in the drawer`, same(await p.$$eval('#drawer .refs a', (els) => els.map((e) => e.getAttribute('href')).sort()), ['zh', 'en'].map((l) => `../../${l}/${THEORY}`).sort()));
}
const colourAudit = (p) => p.evaluate(() => {
  const probe = (v) => { const e = document.createElement('span'); e.style.color = `var(${v})`; document.body.appendChild(e); const c = getComputedStyle(e).color; e.remove(); return c; };
  const amber = probe('--amber'), ok = probe('--ok'), warn = probe('--warn');
  const bad = [];
  const look = (sel, what) => document.querySelectorAll(sel).forEach((el) => { const cs = getComputedStyle(el); for (const c of [cs.color, cs.backgroundColor, cs.borderTopColor]) if (c === amber || c === ok || c === warn) bad.push(`${what}: ${el.className || el.tagName}`); });
  look('dl.ro, dl.ro *', 'readout'); look('.field output', 'slider output'); look('#legend .sw', 'legend swatch'); look('#legend span', 'legend text');
  look('.tagline em', 'tagline'); look('#drawer b', 'drawer bold'); look('#stage .tag, #stage .tag *', 'stage label'); look('.strip h2, #plotMeta', 'strip text');
  return bad;
});

/* ---------- runtime contract ---------- */
await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
await checkLinks(page, 'runtime');
check('layout: the shared three-column lab, the stage and the strip in the middle', await page.evaluate(() => {
  const app = document.querySelector('.app.lab'), deck = app.querySelector(':scope > .deck'), center = app.querySelector(':scope > .center'), side = app.querySelector(':scope > .side');
  const d = deck.getBoundingClientRect(), c = center.getBoundingClientRect(), s = side.getBoundingClientRect();
  return getComputedStyle(app).gridTemplateColumns.trim().split(/\s+/).length === 3 && d.right <= c.left + 1 && c.right <= s.left + 1
    && !!center.querySelector(':scope > #stage') && !!center.querySelector(':scope > .tour#tour') && center.querySelectorAll(':scope > .strip').length === 1 && !!center.querySelector(':scope > .strip #plot')
    && !document.querySelector('#stage #plot') && !!side.querySelector(':scope > #readouts dl.ro') && !!side.querySelector(':scope > #evidence')
    && !!document.querySelector('#stage[data-thumb] > canvas#cv') && document.querySelector('#stage > button.handle#thetaHandle[type="button"]') !== null && !!document.querySelector('footer.rail #now');
}));
check('layout: #rail holds the lens toggle, the cards with their note, then #ctlPanel with the view chips and three sliders', await page.evaluate(() => {
  const deck = document.querySelector('.app.lab > aside.col.deck#rail'), lens = document.querySelector('#lensToggleBtn.lens-toggle'), cards = document.querySelector('.presets.cards#presets');
  const ctl = document.querySelector('#ctlPanel'), F = Node.DOCUMENT_POSITION_FOLLOWING;
  return !!deck && deck.contains(lens) && deck.contains(cards) && deck.contains(ctl) && !!(lens.compareDocumentPosition(cards) & F) && !!(cards.compareDocumentPosition(ctl) & F)
    && ctl.contains(document.querySelector('.chips.scene-chips#viewChips')) && document.querySelectorAll('#viewChips [data-view]').length === 3
    && document.querySelectorAll('#ctlPanel input[type=range]').length === 3 && !document.querySelector('#stage .hud-tr');
}));
check('layout: #infoBtn is the first child of #evidence, the only one, above every evidence box', await page.evaluate(() => {
  const ev = document.querySelector('.app.lab > aside.col.side > #evidence'), btn = document.querySelector('#infoBtn');
  const boxes = [...ev.querySelectorAll('.lean')], top = btn.getBoundingClientRect();
  return document.querySelectorAll('#infoBtn').length === 1 && ev.firstElementChild === btn && btn.matches('button.chip[type="button"]') && boxes.length === 12
    && boxes.every((b) => top.bottom <= b.getBoundingClientRect().top + 0.5);
}));
check('layout: dl.ro holds one key row and five rows', await page.evaluate(() => document.querySelectorAll('dl.ro > div.key').length === 1 && document.querySelectorAll('dl.ro > div').length === 6));
check('layout: the lens toggle names both readings, the Māṇḍūkya one pressed false', await page.evaluate(() => {
  const b = document.querySelector('#lensToggleBtn'), t = b.textContent;
  return b.getAttribute('aria-pressed') === 'false' && /《蛙氏奥义书》四位意识与劫波呼吸/.test(t) && /实块复结构 J 代数与格拉姆共识锁/.test(t) && /Māṇḍūkya 4-State & Kalpa Breath/.test(t) && /Block-J Algebra & Gram Consensus/.test(t);
}));
check('layout: opens on the default card at its still, paused, in the panorama', await page.evaluate((card) => { const s = window.BRAHMAN_DREAM_DEBUG.state; return s.preset === card && s.t === 0.5 && !s.playing && s.view === 'panorama'; }, DEFAULT_CARD));
check('sliders: θ over [0, 90] step 0.01 (42.35), M over [0, 6] step 1 (4), Δθ_AB over [0, 90] step 1 (30)', await page.evaluate(() => {
  const t = document.querySelector('#thetaDeg'), m = document.querySelector('#gramM'), d = document.querySelector('#deltaAB');
  return t.min === '0' && t.max === '90' && t.step === '0.01' && Number(t.value) === 42.35 && m.min === '0' && m.max === '6' && m.step === '1' && Number(m.value) === 4
    && d.min === '0' && d.max === '90' && d.step === '1' && Number(d.value) === 30;
}));
{ const bad = await colourAudit(page); check('colours: no amber, green or red on readouts, slider outputs, legend, tagline, drawer bold, stage labels or strip text', bad.length === 0, bad.slice(0, 4).join(' | ')); }
check('stage: no warn-red or ok-green label or swatch', await page.evaluate(() => !document.querySelector('#stage .c-wn, #stage .sw.wn, #stage .c-ok, #stage .sw.ok, #stage .c-am, #stage .sw.am')));
check('handle: a type=button with z-index 3', await page.evaluate(() => { const h = document.querySelector('#thetaHandle'); return h.type === 'button' && getComputedStyle(h).zIndex === '3'; }));
{ const s = await state(); checkMath(s, 'opening frame'); }

/** The camera of a view (insider: co-rotating with ψ_A). */
const viewOk = (s, view) => view === 'insider' ? near(wrap(s.camera.yaw + s.alphaA - Math.PI / 2), 0, 1e-9) && near(s.camera.pitch, VIEWS.insider[1], 1e-9)
  : near(s.camera.yaw, VIEWS[view][0], 1e-9) && near(s.camera.pitch, VIEWS[view][1], 1e-9);

/* ---------- every card, both languages ---------- */
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  for (const card of Object.keys(CARDS)) {
    await pick(card);
    await seek(stillT(card));
    const s = await state(), c = CARDS[card];
    check(`${lang}/${card}: the card sets θ, M, Δθ_AB, view, lens and drive, paused at its still`, s.preset === card && s.gramM === c.gramM && s.deltaAB === c.deltaAB && s.view === c.view && s.lens === c.lens
      && s.drive === c.drive && !s.playing && near(s.tau, stillT(card), 1e-12) && near(s.thetaDeg, c.thetaDeg, 1e-9) && String(await page.getAttribute(`[data-preset="${card}"]`, 'data-still')) === String(c.still)
      && viewOk(s, c.view) && await page.getAttribute(`#viewChips [data-view="${c.view}"]`, 'aria-pressed') === 'true' && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === String(c.lens === 'algebra'));
    checkMath(s, `${lang}/${card}`);
    const v = await stageView(page, '#stage', false), lo = await labelOverlaps(page, '.stage .tag', 0);
    check(`${lang}/${card}: desktop stage, HUD and labels clear`, v.layout.length === 0 && v.hud.length === 0 && lo.length === 0, [...v.layout, ...v.hud, ...lo.map((x) => x.join(' / '))].join(' | '));
  }
}
await page.click('[data-lang-set="zh"]'); await settle(page);

// the numbers the card notes name
await pick('turiya-zero-tilt-pure-brahman');
{ const s = await state(); check('card 1 note: θ = 0, Ψ = I, cos²θ = 1, sin²θ = 0, the sea of radius 0, M = 0, edge-on', s.zone === 'turiya' && vnear(s.Psi4, [1, 0, 0, 0], 1e-15) && s.cos2 === 1 && s.sin2 === 0
  && s.seaRadius === 0 && s.gramM === 0 && s.consensus === 'dissolved' && s.camera.pitch === 0); }
await pick('waking-consensus-dottie-lock');
{ const s = await state(); check('card 2 note: θ ≈ θ*, cos²θ = 0.5462, sin²θ = 0.4538, four windows lock, cos²30° = 0.7500', s.zone === 'jagrat' && s.cos2.toFixed(4) === '0.5462' && s.sin2.toFixed(4) === '0.4538'
  && s.consensus === 'lock' && s.gramM === 4 && s.born.toFixed(4) === '0.7500' && Math.abs(s.thetaDeg - s.dottieTheta / D) < 0.01); }
for (const t of [0, 0.25, 0.7]) { await seek(t); const s = await state(); check(`card 2: as the rail turns the sea (τ = ${t}) the budget and the locked comparison stay`, near(s.budget, 1, 1e-15) && s.born.toFixed(4) === '0.7500' && s.drift === 0); }
await pick('insider-double-imaginary-solidity');
{
  const s = await state();
  check('card 3 note: θ = 60°, insider and co-rotating, ⟨I, ψ_A⟩ = 0, ⟨ψ_A, ψ_B⟩² = 0.7500', near(s.thetaDeg, 60, 1e-9) && viewOk(s, 'insider') && s.overlapIA === 0 && s.born.toFixed(4) === '0.7500' && s.lens === 'algebra');
  await seek(0.1); const a = await state(); await seek(0.8); const b = await state();
  check('card 3: the insider camera turns with ψ_A as the rail runs (yaw + α_A fixed)', viewOk(a, 'insider') && viewOk(b, 'insider') && !near(a.camera.yaw, b.camera.yaw, 1e-3));
}
await pick('private-dream-and-seed-sleep');
await seek(0.5);
{ const s = await state(); check('card 4 note: M = 1 drifts, at τ = 0.5 θ = 77.5°, sin²θ = 0.9532, Δ = 55°', s.consensus === 'drift' && near(s.thetaDeg, 77.5, 1e-9) && s.sin2.toFixed(4) === '0.9532' && near(s.delta, 55, 1e-9) && s.zone === 'svapna'); }
{ await seek(0.125); const s = await state(); check('card 4: the drift reaches +18° at ϑ = 90°', near(s.drift, 18, 1e-9) && near(s.delta, 73, 1e-9)); }
{ await seek(1); const s = await state(); check('card 4 at τ = 1: θ = 90°, deep sleep, Ψ lies in the sea', s.thetaDeg === 90 && s.zone === 'susupti' && s.gramM === 0 && s.consensus === 'dissolved' && Math.abs(s.cos) < 1e-15);
  check('sleep endpoint: active comparisons and their labels are removed, the sea and budget remain',
    s.labels.every((l) => !/ψ<sub>[AB]<\/sub>|cos²Δ/.test(l.text)) && near(s.budget, 1, 1e-15)
    && await page.locator('#roNote').evaluate((el) => /M_act = 0/.test(el.textContent))
    && await page.locator('#gramM').inputValue() === '0'); }
await pick('kalpa-mobius-lucid-awakening');
await seek(0.5);
{
  const s = await state(); await seek(0); const s0 = await state();
  check('card 5 note: at ϑ = 360° the dream is back where it was (Ψ, ψ_A, ψ_B) but the spinor reads −1; θ stays 42.35°', near(s.vartheta, TAU, 1e-12) && near(s.lift[0], -1, 1e-12) && near(s.thetaDeg, 42.35, 1e-9)
    && vnear(s.Psi4, s0.Psi4, 1e-12) && vnear(s.psiA4, s0.psiA4, 1e-12) && vnear(s.psiB4, s0.psiB4, 1e-12) && vnear(s.flag, s0.flag.map((x) => -x), 1e-12) && near(s0.lift[0], 1, 1e-15));
}
{ await seek(1); const s = await state(); check('card 5 at τ = 1: ϑ = 720°, the spinor back at +1', near(s.lift[0], 1, 1e-12) && near(s.vartheta, 2 * TAU, 1e-12)); }
// the spinor tag prints the whole lift e^{iϑ/2}, a unit complex number (at ϑ = 180° it is +i, not its real part 0.00), the value the readout shows
{
  /** +1, −1, +i, −i or "re ± im i" (U+2212 minus) back to a complex number. */
  const parseC = (t) => {
    const card = { '+1': [1, 0], '−1': [-1, 0], '+i': [0, 1], '−i': [0, -1] }[t];
    if (card) return card;
    const m = t.match(/^(−?\d+\.\d+) ([+−]) (\d+\.\d+)i$/);
    return m ? [Number(m[1].replace('−', '-')), (m[2] === '−' ? -1 : 1) * Number(m[3])] : null;
  };
  const want = [[0, '+1'], [0.125, '0.71 + 0.71i'], [0.25, '+i'], [0.375, '−0.71 + 0.71i'], [0.5, '−1'], [0.625, '−0.71 − 0.71i'], [0.75, '−i'], [0.875, '0.71 − 0.71i'], [1, '+1']];
  for (const [t, z] of want) {
    await seek(t);
    const s = await state(), deg = Math.round(720 * t), lift = [Math.cos(deg * D / 2), Math.sin(deg * D / 2)];
    const tag = s.labels.find((l) => /iϑ\/2/.test(l.text)), val = tag ? parseC(tag.text.replace(/^.* = /, '')) : null;
    const ro = await page.innerHTML('#roSpinor'), roVal = parseC(ro.replace(/^.* = /, ''));
    check(`card 5 at τ = ${t}: the spinor tag reads ϑ = ${deg}° · e^{iϑ/2} = ${z}, within 0.005 of (cos ϑ/2, sin ϑ/2) and of the readout`,
      !!tag && tag.text === `ϑ = ${deg}° · e<sup>iϑ/2</sup> = ${z}` && !!val && !!roVal && vnear(val, lift, 0.005 + 1e-12) && vnear(val, roVal, 0.005 + 1e-12) && vnear(s.lift, lift, 1e-12),
      `${tag ? tag.text : 'no spinor tag'} | ${ro}`);
  }
}

/* ---------- every control ---------- */
await pick(DEFAULT_CARD);
for (const v of [0, 30, 42.35, 45, 60, 89, 90]) {
  await input('#thetaDeg', v);
  const s = await state();
  check(`slider θ = ${v}: leaves the card, sets the tilt and the zone`, s.preset === null && near(s.thetaDeg, v, 1e-9) && s.zone === zone(v, s.gramM) && s.drive === 'phase');
  checkMath(s, `θ = ${v}`);
}
check('joint phases: the private dream requires 45° < θ < 90° and M = 1 or 2; 60°/M=4 and 90°/M=1 remain unmapped',
  zone(45, 1) === 'unmapped' && zone(45.01, 1) === 'svapna' && zone(60, 4) === 'unmapped'
  && zone(90, 1) === 'unmapped' && zone(90, 0) === 'susupti');
for (const [theta, M, expected] of [[0, 0, 'turiya'], [45, 1, 'unmapped'], [45.01, 1, 'svapna'], [60, 4, 'unmapped'], [90, 1, 'unmapped'], [90, 0, 'susupti'], [42.34, 4, 'unmapped'], [42.35, 4, 'jagrat'], [42.36, 4, 'unmapped']]) {
  await input('#thetaDeg', theta); await input('#gramM', M);
  check(`joint phase controls: θ=${theta}°, M=${M} gives ${expected}`, (await state()).zone === expected);
}
await input('#thetaDeg', 42.35);
for (const m of [0, 1, 2, 3, 6]) {
  await input('#gramM', m);
  const s = await state();
  check(`slider M = ${m}: ${consensus(m)}`, s.gramM === m && s.consensus === consensus(m) && s.leanInstances.reversal.copies === m);
  checkMath(s, `M = ${m}`);
}
await input('#gramM', 4);
for (const d of [0, 30, 90]) {
  await input('#deltaAB', d);
  const s = await state();
  check(`slider Δθ_AB = ${d}: the comparison is cos²Δ`, s.deltaAB === d && near(s.born, Math.cos(d * D) ** 2, 1e-12));
  checkMath(s, `Δθ_AB = ${d}`);
}
await input('#deltaAB', 30);
// lens: the same state, two readings
{
  const before = await state();
  await page.click('#lensToggleBtn'); await settle(page);
  const a = await state();
  check('lens toggle: to the block-J algebra, the same θ, M, Δθ_AB and τ, aria-pressed true', a.lens === 'algebra' && a.thetaDeg === before.thetaDeg && a.gramM === before.gramM && a.deltaAB === before.deltaAB
    && a.tau === before.tau && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === 'true');
  check('lens toggle: the algebra lens labels J² = −1 and ⟨I, ψ_A⟩ = 0 on the stage', await page.evaluate(() => { const t = [...document.querySelectorAll('#stage .tag')].filter((e) => !e.hidden).map((e) => e.textContent).join(' | '); return /J² = −1/.test(t) && /⟨I, ψA⟩ = 0\.000000/.test(t); }));
  await page.click('#lensToggleBtn'); await settle(page);
  check('lens toggle: back to the Māṇḍūkya reading with its zone marks', (await state()).lens === 'mandukya' && await page.evaluate(() => /Turīya/.test([...document.querySelectorAll('#stage .tag')].filter((e) => !e.hidden).map((e) => e.textContent).join(' '))));
}
// views: smooth moves, then the camera of each view
for (const view of ['brahman', 'insider', 'panorama']) {
  const seen = await page.evaluate((v) => new Promise((resolve) => {
    const vals = [];
    const tick = () => { const s = window.BRAHMAN_DREAM_DEBUG.state; vals.push(s.camera.pitch); if (!s.cameraMoving && vals.length > 1 || vals.length > 600) resolve(vals); else requestAnimationFrame(tick); };
    document.querySelector(`#viewChips [data-view="${v}"]`).click(); requestAnimationFrame(tick);
  }), view);
  await settle(page);
  const s = await state();
  check(`view ${view}: the chip moves the camera there`, s.view === view && viewOk(s, view) && await page.getAttribute(`#viewChips [data-view="${view}"]`, 'aria-pressed') === 'true');
  check(`view ${view}: through intermediate camera angles`, seen.length <= 2 || seen.some((x) => Math.abs(x - seen[0]) > 1e-3 && Math.abs(x - s.camera.pitch) > 1e-3), JSON.stringify(seen.slice(0, 6)));
  const v = await stageView(page, '#stage', false), lo = await labelOverlaps(page, '.stage .tag', 0);
  check(`view ${view}: stage, HUD and labels clear`, v.layout.length === 0 && v.hud.length === 0 && lo.length === 0, [...v.layout, ...v.hud, ...lo.map((x) => x.join(' / '))].join(' | '));
  if (view === 'brahman') check('view brahman: pitch 0, the sea projects to zero thickness (its rim has one screen height)', await page.evaluate(() => {
    const sc = TRV.solids[0], s = window.BRAHMAN_DREAM_DEBUG.state, ys = Array.from({ length: 36 }, (_, k) => sc.p([s.seaRadius * Math.cos(k * Math.PI / 18), s.seaRadius * Math.sin(k * Math.PI / 18), 0])[1]);
    return s.camera.pitch === 0 && Math.max(...ys) - Math.min(...ys) < 1e-9 && Math.abs(s.overlapIA) === 0;
  }));
}

/* ---------- the handle ---------- */
await pick(DEFAULT_CARD);
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const before = await state(), h = await page.evaluate(() => window.BRAHMAN_DREAM_DEBUG.handleBox());
  const target = await page.evaluate(() => window.BRAHMAN_DREAM_DEBUG.dragTarget(70));
  check('θ handle: a visible amber button on the tip of Ψ', !!h && await page.locator('#thetaHandle').isVisible() && !!before.handle);
  if (h && target) {
    await page.mouse.move(h.x, h.y); await page.mouse.down();
    check('θ handle: pointerdown starts a drag', await page.locator('#thetaHandle').evaluate((el) => el.classList.contains('dragging')));
    await page.mouse.move(target.x, target.y, { steps: 6 }); await page.mouse.up(); await settle(page);
    const after = await state();
    check('θ handle: the drag sets θ ≈ 70° along the meridian and leaves the camera alone', Math.abs(after.thetaDeg - 70) < 1.5 && same(after.camera, before.camera) && after.preset === null, `${after.thetaDeg}`);
    checkMath(after, 'after the θ drag');
  }
  const t0 = (await state()).thetaDeg, c0 = (await state()).t;
  await page.locator('#thetaHandle').focus(); await page.keyboard.press('ArrowDown'); await settle(page);
  const k = await state();
  check('θ handle: ↓ lowers θ by 0.5° and leaves the clock alone', near(k.thetaDeg, t0 - 0.5, 1e-9) && k.t === c0, `${t0} → ${k.thetaDeg}`);
  await page.keyboard.press('ArrowRight'); await settle(page);
  check('θ handle: → raises it back', near((await state()).thetaDeg, t0, 1e-9));
}

/* ---------- drawer, playback ---------- */
await page.click('#infoBtn'); await settle(page);
check('info button opens the theory drawer', await page.locator('#drawer [role="dialog"]').isVisible());
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').isHidden());
check('play advances the rail', await playsAfter(page, () => page.locator('#play').evaluate((b) => b.click()), () => window.BRAHMAN_DREAM_DEBUG.state));
await pause();
{ const a = await state(); await settle(page); const b = await state(); check('pause holds the clock', !a.playing && a.t === b.t); }
for (const card of Object.keys(CARDS).filter((c) => CARDS[c].play)) {
  check(`card ${card}: a click plays its story`, await playsAfter(page, () => page.click(`[data-preset="${card}"]`), () => window.BRAHMAN_DREAM_DEBUG.state));
  await pause();
}
{ await page.click('[data-preset="turiya-zero-tilt-pure-brahman"]'); await settle(page); const s = await state(); check('card turiya-zero-tilt-pure-brahman: a click parks it paused on its still', s.preset === 'turiya-zero-tilt-pure-brahman' && !s.playing && s.t === 0); }

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
  check(`still ${lang}/${card}: paused on the declared frame in its view, no handle`, s.preset === card && !s.playing && near(s.t, stillT(card), 1e-12) && viewOk(s, CARDS[card].view)
    && await p.locator('#thetaHandle').isHidden() && await p.evaluate(() => TRV.still && TRV.shot && document.documentElement.dataset.trPalette === undefined));
  if (card === 'turiya-zero-tilt-pure-brahman') check(`still ${lang}/${card}: θ = 0 edge-on`, s.thetaDeg === 0 && s.camera.pitch === 0);
  if (card === 'waking-consensus-dottie-lock') check(`still ${lang}/${card}: 0.5462 / 0.4538 and 0.7500`, s.cos2.toFixed(4) === '0.5462' && s.sin2.toFixed(4) === '0.4538' && s.born.toFixed(4) === '0.7500');
  if (card === 'insider-double-imaginary-solidity') check(`still ${lang}/${card}: from inside, 0.7500`, s.born.toFixed(4) === '0.7500' && s.view === 'insider');
  if (card === 'private-dream-and-seed-sleep') check(`still ${lang}/${card}: θ = 77.5°, sin²θ = 0.9532`, near(s.thetaDeg, 77.5, 1e-9) && s.sin2.toFixed(4) === '0.9532');
  if (card === 'kalpa-mobius-lucid-awakening') check(`still ${lang}/${card}: ϑ = 360°, e^{iϑ/2} = −1`, near(s.lift[0], -1, 1e-12));
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
