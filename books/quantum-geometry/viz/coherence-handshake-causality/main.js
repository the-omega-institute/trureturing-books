/* ORTHO//HANDSHAKE · coherence handshake and causality: six scenes on one canvas, one quantity on the rail per scene.
   boolean-illusion    three zeros: B ⟂ A (projection onto M = span(A) and its complement), a balanced two-port at
                       opposite phase (b± = (a ± b e^{iΔ})/√2), and the decoherence family ρ_γ pinched by the standard
                       record family; the rail runs γ from 1 to 0
   born-handshake      |ψ⟩ = e^{iχ_ψ}(1, 0), |φ⟩ = e^{iχ_φ}(cos θ/2, sin θ/2): forward ⟨φ|ψ⟩, echo ⟨ψ|φ⟩, their product,
                       Tr(P_φP_ψ), the sandwich P_ψP_φP_ψ; the rail runs χ_ψ over a full turn
   feynman-stationary  A_M = M^{−½} Σ e^{ik₀L(s_k)}, L(s) = n₁√(s² + 1) + n₂√((1 − s)² + 1), s on the midpoint grid of
                       [−2, 3]; the rail adds the paths one by one
   tsvf-eraser         p(j, ±) = Tr[ρ_PM(E_j ⊗ F±)] as actual 4 × 4 traces on 128 screen bins, the past total, and the
                       weak value Z_w = ⟨Φ_η|Z|+⟩/⟨Φ_η|+⟩; the rail turns the future marker basis β from 0 to 90°
   gram-symmetry       B = (0, 0, 1), A = (√(1 − x²), 0, x), C = (√(1 − y²) cos φ, √(1 − y²) sin φ, y); G, G′ = P₁₃GP₁₃ᵀ,
                       generic determinants, triple products, Jacobi eigenvalues; the rail turns C once about B
   paradox-cancel      A_loop = ½(1 + e^{iδ}), A_other = ½(1 − e^{iδ}), δ = πτ from the double-cover lift of τ base turns,
                       Deutsch's X example, 50-step bisection of cos θ = θ, the six nondegenerate maps over Fin 2
   Read-only probe for the browser suite: window.__HANDSHAKE_LAB__ (also window.HANDSHAKE_DEBUG). */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, sgn, clamp, TAU, v3 } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, DEG = PI / 180;
  const TOL = 1e-10, ZERO = 1e-12, UNDEF = 1e-8;
  const LW = TRV.thumbMode ? 2 : 1;
  const SCENES = ['boolean-illusion', 'born-handshake', 'feynman-stationary', 'tsvf-eraser', 'gram-symmetry', 'paradox-cancel'];
  const MESH = [257, 513, 1025, 2049, 4097];
  const NB = 128;

  /* ---------- numbers ---------- */
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  /** A raw residual in scientific notation (never clamped): 0 only when it is exactly 0. */
  const sci = (x) => {
    if (x == null || !isFinite(x)) return '—';
    if (x === 0) return '0';
    const e = Math.floor(Math.log10(Math.abs(x))), m = x / Math.pow(10, e);
    return `${fix(m, 1)}×10${String(e).split('').map((c) => SUP[c]).join('')}`;
  };
  /** A value, shown as zero below the display threshold 10⁻¹². */
  const nf = (x, d) => fix(Math.abs(x) < ZERO ? 0 : x, d == null ? 2 : d);
  const degs = (r, d) => `${fix(r / DEG, d == null ? 0 : d)}°`;

  /* ---------- complex numbers and small complex matrices ---------- */
  const cx = (re, im) => [re, im || 0];
  const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const csub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cconj = (a) => [a[0], -a[1]];
  const cscale = (a, k) => [a[0] * k, a[1] * k];
  const cabs2 = (a) => a[0] * a[0] + a[1] * a[1];
  const cabs = (a) => Math.hypot(a[0], a[1]);
  const cexp = (t) => [Math.cos(t), Math.sin(t)];
  const carg = (a) => Math.atan2(a[1], a[0]);
  const cdiv = (a, b) => { const d = cabs2(b); return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
  const Mx = {
    zero: (n) => Array.from({ length: n }, () => Array.from({ length: n }, () => cx(0))),
    id: (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (__, j) => cx(i === j ? 1 : 0))),
    mul(A, B) {
      const n = A.length, m = B[0].length, k = B.length, C = [];
      for (let i = 0; i < n; i++) {
        const row = [];
        for (let j = 0; j < m; j++) { let re = 0, im = 0; for (let l = 0; l < k; l++) { const a = A[i][l], b = B[l][j]; re += a[0] * b[0] - a[1] * b[1]; im += a[0] * b[1] + a[1] * b[0]; } row.push([re, im]); }
        C.push(row);
      }
      return C;
    },
    adj: (A) => A[0].map((_, j) => A.map((r) => cconj(r[j]))),
    add: (A, B) => A.map((r, i) => r.map((v, j) => cadd(v, B[i][j]))),
    sub: (A, B) => A.map((r, i) => r.map((v, j) => csub(v, B[i][j]))),
    scale: (A, k) => A.map((r) => r.map((v) => (Array.isArray(k) ? cmul(v, k) : cscale(v, k)))),
    tr: (A) => A.reduce((s, r, i) => cadd(s, r[i]), [0, 0]),
    fro: (A) => Math.sqrt(A.reduce((s, r) => s + r.reduce((t, v) => t + cabs2(v), 0), 0)),
    /** |u⟩⟨v| */
    outer: (u, v) => u.map((a) => v.map((b) => cmul(a, cconj(b)))),
    kron(A, B) {
      const n = A.length, m = B.length, C = [];
      for (let i = 0; i < n * m; i++) { const row = []; for (let j = 0; j < n * m; j++) row.push(cmul(A[Math.floor(i / m)][Math.floor(j / m)], B[i % m][j % m])); C.push(row); }
      return C;
    },
    apply: (A, v) => A.map((r) => r.reduce((s, a, j) => cadd(s, cmul(a, v[j])), [0, 0]))
  };
  /** ⟨u|v⟩ = Σ conj(uᵢ) vᵢ */
  const inner = (u, v) => u.reduce((s, a, i) => cadd(s, cmul(cconj(a), v[i])), [0, 0]);
  /** Hilbert–Schmidt ⟨A, B⟩ = Tr(A†B) */
  const hs = (A, B) => Mx.tr(Mx.mul(Mx.adj(A), B));
  const KP = [cx(Math.SQRT1_2), cx(Math.SQRT1_2)], KM = [cx(Math.SQRT1_2), cx(-Math.SQRT1_2)];
  /** The standard-basis record family {|0⟩⟨0|, |1⟩⟨1|} and its unread map Σ P_k ρ P_k. */
  const REC = [[[cx(1), cx(0)], [cx(0), cx(0)]], [[cx(0), cx(0)], [cx(0), cx(1)]]];
  const unread = (r, recs) => (recs || REC).reduce((s, Pk) => Mx.add(s, Mx.mul(Mx.mul(Pk, r), Pk)), Mx.zero(r.length));

  /* real 3 × 3 */
  const mul3 = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, a, l) => s + a * B[l][j], 0)));
  const tr3 = (A) => A[0].map((_, j) => A.map((r) => r[j]));
  const det3 = (A) => A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
  /** Eigenvalues of a real symmetric matrix by cyclic Jacobi rotations, ascending. */
  function eigSym(A0) {
    const n = A0.length, a = A0.map((r) => r.slice());
    for (let sweep = 0; sweep < 60; sweep++) {
      let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += a[i][j] * a[i][j];
      if (off < 1e-30) break;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
        if (Math.abs(a[p][q]) < 1e-300) continue;
        const th = (a[q][q] - a[p][p]) / (2 * a[p][q]), t = (th >= 0 ? 1 : -1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < n; k++) { const akp = a[k][p], akq = a[k][q]; a[k][p] = c * akp - s * akq; a[k][q] = s * akp + c * akq; }
        for (let k = 0; k < n; k++) { const apk = a[p][k], aqk = a[q][k]; a[p][k] = c * apk - s * aqk; a[q][k] = s * apk + c * aqk; }
      }
    }
    return a.map((r, i) => r[i]).sort((x, y) => x - y);
  }

  /* ================= the six models (pure functions of their parameters) ================= */

  /* ---------- boolean-illusion ---------- */
  function mathBoolean(p) {
    const th = p.th, a = Math.cos(p.xi), b = Math.sin(p.xi), D = p.Delta, g = p.gamma;
    // (a) the projection onto M = span(A) and onto its complement, as matrices
    const A = [1, 0], B = [Math.cos(th), Math.sin(th)], nA = A[0] * A[0] + A[1] * A[1];
    const PM = [[A[0] * A[0] / nA, A[0] * A[1] / nA], [A[1] * A[0] / nA, A[1] * A[1] / nA]];
    const PC = [[1 - PM[0][0], -PM[0][1]], [-PM[1][0], 1 - PM[1][1]]];
    const app = (Q, v) => [Q[0][0] * v[0] + Q[0][1] * v[1], Q[1][0] * v[0] + Q[1][1] * v[1]];
    const mm = (X, Y) => [[X[0][0] * Y[0][0] + X[0][1] * Y[1][0], X[0][0] * Y[0][1] + X[0][1] * Y[1][1]], [X[1][0] * Y[0][0] + X[1][1] * Y[1][0], X[1][0] * Y[0][1] + X[1][1] * Y[1][1]]];
    const dif = (X, Y) => Math.max(...[0, 1].flatMap((i) => [0, 1].map((j) => Math.abs(X[i][j] - Y[i][j]))));
    const I2r = [[1, 0], [0, 1]], O2r = [[0, 0], [0, 0]], sumPC = [[PM[0][0] + PC[0][0], PM[0][1] + PC[0][1]], [PM[1][0] + PC[1][0], PM[1][1] + PC[1][1]]];
    const projRes = Math.max(dif(mm(PM, PM), PM), dif(mm(PC, PC), PC), dif(mm(PM, PC), O2r), dif(mm(PC, PM), O2r), dif(sumPC, I2r));
    const Bpar = app(PM, B), Bperp = app(PC, B);
    const dot = A[0] * B[0] + A[1] * B[1], wedge = A[0] * B[1] - A[1] * B[0];
    const par2 = Bpar[0] ** 2 + Bpar[1] ** 2, perp2 = Bperp[0] ** 2 + Bperp[1] ** 2, normB2 = B[0] ** 2 + B[1] ** 2;
    let lag = 0; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) lag += (A[i] * B[j] - A[j] * B[i]) ** 2;
    lag /= 2;
    const lagRes = Math.abs(nA * normB2 - dot * dot - lag);
    const sumAB2 = (A[0] + B[0]) ** 2 + (A[1] + B[1]) ** 2;
    // (b) the balanced two-port on the pure input ψ = (a, b e^{iΔ})
    const psi = [cx(a), cscale(cexp(D), b)];
    const ampPlus = inner(KP, psi), ampMinus = inner(KM, psi);
    const pPlus = cabs2(ampPlus), pMinus = cabs2(ampMinus);
    const raw = cadd(psi[0], psi[1]), Iraw = cabs2(raw);
    // (c) ρ_γ: the pure state with its off-diagonal part scaled by γ, then the standard record pinching
    const rho1 = Mx.outer(psi, psi), pin1 = unread(rho1);
    const rho = Mx.add(pin1, Mx.scale(Mx.sub(rho1, pin1), g));
    const pin = unread(rho), idemRes = Mx.fro(Mx.sub(unread(pin), pin));
    const qPlus = Mx.tr(Mx.mul(rho, Mx.outer(KP, KP)))[0], qMinus = Mx.tr(Mx.mul(rho, Mx.outer(KM, KM)))[0];
    const off = Mx.sub(rho, pin);
    const hsAll = hs(rho, rho)[0], hsKept = hs(pin, pin)[0], hsOff = hs(off, off)[0], hsRes = Math.abs(hsAll - hsKept - hsOff);
    const purity = Mx.tr(Mx.mul(rho, rho))[0], purityFormula = a ** 4 + b ** 4 + 2 * g * g * a * a * b * b;
    const r00 = rho[0][0][0], r11 = rho[1][1][0], r01 = rho[0][1], disc = Math.sqrt((r00 - r11) ** 2 + 4 * cabs2(r01));
    const eig = [(r00 + r11 - disc) / 2, (r00 + r11 + disc) / 2], trace = Mx.tr(rho);
    const hsPure = hs(Mx.sub(rho1, pin1), Mx.sub(rho1, pin1))[0];
    return {
      th, xi: p.xi, a, b, Delta: D, gamma: g, A, B, Bpar, Bperp, dot, wedge, wedge2: wedge * wedge, par2, perp2, normB2,
      normRes: Math.abs(par2 + perp2 - 1), lagRes, projRes, sumAB2,
      ampPlus, ampMinus, pPlus, pMinus, portSumRes: Math.abs(pPlus + pMinus - 1), Iraw, IrawRes: Math.abs(Iraw - 2 * pPlus),
      rho, pinched: pin, idemRes, qPlus, qMinus, portSumResG: Math.abs(qPlus + qMinus - 1), qFormulaRes: Math.max(Math.abs(qPlus - 0.5 * (1 + 2 * g * a * b * Math.cos(D))), Math.abs(qMinus - 0.5 * (1 - 2 * g * a * b * Math.cos(D)))),
      hsAll, hsKept, hsOff, hsRes, purity, purityRes: Math.abs(purity - purityFormula), eig, psd: eig[0] >= -TOL, traceRes: cabs(csub(trace, cx(1))),
      pinSqRes: Mx.fro(Mx.sub(Mx.mul(pin, pin), pin)), cohPure: hsPure, cohKept: hsOff, cohLost: hsPure - hsOff
    };
  }

  /* ---------- born-handshake ---------- */
  function mathBorn(p) {
    const th = p.thB, c = Math.cos(th / 2), s = Math.sin(th / 2);
    const psi = [cexp(p.chiPsi), cx(0)], e = cexp(p.chiPhi), phi = [cscale(e, c), cscale(e, s)];
    const fwd = inner(phi, psi), echo = inner(psi, phi), prod = cmul(fwd, echo), w = cabs2(fwd);
    const Ppsi = Mx.outer(psi, psi), Pphi = Mx.outer(phi, phi);
    const t1 = Mx.tr(Mx.mul(Pphi, Ppsi)), t2 = Mx.tr(Mx.mul(Ppsi, Pphi));
    const sand = Mx.mul(Mx.mul(Ppsi, Pphi), Ppsi), sandRes = Mx.fro(Mx.sub(sand, Mx.scale(Ppsi, w)));
    // complete the measurement with I − P_φ: the record family of the rank-one Born theorem
    const Q = [Pphi, Mx.sub(Mx.id(2), Pphi)];
    const rec = {
      selfAdj: Math.max(...Q.map((q) => Mx.fro(Mx.sub(q, Mx.adj(q))))),
      idem: Math.max(...Q.map((q) => Mx.fro(Mx.sub(Mx.mul(q, q), q)))),
      orth: Mx.fro(Mx.mul(Q[0], Q[1])),
      complete: Mx.fro(Mx.sub(Mx.add(Q[0], Q[1]), Mx.id(2)))
    };
    const rho = Ppsi, weights = Q.map((q) => Mx.tr(Mx.mul(rho, q)));
    const un = unread(rho, Q);
    const ens = Q.reduce((acc, q, k) => { const wk = weights[k][0]; if (Math.abs(wk) < UNDEF) return acc; const cond = Mx.scale(Mx.mul(Mx.mul(q, rho), q), 1 / wk); return Mx.add(acc, Mx.scale(cond, wk)); }, Mx.zero(2));
    const bloch = (u) => { const R = Mx.outer(u, u); return [2 * R[0][1][0], -2 * R[0][1][1], R[0][0][0] - R[1][1][0]]; };
    return {
      th, chiPsi: p.chiPsi, chiPhi: p.chiPhi, r: c, w, wFormula: c * c, fwd, echo, prod, prodImRes: Math.abs(prod[1]), prodRes: Math.abs(prod[0] - w),
      conjRes: cabs(csub(echo, cconj(fwd))), t1, t2, traceRes: Math.max(cabs(csub(t1, cx(w))), cabs(csub(t2, cx(w)))), sandRes, rec,
      weights, weightSumRes: cabs(csub(cadd(weights[0], weights[1]), cx(1))), bornRes: cabs(csub(weights[0], cx(w))), ensRes: Mx.fro(Mx.sub(un, ens)),
      blochPsi: bloch(psi), blochPhi: bloch(phi), argFwd: carg(fwd), argEcho: carg(echo), alpha: p.chiPsi - p.chiPhi
    };
  }

  /* ---------- feynman-stationary ---------- */
  const fCache = new Map();
  function feynmanCore(p) {
    const { k0, n1, n2, fan } = p;
    const Lf = (s) => n1 * Math.hypot(s, 1) + n2 * Math.hypot(1 - s, 1);
    const dL = (s) => n1 * s / Math.hypot(s, 1) - n2 * (1 - s) / Math.hypot(1 - s, 1);
    const d2L = (s) => n1 / Math.pow(s * s + 1, 1.5) + n2 / Math.pow((1 - s) * (1 - s) + 1, 1.5);
    let lo = 0, hi = 1;
    for (let i = 0; i < 60; i++) { const mid = (lo + hi) / 2; if (dL(mid) < 0) lo = mid; else hi = mid; }
    const sStar = (lo + hi) / 2, Lstar = Lf(sStar), L2 = d2L(sStar), dLres = Math.abs(dL(sStar));
    const sin1 = sStar / Math.hypot(sStar, 1), sin2 = (1 - sStar) / Math.hypot(1 - sStar, 1);
    const phaseAt = fan === 'quadratic' ? (s) => k0 * (Lstar + 0.5 * L2 * (s - sStar) * (s - sStar)) : (s) => k0 * Lf(s);
    const grid = (M) => {
      const s = new Float64Array(M), ph = new Float64Array(M); let step = 0;
      for (let i = 0; i < M; i++) { s[i] = -2 + 5 * (i + 0.5) / M; ph[i] = fan === 'roots' ? TAU * i / M : phaseAt(s[i]); if (i) step = Math.max(step, Math.abs(ph[i] - ph[i - 1])); }
      return { M, s, ph, step };
    };
    const meanOf = (G) => { let re = 0, im = 0; for (let i = 0; i < G.M; i++) { re += Math.cos(G.ph[i]); im += Math.sin(G.ph[i]); } return [re / G.M, im / G.M]; };
    const meshes = MESH.map((m) => { const G = grid(m), avg = meanOf(G); return { M: m, step: G.step, ok: G.step <= PI / 4 + 1e-12, avg, absAvg: cabs(avg), C: cabs2(avg) }; });
    let M, under;
    if (p.mesh === 'auto') { const hit = meshes.find((m) => m.ok); M = hit ? hit.M : MESH[MESH.length - 1]; under = !hit; }
    else { M = Number(p.mesh); under = !meshes.find((m) => m.M === M).ok; }
    const G = grid(M), sc = 1 / Math.sqrt(M), Z = new Float64Array(2 * (M + 1)), band = new Uint8Array(M);
    let zr = 0, zi = 0, br = 0, bi = 0, orr = 0, oi = 0, nb = 0;
    for (let i = 0; i < M; i++) {
      const c = Math.cos(G.ph[i]) * sc, s = Math.sin(G.ph[i]) * sc;
      zr += c; zi += s; Z[2 * i + 2] = zr; Z[2 * i + 3] = zi;
      const inb = fan !== 'roots' && Math.abs(G.ph[i] - k0 * Lstar) <= PI / 4;
      band[i] = inb ? 1 : 0;
      if (inb) { br += c; bi += s; nb++; } else { orr += c; oi += s; }
    }
    const avg = [zr * sc, zi * sc], idx = MESH.indexOf(M), next = idx >= 0 && idx < MESH.length - 1 ? meshes[idx + 1] : null;
    let rr = 0, ri = 0; for (let i = 0; i < M; i++) { rr += Math.cos(TAU * i / M); ri += Math.sin(TAU * i / M); }
    const Om = [0.8 * Math.cos(0.9), 0.8 * Math.sin(0.9)];
    let bandLo = null, bandHi = null; for (let i = 0; i < M; i++) if (band[i]) { if (bandLo == null) bandLo = G.s[i]; bandHi = G.s[i]; }
    return {
      k0, n1, n2, fan, mesh: p.mesh, M, under, step: G.step, s: G.s, ph: G.ph, band, Z, A: [zr, zi], A2: zr * zr + zi * zi, C: (zr * zr + zi * zi) / M, avg,
      sStar, Lstar, L2, dLres, sin1, sin2, snellRes: Math.abs(n1 * sin1 - n2 * sin2), Aband: [br, bi], Aoff: [orr, oi], bandCount: nb, bandLo, bandHi,
      meshes: meshes.map((m) => ({ M: m.M, step: m.step, ok: m.ok, avg: m.avg, absAvg: m.absAvg, C: m.C })), next: next ? next.M : null,
      meshDiff: next ? cabs(csub(avg, next.avg)) : null, rootsRes: Math.hypot(rr, ri), pairRes: cabs(cadd(Om, cscale(Om, -1))), L: Lf
    };
  }
  function mathFeynman(p) {
    const key = [p.k0, p.n1, p.n2, p.mesh, p.fan].join('|');
    let F = fCache.get(key);
    if (!F) { F = feynmanCore(p); fCache.set(key, F); if (fCache.size > 16) fCache.delete(fCache.keys().next().value); }
    const k = Math.round(clamp(p.kFrac, 0, 1) * F.M), kc = Math.max(0, Math.min(F.M - 1, k - 1));
    return Object.assign({}, F, { kFrac: p.kFrac, k, kc, sCur: F.s[kc], partial: [F.Z[2 * k], F.Z[2 * k + 1]] });
  }

  /* ---------- tsvf-eraser ---------- */
  const PATH_RHO = (V) => { const r = Mx.zero(4); r[0][0] = cx(0.5); r[3][3] = cx(0.5); r[0][3] = cx(V / 2); r[3][0] = cx(V / 2); return r; };
  const screenE = (j) => { const q = 1 / NB, ph = TAU * (j + 0.5) / NB; return [[cx(q), cscale(cexp(-ph), q)], [cscale(cexp(ph), q), cx(q)]]; };
  function mathTsvf(p) {
    const { beta, V } = p, rho = PATH_RHO(V), q = 1 / NB;
    const fp = [cx(Math.cos(beta / 2)), cx(Math.sin(beta / 2))], fm = [cx(-Math.sin(beta / 2)), cx(Math.cos(beta / 2))];
    const Fp = Mx.outer(fp, fp), Fm = Mx.outer(fm, fm), I2 = Mx.id(2);
    const phi = [], jp = [], jm = [], tot = [], direct = [];
    let sumE = Mx.zero(2), resTot = 0, resDirect = 0, resAnalytic = 0, resIm = 0, pPlus = 0, pMinus = 0;
    for (let j = 0; j < NB; j++) {
      const E = screenE(j), ph = TAU * (j + 0.5) / NB;
      sumE = Mx.add(sumE, E);
      const tp = Mx.tr(Mx.mul(rho, Mx.kron(E, Fp))), tm = Mx.tr(Mx.mul(rho, Mx.kron(E, Fm))), td = Mx.tr(Mx.mul(rho, Mx.kron(E, I2)));
      phi.push(ph); jp.push(tp[0]); jm.push(tm[0]); tot.push(tp[0] + tm[0]); direct.push(td[0]);
      pPlus += tp[0]; pMinus += tm[0];
      resIm = Math.max(resIm, Math.abs(tp[1]), Math.abs(tm[1]), Math.abs(td[1]));
      resTot = Math.max(resTot, Math.abs(tp[0] + tm[0] - q));
      resDirect = Math.max(resDirect, Math.abs(td[0] - q));
      const vis = V * Math.sin(beta) * Math.cos(ph);
      resAnalytic = Math.max(resAnalytic, Math.abs(tp[0] - q / 2 * (1 + vis)), Math.abs(tm[0] - q / 2 * (1 - vis)));
    }
    const lo = Math.min(...tot), hi = Math.max(...tot), totalVis = hi + lo > 0 ? (hi - lo) / (hi + lo) : 0;
    const block = [rho[0][0][0], rho[3][3][0], cabs(rho[0][3])], bd = Math.sqrt((block[0] - block[1]) ** 2 + 4 * block[2] ** 2);
    return {
      beta, V, q, phi, jp, jm, tot, direct, pPlus, pMinus, maxRes: resTot, directRes: resDirect, analyticRes: resAnalytic, imRes: resIm,
      sumERes: Mx.fro(Mx.sub(sumE, I2)), rhoTraceRes: cabs(csub(Mx.tr(rho), cx(1))), rhoMinEig: Math.min(0, (block[0] + block[1] - bd) / 2), rhoEig: [(block[0] + block[1] - bd) / 2, (block[0] + block[1] + bd) / 2, 0, 0].sort((x, y) => x - y),
      heraldVis: V * Math.sin(beta), totalVis
    };
  }
  /** The weak value of Z between |Ψ⟩ = |+⟩ and |Φ_η⟩ = cos η|+⟩ + sin η|−⟩. */
  function weak(eta) {
    const Phi = [cadd(cscale(KP[0], Math.cos(eta)), cscale(KM[0], Math.sin(eta))), cadd(cscale(KP[1], Math.cos(eta)), cscale(KM[1], Math.sin(eta)))];
    const Zop = [[cx(1), cx(0)], [cx(0), cx(-1)]];
    const num = inner(Phi, Mx.apply(Zop, KP)), den = inner(Phi, KP), pPost = cabs2(den), defined = cabs(den) >= UNDEF;
    return { eta, num, den, pPost, defined, Zw: defined ? cdiv(num, den) : null };
  }
  /** No-signalling for an arbitrary complete two-outcome marker instrument K₁ = V₁ diag(c) W, K₂ = V₂ diag(s) W. */
  function instrument(seed, beta0, V0) {
    const rnd = TRV.mulberry32(seed >>> 0), U = () => { const a = TAU * rnd(), ps = TAU * rnd(), ch = TAU * rnd(), t = PI / 2 * rnd(), g = cexp(a);
      return Mx.scale([[cscale(cexp(ps), Math.cos(t)), cscale(cexp(ch), Math.sin(t))], [cscale(cexp(-ch), -Math.sin(t)), cscale(cexp(-ps), Math.cos(t))]], g); };
    const V1 = U(), V2 = U(), W = U(), t1 = PI / 2 * rnd(), t2 = PI / 2 * rnd();
    const K1 = Mx.mul(Mx.mul(V1, [[cx(Math.cos(t1)), cx(0)], [cx(0), cx(Math.cos(t2))]]), W), K2 = Mx.mul(Mx.mul(V2, [[cx(Math.sin(t1)), cx(0)], [cx(0), cx(Math.sin(t2))]]), W);
    const completeRes = Mx.fro(Mx.sub(Mx.add(Mx.mul(Mx.adj(K1), K1), Mx.mul(Mx.adj(K2), K2)), Mx.id(2)));
    const rho = PATH_RHO(V0 == null ? 1 : V0), I2 = Mx.id(2);
    let res = 0, split = 0;
    for (let j = 0; j < NB; j++) {
      const E = Mx.kron(screenE(j), I2);
      let s = [0, 0];
      for (const K of [K1, K2]) { const IK = Mx.kron(I2, K), post = Mx.mul(Mx.mul(IK, rho), Mx.adj(IK)), pr = Mx.tr(Mx.mul(post, E)); s = cadd(s, pr); if (K === K1) split = Math.max(split, Math.abs(pr[0] - 0.5 / NB)); }
      res = Math.max(res, cabs(csub(s, Mx.tr(Mx.mul(rho, E)))));
    }
    return { seed, completeRes, marginalRes: res, branchDeviation: split };
  }

  /* ---------- gram-symmetry ---------- */
  const P13 = [[0, 0, 1], [0, 1, 0], [1, 0, 0]];
  function mathGram(p) {
    const { x, y, phi } = p, ax = Math.sqrt(Math.max(0, 1 - x * x)), ay = Math.sqrt(Math.max(0, 1 - y * y));
    const A = [ax, 0, x], B = [0, 0, 1], C = [ay * Math.cos(phi), ay * Math.sin(phi), y], Vs = [A, B, C];
    const G = Vs.map((u) => Vs.map((w) => v3.dot(u, w))), Gp = mul3(mul3(P13, G), tr3(P13));
    const xx = G[0][1], yy = G[1][2], zz = G[0][2];
    const det = det3(G), detP = det3(Gp), detFormula = 1 - xx * xx - yy * yy - zz * zz + 2 * xx * yy * zz, detParam = (1 - x * x) * (1 - y * y) * Math.sin(phi) ** 2;
    const triple = v3.dot(A, v3.cross(B, C)), tripleSwap = v3.dot(C, v3.cross(B, A));
    const ev = eigSym(G), evp = eigSym(Gp), R = ax * ay;
    const same = Math.max(...[0, 1, 2].flatMap((i) => [0, 1, 2].map((j) => Math.abs(Gp[i][j] - G[i][j]))));
    return {
      x: xx, y: yy, z: zz, phi, A, B, C, G, Gp, det, detP, detFormula, detParam, triple, tripleSwap, triple2: triple * triple,
      detRes: Math.max(Math.abs(det - detFormula), Math.abs(det - detParam), Math.abs(det - triple * triple)), swapDetRes: Math.abs(detP - det),
      eig: ev, eigP: evp, eigRes: Math.max(...ev.map((v, i) => Math.abs(v - evp[i]))), psd: ev[0] >= -TOL, psdP: evp[0] >= -TOL,
      rank: ev.filter((v) => v > 1e-9).length, rankP: evp.filter((v) => v > 1e-9).length, same, equal: same <= TOL,
      window: [x * y - R, x * y + R], gp: { x: Gp[0][1], y: Gp[1][2], z: Gp[0][2] }
    };
  }
  /** Is (x, y, z) the overlap triple of three real unit vectors? If so, the angle φ of C about B that realizes it. */
  function gramCheck(x, y, z) {
    const det = 1 - x * x - y * y - z * z + 2 * x * y * z;
    const minors = [1 - x * x, 1 - y * y, 1 - z * z];
    if (![x, y, z].every((v) => isFinite(v) && Math.abs(v) <= 1 + 1e-12)) return { ok: false, det, minors, reason: 'entry outside [−1, 1]' };
    if (det < -TOL) return { ok: false, det, minors, reason: `det G = ${fix(det, 4)} < 0: not a Gram matrix` };
    const R = Math.sqrt(Math.max(0, (1 - x * x) * (1 - y * y)));
    if (R < 1e-12) return Math.abs(z - x * y) <= 1e-9 ? { ok: true, det, minors, phi: null } : { ok: false, det, minors, reason: 'with |x| = 1 or |y| = 1, z must equal xy' };
    const c = (z - x * y) / R;
    if (c < -1 - 1e-9 || c > 1 + 1e-9) return { ok: false, det, minors, reason: 'z lies outside the window' };
    return { ok: true, det, minors, phi: Math.acos(clamp(c, -1, 1)) };
  }

  /* ---------- paradox-cancel ---------- */
  function fatesTable() {
    const out = [];
    for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) for (let c = 0; c < 2; c++) for (let d = 0; d < 2; d++) {
      const det = a * d - b * c; if (det === 0) continue;
      const coeffs = [c, d - a, b ? -b : 0], disc = (d - a) * (d - a) + 4 * b * c;
      const eq = (t) => coeffs[0] === t[0] && coeffs[1] === t[1] && coeffs[2] === t[2];
      const has = { empty: eq([0, 0, 0]), dead: eq([0, 0, -1]), collapse: (disc === 0 || disc === 4) && !eq([0, 0, 0]) && !eq([0, 0, -1]), live: disc === 5 };
      const fates = Object.keys(has).filter((k) => has[k]);
      out.push({ a, b, c, d, det, coeffs, disc, fates, fate: fates.length === 1 ? fates[0] : null, phiFamily: (a === 1 && b === 1 && c === 1 && d === 0) || (a === 0 && b === 1 && c === 1 && d === 1) });
    }
    return out;
  }
  const FATES = fatesTable();
  const ports = (delta) => { const e = cexp(delta); const Al = cscale(cadd(cx(1), e), 0.5), Ao = cscale(csub(cx(1), e), 0.5); return { Aloop: Al, Aother: Ao, pLoop: cabs2(Al), pOther: cabs2(Ao) }; };
  const COS_ROOT = (() => {
    let lo = 0, hi = 1; const brackets = [[0, 1]];
    for (let i = 0; i < 50; i++) { const mid = (lo + hi) / 2; if (Math.cos(mid) - mid > 0) lo = mid; else hi = mid; brackets.push([lo, hi]); }
    const theta = (lo + hi) / 2;
    return { theta, lo, hi, width: hi - lo, residual: Math.abs(Math.cos(theta) - theta), brackets, f0: Math.cos(0) - 0, f1: Math.cos(1) - 1 };
  })();
  function mathParadox(p) {
    const tau = p.tau, delta = PI * tau, pr = ports(delta);
    const base = cexp(TAU * tau), lift = cexp(PI * tau);
    const psi = [cx(Math.cos(0.6)), cscale(cexp(0.4), Math.sin(0.6))], neg = psi.map((v) => cscale(v, -1));
    const X = [[cx(0), cx(1)], [cx(1), cx(0)]], I2 = Mx.id(2), conjX = (r) => Mx.mul(Mx.mul(X, r), Mx.adj(X));
    const half = Mx.scale(I2, 0.5), plusP = Mx.outer(KP, KP), zeroP = REC[0], minusI = Mx.scale(I2, -1);
    const famRes = Math.max(...[-1, -0.5, 0, 0.5, 1].map((rx) => { const r = Mx.scale(Mx.add(I2, Mx.scale(X, rx)), 0.5); return Mx.fro(Mx.sub(conjX(r), r)); }));
    const lift1 = cexp(PI);
    return {
      tau, delta, ...pr, portSumRes: Math.abs(pr.pLoop + pr.pOther - 1), formulaRes: Math.max(Math.abs(pr.pLoop - Math.cos(delta / 2) ** 2), Math.abs(pr.pOther - Math.sin(delta / 2) ** 2)),
      base, lift, liftSqRes: cabs(csub(cmul(lift, lift), base)), liftNorm: cabs(lift), fullTurnEnd: lift1, fullTurnEndNorm: cabs(lift1), fullTurnEndRes: cabs(csub(lift1, cx(-1))),
      rayRes: Mx.fro(Mx.sub(Mx.outer(neg, neg), Mx.outer(psi, psi))),
      deutschRes: Mx.fro(Mx.sub(conjX(half), half)), plusRes: Mx.fro(Mx.sub(conjX(plusP), plusP)), familyRes: famRes, zeroMoves: Mx.fro(Mx.sub(conjX(zeroP), zeroP)),
      globalPhaseRes: Mx.fro(Mx.sub(Mx.mul(Mx.mul(minusI, zeroP), Mx.adj(minusI)), zeroP)),
      cosRoot: { theta: COS_ROOT.theta, lo: COS_ROOT.lo, hi: COS_ROOT.hi, width: COS_ROOT.width, residual: COS_ROOT.residual, steps: 50, f0: COS_ROOT.f0, f1: COS_ROOT.f1 },
      fates: FATES
    };
  }

  /* ================= state ================= */
  const PHI0 = (() => { const x = 0.2, y = 0.6; return Math.acos((0.1 - x * y) / Math.sqrt((1 - x * x) * (1 - y * y))); })();
  const DEF = {
    th: 90 * DEG, xi: 45 * DEG, Delta: 180 * DEG, gamma: 1,
    thB: 90 * DEG, chiPsi: 60 * DEG, chiPhi: 0,
    k0: TAU / 0.25, n1: 1, n2: 1.5, mesh: 'auto', fan: 'exact', kFrac: 1,
    beta: 90 * DEG, V: 1, eta: 60 * DEG,
    x: 0.2, y: 0.6, phi: PHI0, swap: false,
    tau: 1
  };
  const S = Object.assign({ scene: 'boolean-illusion', swapU: 0, reject: null }, DEF);
  const MATH = {
    'boolean-illusion': () => mathBoolean(S), 'born-handshake': () => mathBorn(S), 'feynman-stationary': () => mathFeynman(S),
    'tsvf-eraser': () => Object.assign(mathTsvf(S), { weak: weak(S.eta) }), 'gram-symmetry': () => mathGram(S), 'paradox-cancel': () => mathParadox(S)
  };
  /** The quantity on the rail of each scene: t ↔ parameter. */
  const SC = {
    'boolean-illusion': { max: 1, rate: 0.2, step: 0.25, toT: () => 1 - S.gamma, fromT: (t) => { S.gamma = clamp(1 - t, 0, 1); }, fmt: (t) => `γ ${fix(1 - t, 2)} <small>${L('/ 捏到 0', '/ pinched at 0')}</small>`, name: ['三种零', 'THREE ZEROS'] },
    'born-handshake': { max: TAU, rate: TAU / 7, step: 15 * DEG, toT: () => S.chiPsi, fromT: (t) => { S.chiPsi = t; }, fmt: (t) => `χ_ψ ${fix(t / DEG, 0)}° <small>/ 360°</small>`, name: ['握手', 'HANDSHAKE'] },
    'feynman-stationary': { max: 1, rate: 1 / 7, step: 1 / 8, toT: () => S.kFrac, fromT: (t) => { S.kFrac = t; }, fmt: (t) => { const M = mathFeynman(S).M; return `k ${Math.round(t * M)} <small>/ ${M}</small>`; }, name: ['路径扇', 'PATH FAN'] },
    'tsvf-eraser': { max: PI / 2, rate: (PI / 2) / 6, step: 15 * DEG, toT: () => S.beta, fromT: (t) => { S.beta = t; }, fmt: (t) => `β ${fix(t / DEG, 0)}° <small>/ 90°</small>`, name: ['擦除', 'ERASER'] },
    'gram-symmetry': { max: TAU, rate: TAU / 9, step: 15 * DEG, toT: () => ((S.phi - PHI0) % TAU + TAU) % TAU, fromT: (t) => { S.phi = (PHI0 + t) % TAU; }, fmt: (t) => `φ ${fix(((PHI0 + t) % TAU) / DEG, 1)}° <small>${L('· 转过', '· turned')} ${fix(t / DEG, 0)}°</small>`, name: ['格拉姆对调', 'GRAM SWAP'] },
    'paradox-cancel': { max: 2, rate: 2 / 8, step: 0.25, toT: () => S.tau, fromT: (t) => { S.tau = t; }, fmt: (t) => `δ ${fix(t * 180, 0)}° <small>· τ ${fix(t, 2)} / 2</small>`, name: ['回路', 'LOOP'], three: false }
  };
  SC['born-handshake'].three = true; SC['gram-symmetry'].three = true;

  /* ================= stage ================= */
  const opts = {
    canvas: $('cv'), radius: 0.3, cx: 0.5, cy: 0.5, yaw: -0.5, pitch: 0.28, rotate: false, wheel: false,
    onChange: () => paint(),
    onPick: (ev) => { current(); const h = hitAt(ev); if (h) { dragging = h; leave(); clock.pause(); h.drag(ev); return true; } dragging = null; return false; },
    // each move goes to the handle as the latest paint laid it out, not to the one pressed in an earlier layout
    onDrag: (ev) => { if (!dragging) return; current(); dragging = hits.find((q) => q.key === dragging.key) || dragging; dragging.drag(ev); },
    onDrop: () => { dragging = null; }
  };
  const stage = kit.stage3($('stage'), opts);
  let hits = [], dragging = null, drawnIn = null;
  const cvBox = () => { const b = $('cv').getBoundingClientRect(); return [b.left, b.top, b.width, b.height]; };
  /** A paint lays the handles out in the canvas box it measured: their hit positions, the plot transforms the 2D drags
      invert and the projection st.pick inverts all belong to that box, and a pointer is read against the live box. If
      the page was laid out again since (the header wraps when the amber pill gains a digit, a resize), draw the frame
      of this layout first. */
  function current() { const b = cvBox(); if (!drawnIn || b.some((v, i) => v !== drawnIn[i])) paint.now(); }
  function hitAt(ev) {
    const b = $('cv').getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top;
    let best = null, bd = Infinity;
    for (const h of hits) { const d = Math.hypot(x - h.x, y - h.y); if (d < (h.r || 22) && d < bd) { best = h; bd = d; } }
    return best;
  }
  const toData = (key, ev) => {
    // A readout can wrap the header during a drag. Refresh the plot and use its matching viewport origin.
    current();
    const g = hits.find((h) => h.key === key).plot;
    return [g.invX(ev.clientX - g.viewport.left), g.invY(ev.clientY - g.viewport.top)];
  };

  /** The free box of the stage: below the title, above the legend. */
  function freeBox() {
    const cv = $('cv'), W = cv.clientWidth, H = cv.clientHeight, cr = cv.getBoundingClientRect();
    if (TRV.thumbMode) return { W, H, x: 16, y: 16, w: W - 32, h: H - 32 };
    const hud = $('hudBig').parentElement.getBoundingClientRect(), lg = $('legend');
    const top = Math.max(34, hud.bottom - cr.top + 8), bottom = lg.offsetHeight ? lg.offsetHeight + 18 : 14;
    return { W, H, x: 12, y: top, w: Math.max(60, W - 24), h: Math.max(60, H - top - bottom) };
  }
  /** n panels in a grid whose smallest panel side is as large as possible. */
  function tiles(box, n, gap) {
    gap = gap == null ? 10 : gap;
    let best = null;
    for (let cols = 1; cols <= n; cols++) {
      const rows = Math.ceil(n / cols), pw = (box.w - gap * (cols - 1)) / cols, ph = (box.h - gap * (rows - 1)) / rows, sc = Math.min(pw, ph);
      if (!best || sc > best.sc + 0.5) best = { cols, rows, pw, ph, sc };
    }
    const out = [], lastRow = Math.floor((n - 1) / best.cols), inLast = n - lastRow * best.cols;
    for (let i = 0; i < n; i++) {
      const r = Math.floor(i / best.cols), c = i % best.cols, pw = r === lastRow && inLast < best.cols ? (box.w - gap * (inLast - 1)) / inLast : best.pw;
      out.push({ x: box.x + c * (pw + gap), y: box.y + r * (best.ph + gap), w: pw, h: best.ph });
    }
    return out;
  }
  const split = (r, f, gap) => { const h1 = Math.round(r.h * f), g = gap == null ? 4 : gap; return [{ x: r.x, y: r.y, w: r.w, h: h1 }, { x: r.x, y: r.y + h1 + g, w: r.w, h: Math.max(0, r.h - h1 - g) }]; };
  const tagS = (key, x, y, html, cls) => stage.tag(key, [x, y], html, cls, { screen: true });
  /** The frame of a panel and its title; returns the inner box. */
  function frame(ctx, r, title, key) {
    ctx.save(); ctx.strokeStyle = P.panelEdge; ctx.globalAlpha = 0.85; ctx.lineWidth = 1; ctx.strokeRect(Math.round(r.x) + 0.5, Math.round(r.y) + 0.5, Math.round(r.w) - 1, Math.round(r.h) - 1); ctx.restore();
    // a title too long for a narrow panel keeps only its first part (the words before “ · ”)
    if (title && !TRV.thumbMode) tagS(key, r.x + r.w / 2, r.y + 11, textWidth(title) > r.w - 10 ? title.split(' · ')[0] : title, 'raw title');
    const t = title && !TRV.thumbMode ? 22 : 6;
    return { x: r.x + 6, y: r.y + t, w: r.w - 12, h: r.h - t - 6 };
  }
  function area(r, xr, yr, equal) {
    const cv = $('cv'), viewport = cv.getBoundingClientRect();
    const g = kit.plot(cv, { x: xr, y: yr, pad: [r.x, stage.W - r.x - r.w, r.y, stage.H - r.y - r.h], equal: !!equal, clear: false });
    return Object.assign(g, { viewport });
  }
  /** The same, leaving room for tick labels on the left and below. */
  const areaAx = (r, xr, yr, equal, l, b) => area({ x: r.x + (l == null ? 34 : l), y: r.y + 4, w: r.w - (l == null ? 34 : l) - 6, h: r.h - 4 - (b == null ? 18 : b) }, xr, yr, equal);
  function withClip(ctx, r, fn) { ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip(); try { fn(); } finally { ctx.restore(); } }
  function arrow(g, x0, y0, x1, y1, color, o) {
    o = o || {};
    const ctx = g.ctx, X0 = g.X(x0), Y0 = g.Y(y0), X1 = g.X(x1), Y1 = g.Y(y1), dx = X1 - X0, dy = Y1 - Y0, len = Math.hypot(dx, dy);
    if (len < 0.5) return;
    ctx.save(); ctx.strokeStyle = ctx.fillStyle = color; ctx.lineWidth = (o.width || 2) * LW; ctx.globalAlpha = o.alpha == null ? 1 : o.alpha; ctx.setLineDash(o.dash || []); ctx.lineCap = 'round';
    if (o.glow) { ctx.shadowColor = color; ctx.shadowBlur = o.glow; }
    ctx.beginPath(); ctx.moveTo(X0, Y0); ctx.lineTo(X1, Y1); ctx.stroke(); ctx.setLineDash([]);
    if (len > 6 && o.head !== false) {
      const h = Math.min((o.head || 9) * LW, len * 0.5), ux = dx / len, uy = dy / len;
      ctx.beginPath(); ctx.moveTo(X1, Y1); ctx.lineTo(X1 - ux * h - uy * h * 0.42, Y1 - uy * h + ux * h * 0.42); ctx.lineTo(X1 - ux * h + uy * h * 0.42, Y1 - uy * h - ux * h * 0.42); ctx.closePath(); ctx.fill();
    }
    ctx.restore();
  }
  /** A stacked bar over the unit length in screen pixels: segments [{ v, color, alpha, hollow }], frame at 1. */
  function sbar(ctx, x, y, w, h, segs) {
    let acc = 0;
    ctx.save();
    for (const s of segs) {
      const v = Math.max(0, s.v), x0 = x + w * Math.min(1, acc), x1 = x + w * Math.min(1, acc + v);
      if (x1 - x0 > 0.3) {
        ctx.globalAlpha = s.alpha == null ? 0.85 : s.alpha;
        if (s.hollow) { ctx.strokeStyle = s.color; ctx.lineWidth = 1; ctx.setLineDash([3, 3]); ctx.strokeRect(x0 + 0.5, y + 0.5, x1 - x0 - 1, h - 1); ctx.setLineDash([]); }
        else { ctx.fillStyle = s.color; ctx.fillRect(x0, y, x1 - x0, h); }
      }
      acc += v;
    }
    ctx.globalAlpha = 0.9; ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1; ctx.strokeRect(Math.round(x) + 0.5, Math.round(y) + 0.5, Math.round(w) - 1, Math.round(h) - 1);
    ctx.restore();
  }
  const span = (cls, html) => `<span class="${cls}">${html}</span>`;
  /** Rough width in px of a label at 11 px (CJK wider than Latin): enough to decide whether it fits. */
  const textWidth = (html, k) => { let w = 0; for (const ch of html.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '·')) w += /[\u3000-\u9fff\uff00-\uffef]/.test(ch) ? 11.5 : 6.8; return w * (k || 1); };
  /** A footer (one line, or the parts stacked when it does not fit) and under it an optional stacked bar; returns the y below. */
  function footBar(key, r, y, parts, segs, sep) {
    const one = parts.join(sep == null ? ' + ' : sep), fits = textWidth(one) <= r.w - 6, lines = fits ? 1 : parts.length;
    if (y + lines * 15 + (segs ? 13 : 0) > r.y + r.h + 2) return y;
    tagS(key, r.x + r.w / 2, y + lines * 7.5, fits ? one : parts.join('<br>'), 'foot');
    let yy = y + lines * 15 + 3;
    if (segs) { sbar(stage.ctx, r.x + 4, yy, r.w - 8, 10, segs); yy += 16; }
    return yy;
  }
  /** A label centred at (x, y) but kept inside the box r. */
  const tagIn = (key, r, x, y, html, cls) => { const hw = textWidth(html, 0.95) / 2 + 4; tagS(key, clamp(x, r.x + hw, r.x + r.w - hw), y, html, cls); };
  const circlePts = (cx0, cy0, r, a0, a1, n) => { const out = []; n = n || 72; for (let i = 0; i <= n; i++) { const t = a0 + (a1 - a0) * i / n; out.push([cx0 + r * Math.cos(t), cy0 + r * Math.sin(t)]); } return out; };

  /* ---------- scene: boolean-illusion ---------- */
  function drawBoolean(m, box, ctx) {
    const R = tiles(box, 3), thumb = TRV.thumbMode;
    // (a) orthogonal: the shadow on the line of A and the complement
    const ia = frame(ctx, R[0], L('(a) 正交 · 藏起', '(a) Orthogonal · hidden'), 'bo-ta');
    const [aT, aB] = split(ia, thumb ? 1 : 0.7);
    const ga = area(aT, [-1.2, 1.25], [-0.32, 1.22], true), c = m.B[0], s = m.B[1];
    withClip(ctx, aT, () => {
      ga.line(circlePts(0, 0, 1, 0, PI, 60), P.dim, { width: 1, alpha: 0.4, dash: [3, 4] });
      ga.line([[-1.2, 0], [1.25, 0]], P.cyan, { width: 1, alpha: 0.4 });
      ga.poly([[0, 0], [1, 0], [1 + c, s], [c, s]], P.magenta, { alpha: 0.13, stroke: P.magenta, strokeAlpha: 0.35 });
      if (Math.abs(c) > 2e-3) ga.line([[0, 0], [c, 0]], P.cyan, { width: 6 * LW, alpha: 0.9 });
      if (Math.abs(s) > 2e-3) ga.line([[c, 0], [c, s]], P.magenta, { width: 3 * LW, dash: [5, 4] });
      arrow(ga, 0, 0, 1, 0, P.cyan, { width: 2.2 });
      arrow(ga, 0, 0, c, s, P.sigma, { width: 2.2 });
      ga.dot(c, s, P.sigma, 7 * LW, { ring: true, width: 1.6 });
    });
    hits.push({ key: 'B', plot: ga, x: ga.X(c), y: ga.Y(s), r: 24, drag: (ev) => { const q = toData('B', ev); S.th = clamp(Math.atan2(Math.max(0, q[1]), q[0]), 0, PI); paint(); } });
    if (!thumb) {
      tagS('bo-A', ga.X(1), ga.Y(0) + 13, 'A', 'raw c-cy');
      tagS('bo-B', ga.X(c * 1.13) + (c >= 0 ? 10 : -10), ga.Y(s * 1.13), 'B', 'raw ink');
      if (Math.abs(s) > 0.15) tagS('bo-perp', ga.X(c) + (c >= 0 ? -16 : 16), ga.Y(s * 0.5), 'B⊥', 'raw c-mg small');
      if (Math.abs(c) > 0.2) tagS('bo-par', ga.X(c / 2), ga.Y(0) + 13, 'B∥', 'raw c-cy small');
      const y1 = footBar('bo-a1', aB, aB.y + 2, [span('c-cy', `‖B∥‖² ${nf(m.par2)}`), span('c-mg', `‖B⊥‖² ${nf(m.perp2)}`)], [{ v: m.par2, color: P.cyan }, { v: m.perp2, color: P.magenta }]);
      footBar('bo-a2', aB, y1 + 2, [`A·B ${nf(m.dot)}`, `‖A+B‖² ${nf(m.sumAB2)}`], null, ' · ');
    }
    // (b) opposite phase: the + port (sum, cyan) and the − port (difference, magenta)
    const ib = frame(ctx, R[1], L('(b) 反相 · 抵消', '(b) Opposite phase · cancelled'), 'bo-tb');
    const [bT, bB] = split(ib, thumb ? 1 : 0.7);
    const gb = area(bT, [-1.1, 1.55], [-1.1, 1.1], true), a = m.a, b = m.b, e = cexp(m.Delta);
    const tp = [a + b * e[0], b * e[1]], tm = [a - b * e[0], -b * e[1]];
    withClip(ctx, bT, () => {
      gb.line([[-1.1, 0], [1.55, 0]], P.lineHot, { width: 1, alpha: 0.6 });
      gb.line(circlePts(a, 0, b, 0, TAU, 72), P.violet, { width: 1, alpha: 0.3, dash: [3, 4] });
      arrow(gb, 0, 0, a, 0, P.sigma, { width: 2 });
      arrow(gb, a, 0, tm[0], tm[1], P.violet, { width: 1.6, dash: [4, 3], alpha: 0.6 });
      arrow(gb, a, 0, tp[0], tp[1], P.violet, { width: 2.2 });
      if (Math.hypot(tm[0], tm[1]) > 0.02) arrow(gb, 0, 0, tm[0], tm[1], P.magenta, { width: 3.2 });
      if (Math.hypot(tp[0], tp[1]) > 0.02) arrow(gb, 0, 0, tp[0], tp[1], P.cyan, { width: 3.2 });
      else gb.dot(0, 0, P.cyan, 7 * LW, { ring: true, width: 2 });
      gb.dot(tp[0], tp[1], P.violet, 6 * LW, { ring: true, width: 1.8 });
    });
    hits.push({ key: 'phase', plot: gb, x: gb.X(tp[0]), y: gb.Y(tp[1]), r: 24, drag: (ev) => { const q = toData('phase', ev); S.Delta = ((Math.atan2(q[1], q[0] - m.a) % TAU) + TAU) % TAU; paint(); } });
    if (!thumb) {
      tagS('bo-a', gb.X(a / 2), gb.Y(0) + 14, 'a', 'raw ink');
      const mid = [(a + tp[0]) / 2, tp[1] / 2], nx = -tp[1], ny = tp[0] - a, nl = Math.hypot(nx, ny) || 1;
      const flatArm = Math.abs(tp[1]) < 0.12;
      if (flatArm) tagS('bo-be', gb.X(mid[0]), gb.Y(0) - 15, 'b e^{iΔ}', 'raw c-vi small');
      else tagS('bo-be', gb.X(mid[0]) + 18 * nx / nl, gb.Y(mid[1]) - 18 * ny / nl, 'b e^{iΔ}', 'raw c-vi small');
      if (Math.hypot(tp[0], tp[1]) <= 0.02) tagS('bo-zero', gb.X(0) - 30, gb.Y(0) + 16, L('+ 端口 0', '+ port 0'), 'raw c-cy small');
      else if (bT.w > 220) tagS('bo-zero', gb.X(tp[0] / 2) - 12, gb.Y(tp[1] / 2) - 10, '+', 'raw c-cy');
      if (bT.w > 220) tagS('bo-minus', gb.X(tm[0] * 0.82), gb.Y(tm[1] * 0.82) + (flatArm ? -14 : 14), '−', 'raw c-mg');
      const y1 = footBar('bo-b1', bB, bB.y + 2, [span('c-cy', `p₊ ${nf(m.pPlus, 3)}`), span('c-mg', `p₋ ${nf(m.pMinus, 3)}`)], [{ v: m.pPlus, color: P.cyan }, { v: m.pMinus, color: P.magenta }]);
      footBar('bo-b2', bB, y1 + 2, [`|a + b e^{iΔ}|²`, `2p₊ = ${nf(m.Iraw, 3)}`], null, ' = ');
    }
    // (c) decoherence: ρ_γ with its coherence (magenta) and populations (cyan)
    const ic = frame(ctx, R[2], L('(c) 退相干 · 捏掉', '(c) Decoherence · pinched'), 'bo-tc');
    const [cT, cB] = split(ic, thumb ? 1 : 0.62);
    const side = Math.max(20, Math.min(cT.w - 10, cT.h - 30)), mx = cT.x + (cT.w - side) / 2, my = cT.y + 4, cell = (side - 6) / 2;
    const r = m.rho, cells = [[0, 0, r[0][0]], [0, 1, r[0][1]], [1, 0, r[1][0]], [1, 1, r[1][1]]];
    ctx.save();
    for (const [i, j, v] of cells) {
      const x0 = mx + j * (cell + 6), y0 = my + i * (cell + 6), mag = cabs(v), diag = i === j;
      ctx.globalAlpha = 0.1 + 0.62 * Math.min(1, diag ? mag : mag / 0.5); ctx.fillStyle = diag ? P.cyan : P.magenta; ctx.fillRect(x0, y0, cell, cell);
      ctx.globalAlpha = 0.8; ctx.strokeStyle = diag ? P.cyan : P.magenta; ctx.lineWidth = 1; ctx.strokeRect(x0 + 0.5, y0 + 0.5, cell - 1, cell - 1);
      if (!diag && mag > 1e-3) {
        const L0 = (cell / 2 - 8) * Math.min(1, mag / 0.5), ang = carg(v), cxp = x0 + cell / 2, cyp = y0 + cell / 2;
        ctx.globalAlpha = 1; ctx.strokeStyle = ctx.fillStyle = P.ink; ctx.lineWidth = 1.6 * LW; ctx.beginPath(); ctx.moveTo(cxp, cyp); ctx.lineTo(cxp + L0 * Math.cos(ang), cyp - L0 * Math.sin(ang)); ctx.stroke();
        ctx.beginPath(); ctx.arc(cxp + L0 * Math.cos(ang), cyp - L0 * Math.sin(ang), 2.5 * LW, 0, TAU); ctx.fill();
      }
    }
    // the amber gauge: how much coherence the rail has left
    const gy = my + side + 14, gx0 = mx, gx1 = mx + side;
    ctx.globalAlpha = 0.8; ctx.strokeStyle = P.lineHot; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(gx0, gy); ctx.lineTo(gx1, gy); ctx.stroke();
    ctx.globalAlpha = 1; ctx.fillStyle = P.amber; ctx.shadowColor = P.amber; ctx.shadowBlur = 10; ctx.beginPath(); ctx.arc(gx0 + side * m.gamma, gy, 5 * LW, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
    ctx.restore();
    if (!thumb) {
      const lbl = [[0, 0, `a² ${nf(r[0][0][0])}`, 'c-cy'], [0, 1, `|ρ₀₁| ${nf(cabs(r[0][1]))}`, 'c-mg'], [1, 0, `|ρ₁₀| ${nf(cabs(r[1][0]))}`, 'c-mg'], [1, 1, `b² ${nf(r[1][1][0])}`, 'c-cy']];
      if (cell > 54) for (const [i, j, t, cl] of lbl) tagS(`bo-c${i}${j}`, mx + j * (cell + 6) + cell / 2, my + i * (cell + 6) + cell - 10, t, `raw small ${cl}`);
      tagS('bo-g', gx0 + side * m.gamma, gy + 13, `γ ${nf(m.gamma)}`, 'raw small c-am');
      const y1 = footBar('bo-c1', cB, cB.y + 4, [span('c-cy', `p₊ ${nf(m.qPlus, 3)}`), span('c-mg', `p₋ ${nf(m.qMinus, 3)}`)], [{ v: m.qPlus, color: P.cyan }, { v: m.qMinus, color: P.magenta }]);
      footBar('bo-c2', cB, y1 + 2, [`Tr ρ² ${nf(m.purity)}`, `${span('c-cy', nf(m.hsKept))} + ${span('c-mg', nf(m.hsOff))}`], [{ v: m.hsKept, color: P.cyan }, { v: m.hsOff, color: P.magenta }, { v: m.cohLost, color: P.magenta, hollow: true }], ' = ');
    }
  }

  /* ---------- scene: born-handshake ---------- */
  function layBorn(box) {
    const R = tiles(box, 2), r0 = R[0];
    return { R, sphere: { cx: r0.x + r0.w / 2, cy: r0.y + r0.h / 2 + 10, r: Math.max(30, Math.min(r0.w, r0.h - 36) * 0.38) } };
  }
  function drawBorn(m, box, ctx, lay) {
    const st = stage, [R0, R1] = lay.R, thumb = TRV.thumbMode;
    frame(ctx, R0, L('射线 · 球面上不动', 'Rays · still on the sphere'), 'bh-t0');
    st.sphere(1, { lat: [0], lon: 2 });
    st.line([0, 0, -1.3], [0, 0, 1.3], { color: P.faint, width: 0.8 });
    const z = m.blochPhi;
    st.line([0, 0, -1], [0, 0, z[2]], { color: P.cyan, width: 5, fade: false });
    st.line(z, [0, 0, z[2]], { color: P.dim, width: 1, dash: [3, 3], fade: false });
    if (m.th > 0.02) st.arc([0, 0, 1], v3.unit(z), { color: P.violet, width: 1.6, alpha: 0.9, fade: false }, 0.42);
    st.arrow([0, 0, 0], [0, 0, 1], { color: P.sigma, width: 2.4, fade: false });
    st.arrow([0, 0, 0], z, { color: P.sigma, width: 2.4, fade: false });
    st.dot(z, 6, P.sigma, { ring: true, width: 1.8, fade: false });
    const qz = st.p(z);
    hits.push({ key: 'phi', x: qz[0], y: qz[1], r: 24, drag: (ev) => { const q = st.pick(ev); S.thB = Math.acos(clamp(q[2], -1, 1)); paint(); } });
    if (!thumb) {
      st.tag('bh-psi', [0, 0, 1.2], '|ψ⟩', 'raw ink', { fade: false });
      st.tag('bh-phi', v3.scale(z, 1.22), '|φ⟩', 'raw ink', { fade: false, dx: 6 });
      if (m.th > 0.25) st.tag('bh-th', v3.scale(v3.unit(v3.add(v3.unit(z), [0, 0, 1])), 0.6), 'θ', 'raw c-vi', { fade: false });
      st.tag('bh-w', [0, 0, (z[2] - 1) / 2], `2w`, 'raw c-cy small', { fade: false, dx: -18 });
    }
    // the compass: forward (cyan) and echo (violet) and their product on the real axis
    const ic = frame(ctx, R1, L('相位罗盘 · 去程与回程', 'Phase compass · forward and echo'), 'bh-t1');
    const [cT, cB] = split(ic, thumb ? 1 : 0.86);
    const g = area(cT, [-1.3, 1.3], [-1.3, 1.3], true);
    g.line(circlePts(0, 0, 1, 0, TAU, 96), P.lineHot, { width: 1, alpha: 0.7 });
    if (m.r > 0.01) g.line(circlePts(0, 0, m.r, 0, TAU, 96), P.dim, { width: 1, alpha: 0.6, dash: [3, 4] });
    g.line([[-1.3, 0], [1.3, 0]], P.lineHot, { width: 1, alpha: 0.9 });
    g.line([[0, -1.3], [0, 1.3]], P.faint, { width: 1, alpha: 0.6 });
    if (m.w > 1e-3) g.line([[0, 0], [m.w, 0]], P.sigma, { width: 6 * LW, alpha: 0.85 });
    g.dot(m.w, 0, P.sigma, 6.5 * LW, { ring: true, width: 2 });
    arrow(g, 0, 0, m.echo[0], m.echo[1], P.violet, { width: 2.6 });
    arrow(g, 0, 0, m.fwd[0], m.fwd[1], P.cyan, { width: 2.6 });
    const gc = cexp(m.chiPsi);
    g.line([[1.06 * gc[0], 1.06 * gc[1]], [1.22 * gc[0], 1.22 * gc[1]]], P.amber, { width: 2 * LW });
    g.dot(1.14 * gc[0], 1.14 * gc[1], P.amber, 5 * LW, { glow: 10 });
    hits.push({ key: 'fwd', plot: g, x: g.X(m.fwd[0]), y: g.Y(m.fwd[1]), r: 24, drag: (ev) => { const q = toData('fwd', ev); setRail(((Math.atan2(q[1], q[0]) + S.chiPhi) % TAU + TAU) % TAU); } });
    if (!thumb) {
      if (m.r > 0.18) {
        tagS('bh-f', g.X(m.fwd[0] * 1.18), g.Y(m.fwd[1] * 1.18) - 10, '⟨φ|ψ⟩', 'raw c-cy');
        tagS('bh-e', g.X(m.echo[0] * 1.18), g.Y(m.echo[1] * 1.18) + 12, '⟨ψ|φ⟩', 'raw c-vi');
      }
      tagS('bh-wl', g.X(m.w / 2), g.Y(0) - 14, m.w > 0.05 ? `w ${nf(m.w, 3)}` : L('w = 0：正交', 'w = 0: orthogonal'), 'raw small ink');
      tagS('bh-chi', g.X(1.14 * gc[0]) + (gc[0] >= 0 ? 22 : -22), g.Y(1.14 * gc[1]), 'χ_ψ', 'raw small c-am');
      footBar('bh-foot', cB, cB.y + 2, ['⟨φ|ψ⟩⟨ψ|φ⟩', `${nf(m.prod[0], 4)} ${m.prod[1] < 0 ? '−' : '+'} ${sci(Math.abs(m.prod[1]))} i`], null, ' = ');
    }
  }

  /* ---------- scene: feynman-stationary ---------- */
  function drawFeynman(m, box, ctx) {
    const R = tiles(box, 2), thumb = TRV.thumbMode;
    const ig = frame(ctx, R[0], L('路径 · A 经界面到 B', 'Paths · A through the interface to B'), 'fy-t0');
    const g = area(ig, [-2.25, 3.25], [-1.42, 1.38], true);
    const A = [0, 1], B = [1, -1], M = m.M, every = Math.max(1, Math.ceil(M / (thumb ? 40 : 64)));
    withClip(ctx, ig, () => {
      g.rect(-3, -2, 4, 0, P.lineHot, { alpha: 0.13 });
      g.line([[-3, 0], [4, 0]], P.lineHot, { width: 1.2 });
      if (m.fan !== 'roots') {
        for (let i = 0; i < M; i += every) {
          const added = i < m.k, inb = m.band[i];
          g.line([A, [m.s[i], 0], B], inb ? P.cyan : P.magenta, { width: 1, alpha: added ? (inb ? 0.6 : 0.24) : 0.06 });
        }
        g.line([A, [m.sStar, 0], B], P.cyan, { width: 2.4 * LW, alpha: 0.95 });
        g.line([[m.sStar, -0.75], [m.sStar, 0.75]], P.dim, { width: 1, dash: [3, 3], alpha: 0.8 });
        if (m.k > 0) g.line([A, [m.sCur, 0], B], P.amber, { width: 1.8 * LW, alpha: 0.95 });
      }
      g.dot(A[0], A[1], P.sigma, 4.5 * LW); g.dot(B[0], B[1], P.sigma, 4.5 * LW);
      g.dot(m.sCur, 0, P.amber, 5.5 * LW, { glow: 10 });
    });
    hits.push({ key: 'cross', plot: g, x: g.X(m.sCur), y: g.Y(0), r: 24, drag: (ev) => { const q = toData('cross', ev), i = clamp(Math.round((q[0] + 2) / 5 * m.M - 0.5), 0, m.M - 1); setRail((i + 1) / m.M); } });
    if (!thumb) {
      tagS('fy-A', g.X(A[0]) - 22, g.Y(A[1]) - 10, 'A (t₁)', 'raw ink small');
      tagS('fy-B', g.X(B[0]) + 24, g.Y(B[1]) + 10, 'B (t₂)', 'raw ink small');
      tagS('fy-n1', g.X(2.55), g.Y(0.42), `n₁ ${fix(m.n1, 2)}`, 'raw small c-dim');
      tagS('fy-n2', g.X(2.55), g.Y(-0.42), `n₂ ${fix(m.n2, 2)}`, 'raw small c-dim');
      if (m.fan !== 'roots') tagS('fy-s', g.X(m.sStar), g.Y(-0.88), `s* ${fix(m.sStar, 3)}`, 'raw small c-cy');
    }
    // the phasor chain, head to tail, in the order of s
    const ic = frame(ctx, R[1], m.fan === 'roots' ? L('相量链 · 单位根校准', 'Phasor chain · roots of unity') : m.fan === 'quadratic' ? L('相量链 · 二次近似', 'Phasor chain · quadratic approximation') : L('相量链 · 首尾相接', 'Phasor chain · head to tail'), 'fy-t1');
    const [cT, cB] = split(ic, thumb ? 1 : 0.86);
    let x0 = 0, x1 = 0, y0 = 0, y1 = 0;
    for (let i = 0; i <= M; i++) { const zx = m.Z[2 * i], zy = m.Z[2 * i + 1]; if (zx < x0) x0 = zx; if (zx > x1) x1 = zx; if (zy < y0) y0 = zy; if (zy > y1) y1 = zy; }
    const pad = Math.max(0.08, 0.08 * Math.max(x1 - x0, y1 - y0));
    const gc = area(cT, [x0 - pad, x1 + pad], [y0 - pad, y1 + pad], true);
    withClip(ctx, cT, () => {
      const ctx2 = gc.ctx; ctx2.save(); ctx2.lineCap = 'round'; ctx2.lineJoin = 'round';
      // the part still to come, faint; then the part added so far, coloured by the stationary band
      ctx2.globalAlpha = 0.12; ctx2.strokeStyle = P.dim; ctx2.lineWidth = 1; ctx2.beginPath(); ctx2.moveTo(gc.X(m.Z[2 * m.k]), gc.Y(m.Z[2 * m.k + 1]));
      for (let i = m.k + 1; i <= M; i++) ctx2.lineTo(gc.X(m.Z[2 * i]), gc.Y(m.Z[2 * i + 1]));
      ctx2.stroke();
      ctx2.globalAlpha = 0.95; ctx2.lineWidth = 1.6 * LW;
      let cur = -1;
      for (let i = 0; i < m.k; i++) {
        const col = m.fan === 'roots' ? 1 : m.band[i];
        if (col !== cur) { if (cur !== -1) ctx2.stroke(); ctx2.strokeStyle = col ? P.cyan : P.magenta; ctx2.beginPath(); ctx2.moveTo(gc.X(m.Z[2 * i]), gc.Y(m.Z[2 * i + 1])); cur = col; }
        ctx2.lineTo(gc.X(m.Z[2 * i + 2]), gc.Y(m.Z[2 * i + 3]));
      }
      if (cur !== -1) ctx2.stroke();
      ctx2.restore();
      arrow(gc, 0, 0, m.partial[0], m.partial[1], P.sigma, { width: 1.8, dash: m.k < M ? [5, 4] : [], alpha: 0.9 });
      gc.dot(0, 0, P.sigma, 3.5 * LW);
      gc.dot(m.partial[0], m.partial[1], P.amber, 5.5 * LW, { glow: 10 });
    });
    if (!thumb) {
      const done = m.k >= M, A2 = cabs2(m.partial);
      tagS('fy-end', gc.X(m.partial[0]) + 16, gc.Y(m.partial[1]) - 14, done ? 'A_M' : `k ${m.k}`, 'raw small c-am');
      const foot = m.fan === 'roots' ? [`|Σ e^{2πik/M}| = ${sci(m.rootsRes)}`, `|Ω + (−Ω)| = ${sci(m.pairRes)}`]
        : [`|A|² ${fix(A2, 3)}`, `C ${fix(A2 / M, 4)}`, `M ${M}${m.under ? L(' · 分辨不足', ' · under-resolved') : ''}`];
      footBar('fy-foot', cB, cB.y + 2, foot, null, ' · ');
    }
  }

  /* ---------- scene: tsvf-eraser ---------- */
  function layTsvf(box) {
    const g = 10;
    if (box.w >= 1.15 * box.h) {
      const lw = Math.round(box.w * 0.6), rw = box.w - lw - g, hh = (box.h - g) / 2;
      return { H: { x: box.x, y: box.y, w: lw, h: box.h }, D: { x: box.x + lw + g, y: box.y, w: rw, h: hh }, W: { x: box.x + lw + g, y: box.y + hh + g, w: rw, h: hh } };
    }
    const th = Math.round(box.h * 0.5), bw = (box.w - g) / 2, bh = box.h - th - g;
    return { H: { x: box.x, y: box.y, w: box.w, h: th }, D: { x: box.x, y: box.y + th + g, w: bw, h: bh }, W: { x: box.x + bw + g, y: box.y + th + g, w: bw, h: bh } };
  }
  const wrapPhi = (ph) => (ph > PI ? ph - TAU : ph);
  function drawTsvf(m, box, ctx) {
    const lay = layTsvf(box), thumb = TRV.thumbMode, q = m.q, w = TAU / NB;
    // the screen: joint p(j, +) (cyan) stacked under p(j, −) (magenta); their sum is the past total qⱼ
    const ih = frame(ctx, lay.H, L('屏幕 · 128 格的联合分布', 'Screen · joint distribution on 128 bins'), 'ts-t0');
    const [hT, hB] = split(ih, thumb ? 1 : 0.88);
    const g = areaAx(hT, [-PI, PI], [0, q * 1.32], false, 38, 18);
    g.axes({ xTicks: [[-PI, '−π'], [-PI / 2, '−π/2'], [0, '0'], [PI / 2, 'π/2'], [PI, 'π']], yTicks: [[0, '0'], [q / 2, '1/256'], [q, '1/128']] });
    for (let j = 0; j < NB; j++) {
      const xc = wrapPhi(m.phi[j]);
      g.rect(xc - w * 0.45, 0, xc + w * 0.45, m.jp[j], P.cyan, { alpha: 0.78 });
      g.rect(xc - w * 0.45, m.jp[j], xc + w * 0.45, m.jp[j] + m.jm[j], P.magenta, { alpha: 0.6 });
    }
    const tot = []; for (let j = 0; j < NB; j++) tot.push([wrapPhi(m.phi[j]), m.tot[j]]); tot.sort((u, v) => u[0] - v[0]);
    g.line(tot, P.sigma, { width: 2.2 * LW });
    if (!thumb) {
      tagS('ts-tot', g.X(PI * 0.62), g.Y(q) - 12, L('过去的总数 p(j) = qⱼ', 'past total p(j) = qⱼ'), 'raw small ink');
      tagS('ts-p', g.X(-PI * 0.78), g.Y(q * 0.22), 'p(j, +)', 'raw small c-cy');
      tagS('ts-m', g.X(-PI * 0.2), g.Y(q * 0.86), 'p(j, −)', 'raw small c-mg');
      footBar('ts-foot', hB, hB.y + 2, [`max |p₊ + p₋ − q| = ${fix(m.maxRes, 4)}`, `${L('原始', 'raw')} ${sci(m.maxRes)}`], null, ' · ');
    }
    // the future basis: the marker axis turns from Z (which-path) to X (eraser)
    const id = frame(ctx, lay.D, L('未来的标记基', 'Future marker basis'), 'ts-t1');
    const gd = area(id, [-1.45, 1.45], [-1.3, 1.3], true), b = m.beta;
    gd.line(circlePts(0, 0, 1, 0, TAU, 96), P.lineHot, { width: 1 });
    gd.line([[0, -1.15], [0, 1.15]], P.faint, { width: 1 }); gd.line([[-1.15, 0], [1.15, 0]], P.faint, { width: 1 });
    gd.line(circlePts(0, 0, 0.42, PI / 2, PI / 2 - b, 30), P.amber, { width: 1.4 * LW, alpha: 0.9 });
    gd.line([[-Math.sin(b), -Math.cos(b)], [Math.sin(b), Math.cos(b)]], P.amber, { width: 2 * LW });
    gd.dot(Math.sin(b), Math.cos(b), P.cyan, 6 * LW); gd.dot(-Math.sin(b), -Math.cos(b), P.magenta, 6 * LW);
    hits.push({ key: 'beta', plot: gd, x: gd.X(Math.sin(b)), y: gd.Y(Math.cos(b)), r: 24, drag: (ev) => { const qq = toData('beta', ev); setRail(clamp(Math.atan2(qq[0], qq[1]), 0, PI / 2)); } });
    if (!thumb && id.h > 80) {
      tagIn('ts-z', id, gd.X(-0.8), gd.Y(1.0), L('|0⟩ 测路径', '|0⟩ which-path'), 'raw small c-dim');
      tagS('ts-x', gd.X(1.17) - 8, gd.Y(0) + 14, L('|+⟩ 擦除', '|+⟩ eraser'), 'raw small c-dim');
      tagS('ts-b', gd.X(0.5 * Math.sin(b / 2 + 0.05)) + 8, gd.Y(0.5 * Math.cos(b / 2 + 0.05)) - 8, `β ${fix(b / DEG, 0)}°`, 'raw small c-am');
    }
    // the weak value Z_w = tan η and the postselection probability cos²η
    const wv = weak(S.eta), iw = frame(ctx, lay.W, L('弱值 · 后选', 'Weak value · postselection'), 'ts-t2');
    const [wT, wB] = split(iw, 0.62, 6);
    const gw = area(wT, [-PI / 2, PI / 2], [-4, 4], false), gp = area(wB, [-PI / 2, PI / 2], [0, 1.05], false);
    gw.hline(0, P.faint);
    const tanPts = []; for (let i = 0; i <= 160; i++) { const e = -PI / 2 + PI * i / 160, d = Math.cos(e); tanPts.push(Math.abs(d) < UNDEF ? null : [e, clamp(Math.tan(e), -4.6, 4.6)]); }
    withClip(ctx, wT, () => {
      gw.line(tanPts, P.violet, { width: 1.8 * LW });
      gw.vline(-PI / 2 + 0.002, P.dim, { dash: [3, 3] }); gw.vline(PI / 2 - 0.002, P.dim, { dash: [3, 3] });
      if (wv.defined && Math.abs(wv.Zw[0]) <= 4) gw.dot(S.eta, wv.Zw[0], P.ink, 5 * LW);
      else if (!wv.defined) gw.dot(S.eta, 0, P.ink, 6 * LW, { ring: true, width: 1.8 });
    });
    const cosPts = []; for (let i = 0; i <= 120; i++) { const e = -PI / 2 + PI * i / 120; cosPts.push([e, Math.cos(e) ** 2]); }
    gp.area(cosPts, P.cyan, { alpha: 0.16 }); gp.line(cosPts, P.cyan, { width: 1.4 * LW });
    gp.dot(S.eta, wv.pPost, P.ink, 4.5 * LW);
    hits.push({ key: 'eta', plot: gw, x: gw.X(S.eta), y: gw.Y(wv.defined ? clamp(wv.Zw[0], -4, 4) : 0), r: 24, drag: (ev) => { const qq = toData('eta', ev); S.eta = clamp(Math.round(qq[0] / DEG) * DEG, -PI / 2, PI / 2); paint(); } });
    if (!thumb && iw.h > 80) {
      const txt = wv.defined ? `Z_w = tan η = ${nf(wv.Zw[0], 3)}` : L('Z_w 无定义（p_post = 0）', 'Z_w undefined (p_post = 0)');
      tagS('ts-w', wT.x + wT.w / 2, wT.y + 9, txt, 'raw small c-vi');
      tagS('ts-pp', wB.x + wB.w / 2, wB.y + 8, `p_post = cos²η = ${nf(wv.pPost, 4)}`, 'raw small c-cy');
    }
  }

  /* ---------- scene: gram-symmetry ---------- */
  function layGram(box) {
    const g = 10;
    let D, Mt, Sl;
    if (box.w >= 1.15 * box.h) {
      const lw = Math.round(box.w * 0.42), rw = box.w - lw - g, hh = (box.h - g) / 2;
      D = { x: box.x, y: box.y, w: lw, h: box.h }; Mt = { x: box.x + lw + g, y: box.y, w: rw, h: hh }; Sl = { x: box.x + lw + g, y: box.y + hh + g, w: rw, h: hh };
    } else {
      const th = Math.round(box.h * 0.5), bw = (box.w - g) / 2, bh = box.h - th - g;
      D = { x: box.x, y: box.y, w: box.w, h: th }; Mt = { x: box.x, y: box.y + th + g, w: bw, h: bh }; Sl = { x: box.x + bw + g, y: box.y + th + g, w: bw, h: bh };
    }
    return { D, Mt, Sl, sphere: { cx: D.x + D.w / 2, cy: D.y + D.h / 2 + 12, r: Math.max(30, Math.min(D.w, D.h - 40) * 0.42) } };
  }
  function drawGram(m, box, ctx, lay) {
    const st = stage, thumb = TRV.thumbMode, u = TRV.smooth(S.swapU);
    frame(ctx, lay.D, L('三个事件 · 单位向量', 'Three events · unit vectors'), 'gr-t0');
    st.sphere(1, { lat: [0], lon: 2, alpha: 0.35 });
    const ay = Math.sqrt(Math.max(0, 1 - S.y * S.y));
    if (ay > 1e-3) st.circle([0, 0, S.y], [0, 0, 1], ay, { color: P.dim, width: 1, dash: [3, 4], alpha: 0.8 });
    const O = [0, 0, 0], A = m.A, B = m.B, C = m.C;
    for (const f of [[O, A, B], [O, B, C], [O, A, C], [A, B, C]]) st.poly(f, { fill: P.violet, alpha: thumb ? 0.14 : 0.08 });
    for (const [p0, p1] of [[A, B], [B, C], [A, C]]) st.line(p0, p1, { color: P.violet, width: 1.2, alpha: 0.75 });
    st.arrow(O, A, { color: P.sigma, width: 2.2 }); st.arrow(O, B, { color: P.sigma, width: 2.2 }); st.arrow(O, C, { color: P.sigma, width: 2.2 });
    st.dot(C, 5.5, P.amber, { glow: 12 });
    const qc = st.p(C);
    hits.push({ key: 'C', x: qc[0], y: qc[1], r: 24, drag: (ev) => { const q = st.pick(ev); setRail(((Math.atan2(q[1], q[0]) - PHI0) % TAU + TAU) % TAU); } });
    if (!thumb) {
      // the labels of the first and third events trade places with the swap; B_now stays
      const pA = v3.slerp(v3.unit(A), v3.unit(C), u), pC = v3.slerp(v3.unit(C), v3.unit(A), u);
      st.tag('gr-A', v3.scale(pA, 1.2), 'A_past', 'raw ink small');
      st.tag('gr-B', [0, 0, 1.2], 'B_now', 'raw ink small');
      st.tag('gr-C', v3.scale(pC, 1.2), 'C_future', 'raw ink small');
    }
    // the matrix: x (cyan) and y (violet) trade places when the first and third events are swapped
    const im = frame(ctx, lay.Mt, S.swap ? L('G′ = P₁₃ G P₁₃ᵀ', 'G′ = P₁₃ G P₁₃ᵀ') : L('G：三个事件的内积表', 'G: the overlap table'), 'gr-t1');
    const [mT, mB] = split(im, thumb || im.h < 150 ? 1 : 0.82);
    const side = Math.max(30, Math.min(mT.w - 24, mT.h - 4)), gx = mT.x + (mT.w - side) / 2 + 8, gy = mT.y + 2, cs = side / 3;
    const pos = (i, j) => [gx + j * cs, gy + i * cs];
    const lerp2 = (p0, p1) => [p0[0] + (p1[0] - p0[0]) * u, p0[1] + (p1[1] - p0[1]) * u];
    const cellsAt = [
      { v: 1, at: [[0, 0]], kind: 'd' }, { v: 1, at: [[1, 1]], kind: 'd' }, { v: 1, at: [[2, 2]], kind: 'd' },
      { v: m.x, at: [[0, 1], [1, 2]], kind: 'x' }, { v: m.x, at: [[1, 0], [2, 1]], kind: 'x' },
      { v: m.y, at: [[1, 2], [0, 1]], kind: 'y' }, { v: m.y, at: [[2, 1], [1, 0]], kind: 'y' },
      { v: m.z, at: [[0, 2]], kind: 'z' }, { v: m.z, at: [[2, 0]], kind: 'z' }
    ];
    ctx.save();
    cellsAt.forEach((c, k) => {
      const p0 = pos(...c.at[0]), p = c.at[1] ? lerp2(p0, pos(...c.at[1])) : p0;
      const col = c.kind === 'x' ? P.cyan : c.kind === 'y' ? P.violet : c.kind === 'z' ? P.sigma : P.dim;
      ctx.globalAlpha = c.kind === 'd' ? 0.08 : 0.12 + 0.4 * Math.abs(c.v); ctx.fillStyle = col; ctx.fillRect(p[0] + 2, p[1] + 2, cs - 4, cs - 4);
      ctx.globalAlpha = 0.85; ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.strokeRect(p[0] + 2.5, p[1] + 2.5, cs - 5, cs - 5);
      if (!thumb && cs > 24) tagS(`gr-c${k}`, p[0] + cs / 2, p[1] + cs / 2, c.kind === 'd' ? '1' : cs > 46 ? `${c.kind} ${nf(c.v)}` : nf(c.v), `raw small ${c.kind === 'x' ? 'c-cy' : c.kind === 'y' ? 'c-vi' : 'ink'}`);
    });
    ctx.restore();
    if (!thumb && cs > 24) {
      const order = S.swap ? ['C', 'B', 'A'] : ['A', 'B', 'C'];
      order.forEach((n, i) => { tagS(`gr-v${i}`, gx - 10, gy + i * cs + cs / 2, n, 'raw small c-dim'); });
      if (mB.h > 12) footBar('gr-mf', mB, mB.y + 2, [`det G = ${fix(m.det, 4)}`, `det G′ = ${fix(m.detP, 4)}`], null, ' · ');
    }
    // the elliptope slice at the current z: the swap reflects (x, y) across the diagonal
    const is = frame(ctx, lay.Sl, L('椭圆体截面 · 对调是对角线反射', 'Elliptope slice · the swap is a reflection'), 'gr-t2');
    const [sT, sB] = split(is, thumb || is.h < 150 ? 1 : 0.82);
    const gs = area(sT, [-1.08, 1.08], [-1.08, 1.08], true), z = m.z;
    const ell = []; for (let i = 0; i <= 120; i++) { const t = TAU * i / 120, a = Math.sqrt(1 + z) * Math.cos(t), b = Math.sqrt(Math.max(0, 1 - z)) * Math.sin(t); ell.push([(a + b) / Math.SQRT2, (a - b) / Math.SQRT2]); }
    gs.rect(-1, -1, 1, 1, P.lineHot, { fill: false, stroke: P.lineHot, alpha: 0 });
    gs.poly(ell, P.cyan, { alpha: 0.12 }); gs.line(ell, P.magenta, { width: 1.6 * LW });
    gs.line([[-1.05, -1.05], [1.05, 1.05]], P.violet, { width: 1, dash: [4, 4], alpha: 0.8 });
    const pG = [m.x, m.y], pGp = [m.y, m.x], cur = [pG[0] + (pGp[0] - pG[0]) * u, pG[1] + (pGp[1] - pG[1]) * u];
    gs.line([pG, pGp], P.dim, { width: 1, dash: [2, 3] });
    gs.dot(pG[0], pG[1], P.sigma, 5.5 * LW, { ring: true, width: 1.6 }); gs.dot(pGp[0], pGp[1], P.violet, 5.5 * LW, { ring: true, width: 1.6 });
    gs.dot(cur[0], cur[1], P.sigma, 4 * LW);
    if (!thumb) {
      const same = Math.hypot(pG[0] - pGp[0], pG[1] - pGp[1]) < 0.12;
      const up = pG[1] >= pG[0] ? 1 : -1;
      tagS('gr-G', gs.X(pG[0]) - 16 * up, gs.Y(pG[1]) - 13 * up, same ? 'G = G′' : 'G', 'raw small ink');
      if (!same) tagS('gr-Gp', gs.X(pGp[0]) + 16 * up, gs.Y(pGp[1]) + 13 * up, 'G′', 'raw small c-vi');
      if (sB.h > 12) footBar('gr-sf', sB, sB.y + 2, [`z ${fix(z, 3)}`, `max|G′ − G| = ${fix(m.same, 3)}`], null, ' · ');
    }
  }

  /* ---------- scene: paradox-cancel ---------- */
  function drawParadox(m, box, ctx) {
    const R = tiles(box, 4), thumb = TRV.thumbMode;
    // (1) the two arms: reference ½ (cyan) and loop ½e^{iδ} (violet); ports A_loop (cyan) and A_other (magenta)
    const i1 = frame(ctx, R[0], L('两臂 · 两个端口', 'Two arms · two ports'), 'pc-t0');
    const [aT, aB] = split(i1, thumb ? 1 : 0.8);
    const ga = area(aT, [-0.12, 1.12], [-0.56, 0.56], true), e = cexp(m.delta), tip = [0.5 + 0.5 * e[0], 0.5 * e[1]], tipO = [0.5 - 0.5 * e[0], -0.5 * e[1]];
    withClip(ctx, aT, () => {
      ga.line([[-0.12, 0], [1.12, 0]], P.lineHot, { width: 1 });
      ga.line(circlePts(0.5, 0, 0.5, 0, TAU, 72), P.violet, { width: 1, alpha: 0.3, dash: [3, 4] });
      arrow(ga, 0, 0, 0.5, 0, P.sigma, { width: 2 });
      arrow(ga, 0.5, 0, tipO[0], tipO[1], P.violet, { width: 1.4, dash: [4, 3], alpha: 0.55 });
      arrow(ga, 0.5, 0, tip[0], tip[1], P.violet, { width: 2.2 });
      if (Math.hypot(tipO[0], tipO[1]) > 0.02) arrow(ga, 0, 0, tipO[0], tipO[1], P.magenta, { width: 3 });
      if (Math.hypot(tip[0], tip[1]) > 0.02) arrow(ga, 0, 0, tip[0], tip[1], P.cyan, { width: 3 }); else ga.dot(0, 0, P.cyan, 7 * LW, { ring: true, width: 2 });
      ga.dot(tip[0], tip[1], P.violet, 6 * LW, { ring: true, width: 1.8 });
    });
    hits.push({ key: 'loop', plot: ga, x: ga.X(tip[0]), y: ga.Y(tip[1]), r: 24, drag: (ev) => { const q = toData('loop', ev); let d = Math.atan2(q[1], q[0] - 0.5); if (d < 0) d += TAU; const t0 = S.tau, cand = [d / PI, d / PI + 2, d / PI - 2].filter((v) => v >= 0 && v <= 2); setRail(cand.reduce((b0, v) => (Math.abs(v - t0) < Math.abs(b0 - t0) ? v : b0), cand[0] == null ? 0 : cand[0])); } });
    if (!thumb) {
      tagS('pc-ref', ga.X(0.25), ga.Y(0) + 14, L('参考臂 ½', 'reference ½'), 'raw small ink');
      const lm = [(0.5 + tip[0]) / 2, tip[1] / 2];
      tagS('pc-loop', ga.X(lm[0]) + (Math.abs(tip[1]) < 0.05 ? 0 : 16), ga.Y(lm[1]) - (Math.abs(tip[1]) < 0.05 ? 16 : 0), L('回路臂 ½e^{iδ}', 'loop ½e^{iδ}'), 'raw small c-vi');
      footBar('pc-p', aB, aB.y + 2, [span('c-cy', `${L('悖论端口', 'paradox port')} ${nf(m.pLoop, 3)}`), span('c-mg', `${L('另一端口', 'other')} ${nf(m.pOther, 3)}`)], [{ v: m.pLoop, color: P.cyan }, { v: m.pOther, color: P.magenta }]);
    }
    // (2) the double cover: τ turns of the base point (outer, amber now) lift to τ/2 turns (inner, violet)
    const i2 = frame(ctx, R[1], L('双覆盖 · 一圈换一个负号', 'Double cover · one turn, one sign'), 'pc-t1');
    const gl = area(i2, [-1.35, 1.35], [-1.3, 1.3], true), tau = m.tau;
    gl.line(circlePts(0, 0, 1.1, 0, TAU, 96), P.lineHot, { width: 1 });
    gl.line(circlePts(0, 0, 0.72, 0, TAU, 96), P.lineHot, { width: 1, dash: [3, 4] });
    if (tau > 1e-3) gl.line(circlePts(0, 0, 0.72, 0, PI * tau, Math.max(8, Math.round(60 * tau))), P.violet, { width: 3 * LW });
    gl.dot(0.72, 0, P.sigma, 4 * LW); gl.dot(-0.72, 0, P.sigma, 4 * LW, { ring: true, width: 1.5 });
    gl.dot(1.1 * m.base[0], 1.1 * m.base[1], P.amber, 5.5 * LW, { glow: 10 });
    gl.dot(0.72 * m.lift[0], 0.72 * m.lift[1], P.violet, 5.5 * LW);
    if (!thumb && i2.h > 90) {
      tagS('pc-p1', gl.X(0.72) - 18, gl.Y(0), '+1', 'raw small ink');
      tagS('pc-m1', gl.X(-0.72) + 18, gl.Y(0), '−1', 'raw small ink');
      tagIn('pc-turn', i2, gl.X(0), gl.Y(-1.22), L(`底圆 ${fix(tau, 2)} 圈 → 提升 ${fix(tau / 2, 2)} 圈`, `${fix(tau, 2)} base turns → ${fix(tau / 2, 2)} lifted`), 'raw small c-vi');
    }
    // (3) Deutsch's X example: the whole segment (I + rₓX)/2 is fixed; |0⟩ is moved to |1⟩
    const i3 = frame(ctx, R[2], L('多伊奇 · X 的不动点', 'Deutsch · fixed points of X'), 'pc-t2');
    const gd = area(i3, [-1.4, 1.4], [-1.3, 1.3], true);
    gd.line(circlePts(0, 0, 1, 0, TAU, 96), P.lineHot, { width: 1 });
    gd.line([[0, -1.1], [0, 1.1]], P.faint, { width: 1 });
    gd.line([[-1, 0], [1, 0]], P.violet, { width: 4 * LW, alpha: 0.85 });
    gd.dot(0, 0, P.sigma, 5 * LW, { ring: true, width: 1.8 });
    gd.dot(0, 1, P.dim, 4 * LW); gd.dot(0, -1, P.dim, 4 * LW);
    // X carries |0⟩ to |1⟩: the dashed arc on the left, with its head at |1⟩
    const ae = 3 * PI / 2 - 0.12, ex = 1.12 * Math.cos(ae), ey = 1.12 * Math.sin(ae), tx = -Math.sin(ae), ty = Math.cos(ae);
    gd.line(circlePts(0, 0, 1.12, PI / 2 + 0.12, ae, 40), P.dim, { width: 1.2, dash: [4, 3] });
    arrow(gd, ex - 0.12 * tx, ey - 0.12 * ty, ex, ey, P.dim, { width: 1.2, head: 7 });
    if (!thumb && i3.h > 90) {
      tagS('pc-half', gd.X(0) + 2, gd.Y(0) - 14, 'I/2', 'raw small ink');
      tagS('pc-plus', gd.X(1.0) + 6, gd.Y(0) + 14, '|+⟩', 'raw small c-vi');
      tagS('pc-minus', gd.X(-1.0) - 4, gd.Y(0) + 14, '|−⟩', 'raw small c-vi');
      tagS('pc-0', gd.X(0) + 18, gd.Y(1.0) - 4, '|0⟩', 'raw small c-dim');
      tagS('pc-1', gd.X(0) + 18, gd.Y(-1.0) + 4, '|1⟩', 'raw small c-dim');
    }
    // (4) cos θ = θ by bisection on [0, 1]
    const i4 = frame(ctx, R[3], L('余弦不动点 · 二分', 'Cosine fixed point · bisection'), 'pc-t3');
    const gcos = areaAx(i4, [-0.02, 1.04], [-0.04, 1.06], false, 22, 16), th = m.cosRoot.theta;
    gcos.axes({ xTicks: [[0, '0'], [0.5, '0.5'], [1, '1']], yTicks: [[0, '0'], [1, '1']] });
    const cp = []; for (let i = 0; i <= 80; i++) { const t = i / 80; cp.push([t, Math.cos(t)]); }
    gcos.line([[0, 0], [1, 1]], P.dim, { width: 1.2 });
    gcos.line(cp, P.cyan, { width: 2 * LW });
    // the first brackets of the bisection, nested, above the axis: each one half the last, all around θ*
    COS_ROOT.brackets.slice(0, 7).forEach((br, k) => { const yb = 0.05 + 0.035 * k; gcos.line([[br[0], yb], [br[1], yb]], P.sigma, { width: 2 * LW, alpha: 0.35 + 0.09 * k }); gcos.dot(br[0], yb, P.sigma, 1.8); gcos.dot(br[1], yb, P.sigma, 1.8); });
    gcos.vline(th, P.dim, { dash: [3, 3] });
    gcos.dot(th, th, P.sigma, 5 * LW);
    if (!thumb && i4.h > 90) tagIn('pc-th', i4, gcos.X(th) - 6, gcos.Y(th) - 18, `θ* ${fix(th, 10)}`, 'raw small ink');
  }

  /* ================= small plots (strip) ================= */
  const STRIP = {
    'boolean-illusion': [['相干消退时的端口权重', 'Port weights as coherence fades'], ['纯度：留下的质量加相干质量', 'Purity: kept mass plus coherence mass']],
    'born-handshake': [['箭头在转，乘积不动', 'The arrows turn, the product does not'], ['权重随夹角变化', 'Weight against separation']],
    'feynman-stationary': [['沿界面的光程', 'Optical length along the interface'], ['网格加密时的平均相量', 'The averaged phasor as the mesh refines']],
    'tsvf-eraser': [['两个标记分支的放缩条纹', 'Scaled fringe profiles of the two heralds'], ['未来的选择改变了什么', 'What a future choice changes']],
    'gram-symmetry': [['未来向量转动时的体积平方', 'Squared volume as the future vector turns'], ['对调前后的特征值', 'Eigenvalues before and after the swap']],
    'paradox-cancel': [['回路相位转动时的端口权重', 'Port weights as the loop phase turns'], ['六个二元映射与四种命运', 'Six binary maps and their four fates']]
  };
  const SAMPLES = new Map();
  function sampled(key, fn) { if (!SAMPLES.has(key)) { SAMPLES.set(key, fn()); if (SAMPLES.size > 40) SAMPLES.delete(SAMPLES.keys().next().value); } return SAMPLES.get(key); }
  function drawPlots(m) {
    const sc = S.scene, ca = $('plotA'), cb = $('plotB'), T = STRIP[sc], t = clock.t;
    $('pATitle').textContent = L(T[0][0], T[0][1]); $('pBTitle').textContent = L(T[1][0], T[1][1]);
    const pad = [40, 12, 8, 20];
    if (sc === 'boolean-illusion') {
      const rows = sampled(`bo|${S.xi}|${S.Delta}`, () => { const out = []; for (let i = 0; i <= 60; i++) { const tt = i / 60, mm = mathBoolean(Object.assign({}, S, { gamma: 1 - tt })); out.push([tt, mm.qPlus, mm.qMinus, mm.hsKept, mm.hsOff]); } return out; });
      const ga = kit.plot(ca, { x: [0, 1], y: [0, 1.05], pad });
      ga.axes({ xTicks: [[0, 'γ 1'], [0.5, '0.5'], [1, '0']], yTicks: [0, 0.5, 1] });
      ga.line(rows.map((r) => [r[0], r[1]]), P.cyan, { width: 2 }); ga.line(rows.map((r) => [r[0], r[2]]), P.magenta, { width: 2 });
      ga.vline(t, P.amber, { alpha: 0.9 });
      $('pAMeta').textContent = `p₊ ${nf(m.qPlus, 3)} · p₋ ${nf(m.qMinus, 3)}`;
      const gb = kit.plot(cb, { x: [0, 1], y: [0, 1.05], pad });
      gb.axes({ xTicks: [[0, 'γ 1'], [0.5, '0.5'], [1, '0']], yTicks: [0, 0.5, 1] });
      gb.area(rows.map((r) => [r[0], r[3]]), P.cyan, { alpha: 0.3 });
      gb.area(rows.map((r) => [r[0], r[3] + r[4]]), P.magenta, { alpha: 0.18, base: 0 });
      gb.line(rows.map((r) => [r[0], r[3] + r[4]]), P.magenta, { width: 1.6 }); gb.line(rows.map((r) => [r[0], r[3]]), P.cyan, { width: 1.6 });
      gb.hline(1, P.dim, { dash: [3, 3] }); gb.vline(t, P.amber, { alpha: 0.9 });
      $('pBMeta').textContent = `Tr ρ² ${nf(m.purity, 3)}`;
    } else if (sc === 'born-handshake') {
      const rows = sampled(`bh|${S.thB}|${S.chiPhi}`, () => { const out = []; for (let i = 0; i <= 96; i++) { const ch = TAU * i / 96, mm = mathBorn(Object.assign({}, S, { chiPsi: ch })); out.push([ch, mm.fwd[1], mm.echo[1], mm.prod[0]]); } return out; });
      const ga = kit.plot(ca, { x: [0, TAU], y: [-1.08, 1.08], pad });
      ga.axes({ xTicks: [[0, '0'], [PI, 'π'], [TAU, '2π']], yTicks: [-1, 0, 1] });
      ga.line(rows.map((r) => [r[0], r[1]]), P.cyan, { width: 1.8 }); ga.line(rows.map((r) => [r[0], r[2]]), P.violet, { width: 1.8 });
      ga.line(rows.map((r) => [r[0], r[3]]), P.sigma, { width: 2.4 });
      ga.vline(t, P.amber, { alpha: 0.9 });
      $('pAMeta').textContent = L(`Im 去程 / 回程 · w ${nf(m.w, 3)}`, `Im forward / echo · w ${nf(m.w, 3)}`);
      const gb = kit.plot(cb, { x: [0, PI], y: [0, 1.05], pad });
      gb.axes({ xTicks: [[0, '0'], [PI / 2, '90°'], [PI, '180°']], yTicks: [0, 0.5, 1] });
      const wp = []; for (let i = 0; i <= 90; i++) { const th = PI * i / 90; wp.push([th, Math.cos(th / 2) ** 2]); }
      gb.line(wp, P.cyan, { width: 2 });
      for (const [th, w] of [[0, 1], [PI / 2, 0.5], [PI, 0]]) gb.dot(th, w, P.dim, 3);
      gb.dot(S.thB, m.w, P.sigma, 5, { ring: true, width: 1.8 });
      $('pBMeta').textContent = `θ ${degs(S.thB)} · cos²(θ/2) ${nf(m.wFormula, 3)}`;
    } else if (sc === 'feynman-stationary') {
      const Lp = []; let lmin = Infinity, lmax = -Infinity;
      for (let i = 0; i <= 200; i++) { const s = -2 + 5 * i / 200, l = m.L(s); Lp.push([s, l]); lmin = Math.min(lmin, l); lmax = Math.max(lmax, l); }
      const ga = kit.plot(ca, { x: [-2, 3], y: [lmin - 0.1 * (lmax - lmin), lmax + 0.05 * (lmax - lmin)], pad });
      ga.axes({ xTicks: [-2, -1, 0, 1, 2, 3], yTicks: [Math.ceil(lmin * 2) / 2, Math.floor(lmax)].filter((v, i, a) => a.indexOf(v) === i), yFmt: (v) => fix(v, 1) });
      if (m.bandLo != null) ga.rect(m.bandLo, ga.y0, m.bandHi, ga.y1, P.cyan, { alpha: 0.14 });
      ga.line(Lp, P.sigma, { width: 1.8 });
      ga.vline(m.sStar, P.cyan, { alpha: 0.9 }); ga.vline(m.sCur, P.amber, { alpha: 0.9 });
      $('pAMeta').textContent = `s* ${fix(m.sStar, 4)} · L(s*) ${fix(m.Lstar, 4)}`;
      const gb = kit.plot(cb, { x: [-0.5, 4.5], y: [0, Math.max(0.2, ...m.meshes.map((q) => q.absAvg)) * 1.25], pad });
      gb.axes({ xTicks: m.meshes.map((q, i) => [i, String(q.M)]), yTicks: [0], yFmt: (v) => fix(v, 2) });
      m.meshes.forEach((q, i) => { gb.dot(i, q.absAvg, P.cyan, q.M === m.M ? 6 : 4, q.ok ? {} : { ring: true, width: 1.6 }); });
      gb.line(m.meshes.map((q, i) => [i, q.absAvg]), P.cyan, { width: 1, alpha: 0.5 });
      const mi = MESH.indexOf(m.M); if (mi >= 0) gb.vline(mi, P.sigma, { dash: [3, 3], alpha: 0.7 });
      $('pBMeta').textContent = m.meshDiff == null ? `|A_M|/√M ${fix(cabs(m.avg), 4)}` : L(`与 M = ${m.next} 差 ${sci(m.meshDiff)}`, `vs M = ${m.next}: ${sci(m.meshDiff)}`);
    } else if (sc === 'tsvf-eraser') {
      const ga = kit.plot(ca, { x: [-PI, PI], y: [0, 1.08], pad });
      ga.axes({ xTicks: [[-PI, '−π'], [0, '0'], [PI, 'π']], yTicks: [0, 0.5, 1] });
      const fp = [], fmn = [], sum = [];
      for (let j = 0; j < NB; j++) { const x = wrapPhi(m.phi[j]); fp.push([x, m.jp[j] / m.q]); fmn.push([x, m.jm[j] / m.q]); sum.push([x, (m.jp[j] + m.jm[j]) / m.q]); }
      [fp, fmn, sum].forEach((a) => a.sort((u, v) => u[0] - v[0]));
      ga.line(fp, P.cyan, { width: 1.8 }); ga.line(fmn, P.magenta, { width: 1.8 }); ga.line(sum, P.sigma, { width: 1.4, dash: [4, 3] });
      $('pAMeta').textContent = 'F±(j) = p(j, ±)/qⱼ';
      const gb = kit.plot(cb, { x: [0, PI / 2], y: [-0.05, 1.08], pad });
      gb.axes({ xTicks: [[0, 'β 0'], [PI / 4, '45°'], [PI / 2, '90°']], yTicks: [0, 0.5, 1] });
      const hv = []; for (let i = 0; i <= 60; i++) { const bb = PI / 2 * i / 60; hv.push([bb, S.V * Math.sin(bb)]); }
      const tv = sampled(`tv|${S.V}`, () => { const out = []; for (let i = 0; i <= 12; i++) { const bb = PI / 2 * i / 12; out.push([bb, mathTsvf({ beta: bb, V: S.V }).totalVis]); } return out; });
      gb.line(hv, P.cyan, { width: 2 }); gb.line(tv, P.sigma, { width: 2.2 }); tv.forEach((p) => gb.dot(p[0], p[1], P.sigma, 2.5));
      gb.vline(t, P.amber, { alpha: 0.9 });
      $('pBMeta').textContent = L(`分支可见度 ${nf(m.heraldVis, 3)} · 总数可见度 ${nf(m.totalVis, 3)}`, `herald ${nf(m.heraldVis, 3)} · total ${nf(m.totalVis, 3)}`);
    } else if (sc === 'gram-symmetry') {
      const rows = sampled(`gr|${S.x}|${S.y}`, () => { const out = []; for (let i = 0; i <= 120; i++) { const tt = TAU * i / 120, mm = mathGram(Object.assign({}, S, { phi: (PHI0 + tt) % TAU })); out.push([tt, mm.det, mm.detP, mm.eig, mm.eigP]); } return out; });
      const top = Math.max(0.2, ...rows.map((r) => r[1])) * 1.15;
      const ga = kit.plot(ca, { x: [0, TAU], y: [0, top], pad });
      ga.axes({ xTicks: [[0, '0'], [PI, '180°'], [TAU, '360°']], yTicks: [0, Math.round(top / 1.15 * 100) / 100], yFmt: (v) => fix(v, 2) });
      ga.line(rows.map((r) => [r[0], r[1]]), P.cyan, { width: 3 }); ga.line(rows.map((r) => [r[0], r[2]]), P.violet, { width: 1.6, dash: [5, 4] });
      ga.vline(t, P.amber, { alpha: 0.9 });
      $('pAMeta').textContent = `det G ${fix(m.det, 4)} = det G′ ${fix(m.detP, 4)}`;
      const gb = kit.plot(cb, { x: [0, TAU], y: [-0.05, 3.05], pad });
      gb.axes({ xTicks: [[0, '0'], [PI, '180°'], [TAU, '360°']], yTicks: [0, 1, 2, 3] });
      for (let k = 0; k < 3; k++) { gb.line(rows.map((r) => [r[0], r[3][k]]), P.cyan, { width: 3 }); gb.line(rows.map((r) => [r[0], r[4][k]]), P.violet, { width: 1.6, dash: [5, 4] }); }
      gb.vline(t, P.amber, { alpha: 0.9 });
      $('pBMeta').textContent = m.eig.map((v) => fix(v, 3)).join(' · ');
    } else if (sc === 'paradox-cancel') {
      const ga = kit.plot(ca, { x: [0, 2], y: [0, 1.05], pad });
      ga.axes({ xTicks: [[0, 'δ 0'], [1, 'π'], [2, '2π']], yTicks: [0, 0.5, 1] });
      const pl = [], po = []; for (let i = 0; i <= 120; i++) { const tt = 2 * i / 120, q = ports(PI * tt); pl.push([tt, q.pLoop]); po.push([tt, q.pOther]); }
      ga.line(pl, P.cyan, { width: 2 }); ga.line(po, P.magenta, { width: 2 }); ga.vline(t, P.amber, { alpha: 0.9 });
      $('pAMeta').textContent = `${L('悖论端口', 'paradox port')} ${nf(m.pLoop, 3)}`;
      drawFates(cb);
      $('pBMeta').textContent = L('空 1 · 死 1 · 塌缩 2 · 活 2', 'empty 1 · dead 1 · collapse 2 · live 2');
    }
  }
  /** x ↦ (ax + b)/(cx + d) written out, and the fixed polynomial cx² + (d − a)x − b. */
  const lin = (p, q) => { const t = []; if (p) t.push(p === 1 ? 'x' : `${p}x`); if (q || !p) t.push(String(q)); return t.join(' + '); };
  const mapText = (f) => { const n = lin(f.a, f.b), d = lin(f.c, f.d), wrap = (s) => (s.includes('+') ? `(${s})` : s); return d === '1' ? n : `${wrap(n)}/${wrap(d)}`; };
  const polyText = (c) => {
    const terms = [[c[0], 'x²'], [c[1], 'x'], [c[2], '']].filter((t) => t[0] !== 0);
    if (!terms.length) return '0';
    return terms.map(([k, v], i) => { const mag = Math.abs(k) === 1 && v ? v : `${Math.abs(k)}${v}`; return i === 0 ? (k < 0 ? `−${mag}` : mag) : `${k < 0 ? ' − ' : ' + '}${mag}`; }).join('');
  };
  const FATE_NAME = { empty: ['空', 'empty'], dead: ['死', 'dead'], collapse: ['塌缩', 'collapse'], live: ['活', 'live'] };
  function drawFates(cv) {
    const g = kit.plot(cv, { x: [0, 6], y: [0, 1], pad: [6, 6, 6, 6] }), ctx = g.ctx, n = FATES.length, cw = g.iw / n;
    ctx.save();
    FATES.forEach((f, i) => {
      const x = g.pl + i * cw, y = g.pt, h = g.ih, live = f.fate === 'live';
      ctx.globalAlpha = live ? 0.16 : 0.06; ctx.fillStyle = live ? P.cyan : P.sigma; ctx.fillRect(x + 3, y + 2, cw - 6, h - 4);
      ctx.globalAlpha = 0.8; ctx.strokeStyle = live ? P.cyan : P.lineHot; ctx.lineWidth = 1; ctx.strokeRect(x + 3.5, y + 2.5, cw - 7, h - 5);
      ctx.globalAlpha = 1; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const lines = [[mapText(f), P.ink, 11.5], [polyText(f.coeffs), P.dim, 10.5], [`${L('判别式', 'disc')} ${f.disc}`, P.dim, 10], [L(FATE_NAME[f.fate][0], FATE_NAME[f.fate][1]), live ? P.cyan : P.ink, 12]];
      lines.forEach(([t, col, size], k) => { ctx.font = `${size}px ${TRV.fonts.data}`; ctx.fillStyle = col; ctx.fillText(t, x + cw / 2, y + h * (0.2 + 0.2 * k), cw - 8); });
    });
    ctx.restore();
  }

  /* ================= text ================= */
  const LEG = {
    'boolean-illusion': [['cy', '线、+ 端口、留下的对角', 'line, + port, kept diagonal'], ['mg', '补分量、面积、− 端口、相干', 'complement, area, − port, coherence'], ['vi', '相位臂 b e^{iΔ}', 'phase arm b e^{iΔ}'], ['am', '此刻的相干 γ', 'coherence γ now']],
    'born-handshake': [['cy', '去程 ⟨φ|ψ⟩ 与影子 2w', 'forward ⟨φ|ψ⟩ and shadow 2w'], ['vi', '回程 ⟨ψ|φ⟩', 'echo ⟨ψ|φ⟩'], ['dm', '乘积 w（实轴）', 'product w (real axis)'], ['am', '此刻的相位 χ_ψ', 'phase χ_ψ now']],
    'feynman-stationary': [['cy', '驻相邻域与驻点路径', 'stationary band and path'], ['mg', '离驻点的路径', 'paths off the stationary point'], ['dm', '总振幅', 'total amplitude'], ['am', '此刻加入的路径', 'path being added']],
    'tsvf-eraser': [['cy', 'p(j, +) 与 f₊', 'p(j, +) and f₊'], ['mg', 'p(j, −) 与 f₋', 'p(j, −) and f₋'], ['dm', '过去的总数', 'past total'], ['vi', '弱值 tan η', 'weak value tan η'], ['am', '此刻的基 β', 'basis β now']],
    'gram-symmetry': [['cy', 'x 与窗口内', 'x and inside the window'], ['vi', 'y、体积与对角线', 'y, volume and diagonal'], ['mg', '椭圆体的边', 'edge of the elliptope'], ['am', '此刻的 C', 'C now']],
    'paradox-cancel': [['cy', '参考臂、悖论端口、cos θ', 'reference, paradox port, cos θ'], ['mg', '另一端口', 'other port'], ['vi', '回路臂、提升、X 的不动点', 'loop arm, lift, X-fixed states'], ['am', '此刻的底点', 'base point now']]
  };
  function setRO(keyL, key, keySub, rows) {
    $('roKeyL').textContent = keyL; $('roKey').textContent = key; $('roKeySub').textContent = keySub || '';
    rows.forEach(([l, v], i) => { $(`roL${i + 1}`).textContent = l; $(`ro${i + 1}`).textContent = v; });
  }
  function drawText(m) {
    const sc = S.scene, D = SC[sc];
    let big = '', sub = '', key = '', note = '';
    if (sc === 'boolean-illusion') {
      big = L(`三种零 · γ ${nf(m.gamma)}`, `Three zeros · γ ${nf(m.gamma)}`);
      sub = L('正交藏起、反相抵消、退相干捏掉：三个零背后剩下的东西各不相同', 'Hidden by orthogonality, cancelled by phase, pinched by decoherence: what remains behind each zero differs');
      setRO(L('每个零背后剩下的', 'What remains behind each zero'), `‖B⊥‖² ${nf(m.perp2)} · p₋ ${nf(m.pMinus)} · Tr ρ² ${nf(m.purity)}`, '', [
        [L('线² + 面积²', 'line² + area²'), `${nf(m.par2, 3)} + ${nf(m.perp2, 3)} = ${nf(m.par2 + m.perp2, 3)}`],
        [L('纯态两端口 p₊ + p₋', 'pure ports p₊ + p₋'), `${nf(m.pPlus, 3)} + ${nf(m.pMinus, 3)}`],
        [L('捏后两端口（γ）', 'ports after pinching (γ)'), `${nf(m.qPlus, 3)}, ${nf(m.qMinus, 3)}`],
        [L('幂等 · HS 勾股残差', 'idempotence · HS residuals'), `${sci(m.idemRes)} · ${sci(m.hsRes)}`]]);
      const eq = Math.abs(m.a - m.b) < 1e-9, anti = Math.abs(Math.cos(m.Delta) + 1) < 1e-9;
      note = anti && !eq ? L(`两臂不等幅：反相只把 + 端口压到 (a − b)²/2 = ${nf(m.pPlus, 4)}，压不到零。`, `Unequal arms: opposite phase only brings the + port down to (a − b)²/2 = ${nf(m.pPlus, 4)}, not to zero.`)
        : m.gamma < 1e-9 ? L('相干全被捏掉：两端口都是 ½，纯度 ½；被捏掉的相干质量记在虚线框里，本地找不回来。捏第二次什么也不变。', 'All coherence pinched: both ports read ½ and the purity is ½; the pinched coherence mass is the dashed box, out of local reach. A second pinch changes nothing.')
          : L('三个零来自三种不同的操作：同一个读数 0 分不出它的原因。', 'The three zeros come from three different operations: the readout 0 alone cannot tell its cause.');
      key = `γ ${nf(m.gamma)}`;
    } else if (sc === 'born-handshake') {
      big = L(`握手 · w ${nf(m.w, 3)}`, `Handshake · w ${nf(m.w, 3)}`);
      sub = L('去程随 χ_ψ 转，回程反着转；两者之积停在实轴上', 'The forward amplitude turns with χ_ψ, the echo turns back; their product stays on the real axis');
      setRO(L('握手权重 w = |⟨φ|ψ⟩|²', 'Handshake weight w = |⟨φ|ψ⟩|²'), fix(m.w, 4), L(' = cos²(θ/2)，与两边的相位无关', ' = cos²(θ/2), whatever the phases'), [
        [L('去程 ⟨φ|ψ⟩', 'forward ⟨φ|ψ⟩'), `${fix(m.r, 3)} ∠ ${sgn(m.argFwd / DEG, 1)}°`],
        [L('回程 ⟨ψ|φ⟩', 'echo ⟨ψ|φ⟩'), `${fix(m.r, 3)} ∠ ${sgn(m.argEcho / DEG, 1)}°`],
        ['Tr(P_φP_ψ) · Tr(P_ψP_φ)', `${nf(m.t1[0], 4)} · ${nf(m.t2[0], 4)}`],
        [L('夹心式残差 ‖P_ψP_φP_ψ − wP_ψ‖', 'sandwich residual ‖P_ψP_φP_ψ − wP_ψ‖'), sci(m.sandRes)]]);
      note = m.w < 1e-9 ? L('θ = 180°：两条射线正交，去程与回程都为零。这个零来自正交，不是相消。', 'θ = 180°: the rays are orthogonal and both amplitudes vanish. This zero comes from orthogonality, not from cancellation.')
        : L(`测量用 {P_φ, I − P_φ} 补完整：两个权重 ${nf(m.weights[0][0], 4)} 与 ${nf(m.weights[1][0], 4)} 之和为 1。`, `The measurement is completed with {P_φ, I − P_φ}: the two weights ${nf(m.weights[0][0], 4)} and ${nf(m.weights[1][0], 4)} sum to 1.`);
      key = `w ${nf(m.w, 3)}`;
    } else if (sc === 'feynman-stationary') {
      const A2 = cabs2(m.partial);
      big = L(`路径扇 · k ${m.k} / ${m.M}`, `Path fan · k ${m.k} / ${m.M}`);
      sub = m.fan === 'roots' ? L('单位根首尾相接成闭合多边形：和为零', 'Roots of unity close into a polygon: their sum is zero')
        : L('离驻点的箭头绕成螺旋、近乎抵消；驻点附近的箭头排成直线', 'Arrows off the stationary point curl and nearly cancel; near it they line up');
      setRO(L('总振幅与相干得分', 'Total amplitude and coherence score'), `|A_M|² ${fix(m.A2, 3)} · C ${fix(m.C, 4)}`, ` M ${m.M}`, [
        [L('驻点 s* · 斯涅尔残差', 'stationary s* · Snell residual'), `${fix(m.sStar, 6)} · ${sci(m.snellRes)}`],
        [L('驻相邻域 / 其余的振幅', 'stationary band / the rest'), m.fan === 'roots' ? '—' : `${fix(cabs(m.Aband), 3)} / ${fix(cabs(m.Aoff), 3)}`],
        [L('最大相邻相位差', 'largest adjacent phase step'), `${fix(m.step, 3)} ${m.step <= PI / 4 + 1e-12 ? '≤' : '>'} π/4`],
        [L('与下一级网格的差', 'difference from the next mesh'), m.meshDiff == null ? L('没有更细的网格', 'no finer mesh') : `${sci(m.meshDiff)} (M ${m.next})`]]);
      note = m.under ? L('分辨不足：即使 M = 4097，相邻相位差仍超过 π/4。这里不作收敛的结论。', 'Under-resolved: even at M = 4097 an adjacent phase step exceeds π/4. No convergence is claimed here.')
        : m.fan === 'roots' ? L(`校准：M 个单位根之和 ${sci(m.rootsRes)}，一对 Ω、−Ω 之和 ${sci(m.pairRes)}。`, `Calibration: the M roots of unity sum to ${sci(m.rootsRes)}, a pair Ω, −Ω to ${sci(m.pairRes)}.`)
          : L(`此刻已加入 ${m.k} 条路径，部分和 |A|² = ${fix(A2, 3)}。离驻点的部分 ${fix(cabs(m.Aoff), 3)} 小但不为零：有限 M 的抵消只是近似。`, `${m.k} paths added so far, partial |A|² = ${fix(A2, 3)}. The off-stationary part ${fix(cabs(m.Aoff), 3)} is small but not zero: at finite M the cancellation is approximate.`);
      key = `C ${fix(m.C, 4)}`;
    } else if (sc === 'tsvf-eraser') {
      const wv = m.weak;
      big = L(`擦除 · β ${fix(m.beta / DEG, 0)}°`, `Eraser · β ${fix(m.beta / DEG, 0)}°`);
      sub = L('未来的选择只改分法：两组条纹出现又消失，叠起来的总数一格不动', 'The future choice only changes the split: the two fringe sets come and go, the stacked total stays');
      setRO(L('过去的总数 max|p₊ + p₋ − q|', 'Past total max|p₊ + p₋ − q|'), fix(m.maxRes, 4), ` ${L('原始', 'raw')} ${sci(m.maxRes)}`, [
        ['p(+) · p(−)', `${fix(m.pPlus, 4)} · ${fix(m.pMinus, 4)}`],
        [L('分支条纹可见度 V sin β', 'heralded visibility V sin β'), nf(m.heraldVis, 3)],
        [L('弱值 Z_w = tan η', 'weak value Z_w = tan η'), wv.defined ? `${nf(wv.Zw[0], 4)}${Math.abs(wv.Zw[1]) > ZERO ? ` ${sgn(wv.Zw[1], 4)}i` : ''}` : L('无定义（p_post = 0）', 'undefined (p_post = 0)')],
        [L('后选概率 p_post = cos²η', 'postselection p_post = cos²η'), nf(wv.pPost, 4)]]);
      note = !wv.defined ? L('η = ±90°：⟨Φ_η|Ψ⟩ = 0，后选概率为零，弱值无定义，不是 ∞。', 'η = ±90°: ⟨Φ_η|Ψ⟩ = 0, the postselection probability is zero and the weak value is undefined, not ∞.')
        : L(`每一格的 p(j, +) + p(j, −) 都直接与 Tr[ρ(Eⱼ ⊗ I)] 和 qⱼ 比较（残差 ${sci(m.directRes)}）；128 个 Eⱼ 之和与 I 差 ${sci(m.sumERes)}。`, `In every bin p(j, +) + p(j, −) is compared directly with Tr[ρ(Eⱼ ⊗ I)] and qⱼ (residual ${sci(m.directRes)}); the 128 Eⱼ sum to I within ${sci(m.sumERes)}.`);
      key = `max ${fix(m.maxRes, 4)}`;
    } else if (sc === 'gram-symmetry') {
      big = L(`格拉姆对调 · det G ${fix(m.det, 4)}`, `Gram swap · det G ${fix(m.det, 4)}`);
      sub = S.swap ? L('A_past 与 C_future 已对调：x、y 换位，行列式与谱不动', 'A_past and C_future swapped: x and y trade places, determinant and spectrum stay')
        : L('C_future 绕 B_now 转：z 在窗口里来回，体积平方 = det G', 'C_future turns about B_now: z sweeps the window, squared volume = det G');
      setRO('det G = det G′', `${fix(m.det, 4)} = ${fix(m.detP, 4)}`, '', [
        [L('G 的特征值', 'eigenvalues of G'), m.eig.map((v) => nf(v, 4)).join(', ')],
        [L('G′ 的特征值', 'eigenvalues of G′'), m.eigP.map((v) => nf(v, 4)).join(', ')],
        [L('三重积 A·(B×C) → 对调后', 'triple product A·(B×C) → swapped'), `${sgn(m.triple, 4)} → ${sgn(m.tripleSwap, 4)}`],
        [L('max|G′ − G|（= |x − y|）', 'max|G′ − G| (= |x − y|)'), fix(m.same, 4)]]);
      const rj = S.reject;
      note = rj ? L(`拒绝 (${fix(rj.x, 0)}, ${fix(rj.y, 0)}, ${fix(rj.z, 0)})：det G = ${fix(rj.det, 4)} < 0，不是任何三根单位向量的格拉姆矩阵。`, `Rejected (${fix(rj.x, 0)}, ${fix(rj.y, 0)}, ${fix(rj.z, 0)}): det G = ${fix(rj.det, 4)} < 0, the Gram matrix of no three unit vectors.`)
        : m.equal ? L('x = y：对调之后矩阵逐项不变，G′ = G。', 'x = y: after the swap the matrix is entrywise the same, G′ = G.')
          : L(`x ≠ y：G′ ≠ G，但两者都${m.psd ? '半正定' : '不半正定'}、秩 ${m.rank}，三个特征值相同（差 ${sci(m.eigRes)}）；带号的三重积变号，只有平方不变。`, `x ≠ y: G′ ≠ G, yet both are ${m.psd ? 'positive semidefinite' : 'not positive semidefinite'} of rank ${m.rank} with the same eigenvalues (difference ${sci(m.eigRes)}); the signed triple product flips, only its square stays.`);
      key = `det ${fix(m.det, 3)}`;
    } else if (sc === 'paradox-cancel') {
      big = L(`回路 · δ ${fix(m.delta / DEG, 0)}°`, `Loop · δ ${fix(m.delta / DEG, 0)}°`);
      sub = L('底圆转满一圈，提升从 +1 走到 −1；相对参考臂的这个负号让悖论端口变暗', 'One full base turn lifts +1 to −1; against the reference arm this sign darkens the paradox port');
      setRO(L('悖论端口 · 另一端口', 'paradox port · other port'), `${fix(m.pLoop, 4)} · ${fix(m.pOther, 4)}`, '', [
        [L('回路相位 δ = πτ', 'loop phase δ = πτ'), `${fix(m.delta / DEG, 1)}°`],
        [L('提升的点', 'lifted point'), `${nf(m.lift[0], 4)} ${m.lift[1] < 0 ? '−' : '+'} ${nf(Math.abs(m.lift[1]), 4)}i`],
        [L('X(I/2)X† − I/2 残差', 'X(I/2)X† − I/2 residual'), sci(m.deutschRes)],
        ['θ* · |cos θ* − θ*|', `${fix(m.cosRoot.theta, 10)} · ${sci(m.cosRoot.residual)}`]]);
      note = L(`孤立的 ψ 与 −ψ 给出同一个密度矩阵（差 ${sci(m.rayRes)}）：负号只有对着相干的参考臂才变成相消。X 不动 |+⟩⟨+|，却把 |0⟩⟨0| 移走（差 ${fix(m.zeroMoves, 3)}）。`, `An isolated ψ and −ψ give the same density matrix (difference ${sci(m.rayRes)}): the sign becomes cancellation only against a coherent reference arm. X fixes |+⟩⟨+| but moves |0⟩⟨0| (difference ${fix(m.zeroMoves, 3)}).`);
      key = `p ${fix(m.pLoop, 3)}`;
    }
    $('hudBig').textContent = big; $('hudSub').textContent = sub; $('roNote').innerHTML = note;
    $('roAside').textContent = L(D.name[0], D.name[1]);
    $('pillScene').querySelector('strong').textContent = L(D.name[0], D.name[1]);
    // the plain pill carries the key value; the amber pill only the current value on the rail
    $('pillWhat').querySelector('strong').textContent = key;
    $('pillKey').querySelector('strong').innerHTML = D.fmt(clock.t).replace(/<small>.*<\/small>/, '').trim();
    const html = LEG[sc].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== html) { $('legend').innerHTML = html; $('legend')._h = html; }
    syncControls();
  }

  /* ================= paint ================= */
  function compute() { return MATH[S.scene](); }
  const LAY = { 'born-handshake': layBorn, 'gram-symmetry': layGram };
  const DRAW = { 'boolean-illusion': drawBoolean, 'born-handshake': drawBorn, 'feynman-stationary': drawFeynman, 'tsvf-eraser': drawTsvf, 'gram-symmetry': drawGram, 'paradox-cancel': drawParadox };
  const paint = kit.painter(() => {
    const m = compute();
    drawText(m);
    hits = [];
    const box = freeBox(), lay = LAY[S.scene] ? LAY[S.scene](box) : null;
    if (lay && lay.sphere) { const mn = Math.min(box.W, box.H) || 1; opts.cx = lay.sphere.cx / (box.W || 1); opts.cy = lay.sphere.cy / (box.H || 1); opts.radius = lay.sphere.r / mn; }
    const ctx = stage.begin();
    drawnIn = cvBox();
    DRAW[S.scene](m, box, ctx, lay);
    stage.end();
    drawPlots(m);
  }, [$('stage'), $('plotA'), $('plotB')]);

  /* ================= controls ================= */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, rate: 0.2, step: 0.25, t: 0,
    format: (t) => SC[S.scene].fmt(t),
    onChange: (t) => { SC[S.scene].fromT(t); paint(); }
  });
  const leave = () => cards.mark(null);
  /** Move the quantity on the rail (pauses the clock). */
  function setRail(t) { leave(); clock.pause(); clock.set(clamp(t, 0, clock.max)); }
  function setScene(sc) {
    dragging = null;
    S.scene = sc;
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    const D = SC[sc];
    clock.pause(); clock.rate = D.rate; clock.step = D.step; clock.setMax(D.max, true); clock.set(D.toT(), true);
    opts.rotate = !!D.three;
    $('stage').classList.toggle('flat', !D.three);
    if (D.three) { stage.cam.yaw = sc === 'born-handshake' ? -0.42 : -0.62; stage.cam.pitch = sc === 'born-handshake' ? 0.22 : 0.32; stage.cam.zoom = 1; }
    paint();
  }
  const deg = (v) => `${fix(v, 0)}°`;
  const F = {
    th: kit.field($('fTh'), { fmt: deg, onInput: (v) => { leave(); S.th = v * DEG; paint(); } }),
    xi: kit.field($('fXi'), { fmt: (v) => `${v}° · a ${fix(Math.cos(v * DEG), 2)} b ${fix(Math.sin(v * DEG), 2)}`, onInput: (v) => { leave(); S.xi = v * DEG; paint(); } }),
    Delta: kit.field($('fDelta'), { fmt: deg, onInput: (v) => { leave(); S.Delta = v * DEG; paint(); } }),
    thB: kit.field($('fThB'), { fmt: deg, onInput: (v) => { leave(); S.thB = v * DEG; paint(); } }),
    chiPhi: kit.field($('fChiPhi'), { fmt: deg, onInput: (v) => { leave(); S.chiPhi = v * DEG; paint(); } }),
    k0: kit.field($('fK0'), { fmt: (v) => `${fix(v, 1)} · λ ${fix(TAU / v, 3)}`, onInput: (v) => { leave(); S.k0 = v; reRail(); } }),
    n1: kit.field($('fN1'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.n1 = v; reRail(); } }),
    n2: kit.field($('fN2'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.n2 = v; reRail(); } }),
    V: kit.field($('fV'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.V = v; paint(); } }),
    eta: kit.field($('fEta'), { fmt: (v) => `${fix(v, 0)}°`, onInput: (v) => { leave(); S.eta = v * DEG; paint(); } }),
    x: kit.field($('fX'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.x = v; S.reject = null; paint(); } }),
    y: kit.field($('fY'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.y = v; S.reject = null; paint(); } })
  };
  /** The feynman rail shows k / M: refresh its label when M may have changed. */
  function reRail() { clock.set(clock.t, true); paint(); }
  function syncControls() {
    const sc = S.scene, put = (f, v) => { if (Math.abs(f.value - v) > 1e-9) f.set(v); };
    if (sc === 'boolean-illusion') { put(F.th, Math.round(S.th / DEG)); put(F.xi, Math.round(S.xi / DEG)); put(F.Delta, Math.round(S.Delta / DEG) % 361); }
    else if (sc === 'born-handshake') { put(F.thB, Math.round(S.thB / DEG)); put(F.chiPhi, Math.round(S.chiPhi / DEG)); }
    else if (sc === 'feynman-stationary') { put(F.k0, Math.round(S.k0 * 10) / 10); put(F.n1, S.n1); put(F.n2, S.n2); meshChips.set(String(S.mesh), true); fanChips.set(S.fan, true); }
    else if (sc === 'tsvf-eraser') { put(F.V, S.V); put(F.eta, Math.round(S.eta / DEG)); }
    else if (sc === 'gram-symmetry') { put(F.x, Math.round(S.x * 100) / 100); put(F.y, Math.round(S.y * 100) / 100); }
    for (const id of ['boolSnaps', 'bornSnaps', 'tsvfSnaps', 'gramSnaps', 'loopSnaps']) $(id).querySelectorAll('[data-snap]').forEach((b) => b.setAttribute('aria-pressed', String(id === 'gramSnaps' && b.dataset.snap === 'swap' && S.swap)));
  }
  const meshChips = kit.chips($('mChips'), 'mesh', (v) => { leave(); S.mesh = v === 'auto' ? 'auto' : Number(v); reRail(); });
  const fanChips = kit.chips($('fanChips'), 'fan', (v) => { leave(); S.fan = v; reRail(); });
  let swapTween = null;
  function setSwap(on, ms) {
    S.swap = !!on; S.reject = null;
    if (swapTween) swapTween.cancel();
    const u0 = S.swapU, u1 = S.swap ? 1 : 0;
    swapTween = kit.tween(ms == null ? 650 : ms, (e) => { S.swapU = u0 + (u1 - u0) * e; paint(); }, () => { swapTween = null; });
  }
  kit.chips($('boolSnaps'), 'snap', (v) => {
    leave();
    if (v === 'orth') S.th = 90 * DEG;
    else if (v === 'anti') { S.Delta = 180 * DEG; S.xi = 45 * DEG; }
    else if (v === 'pinch') { clock.pause(); clock.set(1); }
    paint();
  });
  kit.chips($('bornSnaps'), 'snap', (v) => { leave(); S.thB = Number(v) * DEG; paint(); });
  kit.chips($('tsvfSnaps'), 'snap', (v) => { setRail(v === 'which' ? 0 : PI / 2); });
  kit.chips($('loopSnaps'), 'snap', (v) => { setRail(Number(v)); });
  kit.chips($('gramSnaps'), 'snap', (v) => {
    leave();
    if (v === 'swap') { setSwap(!S.swap); return; }
    S.reject = null;
    if (v === 'default') { S.x = 0.2; S.y = 0.6; clock.pause(); clock.set(0); }
    else if (v === 'symmetric') { S.x = 0.5; S.y = 0.5; const c = gramCheck(0.5, 0.5, 0.2); setGramPhi(c.phi); }
    else if (v === 'ortho') { S.x = 0; S.y = 0; setGramPhi(PI / 2); }
    else if (v === 'flat') { setGramPhi(0); }
    else if (v === 'invalid') {
      const c = gramCheck(1, 1, -1);
      S.reject = { x: 1, y: 1, z: -1, det: c.det, reason: c.reason };
      if (!TRV.still) TRV.toast($('toast'), L(`(1, 1, −1)：det G = <b>${fix(c.det, 2)}</b> &lt; 0，不是格拉姆矩阵，已拒绝`, `(1, 1, −1): det G = <b>${fix(c.det, 2)}</b> &lt; 0, not a Gram matrix: rejected`));
    }
    paint();
  });
  function setGramPhi(phi) { clock.pause(); clock.set(((phi - PHI0) % TAU + TAU) % TAU); }
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys(Object.fromEntries(SCENES.map((sc, i) => [String(i + 1), () => { leave(); setScene(sc); }])));

  /* ================= experiment cards ================= */
  const NOTES = {
    'boolean-illusion': ['三块板各给出一个零。左：B 与 A 正交，青色的影子为零，品红的补分量与面积却满格；中：两臂等幅反相，青色端口全暗，品红端口全亮，总和仍是 1；右：时间轴把品红的相干项捏掉，两个端口都回到 ½。', 'Three panels, three zeros. Left: B ⟂ A, the cyan shadow is zero while the magenta complement and area are full. Middle: equal arms in opposite phase leave the cyan port dark and the magenta port bright, total 1. Right: the rail pinches the magenta coherence away and both ports return to ½.'],
    'born-handshake': ['左边球上的两条射线一动不动；右边青色的去程 ⟨φ|ψ⟩ 随相位转，紫色的回程 ⟨ψ|φ⟩ 反着转，两者之积始终停在实轴上的同一点 w = cos²(θ/2) = ½。', 'On the sphere the two rays never move. In the compass the cyan forward ⟨φ|ψ⟩ turns with the phase and the violet echo ⟨ψ|φ⟩ turns the other way; their product stays at one point of the real axis, w = cos²(θ/2) = ½.'],
    'feynman-stationary': ['从 A 经界面上每一点到 B 的路径一条条加进来：离驻点的品红箭头绕成螺旋、近乎抵消；驻点附近的青色箭头排成直线，撑起总振幅。驻点满足 n₁ sin θ₁ = n₂ sin θ₂。', 'Paths from A through each point of the interface to B are added one by one: off the stationary point the magenta arrows curl into spirals and nearly cancel; near it the cyan arrows line up and carry the total. The stationary point obeys n₁ sin θ₁ = n₂ sin θ₂.'],
    'tsvf-eraser': ['时间轴把未来的标记基从测路径（β = 0）转到擦除（β = 90°）：青色与品红的联合分布分出两组相反的条纹，叠起来的总高度一格不动。右下的弱值 tan η 在 η = ±90° 处无定义。', 'The rail turns the future marker basis from which-path (β = 0) to eraser (β = 90°): the cyan and magenta joint distributions split into opposite fringes, while their stacked total does not move. At bottom right the weak value tan η is undefined at η = ±90°.'],
    'gram-symmetry': ['对调 A_past 与 C_future：矩阵里青色的 x 与紫色的 y 换位，截面上的点翻到对角线另一侧，G′ ≠ G；行列式 0.614 与三个特征值都不变。时间轴让 C 绕 B 转一圈，两条曲线始终重合。', 'Swap A_past and C_future: the cyan x and the violet y trade places in the matrix and the point in the slice flips across the diagonal, so G′ ≠ G; the determinant 0.614 and the three eigenvalues stay. The rail turns C once about B, and the two curves coincide throughout.'],
    'paradox-cancel': ['底圆转满一圈，提升的点只走半圈，从 +1 到 −1：回路臂相对参考臂差一个负号，悖论端口变暗、另一端口全亮；再转一圈回到 +1。下方：X 的不动点是一整条线，余弦只有 θ* ≈ 0.739。', 'One full base turn lifts the point only half way, +1 to −1: the loop arm differs from the reference arm by a sign, the paradox port goes dark and the other is fully lit; a second turn returns to +1. Below: X fixes a whole segment, cosine only θ* ≈ 0.739.']
  };
  // every card plays when picked; `still` is the rail value its still (cover, cited figure) and the opening full page show
  const PRESETS = {
    'boolean-illusion': { still: 1 }, 'born-handshake': { still: DEF.chiPsi }, 'feynman-stationary': { still: 1 },
    'tsvf-eraser': { still: PI / 2 }, 'gram-symmetry': { still: 0 }, 'paradox-cancel': { still: 1 }
  };
  let booting = true;
  /** Start a card: play for the reader, or jump to the frame that a still should show. */
  function run(play, still, start) {
    if (TRV.still || (booting && !TRV.embed)) { clock.set(still === 'end' ? clock.max : still); return; }
    clock.set(start == null ? 0 : start);
    if (play) { if (booting) kit.autoplay(clock, $('stage')); else clock.play(); }
  }
  function applyPreset(id) {
    const still = PRESETS[id].still;
    S.reject = null;
    if (id === 'boolean-illusion') { Object.assign(S, { th: DEF.th, xi: DEF.xi, Delta: DEF.Delta, gamma: 1 }); setScene(id); run(true, still, 0); }
    else if (id === 'born-handshake') { Object.assign(S, { thB: DEF.thB, chiPhi: 0, chiPsi: DEF.chiPsi }); setScene(id); run(true, still, 0); }
    else if (id === 'feynman-stationary') { Object.assign(S, { k0: DEF.k0, n1: 1, n2: 1.5, mesh: 'auto', fan: 'exact' }); setScene(id); run(true, still, 0); }
    else if (id === 'tsvf-eraser') { Object.assign(S, { V: 1, eta: DEF.eta }); setScene(id); run(true, still, 0); }
    else if (id === 'gram-symmetry') { Object.assign(S, { x: DEF.x, y: DEF.y }); setScene(id); setSwap(true, TRV.still || booting ? 0 : 700); run(true, still, 0); }
    else if (id === 'paradox-cancel') { setScene(id); run(true, still, 0); }
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖动舞台上的箭头与交点，拖滑块，或换一张卡。数字键 1–6 换场景。', 'Free play: drag the arrows and the crossing on the stage, move the sliders, or pick another card. Keys 1–6 switch scenes.']
  });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ================= read-only probe ================= */
  const PARAMS = ['th', 'xi', 'Delta', 'gamma', 'thB', 'chiPsi', 'chiPhi', 'k0', 'n1', 'n2', 'mesh', 'fan', 'kFrac', 'beta', 'V', 'eta', 'x', 'y', 'phi', 'swap', 'tau'];
  function publicMath(sc) {
    const m = MATH[sc]();
    if (sc === 'feynman-stationary') { const { s, ph, band, Z, L: _L, ...rest } = m; return rest; }
    if (sc === 'tsvf-eraser') { const { phi, jp, jm, tot, direct, ...rest } = m; return rest; }
    return m;
  }
  function snapshot() {
    const params = {}; PARAMS.forEach((k) => { params[k] = S[k]; });
    const math = {}; SCENES.forEach((sc) => { math[sc] = publicMath(sc); });
    return JSON.parse(JSON.stringify({ preset: cards.current, scene: S.scene, lang: TRV.lang(), t: clock.t, max: clock.max, playing: clock.playing, swapU: S.swapU, reject: S.reject, phi0: PHI0, params, math }));
  }
  function setState(patch) {
    patch = patch || {};
    const out = { ok: true, rejected: [] }, bad = (k, why) => { out.ok = false; out.rejected.push(why ? `${k}: ${why}` : k); };
    let touched = false;
    if (patch.preset != null) { if (SCENES.includes(patch.preset)) cards.pick(patch.preset); else bad('preset'); }
    if (patch.scene != null) { if (SCENES.includes(patch.scene)) { if (patch.scene !== S.scene) { leave(); setScene(patch.scene); } } else bad('scene'); }
    // stop the clock first: pausing reports its time, which would overwrite the quantity on the rail
    clock.pause();
    const num = (k, lo, hi, wrap) => {
      if (patch[k] == null) return;
      let v = Number(patch[k]);
      if (wrap && isFinite(v)) v = ((v % TAU) + TAU) % TAU;
      if (!isFinite(v) || v < lo - 1e-12 || v > hi + 1e-12) { bad(k, 'out of range'); return; }
      S[k] = clamp(v, lo, hi); touched = true;
    };
    num('th', 0, PI); num('xi', 0, PI / 2); num('Delta', 0, TAU, true); num('gamma', 0, 1);
    num('thB', 0, PI); num('chiPsi', 0, TAU, true); num('chiPhi', 0, TAU, true);
    num('k0', TAU, 40 * PI); num('n1', 1, 2.5); num('n2', 1, 2.5); num('kFrac', 0, 1);
    if (patch.mesh != null) { if (patch.mesh === 'auto' || MESH.includes(Number(patch.mesh))) { S.mesh = patch.mesh === 'auto' ? 'auto' : Number(patch.mesh); touched = true; } else bad('mesh'); }
    if (patch.fan != null) { if (['exact', 'quadratic', 'roots'].includes(patch.fan)) { S.fan = patch.fan; touched = true; } else bad('fan'); }
    num('beta', 0, PI / 2); num('V', 0, 1); num('eta', -PI / 2, PI / 2);
    // the Gram triple is checked as a whole: a rejected (x, y, z) leaves the state as it was
    if (patch.x != null || patch.y != null || patch.z != null || patch.phi != null) {
      const x = patch.x == null ? S.x : Number(patch.x), y = patch.y == null ? S.y : Number(patch.y);
      if (!isFinite(x) || !isFinite(y) || Math.abs(x) > 1 || Math.abs(y) > 1) bad('x, y', 'outside [−1, 1]');
      else if (patch.z != null) {
        const c = gramCheck(x, y, Number(patch.z));
        if (!c.ok) { bad('z', c.reason); S.reject = { x, y, z: Number(patch.z), det: c.det, reason: c.reason }; }
        else { S.x = x; S.y = y; S.reject = null; if (c.phi != null) S.phi = c.phi; touched = true; }
      } else { S.x = x; S.y = y; S.reject = null; if (patch.phi != null && isFinite(Number(patch.phi))) S.phi = ((Number(patch.phi) % TAU) + TAU) % TAU; touched = true; }
    }
    if (patch.swap != null) { S.swap = !!patch.swap; S.swapU = S.swap ? 1 : 0; touched = true; }
    num('tau', 0, 2);
    if (touched) leave();
    clock.pause(); clock.set(SC[S.scene].toT());
    kit.flush();
    out.state = snapshot();
    return out;
  }
  const api = {
    get state() { return snapshot(); },
    setState,
    seek: (t) => { clock.pause(); clock.set(t); kit.flush(); },
    /** Move a playing clock forward without stopping it (for the suite: no need to wait for a whole run). */
    advance: (t) => { if (clock.playing && clock.t < t) clock.set(t); },
    /** The current path fan: crossings, phases, stationary flags and the partial sums (feynman-stationary). */
    paths: () => { const m = mathFeynman(S); return { M: m.M, k0: m.k0, n1: m.n1, n2: m.n2, fan: m.fan, s: Array.from(m.s), ph: Array.from(m.ph), band: Array.from(m.band), A: m.A, sStar: m.sStar }; },
    /** The 128 bins of the eraser: joint, total and direct marginal (tsvf-eraser). */
    screen: () => { const m = mathTsvf(S); return { beta: m.beta, V: m.V, q: m.q, phi: m.phi.slice(), jointPlus: m.jp.slice(), jointMinus: m.jm.slice(), total: m.tot.slice(), direct: m.direct.slice() }; },
    instrument: (seed) => instrument(seed == null ? 7 : seed, S.beta, S.V),
    weak: (eta) => weak(eta == null ? S.eta : eta),
    gramCheck,
    fates: () => JSON.parse(JSON.stringify(FATES)),
    /** Viewport coordinates of a handle, or a data point in its current 2D plot, without changing state. */
    at: (key, point) => {
      current();
      const h = hits.find((q) => q.key === key); if (!h) return null;
      const b = h.plot ? h.plot.viewport : $('cv').getBoundingClientRect();
      return point && h.plot ? [b.left + h.plot.X(point[0]), b.top + h.plot.Y(point[1])] : [b.left + h.x, b.top + h.y];
    }
  };
  window.__HANDSHAKE_LAB__ = api;
  window.HANDSHAKE_DEBUG = api;
  window.TRV_THUMB = () => {
    if (swapTween) swapTween.cancel();
    Object.assign(S, { thB: DEF.thB, chiPhi: 0 });
    setScene('born-handshake'); clock.set(DEF.chiPsi);
    stage.cam.yaw = -0.42; stage.cam.pitch = 0.22; paint.now();
  };
  cards.pick(cards.initial('boolean-illusion'));
  booting = false;
  paint();
})();
