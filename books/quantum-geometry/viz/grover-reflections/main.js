/* GROVER//REFLECT · Grover 两次反射 · Grover's two reflections
   One marked item among N; the uniform superposition |s⟩ = sin θ·W + cos θ·B with sin θ = 1/√N. The whole search
   happens in the plane of W (the target, vertical) and B (the failure axis, horizontal). The stage has two parts:
     plane   the unit circle, the two mirror lines (the failure axis and the line of |s⟩), the state arrow (amber),
             its shadows on W (cyan: the success amplitude) and on B (magenta), and the 2θ arcs of the steps (violet)
     bars    the success probability after each whole step n = 0 … nMax; the current step framed in amber
   The rail is the step count; every half step is one mirror. The first peak is found over the whole first half turn,
   whatever nMax is, and nMax always reaches at least one step past it. The page applies the mirrors one at a time to the
   arrow in the plane; between two mirror images the tip slides across the mirror along a perpendicular (animation).
   Read-only probe for the browser suite: window.GROVER_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, DEG = PI / 180;
  const TH = TRV.thumbMode ? 2 : 1;           // thicker strokes on the wordless cover
  const TMIN = 0.5 * DEG, TMAX = 80 * DEG;    // the range of θ the reader can drag to

  /* ---------- the model: mirrors in the plane ---------- */
  /** The mirror image of v in the line through the origin at the angle a. */
  const reflect = (v, a) => { const c = Math.cos(2 * a), s = Math.sin(2 * a); return [c * v[0] + s * v[1], s * v[0] - c * v[1]]; };
  /** The best whole step count for a given θ, found by trying every n of the first half turn, (2n + 1)θ ≤ π. */
  function bestOf(th) { const top = Math.floor((PI / th - 1) / 2); let b = 0, pb = -1; for (let n = 0; n <= top; n++) { const p = Math.sin((2 * n + 1) * th) ** 2; if (p > pb + 1e-12) { pb = p; b = n; } } return b; }
  /** The first peak of θ and the number of whole steps drawn: the usual span (at most 52 steps), lengthened only
      when the first peak or the step after it would fall beyond it. */
  function spanOf(th) { const best = bestOf(th); return { best, nMax: Math.max(clamp(Math.ceil(PI / (2 * th)), 3, 52), best + 1) }; }
  const S = { theta: Math.asin(1 / Math.sqrt(8)) };
  let M = null;                                // { theta, nMax, states, mids, probs, best }
  function build() {
    const th = S.theta, { best, nMax } = spanOf(th);
    const states = [[Math.cos(th), Math.sin(th)]], mids = [];
    for (let n = 0; n < nMax; n++) {
      const mid = reflect(states[n], 0);            // I − 2P: mirror in the failure axis B
      mids.push(mid);
      states.push(reflect(mid, th));                // 2|s⟩⟨s| − I: mirror in the line of |s⟩
    }
    const probs = states.map((v) => v[1] * v[1]);
    M = { theta: th, nMax, states, mids, probs, best };
  }
  build();
  const Nof = () => 1 / Math.pow(Math.sin(S.theta), 2);
  const isInt = (x) => Math.abs(x - Math.round(x)) < 1e-6;
  const nLabel = () => (isInt(Nof()) ? String(Math.round(Nof())) : fix(Nof(), 2));
  const lerp = (a, b, u) => [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
  /** The arrow at rail position t: whole steps are states, half steps the image in the first mirror. */
  function at(t) {
    t = clamp(t, 0, M.nMax);
    const n = Math.min(Math.floor(t + 1e-9), M.nMax), u = t - n;
    if (n >= M.nMax || u < 1e-9) return { v: M.states[n], n, half: false, phase: 0 };
    if (u <= 0.5 + 1e-9) return { v: lerp(M.states[n], M.mids[n], Math.min(1, u / 0.5)), n, half: Math.abs(u - 0.5) < 1e-9, phase: 1 };
    return { v: lerp(M.mids[n], M.states[n + 1], (u - 0.5) / 0.5), n, half: false, phase: 2 };
  }

  /* ---------- layout: plane | bars on a wide stage, plane above bars on a narrow one ---------- */
  let boxes = null, planeG = null, barsG = null;
  const VIEW = { barTicks: [], plot: null };     // what the last frame drew on the axes (read by the probe)
  function layout(W, H) {
    const st = $('stage').getBoundingClientRect(), below = (el) => (el ? el.getBoundingClientRect().bottom - st.top : 0);
    const top = TRV.thumbMode ? 24 : Math.max(46, below($('hudBig').parentElement)) + 6;
    const bottom = TRV.thumbMode ? 24 : Math.max(18, $('legend').offsetHeight + 16);
    const h = Math.max(160, H - top - bottom);
    if (W / h >= 1.3) {
      const side = Math.min(h, W * 0.6);
      return { side: true, p: { x: 8, y: top, w: side, h }, b: { x: side + 22, y: top, w: W - side - 34, h } };
    }
    const ph = h * 0.64;
    return { side: false, p: { x: 8, y: top, w: W - 16, h: ph }, b: { x: 8, y: top + ph + 6, w: W - 16, h: h - ph - 6 } };
  }
  const padOf = (bx, W, H, l, r, t, b) => [bx.x + l, W - bx.x - bx.w + r, bx.y + t, H - bx.y - bx.h + b];
  const tagAt = (key, g, x, y, html, cls, dx, dy) => stage.tag(key, [g.X(x), g.Y(y)], html, cls, { screen: true, dx: dx || 0, dy: dy || 0 });
  function arrow2(g, a, b, color, w, alpha) {
    const c = g.ctx, ax = g.X(a[0]), ay = g.Y(a[1]), bx = g.X(b[0]), by = g.Y(b[1]), dx = bx - ax, dy = by - ay, l = Math.hypot(dx, dy);
    c.save(); c.globalAlpha = alpha == null ? 1 : alpha; c.strokeStyle = c.fillStyle = color; c.lineWidth = w * TH; c.lineCap = 'round';
    c.shadowColor = color; c.shadowBlur = 10;
    c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx, by); c.stroke();
    if (l > 8) { const hs = Math.min(12 * TH, l * 0.4), ux = dx / l, uy = dy / l; c.beginPath(); c.moveTo(bx, by); c.lineTo(bx - ux * hs - uy * hs * 0.45, by - uy * hs + ux * hs * 0.45); c.lineTo(bx - ux * hs + uy * hs * 0.45, by - uy * hs - ux * hs * 0.45); c.closePath(); c.fill(); }
    c.restore();
  }
  const arcPts = (r, a0, a1, n) => { const pts = [], k = n || Math.max(8, Math.ceil(Math.abs(a1 - a0) / (2 * DEG))); for (let i = 0; i <= k; i++) { const a = a0 + (a1 - a0) * i / k; pts.push([r * Math.cos(a), r * Math.sin(a)]); } return pts; };
  const angOf = (v) => Math.atan2(v[1], v[0]);

  /* ---------- the plane ---------- */
  function drawPlane(W, H, now) {
    const b = boxes.p, th = S.theta, R0 = 1.3;
    const g = kit.plot($('cv'), { x: [-R0, R0], y: [-R0, R0], equal: true, pad: padOf(b, W, H, 4, 4, 4, 4), clear: false });
    planeG = g;
    const ext = Math.max(g.x1 - g.x0, g.y1 - g.y0);
    // the target axis W and the circle
    g.line([[0, g.y0], [0, g.y1]], P.faint, { width: 1 });
    g.line(arcPts(1, 0, 2 * PI, 180), P.lineHot, { width: 1.4 * TH });
    // the two mirrors: the failure axis and the line of |s⟩
    const mir = (a) => [[-ext * Math.cos(a), -ext * Math.sin(a)], [ext * Math.cos(a), ext * Math.sin(a)]];
    g.ctx.save(); g.ctx.beginPath(); g.ctx.rect(g.pl, g.pt, g.iw, g.ih); g.ctx.clip();
    g.line(mir(0), P.sigma, { width: 1.3 * TH, dash: [7, 5], alpha: 0.75 });
    g.line(mir(th), P.sigma, { width: 1.3 * TH, dash: [7, 5], alpha: 0.75 });
    g.ctx.restore();
    g.line(arcPts(0.24, 0, th), P.sigma, { width: 1, alpha: 0.8 });
    // the whole steps already taken: their states and the 2θ each step turned
    const nDone = Math.min(now.n, M.nMax);
    for (let k = 0; k < nDone; k++) {
      const a0 = angOf(M.states[k]), a1 = a0 + 2 * th, r = 1.1 + 0.035 * (k % 2);
      g.line(arcPts(r, a0, a1), P.violet, { width: 2.2 * TH, alpha: 0.9 });
    }
    for (let k = 0; k <= nDone; k++) g.dot(M.states[k][0], M.states[k][1], P.sigma, 2.6 * TH, { alpha: 0.7 });
    // the chords of the step under way (or just finished): the tip crossing each mirror at right angles
    const m = now.phase ? now.n : now.n - 1;
    if (m >= 0 && m < M.nMax) {
      g.line([M.states[m], M.mids[m]], P.sigma, { width: 1.1 * TH, dash: [2, 4], alpha: 0.8 });
      if (now.phase !== 1) g.line([M.mids[m], M.states[m + 1]], P.sigma, { width: 1.1 * TH, dash: [2, 4], alpha: 0.8 });
      if (now.phase || now.n > 0) g.dot(M.mids[m][0], M.mids[m][1], P.sigma, 2.6 * TH, { ring: true, alpha: 0.8 });
    }
    // the shadows: on W (the success amplitude) and on B
    const v = now.v;
    g.line([[v[0], v[1]], [0, v[1]]], P.faint, { width: TH, dash: [2, 3] });
    g.line([[v[0], v[1]], [v[0], 0]], P.faint, { width: TH, dash: [2, 3] });
    g.line([[0, 0], [v[0], 0]], P.magenta, { width: 4 * TH, alpha: 0.85 });
    g.ctx.save(); g.ctx.shadowColor = P.cyan; g.ctx.shadowBlur = 10; g.line([[0, 0], [0, v[1]]], P.cyan, { width: 5 * TH }); g.ctx.restore();
    // the initial state |s⟩ (drag handle) and the current arrow
    g.dot(Math.cos(th), Math.sin(th), P.sigma, 6 * TH, { ring: true, width: 2 });
    arrow2(g, [0, 0], v, P.amber, 2.8, 1);
    g.dot(v[0], v[1], P.amber, 4.5 * TH, { glow: 14 });
    if (!TRV.thumbMode) {
      tagAt('pW', g, 0, Math.min(g.y1, 1.24), L('目标 W', 'target W'), 'raw cy', 0, 2);
      tagAt('pB', g, Math.max(g.x0 + 0.1, -1.25), 0, L('镜 1 · 失败轴 B', 'mirror 1 · failure axis B'), 'raw ink', L(44, 74), 14);
      const ms = [1.22 * Math.cos(th), 1.22 * Math.sin(th)];
      tagAt('pS', g, ms[0], ms[1], L('镜 2 · |s⟩', 'mirror 2 · |s⟩'), 'raw ink', 16, -12);
      if (th > 6 * DEG) tagAt('pT', g, 0.33 * Math.cos(th / 2), 0.33 * Math.sin(th / 2), 'θ', 'raw', 4, 0);
      if (nDone > 0) {
        let k = 0; for (let j = 0; j < nDone; j++) if (Math.abs((2 * j + 2) * th - PI / 4) < Math.abs((2 * k + 2) * th - PI / 4)) k = j;
        const a0 = angOf(M.states[k]) + th, r = 1.1 + 0.035 * (k % 2) + 0.1;
        tagAt('p2', g, r * Math.cos(a0), r * Math.sin(a0), '2θ', 'raw vi', 0, 0);
      }
      if (Math.abs(v[1]) > 0.12) tagAt('pAmp', g, 0, v[1] / 2, fix(v[1], 3), 'num cy', v[0] >= 0 ? -22 : 22, 0);
    }
  }

  /* ---------- the bars: success probability after each whole step ---------- */
  function drawBars(W, H, now) {
    const b = boxes.b, nM = M.nMax;
    const g = kit.plot($('cv'), { x: [-0.6, nM + 0.6], y: [0, 1.08], pad: padOf(b, W, H, 30, 4, boxes.side ? 40 : 22, 20), clear: false });
    barsG = g;
    // past 52 steps (only at the smallest angles) the labels thin out so the row is no denser than at 52
    const every = nM <= 12 ? 1 : nM <= 26 ? 2 : nM <= 52 ? 5 : 10, xt = [];
    for (let n = 0; n <= nM; n += every) xt.push([n, String(n)]);
    VIEW.barTicks = xt.map((t) => t[0]);
    g.axes({ yTicks: TRV.thumbMode ? [] : [[0, '0'], [0.5, '0.5'], [1, '1']], xTicks: TRV.thumbMode ? [] : xt, xLabel: TRV.thumbMode ? '' : 'n' });
    g.hline(1, P.faint, { dash: [3, 4] });
    const wbar = 0.3;
    const cur = Math.min(now.n, nM);
    M.probs.forEach((p, n) => {
      g.rect(n - wbar, 0, n + wbar, p, P.cyan, { alpha: n <= cur ? 0.75 : 0.22 });
    });
    g.rect(cur - wbar - 0.12, 0, cur + wbar + 0.12, Math.max(M.probs[cur], 0.02) + 0.03, P.amber, { fill: false, stroke: P.amber, width: 2 * TH, glow: 8 });
    if (!TRV.thumbMode) {
      if (boxes.side) tagAt('bT', g, (nM) / 2, 1.08, L('每一步之后的成功概率', 'success probability after each step'), 'raw', 0, -30);
      tagAt('bC', g, cur, M.probs[cur], fix(M.probs[cur], 4), 'num hot', 0, -24);
      if (M.best !== cur && (boxes.side || Math.abs(M.best - cur) * g.scale > 90)) tagAt('bBest', g, M.best, M.probs[M.best], L(`第一个峰 n = ${M.best}`, `first peak n = ${M.best}`), 'raw cy', 0, -14);
    }
  }

  /* ---------- stage ---------- */
  let drag = null;
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), rotate: false,
    onPick: (ev) => { const w = where(ev); if (!w) return false; drag = w; aim(ev); return true; },
    onDrag: (ev) => { if (drag) aim(ev); },
    onDrop: () => { drag = null; }
  });
  const local = (ev) => { const r = $('cv').getBoundingClientRect(); return [ev.clientX - r.left, ev.clientY - r.top]; };
  function where(ev) {
    if (!boxes || !planeG) return null;
    const [x, y] = local(ev), th = S.theta;
    const hx = planeG.X(Math.cos(th)), hy = planeG.Y(Math.sin(th));
    if (Math.hypot(x - hx, y - hy) <= 26) return 'theta';
    // near the line of |s⟩, outside the inner disc
    const px = planeG.invX(x), py = planeG.invY(y), d = Math.abs(-Math.sin(th) * px + Math.cos(th) * py), along = Math.cos(th) * px + Math.sin(th) * py;
    if (along > 0.3 && along < 1.3 && d * planeG.scale <= 10) return 'theta';
    const B = boxes.b;
    if (barsG && x >= B.x && x <= B.x + B.w && y >= B.y && y <= B.y + B.h) return 'bars';
    return null;
  }
  function aim(ev) {
    const [x, y] = local(ev);
    if (drag === 'theta') {
      const a = Math.atan2(planeG.invY(y), planeG.invX(x));
      if (!(a > -PI / 2 && a < PI)) return;
      cards.mark(null);
      setTheta(clamp(a, TMIN, TMAX), true);
    } else if (drag === 'bars') {
      const n = clamp(Math.round(barsG.invX(x)), 0, M.nMax);
      cards.mark(null);
      clock.pause(); clock.set(n);
    }
  }
  function drawStage() {
    const cv = $('cv'), W = cv.clientWidth, H = cv.clientHeight;
    boxes = layout(W, H);
    stage.begin();
    const now = at(clock.t);
    drawPlane(W, H, now);
    drawBars(W, H, now);
    stage.end();
  }

  /* ---------- strip: the best step count for each N ---------- */
  // The usual window is N = 2 … 1024 by n* = 0 … 27. When the dragged θ takes N outside it (below 2 above 45°,
  // above 1024 below about 1.79°), the window widens to the power of two beyond the current N, and the staircase
  // and the curve are drawn over the whole widened window, so the current point is never pinned to an edge.
  const PLOT_N = [2, 1024], PLOT_Y = 27;
  const stair = [0];                               // stair[N]: the first-peak step count at the whole number N ≥ 1
  const stairAt = (N) => { while (stair.length <= N) stair.push(bestOf(Math.asin(1 / Math.sqrt(stair.length)))); return stair[N]; };
  let plotWin = null;
  function plotWindow(N) {
    const lo = N < PLOT_N[0] * (1 - 1e-9) ? Math.pow(2, Math.floor(Math.log2(N))) : PLOT_N[0];
    const hi = N > PLOT_N[1] * (1 + 1e-9) ? Math.pow(2, Math.ceil(Math.log2(N))) : PLOT_N[1];
    if (plotWin && plotWin.lo === lo && plotWin.hi === hi) return plotWin;
    const steps = [];
    for (let k = Math.ceil(lo); k <= hi; k++) { const b = stairAt(k); if (steps.length) steps.push([k, steps[steps.length - 1][1]]); steps.push([k, b]); }
    const curve = []; for (let i = 0; i <= 120; i++) { const x = lo * Math.pow(hi / lo, i / 120); curve.push([x, PI * Math.sqrt(x) / 4]); }
    const yTop = hi === PLOT_N[1] ? PLOT_Y : Math.ceil(Math.max(stairAt(hi), PI * Math.sqrt(hi) / 4)) + 2;
    const yStep = yTop <= 30 ? 5 : yTop <= 60 ? 10 : 20, yt = [];
    for (let v = 0; v <= yTop; v += yStep) yt.push([v, String(v)]);
    // a label every two octaves (three on a window wider than ten), none within half an octave of the right edge
    const every = Math.pow(2, Math.log2(hi / lo) <= 10 ? 2 : 3), xt = lo < PLOT_N[0] ? [[lo, String(lo)]] : [];
    for (let v = PLOT_N[0]; v <= hi / Math.SQRT2; v *= every) xt.push([v, String(v)]);
    plotWin = { lo, hi, yTop, steps, curve, xt, yt };
    return plotWin;
  }
  function drawPlot() {
    const Nn = Nof(), w = plotWindow(Nn);
    const g = kit.plot($('plot'), { x: [w.lo, w.hi], y: [0, w.yTop], logX: true, pad: [30, 10, 8, 22] });
    $('plotTitle').innerHTML = L('第一个峰的步数（逐个比较 n）', 'The first-peak step count, found by trying every n');
    g.axes({ yTicks: w.yt, xTicks: w.xt, xLabel: 'N' });
    g.line(w.steps, P.cyan, { width: 1.8 });
    g.line(w.curve, P.ink, { width: 1.3, dash: [5, 4], alpha: 0.8 });
    g.vline(Nn, P.amber, { alpha: 0.85 });
    g.dot(Nn, M.best, P.amber, 4);
    g.legend([[P.cyan, L('第一个峰的步数', 'first-peak step count')], [P.ink, 'π√N/4', 'dash']], { right: false });
    $('plotMeta').textContent = `N = ${nLabel()} · n* = ${M.best}`;
    VIEW.plot = { x: [w.lo, w.hi], y: [0, w.yTop], xTicks: w.xt.map((t) => t[0]), yTicks: w.yt.map((t) => t[0]), point: [Nn, M.best] };
  }

  /* ---------- readouts, HUD, legend ---------- */
  const row = (cls, zh, en, val) => `<div class="${cls}"><dt>${L(zh, en)}</dt><dd>${val}</dd></div>`;
  function drawText() {
    const now = at(clock.t), n = Math.min(now.n, M.nMax), p = M.probs[n], th = S.theta, ang = (2 * n + 1) * th;
    const stepTxt = now.phase === 1 ? L(`第 ${n} 步 · 镜 1 之后`, `step ${n} · after mirror 1`) : now.phase === 2 ? L(`第 ${n} 步 · 镜 2 之中`, `step ${n} · into mirror 2`) : L(`第 ${n} 步`, `step ${n}`);
    $('hudBig').innerHTML = `N = ${nLabel()} · ${stepTxt}`;
    $('hudSub').innerHTML = `<span class="c-cy">${L('成功概率', 'success')} sin²(${2 * n + 1}θ) = ${fix(p, 6)}</span> · ${L('与失败轴夹角', 'angle from the failure axis')} ${fix(ang / DEG, 2)}°`;
    $('ro').innerHTML = `<div class="key"><dt>${L(`第 ${n} 步之后的成功概率`, `Success probability after step ${n}`)}</dt><dd><b>${fix(p, 6)}</b></dd></div>`
      + row('', '项数 N', 'Items N', nLabel())
      + row('', 'θ = arcsin(1/√N)', 'θ = arcsin(1/√N)', `${fix(th / DEG, 4)}°`)
      + row('c', '成功振幅 sin((2n + 1)θ)', 'Success amplitude sin((2n + 1)θ)', fix(M.states[n][1], 6))
      + row('m', '失败振幅 cos((2n + 1)θ)', 'Failure amplitude cos((2n + 1)θ)', fix(M.states[n][0], 6))
      + row('', '第一个峰的步数与成功概率', 'First peak: step count and success', `${M.best} · ${fix(M.probs[M.best], 6)}`)
      + row('', 'π√N/4', 'π√N/4', fix(PI * Math.sqrt(Nof()) / 4, 3));
    const exact = Math.abs(p - 1) < 1e-12;
    $('roNote').textContent = exact ? L('箭头正好立在目标上：测量必然找到标记项。', 'The arrow stands exactly on the target: a measurement is certain to find the marked item.')
      : n > M.best ? L(`已经转过了头：第一个峰在第 ${M.best} 步（${fix(M.probs[M.best], 4)}）。继续迭代，成功概率会振荡。`, `Past the target: the first peak was step ${M.best} (${fix(M.probs[M.best], 4)}). Further iterations make the success probability oscillate.`)
      : L(`每一步转 2θ = ${fix(2 * th / DEG, 3)}°；离竖轴还差 ${fix(Math.abs(90 - ang / DEG), 3)}°。`, `Each step turns 2θ = ${fix(2 * th / DEG, 3)}°; ${fix(Math.abs(90 - ang / DEG), 3)}° to go to the vertical axis.`);
    $('pillN').querySelector('strong').textContent = nLabel();
    $('pillP').querySelector('strong').textContent = fix(p, 4);
    $('legend').innerHTML = [['am', '当前的态', 'current state'], ['cy', '在目标轴上的影子：成功振幅', 'shadow on the target axis: success amplitude'], ['mg', '在失败轴上的影子', 'shadow on the failure axis'], ['vi', '每一步转过的 2θ', 'the 2θ of each step']]
      .map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
  }

  const paint = kit.painter(() => { drawText(); drawStage(); drawPlot(); }, [$('stage'), $('plot')]);

  /* ---------- the rail: whole steps, a mirror every half step ---------- */
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: M.nMax, rate: 0.6, step: 0.5, t: 0,
    // the label is first drawn while the clock is being built: it reads t, max and M only
    format: (t, max) => L(`第 ${fix(t, 1)} 步 <small>/ ${Math.round(max)}</small>`, `step ${fix(t, 1)} <small>/ ${Math.round(max)}</small>`),
    onChange: (t, c) => {
      if (stopAt != null && c.playing && t >= stopAt - 1e-9) { const s = stopAt; stopAt = null; c.pause(); c.set(s); return; }
      paint();
    }
  });
  function setTheta(th, keepStep) {
    S.theta = th; build();
    const t = keepStep ? Math.min(clock.t, M.nMax) : 0;
    clock.rate = clamp(M.nMax / 10, 0.5, 4);
    clock.setMax(M.nMax, true); clock.set(t);
    fN.set(Math.log2(Nof()).toFixed(2));
    nChips.set(isInt(Nof()) ? String(Math.round(Nof())) : null, true);
  }
  const setN = (N, keep) => setTheta(Math.asin(1 / Math.sqrt(N)), keep);

  /* ---------- controls ---------- */
  const leave = () => cards.mark(null);
  const fN = kit.field($('logN'), { fmt: (v) => { const N = Math.round(Math.pow(2, v)); return String(Math.abs(Math.pow(2, v) - N) < 0.02 ? N : Math.round(Math.pow(2, v))); }, onInput: (v) => { leave(); clock.pause(); setN(Math.max(2, Math.round(Math.pow(2, v)))); } });
  const nChips = kit.chips($('nChips'), 'n', (v) => { if (v == null) return; leave(); clock.pause(); setN(Number(v)); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });

  /* ---------- experiment cards: N, the step a played card stops at (to), and the frame a still shows ---------- */
  const PRESETS = {
    four: { N: 4, to: 1, still: 1 },
    eight: { N: 8, to: 2, still: 2 },
    over: { N: 8, to: 3, still: 3 },
    sqrt: { N: 256, to: 12, still: 12 }
  };
  const NOTES = {
    four: ['N = 4，θ = 30°。只走一步，箭头从 30° 转 60° 到 90°，正好立在目标轴上：青色的影子长 1，品红的影子消失，右边第 1 根柱子顶到 1。', 'N = 4, θ = 30°. One step turns the arrow by 60° from 30° to 90°, exactly onto the target axis: the cyan shadow has length 1, the magenta one vanishes, and bar 1 on the right reaches 1.'],
    eight: ['N = 8。第 1 步后成功概率 25/32 = 0.78125，第 2 步后 121/128 = 0.9453125：箭头停在 5θ ≈ 103.5°，已越过竖轴一点，品红的影子还剩 −0.234。整数步落不到正好 90°。', 'N = 8. After step 1 the success is 25/32 = 0.78125, after step 2 it is 121/128 = 0.9453125: the arrow stops at 5θ ≈ 103.5°, a little past the vertical axis, with a magenta shadow of −0.234 left. Whole steps cannot land exactly on 90°.'],
    over: ['N = 8，再走第 3 步：箭头转到 7θ ≈ 144.9°，青色的影子缩回 0.575，成功概率掉到 0.330。右边的柱子先升后降，第 2 根最高。', 'N = 8, one more step: the arrow turns to 7θ ≈ 144.9°, the cyan shadow shrinks back to 0.575 and the success drops to 0.330. The bars on the right rise and then fall; bar 2 is the highest.'],
    sqrt: ['N = 256，θ ≈ 3.58°。每一步只转 7.17°，十二段紫色的小弧把箭头从 3.6° 送到 89.6°，成功概率 0.99995。十二正是第一个峰的步数，在 π√256/4 ≈ 12.57 附近。', 'N = 256, θ ≈ 3.58°. Each step turns only 7.17°; twelve small violet arcs carry the arrow from 3.6° to 89.6°, success 0.99995. Twelve is the step count of the first peak, next to π√256/4 ≈ 12.57.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause(); stopAt = null;
    setN(p.N);
    // a still (cover, cited figure shot) and the opening view of the full page show the card's telling frame;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed)) { clock.set(p.still === 'end' ? clock.max : p.still); return; }
    clock.set(0);
    stopAt = p.to < clock.max - 1e-9 ? p.to : null;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖动初始态改 θ，换 N，用 ← → 一面一面地照镜子，或点右边的柱子跳到那一步。随时可以再选一张卡。', 'Free play: drag the initial state to set θ, change N, apply the mirrors one at a time with ← →, or click a bar to jump to that step. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.GROVER_DEBUG = {
    get state() {
      const now = at(clock.t), n = Math.min(now.n, M.nMax);
      return {
        theta: S.theta, N: Nof(), nMax: M.nMax, t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current,
        n, phase: now.phase, arrow: now.v.slice(), success: M.probs[n], best: M.best,
        states: M.states.map((v) => v.slice()), mids: M.mids.map((v) => v.slice()), probs: M.probs.slice(),
        // what the last frame drew: the bar labels, and the small plot's window, labels and current point
        barTicks: VIEW.barTicks.slice(), plot: VIEW.plot && JSON.parse(JSON.stringify(VIEW.plot))
      };
    },
    bestOf: (N) => bestOf(Math.asin(1 / Math.sqrt(N))),
    /** The first peak and the number of whole steps drawn at an angle θ (computes only; changes nothing). */
    span: (th) => spanOf(th),
    seek: (t) => { clock.pause(); clock.set(t); },
    /** Viewport coordinates of a point of the plane and of the centre of bar n, for pointer tests. */
    planePoint: (x, y) => { const b = $('cv').getBoundingClientRect(); return planeG ? [b.left + planeG.X(x), b.top + planeG.Y(y)] : null; },
    barPoint: (n) => { const b = $('cv').getBoundingClientRect(); return barsG ? [b.left + barsG.X(n), b.top + barsG.Y(0.5)] : null; }
  };
  window.TRV_THUMB = () => { applyPreset('eight'); cards.mark('eight'); paint.now(); };
  cards.pick(cards.initial('eight'));
  booting = false;
  paint();
})();
