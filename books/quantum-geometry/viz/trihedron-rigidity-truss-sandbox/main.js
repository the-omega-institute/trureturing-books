/* TRUSS//RIGIDITY · 极小圆弧体三维刚性桁架 · The trihedron rigidity truss
   The stage is the unit comparison sphere with N concepts C₁ … C_N (3 ≤ N ≤ 8) and the comparison arcs between them.
   Layout (rest): C₁ is the hub; C₂ … C₇ sit round it at arc distance ε, consecutive spokes A(ε) = arccos(c/(1+c)) apart
   (c = cos ε), so each sector C₁C_kC_{k+1} is an equilateral minimal arc-body ΔT_ε; C₈ is the mirror image of C₁ across
   the arc C₄C₅. One rigid turn points the cluster at the default camera.
   Two topologies on one rail:
     complete            all N(N−1)/2 pairs; the Gram table is fixed, so the truss holds its shape (max|ΔG| = 0); a push
                         shows as amber stress on the struts the floppy mode would have to stretch or squeeze
     missing-diagonals   only the perimeter ring (sides ε); its interior angles follow the push along the chain and the
                         last node closes on two circles, so every side keeps its length to 1e−12 while the diagonals move
   The rail is the phase t of the push d = clamp(push + τ cos 2πt, −1, 1); the amber handle sets `push`.
   Counts: E(K_N) − (3N − 6) = (N − 3)(N − 4)/2; each new node is pinned by its three nearest older nodes (3N − 6 in all).
   The page draws with kit.solid (three.js, fetched by kit.js). Read-only probe: window.RIGIDITY_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, sgn, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180, O = [0, 0, 0];
  const NMIN = 3, NMAX = 8, TET = Math.acos(1 / 3), FIVE_GAP = TAU - 5 * TET;
  const YAW0 = -0.55, PITCH0 = 0.42;             // the layout faces this camera
  const VIEW0 = [YAW0 + 0.42, PITCH0 + 0.16];     // the default view: a little from the side, so caps and radii read as solid
  const SUBS = '₀₁₂₃₄₅₆₇₈₉', sub = (k) => String(k).split('').map((d) => SUBS[+d]).join('');
  const C = (k) => `C${sub(k)}`;

  /* ---------- spherical geometry ---------- */
  const arcOf = (a, b) => Math.acos(clamp(v3.dot(a, b), -1, 1));
  /** Unit tangent at p towards q along the great circle. */
  const tangent = (p, q) => v3.unit(v3.sub(q, v3.scale(p, v3.dot(p, q))));
  /** Signed turn at p from the direction towards a to the direction towards b (right-handed about p). */
  const turnAt = (p, a, b) => { const ta = tangent(p, a), tb = tangent(p, b); return Math.atan2(v3.dot(p, v3.cross(ta, tb)), v3.dot(ta, tb)); };
  /** Interior spherical angle at p between the arcs to a and to b. */
  const angleAt = (p, a, b) => Math.acos(clamp(v3.dot(tangent(p, a), tangent(p, b)), -1, 1));
  const arcPts = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => v3.slerp(a, b, i / n));
  const lift = (pts, r) => pts.map((p) => v3.scale(p, r));
  const det3 = (M) => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
  const gramOf = (X) => X.map((u) => X.map((w) => v3.dot(u, w)));
  /** Signed solid angle of the spherical triangle abc (Van Oosterom–Strackee), in (−2π, 2π]. */
  const solidAngle = (a, b, c) => 2 * Math.atan2(v3.dot(a, v3.cross(b, c)), 1 + v3.dot(a, b) + v3.dot(b, c) + v3.dot(c, a));
  const minPair = (X) => { let m = Infinity; for (let i = 0; i < X.length; i++) for (let j = i + 1; j < X.length; j++) m = Math.min(m, arcOf(X[i], X[j])); return m; };

  /* the default camera's axes (as kit.solid: x right, z up) */
  const CAM = (() => { const cy = Math.cos(YAW0), sy = Math.sin(YAW0), cp = Math.cos(PITCH0), sp = Math.sin(PITCH0); return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] }; })();

  /* ---------- the rest layout for (ε, N): positions, cycle, pins, arc-bodies, closure ---------- */
  const cache = new Map();
  function layout(epsDeg, N) {
    const key = `${epsDeg}|${N}`;
    if (cache.has(key)) return cache.get(key);
    const e = epsDeg * DEG, c = Math.cos(e), s = Math.sin(e), A = Math.acos(c / (1 + c)), phi0 = PI / 2 - A;
    const loc = [[0, 0, 1]];
    for (let k = 2; k <= Math.min(N, 7); k++) { const f = phi0 + (k - 2) * A; loc.push([s * Math.cos(f), s * Math.sin(f), c]); }
    if (N >= 8) { const n = v3.unit(v3.cross(loc[3], loc[4])); loc.push(v3.sub(loc[0], v3.scale(n, 2 * v3.dot(loc[0], n)))); }
    // to world: local x → camera right, y → camera up, z → towards the camera; then turn the centroid onto the view axis
    let X = loc.map((p) => v3.add(v3.add(v3.scale(CAM.R, p[0]), v3.scale(CAM.U, p[1])), v3.scale(CAM.D, p[2])));
    const m = v3.unit(X.reduce(v3.add, [0, 0, 0])), ax = v3.cross(m, CAM.D), sa = v3.len(ax);
    if (sa > 1e-9) { const k = v3.scale(ax, 1 / sa), t = Math.atan2(sa, v3.dot(m, CAM.D)); X = X.map((p) => v3.rot(p, k, t)); }
    // the perimeter ring: the hub, the rim in order (C₈ between C₄ and C₅)
    const cyc = N <= 7 ? Array.from({ length: N }, (_, i) => i) : [0, 1, 2, 3, 7, 4, 5, 6];
    // arc-bodies: the fan round the hub (and C₄C₅C₈)
    const tris = [];
    for (let k = 1; k + 1 < Math.min(N, 7); k++) tris.push([0, k, k + 1]);
    if (N >= 8) tris.push([3, 7, 4]);
    // the back side: a fan of chords from cycle position 1 closes the disc into a triangulated sphere
    const back = []; for (let i = 2; i < N - 1; i++) back.push([cyc[1], cyc[i + 1], cyc[i]]);
    back.push([cyc[1], cyc[0], cyc[N - 1]]);
    // pins: each new node is fixed by its three nearest older nodes
    const pinKeys = new Set(), pins = [];
    for (let k = 1; k < N; k++) {
      const older = Array.from({ length: k }, (_, i) => i).sort((a, b) => arcOf(loc[k], loc[a]) - arcOf(loc[k], loc[b]) || a - b);
      for (const j of older.slice(0, 3)) { pins.push([j, k]); pinKeys.add(`${j}-${k}`); }
    }
    const pairs = []; for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) pairs.push([i, j]);
    const sideKeys = new Set(cyc.map((a, i) => { const b = cyc[(i + 1) % N]; return `${Math.min(a, b)}-${Math.max(a, b)}`; }));
    const Xc = cyc.map((i) => X[i]);
    const L0 = { epsDeg, e, c, s, A, X, cyc, tris, back, pins, pinKeys, pairs, sideKeys, Xc, N };
    L0.sMax = sLimit(Xc);
    L0.faces = tris.concat(back);
    cache.set(key, L0);
    return L0;
  }

  /** The flexed ring at shear s: the interior angles at ring positions 1 … N−3 change by s·w; the first two ring nodes
      stay; each next node is one side length further; the last closes on two circles. Continued from 0 in fixed steps
      (the branch is the one of the rest shape). Null where the circles miss. */
  function flexRing(Xc, s, steps = 24) {
    const M = Xc.length;
    if (M < 4 || Math.abs(s) < 1e-15) return Xc.map((p) => p.slice());
    const Ls = Xc.map((p, i) => arcOf(p, Xc[(i + 1) % M]));
    const th0 = [], w = [];
    for (let i = 1; i <= M - 3; i++) { th0.push(turnAt(Xc[i], Xc[i - 1], Xc[i + 1])); w.push(M === 4 || i % 2 ? 1 : -0.55); }
    let prev = Xc[M - 1], X = null;
    for (let k = 1; k <= steps; k++) {
      const sk = s * k / steps;
      X = [Xc[0], Xc[1]];
      for (let i = 1; i <= M - 3; i++) {
        const p = X[i], dir = v3.rot(tangent(p, X[i - 1]), p, th0[i - 1] + sk * w[i - 1]);
        X.push(v3.add(v3.scale(p, Math.cos(Ls[i])), v3.scale(dir, Math.sin(Ls[i]))));
      }
      const a = X[M - 2], b = X[0], g = v3.dot(a, b), ca = Math.cos(Ls[M - 2]), cb = Math.cos(Ls[M - 1]);
      const al = (ca - cb * g) / (1 - g * g), be = (cb - ca * g) / (1 - g * g), r2 = 1 - (al * al + be * be + 2 * al * be * g);
      if (!(r2 > 1e-10)) return null;
      const n = v3.unit(v3.cross(a, b)), base = v3.add(v3.scale(a, al), v3.scale(b, be)), r = Math.sqrt(r2);
      const q1 = v3.add(base, v3.scale(n, r)), q2 = v3.sub(base, v3.scale(n, r));
      const q = v3.len(v3.sub(q1, prev)) <= v3.len(v3.sub(q2, prev)) ? q1 : q2;
      X.push(q); prev = q;
    }
    return X;
  }
  /** The largest shear (radians, both ways) that keeps the ring closed and its nodes apart. */
  function sLimit(Xc) {
    if (Xc.length < 4) return 0;
    const floor = Math.max(4 * DEG, 0.5 * minPair(Xc));
    let lim = 0.62;
    for (const dir of [1, -1]) {
      let ok = 0;
      for (let s = 0.02; s <= 0.62 + 1e-9; s += 0.02) { const X = flexRing(Xc, dir * s); if (!X || minPair(X) < floor) break; ok = s; }
      lim = Math.min(lim, ok);
    }
    return 0.85 * lim;
  }

  /* ---------- the face count and the ZMod 2 check of face_cycle_exact on the closed surface ---------- */
  const faceCache = new Map();
  function faceCheck(Lay) {
    const key = `${Lay.N}`;
    if (faceCache.has(key)) return faceCache.get(key);
    const F = Lay.faces, edges = new Map();
    F.forEach((f, fi) => { for (let k = 0; k < 3; k++) { const a = f[k], b = f[(k + 1) % 3], e = `${Math.min(a, b)}-${Math.max(a, b)}`; if (!edges.has(e)) edges.set(e, []); edges.get(e).push(fi); } });
    const E = edges.size, V = Lay.N, nF = F.length, closed = [...edges.values()].every((l) => l.length === 2);
    // every labelling x of the faces by ZMod 2: its boundary on an edge is the sum of the two faces there
    let zeroIffConst = true, kernel = 0;
    const inc = [...edges.values()];
    for (let x = 0; x < 1 << nF; x++) {
      const zero = inc.every(([f, g]) => (((x >> f) ^ (x >> g)) & 1) === 0), constant = x === 0 || x === (1 << nF) - 1;
      if (zero) kernel++;
      if (zero !== constant) zeroIffConst = false;
    }
    const r = { V, E, F: nF, euler: V - E + nF, closed, zeroIffConst, kernel, rankBoundary: nF - Math.log2(kernel), cycleDim: E - V + 1 };
    faceCache.set(key, r);
    return r;
  }

  /* ---------- the pure-state and spinor checks ---------- */
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  function blochCheck(r) {
    // ρ = blochMatrix(1, r) = (I + r·σ)/2; bloch ρ = (2 Re ρ₀₁, −2 Im ρ₀₁, ρ₀₀ − ρ₁₁)
    const rho = [[[(1 + r[2]) / 2, 0], [r[0] / 2, -r[1] / 2]], [[r[0] / 2, r[1] / 2], [(1 - r[2]) / 2, 0]]];
    let idem = 0;
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
      const s = [0, 0]; for (let k = 0; k < 2; k++) { const m = cmul(rho[i][k], rho[k][j]); s[0] += m[0]; s[1] += m[1]; }
      idem = Math.max(idem, Math.hypot(s[0] - rho[i][j][0], s[1] - rho[i][j][1]));
    }
    const b = [2 * rho[0][1][0], -2 * rho[0][1][1], rho[0][0][0] - rho[1][1][0]];
    return { trace: rho[0][0][0] + rho[1][1][0], idem, norm: v3.len(b) };
  }
  const spinor = (r) => { const th = Math.acos(clamp(r[2], -1, 1)), ph = Math.atan2(r[1], r[0]); return [[Math.cos(th / 2), 0], [Math.sin(th / 2) * Math.cos(ph), Math.sin(th / 2) * Math.sin(ph)]]; };
  /** fsAngle(a, b) = arccos |⟨ψ_a, ψ_b⟩| for the spinors of two Bloch vectors. */
  function fsAngle(a, b) {
    const p = spinor(a), q = spinor(b);
    const re = p[0][0] * q[0][0] + p[0][1] * q[0][1] + p[1][0] * q[1][0] + p[1][1] * q[1][1];
    const im = p[0][0] * q[0][1] - p[0][1] * q[0][0] + p[1][0] * q[1][1] - p[1][1] * q[1][0];
    return Math.acos(clamp(Math.hypot(re, im), 0, 1));
  }

  /* ---------- the 2-cochain of signed solid angles and its tetrahedral defects ---------- */
  function cochain(X) {
    const N = X.length, F = [];
    for (let i = 0; i < N; i++) { F[i] = []; for (let j = 0; j < N; j++) { F[i][j] = []; for (let k = 0; k < N; k++) F[i][j][k] = solidAngle(X[i], X[j], X[k]); } }
    const nz = (v) => Math.abs(v) > 1e-9;
    let defects = 0; const faceErr = new Array(N).fill(0);
    for (let r = 0; r < N; r++) for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) for (let k = 0; k < N; k++) {
      if (nz(F[i][j][k] - F[r][j][k] + F[r][i][k] - F[r][i][j])) defects++;
      if (nz(F[i][j][k] - (F[r][j][k] - F[r][i][k] + F[r][i][j]))) faceErr[r]++;
    }
    // the edge cochain anchored at C₁: edge(i, j) = F(1, i, j); its errors
    let edgeErr = 0;
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) for (let k = 0; k < N; k++) if (nz(F[i][j][k] - (F[0][j][k] - F[0][i][k] + F[0][i][j]))) edgeErr++;
    const sumFace = faceErr.reduce((a, b) => a + b, 0);
    return { defects, faceErr, sumFace, incidence: sumFace === defects, anchorOk: faceErr.some((f) => N * f <= defects), edgeErr, repairBound: defects <= 4 * N * edgeErr, exact: defects === 0 && edgeErr === 0 };
  }

  /* ---------- state ---------- */
  const S = { N: 5, mode: 'complete', torque: 0.35, eps: 60, push: 0, t: 1, fresh: true, flash: 1, plot: 'counts', flexOn: 0, morph: 1, from: null, fromN: 5 };
  const drive = () => clamp(S.push + S.torque * Math.cos(TAU * S.t), -1, 1);

  /** Everything the page shows, computed from the state. */
  function model() {
    const Lay = layout(S.eps, S.N), N = S.N, c = Lay.c, d = drive(), missing = S.mode === 'missing-diagonals';
    // the ring follows the push while the diagonals are cut; flexOn eases it in and out when they are cut or welded
    const sNow = d * Lay.sMax * S.flexOn, sWould = d * Lay.sMax;
    const ring = flexRing(Lay.Xc, sNow) || Lay.Xc;
    const X = Lay.X.map((p) => p.slice()); Lay.cyc.forEach((n, i) => { X[n] = ring[i]; });
    // the would-be shape under the same push (complete mode): the stress on each strut is the length the floppy mode asks of it
    const wouldRing = flexRing(Lay.Xc, sWould) || Lay.Xc, Xw = Lay.X.map((p) => p.slice()); Lay.cyc.forEach((n, i) => { Xw[n] = wouldRing[i]; });
    const stress = []; let stressMax = 0;
    for (const [i, j] of Lay.pairs) {
      if (Lay.sideKeys.has(`${i}-${j}`)) continue;
      const e = arcOf(Xw[i], Xw[j]) - arcOf(Lay.X[i], Lay.X[j]);
      stress.push({ i, j, e }); stressMax = Math.max(stressMax, Math.abs(e));
    }
    const completeEdges = N * (N - 1) / 2, activeEdges = missing ? (N === 3 ? 3 : N) : completeEdges;
    const maxwell3DEdges = 3 * N - 6, maxwellExcess = activeEdges - maxwell3DEdges;
    const floppyModes = missing ? (N === 3 ? 0 : 3 * N - 6 - N) : Math.max(0, 3 * N - 6 - activeEdges);
    const sphereFloppyModes = missing ? Math.max(0, N - 3) : 0;
    // the arc-body ΔT_ε = C₁C₂C₃ at rest
    const T = [Lay.X[0], Lay.X[1], Lay.X[2]], G3 = gramOf(T), detG3 = det3(G3);
    const angSum = angleAt(T[0], T[1], T[2]) + angleAt(T[1], T[2], T[0]) + angleAt(T[2], T[0], T[1]);
    const flatSum = (() => { const ang = (p, a, b) => Math.acos(clamp(v3.dot(v3.unit(v3.sub(a, p)), v3.unit(v3.sub(b, p))), -1, 1)); return ang(T[0], T[1], T[2]) + ang(T[1], T[2], T[0]) + ang(T[2], T[0], T[1]); })();
    const fs = [fsAngle(T[0], T[1]), fsAngle(T[1], T[2]), fsAngle(T[0], T[2])];
    // Gram drift, sides and diagonals of the ring
    let gramMaxDiff = 0; for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) gramMaxDiff = Math.max(gramMaxDiff, Math.abs(v3.dot(X[i], X[j]) - v3.dot(Lay.X[i], Lay.X[j])));
    let sideCosMaxDev = 0; for (let i = 0; i < N; i++) sideCosMaxDev = Math.max(sideCosMaxDev, Math.abs(v3.dot(ring[i], ring[(i + 1) % N]) - c));
    const diag = N >= 4 ? [v3.dot(ring[0], ring[2]), v3.dot(ring[1], ring[3])] : [null, null];
    const diagRest = N >= 4 ? [v3.dot(Lay.Xc[0], Lay.Xc[2]), v3.dot(Lay.Xc[1], Lay.Xc[3])] : [null, null];
    const shearAngleDeg = N >= 4 ? (angleAt(ring[1], ring[0], ring[2]) - angleAt(Lay.Xc[1], Lay.Xc[0], Lay.Xc[2])) / DEG : 0;
    let shearAmplitude = 0; for (let i = 0; i < N; i++) shearAmplitude = Math.max(shearAmplitude, arcOf(X[i], Lay.X[i]));
    // pure states on the sphere
    let blochDev = 0, idem = 0, trace = 0; for (const r of X) { const b = blochCheck(r); blochDev = Math.max(blochDev, Math.abs(b.norm - 1)); idem = Math.max(idem, b.idem); trace = Math.max(trace, Math.abs(b.trace - 1)); }
    // hinge curvature: the angle the fan leaves round the hub
    const hubTris = Lay.tris.filter((t) => t[0] === 0), hubSum = hubTris.reduce((a, t) => a + angleAt(Lay.X[0], Lay.X[t[1]], Lay.X[t[2]]), 0);
    const hubDeficitRad = N >= 7 ? TAU - hubSum : null;   // five arc-bodies round C₁ (N ≥ 7)
    const fc = faceCheck(Lay), co = cochain(X);
    const excessPos = Math.max(0, maxwellExcess);
    return {
      Lay, X, ring, Xw, d, sNow, sWould, stress, stressMax, N, c,
      nodeCount: N, topologyMode: S.mode, perturbTorque: S.torque, apertureDeg: S.eps, push: S.push, drive: d,
      completeEdges, activeEdges, maxwell3DEdges, maxwellExcess, completeExcessFormula: (N - 3) * (N - 4) / 2,
      triangulatedFaces: 2 * N - 4, eulerCheck: fc.euler, faceStats: fc,
      detG3, detG3Formula: 1 + 2 * c ** 3 - 3 * c ** 2, gram3: G3,
      sphericalExcessRad: angSum - PI, sphericalExcessFormula: 3 * Math.acos(c / (1 + c)) - PI, flatAngleSumRad: flatSum, spokeAngleRad: Lay.A,
      blochNorm: Math.round((1 + blochDev) * 1e12) / 1e12, blochMaxDev: blochDev, pureTraceDev: trace, pureIdemDev: idem,
      fsAngles: fs, fsTriangleSlack: fs[0] + fs[1] - fs[2], blochTriangleSlack: arcOf(T[0], T[1]) + arcOf(T[1], T[2]) - arcOf(T[0], T[2]),
      floppyModes, sphereFloppyModes, isFloppy: floppyModes > 0,
      shearAngleDeg: missing ? shearAngleDeg : 0, shearAmplitude: missing ? shearAmplitude : 0, shearLimitRad: Lay.sMax,
      gramMaxDiff, sideCosMaxDev, c_side: c, c_diag1: diag[0], c_diag2: diag[1], c_diag1Rest: diagRest[0], c_diag2Rest: diagRest[1],
      rhombusProduct: N === 4 ? (1 + diag[0]) * (1 + diag[1]) : null, rhombusTarget: 4 * c * c,
      tetDihedralRad: TET, fiveTetHingeDeficitRad: FIVE_GAP, reggeCurvatureGlow: excessPos * FIVE_GAP, hubDeficitRad,
      tetraDefects: co.defects, faceErrors: co.faceErr, cochain: co,
      pins: Lay.pins.length, redundant: completeEdges - Lay.pins.length
    };
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; probe.style.position = 'absolute'; tagBox.appendChild(probe);
  const options = { canvas: $('cv'), yaw: VIEW0[0], pitch: VIEW0[1], wheel: false, radius: 0.36, cx: 0.5, cy: 0.5, onChange: () => paint() };
  const sc = kit.solid(stageEl, options);
  if (TRV.still) stageEl.classList.add('still');

  /* HUD boxes and the safe rect between the title, the toggle and the legend */
  function boxOf(el, sr) {
    if (!el || el.hidden || !el.getClientRects().length) return null;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return null;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return null;
    return { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
  }
  function hudBoxes() {
    const sr = stageEl.getBoundingClientRect(), out = [];
    for (const el of [$('hudTl'), $('stageMode'), $('legend')]) { const b = boxOf(el, sr); if (b && (el.id !== 'legend' || el.textContent.trim())) out.push(b); }
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
    if (!s) { probe.className = 'tag ' + cls; probe.innerHTML = html; probe.hidden = false; s = [probe.offsetWidth, probe.offsetHeight]; probe.hidden = true; if (s[0] > 0) sizes.set(k, s); }
    return s;
  }
  let LB = [], OBST = [], BOUNDS = null, PLACED = [];
  const want = (key, q, html, cls, o = {}) => LB.push({ key, q, html, cls, pri: o.pri || 0, dir: o.dir || [0, -1], r: o.r == null ? 9 : o.r });
  const meets = (a, b, m) => a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m;
  function placeLabels() {
    const placed = [];
    LB.sort((a, b) => b.pri - a.pri);
    for (const l of LB) {
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      const base = Math.atan2(l.dir[1], l.dir[0]), cands = [];
      for (const r of [l.r, l.r + 8, l.r + 18]) for (const da of [0, 0.5, -0.5, 1.0, -1.0, 1.6, -1.6, 2.3, -2.3, PI]) {
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
      placed.push(ok);
      sc.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
    }
    PLACED = placed;
  }

  /* ---------- the frame ---------- */
  let FRAME = null;
  const R_ARC = 1.006;
  function drawStage(M) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 14, y: 14, w: W - 28, h: H - 28 } : safeRect(W, H, huds);
    const unit = Math.max(30, Math.min(area.w, area.h) / 2 / 1.06);
    options.radius = unit / Math.max(1, Math.min(W, H)); options.cx = (area.x + area.w / 2) / Math.max(1, W); options.cy = (area.y + area.h / 2) / Math.max(1, H);
    OBST = huds.slice(); BOUNDS = { x: 4, y: 4, w: W - 8, h: H - 8 }; LB = [];
    const Lay = M.Lay, N = M.N, missing = S.mode === 'missing-diagonals', complete = !missing;
    // displayed positions: during a change of N or ε the nodes slide from where they were
    const shown = M.X.map((p, i) => {
      if (S.morph >= 1 || !S.from) return p;
      const a = i < S.from.length ? S.from[i] : (S.from[Lay.pins.find((q) => q[1] === i)?.[0] ?? 0] || p);
      return v3.slerp(a, p, S.morph);
    });
    sc.begin();
    // the comparison sphere: an opaque far side, a faint near side and a glass rim
    const facing = sc.facing();
    sc.surface('sphere', (u, v) => v3.sph(u, v), { u: [0, PI], v: [0, TAU], nu: 28, nv: 48, color: P.lineHot,
      alpha: (u, v) => (v3.dot(v3.sph(u, v), facing) < -0.06 ? 1 : 0.03), grid: { every: [4, 6], color: P.cyan, alpha: 0.12 }, pick: false });
    sc.glass('shell', O, 1.002, { color: P.sigma, alpha: 0.01, rim: 0.16 });
    // the Bloch vectors: thin violet radii (|r| = 1)
    for (const p of shown) sc.line([O, p], { color: P.violet, width: N === 3 ? 1.6 : 1.1, alpha: N === 3 ? 0.85 : TRV.thumbMode ? 0.55 : 0.45 });
    // the arc-bodies ΔT_ε (complete): violet caps on the sphere
    if (complete && S.flexOn < 0.999) {
      Lay.tris.forEach((t, k) => {
        const [a, b, c] = t.map((i) => shown[i]);
        sc.surface(`cap-${k}`, (u, v) => v3.scale(v3.unit(v3.add(v3.add(v3.scale(a, 1 - u), v3.scale(b, u * (1 - v))), v3.scale(c, u * v))), 1.003),
          { u: [0, 1], v: [0, 1], nu: 10, nv: 10, color: P.violet, alpha: (N === 3 ? 0.42 : 0.55) * (1 - S.flexOn), grid: { every: [5, 5], color: P.ink, alpha: 0.18 }, pick: false });
      });
    }
    // N = 3: the flat chord triangle inside the cap (no excess) and the cone from O (the trihedron)
    if (N === 3) sc.fan([shown[0], shown[1], shown[2]], { fill: P.cyan, alpha: 0.22, color: P.cyan, width: 1.6, dash: [5, 4] });
    // comparisons
    const fresh = S.fresh && complete, newest = N - 1, lw = TRV.thumbMode ? 1.3 : 1;
    if (complete) {
      for (const [i, j] of Lay.pairs) {
        const pin = Lay.pinKeys.has(`${i}-${j}`), isNew = fresh && j === newest;
        const color = isNew ? P.amber : pin ? P.cyan : P.magenta;
        const pts = lift(arcPts(shown[i], shown[j], 36), R_ARC + (pin ? 0 : 0.004));
        sc.line(pts, { color, width: (isNew ? 2.8 : pin ? 2.2 : 1.7) * lw, alpha: pin || isNew ? 1 : 0.92, dash: isNew && !pin ? [6, 4] : undefined });
        if (!pin && !isNew) sc.line(pts, { color: P.magenta, width: 5 * lw, alpha: 0.12 + 0.18 * Math.min(1, M.reggeCurvatureGlow / 1.3) });
      }
      // the spawn: amber pulses run from the newest node to each older node
      if (fresh && S.flash < 1) for (let i = 0; i < newest; i++) sc.bead(v3.scale(v3.slerp(shown[newest], shown[i], S.flash), R_ARC), { key: `pulse-${i}`, color: P.amber, r: 4.2, alpha: Math.sin(PI * S.flash) });
      // stress under the push: amber double arrows on the struts the floppy mode would stretch (out) or squeeze (in)
      if (N >= 4 && M.stressMax > 1e-6 && !TRV.thumbMode) {
        for (const st of M.stress) {
          const k = Math.abs(st.e) / M.stressMax; if (k < 0.08) continue;
          const a = shown[st.i], b = shown[st.j], m = v3.scale(v3.slerp(a, b, 0.5), R_ARC + 0.01), t = tangent(v3.unit(m), b), L = 0.06 + 0.11 * k;
          const p1 = v3.add(m, v3.scale(t, L)), p2 = v3.sub(m, v3.scale(t, L));
          if (st.e > 0) { sc.arrow(m, p1, { color: P.amber, width: 2.2 * lw, headSize: 7, alpha: 0.35 + 0.65 * k }); sc.arrow(m, p2, { color: P.amber, width: 2.2 * lw, headSize: 7, alpha: 0.35 + 0.65 * k }); }
          else { sc.arrow(p1, m, { color: P.amber, width: 2.2 * lw, headSize: 7, alpha: 0.35 + 0.65 * k }); sc.arrow(p2, m, { color: P.amber, width: 2.2 * lw, headSize: 7, alpha: 0.35 + 0.65 * k }); }
        }
      }
      // the angle the fan leaves round the hub (N ≥ 5): a magenta wedge
      if (M.hubDeficitRad != null) {
        const hub = shown[0], last = shown[Math.min(N, 7) - 1], t0 = tangent(hub, last), gap = M.hubDeficitRad, r = 0.32 * Lay.e;
        const sgnG = Math.sign(v3.dot(hub, v3.cross(t0, tangent(hub, shown[1])))) || 1;
        const pts = [v3.scale(hub, 1.004)];
        for (let k = 0; k <= 16; k++) { const dir = v3.rot(t0, hub, sgnG * Math.abs(gap) * k / 16 * (gap >= 0 ? 1 : -1)); pts.push(v3.scale(v3.add(v3.scale(hub, Math.cos(r)), v3.scale(dir, Math.sin(r))), 1.004)); }
        sc.fan(pts, { fill: P.magenta, alpha: 0.55, color: P.magenta, width: 1.4 });
        if (!TRV.thumbMode) { const q = sc.p(pts[9]), qh = sc.p(hub); want('gap', q, `δ = ${sgn(gap / DEG, 2)}°`, 'raw c-mg backed', { pri: 7, dir: [q[0] - qh[0] || 1, q[1] - qh[1]], r: 10 }); }
      }
    } else {
      // the ring: cyan side arcs; the cut diagonals as dim dashed arcs
      const cyc = Lay.cyc;
      for (let i = 0; i < N; i++) sc.line(lift(arcPts(shown[cyc[i]], shown[cyc[(i + 1) % N]], 36), R_ARC), { color: P.cyan, width: 2.8 * lw });
      for (const [i, j] of Lay.pairs) if (!Lay.sideKeys.has(`${i}-${j}`)) sc.line(lift(arcPts(shown[i], shown[j], 36), R_ARC), { color: P.dim, width: 1.5, alpha: 0.95, dash: [5, 4] });
      // the rest shape as a ghost, once the ring has moved
      if (M.shearAmplitude > 0.5 * DEG) {
        for (const [i, j] of Lay.pairs) if (N <= 5 || Lay.sideKeys.has(`${i}-${j}`)) sc.line(lift(arcPts(Lay.X[i], Lay.X[j], 30), R_ARC - 0.002), { color: P.sigma, width: 1.2, alpha: 0.5, dash: [2, 4] });
        for (const p of Lay.X) sc.bead(v3.scale(p, R_ARC), { color: P.sigma, r: 2.6, alpha: 0.55 });
      }
      // the turned angle at ring node 2
      if (N >= 4 && Math.abs(M.shearAngleDeg) > 0.3) {
        const p = M.ring[1], t0 = tangent(p, Lay.Xc[2]), tN = tangent(p, M.ring[2]), ang = Math.atan2(v3.dot(p, v3.cross(t0, tN)), v3.dot(t0, tN)), r = 0.3 * Lay.e;
        const pts = [v3.scale(p, 1.004)]; for (let k = 0; k <= 12; k++) { const dir = v3.rot(t0, p, ang * k / 12); pts.push(v3.scale(v3.add(v3.scale(p, Math.cos(r)), v3.scale(dir, Math.sin(r))), 1.004)); }
        sc.fan(pts, { fill: P.amber, alpha: 0.4, color: P.amber, width: 1.2 });
      }
    }
    // nodes
    shown.forEach((p, i) => sc.bead(v3.scale(p, R_ARC), { key: `node-${i}`, color: fresh && i === newest ? P.amber : P.sigma, r: (i === 0 ? 5.6 : 5) * (TRV.thumbMode ? 1.15 : 1) }));
    sc.end();

    // the handle: the ring node at position 2 (C₃ for N ≤ 7)
    const handleOn = N >= 4 && !TRV.thumbMode;
    let hq = null;
    if (handleOn) {
      hq = sc.p(v3.scale(shown[Lay.cyc[2]], R_ARC));
      OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    }
    placeHandle(hq);
    // labels
    if (!TRV.thumbMode) {
      const cen = sc.p(v3.unit(shown.reduce(v3.add, [0, 0, 0])));
      shown.forEach((p, i) => {
        const q = sc.p(v3.scale(p, R_ARC)); OBST.push({ x: q[0] - 6, y: q[1] - 6, w: 12, h: 12 });
        want(`n${i}`, q, C(i + 1), `raw ${fresh && i === newest ? 'c-am' : 'ink'} backed`, { pri: 10 - i * 0.1, dir: [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1], r: 9 });
      });
      if (N === 3) {
        const q = sc.p(v3.unit(shown.reduce(v3.add, [0, 0, 0])));
        want('omega', q, `Ω = ${fix(M.sphericalExcessRad / DEG, 2)}°`, 'raw c-mg backed', { pri: 6, dir: [0, -1], r: 0 });
      }
      if (missing && N >= 4 && Math.abs(M.shearAngleDeg) > 0.3) {
        const q = sc.p(v3.scale(M.ring[1], R_ARC));
        want('shear', q, `Δθ = ${sgn(M.shearAngleDeg, 1)}°`, 'raw c-am backed', { pri: 7, dir: [q[0] - cen[0] || 1, q[1] - cen[1]], r: 14 });
      }
      placeLabels();
    }
    FRAME = { W, H, area, unit, shown, handle: hq };
  }

  /* ---------- the handle: a button on the stage, dragged along the floppy path ---------- */
  const handle = $('shearHandle');
  let dragging = null;
  function placeHandle(q) {
    const show = !!q && !TRV.still;
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
    handle.setAttribute('aria-label', S.mode === 'complete' ? L('推一下：对角撑杆受力', 'Push: the diagonal struts take the load') : L('拖动：四边形剪切', 'Drag: the ring shears'));
  }
  /** The drive d ∈ [−1, 1] whose handle position is nearest to the pointer. */
  function driveAt(ev) {
    const Lay = layout(S.eps, S.N), b = stageEl.getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top;
    let best = 0, bd = Infinity;
    for (let k = -40; k <= 40; k++) {
      const dd = k / 40, ring = flexRing(Lay.Xc, dd * Lay.sMax); if (!ring) continue;
      const q = sc.p(v3.scale(ring[2], R_ARC)), dist = Math.hypot(q[0] - x, q[1] - y);
      if (dist < bd) { bd = dist; best = dd; }
    }
    return best;
  }
  const endDrag = (ev) => { if (!dragging || (ev && ev.pointerId != null && ev.pointerId !== dragging.pointer)) return; dragging = null; handle.classList.remove('dragging'); paint(); };
  handle.addEventListener('pointerdown', (ev) => {
    if (ev.button > 0 || TRV.still) return;
    ev.preventDefault(); ev.stopPropagation();
    cards.mark(null); clock.pause();
    dragging = { pointer: ev.pointerId }; handle.classList.add('dragging');
    try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events carry no capture */ }
  });
  handle.addEventListener('pointermove', (ev) => {
    if (!dragging || ev.pointerId !== dragging.pointer) return;
    const d = driveAt(ev);
    S.push = clamp(d - S.torque * Math.cos(TAU * S.t), -2, 2); S.fresh = false; paint();
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight') return;
    ev.preventDefault(); ev.stopPropagation(); cards.mark(null); clock.pause();
    S.push = clamp(S.push + (ev.key === 'ArrowRight' ? 0.1 : -0.1), -2, 2); paint();
  });

  /* ---------- HUD, legend, readouts ---------- */
  function hudText(M) {
    const missing = S.mode === 'missing-diagonals', N = M.N;
    const big = missing
      ? `C${sub(N)} · E = ${M.activeEdges} ${M.activeEdges < M.maxwell3DEdges ? '&lt;' : '='} 3N − 6 = ${M.maxwell3DEdges}`
      : `K${sub(N)} · E = ${M.completeEdges} · 3N − 6 = ${M.maxwell3DEdges}`;
    let subl;
    if (missing) subl = N === 3 ? L('三条边就是 K₃：没有对角可砍', 'Three sides are K₃: no diagonal to cut')
      : `${L('砍掉对角', 'diagonals cut')} · ΔE = ${sgn(M.maxwellExcess, 0)} · ${L('软模', 'floppy')} ${M.floppyModes} · ${L('边', 'sides')} ${fix(S.eps, 0)}° · Δθ = ${sgn(M.shearAngleDeg, 1)}°`;
    else if (N === 3) subl = `det G₃ = ${fix(M.detG3, 4)} &gt; 0 · Ω = ${fix(M.sphericalExcessRad, 4)} · ${L('平直', 'flat')} α+β+γ = 180°`;
    else if (N <= 4) subl = `ΔE = 0 · ${L('格拉姆表锁死', 'Gram table locked')} · max|ΔG| = ${fix(M.gramMaxDiff, 0)}`;
    else if (M.hubDeficitRad == null) subl = `ΔE = +${M.maxwellExcess} · ${L(`${M.redundant} 条冗余比较须彼此相容`, `${M.redundant} redundant comparison${M.redundant === 1 ? '' : 's'} must agree`)} · max|ΔG| = 0`;
    else subl = `ΔE = +${M.maxwellExcess} · ${L('五块 ΔT 绕 C₁ 留下', 'five ΔT round C₁ leave')} δ = ${sgn(M.hubDeficitRad / DEG, 2)}°`;
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = subl;
    const LEG = missing
      ? [['cy', L('一圈比较弧（边长 ε 不变）', 'ring of comparisons (sides stay ε)')], ['dash', L('砍掉的对角', 'cut diagonals')], ['am', L('推的手柄与转过的角', 'push handle and turned angle')]]
      : [['cy', L('定位比较（每个新概念 3 条）', 'pinning comparisons (3 per new concept)')], ['mg', L('冗余比较 · 角亏', 'redundant comparisons · deficit')], ['vi', L('弧面体 ΔT<sub>ε</sub>', 'arc-bodies ΔT<sub>ε</sub>')], ['am', S.fresh ? L('新概念的比较 · 撑杆受力', 'new comparisons · strut load') : L('撑杆受力', 'strut load')]];
    $('legend').innerHTML = LEG.map(([k, s]) => `<span><i class="sw ${k === 'dash' ? 'dash' : k}"></i>${s}</span>`).join('');
  }
  function row(k, dt, dd) { $('dt' + k).innerHTML = dt; $('ro' + k).innerHTML = dd; }
  function drawText(M) {
    const missing = S.mode === 'missing-diagonals', N = M.N;
    $('dtKey').innerHTML = L('比较数减刚性所需 ΔE = E − (3N − 6)', 'comparisons minus what rigidity needs, ΔE = E − (3N − 6)');
    $('roKey').textContent = sgn(M.maxwellExcess, 0);
    $('roKeySub').textContent = missing ? ` · E = ${M.activeEdges}` : ` · (N − 3)(N − 4)/2 = ${M.completeExcessFormula}`;
    row(1, L('比较弧 E / 全员 C(N, 2) / 刚性 3N − 6', 'arcs E / all pairs C(N, 2) / rigid 3N − 6'), `${M.activeEdges} / ${M.completeEdges} / ${M.maxwell3DEdges}`);
    row(2, L('软模（三维计数 · 球面上）', 'floppy modes (3D count · on the sphere)'), `${M.floppyModes} · ${M.sphereFloppyModes}`);
    row(3, missing ? L('对角余弦 c₁₃ · c₂₄（边 cos ε 不变）', 'diagonal cosines c₁₃ · c₂₄ (sides keep cos ε)') : L('格拉姆表最大变化 max|ΔG|', 'largest Gram change max|ΔG|'),
      missing ? (N >= 4 ? `${fix(M.c_diag1, 4)} · ${fix(M.c_diag2, 4)}` : '—') : (M.gramMaxDiff < 1e-15 ? '0' : M.gramMaxDiff.toExponential(1)));
    row(4, L('ΔT<sub>ε</sub>：det G₃ · 角超 Ω', 'ΔT<sub>ε</sub>: det G₃ · excess Ω'), `${fix(M.detG3, 4)} · ${fix(M.sphericalExcessRad / DEG, 2)}°`);
    row(5, L('C₁ 周围留下的角 δ · 雷杰辉光', 'angle left round C₁, δ · Regge glow'), `${M.hubDeficitRad == null ? '—' : `${sgn(M.hubDeficitRad / DEG, 2)}°`} · ${fix(M.reggeCurvatureGlow / DEG, 2)}°`);
    row(6, L('立体角上链的四面体缺陷 · 欧拉 V − E + F', 'tetrahedral defects of the solid-angle cochain · Euler V − E + F'), `${M.tetraDefects} · ${M.faceStats.V} − ${M.faceStats.E} + ${M.faceStats.F} = ${M.eulerCheck}`);
    $('roNote').textContent = missing
      ? L(`只剩 ${N} 条边：每条都是 ${fix(S.eps, 0)}°，偏差 ${M.sideCosMaxDev.toExponential(1)}；对角随推力变，格拉姆表最大变化 ${fix(M.gramMaxDiff, 4)}。`, `Only ${N} sides remain, each ${fix(S.eps, 0)}° (drift ${M.sideCosMaxDev.toExponential(1)}); the diagonals follow the push and the Gram table changes by up to ${fix(M.gramMaxDiff, 4)}.`)
      : L(`全部 ${M.completeEdges} 条比较：${M.pins} 条定位、${M.redundant} 条冗余。表不变，形状不变；推力只落成撑杆上的应力。`, `All ${M.completeEdges} comparisons: ${M.pins} pin, ${M.redundant} are redundant. The table is fixed, so the shape is fixed; the push only becomes stress on the struts.`);
    $('pillE').querySelector('strong').textContent = `${M.activeEdges} / ${M.maxwell3DEdges}`;
    $('pillDelta').querySelector('strong').textContent = sgn(M.maxwellExcess, 0);
  }

  /* ---------- strip plot ---------- */
  const PLOTS = {
    counts: ['全员比较数与三维刚性所需', 'All-pairs comparisons against what 3D rigidity needs'],
    gram: ['三个概念：格拉姆行列式与角超', 'Three concepts: Gram determinant and excess'],
    loop: ['两条对角的余弦：剪切路径与锁定点', 'The two diagonal cosines: shear path and locked point'],
    maxwell: ['ΔE(N) = (N − 3)(N − 4)/2 的两个零点', 'The two zeros of ΔE(N) = (N − 3)(N − 4)/2'],
    regge: ['冗余比较与棱上的曲率', 'Redundant comparisons and hinge curvature']
  };
  function drawPlot(M) {
    const cv = $('plot');
    if (!cv.clientWidth || !cv.clientHeight || TRV.thumbMode) return;
    const kind = S.plot, N = M.N, pad = [40, 12, 10, 22];
    $('plotTitle').textContent = L(...PLOTS[kind]);
    let meta = '';
    if (kind === 'counts') {
      const g = kit.plot(cv, { x: [2.7, 8.3], y: [0, 30], pad });
      g.axes({ xTicks: [3, 4, 5, 6, 7, 8], yTicks: [0, 10, 20, 28], xLabel: 'N' });
      const xs = [3, 4, 5, 6, 7, 8];
      g.area(xs.map((n) => [n, n * (n - 1) / 2]), P.magenta, { alpha: 0.16, base: 0 });
      g.area(xs.map((n) => [n, 3 * n - 6]), P.violet, { alpha: 0.5, base: 0 });
      g.line(xs.map((n) => [n, n * (n - 1) / 2]), P.cyan, { width: 2.2 });
      g.line(xs.map((n) => [n, 3 * n - 6]), P.violet, { width: 2.2 });
      g.line(xs.map((n) => [n, n]), P.dim, { width: 1.2, dash: [4, 3] });
      for (const n of xs) { g.dot(n, n * (n - 1) / 2, P.cyan, 3); g.dot(n, 3 * n - 6, P.violet, 3); }
      g.vline(N, P.amber, { alpha: 0.85 }); g.dot(N, M.activeEdges, P.amber, 4.5);
      g.text(7.35, 24.5, 'E(K_{N}) = N(N − 1)/2', P.cyan, { align: 'right', size: 10.5 });
      g.text(7.55, 12.2, '3N − 6', P.violet, { align: 'left', size: 10.5 });
      g.text(6.5, 4.4, 'E(C_{N}) = N', P.dim, { align: 'left', size: 10 });
      meta = `E = ${M.activeEdges} · 3N − 6 = ${M.maxwell3DEdges} · ΔE = ${sgn(M.maxwellExcess, 0)}`;
    } else if (kind === 'gram') {
      const g = kit.plot(cv, { x: [0, 90], y: [0, 1.65], pad });
      g.axes({ xTicks: [0, 30, 60, 90].map((d) => [d, `${d}°`]), yTicks: [0, 0.5, 1, 1.5], xLabel: 'ε' });
      const xs = Array.from({ length: 91 }, (_, i) => i);
      const det = (d) => { const c = Math.cos(d * DEG); return 1 + 2 * c ** 3 - 3 * c ** 2; };
      const om = (d) => { const c = Math.cos(d * DEG); return 3 * Math.acos(c / (1 + c)) - PI; };
      g.hline(0, P.cyan, { dash: [5, 4], width: 1.6 });
      g.line(xs.map((d) => [d, det(d)]), P.violet, { width: 2.2 });
      g.line(xs.map((d) => [d, om(d)]), P.magenta, { width: 2.2 });
      g.vline(S.eps, P.amber, { alpha: 0.85 }); g.dot(S.eps, det(S.eps), P.amber, 4); g.dot(S.eps, om(S.eps), P.amber, 4);
      g.text(88, 1.08, 'det G_{3}', P.violet, { align: 'right' }); g.text(88, 1.47, 'Ω(ε)', P.magenta, { align: 'right' });
      g.text(88, 0.1, L('平直 Ω = 0', 'flat Ω = 0'), P.cyan, { align: 'right', size: 10 });
      meta = `ε = ${fix(S.eps, 0)}° · det G₃ = ${fix(M.detG3, 4)} · Ω = ${fix(M.sphericalExcessRad, 4)}`;
    } else if (kind === 'loop') {
      const c = M.c, lo = Math.cos(Math.min(PI, 2 * S.eps * DEG)) - 0.08, hi = 1.05;
      const g = kit.plot(cv, { x: [lo, hi], y: [lo, hi], pad });
      g.axes({ xTicks: [-0.5, 0, 0.5, 1].filter((v) => v > lo), yTicks: [-0.5, 0, 0.5, 1].filter((v) => v > lo), xLabel: 'c₁₃', yLabel: 'c₂₄' });
      if (N === 4) {
        const xs = Array.from({ length: 121 }, (_, i) => Math.cos(2 * S.eps * DEG) + (1 - Math.cos(2 * S.eps * DEG)) * i / 120);
        g.line(xs.map((x) => [x, 4 * c * c / (1 + x) - 1]), P.cyan, { width: 1.2, alpha: 0.5, dash: [4, 3] });
      }
      // the reachable path of the actual ring (sampled) and the locked point
      const Lay = M.Lay, path = [];
      for (let k = -30; k <= 30; k++) { const r = flexRing(Lay.Xc, k / 30 * Lay.sMax); if (r && N >= 4) path.push([v3.dot(r[0], r[2]), v3.dot(r[1], r[3])]); }
      if (path.length) g.line(path, P.cyan, { width: 2.6 });
      if (N >= 4) {
        g.dot(M.c_diag1Rest, M.c_diag2Rest, P.violet, 6.5, { ring: true, width: 2 });
        g.text(M.c_diag1Rest, M.c_diag2Rest, L('K₄ 锁定', 'K₄ locked'), P.violet, { dx: 9, dy: -9, size: 10 });
        g.dot(M.c_diag1, M.c_diag2, P.amber, 4.5);
      }
      meta = N >= 4 ? `(c₁₃, c₂₄) = (${fix(M.c_diag1, 3)}, ${fix(M.c_diag2, 3)})${N === 4 ? ` · (1 + c₁₃)(1 + c₂₄) = ${fix(M.rhombusProduct, 6)} = 4cos²ε` : ''}` : L('N = 3 没有对角', 'N = 3 has no diagonal');
    } else if (kind === 'maxwell') {
      const g = kit.plot(cv, { x: [1.8, 8.3], y: [-11, 11.5], pad });
      g.axes({ xTicks: [2, 3, 4, 5, 6, 7, 8], yTicks: [-10, -5, 0, 5, 10], xLabel: 'N' });
      g.hline(0, P.dim, { width: 1.2 });
      const xs = Array.from({ length: 131 }, (_, i) => 2 + 6 * i / 130);
      g.line(xs.map((n) => [n, (n - 3) * (n - 4) / 2]), P.magenta, { width: 2 });
      g.line([[3, 0], [8, -10]], P.cyan, { width: 1.4, dash: [4, 3] });
      for (const n of [5, 6, 7, 8]) g.dot(n, (n - 3) * (n - 4) / 2, P.magenta, 3.6);
      for (const n of [3, 4]) g.dot(n, 0, P.violet, 6, { ring: true, width: 2 });
      g.dot(4, -2, P.cyan, 4);
      g.text(4.15, -2.6, 'C_{4}: −2', P.cyan, { size: 10, base: 'top' });
      g.text(3.5, 1.6, L('N = 3、4：恰好刚性', 'N = 3, 4: just rigid'), P.violet, { align: 'center', size: 10 });
      g.dot(N, M.maxwellExcess, P.amber, 4.5); g.vline(N, P.amber, { alpha: 0.6 });
      meta = `ΔE(${N}) = ${sgn(M.maxwellExcess, 0)}${S.mode === 'complete' ? '' : ` · C${sub(N)}: 6 − 2N`}`;
    } else {
      const g = kit.plot(cv, { x: [2.5, 8.5], y: [0, 82], pad });
      g.axes({ xTicks: [3, 4, 5, 6, 7, 8], yTicks: [0, 20, 40, 60, 80].map((v) => [v, `${v}°`]), xLabel: 'N' });
      for (const n of [3, 4, 5, 6, 7, 8]) {
        const ex = (n - 3) * (n - 4) / 2, h = ex * FIVE_GAP / DEG;
        g.rect(n - 0.32, 0, n + 0.32, Math.max(h, 0.6), n === N ? P.amber : P.magenta, { alpha: n === N ? 0.45 : 0.32, stroke: n === N ? P.amber : P.magenta, width: 1.2 });
        g.text(n, Math.max(h, 0.6) + 4, ex ? `+${ex}` : '0', n === N ? P.amber : P.magenta, { align: 'center', size: 10 });
      }
      meta = `ΔE = ${sgn(Math.max(0, M.maxwellExcess), 0)} · Σδ = ${fix(M.reggeCurvatureGlow / DEG, 2)}° · MODEL`;
    }
    $('plotMeta').textContent = meta;
  }

  const paint = kit.painter(() => {
    const M = model();
    hudText(M); TRV.hudFit();
    drawStage(M); drawPlot(M); drawText(M);
    spawnBtn.hidden = S.N >= NMAX;
    LAST = M;
  }, [stageEl, $('plot')]);
  let LAST = null;

  /* ---------- the rail: the phase of the push ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, t: 1, rate: 0.25, step: 0.05, loop: true,
    format: (t) => `t = ${fix(t, 2)} <small>/ 1</small>`,
    onChange: (t) => { S.t = t; paint(); }
  });

  /* ---------- controls ---------- */
  const spawnBtn = $('spawnBtn');
  const fTorque = kit.field($('perturbTorque'), { fmt: (v) => fix(v, 2), onInput: (v) => { cards.mark(null); S.torque = v; paint(); } });
  const fEps = kit.field($('apertureDeg'), { fmt: (v) => `${fix(v, 0)}°`, onInput: (v) => { cards.mark(null); S.eps = v; S.from = null; S.morph = 1; paint(); } });
  let morphTween = null, flexTween = null, flashTween = null;
  /** Slide the nodes from where they are to the layout of the new (ε, N). */
  function morphFrom(prev) {
    if (morphTween) morphTween.cancel();
    if (!prev || TRV.still) { S.from = null; S.morph = 1; return; }
    S.from = prev; S.morph = 0;
    morphTween = kit.tween(520, (e) => { S.morph = e; paint(); }, () => { S.morph = 1; S.from = null; paint(); });
  }
  function setFlex(target, instant) {
    if (flexTween) flexTween.cancel();
    if (instant || TRV.still) { S.flexOn = target; return; }
    const from = S.flexOn;
    flexTween = kit.tween(480, (e) => { S.flexOn = from + (target - from) * e; paint(); }, () => { S.flexOn = target; paint(); });
  }
  function setMode(m, instant) {
    S.mode = m === 'missing-diagonals' ? 'missing-diagonals' : 'complete';
    modeChips.set(S.mode, true); stageChips.set(S.mode, true);
    S.fresh = false;
    setFlex(S.mode === 'missing-diagonals' ? 1 : 0, instant);
    paint();
  }
  function setN(n, fresh, instant) {
    n = clamp(Math.round(n), NMIN, NMAX);
    const prev = FRAME ? FRAME.shown.slice() : null;
    S.N = n; nChips.set(String(n), true);
    S.fresh = !!fresh;
    if (!instant) morphFrom(prev);
    if (fresh && !TRV.still && !instant) {
      if (flashTween) flashTween.cancel();
      S.flash = 0; flashTween = kit.tween(1400, (e) => { S.flash = e; paint(); }, () => { S.flash = 1; paint(); });
    } else S.flash = 1;
    paint();
  }
  const modeChips = kit.chips($('topologyMode'), 'mode', (v) => { cards.mark(null); setMode(v); });
  const stageChips = kit.chips($('stageMode'), 'stage-mode', (v) => { cards.mark(null); setMode(v); });
  const nChips = kit.chips($('nodeCount'), 'n', (v) => { cards.mark(null); clock.pause(); setN(+v, false); });
  spawnBtn.addEventListener('click', (ev) => {
    if (S.N >= NMAX) return;
    cards.mark(null); clock.pause();
    if (S.mode !== 'complete') setMode('complete');
    S.plot = S.plot === 'loop' ? 'counts' : S.plot;
    setN(S.N + 1, true);
    if (ev && ev.detail > 0) { if (!stageEl.hasAttribute('tabindex')) stageEl.setAttribute('tabindex', '-1'); stageEl.focus({ preventScroll: true }); }
  });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ d: () => { cards.mark(null); setMode(S.mode === 'complete' ? 'missing-diagonals' : 'complete'); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'complete-graph-triangulation': { N: 5, mode: 'complete', torque: 0.35, eps: 60, fresh: true, plot: 'counts', still: 1 },
    'downward-irreducibility-lock': { N: 3, mode: 'complete', torque: 0.30, eps: 60, plot: 'gram', still: 1, cam: [YAW0 + 0.66, PITCH0 + 0.1] },
    'floppy-c4-vs-rigid-k4': { N: 4, mode: 'missing-diagonals', torque: 0.65, eps: 60, plot: 'loop', play: true, still: 1 },
    'maxwell-laman-polynomial': { N: 4, mode: 'complete', torque: 0.50, eps: 60, plot: 'maxwell', still: 1 },
    'regge-curvature-glow': { N: 7, mode: 'complete', torque: 0.45, eps: 60, plot: 'regge', still: 1 }
  };
  const NOTES = {
    'complete-graph-triangulation': ['新概念 C₅ 向 C₁…C₄ 各发一条琥珀色比较弧，K₅ 共 10 条；扇形剖分成紫色的极小弧面体 ΔT_ε。3N − 6 = 9 条已够刚性，多出的 1 条是品红的冗余比较；推力只在撑杆上留下琥珀色的应力箭头。', 'The new concept C₅ fires one amber arc to each of C₁…C₄, giving K₅ its 10 arcs; the fan splits into violet minimal arc-bodies ΔT_ε. 3N − 6 = 9 arcs already make it rigid; the 1 extra is a magenta redundant comparison, and the push leaves only amber stress arrows on the struts.'],
    'downward-irreducibility-lock': ['三个概念两两相隔 60°：紫色的弯曲弧面体 det G₃ = 0.5000 > 0，角超 Ω = 31.59°；藏在里面的青色平直三角形内角和正好 180°，没有角超。三个概念压不回一个平面。', 'Three concepts 60° apart: the violet curved arc-body has det G₃ = 0.5000 > 0 and excess Ω = 31.59°; the cyan flat triangle inside has angles summing to exactly 180° and no excess. The three cannot be pressed back into a plane.'],
    'floppy-c4-vs-rigid-k4': ['只剩一圈四条 60° 的边（E = 4 < 6，ΔE = −2）：一推，菱形就剪切，四条边一条也不变长，两条虚线对角跟着变；淡色的是锁住时的 K₄。点“全员两两比较 K_N”焊回两条对角，形状立刻锁死。', 'Only a ring of four 60° sides is left (E = 4 < 6, ΔE = −2): at a push the rhombus shears, no side changes length, and the two dashed diagonals move; the faint outline is the locked K₄. Click “All-Pairs K_N” to weld the two diagonals back and the shape locks at once.'],
    'maxwell-laman-polynomial': ['四个概念全员比较：6 条弧正好等于 3N − 6 = 6，ΔE = 0。推力只在两条对角撑杆上留下琥珀色的应力；条带小图里 ΔE(N) 只在 N = 3、4 为零。', 'Four concepts, all pairs compared: 6 arcs, exactly 3N − 6 = 6, so ΔE = 0. The push only leaves amber stress on the two diagonal struts; in the strip plot ΔE(N) vanishes only at N = 3 and 4.'],
    'regge-curvature-glow': ['K₇：21 条比较，15 条青色的定位比较（每个新概念 3 条）已锁住形状，多出的 6 条品红冗余比较发光；五块 ΔT_60° 绕 C₁ 合不拢，留下 δ = 7.36° 的品红缝。', 'K₇: 21 comparisons; 15 cyan pinning ones (3 per new concept) already lock the shape and the 6 extra magenta ones glow; five ΔT_60° round C₁ do not close and leave a magenta gap δ = 7.36°.']
  };
  // A cited figure has a fixed frame: one short sentence per card there, without sub- or superscripts.
  const FIGURE_NOTES = {
    'complete-graph-triangulation': ['新概念 C₅ 向四个旧概念各发一条琥珀弧：K₅ 有 10 条比较，比刚性所需的 3N − 6 = 9 多 1 条。', 'The new concept C₅ fires one amber arc to each of four old ones: K₅ has 10 comparisons, one more than the 3N − 6 = 9 rigidity needs.'],
    'downward-irreducibility-lock': ['三个概念相隔 60°：紫色弧面体 det G₃ = 0.5 > 0、角超 Ω = 31.59°；青色平直三角形内角和 180°。', 'Three concepts 60° apart: the violet arc-body has det G₃ = 0.5 > 0 and excess Ω = 31.59°; the cyan flat triangle sums to 180°.'],
    'floppy-c4-vs-rigid-k4': ['只剩四条 60° 边的 C₄（ΔE = −2）一推就剪切，边长不变；淡色轮廓是两条对角焊住的 K₄。', 'The bare ring C₄ of four 60° sides (ΔE = −2) shears at a push with every side kept; the faint outline is K₄ with both diagonals welded.'],
    'maxwell-laman-polynomial': ['K₄ 的 6 条比较正好等于 3N − 6：ΔE = 0，推力只成为两条对角撑杆上的琥珀应力。', 'The 6 comparisons of K₄ equal 3N − 6 exactly: ΔE = 0, and the push becomes only amber stress on the two diagonal struts.'],
    'regge-curvature-glow': ['K₇ 的 21 条比较里 15 条定位、6 条品红冗余；五块 ΔT 绕 C₁ 留下 δ = 7.36° 的缝。', 'Of the 21 comparisons of K₇, 15 pin and 6 magenta ones are redundant; five ΔT round C₁ leave a gap δ = 7.36°.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause();
    const prev = FRAME ? FRAME.shown.slice() : null, prevN = S.N, prevEps = S.eps;
    S.torque = p.torque; fTorque.set(p.torque);
    S.eps = p.eps; fEps.set(p.eps);
    S.push = 0; S.plot = p.plot;
    S.N = p.N; nChips.set(String(p.N), true);
    S.fresh = !!p.fresh; S.flash = 1;
    S.mode = p.mode; modeChips.set(p.mode, true); stageChips.set(p.mode, true);
    setFlex(p.mode === 'missing-diagonals' ? 1 : 0, booting);
    const cam = p.cam || VIEW0;
    sc.view([cam[0], cam[1], 1], booting || TRV.still ? 0 : 600);
    if (!booting && (prevN !== p.N || prevEps !== p.eps)) morphFrom(prev);
    if (p.fresh && !booting && !TRV.still) { if (flashTween) flashTween.cancel(); S.flash = 0; flashTween = kit.tween(1400, (e) => { S.flash = e; paint(); }, () => { S.flash = 1; paint(); }); }
    if (p.play) {
      if (TRV.still || (booting && !TRV.embed)) clock.set(p.still);
      else if (booting) { clock.set(0); kit.autoplay(clock, stageEl); }
      else { clock.set(0); clock.play(); }
    } else clock.set(p.still);
    paint();
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：切换比较拓扑、改概念数、点“生成新概念”、拖动琥珀手柄或扰动力矩。随时可以再选一张卡。', 'Free play: switch the topology, change N, spawn a concept, drag the amber handle or the torque. Pick a card again at any time.'] });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  const strip = (M) => {
    const out = {};
    for (const [k, v] of Object.entries(M)) if (!['Lay', 'Xw', 'cochain', 'stress'].includes(k)) out[k] = v;
    return out;
  };
  window.RIGIDITY_DEBUG = Object.freeze({
    get state() {
      const M = model();
      return JSON.parse(JSON.stringify(Object.assign(strip(M), {
        preset: cards.current, t: clock.t, playing: clock.playing, plot: S.plot, fresh: S.fresh, flexOn: S.flexOn,
        positions: M.X, restPositions: M.Lay.X, cycle: M.Lay.cyc.map((i) => i + 1), pinPairs: M.Lay.pins.map(([a, b]) => [a + 1, b + 1]),
        arcBodies: M.Lay.tris.map((t) => t.map((i) => i + 1)), closureFaces: M.Lay.back.map((t) => t.map((i) => i + 1)),
        stressMax: M.stressMax, stress: M.stress.map((s) => ({ pair: [s.i + 1, s.j + 1], e: s.e })),
        faceErrorSum: M.cochain.sumFace, incidenceOk: M.cochain.incidence, anchorOk: M.cochain.anchorOk, edgeErrors: M.cochain.edgeErr, cochainExact: M.cochain.exact,
        camera: Object.assign({}, sc.cam), handle: FRAME && FRAME.handle ? { x: FRAME.handle[0], y: FRAME.handle[1] } : null, labels: PLACED,
        stageFrame: FRAME ? { W: FRAME.W, H: FRAME.H, area: FRAME.area, unit: sc.unit, cx: sc.cx, cy: sc.cy } : null,
        roles: { pin: 'cyan', ring: 'cyan', redundant: 'magenta', deficit: 'magenta', arcBody: 'violet', bloch: 'violet', fresh: 'amber', stress: 'amber', handle: 'amber', cut: 'dim' }
      })));
    },
    /** The rest layout and the flexed ring at a drive d ∈ [−1, 1], for independent checks. */
    ringAt: (d) => { const Lay = layout(S.eps, S.N), r = flexRing(Lay.Xc, clamp(d, -1, 1) * Lay.sMax); return r ? r.map((p) => p.slice()) : null; },
    setState: (o) => { cards.mark(null); clock.pause(); if (o.eps != null) { S.eps = clamp(o.eps, 25, 80); fEps.set(S.eps); } if (o.torque != null) { S.torque = clamp(o.torque, 0, 1); fTorque.set(S.torque); } if (o.push != null) S.push = o.push; if (o.t != null) clock.set(o.t); if (o.N != null) setN(o.N, false, true); if (o.mode) setMode(o.mode, true); paint(); },
    /** Viewport coordinates of the handle (for pointer tests). */
    handleBox: () => { const r = handle.getBoundingClientRect(); return handle.hidden ? null : { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
  });
  window.TRV_THUMB = () => { cards.pick('regge-curvature-glow'); clock.pause(); clock.set(1); paint.now(); };
  cards.pick(cards.initial('complete-graph-triangulation'));
  booting = false;
  paint();
})();
