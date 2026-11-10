/* ORTHO//CAUSAL · 无时间因果账本与格拉姆窗口
   Timeless causal ledger and the Gram window, laid out on the golden-carry frame.

   Gram window    three unit states, B at the pole, A and C at polar angles θ₁, θ₂ with dihedral angle φ:
                  c_AC = c₁c₂ + s₁s₂ cos φ ∈ [cos(θ₁ + θ₂), cos(θ₁ − θ₂)] and det G = 1 − Σc² + 2c_AB c_BC c_AC = s₁²s₂² sin²φ ≥ 0,
                  with the boundary det G = 0 at φ ∈ {0, π}; a c_AC placed directly outside the window gives det G < 0.
   ledger         (gram, book) order k adds (−1)ᵏθ²ᵏ/(2k)! to the three cosines c_AB, c_BC and c_AC = cos θ₃ at once, and
                  det G⁽ᵏ⁾ is the Gram determinant of the truncated cosines; K is the first order whose Lagrange bound
                  |θ|^(2K+2)/(2K+2)! is below 1e−16 for all three angles. (field) amplitude amplification t = 0 … t*:
                  Qᵗ U = sin((2t + 1)θ) W + cos((2t + 1)θ) B with sin θ = 2^(−n/2), also simulated entry by entry.
   crystal book   a finite Page–Wootters model: a clock with N = 12 pages, a qubit with H_S = diag(0, 1) and ψ₀ = |+⟩,
                  Ψ = (1/√N) Σⱼ |τⱼ⟩ ⊗ U(τⱼ)ψ₀ with (H_C ⊗ I + I ⊗ H_S)Ψ = 0; slices, pinching and page-conditional states.
   P field        the log-barrier gradient field on the two-dimensional Klee–Minty polygon and one gradient flow with
                  V(x₀) − V(x_T) = ∫‖ẋ‖² dt.
   no signalling  cos(θ₁/2)|00⟩ + sin(θ₁/2)|11⟩; side C measures along m(θ₂, φ) and nobody reads the result: B's reduced
                  state does not change.
   Colours: cyan cosines and det G > 0, magenta det G < 0, sigma the boundary det G = 0, violet the crystal pages,
   amber only the current step or choice. Read-only probe for tests: window.TCC_DEBUG. Thumbnail hook: window.TRV_THUMB. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const L = TRV.L, esc = TRV.esc;
  const TWO_PI = 2 * Math.PI, HALF_PI = Math.PI / 2, DEG = Math.PI / 180;
  const MINUS = '−';
  const TOL = 1e-12;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const VIEWS = ['gram', 'book', 'field'];
  const NS = [2, 4, 6, 8, 10, 12], T2S = [30, 45, 60, 90];
  const sgnOf = (x) => (Math.abs(x) <= TOL ? 0 : x > 0 ? 1 : -1);

  /* =============================== colour roles (tokens only) =============================== */
  const ROLE = Object.freeze({
    now: 'amber', cos: 'cyan', wedge: 'magenta', crystal: 'violet', bound: 'sigma', ink: 'ink', dim: 'dim', faint: 'faint',
    edge: 'panelEdge', hot: 'lineHot', stage: 'stage'
  });
  const roleUse = new Map();
  function col(role, a) {
    const name = ROLE[role];
    if (!name) throw new Error('unknown colour role ' + role);
    const hex = TRV.palette[name];
    if (!roleUse.has(role)) roleUse.set(role, new Set());
    roleUse.get(role).add(String(hex).toLowerCase());
    return a === undefined || a >= 1 ? hex : TRV.alpha(hex, Math.max(0, a));
  }
  const rgb255 = (name) => TRV.rgb[name].map((x) => Math.round(x * 255));

  /* =============================== complex linear algebra =============================== */
  const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const csub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cconj = (a) => [a[0], -a[1]];
  const cscale = (a, s) => [a[0] * s, a[1] * s];
  const cexpi = (t) => [Math.cos(t), Math.sin(t)];
  const cabs2 = (a) => a[0] * a[0] + a[1] * a[1];
  /** ⟨u, v⟩ = Σ conj(uᵢ) vᵢ. */
  function vdot(u, v) { let re = 0, im = 0; for (let i = 0; i < u.length; i++) { re += u[i][0] * v[i][0] + u[i][1] * v[i][1]; im += u[i][0] * v[i][1] - u[i][1] * v[i][0]; } return [re, im]; }
  function vnorm2(u) { let s = 0; for (const z of u) s += cabs2(z); return s; }
  function vmaxdiff(u, v) { let m = 0; for (let i = 0; i < u.length; i++) m = Math.max(m, Math.hypot(u[i][0] - v[i][0], u[i][1] - v[i][1])); return m; }
  const zeros = (n) => Array.from({ length: n }, () => [0, 0]);
  const zmat = (n) => Array.from({ length: n }, () => zeros(n));
  const outer = (u, v) => u.map((a) => v.map((b) => cmul(a, cconj(b))));
  function matmul(A, B) {
    const n = A.length, m = B[0].length, p = B.length, C = Array.from({ length: n }, () => zeros(m));
    for (let i = 0; i < n; i++) for (let k = 0; k < p; k++) {
      const a = A[i][k]; if (a[0] === 0 && a[1] === 0) continue;
      for (let j = 0; j < m; j++) { const b = B[k][j]; C[i][j] = [C[i][j][0] + a[0] * b[0] - a[1] * b[1], C[i][j][1] + a[0] * b[1] + a[1] * b[0]]; }
    }
    return C;
  }
  function mtrace(A) { let z = [0, 0]; for (let i = 0; i < A.length; i++) z = cadd(z, A[i][i]); return z; }
  function mfrob(A, B) { let s = 0; for (let i = 0; i < A.length; i++) for (let j = 0; j < A[i].length; j++) { const d = B ? csub(A[i][j], B[i][j]) : A[i][j]; s += cabs2(d); } return Math.sqrt(s); }
  const madd = (A, B) => A.map((r, i) => r.map((z, j) => cadd(z, B[i][j])));
  const mscale = (A, s) => A.map((r) => r.map((z) => cscale(z, s)));
  const eye = (n) => Array.from({ length: n }, (_, a) => Array.from({ length: n }, (__, b) => (a === b ? [1, 0] : [0, 0])));
  function deepFreeze(x) { if (x && typeof x === 'object') { Object.values(x).forEach(deepFreeze); Object.freeze(x); } return x; }

  /* =============================== the crystal book (finite Page–Wootters model) =============================== */
  const N = 12;
  const PAGES = Object.freeze(Array.from({ length: N }, (_, j) => TWO_PI * j / N));
  const PAGE = TWO_PI / N;
  const E_SYS = Object.freeze([0, 1]);
  const K_CLOCK = Object.freeze(Array.from({ length: N }, (_, k) => k));
  const R2 = Math.SQRT1_2;
  const PSI0 = deepFreeze([[R2, 0], [R2, 0]]);
  const S_BASIS = deepFreeze([[[R2, 0], [R2, 0]], [[R2, 0], [-R2, 0]]]);
  /** θ* = cos θ* by Newton's method on cos θ − θ. */
  function dottie() { let t = 0.74; for (let i = 0; i < 60; i++) t += (Math.cos(t) - t) / (1 + Math.sin(t)); return t; }
  const THETA_STAR = dottie();
  const evolve = (psi, t) => psi.map((a, m) => cmul(a, cexpi(-E_SYS[m] * t)));
  const CRYSTAL = deepFreeze(PAGES.map((t) => evolve(PSI0, t).map((a) => cscale(a, 1 / Math.sqrt(N)))));
  const CHI = deepFreeze(K_CLOCK.map((k) => PAGES.map((t) => cscale(cexpi(-k * t), 1 / Math.sqrt(N)))));
  const HC = deepFreeze(PAGES.map((_, l) => PAGES.map((__, m) => {
    let z = [0, 0];
    K_CLOCK.forEach((k, i) => { z = cadd(z, cscale(cmul(CHI[i][l], cconj(CHI[i][m])), -k)); });
    return z;
  })));
  function applyH(Psi) {
    return Psi.map((row, l) => row.map((a, m) => {
      let z = cscale(a, E_SYS[m]);
      for (let q = 0; q < N; q++) z = cadd(z, cmul(HC[l][q], Psi[q][m]));
      return z;
    }));
  }
  const crystalNorm2 = (Psi) => Psi.reduce((s, row) => s + vnorm2(row), 0);
  const H_NORM = Math.sqrt(crystalNorm2(applyH(CRYSTAL)));
  function clockState(t) {
    return PAGES.map((tl) => { let z = [0, 0]; for (const k of K_CLOCK) z = cadd(z, cexpi(k * (t - tl))); return cscale(z, 1 / N); });
  }
  /** ψ(τ) = √N⟨c(τ)|Ψ⟩: the one-dimensional attention slice of the static crystal. */
  function slice(Psi, t) {
    const c = clockState(t);
    return [0, 1].map((m) => { let z = [0, 0]; for (let l = 0; l < N; l++) z = cadd(z, cmul(cconj(c[l]), Psi[l][m])); return cscale(z, Math.sqrt(N)); });
  }
  function readLTR(Psi) { const C = []; for (let i = 0; i < N; i++) C.push(S_BASIS.map((s) => cabs2(vdot(s, Psi[i])))); return C; }
  const BOUNDARY_PAGE = Math.round(THETA_STAR / PAGE) % N;
  function readRTL(Psi) {
    const C = new Array(N);
    for (let n = 0; n < N; n++) { const i = ((BOUNDARY_PAGE - n) % N + N) % N; C[i] = S_BASIS.map((s) => cabs2(vdot(s, Psi[i]))); }
    return C;
  }
  function crystalFromBoundary(Psi) {
    const psiStar = slice(Psi, THETA_STAR);
    return PAGES.map((t) => evolve(psiStar, t - THETA_STAR).map((a) => cscale(a, 1 / Math.sqrt(N))));
  }
  const matDiff = (A, B) => { let m = 0; for (let i = 0; i < A.length; i++) for (let j = 0; j < A[i].length; j++) m = Math.max(m, Math.abs(A[i][j] - B[i][j])); return m; };
  const crystalDiff = (A, B) => { let m = 0; for (let i = 0; i < A.length; i++) m = Math.max(m, vmaxdiff(A[i], B[i])); return m; };
  const READ_LTR = readLTR(CRYSTAL), READ_RTL = readRTL(CRYSTAL);
  const READ_GAP = matDiff(READ_LTR, READ_RTL), BOUNDARY_GAP = crystalDiff(CRYSTAL, crystalFromBoundary(CRYSTAL));

  const rhoOf = (Psi) => { const v = Psi.flat(); return outer(v, v); };
  const pinchClock = (rho) => rho.map((row, a) => row.map((z, b) => (Math.floor(a / 2) === Math.floor(b / 2) ? z : [0, 0])));
  function blockNorm(rho, j, l) { let s = 0; for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) s += cabs2(rho[2 * j + a][2 * l + b]); return Math.sqrt(s); }
  const pageProj = (j) => Array.from({ length: 2 * N }, (_, a) => Array.from({ length: 2 * N }, (__, b) => (a === b && Math.floor(a / 2) === j ? [1, 0] : [0, 0])));
  let pinchCache = null;
  /** Pinching by clock pages: every inter-page block of ρ = |Ψ⟩⟨Ψ| has norm 1/N, so unreadState(P, ρ) ≠ ρ. */
  function pinchStats() {
    if (pinchCache) return pinchCache;
    const rho = rhoOf(CRYSTAL), P = pinchClock(rho);
    let maxBlock = 0, minBlock = Infinity, offAfter = 0;
    for (let j = 0; j < N; j++) for (let l = 0; l < N; l++) {
      if (j === l) continue;
      const b = blockNorm(rho, j, l); maxBlock = Math.max(maxBlock, b); minBlock = Math.min(minBlock, b);
      offAfter = Math.max(offAfter, blockNorm(P, j, l));
    }
    let recErr = 0; const sum = zmat(2 * N);
    for (let j = 0; j < N; j++) {
      const Pj = pageProj(j);
      recErr = Math.max(recErr, mfrob(matmul(Pj, Pj), Pj));
      for (let a = 0; a < 2 * N; a++) for (let b = 0; b < 2 * N; b++) sum[a][b] = cadd(sum[a][b], Pj[a][b]);
      if (j + 1 < N) recErr = Math.max(recErr, mfrob(matmul(Pj, pageProj(j + 1))));
    }
    recErr = Math.max(recErr, mfrob(sum, eye(2 * N)));
    pinchCache = deepFreeze({ maxBlock, minBlock, expectedBlock: 1 / N, frobDiff: mfrob(rho, P), expectedDiff: Math.sqrt(1 - 1 / N), offAfter, fixed: mfrob(rho, P) < 1e-12, recordAxioms: recErr });
    return pinchCache;
  }
  let pageCondCache = null;
  /** Conditioning on each clock page Pⱼ: weight 1/N, conditional state |τⱼ⟩⟨τⱼ| ⊗ |ψ(τⱼ)⟩⟨ψ(τⱼ)| (Hermitian, PSD, trace 1). */
  function pageConditional() {
    if (pageCondCache) return pageCondCache;
    const rho = rhoOf(CRYSTAL), dim = 2 * N;
    let weightErr = 0, traceErr = 0, hermErr = 0, minQuad = Infinity, formErr = 0;
    const rng = TRV.mulberry32(77);
    for (let j = 0; j < N; j++) {
      const Pj = pageProj(j), PrP = matmul(matmul(Pj, rho), Pj), w = mtrace(matmul(rho, Pj))[0];
      weightErr = Math.max(weightErr, Math.abs(w - 1 / N));
      const cond = mscale(PrP, 1 / w);
      traceErr = Math.max(traceErr, Math.abs(mtrace(cond)[0] - 1), Math.abs(mtrace(cond)[1]));
      for (let a = 0; a < dim; a++) for (let b = 0; b < dim; b++) hermErr = Math.max(hermErr, Math.hypot(cond[a][b][0] - cond[b][a][0], cond[a][b][1] + cond[b][a][1]));
      for (let r = 0; r < 6; r++) {
        const x = Array.from({ length: dim }, () => [rng() - 0.5, rng() - 0.5]);
        const cx = cond.map((row) => row.reduce((s, z, b) => cadd(s, cmul(z, x[b])), [0, 0]));
        minQuad = Math.min(minQuad, vdot(x, cx)[0]);
      }
      const pj = evolve(PSI0, PAGES[j]), want = zeros(dim); want[2 * j] = pj[0]; want[2 * j + 1] = pj[1];
      formErr = Math.max(formErr, mfrob(cond, outer(want, want)));
    }
    pageCondCache = deepFreeze({ weightErr, traceErr, hermErr, minQuad, formErr });
    return pageCondCache;
  }
  let recordCache = null;
  /** The 24 rank-one records |τⱼ, s±⟩: ‖φ*Ψ‖² = Tr(ρP), weights sum to 1, unreadState = Σ weight · conditional state. */
  function recordStats() {
    if (recordCache) return recordCache;
    const dim = 2 * N, v = CRYSTAL.flat(), rho = rhoOf(CRYSTAL), phis = [];
    for (let j = 0; j < N; j++) for (let s = 0; s < 2; s++) { const f = zeros(dim); f[2 * j] = S_BASIS[s][0]; f[2 * j + 1] = S_BASIS[s][1]; phis.push(f); }
    let unread = zmat(dim), mix = zmat(dim), traceGap = 0, sumW = 0;
    for (const f of phis) {
      const P = outer(f, f), w = cabs2(vdot(f, v)), tr = mtrace(matmul(rho, P));
      traceGap = Math.max(traceGap, Math.hypot(tr[0] - w, tr[1]));
      sumW += w;
      const PrP = matmul(matmul(P, rho), P);
      unread = madd(unread, PrP);
      if (w > 1e-12) mix = madd(mix, mscale(mscale(PrP, 1 / w), w));
    }
    recordCache = deepFreeze({ traceGap, sumW, unreadVsMix: mfrob(unread, mix), count: phis.length });
    return recordCache;
  }

  /* =============================== order-independence: the de-ordered Taylor series =============================== */
  const FACT = Object.freeze((() => { const f = [1]; for (let n = 1; n <= 64; n++) f.push(f[n - 1] * n); return f; })());
  /** n! as a double (exact through 18!). */
  const factorial = (n) => FACT[clamp(Math.round(n), 0, 64)];
  /** cos θ = Σₖ (−1)ᵏθ²ᵏ/(2k)! to order K: terms, partial sums and the Lagrange bound |θ|^(2K+2)/(2K+2)!. */
  function cosTaylorSeries(theta, K) {
    const terms = [], partial = []; let s = 0;
    for (let k = 0; k <= K; k++) { const t = (k % 2 ? -1 : 1) * Math.pow(theta, 2 * k) / FACT[2 * k]; terms.push(t); s += t; partial.push(s); }
    const exact = Math.cos(theta);
    return { K, terms, partial, sum: s, exact, rem: Math.abs(exact - s), bound: Math.pow(Math.abs(theta), 2 * K + 2) / FACT[2 * K + 2], orders: FACT[2 * K] };
  }
  /** sin θ = Σₖ (−1)ᵏθ²ᵏ⁺¹/(2k + 1)! to order K. */
  function sinTaylorSeries(theta, K) {
    let s = 0; const partial = [];
    for (let k = 0; k <= K; k++) { s += (k % 2 ? -1 : 1) * Math.pow(theta, 2 * k + 1) / FACT[2 * k + 1]; partial.push(s); }
    return { K, partial, sum: s, exact: Math.sin(theta), rem: Math.abs(Math.sin(theta) - s), bound: Math.pow(Math.abs(theta), 2 * K + 3) / FACT[2 * K + 3] };
  }
  /** The first order K ≥ 1 whose Lagrange bound is below 1e−16 for every angle given. */
  function convergedOrder(thetas) {
    let k = 1;
    while (k < 30 && thetas.some((t) => Math.pow(Math.abs(t), 2 * k + 2) / FACT[2 * k + 2] >= 1e-16)) k++;
    return k;
  }
  /** Heap's algorithm: the (2k)! orderings of 2k steps, counted and checked distinct. */
  function countPermutations(n) {
    const a = Array.from({ length: n }, (_, i) => i), c = new Array(n).fill(0), seen = new Set([a.join(',')]);
    let count = 1, i = 0;
    while (i < n) {
      if (c[i] < i) { const j = i % 2 === 0 ? 0 : c[i]; [a[j], a[i]] = [a[i], a[j]]; seen.add(a.join(',')); count++; c[i]++; i = 0; }
      else { c[i] = 0; i++; }
    }
    return { n, count, distinct: seen.size };
  }
  /** cos²θ + sin²θ = 1 checked on the de-ordered series of each angle at order K. */
  function orderCheck(thetas, K) {
    const dev = thetas.map((t) => { const c = cosTaylorSeries(t, K).sum, s = sinTaylorSeries(t, K).sum; return Math.abs(c * c + s * s - 1); });
    return { K, orders: FACT[2 * K], dev, maxDev: Math.max(...dev) };
  }

  /* =============================== the Gram window =============================== */
  /** det G for three unit vectors with pairwise cosines a = c_AB, b = c_BC, c = c_AC. */
  const gramDeterminant = (a, b, c) => 1 - a * a - b * b - c * c + 2 * a * b * c;
  /** c_AC with B at the pole, A at polar angle θ₁ (azimuth 0) and C at polar angle θ₂, azimuth φ. */
  const cACFromAzimuth = (t1, t2, phi) => Math.cos(t1) * Math.cos(t2) + Math.sin(t1) * Math.sin(t2) * Math.cos(phi);
  /** The window of compatible c_AC given θ₁, θ₂ ∈ [0, π]: [cos(θ₁ + θ₂), cos(θ₁ − θ₂)] = c₁c₂ ∓ s₁s₂. */
  function causalWindow(t1, t2) {
    const c1 = Math.cos(t1), c2 = Math.cos(t2), s1 = Math.sin(t1), s2 = Math.sin(t2);
    return { lo: Math.cos(t1 + t2), hi: Math.cos(t1 - t2), center: c1 * c2, slack: s1 * s2, c1, c2, s1, s2 };
  }
  /** φ ∈ [0, π] with c_AC(φ) = c; NaN when any φ works (a degenerate window of one point); null when no real φ exists. */
  function azimuthFromCAC(t1, t2, c) {
    const w = causalWindow(t1, t2);
    if (w.slack < 1e-12) return Math.abs(c - w.center) <= 1e-9 ? NaN : null;
    const x = (c - w.center) / w.slack;
    if (x > 1 + 1e-12 || x < -1 - 1e-12) return null;
    return Math.acos(clamp(x, -1, 1));
  }
  const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross3 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm3 = (a) => Math.hypot(a[0], a[1], a[2]);
  const unit3 = (a) => { const n = norm3(a) || 1; return [a[0] / n, a[1] / n, a[2] / n]; };
  const add3 = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sc3 = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
  const gram3 = (V) => V.map((u) => V.map((v) => dot3(u, v)));
  const det3 = (M) => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
  const PERMS = deepFreeze({ abc: ['A', 'B', 'C'], bca: ['B', 'C', 'A'], cba: ['C', 'B', 'A'] });
  function lagrange(u, v) {
    let su = 0, sv = 0, suv = 0, rhs = 0;
    for (let i = 0; i < u.length; i++) { su += u[i] * u[i]; sv += v[i] * v[i]; suv += u[i] * v[i]; }
    for (let i = 0; i < u.length; i++) for (let j = 0; j < u.length; j++) rhs += (u[i] * v[j] - u[j] * v[i]) ** 2;
    return { lhs: su * sv - suv * suv, rhs: rhs / 2 };
  }
  /** The explicit triple: vectors, det G three ways, the mirror pair ±Ω, and |A − C| (zero exactly when c_AC = 1). */
  function triad(ab, bc, phi) {
    const cAB = Math.cos(ab), sAB = Math.sin(ab), cBC = Math.cos(bc), sBC = Math.sin(bc), cp = Math.cos(phi), sp = Math.sin(phi);
    const A = [sAB, 0, cAB], B = [0, 0, 1], C = [sBC * cp, sBC * sp, cBC], Cm = [C[0], -C[1], C[2]];
    const cAC = cAB * cBC + sAB * sBC * cp;
    const G = gram3([A, B, C]);
    const omegaPlus = 0.5 * (A[0] * C[1] - A[1] * C[0]), omegaMinus = 0.5 * (A[0] * Cm[1] - A[1] * Cm[0]);
    return {
      ab, bc, phi, cAB, cBC, cAC, A, B, C, Cm, cACdot: dot3(A, C), G,
      detFormula: gramDeterminant(cAB, cBC, cAC), detFactor: sAB * sAB * sBC * sBC * sp * sp, detMatrix: det3(G),
      omegaPlus, omegaMinus, omegaSum: omegaPlus + omegaMinus, fourOmega2: 4 * omegaPlus * omegaPlus, distAC: norm3(add3(A, sc3(C, -1)))
    };
  }
  function permGram(tr, key) { const V = { A: tr.A, B: tr.B, C: tr.C }; return gram3(PERMS[key].map((l) => V[l])); }
  const lensCache = new Map();
  /** Share of the (θ₁, c_AC) rectangle [0, π] × [−1, 1] with det G > 0 on an M × M midpoint grid, against 2 sin θ₂ / π. */
  function lensFraction(t2, M = 721) {
    const key = `${t2}:${M}`;
    if (lensCache.has(key)) return lensCache.get(key);
    const c2 = Math.cos(t2), s2 = Math.sin(t2);
    let pos = 0, neg = 0;
    for (let i = 0; i < M; i++) {
      const t1 = (i + 0.5) / M * Math.PI, c1 = Math.cos(t1), s1 = Math.sin(t1), ctr = c1 * c2, r2 = s1 * s1 * s2 * s2;
      for (let j = 0; j < M; j++) { const c = -1 + 2 * (j + 0.5) / M, d = r2 - (c - ctr) * (c - ctr); if (d > 0) pos++; else if (d < 0) neg++; }
    }
    const out = Object.freeze({ M, pos, neg, zero: M * M - pos - neg, fraction: pos / (M * M), exact: 2 * s2 / Math.PI });
    lensCache.set(key, out);
    return out;
  }

  /** The de-ordered ledger of the triple: rows k = 0 … K with the truncated cosines and det G⁽ᵏ⁾. */
  function taylorLedger(t1, t2, cAC) {
    const t3 = Math.acos(clamp(cAC, -1, 1)), thetas = [t1, t2, t3], K = convergedOrder(thetas);
    const series = thetas.map((t) => cosTaylorSeries(t, K)), rows = [];
    let prevDet = null;
    for (let k = 0; k <= K; k++) {
      const c = series.map((s) => s.partial[k]), det = gramDeterminant(c[0], c[1], c[2]);
      rows.push({ k, orders: FACT[2 * k], c, det, sign: sgnOf(det), terms: series.map((s) => s.terms[k]), touch: [...series.map((s) => Math.abs(s.terms[k]) >= 5e-5), prevDet === null || Math.abs(det - prevDet) >= 5e-5], outside: c.some((x) => Math.abs(x) > 1) });
      prevDet = det;
    }
    return { kind: 'taylor', K, thetas, rows, maxRem: Math.max(...series.map((s) => s.rem)), maxBound: Math.max(...series.map((s) => s.bound)) };
  }

  /* =============================== the orthogonal horizon: amplitude amplification =============================== */
  const N_MIN = 2, N_MAX = 12;
  const groverTheta = (n) => Math.asin(Math.pow(2, -n / 2));
  const tStar = (n) => Math.max(0, Math.round(Math.PI / (4 * groverTheta(n)) - 0.5));
  const tMaxOf = (n) => Math.max(3, 2 * tStar(n) + 1);
  const targetOf = (n) => (n <= 1 ? 1 : Math.floor(Math.pow(2, n) * 0.6180339887498949));
  /** sin θ = 2^(−n/2) on the sphere of dimension N = 2ⁿ; the start is θ₀ = π/2 − θ from the solution; t* ≈ (π/4)√N. */
  function groverHorizon(n) {
    const th = groverTheta(n), Nn = Math.pow(2, n), ts = tStar(n);
    return { n, N: Nn, theta: th, cos0: Math.pow(2, -n / 2), theta0: HALF_PI - th, tStar: ts, sqrtN: Math.sqrt(Nn), quarterPiSqrtN: Math.PI / 4 * Math.sqrt(Nn), pStar: Math.sin((2 * ts + 1) * th) ** 2 };
  }
  const simCache = new Map();
  /** Q = (2|u⟩⟨u| − I)(I − 2|s*⟩⟨s*|) applied t times to the uniform state, entry by entry. */
  function groverSim(n) {
    if (n > N_MAX) return null;
    if (simCache.has(n)) return simCache.get(n);
    const Nn = 1 << n, s = targetOf(n), th = groverTheta(n), T = tMaxOf(n), a = new Float64Array(Nn).fill(1 / Math.sqrt(Nn));
    const target = [], maxDev = [];
    for (let t = 0; t <= T; t++) {
      const want = Math.sin((2 * t + 1) * th), rest = Math.cos((2 * t + 1) * th) / Math.sqrt(Nn - 1);
      let dev = Math.abs(a[s] - want);
      for (let i = 0; i < Nn; i++) if (i !== s) dev = Math.max(dev, Math.abs(a[i] - rest));
      target.push(a[s]); maxDev.push(dev);
      a[s] = -a[s];
      let mean = 0; for (let i = 0; i < Nn; i++) mean += a[i]; mean /= Nn;
      for (let i = 0; i < Nn; i++) a[i] = 2 * mean - a[i];
    }
    const out = Object.freeze({ n, N: Nn, target: Object.freeze(target), maxDev: Object.freeze(maxDev), worst: Math.max(...maxDev), s });
    simCache.set(n, out);
    return out;
  }
  const groverCache = new Map();
  /** The NP thread as a ledger: t = 0 … t*, angle (2t + 1)θ from B, amplitudes, success probability and its change. */
  function groverLedger(n) {
    if (groverCache.has(n)) return groverCache.get(n);
    const h = groverHorizon(n), sim = groverSim(n), K = h.tStar, rows = [];
    let prevP = null;
    for (let t = 0; t <= K; t++) {
      const ang = (2 * t + 1) * h.theta, a = Math.sin(ang), b = Math.cos(ang), P = a * a, dP = prevP === null ? 0 : P - prevP;
      rows.push({ t, ang, a, b, P, dP, sign: t === 0 ? 0 : sgnOf(dP), sim: sim.target[t], dev: sim.maxDev[t] });
      prevP = P;
    }
    const out = Object.freeze({ kind: 'grover', K, rows, h, simWorst: Math.max(...rows.map((r) => r.dev)) });
    groverCache.set(n, out);
    return out;
  }

  /* =============================== no signalling =============================== */
  /** |ψ⟩ = cos(θ₁/2)|00⟩ + sin(θ₁/2)|11⟩ (qubits C, B); C measures along m(θ₂, φ) with P± = (I ± m·σ)/2, unread. */
  function noSignaling(t1, t2, phi) {
    const psi = [[Math.cos(t1 / 2), 0], [0, 0], [0, 0], [Math.sin(t1 / 2), 0]], rho = outer(psi, psi);
    const m = [Math.sin(t2) * Math.cos(phi), Math.sin(t2) * Math.sin(phi), Math.cos(t2)];
    const proj = (s) => [[[(1 + s * m[2]) / 2, 0], [s * m[0] / 2, -s * m[1] / 2]], [[s * m[0] / 2, s * m[1] / 2], [(1 - s * m[2]) / 2, 0]]];
    const kronI = (P) => Array.from({ length: 4 }, (_, r) => Array.from({ length: 4 }, (__, c) => ((r & 1) === (c & 1) ? P[r >> 1][c >> 1] : [0, 0])));
    const trC = (M) => [0, 1].map((b) => [0, 1].map((b2) => cadd(M[b][b2], M[2 + b][2 + b2])));
    const rhoB = trC(rho), out = [];
    let after = zmat(2);
    for (const s of [1, -1]) {
      const P = kronI(proj(s)), rb = trC(matmul(matmul(P, rho), P)), p = mtrace(rb)[0];
      after = madd(after, rb);
      out.push({ p, cond: p > 1e-15 ? mscale(rb, 1 / p) : rb });
    }
    return { delta: mfrob(after, rhoB), rhoB, pPlus: out[0].p, shiftPlus: mfrob(out[0].cond, rhoB), shiftMinus: mfrob(out[1].cond, rhoB) };
  }

  /* =============================== the P field: a log-barrier gradient flow =============================== */
  const KM = Object.freeze({ A: [[1, 0], [4, 1]], b: [5, 25], c: [2, 1] });
  const T_PIC = 0.2;
  /** V(x) = −t c·x − Σ log(b − Ax) − Σ log x on the two-dimensional Klee–Minty polygon, with its gradient. */
  function barrier(x) {
    const s = KM.b.map((bi, i) => bi - KM.A[i][0] * x[0] - KM.A[i][1] * x[1]);
    if (s.some((v) => !(v > 0)) || x.some((v) => !(v > 0))) return { f: Infinity };
    let f = 0; const g = [0, 0];
    for (let j = 0; j < 2; j++) { f += -T_PIC * KM.c[j] * x[j] - Math.log(x[j]); g[j] = -T_PIC * KM.c[j] - 1 / x[j]; }
    for (let i = 0; i < 2; i++) { f -= Math.log(s[i]); for (let j = 0; j < 2; j++) g[j] += KM.A[i][j] / s[i]; }
    return { f, g };
  }
  let flowCache = null;
  /** One gradient flow ẋ = −∇V from (1, 1), RK4; both sides of V(x₀) − V(x_T) = ∫‖ẋ‖² dt (Simpson on the RK4 steps). */
  function dissipation() {
    if (flowCache) return flowCache;
    const F = (x) => barrier(x).g.map((v) => -v), dt = 0.01, steps = 20000;
    let x = [1, 1];
    const pts = [x.slice()], speeds = [F(x).reduce((s, v) => s + v * v, 0)];
    for (let k = 0; k < steps; k++) {
      const k1 = F(x), k2 = F(x.map((v, i) => v + dt / 2 * k1[i])), k3 = F(x.map((v, i) => v + dt / 2 * k2[i])), k4 = F(x.map((v, i) => v + dt * k3[i]));
      x = x.map((v, i) => v + dt / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
      if (k % 40 === 39) pts.push(x.slice());
      speeds.push(F(x).reduce((s, v) => s + v * v, 0));
    }
    let integral = 0;
    for (let k = 0; k + 2 < speeds.length; k += 2) integral += dt / 3 * (speeds[k] + 4 * speeds[k + 1] + speeds[k + 2]);
    const V0 = barrier([1, 1]).f, VT = barrier(x).f;
    flowCache = Object.freeze({ T: dt * steps, x0: [1, 1], xT: x, V0, VT, drop: V0 - VT, integral, relErr: Math.abs(V0 - VT - integral) / Math.abs(V0 - VT), pts });
    return flowCache;
  }

  /* =============================== state =============================== */
  const DEFAULTS = Object.freeze({ t1: 120, t2: 75, phi: 60, n: 8, view: 'gram' });
  const THUMB = Object.freeze({ t1: 120, t2: 75, phi: 60 });
  const PRESETS = Object.freeze({
    boundary: Object.freeze({ t1: 60, t2: 45, phi: 0 }),
    ortho: Object.freeze({ t1: 90, t2: 90, phi: 90 }),
    slack: Object.freeze({ t1: 45, t2: 45, phi: 90 }),
    breach: Object.freeze({ t1: 60, t2: 60, c: -0.9 }),
    grover: Object.freeze({ n: 6, view: 'field' })
  });
  const toDeg = (x, d) => { const v = Number(x); return Number.isFinite(v) ? clamp(Math.round(v), 0, 180) : d; };
  const toPhi = (x, d) => { const v = Number(x); return Number.isFinite(v) ? clamp(Math.round(v * 10) / 10, 0, 180) : d; };
  const toC = (x) => { const v = Number(x); return Number.isFinite(v) ? clamp(Math.round(v * 1000) / 1000, -1, 1) : null; };
  const toN = (x, d) => { const v = Math.round(Number(x)); return Number.isFinite(v) ? clamp(v, N_MIN, N_MAX) : d; };
  const S = { t1: DEFAULTS.t1, t2: DEFAULTS.t2, phi: DEFAULTS.phi, c: null, n: DEFAULTS.n, view: DEFAULTS.view, pass: 0, playing: false, hover: null };
  let R = null; // derived data of the current state
  let frames = 0, pending = false, built = '', labels = [];
  const rng = TRV.mulberry32(20261111);

  function derive() {
    const t1 = S.t1 * DEG, t2 = S.t2 * DEG, phi = S.phi * DEG, w = causalWindow(t1, t2), phiMode = S.c === null;
    const cAC = phiMode ? cACFromAzimuth(t1, t2, phi) : S.c;
    const detGeneral = gramDeterminant(w.c1, w.c2, cAC);
    const det = phiMode ? w.slack * w.slack * Math.sin(phi) ** 2 : detGeneral;
    const taylor = taylorLedger(t1, t2, cAC);
    R = {
      key: `${S.t1},${S.t2},${S.phi},${S.c},${S.n}`, t1, t2, phi, phiMode, w, cAC, det, detGeneral, status: sgnOf(det),
      tri: phiMode ? triad(t1, t2, phi) : null, taylor, order: orderCheck(taylor.thetas, taylor.K), grover: groverLedger(S.n),
      signal: noSignaling(t1, t2, phi)
    };
  }
  const fresh = () => { if (!R || R.key !== `${S.t1},${S.t2},${S.phi},${S.c},${S.n}`) derive(); return R; };
  const kind = () => (S.view === 'field' ? 'grover' : 'taylor');
  const LG = () => (kind() === 'grover' ? fresh().grover : fresh().taylor);
  const K = () => LG().K;

  /* =============================== formatting =============================== */
  const SUPS = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const sup = (s) => String(s).split('').map((ch) => SUPS[ch] || ch).join('');
  const neg = (s) => s.replace(/-/g, MINUS);
  function fmt(x, d = 4) { if (!Number.isFinite(x)) return String(x); const v = Math.abs(x) < 0.5 * 10 ** -d ? 0 : x; return neg(v.toFixed(d)); }
  function fmtSigned(x, d = 4) { const v = Math.abs(x) < 0.5 * 10 ** -d ? 0 : x; return v > 0 ? '+' + v.toFixed(d) : v < 0 ? MINUS + (-v).toFixed(d) : (0).toFixed(d); }
  function sci(x) {
    if (x === 0) return '0';
    if (!Number.isFinite(x)) return String(x);
    const e = Math.floor(Math.log10(Math.abs(x))), m = x / 10 ** e;
    return `${neg(m.toFixed(1))} × 10${sup(e)}`;
  }
  /** Ledger cells: four decimals below 10, two below 1000, else mantissa · 10ᵉ. */
  function fmtCell(x) { const a = Math.abs(x); if (a > 0 && a < 5e-5) { const e = Math.floor(Math.log10(a)); return `${neg((x / 10 ** e).toFixed(1))}·10${sup(e)}`; } if (a < 10) return fmt(x, 4); if (a < 1000) return fmt(x, 2); const e = Math.floor(Math.log10(a)); return `${neg((x / 10 ** e).toFixed(1))}·10${sup(e)}`; }
  /** Factorials: integers below 10⁷, else m.m·10ᵉ. */
  function fmtBig(n) { if (n < 1e7) return String(n); const e = Math.floor(Math.log10(n)); return `${(n / 10 ** e).toFixed(1)}·10${sup(e)}`; }
  const signCls = (s) => (s > 0 ? 'vpos' : s < 0 ? 'vneg' : 'vzero');
  const sgnCls = (s) => (s > 0 ? 'pos' : s < 0 ? 'neg' : 'zero');
  const sgnTxt = (s) => (s > 0 ? '+' : s < 0 ? MINUS : '0');
  const degs = (r, d = 1) => `${fmt(r / DEG, d)}°`;
  const mark = (ok) => `<span class="${ok ? 'okmark' : 'badmark'}">${ok ? '✓' : '✗'}</span>`;

  /* =============================== ledger =============================== */
  const cell = (txt, cls) => `<span class="${cls}">${txt}</span>`;
  function buildLedger() {
    const rows = [], G = LG();
    if (G.kind === 'taylor') {
      rows.push(`<div class="drow hdr" aria-hidden="true"><span class="lab">${L('阶', 'order')}</span><div class="cells">`
        + `<span><b>(2k)!</b><small>${L('排序数', 'orders')}</small></span><span><b>c<sub>AB</sub></b><small>cos θ₁</small></span><span><b>c<sub>BC</sub></b><small>cos θ₂</small></span>`
        + `<span><b>c<sub>AC</sub></b><small>cos θ₃</small></span><span><b>det G</b><small>${L('格拉姆', 'Gram')}</small></span></div><span class="what"></span></div>`);
      const th = G.thetas;
      rows.push(`<div class="drow input" role="listitem"><span class="lab">θ</span><div class="cells">${cell('—', 'd0')}${cell(fmt(th[0]), 'd1')}${cell(fmt(th[1]), 'd1')}${cell(fmt(th[2]), R.status < 0 ? 'd2' : 'd1')}${cell('—', 'd0')}</div>`
        + `<span class="what">${L('弧度 · θ₃ = arccos c<sub>AC</sub>', 'radians · θ₃ = arccos c<sub>AC</sub>')}</span></div>`);
      G.rows.forEach((r) => {
        const last = r.k === G.K;
        const cls = r.k === 0 ? 'drow sum' : `drow pass${last ? ' final' : ''}`;
        const cs = r.c.map((x, i) => cell(fmtCell(x), (Math.abs(x) > 1 ? 'd2' : 'd1') + (r.k > 0 && r.touch[i] ? ' touch' : ''))).join('');
        const dc = cell(fmtCell(r.det), (r.sign > 0 ? 'd1' : r.sign < 0 ? 'd2' : 'd0') + (r.k > 0 && r.touch[3] ? ' touch' : ''));
        const code = r.k === 0 ? 'θ⁰/0!' : `${r.k % 2 ? MINUS : '+'}θ${sup(2 * r.k)}/${2 * r.k}!`;
        let name = r.k === 0 ? L('三点重合 A = B = C', 'A = B = C coincide')
          : last ? L('收敛', 'converged') : r.sign > 0 ? L('窗口内', 'inside the window') : r.sign < 0 ? L('越过视界', 'past the horizon') : L('边界 det G = 0', 'boundary det G = 0');
        if (r.k > 0 && r.outside) name += ' · |c| > 1';
        const tail = last ? `: det G = ${fmtSigned(R.det)} ${mark(R.status >= 0)}` : '';
        rows.push(`<div class="${cls}" role="listitem" data-pass="${r.k}"><span class="lab">#${r.k}</span><div class="cells">${cell(fmtBig(r.orders), 'd0')}${cs}${dc}</div>`
          + `<span class="what"><span class="sgn ${sgnCls(r.sign)}">${sgnTxt(r.sign)}</span><code>${code}</code><span class="name">${esc(name)}${tail}</span></span></div>`);
      });
    } else {
      const h = G.h;
      rows.push(`<div class="drow hdr" aria-hidden="true"><span class="lab">${L('步', 'step')}</span><div class="cells">`
        + `<span><b>(2t+1)θ</b><small>${L('转角', 'angle')}</small></span><span><b>a<sub>W</sub></b><small>sin</small></span><span><b>a<sub>B</sub></b><small>cos</small></span>`
        + `<span><b>P</b><small>a<sub>W</sub>²</small></span><span><b>ΔP</b><small>${L('增量', 'change')}</small></span></div><span class="what"></span></div>`);
      rows.push(`<div class="drow input" role="listitem"><span class="lab">θ₀</span><div class="cells">${cell(degs(h.theta0, 2), 'd0')}${cell(fmt(h.cos0), 'd1')}${cell(fmt(Math.sin(h.theta0)), 'd0')}${cell('—', 'd0')}${cell('—', 'd0')}</div>`
        + `<span class="what">n = ${h.n} · N = ${h.N} · cos θ₀ = 2<sup>−n/2</sup></span></div>`);
      G.rows.forEach((r) => {
        const last = r.t === G.K;
        const cls = r.t === 0 ? 'drow sum' : `drow pass${last ? ' final' : ''}`;
        const tc = r.t > 0 ? ' touch' : '';
        const cs = cell(degs(r.ang, 2), 'd0') + cell(fmt(r.a), 'd1' + tc) + cell(fmt(r.b), 'd0') + cell(fmt(r.P), 'd1' + tc)
          + cell(r.t === 0 ? '—' : fmtSigned(r.dP), r.t === 0 ? 'd0' : (r.sign > 0 ? 'd1' : r.sign < 0 ? 'd2' : 'd0') + tc);
        const code = r.t === 0 ? 'U' : `+2θ`;
        const name = r.t === 0 ? L('均匀初态', 'uniform start') : last ? `t* ≈ (π/4)√N = ${fmt(h.quarterPiSqrtN, 2)}` : L('转 2θ', 'turn by 2θ');
        const tail = last ? ` · ${L('模拟一致', 'simulation agrees')} ${mark(G.simWorst < 1e-12)}` : '';
        rows.push(`<div class="${cls}" role="listitem" data-pass="${r.t}"><span class="lab">#${r.t}</span><div class="cells">${cs}</div>`
          + `<span class="what"><span class="sgn ${sgnCls(r.sign)}">${sgnTxt(r.sign)}</span><code>${code}</code><span class="name">${esc(name)}${tail}</span></span></div>`);
      });
    }
    $('ledger').innerHTML = rows.join('');
    $('tape').innerHTML = G.rows.slice(1).map((r, i) => `<i class="${sgnCls(r.sign)}" data-pass="${i + 1}" title="#${i + 1} ${sgnTxt(r.sign)}"></i>`).join('');
  }
  function markLedger() {
    const G = LG(), KK = G.K;
    $('ledger').querySelectorAll('.drow[data-pass]').forEach((row) => {
      const k = +row.dataset.pass;
      row.classList.toggle('now', k === S.pass);
      row.classList.toggle('future', k > S.pass);
      row.setAttribute('aria-current', k === S.pass ? 'step' : 'false');
    });
    $('tape').querySelectorAll('i').forEach((t) => { const k = +t.dataset.pass; t.classList.toggle('now', k === S.pass); t.classList.toggle('future', k > S.pass); });
    const r = G.rows[S.pass];
    if (G.kind === 'taylor') {
      $('tapeSum').innerHTML = `${L('第', 'order')} ${S.pass}${L(' 阶', '')}: det G⁽ᵏ⁾ = <span class="${signCls(r.sign)}">${fmtSigned(r.det)}</span> · ${L('精确', 'exact')} <span class="${signCls(R.status)}">${fmtSigned(R.det)}</span>`;
      $('passLabel').innerHTML = `${L('阶 ', 'ORDER ')}${S.pass} <small>/ ${KK}</small>`;
    } else {
      $('tapeSum').innerHTML = `t = ${S.pass}: P = <span class="vpos">${fmt(r.P)}</span> · t* = ${KK} · √N = ${fmt(G.h.sqrtN, 2)}`;
      $('passLabel').innerHTML = `t = ${S.pass} <small>/ ${KK}</small>`;
    }
    $('pass').max = String(Math.max(1, KK));
    $('pass').value = String(S.pass);
    $('pass').disabled = KK === 0;
    $('prev').disabled = $('first').disabled = S.pass === 0;
    $('next').disabled = $('last').disabled = S.pass >= KK;
    $('play').disabled = KK === 0;
    // keep the current row visible inside the ledger's own scroller (never scroll the page)
    const wrap = $('sheetWrap'), row = $('ledger').querySelector('.drow.now');
    if (row) {
      const top = row.offsetTop - 34, bottom = row.offsetTop + row.offsetHeight + 6;
      if (top < wrap.scrollTop) wrap.scrollTop = top;
      else if (bottom > wrap.scrollTop + wrap.clientHeight) wrap.scrollTop = bottom - wrap.clientHeight;
    }
  }

  /* =============================== readouts =============================== */
  function readouts() {
    const { w, cAC, det, detGeneral, status, order, signal, grover } = R, h = grover.h;
    $('roAB').innerHTML = `${fmtSigned(w.c1)}<span class="sub">θ₁ = ${S.t1}°</span>`;
    $('roBC').innerHTML = `${fmtSigned(w.c2)}<span class="sub">θ₂ = ${S.t2}°</span>`;
    $('roAC').innerHTML = `<span class="${signCls(status)}">${fmtSigned(cAC)}</span><span class="sub">${R.phiMode ? `φ = ${fmt(S.phi, 1)}°` : L('无实数 φ', 'no real φ')}</span>`;
    $('roWin').innerHTML = `[${fmt(w.lo, 3)}, ${fmt(w.hi, 3)}]<span class="sub">cos(θ₁ ± θ₂)</span>`;
    $('roSlack').innerHTML = `${fmt(w.slack)}<span class="sub">${L('窗口半宽', 'half-width')}</span>`;
    $('roGrover').innerHTML = `t* = ${h.tStar}<span class="sub">√(2${sup(h.n)}) = ${fmt(h.sqrtN, 2)}</span>`;
    const hero = $('roDeficit');
    hero.className = signCls(status);
    hero.textContent = fmtSigned(det);
    const agree = Math.abs(det - detGeneral) < 1e-12;
    const what = status > 0 ? L('= s₁²s₂² sin²φ ≥ 0 · 因果相容区间内自由选点', '= s₁²s₂² sin²φ ≥ 0 · a free choice inside the compatible window')
      : status === 0 ? L(`= s₁²s₂² sin²φ = 0 · φ = ${fmt(S.phi, 1)}°：极值测地边界，两条余弦锁死第三条`, `= s₁²s₂² sin²φ = 0 · φ = ${fmt(S.phi, 1)}°: the extremal geodesic boundary, two cosines lock the third`)
        : L(`c<sub>AC</sub> 在窗口 [${fmt(w.lo, 3)}, ${fmt(w.hi, 3)}] 之外：没有三个单位向量实现这组余弦`, `c<sub>AC</sub> lies outside the window [${fmt(w.lo, 3)}, ${fmt(w.hi, 3)}]: no three unit vectors realize these cosines`);
    $('roDeficitSub').innerHTML = `${what}<br>1 − Σc² + 2c<sub>AB</sub>c<sub>BC</sub>c<sub>AC</sub> = ${fmtSigned(detGeneral)} ${mark(agree)}`;
    const dm = $('roDeficitMark');
    dm.className = status >= 0 ? 'okmark' : 'badmark';
    dm.textContent = status >= 0 ? '✓' : '✗';
    const ordOk = order.maxDev < 1e-12;
    $('roOrder').className = ordOk ? 'vpos' : 'vneg';
    $('roOrder').textContent = `|C² + S² − 1| ≤ ${sci(order.maxDev)}`;
    $('roOrderMark').className = ordOk ? 'okmark' : 'badmark';
    $('roOrderMark').textContent = ordOk ? '✓' : '✗';
    $('roOrderSub').innerHTML = L(`K = ${order.K} 阶，(2K)! = ${fmtBig(order.orders)}；θ₁、θ₂、θ₃ 三个角都核对`, `K = ${order.K} orders, (2K)! = ${fmtBig(order.orders)}; all three angles θ₁, θ₂, θ₃ checked`);
    const sigOk = signal.delta < 1e-14;
    $('roSignal').className = sigOk ? 'vpos' : 'vneg';
    $('roSignal').textContent = `Δρ_B = ${sci(signal.delta)}`;
    $('roSignalMark').className = sigOk ? 'okmark' : 'badmark';
    $('roSignalMark').textContent = sigOk ? '✓' : '✗';
    $('roSignalSub').innerHTML = L(`C 侧沿 m(θ₂, φ) 测量不读结果；读出“+”时 ‖ρ<sub>B|+</sub> − ρ<sub>B</sub>‖ = ${fmt(signal.shiftPlus, 3)}，两种结果平均后相消`,
      `C measures along m(θ₂, φ) unread; reading “+” gives ‖ρ<sub>B|+</sub> − ρ<sub>B</sub>‖ = ${fmt(signal.shiftPlus, 3)}, and the two outcomes cancel on average`);
    $('roNote').innerHTML = status > 0 ? L('φ 是当下一念：c<sub>AC</sub> 只能在窗口内取值；φ = 0° 或 180° 时贴上边界 det G = 0。', 'φ is the present choice: c<sub>AC</sub> can only move inside the window; at φ = 0° or 180° it touches the boundary det G = 0.')
      : status === 0 ? L('边界上 det G = 0：三点共面，两条余弦当场锁死第三条，没有选择的余地。', 'On the boundary det G = 0: the three points are coplanar and two cosines lock the third, leaving no choice.')
        : L('越界：det G < 0，格拉姆矩阵不半正定。拨动 φ 回到窗口内。', 'Breach: det G < 0 and the Gram matrix is not positive semidefinite. Move φ to return inside the window.');
    $('pillTri').innerHTML = `θ₁, θ₂ <strong>${S.t1}°, ${S.t2}°</strong>`;
    $('pillPass').innerHTML = kind() === 'taylor' ? `${L('阶数', 'ORDERS')} <strong>${R.taylor.K}</strong>` : `t* <strong>${grover.K}</strong>`;
    $('pillDet').innerHTML = `det G <strong class="${signCls(status)}">${fmtSigned(det, 3)}</strong>`;
    $('ledgerSub').innerHTML = kind() === 'taylor'
      ? L('逐阶加上 (−1)ᵏθ²ᵏ/(2k)!，看截断余弦构成的 det G⁽ᵏ⁾ 怎样回到真实的一侧', 'add (−1)ᵏθ²ᵏ/(2k)! order by order and watch det G⁽ᵏ⁾ of the truncated cosines return to its true side')
      : L('每一步只转 2θ：从正交视界走向隐藏解', 'each step turns by only 2θ: from the orthogonal horizon toward the hidden solution');
    if (S.view === 'gram') {
      $('hudBig').textContent = L('格拉姆窗口', 'GRAM WINDOW');
      $('hudSub').innerHTML = `c<sub>AC</sub> = ${fmt(cAC, 3)} ${status >= 0 ? '∈' : '∉'} [${fmt(w.lo, 3)}, ${fmt(w.hi, 3)}] ${mark(status >= 0)}`;
    } else if (S.view === 'book') {
      const pc = pinchStats();
      $('hudBig').textContent = L('晶体书册', 'CRYSTAL BOOK');
      $('hudSub').innerHTML = `‖HΨ‖ = ${sci(H_NORM)} · ${L('页间块', 'blocks')} = 1/${N} ${mark(Math.abs(pc.minBlock - 1 / N) < 1e-12 && Math.abs(pc.maxBlock - 1 / N) < 1e-12)}`;
    } else {
      const f = dissipation();
      $('hudBig').textContent = L('P 场 vs NP 线', 'P FIELD vs NP THREAD');
      $('hudSub').innerHTML = `ΔV = ∫‖ẋ‖² ${mark(f.relErr < 1e-6)} · n = ${h.n} · t* = ${h.tStar}`;
    }
  }

  /* =============================== canvas helpers (stage, CSS pixels) =============================== */
  let FS = 11;
  function parseRich(s) {
    const out = [], re = /([_^])\{([^}]*)\}/g; let last = 0, m;
    while ((m = re.exec(s))) { if (m.index > last) out.push({ t: s.slice(last, m.index), k: '' }); out.push({ t: m[2], k: m[1] === '_' ? 'sub' : 'sup' }); last = re.lastIndex; }
    if (last < s.length) out.push({ t: s.slice(last), k: '' });
    return out;
  }
  /** Draw a short symbolic label (digits and symbols only) in a role colour; returns its width. */
  function txt(g, s, x, y, role, opt = {}) {
    s = String(s);
    const segs = parseRich(s), family = TRV.fonts.data, weight = opt.weight || 400, size = opt.size || FS;
    let w = 0;
    for (const sg of segs) { g.font = `${weight} ${(sg.k ? size * 0.72 : size).toFixed(2)}px ${family}`; w += g.measureText(sg.t).width; }
    let x0 = opt.align === 'center' ? x - w / 2 : opt.align === 'right' ? x - w : x;
    g.fillStyle = col(role, opt.alpha); g.textAlign = 'left'; g.textBaseline = 'middle';
    for (const sg of segs) {
      g.font = `${weight} ${(sg.k ? size * 0.72 : size).toFixed(2)}px ${family}`;
      const dy = sg.k === 'sub' ? size * 0.3 : sg.k === 'sup' ? -size * 0.36 : 0;
      g.fillText(sg.t, x0, y + dy); x0 += g.measureText(sg.t).width;
    }
    labels.push(segs.map((q) => q.t).join(''));
    return w;
  }
  function pen(g, role, a, w, dash) { g.strokeStyle = col(role, a); g.lineWidth = w || 1; g.setLineDash(dash || []); }
  function seg(g, x1, y1, x2, y2) { g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }
  function dot(g, x, y, r, role, a) { g.fillStyle = col(role, a); g.beginPath(); g.arc(x, y, r, 0, TWO_PI); g.fill(); }
  function glowDot(g, x, y, r, role) { g.save(); g.shadowColor = col(role); g.shadowBlur = 12; dot(g, x, y, r, role); g.restore(); }
  function poly(g, pts, close) { g.beginPath(); pts.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]))); if (close) g.closePath(); }
  function frameBox(g, r) { pen(g, 'edge', 0.9, 1); g.strokeRect(r.x + 0.5, r.y + 0.5, r.w - 1, r.h - 1); }

  /* =============================== stage =============================== */
  const stageEl = $('stage'), stageCv = $('stageCanvas');
  /** The free region of the stage below / above the HUD and the view chips. */
  function stageFrame() {
    const dpr = TRV.fitCanvas(stageCv), g = stageCv.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const W = stageCv.width / dpr, H = stageCv.height / dpr;
    g.clearRect(0, 0, W, H);
    const sr = stageEl.getBoundingClientRect();
    let top = 12, bottom = H - 12;
    for (const el of [stageEl.querySelector('.hud-tl'), $('viewChips')]) {
      const r = el.getBoundingClientRect();
      if (!r.height) continue;
      const mid = (r.top + r.bottom) / 2 - sr.top;
      if (mid < sr.height / 2) top = Math.max(top, r.bottom - sr.top + 10); else bottom = Math.min(bottom, r.top - sr.top - 10);
    }
    FS = W < 420 ? 10 : 11;
    return { g, W, H, top, bottom: Math.max(top + 40, bottom - 12), left: 16, right: W - 16 };
  }
  /** Squares as tall as the free region, wide panels share the rest (at least 1.4 squares each). */
  function layout(fr, kinds) {
    const gap = 20, n = kinds.length, h = fr.bottom - fr.top, w = fr.right - fr.left;
    const nsq = kinds.filter((k) => k === 'sq').length, nw = n - nsq;
    const side = Math.max(30, Math.min(h, (w - gap * (n - 1)) / (nsq + nw * 1.4)));
    const wideW = nw ? (w - gap * (n - 1) - side * nsq) / nw : 0;
    let x = fr.left + (nw ? 0 : Math.max(0, (w - gap * (n - 1) - side * nsq) / 2));
    return kinds.map((k) => { const pw = k === 'sq' ? side : wideW, ph = k === 'sq' ? side : h; const r = { x, y: fr.top + (h - ph) / 2, w: pw, h: ph }; x += pw + gap; return r; });
  }
  function drawStage() {
    labels.length = 0;
    const fr = stageFrame(), { g, W } = fr;
    if (S.view === 'gram') {
      const P = layout(fr, W >= 560 ? ['sq', 'sq', 'wide'] : ['sq', 'wide']);
      drawSphere(g, P[0]);
      if (P.length === 3) { drawEllipse(g, P[1]); drawWindow(g, P[2]); } else drawWindow(g, P[1]);
    } else if (S.view === 'book') {
      const P = layout(fr, ['sq', 'wide']);
      drawDial(g, P[0]); drawCurve(g, P[1]);
    } else {
      const P = layout(fr, W >= 560 ? ['sq', 'sq', 'wide'] : ['sq', 'sq']);
      drawPField(g, P[0]); drawThread(g, P[1]);
      if (P[2]) drawProb(g, P[2]);
    }
  }

  /* ---------- gram view: the sphere, the compatibility ellipse, the window of det G ---------- */
  const YAW = -0.62, PITCH = 0.38;
  /** Orthographic view: screen x, screen up, depth toward the viewer. */
  function proj(p) {
    const cy = Math.cos(YAW), sy = Math.sin(YAW), x1 = cy * p[0] - sy * p[1], y1 = sy * p[0] + cy * p[1];
    const cp = Math.cos(PITCH), sp = Math.sin(PITCH);
    return [x1, sp * y1 + cp * p[2], -(cp * y1 - sp * p[2])];
  }
  function smallCircle(u, a, n = 120) {
    const t = Math.abs(u[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], e1 = unit3(add3(t, sc3(u, -dot3(t, u)))), e2 = cross3(u, e1);
    return Array.from({ length: n + 1 }, (_, i) => { const s = TWO_PI * i / n; return add3(sc3(u, Math.cos(a)), add3(sc3(e1, Math.sin(a) * Math.cos(s)), sc3(e2, Math.sin(a) * Math.sin(s)))); });
  }
  function arc3(u, v, n = 48) {
    const c = clamp(dot3(u, v), -1, 1), w = Math.acos(c);
    if (w < 1e-9) return [u, v];
    return Array.from({ length: n + 1 }, (_, i) => { const s = i / n, a = Math.sin((1 - s) * w) / Math.sin(w), b = Math.sin(s * w) / Math.sin(w); return add3(sc3(u, a), sc3(v, b)); });
  }
  /** A curve on the sphere: solid in front, faint and dashed behind. */
  function curve3(g, pts, scr, role, a, w, dashFront) {
    for (let i = 0; i + 1 < pts.length; i++) {
      const p = proj(pts[i]), q = proj(pts[i + 1]), front = p[2] + q[2] >= 0;
      pen(g, role, front ? a : a * 0.35, w, front ? dashFront : [3, 4]);
      seg(g, scr(p)[0], scr(p)[1], scr(q)[0], scr(q)[1]);
    }
    g.setLineDash([]);
  }
  function drawSphere(g, r) {
    const cx = r.x + r.w / 2, cy = r.y + r.h / 2, rad = Math.min(r.w, r.h) / 2 - 12;
    const scr = (p) => [cx + rad * p[0], cy - rad * p[1]];
    pen(g, 'edge', 1, 1); g.beginPath(); g.arc(cx, cy, rad, 0, TWO_PI); g.stroke();
    const t1 = R.t1, t2 = R.t2, phi = R.phi, t3 = Math.acos(clamp(R.cAC, -1, 1));
    const A = [Math.sin(t1), 0, Math.cos(t1)], B = [0, 0, 1];
    curve3(g, smallCircle(B, t2), scr, 'cos', 0.55, 1.2, [4, 3]);
    curve3(g, smallCircle(A, t3), scr, 'wedge', 0.7, 1.2);
    curve3(g, arc3(B, A), scr, 'cos', 0.95, 2);
    const pt = (p, role, rr, lab, dx) => { const q = proj(p), s = scr(q); if (role === 'now') glowDot(g, s[0], s[1], rr, role); else dot(g, s[0], s[1], rr, role, q[2] >= 0 ? 1 : 0.45); txt(g, lab, s[0] + dx, s[1] - 9, role === 'now' ? 'now' : 'ink', { size: FS, align: 'center' }); };
    if (R.phiMode) {
      const C = [Math.sin(t2) * Math.cos(phi), Math.sin(t2) * Math.sin(phi), Math.cos(t2)], Cm = [C[0], -C[1], C[2]];
      curve3(g, arc3(B, C), scr, 'cos', 0.95, 2);
      curve3(g, arc3(A, C), scr, 'now', 0.9, 1.4, [5, 3]);
      if (R.status > 0) { const q = proj(Cm), s = scr(q); pen(g, 'faint', 1, 1.2); g.beginPath(); g.arc(s[0], s[1], 3.5, 0, TWO_PI); g.stroke(); }
      pt(C, 'now', 4.5, 'C', 0);
    }
    pt(B, 'ink', 3.5, 'B', 0);
    pt(A, 'cos', 3.5, 'A', 0);
  }
  function drawEllipse(g, r) {
    const X = (x) => r.x + (x + 1) / 2 * r.w, Y = (y) => r.y + (1 - y) / 2 * r.h, t2 = R.t2, w = R.w;
    frameBox(g, r);
    pen(g, 'faint', 0.5, 1); seg(g, X(0), r.y, X(0), r.y + r.h); seg(g, r.x, Y(0), r.x + r.w, Y(0));
    const up = [], dn = [];
    for (let i = 0; i <= 120; i++) { const t = Math.PI * i / 120; up.push([X(Math.cos(t)), Y(Math.cos(t - t2))]); dn.push([X(Math.cos(t)), Y(Math.cos(t + t2))]); }
    poly(g, up.concat(dn.slice().reverse()), true);
    g.fillStyle = col('cos', 0.12); g.fill();
    g.save(); g.shadowColor = col('bound'); g.shadowBlur = 6;
    pen(g, 'bound', 0.9, 1.5); poly(g, up); g.stroke(); poly(g, dn); g.stroke();
    g.restore();
    pen(g, 'cos', 1, 3); seg(g, X(w.c1), Y(w.lo), X(w.c1), Y(w.hi));
    const px = X(w.c1), py = Y(R.cAC);
    if (R.status < 0) { pen(g, 'wedge', 1, 1.5); g.beginPath(); g.arc(px, py, 8, 0, TWO_PI); g.stroke(); }
    glowDot(g, px, py, 4.5, 'now');
    txt(g, 'c_{AB}', r.x + r.w / 2, r.y + r.h + 8, 'dim', { size: FS - 1, align: 'center' });
    txt(g, 'c_{AC}', r.x + 3, r.y + 9, 'dim', { size: FS - 1 });
  }
  function drawWindow(g, r) {
    const w = R.w, r2 = w.slack * w.slack, ymax = Math.max(r2, 0.04) * 1.3, ymin = Math.min(-ymax * 0.85, R.det * 1.2);
    const X = (x) => r.x + (x + 1) / 2 * r.w, Y = (y) => r.y + (ymax - y) / (ymax - ymin) * r.h;
    frameBox(g, r);
    g.save(); g.beginPath(); g.rect(r.x, r.y, r.w, r.h); g.clip();
    const pts = [];
    for (let i = 0; i <= 240; i++) { const c = -1 + 2 * i / 240; pts.push([c, r2 - (c - w.center) ** 2]); }
    // the compatible part: fill to the baseline
    const inside = pts.filter((p) => p[1] >= 0);
    if (inside.length > 1) { poly(g, [[X(inside[0][0]), Y(0)], ...inside.map((p) => [X(p[0]), Y(p[1])]), [X(inside[inside.length - 1][0]), Y(0)]], true); g.fillStyle = col('cos', 0.14); g.fill(); }
    for (let i = 0; i + 1 < pts.length; i++) {
      const a = pts[i], b = pts[i + 1], ins = a[1] >= 0 && b[1] >= 0;
      pen(g, ins ? 'cos' : 'wedge', ins ? 1 : 0.85, 1.8); seg(g, X(a[0]), Y(a[1]), X(b[0]), Y(b[1]));
    }
    pen(g, 'bound', 0.75, 1); seg(g, r.x, Y(0), r.x + r.w, Y(0));
    pen(g, 'bound', 0.6, 1, [3, 3]); seg(g, X(w.lo), r.y, X(w.lo), r.y + r.h); seg(g, X(w.hi), r.y, X(w.hi), r.y + r.h); g.setLineDash([]);
    const px = X(R.cAC), py = Y(R.det);
    pen(g, 'now', 0.6, 1, [3, 3]); seg(g, px, Y(0), px, py); g.setLineDash([]);
    glowDot(g, px, py, 4.5, 'now');
    g.restore();
    txt(g, '−1', r.x + 2, r.y + r.h + 8, 'dim', { size: FS - 1 });
    txt(g, '1', r.x + r.w - 2, r.y + r.h + 8, 'dim', { size: FS - 1, align: 'right' });
    txt(g, 'c_{AC}', r.x + r.w / 2, r.y + r.h + 8, 'dim', { size: FS - 1, align: 'center' });
    txt(g, 'det G', r.x + r.w - 5, Y(0) + 9, 'dim', { size: FS - 1, align: 'right' });
    const lx = X(w.lo), hx = X(w.hi);
    const room = 46;
    const lab = (x, v, y) => (x - room < r.x ? txt(g, fmt(v, 3), x + 4, y, 'bound', { size: FS - 1 }) : txt(g, fmt(v, 3), x - 4, y, 'bound', { size: FS - 1, align: 'right' }));
    if (hx - lx < 2 * room) { lab(lx, w.lo, r.y + 9); txt(g, fmt(w.hi, 3), Math.min(hx + 4, r.x + r.w - room), r.y + 23, 'bound', { size: FS - 1 }); }
    else { lab(lx, w.lo, r.y + 9); if (hx + room > r.x + r.w) txt(g, fmt(w.hi, 3), hx - 4, r.y + 9, 'bound', { size: FS - 1, align: 'right' }); else txt(g, fmt(w.hi, 3), hx + 4, r.y + 9, 'bound', { size: FS - 1 }); }
  }

  /* ---------- book view: the crystal dial and the cosine curve ---------- */
  function drawDial(g, r) {
    const cx = r.x + r.w / 2, cy = r.y + r.h / 2, rad = Math.min(r.w, r.h) / 2 - 16;
    const at = (t, rr = rad) => [cx + rr * Math.sin(t), cy - rr * Math.cos(t)];
    pen(g, 'crystal', 0.35, 1); g.beginPath(); g.arc(cx, cy, rad, 0, TWO_PI); g.stroke();
    pen(g, 'crystal', 0.1, 1);
    for (let j = 0; j < N; j++) for (let l = j + 1; l < N; l++) { const a = at(PAGES[j]), b = at(PAGES[l]); seg(g, a[0], a[1], b[0], b[1]); }
    PAGES.forEach((t) => { const p = at(t); dot(g, p[0], p[1], 3.2, 'crystal', 0.95); });
    const th = R.taylor.thetas, used = [];
    th.forEach((t, i) => {
      const role = i === 2 ? 'now' : 'cos', p = at(t, rad - 2);
      pen(g, role, 0.95, i === 2 ? 2 : 1.6); seg(g, cx, cy, p[0], p[1]);
      let lr = rad + 10; for (const u of used) if (Math.abs(u - t) < 0.25) lr += 15;
      used.push(t);
      const q = at(t, lr); txt(g, `θ_{${i + 1}}`, q[0], q[1], role, { size: FS, align: 'center' });
    });
    dot(g, cx, cy, 2.5, 'ink');
  }
  function drawCurve(g, r) {
    const ymax = 1.6, X = (t) => r.x + t / TWO_PI * r.w, Y = (y) => r.y + (ymax - y) / (2 * ymax) * r.h;
    frameBox(g, r);
    pen(g, 'faint', 0.6, 1); seg(g, r.x, Y(0), r.x + r.w, Y(0));
    pen(g, 'faint', 0.5, 1, [2, 4]); seg(g, r.x, Y(1), r.x + r.w, Y(1)); seg(g, r.x, Y(-1), r.x + r.w, Y(-1)); g.setLineDash([]);
    const th = R.taylor.thetas;
    th.forEach((t, i) => { pen(g, i === 2 ? 'now' : 'cos', 0.45, 1, [3, 3]); seg(g, X(t), r.y, X(t), r.y + r.h); });
    g.setLineDash([]);
    g.save(); g.beginPath(); g.rect(r.x, r.y, r.w, r.h); g.clip();
    const pts = []; for (let i = 0; i <= 240; i++) { const t = TWO_PI * i / 240; pts.push([X(t), Y(Math.cos(t))]); }
    pen(g, 'cos', 1, 1.8); poly(g, pts); g.stroke();
    const k = kind() === 'taylor' ? S.pass : R.taylor.K, tp = [];
    for (let i = 0; i <= 240; i++) { const t = TWO_PI * i / 240; tp.push([X(t), Y(clamp(cosTaylorSeries(t, k).sum, -ymax * 1.5, ymax * 1.5))]); }
    pen(g, 'now', 0.95, 1.6, [6, 3]); poly(g, tp); g.stroke(); g.setLineDash([]);
    g.restore();
    PAGES.forEach((t) => dot(g, X(t), Y(Math.cos(t)), 3, 'crystal'));
    th.forEach((t, i) => glowDot(g, X(t), Y(Math.cos(t)), i === 2 ? 4.2 : 3.4, i === 2 ? 'now' : 'cos'));
    txt(g, '0', r.x + 2, r.y + r.h + 8, 'dim', { size: FS - 1 });
    txt(g, 'π', X(Math.PI), r.y + r.h + 8, 'dim', { size: FS - 1, align: 'center' });
    txt(g, '2π', r.x + r.w - 2, r.y + r.h + 8, 'dim', { size: FS - 1, align: 'right' });
    txt(g, '1', r.x + 4, Y(1) - 7, 'dim', { size: FS - 1 });
    txt(g, '−1', r.x + 4, Y(-1) + 7, 'dim', { size: FS - 1 });
    txt(g, `T_{${k}}`, r.x + r.w - 6, r.y + 9, 'now', { size: FS, align: 'right' });
  }

  /* ---------- field view: the P field, the NP thread, the success probability ---------- */
  function drawPField(g, r) {
    const X = (x) => r.x + 6 + x / 5.4 * (r.w - 12), Y = (y) => r.y + r.h - 6 - y / 26 * (r.h - 12);
    const V = [[0, 0], [5, 0], [5, 5], [0, 25]];
    poly(g, V.map((p) => [X(p[0]), Y(p[1])]), true);
    g.fillStyle = col('cos', 0.05); g.fill();
    pen(g, 'ink', 0.55, 1.2); g.stroke();
    for (let i = 0; i < 8; i++) for (let j = 0; j < 9; j++) {
      const x = [0.35 + i * 0.6, 0.9 + j * 2.7];
      if (x[0] >= 4.85 || 4 * x[0] + x[1] >= 24.2) continue;
      const B = barrier(x); if (!Number.isFinite(B.f)) continue;
      const d = [-B.g[0] / 5.4 * (r.w - 12), B.g[1] / 26 * (r.h - 12)], n = Math.hypot(d[0], d[1]); if (n < 1e-12) continue;
      const L0 = 7, px = X(x[0]), py = Y(x[1]), qx = px + d[0] / n * L0, qy = py + d[1] / n * L0;
      pen(g, 'cos', 0.42, 1); seg(g, px - d[0] / n * L0 * 0.4, py - d[1] / n * L0 * 0.4, qx, qy);
      dot(g, qx, qy, 1.3, 'cos', 0.6);
    }
    const f = dissipation();
    pen(g, 'cos', 1, 2); poly(g, f.pts.map((p) => [X(p[0]), Y(p[1])])); g.stroke();
    dot(g, X(1), Y(1), 3, 'ink');
    glowDot(g, X(f.xT[0]), Y(f.xT[1]), 3.6, 'cos');
    txt(g, 'P', r.x + r.w - 6, r.y + 8, 'cos', { size: FS + 1, align: 'right', weight: 600 });
    txt(g, '−∇V', r.x + r.w - 6, r.y + 22, 'dim', { size: FS - 1, align: 'right' });
  }
  function drawThread(g, r) {
    const G = R.grover, h = G.h, ox = r.x + 10, oy = r.y + r.h - 10, rad = Math.min(r.w, r.h) - 26;
    const at = (a, rr = rad) => [ox + rr * Math.cos(a), oy - rr * Math.sin(a)];
    pen(g, 'faint', 0.8, 1); seg(g, ox, oy, ox + rad + 8, oy); seg(g, ox, oy, ox, oy - rad - 8);
    pen(g, 'edge', 1, 1); g.beginPath(); g.arc(ox, oy, rad, -HALF_PI, 0); g.stroke();
    txt(g, 'B', ox + rad + 12, oy, 'dim', { size: FS });
    txt(g, 'W', ox, oy - rad - 14, 'dim', { size: FS, align: 'center' });
    const pass = kind() === 'grover' ? S.pass : G.K;
    pen(g, 'cos', 0.75, 1.4); g.beginPath(); g.arc(ox, oy, rad, -Math.min(G.rows[pass].ang, HALF_PI), -G.rows[0].ang, false); g.stroke();
    G.rows.forEach((row) => { const p = at(row.ang); if (row.t < pass) dot(g, p[0], p[1], 2.2, 'cos'); else if (row.t > pass) dot(g, p[0], p[1], 1.8, 'faint'); });
    const p0 = at(G.rows[0].ang); pen(g, 'faint', 1, 1); seg(g, ox, oy, p0[0], p0[1]);
    const cur = at(G.rows[pass].ang); pen(g, 'now', 1, 2); seg(g, ox, oy, cur[0], cur[1]); glowDot(g, cur[0], cur[1], 4.2, 'now');
    txt(g, 'NP', r.x + r.w - 4, r.y + 8, 'wedge', { size: FS + 1, align: 'right', weight: 600 });
    txt(g, `2θ = ${fmt(2 * h.theta / DEG, 2)}°`, r.x + r.w - 4, r.y + 22, 'dim', { size: FS - 1, align: 'right' });
  }
  function drawProb(g, r) {
    const G = R.grover, KK = Math.max(1, G.K), X = (t) => r.x + 8 + t / KK * (r.w - 16), Y = (p) => r.y + r.h - 6 - p * (r.h - 16);
    frameBox(g, r);
    pen(g, 'faint', 0.5, 1, [2, 4]); seg(g, r.x, Y(1), r.x + r.w, Y(1)); g.setLineDash([]);
    const pts = []; for (let i = 0; i <= 200; i++) { const s = KK * i / 200; pts.push([X(s), Y(Math.sin((2 * s + 1) * G.h.theta) ** 2)]); }
    pen(g, 'cos', 0.35, 1); poly(g, pts); g.stroke();
    const pass = kind() === 'grover' ? S.pass : G.K;
    G.rows.forEach((row) => { if (row.t !== pass) dot(g, X(row.t), Y(row.P), 2, row.t < pass ? 'cos' : 'faint'); });
    const cr = G.rows[pass];
    pen(g, 'now', 0.6, 1, [3, 3]); seg(g, X(cr.t), Y(0), X(cr.t), Y(cr.P)); g.setLineDash([]);
    glowDot(g, X(cr.t), Y(cr.P), 4.2, 'now');
    txt(g, '0', r.x + 4, r.y + r.h + 8, 'dim', { size: FS - 1 });
    txt(g, `t* = ${G.K}`, r.x + r.w - 4, r.y + r.h + 8, 'dim', { size: FS - 1, align: 'right' });
    txt(g, 'P', r.x + 5, r.y + 9, 'dim', { size: FS - 1 });
    txt(g, '1', r.x + r.w - 6, Y(1) + 8, 'dim', { size: FS - 1, align: 'right' });
  }

  /* =============================== the Gram causal phase map (device pixels) =============================== */
  const heat = $('heat');
  let geom = null, base = null;
  /** RGB of one point of the map: cyan inside the lens (brighter deeper inside), magenta outside, fading with depth. */
  function lensPixels(img, pw, ph, t2) {
    const P = rgb255('cyan'), M = rgb255('magenta'), st = rgb255('stage'), d = img.data;
    const c2 = Math.cos(t2), s2 = Math.sin(t2), norm = Math.max(s2 * s2, 1e-9);
    for (let i = 0; i < pw; i++) {
      const t1 = (i + 0.5) / pw * Math.PI, c1 = Math.cos(t1), s1 = Math.sin(t1), ctr = c1 * c2, r2 = s1 * s1 * s2 * s2;
      for (let j = 0; j < ph; j++) {
        const c = 1 - 2 * (j + 0.5) / ph, det = r2 - (c - ctr) * (c - ctr), k = 4 * (j * pw + i);
        let C, a;
        if (det > 0) { C = P; a = 0.3 + 0.7 * Math.sqrt(det / norm); } else { C = M; a = 0.5 - 0.36 * Math.min(1, Math.sqrt(-det) * 1.6); }
        d[k] = Math.round(st[0] + (C[0] - st[0]) * a); d[k + 1] = Math.round(st[1] + (C[1] - st[1]) * a); d[k + 2] = Math.round(st[2] + (C[2] - st[2]) * a); d[k + 3] = 255;
      }
    }
  }
  function lensCanvas(pw, ph, t2) {
    const cv = document.createElement('canvas'); cv.width = Math.max(1, Math.round(pw)); cv.height = Math.max(1, Math.round(ph));
    const ctx = cv.getContext('2d'), img = ctx.createImageData(cv.width, cv.height);
    lensPixels(img, cv.width, cv.height, t2);
    ctx.putImageData(img, 0, 0);
    return cv;
  }
  /** The two boundary curves c = cos(θ₁ ∓ θ₂), where det G = 0. */
  function boundaryPaths(ctx, ox, oy, pw, ph, t2) {
    for (const sgn of [-1, 1]) {
      ctx.beginPath();
      for (let i = 0; i <= 360; i++) { const t1 = Math.PI * i / 360, x = ox + t1 / Math.PI * pw, y = oy + (1 - Math.cos(t1 + sgn * t2)) / 2 * ph; if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
      ctx.stroke();
    }
  }
  function drawHeat() {
    if (TRV.thumbMode) { drawCover(); return; }
    const dpr = TRV.fitCanvas(heat), ctx = heat.getContext('2d');
    const Wc = heat.width, Hc = heat.height;
    const pad = { l: 36 * dpr, r: 10 * dpr, t: 10 * dpr, b: 22 * dpr };
    const pw = Math.round(Wc - pad.l - pad.r), ph = Math.round(Hc - pad.t - pad.b), ox = Math.round(pad.l), oy = Math.round(pad.t);
    geom = { ox, oy, pw, ph, dpr };
    const t2 = R.t2, key = `${Wc}x${Hc}@${dpr}:${S.t2}`;
    if (!base || base.key !== key) base = { key, canvas: lensCanvas(pw, ph, t2) };
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = col('stage'); ctx.fillRect(0, 0, Wc, Hc);
    ctx.drawImage(base.canvas, ox, oy);
    ctx.save(); ctx.shadowColor = col('bound'); ctx.shadowBlur = 8 * dpr;
    ctx.strokeStyle = col('bound'); ctx.lineWidth = 2 * dpr; boundaryPaths(ctx, ox, oy, pw, ph, t2);
    ctx.restore();
    // ticks
    ctx.font = `${10 * dpr}px ${TRV.fonts.data}`; ctx.fillStyle = col('dim');
    ctx.textBaseline = 'top'; ctx.textAlign = 'center';
    for (const d of [0, 45, 90, 135, 180]) { const s = `${d}°`; ctx.fillText(s, ox + d / 180 * pw, oy + ph + 6 * dpr); labels.push(s); }
    ctx.textBaseline = 'middle'; ctx.textAlign = 'right';
    for (const c of [1, 0.5, 0, -0.5, -1]) { const s = neg(String(c)); ctx.fillText(s, ox - 6 * dpr, oy + (1 - c) / 2 * ph); labels.push(s); }
    // the current point: amber cross and box
    const px = ox + S.t1 / 180 * pw, py = oy + (1 - R.cAC) / 2 * ph, box = 11 * dpr;
    ctx.strokeStyle = col('now', 0.45); ctx.lineWidth = Math.max(1, dpr);
    ctx.beginPath(); ctx.moveTo(px, oy); ctx.lineTo(px, oy + ph); ctx.moveTo(ox, py); ctx.lineTo(ox + pw, py); ctx.stroke();
    ctx.strokeStyle = col('now'); ctx.lineWidth = 2 * dpr; ctx.shadowColor = col('now'); ctx.shadowBlur = 10 * dpr;
    ctx.strokeRect(px - box / 2, py - box / 2, box, box);
    ctx.shadowBlur = 0;
    const lf = lensFraction(t2), ok = Math.abs(lf.fraction - lf.exact) < 0.01;
    $('heatCounts').innerHTML = `θ₂ = ${S.t2}° · <span class="vpos">det G &gt; 0</span>: ${fmt(100 * lf.fraction, 1)}% · <span class="vneg">det G &lt; 0</span>: ${fmt(100 * lf.neg / (lf.M * lf.M), 1)}% — `
      + L(`${lf.M} × ${lf.M} 网格；解析值 2 sin θ₂ / π = ${fmt(100 * lf.exact, 1)}% `, `${lf.M} × ${lf.M} grid; exact 2 sin θ₂ / π = ${fmt(100 * lf.exact, 1)}% `) + mark(ok);
    $('heatRange').textContent = `180° × [${MINUS}1, 1]`;
    const hv = S.hover;
    if (hv) {
      const d = gramDeterminant(Math.cos(hv[0] * DEG), Math.cos(t2), hv[1]), s = sgnOf(d);
      $('heatHover').innerHTML = `${L('指针', 'pointer')} θ₁ = ${hv[0]}°, c<sub>AC</sub> = ${fmt(hv[1], 3)} → det G = <span class="${signCls(s)}">${fmtSigned(d)}</span>`;
    } else $('heatHover').innerHTML = '&nbsp;';
  }
  /** Thumbnail cover (?thumb=1): the phase map beside the de-ordered ledger of the current triple. No words, so one cover
      serves both languages; only digits, symbols and the row numbers. */
  function drawCover() {
    TRV.fitCanvas(heat);
    const ctx = heat.getContext('2d'), Wc = heat.width, Hc = heat.height, u = Hc / 720, mono = TRV.fonts.data;
    geom = null;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = col('stage'); ctx.fillRect(0, 0, Wc, Hc);
    const glow = ctx.createRadialGradient(Wc * 0.28, Hc * 0.5, 0, Wc * 0.28, Hc * 0.5, Wc * 0.55);
    glow.addColorStop(0, col('cos', 0.08)); glow.addColorStop(1, col('cos', 0));
    ctx.fillStyle = glow; ctx.fillRect(0, 0, Wc, Hc);
    // the phase map
    const side = Math.round(600 * u), ox = Math.round(64 * u), oy = Math.round((Hc - side) / 2);
    ctx.drawImage(lensCanvas(side, side, R.t2), ox, oy);
    ctx.save(); ctx.shadowColor = col('bound'); ctx.shadowBlur = 14 * u; ctx.strokeStyle = col('bound'); ctx.lineWidth = 3 * u;
    boundaryPaths(ctx, ox, oy, side, side, R.t2); ctx.restore();
    const px = ox + S.t1 / 180 * side, py = oy + (1 - R.cAC) / 2 * side, box = 26 * u;
    ctx.strokeStyle = col('now', 0.5); ctx.lineWidth = 1.5 * u;
    ctx.beginPath(); ctx.moveTo(px, oy); ctx.lineTo(px, oy + side); ctx.moveTo(ox, py); ctx.lineTo(ox + side, py); ctx.stroke();
    ctx.strokeStyle = col('now'); ctx.lineWidth = 3 * u; ctx.shadowColor = col('now'); ctx.shadowBlur = 16 * u;
    ctx.strokeRect(px - box / 2, py - box / 2, box, box); ctx.shadowBlur = 0;
    // the de-ordered ledger
    const G = R.taylor;
    const rows = [{ lab: 'θ', cells: ['', ...G.thetas.map((t, i) => ({ v: t, cls: i === 2 && R.status < 0 ? 'd2' : 'd1' })), ''], sep: true },
      ...G.rows.map((r) => ({ lab: '#' + r.k, k: r.k, sign: r.sign, cells: [{ v: r.orders, ord: true }, ...r.c.map((x, i) => ({ v: x, cls: Math.abs(x) > 1 ? 'd2' : 'd1', touch: r.k > 0 && r.touch[i] })), { v: r.det, cls: r.sign > 0 ? 'd1' : r.sign < 0 ? 'd2' : 'd0', touch: r.k > 0 && r.touch[3] }] }))];
    const x0 = 760 * u, labW = 58 * u, cellW = (Wc - x0 - labW - 100 * u) / 5, rowH = Math.min(50 * u, side / rows.length);
    const y0 = oy + (side - rows.length * rowH) / 2, cellH = rowH * 0.78;
    ctx.textBaseline = 'middle';
    rows.forEach((r, k) => {
      const y = y0 + k * rowH, cy = y + rowH / 2, last = k === rows.length - 1;
      if (r.sep) { ctx.strokeStyle = col('hot'); ctx.setLineDash([4 * u, 4 * u]); ctx.beginPath(); ctx.moveTo(x0, y + rowH); ctx.lineTo(x0 + labW + 5 * cellW + 90 * u, y + rowH); ctx.stroke(); ctx.setLineDash([]); }
      ctx.font = `${15 * u}px ${mono}`; ctx.fillStyle = last ? col('now') : col('dim'); ctx.textAlign = 'left';
      ctx.fillText(r.lab, x0, cy);
      r.cells.forEach((c, i) => {
        const x = x0 + labW + i * cellW;
        if (!c) return;
        if (c.cls === 'd1' || c.cls === 'd2') { ctx.fillStyle = c.cls === 'd2' ? col('wedge', 0.2) : col('cos', 0.14); ctx.fillRect(x + 2 * u, y + (rowH - cellH) / 2, cellW - 4 * u, cellH); }
        if (c.touch) { ctx.strokeStyle = last ? col('now') : col('cos', 0.5); ctx.lineWidth = 1.5 * u; ctx.strokeRect(x + 2 * u, y + (rowH - cellH) / 2, cellW - 4 * u, cellH); }
        const s = c.ord ? fmtBig(c.v) : fmtCell(c.v);
        ctx.font = `${c.ord ? 400 : c.cls === 'd2' ? 600 : 400} ${(c.ord ? 13 : 15) * u}px ${mono}`; ctx.textAlign = 'center';
        ctx.fillStyle = c.ord ? col('crystal') : c.cls === 'd2' ? col('wedge') : c.cls === 'd1' ? (last ? col('now') : col('ink')) : col('faint');
        ctx.fillText(s, x + cellW / 2, cy + 1 * u);
      });
      if (r.sign !== undefined) {
        const bx = x0 + labW + 5 * cellW + 14 * u, role = r.sign > 0 ? 'cos' : r.sign < 0 ? 'wedge' : 'faint';
        ctx.strokeStyle = r.sign ? col(role) : col('edge'); ctx.lineWidth = 1.5 * u; ctx.strokeRect(bx, cy - 13 * u, 50 * u, 26 * u);
        ctx.font = `600 ${15 * u}px ${mono}`; ctx.fillStyle = col(role); ctx.textAlign = 'center'; ctx.fillText(sgnTxt(r.sign), bx + 25 * u, cy + 1 * u);
      }
      if (last) {
        ctx.strokeStyle = col('now'); ctx.lineWidth = 2 * u; ctx.shadowColor = col('now'); ctx.shadowBlur = 12 * u;
        ctx.strokeRect(x0 - 12 * u, y + 2 * u, labW + 5 * cellW + 90 * u, rowH - 4 * u); ctx.shadowBlur = 0;
      }
    });
  }
  function pointAt(ev) {
    if (!geom) return null;
    const r = heat.getBoundingClientRect(), d = geom.dpr;
    const px = (ev.clientX - r.left) * d, py = (ev.clientY - r.top) * d;
    const fx = (px - geom.ox) / geom.pw, fy = (py - geom.oy) / geom.ph;
    if (fx < 0 || fx > 1 || fy < 0 || fy > 1) return null;
    return [clamp(Math.round(fx * 180), 0, 180), clamp(Math.round((1 - 2 * fy) * 1000) / 1000, -1, 1)];
  }
  let dragging = false, downAt = null;
  heat.addEventListener('pointerdown', (ev) => {
    downAt = [ev.clientX, ev.clientY];
    if (ev.pointerType === 'mouse') { dragging = true; heat.setPointerCapture(ev.pointerId); const p = pointAt(ev); if (p) setPoint(p[0], p[1]); }
  });
  heat.addEventListener('pointermove', (ev) => {
    const p = pointAt(ev);
    S.hover = p; if (dragging && p) setPoint(p[0], p[1]); else schedule();
  });
  heat.addEventListener('pointerup', (ev) => {
    if (!dragging && downAt && Math.hypot(ev.clientX - downAt[0], ev.clientY - downAt[1]) < 8) { const p = pointAt(ev); if (p) setPoint(p[0], p[1]); }
    dragging = false; downAt = null;
  });
  heat.addEventListener('pointercancel', () => { dragging = false; downAt = null; });
  heat.addEventListener('pointerleave', () => { S.hover = null; schedule(); });

  /* =============================== render loop (batched in one animation frame) =============================== */
  function presetMatches(p) {
    return Object.entries(p).every(([k, v]) => (k === 'c' ? S.c === v : S[k] === v)) && (p.phi === undefined || S.c === null);
  }
  function render() {
    pending = false;
    roleUse.clear();
    fresh();
    S.pass = clamp(S.pass, 0, K());
    const key = `${R.key}|${S.view}|${TRV.lang()}`;
    if (key !== built) { buildLedger(); readouts(); built = key; }
    markLedger();
    for (const k of ['t1', 't2']) { $(k).value = $(k + 'Num').value = String(S[k]); $(k + 'Dec').disabled = S[k] <= 0; $(k + 'Inc').disabled = S[k] >= 180; }
    $('phi').value = String(S.phi); $('phiNum').value = fmt(S.phi, 1).replace(MINUS, '-');
    $('phiDec').disabled = S.phi <= 0 && S.c === null; $('phiInc').disabled = S.phi >= 180 && S.c === null;
    document.querySelectorAll('#presets [data-preset]').forEach((b) => b.setAttribute('aria-pressed', String(presetMatches(PRESETS[b.dataset.preset]))));
    document.querySelectorAll('#viewChips [data-view-set]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.viewSet === S.view)));
    document.querySelectorAll('#nChips [data-t2]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.t2 === S.t2)));
    document.querySelectorAll('#qChips [data-n]').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.n === S.n)));
    $('play').setAttribute('aria-pressed', String(S.playing));
    $('play').textContent = S.playing ? '❚❚' : '▶';
    drawStage();
    drawHeat();
    frames++;
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(render); } }

  /* =============================== state changes =============================== */
  /** Set θ₁, θ₂ (degrees), φ (degrees) or a direct c_AC; a direct c_AC inside the window becomes an azimuth again. */
  function setTri(o) {
    const t1 = o.t1 !== undefined ? toDeg(o.t1, S.t1) : S.t1, t2 = o.t2 !== undefined ? toDeg(o.t2, S.t2) : S.t2;
    let phi = S.phi, c = S.c;
    if (o.phi !== undefined) { phi = toPhi(o.phi, S.phi); c = null; }
    if (o.c !== undefined) c = o.c === null ? null : toC(o.c);
    if (c !== null) {
      const a = azimuthFromCAC(t1 * DEG, t2 * DEG, c);
      if (a !== null) { if (!Number.isNaN(a)) phi = toPhi(a / DEG, phi); c = null; }
    }
    const changed = t1 !== S.t1 || t2 !== S.t2 || phi !== S.phi || c !== S.c;
    S.t1 = t1; S.t2 = t2; S.phi = phi; S.c = c;
    if (changed) { stop(); S.pass = K(); }
    schedule();
  }
  const setPoint = (t1, c) => setTri({ t1, c });
  function setN(n) { const v = toN(n, S.n); if (v !== S.n) { S.n = v; stop(); if (kind() === 'grover') S.pass = K(); } schedule(); }
  function setView(v) {
    if (!VIEWS.includes(v) || v === S.view) { schedule(); return; }
    const before = kind();
    stop(); S.view = v;
    if (kind() !== before) S.pass = K();
    schedule();
  }
  function applyPreset(id) {
    const p = PRESETS[id]; if (!p) return;
    if (p.n !== undefined) setN(p.n);
    if (p.view) setView(p.view);
    if (p.t1 !== undefined) setTri(p);
  }
  function setPass(k) { S.pass = clamp(Math.round(k), 0, K()); schedule(); }

  /* ---------- playback ---------- */
  let timer = null;
  function stop() { if (timer) clearInterval(timer); timer = null; S.playing = false; }
  function play() {
    if (!K()) return;
    if (S.pass >= K()) S.pass = 0;
    S.playing = true;
    timer = setInterval(() => {
      if (S.pass >= K()) {
        stop();
        const G = LG(), last = G.rows[G.K];
        TRV.toast($('toast'), kind() === 'taylor'
          ? L(`去序完成：${G.K} 阶后 det G⁽ᴷ⁾ = <b>${fmtSigned(last.det)}</b>，与精确值 ${fmtSigned(R.det)} 一致`, `De-ordering done: after ${G.K} orders det G⁽ᴷ⁾ = <b>${fmtSigned(last.det)}</b>, equal to the exact ${fmtSigned(R.det)}`)
          : L(`走完 t* = ${G.K} 步：P = <b>${fmt(last.P)}</b>，√N = ${fmt(G.h.sqrtN, 2)}`, `t* = ${G.K} steps walked: P = <b>${fmt(last.P)}</b>, √N = ${fmt(G.h.sqrtN, 2)}`));
        schedule();
        return;
      }
      S.pass++;
      schedule();
    }, TRV.reduceMotion ? 900 : 650);
    schedule();
  }

  /* =============================== controls =============================== */
  for (const k of ['t1', 't2', 'phi']) {
    const step = 1;
    $(k).addEventListener('input', (ev) => setTri({ [k]: ev.target.value }));
    $(k + 'Num').addEventListener('change', (ev) => setTri({ [k]: ev.target.value }));
    $(k + 'Num').addEventListener('keydown', (ev) => { if (ev.key === 'Enter') ev.target.blur(); });
    $(k + 'Dec').addEventListener('click', () => setTri({ [k]: S[k] - step }));
    $(k + 'Inc').addEventListener('click', () => setTri({ [k]: S[k] + step }));
  }
  document.querySelectorAll('#presets [data-preset]').forEach((b) => b.addEventListener('click', () => applyPreset(b.dataset.preset)));
  $('swap').addEventListener('click', () => setTri({ t1: S.t2, t2: S.t1 }));
  $('random').addEventListener('click', () => setTri({ t1: Math.floor(rng() * 181), t2: Math.floor(rng() * 181), phi: Math.round(rng() * 1800) / 10 }));
  $('reset').addEventListener('click', () => { setN(DEFAULTS.n); setView(DEFAULTS.view); setTri({ t1: DEFAULTS.t1, t2: DEFAULTS.t2, phi: DEFAULTS.phi }); });
  document.querySelectorAll('#viewChips [data-view-set]').forEach((b) => b.addEventListener('click', () => setView(b.dataset.viewSet)));
  document.querySelectorAll('#nChips [data-t2]').forEach((b) => b.addEventListener('click', () => setTri({ t2: +b.dataset.t2 })));
  document.querySelectorAll('#qChips [data-n]').forEach((b) => b.addEventListener('click', () => setN(+b.dataset.n)));
  $('first').addEventListener('click', () => { stop(); setPass(0); });
  $('prev').addEventListener('click', () => { stop(); setPass(S.pass - 1); });
  $('next').addEventListener('click', () => { stop(); setPass(S.pass + 1); });
  $('last').addEventListener('click', () => { stop(); setPass(K()); });
  $('play').addEventListener('click', () => { if (S.playing) { stop(); schedule(); } else play(); });
  $('pass').addEventListener('input', (ev) => { stop(); setPass(+ev.target.value); });
  $('ledger').addEventListener('click', (ev) => { const row = ev.target.closest('.drow[data-pass]'); if (row) { stop(); setPass(+row.dataset.pass); } });
  $('tape').addEventListener('click', (ev) => { const t = ev.target.closest('i[data-pass]'); if (t) { stop(); setPass(+t.dataset.pass); } });
  document.addEventListener('keydown', (ev) => {
    if (ev.altKey || ev.ctrlKey || ev.metaKey) return;
    const t = ev.target;
    if (t && (t.closest('input, textarea, select, [contenteditable]') || !$('drawer').hidden)) return;
    if (ev.key === 'ArrowLeft') { stop(); setPass(S.pass - 1); ev.preventDefault(); }
    else if (ev.key === 'ArrowRight') { stop(); setPass(S.pass + 1); ev.preventDefault(); }
    else if (ev.key === 'Home') { stop(); setPass(0); ev.preventDefault(); }
    else if (ev.key === 'End') { stop(); setPass(K()); ev.preventDefault(); }
    else if (ev.key === ' ' && !(t && t.closest('button, a'))) { if (S.playing) { stop(); schedule(); } else play(); ev.preventDefault(); }
    else if (ev.key >= '1' && ev.key <= '3') setView(VIEWS[+ev.key - 1]);
    else if (ev.key === 's' || ev.key === 'S') $('swap').click();
    else if (ev.key === 'r' || ev.key === 'R') $('random').click();
  });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch($('app'));
  TRV.onLang(() => { built = ''; schedule(); });
  window.addEventListener('resize', schedule);
  if ('ResizeObserver' in window) { const ro = new ResizeObserver(schedule); ro.observe(heat); ro.observe(stageCv); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => schedule());

  /* ---------- start: ?t1=&t2=&phi= (degrees), c= (a direct c_AC), n=, view=gram|book|field, preset= ---------- */
  {
    const q = new URLSearchParams(location.search), o = {};
    for (const k of ['t1', 't2', 'phi']) if (q.get(k) !== null) o[k] = q.get(k);
    if (q.get('c') !== null && toC(q.get('c')) !== null) o.c = q.get('c');
    if (q.get('n') !== null) S.n = toN(q.get('n'), S.n);
    if (VIEWS.includes(q.get('view'))) S.view = q.get('view');
    setTri(o);
    if (PRESETS[q.get('preset')]) applyPreset(q.get('preset'));
    S.pass = K();
  }
  schedule();

  /** Thumbnail cover (see drawCover), for θ₁ = 120°, θ₂ = 75°, φ = 60°: eleven orders, the first one breaches. */
  window.TRV_THUMB = () => new Promise((resolve) => {
    stop(); S.view = 'gram'; S.c = null; S.t1 = THUMB.t1; S.t2 = THUMB.t2; S.phi = THUMB.phi; S.pass = fresh().taylor.K; built = '';
    schedule();
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });

  /** Read-only probe for the browser tests (tests/timeless-causal-crystal.test.mjs). */
  const clone = (x) => JSON.parse(JSON.stringify(x));
  window.TCC_DEBUG = Object.freeze({
    frames: () => frames,
    pending: () => pending,
    state: () => ({ t1: S.t1, t2: S.t2, phi: S.phi, c: S.c, n: S.n, view: S.view, pass: S.pass, passes: K(), kind: kind(), playing: S.playing }),
    info: () => { fresh(); return clone({ cAB: R.w.c1, cBC: R.w.c2, cAC: R.cAC, lo: R.w.lo, hi: R.w.hi, center: R.w.center, slack: R.w.slack, det: R.det, detGeneral: R.detGeneral, status: R.status, phiMode: R.phiMode, order: R.order, signal: { delta: R.signal.delta, shiftPlus: R.signal.shiftPlus, pPlus: R.signal.pPlus }, tri: R.tri }); },
    ledger: () => { const G = LG(); return clone(G.kind === 'taylor' ? { kind: G.kind, K: G.K, thetas: G.thetas, rows: G.rows.map((r) => ({ k: r.k, orders: r.orders, c: r.c, det: r.det, sign: r.sign })) } : { kind: G.kind, K: G.K, rows: G.rows.map((r) => ({ t: r.t, ang: r.ang, a: r.a, P: r.P, sign: r.sign, sim: r.sim, dev: r.dev })) }); },
    taylorLedger: (t1, t2, c) => clone(taylorLedger(+t1, +t2, +c)),
    grover: (n) => { const G = groverLedger(clamp(Math.round(+n), N_MIN, N_MAX)), s = groverSim(G.h.n); return clone({ h: G.h, K: G.K, rows: G.rows.map((r) => ({ t: r.t, a: r.a, P: r.P, sign: r.sign, sim: r.sim, dev: r.dev })), sim: { target: Array.from(s.target), worst: s.worst, tMax: tMaxOf(G.h.n) } }); },
    set: (o) => setTri(o || {}),
    setPoint: (t1, c) => setPoint(t1, c),
    setN: (n) => setN(n),
    view: (v) => setView(v),
    rail: (k) => setPass(+k),
    cellPoint: (t1, c) => { if (!geom) return null; const r = heat.getBoundingClientRect(), d = geom.dpr; return { x: r.left + (geom.ox + t1 / 180 * geom.pw) / d, y: r.top + (geom.oy + (1 - c) / 2 * geom.ph) / d }; },
    lens: (t2) => clone(lensFraction(+t2 * DEG)),
    constants: () => ({ N, thetaStar: THETA_STAR, pages: PAGES.slice(), nMin: N_MIN, nMax: N_MAX, defaults: { ...DEFAULTS }, presets: clone(PRESETS), boundaryPage: BOUNDARY_PAGE }),
    crystal: () => clone(CRYSTAL),
    hNorm: () => H_NORM,
    slice: (t) => clone(slice(CRYSTAL, +t)),
    reading: () => clone({ ltr: READ_LTR, rtl: READ_RTL, gap: READ_GAP, boundaryGap: BOUNDARY_GAP }),
    pinch: () => clone(pinchStats()),
    pageConditional: () => clone(pageConditional()),
    record: () => clone(recordStats()),
    permutations: (n) => countPermutations(clamp(Math.round(+n), 1, 8)),
    triad: (ab, bc, phi) => clone(triad(+ab, +bc, +phi)),
    permDets: (ab, bc, phi) => { const tr = triad(+ab, +bc, +phi); return Object.keys(PERMS).map((k) => det3(permGram(tr, k))); },
    lagrange: (u, v) => lagrange(u, v),
    dissipation: () => { const f = dissipation(); return clone({ T: f.T, xT: f.xT, V0: f.V0, VT: f.VT, drop: f.drop, integral: f.integral, relErr: f.relErr }); },
    noSignaling: (t1, t2, phi) => clone(noSignaling(+t1, +t2, +phi)),
    factorial: (n) => factorial(+n),
    cosTaylorSeries: (t, k) => clone(cosTaylorSeries(+t, Math.round(+k))),
    sinTaylorSeries: (t, k) => clone(sinTaylorSeries(+t, Math.round(+k))),
    gramDeterminant: (a, b, c) => gramDeterminant(+a, +b, +c),
    causalWindow: (t1, t2) => clone(causalWindow(+t1, +t2)),
    cACFromAzimuth: (t1, t2, phi) => cACFromAzimuth(+t1, +t2, +phi),
    azimuthFromCAC: (t1, t2, c) => azimuthFromCAC(+t1, +t2, +c),
    groverHorizon: (n) => groverHorizon(+n),
    labels: () => labels.slice(),
    roles: () => { const o = {}; for (const [k, v] of roleUse) o[k] = [...v]; return o; },
    palette: () => ({ amber: String(TRV.palette.amber).toLowerCase(), ok: String(TRV.palette.ok).toLowerCase() })
  });
})();
