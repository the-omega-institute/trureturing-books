/* GOD//PSYCHE · 上帝心理学动力学沙盘 · The psychology of God (Chapter 38, §38.11)
   World (kit.solid): z up. The surface z = 0 is the translucent violet repression membrane Σ_rep (radius 1.24, more
   opaque as η grows). Above it, the conscious side: eight alters a_k (k = 0 … 7, φ_k = πk/4) at
     R_alt(θ) = 0.96 sin θ,  z_alt(θ) = 0.16 + 0.42 cos θ,
   one frozen sphere at θ = 0°. Below it, the sub-surface sea: a paraboloid basin (drawn as a cutaway: only the part
   seen from inside, so it never hides what is in it) and on its floor the sculpted mother core I at (0, 0, −0.58),
   radius 0.22; one root per alter (a cubic Bézier tube) dives through the membrane into the core; the silver real
   axis runs through everything. Amber is kept for the alter at the front (k₀) and its root; the other roots are cyan.
     partial trace   |ψ⟩ = cos θ|0⟩|E₀⟩ + sin θ|1⟩|E₁⟩ with ⟨E₀|E₁⟩ = 1 − η; ρ_A = Tr_Ā|ψ⟩⟨ψ| has Bloch vector
                     (x, z) = ((1 − η) sin 2θ, cos 2θ), r = √(x² + z²), S_rep = H₂((1 + r)/2), I(A:Ā) = 2S_rep;
                     at η = 1, S_A = H₂(cos²θ).
     fixed point     θ* = cos θ* (bisection); the severed-arc phantom tension T = η sin θ · (M/12) · |cos θ − θ|
                     draws magenta stubs on the arcs between neighbouring alters, as long as T is large; the cyan
                     Līlā bridges have opacity exp(−(|cos θ − θ|/0.01)²) (MODEL).
     manas / Schur   the mother core I and M records u_i with ⟨u_i, u_j⟩ = ½, ⟨I, u_i⟩ = √(13/24): the best
                     reconstruction leaves Δ_Schur(M) = 1 − Bᴴ G_M⁻¹ B, solved here as an M × M linear system, equal
                     to (12 − M)/(12(M + 1)); D_eff = 12. Collars cover M/12 of a turn; the violet slack ring widens
                     with Δ_Schur.
     Gram            a_k(θ) = (cos θ, sin θ cos φ_k, sin θ sin φ_k), G_jk = cos²θ + sin²θ cos(φ_j − φ_k): 1 class at
                     θ = 0°, 8 classes for θ > 0°, G₀₄ = cos 2θ.
   The rail τ ∈ [0, 1] turns the front: k₀ = ⌊8τ⌋ mod 8; θ, η and M do not move with it. Every number is computed here;
   the instances of the cited Lean theorems are checked in instances(). Read-only probe: window.DIVINE_PSYCHOLOGY_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180, LN2 = Math.LN2;

  /* ---------- constants of the model and of the drawing ---------- */
  const N_ALT = 8, D_EFF = 12, RHO = 0.5, GAMMA = Math.sqrt(13 / 24);
  const CORE = [0, 0, -0.58], R_CORE = 0.22, R_MEM = 1.24, SEA = 0.98, R_ALT = 0.085, R_MERGED = 0.11;
  const SPINE = [-0.86, 0.8], COLLAR = 0.145, T_FULL = PI / 2, HEAL = 0.01;
  const CAMS = { panorama: [-0.62, 0.32, 1.0], surface: [-0.4, 1.12, 1.02], roots: [-0.58, -0.74, 1.04] };
  const PHI = Array.from({ length: N_ALT }, (_, k) => PI * k / 4);

  /* ---------- small vectors and matrices ---------- */
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const unit = (a) => scale(a, 1 / Math.hypot(a[0], a[1], a[2]));
  const lerp = (a, b, t) => a * (1 - t) + b * t;
  const range = (a, b, n) => Array.from({ length: n + 1 }, (_, j) => a + (b - a) * j / n);
  const zeros = (n, m) => Array.from({ length: n }, () => new Array(m).fill(0));
  const matMul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
  const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
  const maxDiff = (A, B) => { const a = A.flat(), b = B.flat(); return a.reduce((m, x, i) => Math.max(m, Math.abs(x - b[i])), 0); };
  const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  const kron = (A, B) => { const n = A.length, m = B.length, K = zeros(n * m, n * m); for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let k = 0; k < m; k++) for (let l = 0; l < m; l++) K[i * m + k][j * m + l] = A[i][j] * B[k][l]; return K; };
  /** Gaussian elimination with partial pivoting: the solution of A x = b. */
  function solve(A, b) {
    const n = b.length, M = A.map((r, i) => [...r, b[i]]);
    for (let c = 0; c < n; c++) {
      let p = c;
      for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
      [M[c], M[p]] = [M[p], M[c]];
      for (let r = c + 1; r < n; r++) { const f = M[r][c] / M[c][c]; for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k]; }
    }
    const x = new Array(n).fill(0);
    for (let r = n - 1; r >= 0; r--) { let s = M[r][n]; for (let k = r + 1; k < n; k++) s -= M[r][k] * x[k]; x[r] = s / M[r][r]; }
    return x;
  }
  /** Whether a symmetric matrix is positive definite (a Cholesky factorization goes through). */
  function positiveDefinite(A) {
    const n = A.length, Lc = zeros(n, n);
    for (let i = 0; i < n; i++) for (let j = 0; j <= i; j++) {
      let s = A[i][j];
      for (let k = 0; k < j; k++) s -= Lc[i][k] * Lc[j][k];
      if (i === j) { if (s <= 0) return false; Lc[i][i] = Math.sqrt(s); } else Lc[i][j] = s / Lc[j][j];
    }
    return true;
  }
  /** Eigenvalues of a real symmetric matrix by cyclic Jacobi rotations, in decreasing order. */
  function jacobi(A0) {
    const n = A0.length, A = A0.map((r) => r.slice());
    for (let sweep = 0; sweep < 80; sweep++) {
      let off = 0;
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += A[i][j] * A[i][j];
      if (off < 1e-30) break;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
        if (Math.abs(A[p][q]) < 1e-300) continue;
        const th = (A[q][q] - A[p][p]) / (2 * A[p][q]);
        const t = (th >= 0 ? 1 : -1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < n; k++) { const akp = A[k][p], akq = A[k][q]; A[k][p] = c * akp - s * akq; A[k][q] = s * akp + c * akq; }
        for (let k = 0; k < n; k++) { const apk = A[p][k], aqk = A[q][k]; A[p][k] = c * apk - s * aqk; A[q][k] = s * apk + c * aqk; }
      }
    }
    return A.map((r, i) => r[i]).sort((a, b) => b - a);
  }
  const eig2 = (m) => { const tr = m[0][0] + m[1][1], det = m[0][0] * m[1][1] - m[0][1] * m[1][0], d = Math.sqrt(Math.max(0, tr * tr / 4 - det)); return [tr / 2 + d, tr / 2 - d]; };
  /** −Σ λ ln λ over the eigenvalues (nats). */
  const entropyOf = (lams) => lams.reduce((s, l) => (l > 1e-15 ? s - l * Math.log(l) : s), 0);
  /** Real.binEntropy: the binary entropy in nats. */
  const binEntropy = (p) => (p <= 0 || p >= 1 ? 0 : -p * Math.log(p) - (1 - p) * Math.log(1 - p));

  /* ---------- the model ---------- */
  function bisectFixedPoint() {
    let a = 0, b = 1;
    for (let i = 0; i < 80; i++) { const m = (a + b) / 2; if (Math.cos(m) - m > 0) a = m; else b = m; }
    return (a + b) / 2;
  }
  const THETA_STAR = bisectFixedPoint(), STAR_DEG = THETA_STAR / DEG;
  /** The slider's grid point nearest θ* (42.35) stands for θ* itself. */
  const snapDeg = (d) => (Math.abs(d - STAR_DEG) < 0.006 ? STAR_DEG : d);
  const H2 = (p) => binEntropy(p) / LN2;
  const blochR = (t, eta) => Math.sqrt(Math.cos(2 * t) ** 2 + (1 - eta) ** 2 * Math.sin(2 * t) ** 2);
  const sRep = (t, eta) => H2((1 + blochR(t, eta)) / 2);
  const sA = (t) => H2(Math.cos(t) ** 2);
  const residual = (t) => Math.abs(Math.cos(t) - t);
  const tension = (t, eta, M) => eta * Math.sin(t) * (M / D_EFF) * residual(t);
  /** Below this a computed quantity is 0 up to rounding (cos 90° is 6 × 10⁻¹⁷, not 0). */
  const NONZERO = 1e-12;
  /** The phantom tension is stated as 0 only when it rounds to 0 at six decimals. */
  const T_ZERO = 5e-7;
  /** T as the page states it: 0 below T_ZERO, else its value (four decimals, or six where four would round it to 0). */
  const tensionText = (T) => (Math.abs(T) < T_ZERO ? '0' : fix(T, Math.abs(T) >= 5e-5 ? 4 : 6));
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  /** A value to four decimals, or as m × 10ⁿ where four decimals would round a non-zero value to 0. */
  const num = (v) => {
    if (Math.abs(v) <= NONZERO || Math.abs(v) >= 5e-5) return fix(v, 4);
    const [m, e] = v.toExponential(1).split('e');
    return `${m.replace('-', '−')} × 10${[...String(Number(e))].map((ch) => SUP[ch]).join('')}`;
  };
  const schurClosed = (M) => (D_EFF - M) / (D_EFF * (M + 1));
  const altPos = (t, k) => [0.96 * Math.sin(t) * Math.cos(PHI[k]), 0.96 * Math.sin(t) * Math.sin(PHI[k]), 0.16 + 0.42 * Math.cos(t)];
  const altVec = (t, k) => [Math.cos(t), Math.sin(t) * Math.cos(PHI[k]), Math.sin(t) * Math.sin(PHI[k])];

  /* ---------- the Schur slack of the mother core, for every M (an M × M linear system each) ---------- */
  function schurInstance(M) {
    const G = Array.from({ length: M }, (_, i) => Array.from({ length: M }, (_, j) => (i === j ? 1 : RHO)));
    const B = new Array(M).fill(GAMMA);
    const a = M ? solve(G, B) : [];
    const slack = 1 - B.reduce((s, b, i) => s + b * a[i], 0);
    const Gy = (y) => G.map((r) => r.reduce((s, g, j) => s + g * y[j], 0));
    const q = (y) => { const gy = Gy(y); return 1 + 2 * B.reduce((s, b, i) => s + b * y[i], 0) + y.reduce((s, yi, i) => s + yi * gy[i], 0); };
    const y = a.map((x) => -x);                       // the minimizer y = −C⁻¹Bᴴx, x = 1
    let nearMin = Infinity;
    for (let i = 0; i < M; i++) for (const d of [-0.05, 0.05]) { const z = y.slice(); z[i] += d; nearMin = Math.min(nearMin, q(z)); }
    for (const d of [-0.05, 0.05]) nearMin = Math.min(nearMin, q(y.map((x) => x + d)));
    const ga = Gy(a);
    return { M, slack, closed: schurClosed(M), atMin: M ? q(y) : 1, nearMin: M ? nearMin : 1, posDef: M ? positiveDefinite(G) : true,
      residual: M ? Math.max(...ga.map((x, i) => Math.abs(x - B[i]))) : 0, coefficients: a };
  }
  const SCHUR = range(0, D_EFF, D_EFF).map((M) => schurInstance(M));
  const BEYOND = schurInstance(D_EFF + 1);            // a 13th record: the slack turns negative (−1/168)
  const FULL_GRAM = (() => {                          // the 13 × 13 Gram of I and 12 records: rank 12
    const K = zeros(D_EFF + 1, D_EFF + 1);
    for (let i = 0; i <= D_EFF; i++) for (let j = 0; j <= D_EFF; j++) K[i][j] = i === j ? 1 : (i === 0 || j === 0 ? GAMMA : RHO);
    const ev = jacobi(K);
    return { size: D_EFF + 1, smallest: ev[ev.length - 1], largest: ev[0], rank: ev.filter((x) => x > 1e-10).length };
  })();

  /* ---------- the fixed point: one sign change of cos t − t on (0, 10] ---------- */
  const DOTTIE = (() => {
    let changes = 0, prev = Math.cos(1e-3) - 1e-3, at = null;
    for (let i = 2; i <= 10000; i++) { const t = i * 1e-3, f = Math.cos(t) - t; if (Math.sign(f) !== Math.sign(prev)) { changes++; at = t; } prev = f; }
    return { theta: THETA_STAR, deg: STAR_DEG, residual: Math.cos(THETA_STAR) - THETA_STAR, signChanges: changes, bracket: at, inUnit: THETA_STAR > 0 && THETA_STAR < 1 };
  })();

  /* ---------- the Bell and classically correlated states of the blind-spot theorem (θ = 45°) ---------- */
  const PAULI = {
    I: [[[1, 0], [0, 0]], [[0, 0], [1, 0]]], X: [[[0, 0], [1, 0]], [[1, 0], [0, 0]]],
    Y: [[[0, 0], [0, -1]], [[0, 1], [0, 0]]], Z: [[[1, 0], [0, 0]], [[0, 0], [-1, 0]]]
  };
  const ckron = (A, B) => { const K = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => [0, 0])); for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) for (let k = 0; k < 2; k++) for (let l = 0; l < 2; l++) { const a = A[i][j], b = B[k][l]; K[2 * i + k][2 * j + l] = [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]]; } return K; };
  /** Tr(ρ O) for a real ρ and a complex O: [re, im]. */
  const traceWith = (rho, O) => { let re = 0, im = 0; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { re += rho[i][j] * O[j][i][0]; im += rho[i][j] * O[j][i][1]; } return [re, im]; };
  const AXES = ['X', 'Y', 'Z'];
  const LOCAL_A = AXES.map((a) => ckron(PAULI[a], PAULI.I)), LOCAL_B = AXES.map((b) => ckron(PAULI.I, PAULI[b]));
  const CORR = AXES.map((a) => AXES.map((b) => ckron(PAULI[a], PAULI[b])));
  function sectorOrthogonality() {
    const all = [...LOCAL_A, ...LOCAL_B, ...CORR.flat()];
    let off = 0, diag = 0;
    all.forEach((A, i) => all.forEach((Bm, j) => {
      let re = 0, im = 0;                           // Tr(A Bᴴ)
      for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const a = A[r][c], b = Bm[r][c]; re += a[0] * b[0] + a[1] * b[1]; im += a[1] * b[0] - a[0] * b[1]; }
      if (i === j) diag = Math.max(diag, Math.abs(re - 4)); else off = Math.max(off, Math.hypot(re, im));
    }));
    return { count: all.length, offDiagonal: off, diagonalError: diag };
  }
  const coordinates = (rho) => ({
    a: LOCAL_A.map((O) => traceWith(rho, O)), b: LOCAL_B.map((O) => traceWith(rho, O)), T: CORR.map((row) => row.map((O) => traceWith(rho, O)))
  });
  const traceEnv = (J) => [[J[0][0] + J[1][1], J[0][2] + J[1][3]], [J[2][0] + J[3][1], J[2][2] + J[3][3]]];
  const traceFirst = (J) => [[J[0][0] + J[2][2], J[0][1] + J[2][3]], [J[1][0] + J[3][2], J[1][1] + J[3][3]]];
  const outer = (v) => v.map((x) => v.map((y) => x * y));
  const BELL = (() => {
    const h = Math.SQRT1_2, bell = outer([h, 0, 0, h]), classical = [[0.5, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0.5]];
    const eb = jacobi(bell), ec = jacobi(classical), sq = matMul(classical, classical);
    return { bellEig: eb, classicalEig: ec, bellTrace: bell[0][0] + bell[1][1] + bell[2][2] + bell[3][3], classicalTrace: 1,
      bellRank: eb.filter((x) => x > 1e-12).length, classicalIdempotentGap: maxDiff(sq, classical),
      envGap: maxDiff(traceEnv(bell), traceEnv(classical)), firstGap: maxDiff(traceFirst(bell), traceFirst(classical)), stateGap: maxDiff(bell, classical),
      sectors: sectorOrthogonality(), dims: { localA: 3, localB: 3, correlation: 9, total: 15, share: 9 / 15 } };
  })();

  /* ---------- state ---------- */
  const S = { thetaDeg: STAR_DEG, eta: 1, M: 3, lens: 0, cam: 'panorama', tau: 0, from: null, blend: 1 };
  /** The values the page shows: the state, blended from the previous values during a transition. */
  function eff() {
    if (!S.from || S.blend >= 1) return { thetaDeg: S.thetaDeg, eta: S.eta, M: S.M };
    const b = S.blend, f = S.from;
    return { thetaDeg: lerp(f.thetaDeg, S.thetaDeg, b), eta: lerp(f.eta, S.eta, b), M: Math.round(lerp(f.M, S.M, b)) };
  }
  const frontOf = (tau) => Math.floor(N_ALT * tau + 1e-9) % N_ALT;

  /** Everything the page shows, from the state. */
  function model() {
    const e = eff(), t = e.thetaDeg * DEG, eta = e.eta, M = e.M;
    const x = (1 - eta) * Math.sin(2 * t), z = Math.cos(2 * t), r = Math.hypot(x, z);
    const Srep = H2((1 + r) / 2), SA = sA(t), res = residual(t), T = tension(t, eta, M);
    const merged = 0.96 * Math.sin(t) < 1e-6;
    return {
      thetaDeg: e.thetaDeg, theta: t, eta, M, k0: frontOf(S.tau), tau: S.tau, merged,
      overlap: 1 - eta, x, z, r, Srep, I: 2 * Srep, SA, IA: 2 * SA, cos2: Math.cos(t) ** 2, res, T, sinT: Math.sin(t),
      slack: SCHUR[M].slack, closed: schurClosed(M), healed: Math.exp(-((res / HEAL) ** 2)),
      alters: PHI.map((_, k) => altPos(t, k)), R: 0.96 * Math.sin(t), zAlt: 0.16 + 0.42 * Math.cos(t)
    };
  }

  /* ---------- the instances of the cited theorems ---------- */
  const instCache = new Map();
  function instances(Mo) {
    const key = `${Mo.thetaDeg}|${Mo.eta}|${Mo.M}`;
    if (instCache.has(key)) return instCache.get(key);
    const t = Mo.theta, c = Math.cos(t), s = Math.sin(t), ov = 1 - Mo.eta;
    // records below the surface and the partial trace over them (qubit_state_entropy, record complementarity)
    const E0 = [1, 0], E1 = [ov, Math.sqrt(Math.max(0, 1 - ov * ov))];
    const psi = [c * E0[0], c * E0[1], s * E1[0], s * E1[1]];          // index 2a + e
    const rhoA = [[psi[0] ** 2 + psi[1] ** 2, psi[0] * psi[2] + psi[1] * psi[3]], [psi[0] * psi[2] + psi[1] * psi[3], psi[2] ** 2 + psi[3] ** 2]];
    const rhoE = [[psi[0] ** 2 + psi[2] ** 2, psi[0] * psi[1] + psi[2] * psi[3]], [psi[0] * psi[1] + psi[2] * psi[3], psi[1] ** 2 + psi[3] ** 2]];
    const qx = 2 * rhoA[0][1], qz = rhoA[0][0] - rhoA[1][1], qr = Math.hypot(qx, qz), lam = eig2(rhoA);
    const qubit = { x: qx, z: qz, r: qr, inDisk: qx * qx + qz * qz <= 1 + 1e-12, eigen: lam, entropyNats: entropyOf(lam), formulaNats: binEntropy((1 + qr) / 2),
      bits: entropyOf(lam) / LN2, xResidual: Math.abs(qx - Mo.x), zResidual: Math.abs(qz - Mo.z) };
    qubit.residual = Math.abs(qubit.entropyNats - qubit.formulaNats);
    const overlap = dot(E0, E1), vis = Math.abs(overlap), dist = Math.sqrt(Math.max(0, 1 - vis * vis));
    const records = { E0, E1, norms: [Math.hypot(...E0), Math.hypot(...E1)], overlap, visibility: vis, distinguishability: dist, sum: dist * dist + vis * vis,
      coherence: rhoA[0][1], coherencePure: c * s };
    // the copy unitary on ρ = |ψ_θ⟩⟨ψ_θ| and σ = diag(cos²θ, sin²θ) (reduced_irreversibility_is_access_defect)
    const U = zeros(4, 4);
    for (let a = 0; a < 2; a++) for (let e = 0; e < 2; e++) U[2 * a + (e ^ a)][2 * a + e] = 1;
    const rho = [[c * c, c * s], [c * s, s * s]], sigma = [[c * c, 0], [0, s * s]];
    const blank = (m) => { const J = zeros(4, 4); for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) J[2 * a][2 * b] = m[a][b]; return J; };
    const record = (m) => { const J = zeros(4, 4); for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) J[2 * a + a][2 * b + b] = m[a][b]; return J; };
    const evolve = (V, J) => matMul(matMul(V, J), transpose(V));
    const access = { unitary: maxDiff(matMul(U, transpose(U)), eye(4)),
      writeRho: maxDiff(evolve(U, blank(rho)), record(rho)), writeSigma: maxDiff(evolve(U, blank(sigma)), record(sigma)),
      reducedGap: maxDiff(traceEnv(record(rho)), traceEnv(record(sigma))), jointGap: maxDiff(record(rho), record(sigma)),
      backRho: maxDiff(evolve(transpose(U), record(rho)), blank(rho)), backSigma: maxDiff(evolve(transpose(U), record(sigma)), blank(sigma)),
      diagonalGap: Math.max(Math.abs(rho[0][0] - sigma[0][0]), Math.abs(rho[1][1] - sigma[1][1])), coherenceGap: Math.abs(rho[0][1] - sigma[0][1]) };
    access.hypothesis = access.diagonalGap === 0 && access.coherenceGap > 1e-12;
    // marginal entropy changes and mutual information under U = controlled rotation · (R_y(2θ) ⊗ I)
    const alpha = Math.acos(clamp(ov, -1, 1));
    const ry = (phi) => [[Math.cos(phi / 2), -Math.sin(phi / 2)], [Math.sin(phi / 2), Math.cos(phi / 2)]];
    const CR = zeros(4, 4), Ra = ry(2 * alpha);
    CR[0][0] = 1; CR[1][1] = 1; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) CR[2 + i][2 + j] = Ra[i][j];
    const Uj = matMul(CR, kron(ry(2 * t), eye(2)));
    const rho0 = outer([1, 0, 0, 0]), rhoF = evolve(Uj, rho0);
    const info = (J) => { const sa = entropyOf(eig2(traceEnv(J))) / LN2, se = entropyOf(eig2(traceFirst(J))) / LN2, sj = entropyOf(jacobi(J).map((x) => Math.max(0, x))) / LN2; return { sa, se, sj, I: sa + se - sj }; };
    const i0 = info(rho0), i1 = info(rhoF);
    const mutual = { unitary: maxDiff(matMul(Uj, transpose(Uj)), eye(4)), initial: i0, final: i1,
      lhs: (i1.se - i0.se) + (i1.sa - i0.sa), rhs: i1.I - i0.I, stateGap: maxDiff(rhoF, outer(psi)) };
    mutual.residual = Math.abs(mutual.lhs - mutual.rhs);
    // local marginals against correlations, at the current θ: the reference of the theorem is the η = 1 Schmidt state
    // cos θ|00⟩ + sin θ|11⟩ and its classical shadow diag(cos²θ, 0, 0, sin²θ), which share their marginals and differ in
    // T_xx = sin 2θ and T_yy = −sin 2θ; the actual state at η < 1 has the marginal ρ_A, whose off-diagonal (1 − η) cos θ sin θ
    // the shadow does not have
    const pure = outer([c, 0, 0, s]), shadow = [[c * c, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, s * s]];
    const cp = coordinates(pure), cs = coordinates(shadow);
    const re = (v) => v[0], imag = (v) => Math.abs(v[1]);
    const blind = { localGap: Math.max(...cp.a.map((v, i) => Math.abs(re(v) - re(cs.a[i]))), ...cp.b.map((v, i) => Math.abs(re(v) - re(cs.b[i])))),
      imaginary: Math.max(...[...cp.a, ...cp.b, ...cp.T.flat(), ...cs.a, ...cs.b, ...cs.T.flat()].map(imag)),
      local: cp.a.map(re).concat(cp.b.map(re)), corrPure: cp.T.map((r) => r.map(re)), corrShadow: cs.T.map((r) => r.map(re)),
      marginalGap: Math.max(maxDiff(traceEnv(pure), traceEnv(shadow)), maxDiff(traceFirst(pure), traceFirst(shadow))) };
    blind.corrGap = blind.corrPure.map((r, i) => r.map((v, j) => v - blind.corrShadow[i][j]));
    blind.txx = blind.corrGap[0][0]; blind.tyy = blind.corrGap[1][1];
    blind.marginalOff = rhoA[0][1]; blind.shadowOff = traceEnv(shadow)[0][1];
    blind.marginalDiffers = Math.abs(blind.marginalOff - blind.shadowOff) > NONZERO;
    blind.correlated = Math.abs(blind.txx) > NONZERO || Math.abs(blind.tyy) > NONZERO;
    // the Gram of the eight alters (unit_gram_overlap_characterization)
    const vecs = PHI.map((_, k) => altVec(t, k)), G = vecs.map((a) => vecs.map((b) => dot(a, b)));
    const same = (i, j) => Math.abs(G[i][j] - 1) <= 1e-12;
    const label = new Array(N_ALT).fill(-1);
    let classes = 0;
    for (let i = 0; i < N_ALT; i++) if (label[i] < 0) { for (let j = i; j < N_ALT; j++) if (label[j] < 0 && same(i, j)) label[j] = classes; classes++; }
    let within = 0, across = Infinity, transitive = true;
    for (let i = 0; i < N_ALT; i++) for (let j = 0; j < N_ALT; j++) {
      const d = Math.hypot(...sub(vecs[i], vecs[j]));
      if (label[i] === label[j]) within = Math.max(within, d); else across = Math.min(across, d);
      for (let k = 0; k < N_ALT; k++) if (same(i, j) && same(j, k) && !same(i, k)) transitive = false;
    }
    const gram = { G, vectors: vecs, norms: vecs.map((v) => Math.hypot(...v)), classes, labels: label, within, across: Number.isFinite(across) ? across : null,
      reflexive: PHI.every((_, i) => same(i, i)), symmetric: G.every((r, i) => r.every((g, j) => Math.abs(g - G[j][i]) < 1e-15)), transitive,
      formula: Math.max(...G.flatMap((r, j) => r.map((g, k) => Math.abs(g - (Math.cos(t) ** 2 + Math.sin(t) ** 2 * Math.cos(PHI[j] - PHI[k])))))),
      G04: G[0][4], cos2theta: Math.cos(2 * t) };
    const out = { dottie: DOTTIE, qubit, records, access, mutual, blind, bell: BELL, schur: SCHUR[Mo.M], beyond: { M: BEYOND.M, slack: BEYOND.slack }, fullGram: FULL_GRAM, gram };
    instCache.set(key, out);
    if (instCache.size > 60) instCache.delete(instCache.keys().next().value);
    return out;
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probeEl = document.createElement('div'); probeEl.hidden = true; probeEl.style.position = 'absolute'; tagBox.appendChild(probeEl);
  const options = { canvas: $('cv'), yaw: CAMS.panorama[0], pitch: CAMS.panorama[1], zoom: CAMS.panorama[2], wheel: false, radius: 0.32, cx: 0.5, cy: 0.5,
    onChange: () => paint(), onPick: (ev, s) => pickAlter(ev, s) };
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
    for (const el of [$('hudTl'), $('legend')]) { const b = boxOf(el, sr); if (b && el.textContent.trim()) out.push(b); }
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
    let s = sizes.get(k);
    if (!s) { probeEl.className = 'tag ' + cls; probeEl.innerHTML = html; probeEl.hidden = false; s = [probeEl.offsetWidth, probeEl.offsetHeight]; probeEl.hidden = true; if (s[0] > 0) sizes.set(k, s); }
    return s;
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
      for (const r of [l.r, l.r + 10, l.r + 24, l.r + 40, l.r + 60]) for (const da of [0, 0.5, -0.5, 1.0, -1.0, 1.6, -1.6, 2.3, -2.3, PI]) {
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
      placed.push(Object.assign({ key: l.key, name: l.name, html: l.html }, ok));
      sc.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
    }
    PLACED = placed;
  }

  /* ---------- the fit: the whole scene (it is round about z), from the camera pitch alone ---------- */
  const camAxes = (cam) => {
    const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw), cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  const seaZ = (r) => -SEA * (1 - (r * r) / (R_MEM * R_MEM));
  /** Rings (radius, height) that bound everything drawn, whatever θ, η and M. */
  const RINGS = (() => {
    const out = [[R_MEM, 0], [0, SPINE[0]], [0, SPINE[1]], [R_CORE * 1.1, CORE[2]], [0, CORE[2] - R_CORE * 1.1], [0, CORE[2] + R_CORE * 1.1], [R_CORE + 0.05 + 0.4 + 0.02, CORE[2]]];
    for (const r of range(0, R_MEM, 24)) out.push([r, seaZ(r)]);
    for (const d of range(0, 90, 18)) { const t = d * DEG, R = 0.96 * Math.sin(t), z = 0.16 + 0.42 * Math.cos(t); out.push([R + COLLAR + 0.02, z], [R, z + R_ALT], [R, z - R_ALT]); }
    out.push([0, 0.58 + R_MERGED]);
    return out;
  })();
  function contentBox(pitch) {
    const cp = Math.cos(pitch), sp = Math.abs(Math.sin(pitch));
    let x1 = 0, y0 = Infinity, y1 = -Infinity;
    for (const [r, z] of RINGS) { x1 = Math.max(x1, r); y0 = Math.min(y0, z * cp - r * sp); y1 = Math.max(y1, z * cp + r * sp); }
    return { x0: -x1, x1, y0, y1 };
  }
  function fitTo(box, area, W, H) {
    const pad = TRV.thumbMode ? 6 : 12, zoom = sc.cam.zoom || 1;
    const unitPx = Math.max(20, Math.min((area.w - 2 * pad) / (box.x1 - box.x0), (area.h - 2 * pad) / (box.y1 - box.y0)));
    const u = unitPx * zoom;                          // the view's zoom (1.00–1.04) enlarges the fitted scene a little
    options.radius = unitPx / Math.max(1, Math.min(W, H));
    options.cx = (area.x + area.w / 2 - u * (box.x0 + box.x1) / 2) / Math.max(1, W);
    options.cy = (area.y + area.h / 2 + u * (box.y0 + box.y1) / 2) / Math.max(1, H);
  }

  const tube = (key, pts, color, width, extra = {}) => { if (pts.length > 1) sc.tube(key, pts, Object.assign({ color, width, glow: 0.3, pick: false, occlude: false }, extra)); };
  const sphere = (c, r) => (u, v) => { const th = PI * u, ph = TAU * v; return [c[0] + r * Math.sin(th) * Math.cos(ph), c[1] + r * Math.sin(th) * Math.sin(ph), c[2] + r * Math.cos(th)]; };
  let FRAME = null, FIT = null, TAGS = [], AX = null, LAST = null;
  const at = (p, html, cls, pri, dir, name) => { if (!TRV.thumbMode) TAGS.push({ p, html, cls, pri, dir, name }); };

  /* the sculpted mother core: a sphere with eight smooth bumps where the roots come in, 28° above its equator, so that
     the bumps on the far side are hidden by the core itself */
  const ENTRY = PHI.map((p) => unit([0.883 * Math.cos(p), 0.883 * Math.sin(p), 0.469]));   // 28° above the equator of the core
  const bump = (n) => ENTRY.reduce((s, d) => s + Math.exp(-(1 - dot(n, d)) / 0.035), 0);
  const coreRadius = (n) => R_CORE * (1 + 0.07 * bump(n));
  const ENTRY_PT = ENTRY.map((d) => add(CORE, scale(d, coreRadius(d))));
  const dirOf = (u, v) => { const th = PI * u, ph = TAU * v; return [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)]; };

  /** The basin of the sub-surface sea, keeping only the part seen from inside (its outward normal faces away). */
  function drawSea() {
    const p = sc.cam.pitch, kap = R_MEM * R_MEM * Math.tan(p) / (2 * SEA), far = Math.atan2(Math.cos(sc.cam.yaw), Math.sin(sc.cam.yaw));
    const half = (r) => { if (r < 1e-9) return kap >= 0 ? PI : 0; const c = -kap / r; return c <= -1 ? PI : c >= 1 ? 0 : Math.acos(c); };
    const r0 = kap < 0 ? Math.min(R_MEM * 0.98, -kap + 1e-3) : 0;
    if (half(R_MEM) < 0.02) return;
    sc.surface('sea', (u, v) => {
      const r = r0 + (R_MEM - r0) * u, w = half(r), a = far + (2 * v - 1) * w;
      return [r * Math.cos(a), r * Math.sin(a), seaZ(r)];
    }, { u: [0, 1], v: [0, 1], nu: 22, nv: 56, colors: [P.faint, P.blue], value: (u) => 0.1 + 0.4 * (r0 + (R_MEM - r0) * u) / R_MEM, range: [0, 1],
      grid: { every: [4, 56], color: P.cyan, alpha: 0.12 }, pick: false });
  }
  function drawMembrane(Mo) {
    sc.surface('membrane', (u, v) => [R_MEM * u * Math.cos(TAU * v), R_MEM * u * Math.sin(TAU * v), 0], { u: [0, 1], v: [0, 1], nu: 12, nv: 72,
      colors: [P.cyan, P.violet], value: (u) => u, range: [0, 1], alpha: 0.1 + 0.32 * Mo.eta, pick: false, occlude: false,
      grid: { every: [3, 9], color: P.violet, alpha: 0.16 + 0.3 * Mo.eta } });
    sc.circle([0, 0, 0], [0, 0, 1], R_MEM, { color: P.violet, width: 1.6, alpha: 0.45 + 0.45 * Mo.eta, fade: false });
  }
  function drawCore(Mo) {
    sc.surface('core', (u, v) => add(CORE, scale(dirOf(u, v), coreRadius(dirOf(u, v)))), { u: [0, 1], v: [0, 1], nu: 30, nv: 56,
      colors: [P.sigma, P.cyan], value: (u, v) => Math.min(1, bump(dirOf(u, v))), range: [0, 1], pick: false });
    ENTRY_PT.forEach((q, k) => sc.bead(add(q, scale(ENTRY[k], 0.012)), { key: `entry${k}`, color: P.sigma, r: 3 }));
    tube('spine', [[0, 0, SPINE[0]], [0, 0, SPINE[1]]], P.sigma, 2.2, { glow: 0.3, alpha: 0.85 });
    // the Schur slack ring: what M records cannot reconstruct of I
    sc.circle(CORE, [0, 0, 1], R_CORE + 0.05 + 0.4 * Mo.slack, { color: P.violet, width: 2.2, alpha: 0.9, fade: false });
  }
  /** The root of alter k: a cubic Bézier from the bottom of the alter, straight down, then into its bump on the core. */
  function rootPoints(Mo, k) {
    const P0 = add(Mo.merged ? altPos(0, 0) : Mo.alters[k], [0, 0, -(Mo.merged ? R_MERGED : R_ALT)]), P1 = add(P0, [0, 0, -0.34]);
    const P3 = ENTRY_PT[k], P2 = add(P3, scale(ENTRY[k], 0.46));
    return range(0, 1, 36).map((s) => {
      const a = (1 - s) ** 3, b = 3 * (1 - s) ** 2 * s, c = 3 * (1 - s) * s * s, d = s ** 3;
      return [0, 1, 2].map((i) => a * P0[i] + b * P1[i] + c * P2[i] + d * P3[i]);
    });
  }
  /** Where a root crosses the membrane z = 0 (the first crossing). */
  function pierce(pts) {
    for (let i = 1; i < pts.length; i++) if (pts[i - 1][2] > 0 && pts[i][2] <= 0) { const f = pts[i - 1][2] / (pts[i - 1][2] - pts[i][2]); return add(pts[i - 1], scale(sub(pts[i], pts[i - 1]), f)); }
    return null;
  }
  function drawRoots(Mo) {
    const pierced = [];
    for (let k = 0; k < N_ALT; k++) {
      const pts = rootPoints(Mo, k), front = k === Mo.k0 && !Mo.merged;
      tube(`root${k}`, pts, front ? P.amber : P.cyan, front ? 4.6 : 3, { glow: front ? 0.5 : 0.35 });
      const q = pierce(pts);
      if (q) { sc.ring(q, { key: `pierce${k}`, normal: [0, 0, 1], color: P.violet, r: 4 }); pierced.push(q); }
    }
    return pierced;
  }
  function drawAlters(Mo) {
    if (Mo.merged) {
      sc.surface('alter-merged', sphere(altPos(0, 0), R_MERGED), { u: [0, 1], v: [0, 1], nu: 18, nv: 30, colors: [P.sigma, P.cyan], value: (u) => u, range: [0, 1], pick: false });
      return;
    }
    Mo.alters.forEach((c, k) => {
      const style = k === Mo.k0 ? { color: P.amber } : { colors: [P.sigma, P.cyan], value: (u) => u, range: [0, 1] };
      sc.surface(`alter${k}`, sphere(c, R_ALT), Object.assign({ u: [0, 1], v: [0, 1], nu: 16, nv: 26, pick: false }, style));
    });
  }
  function drawCollars(Mo) {
    if (Mo.M <= 0) return;
    const frac = Mo.M / D_EFF, list = Mo.merged ? [0] : PHI.map((_, k) => k);
    for (const k of list) {
      const c = Mo.merged ? altPos(0, 0) : Mo.alters[k], rad = Mo.merged ? R_MERGED + 0.06 : COLLAR, n = Math.max(4, Math.ceil(64 * frac));
      tube(`collar${k}`, range(PHI[k] - PI * frac, PHI[k] + PI * frac, n).map((a) => [c[0] + rad * Math.cos(a), c[1] + rad * Math.sin(a), c[2]]), P.violet, 2.4, { glow: 0.4 });
    }
  }
  /** The arcs between neighbouring alters: cyan Līlā bridges near θ*, magenta stubs as long as T is large. */
  function drawArcs(Mo) {
    const R = Mo.R, z = Mo.zAlt;
    const info = { bridges: 0, stubs: 0, stubAngle: 0, span: 0 };
    if (Mo.merged || R < 0.12) return info;
    const trim = Math.asin(Math.min(1, (R_ALT * 1.15) / R)), span = PI / 4 - 2 * trim;
    if (span <= 0.02) return info;
    const arc = (a0, a1) => range(a0, a1, Math.max(3, Math.ceil(24 * (a1 - a0) / (PI / 4)))).map((a) => [R * Math.cos(a), R * Math.sin(a), z]);
    const stub = 0.5 * span * 0.9 * Math.min(1, Mo.T / T_FULL);
    info.span = span; info.stubAngle = stub;
    for (let k = 0; k < N_ALT; k++) {
      const a0 = PHI[k] + trim, a1 = PHI[k] + PI / 4 - trim;
      if (Mo.healed > 0.02) { tube(`bridge${k}`, arc(a0, a1), P.cyan, 2.8, { glow: 0.45, alpha: Mo.healed > 0.999 ? 1 : Mo.healed }); info.bridges++; }
      if (stub > 0.004) {
        tube(`stubA${k}`, arc(a0, a0 + stub), P.magenta, 3.6, { glow: 0.55 });
        tube(`stubB${k}`, arc(a1 - stub, a1), P.magenta, 3.6, { glow: 0.55 });
        info.stubs += 2;
      }
    }
    return info;
  }
  /** Partial-trace lens: the Gram chords from the front alter to the others (opacity by overlap). */
  function drawChords(Mo) {
    if (Mo.merged || S.lens !== 1) return;
    const a = Mo.alters[Mo.k0], t = Mo.theta;
    for (let j = 0; j < N_ALT; j++) {
      if (j === Mo.k0) continue;
      const g = Math.cos(t) ** 2 + Math.sin(t) ** 2 * Math.cos(PHI[j] - PHI[Mo.k0]);
      sc.line([a, Mo.alters[j]], { color: P.cyan, width: 1.2, alpha: 0.18 + 0.55 * (g + 1) / 2, dash: (j - Mo.k0 + N_ALT) % N_ALT === 4 ? [5, 4] : null });
    }
  }

  /** Labels: the reading of the lens, in the colour of what they name. */
  function addLabels(Mo, I, arcs) {
    const lens = S.lens, sideR = AX.R;
    // the membrane is named at the upper right of its rim, where the stage is usually empty
    let rim = null, best = -Infinity;
    for (let i = 0; i < 48; i++) { const p = [R_MEM * Math.cos(TAU * i / 48), R_MEM * Math.sin(TAU * i / 48), 0], q = sc.p(p), v = q[0] - 0.6 * q[1]; if (v > best) { best = v; rim = p; } }
    at(rim, lens ? `Tr<sub>Ā</sub> · ⟨E₀|E₁⟩ = ${fix(Mo.overlap, 2)}` : L(`压抑膜 Σ<sub>rep</sub> · η = ${fix(Mo.eta, 2)}`, `Membrane Σ<sub>rep</sub> · η = ${fix(Mo.eta, 2)}`), 'raw c-vi backed', 8, [1, -0.6], 'membrane');
    const coreRight = add(CORE, scale(sideR, R_CORE + 0.05 + 0.4 * Mo.slack));
    at(coreRight, lens ? `|I⟩ · Δ<sub>Schur</sub>(${Mo.M}) = ${fix(Mo.slack, 4)}` : L(`母核 I · 余量 Δ = ${fix(Mo.slack, 4)}`, `Mother core I · slack Δ = ${fix(Mo.slack, 4)}`), 'raw c-sg backed', 9, [1, 0.6], 'core');
    if (Mo.merged) {
      at(altPos(0, 0), lens ? L(`1 个等价类 · S = ${fix(Mo.Srep, 4)} bit`, `1 class · S = ${fix(Mo.Srep, 4)} bit`) : L('全知幽闭 · 八个分身叠成一个', 'Omniscient claustrophobia · eight alters as one'), 'raw c-ik backed', 10, [0.6, -1], 'front');
    } else {
      const a = Mo.alters[Mo.k0];
      at(a, lens ? `a<sub>${Mo.k0}</sub>(θ) · S<sub>rep</sub> = ${fix(Mo.Srep, 4)} bit` : L(`前台分身 k₀ = ${Mo.k0}`, `Front alter k₀ = ${Mo.k0}`), 'raw c-ik backed', 10, null, 'front');
      if (lens) { const j = (Mo.k0 + 4) % N_ALT; at(Mo.alters[j], `⟨a<sub>${Mo.k0}</sub>|a<sub>${j}</sub>⟩ = cos 2θ = ${fix(I.gram.G[Mo.k0][j], 4)}`, 'raw c-cy backed', 7, null, 'antipode'); }
    }
    if (arcs.stubs) {
      const k = (Mo.k0 + 2) % N_ALT, a = PHI[k] + PI / 8, q = [Mo.R * Math.cos(a), Mo.R * Math.sin(a), Mo.zAlt];
      at(q, lens ? `η sin θ · M/12 · |cos θ − θ| = ${fix(Mo.T, 4)}` : L(`幻肢张力 T = ${fix(Mo.T, 4)}`, `Phantom tension T = ${fix(Mo.T, 4)}`), 'raw c-mg backed', 8, null, 'tension');
    } else if (arcs.bridges && Mo.healed > 0.5) {
      const k = (Mo.k0 + 2) % N_ALT, a = PHI[k] + PI / 8, q = [Mo.R * Math.cos(a), Mo.R * Math.sin(a), Mo.zAlt];
      // the bridges show from 0.5 opacity on, a little before T reaches 0: the label states T = 0 only when it is
      const tt = tensionText(Mo.T);
      at(q, lens ? `θ* = cos θ* · |cos θ − θ| = ${fix(Mo.res, 4)}` : L(`游戏之桥 · 张力 T = ${tt}`, `Lila bridges · tension T = ${tt}`), 'raw c-cy backed', 8, null, 'bridges');
    }
    if (Mo.M > 0) {
      const c = Mo.merged ? altPos(0, 0) : Mo.alters[(Mo.k0 + 6) % N_ALT], k = Mo.merged ? 0 : (Mo.k0 + 6) % N_ALT;
      const q = add(c, [(Mo.merged ? R_MERGED + 0.06 : COLLAR) * Math.cos(PHI[k]), (Mo.merged ? R_MERGED + 0.06 : COLLAR) * Math.sin(PHI[k]), 0]);
      at(q, lens ? L(`M = ${Mo.M} 条记录`, `M = ${Mo.M} records`) : L(`末那识领环 M = ${Mo.M}`, `Manas collars M = ${Mo.M}`), 'raw c-vi backed', 6, null, 'collar');
    }
    const seaPt = [0, 0, seaZ(0)];
    at(add(seaPt, scale(sideR, -0.6)), lens ? 'Ā' : L('潜意识之海', 'Sub-surface sea'), 'raw c-bl backed', 4, [-1, 0.5], 'sea');
  }

  function drawStage(Mo) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    AX = camAxes(sc.cam);
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 12, y: 12, w: W - 24, h: H - 24 } : safeRect(W, H, huds);
    if (!dragging || !FIT) FIT = { area, box: contentBox(sc.cam.pitch) };
    fitTo(FIT.box, FIT.area, W, H);
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = []; TAGS = [];
    const I = instances(Mo);
    sc.begin();
    drawSea();
    drawMembrane(Mo);
    drawCore(Mo);
    const pierced = drawRoots(Mo);
    drawAlters(Mo);
    drawCollars(Mo);
    const arcs = drawArcs(Mo);
    drawChords(Mo);
    addLabels(Mo, I, arcs);
    sc.end();
    const front = Mo.merged ? altPos(0, 0) : Mo.alters[Mo.k0];
    const hq = thumb || TRV.still ? null : sc.p(front);
    if (hq) OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    placeHandle(hq);
    if (!thumb) {
      // labels keep off the bodies they name: the alter spheres and the mother core
      const bodies = (Mo.merged ? [[altPos(0, 0), R_MERGED]] : Mo.alters.map((a) => [a, R_ALT])).concat([[CORE, R_CORE * 1.08]]);
      for (const [c, rad] of bodies) { const q = sc.p(c), r = rad * sc.unit + 2; OBST.push({ x: q[0] - r, y: q[1] - r, w: 2 * r, h: 2 * r }); }
      const cen = sc.p([0, 0, 0]);
      TAGS.forEach((t, k) => {
        const q = sc.p(t.p), dir = t.dir ? [t.dir[0], t.dir[1]] : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1];
        LB.push({ key: `t${k}`, q, html: t.html, cls: t.cls, pri: t.pri, dir, r: 12, name: t.name });
      });
      placeLabels();
    }
    LAST = Mo;
    FRAME = { W, H, area: FIT.area, box: FIT.box, unit: sc.unit, cx: sc.cx, cy: sc.cy, handle: hq ? { x: hq[0], y: hq[1] } : null, arcs, pierced: pierced.length,
      alters: (Mo.merged ? [altPos(0, 0)] : Mo.alters).map((p) => sc.p(p).slice(0, 2)) };
  }

  /* ---------- picking an alter, and the handle on the front alter ---------- */
  function pickAlter(ev, s) {
    if (TRV.still || !LAST || LAST.merged) return false;
    const D = camAxes(s.cam).D, pts = LAST.alters.map((a) => add(a, scale(D, R_ALT * 1.02)));
    const k = s.nearest(ev, pts, 16);
    if (k < 0) return false;
    focusAlter(k);
    return true;
  }
  function focusAlter(k) {
    leave();
    clock.set((k + 0.5) / N_ALT);
    paint();
  }
  const handle = $('psycheHandle');
  let dragging = null;
  function placeHandle(q) {
    const show = !!q && !TRV.still;
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
    const label = L('沿前台分身的经线拖动改 θ', 'Drag along the meridian of the front alter to set θ');
    if (handle.getAttribute('aria-label') !== label) handle.setAttribute('aria-label', label);
  }
  /** The tilt θ (degrees, two decimals, 42.35 snapped to θ*) whose front-alter position projects nearest the pointer. */
  function thetaAt(ev) {
    const r = stageEl.getBoundingClientRect(), x = ev.clientX - r.left - stageEl.clientLeft, y = ev.clientY - r.top - stageEl.clientTop;
    const k = frontOf(S.tau), far = (d) => { const q = sc.p(altPos(d * DEG, k)); return (q[0] - x) ** 2 + (q[1] - y) ** 2; };
    let best = 0, bd = Infinity;
    for (let i = 0; i <= 360; i++) { const d = i * 0.25, e = far(d); if (e < bd) { bd = e; best = d; } }
    let lo = Math.max(0, best - 0.25), hi = Math.min(90, best + 0.25);
    for (let it = 0; it < 48; it++) { const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3; if (far(m1) < far(m2)) hi = m2; else lo = m1; }
    return snapDeg(Math.round((lo + hi) / 2 * 100) / 100);
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
    setTheta(thetaAt(ev));
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight' && ev.key !== 'ArrowUp' && ev.key !== 'ArrowDown') return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    const sgn = ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : -1;
    setTheta(snapDeg(Math.round((S.thetaDeg + 0.25 * sgn) * 100) / 100));
  });

  /* ---------- HUD, legend, readouts ---------- */
  const LENS_NAME = [['神圣防御', 'DIVINE DEFENCE'], ['偏迹几何', 'PARTIAL TRACE']];
  function legendItems() {
    if (S.lens) return [['cy', '|a<sub>k</sub>⟩ · ' + L('格拉姆弦', 'Gram chords')], ['mg', 'T<sub>phantom</sub>'], ['vi', 'Tr<sub>Ā</sub> · Δ<sub>Schur</sub>'], ['sg', '|I⟩'], ['bl', 'Ā']];
    return [['cy', L('分身与根', 'alters and roots')], ['mg', L('幻肢残桩 T', 'phantom stubs T')], ['vi', L('压抑膜 · 领环', 'membrane · collars')], ['sg', L('母核 I', 'mother core I')], ['bl', L('潜意识之海', 'sub-surface sea')]];
  }
  function hudText(Mo) {
    $('hudBig').innerHTML = `${L(...LENS_NAME[S.lens])} · S<sub>rep</sub> = ${fix(Mo.Srep, 4)} bit`;
    $('hudSub').innerHTML = `θ = ${fix(Mo.thetaDeg, 2)}° · η = ${fix(Mo.eta, 2)} · M = ${Mo.M} · T = ${fix(Mo.T, 4)} · Δ = ${fix(Mo.slack, 4)}`;
    $('legend').innerHTML = legendItems().map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  function drawText(Mo) {
    const I = instances(Mo);
    $('roKey').textContent = `${fix(Mo.Srep, 4)} bit`;
    $('roKeySub').innerHTML = ` · I(A:Ā) = ${fix(Mo.I, 4)} bit`;
    $('roTheta').innerHTML = `${fix(Mo.thetaDeg, 4)}°${Mo.thetaDeg === STAR_DEG ? ' = θ*' : ''} · |cos θ − θ| = ${fix(Mo.res, 4)} rad`;
    $('roSA').innerHTML = `${fix(Mo.SA, 4)} bit · I = ${fix(Mo.IA, 4)} bit · cos²θ = ${fix(Mo.cos2, 4)}`;
    $('roRep').innerHTML = `${fix(Mo.overlap, 2)} · r = ${fix(Mo.r, 4)} · D² + V² = ${fix(I.records.sum, 6)}`;
    $('roSchur').innerHTML = `${fix(Mo.slack, 4)} · (12 − M)/(12(M + 1)) = ${fix(Mo.closed, 4)}`;
    $('roTension').innerHTML = `${fix(Mo.T, 4)} = ${fix(Mo.eta, 2)} × ${fix(Mo.sinT, 4)} × ${Mo.M}/12 × ${fix(Mo.res, 4)}`;
    $('roGram').innerHTML = `${I.gram.classes} ${L('类', I.gram.classes === 1 ? 'class' : 'classes')} · G<sub>04</sub> = cos 2θ = ${fix(I.gram.G04, 4)}`;
    $('roNote').innerHTML = noteFor(Mo, I);
    $('scenePill').innerHTML = `PSYCHE <strong>${L(...LENS_NAME[S.lens])}</strong>`;
    $('keyPill').innerHTML = `S<sub>rep</sub> <strong>${fix(Mo.Srep, 4)} bit</strong>`;
    $('hint').innerHTML = L('拖琥珀手柄改 θ · 点另一个分身换前台 · 拖空白处转视角', 'drag the amber handle to set θ · click another alter to bring it to the front · drag empty space to orbit');
    $('formula').innerHTML = 'S<sub>rep</sub> = H₂((1 + r)/2), r = √(cos²2θ + (1 − η)² sin²2θ) · T = η sin θ · (M/12) · |cos θ − θ|';
    lensBtn.setAttribute('aria-pressed', String(S.lens === 1));
  }
  function noteFor(Mo, I) {
    if (Mo.merged) return L(`θ = 0°：八个分身重叠为 1 个等价类，没有第二个视角；S<sub>rep</sub> = 0，|cos θ − θ| = ${fix(Mo.res, 4)} rad。`,
      `θ = 0°: the eight alters overlap in 1 class, with no second viewpoint; S<sub>rep</sub> = 0 and |cos θ − θ| = ${fix(Mo.res, 4)} rad.`);
    if (Mo.res < 5e-5 && Math.abs(Mo.T) < T_ZERO) return L(`θ = θ*：|cos θ − θ| = ${fix(Mo.res, 4)}，张力为 0；换谁上前台，S<sub>rep</sub> = ${fix(Mo.Srep, 4)} bit 与 Δ = ${fix(Mo.slack, 4)} 都不变。`,
      `θ = θ*: |cos θ − θ| = ${fix(Mo.res, 4)} and the tension is 0; whoever is at the front, S<sub>rep</sub> = ${fix(Mo.Srep, 4)} bit and Δ = ${fix(Mo.slack, 4)} stay the same.`);
    return correlationNote(Mo, I);
  }
  /** The blind spot, as it holds for the current state. The classical shadow diag(cos²θ, 0, 0, sin²θ) has the marginal
      diag(cos²θ, sin²θ); the actual marginal ρ_A has the off-diagonal (1 − η) cos θ sin θ, so the two agree only where
      that is 0. The Schmidt state cos θ|00⟩ + sin θ|11⟩ (η = 1) and the shadow differ in both T_xx = sin 2θ and
      T_yy = −sin 2θ. */
  function correlationNote(Mo, I) {
    const b = I.blind, n = I.gram.classes;
    const txx = `T<sub>xx</sub> = sin 2θ = ${num(b.txx)}`, tyy = `T<sub>yy</sub> = −sin 2θ = ${num(b.tyy)}`;
    if (b.marginalDiffers) return L(
      `前台的边缘与它的经典影子 diag(cos²θ, sin²θ) 不同：非对角元 (1 − η) cos θ sin θ = ${num(b.marginalOff)} ≠ 0。局部的盲区要 η = 1：那时施密特态 cos θ|00⟩ + sin θ|11⟩ 与它的经典影子边缘全同，关联却在 ${txx} 与 ${tyy} 两项上都不同；${n} 个等价类。`,
      `The front marginal differs from that of its classical shadow diag(cos²θ, sin²θ): its off-diagonal (1 − η) cos θ sin θ = ${num(b.marginalOff)} ≠ 0. The local blind spot needs η = 1: there the Schmidt state cos θ|00⟩ + sin θ|11⟩ and its classical shadow share their marginals, yet differ in both ${txx} and ${tyy}; ${n} classes.`);
    if (b.correlated) return L(
      `局部看不见关联：η = 1 时前台的边缘与它的经典影子相同（非对角元 0），联合态却在 ${txx} 与 ${tyy} 两项上都不同；${n} 个等价类。`,
      `The local view is blind to correlations: at η = 1 the front marginal equals that of its classical shadow (off-diagonal 0), yet the joint states differ in both ${txx} and ${tyy}; ${n} classes.`);
    return L(
      `θ = ${fix(Mo.thetaDeg, 2)}°：cos θ sin θ = 0，态是乘积态，边缘与关联都和它的经典影子相同；${n} 个等价类。`,
      `θ = ${fix(Mo.thetaDeg, 2)}°: cos θ sin θ = 0, the state is a product, and its marginal and its correlations both equal those of its classical shadow; ${n} classes.`);
  }

  /* ---------- strip plot: along θ, the repressed entropy, the full partial trace and the phantom tension ---------- */
  function drawPlot(Mo) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    $('plotTitle').textContent = L('沿倾角 θ：压抑熵与幻肢张力', 'Along the tilt θ: repressed entropy and phantom tension');
    const ths = range(0, 90, 360), tc = ths.map((d) => [d, tension(d * DEG, Mo.eta, Mo.M)]);
    const yMax = Math.max(1.08, 1.08 * Math.max(...tc.map((p) => p[1])));
    const g = kit.plot(cv, { x: [0, 90], y: [0, yMax], pad: [36, 12, 10, 22] });
    g.axes({ xTicks: [0, 15, 30, 45, 60, 75, 90], yTicks: [0, 0.5, 1, 1.5].filter((y) => y <= yMax), xLabel: 'θ (°)' });
    g.vline(STAR_DEG, P.ink, { alpha: 0.55, dash: [4, 4] });
    g.line(ths.map((d) => [d, sA(d * DEG)]), P.cyan, { width: 1.6, dash: [5, 4] });
    g.line(ths.map((d) => [d, sRep(d * DEG, Mo.eta)]), P.violet, { width: 2.2 });
    g.line(tc, P.magenta, { width: 2.2 });
    g.vline(Mo.thetaDeg, P.amber, { alpha: 0.9 });
    g.dot(Mo.thetaDeg, Mo.Srep, P.violet, 3.4);
    g.dot(Mo.thetaDeg, Mo.T, P.magenta, 3.4);
    g.legend([[P.violet, 'S_{rep}'], [P.cyan, 'S_{A}'], [P.magenta, 'T']]);
    $('plotMeta').innerHTML = `θ* = ${fix(STAR_DEG, 4)}° · S<sub>A</sub>(θ*) = ${fix(sA(THETA_STAR), 4)} bit · T(θ*) = 0`;
  }

  const paint = kit.painter(() => {
    const Mo = model();
    hudText(Mo); TRV.hudFit();
    drawStage(Mo); drawText(Mo); drawPlot(Mo);
  }, [stageEl, $('plot')]);

  /* ---------- the rail: which alter is at the front ---------- */
  const playBtn = $('playBtn');
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, t: 0, rate: 0.08, step: 0.125, loop: true,
    format: (t) => `τ ${fix(t, 2)} · ${L('前台', 'front')} k₀ = ${frontOf(t)} <small>/ 1</small>`,
    onChange: (t, C) => { S.tau = t; playBtn.textContent = C.playing ? '❚❚' : '▷'; playBtn.setAttribute('aria-pressed', String(C.playing)); paint(); }
  });
  playBtn.addEventListener('click', () => { stopBootPlay(); clock.toggle(); });
  $('rewindBtn').addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });
  $('rew').addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });

  /* a page-local start for a card that plays inside a book: play once the stage is half in view, pause when it leaves,
     and let go for good as soon as the reader touches anything */
  let bootIO = null;
  function bootAutoplay() {
    if (TRV.still || !window.IntersectionObserver) return;
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
  let transition = null, booting = true;
  /** Blend every shown value from `from` to the state over ms. */
  function startBlend(from, ms) {
    if (transition) transition.cancel();
    S.from = from; S.blend = 0;
    const token = {};
    transition = token;
    token.cancel = () => { if (token.run) token.run.cancel(); S.blend = 1; S.from = null; };
    token.run = kit.tween(ms, (e) => { S.blend = e; syncFields(); paint(); }, () => { if (transition === token) transition = null; S.blend = 1; S.from = null; syncFields(); paint(); });
  }
  /** The reader takes over: the shown values become the state, the clock pauses, no card is marked. */
  function leave() {
    stopBootPlay();
    const e = eff();
    if (transition) transition.cancel();
    transition = null;
    S.thetaDeg = e.thetaDeg; S.eta = e.eta; S.M = e.M; S.from = null; S.blend = 1;
    cards.mark(null); clock.pause(); clock.set(clock.t, true);
  }
  const fTheta = kit.field($('tiltTheta'), { fmt: (v) => fix(snapDeg(clamp(v, 0, 90)), 2), onInput: (v) => { leave(); S.thetaDeg = snapDeg(clamp(v, 0, 90)); paint(); } });
  const fEta = kit.field($('repressEta'), { fmt: (v) => fix(clamp(v, 0, 1), 2), onInput: (v) => { leave(); S.eta = clamp(v, 0, 1); paint(); } });
  const fM = kit.field($('manasM'), { fmt: (v) => String(Math.round(clamp(v, 0, D_EFF))), onInput: (v) => { leave(); S.M = Math.round(clamp(v, 0, D_EFF)); paint(); } });
  function syncFields() { const e = eff(); fTheta.set(Math.round(e.thetaDeg * 100) / 100); fEta.set(Math.round(e.eta * 100) / 100); fM.set(Math.round(e.M)); }
  function setTheta(d) { S.thetaDeg = snapDeg(clamp(d, 0, 90)); syncFields(); paint(); }
  const lensBtn = $('lensToggleBtn');
  lensBtn.addEventListener('click', () => { S.lens = S.lens ? 0 : 1; paint(); });
  const camChips = kit.chips($('camChips'), 'cam', (v) => { S.cam = CAMS[v] ? v : 'panorama'; sc.view(CAMS[S.cam], TRV.still ? 0 : 600); paint(); });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'omniscient-claustrophobia-freeze': { thetaDeg: 0, etaRep: 0, M: 12, cam: 'panorama', play: false, still: 0 },
    'repression-horizon-birth': { thetaDeg: 45, etaRep: 1, M: 0, cam: 'surface', play: true, still: 0.65 },
    'compulsive-over-immersion-pain': { thetaDeg: 68, etaRep: 1, M: 10, cam: 'surface', play: true, still: 0.6 },
    'subsurface-alaya-one-root': { thetaDeg: 42.35, etaRep: 0.85, M: 3, cam: 'roots', play: true, still: 0.72 },
    'lucid-lila-integration-star': { thetaDeg: 42.35, etaRep: 1, M: 3, cam: 'panorama', play: true, still: 0.8 }
  };
  /** The ends of the θ range [0°, 90°], their angle to θ* and their residual |cos θ − θ|, and the end farther from θ*. */
  const ENDS = [0, 90].map((deg) => ({ deg, gap: Math.abs(deg - STAR_DEG), res: residual(deg * DEG) }));
  const FAR_END = ENDS.reduce((a, b) => (b.gap > a.gap ? b : a));
  const NOTES = {
    'omniscient-claustrophobia-freeze': [`全知幽闭：θ = 0° 时八个分身叠成水面上方同一个冻结的银白球，没有第二个视角可比；压抑膜几乎透明（η = 0），S<sub>rep</sub> = 0 bit，I(A:Ā) = 0。十二个紫色末那识领环合成一整圈，紫色余量环贴住母核：Δ<sub>Schur</sub>(12) = 0，母核被完全重建，却没有谁在看。|cos θ − θ| = ${fix(ENDS[0].res, 4)} rad，离 θ* 有 ${fix(ENDS[0].gap, 2)}°；θ 的两端里离 θ* 更远的是 ${FAR_END.deg}°（相距 ${fix(FAR_END.gap, 2)}°，|cos θ − θ| = ${fix(FAR_END.res, 4)} rad）。`,
      `Omniscient claustrophobia: at θ = 0° the eight alters coincide in one frozen silver sphere above the surface, with no second viewpoint to compare against; the membrane is nearly clear (η = 0), S<sub>rep</sub> = 0 bit and I(A:Ā) = 0. The twelve violet manas collars close into a full ring and the violet slack ring hugs the core: Δ<sub>Schur</sub>(12) = 0, the mother core is fully reconstructed, yet no one is looking. |cos θ − θ| = ${fix(ENDS[0].res, 4)} rad, ${fix(ENDS[0].gap, 2)}° from θ*; of the two ends of θ, the farther from θ* is ${FAR_END.deg}° (${fix(FAR_END.gap, 2)}° away, |cos θ − θ| = ${fix(FAR_END.res, 4)} rad).`],
    'repression-horizon-birth': ['压抑视界的诞生：θ = 45° 时八个分身在水面上展开成一圈，压抑膜全开（η = 1，⟨E₀|E₁⟩ = 0），显意识的熵 S<sub>A</sub> = 1.0000 bit，跨视界互信息 I(A:Ā) = 2.0000 bit，对径分身的重叠 cos 90° = 0。没有末那识领环（M = 0），紫色余量环最宽：Δ<sub>Schur</sub>(0) = 1.0000。时间轴让琥珀前台轮转：换谁上前台，熵与余量都不变。',
      'A repression horizon is born: at θ = 45° the eight alters open into a ring above the surface, the membrane is fully on (η = 1, ⟨E₀|E₁⟩ = 0), the conscious entropy is S<sub>A</sub> = 1.0000 bit, the trans-horizon mutual information I(A:Ā) = 2.0000 bit, and antipodal alters overlap by cos 90° = 0. There are no manas collars (M = 0) and the violet slack ring is at its widest: Δ<sub>Schur</sub>(0) = 1.0000. The rail turns the amber front: whoever is at the front, entropy and slack stay the same.'],
    'compulsive-over-immersion-pain': ['强迫过度沉浸：θ = 68° 越过 θ*，分身离轴更远，S<sub>A</sub> = H₂(cos²68°) = 0.5851 bit 反而回落，I(A:Ā) = 1.1702 bit。十个紫色领环（M = 10）把余量压到 Δ<sub>Schur</sub> = 0.0152，却让断弧两端的品红幻肢残桩伸长：T<sub>phantom</sub> = 1 × sin 68° × 10/12 × 0.8122 = 0.6276。',
      'Compulsive over-immersion: θ = 68° goes past θ*, the alters move farther from the axis, and S<sub>A</sub> = H₂(cos²68°) = 0.5851 bit falls back, with I(A:Ā) = 1.1702 bit. Ten violet collars (M = 10) press the slack down to Δ<sub>Schur</sub> = 0.0152 but lengthen the magenta phantom stubs at both ends of each severed arc: T<sub>phantom</sub> = 1 × sin 68° × 10/12 × 0.8122 = 0.6276.'],
    'subsurface-alaya-one-root': ['水面下同根：相机从水面下仰视，八条根穿过紫色压抑膜，汇进同一个银白母核 I；琥珀那条是此刻在前台的分身的根，其余七条是青色。θ = θ* = 42.35°、η = 0.85：⟨E₀|E₁⟩ = 0.15，S<sub>rep</sub> = 0.9776 bit；|cos θ − θ| = 0，幻肢张力为 0，青色游戏之桥接通八个分身。',
      'One root below the surface: the camera looks up from beneath, where eight roots pass through the violet membrane into one silver mother core I; the amber root belongs to the alter now at the front, the other seven are cyan. At θ = θ* = 42.35° and η = 0.85: ⟨E₀|E₁⟩ = 0.15 and S<sub>rep</sub> = 0.9776 bit; |cos θ − θ| = 0, the phantom tension is 0 and the cyan Līlā bridges join the eight alters.'],
    'lucid-lila-integration-star': ['清醒游戏的整合之星：θ = θ* = cos θ* = 0.7391 rad（42.35°），压抑膜全开，S<sub>A</sub>(θ*) = 0.9938 bit，I(A:Ā) = 1.9876 bit；|cos θ − θ| = 0，品红残桩全部收回，八段青色游戏之桥把分身连成一颗星。三个紫色领环留下 Δ<sub>Schur</sub>(3) = 0.1875。琥珀前台轮转一圈，八条根始终汇于同一个 I。',
      'The lucid Līlā star: θ = θ* = cos θ* = 0.7391 rad (42.35°), the membrane fully on, S<sub>A</sub>(θ*) = 0.9938 bit and I(A:Ā) = 1.9876 bit; |cos θ − θ| = 0, every magenta stub withdraws and eight cyan Līlā bridges join the alters into a star. Three violet collars leave Δ<sub>Schur</sub>(3) = 0.1875. The amber front goes once round, and the eight roots always meet in the same I.']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'omniscient-claustrophobia-freeze': ['θ = 0°：八个分身叠成一个冻结的球，S = 0 bit，余量 Δ = 0。', 'θ = 0°: the eight alters are one frozen sphere, S = 0 bit and the slack Δ = 0.'],
    'repression-horizon-birth': ['θ = 45°：压抑膜全开，S = 1.0000 bit，I = 2.0000 bit，余量 Δ = 1。', 'θ = 45°: the membrane is fully on, S = 1.0000 bit, I = 2.0000 bit and the slack Δ = 1.'],
    'compulsive-over-immersion-pain': ['θ = 68°：S 回落到 0.5851 bit，品红幻肢残桩 T = 0.6276。', 'θ = 68°: S falls back to 0.5851 bit and the magenta phantom stubs reach T = 0.6276.'],
    'subsurface-alaya-one-root': ['水面下仰视：八条根汇进同一个母核 I，θ* 处张力为 0。', 'From below the surface: eight roots meet in one mother core I, and at θ* the tension is 0.'],
    'lucid-lila-integration-star': ['θ* = cos θ*：残桩收回，青色之桥连成一颗星，S = 0.9938 bit。', 'θ* = cos θ*: the stubs withdraw, cyan bridges close into a star, S = 0.9938 bit.']
  };
  function applyPreset(id) {
    const p = PRESETS[id];
    stopBootPlay(); clock.pause();
    const before = eff();
    if (transition) transition.cancel();
    transition = null;
    S.thetaDeg = snapDeg(p.thetaDeg); S.eta = p.etaRep; S.M = p.M; S.from = null; S.blend = 1;
    S.cam = p.cam; camChips.set(p.cam, true);
    sc.view(CAMS[p.cam], booting || TRV.still ? 0 : 600);
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still);
    else clock.set(0);
    if (!booting && !TRV.still) startBlend(before, 600);
    syncFields();
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) bootAutoplay(); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拉 θ、η 与 M，换透镜或视角，拖琥珀手柄，点分身换前台。时间轴让前台轮转。随时可以再选一张卡。', 'Free play: pull θ, η and M, switch the lens or the view, drag the amber handle, click an alter to bring it to the front. The rail turns the front. Pick a card again at any time.']
  });
  // the tour bar's card title carries the id #tourStep
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.DIVINE_PSYCHOLOGY_DEBUG = Object.freeze({
    get state() {
      const Mo = model(), I = instances(Mo);
      return JSON.parse(JSON.stringify({
        preset: cards.current, t: clock.t, playing: clock.playing, lens: S.lens, cam: S.cam, camera: Object.assign({}, sc.cam), blending: !!(S.from && S.blend < 1),
        thetaDeg: Mo.thetaDeg, theta: Mo.theta, eta: Mo.eta, M: Mo.M, k0: Mo.k0, tau: Mo.tau, merged: Mo.merged,
        thetaStar: THETA_STAR, thetaStarDeg: STAR_DEG, snapped: Mo.thetaDeg === STAR_DEG,
        constants: { alters: N_ALT, dEff: D_EFF, rho: RHO, gamma: GAMMA, core: CORE, coreRadius: R_CORE, membrane: R_MEM, sea: SEA, alterRadius: R_ALT, heal: HEAL, tFull: T_FULL, cams: CAMS },
        overlap: Mo.overlap, bloch: { x: Mo.x, z: Mo.z, r: Mo.r }, Srep: Mo.Srep, I: Mo.I, SA: Mo.SA, IA: Mo.IA, cos2: Mo.cos2, residual: Mo.res, T: Mo.T,
        slack: Mo.slack, closed: Mo.closed, healed: Mo.healed, alters: Mo.alters, R: Mo.R, zAlt: Mo.zAlt,
        schurTable: SCHUR.map((x) => ({ M: x.M, slack: x.slack, closed: x.closed })),
        leanInstances: I, labels: PLACED, stageFrame: FRAME, handle: FRAME ? FRAME.handle : null
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock). */
    setState(o) {
      leave();
      if (o.thetaDeg != null) S.thetaDeg = snapDeg(clamp(o.thetaDeg, 0, 90));
      if (o.eta != null) S.eta = clamp(o.eta, 0, 1);
      if (o.M != null) S.M = Math.round(clamp(o.M, 0, D_EFF));
      if (o.lens != null) S.lens = o.lens ? 1 : 0;
      syncFields();
      if (o.t != null) clock.set(clamp(o.t, 0, 1));
      if (o.k0 != null) clock.set((Math.round(o.k0) % N_ALT + 0.5) / N_ALT);
      paint();
    },
    /** Viewport coordinates of the handle (for pointer tests), or null when hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates where the handle would sit at the tilt θ (degrees), for drag targets. */
    dragTarget(d) {
      const b = stageEl.getBoundingClientRect(), q = sc.p(altPos(d * DEG, frontOf(S.tau)));
      return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] };
    },
    /** Viewport coordinates of the point of alter k that faces the camera (for clicks), or null at θ = 0°. */
    alterPoint(k) {
      if (!LAST || LAST.merged) return null;
      const b = stageEl.getBoundingClientRect(), q = sc.p(add(LAST.alters[k], scale(camAxes(sc.cam).D, R_ALT * 1.02)));
      return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1], hidden: sc.occluded(add(LAST.alters[k], scale(camAxes(sc.cam).D, R_ALT * 1.02)), 0.02) };
    }
  });
  window.TRV_THUMB = () => { cards.pick('lucid-lila-integration-star'); clock.pause(); clock.set(0.8); S.cam = 'panorama'; camChips.set('panorama', true); sc.view(CAMS.panorama, 0); paint.now(); };
  cards.pick(cards.initial('lucid-lila-integration-star'));
  booting = false;
  paint();
})();
