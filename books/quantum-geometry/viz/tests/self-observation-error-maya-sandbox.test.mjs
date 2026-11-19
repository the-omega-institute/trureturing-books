// MAYA//ERROR browser regression: the shared stage-first gate, then every control, card, lens, still and frame, and
// every number the page claims, checked against algorithms written here (the spherical excess from the triangle's own
// vertices by the Van Oosterom–Strackee formula, the monitored survival through a 3D Rodrigues turn, the energy spread
// from explicit expectations, the Dottie number by bisection, the Gram–Schmidt residual and the error cell from vectors).
// Run directly with node; VIZ_SLOW_FRAMES=1000 exercises every transition and playback with sparse animation frames.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, capitalGreek, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'self-observation-error-maya-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
// The published subsection and its stable anchor, shared by the registry and the drawer.
const THEORY = 'ch39-s14-self-observation-error-and-maya-projection.html#sec-ch39-self-observation-error-and-maya-projection';
const OPEN_LINKS = [
  'ch34-s25-generations-and-quantitative-boundary.html#prob-ch34-sm-generations-and-couplings',
  'ch34-s24-interaction-sign-and-sagitta-composition.html#prob-ch34-gravity-dynamics-and-coupling'
];
const GIDS = [
  'D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization',
  'D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities',
  'D5/S0/Diagonal/Lawvere/QualitativeEscape.self_application_fragment_package',
  'D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint',
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  'D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff',
  'D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary',
  'D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary',
  'D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitored_return_conservation'
];
const CARDS = {
  'zero-error-turiya-silence': { epsDeg: 0, lens: 'static', dottie: false, drive: 'phase', K: 8, play: false, still: 0 },
  'dottie-self-focus-steady-state': { epsDeg: 42.35, lens: 'dynamic', dottie: true, drive: 'phase', K: 12, play: true, still: 0.65 },
  'static-projection-results-hierarchy': { epsDeg: 42.35, lens: 'static', dottie: false, drive: 'phase', K: 8, play: false, still: 0.5 },
  'dynamic-observation-action-chase': { epsDeg: 42.35, lens: 'dynamic', dottie: false, drive: 'phase', K: 12, play: true, still: 0.5 },
  'maya-scaling-collapse-audit': { epsDeg: 15, lens: 'static', dottie: false, drive: 'collapse', K: 8, play: true, still: 0.75 }
};
const DEFAULT_CARD = 'static-projection-results-hierarchy';
const VIEW0 = [-0.52, 0.5];
const D = Math.PI / 180, TAU = 2 * Math.PI;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const vnear = (a, b, tol = 1e-9) => Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((x, k) => near(x, b[k], tol));

/* ---------- independent geometry, written here and never calling the page ---------- */
const dot = (a, b) => a.reduce((t, x, k) => t + x * b[k], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const len = (a) => Math.sqrt(dot(a, a));
const minus = (a, b) => a.map((x, k) => x - b[k]);
const times = (a, s) => a.map((x) => x * s);
/** A point of the unit sphere from its polar angle and azimuth. */
const polar = (th, az) => [Math.sin(th) * Math.cos(az), Math.sin(th) * Math.sin(az), Math.cos(th)];
/** The excess of the spherical triangle a, b, c (unit vectors) by Van Oosterom–Strackee. */
const excess = (a, b, c) => 2 * Math.atan2(Math.abs(dot(a, cross(b, c))), 1 + dot(a, b) + dot(b, c) + dot(c, a));
/** Rodrigues: v turned by angle t about the unit axis n. */
const rodrigues = (v, n, t) => { const c = Math.cos(t), s = Math.sin(t), k = cross(n, v), d = dot(n, v); return v.map((x, i) => x * c + k[i] * s + n[i] * d * (1 - c)); };
/** Monitored return of Ω = e₃ under the turn by eps about e₂, with Q = 1 − |e₃⟩⟨e₃|: survival s_n and return p_n. */
function monitored(eps, N) {
  const om = [0, 0, 1], axis = [0, 1, 0];
  let h = om.slice(); const s = [1], p = [0];
  for (let n = 1; n <= N; n++) { const Uh = rodrigues(h, axis, eps); p.push(dot(om, Uh) ** 2); h = minus(Uh, times(om, dot(om, Uh))); s.push(dot(h, h)); }
  return { s, p };
}
/** The cosine fixed point by bisection on [0, 1]. */
const dottie = (() => { let a = 0, b = 1; for (let k = 0; k < 200; k++) { const m = (a + b) / 2; if (Math.cos(m) - m > 0) a = m; else b = m; } return (a + b) / 2; })();
/** The energy spread of cos(ε/2)|0⟩ + sin(ε/2)|1⟩ under H = σ_z/2 from ⟨H⟩ and ⟨H²⟩ summed over the basis. */
const spread = (eps) => { const amp = [Math.cos(eps / 2), Math.sin(eps / 2)], E = [0.5, -0.5]; const m1 = amp.reduce((t, a, k) => t + a * a * E[k], 0), m2 = amp.reduce((t, a, k) => t + a * a * E[k] ** 2, 0); return Math.sqrt(m2 - m1 * m1); };

const T = await session();
const { page, check } = T;

// independent derivations that do not need the page
{
  check('maths: the Dottie number 0.739085 rad = 42.3465°, cos²θ* = 0.5462, −sin θ* = −0.6736', dottie.toFixed(6) === '0.739085' && (dottie / D).toFixed(4) === '42.3465'
    && (Math.cos(dottie) ** 2).toFixed(4) === '0.5462' && (-Math.sin(dottie)).toFixed(4) === '-0.6736');
  const e = 42.35 * D;
  check('maths: at ε = 42.35° cos = 0.7390, cos² = 0.5462, sin = 0.6737, sin² = 0.4538, sin³ = 0.3057, ½ sin ε = 0.3368',
    [Math.cos(e), Math.cos(e) ** 2, Math.sin(e), Math.sin(e) ** 2, Math.sin(e) ** 3, spread(e)].map((x) => x.toFixed(4)).join() === '0.7390,0.5462,0.6737,0.4538,0.3057,0.3368');
  const N = [0, 0, 1], A = polar(e, Math.PI), B = polar(e, -Math.PI / 2);
  check('maths: the right spherical triangle with legs ε, ε has excess 0.2979 = 2 arctan(tan²(ε/2)); ½ sin²ε = 0.2269', excess(N, A, B).toFixed(4) === '0.2979'
    && near(excess(N, A, B), 2 * Math.atan(Math.tan(e / 2) ** 2), 1e-12) && (0.5 * Math.sin(e) ** 2).toFixed(4) === '0.2269');
  let worst = 0;
  for (const deg of [0.5, 1, 2, 4]) { const x = deg * D, ex = excess(N, polar(x, 0), polar(x, Math.PI / 2)); worst = Math.max(worst, Math.abs(ex - 0.5 * Math.sin(x) ** 2) / x ** 4); }
  check('maths: the excess agrees with ½ sin²ε to O(ε⁴) (|Ω − ½ sin²ε| / ε⁴ stays below 0.3)', worst < 0.3, `${worst}`);
  const mon = monitored(e, 12);
  check('maths: the monitored survival under a turn by ε is sin²ε cos^{2(k−1)}ε, every return step balances, the total is 1',
    mon.s.slice(1).every((x, k) => near(x, Math.sin(e) ** 2 * Math.cos(e) ** (2 * k), 1e-14)) && mon.p.slice(1).every((x, k) => near(x, mon.s[k] - mon.s[k + 1], 1e-14))
    && near(mon.p.slice(1).reduce((t, x) => t + x, 0) + mon.s[12], 1, 1e-14));
  const th = [0]; for (let k = 0; k < 12; k++) th.push(Math.cos(th[k]));
  check('maths: the self-focusing iterates from 0 go 57.296°, 30.957°, 49.134° … and end within 0.2° of θ* after 12 steps', (th[1] / D).toFixed(3) === '57.296' && (th[2] / D).toFixed(3) === '30.957'
    && (th[3] / D).toFixed(3) === '49.134' && Math.abs(th[12] - dottie) / D < 0.2);
  const e15 = 15 * D;
  check('maths: at ε = 15° sin = 0.2588, sin² = 0.0670, sin³ = 0.0173', [Math.sin(e15), Math.sin(e15) ** 2, Math.sin(e15) ** 3].map((x) => x.toFixed(4)).join() === '0.2588,0.0670,0.0173');
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
  await context.exposeBinding('__mayaPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__mayaPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__mayaPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined,
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
check('source: the page loads only the shared runtime and its own files', same([...sources['index.html'].matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]), ['../assets/shell.js', '../assets/kit.js', 'main.js']));
check('source: no .okmark anywhere (no green tick outside the Lean boxes)', !/okmark/.test(sources['index.html'] + sources['main.js'] + sources['style.css']));
check('source: green and red stay off the stage (no ok or warn colour in the page code)', !/P\.ok\b|P\.warn\b|var\(--ok\)|var\(--warn\)|var\(--red\)|c-ok\b|c-wn\b|sw (?:ok|wn)\b/.test(sources['main.js'] + sources['style.css']));
{
  // amber, written by the page, only on the active lens half, the handle, the observer (arrow and bead) and the strip cursor
  const rules = [...sources['style.css'].matchAll(/([^{}]+)\{([^}]*)\}/g)].filter((m) => /--amber/.test(m[2])).map((m) => m[1].trim());
  check('source: --amber only in the rules of the active lens half and the handle', rules.length > 0 && rules.every((sel) => /lens-toggle\[aria-pressed|\.handle/.test(sel)), JSON.stringify(rules));
  const lines = sources['main.js'].split('\n').filter((l) => /P\.amber/.test(l));
  check('source: P.amber only on the observer arrow, its bead and the strip cursor', lines.length === 3 && lines.filter((l) => /sc\.arrow\(ORIGIN, obs/.test(l)).length === 1
    && lines.filter((l) => /sc\.bead\(obs/.test(l)).length === 1 && lines.filter((l) => /g\.vline\(M\.epsDeg/.test(l)).length === 1, lines.join(' | '));
  check('source: no amber colour in the page markup (no c-am class, amber swatch or --amber), none named in the page code', !/\bc-am\b|\bsw am\b|--amber/.test(sources['index.html']) && !/\bc-am\b|'am'|--amber/.test(sources['main.js']));
}
{
  const zh = (sources['index.html'].match(/class="(?:[^"]*\s)?zh(?:\s[^"]*)?"/g) || []).length, en = (sources['index.html'].match(/class="(?:[^"]*\s)?en(?:\s[^"]*)?"/g) || []).length;
  check('source: as many .zh as .en elements', zh === en && zh > 0, `${zh} zh / ${en} en`);
}
check('suite: no fixed waits', !new RegExp('wait' + 'ForTimeout').test(suite));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID);
check('registry: live §38.6 entry with five bilingual cards and the nine theorems', !!entry && entry.status === 'live' && entry.chapter === 38 && entry.section === '38.6'
  && entry.code === 'MAYA//ERROR' && same(entry.presets, Object.keys(CARDS)) && entry.presets.every((c) => entry.preset_titles[c].zh && entry.preset_titles[c].en)
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

check('survival domain: both drawer explanations and metadata restrict finite positive tails to the open interval and state the endpoints',
  (sources['index.html'].match(/0° &lt; ε &lt; 90°/g) || []).length === 4
  && (sources['index.html'].match(/s₁ = 1[^<]*s₂ = 0/g) || []).length === 2
  && entry.summary.includes('0° < ε < 90°') && entry.summary_en.includes('0° < ε < 90°'));

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.MAYA_ERROR_DEBUG.state);
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
  await until(p, (id) => { const s = window.MAYA_ERROR_DEBUG.state; return s.preset === id && !s.blending; }, card);
  await pause(p);
}
async function seek(t, p = page) {
  await p.locator('#now').evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, t);
  await settle(p);
}
const stillT = (c) => CARDS[c].still;

/** Every number of a state against the algorithms of this file. */
function checkMath(s, tag) {
  const e = s.eps, c = Math.cos(e), sn = Math.sin(e), phi = s.drive === 'collapse' ? 0 : TAU * (s.tau - 0.5);
  check(`${tag}: ε in radians, the drive sets ε (collapse: 60°(1 − τ))`, near(e, s.epsDeg * D, 1e-15) && (s.drive !== 'collapse' || near(s.epsDeg, 60 * (1 - s.tau), 1e-9)));
  const I = polar(e, phi);
  check(`${tag}: the ruler I(ε, φ), φ = 2π(τ − ½) (0 on the collapse card), is a unit vector at ε from Ω`, vnear(s.observer, I, 1e-12) && near(len(s.observer), 1, 1e-12) && near(dot(s.observer, [0, 0, 1]), c, 1e-12));
  const r = minus([0, 0, 1], times(I, dot(I, [0, 0, 1])));
  check(`${tag}: Gram–Schmidt: r₁ = Ω − (I·Ω)I has length sin ε and I·r₁ = 0; foot (cos ε)I, echo (cos²ε)Ω`, vnear(s.residual, r, 1e-12) && near(len(r), sn, 1e-12) && Math.abs(dot(I, s.residual)) < 1e-14
    && vnear(s.foot, times(I, c), 1e-12) && vnear(s.echo, [0, 0, c * c], 1e-12) && near(s.cos2 + s.sin2, 1, 1e-15) && near(s.budget, 1, 1e-15));
  check(`${tag}: e⊥ is a unit vector orthogonal to I with Ω = (cos ε)I + (sin ε)e⊥; the second leg is orthogonal to both`,
    (sn < 1e-12 || (near(len(s.eperp), 1, 1e-12) && Math.abs(dot(s.eperp, I)) < 1e-14 && vnear(minus([0, 0, 1], times(I, c)), times(s.eperp, sn), 1e-12)))
    && Math.abs(dot(s.leg2, I)) < 1e-14 && Math.abs(dot(s.leg2, s.residual)) < 1e-14 && near(len(s.leg2), sn, 1e-12));
  const ex = excess([0, 0, 1], polar(e, phi + Math.PI), polar(e, phi - Math.PI / 2));
  check(`${tag}: the spherical excess of the drawn triangle (Van Oosterom–Strackee) and ½ sin²ε`, near(s.girard, ex, 1e-12) && near(s.halfSin2, 0.5 * sn * sn, 1e-15));
  check(`${tag}: the error cell has side sin ε, so its volume is sin³ε`, near((2 * s.cellHalf) ** 3, sn ** 3, 1e-15) && near(s.sin3, sn ** 3, 1e-15));
  const mon = monitored(e, s.K);
  check(`${tag}: the survival tail s_k and returns p_k agree with the monitored Rodrigues turn; Σp + s_K = 1`, s.survival.length === s.K + 1 && s.survival.every((x, k) => near(x, mon.s[k], 1e-12))
    && s.returns.slice(1).every((x, k) => near(x, mon.p[k + 1], 1e-12)) && near(s.conservation, 1, 1e-12));
  const h = 1e-6, dI = minus(polar(e, phi + h), polar(e, phi - h)).map((x) => x / (2 * h));
  check(`${tag}: the speed ratio is |dI/dφ| = sin ε, the energy spread ½ sin ε`, near(s.speedRatio, len(dI), 1e-8) && near(s.mtSpread, spread(e), 1e-12));
  const th = [0]; for (let k = 0; k < s.K; k++) th.push(Math.cos(th[k]));
  const kNow = s.K * s.tau, kInt = Math.min(s.K, Math.floor(kNow + 1e-9)), thNow = kInt >= s.K ? th[s.K] : th[kInt] + (th[kInt + 1] - th[kInt]) * (kNow - kInt);
  check(`${tag}: the steps k = Kτ, the self-focusing iterates and the current θ`, near(s.kNow, kNow, 1e-12) && s.kInt === kInt && s.thetas.every((x, k) => near(x, th[k], 1e-15)) && near(s.thetaNow, thNow, 1e-12)
    && near(s.dottieTheta, dottie, 1e-12) && s.phis.every((x, k) => near(x, -Math.PI + TAU * k / s.K, 1e-12)));
  check(`${tag}: Ω stays at the origin, ‖Δx_Ω‖ = 0`, same(s.omegaPos, [0, 0, 0]) && s.omegaShift === 0);
  check(`${tag}: the fade clamp(sin ε / 0.06, 0, 1)`, near(s.fade, Math.min(1, Math.max(0, sn / 0.06)), 1e-15));
  // the instances of the Lean theorems
  const L = s.leanInstances;
  check(`${tag}: unit Gram: ⟨I, Ω⟩ = cos ε, = 1 exactly when I = Ω`, near(L.unitGram.gram, c, 1e-12) && L.unitGram.iff && L.unitGram.isOne === (s.epsDeg === 0) && L.unitGram.same === (s.epsDeg === 0));
  const P = L.projections;
  check(`${tag}: the six projection identities on span(I) to rounding; PΩ = foot, (1 − P)Ω = r₁`, [P.idemP, P.idemQ, P.PQ, P.QP, P.sum, P.complement, P.projResidual, P.compResidual].every((x) => x < 1e-14) && Math.abs(P.orth) < 1e-14);
  const F = L.selfApplication;
  check(`${tag}: self-application: the diagonal of “a = b” under negation is all false, escapes; another table escapes; identity on one point does not`,
    F.size === s.K + 1 && F.diagonalFormula && F.escaped && F.otherEscaped && F.noFixedPoint && F.idExampleEscaped === false && F.diag.every((x) => x === false));
  check(`${tag}: the Dottie instance: cos θ* = θ*, θ* ∈ (0, 1), one sign change of cos t − t on (0, 6]`, L.dottie.residual < 1e-15 && L.dottie.inUnit && L.dottie.roots === 1 && near(L.dottie.theta, dottie, 1e-12));
  check(`${tag}: Lagrange on (I, Ω) gives sin²ε, on (r₁, r₂) sin⁴ε, both sides equal`, near(L.lagrange.pair.lhs, L.lagrange.pair.rhs, 1e-14) && near(L.lagrange.pair.lhs, sn * sn, 1e-12)
    && near(L.lagrange.wedge.lhs, L.lagrange.wedge.rhs, 1e-14) && near(L.lagrange.wedge.lhs, sn ** 4, 1e-12));
  check(`${tag}: three anchors: det G = sin⁶ε > 0 exactly when the legs are independent; √det G = sin³ε`, near(L.threeAnchor.det, sn ** 6, 1e-14) && L.threeAnchor.iff
    && L.threeAnchor.detPos === (s.epsDeg > 0) && near(L.threeAnchor.sqrtDet, sn ** 3, 1e-12));
  check(`${tag}: J = [[0, −1], [1, 0]] is skew-adjoint, unitary, J² = −1, exp(εJ)(1, 0) = (cos ε, sin ε)`, L.rotor.skewAdjoint === 0 && L.rotor.unitary === 0 && L.rotor.square === 0 && L.rotor.imageResidual < 1e-15);
  const moves = sn > 1e-9 && Math.abs(Math.sin(TAU * s.tau / 2)) > 1e-9;
  check(`${tag}: the eigenstate Ω does not move under exp(−itH), U unitary; the observer state does (when it can); ΔH = ½ sin ε`, L.energy.unitary < 1e-15 && L.energy.stationary < 1e-15
    && (moves ? L.energy.psiMoved > 1e-9 : true) && near(L.energy.spread, spread(e), 1e-12) && near(L.energy.t, TAU * s.tau, 1e-12));
  check(`${tag}: monitored return: s₀ = 1, each step and every total balance, s_k = sin²ε cos^{2(k−1)}ε, positive for 0 < ε < 90° (at 90° only while K = 1)`, L.monitored.start === 1 && L.monitored.stepResidual < 1e-15
    && L.monitored.totalResidual < 1e-14 && L.monitored.formulaResidual < 1e-15 && L.monitored.allPositive === (s.epsDeg > 0 && (s.epsDeg < 90 || s.K === 1)));
}

async function checkLinks(p, tag) {
  check(`${tag}: exactly the nine green Lean links, in #evidence`, same(await p.$$eval('[data-lean-gid]', (els) => els.map((e) => e.dataset.leanGid).sort()), [...GIDS].sort())
    && await p.$$eval('[data-lean-gid]', (els) => els.every((e) => e.closest('.col.side #evidence .lean') && e.closest('.lean').querySelector('.ok').textContent.trim() === 'LEAN ✓')));
  check(`${tag}: one ARGUED, MODEL, NUM and OPEN box each`, await p.evaluate(() => ['argued', 'model', 'num', 'open'].every((c) => document.querySelectorAll(`#evidence .lean.${c}`).length === 1)
    && document.querySelectorAll('#evidence .lean:not(.argued):not(.model):not(.num):not(.open):not(.frozen)').length === 9));
  check(`${tag}: bilingual chapter link in the drawer`, same(await p.$$eval('#drawer .refs a', (els) => els.map((e) => e.getAttribute('href')).sort()), ['zh', 'en'].map((l) => `../../${l}/${THEORY}`).sort()));
  check(`${tag}: the OPEN box links the two Chapter 33 problems in both languages`, same(await p.$$eval('#evidence .lean.open a', (els) => els.map((e) => e.getAttribute('href')).sort()),
    ['zh', 'en'].flatMap((l) => OPEN_LINKS.map((x) => `../../${l}/${x}`)).sort()));
}
/** Amber, red and green that the page writes outside its whitelist, as computed colours. */
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
    && !!document.querySelector('#stage[data-thumb] > canvas#cv') && document.querySelector('#stage > button.handle#epsHandle[type="button"]') !== null && !!document.querySelector('footer.rail #now');
}));
check('layout: #rail is the left deck holding the lens toggle, then the cards with their note, then #ctlPanel', await page.evaluate(() => {
  const deck = document.querySelector('.app.lab > aside.col.deck#rail'), lens = document.querySelector('#lensToggleBtn.lens-toggle'), cards = document.querySelector('.presets.cards#presets');
  const ctl = document.querySelector('#ctlPanel'), F = Node.DOCUMENT_POSITION_FOLLOWING;
  return !!deck && deck.contains(lens) && deck.contains(cards) && deck.contains(document.querySelector('#presetNote')) && deck.contains(ctl)
    && !!(lens.compareDocumentPosition(cards) & F) && !!(cards.compareDocumentPosition(ctl) & F) && ctl.contains(document.querySelector('#epsDeg')) && ctl.contains(document.querySelector('#chaseSteps'))
    && document.querySelectorAll('#presets [data-preset]').length === 5 && document.querySelectorAll('#ctlPanel input[type=range]').length === 2;
}));
check('layout: #infoBtn is the first child of #evidence, the only one, above every evidence box', await page.evaluate(() => {
  const ev = document.querySelector('.app.lab > aside.col.side > #evidence'), btn = document.querySelector('#infoBtn');
  const boxes = [...ev.querySelectorAll('.lean')], top = btn.getBoundingClientRect();
  return document.querySelectorAll('#infoBtn').length === 1 && ev.firstElementChild === btn && btn.matches('button.chip[type="button"]') && boxes.length === 13
    && boxes.every((b) => top.bottom <= b.getBoundingClientRect().top + 0.5) && !document.querySelector('header .status #infoBtn');
}));
check('layout: dl.ro holds one key row and five rows', await page.evaluate(() => document.querySelectorAll('dl.ro > div.key').length === 1 && document.querySelectorAll('dl.ro > div').length === 6));
check('layout: the lens toggle names both readings, the static one pressed false', await page.evaluate(() => {
  const b = document.querySelector('#lensToggleBtn');
  return b.getAttribute('aria-pressed') === 'false' && /静态投影结果概念/.test(b.textContent) && /动态观测动作概念/.test(b.textContent) && /Projection Results/.test(b.textContent) && /Observation Actions/.test(b.textContent);
}));
check('layout: opens on the default card at its still, paused', await page.evaluate((card) => { const s = window.MAYA_ERROR_DEBUG.state; return s.preset === card && s.t === 0.5 && !s.playing && s.lens === 'static'; }, DEFAULT_CARD));
check('sliders: ε over [0, 90] step 0.01 (42.35), K over [1, 16] step 1 (8)', await page.evaluate(() => {
  const e = document.querySelector('#epsDeg'), k = document.querySelector('#chaseSteps');
  return e.type === 'range' && e.min === '0' && e.max === '90' && e.step === '0.01' && Number(e.value) === 42.35 && k.type === 'range' && k.min === '1' && k.max === '16' && k.step === '1' && Number(k.value) === 8;
}));
{ const bad = await colourAudit(page); check('colours: no amber, green or red on readouts, slider outputs, legend, tagline, drawer bold, stage labels or strip text', bad.length === 0, bad.slice(0, 4).join(' | ')); }
check('stage: no warn-red or ok-green label or swatch', await page.evaluate(() => !document.querySelector('#stage .c-wn, #stage .sw.wn, #stage .c-ok, #stage .sw.ok, #stage .c-am, #stage .sw.am')));
check('handle: a type=button with z-index 3, hidden under a still', await page.evaluate(() => { const h = document.querySelector('#epsHandle'); return h.type === 'button' && getComputedStyle(h).zIndex === '3'; }));
{ const s = await state(); checkMath(s, 'opening frame'); }

/* ---------- every card, both languages ---------- */
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  for (const card of Object.keys(CARDS)) {
    await pick(card);
    await seek(stillT(card));
    const s = await state(), c = CARDS[card];
    check(`${lang}/${card}: the card sets ε, lens, Dottie, drive and K, paused at its still`, s.preset === card && s.lens === c.lens && s.dottie === c.dottie && s.drive === c.drive && s.K === c.K && !s.playing
      && near(s.tau, stillT(card), 1e-12) && near(s.epsDeg, c.drive === 'collapse' ? 60 * (1 - stillT(card)) : c.epsDeg, 1e-9) && String(await page.getAttribute(`[data-preset="${card}"]`, 'data-still')) === String(c.still)
      && near(s.camera.yaw, VIEW0[0], 1e-9) && near(s.camera.pitch, VIEW0[1], 1e-9) && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === String(c.lens === 'dynamic'));
    checkMath(s, `${lang}/${card}`);
    const v = await stageView(page, '#stage', false), lo = await labelOverlaps(page, '.stage .tag', 0);
    check(`${lang}/${card}: desktop stage, HUD and labels clear`, v.layout.length === 0 && v.hud.length === 0 && lo.length === 0, [...v.layout, ...v.hud, ...lo.map((x) => x.join(' / '))].join(' | '));
  }
}
await page.click('[data-lang-set="zh"]'); await settle(page);

// the numbers the card notes name
await pick('zero-error-turiya-silence');
{
  const s = await state(), marks = await page.evaluate(() => TRV.solids[0].marks().map((m) => m.key).filter(Boolean));
  check('card 1: ε = 0, ⟨I, Ω⟩ = 1, the residual 0, everything faded, ‖Ω‖² = 1.0000', s.epsDeg === 0 && s.fade === 0 && s.sin === 0 && s.leanInstances.unitGram.isOne && s.budget.toFixed(4) === '1.0000' && s.sin3 === 0);
  check('card 1: only the point-field is drawn (one mark, Ω; one label; one legend entry)', same(marks, ['omega']) && s.labels.length === 1 && /Ω/.test(s.labels[0].text)
    && await page.evaluate(() => document.querySelectorAll('#legend > span').length === 1));
}
await pick('dottie-self-focus-steady-state');
await seek(0.65);
{
  const s = await state();
  check('card 2 note: from θ₀ = 0 the first step jumps to 57.30°, at τ = 0.65 it is at step 7, it closes on θ* = 42.3465°', (s.thetas[1] / D).toFixed(2) === '57.30' && s.kInt === 7 && s.K === 12
    && (s.dottieTheta / D).toFixed(4) === '42.3465' && Math.abs(s.thetas[12] - s.dottieTheta) < Math.abs(s.thetas[2] - s.dottieTheta) && s.thetas.every((x) => x !== 0 || x === s.thetas[0]));
  check('card 2: the observer is on the spiral at θ(τ), off the cone, never back at 0 after the start', near(Math.acos(s.dyn[2]), s.thetaNow, 1e-12) && s.thetas.slice(1).every((x) => x > 0.5));
}
// the residual tag names the residual actually drawn: on the spiral the ruler sits at θ(τ), so its length is sin θ, not sin ε
for (const t of [1 / 12, 0.3, 0.65]) {
  await seek(t);
  const s = await state(), r = minus([0, 0, 1], times(s.dyn, dot(s.dyn, [0, 0, 1])));
  const th = [0]; for (let k = 0; k < s.K; k++) th.push(Math.cos(th[k]));
  const kNow = s.K * s.tau, kInt = Math.min(s.K, Math.floor(kNow + 1e-9)), thNow = kInt >= s.K ? th[s.K] : th[kInt] + (th[kInt + 1] - th[kInt]) * (kNow - kInt);
  const tag = s.labels.find((l) => /‖r‖/.test(l.text)), want = `‖r‖ = sin θ = ${Math.sin(thNow).toFixed(4)}`;
  check(`card 2 at τ = ${t.toFixed(4)}: the residual tag reads ${want}, the length of the drawn residual Ω − (I·Ω)I, not sin ε = ${s.sin.toFixed(4)}`,
    !!tag && tag.text === want && near(len(r), Math.sin(thNow), 1e-12) && (t !== 1 / 12 || (s.kInt === 1 && tag.text === '‖r‖ = sin θ = 0.8415')), tag ? tag.text : 'no residual tag');
}
await pick('static-projection-results-hierarchy');
{
  const s = await state();
  check('card 3 note: (cos ε)I = 0.7390, (cos²ε)Ω = 0.5462, r₁ = 0.6737, sin²ε = 0.4538, Ω(ε, ε) = 0.2979, ½ sin²ε = 0.2269, sin³ε = 0.3057',
    [s.cos, s.cos2, len(s.residual), s.sin2, s.girard, s.halfSin2, s.sin3].map((x) => x.toFixed(4)).join() === '0.7390,0.5462,0.6737,0.4538,0.2979,0.2269,0.3057');
  check('card 3: at τ = 0.5 the ruler is I(ε) = (sin ε, 0, cos ε)', vnear(s.observer, [Math.sin(s.eps), 0, Math.cos(s.eps)], 1e-12));
}
await pick('dynamic-observation-action-chase');
await seek(0.5);
{
  const s = await state();
  check('card 4 note: 12 steps, at τ = 0.5 step 6, residual sin ε = 0.6737, ΔE/ħω = 0.3368, s_k > 0 for every k', s.K === 12 && s.kInt === 6 && s.sin.toFixed(4) === '0.6737' && s.mtSpread.toFixed(4) === '0.3368'
    && s.survival.every((x) => x > 0) && s.omegaShift === 0);
  const tag = s.labels.find((l) => /‖r‖/.test(l.text));
  check('card 4: off the spiral the residual tag reads ‖r‖ = sin ε = 0.6737', !!tag && tag.text === '‖r‖ = sin ε = 0.6737', tag ? tag.text : 'no residual tag');
}
await pick('maya-scaling-collapse-audit');
await seek(0.75);
{
  const s = await state();
  check('card 5 note: at τ = 0.75, ε = 15°, sin ε = 0.2588, sin²ε = 0.0670, sin³ε = 0.0173', near(s.epsDeg, 15, 1e-9) && [s.sin, s.sin2, s.sin3].map((x) => x.toFixed(4)).join() === '0.2588,0.0670,0.0173');
}
for (const t of [0, 0.3, 0.6, 0.9, 1]) {
  await seek(t);
  const s = await state();
  check(`card 5: ε(τ) = 60°(1 − τ) at τ = ${t}, volume < area < residual for 0 < ε < 90°`, near(s.epsDeg, 60 * (1 - t), 1e-9) && (s.epsDeg === 0 || (s.sin3 < s.sin2 && s.sin2 < s.sin)));
}
{ await seek(1); const s = await state(); check('card 5 at τ = 1: ε = 0, everything has faded', s.epsDeg === 0 && s.fade === 0); }

/* ---------- every control ---------- */
await pick(DEFAULT_CARD);
for (const v of [0, 0.5, 3, 42.35, 60, 90]) {
  await input('#epsDeg', v);
  const s = await state();
  check(`slider ε = ${v}: leaves the card, sets the error`, s.preset === null && near(s.epsDeg, v, 1e-9) && s.drive === 'phase' && await page.inputValue('#epsDeg') === String(v));
  checkMath(s, `ε = ${v}`);
}
{
  await input('#epsDeg', 2); const a = await state(); await input('#epsDeg', 1); const b = await state();
  check('slider ε: below sin ε = 0.06 the marks fade continuously', a.fade < 1 && b.fade < a.fade && b.fade > 0 && near(a.fade, Math.sin(2 * D) / 0.06, 1e-12));
}
await input('#epsDeg', 42.35);
for (const k of [1, 5, 16]) {
  await input('#chaseSteps', k);
  const s = await state();
  check(`slider K = ${k}: the chase has K steps and K + 1 survival values`, s.K === k && s.survival.length === k + 1 && s.phis.length === k + 1);
  checkMath(s, `K = ${k}`);
}
await input('#chaseSteps', 8);
// lens: the same state, two readings, a smooth crossfade
{
  const before = await state();
  await page.click('#lensToggleBtn'); await settle(page);
  const a = await state();
  check('lens toggle: to the observation actions, same ε, K and τ, aria-pressed true', a.lens === 'dynamic' && a.lam === 1 && a.preset === null && a.epsDeg === before.epsDeg && a.K === before.K && a.tau === before.tau
    && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === 'true');
  checkMath(a, 'action lens');
  await page.click('#lensToggleBtn'); await settle(page);
  const b = await state();
  check('lens toggle: back to the projection results, aria-pressed false', b.lens === 'static' && b.lam === 0 && await page.getAttribute('#lensToggleBtn', 'aria-pressed') === 'false');
  const seen = await page.evaluate(() => new Promise((resolve) => {
    const vals = [];
    const tick = () => { const m = window.MAYA_ERROR_DEBUG.state.lam; vals.push(m); if (m >= 1 || vals.length > 600) resolve(vals); else requestAnimationFrame(tick); };
    document.getElementById('lensToggleBtn').click(); requestAnimationFrame(tick);
  }));
  check('lens toggle: the readings cross-fade through intermediate frames', seen.some((m) => m > 0.05 && m < 0.95) || seen.length <= 2, JSON.stringify(seen.slice(0, 8)));
  await settle(page);
  await page.click('#lensToggleBtn'); await settle(page);
}

/* ---------- the chase note: s_K > 0 only for 0 < ε < 90° (at 90° only while K = 1); 0 from beat 2 at 90°, from beat 1 at 0 ---------- */
async function chaseAt(epsDeg, K) {
  await page.evaluate(([e, k]) => window.MAYA_ERROR_DEBUG.setState({ lens: 'dynamic', dottie: false, epsDeg: e, K: k, t: 0.5 }), [epsDeg, K]);
  await settle(page);
  return { s: await state(), html: await page.innerHTML('#roNote'), text: await page.textContent('#roNote') };
}
/** The printed s_K of a positive tail: a decimal, or m × 10⁻ᵉ below 10⁻⁴. */
const printedTail = (html) => {
  const sci = html.match(/s<sub>K<\/sub> = ([\d.]+) × 10<sup>−(\d+)<\/sup>/), dec = html.match(/s<sub>K<\/sub> = (\d\.\d{6})(?![\d×])/);
  return sci ? { value: Number(sci[1]) * 10 ** -Number(sci[2]), digits: 2, sci: true } : dec ? { value: Number(dec[1]), digits: 6, sci: false } : null;
};
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  const beat = (k) => (lang === 'zh' ? `第 ${k} 拍` : `beat ${k}`);
  {
    const { s, html, text } = await chaseAt(90, 12), mon = monitored(90 * D, 12);
    check(`${lang} chase note ε = 90°, K = 12: s₁ = 1, p₂ = 1, s₂ = … = s₁₂ = 0 (Rodrigues agrees), and the note says so without claiming s_K > 0`,
      s.survival[1] === 1 && s.returns[2] === 1 && s.survival.slice(2).every((x) => x === 0) && near(mon.s[1], 1, 1e-12) && near(mon.p[2], 1, 1e-12) && mon.s.slice(2).every((x) => x < 1e-30)
      && !/>\s*0/.test(text) && html.includes('p<sub>1</sub> = 0') && html.includes('s<sub>1</sub> = 1') && html.includes('p<sub>2</sub> = 1') && html.includes('s<sub>2</sub> = … = s<sub>12</sub> = 0')
      && text.includes(beat(2)) && !/s<sub>K<\/sub> = 0\.0/.test(html), text);
    checkMath(s, `${lang} chase ε = 90°, K = 12`);
  }
  {
    const { html, text } = await chaseAt(90, 2);
    check(`${lang} chase note ε = 90°, K = 2: the zero tail is the single s₂ = 0`, html.includes('s<sub>2</sub> = 0') && !html.includes('…') && !/>\s*0/.test(text), text);
  }
  {
    const { s, html, text } = await chaseAt(90, 1);
    check(`${lang} chase note ε = 90°, K = 1: s₁ = 1 > 0 is stated, with the full return on beat 2 still to come`, same(s.survival, [1, 1]) && s.leanInstances.monitored.allPositive
      && /s1 = 1 > 0/.test(text) && html.includes('p<sub>2</sub> = 1') && text.includes(beat(2)), text);
    checkMath(s, `${lang} chase ε = 90°, K = 1`);
  }
  {
    const { s, html, text } = await chaseAt(0, 12);
    check(`${lang} chase note ε = 0, K = 12: everything returns on beat 1, s₁ = … = s₁₂ = 0, no positive tail claimed`, s.returns[1] === 1 && s.survival.slice(1).every((x) => x === 0)
      && !/>\s*0/.test(text) && html.includes('p<sub>1</sub> = 1') && html.includes('s<sub>1</sub> = … = s<sub>12</sub> = 0') && text.includes(beat(1)), text);
    checkMath(s, `${lang} chase ε = 0, K = 12`);
  }
  for (const [eps, K] of [[42.35, 12], [60, 16], [80, 16], [89.99, 16], [0.01, 8]]) {
    const { s, html, text } = await chaseAt(eps, K), mon = monitored(eps * D, K), p = printedTail(html), want = mon.s[K];
    const agrees = !!p && (p.sci ? Math.abs(p.value / want - 1) <= 0.006 : p.value.toFixed(6) === want.toFixed(6));
    check(`${lang} chase note ε = ${eps}°, K = ${K}: s_K > 0 is stated and the printed s_K = ${want.toExponential(3)} is positive and agrees with the Rodrigues turn`,
      want > 0 && s.survival[K] > 0 && />\s*0/.test(text) && !!p && p.value > 0 && agrees && p.sci === (want < 1e-4), `${text} | ${p ? p.value : 'unparsed'}`);
    checkMath(s, `${lang} chase ε = ${eps}°, K = ${K}`);
  }
}
await page.click('[data-lang-set="zh"]'); await settle(page);

/* ---------- the handle: drag in 3D without turning the camera ---------- */
await pick(DEFAULT_CARD);
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const before = await state(), h = await page.evaluate(() => window.MAYA_ERROR_DEBUG.handleBox());
  const target = await page.evaluate(() => window.MAYA_ERROR_DEBUG.dragTarget(25));
  check('ε handle: a visible amber button on the tip of the ruler', !!h && await page.locator('#epsHandle').isVisible() && !!before.handle);
  if (h && target) {
    await page.mouse.move(h.x, h.y); await page.mouse.down();
    check('ε handle: pointerdown starts a drag', await page.locator('#epsHandle').evaluate((el) => el.classList.contains('dragging')));
    await page.mouse.move(target.x, target.y, { steps: 6 }); await page.mouse.up(); await settle(page);
    const after = await state();
    check('ε handle: the drag sets ε ≈ 25° along the meridian and leaves the camera alone', Math.abs(after.epsDeg - 25) < 1 && same(after.camera, before.camera) && after.preset === null, `${after.epsDeg}`);
    checkMath(after, 'after the ε drag');
  }
  const e0 = (await state()).epsDeg, t0 = (await state()).t;
  await page.locator('#epsHandle').focus(); await page.keyboard.press('ArrowLeft'); await settle(page);
  const k = await state();
  check('ε handle: ← lowers ε by 0.5° and leaves the clock alone', near(k.epsDeg, e0 - 0.5, 1e-9) && k.t === t0, `${e0} → ${k.epsDeg}`);
  await page.keyboard.press('ArrowUp'); await settle(page);
  check('ε handle: ↑ raises it back', near((await state()).epsDeg, e0, 1e-9));
}

/* ---------- drawer, playback ---------- */
await page.click('#infoBtn'); await settle(page);
check('info button opens the theory drawer', await page.locator('#drawer [role="dialog"]').isVisible());
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').isHidden());
check('play advances the rail', await playsAfter(page, () => page.locator('#play').evaluate((b) => b.click()), () => window.MAYA_ERROR_DEBUG.state));
await pause();
{ const a = await state(); await settle(page); const b = await state(); check('pause holds the clock', !a.playing && a.t === b.t); }
for (const card of Object.keys(CARDS).filter((c) => CARDS[c].play)) {
  check(`card ${card}: a click plays its story`, await playsAfter(page, () => page.click(`[data-preset="${card}"]`), () => window.MAYA_ERROR_DEBUG.state));
  await pause();
}
for (const card of Object.keys(CARDS).filter((c) => !CARDS[c].play)) {
  await page.click(`[data-preset="${card}"]`); await settle(page);
  const s = await state();
  check(`card ${card}: a click parks it paused on its still`, s.preset === card && !s.playing && near(s.t, CARDS[card].still, 1e-12));
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
  check(`still ${lang}/${card}: paused on the declared frame, no handle`, s.preset === card && !s.playing && near(s.t, stillT(card), 1e-12) && await p.locator('#epsHandle').isHidden()
    && await p.evaluate(() => TRV.still && TRV.shot && document.documentElement.dataset.trPalette === undefined));
  if (card === 'zero-error-turiya-silence') check(`still ${lang}/${card}: ε = 0, only Ω`, s.epsDeg === 0 && s.fade === 0 && s.labels.length === 1);
  if (card === 'dottie-self-focus-steady-state') check(`still ${lang}/${card}: step 7 of the spiral towards θ*`, s.kInt === 7 && s.dottie && s.lens === 'dynamic');
  if (card === 'static-projection-results-hierarchy') check(`still ${lang}/${card}: sin ε, sin²ε, sin³ε = 0.6737, 0.4538, 0.3057`, [s.sin, s.sin2, s.sin3].map((x) => x.toFixed(4)).join() === '0.6737,0.4538,0.3057');
  if (card === 'dynamic-observation-action-chase') check(`still ${lang}/${card}: step 6 of 12, Ω fixed`, s.kInt === 6 && s.K === 12 && s.omegaShift === 0);
  if (card === 'maya-scaling-collapse-audit') check(`still ${lang}/${card}: ε = 15°`, near(s.epsDeg, 15, 1e-9));
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
