/* ORTHO//CONSENSUS · 观察者共识与去相干 · observer consensus and decoherence (chapter 33, scheme 32).
   Four scenes share one rail s ∈ [0, 1]; each scene says what the rail means and never equates two of them:
     · tensor (axis-channel): observers carry unoriented unit axes nⱼ with weights wⱼ, M = Σ wⱼnⱼnⱼᵀ. One encounter is
       the Pauli channel K(n, α) = cos α·I + (1 − cos α)·nnᵀ on the Bloch vector. Three constructions stay apart: the
       ordered product K_k ⋯ K_1 (first observer at the right), the mean channel K̄ᵏ with K̄ = cos α·I + (1 − cos α)·M,
       and the weak limit exp[−t(I − M)], t = kα²/2. Rail: k = round(16 s) encounters; for the eight unsigned axes the
       rail flips axis ends f = round(8 s) instead, with the channel held at k = 16.
     · records (branching-qnd): a pure two-branch product state with record overlaps cⱼ in a common pointer basis; every
       fragment entropy is the rank-two closed form h(Π) and I(S : O_m) = h(Π_all) + h(Π_F) − h(Π_Fᶜ). An erased record
       (controlled Uⱼ† applied) is blank in both branches, i.e. overlap 1. Rail: fragment size m = round(16 s).
     · bubbles (logical-lf): Z and X pinchings commute, selected (+, +) updates do not, a tilted axis is the control,
       and the genuine Local Friendliness score of an explicit witness under white noise. Rail: visibility v = s.
     · pioneer (linear-escape): old plane S = span(x, y), M₀ = diag(0.7, 0.3, 0), a pioneer axis n(β) with weight η.
       Rail: β = (π/2)·s.
   Colours: amber = the current state, the rail cursor and the selected card only; violet = observer measurement axes
   (unoriented lines); cyan = what is retained (the longitudinal part, the image of the ball, the classical plateau, the
   tensor); magenta = what is discarded or escapes (transverse coherence, the pioneer's residual, the mismatch of
   selected updates); neutral ink = everything else. Green appears only on the source-linked LEAN ✓ boxes, never on the
   stage. window.ORTHO_CONSENSUS_DEBUG is a read-only snapshot for the browser suite; pickPreset, setRail and
   setOptions act through the same paths as a reader. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const TH = TRV.thumbMode ? 1.7 : 1;
  const EPS = 1e-8, N = 16, HALF_PI = Math.PI / 2, ALPHA0 = 0.4, TAU = 2 * Math.PI;
  const R0 = [Math.SQRT1_2, 0, Math.SQRT1_2];

  /* ---------- 3 × 3 real matrices ---------- */
  const I3 = () => [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  const Z3 = () => [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  const mmul = (A, B) => A.map((r) => [0, 1, 2].map((j) => r[0] * B[0][j] + r[1] * B[1][j] + r[2] * B[2][j]));
  const mvec = (A, v) => A.map((r) => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);
  const mT = (A) => [0, 1, 2].map((i) => [A[0][i], A[1][i], A[2][i]]);
  const madd = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
  const msub = (A, B) => A.map((r, i) => r.map((x, j) => x - B[i][j]));
  const msc = (A, k) => A.map((r) => r.map((x) => x * k));
  const outer = (a, b) => a.map((x) => b.map((y) => x * y));
  const fro = (A) => Math.sqrt(A.reduce((s, r) => s + r.reduce((t, x) => t + x * x, 0), 0));
  const maxAbs = (A) => Math.max(...A.map((r) => Math.max(...r.map(Math.abs))));
  const det3 = (A) => A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
  const copyM = (A) => A.map((r) => r.slice());
  /** Eigen-decomposition of a symmetric 3 × 3 matrix (cyclic Jacobi): values in descending order, unit vectors. */
  function eigSym(A0) {
    const a = copyM(A0), V = I3();
    for (let sweep = 0; sweep < 64; sweep++) {
      if (a[0][1] * a[0][1] + a[0][2] * a[0][2] + a[1][2] * a[1][2] < 1e-32) break;
      for (const [p, q] of [[0, 1], [0, 2], [1, 2]]) {
        if (Math.abs(a[p][q]) < 1e-300) continue;
        const th = (a[q][q] - a[p][p]) / (2 * a[p][q]);
        const t = (th >= 0 ? 1 : -1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < 3; k++) { const x = a[k][p], y = a[k][q]; a[k][p] = c * x - s * y; a[k][q] = s * x + c * y; }
        for (let k = 0; k < 3; k++) { const x = a[p][k], y = a[q][k]; a[p][k] = c * x - s * y; a[q][k] = s * x + c * y; }
        for (let k = 0; k < 3; k++) { const x = V[k][p], y = V[k][q]; V[k][p] = c * x - s * y; V[k][q] = s * x + c * y; }
      }
    }
    const idx = [0, 1, 2].sort((i, j) => a[j][j] - a[i][i]);
    return { values: idx.map((i) => a[i][i]), vectors: idx.map((i) => [V[0][i], V[1][i], V[2][i]]) };
  }
  /** f(M) = Σ f(λᵢ) vᵢvᵢᵀ: independent of the basis chosen inside a degenerate eigenspace. */
  const spectralFn = (eig, f) => eig.values.reduce((S, l, i) => madd(S, msc(outer(eig.vectors[i], eig.vectors[i]), f(l))), Z3());
  /** Singular values (descending) and right singular vectors of a 3 × 3 matrix. */
  function singular(K) { const e = eigSym(mmul(mT(K), K)); return { values: e.values.map((l) => Math.sqrt(Math.max(0, l))), vectors: e.vectors }; }
  /** A representative of an unoriented line: the largest component made positive (a display choice, not physics). */
  const canon = (v) => { const i = [0, 1, 2].reduce((b, j) => (Math.abs(v[j]) > Math.abs(v[b]) + 1e-12 ? j : b), 0); return v[i] < 0 ? v3.scale(v, -1) : v.slice(); };
  /** cos α with the two ends exact (cos(π/2) is not 0 in floating point). */
  const cosA = (a) => (a === HALF_PI ? 0 : a === 0 ? 1 : Math.cos(a));
  /** The Bloch matrix of one encounter: K(n, α) = cos α·I + (1 − cos α)·nnᵀ. */
  const Kof = (n, a) => { const c = cosA(a); return madd(msc(I3(), c), msc(outer(n, n), 1 - c)); };
  const xlog2 = (x) => (x > 0 ? x * Math.log2(x) : 0);
  /** Binary entropy in bits, accurate near both ends. */
  const H2 = (q) => (q <= 0 || q >= 1 ? 0 : -xlog2(q) - (1 - q) * Math.log1p(-q) / Math.LN2);

  /* ---------- complex 2 × 2 and 4 × 4 matrices: [re, im] entries ---------- */
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const cconj = (a) => [a[0], -a[1]];
  const C = {
    eye: (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => [i === j ? 1 : 0, 0])),
    mul: (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => cadd(s, cmul(x, B[k][j])), [0, 0]))),
    add: (A, B) => A.map((r, i) => r.map((x, j) => cadd(x, B[i][j]))),
    sc: (A, k) => A.map((r) => r.map((x) => (typeof k === 'number' ? [x[0] * k, x[1] * k] : cmul(x, k)))),
    dag: (A) => A[0].map((_, j) => A.map((r) => cconj(r[j]))),
    kron: (A, B) => { const n = A.length, m = B.length, R = []; for (let i = 0; i < n * m; i++) { R.push([]); for (let j = 0; j < n * m; j++) R[i].push(cmul(A[Math.floor(i / m)][Math.floor(j / m)], B[i % m][j % m])); } return R; },
    /** Tr(AB) without forming the product. */
    trp: (A, B) => { let s = [0, 0]; for (let i = 0; i < A.length; i++) for (let j = 0; j < A.length; j++) s = cadd(s, cmul(A[i][j], B[j][i])); return s; },
    hs: (A) => Math.sqrt(A.reduce((s, r) => s + r.reduce((t, x) => t + x[0] * x[0] + x[1] * x[1], 0), 0)),
    re: (A) => A.map((r) => r.map((x) => [x[0], x[1]]))
  };
  const PX = [[[0, 0], [1, 0]], [[1, 0], [0, 0]]], PY = [[[0, 0], [0, -1]], [[0, 1], [0, 0]]], PZ = [[[1, 0], [0, 0]], [[0, 0], [-1, 0]]], I2 = C.eye(2);
  /** n·σ for a real unit vector n. */
  const axisOp = (n) => C.add(C.add(C.sc(PX, n[0]), C.sc(PY, n[1])), C.sc(PZ, n[2]));
  /** The Bloch vector of a 2 × 2 density matrix, normalized by its trace. */
  const blochOf = (rho) => { const t = C.trp(rho, I2)[0]; return [PX, PY, PZ].map((p) => C.trp(rho, p)[0] / t); };

  /* ---------- the observer axes of the tensor scene ---------- */
  // eight unsigned axes, flipped in this order: z (0.6 in total), x (0.25), y (0.15), split equally within each group
  const GAUGE = [
    { n: [0, 0, 1], w: 0.15 }, { n: [1, 0, 0], w: 0.125 }, { n: [0, 0, 1], w: 0.15 }, { n: [0, 1, 0], w: 0.075 },
    { n: [0, 0, 1], w: 0.15 }, { n: [1, 0, 0], w: 0.125 }, { n: [0, 0, 1], w: 0.15 }, { n: [0, 1, 0], w: 0.075 }
  ];
  const AXSETS = {
    fog: { axes: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]], w: [1, 1, 1, 1, 1, 1] },
    consensus: { axes: Array.from({ length: N }, (_, j) => [0, 0, j % 2 ? -1 : 1]), w: Array(N).fill(1) },
    gauge: { axes: GAUGE.map((g) => g.n), w: GAUGE.map((g) => g.w) }
  };
  /** Unit axes (a zero vector is rejected) and weights normalized explicitly (nonnegative, positive total). */
  function prepare(axes, w) {
    const total = w.reduce((s, x) => s + x, 0);
    if (!(total > 0) || w.some((x) => !(x >= 0))) throw new Error('weights must be nonnegative with a positive total');
    return { axes: axes.map((n) => { const l = v3.len(n); if (!(l > 0)) throw new Error('an axis must be nonzero'); return v3.scale(n, 1 / l); }), w: w.map((x) => x / total) };
  }
  const tensorOf = (axes, w) => axes.reduce((M, n, j) => madd(M, msc(outer(n, n), w[j])), Z3());
  /** The channel after k encounters in the chosen construction. */
  function channelK(mode, axes, M, eig, a, k) {
    if (mode === 'ordered') { let K = I3(); for (let j = 0; j < k; j++) K = mmul(Kof(axes[j % axes.length], a), K); return K; }
    if (mode === 'mean') { const c = cosA(a), Kb = madd(msc(I3(), c), msc(M, 1 - c)); let K = I3(); for (let j = 0; j < k; j++) K = mmul(Kb, K); return K; }
    const t = k * a * a / 2;
    return spectralFn(eig, (l) => Math.exp(-t * (1 - l)));
  }

  /* ---------- state ---------- */
  const S = {
    scene: 'tensor', axisSet: 'fog', mode: 'mean', alpha: ALPHA0, r0: R0.slice(),
    p0: 0.5, c: 0.3, access: Array(N).fill(false),
    oblique: false, trace: 1,
    eta: 0.15
  };
  const SCENES = ['tensor', 'records', 'bubbles', 'pioneer'];

  function tensorState() {
    const gauge = S.axisSet === 'gauge', s = clock.t;
    const f = gauge ? Math.round(8 * s) : 0, k = gauge ? N : Math.round(N * s);
    const base = AXSETS[S.axisSet];
    const signs = base.axes.map((_, j) => (gauge && j < f ? -1 : 1));
    const { axes, w } = prepare(base.axes.map((n, j) => v3.scale(n, signs[j])), base.w);
    const M = tensorOf(axes, w), eig = eigSym(M), lam = eig.values;
    const kappa = (3 * lam[0] - 1) / 2, gap = lam[0] - lam[1], iso = lam[0] - lam[2] < EPS;
    const pointer = gap >= EPS ? canon(eig.vectors[0]) : null;
    const a = S.alpha, c = cosA(a);
    const Ks = [], Kws = [];
    for (let j = 0; j <= N; j++) { Ks.push(channelK(S.mode, axes, M, eig, a, j)); Kws.push(channelK('weak-limit', axes, M, eig, a, j)); }
    const K = Ks[k], Kweak = Kws[k];
    const path = Ks.map((Kj) => mvec(Kj, S.r0)), wlPath = Kws.map((Kj) => mvec(Kj, S.r0));
    const r = path[k];
    const modeDamping = S.mode === 'mean' ? { kind: 'mean-eigenmodes', values: lam.map((l) => Math.pow(l + (1 - l) * c, k)) }
      : S.mode === 'weak-limit' ? { kind: 'weak-limit-eigenmodes', values: lam.map((l) => Math.exp(-(k * a * a / 2) * (1 - l))) }
        : { kind: 'ordered-singular-values', values: singular(K).values };
    const weakDamping = lam.map((l) => Math.exp(-(k * a * a / 2) * (1 - l)));
    // along and across the pointer axis (only when it is resolved)
    const split = (v) => { if (!pointer) return null; const par = v3.dot(v, pointer), perp = v3.sub(v, v3.scale(pointer, par)); return { par, perp, perpLen: v3.len(perp) }; };
    const sp = split(r), sp0 = split(S.r0);
    const len2 = v3.dot(r, r);
    const hs = sp ? { total: (1 + len2) / 2, pinched: (1 + sp.par * sp.par) / 2, offDiagonal: sp.perpLen * sp.perpLen / 2 } : null;
    // full pinching of one shared axis: the entropy-production sequence (U = I, the same basis at every step)
    let entropy = null;
    if (S.axisSet === 'consensus' && a === HALF_PI && S.mode !== 'weak-limit' && pointer) {
      const Sb = path.map((v) => H2((1 + v3.len(v)) / 2));
      const D = path.map((v, j) => H2((1 + v3.dot(v, pointer)) / 2) - Sb[j]);   // D(ρ‖Pρ) = S(Pρ) − S(ρ) for a pinching
      entropy = { bitsPerStep: Sb, relativeEntropyBits: D, gainBits: Sb.slice(1).map((x, j) => x - Sb[j]), totalGainBits: Sb[k] - Sb[0], sumRelativeEntropyBits: D.slice(0, k).reduce((s2, x) => s2 + x, 0) };
    }
    const fixedPoint = sp && a === HALF_PI ? sp.perpLen < 1e-12 : null;
    // the gauge scene: the naive signed sum, the largest change of any tensor entry, and a ket under a common phase
    let gaugeSnap = null;
    if (gauge) {
      const ref = prepare(base.axes, base.w), M0 = tensorOf(ref.axes, ref.w);
      const naive = axes.reduce((acc, n, j) => v3.add(acc, v3.scale(n, w[j])), [0, 0, 0]);
      const theta = f * Math.PI / 4, ph = [Math.cos(theta), Math.sin(theta)];
      const psi = [cmul(ph, [Math.sqrt(0.8), 0]), cmul(ph, [0.4, 0.2])];
      gaugeSnap = { flips: f, signs, naiveSum: naive, naiveLength: v3.len(naive), maxEntryChange: maxAbs(msub(M, M0)), ketPhase: theta, ket: psi, rho01: cmul(psi[0], cconj(psi[1])), rho00: psi[0][0] ** 2 + psi[0][1] ** 2 };
    }
    // the unoriented lines that carry observers (identical axes drawn once, with their total weight)
    const lines = [];
    axes.forEach((n, j) => { const u = canon(n), g = lines.find((l) => v3.dot(l.n, u) > 1 - 1e-9); if (g) { g.w += w[j]; g.count++; } else lines.push({ n: u, w: w[j], count: 1 }); });
    return {
      gauge, f, k, s, axes, w, signs, M, eig, lam, kappa, gap, iso, pointer, a, c, K, Kweak, Ks, path, wlPath, r,
      modeDamping, weakDamping, sp, sp0, hs, entropy, fixedPoint, gaugeSnap, lines,
      meanScale: Math.pow((1 + 2 * c) / 3, k), weakScale: Math.exp(-k * a * a / 3)
    };
  }

  /** Every fragment entropy of the pure two-branch product state, from accumulated logarithms (O(N), stable). */
  function branching(p0, cs) {
    const n = cs.length, p1 = 1 - p0;
    const lg = cs.map((c) => (c === 0 ? -Infinity : Math.log(Math.abs(c)))), sg = cs.map((c) => (c < 0 ? -1 : 1));
    const pre = [{ l: 0, s: 1 }], suf = new Array(n + 1);
    for (let j = 0; j < n; j++) pre.push({ l: pre[j].l + lg[j], s: pre[j].s * sg[j] });
    suf[n] = { l: 0, s: 1 };
    for (let j = n - 1; j >= 0; j--) suf[j] = { l: suf[j + 1].l + lg[j], s: suf[j + 1].s * sg[j] };
    const h = (lp) => {
      const om = lp === -Infinity ? 1 : -Math.expm1(2 * lp);           // 1 − |Π|²
      const a = p0 * p1 * clamp(om, 0, 1), d = Math.sqrt(Math.max(0, 1 - 4 * a));
      return H2(2 * a / (1 + d));                                        // the small eigenvalue, no cancellation
    };
    const val = (p) => (p.l === -Infinity ? 0 : p.s * Math.exp(p.l));
    const SS = h(pre[n].l), SF = pre.map((p) => h(p.l)), SC = suf.map((p) => h(p.l));
    const I = SF.map((sf, m) => SS + sf - SC[m]);
    return { SS, SF, SC, I, prefix: pre.map(val), suffix: suf.map(val), coherence: Math.sqrt(p0 * p1) * val(pre[n]) };
  }
  function recordsState() {
    const m = Math.round(N * clock.t), cs = Array(N).fill(S.c), eff = cs.map((c, j) => (S.access[j] ? 1 : c));
    const B = branching(S.p0, eff);
    const plateau = Math.max(...B.I.slice(3, 14).map((x) => Math.abs(x - B.SS)));
    const erased = S.access.filter(Boolean).length;
    return Object.assign(B, { m, cs, eff, erased, uncontrolled: N - erased, residual: Math.abs(B.coherence), plateau });
  }

  /* ---------- two bubbles and Local Friendliness ---------- */
  const XA = [1, 0, 0], ZA = [0, 0, 1], OA = v3.unit([1, 0, 1]);
  const LFW = (() => {
    const s2 = Math.SQRT2;
    const A = [ZA, XA, OA];
    const B = [
      v3.scale(v3.add(ZA, v3.scale(XA, 2)), -1 / Math.sqrt(5)),
      v3.scale(v3.add(v3.scale(ZA, 2 + 1 / s2), v3.scale(XA, -2 + 1 / s2)), -1 / 3),
      v3.scale(v3.add(v3.scale(ZA, 1 / s2), v3.scale(XA, 1 + 1 / s2)), -1 / Math.sqrt(2 + s2))
    ];
    // Bob's local frame: rotate state and observables together so that A₁ = Z and B′₁ = X
    const th = Math.atan2(-1, -2), R = [[Math.cos(th), 0, Math.sin(th)], [0, 1, 0], [-Math.sin(th), 0, Math.cos(th)]];
    const Bp = B.map((b) => mvec(R, b));
    const U = C.add(C.sc(I2, Math.cos(th / 2)), C.sc(PY, [0, -Math.sin(th / 2)]));   // exp(−iθY/2)
    const phi = [[[Math.SQRT1_2, 0]], [[0, 0]], [[0, 0]], [[Math.SQRT1_2, 0]]];
    const psi = C.mul(C.kron(I2, U), phi);
    const rhoPure = C.mul(psi, C.dag(psi));
    const Aop = A.map(axisOp), Bop = Bp.map(axisOp);
    const coef = [[-1, -2, 0], [-2, 2, -1], [0, -1, -1]], loc = [-1, -1, 0];
    const exact = Math.sqrt(5) + 3 + Math.sqrt(2 + s2);
    // the 96 vertices of the LF polytope of this binary 3 × 3 scenario (friend outcomes c, d fixed; deterministic and
    // PR boxes on the remaining inputs {2, 3} × {2, 3})
    const score = (ar, br, E) => loc.reduce((s, x, i) => s + x * ar[i] + x * br[i], 0) + coef.reduce((s, row, i) => s + row.reduce((t, x, j) => t + x * E[i][j], 0), 0);
    let nv = 0, vmax = -Infinity;
    for (const cf of [-1, 1]) for (const df of [-1, 1]) {
      for (let bits = 0; bits < 16; bits++) {
        const ar = [cf, bits & 1 ? 1 : -1, bits & 2 ? 1 : -1], br = [df, bits & 4 ? 1 : -1, bits & 8 ? 1 : -1];
        vmax = Math.max(vmax, score(ar, br, ar.map((x) => br.map((y) => x * y)))); nv++;
      }
      for (let bits = 0; bits < 8; bits++) {
        const u = bits & 1, v = (bits >> 1) & 1, w0 = (bits >> 2) & 1, E = [[cf * df, 0, 0], [0, 0, 0], [0, 0, 0]];
        for (let s = 0; s < 2; s++) for (let q = 0; q < 2; q++) E[s + 1][q + 1] = ((s * q) ^ (u * s) ^ (v * q) ^ w0) ? -1 : 1;
        vmax = Math.max(vmax, score([cf, 0, 0], [df, 0, 0], E)); nv++;
      }
    }
    return { A, B, Bp, R, theta: th, U, psi, rhoPure, Aop, Bop, coef, loc, exact, threshold: 6 / exact, vertices: nv, vertexMax: vmax };
  })();
  /** Everything the LF scene shows at visibility v, from actual traces of 4 × 4 matrices. */
  function lfAt(v) {
    const I4 = C.eye(4), rho = C.add(C.sc(LFW.rhoPure, v), C.sc(I4, (1 - v) / 4));
    const tr = (O) => C.trp(rho, O)[0];
    const a = LFW.Aop.map((A) => tr(C.kron(A, I2))), b = LFW.Bop.map((B) => tr(C.kron(I2, B)));
    const E = LFW.Aop.map((A) => LFW.Bop.map((B) => tr(C.kron(A, B))));
    const proj = (O, s) => C.sc(C.add(I2, C.sc(O, s)), 0.5);
    const probs = [];
    let minP = Infinity, norm = 0, nosig = 0;
    for (let x = 0; x < 3; x++) { probs.push([]); for (let y = 0; y < 3; y++) {
      const t = [-1, 1].map((sa) => [-1, 1].map((sb) => tr(C.kron(proj(LFW.Aop[x], sa), proj(LFW.Bop[y], sb)))));
      probs[x].push(t);
      t.forEach((row) => row.forEach((p) => { minP = Math.min(minP, p); }));
      norm = Math.max(norm, Math.abs(t[0][0] + t[0][1] + t[1][0] + t[1][1] - 1));
    } }
    // no signalling: Alice's marginal does not depend on y, Bob's does not depend on x
    for (let x = 0; x < 3; x++) for (let y = 1; y < 3; y++) for (let s = 0; s < 2; s++) nosig = Math.max(nosig, Math.abs(probs[x][y][s][0] + probs[x][y][s][1] - probs[x][0][s][0] - probs[x][0][s][1]));
    for (let y = 0; y < 3; y++) for (let x = 1; x < 3; x++) for (let s = 0; s < 2; s++) nosig = Math.max(nosig, Math.abs(probs[x][y][0][s] + probs[x][y][1][s] - probs[0][y][0][s] - probs[0][y][1][s]));
    const score = -a[0] - a[1] - b[0] - b[1] - E[0][0] - 2 * E[0][1] - 2 * E[1][0] + 2 * E[1][1] - E[1][2] - E[2][1] - E[2][2];
    return { v, rho, A: LFW.A, B: LFW.Bp, Bunrotated: LFW.B, bobRotation: LFW.theta, probabilities: probs, means: { a, b }, E, score, bound: 6, exactPureScore: LFW.exact,
      threshold: LFW.threshold, minProbability: minP, normalizationError: norm, noSignallingError: nosig, vertices: LFW.vertices, vertexMax: LFW.vertexMax };
  }
  /** The fixed facts of the two bubbles: unread (commuting) and selected (order-dependent) updates, the T11 sets. */
  const BUB = (() => {
    const KZ = Kof(ZA, HALF_PI), KX = Kof(XA, HALF_PI), KO = Kof(OA, HALF_PI);
    const comm = (A, B) => fro(msub(mmul(A, B), mmul(B, A)));
    const half = C.sc(I2, 0.5), proj = (n) => C.sc(C.add(I2, axisOp(n)), 0.5);
    const sel = (n, rho) => { const Pn = proj(n); return C.mul(C.mul(Pn, rho), Pn); };
    const zx = sel(XA, sel(ZA, half)), xz = sel(ZA, sel(XA, half));   // Z⁺ then X⁺, X⁺ then Z⁺
    const unread = (n, rho) => { const O = axisOp(n); return C.sc(C.add(rho, C.mul(C.mul(O, rho), O)), 0.5); };
    const plusX = proj(XA);
    const M = tensorOf([ZA, XA], [0.5, 0.5]), eig = eigSym(M);
    const rev = (P2, A2) => { const i = new Set([...A2].filter((x) => P2.has(x))); return i.size ? i : new Set(P2); };
    const A0 = new Set([0]), Pset = new Set([1, 2]), Qset = new Set([0, 1]);
    const PthenQ = rev(Qset, rev(Pset, A0)), QthenP = rev(Pset, rev(Qset, A0));
    return {
      KZ, KX, KO, commZX: comm(KZ, KX), commZO: comm(KZ, KO),
      unreadZX: blochOf(unread(ZA, unread(XA, plusX))), unreadXZ: blochOf(unread(XA, unread(ZA, plusX))),
      unreadZO: blochOf(unread(ZA, unread(OA, plusX))), unreadOZ: blochOf(unread(OA, unread(ZA, plusX))),
      selZX: zx, selXZ: xz, traceZX: C.trp(zx, I2)[0], traceXZ: C.trp(xz, I2)[0], endZX: blochOf(zx), endXZ: blochOf(xz),
      hsDiff: C.hs(C.add(zx, C.sc(xz, -1))), M, lam: eig.values, gap: eig.values[0] - eig.values[1],
      sets: { A: [...A0], P: [...Pset], Q: [...Qset], PthenQ: [...PthenQ].sort(), QthenP: [...QthenP].sort(), revisePA: [...rev(Pset, A0)].sort(), reviseQA: [...rev(Qset, A0)].sort() }
    };
  })();
  /** ‖[K_n, K_m]‖ at full strength for two axes in the XZ plane at angle θ (the strip's question). */
  const commAt = (th) => { const m = [Math.sin(th), 0, Math.cos(th)], A = Kof(ZA, HALF_PI), B = Kof(m, HALF_PI); return fro(msub(mmul(A, B), mmul(B, A))); };

  /* ---------- the pioneer ---------- */
  const PS = [[1, 0, 0], [0, 1, 0], [0, 0, 0]], M0 = [[0.7, 0, 0], [0, 0.3, 0], [0, 0, 0]];
  function pioneerState(s) {
    const t = s == null ? clock.t : s, beta = HALF_PI * t, eta = S.eta;
    const cb = t >= 1 ? 0 : Math.cos(beta), sb = t <= 0 ? 0 : Math.sin(beta);
    const n = [cb, 0, sb], Pn = mvec(PS, n), resid = v3.sub(n, Pn);
    const Meta = madd(msc(M0, 1 - eta), msc(outer(n, n), eta)), eig = eigSym(Meta);
    return {
      beta, eta, n, Pn, residualVector: resid, residual: v3.len(resid), S: PS, M0, Meta, eigenvalues: eig.values, eig,
      det: det3(Meta), detFormula: (1 - eta) * (1 - eta) * 0.7 * 0.3 * eta * sb * sb,
      rank: eig.values.filter((l) => l > EPS).length, rankThreshold: EPS, traceS: 2, traceM0: 1,
      oldGeneratorEigen: { x: 0.3, y: 0.7, z: 1 }, oldZDampingAt1: Math.exp(-1)
    };
  }

  /* ---------- the stage: one canvas, one stage3 (2D scenes draw through kit.plot and plain canvas calls) ---------- */
  let grab = null, last = null;
  const sopts = {
    canvas: $('cv'), radius: 0.36, cx: 0.5, cy: 0.52,
    onChange: () => paint(),
    onPick: (ev, st) => {
      if (S.scene === 'records') { pressRecords(ev); return true; }
      if (S.scene === 'bubbles') return true;
      if (S.scene === 'tensor' && last && last.T) {
        if (st.near(ev, S.r0) < 22 || st.near(ev, last.T.r) < 22) { grab = 'r0'; return true; }
        return false;
      }
      if (S.scene === 'pioneer' && last && last.Pn) { if (st.near(ev, last.Pn.n) < 26) { grab = 'beta'; return true; } }
      return false;
    },
    onDrag: (ev, st) => {
      if (S.scene === 'records') { dragRecords(ev); return; }
      if (grab === 'r0') { S.r0 = v3.unit(st.pick(ev)); leave(); paint(); }
      else if (grab === 'beta') { const q = st.pick(ev); leave(); clock.pause(); clock.set(clamp(Math.atan2(Math.max(0, q[2]), Math.max(1e-9, q[0])) / HALF_PI, 0, 1)); }
    },
    onDrop: () => { grab = null; }
  };
  const stage = kit.stage3($('stage'), sopts);
  const VIEWS = { tensor: [-0.62, 0.34], pioneer: [-0.42, 0.2] };

  /* stage labels: every label carries a key class; after a frame, labels that would sit on an earlier one are hidden */
  let tagOrder = [];
  function tag(key, p, html, cls, o) { if (TRV.thumbMode) return; stage.tag(key, p, html, `${cls || 'raw'} k-${key}`, o); tagOrder.push(key); }
  const stag = (key, x, y, html, cls) => tag(key, [x, y], html, cls, { screen: true });
  function declutter() {
    const boxes = [];
    for (const key of tagOrder) {
      const el = $('stage').querySelector(`.tags .k-${key}`);
      if (!el || el.hidden) continue;
      const r = el.getBoundingClientRect();
      if (!r.width) continue;
      if (boxes.some((b) => Math.min(r.right, b.right) - Math.max(r.left, b.left) > -2 && Math.min(r.bottom, b.bottom) - Math.max(r.top, b.top) > -1)) el.hidden = true;
      else boxes.push(r);
    }
    tagOrder = [];
  }
  /** The free part of the stage between the HUD (title, scene chips) and the legend, in CSS pixels. */
  function frameBox() {
    const el = $('stage'), sr = el.getBoundingClientRect(), below = (e) => (e ? e.getBoundingClientRect().bottom - sr.top : 0);
    const thumb = TRV.thumbMode;
    const top = thumb ? 18 : Math.max(44, below($('hudBig').parentElement), below($('sceneChips'))) + 6;
    const bottom = thumb ? 18 : Math.max(16, $('legend').offsetHeight + 18);
    return { W: sr.width, H: sr.height, top, bottom, h: Math.max(60, sr.height - top - bottom) };
  }
  /** Place the 3D view in the free box, leaving room for an inset at the bottom right when asked. */
  function layout3D(withInset) {
    const F = frameBox(), iw = withInset && !TRV.thumbMode ? clamp(Math.min(F.W, F.h) * 0.32, 144, 176) : 0, ih = Math.round(iw * 0.74);
    const wide = F.W > 1.25 * F.h, k = TRV.thumbMode ? 0.4 : 0.375;
    let unit, cx, cy;
    if (iw && wide) { const aw = F.W - iw - 24; unit = Math.min(k * F.h, 0.34 * aw); cx = aw / 2 + 8; cy = F.top + F.h / 2; }
    else if (iw) { const hh = F.h - ih - 12; unit = Math.min(k * hh, 0.34 * F.W); cx = F.W / 2; cy = F.top + hh / 2; }
    else { unit = Math.min(k * F.h, 0.34 * F.W); cx = F.W / 2; cy = F.top + F.h / 2; }
    sopts.cx = cx / F.W; sopts.cy = cy / F.H; sopts.radius = Math.max(30, unit) / Math.min(F.W, F.H);
    return { F, box: iw ? { x: F.W - iw - 12, y: F.H - F.bottom - ih - 2, w: iw, h: ih } : null };
  }

  /** The image of the unit ball under K: a filled outline (support points), or a segment or a point when it collapses. */
  function drawImage(st, K, o) {
    o = o || {};
    const sv = singular(K), col = o.color || P.cyan;
    if (sv.values[0] < 0.01) { if (!o.ghost) st.dot([0, 0, 0], 4.5, col, { glow: 10, fade: false }); return 'point'; }
    if (sv.values[1] < 0.01) {
      const a = mvec(K, sv.vectors[0]);
      st.ctx.save(); if (!o.ghost) { st.ctx.shadowColor = col; st.ctx.shadowBlur = 10; }
      st.line(v3.scale(a, -1), a, o.ghost ? { color: o.color || P.dim, width: 1.3 * TH, dash: [6, 5], alpha: 0.9 } : { color: col, width: 5 * TH, alpha: 0.9, back: 1 });
      st.ctx.restore(); return 'segment';
    }
    const D = st.facing(), e1 = v3.unit(v3.cross(D, Math.abs(D[2]) < 0.95 ? [0, 0, 1] : [1, 0, 0])), e2 = v3.cross(D, e1), KT = mT(K), out = [];
    for (let i = 0; i < 120; i++) {
      const t = TAU * i / 120, wv = v3.add(v3.scale(e1, Math.cos(t)), v3.scale(e2, Math.sin(t))), q = mvec(KT, wv), ql = v3.len(q);
      out.push(ql > 1e-12 ? mvec(K, v3.scale(q, 1 / ql)) : [0, 0, 0]);
    }
    if (o.ghost) { st.path(out, { color: o.color || P.dim, width: 1.3 * TH, dash: [6, 5], alpha: 0.9, fade: false, close: true }); return 'ghost'; }
    st.poly(out, { fill: col, alpha: 0.11 });
    st.path(out, { color: col, width: 1.9 * TH, alpha: 0.95, fade: false, close: true });
    const circ = (f) => { const pts = []; for (let i = 0; i <= 72; i++) { const t = TAU * i / 72; pts.push(mvec(K, f(Math.cos(t), Math.sin(t)))); } return pts; };
    st.path(circ((c, s) => [c, s, 0]), { color: col, width: 1.1 * TH, alpha: 0.7, back: 0.3 });
    st.path(circ((c, s) => [s, 0, c]), { color: col, width: 0.8 * TH, alpha: 0.45, back: 0.25 });
    st.path(circ((c, s) => [0, s, c]), { color: col, width: 0.8 * TH, alpha: 0.45, back: 0.25 });
    return 'solid';
  }
  const FRAME = [[[1, 0, 0], 'x'], [[0, 1, 0], 'y'], [[0, 0, 1], 'z']];
  const frameAxes = (st) => { for (const [v] of FRAME) st.line(v3.scale(v, -1.12), v3.scale(v, 1.12), { color: P.faint, width: 1, alpha: 0.7, back: 0.5 }); };
  const frameTags = () => { for (const [v, lab] of FRAME) tag(`ax${lab}`, v3.scale(v, 1.2), lab, 'num'); };

  function drawTensor(st, T) {
    const lay = layout3D(T.gauge), ctx = st.begin(), th = TH;
    st.sphere(1, { lat: [0], lon: 2, shade: 0.035, alpha: TRV.thumbMode ? 0.55 : 0.32 });
    frameAxes(st);
    if (S.mode !== 'weak-limit' && T.k > 0) drawImage(st, T.Kweak, { ghost: true });
    const shape = drawImage(st, T.K);
    // the observers' axes: unoriented lines, thicker for more weight
    for (const g of T.lines) st.line(v3.scale(g.n, -1.17), v3.scale(g.n, 1.17), { color: P.violet, width: (1.2 + 9 * g.w) * th, alpha: 0.85, back: 0.35 });
    if (T.gauge) {
      // the labelled end of every axis (a label, not a different line); the latest flip is the rail's current step
      const seen = {};
      T.axes.forEach((n, j) => {
        const key = canon(n).map((x) => Math.round(x)).join(','), i = seen[key] = (seen[key] == null ? 0 : seen[key] + 1);
        const p = v3.scale(n, 1.0 + 0.075 * i);
        st.dot(p, 3.6, P.violet, { fade: false });
        if (j === T.f - 1) st.dot(p, 7.5, P.amber, { ring: true, width: 2, fade: false });
      });
    }
    if (T.pointer) st.line(v3.scale(T.pointer, -1.3), v3.scale(T.pointer, 1.3), { color: P.cyan, width: 1.4 * th, dash: [7, 6], alpha: 0.9, back: 0.5 });
    for (let j = 0; j < T.k; j++) st.dot(T.path[j], 2.1, P.sigma, { alpha: 0.5 });
    if (T.sp && !T.iso) {
      const rp = v3.scale(T.pointer, T.sp.par);
      st.line([0, 0, 0], rp, { color: P.cyan, width: 4 * th, alpha: 0.95, back: 0.6 });
      if (T.sp.perpLen > 1e-3) st.line(rp, T.r, { color: P.magenta, width: 3.2 * th, alpha: 0.95, back: 0.6 });
    }
    if (T.gauge && T.gaugeSnap.naiveLength > 1e-9) st.arrow([0, 0, 0], T.gaugeSnap.naiveSum, { color: P.sigma, width: 1.8, dash: [5, 4], alpha: 0.95, headSize: 9 });
    st.dot(S.r0, 6, P.amber, { ring: true, width: 2, alpha: 0.85 });
    st.arrow([0, 0, 0], T.r, { color: P.amber, width: 2.6, glow: 12, headSize: 11, fade: false });
    st.dot(T.r, 4.5, P.amber, { glow: 12, fade: false });
    // labels, most important first
    tag('r', T.r, 'r', 'num c-am', { dx: 12, dy: -12, fade: false });
    if (!T.pointer) tag('nopt', [0, 0, 1.24], L('无唯一指针主轴', 'No unique pointer axis'), 'raw ink', { dx: 70, fade: false });
    else tag('ptr', v3.scale(T.pointer, 1.24), L('指针轴（无向）', 'pointer axis (unoriented)'), 'raw c-cy', { dx: 64, fade: false });
    if (T.sp && !T.iso) {
      const rp = v3.scale(T.pointer, T.sp.par);
      tag('par', v3.scale(rp, 0.5), `r∥ ${fix(T.sp.par, 3)}`, 'num c-cy', { dx: -40, fade: false });
      if (T.sp.perpLen > 0.04) tag('perp', v3.lerp(rp, T.r, 0.5), `r⊥ ${fix(T.sp.perpLen, 3)}`, 'num c-mg', { dy: 14, fade: false });
    }
    T.lines.forEach((g, i) => tag(`cnt${i}`, v3.scale(g.n, -1.24), `×${g.count}`, 'num c-vi'));
    tag('r0', S.r0, 'r₀', 'num', { dx: 14, dy: 10 });
    if (T.gauge && T.gaugeSnap.naiveLength > 1e-9) tag('naive', T.gaugeSnap.naiveSum, 'Σwⱼnⱼ', 'num ink', { dx: 18, dy: 10 });
    if (shape === 'segment' && T.pointer) tag('seg', v3.scale(T.pointer, -0.7), L('压成一条线', 'pressed into a line'), 'raw c-cy', { dx: 54 });
    frameTags();
    if (T.gauge && lay.box) ketInset(st, T, lay.box);
    st.end(); declutter();
  }
  /** Inset: a ket's two amplitudes under a common phase; |ψ⟩⟨ψ| (and ρ₀₁) do not change. */
  function insetFrame(ctx, b) {
    ctx.fillStyle = TRV.alpha(P.void, 0.6); ctx.fillRect(b.x, b.y, b.w, b.h);
    ctx.strokeStyle = P.panelEdge; ctx.lineWidth = 1; ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1);
  }
  function ketInset(st, T, b) {
    const ctx = st.ctx, r = Math.min(b.w, b.h - 40) * 0.42, cx = b.x + b.w / 2, cy = b.y + 20 + (b.h - 40) / 2, G = T.gaugeSnap;
    ctx.save();
    insetFrame(ctx, b);
    ctx.strokeStyle = P.dim; ctx.globalAlpha = 0.8; ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke();
    ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.moveTo(cx - r - 4, cy); ctx.lineTo(cx + r + 4, cy); ctx.moveTo(cx, cy - r - 4); ctx.lineTo(cx, cy + r + 4); ctx.stroke();
    ctx.globalAlpha = 1;
    G.ket.forEach((z, i) => arrow2(ctx, cx, cy, cx + r * z[0], cy - r * z[1], i ? P.violet : P.sigma, 2));
    ctx.restore();
    stag('ketT', b.x + b.w / 2, b.y + 10, L('ket 的公共相位', "a ket's common phase"), 'raw');
    stag('ketV', b.x + b.w / 2, b.y + b.h - 10, `ρ₀₁ ${fix(G.rho01[0], 3)} ${G.rho01[1] < 0 ? '−' : '+'} ${fix(Math.abs(G.rho01[1]), 3)}i`, 'num');
  }
  function arrow2(ctx, x0, y0, x1, y1, color, w, head) {
    const dx = x1 - x0, dy = y1 - y0, l = Math.hypot(dx, dy); if (l < 1) return;
    ctx.strokeStyle = ctx.fillStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
    const h = Math.min(head || 8, l * 0.5), ux = dx / l, uy = dy / l;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - ux * h - uy * h * 0.45, y1 - uy * h + ux * h * 0.45); ctx.lineTo(x1 - ux * h + uy * h * 0.45, y1 - uy * h - ux * h * 0.45); ctx.closePath(); ctx.fill();
  }

  function drawPioneer(st, Pn) {
    const lay = layout3D(true), ctx = st.begin(), th = TH;
    st.sphere(1, { lat: [0], lon: 2, shade: 0.03, alpha: TRV.thumbMode ? 0.5 : 0.3 });
    // the old plane S = span(x, y): the geometric projection P_S, drawn apart from the tensor M₀
    const rim = []; for (let i = 0; i < 72; i++) { const t = TAU * i / 72; rim.push([1.15 * Math.cos(t), 1.15 * Math.sin(t), 0]); }
    st.poly(rim, { fill: P.sigma, alpha: 0.05 });
    st.path(rim, { color: P.dim, width: 1.1, dash: [5, 5], alpha: 0.9, close: true, back: 0.5 });
    st.line([0, 0, -1.15], [0, 0, 1.15], { color: P.faint, width: 1, alpha: 0.8, back: 0.5 });
    drawImage(st, M0, { ghost: true, color: P.cyan });
    drawImage(st, Pn.Meta);
    // the old observers (x and y, weights 0.7 and 0.3 scaled by 1 − η) and the pioneer axis
    st.line([-1.17, 0, 0], [1.17, 0, 0], { color: P.violet, width: (1.2 + 9 * 0.7 * (1 - Pn.eta)) * th, alpha: 0.8, back: 0.35 });
    st.line([0, -1.17, 0], [0, 1.17, 0], { color: P.violet, width: (1.2 + 9 * 0.3 * (1 - Pn.eta)) * th, alpha: 0.8, back: 0.35 });
    st.line(v3.scale(Pn.n, -1.17), v3.scale(Pn.n, 1.17), { color: P.violet, width: (1.2 + 9 * Pn.eta) * th, alpha: 0.95, back: 0.4 });
    // the shadow P_S n in the old plane and the residual (I − P_S)n that escapes it
    st.line([0, 0, 0], Pn.Pn, { color: P.cyan, width: 1.4 * th, dash: [4, 4], alpha: 0.9 });
    if (Pn.residual > 1e-3) { ctx.save(); ctx.shadowColor = P.magenta; ctx.shadowBlur = 8; st.line(Pn.Pn, Pn.n, { color: P.magenta, width: 3.6 * th, alpha: 0.98, fade: false }); ctx.restore(); }
    st.dot([0, 0, 1], 4, P.sigma, { fade: false });
    st.dot(Pn.n, 6, P.amber, { glow: 12, fade: false });
    tag('n', Pn.n, 'n(β)', 'num c-am', { dx: 22, dy: -12, fade: false });
    if (Pn.residual > 0.08) tag('res', v3.lerp(Pn.Pn, Pn.n, 0.5), `sin β ${fix(Pn.residual, 3)}`, 'num c-mg', { dx: 44, fade: false });
    tag('e3', [0, 0, 1], L('e = z，到 S 距离 1', 'e = z, distance 1 to S'), 'raw', { dx: -70, dy: -10, fade: false });
    tag('plane', [-1.15 * 0.7, -1.15 * 0.7, 0], L('旧平面 S = span(x, y)', 'old plane S = span(x, y)'), 'raw', { dy: 12 });
    tag('m0', [0, -0.3, 0], 'M₀', 'num c-cy', { dx: -14, dy: 12 });
    tag('ps', Pn.Pn, 'P_S n', 'num c-cy', { dy: 14 });
    tag('ax', [1.24, 0, 0], 'x', 'num'); tag('ay', [0, 1.24, 0], 'y', 'num');
    if (lay.box) dampInset(st, lay.box);
    st.end(); declutter();
  }
  /** Inset: under the old generator I − M₀ the z mode outside the old plane decays as e^(−t), the fastest. */
  function dampInset(st, b) {
    const ctx = st.ctx, x0 = b.x + 10, x1 = b.x + b.w - 10, y0 = b.y + 24, y1 = b.y + b.h - 10, T = 4;
    const X = (t) => x0 + (x1 - x0) * t / T, Y = (v) => y1 - (y1 - y0) * v;
    ctx.save();
    insetFrame(ctx, b);
    ctx.strokeStyle = P.dim; ctx.globalAlpha = 0.7; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.lineTo(x1, y1); ctx.stroke();
    const curve = (g, color, w, a) => { ctx.strokeStyle = color; ctx.lineWidth = w; ctx.globalAlpha = a; ctx.beginPath(); for (let i = 0; i <= 40; i++) { const t = T * i / 40; i ? ctx.lineTo(X(t), Y(Math.exp(-g * t))) : ctx.moveTo(X(t), Y(1)); } ctx.stroke(); };
    curve(0.3, P.cyan, 1.4, 0.9); curve(0.7, P.cyan, 1.2, 0.55); curve(1, P.magenta, 2.2, 1);
    ctx.restore();
    stag('dT', b.x + b.w / 2, b.y + 10, L('旧生成元下的衰减', 'decay, old generator'), 'raw');
    stag('dZ', X(1.15) + 30, Y(Math.exp(-1.15)) + 4, 'z: e⁻ᵗ', 'num c-mg');
  }

  /* ---------- records (2D) ---------- */
  let recLayout = null;
  function drawRecords(st, R) {
    st.begin(); const ctx = st.ctx, F = frameBox();
    const x0 = 14, x1 = F.W - 14, y0 = F.top, y1 = F.H - F.bottom, w = x1 - x0, h = y1 - y0, wide = w > 1.15 * h;
    const arc = wide ? { x: x0, y: y0, w: w * 0.44, h } : { x: x0, y: y0, w, h: h * 0.47 };
    const pl = wide ? { x: x0 + w * 0.44 + 16, y: y0, w: w * 0.56 - 16, h } : { x: x0, y: y0 + h * 0.47 + 8, w, h: h * 0.53 - 8 };
    // the arc of records around the system
    const cx = arc.x + arc.w / 2, Rr = Math.max(30, Math.min(arc.w * 0.42, arc.h * 0.56)), cy = Math.min(arc.y + arc.h - 0.3 * Rr - 12, arc.y + Rr + 24);
    const rr = clamp(Rr * 0.075, 5, 10), pos = [];
    for (let j = 0; j < N; j++) { const t = Math.PI + 0.22 - j * (Math.PI + 0.44) / (N - 1); pos.push([cx + Rr * Math.cos(t), cy - Rr * Math.sin(t), t]); }
    recLayout = { pos, rr, plot: null };
    ctx.save();
    // correlation threads from the system to every record that still holds branch information
    ctx.strokeStyle = P.dim; ctx.lineWidth = 1; ctx.globalAlpha = 0.28;
    pos.forEach((p, j) => { if (!S.access[j]) { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(p[0], p[1]); ctx.stroke(); } });
    ctx.globalAlpha = 1;
    // the fragment O_m (the rail's current choice): an amber bracket and rings
    if (R.m > 0) {
      ctx.strokeStyle = P.amber; ctx.lineWidth = 3 * TH; ctx.shadowColor = P.amber; ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.arc(cx, cy, Rr + rr + 7, -pos[0][2] - 0.06, -pos[R.m - 1][2] + 0.06, false); ctx.stroke(); ctx.shadowBlur = 0;
    }
    pos.forEach((p, j) => {
      ctx.beginPath(); ctx.arc(p[0], p[1], rr, 0, TAU);
      if (S.access[j]) { ctx.setLineDash([3, 3]); ctx.strokeStyle = P.dim; ctx.lineWidth = 1.4; ctx.stroke(); ctx.setLineDash([]); }
      else { ctx.fillStyle = P.sigma; ctx.globalAlpha = 0.9; ctx.fill(); ctx.globalAlpha = 1; }
      if (j < R.m) { ctx.beginPath(); ctx.arc(p[0], p[1], rr + 3.5, 0, TAU); ctx.strokeStyle = P.amber; ctx.lineWidth = 1.6; ctx.stroke(); }
    });
    // the system qubit: its Bloch vector (amber) in the XZ disc, split into the kept population part (cyan) and the
    // coherence that the records carry away (magenta)
    const sr = clamp(Rr * 0.4, 20, 48), rx = 2 * R.coherence, rz = S.p0 - (1 - S.p0);
    ctx.strokeStyle = P.dim; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, sr, 0, TAU); ctx.stroke();
    ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.moveTo(cx - sr, cy); ctx.lineTo(cx + sr, cy); ctx.moveTo(cx, cy - sr); ctx.lineTo(cx, cy + sr); ctx.stroke(); ctx.globalAlpha = 1;
    if (Math.abs(rz) > 1e-3) { ctx.strokeStyle = P.cyan; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - sr * rz); ctx.stroke(); }
    if (Math.abs(rx) > 1e-3) { ctx.strokeStyle = P.magenta; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx, cy - sr * rz); ctx.lineTo(cx + sr * rx, cy - sr * rz); ctx.stroke(); }
    if (Math.hypot(rx, rz) > 1e-3) { ctx.shadowColor = P.amber; ctx.shadowBlur = 10; arrow2(ctx, cx, cy, cx + sr * rx, cy - sr * rz, P.amber, 2.4, 9); ctx.shadowBlur = 0; }
    ctx.fillStyle = P.amber; ctx.beginPath(); ctx.arc(cx + sr * rx, cy - sr * rz, 3.5, 0, TAU); ctx.fill();
    ctx.restore();
    stag('sys', cx, cy + sr + 12, L(`系统 S · |ρ₀₁| ${sci(R.residual)}`, `system S · |ρ₀₁| ${sci(R.residual)}`), 'num');
    stag('frag', pos[0][0] - 4, pos[0][1] + rr + 14, `O_m · m = ${R.m}`, 'num c-am');
    // the phase-record certificate (a separate exact statement), in the emptiest corner of the arc panel
    const ir = clamp(Math.min(arc.w, arc.h) * 0.12, 15, 28);
    const corners = [[arc.x + ir + 12, arc.y + ir + 18], [arc.x + arc.w - ir - 12, arc.y + ir + 18], [arc.x + ir + 12, arc.y + arc.h - ir - 18], [arc.x + arc.w - ir - 12, arc.y + arc.h - ir - 18]];
    const clear = (c) => Math.min(...pos.map((p) => Math.hypot(p[0] - c[0], p[1] - c[1]) - rr), Math.hypot(c[0] - cx, c[1] - cy) - sr) - ir - 14;
    const best = corners.reduce((b, c) => (clear(c) > clear(b) ? c : b), corners[0]);
    if (!TRV.thumbMode && clear(best) > 0) phaseInset(st, best[0], best[1], ir);
    drawCurve(st, R, pl, F);
    st.end(); declutter();
  }
  const sci = (x) => (x === 0 ? '0' : x >= 1e-3 ? fix(x, 4) : x.toExponential(2).replace('-', '−'));
  /** The T08 certificate: 1/2 → −1/2 → −i/2 → 1/2 on a small complex plane. */
  function phaseInset(st, cx, cy, r) {
    const ctx = st.ctx, vals = [[0.5, 0], [-0.5, 0], [0, -0.5], [0.5, 0]], px = (z) => [cx + 2 * r * z[0], cy - 2 * r * z[1]];
    ctx.save();
    ctx.strokeStyle = P.dim; ctx.lineWidth = 1; ctx.globalAlpha = 0.7; ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke();
    ctx.globalAlpha = 0.4; ctx.beginPath(); ctx.moveTo(cx - r - 5, cy); ctx.lineTo(cx + r + 5, cy); ctx.moveTo(cx, cy - r - 5); ctx.lineTo(cx, cy + r + 5); ctx.stroke(); ctx.globalAlpha = 1;
    // the three steps as arcs along the circle (multiplying by −1, then by i, then by i)
    const seg = (a0, a1) => { ctx.strokeStyle = P.sigma; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.arc(cx, cy, r, -a0, -a1, true); ctx.stroke();
      const e = [cx + r * Math.cos(a1), cy - r * Math.sin(a1)], d = [Math.sin(a1), Math.cos(a1)]; arrow2(ctx, e[0] + d[0] * 6, e[1] + d[1] * 6, e[0], e[1], P.sigma, 1.4, 6); };
    seg(0.12, Math.PI - 0.12); seg(Math.PI + 0.12, 1.5 * Math.PI - 0.12); seg(1.5 * Math.PI + 0.12, TAU - 0.12);
    vals.slice(0, 3).forEach((z) => { const p = px(z); ctx.fillStyle = P.sigma; ctx.beginPath(); ctx.arc(p[0], p[1], 3, 0, TAU); ctx.fill(); });
    ctx.restore();
    stag('phT', cx, cy - r - 11, L('相位记录证书', 'phase-record certificate'), 'raw');
    stag('ph1', cx + r + 15, cy, '½', 'num');
    stag('ph2', cx - r - 17, cy, '−½', 'num');
    stag('ph3', cx, cy + r + 10, '−i/2', 'num');
  }
  function drawCurve(st, R, b, F) {
    const top = Math.max(2.25, 2 * R.SS + 0.2);
    const g = kit.plot($('cv'), { x: [-0.6, 16.6], y: [-0.1, top], pad: [b.x + 30, F.W - (b.x + b.w) + 4, b.y + 6, F.H - (b.y + b.h) + 18], clear: false });
    recLayout.plot = g;
    g.axes({ yTicks: [[0, '0'], [1, '1'], [2, '2']], xTicks: [0, 4, 8, 12, 16] });
    g.rect(3, R.SS - 0.03, 13, R.SS + 0.03, P.cyan, { alpha: 0.12 });
    g.hline(R.SS, P.cyan, { width: 1.6, alpha: 0.95 });
    g.hline(2 * R.SS, P.dim, { dash: [5, 4] });
    const pts = R.I.map((v, m) => [m, v]);
    g.line(pts, P.sigma, { width: 1.6 });
    pts.forEach(([m, v]) => g.dot(m, v, P.sigma, 2.8));
    g.vline(R.m, P.amber, { alpha: 0.75 }); g.dot(R.m, R.I[R.m], P.amber, 5.5, { glow: 10 });
    const at = (x, y, dx, dy) => [g.X(x) + dx, g.Y(y) + dy];
    let p = at(16, R.SS, -50, 13); stag('plat', p[0], p[1], L(`平台 S(ρ_S) ${fix(R.SS, 3)}`, `plateau S(ρ_S) ${fix(R.SS, 3)}`), 'num c-cy');
    p = at(8, 2 * R.SS, 0, -10); stag('twoS', p[0], p[1], '2S(ρ_S)', 'num');
    p = at(R.m, R.I[R.m], R.m > 12 ? -42 : 40, R.I[R.m] > 1.5 ? 14 : -14); stag('Inow', p[0], p[1], `I ${fix(R.I[R.m], 3)}`, 'num c-am');
    p = at(16.4, -0.1, -4, -10); stag('mlab', p[0], p[1], 'm', 'num');
    p = at(0.4, 0.62, 52, 0); stag('ilab', p[0], p[1], 'I(S : O_m)', 'num ink');
  }
  /** A press on the records stage: a record toggles its erasure; on the curve it picks the fragment size. */
  function pressRecords(ev) {
    if (!recLayout) return;
    const b = $('cv').getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top;
    const j = recLayout.pos.findIndex((p) => Math.hypot(p[0] - x, p[1] - y) < recLayout.rr + 8);
    if (j >= 0) { recordDrag = false; toggleRecord(j); return; }
    recordDrag = true; dragRecords(ev);
  }
  let recordDrag = false;
  function dragRecords(ev) {
    const g = recLayout && recLayout.plot; if (!recordDrag || !g) return;
    const b = $('cv').getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top;
    if (x < g.pl - 10 || x > g.pl + g.iw + 10 || y < g.pt - 10 || y > g.pt + g.ih + 30) return;
    leave(); clock.pause(); clock.set(clamp(Math.round(g.invX(x)), 0, N) / N);
  }

  /* ---------- bubbles (2D) ---------- */
  function drawBubbles(st, Bs) {
    st.begin(); const ctx = st.ctx, F = frameBox();
    const x0 = 14, x1 = F.W - 14, y0 = F.top, y1 = F.H - F.bottom, w = x1 - x0, h = y1 - y0, wide = w > 1.15 * h;
    const disk = wide ? { x: x0, y: y0, w: w * 0.5, h } : { x: x0, y: y0, w, h: h * 0.47 };
    const lf = wide ? { x: x0 + w * 0.5 + 14, y: y0, w: w * 0.5 - 14, h: h * 0.56 } : { x: x0, y: y0 + h * 0.49, w, h: h * 0.26 };
    const t11 = wide ? { x: x0 + w * 0.5 + 14, y: y0 + h * 0.62, w: w * 0.5 - 14, h: h * 0.38 } : { x: x0, y: y0 + h * 0.77, w, h: h * 0.23 };
    const cx = disk.x + disk.w / 2, cy = disk.y + disk.h / 2, Rd = Math.max(30, Math.min(disk.w / 2.5, disk.h / 2.35));
    const X = (u) => cx + Rd * u, Y = (v) => cy - Rd * v;
    ctx.save();
    // the XZ cross-section of the Bloch ball, and the joint tensor ½(xxᵀ + zzᵀ): a circle, no unique top axis
    ctx.strokeStyle = P.dim; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, Rd, 0, TAU); ctx.stroke();
    ctx.strokeStyle = P.cyan; ctx.setLineDash([5, 5]); ctx.globalAlpha = 0.75; ctx.beginPath(); ctx.arc(cx, cy, Rd * 0.5, 0, TAU); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
    // the two bubbles: sixteen Z axes and sixteen X axes, each one unoriented line
    ctx.strokeStyle = P.violet; ctx.lineWidth = 3.2 * TH; ctx.globalAlpha = 0.85;
    ctx.beginPath(); ctx.moveTo(X(0), Y(-1.12)); ctx.lineTo(X(0), Y(1.12)); ctx.moveTo(X(-1.12), Y(0)); ctx.lineTo(X(1.12), Y(0)); ctx.stroke();
    if (S.oblique) { ctx.lineWidth = 1.8; ctx.setLineDash([6, 4]); ctx.beginPath(); ctx.moveTo(X(-0.8), Y(-0.8)); ctx.lineTo(X(0.8), Y(0.8)); ctx.stroke(); ctx.setLineDash([]); }
    ctx.globalAlpha = 1;
    // selected updates, both orders: Z⁺ then X⁺ (outer arc) ends at |+x⟩, X⁺ then Z⁺ (inner arc) ends at |+z⟩
    const u = clamp(S.trace, 0, 1);
    // A: Z⁺ takes I/2 to |+z⟩, then X⁺ takes it round the sphere to |+x⟩; B: X⁺ to |+x⟩, then Z⁺ inside to |+z⟩
    const pathA = [], pathB = [];
    for (let i = 0; i <= 20; i++) pathA.push([X(0) - 5, Y(i / 20)]);
    for (let i = 1; i <= 30; i++) { const t = HALF_PI * (1 - i / 30); pathA.push([X(Math.cos(t)), Y(Math.sin(t))]); }
    for (let i = 0; i <= 20; i++) pathB.push([X(i / 20), Y(0) + 5]);
    for (let i = 1; i <= 30; i++) { const t = i / 30, a = (1 - t) * (1 - t), b = 2 * t * (1 - t), c = t * t; pathB.push([X(a + 0.22 * b), Y(0.22 * b + c)]); }
    const trace = (pts, dash) => {
      const n = Math.max(2, Math.round(u * (pts.length - 1)) + 1), sub = pts.slice(0, n);
      ctx.strokeStyle = P.sigma; ctx.lineWidth = 1.8; ctx.setLineDash(dash); ctx.beginPath(); sub.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.setLineDash([]);
      const a = sub[sub.length - 2], b = sub[sub.length - 1];
      if (u < 1) { ctx.fillStyle = P.amber; ctx.shadowColor = P.amber; ctx.shadowBlur = 10; ctx.beginPath(); ctx.arc(b[0], b[1], 4.5, 0, TAU); ctx.fill(); ctx.shadowBlur = 0; }
      else arrow2(ctx, a[0], a[1], b[0], b[1], P.sigma, 1.8, 9);
    };
    trace(pathA, []); trace(pathB, [5, 4]);
    // where both selected orders end, and their mismatch (magenta)
    if (u >= 1) {
      ctx.strokeStyle = P.magenta; ctx.lineWidth = 2.6 * TH; ctx.setLineDash([6, 4]); ctx.beginPath(); ctx.moveTo(X(1), Y(0)); ctx.lineTo(X(0), Y(1)); ctx.stroke(); ctx.setLineDash([]);
      for (const e of [Bs.endZX, Bs.endXZ]) { ctx.fillStyle = P.sigma; ctx.beginPath(); ctx.arc(X(e[0]), Y(e[2]), 5, 0, TAU); ctx.fill(); }
    }
    // unread updates in either order: everything to the centre I/2 (cyan)
    ctx.fillStyle = P.cyan; ctx.shadowColor = P.cyan; ctx.shadowBlur = 10; ctx.beginPath(); ctx.arc(cx, cy, 5.5, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
    if (S.oblique) {
      // the 45° control: from |+x⟩, Z after O and O after Z land in different places
      for (const e of [Bs.unreadZO, Bs.unreadOZ]) { ctx.strokeStyle = P.magenta; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(X(e[0]), Y(e[2]), 7, 0, TAU); ctx.stroke(); }
    }
    ctx.restore();
    stag('bz', X(0) + 26, Y(-1.08), 'Z ×16', 'num c-vi');
    stag('bx', X(-1.06), Y(0) - 12, 'X ×16', 'num c-vi');
    stag('ctr', cx - 30, cy + 16, L('未读 → I/2', 'unread → I/2'), 'num c-cy');
    stag('ex', X(1) + 2, Y(0) + 16, '|+x⟩', 'num');
    stag('ez', X(0) + 26, Y(1) - 2, '|+z⟩', 'num');
    stag('pa', X(0.72) + 26, Y(0.72) - 10, 'Z⁺→X⁺', 'num ink');
    stag('pb', X(0.25) + 10, Y(0.25), 'X⁺→Z⁺', 'num ink');
    if (u >= 1) stag('mis', X(0.62) + 8, Y(0.62) + 4, L('差 ¼', 'gap ¼'), 'num c-mg');
    if (S.oblique) stag('obl', X(0.6) + 18, Y(0.6) - 2, `45° ‖[K_Z, K_O]‖ ${fix(Bs.commZO, 3)}`, 'num c-mg');
    drawLF(st, lfAt(clock.t), lf, F);
    drawT11(st, t11);
    st.end(); declutter();
  }
  function drawLF(st, LFs, b, F) {
    const top = 7.6, vs = LFW.threshold, Fmax = LFW.exact;
    const g = kit.plot($('cv'), { x: [0, 1], y: [0, top], pad: [b.x + 28, F.W - (b.x + b.w) + 6, b.y + 6, F.H - (b.y + b.h) + 18], clear: false });
    g.axes({ yTicks: [0, 2, 4, 6], xTicks: [[0, '0'], [0.5, '0.5'], [1, '1']] });
    g.poly([[vs, 6], [1, 6], [1, Fmax]], P.magenta, { alpha: 0.2 });
    g.hline(6, P.dim, { dash: [5, 4] });
    g.line([[0, 0], [1, Fmax]], P.sigma, { width: 2 });
    g.vline(vs, P.dim, { dash: [2, 3] });
    g.vline(LFs.v, P.amber, { alpha: 0.75 }); g.dot(LFs.v, LFs.score, P.amber, 5.5, { glow: 10 });
    let p = [g.X(0.02) + 46, g.Y(6) - 9]; stag('lfb', p[0], p[1], L('LF 界 6', 'LF bound 6'), 'num');
    p = [g.X(LFs.v) + (LFs.v > 0.75 ? -40 : 40), g.Y(LFs.score) + (LFs.v > 0.75 ? 14 : -10)]; stag('lfv', p[0], p[1], `F ${fix(LFs.score, 3)}`, 'num c-am');
    p = [g.X(vs), g.Y(0) - 10]; stag('lfs', p[0] - 26, p[1], `v* ${fix(vs, 3)}`, 'num');
    p = [g.X(0.5), g.Y(top) + 8]; stag('lft', p[0], p[1], L('局部友好分数（文献不等式）', 'Local Friendliness score (literature)'), 'raw');
  }
  /** The T11 inset: three worlds {0, 1, 2}; revising by P then Q gives {1}, by Q then P gives {1, 2}. */
  function drawT11(st, b) {
    if (TRV.thumbMode || b.h < 34) return;
    const ctx = st.ctx, sets = BUB.sets, rows = [[sets.A, sets.revisePA, sets.PthenQ, 'P', 'Q'], [sets.A, sets.reviseQA, sets.QthenP, 'Q', 'P']];
    const rowH = Math.min(30, (b.h - 18) / 2), dot = clamp(rowH * 0.18, 3, 5), setW = dot * 7.2;
    const lw = Math.min(84, b.w * 0.27), resW = 52, gapSet = clamp((b.w - lw - resW - setW) / 2, setW + 22, setW + 96);
    const startX = b.x + lw + dot, titleY = b.y + 8;
    stag('t11T', b.x + b.w / 2, titleY, L('三个世界的集合修订：次序要紧', 'Set revision over three worlds: order matters'), 'raw');
    ctx.save();
    rows.forEach((row, ri) => {
      const y = b.y + 22 + rowH * (ri + 0.5);
      stag(`t11r${ri}`, b.x + lw / 2, y, ri ? L('先 Q 后 P', 'Q then P') : L('先 P 后 Q', 'P then Q'), 'raw');
      [0, 1, 2].forEach((si) => {
        const set = row[si], sx = startX + si * gapSet;
        for (let wv = 0; wv < 3; wv++) {
          const x = sx + wv * dot * 2.6; ctx.beginPath(); ctx.arc(x, y, dot, 0, TAU);
          if (set.includes(wv)) { ctx.fillStyle = P.sigma; ctx.fill(); } else { ctx.strokeStyle = P.dim; ctx.lineWidth = 1; ctx.stroke(); }
        }
        if (si === 2) { ctx.strokeStyle = P.magenta; ctx.lineWidth = 1.6; ctx.strokeRect(sx - dot - 4, y - dot - 4, setW + 8, 2 * dot + 8); }
        if (si < 2) { const ax = sx + setW - dot + 5, bx = sx + gapSet - dot - 5; arrow2(ctx, ax, y, bx, y, P.dim, 1.2, 5); stag(`t11a${ri}${si}`, (ax + bx) / 2, y - 9, row[3 + si], 'num'); }
      });
      stag(`t11s${ri}`, startX + 2 * gapSet + setW - dot + 8 + resW / 2, y, `{${row[2].join(', ')}}`, 'num c-mg');
    });
    ctx.restore();
  }

  function drawStage(snap) {
    const st = stage;
    if (S.scene === 'tensor') drawTensor(st, snap.T);
    else if (S.scene === 'pioneer') drawPioneer(st, snap.Pn);
    else if (S.scene === 'records') drawRecords(st, snap.R);
    else drawBubbles(st, BUB);
  }

  /* ---------- the strip: one question per plot ---------- */
  const xt16 = [0, 4, 8, 12, 16];
  function drawPlots(snap) {
    const A = $('plotA'), B = $('plotB');
    if (S.scene === 'tensor' && snap.T.gauge) return plotsGauge(A, B, snap.T);
    if (S.scene === 'tensor') return plotsTensor(A, B, snap.T);
    if (S.scene === 'records') return plotsRecords(A, B, snap.R);
    if (S.scene === 'bubbles') return plotsBubbles(A, B);
    return plotsPioneer(A, B, snap.Pn);
  }
  function plotsTensor(A, B, T) {
    const g = kit.plot(A, { x: [-0.4, 16.4], y: [0, 1.05], pad: [34, 10, 10, 22] });
    g.axes({ yTicks: [0, 0.5, 1], xTicks: xt16 });
    if (T.pointer && !T.iso) {
      const e = T.pointer, perp = (v) => v3.len(v3.sub(v, v3.scale(e, v3.dot(v, e))));
      g.line(T.wlPath.map((v, j) => [j, perp(v)]), P.magenta, { width: 1.2, dash: [4, 3], alpha: 0.7 });
      g.line(T.path.map((v, j) => [j, Math.abs(v3.dot(v, e))]), P.cyan, { width: 2 });
      g.line(T.path.map((v, j) => [j, perp(v)]), P.magenta, { width: 2 });
      g.vline(T.k, P.amber, { alpha: 0.6 }); g.dot(T.k, perp(T.r), P.amber, 4);
      g.legend([[P.cyan, L('沿指针轴 |r·e|', 'along the pointer |r·e|')], [P.magenta, L('横向 |r⊥|', 'across |r⊥|')], [P.magenta, L('弱极限（另算）', 'weak limit (separate)'), 'dash']]);
      $('pATitle').textContent = L('沿指针轴留下，横向缩短', 'Along stays, across shrinks');
      $('pAMeta').textContent = `k ${T.k} · |r⊥| ${fix(T.sp.perpLen, 3)}`;
    } else {
      g.line(T.wlPath.map((v, j) => [j, v3.len(v)]), P.dim, { width: 1.3, dash: [4, 3] });
      g.line(T.path.map((v, j) => [j, v3.len(v)]), P.sigma, { width: 2 });
      g.vline(T.k, P.amber, { alpha: 0.6 }); g.dot(T.k, v3.len(T.r), P.amber, 4);
      g.legend([[P.sigma, L('态的长度 |r|', 'state length |r|')], [P.dim, L('弱极限（另算）', 'weak limit (separate)'), 'dash']]);
      $('pATitle').textContent = L('没有指针轴：整体一起缩', 'No pointer axis: all of it shrinks');
      $('pAMeta').textContent = `k ${T.k} · |r| ${fix(v3.len(T.r), 3)}`;
    }
    const g2 = kit.plot(B, { x: [-0.4, 16.4], y: [0, 1.05], pad: [34, 10, 10, 22] });
    g2.axes({ yTicks: [0, 0.5, 1], xTicks: xt16 });
    if (T.pointer && !T.iso) {
      const e = T.pointer, off = (v) => { const p = v3.sub(v, v3.scale(e, v3.dot(v, e))); return v3.dot(p, p) / 2; };
      g2.line(T.path.map((v, j) => [j, off(v)]), P.magenta, { width: 2 });
      if (T.entropy) g2.line(T.entropy.bitsPerStep.map((x, j) => [j, x]), P.cyan, { width: 1.6 });
      g2.vline(T.k, P.amber, { alpha: 0.6 }); g2.dot(T.k, off(T.r), P.amber, 4);
      g2.legend([[P.magenta, L('非对角 HS 质量', 'off-diagonal HS mass')]].concat(T.entropy ? [[P.cyan, L('熵（比特）', 'entropy (bits)')]] : []));
      $('pBTitle').textContent = L('被删去的相干', 'Deleted coherence');
      $('pBMeta').textContent = fix(T.hs.offDiagonal, 4);
    } else {
      g2.line(T.path.map((v, j) => [j, (1 + v3.dot(v, v)) / 2]), P.sigma, { width: 2 });
      g2.vline(T.k, P.amber, { alpha: 0.6 }); g2.dot(T.k, (1 + v3.dot(T.r, T.r)) / 2, P.amber, 4);
      g2.legend([[P.sigma, L('纯度 Tr ρ²', 'purity Tr ρ²')]]);
      $('pBTitle').textContent = L('纯度一起下降', 'Purity falls everywhere');
      $('pBMeta').textContent = fix((1 + v3.dot(T.r, T.r)) / 2, 4);
    }
  }
  function plotsGauge(A, B, T) {
    const fs = [0, 1, 2, 3, 4, 5, 6, 7, 8], base = AXSETS.gauge;
    const naive = fs.map((f) => { const ax = base.axes.map((n, j) => v3.scale(n, j < f ? -1 : 1)); const pr = prepare(ax, base.w); return pr.axes.reduce((acc, n, j) => v3.add(acc, v3.scale(n, pr.w[j])), [0, 0, 0]); });
    const g = kit.plot(A, { x: [-0.3, 8.3], y: [0, 0.75], pad: [34, 10, 10, 22] });
    g.axes({ yTicks: [0, 0.25, 0.5], xTicks: fs });
    T.lam.forEach((l) => g.line([[0, l], [8, l]], P.cyan, { width: 1.8 }));
    g.line(naive.map((v, f) => [f, v3.len(v)]), P.sigma, { width: 1.6 }); naive.forEach((v, f) => g.dot(f, v3.len(v), P.sigma, 3));
    g.vline(T.f, P.amber, { alpha: 0.6 }); g.dot(T.f, T.gaugeSnap.naiveLength, P.amber, 4);
    g.legend([[P.cyan, L('张量的三个特征值', 'three eigenvalues of the tensor')], [P.sigma, L('带号和的长度', 'length of the signed sum')]]);
    $('pATitle').textContent = L('谱不动，带号和在摆', 'Spectrum fixed, signed sum swings');
    $('pAMeta').textContent = `|Σwⱼnⱼ| ${fix(T.gaugeSnap.naiveLength, 3)}`;
    const g2 = kit.plot(B, { x: [-0.3, 8.3], y: [-0.05, 0.7], pad: [34, 10, 10, 22] });
    g2.axes({ yTicks: [0, 0.25, 0.5], xTicks: fs });
    const ents = [[0, 0], [1, 1], [2, 2], [0, 1], [0, 2], [1, 2]];
    ents.forEach(([i, j]) => g2.line([[0, T.M[i][j]], [8, T.M[i][j]]], P.cyan, { width: 1.4, alpha: i === j ? 1 : 0.6 }));
    naive.forEach((v, f) => { g2.dot(f, v[2], P.sigma, 2.6, { alpha: 0.85 }); g2.dot(f, v[0], P.dim, 2.4); });
    g2.vline(T.f, P.amber, { alpha: 0.6 });
    g2.legend([[P.cyan, L('张量的六个独立元素', 'six independent tensor entries')], [P.sigma, L('带号和的 z、x 分量', 'z and x of the signed sum')]]);
    $('pBTitle').textContent = L('张量的每一项', 'Every entry of the tensor');
    $('pBMeta').textContent = `max |ΔM| ${fix(T.gaugeSnap.maxEntryChange, 3)}`;
  }
  function plotsRecords(A, B, R) {
    const top = Math.max(1.1, R.SS * 1.15);
    const g = kit.plot(A, { x: [-0.4, 16.4], y: [0, top], pad: [34, 10, 10, 22] });
    g.axes({ yTicks: [0, [Math.min(1, top), fix(Math.min(1, top), 1)]], xTicks: xt16 });
    g.hline(R.SS, P.cyan, { width: 1.4 });
    g.line(R.SC.map((x, m) => [m, x]), P.dim, { width: 1.4, dash: [4, 3] });
    g.line(R.SF.map((x, m) => [m, x]), P.sigma, { width: 2 });
    g.vline(R.m, P.amber, { alpha: 0.6 }); g.dot(R.m, R.SF[R.m], P.amber, 4);
    g.legend([[P.sigma, L('片段 S(ρ_Om)', 'fragment S(ρ_Om)')], [P.dim, L('系统与片段 S(ρ_S Om)', 'system with fragment'), 'dash'], [P.cyan, L('系统 S(ρ_S)', 'system S(ρ_S)')]], { bottom: true, right: true });
    $('pATitle').textContent = L('三种熵', 'Three entropies');
    $('pAMeta').textContent = `m ${R.m}`;
    const pre = Math.sqrt(S.p0 * (1 - S.p0)), floor = 1e-12;
    const val = (a) => Math.max(floor, pre * Math.pow(Math.abs(S.c), N - a));
    const g2 = kit.plot(B, { x: [-0.4, 16.4], y: [floor, 1], logY: true, pad: [40, 10, 10, 22] });
    g2.axes({ yTicks: [[1, '1'], [1e-4, '10⁻⁴'], [1e-8, '10⁻⁸'], [1e-12, '10⁻¹²']], xTicks: xt16 });
    const pts = []; for (let a = 0; a <= N; a++) pts.push([a, val(a)]);
    g2.line(pts, P.magenta, { width: 2 }); pts.forEach(([a, v]) => g2.dot(a, v, P.magenta, 2.4));
    g2.vline(R.erased, P.amber, { alpha: 0.6 }); g2.dot(R.erased, Math.max(floor, R.residual), P.amber, 4.5);
    g2.legend([[P.magenta, L('|ρ₀₁|，按擦掉的份数', '|ρ₀₁| by records erased')]], { right: false });
    $('pBTitle').textContent = L('擦掉几份，剩多少相干', 'Coherence left after erasing');
    $('pBMeta').textContent = `${R.erased} / 16 · ${sci(R.residual)}`;
  }
  function plotsBubbles(A, B) {
    const g = kit.plot(A, { x: [0, 1], y: [0, 0.27], pad: [40, 10, 10, 22] });
    g.axes({ yTicks: [[0, '0'], [0.25, '0.25']], xTicks: [[0, '0'], [0.5, '0.5'], [1, '1']] });
    const pts = []; for (let i = 0; i <= 20; i++) pts.push([i / 20, lfAt(i / 20).minProbability]);
    g.line(pts, P.sigma, { width: 2 });
    const now = lfAt(clock.t);
    g.vline(clock.t, P.amber, { alpha: 0.6 }); g.dot(clock.t, now.minProbability, P.amber, 4);
    g.legend([[P.sigma, L('36 个概率中最小的', 'smallest of the 36 probabilities')]]);
    $('pATitle').textContent = L('三十六个概率都不为负', 'All 36 probabilities stay ≥ 0');
    $('pAMeta').textContent = `v ${fix(clock.t, 2)} · ${fix(now.minProbability, 4)}`;
    const g2 = kit.plot(B, { x: [0, 90], y: [0, 0.8], pad: [34, 10, 10, 22] });
    g2.axes({ yTicks: [0, 0.35, 0.7], xTicks: [0, 45, 90] });
    const cs = []; for (let d = 0; d <= 90; d += 2) cs.push([d, commAt(d * Math.PI / 180)]);
    g2.line(cs, P.magenta, { width: 2 });
    g2.dot(90, BUB.commZX, P.cyan, 4.5); g2.dot(45, BUB.commZO, P.magenta, 4.5, { ring: true, width: 1.6 });
    g2.dot(S.oblique ? 45 : 90, S.oblique ? BUB.commZO : BUB.commZX, P.amber, 3.5);
    g2.legend([[P.magenta, L('‖[K_Z, K_m]‖，完全捏合', '‖[K_Z, K_m]‖ at full pinching')]]);
    $('pBTitle').textContent = L('倾斜的轴：未读何时不对易', 'Tilted axis: when unread fails to commute');
    $('pBMeta').textContent = `90° ${fix(BUB.commZX, 3)} · 45° ${fix(BUB.commZO, 3)}`;
  }
  function plotsPioneer(A, B, Pn) {
    const g = kit.plot(A, { x: [0, 90], y: [0, 1.05], pad: [34, 10, 10, 22] });
    g.axes({ yTicks: [0, 0.5, 1], xTicks: [0, 30, 45, 60, 90] });
    const res = [], l3 = [];
    for (let d = 0; d <= 90; d += 2) { const s = pioneerState(d / 90); res.push([d, s.residual]); l3.push([d, s.eigenvalues[2]]); }
    g.line(res, P.magenta, { width: 2 }); g.line(l3, P.cyan, { width: 2 });
    const deg = Pn.beta * 180 / Math.PI;
    g.vline(deg, P.amber, { alpha: 0.6 }); g.dot(deg, Pn.residual, P.amber, 4); g.dot(deg, Pn.eigenvalues[2], P.amber, 3.5);
    g.legend([[P.magenta, L('残差 sin β', 'residual sin β')], [P.cyan, L('第三个特征值', 'third eigenvalue')]], { right: false });
    $('pATitle').textContent = L('残差升起，第三个特征值出现', 'Residual up, a third eigenvalue');
    $('pAMeta').textContent = `β ${fix(deg, 1)}° · ${fix(Pn.eigenvalues[2], 4)}`;
    const g2 = kit.plot(B, { x: [0, 5], y: [0, 1.05], pad: [34, 10, 10, 22] });
    g2.axes({ yTicks: [0, 0.5, 1], xTicks: [0, 1, 2, 3, 4, 5] });
    const curve = (gm) => { const p = []; for (let i = 0; i <= 50; i++) { const t = 5 * i / 50; p.push([t, Math.exp(-gm * t)]); } return p; };
    g2.line(curve(0.3), P.cyan, { width: 1.6 }); g2.line(curve(0.7), P.cyan, { width: 1.4, alpha: 0.55 }); g2.line(curve(1), P.magenta, { width: 2.2 });
    g2.legend([[P.cyan, L('x：e^(−0.3t)，y：e^(−0.7t)', 'x: e^(−0.3t), y: e^(−0.7t)')], [P.magenta, L('z：e^(−t)，最快', 'z: e^(−t), fastest')]]);
    $('pBTitle').textContent = L('旧平面外的模衰减最快', 'Off the old plane: fastest decay');
    $('pBMeta').textContent = `t = 1: ${fix(Math.exp(-1), 4)}`;
  }

  /* ---------- readouts, legend, HUD ---------- */
  const v3s = (v, d) => `(${v.map((x) => fix(x, d)).join(', ')})`;
  const MODE_NAME = { ordered: ['按时间顺序的乘积', 'ordered product'], mean: ['均值信道', 'mean channel'], 'weak-limit': ['弱极限', 'weak limit'] };
  const SCENE_NAME = { tensor: ['张量', 'TENSOR'], records: ['记录', 'RECORDS'], bubbles: ['气泡', 'BUBBLES'], pioneer: ['先驱', 'PIONEER'] };
  const CODE = { 'isotropic-fog': 'ISO-FOG', 'axis-consensus': 'SHARED-AXIS', 'phase-gauge': 'SIGN-GAUGE', 'darwinism-plateau': 'PLATEAU', 'dual-wigner-bubbles': 'TWO-BUBBLES', 'new-axis-pioneers': 'PIONEER' };
  function setRo(i, zh, en, val) { $(`roL${i}`).textContent = L(zh, en); $(`ro${i}`).textContent = val; }
  function drawText(snap) {
    const leg = (items) => items.map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    let html = '';
    if (S.scene === 'tensor' && snap.T.gauge) {
      const T = snap.T, G = T.gaugeSnap;
      $('roAside').textContent = L('均值信道 · k = 16', 'mean channel · k = 16');
      $('roKeyL').textContent = L('张量纹丝不动：谱 λ', 'The tensor does not move: spectrum λ');
      $('roKey').textContent = v3s(T.lam, 3);
      $('roKeySub').textContent = ` · κ ${fix(T.kappa, 3)} · ${L('间隙', 'gap')} ${fix(T.gap, 3)}`;
      setRo(1, '已翻转的轴端', 'Axis ends flipped', `${G.flips} / 8`);
      setRo(2, '带号和 |Σwⱼnⱼ|', 'Signed sum |Σwⱼnⱼ|', fix(G.naiveLength, 3));
      setRo(3, '张量任一项与翻转前之差的最大值', 'Largest change of any tensor entry', fix(G.maxEntryChange, 3));
      setRo(4, '均值信道的模因子', 'Mean-channel mode factors', T.modeDamping.values.map((x) => fix(x, 3)).join(' · '));
      setRo(5, 'ket 的 ρ₀₁（乘公共相位后）', "The ket's ρ₀₁ after the phase", `${fix(G.rho01[0], 3)} ${G.rho01[1] < 0 ? '−' : '+'} ${fix(Math.abs(G.rho01[1]), 3)}i`);
      $('roNote').textContent = L('轴端只是两个结果的标签：翻转它不改变 nnᵀ，也不把相对的两个纯态当成同一个。右下角是另一种变换：ket 乘公共相位 e^(iθ)，|ψ⟩⟨ψ| 也不变（θ 随时间轴转动只为演示）。',
        "An axis end is only the label of an outcome: flipping it leaves nnᵀ unchanged and does not make the two opposite pure states one. The inset shows a different transformation: a ket times a common phase e^(iθ) leaves |ψ⟩⟨ψ| unchanged too (θ follows the rail only for display).");
      $('hudBig').textContent = L(`翻转轴端 · ${G.flips} / 8`, `FLIPPING AXIS ENDS · ${G.flips} / 8`);
      $('hudSub').textContent = L(`λ = ${v3s(T.lam, 2)} 不动 · 带号和 ${fix(G.naiveLength, 3)}`, `λ = ${v3s(T.lam, 2)} stays · signed sum ${fix(G.naiveLength, 3)}`);
      html = leg([['am', '现在的态 r', 'current state r'], ['vi', '观察者的轴（点是标签端）', "observers' axes (dots: labelled ends)"], ['cy box', '均值信道 k = 16 下球的像', 'image of the ball, mean channel k = 16'], ['dash ink', '带号和 Σwⱼnⱼ（会变）', 'signed sum Σwⱼnⱼ (changes)']]);
    } else if (S.scene === 'tensor') {
      const T = snap.T, md = MODE_NAME[S.mode];
      $('roAside').textContent = L(md[0], md[1]);
      if (T.iso) {
        if (S.mode === 'ordered') {
          const sv = singular(T.K).values;
          $('roKeyL').textContent = L('真实乘积的三条半轴', 'Semi-axes of the actual product');
          $('roKey').textContent = sv.map((x) => fix(x, 3)).join(' · ');
          $('roKeySub').textContent = L(' · 有限的历史不必各向同性', ' · a finite history need not be isotropic');
        } else {
          $('roKeyL').textContent = S.mode === 'mean' ? L('均值信道的整体缩放 [(1 + 2cos α)/3]ᵏ', 'Uniform scale of the mean channel [(1 + 2cos α)/3]ᵏ') : L('弱极限的整体缩放 e^(−kα²/3)', 'Uniform scale of the weak limit e^(−kα²/3)');
          $('roKey').textContent = fix(S.mode === 'mean' ? T.meanScale : T.weakScale, 4);
          $('roKeySub').textContent = S.mode === 'mean' ? L(` · 弱极限 e^(−kα²/3) = ${fix(T.weakScale, 4)}，另算`, ` · weak limit e^(−kα²/3) = ${fix(T.weakScale, 4)}, computed apart`) : L(` · 均值信道 ${fix(T.meanScale, 4)}，另算`, ` · mean channel ${fix(T.meanScale, 4)}, computed apart`);
        }
      } else if (T.sp) {
        $('roKeyL').textContent = L('沿指针轴的分量 r·e', 'Component along the pointer r·e');
        $('roKey').textContent = `${fix(T.sp0.par, 4)} → ${fix(T.sp.par, 4)}`;
        $('roKeySub').textContent = L(` · 横向 ${fix(T.sp0.perpLen, 4)} → ${fix(T.sp.perpLen, 4)}`, ` · across ${fix(T.sp0.perpLen, 4)} → ${fix(T.sp.perpLen, 4)}`);
      } else {
        $('roKeyL').textContent = L('指针轴', 'Pointer axis'); $('roKey').textContent = L('无唯一指针主轴', 'No unique pointer axis'); $('roKeySub').textContent = '';
      }
      setRo(1, '谱 λ（降序）', 'Spectrum λ (descending)', v3s(T.lam, 3));
      setRo(2, '集中度 κ · 间隙', 'Concentration κ · gap', `${fix(T.kappa, 3)} · ${fix(T.gap, 3)}`);
      setRo(3, '指针轴', 'Pointer axis', T.pointer ? `±${v3s(T.pointer, 3)} · ${L('无向的线', 'an unoriented line')}` : L('无唯一指针主轴（间隙 < ε = 10⁻⁸）', 'No unique pointer axis (gap < ε = 10⁻⁸)'));
      if (T.hs) setRo(4, '非对角 HS 质量 ‖ρ − Πρ‖²', 'Off-diagonal HS mass ‖ρ − Πρ‖²', fix(T.hs.offDiagonal, 4));
      else setRo(4, '纯度 Tr ρ²', 'Purity Tr ρ²', fix((1 + v3.dot(T.r, T.r)) / 2, 4));
      const dl = { 'mean-eigenmodes': ['均值信道的模因子', 'Mean-channel mode factors'], 'weak-limit-eigenmodes': ['弱极限的模因子', 'Weak-limit mode factors'], 'ordered-singular-values': ['真实乘积的半轴', 'Semi-axes of the product'] }[T.modeDamping.kind];
      setRo(5, dl[0], dl[1], T.modeDamping.values.map((x) => fix(x, 3)).join(' · '));
      let note;
      if (T.entropy && T.k >= 1) note = L(`完全捏合（α = π/2）：第一步熵增 ${fix(T.entropy.gainBits[0], 4)} 比特，等于这一步的相对熵 ${fix(T.entropy.relativeEntropyBits[0], 4)} 比特；之后每步为 0。态已落在 z 轴上，未读态不再改变它${T.fixedPoint ? '（不动点）' : ''}。`,
        `Full pinching (α = π/2): the first step gains ${fix(T.entropy.gainBits[0], 4)} bits of entropy, equal to that step's relative entropy ${fix(T.entropy.relativeEntropyBits[0], 4)} bits; every later step gains 0. The state sits on the z axis and the unread state no longer changes it${T.fixedPoint ? ' (a fixed point)' : ''}.`);
      else if (T.iso) note = L('M = I/3：每个方向都同样领先，没有指针轴，球只能整体缩向中心。灰色虚线是弱极限，单独计算，不与有限次的结果画等号。', 'M = I/3: every direction leads equally, so there is no pointer axis and the ball can only shrink as a whole. The grey dashed outline is the weak limit, computed apart and never equated with the finite result.');
      else if (S.axisSet === 'consensus') note = L(`有限乘积的横向因子 (cos α)ᵏ = ${fix(Math.pow(T.c, T.k), 4)}；弱极限 e^(−kα²/2) = ${fix(Math.exp(-T.k * T.a * T.a / 2), 4)} 只在 α → 0 时与它渐近相同。`, `The finite transverse factor (cos α)ᵏ = ${fix(Math.pow(T.c, T.k), 4)}; the weak limit e^(−kα²/2) = ${fix(Math.exp(-T.k * T.a * T.a / 2), 4)} agrees with it only asymptotically as α → 0.`);
      else note = L('最慢衰减的方向只是有限时间里的相对优先方向：λ₁ < 1 时一切最终趋向 I/2。', 'The slowest-damped direction is only preferred for a finite time: with λ₁ < 1 everything eventually tends to I/2.');
      $('roNote').textContent = note;
      $('hudBig').textContent = L(`共识张量 · k = ${T.k} / ${N}`, `CONSENSUS TENSOR · k = ${T.k} / ${N}`);
      $('hudSub').textContent = T.iso ? L(`λ = (⅓, ⅓, ⅓) · 无唯一指针主轴 · 均值 ${fix(T.meanScale, 3)} · 弱极限 ${fix(T.weakScale, 3)}`, `λ = (⅓, ⅓, ⅓) · no unique pointer axis · mean ${fix(T.meanScale, 3)} · weak limit ${fix(T.weakScale, 3)}`)
        : T.sp ? L(`κ = ${fix(T.kappa, 2)} · 纵向 ${fix(T.sp.par, 3)} · 横向 ${fix(T.sp.perpLen, 3)} · ${md[0]}`, `κ = ${fix(T.kappa, 2)} · along ${fix(T.sp.par, 3)} · across ${fix(T.sp.perpLen, 3)} · ${md[1]}`) : '';
      html = leg([['am', '现在的态 r', 'current state r'], ['vi', '观察者的轴（无向）', "observers' axes (unoriented)"], ['cy box', '球在信道下的像', 'image of the ball']]
        .concat(T.pointer && !T.iso ? [['cy', '纵向（留下）', 'along (kept)'], ['mg', '横向（被删的相干）', 'across (deleted coherence)']] : [])
        .concat(S.mode !== 'weak-limit' ? [['dash', '弱极限（另算）', 'weak limit (separate)']] : []));
    } else if (S.scene === 'records') {
      const R = snap.R;
      $('roAside').textContent = `p₀ ${fix(S.p0, 2)} · c ${fix(S.c, 2)}`;
      $('roKeyL').textContent = L('互信息 I(S : O_m)', 'Mutual information I(S : O_m)');
      $('roKey').textContent = `${fix(R.I[R.m], 4)} ${L('比特', 'bits')}`;
      $('roKeySub').textContent = ` · m = ${R.m}`;
      setRo(1, '系统熵 S(ρ_S)', 'System entropy S(ρ_S)', fix(R.SS, 4));
      setRo(2, '片段熵 S(ρ_Om)', 'Fragment entropy S(ρ_Om)', fix(R.SF[R.m], 4));
      setRo(3, '剩下的相干 |ρ₀₁| = √(p₀p₁)·|Π 未擦除的 c|', 'Coherence left |ρ₀₁| = √(p₀p₁)·|Π of c not erased|', `${sci(R.residual)} · ${L('未擦除', 'not erased')} ${R.uncontrolled} / 16`);
      setRo(4, 'm = 3…13 离 S(ρ_S) 最远', 'Farthest from S(ρ_S), m = 3…13', sci(R.plateau));
      setRo(5, '系统与片段的联合熵', 'Joint entropy of S and O_m', fix(R.SC[R.m], 4));
      $('roNote').textContent = R.erased === N ? L('全部记录都擦回了空白：系统回到纯态，互信息处处为零。', 'Every record is erased back to blank: the system is pure again and the mutual information is zero everywhere.')
        : R.erased > 0 ? L(`擦掉了 ${R.erased} 份：剩下的 ${R.uncontrolled} 份仍各带分支信息，系统相干只回到 ${sci(R.residual)}。`, `${R.erased} erased: the other ${R.uncontrolled} still carry the branch information, and the system coherence only returns to ${sci(R.residual)}.`)
          : L('m = 3…13 时互信息贴着 S(ρ_S)：任取几份记录就能读出同一个分支标签。最后升到 2S 的部分来自整体的纯化，不是两倍的经典信息。', 'For m = 3…13 the mutual information hugs S(ρ_S): any few records read out the same branch label. The final rise to 2S comes from the purification as a whole, not from twice the classical information.');
      $('hudBig').textContent = L(`冗余记录 · m = ${R.m} / ${N}`, `REDUNDANT RECORDS · m = ${R.m} / ${N}`);
      $('hudSub').textContent = L(`I(S : O_m) = ${fix(R.I[R.m], 3)} 比特 · S(ρ_S) = ${fix(R.SS, 3)} · 未擦除 ${R.uncontrolled} / 16`, `I(S : O_m) = ${fix(R.I[R.m], 3)} bits · S(ρ_S) = ${fix(R.SS, 3)} · not erased ${R.uncontrolled} / 16`);
      html = leg([['am', '现在的片段 O_m 与系统的态', 'current fragment O_m and system state'], ['ink', '带着记录 · 空心：已擦除', 'holding a record · hollow: erased'], ['cy', '平台 S(ρ_S)', 'plateau S(ρ_S)'], ['mg', '系统的相干', 'system coherence']]);
    } else if (S.scene === 'bubbles') {
      const LFs = lfAt(clock.t);
      $('roAside').textContent = `α = π/2 · v ${fix(clock.t, 2)}`;
      $('roKeyL').textContent = L('局部友好分数 F_LF（界 6）', 'Local Friendliness score F_LF (bound 6)');
      $('roKey').textContent = fix(LFs.score, 4);
      $('roKeySub').textContent = ` ${LFs.score > 6 ? '> 6' : '≤ 6'} · v* ≈ ${fix(LFW.threshold, 4)}`;
      setRo(1, '未读 ‖[K_Z, K_X]‖', 'Unread ‖[K_Z, K_X]‖', fix(BUB.commZX, 3));
      setRo(2, '选读两种次序的迹', 'Trace of each selected order', `${fix(BUB.traceZX, 3)} · ${fix(BUB.traceXZ, 3)}`);
      setRo(3, '选读终点之差（HS 范数，未归一）', 'Selected endpoints apart (HS norm, subnormalized)', fix(BUB.hsDiff, 4));
      setRo(4, '36 个概率中最小的', 'Smallest of the 36 probabilities', fix(LFs.minProbability, 4));
      setRo(5, '无信号误差', 'No-signalling error', sci(LFs.noSignallingError));
      $('roNote').textContent = S.oblique ? L(`倾斜 45° 的轴：‖[K_Z, K_O]‖ = ${fix(BUB.commZO, 3)} ≠ 0；从 |+x⟩ 出发，两种次序的未读结果落在品红的两个环上。平行与垂直时对易子为零。`, `A 45° axis: ‖[K_Z, K_O]‖ = ${fix(BUB.commZO, 3)} ≠ 0; from |+x⟩ the two unread orders land on the two magenta rings. Parallel or perpendicular axes give zero.`)
        : L('两个气泡各有自己的指针轴，合起来的张量 λ = (½, ½, 0) 却没有唯一的主轴（青色虚线圆）。右下角的集合修订是另一件事：经典的冲突即重置。', 'Each bubble has its own pointer axis, but their joint tensor λ = (½, ½, 0) has no unique top axis (the cyan dashed circle). The set revision at the bottom right is a separate matter: classical reset on conflict.');
      $('hudBig').textContent = L(`两个气泡 · v = ${fix(clock.t, 2)}`, `TWO BUBBLES · v = ${fix(clock.t, 2)}`);
      $('hudSub').textContent = L(`未读对易 · 选读终点差 ¼ · F_LF = ${fix(LFs.score, 3)} ${LFs.score > 6 ? '> 6' : '≤ 6'}`, `unread commute · selected ends ¼ apart · F_LF = ${fix(LFs.score, 3)} ${LFs.score > 6 ? '> 6' : '≤ 6'}`);
      html = leg([['vi', 'Z、X 气泡的轴', 'axes of the Z and X bubbles'], ['cy', '未读 → I/2；虚线：合起来的张量', 'unread → I/2; dashed: joint tensor'], ['ink', '选读的两种次序', 'the two selected orders'], ['mg', '选读终点的差、越界', 'selected mismatch, violation'], ['am', '现在的可见度 v', 'current visibility v']]);
    } else {
      const Pn = snap.Pn, deg = Pn.beta * 180 / Math.PI;
      $('roAside').textContent = `η ${fix(Pn.eta, 2)} · β ${fix(deg, 1)}°`;
      $('roKeyL').textContent = L('逃出旧平面的残差 ‖(I − P_S)n‖ = sin β', 'Residual out of the old plane ‖(I − P_S)n‖ = sin β');
      $('roKey').textContent = fix(Pn.residual, 4);
      $('roKeySub').textContent = L(` · 秩 2 → ${Pn.rank}`, ` · rank 2 → ${Pn.rank}`);
      setRo(1, 'M_η 的谱', 'Spectrum of M_η', v3s(Pn.eigenvalues, 4));
      setRo(2, '迹：P_S · M₀', 'Trace: P_S · M₀', '2 · 1');
      setRo(3, 'det M_η = (1 − η)²·0.7·0.3·η·sin²β', 'det M_η = (1 − η)²·0.7·0.3·η·sin²β', `${fix(Pn.det, 9)} = ${fix(Pn.detFormula, 9)}`);
      setRo(4, '秩（阈值 10⁻⁸）', 'Rank (threshold 10⁻⁸)', `${Pn.rank}`);
      setRo(5, '旧 z 模在 t = 1 剩下', 'Old z mode left at t = 1', fix(Pn.oldZDampingAt1, 4));
      $('roNote').textContent = L('品红的残差在旧平面之外，到平面的距离可以到 1；但在旧的生成元 I − M₀ 下，平面外的 z 分量按 e^(−t) 衰减，是最快的一个：它并不受保护。', 'The magenta residual lies outside the old plane, up to distance 1 from it; but under the old generator I − M₀ the z component outside the plane decays as e^(−t), the fastest of all: it is not protected.');
      $('hudBig').textContent = L(`先驱新轴 · β = ${fix(deg, 1)}°`, `PIONEER AXIS · β = ${fix(deg, 1)}°`);
      $('hudSub').textContent = L(`残差 sin β = ${fix(Pn.residual, 3)} · 秩 2 → ${Pn.rank} · λ₃ = ${fix(Pn.eigenvalues[2], 4)}`, `residual sin β = ${fix(Pn.residual, 3)} · rank 2 → ${Pn.rank} · λ₃ = ${fix(Pn.eigenvalues[2], 4)}`);
      html = leg([['am', '先驱轴的端点（现在）', "pioneer's end (current)"], ['vi', '观察者的轴', "observers' axes"], ['cy box', '张量 M_η；虚线 M₀', 'tensor M_η; dashed M₀'], ['mg', '逃出平面的残差', 'residual out of the plane'], ['dash', '旧平面 S', 'old plane S']]);
    }
    if ($('legend')._h !== html) { $('legend').innerHTML = html; $('legend')._h = html; }
    $('pillScene').querySelector('strong').textContent = L(SCENE_NAME[S.scene][0], SCENE_NAME[S.scene][1]);
    $('pillNow').querySelector('strong').innerHTML = railText(clock.t).replace(/<small>.*<\/small>/, '').trim();
    $('pillKey').querySelector('strong').textContent = cards && cards.current ? CODE[cards.current] : L('自由', 'FREE');
  }

  function snapshot() {
    if (S.scene === 'tensor') return { T: tensorState() };
    if (S.scene === 'records') return { R: recordsState() };
    if (S.scene === 'pioneer') return { Pn: pioneerState() };
    return { B: BUB };
  }
  const paint = kit.painter(() => { const snap = snapshot(); last = snap; drawText(snap); drawStage(snap); drawPlots(snap); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- controls ---------- */
  const railText = (t) => {
    if (S.scene === 'tensor' && S.axisSet === 'gauge') return `${L('翻转', 'flipped')} ${Math.round(8 * t)} <small>/ 8 ${L('个轴端', 'axis ends')}</small>`;
    if (S.scene === 'tensor') return `k ${Math.round(N * t)} <small>/ ${N} ${L('次相遇', 'encounters')}</small>`;
    if (S.scene === 'records') return `m ${Math.round(N * t)} <small>/ ${N} ${L('份记录', 'records')}</small>`;
    if (S.scene === 'bubbles') return `v ${fix(t, 2)} <small>${L('可见度', 'visibility')}</small>`;
    return `β ${fix(90 * t, 1)}° <small>${L('先驱轴的倾角', "the pioneer's tilt")}</small>`;
  };
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, rate: 0.22, step: 1 / N,
    format: (t) => railText(t),
    onChange: () => paint()
  });
  const railStep = () => (S.scene === 'tensor' ? (S.axisSet === 'gauge' ? 1 / 8 : 1 / N) : S.scene === 'records' ? 1 / N : S.scene === 'bubbles' ? 0.05 : 1 / 18);
  let traceTween = null;
  function setScene(sc, t) {
    S.scene = sc; sceneChips.set(sc, true);
    document.querySelectorAll('.deck section[data-scenes], #evidence [data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    const flat = sc === 'records' || sc === 'bubbles';
    $('stage').classList.toggle('still', flat);
    if (!flat) stage.view(VIEWS[sc], TRV.still ? 0 : 450);
    clock.pause(); clock.step = railStep(); clock.rate = sc === 'bubbles' ? 0.25 : 0.22;
    if (traceTween && sc !== 'bubbles') { traceTween.cancel(); traceTween = null; S.trace = 1; }
    clock.set(t == null ? clock.t : t);
  }
  const leave = () => { cards.mark(null); };
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  function setAxisSet(v, quiet) {
    S.axisSet = v; setChips.set(v, true);
    const gauge = v === 'gauge';
    modeChips.disable(gauge);
    if (gauge && S.mode === 'ordered') setMode('mean', true);
    clock.step = railStep();
    if (!quiet) { leave(); clock.set(clock.t); }
  }
  function setMode(v, quiet) { if (S.axisSet === 'gauge' && v === 'ordered') v = 'mean'; S.mode = v; modeChips.set(v, true); if (!quiet) { leave(); paint(); } }
  function setAlpha(a, quiet) {
    S.alpha = clamp(a, 0, HALF_PI); fAlpha.set(S.alpha);
    $('pinchBtn').setAttribute('aria-pressed', String(S.alpha === HALF_PI));
    if (!quiet) { leave(); paint(); }
  }
  const setChips = kit.chips($('setChips'), 'axisset', (v) => setAxisSet(v));
  const modeChips = kit.chips($('modeChips'), 'mode', (v) => setMode(v));
  modeChips.disable = (on) => { const b = $('modeChips').querySelector('[data-mode="ordered"]'); b.disabled = on; b.title = on ? L('权重不相等时没有“每位观察者一次”的有限顺序', 'with unequal weights there is no finite schedule of one encounter per observer') : ''; };
  const fAlpha = kit.field($('alpha'), { fmt: (v) => (v === HALF_PI ? 'π/2' : fix(v, 3)), onInput: (v) => setAlpha(Math.abs(v - HALF_PI) < 1e-9 ? HALF_PI : v) });
  let alphaBefore = ALPHA0;
  $('pinchBtn').addEventListener('click', () => { if (S.alpha === HALF_PI) setAlpha(alphaBefore); else { alphaBefore = S.alpha; setAlpha(HALF_PI); } });
  const fP0 = kit.field($('p0'), { fmt: (v) => fix(v, 2), onInput: (v) => { S.p0 = v; leave(); paint(); } });
  const fOvl = kit.field($('ovl'), { fmt: (v) => fix(v, 2), onInput: (v) => { S.c = v; leave(); paint(); } });
  const fEta = kit.field($('eta'), { fmt: (v) => fix(v, 2), onInput: (v) => { S.eta = v; leave(); paint(); } });
  // the sixteen records: pressed = erased by its controlled U†
  const accessEl = $('access');
  for (let j = 0; j < N; j++) { const b = document.createElement('button'); b.type = 'button'; b.dataset.rec = String(j); b.textContent = String(j + 1); accessEl.appendChild(b); }
  function syncAccess() {
    accessEl.querySelectorAll('[data-rec]').forEach((b) => {
      const j = +b.dataset.rec; b.setAttribute('aria-pressed', String(S.access[j]));
      b.setAttribute('aria-label', L(`记录 ${j + 1}：${S.access[j] ? '已擦除' : '保留'}`, `record ${j + 1}: ${S.access[j] ? 'erased' : 'kept'}`));
    });
  }
  function toggleRecord(j) { S.access[j] = !S.access[j]; syncAccess(); leave(); paint(); }
  accessEl.addEventListener('click', (ev) => { const b = ev.target.closest('[data-rec]'); if (b) toggleRecord(+b.dataset.rec); });
  $('eraseAll').addEventListener('click', () => { S.access = Array(N).fill(true); syncAccess(); leave(); paint(); });
  $('keepAll').addEventListener('click', () => { S.access = Array(N).fill(false); syncAccess(); leave(); paint(); });
  TRV.onLang(syncAccess);
  $('obliqueBtn').addEventListener('click', () => { S.oblique = !S.oblique; $('obliqueBtn').setAttribute('aria-pressed', String(S.oblique)); leave(); paint(); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('tensor'); }, 2: () => { leave(); setScene('records'); }, 3: () => { leave(); setScene('bubbles'); }, 4: () => { leave(); setScene('pioneer'); } });

  /* ---------- experiment cards ---------- */
  const CARDS = {
    'isotropic-fog': { scene: 'tensor', axisSet: 'fog', mode: 'mean', alpha: ALPHA0, still: 1 },
    'axis-consensus': { scene: 'tensor', axisSet: 'consensus', mode: 'ordered', alpha: ALPHA0, still: 1 },
    'phase-gauge': { scene: 'tensor', axisSet: 'gauge', mode: 'mean', alpha: ALPHA0, still: 1 },
    'darwinism-plateau': { scene: 'records', p0: 0.5, c: 0.3, still: 0.5 },
    'dual-wigner-bubbles': { scene: 'bubbles', still: 1 },
    'new-axis-pioneers': { scene: 'pioneer', eta: 0.15, still: 0.5 }
  };
  const NOTES = {
    'isotropic-fog': ['六根轴 ±x、±y、±z 等权：λ = (⅓, ⅓, ⅓)，没有唯一指针轴。青色的球按均值信道 [(1 + 2cos 0.4)/3]ᵏ 整体缩小，k = 16 时为 0.421；灰色虚线是另算的弱极限，0.426。', 'Six equal axes ±x, ±y, ±z: λ = (⅓, ⅓, ⅓), no unique pointer axis. The cyan ball shrinks as a whole by the mean channel [(1 + 2cos 0.4)/3]ᵏ, 0.421 at k = 16; the grey dashed outline is the weak limit, computed apart: 0.426.'],
    'axis-consensus': ['十六根轴交替 +z、−z，是同一根无向的线：λ = (1, 0, 0)。琥珀色的态从 (1, 0, 1)/√2 出发，青色的纵向 0.707 一直不变，品红的横向每次乘 cos 0.4，k = 16 时剩 0.190。', 'Sixteen axes alternating +z, −z are one unoriented line: λ = (1, 0, 0). The amber state starts at (1, 0, 1)/√2; its cyan part along z stays at 0.707 while the magenta part across is multiplied by cos 0.4 each time, 0.190 at k = 16.'],
    'phase-gauge': ['八根无向轴（z 共 0.6、x 共 0.25、y 共 0.15），时间轴逐根翻转标签端：灰色虚线的带号和摆到零再反向，青色的椭球与 λ = (0.6, 0.25, 0.15) 纹丝不动。右下角另画 ket 的公共相位。', 'Eight unoriented axes (z 0.6 in all, x 0.25, y 0.15); the rail flips their labelled ends one by one. The grey dashed signed sum swings through zero and reverses; the cyan ellipsoid and λ = (0.6, 0.25, 0.15) do not move. The inset turns a ket by a common phase.'],
    'darwinism-plateau': ['十六份记录，每份重叠 c = 0.3，琥珀色括住前 m 份。白色的点列 I(S : O_m) 从 0 出发，m = 3…13 贴着青色的一比特平台，m = 16 升到 2S。点一份记录就用受控 U† 把它擦回空白。', 'Sixteen records of overlap c = 0.3; amber brackets the first m. The white points I(S : O_m) start at 0, hug the cyan one-bit plateau for m = 3…13 and reach 2S at m = 16. Tap a record to erase it with its U†.'],
    'dual-wigner-bubbles': ['Z 气泡与 X 气泡各 16 根轴、完全捏合：两种次序的未读更新都落到青色的球心 I/2；选读 (+, +) 的两条路径停在 |+x⟩ 与 |+z⟩，品红的弦标出差别。右边：局部友好分数随 v 越过 6。', 'Z and X bubbles, 16 axes each, full pinching: unread updates in either order land on the cyan centre I/2; the selected (+, +) paths end at |+x⟩ and |+z⟩, the magenta chord marks the gap. Right: the LF score crosses 6 as v grows.'],
    'new-axis-pioneers': ['旧平面 S = span(x, y)，M₀ = diag(0.7, 0.3, 0)。先驱轴以权重 0.15 加入：品红的残差 sin β 升出平面，青色的张量从扁平变成立体（秩 2 → 3）。右下角：旧的 z 模按 e^(−t) 衰减，并不受保护。', 'Old plane S = span(x, y), M₀ = diag(0.7, 0.3, 0). A pioneer axis joins with weight 0.15: the magenta residual sin β rises out of the plane and the cyan tensor goes from flat to solid (rank 2 → 3). Inset: the old z mode decays as e^(−t); it is not protected.']
  };
  let booting = true;
  function applyPreset(id) {
    const c = CARDS[id];
    if (traceTween) { traceTween.cancel(); traceTween = null; }
    S.trace = 1; S.r0 = R0.slice();
    if (c.scene === 'tensor') { setAxisSet(c.axisSet, true); setMode(c.mode, true); setAlpha(c.alpha, true); alphaBefore = ALPHA0; }
    else if (c.scene === 'records') { S.p0 = c.p0; S.c = c.c; S.access = Array(N).fill(false); fP0.set(c.p0); fOvl.set(c.c); syncAccess(); }
    else if (c.scene === 'bubbles') { S.oblique = false; $('obliqueBtn').setAttribute('aria-pressed', 'false'); }
    else { S.eta = c.eta; fEta.set(c.eta); }
    setScene(c.scene, 0);
    if (TRV.still || (booting && !TRV.embed)) { clock.set(c.still); paint(); return; }
    if (c.scene === 'bubbles') { S.trace = 0; traceTween = kit.tween(1600, (e) => { S.trace = e; paint(); }, () => { traceTween = null; }); }
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { presets: CARDS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景，换轴、信道与强度，拖琥珀色的起点，点记录把它擦掉，拖时间轴。随时可以再选一张卡。', 'Free play: switch scenes, change the axes, the channel and the strength, drag the amber start, tap records to erase them, scrub the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- read-only probe, cover, start ---------- */
  window.ORTHO_CONSENSUS_DEBUG = {
    get state() {
      const scene = S.scene, s = clock.t;
      const base = {
        preset: cards.current, scene, s, t: s, playing: clock.playing, railMeaning: { tensor: S.axisSet === 'gauge' ? 'flips f = round(8 s)' : 'encounters k = round(16 s)', records: 'fragment size m = round(16 s)', bubbles: 'visibility v = s', pioneer: 'tilt β = (π/2) s' }[scene],
        modelKind: { tensor: 'axis-channel', records: 'branching-qnd', bubbles: 'logical-lf', pioneer: 'linear-escape' }[scene],
        channelMode: null, N, k: null, m: null, alpha: null, axes: null, weights: null, M: null, lambdaDesc: null, kappa: null, gap: null, epsilon: EPS,
        pointerAxis: null, Ktotal: null, r0: null, r: null, modeDamping: null, p0: null, overlaps: null, prefixProducts: null, suffixProducts: null,
        entropiesBits: null, mutualInformationBits: null, accessMask: null, residualCoherence: null, LF: null, pioneer: null, bubbles: null, gauge: null
      };
      if (scene === 'tensor') {
        const T = tensorState();
        return Object.assign(base, {
          channelMode: S.mode, axisSet: S.axisSet, k: T.k, alpha: S.alpha, fullPinching: S.alpha === HALF_PI, axes: T.axes, weights: T.w, M: T.M, lambdaDesc: T.lam,
          kappa: T.kappa, gap: T.gap, isotropic: T.iso, pointerAxis: T.pointer, Ktotal: T.K, Kweak: T.Kweak, r0: S.r0.slice(), r: T.r, path: T.path,
          modeDamping: T.modeDamping, modeDampingWeakLimit: T.weakDamping, meanScale: T.meanScale, weakLimitScale: T.weakScale,
          split: T.sp ? { along: T.sp.par, across: T.sp.perpLen } : null, hs: T.hs, entropy: T.entropy, fixedPoint: T.fixedPoint, gauge: T.gaugeSnap,
          readout: $('roKey').textContent
        });
      }
      if (scene === 'records') {
        const R = recordsState();
        return Object.assign(base, {
          m: R.m, p0: S.p0, overlaps: R.cs, effectiveOverlaps: R.eff, prefixProducts: R.prefix, suffixProducts: R.suffix,
          entropiesBits: { system: R.SS, fragment: R.SF, joint: R.SC }, mutualInformationBits: R.I, accessMask: S.access.slice(),
          residualCoherence: R.residual, residualCoherenceSigned: R.coherence, uncontrolled: R.uncontrolled, plateauMaxDeviation: R.plateau,
          phaseCertificate: [[0.5, 0], [-0.5, 0], [0, -0.5], [0.5, 0]], readout: $('roKey').textContent
        });
      }
      if (scene === 'bubbles') {
        const LFs = lfAt(s);
        return Object.assign(base, {
          alpha: HALF_PI, M: BUB.M, lambdaDesc: BUB.lam, gap: BUB.gap, kappa: (3 * BUB.lam[0] - 1) / 2, pointerAxis: BUB.gap >= EPS ? canon(eigSym(BUB.M).vectors[0]) : null,
          LF: LFs, bubbles: Object.assign({}, BUB, { oblique: S.oblique, trace: S.trace }), readout: $('roKey').textContent
        });
      }
      const Pn = pioneerState();
      return Object.assign(base, { pioneer: Pn, lambdaDesc: Pn.eigenvalues, readout: $('roKey').textContent });
    },
    /** Pick a card as a reader does (it plays, as a click does). */
    pickPreset: (id) => { if (!CARDS[id]) throw new Error(`no card ${id}`); cards.pick(id); },
    /** Stop the clock and put the rail at s ∈ [0, 1]. */
    setRail: (s) => { clock.pause(); clock.set(clamp(+s, 0, 1)); kit.flush(); },
    /** Change controls as a reader would; the card is released unless keepCard. { axes, weights } installs a custom
        set of observers (validated and normalized like the presets) so that a suite can test the ε policy. */
    setOptions: (o) => {
      o = o || {};
      if (o.scene) setScene(o.scene);
      if (o.axes) { const pr = prepare(o.axes, o.weights || o.axes.map(() => 1)); AXSETS.custom = { axes: pr.axes, w: pr.w }; setAxisSet('custom', true); }
      if (o.axisSet) setAxisSet(o.axisSet, true);
      if (o.channelMode) setMode(o.channelMode, true);
      if (o.alpha != null) setAlpha(o.alpha, true);
      if (o.fullPinching != null) setAlpha(o.fullPinching ? HALF_PI : ALPHA0, true);
      if (o.r0) S.r0 = v3.unit(o.r0);
      if (o.p0 != null) { S.p0 = clamp(o.p0, 0, 1); fP0.set(S.p0); }
      if (o.overlap != null) { S.c = clamp(o.overlap, -1, 1); fOvl.set(S.c); }
      if (o.access) { S.access = Array.from({ length: N }, (_, j) => (Array.isArray(o.access) && typeof o.access[0] === 'boolean' ? !!o.access[j] : o.access.includes(j))); syncAccess(); }
      if (o.oblique != null) { S.oblique = !!o.oblique; $('obliqueBtn').setAttribute('aria-pressed', String(S.oblique)); }
      if (o.eta != null) { S.eta = clamp(o.eta, 0, 1); fEta.set(S.eta); }
      if (o.trace != null) S.trace = clamp(o.trace, 0, 1);
      if (!o.keepCard) leave();
      kit.flush();
    },
    /** Viewport point of record j on the records stage, or of a Bloch point on a 3D stage (for pointer tests). */
    recordPoint: (j) => { const b = $('cv').getBoundingClientRect(), p = recLayout && recLayout.pos[j]; return p ? [b.left + p[0], b.top + p[1]] : null; },
    worldPoint: (v) => { const b = $('cv').getBoundingClientRect(), q = stage.p(v); return [b.left + q[0], b.top + q[1]]; },
    lfAt, pioneerAt: (s) => pioneerState(s)
  };
  window.TRV_THUMB = () => {
    setAxisSet('consensus', true); setMode('ordered', true); setAlpha(ALPHA0, true); S.r0 = R0.slice();
    setScene('tensor', 0.5); stage.view(VIEWS.tensor, 0); paint.now();
  };
  syncAccess();
  cards.pick(cards.initial('isotropic-fog'));
  booting = false;
  paint();
})();
