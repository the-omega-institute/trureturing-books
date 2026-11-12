/* ORTHO//VORTEX: the fluid side of chapter 30, in three scenes.
   lamb     a plane flow between the stagnation flow and rigid rotation: (u·∇)u = ∇(|u|²/2) + ω × u at a probe
   tube     a vortex tube: no stretching in 2D; under steady strain ω = Γ/A grows until the Burgers core 4πν/α;
            with the schematic closure α = κω the cross-section reaches zero in finite time when κΓ > 4πν
   closure  an observer of x alone: P(V(a + b)) − P(V(a)) = P(L b) − P(B(a, b) + B(b, a)) − P(B(b, b)) on ℝ²
   The rail is s (lamb), the time t (tube) or the unseen variable y (closure).
   Read-only probe for the browser suite: window.VORTEX_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, sgn, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const ALPHA = 0.8, KAPPA = 0.5, GAMMA = 1, A0 = 1, X0 = 0.5;
  const S = { scene: 'lamb', probe: [0.95, 0.5], mode: 'strain', nu: 0, lin: 0, self: 0, mix: 0 };
  const face = (f) => (f === 'body' ? TRV.fonts.body : f === 'display' ? TRV.fonts.display : TRV.fonts.data);
  function text(ctx, str, x, y, color, o) {
    o = o || {};
    ctx.font = `${o.weight ? o.weight + ' ' : ''}${o.size || 11}px ${face(o.face)}`; ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'middle'; ctx.globalAlpha = o.alpha == null ? 1 : o.alpha;
    if (o.halo) { ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.strokeStyle = P.stage; ctx.strokeText(str, x, y); }
    ctx.fillStyle = color; ctx.fillText(str, x, y); ctx.globalAlpha = 1;
  }
  function arrow(ctx, x0, y0, x1, y1, color, w) {
    const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy); if (len < 1.5) return;
    ctx.strokeStyle = ctx.fillStyle = color; ctx.lineWidth = w || 2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
    const h = Math.min(10, len * 0.5), ux = dx / len, uy = dy / len;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - ux * h - uy * h * 0.42, y1 - uy * h + ux * h * 0.42); ctx.lineTo(x1 - ux * h + uy * h * 0.42, y1 - uy * h - ux * h * 0.42); ctx.closePath(); ctx.fill();
  }

  /* ---------- lamb: u = (1 − s)(x, −y) + s(−y, x) ---------- */
  const vel = (s, x, y) => [(1 - s) * x - s * y, -(1 - s) * y + s * x];
  const psi = (s, x, y) => (1 - s) * x * y - s * (x * x + y * y) / 2;                  // stream function: u = (ψ_y, −ψ_x)
  /** Advection, its gradient half and the Lamb half at a point, from the closed formulas; and the finite-difference residual. */
  function split(s, x, y) {
    const u = vel(s, x, y), w = 2 * s;
    const adv = [(1 - s) * u[0] - s * u[1], s * u[0] - (1 - s) * u[1]];                   // J u
    const grad = [(1 - s) * u[0] + s * u[1], -s * u[0] - (1 - s) * u[1]];                 // Jᵀ u = ∇(|u|²/2)
    const lamb = [-w * u[1], w * u[0]];                                                    // ω ẑ × u
    const h = 1e-4, e = (a, b) => { const q = vel(s, a, b); return (q[0] * q[0] + q[1] * q[1]) / 2; };
    const ux = [(vel(s, x + h, y)[0] - vel(s, x - h, y)[0]) / (2 * h), (vel(s, x + h, y)[1] - vel(s, x - h, y)[1]) / (2 * h)];
    const uy = [(vel(s, x, y + h)[0] - vel(s, x, y - h)[0]) / (2 * h), (vel(s, x, y + h)[1] - vel(s, x, y - h)[1]) / (2 * h)];
    const advFd = [u[0] * ux[0] + u[1] * uy[0], u[0] * ux[1] + u[1] * uy[1]], gradFd = [(e(x + h, y) - e(x - h, y)) / (2 * h), (e(x, y + h) - e(x, y - h)) / (2 * h)];
    const curl = ux[1] - uy[0];
    return { u, w, adv, grad, lamb, curlFd: curl, residual: Math.hypot(advFd[0] - gradFd[0] - curl * -u[1], advFd[1] - gradFd[1] - curl * u[0]) };
  }
  const norm = (v) => Math.hypot(v[0], v[1]);
  let view = null;
  function drawLamb(s) {
    const g = kit.plot($('cv'), { x: [-1.6, 1.6], y: [-1.6, 1.6], pad: [18, 18, box.top, box.bottom], equal: true }), ctx = g.ctx; view = g;
    // streamlines: level curves of ψ by marching squares
    const n = 56, x0 = g.x0, y0 = g.y0, dx = (g.x1 - g.x0) / n, dy = (g.y1 - g.y0) / n, F = [];
    let lo = 1e9, hi = -1e9;
    for (let j = 0; j <= n; j++) { F.push([]); for (let i = 0; i <= n; i++) { const v = psi(s, x0 + i * dx, y0 + j * dy); F[j].push(v); if (Math.abs(x0 + i * dx) <= 1.6 && Math.abs(y0 + j * dy) <= 1.6) { lo = Math.min(lo, v); hi = Math.max(hi, v); } } }
    ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1; ctx.globalAlpha = 0.9; ctx.beginPath();
    for (let k = 1; k < 14; k++) {
      const lv = lo + (hi - lo) * k / 14;
      for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
        const a = F[j][i], b = F[j][i + 1], c = F[j + 1][i + 1], d = F[j + 1][i], pts = [];
        const cut = (va, vb, xa, ya, xb, yb) => { if ((va - lv) * (vb - lv) < 0) { const t = (lv - va) / (vb - va); pts.push([xa + (xb - xa) * t, ya + (yb - ya) * t]); } };
        const X = x0 + i * dx, Y = y0 + j * dy;
        cut(a, b, X, Y, X + dx, Y); cut(b, c, X + dx, Y, X + dx, Y + dy); cut(d, c, X, Y + dy, X + dx, Y + dy); cut(a, d, X, Y, X, Y + dy);
        if (pts.length >= 2) { ctx.moveTo(g.X(pts[0][0]), g.Y(pts[0][1])); ctx.lineTo(g.X(pts[1][0]), g.Y(pts[1][1])); }
      }
    }
    ctx.stroke(); ctx.globalAlpha = 1;
    for (let j = -3; j <= 3; j++) for (let i = -3; i <= 3; i++) {       // which way the fluid goes
      const x = i * 0.45, y = j * 0.45, u = vel(s, x, y), m = norm(u); if (m < 0.05) continue;
      const k = 0.16 * Math.min(1, m) / m; ctx.globalAlpha = 0.55; arrow(ctx, g.X(x - u[0] * k / 2), g.Y(y - u[1] * k / 2), g.X(x + u[0] * k / 2), g.Y(y + u[1] * k / 2), P.dim, 1.2); ctx.globalAlpha = 1;
    }
    // the probe: advection (white) = gradient half (cyan) + Lamb half (magenta)
    const [px, py] = S.probe, d = split(s, px, py), k = 0.62, tip = (v, from) => [from[0] + v[0] * k, from[1] + v[1] * k];
    const gT = tip(d.grad, S.probe), aT = tip(d.adv, S.probe);
    arrow(ctx, g.X(px), g.Y(py), g.X(gT[0]), g.Y(gT[1]), P.cyan, 2.6); arrow(ctx, g.X(gT[0]), g.Y(gT[1]), g.X(aT[0]), g.Y(aT[1]), P.magenta, 2.6);
    arrow(ctx, g.X(px), g.Y(py), g.X(aT[0]), g.Y(aT[1]), P.ink, 2);
    ctx.fillStyle = P.amber; ctx.shadowColor = P.amber; ctx.shadowBlur = 12; ctx.beginPath(); ctx.arc(g.X(px), g.Y(py), 6, 0, kit.TAU); ctx.fill(); ctx.shadowBlur = 0;
    if (!TRV.thumbMode) text(ctx, 'ω = ' + fix(d.w, 2), g.X(-1.5), g.Y(-1.45), P.magenta, { size: 12, halo: true });
  }

  /* ---------- tube: Γ = ωA ---------- */
  // The core is a Gaussian of radius R: ω(r) = ω_max e^(−r²/R²) with ω_max = Γ/(πR²), so A = πR² and ω_max = Γ/A.
  // Under a steady axial strain α (the Burgers setting) R² obeys dR²/dt = 4ν − αR², whose exact smooth solution is
  // R(t)² = R∞² + (R₀² − R∞²) e^(−αt) with R∞ = √(4ν/α); without viscosity R = R₀ e^(−αt/2) and ω_max = ω₀ e^(αt).
  const R0SQ = A0 / Math.PI, rInf = (nu) => Math.sqrt(4 * nu / ALPHA);
  /** Cross-section, core radius, peak vorticity and material stretch at time t for a mode ('flat' | 'strain' | 'self') and viscosity ν. */
  function tube(mode, nu, t) {
    const visc = 4 * Math.PI * nu; let A, len;
    if (mode === 'flat') { A = A0 + visc * t; len = 1; }
    else if (mode === 'strain') { const ri2 = 4 * nu / ALPHA; A = Math.PI * (ri2 + (R0SQ - ri2) * Math.exp(-ALPHA * t)); len = Math.exp(ALPHA * t); }
    else { const c = KAPPA * GAMMA - visc; A = Math.max(1e-6, A0 - c * t); len = Math.abs(c) < 1e-9 ? Math.exp(KAPPA * GAMMA * t / A0) : Math.pow(A0 / A, KAPPA * GAMMA / c); }
    return { A, R: Math.sqrt(A / Math.PI), w: GAMMA / A, len };
  }
  /* K41 statistics of homogeneous isotropic turbulence, a separate fact from the Burgers core: with UL = 1, Re = 1/ν,
     η_K/L = Re^(−3/4), N_DOF ~ (L/η_K)³ = Re^(9/4), and the model spectrum E(k) ∝ k^(−5/3) e^(−β kη_K). */
  const BETA = 2;
  function k41(nu) {
    if (!(nu > 0)) return { re: Infinity, eta: 0, ndof: Infinity, E: (k) => Math.pow(k, -5 / 3) };
    const re = 1 / nu, eta = Math.pow(re, -0.75);
    return { re, eta, ndof: Math.pow(re, 2.25), E: (k) => Math.pow(k, -5 / 3) * Math.exp(-BETA * k * eta) };
  }
  const tStar = (nu) => { const c = KAPPA * GAMMA - 4 * Math.PI * nu; return c > 1e-9 ? A0 / c : Infinity; };
  const tubeMax = () => (S.mode === 'self' && isFinite(tStar(S.nu)) ? Math.min(6, tStar(S.nu) * 0.985) : 6);
  /** ∫₀ᵗ ω/2 dt: how far a particle of the core has gone around. */
  function swirl(t) { let a = 0; const n = 160; for (let i = 0; i < n; i++) a += tube(S.mode, S.nu, t * (i + 0.5) / n).w * (t / n) / 2; return a; }
  // The tube lies along the world x-axis, which the camera shows nearly level, so stretching uses the width of the stage.
  const TUBE_CAM = { yaw: -0.42, pitch: 0.3, zoom: 1 }, RD0 = 0.8, HL0 = 0.95;
  const ax = (z, r, a) => [z, r * Math.cos(a), r * Math.sin(a)], X = [1, 0, 0];
  function drawTube(t) {
    st.begin();
    const d = tube(S.mode, S.nu, t), sx = Math.max(0.3, Math.abs(Math.cos(st.cam.yaw)));
    const hlMax = Math.min(2.4, 0.84 * (st.W / 2) / st.unit / sx - 0.4), r1 = RD0 * Math.sqrt(d.A / A0), k = Math.min(1, 1.02 / r1, hlMax / HL0);
    const R0 = RD0 * k, h0 = HL0 * k, r = r1 * k, hl = Math.min(hlMax, h0 * d.len), open = h0 * d.len > hlMax, wall = TRV.thumbMode ? 1.4 : 1.7;
    // the tube as it started (dashed), to compare with
    for (const z of [-h0, h0]) st.circle([z, 0, 0], X, R0, { color: P.dim, width: 1.2, alpha: 0.6, dash: [4, 4], n: 64 });
    for (let j = 0; j < 4; j++) { const a = kit.TAU * (j + 0.5) / 4; st.line(ax(-h0, R0, a), ax(h0, R0, a), { color: P.dim, width: 1.2, alpha: 0.5, dash: [4, 4] }); }
    // the wall: material rings that ride apart with the stretch, and lines along the tube
    for (let i = -8; i <= 8; i++) { const z = i * 0.24 * k * d.len; if (Math.abs(z) <= hl + 1e-9 && i) st.circle([z, 0, 0], X, r, { color: P.dim, width: wall * 0.8, alpha: 0.85, n: 64 }); }
    for (let j = 0; j < 12; j++) { const a = kit.TAU * j / 12; st.line(ax(-hl, r, a), ax(hl, r, a), { color: P.dim, width: wall, alpha: open ? 0.8 : 0.95 }); }
    st.circle([0, 0, 0], X, r, { color: P.cyan, width: 3, alpha: 1, n: 72 });
    const ang = swirl(t);
    for (let j = 0; j < 3; j++) st.dot(ax(0, r, ang + kit.TAU * j / 3), 4.5, P.cyan, { glow: 8 });
    const tip = [hl + 0.22, 0, 0];
    st.arrow([-hl - 0.16, 0, 0], tip, { color: P.magenta, width: clamp(1.8 * Math.cbrt(d.w), 1.8, 7), glow: 8, headSize: 13 });
    st.tag('w', tip, `ω = ${fix(d.w, d.w < 100 ? 2 : 0)}`, 'mg raw', { dx: -24, dy: -30 });
    st.tag('g', ax(0, r, Math.PI / 2), `Γ = ωA = ${fix(d.w * d.A, 2)}`, 'cy raw', { dx: 0, dy: -18 });
    st.tag('a', ax(0, r, -Math.PI / 2), `A = ${fix(d.A, 3)}`, 'raw ink', { dx: 0, dy: 18 });
    st.tag('a0', ax(-h0, Math.max(R0, r), -2.4), 'A₀ = 1', 'raw', r > R0 ? { dx: -38, dy: 8 } : { dx: 4, dy: 22 });
    st.end();
  }

  /* ---------- closure: the observer sees x, not y ---------- */
  const seen = (x, y) => -x + S.lin * y - (x * x + S.mix * x * y + S.self * y * y);        // P(V(x, y)) on ℝ², P(x, y) = (x, 0)
  const terms = (x, y) => ({ lin: S.lin * y, mix: S.mix * x * y, self: S.self * y * y });  // P(L b), P(B(a, b) + B(b, a)), P(B(b, b))
  const isClosed = () => S.lin === 0 && S.mix === 0 && S.self === 0;
  function drawClosure(y) {
    const g = kit.plot($('cv'), { x: [-1.08, 1.08], y: [-3.4, 1.4], pad: [46, 22, box.top + 6, box.bottom + 22] }), ctx = g.ctx; view = g;
    g.axes({ yTicks: [-3, -2, -1, 0, 1], xTicks: [-1, -0.5, 0, 0.5, 1], xLabel: L('看不见的 y', 'the unseen y'), yLabel: L('看见的加速度 P(V)', 'the seen acceleration P(V)') });
    g.vline(0, P.faint);
    for (const x of [-1, -0.5, 0, 0.5, 1]) {
      const pts = []; for (let i = 0; i <= 80; i++) { const yy = -1 + i / 40; pts.push([yy, seen(x, yy)]); }
      g.line(pts, x === X0 ? P.ink : P.dim, { width: x === X0 ? 2.2 : 1.3, alpha: x === X0 ? 1 : 0.85 });
      if (!TRV.thumbMode) g.text(1, seen(x, 1), `x = ${fix(x, 1)}`, x === X0 ? P.ink : P.dim, { dx: -4, dy: -9, align: 'right', size: 10.5 });
    }
    const v0 = seen(X0, 0), v1 = seen(X0, y), gap = v1 - v0;
    g.hline(v0, P.cyan, { dash: [4, 3], alpha: 0.8 });
    if (Math.abs(gap) > 1e-9) { g.line([[y, v0], [y, v1]], P.amber, { width: 3, glow: 8 }); if (!TRV.thumbMode) g.text(y, (v0 + v1) / 2, sgn(gap, 2), P.amber, { dx: y > 0.6 ? -8 : 8, align: y > 0.6 ? 'right' : 'left', size: 12, weight: 600 }); }
    g.dot(0, v0, P.cyan, 5); g.dot(y, v1, P.amber, 6.5, { glow: 12 });
  }

  /* ---------- the stage ---------- */
  const box = { top: 70, bottom: 44 };
  const st = kit.stage3($('stage'), { canvas: $('cv'), yaw: TUBE_CAM.yaw, pitch: TUBE_CAM.pitch, zoom: TUBE_CAM.zoom, radius: 0.3, wheel: false, onChange: () => paint(),
    onPick: (ev) => { if (S.scene === 'tube') return false; leave(); drag(ev); return true; }, onDrag: (ev) => drag(ev) });
  function drag(ev) {
    if (!view) return;
    const b = $('cv').getBoundingClientRect(), x = view.invX(ev.clientX - b.left), y = view.invY(ev.clientY - b.top);
    if (S.scene === 'lamb') { S.probe = [clamp(x, -1.5, 1.5), clamp(y, -1.5, 1.5)]; paint(); } else { clock.pause(); clock.set(clamp(x, -1, 1) + 1); }
  }
  function drawStage() {
    const sr = $('stage').getBoundingClientRect(), below = (el) => el.getBoundingClientRect().bottom - sr.top;
    box.top = TRV.thumbMode ? 26 : Math.max(46, below($('hudBig').parentElement), below($('sceneChips'))) + 10; box.bottom = TRV.thumbMode ? 26 : Math.max(18, $('legend').offsetHeight + 20);
    if (S.scene === 'tube') drawTube(clock.t);
    else { st.begin(); st.end(); if (S.scene === 'lamb') drawLamb(clock.t); else drawClosure(clock.t - 1); }
  }

  /* ---------- strips ---------- */
  function drawPlots() {
    if (TRV.still || TRV.figure) return;
    const A = $('plotA'), B = $('plotB');
    if (S.scene === 'lamb') {
      const [px, py] = S.probe, g = kit.plot(A, { x: [0, 1], y: [0, 4.2], pad: [30, 12, 10, 20] }), ga = [], la = [];
      for (let i = 0; i <= 50; i++) { const d = split(i / 50, px, py); ga.push([i / 50, norm(d.grad)]); la.push([i / 50, norm(d.lamb)]); }
      g.axes({ yTicks: [0, 2, 4], xTicks: [0, 0.5, 1], xLabel: 's' }); g.line(ga, P.cyan); g.line(la, P.magenta); g.vline(clock.t, P.amber, { alpha: 0.8 });
      g.legend([[P.cyan, L('梯度那一半', 'the gradient half')], [P.magenta, L('兰姆那一半 ω × u', 'the Lamb half ω × u')]], { right: false });
      $('pATitle').textContent = L('探针处两半的大小', 'The two halves at the probe'); $('pAMeta').textContent = `(${fix(px, 2)}, ${fix(py, 2)})`;
      const h = kit.plot(B, { x: [0, 1], y: [-1.2, 2.2], pad: [30, 12, 10, 20] });
      h.axes({ yTicks: [-1, 0, 1, 2], xTicks: [0, 0.5, 1], xLabel: 's' }); h.hline(0, P.faint); h.line([[0, 0], [1, 2]], P.magenta); h.line([[0, -1], [1, 1]], P.ink); h.vline(clock.t, P.amber, { alpha: 0.8 });
      h.legend([[P.magenta, L('涡度 ω = 2s', 'vorticity ω = 2s')], [P.ink, L('det ∇u = 2s − 1', 'det ∇u = 2s − 1')]], { right: false });
      $('pBTitle').textContent = L('s = ½：流线由开变合', 's = ½: the streamlines close'); $('pBMeta').textContent = clock.t < 0.5 ? L('双曲线（鞍点）', 'hyperbolas (a saddle)') : clock.t > 0.5 ? L('椭圆（中心）', 'ellipses (a centre)') : L('平行剪切', 'parallel shear');
    } else if (S.scene === 'tube') {
      const T = clock.max, g = kit.plot(A, { x: [0, T], y: [0.01, 200], pad: [38, 12, 10, 20], logY: true }), aa = [], ww = [];
      for (let i = 0; i <= 120; i++) { const t = T * i / 120, d = tube(S.mode, S.nu, t); aa.push([t, clamp(d.A, 0.01, 200)]); ww.push([t, clamp(d.w, 0.01, 200)]); }
      g.axes({ yTicks: [[0.01, '0.01'], [0.1, '0.1'], [1, '1'], [10, '10'], [100, '100']], xTicks: [0, +(T / 2).toFixed(1), +T.toFixed(1)], xLabel: 't' });
      for (const m of ['flat', 'strain', 'self']) {                     // the cross-section in the other two kinds of stretching, for comparison
        if (m === S.mode) continue;
        const pts = [], end = m === 'self' ? Math.min(T, tStar(S.nu)) : T; for (let i = 0; i <= 120; i++) { const t = end * i / 120; pts.push([t, clamp(tube(m, S.nu, t).A, 0.01, 200)]); }
        g.line(pts, P.dim, { width: 1.1, alpha: 0.8 });
      }
      g.line(aa, P.cyan, { width: 2 }); g.line(ww, P.magenta, { width: 2 }); g.hline(1, P.ink, { dash: [4, 3], alpha: 0.6 }); g.vline(clock.t, P.amber, { alpha: 0.8 });
      g.legend([[P.cyan, L('截面 A', 'cross-section A')], [P.magenta, L('涡度 ω', 'vorticity ω')], [P.dim, L('另两种拉伸的 A', 'A, other two kinds')]], { right: false });
      $('pATitle').textContent = L('一个变小，另一个就变大', 'As one shrinks the other grows'); $('pAMeta').textContent = L('对数坐标 · 虚线 Γ = ωA = 1', 'log scale · dashed Γ = ωA = 1');
      // K41: a statistical scaling of homogeneous turbulence, not the Burgers core; drawn on its own
      const K = k41(S.nu), kmax = 1000, h = kit.plot(B, { x: [1, kmax], y: [1e-6, 1.5], pad: [38, 12, 10, 20], logX: true, logY: true }), sp = [], ref = [];
      for (let i = 0; i <= 160; i++) { const kk = Math.pow(kmax, i / 160); ref.push([kk, Math.pow(kk, -5 / 3)]); const e = K.E(kk); if (e > 1e-6) sp.push([kk, e]); }
      h.axes({ xTicks: [[1, '1'], [10, '10'], [100, '100'], [1000, '1000']], yTicks: [[1e-6, '10⁻⁶'], [1e-3, '10⁻³'], [1, '1']], xLabel: 'kL' });
      h.line(ref, P.dim, { width: 1, dash: [4, 3], alpha: 0.8 }); h.line(sp, P.violet, { width: 2 });
      if (K.eta > 0 && 1 / K.eta < kmax) h.vline(1 / K.eta, P.ink, { dash: [3, 3], alpha: 0.7 });
      h.legend([[P.violet, L('模型能谱 E(k)', 'model spectrum E(k)')], [P.dim, 'k⁻⁵ᐟ³', 'dash']].concat(K.eta > 0 ? [[P.ink, 'kη = 1', 'dash']] : []), { right: true });
      $('pBTitle').textContent = L('另一回事：K41 湍流统计', 'A different matter: K41 statistics');
      $('pBMeta').textContent = K.eta > 0 ? `Re = ${fix(K.re, 0)} · η/L = Re⁻³ᐟ⁴ = ${fix(K.eta, 3)} · N ~ Re⁹ᐟ⁴ ≈ ${K.ndof < 1e5 ? fix(K.ndof, 0) : K.ndof.toExponential(1)}` : L('ν = 0：Re → ∞，没有耗散截断', 'ν = 0: Re → ∞, no dissipative cutoff');
    } else {
      const y = clock.t - 1, g = kit.plot(A, { x: [-1, 1], y: [-1.3, 1.3], pad: [30, 12, 10, 20] }), ln = [], mx = [], sf = [], tot = [];
      for (let i = 0; i <= 80; i++) { const yy = -1 + i / 40, q = terms(X0, yy); ln.push([yy, q.lin]); mx.push([yy, -q.mix]); sf.push([yy, -q.self]); tot.push([yy, q.lin - q.mix - q.self]); }
      g.axes({ yTicks: [-1, 0, 1], xTicks: [-1, 0, 1], xLabel: 'y' }); g.hline(0, P.faint);
      g.line(ln, P.cyan, { width: 1.3 }); g.line(mx, P.magenta, { width: 1.3 }); g.line(sf, P.violet, { width: 1.3 }); g.line(tot, P.amber, { width: 2.2 }); g.vline(y, P.amber, { alpha: 0.7 });
      g.legend([[P.cyan, 'P(L b)'], [P.magenta, '−P(B(a,b) + B(b,a))'], [P.violet, '−P(B(b,b))'], [P.amber, L('三项之和', 'their sum')]], { right: false });
      $('pATitle').textContent = L('增量拆成三项', 'The increment in three terms'); $('pAMeta').textContent = `x = ${fix(X0, 1)}`;
      const h = kit.plot(B, { x: [-1.05, 1.05], y: [-3.4, 1.4], pad: [30, 12, 10, 20] }), f = [];
      h.axes({ yTicks: [-3, -2, -1, 0, 1], xTicks: [-1, 0, 1], xLabel: L('看见的 x', 'the seen x') });
      for (let i = 0; i <= 20; i++) for (let j = 0; j <= 8; j++) { const x = -1 + i / 10, yy = -1 + j / 4; h.dot(x, seen(x, yy), P.ink, 1.8, { alpha: 0.75 }); }
      for (let i = 0; i <= 60; i++) { const x = -1 + i / 30; f.push([x, -x - x * x]); } h.line(f, P.cyan, { width: 1.4 });
      $('pBTitle').textContent = L('一个现在，几个下一步？', 'One present, how many next steps?'); $('pBMeta').textContent = isClosed() ? L('每个 x 只有一个', 'one for each x') : L('同一个 x 上下散开', 'they spread above each x');
    }
  }

  /* ---------- words ---------- */
  const SC = {
    lamb: { name: ['对流的两半', 'TWO HALVES'], max: () => 1, rate: 0.14, step: 0.1, start: 0.3 },
    tube: { name: ['涡管', 'VORTEX TUBE'], max: tubeMax, rate: 0.55, step: 0.5, start: 0 },
    closure: { name: ['闭合', 'CLOSURE'], max: () => 2, rate: 0.3, step: 0.1, start: 1.7 }
  };
  const LEGEND = {
    lamb: [['dm', '对流项 (u·∇)u', 'the advection term (u·∇)u'], ['cy', '梯度那一半 ∇(|u|²/2)', 'the gradient half ∇(|u|²/2)'], ['mg', '兰姆那一半 ω × u', 'the Lamb half ω × u'], ['am', '探针（可拖动）', 'the probe (drag it)']],
    tube: [['cy', '环量回路 Γ（不变）', 'the circulation loop Γ (fixed)'], ['mg', '涡度 ω（沿轴）', 'the vorticity ω (along the axis)'], ['dm', '涡管的壁', 'the wall of the tube']],
    closure: [['cy', 'y = 0 时的加速度', 'the acceleration at y = 0'], ['am', '同一个 x、当前 y 时的加速度与两者之差', 'the acceleration for the same x at the current y, and the gap'], ['dm', '其余几个 x', 'the other values of x']]
  };
  function drawText() {
    const set = (i, lab, val) => { $(`roL${i}`).textContent = lab; $(`ro${i}`).innerHTML = val; };
    let big, hud, what, key;
    if (S.scene === 'lamb') {
      const s = clock.t, d = split(s, S.probe[0], S.probe[1]);
      big = L(`对流项的两半 · s = ${fix(s, 2)}`, `The two halves of advection · s = ${fix(s, 2)}`);
      hud = s < 1e-9 ? L('无旋：品红的兰姆项为零，整个对流项是一个梯度', 'no vorticity: the magenta Lamb term is zero and the whole advection term is a gradient') : L(`涡度 ω = ${fix(d.w, 2)}：白 = 青 + 品红`, `vorticity ω = ${fix(d.w, 2)}: white = cyan + magenta`);
      $('roKeyL').textContent = L('兰姆那一半的大小 |ω × u|', 'size of the Lamb half |ω × u|'); $('roKey').innerHTML = `<span class="c-mg">${fix(norm(d.lamb), 3)}</span>`; $('roKeySub').textContent = L(`对流项 ${fix(norm(d.adv), 3)} 之中`, `out of an advection term of ${fix(norm(d.adv), 3)}`);
      set(1, L('梯度那一半 |∇(|u|²/2)|', 'the gradient half |∇(|u|²/2)|'), fix(norm(d.grad), 3)); set(2, L('涡度 ω = ∇∧u', 'vorticity ω = ∇∧u'), fix(d.w, 2));
      set(3, L('探针处的速度 |u|', 'speed at the probe |u|'), fix(norm(d.u), 3)); set(4, L('恒等式的差分残差', 'finite-difference residual of the identity'), `${d.residual.toExponential(1).replace('-', '−')} <span class="okmark">${d.residual < 1e-6 ? '✓' : '✗'}</span>`);
      $('roNote').textContent = L('青色那一半取旋度后为零，所以改变涡度的只可能是品红那一半。', 'The cyan half has zero curl, so only the magenta half can ever change the vorticity.');
      what = `s = ${fix(s, 2)}`; key = `ω = ${fix(d.w, 2)}`;
    } else if (S.scene === 'tube') {
      const t = clock.t, d = tube(S.mode, S.nu, t), visc = 4 * Math.PI * S.nu, ts = tStar(S.nu);
      big = L(`涡管 · t = ${fix(t, 2)}`, `Vortex tube · t = ${fix(t, 2)}`);
      hud = S.mode === 'flat' ? L('二维：没有拉伸项，涡管不变细；粘性只会让它慢慢变粗', 'two dimensions: no stretching term, the tube does not thin; viscosity can only widen it slowly')
        : S.mode === 'strain' ? (S.nu ? L(`恒定拉伸，粘性把截面拦在 4πν/α = ${fix(visc / ALPHA, 3)}`, `steady strain; viscosity holds the cross-section at 4πν/α = ${fix(visc / ALPHA, 3)}`) : L('恒定拉伸，没有粘性：截面一直变细，涡度一直变大', 'steady strain, no viscosity: the cross-section keeps shrinking and the vorticity keeps growing'))
          : isFinite(ts) ? L(`自拉伸：κΓ = ${fix(KAPPA * GAMMA, 2)} 大于 4πν = ${fix(visc, 3)}，截面在 t* = ${fix(ts, 2)} 归零`, `self-stretching: κΓ = ${fix(KAPPA * GAMMA, 2)} exceeds 4πν = ${fix(visc, 3)}; the cross-section vanishes at t* = ${fix(ts, 2)}`) : L(`自拉伸：4πν = ${fix(visc, 3)} 不小于 κΓ，粘性赢了`, `self-stretching: 4πν = ${fix(visc, 3)} is at least κΓ, and viscosity wins`);
      $('roKeyL').textContent = L('涡核中心的涡度 ω = Γ/A', 'vorticity at the core centre ω = Γ/A'); $('roKey').innerHTML = `<span class="c-mg">${fix(d.w, d.w < 100 ? 2 : 0)}</span>`; $('roKeySub').textContent = L(`是开始时的 ${fix(d.w * A0 / GAMMA, d.w < 100 ? 2 : 0)} 倍`, `${fix(d.w * A0 / GAMMA, d.w < 100 ? 2 : 0)} times its starting value`);
      set(1, L('截面 A = πR²', 'cross-section A = πR²'), fix(d.A, 4)); set(2, L('涡核半径 R', 'core radius R'), fix(d.R, 4));
      set(3, L('环量 Γ = ωA', 'circulation Γ = ωA'), `${fix(d.w * d.A, 3)} <span class="okmark">✓</span>`);
      set(4, S.mode === 'self' ? L('夹断时刻 t*', 'pinch time t*') : S.mode === 'strain' ? L('伯格斯涡核 R∞ = √(4ν/α)', 'Burgers core R∞ = √(4ν/α)') : L('拉伸项 (ω·∇)u', 'stretching term (ω·∇)u'), S.mode === 'self' ? (isFinite(ts) ? fix(ts, 3) : L('不夹断', 'no pinch')) : S.mode === 'strain' ? fix(rInf(S.nu), 4) : '0');
      $('roNote').textContent = S.mode === 'strain' ? L('恒定拉伸下涡核半径按精确解 R² = R∞² + (R₀² − R∞²)e^(−αt) 光滑地趋向 R∞，R∞ ∝ ν^½ ∝ Re^(−½)；ν = 0 时 R = R₀e^(−αt/2)，ω = ω₀e^(αt)。', 'Under steady strain the core radius follows the exact solution R² = R∞² + (R₀² − R∞²)e^(−αt) smoothly down to R∞, with R∞ ∝ ν^½ ∝ Re^(−½); at ν = 0, R = R₀e^(−αt/2) and ω = ω₀e^(αt).')
        : L('环量不变是无粘流体的开尔文定理；这里把它用在一根高斯涡核上（A = πR²，ω 是核心的峰值），粘性只通过涡核的扩散进来。', 'A fixed circulation is Kelvin’s theorem for inviscid flow; here it is applied to one Gaussian core (A = πR², ω its peak), and viscosity enters only through the spreading of the core.');
      what = `t = ${fix(t, 2)}`; key = `ω = ${fix(d.w, d.w < 100 ? 2 : 0)}`;
    } else {
      const y = clock.t - 1, q = terms(X0, y), gap = seen(X0, y) - seen(X0, 0), ok = isClosed();
      big = L(`只看得见 x 的观察者 · y = ${sgn(y, 2)}`, `An observer who sees only x · y = ${sgn(y, 2)}`);
      hud = ok ? L('三条泄漏都是零：每条曲线都是水平的，下一步只由 x 决定', 'all three leaks are zero: every curve is level, and the next step depends on x alone') : L(`同一个 x = ${fix(X0, 1)}，看不见的 y 一变，加速度就差了 ${sgn(gap, 3)}`, `the same x = ${fix(X0, 1)}: as the unseen y changes, the acceleration differs by ${sgn(gap, 3)}`);
      $('roKeyL').textContent = L('看见的加速度之差 P(V(a + b)) − P(V(a))', 'difference of the seen accelerations P(V(a + b)) − P(V(a))'); $('roKey').innerHTML = `<span class="c-am">${sgn(gap, 3)}</span>`;
      $('roKeySub').textContent = ok ? L('存在精确闭合', 'an exact closure exists') : L('不存在精确闭合', 'no exact closure exists');
      set(1, L('隐态线性项 P(L b)', 'hidden linear term P(L b)'), sgn(q.lin, 3)); set(2, L('混合项 P(B(a,b) + B(b,a))', 'mixed term P(B(a,b) + B(b,a))'), sgn(q.mix, 3));
      set(3, L('隐态自平流 P(B(b,b))', 'hidden self-advection P(B(b,b))'), sgn(q.self, 3)); set(4, L('第一项减后两项', 'first minus the other two'), `${sgn(q.lin - q.mix - q.self, 3)} <span class="okmark">${Math.abs(q.lin - q.mix - q.self - gap) < 1e-12 ? '= ✓' : '✗'}</span>`);
      $('roNote').textContent = L('在 Lean 验证过的五模态傅里叶实例里，不为零的是混合项：它等于 i/4。', 'In the five-mode Fourier instance verified in Lean it is the mixed term that does not vanish: it equals i/4.');
      what = `y = ${sgn(y, 2)}`; key = ok ? L('闭合', 'CLOSED') : L('不闭合', 'NOT CLOSED');
    }
    $('hudBig').textContent = big; $('hudSub').textContent = hud; $('roAside').textContent = L(SC[S.scene].name[0], SC[S.scene].name[1]);
    $('pillScene').querySelector('strong').textContent = SC[S.scene].name[1]; $('pillWhat').querySelector('strong').textContent = what; $('pillKey').querySelector('strong').textContent = key;
    const leg = LEGEND[S.scene].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== leg) { $('legend').innerHTML = leg; $('legend')._h = leg; }
  }
  const paint = kit.painter(() => { drawText(); drawStage(); drawPlots(); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, rate: 0.14, step: 0.1,
    format: (t, max) => (S.scene === 'lamb' ? `s ${t.toFixed(2)} <small>/ 1</small>` : S.scene === 'tube' ? `t ${t.toFixed(2)} <small>/ ${max.toFixed(2)}</small>` : `y ${(t - 1).toFixed(2).replace('-', '−')} <small>/ 1</small>`),
    onChange: () => paint()
  });
  function fitClock(t) { const sc = SC[S.scene]; clock.pause(); clock.rate = sc.rate; clock.step = sc.step; clock.setMax(sc.max(), true); clock.set(t == null ? sc.start : t); }
  function setScene(sc, t) {
    S.scene = sc; sceneChips.set(sc, true);
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    fitClock(t);
  }
  const leave = () => cards.mark(null);
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  const modeChips = kit.chips($('modeChips'), 'mode', (v) => { S.mode = v; leave(); fitClock(0); });
  const fNu = kit.field($('nu'), { fmt: (v) => fix(v, 3), onInput: (v) => { S.nu = v; leave(); const t = clock.t; fitClock(Math.min(t, tubeMax())); } });
  const fLin = kit.field($('lin'), { fmt: (v) => sgn(v, 1), onInput: (v) => { S.lin = v; leave(); paint(); } });
  const fSelf = kit.field($('self'), { fmt: (v) => sgn(v, 1), onInput: (v) => { S.self = v; leave(); paint(); } });
  const fMix = kit.field($('mix'), { fmt: (v) => sgn(v, 1), onInput: (v) => { S.mix = v; leave(); paint(); } });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('lamb'); }, 2: () => { leave(); setScene('tube'); }, 3: () => { leave(); setScene('closure'); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    potential: { scene: 'lamb', at: 0 }, vortex: { scene: 'lamb', at: 0.8, play: true },
    flat: { scene: 'tube', mode: 'flat', nu: 0.02, at: 4, play: true }, strain: { scene: 'tube', mode: 'strain', nu: 0, at: 1.8, play: true },
    burgers: { scene: 'tube', mode: 'strain', nu: 0.02, at: 5.5, play: true }, runaway: { scene: 'tube', mode: 'self', nu: 0.012, at: 2.4, play: true },
    closed: { scene: 'closure', leaks: [0, 0, 0], at: 1.7, play: true }, mixed: { scene: 'closure', leaks: [0, 0, 1], at: 1.7, play: true }
  };
  const NOTES = {
    potential: ['s = 0，驻点流，没有涡度。探针处白色的对流项与青色的梯度箭头完全重合，品红的兰姆项为零：这一项整个并入压强。', 's = 0, the stagnation flow, no vorticity. At the probe the white advection arrow coincides with the cyan gradient arrow and the magenta Lamb term is zero: the whole term joins the pressure.'],
    vortex: ['让 s 从 0 走到 1：涡度 ω = 2s 出现，对流项多出一支品红箭头 ω × u，白 = 青 + 品红。s 过了 ½，流线从双曲线合拢成椭圆。', 'Let s go from 0 to 1: the vorticity ω = 2s appears and the advection term gains a magenta arrow ω × u, white = cyan + magenta. Past s = ½ the streamlines close from hyperbolas into ellipses.'],
    flat: ['二维：涡度垂直于流动的平面，没有东西去拉它。涡管不变细，粘性只让它慢慢变粗，涡度只降不升。', 'Two dimensions: the vorticity is normal to the plane of the flow and nothing pulls on it. The tube does not thin; viscosity only widens it slowly and the vorticity can only fall.'],
    strain: ['三维：沿轴向以恒定拉伸率拉这根涡管，没有粘性。它越来越长、越来越细，环量 Γ = ωA 不变，所以涡度按 Γ/A 一路变大。', 'Three dimensions: pull the tube along its axis at a steady rate, without viscosity. It grows longer and thinner; the circulation Γ = ωA stays, so the vorticity grows like Γ/A all the way.'],
    burgers: ['加上粘性：变细的涡核同时向外扩散，截面停在 4πν/α 上不再变小。这就是伯格斯涡：拉伸与粘性恰好相抵。', 'Add viscosity: the thinning core also spreads, and the cross-section stops shrinking at 4πν/α. This is the Burgers vortex: stretching and viscosity exactly in balance.'],
    runaway: ['示意模型：让拉伸率正比于涡度本身。截面按 4πν − κΓ 的速率线性变化；κΓ 大于 4πν 时它在有限时间归零，涡度冲向无穷。真实的三维流体会不会这样，仍是开放问题。', 'A schematic model: let the strain be proportional to the vorticity itself. The cross-section changes linearly at the rate 4πν − κΓ; when κΓ exceeds 4πν it reaches zero in finite time and the vorticity runs to infinity. Whether a real three-dimensional fluid does this is open.'],
    closed: ['三条泄漏都关掉：看不见的 y 怎么变，琥珀色的点都沿着水平线走，加速度不变。只看 x 的观察者可以自己预测下一步。', 'All three leaks are off: however the unseen y moves, the amber point runs along a level line and the acceleration does not change. The observer of x can predict the next step alone.'],
    mixed: ['打开混合泄漏：曲线张成一把扇子。同一个 x，y 不同，加速度就不同（琥珀色的竖线是差值）。Lean 证明此时不存在精确闭合；五模态傅里叶实例里的混合项是 i/4。', 'Turn on the mixed leak: the curves fan out. For the same x a different y gives a different acceleration (the amber bar is the gap). Lean proves that no exact closure exists then; in the five-mode Fourier instance the mixed term is i/4.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    if (p.mode) { S.mode = p.mode; modeChips.set(p.mode, true); S.nu = p.nu; fNu.set(p.nu); }
    if (p.leaks) { [S.lin, S.self, S.mix] = p.leaks; fLin.set(S.lin); fSelf.set(S.self); fMix.set(S.mix); }
    if (p.scene === 'tube') Object.assign(st.cam, TUBE_CAM);
    setScene(p.scene, Math.min(p.at, SC[p.scene].max()));
    if (!p.play || TRV.still || (booting && !TRV.embed)) return;
    clock.set(0);
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景、拖探针、调粘性与泄漏、拖时间轴。随时可以再选一张卡。', 'Free play: switch scenes, drag the probe, change the viscosity and the leaks, scrub the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  window.VORTEX_DEBUG = {
    get state() {
      const d = split(clock.t, S.probe[0], S.probe[1]), tb = tube(S.mode, S.nu, clock.t), y = clock.t - 1;
      return { scene: S.scene, t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current, probe: S.probe.slice(), lamb: d,
        mode: S.mode, nu: S.nu, tube: tb, tStar: tStar(S.nu), floor: 4 * Math.PI * S.nu / ALPHA, rInf: rInf(S.nu), k41: (({ re, eta, ndof }) => ({ re, eta, ndof }))(k41(S.nu)), leaks: [S.lin, S.self, S.mix], y, x: X0, seen: [seen(X0, 0), seen(X0, y)], terms: terms(X0, y), closed: isClosed(),
        consts: { alpha: ALPHA, kappa: KAPPA, gamma: GAMMA, a0: A0, beta: BETA } };
    },
    seek: (t) => { clock.pause(); clock.set(t); },
    seen: (x, y) => seen(x, y), tube: (mode, nu, t) => tube(mode, nu, t), rInf: (nu) => rInf(nu),
    k41: (nu, ks) => { const K = k41(nu); return { re: K.re, eta: K.eta, ndof: K.ndof, E: (ks || []).map(K.E) }; }, split: (s, x, y) => split(s, x, y),
    /** Viewport coordinates of a data point of the current 2D scene (for pointer tests). */
    at: (x, y) => { const b = $('cv').getBoundingClientRect(); return [b.left + view.X(x), b.top + view.Y(y)]; }
  };
  window.TRV_THUMB = () => { S.mode = 'strain'; S.nu = 0; modeChips.set('strain', true); fNu.set(0); Object.assign(st.cam, TUBE_CAM); setScene('tube', 1.5); paint.now(); };
  cards.pick(cards.initial('strain'));
  booting = false;
  paint();
})();
