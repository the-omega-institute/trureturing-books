// RIEMANN//STOKES browser regression: the shared stage-first gate, every reader control, and every number the page
// claims, checked against algorithms written here (not the page's own functions): Euler–Maclaurin for ζ at the stored
// ordinates, the model as a product of linear factors with its derivative from the logarithmic derivative, a
// characteristic polynomial (Newton's identities) and leading principal minors for the Gram matrix, a direct count of
// the zeros inside the Stokes box, a separate sieve with 1 − cos for the sagittas, and 30-digit constants for C_sag and
// the limits P → ∞. Run directly with node; VIZ_PHASE1=1 skips the repeated card/still matrix, VIZ_SLOW_FRAMES=1000
// spaces the frames. The chapter §31.3 may not exist yet on this branch: its embed checks run only when it does.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, overflowX, labelOverlaps, capitalGreek } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'arc-calculus-riemann-hermite-biehler-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const BOOK_DIR = path.resolve(DIR, '..', '..');
const PHASE1 = process.env.VIZ_PHASE1 === '1';
const CARDS = {
  'sagitta-mertens-critical-ridge': { scene: 'sagitta', delta: 0, eps: 0.075, ts: 25.5, still: 1 },
  'hermite-biehler-convex-wings': { scene: 'shell', delta: 0, eps: 0.2, ts: 25.5, up: 0.3, still: 0.7 },
  'rogue-quartet-mexican-hat-breach': { scene: 'shell', delta: 0.22, eps: 0.2, ts: 23, up: 0.11, still: 0.225 },
  'finite-stokes-zero-vortex-lock': { scene: 'stokes', delta: 0, eps: 0.2, ts: 25.5, u0: 0.08, still: 0.56 },
  'schur-modifier-conrey-li-bridge': { scene: 'bridge', delta: 0.22, eps: 0.2, ts: 23, up: 0.11, layers: 13, still: 1 }
};
const GIDS = [
  'D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product',
  'D5/S3/Zeros/CompletedZeta.xi_reading_differentiable',
  'D5/S3/Zeros/CompletedZeta.xi_reading_reflection',
  'D5/S3/Zeros/Symmetry/ZetaConjugationCovariance.xi_reading_one_sub_conj',
  'D5/S3/Analytic/ShiftedXiPoisson/ShiftedPoissonSemigroup.xiReading_eq_zero_iff_nontrivial',
  'D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.full_symmetry_not_fixed_line_localization',
  'D5/S3/Weil/ZetaBridge/RightHalfStripRiemannReduction.golden_right_half_strip_implies_rh',
  'D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness',
  'D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least'
];
const CHAPTER = 'ch34-s31-arc-calculus-riemann-and-hermite-biehler';
const CHAPTER_FILES = ['zh', 'en'].map((lang) => path.join(BOOK_DIR, lang, `${CHAPTER}.md`));
const HAS_CHAPTER = CHAPTER_FILES.every((f) => fs.existsSync(f));
const RH_LINKS = ['zh', 'en'].map((lang) => `../../${lang}/ch22-s04-critical-line-and-rh.html#conj-riemann-hypothesis`);
const AREA_LINKS = ['zh', 'en'].map((lang) => `../../${lang}/ch34-s29-arithmetic-pivots-and-resonant-tunneling.html#prob-ch34-arithmetic-pivot-area-law`);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-10) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const rel = (a, b, tol) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol * Math.max(1e-300, Math.abs(a), Math.abs(b));
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
  await context.exposeBinding('__riemannPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__riemannPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__riemannPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined }).catch(() => {}), { once: true });
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
const cx = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1]], sub: (a, b) => [a[0] - b[0], a[1] - b[1]], mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
  div: (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; },
  abs: (a) => Math.hypot(a[0], a[1]), scale: (a, k) => [a[0] * k, a[1] * k], conj: (a) => [a[0], -a[1]],
  powNeg: (n, s) => { const l = Math.log(n), r = Math.exp(-s[0] * l); return [r * Math.cos(-s[1] * l), r * Math.sin(-s[1] * l)]; }
};
/** ζ(s) by Euler–Maclaurin with N = 60 and eight Bernoulli corrections. */
const BERN = [1 / 6, -1 / 30, 1 / 42, -1 / 30, 5 / 66, -691 / 2730, 7 / 6, -3617 / 510];
function zetaEM(sig, t) {
  const s = [sig, t], N = 60;
  let z = [0, 0];
  for (let n = 1; n < N; n++) z = cx.add(z, cx.powNeg(n, s));
  const Ns = cx.powNeg(N, s);
  z = cx.add(z, cx.div(cx.scale(Ns, N), cx.sub(s, [1, 0])));
  z = cx.add(z, cx.scale(Ns, 0.5));
  let poch = s.slice(), fact = 2, pw = cx.scale(Ns, 1 / N);
  for (let k = 1; k <= BERN.length; k++) {
    z = cx.add(z, cx.scale(cx.mul(poch, pw), BERN[k - 1] / fact));
    poch = cx.mul(cx.mul(poch, [sig + 2 * k - 1, t]), [sig + 2 * k, t]);
    fact *= (2 * k + 1) * (2 * k + 2); pw = cx.scale(pw, 1 / (N * N));
  }
  return z;
}
/** The first twelve ordinates, 22 digits (computed with mpmath zetazero); the page stores 15. */
const GAMMA22 = ['14.13472514173469379046', '21.02203963877155499263', '25.01085758014568876321', '30.42487612585951321031', '32.93506158773918969066', '37.58617815882567125722',
  '40.9187190121474951874', '43.3270732809149995195', '48.00515088116715972794', '49.77383247767230218192', '52.97032147771446064415', '56.44624769706339480437'].map(Number);
const G0 = 23;
/** The roots of F_L as [u, t] (z = u + it). */
function roots(layers, delta) {
  const out = [];
  for (let k = 0; k < Math.min(layers, 12); k++) out.push([0, GAMMA22[k]], [0, -GAMMA22[k]]);
  if (layers >= 13 && delta > 0) for (const a of [delta, -delta]) for (const b of [G0, -G0]) out.push([a, b]);
  return out;
}
/** F_L(z) = ½ ∏_a (z − a)/(−½ − a) over the roots; F′ = F · Σ 1/(z − a) (the logarithmic derivative), or, on a root,
    the sum over the omitted factor. */
function model(u, t, layers = 13, delta = 0) {
  const rs = roots(layers, delta), fac = rs.map((a) => cx.div([u - a[0], t - a[1]], [-0.5 - a[0], -a[1]]));
  const F = fac.reduce((p, f) => cx.mul(p, f), [0.5, 0]);
  if (rs.every(([au, at]) => au !== u || at !== t)) return { F, dF: cx.mul(F, rs.reduce((s, a) => cx.add(s, cx.div([1, 0], [u - a[0], t - a[1]])), [0, 0])) };
  let dF = [0, 0];
  rs.forEach((a, k) => { let p = cx.div([0.5, 0], [-0.5 - a[0], -a[1]]); fac.forEach((f, j) => { if (j !== k) p = cx.mul(p, f); }); dF = cx.add(dF, p); });
  return { F, dF };
}
const ln2 = (u, t, layers, delta) => 2 * Math.log(cx.abs(model(u, t, layers, delta).F));
/** The documented display: L = ln(|F|²/W₀(t) + 10⁻⁴), W₀ at u = 0.45; Z = −0.62 ln(1 − L/0.04)/ln(1 − ln 10⁻⁴/0.04). */
function heightOf(u, t, layers, delta) {
  const L = Math.log(Math.exp(ln2(u, t, layers, delta) - ln2(0.45, t, layers, delta)) + 1e-4);
  return { L, Z: -0.62 * Math.log(1 - L / 0.04) / Math.log(1 - Math.log(1e-4) / 0.04) };
}
/** The dual shells at ½ ± u + it, by direct evaluation at both points. */
function shellOf(u, t, eps, layers, delta) {
  const a = model(u, t, layers, delta), b = model(-u, t, layers, delta), h = eps / 2;
  const Eo = cx.add(a.F, cx.scale(a.dF, h)), Em = cx.add(b.F, cx.scale(b.dF, h));
  return { outer: cx.abs(Eo) ** 2, mirror: cx.abs(Em) ** 2, delta: cx.abs(Eo) ** 2 - cx.abs(Em) ** 2, reXX: cx.mul(cx.conj(a.F), a.dF)[0] };
}
/** The documented Gram nodes. */
const nodesOf = (up, ts) => [[up, ts], [0.25, ts - 3], [0.18, ts + 3], [0.35, ts - 6 >= 11.5 ? ts - 6 : ts + 6]];
/** K(s_a, s_b) = (F′(s_b) conj F(s_a) + F(s_b) conj F′(s_a)) / (2((s_b − ½) + conj(s_a − ½))). */
function kernel(nodes, layers, delta) {
  const v = nodes.map(([u, t]) => model(u, t, layers, delta));
  return nodes.map(([ua, ta], a) => nodes.map(([ub, tb], b) => {
    const num = cx.add(cx.mul(v[b].dF, cx.conj(v[a].F)), cx.mul(v[b].F, cx.conj(v[a].dF)));
    return cx.div(num, [2 * (ub + ua), 2 * (tb - ta)]);
  }));
}
const mmul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => cx.add(s, cx.mul(x, B[k][j])), [0, 0])));
/** Eigenvalues of a Hermitian 4 × 4 matrix as the roots of its characteristic polynomial (Newton's identities). */
function charRoots(N) {
  const n = N.length, p = [];
  let P = N;
  for (let k = 1; k <= n; k++) { p.push(P.reduce((s, r, i) => s + r[i][0], 0)); P = mmul(P, N); }
  const e = [1];
  for (let k = 1; k <= n; k++) { let s = 0; for (let i = 1; i <= k; i++) s += (i % 2 ? 1 : -1) * e[k - i] * p[i - 1]; e.push(s / k); }
  const f = (x) => { let v = 0; for (let k = 0; k <= n; k++) v += (k % 2 ? -1 : 1) * e[k] * x ** (n - k); return v; };
  const R = Math.max(...N.map((r) => r.reduce((s, x) => s + cx.abs(x), 0))) + 1, out = [], M = 20000;
  let xa = -R, fa = f(xa);
  for (let i = 1; i <= M; i++) {
    const xb = -R + 2 * R * i / M, fb = f(xb);
    if (fa === 0) out.push(xa);
    else if (fa * fb < 0) { let lo = xa, hi = xb, flo = fa; for (let it = 0; it < 200; it++) { const mid = (lo + hi) / 2, fm = f(mid); if (fm * flo <= 0) hi = mid; else { lo = mid; flo = fm; } } out.push((lo + hi) / 2); }
    xa = xb; fa = fb;
  }
  return out;
}
/** Complex determinant by Gaussian elimination with partial pivoting. */
function cdet(A0) {
  const A = A0.map((r) => r.map((x) => x.slice())), n = A.length;
  let d = [1, 0];
  for (let c = 0; c < n; c++) {
    let p = c; for (let r = c + 1; r < n; r++) if (cx.abs(A[r][c]) > cx.abs(A[p][c])) p = r;
    if (cx.abs(A[p][c]) === 0) return [0, 0];
    if (p !== c) { [A[c], A[p]] = [A[p], A[c]]; d = cx.scale(d, -1); }
    d = cx.mul(d, A[c][c]);
    for (let r = c + 1; r < n; r++) { const f = cx.div(A[r][c], A[c][c]); for (let k = c; k < n; k++) A[r][k] = cx.sub(A[r][k], cx.mul(f, A[c][k])); }
  }
  return d;
}
/** The number of negative eigenvalues: sign changes along the leading principal minors (Sylvester–Jacobi). */
function negatives(N) {
  const m = [1]; for (let k = 1; k <= N.length; k++) m.push(cdet(N.slice(0, k).map((r) => r.slice(0, k)))[0]);
  let c = 0; for (let k = 1; k < m.length; k++) if (m[k] * m[k - 1] < 0) c++;
  return { count: c, minors: m };
}
const normalize = (K) => { const d = K.map((r, a) => { const v = Math.abs(r[a][0]); return v > 0 ? 1 / Math.sqrt(v) : 1; }); return K.map((r, a) => r.map((x, b) => cx.scale(x, d[a] * d[b]))); };
/** S = A − B C⁻¹ B* on the pivots {3, 4}, and the quadratic form at y = −C⁻¹ B* e₁. */
function schurOf(N) {
  const A = [[N[0][0], N[0][1]], [N[1][0], N[1][1]]], B = [[N[0][2], N[0][3]], [N[1][2], N[1][3]]], C = [[N[2][2], N[2][3]], [N[3][2], N[3][3]]];
  const det = cx.sub(cx.mul(C[0][0], C[1][1]), cx.mul(C[0][1], C[1][0])), Ci = [[cx.div(C[1][1], det), cx.div(cx.scale(C[0][1], -1), det)], [cx.div(cx.scale(C[1][0], -1), det), cx.div(C[0][0], det)]];
  const Bh = [[cx.conj(B[0][0]), cx.conj(B[1][0])], [cx.conj(B[0][1]), cx.conj(B[1][1])]];
  const BCB = mmul(mmul(B, Ci), Bh), S = A.map((r, i) => r.map((x, j) => cx.sub(x, BCB[i][j])));
  const y = mmul(Ci, Bh).map((r) => cx.scale(r[0], -1));        // −C⁻¹ B* e₁
  const v = [[1, 0], [0, 0], y[0], y[1]];
  let q = [0, 0]; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) q = cx.add(q, cx.mul(cx.conj(v[i]), cx.mul(N[i][j], v[j])));
  return { S, least: q[0] };
}
/** Primes up to 617 438 (a separate sieve), and Σ (1 − cos p^{−σ}), Σ ln(1 − 1/p), ∏ (1 − p⁻²)⁻¹ at a horizon. */
const PMAX = Math.ceil(Math.exp(1 / 0.075));
const PRIMES = (() => { const c = new Uint8Array(PMAX + 1), out = []; for (let i = 2; i <= PMAX; i++) { if (c[i]) continue; out.push(i); for (let j = i * 2; j <= PMAX; j += i) c[j] = 1; } return out; })();
function sagittaOf(P, sigma) { let s = 0; for (const p of PRIMES) { if (p > P) break; s += 1 - Math.cos(p ** -sigma); } return s; }
function mertensOf(P) { let l = 0, e = 1, n = 0; for (const p of PRIMES) { if (p > P) break; l += Math.log(1 - 1 / p); e /= 1 - 1 / (p * p); n++; } return { mertens: Math.exp(l) * Math.log(P), eulerTwo: e, count: n }; }
const C_SAG = 0.1121457900755310660404;
const LIMITS = { 0.55: 1.0393353309713713963, 0.6: 0.74749119527724203786, 0.75: 0.41757168697193684107, 0.95: 0.24905206204443435306 };
const meshOf = (eps) => ({ nu: Math.min(7, Math.max(1, Math.round(0.5 / eps))), nt: Math.min(27, Math.max(4, Math.round(2 / eps))) });
const inBox = (u0, delta) => roots(13, delta).filter(([u, t]) => u > u0 && u < 0.42 && t > 12 && t < 34.5).length;
/** Does a zero lie on the rim of the box? */
const onRim = (u0, delta) => roots(13, delta).some(([u, t]) => ((Math.abs(u - u0) < 1e-9 || Math.abs(u - 0.42) < 1e-9) && t >= 12 && t <= 34.5) || ((Math.abs(t - 12) < 1e-9 || Math.abs(t - 34.5) < 1e-9) && u >= u0 && u <= 0.42));

/** Every claim of the state s, recomputed here. */
function checkMath(s, tag) {
  check(`${tag}: the twelve ordinates agree with the 22-digit table`, s.gammas.length === 12 && s.gammas.every((g, k) => near(g, GAMMA22[k], 1e-12)));
  const layers = s.layers, delta = s.delta;
  // the dual shells
  const sh = shellOf(s.up, s.ts, s.eps, layers, delta), w0 = Math.exp(ln2(0.45, s.ts, layers, delta));
  check(`${tag}: |E(½ + u + it)|² − |E(½ − u + it)|² recomputed`, rel(s.shell.outer, sh.outer, 1e-9) && rel(s.shell.mirror, sh.mirror, 1e-9) && rel(s.shell.W0, w0, 1e-9)
    && Math.abs(s.shell.delta - sh.delta) <= 1e-9 * Math.max(sh.outer, sh.mirror), `${s.shell.delta} vs ${sh.delta}`);
  check(`${tag}: Δ = 2ε Re(ξ̄ξ′) = 4uεK(s, s)`, Math.abs(s.shell.identity - 2 * s.eps * sh.reXX) <= 1e-9 * Math.max(sh.outer, sh.mirror)
    && Math.abs(s.shell.kernel - sh.delta) <= 1e-8 * Math.max(sh.outer, sh.mirror) && Math.abs(s.shell.delta - s.shell.identity) <= 1e-9 * Math.max(sh.outer, sh.mirror));
  if (delta === 0 && layers >= 1) check(`${tag}: every zero on the line gives Δ > 0 at u = ${s.up.toFixed(3)}`, s.shell.delta > 0 && sh.delta > 0);
  // the Gram matrix of the kernel
  if (layers >= 2) {
    const nodes = nodesOf(s.up, s.ts), K = kernel(nodes, layers, delta), N = normalize(K), ev = charRoots(N), neg = negatives(N);
    check(`${tag}: Gram nodes follow the documented rule`, s.gram.nodes.every((n, k) => near(n[0], nodes[k][0], 1e-12) && near(n[1], nodes[k][1], 1e-12)));
    const scale = Math.max(...K.map((r, a) => cx.abs(r[a])));
    check(`${tag}: the kernel matrix recomputed`, K.every((r, a) => r.every((x, b) => Math.abs(x[0] - s.gram.re[a][b]) <= 1e-9 * scale && Math.abs(x[1] - s.gram.im[a][b]) <= 1e-9 * scale)));
    check(`${tag}: eigenvalues = roots of the characteristic polynomial`, ev.length === 4 && s.gram.ev.every((x, k) => near(x, ev[k], 1e-7)), `${JSON.stringify(s.gram.ev)} vs ${JSON.stringify(ev)}`);
    if (neg.minors.every((x) => Math.abs(x) > 1e-9)) check(`${tag}: the number of negative eigenvalues by leading minors`, s.gram.ev.filter((x) => x < 0).length === neg.count, JSON.stringify(neg.minors));
    if (delta === 0) check(`${tag}: on-line zeros only: λ_min > 0`, s.gram.lamMin > 0 && neg.count === 0);
    const sc = schurOf(N);
    check(`${tag}: Schur complement S = A − BC⁻¹B* and the least quadratic x*Sx`, sc.S.every((r, i) => r.every((x, j) => Math.abs(x[0] - s.gram.schur.S[i][j][0]) <= 1e-9 && Math.abs(x[1] - s.gram.schur.S[i][j][1]) <= 1e-9))
      && near(s.gram.schur.least, sc.least, 1e-9) && near(s.gram.schur.xSx, sc.S[0][0][0], 1e-9) && near(s.gram.schur.least, s.gram.schur.xSx, 1e-9));
    check(`${tag}: inertia: K ⪰ 0 iff C ≻ 0 and S ⪰ 0`, (s.gram.lamMin >= -1e-12) === (s.gram.schur.cEv[0] > 0 && s.gram.schur.ev[0] >= -1e-12));
  }
  // the Stokes box
  const st = s.stokes, m = meshOf(s.eps);
  check(`${tag}: mesh n_u × n_t = round(0.5/ε) × round(2/ε)`, st.nu === m.nu && st.nt === m.nt && st.interior === (m.nu - 1) * m.nt + (m.nt - 1) * m.nu);
  check(`${tag}: interior darts cancel to exactly 0`, st.cancel === 0);
  check(`${tag}: N(∂R) is undefined exactly when a zero lies on the rim`, st.defined === !onRim(s.u0, delta));
  if (st.defined) {
    const n = inBox(s.u0, delta);
    check(`${tag}: N(∂R) = ${n} zeros inside [½ + ${s.u0.toFixed(3)}, ½ + 0.42] × [12, 34.5]`, near(st.N, n, 1e-9) && near(st.cellN, n, 1e-9) && st.inside === n && st.gap < 1e-9 && (st.aliasFree || !st.meshClear), `${st.N} vs ${n}`);
  }
  // the sagittas
  const g = s.sagitta, P = Math.exp(1 / g.eps);
  check(`${tag}: horizon P_ε = e^{1/ε} on the 0.0025 grid`, rel(g.P, P, 1e-12) && near(g.eps / 0.0025, Math.round(g.eps / 0.0025), 1e-6) && g.primes === PRIMES.filter((p) => p <= P).length);
  check(`${tag}: Σ(1 − cos p^{−σ}) at σ = ½, 0.6, 0.75 (separate sieve)`, [[0, 0.5], [10, 0.6], [25, 0.75]].every(([k, sg]) => near(g.sums[k], sagittaOf(P, sg), 1e-9)) && near(g.half, g.sums[0], 0));
  check(`${tag}: lead ½ ln ln P_ε + C_sag with C_sag = 0.1121457900755`, near(g.C, C_SAG, 1e-15) && near(g.lead, 0.5 * Math.log(1 / g.eps) + C_SAG, 1e-12) && Math.abs(g.half - g.lead) < 0.5 * g.eps);
  check(`${tag}: limits P → ∞ for σ > ½ (30-digit constants)`, g.limits.every(([sg, v]) => near(v, LIMITS[sg], 1e-10)));
  const me = mertensOf(P);
  check(`${tag}: ∏(1 − 1/p) ln P and ∏(1 − p⁻²)⁻¹ recomputed`, near(g.mertens, me.mertens, 1e-10) && near(g.eulerTwo, me.eulerTwo, 1e-12) && Math.abs(Math.PI ** 2 / 6 - me.eulerTwo) < 2 / P);
  // the multiplicative layers
  if (s.split) check(`${tag}: K_{Mξ} = (M ⊗ M̄)∘K_ξ + (ξ ⊗ ξ̄)∘K_M at layer ${s.split.layer}, and the sign of K_M`, s.split.residual < 1e-12
    && (s.split.kind === 'pair' ? s.split.layerMin >= -1e-9 : s.split.kind === 'quartet' ? s.split.layerMin < 0 : s.split.layerMin === 0));
}

/* ---------- source and registry ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
// forbidden words are kept as code points so this suite itself carries no such identifier
const [numbered, ...forbidden] = [
  [103, 112, 116], [99, 108, 97, 117, 100, 101], [97, 110, 116, 104, 114, 111, 112, 105, 99], [111, 112, 101, 110, 97, 105],
  [103, 101, 109, 105, 110, 105], [99, 111, 100, 101, 120], [99, 111, 112, 105, 108, 111, 116], [111, 112, 117, 115],
  [115, 111, 110, 110, 101, 116], [104, 97, 105, 107, 117], [108, 108, 109], [99, 104, 97, 116, 103, 112, 116], [97, 103, 101, 110, 116], [97, 103, 101, 110, 116, 115]
].map((codes) => String.fromCharCode(...codes));
const identifiers = new RegExp(`\\b(?:${forbidden.join('|')}|${numbered}-?\\d)\\b`, 'i');
const suite = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
for (const [file, src] of Object.entries({ ...sources, 'test suite': suite })) {
  if (file !== 'test suite') check(`source ${file}: no literal colour and no palette switch`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(src) && !/\btrPalette\b|data-tr-palette/.test(src));
  check(`source ${file}: no model or vendor identifiers`, !identifiers.test(src));
}
check('source: shared three-column grid, wheel:false, a looping clock, container size on the stage', !/grid-template-columns\s*:/i.test(sources['style.css']) && /wheel:\s*false/.test(sources['main.js'])
  && /loop:\s*true/.test(sources['main.js']) && /#stage\s*\{\s*container-type:\s*size;/.test(sources['style.css']));
check('source: the five public presets stay in order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((x) => x[1]), Object.keys(CARDS)));
check('source: no green tick outside the evidence boxes in the script', !/okmark/.test(sources['main.js']));
check('source: no possessive ’s in the page text', !/’s\b/.test(sources['index.html'] + sources['main.js']));
check('source (colour contract): the script never paints amber, red or green; amber rules in the style only on the handle and the lens', !/\bP\.(?:amber|warn|ok|red|green)\b|\bc-(?:am|wn|ok)\b|sw (?:am|wn|ok)\b|\['(?:am|wn|ok)'/.test(sources['main.js'])
  && [...sources['style.css'].matchAll(/([^{}]+)\{[^}]*--amber[^}]*\}/g)].every((m) => /\.handle|lens-toggle/.test(m[1])) && !/--(?:warn|ok)\b/.test(sources['style.css']));
check('source: the holomorphic involution E#(s) = E(1 − s), never E(1 − s̄)', /E_ε\(1 − s\) = ξ\(s\) − \(ε\/2\)ξ′\(s\)/.test(sources['main.js'] + sources['index.html']) && !/E<sub>ε<\/sub>\(1 − s̄\) =/.test(sources['index.html']));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID);
check('registry: live §31.3 entry, five bilingual cards, links capture, the nine theorems', !!entry && entry.status === 'live' && entry.chapter === 31 && entry.section === '31.3' && entry.capture_lock === 'links'
  && entry.code === 'RIEMANN//STOKES' && same(entry.presets, Object.keys(CARDS)) && entry.presets.every((c) => entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same(entry.lean.map((x) => x.gid).sort(), [...GIDS].sort()) && entry.theory.every((t) => fs.existsSync(path.join(BOOK_DIR, t.href.replace('../', '').split('#')[0].replace(/\.html$/, '.md')))));
const deps = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'tests', 'dependencies.json'), 'utf8')).suites[`${ID}.test.mjs`];
check('dependencies: the standard solid list with @citations, @registry-entry, @lean-links and the §31.3 chapter files', Array.isArray(deps) && ['@citations', '@registry-entry', '@lean-links', 'theme/viz/solid-core.js', 'theme/viz/vendor/three.module.min.js']
  .every((d) => deps.includes(d)) && CHAPTER_FILES.every((f) => deps.includes(path.relative(path.resolve(BOOK_DIR, '..', '..'), f).split(path.sep).join('/'))));

/* ---------- runtime: contract, links, cards ---------- */
const state = (p = page) => p.evaluate(() => window.RIEMANN_STOKES_DEBUG.state);
const stillOf = (v) => (v === 'end' ? 1 : Number(v));
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
  await until(p, (q) => { const s = window.RIEMANN_STOKES_DEBUG.state; return s.scene === q.scene && Math.abs(s.delta - q.delta) < 1e-9 && Math.abs(s.ts - q.ts) < 1e-9; }, CARDS[card]);
  await pause(p);
  await input('#now', CARDS[card].still, p);
}
async function checkLinks(p, tag) {
  check(`${tag}: exact Lean evidence links in green boxes`, same(await p.$$eval('[data-lean-gid]', (els) => els.map((e) => e.dataset.leanGid).sort()), [...GIDS].sort())
    && await p.$$eval('[data-lean-gid]', (els) => els.every((e) => e.closest('.col.side #evidence .lean') && e.closest('.lean').querySelector('.ok')?.textContent.trim() === 'LEAN ✓')));
  check(`${tag}: one ARGUED, one MODEL, one NUM and three red OPEN boxes`, same(await p.$$eval('#evidence .lean:not([class="lean"])', (els) => els.map((e) => e.className).sort()), ['lean argued', 'lean model', 'lean num', 'lean open', 'lean open', 'lean open']));
  check(`${tag}: the OPEN boxes name the Riemann hypothesis, the kernel bridge and the area law`, await p.$$eval('#evidence .lean.open', (els) => els.length === 3 && /conj-riemann-hypothesis/.test(els[0].textContent)
    && /prob-ch34-schur-hb-kernel-positivity-bridge/.test(els[1].textContent) && /prob-ch34-arithmetic-pivot-area-law/.test(els[2].textContent))
    && same(await p.$$eval('#evidence .lean.open a', (els) => els.map((e) => e.getAttribute('href')).sort()), [...RH_LINKS, ...AREA_LINKS].sort()));
  const theory = await p.$$eval('#drawer a[href^="../../"]', (els) => els.map((e) => e.getAttribute('href')));
  check(`${tag}: the drawer links existing chapters in both languages${HAS_CHAPTER ? ', §31.3 among them' : ''}`, theory.length >= 2 && theory.every((h) => fs.existsSync(path.join(BOOK_DIR, h.replace('../../', '').split('#')[0].replace(/\.html$/, '.md'))))
    && theory.filter((h) => h.startsWith('../../zh/')).length === theory.filter((h) => h.startsWith('../../en/')).length && (!HAS_CHAPTER || theory.some((h) => h.includes(CHAPTER))), JSON.stringify(theory));
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
    && !!side.querySelector(':scope > #readouts') && !!side.querySelector(':scope > #evidence') && !!document.querySelector('.center > .strip #plot') && !document.querySelector('#stage #plot')
    && !!document.querySelector('#stage > button.handle#stageHandle') && document.querySelectorAll('#stage > .hud-tr#sceneChips [data-scene]').length === 4
    && getComputedStyle(document.getElementById('stage')).containerType === 'size';
}));
check('shell: #rail holds the two-segment lens, the five cards and the four sliders; #infoBtn opens #evidence above its title', await page.evaluate(() => {
  const rail = document.querySelectorAll('#rail'), info = document.getElementById('infoBtn'), r = rail[0];
  return rail.length === 1 && r.matches('.app.lab > aside.col.deck') && document.querySelector('.app.lab > footer.rail')?.id !== 'rail'
    && r.querySelectorAll('.lens-toggle#lensToggle > button.seg[data-lens][aria-pressed]').length === 2 && r.querySelectorAll('.presets.cards#presets > button.preset[data-preset]').length === 5
    && ['stokesU0', 'apertureEps', 'rogueDelta', 'sliceT'].every((id) => r.querySelector(`#ctlPanel input[type=range]#${id}`)) && r.querySelectorAll('input[type=range]').length === 4
    && document.getElementById('evidence').firstElementChild === info && info.nextElementSibling?.tagName === 'H2';
}));
check('colours (Rule 2): no red on the stage or the strip, amber only on the pressed card, the pressed lens and the handle; green only in LEAN boxes', await page.evaluate(() => {
  const probe = (v) => { const e = document.createElement('i'); e.style.color = `var(${v})`; document.body.append(e); const c = getComputedStyle(e).color; e.remove(); return c; };
  const amber = probe('--amber'), sigma = probe('--sigma'), warn = probe('--warn'), ok = probe('--ok');
  const paints = (el, c) => { const st = getComputedStyle(el); return [st.color, st.backgroundColor, st.borderTopColor, st.borderBottomColor, st.borderLeftColor, st.borderRightColor].includes(c); };
  const all = [...document.querySelectorAll('body *')], keys = [...document.querySelectorAll('dl.ro .key dd output')];
  const inStage = [...document.querySelectorAll('#stage *, .strip *')];
  return new Set([amber, sigma, warn, ok]).size === 4 && keys.length === 1 && keys.every((o) => getComputedStyle(o).color === sigma)
    && [...document.querySelectorAll('dl.ro output, dl.ro dd, #ctlPanel output')].every((o) => getComputedStyle(o).color !== amber)
    && inStage.every((el) => !paints(el, warn)) && inStage.filter((el) => paints(el, amber)).every((el) => el.closest('#stageHandle'))
    && all.filter((el) => paints(el, warn)).every((el) => el.closest('#evidence .lean.open'))
    && all.filter((el) => paints(el, ok)).every((el) => el.closest('#evidence .lean:not(.open):not(.num):not(.model):not(.argued):not(.frozen)'));
}));
check('debug probe: window.RIEMANN_STOKES_DEBUG is frozen and read-only', await page.evaluate(() => Object.isFrozen(window.RIEMANN_STOKES_DEBUG) && typeof window.RIEMANN_STOKES_DEBUG.setState === 'function'));

// the ordinates are zeros of ζ (Euler–Maclaurin), and the model is the documented product
{
  const st = await state();
  check('model: |ζ(½ + iγ_k)| < 10⁻⁹ at the twelve page ordinates (Euler–Maclaurin)', st.gammas.every((g) => cx.abs(zetaEM(0.5, g)) < 1e-9), JSON.stringify(st.gammas.map((g) => cx.abs(zetaEM(0.5, g)))));
  const pts = [[0.1, 17], [0.3, 23.4], [-0.2, 28.8], [0.45, 33.1], [0.02, 14.2], [0.21, 23.05]];
  for (const [layers, delta] of [[13, 0], [13, 0.22], [7, 0], [13, 0.05]]) {
    const got = await page.evaluate(([ps, l, d]) => ps.map(([u, t]) => [window.RIEMANN_STOKES_DEBUG.evalF(u, t, l, d), window.RIEMANN_STOKES_DEBUG.height(u, t, l, d)]), [pts, layers, delta]);
    check(`model (L = ${layers}, δ = ${delta}): ξ and ξ′ against the linear-factor product and its logarithmic derivative`, pts.every(([u, t], k) => {
      const m = model(u, t, layers, delta), F = got[k][0];
      return rel(Math.hypot(F.re, F.im), cx.abs(m.F), 1e-10) && cx.abs(cx.sub([F.re, F.im], m.F)) <= 1e-10 * cx.abs(m.F) && cx.abs(cx.sub([F.dre, F.dim], m.dF)) <= 1e-9 * Math.max(cx.abs(m.dF), cx.abs(m.F));
    }));
    check(`model (L = ${layers}, δ = ${delta}): wing-levelled height L and the display map Z`, pts.every(([u, t], k) => { const h = heightOf(u, t, layers, delta); return near(got[k][1].L, h.L, 1e-9) && near(got[k][1].Z, h.Z, 1e-9); }));
    check(`model (L = ${layers}, δ = ${delta}): symmetric about σ = ½ and real on it, ξ(0) = ½`, await page.evaluate(([l, d]) => {
      const D = window.RIEMANN_STOKES_DEBUG, a = D.evalF(0.17, 21.3, l, d), b = D.evalF(-0.17, 21.3, l, d), c = D.evalF(0, 19.7, l, d), z = D.evalF(-0.5, 0, l, d);
      return Math.abs(a.re - b.re) < 1e-12 * Math.hypot(a.re, a.im) && Math.abs(a.im + b.im) < 1e-12 * Math.hypot(a.re, a.im) && Math.abs(c.im) < 1e-12 * Math.abs(c.re) && Math.abs(z.re - 0.5) < 1e-12 && Math.abs(z.im) < 1e-14;
    }, [layers, delta]));
  }
  // the grid: every on-line zero in the window reaches the floor −0.62; ∂_u Z has the sign of Δ
  const grid = await page.evaluate(() => window.RIEMANN_STOKES_DEBUG.grid(13, 0.22));
  const floors = GAMMA22.slice(0, 5).map((g) => { const j = grid.ts.findIndex((t) => Math.abs(t - g) < 1e-9), i = grid.us.indexOf(0); return j >= 0 ? grid.Z[j][i] : NaN; });
  check('terrain: rows through γ₁ … γ₅ and the floor −0.62 at each (equal canyon depth)', floors.every((z) => near(z, -0.62, 1e-12)), JSON.stringify(floors));
  let agree = 0, total = 0;
  grid.ts.forEach((t, j) => grid.us.forEach((u, i) => {
    if (u <= 0 || grid.neg[j][i] == null) return;
    const sh = shellOf(u, t, 0.2, 13, 0.22);
    if (!Number.isFinite(sh.delta) || Math.abs(sh.delta) <= 1e-9 * (sh.outer + sh.mirror)) return;   // the zeros themselves
    total++; if ((grid.neg[j][i] === 1) === (sh.delta < 0)) agree++;
  }));
  check('terrain: the magenta trough is exactly where Δ < 0 (u > 0, δ = 0.22)', total > 1000 && agree === total, `${agree}/${total}`);
  check('terrain: the trough exists for δ = 0.22 and not for δ = 0', grid.neg.flat().some((x) => x === 1) && (await page.evaluate(() => window.RIEMANN_STOKES_DEBUG.grid(13, 0))).neg.flat().every((x) => x === 0));
  // monotone wings with every zero on the line: Δ > 0 for every u > 0 on many slices
  const sweep = await page.evaluate(() => { const D = window.RIEMANN_STOKES_DEBUG, out = []; for (let t = 12; t <= 34.5; t += 0.37) for (const u of [0.01, 0.07, 0.15, 0.3, 0.44]) out.push([u, t, D.shell(u, t, 0.2, 13, 0).delta]); return out; });
  check('wings: Δ_ε^HB > 0 at 315 points with δ = 0, and the sign recomputed', sweep.length > 300 && sweep.every(([u, t, d]) => d > 0 && shellOf(u, t, 0.2, 13, 0).delta > 0));
  const rogue = await page.evaluate(() => { const D = window.RIEMANN_STOKES_DEBUG; return [0.03, 0.08, 0.11, 0.16, 0.2].map((u) => D.shell(u, 23, 0.2, 13, 0.22).delta); });
  check('rogue: Δ_ε^HB < 0 on 0 < u < δ at t = γ₀ (and recomputed)', rogue.every((d) => d < 0) && [0.03, 0.08, 0.11, 0.16, 0.2].every((u) => shellOf(u, 23, 0.2, 13, 0.22).delta < 0));
  // Stokes at every coarseness: u₀ = 0.08 gives 0 (δ = 0), 1 (δ = 0.22); u₀ = −0.18 gives 5
  for (const eps of [0.075, 0.1, 0.2, 0.35, 0.5]) {
    const r = await page.evaluate((e) => [0.08, -0.18].flatMap((u0) => [0, 0.22].map((d) => window.RIEMANN_STOKES_DEBUG.stokes(u0, e, d))), eps);
    const counts = [0.08, -0.18].flatMap((u0) => [0, 0.22].map((d) => inBox(u0, d)));
    check(`Stokes ε = ${eps}: N = 0, 1 (u₀ = 0.08, δ = 0, 0.22) and 5, 6 (u₀ = −0.18), interior arcs cancel to 0`, same(counts, [0, 1, 5, 6])
      && r.every((x, k) => x.defined && x.cancel === 0 && (x.aliasFree || !x.meshClear) && Math.abs(x.N - counts[k]) < 1e-9 && Math.abs(x.cellN - counts[k]) < 1e-9), JSON.stringify(r));
  }
  // the bridge, layer by layer
  const ladder = await page.evaluate(() => Array.from({ length: 13 }, (_, k) => window.RIEMANN_STOKES_DEBUG.gram(k + 1, 0.22, 0.11, 23).lamMin));
  check('bridge: λ_min ≥ 0 for the twelve on-line layers, < 0 with the quartet (δ = 0.22, u = 0.11, t = 23)', ladder.slice(0, 12).every((x) => x >= -1e-9) && ladder[12] < 0 && near(ladder[11], 0.0582, 5e-5) && near(ladder[12], -1.0585, 5e-5), JSON.stringify(ladder));
  const splits = await page.evaluate(() => Array.from({ length: 13 }, (_, k) => window.RIEMANN_STOKES_DEBUG.split(k + 1, 0.22, 0.11, 23)));
  check('bridge: the Hadamard split holds at every layer; pair kernels PSD, the quartet kernel indefinite', splits.every((s, k) => s.residual < 1e-12 && s.kind === (k < 12 ? 'pair' : 'quartet') && (k < 12 ? s.layerMin >= -1e-9 : s.layerMin < 0)));
}

for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  check(`language ${lang}: document and pressed toggle`, await page.evaluate((l) => document.documentElement.lang.startsWith(l) && document.querySelector(`[data-lang-set="${l}"]`).getAttribute('aria-pressed') === 'true', lang));
  for (const card of Object.keys(CARDS)) {
    await pick(card); const s = await state(), q = CARDS[card];
    check(`${lang}/${card}: the card sets scene, δ, ε, t and its still`, s.preset === card && s.scene === q.scene && near(s.delta, q.delta, 1e-12) && near(s.eps, q.eps, 1e-12) && near(s.ts, q.ts, 1e-12) && !s.playing
      && (q.up == null || near(s.up, q.up, 1e-9)) && (q.u0 == null || near(s.u0, q.u0, 1e-9)) && (q.layers == null || s.layers === q.layers)
      && await page.locator(`[data-preset="${card}"]`).getAttribute('aria-pressed') === 'true' && near(stillOf(await page.locator(`[data-preset="${card}"]`).getAttribute('data-still')), q.still, 1e-12)
      && await page.locator(`#sceneChips [data-scene="${q.scene}"]`).getAttribute('aria-pressed') === 'true');
    checkMath(s, `${lang}/${card}`);
  }
}

/* ---------- every control, with the identities after each ---------- */
await page.click('[data-lang-set="en"]'); await settle(page);
await pick('finite-stokes-zero-vortex-lock');
for (const u0 of [-0.2, -0.05, 0, 0.08, 0.3]) {
  await input('#stokesU0', u0); const s = await state();
  check(`u₀ slider ${u0}: state, output, scene and rail; the card is left`, near(s.u0, u0, 1e-12) && s.preset === null && !s.playing && s.scene === 'stokes' && near(s.tau, (u0 + 0.2) / 0.5, 1e-9)
    && (await page.textContent('output[for="stokesU0"]')).trim() === `u₀ = ${u0 > 0 ? '+' : u0 < 0 ? '−' : ''}${Math.abs(u0).toFixed(3)}`);
  checkMath(s, `u₀=${u0}`);
}
for (const eps of [0.075, 0.2, 0.5]) {
  await input('#apertureEps', eps); const s = await state();
  check(`ε slider ${eps}: state, output and mesh`, near(s.eps, eps, 1e-12) && (await page.textContent('output[for="apertureEps"]')).trim() === `ε = ${eps.toFixed(4)}` && same(s.mesh, meshOf(eps)));
  checkMath(s, `ε=${eps}`);
}
for (const d of [0, 0.1, 0.22, 0.3]) {
  await input('#rogueDelta', d); const s = await state();
  check(`δ slider ${d}: state and output`, near(s.delta, d, 1e-12) && (await page.textContent('output[for="rogueDelta"]')).trim() === (d ? `δ = ${d.toFixed(3)}` : 'δ = 0 (none)'));
  checkMath(s, `δ=${d}`);
}
for (const t of [14.5, 23, 31.8]) {
  await input('#sliceT', t); const s = await state();
  check(`t slider ${t}: state, output, and the slice brings the shell scene`, near(s.ts, t, 1e-12) && (await page.textContent('output[for="sliceT"]')).trim() === `t = ${t.toFixed(2)}` && s.scene === 'shell');
  checkMath(s, `t=${t}`);
}
await input('#rogueDelta', 0);
// the rail drives one quantity per scene
const RAIL = { sagitta: (t) => ['eps', Math.round((0.5 * 0.15 ** t - 0.075) / 0.0025) * 0.0025 + 0.075], shell: (t) => ['up', 0.02 + 0.4 * t], stokes: (t) => ['u0', -0.2 + 0.5 * t], bridge: (t) => ['layers', Math.round(13 * t)] };
for (const scene of ['sagitta', 'shell', 'stokes', 'bridge']) {
  await page.click(`#sceneChips [data-scene="${scene}"]`); await settle(page);
  const s0 = await state();
  check(`scene chip ${scene}: scene and pressed chip, the card is left`, s0.scene === scene && s0.preset === null && await page.locator(`#sceneChips [data-scene="${scene}"]`).getAttribute('aria-pressed') === 'true');
  for (const tau of [0, 0.37, 1]) {
    await input('#now', tau); const s = await state(), [key, v] = RAIL[scene](tau);
    check(`rail τ = ${tau} in ${scene}: ${key} = ${typeof v === 'number' ? +v.toFixed(4) : v}`, near(s[key], v, 1e-9), `${s[key]}`);
  }
}
// the lens: same state, other labels and readouts
{
  await page.evaluate(() => window.RIEMANN_STOKES_DEBUG.setState({ scene: 'shell', lens: 'arc', ts: 25.5, delta: 0, tau: 0.7 })); await settle(page);
  const a = await state(), labelA = await page.textContent('#roShellLabel'), hudA = await page.textContent('#hudBig');
  await page.click('#lensToggle [data-lens="zfc"]'); await settle(page);
  const b = await state(), labelB = await page.textContent('#roShellLabel'), hudB = await page.textContent('#hudBig');
  check('lens: the state stays, the reading and the readout labels change', a.lens === 'arc' && b.lens === 'zfc' && labelA !== labelB && hudA !== hudB
    && same({ ...a, lens: 0, camera: 0, labels: 0, stageFrame: 0, plot: 0, handle: 0 }, { ...b, lens: 0, camera: 0, labels: 0, stageFrame: 0, plot: 0, handle: 0 }));
  check('lens: only the pressed segment is amber', await page.evaluate(() => {
    const e = document.createElement('i'); e.style.color = 'var(--amber)'; document.body.append(e); const amber = getComputedStyle(e).color; e.remove();
    const segs = [...document.querySelectorAll('#lensToggle .seg')];
    return segs.filter((x) => getComputedStyle(x).backgroundColor === amber).map((x) => x.dataset.lens).join() === 'zfc' && segs.find((x) => x.dataset.lens === 'zfc').getAttribute('aria-pressed') === 'true';
  }));
  await page.click('#lensToggle [data-lens="arc"]'); await settle(page);
  check('lens: back to the arc-body reading', (await state()).lens === 'arc');
}

// the handle: the slice t (shell) and the left edge u₀ (stokes); the camera does not turn
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
for (const [scene, key, from, to, tol, stepv] of [['shell', 'ts', 25.5, 20, 0.12, 0.05], ['stokes', 'u0', 0.08, -0.1, 0.012, 0.005]]) {
  await page.evaluate(([sc0, k, v]) => window.RIEMANN_STOKES_DEBUG.setState({ scene: sc0, [k]: v, delta: 0 }), [scene, key, from]); await settle(page);
  const before = await state(), hb = await page.evaluate(() => window.RIEMANN_STOKES_DEBUG.handleBox()), anchor = await page.evaluate((v) => window.RIEMANN_STOKES_DEBUG.anchorPoint(v), from);
  check(`${scene} handle: the projected button sits on its anchor and is visible`, !!hb && await page.locator('#stageHandle').isVisible() && Math.hypot(hb.x - anchor.x, hb.y - anchor.y) < 1.5);
  const target = await page.evaluate((v) => window.RIEMANN_STOKES_DEBUG.anchorPoint(v), to);
  if (hb && target) {
    await page.mouse.move(hb.x, hb.y); await page.mouse.down();
    check(`${scene} handle: pointerdown enters the dragging state`, await page.locator('#stageHandle').evaluate((el) => el.classList.contains('dragging')));
    await page.mouse.move(target.x, target.y, { steps: 8 }); await page.mouse.up(); await settle(page);
    const after = await state();
    check(`${scene} handle: dragging to the anchor of ${to} sets ${key} ≈ ${to} without turning the camera`, Math.abs(after[key] - to) <= tol && after.camera.yaw === before.camera.yaw && after.camera.pitch === before.camera.pitch
      && !(await page.locator('#stageHandle').evaluate((el) => el.classList.contains('dragging'))), `${key} ${after[key]}`);
    checkMath(after, `after ${scene} drag`);
  }
  await page.focus('#stageHandle'); const v0 = (await state())[key];
  await page.keyboard.press('ArrowRight'); await settle(page);
  check(`${scene} handle: → on the focused ring adds ${stepv}`, near((await state())[key], v0 + stepv, 1e-9));
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
}
await page.evaluate(() => window.RIEMANN_STOKES_DEBUG.setState({ scene: 'sagitta' })); await settle(page);
check('sagitta scene: no handle', await page.evaluate(() => window.RIEMANN_STOKES_DEBUG.handleBox() === null));
// a drag on the empty stage turns the camera and leaves the parameters alone
{
  const before = await state(), box = await page.evaluate(() => { const r = document.getElementById('stage').getBoundingClientRect(); return [r.left + r.width * 0.9, r.top + r.height * 0.42]; });
  await page.mouse.move(box[0], box[1]); await page.mouse.down(); await page.mouse.move(box[0] - 60, box[1] - 20, { steps: 6 }); await page.mouse.up(); await settle(page);
  const after = await state();
  check('orbit: a drag on empty stage turns the camera, the parameters unchanged', after.u0 === before.u0 && after.ts === before.ts && after.eps === before.eps && (after.camera.yaw !== before.camera.yaw || after.camera.pitch !== before.camera.pitch));
}
await page.click('#infoBtn'); await settle(page);
check('info button opens the theory drawer', await page.locator('#drawer [role="dialog"]').isVisible());
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').isHidden());
check('play: ▶ advances the rail', await playsAfter(page, () => page.click('#play'), () => window.RIEMANN_STOKES_DEBUG.state));
await pause();
{ const paused = await state(); await settle(page, 50); check('pause holds the rail', !paused.playing && same((await state()).tau, paused.tau)); }

// What each card's caption says, read off the page.
{
  await pick('sagitta-mertens-critical-ridge'); let s = await state();
  check('sagitta card: ε = 0.075, P_ε = 6.17×10⁵, Σ_sag(½) = 1.4073 on the lead 1.4073, σ = 0.6 near its limit 0.7475', near(s.eps, 0.075, 1e-12) && s.sagitta.P.toExponential(2) === '6.17e+5'
    && s.sagitta.half.toFixed(4) === '1.4073' && s.sagitta.lead.toFixed(4) === '1.4073' && Math.abs(s.sagitta.sums[10] - LIMITS[0.6]) < 0.011);
  await pick('hermite-biehler-convex-wings'); s = await state();
  check('wings card: u = 0.30, t = 25.50, Δ > 0, λ_min = 0.0552', near(s.up, 0.3, 1e-9) && s.shell.delta > 0 && s.gram.lamMin.toFixed(4) === '0.0552');
  await pick('rogue-quartet-mexican-hat-breach'); s = await state();
  check('rogue card: δ = 0.22, t = 23, u = 0.11, Δ < 0, λ_min = −1.0585', near(s.up, 0.11, 1e-9) && s.shell.delta < 0 && s.gram.lamMin.toFixed(4) === '-1.0585');
  await pick('finite-stokes-zero-vortex-lock'); s = await state();
  check('stokes card: u₀ = 0.08, 3 × 10 cells, N = 0.0000, interior arcs cancel exactly', near(s.u0, 0.08, 1e-9) && s.stokes.nu === 3 && s.stokes.nt === 10 && s.stokes.N.toFixed(4).replace('-', '') === '0.0000' && s.stokes.cancel === 0);
  await pick('schur-modifier-conrey-li-bridge'); s = await state();
  check('bridge card: L = 13, λ_min = −1.0585, layer 13 the quartet', s.layers === 13 && s.gram.lamMin.toFixed(4) === '-1.0585' && s.split.kind === 'quartet');
}

/* ---------- desktop, phone and the 334 × 500 cited figure, in both languages and on every card ---------- */
const VIEWS = [['desktop', 1440, 900], ['phone', 390, 844]];
if (!PHASE1) for (const lang of ['zh', 'en']) for (const [kind, width, height] of VIEWS) {
  const p = await T.open(BOOK, ID, `?lang=${lang}`, { viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
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
    && await p.evaluate(() => TRV.still && TRV.shot && document.getElementById('stageHandle').hidden && document.documentElement.dataset.trPalette === undefined));
  checkMath(s, `still ${lang}/${card}`);
  if (card === 'sagitta-mertens-critical-ridge') check(`still ${lang}/${card}: ε = 0.075, Σ_sag(½) = 1.4073`, near(s.eps, 0.075, 1e-12) && s.sagitta.half.toFixed(4) === '1.4073');
  if (card === 'hermite-biehler-convex-wings') check(`still ${lang}/${card}: u = 0.30, λ_min = 0.0552`, near(s.up, 0.3, 1e-9) && s.gram.lamMin.toFixed(4) === '0.0552');
  if (card === 'rogue-quartet-mexican-hat-breach') check(`still ${lang}/${card}: u = 0.11, Δ < 0, λ_min < 0`, near(s.up, 0.11, 1e-9) && s.shell.delta < 0 && s.gram.lamMin < 0);
  if (card === 'finite-stokes-zero-vortex-lock') check(`still ${lang}/${card}: u₀ = 0.08, N = 0`, near(s.u0, 0.08, 1e-9) && Math.round(s.stokes.N) === 0 && s.stokes.nu === 3 && s.stokes.nt === 10);
  if (card === 'schur-modifier-conrey-li-bridge') check(`still ${lang}/${card}: L = 13, λ_min < 0`, s.layers === 13 && s.gram.lamMin < 0);
  await p.context().close();
}

/* ---------- the chapter: §31.3 cites the five cards and the full lab, the same in both languages ---------- */
if (HAS_CHAPTER) {
  const blocks = CHAPTER_FILES.map((f) => [...fs.readFileSync(f, 'utf8').matchAll(/^::: \{\.viz src="([^"]+)"(?: preset="([^"]+)")?[^}]*\}/gm)].filter((m) => m[1] === ID).map((m) => m[2] || ''));
  check('chapter §31.3: five cited cards plus one full lab, in the same order in zh and en', same(blocks[0], blocks[1]) && same(blocks[0].filter(Boolean).sort(), Object.keys(CARDS).sort()) && blocks[0].filter((x) => !x).length === 1, JSON.stringify(blocks));
} else check('chapter §31.3: not on this branch yet; its embed checks wait for it', !CHAPTER_FILES.some((f) => fs.existsSync(f)));

check('palette: every observed document stayed undefined', paletteDocuments.length > 0 && paletteDocuments.every((r) => r.absent), JSON.stringify(paletteDocuments.filter((r) => !r.absent)));
check('palette: zero attempted writes', paletteMutations.length === 0, JSON.stringify(paletteMutations));
check('zero page, console and request errors', T.errors.length === 0, T.errors.join(' | '));
check('zero browser console warnings after driver filtering', browserWarnings.length === 0, browserWarnings.slice(0, 4).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, T.warnings.map((w) => `${w.name}: ${w.detail}`).join(' | '));
await T.finish();
