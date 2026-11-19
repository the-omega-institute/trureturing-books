// ARITH//PIVOT browser regression: the shared stage-first gate, every reader control, and every number the page
// claims, checked against algorithms written here (not the page's own functions): Euler–Maclaurin for ζ, 60-digit
// integer arithmetic for the stored phases t* ln p mod 2π, the stored complex p^{−it*} for the zero of ζ₁₉,
// Gauss–Legendre double integrals for the Levinson–Conrey constant, BigInt fractions for the Schur complements,
// complex division and repeated squaring for the Cayley relay, and a pixel scan for the strip labels.
// Run directly with node; VIZ_PHASE1=1 skips the repeated card/still matrix, VIZ_SLOW_FRAMES=1000 spaces the frames.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, overflowX, labelOverlaps, capitalGreek } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'arithmetic-pivot-resonant-tunneling-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const PHASE1 = process.env.VIZ_PHASE1 === '1';
const CARDS = {
  'turan-zeno-hard-cutoff': { scene: 'cutoff', M: 19, theta: 0.7, delta: 0.05, still: 18 / 39 },
  'mollifier-four-sevenths-wall': { scene: 'mollifier', M: 19, theta: 0.7, delta: 0.05, still: 1 },
  'block-schur-pivot-mera': { scene: 'schur', M: 19, theta: 0.7, delta: 0.05, still: 0.5 },
  'fabry-perot-rogue-explosion': { scene: 'relay', M: 19, theta: 0.7, delta: 0.05, still: 1 }
};
const GIDS = [
  'D5/S3/Zeros/ZetaUpgrade.classical_zeta_unique_simple_pole_residue_one',
  'D5/S3/Weil/ZetaRvm/CountByIntegral.completedRiemannZeta_ne_zero_of_one_le_re',
  'D5/S3/Weil/ZetaBridge/RightHalfStripRiemannReduction.golden_right_half_strip_implies_rh',
  'D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line',
  'D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion',
  'D5/S3/QuadraticForms/ChordalPsdCompletion.exists_posSemidef_completion',
  'D5/S3/QuadraticForms/RankBoundedChordalPsdCompletion.exists_posSemidef_completion_rank_le',
  'D5/S3/QuantumBounds/GramRealizability.gram_realizability',
  'D5/S3/Arith/Robin/OffLinePeak/OriginalLocalA.original_zero_robin5040_localA'
];
const THEORY = ['zh', 'en'].map((lang) => `../../${lang}/ch34-s29-arithmetic-pivots-and-resonant-tunneling.html#sec-ch34-arithmetic-pivots-and-resonant-tunneling`);
const RH_LINKS = ['zh', 'en'].map((lang) => `../../${lang}/ch22-s04-critical-line-and-rh.html#conj-riemann-hypothesis`);
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
  await context.exposeBinding('__arithPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver((records) => {
      for (const r of records) window.__arithPaletteAudit({ kind: 'mutation', old: r.oldValue, value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__arithPaletteAudit({ kind: 'document', absent: document.documentElement.dataset.trPalette === undefined }).catch(() => {}), { once: true });
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
  abs: (a) => Math.hypot(a[0], a[1]), scale: (a, k) => [a[0] * k, a[1] * k],
  powNeg: (n, s) => { const l = Math.log(n), r = Math.exp(-s[0] * l); return [r * Math.cos(-s[1] * l), r * Math.sin(-s[1] * l)]; }
};
/** ζ(s) by Euler–Maclaurin with N = 60 and eight Bernoulli corrections (another method than the page's). */
const BERN = [1 / 6, -1 / 30, 1 / 42, -1 / 30, 5 / 66, -691 / 2730, 7 / 6, -3617 / 510];
function zetaEM(sig, t) {
  const s = [sig, t], N = 60;
  let z = [0, 0];
  for (let n = 1; n < N; n++) z = cx.add(z, cx.powNeg(n, s));
  const Ns = cx.powNeg(N, s);                                         // N^{−s}
  z = cx.add(z, cx.div(cx.scale(Ns, N), cx.sub(s, [1, 0])));         // N^{1−s}/(s − 1)
  z = cx.add(z, cx.scale(Ns, 0.5));
  let poch = s.slice(), fact = 2, pw = cx.scale(Ns, 1 / N);          // s, 2!, N^{−s−1}
  for (let k = 1; k <= BERN.length; k++) {
    z = cx.add(z, cx.scale(cx.mul(poch, pw), BERN[k - 1] / fact));
    poch = cx.mul(cx.mul(poch, [sig + 2 * k - 1, t]), [sig + 2 * k, t]);
    fact *= (2 * k + 1) * (2 * k + 2); pw = cx.scale(pw, 1 / (N * N));
  }
  return z;
}
const lnAbs = (z) => Math.log(cx.abs(z));
const zetaDirect = (M, sig, t) => { let z = [0, 0]; for (let n = 1; n <= M; n++) z = cx.add(z, cx.powNeg(n, [sig, t])); return z; };

/* the phases t* ln p mod 2π in 60-digit integer arithmetic */
const D60 = 10n ** 60n;
function atanhQ(a, b) { let sum = 0n, term = (a * D60) / b, k = 0n; const a2 = a * a, b2 = b * b; while (term !== 0n) { sum += term / (2n * k + 1n); term = (term * a2) / b2; k += 1n; } return sum; }
function atanQ(a, b) { let sum = 0n, term = (a * D60) / b, k = 0n; const a2 = a * a, b2 = b * b; while (term !== 0n) { sum += (k % 2n ? -term : term) / (2n * k + 1n); term = (term * a2) / b2; k += 1n; } return sum; }
const LN2 = 2n * atanhQ(1n, 3n), PI60 = 16n * atanQ(1n, 5n) - 4n * atanQ(1n, 239n);
function lnPrime(p) { let k = 0n; while (2n ** (k + 1n) <= BigInt(p)) k += 1n; const q = 2n ** k; return k * LN2 + 2n * atanhQ(BigInt(p) - q, BigInt(p) + q); }
const T_STAR_DIGITS = '155417750480610.1069058343590740729822355566944212180135286730636614';
const tStar60 = (() => { const [w, f] = T_STAR_DIGITS.split('.'); return BigInt(w) * D60 + BigInt(f.slice(0, 60).padEnd(60, '0')); })();
function phase60(p) { const v = (tStar60 * lnPrime(p)) / D60, m = v % (2n * PI60); return Number(m / 10n ** 44n) / 1e16; }
/* the stored complex values p^{−it*} (§31.2 data, 20 digits), another representation than the page's angles */
const PIT = { 2: [0.10487362546649948467, -0.99448555679884682312], 3: [-0.54681926368927598249, -0.83725067504201993389], 5: [-0.99578104626429840977, -0.091761145921240489187],
  7: [-0.97713981460737489524, 0.21259770156110582775], 11: [-0.79831979787334037961, 0.60223375887064730466], 13: [-0.79742081636014192584, 0.60342360049597397820],
  17: [-0.78908670133821990570, 0.61428183903739734415], 19: [-0.78475923110449675689, 0.61980073345897151321] };
const SIG_STAR = 1.0069878448871247933;
function nIt(n, dt) { let z = [1, 0], m = n; for (const p of [2, 3, 5, 7, 11, 13, 17, 19]) while (m % p === 0) { z = cx.mul(z, PIT[p]); m /= p; } if (m !== 1) return null; return cx.mul(z, [Math.cos(-dt * Math.log(n)), Math.sin(-dt * Math.log(n))]); }
const zeta19Star = (sig, dt) => { let z = [0, 0]; for (let n = 1; n <= 19; n++) z = cx.add(z, cx.scale(nIt(n, dt), Math.exp(-sig * Math.log(n)))); return z; };
const PT_FREE = new Set([...Array.from({ length: 18 }, (_, i) => i + 1), 20, 21, 28]);   // Platt–Trudgian, Theorem 1.1

/* the Levinson–Conrey constant by a Gauss–Legendre double integral of the definition */
const GL = (() => { const n = 24, xs = [], ws = []; for (let i = 1; i <= n; i++) { let x = Math.cos(Math.PI * (i - 0.25) / (n + 0.5)), dp = 0; for (let it = 0; it < 100; it++) { let p0 = 1, p1 = x; for (let k = 2; k <= n; k++) { const p2 = ((2 * k - 1) * x * p1 - (k - 1) * p0) / k; p0 = p1; p1 = p2; } dp = n * (x * p1 - p0) / (x * x - 1); const dx = p1 / dp; x -= dx; if (Math.abs(dx) < 1e-16) break; } xs.push((1 - x) / 2); ws.push(1 / ((1 - x * x) * dp * dp)); } return { xs, ws }; })();
function kappaGL([R, p2, p3, q1, q3], th) {
  const q0 = 1 - q1 - q3, Pf = (u) => u + p2 * (u * u - u) + p3 * (u ** 3 - u), dP = (u) => 1 + p2 * (2 * u - 1) + p3 * (3 * u * u - 1);
  const Qf = (v) => q0 + q1 * (1 - 2 * v) + q3 * (1 - 2 * v) ** 3, dQ = (v) => -2 * q1 - 6 * q3 * (1 - 2 * v) ** 2;
  let I = 0;
  GL.xs.forEach((u, a) => GL.xs.forEach((v, b) => { const d = R * th * Pf(u) * Qf(v) + dP(u) * Qf(v) + th * Pf(u) * dQ(v); I += GL.ws[a] * GL.ws[b] * Math.exp(2 * R * v) * d * d; }));
  return 1 - Math.log(Pf(1) ** 2 * Qf(0) ** 2 + I / th) / R;
}
/** A crude coordinate search for the best κ at θ from a start of our own. */
function bestKappa(th, x0) {
  let x = x0.slice(), f = kappaGL(x, th), step = 0.2;
  while (step > 2e-5) { let moved = false; for (let i = 0; i < x.length; i++) for (const d of [step, -step]) { const y = x.slice(); y[i] += d; const g = kappaGL(y, th); if (g > f) { x = y; f = g; moved = true; } } if (!moved) step /= 2; }
  return f;
}

/* exact fractions with BigInt */
const big = (n) => BigInt(n);
const bgcd = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a || 1n; };
const F = (n, d = 1n) => { n = big(n); d = big(d); if (d < 0n) { n = -n; d = -d; } const g = bgcd(n, d); return [n / g, d / g]; };
const fa = (a, b) => F(a[0] * b[1] + b[0] * a[1], a[1] * b[1]), fs_ = (a, b) => F(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
const fm = (a, b) => F(a[0] * b[0], a[1] * b[1]), fd = (a, b) => F(a[0] * b[1], a[1] * b[0]);
const feq = (a, o) => o && BigInt(o.n) === a[0] && BigInt(o.d) === a[1];
function fdet(A) { if (A.length === 1) return A[0][0]; let s = F(0); A[0].forEach((x, j) => { const t = fm(x, fdet(A.slice(1).map((r) => r.filter((_, k) => k !== j)))); s = j % 2 ? fs_(s, t) : fa(s, t); }); return s; }
const WIN = [1, 2, 3, 6], kern = (m, n) => F(Math.min(m, n), Math.max(m, n));
const Gx = WIN.map((m) => WIN.map((n) => kern(m, n)));
function schurIndependent() {
  // eliminate 1 then 2 by Gaussian steps: the trailing 2 × 2 block is G̃_PP, the pivots are the LDL diagonal
  const A = Gx.map((r) => r.slice()), piv = [];
  for (let k = 0; k < 4; k++) { piv.push(A[k][k]); for (let i = k + 1; i < 4; i++) { const f = fd(A[i][k], A[k][k]); for (let j = k; j < 4; j++) A[i][j] = fs_(A[i][j], fm(f, A[k][j])); } if (k === 1) var S2 = [[A[2][2], A[2][3]], [A[3][2], A[3][3]]]; }
  // squared distance of f₄ from span{f₁, f₂} and from span{f₁, f₂, f₃, f₆}: Gram determinants ratio
  const withT = (set) => { const ids = set.concat([4]); return ids.map((m) => ids.map((n) => kern(m, n))); };
  const dist = (set) => fd(fdet(withT(set)), fdet(set.map((m) => set.map((n) => kern(m, n)))));
  // det as a polynomial in x = G(1, 6)
  const detAt = (x) => { const M = Gx.map((r) => r.slice()); M[0][3] = M[3][0] = x; return fdet(M); };
  return { S2, piv, det: fdet(Gx), detII: fdet([[Gx[0][0], Gx[0][1]], [Gx[1][0], Gx[1][1]]]), resI: dist([1, 2]), resIP: dist([1, 2, 3, 6]), detAt };
}
const SCH = schurIndependent();

/* the Cayley relay by complex arithmetic and repeated squaring */
const G1 = 14.134725141734693790;
function relayIndependent(delta, ell) {
  const rho = [0.5 + delta, G1], w = cx.div(cx.scale(rho, -1), cx.sub([1, 0], rho)), absW = cx.abs(w), ratio = cx.abs(cx.div(cx.sub(rho, [1, 0]), rho));
  let lg = Math.log10(absW), squared = Math.log10(absW); for (let l = 0; l < Math.floor(ell); l++) squared *= 2;
  let star = null, lin = null;
  if (absW > 1) { let v = absW, l = 0; while (v < 2) { v *= v; l++; } star = l; let u = 1, n = 0; while (u < 2) { u *= absW; n++; } lin = n; }
  return { w, absW, ratio, log10w: lg, log10At: squared, star, lin, robinLow: 400 * (G1 + 10) ** 2 / (delta * delta) };
}

/** Every claim of the state s, recomputed here. */
function checkMath(s, tag) {
  // cutoff: ζ_M at s*, the Platt–Trudgian set, the envelope and the NBB benchmark, the phases, the magnifier minimum
  const c = s.cutoff, M = s.M;
  check(`${tag}: zero-free flag is the Platt–Trudgian set`, c.zeroFree === PT_FREE.has(M));
  let H = 0; for (let n = 1; n <= M; n++) H += 1 / n;
  check(`${tag}: ζ_M(1) = H_M`, near(c.harmonic, H, 1e-12));
  if (M >= 3) check(`${tag}: Montgomery envelope 1 + (4/π − 1) ln ln M / ln M`, near(c.envelope, 1 + (4 / Math.PI - 1) * Math.log(Math.log(M)) / Math.log(M), 1e-12) && near(c.montgomery, 0.27323954473516265, 1e-14));
  check(`${tag}: C = 2 + γ − ln 4π and C/ln M`, near(c.C, 0.046191417932242067, 1e-15) && (M < 2 || near(c.nbb, 0.046191417932242067 / Math.log(M), 1e-14)));
  check(`${tag}: stored phases equal t* ln p mod 2π (60-digit integers)`, Object.entries(c.phases).every(([p, v]) => near(v, phase60(Number(p)), 2e-15)), JSON.stringify(Object.keys(c.phases).map((p) => c.phases[p] - phase60(Number(p)))));
  const z19 = zeta19Star(SIG_STAR, 0);
  check(`${tag}: |ζ₁₉(s*)| vanishes to double precision (stored complex phases)`, cx.abs(z19) < 5e-15 && c.abs19 < 5e-15 && near(c.sigmaStar, SIG_STAR, 1e-15) && c.sigmaStar > 1);
  if (M <= 19) { const zm = (() => { let z = [0, 0]; for (let n = 1; n <= M; n++) z = cx.add(z, cx.scale(nIt(n, 0), Math.exp(-SIG_STAR * Math.log(n)))); return z; })(); check(`${tag}: |ζ_${M}(s*)| from the stored complex phases`, near(c.star.abs, cx.abs(zm), 1e-12)); }
  const ph = c.phasors;
  check(`${tag}: phasor chain S₀ = 0 … S_M = ζ_M(s*)`, ph.length === M + 1 && near(ph[0][0], 0, 0) && near(cx.abs(cx.sub(ph[M], [c.star.re, c.star.im])), 0, 1e-12)
    && ph.every((p, k) => k === 0 || near(cx.abs(cx.sub(p, ph[k - 1])), Math.exp(-SIG_STAR * Math.log(k)), 1e-12)));
  if (M === 19) {
    // the magnifier: on the page's own grid, its deepest node is the node nearest σ*, right of σ = 1
    const tm = c.tileMin, sigs = Array.from({ length: tm.ns }, (_, i) => tm.sigmaRange[0] + (tm.sigmaRange[1] - tm.sigmaRange[0]) * i / (tm.ns - 1)), dts = Array.from({ length: tm.nt }, (_, j) => tm.dtRange[0] + (tm.dtRange[1] - tm.dtRange[0]) * j / (tm.nt - 1));
    let best = null; for (const sg of sigs) for (const dt of dts) { const v = lnAbs(zeta19Star(sg, dt)); if (!best || v < best.v) best = { sg, dt, v }; }
    check(`${tag}: the magnifier is deepest right of σ = 1, at σ* (recomputed)`, near(tm.sigma, best.sg, 1e-12) && near(tm.dt, best.dt, 1e-12) && tm.sigma > 1 && Math.abs(tm.sigma - SIG_STAR) < (tm.sigmaRange[1] - tm.sigmaRange[0]) / (tm.ns - 1));
  }
  // mollifier: the page's κ re-evaluated by a Gauss–Legendre double integral, the 4/7 and Levinson values
  const m = s.mollifier;
  check(`${tag}: κ(θ) re-evaluated from the page's P, Q, R`, near(m.kappa, kappaGL(m.params, s.theta), 2e-7) && m.proved === (s.theta < 4 / 7), `${m.kappa} vs ${kappaGL(m.params, s.theta)}`);
  check(`${tag}: κ(4/7) with cubic P, Q is 40.86% and below Conrey's 0.4088`, near(m.kappa47, kappaGL(m.params47, 4 / 7), 2e-7) && m.kappa47 > 0.4085 && m.kappa47 < 0.4088);
  check(`${tag}: Levinson (θ = 1/2, linear P, Q) gives 0.3474`, near(m.levinson.kappa, kappaGL([m.levinson.R, 0, 0, m.levinson.q1, 0], 0.5), 2e-7) && Math.abs(m.levinson.kappa - 0.3474) < 1e-4);
  check(`${tag}: the 4/7 wall and the entry of the hop`, near(m.wallSigma, 0.5 + 1.6 * 4 / 7, 1e-12) && near(m.entrySigma, 0.5 + 1.6 * s.theta, 1e-12));
  // Schur: exact fractions
  const sc = s.schur;
  check(`${tag}: G = min/max on {1, 2, 3, 6}`, Gx.every((r, i) => r.every((x, j) => feq(x, sc.G[i][j]))));
  check(`${tag}: G̃_PP = [[5/9, 5/18], [5/18, 8/9]] by elimination`, SCH.S2.every((r, i) => r.every((x, j) => feq(x, sc.S[i][j]))) && feq(F(5, 9), sc.S[0][0]) && feq(F(5, 18), sc.S[0][1]) && feq(F(8, 9), sc.S[1][1]));
  check(`${tag}: det G = det G_II · det G̃_PP = 5/16, apex 3/4, LDL pivots 1, 3/4, 5/9, 3/4`, feq(SCH.det, sc.detG) && feq(F(5, 16), sc.detG) && feq(SCH.detII, sc.detII)
    && feq(fd(SCH.det, SCH.detII), sc.detS) && feq(F(3, 4), sc.apex) && SCH.piv.every((x, i) => feq(x, sc.D[i])));
  check(`${tag}: Gram realization O*O = G`, sc.realErr < 1e-14 && (() => { let e = 0; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { let v = 0; for (let k = 0; k < 4; k++) v += sc.O[k][i] * sc.O[k][j]; e = Math.max(e, Math.abs(v - Number(Gx[i][j][0]) / Number(Gx[i][j][1]))); } return e < 1e-14; })());
  check(`${tag}: target 4: squared residual 3/4 after I, 35/108 after I and P (Gram determinants)`, feq(SCH.resI, sc.resI) && feq(SCH.resIP, sc.resIP) && feq(F(35, 108), sc.resIP));
  const d0 = SCH.detAt(F(0)), d1 = SCH.detAt(F(1)), dm = SCH.detAt(F(-1)), a2 = fs_(fd(fa(d1, dm), F(2)), d0);
  check(`${tag}: det(x) = −5/9 x² + 5/27 x + 385/1296, PSD on [−7/12, 11/12], max at 1/6`, feq(a2, sc.poly[0]) && feq(fd(fs_(d1, dm), F(2)), sc.poly[1]) && feq(d0, sc.poly[2])
    && SCH.detAt(F(-7, 12))[0] === 0n && SCH.detAt(F(11, 12))[0] === 0n && feq(F(-7, 12), sc.roots[0]) && feq(F(11, 12), sc.roots[1]) && feq(F(1, 6), sc.vertex) && feq(F(1, 6), sc.maxdet));
  const x = s.x16, dx = Number(d0[0]) / Number(d0[1]) + Number(fd(fs_(d1, dm), F(2))[0]) / Number(fd(fs_(d1, dm), F(2))[1]) * x + Number(a2[0]) / Number(a2[1]) * x * x;
  check(`${tag}: completion at x = ${x.toFixed(3)}: determinant and PSD`, near(sc.completion.det, dx, 1e-12) && sc.completion.psd === (x >= -7 / 12 - 1e-12 && x <= 11 / 12 + 1e-12));
  // relay
  const R = s.relay, ind = relayIndependent(s.delta, s.ell);
  check(`${tag}: |w| = |ρ/(1 − ρ)| and the Cayley ratio 1/|w|`, near(R.absW, ind.absW, 1e-14) && near(R.ratio, ind.ratio, 1e-14) && near(R.defect, Math.log(ind.ratio), 1e-14) && near(R.wRe, ind.w[0], 1e-12) && near(R.wIm, ind.w[1], 1e-12));
  check(`${tag}: |w| = 1 exactly when δ = 0`, (s.delta === 0) === (Math.abs(R.absW - 1) < 1e-15));
  check(`${tag}: layer readouts by repeated squaring`, R.layers.every((v, l) => near(v, ind.log10w * 2 ** l, 1e-9 * Math.max(1, Math.abs(v)))) && (Number.isInteger(s.ell) ? near(R.log10, ind.log10At, 1e-9 * Math.max(1, R.log10)) : true));
  check(`${tag}: doubling layer ℓ*, linear steps and the Robin scale`, s.delta === 0 ? R.star === null && R.linear === null && R.robinLow === null : R.star === ind.star && R.linear === ind.lin && near(R.robinLow, ind.robinLow, 1e-6 * ind.robinLow));
  // the pole and the Euler plateau
  check(`${tag}: (s − 1)ζ(s) → 1 at s = 1 + 10⁻ᵏ (Euler–Maclaurin)`, s.residues.every((r) => near(r.value, 10 ** -r.k * zetaEM(1 + 10 ** -r.k, 0)[0], 1e-9) && (r.k < 5 || Math.abs(r.value - 1) < 2e-5)));
}

/* ---------- source and registry ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
// forbidden words are kept as code points so this suite itself carries no such identifier
const [numbered, ...forbidden] = [
  [103, 112, 116], [99, 108, 97, 117, 100, 101], [97, 110, 116, 104, 114, 111, 112, 105, 99], [111, 112, 101, 110, 97, 105],
  [103, 101, 109, 105, 110, 105], [99, 111, 100, 101, 120], [99, 111, 112, 105, 108, 111, 116], [111, 112, 117, 115],
  [115, 111, 110, 110, 101, 116], [104, 97, 105, 107, 117], [108, 108, 109], [99, 104, 97, 116, 103, 112, 116]
].map((codes) => String.fromCharCode(...codes));
const identifiers = new RegExp(`\\b(?:${forbidden.join('|')}|${numbered}-?\\d)\\b`, 'i');
const suite = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
for (const [file, src] of Object.entries({ ...sources, 'test suite': suite })) {
  if (file !== 'test suite') check(`source ${file}: no literal colour and no palette switch`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(src) && !/\btrPalette\b|data-tr-palette/.test(src));
  check(`source ${file}: no model, vendor or tool identifiers`, !identifiers.test(src));
}
check('source: shared three-column grid, wheel:false, a looping clock, container size on the stage', !/grid-template-columns\s*:/i.test(sources['style.css']) && /wheel:\s*false/.test(sources['main.js'])
  && /loop:\s*true/.test(sources['main.js']) && /#stage\s*\{\s*container-type:\s*size;/.test(sources['style.css']));
check('source: the four public presets stay in order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((x) => x[1]), Object.keys(CARDS)));
check('source: no green tick outside the evidence boxes in the script', !/okmark/.test(sources['main.js']));
check('source: no possessive ’s in the page text', !/’s\b/.test(sources['index.html'] + sources['main.js']));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID);
check('registry: live §31.2 entry with four bilingual cards and the nine theorems', !!entry && entry.status === 'live' && entry.chapter === 31 && entry.section === '31.2'
  && entry.code === 'ARITH//PIVOT' && same(entry.presets, Object.keys(CARDS)) && entry.presets.every((c) => entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same(entry.lean.map((x) => x.gid).sort(), [...GIDS].sort()) && entry.theory.some((t) => t.href === THEORY[0].replace('../../', '../') && t.href_en === THEORY[1].replace('../../', '../')));

/* ---------- runtime: contract, links, cards ---------- */
const state = (p = page) => p.evaluate(() => window.ARITH_PIVOT_DEBUG.state);
async function pause(p = page) {
  await settle(p);
  await p.locator('#play').evaluate((b) => { if (b.getAttribute('aria-pressed') === 'true') b.click(); });
  await settle(p);
}
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
  await settle(p);
}
/** Click a card, pause it, and park the rail on the card's declared still (the frame its figure shows): the cutoff
    card restarts its gate sweep from M = 1, which a slow-frame run would otherwise have to wait out. Moving the rail
    keeps the card (only leave() clears it). */
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  await until(p, (q) => { const s = window.ARITH_PIVOT_DEBUG.state; return s.scene === q.scene && Math.abs(s.theta - q.theta) < 1e-9 && Math.abs(s.delta - q.delta) < 1e-9; }, CARDS[card]);
  await pause(p);
  await input('#now', CARDS[card].still, p);
}
async function checkLinks(p, tag) {
  check(`${tag}: exact Lean evidence links in green boxes`, same(await p.$$eval('[data-lean-gid]', (els) => els.map((e) => e.dataset.leanGid).sort()), [...GIDS].sort())
    && await p.$$eval('[data-lean-gid]', (els) => els.every((e) => e.closest('.col.side #evidence .lean') && e.closest('.lean').querySelector('.ok')?.textContent.trim() === 'LEAN ✓')));
  check(`${tag}: one ARGUED, one MODEL, one NUM and two red OPEN boxes`, same(await p.$$eval('#evidence .lean:not([class="lean"])', (els) => els.map((e) => e.className).sort()), ['lean argued', 'lean model', 'lean num', 'lean open', 'lean open']));
  check(`${tag}: the OPEN boxes name the Riemann hypothesis and the area-law problem`, await p.$$eval('#evidence .lean.open', (els) => els.length === 2 && /conj-riemann-hypothesis/.test(els[0].textContent) && /prob-ch34-arithmetic-pivot-area-law/.test(els[1].textContent))
    && same(await p.$$eval('#evidence .lean.open a', (els) => els.map((e) => e.getAttribute('href')).sort()), [...RH_LINKS].sort()));
  check(`${tag}: exact bilingual theory link`, same(await p.$$eval('#drawer a[href^="../../"]', (els) => els.map((e) => e.getAttribute('href')).sort()), [...THEORY].sort()));
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
    && !!side.querySelector(':scope > #readouts') && !!side.querySelector(':scope > #evidence') && !!document.querySelector('#evidence > #infoBtn')
    && !!document.querySelector('.center > .strip #plot') && !document.querySelector('#stage #plot') && !!document.querySelector('#stage > button.handle#stageHandle')
    && document.querySelectorAll('#stage > .hud-tr#sceneChips [data-scene]').length === 4 && document.querySelectorAll('#ctlPanel #regimeLens button[data-regime]').length === 3
    && getComputedStyle(document.getElementById('stage')).containerType === 'size';
}));
check('shell: the card deck is #rail, footer.rail is not, #infoBtn opens #evidence above its title', await page.evaluate(() => {
  const rail = document.querySelectorAll('#rail'), info = document.getElementById('infoBtn');
  return rail.length === 1 && rail[0].matches('.app.lab > aside.col.deck') && document.querySelector('.app.lab > footer.rail')?.id !== 'rail'
    && document.getElementById('evidence').firstElementChild === info && info.nextElementSibling?.tagName === 'H2';
}));
check('colours (Rule 2): readouts are never amber, the key readout is neutral sigma; red only in OPEN boxes, green only in LEAN boxes', await page.evaluate(() => {
  const probe = (v) => { const e = document.createElement('i'); e.style.color = `var(${v})`; document.body.append(e); const c = getComputedStyle(e).color; e.remove(); return c; };
  const amber = probe('--amber'), sigma = probe('--sigma'), warn = probe('--warn'), ok = probe('--ok');
  const paints = (el, c) => { const st = getComputedStyle(el); return [st.color, st.backgroundColor, st.borderTopColor, st.borderBottomColor, st.borderLeftColor, st.borderRightColor].includes(c); };
  const all = [...document.querySelectorAll('body *')], keys = [...document.querySelectorAll('dl.ro .key dd output')];
  return new Set([amber, sigma, warn, ok]).size === 4 && keys.length === 1 && keys.every((o) => getComputedStyle(o).color === sigma)
    && [...document.querySelectorAll('dl.ro output, dl.ro dd')].every((o) => getComputedStyle(o).color !== amber)
    && all.filter((el) => paints(el, warn)).every((el) => el.closest('#evidence .lean.open'))
    && all.filter((el) => paints(el, ok)).every((el) => el.closest('#evidence .lean:not(.open):not(.num):not(.model):not(.argued):not(.frozen)'));
}));
check('source (Rule 2): no amber readout rule, no red or green token, class or palette key in the page style and script', !/dl\.ro[^{}]*\{[^}]*--amber/.test(sources['style.css'])
  && !/--(?:warn|ok)\b|\bc-(?:wn|ok)\b|\.sw\.(?:wn|ok)\b/.test(sources['style.css'] + sources['main.js']) && !/\b(?:c-wn|c-ok)\b|class="sw (?:wn|ok)"/.test(sources['index.html'])
  && !/\b(?:P|palette)\.(?:warn|ok|red|green)\b|\[['"](?:wn|ok)['"]/.test(sources['main.js']));
check('debug probe: window.ARITH_PIVOT_DEBUG is frozen and read-only', await page.evaluate(() => Object.isFrozen(window.ARITH_PIVOT_DEBUG) && typeof window.ARITH_PIVOT_DEBUG.setState === 'function'));

// the terrain itself: ln|ζ| and ln|ζ₁₉| at sampled grid nodes against Euler–Maclaurin and the direct sum
{
  const samples = [[2, 0], [10, 3], [20, 47], [30, 70], [40, 1], [44, 100], [60, 33], [80, 120], [0, 60], [20, 0]];
  const got = await page.evaluate((sm) => sm.map(([i, j]) => [window.ARITH_PIVOT_DEBUG.terrainHeight('relay', 0, i, j), window.ARITH_PIVOT_DEBUG.terrainHeight('cutoff', 19, i, j)]), samples);
  check('terrain: ln|ζ| on the grid equals Euler–Maclaurin', samples.every(([i, j], k) => near(got[k][0], lnAbs(zetaEM(0.025 * i, 0.3 * j)), 1e-8)), JSON.stringify(got.map((g, k) => g[0] - lnAbs(zetaEM(0.025 * samples[k][0], 0.3 * samples[k][1])))));
  check('terrain: ln|ζ₁₉| on the grid equals the direct sum', samples.every(([i, j], k) => near(got[k][1], lnAbs(zetaDirect(19, 0.025 * i, 0.3 * j)), 1e-11)));
  const z1 = await page.evaluate(() => window.ARITH_PIVOT_DEBUG.zeta(0.5, 14.134725141734694));
  check('terrain: the pit of the first zero, |ζ(1/2 + iγ₁)| < 10⁻¹³', cx.abs(z1) < 1e-13 && cx.abs(zetaEM(0.5, 14.134725141734694)) < 1e-12);
}

for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  check(`language ${lang}: document and pressed toggle`, await page.evaluate((l) => document.documentElement.lang.startsWith(l)
    && document.querySelector(`[data-lang-set="${l}"]`).getAttribute('aria-pressed') === 'true', lang));
  for (const card of Object.keys(CARDS)) {
    await pick(card); const s = await state(), q = CARDS[card];
    check(`${lang}/${card}: the card sets scene, M, θ, δ and its still`, s.preset === card && s.scene === q.scene && s.M === q.M && near(s.theta, q.theta, 1e-12) && near(s.delta, q.delta, 1e-12)
      && near(s.x16, 1 / 6, 1e-15) && !s.playing && await page.locator(`[data-preset="${card}"]`).getAttribute('aria-pressed') === 'true'
      && near(Number(await page.locator(`[data-preset="${card}"]`).getAttribute('data-still')), q.still, 1e-12)
      && await page.locator(`#sceneChips [data-scene="${q.scene}"]`).getAttribute('aria-pressed') === 'true'
      && await page.locator(`#regimeLens [data-regime="${({ cutoff: 1, mollifier: 2, schur: 3, relay: 3 })[q.scene]}"]`).getAttribute('aria-pressed') === 'true');
    checkMath(s, `${lang}/${card}`);
  }
}

/* ---------- every control, with the identities after each ---------- */
await pick('turan-zeno-hard-cutoff');
for (const M of [1, 18, 19, 20, 22, 28, 40]) {
  await input('#cutM', M); const s = await state();
  check(`M slider ${M}: state, output, rail and the leave-the-card rule`, s.M === M && s.preset === null && !s.playing && (await page.textContent('output[for="cutM"]')).trim() === `M = ${M}` && near(s.tau, (M - 1) / 39, 1e-12));
  checkMath(s, `M=${M}`);
}
for (const tau of [0, 0.25, 18 / 39, 1]) {
  await input('#now', tau); const s = await state();
  check(`rail τ = ${tau.toFixed(3)} in the cutoff: the gate M = 1 + round(39τ)`, s.M === 1 + Math.round(39 * tau) && (await page.textContent('#tau')).includes(`M ${s.M}`));
}
for (const th of [0.32, 0.5, 0.57, 0.6, 0.9]) {
  await input('#thetaMol', th); const s = await state();
  check(`θ slider ${th}: state and output`, near(s.theta, th, 1e-12) && (await page.textContent('output[for="thetaMol"]')).trim() === `θ = ${th.toFixed(3)}`);
  checkMath(s, `θ=${th}`);
}
for (const x of [-0.75, -7 / 12, 0, 1 / 6, 11 / 12, 1]) {
  await input('#gap16', x); const s = await state();
  check(`x slider ${x.toFixed(3)}: state and PSD`, near(s.x16, Number((await page.inputValue('#gap16'))), 1e-12) && s.schur.completion.psd === (s.x16 >= -7 / 12 - 1e-9 && s.x16 <= 11 / 12 + 1e-9));
}
for (const d of [0, 0.01, 0.05, 0.1, 0.25]) {
  await input('#deltaOff', d); const s = await state();
  check(`δ slider ${d}: state and output`, near(s.delta, d, 1e-12) && (await page.textContent('output[for="deltaOff"]')).trim() === `δ = ${d.toFixed(3)}`);
  checkMath(s, `δ=${d}`);
}
// the table of the chapter data: |w|^{2^ℓ} at ℓ = 0, 4, 8, 12, 16
{
  const TABLE = { 0.01: [1.0000499911129, 1.0008001577698, 1.0128796422485, 1.2272286294502, 26.473273769095], 0.05: [1.0002499775624, 1.0040071484066, 1.0660777494068, 2.7836976665854, 13000290.181653], 0.1: [1.0004999988942, 1.0080300522873, 1.1365163241208, 7.7483788695386, 1.6880043815071e14] };
  for (const [d, row] of Object.entries(TABLE)) {
    const R = await page.evaluate((dd) => [0, 4, 8, 12, 16].map((l) => window.ARITH_PIVOT_DEBUG.relay(dd, l).log10), Number(d));
    check(`relay δ = ${d}: |w|^{2^ℓ} matches the 100-digit table`, R.every((lg, k) => Math.abs(10 ** lg / row[k] - 1) < 1e-9), JSON.stringify(R.map((lg, k) => 10 ** lg / row[k] - 1)));
  }
}
for (const [k, v] of [['1', 'cutoff'], ['2', 'mollifier'], ['3', 'schur']]) {
  await page.click(`#regimeLens [data-regime="${k}"]`); await settle(page); const s = await state();
  check(`lens ${k}: scene ${v}, only the pressed segment`, s.scene === v && s.regime === k && await page.$$eval('#regimeLens [data-regime]', (els) => els.filter((e) => e.getAttribute('aria-pressed') === 'true').map((e) => e.dataset.regime).join()) === k);
}
for (const scene of ['cutoff', 'mollifier', 'schur', 'relay']) {
  await page.click(`#sceneChips [data-scene="${scene}"]`); await settle(page); const s = await state();
  check(`scene chip ${scene}: scene, pressed chip and lens`, s.scene === scene && s.preset === null && await page.locator(`#sceneChips [data-scene="${scene}"]`).getAttribute('aria-pressed') === 'true'
    && s.regime === ({ cutoff: '1', mollifier: '2', schur: '3', relay: '3' })[scene]);
}
await page.click('#regimeLens [data-regime="3"]'); await settle(page);
check('lens 3 keeps the relay scene once inside way 3', (await state()).scene === 'relay');
// the rail in the relay is the layer ℓ = 16τ; in the Schur cone it is the elimination
for (const tau of [0, 0.5, 1]) {
  await input('#now', tau); const s = await state();
  check(`rail τ = ${tau} in the relay: ℓ = ${16 * tau}`, near(s.ell, 16 * tau, 1e-12) && (await page.textContent('#tau')).includes(`ℓ ${(16 * tau).toFixed(1)}`));
}
await page.click('#sceneChips [data-scene="schur"]'); await settle(page);
for (const [tau, l1, l2] of [[0, 0, 0], [0.25, 0.5, 0], [0.5, 1, 0], [0.75, 1, 0.5], [1, 1, 1]]) {
  await input('#now', tau); const s = await state();
  check(`rail τ = ${tau} in the Schur cone: λ₁ = ${l1}, λ₂ = ${l2}`, near(s.lam1, l1, 1e-12) && near(s.lam2, l2, 1e-12));
}

// the handles: the entry of the hop (θ) and the landing point of the relay (δ); the camera does not turn
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
for (const [scene, key, from, to, tol] of [['mollifier', 'theta', 0.7, 0.45, 0.012], ['relay', 'delta', 0.05, 0.2, 0.006]]) {
  await page.evaluate(([sc0, k, v]) => window.ARITH_PIVOT_DEBUG.setState({ scene: sc0, [k]: v, tau: 0.5 }), [scene, key, from]); await settle(page);
  const before = await state(), hb = await page.evaluate(() => window.ARITH_PIVOT_DEBUG.handleBox()), anchor = await page.evaluate((v) => window.ARITH_PIVOT_DEBUG.anchorPoint(v), from);
  check(`${scene} handle: the projected button sits on its anchor and is visible`, !!hb && await page.locator('#stageHandle').isVisible() && Math.hypot(hb.x - anchor.x, hb.y - anchor.y) < 1.5);
  const target = await page.evaluate((v) => window.ARITH_PIVOT_DEBUG.anchorPoint(v), to);
  if (hb && target) {
    await page.mouse.move(hb.x, hb.y); await page.mouse.down();
    check(`${scene} handle: pointerdown enters the dragging state`, await page.locator('#stageHandle').evaluate((el) => el.classList.contains('dragging')));
    await page.mouse.move(target.x, target.y, { steps: 8 }); await page.mouse.up(); await settle(page);
    const after = await state();
    check(`${scene} handle: dragging to the anchor of ${to} sets ${key} ≈ ${to} without turning the camera`, Math.abs(after[key] - to) <= tol && same(after.camera, before.camera)
      && !(await page.locator('#stageHandle').evaluate((el) => el.classList.contains('dragging'))), `${key} ${after[key]}`);
    checkMath(after, `after ${scene} drag`);
  }
  await page.focus('#stageHandle'); const v0 = (await state())[key];
  await page.keyboard.press('ArrowRight'); await settle(page);
  check(`${scene} handle: → on the focused ring adds 0.005`, near((await state())[key], Math.min(key === 'theta' ? 0.9 : 0.25, Math.round((v0 + 0.005) * 200) / 200), 1e-12));
  await page.evaluate(() => document.activeElement && document.activeElement.blur());
}
// the head: at τ = 0 the hop starts at its entry; at τ = 1 the relay lands at 1/2 + δ
{
  await page.evaluate(() => window.ARITH_PIVOT_DEBUG.setState({ scene: 'mollifier', theta: 0.7, tau: 0 })); await settle(page);
  let r = await page.evaluate(() => { const st = window.ARITH_PIVOT_DEBUG.state, b = document.getElementById('stage').getBoundingClientRect(), el = document.getElementById('stage'); return { head: { x: b.left + el.clientLeft + st.stageFrame.head[0], y: b.top + el.clientTop + st.stageFrame.head[1] }, a: window.ARITH_PIVOT_DEBUG.anchorPoint(0.7) }; });
  check('mollifier rail τ = 0: the amber head sits at the entry σ = 1/2 + 1.6θ', Math.hypot(r.head.x - r.a.x, r.head.y - r.a.y) < 0.6);
  await page.evaluate(() => window.ARITH_PIVOT_DEBUG.setState({ scene: 'relay', delta: 0.05, tau: 1 })); await settle(page);
  r = await page.evaluate(() => { const st = window.ARITH_PIVOT_DEBUG.state, b = document.getElementById('stage').getBoundingClientRect(), el = document.getElementById('stage'); return { head: { x: b.left + el.clientLeft + st.stageFrame.head[0], y: b.top + el.clientTop + st.stageFrame.head[1] }, a: window.ARITH_PIVOT_DEBUG.anchorPoint(0.05) }; });
  check('relay rail τ = 1: the amber head lands at 1/2 + δ', Math.hypot(r.head.x - r.a.x, r.head.y - r.a.y) < 0.6);
}
// a drag on the empty stage turns the camera and leaves the parameters alone
{
  const before = await state(), box = await page.evaluate(() => { const r = document.getElementById('stage').getBoundingClientRect(); return [r.left + r.width * 0.92, r.top + r.height * 0.3]; });
  await page.mouse.move(box[0], box[1]); await page.mouse.down(); await page.mouse.move(box[0] - 60, box[1] - 20, { steps: 6 }); await page.mouse.up(); await settle(page);
  const after = await state();
  check('orbit: a drag on empty stage turns the camera, δ and θ unchanged', after.delta === before.delta && after.theta === before.theta && (after.camera.yaw !== before.camera.yaw || after.camera.pitch !== before.camera.pitch));
}
await page.click('#infoBtn'); await settle(page);
check('info button opens the theory drawer', await page.locator('#drawer [role="dialog"]').isVisible());
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').isHidden());
check('play: ▶ advances the rail', await playsAfter(page, () => page.click('#play'), () => window.ARITH_PIVOT_DEBUG.state));
await pause();
{ const paused = await state(); await settle(page, 50); check('pause holds the rail', !paused.playing && same((await state()).tau, paused.tau)); }

// What each card's caption says, read off the page.
{
  await pick('turan-zeno-hard-cutoff'); let s = await state();
  check('cutoff card: M = 19, H₁₉ = 3.548, σ* = 1.006988, the 19 vectors close', s.M === 19 && s.cutoff.harmonic.toFixed(3) === '3.548' && s.cutoff.sigmaStar.toFixed(6) === '1.006988'
    && cx.abs(s.cutoff.phasors[19]) < 5e-15 && !s.cutoff.zeroFree && [...Array(18).keys()].every((k) => PT_FREE.has(k + 1)));
  await pick('mollifier-four-sevenths-wall'); s = await state();
  check('mollifier card: θ = 0.700, formula 47.52% unproved, 40.86% at 4/7', (100 * s.mollifier.kappa).toFixed(2) === '47.52' && !s.mollifier.proved && (100 * s.mollifier.kappa47).toFixed(2) === '40.86' && near(s.mollifier.entrySigma, 1.62, 1e-12));
  await pick('block-schur-pivot-mera'); s = await state();
  check('Schur card: still at λ₁ = 1, λ₂ = 0 with G̃_PP = [5/9, 5/18; 5/18, 8/9] and det 5/16', s.schur.S[0][0].text === '5/9' && s.schur.S[0][1].text === '5/18' && s.schur.S[1][1].text === '8/9' && s.schur.detG.text === '5/16' && s.schur.apex.text === '3/4');
  await pick('fabry-perot-rogue-explosion'); s = await state();
  check('relay card: |w| = 1.000250, 1.30×10⁷ at ℓ = 16, ℓ* = 12', s.relay.absW.toFixed(6) === '1.000250' && (10 ** s.relay.layers[16]).toExponential(2) === '1.30e+7' && s.relay.star === 12);
}

/* ---------- strip labels: at least five blank pixel rows between each curve label and its curve ---------- */
async function stripClearance(p, tag) {
  const r = await p.evaluate(() => {
    const st = window.ARITH_PIVOT_DEBUG.state, labels = (st.plot && st.plot.labels) || [], cv = document.getElementById('plot');
    // read the strip once through a fresh canvas (one readback each, so the browser has no repeated-readback warning)
    const cp = document.createElement('canvas'); cp.width = cv.width; cp.height = cv.height;
    const ctx = cp.getContext('2d', { willReadFrequently: true }); ctx.drawImage(cv, 0, 0);
    const k = cv.width / cv.clientWidth, img = ctx.getImageData(0, 0, cv.width, cv.height).data, W = cv.width, H = cv.height;
    const hex = (h) => { const m = /^#?([\da-f]{6})$/i.exec(String(h).trim()); const n = parseInt(m[1], 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
    const ink = (x, y, c) => { if (x < 0 || y < 0 || x >= W || y >= H) return false; const i = 4 * (y * W + x); return img[i + 3] > 24 && Math.abs(img[i] - c[0]) + Math.abs(img[i + 1] - c[1]) + Math.abs(img[i + 2] - c[2]) < 110; };
    return labels.map((l) => {
      const lc = hex(TRV.palette[l.ink]), cc = hex(TRV.palette[l.curveInk]);
      const x0 = Math.ceil(l.box.left * k) + 1, x1 = Math.floor(l.box.right * k) - 1, y0 = Math.floor((l.box.top - 2) * k), y1 = Math.ceil((l.box.bottom + 2) * k);
      let gTop = Infinity, gBot = -Infinity;
      for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) if (ink(x, y, lc)) { gTop = Math.min(gTop, y); gBot = Math.max(gBot, y); }
      let min = Infinity, cols = 0;
      for (let x = x0; x <= x1; x++) {
        if (l.above) { for (let y = gBot + 1; y <= gBot + 60 * k; y++) if (ink(x, y, cc)) { min = Math.min(min, (y - gBot - 1) / k); cols++; break; } }
        else { for (let y = gTop - 1; y >= gTop - 60 * k; y--) if (ink(x, y, cc)) { min = Math.min(min, (gTop - y - 1) / k); cols++; break; } }
      }
      return { name: l.name, glyph: Number.isFinite(gTop), cols, min, inside: l.box.top >= 0 && l.box.bottom <= cv.clientHeight && l.box.left >= 0 && l.box.right <= cv.clientWidth };
    });
  });
  check(`${tag}: every strip curve label has ≥ 5 blank pixel rows to its curve and stays inside the strip`, r.length > 0 && r.every((x) => x.glyph && x.cols > 0 && x.min >= 5 && x.inside), JSON.stringify(r));
}
for (const lang of ['zh', 'en']) for (const [kind, width, height] of [['desktop', 1440, 900], ['phone', 390, 844], ['narrow', 1081, 700]]) {
  const p = await T.open(BOOK, ID, `?lang=${lang}`, { viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
  await settle(p);
  for (const card of ['mollifier-four-sevenths-wall', 'block-schur-pivot-mera', 'fabry-perot-rogue-explosion']) { await pick(card, p); await stripClearance(p, `${kind} ${lang}/${card}`); }
  for (const [d, th] of [[0.01, 0.4], [0.2, 0.88]]) { await p.evaluate(([dd, t]) => window.ARITH_PIVOT_DEBUG.setState({ delta: dd, theta: t }), [d, th]); await settle(p);
    for (const scene of ['mollifier', 'relay']) { await p.evaluate((sc0) => window.ARITH_PIVOT_DEBUG.setState({ scene: sc0, tau: 1 }), scene); await settle(p); await stripClearance(p, `${kind} ${lang}/${scene} δ=${d} θ=${th}`); } }
  await p.context().close();
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
    && await p.evaluate(() => TRV.still && TRV.shot && document.getElementById('stageHandle').hidden && document.documentElement.dataset.trPalette === undefined));
  checkMath(s, `still ${lang}/${card}`);
  if (card === 'turan-zeno-hard-cutoff') check(`still ${lang}/${card}: the gate stands at M = 19`, s.M === 19);
  if (card === 'fabry-perot-rogue-explosion') check(`still ${lang}/${card}: layer 16, 1.30×10⁷`, near(s.ell, 16, 1e-12) && (10 ** s.relay.log10).toExponential(2) === '1.30e+7');
  if (card === 'block-schur-pivot-mera') check(`still ${lang}/${card}: the first level is complete`, near(s.lam1, 1, 1e-12) && near(s.lam2, 0, 1e-12));
  await p.context().close();
}

check('palette: every observed document stayed undefined', paletteDocuments.length > 0 && paletteDocuments.every((r) => r.absent), JSON.stringify(paletteDocuments.filter((r) => !r.absent)));
check('palette: zero attempted writes', paletteMutations.length === 0, JSON.stringify(paletteMutations));
check('zero page, console and request errors', T.errors.length === 0, T.errors.join(' | '));
check('zero browser console warnings after driver filtering', browserWarnings.length === 0, browserWarnings.slice(0, 4).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, T.warnings.map((w) => `${w.name}: ${w.detail}`).join(' | '));
await T.finish();
