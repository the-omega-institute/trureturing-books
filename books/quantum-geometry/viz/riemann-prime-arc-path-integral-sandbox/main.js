/* ZETA//SPIRAL · 黎曼路径积分与素数极小圆弧体 · The Riemann path integral and prime minimal arcs
   World axes (kit.solid): x right = Re, y into the screen at yaw 0 = Im (the floor is the complex plane ℂ), z up.
     spiral scene     every integer n is an arrow n^{−s} = n^{−σ} e^{−it ln n}; the arrows are chained head to tail and
                      the n-th vertex S_n = Σ_{k≤n} k^{−s} is lifted to the height HZ · ln n, the action of the path,
                      computed from the factorization n = Π p^{m_p} as Σ m_p ln p. The amber bead on the floor and the
                      amber axis above it are ζ(s), computed on Re s > 0 from the alternating η series (Borwein weights)
                      divided by 1 − 2^{1−s}; the dashed ink line at the top of the chain is the remainder ζ(s) − S_N.
                      Around O on the floor: cyan rings of radius p^{−σ} and magenta rings of radius p^{−(1−σ)}
                      (p = 2, 3, 5, 7), the arrow lengths of the same prime on the sides of s and 1 − s. The thin ink
                      curve on the floor is the trace of ζ(σ + iu) for 0 ≤ u ≤ t. The optional magenta chain is the
                      Möbius sum Σ μ(n) n^{−s}, which lands on 1/ζ(s) where σ > 1.
     staircase scene  the explicit formula ψ₀(x) = x − Σ_ρ x^ρ/ρ − ln 2π − ½ ln(1 − x^{−2}) truncated in ±γ pairs: the back
                      row of the violet sheet is the main term alone and each row towards the front adds one pair of
                      zeros; the amber row is the newest one (zeros with γ ≤ t, at most K), the cyan staircase just in
                      front of it is ψ₀ itself, and the floor plot in front compares the magenta zero-wave residual with
                      the cyan sawtooth ψ₀ − main term.
   Every number is computed here; the instances of the cited Lean theorems are checked in instances().
   Read-only probe: window.ZETA_SPIRAL_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI;

  /* ---------- the first fifty nontrivial zeros ½ + iγ (ordinates from a high-precision table) ---------- */
  const GAMMA = [
    14.134725141734695, 21.022039638771556, 25.01085758014569, 30.424876125859512, 32.93506158773919, 37.586178158825675,
    40.9187190121475, 43.327073280915, 48.00515088116716, 49.7738324776723, 52.970321477714464, 56.44624769706339,
    59.34704400260235, 60.83177852460981, 65.1125440480816, 67.07981052949417, 69.54640171117398, 72.0671576744819,
    75.70469069908393, 77.1448400688748, 79.33737502024937, 82.91038085408603, 84.73549298051705, 87.42527461312523,
    88.80911120763446, 92.49189927055849, 94.65134404051989, 95.87063422824531, 98.83119421819369, 101.31785100573138,
    103.72553804047834, 105.44662305232609, 107.1686111842764, 111.02953554316967, 111.87465917699264, 114.32022091545271,
    116.22668032085755, 118.79078286597621, 121.37012500242065, 122.94682929355258, 124.25681855434577, 127.5166838795965,
    129.57870419995606, 131.08768853093267, 133.4977372029976, 134.75650975337388, 138.11604205453344, 139.7362089521214,
    141.12370740402113, 143.11184580762063
  ];
  const T_SPIRAL = 36, T_STAIR = 145, RATE_SPIRAL = 2.4, RATE_STAIR = 10;
  const SIG_MIN = 0.2, SIG_MAX = 2, N_MIN = 20, N_MAX = 400, K_MIN = 5, K_MAX = 50, X_MIN = 2, X_MAX = 14;
  const HALO_P = [2, 3, 5, 7];
  const HZ = 0.4;                               // world height per unit of action ln n
  const R_EXIT = 2.25;                          // a chain that leaves this radius is drawn up to the exit
  const PHI_H = -0.75;                          // the angle of the σ handle on the cyan 2^{−σ} ring
  const EULER_GAMMA = 0.5772156649015329;
  const DU = 0.06, NU_TRACE = Math.round(T_SPIRAL / DU);
  const VIEWS = {
    spiral: { oblique: [0.6, 0.46], top: [0, PI / 2 - 0.001], side: [0, 0.03] },
    staircase: { oblique: [-0.38, 0.56], top: [0, PI / 2 - 0.001], side: [0, 0.03] }
  };
  const VANTAGES = ['oblique', 'top', 'side'];

  /* ---------- complex numbers [re, im] ---------- */
  const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const csub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cdiv = (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
  const csc = (a, k) => [a[0] * k, a[1] * k];
  const conj = (a) => [a[0], -a[1]];
  const cexp = (z) => { const e = Math.exp(z[0]); return [e * Math.cos(z[1]), e * Math.sin(z[1])]; };
  const clog = (z) => [Math.log(Math.hypot(z[0], z[1])), Math.atan2(z[1], z[0])];
  const cabs = (z) => Math.hypot(z[0], z[1]);
  const LN = new Float64Array(N_MAX + 2);
  for (let n = 1; n < LN.length; n++) LN[n] = Math.log(n);
  /** n^{−s} for a positive integer n. */
  const npow = (n, s) => { const l = n < LN.length ? LN[n] : Math.log(n), m = Math.exp(-s[0] * l); return [m * Math.cos(s[1] * l), -m * Math.sin(s[1] * l)]; };
  /** x^{a} for real x > 0 and complex a. */
  const rpow = (x, a) => cexp(csc(a, Math.log(x)));

  /* ---------- arithmetic: smallest prime factor, Möbius μ, von Mangoldt Λ, the height Σ m_p ln p ---------- */
  const SPF = new Int32Array(N_MAX + 1), MU = new Int8Array(N_MAX + 1), LAMBDA = new Float64Array(N_MAX + 1), HEIGHT = new Float64Array(N_MAX + 1);
  const FACT = [null];
  for (let n = 2; n <= N_MAX; n++) if (!SPF[n]) for (let m = n; m <= N_MAX; m += n) if (!SPF[m]) SPF[m] = n;
  MU[1] = 1; FACT.push([]);
  for (let n = 2; n <= N_MAX; n++) {
    const f = []; let m = n;
    while (m > 1) { const p = SPF[m]; let e = 0; while (m % p === 0) { m /= p; e++; } f.push([p, e]); }
    FACT[n] = f;
    MU[n] = f.some(([, e]) => e > 1) ? 0 : (f.length % 2 ? -1 : 1);
    LAMBDA[n] = f.length === 1 ? Math.log(f[0][0]) : 0;
    HEIGHT[n] = f.reduce((acc, [p, e]) => acc + e * Math.log(p), 0);
  }
  const PRIMES = []; for (let n = 2; n <= N_MAX; n++) if (SPF[n] === n) PRIMES.push(n);
  const isPrimePower = (n) => n >= 2 && FACT[n].length === 1;

  /* ---------- ζ on Re s > 0 through the alternating η series (Borwein weights), ξ through the Stirling series ---------- */
  const BN = 90;
  const BD = (() => {                          // d_k = n Σ_{i≤k} (n + i − 1)! 4^i / ((n − i)! (2i)!)
    const d = [], n = BN; let term = 1 / n, sum = term; d.push(n * sum);
    for (let i = 1; i <= n; i++) { term *= (n + i - 1) * 4 * (n - i + 1) / ((2 * i - 1) * (2 * i)); sum += term; d.push(n * sum); }
    return d;
  })();
  const BW = BD.slice(0, BN).map((dk, k) => ((k & 1) ? 1 : -1) * (dk - BD[BN]) / BD[BN]);
  /** η(s) = lim Σ_{n<N} (−1)^n (n + 1)^{−s}, accelerated: η ≈ −(1/d_n) Σ_{k<n} (−1)^k (d_k − d_n)(k + 1)^{−s}. */
  function eta(s) {
    let re = 0, im = 0;
    for (let k = 0; k < BN; k++) { const p = npow(k + 1, s); re += BW[k] * p[0]; im += BW[k] * p[1]; }
    return [re, im];
  }
  /** ζ(s) = η(s)/(1 − 2^{1−s}) for Re s > 0; null at the pole s = 1. Where 1 − 2^{1−s} vanishes on Re s = 1 (a removable
      0/0 of the formula), the mean of two neighbours ±10⁻⁴ is used. */
  function zetaRaw(s) {
    if (Math.abs(s[0] - 1) < 1e-12 && Math.abs(s[1]) < 1e-12) return null;
    const two = npow(2, [s[0] - 1, s[1]]), den = [1 - two[0], -two[1]];
    if (cabs(den) < 1e-6) { const a = zetaRaw([s[0] + 1e-4, s[1]]), b = zetaRaw([s[0] - 1e-4, s[1]]); return a && b ? csc(cadd(a, b), 0.5) : null; }
    return cdiv(eta(s), den);
  }
  const zetaCache = new Map();
  function zeta(s) {
    const key = `${s[0]}|${s[1]}`;
    if (zetaCache.has(key)) return zetaCache.get(key);
    const z = zetaRaw(s);
    zetaCache.set(key, z);
    if (zetaCache.size > 400) zetaCache.delete(zetaCache.keys().next().value);
    return z;
  }
  /** ln Γ(z) for Re z > 0: shift to Re ≥ 12, then the Stirling series with eight Bernoulli terms. */
  function lnGamma(z) {
    let shift = [0, 0], w = z.slice();
    while (w[0] < 12) { shift = cadd(shift, clog(w)); w = [w[0] + 1, w[1]]; }
    const B = [1 / 6, -1 / 30, 1 / 42, -1 / 30, 5 / 66, -691 / 2730, 7 / 6, -3617 / 510];
    let r = cadd(csub(cmul([w[0] - 0.5, w[1]], clog(w)), w), [0.5 * Math.log(TAU), 0]);
    const w2 = cmul(w, w); let wp = w;
    for (let k = 1; k <= B.length; k++) { r = cadd(r, cdiv([B[k - 1] / (2 * k * (2 * k - 1)), 0], wp)); wp = cmul(wp, w2); }
    return csub(r, shift);
  }
  /** G(s) = ½ s(s − 1) π^{−s/2} Γ(s/2), so that ξ = G ζ. */
  function gfac(s) {
    const lg = lnGamma([s[0] / 2, s[1] / 2]), lp = Math.log(PI);
    return cmul(csc(cmul(s, [s[0] - 1, s[1]]), 0.5), cexp([lg[0] - s[0] / 2 * lp, lg[1] - s[1] / 2 * lp]));
  }
  function xi(s) { const z = zeta(s); return z ? cmul(gfac(s), z) : null; }
  /** The plain alternating partial sum Σ_{n<N} (−1)^n (n + 1)^{−s} (not accelerated). */
  const altCache = new Map();
  function altPartial(s, N) {
    const key = `${s[0]}|${s[1]}|${N}`;
    if (altCache.has(key)) return altCache.get(key);
    let re = 0, im = 0;
    for (let n = 0; n < N; n++) { const p = npow(n + 1, s), sg = n & 1 ? -1 : 1; re += sg * p[0]; im += sg * p[1]; }
    const out = [re, im];
    altCache.set(key, out); if (altCache.size > 60) altCache.delete(altCache.keys().next().value);
    return out;
  }

  /* ---------- the trace ζ(σ + iu), 0 ≤ u ≤ 36, for one σ ---------- */
  const traceCache = new Map();
  function trace(sig) {
    const key = sig.toFixed(4);
    if (traceCache.has(key)) return traceCache.get(key);
    const re = new Float64Array(NU_TRACE + 1), im = new Float64Array(NU_TRACE + 1), ab = new Float64Array(NU_TRACE + 1);
    for (let j = 0; j <= NU_TRACE; j++) {
      const z = zetaRaw([sig, j * DU]);
      if (!z) { re[j] = im[j] = ab[j] = NaN; continue; }
      re[j] = z[0]; im[j] = z[1]; ab[j] = cabs(z);
    }
    const out = { sig, re, im, ab };
    traceCache.set(key, out); if (traceCache.size > 40) traceCache.delete(traceCache.keys().next().value);
    return out;
  }

  /* ---------- the path chain Σ n^{−s}, the Möbius chain Σ μ(n) n^{−s}, the Euler product ---------- */
  const chainCache = new Map();
  function chain(sig, t, N) {
    const key = `${sig}|${t}|${N}`;
    if (chainCache.has(key)) return chainCache.get(key);
    const s = [sig, t], S = new Float64Array(2 * (N + 1)), M = new Float64Array(2 * (N + 1));
    let sr = 0, si = 0, mr = 0, mi = 0, top = N, mtop = N;
    for (let n = 1; n <= N; n++) {
      const p = npow(n, s);
      sr += p[0]; si += p[1]; S[2 * n] = sr; S[2 * n + 1] = si;
      if (MU[n]) { mr += MU[n] * p[0]; mi += MU[n] * p[1]; }
      M[2 * n] = mr; M[2 * n + 1] = mi;
      if (top === N && Math.hypot(sr, si) > R_EXIT) top = n - 1;
      if (mtop === N && Math.hypot(mr, mi) > R_EXIT) mtop = n - 1;
    }
    let er = 1, ei = 0;
    const eulerSteps = [];
    for (const p of PRIMES) { if (p > N) break; const q = npow(p, s), f = cdiv([1, 0], [1 - q[0], -q[1]]); [er, ei] = cmul([er, ei], f); eulerSteps.push({ p, P: [er, ei] }); }
    const out = { s, N, S, M, top, mtop, euler: [er, ei], eulerSteps, sum: [sr, si], mob: [mr, mi] };
    chainCache.set(key, out); if (chainCache.size > 60) chainCache.delete(chainCache.keys().next().value);
    return out;
  }
  const vtx = (C, n) => [C.S[2 * n], C.S[2 * n + 1]];
  const mvtx = (C, n) => [C.M[2 * n], C.M[2 * n + 1]];

  /* ---------- the explicit formula on x ∈ [1.5, 14] ---------- */
  const DX = 0.05, X0 = 1.5, NX = Math.round((X_MAX - X0) / DX) + 1;
  const XS = Float64Array.from({ length: NX }, (_, i) => X0 + i * DX);
  const mainTerm = (x) => x - Math.log(TAU) - 0.5 * Math.log(1 - 1 / (x * x));
  /** −2 Re(x^ρ/ρ) for ρ = ½ + iγ: the standing wave of one pair of zeros. */
  const wave = (x, g) => { const rho = [0.5, g]; return -2 * cdiv(rpow(x, rho), rho)[0]; };
  const CUM = (() => {                         // CUM[k][i]: main term plus the first k waves at XS[i]
    const out = [Float64Array.from(XS, mainTerm)];
    for (let k = 0; k < K_MAX; k++) { const prev = out[k], row = new Float64Array(NX); for (let i = 0; i < NX; i++) row[i] = prev[i] + wave(XS[i], GAMMA[k]); out.push(row); }
    return out;
  })();
  const recAt = (k, x) => { let v = mainTerm(x); for (let j = 0; j < k; j++) v += wave(x, GAMMA[j]); return v; };
  /** ψ(x) = Σ_{n≤x} Λ(n) and ψ₀(x), the midpoint at prime powers. */
  const psi = (x) => { let s = 0; for (let n = 2; n <= Math.floor(x + 1e-12); n++) s += LAMBDA[n]; return s; };
  const psi0 = (x) => { const n = Math.round(x); return Math.abs(x - n) < 1e-12 && n >= 2 ? psi(x) - LAMBDA[n] / 2 : psi(x); };
  const ix = (x) => Math.round((x - X0) / DX);
  /** The rise of the k-zero reconstruction across [n − ½, n + ½]; exactly Λ(n) for ψ₀ itself. */
  const rise = (k, n) => CUM[k][ix(n + 0.5)] - CUM[k][ix(n - 0.5)];
  /** The integrated explicit formula at y = ln x: the zero side truncated to k pairs, and the arithmetic side. */
  function integrated(x, k) {
    const y = Math.log(x);
    let lhs = 0; for (let j = 0; j < k; j++) lhs += 2 * Math.exp(y / 2) * Math.cos(GAMMA[j] * y) / (0.25 + GAMMA[j] * GAMMA[j]);
    let sl = 0, ps = 0; for (let n = 2; n <= Math.floor(x + 1e-12); n++) { sl += LAMBDA[n] / n; ps += LAMBDA[n]; }
    const U = x * sl - ps - x * Math.log(x) + (1 + EULER_GAMMA) * x;
    let tr = 0; for (let n = 1; n < 400; n++) { const term = Math.exp(-2 * n * y) / (2 * n * (2 * n + 1)); tr += term; if (term < 1e-18) break; }
    const rhs = U - Math.log(TAU) + tr;
    return { y, lhs, U, trivial: tr, rhs, gap: lhs - rhs };
  }

  /* ---------- state ---------- */
  const S = { scene: 'spiral', sigma: 0.5, t: GAMMA[0], N: 160, K: 50, mobius: false, xs: 10, vantage: 'oblique' };
  const sNow = () => [S.sigma, S.t];
  const kNow = () => { let k = 0; while (k < S.K && GAMMA[k] <= S.t + 1e-12) k++; return k; };

  /** Everything the page shows, from the state. */
  function model() {
    const M = { scene: S.scene };
    if (S.scene === 'spiral') {
      const s = sNow(), C = chain(S.sigma, S.t, S.N), z = zeta(s);
      M.s = s; M.C = C; M.zeta = z; M.abs = z ? cabs(z) : Infinity;
      M.inv = z && M.abs > 1e-12 ? cdiv([1, 0], z) : null;
      M.halos = HALO_P.map((p) => ({ p, fwd: Math.pow(p, -S.sigma), dual: Math.pow(p, -(1 - S.sigma)) }));
      M.dualShown = S.sigma < 1;
      M.top = C.top;
      M.remainder = z ? csub(z, vtx(C, C.top)) : null;
      const N = C.top;
      M.em = N >= 1 ? cadd(cdiv(npow(N, [s[0] - 1, s[1]]), [s[0] - 1, s[1]]), csc(npow(N, s), -0.5)) : null;   // N^{1−s}/(s − 1) − N^{−s}/2
      M.fitR = Math.max(1.6, S.mobius && S.sigma > 1 && M.inv ? cabs(M.inv) + 0.18 : 0, z && M.abs < 2.4 ? M.abs + 0.12 : 0);
    } else {
      M.k = kNow(); M.x = S.xs;
      M.rec = recAt(M.k, S.xs); M.exact = psi0(S.xs); M.main = mainTerm(S.xs);
      M.int = integrated(S.xs, M.k);
      M.rises = []; for (let n = 2; n <= 13; n++) M.rises.push({ n, exact: LAMBDA[n], rec: rise(M.k, n), pp: isPrimePower(n) });
    }
    return M;
  }

  /* ---------- the instances of the cited theorems ---------- */
  const instCache = new Map();
  function instances(M) {
    const key = `${S.scene}|${S.sigma}|${S.t}|${S.N}|${S.K}|${S.xs}`;
    if (instCache.has(key)) return instCache.get(key);
    const out = {};
    // 1. heights from the factorization equal ln n; prime-power rungs of different primes never coincide
    let hErr = 0; for (let n = 2; n <= S.N; n++) hErr = Math.max(hErr, Math.abs(HEIGHT[n] - Math.log(n)));
    const rungs = []; for (let n = 2; n <= S.N; n++) if (isPrimePower(n)) rungs.push(HEIGHT[n]);
    rungs.sort((a, b) => a - b);
    let gap = Infinity; for (let j = 1; j < rungs.length; j++) gap = Math.min(gap, rungs[j] - rungs[j - 1]);
    out.heights = { maxError: hErr, rungs: rungs.length, minRungGap: gap };
    if (S.scene === 'spiral') {
      const s = M.s, z = M.zeta;
      // 2. Euler product = Dirichlet sum for σ > 1
      out.euler = S.sigma > 1 && z ? { applies: true, sum: M.C.sum, product: M.C.euler, sumGap: cabs(csub(M.C.sum, z)), productGap: cabs(csub(M.C.euler, z)) } : { applies: false };
      // 3. the alternating partial sums approach (1 − 2^{1−s}) ζ(s)
      if (z) {
        const two = npow(2, [s[0] - 1, s[1]]), lim = cmul([1 - two[0], -two[1]], z), A = altPartial(s, 4000), B = altPartial(s, 4001);
        out.eta = { limit: lim, partial: A, mid: csc(cadd(A, B), 0.5), partialGap: cabs(csub(A, lim)), midGap: cabs(csub(csc(cadd(A, B), 0.5), lim)) };
      } else out.eta = null;
      // 4–5. ξ reflection and conjugation, normalized by |G(s)|
      const G = gfac(s), gAbs = cabs(G), x1 = z ? cmul(G, z) : null;
      out.xi = { G: gAbs, xi: x1, normalized: x1 ? csc(x1, 1 / gAbs) : null };
      if (S.sigma > 0 && S.sigma < 1 && x1) {
        const x2 = xi([1 - s[0], -s[1]]), x3 = xi([1 - s[0], s[1]]);
        out.xi.reflection = x2 ? cabs(csub(x2, x1)) / gAbs : null;
        out.xi.conjugation = x3 ? cabs(csub(x3, conj(x1))) / gAbs : null;
      }
      // 6. the explicit quartic with full symmetry and four off-line zeros (δ = σ − ½, γ = t)
      const d = S.sigma - 0.5, g = S.t;
      const F = (w) => { const zz = [w[0] - 0.5, w[1]]; return cmul(cadd(cmul([zz[0] - d, zz[1]], [zz[0] - d, zz[1]]), [g * g, 0]), cadd(cmul([zz[0] + d, zz[1]], [zz[0] + d, zz[1]]), [g * g, 0])); };
      if (Math.abs(d) > 1e-12 && Math.abs(g) > 1e-12) {
        const roots = [[0.5 + d, g], [0.5 + d, -g], [0.5 - d, g], [0.5 - d, -g]];
        out.quartic = { delta: d, gamma: g, atRoots: Math.max(...roots.map((r) => cabs(F(r)))), roots,
          reflect: cabs(csub(F([1 - s[0], -s[1]]), F(s))), conj: cabs(csub(F([s[0], -s[1]]), conj(F(s)))), onLine: F([0.5, g]) };
      } else out.quartic = null;
    } else {
      out.integrated = M.int;
    }
    instCache.set(key, out); if (instCache.size > 80) instCache.delete(instCache.keys().next().value);
    return out;
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probeEl = document.createElement('div'); probeEl.hidden = true; probeEl.style.position = 'absolute'; tagBox.appendChild(probeEl);
  const options = { canvas: $('cv'), yaw: VIEWS.spiral.oblique[0], pitch: VIEWS.spiral.oblique[1], wheel: false, radius: 0.32, cx: 0.5, cy: 0.5, onChange: () => paint() };
  const sc = kit.solid(stageEl, options);
  if (TRV.still) stageEl.classList.add('still');

  function boxOf(el, sr) {
    if (!el || el.hidden || !el.getClientRects().length) return null;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return null;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return null;
    return { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
  }
  function hudBoxes() {
    const sr = stageEl.getBoundingClientRect(), out = [];
    for (const el of [$('hudTl'), $('vantageChips'), $('legend')]) { const b = boxOf(el, sr); if (b && (el.id !== 'legend' || el.textContent.trim())) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 6); else bottom = Math.min(bottom, b.y - 6); }
    return { x: 10, y: top, w: Math.max(40, W - 20), h: Math.max(60, bottom - top) };
  }

  /* labels: placed after drawing by priority, off each other, the HUD and the handle */
  const sizes = new Map();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizes.clear(); paint(); });
  TRV.onLang(() => sizes.clear());
  function sizeOf(html, cls) {
    const k = `${TRV.lang()}|${cls}|${html}`;
    let sz = sizes.get(k);
    if (!sz) { probeEl.className = 'tag ' + cls; probeEl.innerHTML = html; probeEl.hidden = false; sz = [probeEl.offsetWidth, probeEl.offsetHeight]; probeEl.hidden = true; if (sz[0] > 0) sizes.set(k, sz); }
    return sz;
  }
  let LB = [], OBST = [], BOUNDS = null, PLACED = [];
  const meets = (a, b, m) => a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m;
  function placeLabels() {
    const placed = [];
    LB.sort((a, b) => b.pri - a.pri);
    for (const l of LB) {
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      const base = Math.atan2(l.dir[1], l.dir[0]), cands = [];
      for (const r of [l.r, l.r + 10, l.r + 24, l.r + 40]) for (const da of [0, 0.5, -0.5, 1.0, -1.0, 1.6, -1.6, 2.3, -2.3, PI]) {
        const ux = Math.cos(base + da), uy = Math.sin(base + da), ext = Math.abs(ux) * w / 2 + Math.abs(uy) * h / 2;
        cands.push([ux * (r + ext), uy * (r + ext)]);
      }
      let ok = null;
      for (const [dx, dy] of cands) {
        const b = { x: l.q[0] + dx - w / 2, y: l.q[1] + dy - h / 2, w, h };
        if (b.x < BOUNDS.x || b.y < BOUNDS.y || b.x + w > BOUNDS.x + BOUNDS.w || b.y + h > BOUNDS.y + BOUNDS.h) continue;
        if (placed.some((p) => meets(p, b, 3)) || OBST.some((p) => meets(p, b, 2))) continue;
        ok = b; break;
      }
      if (!ok) continue;
      placed.push(Object.assign({ key: l.key, text: l.html }, ok));
      sc.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
    }
    PLACED = placed;
  }

  /* the world box of each scene, for the camera fit */
  const SX = 0.24, ZS = 0.125, YF = -0.7, YB = 0.7;
  const XW = (x) => (x - 7.75) * SX, ZW = (v) => v * ZS;
  const YK = (k) => YB - (YB - YF) * k / Math.max(1, S.K);   // row 0 (main term) at the back, the newest row in front
  function fitPoints(M) {
    if (S.scene === 'spiral') {
      const R = M.fitR, zt = HZ * Math.log(Math.max(2, M.top)) + 0.05, out = [];
      for (let j = 0; j < 12; j++) { const a = TAU * j / 12; out.push([R * Math.cos(a), R * Math.sin(a), 0], [R * Math.cos(a), R * Math.sin(a), zt]); }
      return out;
    }
    const out = [];
    for (const x of [XW(1.2), XW(14.3)]) for (const y of [YF - 0.8, YB + 0.12]) for (const z of [0, ZW(13.6)]) out.push([x, y, z]);
    return out;
  }
  /** Fit the world box into the HUD-free rect for the current camera. */
  function fitTo(area, W, H, pts) {
    const cy = Math.cos(sc.cam.yaw), sy = Math.sin(sc.cam.yaw), cp = Math.cos(sc.cam.pitch), sp = Math.sin(sc.cam.pitch);
    const Rv = [cy, -sy, 0], Uv = [sy * sp, cy * sp, cp];
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const p of pts) {
      const px = p[0] * Rv[0] + p[1] * Rv[1] + p[2] * Rv[2], py = -(p[0] * Uv[0] + p[1] * Uv[1] + p[2] * Uv[2]);
      x0 = Math.min(x0, px); x1 = Math.max(x1, px); y0 = Math.min(y0, py); y1 = Math.max(y1, py);
    }
    const pad = TRV.thumbMode ? 4 : 14, zoom = sc.cam.zoom || 1;
    const unit = Math.max(20, Math.min((area.w - 2 * pad) / Math.max(0.2, x1 - x0), (area.h - 2 * pad) / Math.max(0.2, y1 - y0)));
    options.radius = unit / (Math.max(1, Math.min(W, H)) * zoom);
    options.cx = (area.x + area.w / 2 - unit * (x0 + x1) / 2) / Math.max(1, W);
    options.cy = (area.y + area.h / 2 - unit * (y0 + y1) / 2) / Math.max(1, H);
  }

  const range = (a, b, n) => Array.from({ length: n + 1 }, (_, j) => a + (b - a) * j / n);
  const tube = (key, pts, color, width, extra = {}) => { if (pts.length > 1) sc.tube(key, pts, Object.assign({ color, width, glow: 0.3, pick: false, occlude: false }, extra)); };
  /** Split a floor polyline where it leaves the disc of radius R, as separate runs. */
  function runsInside(pts, R) {
    const runs = []; let cur = [];
    for (const p of pts) { if (p && Math.hypot(p[0], p[1]) <= R && isFinite(p[0])) cur.push(p); else { if (cur.length > 1) runs.push(cur); cur = []; } }
    if (cur.length > 1) runs.push(cur);
    return runs;
  }

  let FRAME = null, FIT = null, TAGS = [], CURVES = [];
  const at = (p, html, cls, pri, dir, r = 10) => { if (!TRV.thumbMode) TAGS.push({ p, html, cls, pri, dir, r }); };   // r: the gap to the anchor
  /** Screen boxes that cover the strokes of the polylines in CURVES, so that no label is set on a stroke: each projected
      segment is cut into pieces of at most 4 px, and consecutive pieces are boxed together until a box spans 6 px. */
  function curveBoxes() {
    const out = [];
    for (const pts of CURVES) {
      const q = [sc.p(pts[0])];
      for (let i = 1; i < pts.length; i++) {
        const a = q[q.length - 1], b = sc.p(pts[i]), n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 4));
        for (let j = 1; j <= n; j++) q.push([a[0] + (b[0] - a[0]) * j / n, a[1] + (b[1] - a[1]) * j / n]);
      }
      let x0 = q[0][0], x1 = x0, y0 = q[0][1], y1 = y0;
      for (let i = 1; i < q.length; i++) {
        const [x, y] = q[i];
        x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
        if (x1 - x0 >= 6 || y1 - y0 >= 6 || i === q.length - 1) { out.push({ x: x0 - 1.5, y: y0 - 1.5, w: x1 - x0 + 3, h: y1 - y0 + 3 }); x0 = x1 = x; y0 = y1 = y; }
      }
    }
    return out;
  }

  function drawSpiral(M) {
    const C = M.C, R = M.fitR, top = C.top, zt = HZ * Math.log(Math.max(2, top));
    // the floor: the complex plane, a disc with a polar grid, shaded by the modulus |w|
    sc.surface('floor', (u, v) => [u * Math.cos(v), u * Math.sin(v), 0], { u: [0, R + 0.08], v: [0, TAU], nu: 14, nv: 48, value: (u) => u, range: [0, R + 0.08],
      colors: [P.lineHot, P.panelEdge], grid: { every: [2, 6], color: P.ink, alpha: 0.14 }, pick: false });
    sc.line([[-R, 0, 0.004], [R, 0, 0.004]], { color: P.ink, width: 1, alpha: 0.45 });
    sc.line([[0, -R, 0.004], [0, R, 0.004]], { color: P.ink, width: 1, alpha: 0.45 });
    at([R, 0, 0], 'Re', 'raw c-ik', 2, [1, 0]);
    at([0, R, 0], 'Im', 'raw c-ik', 2, [0, -1]);
    // O, its column and the action scale
    sc.circle([0, 0, 0.006], [0, 0, 1], 0.07, { color: P.ink, width: 1.8, fade: false });
    tube('Ocol', [[0, 0, 0], [0, 0, zt + 0.12]], P.ink, 1.1, { glow: 0, alpha: 0.38 });
    at([0, 0, 0], 'O', 'raw c-ik backed', 9, [-1, 0.6]);
    at([0, 0, zt + 0.12], 'ln n', 'raw c-ik', 3, [0, -1]);
    // the two shells around O
    for (const h of M.halos) {
      tube(`haloC${h.p}`, range(0, TAU, 72).map((a) => [h.fwd * Math.cos(a), h.fwd * Math.sin(a), 0.01]), P.cyan, h.p === 2 ? 2.8 : 2, { glow: 0.35 });
      if (M.dualShown) tube(`haloM${h.p}`, range(0, TAU, 72).map((a) => [h.dual * Math.cos(a), h.dual * Math.sin(a), 0.024]), P.magenta, h.p === 2 ? 1.9 : 1.4, { glow: 0.35 });
    }
    const h2 = M.halos[0], aC = -1.75, aD = 2.5;
    at([h2.fwd * Math.cos(aC), h2.fwd * Math.sin(aC), 0], '2<sup>−σ</sup>', 'raw c-cy backed', 7, null);
    if (M.dualShown) at([h2.dual * Math.cos(aD), h2.dual * Math.sin(aD), 0], '2<sup>−(1−σ)</sup>', 'raw c-mg backed', 7, null);
    // the trace ζ(σ + iu), 0 ≤ u ≤ t
    const tr = trace(S.sigma), jt = Math.min(NU_TRACE, Math.floor(S.t / DU + 1e-9)), tp = [];
    for (let j = 0; j <= jt; j++) tp.push([tr.re[j], tr.im[j], 0.008]);
    if (M.zeta) tp.push([M.zeta[0], M.zeta[1], 0.008]);
    for (const run of runsInside(tp, R + 0.05)) sc.line(run, { color: P.ink, width: 1.2, alpha: 0.5 });
    // the path chain
    const pts = [[0, 0, 0]];
    for (let n = 1; n <= top; n++) { const v = vtx(C, n); pts.push([v[0], v[1], HZ * HEIGHT[n]]); }
    tube('chain', pts, P.violet, 3.2, { glow: 0.28 });
    for (let n = 2; n <= Math.min(top, 32); n++) if (isPrimePower(n) && HALO_P.includes(SPF[n]) || (n <= 13 && isPrimePower(n))) sc.ring(pts[n], { normal: [0, 0, 1], color: P.violet, r: 4.2, key: `pp${n}` });
    if (top >= 1) at(pts[top], 'Σ n<sup>−s</sup>', 'raw c-vi backed', 8, [1, -1]);
    // σ > 1: the Euler partial products Π_{p≤q}(1 − p^{−s})^{−1}, one rung per prime q at the height ln q
    if (S.sigma > 1) {
      const ep = [[1, 0, 0]];
      for (const e of C.eulerSteps) ep.push([e.P[0], e.P[1], HZ * HEIGHT[e.p]]);
      sc.line(ep, { color: P.violet, width: 1.3, alpha: 0.75 });
      for (const e of C.eulerSteps.slice(0, 6)) sc.bead([e.P[0], e.P[1], HZ * HEIGHT[e.p]], { key: `ep${e.p}`, color: P.violet, r: 3.2, glow: 0.3 });
      at(ep[ep.length - 1], 'Π (1 − p<sup>−s</sup>)<sup>−1</sup>', 'raw c-vi backed', 7, [-1, -1]);
    }
    if (S.sigma > 1) for (const p of HALO_P) if (p <= top) at(pts[p], String(p), 'raw c-vi', 4, [0.6, -1]);
    // ζ(s): the landing bead, its axis, and the remainder ζ(s) − S_N at the top
    if (M.zeta && M.abs <= R + 0.05) {
      const zf = [M.zeta[0], M.zeta[1], 0], ztop = [M.zeta[0], M.zeta[1], HZ * HEIGHT[Math.max(1, top)] || 0];
      tube('axis', [zf, [zf[0], zf[1], zt + 0.12]], P.amber, 2, { glow: 0.45 });
      sc.bead(zf, { key: 'zeta', color: P.amber, r: 6 });
      if (top === C.N && top >= 2) sc.line([pts[top], ztop], { color: P.ink, width: 1.5, dash: [6, 4], alpha: 0.85 });
      at(zf, 'ζ(s)', 'raw c-am backed', 10, [1, 0.8]);
    }
    // the Möbius chain Σ μ(n) n^{−s}: rungs with μ(n) = 0 climb without moving
    if (S.mobius) {
      const mp = [[0, 0, 0]];
      for (let n = 1; n <= C.mtop; n++) { const v = mvtx(C, n); mp.push([v[0], v[1], HZ * HEIGHT[n]]); }
      tube('mob', mp, P.magenta, 2.3, { glow: 0.3 });
      if (C.mtop >= 4) at(mp[4], 'μ(4) = 0', 'raw c-mg backed', 6, [-1, -0.4]);
      if (C.mtop >= 1) at(mp[C.mtop], 'Σ μ(n)n<sup>−s</sup>', 'raw c-mg backed', 7, [-1, -1]);
      if (S.sigma > 1 && M.inv && cabs(M.inv) <= R + 0.05) {
        const mf = [M.inv[0], M.inv[1], 0];
        tube('mobAxis', [mf, [mf[0], mf[1], zt + 0.12]], P.magenta, 1.4, { glow: 0.3, alpha: 0.8 });
        sc.bead(mf, { key: 'inv', color: P.magenta, r: 5 });
        at(mf, '1/ζ(s)', 'raw c-mg backed', 8, [1, 0.6]);
      }
    }
  }

  const Y_EXACT = YF - 0.06, Y_MARK = YF - 0.17, Y_HANDLE = YF - 0.28, Y_RES = YF - 0.55, Y_FRONT = YF - 0.8, Y_BACK = YB + 0.12;
  function drawStair(M) {
    const k = M.k, xa = XW(1.2), xb = XW(14.3);
    sc.surface('floorS', (u, v) => [xa + u * (xb - xa), Y_FRONT + v * (Y_BACK - Y_FRONT), 0], { u: [0, 1], v: [0, 1], nu: 26, nv: 8,
      value: (u, v) => v, range: [0, 1], colors: [P.panelEdge, P.lineHot], grid: { every: [2, 2], color: P.ink, alpha: 0.12 }, pick: false });
    // the back edge: the main term alone
    const mainPts = Array.from(XS, (x, i) => [XW(x), YB, ZW(CUM[0][i])]);
    tube('mainCurve', mainPts, P.ink, 1.6, { glow: 0, alpha: 0.75 });
    at(mainPts[Math.round(NX * 0.55)], L('主项 x − ln 2π − …', 'main term x − ln 2π − …'), 'raw c-ik backed', 5, [-0.3, -1]);
    // the sheet: row j carries the first j pairs of zeros; rows come forward as the cut-off t passes each γ
    if (k >= 1) {
      sc.surface('sheet', (u, v) => { const i = Math.round(u), j = Math.round(v); return [XW(XS[i]), YK(j), ZW(CUM[j][i])]; },
        { u: [0, NX - 1], v: [0, k], nu: NX - 1, nv: k, color: P.violet, grid: { every: [20, 5], color: P.ink, alpha: 0.2 }, pick: false });
      const cur = Array.from(XS, (x, i) => [XW(x), YK(k) - 0.004, ZW(CUM[k][i]) + 0.006]);
      tube('current', cur, P.amber, 2.6, { glow: 0.45 });
      at(cur[Math.round(NX * 0.3)], `K(t) = ${k}`, 'raw c-am backed', 8, [-0.4, -1]);
    }
    // the exact staircase ψ(x), just in front of the newest row
    const ex = [];
    let level = 0;
    ex.push([XW(X0), Y_EXACT, 0]);
    for (let n = 2; n <= X_MAX; n++) {
      if (LAMBDA[n] > 0) { ex.push([XW(n), Y_EXACT, ZW(level)]); level += LAMBDA[n]; ex.push([XW(n), Y_EXACT, ZW(level)]); }
    }
    ex.push([XW(X_MAX), Y_EXACT, ZW(level)]);
    tube('exact', ex, P.cyan, 2.2, { glow: 0.4 });
    CURVES.push(ex);
    at(ex[ex.length - 1], 'ψ₀(x)', 'raw c-cy backed', 7, [1, -0.2]);
    // integer marks: prime powers (cyan beads), composites (ink rings), each named on the clear floor behind it (above on
    // the screen): in front, the floor plot comes within a label's height of the row. A narrow stage keeps the composites
    // 6, 10, 12 and the two ends 2 and 13 (the beads in between still mark every n). 2 is named on its left: ψ₀ starts
    // its climb right behind it. A wide stage sets the names closer (6 px), below the low first treads of ψ₀
    const narrow = stageEl.clientWidth < 520, tick = (n) => (n === 2 ? [-1, 0] : [0, -1]), gap = narrow ? 10 : 6;
    for (let n = 2; n <= 13; n++) {
      const p = [XW(n), Y_MARK, 0.01];
      const named = !narrow || n === 2 || n === 13 || n === 6 || n === 10 || n === 12;
      if (isPrimePower(n)) { sc.bead(p, { key: `n${n}`, color: P.cyan, r: 3.6, glow: 0.4 }); if (named) at(p, String(n), 'raw c-cy', 3, tick(n), gap); }
      else { sc.ring(p, { normal: [0, 0, 1], color: P.ink, r: 4.4, key: `n${n}` }); if (n === 6 || n === 10 || n === 12) at(p, String(n), 'raw c-ik', 4, tick(n), gap); }
    }
    // the floor plot in front: the zero-wave residual against the sawtooth ψ₀ − main term
    const sy = 0.085;
    sc.line([[XW(X0), Y_RES, 0.004], [XW(X_MAX), Y_RES, 0.004]], { color: P.ink, width: 1, alpha: 0.5 });
    const saw = Array.from(XS, (x, i) => [XW(x), Y_RES + sy * (psi(x) - CUM[0][i]), 0.006]);
    sc.line(saw, { color: P.cyan, width: 1.3, alpha: 0.85 });
    const resid = Array.from(XS, (x, i) => [XW(x), Y_RES + sy * (CUM[k][i] - CUM[0][i]), 0.008]);
    tube('resid', resid, P.magenta, 2, { glow: 0.35 });
    CURVES.push(saw, resid);   // no label is set on these strokes (curveBoxes)
    // a narrow stage has no room beside the floor for the words (the legend names the magenta curve): the formula alone
    const residual = 'Σ −2Re(x<sup>ρ</sup>/ρ)';
    at([XW(X_MAX), Y_RES, 0], narrow ? residual : L(`零点残差 ${residual}`, `zero residual ${residual}`), 'raw c-mg backed', 6, [1, 0.5]);
    // the reading point x*: an amber guide from the handle to the newest row
    const xr = XW(S.xs), yk = YK(k), zr = ZW(k >= 1 ? M.rec : M.main);
    const guide = [[xr, Y_HANDLE, 0.01], [xr, yk, 0.01], [xr, yk, zr]];
    sc.line(guide, { color: P.amber, width: 1.4, alpha: 0.85 });
    CURVES.push(guide);
    sc.bead([xr, yk, zr], { key: 'xs', color: P.amber, r: 5 });
    at([xr, yk, zr], `x* = ${fix(S.xs, 2)}`, 'raw c-am backed', 9, [-0.6, -1]);
  }

  function drawStage(M) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 12, y: 12, w: W - 24, h: H - 24 } : safeRect(W, H, huds);
    if (!dragging || !FIT) FIT = { area, pts: fitPoints(M) };
    fitTo(FIT.area, W, H, FIT.pts);
    // labels keep the 10 px margin of the safe rect from the stage edge
    OBST = huds.slice(); BOUNDS = { x: 10, y: 10, w: W - 20, h: H - 20 }; LB = []; TAGS = []; CURVES = [];
    sc.begin();
    if (S.scene === 'spiral') drawSpiral(M); else drawStair(M);
    sc.end();
    const hq = !thumb && !TRV.still ? handleAnchor(M) : null;
    if (hq) OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    if (!thumb) OBST.push(...curveBoxes());
    placeHandle(hq);
    if (!thumb) {
      const cen = sc.p(S.scene === 'spiral' ? [0, 0, 0.6] : [0, 0, 0.6]);
      TAGS.forEach((t, k) => {
        const q = sc.p(t.p), dir = t.dir ? [t.dir[0], t.dir[1]] : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1];
        LB.push({ key: `t${k}`, q, html: t.html, cls: t.cls, pri: t.pri, dir, r: t.r });
      });
      placeLabels();
    }
    FRAME = { W, H, area: FIT.area, handle: hq ? { x: hq[0], y: hq[1] } : null, unit: sc.unit, cx: sc.cx, cy: sc.cy };
  }

  /* ---------- the handle: a button on the stage ---------- */
  const handle = $('stageHandle');
  let dragging = null;
  const R_LO = Math.pow(2, -SIG_MAX), R_HI = Math.pow(2, -SIG_MIN);
  const haloPoint = (r) => [r * Math.cos(PHI_H), r * Math.sin(PHI_H), 0];
  const floorX = (x) => [XW(x), YF - 0.28, 0];
  /** The screen point of the handle, or null where it cannot be dragged (its axis seen end-on). */
  function handleAnchor() {
    if (S.scene === 'spiral') {
      const a = sc.p(haloPoint(R_LO)), b = sc.p(haloPoint(R_HI));
      if (Math.hypot(b[0] - a[0], b[1] - a[1]) < 40) return null;
      return sc.p(haloPoint(Math.pow(2, -S.sigma)));
    }
    const a = sc.p(floorX(X_MIN)), b = sc.p(floorX(X_MAX));
    if (Math.hypot(b[0] - a[0], b[1] - a[1]) < 40) return null;
    return sc.p(floorX(S.xs));
  }
  function placeHandle(q) {
    const show = !!q && !TRV.still;
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
    const label = S.scene === 'spiral' ? L('拖动青色 2^(−σ) 环改 σ', 'Drag the cyan 2^(−σ) ring to change σ') : L('拖动读数点 x*', 'Drag the reading point x*');
    if (handle.getAttribute('aria-label') !== label) handle.setAttribute('aria-label', label);
  }
  /** The fraction along the projected segment a → b nearest to the pointer. */
  function along(ev, a, b) {
    const r = stageEl.getBoundingClientRect(), x = ev.clientX - r.left - stageEl.clientLeft, y = ev.clientY - r.top - stageEl.clientTop;
    const dx = b[0] - a[0], dy = b[1] - a[1], d2 = dx * dx + dy * dy;
    return d2 > 1 ? clamp(((x - a[0]) * dx + (y - a[1]) * dy) / d2, 0, 1) : null;
  }
  function dragTo(ev) {
    if (S.scene === 'spiral') {
      const f = along(ev, sc.p(haloPoint(R_LO)), sc.p(haloPoint(R_HI)));
      if (f != null) setSigma(Math.round(-Math.log2(R_LO + f * (R_HI - R_LO)) * 100) / 100);
    } else {
      const f = along(ev, sc.p(floorX(X_MIN)), sc.p(floorX(X_MAX)));
      if (f != null) { S.xs = Math.round((X_MIN + f * (X_MAX - X_MIN)) * 100) / 100; paint(); }
    }
  }
  const endDrag = (ev) => {
    if (!dragging || (ev && ev.pointerId != null && ev.pointerId !== dragging.pointer)) return;
    try { if (handle.hasPointerCapture(dragging.pointer)) handle.releasePointerCapture(dragging.pointer); } catch (e) { /* already released */ }
    dragging = null; handle.classList.remove('dragging'); paint();
  };
  handle.addEventListener('pointerdown', (ev) => {
    if (ev.button > 0 || TRV.still) return;
    ev.preventDefault(); ev.stopPropagation();
    leave();
    dragging = { pointer: ev.pointerId }; handle.classList.add('dragging');
    try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events carry no capture */ }
  });
  handle.addEventListener('pointermove', (ev) => {
    if (!dragging || ev.pointerId !== dragging.pointer) return;
    ev.preventDefault();
    dragTo(ev);
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight') return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    const sgn = ev.key === 'ArrowRight' ? 1 : -1;
    if (S.scene === 'spiral') setSigma(Math.round((S.sigma + 0.01 * sgn) * 100) / 100);
    else { S.xs = clamp(Math.round((S.xs + 0.05 * sgn) * 100) / 100, X_MIN, X_MAX); paint(); }
  });

  /* ---------- HUD, legend, readouts ---------- */
  const cplx = (z, d = 4) => (z ? `${fix(z[0], d)} ${z[1] < 0 ? '−' : '+'} ${fix(Math.abs(z[1]), d)}i` : '∞');
  const sci = (v) => (v === 0 ? '0' : !isFinite(v) ? '—' : Math.abs(v) >= 1e-3 ? fix(v, 4) : v.toExponential(1).replace(/-/g, '−'));
  function legendItems() {
    if (S.scene === 'staircase') return [['vi', L('前 k 个零点的部分和曲面', 'sheet of the first k zeros')], ['am', L('当前 K(t) 剖面与 x*', 'current K(t) row and x*')], ['cy', L('精确 ψ₀(x)', 'exact ψ₀(x)')], ['mg', L('零点驻波残差', 'zero-wave residual')]];
    const out = [['vi', L('路径链 Σ n<sup>−s</sup>', 'path chain Σ n<sup>−s</sup>')], ['am', L('ζ(s) 与它的轴', 'ζ(s) and its axis')], ['cy', L('正向壳 p<sup>−σ</sup>', 'forward shell p<sup>−σ</sup>')]];
    if (S.sigma < 1) out.push(['mg', L('对偶壳 p<sup>−(1−σ)</sup>', 'dual shell p<sup>−(1−σ)</sup>')]);
    if (S.mobius) out.push(['mg', L('莫比乌斯链 Σ μ(n)n<sup>−s</sup>', 'Möbius chain Σ μ(n)n<sup>−s</sup>')]);
    return out;
  }
  function hudText(M) {
    let big, sub;
    if (S.scene === 'spiral') {
      big = L('路径螺旋', 'Path spiral') + ` · |ζ(s)| = ${M.zeta ? fix(M.abs, 4) : '∞'}`;
      const h = M.halos[0];
      sub = `s = ${fix(S.sigma, 2)} + ${fix(S.t, 4)}i · N = ${M.C.top < M.C.N ? `${M.C.top}/${M.C.N}` : M.C.N} · 2<sup>−σ</sup> = ${fix(h.fwd, 4)}` + (M.dualShown ? ` ${Math.abs(h.fwd - h.dual) < 5e-5 ? '=' : '≠'} 2<sup>−(1−σ)</sup> = ${fix(h.dual, 4)}` : '');
    } else {
      big = L('素数阶梯', 'Prime staircase') + ` · K(t) = ${M.k}`;
      sub = `x* = ${fix(S.xs, 2)} · ψ₀ = ${fix(M.exact, 4)} · ${L('重建', 'rebuilt')} ${fix(M.rec, 4)} · t = ${fix(S.t, 2)}`;
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('legend').innerHTML = legendItems().map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  const rows = (pairs) => { for (const [id, zh, en] of pairs) { $(`${id}zh`).innerHTML = zh; $(`${id}en`).innerHTML = en; } };
  function drawText(M) {
    const I = instances(M);
    if (S.scene === 'spiral') {
      $('roKeyZh').innerHTML = '|ζ(s)|，延拓值'; $('roKeyEn').innerHTML = '|ζ(s)|, the continued value';
      $('roKey').textContent = M.zeta ? fix(M.abs, 4) : '∞';
      $('roKeySub').innerHTML = ` · ζ = ${cplx(M.zeta)}`;
      rows([['roA', '壳半径 2<sup>−σ</sup> · 2<sup>−(1−σ)</sup>', 'Shell radii 2<sup>−σ</sup> · 2<sup>−(1−σ)</sup>'],
        ['roB', 'ξ/|G| 的虚部（线上为 0）· 反射误差', 'Im ξ/|G| (0 on the line) · reflection error'],
        ['roC', '交错部分和（4000 项）→ (1 − 2<sup>1−s</sup>)ζ', 'Alternating partial sum (4000 terms) → (1 − 2<sup>1−s</sup>)ζ'],
        ['roD', '路径链：链顶余项 ζ − S<sub>N</sub> 与欧拉–麦克劳林估计', 'Chain: remainder ζ − S<sub>N</sub> at the top and its Euler–Maclaurin estimate'],
        ['roE', S.sigma > 1 ? '欧拉乘积 p ≤ N 与部分和 n ≤ N 到 ζ 的距离' : '离线四次式 F 与它的四个零点', S.sigma > 1 ? 'Distance to ζ: Euler product p ≤ N, partial sum n ≤ N' : 'The off-line quartic F and its four zeros']]);
      const h = M.halos[0];
      $('roA').innerHTML = M.dualShown ? `${fix(h.fwd, 4)} · ${fix(h.dual, 4)} · ${L('差', 'gap')} ${fix(Math.abs(h.fwd - h.dual), 4)}` : `${fix(h.fwd, 4)} · ${L('σ ≥ 1：对偶侧 1 − s 不在 Re &gt; 0', 'σ ≥ 1: the dual side 1 − s is not in Re &gt; 0')}`;
      const nx = I.xi.normalized;
      $('roB').innerHTML = nx ? `Im = ${sci(nx[1])} · Re = ${sci(nx[0])}` + (I.xi.reflection != null ? ` · ${L('反射', 'reflection')} ${sci(I.xi.reflection)}` : '') : '—';
      $('roC').innerHTML = I.eta ? `|A − (1 − 2<sup>1−s</sup>)ζ| = ${sci(I.eta.partialGap)} · ${L('相邻中点', 'midpoint')} ${sci(I.eta.midGap)}` : '—';
      $('roD').innerHTML = M.remainder && M.em ? `${cplx(M.remainder, 3)} · ${L('估计', 'estimate')} ${cplx(M.em, 3)}` : '—';
      if (S.sigma > 1) $('roE').innerHTML = I.euler.applies ? `Π: ${sci(I.euler.productGap)} · Σ: ${sci(I.euler.sumGap)}` : '—';
      else $('roE').innerHTML = I.quartic ? `δ = ${kit.sgn(I.quartic.delta, 2)} · |F(${L('四点', 'roots')})| = ${sci(I.quartic.atRoots)} · F(½ + iγ) = ${fix(I.quartic.onLine[0], 4)} &gt; 0` : L('σ = ½：δ = 0，四次式退化为线上二重根', 'σ = ½: δ = 0, the quartic has double roots on the line');
      const off = Math.abs(S.sigma - 0.5) > 1e-9;
      $('roNote').innerHTML = S.sigma > 1
        ? L('σ &gt; 1：路径链与欧拉乘积都收敛，琥珀珠就是它们的共同极限；页面只在这里对照两边。', 'σ &gt; 1: both the path chain and the Euler product converge, and the amber bead is their common limit; only here does the page compare the two sides.')
        : off ? L('离开临界线，ξ/|G| 带上虚部：零点要两个方程同时成立。这一点不是零点，不等于别处没有离线零点（开放）。', 'Off the line ξ/|G| acquires an imaginary part: a zero needs two equations at once. This point is not a zero, which says nothing about off-line zeros elsewhere (open).')
          : L('在临界线上 ξ/|G| 是实数，零点只是它的变号点；琥珀珠落进 O 时 |ζ| 的四位小数全是 0。', 'On the critical line ξ/|G| is real and a zero is a sign change; when the amber bead sits in O, |ζ| reads 0 to four places.');
    } else {
      $('roKeyZh').innerHTML = `x* = ${fix(S.xs, 2)} 处的 ψ₀ 与重建`; $('roKeyEn').innerHTML = `ψ₀ and its rebuild at x* = ${fix(S.xs, 2)}`;
      $('roKey').textContent = fix(M.rec, 4);
      $('roKeySub').innerHTML = ` · ψ₀ = ${fix(M.exact, 4)} · ${L('差', 'gap')} ${fix(Math.abs(M.rec - M.exact), 4)}`;
      rows([['roA', '用到的零点 K(t) 与主项', 'Zeros used K(t) and the main term'],
        ['roB', '积分显式公式 y = ln x*：零点侧 · 算术侧', 'Integrated explicit formula at y = ln x*: zero side · arithmetic side'],
        ['roC', '积分显式公式的差（截断到 K(t) 对零点）', 'Gap of the integrated formula (truncated to K(t) pairs)'],
        ['roD', '合数 6、10、12 处的升高（精确为 0）', 'Rise at the composites 6, 10, 12 (exactly 0)'],
        ['roE', '素数幂处升高与 ln p 的最大偏差', 'Largest deviation of the rise from ln p at prime powers']]);
      $('roA').innerHTML = `K(t) = ${M.k} / ${S.K} · ${L('主项', 'main')} ${fix(M.main, 4)}`;
      $('roB').innerHTML = `${fix(M.int.lhs, 5)} · ${fix(M.int.rhs, 5)}`;
      $('roC').innerHTML = sci(M.int.gap);
      const comp = M.rises.filter((r) => r.n === 6 || r.n === 10 || r.n === 12);
      $('roD').innerHTML = comp.map((r) => `${r.n}: ${kit.sgn(r.rec, 3)}`).join(' · ');
      const dev = Math.max(...M.rises.filter((r) => r.pp).map((r) => Math.abs(r.rec - r.exact)));
      $('roE').innerHTML = fix(dev, 3);
      $('roNote').innerHTML = L('每加一对零点，曲面就向前多一层驻波；素数幂处的升高趋向 ln p，合数处趋向 0。截断的显式公式是文献结果的数值演示；绿色框只担保积分形式。',
        'Each pair of zeros adds one standing-wave row to the sheet; the rise tends to ln p at prime powers and to 0 at composites. The truncated explicit formula is a numerical illustration of a literature result; the green box vouches only for the integrated form.');
    }
    $('scenePill').innerHTML = `ZETA <strong>${S.scene === 'spiral' ? L('螺旋', 'SPIRAL') : L('阶梯', 'STAIRS')}</strong>`;
    $('keyPill').innerHTML = S.scene === 'spiral' ? `|ζ| <strong>${M.zeta ? fix(M.abs, 4) : '∞'}</strong>` : `K <strong>${M.k}</strong>`;
    $('hint').innerHTML = S.scene === 'spiral' ? L('拖琥珀手柄改 σ · 胶囊停在零点 · 拖空白处转视角', 'drag the amber handle to change σ · the pills stop on zeros · drag empty space to orbit') : L('拖琥珀手柄移动 x* · 时间轴是谱截止 t · 拖空白处转视角', 'drag the amber handle to move x* · the rail is the cut-off t · drag empty space to orbit');
    $('formula').innerHTML = S.scene === 'spiral' ? 'ζ(s) = (1 − 2<sup>1−s</sup>)<sup>−1</sup> lim Σ (−1)<sup>n</sup>(n + 1)<sup>−s</sup>' : 'ψ₀(x) = x − Σ<sub>ρ</sub> x<sup>ρ</sup>/ρ − ln 2π − ½ ln(1 − x<sup>−2</sup>)';
    // the zero pills: amber exactly where t sits on γₖ
    document.querySelectorAll('#zeroPills [data-zero]').forEach((b) => b.setAttribute('aria-pressed', String(Math.abs(S.t - GAMMA[+b.dataset.zero - 1]) < 1e-9)));
  }

  /* ---------- strip plot ---------- */
  /** A curve label clear of its own curve(s): across the whole width the text covers, widened by `margin` pixels on both
      sides (a steep stroke reaches sideways), its glyphs (scripts included) stay `gap` pixels above the stroke of f. Text
      set by kit.plot's g.text, data font. The default gap of 6 leaves at least five whole pixel rows clear, whatever the
      sub-pixel phase of the two edges. Returns the label box in CSS pixels. */
  function curveLabel(g, f, x, str, color, o = {}) {
    const size = o.size || 10.5, align = o.align || 'right', gap = o.gap == null ? 6 : o.gap, half = (o.stroke || 2.2) / 2, ctx = g.ctx;
    ctx.font = `${size}px ${TRV.fonts.data}`;
    const meas = (s) => (s ? ctx.measureText(s) : { actualBoundingBoxAscent: 0, actualBoundingBoxDescent: 0 });
    const script = (re) => (str.match(re) || []).map((s) => s.slice(2, -1)).join('');
    const sub = script(/_\{[^{}]*\}/g), sup = script(/\^\{[^{}]*\}/g), main = meas(str.replace(/[_^]\{[^{}]*\}/g, ''));
    // scripts are set at 0.72 of the size, lowered by 0.32 or raised by 0.36 of it (kit.plot's setRuns)
    const drop = Math.max(0, main.actualBoundingBoxDescent, sub ? 0.32 * size + 0.72 * meas(sub).actualBoundingBoxDescent : 0);
    const rise = Math.max(0, main.actualBoundingBoxAscent, sup ? 0.36 * size + 0.72 * meas(sup).actualBoundingBoxAscent : 0);
    const w = meas(str.replace(/[_^]\{([^{}]*)\}/g, '$1')).width, px = g.X(x), x0 = align === 'right' ? px - w : align === 'center' ? px - w / 2 : px;
    const m = o.margin == null ? 4 : o.margin;
    let top = Infinity;
    for (let i = 0; i <= 40; i++) { const y = g.Y(f(g.invX(x0 - m + (w + 2 * m) * i / 40))); top = Math.min(top, y); }
    const base = top - half - gap - drop;
    g.text(x, g.invY(base), str, color, { align, base: 'alphabetic', size });
    return { text: str, color, x0, x1: x0 + w, top: base - rise, bottom: base + drop, curveTop: top - half };
  }
  /** The top of a y range from lo that leaves px pixels of the inner height ih above the level top (room for a label). */
  const roomAbove = (ih, lo, top, px) => (top * ih - lo * px) / Math.max(ih / 2, ih - px);
  let PLOT = null;
  function drawPlot(M) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    const pad = [40, 12, 10, 22], ih = cv.clientHeight - pad[2] - pad[3], iw = cv.clientWidth - pad[0] - pad[1];
    const labels = [];
    if (S.scene === 'spiral') {
      $('plotTitle').innerHTML = L('|ζ(σ + it)| 沿 t：临界线上它在每个 γₖ 落到 0', '|ζ(σ + it)| along t: on the critical line it drops to 0 at every γₖ');
      const tr = trace(S.sigma), ref = Math.abs(S.sigma - 0.5) > 1e-9 ? trace(0.5) : null, CAP = 3.3;
      const at2 = (T, u) => { const j = clamp(u / DU, 0, NU_TRACE), j0 = Math.floor(j), j1 = Math.min(NU_TRACE, j0 + 1), a = T.ab[j0], b = T.ab[j1]; return Math.min(CAP, a + (b - a) * (j - j0)); };
      const env = (u) => Math.max(at2(tr, u), ref ? at2(ref, u) : 0);
      const pxT = iw / T_SPIRAL;
      // the label widths in t units decide which part of the curves sits under them
      const ctx = cv.getContext('2d'); ctx.font = `10.5px ${TRV.fonts.data}`;
      const wA = ctx.measureText('|ζ(σ + it)|').width / pxT, wB = ctx.measureText('σ = ½').width / pxT;
      let under = 0;
      const mT = 4 / pxT;
      for (let u = 0.6 - mT; u <= 0.6 + wA + mT; u += 0.02) under = Math.max(under, env(u));
      if (ref) for (let u = 35.6 - wB - mT; u <= 35.6 + mT; u += 0.02) under = Math.max(under, env(u));
      const yTop = Math.max(CAP, roomAbove(ih, 0, under, 22));
      const g = kit.plot(cv, { x: [0, T_SPIRAL], y: [0, yTop], pad });
      g.axes({ xTicks: [0, 6, 12, 18, 24, 30, 36], yTicks: [0, 1, 2, 3], xLabel: 't' });
      for (let k = 0; k < 5; k++) g.line([[GAMMA[k], 0], [GAMMA[k], 0.22 * CAP / 3.3]], P.dim, { width: 1.2, alpha: 0.8 });   // short ticks: the zero ordinates
      const pts = (T) => { const out = []; for (let j = 0; j <= NU_TRACE; j++) out.push(isFinite(T.ab[j]) ? [j * DU, Math.min(CAP, T.ab[j])] : null); return out; };
      if (ref) g.line(pts(ref), P.dim, { width: 1.4, dash: [5, 4] });
      g.line(pts(tr), P.violet, { width: 2.2 });
      g.vline(S.t, P.amber, { alpha: 0.85 }); if (M.zeta) g.dot(S.t, Math.min(CAP, M.abs), P.amber, 3.8);
      labels.push(curveLabel(g, env, 0.6, '|ζ(σ + it)|', P.violet, { align: 'left' }));
      if (ref) labels.push(curveLabel(g, env, 35.6, 'σ = ½', P.dim, { align: 'right', stroke: 1.4 }));
      $('plotMeta').innerHTML = `σ = ${fix(S.sigma, 2)} · t = ${fix(S.t, 4)} · |ζ| = ${M.zeta ? fix(M.abs, 4) : '∞'}` + (ref ? ` · ${L('虚线 σ = ½', 'dashed σ = ½')}` : '');
      PLOT = { kind: 'zeta', yTop, labels, curves: { violet: (u) => at2(tr, u), dim: ref ? (u) => at2(ref, u) : null } };
    } else {
      $('plotTitle').innerHTML = L('每个整数 n 处的升高：精确为 Λ(n)，合数处为 0', 'The rise at each integer n: exactly Λ(n), and 0 at composites');
      const R = M.rises, labB = L('升高 ψ_{0,K}', 'rise ψ_{0,K}');
      const bar = (x) => { let v = 0; for (const r of R) if (Math.abs(x - r.n) <= 0.32) v = Math.max(v, r.exact, r.rec); return v; };
      const ctx = cv.getContext('2d'); ctx.font = `10.5px ${TRV.fonts.data}`;
      const pxN = iw / 12.4, wA = ctx.measureText('Λ(n)').width / pxN, wB = ctx.measureText(labB.replace(/[_^]\{([^{}]*)\}/g, '$1')).width / pxN;
      let under = 0; for (let x = 1.45 - 4 / pxN; x <= 1.45 + wA + 14 / pxN + wB; x += 0.02) under = Math.max(under, bar(x));
      const yMax = Math.max(3.2, Math.max(...R.map((r) => Math.max(r.exact, r.rec))) + 0.3, roomAbove(ih, -0.6, under, 27));
      const g = kit.plot(cv, { x: [1.3, 13.7], y: [-0.6, yMax], pad });
      g.axes({ xTicks: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], yTicks: [0, 1, 2, 3], xLabel: 'n' });
      g.hline(0, P.ink, { alpha: 0.4 });
      for (const r of R) {
        if (r.exact > 0) g.rect(r.n - 0.3, 0, r.n + 0.3, r.exact, P.cyan, { alpha: 0.32, stroke: P.cyan, strokeAlpha: 0.9 });
        else g.dot(r.n, 0, P.ink, 4, { ring: true, width: 1.4 });
        g.line([[r.n, 0], [r.n, r.rec]], P.violet, { width: 1.4, alpha: 0.7 });
        g.dot(r.n, r.rec, P.violet, 3.6);
      }
      g.vline(S.xs, P.amber, { alpha: 0.85 });
      labels.push(curveLabel(g, bar, 1.45, 'Λ(n)', P.cyan, { align: 'left', stroke: 7.4 }));   // half a dot (r 3.6) above the envelope
      const lb = labels[0];
      labels.push(curveLabel(g, bar, g.invX(lb.x1 + 10), labB, P.violet, { align: 'left', stroke: 7.4 }));
      $('plotMeta').innerHTML = `K(t) = ${M.k} · ${L('青色 Λ(n) · 紫点 = 重建的升高', 'cyan Λ(n) · violet dots = rebuilt rise')}`;
      PLOT = { kind: 'rises', yMax, labels };
    }
  }

  const paint = kit.painter(() => {
    const M = model();
    hudText(M); TRV.hudFit();
    drawStage(M); drawText(M); drawPlot(M);
  }, [stageEl, $('plot')]);

  /* ---------- the rail: the imaginary part t ---------- */
  // every card opens paused on its own frame; ▶ plays from there, and from t = 0 again when t already sits at the end
  // of the rail (kit.clock's play), so the staircase card, parked at t = 145, replays its whole sweep of the cut-off
  let transition = null, booting = true;
  function cancelTransition() { if (transition) transition.cancel(); transition = null; }
  /** ▶ during a card's or a pill's tween: the clock takes t over at once, the card's other settings land. */
  function yieldToClock() { const tr = transition; if (!tr) return; transition = null; tr.cancel(); if (tr.land) tr.land(); }
  const playBtn = $('playBtn');
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: T_SPIRAL, t: GAMMA[0], rate: RATE_SPIRAL, step: 0.5, loop: true,
    format: (t, max) => `t ${fix(t, 4)} <small>/ ${max}</small>`,
    onChange: (t, C) => {
      if (C.playing) yieldToClock();
      S.t = t; playBtn.textContent = C.playing ? '❚❚' : '▷'; playBtn.setAttribute('aria-pressed', String(C.playing)); paint();
    }
  });
  playBtn.addEventListener('click', () => clock.toggle());
  $('rewindBtn').addEventListener('click', () => { cancelTransition(); clock.pause(); clock.set(0); });
  $('rew').addEventListener('click', () => { cancelTransition(); clock.pause(); clock.set(0); });

  /* ---------- controls ---------- */
  function leave() { cancelTransition(); cards.mark(null); clock.pause(); }
  const fSigma = kit.field($('sigma'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.sigma = clamp(v, SIG_MIN, SIG_MAX); paint(); } });
  const fPaths = kit.field($('paths'), { fmt: (v) => String(Math.round(v)), onInput: (v) => { leave(); S.N = clamp(Math.round(v), N_MIN, N_MAX); paint(); } });
  const fZeros = kit.field($('zeros'), { fmt: (v) => String(Math.round(v)), onInput: (v) => { leave(); S.K = clamp(Math.round(v), K_MIN, K_MAX); paint(); } });
  function setSigma(v) { S.sigma = clamp(v, SIG_MIN, SIG_MAX); fSigma.set(S.sigma); paint(); }
  const mobBtn = $('mobiusToggle');
  function setMobius(on) { S.mobius = !!on; mobBtn.setAttribute('aria-pressed', String(S.mobius)); }
  mobBtn.addEventListener('click', () => { leave(); setMobius(!S.mobius); paint(); });
  function setScene(scene, keepT) {
    S.scene = scene === 'staircase' ? 'staircase' : 'spiral';
    sceneChips.set(S.scene, true);
    clock.rate = S.scene === 'spiral' ? RATE_SPIRAL : RATE_STAIR;
    clock.setMax(S.scene === 'spiral' ? T_SPIRAL : T_STAIR, true);
    if (!keepT) clock.set(Math.min(S.t, clock.max), true);
    S.t = clock.t;
  }
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); setVantage(S.vantage, 0); paint(); });
  /** Move t to v: a short tween (the spiral twists into place), or at once when booting or still. */
  function moveT(v, ms = 650) {
    cancelTransition();
    const from = S.t, to = clamp(v, 0, clock.max);
    if (booting || TRV.still || Math.abs(to - from) < 1e-12) { clock.set(to); return; }
    const token = {}; transition = token;
    token.cancel = () => { if (token.run) token.run.cancel(); };
    token.run = kit.tween(ms, (e) => clock.set(from + (to - from) * e), () => { if (transition === token) transition = null; clock.set(to); });
  }
  $('zeroPills').addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-zero]'); if (!b) return;
    leave();
    moveT(GAMMA[+b.dataset.zero - 1]);
    if (ev.detail > 0) { stageEl.setAttribute('tabindex', '-1'); stageEl.focus({ preventScroll: true }); }
  });
  function setVantage(v, ms) {
    S.vantage = VIEWS.spiral[v] ? v : 'oblique';
    vantageChips.set(S.vantage, true);
    sc.view(VIEWS[S.scene][S.vantage], ms);
    paint();
  }
  const vantageChips = kit.chips($('vantageChips'), 'vantage', (v) => setVantage(v, 600));
  kit.keys({ v: () => setVantage(VANTAGES[(VANTAGES.indexOf(S.vantage) + 1) % 3], 600) });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'euler-dirichlet-phasor-spiral': { scene: 'spiral', sigma: 1.5, t: GAMMA[0], N: 160, K: 50, mobius: true, xs: 10, vantage: 'oblique', still: GAMMA[0] },
    'critical-zero-cancellation': { scene: 'spiral', sigma: 0.5, t: GAMMA[0], N: 160, K: 50, mobius: false, xs: 10, vantage: 'oblique', still: GAMMA[0] },
    'off-line-shell-imbalance': { scene: 'spiral', sigma: 0.62, t: GAMMA[0], N: 160, K: 50, mobius: false, xs: 10, vantage: 'oblique', still: GAMMA[0] },
    // parked at the end of the rail, t = 145 > γ₅₀: all fifty rows of the sheet; ▶ replays the sweep from t = 0
    'weil-explicit-prime-staircase': { scene: 'staircase', sigma: 0.5, t: T_STAIR, N: 160, K: 50, mobius: false, xs: 10, vantage: 'oblique', still: 'end' }
  };
  const NOTES = {
    'euler-dirichlet-phasor-spiral': ['σ = 1.50、t = γ₁：每个整数 n 是一支长 n<sup>−σ</sup> 的紫色箭头，竖直高度是作用量 ln n，素数幂 pᵐ 的台阶落在 m ln p，不同素数的台阶永不同高。紫色链收拢到琥珀珠 ζ(s) = 0.5421 + 0.0499i，p ≤ 160 的欧拉乘积指向同一点；品红链 Σ μ(n)n<sup>−s</sup> 在 4、8、9、12 … 处只升不走（μ = 0），收拢到 1/ζ(s) = 1.8291 − 0.1683i。',
      'σ = 1.50, t = γ₁: each integer n is a violet arrow of length n<sup>−σ</sup>, lifted to its action ln n; the rungs of a prime power pᵐ sit at m ln p and never share a height with another prime. The violet chain closes on the amber bead ζ(s) = 0.5421 + 0.0499i, where the Euler product over p ≤ 160 points too; the magenta chain Σ μ(n)n<sup>−s</sup> climbs without moving at 4, 8, 9, 12 … (μ = 0) and closes on 1/ζ(s) = 1.8291 − 0.1683i.'],
    'critical-zero-cancellation': ['σ = 0.50、t = γ₁ = 14.1347：紫色链越往上越张开，它绕的竖轴就是琥珀色的 ζ(s)；链顶的墨色虚线（余项）把它收回这根轴，琥珀珠落进原点 O，|ζ| = 0.0000。地上青色的正向壳 p<sup>−σ</sup> 与品红的对偶壳 p<sup>−(1−σ)</sup> 两两重合于 p<sup>−1/2</sup>。点五颗胶囊，每个 γₖ 上都一样。',
      'σ = 0.50, t = γ₁ = 14.1347: the violet chain opens up as it climbs, round the amber axis ζ(s); the dashed ink remainder at the top brings it back to that axis, and the amber bead sits in the origin O, |ζ| = 0.0000. On the floor the cyan forward shells p<sup>−σ</sup> and the magenta dual shells p<sup>−(1−σ)</sup> coincide in pairs at p<sup>−1/2</sup>. Try the five pills: every γₖ does the same.'],
    'off-line-shell-imbalance': ['σ = 0.62、t = γ₁：青色壳缩到 2<sup>−0.62</sup> = 0.6507，品红壳胀到 2<sup>−0.38</sup> = 0.7684，两环分开；链收窄，琥珀珠离开 O，|ζ(0.62 + iγ₁)| = 0.0907。这一点不是零点；离线零点是否存在，正是开放的黎曼猜想。',
      'σ = 0.62, t = γ₁: the cyan shell shrinks to 2<sup>−0.62</sup> = 0.6507 and the magenta one grows to 2<sup>−0.38</sup> = 0.7684, so the rings split; the chain narrows and the amber bead leaves O, |ζ(0.62 + iγ₁)| = 0.0907. This point is not a zero; whether off-line zeros exist at all is the open Riemann Hypothesis.'],
    'weil-explicit-prime-staircase': ['谱截止 t = 145 已越过前 50 个零点：最后面一行只有主项，每过一个 γₖ，紫色曲面向前多叠一层驻波 −2Re(x<sup>ρ</sup>/ρ)；按播放从 t = 0 重看这一扫。琥珀色的最新一行紧贴青色的精确阶梯 ψ₀(x)：在 2、3、4、5、7、8、9、11、13 处陡升，在 6、10、12 处几乎平坦；前方地上品红的零点残差逼近青色锯齿。',
      'The cut-off t = 145 has passed the first 50 zeros: the back row is the main term alone, and at each γₖ the violet sheet gains one more standing-wave row −2Re(x<sup>ρ</sup>/ρ) towards the front; press play to replay the sweep from t = 0. The newest, amber row hugs the exact cyan staircase ψ₀(x): it rises steeply at 2, 3, 4, 5, 7, 8, 9, 11, 13 and stays nearly flat at 6, 10, 12; on the floor in front the magenta zero residual approaches the cyan sawtooth.']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'euler-dirichlet-phasor-spiral': ['σ = 1.5：紫色路径链与欧拉乘积同落在琥珀珠 ζ(s)，品红莫比乌斯链落在 1/ζ(s)。', 'σ = 1.5: the violet path chain and the Euler product land on the amber bead ζ(s); the magenta Möbius chain lands on 1/ζ(s).'],
    'critical-zero-cancellation': ['σ = 0.50、t = γ₁：螺旋绕着穿过 O 的轴张开，琥珀珠落进 O，|ζ| = 0.0000。', 'σ = 0.50, t = γ₁: the spiral opens round the axis through O; the amber bead sits in O, |ζ| = 0.0000.'],
    'off-line-shell-imbalance': ['σ = 0.62：青色与品红双壳分开，琥珀珠离开 O，|ζ| = 0.0907。', 'σ = 0.62: the cyan and magenta shells split and the amber bead misses O, |ζ| = 0.0907.'],
    'weil-explicit-prime-staircase': ['50 个零点叠加：素数幂处陡升，6、10、12 处几乎平坦。', 'Fifty zeros superposed: steep rises at prime powers, nearly flat at 6, 10 and 12.']
  };
  function syncFields() { fSigma.set(S.sigma); fPaths.set(S.N); fZeros.set(S.K); }
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause(); cancelTransition();
    const sceneChanged = S.scene !== p.scene;
    setScene(p.scene, true);
    S.N = p.N; S.K = p.K; S.xs = p.xs; setMobius(p.mobius);
    S.vantage = p.vantage; vantageChips.set(S.vantage, true); sc.view(VIEWS[S.scene][S.vantage], booting || TRV.still || sceneChanged ? 0 : 600);
    const from = { sigma: S.sigma, t: S.t };
    const tTo = p.still === 'end' ? clock.max : p.t;   // every card is static: its still is its own t
    if (booting || TRV.still || sceneChanged) {
      S.sigma = p.sigma; syncFields(); clock.set(tTo);
    } else {
      const token = {}; transition = token;
      token.cancel = () => { if (token.run) token.run.cancel(); };
      token.land = () => { S.sigma = p.sigma; syncFields(); };
      token.run = kit.tween(650, (e) => { S.sigma = from.sigma + (p.sigma - from.sigma) * e; fSigma.set(S.sigma); clock.set(from.t + (tTo - from.t) * e); },
        () => { if (transition === token) transition = null; S.sigma = p.sigma; syncFields(); clock.set(tTo); });
    }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拉 σ、N、K，点零点胶囊，换场景或视角，拖琥珀手柄，打开莫比乌斯对偶。随时可以再选一张卡。', 'Free play: pull σ, N and K, press the zero pills, switch the scene or the vantage, drag the amber handle, turn on the Möbius dual. Pick a card again at any time.']
  });
  // the tour bar's card title carries the id #tourStep
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.ZETA_SPIRAL_DEBUG = Object.freeze({
    get state() {
      const M = model(), I = instances(M);
      const base = { preset: cards.current, t: clock.t, playing: clock.playing, clockMax: clock.max, scene: S.scene, sigma: S.sigma, paths: S.N, zerosK: S.K,
        mobius: S.mobius, xs: S.xs, vantage: S.vantage, gammas: GAMMA.slice(), camera: Object.assign({}, sc.cam), handle: FRAME ? FRAME.handle : null,
        labels: PLACED, stageFrame: FRAME, plot: PLOT ? { kind: PLOT.kind, labels: PLOT.labels } : null, leanInstances: I, borweinN: BN };
      if (S.scene === 'spiral') {
        const C = M.C, verts = [];
        for (let n = 0; n <= C.top; n++) verts.push({ n, S: vtx(C, n), z: n ? HZ * HEIGHT[n] : 0 });
        const mob = []; for (let n = 0; n <= C.mtop; n++) mob.push({ n, M: mvtx(C, n) });
        const tr = trace(S.sigma);
        Object.assign(base, { s: M.s, zeta: M.zeta, absZeta: M.abs, inverse: M.inv, halos: M.halos, dualShown: M.dualShown, top: C.top,
          chain: verts, mobiusChain: mob, mobiusTop: C.mtop, euler: C.euler, partialSum: C.sum, remainder: M.remainder, emEstimate: M.em, heightScale: HZ,
          traceSample: Array.from({ length: 13 }, (_, j) => { const i = j * 50; return { u: i * DU, re: tr.re[i], im: tr.im[i], abs: tr.ab[i] }; }) });
      } else {
        Object.assign(base, { k: M.k, rec: M.rec, exact: M.exact, main: M.main, integrated: M.int, rises: M.rises,
          profile: Array.from({ length: 26 }, (_, j) => { const i = j * 10; return { x: XS[i], v: CUM[M.k][i] }; }) });
      }
      return JSON.parse(JSON.stringify(base));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock). */
    setState(o) {
      leave();
      if (o.scene != null) setScene(o.scene, true);
      if (o.sigma != null) S.sigma = clamp(o.sigma, SIG_MIN, SIG_MAX);
      if (o.paths != null) S.N = clamp(Math.round(o.paths), N_MIN, N_MAX);
      if (o.zerosK != null) S.K = clamp(Math.round(o.zerosK), K_MIN, K_MAX);
      if (o.mobius != null) setMobius(o.mobius);
      if (o.xs != null) S.xs = clamp(o.xs, X_MIN, X_MAX);
      syncFields();
      if (o.vantage != null) setVantage(o.vantage, 0);
      if (o.t != null) clock.set(clamp(o.t, 0, clock.max));
      paint();
    },
    /** ζ(s) as the page computes it (for the probe only). */
    zetaAt(sig, t) { return zetaRaw([sig, t]); },
    /** Viewport coordinates of the handle (for pointer tests), or null when hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates where the handle would sit for σ = v (spiral) or x* = v (staircase). */
    dragTarget(v) {
      const b = stageEl.getBoundingClientRect(), q = S.scene === 'spiral' ? sc.p(haloPoint(Math.pow(2, -v))) : sc.p(floorX(v));
      return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] };
    }
  });
  window.TRV_THUMB = () => { cards.pick('critical-zero-cancellation'); clock.pause(); sc.view([VIEWS.spiral.oblique[0], VIEWS.spiral.oblique[1], 1], 0); paint.now(); };
  cards.pick(cards.initial('critical-zero-cancellation'));
  booting = false;
  paint();
})();
