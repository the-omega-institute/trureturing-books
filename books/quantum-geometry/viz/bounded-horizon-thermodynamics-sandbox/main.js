/* HORIZON//THERMO · 有界视界热力学 · Bounded-horizon thermodynamics
   The stage: twelve qubits on a table, x_k = (k − 6.5)·d, paired as (k, 13 − k) for k = 1 … 6, so the six pairs are
   concentric (nested) arcs of radius (6.5 − k)·d over the table. Every pair is the pure state
   cos θ|00⟩ + sin θ|11⟩ (0 ≤ θ ≤ π/4). The amber hemisphere is the observer horizon over A = {1, …, N_A}: its left foot
   sits before qubit 1, its right foot between qubits N_A and N_A + 1. An arc with one end inside is severed (magenta,
   with a ring where it pierces the dome); arcs wholly inside or wholly outside stay cyan. Below the table the Page bars
   give S(A) = min(N_A, 12 − N_A)·S_A(θ) for N_A = 0, 2, …, 12 (amber ring: the current cut); to the right the Schmidt
   dial carries the amber vector (cos θ, sin θ), the 45° Bell ray and the violet ray of θ* = cos θ*.
   The rail is the modular time s: the modular flow e^{−isK_A}, K_A = −ln ρ_A, turns the phase of |0⟩⟨1| by
   s·ln(cos²θ/sin²θ) = s·2 ln cot θ (violet beads on the cut rings) and leaves ρ_A, S_A and S(A) unchanged.
   Spectrum matching: H = diag(0, ΔE), βΔE = 2 ln cot θ, k_B T_eff/ΔE = 1/(2 ln cot θ) (a Gibbs parametrization, not a
   bath temperature). Every number is computed here; the instances of the cited Lean theorems are computed in
   productInstance(), bellInstance(), blindSpotInstance(), accessInstance(), escapeInstance(), pinchingInstance(),
   entropyProductionInstance(), gibbs(), mutualInformationInstance(), landauerInstance(), dpiInstance() and DOTTIE.
   Read-only probe: window.HORIZON_THERMO_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180, UP = [0, 0, 1], LN2 = Math.LN2, QMAX = PI / 4;
  const NQ = 12, NPAIR = 6, NS = [0, 2, 4, 6, 8, 10, 12];
  const fin = (x) => (Number.isFinite(x) ? x : null);
  const xlogx = (x) => (x > 0 ? x * Math.log(x) : 0);

  /* ---------- the cosine fixed point θ* = cos θ*, by bisection on (0, 1) ---------- */
  function bisectDottie() {
    let a = 0, b = 1;
    for (let i = 0; i < 200; i++) { const m = 0.5 * (a + b); if (Math.cos(m) - m > 0) a = m; else b = m; }
    return 0.5 * (a + b);
  }
  const THETA_STAR = bisectDottie();
  /** Sign changes of cos t − t on (0, 10], sampled every 10⁻³. */
  function dottieSignChanges() {
    let n = 0, prev = Math.cos(1e-3) - 1e-3;
    for (let i = 2; i <= 10000; i++) { const t = i * 1e-3, f = Math.cos(t) - t; if ((f > 0) !== (prev > 0)) n++; prev = f; }
    return n;
  }
  const DOTTIE = Object.freeze({ theta: THETA_STAR, deg: THETA_STAR / DEG, residual: Math.abs(Math.cos(THETA_STAR) - THETA_STAR),
    inUnitInterval: THETA_STAR > 0 && THETA_STAR < 1, signChanges: dottieSignChanges(), insideSchmidtRange: THETA_STAR < QMAX });

  /* ---------- one pair and its marginal ---------- */
  /** Everything about one pair cos θ|00⟩ + sin θ|11⟩ seen from one of its qubits: ρ_A = diag(cos²θ, sin²θ). */
  function pair(theta) {
    const th = clamp(theta, 0, QMAX), c = Math.cos(th), s = Math.sin(th), p = c * c, q = s * s;
    const stone = th < 1e-12, heat = QMAX - th < 1e-12;
    const S = -xlogx(p) - xlogx(q);
    // βΔE = ln(p/q) = 2 ln cot θ: +∞ at θ = 0 and 0 at θ = π/4 (limits, set exactly)
    const beta = stone ? Infinity : heat ? 0 : 2 * Math.log(c / s);
    const T = stone ? 0 : heat ? Infinity : 1 / beta;
    return { theta: th, c, s, p, q, sum: p + q, bias: heat ? 0 : p - q, purity: p * p + q * q, S, bits: S / LN2, D: LN2 - S, beta, T, stone, heat };
  }
  /** The cut of the twelve qubits by A = {1, …, n}: each pair (k, 13 − k) is inside, outside or crossing. */
  function cut(n, S) {
    let crossing = 0, inside = 0, outside = 0, nats = 0;
    for (let k = 1; k <= NPAIR; k++) {
      const a = k <= n, b = NQ + 1 - k <= n;
      if (a && b) inside++; else if (a || b) { crossing++; nats += S; } else outside++;
    }
    return { crossing, inside, outside, nats, bits: nats / LN2 };
  }
  /** dE/dS along θ (central differences, E = sin²θ ΔE): the entanglement first law reads it as k_B T_eff. */
  function firstLaw(theta) {
    const h = 1e-5;
    if (!(theta > 2 * h && theta < QMAX - 2 * h)) return null;
    const a = pair(theta - h), b = pair(theta + h), dE = b.q - a.q, dS = b.S - a.S;
    return { dEdS: dE / dS, tempRatio: pair(theta).T, residual: Math.abs(dE / dS - pair(theta).T) };
  }
  /** D(ρ′ ‖ ρ_β) and β(E′ − E) − (S′ − S) for ρ_β = ρ_A at θ and ρ′ the marginal at θ ± 0.5° (E in units of ΔE). */
  function gibbs(theta) {
    const g = pair(theta);
    if (g.stone) return null;
    const d = 0.5 * DEG, th2 = theta + d <= QMAX ? theta + d : theta - d, f = pair(th2);
    const lhs = (f.p > 0 ? f.p * Math.log(f.p / g.p) : 0) + (f.q > 0 ? f.q * Math.log(f.q / g.q) : 0);
    const rhs = g.beta * (f.q - g.q) - (f.S - g.S);
    return { deltaRad: th2 - theta, lhs, rhs, residual: Math.abs(lhs - rhs) };
  }

  /* ---------- the instances of the cited theorems (real 2 × 2 and 4 × 4 matrices; index (i, b) ↦ 2i + b) ---------- */
  const outer = (a) => a.map((x) => a.map((y) => x * y));
  const mmul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((acc, x, k) => acc + x * B[k][j], 0)));
  const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
  const trace = (A) => A.reduce((acc, r, i) => acc + r[i], 0);
  const maxdiff = (A, B) => Math.max(...A.flatMap((r, i) => r.map((x, j) => Math.abs(x - B[i][j]))));
  const zeros = (n) => Array.from({ length: n }, () => new Array(n).fill(0));
  const eye = (n) => zeros(n).map((r, i) => r.map((_, j) => (i === j ? 1 : 0)));
  const traceB = (M) => [0, 1].map((i) => [0, 1].map((j) => M[2 * i][2 * j] + M[2 * i + 1][2 * j + 1]));
  const traceA = (M) => [0, 1].map((a) => [0, 1].map((b) => M[a][b] + M[2 + a][2 + b]));
  const kron = (A, B) => { const n = A.length, m = B.length, K = zeros(n * m); for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let k = 0; k < m; k++) for (let l = 0; l < m; l++) K[i * m + k][j * m + l] = A[i][j] * B[k][l]; return K; };
  /** Entropy (nats) of a 2 × 2 real symmetric density matrix from its eigenvalues. */
  const entropy2 = (M) => { const a = M[0][0], d = M[1][1], b = M[0][1], m = (a + d) / 2, r = Math.hypot((a - d) / 2, b); return -xlogx(m + r) - xlogx(Math.max(0, m - r)); };
  const pairVector = (th) => [Math.cos(th), 0, 0, Math.sin(th)];
  /** The controlled copy |i, a⟩ ↦ |i, a ⊕ i⟩ (the environment is the second factor). */
  const COPY = (() => { const U = zeros(4); for (let i = 0; i < 2; i++) for (let a = 0; a < 2; a++) U[2 * i + (a ^ i)][2 * i + a] = 1; return U; })();
  const blank = (t) => { const B = zeros(4); for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) B[2 * i][2 * j] = t[i][j]; return B; };
  function bellInstance() {
    const psi = pairVector(QMAX), rho = outer(psi), rA = traceB(rho);
    const idem = maxdiff(mmul(rho, rho), rho);
    return { norm: psi.reduce((a, x) => a + x * x, 0), trace: trace(rho), idempotentResidual: idem, rank: idem < 1e-12 ? Math.round(trace(rho)) : null,
      marginal: rA, halfIdentityResidual: maxdiff(rA, [[0.5, 0], [0, 0.5]]), marginalPurity: trace(mmul(rA, rA)), marginalIdempotencyGap: maxdiff(mmul(rA, rA), rA) };
  }
  function accessInstance(theta) {
    const c = Math.cos(theta), s = Math.sin(theta), rho = [[c * c, c * s], [c * s, s * s]], sigma = [[c * c, 0], [0, s * s]], Ut = transpose(COPY);
    const R = (t) => mmul(COPY, mmul(blank(t), Ut)), Rr = R(rho), Rs = R(sigma);
    return { thetaRad: theta, diagonalGap: Math.max(Math.abs(rho[0][0] - sigma[0][0]), Math.abs(rho[1][1] - sigma[1][1])), coherenceGap: Math.abs(rho[0][1] - sigma[0][1]),
      unitaryResidual: maxdiff(mmul(Ut, COPY), eye(4)), marginalResidual: maxdiff(traceB(Rr), traceB(Rs)), jointGap: maxdiff(Rr, Rs),
      arcResidual: maxdiff(Rr, outer(pairVector(theta))), reverseResidual: Math.max(maxdiff(mmul(Ut, mmul(Rr, COPY)), blank(rho)), maxdiff(mmul(Ut, mmul(Rs, COPY)), blank(sigma))) };
  }
  function dpiInstance(g) {
    const rho = outer(pairVector(g.theta)), pure = Math.abs(trace(mmul(rho, rho)) - 1) < 1e-12;
    const before = (pure ? 0 : NaN) - Math.log(1 / 4);                 // Tr ρ ln ρ − Tr ρ ln(I/4) for a pure ρ
    const rA = traceB(rho), after = [rA[0][0], rA[1][1]].reduce((acc, x) => acc + (x > 0 ? x * Math.log(2 * x) : 0), 0);
    return { before, after, holds: after <= before + 1e-15 };
  }
  function landauerInstance(g) {
    const dSsys = -g.S, I = 0, D = 0, dSres = I - dSsys, betaQ = dSres + D, rhs = -dSsys + I + D;
    return { systemEntropyChange: dSsys, mutualInformation: I, reservoirDivergence: D, reservoirEntropyChange: dSres, betaHeat: betaQ, identityRhs: rhs,
      residual: Math.abs(betaQ - rhs), boundHolds: -dSsys <= betaQ + 1e-15, saturated: Math.abs(-dSsys - betaQ) < 1e-15, saturationIff: (Math.abs(-dSsys - betaQ) < 1e-15) === (I === 0 && D === 0) };
  }
  function productInstance() {
    const rho = outer(pairVector(0)), rA = traceB(rho), rB = traceA(rho), k0 = [[1, 0], [0, 0]];
    return { marginal: rA, marginalLeft: rB, residual: maxdiff(rA, k0), leftResidual: maxdiff(rB, k0), purity: trace(mmul(rA, rA)) };
  }
  /* complex 2 × 2 and 4 × 4 matrices for the Pauli products: entries [re, im] */
  const C = (re, im = 0) => [re, im];
  const PAULI = [[[C(1), C(0)], [C(0), C(1)]], [[C(0), C(1)], [C(1), C(0)]], [[C(0), C(0, -1)], [C(0, 1), C(0)]], [[C(1), C(0)], [C(0), C(-1)]]];
  const ckron = (A, B) => { const K = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => C(0))); for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) for (let k = 0; k < 2; k++) for (let l = 0; l < 2; l++) { const a = A[i][j], b = B[k][l]; K[2 * i + k][2 * j + l] = [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]]; } return K; };
  /** Re Tr(X† Y) of two complex 4 × 4 matrices (the real Hilbert–Schmidt inner product). */
  const hs = (X, Y) => { let t = 0; for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) t += X[a][b][0] * Y[a][b][0] + X[a][b][1] * Y[a][b][1]; return t; };
  /** Re Tr(ρ B) for a real 4 × 4 ρ. */
  const coef = (rho, B) => { let t = 0; for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) t += rho[a][b] * B[b][a][0]; return t; };
  const SECTORS = (() => {
    const out = { A: [], B: [], corr: [] };
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { if (!i && !j) continue; (j === 0 ? out.A : i === 0 ? out.B : out.corr).push(ckron(PAULI[i], PAULI[j])); }
    return out;
  })();
  /** m = n = 2: the traceless sector splits into local A (3), local B (3) and correlations (9), mutually orthogonal; the Bell
      state and the classical mixture (|00⟩⟨00| + |11⟩⟨11|)/2 share both marginals and differ globally; at θ the pair and its
      dephased diag(cos²θ, 0, 0, sin²θ) share every local coefficient and differ only in the correlation sector. */
  function blindSpotInstance(theta) {
    const all = [...SECTORS.A, ...SECTORS.B, ...SECTORS.corr];
    let ortho = 0;
    all.forEach((X, a) => all.forEach((Y, b) => { ortho = Math.max(ortho, Math.abs(hs(X, Y) - (a === b ? 4 : 0))); }));
    const bell = outer(pairVector(QMAX)), classical = [[0.5, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0.5]];
    const pure = outer(pairVector(theta)), deph = zeros(4); deph[0][0] = pure[0][0]; deph[3][3] = pure[3][3];
    const gap = (X, Y, list) => Math.max(...list.map((B) => Math.abs(coef(X, B) - coef(Y, B))));
    return { localDim: SECTORS.A.length + SECTORS.B.length, correlationDim: SECTORS.corr.length, tracelessDim: all.length, correlationShare: SECTORS.corr.length / all.length, orthogonalityResidual: ortho,
      witnessMarginalGap: Math.max(maxdiff(traceB(bell), traceB(classical)), maxdiff(traceA(bell), traceA(classical))), witnessGlobalGap: maxdiff(bell, classical),
      localGap: Math.max(gap(pure, deph, SECTORS.A), gap(pure, deph, SECTORS.B)), correlationGap: gap(pure, deph, SECTORS.corr) };
  }
  /** Four basis states of one pair and two readouts, Z_A and Z_B, each agreeing on a pair of states when it reads the same:
      escapePairs(catalog without i) = escapePairs(full) ∪ uniqueCapturePairs(i), counted by brute force. */
  function escapeInstance() {
    const R = [(x) => x >> 1, (x) => x & 1], idx = [0, 1];
    const pairs = []; for (let x = 0; x < 4; x++) for (let y = 0; y < 4; y++) if (x !== y) pairs.push([x, y]);
    const escape = (sel) => pairs.filter(([x, y]) => sel.every((i) => R[i](x) === R[i](y)));
    const unique = (i) => pairs.filter(([x, y]) => R[i](x) !== R[i](y) && idx.filter((j) => j !== i).every((j) => R[j](x) === R[j](y)));
    const key = (l) => l.map((p) => p.join('')).sort().join(' ');
    const full = escape(idx), out = idx.map((i) => { const w = escape(idx.filter((j) => j !== i)), u = unique(i); return { without: w.length, unique: u.length, holds: key(w) === key([...full, ...u].filter((p, k, a) => a.findIndex((q) => q[0] === p[0] && q[1] === p[1]) === k)) }; });
    return { states: 4, readouts: 2, fullEscape: full.length, withoutB: out[1].without, uniqueB: out[1].unique, withoutA: out[0].without, uniqueA: out[0].unique, holds: out.every((o) => o.holds) };
  }
  /** ⟨ρ, ρ⟩ = ⟨Pρ, Pρ⟩ + ⟨ρ − Pρ, ρ − Pρ⟩ for ρ = |φ⟩⟨φ|, φ = (cos θ, sin θ), and the diagonal pinching P. */
  function pinchingInstance(theta) {
    const c = Math.cos(theta), s = Math.sin(theta), rho = [[c * c, c * s], [c * s, s * s]], P = [[c * c, 0], [0, s * s]], Rm = [[0, c * s], [c * s, 0]];
    const n2 = (A) => A.flat().reduce((acc, x) => acc + x * x, 0);
    return { total: n2(rho), pinched: n2(P), offDiagonal: n2(Rm), residual: Math.abs(n2(rho) - n2(P) - n2(Rm)) };
  }
  /** One qubit from |0⟩: U turns the Bloch vector by 2θ about y, then the z-basis pinching; three steps. Each step raises the
      entropy by D(UρU† ‖ P(UρU†)), computed from the eigenvalues of UρU† and the diagonal of its pinching. */
  function entropyProductionInstance(theta) {
    const a = 2 * theta, dm = (r) => [[(1 + r[2]) / 2, r[0] / 2], [r[0] / 2, (1 - r[2]) / 2]];
    let r = [0, 0, 1], worst = 0, minD = Infinity, total = 0;
    const S0 = entropy2(dm(r)), steps = [];
    for (let k = 0; k < 3; k++) {
      const u = [r[0] * Math.cos(a) + r[2] * Math.sin(a), r[1], -r[0] * Math.sin(a) + r[2] * Math.cos(a)], rho = dm(u);
      const m = (rho[0][0] + rho[1][1]) / 2, rr = Math.hypot((rho[0][0] - rho[1][1]) / 2, rho[0][1]);
      const D = xlogx(m + rr) + xlogx(Math.max(0, m - rr)) - xlogx(rho[0][0]) - xlogx(rho[1][1]);
      const next = [0, 0, u[2]], dS = entropy2(dm(next)) - entropy2(dm(r));
      worst = Math.max(worst, Math.abs(dS - D)); minD = Math.min(minD, D); total += D; steps.push(D); r = next;
    }
    return { steps, firstStep: steps[0], residual: worst, minRelativeEntropy: minD, sumResidual: Math.abs(entropy2(dm(r)) - S0 - total) };
  }
  /** U = copy · (R_y ⊗ I) prepares the arc from |00⟩: ΔS_A + ΔS_B = ΔI (the joint entropy is unchanged). */
  function mutualInformationInstance(theta) {
    const c = Math.cos(theta), s = Math.sin(theta), U = mmul(COPY, kron([[c, -s], [s, c]], eye(2)));
    const rho0 = outer([1, 0, 0, 0]), rho1 = mmul(U, mmul(rho0, transpose(U)));
    const SA = (M) => entropy2(traceB(M)), SB = (M) => entropy2(traceA(M)), pureJoint = Math.abs(trace(mmul(rho1, rho1)) - 1) < 1e-12;
    const I = (M) => SA(M) + SB(M) - 0;                                  // both joint states are pure: S_AB = 0
    const lhs = (SA(rho1) - SA(rho0)) + (SB(rho1) - SB(rho0)), rhs = I(rho1) - I(rho0);
    return { unitaryResidual: maxdiff(mmul(transpose(U), U), eye(4)), arcResidual: maxdiff(rho1, outer(pairVector(theta))), pureJoint, lhs, rhs, residual: Math.abs(lhs - rhs) };
  }
  const BELL = bellInstance(), PRODUCT = productInstance(), ESCAPE = escapeInstance();

  /* ---------- state ---------- */
  const S = { theta: QMAX, NA: 6, naShown: 6, s: 0, pulse: null, pulses: 0, lastPulse: null };

  /** Everything the page shows, from the state. */
  function model() {
    const g = pair(S.theta), n = S.NA, ct = cut(n, g.S);
    const rate = Number.isFinite(g.beta) ? g.beta : null;
    const phase = rate == null ? null : ((S.s * rate) % TAU + TAU) % TAU;
    const landBit = g.stone ? 0 : g.heat ? Infinity : LN2 * g.T, landSA = g.stone ? 0 : g.heat ? Infinity : g.S * g.T;
    const accel = g.heat ? Infinity : TAU * g.T;                          // a = 2π c k_B T_eff/ħ, in units of ΔE c/ħ
    return Object.assign({}, g, { n, f: n / NQ, cut: ct, curve: NS.map((m) => Object.assign({ n: m }, cut(m, g.S))), rate, phase, landBit, landSA, accel, deg: g.theta / DEG });
  }
  const num = (x, d = 6) => (x === Infinity ? '+∞' : fix(x, d));

  /* ---------- the stage: world layout ---------- */
  const DQ = 0.16, XQ = (k) => (k - 6.5) * DQ, RK = (k) => (6.5 - k) * DQ, XCUT = (n) => (n - 6) * DQ, XL = XCUT(0);
  const ZQ = 0.02;                                                        // the plane of the qubits and arcs
  const TB = { x0: -1.1, x1: 1.86, y0: -0.3, y1: 0.3, z0: -0.07, z1: 0 };
  const ZB = -0.86, HB = 0.072, RBAR = 0.045;                             // Page bars: baseline, height per bit, radius
  const DO = [1.26, 0, 0.03], DR = 0.5;                                   // the Schmidt dial: centre and radius
  const BOX = { x: [-1.12, 1.88], y: [-0.3, 0.3], z: [ZB - 0.07, 1.0] };  // what the fit keeps in view
  const VIEW0 = [-0.16, 0.3];
  const RHO = 0.055;                                                      // radius of the orbit of a modular phase bead
  const dialAt = (th, r = DR) => [DO[0] + r * Math.cos(th), DO[1], DO[2] + r * Math.sin(th)];
  /** The horizon for a (possibly fractional, while a card moves it) count n: centre, radius, right foot. */
  const horizon = (n) => { const xR = XCUT(n), R = (xR - XL) / 2; return { C: [(xR + XL) / 2, 0, ZQ], R, xR }; };
  const arcPoint = (r, phi) => [r * Math.cos(phi), 0, ZQ + r * Math.sin(phi)];

  const stageEl = $('stageWrap'), canvas = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; probe.style.position = 'absolute'; tagBox.appendChild(probe);
  const options = { canvas, yaw: VIEW0[0], pitch: VIEW0[1], wheel: false, radius: 0.3, cx: 0.5, cy: 0.5, onChange: () => paint() };
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
    for (const el of [$('hudTl'), $('thetaChips'), $('legend')]) { const b = boxOf(el, sr); if (b && (el.id !== 'legend' || el.textContent.trim())) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 8); else bottom = Math.min(bottom, b.y - 8); }
    return { x: 12, y: top, w: Math.max(40, W - 24), h: Math.max(60, bottom - top) };
  }
  /** Fit the projection so that BOX, seen by the current camera, fills the HUD-free rectangle. */
  function fitTo(area, W, H) {
    const yaw = sc.cam.yaw, pitch = sc.cam.pitch;
    const R = [Math.cos(yaw), -Math.sin(yaw), 0], U = [Math.sin(yaw) * Math.sin(pitch), Math.cos(yaw) * Math.sin(pitch), Math.cos(pitch)];
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const x of BOX.x) for (const y of BOX.y) for (const z of BOX.z) {
      const p = [x, y, z], a = v3.dot(p, R), b = v3.dot(p, U);
      x0 = Math.min(x0, a); x1 = Math.max(x1, a); y0 = Math.min(y0, b); y1 = Math.max(y1, b);
    }
    const unit = Math.max(20, Math.min(area.w / Math.max(0.2, x1 - x0), area.h / Math.max(0.2, y1 - y0)));
    options.radius = unit / Math.max(1, Math.min(W, H));
    options.cx = (area.x + area.w / 2 - unit * (x0 + x1) / 2) / Math.max(1, W);
    options.cy = (area.y + area.h / 2 + unit * (y0 + y1) / 2) / Math.max(1, H);
    return unit;
  }

  /* labels: placed after drawing by priority, off each other, the HUD and the handles */
  const sizes = new Map();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizes.clear(); paint(); });
  TRV.onLang(() => { sizes.clear(); miniKey = ''; });
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

  /* solids */
  function cylinder(key, c, z0, h, r, color, grid) {
    sc.surface(key, (u, v) => [c[0] + r * Math.cos(v), c[1] + r * Math.sin(v), z0 + u * h], { u: [0, 1], v: [0, TAU], nu: 2, nv: 24, color, grid, pick: false });
    sc.surface(`${key}-cap`, (u, v) => [c[0] + u * r * Math.cos(v), c[1] + u * r * Math.sin(v), z0 + h], { u: [0, 1], v: [0, TAU], nu: 2, nv: 24, color, pick: false });
  }
  function slab(key, b, color) {
    const V = [[b.x0, b.y0, b.z0], [b.x1, b.y0, b.z0], [b.x1, b.y1, b.z0], [b.x0, b.y1, b.z0], [b.x0, b.y0, b.z1], [b.x1, b.y0, b.z1], [b.x1, b.y1, b.z1], [b.x0, b.y1, b.z1]];
    sc.poly(key, { vertices: V, faces: [[0, 3, 2, 1], [4, 5, 6, 7], [0, 1, 5, 4], [2, 3, 7, 6], [0, 4, 7, 3], [1, 2, 6, 5]] }, { color, pick: false });
  }

  let FRAME = null, FIT = null;
  function drawStage(M) {
    const W = canvas.clientWidth || stageEl.clientWidth, H = canvas.clientHeight || stageEl.clientHeight, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 18, y: 18, w: W - 36, h: H - 36 } : safeRect(W, H, huds);
    if (!dragging || !FIT) FIT = { area };
    fitTo(FIT.area, W, H);
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = [];
    const tags = [];
    const at = (p, html, cls, pri, dir) => { if (!thumb) tags.push({ p, html, cls, pri, dir }); };
    const hz = horizon(S.naShown), hasDome = hz.R > 1e-3, bitsW = M.bits;
    sc.begin();

    /* the table and the qubits on it */
    slab('table', TB, P.lineHot);
    for (let k = 1; k <= NQ; k++) sc.bead([XQ(k), 0, ZQ + 0.012], { key: `q${k}`, color: XQ(k) < hz.xR ? P.ink : P.dim, r: 4.4 });

    /* the horizon: an opaque back wall (y ≥ 0) with an amber mesh, a faint amber front, its outline and its base */
    if (hasDome) {
      const { C, R } = hz;
      sc.surface('domeBack', (phi, psi) => v3.add(C, [R * Math.cos(phi) * Math.cos(psi), R * Math.sin(psi), R * Math.sin(phi) * Math.cos(psi)]),
        { u: [0, PI], v: [0, PI / 2], nu: 36, nv: 12, color: P.lineHot, grid: { every: [6, 3], color: P.amber, alpha: 0.32 }, pick: false });
      sc.surface('domeFront', (phi, psi) => v3.add(C, [R * Math.cos(phi) * Math.cos(psi), -R * Math.sin(psi), R * Math.sin(phi) * Math.cos(psi)]),
        { u: [0, PI], v: [0, PI / 2], nu: 36, nv: 12, color: P.amber, alpha: 0.07, pick: false, occlude: false });
      const D = sc.facing(), e1 = v3.unit(v3.cross(D, Math.abs(D[2]) < 0.95 ? UP : [1, 0, 0])), e2 = v3.cross(D, e1), rim = [];
      for (let i = 0; i <= 120; i++) { const a = TAU * i / 120, p = v3.add(C, v3.add(v3.scale(e1, R * Math.cos(a)), v3.scale(e2, R * Math.sin(a)))); if (p[2] >= ZQ - 1e-9) rim.push(p); else if (rim.length && rim[rim.length - 1] !== null) rim.push(null); }
      let run = [];
      for (const p of rim.concat([null])) { if (p) run.push(p); else { if (run.length > 1) sc.line(run, { color: P.amber, width: 1.8, alpha: 0.95 }); run = []; } }
      sc.circle(C, UP, R, { color: P.amber, width: 1.3, alpha: 0.7 });
      if (S.pulse != null) {
        const e = S.pulse, Rp = R * (1 + 0.6 * e) + 0.04;
        sc.surface('pulse', (phi, psi) => v3.add(C, [Rp * Math.cos(phi) * Math.cos(psi), Rp * Math.sin(psi), Rp * Math.sin(phi) * Math.cos(psi)]),
          { u: [0, PI], v: [-PI / 2, PI / 2], nu: 30, nv: 16, color: P.magenta, alpha: 0.24 * (1 - e), pick: false, occlude: false });
      }
    }

    /* the six arcs */
    const wArc = 1.3 + 3.4 * bitsW, glow = 0.15 + 0.45 * bitsW, cuts = [];
    for (let k = 1; k <= NPAIR; k++) {
      const r = RK(k), pts = Array.from({ length: 65 }, (_, i) => arcPoint(r, PI * (1 - i / 64)));
      const inL = XQ(k) < hz.xR, inR = XQ(NQ + 1 - k) < hz.xR, crossing = inL !== inR;
      if (M.stone) { sc.line(pts, { color: P.dim, width: 1.2, dash: [4, 4], alpha: 0.85 }); continue; }
      if (!crossing) { sc.tube(`arc${k}`, pts, { color: P.cyan, width: wArc, glow, alpha: inL ? 1 : 0.42, pick: false, occlude: false }); continue; }
      // where the arc pierces the dome: |arcPoint − C| = R
      const { C, R } = hz, cphi = clamp((r * r + C[0] * C[0] - R * R) / (2 * r * C[0]), -1, 1), phc = Math.acos(cphi), tc = (PI - phc) / PI;
      sc.tube(`arc${k}`, pts, { color: P.magenta, width: wArc, glow, pick: false, occlude: false, alpha: (t) => (t < tc - 0.015 ? 1 : t > tc + 0.015 ? 0.34 : 1 - 0.66 * (t - tc + 0.015) / 0.03) });
      cuts.push({ k, p: arcPoint(r, phc), n: v3.unit(v3.sub(arcPoint(r, phc), C)) });
    }
    cuts.forEach(({ k, p, n }) => {
      sc.ring(p, { key: `cut${k}`, color: P.magenta, r: 5 + 3 * bitsW, normal: n });
      sc.bead(p, { key: `heat${k}`, color: P.magenta, r: 2.6 + 3.6 * bitsW, glow: 0.95 });
      if (M.phase != null) {
        const t1 = [0, 1, 0], t2 = v3.unit(v3.cross(n, t1)), ph = M.phase;
        sc.circle(p, n, RHO, { color: P.violet, width: 1, alpha: 0.6, fade: false });
        sc.bead(v3.add(p, v3.add(v3.scale(t1, RHO * Math.cos(ph)), v3.scale(t2, RHO * Math.sin(ph)))), { key: `phase${k}`, color: P.violet, r: 3.3 });
      }
    });
    if (S.pulse != null) {
      const kr = cuts.length ? cuts[cuts.length - 1].k : 1;
      sc.bead([XQ(kr), 0, ZQ + 0.012], { key: 'reset', color: P.amber, r: 5 + 7 * (1 - S.pulse), glow: 1 });
    }

    /* the Page bars below the table */
    slab('pageBase', { x0: XCUT(0) - 0.1, x1: XCUT(12) + 0.1, y0: -0.12, y1: 0.12, z0: ZB - 0.05, z1: ZB }, P.lineHot);
    const tops = [], bell = [];
    M.curve.forEach((c) => {
      const x = XCUT(c.n), h = HB * c.bits;
      if (h > 1e-3) cylinder(`bar${c.n}`, [x, 0], ZB, h, RBAR, P.magenta);
      else cylinder(`bar${c.n}`, [x, 0], ZB, 0.006, RBAR, P.dim);
      tops.push([x, 0, ZB + Math.max(h, 0.006) + 0.004]);
      bell.push([x, 0, ZB + HB * Math.min(c.n, NQ - c.n) + 0.004]);
    });
    sc.line(tops, { color: P.magenta, width: 1.6, alpha: 0.9 });
    if (!M.heat) sc.line(bell, { color: P.ink, width: 1, dash: [3, 4], alpha: 0.5 });
    const hNow = HB * M.cut.bits, topNow = [XCUT(S.NA), 0, ZB + Math.max(hNow, 0.006) + 0.012];
    sc.ring(topNow, { key: 'pageNow', color: P.amber, r: 9, normal: UP });
    sc.line([[XCUT(S.NA), 0, TB.z0 - 0.004], topNow], { color: P.amber, width: 1.1, dash: [4, 4], alpha: 0.8 });

    /* the Schmidt dial */
    const th = M.theta, tip = dialAt(th);
    sc.surface('dial', (u, v) => [DO[0] + DR * 1.1 * u * Math.cos(v), 0.04, DO[2] + DR * 1.1 * u * Math.sin(v)],
      { u: [0, 1], v: [0, PI / 2], nu: 6, nv: 24, color: P.lineHot, grid: { every: [2, 6], color: P.ink, alpha: 0.2 }, pick: false });
    const arcD = (a0, a1, r = DR, n = 30) => Array.from({ length: n + 1 }, (_, i) => dialAt(a0 + (a1 - a0) * i / n, r));
    sc.fan([DO].concat(arcD(0, QMAX)), { fill: P.sigma, alpha: 0.1 });
    sc.line(arcD(0, PI / 2), { color: P.ink, width: 1.1, alpha: 0.7 });
    sc.line([DO, dialAt(0, DR + 0.07)], { color: P.cyan, width: 1.6 });
    sc.line([DO, dialAt(PI / 2, DR + 0.07)], { color: P.magenta, width: 1.6 });
    sc.line([DO, dialAt(QMAX, DR + 0.04)], { color: P.ink, width: 1.1, dash: [4, 4], alpha: 0.7 });
    sc.line([DO, dialAt(THETA_STAR, DR + 0.04)], { color: P.violet, width: 1.4, dash: [3, 3] });
    if (M.c > 1e-6) sc.tube('cosShadow', [DO, [DO[0] + DR * M.c, 0, DO[2]]], { color: P.cyan, width: 4, glow: 0.35, pick: false, occlude: false });
    if (M.s > 1e-6) sc.line([tip, [DO[0] + DR * M.c, 0, DO[2]]], { color: P.magenta, width: 1.6, dash: [3, 3] });
    sc.arrow(DO, tip, { color: P.amber, width: 2.6, headSize: 9 });
    sc.bead(tip, { key: 'schmidt', color: P.amber, r: 4.6 });
    sc.end();

    /* handles and labels */
    const qS = !thumb ? sc.p(tip) : null, qH = !thumb ? sc.p([hz.xR, 0, ZQ]) : null;
    for (const q of [qS, qH]) if (q) OBST.push({ x: q[0] - 18, y: q[1] - 18, w: 36, h: 36 });
    placeHandle(schmidtHandle, qS); placeHandle(horizonHandle, qH);
    if (!thumb) {
      if (hasDome && S.NA === NQ && !M.stone) at([hz.C[0], 0, ZQ + hz.R * 0.62], L('全局纯态 · S = 0', 'global pure state · S = 0'), 'raw c-cy backed', 9, [0, -1]);
      if (hasDome) at([hz.C[0], 0, ZQ + hz.R], `A · N<sub>A</sub> = ${S.NA}`, 'raw c-am backed', 8, [0, -1]);
      if (S.NA < NQ) at([(XQ(S.NA + 1) + XQ(NQ)) / 2, 0, TB.z0], `B · 12 − N<sub>A</sub> = ${NQ - S.NA}`, 'raw ink backed', 5, [0, 1]);
      if (M.stone) at([0, 0, ZQ + 0.5], L('积态 |00⟩ · 无纠缠', 'product |00⟩ · no entanglement'), 'raw ink backed', 8, [0, -1]);
      if (cuts.length) {
        const c0 = cuts[0], q = sc.p(c0.p), cq = sc.p(hz.C);
        at(c0.p, `S<sub>A</sub> = ${fix(M.bits, 6)} ${L('比特', 'bit')}`, 'raw c-mg backed', 7, [q[0] - cq[0] || 0.01, q[1] - cq[1] || -1]);
      }
      at(topNow, `S(A) = ${fix(M.cut.bits, 6)} ${L('比特', 'bits')}`, 'raw c-mg backed', 9, [1, -0.5]);
      at([XCUT(12) + 0.1, 0, ZB - 0.05], L('Page 柱 · N<sub>A</sub> = 0 … 12', 'Page bars · N<sub>A</sub> = 0 … 12'), 'raw ink backed', 4, [1, 0.8]);
      at(tip, `θ = ${fix(M.deg, 6)}°`, 'raw c-am backed', 9, [1, -0.7]);
      at(dialAt(0, DR + 0.07), '|00⟩', 'raw c-cy backed', 5, [1, 0.4]);
      at(dialAt(PI / 2, DR + 0.07), '|11⟩', 'raw c-mg backed', 5, [0.5, -1]);
      at(dialAt(THETA_STAR, DR + 0.04), 'θ*', 'raw c-vi backed', 6, [0.8, -0.9]);
      at(dialAt(QMAX, DR + 0.04), L('45° 热寂', '45° heat death'), 'raw ink backed', 3, [0.9, -1]);
      const cen = sc.p([0.3, 0, 0.1]);
      tags.forEach((t, k) => {
        const q = sc.p(t.p), dir = t.dir ? [t.dir[0], t.dir[1]] : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1];
        want(`t${k}`, q, t.html, t.cls, { pri: t.pri, dir, r: 12 });
      });
      placeLabels();
    }
    FRAME = { W, H, area: FIT.area, unit: sc.unit, cx: sc.cx, cy: sc.cy, cuts: cuts.length,
      handles: { schmidt: qS ? { x: qS[0], y: qS[1] } : null, horizon: qH ? { x: qH[0], y: qH[1] } : null } };
  }

  /* ---------- the two handles: buttons on the stage ---------- */
  const schmidtHandle = $('schmidtHandle'), horizonHandle = $('horizonHandle');
  let dragging = null;
  function placeHandle(el, q) {
    const show = !!q && !TRV.still;
    el.hidden = !show;
    if (!show) return;
    el.style.left = `${q[0].toFixed(1)}px`; el.style.top = `${q[1].toFixed(1)}px`;
  }
  const local = (ev) => { const b = stageEl.getBoundingClientRect(); return [ev.clientX - b.left - stageEl.clientLeft, ev.clientY - b.top - stageEl.clientTop]; };
  /** The Schmidt angle under the pointer: solve pointer − O = a·x̂ + b·ẑ in the projected dial plane, θ = atan2(b, a). */
  function thetaAt(ev) {
    const [x, y] = local(ev), o = sc.p(DO), ex = sc.p(v3.add(DO, [1, 0, 0])), ez = sc.p(v3.add(DO, [0, 0, 1]));
    const ax = ex[0] - o[0], ay = ex[1] - o[1], bx = ez[0] - o[0], by = ez[1] - o[1], px = x - o[0], py = y - o[1], det = ax * by - ay * bx;
    if (Math.abs(det) < 1e-9) return S.theta;
    const a = (px * by - py * bx) / det, b = (ax * py - ay * px) / det;
    let th = clamp(Math.atan2(b, a), 0, QMAX);
    if (Math.abs(th - THETA_STAR) < 0.3 * DEG) th = THETA_STAR;      // quick snap to the exact fixed point
    return th;
  }
  /** The cut N_A whose table point projects nearest to the pointer. */
  function cutAt(ev) {
    const [x, y] = local(ev);
    let best = S.NA, bd = Infinity;
    for (const n of NS) { const q = sc.p([XCUT(n), 0, ZQ]), d = Math.hypot(q[0] - x, q[1] - y); if (d < bd) { bd = d; best = n; } }
    return best;
  }
  function wireHandle(el, which) {
    const end = (ev) => {
      if (!dragging || dragging.el !== el || (ev && ev.pointerId != null && ev.pointerId !== dragging.pointer)) return;
      try { if (el.hasPointerCapture(dragging.pointer)) el.releasePointerCapture(dragging.pointer); } catch (e) { /* already released */ }
      dragging = null; el.classList.remove('dragging'); paint();
    };
    el.addEventListener('pointerdown', (ev) => {
      if (ev.button > 0 || TRV.still) return;
      ev.preventDefault(); ev.stopPropagation();
      leave();
      dragging = { el, which, pointer: ev.pointerId }; el.classList.add('dragging');
      try { el.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events carry no capture */ }
    });
    el.addEventListener('pointermove', (ev) => {
      if (!dragging || dragging.el !== el || ev.pointerId !== dragging.pointer) return;
      ev.preventDefault();
      if (which === 'schmidt') setTheta(thetaAt(ev)); else setNA(cutAt(ev));
    });
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) el.addEventListener(type, end);
    el.addEventListener('keydown', (ev) => {
      if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight') return;
      ev.preventDefault(); ev.stopPropagation(); leave();
      const k = ev.key === 'ArrowRight' ? 1 : -1;
      if (which === 'schmidt') setTheta(S.theta + k * 0.5 * DEG); else setNA(S.NA + 2 * k);
    });
  }
  wireHandle(schmidtHandle, 'schmidt'); wireHandle(horizonHandle, 'horizon');

  /* ---------- HUD, legend, readouts ---------- */
  function hudText(M) {
    const c = M.cut.crossing;
    const big = `S(A) = ${fix(M.cut.bits, 6)} ${L('比特', 'bits')} · N<sub>A</sub> = ${S.NA}/12`;
    let sub;
    if (M.stone) sub = L('θ = 0°：积态 |00⟩，没有弧被切断，T<sub>eff</sub> = 0（冻石）', 'θ = 0°: product state |00⟩, no arc severed, T<sub>eff</sub> = 0 (frozen stone)');
    else if (c === 0) sub = `${L('全局纯态', 'global pure state')} S<sub>global</sub> = 0.000000 · θ = ${fix(M.deg, 6)}° · ${L('关联扇区 9/15 = 60% 不入局部边缘', 'correlation sector 9/15 = 60% unseen by local marginals')}`;
    else sub = `${c} × S<sub>A</sub> = ${c} × ${fix(M.bits, 6)} · ${M.theta === THETA_STAR ? 'θ* = cos θ* = ' : 'θ = '}${fix(M.deg, 6)}° · k<sub>B</sub>T<sub>eff</sub>/ΔE = ${num(M.T)}`;
    if (S.pulse != null) sub = `${L('朗道尔复位 1 比特', 'Landauer reset of 1 bit')} · Q ≥ k<sub>B</sub>T<sub>eff</sub> ln 2 = ${num(M.landBit)} ΔE`;
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    const items = [
      M.stone ? ['ghost', L('积态：弧上没有纠缠', 'product: no entanglement on the arcs')] : ['cy', L('未被切断的纯纠缠弧', 'unsevered pure pairs')],
      ['mg', L('被视界切断的弧 · 熵热', 'arcs severed by the horizon · entropy heat')],
      ['am', L('视界与施密特矢量（当前）', 'horizon and Schmidt vector (current)')],
      ['vi', L('模流相位 · θ*', 'modular phase · θ*')]
    ];
    $('legend').innerHTML = items.map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  function drawText(M) {
    const c = M.cut.crossing;
    $('roPage').innerHTML = `${fix(M.cut.bits, 6)} ${L('比特', 'bits')}`;
    $('roPageSub').innerHTML = ` · ${fix(M.cut.nats, 6)} ${L('奈特', 'nats')} = ${c} × ${fix(M.S, 6)} · S<sub>global</sub> = 0.000000`;
    $('roShares').innerHTML = `${fix(M.p, 6)} + ${fix(M.q, 6)} = ${fix(M.sum, 6)} (${fix(100 * M.p, 2)}% + ${fix(100 * M.q, 2)}%)`;
    $('roPurity').innerHTML = `Tr ρ<sub>A</sub>² = ${fix(M.purity, 6)} · cos 2θ = ${fix(M.bias, 6)} (${fix(100 * M.bias, 2)}%)`;
    $('roEntropy').innerHTML = `${fix(M.S, 6)} ${L('奈特', 'nats')} = ${fix(M.bits, 6)} ${L('比特', 'bits')} · D(ρ<sub>A</sub> ‖ I/2) = ${fix(M.D, 6)} ${L('奈特', 'nats')} = ${fix(M.D / LN2, 6)} ${L('比特', 'bits')}`;
    $('roTemp').innerHTML = `2 ln cot θ = ${num(M.beta)} · k<sub>B</sub>T<sub>eff</sub>/ΔE = ${num(M.T)} · a<sub>U</sub> = 2πck<sub>B</sub>T<sub>eff</sub>/ħ = ${num(M.accel)} ΔE c/ħ`;
    $('roHeat').innerHTML = `dE/dS = k<sub>B</sub>T<sub>eff</sub> = ${num(M.T)} ΔE · Q ≥ k<sub>B</sub>T<sub>eff</sub> ln 2 = ${num(M.landBit)} ΔE`;
    $('roNote').innerHTML = L('十二个比特的整体始终是纯态（S = 0）：熵只来自视界切断的那几条弧；模流转动相位，不改变 ρ<sub>A</sub>。', 'All twelve qubits stay in a pure state (S = 0): the entropy comes only from the arcs the horizon severs; the modular flow turns phases and leaves ρ<sub>A</sub> unchanged.');
    $('pagePill').innerHTML = `S(A) <strong>${fix(M.cut.bits, 6)}</strong>`;
    $('tempPill').innerHTML = `T<sub>eff</sub> <strong>${num(M.T)} ΔE</strong>`;
    $('hint').innerHTML = L('拖琥珀矢量改 θ · 拖穹顶右脚改 N<sub>A</sub> · 拖空白处转视角', 'drag the amber vector for θ · the right foot of the dome for N<sub>A</sub> · empty space to orbit');
    $('formula').innerHTML = 'S(A) = min(N<sub>A</sub>, 12 − N<sub>A</sub>) · S<sub>A</sub>(θ) · βΔE = 2 ln cot θ';
  }

  /* the small SVG chart of the readouts: S_A(θ) on the left, the Page bars S(N_A) on the right */
  let miniKey = '';
  function drawMini(M) {
    const key = `${TRV.lang()}|${M.theta}|${S.NA}`;
    if (key === miniKey) return;
    miniKey = key;
    const ax = (deg) => 10 + 112 * deg / 45, ay = (b) => 78 - 60 * b;
    const curve = Array.from({ length: 91 }, (_, i) => { const d = i / 2; return `${ax(d).toFixed(1)},${ay(pair(d * DEG).bits).toFixed(1)}`; }).join(' ');
    const bx = (n) => 146 + 104 * n / 12, by = (b) => 78 - 60 * b / 6;
    const bars = M.curve.map((c) => `<rect class="mg" x="${(bx(c.n) - 4.5).toFixed(1)}" y="${by(c.bits).toFixed(1)}" width="9" height="${Math.max(0.6, 78 - by(c.bits)).toFixed(1)}"></rect>`).join('');
    const env = NS.map((n) => `${bx(n).toFixed(1)},${by(Math.min(n, NQ - n)).toFixed(1)}`).join(' ');
    const cur = M.curve.find((c) => c.n === S.NA);
    $('miniChart').innerHTML = `<svg viewBox="0 0 260 96" role="img" aria-label="${L('S_A(θ) 与 Page 柱', 'S_A(θ) and the Page bars')}">`
      + `<text class="t" x="10" y="10">S<tspan baseline-shift="sub" font-size="7">A</tspan>(θ) · ${L('比特', 'bits')}</text>`
      + `<line class="ax" x1="10" y1="78" x2="122" y2="78"></line><line class="ref" x1="10" y1="18" x2="122" y2="18"></line>`
      + `<line class="vi" x1="${ax(THETA_STAR / DEG).toFixed(1)}" y1="16" x2="${ax(THETA_STAR / DEG).toFixed(1)}" y2="78"></line>`
      + `<polyline class="cy" points="${curve}"></polyline>`
      + `<circle class="am" cx="${ax(M.deg).toFixed(1)}" cy="${ay(M.bits).toFixed(1)}" r="3"></circle>`
      + `<text x="10" y="90">0°</text><text x="122" y="90" text-anchor="end">45°</text><text x="${(ax(THETA_STAR / DEG) - 2).toFixed(1)}" y="90" text-anchor="end">θ*</text>`
      + `<text class="t" x="146" y="10">S(N<tspan baseline-shift="sub" font-size="7">A</tspan>) · ${L('比特', 'bits')}</text>`
      + `<line class="ax" x1="140" y1="78" x2="256" y2="78"></line><polyline class="ref" points="${env}"></polyline>${bars}`
      + (cur ? `<rect class="amr" x="${(bx(cur.n) - 6.5).toFixed(1)}" y="${(by(cur.bits) - 2).toFixed(1)}" width="13" height="${(80 - by(cur.bits)).toFixed(1)}"></rect>` : '')
      + `<text x="${bx(0).toFixed(1)}" y="90" text-anchor="middle">0</text><text x="${bx(6).toFixed(1)}" y="90" text-anchor="middle">6</text><text x="${bx(12).toFixed(1)}" y="90" text-anchor="middle">12</text>`
      + `<text x="256" y="22" text-anchor="end">6</text></svg>`;
  }

  /* ---------- strip plot: along the modular time s the phase turns and the entropy stays ---------- */
  function drawPlot(M) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    $('plotTitle').textContent = L('沿模流时间 s：相位在转，熵不动', 'Along the modular time s: the phase turns, the entropy stays');
    const g = kit.plot(cv, { x: [0, TAU], y: [0, 1.16], pad: [40, 12, 10, 22] });
    g.axes({ xTicks: [[0, '0'], [PI / 2, 'π/2'], [PI, 'π'], [1.5 * PI, '3π/2'], [TAU, '2π']], yTicks: [0, 0.5, 1], xLabel: 's' });
    const yS = M.cut.bits / 6;
    g.hline(yS, P.magenta, { width: 2.2 });
    g.text(TAU * 0.99, Math.min(1.1, yS + 0.08), `S(A)/6 = ${fix(yS, 6)}`, P.magenta, { align: 'right', size: 10 });
    if (M.rate != null && M.rate > 0) {
      let seg = [], prev = -1;
      for (let i = 0; i <= 480; i++) {
        const s = TAU * i / 480, y = ((s * M.rate) / TAU) % 1;
        if (y < prev) { g.line(seg, P.violet, { width: 1.8 }); seg = []; }
        seg.push([s, y]); prev = y;
      }
      if (seg.length > 1) g.line(seg, P.violet, { width: 1.8 });
    } else if (M.rate === 0) g.hline(0.004, P.violet, { width: 1.8 });
    g.text(0.12, 1.06, M.rate == null ? L('θ = 0：没有模流', 'θ = 0: no modular flow') : 'φ/2π = s · 2 ln cot θ / 2π', P.violet, { align: 'left', size: 10 });
    g.vline(S.s, P.amber, { alpha: 0.85 });
    if (M.phase != null) g.dot(S.s, M.phase / TAU, P.amber, 3.6);
    g.dot(S.s, yS, P.amber, 3.6);
    $('plotMeta').innerHTML = M.phase == null ? `S(A) = ${fix(M.cut.bits, 6)}` : `φ = s · 2 ln cot θ = ${fix(M.phase / DEG, 2)}° · S(A) = ${fix(M.cut.bits, 6)}`;
  }

  const paint = kit.painter(() => {
    const M = model();
    hudText(M); TRV.hudFit();
    drawStage(M); drawText(M); drawPlot(M); drawMini(M);
  }, [stageEl, $('plot')]);

  /* ---------- the rail: the modular time s ---------- */
  const playBtn = $('playBtn'), flowBtn = $('flowBtn');
  const flowLabel = (on) => { flowBtn.innerHTML = `<span class="zh">模流 ${on ? '❚❚' : '▶'}</span><span class="en">Modular flow ${on ? '❚❚' : '▶'}</span>`; flowBtn.setAttribute('aria-pressed', String(on)); };
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: TAU, t: 0, rate: 0.6, step: PI / 12, loop: true,
    format: (t) => `s ${fix(t, 3)} <small>/ 2π</small>`,
    onChange: (t, C) => { S.s = t; playBtn.textContent = C.playing ? '❚❚' : '▷'; playBtn.setAttribute('aria-pressed', String(C.playing)); flowLabel(C.playing); paint(); }
  });
  /** After a pointer click on one of the page's own buttons, hand the focus to the stage (as kit does for cards). */
  const toStage = (ev) => {
    (TRV.solids || []).forEach((x) => x.refresh());
    if (!ev || !(ev.detail > 0)) return;
    if (!stageEl.hasAttribute('tabindex')) stageEl.setAttribute('tabindex', '-1');
    stageEl.focus({ preventScroll: true });
  };
  playBtn.addEventListener('click', () => clock.toggle());
  $('rewindBtn').addEventListener('click', () => { clock.pause(); clock.set(0); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  flowBtn.addEventListener('click', (ev) => { clock.toggle(); toStage(ev); });

  /* ---------- controls ---------- */
  let transition = null, booting = true, pulseTween = null;
  const leave = () => { if (transition) transition.cancel(); transition = null; S.naShown = S.NA; cards.mark(null); };
  const landmark = (th) => (th < 1e-12 ? '0' : Math.abs(th - 30 * DEG) < 1e-12 ? '30' : Math.abs(th - THETA_STAR) < 1e-12 ? 'star' : Math.abs(th - QMAX) < 1e-12 ? '45' : null);
  function setTheta(th, quiet) {
    S.theta = clamp(th, 0, QMAX);
    fTheta.set(S.theta / DEG); thetaChips.set(landmark(S.theta), true);
    if (!quiet) paint();
  }
  function setNA(v, quiet) {
    const n = clamp(2 * Math.round(v / 2), 0, NQ);
    S.NA = n; S.naShown = n; fNA.set(n);
    if (!quiet) paint();
  }
  const fTheta = kit.field($('theta'), { fmt: (v) => `${fix(v, 6)}°`, onInput: (v) => { leave(); setTheta(clamp(v, 0, 45) * DEG); } });
  const fNA = kit.field($('horizon'), { fmt: (v) => `${Math.round(v)}/12 · f = ${fix(Math.round(v) / NQ, 2)}`, out: $('oHorizon'), onInput: (v) => { leave(); setNA(v); } });
  const thetaChips = kit.chips($('thetaChips'), 'theta', (v) => { leave(); setTheta(v === 'star' ? THETA_STAR : Number(v) * DEG); });
  $('snapDottie').addEventListener('click', (ev) => { leave(); setTheta(THETA_STAR); toStage(ev); });
  $('naDown').addEventListener('click', (ev) => { leave(); setNA(S.NA - 2); toStage(ev); });
  $('naUp').addEventListener('click', (ev) => { leave(); setNA(S.NA + 2); toStage(ev); });
  /** The Landauer pulse: a magenta shell leaves the horizon while one cut qubit is reset (one bit erased). */
  function pulse() {
    if (pulseTween) pulseTween.cancel();
    const M = model();
    S.pulses += 1; S.pulse = 0;
    S.lastPulse = { bitsErased: 1, heatBoundOverDE: fin(M.landBit), heatBoundInfinite: M.landBit === Infinity, thetaDeg: M.deg, NA: S.NA };
    pulseTween = kit.tween(1500, (e) => { S.pulse = e; paint(); }, () => { S.pulse = null; paint(); });
  }
  $('resetBtn').addEventListener('click', (ev) => { pulse(); toStage(ev); });
  kit.keys({ d: () => { leave(); setTheta(THETA_STAR); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'omniscient-zero': { theta: 45, na: 12, play: false, still: 0 },
    'isolated-zeno': { theta: 0, na: 6, play: false, still: 0 },
    'horizon-page-curve': { theta: 45, na: 6, play: false, still: 0 },
    'modular-unruh-heat': { theta: 30, na: 6, play: true, still: 2 },
    'dottie-living-steady': { theta: 'star', na: 6, play: true, still: PI }
  };
  const NOTES = {
    'omniscient-zero': ['N<sub>A</sub> = 12：琥珀穹顶罩住全部 12 个比特，θ = 45° 的六条青色贝尔弧都在穹顶里，没有一条被切断；下方 Page 柱的琥珀环落在 N<sub>A</sub> = 12 处，高度为 0：全局纯态 S = 0。', 'N<sub>A</sub> = 12: the amber dome covers all 12 qubits and the six cyan Bell arcs (θ = 45°) lie inside it, none severed; the amber ring of the Page bars below sits at N<sub>A</sub> = 12 with height 0: the global pure state has S = 0.'],
    'isolated-zeno': ['θ = 0：刻度盘上的琥珀矢量躺在 |00⟩ 轴上，每一对都是积态，弧只剩灰色虚线；穹顶切过它们却没有品红切口，S<sub>A</sub> = 0、T<sub>eff</sub> = 0，Page 柱全部为零。', 'θ = 0: the amber vector of the dial lies on the |00⟩ axis, every pair is a product state and the arcs are only grey dashes; the dome passes through them with no magenta cut, S<sub>A</sub> = 0, T<sub>eff</sub> = 0, and every Page bar is zero.'],
    'horizon-page-curve': ['N<sub>A</sub> = 6：琥珀穹顶的右脚落在第 6、7 个比特之间，六条贝尔弧全被切断（品红），每条 1 比特：S(A) = 6.000000 比特，正是 Page 柱的峰；两侧的柱按 0、2、4、6、4、2、0 比特排开，N<sub>A</sub> = 12 时回到 0。', 'N<sub>A</sub> = 6: the right foot of the amber dome sits between qubits 6 and 7, all six Bell arcs are severed (magenta), one bit each: S(A) = 6.000000 bits, the peak of the Page bars, which run 0, 2, 4, 6, 4, 2, 0 bits and return to 0 at N<sub>A</sub> = 12.'],
    'modular-unruh-heat': ['θ = 30°：每个品红切口上的紫色相位珠以 2 ln cot θ = 1.098612 的速率随模流时间 s 绕圈，S(A) = 4.867669 比特不变；谱匹配温度 k<sub>B</sub>T<sub>eff</sub>/ΔE = 0.910239，按一次朗道尔脉冲，擦除 1 比特至少放热 0.630930 ΔE。', 'θ = 30°: on every magenta cut the violet phase bead circles at the rate 2 ln cot θ = 1.098612 per unit of modular time s while S(A) = 4.867669 bits stays fixed; the spectrum-matched temperature is k<sub>B</sub>T<sub>eff</sub>/ΔE = 0.910239, and a Landauer pulse erasing 1 bit releases at least 0.630930 ΔE.'],
    'dottie-living-steady': ['θ* = cos θ* = 0.73908513 rad = 42.346459°：琥珀矢量停在紫色 θ* 刻线上，介于 0° 的冻石与 45° 的热寂之间；S<sub>A</sub> = 0.993820 比特，序偏 cos 2θ* = 9.25%，k<sub>B</sub>T<sub>eff</sub>/ΔE = 5.390324，相位珠缓慢绕圈。', 'θ* = cos θ* = 0.73908513 rad = 42.346459°: the amber vector rests on the violet θ* ray, between the frozen stone at 0° and heat death at 45°; S<sub>A</sub> = 0.993820 bits, order bias cos 2θ* = 9.25%, k<sub>B</sub>T<sub>eff</sub>/ΔE = 5.390324, and the phase beads circle slowly.']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'omniscient-zero': ['全视界：六条青色贝尔弧都在琥珀穹顶里，没有切口，全局纯态 S = 0。', 'Full horizon: all six cyan Bell arcs lie inside the amber dome, nothing is cut, the global pure state has S = 0.'],
    'isolated-zeno': ['θ = 0 的积态：弧只剩灰色虚线，没有品红切口，S = 0 且 T = 0。', 'Product state at θ = 0: the arcs are grey dashes, no magenta cut, S = 0 and T = 0.'],
    'horizon-page-curve': ['半视界切断六条贝尔弧，每条 1 比特：Page 柱的峰是 6.000000 比特。', 'The half horizon severs six Bell arcs, one bit each: the Page peak is 6.000000 bits.'],
    'modular-unruh-heat': ['θ = 30°：紫色相位珠绕切口转，熵不变；模温度 0.910239 ΔE。', 'θ = 30°: the violet phase beads circle the cuts while the entropy stays; modular temperature 0.910239 ΔE.'],
    'dottie-living-steady': ['琥珀矢量停在紫色 θ* = 42.346459° 上，介于冻石 0° 与热寂 45° 之间。', 'The amber vector rests on the violet θ* = 42.346459°, between the stone at 0° and heat death at 45°.']
  };
  function applyPreset(id) {
    const p = PRESETS[id], th = p.theta === 'star' ? THETA_STAR : p.theta * DEG;
    clock.pause();
    if (transition) transition.cancel();
    transition = null;
    sc.view(VIEW0, booting || TRV.still ? 0 : 600);
    S.NA = p.na; fNA.set(p.na);
    const from = { theta: S.theta, na: S.naShown };
    const finish = () => { S.naShown = p.na; setTheta(th, true); paint(); };
    if (booting || TRV.still) finish();
    else transition = kit.tween(600, (e) => { S.theta = from.theta + (th - from.theta) * e; S.naShown = from.na + (p.na - from.na) * e; fTheta.set(S.theta / DEG); paint(); }, finish);
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still);
    else clock.set(0);
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) kit.autoplay(clock, stageEl); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? Object.assign({}, NOTES, FIGURE_NOTES) : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拉 θ 与 N<sub>A</sub>、拖琥珀矢量与穹顶右脚、打开模流或按一次朗道尔脉冲。随时可以再选一张卡。', 'Free play: pull θ and N<sub>A</sub>, drag the amber vector and the right foot of the dome, run the modular flow or fire a Landauer pulse. Pick a card again at any time.']
  });
  // the tour bar's card title carries the id #tourStep
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.HORIZON_THERMO_DEBUG = Object.freeze({
    get state() {
      const M = model();
      return JSON.parse(JSON.stringify({
        preset: cards.current, t: clock.t, playing: clock.playing, modularTime: S.s,
        thetaRad: S.theta, thetaDeg: S.theta / DEG, NA: S.NA, horizonShown: S.naShown, fraction: M.f,
        cos2: M.p, sin2: M.q, weightSum: M.sum, orderBias: M.bias, purity: M.purity,
        entropyNats: M.S, entropyBits: M.bits, relEntropyToMixedNats: M.D, relEntropyToMixedBits: M.D / LN2,
        betaDeltaE: fin(M.beta), betaDeltaEInfinite: M.beta === Infinity, tempRatio: fin(M.T), tempRatioInfinite: M.T === Infinity,
        crossingPairs: M.cut.crossing, insidePairs: M.cut.inside, outsidePairs: M.cut.outside, severedArcs: M.stone ? 0 : M.cut.crossing,
        pageNats: M.cut.nats, pageBits: M.cut.bits, globalEntropy: 0,
        pageCurve: M.curve.map((c) => ({ NA: c.n, crossing: c.crossing, nats: c.nats, bits: c.bits })),
        modularRate: M.rate, modularPhase: M.phase,
        firstLaw: firstLaw(S.theta), gibbs: gibbs(S.theta),
        landauer: { perBitOverDE: fin(M.landBit), perBitInfinite: M.landBit === Infinity, eraseOverDE: fin(M.landSA), eraseInfinite: M.landSA === Infinity },
        thetaStar: THETA_STAR, thetaStarDeg: THETA_STAR / DEG,
        unruhAcceleration: fin(M.accel), unruhAccelerationInfinite: M.accel === Infinity,
        leanInstances: { product: PRODUCT, bell: BELL, blindSpot: blindSpotInstance(S.theta), access: accessInstance(S.theta), escape: ESCAPE, pinching: pinchingInstance(S.theta),
          entropyProduction: entropyProductionInstance(S.theta), mutualInformation: mutualInformationInstance(S.theta), landauer: landauerInstance(M), dpi: dpiInstance(M), dottie: DOTTIE },
        pulses: S.pulses, pulse: S.pulse, lastPulse: S.lastPulse,
        camera: Object.assign({}, sc.cam), handles: FRAME ? FRAME.handles : null, labels: PLACED, stageFrame: FRAME
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card; the clock keeps its course). */
    setState(o) {
      leave();
      if (o.thetaRad != null) setTheta(o.thetaRad, true);
      if (o.thetaDeg != null) setTheta(o.thetaDeg * DEG, true);
      if (o.NA != null) setNA(o.NA, true);
      if (o.s != null) { clock.pause(); clock.set(clamp(o.s, 0, TAU)); }
      paint();
    },
    /** Viewport coordinates of a handle ('schmidt' or 'horizon'), or null when it is hidden. */
    handleBox(which) { const el = which === 'horizon' ? horizonHandle : schmidtHandle; if (el.hidden) return null; const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates of the dial point at angle deg, and of the table point of the cut n (drag targets). */
    dialPoint(deg) { const b = stageEl.getBoundingClientRect(), q = sc.p(dialAt(deg * DEG)); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] }; },
    cutPoint(n) { const b = stageEl.getBoundingClientRect(), q = sc.p([XCUT(n), 0, ZQ]); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] }; }
  });
  window.TRV_THUMB = () => { cards.pick('horizon-page-curve'); clock.pause(); clock.set(0); sc.view([VIEW0[0], VIEW0[1], 1], 0); paint.now(); };
  cards.pick(cards.initial('horizon-page-curve'));
  booting = false;
  paint();
})();
