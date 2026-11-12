/* SHIFT//RULE · 参数位移 · The parameter-shift rule
   One qubit, Bloch vector r₀, one gate R_y(θ) = e^{−iθY/2}, the Pauli operator along m measured: f(θ) = m·r(θ).
   The stage has three parts that share one vertical scale (on a wide screen):
     dial    the arrow of length R at the angle θ − θ₀ from the vertical: its height is f (its shadow on the axis);
             the two cyan arrows a quarter turn away give f(θ ± 90°)
     curve   f against θ, the current angle (amber), the two settings θ ± 90° (cyan), the dashed tangent whose slope
             comes from the commutator formula, and the small-step chord through θ ± h (magenta)
     gauge   the three slopes side by side: tangent (ink line), half the difference (cyan), small step (magenta);
             in the shots scene, one dot per trial
   Two scenes on one rail: curve (the rail is θ) and shots (the rail is the number of trials).
   Read-only probe for the browser suite: window.SHIFT_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, sgn, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, DEG = PI / 180, Q = PI / 2;
  const TH = TRV.thumbMode ? 2 : 1;          // thicker strokes on the wordless cover
  const TRIALS = 200, NMAX = 1000;           // the shots scene: up to 200 trials of up to 1000 shots per setting
  const XR = [-3 * Q - 0.25, 3 * Q + 0.25];  // the curve shows θ ± 90° for every θ on the rail
  const YC = [-1.18, 1.18];                  // the shared vertical scale of dial, curve and (curve scene) gauge
  const YS = [-3.2, 3.2];                    // the gauge in the shots scene

  /* ---------- the model ---------- */
  const MODELS = {
    z: { r0: [0, 0, 1], m: [0, 0, 1] },
    tilt: { r0: [0.48, 0.6, 0.64], m: [0.8, 0.36, 0.48] }
  };
  /** R_y(θ) on a Bloch vector: (x cos θ + z sin θ, y, −x sin θ + z cos θ). */
  const turn = (r, th) => [r[0] * Math.cos(th) + r[2] * Math.sin(th), r[1], -r[0] * Math.sin(th) + r[2] * Math.cos(th)];
  const dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
  function coeffs(M) {
    const { r0, m } = M, c = m[1] * r0[1], a = m[0] * r0[0] + m[2] * r0[2], b = m[0] * r0[2] - m[2] * r0[0];
    return { c, a, b, R: Math.hypot(a, b), th0: Math.atan2(b, a) };
  }
  /* 2 × 2 complex matrices as [[re, im] × 4] in row order; the commutator derivative of the frozen proposition */
  const cm = (x, y) => [x[0] * y[0] - x[1] * y[1], x[0] * y[1] + x[1] * y[0]];
  const cadd = (x, y) => [x[0] + y[0], x[1] + y[1]];
  const mmul = (A, B) => [cadd(cm(A[0], B[0]), cm(A[1], B[2])), cadd(cm(A[0], B[1]), cm(A[1], B[3])), cadd(cm(A[2], B[0]), cm(A[3], B[2])), cadd(cm(A[2], B[1]), cm(A[3], B[3]))];
  const msub = (A, B) => A.map((x, i) => [x[0] - B[i][0], x[1] - B[i][1]]);
  const adj = (A) => [[A[0][0], -A[0][1]], [A[2][0], -A[2][1]], [A[1][0], -A[1][1]], [A[3][0], -A[3][1]]];
  /** (I + v·σ)/2 */
  const half = (v) => [[(1 + v[2]) / 2, 0], [v[0] / 2, -v[1] / 2], [v[0] / 2, v[1] / 2], [(1 - v[2]) / 2, 0]];
  const HY = [[0, 0], [0, -0.5], [0, 0.5], [0, 0]];     // H = Y/2
  /** f′(θ) = 2 Re(i Tr(ρ_θ (HP − PH))), ρ_θ = U ρ₀ U*, U = cos(θ/2) I − i sin(θ/2) Y. */
  function slopeByCommutator(M, th) {
    const c = Math.cos(th / 2), s = Math.sin(th / 2), U = [[c, 0], [-s, 0], [s, 0], [c, 0]];
    const rho = mmul(mmul(U, half(M.r0)), adj(U)), Pm = half(M.m), K = msub(mmul(HY, Pm), mmul(Pm, HY)), X = mmul(rho, K);
    const tr = cadd(X[0], X[3]);                        // Tr(ρ_θ K)
    return 2 * -tr[1];                                  // Re(i · tr) = −Im(tr)
  }

  /* ---------- state ---------- */
  const S = { scene: 'curve', model: 'z', theta: PI / 3, h: 30, N: 100, seed: 1 };
  let C = coeffs(MODELS[S.model]);
  const f = (th) => C.c + C.a * Math.cos(th) + C.b * Math.sin(th);
  const fdOf = (th, hr) => (f(th + hr) - f(th - hr)) / (2 * hr);
  const shiftOf = (th) => (f(th + Q) - f(th - Q)) / 2;

  /* ---------- shots: seeded uniforms, counts of +1 at the four settings ---------- */
  let U = null;
  function mulberry32(a) { return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function draw() { const r = mulberry32(0x5eed + 7919 * S.seed); U = new Float32Array(TRIALS * 4 * NMAX); for (let i = 0; i < U.length; i++) U[i] = r(); }
  draw();
  let SH = null, shKey = '';
  /** Settings θ + 90°, θ − 90°, θ + h, θ − h; for each trial the number of +1 among N shots, and the two estimates. */
  function shots() {
    const key = [S.model, S.theta, S.h, S.N, S.seed].join('|');
    if (key === shKey) return SH;
    const hr = S.h * DEG, ang = [S.theta + Q, S.theta - Q, S.theta + hr, S.theta - hr], pr = ang.map((t) => (1 + f(t)) / 2);
    const k = [], est = [], fd = [];
    for (let i = 0; i < TRIALS; i++) {
      const row = [0, 0, 0, 0];
      for (let j = 0; j < 4; j++) { const o = (i * 4 + j) * NMAX; let n = 0; for (let s = 0; s < S.N; s++) if (U[o + s] < pr[j]) n++; row[j] = n; }
      const mean = row.map((n) => 2 * n / S.N - 1);
      k.push(row); est.push((mean[0] - mean[1]) / 2); fd.push((mean[2] - mean[3]) / (2 * hr));
    }
    const fa = ang.map(f);
    SH = { ang, k, est, fd, sdShift: Math.sqrt((1 - fa[0] ** 2) + (1 - fa[1] ** 2)) / (2 * Math.sqrt(S.N)), sdFd: Math.sqrt((1 - fa[2] ** 2) + (1 - fa[3] ** 2)) / (2 * hr * Math.sqrt(S.N)) };
    shKey = key;
    return SH;
  }
  const stats = (xs) => { const n = xs.length; if (!n) return { mean: NaN, sd: NaN }; const m = xs.reduce((a, x) => a + x, 0) / n; return { mean: m, sd: n > 1 ? Math.sqrt(xs.reduce((a, x) => a + (x - m) ** 2, 0) / (n - 1)) : 0 }; };
  const trialsNow = () => (S.scene === 'shots' ? Math.round(clock.t) : 0);

  /* ---------- layout: dial | curve | gauge on a wide stage; dial and gauge above the curve on a narrow one ---------- */
  let boxes = null, curveG = null, dialG = null;
  function layout(W, H) {
    const st = $('stage').getBoundingClientRect(), below = (el) => (el ? el.getBoundingClientRect().bottom - st.top : 0);
    const thumb = TRV.thumbMode;
    const top = thumb ? 30 : Math.max(46, below($('hudBig').parentElement), below($('sceneChips'))) + 8;
    const bottom = thumb ? 30 : Math.max(18, $('legend').offsetHeight + 18);
    const h = Math.max(140, H - top - bottom), side = W / h >= 1.55;
    if (side) {
      const dw = Math.min(h * 0.62, W * 0.24), gw = Math.min(190, Math.max(120, W * 0.17));
      return { side, d: { x: 10, y: top, w: dw, h }, c: { x: 10 + dw + 8, y: top, w: W - dw - gw - 34, h }, g: { x: W - gw - 10, y: top, w: gw, h } };
    }
    const th = h * 0.44;
    return { side, d: { x: 8, y: top, w: (W - 24) * 0.5, h: th }, g: { x: 16 + (W - 24) * 0.5, y: top, w: (W - 24) * 0.5, h: th }, c: { x: 8, y: top + th + 8, w: W - 16, h: h - th - 8 } };
  }
  const padOf = (bx, W, H, l, r, t, b) => [bx.x + l, W - bx.x - bx.w + r, bx.y + t, H - bx.y - bx.h + b];
  const tagAt = (key, g, x, y, html, cls, dx, dy) => stage.tag(key, [g.X(x), g.Y(y)], html, cls, { screen: true, dx: dx || 0, dy: dy || 0 });
  function arrow2(g, x0, y0, x1, y1, color, w, alpha) {
    const c = g.ctx, ax = g.X(x0), ay = g.Y(y0), bx = g.X(x1), by = g.Y(y1), dx = bx - ax, dy = by - ay, l = Math.hypot(dx, dy);
    c.save(); c.globalAlpha = alpha == null ? 1 : alpha; c.strokeStyle = c.fillStyle = color; c.lineWidth = w * TH; c.lineCap = 'round';
    c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx, by); c.stroke();
    if (l > 6) { const hs = Math.min(9 * TH, l * 0.5), ux = dx / l, uy = dy / l; c.beginPath(); c.moveTo(bx, by); c.lineTo(bx - ux * hs - uy * hs * 0.45, by - uy * hs + ux * hs * 0.45); c.lineTo(bx - ux * hs + uy * hs * 0.45, by - uy * hs - ux * hs * 0.45); c.closePath(); c.fill(); }
    c.restore();
  }
  const lbl = (deg) => (deg === 0 ? '0°' : `${deg > 0 ? '' : '−'}${Math.abs(deg)}°`);

  /* ---------- dial ---------- */
  function drawDial(W, H) {
    const b = boxes.d, cv = $('cv');
    const g = kit.plot(cv, { x: [-1.2, 1.2], y: YC, equal: true, pad: padOf(b, W, H, 4, 4, 6, 18), clear: false });
    dialG = g;
    const ring = []; for (let i = 0; i <= 120; i++) ring.push([C.R * Math.sin(i * 3 * DEG), C.c + C.R * Math.cos(i * 3 * DEG)]);
    g.line([[0, YC[0] + 0.02], [0, YC[1] - 0.02]], P.cyan, { width: 1.2 * TH, alpha: 0.45 });
    if (Math.abs(C.c) > 1e-9) g.line([[-1.15, C.c], [1.15, C.c]], P.faint, { width: TH, dash: [3, 4] });
    g.line(ring, P.lineHot, { width: 1.3 * TH });
    const phi = S.theta - C.th0, tip = (p) => [C.R * Math.sin(p), C.c + C.R * Math.cos(p)];
    const t0 = tip(phi), tp = tip(phi + Q), tm = tip(phi - Q);
    arrow2(g, 0, C.c, tp[0], tp[1], P.cyan, 1.8, 0.85); arrow2(g, 0, C.c, tm[0], tm[1], P.cyan, 1.8, 0.85);
    // the shadow of the current arrow on the axis, then the arrow
    g.ctx.save(); g.ctx.shadowColor = P.cyan; g.ctx.shadowBlur = 8; g.line([[0, C.c], [0, t0[1]]], P.cyan, { width: 5 * TH }); g.ctx.restore();
    g.line([[t0[0], t0[1]], [0, t0[1]]], P.amber, { width: TH, dash: [2, 3], alpha: 0.8 });
    arrow2(g, 0, C.c, t0[0], t0[1], P.amber, 2.6, 1);
    g.dot(t0[0], t0[1], P.amber, 5 * TH, { glow: 12 });
    g.dot(tp[0], tp[1], P.cyan, 3.6 * TH); g.dot(tm[0], tm[1], P.cyan, 3.6 * TH);
    if (!TRV.thumbMode) {
      if (boxes.side) stage.tag('dAxis', [b.x + 4, b.y + 6], L('竖线：测量轴', 'vertical line: measured axis'), 'raw cy', { screen: true, dx: L(42, 82), dy: 0 });
      // labels just outside the tip, kept inside the dial's box
      const out = (key, p, txt, cls) => { const x = clamp(g.X(C.R * Math.sin(p)) + Math.sin(p) * 30, b.x + 26, b.x + b.w - 26), y = g.Y(C.c + C.R * Math.cos(p)) - Math.cos(p) * 16; stage.tag(key, [x, y], txt, cls, { screen: true }); };
      out('dT', phi, 'θ', 'raw hot'); out('dP', phi + Q, 'θ+90°', 'raw cy'); out('dM', phi - Q, 'θ−90°', 'raw cy');
    }
    return { t0, tp, tm };
  }

  /* ---------- curve ---------- */
  function drawCurve(W, H) {
    const b = boxes.c, cv = $('cv'), hr = S.h * DEG, th = S.theta;
    const g = kit.plot(cv, { x: XR, y: YC, pad: padOf(b, W, H, 30, 6, 6, 18), clear: false });
    curveG = g;
    const ticks = []; for (let d = -270; d <= 270; d += 90) ticks.push([d * DEG, lbl(d)]);
    g.axes({ yTicks: TRV.thumbMode ? [] : [[-1, '−1'], [0, '0'], [1, '1']], xTicks: TRV.thumbMode ? [] : ticks, xLabel: TRV.thumbMode ? '' : 'θ' });
    if (Math.abs(C.c) > 1e-9) g.hline(C.c, P.faint, { dash: [3, 4] });
    const pts = []; for (let i = 0; i <= 480; i++) { const x = XR[0] + (XR[1] - XR[0]) * i / 480; pts.push([x, f(x)]); }
    g.line(pts, P.cyan, { width: 2.2 * TH, glow: 6 });
    // the window θ − 90° … θ + 90°
    g.rect(th - Q, YC[0], th + Q, YC[1], P.cyan, { alpha: 0.05 });
    g.vline(th, P.amber, { alpha: 0.35, dash: [3, 4] });
    const fp = f(th + Q), fm = f(th - Q), sl = slopeByCommutator(MODELS[S.model], th);
    g.vline(th + Q, P.cyan, { alpha: 0.35, dash: [2, 4] }); g.vline(th - Q, P.cyan, { alpha: 0.35, dash: [2, 4] });
    // the small-step chord: the line through the two sampled points (θ − h, f(θ − h)) and (θ + h, f(θ + h)), whose
    // midpoint sits at θ with the mean of the two values; drawn at least over the run of the tangent and out to both points
    const run = 0.95, fd = fdOf(th, hr), f0 = f(th), fHi = f(th + hr), fLo = f(th - hr), mid = (fHi + fLo) / 2, runC = Math.max(run, hr);
    g.ctx.save(); g.ctx.beginPath(); g.ctx.rect(g.pl, g.pt, g.iw, g.ih); g.ctx.clip();
    g.line([[th - runC, mid - fd * runC], [th + runC, mid + fd * runC]], P.magenta, { width: 1.8 * TH, alpha: 0.9 });
    g.dot(th + hr, fHi, P.magenta, 3.4 * TH); g.dot(th - hr, fLo, P.magenta, 3.4 * TH);
    g.line([[th - run, f0 - sl * run], [th + run, f0 + sl * run]], P.ink, { width: 1.6 * TH, dash: [6, 4] });
    g.ctx.restore();
    g.dot(th + Q, fp, P.cyan, 5.5 * TH, { glow: 10 }); g.dot(th - Q, fm, P.cyan, 5.5 * TH, { glow: 10 });
    g.dot(th, f0, P.amber, 6.5 * TH, { glow: 14 });
    if (!TRV.thumbMode) {
      tagAt('cP', g, th + Q, fp, `f(θ+90°) ${fix(fp, 3)}`, 'raw cy', 0, fp > 0.75 ? 14 : -14);
      tagAt('cM', g, th - Q, fm, `f(θ−90°) ${fix(fm, 3)}`, 'raw cy', 0, fm > 0.75 ? 14 : -14);
      const yIn = (v) => clamp(v, YC[0] + 0.08, YC[1] - 0.08);
      tagAt('cT', g, th + run, yIn(f0 + sl * run), L('切线', 'tangent'), 'raw ink', 26, sl > 0 ? -6 : 6);
      if (Math.abs(C.c) > 1e-9) tagAt('cC', g, XR[0] + 0.25, C.c, 'c', 'tick', 6, -8);
    }
    return { fp, fm, sl, fd };
  }

  /* ---------- gauge: three slopes side by side ---------- */
  function drawGauge(W, H, cur) {
    const b = boxes.g, cv = $('cv'), shotsScene = S.scene === 'shots', y = shotsScene ? YS : YC;
    const g = kit.plot(cv, { x: [0, 3], y, pad: padOf(b, W, H, 30, 4, 6, 18), clear: false });
    g.axes({ yTicks: shotsScene ? [[-3, '−3'], [-2, '−2'], [-1, '−1'], [0, '0'], [1, '1'], [2, '2'], [3, '3']] : [[-1, '−1'], [0, '0'], [1, '1']], xTicks: TRV.thumbMode ? [] : [[0.5, 'f′'], [1.5, '±90°'], [2.5, `±${S.h}°`]] });
    g.hline(0, P.faint, {});
    g.line([[0.05, cur.sl], [2.95, cur.sl]], P.ink, { width: 1.6 * TH, dash: [6, 4] });
    g.rect(0.3, 0, 0.7, cur.sl, P.ink, { alpha: 0.25 });
    const n = trialsNow(), out = { above: 0, below: 0 };
    if (!shotsScene) {
      g.rect(1.25, 0, 1.75, cur.shift, P.cyan, { alpha: 0.7 });
      g.rect(2.25, 0, 2.75, cur.fd, P.magenta, { alpha: 0.6 });
      g.line([[1.18, cur.shift], [1.82, cur.shift]], P.cyan, { width: 2.6 * TH, glow: 8 });
      g.line([[2.18, cur.fd], [2.82, cur.fd]], P.magenta, { width: 2.6 * TH });
    } else {
      const sh = shots();
      const jit = (i) => ((i * 0.6180339887) % 1) - 0.5;
      for (let i = 0; i < n; i++) {
        g.dot(1.5 + jit(i) * 0.5, sh.est[i], P.cyan, 2.2 * TH, { alpha: 0.75 });
        const v = sh.fd[i];
        if (v > y[1]) out.above++; else if (v < y[0]) out.below++; else g.dot(2.5 + jit(i) * 0.5, v, P.magenta, 2.2 * TH, { alpha: 0.7 });
      }
      if (n >= 2) for (const [x, xs, col] of [[1.5, sh.est.slice(0, n), P.cyan], [2.5, sh.fd.slice(0, n), P.magenta]]) {
        const st = stats(xs), lo = clamp(st.mean - st.sd, y[0], y[1]), hi = clamp(st.mean + st.sd, y[0], y[1]);
        g.line([[x + 0.36, lo], [x + 0.42, lo], [x + 0.42, hi], [x + 0.36, hi]], col, { width: 1.4 * TH });
      }
      if (!TRV.thumbMode) {
        if (out.above) tagAt('gUp', g, 2.5, y[1], `↑ ${out.above}`, 'mg', 0, 8);
        if (out.below) tagAt('gDn', g, 2.5, y[0], `↓ ${out.below}`, 'mg', 0, -8);
      }
    }
    if (!TRV.thumbMode) tagAt('gK', g, 1.5, y[1], L('斜率', 'slope'), 'tick', 0, 8);
    return out;
  }

  /* ---------- stage ---------- */
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), rotate: false,
    onPick: (ev) => { const w = where(ev); if (!w) return false; drag = w; aim(ev); return true; },
    onDrag: (ev) => { if (drag) aim(ev); },
    onDrop: () => { drag = null; }
  });
  let drag = null;
  const inBox = (B, x, y) => B && x >= B.x && x <= B.x + B.w && y >= B.y && y <= B.y + B.h;
  function where(ev) { const r = $('cv').getBoundingClientRect(), x = ev.clientX - r.left, y = ev.clientY - r.top; return boxes ? (inBox(boxes.c, x, y) ? 'curve' : inBox(boxes.d, x, y) ? 'dial' : null) : null; }
  function aim(ev) {
    const r = $('cv').getBoundingClientRect(), x = ev.clientX - r.left, y = ev.clientY - r.top;
    let th;
    if (drag === 'curve' && curveG) th = curveG.invX(x);
    else if (drag === 'dial' && dialG) { const dx = dialG.invX(x), dy = dialG.invY(y) - C.c; if (Math.hypot(dx, dy) < 0.05) return; th = Math.atan2(dx, dy) + C.th0; th = ((th + PI) % (2 * PI) + 2 * PI) % (2 * PI) - PI; }
    else return;
    cards.mark(null);
    setTheta(clamp(th, -PI, PI));
  }
  let last = {};
  function drawStage() {
    const cv = $('cv'), W = cv.clientWidth, H = cv.clientHeight;
    boxes = layout(W, H);
    stage.begin();
    const dl = drawDial(W, H), cu = drawCurve(W, H);
    cu.shift = shiftOf(S.theta);
    const out = drawGauge(W, H, cu);
    stage.end();
    last = { dial: dl, cur: cu, out };
  }

  /* ---------- strip ---------- */
  function drawPlot() {
    const cv = $('plot');
    if (S.scene === 'curve') {
      $('plotTitle').innerHTML = L('换一个角度，两条线仍然重合', 'At every angle the two lines coincide');
      const g = kit.plot(cv, { x: [-PI, PI], y: [-1.1, 1.1], pad: [30, 10, 8, 22] });
      g.axes({ yTicks: [[-1, '−1'], [0, '0'], [1, '1']], xTicks: [[-PI, '−180°'], [-Q, '−90°'], [0, '0°'], [Q, '90°'], [PI, '180°']] });
      const sl = [], sh = [], fd = [];
      for (let i = 0; i <= 240; i++) { const x = -PI + 2 * PI * i / 240; sl.push([x, slopeByCommutator(MODELS[S.model], x)]); sh.push([x, shiftOf(x)]); fd.push([x, fdOf(x, S.h * DEG)]); }
      g.line(fd, P.magenta, { width: 1.4 });
      g.line(sl, P.ink, { width: 3.2, alpha: 0.55 });
      g.line(sh, P.cyan, { width: 1.6, dash: [5, 4] });
      g.vline(S.theta, P.amber, { alpha: 0.85 });
      g.legend([[P.ink, L('切线斜率', 'tangent slope')], [P.cyan, L('±90° 两值差的一半', 'half the ±90° difference'), 'dash'], [P.magenta, L(`±${S.h}° 差分`, `±${S.h}° difference`)]], { bottom: true });
      $('plotMeta').textContent = `${L('最大偏差', 'max gap')} ${maxGap().toExponential(1)}`;
    } else {
      $('plotTitle').innerHTML = L('步长越小：截断越小，噪声越大', 'A smaller step: less truncation, more noise');
      const g = kit.plot(cv, { x: [1, 90], y: [1e-4, 10], logX: true, logY: true, pad: [34, 10, 8, 22] });
      g.axes({ yTicks: [[1e-4, '10⁻⁴'], [1e-2, '10⁻²'], [1, '1']], xTicks: [[1, '1°'], [3, '3°'], [10, '10°'], [30, '30°'], [90, '90°']] });
      const tr = [], nz = [];
      const th = S.theta, s0 = slopeByCommutator(MODELS[S.model], th), fp = f(th + Q), fm = f(th - Q);
      for (let i = 0; i <= 160; i++) {
        const hd = Math.pow(90, i / 160), hr = hd * DEG, e = Math.abs(fdOf(th, hr) - s0);
        tr.push([hd, e > 1e-12 ? e : null]);
        nz.push([hd, Math.sqrt((1 - f(th + hr) ** 2) + (1 - f(th - hr) ** 2)) / (2 * hr * Math.sqrt(S.N))]);
      }
      g.line(tr, P.magenta, { width: 1.8 });
      g.line(nz, P.magenta, { width: 1.4, dash: [5, 4] });
      g.hline(Math.sqrt((1 - fp * fp) + (1 - fm * fm)) / (2 * Math.sqrt(S.N)), P.cyan, { dash: [5, 4], width: 1.4 });
      g.vline(S.h, P.amber, { alpha: 0.85 });
      g.legend([[P.magenta, L('差分的截断误差', 'truncation of the difference')], [P.magenta, L(`差分的噪声（N = ${S.N}）`, `noise of the difference (N = ${S.N})`), 'dash'], [P.cyan, L('±90° 的噪声，截断为 0', 'noise at ±90°, no truncation'), 'dash']], { bottom: true });
      $('plotMeta').textContent = `N = ${S.N}`;
    }
  }
  function maxGap() { let m = 0; for (let i = 0; i <= 360; i++) { const x = -PI + 2 * PI * i / 360; m = Math.max(m, Math.abs(shiftOf(x) - slopeByCommutator(MODELS[S.model], x))); } return m; }

  /* ---------- readouts, HUD, legend ---------- */
  const row = (cls, zh, en, val) => `<div class="${cls}"><dt>${L(zh, en)}</dt><dd>${val}</dd></div>`;
  const LEGEND = {
    curve: [['cy', '期望值 f；θ ± 90° 两个取值点', 'expectation f; the two settings θ ± 90°'], ['dm', '切线（对易子公式）', 'tangent (commutator formula)'], ['mg', '小步长的弦', 'small-step chord'], ['am', '当前角度 θ', 'current angle θ']],
    shots: [['cy', '±90° 两值差的一半，每次试验一点', 'half the ±90° difference, one dot per trial'], ['mg', '小步长差分，每次试验一点', 'small-step difference, one dot per trial'], ['dm', '切线斜率', 'tangent slope'], ['am', '当前角度 θ', 'current angle θ']]
  };
  function drawText() {
    const th = S.theta, hr = S.h * DEG, fp = f(th + Q), fm = f(th - Q), sl = slopeByCommutator(MODELS[S.model], th), est = shiftOf(th), fd = fdOf(th, hr);
    const flat = Math.abs(sl) < 1e-9;          // at an extremum the difference is 0 too: no ratio to speak of
    let big, sub, key, keyName, rows, note, aside, pill;
    if (S.scene === 'curve') {
      big = `θ = ${fix(th / DEG, 1)}°`;
      sub = `<span class="c-cy">½[f(θ+90°) − f(θ−90°)] = ${fix(est, 4)}</span> · ${L('切线斜率', 'tangent slope')} ${fix(sl, 4)}`;
      keyName = L('两值之差的一半 · 切线斜率', 'half the difference · tangent slope');
      key = `${fix(est, 6)} <small>· ${fix(sl, 6)}</small>`;
      rows = row('', 'f(θ)', 'f(θ)', fix(f(th), 4)) + row('c', 'f(θ + 90°)', 'f(θ + 90°)', fix(fp, 4)) + row('c', 'f(θ − 90°)', 'f(θ − 90°)', fix(fm, 4))
        + row('m', `±${S.h}° 差分`, `±${S.h}° difference`, fix(fd, 4)) + row('m', '差分的误差', 'error of the difference', sgn(fd - sl, 4))
        + (flat ? row('', 'sin h / h（斜率为 0，没有比值）', 'sin h / h (slope 0: no ratio)', fix(Math.sin(hr) / hr, 4))
          : row('', '差分 / 斜率 = sin h / h', 'difference / slope = sin h / h', fix(Math.sin(hr) / hr, 4)));
      aside = "f′ = 2 Re(i Tr ρ[H,P])";
      note = flat ? L('此处斜率为 0：两个取值点一样高，弦也是平的，差分与斜率同为 0。', 'The slope is 0 here: the two settings are level and so is the chord; the difference and the slope are both 0.')
        : L(`两值之差的一半与切线斜率相差 ${Math.abs(est - sl).toExponential(1)}，只是舍入；±${S.h}° 的弦比切线${Math.abs(fd) < Math.abs(sl) ? '缓' : '陡'} ${fix(100 * Math.abs(1 - fd / sl), 2)}%。`, `Half the difference and the tangent slope differ by ${Math.abs(est - sl).toExponential(1)}, rounding only; the ±${S.h}° chord is ${fix(100 * Math.abs(1 - fd / sl), 2)}% ${Math.abs(fd) < Math.abs(sl) ? 'flatter' : 'steeper'} than the tangent.`);
      pill = [L('斜率', 'SLOPE'), fix(sl, 3)];
    } else {
      const sh = shots(), n = trialsNow(), a = stats(sh.est.slice(0, n)), b = stats(sh.fd.slice(0, n));
      big = L(`${n} 次试验 · 每点 ${S.N} 发`, `${n} trials · ${S.N} shots each`);
      sub = `θ = ${fix(th / DEG, 1)}° · ${L('切线斜率', 'tangent slope')} ${fix(sl, 3)} · h = ${S.h}°`;
      keyName = L('散布宽度：±90° · 小步长', 'scatter: ±90° · small step');
      key = n >= 2 ? `${fix(a.sd, 3)} <small>· ${fix(b.sd, 3)}</small>` : '—';
      rows = row('c', '±90°：平均', '±90°: mean', n ? fix(a.mean, 4) : '—') + row('c', '±90°：理论宽度', '±90°: predicted width', fix(sh.sdShift, 4))
        + row('m', `±${S.h}°：平均`, `±${S.h}°: mean`, n ? fix(b.mean, 4) : '—') + row('m', `±${S.h}°：理论宽度`, `±${S.h}°: predicted width`, fix(sh.sdFd, 4))
        + row('', '宽度之比', 'ratio of widths', fix(sh.sdFd / sh.sdShift, 1)) + row('', '量尺外的差分点', 'difference dots off the gauge', String(last.out ? last.out.above + last.out.below : 0));
      aside = 'Var = (1 − f²)/N';
      note = L(`散布来自散粒噪声；小步长差分把同样的噪声除以 2h = ${fix(2 * hr, 3)}，宽了 ${fix(sh.sdFd / sh.sdShift, 1)} 倍。`, `The scatter is shot noise; the small-step difference divides the same noise by 2h = ${fix(2 * hr, 3)} and comes out ${fix(sh.sdFd / sh.sdShift, 1)} times wider.`);
      pill = [L('宽度比', 'RATIO'), fix(sh.sdFd / sh.sdShift, 1)];
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('ro').innerHTML = `<div class="key"><dt>${keyName}</dt><dd><b>${key}</b></dd></div>${rows}`;
    $('roNote').textContent = note; $('roAside').textContent = aside;
    $('pillScene').querySelector('strong').textContent = S.scene === 'curve' ? L('曲线', 'CURVE') : L('采样', 'SHOTS');
    $('pillKeyName').textContent = pill[0]; $('pillKey').querySelector('strong').textContent = pill[1];
    $('legend').innerHTML = LEGEND[S.scene].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    $('modelNote').textContent = S.model === 'z' ? L('r₀ = m = (0, 0, 1)：f = cos θ，第十二章的例子。', 'r₀ = m = (0, 0, 1): f = cos θ, the example of Chapter 12.')
      : L(`r₀ = (0.48, 0.60, 0.64)，m = (0.80, 0.36, 0.48)：c = ${fix(C.c, 4)}，a = ${fix(C.a, 4)}，b = ${fix(C.b, 4)}。`, `r₀ = (0.48, 0.60, 0.64), m = (0.80, 0.36, 0.48): c = ${fix(C.c, 4)}, a = ${fix(C.a, 4)}, b = ${fix(C.b, 4)}.`);
  }

  const paint = kit.painter(() => { drawText(); drawStage(); drawPlot(); drawText(); }, [$('stage'), $('plot')]);

  /* ---------- the rail: θ in the curve scene, the number of trials in the shots scene ---------- */
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 2 * PI, rate: 0.7, step: 15 * DEG, t: S.theta + PI,
    // the label is first drawn while the clock is being built: it reads t, max and S only
    format: (t, max) => (S.scene === 'curve' ? `θ = ${fix((t - PI) / DEG, 1)}° <small>/ ±180°</small>` : L(`试验 ${Math.round(t)} <small>/ ${Math.round(max)}</small>`, `trial ${Math.round(t)} <small>/ ${Math.round(max)}</small>`)),
    onChange: (t, c) => {
      if (stopAt != null && c.playing && t >= stopAt - 1e-9) { const s = stopAt; stopAt = null; c.pause(); c.set(s); return; }
      if (S.scene === 'curve') S.theta = t - PI;
      paint();
    }
  });
  function setTheta(th) {
    S.theta = th;
    if (S.scene === 'curve') { clock.pause(); clock.set(th + PI); } else paint();
  }
  function setScene(sc, t) {
    S.scene = sc; sceneChips.set(sc, true); stopAt = null;
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    clock.pause();
    if (sc === 'curve') { clock.rate = 0.7; clock.step = 15 * DEG; clock.setMax(2 * PI, true); clock.set(t == null ? S.theta + PI : t); }
    else { clock.rate = 40; clock.step = 10; clock.setMax(TRIALS, true); clock.set(t == null ? TRIALS : t); }
  }

  /* ---------- controls ---------- */
  const leave = () => cards.mark(null);
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  const modelChips = kit.chips($('modelChips'), 'model', (v) => { leave(); S.model = v; C = coeffs(MODELS[v]); paint(); });
  const shotChips = kit.chips($('shotChips'), 'shots', (v) => { leave(); S.N = Number(v); paint(); });
  const fH = kit.field($('h'), { fmt: (v) => `${v}°`, onInput: (v) => { leave(); S.h = v; paint(); } });
  $('redraw').addEventListener('click', () => { leave(); S.seed++; draw(); paint(); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('curve'); }, 2: () => { leave(); setScene('shots'); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    shift: { scene: 'curve', model: 'z', h: 30, from: 0, to: PI / 3, still: PI / 3 },
    anywhere: { scene: 'curve', model: 'tilt', h: 30, from: -PI, to: PI, still: 2 * PI / 3 },
    step: { scene: 'curve', model: 'z', h: 30, from: -PI, to: PI, still: PI / 3 },
    noise: { scene: 'shots', model: 'z', h: 6, N: 100, theta: PI / 3, still: TRIALS }
  };
  const NOTES = {
    shift: ['f = cos θ，θ = 60°。两个青色的点在 −30° 与 150°，高 0.866 与 −0.866；两值之差的一半是 −0.866，正是虚线切线的斜率。圆里两支青色箭头与琥珀色的箭头垂直，它们的高度就是这两个值。', 'f = cos θ at θ = 60°. The two cyan points sit at −30° and 150°, at heights 0.866 and −0.866; half their difference is −0.866, exactly the slope of the dashed tangent. In the dial the two cyan arrows are perpendicular to the amber one, and their heights are these two values.'],
    anywhere: ['倾斜的态与测量轴：曲线 f = c + a cos θ + b sin θ 抬高了 c、错开了相位。θ 扫过一整圈，量尺上青色的条始终停在切线的虚线上，下面的小图里两条线处处重合；常数 c 在相减时消掉。', 'Tilted state and axis: the curve f = c + a cos θ + b sin θ is raised by c and shifted in phase. As θ sweeps a full turn the cyan bar on the gauge stays on the dashed tangent line, and in the small plot the two lines coincide everywhere; the constant c cancels in the difference.'],
    step: ['同一条 f = cos θ，用 ±30° 的小步长做差分：差分恰好是斜率乘 sin h / h = 0.955。θ = 60° 时品红的弦比虚线切线缓，品红的条比切线短 4.5%。拖小 h，差距按 h² 缩小，但只要斜率不为零就不会消失；只在 θ = 0° 与 ±180°，斜率为零，弦与切线都是平的。青色的条始终精确。', 'The same f = cos θ with a ±30° small-step difference: the difference is exactly the slope times sin h / h = 0.955. At θ = 60° the magenta chord is flatter than the dashed tangent and the magenta bar is 4.5% short. Make h smaller and the gap shrinks like h², but it never vanishes while the slope is not zero; only at θ = 0° and ±180°, where the slope is zero, are chord and tangent both level. The cyan bar is always exact.'],
    noise: ['θ = 60°，每个取值点只测 100 发，小步长 6°。每次试验在量尺上落一个青色点和一个品红点：青色的点挤在切线旁，宽约 0.035；品红的点散开约 0.58，宽 16 倍。散布来自散粒噪声，小步长把它放大了。', 'θ = 60°, only 100 shots per setting, a 6° small step. Each trial drops one cyan and one magenta dot on the gauge: the cyan dots crowd the tangent with a width of about 0.035; the magenta dots spread about 0.58, sixteen times wider. The scatter is shot noise, and the small step magnifies it.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    S.model = p.model; C = coeffs(MODELS[p.model]); modelChips.set(p.model, true);
    S.h = p.h; fH.set(p.h);
    if (p.N) { S.N = p.N; shotChips.set(String(p.N), true); }
    if (p.theta != null) S.theta = p.theta;
    if (p.scene === 'curve') {
      setScene('curve', p.still + PI);
      // a still (cover, cited figure shot) and the opening view of the full page show the card's telling frame;
      // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
      if (TRV.still || (booting && !TRV.embed)) return;
      clock.set(p.from + PI);
      stopAt = p.to + PI < clock.max - 1e-9 ? p.to + PI : null;
      if (booting) kit.autoplay(clock, $('stage')); else clock.play();
    } else {
      setScene('shots', p.still);
      if (TRV.still || (booting && !TRV.embed)) return;
      clock.set(0);
      if (booting) kit.autoplay(clock, $('stage')); else clock.play();
    }
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖动曲线或箭头改角度，换曲线、改小步长，或到“采样”场景改每点的发数。随时可以再选一张卡。', 'Free play: drag the curve or the arrow to set θ, switch the curve, change the small step, or go to the shots scene and change the shots per setting. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.SHIFT_DEBUG = {
    get state() {
      const th = S.theta, hr = S.h * DEG, sh = shots(), n = trialsNow();
      return {
        scene: S.scene, model: S.model, theta: th, h: S.h, N: S.N, seed: S.seed, t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current,
        r0: MODELS[S.model].r0.slice(), m: MODELS[S.model].m.slice(), coeffs: Object.assign({}, C),
        f: f(th), fPlus: f(th + Q), fMinus: f(th - Q), shift: shiftOf(th), slope: slopeByCommutator(MODELS[S.model], th), fd: fdOf(th, hr),
        trials: n, offGauge: last.out ? last.out.above + last.out.below : 0,
        shots: { angles: sh.ang.slice(), sdShift: sh.sdShift, sdFd: sh.sdFd, mean: stats(sh.est.slice(0, n)).mean, sd: stats(sh.est.slice(0, n)).sd, fdMean: stats(sh.fd.slice(0, n)).mean, fdSd: stats(sh.fd.slice(0, n)).sd }
      };
    },
    /** The raw counts of +1 at θ + 90°, θ − 90°, θ + h, θ − h for the trials shown, and the page's two estimates. */
    samples: () => { const sh = shots(), n = trialsNow(); return { k: sh.k.slice(0, n).map((r) => r.slice()), est: sh.est.slice(0, n), fd: sh.fd.slice(0, n) }; },
    /** Half the ±90° difference and the commutator slope on a grid of θ (for the "any angle" check). */
    sweep: (n) => Array.from({ length: n + 1 }, (_, i) => { const x = -PI + 2 * PI * i / n; return [x, shiftOf(x), slopeByCommutator(MODELS[S.model], x), fdOf(x, S.h * DEG)]; }),
    seek: (t) => { clock.pause(); clock.set(t); },
    /** Moves the clock without pausing it, so a test can bring a playing card close to where it stops by itself. */
    scrub: (t) => clock.set(t),
    /** Viewport coordinates of a point of the curve and of the dial's centre, for pointer tests. */
    curvePoint: (th) => { const b = $('cv').getBoundingClientRect(); return curveG ? [b.left + curveG.X(th), b.top + curveG.Y(f(th))] : null; },
    dialPoint: (dx, dy) => { const b = $('cv').getBoundingClientRect(); return dialG ? [b.left + dialG.X(dx), b.top + dialG.Y(C.c + dy)] : null; }
  };
  window.TRV_THUMB = () => { applyPreset('shift'); cards.mark('shift'); paint.now(); };
  cards.pick(cards.initial('shift'));
  booting = false;
  paint();
})();
