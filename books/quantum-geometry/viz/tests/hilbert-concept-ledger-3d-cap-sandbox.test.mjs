// HILBERT//LEDGER browser regression: the shared stage-first gate (with the lit-solid checks), every reader control, and
// every number the page claims, checked against algorithms written here (not the page's own functions): closed forms
// for the generator counts, a Pauli expansion for the two-qubit states, a quaternion rotation for the motion, closed
// Gaussian overlaps for the cone Gram matrix, 't Hooft matrices for so(4) and closed-form halting depths.
// Run directly with node; VIZ_PHASE1=1 skips the repeated card/still matrix, while VIZ_SLOW_FRAMES=1000 exercises every
// transition and playback assertion with deliberately sparse animation frames.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, overflowX, labelOverlaps, capitalGreek } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'hilbert-concept-ledger-3d-cap-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const PHASE1 = process.env.VIZ_PHASE1 === '1';
const CARDS = {
  'hypercube-illusion-unfold': { scene: 'unfold', lens: 'ledger', still: 'end', lam: 1 },
  'space-color-joint-ledger': { scene: 'joint', lens: 'ledger', still: 0.5, lam: 0.5 },
  'motion-rot-scale-trans-triad': { scene: 'motion', lens: 'ledger', still: 0.65, lam: 0.65 },
  'hodge-curl-field-cap-3d': { scene: 'cap', lens: 'ledger', still: 0.6, lam: 0.6 },
  'unhalted-infinity-truncation': { scene: 'halt', lens: 'ledger', still: 'end', lam: 1 }
};
const GIDS = [
  'D5/S3/Observer/Tomography/FiniteStageExpansion.finite_stage_expansion',
  'D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot',
  'D5/S3/Observer/Tomography/FiniteRankConcentrationModeBound.finite_rank_concentration_mode_bound',
  'D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences',
  'D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian',
  'D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff'
];
const THEORY = 'ch39-s10-three-dimensional-field-cap-and-hilbert-ledger.html';
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-10) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
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
// The shared night console: no page may write data-tr-palette, not even for a moment.
const paletteMutations = [], paletteDocuments = [];
async function watchPalette(context) {
  await context.exposeBinding('__ledgerPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__ledgerPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__ledgerPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined }).catch(() => {}), { once: true });
  });
  context.on('page', watchPage);
  context.pages().forEach(watchPage);
}
await watchPalette(T.context);
const browserNewContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async (options) => { const context = await browserNewContext(options); await watchPalette(context); return context; };
watchPage(page);

// The shared gate covers the canonical desktop, short-screen, rail, embed, figure, phone and cover paths and the solid.
await stageFirstChecks(T, BOOK, ID, { solid: true, cards: !PHASE1, settle: 0 });

/* ---------- independent mathematics (written here, not taken from the page) ---------- */
const W = [0.30, 0.25, 0.20, 0.15, 0.10];
const C2 = (n) => n * (n - 1) / 2;
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const mm = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const tp = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const det3 = (M) => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
const maxDiff = (A, B) => Math.max(...A.flat().map((x, i) => Math.abs(x - B.flat()[i])));
/** Complex 4 × 4 by Pauli expansion: ρ = ¼ Σ c_{μν} σ_μ ⊗ σ_ν (re, im parts). */
const PAULI = [[[[1, 0], [0, 0]], [[0, 0], [1, 0]]], [[[0, 0], [1, 0]], [[1, 0], [0, 0]]], [[[0, 0], [0, -1]], [[0, 1], [0, 0]]], [[[1, 0], [0, 0]], [[0, 0], [-1, 0]]]];
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
function pauliExpansion(c) {
  const R = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => [0, 0]));
  for (let mu = 0; mu < 4; mu++) for (let nu = 0; nu < 4; nu++) {
    if (!c[mu][nu]) continue;
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) for (let k = 0; k < 2; k++) for (let l = 0; l < 2; l++) {
      const v = cmul(PAULI[mu][i][j], PAULI[nu][k][l]);
      R[2 * i + k][2 * j + l][0] += c[mu][nu] * v[0] / 4; R[2 * i + k][2 * j + l][1] += c[mu][nu] * v[1] / 4;
    }
  }
  return R;
}
/** Rotation about the unit axis n by a, by conjugating with the quaternion (cos a/2, sin a/2 n). */
function quatRotation(n, a) {
  const q = [Math.cos(a / 2), ...n.map((x) => x * Math.sin(a / 2))];
  const qmul = (p, r) => [p[0] * r[0] - p[1] * r[1] - p[2] * r[2] - p[3] * r[3], p[0] * r[1] + p[1] * r[0] + p[2] * r[3] - p[3] * r[2], p[0] * r[2] - p[1] * r[3] + p[2] * r[0] + p[3] * r[1], p[0] * r[3] + p[1] * r[2] - p[2] * r[1] + p[3] * r[0]];
  const conj = [q[0], -q[1], -q[2], -q[3]];
  const cols = [[1, 0, 0], [0, 1, 0], [0, 0, 1]].map((e) => qmul(qmul(q, [0, ...e]), conj).slice(1));
  return [0, 1, 2].map((i) => cols.map((c) => c[i]));
}
const Q = 0.65;
/** The least K whose tail q^K is ≤ ε (closed form) and the number of w_k ≥ ε (closed form). */
const haltDepth = (eps) => Math.ceil(Math.log(eps) / Math.log(Q) - 1e-12);
const modesAbove = (eps) => (eps > 1 - Q ? 0 : Math.floor(Math.log(eps / (1 - Q)) / Math.log(Q) + 1e-12) + 1);

/** Every claim of the state s, recomputed here. */
function checkMath(s, tag) {
  const lam = s.lambda;
  // 1. pooling and binning
  const U = s.unfold;
  check(`${tag}: five weights, Σw = 1, ‖ψ‖² of the 15 coordinates = Σ block norms² = Σw`, same(U.w, W) && near(U.sumW, 1, 1e-12) && U.psi.length === 15
    && near(U.psi.reduce((a, x) => a + x * x, 0), 1, 1e-12) && U.blocks.every((b, i) => near(b, W[i], 1e-12)) && near(U.norm2, 1, 1e-12));
  check(`${tag}: so(15) = 105 = 5·3 in-block + 9·C(5, 2) cross; so(9) = 36 = 9 + 27`, U.ledger.pooled === C2(15) && U.ledger.intra === 5 * C2(3) && U.ledger.cross === 9 * C2(5)
    && U.ledger.pairs === 90 && U.ledger3.pooled === C2(9) && U.ledger3.intra === 3 * C2(3) && U.ledger3.cross === 9 * C2(3));
  const slotsOk = U.slots.every((p, a) => near(norm(p), 1.45, 1e-12) && near(p[2], 0, 1e-15)
    && near(Math.acos(Math.max(-1, Math.min(1, dot(p, U.slots[(a + 1) % 5]) / (1.45 * 1.45)))), 72 * Math.PI / 180, 1e-9));
  check(`${tag}: λ = ${lam}: centres λ·slot on a pentagon of radius 1.45, radii (1 − λ)(1 − 0.035α) + λ√w`, slotsOk
    && U.centers.every((c, a) => c.every((x, i) => near(x, lam * U.slots[a][i], 1e-12))) && U.radii.every((r, a) => near(r, (1 - lam) * (1 - 0.035 * a) + lam * Math.sqrt(W[a]), 1e-12)));
  check(`${tag}: each concept's three axes are orthonormal`, U.frames.every((F) => maxDiff(mm(tp(F), F), [[1, 0, 0], [0, 1, 0], [0, 0, 1]]) < 1e-12 && near(det3(F), 1, 1e-12)));
  // 2. space ⊗ color, ρ(λ) = (1 − λ/2)Φ⁺ + (λ/2)Φ⁻ = ¼(I + (1 − λ)XX − (1 − λ)YY + ZZ)
  const J = s.joint, c = [[1, 0, 0, 0], [0, 1 - lam, 0, 0], [0, 0, -(1 - lam), 0], [0, 0, 0, 1]], R = pauliExpansion(c);
  let reDiff = 0, imMax = 0; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { reDiff = Math.max(reDiff, Math.abs(R[i][j][0] - J.rho[i][j])); imMax = Math.max(imMax, Math.abs(R[i][j][1])); }
  const rhoA = [[J.rho[0][0] + J.rho[1][1], J.rho[0][2] + J.rho[1][3]], [J.rho[2][0] + J.rho[3][1], J.rho[2][2] + J.rho[3][3]]];
  const rhoB = [[J.rho[0][0] + J.rho[2][2], J.rho[0][1] + J.rho[2][3]], [J.rho[1][0] + J.rho[3][2], J.rho[1][1] + J.rho[3][3]]];
  check(`${tag}: ρ(λ) equals the Pauli expansion, trace 1, both partial traces I/2 (local Bloch vectors 0)`, reDiff < 1e-12 && imMax === 0 && near(J.trace, 1, 1e-12)
    && maxDiff(rhoA, [[0.5, 0], [0, 0.5]]) < 1e-12 && maxDiff(rhoB, [[0.5, 0], [0, 0.5]]) < 1e-12 && J.a.every((x) => near(x, 0, 1e-12)) && J.b.every((x) => near(x, 0, 1e-12))
    && near(J.normA, 0, 1e-12) && near(J.normB, 0, 1e-12) && J.imag < 1e-12);
  check(`${tag}: correlation table T = diag(1 − λ, −(1 − λ), 1)`, maxDiff(J.T, [[1 - lam, 0, 0], [0, -(1 - lam), 0], [0, 0, 1]]) < 1e-12
    && near(J.normT, Math.sqrt(2 * (1 - lam) ** 2 + 1), 1e-12));
  check(`${tag}: spectra: ρ {0, 0, λ/2, 1 − λ/2}, partial transpose {(λ − 1)/2, (1 − λ)/2, 1/2, 1/2}`, maxDiff([J.rhoSpectrum], [[0, 0, lam / 2, 1 - lam / 2]]) < 1e-9
    && maxDiff([J.ptSpectrum], [[(lam - 1) / 2, (1 - lam) / 2, 0.5, 0.5]]) < 1e-9 && near(J.ptMin, (lam - 1) / 2, 1e-9));
  check(`${tag}: 15 = 6 + 9 Pauli products, pairwise Hilbert–Schmidt orthogonal`, J.sectors.A === 3 && J.sectors.B === 3 && J.sectors.corr === 9
    && (4 - 1) + (4 - 1) + (4 - 1) * (4 - 1) === 15 && 2 * 2 * 2 * 2 - 1 === 15 && J.hsOff < 1e-12 && J.hsDiag < 1e-12);
  // the cone Gram matrix: L² inner products of normalized Gaussians are exp(−Δμ²/4σ²)
  const G = s.gram.lms, mu = [564, 534, 420], Gc = mu.map((a) => mu.map((b) => Math.exp(-((a - b) ** 2) / (4 * 40 * 40))));
  check(`${tag}: LMS Gram = exp(−Δμ²/4σ²), det ≈ 0.235 > 0; RGB Gram = I, det = 1`, same(G.peaks, mu) && G.sigma === 40 && maxDiff(G.G, Gc) < 1e-9 && near(G.det, det3(Gc), 1e-9) && G.det > 0
    && maxDiff(G.frameGram, Gc) < 1e-9 && maxDiff(s.gram.rgb.G, [[1, 0, 0], [0, 1, 0], [0, 0, 1]]) === 0 && s.gram.rgb.det === 1);
  check(`${tag}: the LMS frame vectors are independent (triple product ≠ 0) and nearest to RGB (symmetric)`, Math.abs(det3(G.frame)) > 0.4
    && near(det3(G.frame) ** 2, det3(Gc), 1e-9) && maxDiff(G.frame, tp(G.frame)) < 1e-9);
  // 3. motion
  const Mo = s.motion, n = [1, 1, 1].map((x) => x / Math.sqrt(3)), h = [Math.log(1.5), Math.log(1.25), Math.log(0.8)], t1 = [0.4, 0.36, 0.16];
  const Rq = quatRotation(n, lam * 2 * Math.PI / 3), F = mm(Rq, [[Math.exp(lam * h[0]), 0, 0], [0, Math.exp(lam * h[1]), 0], [0, 0, Math.exp(lam * h[2])]]);
  check(`${tag}: motion: F = R(λ·120°, (1,1,1)) diag(e^{λh}) (quaternion rotation), t = λ·(0.4, 0.36, 0.16)`, maxDiff(Mo.F, F) < 1e-12 && Mo.t.every((x, i) => near(x, lam * t1[i], 1e-14))
    && Mo.axis.every((x, i) => near(x, n[i], 1e-14)) && near(Mo.detF, Math.exp(lam * (h[0] + h[1] + h[2])), 1e-12));
  const sortedH = h.map((x) => lam * x).sort((a, b) => a - b), Rb = Mo.Rback;
  check(`${tag}: polar decomposition reads back the log strains λh and the turn λ·120°`, Mo.strains.every((x, i) => near(x, sortedH[i], 1e-9))
    && near(Mo.angle, lam * 2 * Math.PI / 3, 1e-9) && maxDiff(mm(Rb, tp(Rb)), [[1, 0, 0], [0, 1, 0], [0, 0, 1]]) < 1e-9 && near(det3(Rb), 1, 1e-9) && maxDiff(Rb, Rq) < 1e-9);
  check(`${tag}: sl(2, ℝ) Killing form [[8,0,0],[0,0,4],[0,4,0]], eigenvalues −4, 4, 8, signature (2, 1)`, maxDiff(Mo.killing.K, [[8, 0, 0], [0, 0, 4], [0, 4, 0]]) < 1e-12
    && maxDiff([Mo.killing.eig], [[-4, 4, 8]]) < 1e-9 && same(Mo.killing.signature, [2, 1]));
  // 4. the field cap
  const Cp = s.cap, d = Math.min(5, Math.max(1, Math.round(1 + 4 * lam)));
  check(`${tag}: d = round(1 + 4λ) = ${d}; C(d, 1) = d, C(d, 2) = d(d − 1)/2, gap d(d − 3)/2, ⋆ degree d − 2`, s.dim === d && Cp.d === d && Cp.ones === d && Cp.twos === C2(d)
    && Cp.gap === d * (d - 3) / 2 && Cp.starDegree === d - 2 && Cp.pairs.length === C2(d)
    && Cp.pairs.every((p) => same(p.star, Array.from({ length: d }, (_, k) => k).filter((k) => k !== p.i && k !== p.j))));
  const PPt = [0, 1, 2].map((r) => [0, 1, 2].map((q) => Cp.cols.reduce((acc, col) => acc + col[r] * col[q], 0)));
  check(`${tag}: the ${d} axes are a tight frame (P Pᵀ = identity on their span)`, [0, 1, 2].every((r) => [0, 1, 2].every((q) => (d < 3 && (r >= d || q >= d)) || near(PPt[r][q], r === q ? 1 : 0, 1e-12))));
  const L = (p) => [[p[0], -p[1], -p[2], -p[3]], [p[1], p[0], -p[3], p[2]], [p[2], p[3], p[0], -p[1]], [p[3], -p[2], p[1], p[0]]];
  const qm = (p, q) => L(p).map((r) => dot(r, q));
  check(`${tag}: quaternions ij = k, jk = i, ki = j, i² = −1, ji = −k; e₁ × e₂ = e₃`, same(Cp.quat.ij, qm([0, 1, 0, 0], [0, 0, 1, 0])) && same(Cp.quat.ij, [0, 0, 0, 1])
    && same(Cp.quat.jk, [0, 1, 0, 0]) && same(Cp.quat.ki, [0, 0, 1, 0]) && same(Cp.quat.ii, [-1, 0, 0, 0]) && same(Cp.quat.ji, [0, 0, 0, -1]) && same(Cp.quat.cross, cross([1, 0, 0], [0, 1, 0])));
  const B = Cp.bloch, rb = [Math.sin(B.theta) * Math.cos(B.phi), Math.sin(B.theta) * Math.sin(B.phi), Math.cos(B.theta)];
  check(`${tag}: a pure state: Bloch vector (sin θ cos φ, sin θ sin φ, cos θ), ‖r‖ = 1, tr 1, M² = M, M = blochMatrix(1, r)`, B.r.every((x, i) => near(x, rb[i], 1e-12))
    && near(B.norm, 1, 1e-12) && near(B.trace, 1, 1e-12) && B.idem < 1e-12 && B.match < 1e-12);
  // 5. the tower
  const H = s.halt, K = haltDepth(s.eps);
  check(`${tag}: ε = ${s.eps}: K = ⌈ln ε / ln q⌉ = ${K}, kept 1 − q^K, tail q^K, ${modesAbove(s.eps)} modes ≥ ε ≤ 1/ε`, H.q === Q && near(H.eps, s.eps, 1e-15) && H.K === K
    && near(H.kept, 1 - Q ** K, 1e-12) && near(H.tail, Q ** K, 1e-12) && H.tail <= s.eps && Q ** (K - 1) > s.eps && H.above === modesAbove(s.eps)
    && near(H.bound, 1 / s.eps, 1e-9) && H.above <= H.bound && near(H.sumW, 1, 1e-12) && H.w.every((x, k) => near(x, (1 - Q) * Q ** k, 1e-15)));
}

/* ---------- source and registry ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((file) => [file, fs.readFileSync(path.join(DIR, file), 'utf8')]));
for (const [file, source] of Object.entries(sources)) {
  check(`source ${file}: no literal colour or palette override`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(source) && !/\btrPalette\b|data-tr-palette/.test(source));
}
// the one grid-template-columns of the page splits the lens toggle into its two halves; the lab's grid stays the theme's
check('source: shared three-column grid, wheel:false, a looping clock', same([...sources['style.css'].matchAll(/grid-template-columns\s*:\s*([^;}]+)/g)].map((m) => m[1].trim()), ['minmax(0, 1fr) minmax(0, 1fr)'])
  && /\.lens-toggle\s*\{[^}]*grid-template-columns/.test(sources['style.css']) && !/\.app\.lab[^{]*\{[^}]*grid-template/.test(sources['style.css'])
  && /wheel:\s*false/.test(sources['main.js']) && /loop:\s*true/.test(sources['main.js']));
check('source: the five public presets stay in order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((x) => x[1]), Object.keys(CARDS)));
check('source: no green tick outside the evidence boxes, no red or green on the stage', !/okmark/.test(sources['main.js']) && !/P\.(?:ok|warn)\b/.test(sources['main.js']));
check('source: every .zh fragment has its .en twin', (sources['index.html'].match(/class="[^"]*\bzh\b/g) || []).length === (sources['index.html'].match(/class="[^"]*\ben\b/g) || []).length);
{
  // banned identifiers, assembled from fragments so that this file does not carry them
  const words = [['cla', 'ude'], ['gem', 'ini'], ['op', 'enai'], ['anthr', 'opic'], ['co', 'dex'], ['l', 'lm'], ['ch', 'atgpt'], ['g', 'pt'], ['so', 'nnet'], ['co', 'pilot']].map((p) => p.join(''));
  const hits = [];
  for (const [file, source] of Object.entries({ ...sources, 'test.mjs': fs.readFileSync(fileURLToPath(import.meta.url), 'utf8') })) {
    for (const w of words) if (new RegExp(`\\b${w}\\b`, 'i').test(source)) hits.push(`${file}: ${w}`);
    if (/\bAI\b/.test(source) || new RegExp(`\\b${['ag', 'ent'].join('')}s?\\b`, 'i').test(source)) hits.push(`${file}: assistant word`);
  }
  check('source: no model, vendor or assistant identifiers', hits.length === 0, hits.join(' | '));
}
check('source: the suite waits for state, never for a fixed time', !new RegExp(['wait', 'For', 'Timeout'].join('')).test(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8')));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID);
check('registry: live §39.10 entry with five bilingual cards and the six theorems', !!entry && entry.status === 'live' && entry.chapter === 39 && entry.section === '39.10'
  && entry.code === 'HILBERT//LEDGER' && same(entry.presets, Object.keys(CARDS)) && entry.presets.every((c) => entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same(entry.lean.map((x) => x.gid), GIDS) && entry.theory.some((t) => t.href === `../zh/${THEORY}` && t.href_en === `../en/${THEORY}`));
const deps = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'tests', 'dependencies.json'), 'utf8')).suites[`${ID}.test.mjs`];
check('dependencies: the suite is registered with the lit-solid runtime, the registry and the chapter citations', Array.isArray(deps) && deps.includes('@citations')
  && deps.includes('@registry-entry') && deps.includes('theme/viz/solid-core.js') && deps.includes('theme/viz/vendor/three.module.min.js') && deps.includes('@lean-links'));

/* ---------- runtime: contract, links, cards ---------- */
const state = (p = page) => p.evaluate(() => window.HILBERT_LEDGER_DEBUG.state);
async function pause(p = page) {
  await settle(p);
  await p.locator('#play').evaluate((b) => { if (b.getAttribute('aria-pressed') === 'true') b.click(); });
  await settle(p);
}
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
  await settle(p);
}
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  await until(p, (q) => { const s = window.HILBERT_LEDGER_DEBUG.state; return s.scene === q.scene && s.lens === q.lens && Math.abs(s.eps - 0.05) < 1e-12; }, CARDS[card]);
  await pause(p);
}
/** The card at its declared still, set through the rail (the card stays selected). */
async function atStill(card, p = page) {
  await pick(card, p);
  await input('#now', CARDS[card].lam, p);
  return state(p);
}
async function checkLinks(p, tag) {
  check(`${tag}: exact Lean evidence links in six green boxes`, same(await p.$$eval('[data-lean-gid]', (els) => els.map((e) => e.dataset.leanGid)), GIDS)
    && await p.$$eval('[data-lean-gid]', (els) => els.every((e) => e.closest('.col.side #evidence .lean') && e.closest('.lean').className === 'lean' && e.closest('.lean').querySelector('.ok')?.textContent.trim() === 'LEAN ✓')));
  check(`${tag}: one ARGUED, one MODEL and one NUM box after the green ones`, same(await p.$$eval('#evidence .lean:not([class="lean"])', (els) => els.map((e) => e.className)), ['lean argued', 'lean model', 'lean num']));
  check(`${tag}: bilingual §39.10 theory link in the drawer`, same(await p.$$eval('#drawer .refs a', (els) => els.map((e) => e.getAttribute('href')).sort()), ['zh', 'en'].map((l) => `../../${l}/${THEORY}`).sort()));
}

await T.goto(BOOK, ID, '?lang=en');
await settle(page);
check('runtime: shared scripts and styles only', same(await page.$$eval('script', (els) => els.map((e) => e.getAttribute('src'))), ['../assets/shell.js', '../assets/kit.js', 'main.js'])
  && same(await page.$$eval('link[rel="stylesheet"]', (els) => els.map((e) => e.getAttribute('href')).filter((h) => !h.startsWith('https:'))), ['../assets/theme.css', 'style.css']));
await checkLinks(page, 'runtime');
check('layout: three-column lab, stage with the strip below it, readouts and evidence on the right', await page.evaluate(() => {
  const app = document.querySelector('.app.lab'), deck = app.querySelector(':scope > .deck'), center = app.querySelector(':scope > .center'), side = app.querySelector(':scope > .side');
  const d = deck.getBoundingClientRect(), c = center.getBoundingClientRect(), s = side.getBoundingClientRect();
  return getComputedStyle(app).gridTemplateColumns.trim().split(/\s+/).length === 3 && d.right <= c.left + 1 && c.right <= s.left + 1
    && center.matches('main.center') && side.matches('aside.col.side')
    && !!center.querySelector(':scope > #stage[data-thumb]') && !!center.querySelector(':scope > .tour#tour') && !!center.querySelector(':scope > .strip')
    && !!side.querySelector(':scope > #readouts dl.ro') && !!side.querySelector(':scope > #evidence')
    && !!document.querySelector('.center > .strip canvas#plot') && !document.querySelector('#stage #plot') && !!document.querySelector('#stage > button.handle#ledgerHandle')
    && document.querySelectorAll('#stage > .hud-tr#sceneChips [data-scene]').length === 5 && !!document.querySelector('#stage > canvas#cv');
}));
check('layout: #rail is the left deck with the lens toggle, five cards, the note and both sliders', await page.evaluate(() => {
  const deck = document.querySelector('.app.lab > aside.col.deck');
  return document.querySelectorAll('#rail').length === 1 && document.querySelector('#rail') === deck
    && !!deck.querySelector('.presets.cards#presets') && deck.querySelectorAll('#presets button.preset[data-preset]').length === 5 && !!deck.querySelector('#presetNote')
    && !!deck.querySelector('#ctlPanel button.lens-toggle#lensToggleBtn') && !!deck.querySelector('#ctlPanel input#unmix[type=range][min="0"][max="1"]')
    && !!deck.querySelector('#ctlPanel input#epsHalt[type=range][min="0.01"][max="0.5"]');
}));
check('layout: #infoBtn is the first child of #evidence, above every evidence box', await page.evaluate(() => {
  const ev = document.querySelector('.app.lab > .side > #evidence'), btn = document.querySelector('#infoBtn');
  const boxes = [...ev.querySelectorAll('.lean')], top = btn.getBoundingClientRect();
  return document.querySelectorAll('#infoBtn').length === 1 && ev.firstElementChild === btn && btn.matches('button.chip[type="button"]') && boxes.length === 9
    && boxes.every((b) => (btn.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) && top.bottom <= b.getBoundingClientRect().top + 0.5);
}));
check('colours: amber stays off the readouts, green stays inside the evidence boxes', await page.evaluate(() => {
  const probe = (v) => { const el = document.createElement('i'); el.style.color = `var(${v})`; document.body.appendChild(el); const c = getComputedStyle(el).color; el.remove(); return c; };
  const amber = probe('--amber'), ok = probe('--ok'), warn = probe('--warn');
  const ro = [...document.querySelectorAll('#readouts *')].every((el) => getComputedStyle(el).color !== amber);
  const green = [...document.querySelectorAll('body *')].filter((el) => getComputedStyle(el).color === ok && el.children.length === 0 && el.textContent.trim()).every((el) => el.closest('.lean'));
  const stage = [...document.querySelectorAll('#stage *')].every((el) => getComputedStyle(el).color !== warn && getComputedStyle(el).color !== ok);
  return ro && green && stage && document.querySelectorAll('.okmark').length === [...document.querySelectorAll('.okmark')].filter((e) => e.closest('.lean')).length;
}));
check('debug probe: window.HILBERT_LEDGER_DEBUG is frozen and read-only', await page.evaluate(() => Object.isFrozen(window.HILBERT_LEDGER_DEBUG) && typeof window.HILBERT_LEDGER_DEBUG.setState === 'function'));

for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  check(`language ${lang}: document and pressed toggle`, await page.evaluate((l) => document.documentElement.lang.startsWith(l)
    && document.querySelector(`[data-lang-set="${l}"]`).getAttribute('aria-pressed') === 'true', lang));
  for (const card of Object.keys(CARDS)) {
    await pick(card); const s = await state(), q = CARDS[card];
    check(`${lang}/${card}: the card sets scene, lens, ε and its still`, s.preset === card && s.scene === q.scene && s.lens === q.lens && s.eps === 0.05 && !s.playing
      && await page.locator(`[data-preset="${card}"]`).getAttribute('aria-pressed') === 'true'
      && await page.locator(`[data-preset="${card}"]`).getAttribute('data-still') === String(q.still)
      && await page.locator(`#sceneChips [data-scene="${q.scene}"]`).getAttribute('aria-pressed') === 'true'
      && await page.locator('#lensToggleBtn').getAttribute('aria-pressed') === 'true');
    checkMath(s, `${lang}/${card}`);
  }
}

// What each card's caption says, read off the page at its still.
{
  let s = await atStill('hypercube-illusion-unfold');
  check('unfold card: Σw = 1, five radii √w, 15 in-block against 105, 90 cross chords', s.preset === 'hypercube-illusion-unfold' && s.lambda === 1 && s.unfold.sumW.toFixed(4) === '1.0000'
    && s.unfold.radii.every((r, a) => near(r, Math.sqrt(W[a]), 1e-12)) && s.unfold.ledger.intra === 15 && s.unfold.ledger.pooled === 105 && s.unfold.ledger.cross === 90);
  s = await atStill('space-color-joint-ledger');
  check('joint card: a = b = 0, T = diag(0.50, −0.50, 1.00), least PT eigenvalue −0.25, det G₃ 0.235 and 1', s.preset === 'space-color-joint-ledger' && s.lambda === 0.5
    && s.joint.normA === 0 && s.joint.normB === 0 && same([0, 1, 2].map((i) => s.joint.T[i][i].toFixed(2)), ['0.50', '-0.50', '1.00']) && s.joint.ptMin.toFixed(2) === '-0.25'
    && s.gram.lms.det.toFixed(3) === '0.235' && s.gram.rgb.det.toFixed(4) === '1.0000');
  s = await atStill('motion-rot-scale-trans-triad');
  check('motion card: ‖t‖ = 0.365, turn 78.0°, strains e^{0.264}, e^{0.145}, e^{−0.145}, det F = 1.302, 9 against 36', s.preset === 'motion-rot-scale-trans-triad' && s.lambda === 0.65
    && norm(s.motion.t).toFixed(3) === '0.365' && (s.motion.angle * 180 / Math.PI).toFixed(1) === '78.0' && same(s.motion.strains.map((x) => x.toFixed(3)), ['-0.145', '0.145', '0.264'])
    && s.motion.detF.toFixed(3) === '1.302' && s.unfold.ledger3.intra === 9 && s.unfold.ledger3.pooled === 36);
  s = await atStill('hodge-curl-field-cap-3d');
  check('cap card: d = 3, three gradients and three curls, ⋆ lands on 1-forms', s.preset === 'hodge-curl-field-cap-3d' && s.lambda === 0.6 && s.dim === 3 && s.cap.ones === 3 && s.cap.twos === 3 && s.cap.gap === 0 && s.cap.starDegree === 1);
  s = await atStill('unhalted-infinity-truncation');
  check('halt card: ε = 0.050, K = 7, kept 95.10%, tail 4.90%, 5 modes ≥ ε ≤ 20', s.preset === 'unhalted-infinity-truncation' && s.halt.K === 7 && (100 * s.halt.kept).toFixed(2) === '95.10'
    && (100 * s.halt.tail).toFixed(2) === '4.90' && s.halt.above === 5 && Math.round(s.halt.bound) === 20);
}

/* ---------- independent sweeps over every parameter the page offers ---------- */
{
  const led = await page.evaluate(() => [1, 2, 3, 4, 5, 6, 7, 8].map((k) => window.HILBERT_LEDGER_DEBUG.sweep('ledger', k)));
  check('NUM: for k = 1 … 8 concepts, so(3k) = 3k + 9·C(k, 2) by pairs of basis vectors', led.every((r, i) => { const k = i + 1; return r.pooled === C2(3 * k) && r.intra === 3 * k && r.cross === 9 * C2(k) && r.pooled === r.intra + r.cross; }));
  const caps = await page.evaluate(() => [1, 2, 3, 4, 5].map((d) => window.HILBERT_LEDGER_DEBUG.sweep('cap', d)));
  check('NUM: C(d, 2) = C(d, 1) on d = 1 … 5 only at d = 3', caps.filter((c) => c.twos === c.ones).map((c) => c.d).join() === '3' && caps.every((c) => c.gap === c.d * (c.d - 3) / 2));
  // so(4) = su(2) ⊕ su(2): the page's check, and the same split built here from 't Hooft's self-dual combinations
  const so4 = caps[3].so4, Lg = (i, j) => { const M = Array.from({ length: 4 }, () => [0, 0, 0, 0]); M[i][j] = 1; M[j][i] = -1; return M; };
  const lin = (A, B, s) => A.map((r, i) => r.map((x, j) => x + s * B[i][j]));
  const Aset = [lin(Lg(0, 1), Lg(2, 3), 1), lin(Lg(0, 2), Lg(3, 1), 1), lin(Lg(0, 3), Lg(1, 2), 1)], Bset = [lin(Lg(0, 1), Lg(2, 3), -1), lin(Lg(0, 2), Lg(3, 1), -1), lin(Lg(0, 3), Lg(1, 2), -1)];
  const comm = (X, Y) => lin(mm(X, Y), mm(Y, X), -1);
  const zero = Aset.every((X) => Bset.every((Y) => comm(X, Y).flat().every((x) => x === 0)));
  check('NUM: d = 4: six curls split 3 + 3 into commuting triples (page and an independent construction)', so4 && so4.cross === 0 && so4.closeA < 1e-12 && so4.closeB < 1e-12 && same(so4.sizes, [3, 3]) && zero);
  const lams = Array.from({ length: 21 }, (_, i) => i / 20);
  const joints = await page.evaluate((ls) => ls.map((l) => window.HILBERT_LEDGER_DEBUG.sweep('joint', l)), lams);
  check('NUM: along λ ∈ [0, 1] both local Bloch vectors stay 0 while T₁₁ = 1 − λ moves; PT < 0 exactly for λ < 1', joints.every((j, i) => j.normA === 0 && j.normB === 0
    && near(j.T[0][0], 1 - lams[i], 1e-12) && (lams[i] < 1 ? j.ptMin < -1e-12 : near(j.ptMin, 0, 1e-12))));
  const [j0, j1] = [joints[0], joints[20]];
  const idem = (M) => maxDiff(mm(M, M), M) < 1e-12;
  check('NUM: λ = 0 is the Bell density (rank 1, idempotent), λ = 1 the classical (|00⟩⟨00| + |11⟩⟨11|)/2 (not idempotent), same marginals', idem(j0.rho)
    && maxDiff(j0.rho, [[0.5, 0, 0, 0.5], [0, 0, 0, 0], [0, 0, 0, 0], [0.5, 0, 0, 0.5]]) < 1e-12 && j0.rhoSpectrum.filter((x) => Math.abs(x) > 1e-9).length === 1
    && maxDiff(j1.rho, [[0.5, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0.5]]) < 1e-12 && !idem(j1.rho) && same(j0.a, j1.a) && same(j0.b, j1.b) && maxDiff(j0.rho, j1.rho) > 0.4);
  const epss = Array.from({ length: 99 }, (_, i) => Math.round((0.01 + 0.005 * i) * 1000) / 1000);
  const tw = await page.evaluate((es) => es.map((e) => window.HILBERT_LEDGER_DEBUG.sweep('halt', e)), epss);
  check('NUM: every ε on the slider: K = ⌈ln ε / ln q⌉, tail q^K ≤ ε < q^{K−1}, modes ≥ ε ≤ 1/ε, all finite', tw.every((r, i) => {
    const e = epss[i], K = haltDepth(e); return r.K === K && near(r.tail, Q ** K, 1e-12) && r.tail <= e && Q ** (K - 1) > e && r.above === modesAbove(e) && r.above <= 1 / e;
  }) && tw[0].K === 11 && tw[98].K === 2);
}

/* ---------- every control, with the identities after each ---------- */
await pick('hypercube-illusion-unfold');
for (const v of [0, 0.25, 0.5, 1]) {
  await input('#unmix', v); const s = await state();
  check(`λ slider ${v}: state, rail, output and the leave-the-card rule`, s.lambda === v && s.t === v && s.preset === null && !s.playing
    && (await page.textContent('output[for="unmix"]')).trim() === v.toFixed(2) && Number(await page.locator('#now').inputValue()) === v);
  checkMath(s, `λ=${v}`);
}
for (const v of [0.01, 0.05, 0.12, 0.5]) {
  await input('#epsHalt', v); const s = await state();
  check(`ε slider ${v}: state, output, halting scene and K = ${haltDepth(v)}`, near(s.eps, v, 1e-15) && s.scene === 'halt' && s.halt.K === haltDepth(v) && s.preset === null
    && (await page.textContent('output[for="epsHalt"]')).trim() === v.toFixed(3));
  checkMath(s, `ε=${v}`);
}
for (const dd of [1, 2, 3, 4, 5]) {
  await page.click(`#dimChips [data-dim="${dd}"]`); await settle(page); const s = await state();
  check(`dimension chip d = ${dd}: cap scene, λ = (d − 1)/4, chip pressed`, s.scene === 'cap' && s.dim === dd && near(s.lambda, (dd - 1) / 4, 1e-12)
    && await page.locator(`#dimChips [data-dim="${dd}"]`).getAttribute('aria-pressed') === 'true' && s.preset === null);
  checkMath(s, `d=${dd}`);
}
for (const scene of ['unfold', 'joint', 'motion', 'cap', 'halt']) {
  await page.click(`#sceneChips [data-scene="${scene}"]`); await settle(page); const s = await state();
  check(`scene chip ${scene}: scene and pressed chip`, s.scene === scene && s.preset === null && await page.locator(`#sceneChips [data-scene="${scene}"]`).getAttribute('aria-pressed') === 'true'
    && (scene === 'cap') === !!(await page.$('#dimChips [aria-pressed="true"]')));
}
// the lens: the same state, read two ways
{
  await page.click('#sceneChips [data-scene="unfold"]'); await settle(page);
  const before = await state();
  await page.click('#lensToggleBtn'); await settle(page);
  const pooled = await state();
  const strip = (s) => { const { lens, labels, stageFrame, handle, ...rest } = s; return rest; };
  check('lens: pooled reading keeps every number of the state and says so(15) = 105', pooled.lens === 'pooled' && await page.locator('#lensToggleBtn').getAttribute('aria-pressed') === 'false'
    && same(strip(pooled), strip(before)) && (await page.textContent('#roKey')).trim() === '105' && /so\(15\) = 105/.test(await page.textContent('#hudBig')));
  await page.click('#lensToggleBtn'); await settle(page);
  check('lens: back to the ledger, 15 ≪ 105', (await state()).lens === 'ledger' && /15 ≪ 105/.test(await page.textContent('#roKey')));
}
// the rail drives λ in every scene
for (const v of [0, 0.4, 1]) {
  await input('#now', v); const s = await state();
  check(`rail λ = ${v}: state and the slider`, near(s.lambda, v, 1e-12) && Number(await page.locator('#unmix').inputValue()) === v);
  checkMath(s, `rail=${v}`);
}

// Drag the amber ring: λ in the unfolding (the Space ball's centre), ε on the cut of the tower; the camera stays.
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  await page.evaluate(() => window.HILBERT_LEDGER_DEBUG.setState({ scene: 'unfold', lens: 'ledger', lambda: 0.3 })); await settle(page);
  const before = await state(), hb = await page.evaluate(() => window.HILBERT_LEDGER_DEBUG.handleBox()), at = await page.evaluate(() => window.HILBERT_LEDGER_DEBUG.anchorPoint(0.3));
  const target = await page.evaluate(() => window.HILBERT_LEDGER_DEBUG.anchorPoint(0.8));
  check('handle (unfold): the projected button sits on the centre of the Space ball at λ', !!hb && await page.locator('#ledgerHandle').isVisible() && Math.hypot(hb.x - at.x, hb.y - at.y) < 1.5
    && near(Math.hypot(...before.unfold.centers[0]), 0.3 * 1.45, 1e-12));
  if (hb && target) {
    await page.mouse.move(hb.x, hb.y); await page.mouse.down();
    check('handle: pointerdown enters the dragging state', await page.locator('#ledgerHandle').evaluate((el) => el.classList.contains('dragging')));
    await page.mouse.move(target.x, target.y, { steps: 8 }); await page.mouse.up(); await settle(page);
    const after = await state();
    check('handle (unfold): dragging to the λ = 0.8 point sets λ ≈ 0.8 without turning the camera', Math.abs(after.lambda - 0.8) <= 0.02 && same(after.camera, before.camera)
      && !(await page.locator('#ledgerHandle').evaluate((el) => el.classList.contains('dragging'))), `λ ${after.lambda}`);
    checkMath(after, 'after the λ drag');
  }
  await page.focus('#ledgerHandle'); const l0 = (await state()).lambda;
  await page.keyboard.press('ArrowRight'); await settle(page);
  check('handle: → on the focused ring adds 0.02 to λ', near((await state()).lambda, Math.min(1, Math.round((l0 + 0.02) * 100) / 100), 1e-12));
  await page.evaluate(() => document.activeElement && document.activeElement.blur());

  await page.evaluate(() => window.HILBERT_LEDGER_DEBUG.setState({ scene: 'halt', lens: 'ledger', eps: 0.05, lambda: 1 })); await settle(page);
  const h0 = await page.evaluate(() => window.HILBERT_LEDGER_DEBUG.handleBox()), cut = await page.evaluate(() => window.HILBERT_LEDGER_DEBUG.spiralPoint(7.5));
  check('handle (halt): the ring sits on the cut after the 7th chamber', !!h0 && Math.hypot(h0.x - cut.x, h0.y - cut.y) < 1.5);
  const cam0 = (await state()).camera, to = await page.evaluate(() => window.HILBERT_LEDGER_DEBUG.spiralPoint(9.5));
  await page.mouse.move(h0.x, h0.y); await page.mouse.down(); await page.mouse.move(to.x, to.y, { steps: 8 }); await page.mouse.up(); await settle(page);
  const s = await state(), want = Math.round(Q ** 9 * 200) / 200;
  check('handle (halt): dragging inwards to the 9th gap lowers ε to ≈ q⁹ and deepens K', Math.abs(s.eps - want) <= 0.005 + 1e-12 && s.halt.K === haltDepth(s.eps) && s.halt.K >= 9
    && same(s.camera, cam0), `ε ${s.eps} K ${s.halt.K}`);
  checkMath(s, 'after the ε drag');
  await page.focus('#ledgerHandle'); const e0 = (await state()).eps;
  await page.keyboard.press('ArrowLeft'); await settle(page);
  check('handle (halt): ← on the focused ring lowers ε by 0.005', near((await state()).eps, Math.max(0.01, Math.round((e0 - 0.005) * 200) / 200), 1e-12));
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
  await page.evaluate(() => window.HILBERT_LEDGER_DEBUG.setState({ scene: 'cap', lambda: 0.5 })); await settle(page);
  check('handle (cap): no handle on the field cap (the dimension is a chip or the rail)', await page.locator('#ledgerHandle').isHidden());
}

// A drag on the empty stage turns the camera and leaves λ alone.
{
  await page.evaluate(() => window.HILBERT_LEDGER_DEBUG.setState({ scene: 'unfold', lambda: 1 })); await settle(page);
  const before = await state(), box = await page.evaluate(() => { const r = document.getElementById('stage').getBoundingClientRect(); return [r.left + r.width * 0.93, r.top + r.height * 0.5]; });
  await page.mouse.move(box[0], box[1]); await page.mouse.down(); await page.mouse.move(box[0] - 60, box[1] - 20, { steps: 6 }); await page.mouse.up(); await settle(page);
  const after = await state();
  check('orbit: a drag on empty stage turns the camera, λ unchanged', after.lambda === before.lambda && (after.camera.yaw !== before.camera.yaw || after.camera.pitch !== before.camera.pitch));
}

await page.click('#infoBtn'); await settle(page);
check('info button opens the theory drawer', await page.locator('#drawer [role="dialog"]').isVisible());
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').isHidden());
check('play: ▶ advances λ', await playsAfter(page, () => page.click('#play'), () => ({ playing: window.HILBERT_LEDGER_DEBUG.state.playing, t: window.HILBERT_LEDGER_DEBUG.state.t })));
await pause();
{ const paused = await state(); await settle(page, 50); check('pause holds λ', !paused.playing && same((await state()).lambda, paused.lambda)); }

/* ---------- desktop, phone and the 334 × 520 cited figure, in both languages and on every card ---------- */
const VIEWS = [['desktop', 1440, 900, ''], ['phone', 390, 844, '']];
for (const lang of ['zh', 'en']) for (const [kind, width, height, q] of VIEWS) {
  const p = await T.open(BOOK, ID, `?lang=${lang}${q}`, { viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
  await settle(p);
  const tag = `${kind} ${width}×${height} ${lang}`;
  await checkLinks(p, tag);
  for (const card of Object.keys(CARDS)) {
    await pick(card, p); const s = await state(p);
    check(`${tag}/${card}: the card applies`, s.preset === card && !s.playing);
    const view = await stageView(p, '#stage', false), overlaps = await labelOverlaps(p, '.stage .tag', 0), caps = await capitalGreek(p);
    check(`${tag}/${card}: stage layout, HUD, labels, capitals and overflow`, view.layout.length === 0 && view.hud.length === 0 && overlaps.length === 0 && caps.length === 0 && await overflowX(p) <= 0,
      [...view.layout, ...view.hud, ...overlaps.map((o) => o.join(' / ')), ...caps].slice(0, 4).join(' | '));
    if (lang === 'en') check(`${tag}/${card}: no visible Chinese`, (await cjkLeftovers(p)).length === 0);
  }
  check(`${tag}: palette still absent`, await p.evaluate(() => document.documentElement.dataset.trPalette === undefined));
  await p.context().close();
}
for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) {
  const p = await T.open(BOOK, ID, `?embed=1&preset=${card}&lang=${lang}`, { viewport: { width: 334, height: 520 }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
  await settle(p);
  await p.locator('#play').evaluate((b) => { if (b.getAttribute('aria-pressed') === 'true') b.click(); });
  await settle(p);
  const tag = `cited 334×520 ${lang}/${card}`, s = await state(p);
  check(`${tag}: opens on the card as a figure`, s.preset === card && await p.evaluate(() => TRV.figure && TRV.embed));
  const view = await stageView(p, '#stage', true), overlaps = await labelOverlaps(p), strict = await labelOverlaps(p, '.stage .tag', 0), caps = await capitalGreek(p);
  check(`${tag}: stageView layout [] and hud []`, view.layout.length === 0 && view.hud.length === 0, [...view.layout, ...view.hud].slice(0, 4).join(' | '));
  check(`${tag}: labels apart, no capital Greek, no sideways scroll`, overlaps.length === 0 && strict.length === 0 && caps.length === 0 && await overflowX(p) === 0);
  if (lang === 'en') check(`${tag}: no visible Chinese`, (await cjkLeftovers(p)).length === 0, (await cjkLeftovers(p)).slice(0, 3).join(' | '));
  check(`${tag}: the figure note is the short one, no sub- or superscripts`, await p.evaluate(() => { const n = document.querySelector('.tour .tour-note'); return !!n && n.textContent.trim().length > 8 && !n.querySelector('sub, sup'); }));
  checkMath(s, tag);
  await p.context().close();
}

/* ---------- stills: the frame PDF and EPUB print, with the numbers its caption gives ---------- */
if (!PHASE1) for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) {
  const p = await openStill(T, BOOK, ID, card, lang), s = await state(p);
  check(`still ${lang}/${card}: declared frame, paused, handle hidden`, s.preset === card && !s.playing && near(s.lambda, CARDS[card].lam, 1e-12)
    && await p.evaluate(() => TRV.still && TRV.shot && document.getElementById('ledgerHandle').hidden && document.documentElement.dataset.trPalette === undefined));
  checkMath(s, `still ${lang}/${card}`);
  if (card === 'unhalted-infinity-truncation') check(`still ${lang}/${card}: K = 7 at ε = 0.050`, s.halt.K === 7 && s.eps === 0.05);
  if (card === 'hodge-curl-field-cap-3d') check(`still ${lang}/${card}: the still shows d = 3`, s.dim === 3);
  await p.context().close();
}

check('palette: every observed document stayed undefined', paletteDocuments.length > 0 && paletteDocuments.every((r) => r.absent), JSON.stringify(paletteDocuments.filter((r) => !r.absent)));
check('palette: zero attempted writes', paletteMutations.length === 0, JSON.stringify(paletteMutations));
check('zero page, console and request errors', T.errors.length === 0, T.errors.join(' | '));
check('zero browser console warnings after driver filtering', browserWarnings.length === 0, browserWarnings.slice(0, 4).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, T.warnings.map((w) => `${w.name}: ${w.detail}`).join(' | '));
await T.finish();
