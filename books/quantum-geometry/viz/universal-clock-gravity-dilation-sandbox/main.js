/* CLOCK//DILATION · 普适比较主频、光速推理精度下界与引力信息密度钟慢
   Universal comparison clock, light-speed precision floor and gravitational information-density dilation (§33.7).
   Two scenes on one lit stage (kit.solid, x right, z up):
     clocks  observers A (deep space: η = 0, β = 0) and B (load η = η_info = r_s/r, speed β) each turn a violet master
             flywheel at the same master frequency ν₀ = 1: one turn per beat of the rail, through the same angle on
             both. The unit axis of the wheel of B is v = (√(1 − η)β, √η, √((1 − η)(1 − β²))): its projection on the
             upright proper-time axis is the cyan rate dτ/dt = √((1 − η)(1 − β²)); the rest is the magenta load,
             background entanglement η (arcs from the holographic sphere of radius r_s into round(20η) of the 20 slots of
             the window of B) and address hops (1 − η)β² (one magenta hop per lattice spacing crossed, ⌊βν₀t⌋ of them, along −y).
             η + (1 − η)β² + (1 − η)(1 − β²) = 1 is the Lagrange identity at u = (0, 0, 1). After ν₀t beats A has
             stacked t cyan frame coins and B (dτ/dt)·t; three sub-clocks (neural 0.25, atomic 2, photon ruler 1 cycles
             per unit of proper time) run in both. The sphere is drawn at the true ratio r/r_s from the wheel centre of
             B (r/r_s = 1/η), and left out when that is farther than the floor allows.
     cone    a radar window of N beats (c = ℓ_P ν₀: one lattice spacing per beat): emission at the lower apex, echo at
             the upper apex, the violet null cones between them. On the waist (the spatial slice at N/2 beats) a node at
             distance d ≤ N/2 spacings can be verified by a round trip and turns cyan once its echo is back (2d ≤ ν₀t);
             the nodes farther out (magenta) cannot be verified within this window. One spacing is 1/N of the diameter
             of the window: the precision floor ε_self,min = 1/N.
   The rail is the master beats ν₀t (0 … 10 for the clocks, 0 … N for the cone). Every number is computed here; the
   instances of the cited Lean theorems are computed in instances(). Read-only probe: window.CLOCK_DILATION_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, UP = [0, 0, 1];

  /* ---------- constants ---------- */
  const NU0 = 1;                         // master beats (and wheel turns) per unit coordinate time, for A and B alike
  const HBAR = 1, ENERGY = PI / 4;       // the record-bound instance: πħ/(4E) = 1, one beat per orthogonal record
  const T_CLOCKS = 10;                   // the clocks rail: ten master beats
  const N_MIN = 4, N_MAX = 40;
  const CELL = 0.1;                      // the lattice spacing ℓ_P in world units (both scenes)
  const SLOTS = 20;                      // window slots of B; background arcs pierce round(SLOTS·η) of them
  const SUBS = [{ id: 'neural', f: 0.25, zh: '神经', en: 'neural' }, { id: 'atomic', f: 2, zh: '原子', en: 'atomic' }, { id: 'photon', f: 1, zh: '光尺', en: 'photon ruler' }];
  const TOWER = { A: [-1.45, 0, 0], B: [0.2, 0, 0] };
  const WHEEL_Z = 0.62, WHEEL_R = 0.43, WHEEL_H = 0.07, AXIS_L = 0.66;
  const COL_DX = -0.64, COIN_R = 0.15, COIN_H = 0.05, COIN_STEP = 0.072, DIAL_R = 0.075, DIAL_Z = 0.98, DIAL_DX = 0.19;
  const SPHERE_R = 0.34, D_MAX = 2.0;     // the sphere of radius r_s sits at +x of B, at the true distance r = r_s/η
  const FLOOR = { x: [-2.35, 1.5], y: [-0.42, 0.62] }, RUNWAY = { x: [-0.15, 0.55], y: [-1.12, -0.42] };   // the deck, and the runway of the hops of B
  const VIEWS = { clocks: [-0.62, 0.4], cone: [-0.58, 0.42] };
  const RATE = { clocks: 1.25, cone: 2.5 };   // rail units per second at 1×

  const pct = (x, d = 1) => `${fix(100 * x, d)}%`;
  const frac = (x) => x - Math.floor(x + 1e-9);
  const floorC = (x) => Math.floor(x + 1e-9);

  /* ---------- the budget: three channels of one master clock ---------- */
  /** The shares of the master budget of an observer with load η and speed β (both in [0, 1]). */
  function budget(eta, beta) {
    const g = 1 - eta, b2 = beta * beta;
    const background = eta, motion = g * b2, self = g * (1 - b2);
    return { background, motion, self, load: background + motion, sum: background + motion + self, rate: Math.sqrt(Math.max(0, self)) };
  }
  /** The unit axis of the master flywheel: (motion, background, proper time) components. */
  const axisOf = (eta, beta) => [Math.sqrt(Math.max(0, 1 - eta)) * beta, Math.sqrt(Math.max(0, eta)), Math.sqrt(Math.max(0, (1 - eta) * (1 - beta * beta)))];
  /** The same axis on the stage: background towards the sphere (+x), motion along the hops (−y), time up. */
  const worldAxis = (eta, beta) => { const a = axisOf(eta, beta); return [a[1], -a[0], a[2]]; };

  /* ---------- the instances of the cited theorems ---------- */
  /** Eigenvalues and eigenvectors of a symmetric matrix (cyclic Jacobi). */
  function jacobi(A0) {
    const n = A0.length, A = A0.map((r) => r.slice()), V = A0.map((_, i) => A0.map((__, j) => (i === j ? 1 : 0)));
    for (let sweep = 0; sweep < 80; sweep++) {
      let off = 0;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += A[p][q] * A[p][q];
      if (off < 1e-30) break;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
        if (Math.abs(A[p][q]) < 1e-300) continue;
        const th = (A[q][q] - A[p][p]) / (2 * A[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1));
        const c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < n; k++) { const akp = A[k][p], akq = A[k][q]; A[k][p] = c * akp - s * akq; A[k][q] = s * akp + c * akq; }
        for (let k = 0; k < n; k++) { const apk = A[p][k], aqk = A[q][k]; A[p][k] = c * apk - s * aqk; A[q][k] = s * apk + c * aqk; }
        for (let k = 0; k < n; k++) { const vkp = V[k][p], vkq = V[k][q]; V[k][p] = c * vkp - s * vkq; V[k][q] = s * vkp + c * vkq; }
      }
    }
    const order = A.map((_, i) => i).sort((i, j) => A[i][i] - A[j][j]);
    return { values: order.map((i) => A[i][i]), vectors: order.map((i) => V.map((r) => r[i])) };
  }
  /** Quadratic forms S(t, x, y) = q·(t², x², y², tx, ty, xy) vanishing on K null directions (1, cos φ, sin φ): the
      solution space of the K × 6 system, from the eigen-decomposition of its Gram matrix. */
  function nullConeForms(K) {
    const rows = [];
    for (let k = 0; k < K; k++) { const a = TAU * k / K, c = Math.cos(a), s = Math.sin(a); rows.push([1, c * c, s * s, c, s, c * s]); }
    const G = [0, 1, 2, 3, 4, 5].map((i) => [0, 1, 2, 3, 4, 5].map((j) => rows.reduce((acc, r) => acc + r[i] * r[j], 0)));
    const { values, vectors } = jacobi(G), q0 = vectors[0], form = q0.map((x) => x / q0[0]);
    const target = [1, -1, -1, 0, 0, 0], tol = 1e-9 * values[values.length - 1];
    return {
      directions: K, eigenvalues: values, nullity: values.filter((x) => Math.abs(x) <= tol).length, gap: values[1], form,
      residual: Math.max(...form.map((x, i) => Math.abs(x - target[i]))),
      onCone: Math.max(...rows.map((r) => Math.abs(r.reduce((acc, x, i) => acc + x * form[i], 0))))
    };
  }
  const NULL_CONE = nullConeForms(12);
  /** S(1, β, 0) / S(1, 0, 0) from the solved form: 1 − β², the square of the rate. */
  const formRate = (beta) => { const f = NULL_CONE.form; return Math.sqrt(Math.max(0, (f[0] + f[1] * beta * beta + f[3] * beta) / f[0])); };
  // record_time_lower_bound on ħ = 1, E = π/4: m₀ = |0⟩, m₁ = |1⟩, a = (|0⟩ + |1⟩)/√2 (real amplitudes)
  const RECORD = (() => {
    const a = [Math.SQRT1_2, Math.SQRT1_2], m0 = [1, 0], m1 = [0, 1];
    const fs = (x, y) => Math.acos(Math.min(1, Math.abs(x[0] * y[0] + x[1] * y[1])));
    const tauMin = PI * HBAR / (4 * ENERGY);
    return { angle0: fs(a, m0), angle1: fs(a, m1), orthogonality: m0[0] * m1[0] + m0[1] * m1[1], tauMin, speedAtTauMin: ENERGY * tauMin / HBAR, energy: ENERGY, hbar: HBAR };
  })();
  const countBound = (T) => 4 * ENERGY * T / (PI * HBAR);

  const instCache = new Map();
  function instances(eta, beta) {
    const key = `${eta}|${beta}`;
    if (instCache.has(key)) return instCache.get(key);
    // Lagrange on u = (0, 0, 1), v = the unit axis of B
    const u = UP, v = axisOf(eta, beta);
    let su = 0, sv = 0, suv = 0, wedge = 0;
    for (let i = 0; i < 3; i++) { su += u[i] * u[i]; sv += v[i] * v[i]; suv += u[i] * v[i]; }
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) wedge += (u[i] * v[j] - u[j] * v[i]) ** 2;
    wedge /= 2;
    const B = budget(eta, beta);
    const lagrange = { lhs: su * sv - suv * suv, rhs: wedge, residual: Math.abs(su * sv - suv * suv - wedge), load: B.load, loadResidual: Math.abs(wedge - B.load), rate: suv };
    // the rapidity r = artanh β: cosh² r − sinh² r = 1 and 1/cosh r = √(1 − β²); the gravitational counterpart artanh √η
    const r = beta < 1 ? Math.atanh(beta) : Infinity, ch = Math.cosh(r), sh = Math.sinh(r);
    const rg = eta < 1 ? Math.atanh(Math.sqrt(eta)) : Infinity, chg = Math.cosh(rg);
    const rapidity = { r, cosh: ch, sinh: sh, identity: Math.abs(ch) ** 2 - Math.abs(sh) ** 2, rate: 1 / ch, rateResidual: Math.abs(1 / ch - Math.sqrt(1 - beta * beta)),
      rg, coshG: chg, rateG: Number.isFinite(chg) ? 1 / chg : 0, combined: Number.isFinite(ch * chg) ? 1 / (ch * chg) : 0 };
    const out = { lagrange, rapidity, nullCone: { ...NULL_CONE, rateFromForm: formRate(beta) }, record: { ...RECORD } };
    instCache.set(key, out);
    if (instCache.size > 60) instCache.delete(instCache.keys().next().value);
    return out;
  }

  /* ---------- the light-cone window ---------- */
  const coneCache = new Map();
  /** The lattice of the waist: every node (i, j) with i² + j² ≤ (N/2 + 3)²; inside the window when 4(i² + j²) ≤ N². */
  function lattice(N) {
    if (coneCache.has(N)) return coneCache.get(N);
    const ext = N / 2 + 3, M = Math.ceil(ext), nodes = [];
    for (let i = -M; i <= M; i++) for (let j = -M; j <= M; j++) {
      const q = i * i + j * j;
      if (q <= ext * ext) nodes.push({ i, j, q, d: Math.sqrt(q), inside: 4 * q <= N * N });
    }
    const out = { N, nodes, interior: nodes.filter((n) => n.inside).length, outside: nodes.filter((n) => !n.inside).length };
    coneCache.set(N, out);
    return out;
  }
  /** Nodes whose echo is back by beat t: inside the window and 2d ≤ t. */
  const verifiedAt = (lat, t) => lat.nodes.filter((n) => n.inside && 4 * n.q <= t * t + 1e-9).length;

  /* ---------- state ---------- */
  const S = { scene: 'clocks', lens: 'clock', beta: 0, eta: 0.4, N: 20, drive: 'eta', sub: false };

  /** Everything the page shows, from the state and the rail. */
  function model() {
    const t = clock.t;
    const B = budget(S.eta, S.beta), A = budget(0, 0);
    const tauA = A.rate * NU0 * t, tauB = B.rate * NU0 * t;
    const lat = lattice(S.N);
    const ratiosA = SUBS.map((s) => s.f * A.rate), ratiosB = SUBS.map((s) => s.f * B.rate);
    const inner = (r) => r[1] / r[0];                             // atomic / neural inside one observer
    return {
      t, A, B, tauA, tauB, framesA: floorC(tauA), framesB: floorC(tauB), progressA: frac(tauA), progressB: B.rate > 0 ? frac(tauB) : 0,
      masterAngle: TAU * NU0 * t, turns: NU0 * t, axisA: worldAxis(0, 0), axisB: worldAxis(S.eta, S.beta), budgetAxis: axisOf(S.eta, S.beta),
      hops: floorC(S.beta * NU0 * t), arcs: Math.round(SLOTS * S.eta), rOverRs: S.eta > 0 ? 1 / S.eta : Infinity,
      sub: { freqA: ratiosA, freqB: ratiosB, phaseA: SUBS.map((s) => s.f * tauA), phaseB: SUBS.map((s) => s.f * tauB),
        scale: ratiosB.map((x, k) => (ratiosA[k] > 0 ? x / ratiosA[k] : 0)), innerA: inner(ratiosA), innerB: B.rate > 0 ? inner(ratiosB) : null,
        ratioOfRatios: B.rate > 0 ? inner(ratiosB) / inner(ratiosA) : null },
      cone: { N: S.N, Rmax: S.N / 2, interior: lat.interior, outside: lat.outside, verified: verifiedAt(lat, S.scene === 'cone' ? t : S.N), eps: 1 / S.N, bound: countBound(S.N) }
    };
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; probe.style.position = 'absolute'; tagBox.appendChild(probe);
  const options = { canvas: $('cv'), yaw: VIEWS.clocks[0], pitch: VIEWS.clocks[1], wheel: false, radius: 0.3, cx: 0.5, cy: 0.5, onChange: () => paint() };
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
    for (const el of [$('hudTl'), $('sceneChips'), $('legend')]) { const b = boxOf(el, sr); if (b && (el.id !== 'legend' || el.textContent.trim())) out.push(b); }
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
      const base = Math.atan2(l.dir[1], l.dir[0]);
      let ok = null;
      for (const r of [l.r, l.r + 10, l.r + 24, l.r + 40]) {
        for (const da of [0, 0.5, -0.5, 1.0, -1.0, 1.6, -1.6, 2.3, -2.3, PI]) {
          const ux = Math.cos(base + da), uy = Math.sin(base + da), ext = Math.abs(ux) * w / 2 + Math.abs(uy) * h / 2;
          const b = { x: l.q[0] + ux * (r + ext) - w / 2, y: l.q[1] + uy * (r + ext) - h / 2, w, h };
          if (b.x < BOUNDS.x || b.y < BOUNDS.y || b.x + w > BOUNDS.x + BOUNDS.w || b.y + h > BOUNDS.y + BOUNDS.h) continue;
          if (placed.some((p) => meets(p, b, 3)) || OBST.some((p) => meets(p, b, 2))) continue;
          ok = b; break;
        }
        if (ok) break;
      }
      if (!ok) continue;
      placed.push(Object.assign({ key: l.key }, ok));
      sc.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
    }
    PLACED = placed;
  }

  /* the fit: the scene's box, projected with the current camera, fills the HUD-free rect */
  function basisOf(yaw, pitch) {
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp] };
  }
  function fitTo(pts, area, W, H) {
    const { R, U } = basisOf(sc.cam.yaw, sc.cam.pitch);
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const p of pts) { const x = v3.dot(p, R), y = v3.dot(p, U); x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    const unit = Math.max(20, Math.min(area.w / Math.max(1e-6, x1 - x0), area.h / Math.max(1e-6, y1 - y0)));
    const zoom = sc.cam.zoom || 1;
    options.radius = unit / Math.max(1, Math.min(W, H)) / zoom;
    options.cx = (area.x + area.w / 2 - unit * (x0 + x1) / 2) / Math.max(1, W);
    options.cy = (area.y + area.h / 2 + unit * (y0 + y1) / 2) / Math.max(1, H);
    return unit;
  }
  const box8 = (lo, hi) => { const out = []; for (const x of [lo[0], hi[0]]) for (const y of [lo[1], hi[1]]) for (const z of [lo[2], hi[2]]) out.push([x, y, z]); return out; };

  /* ---------- geometry helpers ---------- */
  /** The minimal rotation taking ẑ to the unit vector n, applied to p (Rodrigues). */
  function tiltOf(n) {
    const k = v3.cross(UP, n), s = v3.len(k), c = v3.dot(UP, n);
    if (s < 1e-12) return (p) => (c >= 0 ? p.slice() : [p[0], -p[1], -p[2]]);
    const ax = v3.scale(k, 1 / s), ang = Math.atan2(s, c);
    return (p) => v3.rot(p, ax, ang);
  }
  /** A prism (coin or cube) as vertices and faces appended to a poly. */
  function prism(poly, c, r, z0, h, sides, rot = 0, color) {
    const b = poly.vertices.length;
    for (let k = 0; k < sides; k++) { const a = rot + TAU * k / sides; poly.vertices.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a), z0]); }
    for (let k = 0; k < sides; k++) { const a = rot + TAU * k / sides; poly.vertices.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a), z0 + h]); }
    const bottom = [], top = [];
    for (let k = sides - 1; k >= 0; k--) bottom.push(b + k);
    for (let k = 0; k < sides; k++) top.push(b + sides + k);
    poly.faces.push(bottom, top); poly.colors.push(color, color);
    for (let k = 0; k < sides; k++) { poly.faces.push([b + k, b + (k + 1) % sides, b + sides + (k + 1) % sides, b + sides + k]); poly.colors.push(color); }
  }
  const newPoly = () => ({ vertices: [], faces: [], colors: [] });
  const circlePts = (c, e1, e2, r, a0, a1, n) => Array.from({ length: n + 1 }, (_, i) => { const a = a0 + (a1 - a0) * i / n; return v3.add(c, v3.add(v3.scale(e1, r * Math.cos(a)), v3.scale(e2, r * Math.sin(a)))); });

  let FRAME = null, FIT = null;
  function drawStage(M) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 18, y: 18, w: W - 36, h: H - 36 } : safeRect(W, H, huds);
    const pts = S.scene === 'cone' ? coneBounds() : clockBounds(M);
    if (!dragging || !FIT) FIT = { area, pts };
    fitTo(FIT.pts, FIT.area, W, H);
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = [];
    const tags = [];
    const at = (p, html, cls, pri, dir) => { if (!thumb) tags.push({ p, html, cls, pri, dir }); };
    sc.begin();
    const hp = S.scene === 'cone' ? drawCone(M, at) : drawClocks(M, at);
    sc.end();
    const canDrag = !thumb && !TRV.still;
    const hq = canDrag && hp ? sc.p(hp) : null;
    if (hq) OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    placeHandle(hq);
    if (!thumb) {
      const cen = sc.p(S.scene === 'cone' ? [0, 0, 0] : [-0.4, 0.3, 0.5]);
      tags.forEach((t, k) => {
        const q = sc.p(t.p), dir = t.dir ? [t.dir[0], t.dir[1]] : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1];
        want(`t${k}`, q, t.html, t.cls, { pri: t.pri, dir, r: 12 });
      });
      placeLabels();
    }
    FRAME = { W, H, area: FIT.area, handle: hq ? { x: hq[0], y: hq[1] } : null, unit: sc.unit, cx: sc.cx, cy: sc.cy };
  }

  /* ---------- scene: two master flywheels ---------- */
  const wheelCentre = (who) => v3.add(TOWER[who], [0, 0, WHEEL_Z]);
  const sphereCentre = (eta) => (eta > 0 && SPHERE_R / eta <= D_MAX ? v3.add(wheelCentre('B'), [SPHERE_R / eta, 0, 0]) : null);
  const tipOf = (eta, beta) => v3.add(wheelCentre('B'), v3.scale(worldAxis(eta, beta), AXIS_L));
  function clockBounds() {
    const pts = box8([FLOOR.x[0], FLOOR.y[0], 0], [FLOOR.x[1], FLOOR.y[1], 0]);
    pts.push(...box8([RUNWAY.x[0], RUNWAY.y[0], 0], [RUNWAY.x[1], RUNWAY.y[1], 0]));
    pts.push(...box8([TOWER.A[0] + COL_DX - 0.3, -0.3, 0], [TOWER.B[0] + 0.5, 0.3, Math.max(WHEEL_Z + AXIS_L + 0.06, DIAL_Z + DIAL_R + 0.04)]));
    const m = sphereCentre(S.eta);
    if (m) pts.push(...box8(v3.add(m, [-SPHERE_R, -SPHERE_R, -SPHERE_R]), v3.add(m, [SPHERE_R, SPHERE_R, SPHERE_R])));
    return pts;
  }
  function drawWheel(who, axis, M, at) {
    const c = wheelCentre(who), tilt = tiltOf(axis), e1 = tilt([1, 0, 0]), e2 = tilt([0, 1, 0]), th = M.masterAngle;
    const rimPt = (rho, off, a) => v3.add(c, v3.add(v3.scale(axis, off), v3.add(v3.scale(e1, rho * Math.cos(a)), v3.scale(e2, rho * Math.sin(a)))));
    sc.surface(`wheel${who}`, (u, v) => {
      const a = v + th;
      if (u <= 1) return rimPt(u * WHEEL_R, -WHEEL_H / 2, a);
      if (u <= 2) return rimPt(WHEEL_R, -WHEEL_H / 2 + (u - 1) * WHEEL_H, a);
      return rimPt((3 - u) * WHEEL_R, WHEEL_H / 2, a);
    }, { u: [0, 3], v: [0, TAU], nu: 18, nv: 72, color: P.violet, grid: { every: [6, 6], color: P.ink, alpha: 0.32 }, pick: false });
    // the turning marker on the rim: the same angle on both wheels
    sc.bead(rimPt(WHEEL_R * 0.86, WHEEL_H / 2 + 0.01, th), { key: `spin${who}`, color: P.violet, r: 5, glow: 0.9 });
    return { c, e1, e2, rimPt };
  }
  function drawColumn(who, tau, frames, progress, rate, M, at) {
    const base = v3.add(TOWER[who], [COL_DX, 0, 0]), poly = newPoly(), shown = Math.min(frames, 12);
    for (let k = 0; k < shown; k++) prism(poly, base, COIN_R, k * COIN_STEP, COIN_H, 18, 0, P.cyan);
    if (shown) sc.poly(`coins${who}`, poly, { colors: poly.colors, edges: P.ink });
    // the guide of ten slots (the frames A completes in ten beats)
    sc.line([v3.add(base, [0, 0, 0]), v3.add(base, [0, 0, T_CLOCKS * COIN_STEP])], { color: P.dim, width: 1, alpha: 0.5 });
    const zNext = shown * COIN_STEP + COIN_H / 2, cNext = v3.add(base, [0, 0, zNext]);
    sc.circle(cNext, UP, COIN_R, { color: P.cyan, width: 1.4, fade: false, alpha: 0.85 });
    if (progress > 0.004) {
      const n = Math.max(2, Math.ceil(progress * 36));
      sc.fan([cNext, ...circlePts(cNext, [1, 0, 0], [0, 1, 0], COIN_R, PI / 2, PI / 2 - TAU * progress, n)], { fill: P.cyan, alpha: 0.5 });
    }
    // a completed frame pulses out from the top coin for the first quarter of the next frame
    if (frames >= 1 && rate > 0) {
      const w = progress / 0.25;
      if (w < 1) sc.circle(v3.add(base, [0, 0, (shown - 1) * COIN_STEP + COIN_H]), UP, COIN_R * (1 + 1.4 * w), { color: P.cyan, width: 2, fade: false, alpha: 1 - w });
    }
    return { base, top: v3.add(base, [0, 0, Math.max(zNext, COIN_STEP)]) };
  }
  function drawDials(who, phases, M, at, labelled) {
    const D = sc.facing(), up = v3.unit(v3.sub(UP, v3.scale(D, v3.dot(UP, D)))), right = v3.cross(up, D);
    const base = v3.add(TOWER[who], [COL_DX, 0, 0]);
    SUBS.forEach((s, k) => {
      const c = v3.add(base, [(k - 1) * DIAL_DX * 1.15, 0, DIAL_Z]), a = TAU * phases[k];
      const tip = v3.add(c, v3.add(v3.scale(up, DIAL_R * 0.86 * Math.cos(a)), v3.scale(right, DIAL_R * 0.86 * Math.sin(a))));
      sc.circle(c, D, DIAL_R, { color: P.cyan, width: 1.4, fade: false, alpha: 0.9 });
      sc.line([c, tip], { color: P.cyan, width: 1.8 });
      sc.bead(tip, { key: `dial${who}${k}`, color: P.cyan, r: 3.2, glow: 0.7 });
    });
    if (labelled) at(v3.add(base, [0, 0, DIAL_Z + DIAL_R]), SUBS.map((s) => `${L(s.zh, s.en)} ×${fix(s.f, s.f < 1 ? 2 : 0)}`).join(' · '), 'raw c-cy backed', 4, [0, -1]);
  }
  function drawClocks(M, at) {
    const phys = S.lens === 'phys', B = M.B;
    /* the address lattice: an opaque floor with one grid line per spacing ℓ_P */
    for (const [key, F] of [['floor', FLOOR], ['runway', RUNWAY]]) {
      sc.surface(key, (u, v) => [u, v, 0], { u: F.x, v: F.y, nu: Math.round((F.x[1] - F.x[0]) / CELL), nv: Math.round((F.y[1] - F.y[0]) / CELL),
        colors: [P.faint, P.lineHot], value: (u, v) => (v - RUNWAY.y[0]) / (FLOOR.y[1] - RUNWAY.y[0]), range: [0, 1], grid: { every: [1, 1], color: P.ink, alpha: 0.1 }, pick: false });
    }
    /* the holographic sphere of radius r_s, at the true distance r = r_s/η from the wheel centre of B */
    const m = sphereCentre(S.eta);
    if (m) {
      sc.surface('holo', (u, v) => v3.add(m, v3.scale([Math.sin(u) * Math.cos(v), Math.sin(u) * Math.sin(v), Math.cos(u)], SPHERE_R)),
        { u: [0, PI], v: [0, TAU], nu: 24, nv: 48, color: P.violet, alpha: 0.3, grid: { every: [3, 4], color: P.violet, alpha: 0.85 }, pick: false, occlude: false });
      sc.circle(m, UP, SPHERE_R, { color: P.violet, width: 1.6, alpha: 0.9 });
      const cB = wheelCentre('B'), toB = v3.unit(v3.sub(cB, m));
      sc.line([v3.add(m, v3.scale(toB, SPHERE_R)), cB], { color: P.violet, width: 1.1, alpha: 0.55 });
      at(v3.add(m, [0, 0, SPHERE_R]), phys ? `r<sub>s</sub> · r = ${fix(M.rOverRs, 2)} r<sub>s</sub>` : `${L('全息球', 'holographic sphere')} · η = ${pct(S.eta)}`, 'raw c-vi backed', 6, [0.3, -1]);
    }
    /* the two towers */
    const wA = drawWheel('A', M.axisA, M, at), wB = drawWheel('B', M.axisB, M, at);
    // the budget triangle of each wheel: violet axis (ν₀ = 1), cyan upright projection (the rate), magenta remainder
    for (const [who, w, ax, bud] of [['A', wA, M.axisA, M.A], ['B', wB, M.axisB, B]]) {
      const tip = v3.add(w.c, v3.scale(ax, AXIS_L)), foot = v3.add(w.c, [0, 0, AXIS_L * bud.rate]);
      if (bud.rate > 0.004) sc.tube(`rate${who}`, [w.c, foot], { color: P.cyan, width: 6, glow: 0.5, pick: false, occlude: false });
      sc.tube(`axis${who}`, [w.c, v3.add(w.c, v3.scale(ax, AXIS_L * 0.9))], { color: P.violet, width: 4, glow: 0.6, pick: false, occlude: false });
      sc.arrow(v3.add(w.c, v3.scale(ax, AXIS_L * 0.86)), tip, { color: P.violet, width: 2, headSize: 12 });
      if (who === 'B' && bud.load > 1e-4) {
        // the magenta legs: background along x (towards the sphere), then address hops along −y
        const mx = v3.add(foot, [AXIS_L * ax[0], 0, 0]);
        if (Math.abs(ax[0]) > 0.004) sc.tube('legBack', [foot, mx], { color: P.magenta, width: 3, glow: 0.4, pick: false, occlude: false });
        if (Math.abs(ax[1]) > 0.004) sc.tube('legMotion', [mx, tip], { color: P.magenta, width: 3, glow: 0.4, pick: false, occlude: false });
      }
      // the load sector on the top face of the wheel: background (solid) then motion (lighter); it does not turn
      if (bud.load > 1e-4) {
        const fc = v3.add(w.c, v3.scale(ax, WHEEL_H / 2 + 0.006)), r = WHEEL_R * 0.96;
        const a0 = 0, a1 = TAU * bud.background, a2 = TAU * bud.load;
        if (a1 > 1e-3) sc.fan([fc, ...circlePts(fc, w.e1, w.e2, r, a0, a1, Math.max(2, Math.ceil(a1 / 0.1)))], { fill: P.magenta, alpha: 0.82 });
        if (a2 - a1 > 1e-3) sc.fan([fc, ...circlePts(fc, w.e1, w.e2, r, a1, a2, Math.max(2, Math.ceil((a2 - a1) / 0.1)))], { fill: P.magenta, alpha: 0.42, color: P.magenta, width: 1 });
      }
    }
    /* background arcs: from the holographic sphere into round(20η) of the 20 slots of the window of B */
    if (m && M.arcs > 0) {
      for (let k = 0; k < M.arcs; k++) {
        const a = TAU * (k + 0.5) / SLOTS, slot = v3.add(wB.c, v3.add(v3.scale(wB.e1, WHEEL_R * Math.cos(a)), v3.scale(wB.e2, WHEEL_R * Math.sin(a))));
        const g = 2.39996 * k, q = 0.75 * Math.sqrt((k + 0.5) / SLOTS), dir = v3.unit([-1, q * Math.cos(g), q * Math.sin(g)]);
        const src = v3.add(m, v3.scale(dir, SPHERE_R)), mid = v3.add(v3.lerp(src, slot, 0.5), [0, -0.1, 0.12]);
        const curve = Array.from({ length: 13 }, (_, i) => { const s = i / 12; return v3.add(v3.add(v3.scale(src, (1 - s) * (1 - s)), v3.scale(mid, 2 * s * (1 - s))), v3.scale(slot, s * s)); });
        sc.line(curve, { color: P.magenta, width: 1.3, alpha: 0.9 });
      }
    }
    /* address hops: one magenta arc per lattice spacing crossed, laid out along the direction of motion of B */
    for (let k = 0; k < Math.min(M.hops, 10); k++) {
      const y0 = TOWER.B[1] - k * CELL, y1 = TOWER.B[1] - (k + 1) * CELL;
      sc.line(Array.from({ length: 9 }, (_, i) => { const s = i / 8; return [TOWER.B[0], y0 + (y1 - y0) * s, 0.004 + 0.05 * Math.sin(PI * s)]; }), { color: P.magenta, width: 1.6 });
    }
    if (M.hops > 0) at([TOWER.B[0], TOWER.B[1] - Math.min(M.hops, 10) * CELL, 0.05], phys ? `β = ${fix(S.beta, 2)} · ${M.hops} ℓ<sub>P</sub>` : `${L('地址跳跃', 'address hops')} ${M.hops}`, 'raw c-mg backed', 4, [0, 1]);
    /* the frame stacks */
    const colA = drawColumn('A', M.tauA, M.framesA, M.progressA, 1, M, at), colB = drawColumn('B', M.tauB, M.framesB, M.progressB, B.rate, M, at);
    at(colA.top, phys ? `τ<sub>A</sub> = ${fix(M.tauA, 2)}` : `${fix(M.tauA, 2)} ${L('帧', 'frames')}`, 'raw c-cy backed', 8, [-1, 0.2]);
    at(colB.top, phys ? `τ<sub>B</sub> = ${fix(M.tauB, 2)}` : (B.rate > 0 ? `${fix(M.tauB, 2)} ${L('帧', 'frames')}` : L('冻结 · 0 帧', 'frozen · 0 frames')), 'raw c-cy backed', 8, [0.4, -1]);
    if (S.sub) { drawDials('A', M.sub.phaseA, M, at, false); drawDials('B', M.sub.phaseB, M, at, true); }
    /* labels */
    at(v3.add(wA.c, [0, 0, -WHEEL_R * 0.7]), phys ? `A · r → ∞ · β = 0` : `A · ν₀ = ${fix(NU0, 3)}`, 'raw c-vi backed', 9, [-1, 0.6]);
    at(v3.add(wB.c, [0, 0, -WHEEL_R * 0.7]), phys ? `B · ${S.eta > 0 ? `r = ${fix(M.rOverRs, 2)} r<sub>s</sub>` : 'r → ∞'} · β = ${fix(S.beta, 2)}` : `B · ν₀ = ${fix(NU0, 3)}`, 'raw c-vi backed', 9, [0.2, 1]);
    const footB = v3.add(wB.c, [0, 0, AXIS_L * B.rate * 0.5]);
    at(footB, phys ? `dτ/dt = ${fix(B.rate, 4)}` : `${L('自停机', 'self-halting')} ${fix(B.rate, 4)}`, 'raw c-cy backed', 10, [-1, -0.2]);
    if (B.load > 1e-4) at(tipOf(S.eta, S.beta), phys ? `1 − (dτ/dt)² = ${pct(B.load, 2)}` : `${L('负载', 'load')} ${pct(B.load, Math.abs(B.load * 1000 - Math.round(B.load * 1000)) < 1e-6 ? 1 : 2)}`, 'raw c-mg backed', 7, [1, -0.6]);
    if (S.sub && M.sub.ratioOfRatios != null) at(v3.add(TOWER.B, [COL_DX + DIAL_DX * 1.15, 0, DIAL_Z]), `${L('比值之比', 'ratio of ratios')} ${fix(M.sub.ratioOfRatios, 4)}`, 'raw c-cy backed', 5, [1, 0.2]);
    return tipOf(S.eta, S.beta);
  }

  /* ---------- scene: the light-cone window ---------- */
  function coneBounds() {
    const R = S.N * CELL / 2, E = R + 3 * CELL, pts = [[0, 0, -R], [0, 0, R]];
    for (let k = 0; k < 48; k++) { const a = TAU * k / 48; pts.push([E * Math.cos(a), E * Math.sin(a), 0]); }
    return pts;
  }
  function drawCone(M, at) {
    const phys = S.lens === 'phys', N = S.N, R = N * CELL / 2, t = M.t, lat = lattice(N);
    const D = sc.facing(), phiD = Math.atan2(D[1], D[0]);
    const back = [phiD + PI / 2, phiD + 3 * PI / 2], front = [phiD - PI / 2, phiD + PI / 2];
    const lower = (u, v) => [u * R * Math.cos(v), u * R * Math.sin(v), -R + u * R];
    const upper = (u, v) => [u * R * Math.cos(v), u * R * Math.sin(v), R - u * R];
    /* the null cones: the far half opaque (an inner wall), the near half glass; the grid lines are light rays */
    for (const [k, f] of [['lo', lower], ['up', upper]]) {
      sc.surface(`cone${k}Back`, f, { u: [0, 1], v: back, nu: 12, nv: 36, colors: [P.faint, P.violet], value: (u) => u, range: [0, 1], grid: { every: [3, 4], color: P.ink, alpha: 0.28 }, pick: false });
      sc.surface(`cone${k}Front`, f, { u: [0, 1], v: front, nu: 6, nv: 36, color: P.violet, alpha: 0.04, grid: { every: [6, 4], color: P.violet, alpha: 0.35 }, pick: false, occlude: false });
    }
    /* the observer's worldline with its N + 1 master beats; beats already elapsed are violet, the current one amber */
    sc.tube('worldline', [[0, 0, -R], [0, 0, R]], { color: P.ink, width: 2, glow: 0.2, pick: false, occlude: false });
    const ticks = newPoly();
    for (let k = 0; k <= N; k++) prism(ticks, [0, 0], CELL * 0.32, -R + k * CELL - CELL * 0.04, CELL * 0.08, 10, 0, k <= t + 1e-9 ? P.violet : P.faint);
    sc.poly('ticks', ticks, { colors: ticks.colors, edges: false });
    const zNow = -R + t * CELL;
    sc.bead([0, 0, zNow], { key: 'now', color: P.amber, r: 5.5, glow: 0.8 });
    const rho = CELL * Math.min(t, N - t);
    if (rho > 1e-6) sc.circle([0, 0, zNow], UP, rho, { color: P.amber, width: 1.8, fade: false, alpha: 0.9 });
    /* the lattice of the waist: verified nodes cyan, nodes not yet echoed dim, nodes outside the window magenta */
    const nodes = newPoly(), hs = CELL * 0.27;
    let verified = 0;
    for (const n of lat.nodes) {
      const ok = n.inside && 4 * n.q <= t * t + 1e-9;
      if (ok) verified++;
      prism(nodes, [n.i * CELL, n.j * CELL], hs * Math.SQRT2, -hs, 2 * hs, 4, PI / 4, n.inside ? (ok ? P.cyan : P.dim) : P.magenta);
    }
    sc.poly('nodes', nodes, { colors: nodes.colors, edges: false });
    /* the ε ring: the last spacing of the window, 1/N of its diameter */
    sc.surface('epsBand', (u, v) => [u * Math.cos(v), u * Math.sin(v), 0.003], { u: [Math.max(0, R - CELL), R], v: [0, TAU], nu: 1, nv: 96, color: P.cyan, alpha: 0.32, pick: false, occlude: false });
    sc.tube('epsRing', circlePts([0, 0, 0.004], [1, 0, 0], [0, 1, 0], R, 0, TAU, 120), { color: P.cyan, width: 2.6, glow: 0.6, pick: false, occlude: false });
    sc.bead([0, 0, -R], { key: 'emit', color: P.violet, r: 4.5 });
    /* labels */
    at([0, 0, -R], phys ? L('发射事件 · t = 0', 'emission · t = 0') : L('发射 · 第 0 拍', 'emit · beat 0'), 'raw c-vi backed', 8, [1, 0.4]);
    at([0, 0, R], phys ? `${L('回声', 'echo')} · Δτ = ${N}/ν₀` : `${L('回声', 'echo')} · N<sub>ticks</sub> = ${N}`, 'raw c-am backed', 10, [1, -0.2]);
    const rimDir = [Math.cos(phiD - 0.9), Math.sin(phiD - 0.9), 0];
    at(v3.scale(rimDir, R), phys ? `R<sub>max</sub> = ½cΔτ = ${fix(N / 2, 1)} ℓ<sub>P</sub>` : `ε<sub>self,min</sub> = 1/N = ${fix(1 / N, 4)}`, 'raw c-cy backed', 9, null);
    const inDir = [Math.cos(phiD + 0.6), Math.sin(phiD + 0.6), 0];
    at(v3.scale(inDir, R * 0.45), phys ? `${verified} ${L('个格点已往返', 'nodes echoed')}` : `${L('往返核验', 'verified')} ${verified} / ${lat.interior}`, 'raw c-cy backed', 7, null);
    const outDir = [Math.cos(phiD + 0.2), Math.sin(phiD + 0.2), 0];
    at(v3.scale(outDir, R + 2 * CELL), phys ? L('类空区：窗口内无回声', 'spacelike: no echo in the window') : L('锥外：核验不到', 'outside: never verified'), 'raw c-mg backed', 6, null);
    at(lower(0.55, phiD - 1.9), `c = ℓ<sub>P</sub>ν₀`, 'raw c-vi backed', 5, null);
    return [0, 0, R];
  }

  /* ---------- the handle ---------- */
  const handle = $('handle');
  let dragging = null;
  function placeHandle(q) {
    handle.hidden = !q;
    if (!q) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
    handle.setAttribute('aria-label', S.scene === 'cone' ? L('拖动改变窗口拍数 N', 'Drag to change the window ticks N') : L(`拖动倾转 B 的飞轮（驱动 ${S.drive === 'both' ? 'β 与 η' : S.drive === 'beta' ? 'β' : 'η'}）`, `Drag to tilt the wheel of B (drives ${S.drive === 'both' ? 'β and η' : S.drive === 'beta' ? 'β' : 'η'})`));
  }
  function localXY(ev) { const b = stageEl.getBoundingClientRect(); return [ev.clientX - b.left - stageEl.clientLeft, ev.clientY - b.top - stageEl.clientTop]; }
  const dist2 = (p, x, y) => { const q = sc.p(p); return (q[0] - x) ** 2 + (q[1] - y) ** 2; };
  /** The state whose handle point projects nearest to the pointer, for the parameter the handle drives. */
  function dragTarget(ev) {
    const [x, y] = localXY(ev);
    if (S.scene === 'cone') {
      let best = S.N, bd = Infinity;
      for (let n = N_MIN; n <= N_MAX; n++) { const d = dist2([0, 0, n * CELL / 2], x, y); if (d < bd) { bd = d; best = n; } }
      return { N: best };
    }
    if (S.drive === 'beta') {
      let best = S.beta, bd = Infinity;
      for (let k = 0; k <= 99; k++) { const b = k / 100, d = dist2(tipOf(S.eta, b), x, y); if (d < bd) { bd = d; best = b; } }
      return { beta: best };
    }
    if (S.drive === 'eta') {
      let best = S.eta, bd = Infinity;
      for (let k = 0; k <= 1000; k++) { const e = k / 1000, d = dist2(tipOf(e, S.beta), x, y); if (d < bd) { bd = d; best = e; } }
      return { eta: best };
    }
    let best = [S.beta, S.eta], bd = Infinity;
    for (let i = 0; i <= 99; i++) for (let j = 0; j <= 100; j++) { const d = dist2(tipOf(j / 100, i / 100), x, y); if (d < bd) { bd = d; best = [i / 100, j / 100]; } }
    for (let j = -10; j <= 10; j++) { const e = clamp(best[1] + j / 1000, 0, 1), d = dist2(tipOf(e, best[0]), x, y); if (d < bd) { bd = d; best = [best[0], Math.round(e * 1000) / 1000]; } }
    return { beta: best[0], eta: best[1] };
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
    setParams(dragTarget(ev));
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    const k = ev.key;
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(k)) return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    const s = k === 'ArrowRight' || k === 'ArrowUp' ? 1 : -1;
    if (S.scene === 'cone') setParams({ N: S.N + s });
    else if (S.drive === 'beta') setParams({ beta: S.beta + 0.01 * s });
    else if (S.drive === 'eta') setParams({ eta: S.eta + 0.01 * s });
    else if (k === 'ArrowLeft' || k === 'ArrowRight') setParams({ beta: S.beta + 0.01 * s });
    else setParams({ eta: S.eta + 0.01 * s });
  });

  /* ---------- HUD, legend, readouts ---------- */
  const legendHtml = (items) => items.map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  function legendItems() {
    // the amber handle is hidden in stills and on the cover: the legend names it only where it is shown
    const live = !TRV.still;
    if (S.scene === 'cone') return [['vi', L('零锥 c = ℓ<sub>P</sub>ν₀ · 主钟拍', 'null cone c = ℓ<sub>P</sub>ν₀ · master beats')], ['cy', L('往返核验的格点 · ε 环', 'verified nodes · ε ring')], ['mg', L('锥外未达区', 'outside: unreached')], ['am', live ? L('当前拍 · 窗口手柄', 'current beat · window handle') : L('当前拍', 'current beat')]];
    const items = [['vi', L('主飞轮 ν₀ · 全息球', 'master wheels ν₀ · holographic sphere')], ['cy', L('钟率 · 固有时帧', 'rate · proper-time frames')], ['mg', L('负载：纠缠弧 · 地址跳跃', 'load: entanglement arcs · address hops')]];
    return live ? [...items, ['am', L('手柄', 'handle')]] : items;
  }
  function hudText(M) {
    const phys = S.lens === 'phys', B = M.B, c = M.cone;
    let big, sub;
    if (S.scene === 'cone') {
      big = phys ? `R<sub>max</sub> = ½cΔτ = ${fix(c.Rmax, 1)} ℓ<sub>P</sub>` : `N<sub>ticks</sub> = ν₀Δτ = ${c.N} · ε<sub>self,min</sub> = ${fix(c.eps, 4)}`;
      sub = phys ? `c = ℓ<sub>P</sub>ν₀ · Δτ = ${c.N}/ν₀ · ${L('已往返', 'echoed')} ${c.verified} / ${c.interior}` : `${L('往返核验', 'verified')} ${c.verified} / ${c.interior} · ${L('锥外', 'outside')} ${c.outside} · ν₀t = ${fix(M.t, 2)}`;
    } else {
      big = phys ? `B · dτ/dt = √(1 − r<sub>s</sub>/r)·√(1 − β²) = ${fix(B.rate, 4)}` : `B · dτ/dt = ${fix(B.rate, 4)} · ν₀ = ${fix(NU0, 3)}`;
      sub = phys
        ? `r = ${S.eta > 0 ? `${fix(M.rOverRs, 2)} r<sub>s</sub>` : '∞'} · β = ${fix(S.beta, 2)} · τ<sub>A</sub> = ${fix(M.tauA, 2)} · τ<sub>B</sub> = ${fix(M.tauB, 2)}`
        : `η = ${pct(B.background)} · (1 − η)β² = ${pct(B.motion)} · ${L('自停机', 'self-halting')} ${pct(B.self)}`;
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('legend').innerHTML = legendHtml(legendItems());
  }
  function drawText(M) {
    const phys = S.lens === 'phys', B = M.B, c = M.cone, I = instances(S.eta, S.beta);
    const set = (k, label, value) => { $(`k${k}`).innerHTML = label; $(`ro${k}`).innerHTML = value; };
    if (S.scene === 'cone') {
      $('kKey').innerHTML = L('精度下限 ε<sub>self,min</sub> = 1/N<sub>ticks</sub>', 'Precision floor ε<sub>self,min</sub> = 1/N<sub>ticks</sub>');
      $('roKey').textContent = fix(c.eps, 4); $('roKeySub').innerHTML = ` · N<sub>ticks</sub> = ${c.N}`;
      set(1, L('窗口拍数 N = ν₀Δτ', 'Window beats N = ν₀Δτ'), `${c.N}`);
      set(2, L('往返核验的格点', 'Round-trip verified nodes'), `${c.verified} / ${c.interior}`);
      set(3, L('画面里锥外的格点', 'Nodes outside the cone in view'), `${c.outside}`);
      set(4, 'R<sub>max</sub> = ½cΔτ', `${fix(c.Rmax, 1)} ℓ<sub>P</sub>`);
      set(5, L('每条记录至少 πħ/(4E) · 计数上界 N ≤ 4ET/(πħ)，T = Δτ', 'Each record at least πħ/(4E) · count bound N ≤ 4ET/(πħ), T = Δτ'), `${fix(I.record.tauMin, 3)} · ${c.N} ≤ ${fix(c.bound, 6)}`);
      set(6, L('零锥上为零的二次型（12 个方向）', 'Quadratic forms vanishing on the null cone (12 directions)'),
        `${L('解空间维数', 'solution dimension')} ${I.nullCone.nullity} · ∝ t² − x² − y² · ${L('偏差', 'deviation')} ${I.nullCone.residual.toExponential(1).replace('-', '−')}`);
      $('roNote').innerHTML = phys
        ? L('光速每拍走一个格距：发出后 d 拍到达距离 d 的格点，再过 d 拍回声回到观察者；窗口只有 N 拍，所以只有 d ≤ N/2 的格点能被核验。', 'Light crosses one spacing per beat: it reaches a node at distance d after d beats and its echo is back d beats later; the window has N beats, so only nodes with d ≤ N/2 can be verified.')
        : L('窗口里至多 N 拍，直径是 N 格：一格就是能分辨的最小份额 1/N。拍数翻倍，下限减半；拍数有限，下限不为零。', 'A window holds at most N beats and its diameter is N spacings: one spacing is the smallest share it resolves, 1/N. Double the beats and the floor halves; with finitely many beats it is never zero.');
    } else {
      $('kKey').innerHTML = L('B 的钟率 dτ/dt = √((1 − η)(1 − β²))', 'Rate of B, dτ/dt = √((1 − η)(1 − β²))');
      $('roKey').textContent = fix(B.rate, 4); $('roKeySub').innerHTML = ` · A = ${fix(M.A.rate, 4)}`;
      set(1, L('主频 ν₀：A · B', 'Master frequency ν₀: A · B'), `${fix(NU0, 3)} · ${fix(NU0, 3)}`);
      set(2, L('自停机通道 (1 − η)(1 − β²)', 'Self-halting channel (1 − η)(1 − β²)'), fix(B.self, 6));
      set(3, L('负载 η + (1 − η)β²', 'Load η + (1 − η)β²'), fix(B.load, 6));
      set(4, L('三个通道之和', 'Sum of the three channels'), fix(B.sum, 6));
      set(5, L(`固有时帧 A / B（ν₀t = ${fix(M.t, 2)}）`, `Proper-time frames A / B (ν₀t = ${fix(M.t, 2)})`), `${fix(M.tauA, 2)} / ${fix(M.tauB, 2)} · ${L('完成', 'completed')} ${M.framesA} / ${M.framesB}`);
      if (S.sub) set(6, L('子时钟 B/A 与比值之比', 'Sub-clocks B/A and ratio of ratios'), `${M.sub.scale.map((x) => fix(x, 4)).join(' · ')} · ${M.sub.ratioOfRatios == null ? '—' : fix(M.sub.ratioOfRatios, 4)}`);
      else set(6, L('快度 r = artanh β · cosh r · r/r<sub>s</sub>', 'Rapidity r = artanh β · cosh r · r/r<sub>s</sub>'), `${fix(I.rapidity.r, 6)} · ${fix(I.rapidity.cosh, 6)} · ${S.eta > 0 ? fix(M.rOverRs, 2) : '∞'}`);
      $('roNote').innerHTML = phys
        ? L('静止观察者的钟率 √(1 − r<sub>s</sub>/r) 再乘运动的 √(1 − β²)；η = 1 是 r → r<sub>s</sub> 的极限，那里的静止钟率趋于 0。', 'The static rate √(1 − r<sub>s</sub>/r) times the motion factor √(1 − β²); η = 1 is the limit r → r<sub>s</sub>, where the static rate tends to 0.')
        : L('两只紫色飞轮每拍都转一整圈；青色是转轴落在固有时轴上的那一段，品红是落在别处的那一份。钟率² + 负载 = 1。', 'Both violet wheels turn once per beat; cyan is the part of the axis on the proper-time axis, magenta the share that falls elsewhere. Rate² + load = 1.');
    }
    $('pillRate').innerHTML = S.scene === 'cone' ? `ε <strong>${fix(c.eps, 4)}</strong>` : `dτ/dt <strong>${fix(B.rate, 4)}</strong>`;
    $('hint').innerHTML = L('拖琥珀手柄 · 拖空白处转视角', 'drag the amber handle · drag empty space to orbit');
    $('formula').innerHTML = S.scene === 'cone' ? 'R<sub>max</sub> = ½cΔτ · ε = 1/N' : 'η + (1 − η)β² + (1 − η)(1 − β²) = 1';
  }

  /* ---------- strip plots ---------- */
  const PAD = [40, 12, 10, 22];
  function drawPlots(M) {
    const ca = $('plotA'), cb = $('plotB');
    if (TRV.thumbMode) return;
    if (S.scene === 'cone') {
      const N = S.N, lat = lattice(N);
      if (ca.clientWidth && ca.clientHeight) {
        $('plotATitle').textContent = L('回声一圈圈回来：被核验的格点数', 'Echoes return ring by ring: verified nodes');
        const g = kit.plot(ca, { x: [0, N], y: [0, lat.interior * 1.15], pad: PAD });
        g.axes({ xTicks: [0, N / 2, N].map((x) => [x, fix(x, x % 1 ? 1 : 0)]), yTicks: [0, lat.interior], xLabel: 'ν₀t' });
        const pts = [];
        for (let k = 0; k <= 200; k++) { const x = N * k / 200; pts.push([x, verifiedAt(lat, x)]); }
        g.line(pts, P.cyan, { width: 2 });
        g.hline(lat.interior, P.cyan, { alpha: 0.6, dash: [4, 3] });
        g.vline(M.t, P.amber, { alpha: 0.85 });
        g.dot(M.t, M.cone.verified, P.amber, 4);
        g.text(N * 0.02, lat.interior * 1.07, `${L('窗口内', 'inside')} ${lat.interior}`, P.cyan, { align: 'left', size: 10 });
      }
      $('plotAMeta').textContent = `${M.cone.verified} / ${lat.interior}`;
      if (cb.clientWidth && cb.clientHeight) {
        $('plotBTitle').textContent = L('拍数越多，精度下限越低：ε = 1/N', 'More beats, a lower floor: ε = 1/N');
        const g = kit.plot(cb, { x: [N_MIN, N_MAX], y: [0, 0.27], pad: PAD });
        g.axes({ xTicks: [4, 10, 20, 30, 40], yTicks: [0, 0.05, 0.1, 0.2], xLabel: 'N' });
        g.line(Array.from({ length: 73 }, (_, i) => { const n = N_MIN + i * (N_MAX - N_MIN) / 72; return [n, 1 / n]; }), P.cyan, { width: 2 });
        g.vline(N, P.amber, { alpha: 0.8 });
        g.dot(N, 1 / N, P.amber, 4.4);
        g.text(N + 0.8, 1 / N + 0.03, `1/${N} = ${fix(1 / N, 4)}`, P.amber, { align: 'left', size: 10 });
      }
      $('plotBMeta').textContent = `ε = ${fix(1 / N, 4)}`;
      return;
    }
    const B = M.B;
    if (ca.clientWidth && ca.clientHeight) {
      $('plotATitle').textContent = L('主频相同，帧数不同', 'The same master clock, different frame counts');
      const g = kit.plot(ca, { x: [0, T_CLOCKS], y: [0, T_CLOCKS * 1.12], pad: PAD });
      g.axes({ xTicks: [0, 2, 4, 6, 8, 10], yTicks: [0, 5, 10], xLabel: 'ν₀t' });
      g.line([[0, 0], [T_CLOCKS, T_CLOCKS]], P.violet, { width: 4, alpha: 0.45 });
      g.line([[0, 0], [T_CLOCKS, T_CLOCKS]], P.cyan, { width: 1.6 });
      g.line([[0, 0], [T_CLOCKS, B.rate * T_CLOCKS]], P.cyan, { width: 2, dash: [5, 3] });
      g.vline(M.t, P.amber, { alpha: 0.85 });
      g.dot(M.t, M.tauA, P.cyan, 3.6); g.dot(M.t, M.tauB, P.amber, 4.2);
      g.text(0.25, T_CLOCKS * 1.05, `ν₀t (A = B) · τ_{A}`, P.violet, { align: 'left', size: 10 });
      g.text(T_CLOCKS * 0.64, Math.max(B.rate * T_CLOCKS * 0.64 - 1.1, 0.9), `τ_{B} = ${fix(B.rate, 4)} ν₀t`, P.cyan, { align: 'left', size: 10 });
    }
    $('plotAMeta').textContent = `τA ${fix(M.tauA, 2)} · τB ${fix(M.tauB, 2)}`;
    if (cb.clientWidth && cb.clientHeight) {
      const drv = S.drive;
      $('plotBTitle').textContent = drv === 'beta' ? L('钟率随 β：√(1 − η)·√(1 − β²)', 'Rate against β: √(1 − η)·√(1 − β²)') : drv === 'eta' ? L('钟率随 η：√(1 − η)·√(1 − β²)', 'Rate against η: √(1 − η)·√(1 − β²)') : L('钟率随 β 与 η', 'Rate against β and η');
      const g = kit.plot(cb, { x: [0, 1], y: [0, 1.12], pad: PAD });
      g.axes({ xTicks: [0, 0.25, 0.5, 0.75, 1].map((x) => [x, fix(x, 2)]), yTicks: [0, 0.5, 1], xLabel: drv === 'beta' ? 'β' : drv === 'eta' ? 'η' : 'β · η' });
      const xs = Array.from({ length: 101 }, (_, i) => i / 100);
      if (drv !== 'eta') {
        g.line(xs.map((x) => [x, budget(S.eta, Math.min(x, 0.999999)).rate]), P.cyan, { width: 2 });
        g.line(xs.map((x) => [x, budget(S.eta, Math.min(x, 0.999999)).load]), P.magenta, { width: 1.6, dash: [4, 3] });
        g.dot(S.beta, B.rate, P.amber, 4.4);
      }
      if (drv !== 'beta') {
        g.line(xs.map((x) => [x, budget(x, S.beta).rate]), P.cyan, { width: 2, alpha: drv === 'both' ? 0.6 : 1 });
        g.line(xs.map((x) => [x, budget(x, S.beta).load]), P.magenta, { width: 1.6, dash: [4, 3], alpha: drv === 'both' ? 0.6 : 1 });
        g.dot(S.eta, B.rate, P.amber, 4.4);
      }
      g.text(0.02, 1.06, 'dτ/dt', P.cyan, { align: 'left', size: 10 });
      g.text(0.98, 1.06, L('负载 = 1 − (dτ/dt)²', 'load = 1 − (dτ/dt)²'), P.magenta, { align: 'right', size: 10 });
    }
    $('plotBMeta').textContent = `dτ/dt ${fix(B.rate, 4)} · ${L('负载', 'load')} ${fix(B.load, 4)}`;
  }

  const paint = kit.painter(() => {
    const M = model();
    hudText(M); TRV.hudFit();
    drawStage(M); drawText(M); drawPlots(M);
  }, [stageEl, $('plotA'), $('plotB')]);

  /* ---------- the rail: master beats ν₀t ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: T_CLOCKS, t: T_CLOCKS, rate: RATE.clocks, step: 1,
    format: (t, max) => `ν₀t ${fix(t, 2)} <small>/ ${fix(max, 0)} ${L('拍', 'beats')}</small>`,
    onChange: () => paint()
  });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });

  /* ---------- controls ---------- */
  let transition = null, booting = true;
  /** The boot card of a whole lab inside a book plays once the stage is at least half in view and pauses while it is
      out of view; any move of the reader disconnects the observer, so it never starts the clock after a touch. */
  let bootIO = null;
  const stopBootPlay = () => { if (bootIO) { bootIO.disconnect(); bootIO = null; } };
  function bootAutoplay() {
    stopBootPlay();
    if (TRV.still) return;
    if (!TRV.embed || !window.IntersectionObserver) { clock.play(); return; }
    let started = false;
    const io = new IntersectionObserver((entries) => {
      if (bootIO !== io) return;
      const seen = entries[entries.length - 1].intersectionRatio >= 0.5;
      if (seen && !started) { started = true; clock.play(); } else if (!seen && clock.playing) clock.pause();
    }, { threshold: [0, 0.5, 1] });
    bootIO = io;
    io.observe(stageEl);
  }
  for (const id of ['play', 'rew']) $(id).addEventListener('click', stopBootPlay, true);
  $('now').addEventListener('input', stopBootPlay, true);
  document.addEventListener('keydown', (ev) => { if ([' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) stopBootPlay(); }, true);
  const leave = () => { stopBootPlay(); if (transition) transition.cancel(); transition = null; cards.mark(null); clock.pause(); };

  /** Set β, η or N (clamped and rounded to the steps of their sliders) and repaint. */
  function setParams(o) {
    if (o.beta != null) { S.beta = Math.round(clamp(o.beta, 0, 0.99) * 100) / 100; fBeta.set(S.beta); }
    if (o.eta != null) { S.eta = Math.round(clamp(o.eta, 0, 1) * 1000) / 1000; fEta.set(S.eta); }
    if (o.N != null) {
      S.N = Math.round(clamp(o.N, N_MIN, N_MAX)); fN.set(S.N);
      if (S.scene === 'cone') { clock.setMax(S.N, true); clock.rate = RATE.cone * S.N / 20; }
    }
    paint();
  }
  function setScene(scene, ms) {
    S.scene = scene === 'cone' ? 'cone' : 'clocks';
    sceneChips.set(S.scene, true);
    clock.rate = S.scene === 'cone' ? RATE.cone * S.N / 20 : RATE.clocks;
    clock.setMax(S.scene === 'cone' ? S.N : T_CLOCKS, true);
    sc.view(VIEWS[S.scene], ms);
    paint();
  }
  const fBeta = kit.field($('beta'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.beta = clamp(v, 0, 0.99); paint(); } });
  const fEta = kit.field($('eta'), { fmt: (v) => fix(v, 3), onInput: (v) => { leave(); S.eta = clamp(v, 0, 1); paint(); } });
  const fN = kit.field($('nTicks'), { fmt: (v) => String(Math.round(v)), onInput: (v) => { leave(); setParams({ N: v }); } });
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v, 600); });
  const lensChips = kit.chips($('lensChips'), 'lens', (v) => { S.lens = v === 'phys' ? 'phys' : 'clock'; paint(); });
  const driveChips = kit.chips($('driveChips'), 'drive', (v) => { S.drive = ['beta', 'eta', 'both'].includes(v) ? v : 'eta'; paint(); });
  const subChips = kit.chips($('subChips'), 'sub', (v) => { S.sub = v === 'on'; paint(); });
  kit.keys({
    l: () => { S.lens = S.lens === 'phys' ? 'clock' : 'phys'; lensChips.set(S.lens, true); paint(); },
    c: () => { leave(); setScene(S.scene === 'cone' ? 'clocks' : 'cone', 600); }
  });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'light-cone-precision-floor': { scene: 'cone', N: 20, beta: 0, eta: 0, drive: 'eta', sub: false, play: true, still: 'end' },
    'kinematic-address-split': { scene: 'clocks', N: 20, beta: 0.8, eta: 0, drive: 'beta', sub: false, play: true, still: 'end' },
    'holographic-mass-load': { scene: 'clocks', N: 20, beta: 0, eta: 0.4, drive: 'eta', sub: false, play: true, still: 'end' },
    'equivalence-dual-flywheel': { scene: 'clocks', N: 20, beta: 0.6, eta: 0.36, drive: 'both', sub: true, play: true, still: 'end' },
    'horizon-saturation-lock': { scene: 'clocks', N: 20, beta: 0, eta: 1, drive: 'eta', sub: false, play: true, still: 'end' }
  };
  const NOTES = {
    'light-cone-precision-floor': ['N = 20 拍：雷达脉冲从下顶点发出，第 20 拍在上顶点收到回声。紫色光锥里 R<sub>max</sub> = ½cΔτ = 10 格以内的 317 个格点随回声一圈圈亮成青色；锥外的品红格点在这个窗口里永远核验不到。一格是直径的 1/20：ε<sub>self,min</sub> = 1/N = 0.0500。', 'N = 20 beats: the radar pulse leaves the lower apex and its echo returns to the upper apex at beat 20. The 317 nodes within R<sub>max</sub> = ½cΔτ = 10 spacings inside the violet cone turn cyan ring by ring as their echoes return; the magenta nodes outside can never be verified in this window. One spacing is 1/20 of the diameter: ε<sub>self,min</sub> = 1/N = 0.0500.'],
    'kinematic-address-split': ['β = 0.80：两只紫色主飞轮转得一样快，ν₀ = 1.000。B 的转轴朝运动方向倾斜，品红的地址跳跃占去 β² = 64.0%，竖直方向只剩青色钟率 0.6000：主钟走 10 拍，A 叠起 10 枚帧币，B 只叠起 6 枚。', 'β = 0.80: both violet master wheels turn equally fast, ν₀ = 1.000. The axis of B leans towards its motion, magenta address hops take β² = 64.0%, and only the cyan rate 0.6000 is left upright: in 10 master beats A stacks 10 frame coins, B only 6.'],
    'holographic-mass-load': ['r = 2.50 r<sub>s</sub>：η<sub>info</sub> = r<sub>s</sub>/r = 0.400。全息球伸出 8 条品红纠缠弧，穿过 B 窗口 20 格里的 8 格，转轴朝球倾斜，负载 40.0%；两只主飞轮仍同速，B 的青色钟率 √0.60 = 0.7746：10 拍里完成 7.75 帧。', 'r = 2.50 r<sub>s</sub>: η<sub>info</sub> = r<sub>s</sub>/r = 0.400. The holographic sphere sends 8 magenta entanglement arcs through 8 of the 20 slots of the window of B, the axis leans towards the sphere, load 40.0%; both master wheels still turn alike, and the cyan rate of B is √0.60 = 0.7746: 7.75 frames in 10 beats.'],
    'equivalence-dual-flywheel': ['η = 0.360、β = 0.600：负载 0.36 + 0.64 × 0.36 = 59.04%，钟率 √(0.64 × 0.64) = 0.6400。B 里的神经、原子、光尺三只子时钟都乘同一个 0.6400，B 内部两两之比与 A 内部相同，比值之比 = 1.0000。', 'η = 0.360, β = 0.600: load 0.36 + 0.64 × 0.36 = 59.04%, rate √(0.64 × 0.64) = 0.6400. The neural, atomic and photon-ruler sub-clocks in B all scale by the same 0.6400, so their mutual ratios in B equal those in A: ratio of ratios = 1.0000.'],
    'horizon-saturation-lock': ['η = 1.000（r → r<sub>s</sub>）：B 的转轴放平，20 条品红弧占满窗口，负载 100%；紫色主飞轮照样每拍转一整圈，青色钟率 0.0000：A 叠起 10 枚帧币，B 一枚也没有。', 'η = 1.000 (r → r<sub>s</sub>): the axis of B lies flat, 20 magenta arcs fill the window, load 100%; the violet master wheel still turns once per beat, the cyan rate is 0.0000: A stacks 10 frame coins, B none.']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'light-cone-precision-floor': ['N = 20：光锥里 10 格以内的 317 个格点亮成青色；ε = 1/N = 0.0500。', 'N = 20: the 317 nodes within 10 spacings inside the cone turn cyan; ε = 1/N = 0.0500.'],
    'kinematic-address-split': ['β = 0.80：主飞轮同速，品红地址跳跃占 64.0%；10 拍里 A 得 10 帧，B 得 6 帧。', 'β = 0.80: same master speed, address hops take 64.0%; in 10 beats A gets 10 frames, B gets 6.'],
    'holographic-mass-load': ['η = 0.400：品红纠缠弧占 B 窗口的 40.0%；钟率 0.7746，10 拍得 7.75 帧。', 'η = 0.400: magenta arcs take 40.0% of the window of B; rate 0.7746, 7.75 frames in 10 beats.'],
    'equivalence-dual-flywheel': ['负载 59.04%，钟率 0.6400；三只子时钟同乘 0.6400，比值之比 1.0000。', 'Load 59.04%, rate 0.6400; all three sub-clocks scale by 0.6400, ratio of ratios 1.0000.'],
    'horizon-saturation-lock': ['η = 1：主飞轮照转，负载 100%，B 的帧柱冻结在 0。', 'η = 1: the master wheel turns on, load 100%, the frames of B freeze at 0.']
  };
  const stillOf = (p) => (p.still === 'end' ? (p.scene === 'cone' ? p.N : T_CLOCKS) : p.still);
  function applyPreset(id) {
    const p = PRESETS[id];
    stopBootPlay();
    clock.pause();
    if (transition) transition.cancel();
    transition = null;
    S.drive = p.drive; driveChips.set(p.drive, true);
    S.sub = p.sub; subChips.set(p.sub ? 'on' : 'off', true);
    S.N = p.N; fN.set(p.N);
    setScene(p.scene, booting || TRV.still ? 0 : 600);
    const from = { beta: S.beta, eta: S.eta };
    const finish = () => { S.beta = p.beta; S.eta = p.eta; fBeta.set(p.beta); fEta.set(p.eta); paint(); };
    if (booting || TRV.still) finish();
    else transition = kit.tween(550, (e) => { S.beta = from.beta + (p.beta - from.beta) * e; S.eta = from.eta + (p.eta - from.eta) * e; fBeta.set(S.beta); fEta.set(S.eta); paint(); }, finish);
    // a figure the book cites, a still and a whole page open on the still frame; ▶ replays from the start
    const parked = TRV.still || TRV.figure || (booting && !TRV.embed);
    clock.set(parked ? stillOf(p) : 0);
    if (p.play && !parked) { if (booting) bootAutoplay(); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖琥珀手柄或滑块改 β、η 与 N，换透镜或场景。随时可以再选一张卡。', 'Free play: drag the amber handle or the sliders to change β, η and N, switch the lens or the scene. Pick a card again at any time.']
  });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.CLOCK_DILATION_DEBUG = Object.freeze({
    get state() {
      const M = model(), I = instances(S.eta, S.beta);
      return JSON.parse(JSON.stringify({
        preset: cards.current, scene: S.scene, lens: S.lens, drive: S.drive, sub: S.sub,
        t: clock.t, max: clock.max, playing: clock.playing, rate: clock.rate,
        beta: S.beta, eta: S.eta, N: S.N, nu0: NU0, nuA: NU0, nuB: NU0, masterAngleA: M.masterAngle, masterAngleB: M.masterAngle, turns: M.turns,
        A: M.A, B: M.B, axisA: M.axisA, axisB: M.axisB, budgetAxis: M.budgetAxis, tauA: M.tauA, tauB: M.tauB, framesA: M.framesA, framesB: M.framesB, progressB: M.progressB,
        hops: M.hops, arcs: M.arcs, slots: SLOTS, rOverRs: Number.isFinite(M.rOverRs) ? M.rOverRs : null,
        sphere: sphereCentre(S.eta) ? { centre: sphereCentre(S.eta), radius: SPHERE_R, wheelB: wheelCentre('B') } : null,
        subclocks: { frequencies: SUBS.map((s) => s.f), ...M.sub }, cone: M.cone,
        leanInstances: I, camera: Object.assign({}, sc.cam),
        handle: FRAME ? FRAME.handle : null, labels: PLACED, stageFrame: FRAME
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock). */
    setState(o) {
      leave();
      if (o.scene != null) setScene(o.scene, 0);
      if (o.lens != null) { S.lens = o.lens === 'phys' ? 'phys' : 'clock'; lensChips.set(S.lens, true); }
      if (o.drive != null) { S.drive = o.drive; driveChips.set(o.drive, true); }
      if (o.sub != null) { S.sub = !!o.sub; subChips.set(S.sub ? 'on' : 'off', true); }
      setParams(o);
      if (o.t != null) clock.set(clamp(o.t, 0, clock.max));
      paint();
    },
    /** Viewport coordinates of the handle (for pointer tests), or null when hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates of the axis tip of B for (η, β), or of the reception apex for N: drag targets. */
    tipPoint(eta, beta) { const b = stageEl.getBoundingClientRect(), q = sc.p(tipOf(eta, beta)); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] }; },
    apexPoint(N) { const b = stageEl.getBoundingClientRect(), q = sc.p([0, 0, N * CELL / 2]); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] }; }
  });
  window.TRV_THUMB = () => { cards.pick('holographic-mass-load'); clock.pause(); clock.set(T_CLOCKS); sc.view([VIEWS.clocks[0], VIEWS.clocks[1], 1], 0); paint.now(); };
  cards.pick(cards.initial('holographic-mass-load'));
  booting = false;
  paint();
})();
