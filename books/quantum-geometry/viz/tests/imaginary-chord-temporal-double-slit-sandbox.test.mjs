// IMAG//TUNNEL browser regression: the shared stage-first gate, then every control, card, vantage, still and frame, and
// every number the page claims, checked against algorithms written here (an RK4 Schrödinger integration for the
// barrier, a density-matrix Zeno chain, the spectrum and the projector algebra recomputed from scratch).
// Run directly with node; VIZ_SLOW_FRAMES=1000 exercises every transition and playback with sparse animation frames.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, capitalGreek, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'imaginary-chord-temporal-double-slit-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const CARDS = {
  'classical-real-wall': { scene: 'barrier', lens: 'real', ratio: 0.5, L: 0.6, dt: 1000, probe: 0, dgB: 0, vantage: 'side', still: 3 },
  'ninety-deg-imaginary-chord': { scene: 'barrier', lens: 'complex', ratio: 0.5, L: 0.6, dt: 1000, probe: 0, dgB: 0, vantage: 'oblique', still: 0 },
  'temporal-double-slit-comb': { scene: 'slits', lens: 'complex', ratio: 0.5, L: 0.4, dt: 1000, probe: 0, dgB: 0, vantage: 'oblique', still: 6.5, cursor: 'bright' },
  'attosecond-tunnel-self-interference': { scene: 'slits', lens: 'complex', ratio: 0.5, L: 0.4, dt: 2500, probe: 0, dgB: 0, vantage: 'oblique', still: 6.5, cursor: 'dark' },
  'zeno-midway-probe-collapse': { scene: 'slits', lens: 'complex', ratio: 0.5, L: 0.4, dt: 1000, probe: 1, dgB: 0, vantage: 'oblique', still: 6.5, cursor: 'bright' }
};
const GIDS = [
  'D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities',
  'D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary',
  'D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square',
  'D5/S3/Quantum/Tomography/DiagonalPhaseBlindness.diagonal_prime_observables_cannot_recover_relative_phase',
  'D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass',
  'D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitored_return_conservation'
];
const THEORY = ['zh', 'en'].map((lang) => `../../${lang}/ch34-s27-imaginary-chord-tunneling-and-temporal-double-slit.html#sec-ch34-imaginary-chord-tunneling-and-temporal-double-slit`);
const VIEWS = { side: [0, 0], top: [0, Math.PI / 2 - 0.001], oblique: [0.62, 0.36] };
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const rel = (a, b, tol = 1e-8) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));

/* ---------- independent physics (SI units, written here, never calling the page) ---------- */
const ME = 9.1093837015e-31, HBAR = 1.054571817e-34, QE = 1.602176634e-19;
const H_SI = 2 * Math.PI * HBAR / QE * 1e15;                 // h in eV·fs from ℏ and e
const H_EVFS = 4.135667696, HBAR_EVFS = H_EVFS / (2 * Math.PI);   // the stated h = 4.135667696 eV·fs
const waveNumber = (eV) => Math.sqrt(2 * ME * eV * QE) / HBAR * 1e-9;           // nm⁻¹
/** RK4 for ψ'' = (2m/ℏ²)(V − E) ψ inside [0, L], integrated from x = L (ψ = 1, ψ' = ik) back to 0 in n steps.
    Returns the transmission |t|² = 1/|A|² with A the incident amplitude, and ψ on the grid, scaled to the
    physical normalization (incident amplitude 1). */
function rk4Barrier(ratio, L, n = 6400) {
  const E = ratio, k = waveNumber(E), c = (2 * ME * QE / (HBAR * HBAR)) * 1e-18 * (1 - E);
  const f = (y) => [y[2], y[3], c * y[0], c * y[1]];        // y = [Re ψ, Im ψ, Re ψ', Im ψ']
  let y = [1, 0, 0, k];
  const h = -L / n, grid = [[...y]];
  for (let i = 0; i < n; i++) {
    const k1 = f(y), k2 = f(y.map((v, j) => v + h / 2 * k1[j])), k3 = f(y.map((v, j) => v + h / 2 * k2[j])), k4 = f(y.map((v, j) => v + h * k3[j]));
    y = y.map((v, j) => v + h / 6 * (k1[j] + 2 * k2[j] + 2 * k3[j] + k4[j]));
    grid.push([...y]);
  }
  // at x = 0: ψ = A + B, ψ' = ik(A − B), so A = (ψ + ψ'/(ik))/2 and ψ'/(ik) = (Im ψ' − i Re ψ')/k
  const A = [(y[0] + y[3] / k) / 2, (y[1] - y[2] / k) / 2], A2 = A[0] * A[0] + A[1] * A[1];
  const inv = [A[0] / A2, -A[1] / A2];                     // 1/A = t e^{ikL}
  const psiAt = (x) => { const g = grid[Math.round((L - x) / L * n)]; return [g[0] * inv[0] - g[1] * inv[1], g[0] * inv[1] + g[1] * inv[0]]; };
  return { T: 1 / A2, k, psiAt };
}
/** Rectangular-barrier transmission from the textbook formulas, written out in SI. */
function textbookT(ratio, L) {
  const E = ratio * QE, V = QE, Lm = L * 1e-9;
  if (Math.abs(ratio - 1) < 1e-12) return 1 / (1 + ME * V * Lm * Lm / (2 * HBAR * HBAR));
  if (ratio < 1) { const kap = Math.sqrt(2 * ME * (V - E)) / HBAR; return 1 / (1 + V * V / (4 * E * (V - E)) * Math.sinh(kap * Lm) ** 2); }
  const q = Math.sqrt(2 * ME * (E - V)) / HBAR; return 1 / (1 + V * V / (4 * E * (E - V)) * Math.sin(q * Lm) ** 2);
}
/** The Zeno chain as a density matrix: n + 1 coherent pieces of a turn Θ (sin²Θ = T), a projective L/R check between pieces. */
function zenoDensity(T, probe) {
  const n = Math.round(12 * probe), m = n + 1, th = Math.asin(Math.sqrt(T)) / m;
  let p = [1, 0];                                            // populations after dephasing are enough between checks
  for (let j = 0; j < m; j++) { const c2 = Math.cos(th) ** 2, s2 = Math.sin(th) ** 2; p = [c2 * p[0] + s2 * p[1], s2 * p[0] + c2 * p[1]]; }
  return { n, m, Tmon: p[1], th };
}
/** ‖(QU)^n v‖² and |⟨v, U h_{n−1}⟩|² for v = |L⟩, U = e^{−iθσx}, by explicit 2 × 2 complex matrices. */
function ledger(th, m) {
  const U = [[[Math.cos(th), 0], [0, -Math.sin(th)]], [[0, -Math.sin(th)], [Math.cos(th), 0]]];
  const mul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const apply = (M, v) => [0, 1].map((i) => { const a = mul(M[i][0], v[0]), b = mul(M[i][1], v[1]); return [a[0] + b[0], a[1] + b[1]]; });
  let h = [[1, 0], [0, 0]];
  const s = [1], p = [0];
  for (let j = 1; j <= m; j++) { const w = apply(U, h); p.push(w[0][0] ** 2 + w[0][1] ** 2); h = [[0, 0], w[1]]; s.push(w[1][0] ** 2 + w[1][1] ** 2); }
  return { s, p };
}
/** P(E) for both gates fully open, from the formula. */
function spectrum(E, w, V, dtFs, dgB) {
  const G2 = Math.exp(-2 * 0.12 ** 2 * (E - 10) ** 2 / HBAR_EVFS ** 2), a = Math.sqrt(w * G2);
  return { P: 2 * a * a + 2 * V * a * a * Math.cos(E * dtFs / HBAR_EVFS + dgB), inc: 2 * a * a };
}
/** The three regimes of the barrier, split at |E − V₀| ≤ 1e−6 eV, and the transmission the rail must print for each. */
const EDGE = 1e-6;
const regimeOf = (ratio) => (Math.abs(ratio - 1) <= EDGE ? 'edge' : ratio < 1 ? 'tunnel' : 'over');
const FORMULA = {
  tunnel: 'T = [1 + V₀² sinh²(κL)/(4E(V₀ − E))]⁻¹ · p = îℏκ',
  edge: 'T = [1 + m V₀ L²/(2ℏ²)]⁻¹ · κ = 0',
  over: 'T = [1 + V₀² sin²(qL)/(4E(E − V₀))]⁻¹ · q = √(2m(E − V₀))/ℏ'
};
/** T(V₀) = [1 + m V₀ L²/(2ℏ²)]⁻¹ in SI (the limit κ → 0 of the sub-barrier formula, no 0/0). */
const thresholdT = (L) => 1 / (1 + ME * QE * (L * 1e-9) ** 2 / (2 * HBAR * HBAR));
/** The phase turn of ψ across the wall, unwrapped over 64 steps of the RK4 solution (radians). */
function rk4Turn(rk, L) {
  let turn = 0, prev = null;
  for (let j = 0; j <= 64; j++) {
    const q = rk.psiAt(L * j / 64), a = Math.atan2(q[1], q[0]);
    if (prev != null) { const d = a - prev; turn += Math.atan2(Math.sin(d), Math.cos(d)); }
    prev = a;
  }
  return Math.abs(turn);
}
/** |ψ| on the RK4 grid inside the wall rises somewhere and falls somewhere (a standing wave, not a decay). */
function rk4Oscillates(rk, L) {
  const a = Array.from({ length: 401 }, (_, j) => Math.hypot(...rk.psiAt(L * j / 400)));
  const d = a.slice(1).map((v, j) => v - a[j]);
  return d.some((v) => v > 1e-9) && d.some((v) => v < -1e-9);
}
/** The turning points of |ψ| on the RK4 grid inside the wall: sign changes of the sampled slope (0 = monotone). */
function rk4Extrema(rk, L) {
  const a = Array.from({ length: 1601 }, (_, j) => Math.hypot(...rk.psiAt(L * j / 1600)));
  const sg = a.slice(1).map((v, j) => v - a[j]).filter((v) => Math.abs(v) > 1e-9).map(Math.sign);
  return sg.slice(1).filter((v, j) => v !== sg[j]).length;
}
/** |ψ(x)|/|ψ(L)| of the RK4 solution (the amplitude relative to |t| at the exit). */
const rk4Rel = (rk, L, x) => Math.hypot(...rk.psiAt(x)) / Math.hypot(...rk.psiAt(L));
/** The RK4 chord written as C₊e^{−κx} + C₋e^{+κx} from its two ends; returns |C₋/C₊| and the worst misfit inside. */
function rk4Evanescent(rk, L, kap) {
  const p0 = rk.psiAt(0), pL = rk.psiAt(L), em = Math.exp(-kap * L), ep = Math.exp(kap * L);
  const cm = [(pL[0] - p0[0] * em) / (ep - em), (pL[1] - p0[1] * em) / (ep - em)], cp = [p0[0] - cm[0], p0[1] - cm[1]];
  let misfit = 0;
  for (let j = 0; j <= 64; j++) {
    const x = L * j / 64, q = rk.psiAt(x), a = Math.exp(-kap * x), b = Math.exp(kap * x);
    misfit = Math.max(misfit, Math.hypot(cp[0] * a + cm[0] * b - q[0], cp[1] * a + cm[1] * b - q[1]) / Math.hypot(q[0], q[1]));
  }
  return { ratio: Math.hypot(...cm) / Math.hypot(...cp), misfit };
}
/** Visible label text on the stage (the hidden sizing probe and labels of earlier frames excluded). */
const stageTags = (p) => p.$$eval('#stage .tags > .tag', (els) => els.filter((t) => !t.hidden && getComputedStyle(t).display !== 'none' && t.getClientRects().length).map((t) => t.textContent.trim()));

const T = await session();
const { page, check } = T;
check('constants: h = 4.135667696 eV·fs agrees with 2πℏ/e', Math.abs(H_EVFS - H_SI) / H_SI < 1e-9, `${H_SI}`);

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
  await context.exposeBinding('__imagPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__imagPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__imagPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined,
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
  [115, 111, 110, 110, 101, 116], [104, 97, 105, 107, 117], [108, 108, 109],
].map((codes) => String.fromCharCode(...codes));
const identifiers = new RegExp(`\\b(?:${forbidden.join('|')}|${numbered}-?\\d)\\b`, 'i');
for (const [file, src] of Object.entries(sources)) {
  check(`source ${file}: no literal colour and no palette switch`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(src) && !/\btrPalette\b|data-tr-palette/.test(src));
  check(`source ${file}: no model, vendor or tool identifiers`, !identifiers.test(src));
}
check('source: no grid-template-columns in the page stylesheet (the lab keeps its shared three columns)', !/grid-template-columns\s*:/i.test(sources['style.css']));
check('source: kit.solid without wheel zoom, kit.clock looping', /wheel:\s*false/.test(sources['main.js']) && /loop:\s*true/.test(sources['main.js']));
check('source: the five cards in their public order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1]), Object.keys(CARDS)));
check('source: the page loads only the shared runtime and its own files', same([...sources['index.html'].matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]), ['../assets/shell.js', '../assets/kit.js', 'main.js']));
check('source: .okmark only inside .lean boxes (none on this page)', !/okmark/.test(sources['index.html'] + sources['main.js']));
check('suite: no fixed waits', !new RegExp('wait' + 'ForTimeout').test(suite));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID);
check('registry: live §30.2 entry with five bilingual cards and the six theorems', !!entry && entry.status === 'live' && entry.chapter === 30 && entry.section === '30.2'
  && entry.code === 'IMAG//TUNNEL' && same(entry.presets, Object.keys(CARDS)) && entry.presets.every((c) => entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same(entry.lean.map((x) => x.gid).sort(), [...GIDS].sort()) && entry.tags.length === entry.tags_en.length);

/* ---------- helpers on the page ---------- */
const state = (p = page) => p.evaluate(() => window.IMAG_TUNNEL_DEBUG.state);
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
  await until(p, (q) => { const s = window.IMAG_TUNNEL_DEBUG.state; return s.preset === q.id && Math.abs(s.energyRatio - q.ratio) < 1e-9 && Math.abs(s.barrierWidthNm - q.L) < 1e-9 && Math.abs(s.gateDelayAs - q.dt) < 1e-9 && Math.abs(s.probeStrength - q.probe) < 1e-9; }, { id: card, ...CARDS[card] });
  await pause(p);
}
async function seek(t, p = page) {
  await p.locator('#now').evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, t);
  await settle(p);
}

/** Every number of a state against the algorithms of this file. */
function checkMath(s, tag) {
  const E = s.energyRatio, Lw = s.barrierWidthNm, rk = rk4Barrier(E, Lw), Tt = textbookT(E, Lw);
  check(`${tag}: k from m_e, ℏ and E`, rel(s.k, waveNumber(E), 1e-10), `${s.k} vs ${waveNumber(E)}`);
  if (s.regime === 'tunnel') check(`${tag}: κ = √(2m(V₀ − E))/ℏ and κL dimensionless`, rel(s.kappa, waveNumber(1 - E), 1e-10) && rel(s.innerProduct, waveNumber(1 - E) * Lw, 1e-10));
  if (s.regime === 'over') check(`${tag}: q = √(2m(E − V₀))/ℏ above the barrier`, rel(s.q, waveNumber(E - 1), 1e-10));
  check(`${tag}: regime matches E against V₀ (|E − V₀| ≤ 1e−6 eV is the threshold)`, s.regime === regimeOf(E), s.regime);
  check(`${tag}: T(E) equals the textbook formula in SI`, rel(s.transmission, Tt, 1e-9), `${s.transmission} vs ${Tt}`);
  check(`${tag}: T(E) equals an RK4 integration of the Schrödinger equation`, rel(s.transmission, rk.T, 1e-7), `${s.transmission} vs ${rk.T}`);
  check(`${tag}: |t|² = T and |r|² + |t|² = 1`, rel(s.tAbs2, s.transmission, 1e-10) && near(s.rAbs2 + s.tAbs2, 1, 1e-10));
  const chordOk = s.chord.every(({ x, psi }) => { const q = rk.psiAt(x); return Math.hypot(q[0] - psi[0], q[1] - psi[1]) < 2e-6 * Math.max(1, Math.hypot(q[0], q[1])); });
  check(`${tag}: the chord inside the wall is the solution of the Schrödinger equation`, chordOk);
  const mid = rk.psiAt(Lw / 2), gamma0 = Math.PI / 2 - Math.atan2(mid[1], mid[0]);
  check(`${tag}: at t = 0 the chord midpoint lies in i`, near(Math.cos(s.gamma0 - gamma0), 1, 1e-10));
  if (s.regime === 'tunnel') {
    const turn = Math.atan(s.k / s.kappa * Math.tanh(s.kappa * Lw));
    check(`${tag}: the chord phase turns by arctan((k/κ) tanh κL) < 90°`, near(s.chordTurnRad, turn, 1e-9) && s.chordTurnRad < Math.PI / 2);
    check(`${tag}: p²/2m = (îℏκ)²/2m = E − V₀ < 0`, near(s.kineticEv, E - 1, 1e-12) && s.kineticEv < 0);
  }
  // the chord split on I and i at the page time (65 samples of ψ e^{i(γ₀ − ωt)})
  const omega = E / HBAR_EVFS, ph = gamma0 - omega * s.t;
  let sI = 0, si = 0;
  for (let j = 0; j <= 64; j++) { const q = rk.psiAt(Lw * j / 64), c = Math.cos(ph), sn = Math.sin(ph), re = q[0] * c - q[1] * sn, im = q[0] * sn + q[1] * c; sI += re * re; si += im * im; }
  check(`${tag}: chord split on I and i (P + P⊥ = 1)`, near(s.shareI, sI / (sI + si), 1e-6) && near(s.shareI + s.shareImag, 1, 1e-12), `${s.shareI} vs ${sI / (sI + si)}`);
  // Zeno chain and the monitored-return ledger
  const z = zenoDensity(s.transmission, s.lens === 'real' ? 0 : s.probeStrength), lg = ledger(z.th, z.m);
  check(`${tag}: monitored transmission equals a density-matrix Zeno chain`, s.zeno.checks === z.n && near(s.zeno.Tmon, z.Tmon, 1e-12), `${s.zeno.Tmon} vs ${z.Tmon}`);
  check(`${tag}: ledger s₀ = 1, p_{n+1} = s_n − s_{n+1}, Σp + s_N = 1`, s.zeno.survival[0] === 1 && lg.s.every((v, j) => near(s.zeno.survival[j], v, 1e-12)) && lg.p.every((v, j) => near(s.zeno.returns[j], v, 1e-12))
    && lg.p.slice(1).every((v, j) => near(v, lg.s[j] - lg.s[j + 1], 1e-12)) && near(lg.p.reduce((a, b) => a + b, 0) + lg.s[z.m], 1, 1e-12));
  // coherence, pinching, spectrum
  const V = s.lens === 'real' ? 0 : 1 - s.probeStrength, w = s.lens === 'real' ? (E < 1 - 1e-12 ? 0 : 1) : z.Tmon;
  check(`${tag}: coherence V = 1 − p and weight w`, near(s.coherence, V, 1e-12) && near(s.weight, w, 1e-12));
  const I = s.leanInstances, hs = 2 * (V / 2) ** 2;
  check(`${tag}: pinching discards ‖ρ − P(ρ)‖² = |ρ₀₁|² + |ρ₁₀|² = V²/2`, near(I.pinch.hs, hs, 1e-12) && near(I.pinch.offDiagonal, hs, 1e-12) && I.pinch.residual < 1e-14 && I.pinch.fullMass === 0.5);
  const dtFs = s.gateDelayAs / 1000, dg = s.branchPhaseDeg * Math.PI / 180;
  check(`${tag}: ΔE = h/Δt`, rel(s.deltaE, H_EVFS / dtFs, 1e-9), `${s.deltaE}`);
  check(`${tag}: spectrum P(E) and its envelope match the formula`, s.spectrum.every(({ E: e, P, inc }) => { const r = spectrum(e, w, V, dtFs, dg); return near(P, r.P, 1e-12) && near(inc, r.inc, 1e-12); }));
  const darks = []; for (let n = -4; n < 400; n++) { const e = ((2 * n + 1) * Math.PI - dg) * HBAR_EVFS / dtFs; if (e > 20 + 1e-12) break; if (e >= -1e-12) darks.push(e); }
  check(`${tag}: dark nodes at (2n + 1)π, ΔE apart`, darks.length === s.darkNodes.length && darks.every((e, j) => near(e, s.darkNodes[j], 1e-9))
    && s.darkNodes.slice(1).every((e, j) => near(e - s.darkNodes[j], H_EVFS / dtFs, 1e-8)));
  if (V === 1 && w > 0) check(`${tag}: the two branches cancel 100% at every dark node`, s.darkNodes.every((e) => spectrum(e, w, 1, dtFs, dg).P <= 1e-12 * spectrum(e, w, 1, dtFs, dg).inc + 1e-300));
  // the projector and complex-structure instances
  check(`${tag}: P + P⊥ = 1, P² = P, P⊥² = P⊥, PP⊥ = P⊥P = 0`, I.orth.residual === 0 && I.orth.splitResidual < 1e-12);
  check(`${tag}: î is skew-adjoint and unitary with î² = −1`, I.skew.skewAdjoint === 0 && I.skew.unitary === 0 && I.skew.square === 0);
  check(`${tag}: J = 2ABᴴ of balanced A, B squares to −1`, I.rel.cross < 1e-14 && I.rel.normA < 1e-14 && I.rel.normB < 1e-14 && I.rel.square < 1e-14 && I.rel.unitaryU < 1e-14);
  check(`${tag}: diagonal readouts see no relative phase, X sees ±1`, I.diag.statesDiffer === 1 && I.diag.diagonalGap === 0 && near(I.diag.xPlus, 1, 1e-15) && near(I.diag.xMinus, -1, 1e-15)
    && near(I.diag.cursorWhichTime[0], 0.5, 1e-15) && near(I.diag.cursorWhichTime[1], 0.5, 1e-15) && near(I.diag.cursorX, V * Math.cos(s.cursor.phase), 1e-12));
}

/** The rail formula, the note under the readouts and the legend follow the regime of the solver. */
async function regimeText(p, s, tag) {
  const E = s.energyRatio, Lw = s.barrierWidthNm, regime = regimeOf(E), deg = 180 / Math.PI;
  const formula = (await p.textContent('#formula')).trim(), note = (await p.textContent('#roNote')).trim(), legend = (await p.textContent('#legend')).trim();
  const num = (re) => { const m = note.match(re); return m ? Number(m[1]) : NaN; };
  const turnInNote = num(/(?:只转|相位转|墙里转|by only|turns by) ([\d.]+)°/), rk = rk4Barrier(E, Lw), turnRk = rk4Turn(rk, Lw) * deg, k = waveNumber(E);
  check(`${tag}: the rail prints the ${regime} transmission, no 0/0`, s.regime === regime && formula === FORMULA[regime] && Number.isFinite(s.transmission)
    && !/NaN|Infinity|undefined/.test(formula + note), `${s.regime} · ${formula}`);
  if (regime === 'tunnel') {
    const kap = waveNumber(1 - E), want = Math.atan(k / kap * Math.tanh(kap * Lw)) * deg;
    check(`${tag}: E < V₀ note: decaying chord in i, phase turn arctan((k/κ) tanh κL) < 90°`, note.startsWith('E < V₀') && note.includes('e−κx') && note.includes('< 90°')
      && !/qL|sin²/.test(note) && Math.abs(turnInNote - want) <= 0.05 + 1e-9 && Math.abs(turnRk - want) < 1e-4 && want < 90 && legend.includes('±90°'), note);
    // the finite wall holds both e^{∓κx}: fit them to the RK4 chord; e^{−κx} dominates once κL ≥ ½ (e^{−2κL} ≤ 1/e)
    const ev = rk4Evanescent(rk, Lw, kap), grow = num(/(?:墙口只有|墙口已是|only|already) ([\d.]+)/), dominant = kap * Lw >= 0.5;
    const saysDominant = /以 e−κx 为主|dominated by e−κx/.test(note), saysComparable = /量级相当|comparable/.test(note);
    check(`${tag}: E < V₀ note: the finite-wall chord is C₊e^(−κx) + C₋e^(+κx) with |C₋/C₊| = e^(−2κL) (RK4), ${dominant ? 'dominated by e^(−κx)' : 'comparable terms for κL < ½'}`,
      note.includes('C₊e−κx + C₋e+κx') && note.includes('e−2κ(L − x)') && (dominant ? saysDominant && !saysComparable : saysComparable && !saysDominant)
      && Math.abs(grow - Math.exp(-2 * kap * Lw)) <= 5e-5 + 1e-12 && rel(ev.ratio, Math.exp(-2 * kap * Lw), 1e-5) && ev.misfit < 1e-5 && ev.ratio < 1
      && s.amplitude.decayDominant === dominant && s.stageFrame.dials === true, `${note} · RK4 |C₋/C₊| = ${ev.ratio}, misfit ${ev.misfit}`);
  } else if (regime === 'edge') {
    const want = Math.atan(k * Lw) * deg;
    check(`${tag}: E = V₀ note: κ = q = 0, linear bridge 1 − ik(L − x), phase turn arctan(kL), T = [1 + m V₀ L²/(2ℏ²)]⁻¹`, note.startsWith('E = V₀') && note.includes('κ = q = 0') && note.includes('1 − ik(L − x)')
      && note.includes('[1 + m V₀ L²/(2ℏ²)]⁻¹') && !note.includes('90°') && Math.abs(turnInNote - want) <= 0.05 + 1e-9 && Math.abs(turnRk - want) < 1e-3 && rel(s.transmission, thresholdT(Lw), 1e-12)
      && rk4Extrema(rk, Lw) === 0, note);
    check(`${tag}: E = V₀ legend: the κ = q = 0 linear bridge, no ±90° turn, no "lying in i"`, !legend.includes('90°') && legend.includes('1 − ik(L − x)') && legend.includes('κ = q = 0')
      && !/躺在 i 里|lying in i/.test(legend) && s.stageFrame.dials === false, legend);
  } else {
    const qLdeg = waveNumber(E - 1) * Lw * deg;
    check(`${tag}: E > V₀ note: real q, qL and the phase turn of ψ, T = 1 at qL = nπ`, note.startsWith('E > V₀') && note.includes('qL = nπ') && !note.includes('< 90°')
      && Math.abs(num(/qL = ([\d.]+)°/) - qLdeg) <= 0.05 + 1e-9 && Math.abs(turnInNote - turnRk) <= 0.05 + 1e-6 && !legend.includes('±90°') && s.stageFrame.dials === false, note);
    // |ψ| across the wall, from the sampled RK4 profile: monotone for qL ≤ 90°, a standing wave with turning points beyond
    const ext = rk4Extrema(rk, Lw), claimsRiseFall = /随驻波起伏|rises and falls/.test(note), claimsMonotone = /单调降到|falls monotonically/.test(note);
    if (ext === 0) {
      check(`${tag}: E > V₀ with qL = ${qLdeg.toFixed(1)}° ≤ 90°: the RK4 |ψ| falls monotonically and the note says so (no rise-and-fall claim), with |ψ(0)| = ${rk4Rel(rk, Lw, 0).toFixed(2)}|t|`,
        qLdeg <= 90 + 1e-9 && !rk4Oscillates(rk, Lw) && claimsMonotone && !claimsRiseFall && note.includes(`${rk4Rel(rk, Lw, 0).toFixed(2)}|t|`)
        && s.amplitude.monotone === true && s.amplitude.extrema === 0 && rel(s.amplitude.entranceOverExit, rk4Rel(rk, Lw, 0), 1e-6), note);
    } else {
      const n = num(/(?:墙内 |\()(\d+) (?:个极值|extrem)/);
      check(`${tag}: E > V₀ with qL = ${qLdeg.toFixed(1)}° > 90°: the RK4 |ψ| has ${ext} turning point(s) and the note reports the standing wave (no monotone claim)`,
        qLdeg > 90 && rk4Oscillates(rk, Lw) && claimsRiseFall && !claimsMonotone && !/单调|monoton/.test(note) && n === ext
        && s.amplitude.monotone === false && s.amplitude.extrema === ext, `${note} · RK4 ${ext}`);
    }
  }
}

async function checkLinks(p, tag) {
  check(`${tag}: exactly the six green Lean links, in #evidence`, same(await p.$$eval('[data-lean-gid]', (els) => els.map((e) => e.dataset.leanGid).sort()), [...GIDS].sort())
    && await p.$$eval('[data-lean-gid]', (els) => els.every((e) => e.closest('.col.side #evidence .lean') && e.closest('.lean').querySelector('.ok').textContent.trim() === 'LEAN ✓')));
  check(`${tag}: one ARGUED, one MODEL and one NUM box`, await p.evaluate(() => ['argued', 'model', 'num'].every((c) => document.querySelectorAll(`#evidence .lean.${c}`).length === 1)));
  check(`${tag}: bilingual theory link to §30.2`, same(await p.$$eval('#drawer a[href^="../../"]', (els) => els.map((e) => e.getAttribute('href')).sort()), [...THEORY].sort()));
}

/* ---------- runtime contract ---------- */
await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
await checkLinks(page, 'runtime');
check('layout: the shared three-column lab, the stage and the strip in the middle', await page.evaluate(() => {
  const app = document.querySelector('.app.lab'), deck = app.querySelector(':scope > .deck'), center = app.querySelector(':scope > .center'), side = app.querySelector(':scope > .side');
  const d = deck.getBoundingClientRect(), c = center.getBoundingClientRect(), s = side.getBoundingClientRect();
  return getComputedStyle(app).gridTemplateColumns.trim().split(/\s+/).length === 3 && d.right <= c.left + 1 && c.right <= s.left + 1
    && !!center.querySelector(':scope > #stage') && !!center.querySelector(':scope > .tour') && !!center.querySelector(':scope > .strip #plot')
    && !document.querySelector('#stage #plot') && !!side.querySelector(':scope > #readouts') && !!side.querySelector(':scope > #evidence')
    && !!document.querySelector('#stage > canvas#cv') && document.querySelector('#stage > button.handle[type="button"]') !== null;
}));
check('layout: #rail is the left deck; #infoBtn opens #evidence, above every evidence box', await page.evaluate(() => {
  const deck = document.querySelector('.app.lab > aside.col.deck'), ev = document.querySelector('.app.lab > .side > #evidence'), btn = document.querySelector('#infoBtn');
  const boxes = [...ev.querySelectorAll('.lean')], top = btn.getBoundingClientRect();
  return document.querySelectorAll('#rail').length === 1 && document.querySelector('#rail') === deck && document.querySelectorAll('#infoBtn').length === 1
    && ev.firstElementChild === btn && btn.matches('button.chip') && boxes.length > 0
    && boxes.every((b) => (btn.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) && top.bottom <= b.getBoundingClientRect().top + 0.5);
}));
check('layout: opens on the default card at its still, paused', await page.evaluate(() => { const s = window.IMAG_TUNNEL_DEBUG.state; return s.preset === 'ninety-deg-imaginary-chord' && s.t === 0 && !s.playing; }));

/* ---------- every card, both languages ---------- */
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  for (const card of Object.keys(CARDS)) {
    await pick(card);
    await seek(CARDS[card].still);
    const s = await state(), c = CARDS[card];
    check(`${lang}/${card}: the card sets scene, lens, vantage and controls`, s.preset === card && s.scene === c.scene && s.lens === c.lens && s.vantage === c.vantage && !s.playing
      && near(s.energyRatio, c.ratio) && near(s.barrierWidthNm, c.L) && near(s.gateDelayAs, c.dt) && near(s.probeStrength, c.probe) && near(s.branchPhaseDeg, c.dgB)
      && Number(await page.getAttribute(`[data-preset="${card}"]`, 'data-still')) === c.still
      && near(s.camera.yaw, VIEWS[c.vantage][0], 1e-9) && near(s.camera.pitch, VIEWS[c.vantage][1], 1e-9));
    if (c.cursor) {
      const dt = c.dt / 1000, list = []; for (let n = -4; n < 400; n++) { const e = (c.cursor === 'dark' ? 2 * n + 1 : 2 * n) * Math.PI * HBAR_EVFS / dt; if (e > 20) break; if (e >= 0) list.push(e); }
      const want = list.reduce((b, v) => (Math.abs(v - 10) < Math.abs(b - 10) ? v : b));
      check(`${lang}/${card}: the cursor sits on the ${c.cursor} fringe nearest 10 eV`, near(s.cursorEv, want, 1e-6), `${s.cursorEv} vs ${want}`);
    }
    checkMath(s, `${lang}/${card}`);
    const v = await stageView(page, '#stage', false), lo = await labelOverlaps(page, '.stage .tag', 0);
    check(`${lang}/${card}: desktop stage, HUD and labels clear`, v.layout.length === 0 && v.hud.length === 0 && lo.length === 0, [...v.layout, ...v.hud, ...lo.map((x) => x.join(' / '))].join(' | '));
  }
}
await page.click('[data-lang-set="zh"]'); await settle(page);

// the numbers the card notes name
await pick('ninety-deg-imaginary-chord');
{ const s = await state(); check('card 2 note: κ = 3.6226 nm⁻¹, κL = 2.17, phase turn 44.3°, √T = 0.225', s.kappa.toFixed(4) === '3.6226' && s.innerProduct.toFixed(2) === '2.17' && (s.chordTurnRad * 180 / Math.PI).toFixed(1) === '44.3' && Math.sqrt(s.transmission).toFixed(3) === '0.225'); }
await pick('attosecond-tunnel-self-interference');
{ const s = await state(); check('card 4 note: ΔE = 1.6543 eV, dark node E* = 10.75 eV', s.deltaE.toFixed(4) === '1.6543' && s.cursorEv.toFixed(2) === '10.75' && s.cursor.Pfull < 1e-12 * s.cursor.inc + 1e-300); }
await pick('zeno-midway-probe-collapse');
{ const s = await state(); check('card 5 note: T = 0.198 → T_mon = 0.0161 with 12 checks, V = 0', s.transmission.toFixed(3) === '0.198' && s.zeno.Tmon.toFixed(4) === '0.0161' && s.zeno.checks === 12 && s.coherence === 0); }
for (const [dt, dE] of [[500, '8.2713'], [1000, '4.1357'], [250, '16.5427'], [2500, '1.6543']]) {
  await input('#gateDelay', dt);
  const s = await state();
  check(`Δt slider ${dt} as: ΔE = h/Δt = ${dE} eV in the state and the HUD`, s.deltaE.toFixed(4) === dE && s.gateDelayAs === dt && s.preset === null
    && (await page.textContent('#hudBig')).includes(dE));
}

/* ---------- every control ---------- */
await pick('ninety-deg-imaginary-chord');
for (const r of [0.1, 0.5, 0.99, 1, 1.2, 1.4]) {
  await input('#energyRatio', r); const s = await state();
  check(`E/V₀ slider ${r}: state, output and regime`, near(s.energyRatio, r) && s.preset === null && (await page.textContent('output[for="energyRatio"]')).trim() === r.toFixed(2));
  checkMath(s, `E/V₀=${r}`);
  await regimeText(page, s, `E/V₀=${r}`);
}
// the threshold band |E − V₀| ≤ 1e−6 eV: one regime per side, T finite and continuous through V₀
for (const [r, want] of [[1 - 2e-6, 'tunnel'], [1 - 5e-7, 'edge'], [1, 'edge'], [1 + 5e-7, 'edge'], [1 + 2e-6, 'over']]) {
  await page.evaluate((o) => window.IMAG_TUNNEL_DEBUG.setState(o), { ratio: r, L: 0.6 }); await settle(page);
  const s = await state();
  check(`threshold E/V₀ = 1 ${r < 1 ? '−' : r > 1 ? '+' : '±'} ${Math.abs(r - 1).toExponential(0)}: regime ${want}, T finite and within 1e−4 of T(V₀)`,
    s.regime === want && Number.isFinite(s.transmission) && Math.abs(s.transmission - thresholdT(0.6)) < 1e-4 && (await page.textContent('#formula')).trim() === FORMULA[want], `${s.regime} ${s.transmission}`);
  await regimeText(page, s, `threshold ${want} ${r}`);
}
// above the barrier the field keeps winding: E/V₀ = 1.4, L = 1.2 nm, and the Fabry–Pérot resonance qL = π, in both languages
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  await page.evaluate(() => window.IMAG_TUNNEL_DEBUG.setState({ ratio: 1.4, L: 1.2, lens: 'complex', scene: 'barrier' })); await settle(page);
  let s = await state();
  const rk = rk4Barrier(1.4, 1.2);
  check(`${lang}/over E/V₀ = 1.4, L = 1.2 nm: qL ≈ 222.8°, the phase of ψ winds past 90° and |ψ| inside rises and falls`, s.regime === 'over' && near(s.innerProduct, waveNumber(0.4) * 1.2, 1e-10)
    && s.chordTurnRad > Math.PI / 2 && near(s.chordTurnRad, rk4Turn(rk, 1.2), 1e-5) && rk4Oscillates(rk, 1.2) && s.transmission < 1, `${s.chordTurnRad * 180 / Math.PI}°`);
  checkMath(s, `${lang}/over 1.4/1.2`);
  await regimeText(page, s, `${lang}/over 1.4/1.2`);
  const Lfp = Math.PI / waveNumber(0.4);
  await page.evaluate((v) => window.IMAG_TUNNEL_DEBUG.setState({ L: v }), Lfp); await settle(page);
  s = await state();
  check(`${lang}/Fabry–Pérot qL = π (L = ${Lfp.toFixed(4)} nm): T = 1 on the page, in SI and by RK4, and the note names qL = 180.0°`, s.regime === 'over' && s.transmission > 1 - 1e-12
    && textbookT(1.4, Lfp) > 1 - 1e-12 && near(rk4Barrier(1.4, Lfp).T, 1, 1e-7) && (await page.textContent('#roNote')).includes('qL = 180.0°'), `${s.transmission}`);
  checkMath(s, `${lang}/Fabry–Pérot`);
  await regimeText(page, s, `${lang}/Fabry–Pérot`);
}
// (a) the threshold E = V₀ (κ = q = 0): no ±90° turn anywhere, neither the violet dials nor a tag nor the legend
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  await page.evaluate(() => window.IMAG_TUNNEL_DEBUG.setState({ scene: 'barrier', lens: 'complex', ratio: 0.99, L: 0.6, vantage: 'oblique', t: 0 })); await settle(page);
  let s = await state(), tags = await stageTags(page), legend = (await page.textContent('#legend')).trim();
  check(`${lang}/E/V₀ = 0.99 (control): the violet dials, a 90° tag and the ±90° legend are drawn below V₀`,
    s.regime === 'tunnel' && s.stageFrame.dials === true && tags.some((x) => /90°/.test(x)) && legend.includes('±90°'), JSON.stringify(tags));
  await page.evaluate(() => window.IMAG_TUNNEL_DEBUG.setState({ ratio: 1 })); await settle(page);
  s = await state(); tags = await stageTags(page); legend = (await page.textContent('#legend')).trim();
  const note = (await page.textContent('#roNote')).trim();
  check(`${lang}/E/V₀ = 1.00: regime edge with κ = q = 0, zero ±90°/−90° dials, tags or legend claims`,
    s.regime === 'edge' && s.kappa === 0 && s.q === 0 && s.stageFrame.dials === false && tags.length > 0 && !tags.some((x) => /90°|k → 0|iκ/.test(x))
    && !/90°/.test(legend) && legend.includes('1 − ik(L − x)') && legend.includes('κ = q = 0') && !/躺在 i 里|lying in i/.test(legend) && !/90°/.test(note),
    JSON.stringify({ tags, legend }));
}
// (b) above V₀ the profile decides: E/V₀ = 1.01, L = 0.60 nm falls monotonically 3.19 → 1.83 → 1.00 (in |t|), while
// E/V₀ = 1.40, L = 1.20 nm is a standing wave
{
  const lo = rk4Barrier(1.01, 0.6), hi = rk4Barrier(1.4, 1.2);
  const profile = [0, 0.3, 0.6].map((x) => rk4Rel(lo, 0.6, x).toFixed(2));
  check('RK4: at E/V₀ = 1.01, L = 0.60 nm, |ψ|/|t| = 3.19 → 1.83 → 1.00 with no turning point; at 1.40/1.20 two turning points',
    same(profile, ['3.19', '1.83', '1.00']) && rk4Extrema(lo, 0.6) === 0 && !rk4Oscillates(lo, 0.6) && rk4Extrema(hi, 1.2) === 2 && rk4Oscillates(hi, 1.2), `${profile} · ${rk4Extrema(hi, 1.2)}`);
  for (const lang of ['zh', 'en']) {
    await page.click(`[data-lang-set="${lang}"]`); await settle(page);
    await page.evaluate(() => window.IMAG_TUNNEL_DEBUG.setState({ scene: 'barrier', lens: 'complex', ratio: 1.01, L: 0.6 })); await settle(page);
    let s = await state(), note = (await page.textContent('#roNote')).trim();
    check(`${lang}/E/V₀ = 1.01, L = 0.60 nm: the note reports a monotone fall to |t| from 3.19|t| and no rise and fall`,
      s.regime === 'over' && s.amplitude.monotone === true && s.amplitude.extrema === 0 && note.includes('3.19|t|') && /单调降到|falls monotonically/.test(note)
      && !/随驻波起伏|rises and falls/.test(note) && !/继续振荡|keeps oscillating/.test(note), note);
    checkMath(s, `${lang}/over 1.01/0.60`);
    await regimeText(page, s, `${lang}/over 1.01/0.60`);
    await page.evaluate(() => window.IMAG_TUNNEL_DEBUG.setState({ ratio: 1.4, L: 1.2 })); await settle(page);
    s = await state(); note = (await page.textContent('#roNote')).trim();
    check(`${lang}/E/V₀ = 1.40, L = 1.20 nm: the note reports the standing wave with 2 turning points and no monotone fall`,
      s.regime === 'over' && s.amplitude.monotone === false && s.amplitude.extrema === 2 && /随驻波起伏|rises and falls/.test(note)
      && /墙内 2 个极值|2 extrema inside/.test(note) && !/单调|monoton/.test(note), note);
  }
  const drawer = await page.$$eval('#drawer ol', (ols) => ols.map((o) => o.children[2].textContent));
  check('drawer item 3, both languages: E > V₀ splits into a monotone fall for qL ≤ π/2 (3.19 → 1.83 → 1.00) and a Fabry–Pérot standing wave beyond',
    drawer.length === 2 && drawer.every((d) => d.includes('qL ≤ π/2') && d.includes('3.19') && d.includes('1.83') && d.includes('1.00') && d.includes('qL = nπ')
      && d.includes('1 + V₀/(E − V₀)·sin² q(L − x)')) && drawer[0].includes('单调降到') && drawer[0].includes('法布里–珀罗驻波起伏')
      && drawer[1].includes('falls monotonically') && drawer[1].includes('rises and falls as a Fabry–Pérot standing wave')
      && !drawer[1].includes('its amplitude rises and falls as a standing wave, and T = 1'), JSON.stringify(drawer));
}
// (c) below V₀ the finite wall holds C₊e^(−κx) + C₋e^(+κx), dominated by e^(−κx) at E/V₀ = 0.50, L = 0.60 nm
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  await page.evaluate(() => window.IMAG_TUNNEL_DEBUG.setState({ scene: 'barrier', lens: 'complex', ratio: 0.5, L: 0.6, vantage: 'oblique', t: 0 })); await settle(page);
  const s = await state(), note = (await page.textContent('#roNote')).trim(), tags = await stageTags(page);
  const kap = waveNumber(0.5), ev = rk4Evanescent(rk4Barrier(0.5, 0.6), 0.6, kap), grow = Math.exp(-2 * kap * 0.6);
  check(`${lang}/E/V₀ = 0.50: e^(−κx) is the dominant term of C₊e^(−κx) + C₋e^(+κx), |C₋/C₊| = e^(−2κL) = ${grow.toFixed(4)} (RK4 fit), the stage tag says ~ e^(−κx)`,
    s.regime === 'tunnel' && s.amplitude.decayDominant === true && note.includes('C₊e−κx + C₋e+κx') && /以 e−κx 为主|dominated by e−κx/.test(note)
    && note.includes(grow.toFixed(4)) && rel(ev.ratio, grow, 1e-5) && ev.misfit < 1e-5 && near(s.amplitude.growRatio, grow, 1e-12)
    && tags.some((x) => /~ e−κx/.test(x)) && !tags.some((x) => /^(?:割弦|chord) e−κx$/.test(x)), JSON.stringify({ note, tags, ratio: ev.ratio }));
  await regimeText(page, s, `${lang}/tunnel 0.50/0.60`);
}
await page.click('[data-lang-set="zh"]'); await settle(page);
await input('#energyRatio', 0.5);
for (const Lw of [0.2, 0.6, 1.2]) {
  await input('#barrierWidth', Lw); const s = await state();
  check(`L slider ${Lw}: state and output`, near(s.barrierWidthNm, Lw) && (await page.textContent('output[for="barrierWidth"]')).trim() === `${Lw.toFixed(2)} nm`);
  checkMath(s, `L=${Lw}`);
}
await input('#barrierWidth', 0.6);
for (const pr of [0, 0.5, 1]) {
  await input('#probeStrength', pr); const s = await state();
  check(`probe slider ${pr}: V = 1 − p, n = round(12p)`, near(s.probeStrength, pr) && near(s.coherence, 1 - pr, 1e-12) && s.zeno.checks === Math.round(12 * pr));
  checkMath(s, `probe=${pr}`);
}
{
  const s0 = await state(); await input('#probeStrength', 0); const s1 = await state();
  check('probe: monitoring lowers the coherent transmission (Zeno)', s0.zeno.Tmon < s1.zeno.Tmon && s1.zeno.Tmon === s1.transmission);
}
for (const dg of [-180, 0, 90, 180]) {
  await input('#branchPhase', dg); const s = await state();
  check(`Δγ_B slider ${dg}°: the cursor phase is E*Δt/ℏ + Δγ_B`, near(s.branchPhaseDeg, dg) && s.preset === null
    && near(s.cursor.phase, s.cursorEv * (s.gateDelayAs / 1000) / HBAR_EVFS + dg * Math.PI / 180, 1e-9) && (await page.textContent('output[for="branchPhase"]')).includes(String(Math.abs(dg))));
  checkMath(s, `Δγ=${dg}`);
}
await input('#branchPhase', 0);
// lens, scene, vantage
await page.click('#lensToggle'); await settle(page);
{ const s = await state(); check('lens toggle: real-axis classical, T_cl = 0 below V₀', s.lens === 'real' && s.classicalTransmission === 0 && await page.getAttribute('#lensToggle', 'aria-pressed') === 'false' && s.preset === null); checkMath(s, 'lens=real'); }
await page.click('#lensToggle'); await settle(page);
check('lens toggle: back to the complex reading', (await state()).lens === 'complex' && await page.getAttribute('#lensToggle', 'aria-pressed') === 'true');
for (const sc of ['slits', 'barrier']) {
  await page.click(`#sceneChips [data-scene="${sc}"]`); await settle(page);
  check(`scene chip ${sc}`, (await state()).scene === sc && await page.getAttribute(`#sceneChips [data-scene="${sc}"]`, 'aria-pressed') === 'true');
}
for (const v of ['side', 'top', 'oblique']) {
  await page.click(`#vantageChips [data-vantage="${v}"]`); await settle(page);
  const s = await state();
  check(`vantage ${v}: camera yaw/pitch`, s.vantage === v && near(s.camera.yaw, VIEWS[v][0], 1e-9) && near(s.camera.pitch, VIEWS[v][1], 1e-9));
  const lo = await labelOverlaps(page, '.stage .tag', 0), sv = await stageView(page, '#stage', false);
  check(`vantage ${v}: stage clear`, lo.length === 0 && sv.layout.length === 0 && sv.hud.length === 0, [...sv.layout, ...sv.hud].join(' | '));
}
// the classical particle turns back at the wall below V₀
await pick('classical-real-wall');
for (const t of [1, 3, 4, 6]) {
  await seek(t); const s = await state(), v = Math.sqrt(2 * 0.5 * QE / ME) * 1e-6;
  check(`classical particle at t = ${t} fs: x = −v|t − 4|`, near(s.classicalX, -v * Math.abs(t - 4), 1e-9));
}

/* ---------- the handle: drag in 3D without turning the camera ---------- */
await pick('ninety-deg-imaginary-chord');
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const before = await state(), h = await page.evaluate(() => window.IMAG_TUNNEL_DEBUG.handleBox());
  const target = await page.evaluate(() => window.IMAG_TUNNEL_DEBUG.dragTarget(1.0));
  check('barrier handle: a visible amber button on the right edge', !!h && await page.locator('#stageHandle').isVisible());
  if (h && target) {
    await page.mouse.move(h.x, h.y); await page.mouse.down();
    check('barrier handle: pointerdown starts a drag', await page.locator('#stageHandle').evaluate((el) => el.classList.contains('dragging')));
    await page.mouse.move(target.x, target.y, { steps: 6 }); await page.mouse.up(); await settle(page);
    const after = await state();
    check('barrier handle: drag sets L = 1.00 nm and leaves the camera alone', near(after.barrierWidthNm, 1, 0.011) && same(after.camera, before.camera) && after.preset === null, `${after.barrierWidthNm}`);
    checkMath(after, 'after drag');
  }
  const L0 = (await state()).barrierWidthNm, t0 = (await state()).t;
  await page.locator('#stageHandle').focus(); await page.keyboard.press('ArrowLeft'); await settle(page);
  const k = await state();
  check('barrier handle: ← narrows the barrier by 0.01 nm and leaves the clock alone', near(k.barrierWidthNm, L0 - 0.01, 1e-9) && k.t === t0, `${L0} → ${k.barrierWidthNm}`);
}
await pick('temporal-double-slit-comb');
{
  const before = await state(), h = await page.evaluate(() => window.IMAG_TUNNEL_DEBUG.handleBox()), target = await page.evaluate(() => window.IMAG_TUNNEL_DEBUG.dragTarget(14));
  check('cursor handle: shown on the spectral screen', !!h);
  if (h && target) {
    await page.mouse.move(h.x, h.y); await page.mouse.down(); await page.mouse.move(target.x, target.y, { steps: 6 }); await page.mouse.up(); await settle(page);
    const after = await state();
    check('cursor handle: drag moves E* to about 14 eV, camera unchanged', Math.abs(after.cursorEv - 14) < 0.3 && same(after.camera, before.camera), `${after.cursorEv}`);
    checkMath(after, 'after cursor drag');
  }
  await page.click('#vantageChips [data-vantage="side"]'); await settle(page);
  check('cursor handle: hidden in the side view, where the screen is edge-on', await page.locator('#stageHandle').isHidden());
}

/* ---------- drawer, playback ---------- */
await page.click('#infoBtn'); await settle(page);
check('info button opens the theory drawer', await page.locator('#drawer [role="dialog"]').isVisible());
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').isHidden());
check('play advances the time rail', await playsAfter(page, () => page.locator('#play').evaluate((b) => b.click()), () => window.IMAG_TUNNEL_DEBUG.state));
await pause();
{ const a = await state(); await settle(page); const b = await state(); check('pause holds the clock', !a.playing && a.t === b.t); }
check('a card click plays its story', await playsAfter(page, () => page.click('[data-preset="ninety-deg-imaginary-chord"]'), () => window.IMAG_TUNNEL_DEBUG.state));
await pause();

/* ---------- desktop, phone, and the cited 334 × 520 frames, both languages ---------- */
for (const lang of ['zh', 'en']) for (const [width, height, query, scheme] of [[1440, 900, '', 'dark'], [390, 844, '', 'light']]) {
  colorScheme = scheme;
  const p = await T.open(BOOK, ID, `?lang=${lang}${query}`, { viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US', reducedMotion: 'reduce' });
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
for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) {
  const p = await T.open(BOOK, ID, `?embed=1&lang=${lang}&preset=${card}`, { viewport: { width: 334, height: 520 }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
  await settle(p);
  await p.evaluate(() => { TRV.kit.pause(); TRV.kit.flush(); });
  const tag = `cited 334x520 ${lang}/${card}`;
  const s = await state(p), v = await stageView(p, '#stage', true), lo = await labelOverlaps(p, '.stage .tag', 0), cg = await capitalGreek(p), ox = await overflowX(p);
  check(`${tag}: opens on the card`, s.preset === card && await p.evaluate(() => document.documentElement.dataset.figure === '1'));
  check(`${tag}: stageView layout and HUD empty`, v.layout.length === 0 && v.hud.length === 0, [...v.layout, ...v.hud].join(' | '));
  check(`${tag}: labels apart, capitals kept, no sideways scroll`, lo.length === 0 && cg.length === 0 && ox === 0, JSON.stringify({ lo, cg, ox }));
  if (lang === 'en') check(`${tag}: no Chinese on screen`, (await cjkLeftovers(p)).length === 0);
  check(`${tag}: the strip is not in the frame and the stage holds no plot`, await p.evaluate(() => { const st = document.querySelector('.strip'); return (!st || getComputedStyle(st).display === 'none') && !document.querySelector('#stage #plot'); }));
  await p.context().close();
}

/* ---------- the stills a chapter prints ---------- */
for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) {
  const p = await openStill(T, BOOK, ID, card, lang), s = await state(p), c = CARDS[card];
  check(`still ${lang}/${card}: paused on the declared frame, no handle`, s.preset === card && !s.playing && near(s.t, c.still, 1e-9) && await p.locator('#stageHandle').isHidden()
    && await p.evaluate(() => TRV.still && TRV.shot && document.documentElement.dataset.trPalette === undefined));
  if (card === 'temporal-double-slit-comb') check(`still ${lang}/${card}: both gates open, ΔE = 4.1357 eV, E* = 8.27 eV`, s.gates.g1 > 0.999999 && s.gates.g2 > 0.999999 && s.deltaE.toFixed(4) === '4.1357' && s.cursorEv.toFixed(2) === '8.27');
  if (card === 'ninety-deg-imaginary-chord') check(`still ${lang}/${card}: the chord lies mostly in i (share on i > 0.98)`, s.shareImag > 0.98, `${s.shareImag}`);
  if (card === 'zeno-midway-probe-collapse') check(`still ${lang}/${card}: V = 0, T_mon = 0.0161`, s.coherence === 0 && s.zeno.Tmon.toFixed(4) === '0.0161');
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
