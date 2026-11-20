/* OMEGA//QM-AXIOMS · 五大公设沙盘 · Five postulates from one spinor body (Chapter 39, §39.3)
   World (kit.solid): z up. Two objects and one ledger station:
     spinor body  the violet torus is the stereographic image of the Hopf preimage of the xz-meridian of the Bloch
                  sphere: the spinors e^{iχ}(cos u, sin u), u = θ/2. In the orthonormal coordinates
                  y = ((x1 + x4), (x2 − x3), (x1 − x4), (x2 + x3))/√2 of ℂ² = ℝ⁴ they are (e^{iα}, e^{iβ})/√2 with
                  α = χ − u, β = χ + u (a Clifford torus); projecting from y4 = 1 gives (cos α, sin α, cos β)/(√2 − sin β),
                  a torus of revolution with radii √2 and 1. The magenta circle is the fibre S¹ = {e^{iχ}ψ} (u fixed),
                  the thin cyan circle the real section through the spinor (χ fixed); they cross at 90° (the projection
                  is conformal). The amber bead is the spinor, the amber handle drags it over the torus.
     base S²      the glass Bloch sphere; its violet meridian is the image of the whole torus under the Hopf map, the
                  cyan arrow the Bloch vector r = (sin θ, 0, cos θ).
     ledger       one station beside the sphere whose drawing follows the postulate: κ columns (I), the spectrum disc
                  and the uncertainty plate (II), the trine stacks (III), the Hilbert–Schmidt stack (IV), the CHSH
                  column (V).
   The rail turns the hidden phase χ ∈ [0°, 360°] of the spinor (of Alice's analyzer ray in V). Every number is
   computed here with 2 × 2 and 4 × 4 complex matrices; the instances of the cited Lean theorems are in instances().
   Read-only probe: window.OMEGA_QM_DEBUG. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI,
    TAU = 2 * PI,
    deg = PI / 180,
    S2 = Math.SQRT2;
  const cs = Math.cos,
    sn = Math.sin,
    hypot = Math.hypot;
  const lerp = (a, b, u) => a + (b - a) * u;
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  const add = (a, b) => a.map((x, i) => x + b[i]);
  const sub3 = (a, b) => a.map((x, i) => x - b[i]);
  const scale = (a, k) => a.map((x) => x * k);
  const fmt = (x, d = 4) => (!Number.isFinite(x) ? '∞' : (Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toFixed(d));
  const signed = (x, d = 4) => (Number.isFinite(x) && Math.abs(x) >= 0.5 * 10 ** -d && x < 0 ? '−' + fmt(-x, d) : fmt(x, d));
  const wrap = (d) => ((d % 360) + 360) % 360;

  /* ---------- complex numbers [re, im] and small complex matrices (arrays of rows) ---------- */
  const C = (re, im = 0) => [re, im];
  const cmul = (x, y) => [x[0] * y[0] - x[1] * y[1], x[0] * y[1] + x[1] * y[0]];
  const cadd = (x, y) => [x[0] + y[0], x[1] + y[1]];
  const conj = (x) => [x[0], -x[1]];
  const cabs2 = (x) => x[0] * x[0] + x[1] * x[1];
  const mmul = (X, Y) => X.map((row) => Y[0].map((_, j) => row.reduce((s, x, k) => cadd(s, cmul(x, Y[k][j])), C(0))));
  const madd = (X, Y) => X.map((row, i) => row.map((x, j) => cadd(x, Y[i][j])));
  const msub = (X, Y) => X.map((row, i) => row.map((x, j) => [x[0] - Y[i][j][0], x[1] - Y[i][j][1]]));
  const msc = (X, z) => X.map((row) => row.map((x) => cmul(x, z)));
  const adj = (X) => X[0].map((_, j) => X.map((row) => conj(row[j])));
  const kron = (X, Y) => X.flatMap((xr) => Y.map((yr) => xr.flatMap((x) => yr.map((y) => cmul(x, y)))));
  const ident = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => C(i === j ? 1 : 0)));
  const trace = (X) => X.reduce((s, row, i) => cadd(s, row[i]), C(0));
  const hs2 = (X) => X.flat().reduce((s, x) => s + cabs2(x), 0);
  const gap = (X, Y) => Math.max(...X.flatMap((row, i) => row.map((x, j) => hypot(x[0] - Y[i][j][0], x[1] - Y[i][j][1]))));
  const outer = (v, w) => v.map((a) => w.map((b) => cmul(a, conj(b))));
  const apply = (X, v) => X.map((row) => row.reduce((s, x, k) => cadd(s, cmul(x, v[k])), C(0)));
  const inner = (v, w) => v.reduce((s, a, k) => cadd(s, cmul(conj(a), w[k])), C(0));
  const vnorm = (v) => Math.sqrt(v.reduce((s, a) => s + cabs2(a), 0));
  const I2 = ident(2),
    SX = [[C(0), C(1)], [C(1), C(0)]],
    SY = [[C(0), C(0, -1)], [C(0, 1), C(0)]],
    SZ = [[C(1), C(0)], [C(0), C(-1)]];
  /** The observable n·σ for the analyzer direction at angle a (from +z towards +x) in the xz-plane. */
  const axisOp = (a) => madd(msc(SZ, C(cs(a))), msc(SX, C(sn(a))));
  /** The Bloch vector of a unit spinor (z0, z1): (2 Re z̄0 z1, 2 Im z̄0 z1, |z0|² − |z1|²). */
  const blochOf = ([z0, z1]) => {
    const p = cmul(conj(z0), z1);
    return [2 * p[0], 2 * p[1], cabs2(z0) - cabs2(z1)];
  };
  /** Partial trace over the second factor of a 4 × 4 matrix on ℂ² ⊗ ℂ². */
  const traceEnv = (X) => [0, 1].map((i) => [0, 1].map((j) => cadd(X[2 * i][2 * j], X[2 * i + 1][2 * j + 1])));
  /** Pinching in the computational basis (the unread state of the z record). */
  const pinch = (X) => X.map((row, i) => row.map((x, j) => (i === j ? x : C(0))));
  const PHI_PLUS = [C(1 / S2), C(0), C(0), C(1 / S2)],
    PSI_MINUS = [C(0), C(1 / S2), C(-1 / S2), C(0)];
  // the trine of Appendix E in the xz-plane: r₁ = (0, 0, 1), r₂,₃ = (±√3/2, 0, −1/2)
  const TRINE = [
    [0, 0, 1],
    [Math.sqrt(3) / 2, 0, -0.5],
    [-Math.sqrt(3) / 2, 0, -0.5]
  ];
  const projector = (r) => msc(madd(I2, madd(madd(msc(SX, C(r[0])), msc(SY, C(r[1]))), msc(SZ, C(r[2])))), C(0.5));

  /* ---------- the state; during a card transition θ, ϑ, λ and γ blend from `from` to the state (kit.tween) ---------- */
  const state = { thetaDeg: 60, flipDeg: 90, lambda: 1, gammaDeg: 90, post: 1, from: null, blend: 1 };
  const KEYS = ['thetaDeg', 'flipDeg', 'lambda', 'gammaDeg'];
  function eff() {
    const out = {};
    for (const k of KEYS) out[k] = state.from && state.blend < 1 ? lerp(state.from[k], state[k], state.blend) : state[k];
    return out;
  }
  const presets = Object.fromEntries(
    [
      // every card parks at χ = 45°: for θ = 0° and 60° the spinor then faces the camera on the upper side of the torus
      ['postulate1-hopf-blindspot-ray', 1, 60, 90, 1, 90, true, 45],
      ['postulate2-hermitian-flip-uncertainty', 2, 0, 90, 1, 90, false, 45],
      ['postulate3-roundtrip-born-gleason-busch', 3, 60, 90, 1, 90, false, 45],
      ['postulate4-unitary-halting-pinch', 4, 60, 90, 1, 90, false, 45],
      ['postulate5-rkhs-tensor-tsirelson', 5, 0, 90, 1, 90, false, 45]
    ].map(([id, post, thetaDeg, flipDeg, lambda, gammaDeg, play, still]) => [id, { post, thetaDeg, flipDeg, lambda, gammaDeg, play, still }])
  );
  const ids = Object.keys(presets);

  /** Every number the page shows, from the parameters (θ, χ, ϑ, λ, γ in degrees except λ). */
  function calc({ thetaDeg, chiDeg, flipDeg, lambda, gammaDeg }) {
    const u = (thetaDeg * deg) / 2,
      chi = chiDeg * deg;
    const psi0 = [C(cs(u)), C(sn(u))],
      phase = C(cs(chi), sn(chi)),
      psi = psi0.map((z) => cmul(phase, z));
    const r = blochOf(psi),
      overlap = inner(psi0, psi);
    // II: A = σx, B = σy on ψ (the flip of X₁ = −iσx, X₂ = −iσy)
    const mean = (X) => inner(psi, apply(X, psi))[0];
    const mA = mean(SX),
      mB = mean(SY),
      mC = mean(SZ);
    const dA = Math.sqrt(Math.max(0, 1 - mA * mA)),
      dB = Math.sqrt(Math.max(0, 1 - mB * mB));
    // the eigenvalues of e^{iϑ} X₃, X₃ = −iσz = diag(−i, i)
    const turn = C(cs(flipDeg * deg), sn(flipDeg * deg));
    const eig = [cmul(turn, C(0, -1)), cmul(turn, C(0, 1))];
    // III: the z record and the trine of Appendix E
    const rho = outer(psi, psi);
    const p0 = trace(mmul(rho, outer([C(1), C(0)], [C(1), C(0)])))[0],
      p1 = trace(mmul(rho, outer([C(0), C(1)], [C(0), C(1)])))[0];
    const trineBorn = TRINE.map((rk) => (2 / 3) * trace(mmul(rho, projector(rk)))[0]);
    const trineCubic = TRINE.map((rk) => ((2 / 3) * (1 + rk[2] ** 3)) / 2);
    // IV: phase damping of strength λ; λ = 1 is the pinching
    const kept = hs2(pinch(rho)),
      coherence = hs2(msub(rho, pinch(rho)));
    const rhoL = madd(pinch(rho), msc(msub(rho, pinch(rho)), C(1 - lambda)));
    const local = hs2(rhoL),
      localCoherence = hs2(msub(rhoL, pinch(rhoL)));
    const rL = blochOf2(rhoL);
    // V: the singlet, Alice a = θ, a' = θ + γ, Bob b = θ + γ/2, b' = θ − γ/2
    const a = thetaDeg * deg,
      g = gammaDeg * deg;
    const ang = { a, a1: a + g, b: a + g / 2, b1: a - g / 2 };
    const E = (x, y) => inner(PSI_MINUS, apply(kron(axisOp(x), axisOp(y)), PSI_MINUS))[0];
    const corr = [E(ang.a, ang.b), E(ang.a, ang.b1), E(ang.a1, ang.b), E(ang.a1, ang.b1)];
    const S = corr[0] + corr[1] + corr[2] - corr[3];
    return {
      thetaDeg,
      chiDeg,
      flipDeg,
      lambda,
      gammaDeg,
      spinor: psi.map((z) => z.slice()),
      r,
      rNorm2: r[0] ** 2 + r[1] ** 2 + r[2] ** 2,
      overlap,
      kRay: cabs2(overlap),
      kS3: (1 + overlap[0]) / 2,
      means: { A: mA, B: mB, C: mC },
      dA,
      dB,
      product: dA * dB,
      bound: Math.abs(mC),
      eig,
      p0,
      p1,
      trineBorn,
      trineCubic,
      trineBornSum: trineBorn.reduce((s, x) => s + x, 0),
      trineCubicSum: trineCubic.reduce((s, x) => s + x, 0),
      kept,
      coherence,
      localCoherence,
      folded: coherence - localCoherence,
      local,
      rL,
      angles: { a: ang.a / deg, a1: ang.a1 / deg, b: ang.b / deg, b1: ang.b1 / deg },
      corr,
      S,
      absS: Math.abs(S)
    };
  }
  /** The Bloch vector of a 2 × 2 density matrix: (2 Re ρ₀₁, −2 Im ρ₀₁, ρ₀₀ − ρ₁₁). */
  function blochOf2(X) {
    return [2 * X[1][0][0], 2 * X[1][0][1], X[0][0][0] - X[1][1][0]];
  }
  /** The instances of the cited Lean theorems at the current parameters, computed here. */
  function instances(m) {
    const u = (m.thetaDeg * deg) / 2,
      psi0 = [C(cs(u)), C(sn(u))],
      psi = m.spinor,
      rho = outer(psi, psi);
    // rayKernel_*: a spinor (v₀, v₁) read as the unit quaternion q with s(q) = (q₀ + q₁i, −q₂ + q₃i)
    const toQ = (v) => [v[0][0], v[0][1], -v[1][0], v[1][1]],
      qm = (a, b) => [
        a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
        a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
        a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
        a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
      ],
      qd = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3],
      QI4 = [0, 1, 0, 0],
      QONE = [1, 0, 0, 0],
      hopfOf = (q) => qm(qm(q, QI4), [q[0], -q[1], -q[2], -q[3]]),
      kq = (a, b) => (1 + qd(a, b)) / 2,
      rayK = (a, b) => (2 * kq(a, b) - 1) ** 2 + (2 * kq(a, qm(b, QI4)) - 1) ** 2;
    const x0 = toQ(psi0),
      xq = toQ(psi),
      hx = hopfOf(xq);
    let phaseDrift = 0;
    for (let k = 0; k < 12; k++) {
      const c = [cs((k * PI) / 6), sn((k * PI) / 6), 0, 0];
      phaseDrift = Math.max(phaseDrift, Math.abs(rayK(qm(x0, c), QONE) - rayK(x0, QONE)), Math.abs(rayK(QONE, qm(x0, c)) - rayK(QONE, x0)));
    }
    const rayKernel = {
      fiber: rayK(x0, xq),
      value: rayK(xq, QONE),
      hopf: Math.abs(rayK(xq, QONE) - (1 + qd(hx, hopfOf(QONE))) / 2),
      born: Math.abs(rayK(xq, QONE) - cabs2(inner(psi, [C(1), C(0)]))),
      phaseDrift,
      bloch: Math.max(...blochOf2(outer(psi, psi)).map((v, i) => Math.abs(v - [hx[3], hx[2], hx[1]][i])))
    };
    // a balanced split of the rotor S that takes |0⟩ to ψ₀: A = S(I + iσz)/2, B = S(I − iσz)/2
    const Sr = [[C(cs(u)), C(-sn(u))], [C(sn(u)), C(cs(u))]];
    const A = msc(mmul(Sr, madd(I2, msc(SZ, C(0, 1)))), C(0.5)),
      B = msc(mmul(Sr, msub(I2, msc(SZ, C(0, 1)))), C(0.5));
    const half = msc(I2, C(0.5)),
      cross = mmul(A, adj(B));
    const rsig = madd(madd(msc(SX, C(m.r[0])), msc(SY, C(m.r[1]))), msc(SZ, C(m.r[2])));
    // Robertson–Schrödinger with A = σx, B = σy
    const centred = (X, mean) => apply(X, psi).map((z, k) => [z[0] - mean * psi[k][0], z[1] - mean * psi[k][1]]);
    const vA = centred(SX, m.means.A),
      vB = centred(SY, m.means.B);
    const nA = vnorm(vA) ** 2,
      nB = vnorm(vB) ** 2,
      uv = inner(vA, vB);
    const cov = 0.5 * inner(psi, apply(madd(mmul(SX, SY), mmul(SY, SX)), psi))[0] - m.means.A * m.means.B;
    const comm = cmul(C(0, -0.5), inner(psi, apply(msub(mmul(SX, SY), mmul(SY, SX)), psi)));
    const G = nA * nB - cabs2(uv);
    // no common eigenvector of σx and σz: the eigen-residuals of ψ
    const resid = (X) => vnorm(centred(X, inner(psi, apply(X, psi))[0]));
    // the z record: weights, Tr(ρ P₀) and the unread state as the mixture of conditional states
    const P0 = outer([C(1), C(0)], [C(1), C(0)]),
      P1 = outer([C(0), C(1)], [C(0), C(1)]);
    const w = [trace(mmul(rho, P0))[0], trace(mmul(rho, P1))[0]];
    const conditional = [P0, P1];
    const mixture = madd(msc(conditional[0], C(w[0])), msc(conditional[1], C(w[1])));
    // energy eigenstate stationarity: H = σz, v = |0⟩, t = 1.3
    const t = 1.3,
      U = [[C(cs(t), -sn(t)), C(0)], [C(0), C(cs(t), sn(t))]],
      rv = outer([C(1), C(0)], [C(1), C(0)]);
    // Stinespring for phase damping of strength λ: K₀ = √(1 − λ/2) I, K₁ = √(λ/2) σz, V = Σ K_k ⊗ |k⟩_E
    const k0 = Math.sqrt(1 - m.lambda / 2),
      k1 = Math.sqrt(m.lambda / 2),
      K = [msc(I2, C(k0)), msc(SZ, C(k1))];
    const krausSum = madd(mmul(adj(K[0]), K[0]), mmul(adj(K[1]), K[1]));
    const V = [0, 1].flatMap((i) => [0, 1].map((e) => K[e][i]));
    const joint = mmul(mmul(V, rho), adj(V));
    const channel = madd(mmul(mmul(K[0], rho), adj(K[0])), mmul(mmul(K[1], rho), adj(K[1])));
    const rhoL = madd(pinch(rho), msc(msub(rho, pinch(rho)), C(1 - m.lambda)));
    // Bell: Φ⁺ (the Lean bellVector) and the singlet Ψ⁻
    const bell = outer(PHI_PLUS, PHI_PLUS),
      singlet = outer(PSI_MINUS, PSI_MINUS),
      marg = traceEnv(bell);
    // classical CHSH over the 16 deterministic answer tables
    let classicalMax = 0;
    for (let k = 0; k < 16; k++) {
      const [x0, x1, y0, y1] = [0, 1, 2, 3].map((b) => ((k >> b) & 1 ? 1 : -1));
      classicalMax = Math.max(classicalMax, Math.abs(x0 * y0 + x0 * y1 + x1 * y0 - x1 * y1));
    }
    // Landau: S² = 4I − [A₀, A₁] ⊗ [B₀, B₁] for the page's analyzers
    const g = m.angles,
      A0 = axisOp(g.a * deg),
      A1 = axisOp(g.a1 * deg),
      B0 = axisOp(g.b * deg),
      B1 = axisOp(g.b1 * deg);
    const Sop = msub(madd(madd(kron(A0, B0), kron(A0, B1)), kron(A1, B0)), kron(A1, B1));
    const commA = msub(mmul(A0, A1), mmul(A1, A0)),
      commB = msub(mmul(B0, B1), mmul(B1, B0));
    const S2op = mmul(Sop, Sop),
      landau = msub(msc(ident(4), C(4)), kron(commA, commB));
    // the Lean CHSH witness: Alice Z, X; Bob (Z ± X)/√2, on Φ⁺
    const bob0 = msc(madd(SZ, SX), C(1 / S2)),
      bob1 = msc(msub(SZ, SX), C(1 / S2));
    const witness = msub(madd(madd(kron(SZ, bob0), kron(SZ, bob1)), kron(SX, bob0)), kron(SX, bob1));
    return {
      unitGram: { inner: m.overlap, distance: vnorm(psi.map((z, k) => cadd(z, cmul(C(-1), psi0[k])))), norms: [vnorm(psi0), vnorm(psi)] },
      blochNorm: { r: m.r, norm: Math.sqrt(m.rNorm2) },
      blochSurjective: { preimage: psi0, residual: Math.max(...blochOf(psi0).map((x, i) => Math.abs(x - m.r[i]))) },
      rayKernel,
      commonPhase: { value: inner(psi, apply(outer(psi0, psi0), psi)), H: outer(psi0, psi0) },
      balanced: { unitary: gap(mmul(Sr, adj(Sr)), I2), sum: gap(madd(A, B), Sr), halfA: gap(mmul(A, adj(A)), half), halfB: gap(mmul(B, adj(B)), half), skew: gap(adj(cross), msc(cross, C(-1))), cross: gap(cross, msc(rsig, C(0, 0.5))) },
      robertson: { lhs: nA * nB, covariance: cov, commutatorHalf: comm, G, identity: Math.abs(nA * nB - (cov * cov + cabs2(comm) + G)), reCov: Math.abs(uv[0] - cov), imComm: hypot(uv[1] - comm[0], comm[1]) },
      pauli: { residualX: resid(SX), residualZ: resid(SZ) },
      born: { weights: w, traceForm: trace(mmul(rho, P0))[0], overlap2: cabs2(inner([C(1), C(0)], psi)), unread: gap(pinch(rho), mixture) },
      effect: { born: m.trineBornSum, cubic: m.trineCubicSum, effects: gap(TRINE.reduce((s, rk) => madd(s, msc(projector(rk), C(2 / 3))), msc(I2, C(0))), I2) },
      stationary: { t, unitary: gap(mmul(U, adj(U)), I2), drift: gap(mmul(mmul(U, rv), adj(U)), rv) },
      idempotent: { gap: gap(pinch(pinch(rho)), pinch(rho)) },
      pythagoras: { total: hs2(rho), kept: hs2(pinch(rho)), folded: hs2(msub(rho, pinch(rho))) },
      stinespring: { kraus: gap(krausSum, I2), isometry: gap(mmul(adj(V), V), I2), output: gap(traceEnv(joint), channel), channel: gap(channel, rhoL), purity: hs2(joint) },
      bell: { norm: vnorm(PHI_PLUS), idempotent: gap(mmul(bell, bell), bell), trace: trace(bell)[0], marginal: gap(marg, msc(I2, C(0.5))), marginalSquare: gap(mmul(marg, marg), marg), singletMarginal: gap(traceEnv(singlet), msc(I2, C(0.5))) },
      classical: { max: classicalMax },
      landau: { identity: gap(S2op, landau), collapse: gap(S2op, msc(ident(4), C(4))), commA: Math.sqrt(hs2(commA)), commB: Math.sqrt(hs2(commB)) },
      tsirelson: { witness: trace(mmul(bell, witness))[0], ceiling: 2 * S2, singlet: m.S }
    };
  }

  /* ---------- geometry of the stage ---------- */
  const stage = $('stage'),
    handle = $('spinorHandle');
  const cams = { lab: [-0.2, 0.46, 1] };
  const opts = { canvas: $('cv'), yaw: cams.lab[0], pitch: cams.lab[1], radius: 0.2, cx: 0.5, cy: 0.5, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const T_SCALE = 0.48,
    B_RADIUS = 0.74;
  let lay = null;
  /** The anchors: side by side on a wide stage, stacked (sphere above the torus) on a tall one. */
  function layoutFor(W, H) {
    if (W / H >= 1.12) return { wide: true, T0: [-1.34, 0, 0], B0: [0.82, 0, 0.05], L0: [2.08, -0.05, -0.62] };
    return { wide: false, T0: [0, 0, -0.98], B0: [-0.36, 0, 1.02], L0: [0.88, -0.05, 0.36] };
  }
  /** The Clifford torus: (e^{ia}, e^{ib})/√2 projected from y4 = 1. */
  const cliff = (a, b) => {
    const d = S2 - sn(b);
    return [cs(a) / d, sn(a) / d, cs(b) / d];
  };
  // the torus is turned by PHI0 about its own axis (an isometry of the drawing) so that the parked spinors face the camera
  const PHI0 = 260 * deg,
    C0 = cs(PHI0),
    S0 = sn(PHI0);
  const toWorld = (p) => add(lay.T0, scale([C0 * p[0] - S0 * p[1], S0 * p[0] + C0 * p[1], p[2]], T_SCALE));
  /** The outward normal of the projected torus (radii √2 and 1) at a projected point p. */
  const tNormal = (p) => {
    const rho = hypot(p[0], p[1]) || 1;
    return [p[0] - (S2 * p[0]) / rho, p[1] - (S2 * p[1]) / rho, p[2]];
  };
  /** The world point of the spinor e^{iχ}(cos u, sin u), lifted off the torus by `lift` (projected units). */
  const spinorPt = (u, chi, lift = 0.03) => {
    const p = cliff(chi - u, chi + u);
    return toWorld(add(p, scale(tNormal(p), lift)));
  };
  const onSphere = (v) => add(lay.B0, scale(v, B_RADIUS));
  const tube = (key, points, color, r, extra = {}) => sc.tube(key, points, { color, r, glow: 0.2, ...extra });
  const vertical = (base, h) => [base, add(base, [0, 0, h])];
  const H_LEDGER = 0.7,
    H_CHSH = 0.36;

  function drawTorus(m) {
    sc.surface('spinorBody', (a, b) => toWorld(cliff(TAU * a, TAU * b)), { u: [0, 1], v: [0, 1], nu: 120, nv: 60, color: P.violet, grid: { every: [10, 5], alpha: 0.1 } });
    const u = (m.thetaDeg * deg) / 2,
      chi = m.chiDeg * deg;
    // the fibre S¹ of the current ray, and the part the rail has turned
    tube('fibre', sample(160, (t) => spinorPt(u, t * TAU)), P.magenta, 0.014, { occlude: false });
    if (chi > 0.01) tube('fibreRun', sample(Math.max(8, Math.ceil(m.chiDeg / 3)), (t) => spinorPt(u, t * chi, 0.045)), P.magenta, 0.026, { occlude: false, glow: 0.35 });
    if (state.post <= 2) tube('realSection', sample(160, (t) => spinorPt(t * TAU, chi, 0.02)), P.cyan, 0.008, { occlude: false, glow: 0.3 });
    if (state.post === 1) {
      sc.ring(spinorPt(u, 0, 0.05), { color: P.magenta, r: 5, key: 'fibreStart', normal: tNormal(cliff(-u, u)) });
      sc.ring(spinorPt(u, PI, 0.05), { color: P.magenta, r: 5, key: 'antipode', normal: tNormal(cliff(PI - u, PI + u)) });
    }
    sc.bead(spinorPt(u, chi, 0.05), { color: P.amber, r: 5.2, key: 'cursor' });
    // one mark on the near side of the body and one on its far side: the far one is hidden by the body
    const mark = (phi, nu) => {
      const R = S2 + cs(nu),
        p = [R * cs(phi), R * sn(phi), sn(nu)];
      return toWorld(add(p, scale(tNormal(p), 0.035)));
    };
    sc.bead(mark(-PI / 2 - 0.5 - PHI0, 0.75), { color: P.violet, r: 4, key: 'seamFront' });
    sc.bead(mark(PI / 2 + 0.25 - PHI0, -1.05), { color: P.violet, r: 4, key: 'seamBack' });
  }
  function drawSphere(m) {
    const B0 = lay.B0;
    sc.glass('base', B0, B_RADIUS, { color: P.cyan, alpha: 0.06, rim: 0.4 });
    sc.circle(B0, [0, 1, 0], B_RADIUS, { color: P.violet, width: 1.6, alpha: 0.85 });
    sc.circle(B0, [0, 0, 1], B_RADIUS, { color: P.ink, width: 1, alpha: 0.35 });
    sc.line([onSphere([0, 0, -1.12]), onSphere([0, 0, 1.12])], { color: P.ink, width: 1, alpha: 0.4 });
    if (state.post === 5) {
      sc.bead(B0, { color: P.cyan, r: 5, key: 'mixedCentre' });
      return;
    }
    const r = state.post === 4 ? m.rL : m.r;
    if (hypot(...r) > 1e-6) sc.arrow(B0, onSphere(r), { color: P.cyan, width: 3, headSize: 11 });
    sc.bead(onSphere(r), { color: P.cyan, r: 4.2, key: 'blochPoint' });
  }
  /** The ledger station of the current postulate. */
  function drawLedger(m) {
    const L0 = lay.L0;
    const post = state.post;
    const unitLine = (h, x0, x1, color = P.sigma) => sc.line([add(L0, [x0, 0, h]), add(L0, [x1, 0, h])], { color, width: 1.4, dash: [4, 3], alpha: 0.9 });
    const stack = (key, x, parts, unit) => {
      let z = 0;
      parts.forEach(([value, color, extra], i) => {
        const h = Math.max(0, value) * unit;
        if (h > 0.004) tube(key + i, vertical(add(L0, [x, 0, z + 0.006]), Math.max(0.002, h - 0.012)), color, 0.05, extra || {});
        z += h;
      });
      return z;
    };
    if (post === 1) {
      stack('kRay', -0.13, [[m.kRay, P.cyan]], H_LEDGER);
      stack('kS3', 0.13, [[m.kS3, P.magenta]], H_LEDGER);
      unitLine(H_LEDGER, -0.24, 0.24);
    } else if (post === 2) {
      // the spectrum disc: the eigenvalues of e^{iϑ}X₃ turn from the imaginary axis (magenta) to the real axis (cyan)
      const c = add(L0, [0.04, 0, 1.08]),
        R = 0.26,
        at = (z) => add(c, [R * z[0], 0, R * z[1]]);
      sc.fan(sample(48, (t) => add(c, [R * 1.12 * cs(t * TAU), 0, R * 1.12 * sn(t * TAU)])), { fill: P.ink, alpha: 0.07 });
      sc.line([add(c, [-R * 1.25, 0, 0]), add(c, [R * 1.25, 0, 0])], { color: P.cyan, width: 2 });
      sc.line([add(c, [0, 0, -R * 1.25]), add(c, [0, 0, R * 1.25])], { color: P.magenta, width: 2 });
      for (const [k, z] of m.eig.entries()) {
        const start = k ? [0, 1] : [0, -1];
        const a0 = Math.atan2(start[1], start[0]);
        const swept = sample(24, (t) => at([cs(a0 + t * m.flipDeg * deg), sn(a0 + t * m.flipDeg * deg)]));
        if (m.flipDeg > 0.5) sc.line(swept, { color: P.violet, width: 1.4, dash: [3, 3] });
        sc.bead(at(z), { color: P.violet, r: 4.4, key: 'eigen' + k });
      }
      // the uncertainty plate: the corner (ΔA, ΔB) of the cyan rectangle cannot go below the magenta hyperbola ΔA·ΔB = |⟨σz⟩|
      const O = add(L0, [-0.32, 0, -0.02]),
        k = 0.46,
        top = 1.5,
        Q = (x, y) => add(O, [k * x, 0, k * y]);
      const b = m.bound;
      sc.line([Q(0, 0), Q(top, 0)], { color: P.ink, width: 1.2, alpha: 0.7 });
      sc.line([Q(0, 0), Q(0, top)], { color: P.ink, width: 1.2, alpha: 0.7 });
      if (b > 1e-3) {
        const x0 = Math.max(b / top, 0.02),
          x1 = Math.min(top, b / 0.02),
          curve = sample(48, (t) => Q(x0 * (x1 / x0) ** t, b / (x0 * (x1 / x0) ** t)));
        sc.fan([Q(0, 0), Q(0, top), ...curve, Q(top, 0)], { fill: P.magenta, alpha: 0.1 });
        sc.line(curve, { color: P.magenta, width: 2.2 });
      }
      if (m.dA > 1e-4 && m.dB > 1e-4) sc.fan([Q(0, 0), Q(m.dA, 0), Q(m.dA, m.dB), Q(0, m.dB)], { fill: P.cyan, alpha: 0.12, color: P.cyan, width: 1.6 });
      sc.bead(Q(m.dA, m.dB), { color: P.cyan, r: 4.4, key: 'uncertaintyCorner' });
    } else if (post === 3) {
      stack('born', -0.14, m.trineBorn.map((v, i) => [v, P.cyan, { glow: 0.15 + 0.12 * i }]), H_LEDGER);
      stack('cubic', 0.14, m.trineCubic.map((v, i) => [v, P.magenta, { glow: 0.15 + 0.12 * i }]), H_LEDGER);
      unitLine(H_LEDGER, -0.26, 0.26);
    } else if (post === 4) {
      stack('hs', 0, [[m.kept, P.cyan], [m.localCoherence, P.magenta], [m.folded, P.magenta, { alpha: 0.55, glow: 0.6 }]], H_LEDGER);
      unitLine(H_LEDGER, -0.16, 0.16);
    } else {
      stack('chsh', 0, [[m.absS, P.cyan]], H_CHSH);
      sc.circle(add(L0, [0, 0, 2 * H_CHSH]), [0, 0, 1], 0.13, { color: P.magenta, width: 2.4, fade: false });
      sc.circle(add(L0, [0, 0, 2 * S2 * H_CHSH]), [0, 0, 1], 0.13, { color: P.sigma, width: 1.8, fade: false, dash: [3, 3] });
    }
  }
  /** Postulate overlays on the Bloch sphere and between the two objects. */
  function drawOverlay(m) {
    const B0 = lay.B0,
      post = state.post,
      u = (m.thetaDeg * deg) / 2;
    if (post === 1) {
      // the whole fibre goes to one point: dashed rays from six points of the circle to r
      for (let k = 0; k < 6; k++)
        sc.line([spinorPt(u, (k * TAU) / 6, 0.05), onSphere(m.r)], { color: P.cyan, width: 1, dash: [2, 5], alpha: 0.45 });
    } else if (post === 2) {
      for (const v of [[1, 0, 0], [0, 1, 0], [0, 0, 1]]) sc.line([onSphere(scale(v, -1)), onSphere(v)], { color: P.cyan, width: 1.4, alpha: 0.75 });
    } else if (post === 3) {
      const z = m.r[2];
      tube('axisZero', [onSphere([0, 0, -1]), onSphere([0, 0, z])], P.cyan, 0.022);
      if (1 - z > 1e-4) tube('axisOne', [onSphere([0, 0, z]), onSphere([0, 0, 1])], P.sigma, 0.016);
      sc.line([onSphere(m.r), onSphere([0, 0, z])], { color: P.cyan, width: 1.2, dash: [3, 3] });
      sc.ring(onSphere([0, 0, 1]), { color: P.sigma, r: 5, key: 'ket0', normal: [0, 0, 1] });
      sc.ring(onSphere([0, 0, -1]), { color: P.sigma, r: 5, key: 'ket1', normal: [0, 0, 1] });
      for (const rk of TRINE.slice(1)) sc.line([B0, onSphere(rk)], { color: P.sigma, width: 1.3, alpha: 0.8 });
    } else if (post === 4) {
      const z = m.r[2],
        foot = onSphere([0, 0, z]);
      if (Math.abs(m.r[0]) > 1e-4) sc.circle(foot, [0, 0, 1], B_RADIUS * Math.abs(m.r[0]), { color: P.cyan, width: 1.2, dash: [3, 4], fade: false, alpha: 0.7 });
      if (Math.abs(z) > 1e-4) tube('kept', [B0, foot], P.cyan, 0.02);
      if (Math.abs(m.rL[0]) > 1e-4) tube('local', [foot, onSphere([m.rL[0], 0, z])], P.magenta, 0.016);
      if (Math.abs(m.r[0] - m.rL[0]) > 1e-4) sc.line([onSphere([m.rL[0], 0, z]), onSphere([m.r[0], 0, z])], { color: P.magenta, width: 1.4, dash: [3, 3] });
      sc.line([B0, onSphere(m.r)], { color: P.sigma, width: 1.2, dash: [2, 4], alpha: 0.7 });
      sc.ring(onSphere([0, 0, 1]), { color: P.sigma, r: 5, key: 'stationary', normal: [0, 0, 1] });
    } else {
      const g = m.angles;
      const dir = (a) => [sn(a * deg), 0, cs(a * deg)];
      for (const [a, color, w] of [[g.a, P.sigma, 2.6], [g.a1, P.sigma, 2.6], [g.b, P.ink, 1.8], [g.b1, P.ink, 1.8]])
        sc.arrow(B0, onSphere(scale(dir(a), 0.98)), { color, width: w, headSize: 9 });
    }
  }

  /* ---------- tags, HUD and legend ---------- */
  function placeTags(m) {
    const post = state.post,
      L0 = lay.L0,
      tag = (k, p, html, cls) => sc.tag(k, p, html, 'raw backed ' + cls);
    tag('body', toWorld([-1.2, -1.6, 1.25]), '𝕋₃ ≅ S³', 'c-vi');
    tag('base', onSphere([-0.2, -0.3, 1.32]), 'S² ≅ ℂP¹', 'c-ik');
    if (post === 1) {
      tag('fibre', spinorPt((m.thetaDeg * deg) / 2, -PI / 4, 0.6), 'S¹ = e<sup>iχ</sup>ψ', 'c-mg');
      tag('kRay', add(L0, [-0.13, 0, m.kRay * H_LEDGER + 0.16]), 'κ<sub>ray</sub>', 'c-cy');
      tag('kS3', add(L0, [0.24, 0, m.kS3 * H_LEDGER + 0.16]), 'κ<sub>S³</sub>', 'c-mg');
    } else if (post === 2) {
      tag('flip', add(L0, [0.04, 0, 1.48]), 'e<sup>iϑ</sup>X₃', 'c-vi');
      tag('product', add(L0, [-0.32 + 0.46 * m.dA - 0.2, 0, 0.46 * m.dB + 0.1]), 'ΔA·ΔB', 'c-cy');
      tag('bound', add(L0, [0.42, 0, 0.18]), '|⟨σ<sub>z</sub>⟩|', 'c-mg');
    } else if (post === 3) {
      tag('p0', onSphere([-0.38, 0, (m.r[2] - 1) / 2]), fmt(m.p0, 2), 'c-cy');
      tag('p1', onSphere([-0.38, 0, (m.r[2] + 1) / 2 + 0.06]), fmt(m.p1, 2), 'c-ik');
      tag('born', add(L0, [-0.14, 0, -0.16]), 'Σ = ' + fmt(m.trineBornSum, 2), 'c-cy');
      tag('cubic', add(L0, [0.2, 0, m.trineCubicSum * H_LEDGER + 0.14]), fmt(m.trineCubicSum, 2), 'c-mg');
    } else if (post === 4) {
      tag('kept', add(L0, [-0.36, 0, (m.kept * H_LEDGER) / 2]), fmt(m.kept, 3), 'c-cy');
      tag('folded', add(L0, [0.36, 0, (m.kept + m.localCoherence + m.folded / 2) * H_LEDGER]), fmt(m.coherence, 3), 'c-mg');
      tag('flow', onSphere([0.72, 0, m.r[2] + 0.22]), 'U<sub>t</sub>', 'c-cy');
    } else {
      tag('chsh', add(L0, [-0.34, 0, m.absS * H_CHSH]), '|S|', 'c-cy');
      tag('classical', add(L0, [0.34, 0, 2 * H_CHSH]), '2', 'c-mg');
      tag('ceiling', add(L0, [0.38, 0, 2 * S2 * H_CHSH + 0.02]), '2√2', 'c-ik');
      tag('mixed', add(lay.B0, [0, 0, -0.22]), '½I', 'c-cy');
    }
  }
  const POST_NAME = [
    ['公理一 · 霍普夫盲区', 'I · HOPF BLIND SPOT'],
    ['公理二 · 厄米翻转', 'II · HERMITIAN FLIP'],
    ['公理三 · 往返玻恩', 'III · ROUND-TRIP BORN'],
    ['公理四 · 停机捏合', 'IV · HALTING PINCH'],
    ['公理五 · 张量与 CHSH', 'V · TENSOR AND CHSH']
  ];
  function keyValue(m) {
    switch (state.post) {
      case 1:
        return `‖r‖² = ${fmt(m.rNorm2)}`;
      case 2:
        return `ΔA·ΔB = ${fmt(m.product)}`;
      case 3:
        return `P₀ + P₁ = ${fmt(m.p0 + m.p1)}`;
      case 4:
        return `${fmt(m.kept)} + ${fmt(m.coherence)} = ${fmt(m.kept + m.coherence)}`;
      default:
        return `|S| = ${fmt(m.absS)}`;
    }
  }
  function subline(m) {
    const th = Math.round(m.thetaDeg),
      chi = Math.round(m.chiDeg);
    switch (state.post) {
      case 1:
        return L(
          `χ = ${chi}°：琥珀珠沿品红纤维走，青色的点 r = (${fmt(m.r[0])}, 0, ${fmt(m.r[2])}) 不动。`,
          `χ = ${chi}°: the amber bead runs along the magenta fibre; the cyan point r = (${fmt(m.r[0])}, 0, ${fmt(m.r[2])}) stays put.`
        );
      case 2:
        return L(
          `θ = ${th}°：ϑ = ${Math.round(m.flipDeg)}° 把本征值转到实轴；青色角 (ΔA, ΔB) 贴着品红界 ${fmt(m.bound)}。`,
          `θ = ${th}°: ϑ = ${Math.round(m.flipDeg)}° turns the eigenvalues onto the real axis; the cyan corner (ΔA, ΔB) touches the magenta bound ${fmt(m.bound)}.`
        );
      case 3:
        return L(
          `θ = ${th}°：影子把直径分成 ${fmt(m.p0, 2)} 与 ${fmt(m.p1, 2)}；三叉戟青柱和为 1，三次假设的品红柱是 ${fmt(m.trineCubicSum, 2)}。`,
          `θ = ${th}°: the shadow splits the diameter into ${fmt(m.p0, 2)} and ${fmt(m.p1, 2)}; the cyan trine stack sums to 1, the magenta cubic stack to ${fmt(m.trineCubicSum, 2)}.`
        );
      case 4:
        return L(
          `λ = ${fmt(m.lambda, 2)}：对角留下 ${fmt(m.kept, 3)}，品红的相干 ${fmt(m.coherence, 3)} 中有 ${fmt(m.folded, 3)} 折进环境，总和仍是 1。`,
          `λ = ${fmt(m.lambda, 2)}: the diagonal keeps ${fmt(m.kept, 3)}; of the magenta coherence ${fmt(m.coherence, 3)}, ${fmt(m.folded, 3)} is folded into the environment and the total stays 1.`
        );
      default:
        return L(
          `γ = ${Math.round(m.gammaDeg)}°：局部态停在球心 ½I；青柱 |S| = ${fmt(m.absS)}，品红环是经典界 2。`,
          `γ = ${Math.round(m.gammaDeg)}°: each local state sits at the centre, ½I; the cyan column is |S| = ${fmt(m.absS)}, the magenta ring the classical bound 2.`
        );
    }
  }
  function legendItems() {
    const base = [['vi', L('旋量体 S³', 'spinor body S³')]];
    switch (state.post) {
      case 1:
        return [...base, ['mg', L('盲区纤维 S¹ 与 κ<sub>S³</sub>', 'blind fibre S¹, κ<sub>S³</sub>')], ['cy', L('布洛赫点与 κ<sub>ray</sub>', 'Bloch point, κ<sub>ray</sub>')], ['am', L('当前旋量', 'current spinor')]];
      case 2:
        return [...base, ['mg', L('虚轴与禁区', 'imaginary axis, forbidden')], ['cy', L('实轴与 ΔA × ΔB', 'real axis, ΔA × ΔB')], ['am', L('当前旋量', 'current spinor')]];
      case 3:
        return [...base, ['cy', L('玻恩权重', 'Born weights')], ['mg', L('三次假设', 'cubic guess')], ['sg', L('三叉戟轴', 'trine axes')]];
      case 4:
        return [...base, ['cy', L('留下的对角', 'kept diagonal')], ['mg', L('相干与折走的部分', 'coherence, folded part')], ['sg', L('总和 1', 'total 1')]];
      default:
        return [...base, ['cy', L('量子 |S| 与 ½I', 'quantum |S|, ½I')], ['mg', L('经典界 2', 'classical bound 2')], ['sg', L('分析轴', 'analyzer axes')]];
    }
  }
  function hud(m) {
    $('hudBig').innerHTML = `${L(...POST_NAME[state.post - 1])} · ${keyValue(m)}`;
    $('hudSub').innerHTML = subline(m);
    $('legend').innerHTML = legendItems().map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  // keep each caption near its anchor; reserve the HUD and handle rectangles and the captions already placed
  function fitLabels() {
    if (TRV.thumbMode) return;
    const bounds = stage.getBoundingClientRect();
    const occupied = [$('hudTl'), $('legend'), handle].filter((el) => !el.hidden).map((el) => el.getBoundingClientRect());
    const tags = [...stage.querySelectorAll('.tags .tag:not([hidden])')];
    for (const tag of tags) tag.style.translate = '';
    const boxes = tags.map((tag) => tag.getBoundingClientRect());
    for (const [i, box] of boxes.entries()) {
      const dx = kit.clamp(0, bounds.left + 5 - box.left, bounds.right - 5 - box.right);
      const row = box.height + 4;
      for (let j = 0; j <= 2 * Math.ceil(bounds.height / row); j++) {
        const dy = Math.ceil(j / 2) * row * (j % 2 ? 1 : -1);
        const left = box.left + dx,
          right = box.right + dx,
          top = box.top + dy,
          bottom = box.bottom + dy;
        if (top < bounds.top + 4 || bottom > bounds.bottom - 4) continue;
        if (occupied.some((r) => left < r.right + 3 && right > r.left - 3 && top < r.bottom + 3 && bottom > r.top - 3)) continue;
        tags[i].style.translate = dx + 'px ' + dy + 'px';
        occupied.push({ left, right, top, bottom });
        break;
      }
    }
  }
  /** Fit the scene into the band between the title block and the legend (frozen while the handle is dragged). */
  function fit(W, H) {
    if (dragging != null && lay) return;
    lay = layoutFor(W, H);
    const { yaw, pitch } = sc.cam;
    const R = [cs(yaw), -sn(yaw), 0],
      U = [sn(yaw) * sn(pitch), cs(yaw) * sn(pitch), cs(pitch)];
    const pts = [];
    for (let i = 0; i < 24; i++)
      for (const nu of [0, PI / 2, PI, -PI / 2]) {
        const phi = (i / 24) * TAU,
          rr = S2 + cs(nu);
        pts.push(toWorld([rr * cs(phi), rr * sn(phi), sn(nu)]));
      }
    for (const v of [R, U]) for (const s of [-1, 1]) pts.push(add(lay.B0, scale(v, s * B_RADIUS * 1.04)));
    for (const [x, z] of [[-0.36, -0.06], [0.52, -0.06], [-0.36, 1.42], [0.52, 1.42]]) pts.push(add(lay.L0, [x, 0, z]));
    const xs = pts.map((p) => p[0] * R[0] + p[1] * R[1] + p[2] * R[2]),
      ys = pts.map((p) => -(p[0] * U[0] + p[1] * U[1] + p[2] * U[2]));
    const x0 = Math.min(...xs),
      x1 = Math.max(...xs),
      y0 = Math.min(...ys),
      y1 = Math.max(...ys);
    const sr = stage.getBoundingClientRect(),
      hr = $('hudTl').getBoundingClientRect(),
      lr = $('legend').getBoundingClientRect();
    const top = TRV.thumbMode ? 12 : Math.max(12, hr.bottom - sr.top + 8),
      bottom = TRV.thumbMode ? H - 12 : Math.min(H - 12, lr.top - sr.top - 8);
    const band = Math.max(60, bottom - top);
    const unit = Math.max(8, Math.min((W - 24) / (x1 - x0), band / (y1 - y0)));
    const cx = 12 + (W - 24 - unit * (x1 - x0)) / 2 - unit * x0,
      cy = top + (band - unit * (y1 - y0)) / 2 - unit * y0;
    opts.radius = unit / (Math.min(W, H) * (sc.cam.zoom || 1));
    opts.cx = cx / W;
    opts.cy = cy / H;
  }
  function drawStage(m) {
    const W = $('cv').clientWidth || stage.clientWidth,
      H = $('cv').clientHeight || stage.clientHeight;
    fit(W, H);
    sc.begin();
    drawTorus(m);
    drawSphere(m);
    drawOverlay(m);
    drawLedger(m);
    placeTags(m);
    sc.end();
    const at = spinorPt((m.thetaDeg * deg) / 2, m.chiDeg * deg, 0.05),
      q = sc.p(at);
    handle.hidden = TRV.still;
    // when the spinor goes round the back of the torus the handle stays usable but dims, as its bead is hidden
    handle.classList.toggle('behind', sc.occluded(at, 0.02));
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
    fitLabels();
  }

  /* ---------- strip plot: along the swept quantity of the postulate, what moves and what does not ---------- */
  function drawPlot(m) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    const post = state.post;
    const xs = (n, lo, hi) => sample(n, (t) => lerp(lo, hi, t));
    const pad = [32, 14, 12, 22];
    if (post === 1) {
      $('plotTitle').textContent = L('沿盲区相位 χ：旋量核摆动，射线核不动', 'Along the hidden phase χ: the spinor kernel swings, the ray kernel stays');
      $('plotMeta').textContent = 'κ_S³ = (1 + cos χ)/2 · κ_ray = 1';
      const g = kit.plot(cv, { x: [0, 360], y: [-0.05, 1.6], pad });
      g.axes({ xTicks: [0, 90, 180, 270, 360], yTicks: [0, 0.5, 1], xLabel: 'χ (°)' });
      g.line(xs(180, 0, 360).map((x) => [x, (1 + cs(x * deg)) / 2]), P.magenta, { width: 2 });
      g.line(xs(2, 0, 360).map((x) => [x, 1]), P.cyan, { width: 2 });
      g.vline(m.chiDeg, P.amber);
      g.dot(m.chiDeg, m.kS3, P.amber, 3.5);
      g.legend([[P.cyan, 'κ_{ray}'], [P.magenta, 'κ_{S³}']]);
    } else if (post === 2) {
      $('plotTitle').textContent = L('沿射线角 θ：ΔA·ΔB 恰好贴着下界 |⟨σz⟩|', 'Along the ray angle θ: ΔA·ΔB lies exactly on the bound |⟨σz⟩|');
      $('plotMeta').textContent = 'A = σx · B = σy · G = 0';
      const g = kit.plot(cv, { x: [0, 360], y: [-0.05, 1.6], pad });
      g.axes({ xTicks: [0, 90, 180, 270, 360], yTicks: [0, 0.5, 1], xLabel: 'θ (°)' });
      const curve = xs(240, 0, 360).map((x) => [x, Math.abs(cs(x * deg))]);
      g.line(curve, P.cyan, { width: 3.2 });
      g.line(curve, P.magenta, { width: 1.5, dash: [5, 4] });
      g.vline(m.thetaDeg, P.amber);
      g.dot(m.thetaDeg, m.product, P.amber, 3.5);
      g.legend([[P.cyan, 'ΔA·ΔB'], [P.magenta, '|⟨σ_{z}⟩|', 'dash']], { right: false, bottom: true });
    } else if (post === 3) {
      $('plotTitle').textContent = L('沿射线角 θ：两路往返读数之和恒为 1', 'Along the ray angle θ: the two round-trip readings always add to 1');
      $('plotMeta').textContent = 'P₀ = cos²(θ/2) · P₁ = sin²(θ/2)';
      const g = kit.plot(cv, { x: [0, 360], y: [-0.05, 1.6], pad });
      g.axes({ xTicks: [0, 90, 180, 270, 360], yTicks: [0, 0.5, 1], xLabel: 'θ (°)' });
      g.line(xs(180, 0, 360).map((x) => [x, cs((x * deg) / 2) ** 2]), P.cyan, { width: 2 });
      g.line(xs(180, 0, 360).map((x) => [x, sn((x * deg) / 2) ** 2]), P.sigma, { width: 2 });
      g.line(xs(2, 0, 360).map((x) => [x, 1]), P.ink, { width: 1.2, dash: [4, 3] });
      g.vline(m.thetaDeg, P.amber);
      g.dot(m.thetaDeg, m.p0, P.amber, 3.5);
      g.legend([[P.cyan, 'P_{0}'], [P.sigma, 'P_{1}']]);
    } else if (post === 4) {
      $('plotTitle').textContent = L('沿捏合强度 λ：对角不动，相干折进环境，总和仍为 1', 'Along the pinch strength λ: the diagonal stays, the coherence folds away, the total stays 1');
      $('plotMeta').textContent = '‖Φρ‖² + (1 − λ)²‖ρ − Φρ‖²';
      const g = kit.plot(cv, { x: [0, 1], y: [-0.05, 2.2], pad });
      g.axes({ xTicks: [0, 0.25, 0.5, 0.75, 1], yTicks: [0, 0.5, 1], xLabel: 'λ' });
      g.line(xs(2, 0, 1).map((x) => [x, m.kept]), P.cyan, { width: 2 });
      g.line(xs(60, 0, 1).map((x) => [x, (1 - x) ** 2 * m.coherence]), P.magenta, { width: 2 });
      g.line(xs(60, 0, 1).map((x) => [x, m.kept + (1 - x) ** 2 * m.coherence]), P.sigma, { width: 2 });
      g.line(xs(2, 0, 1).map((x) => [x, 1]), P.ink, { width: 1.2, dash: [4, 3] });
      g.vline(m.lambda, P.amber);
      g.dot(m.lambda, m.local, P.amber, 3.5);
      g.legend([[P.cyan, L('对角', 'diagonal')], [P.magenta, L('局部相干', 'local coherence')], [P.sigma, '‖ρ_{λ}‖²']]);
    } else {
      $('plotTitle').textContent = L('沿夹角 γ：量子 |S| 越过经典界 2，在 90° 碰到 2√2', 'Along γ: the quantum |S| passes the classical 2 and meets 2√2 at 90°');
      $('plotMeta').textContent = '|S| = |3cos(γ/2) − cos(3γ/2)|';
      const g = kit.plot(cv, { x: [0, 180], y: [0, 3.3], pad });
      g.axes({ xTicks: [0, 45, 90, 135, 180], yTicks: [0, 1, 2, 3], xLabel: 'γ (°)' });
      g.line(xs(180, 0, 180).map((x) => [x, Math.abs(3 * cs((x * deg) / 2) - cs((3 * x * deg) / 2))]), P.cyan, { width: 2 });
      g.hline(2, P.magenta, { width: 1.6 });
      g.hline(2 * S2, P.sigma, { width: 1.2, dash: [4, 3] });
      g.vline(m.gammaDeg, P.amber);
      g.dot(m.gammaDeg, m.absS, P.amber, 3.5);
      g.legend([[P.cyan, '|S|'], [P.magenta, '2'], [P.sigma, '2√2', 'dash']], { right: false, bottom: true });
    }
  }

  /* ---------- readouts ---------- */
  const KEY_LABEL = [
    ['布洛赫点的长度 ‖r‖²', 'Length of the Bloch point ‖r‖²'],
    ['不确定性 ΔA·ΔB 与下界 |⟨σz⟩|', 'Uncertainty ΔA·ΔB and the bound |⟨σz⟩|'],
    ['往返读数 P₀ + P₁', 'Round-trip readings P₀ + P₁'],
    ['对角 + 相干 = ‖ρ‖²', 'Diagonal + coherence = ‖ρ‖²'],
    ['CHSH 组合 |S|', 'CHSH combination |S|']
  ];
  function readings(m, I) {
    const post = state.post;
    $('roKeyLabel').innerHTML = L(...KEY_LABEL[post - 1]);
    const key = [
      [fmt(m.rNorm2), ` · r = (${signed(m.r[0])}, ${signed(m.r[1])}, ${signed(m.r[2])})`],
      [fmt(m.product), ` ≥ ${fmt(m.bound)} · G = ${fmt(I.robertson.G)}`],
      [fmt(m.p0 + m.p1), ` = ${fmt(m.p0)} + ${fmt(m.p1)}`],
      [fmt(m.kept + m.coherence), ` = ${fmt(m.kept)} + ${fmt(m.coherence)}`],
      [fmt(m.absS), ` > 2 · 2√2 = ${fmt(2 * S2)}`]
    ][post - 1];
    if (post === 5 && m.absS <= 2 + 5e-5) key[1] = ` ≤ 2 · 2√2 = ${fmt(2 * S2)}`;
    $('roKey').textContent = key[0];
    $('roKeySub').textContent = key[1];
    $('roPhase').textContent = `χ = ${fmt(m.chiDeg, 1)}° · r = (${signed(m.r[0])}, ${signed(m.r[1])}, ${signed(m.r[2])})`;
    $('roKernel').textContent = `κ_ray = ${fmt(m.kRay)} · κ_S³ = ${fmt(m.kS3)}`;
    $('roUncertainty').textContent = `${fmt(m.dA)} × ${fmt(m.dB)} = ${fmt(m.product)} ≥ ${fmt(m.bound)}`;
    $('roBorn').textContent = `${fmt(m.p0)} + ${fmt(m.p1)} · ${L('三叉戟', 'trine')} ${fmt(m.trineBornSum)} / ${fmt(m.trineCubicSum)}`;
    $('roPinch').textContent = `${fmt(m.kept)} + ${fmt(m.localCoherence)} + ${fmt(m.folded)} = ${fmt(m.kept + m.localCoherence + m.folded)}`;
    $('roChsh').textContent = `|S| = ${fmt(m.absS)} · ${L('经典', 'classical')} ${fmt(I.classical.max)}`;
    $('roNote').textContent = L(
      `(d_A d_B)² = 16 = 4 × 4（复局域层析）；实双比特 10 > 3 × 3 = 9。`,
      `(d_A d_B)² = 16 = 4 × 4 (complex local tomography); for two real qubits 10 > 3 × 3 = 9.`
    );
    $('postPill').innerHTML = `${L('公理', 'POSTULATE')} <strong>${['I', 'II', 'III', 'IV', 'V'][post - 1]}</strong>`;
    $('keyPill').innerHTML = `χ <strong>${Math.round(m.chiDeg)}°</strong>`;
    $('hint').textContent = L('拖琥珀手柄在环面上移动旋量 · 拖空白处转视角 · 空格转动 χ', 'drag the amber handle over the torus · drag empty space to orbit · Space turns χ');
    $('formula').textContent = 'ψ = e^{iχ}(cos θ/2, sin θ/2) · r = (sin θ, 0, cos θ)';
    for (const [id, post2] of [['flipField', 2], ['lambdaField', 4], ['gammaField', 5]]) $(id).hidden = state.post !== post2;
  }
  const paint = kit.painter(() => {
    const e = eff(),
      m = calc({ ...e, chiDeg: clock.t }),
      I = instances(m);
    hud(m);
    TRV.hudFit();
    drawStage(m);
    readings(m, I);
    drawPlot(m);
  }, [stage, $('plot')]);

  /* ---------- the rail: the hidden phase χ ---------- */
  const playBtn = $('playBtn');
  const clock = kit.clock({
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: true,
    rate: 40,
    step: 5,
    max: 360,
    format: (t) => 'χ ' + Math.round(t) + '°',
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      paint();
    }
  });
  playBtn.addEventListener('click', () => {
    stopBootPlay();
    clock.toggle();
  });
  for (const id of ['rew', 'rewindBtn'])
    $(id).addEventListener('click', () => {
      stopBootPlay();
      clock.pause();
      clock.set(0);
    });

  /* a page-local start for a card that plays inside a book: play once the stage is half in view, pause when it leaves,
     and let go for good as soon as the reader touches anything */
  let bootIO = null;
  function bootAutoplay() {
    if (TRV.still || !window.IntersectionObserver) return;
    let started = false;
    bootIO = new IntersectionObserver(
      (entries) => {
        const seen = entries[entries.length - 1].intersectionRatio >= 0.5;
        if (seen && !started) {
          started = true;
          clock.play();
        } else if (!seen && clock.playing) clock.pause();
      },
      { threshold: [0, 0.5, 1] }
    );
    bootIO.observe(stage);
  }
  function stopBootPlay() {
    if (bootIO) {
      bootIO.disconnect();
      bootIO = null;
    }
  }
  $('play').addEventListener('click', stopBootPlay, true);
  $('now').addEventListener('input', stopBootPlay, true);
  document.addEventListener('keydown', (ev) => { if ([' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) stopBootPlay(); }, true);

  /* ---------- controls ---------- */
  let transition = null,
    booting = true,
    dragging = null;
  function startBlend(from, ms) {
    if (transition) transition.cancel();
    state.from = from;
    state.blend = 0;
    const token = {};
    transition = token;
    token.cancel = () => {
      if (token.run) token.run.cancel();
      state.blend = 1;
      state.from = null;
    };
    token.run = kit.tween(
      ms,
      (e) => {
        state.blend = e;
        syncFields();
        paint();
      },
      () => {
        if (transition === token) transition = null;
        state.blend = 1;
        state.from = null;
        syncFields();
        paint();
      }
    );
  }
  /** The reader takes over: the shown values become the state, the clock pauses, no card is marked. */
  function leave() {
    stopBootPlay();
    const e = eff();
    if (transition) transition.cancel();
    transition = null;
    Object.assign(state, e, { from: null, blend: 1 });
    cards.mark(null);
    clock.pause();
  }
  const tf = kit.field($('rayTheta'), { fmt: (v) => v + '°', onInput: (v) => { leave(); state.thetaDeg = v; paint(); } });
  const ff = kit.field($('flipAngle'), { fmt: (v) => v + '°', onInput: (v) => { leave(); state.flipDeg = v; paint(); } });
  const lf = kit.field($('pinchLambda'), { fmt: (v) => v.toFixed(2), onInput: (v) => { leave(); state.lambda = v; paint(); } });
  const gf = kit.field($('pairGamma'), { fmt: (v) => v + '°', onInput: (v) => { leave(); state.gammaDeg = v; paint(); } });
  function syncFields() {
    const e = eff();
    tf.set(Math.round(e.thetaDeg));
    ff.set(Math.round(e.flipDeg));
    lf.set(Math.round(e.lambda * 100) / 100);
    gf.set(Math.round(e.gammaDeg));
  }

  /* ---------- experiment cards ---------- */
  const NOTES = {
    'postulate1-hopf-blindspot-ray': [
      '转动盲区相位 χ：琥珀珠绕品红纤维一整圈，青色的布洛赫点 r = (0.8660, 0, 0.5000) 纹丝不动；青柱 κ_ray 停在 1，品红柱 κ_S³ 随 χ 起落。',
      'Turn the hidden phase χ: the amber bead goes once round the magenta fibre while the cyan Bloch point r = (0.8660, 0, 0.5000) does not move; the cyan column κ_ray stays at 1, the magenta column κ_S³ rises and falls with χ.'
    ],
    'postulate2-hermitian-flip-uncertainty': [
      '在 |0⟩：两个紫色本征值从品红虚轴转 90° 落到青色实轴；青色矩形 ΔA × ΔB = 1 × 1 的角正好碰到品红界 |⟨σz⟩| = 1。',
      'At |0⟩: the two violet eigenvalues turn 90° from the magenta imaginary axis onto the cyan real axis; the corner of the cyan rectangle ΔA × ΔB = 1 × 1 just touches the magenta bound |⟨σz⟩| = 1.'
    ],
    'postulate3-roundtrip-born-gleason-busch': [
      'θ = 60°：青色箭头的影子把 z 直径分成 0.75 与 0.25；三叉戟的青柱和为 1，三次假设的品红柱冲到 1.25。',
      'θ = 60°: the shadow of the cyan arrow splits the z diameter into 0.75 and 0.25; the cyan trine stack sums to 1, the magenta cubic stack reaches 1.25.'
    ],
    'postulate4-unitary-halting-pinch': [
      '停机捏合 λ = 1：青色对角留下 0.625，品红相干 0.375 全部折进环境；琥珀旋量仍在环面上，总和仍是 1。',
      'Halting pinch λ = 1: the cyan diagonal keeps 0.625, the magenta coherence 0.375 is folded into the environment; the amber spinor stays on the torus and the total stays 1.'
    ],
    'postulate5-rkhs-tensor-tsirelson': [
      '单态：两地局部态都在球心 ½I；Alice 两轴张开 γ = 90°，青柱 |S| = 2.8284 越过品红经典环 2，碰到 2√2。',
      'The singlet: each local state sits at the centre, ½I; with the two axes of Alice opened to γ = 90° the cyan column |S| = 2.8284 passes the magenta classical ring 2 and reaches 2√2.'
    ]
  };
  // a cited figure has a fixed frame: one short sentence per card, no sub- or superscripts
  const FIGURE_NOTES = {
    'postulate1-hopf-blindspot-ray': ['χ 转动：琥珀珠绕品红纤维走，青色的点不动。', 'χ turns: the amber bead runs round the magenta fibre, the cyan point stays.'],
    'postulate2-hermitian-flip-uncertainty': ['|0⟩：本征值转到实轴，青角碰到品红界 1。', 'At |0⟩: the eigenvalues reach the real axis; the cyan corner touches the bound 1.'],
    'postulate3-roundtrip-born-gleason-busch': ['60°：直径分成 0.75 与 0.25，三次假设冲到 1.25。', 'At 60°: the diameter splits 0.75 and 0.25; the cubic guess reaches 1.25.'],
    'postulate4-unitary-halting-pinch': ['捏合：对角留下 0.625，相干 0.375 折走，总和 1。', 'Pinch: the diagonal keeps 0.625, the coherence 0.375 folds away; total 1.'],
    'postulate5-rkhs-tensor-tsirelson': ['单态：青柱 2.8284 越过品红经典环 2。', 'Singlet: the cyan column 2.8284 passes the magenta classical ring 2.']
  };
  function applyPreset(id) {
    const p = presets[id];
    stopBootPlay();
    clock.pause();
    const before = eff();
    if (transition) transition.cancel();
    transition = null;
    // the card's own process starts from its beginning: the flip from 0°, the pinch from λ = 0, Alice's pair from γ = 0
    const from = { ...before };
    if (p.post === 2) from.flipDeg = 0;
    if (p.post === 4) from.lambda = 0;
    if (p.post === 5) from.gammaDeg = 0;
    Object.assign(state, { thetaDeg: p.thetaDeg, flipDeg: p.flipDeg, lambda: p.lambda, gammaDeg: p.gammaDeg, post: p.post, from: null, blend: 1 });
    sc.view(cams.lab, booting || TRV.still ? 0 : 600);
    // a card that does not play, a still and a freshly opened full page all park on the declared frame
    if (TRV.still || !p.play || (booting && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still);
    else clock.set(0);
    if (!booting && !TRV.still) startBlend(from, 900);
    syncFields();
    if (p.play && !TRV.still && (!booting || TRV.embed)) {
      if (booting) bootAutoplay();
      else clock.play();
    }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets,
    notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES,
    noteEl: $('presetNote'),
    tour: $('tour'),
    onPick: applyPreset,
    idle: [
      '自由探索：拖琥珀手柄在环面上移动旋量，或拉 θ 与本公设的滑块。时间轴转动盲区相位 χ。随时可以再选一张卡。',
      'Free play: drag the amber handle over the torus, or pull θ and the slider of this postulate. The rail turns the hidden phase χ. Pick a card again at any time.'
    ]
  });
  const tourBody = $('tourBody');
  const markStep = () => {
    const b = tourBody.querySelector('b');
    if (b && b.id !== 'tourStep') b.id = 'tourStep';
  };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });

  /* ---------- the amber handle: drag the spinor over the torus, or use the arrow keys ---------- */
  const point = (thetaDeg, chiDeg) => {
    const q = sc.p(spinorPt((thetaDeg * deg) / 2, chiDeg * deg, 0.05)),
      r = $('cv').getBoundingClientRect();
    return { x: r.left + q[0], y: r.top + q[1] };
  };
  // (u, χ) and (u + π, χ + π) are the same spinor and the same point of the torus: whenever a step of the pointer or
  // of the arrow keys passes θ = 0° or 360°, θ wraps and χ turns by 180° with it, so the handle moves on smoothly
  function moveTo(thetaDeg, chiDeg) {
    const th = Math.round(thetaDeg),
      turns = Math.floor(th / 360);
    state.thetaDeg = th - 360 * turns;
    clock.set(Math.round(wrap(chiDeg - 180 * turns)) % 360);
    syncFields();
    paint();
  }
  handle.onpointerdown = (ev) => {
    if (ev.button !== 0 || TRV.still) return;
    ev.preventDefault();
    leave();
    dragging = ev.pointerId;
    handle.setPointerCapture(dragging);
    handle.classList.add('dragging');
  };
  handle.onpointermove = (ev) => {
    if (ev.pointerId !== dragging) return;
    const rect = $('cv').getBoundingClientRect(),
      x = ev.clientX - rect.left,
      y = ev.clientY - rect.top;
    const cur = { u: (state.thetaDeg * deg) / 2, chi: clock.t * deg };
    // the nearer of the two sheets wins (depth), and among equals the spinor stays close to where it was
    const score = (u, chi) => {
      const q = sc.p(spinorPt(u, chi, 0.05));
      return hypot(q[0] - x, q[1] - y) - 0.02 * q[2] * sc.unit + 1e-4 * (Math.abs(u - cur.u) + Math.abs(chi - cur.chi));
    };
    let best = null;
    for (let i = 0; i < 60; i++)
      for (let j = 0; j < 120; j++) {
        const u = (i / 60) * PI,
          chi = (j / 120) * TAU,
          d = score(u, chi);
        if (!best || d < best.d) best = { d, u, chi };
      }
    const coarse = { ...best };
    for (let i = -12; i <= 12; i++)
      for (let j = -12; j <= 12; j++) {
        const u = coarse.u + (i * PI) / 720,
          chi = coarse.chi + (j * TAU) / 1440,
          d = score(u, chi);
        if (d < best.d) best = { d, u, chi };
      }
    // the fine search may step past θ = 0° or 360°: moveTo carries χ across the seam, so the handle stays under the pointer
    moveTo((2 * best.u) / deg, best.chi / deg);
  };
  handle.onpointerup = (ev) => {
    if (handle.hasPointerCapture(ev.pointerId)) handle.releasePointerCapture(ev.pointerId);
  };
  handle.onpointercancel = handle.onpointerup;
  handle.onlostpointercapture = () => {
    dragging = null;
    handle.classList.remove('dragging');
    paint();
  };
  handle.onkeydown = (ev) => {
    const steps = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowDown: [-1, 0], ArrowUp: [1, 0] };
    if (!steps[ev.key] && ev.key !== 'Home' && ev.key !== 'End') return;
    ev.stopPropagation();
    ev.preventDefault();
    leave();
    if (ev.key === 'Home') return moveTo(state.thetaDeg, 0);
    if (ev.key === 'End') return moveTo(state.thetaDeg, 359);
    const [dt, dc] = steps[ev.key];
    moveTo(state.thetaDeg + dt, clock.t + dc);
  };
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));
  TRV.onLang(paint);

  /* ---------- probe, cover, start ---------- */
  window.OMEGA_QM_DEBUG = Object.freeze({
    get state() {
      const e = eff(),
        m = calc({ ...e, chiDeg: clock.t });
      return JSON.parse(
        JSON.stringify({
          ...m,
          post: state.post,
          t: clock.t,
          playing: clock.playing,
          preset: cards.current,
          blending: !!(state.from && state.blend < 1),
          camera: { ...sc.cam },
          wide: lay ? lay.wide : null,
          leanInstances: instances(m)
        })
      );
    },
    calc: (params) => JSON.parse(JSON.stringify(calc(params))),
    presets: JSON.parse(JSON.stringify(presets)),
    /** Viewport coordinates where the handle sits for the ray angle θ and the phase χ (degrees), for drag targets. */
    dragTarget: point
  });
  window.TRV_THUMB = () => {
    cards.pick(ids[0]);
    clock.pause();
    clock.set(45);
    paint.now();
  };
  cards.pick(cards.initial(ids[0]));
  booting = false;
  paint.now();
})();
