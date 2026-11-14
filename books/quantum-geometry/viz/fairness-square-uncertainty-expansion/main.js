/* Quantum Geometry · ORTHO//EXPAND (fairness-square-uncertainty-expansion)
   Stage-first lab for the Chapter 31 thread "fairness → squaring → phase loss → uncertainty → orthogonal expansion".
   Six scenes share one canvas and one rail: the open helix and its closed planar shadow (3D); the truncation horizon
   (2D); two vectors, their squares and the rotors AB, BA (2D); relative phase on the Bloch sphere (3D); the
   Robertson–Schrödinger split on the tangent plane (3D); a finite Krylov box against axes standing outside it (2D).
   Every number is computed here; colours come only from TRV.palette (theme/tokens.json). */
(function () {
  'use strict';
  const TRV = window.TRV, kit = TRV && TRV.kit;
  if (!TRV || !kit) return;
  const { v3, fix, sgn } = kit;
  const $ = (id) => document.getElementById(id);
  const L = (zh, en) => TRV.L(zh, en);
  const DEG = Math.PI / 180, TAU = Math.PI * 2;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const ease = (x) => TRV.smooth(clamp(x, 0, 1));
  const LW = TRV.thumbMode ? 2 : 1;          // 2D strokes are drawn twice as thick on the cover
  const sub = (s) => `<sub>${s}</sub>`;

  /* ---------- complex 2 × 2 algebra: every qubit readout below is computed from matrices ---------- */
  const C = (re, im) => [re, im || 0];
  const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const csub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const conj = (a) => [a[0], -a[1]];
  const cabs2 = (a) => a[0] * a[0] + a[1] * a[1];
  const cexp = (t) => [Math.cos(t), Math.sin(t)];
  const mv = (M, v) => [cadd(cmul(M[0][0], v[0]), cmul(M[0][1], v[1])), cadd(cmul(M[1][0], v[0]), cmul(M[1][1], v[1]))];
  const mm = (A, B) => [0, 1].map((i) => [0, 1].map((j) => cadd(cmul(A[i][0], B[0][j]), cmul(A[i][1], B[1][j]))));
  const mlin = (A, B, k) => A.map((r, i) => r.map((x, j) => [x[0] + k * B[i][j][0], x[1] + k * B[i][j][1]]));
  const inner = (u, v) => cadd(cmul(conj(u[0]), v[0]), cmul(conj(u[1]), v[1]));   // ⟨u, v⟩, conjugate-linear in u
  const vsub = (u, v) => [csub(u[0], v[0]), csub(u[1], v[1])];
  const vscale = (u, k) => u.map((x) => [x[0] * k, x[1] * k]);
  const expect = (M, psi) => inner(psi, mv(M, psi));
  const PX = [[C(0), C(1)], [C(1), C(0)]], PZ = [[C(1), C(0)], [C(0), C(-1)]];
  const P0 = [[C(1), C(0)], [C(0), C(0)]];                                         // projector on |0⟩
  const axisOp = (n) => [[C(n[2]), C(n[0], -n[1])], [C(n[0], n[1]), C(-n[2])]];  // n · σ
  const blochState = (n) => {
    const th = Math.acos(clamp(n[2], -1, 1)), ph = Math.atan2(n[1], n[0]);
    return [C(Math.cos(th / 2)), cmul(C(Math.sin(th / 2)), cexp(ph))];
  };
  const density = (p) => [[cmul(p[0], conj(p[0])), cmul(p[0], conj(p[1]))], [cmul(p[1], conj(p[0])), cmul(p[1], conj(p[1]))]];
  const born = (rho, O) => cadd(mm(rho, O)[0][0], mm(rho, O)[1][1])[0];         // Tr(ρ O), real for Hermitian O

  /* ---------- scene 1: the open helix h(t) = (cos t, sin t, c·t) and the golden deck step ---------- */
  const PHI = (1 + Math.sqrt(5)) / 2, TGOLD = 2 * Math.log(PHI);                 // golden scale period T = 2 log φ
  const HTURNS = 3, HZ0 = -0.95, HZF = -1.22;                                    // world z of t = 0 and of the readout plane
  const helixWorld = (t, c) => [Math.cos(t), Math.sin(t), HZ0 + c * t];
  /** The golden helix state at level n (orientation flips every step) and its Fourier readout exp(2πi·m·s/T). */
  const goldenState = (n) => ({ level: n, scale: n * TGOLD, orientation: n % 2 === 0 });
  const fourierReadout = (m, s) => cexp(TAU * m * s / TGOLD);
  function helixAt(turns, c) {
    const t = turns * TAU, level = Math.floor(turns + 1e-9), gs = goldenState(level), r1 = fourierReadout(1, gs.scale);
    const next = goldenState(level + 1), rNext = fourierReadout(1, next.scale);
    return {
      t, turns, c, level, point: [Math.cos(t), Math.sin(t), c * t], shadow: [Math.cos(t), Math.sin(t)], height: c * t,
      golden: gs, readout: r1, readoutGap: Math.hypot(r1[0] - rNext[0], r1[1] - rNext[1]), levelGap: next.level - gs.level,
      h0: [1, 0, 0], h2pi: [1, 0, c * TAU]
    };
  }

  /* ---------- scene 2: truncations V_D ⊂ V_{D+1} ⊂ … of ℓ², a fixed x_k = √6/(πk), the witness e_{D+1} ---------- */
  const DMAX = 10, NCOORD = 12;
  const XFIX = Array.from({ length: NCOORD + 1 }, (_, k) => (k ? Math.sqrt(6) / (Math.PI * k) : 0));
  /** ‖(I − P_{V_D}) x‖² for the fixed x: the Basel sum Σ x_k² = 1 minus the first D squares. */
  const residual2 = (D) => { let s = 0; for (let k = 1; k <= D; k++) s += XFIX[k] * XFIX[k]; return Math.max(0, 1 - s); };
  /** ‖(I − P_{V_D}) e_{D+1}‖²: the coordinate vector e_{D+1} has no component inside V_D. */
  const witness2 = (D) => { const e = Array.from({ length: NCOORD + 2 }, (_, k) => (k === D + 1 ? 1 : 0)); let s = 0; for (let k = D + 1; k < e.length; k++) s += e[k] * e[k]; return s; };
  function horizonAt(thDeg, D) {
    const th = thDeg * DEG, c = Math.cos(th), s = Math.sin(th);
    return { thDeg, D, cos: c, sin: s, shadow2: c * c, resid2: s * s, sum: c * c + s * s, xShadow2: 1 - residual2(D), xResid2: residual2(D), witness: witness2(D) };
  }

  /* ---------- scene 3: two unit vectors A, B; squares; the rotors AB and BA (even part of Cl(2,0) ≅ ℂ) ---------- */
  function squareAt(thDeg) {
    const th = thDeg * DEG, A = [1, 0], B = [Math.cos(th), Math.sin(th)];
    const dot = A[0] * B[0] + A[1] * B[1], wedge = A[0] * B[1] - A[1] * B[0];
    const AB = [dot, wedge], BA = [dot, -wedge], prod = cmul(AB, BA);         // I² = −1, so the even part multiplies like ℂ
    const sp = [A[0] + B[0], A[1] + B[1]], sm = [A[0] - B[0], A[1] - B[1]];
    return {
      thDeg, c: dot, s: wedge, l1: Math.abs(dot) + Math.abs(wedge), l2: dot * dot + wedge * wedge, c2: dot * dot, s2: wedge * wedge,
      AB, BA, prod, plus2: sp[0] * sp[0] + sp[1] * sp[1], minus2: sm[0] * sm[0] + sm[1] * sm[1], plRhs: 2 * (1 + 1),
      born: cabs2(inner([C(A[0]), C(A[1])], [C(B[0]), C(B[1])])), bornPerp: cabs2(inner([C(0), C(1)], [C(B[0]), C(B[1])]))
    };
  }

  /* ---------- scene 4: |+⟩, |−⟩ and ψ_φ = (|0⟩ + e^{iφ}|1⟩)/√2; the half-angle lift of the phase loop ---------- */
  const SQ = Math.SQRT1_2, PLUS = [C(SQ), C(SQ)], MINUS = [C(SQ), C(-SQ)];
  const RHO_PLUS = density(PLUS), RHO_MINUS = density(MINUS), ZRZ = mm(mm(PZ, RHO_PLUS), PZ);
  const DIAG = (() => { const rng = TRV.mulberry32(28); return Array.from({ length: 24 }, () => [rng() * 4 - 2, rng() * 4 - 2]); })();
  const diagGap = DIAG.reduce((m, [a, b]) => { const D = [[C(a), C(0)], [C(0), C(b)]]; return Math.max(m, Math.abs(born(RHO_PLUS, D) - born(RHO_MINUS, D))); }, 0);
  const zrzGap = Math.max(...[0, 1].flatMap((i) => [0, 1].map((j) => Math.hypot(...csub(ZRZ[i][j], RHO_MINUS[i][j])))));
  function phaseAt(phiDeg) {
    const ph = phiDeg * DEG, psi = [C(SQ), cmul(C(SQ), cexp(ph))], rho = density(psi);
    return {
      phiDeg, bloch: [Math.cos(ph), Math.sin(ph), 0], p0: born(rho, P0), x: born(rho, PX), z: born(rho, PZ),
      lift: cexp(ph / 2), base: cexp(ph), liftSq: cmul(cexp(ph / 2), cexp(ph / 2)),
      diagZPlus: born(RHO_PLUS, P0), diagZMinus: born(RHO_MINUS, P0), zPlus: born(RHO_PLUS, PZ), zMinus: born(RHO_MINUS, PZ),
      xPlus: born(RHO_PLUS, PX), xMinus: born(RHO_MINUS, PX), diagGap, zrzGap
    };
  }

  /* ---------- scene 5: A = a·σ, B = b·σ on a pure qubit state ψ (Bloch vector n) ---------- */
  function wedgeAt(alphaDeg, azDeg, gammaDeg) {
    const al = alphaDeg * DEG, az = azDeg * DEG, g = gammaDeg * DEG;
    const n = [Math.sin(al) * Math.cos(az), Math.sin(al) * Math.sin(az), Math.cos(al)];
    const a = [1, 0, 0], b = [Math.cos(g), Math.sin(g), 0];
    const psi = blochState(n), A = axisOp(a), B = axisOp(b);
    const eA = expect(A, psi)[0], eB = expect(B, psi)[0];
    const u = vsub(mv(A, psi), vscale(psi, eA)), v = vsub(mv(B, psi), vscale(psi, eB));
    const varA = inner(u, u)[0], varB = inner(v, v)[0], z = inner(u, v);
    const Cv = z[0], K = z[1], G = varA * varB - cabs2(z);
    // the same C and K from the operators: C = ½⟨AB + BA⟩ − ⟨A⟩⟨B⟩, K = ⟨AB − BA⟩ / (2i)
    const AB = mm(A, B), BA = mm(B, A), anti = expect(mlin(AB, BA, 1), psi), comm = expect(mlin(AB, BA, -1), psi);
    const ap = v3.sub(a, v3.scale(n, v3.dot(a, n))), bp = v3.sub(b, v3.scale(n, v3.dot(b, n)));
    return {
      alphaDeg, azDeg, gammaDeg, n, a, b, eA, eB, varA, varB, prod: varA * varB, C: Cv, K, G: Math.max(G, 0), Graw: G,
      C2: Cv * Cv, K2: K * K, Cop: 0.5 * anti[0] - eA * eB, Kop: comm[1] / 2, ap, bp, Cgeo: v3.dot(ap, bp), Kgeo: v3.dot(v3.cross(ap, bp), n)
    };
  }

  /* ---------- scene 6: an observable Krylov tower in ℝ⁶ and Euclid's N_S = ∏p + 1 ---------- */
  const KDIM = 6, KTOL = 1e-9, KSTEPS = 6;
  const KRY = (() => {
    const eye = () => Array.from({ length: KDIM }, (_, i) => Array.from({ length: KDIM }, (_, j) => (i === j ? 1 : 0)));
    const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
    const tr = (A) => A[0].map((_, j) => A.map((r) => r[j]));
    const givens = (i, j, t) => { const G = eye(); G[i][i] = Math.cos(t); G[j][j] = Math.cos(t); G[i][j] = -Math.sin(t); G[j][i] = Math.sin(t); return G; };
    let Q = eye();
    for (const [i, j, t] of [[0, 4, 0.7], [1, 5, -0.4], [0, 2, 0.3], [3, 5, 0.9], [2, 4, -0.6], [1, 3, 0.5]]) Q = mul(Q, givens(i, j, t));
    const B = Array.from({ length: KDIM }, () => Array(KDIM).fill(0));
    B[1][0] = 1; B[2][1] = 1; B[3][2] = 1; B[0][3] = 1;                        // a 4-cycle on the first block
    B[4][4] = Math.cos(1); B[4][5] = -Math.sin(1); B[5][4] = Math.sin(1); B[5][5] = Math.cos(1);
    const M = mul(mul(Q, B), tr(Q));                                            // T* (the adjoint dynamics)
    const raw = [0.8, 0.5, 0.3, 0.1, 0, 0], nr = Math.hypot(...raw);
    const c = Q.map((r) => r.reduce((s, x, k) => s + x * raw[k] / nr, 0));    // C* y: one readout direction, rank C = 1
    const dot = (x, y) => x.reduce((s, xi, i) => s + xi * y[i], 0);
    const basis = [], dims = [], res = [];
    let w = c.slice();
    for (let m = 0; m <= KSTEPS; m++) {
      let r = w.slice();
      for (let pass = 0; pass < 2; pass++) for (const q of basis) { const k = dot(q, r); r = r.map((x, i) => x - k * q[i]); }
      const nrm = Math.sqrt(dot(r, r)), scale = Math.max(1, Math.sqrt(dot(w, w)));
      res.push(nrm);
      if (nrm > KTOL * scale) basis.push(r.map((x) => x / nrm));
      dims.push(basis.length);
      w = M.map((row) => dot(row, w));
    }
    let strict = 0; for (let m = 0; m < KSTEPS; m++) if (dims[m + 1] > dims[m]) strict++;
    const stableAt = dims.findIndex((d, m) => m < KSTEPS && dims[m + 1] === d);
    return { dims, res, strict, bound: KDIM - 1, stableAt, rankC: 1 };
  })();
  const PRIMES = [2, 3, 5, 7, 11, 13, 17];
  const factor = (n) => { const out = []; let x = n; for (let p = 2; p * p <= x; p++) while (x % p === 0) { out.push(p); x /= p; } if (x > 1) out.push(x); return out; };
  const EUCLID = PRIMES.map((_, k) => {
    const S = PRIMES.slice(0, k), N = S.reduce((a, p) => a * p, 1) + 1, f = factor(N);
    return { S, N, factors: f, congruent: S.every((p) => N % p === 1), outside: f.every((q) => !S.includes(q)), prime: f.length === 1 };
  });
  function expandAt(m) {
    const k = clamp(Math.floor(m + 1e-9), 0, KSTEPS), f = m - k;
    return { m, k, f, krylovDim: KRY.dims[k], residual: KRY.res[k], D: k, euclid: EUCLID[k], next: EUCLID[Math.min(k + 1, KSTEPS)] };
  }

  /* ---------- scenes, cards and state ---------- */
  const SC = {
    helix: { d3: true, max: HTURNS, rate: 0.36, step: 0.25 },
    horizon: { d3: false, max: 90, rate: 16, step: 5 },
    square: { d3: false, max: 360, rate: 34, step: 15 },
    phase: { d3: true, max: 720, rate: 80, step: 45 },
    wedge: { d3: true, max: 180, rate: 15, step: 5 },
    expand: { d3: false, max: KSTEPS, rate: 0.7, step: 1 }
  };
  const SQUARE_STILL = Math.atan2(3, 4) / DEG;                                  // the 3-4-5 triangle: 36.87°
  const CARDS = {
    'helix-shadow': { scene: 'helix', still: 2.75, play: true, from: 0, cam: 'iso', pitch: 0.1 },
    'horizon-limit': { scene: 'horizon', still: 90, play: true, from: 0, D: 4 },
    'fair-square': { scene: 'square', still: SQUARE_STILL, play: true, from: 0, stop: 360 - SQUARE_STILL },
    'phase-fold': { scene: 'phase', still: 180, play: true, from: 0, cam: 'iso' },
    'uncertainty-wedge': { scene: 'wedge', still: 0, play: true, from: 0, stop: 90, cam: 'iso', gamma: 90, az: 225 },
    'time-expand': { scene: 'expand', still: KSTEPS, play: true, from: 0 }
  };
  const CAMS = {
    helix: { iso: [-0.62, 0.3, 1], front: [0, 0.02, 1], top: [0, Math.PI / 2 - 0.001, 1] },
    phase: { iso: [-0.38, 0.3, 1], front: [0, 0.02, 1], top: [0, Math.PI / 2 - 0.001, 1] },
    wedge: { iso: [-0.95, 0.46, 1], front: [-0.78, 0.02, 1], top: [0, Math.PI / 2 - 0.001, 1] }
  };
  const state = {
    preset: null, scene: 'helix', cam: 'iso', pitch: 0.1, D: 4, gamma: 90, az: 225,
    at: { helix: 2.75, horizon: 90, square: SQUARE_STILL, phase: 180, wedge: 0, expand: KSTEPS }
  };
  const now = () => ({
    helix: helixAt(state.at.helix, state.pitch), horizon: horizonAt(state.at.horizon, state.D), square: squareAt(state.at.square),
    phase: phaseAt(state.at.phase), wedge: wedgeAt(state.at.wedge, state.az, state.gamma), expand: expandAt(state.at.expand)
  });

  /* ---------- the stage: one canvas, one kit.stage3 (2D scenes draw on its context) ---------- */
  const stageEl = $('stage'), cv = $('cv'), geo = {};
  const SOPT = { canvas: cv, yaw: -0.62, pitch: 0.3, zoom: 1, radius: 0.3, cx: 0.5, cy: 0.54, onChange: () => paint(), onPick: pickStart, onDrag: pickMove, onDrop: () => { drag = null; } };
  const st = kit.stage3(stageEl, SOPT);
  if (TRV.thumbMode) st.lw = 2;

  const ln = (ctx, a, b, col, w, al, dash) => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = (w || 1) * LW; ctx.globalAlpha = al == null ? 1 : al; ctx.setLineDash(dash || []); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore(); };
  const arw = (ctx, a, b, col, w, al, head) => {
    const dx = b[0] - a[0], dy = b[1] - a[1], Ln = Math.hypot(dx, dy);
    ln(ctx, a, b, col, w, al);
    if (Ln < 6) return;
    const h = Math.min((head || 11) * LW, Ln * 0.6), ux = dx / Ln, uy = dy / Ln;
    ctx.save(); ctx.fillStyle = col; ctx.globalAlpha = al == null ? 1 : al; ctx.beginPath(); ctx.moveTo(b[0], b[1]);
    ctx.lineTo(b[0] - ux * h - uy * h * 0.42, b[1] - uy * h + ux * h * 0.42); ctx.lineTo(b[0] - ux * h + uy * h * 0.42, b[1] - uy * h - ux * h * 0.42); ctx.closePath(); ctx.fill(); ctx.restore();
  };
  const poly = (ctx, pts, fill, fa, stroke, sa, w) => {
    ctx.save(); ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath();
    if (fill) { ctx.globalAlpha = fa == null ? 0.2 : fa; ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.globalAlpha = sa == null ? 0.9 : sa; ctx.strokeStyle = stroke; ctx.lineWidth = (w || 1.2) * LW; ctx.stroke(); }
    ctx.restore();
  };
  const ring = (ctx, c, r, col, w, al, dash, a0, a1, ccw) => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = (w || 1) * LW; ctx.globalAlpha = al == null ? 1 : al; ctx.setLineDash(dash || []); ctx.beginPath(); ctx.arc(c[0], c[1], r, a0 == null ? 0 : a0, a1 == null ? TAU : a1, !!ccw); ctx.stroke(); ctx.restore(); };
  const dot = (ctx, c, r, col, al, glow) => { ctx.save(); ctx.fillStyle = col; ctx.globalAlpha = al == null ? 1 : al; if (glow) { ctx.shadowColor = col; ctx.shadowBlur = glow; } ctx.beginPath(); ctx.arc(c[0], c[1], r * LW, 0, TAU); ctx.fill(); ctx.restore(); };
  const txt = (ctx, p, s, col, size, align, base) => { ctx.save(); ctx.font = `${size || 10.5}px ${TRV.fonts.data}`; ctx.fillStyle = col; ctx.textAlign = align || 'center'; ctx.textBaseline = base || 'middle'; ctx.fillText(s, p[0], p[1]); ctx.restore(); };
  const square90 = (ctx, at, u, v, k, col, al) => {   // a right-angle mark at `at` between the unit screen directions u and v
    const a = [at[0] + u[0] * k, at[1] + u[1] * k], b = [a[0] + v[0] * k, a[1] + v[1] * k], c = [at[0] + v[0] * k, at[1] + v[1] * k];
    ctx.save(); ctx.strokeStyle = col; ctx.globalAlpha = al == null ? 0.85 : al; ctx.lineWidth = 1.1 * LW; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.stroke(); ctx.restore();
  };
  const tag = (key, p, html, cls, dx, dy) => st.tag(key, p, html, cls, { screen: true, dx: dx || 0, dy: dy || 0 });

  /* ---------- the room of a 2D scene, and the size of what it writes ----------
     A 2D scene draws between the title block (and the scene buttons, where they are shown) and the legend, as they are
     laid out in this very frame: in a narrow cited figure both wrap onto several lines. Every label is reserved at its
     rendered size, a DOM label through a hidden copy with the same classes and a canvas text through measureText, so the
     scenes below place whole objects together with their labels instead of at fixed pixel offsets. */
  const hudTl = stageEl.querySelector('.hud-tl'), legendEl = $('legend');
  function room(W, H) {
    if (TRV.hudFit) TRV.hudFit();             // the title block takes its place (below the buttons or not) before it is measured
    const side = W < 560 ? 12 : 24, gap = 6, cb = cv.getBoundingClientRect();
    let top = 10, bottom = H - 10;
    if (!TRV.thumbMode) {                     // a cover hides the words, so it keeps the whole stage
      for (const el of [hudTl, $('stageCam')]) {
        if (!el || el.hidden) continue;
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) top = Math.max(top, r.bottom - cb.top + gap);
      }
      for (const el of legendEl ? [...legendEl.children] : []) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) bottom = Math.min(bottom, r.top - cb.top - gap);
      }
    }
    return { x: side, y: top, w: Math.max(0, W - 2 * side), h: Math.max(0, bottom - top) };
  }
  const meter = document.createElement('div');
  meter.setAttribute('aria-hidden', 'true'); meter.style.visibility = 'hidden';
  stageEl.appendChild(meter);
  const sizes = new Map();
  /** [width, height] of a stage label (st.tag) with this markup and these classes, as the browser renders it. */
  function tagSize(html, cls) {
    const key = `${document.documentElement.dataset.lang}|${cls}|${html}`;
    let s = sizes.get(key);
    if (!s) {
      meter.className = `tag ${cls}`; meter.innerHTML = html;
      const r = meter.getBoundingClientRect(); s = [r.width, r.height];
      meter.textContent = '';
      if (sizes.size > 600) sizes.clear();
      sizes.set(key, s);
    }
    return s;
  }
  /** The widest of several renderings, so a slot does not breathe while a number in its label changes. */
  const slot = (cls, ...htmls) => htmls.reduce((m, h) => { const s = tagSize(h, cls); return [Math.max(m[0], s[0]), Math.max(m[1], s[1])]; }, [0, 0]);
  /** The ink box of a canvas text relative to its anchor: { w, left, right, up, down } (all ≥ 0 away from the anchor). */
  function ink(s, font, align, base) {
    const c = cv.getContext('2d');
    c.save(); c.font = font; c.textAlign = align || 'center'; c.textBaseline = base || 'middle';
    const m = c.measureText(s); c.restore();
    return { w: m.actualBoundingBoxLeft + m.actualBoundingBoxRight, left: m.actualBoundingBoxLeft, right: m.actualBoundingBoxRight, up: m.actualBoundingBoxAscent, down: m.actualBoundingBoxDescent };
  }
  const dataFont = (px) => `${px}px ${TRV.fonts.data}`;

  /* ---------- scene 1 · helix ---------- */
  function drawHelix(D) {
    const pal = TRV.palette, h = D.helix, c = state.pitch, tMax = HTURNS * TAU, top = HZ0 + c * tMax;
    const g = 1.2;
    st.poly([[-g, -g, HZF], [g, -g, HZF], [g, g, HZF], [-g, g, HZF]], { fill: pal.cyan, alpha: 0.04 });
    for (let i = -2; i <= 2; i++) {
      const u = i * g / 2;
      st.line([u, -g, HZF], [u, g, HZF], { color: pal.cyan, alpha: 0.14, width: 0.8, fade: false });
      st.line([-g, u, HZF], [g, u, HZF], { color: pal.cyan, alpha: 0.14, width: 0.8, fade: false });
    }
    st.arrow([0, 0, HZF], [0, 0, Math.max(top, HZ0) + 0.34], { color: pal.violet, width: 1.6, alpha: 0.9, headSize: 9 });
    st.line([1, 0, HZF], [1, 0, Math.max(top, HZ0)], { color: pal.dim, width: 1.1, alpha: 0.75, dash: [3, 4], fade: false });
    const N = 300, all = [], done = [];
    for (let i = 0; i <= N; i++) { const s = tMax * i / N, p = helixWorld(s, c); all.push(p); if (s <= h.t) done.push(p); }
    done.push(helixWorld(h.t, c));
    st.path(all, { color: pal.magenta, width: 1.3, alpha: 0.3 });
    st.circle([0, 0, HZF], [0, 0, 1], 1, { color: pal.cyan, width: 2.4, alpha: 0.95, back: 0.55, n: 140 });
    if (done.length > 1) st.path(done, { color: pal.magenta, width: 2.8, alpha: 0.95 });
    const topView = st.cam.pitch > 1.15;
    for (let n = 0; n <= HTURNS; n++) {
      const p = helixWorld(n * TAU, c), reached = h.turns >= n - 1e-9, o = goldenState(n).orientation ? 1 : -1;
      st.arrow(p, v3.add(p, [0.26 * o, 0, 0]), { color: pal.sigma, width: 1.7, alpha: reached ? 0.95 : 0.4, headSize: 7, fade: false });
      st.dot(p, 5.2, pal.magenta, { alpha: reached ? 1 : 0.5, glow: reached ? 8 : 0, fade: false });
      if (!topView) st.tag('lv' + n, p, `n = ${n}`, 'num', { dx: o > 0 ? 40 : 34, dy: o > 0 ? -13 : 0, fade: false });
    }
    if (topView) st.tag('lv0', [1, 0, top], L('n = 0 … 3：同一个影子', 'n = 0 … 3: one shadow'), 'num', { dx: 0, dy: -20, fade: false });
    st.dot([1, 0, HZF], 5.6, pal.cyan, { glow: 9, fade: false });
    const cur = helixWorld(h.t, c), sh = [h.shadow[0], h.shadow[1], HZF];
    st.line(cur, sh, { color: pal.amber, width: 1.1, alpha: 0.65, dash: [4, 4], fade: false });
    st.dot(sh, 4.6, pal.cyan, { fade: false });
    st.dot(sh, 8.5, pal.amber, { ring: true, width: 1.7, fade: false });
    st.dot(cur, 6.6, pal.amber, { glow: 12, fade: false });
    // labels go on the screen-left side of the circle and of the helix, away from the level dots on the right
    const yaw = st.cam.yaw, left = Math.atan2(-Math.sin(yaw), Math.cos(yaw)) + Math.PI, low = Math.atan2(-Math.cos(yaw), -Math.sin(yaw));
    if (st.W < 560) st.tag('circ', [Math.cos(low), Math.sin(low), HZF], L('D = 2 的影子 S¹', 'Shadow in D = 2: S¹'), 'cy raw', { dx: -40, dy: 16, fade: false });
    else st.tag('circ', [Math.cos(left), Math.sin(left), HZF], L('D = 2 的影子 S¹', 'Shadow in D = 2: S¹'), 'cy raw', { dx: L(-66, -82), dy: 2, fade: false });
    if (!topView) st.tag('hx', helixWorld(2 * TAU + left, c), L('开口螺旋 h(t)', 'Open helix h(t)'), 'mg raw', { dy: -16, fade: false });
    st.tag('ax', [0, 0, Math.max(top, HZ0) + 0.5], L('层 n', 'Level n'), 'vi raw', { fade: false });
  }

  /* ---------- scene 2 · horizon ---------- */
  /* Left: the quarter circle above V_D, radius R, origin O, axes to 1.2 R. Every label keeps a slot of its own for each
     θ in [0°, 90°] (screen y grows downwards):
       e_{D+1}  left of the magenta arrowhead (right edge at O − 6);  V_D  right of the cyan arrowhead (left edge at O + 1.2 R + 5);
       cos θ    in a row under the axis that starts below the V_D box; its centre follows the middle of the cyan segment;
       θ        on the bisector of the amber arc, at radius ρ = rA + 6 + h/2 inside the quarter disc;
       sin θ    just above the amber tip (the vector and the magenta segment hang below the tip), right of the magenta
                axis (left edge ≥ O + 7) and inside the figure; it rises only as far as it must to clear the V_D box and
                the θ label where it shares their columns.
     horizonReach() bounds the figure with all of its labels for every θ, from R and the slot sizes, and R is the largest
     its panel holds. Right: the ladder over D, its title in a row of its own above the plot. */
  function horizonReach(R, Z) {
    const rA = Math.min(34, 0.45 * R), rho = rA + 6 + Z.th[1] / 2, hs = Z.sn[1];
    return {
      rA, rho,
      left: 6 + Z.ed[0],
      right: Math.max(1.2 * R + 5 + Z.vd[0], 7 + Z.sn[0]),
      up: Math.max(1.2 * R + Math.max(Z.ed[1] / 2, 6), R + 4 + hs, Math.SQRT1_2 * rho + Z.th[1] / 2 + 2 + hs, Z.vd[1] / 2 + 2 + hs),
      down: Math.max(Z.vd[1] / 2, 7) + 3 + Z.cs[1]
    };
  }
  function drawHorizon(ctx, W, H, D) {
    const pal = TRV.palette, hz = D.horizon, U = room(W, H), gap = 14;
    const Z = {
      vd: tagSize(`V${sub(hz.D)}`, 'cy raw'), ed: tagSize(`e${sub(hz.D + 1)}`, 'mg raw'), th: tagSize('θ', 'hot raw'),
      cs: slot('cy raw', `cos θ = ${fix(hz.cos, 2)}`, 'cos θ = 0.00'), sn: slot('mg raw', `sin θ = ${fix(hz.sin, 2)}`, 'sin θ = 0.00')
    };
    // the ladder needs its y ticks, ten columns in which the tick labels 9 and 10 do not touch, and its title row
    const f10 = dataFont(10), yt = Math.max(...['0', '0.5', '1'].map((t) => ink(t, f10, 'right').left));
    const t9 = ink('9', f10, 'center', 'top'), t10 = ink('10', f10, 'center', 'top');
    const oneHtml = `‖I − P${sub('V' + sub('D'))}‖ = 1`, one = tagSize(oneHtml, 'mg raw');
    const pl = Math.ceil(yt) + 8, pb = 5 + Math.ceil(Math.max(t9.down, t10.down)) + 3, col = (t9.w + t10.w) / 2 + 3;
    const cW = Math.max(pl + (DMAX + 0.3) * col + 4, one[0]), cH = one[1] + 6 + 40 + pb;
    const fitR = (w, h) => {
      let lo = 0, hi = 4000;
      for (let i = 0; i < 40; i++) { const R = (lo + hi) / 2, e = horizonReach(R, Z); if (e.left + e.right <= w && e.up + e.down <= h) lo = R; else hi = R; }
      return lo;
    };
    // side by side or stacked: whichever gives the larger quarter circle, the ladder keeping at least its own minimum
    const sideW = Math.max(0, Math.min((U.w - gap) / 2, U.w - gap - cW)), stackH = Math.max(0, Math.min((U.h - gap) / 2, U.h - gap - cH));
    const Rside = fitR(sideW, U.h), Rstack = fitR(U.w, stackH), side = Rside >= Rstack;
    const a = side ? { x: U.x, y: U.y, w: sideW, h: U.h } : { x: U.x, y: U.y, w: U.w, h: stackH };
    const b = side ? { x: U.x + sideW + gap, y: U.y, w: U.w - sideW - gap, h: U.h } : { x: U.x, y: U.y + stackH + gap, w: U.w, h: U.h - stackH - gap };
    const R = Math.max(8, side ? Rside : Rstack), e = horizonReach(R, Z);
    const O = [a.x + (a.w - e.left - e.right) / 2 + e.left, a.y + (a.h - e.up - e.down) / 2 + e.up];
    geo.layout = { room: U, blocks: [{ name: 'figure', x: O[0] - e.left, y: O[1] - e.up, w: e.left + e.right, h: e.up + e.down }, { name: 'ladder', ...b }] };
    const th = hz.thDeg * DEG, tip = [O[0] + R * Math.cos(th), O[1] - R * Math.sin(th)], foot = [tip[0], O[1]];
    ring(ctx, O, R, pal.dim, 1, 0.7, [3, 4], -Math.PI / 2, 0);
    arw(ctx, O, [O[0] + R * 1.2, O[1]], pal.cyan, 2.2, 0.95, 11);
    arw(ctx, O, [O[0], O[1] - R * 1.2], pal.magenta, 2.2, 0.95, 11);
    ln(ctx, O, foot, pal.cyan, 5.5, 0.95);
    ln(ctx, foot, tip, pal.magenta, 4.5, 0.95);
    if (hz.sin * R > 14 && hz.cos * R > 14) square90(ctx, foot, [-1, 0], [0, -1], 10, pal.sigma, 0.8);
    if (hz.thDeg > 2) ring(ctx, O, e.rA, pal.amber, 1.4, 0.9, null, -th, 0);
    arw(ctx, O, tip, pal.amber, 2.8, 1, 13);
    dot(ctx, foot, 4.6, pal.cyan, 1, 8);
    geo.hTip = tip; geo.hO = O;
    const vdX = O[0] + 1.2 * R + 5;
    tag('vd', [vdX + Z.vd[0] / 2, O[1]], `V${sub(hz.D)}`, 'cy raw');
    tag('ed', [O[0] - 6 - Z.ed[0] / 2, O[1] - 1.2 * R], `e${sub(hz.D + 1)}`, 'mg raw');
    tag('cs', [clamp(O[0] + R * hz.cos / 2, O[0] - e.left + Z.cs[0] / 2, O[0] + e.right - Z.cs[0] / 2), O[1] + Math.max(Z.vd[1] / 2, 7) + 3 + Z.cs[1] / 2],
      `cos θ = ${fix(hz.cos, 2)}`, 'cy raw');
    let tb = null;
    if (hz.thDeg > 10) {
      const p = [O[0] + e.rho * Math.cos(th / 2), O[1] - e.rho * Math.sin(th / 2)];
      tb = { l: p[0] - Z.th[0] / 2, r: p[0] + Z.th[0] / 2, t: p[1] - Z.th[1] / 2 };
      tag('th', p, 'θ', 'hot raw');
    }
    if (hz.sin > 0.14) {
      const [ws, hs] = Z.sn, cx = clamp(tip[0], O[0] + 7 + ws / 2, O[0] + e.right - ws / 2);
      let bottom = tip[1] - 4;
      if (cx + ws / 2 > vdX - 2) bottom = Math.min(bottom, O[1] - Z.vd[1] / 2 - 2);
      if (tb && cx - ws / 2 < tb.r + 2 && cx + ws / 2 > tb.l - 2) bottom = Math.min(bottom, tb.t - 2);
      tag('sn', [cx, bottom - hs / 2], `sin θ = ${fix(hz.sin, 2)}`, 'mg raw');
    }
    // right: the ladder over D: a fixed x converges, the witness e_{D+1} does not move
    const g = kit.plot(cv, { x: [0.35, DMAX + 0.65], y: [0, 1.2], pad: [b.x + pl, W - (b.x + b.w), b.y + one[1] + 6, H - (b.y + b.h) + pb], clear: false });
    g.axes({ xTicks: Array.from({ length: DMAX }, (_, i) => [i + 1, String(i + 1)]), yTicks: [[0, '0'], [0.5, '0.5'], [1, '1']], xLabel: 'D' });
    g.rect(hz.D - 0.48, 0, hz.D + 0.48, 1.16, pal.amber, { alpha: 0.05 });
    g.hline(1, pal.sigma, { alpha: 0.6, dash: [5, 4], width: 1.1 });
    for (let k = 1; k <= DMAX; k++) {
      const r2 = residual2(k), sel = k === hz.D, xa = k - 0.36, xb = k + 0.06;
      g.rect(xa, 0, xb, 1 - r2, pal.cyan, { alpha: sel ? 0.85 : 0.55 });
      g.rect(xa, 1 - r2, xb, 1, pal.magenta, { alpha: sel ? 0.85 : 0.55 });
      if (sel) g.rect(k + 0.12, 0, k + 0.4, witness2(k), pal.magenta, { alpha: 0.08, stroke: pal.magenta, strokeAlpha: 1, width: 1.5 });
      g.dot(k + 0.26, witness2(k), pal.magenta, 4.2 * LW, { ring: true, width: 1.8 });
    }
    const yA = hz.resid2;
    g.line([[hz.D + 0.12, yA], [hz.D + 0.4, yA]], pal.amber, { width: 2.2 });
    g.dot(hz.D + 0.26, yA, pal.amber, 4.4 * LW, { glow: 9 });
    tag('one', [clamp(g.X((DMAX + 1) / 2), b.x + one[0] / 2, b.x + b.w - one[0] / 2), b.y + one[1] / 2], oneHtml, 'mg raw');
  }

  /* ---------- scene 3 · squares and rotors ---------- */
  /* Three objects and the product, each bounded for every θ in [0°, 360°) by its drawing and the sizes of its labels:
       the square figure (radius R): the squares reach |x| ≤ (|cos θ| + |sin θ|) R ≤ √2 R and the axes 1.35 R. A sits on
         the side of the horizontal axis away from the tip. B stands beside the tip, across the amber arrow from the
         magenta square: its box lies B_GAP beyond the line through the tip perpendicular to the arrow, on the side
         away from both squares (wider than the arrowhead there) and on the tip's side of the axis, so it meets neither
         A, the squares nor their values, and it stays within the reach of the drawing itself once R is about 33 px
         (squareReach). The value of a square is written at its centre when its side is longer than 34 px;
       the rotor (radius rr): AB and BA by their dots, each kept on its own side of the horizontal axis (they are mirror
         images), either beside the dot, 10 px out on the side away from the vertical axis (within rr + 10 + w across
         and rr + h/2, or h + 1, up and down), or centred over it (under it, for the lower one) and raised past the dot,
         the circle, the product ring at (rr, 0) and the end of the vertical axis (within rr + w/2, or rr + 10, across
         and max(rr + 5.5, 1.3 rr, 10) + 2 + h up and down) (rotorReach);
       the product (AB)(BA) = 1, in a row of its own: under the rotor, or under the square and the rotor side by side;
       the gauges: a label, its bar, a label, its bar and the tick label 1, in rows; √2 under its tick when the rows have
         room for it, else after the end of the bar (gaugeBlock).
     squareLayout() tries seven packings of these blocks in the room, with either way of labelling the rotor, and keeps
     the one with the largest square (an earlier packing, AB and BA beside their dots and √2 under its tick win
     near-ties): three columns, square | rotor | gauges; square | rotor over gauges; square over rotor | gauges;
     square | rotor, over gauges; square over rotor, | gauges; square | rotor over the product, | gauges; and square |
     rotor over the product, over gauges. */
  // B's centre is d = B_GAP + (w/2)|sin θ| + (h/2)|cos θ| from the tip along the arrow's normal σe(−sin θ, cos θ) (σ, e
  // the signs of sin θ and cos θ, as the squares use them), so relative to O its box reaches ||cos θ| R − d |sin θ|| + w/2
  // across and |sin θ| R + d |cos θ| + h/2 up or down. Both are maximised over a quarter turn sampled every 0.5° (with R
  // rounded up to 1/8 px); between samples they move by less than (R + B_GAP + w + h)·0.0088 px, added with 1/8 px.
  const B_GAP = 6, reachMemo = new Map();
  const bOffset = (c, s, w, h) => B_GAP + (w / 2) * Math.abs(s) + (h / 2) * Math.abs(c);
  function bReach(R, w, h) {
    const key = `${Math.ceil(R * 8)}|${w}|${h}`;
    let v = reachMemo.get(key);
    if (!v) {
      const r = Math.ceil(R * 8) / 8, slack = (r + B_GAP + w + h) * 0.0088 + 0.125;
      let x = 0, y = 0;
      for (let i = 0; i <= 180; i++) {
        const f = i * Math.PI / 360, c = Math.cos(f), sn = Math.sin(f), d = bOffset(c, sn, w, h);
        x = Math.max(x, Math.abs(r * c - d * sn) + w / 2);
        y = Math.max(y, r * sn + d * c + h / 2);
      }
      v = [x + slack, y + slack];
      if (reachMemo.size > 4000) reachMemo.clear();
      reachMemo.set(key, v);
    }
    return v;
  }
  const aOffset = (R, Z) => Math.max(0.13 * R, Z.A[1] / 2 + 1);   // A's centre from the horizontal axis
  const squareReach = (R, Z) => {
    const [bx, by] = bReach(R, Z.B[0], Z.B[1]);
    return { x: Math.max(1.35 * R, Math.SQRT2 * R + 2, 1.12 * R + Z.A[0] / 2, bx), y: Math.max(1.35 * R, by, aOffset(R, Z) + Z.A[1] / 2) };
  };
  const SQUARE_READ = 20;   // the smallest square radius at which A, B and both squares read clearly apart
  const PRING = 10;         // the product ring at (rr, 0): radius 9 and half its stroke
  /** Half-size of the box around the rotor centre that holds its axes, the product ring and the AB, BA labels (w × h)
      for every θ: beside their dots, or over (under) them. */
  const rotorReach = (rr, w, h, over) => (over
    ? [Math.max(1.3 * rr, rr + PRING, rr + w / 2) + 1, Math.max(rr + 5.5, 1.3 * rr, PRING) + 2 + h + 1]
    : [Math.max(1.3 * rr, rr + 10 + w) + 1, Math.max(1.3 * rr, rr + h / 2, h + 1) + 1]);
  /** The gauge block for a track of length gw, in rows from its top: label 1, bar 1 (end tick ± 13), [√2], label 2,
      bar 2, the tick label 1; and its extent left and right of the track. */
  function gaugeBlock(gw, under, Z) {
    const bh = 13, hg = Math.max(Z.g1[1], Z.g2[1]), wg = Math.max(Z.g1[0], Z.g2[0]);
    const y1 = hg + 2 + bh, r2 = under ? y1 + bh + 1 + Z.r2.up + Z.r2.down + 2 : y1 + bh + 2;
    const y2 = r2 + hg + 2 + bh, h = y2 + bh + 3 + Z.one.up + Z.one.down;
    const left = Math.max(0, (wg - gw) / 2);
    const right = Math.max(0, (wg - gw) / 2, under ? gw * Math.SQRT2 / 1.5 + Z.r2.w / 2 - gw : 4 + Z.r2.w, gw / 1.5 + Z.one.w / 2 - gw);
    return { y1, y2, h, left, w: left + gw + right };
  }
  const layoutMemo = { key: '', value: null };
  function squareLayout(U, Z) {
    const key = [U.x, U.y, U.w, U.h, Z.A, Z.B, Z.ab, Z.pr, Z.g1, Z.g2, Z.r2.w, Z.r2.up, Z.r2.down, Z.one.w, Z.one.up, Z.one.down].join('|');
    if (layoutMemo.key === key) return layoutMemo.value;
    const gc = 10, gr = 10, gp = 4, gwMin = 64, gwMax = 360, P = { w: Z.pr[0], h: Z.pr[1] };
    const sq = (R) => { const r = squareReach(R, Z); return { w: 2 * r.x, h: 2 * r.y }; };
    const rot = (R, over) => { const rr = clamp(0.45 * R, 12, 72), [rx, ry] = rotorReach(rr, Z.ab[0], Z.ab[1], over); return { rr, over, w: 2 * rx, h: 2 * ry }; };
    // the rotor with the product in a row under it, as one block placed at (x, y)
    const stackP = (r) => ({ w: Math.max(r.w, P.w), h: r.h + gp + P.h });
    const putP = (r, x, y) => { const b = stackP(r); return { r: { ...r, x: x + (b.w - r.w) / 2, y }, p: { ...P, x: x + (b.w - P.w) / 2, y: y + r.h + gp } }; };
    // the longest track (at most gwMax) whose block fits the width; the shortest one when none does
    const gauge = (width, under) => {
      let lo = gwMin;
      if (gaugeBlock(gwMax, under, Z).w <= width) lo = gwMax;
      else if (gaugeBlock(gwMin, under, Z).w <= width) { let hi = gwMax; for (let i = 0; i < 24; i++) { const m = (lo + hi) / 2; if (gaugeBlock(m, under, Z).w <= width) lo = m; else hi = m; } }
      return Object.assign({ gw: lo, room: width }, gaugeBlock(lo, under, Z));
    };
    // each packing places the blocks in U for a square of radius R: wide says whether their widths fit, need is the
    // height they take, ok whether all of it fits
    const fit = (o) => Object.assign(o, { ok: o.wide && o.need <= U.h });
    // square | rotor, the product in a row under both, centred under the rotor as far as the row allows
    const pair = (s, r, x0, ht, y0) => {
      const w = Math.max(s.w + gc + r.w, P.w), xs = x0 + (w - s.w - gc - r.w) / 2, rx = xs + s.w + gc;
      return { w, s: { ...s, x: xs, y: y0 + (ht - s.h) / 2 }, r: { ...r, x: rx, y: y0 + (ht - r.h) / 2 },
        p: { ...P, x: clamp(rx + r.w / 2 - P.w / 2, x0, x0 + w - P.w), y: y0 + ht + gp } };
    };
    const PACKS = [
      (R, under, over) => {   // square | rotor | gauges
        const s = sq(R), r = rot(R, over), b = stackP(r), g = gauge(U.w - s.w - b.w - 2 * gc, under);
        return fit({ wide: g.w <= g.room, need: Math.max(s.h, b.h, g.h), s: { ...s, x: U.x, y: U.y + (U.h - s.h) / 2 },
          ...putP(r, U.x + s.w + gc, U.y + (U.h - b.h) / 2), g: { ...g, x: U.x + s.w + b.w + 2 * gc, y: U.y + (U.h - g.h) / 2 } });
      },
      (R, under, over) => {   // square | rotor over gauges
        const s = sq(R), r = rot(R, over), b = stackP(r), rw = U.w - s.w - gc, g = gauge(rw, under), y0 = U.y + (U.h - b.h - gr - g.h) / 2, x1 = U.x + s.w + gc;
        return fit({ wide: g.w <= rw && b.w <= rw, need: Math.max(s.h, b.h + gr + g.h), s: { ...s, x: U.x, y: U.y + (U.h - s.h) / 2 },
          ...putP(r, x1 + (rw - b.w) / 2, y0), g: { ...g, x: x1, y: y0 + b.h + gr } });
      },
      (R, under, over) => {   // square over rotor | gauges
        const s = sq(R), r = rot(R, over), b = stackP(r), g = gauge(U.w - b.w - gc, under), hb = Math.max(b.h, g.h), y0 = U.y + (U.h - s.h - gr - hb) / 2, yb = y0 + s.h + gr;
        return fit({ wide: g.w <= g.room && s.w <= U.w, need: s.h + gr + hb, s: { ...s, x: U.x + (U.w - s.w) / 2, y: y0 },
          ...putP(r, U.x, yb + (hb - b.h) / 2), g: { ...g, x: U.x + b.w + gc, y: yb + (hb - g.h) / 2 } });
      },
      (R, under, over) => {   // square | rotor, over gauges
        const s = sq(R), r = rot(R, over), b = stackP(r), g = gauge(U.w, under), ht = Math.max(s.h, b.h), y0 = U.y + (U.h - ht - gr - g.h) / 2, x0 = U.x + (U.w - s.w - gc - b.w) / 2;
        return fit({ wide: g.w <= U.w && s.w + gc + b.w <= U.w, need: ht + gr + g.h, s: { ...s, x: x0, y: y0 + (ht - s.h) / 2 },
          ...putP(r, x0 + s.w + gc, y0 + (ht - b.h) / 2), g: { ...g, x: U.x, y: y0 + ht + gr } });
      },
      (R, under, over) => {   // square over rotor, | gauges
        const s = sq(R), r = rot(R, over), b = stackP(r), lw = Math.max(s.w, b.w), g = gauge(U.w - lw - gc, under), hl = s.h + gr + b.h, y0 = U.y + (U.h - hl) / 2;
        return fit({ wide: g.w <= g.room, need: Math.max(hl, g.h), s: { ...s, x: U.x + (lw - s.w) / 2, y: y0 },
          ...putP(r, U.x + (lw - b.w) / 2, y0 + s.h + gr), g: { ...g, x: U.x + lw + gc, y: U.y + (U.h - g.h) / 2 } });
      },
      (R, under, over) => {   // square | rotor over the product, | gauges
        const s = sq(R), r = rot(R, over), ht = Math.max(s.h, r.h), hp = ht + gp + P.h, y0 = U.y + (U.h - hp) / 2, two = pair(s, r, U.x, ht, y0);
        const g = gauge(U.w - two.w - gc, under);
        return fit({ wide: g.w <= g.room, need: Math.max(hp, g.h), s: two.s, r: two.r, p: two.p, g: { ...g, x: U.x + two.w + gc, y: U.y + (U.h - g.h) / 2 } });
      },
      (R, under, over) => {   // square | rotor over the product, over gauges
        const s = sq(R), r = rot(R, over), ht = Math.max(s.h, r.h), g = gauge(U.w, under), y0 = U.y + (U.h - ht - gp - P.h - gr - g.h) / 2;
        const w = Math.max(s.w + gc + r.w, P.w), two = pair(s, r, U.x + (U.w - w) / 2, ht, y0);
        return fit({ wide: g.w <= U.w && w <= U.w, need: ht + gp + P.h + gr + g.h, s: two.s, r: two.r, p: two.p, g: { ...g, x: U.x, y: y0 + ht + gp + P.h + gr } });
      }
    ];
    let best = null, least = Infinity;
    for (const over of [false, true]) for (const under of [true, false]) {
      PACKS.forEach((pack, i) => {
        const read = pack(SQUARE_READ, under, over);
        if (read.wide) least = Math.min(least, read.need);    // the height the room would need for a readable square
        if (!pack(6, under, over).ok) return;
        let lo = 6, hi = 600;
        for (let k = 0; k < 32; k++) { const m = (lo + hi) / 2; if (pack(m, under, over).ok) lo = m; else hi = m; }
        if (!best || lo > best.R * 1.02) best = { R: lo, under, over, i };
      });
    }
    if (!best) best = { R: 6, under: false, over: false, i: 0 };
    layoutMemo.key = key;
    layoutMemo.value = Object.assign({ R: best.R, under: best.under, least }, PACKS[best.i](best.R, best.under, best.over));
    return layoutMemo.value;
  }
  /** A short lab stage asks for the height its 2D scene needs at a readable size, through the stage budget kit.plot
      keeps for a chart: the kit grows a scrolling lab's stage to it and leaves a cited figure or a still as they are. */
  const askHeight = (W, H, U, need) => { if (Number.isFinite(need)) kit.plot(cv, { x: [0, 1], y: [0, 1], pad: [0, 0, U.y, H - U.y - U.h], minHeight: Math.ceil(need), clear: false }); };
  function drawSquare(ctx, W, H, D) {
    const pal = TRV.palette, q = D.square, f105 = dataFont(10.5);
    const Z = {
      A: tagSize('A', 'ink raw'), B: tagSize('B', 'hot raw'), ab: slot('vi raw', 'AB', 'BA'), pr: tagSize('(AB)(BA) = 1', 'vi raw'),
      g1: slot('ink raw', `|cos θ| + |sin θ| = ${fix(q.l1, 3)}`, '|cos θ| + |sin θ| = 0.000'),
      g2: slot('ink raw', `cos²θ + sin²θ = ${fix(q.l2, 3)}`, 'cos²θ + sin²θ = 0.000'),
      r2: ink('√2', f105), one: ink('1', f105)
    };
    const U = room(W, H), lay = squareLayout(U, Z), R = lay.R, O = [lay.s.x + lay.s.w / 2, lay.s.y + lay.s.h / 2];
    if (R < SQUARE_READ) askHeight(W, H, U, lay.least);
    const S = (x, y) => [O[0] + R * x, O[1] - R * y];
    const c = q.c, s = q.s, F = [c, 0], B = [c, s];
    ring(ctx, O, R, pal.dim, 1, 0.55, [3, 4]);
    ln(ctx, S(-1.35, 0), S(1.35, 0), pal.dim, 1, 0.45);
    ln(ctx, S(0, -1.35), S(0, 1.35), pal.dim, 1, 0.3);
    const dn = s >= 0 ? -1 : 1, e = c >= 0 ? 1 : -1;
    poly(ctx, [S(0, 0), S(c, 0), S(c, dn * Math.abs(c)), S(0, dn * Math.abs(c))], pal.cyan, 0.2, pal.cyan, 0.9, 1.3);
    poly(ctx, [S(c, 0), S(c, s), S(c + e * Math.abs(s), s), S(c + e * Math.abs(s), 0)], pal.magenta, 0.2, pal.magenta, 0.9, 1.3);
    arw(ctx, S(0, 0), S(1, 0), pal.sigma, 2.4, 0.95, 11);
    ln(ctx, S(0, 0), S(...F), pal.cyan, 5, 0.95);
    ln(ctx, S(...F), S(...B), pal.magenta, 4.2, 0.95);
    if (Math.abs(c) * R > 14 && Math.abs(s) * R > 14) square90(ctx, S(...F), [-e, 0], [0, s >= 0 ? -1 : 1], 9, pal.sigma, 0.8);
    arw(ctx, S(0, 0), S(...B), pal.amber, 2.8, 1, 13);
    geo.sTip = S(...B); geo.sO = O; geo.sR = R;
    // A on the side of the axis away from the tip; B beside the tip, across the arrow from the magenta square
    const sg = -dn, dB = bOffset(c, s, Z.B[0], Z.B[1]);
    tag('A', [O[0] + 1.12 * R, O[1] + sg * aOffset(R, Z)], 'A', 'ink raw');
    tag('B', [O[0] + c * R - e * dB * Math.abs(s), O[1] - s * R - sg * dB * Math.abs(c)], 'B', 'hot raw');
    // the value of a square at its centre, when its side is longer than 34 px: the magenta one is behind B's line and
    // the axis keeps the two apart; the cyan one slides toward O if a wider font would bring it under A
    if (Math.abs(c) * R > 34) {
      const w = tagSize(fix(q.c2, 2), 'cy num')[0], x = c * R / 2;
      tag('c2', [O[0] + (c > 0 ? Math.min(x, 1.12 * R - Z.A[0] / 2 - 2 - w / 2) : x), O[1] - dn * Math.abs(c) * R / 2], fix(q.c2, 2), 'cy num');
    }
    if (Math.abs(s) * R > 34) tag('s2', S(c + e * Math.abs(s) / 2, s / 2), fix(q.s2, 2), 'mg num');
    // the rotor circle: AB and BA by their dots, each on its own side of the horizontal axis
    const rr = lay.r.rr, rc = [lay.r.x + lay.r.w / 2, lay.r.y + lay.r.h / 2];
    ln(ctx, [rc[0] - rr * 1.3, rc[1]], [rc[0] + rr * 1.3, rc[1]], pal.dim, 1, 0.5);
    ln(ctx, [rc[0], rc[1] + rr * 1.3], [rc[0], rc[1] - rr * 1.3], pal.dim, 1, 0.35);
    ring(ctx, rc, rr, pal.violet, 1.3, 0.6);
    const RP = (z) => [rc[0] + rr * z[0], rc[1] - rr * z[1]];
    ln(ctx, rc, RP(q.AB), pal.violet, 1.6, 0.85); ln(ctx, rc, RP(q.BA), pal.violet, 1.2, 0.6, [3, 3]);
    ring(ctx, RP(q.prod), 9 * LW, pal.violet, 2, 1);
    dot(ctx, RP(q.prod), 3, pal.violet);
    dot(ctx, RP(q.AB), 5.5, pal.violet, 1, 8);
    ring(ctx, RP(q.BA), 5.5 * LW, pal.violet, 1.8, 1);
    const out = (z, above, html) => {
      const [w, h] = tagSize(html, 'vi raw'), key = html === 'AB' ? 'ab' : 'ba', x = rr * z[0];
      if (!lay.r.over) {   // beside the dot, 10 px out from the vertical axis
        const y = rc[1] - rr * z[1];
        tag(key, [rc[0] + x + (z[0] >= 0 ? 1 : -1) * (10 + w / 2), above ? Math.min(y, rc[1] - h / 2 - 1) : Math.max(y, rc[1] + h / 2 + 1)], html, 'vi raw');
        return;
      }
      // centred over the dot (under it, for the lower one), 2 px past the highest of what lies under the label's span:
      // the dot, the circle, the product ring and the end of the vertical axis (sloping off beside it, so the label
      // moves continuously with θ)
      const m = Math.max(0, Math.abs(x) - w / 2), mp = Math.max(0, Math.abs(x - rr) - w / 2);
      const clear = Math.max(rr * Math.abs(z[1]) + 5.5, m < rr + 1 ? Math.sqrt((rr + 1) ** 2 - m * m) : 0, mp < PRING ? Math.sqrt(PRING * PRING - mp * mp) : 0, 1.3 * rr - 2 * m) + 2;
      tag(key, [rc[0] + x, rc[1] + (above ? -1 : 1) * (clear + h / 2)], html, 'vi raw');
    };
    const abUp = q.AB[1] >= 0;
    out(q.AB, abUp, 'AB'); out(q.BA, !abUp, 'BA');
    tag('pr', [lay.p.x + lay.p.w / 2, lay.p.y + lay.p.h / 2], '(AB)(BA) = 1', 'vi raw');
    // the two gauges, in their rows
    const G = lay.g, gw = G.gw, gx = G.x + (G.room - G.w) / 2 + G.left, gy = G.y + G.y1, gy2 = G.y + G.y2, bh = 13;
    geo.layout = { room: U, blocks: [{ name: 'square', x: lay.s.x, y: lay.s.y, w: lay.s.w, h: lay.s.h }, { name: 'rotor', x: lay.r.x, y: lay.r.y, w: lay.r.w, h: lay.r.h },
      { name: 'product', x: lay.p.x, y: lay.p.y, w: lay.p.w, h: lay.p.h }, { name: 'gauges', x: gx - G.left, y: G.y, w: G.w, h: G.h }] };
    const X = (v) => gx + gw * v / 1.5;
    const gauge = (y, parts, key, label) => {
      ln(ctx, [X(0), y], [X(1.5), y], pal.dim, 1, 0.6);
      let v0 = 0;
      for (const [len, col] of parts) { poly(ctx, [[X(v0), y - bh / 2], [X(v0 + len), y - bh / 2], [X(v0 + len), y + bh / 2], [X(v0), y + bh / 2]], col, 0.85, null); v0 += len; }
      ln(ctx, [X(v0), y - bh], [X(v0), y + bh], pal.ink, 1.6, 0.95);
      tag(key, [X(0.75), y - bh - 2 - tagSize(label, 'ink raw')[1] / 2], label, 'ink raw');
      return v0;
    };
    gauge(gy, [[Math.abs(c), pal.cyan], [Math.abs(s), pal.magenta]], 'g1', `|cos θ| + |sin θ| = ${fix(q.l1, 3)}`);
    gauge(gy2, [[q.c2, pal.cyan], [q.s2, pal.magenta]], 'g2', `cos²θ + sin²θ = ${fix(q.l2, 3)}`);
    ln(ctx, [X(1), gy - bh], [X(1), gy2 + bh + 2], pal.sigma, 1.2, 0.8, [4, 4]);
    ln(ctx, [X(Math.SQRT2), gy - 8], [X(Math.SQRT2), gy + 8], pal.dim, 1.2, 0.9);
    txt(ctx, [X(1), gy2 + bh + 3 + Z.one.up], '1', pal.dim, 10.5);
    if (lay.under) txt(ctx, [X(Math.SQRT2), gy + bh + 1 + Z.r2.up], '√2', pal.dim, 10.5);
    else txt(ctx, [X(1.5) + 4, gy], '√2', pal.dim, 10.5, 'left');
  }

  /* ---------- scene 4 · phase on the Bloch sphere ---------- */
  function overlayBox(W, H) {
    const wide = W >= H * 1.25;
    return wide ? { wide, x: W * 0.8, y: H * 0.42, w: Math.min(W * 0.3, 260) } : { wide, x: W * 0.5, y: H - 112, w: Math.min(W - 40, 320) };
  }
  function drawPhase(ctx, W, H, D) {
    const pal = TRV.palette, p = D.phase;
    st.sphere(1, { lat: [], lon: 2, alpha: 0.32 });
    st.circle([0, 0, 0], [0, 0, 1], 1, { color: pal.magenta, width: 2.4, alpha: 0.9, n: 140 });
    st.arrow([0, 0, -1.22], [0, 0, 1.3], { color: pal.cyan, width: 1.9, headSize: 9 });
    st.arrow([-1.3, 0, 0], [1.36, 0, 0], { color: pal.magenta, width: 1.5, alpha: 0.85, headSize: 9 });
    st.dot([0, 0, 0], 5.8, pal.cyan, { glow: 9, fade: false });
    st.dot([1, 0, 0], 8.5, pal.sigma, { ring: true, width: 2.1, fade: false });
    st.dot([-1, 0, 0], 8.5, pal.sigma, { ring: true, width: 2.1, fade: false });
    const bv = p.bloch;
    st.line(bv, [bv[0], 0, 0], { color: pal.amber, width: 1.1, alpha: 0.6, dash: [3, 4], fade: false });
    st.arrow([0, 0, 0], bv, { color: pal.amber, width: 2.7, glow: 8 });
    st.dot(bv, 5.8, pal.amber, { glow: 12 });
    st.tag('z', [0, 0, 1.46], 'Z', 'cy raw', { fade: false });
    st.tag('x', [1.5, 0, 0], 'X', 'mg raw', { fade: false });
    st.tag('pl', [1, 0, 0], '|+⟩ · X = +1', 'ink raw', { dy: 22, fade: false });
    st.tag('mi', [-1, 0, 0], '|−⟩ · X = −1', 'ink raw', { dy: 22, fade: false });
    st.tag('o', [0, 0, 0], L('Z 影子 → P(0) = ½', 'Z shadow → P(0) = ½'), 'cy raw', { dx: L(72, 82), dy: -(st.unit * 0.32 + 18), fade: false });
    // the half-angle lift: e^{iφ/2} squares to the phase e^{iφ}; one loop of φ ends the lift at −1
    const ob = overlayBox(W, H), r = clamp(Math.min(W, H) * 0.085, 26, 50), cc = ob.wide ? [ob.x, ob.y] : [W - r - 26, H - r - 92];
    ring(ctx, cc, r, pal.dim, 1.2, 0.85);
    ln(ctx, [cc[0] - r - 6, cc[1]], [cc[0] + r + 6, cc[1]], pal.dim, 1, 0.45);
    const lifted = p.phiDeg * DEG / 2;
    if (lifted > 1e-3) ring(ctx, cc, r, pal.violet, 2.2, 0.85, null, 0, -Math.min(lifted, TAU - 1e-4), true);
    dot(ctx, [cc[0] + r, cc[1]], 3, pal.sigma); dot(ctx, [cc[0] - r, cc[1]], 3, pal.sigma);
    txt(ctx, [cc[0] + r + 10, cc[1] + 12], '+1', pal.dim, 10.5, 'left');
    txt(ctx, [cc[0] - r - 10, cc[1] + 12], '−1', pal.dim, 10.5, 'right');
    const lp = [cc[0] + r * p.lift[0], cc[1] - r * p.lift[1]];
    dot(ctx, lp, 5.4, pal.amber, 1, 10);
    tag('lift', [cc[0], cc[1] - r - 16], L('半角 e<sup>iφ/2</sup>', 'Half angle e<sup>iφ/2</sup>'), 'raw');
  }

  /* ---------- scene 5 · uncertainty on the tangent plane ---------- */
  function drawWedge(ctx, W, H, D) {
    const pal = TRV.palette, w = D.wedge, n = w.n;
    st.sphere(1, { lat: [0], lon: 2, alpha: 0.28 });
    for (const [ax, key, lab] of [[w.a, 'A', 'A'], [w.b, 'B', 'B']]) {
      st.arrow(v3.scale(ax, -1.2), v3.scale(ax, 1.28), { color: pal.violet, width: 1.7, alpha: 0.9, headSize: 9 });
      st.tag(key, v3.scale(ax, 1.42), lab, 'vi raw', { fade: false });
    }
    const e1 = v3.unit(v3.cross(n, Math.abs(n[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])), e2 = v3.cross(n, e1), disc = [];
    for (let i = 0; i < 48; i++) { const t = TAU * i / 48; disc.push(v3.add(n, v3.add(v3.scale(e1, 0.62 * Math.cos(t)), v3.scale(e2, 0.62 * Math.sin(t))))); }
    st.poly(disc, { fill: pal.sigma, alpha: 0.04, color: pal.dim, strokeAlpha: 0.35, width: 0.8 });
    const pa = v3.add(n, w.ap), pb = v3.add(n, w.bp), pab = v3.add(pa, w.bp);
    st.poly([n, pa, pab, pb], { fill: pal.magenta, alpha: 0.3, color: pal.magenta, strokeAlpha: 0.9, width: 1.5 });
    const bl = v3.len(w.bp), bh = bl > 1e-9 ? v3.scale(w.bp, 1 / bl) : [0, 0, 0], proj = v3.scale(bh, v3.dot(w.ap, bh));
    if (v3.len(proj) > 1e-3) {
      st.line(pa, v3.add(n, proj), { color: pal.cyan, width: 1, alpha: 0.6, dash: [3, 3], fade: false });
      st.line(n, v3.add(n, proj), { color: pal.cyan, width: 4, alpha: 0.95, fade: false });
    }
    st.arrow(n, pa, { color: pal.sigma, width: 1.9, headSize: 8, fade: false });
    st.arrow(n, pb, { color: pal.sigma, width: 1.9, headSize: 8, fade: false });
    st.arrow([0, 0, 0], n, { color: pal.amber, width: 2.7, glow: 8 });
    st.dot(n, 6, pal.amber, { glow: 12, fade: false });
    st.tag('psi', v3.scale(n, 1.0), 'ψ', 'hot raw', { dx: -16, dy: -12, fade: false });
    if (v3.len(w.ap) > 0.12) st.tag('u', v3.add(n, v3.scale(w.ap, 1.18)), 'u', 'ink raw', { fade: false });
    if (v3.len(w.bp) > 0.12) st.tag('v', v3.add(n, v3.scale(w.bp, 1.18)), 'v', 'ink raw', { fade: false });
    // the bar: (ΔA)²(ΔB)² = C² + K² + G, on a fixed scale of 0 … 1
    const ob = overlayBox(W, H), x0 = ob.x - ob.w / 2, x1 = ob.x + ob.w / 2, y = ob.y, bh2 = 16, X = (v) => x0 + (x1 - x0) * v;
    poly(ctx, [[x0, y - bh2 / 2], [x1, y - bh2 / 2], [x1, y + bh2 / 2], [x0, y + bh2 / 2]], null, 0, pal.dim, 0.8, 1);
    let v0 = 0;
    for (const [len, col] of [[w.C2, pal.cyan], [w.K2, pal.magenta], [w.G, pal.violet]]) {
      if (len > 0) poly(ctx, [[X(v0), y - bh2 / 2], [X(v0 + len), y - bh2 / 2], [X(v0 + len), y + bh2 / 2], [X(v0), y + bh2 / 2]], col, 0.85, null);
      v0 += len;
    }
    ln(ctx, [X(w.prod), y - bh2], [X(w.prod), y + bh2], pal.ink, 1.8, 1);
    txt(ctx, [x0, y + bh2 + 10], '0', pal.dim, 10.5, 'center');
    txt(ctx, [x1, y + bh2 + 10], '1', pal.dim, 10.5, 'center');
    tag('bar', [(x0 + x1) / 2, y - bh2 - 14], `(ΔA)²(ΔB)² = ${fix(w.prod, 3)}`, 'ink raw');
    if ((x1 - x0) * w.C2 > 54) tag('bc', [X(w.C2 / 2), y + bh2 + 12], `C² = ${fix(w.C2, 2)}`, 'cy raw');
    if ((x1 - x0) * w.K2 > 54) tag('bk', [X(w.C2 + w.K2 / 2), y + bh2 + 12], `K² = ${fix(w.K2, 2)}`, 'mg raw');
    tag('bg', [(x0 + x1) / 2, y + bh2 + 32], `G = ${fix(w.G, 3)}`, 'vi raw');
  }

  /* ---------- scene 6 · the finite box and the axes outside it ---------- */
  /* Two bands of cells of side s, stacked in rows from the top of the room, each row as tall as what it holds:
       band 1: its title; head-room for the axis that stands up out of the box (1.3 s from the bottom of its cell); the box
         of six cells, with "unseen" over the dark cells and r = 0 in a slot right of the box;
       band 2: its title and the equation N_S = …; then the witness axes standing on the base line right of the prime
         cells, 1.55 s tall with each label e_q above its tip, or, when the room is too short for that, 1.3 s tall (as
         the axis of band 1) with each label beside the upper end of its shaft.
     expandBlock() gives the height and the width of the whole arrangement from s and the label sizes (the widest title,
     equation and witness labels over all seven steps, so nothing moves while the rail plays); s is the largest the room
     holds, at most 62. */
  const EQS = EUCLID.map((E) => `N${sub('S')} = ${E.S.length ? E.S.join('·') : '1'} + 1 = ${E.N}${E.factors.length > 1 ? ' = ' + E.factors.join(' × ') : ''}`);
  /** x of the witness axes of step k, from the left edge of the cells, and the right edge of their labels. */
  function witnessXs(k, s, beside, ws) {
    const xs = [];
    ws.forEach((w, j) => xs.push(j ? xs[j - 1] + Math.max(1.3 * s, beside ? 12 + ws[j - 1] : (ws[j - 1] + w) / 2 + 4) : (k + 0.9) * s));
    const last = xs.length - 1;
    return { xs, right: beside ? xs[last] + 6 + ws[last] : xs[last] + ws[last] / 2 };
  }
  function expandBlock(s, beside, Z) {
    const head = Math.max(0.3 * s + 2, 7), y1 = Z.k1[1] + 2 + head;
    const b1 = y1 + s + Math.max(7, (Math.max(Z.dk[1], Z.r0[1]) - s) / 2 + 1);
    const yk2 = b1 + 5, yeu = yk2 + Z.k2[1] + 2, eub = yeu + Z.eu[1];
    const tip = beside ? eub + 6 : eub + 3 + Z.ew[1] + 3, base = tip + (beside ? 1.3 : 1.55) * s;
    const r0x = Math.max(6 * s + 8, 5 * s + Z.dk[0] / 2 + 4);
    let right = Math.max(9.4 * s, r0x + Z.r0[0]);
    for (let k = 0; k <= KSTEPS; k++) right = Math.max(right, witnessXs(k, s, beside, Z.ew.k[k]).right);
    return { y1, yk2, yeu, tip, base, r0x, h: Math.max(base + 1, base - s / 2 + Z.p[1] / 2, beside ? tip - 3 + Z.ew[1] : 0), left: 6, w: 6 + right };
  }
  function drawExpand(ctx, W, H, D) {
    const pal = TRV.palette, e = D.expand, U = room(W, H), k = e.k, f = e.f;
    const box = (d) => L(`有限盒子 ℝ⁶ · dim O${sub('m')} = ${d}`, `A finite box ℝ⁶ · dim O${sub('m')} = ${d}`);
    const k2Html = L('开放模型 · 素数轴（MODEL）', 'Open model · prime axes (MODEL)'), dkHtml = L('读不到', 'unseen');
    const ew = EUCLID.map((E) => E.factors.map((q) => tagSize(`e${sub(q)}`, 'mg raw')));
    const Z = {
      k1: slot('raw', ...[...new Set(KRY.dims)].map(box)), k2: tagSize(k2Html, 'raw'), eu: slot('num', ...EQS), r0: tagSize('r = 0', 'hot raw'), dk: tagSize(dkHtml, 'raw'),
      p: slot('num', ...PRIMES.slice(0, KSTEPS).map(String)),
      ew: Object.assign([Math.max(...ew.flat().map((x) => x[0])), Math.max(...ew.flat().map((x) => x[1]))], { k: ew.map((a) => a.map((x) => x[0])) })
    };
    const fit = (beside) => {
      const ok = (s) => { const b = expandBlock(s, beside, Z); return b.w <= U.w && b.h <= U.h; };
      if (ok(62)) return 62;
      let lo = 6, hi = 62;
      for (let i = 0; i < 30; i++) { const m = (lo + hi) / 2; if (ok(m)) lo = m; else hi = m; }
      return lo;
    };
    const sA = fit(false), sB = fit(true), beside = sA < Math.min(sB, 22), s = beside ? sB : sA, B = expandBlock(s, beside, Z);
    // a cell as wide as two neighbouring prime labels need, and tall enough to hold one
    const pw = PRIMES.slice(0, KSTEPS).map((pr) => tagSize(String(pr), 'num')[0]), sRead = Math.max(Z.p[1] + 1, ...pw.slice(1).map((w, i) => (w + pw[i]) / 2 + 2));
    if (s < sRead) askHeight(W, H, U, expandBlock(sRead, true, Z).h);
    const T = U.y + Math.max(0, (U.h - B.h) / 2), x0 = U.x + Math.max(0, (U.w - B.w) / 2) + B.left;
    const y1 = T + B.y1, base = T + B.base, y2 = base - s, tipY = T + B.tip;
    geo.layout = { room: U, blocks: [{ name: 'bands', x: U.x, y: T, w: U.w, h: B.h }], cell: s, beside };
    const cx = (w) => clamp(x0 + 3 * s, U.x + w / 2, Math.max(U.x + w / 2, U.x + U.w - w / 2));
    const cell = (xi, yy, w) => [[xi, yy], [xi + w, yy], [xi + w, yy + s], [xi, yy + s]];
    // band 1: a fixed box of six slots and the observable Krylov tower inside it
    const d0 = KRY.dims[k], d1 = KRY.dims[Math.min(k + 1, KSTEPS)], growing = d1 > d0 && f > 0;
    for (let i = 0; i < KDIM; i++) {
      if (i < d0) poly(ctx, cell(x0 + i * s, y1, s), pal.cyan, 0.5, pal.cyan, 0.95, 1.2);
      else poly(ctx, cell(x0 + i * s, y1, s), pal.faint, 0.35, pal.lineHot, 0.6, 1);
    }
    if (growing) {
      const xi = x0 + d0 * s, up = ease(f / 0.55), fill = ease((f - 0.55) / 0.45);
      if (fill > 0) poly(ctx, cell(xi, y1, s), pal.cyan, 0.5 * fill, pal.cyan, fill, 1.2);
      if (fill < 1) {
        arw(ctx, [xi, y1 + s], [xi, y1 + s - s * 1.3 * up], pal.magenta, 2.6, 1 - fill, 10);
        if (up > 0.3) square90(ctx, [xi, y1 + s], [1, 0], [0, -1], 8, pal.sigma, 0.8 * (1 - fill));
      }
    }
    const grewNow = k === 0 || KRY.dims[k] > KRY.dims[k - 1];
    if (d0 > 0 && grewNow) poly(ctx, cell(x0 + (d0 - 1) * s, y1, s), null, 0, pal.amber, 1, 2);
    ln(ctx, [x0, y1 - 6], [x0, y1 + s + 6], pal.sigma, 3, 0.85);
    ln(ctx, [x0 + KDIM * s, y1 - 6], [x0 + KDIM * s, y1 + s + 6], pal.sigma, 3, 0.85);
    tag('k1', [cx(Z.k1[0]), T + Z.k1[1] / 2], box(d0), 'raw');
    if (k >= 1 && KRY.dims[k] === KRY.dims[k - 1] && !(f > 0 && k < KSTEPS)) tag('r0', [x0 + B.r0x + Z.r0[0] / 2, y1 + s / 2], 'r = 0', 'hot raw');
    if (KRY.stableAt >= 0 && k >= KRY.stableAt) tag('dk', [x0 + (d0 + KDIM) / 2 * s, y1 + s / 2], dkHtml, 'raw');
    // band 2: the model: prime axes, and Euclid's witnesses standing outside them
    const ec = e.euclid, nx = e.next, cellsNow = k + (k < KSTEPS ? ease(f) : 0);
    ln(ctx, [x0 - 6, base], [x0 + 9.4 * s, base], pal.dim, 1, 0.45, [3, 4]);
    for (let i = 0; i < Math.ceil(cellsNow - 1e-9); i++) {
      const wf = clamp(cellsNow - i, 0, 1);
      poly(ctx, cell(x0 + i * s, y2, s * wf), pal.cyan, 0.5 * wf, pal.cyan, 0.95 * wf, 1.2);
      if (wf > 0.6) tag('p' + i, [x0 + (i + 0.5) * s, y2 + s / 2], String(PRIMES[i]), 'num');
    }
    if (k > 0) poly(ctx, cell(x0 + (k - 1) * s, y2, s), null, 0, pal.amber, 1, 2);
    const witnesses = (E, kk, alpha, keyBase) => {
      if (alpha <= 0.02) return;
      const ws = Z.ew.k[kk], { xs } = witnessXs(kk, s, beside, ws);
      E.factors.forEach((q, j) => {
        const xq = x0 + xs[j];
        arw(ctx, [xq, base], [xq, tipY], pal.magenta, 2.6, alpha, 10);
        square90(ctx, [xq, base], [-1, 0], [0, -1], 8, pal.sigma, 0.8 * alpha);
        if (alpha > 0.5) tag(keyBase + j, beside ? [xq + 6 + ws[j] / 2, tipY - 3 + Z.ew[1] / 2] : [xq, tipY - 3 - Z.ew[1] / 2], `e${sub(q)}`, 'mg raw');
      });
    };
    witnesses(ec, k, k < KSTEPS ? 1 - ease(f / 0.4) : 1, 'w');
    if (k < KSTEPS) witnesses(nx, k + 1, ease((f - 0.6) / 0.4), 'v');
    const E = f > 0.6 && k < KSTEPS ? nx : ec;
    tag('k2', [cx(Z.k2[0]), T + B.yk2 + Z.k2[1] / 2], k2Html, 'raw');
    tag('eu', [cx(Z.eu[0]), T + B.yeu + Z.eu[1] / 2], EQS[EUCLID.indexOf(E)], 'num');
  }

  /* ---------- the stage ---------- */
  function drawStage(D) {
    const W = cv.clientWidth, H = cv.clientHeight, sc = state.scene, wide = W >= H * 1.25, narrow = W < 560, m = Math.max(1, Math.min(W, H));
    const top = TRV.thumbMode ? 24 : narrow ? 78 : 62, bottom = TRV.thumbMode ? 24 : narrow ? 70 : 46;
    if (sc === 'helix') {
      // the helix, its axis label and the floor need about 3.2 units of height and 3.4 of width
      const unit = Math.min((H - top - bottom) / 3.2, W / 3.4);
      SOPT.cx = 0.5; SOPT.radius = unit / m; SOPT.cy = (top + 1.42 * unit) / H;
    } else if (sc === 'phase' || sc === 'wedge') {
      const low = wide ? 0 : 104, unit = Math.min((H - top - bottom - low) / 2.8, (wide ? W * 0.64 : W) / 3.1);
      SOPT.cx = wide ? 0.36 : 0.5; SOPT.radius = unit / m; SOPT.cy = (top + (H - top - bottom - low) / 2) / H;
    }
    const ctx = st.begin();
    geo.hTip = geo.sTip = geo.layout = null;
    if (sc === 'helix') drawHelix(D);
    else if (sc === 'horizon') drawHorizon(ctx, W, H, D);
    else if (sc === 'square') drawSquare(ctx, W, H, D);
    else if (sc === 'phase') drawPhase(ctx, W, H, D);
    else if (sc === 'wedge') drawWedge(ctx, W, H, D);
    else drawExpand(ctx, W, H, D);
    st.end();
  }

  /* ---------- the strip: along the rail, what changes and what does not ---------- */
  function drawStrip(D) {
    const pc = $('plot');
    if (!pc || !pc.clientWidth || !pc.clientHeight) return;
    const pal = TRV.palette, sc = state.scene, at = state.at[sc], pad = [36, 12, 10, 22], N = 240;
    const samp = (x0, x1, fn) => Array.from({ length: N + 1 }, (_, i) => { const x = x0 + (x1 - x0) * i / N; return [x, fn(x)]; });
    let title = '', meta = '', g;
    if (sc === 'helix') {
      const c = state.pitch, hmax = Math.max(1.1, c * TAU * HTURNS + 0.1);
      title = L('高度一直涨，影子转回原处', 'The height keeps rising, the shadow comes back');
      meta = `h = ${fix(D.helix.height, 2)} · cos t = ${fix(D.helix.shadow[0], 2)}`;
      g = kit.plot(pc, { x: [0, HTURNS], y: [-1.15, hmax], pad });
      g.axes({ xTicks: [0, 1, 2, 3].map((k) => [k, String(k)]), yTicks: [[-1, '−1'], [0, '0'], [1, '1']], xLabel: L('圈', 'turns') });
      g.line(samp(0, HTURNS, (x) => Math.cos(TAU * x)), pal.cyan, { width: 1.8 });
      g.line(samp(0, HTURNS, (x) => c * TAU * x), pal.magenta, { width: 1.8 });
      for (let n = 0; n <= HTURNS; n++) g.dot(n, 1, pal.cyan, 3.2, { ring: true });
      g.vline(at, pal.amber, { alpha: 0.8 }); g.dot(at, Math.cos(TAU * at), pal.amber, 3.6); g.dot(at, c * TAU * at, pal.amber, 3.6);
      g.legend([[pal.cyan, L('影子 cos t', 'shadow cos t')], [pal.magenta, L('高度 c·t', 'height c·t')]], { right: false });
    } else if (sc === 'horizon') {
      title = L('影子²与余量²此消彼长，和不变', 'Shadow² and residual² trade off; the sum stays');
      meta = `cos²θ + sin²θ = ${fix(D.horizon.sum, 4)}`;
      g = kit.plot(pc, { x: [0, 90], y: [0, 1.15], pad });
      g.axes({ xTicks: [0, 30, 60, 90].map((v) => [v, `${v}°`]), yTicks: [[0, '0'], [0.5, '0.5'], [1, '1']] });
      g.line(samp(0, 90, (x) => Math.cos(x * DEG) ** 2), pal.cyan, { width: 1.8 });
      g.line(samp(0, 90, (x) => Math.sin(x * DEG) ** 2), pal.magenta, { width: 1.8 });
      g.hline(1, pal.sigma, { dash: [4, 3], alpha: 0.8 });
      g.vline(at, pal.amber, { alpha: 0.8 }); g.dot(at, D.horizon.shadow2, pal.amber, 3.6); g.dot(at, D.horizon.resid2, pal.amber, 3.6);
      g.legend([[pal.cyan, 'cos²θ'], [pal.magenta, 'sin²θ'], [pal.sigma, L('和', 'sum'), 'dash']], { right: true });
    } else if (sc === 'square') {
      title = L('一次方摇摆，平方和不动', 'The first power swings, the square sum does not');
      meta = `${fix(D.square.l1, 3)} · ${fix(D.square.l2, 3)}`;
      g = kit.plot(pc, { x: [0, 360], y: [0, 1.6], pad });
      g.axes({ xTicks: [0, 90, 180, 270, 360].map((v) => [v, `${v}°`]), yTicks: [[0, '0'], [1, '1'], [Math.SQRT2, '√2']] });
      g.line(samp(0, 360, (x) => Math.abs(Math.cos(x * DEG)) + Math.abs(Math.sin(x * DEG))), pal.ink, { width: 1.8 });
      g.line(samp(0, 360, (x) => Math.cos(x * DEG) ** 2 + Math.sin(x * DEG) ** 2), pal.cyan, { width: 2.2 });
      g.vline(at, pal.amber, { alpha: 0.8 }); g.dot(at, D.square.l1, pal.amber, 3.6); g.dot(at, D.square.l2, pal.amber, 3.6);
      g.legend([[pal.ink, '|cos θ| + |sin θ|'], [pal.cyan, 'cos²θ + sin²θ']], { right: true, bottom: true });
    } else if (sc === 'phase') {
      title = L('对角读数不动，X 读数翻转', 'The diagonal readout stays, the X readout turns over');
      meta = `P(0) = ${fix(D.phase.p0, 3)} · ⟨X⟩ = ${fix(D.phase.x, 3)}`;
      g = kit.plot(pc, { x: [0, 720], y: [-1.15, 1.15], pad });
      g.axes({ xTicks: [0, 180, 360, 540, 720].map((v) => [v, `${v}°`]), yTicks: [[-1, '−1'], [0, '0'], [0.5, '½'], [1, '1']] });
      g.line(samp(0, 720, () => 0.5), pal.cyan, { width: 2 });
      g.line(samp(0, 720, (x) => Math.cos(x * DEG)), pal.magenta, { width: 1.8 });
      g.line(samp(0, 720, (x) => Math.cos(x * DEG / 2)), pal.violet, { width: 1.5, dash: [5, 3] });
      g.vline(at, pal.amber, { alpha: 0.8 }); g.dot(at, 0.5, pal.amber, 3.6); g.dot(at, D.phase.x, pal.amber, 3.6);
      g.legend([[pal.cyan, 'P(0)'], [pal.magenta, '⟨X⟩ = cos φ'], [pal.violet, 'cos(φ/2)', 'dash']], { right: true, bottom: true });
    } else if (sc === 'wedge') {
      title = L('协方差与对易面积相加，正好是方差之积', 'Covariance and commutator area add up to the product of variances');
      meta = `${fix(D.wedge.prod, 3)} = ${fix(D.wedge.C2, 3)} + ${fix(D.wedge.K2, 3)} + ${fix(D.wedge.G, 3)}`;
      const f = (x) => wedgeAt(x, state.az, state.gamma);
      const pts = samp(0, 180, (x) => x).map(([x]) => [x, f(x)]);
      g = kit.plot(pc, { x: [0, 180], y: [0, 1.1], pad });
      g.axes({ xTicks: [0, 45, 90, 135, 180].map((v) => [v, `${v}°`]), yTicks: [[0, '0'], [0.5, '0.5'], [1, '1']] });
      g.area(pts.map(([x, w]) => [x, w.C2]), pal.cyan, { alpha: 0.25 });
      g.line(pts.map(([x, w]) => [x, w.C2]), pal.cyan, { width: 1.8 });
      g.line(pts.map(([x, w]) => [x, w.K2]), pal.magenta, { width: 1.8 });
      g.line(pts.map(([x, w]) => [x, w.prod]), pal.ink, { width: 1.6, dash: [5, 3] });
      g.vline(at, pal.amber, { alpha: 0.8 }); g.dot(at, D.wedge.prod, pal.amber, 3.6);
      g.legend([[pal.cyan, 'C²'], [pal.magenta, 'K²'], [pal.ink, '(ΔA)²(ΔB)²', 'dash']], { right: true });
    } else {
      title = L('盒内的秩封顶，模型的秩每步加一', 'The rank in the box tops out; the model adds one each step');
      meta = `dim O = ${D.expand.krylovDim} · D = ${D.expand.D}`;
      g = kit.plot(pc, { x: [0, KSTEPS], y: [0, 7], pad });
      g.axes({ xTicks: Array.from({ length: KSTEPS + 1 }, (_, i) => [i, String(i)]), yTicks: [[0, '0'], [2, '2'], [4, '4'], [6, '6']] });
      const stair = (fn) => { const out = []; for (let m = 0; m <= KSTEPS; m++) { out.push([m, fn(m)]); if (m < KSTEPS) out.push([m + 1, fn(m)]); } return out; };
      g.hline(KDIM, pal.dim, { dash: [4, 3], alpha: 0.9 });
      g.line(stair((m) => KRY.dims[m]), pal.cyan, { width: 2 });
      g.line(stair((m) => m), pal.magenta, { width: 2 });
      g.vline(at, pal.amber, { alpha: 0.8 });
      g.legend([[pal.cyan, L('盒内 dim O', 'box dim O')], [pal.magenta, L('模型 D', 'model D')], [pal.dim, 'dim V = 6', 'dash']], { right: false });
    }
    $('pTitle').textContent = title; $('pMeta').textContent = meta;
  }

  /* ---------- words: pills, title, legend, readouts ---------- */
  const SCENE_NAME = { helix: ['螺旋', 'helix'], horizon: ['视界', 'horizon'], square: ['平方', 'squares'], phase: ['相位', 'phase'], wedge: ['楔面', 'wedge'], expand: ['扩维', 'expand'] };
  const sw = (cls, zh, en) => `<span><i class="sw ${cls}"></i><b class="lb">${L(zh, en)}</b></span>`;
  const LEGEND = {
    helix: () => [sw('mg', '品红：螺旋，高度一直涨', 'magenta: the helix, rising'), sw('cy', '青色：平面影子 S¹', 'cyan: planar shadow S¹'), sw('vi', '紫色：层轴', 'violet: level axis'), sw('ink', '白旗：朝向', 'white flags: orientation'), sw('am', '琥珀：当前', 'amber: now')],
    horizon: () => [sw('cy', `青色：V${sub('D')} 里的影子`, `cyan: shadow in V${sub('D')}`), sw('mg', '品红：余量', 'magenta: residual'), sw('box hollow mg', `空心圈与柱：e${sub('D+1')} 的余量² = 1`, `hollow: residual² of e${sub('D+1')} = 1`), sw('am', '琥珀：当前向量', 'amber: current vector')],
    square: () => [sw('cy', '青色：影子 cos θ 与其平方', 'cyan: shadow cos θ, its square'), sw('mg', '品红：高度 sin θ 与其平方', 'magenta: height sin θ, its square'), sw('vi', '紫色：AB 与 BA', 'violet: AB and BA'), sw('am', '琥珀：B', 'amber: B')],
    phase: () => [sw('cy', '青色：Z 轴与对角读数', 'cyan: Z axis, diagonal readout'), sw('mg', '品红：相位环与 X 轴', 'magenta: phase ring, X axis'), sw('ink', '白圈：|+⟩、|−⟩', 'white rings: |+⟩, |−⟩'), sw('am', '琥珀：当前态与半角', 'amber: state and half angle')],
    wedge: () => [sw('vi', '紫色：观测轴 A、B', 'violet: axes A, B'), sw('cy', '青色：协方差 C（线）', 'cyan: covariance C (line)'), sw('mg', '品红：对易面积 K', 'magenta: commutator area K'), sw('am', '琥珀：态 ψ', 'amber: state ψ')],
    expand: () => [sw('cy', '青色：已有的轴', 'cyan: axes already there'), sw('mg', '品红：立在外面的新轴', 'magenta: new axis outside'), sw('box dm', '暗格：读不到', 'dark: unseen'), sw('am', '琥珀框：这一步', 'amber frame: this step')]
  };
  function stepText(D) {
    const sc = state.scene;
    if (sc === 'helix') return L(`t = ${fix(D.helix.turns, 2)} 圈`, `t = ${fix(D.helix.turns, 2)} turns`);
    if (sc === 'horizon') return `θ = ${fix(D.horizon.thDeg, 1)}°`;
    if (sc === 'square') return `θ = ${fix(D.square.thDeg, 1)}°`;
    if (sc === 'phase') return `φ = ${fix(D.phase.phiDeg, 0)}°`;
    if (sc === 'wedge') return L(`倾角 ${fix(D.wedge.alphaDeg, 1)}°`, `tilt ${fix(D.wedge.alphaDeg, 1)}°`);
    return L(`第 ${D.expand.k} 步`, `step ${D.expand.k}`);
  }
  const INV = {
    helix: () => 'χ₁(n) = 1', horizon: () => '‖I − P‖ = 1', square: () => '(AB)(BA) = 1',
    phase: () => 'P(0) = ½', wedge: () => 'C² + K² + G', expand: () => L('增长 ≤ 5 步', '≤ 5 steps')
  };
  function hudText(D) {
    const sc = state.scene;
    if (sc === 'helix') {
      const h = D.helix;
      return [L(`螺旋 · 第 ${h.level} 层`, `HELIX · LEVEL ${h.level}`),
        L(`高度 ${fix(h.height, 2)} · 影子 (${fix(h.shadow[0], 2)}, ${fix(h.shadow[1], 2)})：影子每圈回到 (1, 0)，高度不回来`, `height ${fix(h.height, 2)} · shadow (${fix(h.shadow[0], 2)}, ${fix(h.shadow[1], 2)}): back at (1, 0) each turn, the height is not`)];
    }
    if (sc === 'horizon') {
      const z = D.horizon;
      return [L(`视界 · ${fix(z.thDeg, 1)}°`, `HORIZON · ${fix(z.thDeg, 1)}°`),
        L(`影子 cos θ = ${fix(z.cos, 3)} 在 V${sub(z.D)} 里，余量 sin θ = ${fix(z.sin, 3)} 沿 e${sub(z.D + 1)}`, `shadow cos θ = ${fix(z.cos, 3)} in V${sub(z.D)}, residual sin θ = ${fix(z.sin, 3)} along e${sub(z.D + 1)}`)];
    }
    if (sc === 'square') {
      const q = D.square;
      return [L(`平方 · ${fix(q.thDeg, 1)}°`, `SQUARES · ${fix(q.thDeg, 1)}°`),
        L(`一次方 ${fix(q.l1, 3)}，平方和 ${fix(q.l2, 3)}，(AB)(BA) = ${fix(q.prod[0], 3)}`, `first power ${fix(q.l1, 3)}, square sum ${fix(q.l2, 3)}, (AB)(BA) = ${fix(q.prod[0], 3)}`)];
    }
    if (sc === 'phase') {
      const p = D.phase;
      return [L(`相位 · ${fix(p.phiDeg, 0)}°`, `PHASE · ${fix(p.phiDeg, 0)}°`),
        L(`对角读数 P(0) = ${fix(p.p0, 3)}，X 读数 ${fix(p.x, 3)}，半角 (${fix(p.lift[0], 2)}, ${fix(p.lift[1], 2)})`, `diagonal readout P(0) = ${fix(p.p0, 3)}, X readout ${fix(p.x, 3)}, half angle (${fix(p.lift[0], 2)}, ${fix(p.lift[1], 2)})`)];
    }
    if (sc === 'wedge') {
      const w = D.wedge;
      return [L(`楔面 · 倾角 ${fix(w.alphaDeg, 1)}°`, `WEDGE · TILT ${fix(w.alphaDeg, 1)}°`),
        `(ΔA)²(ΔB)² = ${fix(w.prod, 3)} = ${fix(w.C2, 3)} + ${fix(w.K2, 3)} + ${fix(w.G, 3)}`];
    }
    const e = D.expand;
    return [L(`扩维 · 第 ${e.k} 步`, `EXPANSION · STEP ${e.k}`),
      L(`盒内 dim O = ${e.krylovDim} / 6，模型 D = ${e.D}，N${sub('S')} = ${e.euclid.N}`, `box dim O = ${e.krylovDim} / 6, model D = ${e.D}, N${sub('S')} = ${e.euclid.N}`)];
  }
  function readouts(D) {
    const sc = state.scene;
    if (sc === 'helix') {
      const h = D.helix;
      return { aside: `c = ${fix(state.pitch, 3)}`, keyL: L('平面影子 = 读数 χ₁', 'Planar shadow = readout χ₁'), key: `(${fix(h.shadow[0], 3)}, ${fix(h.shadow[1], 3)})`, keySub: L(`高度 h = c·t = ${fix(h.height, 3)}`, `height h = c·t = ${fix(h.height, 3)}`),
        rows: [[L(`第 ${h.level} 层的读数`, `Readout at level ${h.level}`), `(${fix(h.readout[0], 3)}, ${fix(h.readout[1], 3)})`], [L('走一步读数之差', 'Readout change per step'), fix(h.readoutGap, 3)],
          [L('层 n · 标度 s = nT', 'Level n · scale s = nT'), `${h.level} · ${fix(h.golden.scale, 3)}`], [L('朝向 o', 'Orientation o'), h.golden.orientation ? L('原向', 'as at n = 0') : L('翻转', 'flipped')],
          [L('h(0) 与 h(2π)', 'h(0) and h(2π)'), `(1, 0, 0) ≠ (1, 0, ${fix(h.h2pi[2], 3)})`]],
        note: L('影子每圈回到原处，层与高度不回来；把螺距 c 调到 0，螺旋才压成这个圆。', 'The shadow returns every turn; the level and the height do not. Only with pitch c = 0 does the helix collapse onto the circle.') };
    }
    if (sc === 'horizon') {
      const z = D.horizon;
      return { aside: `D = ${z.D}`, keyL: L('影子 cos θ · 余量 sin θ', 'Shadow cos θ · residual sin θ'), key: `${fix(z.cos, 3)} · ${fix(z.sin, 3)}`, keySub: `cos²θ + sin²θ = ${fix(z.sum, 4)}`,
        rows: [[L(`固定 x 在 V${sub(z.D)} 上的影子²`, `Shadow² of the fixed x on V${sub(z.D)}`), fix(z.xShadow2, 4)], [L('固定 x 的余量²', 'Residual² of the fixed x'), fix(z.xResid2, 4)],
          [L(`e${sub(z.D + 1)} 的余量²`, `Residual² of e${sub(z.D + 1)}`), fix(z.witness, 4)], ['‖I − P‖', fix(Math.sqrt(z.witness), 4)],
          [L('固定 x 的余量²：D = 1 → 10', 'Residual² of the fixed x: D = 1 → 10'), `${fix(residual2(1), 3)} → ${fix(residual2(DMAX), 3)}`]],
        note: L(`对每个固定的 x，余量随 D 趋于 0（强收敛）；可 e${sub('D+1')} 的余量永远是 1，所以 ‖I − P${sub('D')}‖ 不趋于 0。`, `For each fixed x the residual tends to 0 with D (strong convergence); yet e${sub('D+1')} always keeps residual 1, so ‖I − P${sub('D')}‖ does not tend to 0.`) };
    }
    if (sc === 'square') {
      const q = D.square;
      return { aside: `θ = ${fix(q.thDeg, 2)}°`, keyL: L('平方和 cos²θ + sin²θ', 'Square sum cos²θ + sin²θ'), key: `${fix(q.c2, 4)} + ${fix(q.s2, 4)} = ${fix(q.l2, 4)}`, keySub: L(`一次方 |cos θ| + |sin θ| = ${fix(q.l1, 4)}`, `first power |cos θ| + |sin θ| = ${fix(q.l1, 4)}`),
        rows: [[L('影子 A·B', 'Shadow A·B'), fix(q.c, 4)], [L('面积 A∧B', 'Area A∧B'), fix(q.s, 4)],
          ['AB · BA', `${fix(q.AB[0], 2)} ${q.AB[1] < 0 ? '−' : '+'} ${fix(Math.abs(q.AB[1]), 2)}I · ${fix(q.BA[0], 2)} ${q.BA[1] < 0 ? '−' : '+'} ${fix(Math.abs(q.BA[1]), 2)}I`], ['(AB)(BA)', `${fix(q.prod[0], 4)} ${q.prod[1] < 0 ? '−' : '+'} ${fix(Math.abs(q.prod[1]), 4)}I`],
          [L('‖A + B‖² + ‖A − B‖² 与 2(‖A‖² + ‖B‖²)', '‖A + B‖² + ‖A − B‖² and 2(‖A‖² + ‖B‖²)'), `${fix(q.plus2, 3)} + ${fix(q.minus2, 3)} = ${fix(q.plus2 + q.minus2, 3)} = ${fix(q.plRhs, 3)}`]],
        note: L(`秩一权重：|⟨A, B⟩|² = ${fix(q.born, 4)}，|⟨A⊥, B⟩|² = ${fix(q.bornPerp, 4)}，两者之和 ${fix(q.born + q.bornPerp, 4)}。`, `Rank-one weights: |⟨A, B⟩|² = ${fix(q.born, 4)}, |⟨A⊥, B⟩|² = ${fix(q.bornPerp, 4)}, summing to ${fix(q.born + q.bornPerp, 4)}.`) };
    }
    if (sc === 'phase') {
      const p = D.phase;
      return { aside: `φ = ${fix(p.phiDeg, 1)}°`, keyL: L('对角读数 P(0)：|+⟩ · |−⟩ · 当前态', 'Diagonal readout P(0): |+⟩ · |−⟩ · current'), key: `${fix(p.diagZPlus, 3)} · ${fix(p.diagZMinus, 3)} · ${fix(p.p0, 3)}`, keySub: L(`X 读数：|+⟩ ${sgn(p.xPlus, 3)}，|−⟩ ${sgn(p.xMinus, 3)}`, `X readout: |+⟩ ${sgn(p.xPlus, 3)}, |−⟩ ${sgn(p.xMinus, 3)}`),
        rows: [['⟨Z⟩ · |+⟩, |−⟩', `${fix(p.zPlus, 3)} · ${fix(p.zMinus, 3)}`], [L('当前态的 ⟨X⟩ = cos φ', '⟨X⟩ of the current state = cos φ'), fix(p.x, 3)],
          [L('半角提升 e<sup>iφ/2</sup>', 'Half-angle lift e<sup>iφ/2</sup>'), `${fix(p.lift[0], 3)} ${p.lift[1] < 0 ? '−' : '+'} ${fix(Math.abs(p.lift[1]), 3)}i`], [L('它的平方 = e<sup>iφ</sup>', 'Its square = e<sup>iφ</sup>'), `${fix(p.liftSq[0], 3)} ${p.liftSq[1] < 0 ? '−' : '+'} ${fix(Math.abs(p.liftSq[1]), 3)}i`],
          [L('24 个对角观测量上 |Tr(ρ₊D) − Tr(ρ₋D)| 的最大值', 'Largest |Tr(ρ₊D) − Tr(ρ₋D)| over 24 diagonal observables'), fix(p.diagGap, 6)]],
        note: L(`Z|+⟩⟨+|Z 与 |−⟩⟨−| 之差 ${fix(p.zrzGap, 6)}：相对相位翻转正好把 |+⟩ 送到 |−⟩。`, `Z|+⟩⟨+|Z differs from |−⟩⟨−| by ${fix(p.zrzGap, 6)}: the relative-phase flip sends |+⟩ exactly to |−⟩.`) };
    }
    if (sc === 'wedge') {
      const w = D.wedge;
      return { aside: `γ = ${fix(state.gamma, 0)}°`, keyL: '(ΔA)²(ΔB)² = C² + K² + G', key: `${fix(w.prod, 3)} = ${fix(w.C2, 3)} + ${fix(w.K2, 3)} + ${fix(w.G, 3)}`, keySub: L(`罗伯逊下界 ΔA·ΔB ≥ |K| = ${fix(Math.abs(w.K), 3)}`, `Robertson bound ΔA·ΔB ≥ |K| = ${fix(Math.abs(w.K), 3)}`),
        rows: [['C = Re⟨u, v⟩', fix(w.C, 4)], ['K = Im⟨u, v⟩', fix(w.K, 4)], ['(ΔA)² · (ΔB)²', `${fix(w.varA, 3)} · ${fix(w.varB, 3)}`], ['G', fix(w.G, 4)],
          [L('由算子：½⟨AB + BA⟩ − ⟨A⟩⟨B⟩ · ⟨AB − BA⟩/2i', 'From the operators: ½⟨AB + BA⟩ − ⟨A⟩⟨B⟩ · ⟨AB − BA⟩/2i'), `${fix(w.Cop, 4)} · ${fix(w.Kop, 4)}`]],
        note: L(`切平面上：线 a⊥·b⊥ = ${fix(w.Cgeo, 4)}，面积 (a⊥ × b⊥)·n = ${fix(w.Kgeo, 4)}。量子比特纯态的正交补只有一维，所以 G = 0。`, `On the tangent plane: line a⊥·b⊥ = ${fix(w.Cgeo, 4)}, area (a⊥ × b⊥)·n = ${fix(w.Kgeo, 4)}. The complement of a pure qubit state is one-dimensional, so G = 0.`) };
    }
    const e = D.expand, ec = e.euclid;
    return { aside: `m = ${e.k}`, keyL: L('盒内 dim O · 模型 D', 'Box dim O · model D'), key: `${e.krylovDim} / 6 · D = ${e.D}`, keySub: L(`严格增长 ${KRY.strict} 次 ≤ dim V − rank C = ${KRY.bound}`, `${KRY.strict} strict steps ≤ dim V − rank C = ${KRY.bound}`),
      rows: [[L(`克雷洛夫余量 ‖r${sub('m')}‖`, `Krylov residual ‖r${sub('m')}‖`), e.residual > KTOL ? fix(e.residual, 4) : L('0（< 10⁻⁹）', '0 (< 10⁻⁹)')], [L(`欧几里得 N${sub('S')}`, `Euclid's N${sub('S')}`), String(ec.N)],
        [L(`N${sub('S')} 的素因子`, `Prime factors of N${sub('S')}`), ec.factors.join(' × ')], [L('都在 S 之外，且 N ≡ 1 (mod p)', 'All outside S, and N ≡ 1 (mod p)'), ec.outside && ec.congruent ? L('是', 'yes') : L('否', 'no')],
        ['S', ec.S.length ? `{${ec.S.join(', ')}}` : '∅']],
      note: L(`从第 ${KRY.stableAt} 步起 O${sub('m')} = O${sub('m+1')}，此后不再变。盒外的素因子不必是下一个素数：30031 = 59 × 509，而下一个素数是 17。`, `From step ${KRY.stableAt} on, O${sub('m')} = O${sub('m+1')}, and nothing changes after. The prime outside need not be the next one: 30031 = 59 × 509, while the next prime is 17.`) };
  }
  const CTL_NOTE = {
    helix: ['拖动舞台转动螺旋；按“俯视”或 V 把相机放到正上方，整条螺旋压成一个圆。', 'Drag the stage to turn the helix; press the Top button or V to look straight down and the whole helix collapses onto one circle.'],
    horizon: ['在左图拖动琥珀色的箭头改变 θ；滑块选右边高亮的那一列 D。', 'Drag the amber arrow on the left to change θ; the slider picks the highlighted column D on the right.'],
    square: ['在舞台上拖动琥珀色的 B，或用时间轴转动它。', 'Drag the amber B on the stage, or turn it with the rail.'],
    phase: ['拖动舞台转动布洛赫球；时间轴推动相对相位 φ。', 'Drag the stage to turn the Bloch sphere; the rail drives the relative phase φ.'],
    wedge: ['拖动琥珀色的态 ψ 到球面上任一处；滑块改变两根观测轴的夹角。', 'Drag the amber state ψ anywhere on the sphere; the slider changes the angle between the two observable axes.'],
    expand: ['时间轴一步一步往前走：上排是固定的盒子，下排是模型。', 'Step along the rail: the top row is the fixed box, the bottom row the model.']
  };
  let lastLegend = '';
  function drawText(D) {
    const sc = state.scene, [big, sub2] = hudText(D), r = readouts(D);
    $('pillScene').innerHTML = `${L('场景', 'SCENE')} <strong>${L(...SCENE_NAME[sc])}</strong>`;
    $('pillStep').innerHTML = `${L('当前', 'NOW')} <strong>${stepText(D)}</strong>`;
    $('pillInv').innerHTML = `${L('不变量', 'INVARIANT')} <strong>${INV[sc]()}</strong>`;
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub2;
    const lg = LEGEND[sc]().join('');
    if (lg !== lastLegend) { $('legend').innerHTML = lg; lastLegend = lg; }
    $('roAside').textContent = r.aside; $('roKeyL').innerHTML = r.keyL; $('roKey').textContent = r.key; $('roKeySub').textContent = r.keySub;
    r.rows.forEach(([l, v], i) => { $('roL' + (i + 1)).innerHTML = l; $('ro' + (i + 1)).textContent = v; });
    $('roNote').innerHTML = r.note;
    $('ctlAside').textContent = L(...SCENE_NAME[sc]);
    $('ctlNote').textContent = L(...CTL_NOTE[sc]);
    $('oPitch').textContent = fix(state.pitch, 3); $('oDim').textContent = String(state.D); $('oGamma').textContent = `${fix(state.gamma, 0)}°`;
  }

  // the words first: a 2D scene measures the title and the legend of this very frame before it lays itself out
  const paint = kit.painter(() => { const D = now(); drawText(D); drawStage(D); drawStrip(D); }, [stageEl, $('plot')]);
  // a font that arrives late changes the size of every label: measure again
  if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', () => { sizes.clear(); paint(); });

  /* ---------- the rail ---------- */
  let stopAt = null;
  const fmtClock = (t) => {
    const sc = state.scene, mx = SC[sc].max;
    if (sc === 'helix') return `t = ${fix(t, 2)} <small>/ ${mx} ${L('圈', 'turns')}</small>`;
    if (sc === 'horizon' || sc === 'square') return `θ = ${fix(t, 1)}° <small>/ ${mx}°</small>`;
    if (sc === 'phase') return `φ = ${fix(t, 0)}° <small>/ ${mx}°</small>`;
    if (sc === 'wedge') return `${L('倾角', 'tilt')} ${fix(t, 1)}° <small>/ ${mx}°</small>`;
    return `m = ${fix(t, 2)} <small>/ ${mx}</small>`;
  };
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: SC.helix.max, rate: SC.helix.rate, step: SC.helix.step, keys: false,
    t: state.at.helix, format: (t) => fmtClock(t),
    onChange(t) {
      if (stopAt != null && clock.playing && t >= stopAt - 1e-9) { const s = stopAt; stopAt = null; clock.pause(); clock.set(s, true); t = s; }
      state.at[state.scene] = t;
      paint();
    }
  });

  /* ---------- scenes, camera, inputs ---------- */
  const camChips = kit.chips($('camChips'), 'cam', (v) => setCam(v, 600));
  const stageCam = kit.chips($('stageCam'), 'qcam', (v) => setCam(v, 600));
  function setCam(name, ms, scene) {
    const sc = scene || state.scene, views = CAMS[sc];
    state.cam = name; camChips.set(name, true); stageCam.set(name === 'top' ? 'top' : name === 'iso' ? 'iso' : null, true);
    if (views) st.view(views[name] || views.iso, ms);
  }
  function setScene(sc, t) {
    state.scene = sc;
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    stageEl.classList.toggle('still', !SC[sc].d3);
    $('stageCam').hidden = !SC[sc].d3;
    const cfg = SC[sc];
    clock.pause(); clock.rate = cfg.rate; clock.step = cfg.step; clock.setMax(cfg.max, true);
    clock.set(t == null ? state.at[sc] : t);
  }
  const leave = () => { stopAt = null; cards.mark(null); };
  const syncInputs = () => { $('pitchInput').value = String(state.pitch); $('dimInput').value = String(state.D); $('gammaInput').value = String(state.gamma); };
  $('pitchInput').addEventListener('input', (ev) => { leave(); state.pitch = parseFloat(ev.target.value) || 0; paint(); });
  $('dimInput').addEventListener('input', (ev) => { leave(); state.D = clamp(Math.round(parseFloat(ev.target.value) || 1), 1, DMAX); paint(); });
  $('gammaInput').addEventListener('input', (ev) => { leave(); state.gamma = clamp(parseFloat(ev.target.value) || 0, 0, 180); paint(); });
  $('now').addEventListener('pointerdown', () => leave());
  $('rew').addEventListener('click', () => { leave(); clock.pause(); clock.set(0); });

  /* ---------- direct manipulation ---------- */
  let drag = null;
  const near2 = (ev, p) => { const b = cv.getBoundingClientRect(); return Math.hypot(ev.clientX - b.left - p[0], ev.clientY - b.top - p[1]); };
  function pickStart(ev) {
    const sc = state.scene;
    if (sc === 'wedge') { if (st.near(ev, wedgeAt(state.at.wedge, state.az, state.gamma).n) < 26) { drag = 'wedge'; return true; } return false; }
    if (SC[sc].d3) return false;
    drag = sc === 'horizon' && geo.hTip && near2(ev, geo.hTip) < 30 ? 'horizon' : sc === 'square' && geo.sTip && near2(ev, geo.sTip) < 30 ? 'square' : null;
    return true;   // a 2D scene has no camera to turn
  }
  function pickMove(ev) {
    if (!drag) return;
    const b = cv.getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top;
    leave(); clock.pause();
    if (drag === 'wedge') {
      const p = st.pick(ev), pol = Math.acos(clamp(p[2], -1, 1)) / DEG;
      if (Math.hypot(p[0], p[1]) > 1e-6) state.az = Math.atan2(p[1], p[0]) / DEG;
      clock.set(clamp(pol, 0, 180));
    } else if (drag === 'horizon') {
      clock.set(clamp(Math.atan2(geo.hO[1] - y, x - geo.hO[0]) / DEG, 0, 90));
    } else if (drag === 'square') {
      const a = Math.atan2(geo.sO[1] - y, x - geo.sO[0]) / DEG;
      clock.set((a + 360) % 360);
    }
  }

  /* ---------- experiment cards ---------- */
  const NOTES = {
    'helix-shadow': ['琥珀色的点沿品红的螺旋 h(t) = (cos t, sin t, 0.1·t) 爬三圈：每转一圈，它停到更高的一层品红点上（n = 0, 1, 2, 3，每层高 2π × 0.1 ≈ 0.63），白色小旗翻一次向；这四个点的青色影子却落在圆上同一点 (1, 0)。按“俯视”，整条螺旋压成这一个青色的圆。',
      'The amber point climbs the magenta helix h(t) = (cos t, sin t, 0.1·t) three times round: each turn it reaches a higher magenta level dot (n = 0, 1, 2, 3, each 2π × 0.1 ≈ 0.63 higher) and the white flag flips; yet the cyan shadows of these four dots fall on one point (1, 0) of the circle. Press the Top button and the whole helix collapses onto this one cyan circle.'],
    'horizon-limit': ['左：琥珀色的单位向量从青色的 V₄ 抬到 90°，青色的影子 cos θ 缩成 0，向量正好立在品红的 e₅ 轴上。右：一个固定向量的柱子里，青色的影子² 从 D = 1 的 0.61 长到 D = 10 的 0.94，品红的余量² 越来越短；每一列顶上的品红空心圈却都停在 1，琥珀色的点（当前向量的余量² = sin²θ）到 90° 时也升到 1。',
      'Left: the amber unit vector rises from the cyan V₄ to 90°; the cyan shadow cos θ shrinks to 0 and the vector stands on the magenta e₅ axis. Right: in the bars of one fixed vector the cyan shadow² grows from 0.61 at D = 1 to 0.94 at D = 10 while the magenta residual² shrinks; yet the hollow magenta ring over every column stays at 1, and the amber dot (residual² = sin²θ of the current vector) rises to 1 at 90°.'],
    'fair-square': ['琥珀色的 B 绕白色的 A 转：青色的影子与品红的高度各撑起一个正方形，两块面积之和（cos²θ + sin²θ 那根量尺）一直停在 1 的虚线上；两条边长直接相加（|cos θ| + |sin θ| 那根量尺）在 1 与 √2 之间来回。紫色圆上 AB 在 +θ、BA 在 −θ，次序一换就是两个点，乘积却总在 1。θ = 36.87° 时是 0.64 + 0.36 = 1 与 0.8 + 0.6 = 1.4。',
      'The amber B turns around the white A: the cyan shadow and the magenta height each carry a square, and the two areas (the cos²θ + sin²θ gauge) always end on the dashed line at 1, while the two side lengths added directly (the |cos θ| + |sin θ| gauge) swing between 1 and √2. On the violet circle AB sits at +θ and BA at −θ: change the order and you get two points, yet their product stays at 1. At θ = 36.87° this is 0.64 + 0.36 = 1 against 0.8 + 0.6 = 1.4.'],
    'phase-fold': ['琥珀色的态沿品红的相位环走两圈（φ 从 0 到 720°）。它在青色 Z 轴上的影子一直在球心：对角读数总是 P(0) = ½，两个白圈 |+⟩、|−⟩ 也一样；换成转过 90° 的品红 X 轴，它们读出 +1 与 −1。小圆上的琥珀点是半角 e<sup>iφ/2</sup>，紫色弧记下走过的路：态走完一圈时它停在 −1，走完两圈才回到 +1。',
      'The amber state goes twice round the magenta phase ring (φ from 0 to 720°). Its shadow on the cyan Z axis stays at the centre: the diagonal readout is always P(0) = ½, for the white rings |+⟩ and |−⟩ as well; on the magenta X axis, turned by 90°, they read +1 and −1. On the small circle the amber dot is the half angle e<sup>iφ/2</sup> and the violet arc records its path: after one loop of the state it stands at −1, and only after two does it return to +1.'],
    'uncertainty-wedge': ['开始时态 ψ 在北极 |0⟩：紫色的 A = X、B = Y 两根轴投到切平面上的 u、v 张成一整块品红的正方形，横条全是品红：(ΔX)²(ΔY)² = 1 = C² + K² + G = 0 + 1 + 0。播放让 ψ 朝赤道倾倒：品红的面积缩小，青色的线变长，横条一直正好填到 (ΔX)²(ΔY)² 的白线；到赤道时品红为 0，青色占满 0.25，G 一直是 0。',
      'At the start ψ is at the north pole |0⟩: the violet axes A = X and B = Y project to u and v on the tangent plane, spanning a full magenta square, and the bar is all magenta: (ΔX)²(ΔY)² = 1 = C² + K² + G = 0 + 1 + 0. Play tips ψ towards the equator: the magenta area shrinks, the cyan line grows, and the bar always fills exactly up to the white mark of (ΔX)²(ΔY)²; at the equator the magenta is 0, the cyan fills 0.25, and G stays 0.'],
    'time-expand': ['上排是固定的 6 格盒子：克雷洛夫塔每一步立起一根品红的新轴、填进一格青色，长到 4 格后余量 r = 0，从此不再变，剩下两格是读不到的暗格。下排是模型：青色的素数轴之外总立着品红的轴；N<sub>S</sub> = ∏p + 1 到 S = {2, …, 13} 时是 30031 = 59 × 509，两个因子都不在 S 里，也都不是下一个素数 17。',
      'The top row is a fixed box of 6 slots: at each step the Krylov tower stands a magenta axis up and fills one cyan slot; after 4 slots the residual is r = 0 and nothing changes any more, leaving two dark slots it cannot read. The bottom row is the model: magenta axes always stand outside the cyan prime axes; with S = {2, …, 13}, N<sub>S</sub> = ∏p + 1 = 30031 = 59 × 509, and neither factor is in S, nor is either the next prime, 17.']
  };
  let booting = true;
  function applyCard(id) {
    const cd = CARDS[id];
    if (!cd) return;
    stopAt = null; state.preset = id;
    if (cd.pitch != null) state.pitch = cd.pitch;
    if (cd.D != null) state.D = cd.D;
    if (cd.gamma != null) state.gamma = cd.gamma;
    if (cd.az != null) state.az = cd.az;
    syncInputs();
    if (cd.cam) setCam(cd.cam, booting || TRV.still ? 0 : 650, cd.scene);
    setScene(cd.scene, cd.still);
    // a still (cover, cited figure for PDF/EPUB) and the opening view of the full page show the telling frame;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (!cd.play || TRV.still || (booting && !TRV.embed)) return;
    stopAt = cd.stop == null ? null : cd.stop;
    clock.set(cd.from || 0);
    if (booting) kit.autoplay(clock, stageEl); else clock.play();
  }
  const cards = kit.cards($('presets'), {
    presets: CARDS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyCard,
    idle: ['自由探索：拖动舞台、滑块或时间轴；随时可以再选一张卡。', 'Free play: drag the stage, a slider or the rail; pick a card again at any time.']
  });
  const ORDER = Object.keys(CARDS);
  kit.keys({
    ' ': () => clock.toggle(),
    ArrowRight: () => { leave(); clock.stepBy(1); }, ArrowLeft: () => { leave(); clock.stepBy(-1); },
    Home: () => { leave(); clock.pause(); clock.set(0); }, End: () => { leave(); clock.pause(); clock.set(clock.max); },
    v: () => { if (SC[state.scene].d3) { const seq = ['iso', 'front', 'top'], i = seq.indexOf(state.cam); setCam(seq[(i + 1) % seq.length], 600); } },
    1: () => cards.pick(ORDER[0]), 2: () => cards.pick(ORDER[1]), 3: () => cards.pick(ORDER[2]), 4: () => cards.pick(ORDER[3]), 5: () => cards.pick(ORDER[4]), 6: () => cards.pick(ORDER[5])
  });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- read-only probe for an independent browser suite, the cover, start ---------- */
  window.FAIRNESS_EXPANSION_DEBUG = {
    get state() {
      const D = now(), h = D.helix, z = D.horizon, q = D.square, p = D.phase, w = D.wedge, e = D.expand;
      return {
        preset: cards.current, scene: state.scene, t: clock.t, max: clock.max, playing: clock.playing, cam: state.cam,
        camera: { yaw: st.cam.yaw, pitch: st.cam.pitch, zoom: st.cam.zoom },
        D: state.scene === 'expand' ? e.D : z.D, thetaDeg: state.scene === 'square' ? q.thDeg : z.thDeg, horizonDeg: z.thDeg, squareDeg: q.thDeg,
        phiDeg: p.phiDeg, tiltDeg: w.alphaDeg, azDeg: w.azDeg, gammaDeg: w.gammaDeg, pitch: state.pitch, turns: h.turns,
        helixPoint: h.point.slice(), planarShadow: h.shadow.slice(), level: h.level, scaleLift: h.golden.scale, orientation: h.golden.orientation,
        fourierReadout: h.readout.slice(), fourierStepGap: h.readoutGap, levelStepGap: h.levelGap, goldenPeriod: TGOLD,
        cosTheta: z.cos, sinTheta: z.sin, fixedResidual2: z.xResid2, fixedShadow2: z.xShadow2, witnessResidual2: z.witness,
        l1Sum: q.l1, l2Sum: q.l2, AB: q.AB.slice(), BA: q.BA.slice(), ABBA: q.prod.slice(), parallelogram: [q.plus2 + q.minus2, q.plRhs], bornWeights: [q.born, q.bornPerp],
        diagZPlus: p.diagZPlus, diagZMinus: p.diagZMinus, zPlus: p.zPlus, zMinus: p.zMinus, xPlus: p.xPlus, xMinus: p.xMinus, diagGap: p.diagGap, zrzGap: p.zrzGap,
        bloch: p.bloch.slice(), lift: p.lift.slice(), liftSquared: p.liftSq.slice(), xCurrent: p.x, p0Current: p.p0,
        stateBloch: w.n.slice(), varA: w.varA, varB: w.varB, varProduct: w.prod, C: w.C, K: w.K, C2: w.C2, K2: w.K2, G: w.G, Cop: w.Cop, Kop: w.Kop, Cgeo: w.Cgeo, Kgeo: w.Kgeo,
        step: e.k, krylovDim: e.krylovDim, krylovDims: KRY.dims.slice(), krylovResiduals: KRY.res.slice(), krylovStrict: KRY.strict, krylovBound: KRY.bound, krylovStableAt: KRY.stableAt,
        euclidSet: e.euclid.S.slice(), euclidWitness: e.euclid.N, euclidFactors: e.euclid.factors.slice(), euclidOutside: e.euclid.outside, euclidCongruent: e.euclid.congruent
      };
    },
    /** Seek the rail of the current scene (pauses), or pick a card; both settle at once for a test. */
    seek(t) { leave(); clock.pause(); clock.set(t); kit.flush(); },
    pick(id) { cards.pick(id); kit.flush(); },
    /** The room of the 2D scene on the stage and the regions reserved in it for each object with all of its labels, in
        canvas pixels (null in a 3D scene): what a suite compares the measured label boxes with. */
    layout() { return geo.layout ? JSON.parse(JSON.stringify(geo.layout)) : null; },
    /** Viewport coordinates of the draggable handles (the amber tips in the 2D scenes, ψ in the wedge scene). */
    handle() {
      const b = cv.getBoundingClientRect(), at = (p) => (p ? { x: b.left + p[0], y: b.top + p[1] } : null);
      if (state.scene === 'horizon') return at(geo.hTip);
      if (state.scene === 'square') return at(geo.sTip);
      if (state.scene === 'wedge') { const q = st.p(wedgeAt(state.at.wedge, state.az, state.gamma).n); return at(q); }
      return null;
    }
  };
  /** Cover: the open helix climbing over its closed cyan shadow. */
  window.TRV_THUMB = () => {
    stopAt = null; clock.pause(); state.pitch = 0.1; syncInputs();
    setCam('iso', 0, 'helix'); setScene('helix', 2.75); st.lw = 2; kit.flush(); paint.now();
  };
  cards.pick(cards.initial('helix-shadow'));   // a chapter may cite another card: ::: {.viz src="fairness-square-uncertainty-expansion" preset="phase-fold"}
  booting = false;
  paint();
})();
