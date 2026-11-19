import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  session,
  stageFirstChecks,
  settle,
  openStill,
  playsAfter,
  until,
  stageView,
  cjkLeftovers,
  capitalGreek,
  overflowX,
  labelOverlaps,
  solidPixels
} from '../../../../tools/node/viz-testkit.mjs';
import { ROOT } from '../../../../tools/node/viz-common.mjs';

const BOOK = 'quantum-geometry';
const ID = 'axiom-omega-five-qm-postulates-sandbox';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID);
const THEORY = 'ch39-s26-axiom-omega-quantum-mechanics-five-postulates.html#sec-ch39-axiom-omega-quantum-mechanics-five-postulates';
const SECTION = '39.3';
const STILL = 45;
const CARDS = {
  'postulate1-hopf-blindspot-ray': { post: 1, theta: 60, flip: 90, lambda: 1, gamma: 90, play: true },
  'postulate2-hermitian-flip-uncertainty': { post: 2, theta: 0, flip: 90, lambda: 1, gamma: 90, play: false },
  'postulate3-roundtrip-born-gleason-busch': { post: 3, theta: 60, flip: 90, lambda: 1, gamma: 90, play: false },
  'postulate4-unitary-halting-pinch': { post: 4, theta: 60, flip: 90, lambda: 1, gamma: 90, play: false },
  'postulate5-rkhs-tensor-tsirelson': { post: 5, theta: 0, flip: 90, lambda: 1, gamma: 90, play: false }
};
const IDS = Object.keys(CARDS);
const DEFAULT = IDS[0];
const GIDS = [
  'D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization',
  'D5/S3/Quantum/Matrix/NumericalRange.blochPure_norm',
  'D5/S3/Quantum/Matrix/NumericalRange.blochPure_surjective',
  'D5/S3/Quantum/Algebra/CommonPhasePolynomial.complete_common_phase_polynomial_theorem',
  'D5/S3/Quantum/Algebra/Unitary/BalancedUnitarySum.crossProduct_is_skewAdjoint_of_balanced_sum',
  'D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger',
  'D5/S3/Quantum/QubitWitnesses.pauli_observables_have_no_common_eigenvector',
  'D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight',
  'D5/S3/Quantum/GleasonComplexRepresentation.Gleason.ProjectionPackage.gleason_representation',
  'D5/S3/Quantum/Foundation/EffectProbabilityExtension.effect_density_representation',
  'D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary',
  'D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent',
  'D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean',
  'D5/S3/Quantum/Entanglement/FiniteSectorPhysicalConstruction.channel_kraus_stinespring',
  'D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal',
  'D5/S3/QuantumBounds/ClassicalFiberBound.classical_chsh_abs_le_two',
  'D5/S3/QuantumBounds/LandauCommutingCollapse.chsh_square_eq_four_of_local_pair_commutes',
  'D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest'
];
const OPEN_LINKS = [
  'ch34-s20-single-outcome-and-attractor-basins.html#prob-ch34-single-outcome-realization',
  'appendix-d.html#prob-appendix-d-time-horizon'
];
const CURSOR = /cursor|handle|active/i;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const f4 = (v) => (Math.abs(v) < 5e-5 ? 0 : v).toFixed(4);

/* ---------- independent mathematics, written here and never calling the page ---------- */
const DEG = Math.PI / 180;
const SQ2 = Math.SQRT2;
const unitDir = (a) => [Math.sin(a * DEG), 0, Math.cos(a * DEG)];
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
/** The singlet correlation of two analyzer directions in the xz-plane: E = −n·m. */
const singletE = (x, y) => -dot(unitDir(x), unitDir(y));
/** All 16 deterministic ±1 answer tables for the two settings of each side. */
function classicalMax() {
  let best = 0;
  for (const a0 of [-1, 1]) for (const a1 of [-1, 1]) for (const b0 of [-1, 1]) for (const b1 of [-1, 1]) best = Math.max(best, Math.abs(a0 * b0 + a0 * b1 + a1 * b0 - a1 * b1));
  return best;
}
/** What the page must show for the parameters, from closed forms on the Bloch sphere. */
function expected({ thetaDeg: th, chiDeg: chi, flipDeg: fl, lambda: la, gammaDeg: ga }) {
  const t = th * DEG,
    c = Math.cos(t / 2),
    s = Math.sin(t / 2);
  const r = [Math.sin(t), 0, Math.cos(t)];
  const trine = [[0, 0, 1], [Math.sqrt(3) / 2, 0, -0.5], [-Math.sqrt(3) / 2, 0, -0.5]];
  const ang = { a: th, a1: th + ga, b: th + ga / 2, b1: th - ga / 2 };
  const corr = [singletE(ang.a, ang.b), singletE(ang.a, ang.b1), singletE(ang.a1, ang.b), singletE(ang.a1, ang.b1)];
  const coherence = 2 * c * c * s * s;
  return {
    spinor: [[Math.cos(chi * DEG) * c, Math.sin(chi * DEG) * c], [Math.cos(chi * DEG) * s, Math.sin(chi * DEG) * s]],
    r,
    kS3: (1 + Math.cos(chi * DEG)) / 2,
    dA: Math.abs(Math.cos(t)),
    dB: 1,
    bound: Math.abs(Math.cos(t)),
    eig: [[Math.sin(fl * DEG), -Math.cos(fl * DEG)], [-Math.sin(fl * DEG), Math.cos(fl * DEG)]],
    p0: c * c,
    p1: s * s,
    trineBorn: trine.map((rk) => (1 + dot(r, rk)) / 3),
    trineCubic: trine.map((rk) => (1 + rk[2] ** 3) / 3),
    kept: c ** 4 + s ** 4,
    coherence,
    localCoherence: (1 - la) ** 2 * coherence,
    rL: [(1 - la) * Math.sin(t), 0, Math.cos(t)],
    angles: ang,
    corr,
    S: corr[0] + corr[1] + corr[2] - corr[3]
  };
}

const T = await session();
const { page, check } = T;
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
const paletteMutations = [],
  paletteDocuments = [];
async function watchPalette(context) {
  await context.exposeBinding('__omegaPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__omegaPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener(
      'DOMContentLoaded',
      () => window.__omegaPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined, dark: matchMedia('(prefers-color-scheme: dark)').matches }).catch(() => {}),
      { once: true }
    );
  });
  context.on('page', watchPage);
  context.pages().forEach(watchPage);
}
let colorScheme = 'dark';
await watchPalette(T.context);
const browserNewContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async (options) => {
  const context = await browserNewContext({ ...options, colorScheme });
  await watchPalette(context);
  return context;
};
watchPage(page);

// the shared gate: stage share, cards, drawer, honest labels, English, embeds, rail, cited figures, phone, cover, motion,
// and the lit-solid checks of kit.solid (opaque share, shading, turning, a hidden mark behind the body, resting)
// with this page's own solid floors: an opaque share of at least 14 % and a luminance spread of at least 0.055
await stageFirstChecks(T, BOOK, ID, { solid: { minShare: 0.14, minSpread: 0.055 } });
{
  // the turn: dragging the camera sideways or upwards changes the light-and-shade histogram by at least 0.08
  const p = await T.open(BOOK, ID, '?lang=zh', { viewport: { width: 1440, height: 900 } });
  await settle(p, 400);
  const a = await solidPixels(p);
  const cam0 = await p.evaluate(() => ({ ...TRV.solids[0].cam }));
  const distances = [];
  for (const axis of ['yaw', 'pitch']) {
    await p.evaluate((cam) => { Object.assign(TRV.solids[0].cam, cam); TRV.kit.flush(); }, cam0);
    const b = await p.evaluate(() => { const r = TRV.solids[0].el.getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; });
    const x = b[0] + b[2] * 0.08, y = b[1] + b[3] * 0.65;
    await p.mouse.move(x, y);
    await p.mouse.down();
    for (let k = 1; k <= 6; k++) await p.mouse.move(x + (axis === 'yaw' ? b[2] * 0.05 * k : 0), y - (axis === 'pitch' ? b[3] * 0.05 * k : 0));
    await p.mouse.up();
    await settle(p);
    const c = await solidPixels(p);
    distances.push(c.hist.reduce((sum, h, k) => sum + Math.abs(h - a.hist[k]), 0) / 2);
  }
  const dist = Math.max(...distances);
  console.log(`solid floors: share ${(a.share * 100).toFixed(1)}%, spread ${a.spread.toFixed(3)}, turn ${dist.toFixed(3)}`);
  check('solid floors of this page: share ≥ 0.14, spread ≥ 0.055, turn distance ≥ 0.08', a.share >= 0.14 && a.spread >= 0.055 && dist >= 0.08, `share ${a.share.toFixed(3)} spread ${a.spread.toFixed(3)} turn ${dist.toFixed(3)}`);
  await p.context().close();
}

/* ---------- sources, registry and lock ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
const suite = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
const registry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8'));
const entry = (registry.visualizations || []).find((v) => v.id === ID) || null;
const entryText = JSON.stringify(entry || {});
// forbidden words are kept as code points so this suite itself carries no such identifier
const [numbered, ...forbidden] = [
  [103, 112, 116],
  [99, 108, 97, 117, 100, 101],
  [97, 110, 116, 104, 114, 111, 112, 105, 99],
  [111, 112, 101, 110, 97, 105],
  [103, 101, 109, 105, 110, 105],
  [99, 111, 100, 101, 120],
  [99, 111, 112, 105, 108, 111, 116],
  [111, 112, 117, 115],
  [115, 111, 110, 110, 101, 116],
  [104, 97, 105, 107, 117],
  [108, 108, 109],
  [97, 103, 101, 110, 116],
  [99, 104, 97, 116, 98, 111, 116],
  [100, 101, 101, 112, 109, 105, 110, 100]
].map((codes) => String.fromCharCode(...codes));
const identifiers = new RegExp(`\\b(?:${forbidden.join('|')}|${numbered}-?\\d)\\b`, 'i');
const shortAcronym = new RegExp(`\\b${String.fromCharCode(65, 73)}\\b`);
const cjkTerms = new RegExp([[22823, 27169, 22411], [26234, 33021, 20307], [20154, 24037, 26234, 33021]].map((c) => String.fromCharCode(...c)).join('|'));
const literalColour = /#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i;
for (const [file, src] of Object.entries(sources)) {
  check(`source ${file}: no literal colour and no palette switch`, !literalColour.test(src) && !/\btrPalette\b|data-tr-palette|[?&]theme=/.test(src));
  check(`source ${file}: no model, vendor or tool identifiers`, !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src));
}
check('reserved identifiers are absent from the suite and registry entry', [suite, entryText].every((src) => !identifiers.test(src) && !shortAcronym.test(src) && !cjkTerms.test(src)));
check(
  'registration: chapter 39, §39.3, live since 2026-11-19, five cards, the eighteen GIDs, theory links',
  !!entry &&
    entry.chapter === 39 &&
    entry.section === SECTION &&
    entry.status === 'live' &&
    entry.added === '2026-11-19' &&
    entry.code === 'OMEGA//QM-AXIOMS' &&
    same(entry.presets, IDS) &&
    same(entry.lean.map((x) => x.gid), GIDS) &&
    entry.theory[0].href === '../zh/' + THEORY &&
    entry.theory[0].href_en === '../en/' + THEORY
);

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.OMEGA_QM_DEBUG.state);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => {
    el.value = String(v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
  await settle(p);
}
async function pause(p = page) {
  await settle(p);
  await p.locator('#play').evaluate((b) => {
    if (b.getAttribute('aria-pressed') === 'true') b.click();
  });
  await settle(p);
}
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  await settle(p);
  await until(p, (id) => {
    const s = window.OMEGA_QM_DEBUG.state;
    return s.preset === id && !s.blending;
  }, card);
  await pause(p);
}
async function seek(t, p = page) {
  await p.locator('#now').evaluate((el, v) => {
    el.value = String(v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, t);
  await settle(p);
}
const textOf = async (id, p = page) => (await p.locator('#' + id).innerText()).replaceAll('−', '-');
async function layout(p, label, figure = false) {
  const view = await stageView(p, '#stage', figure);
  const issues = [...view.layout, ...view.hud, ...(await labelOverlaps(p, '.stage .tag', 0)), ...(await capitalGreek(p))];
  check(label + ' framing and legible labels', !issues.length && (await overflowX(p)) === 0, JSON.stringify(issues));
}

/** Every number of the page state against the closed forms of this suite. */
function verifyMath(m, label) {
  const e = expected(m);
  check(label + ' spinor e^{iχ}(cos θ/2, sin θ/2) and its Bloch point on the unit sphere',
    m.spinor.every((z, k) => near(z[0], e.spinor[k][0]) && near(z[1], e.spinor[k][1])) && m.r.every((x, i) => near(x, e.r[i])) && near(m.rNorm2, 1));
  check(label + ' ray kernel 1 on the whole fibre, spinor kernel (1 + cos χ)/2', near(m.kRay, 1) && near(m.kS3, e.kS3));
  check(label + ' σx, σy spreads on the meridian and the bound |⟨σz⟩| (saturated)',
    near(m.dA, e.dA, 1e-7) && near(m.dB, e.dB, 1e-9) && near(m.product, e.dA, 1e-7) && near(m.bound, e.bound) && m.product >= m.bound - 1e-9);
  check(label + ' eigenvalues of e^{iϑ}X₃', m.eig.every((z, k) => near(z[0], e.eig[k][0]) && near(z[1], e.eig[k][1])));
  check(label + ' Born weights and the two trine sums',
    near(m.p0, e.p0) && near(m.p1, e.p1) && m.trineBorn.every((x, k) => near(x, e.trineBorn[k])) && m.trineCubic.every((x, k) => near(x, e.trineCubic[k])) &&
      near(m.trineBornSum, 1) && near(m.trineCubicSum, 1.25));
  check(label + ' pinch ledger: kept, coherence, local and folded parts add to 1',
    near(m.kept, e.kept) && near(m.coherence, e.coherence) && near(m.localCoherence, e.localCoherence) && near(m.folded, e.coherence - e.localCoherence) &&
      near(m.kept + m.coherence, 1) && near(m.local, e.kept + e.localCoherence) && m.rL.every((x, i) => near(x, e.rL[i])));
  check(label + ' singlet correlations −n·m and the CHSH value',
    Object.keys(e.angles).every((k) => near(m.angles[k], e.angles[k])) && m.corr.every((x, k) => near(x, e.corr[k])) && near(m.S, e.S) && near(m.absS, Math.abs(e.S)) && m.absS <= 2 * SQ2 + 1e-9);
}
/** The instances the evidence panel names, against algebra written here. */
function verifyInstances(m, label) {
  const I = m.leanInstances,
    t = m.thetaDeg * DEG,
    chi = m.chiDeg * DEG,
    ga = m.gammaDeg * DEG;
  check(label + ' unit Gram: ⟨ψ₀, e^{iχ}ψ₀⟩ = e^{iχ}, distance 2|sin(χ/2)|',
    near(I.unitGram.inner[0], Math.cos(chi)) && near(I.unitGram.inner[1], Math.sin(chi)) && near(I.unitGram.distance, 2 * Math.abs(Math.sin(chi / 2))) && I.unitGram.norms.every((x) => near(x, 1)));
  check(label + ' Bloch norm 1 and an explicit preimage', near(I.blochNorm.norm, 1) && I.blochSurjective.residual < 1e-12);
  check(label + ' the phase-invariant form ψ* |ψ₀⟩⟨ψ₀| ψ = 1', near(I.commonPhase.value[0], 1) && near(I.commonPhase.value[1], 0));
  const b = I.balanced;
  check(label + ' balanced split: S unitary, A Aᴴ = B Bᴴ = I/2, (A Bᴴ)ᴴ = −A Bᴴ = −(i/2) r·σ', [b.unitary, b.sum, b.halfA, b.halfB, b.skew, b.cross].every((x) => x < 1e-12));
  const R = I.robertson;
  check(label + ' Robertson–Schrödinger: lhs cos²θ, cov 0, commutatorHalf ⟨σz⟩, G = 0',
    near(R.lhs, Math.cos(t) ** 2, 1e-12) && near(R.covariance, 0, 1e-12) && near(R.commutatorHalf[0], Math.cos(t), 1e-12) && near(R.commutatorHalf[1], 0, 1e-12) &&
      Math.abs(R.G) < 1e-12 && R.identity < 1e-12 && R.reCov < 1e-12 && R.imComm < 1e-12);
  check(label + ' X and Z eigen-residuals |cos θ|, |sin θ| are never both 0',
    near(I.pauli.residualX, Math.abs(Math.cos(t)), 1e-9) && near(I.pauli.residualZ, Math.abs(Math.sin(t)), 1e-9) && Math.max(I.pauli.residualX, I.pauli.residualZ) > 0.7);
  check(label + ' rank-one Born weight = |⟨0|ψ⟩|² = Tr(ρP₀); unread state = mixture',
    near(I.born.weights[0], Math.cos(t / 2) ** 2) && near(I.born.traceForm, I.born.weights[0]) && near(I.born.overlap2, I.born.weights[0]) && I.born.unread < 1e-12);
  check(label + ' effects: trine Born sum 1, cubic 5/4, ΣE_k = I', near(I.effect.born, 1) && near(I.effect.cubic, 1.25) && I.effect.effects < 1e-12);
  check(label + ' σz flow leaves |0⟩⟨0| fixed', I.stationary.unitary < 1e-12 && I.stationary.drift < 1e-12);
  check(label + ' pinching idempotent and Hilbert–Schmidt Pythagoras',
    I.idempotent.gap < 1e-12 && near(I.pythagoras.total, 1) && near(I.pythagoras.kept + I.pythagoras.folded, I.pythagoras.total) && near(I.pythagoras.kept, (1 + Math.cos(t) ** 2) / 2));
  const st = I.stinespring;
  check(label + ' Kraus sum, isometry, environment trace = channel = ρ_λ, joint purity 1', [st.kraus, st.isometry, st.output, st.channel].every((x) => x < 1e-12) && near(st.purity, 1));
  const B = I.bell;
  check(label + ' Bell Φ⁺: norm 1, idempotent, trace 1, marginal I/2 with (I/2)² ≠ I/2; singlet marginal I/2',
    near(B.norm, 1) && B.idempotent < 1e-12 && near(B.trace, 1) && B.marginal < 1e-12 && near(B.marginalSquare, 0.25) && B.singletMarginal < 1e-12);
  check(label + ' classical deterministic maximum 2', I.classical.max === classicalMax() && classicalMax() === 2);
  const commuting = Math.abs(Math.sin(ga)) < 1e-12;
  check(label + ' Landau identity S² = 4I − [A₀, A₁]⊗[B₀, B₁]; collapse to 4I only when the pairs commute',
    I.landau.identity < 1e-9 && near(I.landau.commA, 2 * SQ2 * Math.abs(Math.sin(ga)), 1e-9) && (commuting ? I.landau.collapse < 1e-9 : I.landau.collapse > 1e-6));
  check(label + ' CHSH witness on Φ⁺ reaches 2√2', near(I.tsirelson.witness, 2 * SQ2, 1e-12) && near(I.tsirelson.ceiling, 2 * SQ2) && near(I.tsirelson.singlet, m.S));
}
async function verifyCard(p, id) {
  const m = await state(p),
    c = CARDS[id];
  check(id + ' postulate, ray angle, turn, pinch, pair angle and preset',
    m.preset === id && m.post === c.post && near(m.thetaDeg, c.theta) && near(m.flipDeg, c.flip) && near(m.lambda, c.lambda) && near(m.gammaDeg, c.gamma));
  verifyMath(m, id);
  return m;
}

/* ---------- the page: shell, probe, chapter numbers ---------- */
await T.goto(BOOK, ID, '?lang=en');
await settle(page);
check('the Hopf card opens by default, parked at χ = 45°', (await state()).preset === DEFAULT && near((await state()).t, STILL) && !(await state()).playing);
check(
  'three-column lab shell, panel badges, tagline, fonts and evidence spans',
  await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const asides = [...document.querySelectorAll('.sec h2 .aside')].map((el) => el.textContent.trim());
    return (
      !!q('.app.lab > header.top .status #postPill') && !!q('.app.lab > header.top .status #keyPill') && !!q('#rail #presets') && !!q('#rail #ctlPanel #rayTheta') &&
      !!q('main.center > #stage > .scan') && !!q('main.center > #stage > .vig') && !!q('#stage > #hudTl #hudBig') && !!q('#stage > #spinorHandle') &&
      !!q('main.center > .strip #plot') && !q('#stage .strip') && !!q('aside.col.side > #readouts') && q('aside.col.side > #evidence').firstElementChild.id === 'infoBtn' &&
      ['5', 'NUM', 'trureturing'].every((x) => asides.includes(x)) &&
      [...document.querySelectorAll('.tagline > span')].every((el) => el.querySelector('em') && el.firstChild.nodeType === 3) &&
      !!q('link[href*="fonts.googleapis.com/css2?family=Chakra+Petch"]') &&
      [...document.querySelectorAll('#evidence .lean')].every((el) => el.children.length === 2 && [...el.children].every((c) => c.tagName === 'SPAN')) &&
      [...document.querySelectorAll('#drawer .sheet > div.zh, #drawer .sheet > div.en')].every((el) => el.querySelector('p.lede') && el.querySelectorAll('ol li b').length === 6 && el.querySelector('p.lede.refs a'))
    );
  })
);
check(
  'the probe exposes state, calc and presets',
  await page.evaluate(() => {
    const d = window.OMEGA_QM_DEBUG;
    return Object.isFrozen(d) && typeof d.calc === 'function' && typeof d.state === 'object' && Object.keys(d.presets).length === 5;
  })
);
const P = await page.evaluate(() => window.OMEGA_QM_DEBUG.presets);
check('probe presets agree with the cards', IDS.every((id) => P[id] && P[id].post === CARDS[id].post && P[id].thetaDeg === CARDS[id].theta && P[id].play === CARDS[id].play && P[id].still === STILL));
// The example of §39.3, number by number
const ex = await page.evaluate(() => {
  const c = window.OMEGA_QM_DEBUG.calc;
  return { a: c({ thetaDeg: 60, chiDeg: 123, flipDeg: 90, lambda: 1, gammaDeg: 90 }), b: c({ thetaDeg: 0, chiDeg: 0, flipDeg: 90, lambda: 1, gammaDeg: 90 }) };
});
check('Example I: r = (√3/2, 0, 1/2), ‖r‖² = 3/4 + 1/4 = 1 for any χ', near(ex.a.r[0], Math.sqrt(3) / 2) && near(ex.a.r[1], 0) && near(ex.a.r[2], 0.5) && near(ex.a.rNorm2, 1));
check('Example II: at |0⟩, ΔA = ΔB = 1, ΔA·ΔB = 1 = |⟨σz⟩|', near(ex.b.dA, 1) && near(ex.b.dB, 1) && near(ex.b.product, 1) && near(ex.b.bound, 1));
check('Example II: σz = îX₃ (eigenvalues ±1 at ϑ = 90°)', near(ex.b.eig[0][0], 1) && near(ex.b.eig[0][1], 0) && near(ex.b.eig[1][0], -1));
check('Example III: P(0) = 3/4, P(1) = 1/4; trine Born sum 1, cubic sum 5/4', near(ex.a.p0, 0.75) && near(ex.a.p1, 0.25) && near(ex.a.trineBornSum, 1) && near(ex.a.trineCubicSum, 1.25));
check('Example IV: ‖Φρ‖² = 5/8, ‖ρ − Φρ‖² = 3/8, sum 1', near(ex.a.kept, 5 / 8) && near(ex.a.coherence, 3 / 8) && near(ex.a.kept + ex.a.coherence, 1));
check('Example V: (0°, 90°; 45°, −45°) gives |S| = 2√2 > 2 with |E| = √2/2 for each pair',
  near(ex.b.absS, 2 * SQ2) && ex.b.corr.every((x) => near(Math.abs(x), SQ2 / 2)) && near(ex.b.angles.b, 45) && near(ex.b.angles.b1, -45) && near(ex.b.angles.a1, 90));

check(
  'a card click starts a blend instead of a hard cut (the pinch starts from λ = 0)',
  await page.evaluate(() => {
    document.querySelector('[data-preset="postulate4-unitary-halting-pinch"]').click();
    const s = window.OMEGA_QM_DEBUG.state;
    return s.blending && s.lambda < 1 && s.post === 4;
  })
);
await settle(page);
await until(page, () => !window.OMEGA_QM_DEBUG.state.blending);
check('the blend ends on the card', near((await state()).lambda, 1) && !(await state()).blending);

for (const lang of ['zh', 'en']) {
  await page.click('[data-lang-set="' + lang + '"]');
  await settle(page);
  const links = await page
    .locator('#drawer .refs a, #evidence .lean.open a')
    .evaluateAll((els) => els.filter((el) => getComputedStyle(el.parentElement).display !== 'none').map((el) => el.getAttribute('href')));
  check(lang + ' theory and open-problem links', [THEORY, ...OPEN_LINKS].every((x) => links.includes('../../' + lang + '/' + x)));
  check(lang + ' cited declarations in order', same(await page.locator('#evidence a[data-lean-gid]').evaluateAll((els) => els.map((el) => el.dataset.leanGid)), GIDS));
  check(
    lang + ' eighteen green boxes and the argued, model, numeric and open boxes',
    (await page.locator('#evidence .lean:not(.argued):not(.model):not(.num):not(.open):not(.frozen)').count()) === 18 &&
      (await page.locator('#evidence .lean.argued').count()) === 2 &&
      (await page.locator('#evidence .lean.model').count()) === 1 &&
      (await page.locator('#evidence .lean.num').count()) === 1 &&
      (await page.locator('#evidence .lean.open').count()) === 1
  );
  const gleason = (await page.locator(`#evidence .lean:has([data-lean-gid$="gleason_representation"]) .${lang}`).allTextContents()).join(' ');
  check(lang + ' the Gleason box says N ≥ 3 and that the qubit page does not show it', gleason.includes('N ≥ 3') && (lang === 'zh' ? /不演示/ : /does not show/).test(gleason));
  for (const id of IDS) {
    await pick(id);
    const m = await verifyCard(page, id);
    verifyInstances(m, lang + '/' + id);
    await layout(page, lang + '/' + id);
    const readings = await page.locator('#readouts output').allTextContents();
    check(lang + '/' + id + ' one key and six readouts, all populated',
      readings.length === 7 && (await page.locator('#readouts dl.ro > div').count()) === 7 && (await page.locator('#readouts dl.ro > div.key').count()) === 1 && readings.every((t) => t && !/NaN|undefined|^—$/.test(t)));
    const key = [f4(m.rNorm2), f4(m.product), f4(m.p0 + m.p1), f4(m.kept + m.coherence), f4(m.absS)][m.post - 1];
    check(lang + '/' + id + ' HUD title, key readout and status pill show the key quantity', (await textOf('hudBig')).includes(key) && (await textOf('roKey')).includes(key) && (await textOf('postPill')).includes(['I', 'II', 'III', 'IV', 'V'][m.post - 1]) && (await textOf('hudSub')).trim().length > 0);
    check(lang + '/' + id + ' only the slider of this postulate is shown',
      same(await page.evaluate(() => ['thetaField', 'flipField', 'lambdaField', 'gammaField'].map((k) => !document.getElementById(k).hidden)), [true, m.post === 2, m.post === 4, m.post === 5]));
    // the rail turns χ only: nothing the card reads changes
    const observe = (s) => [s.r, s.product, s.bound, s.p0, s.p1, s.kept, s.coherence, s.localCoherence, s.absS, s.rL].flat().map((x) => x.toFixed(12));
    await seek(10);
    const s1 = await state();
    await seek(250);
    const s2 = await state();
    check(lang + '/' + id + ' the hidden phase χ moves the spinor and κ_S³ and leaves every observable reading alone',
      near(s1.t, 10) && near(s2.t, 250) && same(observe(s1), observe(s2)) && !near(s1.kS3, s2.kS3, 1e-3) && !near(s1.spinor[0][1], s2.spinor[0][1], 1e-3) && s1.preset === id && s2.preset === id);
  }
}

/* ---------- controls ---------- */
await pick(IDS[0]);
for (const th of [0, 1, 45, 59, 60, 90, 135, 180, 225, 270, 300, 359]) {
  await input('#rayTheta', th);
  const m = await state();
  check('ray slider ' + th, near(m.thetaDeg, th) && !m.playing && m.preset === null);
  verifyMath(m, 'θ=' + th);
  verifyInstances(m, 'θ=' + th);
  check('readouts at θ = ' + th, (await textOf('roPhase')).includes(f4(m.r[2]).replace('-', '-')) && (await textOf('roBorn')).includes(f4(m.p0)) && (await textOf('roUncertainty')).includes(f4(m.product)));
}
await pick(IDS[1]);
for (const fl of [0, 30, 60, 90]) {
  await input('#flipAngle', fl);
  const m = await state();
  check('turn slider ' + fl, near(m.flipDeg, fl) && m.post === 2);
  verifyMath(m, 'ϑ=' + fl);
}
await pick(IDS[3]);
for (const la of [0, 0.25, 0.5, 0.99, 1]) {
  await input('#pinchLambda', la);
  const m = await state();
  check('pinch slider ' + la, near(m.lambda, la) && m.post === 4);
  verifyMath(m, 'λ=' + la);
  verifyInstances(m, 'λ=' + la);
  check('pinch readout ' + la, (await textOf('roPinch')).includes(f4(m.localCoherence)) && (await textOf('roPinch')).includes(f4(m.folded)));
}
await pick(IDS[4]);
const sByGamma = [];
for (const ga of [0, 30, 60, 90, 120, 150, 180]) {
  await input('#pairGamma', ga);
  const m = await state();
  check('pair slider ' + ga, near(m.gammaDeg, ga) && m.post === 5);
  verifyMath(m, 'γ=' + ga);
  verifyInstances(m, 'γ=' + ga);
  sByGamma.push(m.absS);
}
check('|S| is 2 for commuting pairs, passes 2 and peaks at 2√2 at γ = 90°',
  near(sByGamma[0], 2) && sByGamma[1] > 2 && near(sByGamma[3], 2 * SQ2) && Math.max(...sByGamma) === sByGamma[3]);
await input('#rayTheta', 37);
check('rotating the whole analyzer frame leaves |S| alone (the singlet is rotation invariant)', near((await state()).absS, sByGamma[6]));

/* ---------- the amber handle: along the fibre only χ changes, along the real section only θ ---------- */
await pick(DEFAULT);
await page.locator('#stage').scrollIntoViewIfNeeded();
await settle(page);
const here = await state(),
  box = await page.locator('#spinorHandle').boundingBox();
const start = await page.evaluate((s) => OMEGA_QM_DEBUG.dragTarget(s.thetaDeg, s.t), here);
check('the handle sits on the projected spinor', !!box && Math.hypot(box.x + box.width / 2 - start.x, box.y + box.height / 2 - start.y) < 1.5);
check('the parked spinor faces the camera (its bead is not hidden)', await page.evaluate(() => !document.getElementById('spinorHandle').classList.contains('behind')));
async function drag(from, to) {
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, { steps: 10 });
  await page.mouse.up();
  await settle(page);
}
const alongFibre = await page.evaluate(() => OMEGA_QM_DEBUG.dragTarget(60, 75));
await drag(start, alongFibre);
const pulled = await state();
check('drag along the fibre sets χ and leaves θ, r and the camera fixed',
  Math.abs(pulled.t - 75) <= 1.5 && pulled.thetaDeg === 60 && pulled.r.every((x, i) => near(x, here.r[i], 1e-12)) && same(pulled.camera, here.camera) && !pulled.playing && !pulled.preset, JSON.stringify([pulled.thetaDeg, pulled.t]));
const from2 = await page.evaluate((s) => OMEGA_QM_DEBUG.dragTarget(s.thetaDeg, s.t), pulled);
const alongReal = await page.evaluate((c) => OMEGA_QM_DEBUG.dragTarget(80, c), pulled.t);
await drag(from2, alongReal);
const pulled2 = await state();
check('drag along the real section sets θ and leaves χ', Math.abs(pulled2.thetaDeg - 80) <= 1 && near(pulled2.t, pulled.t, 1.01), JSON.stringify([pulled2.thetaDeg, pulled2.t]));
await page.locator('#spinorHandle').focus();
await page.keyboard.press('ArrowRight');
await settle(page);
const k1 = await state();
await page.keyboard.press('ArrowUp');
await settle(page);
const k2 = await state();
check('arrow keys: right turns χ by 1°, up turns θ by 1°', near(k1.t, (pulled2.t + 1) % 360, 1e-9) && k1.thetaDeg === pulled2.thetaDeg && k2.thetaDeg === (k1.thetaDeg + 1) % 360 && near(k2.t, k1.t));
// across the seam θ = 359° → 0° the arrow keys move like the pointer: (θ + 360°, χ + 180°) is the same torus point
await input('#rayTheta', 359);
await seek(45);
const s0 = await state();
const seamFrom = await page.evaluate(() => OMEGA_QM_DEBUG.dragTarget(359, 45)),
  seamTo = await page.evaluate(() => OMEGA_QM_DEBUG.dragTarget(0, 225)),
  seamFar = await page.evaluate(() => OMEGA_QM_DEBUG.dragTarget(0, 45)),
  hBox0 = await page.locator('#spinorHandle').boundingBox();
await page.locator('#spinorHandle').focus();
await page.keyboard.press('ArrowUp');
await settle(page);
const s1 = await state(),
  hBox1 = await page.locator('#spinorHandle').boundingBox();
const hStep = hBox0 && hBox1 ? Math.hypot(hBox1.x - hBox0.x, hBox1.y - hBox0.y) : Infinity;
check('arrow up across θ = 359° → 0° wraps to (0°, 225°) and the handle steps, not jumps, over the torus',
  s0.thetaDeg === 359 && near(s0.t, 45) && s1.thetaDeg === 0 && near(s1.t, 225) &&
  Math.hypot(seamTo.x - seamFrom.x, seamTo.y - seamFrom.y) < 2 && hStep < 2 && Math.hypot(seamFar.x - seamFrom.x, seamFar.y - seamFrom.y) > 20,
  JSON.stringify([s0.thetaDeg, s0.t, s1.thetaDeg, s1.t, hStep]));
await page.keyboard.press('ArrowDown');
await settle(page);
const s2 = await state();
check('arrow down across θ = 0° → 359° wraps back to (359°, 45°)', s2.thetaDeg === 359 && near(s2.t, 45), JSON.stringify([s2.thetaDeg, s2.t]));

for (const id of IDS) {
  if (CARDS[id].play) check(id + ' plays', await playsAfter(page, () => page.click('[data-preset="' + id + '"]'), () => window.OMEGA_QM_DEBUG.state));
  else {
    await page.click('[data-preset="' + id + '"]');
    await settle(page);
    const m = await state();
    await settle(page);
    check(id + ' rests on χ = 45°', !m.playing && near(m.t, STILL) && m.t === (await state()).t);
  }
}

/* ---------- colours on the stage, the marks and the strip ---------- */
await pick(DEFAULT);
async function primitiveColours(p = page) {
  return p.evaluate(async () => {
    const sc = window.TRV.solids[0],
      seen = [],
      names = ['surface', 'tube', 'line', 'circle', 'arrow', 'bead', 'ring', 'fan', 'poly', 'glass'],
      saved = {};
    for (const n of names) {
      saved[n] = sc[n];
      sc[n] = (...a) => {
        const style = n === 'circle' || n === 'glass' ? a[3] : n === 'line' || n === 'arrow' || n === 'bead' || n === 'ring' || n === 'fan' ? a[n === 'arrow' ? 2 : 1] : a[2];
        const key = n === 'surface' || n === 'tube' || n === 'poly' || n === 'glass' ? a[0] : (style && style.key) || n;
        const s = style || {};
        seen.push({ n, key: String(key), colors: [s.color, s.fill, s.edges, ...(s.colors || [])].filter(Boolean) });
        return saved[n](...a);
      };
    }
    window.TRV.kit.flush();
    for (const n of names) sc[n] = saved[n];
    const Pal = window.TRV.palette;
    return { seen, amber: Pal.amber, ok: Pal.ok, warn: Pal.warn, violet: Pal.violet, magenta: Pal.magenta, cyan: Pal.cyan };
  });
}
for (const id of IDS) {
  await pick(id);
  const colors = await primitiveColours();
  check(id + ' semantic stage colours: amber only on the cursor, no green or red, violet body, magenta fibre',
    colors.seen.filter((x) => x.colors.includes(colors.amber)).every((x) => CURSOR.test(x.key)) &&
      colors.seen.some((x) => x.key === 'cursor' && x.colors.includes(colors.amber)) &&
      colors.seen.every((x) => !x.colors.includes(colors.ok) && !x.colors.includes(colors.warn)) &&
      colors.seen.some((x) => x.key === 'spinorBody' && x.colors.includes(colors.violet)) &&
      colors.seen.some((x) => x.key === 'fibre' && x.colors.includes(colors.magenta)));
}
await pick(DEFAULT);
const marks = await page.evaluate(() => TRV.solids[0].marks().map((m) => [m.key, m.hidden]));
check('the body hides its far mark and leaves the near mark and the spinor visible',
  marks.some(([k, h]) => k === 'seamBack' && h) && marks.some(([k, h]) => k === 'seamFront' && !h) && marks.some(([k, h]) => k === 'cursor' && !h), JSON.stringify(marks));
const strip = async () =>
  page.evaluate(() => {
    const plot = TRV.kit.plot,
      traces = [];
    TRV.kit.plot = (...args) => {
      const graph = plot(...args);
      for (const method of ['line', 'dot', 'vline', 'hline']) {
        const original = graph[method];
        graph[method] = (...params) => {
          traces.push([method, ...params]);
          return original(...params);
        };
      }
      return graph;
    };
    try {
      TRV.kit.flush();
    } finally {
      TRV.kit.plot = plot;
    }
    const { sigma, cyan, magenta, amber } = TRV.palette;
    return { traces, sigma, cyan, magenta, amber };
  });
const lineOf = (s, color, k = 0) => s.traces.filter(([m, pts, c]) => m === 'line' && c === color)[k];
const curveIs = (tr, fn, tol = 1e-9) => !!tr && tr[1].length > 2 && tr[1].every(([x, y]) => near(y, fn(x), tol));
const cursorAt = (s, x) => s.traces.filter(([m, ...rest]) => (m === 'dot' || m === 'vline') && rest.includes(s.amber)).every((row) => near(row[1], x)) && s.traces.filter(([m, ...rest]) => (m === 'dot' || m === 'vline') && rest.includes(s.amber)).length === 2;
let s = await strip();
let m = await state();
check('strip I: the magenta spinor kernel swings (1 + cos χ)/2, the cyan ray kernel stays 1, amber cursor at χ',
  curveIs(lineOf(s, s.magenta), (x) => (1 + Math.cos(x * DEG)) / 2) && curveIs(lineOf(s, s.cyan), () => 1) && cursorAt(s, m.t));
await pick(IDS[1]);
s = await strip();
m = await state();
check('strip II: ΔA·ΔB of σx, σy on the meridian lies on |⟨σz⟩| = |cos θ|',
  curveIs(lineOf(s, s.cyan), (x) => Math.sqrt(1 - Math.sin(x * DEG) ** 2) * 1, 1e-9) && curveIs(lineOf(s, s.magenta), (x) => Math.abs(Math.cos(x * DEG))) && cursorAt(s, m.thetaDeg));
await pick(IDS[2]);
s = await strip();
m = await state();
check('strip III: round-trip readings cos²(θ/2) and sin²(θ/2) add to 1',
  curveIs(lineOf(s, s.cyan), (x) => (1 + Math.cos(x * DEG)) / 2) && curveIs(lineOf(s, s.sigma), (x) => (1 - Math.cos(x * DEG)) / 2) && cursorAt(s, m.thetaDeg));
await pick(IDS[3]);
s = await strip();
m = await state();
check('strip IV: the diagonal stays 5/8, the local coherence falls as (1 − λ)² × 3/8',
  curveIs(lineOf(s, s.cyan), () => 5 / 8) && curveIs(lineOf(s, s.magenta), (x) => (1 - x) ** 2 * (3 / 8)) && curveIs(lineOf(s, s.sigma), (x) => 5 / 8 + (1 - x) ** 2 * (3 / 8)) && cursorAt(s, m.lambda));
await pick(IDS[4]);
s = await strip();
m = await state();
check('strip V: |S|(γ) from four singlet correlations, the classical 2 and the ceiling 2√2',
  curveIs(lineOf(s, s.cyan), (x) => Math.abs(singletE(0, x / 2) + singletE(0, -x / 2) + singletE(x, x / 2) - singletE(x, -x / 2))) &&
    s.traces.some(([mm, y, c]) => mm === 'hline' && c === s.magenta && y === 2) && s.traces.some(([mm, y, c]) => mm === 'hline' && c === s.sigma && near(y, 2 * SQ2)) && cursorAt(s, m.gammaDeg));

const badColours = await page.evaluate(() => {
  const col = (v) => {
    const sp = document.createElement('span');
    sp.style.color = `var(${v})`;
    document.body.appendChild(sp);
    const c = getComputedStyle(sp).color;
    sp.remove();
    return c;
  };
  const banned = [col('--amber'), col('--ok'), col('--warn')],
    bad = [];
  for (const el of document.querySelectorAll('#stage *, .strip *, #readouts *, .field output')) {
    if (el.closest('.handle')) continue;
    const cs = getComputedStyle(el);
    for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'borderLeftColor']) if (banned.includes(cs[prop])) bad.push(`${el.id || el.className || el.tagName} ${prop}`);
  }
  for (const el of document.querySelectorAll('#evidence, #evidence *')) {
    const cs = getComputedStyle(el);
    for (const prop of ['color', 'borderTopColor', 'borderLeftColor']) if (cs[prop] === banned[0]) bad.push(`#evidence ${el.className || el.tagName} ${prop}`);
  }
  return bad;
});
check('semantic badge and readout colours (no amber outside the current choice)', !badColours.length, badColours.slice(0, 3).join(' | '));

/* ---------- narrow pages, cited frames and stills ---------- */
for (const lang of ['zh', 'en']) {
  for (const [width, height, figure] of [
    [390, 844, false],
    [334, 500, true],
    [740, 500, true]
  ]) {
    colorScheme = width === 390 ? 'light' : 'dark';
    const p = await T.open(BOOK, ID, '?lang=' + lang + (figure ? '&embed=1&preset=' + IDS[1] : ''), { viewport: { width, height }, reducedMotion: 'reduce' });
    await settle(p);
    for (let j = 0; j < IDS.length; j++) {
      const id = (await state(p)).preset;
      await layout(p, lang + '/' + width + '/' + id, figure);
      if (lang === 'en') check('English ' + width + '/' + id, !(await cjkLeftovers(p)).length);
      if (figure) check('cited frame hides strip ' + id, (await p.locator('.strip').isHidden()) && (await p.locator('.tour .tour-note').isVisible()));
      await p.locator(figure ? '[data-tour="next"]' : '[data-preset="' + IDS[(j + 2) % 5] + '"]').click();
      await settle(p);
    }
    if (width === 390) {
      check(lang + ' phone stacks the sphere above the torus', (await state(p)).wide === false);
      for (const yaw of [-Math.PI / 2, Math.PI / 2]) {
        await p.evaluate((y) => {
          TRV.kit.pause();
          TRV.solids[0].cam.yaw = y;
          TRV.kit.flush();
        }, yaw);
        await layout(p, lang + ' edge-on phone view ' + yaw);
      }
    }
    await p.context().close();
  }
  for (const id of IDS) {
    const p = await openStill(T, BOOK, ID, id, lang);
    const m = await verifyCard(p, id);
    check('still ' + lang + '/' + id, !m.playing && near(m.t, STILL) && (await p.locator('#spinorHandle').isHidden()) && !m.blending);
    await p.context().close();
  }
}
check('permanent dark console in both system schemes',
  !paletteMutations.length && paletteDocuments.every((x) => x.absent) && paletteDocuments.some((x) => x.dark) && paletteDocuments.some((x) => !x.dark));
check('zero console warnings', browserWarnings.length === 0, browserWarnings.slice(0, 3).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('zero browser or request errors', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));
await T.finish();
