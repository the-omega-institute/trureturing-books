/* HILBERT//LEDGER · 三维概念场账本与封顶 · The 3D concept-field ledger and its cap
   One rail, λ ∈ [0, 1] (the unfolding), drives five scenes drawn as lit solids:
     unfold  five concepts (space, color, rotation, translation, scale) with weights w = (0.30, 0.25, 0.20, 0.15, 0.10)
             make one unit vector ψ = ⊕ √w_α u_α of ℝ¹⁵. At λ = 0 the five balls sit inside one pooled ball (all 15
             axes in one space, so(15): 105 generators, 90 of them cross-concept); at λ = 1 they are five 3D balls of
             radius √w_α (5 × so(3): 15 generators). The page pairs the 15 basis vectors and counts.
     joint   space ⊗ color as two qubits (m = n = 2): ρ(λ) = (1 − λ/2)|Φ⁺⟩⟨Φ⁺| + (λ/2)|Φ⁻⟩⟨Φ⁻|, the Bell density at λ = 0
             and the classically correlated (|00⟩⟨00| + |11⟩⟨11|)/2 at λ = 1. Both local Bloch vectors stay 0 (6 local
             numbers), the 9 correlations T_ij = tr(ρ σ_i ⊗ σ_j) move. The color ball holds the orthonormal RGB frame
             (det G₃ = 1) and the skewed LMS frame of three Gaussian cone curves (Simpson-integrated Gram, Löwdin root).
     motion  the octant arc body under x ↦ R(λθn) diag(e^{λh}) x + λt; translation, rotation vector and log principal
             strains run in three 3D balls; the polar decomposition of F reads h back.
     cap     d = round(1 + 4λ) ∈ {1, …, 5}: d gradient arrows (1-forms), C(d, 2) curl rings (2-forms) and where the Hodge
             star sends each 2-form (an axis only at d = 3); quaternions, a pure Bloch vector, the so(4) split.
     halt    the tower w_k = (1 − q)q^{k−1}, q = 0.65, as a spiral of chambers; ε_self folds the tail once q^K ≤ ε
             (the amber ring and handle).
   Read-only probe: window.HILBERT_LEDGER_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, DEG = PI / 180;
  const O3 = [0, 0, 0];
  const SCENES = ['unfold', 'joint', 'motion', 'cap', 'halt'];
  const VIEWS = { unfold: [-0.5, 0.62], joint: [-0.62, 0.42], motion: [-0.62, 0.42], cap: [-0.72, 0.4], halt: [-0.3, 0.8] };
  const SKY = v3.unit([0.35, -0.3, 0.88]);        // a world-fixed direction that shades the bowls (turning changes them)
  const SIDE = v3.unit([-0.55, 0.62, 0.35]);      // the same for the chambers of the tower, seen from above
  const EPS_MIN = 0.01, EPS_MAX = 0.5;
  const STAR = '<span class="star">⋆</span>';     // the Hodge star, drawn larger: the data face sets ⋆ as a dot

  /* ---------- small linear algebra ---------- */
  const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  const matMul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
  const matVec = (A, v) => A.map((r) => r.reduce((s, x, k) => s + x * v[k], 0));
  const tr = (A) => A.reduce((s, r, i) => s + r[i], 0);
  const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
  const det3 = (M) => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
  /** Rotation by a about the unit axis n (Rodrigues). */
  function rotMat(n, a) {
    const c = Math.cos(a), s = Math.sin(a), k = 1 - c, [x, y, z] = n;
    return [[c + x * x * k, x * y * k - z * s, x * z * k + y * s], [y * x * k + z * s, c + y * y * k, y * z * k - x * s], [z * x * k - y * s, z * y * k + x * s, c + z * z * k]];
  }
  /** Eigen-decomposition of a symmetric matrix (cyclic Jacobi): values ascending, vectors as the matching columns. */
  function eigSym(Min) {
    const n = Min.length, A = Min.map((r) => r.slice()), V = eye(n);
    for (let sweep = 0; sweep < 80; sweep++) {
      let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += A[i][j] ** 2;
      if (off < 1e-30) break;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
        if (Math.abs(A[p][q]) < 1e-300) continue;
        const th = (A[q][q] - A[p][p]) / (2 * A[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < n; k++) { const a = A[k][p], b = A[k][q]; A[k][p] = c * a - s * b; A[k][q] = s * a + c * b; }
        for (let k = 0; k < n; k++) { const a = A[p][k], b = A[q][k]; A[p][k] = c * a - s * b; A[q][k] = s * a + c * b; }
        for (let k = 0; k < n; k++) { const a = V[k][p], b = V[k][q]; V[k][p] = c * a - s * b; V[k][q] = s * a + c * b; }
      }
    }
    const order = A.map((r, i) => i).sort((i, j) => A[i][i] - A[j][j]);
    return { values: order.map((i) => A[i][i]), vectors: V.map((r) => order.map((i) => r[i])) };
  }
  /** f(A) = V f(Λ) Vᵀ for a symmetric A. */
  function symFn(A, f) {
    const { values, vectors: V } = eigSym(A), n = A.length;
    return Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => values.reduce((s, l, k) => s + V[i][k] * f(l) * V[j][k], 0)));
  }

  /* ---------- 1. pooling and binning: generators of so(3k) by pairs of basis vectors ---------- */
  const CONCEPTS = [
    { key: 'space', zh: '空间', en: 'Space', w: 0.30 },
    { key: 'color', zh: '颜色', en: 'Color', w: 0.25 },
    { key: 'rotation', zh: '旋转', en: 'Rotation', w: 0.20 },
    { key: 'translation', zh: '平移', en: 'Translation', w: 0.15 },
    { key: 'scale', zh: '缩放', en: 'Scale', w: 0.10 }
  ];
  const W5 = CONCEPTS.map((c) => c.w);
  /** Every pair i < j of the 3k basis vectors is one generator of so(3k); it stays inside a concept or crosses two. */
  function ledgerOf(k) {
    const n = 3 * k, pairs = [];
    let intra = 0, cross = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      const a = Math.floor(i / 3), b = Math.floor(j / 3);
      if (a === b) intra++; else { cross++; pairs.push([a, i % 3, b, j % 3]); }
    }
    return { k, n, pooled: intra + cross, intra, cross, pairs };
  }
  const LEDGER5 = ledgerOf(5), LEDGER3 = ledgerOf(3);
  const SLOT_R = 1.45;
  const SLOTS = CONCEPTS.map((_, a) => { const t = (112 + 72 * a) * DEG; return [SLOT_R * Math.cos(t), SLOT_R * Math.sin(t), 0]; });
  /** Each concept's own frame (columns: its three axes) and the direction of its block of ψ. */
  const FRAMES = CONCEPTS.map((_, a) => rotMat(v3.unit([Math.cos(1.3 * a + 0.4), Math.sin(1.3 * a + 0.4), 0.9]), 0.3 + 0.47 * a));
  const U_LOCAL = CONCEPTS.map((_, a) => v3.unit([0.62 + 0.1 * a, 0.5 - 0.12 * a, 0.6]));
  const axisOf = (a, i) => [FRAMES[a][0][i], FRAMES[a][1][i], FRAMES[a][2][i]];
  function unfoldOf(lam) {
    const psi = [];
    CONCEPTS.forEach((c, a) => U_LOCAL[a].forEach((x) => psi.push(Math.sqrt(c.w) * x)));
    const norm2 = psi.reduce((s, x) => s + x * x, 0), blocks = CONCEPTS.map((_, a) => psi.slice(3 * a, 3 * a + 3).reduce((s, x) => s + x * x, 0));
    const balls = CONCEPTS.map((c, a) => ({
      c: v3.scale(SLOTS[a], lam), r: (1 - lam) * (1 - 0.035 * a) + lam * Math.sqrt(c.w),
      block: v3.scale(matVec(FRAMES[a], U_LOCAL[a]), Math.sqrt(c.w))
    }));
    return { lam, psi, norm2, blocks, sumW: W5.reduce((s, x) => s + x, 0), balls };
  }

  /* ---------- 2. space ⊗ color: the blind spot of the local ledger ---------- */
  const cz = (n) => ({ re: Array.from({ length: n }, () => new Array(n).fill(0)), im: Array.from({ length: n }, () => new Array(n).fill(0)) });
  const cmat = (re, im) => ({ re, im: im || re.map((r) => r.map(() => 0)) });
  const PAULI = [cmat([[1, 0], [0, 1]]), cmat([[0, 1], [1, 0]]), cmat([[0, 0], [0, 0]], [[0, -1], [1, 0]]), cmat([[1, 0], [0, -1]])];
  function kron(A, B) {
    const n = A.re.length, m = B.re.length, C = cz(n * m);
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let k = 0; k < m; k++) for (let l = 0; l < m; l++) {
      C.re[i * m + k][j * m + l] = A.re[i][j] * B.re[k][l] - A.im[i][j] * B.im[k][l];
      C.im[i * m + k][j * m + l] = A.re[i][j] * B.im[k][l] + A.im[i][j] * B.re[k][l];
    }
    return C;
  }
  /** tr(A† B) and tr(ρ M) for a real ρ. */
  function hs(A, B) {
    let re = 0, im = 0; const n = A.re.length;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { re += A.re[i][j] * B.re[i][j] + A.im[i][j] * B.im[i][j]; im += A.re[i][j] * B.im[i][j] - A.im[i][j] * B.re[i][j]; }
    return [re, im];
  }
  const expect = (rho, M) => { let re = 0, im = 0; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { re += rho[i][j] * M.re[j][i]; im += rho[i][j] * M.im[j][i]; } return [re, im]; };
  const PRODUCTS = [];
  for (let mu = 0; mu < 4; mu++) for (let nu = 0; nu < 4; nu++) if (mu || nu) PRODUCTS.push({ mu, nu, sector: !nu ? 'A' : !mu ? 'B' : 'corr', M: kron(PAULI[mu], PAULI[nu]) });
  const SECTORS = { A: PRODUCTS.filter((p) => p.sector === 'A').length, B: PRODUCTS.filter((p) => p.sector === 'B').length, corr: PRODUCTS.filter((p) => p.sector === 'corr').length };
  let hsOff = 0, hsDiag = 0;
  PRODUCTS.forEach((p, i) => PRODUCTS.forEach((q, j) => { const [re, im] = hs(p.M, q.M); if (i === j) hsDiag = Math.max(hsDiag, Math.abs(re - 4)); else hsOff = Math.max(hsOff, Math.hypot(re, im)); }));
  const jointCache = new Map();
  function jointOf(lam) {
    const key = lam.toFixed(9);
    if (jointCache.has(key)) return jointCache.get(key);
    const p = 1 - lam / 2, s = Math.SQRT1_2, phiP = [s, 0, 0, s], phiM = [s, 0, 0, -s];
    const rho = Array.from({ length: 4 }, (_, i) => Array.from({ length: 4 }, (_, j) => p * phiP[i] * phiP[j] + (1 - p) * phiM[i] * phiM[j]));
    const a = [1, 2, 3].map((i) => expect(rho, kron(PAULI[i], PAULI[0]))[0]);
    const b = [1, 2, 3].map((j) => expect(rho, kron(PAULI[0], PAULI[j]))[0]);
    const T = [1, 2, 3].map((i) => [1, 2, 3].map((j) => expect(rho, kron(PAULI[i], PAULI[j]))[0]));
    const imag = Math.max(...PRODUCTS.map((q) => Math.abs(expect(rho, q.M)[1])));
    // partial transpose on B: ρ^{T_B}[(i,j),(k,l)] = ρ[(i,l),(k,j)]
    const pt = Array.from({ length: 4 }, (_, r) => Array.from({ length: 4 }, (_, c) => { const i = r >> 1, j = r & 1, k = c >> 1, l = c & 1; return rho[2 * i + l][2 * k + j]; }));
    const rhoSpectrum = eigSym(rho).values, ptSpectrum = eigSym(pt).values;
    let tF = 0; T.forEach((r) => r.forEach((x) => { tF += x * x; }));
    const out = { lam, p, rho, a, b, T, normA: Math.hypot(...a), normB: Math.hypot(...b), normT: Math.sqrt(tF), rhoSpectrum, ptSpectrum, ptMin: ptSpectrum[0], trace: tr(rho), imag };
    jointCache.set(key, out);
    if (jointCache.size > 300) jointCache.delete(jointCache.keys().next().value);
    return out;
  }
  /** Three Gaussian cone curves (peaks 564, 534, 420 nm, σ = 40 nm): Gram of their L² inner products by Simpson's rule. */
  const CONES = [{ k: 'L', mu: 564 }, { k: 'M', mu: 534 }, { k: 'S', mu: 420 }], SIG = 40;
  const GRAM = (() => {
    const lo = 200, hi = 900, N = 2800, h = (hi - lo) / N, g = (mu, x) => Math.exp(-((x - mu) ** 2) / (2 * SIG * SIG));
    const integral = (f) => { let s = f(lo) + f(hi); for (let i = 1; i < N; i++) s += (i % 2 ? 4 : 2) * f(lo + i * h); return s * h / 3; };
    const raw = CONES.map((A) => CONES.map((B) => integral((x) => g(A.mu, x) * g(B.mu, x))));
    const G = raw.map((r, i) => r.map((x, j) => x / Math.sqrt(raw[i][i] * raw[j][j])));
    const root = symFn(G, Math.sqrt);                               // Löwdin: the frame nearest the orthonormal RGB axes
    const frame = [0, 1, 2].map((j) => [root[0][j], root[1][j], root[2][j]]);
    const rgb = eye(3), rgbFrame = [0, 1, 2].map((j) => rgb.map((r) => r[j]));
    const gramOf = (F) => F.map((u) => F.map((v) => v3.dot(u, v)));
    return { G, det: det3(G), frame, frameGram: gramOf(frame), rgb: { G: gramOf(rgbFrame), det: det3(gramOf(rgbFrame)) } };
  })();

  /* ---------- 3. motion: translation, rotation, scale in three 3D balls ---------- */
  const MOTION = { t: [0.4, 0.36, 0.16], theta: 120 * DEG, n: v3.unit([1, 1, 1]), h: [Math.log(1.5), Math.log(1.25), Math.log(0.8)] };
  const motionCache = new Map();
  function motionOf(lam) {
    const key = lam.toFixed(9);
    if (motionCache.has(key)) return motionCache.get(key);
    const R = rotMat(MOTION.n, lam * MOTION.theta), h = MOTION.h.map((x) => lam * x), U = [[Math.exp(h[0]), 0, 0], [0, Math.exp(h[1]), 0], [0, 0, Math.exp(h[2])]];
    const F = matMul(R, U), t = v3.scale(MOTION.t, lam);
    // polar decomposition F = R'U': U' = √(FᵀF), R' = F U'⁻¹; the log principal strains are ½ ln of the eigenvalues of FᵀF
    const C = matMul(transpose(F), F), { values } = eigSym(C), Uback = symFn(C, Math.sqrt), Uinv = symFn(C, (x) => 1 / Math.sqrt(x));
    const Rback = matMul(F, Uinv), cosA = clamp((tr(Rback) - 1) / 2, -1, 1);
    const strains = values.map((x) => Math.log(x) / 2);
    const out = { lam, R, U, F, t, h, detF: det3(F), strains, angle: Math.acos(cosA), Rback, Uback, rotVec: v3.scale(MOTION.n, lam * MOTION.theta) };
    motionCache.set(key, out);
    if (motionCache.size > 300) motionCache.delete(motionCache.keys().next().value);
    return out;
  }
  /** sl(2, ℝ) in the basis H, E, F: structure constants from commutators, Killing form tr(ad X ad Y). */
  const KILLING = (() => {
    const B = [[[1, 0], [0, -1]], [[0, 1], [0, 0]], [[0, 0], [1, 0]]];
    const m2 = (A, C) => [[A[0][0] * C[0][0] + A[0][1] * C[1][0], A[0][0] * C[0][1] + A[0][1] * C[1][1]], [A[1][0] * C[0][0] + A[1][1] * C[1][0], A[1][0] * C[0][1] + A[1][1] * C[1][1]]];
    const comm = (A, C) => { const x = m2(A, C), y = m2(C, A); return [[x[0][0] - y[0][0], x[0][1] - y[0][1]], [x[1][0] - y[1][0], x[1][1] - y[1][1]]]; };
    const coords = (M) => [M[0][0], M[0][1], M[1][0]];              // M = a H + b E + c F
    const ad = B.map((X) => transpose(B.map((Y) => coords(comm(X, Y)))));
    const K = ad.map((A) => ad.map((C) => tr(matMul(A, C))));
    const ev = eigSym(K).values;
    return { K, eig: ev, signature: [ev.filter((x) => x > 1e-9).length, ev.filter((x) => x < -1e-9).length] };
  })();

  /* ---------- 4. the field cap: d gradients against C(d, 2) curls ---------- */
  const binom = (n, k) => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };
  /** d unit vectors of ℝ^d projected to ℝ³ by a 3 × d map with orthonormal rows (a tight frame for d > 3). */
  function frameOf(d) {
    if (d <= 3) return Array.from({ length: d }, (_, i) => [0, 1, 2].map((r) => (r === i ? 1 : 0)));
    if (d === 4) return [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]].map((v) => v3.scale(v, Math.sqrt(3 / 4) / Math.sqrt(3)));
    return Array.from({ length: d }, (_, j) => { const a = 2 * PI * j / d + PI / 2; return [Math.sqrt(2 / d) * Math.cos(a), Math.sqrt(2 / d) * Math.sin(a), Math.sqrt(1 / d)]; });
  }
  const capCache = new Map();
  function capOf(d) {
    if (capCache.has(d)) return capCache.get(d);
    const cols = frameOf(d);
    let tight = 0; for (let r = 0; r < 3; r++) for (let s = 0; s < 3; s++) { if (d < 3 && (r >= d || s >= d)) continue; const v = cols.reduce((acc, c) => acc + c[r] * c[s], 0); tight = Math.max(tight, Math.abs(v - (r === s ? 1 : 0))); }
    const twos = [];
    for (let i = 0; i < d; i++) for (let j = i + 1; j < d; j++) {
      const rest = Array.from({ length: d }, (_, k) => k).filter((k) => k !== i && k !== j);
      twos.push({ i, j, star: rest });                               // ⋆(e_i ∧ e_j) = ± e_{rest}: a (d − 2)-form
    }
    // d = 4: the six generators L_ij of so(4) split into self-dual and anti-self-dual triples that commute
    let so4 = null;
    if (d === 4) {
      const Lg = (i, j) => { const M = eye(4).map((r) => r.map(() => 0)); M[i][j] = 1; M[j][i] = -1; return M; };
      const add = (A, B, s) => A.map((r, i) => r.map((x, j) => (x + s * B[i][j]) / 2));
      const pairs = [[[0, 1], [2, 3], 1], [[0, 2], [1, 3], -1], [[0, 3], [1, 2], 1]];
      const Aset = pairs.map(([p, q, s]) => add(Lg(...p), Lg(...q), s)), Bset = pairs.map(([p, q, s]) => add(Lg(...p), Lg(...q), -s));
      const comm = (X, Y) => { const a = matMul(X, Y), b = matMul(Y, X); return a.map((r, i) => r.map((x, j) => x - b[i][j])); };
      const maxAbs = (M) => Math.max(...M.flat().map(Math.abs));
      let cross = 0; Aset.forEach((X) => Bset.forEach((Y) => { cross = Math.max(cross, maxAbs(comm(X, Y))); }));
      // closure: [X_a, X_b] lies in the span of the same triple (residual after projecting with the trace form)
      const closure = (S) => {
        let worst = 0;
        S.forEach((X, a) => S.forEach((Y, b) => {
          if (a >= b) return;
          const Cm = comm(X, Y), coef = S.map((Z) => tr(matMul(transpose(Z), Cm)) / tr(matMul(transpose(Z), Z)));
          const res = Cm.map((r, i) => r.map((x, j) => x - S.reduce((s, Z, k) => s + coef[k] * Z[i][j], 0)));
          worst = Math.max(worst, maxAbs(res));
        }));
        return worst;
      };
      so4 = { cross, closeA: closure(Aset), closeB: closure(Bset), sizes: [Aset.length, Bset.length] };
    }
    const out = { d, cols, tight, ones: d, twos: twos.length, gap: binom(d, 2) - d, starDegree: d - 2, pairs: twos, so4 };
    capCache.set(d, out);
    return out;
  }
  /** Quaternion products (w, x, y, z) and the cross product of the d = 3 card. */
  const QUAT = (() => {
    const qm = (p, q) => [p[0] * q[0] - p[1] * q[1] - p[2] * q[2] - p[3] * q[3], p[0] * q[1] + p[1] * q[0] + p[2] * q[3] - p[3] * q[2], p[0] * q[2] - p[1] * q[3] + p[2] * q[0] + p[3] * q[1], p[0] * q[3] + p[1] * q[2] - p[2] * q[1] + p[3] * q[0]];
    const i = [0, 1, 0, 0], j = [0, 0, 1, 0], k = [0, 0, 0, 1];
    return { ij: qm(i, j), jk: qm(j, k), ki: qm(k, i), ii: qm(i, i), ji: qm(j, i), cross: v3.cross([1, 0, 0], [0, 1, 0]) };
  })();
  /** A pure qubit state, its Bloch vector by the Lean formula (2 Re M₀₁, −2 Im M₀₁, M₀₀ − M₁₁), and M² = M. */
  const BLOCH = (() => {
    const th = 0.9, ph = 2.4, c = Math.cos(th / 2), s = Math.sin(th / 2);
    const psi = [[c, 0], [s * Math.cos(ph), s * Math.sin(ph)]];     // complex amplitudes [re, im]
    const M = [0, 1].map((i) => [0, 1].map((j) => [psi[i][0] * psi[j][0] + psi[i][1] * psi[j][1], psi[i][1] * psi[j][0] - psi[i][0] * psi[j][1]]));
    const r = [2 * M[0][1][0], -2 * M[0][1][1], M[0][0][0] - M[1][1][0]];
    const sq = [0, 1].map((i) => [0, 1].map((j) => [0, 1].reduce((acc, k) => [acc[0] + M[i][k][0] * M[k][j][0] - M[i][k][1] * M[k][j][1], acc[1] + M[i][k][0] * M[k][j][1] + M[i][k][1] * M[k][j][0]], [0, 0])));
    let idem = 0; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) idem = Math.max(idem, Math.hypot(sq[i][j][0] - M[i][j][0], sq[i][j][1] - M[i][j][1]));
    // blochMatrix(1, r) = [[(1 + r₂)/2, (r₀ − i r₁)/2], [(r₀ + i r₁)/2, (1 − r₂)/2]]
    const BM = [[[(1 + r[2]) / 2, 0], [r[0] / 2, -r[1] / 2]], [[r[0] / 2, r[1] / 2], [(1 - r[2]) / 2, 0]]];
    let match = 0; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) match = Math.max(match, Math.hypot(BM[i][j][0] - M[i][j][0], BM[i][j][1] - M[i][j][1]));
    return { theta: th, phi: ph, M, r, norm: v3.len(r), trace: M[0][0][0] + M[1][1][0], idem, match };
  })();

  /* ---------- 5. the unhalted tower and the self-halting precision ---------- */
  const Q = 0.65, N_SUM = 400, N_DRAW = 22;
  const WK = Array.from({ length: N_SUM }, (_, k) => (1 - Q) * Q ** k);       // w_1 … w_400
  const SUFFIX = new Array(N_SUM + 1).fill(0);                                  // SUFFIX[K] = Σ_{k > K} w_k
  for (let K = N_SUM - 1; K >= 0; K--) SUFFIX[K] = SUFFIX[K + 1] + WK[K];
  const towerCache = new Map();
  function towerOf(eps) {
    const key = eps.toFixed(9);
    if (towerCache.has(key)) return towerCache.get(key);
    let K = 1; while (K < N_SUM && SUFFIX[K] > eps) K++;
    const kept = WK.slice(0, K).reduce((s, x) => s + x, 0), above = WK.filter((x) => x >= eps).length, sumW = SUFFIX[0];
    const out = { q: Q, eps, K, kept, tail: SUFFIX[K], above, bound: sumW / eps, sumW, w: WK.slice(0, 16) };
    towerCache.set(key, out);
    if (towerCache.size > 300) towerCache.delete(towerCache.keys().next().value);
    return out;
  }
  /* the spiral of chambers: chamber k sits at P(k), radius r₁ g^{k−1} with g = √q (the ℓ² amplitude of w_k) */
  const SP = { rho1: 1.32, r1: 0.56, dth: 50 * DEG, th1: 200 * DEG, g: Math.sqrt(Q) };
  const spiralAt = (s) => { const rho = SP.rho1 * SP.g ** (s - 1), th = SP.th1 - (s - 1) * SP.dth; return [rho * Math.cos(th), rho * Math.sin(th), 0]; };
  const chamberR = (k) => SP.r1 * SP.g ** (k - 1);

  /* ---------- state ---------- */
  const S = { scene: 'unfold', lens: 'ledger', lam: 1, eps: 0.05 };
  const dimOf = (lam) => clamp(Math.round(1 + 4 * lam), 1, 5);
  function model() {
    const d = dimOf(S.lam);
    return { lam: S.lam, d, U: unfoldOf(S.lam), J: jointOf(S.lam), M: motionOf(S.lam), C: capOf(d), T: towerOf(S.eps) };
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; probe.style.position = 'absolute'; tagBox.appendChild(probe);
  const options = { canvas: $('cv'), yaw: VIEWS.unfold[0], pitch: VIEWS.unfold[1], wheel: false, radius: 0.3, cx: 0.5, cy: 0.5, onChange: () => paint() };
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

  /* The projection is fitted to the HUD-free rect from points that do not depend on λ (every scene keeps its frame while
     the rail plays); it is held while the handle is dragged, so the anchor stays under the pointer. */
  const SPHERE_DIRS = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]].concat(
    [[1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1], [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]].map((v) => v3.unit(v)));
  const ballPts = (c, r) => SPHERE_DIRS.map((d) => v3.add(c, v3.scale(d, r)));
  /** Fixed places in the frame of a view: x along screen right, y up, z towards the viewer. */
  function inView(view, x, y, z) {
    const [yaw, pitch] = view, cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const R = [cy, -sy, 0], U = [sy * sp, cy * sp, cp], D = [-sy * cp, -cy * cp, sp];
    return v3.add(v3.add(v3.scale(R, x), v3.scale(U, y)), v3.scale(D, z));
  }
  const MBALLS = [
    { key: 't', zh: '平移', en: 'Translation', c: inView(VIEWS.motion, -2.15, 0.55, -0.3), color: () => P.cyan },
    { key: 'r', zh: '旋转', en: 'Rotation', c: inView(VIEWS.motion, 0.0, 1.75, -1.0), color: () => P.violet },
    { key: 's', zh: '缩放', en: 'Scale', c: inView(VIEWS.motion, 2.15, 0.55, -0.3), color: () => P.magenta }
  ];
  const MBALL_R = 0.46, BODY_S = 1.0, BODY_G = [0.375, 0.375, 0.375];
  const bodyPoint = (p, Mo) => v3.add(matVec(Mo.F, v3.scale(v3.sub(p, BODY_G), BODY_S)), Mo.t);
  const JOINT_R = 0.72, jointX = (lam) => 0.82 + 0.68 * lam;
  const FIT = {
    unfold: () => [...ballPts(O3, 1), ...CONCEPTS.flatMap((c, a) => ballPts(SLOTS[a], Math.sqrt(c.w) * 1.12))],
    joint: () => [...ballPts([-jointX(1), 0, 0], JOINT_R * 1.18), ...ballPts([jointX(1), 0, 0], JOINT_R * 1.18), ...ballPts([-jointX(0), 0, 0], JOINT_R), ...ballPts([jointX(0), 0, 0], JOINT_R)],
    motion: () => {
      const pts = [];
      for (const lam of [0, 0.5, 1]) { const Mo = motionOf(lam); for (const p of [O3, [1, 0, 0], [0, 1, 0], [0, 0, 1], v3.unit([1, 1, 1])]) pts.push(bodyPoint(p, Mo)); }
      MBALLS.forEach((b) => pts.push(...ballPts(b.c, MBALL_R * 1.1)));
      return pts;
    },
    cap: () => [...ballPts(O3, 1.02), ...[1, 2, 3, 4, 5].flatMap((d) => frameOf(d).map((c) => v3.scale(c, 1.22)))],
    halt: () => Array.from({ length: 8 }, (_, i) => ballPts(spiralAt(i + 1), chamberR(i + 1))).flat()
  };
  const fitCache = new Map();
  const fitPts = (scene) => { if (!fitCache.has(scene)) fitCache.set(scene, FIT[scene]()); return fitCache.get(scene); };
  function camAxes() {
    const cy = Math.cos(sc.cam.yaw), sy = Math.sin(sc.cam.yaw), cp = Math.cos(sc.cam.pitch), sp = Math.sin(sc.cam.pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp] };
  }
  function fitTo(area, W, H) {
    const { R, U } = camAxes();
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const p of fitPts(S.scene)) { const x = v3.dot(p, R), y = v3.dot(p, U); x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    const px = 0.05 * (x1 - x0), py = 0.05 * (y1 - y0);
    const unit = Math.max(16, Math.min(area.w / (x1 - x0 + 2 * px), area.h / (y1 - y0 + 2 * py)));
    const u = unit * (sc.cam.zoom || 1);
    options.radius = unit / Math.max(1, Math.min(W, H));
    options.cx = (area.x + area.w / 2 - u * (x0 + x1) / 2) / Math.max(1, W);
    options.cy = (area.y + area.h / 2 + u * (y0 + y1) / 2) / Math.max(1, H);
    return unit;
  }

  /* drawing helpers */
  /** The far half of a ball (about the viewer), opaque and shaded along a world-fixed direction: with the glass in front,
      what is inside the ball stays visible and the ball still reads as a lit body. */
  function bowl(key, c, r, color, s = {}) {
    const D = sc.facing(), up = Math.abs(D[2]) < 0.95 ? [0, 0, 1] : [1, 0, 0];
    const e1 = v3.unit(v3.cross(up, D)), e2 = v3.cross(D, e1);
    const dir = (u, v) => { const th = u * PI / 2, ph = v * 2 * PI; return v3.add(v3.scale(D, -Math.cos(th)), v3.add(v3.scale(e1, Math.sin(th) * Math.cos(ph)), v3.scale(e2, Math.sin(th) * Math.sin(ph)))); };
    sc.surface(key, (u, v) => v3.add(c, v3.scale(dir(u, v), r * 0.985)), {
      u: [0, 1], v: [0, 1], nu: s.nu || 10, nv: s.nv || 36, value: (u, v) => v3.dot(dir(u, v), SKY), colors: [P.dim, color], range: [-1, 1], pick: false
    });
    sc.glass(`${key}-glass`, c, r, { color, alpha: s.glass == null ? 0.06 : s.glass });
  }
  /** A whole lit sphere (the chambers of the tower). */
  function ball(key, c, r, color) {
    const n = (u, v) => { const th = u * PI, ph = v * 2 * PI; return [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)]; };
    sc.surface(key, (u, v) => v3.add(c, v3.scale(n(u, v), r)),
      { u: [0, 1], v: [0, 1], nu: 14, nv: 24, value: (u, v) => v3.dot(n(u, v), SIDE), colors: [P.dim, color], range: [-1.2, 1], grid: { every: [7, 6], color: P.ink, alpha: 0.22 }, pick: false });
  }
  /** The point of a ball at the top (s = 1) or the bottom (s = −1) of the screen, under the current camera. */
  const rim = (c, r, s = 1) => v3.add(c, v3.scale(camAxes().U, s * r));
  const arcPts = (c, a, b, r, n = 16) => Array.from({ length: n + 1 }, (_, i) => v3.add(c, v3.scale(v3.slerp(v3.unit(a), v3.unit(b), i / n), r)));

  let FRAME = null, FITTED = null;
  function drawStage(Mx) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 24, y: 24, w: W - 48, h: H - 48 } : safeRect(W, H, huds);
    if (!dragging || !FITTED) { FITTED = { area }; fitTo(area, W, H); }
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = [];
    const tags = [];
    const at = (p, html, cls, pri, dir) => { if (!thumb) tags.push({ p, html, cls, pri, dir }); };
    const pooled = S.lens === 'pooled';
    sc.begin();
    let anchor = null;
    if (S.scene === 'unfold') anchor = drawUnfold(Mx.U, pooled, at);
    else if (S.scene === 'joint') anchor = drawJoint(Mx.J, pooled, at);
    else if (S.scene === 'motion') anchor = drawMotion(Mx.M, pooled, at);
    else if (S.scene === 'cap') drawCap(Mx.C, pooled, at);
    else anchor = drawHalt(Mx.T, pooled, at);
    sc.end();

    const hq = anchor && !thumb ? sc.p(anchor) : null;
    if (hq) OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    placeHandle(hq);
    if (!thumb) {
      const cen = sc.p(O3);
      tags.forEach((t, k) => {
        const q = sc.p(t.p), dir = t.dir ? [t.dir[0], t.dir[1]] : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1];
        want(`t${k}`, q, t.html, t.cls, { pri: t.pri, dir, r: 12 });
      });
      placeLabels();
    }
    FRAME = { W, H, area: FITTED.area, handle: hq ? { x: hq[0], y: hq[1] } : null, unit: sc.unit, cx: sc.cx, cy: sc.cy };
  }

  function drawUnfold(U, pooled, at) {
    const lam = U.lam, tips = U.balls.map((b, a) => [0, 1, 2].map((i) => v3.add(b.c, v3.scale(axisOf(a, i), b.r * 0.9))));
    U.balls.forEach((b, a) => bowl(`ball-${a}`, b.c, b.r, P.cyan, { glass: 0.05 + 0.03 * (1 - lam) }));
    // the 90 cross-concept rotations: a chord from every axis of one concept to every axis of another
    const chordAlpha = pooled ? 0.62 : 0.06 + 0.56 * (1 - lam);
    for (const [a, i, b, j] of LEDGER5.pairs) sc.line([tips[a][i], tips[b][j]], { color: P.magenta, width: pooled ? 1.1 : 0.9, alpha: chordAlpha });
    // the 15 in-block generators: three axes and a ring round each, per concept
    U.balls.forEach((b, a) => {
      for (let i = 0; i < 3; i++) {
        sc.line([b.c, tips[a][i]], { color: P.violet, width: 1.6 });
        if (!pooled || lam > 0.5) sc.ring(tips[a][i], { key: `gen-${a}-${i}`, color: P.violet, r: 4.2, normal: axisOf(a, i) });
      }
      sc.arrow(b.c, v3.add(b.c, b.block), { color: P.sigma, width: 2.2, headSize: 9 });
    });
    if (lam > 0.35) U.balls.forEach((b, a) => at(rim(b.c, b.r), `${L(CONCEPTS[a].zh, CONCEPTS[a].en)} · w = ${fix(CONCEPTS[a].w, 2)}`, 'raw c-cy backed', 10 - a, [0, -1]));
    else at(rim(O3, U.balls[0].r), `ψ ∈ ℝ¹⁵ · so(15) = ${LEDGER5.pooled}`, 'raw ink backed', 10, [0, -1]);
    if (pooled || lam < 0.85) at(v3.lerp(tips[0][0], tips[1][2], 0.5), `${L('跨概念', 'cross')} 9·C(5, 2) = ${LEDGER5.cross}`, 'raw c-mg backed', 8, null);
    return v3.add(U.balls[0].c, [0, 0, 0]);
  }

  function drawJoint(J, pooled, at) {
    const X = jointX(J.lam), cs = [-X, 0, 0], cc = [X, 0, 0], r = JOINT_R, len = r * 0.9;
    bowl('space', cs, r, P.cyan); bowl('color', cc, r, P.cyan);
    const E = [[1, 0, 0], [0, 1, 0], [0, 0, 1]], NS = ['x', 'y', 'z'], NC = ['R', 'G', 'B'];
    const tipS = E.map((e) => v3.add(cs, v3.scale(e, len))), tipC = E.map((e) => v3.add(cc, v3.scale(e, len)));
    E.forEach((e, i) => {
      sc.arrow(cs, tipS[i], { color: P.violet, width: 1.8, headSize: 8 });
      sc.arrow(cc, tipC[i], { color: P.violet, width: 1.8, headSize: 8 });
      at(tipS[i], NS[i], 'raw c-vi', 6, null);
      at(tipC[i], NC[i], 'raw c-vi', 6, null);
    });
    // the skewed LMS frame inside the color ball (Löwdin): dashed cyan
    GRAM.frame.forEach((f, i) => { sc.line([cc, v3.add(cc, v3.scale(f, len * 0.92))], { color: P.cyan, width: 1.4, dash: [4, 3] }); at(v3.add(cc, v3.scale(f, len * 0.95)), CONES[i].k, 'raw c-cy', 5, null); });
    // the 9 correlations T_ij: an arch from axis i of space to axis j of color (it passes over the centres, where the
    // local Bloch vectors sit), width by |T_ij|, dashed when negative
    const arch = (a, b) => { const c = v3.add(v3.lerp(a, b, 0.5), [0, 0, 0.62]); return Array.from({ length: 25 }, (_, k) => { const t = k / 24; return v3.add(v3.add(v3.scale(a, (1 - t) ** 2), v3.scale(c, 2 * t * (1 - t))), v3.scale(b, t * t)); }); };
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      const t = J.T[i][j], mag = Math.abs(t);
      if (mag < 1e-9) { sc.line(arch(tipS[i], tipC[j]), { color: P.magenta, width: 0.6, alpha: 0.16 }); continue; }
      sc.line(arch(tipS[i], tipC[j]), { color: P.magenta, width: 1 + 3 * mag, alpha: pooled ? 0.95 : 0.8, dash: t < 0 ? [6, 4] : null });
    }
    // the local Bloch vectors: both 0, a bead at each centre
    sc.bead(v3.add(cs, J.a), { key: 'a', color: P.sigma, r: 4.6 });
    sc.bead(v3.add(cc, J.b), { key: 'b', color: P.sigma, r: 4.6 });
    at(rim(cs, r, -1), `${L('空间', 'Space')} · ‖a‖ = ${fix(J.normA, 2)}`, 'raw ink backed', 9, [0, 1]);
    at(rim(cc, r, -1), `${L('颜色', 'Color')} · ‖b‖ = ${fix(J.normB, 2)}`, 'raw ink backed', 9, [0, 1]);
    at(v3.add(v3.lerp(tipS[2], tipC[2], 0.5), [0, 0, 0.31]), `T = diag(${J.T.map((row, i) => fix(row[i], 2)).join(', ')})`, 'raw c-mg backed', 8, [0, -1]);
    at(rim(cc, r), `det G₃ · RGB ${fix(GRAM.rgb.det, 3)} · LMS ${fix(GRAM.det, 3)}`, 'raw c-vi backed', 7, [0.4, -1]);
    return [cc[0], 0, -r - 0.16];
  }

  function drawMotion(Mo, pooled, at) {
    // the octant arc body: three quarter-disc walls (violet) and the spherical cap (cyan), moved by x ↦ F x + t
    const B = (p) => bodyPoint(p, Mo);
    const wall = (key, a, b) => sc.surface(key, (u, v) => B(v3.scale(v3.slerp(a, b, v), u)), { u: [0, 1], v: [0, 1], nu: 5, nv: 18, color: P.violet, grid: { every: [1, 6], color: P.ink, alpha: 0.2 }, pick: false });
    wall('wallXY', [1, 0, 0], [0, 1, 0]); wall('wallYZ', [0, 1, 0], [0, 0, 1]); wall('wallZX', [0, 0, 1], [1, 0, 0]);
    sc.surface('cap', (u, v) => B(v3.unit(v3.lerp([0, 0, 1], v3.lerp([1, 0, 0], [0, 1, 0], v), u))), { u: [0, 1], v: [0, 1], nu: 16, nv: 16, color: P.cyan, grid: { every: [4, 4], color: P.ink, alpha: 0.18 }, pick: false });
    // the path of the body's centre (λ from 0 to 1) and the rest pose as a faint ghost outline
    const path = Array.from({ length: 41 }, (_, i) => v3.scale(MOTION.t, i / 40));
    sc.line(path, { color: P.cyan, width: 1.4, dash: [5, 4], alpha: 0.7 });
    const rest = motionOf(0);
    sc.line(arcPts(O3, [1, 0, 0], [0, 1, 0], 1, 16).map((p) => bodyPoint(p, rest)), { color: P.dim, width: 1, alpha: 0.6 });
    sc.line(arcPts(O3, [0, 1, 0], [0, 0, 1], 1, 16).map((p) => bodyPoint(p, rest)), { color: P.dim, width: 1, alpha: 0.6 });
    sc.line(arcPts(O3, [0, 0, 1], [1, 0, 0], 1, 16).map((p) => bodyPoint(p, rest)), { color: P.dim, width: 1, alpha: 0.6 });
    // three motion balls, each with its own three axes; the vector of the motion grows inside
    // full motion (λ = 1) reaches 0.9 of the ball for t and h; the rotation ball has radius π (rotation vectors |θ| ≤ π)
    const vecs = { t: v3.scale(Mo.t, 0.9 * MBALL_R / v3.len(MOTION.t)), r: v3.scale(Mo.rotVec, MBALL_R / PI), s: v3.scale(Mo.h, 0.9 * MBALL_R / v3.len(MOTION.h)) };
    const tips = MBALLS.map((mb) => [0, 1, 2].map((i) => v3.add(mb.c, v3.scale([0, 1, 2].map((r) => (r === i ? 1 : 0)), MBALL_R * 0.88))));
    MBALLS.forEach((mb, m) => {
      bowl(`mball-${mb.key}`, mb.c, MBALL_R, P.cyan);
      tips[m].forEach((tp) => sc.line([mb.c, tp], { color: P.dim, width: 1, alpha: 0.8 }));
      if (v3.len(vecs[mb.key]) > 1e-6) sc.arrow(mb.c, v3.add(mb.c, vecs[mb.key]), { color: mb.color(), width: 3.4, headSize: 12 });
      at(rim(mb.c, MBALL_R), L(mb.zh, mb.en), `raw ${mb.key === 't' ? 'c-cy' : mb.key === 'r' ? 'c-vi' : 'c-mg'} backed`, 9, [0, -1]);
    });
    // the strain ellipsoid inside the scale ball: semi-axes 0.2 e^{λ hᵢ}
    const sb = MBALLS[2].c;
    sc.surface('strain', (u, v) => { const th = u * PI, ph = v * 2 * PI; return [sb[0] + 0.16 * Math.exp(Mo.h[0]) * Math.sin(th) * Math.cos(ph), sb[1] + 0.16 * Math.exp(Mo.h[1]) * Math.sin(th) * Math.sin(ph), sb[2] + 0.16 * Math.exp(Mo.h[2]) * Math.cos(th)]; },
      { u: [0, 1], v: [0, 1], nu: 12, nv: 20, color: P.magenta, alpha: 0.55, pick: false });
    // the 27 cross-ball rotations a pooled ℝ⁹ would admit
    const crossAlpha = pooled ? 0.6 : 0.07;
    for (const [a, i, b, j] of LEDGER3.pairs) sc.line([tips[a][i], tips[b][j]], { color: P.magenta, width: 0.9, alpha: crossAlpha });
    const cen = Mo.t;
    at(v3.add(cen, [0, 0, -0.62]), `θ = ${fix(Mo.angle / DEG, 1)}° · det F = ${fix(Mo.detF, 3)}`, 'raw ink backed', 8, [0, 1]);
    if (pooled) at(v3.lerp(MBALLS[0].c, MBALLS[1].c, 0.5), `ℝ⁹ · 9·C(3, 2) = ${LEDGER3.cross}`, 'raw c-mg backed', 7, null);
    return cen;
  }

  function drawCap(C, pooled, at) {
    bowl('capball', O3, 1, P.cyan, { glass: 0.05 });
    sc.circle(O3, [0, 0, 1], 1, { color: P.dim, width: 1, back: 0.2 });
    const d = C.d, tipOf = (c) => v3.scale(c, 1.18);
    C.cols.forEach((c, i) => { sc.arrow(O3, tipOf(c), { color: P.cyan, width: 2.4, headSize: 10 }); at(tipOf(c), `e<sub>${i + 1}</sub>`, 'raw c-cy', 8, null); });
    // each 2-form e_i ∧ e_j: a faint fan between its two axes, a curl ring, and a violet line to where ⋆ sends it
    const ringAt = (pr) => { const s = v3.add(C.cols[pr.i], C.cols[pr.j]); return v3.len(s) < 1e-9 ? v3.scale(v3.unit(v3.cross(C.cols[pr.i], [0, 0, 1])), 0.6) : v3.scale(v3.unit(s), 0.62); };
    C.pairs.forEach((pr, k) => {
      const ci = C.cols[pr.i], cj = C.cols[pr.j], n = v3.cross(ci, cj), q = d === 3 ? v3.scale(C.cols[pr.star[0]], 0.74) : ringAt(pr);
      sc.fan([O3, ...arcPts(O3, ci, cj, 0.5, 10)], { fill: P.magenta, alpha: 0.12 });
      const nn = v3.len(n) > 1e-9 ? v3.unit(n) : [0, 0, 1], e1 = v3.unit(v3.cross(nn, Math.abs(nn[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])), e2 = v3.cross(nn, e1);
      const loop = Array.from({ length: 25 }, (_, t) => { const a = 2 * PI * t / 24; return v3.add(q, v3.add(v3.scale(e1, 0.13 * Math.cos(a)), v3.scale(e2, 0.13 * Math.sin(a)))); });
      sc.tube(`curl-${k}`, loop, { color: P.magenta, width: 2.6, glow: 0.5, pick: false, occlude: false });
      let target = null;
      if (d === 3) target = ringAt(pr);   // the plane of e_i ∧ e_j, joined to the ring round its dual axis
      else if (d === 4) { const partner = C.pairs.find((o) => o.i === pr.star[0] && o.j === pr.star[1]); if (partner && k < C.pairs.indexOf(partner)) target = ringAt(partner); }
      else if (d === 2) target = O3;
      else if (d === 5) target = v3.scale(pr.star.reduce((s, m) => v3.add(s, C.cols[m]), O3), 1 / 3);
      if (target) sc.line([q, target], { color: P.violet, width: 2, dash: [4, 3] });
      if (d === 5 && target) sc.bead(target, { key: `star-${k}`, color: P.violet, r: 3 });
    });
    if (d === 3) {
      sc.arrow(O3, BLOCH.r, { color: P.sigma, width: 2, headSize: 8 });
      at(BLOCH.r, `‖r‖ = ${fix(BLOCH.norm, 3)}`, 'raw ink backed', 6, null);
    }
    const msg = d === 1 ? 'Λ² = 0' : d === 2 ? `${STAR} : Λ² → Λ⁰` : d === 3 ? `${STAR} : Λ² → Λ¹ · ij = k` : d === 4 ? `${STAR} : Λ² → Λ² · 6 = 3 + 3` : `${STAR} : Λ² → Λ³`;
    at([0, 0, -1], msg, 'raw c-vi backed', 9, [0, 1]);
    if (pooled) at([0.0, 0.0, 1.0], `so(${d}) = ${C.twos}`, 'raw c-mg backed', 7, [0, -1]);
    return null;
  }

  function drawHalt(Tw, pooled, at) {
    const shown = Math.max(1, Math.ceil(S.lam * N_DRAW - 1e-9)), K = pooled ? Infinity : Tw.K;
    const guide = Array.from({ length: 121 }, (_, i) => spiralAt(1 + (N_DRAW - 1) * i / 120));
    sc.line(guide, { color: P.dim, width: 1, alpha: 0.55 });
    for (let k = 1; k <= N_DRAW; k++) {
      if (k > shown) continue;
      const active = k <= K;
      ball(`ch-${k}`, spiralAt(k), chamberR(k), active ? P.cyan : P.magenta);
    }
    let cut = null;
    if (!pooled) {
      const s = Tw.K + 0.5, p = spiralAt(s), tng = v3.unit(v3.sub(spiralAt(s + 0.05), spiralAt(s - 0.05)));
      // the cut: an amber hoop round the spiral in the gap after the K-th chamber, wider than the chambers beside it
      sc.circle(p, tng, 1.35 * chamberR(Tw.K), { color: P.amber, width: 2.6, fade: false });
      sc.ring(p, { key: 'cut', color: P.amber, r: 5, normal: tng });
      cut = p;
      at(p, `ε = ${fix(Tw.eps, 3)} · K = ${Tw.K}`, 'raw c-am backed', 10, [1, -0.4]);
      if (shown > Tw.K) at(rim(spiralAt(Tw.K + 1), chamberR(Tw.K + 1)), `${L('尾巴', 'tail')} ${fix(100 * Tw.tail, 2)}%`, 'raw c-mg backed', 8, [-1, -0.6]);
    } else at(rim(spiralAt(4), chamberR(4)), `${L('不停机', 'unhalted')} · Σw = 1`, 'raw c-cy backed', 8, null);
    at(rim(spiralAt(1), chamberR(1)), `w₁ = ${fix(WK[0], 2)}`, 'raw c-cy backed', 9, [-0.6, -1]);
    sc.bead(O3, { key: 'limit', color: P.dim, r: 2.6 });
    return cut;
  }

  /* ---------- the handle: λ on the anchor of the scene, ε_self on the cut of the tower ---------- */
  const handle = $('ledgerHandle');
  let dragging = null;
  function placeHandle(q) {
    const show = !!q && !TRV.still;
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
    const halt = S.scene === 'halt';
    handle.setAttribute('aria-label', halt ? L('拖动改变自停机精度 ε', 'Drag to change the self-halting precision ε') : L('拖动改变展开度 λ', 'Drag to change the unfolding λ'));
  }
  /** Where the handle sits for a value of λ in each scene (the path it is dragged along). */
  const anchorAt = (lam) => (S.scene === 'unfold' ? v3.scale(SLOTS[0], lam) : S.scene === 'joint' ? [jointX(lam), 0, -JOINT_R - 0.16] : S.scene === 'motion' ? v3.scale(MOTION.t, lam) : null);
  function pointerXY(ev) { const b = stageEl.getBoundingClientRect(); return [ev.clientX - b.left - stageEl.clientLeft, ev.clientY - b.top - stageEl.clientTop]; }
  function valueAt(ev) {
    const [x, y] = pointerXY(ev);
    if (S.scene === 'halt') {
      let best = S.eps, bd = Infinity;
      for (let k = 0; k <= 400; k++) {
        const s = 1.4 + (13 - 1.4) * k / 400, q = sc.p(spiralAt(s)), dd = Math.hypot(q[0] - x, q[1] - y);
        if (dd < bd) { bd = dd; best = Q ** (s - 0.5); }
      }
      return best;
    }
    let best = S.lam, bd = Infinity;
    for (let k = 0; k <= 200; k++) { const lam = k / 200, q = sc.p(anchorAt(lam)), dd = Math.hypot(q[0] - x, q[1] - y); if (dd < bd) { bd = dd; best = lam; } }
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
    const v = valueAt(ev);
    if (S.scene === 'halt') setEps(v); else clock.set(Math.round(v * 100) / 100);
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(ev.key)) return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    const k = ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : -1;
    if (S.scene === 'halt') setEps(S.eps + 0.005 * k); else clock.set(clamp(Math.round((S.lam + 0.02 * k) * 100) / 100, 0, 1));
  });

  /* ---------- HUD, legend, readouts ---------- */
  const LEGENDS = {
    unfold: () => [['cy', L('概念球 · 半径 √w', 'concept ball · radius √w')], ['vi', L('块内转轴 so(3)', 'in-block axes so(3)')], ['mg', L('跨概念伪转轴', 'cross-concept rotations')], ['am', L('手柄 λ', 'handle λ')]],
    joint: () => [['vi', L('空间 x y z · 颜色 R G B', 'space x y z · color R G B')], ['mg', L('相关 Tᵢⱼ（虚线为负）', 'correlations Tᵢⱼ (dashed: negative)')], ['cy', L('LMS 斜交框', 'skewed LMS frame')], ['am', L('手柄 λ', 'handle λ')]],
    motion: () => [['cy', L('平移 t', 'translation t')], ['vi', L('转动 θn · 物体墙', 'rotation θn · body walls')], ['mg', L('对数主应变 h', 'log principal strain h')], ['am', L('手柄 λ', 'handle λ')]],
    cap: () => [['cy', L('梯度 · 1-形式', 'gradients · 1-forms')], ['mg', L('旋度 · 2-形式', 'curls · 2-forms')], ['vi', L(`霍奇星号 ${STAR}`, `Hodge star ${STAR}`)]],
    halt: () => (S.lens === 'pooled'
      ? [['cy', L('不停机的模塔', 'the unhalted tower')], ['dm', L('螺线', 'spiral')]]
      : [['cy', L('活跃壳 k ≤ K', 'active shells k ≤ K')], ['mg', L('折叠的尾巴', 'folded tail')], ['am', L('截断 ε（手柄）', 'cut ε (handle)')]])
  };
  const lamText = () => fix(S.lam, 2);
  function hudText(Mx) {
    const pooled = S.lens === 'pooled', { U, J, M, C, T } = Mx;
    let big, sub;
    if (S.scene === 'unfold') {
      big = pooled ? `${L('混编', 'Pooled')} · so(15) = ${LEDGER5.pooled}` : `${L('展开', 'Unfold')} · 5 × 3 = ${LEDGER5.intra} ≪ ${LEDGER5.pooled}`;
      sub = `λ = ${lamText()} · ${L('跨概念', 'cross')} 9·C(5, 2) = ${LEDGER5.cross} · Σw = ${fix(U.sumW, 2)}`;
    } else if (S.scene === 'joint') {
      big = `${L('空间 ⊗ 颜色', 'Space ⊗ color')} · 15 = ${SECTORS.A + SECTORS.B} + ${SECTORS.corr}`;
      sub = `λ = ${lamText()} · ‖a‖ = ‖b‖ = ${fix(J.normA, 2)} · ${L('部分转置最小本征值', 'least PT eigenvalue')} ${fix(J.ptMin, 2)}`;
    } else if (S.scene === 'motion') {
      big = pooled ? `${L('混编', 'Pooled')} · so(9) = ${LEDGER3.pooled}` : `${L('运动', 'Motion')} · 3 + 3 + 3 = ${LEDGER3.intra}`;
      sub = `λ = ${lamText()} · ‖t‖ = ${fix(v3.len(M.t), 3)} · θ = ${fix(M.angle / DEG, 1)}° · det F = ${fix(M.detF, 3)}`;
    } else if (S.scene === 'cap') {
      big = `${L('场的封顶', 'Field cap')} · d = ${C.d} · C(${C.d}, 2) − ${C.d} = ${fix(C.gap, 0)}`;
      sub = ({ 1: 'Λ² = 0 · 0 ≠ 1', 2: `${STAR} : Λ² → Λ⁰ · 1 ≠ 2`, 3: `${STAR} : Λ² → Λ¹ · ij = k · e₁ × e₂ = e₃`, 4: `${STAR} : Λ² → Λ² · 6 = 3 + 3`, 5: `${STAR} : Λ² → Λ³ · 10 ≠ 5` })[C.d];
    } else {
      big = pooled ? `${L('不停机', 'Unhalted')} · Σw<sub>k</sub> = 1` : `${L('停机', 'Halt')} · ε = ${fix(T.eps, 3)} · K = ${T.K}`;
      sub = pooled ? `q = ${Q} · ${L('无穷多层', 'infinitely many shells')}` : `${L('保留', 'kept')} ${fix(100 * T.kept, 2)}% · ${L('折叠', 'folded')} ${fix(100 * T.tail, 2)}%`;
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('legend').innerHTML = LEGENDS[S.scene]().map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  const NOTES_RO = {
    unfold: ['15 个基向量两两配对：同一概念里的 3 对 × 5 = 15，跨概念的 9 × C(5, 2) = 90。混编读法把这 90 个也算成转动。', 'The 15 basis vectors paired two by two: 3 pairs inside each concept × 5 = 15, and 9 × C(5, 2) = 90 across concepts. The pooled reading counts those 90 as rotations too.'],
    joint: ['两个局域布洛赫向量在整条路上都是 0：只读局域的 6 个数，分不出 Bell 态（λ = 0）与经典相关（λ = 1）。', 'Both local Bloch vectors are 0 all the way: reading only the 6 local numbers cannot tell the Bell state (λ = 0) from the classical correlation (λ = 1).'],
    motion: ['三颗球各走一条直线；从 F 的极分解读回的对数主应变与 λh 一致。', 'Each ball runs along a straight line; the log principal strains read back from the polar decomposition of F agree with λh.'],
    cap: ['C(d, 2) − C(d, 1) = d(d − 3)/2：在 d ≥ 1 上只在 d = 3 为零。', 'C(d, 2) − C(d, 1) = d(d − 3)/2: on d ≥ 1 it vanishes only at d = 3.'],
    halt: ['K 是使尾巴 q<sup>K</sup> ≤ ε 的最小层数；w<sub>k</sub> ≥ ε 的模另数，二者都有限。', 'K is the least depth whose tail q<sup>K</sup> is ≤ ε; the modes with w<sub>k</sub> ≥ ε are counted separately; both are finite.']
  };
  const FORMULA = {
    unfold: 'dim so(3k) = 3k(3k − 1)/2 = 3k + 9·C(k, 2)',
    joint: '15 = (m² − 1) + (n² − 1) + (m² − 1)(n² − 1) · m = n = 2',
    motion: 'F = R(λθn) diag(e<sup>λh</sup>) = RU · U = √(FᵀF)',
    cap: `C(d, 2) − C(d, 1) = d(d − 3)/2 · ${STAR} : Λ² → Λ<sup>d−2</sup>`,
    halt: 'w<sub>k</sub> = (1 − q)q<sup>k−1</sup> · K = min{K : q<sup>K</sup> ≤ ε}'
  };
  const KEYS = {
    unfold: ['账本生成元与混编 so(15)', 'Ledger generators against pooled so(15)'],
    joint: ['空间 ⊗ 颜色的无迹参数', 'Traceless parameters of space ⊗ color'],
    motion: ['运动账本与混编 so(9)', 'The motion ledger against pooled so(9)'],
    cap: ['梯度与旋度之差 d(d − 3)/2', 'Curls minus gradients, d(d − 3)/2'],
    halt: ['停机层数与保留的质量', 'Halting depth and the mass kept']
  };
  function drawText(Mx) {
    const { U, J, C, T } = Mx, pooled = S.lens === 'pooled';
    $('roKeyLabel').innerHTML = L(...KEYS[S.scene]);
    let key, ksub;
    if (S.scene === 'unfold') { key = pooled ? `${LEDGER5.pooled}` : `${LEDGER5.intra} ≪ ${LEDGER5.pooled}`; ksub = pooled ? 'so(15)' : '5 × so(3)'; }
    else if (S.scene === 'joint') { key = `${SECTORS.A + SECTORS.B + SECTORS.corr} = ${SECTORS.A + SECTORS.B} + ${SECTORS.corr}`; ksub = pooled ? L('混编：全部 15 个', 'pooled: all 15') : L('账本：只读局域 6 个', 'ledger: the 6 local ones'); }
    else if (S.scene === 'motion') { key = pooled ? `${LEDGER3.pooled}` : `${LEDGER3.intra} ≪ ${LEDGER3.pooled}`; ksub = pooled ? 'so(9)' : '3 × so(3)'; }
    else if (S.scene === 'cap') { key = `d = ${C.d} · ${fix(C.gap, 0)}`; ksub = `${C.ones} ${L('个梯度', 'gradients')} · ${C.twos} ${L('个旋度', 'curls')}`; }
    else { key = `K = ${T.K} · ${fix(100 * T.kept, 2)}%`; ksub = `ε = ${fix(T.eps, 3)}`; }
    $('roKey').innerHTML = key; $('roKeySub').innerHTML = ` ${ksub}`;
    $('roNorm').innerHTML = `Σw<sub>α</sub> = ${fix(U.sumW, 4)} · ‖ψ‖² = ${fix(U.norm2, 4)} · ${L('块内', 'in-block')} ${LEDGER5.intra}`;
    $('roCross').innerHTML = `k = 5: ${LEDGER5.pooled} − ${LEDGER5.intra} = ${LEDGER5.cross} · k = 3: ${LEDGER3.pooled} − ${LEDGER3.intra} = ${LEDGER3.cross}`;
    $('roBlind').innerHTML = `‖a‖ = ‖b‖ = ${fix(J.normA, 2)} · T = diag(${J.T.map((r, i) => fix(r[i], 2)).join(', ')}) · PT<sub>min</sub> = ${fix(J.ptMin, 3)}`;
    $('roGram').innerHTML = `RGB ${fix(GRAM.rgb.det, 4)} · LMS ${fix(GRAM.det, 4)}`;
    $('roCap').innerHTML = `d = ${C.d}: C(${C.d}, 1) = ${C.ones} · C(${C.d}, 2) = ${C.twos} · ${L('差', 'gap')} ${fix(C.gap, 0)}`;
    $('roHalt').innerHTML = `K = ${T.K} · ${fix(100 * T.kept, 2)}% / ${fix(100 * T.tail, 2)}% · w ≥ ε: ${T.above} ≤ ${fix(T.bound, 0)}`;
    $('roNote').innerHTML = L(...NOTES_RO[S.scene]);
    $('lambdaPill').innerHTML = `λ <strong>${lamText()}</strong>`;
    $('lensPill').innerHTML = pooled ? `<span class="zh">混编</span><span class="en">POOLED</span>` : `<span class="zh">账本</span><span class="en">LEDGER</span>`;
    $('hint').innerHTML = S.scene === 'cap' ? L('维数按钮或时间轴改 d · 拖空白处转视角', 'dimension chips or the rail change d · drag empty space to orbit')
      : S.scene === 'halt' ? L('拖琥珀圆环改 ε · 拖空白处转视角', 'drag the amber ring to change ε · drag empty space to orbit')
        : L('拖琥珀圆环改 λ · 拖空白处转视角', 'drag the amber ring to change λ · drag empty space to orbit');
    $('formula').innerHTML = FORMULA[S.scene];
  }

  /* ---------- strip plot ---------- */
  const PLOTS = {
    unfold: ['混编多出的转轴：so(3k) 对 k 个 so(3)', 'Rotations the pool adds: so(3k) against k copies of so(3)'],
    joint: ['局域的 6 个数不动，相关的 9 个数在变', 'The 6 local numbers stay put; the 9 correlations move'],
    motion: ['极分解 F = RU 读回的对数主应变', 'Log principal strains read back from the polar decomposition F = RU'],
    cap: ['梯度 C(d, 1) 与旋度 C(d, 2)：只在 d = 3 一样多', 'Gradients C(d, 1) and curls C(d, 2): as many only at d = 3'],
    halt: ['模塔 w<sub>k</sub> 与停机截断 ε', 'The tower w<sub>k</sub> and the halting cut ε']
  };
  /** A curve label clear of its own curve (glyphs `gap` pixels off the stroke), as on the other pages of this book. */
  function curveLabel(g, f, x, str, color, o = {}) {
    const size = o.size || 10.5, align = o.align || 'right', gap = o.gap == null ? 6 : o.gap, half = (o.stroke || 2.2) / 2, ctx = g.ctx;
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
  }
  let jointCurve = null, motionCurve = null;
  function drawPlot(Mx) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    const pad = [40, 12, 10, 22], sc0 = S.scene;
    $('plotTitle').innerHTML = L(...PLOTS[sc0]);
    let meta = '';
    if (sc0 === 'unfold') {
      const g = kit.plot(cv, { x: [1, 8], y: [0, 300], pad });
      g.axes({ xTicks: [1, 2, 3, 4, 5, 6, 7, 8], yTicks: [0, 100, 200, 300], xLabel: 'k' });
      const ks = [1, 2, 3, 4, 5, 6, 7, 8], pooledF = (k) => 3 * k * (3 * k - 1) / 2, ledgerF = (k) => 3 * k;
      const xs = Array.from({ length: 71 }, (_, i) => 1 + i / 10);
      g.line(xs.map((k) => [k, pooledF(k)]), P.magenta, { width: 2.2 });
      g.line(xs.map((k) => [k, ledgerF(k)]), P.violet, { width: 2.2 });
      ks.forEach((k) => { g.dot(k, ledgerOf(k).pooled, P.magenta, 2.6); g.dot(k, ledgerOf(k).intra, P.violet, 2.6); });
      g.vline(5, P.amber, { alpha: 0.85 }); g.dot(5, LEDGER5.pooled, P.amber, 3.6); g.dot(5, LEDGER5.intra, P.amber, 3.6);
      curveLabel(g, pooledF, 7.4, 'so(3k)', P.magenta, { align: 'right' });
      curveLabel(g, ledgerF, 7.9, 'k · so(3)', P.violet, { align: 'right' });
      meta = `k = 5 · ${LEDGER5.pooled} − ${LEDGER5.intra} = ${LEDGER5.cross} = 9·C(5, 2)`;
    } else if (sc0 === 'joint') {
      if (!jointCurve) jointCurve = Array.from({ length: 101 }, (_, i) => jointOf(i / 100));
      const g = kit.plot(cv, { x: [0, 1], y: [-0.6, 1.9], pad });
      g.axes({ xTicks: [0, 0.25, 0.5, 0.75, 1], yTicks: [-0.5, 0, 0.5, 1, 1.5], xLabel: 'λ' });
      const nt = jointCurve.map((j) => [j.lam, j.normT]), na = jointCurve.map((j) => [j.lam, j.normA]), pt = jointCurve.map((j) => [j.lam, j.ptMin]);
      g.line(na, P.cyan, { width: 2.4 }); g.line(nt, P.magenta, { width: 2.2 }); g.line(pt, P.violet, { width: 2 });
      g.vline(S.lam, P.amber, { alpha: 0.85 });
      const J = Mx.J; g.dot(S.lam, J.normT, P.amber, 3.4); g.dot(S.lam, J.normA, P.amber, 3.4); g.dot(S.lam, J.ptMin, P.amber, 3.4);
      g.text(0.03, 1.72, '‖T‖', P.magenta, { align: 'left', size: 10.5 });
      g.text(0.97, 0.16, '‖a‖ = ‖b‖', P.cyan, { align: 'right', size: 10.5 });
      g.text(0.03, -0.32, 'PT_{min}', P.violet, { align: 'left', size: 10.5 });
      meta = `λ = ${lamText()} · ‖T‖ = ${fix(J.normT, 3)} · PT<sub>min</sub> = ${fix(J.ptMin, 3)}`;
    } else if (sc0 === 'motion') {
      if (!motionCurve) motionCurve = Array.from({ length: 41 }, (_, i) => motionOf(i / 40));
      const g = kit.plot(cv, { x: [0, 1], y: [-0.3, 0.56], pad });
      g.axes({ xTicks: [0, 0.25, 0.5, 0.75, 1], yTicks: [-0.2, 0, 0.2, 0.4], xLabel: 'λ' });
      for (let k = 0; k < 3; k++) g.line(motionCurve.map((m) => [m.lam, m.strains[k]]), P.magenta, { width: 2.2 });
      g.vline(S.lam, P.amber, { alpha: 0.85 });
      Mx.M.strains.forEach((s) => g.dot(S.lam, s, P.amber, 3.4));
      MOTION.h.forEach((hk, k) => curveLabel(g, (x) => x * hk, hk < 0 ? 0.82 : 0.97, ['λ ln 1.5', 'λ ln 1.25', 'λ ln 0.8'][k], P.magenta, { below: hk < 0 }));
      meta = `λ = ${lamText()} · ${Mx.M.strains.map((s) => fix(s, 3)).join(', ')} · det F = ${fix(Mx.M.detF, 3)}`;
    } else if (sc0 === 'cap') {
      const g = kit.plot(cv, { x: [0.6, 5.4], y: [0, 11.5], pad });
      g.axes({ xTicks: [1, 2, 3, 4, 5], yTicks: [0, 5, 10], xLabel: 'd' });
      const xs = Array.from({ length: 49 }, (_, i) => 0.6 + i / 10);
      g.line(xs.map((d) => [d, d]), P.cyan, { width: 2.2 });
      g.line(xs.map((d) => [d, d * (d - 1) / 2]), P.magenta, { width: 2.2 });
      [1, 2, 3, 4, 5].forEach((d) => { g.dot(d, d, P.cyan, 2.8); g.dot(d, binom(d, 2), P.magenta, 2.8); });
      g.vline(Mx.C.d, P.amber, { alpha: 0.85 }); g.dot(Mx.C.d, Mx.C.ones, P.amber, 3.6); g.dot(Mx.C.d, Mx.C.twos, P.amber, 3.6);
      g.text(5.3, 9.6, 'C(d, 2)', P.magenta, { align: 'right', size: 10.5 });
      g.text(5.3, 3.4, 'C(d, 1)', P.cyan, { align: 'right', size: 10.5 });
      meta = `d = ${Mx.C.d} · C(d, 1) = ${Mx.C.ones} · C(d, 2) = ${Mx.C.twos}`;
    } else {
      const T = Mx.T, n = 14, g = kit.plot(cv, { x: [0.4, n + 0.6], y: [0, 0.4], pad });
      g.axes({ xTicks: [1, 4, 7, 10, 13], yTicks: [0, 0.1, 0.2, 0.3], xLabel: 'k' });
      for (let k = 1; k <= n; k++) { const on = S.lens === 'pooled' || k <= T.K; g.rect(k - 0.36, 0, k + 0.36, WK[k - 1], on ? P.cyan : P.magenta, { alpha: on ? 0.75 : 0.6 }); }
      if (S.lens !== 'pooled') { g.hline(T.eps, P.amber, { width: 1.4 }); g.vline(T.K + 0.5, P.amber, { alpha: 0.6, dash: [4, 3] }); }
      g.text(n + 0.4, 0.36, `q = ${Q}`, P.dim, { align: 'right', size: 10.5 });
      meta = `ε = ${fix(T.eps, 3)} · K = ${T.K} · ${L('尾巴', 'tail')} q<sup>K</sup> = ${fix(T.tail, 4)} · w ≥ ε: ${T.above}`;
    }
    $('plotMeta').innerHTML = meta;
  }

  const paint = kit.painter(() => {
    const Mx = model();
    hudText(Mx); TRV.hudFit();
    drawStage(Mx); drawText(Mx); drawPlot(Mx);
  }, [stageEl, $('plot')]);

  /* ---------- the rail: λ ---------- */
  const playBtn = $('playBtn');
  const fUnmix = kit.field($('unmix'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); clock.set(clamp(v, 0, 1)); } });
  const dimChips = kit.chips($('dimChips'), 'dim', (v) => { leave(); setScene('cap', true); sc.view(VIEWS.cap, TRV.still ? 0 : 500); clock.set((Number(v) - 1) / 4); });
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, t: 1, rate: 0.2, step: 0.05, loop: true,
    format: (t) => `λ ${fix(t, 2)} <small>/ 1</small>`,
    onChange: (t, C) => {
      S.lam = t; fUnmix.set(Math.round(t * 100) / 100); dimChips.set(S.scene === 'cap' ? String(dimOf(t)) : null, true);
      playBtn.textContent = C.playing ? '❚❚' : '▷'; playBtn.setAttribute('aria-pressed', String(C.playing)); paint();
    }
  });
  playBtn.addEventListener('click', () => { stopBootPlay(); clock.toggle(); });
  $('rewindBtn').addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });
  $('rew').addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });
  // a reader who touches the rail ends the boot autoplay (its observer would otherwise restart the clock)
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
  let transition = null, booting = true;
  function leave() { stopBootPlay(); if (transition) transition.cancel(); transition = null; cards.mark(null); clock.pause(); }
  function setEps(v, quiet) { S.eps = clamp(Math.round(v * 200) / 200, EPS_MIN, EPS_MAX); fEps.set(S.eps); if (!quiet) paint(); }
  function setScene(v, quiet) { S.scene = SCENES.includes(v) ? v : 'unfold'; sceneChips.set(S.scene, true); dimChips.set(S.scene === 'cap' ? String(dimOf(S.lam)) : null, true); FITTED = null; if (!quiet) paint(); }
  function setLens(v, quiet) { S.lens = v === 'pooled' ? 'pooled' : 'ledger'; $('lensToggleBtn').setAttribute('aria-pressed', String(S.lens === 'ledger')); if (!quiet) paint(); }
  const fEps = kit.field($('epsHalt'), { fmt: (v) => fix(v, 3), onInput: (v) => { leave(); if (S.scene !== 'halt') { setScene('halt', true); sc.view(VIEWS.halt, TRV.still ? 0 : 500); } setEps(v); } });
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { stopBootPlay(); if (transition) transition.cancel(); transition = null; cards.mark(null); setScene(v, true); sc.view(VIEWS[S.scene], TRV.still ? 0 : 600); paint(); });
  $('lensToggleBtn').addEventListener('click', () => { stopBootPlay(); cards.mark(null); setLens(S.lens === 'ledger' ? 'pooled' : 'ledger'); });
  kit.keys({ l: () => { cards.mark(null); setLens(S.lens === 'ledger' ? 'pooled' : 'ledger'); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'hypercube-illusion-unfold': { scene: 'unfold', lens: 'ledger', eps: 0.05, play: true, still: 'end' },
    'space-color-joint-ledger': { scene: 'joint', lens: 'ledger', eps: 0.05, play: true, still: 0.5 },
    'motion-rot-scale-trans-triad': { scene: 'motion', lens: 'ledger', eps: 0.05, play: true, still: 0.65 },
    'hodge-curl-field-cap-3d': { scene: 'cap', lens: 'ledger', eps: 0.05, play: true, still: 0.6 },
    'unhalted-infinity-truncation': { scene: 'halt', lens: 'ledger', eps: 0.05, play: true, still: 'end' }
  };
  const NOTES = {
    'hypercube-illusion-unfold': ['λ 从 0 到 1：一颗混编的单位球展开成五颗青色概念球，半径 √w，w = 0.30、0.25、0.20、0.15、0.10，Σw = 1。品红的 90 根跨概念弦随之淡去，只剩每颗球里三根紫色转轴：15 个，不是 so(15) 的 105 个。', 'λ from 0 to 1: one pooled unit ball unfolds into five cyan concept balls of radius √w, w = 0.30, 0.25, 0.20, 0.15, 0.10, Σw = 1. The 90 magenta cross-concept chords fade, and three violet axes stay in each ball: 15 generators, not the 105 of so(15).'],
    'space-color-joint-ledger': ['λ = 0.5：空间与颜色两颗球中心的白珠（局域布洛赫向量）都在 0，品红相关弦是 T = diag(0.50, −0.50, 1.00)：局域 6 个数看不见这 9 个相关。颜色球里青色虚线是 LMS 斜交框，det G₃ = 0.235；紫色 RGB 正交基 det G₃ = 1。', 'λ = 0.5: the white beads at the centres of the space and color balls (the local Bloch vectors) both sit at 0, while the magenta correlation chords are T = diag(0.50, −0.50, 1.00): the 6 local numbers cannot see these 9. In the color ball the dashed cyan LMS frame has det G₃ = 0.235; the violet orthonormal RGB frame has det G₃ = 1.'],
    'motion-rot-scale-trans-triad': ['λ = 0.65：弧面体沿青色虚线平移 ‖t‖ = 0.365、绕 (1, 1, 1) 转 78.0°、三根主轴伸长 e<sup>0.264</sup>、e<sup>0.145</sup>、e<sup>−0.145</sup>。三颗运动球各记三个数：3 + 3 + 3 = 9，而混编的 ℝ⁹ 会有 so(9) 的 36 个转动。', 'λ = 0.65: the arc body moves ‖t‖ = 0.365 along the dashed cyan path, turns 78.0° about (1, 1, 1) and stretches its three principal axes by e<sup>0.264</sup>, e<sup>0.145</sup>, e<sup>−0.145</sup>. Each motion ball keeps three numbers: 3 + 3 + 3 = 9, where a pooled ℝ⁹ would have the 36 rotations of so(9).'],
    'hodge-curl-field-cap-3d': ['d = 3：三根青色梯度箭头，三个品红旋度环，紫色虚线把每个旋度送到唯一一根轴上：C(3, 2) = C(3, 1) = 3。时间轴走过 d = 1 … 5，只有这一格两者一样多；d = 4 时六个旋度两两成对，分成 3 + 3。', 'd = 3: three cyan gradient arrows, three magenta curl rings, and a dashed violet line from each curl to exactly one axis: C(3, 2) = C(3, 1) = 3. The rail steps through d = 1 … 5 and only this step has as many of each; at d = 4 the six curls pair up and split 3 + 3.'],
    'unhalted-infinity-truncation': ['模塔 w<sub>k</sub> = 0.35 · 0.65<sup>k−1</sup> 沿螺线永远往里走。琥珀环在 ε<sub>self</sub> = 0.050 处停机：前 7 层青色活跃，保留 95.10%；里面的品红尾巴 4.90% 折叠起来。', 'The tower w<sub>k</sub> = 0.35 · 0.65<sup>k−1</sup> spirals inwards forever. The amber ring halts it at ε<sub>self</sub> = 0.050: the first 7 cyan shells stay active and keep 95.10%; the magenta tail inside, 4.90%, is folded.']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'hypercube-illusion-unfold': ['一颗混编球展开成五颗概念球：每颗 3 根转轴，共 15 根；90 根跨概念弦淡去。', 'One pooled ball unfolds into five concept balls: 3 axes each, 15 in all; 90 cross chords fade.'],
    'space-color-joint-ledger': ['两颗球心的白珠都在 0，品红相关弦却是 0.50、−0.50、1.00：局域账本看不见。', 'Both white beads sit at 0, yet the magenta chords read 0.50, −0.50, 1.00: the local ledger is blind.'],
    'motion-rot-scale-trans-triad': ['弧面体平移 0.365、转 78.0°、伸缩三个主轴：三颗运动球，3 + 3 + 3 = 9。', 'The body moves 0.365, turns 78.0° and stretches three axes: three motion balls, 3 + 3 + 3 = 9.'],
    'hodge-curl-field-cap-3d': ['d = 3：每个品红旋度环经紫线落到唯一一根青色轴上，3 = 3。', 'd = 3: each magenta curl ring lands on exactly one cyan axis by a violet line, 3 = 3.'],
    'unhalted-infinity-truncation': ['琥珀环在 ε = 0.050 处停机：7 层青色保留 95.10%，品红尾巴 4.90% 折叠。', 'The amber ring halts at ε = 0.050: 7 cyan shells keep 95.10%, the magenta tail of 4.90% folds.']
  };
  function applyPreset(id) {
    const p = PRESETS[id];
    if (!booting) stopBootPlay();
    clock.pause();
    if (transition) transition.cancel();
    transition = null;
    setScene(p.scene, true); setLens(p.lens, true);
    sc.view(VIEWS[p.scene], booting || TRV.still ? 0 : 600);
    const from = S.eps, finish = () => { setEps(p.eps, true); paint(); };
    if (booting || TRV.still) finish();
    else transition = kit.tween(450, (e) => { setEps(from + (p.eps - from) * e, true); paint(); }, finish);
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still);
    else clock.set(0);
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) bootPlay(); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景、切透镜、拉 λ 与 ε<sub>self</sub>、按维数 d，拖琥珀圆环。随时可以再选一张卡。', 'Free play: switch the scene and the lens, pull λ and ε<sub>self</sub>, press a dimension d, drag the amber ring. Pick a card again at any time.']
  });
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.HILBERT_LEDGER_DEBUG = Object.freeze({
    get state() {
      const Mx = model(), { U, J, M, C, T } = Mx;
      return JSON.parse(JSON.stringify({
        preset: cards.current, t: clock.t, lambda: S.lam, playing: clock.playing, scene: S.scene, lens: S.lens, eps: S.eps, dim: Mx.d,
        unfold: { w: W5, sumW: U.sumW, psi: U.psi, norm2: U.norm2, blocks: U.blocks, ledger: { pooled: LEDGER5.pooled, intra: LEDGER5.intra, cross: LEDGER5.cross, pairs: LEDGER5.pairs.length },
          ledger3: { pooled: LEDGER3.pooled, intra: LEDGER3.intra, cross: LEDGER3.cross }, centers: U.balls.map((b) => b.c), radii: U.balls.map((b) => b.r), frames: FRAMES, slots: SLOTS },
        joint: { p: J.p, rho: J.rho, a: J.a, b: J.b, T: J.T, normA: J.normA, normB: J.normB, normT: J.normT, rhoSpectrum: J.rhoSpectrum, ptSpectrum: J.ptSpectrum, ptMin: J.ptMin, trace: J.trace, imag: J.imag,
          sectors: SECTORS, hsOff, hsDiag },
        gram: { lms: { G: GRAM.G, det: GRAM.det, frame: GRAM.frame, frameGram: GRAM.frameGram, peaks: CONES.map((c) => c.mu), sigma: SIG }, rgb: GRAM.rgb },
        motion: { t: M.t, angle: M.angle, axis: MOTION.n, h: M.h, F: M.F, detF: M.detF, strains: M.strains, Rback: M.Rback, rotVec: M.rotVec, killing: KILLING },
        cap: { d: C.d, cols: C.cols, tight: C.tight, ones: C.ones, twos: C.twos, gap: C.gap, starDegree: C.starDegree, pairs: C.pairs, so4: C.so4, quat: QUAT, bloch: { r: BLOCH.r, norm: BLOCH.norm, trace: BLOCH.trace, idem: BLOCH.idem, match: BLOCH.match, theta: BLOCH.theta, phi: BLOCH.phi } },
        halt: { q: T.q, eps: T.eps, K: T.K, kept: T.kept, tail: T.tail, above: T.above, bound: T.bound, sumW: T.sumW, w: T.w },
        camera: Object.assign({}, sc.cam), handle: FRAME ? FRAME.handle : null, labels: PLACED, stageFrame: FRAME
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock). */
    setState(o) {
      leave();
      if (o.scene != null) setScene(o.scene, true);
      if (o.lens != null) setLens(o.lens, true);
      if (o.eps != null) setEps(o.eps, true);
      if (o.lambda != null) clock.set(clamp(o.lambda, 0, 1));
      paint();
    },
    /** Viewport coordinates of the handle (for pointer tests), or null when hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates of the handle's anchor at λ (unfold, joint, motion) for drag targets. */
    anchorPoint(lam) { const a = anchorAt(lam); return a ? this.project(a) : null; },
    /** Viewport coordinates of the point of the tower's spiral at the continuous index s. */
    spiralPoint(s) { return this.project(spiralAt(s)); },
    /** Viewport coordinates of a world point under the current camera. */
    project(v) { const b = stageEl.getBoundingClientRect(), q = sc.p(v); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] }; },
    /** Pure computations (no page change): used by the suite for sweeps. */
    sweep(kind, x) { return kind === 'joint' ? jointOf(x) : kind === 'motion' ? motionOf(x) : kind === 'cap' ? capOf(x) : kind === 'halt' ? towerOf(x) : kind === 'ledger' ? (({ pairs, ...rest }) => rest)(ledgerOf(x)) : null; }
  });
  window.TRV_THUMB = () => { cards.pick('hypercube-illusion-unfold'); clock.pause(); clock.set(1); sc.view([VIEWS.unfold[0], VIEWS.unfold[1], 1], 0); paint.now(); };
  cards.pick(cards.initial('hypercube-illusion-unfold'));
  booting = false;
  paint();
})();
