// ARC//CALCULUS browser regression: the shared stage-first gate, every reader control, and every number the page
// claims, checked against algorithms written here (not the page's own functions): Simpson quadrature of the intrinsic
// equation for the ramp, sin²φ/(1 + cos φ) for the sagitta, Taylor series for e^{φÎ} and for the complex step of
// eˣ sin x, the logarithm series for (1 − v)^N, power-series matrix exponentials for Lie–Trotter, the Van Oosterom–
// Strackee formula and composite Simpson along normalized chords for the hemisphere fan, BigInt cochains, a dual-graph
// count for the 𝔽₂ rank and every tetrahedral coboundary on the shells.
// Run directly with node; VIZ_PHASE1=1 skips the repeated card/still matrix, VIZ_SLOW_FRAMES=1000 spaces the frames.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, overflowX, labelOverlaps, capitalGreek } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'arc-body-calculus-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const PHASE1 = process.env.VIZ_PHASE1 === '1';
const CARDS = {
  'osculating-rotor-vs-tangent': { scene: 'rotor', elog: -0.5, alpha: 1, M: 4, still: 0.88 },
  'blind-zone-complex-step': { scene: 'complex', theta: 90, alpha: 1, M: 4, still: 0.85 },
  'roughness-ito-phase-transition': { scene: 'tube', theta: 90, elog: -3, M: 4, still: 1 },
  'finite-mesh-stokes-cancellation': { scene: 'stokes', theta: 90, elog: -0.5, alpha: 1, M: 4, still: 0.65 },
  'coboundary-d2-zero-closed-shell': { scene: 'shell', theta: 90, elog: -0.5, alpha: 1, M: 8, still: 1 }
};
const STILL_ATTR = { 'osculating-rotor-vs-tangent': '0.88', 'blind-zone-complex-step': '0.85', 'roughness-ito-phase-transition': 'end', 'finite-mesh-stokes-cancellation': '0.65', 'coboundary-d2-zero-closed-shell': 'end' };
const GIDS = [
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  'D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary',
  'D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square',
  'D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow',
  'D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le',
  'D5/S3/Quantum/Analysis/TrotterProduct.trotter_product',
  'D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact',
  'D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness'
];
const THEORY = 'ch34-s30-arc-body-calculus-and-finite-stokes.html';
const THEORY_LINKS = ['zh', 'en'].map((lang) => `../../${lang}/${THEORY}`);
const OPEN_LINKS = ['zh', 'en'].flatMap((lang) => [`../../${lang}/${THEORY}#prob-ch34-rough-nonabelian-surface-calculus`,
  `../../${lang}/ch34-s24-interaction-sign-and-sagitta-composition.html#prob-ch34-gravity-dynamics-and-coupling`,
  `../../${lang}/ch34-s29-arithmetic-pivots-and-resonant-tunneling.html#prob-ch34-arithmetic-pivot-area-law`]);
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
  await context.exposeBinding('__arcPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__arcPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__arcPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined }).catch(() => {}), { once: true });
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
const DEG = Math.PI / 180;
/** Composite Simpson on [a, b] with n (even) intervals. */
function simpson(f, a, b, n = 2000) { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; }
/** The ramp at tangent angle θ by quadrature of ρ(t)(cos t, sin t), ρ(t) = 0.62 − 0.08t. */
const rampQuad = (th) => (th === 0 ? [0, 0] : [simpson((t) => (0.62 - 0.08 * t) * Math.cos(t), 0, th), simpson((t) => (0.62 - 0.08 * t) * Math.sin(t), 0, th)]);
/** The sagitta 1 − cos φ without a subtraction: sin²φ/(1 + cos φ). */
const sagitta = (phi) => Math.sin(phi) ** 2 / (1 + Math.cos(phi));
/** The 2 × 2 matrix exponential of φÎ, Î = [[0, −1], [1, 0]], by its power series (40 terms). */
function expJ(phi) {
  // term_k = term_{k−1}·(φÎ)/k, with (M·Î) = [[m01, −m00], [m11, −m10]]
  let E = [[1, 0], [0, 1]], term = [[1, 0], [0, 1]];
  for (let k = 1; k <= 40; k++) {
    term = [[term[0][1] * phi / k, -term[0][0] * phi / k], [term[1][1] * phi / k, -term[1][0] * phi / k]];
    E = E.map((r, i) => r.map((x, j) => x + term[i][j]));
  }
  return E;
}
/** The largest singular value of a 2 × 2 matrix, from the eigenvalues of MᵀM. */
function opNorm(M) { const a = M[0][0] ** 2 + M[1][0] ** 2, b = M[0][0] * M[0][1] + M[1][0] * M[1][1], d = M[0][1] ** 2 + M[1][1] ** 2; return Math.sqrt((a + d) / 2 + Math.sqrt(((a - d) / 2) ** 2 + b * b)); }
/** Im f(1 + iε)/ε for f = eˣ sin x by its Taylor series Σ (−1)ᵏ ε²ᵏ f⁽²ᵏ⁺¹⁾(1)/(2k + 1)!, f⁽ⁿ⁾(x) = 2^{n/2} eˣ sin(x + nπ/4). */
function csSeries(eps) { let s = 0, fact = 1; for (let k = 0; k < 30; k++) { const n = 2 * k + 1; if (k > 0) fact *= (2 * k) * (2 * k + 1); s += (k % 2 ? -1 : 1) * eps ** (2 * k) * 2 ** (n / 2) * Math.E * Math.sin(1 + n * Math.PI / 4) / fact; } return s; }
const FPRIME = Math.E * (Math.sin(1) + Math.cos(1));
/** (1 − v)^N by the logarithm series of log(1 − v) for small v. */
const meanZ = (v, N) => Math.exp(N * (v < 1e-3 ? -(v + v * v / 2 + v ** 3 / 3 + v ** 4 / 4) : Math.log(1 - v)));
/** 3 × 3 helpers and a power-series matrix exponential. */
const m3 = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, a, k) => s + a * B[k][j], 0)));
function exp3(A) { let E = [[1, 0, 0], [0, 1, 0], [0, 0, 1]], t = E; for (let k = 1; k <= 30; k++) { t = m3(t, A).map((r) => r.map((x) => x / k)); E = E.map((r, i) => r.map((x, j) => x + t[i][j])); } return E; }
const KX = [[0, 0, 0], [0, 0, -1], [0, 1, 0]], KY = [[0, 0, 1], [0, 0, 0], [-1, 0, 0]];
function trotterIndependent(n) {
  const step = m3(exp3(KX.map((r) => r.map((x) => 0.8 * x / n))), exp3(KY.map((r) => r.map((x) => 0.6 * x / n))));
  let R = [[1, 0, 0], [0, 1, 0], [0, 0, 1]], B = step, k = n; while (k > 0) { if (k & 1) R = m3(R, B); B = m3(B, B); k = Math.floor(k / 2); }
  const ex = exp3(KX.map((r, i) => r.map((x, j) => 0.8 * x + 0.6 * KY[i][j])));
  let e = 0; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) e += (R[i][j] - ex[i][j]) ** 2;
  return Math.sqrt(e);
}
/** The area of a spherical triangle (Van Oosterom–Strackee). */
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], crs = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const unit = (a) => { const n = Math.hypot(...a); return a.map((x) => x / n); };
const vos = (a, b, c) => 2 * Math.atan2(Math.abs(dot(a, crs(b, c))), 1 + dot(a, b) + dot(b, c) + dot(c, a));
/** ∫ (1 − z) dφ along the great-circle arc a → b, parametrized by normalized chords, composite Simpson. */
function arcSimpson(a, b) {
  const d = b.map((x, i) => x - a[i]);
  const f = (t) => {
    const L = a.map((x, i) => x + t * d[i]), n = Math.hypot(...L), u = L.map((x) => x / n), k = dot(u, d), du = d.map((x, i) => (x - k * u[i]) / n);
    return (u[0] * du[1] - u[1] * du[0]) / (1 + u[2]);
  };
  return simpson(f, 0, 1, 4000);
}
const gauge = (p) => 0.8 * p[0] + 0.45 * p[1];
/** Exact cochains with BigInt (values are multiples of 2⁻²⁰). */
const toInt = (x) => { const k = x * 1048576; if (!Number.isInteger(k)) throw new Error(`not dyadic: ${x}`); return BigInt(k); };

/** Every claim of the state s, recomputed here. */
function checkMath(s, tag) {
  // rotor
  const r = s.rotor, th = s.theta * DEG, eps = 10 ** s.elog, rho = 0.62 - 0.08 * th, phi = eps / rho;
  const [qx, qz] = rampQuad(th);
  check(`${tag}: the ramp point is ∫ρ(cos, sin) at θ = ${s.theta.toFixed(1)}°`, near(r.x, qx, 1e-11) && near(r.z, qz, 1e-11), `${r.x - qx}, ${r.z - qz}`);
  const v = sagitta(phi), c = Math.sin(phi);
  check(`${tag}: chord c = sin κε and sagitta v = 2 sin²(κε/2) (no cancellation)`, near(r.phi, phi, 1e-15 * Math.max(1, phi)) && near(r.c, c, 2e-15) && Math.abs(r.v - v) <= 2e-15 * Math.max(v, 1e-300) + 1e-300 && r.v > 0,
    `${r.v} vs ${v}`);
  check(`${tag}: (1 − v)² + c² = 1 and |D̂_ε| = 1`, near(r.identity, 1, 2e-15) && near(r.rotorNorm, 1, 2e-15) && (r.identity).toFixed(6) === '1.000000');
  check(`${tag}: cos κε rounds to 1 exactly when κε is tiny`, r.cosIsOne === (Math.cos(phi) === 1) && (phi < 1e-8 ? r.cosIsOne : true));
  check(`${tag}: Lagrange |u|²|w|² − (u·w)² = (u ∧ w)²`, Math.abs(r.lagrange.lhs - r.lagrange.rhs) <= 4.5e-16 && near(r.lagrange.rhs, Math.sin(phi) ** 2, 4e-16));
  check(`${tag}: Î skew-adjoint unitary with Î² = −1; balanced J = 2ABᴴ squares to −1`, r.J.skew === 0 && r.J.unit === 0 && r.J.square === 0 && r.balanced.cross < 1e-15 && r.balanced.aa < 1e-15 && r.balanced.bb < 1e-15 && r.balanced.jsq < 1e-15);
  check(`${tag}: Born weight p = cos²(φ/2) = 1 − v/2 and p′ = −½ sin φ = −c/2`, near(r.flow.p, Math.cos(phi / 2) ** 2, 1e-15) && near(r.flow.p, 1 - v / 2, 1e-15) && near(r.flow.dp, -0.5 * Math.sin(phi), 1e-15)
    && (phi < 1e-3 || near(r.flow.dp, (Math.cos((phi + 1e-6) / 2) ** 2 - Math.cos((phi - 1e-6) / 2) ** 2) / 2e-6, 1e-8)));
  // below φ = 10⁻³ the series difference itself would cancel: there the tail is √(v² + (φ − sin φ)²) with φ − sin φ by its series
  const E = expJ(phi), tail = phi >= 1e-3 ? opNorm([[E[0][0] - 1, E[0][1] + phi], [E[1][0] - phi, E[1][1] - 1]]) : Math.hypot(v, phi ** 3 / 6 - phi ** 5 / 120);
  check(`${tag}: Taylor tail ‖e^{φÎ} − (1 + φÎ)‖ (series) under the bound φ²e^φ/2`, near(r.taylor.tail, tail, 1e-9 * tail + 1e-300) && r.taylor.tail <= r.taylor.bound
    && near(r.taylor.bound, phi * phi / 2 * Math.exp(phi), 1e-14 * Math.max(1, r.taylor.bound)), `${r.taylor.tail} vs ${tail}`);
  // complex step
  const st = s.step, se = 10 ** s.elog, series = csSeries(se);
  check(`${tag}: complex step Im f(x₀ + iε)/ε against the Taylor series`, Math.abs(st.cs - series) <= 6e-16 * FPRIME && near(st.exact, FPRIME, 1e-15) && near(st.csErr, Math.abs(st.cs - FPRIME) / FPRIME, 1e-17));
  if (1 + se === 1) check(`${tag}: ε below half an ulp: x₀ + ε = x₀, the forward difference is 0, 100% off`, st.swallowed && st.fd === 0 && st.fdErr === 1);
  if (s.elog <= -8) check(`${tag}: the complex step is exact to machine precision (≤ 4×10⁻¹⁶)`, st.csErr <= 4e-16);
  // roughness: the partition exponent is clamped at log₁₀ ε = −6, so N ≤ 10⁶ is a safe integer on every CPU (unclamped,
  // round(1/ε) at ε = 10⁻¹⁷ lies above 2⁵³ and one ulp of pow(10, −17) moves it by 16); the complex step keeps the full sweep
  const ro = s.rough, rlog = Math.max(-6, s.elog), re = 10 ** rlog, N = Math.max(1, Math.round(10 ** -rlog)), rphi = re ** s.alpha, rv = sagitta(rphi);
  check(`${tag}: Σ_sag = N·2 sin²(σ₀ε^α/2), E[z] = (1 − v)^N, ½σ₀²Tε^{2α−1} at log₁₀ ε = max(−6, ${s.elog.toFixed(2)})`, ro.rlog === rlog && ro.N === N && Number.isSafeInteger(ro.N) && ro.N <= 1e6
    && Math.abs(ro.sum - N * rv) <= 1e-14 * Math.max(1e-300, N * rv) + 1e-300 && near(ro.meanZ, meanZ(rv, N), 1e-12)
    && near(ro.lead, 0.5 * re ** (2 * s.alpha - 1), 1e-12 * Math.max(1, ro.lead)) && ro.sum <= 0.5 + 1e-12, `N ${ro.N} vs ${N}`);
  const w = s.walk, nd = Math.min(N, 1000);
  check(`${tag}: the drawn walk: ${nd} steps from the pole on the unit sphere, same Σφ² as N steps`, w.nd === nd && same(w.start, [0, 0, 1]) && w.maxNormErr < 1e-12 && near(nd * w.pd ** 2, N * rphi ** 2, 1e-12 * N * rphi ** 2 + 1e-300));
  check(`${tag}: Lie–Trotter error at n = ${s.trotter.n} (power-series exponentials)`, s.trotter.n === Math.min(N, 100000) && near(s.trotter.err, trotterIndependent(s.trotter.n), 1e-9 + 1e-6 * s.trotter.err));
  // the hemisphere fan
  const sk = s.stokes;
  check(`${tag}: fan of M = ${sk.M}: Girard excess equals Van Oosterom–Strackee`, sk.tris.length === sk.M && sk.tris.every((t) => near(t.omega, vos(t.a, t.b, t.c), 1e-12)));
  check(`${tag}: fan: each triangle ∮∂ΔT 𝒜 = Ω (page) and its arcs by Simpson`, sk.tris.every((t) => near(t.circ, t.omega, 1e-12))
    && sk.tris.every((t) => [[t.a, t.b], [t.b, t.c], [t.c, t.a]].every(([p0, p1], i) => near(t.edges[i], arcSimpson(p0, p1) + gauge(p1) - gauge(p0), 1e-9))));
  check(`${tag}: fan: interior pairs cancel, rim = Σ Ω = 2π, plane graph V − E + F = 2`, sk.pairMax < 1e-12 && sk.pairs.every((p) => near(p.plus, -p.minus, 1e-12)) && near(sk.rim, 2 * Math.PI, 1e-12) && near(sk.sumOmega, 2 * Math.PI, 1e-12)
    && sk.rimErr < 1e-12 && sk.graph.chi === 2 && sk.graph.V - sk.graph.E + sk.graph.F === 2 && sk.graph.rimEdges === sk.M);
  // the closed shell
  const sh = s.shell;
  const dirs = new Map(); sh.faces.forEach((f) => f.forEach((a, i) => { const b = f[(i + 1) % 3]; dirs.set(`${a}>${b}`, (dirs.get(`${a}>${b}`) || 0) + 1); }));
  const closed = [...dirs.keys()].every((k) => { const [a, b] = k.split('>'); return dirs.get(k) === 1 && dirs.get(`${b}>${a}`) === 1; });
  const outward = sh.faces.every(([a, b, c]) => { const A = sh.verts[a], B = sh.verts[b], C = sh.verts[c]; return dot(crs(B.map((x, i) => x - A[i]), C.map((x, i) => x - A[i])), A.map((x, i) => x + B[i] + C[i])) > 0; });
  const V = sh.verts.length, Ecount = dirs.size / 2;
  check(`${tag}: shell M = ${sh.M}: a closed oriented surface with V − E + F = 2 and F = M`, closed && outward && sh.F === sh.M && sh.V === V && sh.E === Ecount && V - Ecount + sh.F === 2 && sh.chi === 2);
  const A = sh.A.map((row) => row.map(toInt)), phiI = sh.phi.map(toInt);
  const chordOk = sh.A.every((row, i) => row.every((x, j) => i === j ? x === 0 : near(x, Math.round(1048576 * (() => { const a = sh.verts[i], b = sh.verts[j]; return simpson((t) => { const p = a.map((q, k) => q + t * (b[k] - q)), d = b.map((q, k) => q - a[k]); return p[0] * d[1] - 0.6 * p[2] * d[0] + 0.3 * p[1] * d[2]; }, 0, 1, 2); })()) / 1048576, 0)));
  check(`${tag}: shell: A is ∫ω along each chord, rounded to 2⁻²⁰, antisymmetric`, chordOk && A.every((row, i) => row.every((x, j) => x === -A[j][i])));
  check(`${tag}: shell: curl grad φ = 0 on every face, Σ curl A = 0 (BigInt)`, sh.faces.every(([a, b, c], fi) => (phiI[b] - phiI[a]) + (phiI[c] - phiI[b]) + (phiI[a] - phiI[c]) === 0n && sh.curlGrad[fi] === 0)
    && sh.faces.reduce((acc, [a, b, c]) => acc + A[a][b] + A[b][c] + A[c][a], 0n) === 0n && sh.divCurl === 0 && sh.faces.every(([a, b, c], fi) => toInt(sh.curlA[fi]) === A[a][b] + A[b][c] + A[c][a]));
  let bad = 0; const F3 = (i, j, k) => A[j][k] - A[i][k] + A[i][j];
  for (let q = 0; q < V; q++) for (let i = 0; i < V; i++) for (let j = 0; j < V; j++) for (let k = 0; k < V; k++) if (F3(i, j, k) - F3(q, j, k) + F3(q, i, k) - F3(q, i, j) !== 0n) bad++;
  let unrepaired = 0; for (let i = 0; i < V; i++) for (let j = 0; j < V; j++) for (let k = 0; k < V; k++) if (F3(0, j, k) - F3(0, i, k) + F3(0, i, j) !== F3(i, j, k)) unrepaired++;
  check(`${tag}: shell: all ${V ** 4} tetrahedral coboundaries of δA vanish, the root-0 repair recovers F`, bad === 0 && sh.defects === 0 && sh.quadruples === V ** 4 && unrepaired === 0 && sh.repairs === 0);
  // 𝔽₂: the kernel of the face-boundary map is spanned by the dual-graph components, so rank = F − (#components)
  const parent = sh.faces.map((_, i) => i), find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  const byEdge = new Map(); sh.faces.forEach((f, fi) => f.forEach((a, i) => { const b = f[(i + 1) % 3], key = a < b ? `${a},${b}` : `${b},${a}`; if (byEdge.has(key)) parent[find(fi)] = find(byEdge.get(key)); else byEdge.set(key, fi); }));
  const comps = new Set(sh.faces.map((_, i) => find(i))).size;
  check(`${tag}: shell: 𝔽₂ rank F − 1 (dual graph connected), all faces have zero boundary, cycle space E − V + 1`, comps === 1 && sh.rank === sh.F - comps && sh.allFacesOdd === 0 && sh.cycleDim === Ecount - V + 1 && sh.rank === sh.cycleDim);
  check(`${tag}: shell: Σ Ω = 4π (Van Oosterom–Strackee)`, near(sh.sumOmega, 4 * Math.PI, 1e-11) && sh.faces.every(([a, b, c], fi) => near(sh.omega[fi], vos(sh.verts[a], sh.verts[b], sh.verts[c]), 1e-12)));
}

/* ---------- source and registry ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
// forbidden words are kept as code points so this suite itself carries no such identifier
const [numbered, ...forbidden] = [
  [103, 112, 116], [99, 108, 97, 117, 100, 101], [97, 110, 116, 104, 114, 111, 112, 105, 99], [111, 112, 101, 110, 97, 105],
  [103, 101, 109, 105, 110, 105], [99, 111, 100, 101, 120], [99, 111, 112, 105, 108, 111, 116], [111, 112, 117, 115],
  [115, 111, 110, 110, 101, 116], [104, 97, 105, 107, 117], [108, 108, 109], [99, 104, 97, 116, 103, 112, 116], [97, 103, 101, 110, 116], [97, 105]
].map((codes) => String.fromCharCode(...codes));
const identifiers = new RegExp(`\\b(?:${forbidden.join('|')}|${numbered}-?\\d)\\b`, 'i');
const suite = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
for (const [file, src] of Object.entries({ ...sources, 'test suite': suite })) {
  if (file !== 'test suite') check(`source ${file}: no literal colour and no palette switch`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(src) && !/\btrPalette\b|data-tr-palette/.test(src));
  check(`source ${file}: no model, vendor or tool identifiers`, !identifiers.test(src));
}
check('source (K1): the sagitta is 2 sin²(φ/2), never 1 − cos φ', /2 \* Math\.sin\(phi \/ 2\) \*\* 2/.test(sources['main.js']) && !/1\s*-\s*Math\.cos\s*\(/.test(sources['main.js']));
check('source: shared three-column grid (only the two rail switches set columns), wheel:false, a looping clock, container size on the stage', [...sources['style.css'].matchAll(/([^{}]+)\{[^}]*grid-template-columns[^}]*\}/g)].every((m) => /^\s*(?:\/\*[\s\S]*?\*\/\s*)?\.(?:lens-toggle|scene-switch)\s*$/.test(m[1]))
  && /wheel:\s*false/.test(sources['main.js']) && /loop:\s*true/.test(sources['main.js']) && /#stage\s*\{\s*container-type:\s*size;/.test(sources['style.css']));
check('source: the five public presets stay in order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((x) => x[1]), Object.keys(CARDS)));
check('source: no green tick outside the evidence boxes in the script', !/okmark/.test(sources['main.js']) && !/okmark/.test(sources['index.html']));
check('source: no possessive ’s in the page text', !/’s\b/.test(sources['index.html'] + sources['main.js']));
check('source (K6): amber only for the card, the toggle and the stage handle', !/P\.amber|\bc-am\b|sw am\b|\.pill\.hot|class="pill hot"/.test(sources['main.js'] + sources['index.html'])
  && [...sources['style.css'].matchAll(/([^{}]+)\{[^}]*--amber[^}]*\}/g)].every((m) => /\.handle|lens-toggle|scene-switch/.test(m[1])));
check('source (Rule 2): no amber readout rule, no red or green token, class or palette key', !/dl\.ro[^{}]*\{[^}]*--amber/.test(sources['style.css'])
  && !/--(?:warn|ok)\b|\bc-(?:wn|ok)\b|\.sw\.(?:wn|ok)\b/.test(sources['style.css'] + sources['main.js']) && !/\b(?:c-wn|c-ok)\b|class="sw (?:wn|ok)"/.test(sources['index.html'])
  && !/\b(?:P|palette)\.(?:warn|ok|red|green)\b|\[['"](?:wn|ok)['"]/.test(sources['main.js']));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID);
check('registry: live §34.30 entry with five bilingual cards and the eight theorems', !!entry && entry.status === 'live' && entry.chapter === 34 && entry.section === '34.30'
  && entry.code === 'ARC//CALCULUS' && same(entry.presets, Object.keys(CARDS)) && entry.presets.every((c) => entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same(entry.lean.map((x) => x.gid).sort(), [...GIDS].sort()) && entry.theory.some((t) => t.href === `../zh/${THEORY}` && t.href_en === `../en/${THEORY}`));
const chapterCitations = ['zh', 'en'].map((lang) => {
  const chapter = fs.readFileSync(path.join(DIR, '..', '..', lang, THEORY.replace(/\.html$/, '.md')), 'utf8');
  const citations = [...chapter.matchAll(/^::: \{\.viz\b([^\n}]*)\}\n([\s\S]*?)^:::[ \t]*$/gm)]
    .map((m) => ({ ...Object.fromEntries([...m[1].matchAll(/([\w-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]])), caption: m[2].trim(), end: m.index + m[0].length }))
    .filter((attrs) => attrs.src === ID);
  return { lang, chapter, citations };
});
for (const [i, card] of [...Object.keys(CARDS), null].entries()) {
  check(`ch34-s30 citation ${i + 1}/6: both editions wire ${card ? `fig-${card} at 500px` : 'the complete lab at the 640px chapter tail'}`, chapterCitations.every(({ chapter, citations }) => {
    const c = citations[i];
    return citations.length === 6 && (c.preset || null) === card && c.height === (card ? '500' : '640')
      && c.caption.length > 20 && c.caption.includes(card || ID) && (card || chapter.slice(c.end).trim() === '');
  }));
}

/* ---------- runtime: contract, links, cards ---------- */
const state = (p = page) => p.evaluate(() => window.ARC_CALCULUS_DEBUG.state);
async function pause(p = page) {
  await settle(p);
  await p.locator('#play').evaluate((b) => { if (b.getAttribute('aria-pressed') === 'true') b.click(); });
  await settle(p);
}
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
  await settle(p);
}
/** Click a card, pause it, and park the rail on the card's declared still (the frame its figure shows). Moving the rail
    keeps the card (only leave() clears it). */
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  await until(p, (q) => window.ARC_CALCULUS_DEBUG.state.scene === q, CARDS[card].scene);
  await pause(p);
  await input('#now', CARDS[card].still, p);
}
async function checkLinks(p, tag) {
  check(`${tag}: exact Lean evidence links in green boxes`, same(await p.$$eval('[data-lean-gid]', (els) => els.map((e) => e.dataset.leanGid).sort()), [...GIDS].sort())
    && await p.$$eval('[data-lean-gid]', (els) => els.every((e) => e.closest('.col.side #evidence .lean') && e.closest('.lean').querySelector('.ok')?.textContent.trim() === 'LEAN ✓')));
  check(`${tag}: eight green boxes, one ARGUED, one MODEL, one NUM and three red OPEN boxes`, await p.$$eval('#evidence > .lean', (els) => els.filter((e) => e.className === 'lean').length) === 8
    && same(await p.$$eval('#evidence .lean:not([class="lean"])', (els) => els.map((e) => e.className).sort()), ['lean argued', 'lean model', 'lean num', 'lean open', 'lean open', 'lean open']));
  check(`${tag}: the OPEN boxes name the §34.30 rough non-abelian surface problem, the §34.24 gravity problem and the §34.29 area law`, await p.$$eval('#evidence .lean.open', (els) => els.length === 3
    && /prob-ch34-rough-nonabelian-surface-calculus/.test(els[0].textContent) && /prob-ch34-gravity-dynamics-and-coupling/.test(els[1].textContent) && /prob-ch34-arithmetic-pivot-area-law/.test(els[2].textContent))
    && same(await p.$$eval('#evidence .lean.open a', (els) => els.map((e) => e.getAttribute('href')).sort()), [...OPEN_LINKS].sort()));
  check(`${tag}: exact bilingual theory link in the drawer`, same(await p.$$eval('#drawer .refs a', (els) => els.map((e) => e.getAttribute('href')).sort()), [...THEORY_LINKS].sort()));
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
    && !!center.querySelector(':scope > #stage') && !!center.querySelector(':scope > .tour') && !!center.querySelector(':scope > .strip')
    && !!side.querySelector(':scope > #readouts dl.ro') && !!side.querySelector(':scope > #evidence') && !!document.querySelector('.center > .strip #plot') && !document.querySelector('#stage #plot')
    && !!document.querySelector('#stage > button.handle#calcHandle') && getComputedStyle(document.getElementById('stage')).containerType === 'size';
}));
check('shell: #rail holds the lens toggle, five cards with a note and #ctlPanel with the scene switch and the four sliders; #infoBtn opens #evidence', await page.evaluate(() => {
  const rail = document.querySelectorAll('#rail'), info = document.getElementById('infoBtn'), r = rail[0];
  return rail.length === 1 && r.matches('.app.lab > aside.col.deck') && document.querySelector('.app.lab > footer.rail')?.id !== 'rail'
    && !!r.querySelector('button.lens-toggle#lensToggleBtn') && r.querySelectorAll('.presets.cards#presets > button.preset[data-preset]').length === 5 && !!r.querySelector('#presetNote')
    && !!r.querySelector('#ctlPanel #sceneSwitch') && r.querySelectorAll('#ctlPanel #sceneSwitch [data-scene]').length === 5
    && ['turnAngle', 'apertureLog', 'roughAlpha', 'meshM'].every((id) => !!r.querySelector(`#ctlPanel input[type=range]#${id}`))
    && document.getElementById('evidence').matches('.col.side #evidence') && document.getElementById('evidence').firstElementChild === info
    && info.matches('button.chip[type="button"]') && info.nextElementSibling?.tagName === 'H2'
    && Number(document.getElementById('roughAlpha').min) === 0.5 && Number(document.getElementById('roughAlpha').max) === 1;
}));
check('colours (Rule 2): readouts are never amber, the key readout is neutral sigma; red only in OPEN boxes, green only in LEAN boxes', await page.evaluate(() => {
  const probe = (v) => { const e = document.createElement('i'); e.style.color = `var(${v})`; document.body.append(e); const c = getComputedStyle(e).color; e.remove(); return c; };
  const amber = probe('--amber'), sigma = probe('--sigma'), warn = probe('--warn'), ok = probe('--ok');
  const paints = (el, c) => { const st = getComputedStyle(el); return [st.color, st.backgroundColor, st.borderTopColor, st.borderBottomColor, st.borderLeftColor, st.borderRightColor].includes(c); };
  const all = [...document.querySelectorAll('body *')], keys = [...document.querySelectorAll('dl.ro .key dd output')];
  return new Set([amber, sigma, warn, ok]).size === 4 && keys.length === 1 && keys.every((o) => getComputedStyle(o).color === sigma)
    && [...document.querySelectorAll('dl.ro output, dl.ro dd, dl.ro dt')].every((o) => getComputedStyle(o).color !== amber)
    && [...document.querySelectorAll('#stage *')].every((el) => el.id === 'calcHandle' || !paints(el, warn))
    && all.filter((el) => paints(el, warn)).every((el) => el.closest('#evidence .lean.open'))
    && all.filter((el) => paints(el, ok)).every((el) => el.closest('#evidence .lean:not(.open):not(.num):not(.model):not(.argued):not(.frozen)'));
}));
check('debug probe: window.ARC_CALCULUS_DEBUG is frozen and read-only', await page.evaluate(() => Object.isFrozen(window.ARC_CALCULUS_DEBUG) && typeof window.ARC_CALCULUS_DEBUG.setState === 'function'));

// the complex step over the whole sweep: the page's error curve against the series, and the second derivative of one plane
{
  const curve = await page.evaluate(() => window.ARC_CALCULUS_DEBUG.errCurve());
  check('complex step: 201 points from ε = 1 to 10⁻²⁰', curve.length === 201 && near(curve[0].elog, 0, 0) && near(curve[200].elog, -20, 1e-12));
  check('complex step: error ≤ 4×10⁻¹⁶ for every ε ≤ 10⁻⁸, and matching the series everywhere', curve.every((p) => p.elog > -8 || p.cs <= 4e-16)
    && curve.every((p) => Math.abs(p.cs - Math.abs(csSeries(10 ** p.elog) - FPRIME) / FPRIME) <= 6e-16));
  check('forward difference: best near ε = 10⁻⁸ (< 10⁻⁷), exactly 100% for every ε below half an ulp of 1', curve.filter((p) => p.elog <= -7 && p.elog >= -9).some((p) => p.fd < 1e-7)
    && curve.filter((p) => 1 + 10 ** p.elog === 1).every((p) => p.fd === 1) && curve.filter((p) => 1 + 10 ** p.elog === 1).length >= 30);
  const sec = await page.evaluate(() => [1e-4, 1e-8].map((e) => window.ARC_CALCULUS_DEBUG.second(e)));
  check('one-plane second derivative: fine at ε = 10⁻⁴, wrecked by the subtraction at 10⁻⁸ (ARGUED box)', near(sec[0].exact, 2 * Math.E * Math.cos(1), 1e-14)
    && Math.abs(sec[0].value - sec[0].exact) / sec[0].exact < 1e-6 && Math.abs(sec[1].value - sec[1].exact) / sec[1].exact > 1e-2);
  const tr = await page.evaluate(() => [10, 100, 1000, 10000].map((n) => window.ARC_CALCULUS_DEBUG.trotter(n).err));
  check('Lie–Trotter: the error falls like 1/n', tr.every((e, i) => i === 0 || (tr[i - 1] / e > 8 && tr[i - 1] / e < 12)), JSON.stringify(tr));
  const ph = await page.evaluate(() => [0.5, 0.6, 0.8, 1].map((a) => window.ARC_CALCULUS_DEBUG.rough(-3, a).sum));
  check('roughness at ε = 10⁻³: 0.0005 at α = 1, 0.5000 at α = 1/2, monotone between', ph[3].toFixed(4) === '0.0005' && ph[0].toFixed(4) === '0.5000' && ph[0] > ph[1] && ph[1] > ph[2] && ph[2] > ph[3]);
  const deep = await page.evaluate(() => [-20, -17, -6].flatMap((e) => [0.5, 1].map((a) => window.ARC_CALCULUS_DEBUG.rough(e, a))));
  check('roughness below ε = 10⁻⁶ is computed at 10⁻⁶: the same safe N = 10⁶ at log₁₀ ε = −20, −17 and −6', deep.every((r, i) => r.rlog === -6 && r.N === 1e6
    && r.sum === deep[4 + (i % 2)].sum && r.meanZ === deep[4 + (i % 2)].meanZ && r.lead === deep[4 + (i % 2)].lead), JSON.stringify(deep.map((r) => [r.elog, r.rlog, r.N])));
  check('roughness at ε = 10⁻⁶ (K1): 2 sin² keeps 0.5 and 5×10⁻⁷, where 1 − cos would be off by about 10⁻⁴', deep[4].sum.toFixed(4) === '0.5000' && near(deep[5].sum, 5e-7, 1e-18)
    && Math.abs(deep[5].v - sagitta(1e-6)) <= 1e-15 * deep[5].v && Math.abs((1 - Math.cos(1e-6)) - deep[5].v) > 1e-5 * deep[5].v);
  const fans = await page.evaluate(() => [4, 8, 16, 32].map((M) => window.ARC_CALCULUS_DEBUG.stokes(M, 50, 120)));
  check('fan: exact Stokes for every M, also with P at θ = 50°', fans.every((f, i) => f.M === [4, 8, 16, 32][i] && f.rimErr < 1e-12 && f.pairMax < 1e-12 && f.triMax < 1e-12));
  const shells = await page.evaluate(() => [4, 8, 16, 32].map((M) => { const s = window.ARC_CALCULUS_DEBUG.shell(M); return [s.V, s.E, s.F, s.chi, s.defects, s.rank, s.divCurl]; }));
  check('shells: tetrahedron, octahedron and their subdivisions', same(shells, [[4, 6, 4, 2, 0, 3, 0], [6, 12, 8, 2, 0, 7, 0], [10, 24, 16, 2, 0, 15, 0], [18, 48, 32, 2, 0, 31, 0]]), JSON.stringify(shells));
}

for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  check(`language ${lang}: document and pressed toggle`, await page.evaluate((l) => document.documentElement.lang.startsWith(l)
    && document.querySelector(`[data-lang-set="${l}"]`).getAttribute('aria-pressed') === 'true', lang));
  for (const card of Object.keys(CARDS)) {
    await pick(card); const s = await state(), q = CARDS[card];
    check(`${lang}/${card}: the card sets the scene, its knobs and its still`, s.preset === card && s.scene === q.scene && !s.playing && s.M === q.M
      && (q.theta == null || near(s.theta, q.theta, 1e-12)) && (q.elog == null || near(s.elog, q.elog, 1e-12)) && (q.alpha == null || near(s.alpha, q.alpha, 1e-12))
      && await page.locator(`[data-preset="${card}"]`).getAttribute('aria-pressed') === 'true' && await page.locator(`[data-preset="${card}"]`).getAttribute('data-still') === STILL_ATTR[card]
      && await page.locator(`#sceneSwitch [data-scene="${q.scene}"]`).getAttribute('aria-pressed') === 'true');
    checkMath(s, `${lang}/${card}`);
  }
}

/* ---------- every control, with the identities after each ---------- */
await pick('osculating-rotor-vs-tangent');
for (const d of [0, 30, 60, 89.9, 90, 102.2]) {
  await input('#turnAngle', d); const s = await state();
  check(`θ slider ${d}°: state, output, rail and the leave-the-card rule`, near(s.theta, d, 1e-9) && s.preset === null && !s.playing && (await page.textContent('output[for="turnAngle"]')).trim() === `θ = ${d.toFixed(1)}°`
    && near(s.tau, d / s.thetaMaxDeg, 1e-9));
  checkMath(s, `θ=${d}`);
}
{
  await input('#turnAngle', 90); let s = await state();
  check('θ = 90°: tan θ leaves every window, the rotor identity holds', Math.abs(s.rotor.tan) > 1e15 && s.rotor.identity.toFixed(6) === '1.000000' && (await page.textContent('#hudBig')).includes('90.0°'));
  for (const tau of [0, 0.5, 0.88, 1]) { await input('#now', tau); s = await state(); check(`rail τ = ${tau} in the rotor scene: θ = 102.27°·τ`, near(s.theta, s.thetaMaxDeg * tau, 1e-6) && (await page.textContent('#tau')).includes(`θ ${(s.thetaMaxDeg * tau).toFixed(1)}°`)); }
}
for (const e of [0, -3, -8, -12.5, -16, -17, -20]) {
  await input('#apertureLog', e); const s = await state();
  check(`log ε slider ${e}: state and output`, near(s.elog, e, 1e-12) && s.preset === null);
  checkMath(s, `log ε=${e}`);
}
for (const a of [1, 0.9, 0.75, 0.6, 0.5]) {
  await input('#roughAlpha', a); const s = await state();
  check(`α slider ${a}: state and output`, near(s.alpha, a, 1e-12) && (await page.textContent('output[for="roughAlpha"]')).trim() === `α = ${a.toFixed(2)}`);
  checkMath(s, `α=${a}`);
}
for (const [v, M] of [[2, 4], [3, 8], [4, 16], [5, 32]]) {
  await input('#meshM', v); const s = await state();
  check(`M slider ${M}: state and output`, s.M === M && (await page.textContent('output[for="meshM"]')).trim() === `M = ${M}` && s.stokes.M === M && s.shell.M === M);
  checkMath(s, `M=${M}`);
}
for (const scene of ['rotor', 'complex', 'tube', 'stokes', 'shell']) {
  await page.click(`#sceneSwitch [data-scene="${scene}"]`); await settle(page); const s = await state();
  check(`scene switch ${scene}: scene, only the pressed segment`, s.scene === scene && s.preset === null
    && await page.$$eval('#sceneSwitch [data-scene]', (els) => els.filter((e) => e.getAttribute('aria-pressed') === 'true').map((e) => e.dataset.scene).join()) === scene);
}
// the rail drives one quantity per scene
for (const [scene, key, f] of [['complex', 'elog', (t) => -20 * t], ['tube', 'alpha', (t) => 1 - 0.5 * t], ['stokes', 'lambda', (t) => t], ['shell', 'lambda', (t) => t]]) {
  await page.click(`#sceneSwitch [data-scene="${scene}"]`); await settle(page);
  for (const tau of [0, 0.3, 1]) { await input('#now', tau); const s = await state(); check(`rail τ = ${tau} in ${scene}: ${key} = ${f(tau)}`, near(s[key], f(tau), 1e-9)); }
}
// the lens: same state, other labels and readouts
{
  await page.evaluate(() => window.ARC_CALCULUS_DEBUG.setState({ scene: 'rotor', theta: 60, elog: -0.5, lens: 'geometric' })); await settle(page);
  const a = await state(), labelA = await page.textContent('#roChordLabel'), btnA = await page.getAttribute('#lensToggleBtn', 'aria-pressed');
  await page.click('#lensToggleBtn'); await settle(page);
  const b = await state(), labelB = await page.textContent('#roChordLabel'), btnB = await page.getAttribute('#lensToggleBtn', 'aria-pressed');
  check('lens toggle: the state stays, the reading and the readout labels change', btnA === 'false' && btnB === 'true' && a.lens === 'geometric' && b.lens === 'calculus' && labelA !== labelB
    && near(a.theta, b.theta, 0) && near(a.elog, b.elog, 0) && same(a.rotor, b.rotor) && (await page.textContent('#hudSub')).includes('tan θ'));
  check('lens toggle: only the pressed half is amber', await page.evaluate(() => { const amber = (() => { const e = document.createElement('i'); e.style.color = 'var(--amber)'; document.body.append(e); const c = getComputedStyle(e).color; e.remove(); return c; })();
    const on = document.querySelector('#lensToggleBtn .seg.on'), off = document.querySelector('#lensToggleBtn .seg.off'); return getComputedStyle(on).backgroundColor === amber && getComputedStyle(off).backgroundColor !== amber; }));
  await page.click('#lensToggleBtn'); await settle(page);
  check('lens toggle: back to the geometric reading', (await state()).lens === 'geometric');
}

// the handles: the contact point (θ), the column top (α) and the fan centre P; the camera does not turn
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
for (const [scene, setup, key, from, to, tol] of [
  ['rotor', { scene: 'rotor', theta: 60, elog: -0.5 }, 'theta', 60, 30, 0.6],
  ['tube', { scene: 'tube', alpha: 0.8, elog: -3 }, 'alpha', 0.8, 0.6, 0.011],
  ['stokes', { scene: 'stokes', M: 4, pTheta: 34, pPhi: 215, lambda: 0.65 }, 'p', [34, 215], [50, 250], 1.2]
]) {
  await page.evaluate((o) => window.ARC_CALCULUS_DEBUG.setState(o), setup); await settle(page);
  const before = await state(), hb = await page.evaluate(() => window.ARC_CALCULUS_DEBUG.handleBox()), anchor = await page.evaluate((v) => window.ARC_CALCULUS_DEBUG.anchorPoint(v), from);
  check(`${scene} handle: the projected button sits on its anchor and is visible`, !!hb && await page.locator('#calcHandle').isVisible() && Math.hypot(hb.x - anchor.x, hb.y - anchor.y) < 1.5);
  const target = await page.evaluate((v) => window.ARC_CALCULUS_DEBUG.anchorPoint(v), to);
  if (hb && target) {
    await page.mouse.move(hb.x, hb.y); await page.mouse.down();
    check(`${scene} handle: pointerdown enters the dragging state`, await page.locator('#calcHandle').evaluate((el) => el.classList.contains('dragging')));
    await page.mouse.move(target.x, target.y, { steps: 8 }); await page.mouse.up(); await settle(page);
    const after = await state(), got = key === 'p' ? [after.pTheta, after.pPhi] : after[key];
    const ok = key === 'p' ? Math.abs(got[0] - to[0]) <= tol && Math.abs(got[1] - to[1]) <= 2 * tol : Math.abs(got - to) <= tol;
    check(`${scene} handle: dragging to the anchor of ${JSON.stringify(to)} sets it without turning the camera`, ok && same(after.camera, before.camera)
      && !(await page.locator('#calcHandle').evaluate((el) => el.classList.contains('dragging'))), JSON.stringify(got));
    checkMath(after, `after ${scene} drag`);
  }
  await page.focus('#calcHandle'); const s0 = await state();
  await page.keyboard.press('ArrowRight'); await settle(page);
  const s1 = await state();
  check(`${scene} handle: → on the focused ring nudges the parameter`, scene === 'rotor' ? near(s1.theta, s0.theta + 0.5, 1e-9) : scene === 'tube' ? near(s1.alpha, Math.max(0.5, s0.alpha - 0.01), 1e-9) : near(s1.pPhi, (s0.pPhi + 3) % 360, 1e-9));
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
}
for (const scene of ['complex', 'shell']) {
  await page.evaluate((sc0) => window.ARC_CALCULUS_DEBUG.setState({ scene: sc0 }), scene); await settle(page);
  check(`${scene}: no handle on the stage`, await page.locator('#calcHandle').isHidden());
}
// a drag on the empty stage turns the camera and leaves the parameters alone
{
  await page.evaluate(() => window.ARC_CALCULUS_DEBUG.setState({ scene: 'stokes' })); await settle(page);
  const before = await state(), box = await page.evaluate(() => { const r = document.getElementById('stage').getBoundingClientRect(); return [r.left + r.width * 0.92, r.top + r.height * 0.3]; });
  await page.mouse.move(box[0], box[1]); await page.mouse.down(); await page.mouse.move(box[0] - 60, box[1] - 20, { steps: 6 }); await page.mouse.up(); await settle(page);
  const after = await state();
  check('orbit: a drag on empty stage turns the camera, the parameters unchanged', after.pTheta === before.pTheta && after.pPhi === before.pPhi && after.theta === before.theta
    && (after.camera.yaw !== before.camera.yaw || after.camera.pitch !== before.camera.pitch));
}
await page.click('#infoBtn'); await settle(page);
check('info button opens the theory drawer', await page.locator('#drawer [role="dialog"]').isVisible());
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').isHidden());
check('play: ▶ advances the rail', await playsAfter(page, () => page.click('#play'), () => window.ARC_CALCULUS_DEBUG.state));
await pause();
{ const paused = await state(); await settle(page, 50); check('pause holds the rail', !paused.playing && same((await state()).tau, paused.tau)); }

// What each card's caption says, read off the page.
{
  await pick('osculating-rotor-vs-tangent'); let s = await state();
  check('rotor card: θ = 90.0°, tan θ off every window, (1 − v)² + c² = 1.000000', s.theta === 90 && Math.abs(s.rotor.tan) > 1e15 && s.rotor.identity.toFixed(6) === '1.000000' && s.rotor.rotorNorm.toFixed(6) === '1.000000');
  await pick('blind-zone-complex-step'); s = await state();
  check('complex card: ε = 10⁻¹⁷, complex step 3.7560 to machine precision, forward difference 0 and 100%', s.elog === -17 && s.step.cs.toFixed(4) === '3.7560' && s.step.csErr <= 4e-16 && s.step.fd === 0 && s.step.fdErr === 1);
  await pick('roughness-ito-phase-transition'); s = await state();
  check('roughness card: ε = 10⁻³, N = 1000, α = 1/2: Σ = 0.5000, E[z] = 0.6065; 0.0005 at α = 1', s.rough.N === 1000 && s.alpha === 0.5 && s.rough.sum.toFixed(4) === '0.5000' && s.rough.meanZ.toFixed(4) === '0.6065'
    && (await page.evaluate(() => window.ARC_CALCULUS_DEBUG.rough(-3, 1).sum)).toFixed(4) === '0.0005');
  const end = s.walk.end, polar = Math.acos(end[2]) / DEG;
  check('roughness card: the drawn walk wanders from the pole down to mid-latitudes (40°–70°)', polar > 40 && polar < 70, `${polar.toFixed(1)}°`);
  await pick('finite-mesh-stokes-cancellation'); s = await state();
  check('Stokes card: M = 4, λ = 0.65, pairs cancel to 0.000000, rim = Σ Ω = 2π', s.M === 4 && near(s.lambda, 0.65, 1e-12) && s.stokes.pairMax.toFixed(6) === '0.000000' && s.stokes.rim.toFixed(6) === (2 * Math.PI).toFixed(6) && s.stokes.rimErr.toFixed(6) === '0.000000');
  await pick('coboundary-d2-zero-closed-shell'); s = await state();
  check('shell card: the octahedron, V − E + F = 6 − 12 + 8 = 2, Σ curl A = 0, closed (λ = 1)', s.M === 8 && s.shell.V === 6 && s.shell.E === 12 && s.shell.F === 8 && s.shell.divCurl === 0 && near(s.lambda, 1, 0));
}

/* ---------- desktop, phone and the 334 × 500 cited figure, in both languages and on every card ---------- */
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
  const p = await T.open(BOOK, ID, `?embed=1&preset=${card}&lang=${lang}`, { viewport: { width: 334, height: 500 }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
  await settle(p);
  await p.locator('#play').evaluate((b) => { if (b.getAttribute('aria-pressed') === 'true') b.click(); });
  await settle(p);
  const tag = `cited 334×500 ${lang}/${card}`, s = await state(p);
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
  check(`still ${lang}/${card}: declared frame, paused, handle hidden`, s.preset === card && !s.playing && near(s.tau, CARDS[card].still, 1e-12)
    && await p.evaluate(() => TRV.still && TRV.shot && document.getElementById('calcHandle').hidden && document.documentElement.dataset.trPalette === undefined));
  checkMath(s, `still ${lang}/${card}`);
  if (card === 'osculating-rotor-vs-tangent') check(`still ${lang}/${card}: θ = 90°, tan θ off the window, identity 1.000000`, s.theta === 90 && Math.abs(s.rotor.tan) > 1e15 && s.rotor.identity.toFixed(6) === '1.000000');
  if (card === 'blind-zone-complex-step') check(`still ${lang}/${card}: ε = 10⁻¹⁷, forward difference 100%, complex step exact`, s.elog === -17 && s.step.fdErr === 1 && s.step.csErr <= 4e-16);
  if (card === 'roughness-ito-phase-transition') check(`still ${lang}/${card}: α = 1/2, Σ = 0.5000`, s.alpha === 0.5 && s.rough.sum.toFixed(4) === '0.5000');
  if (card === 'finite-mesh-stokes-cancellation') check(`still ${lang}/${card}: M = 4 at λ = 0.65, exact Stokes`, s.M === 4 && near(s.lambda, 0.65, 1e-12) && s.stokes.rimErr < 1e-12);
  if (card === 'coboundary-d2-zero-closed-shell') check(`still ${lang}/${card}: the closed octahedron, Σ curl A = 0`, s.M === 8 && s.lambda === 1 && s.shell.divCurl === 0);
  await p.context().close();
}

check('palette: every observed document stayed undefined', paletteDocuments.length > 0 && paletteDocuments.every((r) => r.absent), JSON.stringify(paletteDocuments.filter((r) => !r.absent)));
check('palette: zero attempted writes', paletteMutations.length === 0, JSON.stringify(paletteMutations));
check('zero page, console and request errors', T.errors.length === 0, T.errors.join(' | '));
check('zero browser console warnings after driver filtering', browserWarnings.length === 0, browserWarnings.slice(0, 4).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, T.warnings.map((w) => `${w.name}: ${w.detail}`).join(' | '));
await T.finish();
