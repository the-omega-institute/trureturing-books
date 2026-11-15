// HORIZON//THERMO browser regression: shared stage quality, independent identities, benchmarks and real reader interactions.
// Run directly with node; VIZ_PHASE1=1 skips the repeated card/still matrix, while VIZ_SLOW_FRAMES=1000 exercises every
// transition and playback assertion with deliberately sparse animation frames. Every property the page claims is checked
// against an algorithm written here (double-angle weights, log₂ entropies, atanh temperatures, the brute-force spectrum of
// the twelve-qubit cut as a tensor product, Newton's method for θ*), never by calling the page's own functions.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'bounded-horizon-thermodynamics-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const PHASE1 = process.env.VIZ_PHASE1 === '1';
const DEG = Math.PI / 180;

/* ---------- independent references ---------- */
/** θ* = cos θ* by Newton's method on f(t) = cos t − t (the page uses bisection). */
const THETA_STAR = (() => { let t = 0.75; for (let i = 0; i < 60; i++) t -= (Math.cos(t) - t) / (-Math.sin(t) - 1); return t; })();
const CARDS = {
  'omniscient-zero': { thetaRad: 45 * DEG, NA: 12, still: 0, plays: false },
  'isolated-zeno': { thetaRad: 0, NA: 6, still: 0, plays: false },
  'horizon-page-curve': { thetaRad: 45 * DEG, NA: 6, still: 0, plays: false },
  'modular-unruh-heat': { thetaRad: 30 * DEG, NA: 6, still: 2, plays: true },
  'dottie-living-steady': { thetaRad: THETA_STAR, NA: 6, still: Math.PI, plays: true }
};
// The twelve declarations of the §34.17 master theorem and the three the text cites inline: every one is a LEAN ✓ box.
const GIDS = [
  'D5/S3/Quantum/Information/PartialTraceMutualInformation.marginalRight_productState',
  'D5/S3/Quantum/Information/PartialTraceMutualInformation.marginalLeft_productState',
  'D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal',
  'D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot',
  'D5/S3/Quantum/Decoherence/ReducedRecordAccessDefect.reduced_irreversibility_is_access_defect',
  'D5/S3/ConceptDynamics/InformationEscape/EscapePairs.escapePairs_without_eq_union',
  'D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean',
  'D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity',
  'D5/S3/Quantum/Information/CorrelatedGibbsEnergyIdentity.gibbs_relative_entropy_energy_difference',
  'D5/S3/Quantum/Information/CorrelatedGibbsEnergyIdentity.marginal_entropy_change_eq_mutual_information_change',
  'D5/S3/DivergenceSupport/LandauerIdentity.landauer_identity_from_balances',
  'D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance',
  'D5/S3/DivergenceSupport/LandauerSaturation.landauer_saturation_iff',
  'D5/S3/Quantum/Divergence/CanonicalChannelDPI.extended_quantum_relative_entropy_channel_dpi',
  'D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint'
];
const FROZEN_GIDS = [];
const THEORY = ['zh', 'en'].map((lang) => `../../${lang}/ch34-s17-entanglement-horizon-and-thermodynamics.html#sec-ch34-entanglement-horizon-and-thermodynamics`);
// The 6-decimal Schmidt table and pair-cut Page curves of the §34.17 benchmark sheet (80-digit arithmetic, rounded).
const BENCH = {
  0: { cos2: 1, sin2: 0, bias: 1, purity: 1, nats: 0, bits: 0, beta: Infinity, T: 0, D: 0.693147, Dbits: 1 },
  15: { cos2: 0.933013, sin2: 0.066987, bias: 0.866025, purity: 0.875, nats: 0.245775, bits: 0.354579, beta: 2.633916, T: 0.379663, D: 0.447372, Dbits: 0.645421 },
  30: { cos2: 0.75, sin2: 0.25, bias: 0.5, purity: 0.625, nats: 0.562335, bits: 0.811278, beta: 1.098612, T: 0.910239, D: 0.130812, Dbits: 0.188722 },
  'θ*': { cos2: 0.546247, sin2: 0.453753, bias: 0.092494, purity: 0.504278, nats: 0.688864, bits: 0.99382, beta: 0.185518, T: 5.390324, D: 0.004284, Dbits: 0.00618 },
  42.35: { cos2: 0.546185, sin2: 0.453815, bias: 0.092371, purity: 0.504266, nats: 0.688875, bits: 0.993836, beta: 0.185269, T: 5.397548, D: 0.004272, Dbits: 0.006164 },
  45: { cos2: 0.5, sin2: 0.5, bias: 0, purity: 0.5, nats: 0.693147, bits: 1, beta: 0, T: Infinity, D: 0, Dbits: 0 }
};
const PAGE_BENCH = {   // bits at N_A = 0, 2, …, 12
  15: [0, 0.709158, 1.418316, 2.127473, 1.418316, 0.709158, 0],
  30: [0, 1.622556, 3.245113, 4.867669, 3.245113, 1.622556, 0],
  'θ*': [0, 1.98764, 3.97528, 5.96292, 3.97528, 1.98764, 0],
  42.35: [0, 1.987673, 3.975346, 5.963019, 3.975346, 1.987673, 0],
  45: [0, 2, 4, 6, 4, 2, 0]
};
const NS = [0, 2, 4, 6, 8, 10, 12];
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-11) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
/** Distance of two angles on the circle. */
const angle = (a, b) => { const d = Math.abs(((a - b) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI)); return Math.min(d, 2 * Math.PI - d); };
const nearInf = (finite, infinite, x, tol) => (x === Infinity ? finite === null && infinite === true : near(finite, x, tol) && infinite === false);

/** One pair from the double-angle form: p = (1 + cos 2θ)/2, entropies in log₂, βΔE = 2 atanh(cos 2θ). */
function ref(theta) {
  const c2 = Math.abs(theta - Math.PI / 4) < 1e-12 ? 0 : Math.cos(2 * theta), p = (1 + c2) / 2, q = (1 - c2) / 2;
  const h2 = (x) => (x > 0 ? -x * Math.log2(x) : 0), bits = h2(p) + h2(q);
  const beta = theta < 1e-12 ? Infinity : 2 * Math.atanh(c2), T = theta < 1e-12 ? 0 : c2 === 0 ? Infinity : 1 / beta;
  return { p, q, bias: c2, purity: 1 - 2 * p * q, bits, nats: bits * Math.LN2, beta, T, Dbits: 1 - bits };
}
/** S(A) of the twelve-qubit pair model by brute force: the spectrum of ρ_A is the tensor product of {p, q} over the pairs
    (k, 13 − k) with exactly one qubit in A = {1, …, n}; pairs wholly inside A are pure and add a factor {1}. */
function pageBrute(theta, n) {
  const { p, q } = ref(theta), A = new Set(Array.from({ length: n }, (_, i) => i + 1));
  let spec = [1], crossing = 0;
  for (let k = 1; k <= 6; k++) {
    const inA = Number(A.has(k)) + Number(A.has(13 - k));
    if (inA === 1) { crossing++; spec = spec.flatMap((x) => [x * p, x * q]); }
  }
  const bits = spec.reduce((acc, x) => acc + (x > 0 ? -x * Math.log2(x) : 0), 0);
  return { crossing, bits, nats: bits * Math.LN2, eigenvalues: spec.length, trace: spec.reduce((a, x) => a + x, 0) };
}

const T = await session();
const { page, check } = T;

// Headless Chromium can report driver diagnostics as warnings. They are harmless; every other warning is a failure.
const driverInfo = /KHR_parallel_shader_compile|GPU stall due to ReadPixels|SwiftShader|GL Driver Message|WEBGL_debug_renderer_info/;
const browserWarnings = [];
const watchedPages = new WeakSet();
function watchPage(p) {
  if (watchedPages.has(p)) return;
  watchedPages.add(p);
  p.on('console', (m) => {
    if ((m.type() === 'info' || m.type() === 'warning') && driverInfo.test(m.text())) return;
    if (m.type() === 'warning') browserWarnings.push(`${p.url()}: ${m.text()}`);
  });
}

// Audit the shared night-console contract before page scripts run, including attempted writes that are later removed.
const paletteMutations = [], paletteDocuments = [];
async function watchPalette(context) {
  await context.exposeBinding('__horizonPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__horizonPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__horizonPaletteAudit({ kind: 'document',
      absent: document.documentElement.dataset.trPalette === undefined, dark: matchMedia('(prefers-color-scheme: dark)').matches }).catch(() => {}), { once: true });
  });
  context.on('page', watchPage);
  context.pages().forEach(watchPage);
}
let requestedColorScheme = 'dark';
await watchPalette(T.context);
const browserNewContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async (options) => {
  const context = await browserNewContext({ ...options, colorScheme: requestedColorScheme });
  await watchPalette(context);
  return context;
};
watchPage(page);
await page.emulateMedia({ colorScheme: 'dark' });

// The shared gate covers the canonical desktop/mobile/embed paths and the solid WebGL stage.
await stageFirstChecks(T, BOOK, ID, { solid: true, cards: !PHASE1, settle: 0 });

const state = (p = page) => p.evaluate(() => window.HORIZON_THERMO_DEBUG.state);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
  await settle(p);
}
async function pause(p = page) {
  await settle(p);
  if ((await state(p)).playing) await p.click('#play');
  await settle(p);
}
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  await until(p, (q) => { const s = window.HORIZON_THERMO_DEBUG.state; return Math.abs(s.thetaRad - q.thetaRad) < 1e-12 && s.NA === q.NA && s.horizonShown === q.NA; }, CARDS[card]);
  await pause(p);
}

/** Every number of the state against the independent references. */
function checkMath(s, tag) {
  const r = ref(s.thetaRad), pb = pageBrute(s.thetaRad, s.NA);
  check(`${tag}: finite controls`, s.thetaRad >= 0 && s.thetaRad <= Math.PI / 4 + 1e-15 && NS.includes(s.NA) && near(s.thetaDeg, s.thetaRad / DEG) && near(s.fraction, s.NA / 12));
  check(`${tag}: Schmidt weights from the double angle`, near(s.cos2, r.p, 1e-12) && near(s.sin2, r.q, 1e-12) && near(s.weightSum, 1, 1e-15)
    && near(s.orderBias, r.bias, 1e-12) && near(s.purity, r.purity, 1e-12));
  check(`${tag}: entanglement entropy in log₂ and nats`, near(s.entropyBits, r.bits, 1e-12) && near(s.entropyNats, r.nats, 1e-12)
    && near(s.relEntropyToMixedBits, r.Dbits, 1e-12) && near(s.relEntropyToMixedNats, Math.LN2 - r.nats, 1e-12));
  check(`${tag}: βΔE = 2 atanh(cos 2θ) and k_B T_eff/ΔE`, nearInf(s.betaDeltaE, s.betaDeltaEInfinite, r.beta, 1e-9) && nearInf(s.tempRatio, s.tempRatioInfinite, r.T, 1e-9 * Math.max(1, r.T)));
  check(`${tag}: twelve-qubit cut by brute-force spectrum`, s.crossingPairs === pb.crossing && near(s.pageBits, pb.bits, 1e-10) && near(s.pageNats, pb.nats, 1e-10)
    && pb.eigenvalues === 2 ** pb.crossing && near(pb.trace, 1, 1e-12) && s.globalEntropy === 0
    && s.insidePairs === Math.max(0, s.NA - 6) && s.outsidePairs === Math.max(0, 6 - s.NA) && s.crossingPairs + s.insidePairs + s.outsidePairs === 6
    && s.severedArcs === (s.thetaRad < 1e-12 ? 0 : pb.crossing));
  check(`${tag}: Page curve over every cut`, s.pageCurve.length === 7 && s.pageCurve.every((c, i) => { const b = pageBrute(s.thetaRad, NS[i]); return c.NA === NS[i] && c.crossing === Math.min(NS[i], 12 - NS[i]) && near(c.bits, b.bits, 1e-10); }));
  const rate = Number.isFinite(r.beta) ? r.beta : null;
  check(`${tag}: modular phase s · 2 ln cot θ (mod 2π)`, rate === null ? s.modularRate === null && s.modularPhase === null
    : near(s.modularRate, rate, 1e-9) && s.modularPhase >= 0 && s.modularPhase < 2 * Math.PI && angle(s.modularPhase, s.modularTime * rate) < 1e-9);
  check(`${tag}: Landauer bound (k_B T_eff/ΔE) ln 2`, r.T === Infinity ? s.landauer.perBitInfinite === true : near(s.landauer.perBitOverDE, Math.LN2 * r.T, 1e-9 * Math.max(1, r.T)));
  check(`${tag}: Unruh-equivalent acceleration 2π k_B T_eff/ΔE`, r.T === Infinity ? s.unruhAccelerationInfinite === true : near(s.unruhAcceleration, 2 * Math.PI * r.T, 1e-9 * Math.max(1, r.T)));
  if (s.thetaRad > 1e-4 && s.thetaRad < Math.PI / 4 - 1e-4) check(`${tag}: first law dE/dS = k_B T_eff`, !!s.firstLaw && near(s.firstLaw.dEdS, r.T, 1e-6 * Math.max(1, r.T)));
  if (s.thetaRad > 1e-12) {
    const g = s.gibbs, f = ref(s.thetaRad + g.deltaRad);
    const lhs = (f.p > 0 ? f.p * (Math.log(f.p) - Math.log(r.p)) : 0) + (f.q > 0 ? f.q * (Math.log(f.q) - Math.log(r.q)) : 0);
    const rhs = (Number.isFinite(r.beta) ? r.beta : 0) * (f.q - r.q) - (f.nats - r.nats);
    check(`${tag}: Gibbs identity D(ρ′‖ρβ) = βΔE − ΔS on the page instance`, near(Math.abs(g.deltaRad), 0.5 * DEG, 1e-15) && near(g.lhs, lhs, 1e-12) && near(g.rhs, rhs, 1e-12) && g.residual < 1e-12 && g.lhs >= -1e-15);
  }
  const L = s.leanInstances;
  check(`${tag}: Lean instances`, L.bell.rank === 1 && near(L.bell.trace, 1, 1e-12) && L.bell.halfIdentityResidual < 1e-12 && near(L.bell.marginalPurity, 0.5, 1e-12) && L.bell.marginalIdempotencyGap > 0.2
    && L.access.unitaryResidual === 0 && L.access.marginalResidual < 1e-12 && L.access.arcResidual < 1e-12 && L.access.reverseResidual < 1e-12
    && near(L.access.jointGap, Math.cos(s.thetaRad) * Math.sin(s.thetaRad), 1e-12)
    && near(L.dpi.before, Math.log(4), 1e-12) && near(L.dpi.after, Math.LN2 - r.nats, 1e-12) && L.dpi.holds
    && near(L.landauer.betaHeat, r.nats, 1e-12) && L.landauer.residual < 1e-15 && L.landauer.boundHolds
    && near(L.dottie.theta, THETA_STAR, 1e-14) && L.dottie.signChanges === 1 && L.dottie.inUnitInterval && L.dottie.insideSchmidtRange
    && L.product.residual === 0 && L.product.leftResidual === 0 && L.product.purity === 1);
  // m = n = 2 by counting: (m² − 1) + (n² − 1) local, (m² − 1)(n² − 1) correlations, share over m²n² − 1
  const sin2t = Math.sin(2 * s.thetaRad), c = Math.cos(s.thetaRad), sn = Math.sin(s.thetaRad);
  check(`${tag}: blind-spot sectors 6 + 9 of 15, orthogonal; local coefficients blind to the coherence`, L.blindSpot.localDim === (4 - 1) + (4 - 1) && L.blindSpot.correlationDim === 9
    && L.blindSpot.tracelessDim === 15 && near(L.blindSpot.correlationShare, 9 / 15, 1e-15) && L.blindSpot.orthogonalityResidual < 1e-12
    && L.blindSpot.witnessMarginalGap < 1e-15 && near(L.blindSpot.witnessGlobalGap, 0.5, 1e-12) && L.blindSpot.localGap < 1e-12 && near(L.blindSpot.correlationGap, Math.abs(sin2t), 1e-12));
  {
    // brute force over the 12 ordered pairs of {00, 01, 10, 11} with readouts Z_A (high bit) and Z_B (low bit)
    const pairs = []; for (let x = 0; x < 4; x++) for (let y = 0; y < 4; y++) if (x !== y) pairs.push([x, y]);
    const agreeA = ([x, y]) => (x >> 1) === (y >> 1), agreeB = ([x, y]) => (x & 1) === (y & 1);
    const full = pairs.filter((q) => agreeA(q) && agreeB(q)).length, withoutB = pairs.filter(agreeA).length, uniqueB = pairs.filter((q) => agreeA(q) && !agreeB(q)).length;
    check(`${tag}: leave-one-out escape pairs 0 ∪ 4 = 4`, L.escape.fullEscape === full && L.escape.withoutB === withoutB && L.escape.uniqueB === uniqueB && full === 0 && withoutB === 4 && L.escape.holds);
  }
  check(`${tag}: pinching Pythagoras 1 = (cos⁴θ + sin⁴θ) + 2cos²θ sin²θ`, near(L.pinching.total, 1, 1e-12) && near(L.pinching.pinched, c ** 4 + sn ** 4, 1e-12) && near(L.pinching.offDiagonal, 2 * (c * sn) ** 2, 1e-12) && L.pinching.residual < 1e-12);
  check(`${tag}: coherence deletion: first step from |0⟩ produces S_A, the steps add up and stay non-negative`, near(L.entropyProduction.firstStep, r.nats, 1e-12)
    && L.entropyProduction.residual < 1e-12 && L.entropyProduction.sumResidual < 1e-12 && L.entropyProduction.minRelativeEntropy >= -1e-15 && L.entropyProduction.steps.length === 3);
  check(`${tag}: ΔS_A + ΔS_B = ΔI = 2 S_A for the preparing unitary`, L.mutualInformation.unitaryResidual < 1e-15 && L.mutualInformation.arcResidual < 1e-12 && L.mutualInformation.pureJoint
    && near(L.mutualInformation.lhs, 2 * r.nats, 1e-12) && near(L.mutualInformation.rhs, 2 * r.nats, 1e-12));
  check(`${tag}: Landauer bound attained exactly when I = D = 0`, L.landauer.boundHolds && L.landauer.saturated && L.landauer.saturationIff && L.landauer.mutualInformation === 0 && L.landauer.reservoirDivergence === 0);
}

async function checkLinks(p, tag) {
  const links = await p.$$eval('[data-lean-gid]', (els) => els.map((e) => ({ gid: e.dataset.leanGid, frozen: !!e.closest('.lean.frozen'), side: !!e.closest('.col.side #evidence .lean'), badge: e.closest('.lean').querySelector('.ok')?.textContent.trim() })));
  check(`${tag}: exact LEAN ✓ evidence links`, same(links.filter((l) => !l.frozen).map((l) => l.gid).sort(), [...GIDS].sort()) && links.filter((l) => !l.frozen).every((l) => l.side && l.badge === 'LEAN ✓'));
  check(`${tag}: no FROZEN box (the text cites every theorem the page shows)`, same(links.filter((l) => l.frozen).map((l) => l.gid).sort(), [...FROZEN_GIDS].sort()) && links.length === GIDS.length);
  check(`${tag}: exact bilingual theory link`, same(await p.$$eval('#drawer a[href^="../../"]', (els) => els.map((e) => e.getAttribute('href')).sort()), [...THEORY].sort()));
  check(`${tag}: one OPEN box in the drawer, ARGUED, MODEL and NUM in the evidence panel`, await p.evaluate(() => document.querySelectorAll('#drawer .lean.open').length === 1
    && ['argued', 'model', 'num'].every((k) => document.querySelectorAll(`#evidence .lean.${k}`).length === 1)));
}

/* ---------- sources ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((file) => [file, fs.readFileSync(path.join(DIR, file), 'utf8')]));
for (const [file, source] of Object.entries(sources)) {
  check(`source ${file}: no literal colour or palette override`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(source) && !/\btrPalette\b|data-tr-palette|--warn\b/.test(source));
  check(`source ${file}: no glyph traps (’s, ⋆)`, !/’s\b|⋆/.test(source));
}
check('source: shared three-column grid and wheel:false', !/grid-template-columns\s*:/i.test(sources['style.css']) && /wheel:\s*false/.test(sources['main.js']));
check('source: all five public presets remain in order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1]), Object.keys(CARDS)));
{
  const fig = sources['main.js'].slice(sources['main.js'].indexOf('const FIGURE_NOTES'), sources['main.js'].indexOf('function applyPreset'));
  check('source: cited-figure notes carry no sub- or superscripts', fig.length > 200 && !/<su[bp]>/.test(fig));
}
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID) || {};
check('registry: live §34.17 entry with five bilingual cards and the fifteen LEAN ✓ GIDs', entry.status === 'live' && entry.chapter === 34 && entry.section === '34.17'
  && same(entry.presets, Object.keys(CARDS)) && (entry.presets || []).every((c) => entry.preset_titles?.[c]?.zh && entry.preset_titles?.[c]?.en)
  && same((entry.lean || []).map((x) => x.gid).sort(), [...GIDS].sort()), JSON.stringify({ status: entry.status, section: entry.section, lean: (entry.lean || []).length }));

/* ---------- DOM contract ---------- */
await T.goto(BOOK, ID, '?lang=en');
await settle(page);
check('runtime: shared scripts and styles', same(await page.$$eval('script', (els) => els.map((e) => e.getAttribute('src'))), ['../assets/shell.js', '../assets/kit.js', 'main.js'])
  && same(await page.$$eval('link[rel="stylesheet"]', (els) => els.map((e) => e.getAttribute('href')).filter((h) => !h.startsWith('https:'))), ['../assets/theme.css', 'style.css']));
await checkLinks(page, 'runtime');
check('layout: exact three-column lab contract, stage canvas and centered strip', await page.evaluate(() => {
  const app = document.querySelector('#app.app.lab'), deck = app.querySelector(':scope > aside.col.deck'), center = app.querySelector(':scope > main.center'), side = app.querySelector(':scope > aside.col.side');
  const d = deck.getBoundingClientRect(), c = center.getBoundingClientRect(), s = side.getBoundingClientRect();
  const tracks = getComputedStyle(app).gridTemplateColumns;
  return getComputedStyle(app).display === 'grid' && tracks.trim().split(/\s+/).length === 3 && d.right <= c.left + 1 && c.right <= s.left + 1
    && !!center.querySelector(':scope > #stageWrap.stage > canvas#stage') && !!center.querySelector(':scope > #stageWrap > .hud-tl') && !!center.querySelector(':scope > #stageWrap > .hud-tr')
    && !!center.querySelector(':scope > #stageWrap > .hud-bl') && !!center.querySelector(':scope > .tour') && !!center.querySelector(':scope > .strip #plot') && !document.querySelector('#stageWrap #plot')
    && !!deck.querySelector('#presets') && !!deck.querySelector('#ctlPanel') && !!side.querySelector(':scope > #readouts') && !!side.querySelector(':scope > #evidence #infoBtn')
    && !!app.querySelector(':scope > footer.rail .clock input[type=range]#now') && !!document.querySelector('#drawer #drawerClose') && document.querySelector('.logo').dataset.text === 'HORIZON//THERMO';
}));
check('layout: readouts, mini chart and evidence are visible', await page.locator('.col.side #readouts').isVisible() && await page.locator('#miniChart svg').isVisible() && await page.locator('.col.side #evidence').isVisible());
check('rail: modular time s runs over [0, 2π]', await page.evaluate(() => { const r = document.querySelector('#now'); return Number(r.min) === 0 && Math.abs(Number(r.max) - 2 * Math.PI) < 1e-12; }));

/* ---------- benchmarks to 1e-6 through the real slider (θ* through the snap button) ---------- */
for (const [label, b] of Object.entries(BENCH)) {
  if (label === 'θ*') { await page.click('#snapDottie'); await settle(page); } else await input('#theta', label);
  const s = await state();
  check(`benchmark ${label}: weights, purity, bias`, near(s.cos2, b.cos2, 1e-6) && near(s.sin2, b.sin2, 1e-6) && near(s.purity, b.purity, 1e-6) && near(s.orderBias, b.bias, 1e-6));
  check(`benchmark ${label}: S_A in nats and bits, D(ρ_A‖I/2)`, near(s.entropyNats, b.nats, 1e-6) && near(s.entropyBits, b.bits, 1e-6) && near(s.relEntropyToMixedNats, b.D, 1e-6) && near(s.relEntropyToMixedBits, b.Dbits, 1e-6));
  check(`benchmark ${label}: 2 ln cot θ and k_B T_eff/ΔE`, nearInf(s.betaDeltaE, s.betaDeltaEInfinite, b.beta, 1e-6) && nearInf(s.tempRatio, s.tempRatioInfinite, b.T, 1e-6));
  for (const n of NS) {
    await input('#horizon', n);
    const t = await state(), want = PAGE_BENCH[label] ? PAGE_BENCH[label][NS.indexOf(n)] : 0;
    check(`benchmark ${label}, N_A = ${n}: Page cut ${want} bits`, near(t.pageBits, want, 1e-6) && near(t.pageNats, want * Math.LN2, 1e-6));
  }
  checkMath(await state(), `benchmark ${label}`);
}
{
  await page.click('#snapDottie'); await settle(page);
  const s = await state();
  check('θ*: exact fixed point, 0.73908513 rad = 42.346459°, inside (0°, 45°)', s.thetaRad === s.thetaStar && near(s.thetaStar, THETA_STAR, 1e-14) && near(s.thetaStar, 0.73908513, 1e-8)
    && near(s.thetaStarDeg, 42.346459, 1e-6) && s.thetaDeg > 0 && s.thetaDeg < 45 && near(100 * s.orderBias, 9.25, 0.005));
  check('θ*: 42.35° is only a rounded neighbour (0.003541° away)', near(42.35 - s.thetaStarDeg, 0.003541, 1e-6));
}

/* ---------- every preset through the real cards, in both languages ---------- */
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  check(`language ${lang}: document and pressed toggle`, await page.evaluate((l) => document.documentElement.lang.startsWith(l) && document.querySelector(`[data-lang-set="${l}"]`).getAttribute('aria-pressed') === 'true', lang));
  for (const card of Object.keys(CARDS)) {
    await pick(card); const s = await state(), c = CARDS[card];
    check(`${lang}/${card}: preset applies controls`, s.preset === card && near(s.thetaRad, c.thetaRad, 1e-12) && s.NA === c.NA && !s.playing
      && await page.locator(`[data-preset="${card}"]`).getAttribute('aria-pressed') === 'true'
      && near(Number(await page.locator(`[data-preset="${card}"]`).getAttribute('data-still')), c.still, 1e-12));
    checkMath(s, `${lang}/${card}`);
  }
}
{
  await pick('omniscient-zero'); let s = await state();
  check('omniscient-zero: N_A = 12 severs nothing, S(A) = S_global = 0, six Bell arcs inside, 9/15 blind spot', s.NA === 12 && s.severedArcs === 0 && s.insidePairs === 6 && s.pageBits === 0 && s.globalEntropy === 0 && near(s.entropyBits, 1, 1e-12)
    && (await page.textContent('#roPage')).includes('0.000000') && (await page.textContent('#hudSub')).includes('9/15 = 60%') && near(s.leanInstances.blindSpot.correlationShare, 0.6, 1e-15));
  await pick('isolated-zeno'); s = await state();
  check('isolated-zeno: θ = 0 product state, zero severed arcs, S_A = 0, T_eff = 0, flat Page bars', s.thetaRad === 0 && s.severedArcs === 0 && s.entropyBits === 0 && s.tempRatio === 0
    && s.betaDeltaEInfinite && s.pageCurve.every((x) => x.bits === 0) && s.modularRate === null && near(s.purity, 1, 0));
  await pick('horizon-page-curve'); s = await state();
  check('horizon-page-curve: six severed Bell arcs, peak 6.000000 bits, back to 0 at N_A = 12', s.NA === 6 && s.severedArcs === 6 && near(s.pageBits, 6, 1e-9)
    && same(s.pageCurve.map((x) => Math.round(x.bits * 1e6) / 1e6), [0, 2, 4, 6, 4, 2, 0]) && (await page.textContent('#roPage')).includes('6.000000'));
  await pick('modular-unruh-heat'); s = await state();
  check('modular-unruh-heat: T_eff/ΔE = 0.910239, rate 1.098612, Landauer 0.630930 ΔE, first law', near(s.tempRatio, 0.910239, 1e-6) && near(s.modularRate, 1.098612, 1e-6)
    && near(s.landauer.perBitOverDE, 0.630930, 1e-6) && near(s.firstLaw.dEdS, 0.910239, 1e-6) && near(s.unruhAcceleration, 5.719202, 1e-6)
    && (await page.textContent('#roTemp')).includes('0.910239') && (await page.textContent('#roTemp')).includes('5.719202'));
  await pick('dottie-living-steady'); s = await state();
  check('dottie-living-steady: θ* with cos² 0.546247, sin² 0.453753, S_A 0.993820 bits, T 5.390324', s.thetaRad === s.thetaStar && near(s.cos2, 0.546247, 1e-6) && near(s.sin2, 0.453753, 1e-6)
    && near(s.entropyBits, 0.99382, 1e-6) && near(s.tempRatio, 5.390324, 1e-6) && near(s.orderBias, 0.092494, 1e-6) && near(s.relEntropyToMixedBits, 0.00618, 1e-6)
    && await page.evaluate(() => ['54.62%', '45.38%'].every((x) => document.querySelector('#roShares').textContent.includes(x))
      && document.querySelector('#roEntropy').textContent.includes('0.006180')));
}
check('modular-unruh-heat plays by itself', await playsAfter(page, () => page.click('[data-preset="modular-unruh-heat"]'), () => window.HORIZON_THERMO_DEBUG.state));
await pause();
check('dottie-living-steady plays by itself', await playsAfter(page, () => page.click('[data-preset="dottie-living-steady"]'), () => window.HORIZON_THERMO_DEBUG.state));
await pause();

/* ---------- the modular flow turns the phase and leaves every entropy fixed ---------- */
await pick('modular-unruh-heat');
{
  const before = await state();
  for (const sv of [0, 1.25, 3, 6]) {
    await input('#now', sv); const s = await state();
    check(`modular time s = ${sv}: phase = s · 2 ln cot θ, entropies unchanged`, near(s.modularTime, sv, 1e-12) && angle(s.modularPhase, sv * 2 * Math.atanh(0.5)) < 1e-9
      && s.pageBits === before.pageBits && s.entropyNats === before.entropyNats && s.purity === before.purity);
  }
}

/* ---------- controls ---------- */
await pick('horizon-page-curve');
for (const deg of [0, 7.5, 22.5, 40, 45]) {
  await input('#theta', deg); const s = await state();
  check(`θ slider ${deg}°: state, leaves the card, landmark chips`, near(s.thetaDeg, deg, 1e-12) && s.preset === null
    && (await page.locator('#thetaChips [aria-pressed="true"]').count()) === ([0, 45].includes(deg) ? 1 : 0));
  checkMath(s, `θ=${deg}`);
}
for (const [chip, deg] of [['0', 0], ['30', 30], ['star', THETA_STAR / DEG], ['45', 45]]) {
  await page.click(`#thetaChips [data-theta="${chip}"]`); await settle(page); const s = await state();
  check(`θ chip ${chip}: angle and pressed state`, near(s.thetaDeg, deg, 1e-9) && await page.locator(`#thetaChips [data-theta="${chip}"]`).getAttribute('aria-pressed') === 'true');
}
for (const n of NS) {
  await input('#horizon', n); const s = await state();
  check(`N_A slider ${n}: state, output and fraction`, s.NA === n && near(s.fraction, n / 12) && (await page.textContent('#oHorizon')).startsWith(`${n}/12`));
  checkMath(s, `N_A=${n}`);
}
await input('#horizon', 6);
await page.click('#naUp'); await settle(page); check('N_A + 2 stepper', (await state()).NA === 8);
await page.click('#naDown'); await page.click('#naDown'); await settle(page); check('N_A − 2 stepper', (await state()).NA === 4);
for (let i = 0; i < 4; i++) await page.click('#naDown');
await settle(page); check('N_A stepper stops at 0', (await state()).NA === 0);
await input('#horizon', 6); await input('#theta', 30);
check('modular-flow toggle plays the rail clock', await playsAfter(page, () => page.click('#flowBtn'), () => window.HORIZON_THERMO_DEBUG.state));
check('modular-flow toggle reports pressed', await page.locator('#flowBtn').getAttribute('aria-pressed') === 'true');
await page.click('#flowBtn'); await settle(page);
check('modular-flow toggle pauses', !(await state()).playing && await page.locator('#flowBtn').getAttribute('aria-pressed') === 'false');
{
  const before = (await state()).pulses;
  await page.click('#resetBtn'); await settle(page); const s = await state();
  check('Landauer pulse: one more 1-bit reset, bound (k_B T_eff/ΔE) ln 2 at θ = 30°', s.pulses === before + 1 && s.lastPulse.bitsErased === 1 && near(s.lastPulse.heatBoundOverDE, Math.LN2 / (2 * Math.atanh(0.5)), 1e-12)
    && s.pulse === null && s.pageBits === (await state()).pageBits);
  await input('#theta', 45); await page.click('#resetBtn'); await settle(page);
  check('Landauer pulse at θ = 45°: unbounded at infinite T_eff', (await state()).lastPulse.heatBoundInfinite === true);
}

/* ---------- the two amber handles: drag without turning the camera ---------- */
await input('#theta', 10); await input('#horizon', 6);
await page.locator('#stageWrap').scrollIntoViewIfNeeded(); await settle(page);
{
  const before = await state(), h = await page.evaluate(() => window.HORIZON_THERMO_DEBUG.handleBox('schmidt')), target = await page.evaluate(() => window.HORIZON_THERMO_DEBUG.dialPoint(25));
  check('Schmidt handle: projected button is visible', !!h && await page.locator('#schmidtHandle').isVisible());
  if (h && target) {
    await page.mouse.move(h.x, h.y); await page.mouse.down();
    check('Schmidt handle: pointerdown enters dragging state', await page.locator('#schmidtHandle').evaluate((el) => el.classList.contains('dragging')));
    await page.mouse.move(target.x, target.y, { steps: 8 }); await page.mouse.up(); await settle(page);
    const after = await state();
    check('Schmidt handle: drag sets θ ≈ 25° without rotating the camera', Math.abs(after.thetaDeg - 25) < 0.5 && same(after.camera, before.camera), `θ = ${after.thetaDeg}`);
  }
  const h2 = await page.evaluate(() => window.HORIZON_THERMO_DEBUG.handleBox('schmidt')), t2 = await page.evaluate(() => window.HORIZON_THERMO_DEBUG.dialPoint(42.2));
  if (h2 && t2) {
    await page.mouse.move(h2.x, h2.y); await page.mouse.down(); await page.mouse.move(t2.x, t2.y, { steps: 6 }); await page.mouse.up(); await settle(page);
    const s = await state();
    check('Schmidt handle: near θ* the drag snaps to the exact fixed point', s.thetaRad === s.thetaStar, `θ = ${s.thetaDeg}`);
  }
  const hh = await page.evaluate(() => window.HORIZON_THERMO_DEBUG.handleBox('horizon')), tc = await page.evaluate(() => window.HORIZON_THERMO_DEBUG.cutPoint(10));
  check('horizon handle: projected button is visible', !!hh && await page.locator('#horizonHandle').isVisible());
  if (hh && tc) {
    const cam = (await state()).camera;
    await page.mouse.move(hh.x, hh.y); await page.mouse.down(); await page.mouse.move(tc.x, tc.y, { steps: 8 }); await page.mouse.up(); await settle(page);
    const s = await state();
    check('horizon handle: drag moves the right foot to N_A = 10 without rotating the camera', s.NA === 10 && s.horizonShown === 10 && same(s.camera, cam), `N_A = ${s.NA}`);
    checkMath(s, 'after horizon drag');
  }
  await page.focus('#horizonHandle'); await page.keyboard.press('ArrowLeft'); await settle(page);
  check('horizon handle: ← steps N_A by 2', (await state()).NA === 8);
  await page.focus('#schmidtHandle'); const th0 = (await state()).thetaDeg; await page.keyboard.press('ArrowLeft'); await settle(page);
  check('Schmidt handle: ← steps θ by 0.5°', near((await state()).thetaDeg, Math.max(0, th0 - 0.5), 1e-9));
}

await page.click('#infoBtn'); await settle(page);
check('info button opens the theory drawer', await page.locator('#drawer [role="dialog"]').isVisible());
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').isHidden());
check('settled play/pause: play advances the modular clock', await playsAfter(page, () => page.click('#play'), () => window.HORIZON_THERMO_DEBUG.state));
await pause();
const paused = await state(); await settle(page, 50);
check('settled play/pause: pause holds the clock', !paused.playing && same((await state()).modularTime, paused.modularTime));

/* ---------- dark/light × zh/en × desktop/phone/embed (?theme= is ignored by the shared night console) ---------- */
for (const scheme of ['dark', 'light']) for (const lang of ['zh', 'en']) for (const [width, height, embed] of [[1440, 900, false], [390, 844, false], [740, 620, true]]) {
  requestedColorScheme = scheme;
  const p = await T.open(BOOK, ID, `?lang=${lang}&theme=${scheme}${embed ? '&embed=1' : ''}`, { viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US', reducedMotion: 'reduce' });
  await p.emulateMedia({ colorScheme: scheme }); await settle(p);
  const tag = `${scheme}/${lang}/${width}x${height}/${embed ? 'embed' : width < 500 ? 'phone' : 'desktop'}`;
  check(`${tag}: requested system colour and absent palette`, await p.evaluate((s) => matchMedia(`(prefers-color-scheme: ${s})`).matches && document.documentElement.dataset.trPalette === undefined, scheme));
  await checkLinks(p, tag);
  if (width >= 1081) check(`${tag}: three-column deck|center|side and plot placement`, await p.evaluate(() => {
    const app = document.querySelector('.app.lab'), q = (sel) => app.querySelector(sel).getBoundingClientRect();
    const d = q(':scope > .deck'), c = q(':scope > .center'), s = q(':scope > .side');
    return d.right <= c.left + 1 && c.right <= s.left + 1 && !!app.querySelector('.center > .strip #plot') && !app.querySelector('#stageWrap #plot')
      && ['#readouts', '#evidence'].every((x) => app.querySelector(`.side ${x}`).getBoundingClientRect().height > 0);
  }));
  for (const card of Object.keys(CARDS)) {
    await pick(card, p); const s = await state(p);
    check(`${tag}/${card}: real card selection`, s.preset === card && !s.playing);
    checkMath(s, `${tag}/${card}`);
    const view = await stageView(p, '#stageWrap', false), overlaps = await labelOverlaps(p, '.stage .tag', 0);
    check(`${tag}/${card}: stage layout, HUD, labels and overflow`, view.layout.length === 0 && view.hud.length === 0 && overlaps.length === 0 && await overflowX(p) <= 0,
      [...view.layout, ...view.hud, ...overlaps].join(' | '));
    if (lang === 'en') check(`${tag}/${card}: no visible Chinese leftovers`, (await cjkLeftovers(p)).length === 0);
  }
  check(`${tag}: palette remains absent after interactions`, await p.evaluate(() => document.documentElement.dataset.trPalette === undefined));
  await p.context().close();
}

/* ---------- preset deep links and stills ---------- */
for (const card of Object.keys(CARDS)) {
  const p = await T.open(BOOK, ID, `?lang=en&preset=${card}`, { viewport: { width: 1440, height: 900 }, locale: 'en-US' });
  await settle(p); const s = await state(p);
  check(`deep link ?preset=${card}: opens on the card at its still`, s.preset === card && near(s.thetaRad, CARDS[card].thetaRad, 1e-12) && s.NA === CARDS[card].NA && near(s.modularTime, CARDS[card].still, 1e-12));
  await p.context().close();
}
if (!PHASE1) for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) {
  const p = await openStill(T, BOOK, ID, card, lang), s = await state(p);
  check(`still ${lang}/${card}: declared frame and paused`, s.preset === card && !s.playing && near(s.modularTime, CARDS[card].still, 1e-8)
    && await p.evaluate(() => TRV.still && TRV.shot && document.documentElement.dataset.trPalette === undefined));
  checkMath(s, `still ${lang}/${card}`);
  await p.context().close();
}

check('palette: every observed document stayed undefined', paletteDocuments.length > 0 && paletteDocuments.every((r) => r.absent), JSON.stringify(paletteDocuments.filter((r) => !r.absent)));
check('palette: dark and light startup documents were observed', paletteDocuments.some((r) => r.dark) && paletteDocuments.some((r) => !r.dark));
check('palette: zero attempted writes', paletteMutations.length === 0, JSON.stringify(paletteMutations));
check('zero page, console and request errors', T.errors.length === 0, T.errors.join(' | '));
check('zero browser console warnings after driver filtering', browserWarnings.length === 0, browserWarnings.slice(0, 4).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, T.warnings.map((w) => `${w.name}: ${w.detail}`).join(' | '));
await T.finish();
