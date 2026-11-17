/* AFGUT//UNIFY · 极小圆弧场大统一 · Minimal-arc field unification
   World (kit.solid): z up. At the centre sits the ΔT_ε cell, a regular tetrahedron whose four vertices are the four
   concept fields F_pos (gravity), F_rot (SU(2)_L), F_col (SU(3)_C) and F_scl (U(1)_Y); the vertex directions are fixed so
   that, from the default camera, F_pos points away and the other three surround a gap through which the cell is seen.
     monad view (m = 1)  four arc shells centred on the cell, each a spherical cap of half-angle 48° facing its vertex,
                         radius 0.24 + 0.76·√(α⁻¹/64) (growing with 1/g; held at the rim for α⁻¹ > 64), with the one-loop
                         α_i⁻¹(μ) = α_i⁻¹(M_Z) − (b_i/2π) ln(μ/M_Z), b = (41/10, −19/6, −7), and α_G = (μ/E_P)²;
     ledger view (m = 0) the four fields as four separate balls at the vertices of a large tetrahedron, joined by six
                         magenta Higgs chords; the morph m moves centres, radii and cap angles continuously.
   Scenes: fields (the shells, the cell, the energy ladder), weinberg (plus the projection screen of the two general-N_c
   curves for sin²θ_W and the current sin²θ_W(μ)), higgs (the two orthogonal chiral sheets H_L ⊥ H_R and the hopping
   state ψ = cos θ·L − i sin θ·R, θ = πΦ̃_Hτ), balance (the unit clock vector u = (dτ/dt, η_pos, η_rot, η_col, η_scl):
   a stacked column of its squares and the two columns 1 − (dτ/dt)² and Σ η²). The ladder, the screen and the columns
   live in camera space (they always face the reader); the shells, the cell and the sheets live in the world.
   The rail τ ∈ [0, 1] drives the clock phase (spinor φ = 720°·τ, U(1) phase, hopping, balance), or for card 2 the
   running scale from μ₁₂ down to M_Z, or for card 5 the morph from the ledger to the monad. Every number is computed
   here; the instances of the cited Lean theorems are checked in instances(). Read-only probe: window.AFGUT_UNIFY_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, LN10 = Math.LN10, DEG = PI / 180;

  /* ---------- inputs at M_Z and constants ---------- */
  const MZ = 91.1876, EP = 1.220890e19;                       // GeV (Z mass; Planck energy, CODATA 2018)
  const AINV_EM = 127.930, S2_MZ = 0.23129, AS_MZ = 0.1180;   // α̂⁻¹(M_Z), sin²θ̂_W(M_Z), α_s(M_Z) (MS-bar)
  const B = [41 / 10, -19 / 6, -7];                           // one-loop SM coefficients, α₁ in GUT normalization
  const A0 = [0.6 * (1 - S2_MZ) * AINV_EM, S2_MZ * AINV_EM, 1 / AS_MZ];
  const LOG_MZ = Math.log10(MZ), LOG_EP = Math.log10(EP);
  const LOG_MU12 = LOG_MZ + (A0[0] - A0[1]) * TAU / (B[0] - B[1]) / LN10;
  const V_EW = 246.22, MW1 = 80.38, MZ1 = 91.19;               // GeV: v, measured m_W and m_Z (two decimals)
  const Y_L = -1 / 2, Y_R = -1;                               // hypercharges of e_L and e_R (Q = T₃ + Y)
  const SCALE = 64, R_IN = 0.24, R_OUT = 1.0;                 // the shell scale: α⁻¹ ∈ [0, 64] → radius
  const D_L = 0.84, RHO_L = 0.27, D_M = 0.15, BETA_M = 48 * DEG, E_GROUP = 1.12;
  const Y_LAD = 0.95, PHI_MAX = 1.5, POLE = 0.5;              // ladder half height, Φ̃_H range, pole height per unit Φ̃_H
  const VIEW0 = [0.55, 0.34];

  /* ---------- couplings ---------- */
  const alphaInv = (lm, i) => A0[i] - B[i] / TAU * LN10 * (lm - LOG_MZ);
  const gravInv = (lm) => Math.pow(10, 2 * (LOG_EP - lm));
  const sin2W = (lm) => { const a1 = alphaInv(lm, 0), a2 = alphaInv(lm, 1); return a2 / (a2 + 5 / 3 * a1); };
  const anomCurve = (n) => n / (2 * (n + 1));
  const fixedCurve = (n) => 9 * (n + 1) / (4 * (9 + 5 * n));
  const crossLog = (i, j) => LOG_MZ + (A0[i] - A0[j]) * TAU / (B[i] - B[j]) / LN10;
  const lerp = (a, b, t) => a * (1 - t) + b * t;
  const runMu = (t) => lerp(LOG_MU12, LOG_MZ, t);              // card 2: from μ₁₂ (τ = 0) down to M_Z (τ = 1)
  const shellRadius = (x) => R_IN + (R_OUT - R_IN) * Math.sqrt(clamp(x, 0, SCALE) / SCALE);

  const FIELDS = [
    { id: 'pos', name: 'F<sub>pos</sub>', color: 'cyan', cls: 'c-cy', group: 'G', coupling: 'α<sub>G</sub>⁻¹' },
    { id: 'rot', name: 'F<sub>rot</sub>', color: 'violet', cls: 'c-vi', group: 2, coupling: 'α<sub>2</sub>⁻¹' },
    { id: 'col', name: 'F<sub>col</sub>', color: 'blue', cls: 'c-bl', group: 3, coupling: 'α<sub>3</sub>⁻¹' },
    { id: 'scl', name: 'F<sub>scl</sub>', color: 'sigma', cls: 'c-sg', group: 1, coupling: 'α<sub>1</sub>⁻¹' }
  ];
  const invOf = (f, lm) => (f.group === 'G' ? gravInv(lm) : alphaInv(lm, f.group - 1));

  /* ---------- vectors ---------- */
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const unit = (a) => scale(a, 1 / Math.hypot(a[0], a[1], a[2]));
  const camDir = (yaw, pitch) => [-Math.sin(yaw) * Math.cos(pitch), -Math.cos(yaw) * Math.cos(pitch), Math.sin(pitch)];
  const camAxes = (cam) => {
    const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw), cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };

  /* the vertex directions of the cell: F_pos away from the default camera, the others around the front gap */
  const BACK = scale(camDir(VIEW0[0], VIEW0[1]), -1);
  const UP0 = unit(sub([0, 0, 1], scale(BACK, BACK[2]))), SIDE0 = cross(BACK, UP0);
  const DIRS = [BACK, ...[0, 1, 2].map((k) => unit(add(scale(BACK, -1 / 3), scale(add(scale(UP0, Math.cos(k * TAU / 3)), scale(SIDE0, Math.sin(k * TAU / 3))), 2 * Math.SQRT2 / 3))))];
  const FRAMES = DIRS.map((T) => { const e1 = unit(cross(T, Math.abs(T[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])); return { T, e1, e2: cross(T, e1) }; });
  const EDGES = [[0, 1], [0, 2], [0, 3], [1, 2], [2, 3], [1, 3]];   // s → t; the first three are the star tree at F_pos
  const TREE = 3;

  /* ---------- complex numbers and 2 × 2 complex matrices ---------- */
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cexp = (t) => [Math.cos(t), Math.sin(t)];
  const cabs2 = (a) => a[0] * a[0] + a[1] * a[1];
  const mm = (A, Bm) => [0, 1].map((i) => [0, 1].map((j) => { const x = cmul(A[i][0], Bm[0][j]), y = cmul(A[i][1], Bm[1][j]); return [x[0] + y[0], x[1] + y[1]]; }));
  const madd = (A, Bm, s = 1) => A.map((r, i) => r.map((z, j) => [z[0] + s * Bm[i][j][0], z[1] + s * Bm[i][j][1]]));
  const mdag = (A) => [[[A[0][0][0], -A[0][0][1]], [A[1][0][0], -A[1][0][1]]], [[A[0][1][0], -A[0][1][1]], [A[1][1][0], -A[1][1][1]]]];
  const mmax = (A) => Math.max(...A.flat().map((z) => Math.hypot(z[0], z[1])));
  const I2 = [[[1, 0], [0, 0]], [[0, 0], [1, 0]]];
  const J = [[[0, 0], [0, -1]], [[0, -1], [0, 0]]];           // J = −iσ_x: the chiral fold
  const wrap = (a) => { const r = ((a + PI) % TAU + TAU) % TAU - PI; return r === -PI ? PI : r; };

  /* ---------- the clock vector of the balance (MODEL) ---------- */
  function clockVector(t) {
    const A = 0.66 + 0.24 * Math.sin(TAU * t);
    const w = [1 + 0.45 * Math.cos(TAU * t), 0.9 + 0.45 * Math.cos(TAU * t - PI / 2), 0.85 + 0.45 * Math.cos(TAU * t - PI), 0.8 + 0.45 * Math.cos(TAU * t - 1.5 * PI)];
    const n = Math.hypot(...w);
    return [Math.cos(A), ...w.map((x) => Math.sin(A) * x / n)];
  }
  /** The Higgs chord phases (MODEL), on the six edges of the ledger, at clock τ. */
  const CHORD_SEED = [0.11, 0.37, 0.62, 0.29, 0.83, 0.54], CHORD_SPEED = [1, -1, 2, 1, -2, 1];
  const chordPhases = (t) => CHORD_SEED.map((s, e) => wrap(TAU * (s + CHORD_SPEED[e] * t)));
  const GAUGE = [0, 1.234, -2.71, 0.577];                      // an anchored gauge transformation: 0 at the root F_pos

  /* ---------- state ---------- */
  const S = { scene: 'fields', drive: 'phase', logMu: LOG_MZ, phiH: 1, m: 1, tau: 0, from: null, blend: 1 };
  function targets() {
    return { logMu: S.drive === 'run' ? runMu(S.tau) : S.logMu, m: S.drive === 'morph' ? S.tau : S.m, phiH: S.phiH };
  }
  /** The values the page shows: the targets of the drive, blended from the previous values during a transition. */
  function eff() {
    const t = targets();
    if (!S.from || S.blend >= 1) return t;
    const b = S.blend, f = S.from;
    return { logMu: lerp(f.logMu, t.logMu, b), m: lerp(f.m, t.m, b), phiH: lerp(f.phiH, t.phiH, b) };
  }

  /** Everything the page shows, from the state. */
  function model() {
    const e = eff(), lm = e.logMu, tau = S.tau;
    const inv = FIELDS.map((f) => invOf(f, lm)), radii = inv.map(shellRadius);
    const theta = PI * e.phiH * tau, PL = Math.cos(theta) ** 2, PR = Math.sin(theta) ** 2;
    const u = clockVector(tau), load = u.slice(1).reduce((s, x) => s + x * x, 0);
    const phi = 2 * TAU * tau;                                  // the vector on F_rot turns by 720°·τ
    return {
      e, lm, tau, mu: Math.pow(10, lm), inv, radii, offScale: inv.map((x) => x > SCALE),
      a: [alphaInv(lm, 0), alphaInv(lm, 1), alphaInv(lm, 2)], alphaG: 1 / gravInv(lm), alphaGInv: gravInv(lm), s2: sin2W(lm),
      phiH: e.phiH, theta, PL, PR, beta: 1 / Math.sqrt(1 + e.phiH * e.phiH), masses: [MW1 * e.phiH, MZ1 * e.phiH], vev: V_EW * e.phiH,
      clock: u, rate2: u[0] * u[0], load, total: u[0] * u[0] + load, lhs: 1 - u[0] * u[0],
      phi, spinor: cexp(phi / 2), chi: TAU * (tau + 0.15), m: e.m
    };
  }

  /* ---------- the instances of the cited theorems ---------- */
  const instCache = new Map();
  function instances(M) {
    const key = `${M.tau}|${M.phiH}`;
    if (instCache.has(key)) return instCache.get(key);
    // 1. covariant commutator: U = diag(e^{iY_Lχ}, e^{iY_Rχ}), F = M = mσ_x, F′ = UMU⁻¹
    const U = [[cexp(Y_L * M.chi), [0, 0]], [[0, 0], cexp(Y_R * M.chi)]];
    const Mx = [[[0, 0], [M.phiH, 0]], [[M.phiH, 0], [0, 0]]];
    const Ft = mm(mm(U, Mx), mdag(U));
    const lhs = madd(mm(U, Mx), mm(Mx, U), -1), rhs = mm(madd(Ft, Mx, -1), U);
    const commutator = { semiconj: mmax(madd(mm(U, Mx), mm(Ft, U), -1)), unitary: mmax(madd(mm(U, mdag(U)), I2, -1)),
      residual: mmax(madd(lhs, rhs, -1)), norm: mmax(lhs), chargeGap: Y_L - Y_R, chi: M.chi };
    // 2. the chiral fold J = −iσ_x: Jᴴ = −J, JJᴴ = 1, J² = −1; ψ(θ) = (cos θ + J sin θ)·L
    const Ut = madd(madd(I2, I2, Math.cos(M.theta) - 1), J, Math.sin(M.theta));
    const psi = [Ut[0][0], Ut[1][0]];
    const fold = { skewAdjoint: mmax(madd(mdag(J), J)), unitary: mmax(madd(mm(J, mdag(J)), I2, -1)), square: mmax(madd(mm(J, J), I2)),
      psi, PL: cabs2(psi[0]), PR: cabs2(psi[1]), probResidual: Math.abs(cabs2(psi[0]) - M.PL) + Math.abs(cabs2(psi[1]) - M.PR) };
    // 3. anchored phase classification on the ledger graph K₄ (star tree at F_pos, R = {F_pos})
    const u = chordPhases(M.tau);
    const rootPhase = (uu) => { const p = [0, 0, 0, 0]; for (let e = 0; e < TREE; e++) p[EDGES[e][1]] = wrap(p[EDGES[e][0]] + uu[e]); return p; };
    const coords = (uu) => { const p = rootPhase(uu); return EDGES.slice(TREE).map(([s, t], k) => wrap(p[s] + uu[TREE + k] - p[t])); };
    const gauge = (g, uu) => uu.map((x, e) => wrap(x + g[EDGES[e][0]] - g[EDGES[e][1]]));
    const z = coords(u), ug = gauge(GAUGE, u), zg = coords(ug);
    const section = EDGES.map((_, e) => (e < TREE ? 0 : z[e - TREE]));
    const pu = rootPhase(u), pw = rootPhase(ug), gStar = pu.map((x, a) => wrap(x - pw[a]));
    const n = 4, mEdges = EDGES.length, k = 1, a = 0, c = mEdges - TREE;
    const anchored = { phases: u, coords: z, gauged: zg, invariance: Math.max(...z.map((x, i) => Math.abs(wrap(x - zg[i])))),
      sectionResidual: Math.max(...coords(section).map((x, i) => Math.abs(wrap(x - z[i])))),
      recovered: gStar, recoverResidual: Math.max(...gauge(gStar, u).map((x, e) => Math.abs(wrap(x - ug[e])))), anchoredAtRoot: gStar[0] === 0 && GAUGE[0] === 0,
      n, m: mEdges, tree: TREE, k, a, c, counts: TREE + 1 === n && c + TREE === mEdges && a + 1 === k && c + a + n === mEdges + k && c === mEdges + 1 - n };
    // 4. the double cover z ↦ z²: base e^{iφ(σ)}, φ = 720°·σ, lift e^{iφ/2}; the continuation from 1 agrees with it
    let liftResidual = 0, contResidual = 0, prev = [1, 0];
    for (let j = 0; j <= 240; j++) {
      const s = M.tau * j / 240, base = cexp(2 * TAU * s), lift = cexp(TAU * s), sq = cmul(lift, lift);
      liftResidual = Math.max(liftResidual, Math.hypot(sq[0] - base[0], sq[1] - base[1]));
      const r = cexp(Math.atan2(base[1], base[0]) / 2), alt = [-r[0], -r[1]];
      const pick = Math.hypot(r[0] - prev[0], r[1] - prev[1]) <= Math.hypot(alt[0] - prev[0], alt[1] - prev[1]) ? r : alt;
      contResidual = Math.max(contResidual, Math.hypot(pick[0] - lift[0], pick[1] - lift[1]));
      prev = pick;
    }
    const doubleCover = { liftResidual, contResidual, start: [1, 0], atOneTurn: cexp(PI), atTwoTurns: cexp(TAU), now: M.spinor, phiDeg: M.phi / DEG };
    // 5. tetrahedral defects on the cell: A = chord phases in integer units of 1/12, F = δA + q·ω
    const A = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    EDGES.forEach(([s, t], e) => { const q = Math.round(12 * u[e] / TAU); A[s][t] = q; A[t][s] = -q; });
    const tetra = { edge: A, actual: defects(A, 0), monopole: defects(A, 1) };
    // 6. the Lagrange identity on u (the clock vector) and v = e₀
    const v = [1, 0, 0, 0, 0], cu = M.clock;
    const su = cu.reduce((s, x) => s + x * x, 0), sv = 1, uv = cu[0];
    let wedge = 0; for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) wedge += (cu[i] * v[j] - cu[j] * v[i]) ** 2;
    const lagrange = { lhs: su * sv - uv * uv, rhs: wedge / 2, load: M.load, residual: Math.abs(su * sv - uv * uv - wedge / 2), loadResidual: Math.abs(wedge / 2 - M.load), norm: su };
    const out = { commutator, fold, anchored, doubleCover, tetra, lagrange };
    instCache.set(key, out);
    if (instCache.size > 80) instCache.delete(instCache.keys().next().value);
    return out;
  }
  /** Face values F = δA + q·ω on the 4 vertices and the counts of the theorem (integers, exact). */
  function defects(A, q) {
    const V = [0, 1, 2, 3];
    const omega = (i, j, k) => {
      const s = [i, j, k];
      if (new Set(s).size < 3 || s.includes(3)) return 0;
      let inv = 0; for (let x = 0; x < 3; x++) for (let y = x + 1; y < 3; y++) if (s[x] > s[y]) inv++;
      return inv % 2 ? -1 : 1;
    };
    const F = (i, j, k) => A[j][k] - A[i][k] + A[i][j] + q * omega(i, j, k);
    const faceErrors = V.map((r) => { let n = 0; for (const i of V) for (const j of V) for (const k of V) if (F(i, j, k) !== F(r, j, k) - F(r, i, k) + F(r, i, j)) n++; return n; });
    let tetraDefects = 0, cocycle = true;
    for (const r of V) for (const i of V) for (const j of V) for (const k of V) if (F(i, j, k) - F(r, j, k) + F(r, i, k) - F(r, i, j) !== 0) { tetraDefects++; cocycle = false; }
    let edgeErrors = 0; for (const i of V) for (const j of V) for (const k of V) if (F(i, j, k) !== A[j][k] - A[i][k] + A[i][j]) edgeErrors++;
    const best = Math.min(...faceErrors);
    return { q, faceErrors, sum: faceErrors.reduce((s, x) => s + x, 0), tetraDefects, best, anchorBound: 4 * best <= tetraDefects,
      edgeErrors, edgeBound: tetraDefects <= 16 * edgeErrors, exact: edgeErrors === 0, cocycle };
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probeEl = document.createElement('div'); probeEl.hidden = true; probeEl.style.position = 'absolute'; tagBox.appendChild(probeEl);
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
    for (const el of [$('hudTl'), $('legend')]) { const b = boxOf(el, sr); if (b && el.textContent.trim()) out.push(b); }
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

  /* ---------- layout in camera space ---------- */
  const landscape = (W, H) => W >= 1.3 * H;
  const LX = E_GROUP + 0.3;                                    // the ladder (and the right-hand columns)
  function screenRect(W, H) {
    if (landscape(W, H)) return { cx: -(E_GROUP + 0.25 + 0.75), cy: 0, hw: 0.75, hh: 0.75 };
    return { cx: 0, cy: -(E_GROUP + 0.2 + 0.58), hw: 1.0, hh: 0.58 };
  }
  /** The content box of the scene in camera-plane coordinates (x right, y up). */
  function contentBox(W, H) {
    if (S.scene === 'higgs') return { x0: -1.0, x1: 1.0, y0: -1.05, y1: 1.08 };
    const b = { x0: -E_GROUP, x1: E_GROUP, y0: -E_GROUP, y1: E_GROUP };
    if (S.scene === 'fields' || S.scene === 'weinberg') { b.x1 = Math.max(b.x1, LX + 0.12); b.y0 = Math.min(b.y0, -Y_LAD - 0.06); b.y1 = Math.max(b.y1, Y_LAD + 0.06); }
    if (S.scene === 'weinberg') { const r = screenRect(W, H); b.x0 = Math.min(b.x0, r.cx - r.hw); b.x1 = Math.max(b.x1, r.cx + r.hw); b.y0 = Math.min(b.y0, r.cy - r.hh); }
    if (S.scene === 'balance') { b.x0 = -(E_GROUP + 0.46); b.x1 = E_GROUP + 0.66; b.y0 = Math.min(b.y0, -Y_LAD - 0.06); b.y1 = Math.max(b.y1, Y_LAD + 0.08); }
    return b;
  }
  function fitTo(box, area, W, H) {
    const pad = TRV.thumbMode ? 6 : 12, zoom = sc.cam.zoom || 1;
    const unitPx = Math.max(20, Math.min((area.w - 2 * pad) / (box.x1 - box.x0), (area.h - 2 * pad) / (box.y1 - box.y0)));
    options.radius = unitPx / (Math.max(1, Math.min(W, H)) * zoom);
    options.cx = (area.x + area.w / 2 - unitPx * (box.x0 + box.x1) / 2) / Math.max(1, W);
    options.cy = (area.y + area.h / 2 + unitPx * (box.y0 + box.y1) / 2) / Math.max(1, H);
  }

  const range = (a, b, n) => Array.from({ length: n + 1 }, (_, j) => a + (b - a) * j / n);
  const tube = (key, pts, color, width, extra = {}) => { if (pts.length > 1) sc.tube(key, pts, Object.assign({ color, width, glow: 0.3, pick: false, occlude: false }, extra)); };
  let FRAME = null, FIT = null, TAGS = [], AX = null, HANDLE_KIND = null;
  const at = (p, html, cls, pri, dir) => { if (!TRV.thumbMode) TAGS.push({ p, html, cls, pri, dir }); };
  /** A camera-space point (x right, y up, d toward the reader) in world coordinates. */
  const camPt = (x, y, d = 0) => add(add(scale(AX.R, x), scale(AX.U, y)), scale(AX.D, d));
  const ladderPt = (lm) => camPt(LX, -Y_LAD + 2 * Y_LAD * (lm - LOG_MZ) / (LOG_EP - LOG_MZ));
  const polePt = (ph) => [0, 0, POLE * ph];

  /** sci: x as a mantissa and a power of ten (HTML), plain decimals near 1. */
  function sci(x, d = 2) {
    if (x === 0) return '0';
    const e = Math.floor(Math.log10(Math.abs(x)));
    if (e >= -2 && e <= 3) return fix(x, Math.max(0, d + 2 - Math.max(0, e)));
    let m = x / Math.pow(10, e), ee = e;
    if (Math.abs(Number(m.toFixed(d))) >= 10) { m /= 10; ee += 1; }
    return `${fix(m, d)} × 10<sup>${ee < 0 ? '−' : ''}${Math.abs(ee)}</sup>`;
  }

  /** The four field shells (monad) or balls (ledger), the cell and the Higgs chords. */
  function drawFields(M, opts = {}) {
    const m = M.m, Cdir = AX.D;
    FIELDS.forEach((f, a) => {
      const { T, e1, e2 } = FRAMES[a];
      const c = scale(T, (1 - m) * D_L), rho = lerp(RHO_L, M.radii[a], m), beta = lerp(PI, BETA_M, m);
      sc.surface(`shell-${f.id}`, (uu, vv) => {
        const th = uu * beta, ph = TAU * vv, s = Math.sin(th);
        return add(c, scale(add(scale(T, Math.cos(th)), scale(add(scale(e1, Math.cos(ph)), scale(e2, Math.sin(ph))), s)), rho));
      }, Object.assign({ u: [0, 1], v: [0, 1], nu: 22, nv: 40, grid: { every: [5, 8], color: P.ink, alpha: 0.13 }, pick: false },
        // a shell beyond the scale stays at the rim, dimmed toward the faint backdrop
        M.offScale[a] ? { colors: [P.faint, P[f.color]], value: () => lerp(1, 0.4, m), range: [0, 1] } : { color: P[f.color] }));
      const away = dot(T, Cdir) < 0, apex = add(c, scale(T, rho + (away && m > 0.5 ? -0.016 : 0.016)));
      // a shell beyond the scale stays at the rim: its rim is dashed
      if (M.offScale[a] && m > 0.5 && !opts.quiet) {
        const rc = add(c, scale(T, rho * Math.cos(beta))), rr = rho * Math.sin(beta);
        sc.line(range(0, TAU, 48).map((t) => add(rc, add(scale(e1, rr * Math.cos(t)), scale(e2, rr * Math.sin(t))))), { color: P.ink, width: 1.4, dash: [5, 4], alpha: 0.8 });
      }
      const val = M.offScale[a] ? `${sci(M.inv[a], 2)}${L(' · 标尺外', ' · off scale')}` : fix(M.inv[a], 2);
      if (!opts.quiet) { const rim = outerRim(c, rho, beta, FRAMES[a]); at(rim, `${f.name} · ${f.coupling} = ${val}`, `raw ${f.cls} backed`, a === 0 ? 7 : 8, null); }
      if (m > 0.6 && !opts.quiet) markers(M, f, a, apex);
    });
    // the cell and the six Higgs chords (in the monad they are its edges)
    const V = DIRS.map((T) => scale(T, lerp(D_L, D_M, m)));
    sc.poly('cell', { vertices: V, faces: [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]] }, { color: P.ink, alpha: m > 0.97 ? 1 : 0.12 + 0.8 * m * m * m, edges: P.ink });
    EDGES.forEach(([s, t], i) => {
      const mid = scale(add(V[s], V[t]), 0.5), bow = scale(unit(mid), 0.07 * (1 - m));
      tube(`chord-${i}`, range(0, 1, 16).map((x) => add(add(scale(V[s], 1 - x), scale(V[t], x)), scale(bow, 4 * x * (1 - x)))), P.magenta, m > 0.5 ? 2.2 : 3.2, { glow: 0.45 });
    });
    if (!opts.quiet) {
      if (m < 0.5) at(scale(add(V[1], V[2]), 0.5), L('六条希格斯弦 · 3 个回路', 'six Higgs chords · 3 loops'), 'raw c-mg backed', 6, null);
      else at([0, 0, 0], S.scene === 'fields' ? 'ΔT<sub>ε</sub> · δF = 0' : 'ΔT<sub>ε</sub>', 'raw c-ik backed', 5, [-0.5, 1]);
    }
  }
  /** The rim point of a cap farthest from the centre of the screen: where its label goes, clear of the cell. */
  function outerRim(c, rho, beta, F) {
    let best = null, bd = -1;
    for (let k = 0; k < 24; k++) {
      const t = k * TAU / 24, p = add(c, scale(add(scale(F.T, Math.cos(beta)), scale(add(scale(F.e1, Math.cos(t)), scale(F.e2, Math.sin(t))), Math.sin(beta))), rho));
      const x = dot(p, AX.R), y = dot(p, AX.U), d = x * x + y * y;
      if (d > bd) { bd = d; best = p; }
    }
    return best;
  }
  /** What each shell carries at its apex: the position frame, the spinor, the colour triad, the U(1) phase. */
  function markers(M, f, a, p) {
    const { T, e1, e2 } = FRAMES[a], dir = (ang) => add(scale(e1, Math.cos(ang)), scale(e2, Math.sin(ang)));
    if (f.id === 'pos') {
      tube('pos-ax0', [p, add(p, scale(T, 0.12))], P.ink, 2, { glow: 0.2 });
      tube('pos-ax1', [p, add(p, scale(e1, 0.12))], P.ink, 2, { glow: 0.2 });
      tube('pos-ax2', [p, add(p, scale(e2, 0.12))], P.ink, 2, { glow: 0.2 });
    } else if (f.id === 'rot') {
      tube('rot-ring', range(0, TAU, 40).map((t) => add(p, scale(dir(t), 0.1))), P.ink, 1.4, { glow: 0, alpha: 0.55 });
      sc.arrow(p, add(p, scale(dir(M.phi), 0.17)), { color: P.ink, width: 2.4, headSize: 8 });
      sc.bead(add(p, scale(dir(M.phi / 2), 0.1)), { key: 'spinor', color: P.ink, r: 4.5 });
      at(add(p, scale(dir(M.phi / 2), 0.1)), `φ = ${Math.round(M.phi / DEG)}° · e<sup>iφ/2</sup> = ${fix(M.spinor[0], 2)}`, 'raw c-vi backed', 9, null);
    } else if (f.id === 'col') {
      const pts = [0, 1, 2].map((k) => add(p, scale(dir(k * TAU / 3 + TAU * M.tau / 3), 0.12)));
      sc.fan(pts, { fill: P.ink, alpha: 0.22, color: P.ink, width: 1.2 });
      pts.forEach((q, k) => sc.bead(q, { key: `colour${k}`, color: P.ink, r: 3.6 }));
      at(p, 'N<sub>c</sub> = 3', 'raw c-bl backed', 6, null);
    } else {
      tube('scl-ring', range(0, TAU, 40).map((t) => add(p, scale(dir(t), 0.11))), P.ink, 1.4, { glow: 0, alpha: 0.55 });
      sc.bead(add(p, scale(dir(M.chi), 0.11)), { key: 'phase', color: P.ink, r: 4.2 });
    }
  }

  /** The energy ladder on the right: M_Z at the foot, μ₁₂, E_P at the top, the amber current scale. */
  function drawLadder(M) {
    tube('ladder', [ladderPt(LOG_MZ), ladderPt(LOG_EP)], P.ink, 2, { glow: 0, alpha: 0.75 });
    const tick = (key, lm, w) => tube(key, [add(ladderPt(lm), camPt(-w, 0)), add(ladderPt(lm), camPt(w, 0))], P.ink, 1.6, { glow: 0, alpha: 0.85 });
    tick('tick-mz', LOG_MZ, 0.07); tick('tick-12', LOG_MU12, 0.09); tick('tick-ep', LOG_EP, 0.07);
    at(ladderPt(LOG_MZ), 'M<sub>Z</sub>', 'raw c-ik backed', 6, [1, 0.2]);
    at(ladderPt(LOG_MU12), 'μ<sub>12</sub> · 3/8', 'raw c-ik backed', 6, [1, 0]);
    at(ladderPt(LOG_EP), 'E<sub>P</sub> · α<sub>G</sub> = 1', 'raw c-ik backed', 6, [1, -0.2]);
    if (M.lm - LOG_MZ > 1e-4) tube('ladder-now', [ladderPt(LOG_MZ), ladderPt(M.lm)], P.amber, 3, { glow: 0.45 });
    sc.bead(ladderPt(M.lm), { key: 'scale', color: P.amber, r: 5 });
    at(ladderPt(M.lm), `log₁₀ μ = ${fix(M.lm, 2)}`, 'raw c-am backed', 9, [-1, 0]);
  }

  /** The projection screen of the two general-N_c curves and the current sin²θ_W(μ). */
  function drawScreen(M, W, H) {
    const r = screenRect(W, H), d = -0.3;
    const P2 = (n, s) => camPt(r.cx - r.hw + 2 * r.hw * (n - 1) / 5, r.cy - r.hh + 2 * r.hh * (s - 0.15) / 0.35, d + 0.004);
    sc.surface('nc-screen', (uu, vv) => camPt(r.cx - r.hw + 2 * r.hw * uu, r.cy - r.hh + 2 * r.hh * vv, d), { u: [0, 1], v: [0, 1], nu: 5, nv: 7, color: P.panelEdge, grid: { every: [1, 1], color: P.ink, alpha: 0.12 }, pick: false });
    const ns = range(1, 6, 60);
    tube('nc-anom', ns.map((n) => P2(n, anomCurve(n))), P.violet, 3, { glow: 0.45 });
    tube('nc-fixed', ns.map((n) => P2(n, fixedCurve(n))), P.cyan, 3, { glow: 0.45 });
    tube('nc-three', [P2(3, 0.15), P2(3, 0.5)], P.ink, 1.2, { glow: 0, alpha: 0.5 });
    tube('nc-now', [P2(1, M.s2), P2(6, M.s2)], P.amber, 2.4, { glow: 0.45 });
    sc.bead(P2(3, 0.375), { key: 'nc-cross', color: P.ink, r: 5 });
    at(P2(3, 0.375), 'N<sub>c</sub> = 3 · 2/(16/3) = 3/8', 'raw c-ik backed', 9, [1, -1]);
    at(P2(5.4, anomCurve(5.4)), 'N<sub>c</sub>/(2(N<sub>c</sub> + 1))', 'raw c-vi backed', 7, [0.2, -1]);
    at(P2(1.4, fixedCurve(1.4)), '9(N<sub>c</sub> + 1)/(4(9 + 5N<sub>c</sub>))', 'raw c-cy backed', 7, [0.2, -1]);
    at(P2(5.6, M.s2), `sin²θ<sub>W</sub>(μ) = ${fix(M.s2, 4)}`, 'raw c-am backed', 8, [0, 1]);
    at(P2(1.6, 0.15), 'N<sub>c</sub> = 1 … 6', 'raw c-ik backed', 4, [0, 1]);
  }

  /** The Higgs scene: two orthogonal chiral sheets, the hopping state, the standing waves, the VEV pole. */
  const HW = 0.95, HH = 0.75, RHO_S = 0.62;
  function hopAxes() {
    const y = VIEW0[0], R0 = [Math.cos(y), -Math.sin(y), 0], D0 = [-Math.sin(y), -Math.cos(y), 0];
    return { eL: unit(add(R0, D0)), eR: unit(add(scale(R0, -1), D0)) };
  }
  const HOP = hopAxes();
  function drawHiggs(M) {
    const { eL, eR } = HOP, z = [0, 0, 1], m = M.m;
    const sheet = (key, e, color) => {
      sc.surface(key, (uu, vv) => add(scale(e, HW * (2 * uu - 1)), scale(z, HH * (2 * vv - 1))), { u: [0, 1], v: [0, 1], nu: 8, nv: 6, color, alpha: 0.3, grid: { every: [1, 1], color: P.ink, alpha: 0.14 }, pick: false });
      tube(`${key}-edge`, [[-1, -1], [1, -1], [1, 1], [-1, 1], [-1, -1]].map(([x, y]) => add(scale(e, HW * x), scale(z, HH * y))), color, 2, { glow: 0.35 });
    };
    sheet('sheet-L', eL, P.cyan); sheet('sheet-R', eR, P.blue);
    tube('fold', [[0, 0, -HH], [0, 0, HH]], P.ink, 1.6, { glow: 0, alpha: 0.7 });
    at(add(scale(eL, HW * 0.86), scale(z, HH * 0.86)), 'H<sub>L</sub>', 'raw c-cy backed', 8, null);
    at(add(scale(eR, HW * 0.86), scale(z, HH * 0.86)), 'H<sub>R</sub>', 'raw c-bl backed', 8, null);
    // the VEV pole on the fold line: its height is Φ̃_H
    tube('pole', [[0, 0, 0], polePt(Math.max(1e-3, M.phiH))], P.magenta, 4, { glow: 0.5 });
    at(polePt(M.phiH), `Φ̃<sub>H</sub> = ${fix(M.phiH, 2)} · v = ${fix(M.vev, 2)} GeV`, 'raw c-mg backed', 9, [1, -1]);
    // the probability bars on each sheet
    const bar = (key, e, p, color) => tube(key, [add(scale(e, HW * 0.78), scale(z, -HH * 0.9)), add(scale(e, HW * 0.78), scale(z, -HH * 0.9 + 1.5 * HH * p))], color, 7, { glow: 0.35 });
    bar('bar-L', eL, M.PL, P.cyan); bar('bar-R', eR, M.PR, P.blue);
    at(add(scale(eL, HW * 0.78), scale(z, -HH * 0.9)), `P<sub>L</sub> = ${fix(M.PL, 2)}`, 'raw c-cy backed', 7, [0, 1]);
    at(add(scale(eR, HW * 0.78), scale(z, -HH * 0.9)), `P<sub>R</sub> = ${fix(M.PR, 2)}`, 'raw c-bl backed', 7, [0, 1]);
    // monad reading: the state turns about the fold; the standing waves (L ± R)/√2 do not move
    const ringPt = (t) => add(scale(eL, RHO_S * Math.cos(t)), scale(eR, RHO_S * Math.sin(t)));
    const am = clamp((m - 0.15) / 0.7, 0, 1);
    if (am > 0.02) {
      tube('hop-ring', range(0, TAU, 72).map(ringPt), P.magenta, 1.4, { glow: 0, alpha: (0.25 + 0.25 * Math.min(1, M.phiH)) * am });
      if (M.theta > 1e-3) tube('hop-arc', range(0, Math.min(M.theta, TAU), Math.max(2, Math.ceil(Math.min(M.theta, TAU) / TAU * 72))).map(ringPt), P.magenta, 3, { glow: 0.5, alpha: am });
      for (const [k, sgn] of [['plus', 1], ['minus', -1]]) {
        const w = unit(add(eL, scale(eR, sgn)));
        sc.line([scale(w, -RHO_S * 1.12), scale(w, RHO_S * 1.12)], { color: P.ink, width: 1.4, dash: [6, 5], alpha: 0.75 * am });
        if (am > 0.5) at(scale(w, RHO_S * 1.12), sgn > 0 ? '(L + R)/√2 · +m' : '(L − R)/√2 · −m', 'raw c-ik backed', 5, null);
      }
      const q = ringPt(M.theta);
      sc.arrow([0, 0, 0], q, { color: P.amber, width: 2.4, headSize: 8, alpha: am });
      sc.bead(q, { key: 'state', color: P.amber, r: 5.5, alpha: am });
      if (am > 0.5) at(q, `θ = ${Math.round(M.theta / DEG)}°`, 'raw c-am backed', 9, null);
    }
    // ledger reading: two separate accounts L and R, probability carried along one chord
    if (m < 0.85) {
      const al = clamp((0.85 - m) / 0.7, 0, 1), a = add(scale(eL, HW * 0.78), scale(z, HH * 0.75)), b = add(scale(eR, HW * 0.78), scale(z, HH * 0.75));
      tube('ledger-chord', range(0, 1, 20).map((x) => add(add(scale(a, 1 - x), scale(b, x)), scale(z, 0.18 * 4 * x * (1 - x)))), P.magenta, 3, { glow: 0.5, alpha: al });
      const x = M.PR, q = add(add(scale(a, 1 - x), scale(b, x)), scale(z, 0.18 * 4 * x * (1 - x)));
      sc.bead(q, { key: 'account', color: P.amber, r: 5, alpha: al });
      if (al > 0.5) at(q, L(`账本：P<sub>R</sub> = ${fix(M.PR, 2)}`, `ledger: P<sub>R</sub> = ${fix(M.PR, 2)}`), 'raw c-am backed', 8, [0, -1]);
    }
  }

  /** The balance: the stacked squares of the clock vector, and the two sides 1 − (dτ/dt)² and Σ η². */
  function drawBalance(M) {
    const xs = -(E_GROUP + 0.3), y0 = -Y_LAD, h = 2 * Y_LAD, colors = [P.dim, P.cyan, P.violet, P.blue, P.sigma];
    let y = y0;
    M.clock.forEach((x, k) => {
      const len = h * x * x;
      tube(`stack-${k}`, [camPt(xs, y + (k ? 0.004 : 0)), camPt(xs, y + len - 0.004)], colors[k], 12, { glow: 0.25, sides: 12 });
      y += len;
    });
    sc.line([camPt(xs - 0.16, y0 + h), camPt(xs + 0.16, y0 + h)], { color: P.ink, width: 1.6, dash: [5, 4] });
    at(camPt(xs, y0 + h), 'ν₀² = 1', 'raw c-ik backed', 8, [0, -1]);
    at(camPt(xs, y0 + h * M.rate2 / 2), `(dτ/dt)² = ${fix(M.rate2, 4)}`, 'raw c-ik backed', 7, [-1, 0]);
    const xl = LX - 0.06, xr = LX + 0.24;
    tube('side-geom', [camPt(xl, y0), camPt(xl, y0 + h * M.lhs)], P.ink, 10, { glow: 0.2 });
    tube('side-load', [camPt(xr, y0), camPt(xr, y0 + h * M.load)], P.magenta, 10, { glow: 0.35 });
    tube('beam', [camPt(xl - 0.08, y0 + h * M.lhs), camPt(xr + 0.08, y0 + h * M.load)], P.ink, 2, { glow: 0, alpha: 0.85 });
    at(camPt(xl, y0), 'G<sub>μν</sub> + Λg<sub>μν</sub>', 'raw c-ik backed', 6, [-1, 1]);
    at(camPt(xr, y0), '8πG/c⁴ · T<sub>μν</sub>', 'raw c-mg backed', 6, [1, 1]);
    at(camPt((xl + xr) / 2, y0 + h * M.lhs), `Δ = ${fix(Math.abs(M.lhs - M.load), 6)}`, 'raw c-ik backed', 9, [0, -1]);
  }

  function drawStage(M) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    AX = camAxes(sc.cam);
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 12, y: 12, w: W - 24, h: H - 24 } : safeRect(W, H, huds);
    if (!dragging || !FIT) FIT = { area, box: contentBox(W, H) };
    fitTo(FIT.box, FIT.area, W, H);
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = []; TAGS = [];
    sc.begin();
    if (S.scene === 'higgs') drawHiggs(M);
    else {
      drawFields(M, { quiet: S.scene === 'balance' });
      if (S.scene === 'fields' || S.scene === 'weinberg') drawLadder(M);
      if (S.scene === 'weinberg') drawScreen(M, W, H);
      if (S.scene === 'balance') drawBalance(M);
    }
    sc.end();
    HANDLE_KIND = thumb || TRV.still ? null : S.scene === 'higgs' ? 'phi' : (S.scene === 'fields' || S.scene === 'weinberg') ? 'mu' : null;
    const hq = HANDLE_KIND === 'mu' ? sc.p(ladderPt(M.lm)) : HANDLE_KIND === 'phi' ? sc.p(polePt(M.phiH)) : null;
    if (hq) OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    placeHandle(hq);
    if (!thumb) {
      const cen = sc.p([0, 0, 0]);
      TAGS.forEach((t, k) => {
        const q = sc.p(t.p), dir = t.dir ? [t.dir[0], t.dir[1]] : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1];
        LB.push({ key: `t${k}`, q, html: t.html, cls: t.cls, pri: t.pri, dir, r: 10 });
      });
      placeLabels();
    }
    FRAME = { W, H, area: FIT.area, box: FIT.box, handle: hq ? { x: hq[0], y: hq[1], kind: HANDLE_KIND } : null, unit: sc.unit, cx: sc.cx, cy: sc.cy };
  }

  /* ---------- the handle: a button on the stage ---------- */
  const handle = $('afgutHandle');
  let dragging = null;
  function placeHandle(q) {
    const show = !!q && !TRV.still;
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
    const label = HANDLE_KIND === 'phi' ? L('沿品红杆拖动改 Φ̃_H', 'Drag along the magenta pole to set Φ̃_H') : L('沿能标梯拖动改 μ', 'Drag along the energy ladder to set μ');
    if (handle.getAttribute('aria-label') !== label) handle.setAttribute('aria-label', label);
  }
  /** The fraction along the projected segment a → b nearest to the pointer. */
  function along(ev, a, b) {
    const r = stageEl.getBoundingClientRect(), x = ev.clientX - r.left - stageEl.clientLeft, y = ev.clientY - r.top - stageEl.clientTop;
    const dx = b[0] - a[0], dy = b[1] - a[1], d2 = dx * dx + dy * dy;
    return d2 > 1 ? clamp(((x - a[0]) * dx + (y - a[1]) * dy) / d2, 0, 1) : null;
  }
  function dragTo(ev) {
    if (HANDLE_KIND === 'phi') {
      const s = along(ev, sc.p(polePt(0)), sc.p(polePt(PHI_MAX)));
      if (s != null) setPhi(Math.round(s * PHI_MAX * 100) / 100);
    } else {
      const s = along(ev, sc.p(ladderPt(LOG_MZ)), sc.p(ladderPt(LOG_EP)));
      if (s != null) setMu(LOG_MZ + s * (LOG_EP - LOG_MZ));
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
    if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight' && ev.key !== 'ArrowUp' && ev.key !== 'ArrowDown') return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    const sgn = ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : -1;
    if (HANDLE_KIND === 'phi') setPhi(Math.round((S.phiH + 0.01 * sgn) * 100) / 100);
    else setMu(S.logMu + 0.1 * sgn);
  });

  /* ---------- HUD, legend, readouts ---------- */
  const SCENE_NAME = { fields: ['四场同心', 'FOUR FIELDS'], weinberg: ['温伯格角', 'WEINBERG'], higgs: ['希格斯桥', 'HIGGS'], balance: ['勾股天平', 'BALANCE'] };
  function legendItems(M) {
    if (S.scene === 'higgs') return [['cy', 'H<sub>L</sub>'], ['bl', 'H<sub>R</sub>'], ['mg', L('希格斯桥 Φ̃<sub>H</sub>', 'Higgs bridge Φ̃<sub>H</sub>')], ['am', L('当前态', 'current state')], ['ring', L('Φ̃<sub>H</sub> 手柄', 'Φ̃<sub>H</sub> handle')]];
    const fields = [['cy', L('F<sub>pos</sub> 引力', 'F<sub>pos</sub> gravity')], ['vi', 'F<sub>rot</sub> SU(2)'], ['bl', 'F<sub>col</sub> SU(3)'], ['sg', 'F<sub>scl</sub> U(1)']];
    if (S.scene === 'balance') return [...fields, ['dm', '(dτ/dt)²'], ['mg', 'Σ η²']];
    if (S.scene === 'weinberg') return [['vi', L('反常相消', 'anomaly-free')], ['cy', L('固定电荷', 'fixed charges')], ['am', 'sin²θ<sub>W</sub>(μ)'], ['sg', 'F<sub>scl</sub> U(1)']];
    return [...fields, M.m < 0.5 ? ['mg', L('希格斯弦', 'Higgs chords')] : ['ring', L('能标手柄', 'scale handle')]];
  }
  function hudText(M) {
    let big, sub;
    if (S.scene === 'higgs') {
      big = `Φ̃<sub>H</sub> = ${fix(M.phiH, 2)} · (m<sub>W</sub>, m<sub>Z</sub>) = (${fix(M.masses[0], 2)}, ${fix(M.masses[1], 2)}) GeV`;
      sub = `P<sub>L</sub> = ${fix(M.PL, 2)} · P<sub>R</sub> = ${fix(M.PR, 2)} · β = ${fix(M.beta, 3)}`;
    } else if (S.scene === 'balance') {
      big = `(dτ/dt)² + Σ η² = ${fix(M.total, 6)}`;
      sub = `G + Λg = ${fix(M.lhs, 4)} · 8πG/c⁴ T = ${fix(M.load, 4)} · Δ = ${fix(Math.abs(M.lhs - M.load), 6)}`;
    } else if (S.scene === 'weinberg') {
      big = `sin²θ<sub>W</sub>(μ) = ${fix(M.s2, 4)}`;
      sub = `log₁₀(μ/GeV) = ${fix(M.lm, 4)} · α₁⁻¹ = ${fix(M.a[0], 2)} · α₂⁻¹ = ${fix(M.a[1], 2)}`;
    } else {
      big = `${M.m < 0.5 ? L('账本', 'LEDGER') : 'AF-GUT'} · log₁₀(μ/GeV) = ${fix(M.lm, 4)}`;
      sub = `α<sub>G</sub> = ${sci(M.alphaG, 2)} · sin²θ<sub>W</sub> = ${fix(M.s2, 4)}`;
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('legend').innerHTML = legendItems(M).map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  function drawText(M) {
    const I = instances(M);
    const keyZh = { higgs: '(m<sub>W</sub>, m<sub>Z</sub>)', balance: '(dτ/dt)² + Σ η²' }[S.scene] || 'sin²θ<sub>W</sub>(μ)';
    const keyEn = keyZh;
    $('roKeyZh').innerHTML = keyZh; $('roKeyEn').innerHTML = keyEn;
    if (S.scene === 'higgs') { $('roKey').textContent = `(${fix(M.masses[0], 2)}, ${fix(M.masses[1], 2)}) GeV`; $('roKeySub').innerHTML = ` · Φ̃<sub>H</sub> = ${fix(M.phiH, 2)}`; }
    else if (S.scene === 'balance') { $('roKey').textContent = fix(M.total, 6); $('roKeySub').innerHTML = ` · Δ = ${fix(Math.abs(M.lhs - M.load), 6)}`; }
    else { $('roKey').textContent = fix(M.s2, 5); $('roKeySub').innerHTML = ` · α<sub>G</sub> = ${sci(M.alphaG, 2)}`; }
    $('roMu').innerHTML = `${fix(M.lm, 4)} · μ = ${sci(M.mu, 3)} GeV`;
    $('roAlpha').innerHTML = `${fix(M.a[0], 3)} · ${fix(M.a[1], 3)} · ${fix(M.a[2], 3)}`;
    $('roGrav').innerHTML = `${sci(M.alphaG, 3)} · α<sub>G</sub>⁻¹ = ${sci(M.alphaGInv, 3)}`;
    $('roHiggs').innerHTML = `${fix(M.phiH, 2)} · v = ${fix(M.vev, 2)} GeV · (${fix(M.masses[0], 2)}, ${fix(M.masses[1], 2)}) GeV · β = ${fix(M.beta, 4)}`;
    $('roHop').innerHTML = `${fix(M.PL, 4)} + ${fix(M.PR, 4)} = ${fix(M.PL + M.PR, 6)} · θ = ${Math.round(M.theta / DEG)}°`;
    $('roBalance').innerHTML = `${fix(M.rate2, 4)} + ${fix(M.load, 4)} = ${fix(M.total, 6)} · Δ = ${fix(Math.abs(M.lhs - M.load), 6)}`;
    $('roNote').innerHTML = noteFor(M, I);
    $('scenePill').innerHTML = `AFGUT <strong>${L(...SCENE_NAME[S.scene])}</strong>`;
    $('keyPill').innerHTML = S.scene === 'higgs' ? `m<sub>W</sub> <strong>${fix(M.masses[0], 2)} GeV</strong>` : S.scene === 'balance' ? `Σ <strong>${fix(M.total, 6)}</strong>` : `sin²θ<sub>W</sub> <strong>${fix(M.s2, 4)}</strong>`;
    $('hint').innerHTML = S.scene === 'higgs' ? L('拖琥珀手柄改 Φ̃<sub>H</sub> · 拖空白处转视角', 'drag the amber handle to set Φ̃<sub>H</sub> · drag empty space to orbit')
      : S.scene === 'balance' ? L('时间轴走动，五段此消彼长，总和不动 · 拖空白处转视角', 'as the rail runs the five segments trade length, the total stays · drag empty space to orbit')
        : L('拖琥珀手柄沿能标梯改 μ · 拖空白处转视角', 'drag the amber handle along the ladder to set μ · drag empty space to orbit');
    $('formula').innerHTML = FORMULA[S.scene];
    lensBtn.setAttribute('aria-pressed', String(lensNow() === 'ledger'));
  }
  const FORMULA = {
    fields: 'α<sub>i</sub>⁻¹(μ) = α<sub>i</sub>⁻¹(M<sub>Z</sub>) − (b<sub>i</sub>/2π) ln(μ/M<sub>Z</sub>) · α<sub>G</sub> = (μ/E<sub>P</sub>)²',
    weinberg: 'sin²θ<sub>W</sub> = α₂⁻¹/(α₂⁻¹ + (5/3)α₁⁻¹) · N<sub>c</sub>/(2(N<sub>c</sub> + 1)) = 9(N<sub>c</sub> + 1)/(4(9 + 5N<sub>c</sub>)) ⟺ N<sub>c</sub> = 3',
    higgs: 'ψ = (cos θ + J sin θ)L, J = −iσ<sub>x</sub>, θ = πΦ̃<sub>H</sub>τ · (m<sub>W</sub>, m<sub>Z</sub>) = (80.38, 91.19)Φ̃<sub>H</sub> GeV',
    balance: '(dτ/dt)² + η<sub>pos</sub>² + η<sub>rot</sub>² + η<sub>col</sub>² + η<sub>scl</sub>² = ν₀² = 1'
  };
  function noteFor(M, I) {
    if (S.scene === 'higgs') {
      return M.phiH === 0
        ? L('Φ̃<sub>H</sub> = 0：桥断开，态停在 L 片上，P<sub>L</sub> = 1；没有质量，β = 1 的零弧。', 'Φ̃<sub>H</sub> = 0: the bridge is cut and the state stays on sheet L, P<sub>L</sub> = 1; no mass, the null arc with β = 1.')
        : L(`跳迁：J² = −1 让态绕交线转 θ = ${Math.round(M.theta / DEG)}°；换位子 ‖[U, M]‖ = ${fix(I.commutator.norm, 4)} ≠ 0，因为两片超荷差 1/2。`, `Hopping: J² = −1 turns the state about the fold by θ = ${Math.round(M.theta / DEG)}°; the commutator ‖[U, M]‖ = ${fix(I.commutator.norm, 4)} ≠ 0 because the sheets differ in hypercharge by 1/2.`);
    }
    if (S.scene === 'balance') {
      return L(`拉格朗日：(Σu²)(Σv²) − (u·v)² = ${fix(I.lagrange.lhs, 6)}，½ΣΣ(u<sub>i</sub>v<sub>j</sub> − u<sub>j</sub>v<sub>i</sub>)² = ${fix(I.lagrange.rhs, 6)}。(N − 3)(N − 4)/2 在 N = 3、4 为 0。`,
        `Lagrange: (Σu²)(Σv²) − (u·v)² = ${fix(I.lagrange.lhs, 6)} and ½ΣΣ(u<sub>i</sub>v<sub>j</sub> − u<sub>j</sub>v<sub>i</sub>)² = ${fix(I.lagrange.rhs, 6)}. (N − 3)(N − 4)/2 is 0 at N = 3 and 4.`);
    }
    if (S.scene === 'weinberg') {
      return L(`两条曲线之差 (N<sub>c</sub> − 3)(N<sub>c</sub> + 3)/(4(N<sub>c</sub> + 1)(9 + 5N<sub>c</sub>)) 只在 N<sub>c</sub> = 3 为零。α₁⁻¹ − α₂⁻¹ = ${fix(M.a[0] - M.a[1], 3)}。`,
        `The curves differ by (N<sub>c</sub> − 3)(N<sub>c</sub> + 3)/(4(N<sub>c</sub> + 1)(9 + 5N<sub>c</sub>)), zero only at N<sub>c</sub> = 3. α₁⁻¹ − α₂⁻¹ = ${fix(M.a[0] - M.a[1], 3)}.`);
    }
    const t = I.tetra;
    return M.m < 0.5
      ? L(`账本：三个回路相位在锚定规范下不变（c = m + 1 − n = ${I.anchored.c}）。`, `Ledger: the three loop phases are unchanged by anchored gauge transformations (c = m + 1 − n = ${I.anchored.c}).`)
      : L(`原胞：tetraDefects = ${t.actual.tetraDefects}，面值由边势给出；放进一个单极荷会有 ${t.monopole.tetraDefects} 个缺陷。`, `Cell: tetraDefects = ${t.actual.tetraDefects}, the face values come from an edge potential; one monopole charge would give ${t.monopole.tetraDefects} defects.`);
  }

  /* ---------- strip plot ---------- */
  function drawPlot(M) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    const pad = [40, 12, 10, 22];
    if (S.scene === 'fields') {
      $('plotTitle').textContent = L('四种耦合往高能走：α⁻¹(μ)', 'Four couplings toward high energy: α⁻¹(μ)');
      const g = kit.plot(cv, { x: [LOG_MZ, LOG_EP], y: [0, 70], pad });
      g.axes({ xTicks: [2, 5, 8, 11, 14, 17], yTicks: [0, 20, 40, 60], xLabel: 'log₁₀(μ/GeV)' });
      const ls = range(LOG_MZ, LOG_EP, 240);
      g.vline(LOG_MU12, P.ink, { alpha: 0.5, dash: [4, 4] });
      g.line(ls.map((x) => [x, alphaInv(x, 0)]), P.sigma, { width: 2 });
      g.line(ls.map((x) => [x, alphaInv(x, 1)]), P.violet, { width: 2 });
      g.line(ls.map((x) => [x, alphaInv(x, 2)]), P.blue, { width: 2 });
      g.line(ls.map((x) => [x, gravInv(x) <= 70 ? gravInv(x) : null]), P.cyan, { width: 2 });
      g.vline(M.lm, P.amber, { alpha: 0.85 });
      g.text(LOG_MZ + 0.3, 63, 'α_{1}^{−1}', P.sigma, { size: 10.5 });
      g.text(LOG_MZ + 0.3, 33, 'α_{2}^{−1}', P.violet, { size: 10.5 });
      g.text(LOG_MZ + 0.3, 13, 'α_{3}^{−1}', P.blue, { size: 10.5 });
      g.text(17.9, 62, 'α_{G}^{−1}', P.cyan, { size: 10.5, align: 'right' });
      $('plotMeta').innerHTML = `μ₁₂ = 10<sup>${fix(LOG_MU12, 3)}</sup> GeV · α<sub>G</sub>(E<sub>P</sub>) = ${fix(1 / gravInv(LOG_EP), 4)}`;
    } else if (S.scene === 'weinberg') {
      $('plotTitle').textContent = L('sin²θ_W(μ)：单圈跑动', 'sin²θ_W(μ): one-loop running');
      const g = kit.plot(cv, { x: [LOG_MZ, LOG_EP], y: [0.2, 0.5], pad });
      g.axes({ xTicks: [2, 5, 8, 11, 14, 17], yTicks: [0.2, 0.3, 0.375, 0.5], xLabel: 'log₁₀(μ/GeV)' });
      g.hline(0.375, P.ink, { alpha: 0.6, dash: [4, 4] });
      g.vline(LOG_MU12, P.ink, { alpha: 0.5, dash: [4, 4] });
      g.line(range(LOG_MZ, LOG_EP, 240).map((x) => [x, sin2W(x)]), P.violet, { width: 2.2 });
      g.vline(M.lm, P.amber, { alpha: 0.85 }); g.dot(M.lm, M.s2, P.amber, 3.8);
      $('plotMeta').innerHTML = `M<sub>Z</sub>: ${fix(sin2W(LOG_MZ), 5)} · μ₁₂: ${fix(sin2W(LOG_MU12), 4)} · ${L('当前', 'now')} ${fix(M.s2, 4)}`;
    } else if (S.scene === 'higgs') {
      $('plotTitle').textContent = L('左右手跳迁：P_L + P_R = 1', 'Chiral hopping: P_L + P_R = 1');
      const g = kit.plot(cv, { x: [0, 1], y: [0, 1.05], pad });
      g.axes({ xTicks: [0, 0.25, 0.5, 0.75, 1], yTicks: [0, 0.5, 1], xLabel: 'τ' });
      const ts = range(0, 1, 200);
      g.line(ts.map((t) => [t, Math.cos(PI * M.phiH * t) ** 2]), P.cyan, { width: 2.2 });
      g.line(ts.map((t) => [t, Math.sin(PI * M.phiH * t) ** 2]), P.blue, { width: 2.2 });
      g.vline(S.tau, P.amber, { alpha: 0.85 });
      g.legend([[P.cyan, 'P_{L}'], [P.blue, 'P_{R}']]);
      $('plotMeta').innerHTML = `Φ̃<sub>H</sub> = ${fix(M.phiH, 2)} · P<sub>L</sub> + P<sub>R</sub> = ${fix(M.PL + M.PR, 6)}`;
    } else {
      $('plotTitle').textContent = L('勾股平衡：五项平方和恒为 1', 'Pythagorean balance: five squares always sum to 1');
      const g = kit.plot(cv, { x: [0, 1], y: [0, 1.05], pad });
      g.axes({ xTicks: [0, 0.25, 0.5, 0.75, 1], yTicks: [0, 0.5, 1], xLabel: 'τ' });
      const ts = range(0, 1, 160), cols = [P.dim, P.cyan, P.violet, P.blue, P.sigma];
      const cum = ts.map((t) => { const u = clockVector(t); let s = 0; return u.map((x) => (s += x * x)); });
      for (let k = 4; k >= 0; k--) g.area(ts.map((t, j) => [t, cum[j][k]]), cols[k], { alpha: 0.85 });
      g.hline(1, P.ink, { alpha: 0.8, dash: [4, 4] });
      g.vline(S.tau, P.amber, { alpha: 0.85 });
      $('plotMeta').innerHTML = `(dτ/dt)² = ${fix(M.rate2, 4)} · Σ η² = ${fix(M.load, 4)} · ${L('总和', 'total')} ${fix(M.total, 6)}`;
    }
  }

  const paint = kit.painter(() => {
    const M = model();
    hudText(M); TRV.hudFit();
    drawStage(M); drawText(M); drawPlot(M);
  }, [stageEl, $('plot')]);

  /* ---------- the rail: the story τ of the card ---------- */
  const playBtn = $('playBtn');
  const railLabel = (t) => (S.drive === 'run' ? `τ ${fix(t, 2)} · log₁₀ μ ${fix(runMu(t), 2)}` : S.drive === 'morph' ? `τ ${fix(t, 2)} · ${L('账本 → 单子', 'ledger → monad')}` : `τ ${fix(t, 2)} · ν₀t = ${Math.round(720 * t)}°`);
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, t: 0, rate: 0.12, step: 0.05, loop: true,
    format: (t) => `${railLabel(t)} <small>/ 1</small>`,
    onChange: (t, C) => { S.tau = t; if (S.drive === 'run' || S.drive === 'morph') syncFields(); playBtn.textContent = C.playing ? '❚❚' : '▷'; playBtn.setAttribute('aria-pressed', String(C.playing)); paint(); }
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
  /** Blend every shown value from `from` to the targets over ms. */
  function startBlend(from, ms) {
    if (transition) transition.cancel();
    S.from = from; S.blend = 0;
    const token = {};
    transition = token;
    token.cancel = () => { if (token.run) token.run.cancel(); S.blend = 1; S.from = null; };
    token.run = kit.tween(ms, (e) => { S.blend = e; syncFields(); paint(); }, () => { if (transition === token) transition = null; S.blend = 1; S.from = null; syncFields(); paint(); });
  }
  /** The reader takes over: the current values become the state, the clock pauses, no card is marked. */
  function leave() {
    stopBootPlay();
    const e = eff();
    if (transition) transition.cancel();
    transition = null;
    S.logMu = e.logMu; S.m = e.m; S.phiH = e.phiH; S.from = null; S.blend = 1; S.drive = 'phase';
    cards.mark(null); clock.pause(); clock.set(clock.t, true);
  }
  const fMu = kit.field($('logMu'), { fmt: (v) => fix(clamp(v, LOG_MZ, LOG_EP), 4), onInput: (v) => { leave(); S.logMu = clamp(v, LOG_MZ, LOG_EP); paint(); } });
  const fPhi = kit.field($('phiH'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.phiH = clamp(v, 0, PHI_MAX); paint(); } });
  function syncFields() { const e = eff(); fMu.set(e.logMu); fPhi.set(Math.round(e.phiH * 100) / 100); }
  function setMu(v) { S.logMu = clamp(v, LOG_MZ, LOG_EP); syncFields(); paint(); }
  function setPhi(v) { S.phiH = clamp(v, 0, PHI_MAX); syncFields(); paint(); }
  const lensBtn = $('lensToggleBtn');
  function lensNow() { const m = S.drive === 'morph' || (S.from && S.blend < 1) ? eff().m : S.m; return m >= 0.5 ? 'monad' : 'ledger'; }
  function setLens(lens, ms) {
    const from = eff();
    leave();
    S.m = lens === 'ledger' ? 0 : 1;
    if (ms > 0 && !TRV.still) startBlend(from, ms);
    paint();
  }
  lensBtn.addEventListener('click', () => setLens(lensNow() === 'monad' ? 'ledger' : 'monad', 700));
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); S.scene = SCENE_NAME[v] ? v : 'fields'; paint(); });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'concentric-four-field-monad': { scene: 'fields', drive: 'phase', logMu: LOG_MZ, phiH: 1, m: 1, play: true, still: 0.5 },
    'weinberg-angle-rg-running': { scene: 'weinberg', drive: 'run', logMu: LOG_MZ, phiH: 1, m: 1, play: true, still: 'end' },
    'higgs-cross-concept-zitterbewegung': { scene: 'higgs', drive: 'phase', logMu: LOG_MZ, phiH: 1, m: 1, play: true, still: 0.75 },
    'einstein-pythagorean-clock-balance': { scene: 'balance', drive: 'phase', logMu: LOG_MZ, phiH: 1, m: 1, play: true, still: 0.6 },
    'afgut-ledger-split-vs-unify': { scene: 'fields', drive: 'morph', logMu: LOG_EP, phiH: 1, m: 1, play: true, still: 'end' }
  };
  const NOTES = {
    'concentric-four-field-monad': ['单原胞同心四场：中心是 ΔT<sub>ε</sub> 原胞，四片圆弧壳围着它，越强的耦合越贴近原胞。M<sub>Z</sub> 处蓝色 F<sub>col</sub>（SU(3)，三个锚点锁住 N<sub>c</sub> = 3）在 α₃⁻¹ = 8.47，紫色 F<sub>rot</sub>（SU(2)）在 α₂⁻¹ = 29.59，银白 F<sub>scl</sub>（U(1) 相位与标度）在 α₁⁻¹ = 59.00，青色 F<sub>pos</sub> 的引力 α<sub>G</sub>⁻¹ = 1.79 × 10³⁴ 停在外沿（虚线边）。时间轴是钟相位：τ = 0.5 时紫壳上的矢量转满一圈，旋量却读 −1，要转两圈（720°）才回到 +1。',
      'One cell, four concentric fields: the ΔT<sub>ε</sub> cell sits at the centre with four arc shells around it, the stronger the coupling the closer to the cell. At M<sub>Z</sub> the blue F<sub>col</sub> (SU(3), three anchors locking N<sub>c</sub> = 3) sits at α₃⁻¹ = 8.47, the violet F<sub>rot</sub> (SU(2)) at α₂⁻¹ = 29.59, the silver F<sub>scl</sub> (U(1) phase and scale) at α₁⁻¹ = 59.00, and the cyan F<sub>pos</sub> of gravity, α<sub>G</sub>⁻¹ = 1.79 × 10³⁴, stays at the rim (dashed edge). The rail is the clock phase: at τ = 0.5 the vector on the violet shell has turned once, yet the spinor reads −1; it takes two turns (720°) to return to +1.'],
    'weinberg-angle-rg-running': ['温伯格角：左侧屏上，反常相消曲线 N<sub>c</sub>/(2(N<sub>c</sub> + 1))（紫）与固定电荷曲线 9(N<sub>c</sub> + 1)/(4(9 + 5N<sub>c</sub>))（青）只在 N<sub>c</sub> = 3 相交，交点 Tr(T₃²)/Tr(Q²) = 2/(16/3) = 3/8，16/3 里带着手征—矢量因子 2。时间轴从 μ₁₂ = 10<sup>13.006</sup> GeV 往下跑：紫壳（α₂⁻¹）与银白壳（α₁⁻¹）从同一个 42.41 分开，琥珀水平线 sin²θ<sub>W</sub>(μ) 从 0.3750 降到 M<sub>Z</sub> 处的 0.2313。',
      'The Weinberg angle: on the screen at the left, the anomaly-free curve N<sub>c</sub>/(2(N<sub>c</sub> + 1)) (violet) and the fixed-charge curve 9(N<sub>c</sub> + 1)/(4(9 + 5N<sub>c</sub>)) (cyan) meet only at N<sub>c</sub> = 3, where Tr(T₃²)/Tr(Q²) = 2/(16/3) = 3/8, the 16/3 carrying the chiral-to-vector factor 2. The rail runs down from μ₁₂ = 10<sup>13.006</sup> GeV: the violet shell (α₂⁻¹) and the silver shell (α₁⁻¹) part from a common 42.41, and the amber line sin²θ<sub>W</sub>(μ) falls from 0.3750 to 0.2313 at M<sub>Z</sub>.'],
    'higgs-cross-concept-zitterbewegung': ['希格斯桥：青色 H<sub>L</sub> 与蓝色 H<sub>R</sub> 两片成 90°，品红杆是 Φ̃<sub>H</sub>。琥珀态绕交线转 θ = πΦ̃<sub>H</sub>τ：Φ̃<sub>H</sub> = 1 时 τ = 0.5 到 R 片，τ = 1 回到 L 片的反面；两条虚线 (L ± R)/√2 是不动的驻波，即静止质量。τ = 0.75 时 θ = 135°，P<sub>L</sub> = P<sub>R</sub> = 0.50。同一个 v = 246.22 GeV 给出 (m<sub>W</sub>, m<sub>Z</sub>) = (80.38, 91.19) GeV；Φ̃<sub>H</sub> = 0 时桥断开，态停在 L 片，β = 1。',
      'The Higgs bridge: the cyan H<sub>L</sub> and blue H<sub>R</sub> sheets stand at 90°, and the magenta pole is Φ̃<sub>H</sub>. The amber state turns about the fold by θ = πΦ̃<sub>H</sub>τ: at Φ̃<sub>H</sub> = 1 it reaches sheet R at τ = 0.5 and the back of sheet L at τ = 1; the two dashed diagonals (L ± R)/√2 are the standing waves that do not move, the rest mass. At τ = 0.75, θ = 135° and P<sub>L</sub> = P<sub>R</sub> = 0.50. The same v = 246.22 GeV gives (m<sub>W</sub>, m<sub>Z</sub>) = (80.38, 91.19) GeV; at Φ̃<sub>H</sub> = 0 the bridge is cut, the state stays on sheet L and β = 1.'],
    'einstein-pythagorean-clock-balance': ['勾股天平：左柱把主频 ν₀² = 1 分成五段：暗色的固有时率 (dτ/dt)² 与四个场色的弧负载 η²。τ 走动时五段此消彼长，柱顶始终贴着 ν₀² = 1 的虚线。右边两柱 G<sub>μν</sub> + Λg<sub>μν</sub> = 1 − (dτ/dt)² 与 8πG/c⁴·T<sub>μν</sub> = Σ η² 分别算出，一样高，Δ = 0.000000。τ = 0.6 时 (dτ/dt)² = 0.7540，Σ η² = 0.2460。',
      'The Pythagorean balance: the left column splits ν₀² = 1 into five segments, the dark proper-time rate (dτ/dt)² and the four arc loads η² in the field colours. As τ runs the segments trade length while the top stays on the dashed line ν₀² = 1. The two columns on the right, G<sub>μν</sub> + Λg<sub>μν</sub> = 1 − (dτ/dt)² and 8πG/c⁴·T<sub>μν</sub> = Σ η², are computed separately and stand level, Δ = 0.000000. At τ = 0.6, (dτ/dt)² = 0.7540 and Σ η² = 0.2460.'],
    'afgut-ledger-split-vs-unify': ['账本 ↔ 单子：在普朗克能标 E<sub>P</sub> 上（α<sub>G</sub> = 1.0000），时间轴把账本收成一个原胞。τ = 0 时四个概念场是四个独立的三维球，六条品红希格斯弦连成四面体，三个回路相位在锚定规范下不变；τ 走到 1，球心收进原胞，球展开成同心圆弧壳：青色引力壳 α<sub>G</sub>⁻¹ = 1 落到最里层，三个规范壳在 33.27、49.46、52.41，没有汇合在同一处（开放问题）。',
      'Ledger ↔ monad: at the Planck scale E<sub>P</sub> (α<sub>G</sub> = 1.0000) the rail closes the ledger into one cell. At τ = 0 the four concept fields are four separate 3D balls joined into a tetrahedron by six magenta Higgs chords, with three loop phases unchanged by anchored gauge transformations; as τ reaches 1 the centres close into the cell and the balls open into concentric arc shells: the cyan gravity shell, α<sub>G</sub>⁻¹ = 1, moves innermost, while the three gauge shells sit at 33.27, 49.46 and 52.41, not at one place (an open problem).']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'concentric-four-field-monad': ['四片圆弧壳围着一个原胞，耦合越强越靠里；τ = 0.5 时矢量转满一圈，旋量读 −1。', 'Four arc shells around one cell, stronger couplings closer in; at τ = 0.5 the vector has turned once and the spinor reads −1.'],
    'weinberg-angle-rg-running': ['两条 Nc 曲线只在 Nc = 3 交于 3/8；跑到 MZ，琥珀线降到 0.2313。', 'The two Nc curves meet only at Nc = 3, at 3/8; run down to MZ, the amber line falls to 0.2313.'],
    'higgs-cross-concept-zitterbewegung': ['琥珀态绕交线转到 135°：P(L) = P(R) = 0.50，(mW, mZ) = (80.38, 91.19) GeV。', 'The amber state has turned 135° about the fold: P(L) = P(R) = 0.50 and (mW, mZ) = (80.38, 91.19) GeV.'],
    'einstein-pythagorean-clock-balance': ['五段平方和贴住 ν₀² = 1；右边两柱一样高，Δ = 0.000000。', 'The five squares fill ν₀² = 1; the two columns on the right stand level, Δ = 0.000000.'],
    'afgut-ledger-split-vs-unify': ['普朗克能标上账本收成一个原胞：引力壳 αG = 1 落到最里层。', 'At the Planck scale the ledger closes into one cell: the gravity shell, αG = 1, moves innermost.']
  };
  function applyPreset(id) {
    const p = PRESETS[id];
    stopBootPlay(); clock.pause();
    const before = eff();
    if (transition) transition.cancel();
    transition = null;
    S.scene = p.scene; sceneChips.set(p.scene, true);
    S.drive = p.drive; S.logMu = p.logMu; S.phiH = p.phiH; S.m = p.m; S.from = null; S.blend = 1;
    sc.view([VIEW0[0], VIEW0[1], 1], booting || TRV.still ? 0 : 600);
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still);
    else clock.set(0);
    if (!booting && !TRV.still) startBlend(before, 600);
    syncFields();
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) bootAutoplay(); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拉能标 μ 与 Φ̃<sub>H</sub>，换透镜或场景，拖琥珀手柄。时间轴现在是钟相位。随时可以再选一张卡。', 'Free play: pull the scale μ and Φ̃<sub>H</sub>, switch the lens or the scene, drag the amber handle. The rail is now the clock phase. Pick a card again at any time.']
  });
  // the tour bar's card title carries the id #tourStep
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.AFGUT_UNIFY_DEBUG = Object.freeze({
    get state() {
      const M = model(), I = instances(M);
      return JSON.parse(JSON.stringify({
        preset: cards.current, t: clock.t, playing: clock.playing, scene: S.scene, drive: S.drive, lens: lensNow(), morph: M.m, blending: !!(S.from && S.blend < 1),
        logMu: M.lm, mu: M.mu, phiH: M.phiH, tau: S.tau,
        constants: { MZ, EP, alphaInvEm: AINV_EM, sin2MZ: S2_MZ, alphaS: AS_MZ, b: B, alpha0: A0, logMZ: LOG_MZ, logEP: LOG_EP, logMu12: LOG_MU12, v: V_EW, mW1: MW1, mZ1: MZ1, YL: Y_L, YR: Y_R, scale: SCALE, rIn: R_IN, rOut: R_OUT },
        alphaInv: M.a, alphaG: M.alphaG, alphaGInv: M.alphaGInv, sin2W: M.s2, fieldInv: M.inv, radii: M.radii, offScale: M.offScale,
        crossings: { c12: crossLog(0, 1), c13: crossLog(0, 2), c23: crossLog(1, 2) },
        weinberg: { anom: [1, 2, 3, 4, 5, 6].map(anomCurve), fixed: [1, 2, 3, 4, 5, 6].map(fixedCurve), atThree: [anomCurve(3), fixedCurve(3)] },
        higgs: { theta: M.theta, PL: M.PL, PR: M.PR, beta: M.beta, masses: M.masses, vev: M.vev },
        clock: M.clock, balance: { rate2: M.rate2, load: M.load, total: M.total, lhs: M.lhs, delta: Math.abs(M.lhs - M.load) },
        spinor: { phi: M.phi, lift: M.spinor }, chi: M.chi,
        dirs: DIRS, edges: EDGES, gauge: GAUGE,
        leanInstances: I, camera: Object.assign({}, sc.cam), handle: FRAME ? FRAME.handle : null, labels: PLACED, stageFrame: FRAME
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock). */
    setState(o) {
      leave();
      if (o.scene != null) { S.scene = SCENE_NAME[o.scene] ? o.scene : 'fields'; sceneChips.set(S.scene, true); }
      if (o.logMu != null) S.logMu = clamp(o.logMu, LOG_MZ, LOG_EP);
      if (o.phiH != null) S.phiH = clamp(o.phiH, 0, PHI_MAX);
      if (o.m != null) S.m = clamp(o.m, 0, 1);
      syncFields();
      if (o.t != null) clock.set(clamp(o.t, 0, 1));
      paint();
    },
    /** Viewport coordinates of the handle (for pointer tests), or null when hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates where the handle would sit for log₁₀ μ (ladder) or Φ̃_H (pole), for drag targets. */
    dragTarget(v) {
      const b = stageEl.getBoundingClientRect(), q = HANDLE_KIND === 'phi' ? sc.p(polePt(v)) : sc.p(ladderPt(v));
      return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] };
    }
  });
  window.TRV_THUMB = () => { cards.pick('concentric-four-field-monad'); clock.pause(); clock.set(0.5); sc.view([VIEW0[0], VIEW0[1], 1], 0); paint.now(); };
  cards.pick(cards.initial('concentric-four-field-monad'));
  booting = false;
  paint();
})();
