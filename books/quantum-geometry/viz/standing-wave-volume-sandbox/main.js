/* VOLUME//STANDING · 相位积分驻波成体 · Phase-integral standing waves and emergent volume
   One lit-solid stage (kit.solid) on the unit sphere: the minimal spherical sector ΔT_ε with A = (1, 0, 0),
   B = (cos ε, sin ε, 0), C = (cos ε, 0, sin ε) (a right angle at A, both legs ε). Five scenes share the sector:
     point   M comparison paths leave A and converge on C; path k arrives with phase kδ (δ = n·Δγ, a model) and a
             column of phasors rises above C (a Hopf-like helix) to a crown where Ψ_M = (1/M) Σ e^{ikδ} is drawn
     loop    the loop Γ₁ ∘ Γ₂⁻¹ of the first and last path, and a ring round C carrying the density ρ_M(φ) of the
             arrival phases; |Ψ_M|² equals the mean cosine of all pair loop phases γ_B = (a − b)δ
     void    the same at a point x outside the sector, at the golden step: the arrivals fill the circle, Ψ_M → 0
     echo    the boundary A → B → C → A walked M times (a coil); the echoes of each turn at A; the Z/12Z sieve ring
     volume  63 candidate points: 27 cells tiling the sector (step = the slider's δ) and 36 background points with
             fixed incommensurate steps Δγ_j; the cells scale with |Ψ_M|^{2/3}, the background beads with |Ψ_M|
   The rail is the gauge phase θ = 2πt at the end point x: every arrival turns by θ, |Ψ_M| does not move; in the
   volume scene the shells breathe in alternate phase (a model of a standing mode).
   Every number is computed here; nothing is tabulated. Read-only probe: window.STANDING_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, sgn, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180;
  const GOLD = (Math.sqrt(5) - 1) / 2, DGOLD = TAU * GOLD, GOLD_DETUNE = DGOLD / PI;   // Δγ_gold = 2π(√5 − 1)/2
  const EPS0 = 15, EPS1 = 90, M0 = 3, M1 = 64, NBIN = 24;
  const N_SUB = 3, SHRINK = 0.55, STANDING = 0.25, LIFT = 1.012;
  const CORE_SHELLS = [[0, 0.6], [0.6, 0.85], [0.85, 1]], RING_SHELLS = { up: [0.35, 0.8], dn: [0.8, 1.15] }, CAP_SHELL = [1, 1.25];
  const H12 = [0, 3, 6, 9], ANN12 = [0, 4, 8];

  /* ---------- complex numbers [re, im] and 2 × 2 complex matrices [[a, b], [c, d]] ---------- */
  const Z = {
    add: (a, b) => [a[0] + b[0], a[1] + b[1]], sub: (a, b) => [a[0] - b[0], a[1] - b[1]],
    mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
    conj: (a) => [a[0], -a[1]], scale: (a, k) => [a[0] * k, a[1] * k], abs: (a) => Math.hypot(a[0], a[1]),
    exp: (t) => [Math.cos(t), Math.sin(t)], inv: (a) => { const d = a[0] * a[0] + a[1] * a[1]; return [a[0] / d, -a[1] / d]; },
    arg: (a) => Math.atan2(a[1], a[0])
  };
  const mm = (X, Y) => [0, 1].map((i) => [0, 1].map((j) => Z.add(Z.mul(X[i][0], Y[0][j]), Z.mul(X[i][1], Y[1][j]))));
  const tr2 = (X) => Z.add(X[0][0], X[1][1]);
  /** The qubit projector (I + r·σ)/2 of a Bloch vector r. */
  const proj = (r) => [[[(1 + r[2]) / 2, 0], [r[0] / 2, -r[1] / 2]], [[r[0] / 2, r[1] / 2], [(1 - r[2]) / 2, 0]]];
  /** A spinor whose Bloch vector is the unit vector r. */
  function spinor(r) { const th = Math.acos(clamp(r[2], -1, 1)), ph = Math.atan2(r[1], r[0]); return [[Math.cos(th / 2), 0], Z.scale(Z.exp(ph), Math.sin(th / 2))]; }
  /** ψψ† (Matrix.vecMulVec ψ (star ψ)). */
  const outer = (s) => [0, 1].map((i) => [0, 1].map((j) => Z.mul(s[i], Z.conj(s[j]))));
  /** ⟨a|b⟩ = Σ conj(a_k) b_k (star a ⬝ᵥ b). */
  const inner = (a, b) => Z.add(Z.mul(Z.conj(a[0]), b[0]), Z.mul(Z.conj(a[1]), b[1]));

  /* ---------- the coherence of M arrivals ---------- */
  /** Ψ_M(δ) = (1/M) Σ_{k<M} e^{i(kδ + θ)}, summed term by term. */
  function psiSum(M, d, th = 0) { let re = 0, im = 0; for (let k = 0; k < M; k++) { re += Math.cos(k * d + th); im += Math.sin(k * d + th); } return [re / M, im / M]; }
  /** (1/M²) Σ_{a,b} cos((a − b)δ): the mean cosine of the pair loop phases γ_B = (a − b)δ. */
  function pairAverage(M, d) { let s = 0; for (let a = 0; a < M; a++) for (let b = 0; b < M; b++) s += Math.cos((a - b) * d); return s / (M * M); }
  /** |sin(Mδ/2) / (M sin(δ/2))|, with the limit 1 where δ is a multiple of 2π. */
  function closedAbs(M, d) { const s = Math.sin(d / 2); return Math.abs(s) < 1e-12 ? 1 : Math.abs(Math.sin(M * d / 2) / (M * s)); }
  /** The lock of phase_locked_overlap_is_rotated_real on Ψ_M: phase = e^{i(M−1)δ/2}, Ψ_M = phase · r. */
  function lockOf(M, d, psi) {
    const phase = Z.exp((M - 1) * d / 2), r = Z.mul(psi, Z.conj(phase));
    const residual = Z.abs(Z.sub(Z.conj(psi), Z.mul(Z.mul(Z.inv(phase), Z.inv(phase)), psi)));
    return { phase, r: r[0], imag: r[1], residual, angle: (M - 1) * d / 2 };
  }

  /* ---------- the sector ΔT_ε ---------- */
  const solidAngle = (a, b, c) => 2 * Math.atan2(Math.abs(v3.dot(a, v3.cross(b, c))), 1 + v3.dot(a, b) + v3.dot(b, c) + v3.dot(c, a));
  function sectorAt(epsDeg) {
    const e = epsDeg * DEG, c = Math.cos(e), s = Math.sin(e);
    const A = [1, 0, 0], B = [c, s, 0], C = [c, 0, s], O = [0, 0, 0];
    const triple = v3.dot(A, v3.cross(B, C)), dots = 1 + v3.dot(A, B) + v3.dot(B, C) + v3.dot(C, A);
    const omega = 2 * Math.atan(Math.tan(e / 2) ** 2), omegaVos = 2 * Math.atan2(Math.abs(triple), dots);
    // the three-state Bargmann invariant three ways: projectors (I + r·σ)/2, ψψ† of spinors, and overlaps round the loop
    const trace = tr2(mm(mm(proj(A), proj(B)), proj(C)));
    const sA = spinor(A), sB = spinor(B), sC = spinor(C);
    const traceSpinor = tr2(mm(mm(outer(sA), outer(sB)), outer(sC)));
    const overlaps = Z.mul(Z.mul(inner(sA, sB), inner(sB, sC)), inner(sC, sA));
    const bloch = [dots / 4, triple / 4];
    return { epsDeg, e, s, c, A, B, C, O, triple, dots, omega, omegaVos, vSector: omega / 3, vTetra: Math.abs(triple) / 6,
      trace, traceSpinor, overlaps, bloch, mid: v3.unit(v3.add(v3.add(A, B), C)), arcAC: Math.acos(clamp(v3.dot(A, C), -1, 1)) };
  }

  /* ---------- the candidate lattice (a model): barycentric thirds, three shells, and a ring of background ---------- */
  const frac = (x) => x - Math.floor(x);
  /** The background step of point j: 2π·(0.176 + 0.064·frac((j + 1)α)), between 1.106 and 1.508 rad. */
  const bgStep = (j) => TAU * (0.176 + 0.064 * frac((j + 1) * GOLD));
  const latCache = new Map();
  function latticeAt(G) {
    const key = G.epsDeg.toFixed(5);
    if (latCache.has(key)) return latCache.get(key);
    const n = N_SUB;
    const bary = (i, j) => {
      let x = [1 - (i + j) / n, i / n, j / n];
      const neg = x.reduce((s, t) => s + Math.min(0, t), 0);
      if (neg < 0) x = x.map((t) => (t < 0 ? SHRINK * t : t * (1 - SHRINK * neg) / (1 - neg)));
      return v3.unit(v3.add(v3.add(v3.scale(G.A, x[0]), v3.scale(G.B, x[1])), v3.scale(G.C, x[2])));
    };
    const inExt = (p) => p[0] >= -1 && p[1] >= -1 && p[0] + p[1] <= n + 1;
    const inCore = (p) => p[0] >= 0 && p[1] >= 0 && p[0] + p[1] <= n;
    const tris = [];
    for (let i = -1; i <= n + 1; i++) for (let j = -1; j <= n + 1; j++) {
      const up = [[i, j], [i + 1, j], [i, j + 1]], dn = [[i + 1, j], [i + 1, j + 1], [i, j + 1]];
      if (up.every(inExt)) tris.push({ ij: up, kind: 'up' });
      if (dn.every(inExt)) tris.push({ ij: dn, kind: 'dn' });
    }
    for (const t of tris) { t.q = t.ij.map((p) => bary(p[0], p[1])); t.core = t.ij.every(inCore); t.omega = solidAngle(...t.q); t.dir = v3.unit(v3.add(v3.add(t.q[0], t.q[1]), t.q[2])); }
    const mid = (r0, r1) => Math.cbrt((r0 ** 3 + r1 ** 3) / 2);
    const nodes = [];
    const core = tris.filter((t) => t.core), ring = tris.filter((t) => !t.core);
    core.forEach((t, ti) => CORE_SHELLS.forEach(([r0, r1], sh) => nodes.push({ kind: 'core', tri: t, ti, shell: sh, r0, r1, p: v3.scale(t.dir, mid(r0, r1)), w: t.omega * (r1 ** 3 - r0 ** 3) / 3 })));
    let j = 0;
    for (const t of ring) { const [r0, r1] = RING_SHELLS[t.kind]; nodes.push({ kind: 'ring', tri: t, r0, r1, p: v3.scale(t.dir, mid(r0, r1)), w: t.omega * (r1 ** 3 - r0 ** 3) / 3, j, dg: bgStep(j) }); j++; }
    for (const t of core) { const [r0, r1] = CAP_SHELL; nodes.push({ kind: 'cap', tri: t, r0, r1, p: v3.scale(t.dir, mid(r0, r1)), w: t.omega * (r1 ** 3 - r0 ** 3) / 3, j, dg: bgStep(j) }); j++; }
    const out = { nodes, core, ring, coreWeight: nodes.filter((d) => d.kind === 'core').reduce((s, d) => s + d.w, 0) };
    if (latCache.size > 400) latCache.clear();
    latCache.set(key, out);
    return out;
  }
  /** The field of the lattice: each point's step, |Ψ_M|, and the totals the page reads. */
  function fieldOf(G, lat) {
    const M = S.M, dCore = S.harmonic * S.detune * PI;
    let vol = 0, standing = 0, coreStanding = 0, bg2 = 0, nbg = 0, coreAbs = 0;
    const pts = lat.nodes.map((nd) => {
      const step = nd.kind === 'core' ? dCore : S.harmonic * nd.dg, psi = psiSum(M, step), a = Z.abs(psi), a2 = a * a;
      vol += a2 * nd.w; if (a2 >= STANDING) { standing++; if (nd.kind === 'core') coreStanding++; }
      if (nd.kind === 'core') coreAbs = a; else { bg2 += a2; nbg++; }
      return { nd, step, psi, abs: a, abs2: a2 };
    });
    return { pts, volEmergent: vol, nStanding: standing, nCoreStanding: coreStanding, bgRms: Math.sqrt(bg2 / Math.max(1, nbg)), coreAbs, nCore: lat.nodes.filter((d) => d.kind === 'core').length };
  }
  /** The background RMS at another M, by the closed form |sin(Mδ/2)/(M sin(δ/2))| (the readout sums term by term). */
  const bgRmsAt = (lat, M, n) => { let s = 0, k = 0; for (const nd of lat.nodes) if (nd.kind !== 'core') { const a = closedAbs(M, n * nd.dg); s += a * a; k++; } return Math.sqrt(s / Math.max(1, k)); };

  /* ---------- the tree of selected_tree_transport (paths as a named multigraph) ----------
     vertices: 0 = A (the root r), 1 … M = the waypoints W_k, M + 1 = x; edges 2k: A → W_k and 2k + 1: W_k → x.
     Edge phases: u(A → W_k) = e^{ikδ/2}, u(W_k → x) = e^{ikδ/2}, so path k arrives with e^{ikδ}. The selected tree is
     every A → W_k and W_0 → x; the gauge has g(A) = 1, g(W_k) = e^{0.7ik}, g(x) = e^{iθ}. */
  function treeCheck(M, d, th) {
    const u = (e) => Z.exp((e >> 1) * d / 2), src = (e) => (e & 1 ? 1 + (e >> 1) : 0), dst = (e) => (e & 1 ? M + 1 : 1 + (e >> 1));
    const g = (v) => (v === 0 ? [1, 0] : v === M + 1 ? Z.exp(th) : Z.exp(0.7 * v));
    const gauged = (e) => Z.mul(Z.mul(g(dst(e)), u(e)), Z.inv(g(src(e))));
    // rootPhase along the tree, before and after the gauge
    const root = (uf) => { const ph = new Array(M + 2); ph[0] = [1, 0]; for (let k = 0; k < M; k++) ph[1 + k] = uf(2 * k); ph[M + 1] = Z.mul(ph[1], uf(1)); return ph; };
    const before = root(u), after = root(gauged);
    // covariance rootPhase(gauge g u)(a) = g(a)·rootPhase(u)(a)·g(r)⁻¹ at every vertex
    let cov = 0; for (let v = 0; v < M + 2; v++) cov = Math.max(cov, Z.abs(Z.sub(after[v], Z.mul(Z.mul(g(v), before[v]), Z.inv(g(0))))));
    // loop coordinates rootPhase(s e)·u(e)·rootPhase(t e)⁻¹ of the non-tree edges W_k → x (k ≥ 1): invariant
    let loopShift = 0; const loops = [];
    for (let k = 1; k < M; k++) {
      const e = 2 * k + 1, l0 = Z.mul(Z.mul(before[src(e)], u(e)), Z.inv(before[dst(e)])), l1 = Z.mul(Z.mul(after[src(e)], gauged(e)), Z.inv(after[dst(e)]));
      loops.push(l0); loopShift = Math.max(loopShift, Z.abs(Z.sub(l0, l1)));
    }
    // arrivals: the product of the two edges of each path, after the gauge
    const arrivals = []; for (let k = 0; k < M; k++) arrivals.push(Z.mul(gauged(2 * k), gauged(2 * k + 1)));
    const psi = arrivals.reduce((s, a) => Z.add(s, a), [0, 0]).map((x) => x / M);
    const edges = 2 * M, vertices = M + 2;
    return { covariance: cov, loopShift, loops: loops.length, psi, edges, vertices, basicLoops: edges + 1 - vertices };
  }

  /* ---------- the Z/12Z sieve of sum_annihilator_character ---------- */
  const sieve = () => Array.from({ length: 12 }, (_, x) => {
    const s = ANN12.reduce((a, k) => Z.add(a, Z.exp(TAU * k * x / 12)), [0, 0]), echo = Z.scale(psiSum(3, TAU * x / 3), 3);
    return { x, re: s[0], im: s[1], inH: H12.includes(x), echo };
  });

  /* ---------- state ---------- */
  const S = { scene: 'volume', M: 64, eps: 60, detune: 0, harmonic: 1 };
  const deltaOf = () => S.harmonic * S.detune * PI;
  const thetaOf = () => TAU * clock.t;
  const VIEW = {
    point: [-1.15, 0.45], loop: [-1.1, 0.55], void: [-1.68, 0.49], echo: [-1.46, 0.5], volume: [-0.95, 0.5]
  };

  /* ---------- stage, fit and labels ---------- */
  const stageEl = $('stage');
  // the labels' layer exists before kit.solid looks for it, so that its labels and the size probe share one layer
  let tagBox = stageEl.querySelector('.tags');
  if (!tagBox) { tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox); }
  const probe = document.createElement('div'); probe.hidden = true; tagBox.appendChild(probe);
  const SO = { canvas: $('cv'), radius: 0.36, cx: 0.5, cy: 0.5, yaw: VIEW.volume[0], pitch: VIEW.volume[1], wheel: false,
    onChange: () => paint(), onPick: (ev, s) => pickAt(ev, s), onDrag: (ev, s) => dragTo(ev, s), onDrop: () => dropDrag() };
  const sc = kit.solid(stageEl, SO);

  let FIT = { u: 100, F: [0, 0, 0], cx: 0.5, cy: 0.5 }, blend = null, lockFit = null;
  const Wp = (p) => v3.sub(p, FIT.F);
  const Ws = (pts) => pts.map(Wp);
  function camAxes() {
    const cy = Math.cos(sc.cam.yaw), sy = Math.sin(sc.cam.yaw), cp = Math.cos(sc.cam.pitch), sp = Math.sin(sc.cam.pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  }
  function fitTo(pts, rect) {
    const ax = camAxes();
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const p of pts) { const x = v3.dot(p, ax.R), y = v3.dot(p, ax.U); x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    const u = Math.min(rect.w / Math.max(x1 - x0, 1e-3), rect.h / Math.max(y1 - y0, 1e-3));
    return { u, F: v3.add(v3.scale(ax.R, (x0 + x1) / 2), v3.scale(ax.U, (y0 + y1) / 2)), sx: rect.x + rect.w / 2, sy: rect.y + rect.h / 2 };
  }
  function startBlend(ms) {
    if (ms <= 0 || TRV.still) { blend = null; return; }
    const b = { from: Object.assign({}, FIT, { F: FIT.F.slice() }), e: 0 };
    blend = b;
    kit.tween(ms, (e) => { if (blend === b) { b.e = e; paint(); } }, () => { if (blend === b) blend = null; paint(); });
  }
  function boxOf(el, sr) {
    if (!el || el.hidden || !el.getClientRects().length) return null;
    const cs = getComputedStyle(el); if (cs.opacity === '0' || cs.visibility === 'hidden' || cs.display === 'none') return null;
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
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 10); else bottom = Math.min(bottom, b.y - 10); }
    return { x: 14, y: top, w: Math.max(40, W - 28), h: Math.max(40, bottom - top) };
  }

  const sizes = new Map();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizes.clear(); paint(); });
  TRV.onLang(() => sizes.clear());
  function sizeOf(html, cls) {
    const k = `${TRV.lang()}|${cls}|${html}`;
    let s = sizes.get(k);
    if (!s) { probe.className = 'tag ' + cls; probe.innerHTML = html; probe.hidden = false; s = [probe.offsetWidth, probe.offsetHeight]; probe.hidden = true; if (s[0] > 0) sizes.set(k, s); }
    return s;
  }
  let LB = [], KEEP = [], OBST = [], BOUNDS = null, PLACED = [];
  /** Ask for a label at a world point; o: pri (higher first), dir (preferred screen direction), r (gap). */
  const want = (key, p, html, cls, o = {}) => LB.push({ key, q: sc.p(Wp(p)), html, cls, pri: o.pri || 0, dir: o.dir || null, r: o.r == null ? 8 : o.r, at: o.at, far: !!o.far });
  const keepOutScreen = (q, r) => KEEP.push({ x: q[0] - r, y: q[1] - r, w: 2 * r, h: 2 * r });
  const keepPt = (p, r = 6) => keepOutScreen(sc.p(Wp(p)), r);
  const meets = (a, b, m) => a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m;
  let CEN = [0, 0];
  function placeLabels() {
    const placed = [], boxes = OBST.concat(KEEP);
    LB.sort((a, b) => b.pri - a.pri);
    for (const l of LB) {
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      const d = l.dir || [l.q[0] - CEN[0], l.q[1] - CEN[1]], base = Math.atan2(d[1], d[0]) || -PI / 2;
      const cands = l.at === 'center' ? [[0, 0]] : [];
      for (const r of l.far ? [l.r, l.r + 12, l.r + 28, l.r + 48, l.r + 72, l.r + 100, l.r + 135] : [l.r, l.r + 10, l.r + 24, l.r + 40]) for (const da of [0, 0.5, -0.5, 1.0, -1.0, 1.6, -1.6, 2.3, -2.3, PI]) {
        const ux = Math.cos(base + da), uy = Math.sin(base + da), ext = Math.abs(ux) * w / 2 + Math.abs(uy) * h / 2;
        cands.push([ux * (r + ext), uy * (r + ext)]);
      }
      let ok = null;
      for (const [dx, dy] of cands) {
        const b = { x: l.q[0] + dx - w / 2, y: l.q[1] + dy - h / 2, w, h };
        if (b.x < BOUNDS.x || b.y < BOUNDS.y || b.x + w > BOUNDS.x + BOUNDS.w || b.y + h > BOUNDS.y + BOUNDS.h) continue;
        if (placed.some((p) => meets(p, b, 3)) || boxes.some((p) => meets(p, b, 1))) continue;
        ok = b; break;
      }
      if (!ok) continue;
      placed.push(ok);
      sc.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
      // a label set well away from its point gets a faint leader back to it
      const nx = clamp(l.q[0], ok.x, ok.x + w), ny = clamp(l.q[1], ok.y, ok.y + h), gap = Math.hypot(nx - l.q[0], ny - l.q[1]);
      if (gap > l.r + 14) LEADERS.push([l.q, [nx, ny]]);
    }
    PLACED = placed;
  }
  let LEADERS = [];
  function drawLeaders() {
    const ov = sc.overlay(), dpr = TRV.fitCanvas(ov), c = ov.getContext('2d');
    c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, ov.clientWidth, ov.clientHeight);
    if (TRV.thumbMode) return;
    c.strokeStyle = P.dim; c.lineWidth = 1; c.globalAlpha = 0.85; c.setLineDash([2, 3]);
    for (const [a, b] of LEADERS) { const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; c.beginPath(); c.moveTo(a[0] + dx / l * 4, a[1] + dy / l * 4); c.lineTo(b[0], b[1]); c.stroke(); }
  }

  /* ---------- geometry helpers for the scenes ---------- */
  const arc = (p, q, n = 24, r = 1) => Array.from({ length: n + 1 }, (_, i) => v3.scale(v3.slerp(p, q, i / n), r));
  /** Unit tangent at x pointing away from A along the great circle, and its companion e2 = x × e1. */
  function frameAt(G, x) {
    let t = v3.sub(v3.scale(x, v3.dot(G.A, x)), G.A);
    if (v3.len(t) < 1e-9) t = v3.cross(x, [0, 0, 1]);
    const e1 = v3.unit(v3.sub(t, v3.scale(x, v3.dot(t, x)))), e2 = v3.cross(x, e1);
    return { e1, e2 };
  }
  /** Path k of M from A to x on the sphere: the geodesic pushed sideways by b_k sin(πs); the fan leans over the cap. */
  function pathPts(G, x, k, M, n = 22, r = LIFT) {
    const Lx = Math.acos(clamp(v3.dot(G.A, x), -1, 1)), N0 = v3.unit(v3.cross(G.A, x)), towardB = v3.dot(G.B, N0) < 0 ? -1 : 1;
    const f = M > 1 ? k / (M - 1) : 0.5, b = Lx * (0.62 * f - 0.14) * towardB;
    return Array.from({ length: n + 1 }, (_, i) => { const s = i / n; return v3.scale(v3.unit(v3.add(v3.slerp(G.A, x, s), v3.scale(N0, b * Math.sin(PI * s)))), r); });
  }
  /** The probe outside the sector: from B through the middle of the edge AC and on, beyond that edge. */
  const voidPoint = (G) => v3.unit(v3.slerp(G.B, v3.unit(v3.add(G.A, G.C)), 1.45));
  const crownOf = (x) => ({ Q: v3.scale(x, 1.5), rc: 0.27, base: v3.scale(x, 1.04) });
  const sieveOf = (G) => ({ c: v3.scale(G.mid, 1.2), r: 0.07 + 0.11 * G.epsDeg / 90, n: G.mid });

  /* ---------- the sector solid ---------- */
  const capPoint = (G, u, v) => v3.unit(v3.add(v3.scale(G.A, 1 - u), v3.scale(v3.add(v3.scale(G.B, 1 - v), v3.scale(G.C, v)), u)));
  function drawSector(G, solid) {
    if (solid) {
      sc.surface('cap', (u, v) => Wp(capPoint(G, u, v)), { u: [0, 1], v: [0, 1], nu: 20, nv: 20, color: P.violet });
      for (const [k, p, q] of [['wallAB', G.A, G.B], ['wallBC', G.B, G.C], ['wallCA', G.C, G.A]])
        sc.surface(k, (u, v) => Wp(v3.scale(v3.slerp(p, q, u), v)), { u: [0, 1], v: [0.002, 1], nu: 14, nv: 3, color: P.violet });
      // the barycentric thirds on the cap: the cells of the lattice, drawn as geodesic arcs
      const n = N_SUB, B3 = (a, b, c) => v3.unit(v3.add(v3.add(v3.scale(G.A, a), v3.scale(G.B, b)), v3.scale(G.C, c)));
      for (let k = 1; k < n; k++) {
        const t = k / n;
        for (const [p, q] of [[B3(1 - t, t, 0), B3(1 - t, 0, t)], [B3(t, 1 - t, 0), B3(0, 1 - t, t)], [B3(t, 0, 1 - t), B3(0, t, 1 - t)]])
          sc.line(Ws(arc(p, q, 16, 1.004)), { color: P.ink, width: 1, alpha: 0.28 });
      }
    } else {
      // keyed objects a frame does not place are hidden: the walls rest, the cap stays as a faint shell
      sc.surface('cap', (u, v) => Wp(capPoint(G, u, v)), { u: [0, 1], v: [0, 1], nu: 20, nv: 20, color: P.violet, alpha: 0.1, pick: false, occlude: false });
    }
    for (const [p, q] of [[G.A, G.B], [G.B, G.C], [G.C, G.A]]) sc.line(Ws(arc(p, q, 28, 1.002)), { color: P.ink, width: 1.2, alpha: solid ? 0.55 : 0.75 });
    if (solid) for (let i = 1; i < 6; i++) for (let j = 1; j < 6 - i; j++) keepPt(capPoint(G, (i + j) / 6, j / (i + j)), 0.35 * Math.min(G.e, 1) * FIT.u / 6);
    for (const p of [G.A, G.B, G.C]) sc.line(Ws([G.O, p]), { color: P.dim, width: 1, alpha: 0.7, dash: [3, 4] });
  }

  /* ---------- the scenes ---------- */
  function drawPoint(G, x, fitOnly) {
    const M = S.M, d = deltaOf(), th = thetaOf(), { e1, e2 } = frameAt(G, x), cr = crownOf(x);
    const dir = (phi) => v3.add(v3.scale(e1, Math.cos(phi)), v3.scale(e2, Math.sin(phi)));
    const fit = [G.O, G.A, G.B, G.C, x, ...arc(G.A, G.B, 8), ...arc(G.B, G.C, 8), v3.add(cr.Q, v3.scale(e1, cr.rc)), v3.sub(cr.Q, v3.scale(e1, cr.rc)), v3.add(cr.Q, v3.scale(e2, cr.rc)), v3.sub(cr.Q, v3.scale(e2, cr.rc)), v3.scale(x, 1.62)];
    for (const k of [0, M - 1]) fit.push(...pathPts(G, x, k, M, 6));
    if (fitOnly) return fit;
    drawSector(G, true);
    // the M paths
    for (let k = 0; k < M; k++) sc.line(Ws(pathPts(G, x, k, M, M > 32 ? 14 : 20)), { color: P.cyan, width: M > 32 ? 0.9 : 1.2, alpha: M > 32 ? 0.45 : 0.7 });
    // the column above x: one helix of arrivals, then the crown
    sc.line(Ws([cr.base, cr.Q]), { color: P.dim, width: 1, dash: [3, 4] });
    const helix = Array.from({ length: M }, (_, k) => v3.add(v3.scale(x, 1.05 + 0.33 * (M > 1 ? k / (M - 1) : 0)), v3.scale(dir(k * d + th), 0.07)));
    sc.line(Ws(helix), { color: P.cyan, width: 1, alpha: 0.5 });
    if (M <= 32) helix.forEach((p) => sc.bead(Wp(p), { color: P.cyan, r: 2.1, glow: 0.4 }));
    sc.circle(Wp(cr.Q), x, cr.rc, { color: P.dim, width: 1, fade: false, alpha: 0.8 });
    for (let k = 0; k < M; k++) sc.line(Ws([cr.Q, v3.add(cr.Q, v3.scale(dir(k * d + th), cr.rc))]), { color: P.cyan, width: M > 32 ? 0.8 : 1.2, alpha: 0.8 });
    const psi = psiSum(M, d, th), lock = lockOf(M, d, psiSum(M, d)), lu = dir(lock.angle + th);
    sc.line(Ws([v3.sub(cr.Q, v3.scale(lu, cr.rc * 1.15)), v3.add(cr.Q, v3.scale(lu, cr.rc * 1.15))]), { color: P.violet, width: 1.2, dash: [4, 3], alpha: 0.9 });
    const tip = v3.add(cr.Q, v3.add(v3.scale(e1, cr.rc * psi[0]), v3.scale(e2, cr.rc * psi[1])));
    if (Z.abs(psi) > 0.04) sc.arrow(Wp(cr.Q), Wp(tip), { color: P.ink, width: 2.6, headSize: 9 });
    else sc.bead(Wp(cr.Q), { color: P.ink, r: 3 });
    sc.bead(Wp(v3.add(cr.Q, v3.scale(dir(th), cr.rc))), { color: P.amber, r: 4, key: 'gauge' });
    keepPt(cr.Q, 10); keepPt(tip, 6);
    if (!TRV.thumbMode) {
      want('psi', tip, `Ψ<sub>M</sub> · |Ψ<sub>M</sub>| = ${fix(Z.abs(psi), 3)}`, 'raw ink backed', { pri: 8, r: 8 });
      want('crown', v3.add(cr.Q, v3.scale(e2, -cr.rc)), L(`${M} 个到达相位 e<sup>ikδ</sup>`, `${M} arrival phases e<sup>ikδ</sup>`), 'raw c-cy', { pri: 6, r: 6 });
    }
    return fit;
  }
  function drawLoop(G, fitOnly) {
    const M = S.M, d = deltaOf(), th = thetaOf(), x = G.C, { e1, e2 } = frameAt(G, x);
    const dir = (phi) => v3.add(v3.scale(e1, Math.cos(phi)), v3.scale(e2, Math.sin(phi)));
    const g1 = pathPts(G, x, 0, M, 26, 1.014), g2 = pathPts(G, x, M - 1, M, 26, 1.014), ring = { c: v3.scale(x, 1.03), r: 0.17 };
    const fit = [G.O, G.A, G.B, G.C, ...arc(G.A, G.B, 8), ...arc(G.B, G.C, 8), ...g1, ...g2];
    for (let i = 0; i < 8; i++) fit.push(v3.add(ring.c, v3.scale(dir(i * TAU / 8), ring.r + 0.12)));
    if (fitOnly) return fit;
    drawSector(G, true);
    for (let k = 1; k < M - 1; k++) sc.line(Ws(pathPts(G, x, k, M, 14)), { color: P.cyan, width: 0.8, alpha: 0.28 });
    // the loop Γ₁ ∘ Γ₂⁻¹: its area (magenta) and its two sides (cyan) with their directions
    sc.surface('loopArea', (s, t) => Wp(v3.scale(v3.unit(v3.add(v3.scale(g1[Math.round(s * 26)], 1 - t), v3.scale(g2[Math.round(s * 26)], t))), 1.009)), { u: [0, 1], v: [0, 1], nu: 26, nv: 6, color: P.magenta, alpha: 0.32, pick: false, occlude: false });
    sc.tube('g1', Ws(g1), { color: P.cyan, width: 3, glow: 0.4 });
    sc.tube('g2', Ws(g2), { color: P.cyan, width: 3, glow: 0.4 });
    sc.arrow(Wp(g1[11]), Wp(g1[15]), { color: P.cyan, width: 2, headSize: 11 });
    sc.arrow(Wp(g2[15]), Wp(g2[11]), { color: P.cyan, width: 2, headSize: 11 });
    // the ring of ρ_M(φ) round x: spikes = arrivals per bin (linear, capped), the resultant from the ring centre
    sc.circle(Wp(ring.c), x, ring.r, { color: P.dim, width: 1.2, fade: false });
    const bins = new Array(NBIN).fill(0);
    for (let k = 0; k < M; k++) { const ph = ((k * d + th) % TAU + TAU) % TAU; bins[Math.min(NBIN - 1, Math.floor(ph / TAU * NBIN))]++; }
    bins.forEach((c, b) => {
      if (!c) return;
      const u = dir((b + 0.5) * TAU / NBIN), rho = c / M * NBIN, len = Math.min(0.32, 0.05 * rho);
      sc.line(Ws([v3.add(ring.c, v3.scale(u, ring.r)), v3.add(ring.c, v3.scale(u, ring.r + len))]), { color: P.cyan, width: 2.4 });
    });
    const psi = psiSum(M, d, th), tip = v3.add(ring.c, v3.add(v3.scale(e1, ring.r * psi[0]), v3.scale(e2, ring.r * psi[1])));
    if (Z.abs(psi) > 0.05) sc.arrow(Wp(ring.c), Wp(tip), { color: P.ink, width: 2.4, headSize: 8 }); else sc.bead(Wp(ring.c), { color: P.ink, r: 3 });
    sc.bead(Wp(v3.add(ring.c, v3.scale(dir(th), ring.r))), { color: P.amber, r: 4, key: 'gauge' });
    keepPt(ring.c, ring.r * FIT.u * 0.4);
    if (!TRV.thumbMode) {
      want('g1', g1[8], 'Γ₁', 'raw c-cy', { pri: 7, r: 6 });
      want('g2', g2[8], 'Γ₂⁻¹', 'raw c-cy', { pri: 7, r: 6 });
      const m = v3.unit(v3.add(g1[13], g2[13])), red = (((M - 1) * d) % TAU + TAU) % TAU;
      want('gb', m, `γ<sub>B</sub> = ${M - 1}δ ≡ ${fix(red / PI, 2)}π`, 'raw c-mg backed', { pri: 6, r: 10, far: true });
      want('rho', v3.add(ring.c, v3.scale(dir(PI * 0.75), ring.r + 0.06)), 'ρ<sub>M</sub>(φ)', 'raw c-cy', { pri: 5, r: 6 });
    }
    return fit;
  }
  function drawEcho(G, fitOnly) {
    const M = S.M, d = deltaOf(), th = thetaOf(), T = Math.min(M, 6), sv = sieveOf(G);
    const loopAt = (r) => [...arc(G.A, G.B, 18, r), ...arc(G.B, G.C, 18, r).slice(1), ...arc(G.C, G.A, 18, r).slice(1)];
    const sx = v3.unit(v3.cross(sv.n, [0, 0, 1])), sy = v3.cross(sv.n, sx);
    const fit = [G.O, G.A, G.B, G.C, ...loopAt(1.02 + 0.03 * T)];
    for (let i = 0; i < 8; i++) fit.push(v3.add(sv.c, v3.add(v3.scale(sx, sv.r * 2.1 * Math.cos(i * TAU / 8)), v3.scale(sy, sv.r * 2.1 * Math.sin(i * TAU / 8)))));
    const aN = v3.unit(v3.cross(G.A, v3.cross(G.B, G.A)));   // the tangent at A towards B
    const aT = v3.cross(G.A, aN), echoDir = (phi) => v3.add(v3.scale(aN, Math.cos(phi)), v3.scale(aT, Math.sin(phi)));
    for (const u of [aN, aT]) fit.push(v3.add(v3.scale(G.A, 1.34), v3.scale(u, 0.18)), v3.sub(v3.scale(G.A, 1.34), v3.scale(u, 0.18)));
    if (fitOnly) return fit;
    drawSector(G, true);
    // the coil: the boundary walked T times, each turn a little higher
    for (let k = 0; k < T; k++) sc.line(Ws(loopAt(1.02 + 0.03 * k)), { color: P.cyan, width: 1.6, alpha: 1 - 0.13 * k });
    // the echo of each turn at A, and their mean Ψ_M on top
    for (let k = 0; k < T; k++) { const b = v3.scale(G.A, 1.02 + 0.03 * k); sc.arrow(Wp(b), Wp(v3.add(b, v3.scale(echoDir(k * d + th), 0.13))), { color: P.cyan, width: 1.6, headSize: 7 }); }
    const psi = psiSum(M, d, th), base = v3.scale(G.A, 1.34), re = 0.16;
    sc.circle(Wp(base), G.A, re, { color: P.dim, width: 1, fade: false });
    const tip = v3.add(base, v3.add(v3.scale(aN, re * psi[0]), v3.scale(aT, re * psi[1])));
    if (Z.abs(psi) > 0.05) sc.arrow(Wp(base), Wp(tip), { color: P.ink, width: 2.6, headSize: 9 }); else sc.bead(Wp(base), { color: P.ink, r: 3 });
    sc.bead(Wp(v3.add(base, v3.scale(echoDir(th), re))), { color: P.amber, r: 4, key: 'gauge' });
    // the Z/12Z sieve: twelve slots round the cap's centre; a bar of height Σ_{k∈{0,4,8}} χ_k(x)
    sc.circle(Wp(sv.c), sv.n, sv.r, { color: P.dim, width: 1, fade: false });
    const SV = sieve();
    for (const s of SV) {
      const a = TAU * s.x / 12, p = v3.add(sv.c, v3.add(v3.scale(sx, sv.r * Math.cos(a)), v3.scale(sy, sv.r * Math.sin(a))));
      const out = v3.add(v3.scale(sx, Math.cos(a)), v3.scale(sy, Math.sin(a)));
      if (s.re > 0.5) sc.tube(`bar${s.x}`, Ws([p, v3.add(p, v3.scale(out, sv.r * 0.32 * s.re))]), { color: P.cyan, width: 6, glow: 0.35 });
      else sc.bead(Wp(p), { color: P.magenta, r: 3.6 });
    }
    keepPt(base, 9); keepPt(sv.c, 8);
    if (!TRV.thumbMode) {
      const top = v3.add(sv.c, v3.scale(sx, sv.r * 1.96));
      want('sieveH', top, L('x ∈ H：和 = 3', 'x ∈ H: sum = 3'), 'raw c-cy backed', { pri: 7, r: 8, far: true });
      const low = v3.add(sv.c, v3.add(v3.scale(sx, sv.r * Math.cos(TAU * 7 / 12)), v3.scale(sy, sv.r * Math.sin(TAU * 7 / 12))));
      want('sieve0', low, L('x ∉ H：和 = 0', 'x ∉ H: sum = 0'), 'raw c-mg backed', { pri: 6, r: 8, far: true });
      want('echo', tip, `Ψ<sub>M</sub>(nΔγ) · |Ψ<sub>M</sub>|² = ${fix(Z.abs(psi) ** 2, 3)}`, 'raw ink backed', { pri: 8, r: 8, far: true });
    }
    return fit;
  }
  function drawVolume(G, F, fitOnly) {
    const lat = latticeAt(G), th = thetaOf();
    const fit = [G.O, ...lat.nodes.map((nd) => nd.p)];
    if (fitOnly) return fit;
    drawSector(G, false);
    sc.glass('ball', Wp(G.O), 1, { alpha: 0.03, rim: 0.22 });
    for (const pt of F.pts) {
      const nd = pt.nd;
      if (nd.kind === 'core') {
        const breathe = 1 + 0.07 * Math.sin(th) * (nd.shell % 2 ? -1 : 1), s = 0.88 * Math.cbrt(pt.abs2) * breathe;
        if (s < 0.04) continue;   // a cell that has all but cancelled is not drawn (its keyed mesh is hidden)
        const r0 = Math.max(0.03, nd.r0), V = [...nd.tri.q.map((q) => v3.scale(q, r0)), ...nd.tri.q.map((q) => v3.scale(q, nd.r1))];
        const c = v3.scale(V.reduce((a, b) => v3.add(a, b), [0, 0, 0]), 1 / 6);
        const VW = V.map((v) => Wp(v3.add(c, v3.scale(v3.sub(v, c), s))));
        sc.poly(`cell${nd.ti}-${nd.shell}`, { vertices: VW, faces: [[0, 2, 1], [3, 4, 5], [0, 1, 4, 3], [1, 2, 5, 4], [2, 0, 3, 5]] }, { color: P.violet, edges: P.cyan });
        const qs = VW.map((v) => sc.p(v)), xs = qs.map((q) => q[0]), ys = qs.map((q) => q[1]), x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
        KEEP.push({ x: x0 + (x1 - x0) * 0.12, y: y0 + (y1 - y0) * 0.12, w: (x1 - x0) * 0.76, h: (y1 - y0) * 0.76 });
      } else if (pt.abs >= 0.08) sc.bead(Wp(nd.p), { color: P.magenta, r: 2.2 + 8.5 * pt.abs, glow: 0.5, key: `bg${nd.j}` });
      else sc.bead(Wp(nd.p), { color: P.dim, r: 1.6, alpha: 0.55, glow: 0.2, key: `bg${nd.j}` });
    }
    if (!TRV.thumbMode) {
      const art = F.pts.filter((p) => p.nd.kind !== 'core' && p.abs >= 0.08).sort((a, b) => b.abs - a.abs)[0];
      want('core', v3.scale(G.mid, 0.62), L(`驻波晶核 · ${F.nCoreStanding} / ${F.nCore} 胞`, `standing core · ${F.nCoreStanding} / ${F.nCore} cells`), 'raw c-vi backed', { pri: 8, r: 20, far: true });
      if (art) want('art', art.nd.p, L(`伪影 |Ψ<sub>M</sub>| = ${fix(art.abs, 2)}`, `artifact |Ψ<sub>M</sub>| = ${fix(art.abs, 2)}`), 'raw c-mg backed', { pri: 6, r: 8, far: true });
      else {
        // the cancelled background point farthest out on the screen carries the word "void"
        let best = null, bd = -1;
        for (const p of F.pts) if (p.nd.kind !== 'core') { const q = sc.p(Wp(p.nd.p)), dd = Math.hypot(q[0] - CEN[0], q[1] - CEN[1]); if (dd > bd) { bd = dd; best = p; } }
        if (best) want('art', best.nd.p, L('虚空：背景全部抵消', 'void: the background cancels'), 'raw ink backed', { pri: 6, r: 8, far: true });
      }
    }
    return fit;
  }

  /* ---------- the frame ---------- */
  function sceneFit(G) {
    if (S.scene === 'point') return drawPoint(G, G.C, true);
    if (S.scene === 'void') return drawPoint(G, voidPoint(G), true);
    if (S.scene === 'loop') return drawLoop(G, true);
    if (S.scene === 'echo') return drawEcho(G, true);
    return drawVolume(G, null, true);
  }
  let LAST = null;
  function drawStage(G, F) {
    hudText(G, F);
    const W = $('cv').clientWidth || 300, H = $('cv').clientHeight || 150, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 18, y: 18, w: W - 36, h: H - 36 } : safeRect(W, H, huds);
    const inner = thumb ? area : { x: area.x + Math.min(30, area.w * 0.06), y: area.y + Math.min(18, area.h * 0.05), w: area.w - 2 * Math.min(30, area.w * 0.06), h: area.h - 2 * Math.min(18, area.h * 0.05) };
    if (lockFit) FIT = lockFit;
    else {
      const t = fitTo(sceneFit(G), inner);
      const target = { u: t.u, F: t.F, cx: t.sx / W, cy: t.sy / H };
      FIT = blend ? { u: blend.from.u + (target.u - blend.from.u) * blend.e, F: v3.lerp(blend.from.F, target.F, blend.e), cx: blend.from.cx + (target.cx - blend.from.cx) * blend.e, cy: blend.from.cy + (target.cy - blend.from.cy) * blend.e } : target;
    }
    SO.cx = FIT.cx; SO.cy = FIT.cy; SO.radius = FIT.u / Math.max(1, Math.min(W, H)) / (sc.cam.zoom || 1);
    LB = []; KEEP = []; LEADERS = []; OBST = huds.slice(); BOUNDS = { x: 4, y: 4, w: W - 8, h: H - 8 };
    sc.begin();
    CEN = sc.p(Wp(S.scene === 'volume' ? v3.scale(G.mid, 0.6) : v3.scale(G.mid, 0.8)));
    if (S.scene === 'point') drawPoint(G, G.C);
    else if (S.scene === 'void') drawPoint(G, voidPoint(G));
    else if (S.scene === 'loop') drawLoop(G);
    else if (S.scene === 'echo') drawEcho(G);
    else drawVolume(G, F);
    // vertices and the ε handle (amber) on C
    for (const p of [G.A, G.B, G.C]) sc.bead(Wp(p), { color: P.ink, r: 3.2, glow: 0.3 });
    if (!thumb) sc.ring(Wp(G.C), { normal: G.C, color: P.amber, r: 9, key: 'handle' });
    keepPt(G.A, 6); keepPt(G.B, 6); keepPt(G.C, 12);
    if (!thumb) {
      if (S.scene === 'volume' || S.scene === 'echo') { keepPt(G.O, 6); want('O', G.O, 'O', 'raw ink', { pri: 8, r: 6 }); }
      want('A', G.A, 'A', 'raw ink', { pri: 9, r: 7 });
      want('B', G.B, 'B', 'raw ink', { pri: 9, r: 7 });
      want('C', G.C, S.scene === 'point' || S.scene === 'loop' ? 'C = x' : `C · ε = ${fix(S.eps, 0)}°`, 'raw c-am', { pri: 9, r: 12 });
      if (S.scene === 'void') { const xv = voidPoint(G); sc.bead(Wp(xv), { color: P.magenta, r: 4.5, key: 'void' }); keepPt(xv, 7); want('xv', xv, L('x：扇形外', 'x: outside'), 'raw c-mg backed', { pri: 9, r: 9, far: true }); }
      placeLabels();
    } else if (S.scene === 'void') sc.bead(Wp(voidPoint(G)), { color: P.magenta, r: 4.5, key: 'void' });
    sc.end();
    drawLeaders();
    LAST = { W, H, area };
  }

  function hudText(G, F) {
    const M = S.M, d = deltaOf(), psi = psiSum(M, d), a2 = Z.abs(psi) ** 2;
    const dTxt = `δ = ${fix(d / PI, 3)}π`;
    const big = {
      point: `${L('一点多路', 'One point, M paths')} · |Ψ<sub>M</sub>| = ${fix(Z.abs(psi), 3)}`,
      loop: `${L('闭环推前', 'Loop push-forward')} · ⟨cos γ<sub>B</sub>⟩ = ${fix(a2, 4)}`,
      void: `${L('虚空相消', 'Void cancellation')} · |Ψ<sub>M</sub>|² = ${fix(a2, 4)}`,
      echo: `${L('回声量子化', 'Echo quantization')} · |Ψ<sub>M</sub>|² = ${fix(a2, 3)}`,
      volume: `${L('驻波成体', 'Standing volume')} · V = ${fix(F.volEmergent, 4)}`
    }[S.scene];
    const sub = {
      point: L(`M = ${M} 条路径汇到 C · ${dTxt} · <span class="c-vi">锁定线</span>`, `M = ${M} paths converge on C · ${dTxt} · <span class="c-vi">locked line</span>`),
      loop: L(`M = ${M} · ${dTxt} · ⟨cos γ<sub>B</sub>⟩ = |Ψ<sub>M</sub>|²`, `M = ${M} · ${dTxt} · ⟨cos γ<sub>B</sub>⟩ = |Ψ<sub>M</sub>|²`),
      void: L(`M = ${M} · ${dTxt}${Math.abs(S.detune - GOLD_DETUNE) < 1e-6 ? '（黄金步长）' : ''} · 到达相位铺满圆周`, `M = ${M} · ${dTxt}${Math.abs(S.detune - GOLD_DETUNE) < 1e-6 ? ' (golden step)' : ''} · arrivals fill the circle`),
      echo: L(`n = ${S.harmonic} · ${dTxt} · Z/12Z 筛子：3 或 0`, `n = ${S.harmonic} · ${dTxt} · Z/12Z sieve: 3 or 0`),
      volume: L(`M = ${M} · <span class="c-vi">Ω/3 = ${fix(G.vSector, 4)}</span> · <span class="c-mg">${L('背景', 'background')} ${fix(F.bgRms, 3)}</span>`, `M = ${M} · <span class="c-vi">Ω/3 = ${fix(G.vSector, 4)}</span> · <span class="c-mg">background ${fix(F.bgRms, 3)}</span>`)
    }[S.scene];
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    const LEG = {
      point: [['vi', L('扇形 ΔT_ε', 'sector ΔT_ε')], ['cy', L('M 条路径与到达相位', 'M paths and their arrivals')], ['ik', 'Ψ<sub>M</sub>'], ['am', L('规范相位 θ · ε 手柄', 'gauge θ · ε handle')]],
      loop: [['cy', L('闭环 Γ₁ ∘ Γ₂⁻¹ 与相位密度', 'loop Γ₁ ∘ Γ₂⁻¹ and phase density')], ['mg', L('闭环围出的面积', 'area of the loop')], ['ik', 'Ψ<sub>M</sub>'], ['am', L('θ · ε 手柄', 'θ · ε handle')]],
      void: [['vi', L('扇形 ΔT_ε', 'sector ΔT_ε')], ['mg', L('扇形外的点 x', 'point x outside')], ['cy', L('到达相位', 'arrivals')], ['am', L('θ · ε 手柄', 'θ · ε handle')]],
      echo: [['cy', L('回声与 H 的槽位', 'echoes and slots of H')], ['mg', L('抵消的槽位', 'cancelled slots')], ['ik', 'Ψ<sub>M</sub>'], ['am', L('θ · ε 手柄', 'θ · ε handle')]],
      volume: [['vi', L('驻波晶核的胞（体积）', 'standing-core cells (volume)')], ['mg', L('背景伪影', 'background artifacts')], ['dm', L('已抵消', 'cancelled')], ['am', L('ε 手柄', 'ε handle')]]
    }[S.scene];
    $('legend').innerHTML = LEG.map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }

  /* ---------- strip ---------- */
  let plotG = null;
  function drawPlot(G, F) {
    const cv = $('plot');
    if (!cv.clientWidth || !cv.clientHeight) return;
    const M = S.M, d = deltaOf(), th = thetaOf(), thick = TRV.thumbMode ? 2 : 1;
    let meta = '';
    if (S.scene === 'point') {
      $('plotTitle').innerHTML = `<span class="zh">M 个到达相位首尾相接</span><span class="en">The M arrivals laid head to tail</span>`;
      const chain = [[0, 0]]; for (let k = 0; k < M; k++) { const z = chain[k]; chain.push([z[0] + Math.cos(k * d + th), z[1] + Math.sin(k * d + th)]); }
      const R = Math.max(1.2, ...chain.map((z) => Math.hypot(z[0], z[1]))) * 1.08;
      const g = kit.plot(cv, { x: [-R, R], y: [-R, R], equal: true, pad: [10, 10, 8, 8] });
      g.line(chain, P.cyan, { width: 1.6 * thick });
      chain.forEach((z, i) => { if (i) g.dot(z[0], z[1], P.cyan, 1.8); });
      g.arrow([0, 0], chain[M], { color: P.ink, width: 2 * thick, headSize: 8 });
      g.dot(0, 0, P.amber, 3.2);
      meta = `|Σ| = M·|Ψ<sub>M</sub>| = ${fix(M * Z.abs(psiSum(M, d)), 3)}`;
    } else if (S.scene === 'loop') {
      $('plotTitle').innerHTML = `<span class="zh">相位密度 ρ<sub>M</sub>(φ)：每格的到达数</span><span class="en">Phase density ρ<sub>M</sub>(φ): arrivals per bin</span>`;
      const bins = new Array(NBIN).fill(0);
      for (let k = 0; k < M; k++) { const ph = ((k * d + th) % TAU + TAU) % TAU; bins[Math.min(NBIN - 1, Math.floor(ph / TAU * NBIN))]++; }
      const top = Math.max(2, ...bins) * 1.15;
      const g = kit.plot(cv, { x: [0, TAU], y: [0, top], pad: [34, 10, 8, 20] });
      g.axes({ xTicks: [[0, '0'], [PI, 'π'], [TAU, '2π']], yTicks: [[0, '0'], [Math.round(top / 1.15), String(Math.round(top / 1.15))]] });
      bins.forEach((c, b) => { if (c) g.rect(b * TAU / NBIN + 0.02, 0, (b + 1) * TAU / NBIN - 0.02, c, P.cyan, { alpha: 0.75 }); });
      g.hline(M / NBIN, P.dim, { dash: [4, 3], alpha: 0.9 });
      g.vline(((th % TAU) + TAU) % TAU, P.amber, { alpha: 0.85 });
      meta = `⟨cos γ<sub>B</sub>⟩<sub>M</sub> = ${fix(pairAverage(M, d), 4)} = |Ψ<sub>M</sub>|²`;
    } else if (S.scene === 'void') {
      $('plotTitle').innerHTML = `<span class="zh">|Ψ<sub>M</sub>|² 随 M 下沉（对数）</span><span class="en">|Ψ<sub>M</sub>|² sinks with M (log)</span>`;
      const g = kit.plot(cv, { x: [M0, M1], y: [1e-5, 1.5], logY: true, pad: [40, 10, 8, 20] });
      g.axes({ xTicks: [3, 16, 32, 48, 64], yTicks: [[1e-4, '10⁻⁴'], [1e-2, '10⁻²'], [1, '1']] });
      const xs = Array.from({ length: M1 - M0 + 1 }, (_, i) => M0 + i);
      const sd = Math.abs(Math.sin(d / 2));
      if (sd > 1e-6) g.line(xs.map((m) => [m, Math.min(1.4, 1 / (m * sd) ** 2)]), P.dim, { width: 1, dash: [4, 3] });
      g.line(xs.map((m) => [m, Math.max(1e-5, Z.abs(psiSum(m, d)) ** 2)]), P.magenta, { width: 1.8 * thick });
      g.vline(M, P.amber, { alpha: 0.85 });
      g.dot(M, Math.max(1e-5, Z.abs(psiSum(M, d)) ** 2), P.amber, 3.6);
      meta = `|Ψ<sub>${M}</sub>|² = ${fix(Z.abs(psiSum(M, d)) ** 2, 5)} · ${L('虚线 1/(M sin(δ/2))²', 'dashed 1/(M sin(δ/2))²')}`;
    } else if (S.scene === 'echo') {
      $('plotTitle').innerHTML = `<span class="zh">共振梳：|Ψ<sub>M</sub>(nΔγ)|² 随 Δγ</span><span class="en">Resonance comb: |Ψ<sub>M</sub>(nΔγ)|² over Δγ</span>`;
      const g = kit.plot(cv, { x: [0, 2], y: [0, 1.08], pad: [34, 10, 8, 20] });
      g.axes({ xTicks: [[0, '0'], [0.5, 'π/2'], [1, 'π'], [1.5, '3π/2'], [2, '2π']], yTicks: [[0, '0'], [1, '1']] });
      const xs = Array.from({ length: 401 }, (_, i) => 2 * i / 400);
      g.line(xs.map((x) => [x, closedAbs(M, S.harmonic * x * PI) ** 2]), P.cyan, { width: 1.6 * thick });
      for (let k = 0; k <= S.harmonic; k++) g.dot(2 * k / S.harmonic, 1, P.cyan, 3);   // the peaks Δγ = 2πk/n, in units of π
      g.vline(S.detune, P.amber, { alpha: 0.85 });
      g.dot(S.detune, closedAbs(M, d) ** 2, P.amber, 3.6);
      meta = L(`峰在 Δγ = 2πk/n · n = ${S.harmonic}`, `peaks at Δγ = 2πk/n · n = ${S.harmonic}`);
    } else {
      $('plotTitle').innerHTML = `<span class="zh">背景伪影的均方根与晶核振幅，随 M</span><span class="en">Background artifact RMS and core amplitude, over M</span>`;
      const lat = latticeAt(G), g = kit.plot(cv, { x: [M0, M1], y: [0, 1.1], pad: [34, 10, 8, 20] });
      g.axes({ xTicks: [3, 16, 32, 48, 64], yTicks: [[0, '0'], [0.5, '0.5'], [1, '1']] });
      const xs = Array.from({ length: M1 - M0 + 1 }, (_, i) => M0 + i);
      g.line(xs.map((m) => [m, closedAbs(m, deltaOf())]), P.cyan, { width: 1.8 * thick });
      g.line(xs.map((m) => [m, bgRmsAt(lat, m, S.harmonic)]), P.magenta, { width: 1.8 * thick });
      g.vline(M, P.amber, { alpha: 0.85 });
      g.dot(M, F.bgRms, P.amber, 3.6); g.dot(M, F.coreAbs, P.amber, 3.6);
      meta = `<span class="c-cy">${L('晶核', 'core')} ${fix(F.coreAbs, 3)}</span> · <span class="c-mg">${L('背景', 'background')} ${fix(F.bgRms, 3)}</span>`;
      plotG = g;
    }
    $('plotMeta').innerHTML = meta;
  }

  /* ---------- readouts ---------- */
  function row(k, dt, dd) { $('dt' + k).innerHTML = dt; $('ro' + k).innerHTML = dd; }
  function drawText(G, F) {
    const M = S.M, d = deltaOf(), psi = psiSum(M, d), a = Z.abs(psi), lock = lockOf(M, d, psi);
    const KEY = {
      point: [L('相干度 |Ψ<sub>M</sub>|，Ψ<sub>M</sub> = (1/M) Σ e<sup>ikδ</sup>', 'coherence |Ψ<sub>M</sub>|, Ψ<sub>M</sub> = (1/M) Σ e<sup>ikδ</sup>'), fix(a, 4), ` · M = ${M}`],
      loop: [L('全部路径对的回路余弦平均 ⟨cos γ<sub>B</sub>⟩<sub>M</sub>', 'mean cosine of all pair loops ⟨cos γ<sub>B</sub>⟩<sub>M</sub>'), fix(pairAverage(M, d), 4), ' = |Ψ|²'],
      void: ['|Ψ<sub>M</sub>|²', fix(a * a, 5), L(` · 上界 ${fix(Math.min(1, 1 / (M * Math.abs(Math.sin(d / 2)) || 1)) ** 2, 5)}`, ` · bound ${fix(Math.min(1, 1 / (M * Math.abs(Math.sin(d / 2)) || 1)) ** 2, 5)}`)],
      echo: [L('回声 |Ψ<sub>M</sub>(nΔγ)|²', 'echo |Ψ<sub>M</sub>(nΔγ)|²'), fix(a * a, 4), ` · n = ${S.harmonic}`],
      volume: [L('涌现体积 V = Σ|Ψ<sub>M</sub>|²w', 'emergent volume V = Σ|Ψ<sub>M</sub>|²w'), fix(F.volEmergent, 4), ` · Ω/3 = ${fix(G.vSector, 4)}`]
    }[S.scene];
    $('dtKey').innerHTML = KEY[0]; $('roKey').textContent = KEY[1]; $('roKeySub').textContent = KEY[2];
    $('roAside').textContent = `ε = ${fix(S.eps, 0)}° · δ = ${fix(d / PI, 3)}π`;
    row(1, L('|Ψ<sub>M</sub>|²：复数和 / 路径对平均', '|Ψ<sub>M</sub>|²: sum / pair mean'), `${fix(a * a, 4)} / ${fix(pairAverage(M, d), 4)}`);
    row(2, L('锁定线上的实振幅 r', 'real amplitude r on the locked line'), sgn(lock.r, 4));
    row(3, L(`驻波点 N（|Ψ<sub>M</sub>|² ≥ ¼）`, `standing points N (|Ψ<sub>M</sub>|² ≥ ¼)`), `${F.nStanding} / ${F.pts.length}`);
    row(4, L('扇形体积 Ω/3 · 涌现体积 V', 'sector volume Ω/3 · emergent V'), `${fix(G.vSector, 4)} · ${fix(F.volEmergent, 4)}`);
    row(5, L('Im Tr(P<sub>A</sub>P<sub>B</sub>P<sub>C</sub>) ÷ 弦四面体体积', 'Im Tr(P<sub>A</sub>P<sub>B</sub>P<sub>C</sub>) ÷ chord tetrahedron'), `${fix(G.trace[1], 4)} ÷ ${fix(G.vTetra, 4)} = ${fix(G.trace[1] / G.vTetra, 3)}`);
    row(6, L('背景伪影均方根', 'background artifact RMS'), fix(F.bgRms, 4));
    const note = {
      point: L('每条青色的路径带着自己的相位到达 C；柱上的螺旋与顶上的冠把这 M 个相位排开。白色箭头是平均 Ψ<sub>M</sub>，它只能沿紫色的锁定线伸缩。', 'Each cyan path brings its own phase to C; the helix on the column and the crown on top spread the M phases out. The white arrow is the average Ψ<sub>M</sub>, which can only stretch along the violet locked line.'),
      loop: L('第一条与最后一条路径围成闭环，品红的是它围出的面积。C 周围的环上，每根青色的刺是落在那一格的到达数；它们的平均方向就是 Ψ<sub>M</sub>。', 'The first and last paths close a loop, whose area is magenta. On the ring round C each cyan spike counts the arrivals in its bin; their mean direction is Ψ<sub>M</sub>.'),
      void: L('扇形外的点 x 收到的相位按与整圈不可公度的步长前进，M 越大越均匀地铺满圆周，平均越来越接近 0。', 'At the point x outside the sector the phases advance by a step incommensurate with a full turn; as M grows they cover the circle ever more evenly and the average sinks towards 0.'),
      echo: L('沿边界绕圈，每圈带回一个回声。步长是整圈的倍数时回声全部同相；其余处随 M 被压低。Z/12Z 的筛子里，只有 H 的四个槽位留下 3。', 'Going round the boundary, each turn brings back one echo. When the step is a whole number of turns every echo agrees; elsewhere they are pressed down as M grows. In the Z/12Z sieve only the four slots of H keep 3.'),
      volume: L('扇形里的点步长与整圈共振，胞的体积保持；扇形外的点步长不可公度，M 越大越消失。留下的胞铺满扇形，涌现体积收拢到 Ω/3。', 'Points inside the sector resonate with a full turn and their cells keep their volume; points outside have incommensurate steps and vanish as M grows. The cells that stay tile the sector, and the emergent volume settles on Ω/3.')
    }[S.scene];
    $('roNote').innerHTML = note;
    showDetune();
    $('pillM').querySelector('strong').textContent = String(M);
    $('pillPsi').querySelector('strong').textContent = fix(a * a, 3);
  }

  const paint = kit.painter(() => {
    const G = sectorAt(S.eps), F = fieldOf(G, latticeAt(G));
    drawStage(G, F); drawPlot(G, F); drawText(G, F);
  }, [stageEl, $('plot')]);

  /* ---------- the rail: the gauge phase θ = 2πt at the end point ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, rate: 0.2, step: 0.125, t: 1, loop: true,
    format: (t) => `θ = ${fix(360 * t, 0)}° <small>/ 360°</small>`,
    onChange: () => paint()
  });

  /* ---------- controls ---------- */
  let tween = null;
  function leave() { if (tween) { tween.cancel(); tween = null; } cards.mark(null); }
  const fDensity = kit.field($('density'), { fmt: (v) => String(Math.round(v)), onInput: (v) => { leave(); setM(v); } });
  const fEps = kit.field($('epsilon'), { fmt: (v) => `${Math.round(v)}°`, onInput: (v) => { leave(); S.eps = clamp(v, EPS0, EPS1); paint(); } });
  const fDetune = kit.field($('detune'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.detune = clamp(v, 0, 1.5); showDetune(); paint(); } });
  const densityChips = kit.chips($('densityChips'), 'paths', (v) => { leave(); setM(Number(v)); });
  const harmonicChips = kit.chips($('harmonic'), 'harmonic', (v) => { leave(); S.harmonic = Number(v) || 1; paint(); });
  function showDetune() { $('oDetune').textContent = Math.abs(S.detune - GOLD_DETUNE) < 1e-6 ? fix(S.detune, 3) : fix(S.detune, 2); }
  function setM(v) { S.M = Math.round(clamp(v, M0, M1)); fDensity.set(S.M); densityChips.set([3, 12, 24, 48, 64].includes(S.M) ? S.M : null, true); paint(); }
  function sync() { fDensity.set(S.M); densityChips.set([3, 12, 24, 48, 64].includes(S.M) ? S.M : null, true); fEps.set(Math.round(S.eps)); fDetune.set(S.detune); showDetune(); harmonicChips.set(S.harmonic, true); }
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ '+': () => { leave(); setM(S.M + 1); }, '=': () => { leave(); setM(S.M + 1); }, '-': () => { leave(); setM(S.M - 1); } });

  /* pointer: the amber handle on C sets ε; the projection stays as it was at the press until the drop */
  let dragging = false;
  function pickAt(ev, s) {
    if (TRV.still) return false;
    const G = sectorAt(S.eps), q = Wp(G.C);
    if (s.near(ev, q) > 22 || s.occluded(q, 0.04)) return false;
    dragging = true; lockFit = Object.assign({}, FIT, { F: FIT.F.slice() }); leave(); clock.pause();
    return true;
  }
  function dragTo(ev, s) {
    if (!dragging) return;
    let best = S.eps, bd = Infinity;
    for (let e = EPS0; e <= EPS1 + 1e-9; e += 0.5) { const d = s.near(ev, Wp([Math.cos(e * DEG), 0, Math.sin(e * DEG)])); if (d < bd) { bd = d; best = e; } }
    S.eps = Math.round(best); fEps.set(S.eps); paint();
  }
  function dropDrag() { if (!dragging) return; dragging = false; lockFit = null; startBlend(320); paint(); }

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'multi-phase-point': { scene: 'point', M: 12, eps: 60, detune: 0.36, harmonic: 1, play: false, still: 1 },
    'circle-density-pushforward': { scene: 'loop', M: 24, eps: 60, detune: 0.22, harmonic: 1, play: false, still: 1 },
    'void-cancellation': { scene: 'void', M: 48, eps: 60, detune: GOLD_DETUNE, harmonic: 1, play: false, still: 1 },
    'bohr-sommerfeld-quantization': { scene: 'echo', M: 24, eps: 60, detune: 0, harmonic: 1, play: false, still: 1 },
    'standing-volume-emergence': { scene: 'volume', M: 64, eps: 60, detune: 0, harmonic: 1, play: false, still: 1 }
  };
  const NOTES = {
    'multi-phase-point': ['M = 12 条青色路径从 A 出发汇到同一点 C，相邻两条差 δ = 0.36π。柱上的螺旋和顶上的冠把 12 个到达相位排开，转了两圈多；白色的平均箭头只剩 |Ψ<sub>12</sub>| = 0.075，沿紫色锁定线放着。', 'M = 12 cyan paths leave A and converge on the same point C, neighbours differing by δ = 0.36π. The helix on the column and the crown on top spread the 12 arrival phases over two turns and more; the white mean arrow is only |Ψ<sub>12</sub>| = 0.075 long and lies on the violet locked line.'],
    'circle-density-pushforward': ['M = 24，δ = 0.22π：第一条与最后一条路径围成闭环 Γ₁ ∘ Γ₂⁻¹，品红是它围出的面积。C 周围环上的青色刺是相位密度 ρ<sub>M</sub>(φ)；全部路径对的回路余弦平均 ⟨cos γ<sub>B</sub>⟩ = 0.0124，正好等于 |Ψ<sub>24</sub>|²。', 'M = 24, δ = 0.22π: the first and last paths close the loop Γ₁ ∘ Γ₂⁻¹, whose area is magenta. The cyan spikes on the ring round C are the phase density ρ<sub>M</sub>(φ); the mean cosine of all pair loops ⟨cos γ<sub>B</sub>⟩ = 0.0124 equals |Ψ<sub>24</sub>|².'],
    'void-cancellation': ['扇形外的品红点 x，M = 48，黄金步长 Δγ = 2π(√5 − 1)/2 ≈ 1.236π：48 个到达相位几乎均匀地铺满冠的圆周，平均缩成一个点，|Ψ<sub>48</sub>|² = 0.0004；条带图里它随 M 一路下沉。', 'The magenta point x outside the sector, M = 48, the golden step Δγ = 2π(√5 − 1)/2 ≈ 1.236π: the 48 arrival phases cover the circle of the crown almost evenly and the mean shrinks to a dot, |Ψ<sub>48</sub>|² = 0.0004; the strip shows it sinking all the way with M.'],
    'bohr-sommerfeld-quantization': ['δ = 0：沿边界绕的每一圈都带回同相的回声，|Ψ<sub>24</sub>|² = 1，条带图的梳状峰落在 Δγ = 0 与 2π。扇形上方的 Z/12Z 筛子里，H = {0, 3, 6, 9} 的四根青色柱高 3，其余八个品红槽位是 0。', 'δ = 0: every turn round the boundary brings back an echo in phase, |Ψ<sub>24</sub>|² = 1, and the comb in the strip peaks at Δγ = 0 and 2π. In the Z/12Z sieve above the sector the four cyan bars of H = {0, 3, 6, 9} stand 3 high and the other eight magenta slots are 0.'],
    'standing-volume-emergence': ['M = 64，δ = 0：扇形外 36 个背景点的步长不可公度，|Ψ<sub>64</sub>| 全都小于 0.03，只剩暗点；扇形里 27 个胞全部留下，紫色的驻波晶核铺满 ΔT<sub>ε</sub>，涌现体积 V = 0.2146，Ω/3 = 0.2145。把 M 拉回 3，品红的伪影又会出现，V 涨到 0.3108。', 'M = 64, δ = 0: the 36 background points outside the sector have incommensurate steps and all have |Ψ<sub>64</sub>| below 0.03, leaving dim dots; all 27 cells inside stay, the violet standing core tiles ΔT<sub>ε</sub>, and the emergent volume is V = 0.2146 against Ω/3 = 0.2145. Pull M back to 3 and the magenta artifacts return, with V up at 0.3108.']
  };
  // A cited figure has a fixed frame: one short sentence per card there (no sub- or superscripts).
  const FIGURE_NOTES = {
    'multi-phase-point': ['12 条青色路径汇到 C，相邻差 0.36π；冠上的 12 个相位转了两圈多，白色平均只剩 0.075，落在紫色锁定线上。', '12 cyan paths reach C, neighbours 0.36π apart; the 12 phases on the crown wind twice round, and the white mean is only 0.075, on the violet locked line.'],
    'circle-density-pushforward': ['首尾两条路径围成品红的闭环；C 周围青色的刺是相位密度，全部路径对的余弦平均 0.0124 = |Ψ|²。', 'The first and last paths close the magenta loop; the cyan spikes round C are the phase density, and the mean pair cosine 0.0124 equals |Ψ|².'],
    'void-cancellation': ['扇形外的品红点 x，黄金步长，M = 48：相位铺满冠的圆周，平均缩成一点，|Ψ|² = 0.0004。', 'The magenta point x outside the sector, golden step, M = 48: the phases cover the crown, the mean shrinks to a dot, |Ψ|² = 0.0004.'],
    'bohr-sommerfeld-quantization': ['δ = 0：每圈回声同相，|Ψ|² = 1；Z/12Z 筛子里 H 的四根青色柱高 3，其余品红槽位为 0。', 'δ = 0: every echo is in phase, |Ψ|² = 1; in the Z/12Z sieve the four cyan bars of H stand 3 high and the magenta slots are 0.'],
    'standing-volume-emergence': ['M = 64：扇形外的品红伪影全部消失，紫色的 27 个胞铺满扇形，涌现体积 0.2146，Ω/3 = 0.2145。', 'M = 64: the magenta artifacts outside vanish, the 27 violet cells tile the sector; emergent volume 0.2146, Ω/3 = 0.2145.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    if (tween) { tween.cancel(); tween = null; }
    clock.pause();
    const from = { M: S.M, eps: S.eps, detune: S.detune }, sceneChanged = S.scene !== p.scene;
    S.scene = p.scene; S.harmonic = p.harmonic;
    const cam = VIEW[p.scene];
    if (booting || TRV.still) {
      Object.assign(S, { M: p.M, eps: p.eps, detune: p.detune }); sc.cam.yaw = cam[0]; sc.cam.pitch = cam[1]; sc.cam.zoom = 1; blend = null;
    } else {
      if (sceneChanged) startBlend(650);
      sc.view([cam[0], cam[1], 1], 650);
      tween = kit.tween(650, (e) => {
        S.M = Math.round(from.M + (p.M - from.M) * e); S.eps = from.eps + (p.eps - from.eps) * e; S.detune = from.detune + (p.detune - from.detune) * e;
        sync(); paint();
      }, () => { tween = null; Object.assign(S, { M: p.M, eps: p.eps, detune: p.detune }); sync(); paint(); });
    }
    clock.set(p.still);
    sync();
    if (p.play) { if (booting) kit.autoplay(clock, stageEl); else if (!TRV.still) clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖动琥珀色的手柄改张角 ε，改路径数 M、相位步长与谐波 n，按播放让终点处的规范相位转一圈。随时可以再选一张卡。', 'Free play: drag the amber handle to change the angle ε, change the number of paths M, the phase step and the harmonic n, and press play to turn the gauge phase at the end point once round. Pick a card again at any time.'] });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  const screenOf = (p) => { const q = sc.p(Wp(p)), b = $('cv').getBoundingClientRect(); return [b.left + q[0], b.top + q[1], q[2]]; };
  window.STANDING_DEBUG = {
    get state() {
      const G = sectorAt(S.eps), lat = latticeAt(G), F = fieldOf(G, lat), M = S.M, d = deltaOf(), th = thetaOf();
      const psi = psiSum(M, d), psiGauge = psiSum(M, d, th), tree = treeCheck(M, d, th), lock = lockOf(M, d, psi);
      return {
        scene: S.scene, preset: cards.current, M, epsDeg: S.eps, detune: S.detune, harmonic: S.harmonic,
        dGamma: S.detune * PI, delta: d, dGammaGold: DGOLD, theta: th, t: clock.t, max: clock.max, playing: clock.playing,
        cam: Object.assign({}, sc.cam),
        A: G.A, B: G.B, C: G.C, omega: G.omega, omegaVos: G.omegaVos, vSector: G.vSector, vTetra: G.vTetra, triple: G.triple,
        tripleBargmann: { re: G.trace[0], im: G.trace[1], reBloch: G.bloch[0], imBloch: G.bloch[1], reSpinor: G.traceSpinor[0], imSpinor: G.traceSpinor[1], arg: Z.arg(G.trace) },
        bargmannTriangle: { trace: G.traceSpinor.slice(), overlaps: G.overlaps.slice() },
        psi: { re: psi[0], im: psi[1], abs: Z.abs(psi), abs2: Z.abs(psi) ** 2 }, psiGauge: { re: psiGauge[0], im: psiGauge[1], abs: Z.abs(psiGauge) },
        pairAvg: pairAverage(M, d), closedAbs: closedAbs(M, d),
        lock: { angle: lock.angle, r: lock.r, imag: lock.imag, residual: lock.residual },
        tree: { covariance: tree.covariance, loopShift: tree.loopShift, edges: tree.edges, vertices: tree.vertices, basicLoops: tree.basicLoops, loops: tree.loops, psiAbs: Z.abs(tree.psi), psi: tree.psi },
        sieve: { H: H12.slice(), annihilator: ANN12.slice(), sums: sieve().map((s) => ({ x: s.x, re: s.re, im: s.im, inH: s.inH, echoRe: s.echo[0], echoIm: s.echo[1] })) },
        lattice: F.pts.map((p) => ({ kind: p.nd.kind, p: p.nd.p.slice(), inside: p.nd.kind === 'core', shell: p.nd.shell == null ? null : p.nd.shell, step: p.step, absPsi: p.abs, w: p.nd.w, j: p.nd.j == null ? null : p.nd.j })),
        nCore: F.nCore, nStanding: F.nStanding, nCoreStanding: F.nCoreStanding, volEmergent: F.volEmergent, coreWeightSum: lat.coreWeight, bgRms: F.bgRms, coreAbs: F.coreAbs,
        fit: Object.assign({}, FIT, { F: FIT.F.slice() }), placed: PLACED.map((b) => Object.assign({}, b)),
        roles: { sector: 'violet', cells: 'violet', paths: 'cyan', phasors: 'cyan', density: 'cyan', loopArea: 'magenta', artifacts: 'magenta', voidPoint: 'magenta', lockedLine: 'violet', resultant: 'ink', gauge: 'amber', handle: 'amber' }
      };
    },
    /** Ψ_M at any (M, δ), from the page's term-by-term sum. */
    psiAt: (M, d) => { const p = psiSum(M, d); return { re: p[0], im: p[1], abs: Z.abs(p) }; },
    /** The emergent volume and standing count at another M (same ε, step and harmonic). */
    volumeAt: (M) => { const keep = S.M; S.M = M; const G = sectorAt(S.eps), F = fieldOf(G, latticeAt(G)); S.M = keep; return { volEmergent: F.volEmergent, nStanding: F.nStanding, bgRms: F.bgRms }; },
    setM: (m) => { leave(); setM(m); },
    setEpsilonDeg: (e) => { leave(); S.eps = clamp(e, EPS0, EPS1); sync(); paint(); },
    setDetune: (x) => { leave(); S.detune = clamp(x, 0, 1.5); sync(); paint(); },
    setHarmonic: (n) => { leave(); S.harmonic = n; sync(); paint(); },
    /** Viewport coordinates of a model point under the current projection, and its depth. */
    screen: screenOf,
    handle: () => screenOf(sectorAt(S.eps).C)
  };
  window.TRV_THUMB = () => { cards.pick('standing-volume-emergence'); sc.cam.yaw = VIEW.volume[0]; sc.cam.pitch = VIEW.volume[1]; clock.pause(); clock.set(1); paint.now(); };
  cards.pick(cards.initial('standing-volume-emergence'));
  booting = false;
  paint();
})();
