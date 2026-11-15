// ECHO//IMAGINARY browser regression: the shared stage-first gate, then every control and every property the page
// claims, checked against an independent computation written here (own complex arithmetic, own projections, own
// rotations), never by calling the page's functions. Run directly with node; VIZ_PHASE1=1 skips the repeated
// card/still matrix, VIZ_SLOW_FRAMES=1000 delivers animation frames a second apart to flush out fixed waits.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'roundtrip-born-imaginary-blindspot-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const PHASE1 = process.env.VIZ_PHASE1 === '1';
const D = Math.PI / 180;

/* ---------- independent constants ---------- */
// θ* = cos θ*: bisection on cos x − x over [0, 1] (a different method from the page's Newton iteration)
let lo = 0, hi = 1;
for (let k = 0; k < 200; k++) { const m = (lo + hi) / 2; if (Math.cos(m) - m > 0) lo = m; else hi = m; }
const THETA_STAR = (lo + hi) / 2, THETA_STAR_DEG = THETA_STAR / D;
const T_ONE = 1 / D;                                             // the rail angle (degrees) at t = 1
const VIEW = { ext: [-0.62, 0.42], axis: [-0.62, 0], basis: [0, Math.PI / 2 - 0.001], turn: [-0.3, 0.86] };

const CARDS = {
  'radar-roundtrip-born': { theta: 30, phi0: 0, vantage: 'ext', evo: 'S', turn: false, overlay: false, play: true, still: 50, step: 15 },
  'azimuth-cone-blindspot': { theta: THETA_STAR_DEG, phi0: 0, vantage: 'ext', evo: 'S', turn: false, overlay: false, play: true, still: 135, step: 15 },
  'observer-first-person-90': { theta: 45, phi0: 90, vantage: 'axis', evo: 'S', turn: false, overlay: false, play: false, still: 0, step: 15 },
  'imaginary-double-turn': { theta: 90, phi0: 0, vantage: 'ext', evo: 'S', turn: true, overlay: false, play: true, still: 90, step: 90 },
  'schrodinger-arc-engine': { theta: 45, phi0: 0, vantage: 'ext', evo: 'S', turn: false, overlay: true, play: true, still: T_ONE, step: 15 }
};
const GIDS = [
  'D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight',
  'D5/S3/Quantum/FiniteDimensional.born_probability_skeleton',
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  'D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities',
  'D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel',
  'D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase',
  'D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger',
  'D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary',
  'D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow',
  'D5/S3/Quantum/Dynamics/EnergyEigenstateStationarity.energy_eigenstate_stationary'
];
const THEORY = ['zh', 'en'].map((lang) => `../../${lang}/ch34-s19-roundtrip-projection-and-imaginary-blindspot.html#sec-ch34-roundtrip-projection-and-imaginary-blindspot`);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-11) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const nearV = (a, b, tol = 1e-11) => Array.isArray(a) && a.length === b.length && a.every((x, i) => near(x, b[i], tol));
const mod360 = (a) => ((a % 360) + 360) % 360;
const angleGap = (a, b) => Math.abs(((a - b) % 360 + 540) % 360 - 180);
/** kit.fix as a reader sees it: d decimals, never "−0", a true minus sign. */
const f = (x, d = 6) => (Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toFixed(d).replace('-', '−');

/* ---------- own complex arithmetic and 2 × 2 matrices ---------- */
const c = {
  mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
  add: (a, b) => [a[0] + b[0], a[1] + b[1]],
  conj: (a) => [a[0], -a[1]],
  abs2: (a) => a[0] * a[0] + a[1] * a[1]
};
const mat = (A, B) => [0, 1].map((i) => [0, 1].map((j) => c.add(c.mul(A[i][0], B[0][j]), c.mul(A[i][1], B[1][j]))));
const apply = (A, x) => [c.add(c.mul(A[0][0], x[0]), c.mul(A[0][1], x[1])), c.add(c.mul(A[1][0], x[0]), c.mul(A[1][1], x[1]))];
const braket = (a, b) => c.add(c.mul(c.conj(a[0]), b[0]), c.mul(c.conj(a[1]), b[1]));
const msub = (A, B) => A.map((r, i) => r.map((z, j) => [z[0] - B[i][j][0], z[1] - B[i][j][1]]));
const O = [0, 0], I1 = [1, 0];
const SX = [[O, I1], [I1, O]], SY = [[O, [0, -1]], [[0, 1], O]], SZ = [[I1, O], [O, [-1, 0]]];
const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const scale3 = (a, k) => a.map((x) => x * k);
const cross3 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const add3 = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const lerp3 = (a, b, t) => [0, 1, 2].map((i) => a[i] + (b[i] - a[i]) * t);
/** v turned about the unit axis n by the angle a (Rodrigues). */
const rodrigues = (v, n, a) => add3(add3(scale3(v, Math.cos(a)), scale3(cross3(n, v), Math.sin(a))), scale3(n, dot3(n, v) * (1 - Math.cos(a))));

/** What every readout must be for a page state, computed from scratch. */
function expected(s) {
  const th = s.thetaDeg * D, ct = Math.cos(th), st = Math.sin(th);
  const unitary = s.turn || s.evolution === 'S';
  const phiDeg = !s.turn && s.evolution === 'S' ? mod360(s.phi0Deg + s.alphaDeg) : mod360(s.phi0Deg);
  const ph = phiDeg * D, t = s.alphaDeg * D, amp = unitary ? 1 : Math.exp(-t), n2 = amp * amp;
  // the unit qubit state and its readouts
  const psi = [[ct, 0], [st * Math.cos(ph), st * Math.sin(ph)]];
  const pZ0 = c.abs2(braket([I1, O], psi));
  const plus = [[Math.SQRT1_2, 0], [Math.SQRT1_2, 0]], plusI = [[Math.SQRT1_2, 0], [0, Math.SQRT1_2]];
  const pX = c.abs2(braket(plus, psi)), pY = c.abs2(braket(plusI, psi));
  const ev = (A) => braket(psi, apply(A, psi))[0];
  const commZX = msub(mat(SZ, SX), mat(SX, SZ));
  const commHalf = c.mul([0, -0.5], braket(psi, apply(commZX, psi)));   // (1/2i)⟨[σz, σx]⟩
  // the stage: V = amp · (sin θ cos φ, sin θ sin φ, cos θ)
  const Vhat = [st * Math.cos(ph), st * Math.sin(ph), ct], V = scale3(Vhat, amp), I = [0, 0, 1];
  const shadow = scale3(I, dot3(V, I));
  const foot = scale3(V, dot3(V, I));                            // P_ψ I = ⟨ψ, I⟩ ψ
  const echoPoint = scale3(I, dot3(foot, I));
  const u = (s.alphaDeg % 60) / 60;
  const pulse = u < 0.5 ? lerp3(I, foot, 2 * u) : lerp3(foot, echoPoint, 2 * u - 1);
  // the rotor: I turned by α about I × e⊥
  const ePerp = [Math.cos(s.phi0Deg * D), Math.sin(s.phi0Deg * D), 0];
  const W = rodrigues(I, cross3(I, ePerp), s.alphaDeg * D);
  return {
    phiDeg, t, amp, n2, cos: ct, sin: st, echo: n2 * pZ0, deficit: n2 * (1 - pZ0), cap: 2 * Math.PI * (1 - ct), circ: 2 * Math.PI * st,
    bloch: 2 * s.thetaDeg, sigmaZ: ev(SZ), sigmaX: ev(SX), sigmaY: ev(SY), comm: Math.hypot(commHalf[0], commHalf[1]),
    deltaZ: Math.sqrt(Math.max(0, 1 - ev(SZ) ** 2)), deltaX: Math.sqrt(Math.max(0, 1 - ev(SX) ** 2)),
    PX: n2 * pX, PY: n2 * pY, zS: [Math.cos(t), -Math.sin(t)], zR: Math.exp(-t), normR: Math.exp(-2 * t),
    V, shadow, foot, echoPoint, pulse, ePerp, W, IW: dot3(W, I), EW: dot3(W, ePerp), psi, commHalf
  };
}

const T = await session();
const { page, check } = T;

// Headless Chromium reports driver diagnostics as warnings. They are harmless; every other warning is a failure.
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
// The page stays on the shared night console: no palette attribute is ever written, in any colour scheme.
const paletteMutations = [], paletteDocuments = [];
async function watchPalette(context) {
  await context.exposeBinding('__echoPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__echoPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__echoPaletteAudit({ kind: 'document',
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

// The shared gate: desktop, English, short screens, embed, rail, frames, cited figure, still, phone, cover, motion,
// plus the lit solid (opaque share, light and shade, turning, marks, the WebGL context resting inside a book).
await stageFirstChecks(T, BOOK, ID, { solid: true, cards: !PHASE1, settle: 0 });

/* ---------- helpers ---------- */
const state = (p = page) => p.evaluate(() => window.ROUNDTRIP_BORN_DEBUG.state);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
  await settle(p);
}
/** Move the rail as a reader scrubs it: the clock moves, the card stays selected. */
const rail = (deg, p = page) => input('#now', deg, p);
async function pause(p = page) {
  await settle(p);
  if ((await state(p)).playing) await p.click('#play');
  await settle(p);
}
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  await until(p, (q) => {
    const s = window.ROUNDTRIP_BORN_DEBUG.state;
    return s.preset === q.id && Math.abs(s.thetaDeg - q.theta) < 1e-9 && Math.abs(s.phi0Deg - q.phi0) < 1e-9 && s.turn === q.turn && s.overlay === q.overlay;
  }, { id: card, ...CARDS[card] });
  await pause(p);
}
const text = (sel, p = page) => p.locator(sel).textContent();

function checkMath(s, tag) {
  const e = expected(s);
  check(`${tag}: θ* is the fixed point of cos`, near(s.thetaStar, THETA_STAR, 1e-15) && Math.abs(Math.cos(s.thetaStar) - s.thetaStar) < 1e-15);
  check(`${tag}: phase law φ = φ₀ + ωt (Schrödinger) or φ₀`, near(s.phiDeg, e.phiDeg, 1e-9) && near(s.time, s.alphaDeg * D, 1e-14));
  check(`${tag}: cos θ, sin θ, echo, deficit`, near(s.cos, e.cos) && near(s.sin, e.sin) && near(s.echo, e.echo) && near(s.deficit, e.deficit)
    && near(s.echo + s.deficit, e.n2, 1e-12));
  check(`${tag}: cone solid angle, blind circumference, Bloch polar angle`, near(s.capSolidAngle, e.cap) && near(s.blindCircumference, e.circ) && near(s.blochPolarDeg, e.bloch));
  check(`${tag}: Pauli expectations and the commutator bound`, near(s.sigmaZ, e.sigmaZ) && near(s.sigmaX, e.sigmaX) && near(s.sigmaY, e.sigmaY)
    && near(s.commutatorBound, e.comm) && near(s.commutatorBound, Math.abs(Math.sin(2 * s.thetaDeg * D) * Math.sin(e.phiDeg * D)), 1e-11)
    && near(s.deltaZ, e.deltaZ, 1e-7) && near(s.deltaX, e.deltaX, 1e-7) && s.deltaZ * s.deltaX >= s.commutatorBound - 1e-12);
  check(`${tag}: turned-basis readouts P_X(+), P_Y(+i)`, near(s.PX, e.PX) && near(s.PY, e.PY));
  check(`${tag}: evolved norm and amplitude factors`, near(s.norm2, e.n2) && nearV(s.zS, e.zS) && near(Math.hypot(...s.zS), 1, 1e-14) && near(s.zR, e.zR) && near(s.normR, e.normR));
  if (!s.turn) {
    check(`${tag}: V, its shadow and the two radar legs`, nearV(s.V, e.V) && nearV(s.shadow, e.shadow) && nearV(s.roundTripFoot, e.foot) && nearV(s.echoPoint, e.echoPoint)
      // leg 2 is perpendicular to I (same height); for a unit state leg 1 is perpendicular to V
      && near(s.roundTripFoot[2], s.echoPoint[2], 1e-11) && (e.amp < 1 || near(dot3(add3(s.roundTripFoot, [0, 0, -1]), s.V), 0, 1e-11))
      && near(s.echoPoint[2], e.n2 * e.cos * e.cos, 1e-11));
    check(`${tag}: the radar pulse runs on the two legs`, nearV(s.pulse, e.pulse, 1e-11));
  }
  if (s.turn) check(`${tag}: the rotor W = R(α) I and its two readings`, nearV(s.W, e.W) && near(s.IW, e.IW) && near(s.ePerpW, e.EW) && near(dot3(s.W, s.W), 1, 1e-12));
}

function checkInstances(s, tag) {
  const I = s.leanInstances, e = expected({ ...s, evolution: 'S', turn: false, alphaDeg: 0, phi0Deg: s.phiDeg });   // the unit state at the shown φ
  const w0 = c.abs2(e.psi[0]), w1 = c.abs2(e.psi[1]);
  check(`${tag}: Born pairing weight |⟨0|ψ⟩|² = Tr(ρP₀); unread state forgets φ`, near(I.born.weight, w0) && near(I.born.trace, w0) && I.born.residual < 1e-14
    && nearV(I.born.unreadDiag, [w0, w1]) && I.born.unreadOffDiag < 1e-14 && I.born.mixResidual < 1e-12);
  check(`${tag}: Born skeleton Born(ρ, 1) = 1 and additivity`, near(I.skeleton.identity, 1, 1e-14) && near(I.skeleton.sum, 1, 1e-14) && I.skeleton.additivity < 1e-14 && I.skeleton.minProjection >= 0);
  check(`${tag}: Lagrange identity gives the deficit sin²θ`, near(I.lagrange.lhs, Math.sin(s.thetaDeg * D) ** 2) && near(I.lagrange.rhs, Math.sin(s.thetaDeg * D) ** 2) && I.lagrange.residual < 1e-14);
  check(`${tag}: complementary projections, P_I e⊥ = 0`, I.complement.identities === 6 && I.complement.residual === 0 && I.complement.readOfPerp < 1e-15 && near(I.complement.perpOfPerp, 1, 1e-14));
  // the partition readout on the cone: the test samples its own 720 azimuths
  let lo2 = Infinity, hi2 = -Infinity;
  for (let j = 0; j < 720; j++) {
    const th = s.thetaDeg * D, ph = j * D / 2, r = c.abs2(braket([I1, O], [[Math.cos(th), 0], [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph)]]));
    lo2 = Math.min(lo2, r); hi2 = Math.max(hi2, r);
  }
  check(`${tag}: the cone is one class of the readout`, I.partition.samples === 360 && I.partition.spread < 1e-12 && I.partition.classes === 1 && hi2 - lo2 < 1e-12);
  check(`${tag}: diagonal observables are blind to the phase flip, X is not`, I.diagonal.observables === 24 && I.diagonal.maxDifference < 1e-14
    && near(I.diagonal.xPlus, 1, 1e-14) && near(I.diagonal.xMinus, -1, 1e-14) && near(I.diagonal.statesDiffer, 1, 1e-14));
  // Robertson–Schrödinger with A = σz, B = σx on a qubit: ΔZ²ΔX² = cov² + ⟨σy⟩² + G, G = 0 for a pure qubit
  const ez = e.sigmaZ, ex = e.sigmaX, ey = e.sigmaY, lhs = (1 - ez * ez) * (1 - ex * ex), cov = -ez * ex;
  check(`${tag}: Robertson–Schrödinger on (σz, σx)`, near(I.robertson.lhs, lhs) && near(I.robertson.covariance, cov) && near(I.robertson.commutatorHalf[0], ey)
    && near(I.robertson.commutatorHalf[1], 0, 1e-14) && near(I.robertson.G, 0, 1e-11) && I.robertson.G > -1e-12 && I.robertson.residual < 1e-12
    && I.robertson.reResidual < 1e-12 && I.robertson.imResidual < 1e-12);
  check(`${tag}: the 90° rotor is skew-adjoint, unitary and squares to −1`, I.rotor.skewResidual === 0 && I.rotor.unitaryResidual === 0 && I.rotor.squareResidual === 0);
  // projection flow under H = |0⟩⟨0|: P_X(t′) = (1 + sin 2θ cos(φ + t′))/2, so dP_X/dt′ = −sin 2θ sin(φ + t′)/2
  const dPX = -Math.sin(2 * s.thetaDeg * D) * Math.sin(s.phiDeg * D + s.time) / 2;
  check(`${tag}: [H, P₀] = 0 keeps the echo; the derivative formula for P_X`, I.flow.commutatorP0 === 0 && near(I.flow.commutatorPX, 0.5, 1e-14) && I.flow.echoSpread < 1e-14
    && near(I.flow.derivativePX, dPX, 1e-12) && near(I.flow.differencePX, dPX, 1e-7) && I.flow.derivativeResidual < 1e-7);
  check(`${tag}: |0⟩ is stationary, its amplitude e^{−iωt}`, I.stationary.unitaryResidual < 1e-15 && I.stationary.stateResidual < 1e-15
    && nearV(I.stationary.phase, [Math.cos(s.time), -Math.sin(s.time)]) && I.stationary.energy === 1);
}

async function checkReadouts(s, tag, p = page) {
  const e = expected(s);
  const r = await p.evaluate(() => Object.fromEntries(['roEcho', 'roCos', 'roSin', 'roDeficit', 'roCap', 'roCirc', 'roComm', 'roXY', 'roNorm', 'roTurn'].map((k) => [k, document.getElementById(k).textContent])));
  check(`${tag}: six-decimal readouts match the independent values`, r.roEcho === f(e.echo) && r.roCos === f(e.cos) && r.roSin === f(e.sin) && r.roDeficit === f(e.deficit)
    && r.roCap === `${f(e.cap)} sr` && r.roCirc.includes(`2π sin θ = ${f(e.circ)}`) && r.roCirc.includes(`2θ = ${f(e.bloch, 3)}°`)
    && r.roComm.startsWith(f(e.comm)) && r.roXY.includes(f(e.PX)) && r.roXY.includes(f(e.PY)) && r.roNorm.startsWith(f(e.n2)), JSON.stringify(r));
  if (s.turn) check(`${tag}: the rotor readout`, r.roTurn.includes(`I·W = ${f(e.IW)}`) && r.roTurn.includes(`·W = ${f(e.EW)}`), r.roTurn);
}

async function checkLinks(p, tag) {
  check(`${tag}: exact frozen evidence links`, same(await p.$$eval('[data-lean-gid]', (els) => els.map((x) => x.dataset.leanGid).sort()), [...GIDS].sort())
    && await p.$$eval('[data-lean-gid]', (els) => els.every((x) => x.closest('.col.side #evidence .lean') && x.closest('.lean').querySelector('.ok')?.textContent.trim() === 'LEAN ✓')));
  check(`${tag}: exact bilingual theory link`, same(await p.$$eval('#drawer a[href^="../../"]', (els) => els.map((x) => x.getAttribute('href')).sort()), [...THEORY].sort()));
}

/* ---------- sources and registry ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((file) => [file, fs.readFileSync(path.join(DIR, file), 'utf8')]));
for (const [file, source] of Object.entries(sources)) {
  check(`source ${file}: no literal colour or palette override`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(source) && !/\btrPalette\b|data-tr-palette|--warn\b/.test(source));
}
check('source: shared three-column grid untouched and wheel:false', !/grid-template-columns\s*:/i.test(sources['style.css']) && /wheel:\s*false/.test(sources['main.js']));
check('source: the five public presets in order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1]), Object.keys(CARDS)));
check('source: no green tick outside the evidence boxes', !sources['main.js'].includes('✓'));
check('source: the brand ECHO//IMAGINARY in the header and the rail', /data-text="ECHO\/\/IMAGINARY"/.test(sources['index.html']) && /class="rail-brand">ECHO<b>\/\/<\/b>IMAGINARY/.test(sources['index.html']));
const zhCount = (sources['index.html'].match(/class="(?:[^"]*\s)?zh(?:\s[^"]*)?"/g) || []).length, enCount = (sources['index.html'].match(/class="(?:[^"]*\s)?en(?:\s[^"]*)?"/g) || []).length;
check('source: every text fragment has both languages', zhCount === enCount && zhCount > 40, `${zhCount} zh / ${enCount} en`);
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID) || {};
check('registry: live §34.19 entry with the five bilingual cards and the ten cited GIDs', entry.status === 'live' && entry.chapter === 34 && entry.section === '34.19'
  && same(entry.presets, Object.keys(CARDS)) && (entry.presets || []).every((k) => entry.preset_titles && entry.preset_titles[k] && entry.preset_titles[k].zh && entry.preset_titles[k].en)
  && same((entry.lean || []).map((x) => x.gid).sort(), [...GIDS].sort()), JSON.stringify({ status: entry.status, chapter: entry.chapter, section: entry.section, presets: entry.presets, lean: (entry.lean || []).length }));

/* ---------- runtime contract ---------- */
await T.goto(BOOK, ID, '?lang=en');
await settle(page);
check('runtime: only the shared scripts and styles', same(await page.$$eval('script', (els) => els.map((x) => x.getAttribute('src'))), ['../assets/shell.js', '../assets/kit.js', 'main.js'])
  && same(await page.$$eval('link[rel="stylesheet"]', (els) => els.map((x) => x.getAttribute('href')).filter((h) => !h.startsWith('https:'))), ['../assets/theme.css', 'style.css']));
await checkLinks(page, 'runtime');
check('layout: exact three-column lab contract', await page.evaluate(() => {
  const app = document.querySelector('#app.app.lab'), deck = app.querySelector(':scope > aside.col.deck'), center = app.querySelector(':scope > main.center'), side = app.querySelector(':scope > aside.col.side');
  const d = deck.getBoundingClientRect(), m = center.getBoundingClientRect(), s = side.getBoundingClientRect();
  return getComputedStyle(app).display === 'grid' && getComputedStyle(app).gridTemplateColumns.trim().split(/\s+/).length === 3
    && d.right <= m.left + 1 && m.right <= s.left + 1 && !!app.querySelector(':scope > footer.rail') && !!document.querySelector('body > #drawer')
    && !!center.querySelector(':scope > #stage.stage > canvas#cv') && !!center.querySelector(':scope > .tour') && !!center.querySelector(':scope > .strip #plot')
    && !!document.querySelector('#stage > .hud-tl') && !!document.querySelector('#stage > .hud-tr#vantageChips') && !!document.querySelector('#stage > .hud-bl')
    && !!side.querySelector(':scope > #readouts') && !!side.querySelector(':scope > #evidence') && !!document.querySelector('#evidence > #infoBtn')
    && !!document.querySelector('#drawer #drawerClose') && !document.querySelector('#stage #plot');
}));
check('layout: readouts, inline figures and evidence are visible', await page.locator('#readouts').isVisible() && await page.locator('#evidence').isVisible()
  && await page.locator('#bornSvg').isVisible() && await page.locator('#dialSvg').isVisible());
check('runtime: the solid stage keeps page scrolling (no wheel zoom)', await page.evaluate(async () => {
  const sc = TRV.solids[0], z = sc.cam.zoom, ev = new WheelEvent('wheel', { deltaY: -400, bubbles: true, cancelable: true });
  document.getElementById('stage').dispatchEvent(ev); TRV.kit.flush();
  return sc.cam.zoom === z && !ev.defaultPrevented;
}));

/* ---------- every card through the real controls, both languages ---------- */
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  check(`language ${lang}: document and pressed toggle`, await page.evaluate((l) => document.documentElement.lang.startsWith(l)
    && document.querySelector(`[data-lang-set="${l}"]`).getAttribute('aria-pressed') === 'true', lang));
  for (const card of Object.keys(CARDS)) {
    await pick(card); const s = await state(), q = CARDS[card];
    check(`${lang}/${card}: preset applies its controls`, s.preset === card && !s.playing && s.vantage === q.vantage && s.evolution === q.evo && s.step === q.step
      && await page.locator(`[data-preset="${card}"]`).getAttribute('aria-pressed') === 'true'
      && near(Number(await page.locator(`[data-preset="${card}"]`).getAttribute('data-still')), q.still, 1e-9)
      && near(Number(await page.inputValue('#theta')), q.theta, 1e-9) && near(Number(await page.inputValue('#phi')), q.phi0, 1e-9)
      && await page.locator(`#vantageChips [data-vantage="${q.vantage}"]`).getAttribute('aria-pressed') === 'true');
    const cam = q.turn && q.vantage === 'ext' ? VIEW.turn : VIEW[q.vantage];
    check(`${lang}/${card}: camera of the vantage`, near(s.camera.yaw, cam[0], 1e-9) && near(s.camera.pitch, cam[1], 1e-9), JSON.stringify(s.camera));
    checkMath(s, `${lang}/${card}`);
    checkInstances(s, `${lang}/${card}`);
    await checkReadouts(s, `${lang}/${card}`);
    if (lang === 'en') check(`en/${card}: no Chinese left`, (await cjkLeftovers(page)).length === 0);
  }
}

/* ---------- RADAR: the round trip and its echo, independent of φ ---------- */
await page.click('[data-lang-set="zh"]'); await settle(page);
await pick('radar-roundtrip-born');
{
  let worst = 0, legs = 0;
  for (const a of [0, 15, 29, 30, 31, 45, 59, 60, 90, 133, 180, 271, 359]) {
    await rail(a); const s = await state(), e = expected(s);
    worst = Math.max(worst, Math.abs(s.echo - 0.75), Math.abs(s.cos - Math.sqrt(3) / 2), Math.abs(s.deficit - 0.25));
    legs = Math.max(legs, Math.hypot(...s.pulse.map((x, i) => x - e.pulse[i])));
    check(`RADAR α = ${a}°: the card stays while the rail moves`, s.preset === 'radar-roundtrip-born' && near(s.phiDeg, mod360(a), 1e-9));
  }
  check('RADAR: echo 0.750000, cos θ 0.866025, deficit 0.250000 at every φ', worst < 1e-14, `worst ${worst}`);
  check('RADAR: the pulse sits on the legs I → cos θ V → cos²θ I', legs < 1e-12, `${legs}`);
  const s = await state();
  check('RADAR: Bloch polar angle 2θ = 60.000°', near(s.blochPolarDeg, 60, 1e-12) && (await text('#roCirc')).includes('2θ = 60.000°'));
  check('RADAR: HUD and pill show cos²θ = 0.750000', (await text('#hudBig')).includes('0.750000') && (await text('#echoPill')).includes('0.750000') && (await text('#thetaPill')).includes('30.000°'));
  const pa = await playsAfter(page, () => page.click('[data-preset="radar-roundtrip-born"]'), () => window.ROUNDTRIP_BORN_DEBUG.state);
  check('RADAR: clicking the card plays the round trips', pa);
  await pause();
}

/* ---------- CONE: θ*, a full turn of φ, the echo keeps every digit ---------- */
await pick('azimuth-cone-blindspot');
{
  const s0 = await state();
  check('CONE: θ = θ* = 42.346459° (cos θ* = θ* = 0.739085 rad)', near(s0.thetaDeg, THETA_STAR_DEG, 1e-12) && f(s0.thetaDeg) === '42.346459' && f(s0.cos) === '0.739085');
  check('CONE: echo 0.546247, circumference 4.232429, solid angle 1.639376 sr', f(s0.echo) === '0.546247' && f(s0.blindCircumference) === '4.232429' && f(s0.capSolidAngle) === '1.639376'
    && (await text('#roCap')) === '1.639376 sr' && (await text('#roCirc')).includes('4.232429') && (await text('#roEcho')) === '0.546247');
  const echoes = new Set(), dirs = [];
  for (let a = 0; a < 360; a += 15) { await rail(a); const s = await state(); echoes.add(s.echo.toFixed(15)); dirs.push(s.V); }
  const onCone = dirs.every((v) => near(dot3(v, [0, 0, 1]), Math.cos(THETA_STAR), 1e-14) && near(Math.hypot(...v), 1, 1e-14));
  const spread = Math.max(...dirs.map((v) => Math.atan2(v[1], v[0]))) - Math.min(...dirs.map((v) => Math.atan2(v[1], v[0])));
  check('CONE: 24 azimuths around the cone return one and the same echo', echoes.size === 1, [...echoes].join(','));
  check('CONE: every V of the sweep lies on the cone of half-angle θ* and the sweep goes round', onCone && spread > 5.9);
  check('CONE: the card is still selected after the sweep', (await state()).preset === 'azimuth-cone-blindspot');
  check('CONE: card click plays the sweep', await playsAfter(page, () => page.click('[data-preset="azimuth-cone-blindspot"]'), () => window.ROUNDTRIP_BORN_DEBUG.state));
  await pause();
}

/* ---------- FIRST PERSON: Z blind to φ, the turned basis reads it ---------- */
await pick('observer-first-person-90');
{
  let s = await state();
  check('FIRST PERSON: θ = 45°, φ = 90°, side-on camera', near(s.thetaDeg, 45) && near(s.phiDeg, 90) && near(s.camera.pitch, 0, 1e-12));
  check('FIRST PERSON: Z reads 0.500000', f(s.echo) === '0.500000' && (await text('#hudSub')).includes('0.500000'));
  await page.click('#vantageChips [data-vantage="basis"]'); await settle(page); s = await state();
  check('FIRST PERSON: the turned-basis chip turns the camera to look down I and keeps the card', s.vantage === 'basis' && near(s.camera.pitch, Math.PI / 2 - 0.001, 1e-9) && s.preset === 'observer-first-person-90');
  check('FIRST PERSON: P_Y(+i) = 1, P_X(+) = 0.5 and |sin 2θ sin φ| = 1.000000 (RS saturated)', near(s.PY, 1, 1e-14) && near(s.PX, 0.5, 1e-14) && f(s.commutatorBound) === '1.000000'
    && near(s.leanInstances.robertson.lhs, 1, 1e-14) && near(s.leanInstances.robertson.commutatorHalf[0], 1, 1e-14) && (await text('#hudSub')).includes('1.000000'));
  check('FIRST PERSON: the turned basis X and Y axes are labelled on the stage', await page.evaluate(() => [...document.querySelectorAll('.stage .tag')].filter((t) => !t.hidden && /\|\+i?⟩/.test(t.textContent)).length >= 1));
  await page.click('#vantageChips [data-vantage="axis"]'); await settle(page);
  check('FIRST PERSON: back to the side-on camera', near((await state()).camera.pitch, 0, 1e-9));
  // sweep φ₀: Z never moves, the turned basis does
  const zs = new Set(), xs = [];
  for (const phi of [0, 45, 90, 135, 180, 225, 270, 315]) { await input('#phi', phi); const t = await state(); zs.add(f(t.echo)); xs.push(t.PX); }
  check('FIRST PERSON: the Z readout is 0.500000 for every φ, P_X is not', zs.size === 1 && zs.has('0.500000') && Math.max(...xs) - Math.min(...xs) > 0.99, JSON.stringify([...zs]));
  check('FIRST PERSON: the φ slider leaves the card', (await state()).preset === null);
}

/* ---------- ×i: the two quarter turns ---------- */
await pick('imaginary-double-turn');
{
  await page.click('#rew'); await settle(page);
  let s = await state();
  check('×i: the rotor starts at ×1 with W = I', s.turn && near(s.alphaDeg, 0) && nearV(s.W, [0, 0, 1]) && near(s.IW, 1));
  const want = [[90, 0, 1, '×i'], [180, -1, 0, '×i² = −1'], [270, 0, -1, '×i³ = −i'], [360, 1, 0, '×i⁴ = +1'], [90, 0, 1, '×i']];
  for (const [a, iw, ew, name] of want) {
    await page.click('#turnBtn'); await settle(page); s = await state();
    const e = expected(s);
    check(`×i → ${name}: α = ${a}°, I·W = ${iw}, e⊥·W = ${ew}`, near(s.alphaDeg, a, 1e-9) && near(s.IW, iw, 1e-15) && near(s.ePerpW, ew, 1e-15) && nearV(s.W, e.W, 1e-15)
      && (await text('#hudBig')).includes(name) && (await text('#roTurn')).includes(`I·W = ${f(iw)}`));
  }
  await rail(90); s = await state();
  check('×i: at ×i the turned vector is e⊥ and reads 0.000000 on I', nearV(s.W, s.ePerp, 1e-15) && f(s.IW) === '0.000000' && (await text('#hudBig')).includes('I·W = 0.000000'));
  await rail(180); s = await state();
  check('×i: at ×i² the vector is −I, back on the visible axis, echo (I·W)² = 1', nearV(s.W, [0, 0, -1], 1e-15) && near(s.IW * s.IW, 1, 1e-15) && (await text('#hudSub')).includes('1.000000'));
  check('×i: R² = −1 instance', s.leanInstances.rotor.squareResidual === 0);
  await page.click('[data-preset="imaginary-double-turn"]'); await settle(page);
  check('×i: the card plays the rotor with a 90° keyboard step', (await state()).step === 90);
  await pause();
  await page.locator('body').click({ position: { x: 4, y: 4 } });
  await rail(0); await page.keyboard.press('ArrowRight'); await settle(page);
  check('×i: → steps one quarter turn', near((await state()).alphaDeg, 90, 1e-9));
  await input('#theta', 30);
  s = await state();
  check('×i: moving θ leaves the rotor for the cone', !s.turn && s.step === 15 && near(s.camera.pitch, VIEW.ext[1], 1e-9));
}

/* ---------- ARC ENGINE: with i the norm holds, without it the norm drains ---------- */
await pick('schrodinger-arc-engine');
{
  for (const [tt, want] of [[1, '0.135335'], [2, '0.018316']]) {
    await rail(tt / D); const s = await state();
    check(`ARC t = ${tt}: |ψ_S|² = 1.000000, e^{−2t} = ${want}`, near(s.time, tt, 1e-12) && f(s.norm2) === '1.000000' && f(s.normR) === want
      && (await text('#hudBig')).includes('1.000000') && (await text('#hudSub')).includes(want) && (await text('#plotMeta')).includes(want) && s.preset === 'schrodinger-arc-engine');
    check(`ARC t = ${tt}: e^{−iωt} on the unit circle`, nearV(s.zS, [Math.cos(tt), -Math.sin(tt)], 1e-12) && near(Math.hypot(...s.zS), 1, 1e-15)
      && (await text('#hudSub')).includes(`${f(Math.cos(tt))} ${-Math.sin(tt) < 0 ? '−' : '+'}${f(Math.abs(Math.sin(tt)))}i`));
  }
  await rail(T_ONE);
  await page.click('#evoChips [data-evo="R"]'); await settle(page);
  let s = await state();
  check('ARC: real decay shrinks V to e^{−t} V₀ and the norm to e^{−2t}', s.evolution === 'R' && near(Math.hypot(...s.V), Math.exp(-1), 1e-12) && f(s.norm2) === '0.135335'
    && near(s.echo, Math.exp(-2) * 0.5, 1e-12) && near(s.phiDeg, 0, 1e-12) && (await text('#roNorm')).startsWith('0.135335'));
  check('ARC: the evolution chip leaves the card and hides the handle', s.preset === null && await page.locator('#stateHandle').isHidden());
  await page.click('#evoChips [data-evo="S"]'); await settle(page); s = await state();
  check('ARC: back to Schrödinger, norm 1 and V on the unit sphere', s.evolution === 'S' && near(Math.hypot(...s.V), 1, 1e-14) && near(s.norm2, 1));
}

/* ---------- controls ---------- */
await pick('radar-roundtrip-born');
for (const th of [0, 0.5, 17.25, 45, 60, 89.5, 90]) {
  await input('#theta', th); const s = await state();
  check(`θ slider ${th}°: state, output and math`, near(s.thetaDeg, th, 1e-12) && s.preset === null && (await text('#oTheta')) === `${f(th, 3)}°`);
  checkMath(s, `θ=${th}`);
  await checkReadouts(s, `θ=${th}`);
}
await page.click('#dottieBtn'); await settle(page);
check('θ* button snaps θ to the exact root of cos θ = θ', near((await state()).thetaDeg, THETA_STAR_DEG, 1e-12) && (await text('#oTheta')) === '42.346°');
for (const phi of [0, 90, 200, 359]) {
  await input('#phi', phi); const s = await state();
  check(`φ₀ slider ${phi}°`, near(s.phi0Deg, phi, 1e-12) && (await text('#oPhi')) === `${f(phi, 1)}°`);
  checkMath(s, `φ₀=${phi}`);
}
for (const v of ['axis', 'basis', 'ext']) {
  await page.click(`#vantageChips [data-vantage="${v}"]`); await settle(page); const s = await state();
  check(`vantage ${v}: chip and camera`, s.vantage === v && near(s.camera.pitch, VIEW[v][1], 1e-9) && near(s.camera.yaw, VIEW[v][0], 1e-9)
    && await page.locator(`#vantageChips [data-vantage="${v}"]`).getAttribute('aria-pressed') === 'true');
  const view = await stageView(page, '#stage', false);
  check(`vantage ${v}: HUD and layout stay clear`, view.layout.length === 0 && view.hud.length === 0, [...view.layout, ...view.hud].join(' | '));
}
await page.locator('body').click({ position: { x: 4, y: 4 } });
await page.keyboard.press('v'); await settle(page);
check('key v cycles the vantage', (await state()).vantage === 'axis');
await page.keyboard.press('v'); await page.keyboard.press('v'); await settle(page);
await page.keyboard.press('e'); await settle(page);
check('key e switches to real decay', (await state()).evolution === 'R');
await page.keyboard.press('e'); await settle(page);
await input('#theta', 20); await page.locator('body').click({ position: { x: 4, y: 4 } });
await page.keyboard.press('d'); await settle(page);
check('key d snaps to θ*', near((await state()).thetaDeg, THETA_STAR_DEG, 1e-12));
await page.keyboard.press('i'); await settle(page);
check('key i enters the rotor at ×i', (await state()).turn && near((await state()).alphaDeg, 90, 1e-9));
await input('#theta', 30);

/* ---------- the handle: drag V over the upper hemisphere, the camera stays ---------- */
await page.click('#vantageChips [data-vantage="ext"]'); await input('#phi', 20); await page.click('#rew'); await settle(page);
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const before = await state(), h = await page.evaluate(() => window.ROUNDTRIP_BORN_DEBUG.handleBox()), target = await page.evaluate(() => window.ROUNDTRIP_BORN_DEBUG.spherePoint(60, 300));
  const e = expected(before), q = await page.evaluate((v) => { const b = document.getElementById('stage').getBoundingClientRect(); return [v.x, v.y, b.left, b.top]; }, h || { x: 0, y: 0 });
  check('handle: visible on the tip of V', !!h && await page.locator('#stateHandle').isVisible() && before.handle && Math.hypot(before.handle.x + q[2] - q[0], before.handle.y + q[3] - q[1]) < 2.5 && near(Math.hypot(...e.V), 1, 1e-12));
  if (h && target) {
    await page.mouse.move(h.x, h.y); await page.mouse.down();
    check('handle: pointerdown enters dragging', await page.locator('#stateHandle').evaluate((el) => el.classList.contains('dragging')));
    await page.mouse.move(target.x, target.y, { steps: 10 }); await page.mouse.up(); await settle(page);
    const after = await state();
    check('handle: the drag moves V to the point under the pointer (θ 60°, φ 300°) without turning the camera', Math.abs(after.thetaDeg - 60) < 1.5 && angleGap(after.phiDeg, 300) < 2.5
      && same(after.camera, before.camera) && !(await page.locator('#stateHandle').evaluate((el) => el.classList.contains('dragging'))), JSON.stringify({ theta: after.thetaDeg, phi: after.phiDeg }));
    checkMath(after, 'after drag');
  }
}

/* ---------- inline figures ---------- */
{
  await input('#theta', 30); await page.click('#evoChips [data-evo="S"]'); await rail(T_ONE); await settle(page);
  const g = await page.evaluate(() => {
    const born = document.getElementById('bornSvg'), dial = document.getElementById('dialSvg');
    const dot = (sv, cls) => { const d = sv.querySelector(`circle.${cls}:not([style*="none"])`); return d ? [Number(d.getAttribute('cx')), Number(d.getAttribute('cy'))] : null; };
    const base = born.querySelector('path.ax').getAttribute('d').trim().split(/\s+/).slice(-1)[0];
    const ring = dial.querySelector('circle.cy');
    return { cy: dot(born, 'dot-cy'), am: dot(born, 'dot-am'), mg: dot(born, 'dot-mg'), base: Number(base), curves: ['cy', 'am', 'mg'].map((k) => born.querySelectorAll(`path.${k}`).length),
      z: [...dial.querySelectorAll('circle.dot-am')].map((x) => [Number(x.getAttribute('cx')), Number(x.getAttribute('cy'))])[0], O: Number(ring.getAttribute('cx')), R: Number(ring.getAttribute('r')),
      arc: dial.querySelector('path.cy[style]').getAttribute('d').length };
  });
  const th = 30 * D;
  check('Born figure: cos θ, cos²θ and sin²θ curves are drawn', g.curves.every((n) => n >= 1));
  check('Born figure: the three dots stand at θ with heights in ratio cos θ : cos²θ : sin²θ', g.cy && g.am && g.mg && near(g.cy[0], g.am[0], 0.01) && near(g.cy[0], g.mg[0], 0.01)
    && near((g.base - g.am[1]) / (g.base - g.cy[1]), Math.cos(th), 0.01) && near((g.base - g.mg[1]) / (g.base - g.cy[1]), Math.sin(th) ** 2 / Math.cos(th), 0.01), JSON.stringify(g));
  check('dial: the amber point is e^{−iωt} at t = 1 (angle −1 rad on the unit circle) and the cyan arc is drawn', near(Math.atan2(-(g.z[1] - g.O), g.z[0] - g.O), -1, 0.01)
    && near(Math.hypot(g.z[0] - g.O, g.z[1] - g.O), g.R, 0.02) && g.arc > 20, JSON.stringify(g));
}

/* ---------- drawer, play and pause ---------- */
await page.click('#infoBtn'); await settle(page);
check('info button opens the theory drawer', await page.locator('#drawer [role="dialog"]').isVisible());
check('drawer: numerical sandbox, not a proof, in both languages, with θ* and the decay numbers', await page.evaluate(() => {
  const d = document.getElementById('drawer').textContent;
  return /不是证明/.test(d) && /not a proof/.test(d) && d.includes('0.739085133215161') && d.includes('0.135335') && d.includes('0.018316') && d.includes('1.639376') && d.includes('4.232429');
}));
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').isHidden());
check('play advances the rail clock', await playsAfter(page, () => page.click('#play'), () => window.ROUNDTRIP_BORN_DEBUG.state));
await pause();
{ const p0 = await state(); await settle(page, 40); check('pause holds the clock', !p0.playing && same((await state()).alphaDeg, p0.alphaDeg)); }

/* ---------- deep links, cited figures and the ?theme= query ---------- */
for (const card of Object.keys(CARDS)) {
  const p = await T.open(BOOK, ID, `?lang=en&preset=${card}`, { locale: 'en-US' });
  await settle(p); const s = await state(p);
  check(`deep link ?preset=${card}: opens on the card at its still frame, paused`, s.preset === card && near(s.alphaDeg, CARDS[card].still, 1e-9) && !s.playing && near(s.thetaDeg, CARDS[card].theta, 1e-12));
  await p.context().close();
  for (const w of [740, 334]) {
    const fig = await T.open(BOOK, ID, `?embed=1&lang=zh&preset=${card}`, { viewport: { width: w, height: 500 } });
    await settle(fig); await fig.evaluate(() => TRV.kit.pause()); await settle(fig);
    const fs2 = await state(fig), info = await fig.evaluate(() => ({ figure: document.documentElement.dataset.figure === '1', header: getComputedStyle(document.querySelector('header.top')).display,
      tourClock: getComputedStyle(document.getElementById('playBtn')).display, railPlay: getComputedStyle(document.getElementById('play')).display, note: document.querySelector('.tour .tour-note')?.innerHTML || '' }));
    check(`cited ${card} (${w}px): figure frame on the card, chrome hidden, one-sentence note without scripts`, fs2.preset === card && info.figure && info.header === 'none' && !/<su[bp]>/.test(info.note) && info.note.length > 8);
    check(`cited ${card} (${w}px): the clock buttons sit ${w > 480 ? 'in the tour bar' : 'on the rail'}`, w > 480 ? info.tourClock !== 'none' && info.railPlay === 'none' : info.tourClock === 'none' && info.railPlay !== 'none', JSON.stringify(info));
    checkMath(fs2, `cited ${card} (${w}px)`);
    await fig.context().close();
  }
}
for (const theme of ['dark', 'light']) {
  requestedColorScheme = theme;
  const p = await T.open(BOOK, ID, `?lang=en&theme=${theme}`, { locale: 'en-US' });
  await p.emulateMedia({ colorScheme: theme }); await settle(p);
  const s = await state(p);
  check(`?theme=${theme}: the page opens on the shared tokens with no palette override`, s.preset === 'radar-roundtrip-born' && await p.evaluate(() => document.documentElement.dataset.trPalette === undefined
    && getComputedStyle(document.documentElement).getPropertyValue('--tr-cyan').trim().length > 0));
  await p.context().close();
}

/* ---------- dark/light × zh/en × desktop/phone/embed ---------- */
for (const scheme of ['dark', 'light']) for (const lang of ['zh', 'en']) for (const [width, height, embed] of [[1440, 900, false], [390, 844, false], [740, 620, true]]) {
  requestedColorScheme = scheme;
  const p = await T.open(BOOK, ID, `?lang=${lang}${embed ? '&embed=1' : ''}`, { viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US', reducedMotion: 'reduce' });
  await p.emulateMedia({ colorScheme: scheme }); await settle(p);
  const tag = `${scheme}/${lang}/${width}x${height}/${embed ? 'embed' : width < 500 ? 'phone' : 'desktop'}`;
  check(`${tag}: requested colour scheme and absent palette`, await p.evaluate((x) => matchMedia(`(prefers-color-scheme: ${x})`).matches && document.documentElement.dataset.trPalette === undefined, scheme));
  await checkLinks(p, tag);
  if (width >= 1081) check(`${tag}: deck | center | side in three columns`, await p.evaluate(() => {
    const app = document.querySelector('.app.lab'), q = (sel) => app.querySelector(sel).getBoundingClientRect();
    const d = q(':scope > .deck'), m = q(':scope > .center'), s = q(':scope > .side');
    return d.right <= m.left + 1 && m.right <= s.left + 1 && ['#readouts', '#evidence'].every((x) => app.querySelector(`.side ${x}`).getBoundingClientRect().height > 0);
  }));
  if (!PHASE1 || width === 1440) for (const card of Object.keys(CARDS)) {
    await pick(card, p); const s = await state(p);
    check(`${tag}/${card}: real card selection`, s.preset === card && !s.playing);
    checkMath(s, `${tag}/${card}`);
    const view = await stageView(p, '#stage', false), overlaps = await labelOverlaps(p, '.stage .tag', 0);
    check(`${tag}/${card}: stage layout, HUD, labels and overflow`, view.layout.length === 0 && view.hud.length === 0 && overlaps.length === 0 && await overflowX(p) <= 0,
      [...view.layout, ...view.hud, ...overlaps.map((o) => o.join(' ~ '))].join(' | '));
    if (lang === 'en') check(`${tag}/${card}: no visible Chinese`, (await cjkLeftovers(p)).length === 0);
  }
  check(`${tag}: palette still absent after interactions`, await p.evaluate(() => document.documentElement.dataset.trPalette === undefined));
  await p.context().close();
}

/* ---------- stills for PDF/EPUB ---------- */
if (!PHASE1) for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) {
  const p = await openStill(T, BOOK, ID, card, lang), s = await state(p);
  check(`still ${lang}/${card}: declared frame, paused`, s.preset === card && !s.playing && near(s.alphaDeg, CARDS[card].still, 1e-8)
    && await p.evaluate(() => TRV.still && TRV.shot && document.documentElement.dataset.trPalette === undefined && document.getElementById('stateHandle').hidden));
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
