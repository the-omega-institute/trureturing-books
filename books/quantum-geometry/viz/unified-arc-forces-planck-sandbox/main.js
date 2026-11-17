/* FORCE//UNIFY · 万力归弧 · All forces in one arc
   One minimal arc-trihedron ΔT_ε (ε = 45°: N, A = R_y(ε)N, B = R_x(−ε)N seen from the centre O) carries five scenes:
     u1      the U(1) phase e^{îqφ} turning in the blind plane î above the cell; +q and −q multiply to 1, and the Gauss
             flux of the pair is 0 (computed by quadrature)
     su2     the SU(2) double cover on the wall A∧B: U(θ) = cos(θ/2) − i sin(θ/2) n·σ, −I at 360°, +I at 720°; the
             Yukawa factor e^{−m_W r} at the probe distance r = ħc/E inside the Proca shell λ_W = ħc/m_W
     su3     the colour triad turned by U ∈ SO(3) ⊂ SU(3) (det U = 1, the volume it spans stays 1); a lone quark edge
             pulled to r fm along a flux tube V(r) = σr, threaded with arc cells of aperture ε(E) (a model of
             asymptotic freedom: Ω(ε(E)) ∝ 1/ln(E/Λ))
     regge   N = 6: four regular tetrahedra round one hinge leave the deficit δ_h = 2π − 4 arccos(1/3); a model clock
             load η(r) bends a slow packet by a = −c²∇ln(dτ/dt) (RK4); the Born loads of ±q add
     planck  the energy ladder log₁₀(E/GeV) ∈ [−3, log₁₀ E_P]: α_G = (E/E_P)² rises to 1, the screening cloud of the
             model peels back to one cell and the hinge wedge δ_h(E) = δ_h(6)·α_G(E) opens; the strip below plots the
             one-loop Standard Model couplings α_i⁻¹(E) = α_i⁻¹(M_Z) − (b_i/2π) ln(E/M_Z) against α_G(E)
   A two-segment lens re-reads the same state as the 1D arc, 2D wall, 3D body and inter-cell hinge of one cell.
   Drawn with kit.solid (three.js, fetched by kit.js). Read-only probe: window.FORCE_UNIFY_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180, O = [0, 0, 0], EX = [1, 0, 0], EY = [0, 1, 0], EZ = [0, 0, 1];
  const SUP = { '−': '⁻', '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  /** x as m × 10ⁿ with d decimals in the mantissa. */
  const tiny = (x) => (Math.abs(x) < 1e-15 ? '&lt; 10⁻¹⁵' : null);
  const sci = (x, d = 2) => { if (!(x > 0)) return fix(x, d); const n = Math.floor(Math.log10(x) + 1e-12), m = x / 10 ** n; return `${fix(m, d)} × 10${String(n).split('').map((c) => SUP[c] || c).join('')}`; };

  /* ---------- physical inputs (literature values, ARGUED on the page) ---------- */
  const MZ = 91.1876, AINV_MZ = [59.01, 29.59, 8.46], BCOEF = [41 / 10, -19 / 6, -7];
  const EP = 1.220890e19, LOG_EP = Math.log10(EP), LOG_MIN = -3, LOG_SPAN = LOG_EP - LOG_MIN, LOG_MZ = Math.log10(MZ);
  const ME = 0.51099895e-3, ALPHA0 = 1 / 137.035999084, HBARC = 0.1973269804, MW = 80.377, SIGMA = 0.18, LAMBDA = 0.2;
  const EPS0 = 45 * DEG;

  /* ---------- running couplings ---------- */
  const ainvAt = (i, logE) => AINV_MZ[i] - BCOEF[i] / TAU * Math.log(10 ** logE / MZ);
  /** The three one-loop α_i⁻¹ at log₁₀(E/GeV), or null below M_Z, where the page does not run them. */
  const gaugeInv = (logE) => (logE < LOG_MZ - 1e-12 ? null : [0, 1, 2].map((i) => ainvAt(i, logE)));
  const alphaG = (logE) => 10 ** (2 * (logE - LOG_EP));
  /** Pairwise crossings α_i⁻¹ = α_j⁻¹ (closed form in ln(E/M_Z)). */
  const CROSS = [[0, 1], [1, 2], [0, 2]].map(([i, j]) => {
    const t = (AINV_MZ[i] - AINV_MZ[j]) / ((BCOEF[i] - BCOEF[j]) / TAU);
    return { i, j, logE: LOG_MZ + t / Math.LN10, ainv: AINV_MZ[i] - BCOEF[i] / TAU * t };
  });
  /** Where the three come closest: the minimum over log E of max α_i⁻¹ − min α_i⁻¹ (scan, then golden section). */
  const SPREAD = (() => {
    const f = (x) => { const a = gaugeInv(x); return Math.max(...a) - Math.min(...a); };
    let best = LOG_MZ, bv = Infinity;
    for (let x = LOG_MZ; x <= LOG_EP; x += 0.01) { const v = f(x); if (v < bv) { bv = v; best = x; } }
    let a = best - 0.02, b = best + 0.02;
    const g = (Math.sqrt(5) - 1) / 2;
    for (let k = 0; k < 80; k++) { const c = b - g * (b - a), d = a + g * (b - a); if (f(c) < f(d)) b = d; else a = c; }
    const x = (a + b) / 2, inv = gaugeInv(x), al = inv.map((v) => 1 / v);
    return { logE: x, dInv: f(x), dAlpha: Math.max(...al) - Math.min(...al), inv };
  })();
  /** Where α_G(E) = α_i(E), by bisection. */
  const GCROSS = [0, 1, 2].map((i) => {
    let lo = LOG_MZ, hi = LOG_EP;
    for (let k = 0; k < 200; k++) { const m = (lo + hi) / 2; if (alphaG(m) < 1 / ainvAt(i, m)) lo = m; else hi = m; }
    return (lo + hi) / 2;
  });
  const ALPHA_G_ME = alphaG(Math.log10(ME));

  /* ---------- the minimal arc-trihedron ---------- */
  const det3 = (M) => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
  const tangent = (p, q) => v3.unit(v3.sub(q, v3.scale(p, v3.dot(p, q))));
  const angleAt = (p, a, b) => Math.acos(clamp(v3.dot(tangent(p, a), tangent(p, b)), -1, 1));
  const omegaOf = (e) => 2 * Math.atan(Math.tan(e / 2) ** 2);
  const cellCache = new Map();
  /** Vertex directions of ΔT_ε, turned so that their mean points up (z). */
  function cellModel(eps) {
    const key = eps.toFixed(12);
    if (cellCache.has(key)) return cellCache.get(key);
    const N0 = EZ, A0 = v3.rot(N0, EY, eps), B0 = v3.rot(N0, EX, -eps), m = v3.unit(v3.add(v3.add(N0, A0), B0));
    const ax = v3.cross(m, EZ), s = v3.len(ax), ang = Math.atan2(s, v3.dot(m, EZ));
    const R = (v) => (s < 1e-12 ? v.slice() : v3.rot(v, v3.scale(ax, 1 / s), ang));
    const N = R(N0), A = R(A0), B = R(B0);
    const gram = [N0, A0, B0].map((u) => [N0, A0, B0].map((w) => v3.dot(u, w)));
    const r = { eps, N, A, B, raw: [N0, A0, B0], omega: omegaOf(eps), omegaAngles: eps < 1e-9 ? 0 : angleAt(N, A, B) + angleAt(A, B, N) + angleAt(B, N, A) - PI,
      detG: det3(gram), detGClosed: Math.sin(eps) ** 4, gram, normalAB: v3.unit(v3.cross(A, B)) };
    cellCache.set(key, r);
    if (cellCache.size > 300) cellCache.delete(cellCache.keys().next().value);
    return r;
  }
  const CELL = cellModel(EPS0);
  /** One closed cell as a face system: corners O, N, A, B; faces cap NAB and walls ONA, ONB, OAB. */
  const FACE_CYCLE = (() => {
    const V = ['O', 'N', 'A', 'B'], F = [['N', 'A', 'B'], ['O', 'N', 'A'], ['O', 'N', 'B'], ['O', 'A', 'B']];
    const E = [];
    for (let i = 0; i < V.length; i++) for (let j = i + 1; j < V.length; j++) E.push([V[i], V[j]]);
    const onFace = (e, f) => f.includes(e[0]) && f.includes(e[1]);
    const sides = E.map((e) => F.map((f, k) => (onFace(e, f) ? k : -1)).filter((k) => k >= 0));
    let zero = 0, constZero = true;
    for (let x = 0; x < 16; x++) {
      const lab = [0, 1, 2, 3].map((k) => (x >> k) & 1), bd = sides.map((s) => (lab[s[0]] + lab[s[1]]) % 2);
      const isZero = bd.every((b) => b === 0), isConst = lab.every((b) => b === lab[0]);
      if (isZero) zero++;
      if (isZero !== isConst) constZero = false;
    }
    // rank over GF(2) of the four face boundaries (6-bit vectors): the cycle space has dimension E − V + 1
    const rows = F.map((f) => E.reduce((m, e, k) => m | (onFace(e, f) ? 1 << k : 0), 0));
    let rank = 0; const basis = [];
    for (let r of rows) { for (const b of basis) r = Math.min(r, r ^ b); if (r) { basis.push(r); rank++; } }
    return { V: V.length, E: E.length, F: F.length, euler: V.length - E.length + F.length, everyEdgeTwoFaces: sides.every((s) => s.length === 2), zeroLabels: zero, zeroIffConstant: constZero, rank, cycleDim: E.length - V.length + 1 };
  })();

  /* ---------- U(1): the phase fiber and the neutral pair ---------- */
  const rot2 = (a) => [[Math.cos(a), -Math.sin(a)], [Math.sin(a), Math.cos(a)]];
  const mul2 = (P, Q) => [[P[0][0] * Q[0][0] + P[0][1] * Q[1][0], P[0][0] * Q[0][1] + P[0][1] * Q[1][1]], [P[1][0] * Q[0][0] + P[1][1] * Q[1][0], P[1][0] * Q[0][1] + P[1][1] * Q[1][1]]];
  /** Gauss flux (∮E·dA / 4π, unit charges) of +q at +d x̂ and −q at −d x̂ through the sphere of radius 2 (midpoint rule). */
  const FLUX = (() => {
    const d = 0.6, R = 2, nt = 120, np = 240, out = { plus: 0, minus: 0 };
    for (let i = 0; i < nt; i++) {
      const th = PI * (i + 0.5) / nt, dA = R * R * Math.sin(th) * (PI / nt) * (TAU / np);
      for (let j = 0; j < np; j++) {
        const ph = TAU * (j + 0.5) / np, n = [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)], x = v3.scale(n, R);
        for (const [k, q, c] of [['plus', 1, [d, 0, 0]], ['minus', -1, [-d, 0, 0]]]) {
          const r = v3.sub(x, c), r3 = v3.len(r) ** 3;
          out[k] += q * v3.dot(r, n) / r3 * dA / (4 * PI);
        }
      }
    }
    out.total = out.plus + out.minus;
    return out;
  })();
  function u1Model(t) {
    const q = 1, phi = TAU * t, plus = [Math.cos(q * phi), Math.sin(q * phi)], minus = [Math.cos(-q * phi), Math.sin(-q * phi)];
    const product = [plus[0] * minus[0] - plus[1] * minus[1], plus[0] * minus[1] + plus[1] * minus[0]];
    const U1 = rot2(q * phi), U2 = rot2(0.7), C1 = mul2(U1, U2), C2 = mul2(U2, U1);
    const commutator = Math.max(...[0, 1].flatMap((i) => [0, 1].map((j) => Math.abs(C1[i][j] - C2[i][j]))));
    return { q, phi, plus, minus, product, productResidual: Math.hypot(product[0] - 1, product[1]), commutator, flux: FLUX, alpha0: ALPHA0 };
  }

  /* ---------- SU(2): the double cover and Yukawa screening ---------- */
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  /** U(θ) = cos(θ/2) I − i sin(θ/2) n·σ as [[a, b], [c, d]] with complex entries. */
  function suTwo(n, th) {
    const c = Math.cos(th / 2), s = Math.sin(th / 2);
    return [[[c, -s * n[2]], [-s * n[1], -s * n[0]]], [[s * n[1], -s * n[0]], [c, s * n[2]]]];
  }
  const offIdentity = (U, sgn) => Math.max(...[0, 1].flatMap((i) => [0, 1].map((j) => Math.hypot(U[i][j][0] - (i === j ? sgn : 0), U[i][j][1]))));
  function su2Model(t, logE) {
    const th = 2 * TAU * t, n = CELL.normalAB, U = suTwo(n, th);
    const lift = [Math.cos(th / 2), Math.sin(th / 2)], base = [Math.cos(th), Math.sin(th)], sq = cmul(lift, lift);
    const E = 10 ** logE, rE = HBARC / E, lamW = HBARC / MW, inv = gaugeInv(logE);
    return { theta: th, axis: n, reU: U[0][0][0], U, lift, liftSquaredResidual: Math.hypot(sq[0] - base[0], sq[1] - base[1]),
      liftAt2pi: [Math.cos(PI), Math.sin(PI)], U2pi: offIdentity(suTwo(n, TAU), -1), U4pi: offIdentity(suTwo(n, 2 * TAU), 1),
      E, rE, lamW, ratio: rE / lamW, yukawa: Math.exp(-rE / lamW), alpha2: inv ? 1 / inv[1] : null, polarizations: 2 + 1, bosons: 3, eaten: 3 };
  }

  /* ---------- SU(3): colour lock, the flux tube and the aperture ε(E) ---------- */
  const KAX = v3.unit([1, 1, 1]);
  /** The real turn about (1, 1, 1)/√3 by θ: an element of SO(3) ⊂ SU(3) (Rodrigues, as a matrix). */
  const colourTurn = (th) => [EX, EY, EZ].map((e) => v3.rot(e, KAX, th)).reduce((M, col, j) => { for (let i = 0; i < 3; i++) M[i][j] = col[i]; return M; }, [[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  const matmul3 = (P, Q) => P.map((row) => [0, 1, 2].map((j) => row[0] * Q[0][j] + row[1] * Q[1][j] + row[2] * Q[2][j]));
  const Rz = (a) => [[Math.cos(a), -Math.sin(a), 0], [Math.sin(a), Math.cos(a), 0], [0, 0, 1]];
  const Rx = (a) => [[1, 0, 0], [0, Math.cos(a), -Math.sin(a)], [0, Math.sin(a), Math.cos(a)]];
  /** The complex determinant of a 3 × 3 matrix with entries [re, im]. */
  const cdet3 = (M) => {
    const m = (a, b) => cmul(a, b), s = (a, b) => [a[0] - b[0], a[1] - b[1]], ad = (a, b) => [a[0] + b[0], a[1] + b[1]];
    const t0 = m(M[0][0], s(m(M[1][1], M[2][2]), m(M[1][2], M[2][1]))), t1 = m(M[0][1], s(m(M[1][0], M[2][2]), m(M[1][2], M[2][0]))), t2 = m(M[0][2], s(m(M[1][0], M[2][1]), m(M[1][1], M[2][0])));
    return ad(s(t0, t1), t2);
  };
  /** The model aperture: Ω(ε(E)) = Ω(45°)·ln(1 GeV/Λ)/ln(E/Λ) above 1 GeV, ε = 45° below. */
  function apertureAt(logE) {
    const E = 10 ** logE, om = E <= 1 ? omegaOf(EPS0) : omegaOf(EPS0) * Math.log(1 / LAMBDA) / Math.log(E / LAMBDA);
    return { omega: om, eps: E <= 1 ? EPS0 : 2 * Math.atan(Math.sqrt(Math.tan(om / 2))) };
  }
  const cellsFor = (r) => Math.max(1, Math.round(r / 0.2));
  function su3Model(t, logE, r) {
    const th = TAU * t, U = colourTurn(th), detU = det3(U);
    const UtU = matmul3(U[0].map((_, j) => U.map((row) => row[j])), U);
    const orth = Math.max(...[0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => Math.abs(UtU[i][j] - (i === j ? 1 : 0)))));
    const frame = [0, 1, 2].map((j) => [U[0][j], U[1][j], U[2][j]]);
    const volume = Math.abs(v3.dot(frame[0], v3.cross(frame[1], frame[2])));
    // a complex element of SU(3): diag(e^{iα}, e^{iβ}, e^{−i(α+β)}) · U
    const al = 0.7, be = -1.1, ph = [al, be, -(al + be)];
    const V = U.map((row, i) => row.map((x) => [x * Math.cos(ph[i]), x * Math.sin(ph[i])]));
    const detV = cdet3(V);
    // the two-axis word U = R_B(α) R_R(β) R_B(γ) with e_R = x̂, e_B = ẑ (ZXZ angles)
    const b = Math.acos(clamp(U[2][2], -1, 1));
    let a, g;
    if (Math.abs(Math.sin(b)) > 1e-9) { a = Math.atan2(U[0][2], -U[1][2]); g = Math.atan2(U[2][0], U[2][1]); } else { a = Math.atan2(U[1][0], U[0][0]); g = 0; }
    const W = matmul3(matmul3(Rz(a), Rx(b)), Rz(g));
    const wordResidual = Math.max(...[0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => Math.abs(W[i][j] - U[i][j]))));
    const ap = apertureAt(logE), sigmaFm = SIGMA / HBARC;
    return { thetaC: th, U, detU, orthResidual: orth, frame, volume, detV, word: { alpha: a, beta: b, gamma: g, residual: wordResidual },
      eps: ap.eps, omega: ap.omega, r, sigmaGeVfm: sigmaFm, V: sigmaFm * r, cells: cellsFor(r) };
  }

  /* ---------- Regge: N = 6 hinge, clock-load refraction and Born loads ---------- */
  const DIHEDRAL = Math.acos(1 / 3), DELTA6 = TAU - 4 * DIHEDRAL;
  const dE = (N) => N * (N - 1) / 2 - (3 * N - 6);
  const LOAD = { eta0: 0.3, r0: 0.6, v: 0.35, b: 1.55, x0: -3.4 };
  const etaAt = (r) => LOAD.eta0 * LOAD.r0 / Math.max(r, LOAD.r0);
  /** a = −c²∇ln(dτ/dt), dτ/dt = √(1 − η), c = 1: for r ≥ r₀, a = −½ η₀r₀ r̂ / (r²(1 − η)); inside r₀ η is flat. */
  const accel = (x, y) => { const r = Math.hypot(x, y); if (r < LOAD.r0) return [0, 0]; const k = -0.5 * LOAD.eta0 * LOAD.r0 / (r * r * (1 - etaAt(r))) / r; return [k * x, k * y]; };
  const PATH = (() => {
    let s = [LOAD.x0, LOAD.b, LOAD.v, 0];
    const f = (q) => { const a = accel(q[0], q[1]); return [q[2], q[3], a[0], a[1]]; };
    const pts = [[s[0], s[1]]], dt = 0.01;
    let rMin = Infinity, k = 0;
    while (s[0] < -LOAD.x0 && k < 20000) {
      const k1 = f(s), k2 = f(s.map((v, i) => v + dt / 2 * k1[i])), k3 = f(s.map((v, i) => v + dt / 2 * k2[i])), k4 = f(s.map((v, i) => v + dt * k3[i]));
      s = s.map((v, i) => v + dt / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
      rMin = Math.min(rMin, Math.hypot(s[0], s[1]));
      if (++k % 8 === 0) pts.push([s[0], s[1]]);
      if (Math.hypot(s[0], s[1]) > 9) break;
    }
    pts.push([s[0], s[1]]);
    const len = [0];
    for (let i = 1; i < pts.length; i++) len.push(len[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    return { pts, len, total: len[len.length - 1], deflection: -Math.atan2(s[3], s[2]), rMin, dtdtMin: Math.sqrt(1 - etaAt(rMin)), steps: k, dt, final: s };
  })();
  /** The point at fraction s of the path's length (local 2D). */
  const pathAt = (s) => {
    const L0 = clamp(s, 0, 1) * PATH.total, i = Math.max(1, PATH.len.findIndex((l) => l >= L0));
    const a = PATH.pts[i - 1], b = PATH.pts[i], w = (L0 - PATH.len[i - 1]) / Math.max(1e-12, PATH.len[i] - PATH.len[i - 1]);
    return [a[0] + (b[0] - a[0]) * w, a[1] + (b[1] - a[1]) * w];
  };
  function bornLoads(theta, chi) {
    // φ = (1, 0); ψ± = (cos θ, e^{±iχ} sin θ); weight |φ*ψ|² and Tr(ρP), ρ = ψψ*, P = φφ*
    const res = [1, -1].map((sg) => {
      const psi = [[Math.cos(theta), 0], [Math.cos(sg * chi) * Math.sin(theta), Math.sin(sg * chi) * Math.sin(theta)]];
      const overlap = psi[0], weight = overlap[0] ** 2 + overlap[1] ** 2;
      const rho00 = cmul(psi[0], [psi[0][0], -psi[0][1]]);   // Tr(ρP) = ρ₀₀ for P = |0⟩⟨0|
      return { weight, trace: rho00[0], traceIm: rho00[1], phase: sg * chi };
    });
    return { plus: res[0], minus: res[1], sum: res[0].weight + res[1].weight, phaseSum: res[0].phase + res[1].phase };
  }
  function reggeModel(t) {
    return { dihedral: DIHEDRAL, deltaH: DELTA6, angleSum: 4 * DIHEDRAL, dE: [3, 4, 5, 6, 7].map((N) => ({ N, bars: N * (N - 1) / 2, need: 3 * N - 6, dE: dE(N) })),
      born: bornLoads(EPS0, 0.9), packet: t, deflection: PATH.deflection, rMin: PATH.rMin, dtdtMin: PATH.dtdtMin, load: LOAD };
  }

  /* ---------- Planck ---------- */
  const CLOUD_MAX = 18;
  const cloudCount = (logE) => Math.round(CLOUD_MAX * clamp((LOG_EP - logE) / LOG_SPAN, 0, 1));
  function planckModel(logE) {
    const inv = gaugeInv(logE);
    return { logE, E: 10 ** logE, alphaG: alphaG(logE), gaugeInv: inv, gauge: inv ? inv.map((v) => 1 / v) : null, deltaH: DELTA6 * alphaG(logE), cloud: cloudCount(logE),
      crossings: CROSS, spread: SPREAD, gravityCrossings: GCROSS, alphaGme: ALPHA_G_ME, ratioMe: ALPHA0 / ALPHA_G_ME };
  }

  /* ---------- state ---------- */
  const SCENES = ['u1', 'su2', 'su3', 'regge', 'planck'];
  const RATE = { u1: 0.12, su2: 0.06, su3: 0.08, regge: 0.1, planck: 0.07 };
  const S = { scene: 'planck', t: 1, logE: LOG_EP, r: 1.2, lens: false, lensMix: 0, camFit: [-0.62, 0.38] };
  const logFromT = (t) => (t >= 1 ? LOG_EP : LOG_MIN + LOG_SPAN * t);
  const tFromLog = (l) => (l >= LOG_EP ? 1 : clamp((l - LOG_MIN) / LOG_SPAN, 0, 1));
  function model() {
    return { cell: CELL, u1: u1Model(S.t), su2: su2Model(S.t, S.logE), su3: su3Model(S.t, S.logE, S.r), regge: reggeModel(S.t), planck: planckModel(S.logE) };
  }

  /* ---------- the stage ---------- */
  const stageEl = $('stage');
  if (TRV.still) stageEl.classList.add('still');
  const options = { canvas: $('cv'), yaw: S.camFit[0], pitch: S.camFit[1], wheel: false, radius: 0.34, cx: 0.5, cy: 0.5, onChange: () => paint() };
  const sc = kit.solid(stageEl, options);
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; probe.style.position = 'absolute'; tagBox.appendChild(probe);

  function boxOf(el, sr) {
    if (!el || el.hidden || !el.getClientRects().length) return null;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return null;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return null;
    return { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
  }
  function hudBoxes() {
    const sr = stageEl.getBoundingClientRect(), out = [];
    for (const el of [$('hudTl'), $('sceneChips'), $('legend')]) { const b = boxOf(el, sr); if (b && el.textContent.trim()) out.push(b); }
    return out;
  }
  /* labels: placed after drawing, by priority, clear of each other, the HUD and the handle */
  const sizes = new Map();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizes.clear(); paint(); });
  TRV.onLang(() => sizes.clear());
  function sizeOf(html, cls) {
    const k = `${TRV.lang()}|${cls}|${html}|${stageEl.clientWidth < 620}`;
    let s = sizes.get(k);
    if (!s) { probe.className = 'tag ' + cls; probe.innerHTML = html; probe.hidden = false; s = [probe.offsetWidth, probe.offsetHeight]; probe.hidden = true; if (s[0] > 0) sizes.set(k, s); }
    return s;
  }
  let LB = [], OBST = [], BOUNDS = null, PLACED = [];
  const want = (key, p, html, cls, o = {}) => LB.push({ key, p, html, cls, pri: o.pri || 0, r: o.r == null ? 10 : o.r, dir: o.dir || null });
  const meets = (a, b, m) => a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m;
  function placeLabels(center) {
    const placed = [], cq = sc.p(center), ctx = leadCtx();
    LB.sort((a, b) => b.pri - a.pri);
    for (const l of LB) {
      if (sc.occluded(l.p, 0.03)) continue;          // a mark the solid hides gets no label
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      const q = sc.p(l.p), d = l.dir || [q[0] - cq[0], q[1] - cq[1]], base = Math.atan2(d[1], d[0]) || -PI / 2, cands = [];
      for (const r of [l.r, l.r + 12, l.r + 28, l.r + 48]) for (const da of [0, 0.45, -0.45, 0.9, -0.9, 1.4, -1.4, 2.0, -2.0, 2.6, -2.6, PI]) {
        const ux = Math.cos(base + da), uy = Math.sin(base + da), ext = Math.abs(ux) * w / 2 + Math.abs(uy) * h / 2;
        cands.push([ux * (r + ext), uy * (r + ext)]);
      }
      let ok = null;
      for (const [dx, dy] of cands) {
        const b = { x: q[0] + dx - w / 2, y: q[1] + dy - h / 2, w, h };
        if (b.x < BOUNDS.x || b.y < BOUNDS.y || b.x + w > BOUNDS.x + BOUNDS.w || b.y + h > BOUNDS.y + BOUNDS.h) continue;
        if (placed.some((p) => meets(p, b, 3)) || OBST.some((p) => meets(p, b, 3))) continue;
        ok = b; break;
      }
      if (!ok) continue;
      placed.push(ok);
      sc.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
      // a faint leader back to the anchor when the label sits away from it
      const cx0 = ok.x + w / 2, cy0 = ok.y + h / 2, dx = q[0] - cx0, dy = q[1] - cy0;
      if (ctx && Math.hypot(dx, dy) > 22) {
        const f = Math.min((w / 2 + 2) / Math.max(0.001, Math.abs(dx)), (h / 2 + 2) / Math.max(0.001, Math.abs(dy)));
        ctx.beginPath(); ctx.moveTo(cx0 + dx * f, cy0 + dy * f); ctx.lineTo(q[0], q[1]); ctx.stroke();
      }
    }
    PLACED = placed;
  }
  function leadCtx() {
    if (TRV.thumbMode) return null;
    const ov = sc.overlay(), dpr = TRV.fitCanvas(ov), c = ov.getContext('2d');
    c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, sc.W, sc.H);
    c.strokeStyle = TRV.palette.dim; c.globalAlpha = 0.6; c.lineWidth = 0.8;
    return c;
  }

  /* ---------- drawing ---------- */
  const P = () => TRV.palette;
  const RC = 1.5, BASE = [0, 0, -0.55 * RC];
  const fade = () => 1 - 0.6 * S.lensMix;
  const arcPts = (a, b, n = 24) => Array.from({ length: n + 1 }, (_, i) => v3.slerp(a, b, i / n));
  const circlePts = (c, r, n = 72, z = 0) => Array.from({ length: n + 1 }, (_, i) => v3.add(c, [r * Math.cos(TAU * i / n), r * Math.sin(TAU * i / n), z]));

  /** The arc-trihedron at `base`, radius rc, aperture eps. o: key, walls (colors), cap (colors), wallAB (colors), edge colour. */
  function drawCell(o) {
    const p = P(), c = o.eps == null || o.eps === EPS0 ? CELL : cellModel(o.eps), b = o.base || BASE, rc = o.rc || RC;
    const at = (d, r = 1) => v3.add(b, v3.scale(d, rc * r));
    const k = o.key || 'cell';
    sc.surface(`${k}-cap`, (u, v) => at(v3.unit(v3.add(v3.scale(c.N, 1 - u), v3.scale(v3.add(v3.scale(c.A, 1 - v), v3.scale(c.B, v)), u)))),
      { u: [0, 1], v: [0, 1], nu: 14, nv: 14, colors: o.cap || [p.lineHot, p.sigma], value: (u) => u, range: [0, 1.4], grid: { every: [7, 7], color: p.ink, alpha: 0.18 } });
    for (const [nm, X, Y, cols] of [['na', c.N, c.A, o.walls], ['nb', c.N, c.B, o.walls], ['ab', c.A, c.B, o.wallAB || o.walls]]) {
      sc.surface(`${k}-w${nm}`, (u, v) => at(v3.slerp(X, Y, u), v), { u: [0, 1], v: [0, 1], nu: 12, nv: 6,
        colors: cols || [p.panelEdge, p.lineHot, p.sigma], value: (u, v) => v, range: [0, 1.25], grid: { every: [4, 2], color: p.ink, alpha: 0.12 } });
    }
    const ew = o.edgeWidth || 3.2, ec = o.edge || p.violet;
    for (const [nm, d] of [['n', c.N], ['a', c.A], ['b', c.B]]) sc.tube(`${k}-e${nm}`, [at(d, 0), at(d, 1.004)], { color: ec, width: ew, glow: 0.3, occlude: false });
    for (const [nm, X, Y] of [['na', c.N, c.A], ['nb', c.N, c.B], ['ab', c.A, c.B]]) sc.tube(`${k}-a${nm}`, arcPts(X, Y, 20).map((d) => at(d, 1.006)), { color: ec, width: ew, glow: 0.3, occlude: false });
    return { at, c };
  }
  /** The unified lens: the element of the cell that carries this scene, glowing. */
  function drawEmphasis(cellAt, c, which, mix) {
    if (mix < 0.02) return;
    const p = P();
    if (which.includes('edge')) sc.tube('emph-edge', [cellAt(c.N, 0), cellAt(c.N, 1.01)], { color: p.cyan, width: 7 * mix, glow: 0.7, occlude: false });
    if (which.includes('wall')) sc.fan([cellAt(c.A, 0), ...arcPts(c.A, c.B, 16).map((d) => cellAt(d, 1.01))], { fill: p.magenta, alpha: 0.45 * mix, color: p.magenta, width: 2 });
    if (which.includes('body')) for (const [X, Y] of [[c.N, c.A], [c.N, c.B], [c.A, c.B]]) sc.line([cellAt(X, 0), ...arcPts(X, Y, 12).map((d) => cellAt(d, 1.03)), cellAt(X, 0)], { color: p.violet, width: 2.4 * mix + 0.5, alpha: mix });
  }

  /** The comparison sphere S² of the cell (centre O, radius RC): its far half about the view is an opaque dim bowl
      shaded along a fixed world direction, with world-fixed latitudes and meridians on it; the near half is left open. */
  const SW = v3.unit([0.7, -0.45, 0.55]);
  function drawSphereBack(c, r) {
    const p = P(), D = sc.facing(), e1 = v3.unit(v3.cross(D, Math.abs(D[2]) < 0.9 ? EZ : EX)), e2 = v3.cross(D, e1);
    const dirOf = (u, v) => v3.add(v3.scale(D, -Math.cos(u)), v3.add(v3.scale(e1, Math.sin(u) * Math.cos(v)), v3.scale(e2, Math.sin(u) * Math.sin(v))));
    sc.surface('sphere-back', (u, v) => v3.add(c, v3.scale(dirOf(u, v), r * 0.985)), { u: [0, PI / 2], v: [0, TAU], nu: 16, nv: 64,
      colors: [p.panelEdge, p.lineHot], value: (u, v) => v3.dot(dirOf(u, v), SW), range: [-1.2, 1.2], pick: false });
    // grid lines just in front of the bowl, kept off its rim so that they never stick out of the silhouette
    const rg = r * 0.975, backRuns = (pts) => { const runs = []; let cur = []; for (const q of pts) { if (v3.dot(v3.sub(q, c), D) < -0.22 * rg) cur.push(q); else { if (cur.length > 1) runs.push(cur); cur = []; } } if (cur.length > 1) runs.push(cur); return runs; };
    for (const lat of [-60, -30, 0, 30, 60]) { const z = rg * Math.sin(lat * DEG), rr = rg * Math.cos(lat * DEG); for (const run of backRuns(circlePts(v3.add(c, [0, 0, z]), rr, 72))) sc.line(run, { color: p.dim, width: 1, alpha: 0.5 }); }
    for (let k = 0; k < 6; k++) { const a = PI * k / 6; for (const run of backRuns(Array.from({ length: 73 }, (_, i) => { const t = TAU * i / 72; return v3.add(c, [rg * Math.cos(t) * Math.cos(a), rg * Math.cos(t) * Math.sin(a), rg * Math.sin(t)]); }))) sc.line(run, { color: p.dim, width: 1, alpha: 0.5 }); }
  }

  function drawU1(M, lab) {
    const p = P(), u = M.u1, f = fade();
    const { at, c } = drawCell({ key: 'cell', walls: [p.panelEdge, p.lineHot, p.sigma], cap: [p.lineHot, p.sigma] });
    const Cc = v3.add(BASE, [0, 0, RC * 1.08]), rD = 0.7 * RC, rC = 0.6 * RC;
    sc.surface('u1-disk', (a, v) => v3.add(Cc, [v * rD * Math.cos(a), v * rD * Math.sin(a), 0]), { u: [0, TAU], v: [0, 1], nu: 48, nv: 2, color: p.magenta, alpha: 0.2 * f, pick: false });
    sc.line(circlePts(Cc, rD), { color: p.magenta, width: 1.4, alpha: 0.85 * f });
    sc.tube('u1-circle', circlePts(Cc, rC, 96), { color: p.cyan, width: 3.4, glow: 0.4, alpha: f, occlude: false });
    const tip = (a) => v3.add(Cc, [rC * Math.cos(a), rC * Math.sin(a), 0]);
    sc.arrow(Cc, tip(u.phi), { color: p.cyan, width: 2.6, headSize: 12, alpha: f });
    sc.arrow(Cc, tip(-u.phi), { color: p.cyan, width: 2, headSize: 10, alpha: 0.7 * f });
    sc.arrow(Cc, v3.add(Cc, [rC * 0.62, 0, 0]), { color: p.cyan, width: 1.6, headSize: 9, dash: [5, 4], alpha: 0.85 * f });
    sc.bead(tip(-u.phi), { key: 'minus-tip', color: p.cyan, r: 4.2 });
    if (lab) want('minus', tip(-u.phi), 'e<sup>−îqφ</sup>', 'raw c-cy backed', { pri: 8 });
    sc.bead(tip(u.phi), { key: 'plus-tip', color: p.amber, r: 6 });
    // ±q at the cap corners A, B and the closed flux between them
    const qa = at(c.A, 1.02), qb = at(c.B, 1.02), mid = v3.scale(v3.add(qa, qb), 0.5), out = v3.unit([mid[0] - BASE[0], mid[1] - BASE[1], 0]);
    for (const [h, s] of [[0.32, 0.9], [0.55, 0.55], [0.8, 0.2]]) {
      const ctrl = v3.add(mid, v3.add(v3.scale(out, h * RC * s), [0, 0, -h * RC * 0.45]));
      sc.line(Array.from({ length: 25 }, (_, i) => { const w = i / 24; return v3.add(v3.add(v3.scale(qa, (1 - w) ** 2), v3.scale(ctrl, 2 * w * (1 - w))), v3.scale(qb, w * w)); }), { color: p.cyan, width: 1.4, alpha: 0.75 * f });
    }
    sc.bead(qa, { key: 'q-plus', color: p.cyan, r: 5 }); sc.bead(qb, { key: 'q-minus', color: p.cyan, r: 5 });
    drawEmphasis(at, c, ['edge'], S.lensMix);
    if (lab) {
      want('plus', tip(u.phi), L(`e<sup>îqφ</sup> · φ = ${fix(u.phi / DEG, 0)}°`, `e<sup>îqφ</sup> · φ = ${fix(u.phi / DEG, 0)}°`), 'raw c-am backed', { pri: 10 });
      want('blind', v3.add(Cc, [-rD * 0.9, -rD * 0.5, 0]), L('盲面 î', 'blind plane î'), 'raw c-mg backed', { pri: 8 });
      want('prod', v3.add(Cc, [rC * 0.62, 0, 0]), 'e<sup>îqφ</sup>·e<sup>−îqφ</sup> = 1', 'raw c-cy backed', { pri: 9 });
      want('qp', qa, '+q', 'raw c-cy backed', { pri: 7 }); want('qm', qb, '−q', 'raw c-cy backed', { pri: 7 });
      want('cellu1', at(c.N, 0.55), S.lensMix >= 0.5 ? L('1 维弧 · S¹', '1D arc · S¹') : 'ε = 45°', S.lensMix >= 0.5 ? 'raw c-cy backed' : 'raw c-vi backed', { pri: 6 });
    }
    return { handle: tip(u.phi), center: v3.add(BASE, [0, 0, RC * 0.7]) };
  }

  const RIB0 = 115 * DEG;
  const ribbonC = (u) => { const zA = BASE[2] + 0.12 * RC, zB = BASE[2] + 1.0 * RC; return [0.9 * RC * Math.cos(u + RIB0), 0.9 * RC * Math.sin(u + RIB0), zA + (zB - zA) * u / (2 * TAU)]; };
  const ribbonW = (u) => v3.add(v3.scale(EZ, Math.cos(u / 2)), v3.scale([Math.cos(u + RIB0), Math.sin(u + RIB0), 0], Math.sin(u / 2)));
  const SHELL = 1.25 * RC, SHELL_C = v3.add(BASE, [0, 0, 0.56 * RC]);
  const probeDir = [Math.cos(-15 * DEG), Math.sin(-15 * DEG), 0];
  const probeR = (s2) => SHELL * clamp(s2.ratio, 0.04, 1.45);
  function drawSU2(M, lab) {
    const p = P(), s2 = M.su2, f = fade();
    const { at, c } = drawCell({ key: 'cell', walls: [p.panelEdge, p.lineHot, p.sigma], wallAB: [p.magenta, p.magenta], cap: [p.lineHot, p.sigma] });
    const th = Math.max(0.02, s2.theta), hw = 0.13 * RC;
    sc.surface('su2-ribbon', (u, v) => v3.add(ribbonC(u), v3.scale(ribbonW(u), v * hw)), { u: [0, th], v: [-1, 1], nu: Math.max(8, Math.ceil(th / TAU * 72)), nv: 2,
      colors: [p.violet, p.violet], back: p.panelEdge, grid: { every: [6, 2], color: p.ink, alpha: 0.18 }, alpha: f < 1 ? f : undefined, pick: false });
    const end = ribbonC(th), w = ribbonW(th);
    sc.arrow(end, v3.add(end, v3.scale(w, 0.36 * RC)), { color: p.cyan, width: 3, headSize: 12, alpha: f });
    sc.arrow(ribbonC(0), v3.add(ribbonC(0), v3.scale(ribbonW(0), 0.3 * RC)), { color: p.cyan, width: 1.6, headSize: 9, alpha: 0.55 * f });
    if (s2.theta >= TAU - 1e-9 && s2.theta < 2 * TAU - 1e-9 || s2.theta >= 2 * TAU - 1e-9) sc.arrow(ribbonC(TAU), v3.add(ribbonC(TAU), v3.scale(ribbonW(TAU), 0.3 * RC)), { color: p.cyan, width: 2, headSize: 10, alpha: 0.8 * f });
    sc.glass('su2-proca', SHELL_C, SHELL, { color: p.violet, alpha: 0.05 * f, rim: 0.3 * f });
    for (let k = 1; k <= 7; k++) {
      const x = k / 6, a = Math.exp(-x) / x / (Math.exp(-1 / 6) * 6);
      sc.line(circlePts(SHELL_C, SHELL * x * 0.98, 72), { color: p.magenta, width: 1.2, alpha: clamp(0.15 + 0.85 * a, 0, 1) * f });
    }
    const rp = probeR(s2);
    sc.line(circlePts(SHELL_C, rp, 96), { color: p.amber, width: 2.2, alpha: 0.95 });
    const hp = v3.add(SHELL_C, v3.scale(probeDir, rp));
    sc.bead(hp, { key: 'probe', color: p.amber, r: 5.4 });
    drawEmphasis(at, c, ['wall'], S.lensMix);
    if (lab) {
      want('wedge', at(v3.slerp(c.A, c.B, 0.5), 0.6), S.lensMix >= 0.5 ? L('2 维面 · A∧B', '2D wall · A∧B') : L('左手双矢 A∧B', 'left-handed A∧B'), 'raw c-mg backed', { pri: 9 });
      if (s2.theta >= TAU - 1e-9) want('m1', ribbonC(TAU), '360° · −1', 'raw c-mg backed', { pri: 8 });
      if (s2.theta >= 2 * TAU - 1e-9) want('p1', ribbonC(2 * TAU), '720° · +1', 'raw c-vi backed', { pri: 8 });
      want('doublet', v3.add(end, v3.scale(w, 0.36 * RC)), `Re U = ${fix(s2.reU, 3)}`, 'raw c-cy backed', { pri: 10 });
      want('proca', v3.add(SHELL_C, [0, 0, SHELL]), L('Proca 壳 λ<sub>W</sub> · W<sup>±</sup> Z⁰ · 2 + 1 = 3', 'Proca shell λ<sub>W</sub> · W<sup>±</sup> Z⁰ · 2 + 1 = 3'), 'raw c-vi backed', { pri: 7 });
      want('probe', hp, `r = ħc/E · e<sup>−m<sub>W</sub>r</sup> = ${fix(s2.yukawa, 3)}`, 'raw c-am backed', { pri: 10 });
    }
    return { handle: hp, center: v3.add(BASE, [0, 0, RC * 0.6]) };
  }

  const FRAME0 = [-0.95 * RC, -0.15 * RC, BASE[2] + 0.25 * RC], CUBE = 0.78 * RC, QDIR = v3.unit([0.93, 0.33, 0.12]);
  const quarkStart = (s3) => v3.add(FRAME0, v3.scale(v3.add(v3.add(s3.frame[0], s3.frame[1]), s3.frame[2]), CUBE));
  const quarkPos = (s3, r) => v3.add(quarkStart(s3), v3.scale(QDIR, r / 1.2 * 1.75 * RC));
  function smallCell(at0, axis, eps, size) {
    // a small arc-trihedron (its cap drawn as a flat triangle) with apex at at0 opening along axis
    const c = cellModel(eps), z = v3.unit(axis), ax = v3.cross(EZ, z), s = v3.len(ax), ang = Math.atan2(s, v3.dot(EZ, z));
    const R = (v) => (s < 1e-12 ? v : v3.rot(v, v3.scale(ax, 1 / s), ang));
    return [at0, ...[c.N, c.A, c.B].map((d) => v3.add(at0, v3.scale(R(d), size)))];
  }
  function drawSU3(M, lab) {
    const p = P(), s3 = M.su3, f = fade(), F = s3.frame;
    const corner = (i, j, k) => v3.add(FRAME0, v3.scale(v3.add(v3.add(v3.scale(F[0], i), v3.scale(F[1], j)), v3.scale(F[2], k)), CUBE));
    const vs = []; for (const i of [0, 1]) for (const j of [0, 1]) for (const k of [0, 1]) vs.push(corner(i, j, k));
    // vertex index = 4i + 2j + k
    sc.poly('su3-cube', { vertices: vs, faces: [[0, 2, 6, 4], [1, 5, 7, 3], [0, 4, 5, 1], [2, 3, 7, 6], [0, 1, 3, 2], [4, 6, 7, 5]] },
      { colors: [p.cyan, p.cyan, p.lineHot, p.lineHot, p.sigma, p.sigma], edges: p.ink });
    const names = ['e<sub>R</sub>', 'e<sub>G</sub>', 'e<sub>B</sub>'];
    F.forEach((d, i) => {
      sc.tube(`su3-ax${i}`, [FRAME0, v3.add(FRAME0, v3.scale(d, CUBE * 1.32))], { color: p.violet, width: 3.6, glow: 0.35, occlude: false });
      sc.arrow(v3.add(FRAME0, v3.scale(d, CUBE * 1.28)), v3.add(FRAME0, v3.scale(d, CUBE * 1.5)), { color: p.violet, width: 2.4, headSize: 12 });
    });
    const q0 = quarkStart(s3), q1 = quarkPos(s3, s3.r);
    sc.tube('su3-flux', [q0, q1], { color: p.magenta, width: 6, glow: 0.45, alpha: f, occlude: false });
    const n = s3.cells, len = v3.len(v3.sub(q1, q0)), size = Math.min(0.32 * RC, len / n * 0.9), verts = [], faces = [];
    for (let k = 0; k < n; k++) {
      const a0 = v3.add(q0, v3.scale(QDIR, len * (k + 0.08) / n)), pts = smallCell(a0, QDIR, s3.eps, size), o = verts.length;
      verts.push(...pts); faces.push([o, o + 1, o + 2], [o, o + 2, o + 3], [o, o + 3, o + 1], [o + 1, o + 3, o + 2]);
    }
    sc.poly('su3-chain', { vertices: verts, faces }, { color: p.violet, alpha: 0.55 * f, edges: p.violet, pick: false });
    sc.bead(q1, { key: 'quark', color: p.amber, r: 6 });
    if (S.lensMix > 0.02) sc.line([corner(0, 0, 0), corner(1, 0, 0), corner(1, 1, 0), corner(0, 1, 0), corner(0, 0, 0), corner(0, 0, 1), corner(1, 0, 1), corner(1, 1, 1), corner(0, 1, 1), corner(0, 0, 1)], { color: p.violet, width: 3 * S.lensMix, alpha: S.lensMix });
    if (lab) {
      want('vol', corner(1, 1, 1), S.lensMix >= 0.5 ? L('3 维体 · det G = 1', '3D body · det G = 1') : `I₃ · det U = ${fix(s3.detU, 4)}`, 'raw c-cy backed', { pri: 9 });
      names.forEach((nm, i) => want(`ax${i}`, v3.add(FRAME0, v3.scale(F[i], CUBE * 1.5)), nm, 'raw c-vi backed', { pri: 8 }));
      want('string', v3.lerp(q0, q1, 0.55), `V(r) = σr = ${fix(s3.V, 2)} GeV`, 'raw c-mg backed', { pri: 8 });
      want('quark', q1, `r = ${fix(s3.r, 2)} fm`, 'raw c-am backed', { pri: 10 });
      want('eps', v3.add(q0, v3.scale(QDIR, len * 0.15)), `ε = ${fix(s3.eps / DEG, 1)}° · Ω = ${fix(s3.omega / DEG, 2)}°`, 'raw c-vi backed', { pri: 6, dir: [0, 1] });
    }
    return { handle: q1, center: v3.add(FRAME0, v3.scale(v3.add(v3.add(F[0], F[1]), F[2]), CUBE / 2)) };
  }

  const EDGE = 1.25 * RC, HROT = -54 * DEG - (4 * DIHEDRAL + DELTA6 / 2), FLOOR = -0.5 * EDGE - 0.32 * RC;
  const PATH_E1 = [Math.cos(-0.62), -Math.sin(-0.62), 0], PATH_E2 = [Math.sin(-0.62), Math.cos(-0.62), 0].map((x) => -x);
  const pathWorld = (q, z = FLOOR + 0.03) => [q[0] * PATH_E1[0] + q[1] * PATH_E2[0], q[0] * PATH_E1[1] + q[1] * PATH_E2[1], z];
  const ringPoint = (k, r) => { const a = HROT + k * DIHEDRAL; return [r * Math.cos(a), r * Math.sin(a), 0]; };
  function drawRegge(M, lab) {
    const p = P(), g = M.regge, f = fade(), rho = EDGE * Math.sqrt(3) / 2;
    const H1 = [0, 0, -EDGE / 2], H2 = [0, 0, EDGE / 2], R = [0, 1, 2, 3, 4].map((k) => ringPoint(k, rho));
    const vs = [H1, H2, ...R], faces = [], cols = [];
    for (let k = 0; k < 4; k++) { faces.push([0, 1, 2 + k], [0, 2 + k, 3 + k], [1, 3 + k, 2 + k], [0, 3 + k, 1]); cols.push(p.lineHot, p.panelEdge, p.sigma, p.lineHot); }
    sc.poly('rg-tets', { vertices: vs, faces }, { colors: cols, edges: p.violet });
    const bar = (a, b, w = 3) => sc.tube(`rg-${a.join()}-${b.join()}`, [a, b], { color: p.violet, width: w, glow: 0.3, occlude: false });
    bar(H1, H2, 4.4);
    R.forEach((q, k) => { bar(H1, q); bar(H2, q); if (k < 4) bar(q, R[k + 1]); });
    sc.line([R[0], R[2]], { color: p.violet, width: 1.4, dash: [5, 4], alpha: 0.8 }); sc.line([R[1], R[3]], { color: p.violet, width: 1.4, dash: [5, 4], alpha: 0.8 });
    // the deficit wedge between P₄ and P₀ (identified across it)
    const a4 = HROT + 4 * DIHEDRAL;
    sc.surface('rg-wedge', (u, v) => { const a = a4 + u * DELTA6, rr = rho * (1 - Math.abs(2 * v - 1)); return [rr * Math.cos(a), rr * Math.sin(a), -EDGE / 2 + EDGE * v]; },
      { u: [0, 1], v: [0, 1], nu: 16, nv: 8, color: p.magenta, alpha: 0.42, pick: false });
    sc.line(Array.from({ length: 25 }, (_, i) => { const a = a4 + DELTA6 * i / 24; return [rho * 1.06 * Math.cos(a), rho * 1.06 * Math.sin(a), 0]; }), { color: p.magenta, width: 1.8, dash: [5, 4] });
    // the clock load η(r) on the floor, and the refracted ridge of the packet
    for (let k = 0; k <= 6; k++) { const r = LOAD.r0 * (1 + 0.55 * k); sc.line(circlePts([0, 0, FLOOR], r, 72), { color: p.magenta, width: 1.3, alpha: clamp(0.12 + 0.85 * etaAt(r) / LOAD.eta0, 0, 1) * f }); }
    sc.line([pathWorld([LOAD.x0, LOAD.b]), pathWorld([-LOAD.x0, LOAD.b])], { color: p.dim, width: 1.2, dash: [6, 5], alpha: 0.8 });
    sc.tube('rg-path', PATH.pts.map((q) => pathWorld(q)), { color: p.cyan, width: 4, glow: 0.45, alpha: f, occlude: false });
    const pk = pathWorld(pathAt(S.t));
    sc.bead(pk, { key: 'packet', color: p.amber, r: 6.4 });
    if (S.lensMix > 0.02) sc.tube('emph-hinge', [H1, H2], { color: p.magenta, width: 8 * S.lensMix, glow: 0.7, occlude: false });
    if (lab) {
      want('delta', [rho * 0.7 * Math.cos(a4 + DELTA6 / 2), rho * 0.7 * Math.sin(a4 + DELTA6 / 2), 0], `δ<sub>h</sub> = ${fix(g.deltaH / DEG, 2)}°`, 'raw c-mg backed', { pri: 10 });
      want('truss', H2, S.lensMix >= 0.5 ? L('胞间铰链 · N ≥ 5', 'inter-cell hinge · N ≥ 5') : 'K₆ · ΔE(6) = 3', 'raw c-vi backed', { pri: 9 });
      want('eta', [LOAD.r0 * 2.1, 0, FLOOR], 'η<sub>info</sub>(r)', 'raw c-mg backed', { pri: 6 });
      want('ridge', pathWorld(PATH.pts[PATH.pts.length - 1]), `a = −c²∇ln(dτ/dt) · ${fix(g.deflection / DEG, 1)}°`, 'raw c-cy backed', { pri: 8 });
      want('packet', pk, L('波包', 'packet'), 'raw c-am backed', { pri: 7 });
    }
    return { handle: pk, center: [0, 0, -0.1] };
  }

  const LADDER = [1.22 * RC * 0.81, 1.22 * RC * 0.59], LAD_LO = BASE[2] - 0.75 * RC, LAD_HI = BASE[2] + 0.95 * RC;
  const ladZ = (logE) => LAD_LO + (LAD_HI - LAD_LO) * (logE - LOG_MIN) / LOG_SPAN;
  const ladPt = (logE) => [LADDER[0], LADDER[1], ladZ(logE)];
  /** Cloud slots: three rings of six small cells round the main one, inner ring first (the outer ones go first). */
  const CLOUD = (() => {
    const out = [];
    for (let j = 0; j < 3; j++) for (let k = 0; k < 6; k++) {
      const a = TAU * (k + 0.5 * j) / 6 + 0.3, r = RC * (0.42 + 0.16 * j), z = BASE[2] + RC * (0.05 - 0.22 * j);
      out.push({ apex: [r * Math.cos(a), r * Math.sin(a), z], axis: v3.unit([Math.cos(a), Math.sin(a), 0.35 - 0.5 * j]), j });
    }
    return out;
  })();
  function drawPlanck(M, lab) {
    const p = P(), pl = M.planck, f = fade();
    drawSphereBack(BASE, RC);
    const { at, c } = drawCell({ key: 'cell', walls: [p.panelEdge, p.violet, p.violet], cap: [p.cyan, p.sigma] });
    // the hinge wedge δ_h(E) = δ_h(6)·α_G(E): the edge OA swept about ON, away from B
    if (pl.deltaH > 0.25 * DEG) sc.surface('pl-wedge', (u, v) => at(v3.rot(c.A, c.N, -u * pl.deltaH), v * 0.985), { u: [0, 1], v: [0, 1], nu: 16, nv: 4, color: p.magenta, alpha: 0.45, pick: false });
    if (pl.cloud > 0) {
      const verts = [], faces = [];
      for (const s of CLOUD.slice(0, pl.cloud)) {
        const pts = smallCell(s.apex, s.axis, EPS0, 0.26 * RC), o = verts.length;
        verts.push(...pts); faces.push([o, o + 1, o + 2], [o, o + 2, o + 3], [o, o + 3, o + 1], [o + 1, o + 3, o + 2]);
      }
      sc.poly('pl-cloud', { vertices: verts, faces }, { color: p.violet, alpha: 0.32 * f + 0.06, edges: p.violet, pick: false });
    }
    sc.tube('pl-ladder', [ladPt(LOG_MIN), ladPt(LOG_EP)], { color: p.sigma, width: 2.4, glow: 0.15, occlude: false });
    sc.tube('pl-band', [ladPt(13), ladPt(17)], { color: p.cyan, width: 6, glow: 0.4, occlude: false });
    for (const [lg, col] of [[LOG_MZ, p.sigma], [LOG_EP, p.magenta]]) sc.tube(`pl-tick${lg.toFixed(2)}`, [v3.add(ladPt(lg), [-0.12 * RC, 0, 0]), v3.add(ladPt(lg), [0.12 * RC, 0, 0])], { color: col, width: 3, glow: 0.3, occlude: false });
    const hp = ladPt(pl.logE);
    sc.bead(hp, { key: 'energy', color: p.amber, r: 6.4 });
    drawEmphasis(at, c, ['edge', 'wall', 'body'], S.lensMix);
    if (lab) {
      want('omega', at(v3.unit(v3.add(v3.add(c.N, c.A), c.B)), 1.02), S.lensMix >= 0.5 ? L('1—2—3 + N ≥ 5', '1—2—3 + N ≥ 5') : `Ω<sub>intra</sub> = ${fix(c.omega / DEG, 2)}°`, 'raw c-cy backed', { pri: 9 });
      if (pl.deltaH > 0.25 * DEG) want('dh', at(v3.rot(c.A, c.N, -0.5 * pl.deltaH), 0.75), `δ<sub>h</sub> = ${fix(pl.deltaH / DEG, 2)}°`, 'raw c-mg backed', { pri: 9 });
      want('ep', ladPt(LOG_EP), L('E<sub>P</sub> · α<sub>G</sub> = 1', 'E<sub>P</sub> · α<sub>G</sub> = 1'), 'raw c-mg backed', { pri: 8, dir: [1, 0] });
      want('mz', ladPt(LOG_MZ), 'M<sub>Z</sub>', 'raw ink backed', { pri: 6, dir: [1, 0] });
      want('band', ladPt(15), L('α<sub>i</sub> 近交', 'α<sub>i</sub> near-meet'), 'raw c-cy backed', { pri: 7, dir: [1, 0] });
      want('energy', hp, `log₁₀E = ${fix(pl.logE, 2)}`, 'raw c-am backed', { pri: 10, dir: [-1, 0] });
    }
    return { handle: hp, center: v3.add(BASE, [0, 0, RC * 0.6]) };
  }

  /* ---------- fitting: the largest picture whose outline clears the title, the scene buttons and the legend ---------- */
  const fib = (n, r = 1, c = O) => Array.from({ length: n }, (_, i) => { const z = 1 - 2 * (i + 0.5) / n, q = Math.sqrt(1 - z * z), a = i * 2.399963; return v3.add(c, [r * q * Math.cos(a), r * q * Math.sin(a), r * z]); });
  const cellOutline = () => { const out = [BASE]; for (const d of [CELL.N, CELL.A, CELL.B]) out.push(v3.add(BASE, v3.scale(d, RC * 1.01))); for (const [X, Y] of [[CELL.N, CELL.A], [CELL.N, CELL.B], [CELL.A, CELL.B]]) for (const d of arcPts(X, Y, 8)) out.push(v3.add(BASE, v3.scale(d, RC * 1.01))); return out; };
  function outline(key) {
    const out = cellOutline();
    if (key === 'u1') { out.push(...circlePts(v3.add(BASE, [0, 0, RC * 1.08]), 0.7 * RC, 24)); }
    else if (key === 'su2') { out.push(...fib(90, SHELL, SHELL_C)); for (let k = 0; k <= 24; k++) out.push(ribbonC(2 * TAU * k / 24)); }
    else if (key === 'su3') {
      out.length = 0;
      // the cube, its axes and the quark, swept over every colour turn (the turn keeps the diagonal, so this is tight)
      for (let k = 0; k <= 24; k++) {
        const s3 = su3Model(k / 24, 0, 1.5), F = s3.frame;
        for (const i of [0, 1]) for (const j of [0, 1]) for (const l of [0, 1]) out.push(v3.add(FRAME0, v3.scale(v3.add(v3.add(v3.scale(F[0], i), v3.scale(F[1], j)), v3.scale(F[2], l)), CUBE)));
        for (const d of F) out.push(v3.add(FRAME0, v3.scale(d, CUBE * 1.55)));
        out.push(quarkPos(s3, 1.5), v3.add(quarkPos(s3, 1.5), [0, 0, 0.3 * RC]), v3.add(quarkPos(s3, 1.5), [0, 0, -0.3 * RC]));
      }
    } else if (key === 'regge') {
      out.length = 0;
      const rho = EDGE * Math.sqrt(3) / 2;
      for (let k = 0; k < 24; k++) out.push([rho * Math.cos(TAU * k / 24), rho * Math.sin(TAU * k / 24), 0]);
      out.push([0, 0, EDGE / 2], [0, 0, -EDGE / 2]);
      out.push(...circlePts([0, 0, FLOOR], LOAD.r0 * 4.3, 24));
      for (const q of PATH.pts.filter((_, i) => i % 6 === 0)) out.push(pathWorld(q));
      out.push(pathWorld([LOAD.x0, LOAD.b]), pathWorld([-LOAD.x0, LOAD.b]));
    } else if (key === 'planck') { out.push(...fib(120, RC, BASE), ladPt(LOG_MIN), ladPt(LOG_EP)); for (const lg of [LOG_MZ, LOG_EP]) out.push(v3.add(ladPt(lg), [-0.14 * RC, 0, 0]), v3.add(ladPt(lg), [0.14 * RC, 0, 0])); for (const s of CLOUD) for (const q of smallCell(s.apex, s.axis, EPS0, 0.26 * RC)) out.push(q); }
    return out;
  }
  function hull2(pts) {
    const q = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]), cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lower = [], upper = [];
    for (const p of q) { while (lower.length >= 2 && cr(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop(); lower.push(p); }
    for (const p of q.reverse()) { while (upper.length >= 2 && cr(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop(); upper.push(p); }
    return lower.slice(0, -1).concat(upper.slice(0, -1));
  }
  /** Separating-axis test of a convex polygon (screen) against a rectangle. */
  function polyRect(poly, r) {
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const [x, y] of poly) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    if (x1 <= r.x0 || x0 >= r.x1 || y1 <= r.y0 || y0 >= r.y1) return false;
    const corners = [[r.x0, r.y0], [r.x1, r.y0], [r.x1, r.y1], [r.x0, r.y1]];
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length], n = [a[1] - b[1], b[0] - a[0]];
      let p0 = Infinity, p1 = -Infinity, c0 = Infinity, c1 = -Infinity;
      for (const p of poly) { const d = p[0] * n[0] + p[1] * n[1]; p0 = Math.min(p0, d); p1 = Math.max(p1, d); }
      for (const p of corners) { const d = p[0] * n[0] + p[1] * n[1]; c0 = Math.min(c0, d); c1 = Math.max(c1, d); }
      if (c1 <= p0 || c0 >= p1) return false;
    }
    return true;
  }
  /** Largest share of the stage the outline's hull may take. */
  const CAPF = { u1: 0.4, su2: 0.42, su3: 0.42, regge: 0.44, planck: 0.42 };
  const outlines = new Map();
  const fitCache = new Map();
  let lastFit = null;
  function fitFor(key, W, H, huds) {
    const cam = S.camFit, q = (v) => Math.ceil(v / 12) * 12;
    const rects = huds.map((b) => ({ x0: Math.floor((b.x - 6) / 12) * 12, y0: Math.floor((b.y - 6) / 12) * 12, x1: q(b.x + b.w + 6), y1: q(b.y + b.h + 6) }));
    const sig = `${key}|${W}|${H}|${cam[0]}|${cam[1]}|${rects.map((r) => [r.x0, r.y0, r.x1, r.y1].join(',')).join(';')}`;
    if (fitCache.has(sig)) return fitCache.get(sig);
    if (!outlines.has(key)) outlines.set(key, outline(key));
    const cy0 = Math.cos(cam[0]), sy0 = Math.sin(cam[0]), cp = Math.cos(cam[1]), sp = Math.sin(cam[1]);
    const Rv = [cy0, -sy0, 0], Uv = [sy0 * sp, cy0 * sp, cp];
    const hull = hull2(outlines.get(key).map((p) => [v3.dot(p, Rv), v3.dot(p, Uv)]));
    let amin = Infinity, amax = -Infinity, bmin = Infinity, bmax = -Infinity, area = 0;
    hull.forEach(([a, b], i) => { amin = Math.min(amin, a); amax = Math.max(amax, a); bmin = Math.min(bmin, b); bmax = Math.max(bmax, b); const n = hull[(i + 1) % hull.length]; area += a * n[1] - n[0] * b; });
    area = Math.abs(area) / 2;
    const M = 10, am = (amin + amax) / 2;
    const place = (u) => {
      const cx = W / 2 - u * am, lo = M + u * bmax, hi = H - M + u * bmin;
      if (lo > hi + 1e-9 || cx + u * amin < M - 1e-9 || cx + u * amax > W - M + 1e-9) return null;
      const mid = (lo + hi) / 2, span = Math.max(0, hi - lo);
      for (let k = 0; k <= 48; k++) {
        const cyC = k === 0 ? mid : mid + (k % 2 ? 1 : -1) * Math.ceil(k / 2) * span / 48;
        const poly = hull.map(([a, b]) => [cx + u * a, cyC - u * b]);
        if (!rects.some((r) => polyRect(poly, r))) return { cx, cy: cyC };
      }
      return null;
    };
    const uCap = Math.sqrt((CAPF[key] || 0.4) * W * H / Math.max(area, 1e-6));
    let lo = 12, hi = Math.min(uCap, (W - 2 * M) / Math.max(1e-6, amax - amin), (H - 2 * M) / Math.max(1e-6, bmax - bmin));
    if (place(hi)) lo = hi; else for (let it = 0; it < 22; it++) { const mid = (lo + hi) / 2; if (place(mid)) lo = mid; else hi = mid; }
    const u = lo, at = place(u) || { cx: W / 2 - u * am, cy: H / 2 + u * (bmin + bmax) / 2 };
    const fit = { unit: u, cx: at.cx, cy: at.cy };
    fitCache.set(sig, fit);
    if (fitCache.size > 60) fitCache.delete(fitCache.keys().next().value);
    return fit;
  }
  let FRAME = null;
  function drawStage(M) {
    const W0 = stageEl.clientWidth, H0 = stageEl.clientHeight, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes(), key = S.scene;
    // freeze the fit while the handle is dragged: the HUD text changes with the value and must not move the picture
    const fit = dragging && lastFit && lastFit.key === key ? lastFit : Object.assign({ key }, fitFor(key, W0, H0, huds));
    lastFit = fit;
    const base = Math.max(1, Math.min(W0, H0));
    options.radius = fit.unit / base; options.cx = fit.cx / Math.max(1, W0); options.cy = fit.cy / Math.max(1, H0);
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W0 - 12, h: H0 - 12 }; LB = [];
    sc.begin();
    const lab = !thumb;
    const r = { u1: drawU1, su2: drawSU2, su3: drawSU3, regge: drawRegge, planck: drawPlanck }[key](M, lab);
    sc.end();
    const hq = r.handle && !thumb ? sc.p(r.handle) : null;
    const visible = hq && hq[0] > 14 && hq[0] < W0 - 14 && hq[1] > 14 && hq[1] < H0 - 14 && !sc.occluded(r.handle, 0.06) && !OBST.some((b) => hq[0] > b.x - 4 && hq[0] < b.x + b.w + 4 && hq[1] > b.y - 4 && hq[1] < b.y + b.h + 4);
    placeHandle(visible ? hq : null);
    if (visible) OBST.push({ x: hq[0] - 19, y: hq[1] - 19, w: 38, h: 38 });
    if (lab) placeLabels(r.center);
    FRAME = { W: W0, H: H0, unit: fit.unit, handle: visible ? { x: hq[0], y: hq[1] } : null, fitKey: key };
  }

  /* ---------- the handle: an amber ring on this scene's quantity ---------- */
  const handle = $('arcHandle');
  let dragging = null;
  function placeHandle(q) {
    const show = !!q && !TRV.still && !TRV.thumbMode;
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
  }
  /** The world point of the handle for a value of the scene's quantity, without drawing. */
  function handlePointFor(v) {
    if (S.scene === 'u1') { const Cc = v3.add(BASE, [0, 0, RC * 1.08]); return v3.add(Cc, [0.6 * RC * Math.cos(TAU * v), 0.6 * RC * Math.sin(TAU * v), 0]); }
    if (S.scene === 'su2') { const s2 = su2Model(S.t, v); return v3.add(SHELL_C, v3.scale(probeDir, probeR(s2))); }
    if (S.scene === 'su3') return quarkPos(su3Model(S.t, S.logE, v), v);
    if (S.scene === 'regge') return pathWorld(pathAt(v));
    return ladPt(logFromT(v));
  }
  /** The candidate values of the scene's quantity and how the handle sets them. */
  function handleRange() {
    if (S.scene === 'u1') return { from: 0, to: 1, step: 1 / 360, get: () => S.t, set: (v) => setRail(v) };
    if (S.scene === 'su2') return { from: 1.0, to: 3.5, step: 0.01, get: () => S.logE, set: (v) => setLogE(v) };
    if (S.scene === 'su3') return { from: 0.15, to: 1.5, step: 0.01, get: () => S.r, set: (v) => setR(v) };
    if (S.scene === 'regge') return { from: 0, to: 1, step: 0.005, get: () => S.t, set: (v) => setRail(v) };
    return { from: 0, to: 1, step: 0.01 / LOG_SPAN, get: () => S.t, set: (v) => setRail(v) };
  }
  function valueAt(ev) {
    const b = stageEl.getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top, hr = handleRange();
    let best = hr.get(), bd = Infinity;
    const n = Math.round((hr.to - hr.from) / hr.step);
    for (let k = 0; k <= n; k++) {
      const v = k === n ? hr.to : hr.from + k * hr.step, q = sc.p(handlePointFor(v)), d = Math.hypot(q[0] - x, q[1] - y);
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
    const hr = handleRange(), v = valueAt(ev);
    if (v !== hr.get()) hr.set(v);
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(ev.key)) return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    const hr = handleRange(), k = ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : -1, big = { u1: 1, su2: 5, su3: 5, regge: 2, planck: 10 }[S.scene];
    hr.set(clamp(hr.get() + k * big * hr.step, hr.from, hr.to));
  });

  /* ---------- HUD, legend, readouts ---------- */
  const NAMES = {
    u1: [['U(1)<sub>em</sub> · 盲面相位纤维', 'U(1)<sub>em</sub> · blind-plane phase fiber'], ['1 维弧 · 相位 S¹', '1D arc · phase S¹']],
    su2: [['SU(2)<sub>L</sub> · 720° 双覆盖', 'SU(2)<sub>L</sub> · 720° double cover'], ['2 维面 · 双矢 A∧B', '2D wall · bivector A∧B']],
    su3: [['SU(3)<sub>c</sub> · 色锁与弦', 'SU(3)<sub>c</sub> · colour lock and string'], ['3 维体 · 体积锁定', '3D body · locked volume']],
    regge: [['雷杰铰链 · 钟载折射', 'Regge hinge · clock-load refraction'], ['胞间铰链 · N ≥ 5 的角亏', 'Between cells · the N ≥ 5 deficit']],
    planck: [['普朗克能标 · 合流', 'Planck scale · convergence'], ['一个胞 · 1—2—3 + N ≥ 5', 'One cell · 1—2—3 + N ≥ 5']]
  };
  const unified = () => S.lensMix >= 0.5;
  const sceneName = () => L(...NAMES[S.scene][unified() ? 1 : 0]);
  const energyText = (logE) => `log₁₀(E/GeV) = ${fix(logE, 2)}`;
  function hudText(M) {
    const c = M.cell;
    let sub;
    if (S.scene === 'u1') sub = `φ = ${fix(M.u1.phi / DEG, 0)}° · e<sup>îqφ</sup>·e<sup>−îqφ</sup> = 1 · α(0) = 1/${fix(1 / ALPHA0, 3)} · ${energyText(S.logE)}`;
    else if (S.scene === 'su2') sub = `θ = ${fix(M.su2.theta / DEG, 0)}° · Re U = ${fix(M.su2.reU, 3)} · e<sup>−m<sub>W</sub>r</sup> = ${fix(M.su2.yukawa, 3)} · ${energyText(S.logE)}`;
    else if (S.scene === 'su3') sub = `det U = ${fix(M.su3.detU, 4)} · r = ${fix(S.r, 2)} fm · σr = ${fix(M.su3.V, 2)} GeV · Ω(ε) = ${fix(M.su3.omega / DEG, 2)}° · ${energyText(S.logE)}`;
    else if (S.scene === 'regge') sub = `δ<sub>h</sub> = ${fix(M.regge.deltaH / DEG, 2)}° · ΔE(6) = 3 · cos²θ + cos²θ = ${fix(M.regge.born.sum, 2)} · ${L('偏折', 'bend')} ${fix(M.regge.deflection / DEG, 1)}°`;
    else sub = `${energyText(S.logE)} · α<sub>G</sub> = ${M.planck.alphaG >= 1e-4 ? fix(M.planck.alphaG, 4) : sci(M.planck.alphaG, 2)} · ${L('胞数', 'cells')} ${1 + M.planck.cloud}`;
    if (unified()) sub = `${L('同一块弧', 'one arc')} · ε = 45° · Ω = ${fix(c.omega / DEG, 2)}° · det G = ${fix(c.detG, 4)} · ${sub.split(' · ').slice(0, 1).join('')}`;
    $('hudBig').innerHTML = sceneName(); $('hudSub').innerHTML = sub;
    let LEG;
    if (unified()) LEG = [['cy', L('1 维弧', '1D arc')], ['mg', L('2 维面 · 铰链角亏', '2D wall · hinge deficit')], ['vi', L('3 维体', '3D body')], ['am', L('当前量', 'current value')]];
    else if (S.scene === 'u1') LEG = [['cy', L('相位圈 · ±q 通量', 'phase circle · ±q flux')], ['mg', L('盲面 î', 'blind plane î')], ['vi', L('刚性胞棱', 'rigid cell edges')], ['am', L('当前相位', 'current phase')]];
    else if (S.scene === 'su2') LEG = [['cy', L('二重态箭头', 'doublet arrow')], ['mg', L('A∧B · 汤川包络', 'A∧B · Yukawa envelope')], ['vi', L('720° 带 · Proca 壳', '720° ribbon · Proca shell')], ['am', L('探针 r = ħc/E', 'probe r = ħc/E')]];
    else if (S.scene === 'su3') LEG = [['cy', L('单态体积 I₃', 'singlet volume I₃')], ['mg', L('通量管 σr', 'flux tube σr')], ['vi', L('色三轴 · 弧体链', 'colour triad · cell chain')], ['am', L('夸克间距', 'quark separation')]];
    else if (S.scene === 'regge') LEG = [['cy', L('折射驻相脊', 'refracted ridge')], ['mg', L('角亏 δ<sub>h</sub> · η<sub>info</sub>', 'deficit δ<sub>h</sub> · η<sub>info</sub>')], ['vi', L('N = 6 桁架', 'N = 6 truss')], ['am', L('当前波包', 'current packet')]];
    else LEG = [['cy', L('Ω<sub>intra</sub> · 规范带', 'Ω<sub>intra</sub> · gauge band')], ['mg', L('δ<sub>h</sub> · E<sub>P</sub>', 'δ<sub>h</sub> · E<sub>P</sub>')], ['vi', L('普朗克胞 · 屏蔽云', 'Planck cell · screening cloud')], ['dm', L('比较球 S²', 'comparison sphere S²')], ['am', L('当前能标', 'current energy')]];
    $('legend').innerHTML = LEG.map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  const ROLES = { u1: 'cc ccv', su2: 'vmv m ', su3: 'vmcvv ', regge: 'm v c ', planck: 'mcvcm ' };
  const ro = (i, dt, dd) => { $(`dt${i}`).innerHTML = dt; $(`ro${i}`).innerHTML = dd; $(`ro${i}`).parentElement.className = (ROLES[S.scene][i - 1] || '').trim(); };
  function drawText(M) {
    const c = M.cell, pl = M.planck;
    $('dtKey').innerHTML = L('当前一幕与能标', 'Current scene and energy');
    $('roKey').innerHTML = sceneName();
    $('roKeySub').innerHTML = ` · ${energyText(S.logE)}`;
    if (S.scene === 'u1') {
      const u = M.u1;
      ro(1, L('相位 e<sup>îqφ</sup>（q = 1）', 'Phase e<sup>îqφ</sup> (q = 1)'), `φ = ${fix(u.phi / DEG, 1)}°`);
      ro(2, L('+q 与 −q 的相位之积', 'Product of the ±q phases'), `${fix(u.product[0], 4)} + ${fix(u.product[1], 4)} î`);
      ro(3, L('交换子 ‖[U₁, U₂]‖', 'Commutator ‖[U₁, U₂]‖'), tiny(u.commutator) || sci(u.commutator, 1));
      ro(4, L('高斯面通量 +q、−q、合计', 'Gauss flux +q, −q, total'), `${fix(u.flux.plus, 4)} · ${fix(u.flux.minus, 4)} · ${fix(u.flux.total, 4)}`);
      ro(5, L('低能极限 α(0)', 'Low-energy limit α(0)'), `1/${fix(1 / ALPHA0, 3)}`);
      ro(6, L('胞的角超与格拉姆', 'Excess and Gram of the cell'), `Ω = ${fix(c.omega / DEG, 2)}° · det G = ${fix(c.detG, 4)}`);
    } else if (S.scene === 'su2') {
      const s = M.su2;
      ro(1, L('转角 θ 与 Re U = cos(θ/2)', 'Turn θ and Re U = cos(θ/2)'), `${fix(s.theta / DEG, 1)}° · ${fix(s.reU, 4)}`);
      ro(2, L('抬升 e<sup>iθ/2</sup>：360° 处', 'Lift e<sup>iθ/2</sup> at 360°'), `${fix(s.liftAt2pi[0], 0)} ≠ +1`);
      ro(3, 'U(2π) = −I · U(4π) = +I', `|Δ| ${tiny(s.U2pi) || sci(s.U2pi, 1)} · ${tiny(s.U4pi) || sci(s.U4pi, 1)}`);
      ro(4, L('探针 r = ħc/E 与 λ<sub>W</sub>', 'Probe r = ħc/E and λ<sub>W</sub>'), `${sci(s.rE, 3)} fm · λ<sub>W</sub> = ${sci(s.lamW, 3)} fm`);
      ro(5, L('汤川因子 e<sup>−m<sub>W</sub>r</sup>', 'Yukawa factor e<sup>−m<sub>W</sub>r</sup>'), fix(s.yukawa, 4));
      ro(6, L('单圈 α₂(E) · 极化 2 + 1', 'One-loop α₂(E) · polarizations 2 + 1'), `${s.alpha2 == null ? L('M<sub>Z</sub> 以下不跑动', 'not run below M<sub>Z</sub>') : fix(s.alpha2, 5)} · ${s.polarizations}`);
    } else if (S.scene === 'su3') {
      const s = M.su3;
      ro(1, L('色转角 · det U', 'Colour turn · det U'), `${fix(s.thetaC / DEG, 1)}° · ${fix(s.detU, 6)}`);
      ro(2, L('线性弦势 V(r) = σr', 'Linear string V(r) = σr'), `${fix(s.V, 3)} GeV · r = ${fix(s.r, 2)} fm`);
      ro(3, L('三轴体积 · 带相位的 det V', 'Triad volume · det V with phases'), `${fix(s.volume, 6)} · ${fix(s.detV[0], 6)} + ${fix(s.detV[1], 6)} i`);
      ro(4, L('胞口径 ε(E) 与 Ω(ε)', 'Aperture ε(E) and Ω(ε)'), `${fix(s.eps / DEG, 2)}° · ${fix(s.omega / DEG, 3)}°`);
      ro(5, L('弧体链的胞数', 'Cells in the chain'), `${s.cells}`);
      ro(6, L('两轴字 R<sub>B</sub>R<sub>R</sub>R<sub>B</sub> 残差', 'Two-axis word R<sub>B</sub>R<sub>R</sub>R<sub>B</sub> residual'), tiny(s.word.residual) || sci(s.word.residual, 1));
    } else if (S.scene === 'regge') {
      const g = M.regge;
      ro(1, L('四个二面角之和 · 角亏 δ<sub>h</sub>', 'Sum of four dihedral angles · deficit δ<sub>h</sub>'), `${fix(g.angleSum / DEG, 2)}° · ${fix(g.deltaH / DEG, 2)}°`);
      ro(2, 'ΔE(N), N = 3 … 7', g.dE.map((d) => d.dE).join(' · '));
      ro(3, L('K₆ 杆数 − (3N − 6)', 'Bars of K₆ − (3N − 6)'), `15 − 12 = ${dE(6)}`);
      ro(4, L('+q、−q 的玻恩载荷之和', 'Born loads of +q, −q, summed'), `${fix(g.born.plus.weight, 4)} + ${fix(g.born.minus.weight, 4)} = ${fix(g.born.sum, 4)}`);
      ro(5, L('偏折角 · 最近距离处 dτ/dt', 'Bend · dτ/dt at closest approach'), `${fix(g.deflection / DEG, 2)}° · ${fix(g.dtdtMin, 4)}`);
      ro(6, L('波包行程 s', 'Packet run s'), fix(S.t, 3));
    } else {
      ro(1, L('引力耦合 α<sub>G</sub> = (E/E<sub>P</sub>)²', 'Gravitational α<sub>G</sub> = (E/E<sub>P</sub>)²'), pl.alphaG >= 1e-4 ? fix(pl.alphaG, 4) : sci(pl.alphaG, 2));
      ro(2, L('单圈 α₁⁻¹ · α₂⁻¹ · α₃⁻¹', 'One-loop α₁⁻¹ · α₂⁻¹ · α₃⁻¹'), pl.gaugeInv ? pl.gaugeInv.map((v) => fix(v, 2)).join(' · ') : L('M<sub>Z</sub> 以下不跑动', 'not run below M<sub>Z</sub>'));
      ro(3, L('普朗克胞 + 屏蔽云', 'Planck cell + screening cloud'), `1 + ${pl.cloud}`);
      ro(4, L('两两交点 log₁₀(E/GeV)', 'Pairwise crossings log₁₀(E/GeV)'), CROSS.map((x) => fix(x.logE, 2)).join(' · '));
      ro(5, L('最近处的 Δα⁻¹ · 铰链角亏 δ<sub>h</sub>(E)', 'Closest Δα⁻¹ · hinge deficit δ<sub>h</sub>(E)'), `${fix(SPREAD.dInv, 2)} · ${pl.deltaH / DEG >= 0.01 ? fix(pl.deltaH / DEG, 2) + '°' : sci(pl.deltaH / DEG, 1) + '°'}`);
      ro(6, L('α(0)/α<sub>G</sub>(m<sub>e</sub>)', 'α(0)/α<sub>G</sub>(m<sub>e</sub>)'), `${sci(pl.ratioMe, 2)} · α<sub>G</sub>(m<sub>e</sub>) = ${sci(pl.alphaGme, 2)}`);
    }
    $('roNote').innerHTML = unified()
      ? L(`同一块弧（模型）：1 维弧 = U(1) 相位 · 2 维面 A∧B = SU(2) · 3 维体 det G = ${fix(c.detG, 4)} = SU(3) · 胞间铰链 ΔE(6) = ${dE(6)} = 引力。读数照旧由页面算出。`,
        `One arc (model): 1D arc = U(1) phase · 2D wall A∧B = SU(2) · 3D body det G = ${fix(c.detG, 4)} = SU(3) · inter-cell hinge ΔE(6) = ${dE(6)} = gravity. The readouts are still computed on the page.`)
      : L('读数由页面当场算出；M<sub>Z</sub> 以下页面不跑动规范耦合，α(0) 是测得的低能极限。', 'Readouts are computed on the page; below M<sub>Z</sub> the page does not run the gauge couplings, and α(0) is the measured low-energy limit.');
    $('scenePill').innerHTML = `${{ u1: 'U(1)', su2: 'SU(2)', su3: 'SU(3)', regge: 'REGGE', planck: 'E<sub>P</sub>' }[S.scene]} <strong>${fix(S.logE, 2)}</strong>`;
    $('lensPill').innerHTML = S.lens ? L('同一块弧', 'ONE ARC') : L('物理', 'PHYSICS');
    $('hint').textContent = L('Space 播放 · ← → 逐步 · 拖琥珀手柄 · 拖空白转动 · L 切换透镜', 'Space play · ← → step · drag the amber handle · drag to orbit · L lens');
    $('formula').textContent = {
      u1: `e^(îqφ)·e^(−îqφ) = ${fix(M.u1.product[0], 4)}`, su2: `Re U(θ) = cos(θ/2) = ${fix(M.su2.reU, 4)}`, su3: `det U = ${fix(M.su3.detU, 6)} · V = σr = ${fix(M.su3.V, 3)} GeV`,
      regge: `δh = 2π − 4·arccos(1/3) = ${fix(DELTA6 / DEG, 3)}°`, planck: `αG = (E/EP)² = ${pl.alphaG >= 1e-4 ? fix(pl.alphaG, 4) : sci(pl.alphaG, 2)}`
    }[S.scene];
    lensBtn.setAttribute('aria-pressed', String(S.lens));
    sceneChips.set(S.scene, true);
  }

  /* ---------- strip plot: the running couplings and a zoom on the near-meeting triangle ---------- */
  function drawPlot(M) {
    const cv = $('plot');
    if (!cv.clientWidth || !cv.clientHeight || TRV.thumbMode) return;
    const p = P(), W = cv.clientWidth, zoomW = W >= 520 ? Math.round(W * 0.34) : 0, pl = M.planck;
    $('plotTitle').textContent = L('跑动耦合：α_G 爬升 45 个数量级，三条规范线只近交', 'Running couplings: α_G climbs 45 decades; the gauge lines only come close');
    const g = kit.plot(cv, { x: [LOG_MIN, LOG_EP], y: [-46, 1.5], pad: [44, zoomW + 14, 8, 20] });
    g.axes({ xTicks: [[-3, '−3'], [0, '0'], [5, '5'], [10, '10'], [15, '15'], [LOG_EP, '19.09']], yTicks: [[0, '1'], [-15, '10⁻¹⁵'], [-30, '10⁻³⁰'], [-45, '10⁻⁴⁵']], xLabel: 'log₁₀(E/GeV)' });
    g.rect(13, -46, 17, 1.5, p.cyan, { alpha: 0.08 });
    g.line([[LOG_MIN, 2 * (LOG_MIN - LOG_EP)], [LOG_EP, 0]], p.magenta, { width: 2.2 });
    const xs = []; for (let x = LOG_MZ; x < LOG_EP; x += 0.1) xs.push(x); xs.push(LOG_EP);
    const dashes = [undefined, [5, 3], [2, 3]];
    for (let i = 0; i < 3; i++) g.line(xs.map((x) => [x, -Math.log10(ainvAt(i, x))]), p.cyan, { width: 1.8, dash: dashes[i] });
    g.dot(LOG_MIN, Math.log10(ALPHA0), p.cyan, 3);
    g.vline(pl.logE, p.amber, { alpha: 0.85 });
    g.dot(pl.logE, 2 * (pl.logE - LOG_EP), p.amber, 4);
    g.text(0.5, -21, 'α_{G} = (E/E_{P})^{2}', p.magenta, { align: 'left', size: 10.5 });
    g.text(LOG_MZ + 0.4, -9, 'α_{1}, α_{2}, α_{3}', p.cyan, { align: 'left', size: 10.5 });
    if (zoomW) {
      const z = kit.plot(cv, { x: [12, LOG_EP], y: [30, 56], pad: [W - zoomW + 30, 8, 8, 20], clear: false });
      z.axes({ xTicks: [[12, '12'], [14, '14'], [16, '16'], [18, '18']], yTicks: [[30, '30'], [40, '40'], [50, '50']] });
      z.poly(CROSS.map((x) => [x.logE, x.ainv]), p.cyan, { alpha: 0.18, stroke: p.cyan, width: 1 });
      const zx = []; for (let x = 12; x < LOG_EP; x += 0.05) zx.push(x); zx.push(LOG_EP);
      for (let i = 0; i < 3; i++) z.line(zx.map((x) => [x, ainvAt(i, x)]), p.cyan, { width: 1.8, dash: dashes[i] });
      const gx = []; for (let x = 17.9; x <= LOG_EP; x += 0.01) gx.push(x); gx.push(LOG_EP);
      z.line(gx.map((x) => [x, 10 ** (-2 * (x - LOG_EP))]).filter((q) => q[1] <= 70), p.magenta, { width: 2 });
      if (pl.logE >= 12) z.vline(pl.logE, p.amber, { alpha: 0.85 });
      z.text(12.2, 53.5, `α_{i}^{−1} · min Δα^{−1} = ${fix(SPREAD.dInv, 2)}`, p.cyan, { align: 'left', size: 10 });
    }
    $('plotMeta').textContent = `${L('当前', 'now')} ${fix(pl.logE, 2)} · α_G = ${pl.alphaG >= 1e-4 ? fix(pl.alphaG, 4) : sci(pl.alphaG, 2)} · α_G(m_e) = ${sci(ALPHA_G_ME, 2)}`;
  }

  /* ---------- painter ---------- */
  const paint = kit.painter(() => {
    const M = model();
    drawText(M); hudText(M); TRV.hudFit();
    drawStage(M); drawPlot(M);
  }, [stageEl, $('plot')]);

  /* ---------- the rail: one quantity per scene, t ∈ [0, 1] ---------- */
  const railText = (t) => ({
    u1: `φ = ${fix(360 * t, 0)}°`, su2: `θ = ${fix(720 * t, 0)}°`, su3: `${L('色转角', 'colour turn')} ${fix(360 * t, 0)}°`,
    regge: `s = ${fix(t, 2)}`, planck: `log₁₀E = ${fix(logFromT(t), 2)}`
  }[S.scene]);
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, t: 1, rate: RATE.planck, step: 1 / 24, loop: true,
    format: (t) => railText(t),
    onChange: (t) => {
      S.t = t;
      if (S.scene === 'planck') { S.logE = logFromT(t); fE.set(S.logE); }
      paint();
    }
  });

  /* ---------- controls ---------- */
  const lensBtn = $('lensToggleBtn');
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); paint(); });
  const fE = kit.field($('logE'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); setLogE(v); } });
  let tw = null;
  function stopTweens() { if (tw) { tw.cancel(); tw = null; } }
  /** A transition that a control can stop; kit.tween may finish inside the call (reduced motion), so the token exists first. */
  function runTween(ms, step, done) {
    const tok = { h: null, cancel() { if (tok.h) tok.h.cancel(); } };
    tw = tok;
    tok.h = kit.tween(ms, step, () => { if (done) done(); if (tw === tok) tw = null; });
    return tok;
  }
  /** The reader moved a control: leave the card and stop its transitions. */
  function leave() { cards.mark(null); stopTweens(); clock.pause(); }
  function setRail(t) { clock.pause(); clock.set(clamp(t, 0, 1)); }
  function setLogE(v) {
    S.logE = v >= LOG_EP - 1e-12 ? LOG_EP : clamp(v, LOG_MIN, LOG_EP); fE.set(S.logE);
    if (S.scene === 'planck') clock.set(tFromLog(S.logE)); else paint();
  }
  function setR(v) { S.r = clamp(Math.round(v * 100) / 100, 0.15, 1.5); paint(); }
  function setScene(v) {
    S.scene = v; clock.rate = RATE[v]; sceneChips.set(v, true);
    if (v === 'planck') clock.set(tFromLog(S.logE));
  }
  let lensTween = null;
  function setLens(on, instant) {
    S.lens = !!on; lensBtn.setAttribute('aria-pressed', String(S.lens));
    if (lensTween) lensTween.cancel();
    lensTween = null;
    if (instant || TRV.still) { S.lensMix = S.lens ? 1 : 0; paint(); return; }
    const from = S.lensMix, to = S.lens ? 1 : 0, tok = { h: null, cancel() { if (tok.h) tok.h.cancel(); } };
    lensTween = tok;
    tok.h = kit.tween(420, (e) => { S.lensMix = from + (to - from) * e; paint(); }, () => { S.lensMix = to; if (lensTween === tok) lensTween = null; paint(); });
  }
  lensBtn.addEventListener('click', (ev) => { cards.mark(null); setLens(!S.lens); if (ev.detail > 0) { if (!stageEl.hasAttribute('tabindex')) stageEl.setAttribute('tabindex', '-1'); stageEl.focus({ preventScroll: true }); } });
  $('rew').addEventListener('click', () => { leave(); clock.set(0); });
  kit.keys({ l: () => { cards.mark(null); setLens(!S.lens); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'u1-blind-phase-fiber': { scene: 'u1', logE: -3, r: 1.2, cam: [-0.62, 0.55], play: false, still: 0.125 },
    'su2-chiral-double-cover': { scene: 'su2', logE: 2, r: 1.2, cam: [-2.36, 0.56], play: false, still: 'end' },
    'su3-color-flux-confinement': { scene: 'su3', logE: 0, r: 1.2, cam: [-0.55, 0.46], play: false, still: 0.125 },
    'regge-gravity-clock-refraction': { scene: 'regge', logE: -3, r: 1.2, cam: [-0.62, 0.62], play: false, still: 0.75 },
    'planck-scale-convergence': { scene: 'planck', logE: LOG_EP, r: 1.2, cam: [-0.62, 0.38], play: false, still: 'end' }
  };
  const NOTES = {
    'u1-blind-phase-fiber': ['极小圆弧体（ε = 45°，紫色的棱）上方是品红的盲面 î，青色相位圈里 +q 的相位 e<sup>îqφ</sup> 与 −q 的相位反向转动，乘积恒为 1（青色虚线箭头）；从 +q 到 −q 的青色通量线闭合，包住两者的高斯面通量为 0。能标 1 MeV，α(0) = 1/137.036。', 'Above the minimal arc-trihedron (ε = 45°, violet edges) lies the magenta blind plane î; in the cyan phase circle the phase e<sup>îqφ</sup> of +q and that of −q turn opposite ways and multiply to 1 (dashed cyan arrow); the cyan flux lines run from +q to −q, and the Gauss flux round both is 0. At 1 MeV, α(0) = 1/137.036.'],
    'su2-chiral-double-cover': ['品红的墙是左手双矢 A∧B。紫色双覆盖带绕满 720°：360° 处青色二重态箭头指向反面（Re U = −1），720° 才回到 +1。琥珀探针圈在 r = ħc/E，E = 100 GeV 时汤川因子 e<sup>−m<sub>W</sub>r</sup> = 0.448，仍在紫色 Proca 壳 λ<sub>W</sub> 之内；单圈 α₂ = 0.0337。', 'The magenta wall is the left-handed bivector A∧B. The violet double-cover ribbon runs the full 720°: at 360° the cyan doublet arrow points the other way (Re U = −1), and only at 720° is it back at +1. The amber probe ring sits at r = ħc/E: at E = 100 GeV the Yukawa factor is e<sup>−m<sub>W</sub>r</sup> = 0.448, still inside the violet Proca shell λ<sub>W</sub>; one loop gives α₂ = 0.0337.'],
    'su3-color-flux-confinement': ['紫色色三轴转动时，青色单态体积 I₃ 不变（det U = 1）。把一个夸克沿品红通量管拉到 r = 1.20 fm，管里串起 6 个紫色弧体，V(r) = σr = 1.09 GeV；能标往上推，弧体口径 ε(E) 收窄，Ω(ε) → 0。', 'As the violet colour triad turns, the cyan singlet volume I₃ stays (det U = 1). Pull one quark along the magenta flux tube to r = 1.20 fm and 6 violet arc cells thread the tube, V(r) = σr = 1.09 GeV; push the energy up and the aperture ε(E) narrows, Ω(ε) → 0.'],
    'regge-gravity-clock-refraction': ['六个点两两相连（ΔE(6) = 3）：四个正四面体绕紫色铰链一圈合不拢，留下品红角亏 δ<sub>h</sub> = 77.88°。地面品红圈是钟载 η<sub>info</sub>，琥珀波包沿青色驻相脊被弯向铰链；+q 与 −q 的玻恩载荷都是 cos²θ，只相加。', 'Six points joined in all pairs (ΔE(6) = 3): four regular tetrahedra round the violet hinge do not close and leave the magenta deficit δ<sub>h</sub> = 77.88°. The magenta rings on the floor are the clock load η<sub>info</sub>; the amber packet is bent along the cyan stationary-phase ridge towards the hinge; the Born loads of +q and −q are both cos²θ and only add.'],
    'planck-scale-convergence': ['能标推到 log₁₀(E/GeV) = 19.09（E<sub>P</sub> = 1.22 × 10¹⁹ GeV）：紫色屏蔽云退净，只剩一个普朗克胞；青色的 Ω<sub>intra</sub> = 19.47° 不变，品红的铰链角亏 δ<sub>h</sub> 随 α<sub>G</sub> = (E/E<sub>P</sub>)² 张到 77.88°，α<sub>G</sub> = 1。条带小图里三条单圈规范线只近交、不汇于一点。', 'Push the energy to log₁₀(E/GeV) = 19.09 (E<sub>P</sub> = 1.22 × 10¹⁹ GeV): the violet screening cloud is gone and one Planck cell is left; the cyan Ω<sub>intra</sub> = 19.47° stays, the magenta hinge deficit δ<sub>h</sub> opens with α<sub>G</sub> = (E/E<sub>P</sub>)² to 77.88°, α<sub>G</sub> = 1. In the strip the three one-loop gauge lines come close but do not meet at one point.']
  };
  // A cited figure has a fixed frame: one short sentence per card, without sub- or superscripts.
  const FIGURE_NOTES = {
    'u1-blind-phase-fiber': ['品红盲面 î 上，±q 的青色相位反向转动，乘积恒为 1；青色通量从 +q 闭合到 −q。', 'On the magenta blind plane î the cyan phases of ±q turn opposite ways and multiply to 1; cyan flux closes from +q to −q.'],
    'su2-chiral-double-cover': ['紫色带绕 720°：360° 得 −1，720° 回 +1；琥珀探针在紫色 Proca 壳内，汤川因子 0.448。', 'The violet ribbon runs 720°: −1 at 360°, +1 at 720°; the amber probe is inside the violet Proca shell, Yukawa factor 0.448.'],
    'su3-color-flux-confinement': ['青色单态体积在色转动下不变；品红通量管拉到 1.20 fm，串起 6 个紫色弧体，σr = 1.09 GeV。', 'The cyan singlet volume survives the colour turn; the magenta tube pulled to 1.20 fm threads 6 violet cells, σr = 1.09 GeV.'],
    'regge-gravity-clock-refraction': ['四个四面体绕铰链留下品红角亏 77.88°；琥珀波包沿青色脊被弯向铰链。', 'Four tetrahedra round the hinge leave a magenta deficit of 77.88°; the amber packet is bent along the cyan ridge towards the hinge.'],
    'planck-scale-convergence': ['普朗克能标：屏蔽云退净只剩一个胞，青色 Ω = 19.47°，品红角亏张到 77.88°，引力耦合为 1。', 'At the Planck scale the cloud is gone and one cell is left: cyan Ω = 19.47°, the magenta deficit opens to 77.88°, gravity couples at 1.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause(); stopTweens();
    const fromLog = S.logE;
    S.scene = p.scene; clock.rate = RATE[p.scene]; sceneChips.set(p.scene, true);
    S.r = p.r;
    setLens(false, true);
    S.camFit = p.cam.slice(); sc.view([p.cam[0], p.cam[1], 1], booting || TRV.still ? 0 : 600);
    const tEnd = p.still === 'end' ? 1 : p.still;
    if (booting || TRV.still || Math.abs(fromLog - p.logE) < 1e-9) {
      S.logE = p.logE; fE.set(p.logE); clock.set(tEnd);
    } else if (p.scene === 'planck') {
      const t0 = tFromLog(fromLog);
      runTween(900, (e) => clock.set(t0 + (tEnd - t0) * e), () => clock.set(tEnd));
    } else {
      clock.set(tEnd);
      runTween(700, (e) => { S.logE = fromLog + (p.logE - fromLog) * e; fE.set(S.logE); paint(); }, () => { S.logE = p.logE; fE.set(p.logE); paint(); });
    }
    paint();
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景、拖琥珀手柄、推能标，或切换双透镜。随时可以再选一张卡。', 'Free play: switch scenes, drag the amber handle, push the energy, or switch the lens. Pick a card again at any time.'] });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  const r6 = (v) => (Array.isArray(v) ? v.map(r6) : v);
  window.FORCE_UNIFY_DEBUG = Object.freeze({
    get state() {
      const M = model(), c = M.cell, s2 = M.su2, s3 = M.su3, g = M.regge, pl = M.planck;
      return JSON.parse(JSON.stringify({
        preset: cards.current, scene: S.scene, t: clock.t, playing: clock.playing, logE: S.logE, quarkSeparation: S.r, lens: S.lens, lensMix: S.lensMix,
        cell: { eps: c.eps, N: c.N, A: c.A, B: c.B, raw: c.raw, omega: c.omega, omegaAngles: c.omegaAngles, detG: c.detG, detGClosed: c.detGClosed },
        faceCycle: FACE_CYCLE,
        u1: M.u1,
        su2: { theta: s2.theta, axis: s2.axis, reU: s2.reU, U: s2.U, lift: s2.lift, liftSquaredResidual: s2.liftSquaredResidual, liftAt2pi: s2.liftAt2pi, U2piResidual: s2.U2pi, U4piResidual: s2.U4pi,
          E: s2.E, rE: s2.rE, lamW: s2.lamW, yukawa: s2.yukawa, alpha2: s2.alpha2, polarizations: s2.polarizations, bosons: s2.bosons, eaten: s2.eaten },
        su3: { thetaC: s3.thetaC, U: s3.U, detU: s3.detU, orthResidual: s3.orthResidual, volume: s3.volume, detV: s3.detV, word: s3.word, eps: s3.eps, omega: s3.omega, r: s3.r, sigmaGeVfm: s3.sigmaGeVfm, V: s3.V, cells: s3.cells },
        regge: { dihedral: g.dihedral, deltaH: g.deltaH, angleSum: g.angleSum, dE: g.dE, born: g.born, deflection: g.deflection, rMin: g.rMin, dtdtMin: g.dtdtMin, load: g.load,
          path: PATH.pts.filter((_, i) => i % 4 === 0).concat([PATH.pts[PATH.pts.length - 1]]), pathFinal: PATH.final, pathSteps: PATH.steps, pathDt: PATH.dt, packet: pathAt(S.t) },
        planck: { logE: pl.logE, alphaG: pl.alphaG, gaugeInv: pl.gaugeInv, deltaH: pl.deltaH, cloud: pl.cloud, cloudMax: CLOUD_MAX, crossings: pl.crossings, spread: pl.spread, gravityCrossings: pl.gravityCrossings, alphaGme: pl.alphaGme, ratioMe: pl.ratioMe },
        inputs: { MZ, AINV_MZ, BCOEF, EP, LOG_EP, LOG_MIN, ME, ALPHA0, HBARC, MW, SIGMA, LAMBDA },
        camera: Object.assign({}, sc.cam), handle: FRAME ? FRAME.handle : null, labels: PLACED, stageFrame: FRAME ? { W: FRAME.W, H: FRAME.H, unit: sc.unit, fit: FRAME.fitKey } : null
      }));
    },
    /** Model values at another energy, for independent checks. */
    at: (logE) => r6(JSON.parse(JSON.stringify({ gaugeInv: gaugeInv(logE), alphaG: alphaG(logE), aperture: apertureAt(logE), su2: su2Model(0, logE).yukawa, cloud: cloudCount(logE) }))),
    setState: (o) => {
      leave();
      if (o.scene) setScene(o.scene);
      if (o.logE != null) setLogE(o.logE);
      if (o.r != null) setR(o.r);
      if (o.lens != null) setLens(o.lens, true);
      if (o.t != null) clock.set(clamp(o.t, 0, 1));
      paint();
    },
    handleBox: () => { const r = handle.getBoundingClientRect(); return handle.hidden ? null : { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
  });
  window.TRV_THUMB = () => { cards.pick('planck-scale-convergence'); clock.pause(); clock.set(1); S.camFit = [-0.62, 0.38]; sc.view([-0.62, 0.38, 1], 0); paint.now(); };
  cards.pick(cards.initial('planck-scale-convergence'));
  booting = false;
  paint();
})();
