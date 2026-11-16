/* ARITH//PIVOT · 算术枢轴重整与临界带多级共振隧穿 · Arithmetic pivot renormalization and multi-stage resonant tunneling
   The stage is the critical strip of s = σ + it drawn as a lit terrain block: across σ ∈ [0, 2] (world x = σ − 1), into
   the page t ∈ [0, 36] (world y = 0.045(t − 18)), height z = 0.2·2.2·tanh(ln|f(s)|/2.2), down to a floor z = −0.62.
   The front face of the block is the section t = tCut (t = 0, the real axis, or t = γ₁). Four scenes share it:
     cutoff     f = ζ_M = Σ_{n≤M} n^{−s} (the hard gate n ≤ M; the rail pushes M from 1 to 40). A magnifier at the back
                sits near t* = 155417750480610.1069…: there ζ₁₉ has a zero at σ* = 1.0069878… > 1 (Platt–Trudgian: the
                first M with zeros in Re s > 1). Its 19 vectors n^{−s*}, computed from stored phases t* ln p mod 2π, close
                to 0 on the screen behind it.
     mollifier  f = ζ, front t = 0 with the pole peak; one hop dives (90°) below the peak from σ = 1/2 + 1.6θ to σ = 1/2;
                a wall stands at θ = 4/7. The proportion κ(θ) of the Levinson–Conrey bound is optimized here over cubic P, Q.
     schur      the window {1, 2, 3, 6} = {2^a 3^b}, kernel min(m, n)/max(m, n): interior I = {1, 2} is eliminated onto the
                pivots P = {3, 6} (G̃_PP = G_PP − G_PI G_II⁻¹ G_IP), then 3 onto the apex 6; exact rationals.
     relay      f = ζ, front t = γ₁ with the pit of the first zero on the critical line; four pivot wells relay the head
                to σ = 1/2 + δ, where |w| = |ρ/(1 − ρ)| for ρ = 1/2 + δ + iγ₁ is squared once per layer: |w|^{2^ℓ}.
   Every number is computed here. Read-only probe: window.ARITH_PIVOT_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, LN2 = Math.LN2, LN10 = Math.LN10;
  const SCENES = ['cutoff', 'mollifier', 'schur', 'relay'];
  const REGIME = { cutoff: '1', mollifier: '2', schur: '3', relay: '3' };
  const EULER_GAMMA = 0.5772156649015329;
  const C_NBB = 2 + EULER_GAMMA - Math.log(4 * PI);                 // 2 + γ − ln 4π = 0.0461914…
  const MONT = 4 / PI - 1;                                         // Montgomery's constant 4/π − 1
  const GAMMAS = [14.134725141734694, 21.022039638771555, 25.010857580145689, 30.424876125859513, 32.935061587739189];
  const G1 = GAMMAS[0];
  /* the certified zero of ζ₁₉ (100-digit interval Rouché certificate, §34.29 data): σ*, t* and the phases t* ln p mod 2π */
  const SIG_STAR = 1.0069878448871248, T_STAR_TEXT = '155417750480610.1069058344', ABS_CENTRE_100 = 2.7466363906723524e-86;
  const PHASE = { 2: 1.465729501889243672, 3: 2.149356805609750689, 5: 3.0497022441563913, 7: 3.355825322865542171, 11: 3.787888894395207131,
    13: 3.789380166089625556, 17: 3.803068180656076113, 19: 3.81008141071505576, 23: 4.170915365700577421, 29: 2.166187896859437383,
    31: 3.747615357604602078, 37: 5.935408791921396343 };
  const PRIMES = Object.keys(PHASE).map(Number);
  const M_MAX = 40;
  /** Platt–Trudgian, Theorem 1.1 (literature): ζ_M has no zero in Re s > 1 exactly for M ≤ 18 and M = 20, 21, 28. */
  const zeroFree = (M) => M <= 18 || M === 20 || M === 21 || M === 28;
  const SUP = { '-': '⁻', '−': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  /** A positive number in a short scientific form (1.30×10⁷); plain decimals between 0.01 and 10⁴. */
  function sci(x, d = 2) {
    if (!(x > 0)) return '0';
    let e = Math.floor(Math.log10(x));
    if (e >= -2 && e < 4) return fix(x, Math.max(0, d + 1 - e));
    let m = x / 10 ** e;
    if (Number(m.toFixed(d)) >= 10) { m /= 10; e += 1; }
    return `${m.toFixed(d)}×10${String(e).split('').map((ch) => SUP[ch]).join('')}`;
  }
  /** 10^e for a (possibly huge) exponent e, written from the exponent itself. */
  function sciPow10(e, d = 2) {
    if (e < 4) return sci(10 ** e, d);
    let k = Math.floor(e), m = 10 ** (e - k);
    if (Number(m.toFixed(d)) >= 10) { m /= 10; k += 1; }
    return `${m.toFixed(d)}×10${String(k).split('').map((ch) => SUP[ch]).join('')}`;
  }
  const pct = (x, d = 2) => `${fix(100 * x, d)}%`;

  /* ---------- ζ(s): Borwein's acceleration of the alternating series η(s) = Σ (−1)^{n−1} n^{−s} ---------- */
  const BN = 50, BD = new Float64Array(BN + 1), LOGK = new Float64Array(BN + 1);
  (() => { let term = 1 / BN, sum = term; BD[0] = BN * sum; for (let i = 1; i <= BN; i++) { term *= 4 * (BN + i - 1) * (BN - i + 1) / ((2 * i) * (2 * i - 1)); sum += term; BD[i] = BN * sum; } for (let k = 1; k <= BN; k++) LOGK[k] = Math.log(k); })();
  /** ζ(σ + it) as [re, im]; [Infinity, 0] at the pole s = 1. */
  function zeta(sig, t) {
    if (sig === 1 && t === 0) return [Infinity, 0];
    let er = 0, ei = 0;
    for (let k = 0; k < BN; k++) {
      const l = LOGK[k + 1], r = Math.exp(-sig * l) * (BD[BN] - BD[k]) * (k % 2 ? -1 : 1), a = -t * l;
      er += r * Math.cos(a); ei += r * Math.sin(a);
    }
    er /= BD[BN]; ei /= BD[BN];
    const q = Math.exp((1 - sig) * LN2), dr = 1 - q * Math.cos(t * LN2), di = q * Math.sin(t * LN2), dd = dr * dr + di * di;
    return [(er * dr + ei * di) / dd, (ei * dr - er * di) / dd];
  }
  const lnAbs = (z) => (Number.isFinite(z[0]) ? 0.5 * Math.log(z[0] * z[0] + z[1] * z[1]) : Infinity);

  /* ---------- the terrain grids ---------- */
  const NS = 81, NT = 121, DS = 0.025, DT = 0.3, HCAP = 2.2, ZS = 0.2, BOT = -0.62;
  const SIG = Array.from({ length: NS }, (_, i) => i * DS), TT = Array.from({ length: NT }, (_, j) => j * DT);
  const HUP = 3.2, X = (sig) => sig - 1, Y = (t) => 0.045 * (t - 18), soft = (l) => (l >= 0 ? HUP * Math.tanh(l / HUP) : HCAP * Math.tanh(l / HCAP)), Zof = (l) => ZS * soft(l);
  let zetaGrid = null;
  /** ln|ζ| on the grid (rows t_j, columns σ_i), computed once. */
  function zetaLn() {
    if (zetaGrid) return zetaGrid;
    zetaGrid = new Float64Array(NS * NT);
    for (let j = 0; j < NT; j++) for (let i = 0; i < NS; i++) zetaGrid[j * NS + i] = lnAbs(zeta(SIG[i], TT[j]));
    return zetaGrid;
  }
  const frontCache = new Map();
  /** ln|ζ(σ_i + it)| along one section t (the front face of the relay scene). */
  function zetaRow(t) {
    const key = t.toFixed(12);
    if (!frontCache.has(key)) frontCache.set(key, Float64Array.from(SIG, (s) => lnAbs(zeta(s, t))));
    return frontCache.get(key);
  }
  /* ζ_M by adding one term n^{−s} per grid point at a time; ln|ζ_M| kept for every M reached */
  const cut = { M: 0, re: new Float64Array(NS * NT), im: new Float64Array(NS * NT), ln: new Map() };
  function cutLn(M) {
    if (cut.ln.has(M)) return cut.ln.get(M);
    if (M < cut.M) { cut.M = 0; cut.re.fill(0); cut.im.fill(0); }
    while (cut.M < M) {
      const n = ++cut.M, l = Math.log(n);
      for (let j = 0; j < NT; j++) for (let i = 0; i < NS; i++) {
        const q = j * NS + i, r = Math.exp(-SIG[i] * l), a = -TT[j] * l;
        cut.re[q] += r * Math.cos(a); cut.im[q] += r * Math.sin(a);
      }
      if (!cut.ln.has(n)) { const g = new Float64Array(NS * NT); for (let q = 0; q < g.length; q++) g[q] = 0.5 * Math.log(cut.re[q] * cut.re[q] + cut.im[q] * cut.im[q]); cut.ln.set(n, g); }
    }
    return cut.ln.get(M);
  }
  /** ζ_M(σ + it) directly (for the probe and the readouts). */
  function zetaM(M, sig, t) { let re = 0, im = 0; for (let n = 1; n <= M; n++) { const l = Math.log(n), r = Math.exp(-sig * l); re += r * Math.cos(-t * l); im += r * Math.sin(-t * l); } return [re, im]; }
  /** Extra rows between t = 0 and the first grid row, where the pole is narrow. */
  const FINE_T = [0.03, 0.07, 0.12, 0.19];
  const fineCache = new Map();
  function fineRow(M, t) {
    const key = `${M}|${t}`;
    if (!fineCache.has(key)) fineCache.set(key, M ? Float64Array.from(SIG, (s) => lnAbs(zetaM(M, s, t))) : zetaRow(t));
    return fineCache.get(key);
  }

  /* ---------- the magnifier near s* = σ* + it*: phases φ_n = t* ln n mod 2π from the stored prime phases ---------- */
  const PHI = new Float64Array(M_MAX + 1), LOGN = new Float64Array(M_MAX + 1);
  for (let n = 1; n <= M_MAX; n++) {
    let m = n, a = 0;
    for (const p of PRIMES) while (m % p === 0) { a += PHASE[p]; m /= p; }
    if (m !== 1) throw new Error(`no stored phase for ${m}`);
    PHI[n] = a % (2 * PI); LOGN[n] = Math.log(n);
  }
  /** ζ_M(σ + i(t* + dt)) as [re, im]: Σ n^{−σ} e^{−i(φ_n + dt ln n)}. */
  function zetaStar(M, sig, dt) {
    let re = 0, im = 0;
    for (let n = 1; n <= M; n++) { const r = Math.exp(-sig * LOGN[n]), a = PHI[n] + dt * LOGN[n]; re += r * Math.cos(a); im -= r * Math.sin(a); }
    return [re, im];
  }
  const TS = 61, TN = 61, TSIG = [0.95, 1.05], TDT = [-0.06, 0.06], RHO0 = 0.025;
  const tileCache = new Map();
  function tileLn(M) {
    if (tileCache.has(M)) return tileCache.get(M);
    const g = new Float64Array(TS * TN);
    for (let j = 0; j < TN; j++) for (let i = 0; i < TS; i++) {
      const s = TSIG[0] + (TSIG[1] - TSIG[0]) * i / (TS - 1), d = TDT[0] + (TDT[1] - TDT[0]) * j / (TN - 1);
      g[j * TS + i] = lnAbs(zetaStar(M, s, d));
    }
    tileCache.set(M, g);
    return g;
  }
  /** Where the magnifier is deepest: { sigma, dt, ln } on its grid. */
  function tileMin(M) {
    const g = tileLn(M); let k = 0;
    for (let q = 1; q < g.length; q++) if (g[q] < g[k]) k = q;
    const i = k % TS, j = Math.floor(k / TS);
    return { sigma: TSIG[0] + (TSIG[1] - TSIG[0]) * i / (TS - 1), dt: TDT[0] + (TDT[1] - TDT[0]) * j / (TN - 1), ln: g[k], ns: TS, nt: TN, sigmaRange: TSIG, dtRange: TDT };
  }
  /** The vectors n^{−s*} laid head to tail: partial sums S_0 = 0, …, S_M. */
  function phasors(M) {
    const pts = [[0, 0]];
    let re = 0, im = 0;
    for (let n = 1; n <= M; n++) { const r = Math.exp(-SIG_STAR * LOGN[n]); re += r * Math.cos(PHI[n]); im -= r * Math.sin(PHI[n]); pts.push([re, im]); }
    return pts;
  }

  /* ---------- the single mollifier: κ ≥ 1 − (1/R) ln c(P, Q, R, θ) (Levinson–Conrey) ----------
     P(x) = x + p₂(x² − x) + p₃(x³ − x) (P(0) = 0, P(1) = 1); Q(x) = q₀ + q₁(1 − 2x) + q₃(1 − 2x)³ with Q(0) = 1;
     c = Q(0)² + (1/θ)∫₀¹∫₀¹ e^{2Rv} (P(u)A(v) + P′(u)Q(v))² du dv, A = RθQ + θQ′, and ∫PP′ = 1/2. */
  const SN = 128;
  function simpson(f) { const h = 1 / SN; let s = f(0) + f(1); for (let i = 1; i < SN; i++) s += (i % 2 ? 4 : 2) * f(i * h); return s * h / 3; }
  function kappaAt(x, th) {
    const [R, p2, p3, q1, q3] = x, q0 = 1 - q1 - q3;
    if (!(R > 0.05)) return -Infinity;
    const Pf = (u) => u + p2 * (u * u - u) + p3 * (u * u * u - u), dP = (u) => 1 + p2 * (2 * u - 1) + p3 * (3 * u * u - 1);
    const Qf = (v) => q0 + q1 * (1 - 2 * v) + q3 * (1 - 2 * v) ** 3, dQ = (v) => -2 * q1 - 6 * q3 * (1 - 2 * v) ** 2, A = (v) => R * th * Qf(v) + th * dQ(v);
    const IPP = simpson((u) => Pf(u) ** 2), IdP = simpson((u) => dP(u) ** 2);
    const EA = simpson((v) => Math.exp(2 * R * v) * A(v) ** 2), EAB = simpson((v) => Math.exp(2 * R * v) * A(v) * Qf(v)), EB = simpson((v) => Math.exp(2 * R * v) * Qf(v) ** 2);
    const c = Qf(0) ** 2 + (IPP * EA + EAB + IdP * EB) / th;
    return 1 - Math.log(c) / R;
  }
  /** Nelder–Mead maximization of f from x0 (steps s). */
  function maximize(f, x0, s, iters) {
    const n = x0.length;
    let pts = [x0.slice()].concat(x0.map((_, i) => x0.map((v, j) => v + (i === j ? s[j] : 0)))), vals = pts.map((p) => -f(p));
    for (let it = 0; it < iters; it++) {
      const o = pts.map((p, i) => i).sort((a, b) => vals[a] - vals[b]); pts = o.map((i) => pts[i]); vals = o.map((i) => vals[i]);
      if (Math.abs(vals[n] - vals[0]) < 1e-13) break;
      const c = x0.map((_, j) => pts.slice(0, n).reduce((a, p) => a + p[j], 0) / n);
      const at = (k) => c.map((cj, j) => cj + k * (pts[n][j] - cj));
      const r = at(-1), fr = -f(r);
      if (fr < vals[0]) { const e = at(-2), fe = -f(e); if (fe < fr) { pts[n] = e; vals[n] = fe; } else { pts[n] = r; vals[n] = fr; } }
      else if (fr < vals[n - 1]) { pts[n] = r; vals[n] = fr; }
      else {
        const k = at(0.5), fk = -f(k);
        if (fk < vals[n]) { pts[n] = k; vals[n] = fk; }
        else for (let i = 1; i <= n; i++) { pts[i] = pts[i].map((v, j) => pts[0][j] + 0.5 * (v - pts[0][j])); vals[i] = -f(pts[i]); }
      }
    }
    const best = vals.indexOf(Math.min(...vals));
    return { x: pts[best], value: -vals[best] };
  }
  const molCache = new Map();
  let molWarm = [1.28, -0.017, 0.164, 0.598, -0.09];
  /** The best κ over cubic P, Q and R at θ (cached per θ to 10⁻⁴). */
  function mollifier(th) {
    const key = th.toFixed(4);
    if (molCache.has(key)) return molCache.get(key);
    let best = null;
    for (const start of [molWarm, [1.3, 0, 0.15, 0.6, -0.1]]) {
      const r = maximize((x) => kappaAt(x, th), start, [0.15, 0.05, 0.05, 0.05, 0.05], 900);
      if (!best || r.value > best.value) best = r;
    }
    const out = { theta: th, kappa: best.value, params: best.x, proved: th < 4 / 7 + 1e-12 };
    molWarm = best.x.slice();
    molCache.set(key, out);
    return out;
  }
  let levinsonCache = null;
  /** Levinson's choice: P(x) = x, Q linear (q₃ = 0), θ = 1/2, R and q₁ optimized. */
  function levinson() {
    if (levinsonCache) return levinsonCache;
    const r = maximize((x) => kappaAt([x[0], 0, 0, x[1], 0], 0.5), [1.3, 0.5], [0.2, 0.1], 600);
    levinsonCache = { kappa: r.value, R: r.x[0], q1: r.x[1] };
    return levinsonCache;
  }
  let molCurve = null;
  const curveThetas = Array.from({ length: 59 }, (_, i) => 0.32 + 0.01 * i);
  function mollifierCurve() {
    if (!molCurve) molCurve = curveThetas.map((th) => ({ th, k: mollifier(th).kappa }));
    return molCurve;
  }

  /* ---------- the block Schur complement on the window {1, 2, 3, 6}: exact rationals ---------- */
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  const Q = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d); return [n / g, d / g]; };
  const qa = (a, b) => Q(a[0] * b[1] + b[0] * a[1], a[1] * b[1]), qs = (a, b) => Q(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
  const qm = (a, b) => Q(a[0] * b[0], a[1] * b[1]), qd = (a, b) => Q(a[0] * b[1], a[1] * b[0]);
  const qv = (a) => a[0] / a[1], qt = (a) => (a[1] === 1 ? `${a[0]}`.replace('-', '−') : `${a[0]}/${a[1]}`.replace('-', '−'));
  const WIN = [1, 2, 3, 6], IDX = { 1: 0, 2: 1, 3: 2, 6: 3 };
  const kern = (m, n) => Q(Math.min(m, n), Math.max(m, n));
  function qdet(A) {
    const n = A.length; if (n === 1) return A[0][0];
    let s = [0, 1];
    for (let j = 0; j < n; j++) { const minor = A.slice(1).map((r) => r.filter((_, k) => k !== j)), t = qm(A[0][j], qdet(minor)); s = j % 2 ? qs(s, t) : qa(s, t); }
    return s;
  }
  function qinv2(A) { const d = qs(qm(A[0][0], A[1][1]), qm(A[0][1], A[1][0])); return [[qd(A[1][1], d), qd(Q(-A[0][1][0], A[0][1][1]), d)], [qd(Q(-A[1][0][0], A[1][0][1]), d), qd(A[0][0], d)]]; }
  const qmat = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, a, k) => qa(s, qm(a, B[k][j])), [0, 1])));
  let schurCache = null;
  function schurExact() {
    if (schurCache) return schurCache;
    const G = WIN.map((m) => WIN.map((n) => kern(m, n)));
    const I = [1, 2], Pv = [3, 6], sub = (rs, cs) => rs.map((m) => cs.map((n) => G[IDX[m]][IDX[n]]));
    const GII = sub(I, I), GIP = sub(I, Pv), GPI = sub(Pv, I), GPP = sub(Pv, Pv), GIIi = qinv2(GII);
    const corr = qmat(qmat(GPI, GIIi), GIP), S = GPP.map((r, i) => r.map((a, j) => qs(a, corr[i][j])));
    const apex = qs(S[1][1], qd(qm(S[1][0], S[0][1]), S[0][0]));                    // eliminate 3 too: 8/9 − (5/18)²/(5/9)
    // LDLᵀ in the order 1, 2, 3, 6: the pivots are the successive Schur complements
    const n = 4, A = G.map((r) => r.slice()), Lm = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? [1, 1] : [0, 1]))), Dg = [];
    for (let k = 0; k < n; k++) {
      Dg.push(A[k][k]);
      for (let i = k + 1; i < n; i++) { Lm[i][k] = qd(A[i][k], A[k][k]); for (let j = k + 1; j < n; j++) A[i][j] = qs(A[i][j], qm(Lm[i][k], A[k][j])); }
    }
    // O = D^{1/2} Lᵀ (floats): O*O = L D Lᵀ = G
    const O = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Math.sqrt(qv(Dg[i])) * qv(Lm[j][i])));
    let realErr = 0;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { let s = 0; for (let k = 0; k < n; k++) s += O[k][i] * O[k][j]; realErr = Math.max(realErr, Math.abs(s - qv(G[i][j]))); }
    // the target 4: b = (G(4, n)), squared residual after I and after I ∪ P
    const b = WIN.map((m) => kern(4, m)), bI = [b[0], b[1]];
    const quad = (Minv, v) => v.reduce((s, x, i) => qa(s, qm(x, v.reduce((t, y, j) => qa(t, qm(Minv[i][j], y)), [0, 1]))), [0, 1]);
    const resI = qs([1, 1], quad(GIIi, bI));
    const Gi = qinverse(G), resIP = qs([1, 1], quad(Gi, b));
    // the open entry x = G(1, 6): det as a quadratic in x, the PSD interval and the clique–separator (max-det) value
    const detAt = (x) => { const M = G.map((r) => r.slice()); M[0][3] = M[3][0] = x; return qdet(M); };
    const d0 = detAt([0, 1]), d1 = detAt([1, 1]), dm = detAt([-1, 1]);
    const qa2 = qs(qd(qa(d1, dm), [2, 1]), d0), qb2 = qd(qs(d1, dm), [2, 1]), qc2 = d0;
    const vertex = qd(Q(-qb2[0], qb2[1]), qm([2, 1], qa2)), disc = qs(qm(qb2, qb2), qm([4, 1], qm(qa2, qc2)));
    const sq = (k) => { const r = Math.round(Math.sqrt(k)); return r * r === k ? r : null; };
    const rn = sq(disc[0]), rd = sq(disc[1]);
    let roots;
    if (rn != null && rd != null) { const h = qd(Q(rn, rd), qm([2, 1], Q(-qa2[0], qa2[1]))); roots = [qs(vertex, h), qa(vertex, h)].sort((u, v) => qv(u) - qv(v)); }
    else { const h = Math.sqrt(qv(disc)) / (2 * Math.abs(qv(qa2))); roots = [qv(vertex) - h, qv(vertex) + h]; }
    // the clique–separator formula for cliques {1, 2, 3}, {2, 3, 6} glued along {2, 3}: x = G(1, S) G_SS⁻¹ G(S, 6)
    const GSS = sub([2, 3], [2, 3]), maxdet = qmat(qmat(sub([1], [2, 3]), qinv2(GSS)), sub([2, 3], [6]))[0][0];
    schurCache = { G, GII, GIP, GPI, GPP, GIIi, corr, S, apex, Dg, Lm, O, realErr, detG: qdet(G), detII: qdet(GII), detS: qdet(S), b, resI, resIP,
      poly: [qa2, qb2, qc2], vertex, roots, maxdet, cliques: [[1, 2, 3], [2, 3, 6]] };
    return schurCache;
  }
  function qinverse(G) {
    const n = G.length, A = G.map((r, i) => r.concat(Array.from({ length: n }, (_, j) => (i === j ? [1, 1] : [0, 1]))));
    for (let c = 0; c < n; c++) {
      let p = c; while (A[p][c][0] === 0) p++;
      [A[c], A[p]] = [A[p], A[c]];
      const d = A[c][c]; A[c] = A[c].map((x) => qd(x, d));
      for (let r = 0; r < n; r++) if (r !== c && A[r][c][0] !== 0) { const f = A[r][c]; A[r] = A[r].map((x, j) => qs(x, qm(f, A[c][j]))); }
    }
    return A.map((r) => r.slice(n));
  }
  /** The completion at x (float): determinant, least eigenvalue, rank. */
  function completionAt(x) {
    const s = schurExact(), M = s.G.map((r) => r.map(qv)); M[0][3] = M[3][0] = x;
    const ev = eigSym(M), det = qv(s.poly[0]) * x * x + qv(s.poly[1]) * x + qv(s.poly[2]);
    return { x, det, lambdaMin: ev[0], eigenvalues: ev, rank: ev.filter((e) => e > 1e-9).length, psd: ev[0] > -1e-12 };
  }
  /** Eigenvalues of a symmetric matrix (cyclic Jacobi). */
  function eigSym(Min) {
    const n = Min.length, A = Min.map((r) => r.slice());
    for (let sweep = 0; sweep < 60; sweep++) {
      let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += A[i][j] ** 2;
      if (off < 1e-28) break;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
        if (Math.abs(A[p][q]) < 1e-300) continue;
        const th = (A[q][q] - A[p][p]) / (2 * A[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < n; k++) { const a = A[k][p], b = A[k][q]; A[k][p] = c * a - s * b; A[k][q] = s * a + c * b; }
        for (let k = 0; k < n; k++) { const a = A[p][k], b = A[q][k]; A[p][k] = c * a - s * b; A[q][k] = s * a + c * b; }
      }
    }
    return A.map((r, i) => r[i]).sort((a, b) => a - b);
  }

  /* ---------- the Cayley relay ---------- */
  /** |w| for ρ = 1/2 + δ + iγ, w = −ρ/(1 − ρ), and the layer readouts at layer ℓ. */
  function relayOf(delta, ell, gamma = G1) {
    const num = (0.5 + delta) ** 2 + gamma * gamma, den = (0.5 - delta) ** 2 + gamma * gamma;
    const lnw = 0.5 * Math.log(num / den), absW = Math.exp(lnw);
    const log10At = (l) => 2 ** l * lnw / LN10;
    const star = lnw > 0 ? Math.ceil(Math.log2(LN2 / lnw) - 1e-12) : Infinity, linear = lnw > 0 ? Math.ceil(LN2 / lnw - 1e-12) : Infinity;
    const Dh = gamma + 10, m0 = delta > 0 ? 100 * Dh * Dh / (delta * delta) : Infinity, m1 = delta > 0 ? 500 * Dh ** 4 / (delta * delta) : Infinity;
    return { delta, gamma, ell, absW, lnw, defect: -lnw, ratio: 1 / absW, log10: log10At(ell), log10At, star, linear, robinLow: 4 * m0, robinHigh: 28 * m1,
      wRe: -((0.5 + delta) * (0.5 - delta) - gamma * gamma) / den, wIm: -(gamma * (0.5 - delta) + gamma * (0.5 + delta)) / den };
  }
  /** (s − 1)ζ(s) at s = 1 + 10^{−k}: the residue at the pole. */
  const residues = () => [1, 2, 3, 4, 5, 6].map((k) => { const e = 10 ** -k, z = zeta(1 + e, 0); return { k, value: e * z[0] }; });

  /* ---------- state ---------- */
  const S = { scene: 'cutoff', M: 19, theta: 0.7, x16: 1 / 6, delta: 0.05, tau: 18 / 39 };
  const Mof = (t) => 1 + Math.round(39 * clamp(t, 0, 1)), tauOfM = (M) => (M - 1) / 39;
  const tCut = (scene) => (scene === 'relay' ? G1 : 0);
  /** The block runs to t = 20 under the cutoff (the magnifier stands behind it), to t = 36 otherwise. */
  const tEnd = (scene) => (scene === 'cutoff' ? 20.1 : 36);
  const SIG_W = 0.5 + 1.6 * 4 / 7;                                // where the 4/7 wall stands
  const sigEntry = (th) => 0.5 + 1.6 * th;

  /** Everything the page shows, from the state. */
  function model() {
    const sc0 = S.scene, ell = sc0 === 'relay' ? 16 * S.tau : 16, lam1 = clamp(2 * S.tau, 0, 1), lam2 = clamp(2 * S.tau - 1, 0, 1);
    const zs = zetaStar(S.M, SIG_STAR, 0), mol = mollifier(S.theta), mol47 = mollifier(4 / 7);
    return {
      ell, lam1, lam2, mol, mol47, lev: levinson(), schur: schurExact(), comp: completionAt(S.x16), relay: relayOf(S.delta, ell),
      star: { M: S.M, re: zs[0], im: zs[1], abs: Math.hypot(zs[0], zs[1]) }, zeroFree: zeroFree(S.M),
      envelope: S.M >= 3 ? 1 + MONT * Math.log(Math.log(S.M)) / Math.log(S.M) : null, nbb: S.M >= 2 ? C_NBB / Math.log(S.M) : null,
      harmonic: (() => { let h = 0; for (let n = 1; n <= S.M; n++) h += 1 / n; return h; })()
    };
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; probe.style.position = 'absolute'; tagBox.appendChild(probe);
  const VIEWS = { cutoff: [-0.36, 0.6], mollifier: [-0.48, 0.36], schur: [-0.62, 0.48], relay: [-0.42, 0.36] };
  const options = { canvas: $('cv'), yaw: VIEWS.cutoff[0], pitch: VIEWS.cutoff[1], wheel: false, radius: 0.32, cx: 0.5, cy: 0.5, onChange: () => paint() };
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
    for (const el of [$('hudTl'), $('sceneChips'), $('legend')]) { const b = boxOf(el, sr); if (b && (el.id !== 'legend' || el.textContent.trim())) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 6); else bottom = Math.min(bottom, b.y - 6); }
    return { x: 14, y: top, w: Math.max(40, W - 28), h: Math.max(60, bottom - top) };
  }

  /* labels: placed after drawing by priority, off each other, the HUD and the handle */
  const sizes = new Map();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizes.clear(); paint(); });
  TRV.onLang(() => sizes.clear());
  function sizeOf(html, cls) {
    const k = `${TRV.lang()}|${cls}|${html}`;
    let s = sizes.get(k);
    if (!s) { probe.className = 'tag ' + cls; probe.innerHTML = html; probe.hidden = false; s = [probe.offsetWidth, probe.offsetHeight]; probe.hidden = true; if (s[0] > 0) sizes.set(k, s); }
    return s;
  }
  let LB = [], OBST = [], BOUNDS = null, PLACED = [];
  const want = (key, q, html, cls, o = {}) => LB.push({ key, q, html, cls, pri: o.pri || 0, dir: o.dir || [0, -1], r: o.r == null ? 10 : o.r });
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
      placed.push(Object.assign({ key: l.key }, ok));
      sc.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
    }
    PLACED = placed;
  }

  /* the projection is fitted to the HUD-free rect from the scene's own outline; it is held while the handle drags */
  const TILE = { cx: -0.42, x: (s) => -0.42 + (s - 1) * 11, y: (d) => 0.32 + (d - TDT[0]) * 5, z: (l) => ZS * HCAP * Math.tanh((l - Math.log(RHO0)) / HCAP), bot: -0.5 };
  const SCREEN = { y: 0.62, x0: 0.26, x1: 1.02, z0: -0.34, z1: 0.62 };
  function fitPts(scene) {
    if (scene === 'schur') return [[-0.85, -0.85, -0.52], [0.85, -0.85, -0.52], [-0.85, 0.85, -0.52], [0.85, 0.85, -0.52], [0, 0.2, 0.78], [-0.85, -0.85, -0.3], [0.85, 0.85, 0.2]];
    const y0 = Y(tCut(scene)), y1 = Y(tEnd(scene)), pts = [];
    for (const x of [-1, 1]) for (const y of [y0, y1]) for (const z of [BOT, 0.5]) pts.push([x, y, z]);
    if (scene === 'cutoff') {
      for (const x of [SCREEN.x0, SCREEN.x1]) for (const z of [SCREEN.z0, SCREEN.z1]) pts.push([x, SCREEN.y, z]);
      for (const x of [TILE.x(TSIG[0]), TILE.x(TSIG[1])]) for (const y of [TILE.y(TDT[0]), TILE.y(TDT[1])]) pts.push([x, y, TILE.bot], [x, y, 0.5]);
    }
    if (scene === 'mollifier') pts.push([X(SIG_W), y0 - 0.22, BOT], [X(SIG_W), y0 - 0.22, 0.55]);
    if (scene === 'relay') pts.push([X(0.5), y0, 0.95]);
    return pts;
  }
  function camAxes() {
    const cy = Math.cos(sc.cam.yaw), sy = Math.sin(sc.cam.yaw), cp = Math.cos(sc.cam.pitch), sp = Math.sin(sc.cam.pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp] };
  }
  function fitTo(area, W, H) {
    const { R, U } = camAxes();
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const p of fitPts(S.scene)) { const x = v3.dot(p, R), y = v3.dot(p, U); x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    const px = 0.04 * (x1 - x0), py = 0.04 * (y1 - y0);
    const unit = Math.max(20, Math.min(area.w / (x1 - x0 + 2 * px), area.h / (y1 - y0 + 2 * py)));
    const u = unit * (sc.cam.zoom || 1);
    options.radius = unit / Math.max(1, Math.min(W, H));
    options.cx = (area.x + area.w / 2 - u * (x0 + x1) / 2) / Math.max(1, W);
    options.cy = (area.y + area.h / 2 + u * (y0 + y1) / 2) / Math.max(1, H);
    return unit;
  }

  /* the terrain: ln|f| on rows (front section at tCut, then the grid rows behind it) */
  const smooth01 = (x) => { const t = clamp(x, 0, 1); return t * t * (3 - 2 * t); };
  /** Colour ramp value: cyan for σ > 1, violet in the strip, towards magenta where the surface rises high. */
  const rampValue = (sig, h) => { const base = 1 - smooth01((sig - 0.96) / 0.08); return base + (2 - base) * smooth01((h - 1.1) / 0.9); };
  function terrain(scene) {
    const t0 = tCut(scene), f = scene === 'cutoff' ? cutLn(S.M) : zetaLn();
    const front = scene === 'relay' ? zetaRow(t0) : Float64Array.from(SIG, (_, i) => f[i]);
    const rows = [Array.from(SIG, (s, i) => front[i])], ts = [t0];
    if (t0 === 0) for (const t of FINE_T) { rows.push(Array.from(fineRow(scene === 'cutoff' ? S.M : 0, t))); ts.push(t); }
    for (let j = 0; j < NT; j++) if (TT[j] > t0 + 0.12 && TT[j] <= tEnd(scene)) { rows.push(Array.from(SIG, (_, i) => f[j * NS + i])); ts.push(TT[j]); }
    return { t0, ts, rows, front };
  }
  const zTopFront = (T, sig) => { const x = clamp(sig / DS, 0, NS - 1), i = Math.min(NS - 2, Math.floor(x)), u = x - i; return Zof(T.front[i]) * (1 - u) + Zof(T.front[i + 1]) * u; };

  function drawTerrain(T, scene) {
    const nr = T.rows.length;
    const pts = T.rows.map((row, j) => row.map((l, i) => [X(SIG[i]), Y(T.ts[j]), Zof(l)]));
    const vals = T.rows.map((row) => row.map((l, i) => rampValue(SIG[i], soft(l))));
    sc.surface('top', pts, { value: (u, v) => vals[Math.round(v * (nr - 1))][Math.round(u * (NS - 1))], colors: [P.cyan, P.violet, P.magenta], range: [0, 2],
      grid: { every: [8, 10], color: P.ink, alpha: 0.16 }, id: 'terrain' });
    const y0 = Y(T.t0), y1 = Y(T.ts[nr - 1]);
    const fz = SIG.map((_, i) => Zof(T.front[i])), fv = SIG.map((sg, i) => rampValue(sg, soft(T.front[i])));
    sc.surface('front', [SIG.map((sg) => [X(sg), y0, BOT]), SIG.map((sg, i) => [X(sg), y0, Math.max(BOT + 0.02, fz[i] - 0.1)]), SIG.map((sg, i) => [X(sg), y0, fz[i]])],
      { value: (u, v) => (v < 0.75 ? 1 : fv[Math.round(u * (NS - 1))]), colors: [P.cyan, P.violet, P.magenta], range: [0, 2], pick: false, id: 'front', grid: { every: [10, 2], color: P.ink, alpha: 0.14 } });
    sc.surface('right', [T.ts.map((t) => [X(2), Y(t), BOT]), T.rows.map((r, j) => [X(2), Y(T.ts[j]), Zof(r[NS - 1])])], { color: P.cyan, pick: false });
    sc.surface('left', [T.ts.map((t) => [X(0), Y(t), BOT]), T.rows.map((r, j) => [X(0), Y(T.ts[j]), Zof(r[0])])], { color: P.violet, pick: false });
    sc.surface('back', [SIG.map((s) => [X(s), y1, BOT]), SIG.map((s, i) => [X(s), y1, Zof(T.rows[nr - 1][i])])], { color: P.violet, pick: false });
    // the critical spine σ = 1/2 and the line σ = 1 on the surface
    const along = (i, lift) => T.rows.map((r, j) => [X(SIG[i]), Y(T.ts[j]), Zof(r[i]) + lift]);
    sc.tube('spine', along(20, 0.012), { color: P.sigma, width: 2.6, glow: 0.4, pick: false, occlude: false });
    sc.line(along(40, 0.014), { color: P.cyan, width: 1.6, dash: [6, 4], alpha: 0.9 });
    // the front section edge, drawn a little in front of the face
    sc.line(SIG.map((s, i) => [X(s), y0 - 0.004, Zof(T.front[i]) + 0.004]), { color: P.ink, width: 1.4, alpha: 0.7 });
  }

  /* a polyline: points [x, z] in the front plane y = yf, with its arc-length table */
  function pathOf(xz, yf) {
    const pts = xz.map(([x, z]) => [x, yf, z]), lens = [0];
    for (let i = 1; i < pts.length; i++) lens.push(lens[i - 1] + v3.len(v3.sub(pts[i], pts[i - 1])));
    return { pts, lens, total: lens[lens.length - 1] };
  }
  function pointAt(path, f) {
    const s = clamp(f, 0, 1) * path.total; let i = 1;
    while (i < path.lens.length - 1 && path.lens[i] < s) i++;
    const a = path.lens[i - 1], b = path.lens[i];
    return v3.lerp(path.pts[i - 1], path.pts[i], b > a ? clamp((s - a) / (b - a), 0, 1) : 0);
  }
  /** A dive: from the surface at σa straight down (90°), along the depth zD with dips at the wells, up to the surface at σb. */
  function divePath(T, sa, sb, zD, wells, yf) {
    const r = 0.07, xa = X(sa), xb = X(sb), za = zTopFront(T, sa), zb = zTopFront(T, sb), xz = [];
    const dip = (x) => wells.reduce((d, w) => d - 0.05 * Math.exp(-(((x - X(w)) / 0.03) ** 2)), 0);
    for (let k = 0; k <= 8; k++) xz.push([xa, za + (zD + r - za) * k / 8]);
    for (let k = 1; k <= 8; k++) { const a = -PI / 2 * k / 8; xz.push([xa - r + r * Math.cos(a), zD + r + r * Math.sin(a)]); }
    const n = Math.max(8, Math.round((xa - xb - 2 * r) / 0.01));
    for (let k = 1; k < n; k++) { const x = xa - r - (xa - xb - 2 * r) * k / n; xz.push([x, zD + dip(x)]); }
    for (let k = 0; k <= 8; k++) { const a = -PI / 2 - PI / 2 * k / 8; xz.push([xb + r + r * Math.cos(a), zD + r + r * Math.sin(a)]); }
    for (let k = 1; k <= 8; k++) xz.push([xb, zD + r + (zb - zD - r) * k / 8]);
    return pathOf(xz, yf);
  }
  const RELAY_WELLS = (sl) => [1, 0.68, 0.42, 0.2].map((f) => sl + (1 - sl) * f);

  let FRAME = null, FIT = null, HANDLE = null;
  function drawStage(M) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode, scene = S.scene;
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 24, y: 24, w: W - 48, h: H - 48 } : safeRect(W, H, huds);
    if (!dragging || !FIT) { FIT = { area }; fitTo(area, W, H); }
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = [];
    const tags = [], at = (p, html, cls, pri, dir) => { if (!thumb) tags.push({ p, html, cls, pri, dir }); };
    let head = null; HANDLE = null;
    sc.begin();
    if (scene !== 'schur') {
      const T = terrain(scene), y0 = Y(T.t0), yf = y0 - 0.012;
      drawTerrain(T, scene);
      const onTop = (sig, t) => { const j = clamp(Math.round(t / DT), 0, NT - 1), f = scene === 'cutoff' ? cutLn(S.M) : zetaLn(); return [X(sig), Y(t), Zof(f[j * NS + Math.round(sig / DS)])]; };
      at(onTop(1.6, Math.min(27, tEnd(scene) - 4)), 'σ &gt; 1 · Λ(s) ≠ 0', 'raw c-cy backed', 8, [0.4, -1]);
      at(onTop(0.5, T.t0 + 0.45 * (tEnd(scene) - T.t0)), 'σ = 1/2', 'raw c-sg backed', 7, [-1, -0.25]);
      if (scene !== 'cutoff') GAMMAS.forEach((g, k) => { if (g > T.t0 + 0.2) { const j = Math.round(g / DT); sc.ring([X(0.5), Y(g), Zof(zetaLn()[j * NS + 20]) + 0.016], { key: `zero${k}`, color: P.sigma, r: 5.5, normal: [0, 0, 1] }); } });
      if (scene === 'cutoff') {
        at([X(1), y0, zTopFront(T, 1) + 0.01], `ζ<sub>${S.M}</sub>(1) = H<sub>${S.M}</sub> = ${fix(M.harmonic, 3)}`, 'raw c-mg backed', 9, [0.5, 1]);
        // the magnifier near t*: ln(|ζ_M|/0.03), σ magnified 14 times, a short block of its own
        const g = tileLn(S.M), tpts = [], tval = [];
        for (let j = 0; j < TN; j++) {
          const row = [], vr = [], d = TDT[0] + (TDT[1] - TDT[0]) * j / (TN - 1);
          for (let i = 0; i < TS; i++) { const s = TSIG[0] + (TSIG[1] - TSIG[0]) * i / (TS - 1), l = g[j * TS + i]; row.push([TILE.x(s), TILE.y(d), TILE.z(l)]); vr.push(1 - smooth01((s - 0.997) / 0.006)); }
          tpts.push(row); tval.push(vr);
        }
        sc.surface('tile', tpts, { value: (u, v) => tval[Math.round(v * (TN - 1))][Math.round(u * (TS - 1))], colors: [P.cyan, P.violet], range: [0, 1], grid: { every: [5, 4], color: P.ink, alpha: 0.18 }, id: 'tile' });
        sc.surface('tileFront', [tpts[0].map((p) => [p[0], p[1], TILE.bot]), tpts[0]], { color: P.violet, pick: false });
        const i1 = Math.round((1 - TSIG[0]) / (TSIG[1] - TSIG[0]) * (TS - 1));
        sc.line(Array.from({ length: TN }, (_, j) => { const p = tpts[j][i1]; return [p[0], p[1], p[2] + 0.01]; }), { color: P.cyan, width: 1.6, dash: [6, 4] });
        const jEnd = T.rows.length - 1;
        sc.line([[0, Y(T.ts[jEnd]), Zof(T.rows[jEnd][40]) + 0.02], [TILE.cx, TILE.y(TDT[0]), tpts[0][i1][2] + 0.02]], { color: P.dim, width: 1.4, dash: [3, 4] });
        at([TILE.cx / 2, (Y(T.ts[jEnd]) + TILE.y(TDT[0])) / 2, 0.2], 't → 1.554×10¹⁴', 'raw c-ik backed', 6, [-1, -0.2]);
        const pitPt = [TILE.x(SIG_STAR), TILE.y(0), TILE.z(lnAbs(zetaStar(S.M, SIG_STAR, 0)))];
        if (S.M === 19) {
          const top = [pitPt[0], pitPt[1], 0.5];
          sc.line([pitPt, top], { color: P.magenta, width: 2 });
          sc.fan([top, [top[0] + 0.14, top[1], top[2] - 0.035], [top[0], top[1], top[2] - 0.07]], { fill: P.magenta, alpha: 0.9 });
          sc.ring(v3.add(pitPt, [0, 0, 0.01]), { key: 'turanZero', color: P.magenta, r: 6, normal: [0, 0, 1] });
          at(top, L(`图兰假零点 σ = ${fix(SIG_STAR, 6)}`, `Turán zero σ = ${fix(SIG_STAR, 6)}`), 'raw c-mg backed', 10, [1, -0.3]);
        } else at(v3.add(pitPt, [0, 0, 0.04]), `|ζ<sub>${S.M}</sub>(s*)| = ${fix(M.star.abs, 3)}`, 'raw c-mg backed', 9, [1, -0.4]);
        // the screen behind the magnifier: the vectors n^{−s*} head to tail
        const ph = phasors(S.M);
        let lo = [0, 0], hi = [0, 0];
        ph.forEach(([a, b]) => { lo = [Math.min(lo[0], a), Math.min(lo[1], b)]; hi = [Math.max(hi[0], a), Math.max(hi[1], b)]; });
        const sw = SCREEN.x1 - SCREEN.x0, sh = SCREEN.z1 - SCREEN.z0, k = 0.84 * Math.min(sw / Math.max(1e-6, hi[0] - lo[0]), sh / Math.max(1e-6, hi[1] - lo[1]));
        const cxs = (SCREEN.x0 + SCREEN.x1) / 2 - k * (lo[0] + hi[0]) / 2, czs = (SCREEN.z0 + SCREEN.z1) / 2 - k * (lo[1] + hi[1]) / 2;
        const onScreen = ([a, b]) => [cxs + k * a, SCREEN.y - 0.004, czs + k * b];
        sc.fan([[SCREEN.x0, SCREEN.y, SCREEN.z0], [SCREEN.x1, SCREEN.y, SCREEN.z0], [SCREEN.x1, SCREEN.y, SCREEN.z1], [SCREEN.x0, SCREEN.y, SCREEN.z1]], { fill: P.void, alpha: 0.72, color: P.lineHot, width: 1 });
        sc.line(ph.map(onScreen), { color: P.cyan, width: 1.8 });
        const end = ph[ph.length - 1], closed = Math.hypot(end[0], end[1]) < 1e-9;
        if (!closed) sc.line([onScreen(end), onScreen([0, 0])], { color: P.magenta, width: 1.4, dash: [4, 3] });
        sc.bead(onScreen([0, 0]), { key: 'origin', color: P.ink, r: 3.2 });
        sc.bead(onScreen(end), { key: 'partial', color: P.amber, r: 4.6 });
        head = onScreen(end);
        at([SCREEN.x0 + 0.02, SCREEN.y, SCREEN.z1], closed ? L(`Σ<sub>n≤${S.M}</sub> n<sup>−s*</sup> = 0`, `Σ<sub>n≤${S.M}</sub> n<sup>−s*</sup> = 0`) : `|Σ<sub>n≤${S.M}</sub> n<sup>−s*</sup>| = ${fix(M.star.abs, 3)}`, closed ? 'raw c-mg backed' : 'raw c-cy backed', 8, [1, -1]);
      } else if (scene === 'mollifier') {
        at([X(1), y0, zTopFront(T, 1)], L('s = 1 极点 · 留数 1', 's = 1 pole · residue 1'), 'raw c-mg backed', 10, [0.6, -1]);
        const sE = sigEntry(S.theta), path = divePath(T, sE, 0.5, -0.36, [], yf), xw = X(SIG_W);
        // the proven part (x ≤ the wall) in cyan; past the wall a jittering magenta dash (not proved)
        const inside = path.pts.filter((p) => p[0] <= xw + 1e-9), outside = path.pts.filter((p) => p[0] >= xw - 1e-9);
        if (inside.length > 1) sc.tube('hop', inside, { color: P.cyan, width: 4, glow: 0.55, pick: false, occlude: false });
        if (sE > SIG_W && outside.length > 1) {
          const jit = outside.map((p, k) => [p[0], p[1], p[2] + 0.012 * Math.sin(k * 2.3) * clamp((p[0] - xw) / 0.1, 0, 1)]);
          sc.line(jit, { color: P.magenta, width: 2.2, dash: [5, 3] });
        }
        // the 4/7 wall: a magenta fin standing out of the front face
        const zt = zTopFront(T, SIG_W) + 0.12;
        sc.surface('wall47', [[[xw, y0 - 0.2, BOT], [xw, y0 - 0.004, BOT]], [[xw, y0 - 0.2, zt], [xw, y0 - 0.004, zt]]], { color: P.magenta, alpha: 0.4, pick: false, occlude: false });
        sc.line([[xw, y0 - 0.2, zt], [xw, y0 - 0.004, zt]], { color: P.magenta, width: 2 });
        at([xw, y0 - 0.2, zt], 'θ = 4/7', 'raw c-mg backed', 9, [0.4, -1]);
        head = pointAt(path, S.tau);
        sc.bead(head, { key: 'head', color: P.amber, r: 6.5 });
        const exit = path.pts[path.pts.length - 1];
        sc.ring(exit, { key: 'landing', color: P.cyan, r: 7, normal: [0, -1, 0] });
        at(exit, M.mol.proved ? `κ = ${pct(M.mol.kappa, 1)}` : L(`κ 公式 ${pct(M.mol.kappa, 1)} · 未证`, `κ formula ${pct(M.mol.kappa, 1)} · unproved`), M.mol.proved ? 'raw c-cy backed' : 'raw c-mg backed', 9, [-1, -0.5]);
        at(path.pts[4], L('90° 潜入 î', '90° into î'), 'raw c-cy backed', 7, [1, 0.2]);
        HANDLE = path.pts[0];
      } else {
        const sl = 0.5 + S.delta, wells = RELAY_WELLS(sl), path = divePath(T, 1.62, sl, -0.34, wells.slice(1), yf);
        const lock = S.delta === 0;
        sc.tube('relayPath', path.pts, { color: P.cyan, width: 3.4, glow: 0.45, pick: false, occlude: false });
        const cur = Math.min(3, Math.floor(M.ell / 4 + 1e-9));
        wells.forEach((w, k) => {
          const p = [X(w), yf - 0.004, -0.34 - (k ? 0.05 : 0) + (k ? 0 : 0)];
          sc.ring(p, { key: `well${k}`, color: k === cur ? P.amber : P.violet, r: k === cur ? 9 : 7, normal: [0, -1, 0] });
          if (k === cur || k === 0) at(p, `G̃<sup>(${k + 1})</sup>`, k === cur ? 'raw c-am backed' : 'raw c-vi backed', 6, [0, 1]);
        });
        head = pointAt(path, S.tau);
        sc.bead(head, { key: 'head', color: P.amber, r: 6.5 });
        const land = [X(sl), yf, zTopFront(T, sl)];
        sc.ring([X(0.5), yf, zTopFront(T, 0.5) + 0.01], { key: 'rho1', color: P.sigma, r: 6, normal: [0, -1, 0] });
        at([X(0.5), yf, zTopFront(T, 0.5)], 'ρ₁ = 1/2 + iγ₁', 'raw c-sg backed', 8, [-1, 0.6]);
        if (lock) {
          sc.ring(v3.add(land, [0, 0, 0.03]), { key: 'lock', color: P.cyan, r: 10, normal: [0, 0, 1] });
          at(v3.add(land, [0, 0, 0.05]), `|w| = ${fix(M.relay.absW, 6)}`, 'raw c-cy backed', 10, [0.6, -1]);
        } else {
          const E = M.relay.log10, hc = 0.065 * Math.min(E, 11);
          sc.ring(land, { key: 'rogue', color: P.magenta, r: 8, normal: [0, -1, 0] });
          if (hc > 0.004) sc.tube('blowup', [land, v3.add(land, [0, 0, hc])], { r: 0.016, color: P.magenta, glow: 0.6, pick: false, occlude: false });
          let last = 0;
          for (let l = 1; l <= Math.floor(M.ell); l++) { const h = 0.065 * Math.min(M.relay.log10At(l), 11); if (h - last > 0.03) { sc.ring(v3.add(land, [0, 0, h]), { key: `layer${l}`, color: P.violet, r: 5, normal: [0, 0, 1] }); last = h; } }
          at(v3.add(land, [0, 0, Math.max(hc, 0.05)]), `|w|<sup>2<sup>ℓ</sup></sup> = ${E > 11 ? '&gt; 10¹¹' : sciPow10(E)}`, 'raw c-mg backed', 10, [0.7, -1]);
          at(land, L(`假想 ρ = 1/2 + ${fix(S.delta, 3)} + iγ₁`, `hypothetical ρ = 1/2 + ${fix(S.delta, 3)} + iγ₁`), 'raw c-mg backed', 9, [0.8, 0.9]);
        }
        HANDLE = land;
      }
    } else drawCone(M, at);
    if (head && scene === 'schur') head = null;
    sc.end();

    const hq = !thumb && HANDLE ? sc.p(HANDLE) : null;
    if (hq) OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    placeHandle(hq);
    if (!thumb) {
      const cen = [W / 2, H / 2];
      tags.forEach((t, k) => {
        const q = sc.p(t.p), dir = t.dir ? [t.dir[0], t.dir[1]] : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1];
        want(`t${k}`, q, t.html, t.cls, { pri: t.pri, dir, r: 12 });
      });
      placeLabels();
    }
    FRAME = { W, H, area: FIT.area, handle: hq ? { x: hq[0], y: hq[1] } : null, unit: sc.unit, cx: sc.cx, cy: sc.cy, head: head ? sc.p(head) : null };
  }

  /* the Schur cone: the window {2^a 3^b} on a plate, I = {1, 2} eliminated onto P = {3, 6}, then 3 onto the apex 6 */
  const LEAF = { 1: [-0.45, -0.45], 2: [0.45, -0.45], 3: [-0.45, 0.45], 6: [0.45, 0.45] }, ZP = -0.45;
  const LV1 = { 3: [-0.3, 0.22, 0.12], 6: [0.3, 0.22, 0.12] }, APEX = [0.02, 0.18, 0.66];
  function conePositions(lam1, lam2) {
    const leaf = (n) => [LEAF[n][0], LEAF[n][1], ZP + 0.03];
    const p3 = v3.lerp(leaf(3), LV1[3], lam1), p6a = v3.lerp(leaf(6), LV1[6], lam1), p6 = v3.lerp(p6a, APEX, lam2);
    return { leaf, p3, p6, p6a };
  }
  function drawCone(M, at) {
    const s = M.schur, lam1 = M.lam1, lam2 = M.lam2, pos = conePositions(lam1, lam2);
    // the plate: a slab with the lattice of 2^a 3^b
    const pv = [[-0.85, -0.85], [0.85, -0.85], [0.85, 0.85], [-0.85, 0.85]], vertices = [];
    for (const z of [ZP - 0.07, ZP]) for (const [x, y] of pv) vertices.push([x, y, z]);
    sc.poly('plate', { vertices, faces: [[4, 5, 6, 7], [3, 2, 1, 0], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]] }, { color: P.violet, edges: P.lineHot, pick: false });
    for (const v of [-0.45, 0.45]) { sc.line([[v, -0.8, ZP + 0.004], [v, 0.8, ZP + 0.004]], { color: P.ink, width: 1, alpha: 0.3 }); sc.line([[-0.8, v, ZP + 0.004], [0.8, v, ZP + 0.004]], { color: P.ink, width: 1, alpha: 0.3 }); }
    // the kernel on the plate: cyan threads, as thick as G(m, n) = min/max
    const Gf = s.G.map((r) => r.map(qv));
    for (let a = 0; a < 4; a++) for (let b = a + 1; b < 4; b++) {
      const keep = !(WIN[a] <= 2 || WIN[b] <= 2) || lam1 < 1;
      if (!keep) continue;
      const fade = (WIN[a] <= 2 || WIN[b] <= 2) ? 1 - 0.75 * lam1 : 1;
      sc.line([pos.leaf(WIN[a]), pos.leaf(WIN[b])].map((p) => v3.add(p, [0, 0, 0.004])), { color: P.cyan, width: 0.8 + 3.2 * Gf[a][b], alpha: 0.75 * fade });
    }
    // the translucent cone from the plate to the apex
    const ring0 = pv.map(([x, y]) => [x * 0.95, y * 0.95, ZP + 0.01]), ring1 = [[-0.06, 0.12], [0.1, 0.12], [0.1, 0.26], [-0.06, 0.26]].map(([x, y]) => [x, y, APEX[2] + 0.02]);
    sc.surface('cone', [ring0.concat([ring0[0]]), ring1.concat([ring1[0]])], { color: P.violet, alpha: 0.12, pick: false, occlude: false });
    // leaves: I = {1, 2} cyan (fading as they are eliminated), P = {3, 6} violet
    for (const n of WIN) {
      const interior = n <= 2, p = pos.leaf(n);
      sc.bead(p, { key: `leaf${n}`, color: interior ? P.cyan : P.violet, r: 6, alpha: interior ? 1 - 0.7 * lam1 : 1 });
      at(p, `${n}`, interior ? 'raw c-cy backed' : 'raw c-vi backed', 8, [n % 2 ? -1 : 1, n <= 2 ? 1 : -0.2]);
    }
    // links from the eliminated leaves into the pivots (G_PI G_II⁻¹ G_IP flows up)
    if (lam1 > 0) for (const n of [1, 2]) for (const [pv2, key] of [[pos.p3, 3], [pos.p6a, 6]]) sc.line([pos.leaf(n), pv2], { color: P.violet, width: 1.2, alpha: 0.55 * lam1 * (1 - 0.5 * lam2) });
    // the pivots: bead size from the residual √G̃_pp, the interior chord between them
    const S33 = 1 - lam1 * qv(s.corr[0][0]), S66 = 1 - lam1 * qv(s.corr[1][1]), S36 = 0.5 - lam1 * qv(s.corr[0][1]);
    const apexVal = S66 - lam2 * (S36 * S36 / S33);
    sc.tube('chord36', [pos.p3, pos.p6a], { color: P.cyan, width: 1 + 6 * S36, glow: 0.5, alpha: 1 - 0.6 * lam2, pick: false, occlude: false });
    const cur1 = lam1 < 1 || (lam1 >= 1 && lam2 === 0), cur2 = lam2 > 0;
    sc.bead(pos.p3, { key: 'piv3', color: P.violet, r: 4 + 6 * Math.sqrt(S33), alpha: 1 - 0.7 * lam2 });
    if (cur1 && lam1 > 0) sc.ring(pos.p3, { key: 'cur3', color: P.amber, r: 9 + 6 * Math.sqrt(S33) });
    sc.bead(pos.p6, { key: 'piv6', color: P.violet, r: 4 + 6 * Math.sqrt(lam2 > 0 ? apexVal : S66) });
    if ((cur1 && lam1 > 0) || cur2) sc.ring(pos.p6, { key: 'cur6', color: P.amber, r: 9 + 6 * Math.sqrt(lam2 > 0 ? apexVal : S66) });
    if (lam2 > 0) sc.line([pos.p6a, pos.p6], { color: P.violet, width: 1.6, dash: [4, 3] });
    if (lam1 > 0.02) {
      at(pos.p3, `G̃<sub>33</sub> = ${lam1 >= 1 ? qt(s.S[0][0]) : fix(S33, 3)}`, 'raw c-vi backed', 9, [-1, 0.2]);
      at(v3.lerp(pos.p3, pos.p6a, 0.5), `G̃<sub>36</sub> = ${lam1 >= 1 ? qt(s.S[0][1]) : fix(S36, 3)}`, 'raw c-cy backed', 8, [0, -1]);
      if (lam2 === 0) at(pos.p6, `G̃<sub>66</sub> = ${lam1 >= 1 ? qt(s.S[1][1]) : fix(S66, 3)}`, 'raw c-vi backed', 9, [1, 0.2]);
    }
    if (lam2 > 0) at(pos.p6, `${L('顶点', 'apex')} 6 · ${lam2 >= 1 ? qt(s.apex) : fix(apexVal, 3)}`, 'raw c-am backed', 10, [1, -0.6]);
    at([0.85, -0.85, ZP - 0.07], `det G<sub>II</sub> = ${qt(s.detII)}`, 'raw c-cy backed', 5, [1, 0.6]);
  }

  /* ---------- the handle: θ (the entry of the hop) or δ (the landing point of the relay) ---------- */
  const handle = $('stageHandle');
  let dragging = null;
  function placeHandle(q) {
    const show = !!q && !TRV.still && (S.scene === 'mollifier' || S.scene === 'relay');
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
    handle.setAttribute('aria-label', S.scene === 'mollifier' ? L('拖动隧道入口改磨光器长度 θ', 'Drag the entry of the hop to change the mollifier length θ') : L('拖动落点改假想偏移 δ', 'Drag the landing point to change the hypothetical shift δ'));
  }
  /** The parameter whose anchor projects nearest to the pointer. */
  function paramAt(ev) {
    const b = stageEl.getBoundingClientRect(), x = ev.clientX - b.left - stageEl.clientLeft, y = ev.clientY - b.top - stageEl.clientTop;
    const T = terrain(S.scene), yf = Y(T.t0) - 0.012, mol = S.scene === 'mollifier';
    let best = mol ? S.theta : S.delta, bd = Infinity;
    for (let k = 0; k <= 400; k++) {
      const v = mol ? 0.32 + 0.58 * k / 400 : 0.25 * k / 400, sig = mol ? sigEntry(v) : 0.5 + v, q = sc.p([X(sig), yf, zTopFront(T, sig)]), d = Math.hypot(q[0] - x, q[1] - y);
      if (d < bd) { bd = d; best = v; }
    }
    return best;
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
    const v = paramAt(ev);
    if (S.scene === 'mollifier') setTheta(v); else setDelta(v);
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(ev.key)) return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    const k = ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : -1;
    if (S.scene === 'mollifier') setTheta(S.theta + 0.005 * k); else setDelta(S.delta + 0.005 * k);
  });

  /* ---------- HUD, legend, readouts ---------- */
  const SCENE_NAMES = { cutoff: ['硬截断', 'Hard cutoff'], mollifier: ['单级磨光器', 'Single mollifier'], schur: ['分块舒尔补', 'Block Schur'], relay: ['凯莱中继', 'Cayley relay'] };
  const LEGENDS = {
    cutoff: () => [['cy', L('σ &gt; 1 高原与 σ = 1', 'σ &gt; 1 plateau, σ = 1')], ['mg', L('截断和翘起与假零点', 'truncation rise, spurious zero')], ['vi', L('临界带', 'critical strip')], ['am', L('部分和 S<sub>M</sub>', 'partial sum S<sub>M</sub>')]],
    mollifier: () => [['cy', L('已证的单跳', 'proved hop')], ['mg', L('极点与 4/7 墙', 'pole and 4/7 wall')], ['vi', L('剖面 t = 0', 'section t = 0')], ['am', L('读头', 'head')]],
    schur: () => [['cy', L('内部叶 I 与核', 'interior I, kernel')], ['vi', L('枢轴 P 与锥', 'pivots P, cone')], ['am', L('当前消元块', 'current block')]],
    relay: () => (S.delta === 0
      ? [['cy', L('中继路径与 |w| = 1 锁定', 'relay path, |w| = 1 lock')], ['vi', L('枢轴阱', 'pivot wells')], ['am', L('当前阱与读头', 'current well, head')]]
      : [['cy', L('中继路径', 'relay path')], ['mg', L('假想点与失谐爆炸', 'hypothetical point, blow-up')], ['vi', L('枢轴阱与层', 'wells and layers')], ['am', L('当前阱与读头', 'current well, head')]])
  };
  function hudText(M) {
    const sc0 = S.scene, name = L(...SCENE_NAMES[sc0]);
    let big, sub;
    if (sc0 === 'cutoff') {
      big = `${name} ζ<sub>M</sub> · M = ${S.M}`;
      sub = S.M === 19 ? L('t ≈ 1.554×10¹⁴ 处有零点 σ = 1.006988 &gt; 1', 'a zero at σ = 1.006988 &gt; 1, t ≈ 1.554×10¹⁴')
        : M.zeroFree ? L('Re s &gt; 1 内无零点（Platt–Trudgian）', 'no zero in Re s &gt; 1 (Platt–Trudgian)') : L('Re s &gt; 1 内有零点（Platt–Trudgian）', 'zeros in Re s &gt; 1 (Platt–Trudgian)');
    } else if (sc0 === 'mollifier') {
      big = `${name} · θ = ${fix(S.theta, 3)}`;
      sub = M.mol.proved ? L(`κ = ${pct(M.mol.kappa)}（θ ≤ 4/7，已证）`, `κ = ${pct(M.mol.kappa)} (θ ≤ 4/7, proved)`) : L(`公式 κ = ${pct(M.mol.kappa)}（墙外未证）· 4/7 处 ${pct(M.mol47.kappa)}`, `formula κ = ${pct(M.mol.kappa)} (past the wall, unproved) · ${pct(M.mol47.kappa)} at 4/7`);
    } else if (sc0 === 'schur') {
      big = `${name} · det G = ${qt(M.schur.detG)}`;
      sub = M.lam2 > 0 ? L(`消去 3：顶点 6 剩 ${M.lam2 >= 1 ? qt(M.schur.apex) : fix(qv(M.schur.S[1][1]) - M.lam2 * qv(M.schur.S[0][1]) ** 2 / qv(M.schur.S[0][0]), 4)}`, `eliminating 3: the apex 6 keeps ${M.lam2 >= 1 ? qt(M.schur.apex) : fix(qv(M.schur.S[1][1]) - M.lam2 * qv(M.schur.S[0][1]) ** 2 / qv(M.schur.S[0][0]), 4)}`)
        : `G̃<sub>PP</sub> = G<sub>PP</sub> − ${fix(M.lam1, 2)} G<sub>PI</sub>G<sub>II</sub><sup>−1</sup>G<sub>IP</sub> ⪰ 0`;
    } else {
      big = `${name} · |w| = ${fix(M.relay.absW, 6)}`;
      sub = S.delta === 0 ? L(`ℓ = ${fix(M.ell, 1)} · δ = 0：每层 |w| = 1`, `ℓ = ${fix(M.ell, 1)} · δ = 0: |w| = 1 at every layer`)
        : L(`ℓ = ${fix(M.ell, 1)} · |w|<sup>2<sup>ℓ</sup></sup> = ${sciPow10(M.relay.log10)} · 假想 δ = ${fix(S.delta, 3)}`, `ℓ = ${fix(M.ell, 1)} · |w|<sup>2<sup>ℓ</sup></sup> = ${sciPow10(M.relay.log10)} · hypothetical δ = ${fix(S.delta, 3)}`);
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('legend').innerHTML = LEGENDS[sc0]().map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  const NOTES_RO = {
    cutoff: ['ζ<sub>M</sub> 是整函数：没有极点，σ = 1 处只剩 H<sub>M</sub>。M = 19 的零点由 100 位区间鲁歇证书给出；页面用存储的素数相位在双精度下复算，得到的只是 10⁻¹⁶ 量级的舍入残差。', 'ζ<sub>M</sub> is entire: no pole, only H<sub>M</sub> at σ = 1. The M = 19 zero comes with a 100-digit interval Rouché certificate; recomputed here in double precision from the stored prime phases, only a rounding residue of order 10⁻¹⁶ is left.'],
    mollifier: ['公式在 θ &lt; 4/7 时由 Conrey 证明（非对角项靠 Kloosterman 和）；页面只优化三次 P、Q，所以 4/7 处的 40.86% 略低于 Conrey 的 40.88%。', 'The formula is proved by Conrey for θ &lt; 4/7 (the off-diagonal terms rest on Kloosterman sums); the page optimizes cubic P, Q only, so its 40.86% at 4/7 sits just below the 40.88% of Conrey.'],
    schur: ['G 正定当且仅当 G<sub>II</sub> 与 G̃<sub>PP</sub> 都正定；每一步的行列式相乘：det G = 1 · 3/4 · 5/9 · 3/4 = 5/16。', 'G is positive definite exactly when G<sub>II</sub> and G̃<sub>PP</sub> are; the determinants of the steps multiply: det G = 1 · 3/4 · 5/9 · 3/4 = 5/16.'],
    relay: ['滑块 δ 放的点是假想的：γ₁ 这一高度没有离线零点。δ &gt; 0 时，翻倍要 ℓ* 层，一步一格的窗口却要 2<sup>ℓ*</sup> 量级的步数。', 'The slider δ places a hypothetical point: there is no off-line zero at the height γ₁. For δ &gt; 0, doubling takes ℓ* layers, while a one-step window needs steps of order 2<sup>ℓ*</sup>.']
  };
  const FORMULA = {
    cutoff: 'ζ<sub>M</sub>(s) = Σ<sub>n≤M</sub> n<sup>−s</sup> · ψ<sub>M</sub> = 1 + (4/π − 1 − o(1)) ln ln M / ln M',
    mollifier: 'κ ≥ 1 − (1/R) ln c(P, Q, R, θ) · θ &lt; 4/7',
    schur: 'G̃<sub>PP</sub> = G<sub>PP</sub> − G<sub>PI</sub>G<sub>II</sub><sup>−1</sup>G<sub>IP</sub> · det G = det G<sub>II</sub> · det G̃<sub>PP</sub>',
    relay: '|w|² = ((1/2 + δ)² + γ₁²)/((1/2 − δ)² + γ₁²) · ℓ* = ⌈log₂(ln 2/ln|w|)⌉'
  };
  function drawText(M) {
    const s = M.schur, R = M.relay;
    const keys = {
      cutoff: [L('M 与 Re s &gt; 1 的零点', 'M and zeros in Re s &gt; 1'), `M = ${S.M} · ${M.zeroFree ? L('无零点', 'zero-free') : S.M === 19 ? L('有零点（第一个）', 'zeros (the first)') : L('有零点', 'zeros')}`, ` · C/ln M = ${M.nbb == null ? '—' : fix(M.nbb, 5)}`],
      mollifier: [L('临界线零点比例 κ(θ)', 'Proportion κ(θ) on the line'), `${pct(M.mol.kappa)}${M.mol.proved ? '' : L('（未证）', ' (unproved)')}`, ` · θ = ${fix(S.theta, 3)}`],
      schur: [L('det G = det G<sub>II</sub> · det G̃<sub>PP</sub>', 'det G = det G<sub>II</sub> · det G̃<sub>PP</sub>'), `${qt(s.detG)} = ${qt(s.detII)} · ${qt(s.detS)}`, ''],
      relay: [L('|w|<sup>2<sup>ℓ</sup></sup> 在第 ℓ 层', '|w|<sup>2<sup>ℓ</sup></sup> at layer ℓ'), sciPow10(R.log10, 3), ` · ℓ = ${fix(M.ell, 2)}`]
    }[S.scene];
    $('roKeyLabel').innerHTML = keys[0]; $('roKey').innerHTML = keys[1]; $('roKeySub').innerHTML = keys[2];
    $('roTuran').innerHTML = `σ* − 1 = ${fix(SIG_STAR - 1, 6)} · |ζ₁₉(s*)| = ${sci(Math.hypot(...zetaStar(19, SIG_STAR, 0)), 1)} ${L('（双精度）', '(double)')} · |ζ<sub>${S.M}</sub>(s*)| = ${fix(M.star.abs, 4)}`;
    $('roEnvelope').innerHTML = `${M.envelope == null ? '—' : fix(M.envelope, 4)} ${L('（渐近式，略去 o(1)）', '(asymptotic, o(1) dropped)')} · C/ln M = ${M.nbb == null ? '—' : fix(M.nbb, 5)} · C = ${fix(C_NBB, 6)}`;
    $('roMollifier').innerHTML = `κ(${fix(S.theta, 3)}) = ${pct(M.mol.kappa)} · 4/7: ${pct(M.mol47.kappa)} · Levinson ½: ${pct(M.lev.kappa)}`;
    $('roSchur').innerHTML = `G̃<sub>PP</sub> = [${qt(s.S[0][0])}, ${qt(s.S[0][1])}; ${qt(s.S[1][0])}, ${qt(s.S[1][1])}] · LDL ${s.Dg.map(qt).join(', ')} · x = ${fix(S.x16, 3)}: λ<sub>min</sub> = ${fix(M.comp.lambdaMin, 4)}, ${L('秩', 'rank')} ${M.comp.rank}`;
    $('roRelay').innerHTML = S.delta === 0 ? `|w| = ${fix(R.absW, 6)} · ${L('缺陷', 'defect')} −ln|w| = 0 · ℓ* = ∞`
      : `|w| = ${fix(R.absW, 7)} · ℓ* = ${R.star} (${L('逐步', 'linear')} ${R.linear}) · ln A ≥ ${sci(R.robinLow, 2)}`;
    $('roNote').innerHTML = L(...NOTES_RO[S.scene]);
    const pill = { cutoff: ['M', `${S.M}`], mollifier: ['θ', fix(S.theta, 3)], schur: ['det G', qt(s.detG)], relay: ['δ', fix(S.delta, 3)] }[S.scene];
    $('scenePill').innerHTML = `${pill[0]} <strong>${pill[1]}</strong>`;
    $('keyPill').innerHTML = `|w| <strong>${fix(R.absW, 6)}</strong>`;
    $('hint').innerHTML = S.scene === 'mollifier' ? L('拖琥珀圆环改 θ · 拖空白处转视角', 'drag the amber ring to change θ · drag empty space to orbit')
      : S.scene === 'relay' ? L('拖琥珀圆环改假想的 δ · 拖空白处转视角', 'drag the amber ring to change the hypothetical δ · drag empty space to orbit') : L('拖空白处转视角', 'drag empty space to orbit');
    $('formula').innerHTML = FORMULA[S.scene];
  }

  /* ---------- strip plot ---------- */
  const PLOTS = {
    cutoff: ['哪些截断 M 让 Re s &gt; 1 没有零点（Platt–Trudgian）', 'Which cutoffs M keep Re s &gt; 1 free of zeros (Platt–Trudgian)'],
    mollifier: ['单级磨光器的比例 κ(θ)：4/7 以内已证，墙外只是公式', 'Proportion κ(θ) of one mollifier: proved up to 4/7, only a formula past the wall'],
    schur: ['空着的 G(1, 6) = x：det 在哪段 x 上不为负', 'The open entry G(1, 6) = x: where the determinant stays non-negative'],
    relay: ['逐层平方：log₁₀ |w|<sup>2<sup>ℓ</sup></sup> 对层数 ℓ', 'Squared layer by layer: log₁₀ |w|<sup>2<sup>ℓ</sup></sup> against the layer ℓ']
  };
  /** A drawn polyline [[x, y], …] (x ascending) read back at x, linearly between its vertices. */
  const along = (pts) => (x) => {
    let i = 1; while (i < pts.length - 1 && pts[i][0] < x) i++;
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    return y0 + (y1 - y0) * (x1 === x0 ? 0 : clamp((x - x0) / (x1 - x0), 0, 1));
  };
  /** A curve label clear of its own curve: across the whole width the text covers, its glyphs (scripts included) stay
      `gap` pixels off the stroke of f, above it (default) or below it. Text set by kit.plot's g.text, data font. The
      default gap of 8 leaves at least five whole pixel rows clear, whatever the sub-pixel phase and antialiasing of the two edges. */
  function curveLabel(g, f, x, str, color, o = {}) {
    const size = o.size || 10.5, align = o.align || 'right', gap = o.gap == null ? 8 : o.gap, half = (o.stroke || 2.2) / 2, ctx = g.ctx;
    ctx.font = `${size}px ${TRV.fonts.data}`;
    const meas = (s) => (s ? ctx.measureText(s) : { actualBoundingBoxAscent: 0, actualBoundingBoxDescent: 0 });
    const script = (re) => (str.match(re) || []).map((s) => s.slice(2, -1)).join('');
    const sub = script(/_\{[^{}]*\}/g), sup = script(/\^\{[^{}]*\}/g), main = meas(str.replace(/[_^]\{[^{}]*\}/g, ''));
    const drop = Math.max(0, main.actualBoundingBoxDescent, sub ? 0.32 * size + 0.72 * meas(sub).actualBoundingBoxDescent : 0);
    const rise = Math.max(0, main.actualBoundingBoxAscent, sup ? 0.36 * size + 0.72 * meas(sup).actualBoundingBoxAscent : 0);
    const w = meas(str.replace(/[_^]\{([^{}]*)\}/g, '$1')).width, px = g.X(x), x0 = align === 'right' ? px - w : align === 'center' ? px - w / 2 : px;
    let top = Infinity, bottom = -Infinity;
    for (let i = 0; i <= 24; i++) { const y = g.Y(f(g.invX(x0 + w * i / 24))); top = Math.min(top, y); bottom = Math.max(bottom, y); }
    const base = o.below ? bottom + half + gap + rise : top - half - gap - drop;
    g.text(x, g.invY(base), str, color, { align, base: 'alphabetic', size });
    return { top: base - rise, bottom: base + drop, left: x0, right: x0 + w };
  }
  /** The top of a y range from lo that leaves px pixels of the inner height ih above the level top (room for a label). */
  const roomAbove = (ih, lo, top, px) => (top * ih - lo * px) / Math.max(ih / 2, ih - px);
  let PLOT = null;
  function drawPlot(M) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    const pad = [40, 12, 10, 22], sc0 = S.scene, ih = cv.clientHeight - pad[2] - pad[3];
    $('plotTitle').innerHTML = L(...PLOTS[sc0]);
    let meta = '';
    PLOT = { scene: sc0, labels: [] };
    if (sc0 === 'cutoff') {
      const g = kit.plot(cv, { x: [0.5, M_MAX + 0.5], y: [0, 1], pad });
      g.axes({ xTicks: [1, 10, 19, 28, 40], yTicks: [], xLabel: 'M' });
      for (let m = 1; m <= M_MAX; m++) g.rect(m - 0.42, 0.12, m + 0.42, 0.62, zeroFree(m) ? P.cyan : P.magenta, { alpha: m === S.M ? 1 : 0.62 });
      g.rect(S.M - 0.5, 0.06, S.M + 0.5, 0.68, P.amber, { fill: false, stroke: P.amber, width: 2 });
      g.text(19, 0.78, L('19：第一个', '19: the first'), P.magenta, { align: 'center', base: 'bottom', size: 10.5 });
      g.text(6, 0.78, L('无零点', 'zero-free'), P.cyan, { align: 'center', base: 'bottom', size: 10.5 });
      g.text(34, 0.78, L('有零点', 'zeros'), P.magenta, { align: 'center', base: 'bottom', size: 10.5 });
      meta = `M = ${S.M} · ${M.zeroFree ? L('无零点', 'zero-free') : L('有零点', 'zeros')} · C/ln M = ${M.nbb == null ? '—' : fix(M.nbb, 5)}`;
    } else if (sc0 === 'mollifier') {
      const cur = mollifierCurve(), w47 = 4 / 7, ymax = Math.max(0.62, roomAbove(ih, 0.2, 0.556, 25));
      const g = kit.plot(cv, { x: [0.3, 0.92], y: [0.2, ymax], pad });
      g.axes({ xTicks: [0.3, 0.4, 0.5, 4 / 7, 0.7, 0.8, 0.9].map((v) => v), yTicks: [0.2, 0.3, 0.4, 0.5, 0.6], xLabel: 'θ', yFmt: (v) => `${Math.round(v * 100)}%`, xFmt: (v) => (Math.abs(v - w47) < 1e-9 ? '4/7' : fix(v, 1)) });
      const pin = cur.filter((p) => p.th <= w47 + 1e-9).map((p) => [p.th, p.k]).concat([[w47, M.mol47.kappa]]), pout = [[w47, M.mol47.kappa]].concat(cur.filter((p) => p.th > w47).map((p) => [p.th, p.k]));
      g.vline(w47, P.magenta, { alpha: 0.85, width: 1.6 });
      g.line(pin, P.cyan, { width: 2.4 });
      g.line(pout, P.magenta, { width: 2, dash: [5, 4] });
      g.dot(0.5, M.lev.kappa, P.violet, 3.6);
      g.dot(w47, M.mol47.kappa, P.cyan, 3.6);
      g.vline(S.theta, P.amber, { alpha: 0.85 }); g.dot(S.theta, M.mol.kappa, P.amber, 3.8);
      const curve = along(cur.map((p) => [p.th, p.k]));
      PLOT.labels.push({ name: 'proved', box: curveLabel(g, curve, 0.45, L('已证', 'proved'), P.cyan, { stroke: 2.4, below: true }), ink: 'cyan', curveInk: 'cyan', above: false });
      PLOT.labels.push({ name: 'formula', box: curveLabel(g, curve, 0.9, L('仅公式', 'formula only'), P.magenta, { stroke: 2 }), ink: 'magenta', curveInk: 'magenta', above: true });
      PLOT.labels.push({ name: 'levinson', box: curveLabel(g, curve, 0.488, `Levinson ${pct(M.lev.kappa)}`, P.violet, { align: 'right', stroke: 2.4 }), ink: 'violet', curveInk: 'cyan', above: true });
      meta = `κ(${fix(S.theta, 3)}) = ${pct(M.mol.kappa)} · 4/7: ${pct(M.mol47.kappa)} · Levinson: ${pct(M.lev.kappa)}`;
    } else if (sc0 === 'schur') {
      const s = M.schur, a = qv(s.poly[0]), b = qv(s.poly[1]), c = qv(s.poly[2]), det = (x) => a * x * x + b * x + c, r0 = qv(s.roots[0]), r1 = qv(s.roots[1]);
      const ymax = Math.max(0.4, roomAbove(ih, -0.32, 5 / 16, 25));
      const g = kit.plot(cv, { x: [-0.75, 1], y: [-0.32, ymax], pad });
      g.axes({ xTicks: [-0.5, 0, 1 / 6, 0.5, 1], yTicks: [-0.2, 0, 0.2], xLabel: 'x', xFmt: (v) => (Math.abs(v - 1 / 6) < 1e-9 ? '1/6' : fix(v, 1)) });
      g.rect(r0, -0.32, r1, ymax, P.cyan, { alpha: 0.1 });
      g.hline(0, P.dim, { width: 1 });
      const xs = Array.from({ length: 141 }, (_, i) => -0.75 + 1.75 * i / 140);
      g.line(xs.map((x) => [x, det(x)]), P.violet, { width: 2.2 });
      g.dot(1 / 6, 5 / 16, P.cyan, 3.6); g.dot(r0, 0, P.violet, 3.4); g.dot(r1, 0, P.violet, 3.4);
      g.vline(S.x16, P.amber, { alpha: 0.85 }); g.dot(S.x16, det(S.x16), P.amber, 3.8);
      PLOT.labels.push({ name: 'det', box: curveLabel(g, det, 0.95, 'det G(x)', P.violet), ink: 'violet', curveInk: 'violet', above: true });
      g.text(r0 + 0.03, -0.24, `${qt(s.roots[0])}`, P.violet, { align: 'left', size: 10.5 });
      g.text(r1 - 0.03, -0.24, `${qt(s.roots[1])}`, P.violet, { align: 'right', size: 10.5 });
      meta = `x = ${fix(S.x16, 3)} · det = ${fix(det(S.x16), 4)} · ${M.comp.psd ? L('半正定', 'PSD') : L('不是半正定', 'not PSD')} · ${L('最大行列式在', 'max det at')} 1/6`;
    } else {
      const R = M.relay, top = R.lnw > 0 ? Math.min(30, Math.max(1, R.log10At(16))) : 1, ymax = Math.max(top * 1.08, roomAbove(ih, -0.5, top, 25));
      const g = kit.plot(cv, { x: [0, 16], y: [-0.5, ymax], pad });
      const step = ymax > 16 ? 10 : ymax > 6 ? 2 : ymax > 2.5 ? 1 : 0.5;
      g.axes({ xTicks: [0, 4, 8, 12, 16], yTicks: Array.from({ length: Math.floor(ymax / step) + 1 }, (_, i) => i * step), xLabel: 'ℓ' });
      const ls = Array.from({ length: 161 }, (_, i) => i / 10), curve = ls.map((l) => [l, Math.min(R.log10At(l), ymax * 2)]);
      g.hline(Math.log10(2), P.dim, { dash: [4, 4], width: 1 });
      if (R.lnw > 0) g.line(curve, P.magenta, { width: 2.4 });
      g.line(ls.map((l) => [l, 0]), P.cyan, { width: 2.2 });
      g.vline(M.ell, P.amber, { alpha: 0.85 }); g.dot(M.ell, Math.min(R.log10, ymax), P.amber, 3.8);
      if (Number.isFinite(R.star) && R.star <= 16) g.vline(R.star, P.violet, { dash: [3, 3], alpha: 0.8 });
      PLOT.labels.push({ name: 'lock', box: curveLabel(g, () => 0, 0.4, 'δ = 0', P.cyan, { align: 'left', stroke: 2.2 }), ink: 'cyan', curveInk: 'cyan', above: true });
      if (R.lnw > 0) PLOT.labels.push({ name: 'blowup', box: curveLabel(g, along(curve), Math.min(15.8, R.star + 3.6), `δ = ${fix(S.delta, 3)}`, P.magenta, { stroke: 2.4, align: 'right' }), ink: 'magenta', curveInk: 'magenta', above: true });
      meta = S.delta === 0 ? '|w| = 1 · δ = 0' : `ℓ* = ${R.star} · ℓ = 16: ${sciPow10(R.log10At(16))} · ${L('逐步', 'linear')} ${R.linear}`;
    }
    $('plotMeta').innerHTML = meta;
  }

  const paint = kit.painter(() => {
    const M = model();
    hudText(M); TRV.hudFit();
    drawStage(M); drawText(M); drawPlot(M);
  }, [stageEl, $('plot')]);

  /* ---------- the rail ---------- */
  const RATES = { cutoff: 0.05, mollifier: 0.16, schur: 0.14, relay: 0.09 };
  const playBtn = $('playBtn');
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, t: S.tau, rate: RATES.cutoff, step: 1 / 39, loop: true,
    format: (t) => (S.scene === 'cutoff' ? `M ${Mof(t)} <small>/ 40</small>` : S.scene === 'relay' ? `ℓ ${fix(16 * t, 1)} <small>/ 16</small>` : `τ ${fix(t, 2)} <small>/ 1</small>`),
    onChange: (t, C) => {
      S.tau = t;
      if (S.scene === 'cutoff') { const m = Mof(t); if (m !== S.M) { S.M = m; fM.set(m); } }
      playBtn.textContent = C.playing ? '❚❚' : '▷'; playBtn.setAttribute('aria-pressed', String(C.playing)); paint();
    }
  });
  playBtn.addEventListener('click', () => { stopBootPlay(); clock.toggle(); });
  $('rewindBtn').addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });
  $('rew').addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });
  let bootIO = null;
  function bootPlay() {
    if (TRV.still) return;
    if (!TRV.embed || !window.IntersectionObserver) { clock.play(); return; }
    let started = false;
    bootIO = new IntersectionObserver((entries) => {
      const seen = entries[entries.length - 1].intersectionRatio >= 0.5;
      if (seen && !started) { started = true; clock.play(); } else if (!seen && clock.playing) clock.pause();
    }, { threshold: [0, 0.5, 1] });
    bootIO.observe(stageEl);
  }
  function stopBootPlay() { if (bootIO) { bootIO.disconnect(); bootIO = null; } }
  $('play').addEventListener('click', stopBootPlay, true);
  $('now').addEventListener('input', stopBootPlay, true);
  document.addEventListener('keydown', (ev) => { if ([' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) stopBootPlay(); }, true);

  /* ---------- controls ---------- */
  let booting = true;
  function leave() { stopBootPlay(); cards.mark(null); clock.pause(); }
  function setScene(v, quiet) {
    S.scene = SCENES.includes(v) ? v : 'cutoff';
    sceneChips.set(S.scene, true); lens.set(REGIME[S.scene], true);
    clock.rate = RATES[S.scene]; clock.step = S.scene === 'cutoff' ? 1 / 39 : S.scene === 'relay' ? 1 / 16 : 0.05;
    if (S.scene === 'cutoff') clock.set(tauOfM(S.M), true);
    clock.set(clock.t, true);
    if (!quiet) paint();
  }
  function setM(v, quiet) { S.M = clamp(Math.round(v), 1, M_MAX); fM.set(S.M); if (S.scene === 'cutoff') clock.set(tauOfM(S.M), true), (S.tau = clock.t); if (!quiet) paint(); }
  function setTheta(v, quiet) { S.theta = clamp(Math.round(v * 200) / 200, 0.32, 0.9); fTheta.set(S.theta); if (!quiet) paint(); }
  function setDelta(v, quiet) { S.delta = clamp(Math.round(v * 200) / 200, 0, 0.25); fDelta.set(S.delta); if (!quiet) paint(); }
  function setX(v, quiet) { S.x16 = clamp(v, -0.75, 1); fX.set(S.x16); if (!quiet) paint(); }
  const fM = kit.field($('cutM'), { fmt: (v) => `M = ${Math.round(v)}`, onInput: (v) => { leave(); setM(v); } });
  const fTheta = kit.field($('thetaMol'), { fmt: (v) => `θ = ${fix(v, 3)}`, onInput: (v) => { leave(); setTheta(v); } });
  const fX = kit.field($('gap16'), { fmt: (v) => `x = ${fix(v, 3)}`, onInput: (v) => { leave(); setX(v); } });
  const fDelta = kit.field($('deltaOff'), { fmt: (v) => `δ = ${fix(v, 3)}`, onInput: (v) => { leave(); setDelta(v); } });
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v, true); sc.view(VIEWS[S.scene], TRV.still ? 0 : 600); paint(); });
  const lens = kit.chips($('regimeLens'), 'regime', (v) => {
    leave();
    const target = v === '1' ? 'cutoff' : v === '2' ? 'mollifier' : (S.scene === 'schur' || S.scene === 'relay' ? S.scene : 'schur');
    setScene(target, true); sc.view(VIEWS[S.scene], TRV.still ? 0 : 600); paint();
  });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'turan-zeno-hard-cutoff': { scene: 'cutoff', M: 19, theta: 0.7, x16: 1 / 6, delta: 0.05, play: true, still: 18 / 39 },
    'mollifier-four-sevenths-wall': { scene: 'mollifier', M: 19, theta: 0.7, x16: 1 / 6, delta: 0.05, play: true, still: 1 },
    'block-schur-pivot-mera': { scene: 'schur', M: 19, theta: 0.7, x16: 1 / 6, delta: 0.05, play: true, still: 0.5 },
    'fabry-perot-rogue-explosion': { scene: 'relay', M: 19, theta: 0.7, x16: 1 / 6, delta: 0.05, play: true, still: 1 }
  };
  const NOTES = {
    'turan-zeno-hard-cutoff': ['时间轴把闸门 M 从 1 推到 40。M = 19：截断和 ζ₁₉ 把 s = 1 的山峰削平成 H₁₉ = 3.548，左边翘起品红的墙；后面的放大窗在 t ≈ 1.554×10¹⁴，坑落在青色虚线 σ = 1 的右边，σ = 1.006988；屏上 19 个青色向量首尾相接回到原点。下面的条带：只有 M ≤ 18 与 20、21、28 保住 Re s &gt; 1。', 'The rail pushes the gate M from 1 to 40. At M = 19 the truncation ζ₁₉ planes the peak at s = 1 down to H₁₉ = 3.548 and raises a magenta wall on the left; the magnifier at the back sits at t ≈ 1.554×10¹⁴, with its pit to the right of the dashed cyan line σ = 1, at σ = 1.006988; on the screen the 19 cyan vectors close back at the origin. The strip below: only M ≤ 18 and 20, 21, 28 keep Re s &gt; 1.'],
    'mollifier-four-sevenths-wall': ['正面是实轴 t = 0 的剖面，品红山峰是 s = 1 的极点。θ = 0.700：读头从高原 σ = 1.62 竖直潜下（90°），在山峰下面横穿，回到 σ = 1/2。4/7 处的品红墙以外，隧道变成抖动的品红虚线：公式给 47.52%，但只有 4/7 以内的 40.86% 是已证的。', 'The front is the section t = 0 of the real axis, and the magenta peak is the pole at s = 1. At θ = 0.700 the head dives straight down (90°) from the plateau at σ = 1.62, runs beneath the peak and comes up at σ = 1/2. Past the magenta wall at 4/7 the hop turns into a jittering magenta dash: the formula gives 47.52%, but only the 40.86% up to 4/7 is proved.'],
    'block-schur-pivot-mera': ['紫色底板上是窗口 {1, 2, 3, 6} = 2<sup>a</sup>3<sup>b</sup>，青线粗细是核 min/max。时间轴前半把青色的内部叶 1、2 消去，紫色枢轴 3、6 升到第一层：G̃<sub>PP</sub> = [5/9, 5/18; 5/18, 8/9]，两颗珠子缩成残差的大小，它们之间的青色内割弦是 5/18；后半再消去 3，顶点 6 剩 3/4。det G = 3/4 · 5/12 = 5/16。', 'The violet plate carries the window {1, 2, 3, 6} = 2<sup>a</sup>3<sup>b</sup>, with cyan threads as thick as the kernel min/max. The first half of the rail eliminates the cyan interior leaves 1 and 2 and lifts the violet pivots 3 and 6 to the first level: G̃<sub>PP</sub> = [5/9, 5/18; 5/18, 8/9], the beads shrink to their residuals and the cyan interior chord between them is 5/18; the second half eliminates 3 and the apex 6 keeps 3/4. det G = 3/4 · 5/12 = 5/16.'],
    'fabry-perot-rogue-explosion': ['正面是 t = γ₁ 的剖面，白环是 σ = 1/2 上真正的零点。读头沿青色路径穿过四口紫色枢轴阱（当前一口是琥珀色），落在假想点 1/2 + 0.05 + iγ₁（品红环）。每层把 |w| = 1.000250 平方一次：ℓ = 16 时品红柱升到 1.30×10⁷。拖到 δ = 0，柱子消失，青环锁在 |w| = 1。', 'The front is the section t = γ₁, and the white ring is the true zero on σ = 1/2. The head follows the cyan path through four violet pivot wells (the current one amber) and lands at the hypothetical point 1/2 + 0.05 + iγ₁ (magenta ring). Each layer squares |w| = 1.000250: at ℓ = 16 the magenta column reaches 1.30×10⁷. Drag to δ = 0 and the column is gone, the cyan ring locked at |w| = 1.']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'turan-zeno-hard-cutoff': ['M = 19：放大窗的坑落在 σ = 1 右边，σ = 1.006988；19 个向量首尾闭合。', 'M = 19: the pit of the magnifier lies right of σ = 1, at 1.006988; 19 vectors close.'],
    'mollifier-four-sevenths-wall': ['单跳从高原潜到极点下面；4/7 墙外是品红虚线，只有 40.86% 已证。', 'One hop dives below the pole; past the 4/7 wall it is a magenta dash, only 40.86% proved.'],
    'block-schur-pivot-mera': ['消去青色的 1、2，紫色枢轴 3、6 升起：残差 5/9、8/9，内割弦 5/18。', 'Eliminating cyan 1 and 2 lifts violet pivots 3 and 6: residuals 5/9, 8/9, chord 5/18.'],
    'fabry-perot-rogue-explosion': ['假想 δ = 0.05：每层平方一次，ℓ = 16 时品红柱升到 1.30×10⁷。', 'Hypothetical δ = 0.05: squared once a layer, the magenta column reaches 1.30×10⁷ at ℓ = 16.']
  };
  function applyPreset(id) {
    const p = PRESETS[id];
    if (!booting) stopBootPlay();
    clock.pause();
    S.M = p.M; fM.set(p.M); setTheta(p.theta, true); setDelta(p.delta, true); setX(p.x16, true);
    setScene(p.scene, true);
    sc.view(VIEWS[p.scene], booting || TRV.still ? 0 : 600);
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still);
    else clock.set(0);
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) bootPlay(); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换方案或场景，拉 M、θ、x 与 δ，拖琥珀圆环。随时可以再选一张卡。', 'Free play: switch the way or the scene, pull M, θ, x and δ, drag the amber ring. Pick a card again at any time.']
  });
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  const fr = (a) => ({ n: a[0], d: a[1], text: qt(a) });
  window.ARITH_PIVOT_DEBUG = Object.freeze({
    get state() {
      const M = model(), s = M.schur, R = M.relay;
      return JSON.parse(JSON.stringify({
        preset: cards.current, t: clock.t, tau: S.tau, playing: clock.playing, scene: S.scene, regime: REGIME[S.scene],
        M: S.M, theta: S.theta, x16: S.x16, delta: S.delta, ell: M.ell, lam1: M.lam1, lam2: M.lam2,
        cutoff: { M: S.M, zeroFree: M.zeroFree, harmonic: M.harmonic, star: M.star, sigmaStar: SIG_STAR, tStar: T_STAR_TEXT, abs19: Math.hypot(...zetaStar(19, SIG_STAR, 0)), absCentre100: ABS_CENTRE_100,
          phases: PHASE, envelope: M.envelope, nbb: M.nbb, C: C_NBB, montgomery: MONT, phasors: phasors(S.M), tileMin: tileMin(S.M) },
        mollifier: { theta: S.theta, kappa: M.mol.kappa, params: M.mol.params, proved: M.mol.proved, kappa47: M.mol47.kappa, params47: M.mol47.params, levinson: M.lev, wallSigma: SIG_W, entrySigma: sigEntry(S.theta) },
        schur: { G: s.G.map((r) => r.map(fr)), S: s.S.map((r) => r.map(fr)), apex: fr(s.apex), detG: fr(s.detG), detII: fr(s.detII), detS: fr(s.detS), D: s.Dg.map(fr), L: s.Lm.map((r) => r.map(fr)),
          O: s.O, realErr: s.realErr, resI: fr(s.resI), resIP: fr(s.resIP), poly: s.poly.map(fr), vertex: fr(s.vertex), roots: s.roots.map((r) => (Array.isArray(r) ? fr(r) : { value: r })), maxdet: fr(s.maxdet),
          completion: M.comp },
        relay: { delta: R.delta, gamma: R.gamma, absW: R.absW, lnw: R.lnw, defect: R.defect, ratio: R.ratio, log10: R.log10, star: Number.isFinite(R.star) ? R.star : null, linear: Number.isFinite(R.linear) ? R.linear : null,
          robinLow: Number.isFinite(R.robinLow) ? R.robinLow : null, robinHigh: Number.isFinite(R.robinHigh) ? R.robinHigh : null, wRe: R.wRe, wIm: R.wIm, layers: Array.from({ length: 17 }, (_, l) => R.log10At(l)) },
        residues: residues(),
        camera: Object.assign({}, sc.cam), handle: FRAME ? FRAME.handle : null, head: FRAME ? FRAME.head : null, labels: PLACED, stageFrame: FRAME, plot: PLOT
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock). */
    setState(o) {
      leave();
      if (o.scene != null) setScene(o.scene, true);
      if (o.M != null) setM(o.M, true);
      if (o.theta != null) setTheta(o.theta, true);
      if (o.x16 != null) setX(o.x16, true);
      if (o.delta != null) setDelta(o.delta, true);
      if (o.tau != null) clock.set(clamp(o.tau, 0, 1));
      paint();
    },
    /** Pure computations (no page change), for the suite's sweeps. */
    zeta(sig, t) { return zeta(sig, t); },
    zetaM(M, sig, t) { return zetaM(M, sig, t); },
    zetaStar(M, sig, dt) { return zetaStar(M, sig, dt); },
    terrainHeight(scene, M, i, j) { const f = scene === 'cutoff' ? cutLn(M) : zetaLn(); return f[j * NS + i]; },
    relay(delta, ell) { const R = relayOf(delta, ell); return { absW: R.absW, lnw: R.lnw, log10: R.log10, star: Number.isFinite(R.star) ? R.star : null, linear: Number.isFinite(R.linear) ? R.linear : null }; },
    kappaAt(x, th) { return kappaAt(x, th); },
    mollifier(th) { const m = mollifier(th); return { kappa: m.kappa, params: m.params, proved: m.proved }; },
    /** Viewport coordinates of the handle, or null when hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates of the anchor of a parameter value (θ in the mollifier scene, δ in the relay). */
    anchorPoint(v) { const b = stageEl.getBoundingClientRect(), T = terrain(S.scene), sig = S.scene === 'mollifier' ? sigEntry(v) : 0.5 + v, q = sc.p([X(sig), Y(T.t0) - 0.012, zTopFront(T, sig)]); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] }; },
    /** Viewport coordinates of a world point under the current camera. */
    project(v) { const b = stageEl.getBoundingClientRect(), q = sc.p(v); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] }; }
  });
  window.TRV_THUMB = () => { cards.pick('fabry-perot-rogue-explosion'); clock.pause(); clock.set(1); sc.view(VIEWS.relay, 0); paint.now(); };
  cards.pick(cards.initial('turan-zeno-hard-cutoff'));
  booting = false;
  paint();
})();
