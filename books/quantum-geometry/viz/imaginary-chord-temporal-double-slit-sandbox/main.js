/* IMAG//TUNNEL · 虚平面割弦与阿秒时间双缝 · The imaginary chord and the attosecond time double slit
   World axes (kit.solid): x right = the propagation axis (nm, mapped by X()); z up = the real axis I (Re ψ); y into the
   screen at yaw 0 = the blind axis i (Im ψ). The vertical plane I and the horizontal plane i meet at right angles along
   x. Behind the axis stands the projection screen of I (the back wall, cyan shadow), below it that of i (the floor,
   magenta shadow); the barrier V₀ = 1 eV fills [0, L] (glass slab, footprints on both screens).
     barrier scene  the exact stationary state of the rectangular barrier for a real electron, ψ(x) e^{−iEt/ℏ}: the
                    incident helix e^{ikx}, the reflected one r e^{−ikx}, the field inside the wall and the
                    transmitted helix t e^{ikx}. Three regimes, split at |E − V₀| ≤ E_EDGE (the same band in the solver,
                    the notes and the formula on the rail):
                      E < V₀  the chord ψ = t e^{ikL}[cosh κ(L − x) − i(k/κ) sinh κ(L − x)] = C₊e^{−κx} + C₋e^{+κx},
                              dominated by e^{−κx} for κL ≥ ½ (|C₋e^{κx}|/|C₊e^{−κx}| = e^{−2κ(L − x)} ≤ 1), comparable
                              terms for a thin wall; no winding, phase turn
                              arctan((k/κ) tanh κL) < 90°, amplitude falling, T = [1 + V₀² sinh²(κL)/(4E(V₀ − E))]⁻¹;
                      E = V₀  κ = q = 0: the straight line ψ = t e^{ikL}[1 − ik(L − x)], T = [1 + m V₀ L²/(2ℏ²)]⁻¹;
                      E > V₀  ψ = t e^{ikL}[cos q(L − x) − i(k/q) sin q(L − x)] with a real q, T = [1 + V₀² sin²(qL)/(4E(E − V₀))]⁻¹
                              = 1 at qL = nπ. |ψ|²/|t|² = 1 + V₀/(E − V₀)·sin² q(L − x) turns at qd = jπ/2 < qL: for
                              qL ≤ π/2 it still falls monotonically to |t|, beyond it rises and falls (Fabry–Pérot).
                    The overall phase puts the chord midpoint in i at t = 0. Only below V₀ the violet quarter arcs are
                    the ±90° turns of the momentum k → iκ → k (at V₀ there is no κ to turn into). Real-axis lens: the classical reading
                    (a flat cosine in I, a hard wall for E < V₀, the impossible negative square p² < 0, an amber
                    classical particle turning back).
     slits scene    two gates of width σ_t = 120 as at t₁ = 1 fs and t₂ = t₁ + Δt release two branches of amplitude √w
                    through the same chord; they fly to the spectral screen at the right end, which shows
                    P(E) = |A₁|² + |A₂|² + 2V|A₁A₂| cos(EΔt/ℏ + Δγ_B); the floor carries the phasor dial at the cursor E*
                    and the river of phase E*Δt/ℏ between the branches.
   The midway probe of strength p keeps the coherence V = 1 − p and, as a two-state Zeno chain with n = round(12p) checks,
   lowers the coherent transmission to T_mon. Every number is computed here; the instances of the cited Lean theorems are
   checked in instances(). Read-only probe: window.IMAG_TUNNEL_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180;

  /* ---------- constants (SI, CODATA 2018 exact or recommended) ---------- */
  const ME = 9.1093837015e-31, HBAR = 1.054571817e-34, QE = 1.602176634e-19;
  const H_EVFS = 4.135667696, HBAR_EVFS = H_EVFS / TAU;       // h and ℏ in eV·fs
  const C2 = 2 * ME * QE / (HBAR * HBAR) * 1e-18;             // k² [nm⁻²] = C2 · E [eV]
  const V0 = 1;                                                // barrier height (eV)
  const E_EDGE = 1e-6;                                         // |E − V₀| ≤ E_EDGE is the threshold E = V₀ (eV)
  const KL_DOMINANT = 0.5;                                     // κL ≥ ½ (e^{−2κL} ≤ 1/e): e^{−κx} dominates C₊e^{−κx} + C₋e^{+κx}
  const SIGMA_T = 0.12, T1 = 1, T_MAX = 8;                     // gate width, first gate, rail (fs)
  const E_C = 10, E_MAX = 20;                                  // spectral centre and window (eV, MODEL)
  const N_CHECK = 12;                                          // midway checks at p = 1 (MODEL)
  const X_IN = 2.0, X_END = 3.2, X_REF = 0.6, SX = 1 / 2.4;    // layout (nm) and nm → world
  const HS = 0.72, RW = 0.32, SIG_X = 0.14;                    // half size of the room, |ψ| = 1 radius, packet width (nm)
  const K_C = Math.sqrt(C2 * E_C);                             // carrier of the detected packets (nm⁻¹, MODEL)
  const X = (x) => (x - X_REF) * SX;
  const VIEWS = { side: [0, 0], top: [0, PI / 2 - 0.001], oblique: [0.62, 0.36] };
  const VANTAGES = ['side', 'top', 'oblique'];

  /* ---------- complex numbers [re, im] and 2 × 2 complex matrices ---------- */
  const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const csub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cdiv = (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
  const csc = (a, s) => [a[0] * s, a[1] * s];
  const cexp = (th) => [Math.cos(th), Math.sin(th)];
  const cabs2 = (a) => a[0] * a[0] + a[1] * a[1];
  const carg = (a) => Math.atan2(a[1], a[0]);
  const mm = (A, B) => [0, 1].map((i) => [0, 1].map((j) => cadd(cmul(A[i][0], B[0][j]), cmul(A[i][1], B[1][j]))));
  const madd = (A, B, s = 1) => A.map((r, i) => r.map((z, j) => [z[0] + s * B[i][j][0], z[1] + s * B[i][j][1]]));
  const msc = (A, s) => A.map((r) => r.map((z) => csc(z, s)));
  const mdag = (A) => [[[A[0][0][0], -A[0][0][1]], [A[1][0][0], -A[1][0][1]]], [[A[0][1][0], -A[0][1][1]], [A[1][1][0], -A[1][1][1]]]];
  const mmax = (A) => Math.max(...A.flat().map((z) => Math.hypot(z[0], z[1])));
  const real2 = (a, b, c, d) => [[[a, 0], [b, 0]], [[c, 0], [d, 0]]];
  const I2 = real2(1, 0, 0, 1);
  const TURN = real2(0, -1, 1, 0);                             // î: the 90° turn of the (I, i) plane

  /* ---------- the rectangular barrier for a real electron ---------- */
  const solveCache = new Map();
  /** Exact stationary scattering state at E = ratio·V₀ through a barrier of width Lw (nm). */
  function solve(ratio, Lw) {
    const key = `${ratio}|${Lw}`;                             // exact: a finite number prints in its shortest round-trip form
    const hit = solveCache.get(key);
    if (hit) return hit;
    const E = ratio * V0, k = Math.sqrt(C2 * E);
    let regime, kap = 0, q = 0, T;
    if (Math.abs(E - V0) <= E_EDGE) {
      regime = 'edge';
      const Lm = Lw * 1e-9, V = V0 * QE;
      T = 1 / (1 + ME * V * Lm * Lm / (2 * HBAR * HBAR));     // T(V₀) = 1/(1 + m V₀ L²/(2ℏ²)), SI units
    } else if (E < V0) {
      regime = 'tunnel'; kap = Math.sqrt(C2 * (V0 - E));
      T = 1 / (1 + V0 * V0 / (4 * E * (V0 - E)) * Math.sinh(kap * Lw) ** 2);
    } else {
      regime = 'over'; q = Math.sqrt(C2 * (E - V0));
      T = 1 / (1 + V0 * V0 / (4 * E * (E - V0)) * Math.sin(q * Lw) ** 2);
    }
    // inside: ψ = t e^{ikL} u(x) with u(L) = 1, u'(L) = ik
    const u = (x) => {
      const d = Lw - x;
      if (regime === 'tunnel') return [Math.cosh(kap * d), -(k / kap) * Math.sinh(kap * d)];
      if (regime === 'over') return [Math.cos(q * d), -(k / q) * Math.sin(q * d)];
      return [1, -k * d];
    };
    const du = (x) => {
      const d = Lw - x;
      if (regime === 'tunnel') return [-kap * Math.sinh(kap * d), k * Math.cosh(kap * d)];
      if (regime === 'over') return [q * Math.sin(q * d), k * Math.cos(q * d)];
      return [0, k];
    };
    const a = u(0), b = du(0), bik = [b[1] / k, -b[0] / k];   // b/(ik)
    const te = cdiv([2, 0], cadd(a, bik));                   // t e^{ikL}
    const t = cmul(te, cexp(-k * Lw)), r = csub(cmul(te, a), [1, 0]);
    const psiIn = (x) => cmul(te, u(x));
    const gamma0 = PI / 2 - carg(psiIn(Lw / 2));
    let turn = 0, prev = carg(psiIn(0));
    for (let j = 1; j <= 64; j++) { const g = carg(psiIn(Lw * j / 64)); let d = g - prev; d = Math.atan2(Math.sin(d), Math.cos(d)); turn += d; prev = g; }
    // |ψ|²/|t|² = 1 + V₀/(V₀ − E)·sinh² κd (tunnel), 1 + k²d² (edge), 1 + V₀/(E − V₀)·sin² qd (over), d = L − x: the first two
    // fall monotonically across the wall; the third turns wherever qd = jπ/2 lies inside (0, L), i.e. for j < 2qL/π
    const extrema = regime === 'over' ? Math.max(0, Math.ceil(2 * q * Lw / PI - 1e-9) - 1) : 0;
    const s = { E, ratio, L: Lw, k, kap, q, regime, T, t, r, te, tAbs2: cabs2(t), rAbs2: cabs2(r), psiIn, gamma0,
      inner: regime === 'tunnel' ? kap * Lw : regime === 'over' ? q * Lw : 0, chordTurn: Math.abs(turn),
      ampExtrema: extrema, ampMonotone: extrema === 0, ampEntrance: Math.sqrt(cabs2(psiIn(0)) / cabs2(psiIn(Lw))),
      growRatio: regime === 'tunnel' ? Math.exp(-2 * kap * Lw) : 0, decayDominant: regime === 'tunnel' && kap * Lw >= KL_DOMINANT };
    solveCache.set(key, s);
    if (solveCache.size > 300) solveCache.delete(solveCache.keys().next().value);
    return s;
  }
  /** Classical speed sqrt(2E/m) in nm/fs. */
  const speed = (E) => Math.sqrt(2 * Math.max(0, E) * QE / ME) * 1e-6;
  /** Classical position (nm) at time t: the particle reaches x = 0 at t = 4 fs; below V₀ it turns back there. */
  function classical(sol, t) {
    const v = speed(sol.E);
    if (sol.E < V0 - 1e-12) return -v * Math.abs(t - 4);
    if (t <= 4) return -v * (4 - t);
    const vin = speed(sol.E - V0);
    if (vin <= 1e-9) return 0;
    const tin = sol.L / vin;
    return t - 4 <= tin ? vin * (t - 4) : sol.L + v * (t - 4 - tin);
  }

  /* ---------- the midway probe as a two-state Zeno chain, and the monitored-return ledger ---------- */
  function zeno(T, probe) {
    const n = Math.round(N_CHECK * probe), m = n + 1, Theta = Math.asin(Math.sqrt(clamp(T, 0, 1))), th = Theta / m;
    const Tmon = (1 - Math.cos(2 * th) ** m) / 2;
    // theorem protocol: v = |L⟩, U = e^{−iθσx}, history h_n = (Q U)^n v with Q = 1 − |v⟩⟨v|
    let h = [[1, 0], [0, 0]];
    const surv = [1], ret = [0], c = Math.cos(th), si = Math.sin(th);
    for (let j = 1; j <= m; j++) {
      const w = [cadd(csc(h[0], c), cmul([0, -si], h[1])), cadd(cmul([0, -si], h[0]), csc(h[1], c))];
      ret.push(cabs2(w[0]));
      h = [[0, 0], w[1]];
      surv.push(cabs2(h[0]) + cabs2(h[1]));
    }
    let stepResidual = 0;
    for (let j = 0; j < m; j++) stepResidual = Math.max(stepResidual, Math.abs(ret[j + 1] - (surv[j] - surv[j + 1])));
    const total = ret.slice(1).reduce((x, y) => x + y, 0) + surv[m];
    return { n, m, Theta, theta: th, Tmon, survival: surv, returns: ret, firstReturn: ret[1], stepResidual, total, totalResidual: Math.abs(total - 1) };
  }

  /* ---------- the time double slit ---------- */
  /** erf (Abramowitz–Stegun 7.1.26, |error| < 1.5e−7) and the normal distribution function. */
  function erf(x) {
    const s = x < 0 ? -1 : 1, a = Math.abs(x), t = 1 / (1 + 0.3275911 * a);
    return s * (1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-a * a));
  }
  const Phi = (z) => 0.5 * (1 + erf(z / Math.SQRT2));
  const gatesAt = (t, dt) => ({ t1: T1, t2: T1 + dt, g1: Phi((t - T1) / SIGMA_T), g2: Phi((t - T1 - dt) / SIGMA_T) });
  /** One energy of the spectrum: the branch amplitudes, their relative phase and P(E). */
  function specAt(E, M, gg) {
    const G = Math.exp(-SIGMA_T * SIGMA_T * (E - E_C) ** 2 / (HBAR_EVFS * HBAR_EVFS)), sw = Math.sqrt(M.w);
    const a1 = sw * G * gg.g1, a2 = sw * G * gg.g2, phi = E * M.dt / HBAR_EVFS + M.dgB;
    return { a1, a2, phi, inc: a1 * a1 + a2 * a2, P: a1 * a1 + a2 * a2 + 2 * M.V * a1 * a2 * Math.cos(phi) };
  }
  /** Energies in [0, E_MAX] where the relative phase is (2n + 1)π (dark) or 2nπ (bright). */
  function nodes(dt, dgB, odd) {
    const out = [];
    for (let n = -4; n < 400; n++) {
      const E = ((odd ? 2 * n + 1 : 2 * n) * PI - dgB) * HBAR_EVFS / dt;
      if (E > E_MAX + 1e-12) break;
      if (E >= -1e-12) out.push(E);
    }
    return out;
  }
  const nearest = (list, x) => list.reduce((b, v) => (Math.abs(v - x) < Math.abs(b - x) ? v : b), list[0] == null ? x : list[0]);

  /* ---------- state ---------- */
  const S = { scene: 'barrier', lens: 'complex', ratio: 0.5, L: 0.6, dtAs: 1000, probe: 0, dgB: 0, Estar: 8.27, vantage: 'oblique', t: 0 };

  /** Everything the page shows, from the state. */
  function model() {
    const sol = solve(S.ratio, S.L), real = S.lens === 'real';
    const Tcl = sol.E < V0 - 1e-12 ? 0 : 1, z = zeno(sol.T, real ? 0 : S.probe);
    const dt = S.dtAs / 1000, dgB = S.dgB * DEG, omega = sol.E / HBAR_EVFS;
    const w = real ? Tcl : z.Tmon, V = real ? 0 : 1 - S.probe;
    const M = { sol, real, Tcl, z, dt, dgB, omega, w, V, t: S.t, phase: sol.gamma0 - omega * S.t };
    M.deltaE = H_EVFS / dt;
    M.gates = gatesAt(S.t, dt);
    M.full = { t1: T1, t2: T1 + dt, g1: 1, g2: 1 };
    M.star = specAt(S.Estar, M, M.gates);
    M.starFull = specAt(S.Estar, M, M.full);
    M.dark = nodes(dt, dgB, true); M.bright = nodes(dt, dgB, false);
    // the chord split on I and i at the current time
    let sI = 0, si = 0;
    for (let j = 0; j <= 64; j++) {
      const p = cmul(sol.psiIn(sol.L * j / 64), cexp(M.phase));
      sI += p[0] * p[0]; si += p[1] * p[1];
    }
    M.shareI = sI / (sI + si); M.shareImag = si / (sI + si);
    // p²/2m inside through î² = −1 (eV)
    const R2 = mm(TURN, TURN)[0][0][0];
    M.kinetic = sol.regime === 'tunnel' ? R2 * sol.kap * sol.kap / C2 : sol.regime === 'over' ? sol.q * sol.q / C2 : 0;
    // the probe pinching the branch qubit at the cursor
    M.coherenceMass = 0.5 * M.V * M.V;       // ‖ρ − P(ρ)‖²_HS of the probed state
    M.fullMass = 0.5;                         // at V = 1: 2|A₁A₂|² with |A₁|² = |A₂|² = ½
    return M;
  }

  /* ---------- the instances of the cited theorems ---------- */
  const instCache = new Map();
  function instances(M) {
    const key = `${S.ratio}|${S.L}|${S.t}|${S.probe}|${S.dtAs}|${S.dgB}|${S.Estar}|${S.lens}`;
    if (instCache.has(key)) return instCache.get(key);
    const sol = M.sol;
    // 1. projections onto I and i in ℂ ≅ ℝ²
    const Pm = real2(1, 0, 0, 0), Qm = real2(0, 0, 0, 1), Z = real2(0, 0, 0, 0);
    const orth = {
      complement: mmax(madd(Qm, madd(I2, Pm, -1), -1)), idemP: mmax(madd(mm(Pm, Pm), Pm, -1)), idemQ: mmax(madd(mm(Qm, Qm), Qm, -1)),
      PQ: mmax(madd(mm(Pm, Qm), Z, -1)), QP: mmax(madd(mm(Qm, Pm), Z, -1)), sum: mmax(madd(madd(Pm, Qm), I2, -1)),
      shareI: M.shareI, shareImag: M.shareImag, splitResidual: Math.abs(M.shareI + M.shareImag - 1)
    };
    orth.residual = Math.max(orth.complement, orth.idemP, orth.idemQ, orth.PQ, orth.QP, orth.sum);
    // 2. the 90° turn î squares to −1; p²/2m = E − V₀ inside
    const R = TURN;
    const skew = { skewAdjoint: mmax(madd(mdag(R), R)), unitary: mmax(madd(mm(R, mdag(R)), I2, -1)), square: mmax(madd(mm(R, R), I2)),
      kinetic: M.kinetic, kineticResidual: sol.regime === 'tunnel' ? Math.abs(M.kinetic - (sol.E - V0)) : 0 };
    // 3. J = 2ABᴴ for A = U/√2, B = UK/√2 with a unitary U that moves with κL and t
    const a = 0.5 * (sol.inner || sol.k * sol.L), b = M.omega * S.t;
    const U = mm([[cexp(b), [0, 0]], [[0, 0], cexp(b)]], [[[Math.cos(a), 0], csc(cexp(-b), -Math.sin(a))], [csc(cexp(b), Math.sin(a)), [Math.cos(a), 0]]]);
    const A = msc(U, Math.SQRT1_2), B = msc(mm(U, TURN), Math.SQRT1_2), half = msc(I2, 0.5);
    const J = msc(mm(A, mdag(B)), 2);
    const rel = { cross: mmax(madd(mm(A, mdag(B)), mm(B, mdag(A)))), normA: mmax(madd(mm(A, mdag(A)), half, -1)),
      normB: mmax(madd(mm(mdag(B), B), half, -1)), square: mmax(madd(mm(J, J), I2)), unitaryU: mmax(madd(mm(U, mdag(U)), I2, -1)) };
    // 4. diagonal readouts cannot see the relative phase; X can
    const rhoPlus = real2(0.5, 0.5, 0.5, 0.5), Zq = real2(1, 0, 0, -1), Xq = real2(0, 1, 1, 0), rhoMinus = mm(Zq, mm(rhoPlus, Zq));
    const born = (rho, O) => { const m2 = mm(rho, O); return m2[0][0][0] + m2[1][1][0]; };
    const diagObs = [real2(1, 0, 0, 0), real2(0, 0, 0, 1), real2(0.3, 0, 0, -1.2)];
    const phiStar = M.starFull.phi, Vc = M.V;
    const rhoStar = [[[0.5, 0], csc(cexp(-phiStar), 0.5 * Vc)], [csc(cexp(phiStar), 0.5 * Vc), [0.5, 0]]];
    const diag = {
      statesDiffer: mmax(madd(rhoPlus, rhoMinus, -1)),
      diagonalGap: Math.max(...diagObs.map((O) => Math.abs(born(rhoPlus, O) - born(rhoMinus, O)))),
      xPlus: born(rhoPlus, Xq), xMinus: born(rhoMinus, Xq),
      cursorWhichTime: [born(rhoStar, diagObs[0]), born(rhoStar, diagObs[1])], cursorX: born(rhoStar, Xq)
    };
    // 5. pinching the branch qubit at the cursor
    const pinched = [[rhoStar[0][0], [0, 0]], [[0, 0], rhoStar[1][1]]], dlt = madd(rhoStar, pinched, -1);
    let hs = 0; for (const row of dlt) for (const zz of row) hs += cabs2(zz);
    const pinch = { hs, offDiagonal: cabs2(rhoStar[0][1]) + cabs2(rhoStar[1][0]), residual: Math.abs(hs - cabs2(rhoStar[0][1]) - cabs2(rhoStar[1][0])), fullMass: M.fullMass };
    // 6. the monitored-return ledger of the Zeno chain
    const z = M.z;
    const monitored = { steps: z.m, checks: z.n, survival0: z.survival[0], stepResidual: z.stepResidual, total: z.total, totalResidual: z.totalResidual, firstReturn: z.firstReturn };
    const out = { orth, skew, rel, diag, pinch, monitored };
    instCache.set(key, out);
    if (instCache.size > 60) instCache.delete(instCache.keys().next().value);
    return out;
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probeEl = document.createElement('div'); probeEl.hidden = true; probeEl.style.position = 'absolute'; tagBox.appendChild(probeEl);
  const options = { canvas: $('cv'), yaw: VIEWS.oblique[0], pitch: VIEWS.oblique[1], wheel: false, radius: 0.32, cx: 0.5, cy: 0.5, onChange: () => paint() };
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

  /** Fit the room [X(−X_IN), X(X_END)] × [−HS, HS]² into the HUD-free rect for the current camera. */
  function fitTo(area, W, H) {
    const cy = Math.cos(sc.cam.yaw), sy = Math.sin(sc.cam.yaw), cp = Math.cos(sc.cam.pitch), sp = Math.sin(sc.cam.pitch);
    const Rv = [cy, -sy, 0], Uv = [sy * sp, cy * sp, cp];
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const x of [X(-X_IN), X(X_END)]) for (const y of [-HS, HS]) for (const z of [-HS, HS]) {
      const px = x * Rv[0] + y * Rv[1] + z * Rv[2], py = -(x * Uv[0] + y * Uv[1] + z * Uv[2]);
      x0 = Math.min(x0, px); x1 = Math.max(x1, px); y0 = Math.min(y0, py); y1 = Math.max(y1, py);
    }
    const pad = TRV.thumbMode ? 4 : 16, zoom = sc.cam.zoom || 1;
    const unit = Math.max(20, Math.min((area.w - 2 * pad) / Math.max(0.2, x1 - x0), (area.h - 2 * pad) / Math.max(0.2, y1 - y0)));
    options.radius = unit / (Math.max(1, Math.min(W, H)) * zoom);
    options.cx = (area.x + area.w / 2 - unit * (x0 + x1) / 2) / Math.max(1, W);
    options.cy = (area.y + area.h / 2 - unit * (y0 + y1) / 2) / Math.max(1, H);
  }

  /** World point of the field value z at x (nm): y = Im, z = Re. */
  const pt = (x, z, k = 1) => [X(x), RW * k * z[1], RW * k * z[0]];
  const range = (a, b, n) => Array.from({ length: n + 1 }, (_, j) => a + (b - a) * j / n);
  const tube = (key, pts, color, width, extra = {}) => { if (pts.length > 1) sc.tube(key, pts, Object.assign({ color, width, glow: 0.3, pick: false, occlude: false }, extra)); };
  /** A curve and its two shadows: on the wall (I, cyan) and on the floor (i, magenta). */
  function curve(key, pts, color, width, extra = {}) {
    tube(key, pts, color, width, extra);
    const al = extra.shadowAlpha == null ? 1 : extra.shadowAlpha;
    tube(`${key}-I`, pts.map((p) => [p[0], HS - 0.008, p[2]]), P.cyan, 1.7, { glow: 0, alpha: al });
    tube(`${key}-i`, pts.map((p) => [p[0], p[1], -HS + 0.008]), P.magenta, 1.7, { glow: 0, alpha: al });
  }

  let FRAME = null, FIT = null, TAGS = [], DIALS = false;
  const at = (p, html, cls, pri, dir) => { if (!TRV.thumbMode) TAGS.push({ p, html, cls, pri, dir }); };

  function drawRoom(M) {
    const xa = X(-X_IN), xb = X(X_END), w = xb - xa, x0 = X(0), xL = X(S.L);
    sc.surface('wall', (u, v) => [xa + u * w, HS, -HS + 2 * HS * v], { u: [0, 1], v: [0, 1], nu: 24, nv: 8, color: P.lineHot, grid: { every: [2, 2], color: P.cyan, alpha: 0.2 }, pick: false });
    sc.surface('floor', (u, v) => [xa + u * w, -HS + 2 * HS * v, -HS], { u: [0, 1], v: [0, 1], nu: 24, nv: 8, color: P.panelEdge, grid: { every: [2, 2], color: P.magenta, alpha: 0.24 }, pick: false });
    sc.surface('wall-V0', (u, v) => [x0 + u * (xL - x0), HS - 0.004, -HS + 2 * HS * v], { u: [0, 1], v: [0, 1], nu: 2, nv: 2, color: P.dim, pick: false });
    sc.surface('floor-V0', (u, v) => [x0 + u * (xL - x0), -HS + 2 * HS * v, -HS + 0.004], { u: [0, 1], v: [0, 1], nu: 2, nv: 2, color: P.dim, pick: false });
    const glass = { u: [0, 1], v: [0, 1], nu: 2, nv: 2, color: P.sigma, alpha: 0.07, pick: false, occlude: false };
    sc.surface('slab-front', (u, v) => [x0 + u * (xL - x0), -HS, -HS + 2 * HS * v], glass);
    sc.surface('slab-top', (u, v) => [x0 + u * (xL - x0), -HS + 2 * HS * v, HS], glass);
    sc.surface('slab-in', (u, v) => [x0, -HS + 2 * HS * u, -HS + 2 * HS * v], Object.assign({}, glass, { alpha: 0.09 }));
    sc.surface('slab-out', (u, v) => [xL, -HS + 2 * HS * u, -HS + 2 * HS * v], Object.assign({}, glass, { alpha: 0.09 }));
    tube('axis', [[xa, 0, 0], [xb - 0.02, 0, 0]], P.ink, 1.2, { glow: 0, alpha: 0.55 });
    at([x0 + (xL - x0) / 2, -HS, -HS], 'V₀ = 1 eV', 'raw c-ik backed', 4, [0, 1]);
    at([xa + 0.08, HS, HS * 0.72], L('实平面 I', 'real plane I'), 'raw c-cy backed', 7, [1, -1]);
    at([xa + 0.08, -HS * 0.7, -HS], L('虚平面 i', 'blind plane i'), 'raw c-mg backed', 7, [1, 1]);
  }

  /** The probe checks: thin rings round the chord at x_j = jL/(n + 1). */
  function probeRings(M, radiusAt) {
    for (let j = 1; j <= M.z.n; j++) {
      const x = S.L * j / (M.z.n + 1), r = radiusAt(x) + 0.03;
      tube(`check${j}`, range(0, TAU, 40).map((a) => [X(x), r * Math.sin(a), r * Math.cos(a)]), P.ink, 1.2, { glow: 0, alpha: 0.7 });
    }
  }

  /** The complex reading on [−X_IN, L]: incident and reflected helices, the chord, and below V₀ the ±90° dials. */
  function drawEntrance(M) {
    const sol = M.sol, ph = cexp(M.phase), xs = range(-X_IN, 0, 120);
    curve('inc', xs.map((x) => pt(x, cmul(cexp(sol.k * x), ph))), P.cyan, 3.4);
    tube('refl', xs.map((x) => pt(x, cmul(cmul(sol.r, cexp(-sol.k * x)), ph))), P.dim, 1.6, { glow: 0, alpha: 0.8 });
    const chordColor = sol.regime === 'over' ? P.cyan : P.magenta, m = M.z.m;
    for (let s = 0; s < m; s++) {
      const a = S.L * s / m, b = S.L * (s + 1) / m, gap = m > 1 ? 0.07 * (b - a) : 0;
      const pts = range(a + (s ? gap : 0), b - (s < m - 1 ? gap : 0), Math.max(6, Math.round(48 / m))).map((x) => pt(x, cmul(sol.psiIn(x), ph)));
      curve(`chord${s}`, pts, chordColor, 5, { glow: 0.5 });
    }
    for (let s = m; s < 14; s++) { tube(`chord${s}`, [], chordColor, 1); }
    probeRings(M, (x) => RW * Math.sqrt(cabs2(sol.psiIn(x))));
    // the momentum turns k → iκ → k only where there is a κ: strictly below V₀ (at E = V₀, κ = q = 0 and nothing turns)
    const x0 = X(0), xL = X(S.L), rd = 0.26;
    DIALS = sol.regime === 'tunnel';
    if (DIALS) {
      tube('dial-in', range(0, PI / 2, 24).map((a) => [x0, rd * Math.sin(a), rd * Math.cos(a)]), P.violet, 3, { glow: 0.5 });
      tube('dial-out', range(0, PI / 2, 24).map((a) => [xL, rd * Math.sin(a), rd * Math.cos(a)]), P.violet, 3, { glow: 0.5 });
      sc.arrow([x0, 0, 0], [x0, 0, rd], { color: P.cyan, width: 2.2 });
      sc.arrow([x0, 0, 0], [x0, rd, 0], { color: P.magenta, width: 2.2 });
      at([x0, rd * 0.72, rd * 0.72], '+90° · k → iκ', 'raw c-vi backed', 8, [-1, -1]);
      at([xL, rd * 0.72, rd * 0.72], '−90°', 'raw c-vi backed', 5, [1, -1]);
    }
    const mid = cmul(sol.psiIn(S.L / 2), ph);
    // the finite wall holds C₊e^{−κx} + C₋e^{+κx}; the tag names the term that dominates it
    if (sol.regime === 'tunnel') {
      const html = sol.decayDominant ? L('割弦 ~ e<sup>−κx</sup>', 'chord ~ e<sup>−κx</sup>') : L('割弦 C₊e<sup>−κx</sup> + C₋e<sup>+κx</sup>', 'chord C₊e<sup>−κx</sup> + C₋e<sup>+κx</sup>');
      at(pt(S.L / 2, mid), html, 'raw c-mg backed', 9, [0.3, 1]);
    }
    else if (sol.regime === 'edge') at(pt(S.L / 2, mid), L('直线桥 κ = q = 0', 'linear bridge κ = q = 0'), 'raw c-mg backed', 9, [0.3, 1]);
  }

  function drawBarrierScene(M) {
    const sol = M.sol, ph = cexp(M.phase);
    drawEntrance(M);
    const zs = M.z.n > 0 ? Math.sqrt(M.z.Tmon / Math.max(1e-300, sol.T)) : 1;
    const xs = range(S.L, X_END - 0.02, 110);
    curve('trans', xs.map((x) => pt(x, cmul(cmul(sol.t, cexp(sol.k * x)), ph), zs)), P.cyan, 3);
    const q = X_END - 0.55;
    at(pt(q, cmul(cmul(sol.t, cexp(sol.k * q)), ph), zs), M.z.n > 0 ? `√T<sub>mon</sub> = ${fix(Math.sqrt(M.z.Tmon), 3)}` : `√T = ${fix(Math.sqrt(sol.T), 3)}`, 'raw c-cy backed', 8, [0.2, -1]);
  }

  /** The real-axis classical reading: a flat cosine in I, a hard wall below V₀, a classical particle. */
  function drawClassical(M, withExit) {
    const sol = M.sol, wt = M.omega * S.t, xs = range(-X_IN, 0, 120), flat = (x, th) => [X(x), 0, RW * Math.cos(th)];
    curve('inc', xs.map((x) => flat(x, sol.k * x - wt)), P.cyan, 3.4);
    if (sol.E < V0 - 1e-12) {
      tube('refl', xs.map((x) => flat(x, -sol.k * x - wt + PI)), P.dim, 1.6, { glow: 0, alpha: 0.8 });
      const x0 = X(0), xL = X(S.L), cx = (x0 + xL) / 2, s = Math.min(0.9 * (xL - x0), 0.34) / 2;
      sc.line([[cx - s, 0, -s], [cx + s, 0, -s], [cx + s, 0, s], [cx - s, 0, s]], { color: P.magenta, width: 2, dash: [5, 4], close: true });
      at([cx, 0, s], 'p² = 2m(E − V₀) &lt; 0', 'raw c-mg backed', 9, [0, -1]);
    } else {
      const kin = sol.q || 0, inside = range(0, S.L, 30).map((x) => flat(x, kin * x - wt));
      curve('chord0', inside, P.cyan, 3);
      if (withExit) curve('trans', range(S.L, X_END - 0.02, 90).map((x) => flat(x, sol.k * (x - S.L) + kin * S.L - wt)), P.cyan, 3);
    }
    const xc = classical(sol, S.t);
    if (xc >= -X_IN && xc <= X_END - 0.05) {
      sc.bead([X(xc), 0, 0], { key: 'particle', color: P.amber, r: 6 });
      at([X(xc), 0, 0], L('经典粒子', 'classical particle'), 'raw c-am backed', 6, [-0.3, 1]);
    }
  }

  /** The screen at x = X_END: E runs along −y (left to right in the oblique view), P̂ = P/(2w) up z. */
  const screenY = (E) => 0.9 * HS * (1 - 2 * E / E_MAX);
  const screenZ = (p) => 0.78 * HS * (p - 1);
  const XS = () => X(X_END) - 0.008;
  function packetPos(M, j) { const vd = (X_END - 0.3 - S.L - 0.3) / (T_MAX - 0.2 - T1); return S.L + 0.3 + vd * (S.t - (j === 1 ? M.gates.t1 : M.gates.t2)); }

  function drawSlitsScene(M) {
    const sol = M.sol, ph = cexp(M.phase), xS = XS();
    if (M.real) drawClassical(M, false); else drawEntrance(M);
    const amp = Math.sqrt(M.w);
    const centres = [];
    for (const j of [1, 2]) {
      const g = j === 1 ? M.gates.g1 : M.gates.g2, xc = packetPos(M, j);
      let pts = [];
      if (g > 0.02 && amp > 0) {
        const a = Math.max(S.L, xc - 3 * SIG_X), b = Math.min(X_END - 0.03, xc + 3 * SIG_X);
        if (b > a) pts = range(a, b, 90).map((x) => pt(x, cmul(cexp(K_C * (x - xc)), ph), amp * g * Math.exp(-((x - xc) ** 2) / (2 * SIG_X * SIG_X))));
      }
      curve(`pk${j}`, pts, P.cyan, 3.2, { glow: 0.45 });
      if (pts.length) { centres.push(xc); at([X(xc), 0, RW * amp * g], `t${j === 1 ? '₁' : '₂'}`, 'raw c-cy backed', 8, [0, -1]); }
    }
    // the river: the phase E*Δt/ℏ between the two branches, on the blind floor
    if (centres.length === 2 && !M.real) {
      const [x1, x2] = centres;
      tube('river', range(0, 1, 30).map((s) => [X(x2 + (x1 - x2) * s), 0.28 + 0.16 * Math.sin(PI * s), -HS + 0.012]), P.magenta, 3, { glow: 0.45 });
      at([X((x1 + x2) / 2), 0.44, -HS], 'E*Δt/ℏ', 'raw c-mg backed', 5, [0, 1]);
    } else tube('river', [], P.magenta, 1);
    // the spectral screen
    sc.surface('screen', (u, v) => [X(X_END), HS * (1 - 2 * u), -HS + 2 * HS * v], { u: [0, 1], v: [0, 1], nu: 8, nv: 8, color: P.faint, grid: { every: [2, 2], color: P.ink, alpha: 0.16 }, pick: false });
    tube('baseline', [[xS, screenY(0), screenZ(0)], [xS, screenY(E_MAX), screenZ(0)]], P.ink, 1.2, { glow: 0, alpha: 0.7 });
    const Es = range(0, E_MAX, 200), norm = M.w > 0 ? 1 / (2 * M.w) : 0;
    tube('spectrum', Es.map((E) => [xS, screenY(E), screenZ(specAt(E, M, M.gates).P * norm)]), P.cyan, 2.6, { glow: 0.45 });
    sc.line(Es.map((E) => [xS - 0.002, screenY(E), screenZ(specAt(E, M, M.gates).inc * norm)]), { color: P.magenta, width: 1.4, dash: [4, 4], alpha: 0.9 });
    const pS = M.star.P * norm, cur = [xS - 0.004, screenY(S.Estar), screenZ(pS)];
    tube('cursor', [[xS - 0.004, screenY(S.Estar), screenZ(0)], cur], P.amber, 1.8, { glow: 0.4 });
    sc.bead(cur, { key: 'cursor', color: P.amber, r: 5 });
    at([xS, screenY(E_MAX * 0.12), screenZ(2.1)], 'P(E)', 'raw c-cy backed', 6, [0, -1]);
    at(cur, `E* = ${fix(S.Estar, 2)} eV`, 'raw c-am backed', 7, [0.6, -1]);
    // the phasor dial on the floor at E*: two branch phasors head to tail, their phase, the coherent sum
    const D = [X(1.9), -0.44, -HS + 0.014], rd = 0.26, ha = rd / 2, phi = M.starFull.phi, al = 0.3 + 0.7 * M.V;
    tube('dial', range(0, TAU, 48).map((a) => [D[0] + rd * Math.cos(a), D[1] + rd * Math.sin(a), D[2]]), P.ink, 1.1, { glow: 0, alpha: 0.6 });
    const A1 = [D[0] + ha, D[1], D[2]], A2 = [A1[0] + ha * Math.cos(phi), A1[1] + ha * Math.sin(phi), D[2]];
    sc.arrow(D, A1, { color: P.cyan, width: 2.2, headSize: 7 });
    sc.arrow(A1, A2, { color: P.cyan, width: 2.2, headSize: 7, alpha: al });
    const wph = ((phi % TAU) + TAU) % TAU;
    tube('dial-phase', range(0, wph, 32).map((a) => [A1[0] + 0.06 * Math.cos(a), A1[1] + 0.06 * Math.sin(a), D[2] + 0.002]), P.magenta, 2.2, { glow: 0.4 });
    if (Math.hypot(A2[0] - D[0], A2[1] - D[1]) > 0.012) sc.arrow(D, A2, { color: P.amber, width: 2.4, headSize: 8, alpha: al });
    at(D, M.V > 0 ? L('相量盘 A₁ + A₂', 'phasors A₁ + A₂') : L('相量盘（V = 0）', 'phasors (V = 0)'), 'raw c-am backed', 4, [-1, 0.6]);
  }

  function drawStage(M) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 12, y: 12, w: W - 24, h: H - 24 } : safeRect(W, H, huds);
    if (!dragging || !FIT) FIT = { area };
    fitTo(FIT.area, W, H);
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = []; TAGS = []; DIALS = false;
    sc.begin();
    drawRoom(M);
    if (S.scene === 'barrier') { if (M.real) drawClassical(M, true); else drawBarrierScene(M); }
    else drawSlitsScene(M);
    if (S.scene !== 'slits') { for (const k of ['screen', 'spectrum', 'baseline', 'cursor', 'river', 'dial', 'dial-phase', 'pk1', 'pk1-I', 'pk1-i', 'pk2', 'pk2-I', 'pk2-i']) tube(k, [], P.ink, 1); }
    sc.end();
    /* the handle: the right edge of the barrier, or the energy cursor on the screen */
    const hq = !thumb && !TRV.still ? handleAnchor(M) : null;
    if (hq) OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    placeHandle(hq);
    if (!thumb) {
      const cen = sc.p([0, 0, 0]);
      TAGS.forEach((t, k) => {
        const q = sc.p(t.p), dir = t.dir ? [t.dir[0], t.dir[1]] : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1];
        LB.push({ key: `t${k}`, q, html: t.html, cls: t.cls, pri: t.pri, dir, r: 12 });
      });
      placeLabels();
    }
    FRAME = { W, H, area: FIT.area, handle: hq ? { x: hq[0], y: hq[1] } : null, unit: sc.unit, cx: sc.cx, cy: sc.cy, dials: DIALS };
  }

  /* ---------- the handle: a button on the stage ---------- */
  const handle = $('stageHandle');
  let dragging = null;
  const barrierEdge = (Lw) => [X(Lw), -HS, HS];
  const cursorPoint = (E) => [XS(), screenY(E), screenZ(0)];
  /** The screen point of the handle, or null where it cannot be dragged (no screen axis to slide along). */
  function handleAnchor(M) {
    if (S.scene === 'barrier') return sc.p(barrierEdge(S.L));
    const a = sc.p(cursorPoint(0)), b = sc.p(cursorPoint(E_MAX));
    if (Math.hypot(b[0] - a[0], b[1] - a[1]) < 40) return null;
    const norm = M.w > 0 ? 1 / (2 * M.w) : 0;
    return sc.p([XS(), screenY(S.Estar), screenZ(M.star.P * norm)]);
  }
  function placeHandle(q) {
    const show = !!q && !TRV.still;
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
    const label = S.scene === 'barrier' ? L('拖动势垒右缘改宽度 L', 'Drag the right edge of the barrier to change its width L') : L('拖动能量游标 E*', 'Drag the energy cursor E*');
    if (handle.getAttribute('aria-label') !== label) handle.setAttribute('aria-label', label);
  }
  /** The fraction along the projected segment a → b nearest to the pointer. */
  function along(ev, a, b) {
    const r = stageEl.getBoundingClientRect(), x = ev.clientX - r.left - stageEl.clientLeft, y = ev.clientY - r.top - stageEl.clientTop;
    const dx = b[0] - a[0], dy = b[1] - a[1], d2 = dx * dx + dy * dy;
    return d2 > 1 ? clamp(((x - a[0]) * dx + (y - a[1]) * dy) / d2, 0, 1) : null;
  }
  function dragTo(ev) {
    if (S.scene === 'barrier') {
      const s = along(ev, sc.p(barrierEdge(0.2)), sc.p(barrierEdge(1.2)));
      if (s != null) setWidth(Math.round((0.2 + s) * 100) / 100);
    } else {
      const s = along(ev, sc.p(cursorPoint(0)), sc.p(cursorPoint(E_MAX)));
      if (s != null) { S.Estar = Math.round(s * E_MAX * 100) / 100; paint(); }
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
    if (S.scene === 'barrier') setWidth(Math.round((S.L + 0.01 * sgn) * 100) / 100);
    else { S.Estar = clamp(Math.round((S.Estar + 0.1 * sgn) * 100) / 100, 0, E_MAX); paint(); }
  });

  /* ---------- HUD, legend, readouts ---------- */
  function legendItems(M) {
    if (S.scene === 'barrier' && M.real) return [['cy', L('实轴 I 里的余弦波', 'cosine wave in I')], ['mg', L('不可能的负方块 p²', 'impossible square p²')], ['am', L('经典粒子', 'classical particle')]];
    if (S.scene === 'barrier' && M.sol.regime === 'over') return [['cy', L('实波数：墙内 q、墙外 k', 'real wavenumbers: q inside, k outside')], ['mg', L('地面 i 上的影子', 'shadow on the floor i')], ['ring', L('宽度 L 手柄', 'width L handle')]];
    if (S.scene === 'barrier' && M.sol.regime === 'edge') return [['cy', L('振荡：I 上读得到', 'oscillation, read on I')], ['mg', L('直线桥 1 − ik(L − x)：κ = q = 0', 'linear bridge 1 − ik(L − x), κ = q = 0')], ['ring', L('宽度 L 手柄', 'width L handle')]];
    if (S.scene === 'barrier') return [['cy', L('振荡：I 上读得到', 'oscillation, read on I')], ['mg', L('割弦：躺在 i 里', 'chord, lying in i')], ['vi', L('动量转 ±90°', 'momentum turns ±90°')], ['ring', L('宽度 L 手柄', 'width L handle')]];
    return [['cy', L('两支时间分支', 'two time branches')], ['mg', L('包络与相位 E*Δt/ℏ', 'envelope, phase E*Δt/ℏ')], ['am', L('能量游标 E*', 'energy cursor E*')]];
  }
  function hudText(M) {
    const sol = M.sol;
    let big, sub;
    if (S.scene === 'barrier' && M.real) {
      const below = sol.E < V0 - 1e-12;
      big = below ? 'p² = 2m(E − V₀) &lt; 0' : 'p² = 2m(E − V₀) ≥ 0';
      sub = `E − V₀ = ${fix(sol.E - V0, 2)} eV · T<sub>cl</sub> = ${M.Tcl}`;
    } else if (S.scene === 'barrier') {
      big = `T(E) = ${fix(sol.T, 4)}` + (sol.regime === 'tunnel' ? ` · κL = ${fix(sol.inner, 2)}` : sol.regime === 'over' ? ` · qL = ${fix(sol.inner, 2)}` : ' · E = V₀');
      sub = `E/V₀ = ${fix(S.ratio, 2)} · L = ${fix(S.L, 2)} nm · ` + (M.z.n > 0 ? `T<sub>mon</sub> = ${fix(M.z.Tmon, 4)}` : sol.regime === 'tunnel' ? `κ = ${fix(sol.kap, 3)} nm⁻¹` : `k = ${fix(sol.k, 3)} nm⁻¹`);
    } else {
      big = `ΔE = h/Δt = ${fix(M.deltaE, 4)} eV`;
      sub = `Δt = ${Math.round(S.dtAs)} as · V = ${fix(M.V, 2)} · E* = ${fix(S.Estar, 2)} eV`;
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('legend').innerHTML = legendItems(M).map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  function drawText(M) {
    const sol = M.sol, I = instances(M);
    const slits = S.scene === 'slits';
    $('roKeyZh').innerHTML = slits ? '条纹间距 ΔE = h/Δt' : (M.real ? '经典穿透 T<sub>cl</sub>' : '穿透率 T(E)');
    $('roKeyEn').innerHTML = slits ? 'Fringe spacing ΔE = h/Δt' : (M.real ? 'Classical transmission T<sub>cl</sub>' : 'Transmission T(E)');
    if (slits) { $('roKey').textContent = `${fix(M.deltaE, 4)} eV`; $('roKeySub').innerHTML = ` · Δt = ${Math.round(S.dtAs)} as`; }
    else if (M.real) { $('roKey').textContent = String(M.Tcl); $('roKeySub').innerHTML = ` · ${L('量子', 'quantum')} T = ${fix(sol.T, 4)}`; }
    else { $('roKey').textContent = fix(sol.T, 4); $('roKeySub').innerHTML = ` · |r|² + |t|² = ${fix(sol.rAbs2 + sol.tAbs2, 6)}`; }
    const inner = sol.regime === 'tunnel' ? `κ = ${fix(sol.kap, 4)} · κL = ${fix(sol.inner, 3)}` : sol.regime === 'over' ? `q = ${fix(sol.q, 4)} · qL = ${fix(sol.inner, 3)}` : 'κ = 0 (E = V₀)';
    $('roWave').innerHTML = `k = ${fix(sol.k, 4)} · ${inner}`;
    $('roKin').innerHTML = sol.regime === 'tunnel' ? `(îℏκ)²/2m = −ℏ²κ²/2m = ${fix(M.kinetic, 4)} eV` : `p²/2m = ${fix(M.kinetic, 4)} eV`;
    const turnWord = sol.regime === 'over' ? L('相位转', 'phase turns') : L('相位只转', 'phase turns only');
    $('roSplit').innerHTML = `${fix(M.shareI, 4)} + ${fix(M.shareImag, 4)} = ${fix(M.shareI + M.shareImag, 6)} · ${turnWord} ${fix(sol.chordTurn / DEG, 1)}°`;
    const wph = ((M.starFull.phi % TAU) + TAU) % TAU;
    $('roComb').innerHTML = `ΔE = ${fix(M.deltaE, 4)} eV · E*Δt/ℏ + Δγ<sub>B</sub> = ${fix(wph / PI, 3)}π`;
    $('roProbe').innerHTML = `V = ${fix(M.V, 2)} · ‖ρ − P(ρ)‖² = ${fix(I.pinch.hs, 4)} · n = ${M.z.n} · T<sub>mon</sub> = ${fix(M.z.Tmon, 4)} · Σp + s = ${fix(M.z.total, 6)}`;
    $('roNote').innerHTML = slits
      ? L(`游标处“哪个时刻”的读出是 ${fix(I.diag.cursorWhichTime[0], 2)}、${fix(I.diag.cursorWhichTime[1], 2)}，与相位无关；干涉读出 X = V cos φ = ${fix(I.diag.cursorX, 3)} 才看得见相位。`,
        `At the cursor the which-time readouts are ${fix(I.diag.cursorWhichTime[0], 2)} and ${fix(I.diag.cursorWhichTime[1], 2)} whatever the phase; only the interference readout X = V cos φ = ${fix(I.diag.cursorX, 3)} sees it.`)
      : barrierNote(sol);
    $('scenePill').innerHTML = `IMAG <strong>${slits ? L('时间双缝', 'TIME SLITS') : L('势垒割弦', 'BARRIER')}</strong>`;
    $('keyPill').innerHTML = slits ? `ΔE <strong>${fix(M.deltaE, 3)} eV</strong>` : `T <strong>${fix(M.real ? M.Tcl : sol.T, 4)}</strong>`;
    $('hint').innerHTML = slits ? L('拖琥珀游标扫能谱 · 拖空白处转视角', 'drag the amber cursor across the spectrum · drag empty space to orbit') : L('拖琥珀手柄改势垒宽 L · 拖空白处转视角', 'drag the amber handle to change L · drag empty space to orbit');
    $('formula').innerHTML = slits ? 'P(E) = |A₁|² + |A₂|² + 2V|A₁A₂| cos(EΔt/ℏ + Δγ<sub>B</sub>)' : BARRIER_FORMULA[sol.regime];
  }
  /** The transmission of each regime, as the solver computes it. */
  const BARRIER_FORMULA = {
    tunnel: 'T = [1 + V₀² sinh²(κL)/(4E(V₀ − E))]⁻¹ · p = îℏκ',
    edge: 'T = [1 + m V₀ L²/(2ℏ²)]⁻¹ · κ = 0',
    over: 'T = [1 + V₀² sin²(qL)/(4E(E − V₀))]⁻¹ · q = √(2m(E − V₀))/ℏ'
  };
  /** What the field inside the wall does in the regime of the solver: decay in i, a straight line, or a real wavenumber
      whose |ψ| still falls monotonically (qL ≤ π/2) or rises and falls as a standing wave (qL > π/2). */
  function barrierNote(sol) {
    const turn = fix(sol.chordTurn / DEG, 1);
    if (sol.regime === 'tunnel') {
      const g = fix(sol.growRatio, 4), kl = fix(sol.inner, 3), tail = L(`割弦不振荡，相位在整段墙里只转 ${turn}°（&lt; 90°），振幅单调下降。墙外的螺旋每走一个波长转一整圈。`,
        `The chord does not oscillate; its phase turns by only ${turn}° (&lt; 90°) across the wall while its amplitude falls. Outside, the helix turns once per wavelength.`);
      if (sol.decayDominant) {
        return L(`E &lt; V₀：墙内动量转进 i，有限厚的墙里割弦是 C₊e<sup>−κx</sup> + C₋e<sup>+κx</sup>，以 e<sup>−κx</sup> 为主：增长项与它之比 e<sup>−2κ(L − x)</sup> 在墙口只有 ${g}，到墙尾才等大。`,
          `E &lt; V₀: inside the wall the momentum turns into i. In a wall of finite width the chord is C₊e<sup>−κx</sup> + C₋e<sup>+κx</sup>, dominated by e<sup>−κx</sup>: the growing term is e<sup>−2κ(L − x)</sup> of it, only ${g} at the entrance and equal at the exit. `) + tail;
      }
      return L(`E &lt; V₀：墙内动量转进 i，有限厚的墙里割弦是 C₊e<sup>−κx</sup> + C₋e<sup>+κx</sup>；κL = ${kl} 很小，两项量级相当：增长项与衰减项之比 e<sup>−2κ(L − x)</sup> 在墙口已是 ${g}，到墙尾等大，割弦接近 E = V₀ 的直线桥。`,
        `E &lt; V₀: inside the wall the momentum turns into i. In a wall of finite width the chord is C₊e<sup>−κx</sup> + C₋e<sup>+κx</sup>; with κL = ${kl} small the two terms are comparable: the growing term is e<sup>−2κ(L − x)</sup> of the decaying one, already ${g} at the entrance and equal at the exit, and the chord is close to the linear bridge of E = V₀. `) + tail;
    }
    if (sol.regime === 'edge') {
      return L(`E = V₀：κ = q = 0，墙内 p²/2m = E − V₀ = 0，场既不衰减也不振荡，是直线桥 ψ ∝ 1 − ik(L − x)：相位转 ${turn}° = arctan(kL)，振幅单调下降；T = [1 + m V₀ L²/(2ℏ²)]⁻¹。`,
        `E = V₀: κ = q = 0, so p²/2m = E − V₀ = 0 inside and the field neither decays nor oscillates: it is the linear bridge ψ ∝ 1 − ik(L − x); its phase turns by ${turn}° = arctan(kL) while its amplitude falls, and T = [1 + m V₀ L²/(2ℏ²)]⁻¹.`);
    }
    const qL = fix(sol.inner / DEG, 1);
    if (sol.ampMonotone) {
      const a0 = fix(sol.ampEntrance, 2);
      return L(`E &gt; V₀：墙内波数 q = √(2m(E − V₀))/ℏ 是实数，波没有躲进 i；但累积相位 qL = ${qL}° 还不到四分之一周期（90°）：ψ 的相位在墙里转 ${turn}°，|ψ| 仍从墙口的 ${a0}|t| 单调降到墙尾的 |t|。qL 超过 90° 后墙里才出现法布里–珀罗驻波，qL = nπ 处 T = 1。`,
        `E &gt; V₀: the wavenumber q = √(2m(E − V₀))/ℏ inside is real, so the wave does not hide in i; but the accumulated phase qL = ${qL}° is still under a quarter period (90°): the phase of ψ turns by ${turn}° across the wall and |ψ| still falls monotonically from ${a0}|t| at the entrance to |t| at the exit. Only once qL passes 90° does a Fabry–Pérot standing wave form inside, with T = 1 where qL = nπ.`);
    }
    const n = sol.ampExtrema;
    return L(`E &gt; V₀：墙内波数 q = √(2m(E − V₀))/ℏ 是实数，波没有躲进 i，而是继续振荡：累积相位 qL = ${qL}° 超过 90°，ψ 的相位在墙里转 ${turn}°，可以超过 90°；|ψ| 在墙里随驻波起伏（法布里–珀罗，墙内 ${n} 个极值），qL = nπ 处 T = 1。`,
      `E &gt; V₀: the wavenumber q = √(2m(E − V₀))/ℏ inside is real, so the wave does not hide in i but keeps oscillating: the accumulated phase qL = ${qL}° passes 90° and the phase of ψ turns by ${turn}° across the wall, which can exceed 90°; |ψ| rises and falls inside the wall as a Fabry–Pérot standing wave (${n} ${n === 1 ? 'extremum' : 'extrema'} inside), and T = 1 where qL = nπ.`);
  }

  /* ---------- strip plot ---------- */
  function drawPlot(M) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    const pad = [40, 12, 10, 22];
    if (S.scene === 'barrier') {
      $('plotTitle').textContent = L('穿透率 T(E)：同一个 L 下扫一遍能量', 'Transmission T(E) across energies at this L');
      const g = kit.plot(cv, { x: [0.1, 1.4], y: [0, 1.05], pad });
      g.axes({ xTicks: [0.2, 0.6, 1, 1.4], yTicks: [0, 0.5, 1], xLabel: 'E/V₀' });
      const rs = range(0.1, 1.4, 260);
      g.vline(1, P.ink, { alpha: 0.5, dash: [4, 4] });
      if (M.real) g.line(rs.map((r) => [r, r < 1 ? 0 : 1]), P.ink, { width: 1.6, dash: [5, 4] });
      g.line(rs.map((r) => [r, solve(r, S.L).T]), P.cyan, { width: 2.2 });
      if (!M.real && M.z.n > 0) g.line(rs.map((r) => [r, zeno(solve(r, S.L).T, S.probe).Tmon]), P.magenta, { width: 2, dash: [5, 4] });
      const T0 = M.real ? M.Tcl : M.z.n > 0 ? M.z.Tmon : M.sol.T;
      g.vline(S.ratio, P.amber, { alpha: 0.85 }); g.dot(S.ratio, T0, P.amber, 3.8);
      g.text(1.01, 0.96, 'V₀', P.ink, { align: 'left', size: 10 });
      g.text(0.12, 0.9, 'T(E)', P.cyan, { align: 'left', size: 10.5 });
      if (!M.real && M.z.n > 0) g.text(0.12, 0.76, 'T_{mon}', P.magenta, { align: 'left', size: 10.5 });
      $('plotMeta').innerHTML = `E/V₀ = ${fix(S.ratio, 2)} · T = ${fix(M.sol.T, 4)}` + (M.z.n > 0 ? ` · T<sub>mon</sub> = ${fix(M.z.Tmon, 4)}` : '') + (M.real ? ` · T<sub>cl</sub> = ${M.Tcl}` : '');
    } else {
      $('plotTitle').textContent = L('能谱 P(E)：暗纹相隔 ΔE = h/Δt', 'Spectrum P(E): dark nodes ΔE = h/Δt apart');
      const g = kit.plot(cv, { x: [0, E_MAX], y: [0, 2.1], pad });
      g.axes({ xTicks: [0, 5, 10, 15, 20], yTicks: [0, 1, 2], xLabel: 'E (eV)' });
      const Es = range(0, E_MAX, 400), norm = M.w > 0 ? 1 / (2 * M.w) : 0;
      g.line(Es.map((E) => [E, specAt(E, M, M.gates).inc * norm]), P.magenta, { width: 1.6, dash: [5, 4] });
      g.line(Es.map((E) => [E, specAt(E, M, M.gates).P * norm]), P.cyan, { width: 2.2 });
      if (M.V > 0) for (const E of M.dark) g.dot(E, 0.02, P.magenta, 2.4);
      g.vline(S.Estar, P.amber, { alpha: 0.85 }); g.dot(S.Estar, M.star.P * norm, P.amber, 3.8);
      g.text(0.3, 1.92, 'P(E)/2w', P.cyan, { align: 'left', size: 10.5 });
      g.text(19.7, 1.92, '|A_{1}|^{2} + |A_{2}|^{2}', P.magenta, { align: 'right', size: 10.5 });
      $('plotMeta').innerHTML = `ΔE = h/Δt = ${fix(M.deltaE, 4)} eV · V = ${fix(M.V, 2)} · E* = ${fix(S.Estar, 2)} eV`;
    }
  }

  const paint = kit.painter(() => {
    const M = model();
    hudText(M); TRV.hudFit();
    drawStage(M); drawText(M); drawPlot(M);
  }, [stageEl, $('plot')]);

  /* ---------- the rail: time t (fs) ---------- */
  const playBtn = $('playBtn');
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: T_MAX, t: 0, rate: 1, step: 0.5, loop: true,
    format: (t) => `t ${fix(t, 2)} fs <small>/ ${T_MAX} fs</small>`,
    onChange: (t, C) => { S.t = t; playBtn.textContent = C.playing ? '❚❚' : '▷'; playBtn.setAttribute('aria-pressed', String(C.playing)); paint(); }
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
  function leave() { stopBootPlay(); if (transition) transition.cancel(); transition = null; cards.mark(null); clock.pause(); }
  const fRatio = kit.field($('energyRatio'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.ratio = clamp(v, 0.1, 1.4); paint(); } });
  const fWidth = kit.field($('barrierWidth'), { fmt: (v) => `${fix(v, 2)} nm`, onInput: (v) => { leave(); S.L = clamp(v, 0.2, 1.2); paint(); } });
  const fDelay = kit.field($('gateDelay'), { fmt: (v) => `${Math.round(v)} as`, onInput: (v) => { leave(); S.dtAs = clamp(v, 250, 2500); paint(); } });
  const fProbe = kit.field($('probeStrength'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.probe = clamp(v, 0, 1); paint(); } });
  const fPhase = kit.field($('branchPhase'), { fmt: (v) => `${kit.sgn(v, 0)}°`, onInput: (v) => { leave(); S.dgB = clamp(v, -180, 180); paint(); } });
  function setWidth(v) { S.L = clamp(v, 0.2, 1.2); fWidth.set(S.L); paint(); }
  const lensBtn = $('lensToggle');
  function setLens(lens) { S.lens = lens === 'real' ? 'real' : 'complex'; lensBtn.setAttribute('aria-pressed', String(S.lens === 'complex')); }
  lensBtn.addEventListener('click', () => { leave(); setLens(S.lens === 'complex' ? 'real' : 'complex'); paint(); });
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); S.scene = v === 'slits' ? 'slits' : 'barrier'; paint(); });
  function setVantage(v, ms) {
    S.vantage = VIEWS[v] ? v : 'oblique';
    vantageChips.set(S.vantage, true);
    sc.view(VIEWS[S.vantage], ms);
    paint();
  }
  const vantageChips = kit.chips($('vantageChips'), 'vantage', (v) => { stopBootPlay(); setVantage(v, 600); });
  kit.keys({ v: () => setVantage(VANTAGES[(VANTAGES.indexOf(S.vantage) + 1) % 3], 600) });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'classical-real-wall': { scene: 'barrier', lens: 'real', ratio: 0.5, L: 0.6, dt: 1000, probe: 0, dgB: 0, cursor: 'bright', vantage: 'side', play: true, still: 3 },
    'ninety-deg-imaginary-chord': { scene: 'barrier', lens: 'complex', ratio: 0.5, L: 0.6, dt: 1000, probe: 0, dgB: 0, cursor: 'bright', vantage: 'oblique', play: true, still: 0 },
    'temporal-double-slit-comb': { scene: 'slits', lens: 'complex', ratio: 0.5, L: 0.4, dt: 1000, probe: 0, dgB: 0, cursor: 'bright', vantage: 'oblique', play: true, still: 6.5 },
    'attosecond-tunnel-self-interference': { scene: 'slits', lens: 'complex', ratio: 0.5, L: 0.4, dt: 2500, probe: 0, dgB: 0, cursor: 'dark', vantage: 'oblique', play: true, still: 6.5 },
    'zeno-midway-probe-collapse': { scene: 'slits', lens: 'complex', ratio: 0.5, L: 0.4, dt: 1000, probe: 1, dgB: 0, cursor: 'bright', vantage: 'oblique', play: true, still: 6.5 }
  };
  const NOTES = {
    'classical-real-wall': ['实轴经典读法：E/V₀ = 0.50 的电子在竖直的 I 平面里撞墙。墙里 p² = 2m(E − V₀) &lt; 0，实数里没有这样的 p：品红虚线方块就是那块不可能的负面积。琥珀色的经典粒子在 x = 0 折返，青色入射波与暗色反射波叠成驻波，墙后什么也没有。', 'The real-axis classical reading: an electron with E/V₀ = 0.50 hits the wall in the vertical plane I. Inside, p² = 2m(E − V₀) &lt; 0, and no real p does that: the dashed magenta square is that impossible negative area. The amber classical particle turns back at x = 0, the cyan incident and dark reflected waves make a standing wave, and nothing appears behind the wall.'],
    'ninety-deg-imaginary-chord': ['复平面读法：青色螺旋入射，墙口的紫色弧把动量 k 转 90° 成 iκ，送进水平的虚平面 i；墙里是一条不绕圈、单调变细的品红割弦（κ = 3.6226 nm⁻¹，κL = 2.17，相位只转 44.3°），墙尾再转 −90°，以振幅 √T = 0.225 回到实轴。地面上的品红影子就是这座桥，后墙上的青色影子在墙里几乎为零。', 'The complex reading: the cyan helix comes in and the violet arc at the entrance turns the momentum k by 90° into iκ, into the horizontal blind plane i; inside the wall a magenta chord narrows without winding (κ = 3.6226 nm⁻¹, κL = 2.17, the phase turns by only 44.3°), turns back by −90° at the exit and returns to the real axis with amplitude √T = 0.225. The magenta shadow on the floor is that bridge; the cyan shadow on the back wall almost vanishes inside the wall.'],
    'temporal-double-slit-comb': ['两道快门在 t₁ = 1.00 fs、t₂ = 2.00 fs 打开，同一个电子分成两支青色波包，先后穿过同一条割弦飞向右端的能谱屏。屏上条纹间距 ΔE = h/Δt = 4.1357 eV，琥珀游标停在亮纹 E* = 8.27 eV，相量盘上两支同向相加。', 'Two gates open at t₁ = 1.00 fs and t₂ = 2.00 fs: one electron splits into two cyan packets that pass the same chord one after the other and fly to the spectral screen at the right. The fringes on the screen are ΔE = h/Δt = 4.1357 eV apart; the amber cursor sits on the bright fringe E* = 8.27 eV, where the two phasors on the dial add up.'],
    'attosecond-tunnel-self-interference': ['Δt = 2500 as：条纹间距缩到 ΔE = 1.6543 eV。琥珀游标停在暗纹 E* = 10.75 eV：地面相量盘上两支相量首尾相接正好回到起点，跨时刻的两支在这里 100% 相消；地面上的品红暗河就是它们之间的相位 E*Δt/ℏ，后墙读不到它。', 'Δt = 2500 as: the fringe spacing shrinks to ΔE = 1.6543 eV. The amber cursor sits on the dark node E* = 10.75 eV: on the floor dial the two phasors, head to tail, return to the start, and the two branches from different times cancel 100% here; the magenta river on the floor is the phase E*Δt/ℏ between them, which the back wall cannot read.'],
    'zeno-midway-probe-collapse': ['中途实轴探针 p = 1：12 道检查环把割弦切成 13 段，分支比特被捏合，相干 V = 0，能谱屏上的条纹塌成平滑的包络 |A₁|² + |A₂|²；受监测的穿透从 T = 0.198 掉到 T_mon = 0.0161，透出的两支波包几乎看不见。', 'Midway real-axis probe p = 1: twelve check rings cut the chord into 13 pieces, the branch qubit is pinched, the coherence V = 0, and the fringes on the screen flatten into the smooth envelope |A₁|² + |A₂|²; the monitored transmission drops from T = 0.198 to T_mon = 0.0161 and the two packets that come through are barely visible.']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'classical-real-wall': ['E &lt; V₀：墙里 p² &lt; 0，实轴上没有这样的 p；琥珀粒子在墙前折返，墙后为空。', 'E &lt; V₀: inside the wall p² &lt; 0 and no real p exists; the amber particle turns back and nothing passes.'],
    'ninety-deg-imaginary-chord': ['动量转 90° 进入 i：品红割弦不绕圈地变细，出墙后以 √T = 0.225 回到实轴。', 'In i the magenta chord narrows without winding and exits with √T = 0.225.'],
    'temporal-double-slit-comb': ['两支波包先后穿墙，能谱屏上的条纹相隔 ΔE = h/Δt = 4.1357 eV。', 'The two branches pass the wall one after the other; the fringes are ΔE = h/Δt = 4.1357 eV apart.'],
    'attosecond-tunnel-self-interference': ['Δt = 2500 as：游标停在暗纹 E* = 10.75 eV，两支相量首尾闭合、完全相消。', 'Δt = 2500 as: the cursor sits on the dark node E* = 10.75 eV, where the two phasors close up and cancel.'],
    'zeno-midway-probe-collapse': ['探针 p = 1：相干 V = 0，条纹塌成包络，受监测穿透降到 0.0161。', 'Probe p = 1: coherence V = 0, the fringes flatten and the monitored transmission drops to 0.0161.']
  };
  /** The cursor of a card: the bright fringe or the dark node nearest the spectral centre. */
  const cursorFor = (p) => Math.round(nearest(nodes(p.dt / 1000, p.dgB * DEG, p.cursor === 'dark'), E_C) * 1e6) / 1e6;
  function syncFields() { fRatio.set(S.ratio); fWidth.set(S.L); fDelay.set(S.dtAs); fProbe.set(S.probe); fPhase.set(S.dgB); }
  function applyPreset(id) {
    const p = PRESETS[id];
    stopBootPlay(); clock.pause();
    if (transition) transition.cancel();
    transition = null;
    S.scene = p.scene; sceneChips.set(p.scene, true); setLens(p.lens);
    setVantage(p.vantage, booting || TRV.still ? 0 : 600);
    const from = { ratio: S.ratio, L: S.L, dt: S.dtAs, probe: S.probe, dgB: S.dgB };
    const finish = () => { S.ratio = p.ratio; S.L = p.L; S.dtAs = p.dt; S.probe = p.probe; S.dgB = p.dgB; S.Estar = cursorFor(p); syncFields(); paint(); };
    S.Estar = cursorFor(p);
    if (booting || TRV.still) finish();
    else {
      const token = {};
      transition = token;
      token.cancel = () => { if (token.run) token.run.cancel(); };
      token.run = kit.tween(550, (e) => {
        S.ratio = from.ratio + (p.ratio - from.ratio) * e; S.L = from.L + (p.L - from.L) * e; S.dtAs = from.dt + (p.dt - from.dt) * e;
        S.probe = from.probe + (p.probe - from.probe) * e; S.dgB = from.dgB + (p.dgB - from.dgB) * e; syncFields(); paint();
      }, () => { if (transition === token) transition = null; finish(); });
    }
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still);
    else clock.set(0);
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) bootAutoplay(); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拉 E/V₀、L、Δt、探针 p 与 Δγ<sub>B</sub>，换透镜、场景或视角，拖琥珀手柄。随时可以再选一张卡。', 'Free play: pull E/V₀, L, Δt, the probe p and Δγ<sub>B</sub>, switch the lens, the scene or the vantage, drag the amber handle. Pick a card again at any time.']
  });
  // the tour bar's card title carries the id #tourStep
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.IMAG_TUNNEL_DEBUG = Object.freeze({
    get state() {
      const M = model(), I = instances(M), sol = M.sol, norm = M.w > 0 ? 1 / (2 * M.w) : 0;
      const Es = range(0, E_MAX, 400);
      return JSON.parse(JSON.stringify({
        preset: cards.current, t: clock.t, playing: clock.playing, scene: S.scene, lens: S.lens, vantage: S.vantage,
        energyRatio: S.ratio, energyEv: sol.E, barrierWidthNm: S.L, gateDelayAs: S.dtAs, gateDelayFs: M.dt, probeStrength: S.probe,
        branchPhaseDeg: S.dgB, cursorEv: S.Estar,
        constants: { me: ME, hbar: HBAR, eV: QE, hEvFs: H_EVFS, c2: C2, V0, sigmaT: SIGMA_T, t1: T1, centreEv: E_C, maxEv: E_MAX, checksAtFull: N_CHECK },
        regime: sol.regime, k: sol.k, kappa: sol.kap, q: sol.q, innerProduct: sol.inner, transmission: sol.T, tAbs2: sol.tAbs2, rAbs2: sol.rAbs2,
        tAmp: sol.t, rAmp: sol.r, gamma0: sol.gamma0, chordTurnRad: sol.chordTurn, omega: M.omega, phase: M.phase,
        amplitude: { monotone: sol.ampMonotone, extrema: sol.ampExtrema, entranceOverExit: sol.ampEntrance, growRatio: sol.growRatio, decayDominant: sol.decayDominant },
        chord: range(0, S.L, 16).map((x) => ({ x, psi: sol.psiIn(x) })),
        shareI: M.shareI, shareImag: M.shareImag, kineticEv: M.kinetic, classicalTransmission: M.Tcl, classicalX: classical(sol, S.t),
        deltaE: M.deltaE, darkNodes: M.dark, brightNodes: M.bright, coherence: M.V, weight: M.w,
        gates: M.gates, cursor: { phase: M.starFull.phi, P: M.star.P, Pfull: M.starFull.P, inc: M.starFull.inc, normalized: M.star.P * norm },
        spectrum: Es.map((E) => ({ E, P: specAt(E, M, M.full).P, inc: specAt(E, M, M.full).inc })),
        zeno: { checks: M.z.n, segments: M.z.m, Theta: M.z.Theta, Tmon: M.z.Tmon, survival: M.z.survival, returns: M.z.returns },
        packets: S.scene === 'slits' ? [packetPos(M, 1), packetPos(M, 2)] : [],
        leanInstances: I, camera: Object.assign({}, sc.cam), handle: FRAME ? FRAME.handle : null, labels: PLACED, stageFrame: FRAME
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock). */
    setState(o) {
      leave();
      if (o.scene != null) { S.scene = o.scene === 'slits' ? 'slits' : 'barrier'; sceneChips.set(S.scene, true); }
      if (o.lens != null) setLens(o.lens);
      if (o.ratio != null) S.ratio = clamp(o.ratio, 0.1, 1.4);
      if (o.L != null) S.L = clamp(o.L, 0.2, 1.2);
      if (o.dtAs != null) S.dtAs = clamp(o.dtAs, 250, 2500);
      if (o.probe != null) S.probe = clamp(o.probe, 0, 1);
      if (o.dgB != null) S.dgB = clamp(o.dgB, -180, 180);
      if (o.Estar != null) S.Estar = clamp(o.Estar, 0, E_MAX);
      syncFields();
      if (o.vantage != null) setVantage(o.vantage, 0);
      if (o.t != null) clock.set(clamp(o.t, 0, T_MAX));
      paint();
    },
    /** Viewport coordinates of the handle (for pointer tests), or null when hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates where the handle would sit for a barrier width Lw or a cursor energy E (for drag targets). */
    dragTarget(v) {
      const b = stageEl.getBoundingClientRect(), q = S.scene === 'barrier' ? sc.p(barrierEdge(v)) : sc.p(cursorPoint(v));
      return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] };
    }
  });
  window.TRV_THUMB = () => { cards.pick('ninety-deg-imaginary-chord'); clock.pause(); clock.set(0); sc.view([VIEWS.oblique[0], VIEWS.oblique[1], 1], 0); paint.now(); };
  cards.pick(cards.initial('ninety-deg-imaginary-chord'));
  booting = false;
  paint();
})();
