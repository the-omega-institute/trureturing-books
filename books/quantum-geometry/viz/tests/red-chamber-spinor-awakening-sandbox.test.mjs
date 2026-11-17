// HONG//AWAKEN browser regression: the shared stage-first gate, then every control, card, lens, still and frame, and
// every number the page claims, checked against algorithms written here (Newton's method for θ*, explicit vectors and
// Gram–Schmidt for the Schur freedom, the closed forms of the twelve-station Bargmann product and the three-anchor
// invariant, the geometry of the icosahedron from its pairwise distances, the frame of the ribbon from its tangent).
// Run directly with node; VIZ_SLOW_FRAMES=1000 exercises every transition and playback with sparse animation frames.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, capitalGreek, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'red-chamber-spinor-awakening-sandbox';
const NAME = 'RED_CHAMBER_AWAKEN_DEBUG';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const THEORY = 'ch39-s16-red-chamber-awakening-and-heaven-human-unity.html#sec-ch39-red-chamber-awakening-and-heaven-human-unity';
const GIDS = [
  'D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint',
  'D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary',
  'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift',
  'D5/S3/Fourier/FinitePoisson.sum_annihilator_character',
  'D5/S3/QuantumChannels/CoherenceMassBridge.pinching_eq_self_iff_offDiag_eq_zero',
  'D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product',
  'D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch'
];
const CARDS = {
  'chaos-unhewn-stone': { lens: 'mirror', drive: 'wind', still: 0, play: false },
  'red-dust-delusion-mismatch': { lens: 'mirror', drive: 'phi', still: 0.2, play: true },
  'fengyue-mirror-double-turn': { lens: 'mirror', drive: 'phiHalf', still: 0.5, play: true },
  'mobius-720-virtual-real-unity': { lens: 'mirror', drive: 'phiFull', still: 1, play: true },
  'greensickness-berry-unity': { lens: 'unity', drive: 'unloadM', still: 1, play: true }
};
const VIEW0 = [0.62, 0.66];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const DEG = Math.PI / 180;
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));

/* ---------- independent mathematics, written here and never calling the page ---------- */
/** θ* by Newton's method on f(t) = cos t − t from t = 1. */
function newtonDottie() { let t = 1; for (let k = 0; k < 60; k++) t -= (Math.cos(t) - t) / (-Math.sin(t) - 1); return t; }
const TSTAR = newtonDottie();
/** The Schur freedom by explicit vectors: v_i = √(1 − ρ) e_i + √ρ e_13 in ℝ¹³, b their mean; Gram–Schmidt on the first
    M members, then the share of |b|² left outside their span. */
function schurByVectors(M, D = 12, rho = 0.5) {
  const vec = (i) => { const v = new Array(D + 1).fill(0); v[i] = Math.sqrt(1 - rho); v[D] = Math.sqrt(rho); return v; };
  const dotv = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const b = new Array(D + 1).fill(0); for (let i = 0; i < D; i++) vec(i).forEach((x, k) => { b[k] += x / D; });
  const basis = [];
  for (let i = 0; i < M; i++) { let v = vec(i); for (const q of basis) { const c = dotv(v, q); v = v.map((x, k) => x - c * q[k]); } const n = Math.sqrt(dotv(v, v)); basis.push(v.map((x) => x / n)); }
  let r = b.slice(); for (const q of basis) { const c = dotv(r, q); r = r.map((x, k) => x - c * q[k]); }
  return dotv(r, r) / dotv(b, b);
}
/** The twelve-station Bargmann product in closed form: each overlap is z = cos²(θ/2) + sin²(θ/2)e^{iπ/6}, so Π = z¹². */
function bargmann12(theta) {
  const c2 = Math.cos(theta / 2) ** 2, s2 = Math.sin(theta / 2) ** 2, re = c2 + s2 * Math.cos(Math.PI / 6), im = s2 * Math.sin(Math.PI / 6);
  return { arg: wrap(12 * Math.atan2(im, re)), modulus: Math.hypot(re, im) ** 12 };
}
/** Tr(P₀P₄P₈) for three Bloch vectors 120° apart at colatitude θ: real part (1 + 3(cos²θ − ½ sin²θ))/4, imaginary part
    det[r₀ r₄ r₈]/4 = (3√3/8) sin²θ cos θ. */
function triple(theta) { const s2 = Math.sin(theta) ** 2, c = Math.cos(theta); return { re: (1 + 3 * (c * c - s2 / 2)) / 4, im: 3 * Math.sqrt(3) / 8 * s2 * c }; }
const Z = (M) => 13 * M / (12 * (M + 1));
/** The spinor U(Φ) = cos(Φ/2) − î sin(Φ/2) as the page must print it with d decimals: a ± bî, a true minus, never −0. */
function spinorText(phiDeg, d) {
  const f = (x) => { const r = Number(x.toFixed(d)); return (r === 0 ? 0 : r).toFixed(d).replace('-', '−'); };
  const a = Math.cos(phiDeg * DEG / 2), b = -Math.sin(phiDeg * DEG / 2), bb = f(Math.abs(b));
  return `${f(a)} ${b < 0 && Number(bb) !== 0 ? '−' : '+'} ${bb}î`;
}
/** Which faces label the mirror carries: one only when the ribbon has closed (Φ ≥ 360°, |U − 1| = 2|sin(Φ/4)| < 10⁻⁶). */
function facesOf(phiDeg, blend) { return phiDeg >= 360 && 2 * Math.abs(Math.sin(phiDeg * DEG / 4)) < 1e-6 ? 'closed' : blend >= 0.5 ? 'approaching' : 'apart'; }
const unison = (M, phiDeg, theta) => schurByVectors(M) * Math.cos(phiDeg * DEG / 4) ** 2 / (1 + 100 * (Math.cos(theta) - theta) ** 2);
function factor(n) { const f = []; let d = 2; while (n > 1) { if (n % d === 0) { f.push(d); n /= d; } else d++; } return f; }

const T = await session();
const { page, check } = T;

// independent derivations that do not need the page
{
  check('maths: θ* = 0.7390851332151607 rad = 42.34645883°, cos θ* = θ*', near(TSTAR, 0.7390851332151607, 2e-16) && (TSTAR / DEG).toFixed(8) === '42.34645883' && Math.abs(Math.cos(TSTAR) - TSTAR) < 1e-15);
  check('maths: Ω(θ*) = 2π(1 − θ*) = 1.639376 sr, |γ| = 0.819688 rad = 46.9647°', (2 * Math.PI * (1 - TSTAR)).toFixed(6) === '1.639376' && (Math.PI * (1 - TSTAR)).toFixed(6) === '0.819688' && (Math.PI * (1 - TSTAR) / DEG).toFixed(4) === '46.9647');
  const b = bargmann12(TSTAR), t3 = triple(TSTAR);
  check('maths: at θ*, arg Π₁₂ = 45.57887321° and arg Tr(P₀P₄P₈) = 23.98753304°', (b.arg / DEG).toFixed(8) === '45.57887321' && (Math.atan2(t3.im, t3.re) / DEG).toFixed(8) === '23.98753304');
  check('maths: 36501 = 3·23³, 36500 = 2²·5³·73, coprime', same(factor(36501), [3, 23, 23, 23]) && same(factor(36500), [2, 2, 5, 5, 5, 73]) && (() => { let a = 36501, c = 36500; while (c) [a, c] = [c, a % c]; return a === 1; })());
  const table = [0, 1, 3, 12].map((m) => schurByVectors(m));
  check('maths: the Schur freedom by vectors is (12 − M)/(12(M + 1)): 1, 0.4583, 0.1875, 0', near(table[0], 1, 1e-12) && table[1].toFixed(4) === '0.4583' && near(table[2], 0.1875, 1e-12) && Math.abs(table[3]) < 1e-12
    && Array.from({ length: 13 }, (_, m) => m).every((m) => near(schurByVectors(m), (12 - m) / (12 * (m + 1)), 1e-12)));
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
  await context.exposeBinding('__hongPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__hongPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__hongPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined,
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
check('source: amber in the script only for the mirror tip and the strip cursor', [...sources['main.js'].matchAll(/^.*P\.amber.*$/gm)].map((m) => m[0]).every((l) => /sc\.bead\(tip|g\.vline\(|g\.dot\(/.test(l))
  && (sources['main.js'].match(/P\.amber/g) || []).length === 5);
check('source: amber in the stylesheet only on the active lens half and the handle', sources['style.css'].replace(/\/\*[\s\S]*?\*\//g, '').split('}').filter((r) => /--amber/.test(r))
  .every((r) => /^\s*(?:\.lens-toggle\[aria-pressed="false"\] \.seg\.off, \.lens-toggle\[aria-pressed="true"\] \.seg\.on|\.handle(?:[:.\s,][^{]*)?)\s*\{/.test(r)));
check('source: amber is not a readout or label colour', !/dl\.ro[^{]*\{[^}]*--amber/.test(sources['style.css']) && !/c-am/.test(sources['main.js'] + sources['style.css']));
check('source (Rule 2): the header pills are plain (no .hot), slider outputs are ink, tagline and drawer emphasis are cyan', !/\bpill hot\b|\.pill\.hot|classList\.(?:add|toggle)\(['"]hot['"]/.test(sources['index.html'] + sources['main.js'])
  && /(?:^|\n)\.field output \{ color: var\(--ink\); \}/.test(sources['style.css']) && /(?:^|\n)\.tagline em, \.sheet li b \{ color: var\(--cyan\); \}/.test(sources['style.css']));
check('source: the Chinese place-name is 大荒山无稽崖青埂峰', sources['index.html'].includes('大荒山无稽崖青埂峰') && !/无稽山/.test(sources['index.html'] + sources['main.js']));
check('source: θ* in degrees is 42.34645883 (or 42.35), never 42.34647', !/42\.3464[6-9]/.test(sources['index.html'] + sources['main.js']) && sources['index.html'].includes('42.34645883°'));
{
  const zh = (sources['index.html'].match(/class="(?:[^"]*\s)?zh(?:\s[^"]*)?"/g) || []).length, en = (sources['index.html'].match(/class="(?:[^"]*\s)?en(?:\s[^"]*)?"/g) || []).length;
  check('source: as many .zh as .en elements', zh === en && zh > 0, `${zh} zh / ${en} en`);
}
check('suite: no fixed waits', !new RegExp('wait' + 'ForTimeout').test(suite));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID);
check('registry: live §39.16 entry with five bilingual cards and the seven theorems', !!entry && entry.status === 'live' && entry.chapter === 39 && entry.section === '39.16'
  && entry.code === 'HONG//AWAKEN' && same(entry.presets, Object.keys(CARDS)) && entry.presets.every((c) => entry.preset_titles[c].zh && entry.preset_titles[c].en)
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
  const th = s.thetaDeg * DEG, ph = s.phiDeg * DEG, I = s.leanInstances;
  check(`${tag}: θ in radians, Φ from the drive`, near(s.theta, th, 1e-12) && near(s.phiDeg, s.drive === 'phi' ? 600 * s.tau : s.drive === 'unloadM' ? s.phiDeg : 720 * s.tau, 1e-9)
    && (s.drive !== 'unloadM' || s.M === Math.round(12 * (1 - s.tau))));
  check(`${tag}: spinor U = cos(Φ/2) − î sin(Φ/2), vector cos Φ`, near(s.spinor.re, Math.cos(ph / 2), 1e-12) && near(s.spinor.im, -Math.sin(ph / 2), 1e-12) && near(s.spinor.vector, Math.cos(ph), 1e-12));
  const delta = Math.abs(Math.cos(th) - th), gap = Math.abs(th - TSTAR);
  check(`${tag}: δ_meta = |cos θ − θ| between |θ − θ*| and 2|θ − θ*|`, near(s.meta.delta, delta, 1e-12) && near(s.meta.gap, gap, 1e-12) && gap <= delta + 1e-15 && delta <= 2 * gap + 1e-15 && s.meta.inBounds);
  check(`${tag}: Ω = 2π(1 − cos θ), |γ| = Ω/2`, near(s.berry.omega, 2 * Math.PI * (1 - Math.cos(th)), 1e-12) && near(s.berry.gamma, s.berry.omega / 2, 1e-12) && near(s.berry.gammaDeg, s.berry.gamma / DEG, 1e-9));
  check(`${tag}: Δ_Schur(M) from explicit vectors, Z = 13M/(12(M + 1)) = 1 − Δ`, Number.isInteger(s.M) && near(s.schur, schurByVectors(s.M), 1e-12) && near(s.Z, Z(s.M), 1e-12));
  check(`${tag}: A = Δ_Schur·cos²(Φ/4)·[1 + 100 δ²]⁻¹`, near(s.unison.A, unison(s.M, s.phiDeg, th), 1e-12) && near(s.unison.closure, Math.cos(ph / 4) ** 2, 1e-12));
  // the ribbon: the mirror face turns by Φ/2 against the base frame, the vector by Φ; the band closes at 720°
  check(`${tag}: mirror face · n₁ = cos(Φ/2), vector · n₁ = cos Φ, closed at 720°, flipped at 360°`, near(s.mirror.faceDotN1, Math.cos(ph / 2), 1e-12) && near(s.mirror.vectorDotN1, Math.cos(ph), 1e-12)
    && s.mirror.closureGap < 1e-12 && near(s.mirror.halfTurnFace, -1, 1e-12));
  const fade = Math.min(1, Math.max(0, (s.phiDeg - 640) / 80)), blend = fade * fade * (3 - 2 * fade);
  check(`${tag}: the faces blend to violet only past 640°`, near(s.blend, blend, 1e-12));
  check(`${tag}: "Zhen and Jia as one" only at closure (|U − 1| < 10⁻⁶ past 360°), "approaching +1" from 680°`, s.faces === facesOf(s.phiDeg, blend), `${s.faces} at ${s.phiDeg}°`);
  check(`${tag}: twenty stone faces, a 42-vertex net with 80 faces, M cage bars, twelve filaments when A > 0.02`, s.geometry.stoneFaces === 20 && s.geometry.netVertices === 42 && s.geometry.netFaces === 80
    && s.geometry.cageBars === s.M && s.geometry.threads === (s.unison.A > 0.02 ? 12 : 0) && s.geometry.ribbon === (s.phiDeg >= 1));
  // the Lean instances
  check(`${tag}: θ* agrees with Newton, in (0, 1), cos t − t decreasing`, near(I.dottie.theta, TSTAR, 2e-16) && I.dottie.residual < 1e-15 && I.dottie.inUnit && I.dottie.maxSlope <= -1);
  check(`${tag}: J = [[0, −1], [1, 0]]: Jᴴ = −J, JJᴴ = 1, J² = −1, J I_Zhen = î_Jia`, I.fold.skewAdjoint === 0 && I.fold.unitary === 0 && I.fold.square === 0 && same(I.fold.zhenToJia, [0, 1]));
  check(`${tag}: the lift U = e^{−iΦ/2} squares to the base, continues from 1, −1 at one turn, +1 at two, the principal root jumps by 2`, I.doubleCover.liftResidual < 1e-12 && I.doubleCover.contResidual < 1e-9
    && near(I.doubleCover.now[0], Math.cos(ph / 2), 1e-12) && near(I.doubleCover.now[1], -Math.sin(ph / 2), 1e-12) && near(I.doubleCover.atOneTurn[0], -1, 1e-15) && near(I.doubleCover.atTwoTurns[0], 1, 1e-15)
    && near(I.doubleCover.branchJump, 2, 1e-6));
  check(`${tag}: Σ_k e^{2πikx/12} = 12 at x = 0 and 0 elsewhere`, I.characters.sums.every((z, x) => near(z[0], x === 0 ? 12 : 0, 1e-12) && near(z[1], 0, 1e-12)) && I.characters.residual < 1e-12);
  check(`${tag}: the twelve-station average is diagonal and a pinching fixed point; one station is not`, I.pinch.avgOffDiag < 1e-15 && I.pinch.avgFixed < 1e-15
    && near(I.pinch.avgDiag[0], Math.cos(th / 2) ** 2, 1e-12) && near(I.pinch.avgDiag[1], Math.sin(th / 2) ** 2, 1e-12)
    && near(I.pinch.stationOffDiag, Math.sin(th) / 2, 1e-12) && near(I.pinch.stationMoves, Math.sin(th) / 2, 1e-12));
  const b = bargmann12(th), t3 = triple(th);
  check(`${tag}: Tr(P₀⋯P₁₁) equals the product of overlaps, z¹² in closed form`, I.bargmann.residual < 1e-12 && Math.abs(wrap(I.bargmann.arg - b.arg)) < 1e-10 && near(I.bargmann.modulus, b.modulus, 1e-12));
  check(`${tag}: Tr(P₀P₄P₈) = (1 + Σ r·r)/4 + i det/4, in closed form`, I.triple.residual < 1e-14 && near(I.triple.trace[0], t3.re, 1e-12) && near(I.triple.trace[1], t3.im, 1e-12));
}
/** The icosahedron of the page: twelve unit vectors, one on +z, each with five neighbours at one common distance. */
function checkIco(verts, tag) {
  const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  const edge = Math.min(...verts.flatMap((a, i) => verts.slice(i + 1).map((b) => d(a, b))));
  const deg = verts.map((a) => verts.filter((b) => b !== a && near(d(a, b), edge, 1e-9)).length);
  check(`${tag}: the icosahedron: 12 unit vertices, one at +z, 30 edges of length 4/√(10 + 2√5)`, verts.length === 12 && verts.every((v) => near(Math.hypot(...v), 1, 1e-12))
    && verts.some((v) => near(v[2], 1, 1e-12)) && deg.every((k) => k === 5) && near(edge, 4 / Math.sqrt(10 + 2 * Math.sqrt(5)), 1e-12));
}

async function checkLinks(p, tag) {
  check(`${tag}: exactly the seven green Lean links, in #evidence`, same(await p.$$eval('[data-lean-gid]', (els) => els.map((e) => e.dataset.leanGid).sort()), [...GIDS].sort())
    && await p.$$eval('[data-lean-gid]', (els) => els.every((e) => e.closest('.col.side #evidence .lean') && e.closest('.lean').querySelector('.ok').textContent.trim() === 'LEAN ✓')));
  check(`${tag}: one ARGUED, MODEL and NUM box each, no OPEN box`, await p.evaluate(() => ['argued', 'model', 'num'].every((c) => document.querySelectorAll(`#evidence .lean.${c}`).length === 1)
    && !document.querySelector('.lean.open') && document.querySelectorAll('#evidence .lean:not(.argued):not(.model):not(.num):not(.open):not(.frozen)').length === 7));
  check(`${tag}: bilingual chapter 39 theory link in the drawer`, same(await p.$$eval('#drawer .refs a', (els) => els.map((e) => e.getAttribute('href')).sort()), ['zh', 'en'].map((l) => `../../${l}/${THEORY}`).sort()));
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
    && !!document.querySelector('#stage[data-thumb] > canvas#cv') && document.querySelector('#stage > button.handle#awakenHandle[type="button"]') !== null;
}));
check('layout: #rail is the left deck holding the lens toggle, then the cards with their note, then #ctlPanel with three sliders', await page.evaluate(() => {
  const deck = document.querySelector('.app.lab > aside.col.deck#rail'), lens = document.querySelector('#lensToggleBtn.lens-toggle'), cards = document.querySelector('.presets.cards#presets');
  const ctl = document.querySelector('#ctlPanel'), F = Node.DOCUMENT_POSITION_FOLLOWING;
  return !!deck && deck.contains(lens) && deck.contains(cards) && deck.contains(document.querySelector('#presetNote')) && deck.contains(ctl)
    && !!(lens.compareDocumentPosition(cards) & F) && !!(cards.compareDocumentPosition(ctl) & F) && ['#spinorPhi', '#tiltTheta', '#manasLoad'].every((q) => ctl.contains(document.querySelector(q)))
    && ctl.querySelectorAll('input[type=range]').length === 3 && document.querySelectorAll('#presets [data-preset]').length === 5;
}));
check('layout: #infoBtn is the first child of #evidence, above every evidence box', await page.evaluate(() => {
  const ev = document.querySelector('.app.lab > aside.col.side > #evidence'), btn = document.querySelector('#infoBtn');
  const boxes = [...ev.querySelectorAll('.lean')], top = btn.getBoundingClientRect();
  return document.querySelectorAll('#infoBtn').length === 1 && ev.firstElementChild === btn && btn.matches('button.chip[type="button"]') && boxes.length === 10
    && boxes.every((b) => top.bottom <= b.getBoundingClientRect().top + 0.5);
}));
check('layout: opens on the 720° card at its still, paused', await page.evaluate((n) => { const s = window[n].state; return s.preset === 'mobius-720-virtual-real-unity' && s.t === 1 && !s.playing && s.phiDeg === 720; }, NAME));
check('sliders: Φ over [0, 720] step 1, θ over the whole [0, 90] step 0.01, M over [0, 12] step 1', await page.evaluate(() => {
  const a = document.querySelector('#spinorPhi'), b = document.querySelector('#tiltTheta'), c = document.querySelector('#manasLoad');
  return a.min === '0' && a.max === '720' && a.step === '1' && b.min === '0' && b.max === '90' && b.step === '0.01' && c.min === '0' && c.max === '12' && c.step === '1';
}));
check('colours: every MODEL badge is ink and every MODEL border neutral, never amber (not rgb(255, 200, 61))', await page.evaluate(() => {
  const probe = (prop, value) => { const e = document.createElement('span'); e.style.borderStyle = 'solid'; e.style[prop] = value; document.body.appendChild(e); const st = getComputedStyle(e), v = prop === 'color' ? st.color : st.borderTopColor; e.remove(); return v; };
  const amber = probe('color', 'var(--amber)'), ink = probe('color', 'var(--ink)');
  const inkEdge = probe('borderColor', 'color-mix(in srgb, var(--ink) 32%, transparent)'), amberEdge = probe('borderColor', 'color-mix(in srgb, var(--amber) 40%, transparent)');
  const boxes = [...document.querySelectorAll('.lean.model')];
  return amber === 'rgb(255, 200, 61)' && ink !== amber && inkEdge !== amberEdge && boxes.length >= 1 && boxes.every((b) => {
    const st = getComputedStyle(b), ok = getComputedStyle(b.querySelector('.ok')).color, edges = [st.borderTopColor, st.borderRightColor, st.borderBottomColor, st.borderLeftColor];
    return ok === ink && ok !== amber && ok !== 'rgb(255, 200, 61)' && edges.every((c) => c === inkEdge && c !== amberEdge && !c.includes('255, 200, 61'));
  });
}));
check('readouts: no amber on any readout', await page.evaluate(() => {
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
{ const s = await state(); checkMath(s, 'opening frame'); checkIco(s.icoVertices, 'opening frame'); }

/* ---------- every card, both languages ---------- */
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  for (const card of Object.keys(CARDS)) {
    await pick(card);
    await seek(CARDS[card].still);
    const s = await state(), c = CARDS[card];
    check(`${lang}/${card}: the card sets lens, drive and camera, paused at its still`, s.preset === card && s.lens === c.lens && s.drive === c.drive && !s.playing && near(s.tau, c.still, 1e-12)
      && String(await page.getAttribute(`[data-preset="${card}"]`, 'data-still')) === String(c.still) && near(s.camera.yaw, VIEW0[0], 1e-9) && near(s.camera.pitch, VIEW0[1], 1e-9)
      && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === String(c.lens === 'unity'));
    checkMath(s, `${lang}/${card}`);
    const v = await stageView(page, '#stage', false), lo = await labelOverlaps(page, '.stage .tag', 0);
    check(`${lang}/${card}: desktop stage, HUD and labels clear`, v.layout.length === 0 && v.hud.length === 0 && lo.length === 0, [...v.layout, ...v.hud, ...lo.map((x) => x.join(' / '))].join(' | '));
  }
}
await page.click('[data-lang-set="zh"]'); await settle(page);

// the numbers the card notes name
await pick('chaos-unhewn-stone');
{
  const s = await state();
  check('card 1: Φ = 0, θ = 0, Ω = 0, δ_meta = 1, U = +1, no cage, no filaments', s.phiDeg === 0 && s.thetaDeg === 0 && s.berry.omega === 0 && s.meta.delta === 1 && s.spinor.re === 1 && s.M === 0
    && s.geometry.threads === 0 && s.geometry.ribbon === false && near(s.mirror.faceDotN1, 1, 1e-12));
}
check('card 1 does not play by itself', !(await state()).playing);
await pick('red-dust-delusion-mismatch');
await seek(0.2);
{
  const s = await state();
  check('card 2 at τ = 0.2: Φ = 120°, U = 0.50 − 0.87î, cos Φ = −0.50, θ = 62°, δ_meta = 0.6126, eight bars, Z = 0.963', s.phiDeg.toFixed(6) === '120.000000' && s.spinor.re.toFixed(2) === '0.50'
    && s.spinor.im.toFixed(2) === '-0.87' && s.spinor.vector.toFixed(2) === '-0.50' && s.thetaDeg === 62 && s.meta.delta.toFixed(4) === '0.6126' && s.M === 8 && s.Z.toFixed(3) === '0.963');
  const [hud, key] = await page.evaluate(() => [document.querySelector('#hudBig').textContent, document.querySelector('#roKey').textContent]);
  check('card 2 at τ = 0.2: the HUD and the key readout print the whole spinor 0.5000 − 0.8660î, not its real part alone', hud.includes('U(Φ) = 0.5000 − 0.8660î') && key === '0.5000 − 0.8660î'
    && spinorText(120, 4) === '0.5000 − 0.8660î', `${hud} | ${key}`);
}
await seek(1);
{ const s = await state(); check('card 2 at τ = 1: the rail stops at Φ = 600°, 120° short of closing, the faces still apart', s.phiDeg === 600 && s.blend === 0 && near(s.spinor.re, Math.cos(300 * DEG), 1e-12)); }
await pick('fengyue-mirror-double-turn');
await seek(0.5);
{
  const s = await state();
  check('card 3 at τ = 0.5: Φ = 360°, vector home (cos Φ = 1), spinor −1, the Jia face where Zhen started, θ = θ*, five bars', s.phiDeg === 360 && near(s.spinor.vector, 1, 1e-12) && near(s.spinor.re, -1, 1e-12)
    && near(s.mirror.faceDotN1, -1, 1e-12) && near(s.theta, TSTAR, 1e-12) && s.M === 5);
}
await pick('mobius-720-virtual-real-unity');
await seek(1);
{
  const s = await state();
  check('card 4 at τ = 1: Φ = 720°, U = +1, one violet band, δ_meta = 0.0000, Ω = 1.6394 sr, Z = 0.8125, A = 0.19', s.phiDeg === 720 && near(s.spinor.re, 1, 1e-12) && s.blend === 1
    && s.meta.delta.toFixed(4) === '0.0000' && s.berry.omega.toFixed(4) === '1.6394' && s.Z === 0.8125 && s.unison.A.toFixed(2) === '0.19' && s.mirror.closureGap < 1e-12);
}
await pick('greensickness-berry-unity');
for (const [t, m] of [[0, 12], [0.5, 6], [1, 0]]) { await seek(t); const s = await state(); check(`card 5 at τ = ${t}: the rail unloads to M = ${m}, Φ = 720° and θ = θ* hold`, s.M === m && s.phiDeg === 720 && near(s.theta, TSTAR, 1e-12) && s.geometry.cageBars === m); }
{
  const s = await state();
  check('card 5 at τ = 1: M = 0, Z = 0, A = 1.00, twelve filaments, |γ| = 46.96°, the average has no off-diagonal term', s.M === 0 && s.Z === 0 && s.unison.A.toFixed(2) === '1.00' && s.geometry.threads === 12
    && s.berry.gammaDeg.toFixed(2) === '46.96' && s.leanInstances.pinch.avgOffDiag < 1e-15 && s.lens === 'unity');
}

/* ---------- every control ---------- */
await pick('chaos-unhewn-stone');
for (const v of [0, 90, 360, 539, 720]) {
  await input('#spinorPhi', v);
  const s = await state();
  check(`slider Φ = ${v}: leaves the card, the rail winds Φ = 720°·τ`, s.preset === null && s.phiDeg === v && s.drive === 'wind' && near(s.t, v / 720, 1e-12));
  checkMath(s, `Φ = ${v}`);
}
for (const v of [0, 10, 42.35, 62, 85, 90]) {
  await input('#tiltTheta', v);
  const s = await state();
  check(`slider θ = ${v}°: leaves the card, sets the colatitude`, s.preset === null && near(s.thetaDeg, v, 1e-9));
  checkMath(s, `θ = ${v}`);
}
{
  // θ = 90°: the cap is a hemisphere, δ_meta = π/2; no NaN or infinity anywhere (JSON turns both into null)
  await input('#tiltTheta', 90);
  const s = await state(), nums = [];
  const walk = (x) => { if (x === null) nums.push(NaN); else if (typeof x === 'number') nums.push(x); else if (typeof x === 'object') Object.values(x).forEach(walk); };
  walk({ spinor: s.spinor, meta: s.meta, berry: s.berry, unison: s.unison, schur: s.schur, Z: s.Z, lean: s.leanInstances, plot: s.plot });
  check('θ = 90° on the slider: every number finite, δ_meta = π/2, Ω = 2π, readouts free of NaN', s.thetaDeg === 90 && nums.length > 60 && nums.every(Number.isFinite)
    && near(s.meta.delta, Math.PI / 2, 1e-12) && near(s.berry.omega, 2 * Math.PI, 1e-12) && await page.evaluate(() => !/NaN|Infinity/.test(document.querySelector('.app').innerText)));
}
await input('#tiltTheta', 42.35);
{ const s = await state(); check('θ = 42.35° on the slider: δ_meta = 0.0001 (the slider cannot hold θ* itself)', s.meta.delta.toFixed(4) === '0.0001' && s.meta.inBounds); }
for (const v of [0, 1, 3, 8, 12]) {
  await input('#manasLoad', v);
  const s = await state();
  check(`slider M = ${v}: Z = 13M/(12(M + 1)), M bars`, s.M === v && near(s.Z, Z(v), 1e-12) && s.geometry.cageBars === v);
  checkMath(s, `M = ${v}`);
}
// the lens: the same state, two readings
{
  await input('#manasLoad', 0); await input('#spinorPhi', 720);
  const before = await state();
  await page.click('#lensToggleBtn'); await settle(page);
  const a = await state();
  check('lens toggle: to Heaven–Human resonance with the same Φ, θ and M, the amber half moves', a.lens === 'unity' && a.phiDeg === before.phiDeg && a.thetaDeg === before.thetaDeg && a.M === before.M
    && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === 'true');
  check('lens toggle: the unity lens labels the Berry cap and the cage, the mirror lens labels the faces', await page.evaluate(() => /Ω = /.test(document.querySelector('#stage').textContent)));
  checkMath(a, 'unity lens');
  await page.click('#lensToggleBtn'); await settle(page);
  const b = await state();
  check('lens toggle: back to the virtual–real mirror', b.lens === 'mirror' && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === 'false'
    && await page.evaluate(() => /cos Φ/.test(document.querySelector('#stage').textContent)));
}

/* ---------- the controls show the state: each <output> and slider after extreme values ---------- */
{
  const shown = () => page.evaluate(() => Object.fromEntries(['spinorPhi', 'tiltTheta', 'manasLoad'].map((id) => [id, [document.querySelector(`output[for="${id}"]`).textContent, Number(document.getElementById(id).value)]])));
  const expect = (s) => ({ spinorPhi: [`${Math.round(s.phiDeg)}°`, Math.round(s.phiDeg)], tiltTheta: [`${(Math.round(s.thetaDeg * 100) / 100).toFixed(2).replace('-', '−')}°`, Math.round(s.thetaDeg * 100) / 100], manasLoad: [`${s.M}`, s.M] });
  // start from a card whose values differ from every extreme (θ = θ*, M = 3, Φ = 720°), then pull each slider to its ends
  await pick('mobius-720-virtual-real-unity');
  for (const [sel, v, want] of [['#tiltTheta', 0, ['tiltTheta', '0.00°']], ['#manasLoad', 12, ['manasLoad', '12']], ['#spinorPhi', 0, ['spinorPhi', '0°']],
    ['#tiltTheta', 90, ['tiltTheta', '90.00°']], ['#manasLoad', 0, ['manasLoad', '0']], ['#spinorPhi', 720, ['spinorPhi', '720°']], ['#tiltTheta', 42.35, ['tiltTheta', '42.35°']]]) {
    await input(sel, v);
    const s = await state(), out = await shown(), exp = expect(s);
    check(`controls: after ${sel} → ${v}, the output reads ${want[1]} and every output and slider matches the state`, out[want[0]][0] === want[1] && same(out, exp), JSON.stringify({ out, exp }));
  }
}

/* ---------- the HUD, the key readout, the pill and the tip label print the whole spinor a ± bî ---------- */
for (const phi of [0, 120, 180, 360, 540, 720]) {
  await input('#spinorPhi', phi);
  const s = await state();
  const t = await page.evaluate(() => ({ hud: document.querySelector('#hudBig').textContent, key: document.querySelector('#roKey').textContent, pill: document.querySelector('#keyPill').textContent, stage: document.querySelector('#stage').textContent }));
  const four = spinorText(phi, 4), two = spinorText(phi, 2);
  check(`spinor at Φ = ${phi}°: HUD U(Φ) = ${four}, readout and pill complex, the tip label U = ${two}`, s.phiDeg === phi && t.hud.includes(`U(Φ) = ${four}`) && t.key === four && t.pill.trim() === `U ${two}`
    && t.stage.includes(`Φ = ${phi}° · U = ${two}`) && !/U\(Φ\) = [−\d.]+(?![\d.])(?! [−+])/.test(t.hud), JSON.stringify(t).slice(0, 300));
}
{
  await input('#spinorPhi', 180);
  const t = await page.evaluate(() => [document.querySelector('#hudBig').textContent, document.querySelector('#roKey').textContent]);
  check('spinor at Φ = 180°: U = −î reads 0.0000 − 1.0000î, never 0.0000 alone', t[0].includes('U(Φ) = 0.0000 − 1.0000î') && t[1] === '0.0000 − 1.0000î' && !/U\(Φ\) = 0\.0000(?:\s*$|\s*·)/.test(t[0]), t.join(' | '));
}

/* ---------- "Zhen and Jia as one · +1" only at closure; from 680° the label says "approaching +1" ---------- */
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  const one = lang === 'zh' ? '甄贾合一' : 'Zhen and Jia as one', nearing = lang === 'zh' ? '趋近 +1' : 'approaching +1';
  for (const phi of [600, 680, 700, 719, 720]) {
    await input('#spinorPhi', phi);
    const s = await state(), txt = await page.evaluate(() => [...document.querySelectorAll('#stage .tag')].map((e) => e.textContent).join(' | '));
    const want = facesOf(phi, s.blend);
    check(`${lang}: faces label at Φ = ${phi}° is ${want}`, s.lens === 'mirror' && s.faces === want && (want === 'closed') === txt.includes(one)
      && (want === 'approaching' ? txt.includes(nearing) : !txt.includes(nearing)), txt.slice(0, 240));
  }
}
await page.click('[data-lang-set="zh"]'); await settle(page);

/* ---------- the strip plot holds its curves: δ_meta up to π/2 at θ = 90° and the bound 2|θ − θ*| ---------- */
{
  await input('#tiltTheta', 90);
  if ((await state()).lens !== 'unity') { await page.click('#lensToggleBtn'); await settle(page); }
  const s = await state();
  let top = 0; for (let j = 0; j <= 900; j++) { const t = j / 10 * DEG; top = Math.max(top, Math.abs(Math.cos(t) - t), 2 * Math.abs(t - TSTAR)); }
  check('strip plot (resonance lens): θ over [0°, 90°], y over [0, ≥ π/2] and above every drawn curve (max 2(π/2 − θ*) = 1.6635)', !!s.plot && s.plot.lens === 'unity'
    && s.plot.x[0] <= 0 && s.plot.x[1] >= 90 && s.plot.y[0] <= 0 && s.plot.y[1] >= Math.PI / 2 && s.plot.y[1] >= top && near(s.meta.delta, Math.PI / 2, 1e-12) && s.meta.delta <= s.plot.y[1], JSON.stringify(s.plot));
  await page.click('#lensToggleBtn'); await settle(page);
  const m = await state();
  check('strip plot (mirror lens): Φ over [0°, 720°], y over [−1, 1]', !!m.plot && m.plot.lens === 'mirror' && m.plot.x[0] <= 0 && m.plot.x[1] >= 720 && m.plot.y[0] <= -1 && m.plot.y[1] >= 1);
}

/* ---------- the handle: drag along the ribbon without turning the camera ---------- */
await pick('fengyue-mirror-double-turn');
await seek(0.5);
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const before = await state(), h = await page.evaluate((n) => window[n].handleBox(), NAME);
  check('Φ handle: a visible amber button at the mirror tip', !!h && await page.locator('#awakenHandle').isVisible() && !!before.handle);
  if (h) {
    await page.mouse.move(h.x, h.y); await page.mouse.down();
    check('Φ handle: pointerdown starts a drag and leaves the card', await page.locator('#awakenHandle').evaluate((el) => el.classList.contains('dragging')));
    for (const v of [366, 372, 378, 384, 390]) { const q = await page.evaluate(([n, x]) => window[n].dragTarget(x), [NAME, v]); await page.mouse.move(q.x, q.y, { steps: 2 }); }
    await page.mouse.up(); await settle(page);
    const after = await state();
    check('Φ handle: drag sets Φ ≈ 390° and leaves the camera alone', Math.abs(after.phiDeg - 390) <= 2 && same(after.camera, before.camera) && after.preset === null, `${after.phiDeg}`);
    checkMath(after, 'after the Φ drag');
  }
  const p0 = (await state()).phiDeg;
  await page.locator('#awakenHandle').focus(); await page.keyboard.press('ArrowLeft'); await settle(page);
  const k = await state();
  check('Φ handle: ← lowers Φ by 1°', k.phiDeg === p0 - 1, `${p0} → ${k.phiDeg}`);
}

/* ---------- drawer, playback ---------- */
await page.click('#infoBtn'); await settle(page);
check('info button opens the theory drawer', await page.locator('#drawer [role="dialog"]').isVisible());
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').isHidden());
check('play advances the rail', await playsAfter(page, () => page.locator('#play').evaluate((b) => b.click()), () => window.RED_CHAMBER_AWAKEN_DEBUG.state));
await pause();
{ const a = await state(); await settle(page); const b = await state(); check('pause holds the clock', !a.playing && a.t === b.t); }
for (const card of Object.keys(CARDS).filter((c) => CARDS[c].play)) {
  check(`card ${card}: a click plays its story`, await playsAfter(page, () => page.click(`[data-preset="${card}"]`), () => window.RED_CHAMBER_AWAKEN_DEBUG.state));
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
  check(`still ${lang}/${card}: paused on the declared frame, no handle`, s.preset === card && !s.playing && near(s.t, CARDS[card].still, 1e-12) && await p.locator('#awakenHandle').isHidden()
    && await p.evaluate(() => TRV.still && TRV.shot && document.documentElement.dataset.trPalette === undefined));
  if (card === 'chaos-unhewn-stone') check(`still ${lang}/${card}: Φ = 0, θ = 0`, s.phiDeg === 0 && s.thetaDeg === 0);
  if (card === 'red-dust-delusion-mismatch') check(`still ${lang}/${card}: Φ = 120°, U = 0.50 − 0.87î`, near(s.phiDeg, 120, 1e-9) && s.spinor.re.toFixed(2) === '0.50' && s.spinor.im.toFixed(2) === '-0.87'
    && await p.evaluate(() => document.querySelector('#roKey').textContent) === '0.5000 − 0.8660î');
  if (card === 'fengyue-mirror-double-turn') check(`still ${lang}/${card}: Φ = 360°, the spinor reads −1`, s.phiDeg === 360 && near(s.spinor.re, -1, 1e-12));
  if (card === 'mobius-720-virtual-real-unity') check(`still ${lang}/${card}: Φ = 720°, U = +1, one violet band`, s.phiDeg === 720 && near(s.spinor.re, 1, 1e-12) && s.blend === 1);
  if (card === 'greensickness-berry-unity') check(`still ${lang}/${card}: M = 0, A = 1.00, twelve filaments`, s.M === 0 && s.unison.A.toFixed(2) === '1.00' && s.geometry.threads === 12);
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
