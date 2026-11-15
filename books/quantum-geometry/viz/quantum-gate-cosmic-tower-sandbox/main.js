/* GATE//TOWER · 量子门极小圆弧体与六层宇宙概念塔 · The quantum-gate trihedron and the six-tier concept tower
   The stage shows one tier of the tower in its physics costume (lens off) or the bare gate trihedron that every tier
   shares (lens on), or the whole tower of six tiers.
     L1 single  the Bloch sphere, the gates U_y(ε), U_x(ε) from the north pole N, the right spherical triangle
                ΔT_ε = N A B (A = U_y N, B = U_x N, legs ε), the four arcs of C = U_x† U_y† U_x U_y from N and the
                residual axis n of C; tr C / 2 = 1 − 2 sin⁴(ε/2) is multiplied out from 2 × 2 complex matrices
     L1 pair    the real slice of two-qubit states (S³) projected stereographically: product states det c = 0 form a
                torus, the Bell circle lies inside it; G(η) = exp(−i(η/2)(XY + YX)/2) takes |00⟩ to
                cos(η/2)|00⟩ + sin(η/2)|11⟩, concurrence |sin η|
     L0 L2–L5   comparison parallelogram and volume, a Jordan–Wigner chain, an interference sheet, the light cone,
                the Möbius band with a normal carried round 4π
   The rail is the beat s ∈ [0, 4] of a tier (Λ⁰ point, Λ¹ line, Λ² face, Λ³ volume ≡ Λ⁰ of the next tier); on the
   climbing cards a full lap of the rail moves up one tier, and L5 wraps to L0. The amber handle sets ε.
   Drawn with kit.solid (three.js, fetched by kit.js). Read-only probe: window.GATE_TOWER_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, sgn, clamp } = kit;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180, O = [0, 0, 0], EX = [1, 0, 0], EY = [0, 1, 0], EZ = [0, 0, 1];
  const BEATS = 4, TIERS = 6, DIMS = [1, 3, 3, 1];
  const sph = (t, p) => [Math.sin(t) * Math.cos(p), Math.sin(t) * Math.sin(p), Math.cos(t)];
  const arcPts = (a, b, n = 32) => Array.from({ length: n + 1 }, (_, i) => v3.slerp(a, b, i / n));
  const turnPts = (p, axis, ang, n = 32) => Array.from({ length: n + 1 }, (_, i) => v3.rot(p, axis, ang * i / n));
  const lift = (pts, r) => pts.map((p) => v3.scale(p, r));
  const tangent = (p, q) => v3.unit(v3.sub(q, v3.scale(p, v3.dot(p, q))));
  const angleAt = (p, a, b) => Math.acos(clamp(v3.dot(tangent(p, a), tangent(p, b)), -1, 1));
  const det3 = (M) => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);

  /* ---------- complex matrices (entries [re, im]) ---------- */
  const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]], csub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]], cabs = (a) => Math.hypot(a[0], a[1]);
  const mmul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, a, k) => cadd(s, cmul(a, B[k][j])), [0, 0])));
  const mdag = (A) => A[0].map((_, j) => A.map((row) => [row[j][0], -row[j][1]]));
  const madd = (A, B) => A.map((row, i) => row.map((a, j) => cadd(a, B[i][j])));
  const msub = (A, B) => A.map((row, i) => row.map((a, j) => csub(a, B[i][j])));
  const mscale = (A, z) => A.map((row) => row.map((a) => cmul(a, z)));
  const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => [i === j ? 1 : 0, 0]));
  const kron = (A, B) => { const n = A.length, m = B.length; return Array.from({ length: n * m }, (_, i) => Array.from({ length: n * m }, (_, j) => cmul(A[Math.floor(i / m)][Math.floor(j / m)], B[i % m][j % m]))); };
  const maxAbs = (A) => A.reduce((s, row) => Math.max(s, ...row.map(cabs)), 0);
  const PX = [[[0, 0], [1, 0]], [[1, 0], [0, 0]]], PY = [[[0, 0], [0, -1]], [[0, 1], [0, 0]]], PZ = [[[1, 0], [0, 0]], [[0, 0], [-1, 0]]];
  /** The Pauli matrix of a vector a (B_formula_core): [[a₂, a₀ − i a₁], [a₀ + i a₁, −a₂]]. */
  const Bvec = (a) => [[[a[2], 0], [a[0], -a[1]]], [[a[0], a[1]], [-a[2], 0]]];
  /** U = cos(θ/2) I − i sin(θ/2) B(n). */
  const gateU = (n, th) => madd(mscale(eye(2), [Math.cos(th / 2), 0]), mscale(Bvec(n), [0, -Math.sin(th / 2)]));
  /** Bloch vector of a 2 × 2 Hermitian M = (tr M) I / 2 + b·σ / 2 … here of b·σ itself: b = (Re M₀₁, −Im M₀₁, M₀₀). */
  const blochOf = (M) => [M[0][1][0], -M[0][1][1], M[0][0][0]];

  /* ---------- the gate trihedron and the commutator (L1, and the unified lens of every tier) ---------- */
  const gateCache = new Map();
  function gateModel(epsDeg) {
    const key = String(epsDeg);
    if (gateCache.has(key)) return gateCache.get(key);
    const e = epsDeg * DEG, s = Math.sin(e / 2), c = Math.cos(e / 2);
    const Ux = gateU(EX, e), Uy = gateU(EY, e);
    const C = mmul(mmul(mdag(Ux), mdag(Uy)), mmul(Ux, Uy));
    const traceHalf = (C[0][0][0] + C[1][1][0]) / 2, closed = 1 - 2 * s ** 4;
    const half = Math.acos(clamp(closed, -1, 1));
    // i (C − a₀ I) = sin(Φ/2) n·σ: read n back through B
    const Mi = mscale(msub(C, mscale(eye(2), [traceHalf, 0])), [0, 1]), av = blochOf(Mi);
    const axisClosed = v3.unit([-s, s, c]);
    const axis = v3.len(av) > 1e-13 ? v3.unit(av) : axisClosed;
    const N = EZ, A = v3.rot(N, EY, e), B = v3.rot(N, EX, e);
    const path = [N]; for (const [ax, sgnA] of [[EY, 1], [EX, 1], [EY, -1], [EX, -1]]) path.push(v3.rot(path[path.length - 1], ax, sgnA * e));
    const legs = [[path[0], EY, e], [path[1], EX, e], [path[2], EY, -e], [path[3], EX, -e]];
    const omega = 2 * Math.atan(Math.tan(e / 2) ** 2);
    const omegaAngles = e < 1e-6 ? 0 : angleAt(N, A, B) + angleAt(A, B, N) + angleAt(B, N, A) - PI;
    const gram = [N, A, B].map((u) => [N, A, B].map((w) => v3.dot(u, w)));
    const r = {
      epsDeg, e, s, c, C, traceHalf, closed, traceDiff: Math.abs(traceHalf - closed), half, Phi: 2 * half,
      axis, axisClosed, axisDiff: v3.len(v3.sub(axis, axisClosed)), N, A, B, path, legs, gap: Math.acos(clamp(v3.dot(path[4], N), -1, 1)),
      endByAxis: v3.rot(N, axis, 2 * half), omega, omegaAngles, quad: e * e / 2, detG: det3(gram), detGClosed: Math.sin(e) ** 4,
      hyp: Math.acos(clamp(Math.cos(e) ** 2, -1, 1)), weyl: Math.max(maxAbs(madd(mmul(PZ, PX), mmul(PX, PZ))), maxAbs(msub(mmul(PX, PX), eye(2))), maxAbs(msub(mmul(PZ, PZ), eye(2))))
    };
    gateCache.set(key, r);
    if (gateCache.size > 200) gateCache.delete(gateCache.keys().next().value);
    return r;
  }

  /* ---------- the entangling gate and the Segre torus (L1, card 2) ---------- */
  /** Eigenvalues of a symmetric 3 × 3 matrix (Jacobi). */
  function eig3(S) {
    const a = S.map((r) => r.slice());
    for (let sweep = 0; sweep < 30; sweep++) {
      let off = 0; for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) off += a[i][j] ** 2;
      if (off < 1e-30) break;
      for (let p = 0; p < 3; p++) for (let q = p + 1; q < 3; q++) {
        if (Math.abs(a[p][q]) < 1e-300) continue;
        const th = (a[q][q] - a[p][p]) / (2 * a[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), cs = 1 / Math.sqrt(t * t + 1), sn = t * cs;
        for (let k = 0; k < 3; k++) { const x = a[k][p], y = a[k][q]; a[k][p] = cs * x - sn * y; a[k][q] = sn * x + cs * y; }
        for (let k = 0; k < 3; k++) { const x = a[p][k], y = a[q][k]; a[p][k] = cs * x - sn * y; a[q][k] = sn * x + cs * y; }
      }
    }
    return [a[0][0], a[1][1], a[2][2]].sort((x, y) => y - x);
  }
  const HXY = mscale(madd(kron(PX, PY), kron(PY, PX)), [0.5, 0]), HXY2 = mmul(HXY, HXY);
  const segreCache = new Map();
  function segreModel(etaDeg) {
    const key = String(etaDeg);
    if (segreCache.has(key)) return segreCache.get(key);
    const h = etaDeg * DEG, th = h / 2;
    // exp(−iθH) = I + (cos θ − 1) H² − i sin θ H, since H³ = H
    const G = madd(madd(eye(4), mscale(HXY2, [Math.cos(th) - 1, 0])), mscale(HXY, [0, -Math.sin(th)]));
    const psi = G.map((row) => row[0]);                       // G |00⟩
    const conc = 2 * cabs(csub(cmul(psi[0], psi[3]), cmul(psi[1], psi[2])));
    const rho = psi.map((a) => psi.map((b) => cmul(a, [b[0], -b[1]])));
    const rhoA = [[cadd(rho[0][0], rho[1][1]), cadd(rho[0][2], rho[1][3])], [cadd(rho[2][0], rho[3][1]), cadd(rho[2][2], rho[3][3])]];
    const purity = mmul(rhoA, rhoA), linEntropy = 1 - (purity[0][0][0] + purity[1][1][0]);
    const P = [PX, PY, PZ], ex = (M) => { const v = mmul(M, psi.map((a) => [a])); return psi.reduce((s, a, i) => s + cmul([a[0], -a[1]], v[i][0])[0], 0); };
    const T = P.map((a) => P.map((b) => ex(kron(a, b))));
    const TT = [0, 1, 2].map((i) => [0, 1, 2].map((j) => T[0][i] * T[0][j] + T[1][i] * T[1][j] + T[2][i] * T[2][j]));
    const ev = eig3(TT), chsh = 2 * Math.sqrt(Math.max(0, ev[0] + ev[1]));
    const rA = [2 * rhoA[0][1][0], -2 * rhoA[0][1][1], rhoA[0][0][0] - rhoA[1][1][0]];
    const re = psi.map((a) => a[0]), imMax = Math.max(...psi.map((a) => Math.abs(a[1])));
    const sq = Math.SQRT1_2, p = (re[0] + re[3]) * sq, t = (re[1] - re[2]) * sq, q = (re[0] - re[3]) * sq, r = (re[1] + re[2]) * sq;
    const point = [p / (1 - r), t / (1 - r), q / (1 - r)];
    const bellMarginal = maxAbs(msub(rhoA, mscale(eye(2), [0.5, 0])));
    const out = { etaDeg, h, psi, conc, concClosed: Math.abs(Math.sin(h)), linEntropy, linClosed: 0.5 * Math.sin(h) ** 2, chsh, chshClosed: 2 * Math.sqrt(1 + Math.sin(h) ** 2),
      rA, rALen: v3.len(rA), point, imMax, det: re[0] * re[3] - re[1] * re[2], bellMarginal };
    segreCache.set(key, out);
    if (segreCache.size > 200) segreCache.delete(segreCache.keys().next().value);
    return out;
  }
  /** A point of the Segre torus (product states): (p, t, q, r) = (cos α, sin α, cos β, sin β)/√2, projected. */
  const torusPt = (al, be) => { const d = Math.SQRT2 - Math.sin(be); return [Math.cos(al) / d, Math.sin(al) / d, Math.cos(be) / d]; };

  /* ---------- the invariants of the other tiers ---------- */
  const SIGMA_MINUS = [[[0, 0], [1, 0]], [[0, 0], [0, 0]]];   // |0⟩⟨1|
  const CAR = (() => {
    const n = 3, op = (j) => { let M = [[[1, 0]]]; for (let i = 0; i < n; i++) M = kron(M, i < j ? PZ : i === j ? SIGMA_MINUS : eye(2)); return M; };
    const cs = [0, 1, 2].map(op), I8 = eye(8);
    let diag = 0, cross = 0;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const ac = madd(mmul(cs[i], mdag(cs[j])), mmul(mdag(cs[j]), cs[i]));
      if (i === j) diag = Math.max(diag, maxAbs(msub(ac, I8))); else cross = Math.max(cross, maxAbs(ac));
    }
    return { diag, cross, n };
  })();
  /** Finite Poisson summation on ZMod m with H = ⟨m/|H|⟩, for the sampled wave of amplitude f. */
  function poisson(f, m = 12, step = 4) {
    const H = [], Hp = [];
    for (let j = 0; j < m; j += step) H.push(j);
    for (let k = 0; k < m; k++) if (H.every((h) => ((h * k) % m) === 0)) Hp.push(k);
    const dft = (k) => f.reduce((s, x, j) => cadd(s, cmul(x, [Math.cos(-TAU * j * k / m), Math.sin(-TAU * j * k / m)])), [0, 0]);
    const lhs = H.reduce((s, h) => cadd(s, f[h]), [0, 0]), rhsSum = Hp.reduce((s, k) => cadd(s, dft(k)), [0, 0]);
    const rhs = cmul([H.length / m, 0], rhsSum);
    return { H, Hp, lhs, rhs, residual: cabs(csub(lhs, rhs)) };
  }
  const entropyOf = (p) => (p > 0 && p < 1 ? -(p * Math.log(p) + (1 - p) * Math.log(1 - p)) : 0);
  /** One pinching step after U = U_x(ε) on ρ₀ = |0⟩⟨0|: ΔS and D(Uρ₀U† ‖ 𝒫(Uρ₀U†)), computed separately. */
  function entropyStep(epsDeg) {
    const U = gateU(EX, epsDeg * DEG), rho0 = [[[1, 0], [0, 0]], [[0, 0], [0, 0]]];
    const r = mmul(mmul(U, rho0), mdag(U)), p0 = r[0][0][0], p1 = r[1][1][0];
    const dS = entropyOf(p1) - 0;                      // S(ρ₀) = 0 (pure)
    // D(ψ ‖ σ) = −S(ψ) − tr ψ log σ with ψ pure (S = 0) and σ diagonal (p₀, p₁)
    const D = -((p0 > 0 ? p0 * Math.log(p0) : 0) + (p1 > 0 ? p1 * Math.log(p1) : 0));
    return { dS, D, diff: Math.abs(dS - D) };
  }
  const I3 = mmul(mmul(PX, PY), PZ), I3sq = msub(mmul(I3, I3), mscale(eye(2), [-1, 0]));
  /** The cosine fixed point by Newton's method: the double nearest θ* = cos θ*. */
  const DOTTIE = (() => { let x = 0.7; for (let i = 0; i < 60; i++) x -= (Math.cos(x) - x) / (-Math.sin(x) - 1); return x; })();
  const spinorRe = (phi) => { const U = gateU(EZ, phi); return U[0][0][0]; };   // Re U(φ)₀₀ = cos(φ/2)
  const SPINOR_SIGNS = [Math.round(spinorRe(TAU) * 1e12) / 1e12, Math.round(spinorRe(2 * TAU) * 1e12) / 1e12];

  /* ---------- names ---------- */
  const TIER = [
    ['L0 原语 CMP', 'L0 comparison primitive'], ['L1 量子门', 'L1 quantum gate'], ['L2 粒子', 'L2 particle'],
    ['L3 场与波', 'L3 field & wave'], ['L4 时空', 'L4 spacetime'], ['L5 觉知 4π ↺ CMP', 'L5 awareness 4π ↺ CMP']
  ];
  const GRADE = [['Λ⁰ 点 / 粒子', 'Λ⁰ point / particle'], ['Λ¹ 线 / 路径', 'Λ¹ line / path'], ['Λ² 面 / 干涉波', 'Λ² face / interference wave'], ['Λ³ 体 / 连续场', 'Λ³ volume / continuous field']];
  const GRADE_SHORT = ['Λ⁰', 'Λ¹', 'Λ²', 'Λ³'];
  const tierName = (l) => L(...TIER[l]);

  /* ---------- state ---------- */
  const S = { tier: 1, s: 2, eps: 45, lens: false, lensMix: 0, scene: 'focus', pair: false, plot: 'comm', climb: false, camFit: [-0.62, 0.42] };
  const beatOf = (s) => Math.min(3, Math.floor(s + 1e-9));
  const phiOf = (s) => PI * s;

  function model() {
    const g = gateModel(S.eps), sg = segreModel(S.eps), beat = beatOf(S.s);
    const poissonF = Array.from({ length: 12 }, (_, j) => [waveH(-1.2 + 2.4 * j / 12, 0, g.e), 0]);
    const lag = (() => { const a = [1, 0, 0], b = [Math.cos(g.e), Math.sin(g.e), 0], d = v3.dot(a, b), x = v3.cross(a, b); return Math.abs(d * d + v3.dot(x, x) - 1); })();
    return { g, sg, beat, phi: phiOf(S.s), poisson: poisson(poissonF), entropy: entropyStep(S.eps), lag, car: CAR, I3sq: maxAbs(I3sq) };
  }

  /* ---------- the stage ---------- */
  const stageEl = $('stage');
  if (TRV.still) stageEl.classList.add('still');
  const YAW0 = -0.62, PITCH0 = 0.42;
  const options = { canvas: $('cv'), yaw: YAW0, pitch: PITCH0, wheel: false, radius: 0.34, cx: 0.5, cy: 0.5, onChange: () => paint() };
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
    for (const el of [$('hudTl'), $('tierChips'), $('legend')]) { const b = boxOf(el, sr); if (b && el.textContent.trim()) out.push(b); }
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
  let overlayCtx = null;
  function leadCtx() {
    if (TRV.thumbMode) return null;
    const ov = sc.overlay(), dpr = TRV.fitCanvas(ov), c = ov.getContext('2d');
    c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, sc.W, sc.H);
    c.strokeStyle = TRV.palette.dim; c.globalAlpha = 0.6; c.lineWidth = 0.8;
    overlayCtx = c; return c;
  }

  /* ---------- drawing helpers: a costume is drawn through a placement T = { k, at, s, w, mini } ---------- */
  const P = () => TRV.palette;
  const W = (T, px) => px * T.w;
  const place = (k, c, s, mini) => ({ k, at: (p) => v3.add(c, v3.scale(p, s)), s, w: mini ? 0.62 : 1, mini, c });
  const emph = (beat, k, on = 1, off = 0.55) => (beat === k ? on : off);

  /** L1 · single qubit: the Bloch sphere, the gate arcs, the cap ΔT_ε, the commutator loop and its residual axis. */
  function drawBloch(T, g, beat, lab) {
    const p = P(), at = T.at;
    sc.surface(`${T.k}-bloch`, (u, v) => at(sph(u, v)), { u: [0, PI], v: [0, TAU], nu: T.mini ? 20 : 40, nv: T.mini ? 32 : 72,
      colors: [p.panelEdge, p.lineHot, p.sigma], value: (u) => Math.cos(u), range: [-1.1, 2.3], grid: T.mini ? false : { every: [5, 9], color: p.cyan, alpha: 0.22 }, pick: !T.mini });
    if (g.e > 0.5 * DEG) {
      sc.surface(`${T.k}-cap`, (u, v) => at(v3.scale(v3.unit(v3.add(v3.scale(g.N, 1 - u), v3.scale(v3.add(v3.scale(g.A, 1 - v), v3.scale(g.B, v)), u))), 1.006)),
        { u: [0, 1], v: [0, 1], nu: 14, nv: 14, color: p.magenta, grid: T.mini ? false : { every: [7, 7], color: p.ink, alpha: 0.22 }, pick: false });
      const hw = W(T, beat === 1 ? 6.2 : 4.6);
      sc.tube(`${T.k}-uy`, lift(arcPts(g.N, g.A, 28), 1.014).map(at), { color: p.cyan, width: hw, glow: beat === 1 ? 0.5 : 0.25 });
      sc.tube(`${T.k}-ux`, lift(arcPts(g.N, g.B, 28), 1.014).map(at), { color: p.cyan, width: hw, glow: beat === 1 ? 0.5 : 0.25 });
      if (!T.mini) {
        sc.arrow(at(v3.scale(v3.slerp(g.N, g.A, 0.82), 1.014)), at(v3.scale(g.A, 1.014)), { color: p.cyan, width: 2, headSize: 11 });
        sc.arrow(at(v3.scale(v3.slerp(g.N, g.B, 0.82), 1.014)), at(v3.scale(g.B, 1.014)), { color: p.cyan, width: 2, headSize: 11 });
        sc.line(lift(arcPts(g.A, g.B, 28), 1.012).map(at), { color: p.cyan, width: 1.4, alpha: 0.75 });
        // the commutator word from N: U_y, U_x, U_y†, U_x† (dashed for the inverses); the gap back to N is magenta
        g.legs.forEach(([q, ax, ang], i) => sc.line(lift(turnPts(q, ax, ang, 24), 1.02).map(at), { color: p.ink, width: 2, dash: i >= 2 ? [5, 4] : undefined, alpha: 0.95 }));
        if (g.gap > 0.2 * DEG) sc.tube(`${T.k}-gap`, lift(arcPts(g.path[4], g.N, 16), 1.024).map(at), { color: p.magenta, width: 3.4, glow: 0.4 });
        sc.bead(at(v3.scale(g.path[4], 1.024)), { key: 'end', color: p.magenta, r: 4.2 });
      }
    }
    // the residual axis of C and the turn Φ about it (violet: axis, rotor)
    const tip = v3.scale(g.axis, T.mini ? 1.4 : 1.42);
    sc.tube(`${T.k}-axis`, [at(v3.scale(g.axis, 0.99)), at(tip)], { color: p.violet, width: W(T, beat === 3 ? 6 : 4.4), glow: beat === 3 ? 0.55 : 0.3 });
    if (!T.mini) {
      sc.arrow(at(v3.scale(g.axis, 1.3)), at(v3.scale(g.axis, 1.5)), { color: p.violet, width: 3, headSize: 13 });
    }
    // the state at N (the current state: amber)
    sc.bead(at(v3.scale(g.N, 1.03)), { key: `${T.k}-state`, color: p.amber, r: T.mini ? 3.4 : beat === 0 ? 6.4 : 5.2 });
    if (!T.mini && beat === 0) sc.ring(at(v3.scale(g.N, 1.03)), { key: `${T.k}-state-ring`, color: p.amber, r: 12, normal: g.N });
    if (lab) {
      want('N', at(v3.scale(g.N, 1.03)), 'N = |0⟩', 'raw ink backed', { pri: 9 });
      if (g.e > 3 * DEG) {
        want('uy', at(v3.scale(v3.slerp(g.N, g.A, 0.55), 1.02)), 'U<sub>y</sub>(ε)', 'raw c-cy backed', { pri: 8 });
        want('ux', at(v3.scale(v3.slerp(g.N, g.B, 0.55), 1.02)), 'U<sub>x</sub>(ε)', 'raw c-cy backed', { pri: 8 });
        const m = v3.unit(v3.add(v3.add(g.N, g.A), g.B));
        want('omega', at(v3.scale(m, 1.01)), `Ω = ${fix(g.omega / DEG, 2)}°`, 'raw c-mg backed', { pri: 7 });
      }
      want('axis', at(v3.scale(g.axis, 1.5)), `n · Φ = ${fix(g.Phi / DEG, 1)}°`, 'raw c-vi backed', { pri: 6 });
    }
    return { handle: at(v3.scale(g.A, 1.03)), fit: [at([0, 0, 0]), at([1, 0, 0]), at([-1, 0, 0]), at([0, 1, 0]), at([0, -1, 0]), at([0, 0, -1]), at(v3.scale(g.axis, 1.62))] };
  }

  /** L1 · two qubits: the Segre torus of product states (cut open), the Bell circle inside, the path of G(η)|00⟩. */
  const CUT = 1.05;
  function drawSegre(T, sg, beat, lab) {
    const p = P(), at = T.at;
    sc.surface(`${T.k}-torus`, (al, be) => at(torusPt(TAU - al, be)), { u: [CUT, TAU - CUT], v: [-PI, PI], nu: T.mini ? 24 : 54, nv: T.mini ? 20 : 40,
      colors: [p.lineHot, p.cyan], value: (al, be) => Math.cos(be), range: [-1.4, 1.6], back: p.panelEdge, grid: T.mini ? false : { every: [6, 5], color: p.ink, alpha: 0.16 }, pick: !T.mini });
    if (!T.mini) for (const al of [CUT, TAU - CUT]) sc.line(Array.from({ length: 49 }, (_, i) => at(torusPt(al, -PI + TAU * i / 48))), { color: p.cyan, width: 1.8 });
    // the cross-section through the cut (the plane of the path), dashed
    if (!T.mini) sc.line(Array.from({ length: 65 }, (_, i) => at(torusPt(0, -PI + TAU * i / 64))), { color: p.cyan, width: 1.2, dash: [5, 4], alpha: 0.8 });
    // maximally entangled states: the Bell circle (det c = ½) and the axis (det c = −½)
    sc.tube(`${T.k}-bell`, Array.from({ length: 97 }, (_, i) => at([Math.cos(TAU * i / 96), Math.sin(TAU * i / 96), 0])), { color: p.magenta, width: W(T, beat === 2 ? 5.4 : 4.2), glow: 0.35 });
    if (!T.mini) sc.line([at([0, 0, -2.0]), at([0, 0, 2.0])], { color: p.magenta, width: 1.6, dash: [6, 5], alpha: 0.8 });
    // the path from the product state |00⟩ (on the torus) to G(η)|00⟩
    const pathPts = Array.from({ length: 33 }, (_, i) => { const a = Math.PI / 4 - sg.h / 2 * i / 32; return at([Math.cos(a), 0, Math.sin(a)]); });
    if (sg.h > 0.5 * DEG) sc.tube(`${T.k}-path`, pathPts, { color: p.magenta, width: W(T, 3.6), glow: 0.4 });
    sc.bead(at([Math.SQRT1_2, 0, Math.SQRT1_2]), { key: `${T.k}-prod`, color: p.cyan, r: T.mini ? 3 : 4.6 });
    sc.bead(at(sg.point), { key: `${T.k}-psi`, color: p.amber, r: T.mini ? 3.4 : 6 });
    if (!T.mini) sc.arrow(at([Math.SQRT1_2, 0, Math.SQRT1_2]), at([Math.SQRT1_2 * 1.0 + 0.32 * Math.SQRT1_2, 0, Math.SQRT1_2 - 0.32 * Math.SQRT1_2]), { color: p.magenta, width: 2.2, headSize: 10, alpha: 0.9 });
    if (lab) {
      want('torus', at(torusPt(PI * 0.62, 0.9)), L('Segre：乘积态 det c = 0', 'Segre: product states det c = 0'), 'raw c-cy backed', { pri: 8 });
      want('bell', at([Math.cos(-0.55), Math.sin(-0.55), 0]), L('贝尔圆 det c = ½', 'Bell circle det c = ½'), 'raw c-mg backed', { pri: 7 });
      want('psi', at(sg.point), `G(η)|00⟩ · C = ${fix(sg.conc, 3)}`, 'raw c-am backed', { pri: 10 });
      want('prod', at([Math.SQRT1_2, 0, Math.SQRT1_2]), '|00⟩', 'raw c-cy backed', { pri: 9 });
    }
    return { handle: at(sg.point), fit: [at([2.42, 0, 0]), at([-2.42, 0, 0]), at([0, 2.42, 0]), at([0, -2.42, 0]), at([0, 0, 1.05]), at([0, 0, -1.05])] };
  }

  /** L0 · the comparison primitive: a, b at angle ε, the shadow (a·b)a, the area a∧b and the volume with w. */
  function drawCompare(T, g, beat, lab) {
    const p = P(), at = T.at, R = 1.15, H = 0.75;
    const a = [R, 0, -0.35], b = [R * Math.cos(g.e), R * Math.sin(g.e), -0.35], o = [0, 0, -0.35], w = [0, 0, H - 0.35];
    const lift0 = (q) => v3.add(q, [0, 0, H]);
    const A0 = a, B0 = b, AB = [a[0] + b[0], a[1] + b[1], -0.35];
    const vs = [o, A0, AB, B0, w, lift0(A0), lift0(AB), lift0(B0)].map(at);
    if (g.e > 0.5 * DEG) {
      const faceCol = [p.magenta, p.violet, p.violet, p.violet, p.violet, p.violet];
      sc.poly(`${T.k}-box`, { vertices: vs, faces: [[0, 3, 2, 1], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]] },
        { colors: beat === 2 ? [p.magenta, p.magenta, p.violet, p.violet, p.violet, p.violet] : faceCol, edges: p.ink, pick: !T.mini });
    }
    sc.tube(`${T.k}-a`, [at(o), at(v3.add(o, v3.scale(v3.sub(A0, o), 1.3)))], { color: p.cyan, width: W(T, beat === 1 ? 6 : 4.4), glow: 0.3 });
    sc.tube(`${T.k}-b`, [at(o), at(v3.add(o, v3.scale(v3.sub(B0, o), 1.3)))], { color: p.cyan, width: W(T, beat === 1 ? 6 : 4.4), glow: 0.3 });
    if (!T.mini) {
      const foot = v3.add(o, [R * Math.cos(g.e) * 1.3, 0, 0]), btip = v3.add(o, v3.scale(v3.sub(B0, o), 1.3));
      sc.line([at(btip), at(foot)], { color: p.cyan, width: 1.4, dash: [4, 4] });
      sc.bead(at(foot), { key: 'foot', color: p.cyan, r: 4 });
      sc.tube(`${T.k}-shadow`, [at(o), at(foot)], { color: p.cyan, width: 7, glow: 0.45 });
    }
    sc.bead(at(o), { key: `${T.k}-o`, color: beat === 0 ? p.amber : p.sigma, r: T.mini ? 3 : beat === 0 ? 6 : 4.6 });
    if (lab) {
      want('a', at(v3.add(o, [R * 1.3, 0, 0])), 'a', 'raw c-cy backed', { pri: 9 });
      want('b', at(v3.add(o, v3.scale(v3.sub(B0, o), 1.3))), 'b', 'raw c-cy backed', { pri: 9 });
      want('shadow', at(v3.add(o, [R * Math.cos(g.e) * 0.65, 0, 0])), `a·b = cos ε = ${fix(Math.cos(g.e), 3)}`, 'raw c-cy backed', { pri: 8, dir: [0, 1] });
      want('area', at(v3.add(lift0(AB), [0, 0, 0])), `|a∧b| = sin ε = ${fix(Math.sin(g.e), 3)}`, 'raw c-mg backed', { pri: 7 });
    }
    const btip = at(v3.add(o, v3.scale(v3.sub(B0, o), 1.3)));
    return { handle: btip, fit: [at([-0.2, -0.2, -0.4]), at([1.6, 0, -0.35]), at([1.0, 1.5, 0.4]), at([1.6, 1.0, 0.45]), at([0, 0, 0.45]), at([0.2, -0.3, 0.4])] };
  }

  /** L2 · a Jordan–Wigner chain: four sites on the lattice plate, the parity string and one excitation. */
  function drawChain(T, g, beat, lab) {
    const p = P(), at = T.at, xs = [-1.2, -0.4, 0.4, 1.2], k = 2, rr = 0.3;
    sc.surface(`${T.k}-plate`, (u, v) => at([1.7 * Math.cos(v) * u, 0.62 * Math.sin(v) * u, -0.42]), { u: [0, 1], v: [0, TAU], nu: 8, nv: 48, color: p.lineHot,
      grid: T.mini ? false : { every: [2, 6], color: p.cyan, alpha: 0.2 }, pick: !T.mini });
    sc.surface(`${T.k}-rim`, (u, v) => at([1.7 * Math.cos(v), 0.62 * Math.sin(v), -0.42 - 0.1 * u]), { u: [0, 1], v: [0, TAU], nu: 2, nv: 48, color: p.panelEdge, pick: false });
    xs.forEach((x, j) => sc.surface(`${T.k}-site${j}`, (u, v) => at(v3.add([x, 0, 0], v3.scale(sph(u, v), rr))), { u: [0, PI], v: [0, TAU], nu: 14, nv: 24,
      colors: j === k ? [p.violet, p.magenta] : [p.lineHot, p.sigma], value: (u) => Math.cos(u), range: [-1, 1], pick: !T.mini }));
    sc.tube(`${T.k}-string`, [at([xs[0] - 0.35, 0, 0]), at([xs[k], 0, 0])], { color: p.violet, width: W(T, beat === 1 ? 7 : 5), glow: 0.35 });
    sc.tube(`${T.k}-tail`, [at([xs[k], 0, 0]), at([xs[3] + 0.35, 0, 0])], { color: p.panelEdge, width: W(T, 3), glow: 0.1 });
    xs.forEach((x, j) => {
      const th = j === k ? 2 * g.e : 0, dir = [Math.sin(th), 0, Math.cos(th)];
      sc.tube(`${T.k}-spin${j}`, [at(v3.add([x, 0, 0], v3.scale(dir, rr))), at(v3.add([x, 0, 0], v3.scale(dir, rr + 0.32)))], { color: j === k ? p.amber : p.cyan, width: W(T, 4.2), glow: 0.35 });
    });
    if (!T.mini) {
      for (let j = 0; j < k; j++) sc.ring(at([xs[j], 0, 0]), { key: `z${j}`, color: p.violet, r: 9, normal: EX });
      sc.ring(at([xs[k], 0, 0]), { key: 'ck', color: p.amber, r: 16, normal: EX });
    }
    const th = 2 * g.e, tipK = at(v3.add([xs[k], 0, 0], v3.scale([Math.sin(th), 0, Math.cos(th)], rr + 0.32)));
    if (lab) {
      want('ck', tipK, `c<sub>2</sub>† · n = sin²ε = ${fix(Math.sin(g.e) ** 2, 3)}`, 'raw c-am backed', { pri: 9 });
      want('z', at([(xs[0] + xs[1]) / 2, 0, 0.36]), L('宇称弦 Z⊗Z', 'parity string Z⊗Z'), 'raw c-vi backed', { pri: 8 });
      want('car', at([1.2, 0, 0.62]), '{c, c†} = 1', 'raw c-cy backed', { pri: 7 });
    }
    return { handle: tipK, fit: [at([-1.75, 0, -0.5]), at([1.75, 0, -0.5]), at([0, 0.65, -0.45]), at([0, -0.65, -0.45]), at([-1.2, 0, 0.7]), at([1.2, 0, 0.7])] };
  }

  /** L3 · an interference sheet of two plane waves at angle ε, sampled on Z₁₂. */
  const KW = 2.7;
  function waveH(x, y, e) {
    const k1 = [Math.cos(e / 2), Math.sin(e / 2)], k2 = [Math.cos(e / 2), -Math.sin(e / 2)];
    return 0.26 * (Math.cos(KW * (k1[0] * x + k1[1] * y)) + Math.cos(KW * (k2[0] * x + k2[1] * y))) / 2;
  }
  function drawWave(T, g, beat, lab) {
    const p = P(), at = T.at, E = 1.35;
    sc.surface(`${T.k}-sheet`, (u, v) => at([u, v, waveH(u, v, g.e)]), { u: [-E, E], v: [-E, E], nu: T.mini ? 24 : 64, nv: T.mini ? 24 : 64,
      colors: [p.cyan, p.lineHot, p.magenta], value: (u, v) => waveH(u, v, g.e), range: [-0.26, 0.26], grid: T.mini ? false : { every: [8, 8], color: p.ink, alpha: 0.14 }, back: p.panelEdge, pick: !T.mini });
    sc.surface(`${T.k}-skirt`, (u, v) => { const q = u < 1 ? [-E + 2 * E * u, -E] : u < 2 ? [E, -E + 2 * E * (u - 1)] : u < 3 ? [E - 2 * E * (u - 2), E] : [-E, E - 2 * E * (u - 3)]; return at([q[0], q[1], -0.45 + v * (waveH(q[0], q[1], g.e) + 0.45)]); },
      { u: [0, 4], v: [0, 1], nu: 160, nv: 2, color: p.panelEdge, pick: false });
    if (!T.mini) {
      const k1 = [Math.cos(g.e / 2), Math.sin(g.e / 2), 0], k2 = [Math.cos(g.e / 2), -Math.sin(g.e / 2), 0];
      sc.arrow(at([-1.05, 0, 0.4]), at(v3.add([-1.05, 0, 0.4], v3.scale(k1, 0.85))), { color: p.cyan, width: 3, headSize: 12 });
      sc.arrow(at([-1.05, 0, 0.4]), at(v3.add([-1.05, 0, 0.4], v3.scale(k2, 0.85))), { color: p.cyan, width: 3, headSize: 12 });
      for (let j = 0; j < 12; j++) { const x = -1.2 + 2.4 * j / 12; sc.bead(at([x, 0, waveH(x, 0, g.e) + 0.05]), { key: `zm${j}`, color: j % 4 === 0 ? p.amber : p.sigma, r: j % 4 === 0 ? 5 : 3.2 }); }
    }
    const tip = at(v3.add([-1.05, 0, 0.4], v3.scale([Math.cos(g.e / 2), -Math.sin(g.e / 2), 0], 0.85)));
    if (lab) {
      want('k', tip, 'k₁, k₂ · ε', 'raw c-cy backed', { pri: 9 });
      want('H', at([-1.2, 0, waveH(-1.2, 0, g.e) + 0.05]), `H = ⟨4⟩ ⊂ Z₁₂`, 'raw c-am backed', { pri: 8 });
      want('crest', at([0.6, 0.6, waveH(0.6, 0.6, g.e)]), L('干涉波面', 'interference sheet'), 'raw c-mg backed', { pri: 6 });
    }
    return { handle: tip, fit: [at([-E, -E, -0.45]), at([E, E, -0.45]), at([E, -E, 0.3]), at([-E, E, 0.3]), at([-1.05, 0, 0.5])] };
  }

  /** L4 · the light cone, a boosted worldline at rapidity ζ = ε, its plane of simultaneity and a null ray. */
  function drawCone(T, g, beat, lab) {
    const p = P(), at = T.at, Tm = 1.05;
    for (const [nm, sgnT] of [['fut', 1], ['past', -1]]) sc.surface(`${T.k}-${nm}`, (u, v) => at([u * Math.cos(v), u * Math.sin(v), sgnT * u]), { u: [0.02, Tm], v: [0, TAU], nu: T.mini ? 10 : 22, nv: T.mini ? 32 : 72,
      colors: sgnT > 0 ? [p.lineHot, p.cyan] : [p.lineHot, p.violet], value: (u) => u, range: [0, Tm * 1.3], grid: T.mini ? false : { every: [4, 9], color: p.ink, alpha: 0.18 }, back: p.panelEdge, pick: !T.mini });
    const z = g.e, dir = v3.unit([Math.sinh(z), 0, Math.cosh(z)]), wl = [v3.scale(dir, -1.15), v3.scale(dir, 1.15)];
    sc.tube(`${T.k}-world`, wl.map(at), { color: p.violet, width: W(T, 5), glow: 0.35 });
    if (!T.mini) {
      // its plane of simultaneity: spanned by (cosh ζ, 0, sinh ζ) and e_y
      const s1 = v3.unit([Math.cosh(z), 0, Math.sinh(z)]), quad = [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([a, b]) => at(v3.add(v3.scale(s1, a * 0.9), v3.scale(EY, b * 0.9))));
      sc.fan(quad, { fill: p.magenta, alpha: 0.18, color: p.magenta, width: 1.2 });
      sc.arrow(at(O), at(v3.scale([1, 0, 1], 0.95 * Tm)), { color: p.cyan, width: 2.6, headSize: 12 });
      sc.bead(at(O), { key: 'event', color: p.amber, r: 5.4 });
    }
    const tip = at(v3.scale(dir, 1.15));
    if (lab) {
      want('null', at(v3.scale([1, 0, 1], 0.8)), 'η(k, k) = 0', 'raw c-cy backed', { pri: 8 });
      want('world', tip, `v = tanh ε = ${fix(Math.tanh(z), 3)}c`, 'raw c-vi backed', { pri: 9 });
      want('sim', at(v3.scale(EY, -0.9)), L('同时面', 'simultaneity'), 'raw c-mg backed', { pri: 6 });
    }
    return { handle: tip, fit: [at([Tm, 0, Tm]), at([-Tm, 0, -Tm]), at([0, Tm, Tm]), at([0, -Tm, -Tm]), at([-Tm, 0, Tm]), at([Tm, 0, -Tm])] };
  }

  /** L5 · the Möbius band; the normal carried round φ = π s flips at 2π and returns at 4π. */
  const MR = 1.1, MW = 0.4, MU0 = -1.15;
  /** The band: centre circle of radius MR; the width direction turns by half a turn per lap, standing upright at u = 0. */
  const mob = (u, v) => { const w = (u + PI) / 2, a = u + MU0; return [(MR + v * Math.cos(w)) * Math.cos(a), (MR + v * Math.cos(w)) * Math.sin(a), v * Math.sin(w)]; };
  const mobNormal = (u) => { const h = 1e-4, a = v3.sub(mob(u + h, 0), mob(u - h, 0)), b = v3.sub(mob(u, h), mob(u, -h)); return v3.unit(v3.cross(b, a)); };
  const mobWidth = (u) => v3.unit(v3.sub(mob(u, 1e-3), mob(u, -1e-3)));
  /** The vector carried along the band at φ (it lies in the band, across it): continuous in φ, reversed after one
      turn and back after two. */
  const carried = (phi) => v3.scale(mobWidth(((phi % TAU) + TAU) % TAU), Math.floor(phi / TAU + 1e-9) % 2 === 0 ? 1 : -1);
  /** An arrow lying on the band, drawn on both faces so that whichever face is in view shows it. */
  function bandArrow(at, u, d, len, s) {
    const base = mob(u, 0), n = mobNormal(u);
    for (const side of [1, -1]) { const o = v3.scale(n, 0.012 * side); sc.arrow(at(v3.add(base, o)), at(v3.add(v3.add(base, v3.scale(d, len)), o)), s); }
  }
  function drawMobius(T, phi, beat, lab) {
    const p = P(), at = T.at;
    sc.surface(`${T.k}-band`, (u, v) => at(mob(u, v)), { u: [0, TAU], v: [-MW, MW], nu: T.mini ? 48 : 120, nv: T.mini ? 4 : 10,
      colors: [p.lineHot, p.violet], value: (u) => 0.5 + 0.5 * Math.cos(u), range: [-0.2, 1.1], grid: T.mini ? false : { every: [6, 5], color: p.ink, alpha: 0.2 }, pick: !T.mini });
    if (!T.mini) {
      sc.line(Array.from({ length: 97 }, (_, i) => at(v3.scale(mob(TAU * i / 96, 0), 1))), { color: p.sigma, width: 1.2, dash: [3, 4], alpha: 0.7 });
      const n = Math.max(0, Math.floor(phi / (PI / 3) + 1e-9));
      for (let i = 0; i <= Math.min(12, n); i++) {
        const f = i * PI / 3;
        if (Math.abs(f - phi) < 0.05) continue;
        bandArrow(at, f % TAU, carried(f), MW * 0.92, { color: f < TAU - 1e-9 ? p.cyan : p.magenta, width: 2.4, headSize: 10 });
      }
      const u = ((phi % TAU) + TAU) % TAU, base = mob(u, 0);
      bandArrow(at, u, carried(phi), MW * 0.95, { color: p.amber, width: 3.6, headSize: 14 });
      sc.bead(at(base), { key: 'carry', color: p.amber, r: 5.4 });
    }
    if (lab) {
      const sign = Math.round(Math.cos(phi / 2) * 1000) / 1000;
      want('carry', at(v3.add(mob(((phi % TAU) + TAU) % TAU, 0), v3.scale(carried(phi), MW * 0.95))), `φ = ${fix(phi / PI, 2)}π · Re U = ${fix(sign, 3)}`, 'raw c-am backed', { pri: 10 });
      want('seam', at(mob(0, -MW)), 'L5 ↺ L0 CMP', 'raw c-vi backed', { pri: 8 });
      want('dottie', at(mob(PI, 0)), `θ* = cos θ* = ${fix(DOTTIE, 4)}`, 'raw c-cy backed', { pri: 6 });
    }
    return { handle: null, fit: [at([MR + MW, 0, 0]), at([-MR - MW, 0, 0]), at([0, MR + MW, 0]), at([0, -MR - MW, 0]), at([0, 0, 0.5]), at([0, 0, -0.5])] };
  }

  /** The unified lens: the bare gate trihedron of every tier, its 1—3—3—1 elements and the funnel Λ³ → Λ⁰ of the next. */
  const CORE = 0.9;
  const TR = 1.5;
  function drawTruss(T, g, beat, frac, lab, tier) {
    const p = P(), at = T.at, R = TR, Ns = v3.scale(g.N, R), As = v3.scale(g.A, R), Bs = v3.scale(g.B, R);
    const shown = g.e > 0.5 * DEG;
    if (!T.mini) sc.glass(`${T.k}-glass`, at(O), R * T.s, { color: p.sigma, alpha: 0.03, rim: 0.14 });
    // the SU(2) core every tier stands on (opaque), the trihedron grows out of it
    sc.surface(`${T.k}-core`, (u, v) => at(v3.scale(sph(u, v), CORE)), { u: [0, PI], v: [0, TAU], nu: T.mini ? 12 : 30, nv: T.mini ? 20 : 54,
      colors: [p.panelEdge, p.lineHot, p.sigma], value: (u) => Math.cos(u), range: [-1.1, 2.4], grid: T.mini ? false : { every: [5, 9], color: p.cyan, alpha: 0.2 }, pick: !T.mini });
    // Λ² walls: the three planar sectors between the rays; Λ³: the lid on the sphere (violet)
    if (shown) {
      [[g.N, g.A], [g.N, g.B], [g.A, g.B]].forEach(([u, w], i) => sc.surface(`${T.k}-wall${i}`, (r, t) => at(v3.scale(v3.slerp(u, w, t), r * R)),
        { u: [0, 1], v: [0, 1], nu: 6, nv: 16, color: p.magenta, alpha: 1, grid: T.mini ? false : { every: [3, 4], color: p.ink, alpha: beat === 2 ? 0.35 : 0.16 }, pick: !T.mini }));
      sc.surface(`${T.k}-lid`, (u, v) => at(v3.scale(v3.unit(v3.add(v3.scale(g.N, 1 - u), v3.scale(v3.add(v3.scale(g.A, 1 - v), v3.scale(g.B, v)), u))), R * 1.004)),
        { u: [0, 1], v: [0, 1], nu: 12, nv: 12, color: p.violet, grid: T.mini ? false : { every: [6, 6], color: p.ink, alpha: 0.25 }, pick: !T.mini });
    }
    // Λ¹ rays
    const rw = W(T, beat === 1 ? 6.4 : 4.6);
    for (const [nm, q] of [['n', Ns], ['a', As], ['b', Bs]]) sc.tube(`${T.k}-ray-${nm}`, [at(O), at(v3.scale(q, 1.08))], { color: p.cyan, width: rw, glow: beat === 1 ? 0.55 : 0.3 });
    if (shown) for (const [nm, u, w] of [['na', g.N, g.A], ['nb', g.N, g.B], ['ab', g.A, g.B]]) sc.tube(`${T.k}-arc-${nm}`, lift(arcPts(u, w, 20), R * 1.01).map(at), { color: p.cyan, width: W(T, 3.2), glow: 0.3 });
    // the funnel: the lid closes into the point of the next tier (amber while it is the current step)
    const m = v3.unit(v3.add(v3.add(g.N, g.A), g.B)), next = v3.scale(m, R + 0.4), squeeze = beat === 3 ? clamp(frac, 0, 1) : 0;
    const rim = (t) => { const k = t * 3, i = Math.min(2, Math.floor(k)), f = k - i, ends = [[g.N, g.A], [g.A, g.B], [g.B, g.N]][i]; return v3.scale(v3.slerp(ends[0], ends[1], f), R * 1.01); };
    if (shown) sc.surface(`${T.k}-funnel`, (t, h) => at(v3.lerp(v3.lerp(rim(t), v3.scale(m, R * 1.02), squeeze * 0.85), next, h)), { u: [0, 1], v: [0, 1], nu: 36, nv: 8,
      color: beat === 3 ? p.amber : p.violet, pick: false });
    sc.bead(at(next), { key: `${T.k}-next`, color: beat === 3 ? p.amber : p.sigma, r: T.mini ? 3 : 5.6 });
    // Λ⁰: the apex, the point this tier grew from
    sc.bead(at(v3.scale(g.N, CORE * 1.02)), { key: `${T.k}-seed`, color: beat === 0 ? p.amber : p.sigma, r: T.mini ? 3 : beat === 0 ? 6.4 : 4.8 });
    // the tier below arrives at the south pole of the core: its volume is this tier's point
    if (!T.mini) {
      sc.arrow(at([0, 0, -CORE - 0.3]), at([0, 0, -CORE - 0.02]), { color: p.violet, width: 3, headSize: 11 });
      if (beat === 0) sc.circle(at(O), EZ, CORE * 1.02 * T.s, { color: p.amber, width: 2.6 });
    }
    if (lab) {
      const D = sc.facing(), side = v3.unit(v3.cross(EZ, D)), limb = v3.scale(v3.unit(v3.add(v3.scale(side, 0.92), [0, 0, -0.35])), CORE * 1.01);
      want('apex', at(limb), `Λ⁰ · ${L('点 = 下层的体', 'point = volume below')}`, `raw ${beat === 0 ? 'c-am' : 'ink'} backed`, { pri: 9 });
      want('rays', at(v3.scale(g.A, R * 1.08)), `Λ¹ · 3 ${L('线', 'lines')}`, `raw ${beat === 1 ? 'c-am' : 'c-cy'} backed`, { pri: 8 });
      const wallAt = [[g.N, g.B], [g.N, g.A], [g.A, g.B]].map(([u, w]) => at(v3.scale(v3.slerp(u, w, 0.5), R * 0.88))).find((q) => !sc.occluded(q, 0.04));
      if (shown && wallAt) want('walls', wallAt, `Λ² · 3 ${L('面', 'faces')}`, `raw ${beat === 2 ? 'c-am' : 'c-mg'} backed`, { pri: 8, dir: [-1, 0] });
      want('next', at(next), `Λ³ ≡ Λ⁰ · ${tierName((tier + 1) % TIERS).split(' ')[0]}`, `raw ${beat === 3 ? 'c-am' : 'c-vi'} backed`, { pri: 9 });
    }
    return { handle: shown ? at(v3.scale(g.A, R * 1.01)) : null, fit: [at(O), at([0, 0, -CORE - 0.3]), at(next), at(v3.scale(g.A, R)), at(v3.scale(g.B, R)), at([-0.9, 0.9, 0]), at([0.9, -0.9, 0]), at([0.6, 0.6, -0.6]), at([-0.6, -0.6, 1.0])] };
  }

  /** One tier in its costume (lens off) or as the bare trihedron (lens on). */
  function drawTier(tier, T, M, beat, lab, frac) {
    if (S.lensMix >= 0.5) return drawTruss(T, M.g, beat, frac, lab, tier);
    if (tier === 0) return drawCompare(T, M.g, beat, lab);
    if (tier === 1) return S.pair && !T.mini ? drawSegre(T, M.sg, beat, lab) : drawBloch(T, M.g, beat, lab);
    if (tier === 2) return drawChain(T, M.g, beat, lab);
    if (tier === 3) return drawWave(T, M.g, beat, lab);
    if (tier === 4) return drawCone(T, M.g, beat, lab);
    return drawMobius(T, T.mini ? PI * 2.5 : M.phi, beat, lab);
  }

  /* ---------- the tower: six platforms on a helix that turns 4π, funnels between them, the return L5 ↺ L0 ---------- */
  const HELIX = 1.12, PLATE = 0.72;
  const towerCenter = (l) => { const th = -0.9 + l * (4 * PI / 6); return [HELIX * Math.cos(th), HELIX * Math.sin(th), -1.15 + 0.46 * l]; };
  function hexPrism(c, r, h) {
    const top = [], bot = [];
    for (let i = 0; i < 6; i++) { const a = PI / 6 + TAU * i / 6; top.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a), c[2]]); bot.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a), c[2] - h]); }
    const vertices = top.concat(bot), faces = [[0, 1, 2, 3, 4, 5], [11, 10, 9, 8, 7, 6]];
    for (let i = 0; i < 6; i++) { const j = (i + 1) % 6; faces.push([i, i + 6, j + 6, j]); }
    return { vertices, faces };
  }
  /** The return L5 ↺ L0: from above the top platform, out round the tower and down to the bottom one. */
  function returnPath(t) {
    const top = towerCenter(5)[2] + 0.55, bot = towerCenter(0)[2] - 0.1, a = -0.9 + 5 * (4 * PI / 6) + t * 1.4, rr = HELIX + 0.75 * Math.sin(PI * t);
    return [rr * Math.cos(a), rr * Math.sin(a), top + (bot - top) * t + 0.35 * Math.sin(PI * t)];
  }
  function drawTower(M, lab) {
    const p = P(), fit = [], out = { handle: null, fit };
    for (let l = 0; l < TIERS; l++) {
      const c = towerCenter(l), act = l === S.tier;
      sc.poly(`tw-plate${l}`, hexPrism(c, PLATE, 0.1), { colors: [act ? p.sigma : p.lineHot, p.panelEdge, p.lineHot, p.lineHot, p.lineHot, p.lineHot, p.lineHot, p.lineHot], edges: act ? p.amber : p.ink });
      if (act) sc.circle(c, EZ, PLATE + 0.1, { color: p.amber, width: 2.4, fade: false });
      const T = place(`tw${l}`, v3.add(c, [0, 0, 0.34]), 0.33, true);
      const r = drawTier(l, T, M, act ? M.beat : 1, false, S.s - 3);
      if (act) out.handle = r.handle;
      fit.push(v3.add(c, [0.5, 0.5, 0]), v3.add(c, [-0.5, -0.5, 0]), v3.add(c, [0, 0, 0.62]));
      if (lab) want(`tier${l}`, v3.add(c, [PLATE * Math.cos(c[0] > 0 ? 0 : PI), 0, 0]), TIER[l][TRV.lang() === 'en' ? 1 : 0].split(' ').slice(0, 2).join(' '), `raw ${act ? 'c-am' : 'ink'} backed`, { pri: act ? 10 : 8 - l * 0.1, dir: [c[0] >= 0 ? 1 : -1, 0] });
      // the funnel to the next tier: the volume of this tier closes into the point of the next
      if (l < TIERS - 1) {
        const a = v3.add(c, [0, 0, 0.02]), b = v3.sub(towerCenter(l + 1), [0, 0, 0.1]), cur = act && M.beat === 3;
        sc.surface(`tw-funnel${l}`, (t, h) => v3.lerp(v3.add(a, [0.26 * Math.cos(TAU * t), 0.26 * Math.sin(TAU * t), 0]), b, h), { u: [0, 1], v: [0, 1], nu: 20, nv: 4,
          color: cur ? p.amber : p.violet, pick: false });
      }
    }
    // the return: a ribbon with a half twist from L5 down to L0
    const path = returnPath;
    sc.surface('tw-return', (t, v) => { const q = path(t), dq = v3.unit(v3.sub(path(Math.min(1, t + 0.01)), path(Math.max(0, t - 0.01)))), n0 = v3.unit(v3.cross(dq, EZ)), b0 = v3.cross(dq, n0), tw = PI * t;
      return v3.add(q, v3.scale(v3.add(v3.scale(n0, Math.cos(tw)), v3.scale(b0, Math.sin(tw))), v)); }, { u: [0, 1], v: [-0.11, 0.11], nu: 72, nv: 2, colors: [p.violet, p.magenta], value: (t) => Math.sin(PI * t), range: [0, 1], pick: false });
    sc.arrow(path(0.93), path(1), { color: p.violet, width: 3, headSize: 14 });
    for (let k = 0; k <= 10; k++) fit.push(path(k / 10));
    if (lab) want('return', path(0.5), 'L5 ↺ L0 · 4π', 'raw c-vi backed', { pri: 9 });
    return out;
  }

  /* ---------- the frame ---------- */
  let FRAME = null;
  /* ---------- fitting: the largest picture whose outline clears the title, the tier buttons and the legend ---------- */
  const fib = (n, r = 1, c = O) => Array.from({ length: n }, (_, i) => { const z = 1 - 2 * (i + 0.5) / n, q = Math.sqrt(1 - z * z), a = i * 2.399963; return v3.add(c, [r * q * Math.cos(a), r * q * Math.sin(a), r * z]); });
  const EPS_SAMPLES = [0, 15, 30, 45, 60, 75, 90];
  /** World points whose projections bound each picture, for every ε (so the fit does not move while ε is dragged). */
  function outline(key) {
    const out = [];
    if (key === 1) { out.push(...fib(180)); for (const d of EPS_SAMPLES) out.push(v3.scale(gateModel(d).axis, 1.52)); }
    else if (key === 'pair') { for (let i = 0; i < 36; i++) for (let j = 0; j < 16; j++) out.push(torusPt(TAU * i / 36, -PI + TAU * j / 16)); }
    else if (key === 0) { for (const d of EPS_SAMPLES) { const e = d * DEG; out.push([1.495 * Math.cos(e), 1.495 * Math.sin(e), -0.35], [1.15 * (1 + Math.cos(e)), 1.15 * Math.sin(e), 0.4]); } out.push([0, 0, -0.4], [1.5, 0, 0.4], [0, 0, 0.4]); }
    else if (key === 2) { for (let k = 0; k < 24; k++) { const v = TAU * k / 24; out.push([1.7 * Math.cos(v), 0.62 * Math.sin(v), -0.52], [1.7 * Math.cos(v), 0.62 * Math.sin(v), -0.42]); } for (const x of [-1.2, -0.4, 0.4, 1.2]) out.push([x, 0, 0.64]); for (let k = 0; k <= 12; k++) { const t = PI * k / 12; out.push([0.4 + 0.62 * Math.sin(t), 0, 0.62 * Math.cos(t)]); } }
    else if (key === 3) { for (const x of [-1.35, 1.35]) for (const y of [-1.35, 1.35]) out.push([x, y, 0.27], [x, y, -0.45]); for (const d of EPS_SAMPLES) { const e = d * DEG; out.push([-1.05 + 0.85 * Math.cos(e / 2), 0.85 * Math.sin(e / 2), 0.4], [-1.05 + 0.85 * Math.cos(e / 2), -0.85 * Math.sin(e / 2), 0.4]); } }
    else if (key === 4) { for (let k = 0; k < 24; k++) { const v = TAU * k / 24; out.push([1.05 * Math.cos(v), 1.05 * Math.sin(v), 1.05], [1.05 * Math.cos(v), 1.05 * Math.sin(v), -1.05]); } for (const d of EPS_SAMPLES) { const w = v3.scale(v3.unit([Math.sinh(d * DEG), 0, Math.cosh(d * DEG)]), 1.18); out.push(w, v3.scale(w, -1)); } }
    else if (key === 5) { for (let i = 0; i < 48; i++) for (const v of [-MW, 0, MW]) out.push(mob(TAU * i / 48, v)); }
    else if (key === 'truss') { out.push(...fib(120, CORE), [0, 0, -CORE - 0.32]);
      for (const d of EPS_SAMPLES) { const g = gateModel(d), m = v3.unit(v3.add(v3.add(g.N, g.A), g.B)); out.push(v3.scale(g.A, TR * 1.08), v3.scale(g.B, TR * 1.08), v3.scale(g.N, TR * 1.08), v3.scale(m, TR + 0.42)); } }
    else if (key === 'tower') { for (let l = 0; l < TIERS; l++) { const c = towerCenter(l); for (let k = 0; k < 6; k++) { const a = PI / 6 + TAU * k / 6; out.push(v3.add(c, [PLATE * Math.cos(a), PLATE * Math.sin(a), 0]), v3.add(c, [PLATE * Math.cos(a), PLATE * Math.sin(a), -0.1])); } out.push(v3.add(c, [0, 0, 0.72])); }
      for (let k = 0; k <= 20; k++) out.push(returnPath(k / 20)); }
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
  /** Largest share of the stage the outline's hull may take (keeps the opaque body within about a quarter). */
  const CAPF = { 0: 0.42, 1: 0.27, pair: 0.29, 2: 0.42, 3: 0.4, 4: 0.4, 5: 0.33, truss: 0.36, tower: 0.42 };
  const fitCache = new Map();
  let lastFit = null;
  function fitFor(key, W, H, huds) {
    const cam = S.camFit, q = (v) => Math.ceil(v / 12) * 12;
    const rects = huds.map((b) => ({ x0: Math.floor((b.x - 6) / 12) * 12, y0: Math.floor((b.y - 6) / 12) * 12, x1: q(b.x + b.w + 6), y1: q(b.y + b.h + 6) }));
    const sig = `${key}|${W}|${H}|${cam[0]}|${cam[1]}|${rects.map((r) => [r.x0, r.y0, r.x1, r.y1].join(',')).join(';')}`;
    if (fitCache.has(sig)) return fitCache.get(sig);
    const cy0 = Math.cos(cam[0]), sy0 = Math.sin(cam[0]), cp = Math.cos(cam[1]), sp = Math.sin(cam[1]);
    const Rv = [cy0, -sy0, 0], Uv = [sy0 * sp, cy0 * sp, cp];
    const hull = hull2(outline(key).map((p) => [v3.dot(p, Rv), v3.dot(p, Uv)]));
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
    const fit = { unit: u, cx: at.cx, cy: at.cy, hull: hull.map(([a, b]) => [at.cx + u * a, at.cy - u * b]) };
    fitCache.set(sig, fit);
    if (fitCache.size > 60) fitCache.delete(fitCache.keys().next().value);
    return fit;
  }
  const LABEL_CENTER = { 0: [0.6, 0.4, 0], 1: [0, 0, 0.1], truss: [0, 0, 0.45], tower: [0, 0, 0.25] };
  function fitKey() {
    if (S.scene === 'tower') return 'tower';
    if (S.lensMix >= 0.5) return 'truss';
    return S.tier === 1 && S.pair ? 'pair' : S.tier;
  }
  function drawStage(M) {
    const W0 = stageEl.clientWidth, H0 = stageEl.clientHeight, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes();
    const key = fitKey();
    // freeze the fit while the handle is dragged: the HUD text changes with ε and must not move the picture under it
    const fit = dragging && lastFit && lastFit.key === key ? lastFit : Object.assign({ key }, fitFor(key, W0, H0, huds));
    lastFit = fit;
    const base = Math.max(1, Math.min(W0, H0));
    options.radius = fit.unit / base; options.cx = fit.cx / Math.max(1, W0); options.cy = fit.cy / Math.max(1, H0);
    const area = { x: 0, y: 0, w: W0, h: H0 }, unit = fit.unit, centerW = LABEL_CENTER[key] || O;
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W0 - 12, h: H0 - 12 }; LB = [];
    sc.begin();
    const lab = !thumb;
    let r;
    if (S.scene === 'tower') r = drawTower(M, lab);
    else r = drawTier(S.tier, place('f', O, 1, false), M, M.beat, lab, S.s - 3);
    sc.end();
    // the handle, then the labels around it
    const hq = r.handle && !thumb ? sc.p(r.handle) : null;
    const visible = hq && hq[0] > 14 && hq[0] < W0 - 14 && hq[1] > 14 && hq[1] < H0 - 14 && !sc.occluded(r.handle, 0.06) && !OBST.some((b) => hq[0] > b.x - 4 && hq[0] < b.x + b.w + 4 && hq[1] > b.y - 4 && hq[1] < b.y + b.h + 4);
    placeHandle(visible ? hq : null);
    if (visible) OBST.push({ x: hq[0] - 19, y: hq[1] - 19, w: 38, h: 38 });
    if (lab) placeLabels(centerW);
    FRAME = { W: W0, H: H0, area, unit, handle: visible ? { x: hq[0], y: hq[1] } : null, fitKey: key };
  }

  /* ---------- the handle: an amber ring on the current gate arc; drag it to set ε ---------- */
  const handle = $('gateArcHandle');
  let dragging = null;
  function placeHandle(q) {
    const show = !!q && !TRV.still && !TRV.thumbMode;
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
  }
  /** The ε (whole degrees) whose handle point projects nearest to the pointer. */
  function epsAt(ev) {
    const b = stageEl.getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top, M = model();
    let best = S.eps, bd = Infinity;
    const saved = { eps: S.eps };
    for (let d = 0; d <= 90; d++) {
      S.eps = d;
      const g = gateModel(d), sg = segreModel(d), Mi = { ...M, g, sg };
      const pt = handlePoint(Mi);
      if (!pt) continue;
      const q = sc.p(pt), dist = Math.hypot(q[0] - x, q[1] - y);
      if (dist < bd) { bd = dist; best = d; }
    }
    S.eps = saved.eps;
    return best;
  }
  /** The world point of the handle for a model, without drawing. */
  function handlePoint(Mi) {
    const g = Mi.g;
    if (S.scene === 'tower') {
      const c = towerCenter(S.tier), at = (p) => v3.add(v3.add(c, [0, 0, 0.34]), v3.scale(p, 0.33));
      return localHandle(S.tier, g, Mi.sg, at, true);
    }
    return localHandle(S.tier, g, Mi.sg, (p) => p, false);
  }
  function localHandle(tier, g, sg, at, mini) {
    if (S.lensMix >= 0.5) return at(v3.scale(g.A, TR * 1.01));
    if (tier === 0) return at(v3.add([0, 0, -0.35], v3.scale([1.15 * Math.cos(g.e), 1.15 * Math.sin(g.e), 0], 1.3)));
    if (tier === 1) return S.pair && !mini ? at(sg.point) : at(v3.scale(g.A, 1.03));
    if (tier === 2) { const th = 2 * g.e; return at(v3.add([0.4, 0, 0], v3.scale([Math.sin(th), 0, Math.cos(th)], 0.62))); }
    if (tier === 3) return at(v3.add([-1.05, 0, 0.4], v3.scale([Math.cos(g.e / 2), -Math.sin(g.e / 2), 0], 0.85)));
    if (tier === 4) return at(v3.scale(v3.unit([Math.sinh(g.e), 0, Math.cosh(g.e)]), 1.15));
    return null;
  }
  const endDrag = (ev) => {
    if (!dragging || (ev && ev.pointerId != null && ev.pointerId !== dragging.pointer)) return;
    try { if (handle.hasPointerCapture(dragging.pointer)) handle.releasePointerCapture(dragging.pointer); } catch (e) { /* already released */ }
    dragging = null; handle.classList.remove('dragging'); paint();
  };
  handle.addEventListener('pointerdown', (ev) => {
    if (ev.button > 0 || TRV.still) return;
    ev.preventDefault(); ev.stopPropagation();
    cards.mark(null); clock.pause();
    dragging = { pointer: ev.pointerId }; handle.classList.add('dragging');
    try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events carry no capture */ }
  });
  handle.addEventListener('pointermove', (ev) => {
    if (!dragging || ev.pointerId !== dragging.pointer) return;
    ev.preventDefault();
    const d = epsAt(ev);
    if (d !== S.eps) { S.eps = d; fEps.set(d); paint(); }
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight' && ev.key !== 'ArrowUp' && ev.key !== 'ArrowDown') return;
    ev.preventDefault(); ev.stopPropagation(); cards.mark(null); clock.pause();
    setEps(S.eps + (ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : -1));
  });

  /* ---------- HUD, legend, readouts ---------- */
  function hudText(M) {
    const g = M.g, sg = M.sg, beat = M.beat, unified = S.lensMix >= 0.5;
    const big = S.scene === 'tower' ? `${L('六层概念塔', 'Six-tier tower')} · ${tierName(S.tier)}` : `${tierName(S.tier)} · ${GRADE_SHORT[beat]} ${L(['点', '线', '面', '体'][beat], ['point', 'line', 'face', 'volume'][beat])}`;
    let sub;
    if (unified) sub = `${L('统一本相', 'unified')} · ΔT<sub>ε</sub> · 1—3—3—1 · ε = ${fix(S.eps, 0)}° · det G = ${fix(g.detG, 4)}`;
    else if (S.scene === 'tower') sub = `${L('名相外衣', 'costumes')} · ${GRADE_SHORT[beat]} · Λ³ ≡ Λ⁰<sub>ℓ+1</sub> · L5 ↺ L0`;
    else if (S.tier === 1 && S.pair) sub = `η = ${fix(S.eps, 0)}° · C = ${fix(sg.conc, 4)} · CHSH = ${fix(sg.chsh, 3)}`;
    else if (S.tier === 1) sub = `ε = ${fix(S.eps, 0)}° · ½Φ = ${fix(g.half / DEG, 2)}° · Ω = ${fix(g.omega / DEG, 2)}°`;
    else if (S.tier === 0) sub = `cos²ε + sin²ε = 1 · det G = ${fix(Math.sin(g.e) ** 2, 4)}`;
    else if (S.tier === 2) sub = `{c, c†} = 1 · n = sin²ε = ${fix(Math.sin(g.e) ** 2, 3)}`;
    else if (S.tier === 3) sub = `Σ<sub>H</sub> f = ¼ Σ<sub>H⊥</sub> f̂ · |Δ| = ${M.poisson.residual.toExponential(0)}`;
    else if (S.tier === 4) sub = `η(k, k) = 0 · ΔS = D = ${fix(M.entropy.D, 4)}`;
    else sub = `φ = ${fix(M.phi / PI, 2)}π · Re U = ${fix(Math.cos(M.phi / 2), 3)} · θ* = ${fix(DOTTIE, 4)}`;
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    let LEG;
    if (unified) LEG = [['cy', L('Λ¹ 三条线', 'Λ¹ three lines')], ['mg', L('Λ² 三面墙', 'Λ² three walls')], ['vi', L('Λ³ 体 → 漏斗', 'Λ³ volume → funnel')], ['am', L('当前一拍', 'current beat')]];
    else if (S.scene === 'tower') LEG = [['ink', L('六层平台', 'six platforms')], ['vi', L('漏斗与回环', 'funnels and return')], ['am', L('当前层', 'current tier')]];
    else if (S.tier === 1 && S.pair) LEG = [['cy', L('乘积态环面', 'product torus')], ['mg', L('楔方向与贝尔圆', 'wedge and Bell circle')], ['am', L('当前态', 'current state')]];
    else if (S.tier === 1) LEG = [['cy', L('门弧 U<sub>x</sub>、U<sub>y</sub>', 'gate arcs U<sub>x</sub>, U<sub>y</sub>')], ['mg', L('ΔT<sub>ε</sub> 面积 · 缺口', 'ΔT<sub>ε</sub> area · gap')], ['vi', L('残余转轴 n', 'residual axis n')], ['am', L('当前态', 'current state')]];
    else if (S.tier === 0) LEG = [['cy', L('线：a、b 与影子', 'lines: a, b and the shadow')], ['mg', L('面积 a∧b', 'area a∧b')], ['vi', L('体', 'volume')]];
    else if (S.tier === 2) LEG = [['cy', L('空的格点', 'empty sites')], ['vi', L('宇称弦', 'parity string')], ['am', L('当前激发', 'current excitation')]];
    else if (S.tier === 3) LEG = [['cy', L('波谷 · 波矢', 'troughs · wave vectors')], ['mg', L('波峰', 'crests')], ['am', L('子群 H 的采样', 'samples of H')]];
    else if (S.tier === 4) LEG = [['cy', L('未来光锥 · 零矢', 'future cone · null ray')], ['vi', L('世界线', 'worldline')], ['mg', L('同时面', 'simultaneity')]];
    else LEG = [['cy', L('第一圈搬运的箭头', 'arrows, first turn')], ['mg', L('第二圈：反向', 'second turn: reversed')], ['vi', L('莫比乌斯带', 'Möbius band')], ['am', L('当前箭头', 'current arrow')]];
    $('legend').innerHTML = LEG.map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  function invariantText(M) {
    const t = S.tier, g = M.g;
    if (t === 0) return `cos²ε + sin²ε = 1 · |Δ| = ${M.lag.toExponential(0)}`;
    if (t === 1) return `XZ = −ZX · det G = ${fix(g.detG, 4)}`;
    if (t === 2) return `{c, c†} = 1 · max|Δ| = ${M.car.diag.toExponential(0)}`;
    if (t === 3) return `Σ<sub>H</sub> f = ¼ Σ<sub>H⊥</sub> f̂ · |Δ| = ${M.poisson.residual.toExponential(0)}`;
    if (t === 4) return `I₃² = −1 · ΔS = D = ${fix(M.entropy.D, 4)}`;
    return `θ* = cos θ* = ${fix(DOTTIE, 4)} · U(4π) = +I`;
  }
  function drawText(M) {
    const g = M.g, sg = M.sg, beat = M.beat;
    $('roTier').innerHTML = `${tierName(S.tier)} · ${GRADE_SHORT[beat]}`;
    $('roTierSub').innerHTML = ` · ${L(...GRADE[beat])} · dim ${DIMS[beat]} (1—3—3—1)`;
    $('roEps').textContent = `${fix(S.eps, 0)}° · ${fix(g.e, 4)} rad`;
    $('roComm').textContent = `${fix(g.half / DEG, 3)}° · Φ ${fix(g.Phi / DEG, 2)}°`;
    $('roOmega').textContent = `${fix(g.omega / DEG, 3)}° · ε²/2 ${fix(g.quad / DEG, 2)}°`;
    $('roSegre').textContent = `C ${fix(sg.conc, 4)} · CHSH ${fix(sg.chsh, 3)}`;
    $('roInv').innerHTML = invariantText(M);
    $('roLens').textContent = S.lens ? L('量子门极小圆弧体统一本相', 'Unified quantum-gate substrate') : L('物理时空显影名相', 'Phenomenal physics view');
    $('tierPill').innerHTML = `${TIER[S.tier][1].split(' ')[0]} <strong>${GRADE_SHORT[beat]}</strong>`;
    $('lensPill').innerHTML = S.lens ? L('本相', 'UNIFIED') : L('名相', 'PHENOMENAL');
    $('hint').textContent = L('Space 播放 · ← → 逐拍 · 拖琥珀手柄改 ε · 拖空白转动', 'Space play · ← → beat · drag the amber handle for ε · drag to orbit');
    let f;
    if (S.lensMix >= 0.5) f = '1 + 3 + 3 + 1 = 8 = 2³';
    else if (S.tier === 1 && S.pair) f = `C = 2|c₀₀c₁₁ − c₀₁c₁₀| = ${fix(sg.conc, 4)}`;
    else if (S.tier === 1) f = `tr C/2 = 1 − 2 sin⁴(ε/2) = ${fix(g.traceHalf, 6)}`;
    else if (S.tier === 5) f = `Re U(φ) = cos(φ/2) = ${fix(Math.cos(M.phi / 2), 3)}`;
    else f = invariantText(M).replace(/<[^>]+>/g, '');
    $('formula').textContent = f;
    lensBtn.setAttribute('aria-pressed', String(S.lens));
    tierChips.set(String(S.tier), true);
  }

  /* ---------- strip plot ---------- */
  const PLOTS = {
    comm: ['换位子相位与三角形面积', 'Commutator phase against triangle area'],
    segre: ['纠缠门推离 Segre 环面多远', 'How far the entangling gate leaves the Segre torus'],
    octave: ['六层 × 四拍：1—3—3—1 的重整化阶梯', 'Six tiers × four beats: the 1—3—3—1 staircase'],
    spinor: ['4π 才回家：Re U(φ) = cos(φ/2)', 'Home only after 4π: Re U(φ) = cos(φ/2)']
  };
  function drawPlot(M) {
    const cv = $('plot');
    if (!cv.clientWidth || !cv.clientHeight || TRV.thumbMode) return;
    const p = P(), pad = [38, 12, 10, 22], kind = S.plot;
    $('plotTitle').textContent = L(...PLOTS[kind]);
    let meta = '';
    if (kind === 'comm') {
      const g = kit.plot(cv, { x: [0, 90], y: [0, 1.65], pad });
      g.axes({ xTicks: [0, 30, 60, 90].map((d) => [d, `${d}°`]), yTicks: [0, 0.5, 1, 1.5], xLabel: 'ε' });
      const xs = Array.from({ length: 91 }, (_, i) => i), r = (d) => d * DEG;
      g.line(xs.map((d) => [d, r(d) ** 2 / 2]), p.violet, { width: 2 });
      g.line(xs.map((d) => [d, 2 * Math.atan(Math.tan(r(d) / 2) ** 2)]), p.magenta, { width: 2.2 });
      g.line(xs.map((d) => [d, Math.acos(1 - 2 * Math.sin(r(d) / 2) ** 4)]), p.cyan, { width: 2.2 });
      g.vline(S.eps, p.amber, { alpha: 0.85 });
      g.dot(S.eps, M.g.half, p.amber, 4); g.dot(S.eps, M.g.omega, p.amber, 4); g.dot(S.eps, M.g.quad, p.amber, 3);
      g.text(88, 1.5, 'Ω(ε)', p.magenta, { align: 'right' }); g.text(88, 1.13, 'ε²/2', p.violet, { align: 'right' }); g.text(88, 0.88, '½Φ_{comm}', p.cyan, { align: 'right' });
      meta = `ε = ${fix(S.eps, 0)}° · ½Φ = ${fix(M.g.half, 4)} · Ω = ${fix(M.g.omega, 4)} · ε²/2 = ${fix(M.g.quad, 4)}`;
    } else if (kind === 'segre') {
      const g = kit.plot(cv, { x: [0, 90], y: [0, 1.08], pad });
      g.axes({ xTicks: [0, 30, 60, 90].map((d) => [d, `${d}°`]), yTicks: [0, 0.5, 1], xLabel: 'η' });
      const xs = Array.from({ length: 91 }, (_, i) => i), s2 = (d) => Math.sin(d * DEG);
      g.line(xs.map((d) => [d, Math.sqrt(1 + s2(d) ** 2) - 1]), p.magenta, { width: 2.2 });
      g.line(xs.map((d) => [d, 0.5 * s2(d) ** 2]), p.violet, { width: 2 });
      g.line(xs.map((d) => [d, Math.abs(s2(d))]), p.cyan, { width: 2.2 });
      g.vline(S.eps, p.amber, { alpha: 0.85 });
      g.dot(S.eps, M.sg.conc, p.amber, 4); g.dot(S.eps, M.sg.linEntropy, p.amber, 3); g.dot(S.eps, M.sg.chsh / 2 - 1, p.amber, 3);
      g.text(4, 0.98, 'C = |sin η|', p.cyan, { align: 'left' }); g.text(88, 0.53, 'S_{lin} = ½ sin²η', p.violet, { align: 'right' }); g.text(88, 0.3, '√(1 + sin²η) − 1', p.magenta, { align: 'right' });
      meta = `η = ${fix(S.eps, 0)}° · C = ${fix(M.sg.conc, 4)} · S = ${fix(M.sg.linEntropy, 4)} · CHSH = ${fix(M.sg.chsh, 4)}`;
    } else if (kind === 'octave') {
      const g = kit.plot(cv, { x: [0, 24], y: [0, 4.1], pad });
      g.axes({ xTicks: [0, 4, 8, 12, 16, 20, 24], yTicks: [0, 1, 3], xLabel: L('拍', 'beat') });
      const col = [p.sigma, p.cyan, p.magenta, p.violet], cur = S.tier * 4 + M.beat;
      for (let l = 0; l < TIERS; l++) {
        for (let k = 0; k < 4; k++) {
          const x = l * 4 + k, on = x === cur;
          g.rect(x + 0.12, 0, x + 0.88, DIMS[k], on ? p.amber : col[k], { alpha: on ? 0.75 : 0.42, stroke: on ? p.amber : col[k], width: 1 });
        }
        g.text(l * 4 + 2, 3.7, `L${l}`, l === S.tier ? p.amber : p.dim, { align: 'center', size: 10 });
        if (l < TIERS - 1) g.arrow([l * 4 + 3.5, 1.15], [l * 4 + 4.5, 1.15], { color: p.violet, width: 1.2, headSize: 5 });
      }
      g.vline(S.tier * 4 + Math.min(3.999, S.s), p.amber, { alpha: 0.7 });
      meta = `${TIER[S.tier][1].split(' ')[0]} · ${GRADE_SHORT[M.beat]} · dim ${DIMS[M.beat]} · Λ³ ≡ Λ⁰ (ℓ + 1)`;
    } else {
      const g = kit.plot(cv, { x: [0, 4 * PI], y: [-1.2, 1.2], pad });
      g.axes({ xTicks: [[0, '0'], [PI, 'π'], [2 * PI, '2π'], [3 * PI, '3π'], [4 * PI, '4π']], yTicks: [-1, 0, 1], xLabel: 'φ' });
      const xs = Array.from({ length: 241 }, (_, i) => 4 * PI * i / 240);
      g.hline(0, p.dim, { width: 1 });
      g.line(xs.map((x) => [x, Math.cos(x)]), p.cyan, { width: 1.4, dash: [4, 3], alpha: 0.7 });
      g.line(xs.map((x) => [x, Math.cos(x / 2)]), p.violet, { width: 2.4 });
      g.dot(TAU, -1, p.magenta, 5, { ring: true, width: 2 }); g.dot(2 * TAU, 1, p.violet, 5, { ring: true, width: 2 });
      g.text(TAU, -1, 'U(2π) = −I', p.magenta, { dx: 8, dy: 4, size: 10, base: 'top' });
      g.text(2 * TAU, 1, 'U(4π) = +I', p.violet, { dx: -8, dy: 2, align: 'right', size: 10, base: 'top' });
      g.text(PI * 0.15, -0.9, L('矢量 cos φ：2π 已回家', 'vector cos φ: home at 2π'), p.cyan, { align: 'left', size: 10 });
      g.vline(M.phi, p.amber, { alpha: 0.8 }); g.dot(M.phi, Math.cos(M.phi / 2), p.amber, 4.5);
      meta = `φ = ${fix(M.phi / PI, 2)}π · Re U = ${fix(Math.cos(M.phi / 2), 4)}`;
    }
    $('plotMeta').textContent = meta;
  }

  /* ---------- painter ---------- */
  let LAST = null;
  const paint = kit.painter(() => {
    const M = model();
    drawText(M); hudText(M); TRV.hudFit();
    drawStage(M); drawPlot(M);
    LAST = M;
  }, [stageEl, $('plot')]);

  /* ---------- the rail: the beat s ∈ [0, 4] of the current tier ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('playBtn'), label: $('tourStep'), speeds: $('speedChips'), max: BEATS, t: 2, rate: 0.5, step: 1, loop: true,
    format: (t) => `${GRADE_SHORT[beatOf(t)]} · s = ${fix(t, 2)} <small>/ 4</small>`,
    onChange: (t, C) => {
      if (S.climb && C && C.playing && t < S.s - 1) setTierRaw((S.tier + 1) % TIERS);
      S.s = t; fBeat.set(beatOf(t)); paint();
    }
  });

  /* ---------- controls ---------- */
  const lensBtn = $('lensToggleBtn');
  const tierChips = kit.chips($('tierChips'), 'tier-chip', (v) => { cards.mark(null); setTier(Number(v)); });
  const fTier = kit.field($('towerTier'), { fmt: (v) => TIER[Math.round(v)][TRV.lang() === 'en' ? 1 : 0].split(' ').slice(0, 2).join(' '), onInput: (v) => { cards.mark(null); setTier(Math.round(v)); } });
  const fBeat = kit.field($('gradeBeat'), { fmt: (v) => L(...GRADE[Math.round(v)]).split(' / ')[0], onInput: (v) => { cards.mark(null); clock.pause(); clock.set(Math.round(v)); } });
  const fEps = kit.field($('gateAngleDeg'), { fmt: (v) => `${fix(v, 0)}°`, onInput: (v) => { cards.mark(null); setEps(v); } });
  function setEps(v) { S.eps = clamp(Math.round(v), 0, 90); fEps.set(S.eps); paint(); }
  function setTierRaw(l) {
    S.tier = clamp(Math.round(l), 0, TIERS - 1); fTier.set(S.tier); tierChips.set(String(S.tier), true);
    if (S.scene === 'focus') S.plot = S.tier === 1 ? (S.pair ? 'segre' : 'comm') : S.tier === 5 ? 'spinor' : 'octave';
  }
  function setTier(l) { setTierRaw(l); paint(); }
  let lensTween = null;
  function setLens(on, instant) {
    S.lens = !!on; lensBtn.setAttribute('aria-pressed', String(S.lens));
    if (lensTween) lensTween.cancel();
    lensTween = null;
    if (instant || TRV.still) { S.lensMix = S.lens ? 1 : 0; paint(); return; }
    const from = S.lensMix, to = S.lens ? 1 : 0;
    lensTween = kit.tween(420, (e) => { S.lensMix = from + (to - from) * e; paint(); }, () => { S.lensMix = to; paint(); });
  }
  lensBtn.addEventListener('click', (ev) => { cards.mark(null); setLens(!S.lens); if (ev.detail > 0) { if (!stageEl.hasAttribute('tabindex')) stageEl.setAttribute('tabindex', '-1'); stageEl.focus({ preventScroll: true }); } });
  $('rewindBtn').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ l: () => { cards.mark(null); setLens(!S.lens); }, t: () => { cards.mark(null); setTier((S.tier + 1) % TIERS); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'gate-commutator-trihedron': { tier: 1, eps: 45, lens: false, scene: 'focus', pair: false, plot: 'comm', climb: false, play: false, still: 2, cam: [-0.62, 0.62] },
    'entangling-segre-escape': { tier: 1, eps: 45, lens: false, scene: 'focus', pair: true, plot: 'segre', climb: false, play: false, still: 2, cam: [-1.3, 0.5] },
    'octave-1331-grammar': { tier: 1, eps: 45, lens: true, scene: 'focus', pair: false, plot: 'octave', climb: true, play: true, still: 3.5, cam: [-0.75, 0.32] },
    'six-tier-cosmic-tower': { tier: 4, eps: 45, lens: false, scene: 'tower', pair: false, plot: 'octave', climb: true, play: false, still: 2, cam: [-0.62, 0.45] },
    'mobius-ouroboros-closure': { tier: 5, eps: 45, lens: false, scene: 'focus', pair: false, plot: 'spinor', climb: false, play: true, still: 'end', cam: [-0.45, 0.72] }
  };
  const NOTES = {
    'gate-commutator-trihedron': ['从北极 N 依次走 U<sub>y</sub>、U<sub>x</sub>、U<sub>y</sub>†、U<sub>x</sub>† 四段弧，终点差了一截品红的缺口：换位子是绕紫色轴 n 转 Φ 的旋转。青色门弧围出的品红小三角 ΔT<sub>ε</sub> 角超 Ω；ε = 45° 时 ½Φ = 16.84°，Ω = 19.47°，小 ε 时二者都趋于 ε²/2。', 'Walk U<sub>y</sub>, U<sub>x</sub>, U<sub>y</sub>†, U<sub>x</sub>† from the north pole N and the four arcs end short by a magenta gap: the commutator turns by Φ about the violet axis n. The cyan gate arcs bound the magenta triangle ΔT<sub>ε</sub> with excess Ω; at ε = 45°, ½Φ = 16.84° and Ω = 19.47°, both tending to ε²/2 for small ε.'],
    'entangling-segre-escape': ['两比特实振幅态里，乘积态 det c = 0 是一张青色环面。纠缠门 G(η) 把 |00⟩ 沿品红的楔方向推离环面，走向品红的贝尔圆；η = 45° 时共生度 C = |sin η| = 0.7071，η = 90° 正好到达贝尔态。', 'Among real two-qubit states the product states det c = 0 form a cyan torus. The entangling gate G(η) pushes |00⟩ off the torus along the magenta wedge towards the magenta Bell circle; at η = 45° the concurrence is C = |sin η| = 0.7071, and η = 90° lands on the Bell state.'],
    'octave-1331-grammar': ['统一透镜下每层都是同一块三面角：1 个顶点、3 条青色的线、3 面品红的墙、1 块紫色的体。第四拍体收进琥珀漏斗，成为上一层的点；时间轴走满一圈就上一层。', 'Under the unified lens every tier is the same trihedron: 1 apex, 3 cyan lines, 3 magenta walls, 1 violet volume. On the fourth beat the volume flows into the amber funnel and becomes the point of the next tier; a full lap of the rail climbs one tier.'],
    'six-tier-cosmic-tower': ['六层平台沿螺旋上升，转满 4π：L0 比较、L1 门、L2 粒子、L3 场与波、L4 时空、L5 觉知，紫色漏斗把每层的体送进上一层的点，扭转的回环把 L5 送回 L0。按“统一本相”，六层外衣褪去，只剩同一块三面角。', 'Six platforms climb a helix that turns 4π: L0 comparison, L1 gate, L2 particle, L3 field and wave, L4 spacetime, L5 awareness. Violet funnels carry each volume into the next point, and the twisted return carries L5 back to L0. Switch to the unified substrate and the six costumes fall away, leaving one trihedron.'],
    'mobius-ouroboros-closure': ['沿莫比乌斯带搬运法向：走一圈 2π，品红的箭头与出发时反向（U = −I）；走满 4π，琥珀箭头回到原样（U = +I）。带上标出 L5 ↺ L0：顶层经这条回环回到比较原语。', 'Carry the normal round the Möbius band: after one turn, 2π, the magenta arrows point against the start (U = −I); after the full 4π the amber arrow is back (U = +I). The band marks L5 ↺ L0: the top returns along this loop to the comparison primitive.']
  };
  // A cited figure has a fixed frame: one short sentence per card, without sub- or superscripts.
  const FIGURE_NOTES = {
    'gate-commutator-trihedron': ['四段门弧走完差一截品红缺口；青色门弧围出的品红小三角 ΔTε 角超 Ω = 19.47°，½Φ = 16.84°。', 'The four gate arcs end short by a magenta gap; the cyan arcs bound the magenta triangle ΔTε with Ω = 19.47° and ½Φ = 16.84°.'],
    'entangling-segre-escape': ['纠缠门把 |00⟩ 推离青色乘积态环面，走向品红贝尔圆：η = 45° 时 C = 0.7071。', 'The entangling gate pushes |00⟩ off the cyan product torus towards the magenta Bell circle: C = 0.7071 at η = 45°.'],
    'octave-1331-grammar': ['同一块三面角：1 点、3 线、3 面、1 体；体收进琥珀漏斗，成为上一层的点。', 'One trihedron: 1 point, 3 lines, 3 faces, 1 volume; the volume flows into the amber funnel and becomes the next point.'],
    'six-tier-cosmic-tower': ['六层平台沿螺旋转满 4π，紫色漏斗逐层相接，扭转的回环把 L5 送回 L0。', 'Six platforms turn 4π up a helix, violet funnels join the tiers and the twisted return carries L5 back to L0.'],
    'mobius-ouroboros-closure': ['法向沿莫比乌斯带走一圈反号（U = −I），走满 4π 复原（U = +I）。', 'The normal carried once round the Möbius band flips (U = −I) and is back after 4π (U = +I).']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause();
    S.scene = p.scene; S.pair = p.pair; S.climb = p.climb;
    S.eps = p.eps; fEps.set(p.eps);
    setTierRaw(p.tier); S.plot = p.plot;
    setLens(p.lens, booting);
    S.camFit = p.cam.slice(); sc.view([p.cam[0], p.cam[1], 1], booting || TRV.still ? 0 : 600);
    const still = p.still === 'end' ? BEATS : p.still;
    if (p.play) {
      if (TRV.still || (booting && !TRV.embed)) clock.set(still);
      else if (booting) { clock.set(0); kit.autoplay(clock, stageEl); }
      else { clock.set(0); clock.play(); }
    } else clock.set(still);
    paint();
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖琥珀手柄改 ε，换塔层与四拍，或切换双透镜。随时可以再选一张卡。', 'Free play: drag the amber handle for ε, change the tier and the beat, or switch the lens. Pick a card again at any time.'] });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.GATE_TOWER_DEBUG = Object.freeze({
    get state() {
      const M = model(), g = M.g, sg = M.sg;
      return JSON.parse(JSON.stringify({
        preset: cards.current, t: clock.t, playing: clock.playing, max: clock.max, beatPhase: S.s, scene: S.scene, pair: S.pair, plot: S.plot, climb: S.climb, lensMix: S.lensMix,
        gateAngleDeg: S.eps, epsRad: g.e,
        commutatorTraceHalf: g.traceHalf, commutatorTraceClosed: g.closed, commutatorTraceDiff: g.traceDiff,
        commutatorSpinorHalfAngle: g.half, commutatorBlochAngle: g.Phi, commutatorAxis: g.axis, commutatorAxisClosed: g.axisClosed, commutatorAxisDiff: g.axisDiff,
        commutatorPath: g.path, commutatorEndByAxis: g.endByAxis, commutatorGap: g.gap,
        girardTrihedralExcess: g.omega, girardExcessFromAngles: g.omegaAngles, quadratic: g.quad, trihedronVertices: [g.N, g.A, g.B], trihedronGramDet: g.detG, trihedronGramDetClosed: g.detGClosed,
        weylResidual: g.weyl,
        segreConcurrence: sg.conc, segreConcurrenceClosed: sg.concClosed, singleQubitLinearEntropy: sg.linEntropy, singleQubitLinearEntropyClosed: sg.linClosed,
        chshMax: sg.chsh, chshMaxClosed: sg.chshClosed, twoQubitState: sg.psi, reducedBloch: sg.rA, segrePoint: sg.point, bellMarginalAt90: segreModel(90).bellMarginal,
        towerTier: S.tier, gradeBeat: M.beat, exteriorDims: DIMS.slice(), lensUnifiedGateMode: S.lens,
        dottieFixedPoint: DOTTIE, dottieResidual: Math.abs(Math.cos(DOTTIE) - DOTTIE),
        spinorDoubleCoverSigns: SPINOR_SIGNS.slice(), spinorPhase: M.phi, spinorRe: Math.cos(M.phi / 2), carriedNormal: carried(M.phi),
        carResidual: CAR.diag, carCrossResidual: CAR.cross, poisson: { H: M.poisson.H, Hperp: M.poisson.Hp, residual: M.poisson.residual }, entropyStep: M.entropy,
        pseudoscalarSquareResidual: M.I3sq, lagrangeResidual: M.lag,
        camera: Object.assign({}, sc.cam), handle: FRAME ? FRAME.handle : null, labels: PLACED, stageFrame: FRAME ? { W: FRAME.W, H: FRAME.H, area: FRAME.area, unit: sc.unit, fit: FRAME.fitKey } : null
      }));
    },
    /** Model values at another ε, for independent checks. */
    at: (epsDeg) => { const g = gateModel(epsDeg), sg = segreModel(epsDeg); return JSON.parse(JSON.stringify({ traceHalf: g.traceHalf, closed: g.closed, half: g.half, Phi: g.Phi, omega: g.omega, axis: g.axis, path: g.path, conc: sg.conc, chsh: sg.chsh, lin: sg.linEntropy, psi: sg.psi })); },
    setState: (o) => {
      cards.mark(null); clock.pause();
      if (o.eps != null) setEps(o.eps);
      if (o.tier != null) setTierRaw(o.tier);
      if (o.scene) S.scene = o.scene;
      if (o.pair != null) S.pair = !!o.pair;
      if (o.lens != null) setLens(o.lens, true);
      if (o.s != null) clock.set(clamp(o.s, 0, BEATS));
      paint();
    },
    handleBox: () => { const r = handle.getBoundingClientRect(); return handle.hidden ? null : { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
  });
  window.TRV_THUMB = () => { cards.pick('six-tier-cosmic-tower'); clock.pause(); clock.set(2); S.camFit = [-0.62, 0.45]; sc.view([-0.62, 0.45, 1], 0); paint.now(); };
  cards.pick(cards.initial('gate-commutator-trihedron'));
  booting = false;
  paint();
})();
