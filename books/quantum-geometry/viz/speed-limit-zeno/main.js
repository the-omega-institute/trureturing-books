/* SPEED//ZENO · 速度极限与芝诺频闪 · Speed limits and the Zeno strobe
   Three scenes on one rail (time in units of ħ/E, or the rotation angle ωt, or the step count):
     speed   left: the overlap ⟨ψ(0), ψ(t)⟩ = Σ wₙ e^{−int} drawn as one arrow per level, head to tail; the centre is
             the 90° wall. right: the Fubini–Study angle arccos|overlap| against t, the speed line ΔH·t and the wall.
     zeno    left: the Bloch sphere; a qubit turns about X from |0⟩ and is asked N times within ωt = π "still in |0⟩?";
             the stage follows the all-yes branch. right: the survival probability of that branch against ωt.
     return  left: the Bloch sphere; each step turns δ about X, then asks "back at |0⟩?"; the stage follows the
             not-yet branch. right: the ledger, one column per step: returned so far (cyan) + not yet (magenta) = 1.
   Read-only probe for the browser suite: window.ZENO_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, DEG = PI / 180;
  const TH = TRV.thumbMode ? 2 : 1;          // thicker strokes on the wordless cover
  const TS = PI;                             // the speed scene runs t ∈ [0, π] (ħ/E)
  const NR = 40;                             // the return scene shows steps 0 … 40
  const ITER = 4000;                         // steps iterated for the sums to infinity

  /* ---------- speed: a superposition on the levels 0, 1, 2 (E = ħ = 1) ---------- */
  const weights = (levels, alphaDeg) => (levels === 3 ? [1 / 3, 1 / 3, 1 / 3] : [Math.cos(alphaDeg * DEG) ** 2, Math.sin(alphaDeg * DEG) ** 2]);
  /** ⟨ψ(0), ψ(t)⟩ = Σ wₙ e^{−int} as [re, im]. */
  const overlap = (w, t) => w.reduce((a, wn, n) => [a[0] + wn * Math.cos(n * t), a[1] - wn * Math.sin(n * t)], [0, 0]);
  const angleOf = (w, t) => Math.acos(Math.min(1, Math.hypot(...overlap(w, t))));
  function speedFacts(w) {
    const meanH = w.reduce((a, wn, n) => a + wn * n, 0), mean2 = w.reduce((a, wn, n) => a + wn * n * n, 0);
    const dH = Math.sqrt(Math.max(0, mean2 - meanH * meanH));
    // the first zero of |overlap| in (0, TS]: scan for local minima, refine by ternary search
    const K = 3000, mod = (t) => Math.hypot(...overlap(w, t));
    let tauPerp = null, minOv = 1, maxAngle = 0;
    for (let i = 1; i <= K; i++) {
      const t = TS * i / K, m = mod(t);
      if (m < minOv) minOv = m;
      maxAngle = Math.max(maxAngle, Math.acos(Math.min(1, m)));
      if (tauPerp == null && i < K && m <= mod(TS * (i - 1) / K) && m <= mod(TS * (i + 1) / K)) {
        let a = TS * (i - 1) / K, b = TS * (i + 1) / K;
        for (let j = 0; j < 80; j++) { const c1 = a + (b - a) / 3, c2 = b - (b - a) / 3; if (mod(c1) < mod(c2)) b = c2; else a = c1; }
        const tm = (a + b) / 2;
        if (mod(tm) < 1e-7) tauPerp = tm;
        minOv = Math.min(minOv, mod(tm)); maxAngle = Math.max(maxAngle, Math.acos(Math.min(1, mod(tm))));
      }
    }
    if (tauPerp == null && mod(TS) < 1e-7) tauPerp = TS;   // a zero exactly at the end of the range
    return { w, meanH, dH, tauMT: dH > 0 ? PI / (2 * dH) : Infinity, tauML: meanH > 0 ? PI / (2 * meanH) : Infinity, tauPerp, minOv, maxAngle };
  }

  /* ---------- zeno: N looks within ωT = π, the all-yes branch ---------- */
  function zenoAt(N, t) {
    const dt = PI / N, k = Math.min(N, Math.floor(t / dt + 1e-9)), phi = k >= N ? 0 : Math.max(0, t - k * dt);
    const p1 = Math.cos(dt / 2) ** 2;
    return { N, dt, k, phi, p1, S: p1 ** k * Math.cos(phi / 2) ** 2, PN: p1 ** N };
  }

  /* ---------- return: iterate the monitored protocol on ℂ² ---------- */
  /** U = cos(δ/2) I − i sin(δ/2) X, v = |0⟩. p[n] (n ≥ 1) first return at step n, s[n] (n ≥ 0) no return in the first n. */
  function monitor(delta, steps) {
    const c = Math.cos(delta / 2), s = Math.sin(delta / 2), p = [0], sv = [1];
    let h = [[1, 0], [0, 0]];   // the history vector, entries [re, im]
    for (let n = 1; n <= steps; n++) {
      // U h: (c h0 − i s h1, −i s h0 + c h1)
      const u0 = [c * h[0][0] + s * h[1][1], c * h[0][1] - s * h[1][0]], u1 = [s * h[0][1] + c * h[1][0], -s * h[0][0] + c * h[1][1]];
      p.push(u0[0] ** 2 + u0[1] ** 2);       // |⟨v, U h⟩|²
      h = [[0, 0], u1];                      // (id − P_v) U h
      sv.push(u1[0] ** 2 + u1[1] ** 2);
    }
    let mean = 0, meanNp = 0, sumP = 0;
    for (let n = 0; n < steps; n++) mean += sv[n];
    for (let n = 1; n <= steps; n++) { meanNp += n * p[n]; sumP += p[n]; }
    return { delta, c, s, p, s_: sv, mean, meanNp, sumP };
  }
  const meanCurve = [];
  for (let d = 45; d <= 180; d += 1) { const m = monitor(d * DEG, ITER); meanCurve.push([d, m.mean, 1 + 1 / (m.s * m.s)]); }

  /* ---------- state ---------- */
  const S = { scene: 'speed', levels: 3, alpha: 45, N: 4, delta: 45 };
  let SF = speedFacts(weights(S.levels, S.alpha)), MON = monitor(S.delta * DEG, ITER);
  const refresh = () => { SF = speedFacts(weights(S.levels, S.alpha)); MON = monitor(S.delta * DEG, ITER); };

  /* ---------- layout: the object on the left (or on top), its chart on the right (or below) ---------- */
  let boxes = null, chart = null;
  function layout(W, H) {
    const st = $('stage').getBoundingClientRect(), below = (el) => (el ? el.getBoundingClientRect().bottom - st.top : 0);
    const thumb = TRV.thumbMode;
    const top = thumb ? 24 : Math.max(46, below($('hudBig').parentElement), below($('sceneChips'))) + 8;
    const bottom = thumb ? 24 : Math.max(18, $('legend').offsetHeight + 18);
    const h = Math.max(120, H - top - bottom), side = W / h >= 1.3;
    if (side) {
      const aw = Math.min(h, W * 0.5);
      return { side, a: { x: 14, y: top, w: aw, h }, b: { x: 14 + aw + 14, y: top, w: W - aw - 42, h } };
    }
    const ah = h * 0.5;
    return { side, a: { x: 12, y: top, w: W - 24, h: ah }, b: { x: 12, y: top + ah + 8, w: W - 24, h: h - ah - 8 } };
  }
  const padOf = (bx, W, H, l, r, t, b) => [bx.x + l, W - bx.x - bx.w + r, bx.y + t, H - bx.y - bx.h + b];
  function arrow2(g, x0, y0, x1, y1, color, w, alpha) {
    const c = g.ctx, ax = g.X(x0), ay = g.Y(y0), bx = g.X(x1), by = g.Y(y1), dx = bx - ax, dy = by - ay, l = Math.hypot(dx, dy);
    c.save(); c.globalAlpha = alpha == null ? 1 : alpha; c.strokeStyle = c.fillStyle = color; c.lineWidth = w * TH; c.lineCap = 'round';
    c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx, by); c.stroke();
    if (l > 6) {
      const hs = Math.min(9 * TH, l * 0.5), ux = dx / l, uy = dy / l;
      c.beginPath(); c.moveTo(bx, by); c.lineTo(bx - ux * hs - uy * hs * 0.45, by - uy * hs + ux * hs * 0.45); c.lineTo(bx - ux * hs + uy * hs * 0.45, by - uy * hs - ux * hs * 0.45); c.closePath(); c.fill();
    }
    c.restore();
  }
  const tagAt = (key, g, x, y, html, cls, dx, dy) => stage.tag(key, [g.X(x), g.Y(y)], html, cls, { screen: true, dx: dx || 0, dy: dy || 0 });

  /* ---------- the sphere: shared by the zeno and return scenes ---------- */
  const so = { canvas: null, yaw: 1.2, pitch: 0.32, radius: 0.36, cx: 0.3, cy: 0.5, onChange: () => paint() };
  const rotX = (phi, fromSouth) => (fromSouth ? [0, Math.sin(phi), -Math.cos(phi)] : [0, -Math.sin(phi), Math.cos(phi)]);
  function placeSphere(a, W, H) { so.cx = (a.x + a.w / 2) / W; so.cy = (a.y + a.h / 2) / H; so.radius = (TRV.thumbMode ? 0.42 : 0.38) * Math.min(a.w, a.h) / Math.min(W, H); }
  function drawArrowParts(st, r) {
    const foot = [0, 0, r[2]];
    st.line([0, 0, -1.2], [0, 0, 1.2], { color: P.cyan, width: 1.2, alpha: 0.55, back: 0.45 });
    st.line([-1.15, 0, 0], [1.15, 0, 0], { color: P.violet, width: 1.2, alpha: 0.7, back: 0.45 });
    if (Math.hypot(r[0], r[1]) > 1e-3) st.line(foot, r, { color: P.magenta, width: 3, fade: false });
    if (Math.abs(r[2]) > 1e-3) { st.ctx.save(); st.ctx.shadowColor = P.cyan; st.ctx.shadowBlur = 10; st.arrow([0, 0, 0], foot, { color: P.cyan, width: 5, headSize: 10, fade: false }); st.ctx.restore(); }
    st.arrow([0, 0, 0], r, { color: P.amber, width: 2.4, glow: 12, headSize: 12, fade: false });
    st.dot(r, 5, P.amber, { glow: 14, fade: false });
    st.tag('n0', [0, 0, 1.2], '|0⟩', 'cy', { dy: -10 });
    st.tag('n1', [0, 0, -1.2], '|1⟩', 'cy', { dy: 10 });
    st.tag('xax', [1.15, 0, 0], L('X 轴', 'X axis'), '', { dx: 22, fade: false });
  }

  /* ---------- scene: speed ---------- */
  function drawSpeed(W, H, t) {
    const { a, b } = boxes, w = SF.w, ov = overlap(w, t), th = angleOf(w, t);
    // left: the overlap as arrows head to tail
    const g = kit.plot($('cv'), { x: [-1.12, 1.12], y: [-1.12, 1.12], equal: true, pad: padOf(a, W, H, 6, 6, 4, 4), clear: false });
    const ring = (r) => { const pts = []; for (let i = 0; i <= 120; i++) pts.push([r * Math.cos(i * 3 * DEG), r * Math.sin(i * 3 * DEG)]); return pts; };
    g.line(ring(1), P.lineHot, { width: 1.3 * TH });
    for (const d of [30, 60]) g.line(ring(Math.cos(d * DEG)), P.faint, { width: TH, dash: [3, 4] });
    g.line([[-1.08, 0], [1.08, 0]], P.faint, { width: 1, alpha: 0.6 });
    const path = []; for (let i = 0; i <= 300; i++) path.push(overlap(w, TS * i / 300));
    g.line(path, P.cyan, { width: 1.2 * TH, alpha: 0.35 });
    if (SF.minOv > 0.01) g.line(ring(SF.minOv), P.cyan, { width: 1.2 * TH, dash: [5, 4], alpha: 0.8 });
    let x = 0, y = 0;
    w.forEach((wn, n) => { const nx = x + wn * Math.cos(n * t), ny = y - wn * Math.sin(n * t); arrow2(g, x, y, nx, ny, P.cyan, 2.6, 0.95 - 0.12 * n); x = nx; y = ny; });
    g.line([[0, 0], ov], P.amber, { width: 1.2 * TH, alpha: 0.7, dash: [2, 3] });
    g.ctx.save(); g.ctx.strokeStyle = P.magenta; g.ctx.lineWidth = 2 * TH; g.ctx.shadowColor = P.magenta; g.ctx.shadowBlur = 10;
    g.ctx.beginPath(); g.ctx.arc(g.X(0), g.Y(0), 6 * TH, 0, 2 * PI); g.ctx.stroke(); g.ctx.restore();
    g.dot(ov[0], ov[1], P.amber, 6 * TH, { glow: 14 });
    if (!TRV.thumbMode) {
      tagAt('wall0', g, 0, 0, L('墙', 'wall'), 'mg', -24, 0);
      tagAt('r30', g, 0, Math.cos(30 * DEG), '30°', 'tick', 14, -7);
      tagAt('r60', g, 0, Math.cos(60 * DEG), '60°', 'tick', 14, -7);
      tagAt('r0', g, 0, 1, '0°', 'tick', 12, -7);
      if (SF.minOv > 0.01) tagAt('closest', g, -SF.minOv * 0.72, -SF.minOv * 0.72, L(`最近 ${fix(SF.minOv, 2)}`, `closest ${fix(SF.minOv, 2)}`), 'cy', -30, 12);
      tagAt('start', g, 1, 0, L('起点 1', 'start 1'), '', 0, 14);
    }
    // right: the angle against time
    const f = kit.plot($('cv'), { x: [0, TS], y: [0, 100], pad: padOf(b, W, H, 34, 8, 8, 20), clear: false });
    chart = f;
    f.axes({ yTicks: [[0, '0°'], [45, '45°'], [90, '90°']], xTicks: [[0, '0'], [PI / 2, 'π/2'], [PI, 'π']], xLabel: TRV.thumbMode ? '' : L('t（ħ/E）', 't (ħ/E)') });
    f.rect(0, 90, TS, 100, P.magenta, { alpha: 0.08 });
    f.hline(90, P.magenta, { width: 2.2 * TH, alpha: 0.9 });
    const deg = (rad) => rad / DEG;
    // the speed line, up to the wall
    const tEnd = Math.min(TS, SF.tauMT);
    f.line([[0, 0], [tEnd, deg(SF.dH * tEnd)]], P.ink, { width: 1.5 * TH, dash: [6, 4], alpha: 0.8 });
    if (SF.tauMT <= TS + 1e-9) f.line([[SF.tauMT, 90], [SF.tauMT, 96]], P.ink, { width: 1.6 * TH });
    if (SF.tauML <= TS + 1e-9) f.line([[SF.tauML, 90], [SF.tauML, 96]], P.dim, { width: 1.6 * TH });
    if (S.levels === 2 && SF.minOv > 0.01) f.hline(deg(SF.maxAngle), P.cyan, { dash: [5, 4], alpha: 0.7, width: TH });
    // the equality case: the anchor half-way
    const even2 = S.levels === 2 && S.alpha === 45;
    if (even2) { f.line([[PI / 2, 0], [PI / 2, 45]], P.dim, { width: TH, dash: [2, 3] }); f.line([[0, 45], [PI / 2, 45]], P.dim, { width: TH, dash: [2, 3] }); }
    const curve = []; for (let i = 0; i <= 400; i++) { const ti = TS * i / 400; curve.push([ti, deg(angleOf(w, ti))]); }
    f.line(curve, P.cyan, { width: 1.6 * TH, alpha: 0.3 });
    f.line(curve.filter((p) => p[0] <= t + 1e-9).concat([[t, deg(th)]]), P.cyan, { width: 3 * TH, glow: 8 });
    if (SF.tauPerp != null) f.dot(SF.tauPerp, 90, P.magenta, 5 * TH, { glow: 10 });
    if (SF.dH * t < PI / 2 + 1e-9) f.dot(t, deg(SF.dH * t), P.ink, 4 * TH, { ring: true });
    f.dot(t, deg(th), P.amber, 6 * TH, { glow: 14 });
    if (!TRV.thumbMode) {
      tagAt('wall', f, TS * 0.06, 95, L('90° 的墙', '90° wall'), 'mg', 18, 0);
      const sx = Math.min(tEnd, TS) * 0.72, sy = deg(SF.dH * sx);
      tagAt('sl', f, sx, sy, L('速度线 ΔH·t', 'speed line ΔH·t'), 'raw ink', -48, -12);
      if (SF.tauMT <= TS + 1e-9) tagAt('mt', f, SF.tauMT, 96, `MT ${fix(SF.tauMT, 3)}`, 'num', SF.tauMT > TS - 0.3 ? -30 : 0, -10);
      if (SF.tauML <= TS + 1e-9 && Math.abs(SF.tauML - SF.tauMT) > 0.05) tagAt('ml', f, SF.tauML, 96, `ML ${fix(SF.tauML, 3)}`, 'num', 0, 13);
      if (SF.tauPerp != null) tagAt('tp', f, SF.tauPerp, 90, `τ⊥ ${fix(SF.tauPerp, 3)}`, 'raw mg', Math.abs(SF.tauPerp - TS) < 0.3 ? -30 : 30, 14);
      if (S.levels === 2 && SF.minOv > 0.01) tagAt('ceil', f, TS * 0.25, deg(SF.maxAngle), L(`最多 ${fix(deg(SF.maxAngle), 1)}°`, `at most ${fix(deg(SF.maxAngle), 1)}°`), 'cy', 0, -11);
      if (even2) tagAt('anchor', f, PI / 2, 45, L('半途 a：45° + 45°', 'half-way a: 45° + 45°'), 'raw ink', 70, 12);
    }
    return { th, ov };
  }

  /* ---------- scene: zeno ---------- */
  function drawZeno(W, H, t) {
    const { a, b } = boxes, z = zenoAt(S.N, t), st = stage;
    st.sphere(1, { lat: [0], lon: 0, shade: 0.07 });
    const free = []; for (let i = 0; i <= 60; i++) free.push(rotX(PI * i / 60));
    st.path(free, { color: P.dim, width: 1.3, dash: [5, 4], alpha: 0.9, back: 0.5 });
    const win = []; for (let i = 0; i <= 30; i++) win.push(rotX(z.dt * i / 30));
    st.path(win, { color: P.cyan, width: 3.2, alpha: 0.9, fade: false });
    const r = rotX(z.phi);
    drawArrowParts(st, r);
    if (!TRV.thumbMode) {
      st.tag('free', rotX(PI * 0.62), L('不看：一路翻到 |1⟩', 'unwatched: all the way to |1⟩'), '', { dx: -10, dy: 16 });
      if (S.N > 1) st.tag('win', rotX(z.dt), L(`每段只转 ${fix(180 / S.N, S.N > 8 ? 2 : 0)}°`, `each turn only ${fix(180 / S.N, S.N > 8 ? 2 : 0)}°`), 'cy', { dx: 64, dy: -4, fade: false });
    }
    // right: the survival of the all-yes branch
    const f = kit.plot($('cv'), { x: [0, PI], y: [0, 1.06], pad: padOf(b, W, H, 34, 8, 8, 20), clear: false });
    chart = f;
    f.axes({ yTicks: [[0, '0'], [0.5, '0.5'], [1, '1']], xTicks: [[0, '0°'], [PI / 2, '90°'], [PI, '180°']], xLabel: TRV.thumbMode ? '' : L('ωt', 'ωt') });
    const K = Math.max(400, 12 * S.N), curve = [];
    for (let i = 0; i <= K; i++) { const ti = PI * i / K; curve.push([ti, zenoAt(S.N, ti).S]); }
    for (let k = 1; k < S.N; k++) curve.push([k * z.dt, zenoAt(S.N, k * z.dt).S]);
    curve.sort((p, q) => p[0] - q[0]);
    const done = curve.filter((p) => p[0] <= t + 1e-9).concat([[t, z.S]]);
    const up = done.map((p) => [p[0], 1]);
    f.poly(done.concat(up.slice().reverse()), P.magenta, { alpha: 0.22 });
    f.area(done, P.cyan, { alpha: 0.22, base: 0 });
    if (S.N <= 16) for (let k = 1; k <= S.N; k++) f.vline(k * z.dt, P.faint, { alpha: 0.7 });
    const freeC = []; for (let i = 0; i <= 120; i++) { const ti = PI * i / 120; freeC.push([ti, Math.cos(ti / 2) ** 2]); }
    f.line(freeC, P.dim, { width: 1.3 * TH, dash: [5, 4] });
    f.line(curve, P.cyan, { width: 1.4 * TH, alpha: 0.35 });
    f.line(done, P.cyan, { width: 2.6 * TH, glow: 8 });
    f.hline(1, P.dim, { alpha: 0.6 });
    for (const n of [1, 4, 16, 64]) if (n !== S.N) f.dot(PI, zenoAt(n, PI).S, P.dim, 4 * TH, { ring: true });
    f.dot(PI, z.PN, P.cyan, 4.5 * TH, { ring: true, width: 2 });
    f.dot(t, z.S, P.amber, 6 * TH, { glow: 14 });
    if (!TRV.thumbMode) {
      for (const n of [1, 4, 16, 64]) tagAt('end' + n, f, PI, zenoAt(n, PI).S, `N=${n}`, n === S.N ? 'cy' : 'tick', n === S.N ? -30 : -14, n === 1 ? -12 : 0);
      tagAt('stay', f, PI * 0.1, 0.12, L('留下', 'stays'), 'cy', 0, 0);
      if (t > PI * 0.35 && z.S < 0.9) tagAt('gone', f, Math.min(t, PI) * 0.82, 0.985, L('走掉', 'gone'), 'mg', 0, -2);
    }
    return { z, r };
  }

  /* ---------- scene: return ---------- */
  function drawReturn(W, H, t) {
    const { a, b } = boxes, st = stage, m = MON, d = S.delta * DEG;
    const j = Math.min(NR, Math.floor(t + 1e-9)), fr = j >= NR ? 0 : t - j, fromSouth = j >= 1;
    st.sphere(1, { lat: [0], lon: 0, shade: 0.07 });
    const stepArc = []; for (let i = 0; i <= 40; i++) stepArc.push(rotX(d * i / 40, fromSouth));
    st.path(stepArc, { color: P.dim, width: 1.4, dash: [5, 4], back: 0.5 });
    const r = rotX(d * fr, fromSouth);
    drawArrowParts(st, r);
    if (!TRV.thumbMode) st.tag('step', rotX(d, fromSouth), L(`一步转 δ = ${S.delta}°`, `one step turns δ = ${S.delta}°`), 'raw', { dx: 40, dy: fromSouth ? 14 : -12, fade: false });
    // right: the ledger
    const f = kit.plot($('cv'), { x: [-0.8, NR + 0.8], y: [0, 1.13], pad: padOf(b, W, H, 34, 8, 8, 20), clear: false });
    chart = f;
    const ticks = []; for (let k = 0; k <= NR; k += 10) ticks.push([k, String(k)]);
    f.axes({ yTicks: [[0, '0'], [0.5, '0.5'], [1, '1']], xTicks: ticks, xLabel: TRV.thumbMode ? '' : L('步数 n', 'step n') });
    let returned = 0, area = 0;
    const hw = 0.38;
    for (let n = 0; n <= j; n++) {
      if (n >= 1) returned += m.p[n];
      area += m.s_[n];
      if (returned > 1e-9) f.rect(n - hw, 0, n + hw, returned, P.cyan, { alpha: 0.75 });
      if (m.s_[n] > 1e-9) f.rect(n - hw, returned, n + hw, 1, P.magenta, { alpha: 0.6 });
    }
    f.hline(1, P.ink, { dash: [5, 4], alpha: 0.85, width: 1.2 * TH });
    f.rect(j - hw - 0.12, 0, j + hw + 0.12, 1, P.amber, { fill: false, stroke: P.amber, width: 1.6 * TH, glow: 8 });
    if (!TRV.thumbMode) {
      tagAt('one', f, NR, 1, L('= 1', '= 1'), 'num', -10, -10);
      tagAt('area', f, NR * 0.45, 1.07, L(`品红面积 ${fix(area, 3)}`, `magenta area ${fix(area, 3)}`), 'mg', 0, 0);
    }
    return { j, fr, r, returned, area, notYet: m.s_[j] };
  }

  /* ---------- stage ---------- */
  const stage = kit.stage3($('stage'), Object.assign(so, {
    canvas: $('cv'),
    onPick: (ev) => {
      const bx = $('cv').getBoundingClientRect(), x = ev.clientX - bx.left, y = ev.clientY - bx.top, B = boxes && boxes.b;
      if (B && x >= B.x && x <= B.x + B.w && y >= B.y && y <= B.y + B.h) { dragChart = true; scrub(x); return true; }
      dragChart = false;
      return S.scene === 'speed';
    },
    onDrag: (ev) => { if (dragChart) scrub(ev.clientX - $('cv').getBoundingClientRect().left); }
  }));
  let dragChart = false;
  function scrub(px) { if (!chart) return; clock.pause(); clock.set(clamp(chart.invX(px), 0, clock.max)); }
  let last = {};
  function drawStage() {
    const cv = $('cv'), W = cv.clientWidth, H = cv.clientHeight;
    boxes = layout(W, H);
    if (S.scene !== 'speed') placeSphere(boxes.a, W, H);
    $('stage').classList.toggle('still', S.scene === 'speed');
    stage.begin();
    if (S.scene === 'speed') last = drawSpeed(W, H, clock.t);
    else if (S.scene === 'zeno') last = drawZeno(W, H, clock.t);
    else last = drawReturn(W, H, clock.t);
    stage.end();
  }

  /* ---------- strip ---------- */
  function drawPlot() {
    const cv = $('plot');
    if (S.scene === 'speed') {
      $('plotTitle').innerHTML = L('能量怎样分布，决定速度', 'The spread of energy sets the speed');
      const g = kit.plot(cv, { x: [-0.6, 2.6], y: [0, 1.05], pad: [30, 10, 8, 22] });
      g.axes({ yTicks: [0, 0.5, 1], xTicks: [[0, '0'], [1, 'E'], [2, '2E']] });
      g.rect(SF.meanH - SF.dH, 0, SF.meanH + SF.dH, 1.05, P.dim, { alpha: 0.18 });
      SF.w.forEach((wn, n) => g.rect(n - 0.22, 0, n + 0.22, wn, P.cyan, { alpha: 0.75 }));
      g.vline(SF.meanH, P.ink, { dash: [4, 3] });
      g.legend([[P.cyan, L('权重', 'weight')], [P.ink, L('平均 ⟨H⟩', 'mean ⟨H⟩'), 'dash']]);
      $('plotMeta').textContent = `⟨H⟩ ${fix(SF.meanH, 3)} · ΔH ${fix(SF.dH, 3)}`;
    } else if (S.scene === 'zeno') {
      $('plotTitle').innerHTML = L('频闪越密，留下越多', 'The denser the strobe, the more stays');
      const g = kit.plot(cv, { x: [0.8, 80], y: [0, 1.05], logX: true, pad: [30, 10, 8, 22] });
      g.axes({ yTicks: [0, 0.5, 1], xTicks: [[1, '1'], [4, '4'], [16, '16'], [64, '64']] });
      const asym = []; for (let i = 0; i <= 100; i++) { const n = Math.pow(80, i / 100); asym.push([n, Math.max(0, 1 - PI * PI / (4 * n))]); }
      g.line(asym, P.dim, { dash: [4, 3], width: 1.2 });
      const pts = [1, 2, 4, 8, 16, 32, 64].map((n) => [n, zenoAt(n, PI).PN]);
      g.line(pts, P.cyan, { width: 1.4, alpha: 0.6 });
      for (const [n, v] of pts) g.dot(n, v, P.cyan, 3.5);
      g.dot(S.N, zenoAt(S.N, PI).PN, P.amber, 6, { ring: true, width: 2 });
      g.legend([[P.cyan, L('全程留存 P_N', 'survival P_N')], [P.dim, '1 − π²/4N', 'dash']], { bottom: true });
      $('plotMeta').textContent = `P${S.N} = ${fix(zenoAt(S.N, PI).PN, 4)}`;
    } else {
      $('plotTitle').innerHTML = L('换一个步长，平均不变', 'Change the step; the mean stays');
      const g = kit.plot(cv, { x: [45, 180], y: [0, 9], pad: [30, 10, 8, 22] });
      g.axes({ yTicks: [0, 2, 4, 8], xTicks: [[45, '45°'], [90, '90°'], [135, '135°'], [180, '180°']] });
      g.line(meanCurve.map((p) => [p[0], p[2]]), P.magenta, { width: 1.6 });
      g.line(meanCurve.map((p) => [p[0], p[1]]), P.ink, { width: 2.2 });
      g.vline(S.delta, P.amber, { alpha: 0.85 });
      g.legend([[P.ink, L('平均返回时间', 'mean return time')], [P.magenta, L('第一步没回来时 1 + 1/s²', 'after a first miss 1 + 1/s²')]]);
      $('plotMeta').textContent = `${L('平均', 'mean')} ${fix(MON.mean, 6)}`;
    }
  }

  /* ---------- readouts, HUD, legend ---------- */
  const row = (cls, zh, en, val) => `<div class="${cls}"><dt>${L(zh, en)}</dt><dd>${val}</dd></div>`;
  const LEGEND = {
    speed: [['cy', '到起点的夹角 θ；左边：重叠的各支', 'angle θ to the start; left: the parts of the overlap'], ['dm', '速度线 ΔH·t', 'speed line ΔH·t'], ['mg', '90° 的墙；左边：重叠为 0', 'the 90° wall; left: zero overlap'], ['am', '此刻', 'now']],
    zeno: [['cy', '线上的影子 · 留下的概率', 'shadow on the line · chance to stay'], ['mg', '离开线的一份 · 走掉的概率', 'part off the line · chance gone'], ['dm', '不看时的路', 'the unwatched path'], ['am', '当前的箭头', 'the current arrow']],
    return: [['cy', '已返回；箭头在线上的影子', 'returned; the arrow\'s shadow on the line'], ['mg', '还没回来；离开线的一份', 'not yet; the part off the line'], ['am', '当前这一步', 'the current step']]
  };
  function drawText() {
    const t = clock.t;
    let big = '', sub = '', key = '', rows = '', note = '', aside = '', pill = ['', ''];
    if (S.scene === 'speed') {
      const th = angleOf(SF.w, t), name = S.levels === 3 ? L('三能级等权', 'three even levels') : S.alpha === 45 ? L('二能级等权', 'two even levels') : L(`二能级 α = ${S.alpha}°`, `two levels, α = ${S.alpha}°`);
      big = name;
      sub = `t = ${fix(t, 3)} · ${L('夹角', 'angle')} <span class="c-cy">${fix(th / DEG, 1)}°</span> · ${L('速度线', 'speed line')} ${fix(Math.min(90, SF.dH * t / DEG), 1)}°${SF.dH * t > PI / 2 ? L('（已到墙）', ' (at the wall)') : ''}`;
      key = SF.tauPerp != null ? `${L('撞墙', 'wall at')} τ⊥ = ${fix(SF.tauPerp, 4)} <small>≥ MT ${fix(SF.tauMT, 4)}</small>` : `${L('到不了墙 · 最多', 'never at the wall · at most')} ${fix(SF.maxAngle / DEG, 1)}°`;
      rows = row('c', '此刻夹角 θ', 'angle θ now', `${fix(th, 4)} rad`) + row('', '此刻走过的弧长 ΔH·t', 'arc length so far ΔH·t', `${fix(SF.dH * t, 4)} rad`)
        + row('', '能量涨落 ΔH', 'energy spread ΔH', `${fix(SF.dH, 4)} E`) + row('', '平均能量 ⟨H⟩', 'mean energy ⟨H⟩', `${fix(SF.meanH, 4)} E`)
        + row('', 'MT 界 π/(2ΔH)', 'MT bound π/(2ΔH)', fix(SF.tauMT, 4)) + row('', 'ML 界 π/(2⟨H⟩)', 'ML bound π/(2⟨H⟩)', fix(SF.tauML, 4));
      aside = 'θ_FS = arccos|⟨ψ₀,ψₜ⟩|';
      note = SF.tauPerp == null ? L(`重叠最小是 |cos 2α| = ${fix(SF.minOv, 4)}，夹角最多 2α = ${fix(SF.maxAngle / DEG, 1)}°。`, `The overlap never drops below |cos 2α| = ${fix(SF.minOv, 4)}, so the angle is at most 2α = ${fix(SF.maxAngle / DEG, 1)}°.`)
        : Math.abs(SF.tauPerp - SF.tauMT) < 1e-6 ? L('夹角始终等于速度线：撞墙的时刻就是 MT 与 ML 两条界。', 'The angle equals the speed line all along: it meets the wall exactly at the MT and the ML bounds.')
          : L(`撞墙时走过的弧长 ${fix(SF.dH * SF.tauPerp, 4)} rad，比 90° 的测地线 1.5708 rad 长 ${fix(100 * (SF.dH * SF.tauPerp / (PI / 2) - 1), 1)}%。`, `By the wall the state has travelled ${fix(SF.dH * SF.tauPerp, 4)} rad, ${fix(100 * (SF.dH * SF.tauPerp / (PI / 2) - 1), 1)}% more than the 90° geodesic of 1.5708 rad.`);
      pill = [L('夹角', 'ANGLE'), `${fix(th / DEG, 1)}°`];
    } else if (S.scene === 'zeno') {
      const z = zenoAt(S.N, t);
      big = L(`频闪 N = ${S.N}`, `Strobe N = ${S.N}`);
      sub = `${L(`已测 ${z.k} / ${S.N} 次`, `${z.k} of ${S.N} looks done`)} · ${L('此刻留存', 'surviving now')} <span class="c-cy">${fix(z.S, 4)}</span>`;
      key = `P<sub>${S.N}</sub> = ${fix(z.PN, 4)} <small>[cos²(π/2N)]<sup>N</sup></small>`;
      rows = row('', '每段转角 180°/N', 'turn per look 180°/N', `${fix(180 / S.N, 4)}°`) + row('c', '每次答“是”cos²(π/2N)', 'a yes per look cos²(π/2N)', fix(z.p1, 4))
        + row('m', '每段末离开线的一份（品红横段）sin(π/N)', 'part off the line at the end of a look (magenta) sin(π/N)', fix(Math.sin(PI / S.N), 4))
        + row('', '线上影子损失 1 − cos(π/N)', 'shadow lost per look 1 − cos(π/N)', fix(1 - Math.cos(PI / S.N), 4))
        + row('', '近似 1 − π²/(4N)', 'approx. 1 − π²/(4N)', S.N > 1 ? fix(1 - PI * PI / (4 * S.N), 4) : '—');
      aside = 'P_N = [cos²(π/2N)]^N';
      note = S.N === 1 ? L('只在终点测一次：不看的路一路翻到 |1⟩，留存为 0。', 'One look at the end only: the unwatched path goes all the way to |1⟩ and nothing survives.')
        : L(`每段末品红的横段长 sin(π/N) = ${fix(Math.sin(PI / S.N), 3)}，是一阶小量（希尔伯特空间里离开 |0⟩ 的振幅 sin(π/2N) = ${fix(Math.sin(PI / (2 * S.N)), 3)} 也是）；影子只损失二阶小量 1 − cos(π/N)，答“否”的概率 sin²(π/2N) 也是二阶；N 段加起来只走掉 ${fix(1 - z.PN, 3)}。`, `At the end of each look the magenta part off the line is sin(π/N) = ${fix(Math.sin(PI / S.N), 3)} long, first order (so is the Hilbert-space amplitude off |0⟩, sin(π/2N) = ${fix(Math.sin(PI / (2 * S.N)), 3)}); the shadow loses only the second-order 1 − cos(π/N), and a no has the second-order chance sin²(π/2N); over N looks only ${fix(1 - z.PN, 3)} gets away.`);
      pill = ['P_N', fix(z.PN, 3)];
    } else {
      const m = MON, j = Math.min(NR, Math.floor(t + 1e-9));
      let ret = 0; for (let n = 1; n <= j; n++) ret += m.p[n];
      big = `δ = ${S.delta}°`;
      sub = `${L(`第 ${j} 步`, `step ${j}`)} · <span class="c-cy">${L('已返回', 'returned')} ${fix(ret, 4)}</span> + <span class="c-mg">${L('还没回来', 'not yet')} ${fix(m.s_[j], 4)}</span> = ${fix(ret + m.s_[j], 4)}`;
      key = `${fix(m.mean, 6)} <small>Σ s<sub>n</sub> · ${L('迭代 4000 步', '4000 steps')}</small>`;
      rows = row('c', '第一步就回来 p₁ = c²', 'back at once p₁ = c²', fix(m.p[1], 6)) + row('m', '第一步没回来 s₁ = s²', 'first miss s₁ = s²', fix(m.s_[1], 6))
        + row('', '没回来时平均 1 + 1/s²', 'after a miss 1 + 1/s²', fix(1 + 1 / (m.s * m.s), 4))
        + row('', 'Σ n·pₙ（迭代 4000 步）', 'Σ n·pₙ (4000 steps)', fix(m.meanNp, 6)) + row('', 'Σ pₙ（迭代 4000 步）', 'Σ pₙ (4000 steps)', fix(m.sumP, 6));
      aside = 'Σ p + s_N = 1';
      note = L(`c²·1 + s²·(1 + 1/s²) = ${fix(m.p[1], 4)} + ${fix(m.s_[1] * (1 + 1 / (m.s * m.s)), 4)} = 2：看得越勤，第一步回来得越多，没回来的等得越久。`, `c²·1 + s²·(1 + 1/s²) = ${fix(m.p[1], 4)} + ${fix(m.s_[1] * (1 + 1 / (m.s * m.s)), 4)} = 2: the finer the step, the more come back at once, and the longer the rest wait.`);
      pill = [L('平均', 'MEAN'), fix(m.mean, 3)];
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('ro').innerHTML = `<div class="key"><dt>${S.scene === 'speed' ? L('正交时间与速度线', 'orthogonal time and the speed line') : S.scene === 'zeno' ? L('全程留存', 'survival over the run') : L('平均返回时间 = 品红面积', 'mean return time = magenta area')}</dt><dd><b>${key}</b></dd></div>${rows}`;
    $('roNote').textContent = note; $('roAside').textContent = aside;
    $('pillScene').querySelector('strong').textContent = { speed: L('速度极限', 'SPEED'), zeno: L('芝诺频闪', 'ZENO'), return: L('首次返回', 'RETURN') }[S.scene];
    $('pillKeyName').textContent = pill[0]; $('pillKey').querySelector('strong').textContent = pill[1];
    $('legend').innerHTML = LEGEND[S.scene].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    $('alpha').disabled = S.levels === 3;
  }

  const paint = kit.painter(() => { drawText(); drawStage(); drawPlot(); }, [$('stage'), $('plot')]);

  /* ---------- the rail ---------- */
  const SC = {
    speed: { max: () => TS, rate: () => 0.6, step: () => PI / 12 },
    zeno: { max: () => PI, rate: () => 0.55, step: () => PI / S.N },
    return: { max: () => NR, rate: () => 6, step: () => 1 }
  };
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: TS, rate: 0.6, step: PI / 12,
    // the label is first drawn while the clock is being built: it reads t, max and S only
    format: (t, max) => (S.scene === 'speed' ? `t = ${fix(t, 2)} <small>/ π ħ/E</small>` : S.scene === 'zeno' ? `ωt = ${fix(t / DEG, 1)}° <small>/ 180°</small>`
      : L(`第 ${Math.floor(t + 1e-9)} 步 <small>/ ${Math.round(max)}</small>`, `step ${Math.floor(t + 1e-9)} <small>/ ${Math.round(max)}</small>`)),
    onChange: () => paint()
  });
  const STILL = { speed: TS, zeno: PI, return: NR };
  function fitClock(t) {
    const sc = SC[S.scene];
    clock.pause(); clock.rate = sc.rate(); clock.step = sc.step(); clock.setMax(sc.max(), true); clock.set(t == null ? STILL[S.scene] : t);
  }
  function setScene(sc, t) {
    S.scene = sc; sceneChips.set(sc, true);
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    fitClock(t);
  }

  /* ---------- controls ---------- */
  const leave = () => cards.mark(null);
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  const levelChips = kit.chips($('levelChips'), 'levels', (v) => { leave(); S.levels = Number(v); refresh(); fitClock(clock.t); });
  const strobeChips = kit.chips($('strobeChips'), 'strobes', (v) => { leave(); S.N = Number(v); fitClock(clock.t); });
  const fAlpha = kit.field($('alpha'), { fmt: (v) => `${v}°`, onInput: (v) => { leave(); S.alpha = v; refresh(); paint(); } });
  const fDelta = kit.field($('delta'), { fmt: (v) => `${v}°`, onInput: (v) => { leave(); S.delta = v; refresh(); paint(); } });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('speed'); }, 2: () => { leave(); setScene('zeno'); }, 3: () => { leave(); setScene('return'); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    equal: { scene: 'speed', levels: 2, alpha: 45, still: PI },
    three: { scene: 'speed', levels: 3, still: 2 * PI / 3 },
    unequal: { scene: 'speed', levels: 2, alpha: 30, still: PI },
    strobe4: { scene: 'zeno', N: 4, still: PI },
    strobe16: { scene: 'zeno', N: 16, still: PI * (1 - 1 / 32) },   // half-way through the last turn
    mean: { scene: 'return', delta: 45, still: NR }
  };
  const NOTES = {
    equal: ['二能级等权叠加：左边两支青色箭头各长一半，转到首尾相对时和为零，琥珀色的点落进品红的圆心。右边青色曲线一路贴着虚线速度线，在 t = π 撞上品红的墙；半途的点把它分成 45° + 45° 两段。', 'Two even levels: on the left two cyan arrows of length one half; when they point opposite ways their sum is zero and the amber dot falls into the magenta centre. On the right the cyan curve runs along the dashed speed line all the way and meets the magenta wall at t = π; the half-way point splits it into 45° + 45°.'],
    three: ['三能级等权叠加：左边三支青色箭头在 t = 2π/3 围成一个三角形，琥珀色的点回到圆心。右边青色曲线弯到虚线速度线下面：速度线在 MT 1.924 已到墙，曲线到 τ⊥ 2.094 才碰到品红的墙。', 'Three even levels: on the left three cyan arrows close into a triangle at t = 2π/3 and the amber dot returns to the centre. On the right the cyan curve bends below the dashed speed line: the speed line reaches the wall at MT 1.924, the curve touches the magenta wall only at τ⊥ 2.094.'],
    unequal: ['权重角 α = 30°：左边长箭头 0.75、短箭头 0.25，怎么转也抵消不完，琥珀色的点绕着青色虚线圆走，离品红的圆心最近 0.5。右边夹角最多升到 60°，碰不到品红的墙。', 'Weight angle α = 30°: on the left a long arrow of 0.75 and a short one of 0.25 never cancel; the amber dot circles outside the dashed cyan ring and comes no closer than 0.5 to the magenta centre. On the right the angle rises to 60° at most and never touches the magenta wall.'],
    strobe4: ['频闪 4 次：箭头每转 45° 就被拉回 |0⟩，青色的弧是每段走到的地方。右边留下的概率每段降一截，到 180° 还剩 0.531；虚线是不看时的路，到 180° 全部走掉。', 'Four strobes: the arrow is pulled back to |0⟩ after every 45° turn; the cyan arc is as far as each turn gets. On the right the chance to stay drops a step per look and is 0.531 at 180°; the dashed line is the unwatched path, which loses everything by 180°.'],
    strobe16: ['频闪 16 次：每段只转 11.25°，品红的一份刚露头就被拉回，青色的影子几乎不短。右边青色几乎铺满，到 180° 还剩 0.857。', 'Sixteen strobes: each turn is only 11.25°; the magenta part barely shows before the arrow is pulled back, and the cyan shadow hardly shortens. On the right the cyan nearly fills the plot, with 0.857 left at 180°.'],
    mean: ['δ = 45°：每一步之后问一次“回来了吗”。第一根之后的柱子青色涨、品红缩，每根都正好到 1 这条线；品红面积从 1 涨向 2。', 'δ = 45°: after every step ask “back yet?”. Past the first column the cyan grows and the magenta shrinks, and every column reaches exactly the line at 1; the magenta area grows from 1 towards 2.']
  };
  let booting = true, moving = null;
  function applyPreset(id) {
    const p = PRESETS[id];
    if (moving) { moving.cancel(); moving = null; }
    const land = () => {
      moving = null;
      if (p.levels) { S.levels = p.levels; levelChips.set(String(p.levels), true); }
      if (p.alpha != null) { S.alpha = p.alpha; fAlpha.set(p.alpha); }
      if (p.N) { S.N = p.N; strobeChips.set(String(p.N), true); }
      if (p.delta != null) { S.delta = p.delta; fDelta.set(p.delta); }
      refresh();
      setScene(p.scene, 0);
      // a still (cover, cited figure shot) and the opening view of the full page show the card's telling frame;
      // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
      if (TRV.still || (booting && !TRV.embed)) clock.set(p.still);
      else if (booting) kit.autoplay(clock, $('stage'));
      else clock.play();
    };
    if (booting || TRV.still || p.scene !== S.scene) { land(); return; }
    // same scene: carry the weight angle or the step over, so the eye can follow what changed
    const a0 = S.alpha, d0 = S.delta, a1 = p.alpha != null ? p.alpha : a0, d1 = p.delta != null ? p.delta : d0;
    if (p.levels && p.levels !== S.levels) { land(); return; }
    clock.pause();
    moving = kit.tween(420, (e) => { S.alpha = Math.round(a0 + (a1 - a0) * e); S.delta = Math.round(d0 + (d1 - d0) * e); refresh(); paint(); }, land);
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景、拖时间轴、改权重、频闪次数或步长。随时可以再选一张卡。', 'Free play: switch scenes, drag the rail, change the weights, the strobe or the step. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.ZENO_DEBUG = {
    get state() {
      const t = clock.t, z = zenoAt(S.N, t), j = Math.min(NR, Math.floor(t + 1e-9));
      let returned = 0; for (let n = 1; n <= j; n++) returned += MON.p[n];
      return {
        scene: S.scene, levels: S.levels, alpha: S.alpha, N: S.N, delta: S.delta, t, max: clock.max, playing: clock.playing, preset: cards.current,
        speed: { w: SF.w.slice(), theta: angleOf(SF.w, t), overlap: overlap(SF.w, t), arc: SF.dH * t, dH: SF.dH, meanH: SF.meanH, tauMT: SF.tauMT, tauML: SF.tauML, tauPerp: SF.tauPerp, minOv: SF.minOv, maxAngle: SF.maxAngle },
        zeno: { k: z.k, phi: z.phi, p1: z.p1, S: z.S, PN: z.PN },
        ret: { j, p: MON.p.slice(0, NR + 1), s: MON.s_.slice(0, NR + 1), returned, notYet: MON.s_[j], mean: MON.mean, meanNp: MON.meanNp, sumP: MON.sumP },
        arrow: last && last.r ? last.r.slice() : null
      };
    },
    meanCurve: () => meanCurve.map((p) => p.slice()),
    seek: (t) => { clock.pause(); clock.set(t); },
    camera: () => Object.assign({}, stage.cam),
    /** Viewport rectangle of the chart on the right (for pointer tests). */
    chartBox: () => { const b = $('cv').getBoundingClientRect(), B = boxes.b; return [b.left + B.x, b.top + B.y, B.w, B.h]; },
    chartX: (x) => { const b = $('cv').getBoundingClientRect(); return b.left + chart.X(x); }
  };
  window.TRV_THUMB = () => { applyPreset('strobe4'); cards.mark('strobe4'); paint.now(); };
  cards.pick(cards.initial('three'));
  booting = false;
  paint();
})();
