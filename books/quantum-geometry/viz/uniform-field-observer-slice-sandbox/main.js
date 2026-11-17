/* UNIFORM//SLICE · 均匀场与观察者切面 · Uniform field and observer slice
   World (kit.solid): z up. The ontology is a cubic lattice of 5 × 5 × 5 = 125 nodes at spacing a = 0.5 (world units),
   centred on the origin. Every node is paired with a qubit of the observer register into the Bell pair
   (|00⟩ + |11⟩)/√2, so the whole is pure and every node has the marginal ½·1 (bell_pure_state_has_maximally_mixed_marginal).
   The record direction of the field lattice turns along z with period a, k_ont = (2π/a)ẑ; the observer lattice is the
   copy turned by θ about x, k_obs = R_x(θ)k_ont. The slice Σ is the bisector plane of the two frames:
     n = (0, −sin(θ/2), cos(θ/2)),  e₁ = x̂,  e₂ = (0, cos(θ/2), sin(θ/2)),  Δk = k_obs − k_ont = −(4π/a) sin(θ/2)·e₂,
   so Δk lies in Σ. A point x of Σ reads the Born pairing of two half-angle spinors,
     I(x) = |⟨χ(k_ont·x/2) | χ((k_obs·x − φ)/2)⟩|² = cos²(½(Δk·x − φ)),  L_M = 2π/|Δk| = a/(2 sin(θ/2)),
   and the aperture averages W consecutive cells along Δk (continuous_average_tendsto_haar with α = 2 sin(θ/2)).
   The ontology lens reads the unconditioned marginal instead: Tr(½·1·P) = ½ at every point of every slice. The
   orthogonal dark ring lies in the yz plane (axis x̂), perpendicular to Σ for every θ; in the record basis of the slice
   its state is |+⟩⟨+|, so pinching leaves contrast I_EM = 0 (pinching_hilbert_schmidt_pythagorean); its load enters the
   clock budget dτ/dt = √(1 − η_slice² − η_dark²) (MODEL). The rail τ ∈ [0, 1] drives the card's quantity: the turn
   θ, the sweep φ, the dark load η_dark or the aperture W. Every number is computed here; the instances of the cited
   Lean theorems are checked in instances(). Read-only probe: window.UNIFORM_SLICE_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180;

  /* ---------- the lattice, the slice, the ring ---------- */
  const A = 0.5;                                     // the lattice spacing a, in world units
  const NODES = [];
  for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) for (let k = 0; k < 5; k++) NODES.push([(i - 2) * A, (j - 2) * A, (k - 2) * A]);
  const R_NODE = 0.11, HALF = 1.3, RELIEF = 0.05, NORMAL_LEN = 1.45, R_RING = 1.72;
  const NU = 36, NV = 64;                            // the grid of the slice
  const THETA_MIN = 1, THETA_MAX = 60, THETA_REF = 36, THETA_MAGIC = 1.05;
  const ETA_SLICE = 0.3, ETA_MAX = 0.8, ETA_REF = 0.4, W_MAX = 20;
  const VIEW0 = [0.62, 0.56];

  /* ---------- vectors ---------- */
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const norm = (a) => Math.hypot(a[0], a[1], a[2]);
  const lerp = (a, b, t) => a * (1 - t) + b * t;
  const camAxes = (cam) => {
    const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw), cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  const range = (a, b, n) => Array.from({ length: n + 1 }, (_, j) => a + (b - a) * j / n);

  /** The two frames and the slice for a turn of θ degrees. */
  function frames(thetaDeg) {
    const t = thetaDeg * DEG, h = t / 2;
    const n = [0, -Math.sin(h), Math.cos(h)], e1 = [1, 0, 0], e2 = [0, Math.cos(h), Math.sin(h)];
    const kOnt = [0, 0, TAU / A], kObs = [0, -Math.sin(t) * TAU / A, Math.cos(t) * TAU / A];
    const dk = sub(kObs, kOnt), dkLen = norm(dk);
    return { theta: thetaDeg, t, n, e1, e2, kOnt, kObs, dk, dkLen, ehat: scale(dk, 1 / dkLen), LM: TAU / dkLen, alpha: dkLen * A / TAU };
  }
  const onSlice = (F, u, v) => add(scale(F.e1, u), scale(F.e2, v));
  const spinor = (h) => [Math.cos(h), Math.sin(h)];
  /** The Born pairing at the world point x: the field spinor, the observer spinor and |⟨χ_ont|χ_obs⟩|². */
  function pairing(F, x, phi) {
    const a = spinor(dot(F.kOnt, x) / 2), b = spinor((dot(F.kObs, x) - phi) / 2), ip = a[0] * b[0] + a[1] * b[1];
    return { a, b, w: ip * ip };
  }
  /** The aperture reading at x: the mean of the pairings of W consecutive cells along Δk. */
  function aperture(F, x, phi, W) {
    let s = 0;
    for (let i = 0; i < W; i++) s += pairing(F, add(x, scale(F.ehat, i * A)), phi).w;
    return s / W;
  }
  /** The mean of the unit phasors of the W cells, S/W = (1/W)Σ_{i<W} e^{iβi} with β = 2πα: its modulus is the Dirichlet
      factor |D_W| = |sin(Wπα)/(W sin πα)|, its argument the phase the aperture adds. Summed, never taken from the closed
      form, so an integer α (θ = 60°, every cell one full period on) keeps its sign: S/W = 1, not ±1 by a fallback. */
  function phasor(alpha, W) {
    let re = 0, im = 0;
    for (let i = 0; i < W; i++) { re += Math.cos(TAU * alpha * i); im += Math.sin(TAU * alpha * i); }
    return { amp: Math.hypot(re, im) / W, arg: Math.atan2(im, re) };
  }
  const dirichlet = (alpha, W) => phasor(alpha, W).amp;

  /* ---------- the ontology: Bell pairs and their marginals ---------- */
  const BELL = [Math.SQRT1_2, 0, 0, Math.SQRT1_2];  // (|00⟩ + |11⟩)/√2 in the basis |00⟩, |01⟩, |10⟩, |11⟩
  const outer4 = (v) => v.map((a) => v.map((b) => a * b));
  const trace = (M) => M.reduce((s, r, i) => s + r[i], 0);
  const matmul = (X, Y) => X.map((r) => Y[0].map((_, j) => r.reduce((s, x, k) => s + x * Y[k][j], 0)));
  const maxAbsDiff = (X, Y) => Math.max(...X.flatMap((r, i) => r.map((x, j) => Math.abs(x - Y[i][j]))));
  /** Trace out the second qubit (the observer register) of a 4 × 4 density. */
  const traceSecond = (R) => [[R[0][0] + R[1][1], R[0][2] + R[1][3]], [R[2][0] + R[3][1], R[2][2] + R[3][3]]];
  /** Trace out the first qubit (the node). */
  const traceFirst = (R) => [[R[0][0] + R[2][2], R[0][1] + R[2][3]], [R[1][0] + R[3][2], R[1][1] + R[3][3]]];
  const entropy2 = (M) => {   // von Neumann entropy of a real symmetric 2 × 2 density, from its eigenvalues
    const tr = M[0][0] + M[1][1], det = M[0][0] * M[1][1] - M[0][1] * M[1][0], disc = Math.sqrt(Math.max(0, tr * tr / 4 - det));
    return [tr / 2 + disc, tr / 2 - disc].reduce((s, l) => s - (l > 1e-15 ? l * Math.log(l) : 0), 0);
  };
  /** Every node's marginal: the partial trace of its pair, node by node. */
  function ontology() {
    const pair = outer4(BELL), marg = NODES.map(() => traceSecond(pair));
    let grad = 0;
    NODES.forEach((p, i) => NODES.forEach((q, j) => { if (j > i && Math.abs(norm(sub(p, q)) - A) < 1e-9) grad = Math.max(grad, maxAbsDiff(marg[i], marg[j])); }));
    const half = [[0.5, 0], [0, 0.5]];
    return { pair, marg, traces: marg.map(trace), grad, offHalf: Math.max(...marg.map((m) => maxAbsDiff(m, half))), nodeEntropy: entropy2(marg[0]),
      pairIdem: maxAbsDiff(matmul(pair, pair), pair), pairTrace: trace(pair), globalEntropy: 0, thermalEntropy: NODES.length * entropy2(half) };
  }
  const ONT = ontology();

  /* ---------- state ---------- */
  const S = { lens: 'sea', drive: 'tilt', theta: THETA_REF, phi: 0, W: 1, eta: ETA_REF, tau: 0, from: null, blend: 1 };
  const driveTheta = (t) => lerp(THETA_MAGIC, THETA_REF, t);
  const driveW = (t) => 1 + Math.round((W_MAX - 1) * t);
  function targets() {
    return {
      theta: S.drive === 'tilt' ? driveTheta(S.tau) : S.theta,
      phi: S.drive === 'sweep' ? 360 * S.tau : S.phi,
      eta: S.drive === 'load' ? ETA_MAX * S.tau : S.eta,
      W: S.drive === 'aperture' ? driveW(S.tau) : S.W
    };
  }
  /** The values the page shows: the targets of the drive, blended from the previous values during a transition. */
  function eff() {
    const t = targets();
    if (!S.from || S.blend >= 1) return t;
    const b = S.blend, f = S.from;
    return { theta: lerp(f.theta, t.theta, b), phi: lerp(f.phi, t.phi, b), eta: lerp(f.eta, t.eta, b), W: t.W };
  }

  /* ---------- the slice field, cached by its parameters ---------- */
  const fieldCache = new Map();
  function sliceField(F, phiRad, W) {
    const key = `${F.theta.toFixed(6)}|${phiRad.toFixed(6)}|${W}`;
    let g = fieldCache.get(key);
    if (g) return g;
    const vals = new Float64Array((NU + 1) * (NV + 1));
    let lo = 1, hi = 0;
    for (let j = 0; j <= NV; j++) for (let i = 0; i <= NU; i++) {
      const u = -HALF + 2 * HALF * i / NU, v = -HALF + 2 * HALF * j / NV, w = aperture(F, onSlice(F, u, v), phiRad, W);
      vals[j * (NU + 1) + i] = w; lo = Math.min(lo, w); hi = Math.max(hi, w);
    }
    g = { vals, lo, hi };
    fieldCache.set(key, g);
    if (fieldCache.size > 48) fieldCache.delete(fieldCache.keys().next().value);
    return g;
  }
  const cellIndex = (u, v) => Math.round((v + HALF) / (2 * HALF) * NV) * (NU + 1) + Math.round((u + HALF) / (2 * HALF) * NU);

  /** Everything the page shows, from the state. */
  function model() {
    const e = eff(), F = frames(e.theta), phi = e.phi * DEG, W = e.W;
    // the aperture reading from the complex phasor sum of its W cells: on the slice Δk·x = −|Δk|v, so
    // ⟨I⟩(v) = ½ + ½·Re(e^{i(−|Δk|v − φ)}·S/W) = ½ + ½·amp·cos(−|Δk|v + phase0), amp = |S|/W ≥ 0, phase0 = arg S − φ
    const S0 = phasor(F.alpha, W), amp = S0.amp, argS = S0.arg, phase0 = argS - phi;
    const center = pairing(F, [0, 0, 0], phi), field = sliceField(F, phi, W);
    const dtdt = Math.sqrt(Math.max(0, 1 - ETA_SLICE * ETA_SLICE - e.eta * e.eta));
    const M = { e, F, phi, W, D: amp, amp, argS, phase0, center, field, contrast: amp, eta: e.eta, dtdt, lens: S.lens, tau: S.tau,
      shift: F.LM * e.phi / 360, minorR: 0.06 + 0.16 * e.eta };
    M.levels = contourLevels(M);
    return M;
  }
  /** Where the contour lines go, as in-plane v along e₂: the peaks ⟨I⟩ = ½ + amp/2, the blind zones ½ − amp/2 and the
      half levels ½, from amp and phase0 alone. None when the aperture has averaged the slice flat. */
  function contourLevels(M) {
    const k = M.F.dkLen, peak = M.phase0, levels = [];
    if (M.amp < 1e-9) return levels;
    for (let n = -40; n <= 40; n++) {
      const vp = (peak - TAU * n) / k, vv = (peak - PI - TAU * n) / k;
      if (Math.abs(vp) <= HALF) levels.push(['peak', vp]);
      if (Math.abs(vv) <= HALF) levels.push(['void', vv]);
      for (const h of [-PI / 2, PI / 2]) { const vh = (peak + h - TAU * n) / k; if (Math.abs(vh) <= HALF) levels.push(['half', vh]); }
    }
    return levels;
  }

  /* ---------- the instances of the cited theorems ---------- */
  const PAULI = [[[[1, 0], [0, 0]], [[0, 0], [1, 0]]], [[[0, 0], [1, 0]], [[1, 0], [0, 0]]], [[[0, 0], [0, -1]], [[0, 1], [0, 0]]], [[[1, 0], [0, 0]], [[0, 0], [-1, 0]]]];
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const kron = (X, Y) => { const out = []; for (let i = 0; i < 4; i++) { out.push([]); for (let j = 0; j < 4; j++) out[i].push(cmul(X[i >> 1][j >> 1], Y[i & 1][j & 1])); } return out; };
  /** Tr(X†Y) of two complex 4 × 4 matrices. */
  const hs = (X, Y) => { let re = 0, im = 0; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { const x = X[i][j], y = Y[i][j]; re += x[0] * y[0] + x[1] * y[1]; im += x[0] * y[1] - x[1] * y[0]; } return [re, im]; };
  function blindSpot() {
    const sector = (i, j) => (i && !j ? 'A' : !i && j ? 'B' : i && j ? 'C' : null);
    const basis = [];
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) if (i || j) basis.push({ s: sector(i, j), M: kron(PAULI[i], PAULI[j]) });
    let cross = 0, selfMin = Infinity;
    basis.forEach((x, a) => basis.forEach((y, b) => { const v = hs(x.M, y.M); if (a === b) selfMin = Math.min(selfMin, v[0]); else cross = Math.max(cross, Math.hypot(v[0], v[1])); }));
    const dims = { A: basis.filter((x) => x.s === 'A').length, B: basis.filter((x) => x.s === 'B').length, C: basis.filter((x) => x.s === 'C').length };
    const bell = outer4(BELL), cl = [[0.5, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0.5]];
    const diff = bell.map((r, i) => r.map((x, j) => x - cl[i][j]));
    return { dims, total: basis.length, ratio: dims.C / basis.length, orthogonal: cross, selfNorm: selfMin,
      sameA: maxAbsDiff(traceSecond(bell), traceSecond(cl)), sameB: maxAbsDiff(traceFirst(bell), traceFirst(cl)),
      distance: Math.sqrt(diff.flat().reduce((s, x) => s + x * x, 0)), clIdem: maxAbsDiff(matmul(cl, cl), cl), clTrace: trace(cl) };
  }
  const BLIND = blindSpot();
  const instCache = new Map();
  function instances(M) {
    const key = `${M.F.theta}|${M.phi}|${M.W}|${M.lens}`;
    if (instCache.has(key)) return instCache.get(key);
    // 1. the Bell pair and its marginal at every node
    const bell = { normalized: BELL.reduce((s, x) => s + x * x, 0), trace: ONT.pairTrace, idempotent: ONT.pairIdem, rank: 1,
      offHalf: ONT.offHalf, traces: [Math.min(...ONT.traces), Math.max(...ONT.traces)], grad: ONT.grad,
      marginalPurity: trace(matmul(ONT.marg[0], ONT.marg[0])), nodeEntropy: ONT.nodeEntropy, globalEntropy: ONT.globalEntropy, thermalEntropy: ONT.thermalEntropy, nodes: NODES.length };
    // 2. the Weyl–Haar average along the aperture: f(s) = cos²(πs), α = 2 sin(θ/2), ρ = the phase at the slice centre
    const rho0 = -M.phi / TAU, f = (s) => Math.cos(PI * s) ** 2, avg = [];
    let s = 0;
    for (let i = 0; i < Math.max(W_MAX, M.W); i++) { s += f(rho0 + i * M.F.alpha); avg.push(s / (i + 1)); }
    const haar = { alpha: M.F.alpha, rho: rho0, averages: avg.slice(0, W_MAX), atW: avg[M.W - 1], gapAtW: Math.abs(avg[M.W - 1] - 0.5), haarMean: 0.5, dirichlet: M.D };
    // 3. the blind spot (fixed instance)
    // 4. the rank-one Born pairing at the slice centre
    const a = M.center.a, b = M.center.b, ap = [-a[1], a[0]];
    const P0 = [[a[0] * a[0], a[0] * a[1]], [a[1] * a[0], a[1] * a[1]]], P1 = [[ap[0] * ap[0], ap[0] * ap[1]], [ap[1] * ap[0], ap[1] * ap[1]]];
    const rho = [[b[0] * b[0], b[0] * b[1]], [b[1] * b[0], b[1] * b[1]]];
    const w0 = (a[0] * b[0] + a[1] * b[1]) ** 2, w1 = (ap[0] * b[0] + ap[1] * b[1]) ** 2;
    const unread = [P0, P1].map((Pk) => matmul(matmul(Pk, rho), Pk)).reduce((X, Y) => X.map((r, i) => r.map((x, j) => x + Y[i][j])));
    const conditional = [[P0, w0], [P1, w1]].map(([Pk, w]) => (w > 1e-15 ? matmul(matmul(Pk, rho), Pk).map((r) => r.map((x) => x / w)) : [[0, 0], [0, 0]]));
    const ensemble = conditional.map((C, k) => C.map((r) => r.map((x) => x * [w0, w1][k]))).reduce((X, Y) => X.map((r, i) => r.map((x, j) => x + Y[i][j])));
    const born = { w0, w1, trace0: trace(matmul(rho, P0)), trace1: trace(matmul(rho, P1)), sum: w0 + w1, unreadResidual: maxAbsDiff(unread, ensemble),
      complete: maxAbsDiff([[P0[0][0] + P1[0][0], P0[0][1] + P1[0][1]], [P0[1][0] + P1[1][0], P0[1][1] + P1[1][1]]], [[1, 0], [0, 1]]), orthogonal: Math.abs(trace(matmul(P0, P1))),
      closed: (1 + Math.cos(-M.phi)) / 2 };
    // 5. pinching the dark ring's state: Bloch vector at 90° to the record axis of the slice
    const bA = 90 * DEG, rd = [[(1 + Math.cos(bA)) / 2, Math.sin(bA) / 2], [Math.sin(bA) / 2, (1 - Math.cos(bA)) / 2]];
    const pin = [[rd[0][0], 0], [0, rd[1][1]]], rest = [[0, rd[0][1]], [rd[1][0], 0]];
    const sq = (X) => X.flat().reduce((t, x) => t + x * x, 0);
    const pinching = { angle: 90, total: sq(rd), kept: sq(pin), discarded: sq(rest), residual: Math.abs(sq(rd) - sq(pin) - sq(rest)),
      offDiagonal: rd[0][1] ** 2 + rd[1][0] ** 2, IEM: 2 * sq(pin) - 1 };
    // 6. two contexts, one text and one rule: the lens decides the three switches and the fixed reading
    const meaning = (lens) => [lens === 'slice', lens === 'slice', lens === 'slice'];
    const context = { textSame: true, ruleSame: true, baseline: meaning('sea'), alternate: meaning('slice'), now: meaning(M.lens),
      seaReading: 0.5 * (a[0] * a[0] + a[1] * a[1]), sliceReading: w0 };
    const out = { bell, haar, blind: BLIND, born, pinching, context };
    instCache.set(key, out);
    if (instCache.size > 60) instCache.delete(instCache.keys().next().value);
    return out;
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probeEl = document.createElement('div'); probeEl.hidden = true; probeEl.style.position = 'absolute'; tagBox.appendChild(probeEl);
  const options = { canvas: $('cv'), yaw: VIEW0[0], pitch: VIEW0[1], wheel: false, radius: 0.3, cx: 0.5, cy: 0.5, onChange: () => paint() };
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

  /* ---------- fit: yaw-invariant bounds of the scene, into the HUD-free rectangle ---------- */
  const OUTLINE = (() => {
    const pts = [];
    for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) pts.push([x * (1 + R_NODE), y * (1 + R_NODE), z * (1 + R_NODE)]);
    for (const th of [THETA_MIN, THETA_REF, THETA_MAX]) {
      const F = frames(th);
      for (const u of [-HALF, HALF]) for (const v of [-HALF, HALF]) pts.push(onSlice(F, u, v));
      pts.push(scale(F.n, NORMAL_LEN + 0.08));
    }
    for (const t of range(0, TAU, 24)) pts.push([0, (R_RING + 0.19) * Math.cos(t), (R_RING + 0.19) * Math.sin(t)]);
    return pts;
  })();
  function contentBox(pitch) {
    const cp = Math.cos(pitch), sp = Math.sin(pitch);
    let x1 = 0, y0 = Infinity, y1 = -Infinity;
    for (const p of OUTLINE) { const r = Math.hypot(p[0], p[1]); x1 = Math.max(x1, r); y0 = Math.min(y0, cp * p[2] - sp * r); y1 = Math.max(y1, cp * p[2] + sp * r); }
    return { x0: -x1, x1, y0, y1 };
  }
  function fitTo(box, area, W, H) {
    const pad = TRV.thumbMode ? 4 : 8, zoom = sc.cam.zoom || 1;
    const unitPx = Math.max(20, Math.min((area.w - 2 * pad) / (box.x1 - box.x0), (area.h - 2 * pad) / (box.y1 - box.y0)));
    options.radius = unitPx / (Math.max(1, Math.min(W, H)) * zoom);
    options.cx = (area.x + area.w / 2 - unitPx * (box.x0 + box.x1) / 2) / Math.max(1, W);
    options.cy = (area.y + area.h / 2 + unitPx * (box.y0 + box.y1) / 2) / Math.max(1, H);
  }

  let FRAME = null, FIT = null, TAGS = [], AX = null, dragging = null;
  const at = (p, html, cls, pri, dir) => { if (!TRV.thumbMode) TAGS.push({ p, html, cls, pri, dir }); };
  const tipOf = (thetaDeg) => scale(frames(thetaDeg).n, NORMAL_LEN);
  const nodeSphere = (c) => (u, v) => { const th = PI * v, ph = TAU * u, s = Math.sin(th); return [c[0] + R_NODE * s * Math.cos(ph), c[1] + R_NODE * s * Math.sin(ph), c[2] + R_NODE * Math.cos(th)]; };
  const fa = (x) => fix(x, 4);

  /** The 125 nodes, all with the same marginal ½·1: one colour, no pattern. */
  function drawNodes() {
    NODES.forEach((c, k) => sc.surface(`node-${k}`, nodeSphere(c), { u: [0, 1], v: [0, 1], nu: 14, nv: 9, color: P.sigma, pick: false }));
  }
  /** The slice: the moiré reading (slice lens) or the flat ½ (ontology lens), with relief, contours and its outline. */
  function drawSlice(M) {
    const F = M.F, g = M.field, slice = M.lens === 'slice', facing = Math.sign(dot(F.n, AX.D)) || 1;
    const val = (u, v) => (slice ? g.vals[cellIndex(u, v)] : 0.5);
    sc.surface('slice', (u, v) => add(onSlice(F, u, v), scale(F.n, slice ? RELIEF * (2 * val(u, v) - 1) : 0)),
      Object.assign({ u: [-HALF, HALF], v: [-HALF, HALF], nu: NU, nv: NV, alpha: slice ? 0.74 : 0.42, pick: false, grid: { every: [6, 8], color: P.ink, alpha: 0.12 } },
        slice ? { value: val, colors: [P.violet, P.cyan], range: [0, 1] } : { color: P.dim }));
    const corner = [[-HALF, -HALF], [HALF, -HALF], [HALF, HALF], [-HALF, HALF]].map(([u, v]) => onSlice(F, u, v));
    sc.line(corner, { color: P.ink, width: 1.3, alpha: 0.55, close: true });
    // the normal and its tip
    sc.arrow([0, 0, 0], scale(F.n, NORMAL_LEN - 0.02), { color: P.ink, width: 1.6, headSize: 9, alpha: 0.8 });
    if (!slice) {
      at(onSlice(F, -HALF * 0.55, HALF * 0.85), 'Σ · Tr(½·1·P) = ½', 'raw c-ik backed', 8, null);
      return;
    }
    // peaks (cyan), blind zones (violet) and the half-level contours of the aperture reading, as lines along e₁
    const k = F.dkLen, ampAbs = M.amp, levels = M.levels;
    const lineAt = (v, color, width, alpha, dash) => {
      const lift = RELIEF * (2 * val(0, v) - 1) + 0.006 * facing;
      sc.line(range(-HALF, HALF, 8).map((u) => add(onSlice(F, u, v), scale(F.n, lift))), { color, width, alpha, dash });
    };
    const strong = clamp(ampAbs * 1.2, 0.15, 1);
    for (const [kind, v] of levels) {
      if (kind === 'peak') lineAt(v, P.cyan, 2.2, 0.95 * strong);
      else if (kind === 'void') lineAt(v, P.violet, 2.2, 0.95 * strong);
      else lineAt(v, P.ink, 1, 0.5 * strong, [4, 4]);
    }
    // the period, as a bracket between two neighbouring peaks at the right-hand edge
    const peaks = levels.filter((l) => l[0] === 'peak').map((l) => l[1]).sort((x, y) => x - y);
    if (peaks.length >= 2) {
      const ub = HALF + 0.12, p0 = onSlice(F, ub, peaks[0]), p1 = onSlice(F, ub, peaks[1]);
      sc.line([p0, p1], { color: P.cyan, width: 1.6, alpha: 0.9 });
      for (const q of [p0, p1]) sc.line([add(q, scale(F.e1, -0.05)), add(q, scale(F.e1, 0.05))], { color: P.cyan, width: 1.6, alpha: 0.9 });
      at(scale(add(p0, p1), 0.5), `L<sub>M</sub> = ${fix(F.LM / A, 3)}a`, 'raw c-cy backed', 9, null);
    } else at(onSlice(F, HALF, 0), `L<sub>M</sub> = ${fix(F.LM / A, 3)}a`, 'raw c-cy backed', 9, null);
    if (peaks.length) at(onSlice(F, -HALF * 0.7, peaks[peaks.length - 1]), M.W === 1 ? 'I → 1' : `⟨I⟩<sub>max</sub> = ${fa(0.5 + ampAbs / 2)}`, 'raw c-cy backed', 5, null);
    // the sweep: one tracked peak, its start and the node that does not move
    if (S.drive === 'sweep' || Math.abs(M.e.phi) > 1e-9) {
      // the peak that sits in [0, L_M) at φ = 0 (where −|Δk|v + arg S = 0) moves along Δk (towards −e₂) by L_M·φ/360°
      const c0 = M.argS / k;
      const start = ((c0 % F.LM) + F.LM) % F.LM, vNow = start - M.shift;
      if (Math.abs(start) <= HALF && Math.abs(vNow) <= HALF) {
        const lift = (v) => add(onSlice(F, -0.2, v), scale(F.n, RELIEF + 0.012 * facing));
        sc.line([lift(start), lift(vNow)], { color: P.cyan, width: 1.4, dash: [5, 4], alpha: 0.9 });
        sc.bead(lift(start), { key: 'peak-start', color: P.ink, r: 3.2, glow: 0.2 });
        sc.bead(lift(vNow), { key: 'peak-now', color: P.cyan, r: 5 });
        at(lift(vNow), `${L('条纹移动', 'fringe shift')} ${fix(M.shift / A, 3)}a`, 'raw c-cy backed', 9, null);
      }
      at(NODES[124], `${L('格点', 'nodes')} ‖Δx‖ = 0.0000`, 'raw c-sg backed', 8, [1, -1]);
    }
    if (M.W > 1 || S.drive === 'aperture') at(onSlice(F, -HALF * 0.6, -HALF * 0.85), `W = ${M.W} · ΔI/⟨I⟩ = ${fa(M.contrast)}`, 'raw c-ik backed', 9, null);
  }
  /** The dark ring in the yz plane: perpendicular to the slice for every θ, its thickness the dark load. */
  function drawRing(M) {
    const r = M.minorR;
    sc.surface('dark-ring', (u, v) => {
      const rad = [0, Math.cos(u), Math.sin(u)];
      return add(scale(rad, R_RING + r * Math.cos(v)), [r * Math.sin(v), 0, 0]);
    }, { u: [0, TAU], v: [0, TAU], nu: 120, nv: 14, color: P.magenta, grid: { every: [10, 7], color: P.ink, alpha: 0.12 }, pick: false });
    const side = [0, R_RING * Math.cos(PI + 0.3), R_RING * Math.sin(PI + 0.3)];
    at(side, `I<sub>EM</sub>(90°) = ${fa(Math.abs(instances(M).pinching.IEM))} · dτ/dt = ${fa(M.dtdt)}`, 'raw c-mg backed', 7, null);
  }

  function drawStage(M) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    AX = camAxes(sc.cam);
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 8, y: 8, w: W - 16, h: H - 16 } : safeRect(W, H, huds);
    if (!dragging || !FIT) FIT = { area, box: contentBox(sc.cam.pitch) };
    fitTo(FIT.box, FIT.area, W, H);
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = []; TAGS = [];
    sc.begin();
    drawNodes();
    drawSlice(M);
    drawRing(M);
    if (M.lens === 'sea') at(NODES[124], '½·1 · Tr ρ = 1', 'raw c-sg backed', 7, [1, -1]);
    sc.end();
    const show = !thumb && !TRV.still;
    const hq = show ? sc.p(tipOf(M.F.theta)) : null;
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
    FRAME = { W, H, area: FIT.area, box: FIT.box, handle: hq ? { x: hq[0], y: hq[1] } : null, unit: sc.unit, cx: sc.cx, cy: sc.cy };
  }

  /* ---------- the handle: a button at the tip of the slice normal ---------- */
  const handle = $('sliceHandle');
  function placeHandle(q) {
    const show = !!q;
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
    const label = L('沿圆弧拖动切面法向改 θ', 'Drag the slice normal along its arc to set θ');
    if (handle.getAttribute('aria-label') !== label) handle.setAttribute('aria-label', label);
  }
  /** The turn whose projected normal tip is nearest to the pointer (a search along the arc, then a refinement). */
  function thetaAt(ev) {
    const r = stageEl.getBoundingClientRect(), x = ev.clientX - r.left - stageEl.clientLeft, y = ev.clientY - r.top - stageEl.clientTop;
    const d = (th) => { const q = sc.p(tipOf(th)); return Math.hypot(q[0] - x, q[1] - y); };
    let best = THETA_MIN, bd = Infinity;
    for (let th = THETA_MIN; th <= THETA_MAX + 1e-9; th += 0.5) { const dd = d(th); if (dd < bd) { bd = dd; best = th; } }
    let lo = Math.max(THETA_MIN, best - 0.5), hi = Math.min(THETA_MAX, best + 0.5);
    for (let k = 0; k < 40; k++) { const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3; if (d(m1) < d(m2)) hi = m2; else lo = m1; }
    return Math.round((lo + hi) / 2 / 0.05) * 0.05;
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
    setTheta(thetaAt(ev));
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(ev.key)) return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    const sgn = ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : -1;
    setTheta(Math.round((S.theta + 0.5 * sgn) / 0.05) * 0.05);
  });

  /* ---------- HUD, legend, readouts ---------- */
  function legendItems() {
    if (S.lens === 'sea') return [['sg', L('格点：同一个 ½·1', 'nodes: the same ½·1')], ['dm', L('Σ：处处读 ½', 'Σ: reads ½ everywhere')], ['mg', L('正交暗环', 'orthogonal dark ring')]];
    return [['cy', L('峰 I → 1', 'peaks I → 1')], ['vi', L('盲区 I → 0', 'blind zones I → 0')], ['sg', L('格点 ½·1', 'nodes ½·1')], ['mg', L('正交暗环', 'orthogonal dark ring')]];
  }
  function hudText(M) {
    let big, sub;
    if (M.lens === 'sea') {
      big = `½·1 · Tr ρ = ${fa(ONT.traces[0])} · ‖∇ρ‖ = ${fa(ONT.grad)}`;
      sub = `S(Ψ) = 0 · S(ρ<sub>x</sub>) = ln 2 · Σ ${L('处处读', 'reads')} ½ · θ = ${fix(M.F.theta, 2)}°`;
    } else {
      big = `Σ · L<sub>M</sub> = ${fix(M.F.LM / A, 3)}a · θ = ${fix(M.F.theta, 2)}°`;
      sub = `I = cos²ΔΦ · ΔI/⟨I⟩ = ${fa(M.contrast)} · W = ${M.W} · φ = ${Math.round(M.e.phi)}°`;
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('legend').innerHTML = legendItems().map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  const FORMULA = 'I<sub>slice</sub> = cos²ΔΦ = (1 + cos(Δk·x − φ))/2 · L<sub>M</sub> = a/(2 sin(θ/2)) · dτ/dt = √(1 − η<sub>slice</sub>² − η<sub>dark</sub>²)';
  function drawText(M) {
    const I = instances(M);
    if (M.lens === 'sea') {
      $('roKeyZh').innerHTML = '格点边缘 ρ(x)'; $('roKeyEn').innerHTML = 'Node marginal ρ(x)';
      $('roKey').textContent = '½·1'; $('roKeySub').innerHTML = ` · ${L('切面处处', 'slice everywhere')} ½`;
    } else {
      $('roKeyZh').innerHTML = '切面衬度 ΔI/⟨I⟩'; $('roKeyEn').innerHTML = 'Slice contrast ΔI/⟨I⟩';
      $('roKey').textContent = fa(M.contrast); $('roKeySub').innerHTML = ` · W = ${M.W}`;
    }
    $('roPeriod').innerHTML = `${fix(M.F.LM / A, 3)}a · θ = ${fix(M.F.theta, 2)}° · α = ${fix(M.F.alpha, 6)}`;
    $('roBorn').innerHTML = `${fa(I.born.w0)} + ${fa(I.born.w1)} = ${fa(I.born.sum)}`;
    $('roNode').innerHTML = `${fa(ONT.traces[0])} · ${fa(ONT.grad)} · ln 2 = ${fa(ONT.nodeEntropy)}`;
    $('roGlobal').innerHTML = `${fa(ONT.globalEntropy)} · 125 ln 2 = ${fix(ONT.thermalEntropy, 3)}`;
    $('roSweep').innerHTML = `${fix(M.shift / A, 3)}a · ‖Δx‖ = 0.0000`;
    $('roDark').innerHTML = `${fa(Math.abs(I.pinching.IEM))} · ${fa(M.dtdt)}`;
    $('roNote').innerHTML = noteFor(M, I);
    $('scenePill').innerHTML = `SLICE <strong>${M.lens === 'sea' ? L('本体', 'ONTOLOGY') : L('切面', 'OBSERVER')}</strong>`;
    $('keyPill').innerHTML = M.lens === 'sea' ? `Tr ρ <strong>${fa(ONT.traces[0])}</strong>` : `L<sub>M</sub> <strong>${fix(M.F.LM / A, 3)}a</strong>`;
    $('hint').innerHTML = L('拖琥珀手柄改 θ · 拖空白处转视角 · 换透镜看同一组参数的两种读法', 'drag the amber handle to set θ · drag empty space to orbit · switch the lens for the two readings of the same parameters');
    $('formula').innerHTML = FORMULA;
    lensBtn.setAttribute('aria-pressed', String(S.lens === 'sea'));
  }
  function noteFor(M, I) {
    if (M.lens === 'sea') return L(`本体透镜：125 个格点的边缘都是 ½·1（偏离 ${fa(I.bell.offHalf)}），任何切面读到 Tr(½·1·P) = ½。热积态的边缘相同，熵却是 ${fix(ONT.thermalEntropy, 3)}。`,
      `Ontology lens: all 125 nodes have the marginal ½·1 (off by ${fa(I.bell.offHalf)}), and every slice reads Tr(½·1·P) = ½. The thermal product has the same marginals but entropy ${fix(ONT.thermalEntropy, 3)}.`);
    if (S.drive === 'aperture' || M.W > 1) return L(`孔径 W = ${M.W}：α = ${fix(M.F.alpha, 6)}，平均与 ½ 相差 ${fa(I.haar.gapAtW)}，衬度 |D<sub>W</sub>| = ${fa(M.contrast)}。`,
      `Aperture W = ${M.W}: α = ${fix(M.F.alpha, 6)}, the average is ${fa(I.haar.gapAtW)} from ½, the contrast |D<sub>W</sub>| = ${fa(M.contrast)}.`);
    if (S.drive === 'load') return L(`暗环与切面垂直：留下的对角质量 ${fa(I.pinching.kept)}、丢掉的相干质量 ${fa(I.pinching.discarded)}，I<sub>EM</sub> = ${fa(Math.abs(I.pinching.IEM))}；η<sub>dark</sub> = ${fix(M.eta, 2)} 时 dτ/dt = ${fa(M.dtdt)}。`,
      `The dark ring stands perpendicular to the slice: diagonal mass kept ${fa(I.pinching.kept)}, coherence mass discarded ${fa(I.pinching.discarded)}, I<sub>EM</sub> = ${fa(Math.abs(I.pinching.IEM))}; at η<sub>dark</sub> = ${fix(M.eta, 2)}, dτ/dt = ${fa(M.dtdt)}.`);
    return L(`切面中心：|⟨χ<sub>ont</sub>|χ<sub>obs</sub>⟩|² = ${fa(I.born.w0)} = Tr(ρP) = ${fa(I.born.trace0)}；I<sub>slice</sub> + I<sub>⊥</sub> = ${fa(I.born.sum)}。`,
      `Slice centre: |⟨χ<sub>ont</sub>|χ<sub>obs</sub>⟩|² = ${fa(I.born.w0)} = Tr(ρP) = ${fa(I.born.trace0)}; I<sub>slice</sub> + I<sub>⊥</sub> = ${fa(I.born.sum)}.`);
  }

  /* ---------- strip plot ---------- */
  function drawPlot(M) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    const pad = [40, 12, 10, 22];
    if (S.drive === 'aperture' || (S.drive !== 'load' && M.W > 1)) {
      $('plotTitle').textContent = L('孔径变宽：|D_W| 在衰减的 1/W 包络下振荡趋于 0', 'A wider aperture: |D_W| oscillates under a decaying 1/W envelope towards 0');
      const g = kit.plot(cv, { x: [0.5, W_MAX + 0.5], y: [0, 1.05], pad });
      g.axes({ xTicks: [1, 5, 10, 15, 20], yTicks: [0, 0.5, 1], xLabel: 'W' });
      const env = (w) => Math.min(1, 1 / (w * Math.abs(Math.sin(PI * M.F.alpha))));
      g.line(range(1, W_MAX, 190).map((w) => [w, env(w)]), P.dim, { width: 1.2, dash: [4, 4] });
      for (let w = 1; w <= W_MAX; w++) g.dot(w, dirichlet(M.F.alpha, w), w === M.W ? P.ink : P.cyan, w === M.W ? 4 : 2.6);
      $('plotMeta').innerHTML = `α = ${fix(M.F.alpha, 6)} · |D<sub>${M.W}</sub>| = ${fa(M.contrast)} · ${L('包络', 'envelope')} 1/(W sin πα)`;
    } else if (S.drive === 'load') {
      $('plotTitle').textContent = L('暗负载：dτ/dt 下降，I_EM 不动', 'Dark load: dτ/dt falls, I_EM stays');
      const g = kit.plot(cv, { x: [0, ETA_MAX], y: [0, 1.05], pad });
      g.axes({ xTicks: [0, 0.2, 0.4, 0.6, 0.8], yTicks: [0, 0.5, 1], xLabel: 'η_{dark}' });
      g.line(range(0, ETA_MAX, 120).map((x) => [x, Math.sqrt(1 - ETA_SLICE * ETA_SLICE - x * x)]), P.ink, { width: 2 });
      g.line([[0, 0], [ETA_MAX, 0]], P.magenta, { width: 2.4 });
      g.vline(M.eta, P.ink, { alpha: 0.6 }); g.dot(M.eta, M.dtdt, P.ink, 4.2);
      $('plotMeta').innerHTML = `dτ/dt = ${fa(M.dtdt)} · I<sub>EM</sub>(90°) = ${fa(0)}`;
    } else if (S.drive === 'sweep') {
      $('plotTitle').textContent = L('沿 Δk 的亮度：条纹滑动，格点不动', 'Brightness along Δk: the fringes slide, the nodes stay');
      const g = kit.plot(cv, { x: [-HALF / A, HALF / A], y: [0, 1.05], pad });
      g.axes({ xTicks: [-2, -1, 0, 1, 2], yTicks: [0, 0.5, 1], xLabel: L('v / a（沿 e₂）', 'v / a (along e₂)') });
      const vs = range(-HALF, HALF, 160);
      g.line(vs.map((v) => [v / A, aperture(M.F, onSlice(M.F, 0, v), 0, M.W)]), P.dim, { width: 1.2, dash: [4, 4] });
      g.line(vs.map((v) => [v / A, aperture(M.F, onSlice(M.F, 0, v), M.phi, M.W)]), P.cyan, { width: 2.2 });
      $('plotMeta').innerHTML = `φ = ${Math.round(M.e.phi)}° · ${L('移动', 'shift')} ${fix(M.shift / A, 3)}a · ‖Δx‖ = 0`;
    } else if (M.lens === 'sea') {
      $('plotTitle').textContent = L('本体透镜：任何转角，切面都读 ½', 'Ontology lens: at every turn the slice reads ½');
      const g = kit.plot(cv, { x: [0, THETA_MAX], y: [0, 1.05], pad });
      g.axes({ xTicks: [0, 15, 30, 45, 60], yTicks: [0, 0.5, 1], xLabel: 'θ (°)' });
      g.line([[0, 1], [THETA_MAX, 1]], P.cyan, { width: 1.2, dash: [4, 4] });
      g.line([[0, 0], [THETA_MAX, 0]], P.violet, { width: 1.2, dash: [4, 4] });
      g.line([[THETA_MIN, 0.5], [THETA_MAX, 0.5]], P.dim, { width: 2.4 });
      g.vline(M.F.theta, P.ink, { alpha: 0.6 }); g.dot(M.F.theta, 0.5, P.ink, 4.2);
      $('plotMeta').innerHTML = `Tr(½·1·P) = ${fa(instances(M).context.seaReading)} · ${L('切面透镜的峰与盲区为虚线', 'dashed: the peaks and blind zones of the slice lens')}`;
    } else {
      $('plotTitle').textContent = L('转角越大，条纹越密：L_M(θ)', 'The larger the turn, the denser the fringes: L_M(θ)');
      const g = kit.plot(cv, { x: [0, THETA_MAX], y: [0.5, 80], pad, logY: true });
      g.axes({ xTicks: [0, 15, 30, 45, 60], yTicks: [1, 10, 50], xLabel: 'θ (°)' });
      g.line(range(THETA_MIN, THETA_MAX, 240).map((t) => [t, frames(t).LM / A]), P.cyan, { width: 2.2 });
      g.vline(THETA_MAGIC, P.ink, { alpha: 0.5, dash: [4, 4] });
      g.vline(M.F.theta, P.ink, { alpha: 0.6 }); g.dot(M.F.theta, M.F.LM / A, P.ink, 4.2);
      $('plotMeta').innerHTML = `1.05°: ${fix(frames(THETA_MAGIC).LM / A, 3)}a · 36°: ${fix(frames(THETA_REF).LM / A, 3)}a · ${L('当前', 'now')} ${fix(M.F.LM / A, 3)}a`;
    }
  }

  const paint = kit.painter(() => {
    const M = model();
    hudText(M); TRV.hudFit();
    drawStage(M); drawText(M); drawPlot(M);
  }, [stageEl, $('plot')]);

  /* ---------- the rail: the story τ of the card ---------- */
  const playBtn = $('playBtn');
  const railLabel = (t) => (S.drive === 'sweep' ? `τ ${fix(t, 2)} · φ = ${Math.round(360 * t)}°` : S.drive === 'load' ? `τ ${fix(t, 2)} · η<sub>dark</sub> = ${fix(ETA_MAX * t, 2)}`
    : S.drive === 'aperture' ? `τ ${fix(t, 2)} · W = ${driveW(t)}` : `τ ${fix(t, 2)} · θ = ${fix(driveTheta(t), 2)}°`);
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, t: 0, rate: 0.12, step: 0.05, loop: true,
    format: (t) => `${railLabel(t)} <small>/ 1</small>`,
    onChange: (t, C) => { S.tau = t; syncFields(); playBtn.textContent = C.playing ? '❚❚' : '▷'; playBtn.setAttribute('aria-pressed', String(C.playing)); paint(); }
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
    S.theta = e.theta; S.phi = e.phi; S.eta = e.eta; S.W = e.W; S.from = null; S.blend = 1; S.drive = 'free';
    cards.mark(null); clock.pause(); clock.set(clock.t, true);
  }
  const roundTo = (v, s) => Math.round(v / s) * s;
  const fTheta = kit.field($('tiltTheta'), { fmt: (v) => fix(clamp(v, THETA_MIN, THETA_MAX), 2), onInput: (v) => { leave(); S.theta = clamp(v, THETA_MIN, THETA_MAX); paint(); } });
  const fPhi = kit.field($('phaseSweep'), { fmt: (v) => String(Math.round(clamp(v, 0, 360))), onInput: (v) => { leave(); S.phi = clamp(v, 0, 360); paint(); } });
  const fW = kit.field($('apertureScale'), { fmt: (v) => String(Math.round(clamp(v, 1, W_MAX))), onInput: (v) => { leave(); S.W = clamp(Math.round(v), 1, W_MAX); paint(); } });
  const fEta = kit.field($('orthoDarkLoad'), { fmt: (v) => fix(clamp(v, 0, ETA_MAX), 2), onInput: (v) => { leave(); S.eta = clamp(v, 0, ETA_MAX); paint(); } });
  function syncFields() { const e = eff(); fTheta.set(roundTo(e.theta, 0.05)); fPhi.set(Math.round(e.phi)); fW.set(e.W); fEta.set(roundTo(e.eta, 0.01)); }
  function setTheta(v) { S.theta = clamp(v, THETA_MIN, THETA_MAX); syncFields(); paint(); }
  const lensBtn = $('lensToggleBtn');
  lensBtn.addEventListener('click', () => { leave(); S.lens = S.lens === 'sea' ? 'slice' : 'sea'; paint(); });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'isotropic-singlet-ontology': { lens: 'sea', drive: 'tilt', theta: THETA_REF, phi: 0, W: 1, eta: ETA_REF, play: true, still: 'end' },
    'tilted-slice-moire-emergence': { lens: 'slice', drive: 'tilt', theta: THETA_REF, phi: 0, W: 1, eta: ETA_REF, play: true, still: 'end' },
    'phase-sweep-motionless-flow': { lens: 'slice', drive: 'sweep', theta: THETA_REF, phi: 0, W: 1, eta: ETA_REF, play: true, still: 0.25 },
    'orthogonal-dark-sector-clock-load': { lens: 'slice', drive: 'load', theta: THETA_REF, phi: 0, W: 1, eta: ETA_REF, play: true, still: 0.5 },
    'horizon-aperture-homogenization': { lens: 'slice', drive: 'aperture', theta: THETA_REF, phi: 0, W: 1, eta: ETA_REF, play: true, still: 'end' }
  };
  const NOTES = {
    'isotropic-singlet-ontology': ['本体透镜：125 个银白格点各与观察者寄存器里的一个比特配成贝尔对，整体是纯态（S = 0），可每个格点的边缘都是同一个 ½·1：Tr ρ = 1，相邻格点之差 ‖∇ρ‖ = 0。时间轴把切面从 1.05° 转到 36°：无论转到哪里，灰色的切面处处读 Tr(½·1·P) = ½，没有一条条纹。',
      'Ontology lens: each of the 125 silver nodes is paired into a Bell pair with a qubit of the observer register, so the whole is pure (S = 0), yet every node has the same marginal ½·1: Tr ρ = 1 and neighbouring nodes differ by ‖∇ρ‖ = 0. The rail turns the slice from 1.05° to 36°: wherever it turns, the grey slice reads Tr(½·1·P) = ½ everywhere, without a single fringe.'],
    'tilted-slice-moire-emergence': ['切面透镜：同样的格点、同样的转角，经观察者寄存器条件化后切面读出条纹：青色的峰 I → 1，紫色的盲区 I → 0，I = cos²ΔΦ。时间轴把 θ 从 1.05° 转到 36°：1.05° 时周期 L<sub>M</sub> = 54.568a，远大于切面；36° 时 L<sub>M</sub> = 1.618a，右缘的括号量出一个周期。',
      'Slice lens: the same nodes and the same turn, conditioned on the observer register, show fringes on the slice: cyan peaks I → 1, violet blind zones I → 0, I = cos²ΔΦ. The rail turns θ from 1.05° to 36°: at 1.05° the period L<sub>M</sub> = 54.568a is far larger than the slice; at 36°, L<sub>M</sub> = 1.618a, and the bracket at the right edge measures one period.'],
    'phase-sweep-motionless-flow': ['扫相：θ = 36° 时把 φ 从 0° 扫到 360°，条纹沿 Δk 滑过一个周期 1.618a；青色珠子是一条峰，虚线是它走过的路。125 个格点一个也不动，‖Δx‖ = 0.0000。τ = 0.25（φ = 90°）时峰移动了 L<sub>M</sub>/4 = 0.405a。',
      'The sweep: at θ = 36° the phase φ runs from 0° to 360° and the fringes glide along Δk by one period, 1.618a; the cyan bead is one peak, the dashed line its path. Not one of the 125 nodes moves, ‖Δx‖ = 0.0000. At τ = 0.25 (φ = 90°) the peak has moved L<sub>M</sub>/4 = 0.405a.'],
    'orthogonal-dark-sector-clock-load': ['正交暗区：品红的环垂直于切面，在切面的记录基里与记录轴成 90°，捏合后留下 ½、丢掉 ½，切面上的衬度 I<sub>EM</sub>(90°) = 0.0000。时间轴把它的钟负载 η<sub>dark</sub> 从 0 加到 0.8：环变粗，dτ/dt = √(1 − 0.30² − η<sub>dark</sub>²) 下降；τ = 0.5 时 η<sub>dark</sub> = 0.40，dτ/dt = 0.8660。',
      'The orthogonal dark sector: the magenta ring stands perpendicular to the slice and, in the record basis of the slice, at 90° to the record axis; pinching keeps ½ and discards ½, so its contrast on the slice is I<sub>EM</sub>(90°) = 0.0000. The rail raises its clock load η<sub>dark</sub> from 0 to 0.8: the ring thickens and dτ/dt = √(1 − 0.30² − η<sub>dark</sub>²) falls; at τ = 0.5, η<sub>dark</sub> = 0.40 and dτ/dt = 0.8660.'],
    'horizon-aperture-homogenization': ['孔径：把沿 Δk 前后相继的 W 个格的读数平均。θ = 36° 时每格的相位步 α = (√5 − 1)/2 是无理数，平均趋于 ½。时间轴把 W 从 1 加到 20：衬度 |D<sub>W</sub>| 不是逐格下降，而是在衰减的 1/W 包络下振荡着趋于 0（W = 3 时 0.1582，W = 4 时回升到 0.2672）；W = 20 时 ΔI/⟨I⟩ = 0.0486，峰与盲区几乎都回到 ½。',
      'The aperture: average the readings of W consecutive cells along Δk. At θ = 36° the phase step per cell α = (√5 − 1)/2 is irrational, and the average tends to ½. The rail raises W from 1 to 20: the contrast |D<sub>W</sub>| does not fall cell by cell but oscillates beneath a decaying 1/W envelope towards 0 (0.1582 at W = 3, back up to 0.2672 at W = 4); at W = 20, ΔI/⟨I⟩ = 0.0486, peaks and blind zones almost back at ½.']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'isotropic-singlet-ontology': ['125 个格点是同一个 ½·1；灰色切面无论转到哪里，处处读 ½。', 'All 125 nodes are the same ½·1; wherever the grey slice turns, it reads ½ everywhere.'],
    'tilted-slice-moire-emergence': ['切面转过 36°：青色的峰与紫色的盲区显影，周期 LM = 1.618a。', 'The slice turned by 36°: cyan peaks and violet blind zones appear, period LM = 1.618a.'],
    'phase-sweep-motionless-flow': ['φ = 90°：青色的峰滑过 0.405a，格点的位移是 0。', 'At φ = 90° the cyan peak has slid by 0.405a; the nodes have moved by 0.'],
    'orthogonal-dark-sector-clock-load': ['品红暗环在切面上的衬度是 0，却让 dτ/dt 降到 0.8660。', 'The magenta dark ring has contrast 0 on the slice, yet brings dτ/dt down to 0.8660.'],
    'horizon-aperture-homogenization': ['孔径 W = 20：条纹抹平，衬度只剩 0.0486。', 'Aperture W = 20: the fringes are smoothed out, the contrast is down to 0.0486.']
  };
  function applyPreset(id) {
    const p = PRESETS[id];
    stopBootPlay(); clock.pause();
    const before = eff();
    if (transition) transition.cancel();
    transition = null;
    S.lens = p.lens; S.drive = p.drive; S.theta = p.theta; S.phi = p.phi; S.W = p.W; S.eta = p.eta; S.from = null; S.blend = 1;
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
    idle: ['自由探索：拉转角、扫相、孔径与暗负载，换透镜，拖琥珀手柄。随时可以再选一张卡。', 'Free play: pull the turn, the sweep, the aperture and the dark load, switch the lens, drag the amber handle. Pick a card again at any time.']
  });
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.UNIFORM_SLICE_DEBUG = Object.freeze({
    get state() {
      const M = model(), I = instances(M), g = M.field;
      return JSON.parse(JSON.stringify({
        preset: cards.current, t: clock.t, playing: clock.playing, lens: S.lens, drive: S.drive, blending: !!(S.from && S.blend < 1), tau: S.tau,
        theta: M.F.theta, phiDeg: M.e.phi, W: M.W, eta: M.eta,
        constants: { a: A, nodes: NODES.length, half: HALF, nu: NU, nv: NV, etaSlice: ETA_SLICE, etaMax: ETA_MAX, wMax: W_MAX, thetaRef: THETA_REF, thetaMagic: THETA_MAGIC, ringR: R_RING },
        frame: { n: M.F.n, e1: M.F.e1, e2: M.F.e2, kOnt: M.F.kOnt, kObs: M.F.kObs, dk: M.F.dk, dkLen: M.F.dkLen, LM: M.F.LM, alpha: M.F.alpha },
        nodesPos: NODES, contrast: M.contrast, amp: M.amp, argS: M.argS, phase0: M.phase0, levels: M.levels, shift: M.shift, dtdt: M.dtdt, ringMinor: M.minorR,
        slice: { lo: g.lo, hi: g.hi, sample: [0, 9, 18, 27, 36].flatMap((i) => [0, 16, 32, 48, 64].map((j) => ({ u: -HALF + 2 * HALF * i / NU, v: -HALF + 2 * HALF * j / NV, w: g.vals[j * (NU + 1) + i] }))) },
        shown: { lens: M.lens, flat: M.lens === 'sea' ? 0.5 : null },
        leanInstances: I, camera: Object.assign({}, sc.cam), handle: FRAME ? FRAME.handle : null, labels: PLACED, stageFrame: FRAME
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock). */
    setState(o) {
      leave();
      if (o.lens != null) S.lens = o.lens === 'sea' ? 'sea' : 'slice';
      if (o.theta != null) S.theta = clamp(o.theta, THETA_MIN, THETA_MAX);
      if (o.phi != null) S.phi = clamp(o.phi, 0, 360);
      if (o.W != null) S.W = clamp(Math.round(o.W), 1, W_MAX);
      if (o.eta != null) S.eta = clamp(o.eta, 0, ETA_MAX);
      syncFields();
      if (o.t != null) clock.set(clamp(o.t, 0, 1));
      paint();
    },
    /** The reading of the shown slice at in-plane (u, v), from the page's own field (for pixel-free tests). */
    readAt(u, v) { const M = model(); return M.lens === 'sea' ? 0.5 : aperture(M.F, onSlice(M.F, u, v), M.phi, M.W); },
    /** Viewport coordinates of the handle (for pointer tests), or null when hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates where the handle would sit for a turn of θ degrees. */
    dragTarget(th) { const b = stageEl.getBoundingClientRect(), q = sc.p(tipOf(th)); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] }; }
  });
  window.TRV_THUMB = () => { cards.pick('tilted-slice-moire-emergence'); clock.pause(); clock.set(1); sc.view([VIEW0[0], VIEW0[1], 1], 0); paint.now(); };
  cards.pick(cards.initial('isotropic-singlet-ontology'));
  booting = false;
  paint();
})();
