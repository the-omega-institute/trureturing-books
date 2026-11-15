/* COSET//TOWER · 破缺—守恒陪集概念塔 · Breaking–conservation coset towers
   The stage is the Mexican-hat potential V(Φ) = λ(|Φ|² − η²)² (λ = 1), drawn where V ≤ V_max as a lit solid bowl on
   a plinth. For η = η_SSB > 0 its lowest points form the trough |Φ| = η; the amber anchor v₀ is the vacuum picked on
   it, at azimuth φ₀ (the rail; dragging the anchor scrubs the rail). On the anchor stands the object of the family:
     T1 gravity        the coset sphere SU(2)/U(1) and the solid trihedron ΔT_ε: right angle at the pole v₀, legs of
                       length ε along e¹ (the trough tangent) and e² (outward); excess Ω = 2 atan(tan²(ε/2)); on its
                       first face the Pythagorean triangle of the split cos²ε + sin²ε = 1
     T2 electroweak    the Goldstone ripple round the trough, screened by e^{−s/λ_V}; two transverse ribbons; the arc
                       that is eaten (it shrinks as g → 1); the 3-DOF massive core, radius growing with m_V
     T3 strong         the B = 1 hedgehog (F = 2 atan(R²/r²)) and the chiral half-circle from U = 1 to U = −1
     T4 superconductor the vortex core at the hilltop (|Φ| = 0), its flux line, a helix of one phase winding, and the
                       12-site lattice ring carrying an acoustic phonon
     T5 consensus      five towers dim G = dim H (cyan) + dim G/H (magenta) round the trough, the relay through their
                       tops and the fixed point θ* = cos θ*
   Model choices: ε = (π/2) η; m_V = g η v₀ with v₀ = 1; κ = λ/ξ = √2/g. Every number is computed here; the instances
   of the cited Lean theorems are checked in instances(). Read-only probe: window.COSET_TOWER_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180, UP = [0, 0, 1];
  const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));

  /* ---------- constants ---------- */
  const ZR = 0.54, ZBASE = -0.2, R_A = 0.085;                    // rim height (V = V_max), bottom of the dish, anchor
  /** The level the bowl is cut at: V_max = λ max(1.15 η⁴, 0.4), λ = 1, so the hilltop V(0) = λη⁴ always lies inside. */
  const vmaxOf = (eta) => Math.max(1.15 * eta ** 4, 0.4);
  const PHYS = { mW: 80.377, mZ: 91.1876, mp: 938.272, mq: 8.99, vEW: 246.22, h: 6.62607015e-34, e: 1.602176634e-19, MPl: 1.220890e19 };
  const FLUX = PHYS.h / (2 * PHYS.e);                            // Φ₀ = h/2e (exact SI constants)
  const SIN2W = 1 - (PHYS.mW / PHYS.mZ) ** 2;                    // on-shell weak mixing
  const PROTON_FRACTION = (PHYS.mp - PHYS.mq) / PHYS.mp;         // the part of m_p that is not 2m_u + m_d
  let THETA_STAR = 0.7; for (let i = 0; i < 200; i++) THETA_STAR = Math.cos(THETA_STAR);
  const VIEW0 = [-0.55, 0.5];
  const COVER = 0.44;                                             // √(share of the stage the bowl's silhouette may take)
  const FAM = [
    { code: 'T1', zh: '引力', en: 'Gravity', G: 'GL(4,ℝ)', H: 'SO(3,1)', dimG: 16, dimH: 6, az: 162 },
    { code: 'T2', zh: '电弱', en: 'Electroweak', G: 'SU(2)×U(1)', H: 'U(1)<sub>em</sub>', dimG: 4, dimH: 1, az: 234 },
    { code: 'T3', zh: '强核', en: 'Strong', G: 'SU(2)<sub>L</sub>×SU(2)<sub>R</sub>', H: 'SU(2)<sub>V</sub>', dimG: 6, dimH: 3, az: 306 },
    { code: 'T4', zh: '超导', en: 'Superconductor', G: 'U(1)', H: 'ℤ₂', dimG: 1, dimH: 0, az: 18 },
    { code: 'T5', zh: '共识', en: 'Consensus', G: 'SO(2)', H: '1', dimG: 1, dimH: 0, az: 90 }
  ];
  const famName = (k) => `${FAM[k].code} ${L(FAM[k].zh, FAM[k].en)}`;

  /* ---------- state ---------- */
  const S = { family: 0, eta: 0.75, g: 0.65, phi: 70 };

  /* ---------- geometry of the split and the trihedron ---------- */
  const epsOf = (eta) => 0.5 * PI * eta;
  const omegaOf = (eps) => 2 * Math.atan(Math.tan(eps / 2) ** 2);          // right isosceles spherical triangle, legs ε
  /** Height drawn for V(ρ) = λ(ρ² − η²)²: ZR · V / V_max. */
  const potZ = (rho, M) => ZR * (rho * rho - M.rt * M.rt) ** 2 / M.vmax;
  const frame = (phi) => ({ t1: [-Math.sin(phi), Math.cos(phi), 0], t2: [Math.cos(phi), Math.sin(phi), 0] });
  /** The corners of ΔT_ε for the anchor at azimuth phi: the pole N, B (ε along e¹), D (ε along e²). */
  function corners(eps, phi) {
    const { t1, t2 } = frame(phi), c = Math.cos(eps), s = Math.sin(eps);
    return { N: UP.slice(), B: [s * t1[0], s * t1[1], c], D: [s * t2[0], s * t2[1], c], t1, t2 };
  }
  /** Both sides of Lagrange's identity for u, v: |u|²|v|² − (u·v)² and ½ ΣΣ (uᵢvⱼ − uⱼvᵢ)². */
  function lagrange(u, v) {
    let uu = 0, vv = 0, uv = 0, wedge = 0;
    for (let i = 0; i < 3; i++) { uu += u[i] * u[i]; vv += v[i] * v[i]; uv += u[i] * v[i]; }
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) wedge += (u[i] * v[j] - u[j] * v[i]) ** 2;
    wedge /= 2;
    return { lhs: uu * vv - uv * uv, rhs: wedge, cos2: uv * uv, sin2: wedge };
  }
  /** Solid angle of the spherical triangle abc (Van Oosterom–Strackee). */
  const solidAngle = (a, b, c) => Math.abs(2 * Math.atan2(v3.dot(a, v3.cross(b, c)), 1 + v3.dot(a, b) + v3.dot(b, c) + v3.dot(c, a)));
  const det3 = (M) => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);

  /* ---------- 2 × 2 complex matrices: su(2) with X_k = −iσ_k/2, [X₁, X₂] = X₃ ---------- */
  const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const ca = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mm = (A, B) => [0, 1].map((i) => [0, 1].map((j) => ca(cm(A[i][0], B[0][j]), cm(A[i][1], B[1][j]))));
  const madd = (A, B, s = 1) => A.map((r, i) => r.map((z, j) => [z[0] + s * B[i][j][0], z[1] + s * B[i][j][1]]));
  const msc = (A, s) => A.map((r) => r.map((z) => [z[0] * s, z[1] * s]));
  const mdag = (A) => [[[A[0][0][0], -A[0][0][1]], [A[1][0][0], -A[1][0][1]]], [[A[0][1][0], -A[0][1][1]], [A[1][1][0], -A[1][1][1]]]];
  const mmax = (A) => Math.max(...A.flat().map((z) => Math.hypot(z[0], z[1])));
  const mtr = (A) => ca(A[0][0], A[1][1]);
  const comm = (A, B) => madd(mm(A, B), mm(B, A), -1);
  const I2 = [[[1, 0], [0, 0]], [[0, 0], [1, 0]]];
  const X1 = [[[0, 0], [0, -0.5]], [[0, -0.5], [0, 0]]];
  const X2 = [[[0, 0], [-0.5, 0]], [[0.5, 0], [0, 0]]];
  const X3 = [[[0, -0.5], [0, 0]], [[0, 0], [0, 0.5]]];
  const XS = [null, X1, X2, X3];
  const expX = (k, t) => madd(msc(I2, Math.cos(t / 2)), XS[k], 2 * Math.sin(t / 2));

  /** The Maurer–Cartan form of U(α, β) = e^{αX₁} e^{βX₂} at α = ε cos φ₀, β = ε sin φ₀: θ = U⁻¹dU from matrix products,
      its components θ = eᵃXₐ + ωX₃, the residual of dθ + θ∧θ = 0, and F + e¹∧e² (F = dω for the abelian H = U(1)). */
  function maurerCartan(eps, phi) {
    const a = eps * Math.cos(phi), b = eps * Math.sin(phi);
    const E1 = expX(1, a), E2 = expX(2, b), U = mm(E1, E2), Ui = mdag(U);
    const thA = mm(Ui, mm(X1, U));                              // ∂_α U = X₁ U
    const thB = mm(Ui, mm(E1, mm(E2, X2)));                     // ∂_β U = E₁ E₂ X₂
    const dThA = madd(msc(X1, -Math.sin(b)), X3, Math.cos(b));  // ∂_β θ_α, from the closed form cos β X₁ + sin β X₃
    const R = madd(comm(thA, thB), dThA, -1);                   // ∂_α θ_β − ∂_β θ_α + [θ_α, θ_β]; ∂_α θ_β = 0
    const comp = (th, X) => -2 * mtr(mm(th, X))[0];             // tr(X_j X_k) = −δ_jk / 2
    const eA = [comp(thA, X1), comp(thA, X2), comp(thA, X3)], eB = [comp(thB, X1), comp(thB, X2), comp(thB, X3)];
    const wedge = eA[0] * eB[1] - eA[1] * eB[0], F = -Math.cos(b);   // ω_α = sin β, ω_β = 0 ⇒ F_αβ = −cos β
    return { residual: mmax(R), thetaAlpha: eA, thetaBeta: eB, wedge, curvature: F, curvatureResidual: Math.abs(F + wedge) };
  }

  /* ---------- the instances of the cited theorems ---------- */
  const R3 = (ax, t) => { const c = Math.cos(t), s = Math.sin(t); return ax === 'x' ? [[1, 0, 0], [0, c, -s], [0, s, c]] : ax === 'y' ? [[c, 0, s], [0, 1, 0], [-s, 0, c]] : [[c, -s, 0], [s, c, 0], [0, 0, 1]]; };
  const mm3 = (A, B) => A.map((r) => [0, 1, 2].map((j) => r[0] * B[0][j] + r[1] * B[1][j] + r[2] * B[2][j]));
  const xlogx = (x) => (x > 0 ? x * Math.log(x) : 0);
  const entropyBloch = (r) => { const l = Math.hypot(r[0], r[1], r[2]); return -xlogx((1 + l) / 2) - xlogx((1 - l) / 2); };
  const skyF = (r) => 2 * Math.atan(1 / (r * r));                // R = 1: F(0) = π, F(∞) = 0
  const skyB = (r) => { const F = skyF(r); return 1 - F / PI + Math.sin(2 * F) / (2 * PI); };   // enclosed baryon number
  function skyrmion(eta) {
    if (!(eta > 0)) return { B: 0, quadrature: 0 };
    // B = (2/π) ∫₀^∞ sin²F (−F′) dr with r = x/(1 − x); Simpson on x ∈ [0, 1]
    const n = 4000, f = (x) => {
      if (x <= 0 || x >= 1) return 0;
      const r = x / (1 - x), F = skyF(r), dF = -4 * r / (r ** 4 + 1);
      return Math.sin(F) ** 2 * -dF / (1 - x) ** 2;
    };
    let sum = 0;
    for (let i = 0; i <= n; i++) sum += (i === 0 || i === n ? 1 : i % 2 ? 4 : 2) * f(i / n);
    const q = (2 / PI) * sum / (3 * n);
    return { B: Math.round(q), quadrature: q };
  }
  const instCache = new Map();
  function instances(M) {
    const key = `${M.eta}|${M.phiRad}|${M.g}`;
    if (instCache.has(key)) return instCache.get(key);
    const { eps, phiRad: phi, eta } = M, c = corners(eps, phi);
    // partition topology of the readout |Φ| on the trough
    const reads = Array.from({ length: 72 }, (_, j) => Math.hypot(M.rt * Math.cos(TAU * j / 72), M.rt * Math.sin(TAU * j / 72)));
    const spread = Math.max(...reads) - Math.min(...reads);
    const partition = { samples: 72, readoutSpread: spread, troughClasses: spread < 1e-12 ? 1 : new Set(reads.map((r) => r.toFixed(12))).size, hilltopSeparable: Math.abs(reads[0]) > 1e-12 };
    // Lagrange
    const lg = lagrange(c.N, c.B);
    const lagr = { lhs: lg.lhs, rhs: lg.rhs, residual: Math.abs(lg.lhs - lg.rhs) };
    // covariant commutator with U = exp(φ₀ T), f = X₁
    const Uh = expX(3, phi), ft = mm(Uh, mm(X1, mdag(Uh)));
    const covariant = { residual: mmax(madd(madd(mm(Uh, X1), mm(X1, Uh), -1), mm(madd(ft, X1, -1), Uh), -1)) };
    // the three-letter two-axis word for R_z(φ₀)
    const W = mm3(R3('x', PI / 2), mm3(R3('y', phi), R3('x', -PI / 2))), Z = R3('z', phi);
    let wd = 0; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) wd = Math.max(wd, Math.abs(W[i][j] - Z[i][j]));
    const twoAxis = { letters: 3, residual: wd };
    // anchored phases on the ring n = m = 12, tree e₀ … e₁₀, R = {anchor}
    const rand = TRV.mulberry32(Math.round(S.phi * 10) + 7);
    const th = Array.from({ length: 12 }, () => TAU * rand()), ga = Array.from({ length: 12 }, (_, v) => (v === 0 ? 0 : TAU * rand()));
    let h0 = [1, 0], h1 = [1, 0];
    for (let j = 0; j < 12; j++) {
      const u = [Math.cos(th[j]), Math.sin(th[j])], t = (j + 1) % 12;
      h0 = cm(h0, u); h1 = cm(h1, cm(cm([Math.cos(ga[t]), Math.sin(ga[t])], u), [Math.cos(ga[j]), -Math.sin(ga[j])]));
    }
    const anchored = { n: 12, m: 12, references: 1, loopPhases: 12 + 1 - 12, referencePhases: 0, gaugeResidual: Math.hypot(h0[0] - h1[0], h0[1] - h1[1]) };
    // Gram determinant of the corners of ΔT_ε
    const G3 = [c.N, c.B, c.D].map((a) => [c.N, c.B, c.D].map((b) => v3.dot(a, b))), detG3 = det3(G3);
    const gram = { det: detG3, sin4: Math.sin(eps) ** 4, residual: Math.abs(detG3 - Math.sin(eps) ** 4), positive: detG3 > 1e-14 };
    // Bogoliubov at k = 1: ε⁰ = k²/2, gn = η²
    const e0 = 0.5, gn = eta * eta, E = Math.sqrt(e0 * (e0 + 2 * gn)), u2 = (e0 + gn) / (2 * E) + 0.5, vv2 = (e0 + gn) / (2 * E) - 0.5, rB = Math.acosh(Math.sqrt(u2));
    const bogoliubov = { energy: E, u2, v2: vv2, norm: u2 - vv2, coshSinh: Math.cosh(rB) ** 2 - Math.sinh(rB) ** 2 };
    // null cone: ω = |k| for 32 directions
    let nul = 0;
    for (let j = 0; j < 32; j++) {
      const z = 1 - 2 * (j + 0.5) / 32, rr = Math.sqrt(1 - z * z), a = j * 2.399963229728653, kk = 0.3 + 0.07 * j, k = [kk * rr * Math.cos(a), kk * rr * Math.sin(a), kk * z], w = Math.hypot(k[0], k[1], k[2]);
      nul = Math.max(nul, Math.abs(w * w - v3.dot(k, k)));
    }
    const minkowski = { nullResidual: nul, offConeGap: M.mV * M.mV };
    // monitored first return on the 12-site ring, U = e^{−iHτ}, H = −Σ (|j⟩⟨j+1| + h.c.), τ = 0.9
    const N = 12, tau = 0.9, U = [];
    for (let a = 0; a < N; a++) { U.push([]); for (let b = 0; b < N; b++) { let re = 0, im = 0; for (let q = 0; q < N; q++) { const kq = TAU * q / N, ph = kq * (a - b) + 2 * tau * Math.cos(kq); re += Math.cos(ph); im += Math.sin(ph); } U[a].push([re / N, im / N]); } }
    let hist = Array.from({ length: N }, (_, j) => (j === 0 ? [1, 0] : [0, 0]));
    const sv = [1], pv = [0], steps = 24;
    for (let n = 1; n <= steps; n++) {
      const w = U.map((row) => row.reduce((acc, z, b) => ca(acc, cm(z, hist[b])), [0, 0]));
      pv.push(w[0][0] ** 2 + w[0][1] ** 2); w[0] = [0, 0]; hist = w;
      sv.push(hist.reduce((acc, z) => acc + z[0] ** 2 + z[1] ** 2, 0));
    }
    let stepRes = 0; for (let n = 0; n < steps; n++) stepRes = Math.max(stepRes, Math.abs(pv[n + 1] - (sv[n] - sv[n + 1])));
    const total = pv.slice(1).reduce((x, y) => x + y, 0) + sv[steps];
    const monitored = { steps, survival0: sv[0], stepResidual: stepRes, total, totalResidual: Math.abs(total - 1) };
    // finite Poisson summation on ℤ/12 with H = {0, 3, 6, 9}, H⊥ = {0, 4, 8}
    const m = 12, H = [0, 3, 6, 9], A = [0, 4, 8], j0 = Math.round(S.phi / 30) % m;
    const fz = (x) => { let d = Math.abs(x - j0) % m; d = Math.min(d, m - d); return [Math.exp(-d * d / 4), 0.3 * Math.sin(TAU * x / m + phi)]; };
    const lhsP = H.reduce((acc, x) => ca(acc, fz(x)), [0, 0]);
    const dft = (k) => { let z = [0, 0]; for (let j = 0; j < m; j++) z = ca(z, cm([Math.cos(-TAU * j * k / m), Math.sin(-TAU * j * k / m)], fz(j))); return z; };
    const sumA = A.reduce((acc, k) => ca(acc, dft(k)), [0, 0]), rhsP = [sumA[0] * H.length / m, sumA[1] * H.length / m];
    const poisson = { m, subgroup: H, annihilator: A, residual: Math.hypot(lhsP[0] - rhsP[0], lhsP[1] - rhsP[1]) };
    // entropy production = relative entropy of coherence, one qubit, U turns by ε about y, pinching in the z basis
    let rq = v3.scale([Math.sin(eps) * Math.cos(phi), Math.sin(eps) * Math.sin(phi), Math.cos(eps)], 0.9), worst = 0, minD = Infinity;
    const S0 = entropyBloch(rq);
    for (let k = 0; k < 6; k++) {
      const sg = v3.rot(rq, [0, 1, 0], eps), next = [0, 0, sg[2]];
      const l = Math.hypot(sg[0], sg[1], sg[2]), p = (1 + sg[2]) / 2;
      const D = xlogx((1 + l) / 2) + xlogx((1 - l) / 2) - (p * Math.log(p) + (1 - p) * Math.log(1 - p));
      worst = Math.max(worst, Math.abs(entropyBloch(next) - entropyBloch(rq) - D)); minD = Math.min(minD, D); rq = next;
    }
    const entropy = { steps: 6, residual: worst, minRelativeEntropy: minD, entropyGain: entropyBloch(rq) - S0 };
    // objective common factor: 72 anchors as contexts
    let dO = 0, dB = 0; const O0 = solidAngle(c.N, c.B, c.D);
    for (let j = 0; j < 72; j++) {
      const cj = corners(eps, TAU * j / 72), lj = lagrange(cj.N, cj.B);
      dO = Math.max(dO, Math.abs(solidAngle(cj.N, cj.B, cj.D) - O0)); dB = Math.max(dB, Math.abs(lj.cos2 + lj.sin2 - 1));
    }
    const common = { contexts: 72, omegaSpread: dO, budgetSpread: dB };
    const out = { partition, lagrange: lagr, covariant, twoAxis, anchored, gram, bogoliubov, minkowski, monitored, poisson, entropy, common, maurerCartan: maurerCartan(eps, phi) };
    instCache.set(key, out);
    if (instCache.size > 40) instCache.delete(instCache.keys().next().value);
    return out;
  }

  /** Everything the page shows, from the state. */
  function model() {
    const eta = S.eta, g = S.g, eps = epsOf(eta), phiRad = S.phi * DEG, rt = eta, on = rt > 0.02;
    const vmax = vmaxOf(eta), rhoMax = Math.sqrt(rt * rt + Math.sqrt(vmax));
    const c = corners(eps, phiRad), lg = lagrange(c.N, c.B);
    const mV = g * eta, lambdaV = mV > 0 ? 1 / mV : Infinity;
    const sky = skyrmion(eta);
    const anchor = on ? [rt * Math.cos(phiRad), rt * Math.sin(phiRad), R_A * 0.92] : [0, 0, R_A * 0.92];
    let relay = 0, best = Infinity;
    FAM.forEach((f, k) => { const d = Math.abs(wrap(phiRad - f.az * DEG)); if (d < best) { best = d; relay = k; } });
    return {
      eta, g, eps, phiRad, rt, on, vmax, rhoMax, anchor, relay, fam: FAM[S.family],
      cos2: lg.cos2, sin2: lg.sin2, budgetSum: lg.cos2 + lg.sin2,
      omega: omegaOf(eps), omegaVOS: solidAngle(c.N, c.B, c.D), capFlux: TAU * (1 - Math.cos(eps)),
      mV, lambdaV, kappa: g > 0 ? Math.SQRT2 / g : Infinity, B: sky.B, Bq: sky.quadrature,
      dimCoset: on ? FAM[S.family].dimG - FAM[S.family].dimH : 0
    };
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; probe.style.position = 'absolute'; tagBox.appendChild(probe);
  const options = { canvas: $('cv'), yaw: VIEW0[0], pitch: VIEW0[1], wheel: false, radius: 0.32, cx: 0.5, cy: 0.5, onChange: () => paint() };
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
    for (const el of [$('hudTl'), $('familyChips'), $('legend')]) { const b = boxOf(el, sr); if (b && (el.id !== 'legend' || el.textContent.trim())) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 8); else bottom = Math.min(bottom, b.y - 8); }
    return { x: 12, y: top, w: Math.max(40, W - 24), h: Math.max(60, bottom - top) };
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

  /* The projection is fitted to the HUD-free rect from a bound that does not change as the camera turns about the
     vertical axis: the far rim, the lowest point of the half-ellipsoid dish, and for each object of the family a
     centre at horizontal distance r and height z with a padding that covers it from every side. */
  function fitTo(area, W, H, M, items) {
    const p = sc.cam.pitch, cp = Math.cos(p), sp = Math.abs(Math.sin(p)), rm = M.rhoMax;
    let up = sp * rm + cp * ZR, dn = Infinity, half = rm;
    for (let k = 0; k <= 48; k++) { const t = PI / 2 * k / 48; dn = Math.min(dn, -sp * rm * Math.cos(t) + cp * (ZBASE + (ZR - ZBASE) * (1 - Math.sin(t)))); }
    const dnBowl = dn;
    for (const it of items) {
      up = Math.max(up, sp * it.r + cp * it.z + it.pad); dn = Math.min(dn, -sp * it.r + cp * it.z - it.pad);
      half = Math.max(half, it.r + it.pad);
    }
    // never larger than the size at which the bowl's silhouette (≈ an ellipse 2ρ_max wide, rim to dish bottom tall)
    // covers COVER of the whole stage: the lit body stays a constant share of the picture where there is room
    const rimUp = sp * rm + cp * ZR, bowlArea = (PI / 4) * 2 * rm * Math.max(0.2, rimUp - dnBowl);
    const unitCap = COVER * Math.sqrt(W * H / bowlArea);
    const unit = Math.max(20, Math.min(unitCap, area.w / (2 * half), area.h / Math.max(0.2, up - dn)));
    options.radius = unit / Math.max(1, Math.min(W, H));
    options.cx = (area.x + area.w / 2) / Math.max(1, W);
    options.cy = (area.y + area.h / 2 + unit * (up + dn) / 2) / Math.max(1, H);
    return unit;
  }
  /** The objects of the family that stand above the bowl, as { r, z, pad } (see fitTo). */
  function towerItems(M) {
    const A0 = M.anchor, f = S.family, r0 = M.on ? M.rt : 0;
    if (f === 0) return [{ r: r0, z: A0[2] + R_A + 0.26 + 0.5, pad: 0.5 * 1.25 }];
    if (f === 1) return [{ r: r0 + 0.18, z: A0[2] + R_A + 0.85, pad: 0.06 }];
    if (f === 2) return M.on ? [{ r: r0, z: A0[2] + R_A + 0.32 + 0.27, pad: 0.27 * 1.95 }] : [];
    if (f === 3) return M.on ? [{ r: 0, z: potZ(0, M) + 1.25 + 0.32, pad: 0.04 }, { r: 0.4, z: potZ(0, M) + 1.15, pad: 0 }] : [];
    return [{ r: M.rhoMax * 1.02, z: ZR + 0.04 + 0.05 * 16 + 0.03, pad: 0.09 }, { r: 0, z: 0.95 + 0.48, pad: 0.06 }];
  }

  let FRAME = null, FIT = null;
  function cylinder(key, c, z0, h, r, color, grid) {
    if (h <= 1e-4) return;
    sc.surface(key, (u, v) => [c[0] + r * Math.cos(v), c[1] + r * Math.sin(v), z0 + u * h], { u: [0, 1], v: [0, TAU], nu: 2, nv: 28, color, grid, pick: false });
    sc.surface(`${key}-cap`, (u, v) => [c[0] + u * r * Math.cos(v), c[1] + u * r * Math.sin(v), z0 + h], { u: [0, 1], v: [0, TAU], nu: 2, nv: 28, color, pick: false });
  }
  const SPINES = Array.from({ length: 22 }, (_, j) => { const z = 1 - 2 * (j + 0.5) / 22, r = Math.sqrt(1 - z * z), a = j * 2.399963229728653; return [r * Math.cos(a), r * Math.sin(a), z]; });

  function drawStage(M) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 18, y: 18, w: W - 36, h: H - 36 } : safeRect(W, H, huds);
    if (!dragging || !FIT) FIT = { area, items: towerItems(M), M };
    fitTo(FIT.area, W, H, FIT.M, FIT.items);
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = [];
    const { rt, on, rhoMax: rm, anchor: A0, phiRad: phi } = M;
    sc.begin();
    /* the bowl: V ≤ V_max, coloured by height (cyan trough, pale hilltop and rim); outside, a half-ellipsoid dish */
    sc.surface('bowl', (s, psi) => { const rho = s * rm; return [rho * Math.cos(psi), rho * Math.sin(psi), potZ(rho, M)]; },
      { u: [0, 1], v: [0, TAU], nu: 48, nv: 96, colors: [P.cyan, P.sigma], value: (s) => Math.sqrt(potZ(s * rm, M) / ZR), range: [0, 1],
        grid: { every: [4, 8], color: P.ink, alpha: 0.26 }, pick: false });
    sc.surface('dish', (s, psi) => { const t = s * PI / 2, rho = rm * Math.cos(t); return [rho * Math.cos(psi), rho * Math.sin(psi), ZBASE + (ZR - ZBASE) * (1 - Math.sin(t))]; },
      { u: [0, 1], v: [0, TAU], nu: 16, nv: 96, color: P.lineHot, grid: { every: [4, 8], color: P.cyan, alpha: 0.2 }, pick: false });
    if (on) sc.tube('trough', Array.from({ length: 121 }, (_, i) => { const a = TAU * i / 120; return [rt * Math.cos(a), rt * Math.sin(a), 0.012]; }), { color: P.cyan, width: 3, glow: 0.35, pick: false });
    /* the anchor v₀ */
    sc.surface('anchor', (u, v) => v3.add(A0, v3.scale(v3.sph(u, v), R_A)), { u: [0, PI], v: [0, TAU], nu: 14, nv: 24, color: P.amber, pick: false });
    if (on) sc.ring(v3.add(A0, [0, 0, R_A + 0.012]), { key: 'anchor-ring', color: P.amber, r: 7, normal: UP });
    const tags = [];
    const at = (p, html, cls, pri, dir) => { if (!thumb) tags.push({ p, html, cls, pri, dir }); };
    at(A0, 'v₀', 'raw c-am backed', 9, [1, 0.6]);
    [drawT1, drawT2, drawT3, drawT4, drawT5][S.family](M, at);
    sc.end();

    /* the handle: on the anchor, hidden when there is no trough to drag it round */
    const hq = on && !thumb ? sc.p(A0) : null;
    if (hq) OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    placeHandle(hq);
    if (!thumb) {
      const cen = sc.p([0, 0, 0.4]);
      tags.forEach((t, k) => {
        const q = sc.p(t.p), dir = t.dir ? [t.dir[0], t.dir[1]] : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1];
        want(`t${k}`, q, t.html, t.cls, { pri: t.pri, dir, r: 12 });
      });
      placeLabels();
    }
    FRAME = { W, H, area: FIT.area, handle: hq ? { x: hq[0], y: hq[1] } : null, unit: sc.unit, cx: sc.cx, cy: sc.cy };
  }

  /* T1 gravity: the coset sphere SU(2)/U(1) above the anchor and the solid trihedron ΔT_ε */
  function drawT1(M, at) {
    const { eps, anchor: A0, phiRad: phi } = M, rc = 0.5;
    const C0 = [A0[0], A0[1], A0[2] + R_A + 0.26 + rc], c = corners(eps, phi);
    const on = (d, k = 1) => v3.add(C0, v3.scale(d, rc * k));
    sc.glass('coset', C0, rc, { color: P.sigma, alpha: 0.04, rim: 0.2, pick: false });
    sc.tube('axis', [v3.add(A0, [0, 0, R_A]), on(UP, 1.2)], { color: P.violet, width: 2.4, glow: 0.4, pick: false });
    sc.bead(on(UP, 1.012), { key: 'pole', color: P.violet, r: 4.6 });
    at(on(UP, 1.2), 'Λ⁰ · v₀', 'raw c-vi backed', 8, [0.2, -1]);
    if (eps < 2e-3) { at(C0, L('塔塌成一点 · 0 比特', 'tower collapsed · 0 bits'), 'raw ink backed', 7, [-1, 0]); return; }
    // Λ² the cap (magenta, area Ω) and Λ³ the solid sector (three violet faces)
    sc.surface('cap', (u, v) => on(v3.unit(v3.add(v3.scale(c.N, 1 - u), v3.scale(v3.add(v3.scale(c.B, 1 - v), v3.scale(c.D, v)), u))), 1.004),
      { u: [0, 1], v: [0, 1], nu: 16, nv: 16, color: P.magenta, grid: { every: [4, 4], color: P.ink, alpha: 0.2 }, pick: false });
    const face = (key, p, q) => sc.surface(key, (u, v) => v3.add(C0, v3.scale(v3.slerp(p, q, v), rc * u)), { u: [0, 1], v: [0, 1], nu: 2, nv: 18, color: P.violet, pick: false });
    face('faceNB', c.N, c.B); face('faceND', c.N, c.D); face('faceBD', c.B, c.D);
    // Λ¹ the legs (cyan) and the hypotenuse arc (magenta)
    const arc = (p, q, n = 24) => Array.from({ length: n + 1 }, (_, i) => on(v3.slerp(p, q, i / n), 1.012));
    sc.tube('leg1', arc(c.N, c.B), { color: P.cyan, width: 3.4, glow: 0.3, pick: false });
    sc.tube('leg2', arc(c.N, c.D), { color: P.cyan, width: 3.4, glow: 0.3, pick: false });
    sc.tube('hyp', arc(c.B, c.D), { color: P.magenta, width: 2.4, pick: false });
    sc.bead(on(c.B, 1.014), { key: 'cornerB', color: P.cyan, r: 4.2 });
    sc.bead(on(c.D, 1.014), { key: 'cornerD', color: P.cyan, r: 4.2 });
    // the Pythagorean triangle on the face C–N–B, just off it: cyan leg cos ε, magenta leg sin ε, dashed hypotenuse = radius
    const off = v3.scale(c.t2, -0.014), Cq = v3.add(C0, off), Fq = v3.add(on(c.N, Math.cos(eps)), off), Bq = v3.add(on(c.B), off);
    sc.tube('legCos', [Cq, Fq], { color: P.cyan, width: 3.6, glow: 0.4, pick: false });
    sc.tube('legSin', [Fq, Bq], { color: P.magenta, width: 3.6, glow: 0.4, pick: false });
    sc.line([Cq, Bq], { color: P.sigma, width: 1.6, dash: [5, 4] });
    at(on(v3.slerp(c.N, c.D, 0.55), 1.02), 'Λ¹ · e¹, e²', 'raw c-cy backed', 7, null);
    at(on(v3.unit(v3.add(v3.add(c.N, c.B), c.D)), 1.01), `Λ² · Ω = ${fix(M.omega / DEG, 2)}°`, 'raw c-mg backed', 8, null);
    at(v3.add(C0, v3.scale(v3.unit(v3.add(c.B, c.D)), rc * 0.55)), 'Λ³ · ΔT<sub>ε</sub>', 'raw c-vi backed', 6, null);
  }

  /* T2 electroweak: Goldstone ripple, transverse ribbons, the eaten arc and the 3-DOF core */
  function drawT2(M, at) {
    const { rt, on, anchor: A0, phiRad: phi, g, mV, lambdaV } = M, t = frame(phi);
    if (on) {
      const pts = Array.from({ length: 241 }, (_, i) => {
        const a = TAU * i / 240, d = Math.abs(wrap(a - phi)), env = Number.isFinite(lambdaV) ? Math.exp(-rt * d / lambdaV) : 1;
        return [rt * Math.cos(a), rt * Math.sin(a), 0.035 + 0.075 * env * Math.sin(6 * d - 3 * phi)];
      });
      sc.tube('ripple', pts, { color: P.cyan, width: 2.6, glow: 0.4, pick: false });
      const half = 0.8 * (1 - g);
      if (half > 0.01) {
        sc.tube('eaten', Array.from({ length: 33 }, (_, i) => { const a = phi - half + 2 * half * i / 32; return [rt * Math.cos(a), rt * Math.sin(a), 0.05]; }), { color: P.cyan, width: 6.5, glow: 0.6, pick: false });
        const q = phi + half * 0.75;
        at([rt * Math.cos(q), rt * Math.sin(q), 0.06], L('1 · 戈德斯通弧', '1 · Goldstone arc'), 'raw c-cy backed', 7, null);
      }
      at([rt * Math.cos(phi - PI / 2), rt * Math.sin(phi - PI / 2), 0.08], Number.isFinite(lambdaV) ? `λ<sub>V</sub> = ${fix(lambdaV, 2)}` : 'λ<sub>V</sub> = ∞', 'raw c-cy backed', 5, null);
    }
    const base = v3.add(A0, [0, 0, R_A]), Hr = 0.85, amp = 0.18 * (1 - 0.35 * g);
    const ribbon = (key, e, w) => sc.surface(key, (u, v) => v3.add(v3.add(base, [0, 0, u * Hr]), v3.add(v3.scale(e, amp * Math.sin(3 * PI * u - 2 * phi)), v3.scale(w, 0.04 * v))),
      { u: [0, 1], v: [-1, 1], nu: 54, nv: 2, color: P.magenta, pick: false });
    ribbon('ribbon1', t.t1, t.t2); ribbon('ribbon2', t.t2, t.t1);
    at(v3.add(base, [0, 0, Hr + 0.05]), L('2 · 横向模', '2 · transverse'), 'raw c-mg backed', 8, [0.3, -1]);
    if (on && mV > 0.004) {
      const rC = 0.03 + 0.12 * mV, mid = v3.add(base, [0, 0, Hr / 2]);
      sc.surface('core', (u, v) => v3.add(mid, [rC * Math.sin(u) * Math.cos(v), rC * Math.sin(u) * Math.sin(v), (Hr / 2 + 0.04) * Math.cos(u)]),
        { u: [0, PI], v: [0, TAU], nu: 28, nv: 28, color: P.violet, grid: { every: [4, 7], color: P.ink, alpha: 0.18 }, pick: false });
      at(v3.add(mid, v3.scale(t.t2, rC)), L(`3 = 2 + 1 · m<sub>V</sub> = ${fix(mV, 3)}`, `3 = 2 + 1 · m<sub>V</sub> = ${fix(mV, 3)}`), 'raw c-vi backed', 9, null);
    }
  }

  /* T3 strong: the chiral half-circle and the B = 1 hedgehog */
  function drawT3(M, at) {
    const { rt, on, anchor: A0, phiRad: phi } = M;
    if (!on) { at([0, 0, 0.35], 'B = 0', 'raw ink backed', 7, [1, -0.4]); return; }
    sc.surface('chiral', (u, v) => {
      const a = phi + PI * u, cc = [rt * Math.cos(a), rt * Math.sin(a), 0.04], n1 = [Math.cos(a), Math.sin(a), 0];
      return v3.add(cc, v3.add(v3.scale(n1, 0.03 * Math.cos(v)), v3.scale(UP, 0.03 * Math.sin(v))));
    }, { u: [0, 1], v: [0, TAU], nu: 60, nv: 10, colors: [P.cyan, P.magenta], value: (u) => u, range: [0, 1], pick: false });
    const q = phi + PI;
    at([rt * Math.cos(q), rt * Math.sin(q), 0.06], 'U = −1 · F = π', 'raw c-mg backed', 7, null);
    const Rs = 0.27, Hc = v3.add(A0, [0, 0, R_A + 0.32 + Rs]);
    sc.tube('stem', [v3.add(A0, [0, 0, R_A]), v3.add(Hc, [0, 0, -Rs])], { color: P.violet, width: 2.2, glow: 0.3, pick: false });
    sc.surface('hedgehog', (u, v) => v3.add(Hc, v3.scale(v3.sph(u, v), Rs)), { u: [0, PI], v: [0, TAU], nu: 26, nv: 36, color: P.violet, grid: { every: [4, 6], color: P.ink, alpha: 0.18 }, pick: false });
    SPINES.forEach((d, k) => {
      const e1 = v3.unit(v3.cross(d, Math.abs(d[2]) < 0.9 ? UP : [1, 0, 0])), e2 = v3.cross(d, e1);
      sc.surface(`spine-${k}`, (u, v) => {
        const r = Rs * (0.98 + 0.95 * u), w = 0.024 * (1 - 0.7 * u);
        return v3.add(v3.add(Hc, v3.scale(d, r)), v3.add(v3.scale(e1, w * Math.cos(v)), v3.scale(e2, w * Math.sin(v))));
      }, { u: [0, 1], v: [0, TAU], nu: 4, nv: 8, colors: [P.cyan, P.magenta], value: (u) => skyF(0.98 + 0.95 * u), range: [0, PI / 2], pick: false });
    });
    at(v3.add(Hc, [0, 0, Rs * 1.95]), `B = ${M.B} · π₃(S³) = ℤ`, 'raw c-vi backed', 9, [0.4, -1]);
    at(A0, 'U = 1 · F = 0', 'raw c-cy backed', 6, [1, 0.9]);
  }

  /* T4 superconductor: vortex core at the hilltop, flux line, one phase winding, lattice ring with a phonon */
  function drawT4(M, at) {
    const { rt, on, eta, phiRad: phi } = M;
    if (!on) { at([0, 0, 0.35], L('无凝聚 · 无涡旋', 'no condensate · no vortex'), 'raw ink backed', 7, [1, -0.4]); return; }
    const zh = potZ(0, M), xi = clamp(0.085 / eta, 0.07, 0.2), Hh = 1.25, top = zh + Hh;
    cylinder('core', [0, 0], zh, Hh, xi, P.sigma, { every: [1, 4], color: P.ink, alpha: 0.2 });
    sc.tube('flux', [[0, 0, zh - 0.02], [0, 0, top + 0.32]], { color: P.violet, width: 4.2, glow: 0.7, pick: false });
    const lamV = Number.isFinite(M.kappa) ? clamp(xi * M.kappa, xi + 0.04, 0.9) : 0.9;
    sc.surface('sheath', (u, v) => [lamV * Math.cos(v), lamV * Math.sin(v), zh + 0.1 + u * (Hh - 0.2)], { u: [0, 1], v: [0, TAU], nu: 2, nv: 40, color: P.violet, alpha: 0.16, pick: false });
    const hel = Array.from({ length: 97 }, (_, i) => { const s = i / 96, a = phi + TAU * s; return [(xi + 0.1) * Math.cos(a), (xi + 0.1) * Math.sin(a), zh + 0.1 + s * (Hh - 0.2)]; });
    sc.tube('helix', hel, { color: P.cyan, width: 3, glow: 0.4, pick: false });
    const sites = Array.from({ length: 12 }, (_, j) => { const a = phi + TAU * j / 12, u = 0.045 * Math.sin(2 * TAU * j / 12 - 3 * phi); return [(rt + u) * Math.cos(a), (rt + u) * Math.sin(a), 0.06]; });
    sc.tube('springs', sites.concat([sites[0]]), { color: P.cyan, width: 1.8, pick: false });
    sites.forEach((p, j) => { if (j) sc.bead(p, { key: `site-${j}`, color: P.sigma, r: 4.4 }); });
    at([0, 0, top + 0.32], 'Φ₀ = h/2e', 'raw c-vi backed', 9, [0.4, -1]);
    at([(xi + 0.1) * Math.cos(phi + PI), (xi + 0.1) * Math.sin(phi + PI), zh + Hh * 0.5], L('相位绕 2π', 'phase winds 2π'), 'raw c-cy backed', 7, null);
    at([0, 0, zh + 0.05], L('涡核 |Φ| = 0', 'core |Φ| = 0'), 'raw ink backed', 6, [-1, 0.3]);
    at(sites[6], L('晶格 12 格点 · 声子', 'lattice of 12 · phonon'), 'raw c-cy backed', 5, null);
  }

  /* T5 consensus: five towers dim G = dim H + dim G/H round the trough, the relay and θ* */
  function drawT5(M, at) {
    const rT = M.rhoMax * 1.02, on = M.on, unit = 0.05, ped = 0.04, tops = [];
    FAM.forEach((f, k) => {
      const a = f.az * DEG, c = [rT * Math.cos(a), rT * Math.sin(a)], z0 = ZR;
      const hH = unit * (on ? f.dimH : f.dimG), hC = on ? unit * (f.dimG - f.dimH) : 0;
      cylinder(`ped-${k}`, c, z0, ped, 0.09, P.lineHot);
      cylinder(`colH-${k}`, c, z0 + ped, hH, 0.07, P.cyan);
      cylinder(`colC-${k}`, c, z0 + ped + hH, hC, 0.07, P.magenta);
      const top = [c[0], c[1], z0 + ped + hH + hC + 0.03];
      tops.push(top);
      if (k === M.relay) sc.ring([c[0], c[1], z0 + ped + 0.012], { key: 'relay', color: P.amber, r: 12, normal: UP });
      at(top, f.code, `raw ${k === M.relay ? 'c-am' : 'ink'} backed`, 9 - k * 0.1, [Math.cos(a) * 0.3, -1]);
    });
    sc.line(tops, { color: P.cyan, width: 1.6, dash: [6, 4] });
    // the iteration θ ↦ cos θ near θ*: each step flips the side (cos′ < 0) and shrinks the distance by sin θ* ≈ 0.674
    const k0 = Math.sin(THETA_STAR), sp = Array.from({ length: 181 }, (_, i) => { const n = 12 * i / 180, r = 0.42 * k0 ** n; return [r * Math.cos(PI * n), r * Math.sin(PI * n), 0.95 + 0.04 * n]; });
    sc.tube('spiral', sp, { color: P.violet, width: 2.4, glow: 0.5, pick: false });
    sc.bead(sp[sp.length - 1], { key: 'theta-star', color: P.violet, r: 5.2 });
    at(sp[sp.length - 1], `θ* = cos θ* = ${fix(THETA_STAR, 4)}`, 'raw c-vi backed', 10, [0.3, -1]);
  }

  /* ---------- the anchor handle: a button on the stage, dragged round the trough ---------- */
  const handle = $('vacuumAnchorHandle');
  let dragging = null;
  function placeHandle(q) {
    const show = !!q && !TRV.still;
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
  }
  /** The azimuth (degrees) of the trough point whose projection is nearest to the pointer. */
  function azimuthAt(ev) {
    const b = stageEl.getBoundingClientRect(), x = ev.clientX - b.left - stageEl.clientLeft, y = ev.clientY - b.top - stageEl.clientTop;
    const rt = S.eta, z = R_A * 0.92;
    let best = S.phi, bd = Infinity;
    for (let k = 0; k < 720; k++) {
      const a = k / 2, q = sc.p([rt * Math.cos(a * DEG), rt * Math.sin(a * DEG), z]), d = Math.hypot(q[0] - x, q[1] - y);
      if (d < bd) { bd = d; best = a; }
    }
    return best;
  }
  const endDrag = (ev) => {
    if (!dragging || (ev && ev.pointerId != null && ev.pointerId !== dragging.pointer)) return;
    try { if (handle.hasPointerCapture(dragging.pointer)) handle.releasePointerCapture(dragging.pointer); } catch (e) { /* already released */ }
    dragging = null; handle.classList.remove('dragging'); paint();
  };
  handle.addEventListener('pointerdown', (ev) => {
    if (ev.button > 0 || TRV.still || !(S.eta > 0.02)) return;
    ev.preventDefault(); ev.stopPropagation();
    cards.mark(null); clock.pause();
    dragging = { pointer: ev.pointerId }; handle.classList.add('dragging');
    try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events carry no capture */ }
  });
  handle.addEventListener('pointermove', (ev) => {
    if (!dragging || ev.pointerId !== dragging.pointer) return;
    ev.preventDefault();
    clock.set(azimuthAt(ev));
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight') return;
    ev.preventDefault(); ev.stopPropagation(); cards.mark(null); clock.pause();
    clock.set(((S.phi + (ev.key === 'ArrowRight' ? 5 : -5)) % 360 + 360) % 360);
  });

  /* ---------- HUD, legend, readouts ---------- */
  const LEGENDS = [
    () => [['cy', L('真空槽与两条破缺方向 e¹、e²', 'trough and the broken directions e¹, e²')], ['mg', L('ΔT<sub>ε</sub> 曲面 · 楔积 sin²ε', 'cap ΔT<sub>ε</sub> · wedge sin²ε')], ['vi', L('实心三面角 · 未破缺轴 T', 'solid trihedron · unbroken axis T')], ['am', L('锚点 v₀', 'anchor v₀')]],
    () => [['cy', L('无质量戈德斯通波', 'massless Goldstone wave')], ['mg', L('2 个横向模', '2 transverse modes')], ['vi', L('3 自由度质量核', '3-DOF massive core')], ['am', L('锚点 v₀', 'anchor v₀')]],
    () => [['ramp', L('F：0 → π', 'F: 0 → π')], ['vi', L('B = 1 刺猬', 'B = 1 hedgehog')], ['am', L('锚点 v₀（U = 1）', 'anchor v₀ (U = 1)')]],
    () => [['ik', L('正常态涡核', 'normal core')], ['vi', L('磁通 Φ₀ · 屏蔽层', 'flux Φ₀ · screening')], ['cy', L('相位绕一圈 · 晶格', 'one phase winding · lattice')], ['am', L('锚点 v₀', 'anchor v₀')]],
    () => [['cy', L('守恒 dim H', 'kept dim H')], ['mg', L('破缺 dim G/H', 'broken dim G/H')], ['vi', L('不动点 θ*', 'fixed point θ*')], ['am', L('当前接力塔', 'current relay tower')]]
  ];
  function hudText(M) {
    const f = S.family;
    let big, sub;
    if (!M.on) {
      big = `${famName(f)} · η<sub>SSB</sub> = 0`;
      sub = L('槽合拢成对称的碗，锚点回到中心，塔塌成一点（0 比特）', 'the trough closes into a symmetric bowl, the anchor returns to the centre, the tower collapses (0 bits)');
    } else if (f === 0) {
      big = `${famName(f)} · Ω = ${fix(M.omega / DEG, 2)}°`;
      sub = `cos²ε + sin²ε = ${fix(M.cos2, 4)} + ${fix(M.sin2, 4)} = ${fix(M.budgetSum, 4)} · ε = ${fix(M.eps / DEG, 2)}°`;
    } else if (f === 1) {
      big = `${famName(f)} · m<sub>V</sub> = ${fix(M.mV, 3)} · 2 + 1 = 3`;
      sub = M.mV > 0 ? `λ<sub>V</sub> = 1/m<sub>V</sub> = ${fix(M.lambdaV, 2)} · ${L('电弱', 'electroweak')} 12 = 9 + 2 + 1` : L('g = 0：全局破缺，戈德斯通波绕满整圈，λ<sub>V</sub> = ∞', 'g = 0: global breaking, the Goldstone wave runs all the way round, λ<sub>V</sub> = ∞');
    } else if (f === 2) {
      big = `${famName(f)} · B = ${M.B}`;
      sub = `F(0) = π → F(∞) = 0 · π₃(S³) = ℤ · ∫ = ${fix(M.Bq, 6)}`;
    } else if (f === 3) {
      big = `${famName(f)} · Φ₀ = h/2e`;
      sub = `∮∇θ · dl = 2π · κ = λ/ξ = ${Number.isFinite(M.kappa) ? fix(M.kappa, 2) : '∞'}`;
    } else {
      big = `${famName(f)} · θ* = ${fix(THETA_STAR, 4)}`;
      sub = `dim G = dim H + dim G/H · ${L('接力', 'relay')} ${FAM[M.relay].code}`;
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('legend').innerHTML = LEGENDS[f]().map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  function chargeText(M) {
    const f = S.family;
    if (f === 0) return `P<sup>μ</sup> ${L('（诺特流守恒）', '(Noether current)')} · M<sub>Pl</sub> = 1.2209×10¹⁹ GeV`;
    if (f === 1) return `Q = T₃ + Y/2 · sin²θ<sub>W</sub> = ${fix(SIN2W, 5)}`;
    if (f === 2) return `B = ${M.B} · m<sub>p</sub> = 938.27 MeV · ${fix(100 * PROTON_FRACTION, 2)}% ${L('非希格斯', 'not Higgs')}`;
    if (f === 3) return `Φ₀ = h/2e = ${(FLUX * 1e15).toFixed(9)}×10⁻¹⁵ Wb`;
    return `θ* = cos θ* = ${fix(THETA_STAR, 7)}`;
  }
  const NOTES_RO = [
    ['ε 只由 η 决定：锚点绕槽转一整圈，Ω 与 cos²ε + sin²ε 一个数位也不变。', 'ε depends on η alone: turn the anchor once round the trough and neither Ω nor cos²ε + sin²ε moves by a digit.'],
    ['阿贝尔希格斯树图质量 m<sub>V</sub> = g η v₀（v₀ = 1）；自由度 2 + 2 = 3 + 1。', 'Abelian Higgs tree-level mass m<sub>V</sub> = g η v₀ (v₀ = 1); degrees of freedom 2 + 2 = 3 + 1.'],
    ['重子数只依赖 F 在两端的值：任何从 π 降到 0 的剖面都给 B = 1。', 'The baryon number depends only on the end values of F: any profile falling from π to 0 gives B = 1.'],
    ['涡核处 |Φ| = 0 正是帽顶；绕核一圈相位转 2π，所围磁通是一个 Φ₀。', 'In the core |Φ| = 0 is the hilltop; once round it the phase turns by 2π and the enclosed flux is one Φ₀.'],
    ['每座塔按 dim G = dim H + dim G/H 拆账；把引力与共识读成陪集塔是本书的模型。', 'Each tower keeps the books dim G = dim H + dim G/H; reading gravity and consensus as coset towers is a model of this book.']
  ];
  const FORMULA = [
    'U⁻¹dU = eᵃXₐ + ωⁱTᵢ · Fⁱ = −½ fⁱ<sub>ab</sub> eᵃ∧eᵇ',
    'm<sub>V</sub> = g η v₀ · λ<sub>V</sub> = 1/m<sub>V</sub>',
    'B = (2/π) ∫ sin²F (−F′) dr',
    'Φ₀ = h/2e = 2.0678×10⁻¹⁵ Wb',
    'θ* = cos θ* · dim G = dim H + dim G/H'
  ];
  function drawText(M) {
    const f = S.family, fam = FAM[f];
    $('roFamily').innerHTML = famName(f);
    $('roFamilySub').innerHTML = ` · ${fam.G} → ${fam.H} · dim G/H = ${M.dimCoset}`;
    $('roEta').innerHTML = `η = ${fix(S.eta, 2)} · φ₀ = ${fix(S.phi, 1)}° · ε = ${fix(M.eps / DEG, 2)}°`;
    $('roBudget').innerHTML = `${fix(M.cos2, 4)} + ${fix(M.sin2, 4)} = ${fix(M.budgetSum, 6)}`;
    $('roOmega').innerHTML = `Ω = ${fix(M.omega, 4)} = ${fix(M.omega / DEG, 2)}° · 2π(1 − cos ε) = ${fix(M.capFlux, 4)}`;
    $('roMass').innerHTML = `m<sub>V</sub> = ${fix(M.mV, 4)} · λ<sub>V</sub> = ${Number.isFinite(M.lambdaV) ? fix(M.lambdaV, 3) : '∞'} · 2 + 1 = 3 · 12 = 9 + 2 + 1`;
    $('roCharge').innerHTML = chargeText(M);
    $('roNote').innerHTML = L(...NOTES_RO[f]);
    $('familyPill').innerHTML = `${fam.code} <strong>${L(fam.zh, fam.en)}</strong>`;
    $('closurePill').innerHTML = `Σ <strong>${fix(M.budgetSum, 6)}</strong>`;
    $('oFamily').textContent = famName(f);
    $('hint').innerHTML = L('拖琥珀锚点绕槽转 · 拖空白处转视角', 'drag the amber anchor round the trough · drag empty space to orbit');
    $('formula').innerHTML = FORMULA[f];
  }

  /* ---------- strip plot ---------- */
  const PLOTS = [
    ['勾股拆账：cos²ε + sin²ε = 1，角超 Ω 随 η 长', 'The split: cos²ε + sin²ε = 1 while the excess Ω grows with η'],
    ['屏蔽：有质量矢量对无质量极限', 'Screening: the massive vector against the massless limit'],
    ['刺猬剖面 F(r) 与所围重子数 B(r)', 'Hedgehog profile F(r) and enclosed baryon number B(r)'],
    ['涡旋剖面：序参量 |ψ| 与磁场 h', 'Vortex profile: order parameter |ψ| and field h'],
    ['五座塔的账：dim G = dim H + dim G/H', 'The books of five towers: dim G = dim H + dim G/H']
  ];
  function drawPlot(M) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    const f = S.family, pad = [40, 12, 10, 22];
    $('plotTitle').textContent = L(...PLOTS[f]);
    let meta = '';
    if (f === 0) {
      const g = kit.plot(cv, { x: [0, 1], y: [0, 1.72], pad });
      g.axes({ xTicks: [0, 0.25, 0.5, 0.75, 1], yTicks: [0, 0.5, 1, 1.5], xLabel: 'η' });
      const xs = Array.from({ length: 121 }, (_, i) => i / 120);
      g.hline(1, P.ok, { width: 1.8 });
      g.line(xs.map((x) => [x, Math.cos(epsOf(x)) ** 2]), P.cyan, { width: 2.2 });
      g.line(xs.map((x) => [x, Math.sin(epsOf(x)) ** 2]), P.magenta, { width: 2.2 });
      g.line(xs.map((x) => [x, omegaOf(epsOf(x))]), P.violet, { width: 2.2 });
      g.vline(S.eta, P.amber, { alpha: 0.85 });
      g.dot(S.eta, M.cos2, P.amber, 3.6); g.dot(S.eta, M.sin2, P.amber, 3.6); g.dot(S.eta, M.omega, P.amber, 3.6);
      g.text(0.02, 1.12, 'Σ = 1 · LEAN ✓', P.ok, { align: 'left', size: 10 });
      g.text(0.1, 0.82, 'cos^{2}ε', P.cyan, { align: 'left', size: 10.5 });
      g.text(0.1, 0.2, 'sin^{2}ε', P.magenta, { align: 'left', size: 10.5 });
      g.text(0.97, 1.42, 'Ω(ΔT_{ε})', P.violet, { align: 'right', size: 10.5 });
      meta = `η = ${fix(S.eta, 2)} · ${fix(M.cos2, 4)} + ${fix(M.sin2, 4)} = ${fix(M.budgetSum, 6)} · Ω = ${fix(M.omega, 4)}`;
    } else if (f === 1) {
      const g = kit.plot(cv, { x: [0, 6], y: [0, 1.16], pad });
      g.axes({ xTicks: [0, 2, 4, 6], yTicks: [0, 0.5, 1], xLabel: 'r' });
      const rs = Array.from({ length: 121 }, (_, i) => 6 * i / 120);
      g.hline(1, P.magenta, { width: 1.6, dash: [5, 4] });
      if (M.mV > 0) g.line(rs.map((r) => [r, Math.exp(-M.mV * r)]), P.cyan, { width: 2.4 });
      if (Number.isFinite(M.lambdaV) && M.lambdaV <= 6) { g.vline(M.lambdaV, P.amber, { alpha: 0.85 }); g.dot(M.lambdaV, Math.exp(-1), P.amber, 4); }
      g.text(5.9, 1.07, 'g = 0: λ_{V} = ∞', P.magenta, { align: 'right', size: 10 });
      if (M.mV > 0) g.text(0.25, 0.3, 'e^{−m_{V} r}', P.cyan, { align: 'left', size: 10.5 });
      g.text(5.9, 0.12, '12 = 9 + 2 + 1', P.ink, { align: 'right', size: 10 });
      meta = `m<sub>V</sub> = g η v₀ = ${fix(M.mV, 4)} · λ<sub>V</sub> = ${Number.isFinite(M.lambdaV) ? fix(M.lambdaV, 3) : '∞'} · 2 + 1 = 3`;
    } else if (f === 2) {
      const g = kit.plot(cv, { x: [0, 5], y: [0, 1.12], pad });
      g.axes({ xTicks: [0, 1, 2, 3, 4, 5], yTicks: [[0, '0'], [0.5, '½'], [1, '1']], xLabel: 'r/R' });
      const rs = Array.from({ length: 151 }, (_, i) => 5 * i / 150);
      if (M.on) {
        g.line(rs.map((r) => [r, r > 0 ? skyF(r) / PI : 1]), P.cyan, { width: 2.4 });
        g.line(rs.map((r) => [r, r > 0 ? skyB(r) : 0]), P.violet, { width: 2.4 });
        g.dot(1, 0.5, P.amber, 4);
      } else { g.hline(0.01, P.cyan, { width: 2.4 }); }
      g.text(0.35, 0.92, 'F(r)/π', P.cyan, { align: 'left', size: 10.5 });
      g.text(4.9, 0.86, 'B(r) → 1', P.violet, { align: 'right', size: 10.5 });
      meta = `F(0) = π → F(∞) = 0 · B = ${M.B} · ∫ = ${fix(M.Bq, 9)}`;
    } else if (f === 3) {
      const g = kit.plot(cv, { x: [0, 6], y: [0, 1.12], pad });
      g.axes({ xTicks: [0, 2, 4, 6], yTicks: [0, 0.5, 1], xLabel: 'r/ξ' });
      const rs = Array.from({ length: 121 }, (_, i) => 6 * i / 120);
      if (M.on) {
        g.line(rs.map((r) => [r, Math.tanh(r / Math.SQRT2)]), P.cyan, { width: 2.4 });
        if (Number.isFinite(M.kappa)) g.line(rs.map((r) => [r, Math.exp(-r / M.kappa)]), P.violet, { width: 2.4 });
        else g.hline(1, P.violet, { width: 2.4 });
        if (Number.isFinite(M.kappa) && M.kappa <= 6) { g.vline(M.kappa, P.amber, { alpha: 0.85 }); g.dot(M.kappa, Math.exp(-1), P.amber, 4); }
      }
      g.text(5.9, 1.0, '|ψ|', P.cyan, { align: 'right', size: 10.5 });
      g.text(0.3, 0.2, 'h/h_{0}', P.violet, { align: 'left', size: 10.5 });
      meta = `κ = λ/ξ = ${Number.isFinite(M.kappa) ? fix(M.kappa, 3) : '∞'} · ∮∇θ·dl = 2π · Φ₀ = ${(FLUX * 1e15).toFixed(4)}×10⁻¹⁵ Wb`;
    } else {
      const g = kit.plot(cv, { x: [0.4, 5.6], y: [0, 18.5], pad });
      g.axes({ xTicks: FAM.map((x, k) => [k + 1, x.code]), yTicks: [0, 4, 8, 12, 16] });
      FAM.forEach((x, k) => {
        const hH = M.on ? x.dimH : x.dimG, top = x.dimG, cur = k === M.relay;
        if (hH > 0) g.rect(k + 0.7, 0, k + 1.3, hH, P.cyan, { alpha: 0.45, stroke: P.cyan, width: 1.2 });
        if (M.on && top > hH) g.rect(k + 0.7, hH, k + 1.3, top, P.magenta, { alpha: 0.45, stroke: P.magenta, width: 1.2 });
        if (cur) g.rect(k + 0.62, 0, k + 1.38, top + 0.4, P.amber, { fill: false, stroke: P.amber, width: 1.6 });
        g.text(k + 1, top + 1.3, M.on ? `${x.dimH} + ${x.dimG - x.dimH}` : `${x.dimG} + 0`, cur ? P.amber : P.ink, { align: 'center', size: 10 });
      });
      meta = `v = 246.22 GeV → 2m<sub>u</sub> + m<sub>d</sub> ≈ 8.99 MeV → m<sub>p</sub> = 938.27 MeV (${fix(100 * PROTON_FRACTION, 2)}%) → Φ₀ → θ* = ${fix(THETA_STAR, 4)}`;
    }
    $('plotMeta').innerHTML = meta;
  }

  const paint = kit.painter(() => {
    const M = model();
    hudText(M); TRV.hudFit();
    drawStage(M); drawText(M); drawPlot(M);
  }, [stageEl, $('plot')]);

  /* ---------- the rail: the anchor azimuth φ₀ ---------- */
  const playBtn = $('playBtn');
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 360, t: 70, rate: 36, step: 15, loop: true,
    format: (t) => `φ₀ ${fix(t, 1)}° <small>/ 360°</small>`,
    onChange: (t, C) => { S.phi = t; playBtn.textContent = C.playing ? '❚❚' : '▷'; playBtn.setAttribute('aria-pressed', String(C.playing)); paint(); }
  });
  playBtn.addEventListener('click', () => clock.toggle());
  $('rewindBtn').addEventListener('click', () => { clock.pause(); clock.set(0); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });

  /* ---------- controls ---------- */
  let transition = null, booting = true;
  const leave = () => { if (transition) transition.cancel(); transition = null; cards.mark(null); clock.pause(); };
  function setFamily(k, quiet) {
    S.family = clamp(Math.round(k), 0, 4);
    familyChips.set(String(S.family), true); fFamily.set(S.family);
    if (!quiet) paint();
  }
  const fFamily = kit.field($('familyIndex'), { fmt: (v) => famName(Math.round(v)), out: $('oFamily'), onInput: (v) => { leave(); setFamily(v); } });
  const fEta = kit.field($('ssbDepth'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.eta = clamp(v, 0, 1); paint(); } });
  const fG = kit.field($('gaugeCoupling'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.g = clamp(v, 0, 1); paint(); } });
  const familyChips = kit.chips($('familyChips'), 'family', (v) => { if (transition) transition.cancel(); transition = null; cards.mark(null); setFamily(Number(v)); });
  kit.keys({ f: () => { leave(); setFamily((S.family + 1) % 5); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'pythagorean-coset-ledger': { family: 0, eta: 0.75, g: 0.65, phi: 70, play: false, still: 70 },
    'goldstone-vs-higgs-closure': { family: 1, eta: 0.75, g: 0.65, phi: 0, play: true, still: 120 },
    'skyrmion-baryon-winding': { family: 2, eta: 0.8, g: 0.65, phi: 0, play: true, still: 30 },
    'superconductor-crystal-meissner': { family: 3, eta: 0.85, g: 0.8, phi: 0, play: true, still: 60 },
    'five-family-cascade-relay': { family: 4, eta: 0.75, g: 0.65, phi: 0, play: true, still: 90 }
  };
  const NOTES = {
    'pythagorean-coset-ledger': ['η = 0.75 时 ε = 67.5°：青色内积份额 cos²ε = 0.1464 与品红楔积份额 sin²ε = 0.8536 在勾股三角里拆账，和恰为 1；品红曲面 ΔT<sub>ε</sub> 的角超 Ω = 48.12°，紫色实心三面角立在琥珀锚点上。', 'At η = 0.75, ε = 67.5°: the cyan inner-product share cos²ε = 0.1464 and the magenta wedge share sin²ε = 0.8536 split the Pythagorean triangle and add up to exactly 1; the magenta cap ΔT<sub>ε</sub> has excess Ω = 48.12°, and the violet solid trihedron stands on the amber anchor.'],
    'goldstone-vs-higgs-closure': ['g = 0.65、η = 0.75：青色戈德斯通波从锚点出发绕槽，振幅按 λ<sub>V</sub> = 2.05 衰减；那段青色弧正被吃进紫色质量核，两条品红横向模与它合成 2 + 1 = 3。', 'g = 0.65, η = 0.75: the cyan Goldstone wave runs round the trough from the anchor and decays over λ<sub>V</sub> = 2.05; the cyan arc is being eaten into the violet massive core, which with the two magenta transverse modes makes 2 + 1 = 3.'],
    'skyrmion-baryon-winding': ['紫色刺猬的刺沿径向，颜色从品红（F = π）褪到青色（F = 0）；槽上那半圈从锚点 U = 1 走到 U = −1。积分得 B = 1：只看两端，不看形状。', 'The spines of the violet hedgehog point outwards, fading from magenta (F = π) to cyan (F = 0); the half-circle on the trough runs from the anchor U = 1 to U = −1. The integral gives B = 1: only the ends count, not the shape.'],
    'superconductor-crystal-meissner': ['涡核立在帽顶（|Φ| = 0），紫色磁通线穿过它；青色螺线绕核一圈，相位转 2π，所围磁通是一个 Φ₀ = h/2e。槽上的 12 格点环带着一列声子起伏。', 'The vortex core stands on the hilltop (|Φ| = 0) with the violet flux line through it; the cyan helix winds once round it, the phase turns by 2π and the enclosed flux is one Φ₀ = h/2e. The 12-site lattice ring on the trough carries a phonon.'],
    'five-family-cascade-relay': ['五座塔绕槽站立：青色是守恒的 dim H，品红是破缺的 dim G/H。锚点从 T1 接力到 T5，琥珀环标出当前那座；中央紫色螺线收敛到 θ* = cos θ* = 0.7391。', 'Five towers stand round the trough: cyan is the kept dim H, magenta the broken dim G/H. The anchor relays from T1 to T5 and an amber ring marks the current one; in the middle the violet spiral converges to θ* = cos θ* = 0.7391.']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'pythagorean-coset-ledger': ['ε = 67.5°：青色 cos²ε = 0.1464 加品红 sin²ε = 0.8536 恰为 1；品红曲面的角超 Ω = 48.12°。', 'ε = 67.5°: cyan cos²ε = 0.1464 plus magenta sin²ε = 0.8536 is exactly 1; the magenta cap has excess Ω = 48.12°.'],
    'goldstone-vs-higgs-closure': ['青色戈德斯通波按屏蔽长度 2.05 衰减，青弧被吃进紫色质量核：2 + 1 = 3。', 'The cyan Goldstone wave decays over a screening length 2.05 and the cyan arc is eaten into the violet core: 2 + 1 = 3.'],
    'skyrmion-baryon-winding': ['刺猬的刺从品红褪到青色，槽上半圈从 U = 1 走到 U = −1；积分得 B = 1。', 'The spines fade from magenta to cyan and the half-circle runs from U = 1 to U = −1; the integral gives B = 1.'],
    'superconductor-crystal-meissner': ['涡核立在帽顶，青色螺线绕一圈：相位转 2π，所围磁通是一个 Φ₀ = h/2e。', 'The core stands on the hilltop and the cyan helix winds once: the phase turns by 2π, enclosing one Φ₀ = h/2e.'],
    'five-family-cascade-relay': ['五座塔按 dim H（青）+ dim G/H（品红）拆账，锚点接力到 T5，螺线收敛到 θ* = 0.7391。', 'Five towers split as dim H (cyan) + dim G/H (magenta); the anchor relays to T5 and the spiral converges to θ* = 0.7391.']
  };
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause();
    if (transition) transition.cancel();
    transition = null;
    setFamily(p.family, true);
    sc.view(VIEW0, booting || TRV.still ? 0 : 600);
    const from = { eta: S.eta, g: S.g };
    const finish = () => { S.eta = p.eta; S.g = p.g; fEta.set(p.eta); fG.set(p.g); paint(); };
    if (booting || TRV.still) finish();
    else transition = kit.tween(550, (e) => { S.eta = from.eta + (p.eta - from.eta) * e; S.g = from.g + (p.g - from.g) * e; fEta.set(S.eta); fG.set(S.g); paint(); }, finish);
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still);
    else clock.set(p.phi);
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) kit.autoplay(clock, stageEl); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换家族、拉 η<sub>SSB</sub> 与 g<sub>gauge</sub>、拖琥珀锚点绕槽。随时可以再选一张卡。', 'Free play: switch the family, pull η<sub>SSB</sub> and g<sub>gauge</sub>, drag the amber anchor round the trough. Pick a card again at any time.']
  });
  // the tour bar's card title carries the id #tourStep
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.COSET_TOWER_DEBUG = Object.freeze({
    get state() {
      const M = model(), I = instances(M);
      return JSON.parse(JSON.stringify({
        preset: cards.current, t: clock.t, playing: clock.playing,
        familyIndex: S.family, familyCode: FAM[S.family].code, ssbDepth: S.eta, gaugeCoupling: S.g,
        anchorAzimuthDeg: S.phi, anchorAzimuthRad: M.phiRad, epsilonRad: M.eps,
        anchorShareCos2: M.cos2, cosetShareSin2: M.sin2, budgetSum: M.budgetSum, budgetResidual: Math.abs(M.budgetSum - 1),
        cartanCapFlux: M.capFlux, girardTrihedralExcess: M.omega, solidAngleExcess: M.omegaVOS,
        maurerCartanResidual: I.maurerCartan.residual, curvatureResidual: I.maurerCartan.curvatureResidual,
        electroweakDofBefore: 4 * 2 + 4, electroweakDofAfter: 3 * 3 + 2 + 1, abelianDofBefore: 2 + 2, abelianDofAfter: 3 + 1,
        weinbergSin2OnShell: SIN2W, skyrmionBaryonNumber: M.B, skyrmionBaryonQuadrature: M.Bq,
        protonChiralMassFraction: PROTON_FRACTION, fluxQuantumWb: FLUX, thetaStar: THETA_STAR,
        vectorMass: M.mV, screeningLength: Number.isFinite(M.lambdaV) ? M.lambdaV : null, kappa: Number.isFinite(M.kappa) ? M.kappa : null,
        troughRadius: M.rt, rhoMax: M.rhoMax, anchor: M.anchor, relayIndex: M.relay,
        families: FAM.map((x) => ({ code: x.code, dimG: x.dimG, dimH: x.dimH, dimCoset: x.dimG - x.dimH, azimuthDeg: x.az })),
        leanInstances: I, camera: Object.assign({}, sc.cam),
        handle: FRAME ? FRAME.handle : null, labels: PLACED, stageFrame: FRAME
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock). */
    setState(o) {
      leave();
      if (o.family != null) setFamily(o.family, true);
      if (o.eta != null) { S.eta = clamp(o.eta, 0, 1); fEta.set(S.eta); }
      if (o.g != null) { S.g = clamp(o.g, 0, 1); fG.set(S.g); }
      if (o.phi != null) clock.set(((o.phi % 360) + 360) % 360);
      paint();
    },
    /** Viewport coordinates of the anchor handle (for pointer tests), or null when hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates of the trough point at azimuth deg (for drag targets). */
    troughPoint(deg) { const b = stageEl.getBoundingClientRect(), q = sc.p([S.eta * Math.cos(deg * DEG), S.eta * Math.sin(deg * DEG), R_A * 0.92]); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] }; }
  });
  window.TRV_THUMB = () => { cards.pick('pythagorean-coset-ledger'); clock.pause(); clock.set(70); sc.view([VIEW0[0], VIEW0[1], 1], 0); paint.now(); };
  cards.pick(cards.initial('pythagorean-coset-ledger'));
  booting = false;
  paint();
})();
