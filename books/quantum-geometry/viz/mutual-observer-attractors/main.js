/* ORTHO//MUTUAL · 互为吸引子 · two observers measuring each other (chapter 33).
   Two scenes on one rail:
     · mirror: the plane of the two readings (x for A, y for B); both update at once, (x, y) ↦ (cos y, cos x).
       Beat by beat the pair may cross θ*; sampled every two beats each coordinate takes one step of
       g = cos∘cos and closes in from one side. One round multiplies the error by about sin²θ*, the square of
       the −sin θ* of one beat (two cosine evaluations per round).
     · cut: two intervals A, B on the boundary of the upper half plane (static AdS₃ vacuum, Ryu–Takayanagi). The
       separate pair of geodesics against the connected pair; the shorter one counts. In units of c/3,
       S = ln(l/ε) per geodesic, so the crossing is d(l₁ + l₂ + d) = l₁l₂ and I = max(0, S_sep − S_conn).
   Colours: cyan = the two readout curves and the entanglement wedge (what stays inside
   the cut); magenta = the minimal cut that wins; amber = this beat, the current gap, the chosen intervals;
   neutral ink = the beats already walked and the hollow round-by-round rings. window.MOA_DEBUG is a read-only probe for the browser suite. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, sgn, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const TH = TRV.thumbMode ? 2 : 1;

  /* ---------- mathematics ---------- */
  // θ*: the real root of cos θ = θ (Newton from 0.7; converges to the last bit)
  const THETA = (() => { let x = 0.7; for (let i = 0; i < 60; i++) x -= (x - Math.cos(x)) / (1 + Math.sin(x)); return x; })();
  const LAM = Math.sin(THETA), LAM2 = LAM * LAM;
  const NB = 12;   // beats on the rail
  /** The simultaneous mutual update from (x₀, y₀): x_{t+1} = cos y_t, y_{t+1} = cos x_t. */
  function orbit(x0, y0, n) {
    const xs = [x0], ys = [y0];
    for (let t = 0; t < n; t++) { xs.push(Math.cos(ys[t])); ys.push(Math.cos(xs[t])); }
    return { xs, ys };
  }
  const EPS = 0.01, DMAX = 2.5, DMIN = 0.04;
  const dOf = (t) => DMAX * Math.pow(DMIN / DMAX, t);
  const tOf = (d) => Math.log(DMAX / d) / Math.log(DMAX / DMIN);
  /** The positive root of d(l₁ + l₂ + d) = l₁l₂. */
  const dCrit = (l1, l2) => (Math.sqrt((l1 + l2) * (l1 + l2) + 4 * l1 * l2) - (l1 + l2)) / 2;
  function cuts(l1, l2, d) {
    const sep = Math.log(l1 / EPS) + Math.log(l2 / EPS), conn = Math.log(d / EPS) + Math.log((l1 + l2 + d) / EPS);
    const tol = 1e-7 * Math.max(1, Math.abs(sep));
    const winner = conn < sep - tol ? 'conn' : conn > sep + tol ? 'sep' : 'tie';
    return { sep, conn, rt: Math.min(sep, conn), I: Math.max(0, sep - conn), winner };
  }

  /* ---------- state ---------- */
  const S = { scene: 'mirror', x0: 0.1, y0: 0.1, view: 'beat', l1: 1, l2: 1 };
  const orb = () => orbit(S.x0, S.y0, NB + 1);
  const beat = () => Math.floor(clock.t + 1e-9);
  const dNow = () => dOf(clock.t);

  /* ---------- the stage: one canvas, DOM labels through a 2D-only stage3 ---------- */
  let G = null;
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), rotate: false,
    onPick: (ev) => { if (!G) return false; aim(ev); return true; },
    onDrag: (ev) => aim(ev)
  });
  function at(ev) { const b = $('cv').getBoundingClientRect(); return [G.invX(ev.clientX - b.left), G.invY(ev.clientY - b.top)]; }
  function aim(ev) {
    const p = at(ev);
    cards.mark(null); stopAt = null;
    if (S.scene === 'mirror') {
      S.x0 = clamp(Math.round(p[0] * 100) / 100, 0, 1.5); S.y0 = clamp(Math.round(p[1] * 100) / 100, 0, 1.5);
      fX0.set(S.x0); fY0.set(S.y0); paint();
    } else {
      clock.pause(); clock.set(tOf(clamp(2 * Math.abs(p[0]), DMIN, DMAX)));
    }
  }
  function tagAt(key, v, html, cls, dx, dy) {
    const g = G, m = Math.min(70, g.iw / 5), x = clamp(g.X(v[0]) + (dx || 0), g.pl + m, g.pl + g.iw - m), y = clamp(g.Y(v[1]) + (dy || 0), g.pt + 10, g.pt + g.ih - 10);
    stage.tag(key, [x, y], html, cls, { screen: true });
  }

  function drawMirror(g) {
    const O = orb(), k = Math.min(beat(), NB), f = clamp(clock.t - k, 0, 1), th = TH;
    const xr = [g.x0, g.x1], c = g.ctx;
    // axes and the diagonal of agreement
    g.line([[xr[0], 0], [xr[1], 0]], P.faint, { width: 1 }); g.line([[0, g.y0], [0, g.y1]], P.faint, { width: 1 });
    for (const v of [0.5, 1, 1.5]) { g.line([[v, -0.02], [v, 0.02]], P.dim, { width: 1 }); g.line([[-0.02, v], [0.02, v]], P.dim, { width: 1 }); }
    g.line([[-0.06, -0.06], [1.6, 1.6]], P.dim, { width: 1.1 * th, dash: [6, 5] });
    // the two ways of reading: A reads B (x = cos y), B reads A (y = cos x)
    const cb = [], ca = [];
    for (let i = 0; i <= 240; i++) { const u = -0.06 + 1.66 * i / 240; cb.push([u, Math.cos(u)]); ca.push([Math.cos(u), u]); }
    g.line(cb, P.cyan, { width: 2.2 * th }); g.line(ca, P.cyan, { width: 2.2 * th });
    // every beat so far as its rectangle (A across to its curve, B up or down to its curve), and the round-by-round
    // samples (ink rings joined by a line): the beat rectangles straddle (θ*, θ*), the rings stay on one side
    const beatA = S.view === 'beat' ? 0.75 : 0.3, roundA = S.view === 'round' ? 1 : 0.4;
    for (let t = 0; t < k; t++) {
      const a = [O.xs[t], O.ys[t]], b = [O.xs[t + 1], O.ys[t + 1]];
      g.line([a, [b[0], a[1]], b, [a[0], b[1]], a], P.dim, { width: 1 * th, alpha: beatA });
    }
    const pts = []; for (let t = 0; t <= k; t++) pts.push([O.xs[t], O.ys[t]]);
    const cur = f > 0 ? [O.xs[k] + f * (O.xs[k + 1] - O.xs[k]), O.ys[k] + f * (O.ys[k + 1] - O.ys[k])] : pts[pts.length - 1];
    pts.forEach((p) => g.dot(p[0], p[1], P.sigma, 2.6 * th, { alpha: Math.min(1, beatA + 0.2) }));
    const rounds = []; for (let t = 0; t <= k; t += 2) rounds.push([O.xs[t], O.ys[t]]);
    if (rounds.length > 1) g.line(rounds, P.sigma, { width: (S.view === 'round' ? 2.2 : 1.2) * th, alpha: roundA });
    rounds.forEach((p) => g.dot(p[0], p[1], P.sigma, 5.5 * th, { ring: true, width: 2 * th, alpha: roundA }));
    // this beat: A moves across to its curve, B moves up or down to its curve, the new point is the far corner
    const from = f > 0 ? k : k - 1;
    if (from >= 0) {
      const a = [O.xs[from], O.ys[from]], b = [O.xs[from + 1], O.ys[from + 1]];
      g.line([a, [b[0], a[1]], b, [a[0], b[1]], a], P.amber, { width: 1.3 * th, dash: [4, 3], alpha: 0.9 });
      g.dot(b[0], a[1], P.amber, 3 * th); g.dot(a[0], b[1], P.amber, 3 * th);
    }
    g.dot(THETA, THETA, P.sigma, 6 * th, { ring: true, width: 2 * th });
    g.dot(S.x0, S.y0, P.sigma, 5 * th, { ring: true, width: 1.5 * th });
    g.dot(cur[0], cur[1], P.amber, 6 * th, { glow: 12 });
    c.restore();
    if (!TRV.thumbMode) {
      tagAt('cb', [1.1, Math.cos(1.1)], L('B 读 A：y = cos x', 'B reads A: y = cos x'), 'cy raw', 72, -12);
      tagAt('ca', [Math.cos(1.42), 1.42], L('A 读 B：x = cos y', 'A reads B: x = cos y'), 'cy raw', 76, 0);
      tagAt('fp', [THETA, THETA], '(θ*, θ*)', 'num', 46, 14);
      tagAt('dg', [1.5, 1.5], 'x = y', 'tick', 4, 14);
      tagAt('ax', [0.45, 0], L('A 的读数 x →', "A's reading x →"), 'raw', 0, -12);
      tagAt('ay', [0, 0.55], L('B 的读数 y ↑', "B's reading y ↑"), 'raw', 62, 0);
      tagAt('st', [S.x0, S.y0], L('起点', 'start'), 'raw', -30, -12);
    }
    return { k };
  }

  function semi(a, b, n) { const c = (a + b) / 2, r = (b - a) / 2, p = []; for (let i = 0; i <= n; i++) { const u = Math.PI * i / n; p.push([c - r * Math.cos(u), r * Math.sin(u)]); } return p; }
  function geom() {
    const d = dNow(), a0 = -d / 2 - S.l1, a1 = -d / 2, b0 = d / 2, b1 = d / 2 + S.l2;
    return { d, a0, a1, b0, b1 };
  }
  function drawCut(g) {
    const th = TH, G0 = geom(), C = cuts(S.l1, S.l2, G0.d), { a0, a1, b0, b1 } = G0;
    // the entanglement wedge of AB (cyan): two half discs, or one connected band
    if (C.winner === 'sep') { g.poly(semi(a0, a1, 90), P.cyan, { alpha: 0.13 }); g.poly(semi(b0, b1, 90), P.cyan, { alpha: 0.13 }); }
    else if (C.winner === 'conn') {
      const big = semi(a0, b1, 180), small = semi(a1, b0, 60).reverse();
      g.poly(big.concat([[b1, 0], [b0, 0]], small, [[a1, 0], [a0, 0]]), P.cyan, { alpha: 0.13 });
    }
    g.line([[g.x0, 0], [g.x1, 0]], P.dim, { width: 1.2 * th });
    const draw = (which, pts) => {
      const win = C.winner === which || C.winner === 'tie';
      g.line(pts, win ? P.magenta : P.dim, win ? { width: 2.6 * th, glow: 8 } : { width: 1.3 * th, dash: [6, 5], alpha: 0.85 });
    };
    draw('sep', semi(a0, a1, 90)); draw('sep', semi(b0, b1, 90));
    draw('conn', semi(a1, b0, 40)); draw('conn', semi(a0, b1, 180));
    g.line([[a0, 0], [a1, 0]], P.amber, { width: 5 * th, glow: 8 }); g.line([[b0, 0], [b1, 0]], P.amber, { width: 5 * th, glow: 8 });
    g.line([[a1, 0], [b0, 0]], P.amber, { width: 1.2 * th, alpha: 0.6 });
    if (!TRV.thumbMode) {
      tagAt('A', [(a0 + a1) / 2, 0], 'A', 'hot', 0, 14); tagAt('B', [(b0 + b1) / 2, 0], 'B', 'hot', 0, 14);
      tagAt('d', [0, 0], `d = ${fix(G0.d, 2)}`, 'num', 0, 30);
      const cls = (w) => (C.winner === w || C.winner === 'tie' ? 'mg raw' : 'raw');
      tagAt('tsep', [(a0 + a1) / 2, S.l1 / 2], L('分开的割', 'separate cut'), cls('sep'), 0, -14);
      tagAt('tconn', [0, (b1 - a0) / 2], L('连通的割', 'connected cut'), cls('conn'), 0, -14);
    }
    return C;
  }

  function drawStage() {
    const st = $('stage').getBoundingClientRect(), below = (el) => (el ? el.getBoundingClientRect().bottom - st.top : 0);
    const thumb = TRV.thumbMode;
    const top = thumb ? 20 : Math.max(46, below($('hudBig').parentElement), below($('sceneChips'))) + 8;
    const bottom = thumb ? 20 : Math.max(18, $('legend').offsetHeight + 20);
    // the mirror scene keeps a narrow band under the plane: the signed error beat by beat, counted in cosine evaluations
    const band = S.scene === 'mirror' && !thumb ? clamp(Math.round(st.height * 0.2), 64, 112) : 0;
    stage.begin();
    let g;
    if (S.scene === 'mirror') g = kit.plot($('cv'), { x: [-0.08, 1.62], y: [-0.08, 1.62], equal: true, pad: [16, 16, top, bottom + (band ? band + 22 : 0)], clear: false });
    else {
      const R = (S.l1 + S.l2 + DMAX) / 2;
      g = kit.plot($('cv'), { x: [-(DMAX / 2 + S.l1) - 0.12, DMAX / 2 + S.l2 + 0.12], y: [-0.35, R + 0.12], equal: true, pad: [16, 16, top, bottom], clear: false });
    }
    G = g;
    g.ctx.save(); g.ctx.beginPath(); g.ctx.rect(g.pl, g.pt, g.iw, g.ih); g.ctx.clip();
    if (S.scene === 'mirror') { drawMirror(g); lastBand = band ? drawBand(bottom, band) : null; } else { drawCut(g); g.ctx.restore(); lastBand = null; }
    stage.end();
  }

  /* ---------- the band under the plane: one bar per cosine evaluation ----------
     Bar n is A's signed error x_n − θ* on a symmetric log scale (so the late beats stay visible): up when the
     reading is above θ*, down when below. The even beats carry the hollow ring of the plane; this beat is amber. */
  const E0 = 1e-3, EMAX = 0.8;
  const symlog = (e) => Math.sign(e) * Math.log10(1 + Math.abs(e) / E0) / Math.log10(1 + EMAX / E0);
  let lastBand = null;
  function drawBand(bottom, band) {
    const cv = $('cv'), H = cv.clientHeight, O = orb(), k = Math.min(beat(), NB), round = S.view === 'round';
    const b = kit.plot(cv, { x: [-0.7, NB + 0.7], y: [-1.3, 1.08], pad: [64, 18, H - bottom - band, bottom], clear: false });
    const fs = 10.5, ink = P.ink, dim = P.dim;
    b.line([[-0.5, 0], [NB + 0.5, 0]], dim, { width: 1, alpha: 0.8 });
    b.text(-0.7, 0.55, L('高于 θ*', 'above θ*'), dim, { align: 'right', dx: -6, size: fs, face: 'body' });
    b.text(-0.7, -0.55, L('低于 θ*', 'below θ*'), dim, { align: 'right', dx: -6, size: fs, face: 'body' });
    b.text(-0.7, 1.08, L('误差 x − θ* · 横轴：余弦求值次数 n', 'error x − θ* · across: cosine evaluations n'), ink, { base: 'bottom', dy: -5, size: fs, face: 'body' });
    const bars = [];
    for (let n = 0; n <= NB; n++) {
      const e = O.xs[n] - THETA, h = symlog(e), even = n % 2 === 0;
      bars.push({ n, e, h, sign: Math.sign(e), shown: n <= k });
      if (n % 2 === 0 || n === NB) b.text(n, -1.3, String(n), dim, { align: 'center', base: 'bottom', size: 9.5 });
      if (n > k) continue;
      const now = n === k, a = round ? (even ? 1 : 0.28) : 0.85;
      b.line([[n, 0], [n, h]], now ? P.amber : dim, { width: (now ? 3.2 : round && even ? 2.6 : 2) * TH, alpha: now ? 1 : a });
      if (even) b.dot(n, h, P.sigma, 4.2, { ring: true, width: 1.6, alpha: round ? 1 : 0.55 });
      if (now) b.dot(n, h, P.amber, 3.2);
    }
    const factor = round ? L(`每轮 ×${fix(LAM2, 3)}，一轮两次求值`, `×${fix(LAM2, 3)} a round, two evaluations each`) : L(`每拍 ×(−${fix(LAM, 3)})`, `×(−${fix(LAM, 3)}) a beat`);
    const eNow = O.xs[k] - THETA;
    b.text(NB + 0.7, 1.0, factor, ink, { align: 'right', base: 'top', size: fs, face: 'body' });
    b.text(NB + 0.7, 0.62, `n = ${k} · x − θ* = ${sgn(eNow, 4)}`, P.amber, { align: 'right', base: 'top', size: fs });
    return { bars, k, factor, now: eNow, view: S.view };
  }

  /* ---------- the strip: one question per plot ---------- */
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const pow10 = (e) => [Math.pow(10, e), e === 0 ? '1' : `10${String(e).split('').map((ch) => SUP[ch]).join('')}`];
  const D_TICKS = [2, 1, 0.5, 0.2, 0.1, 0.05];
  function drawPlots() {
    const A = $('plotA'), B = $('plotB');
    if (S.scene === 'mirror') {
      const O = orb(), k = Math.min(beat(), NB);
      const ex = O.xs.slice(0, NB + 1).map((v) => v - THETA), ey = O.ys.slice(0, NB + 1).map((v) => v - THETA);
      const m = Math.max(0.05, ...ex.map(Math.abs), ...ey.map(Math.abs)) * 1.12;
      const g = kit.plot(A, { x: [-0.4, NB + 0.4], y: [-m, m], pad: [40, 10, 10, 22] });
      g.axes({ yTicks: [[0, '0'], [m * 0.8, sgn(m * 0.8, 2)], [-m * 0.8, sgn(-m * 0.8, 2)]], xTicks: [0, 2, 4, 6, 8, 10, 12] });
      g.line(ex.map((e, t) => [t, e]), P.dim, { width: 1 });
      ex.forEach((e, t) => g.dot(t, e, P.dim, 2.8));
      const rx = []; for (let t = 0; t <= NB; t += 2) rx.push([t, ex[t]]);
      g.line(rx, P.sigma, { width: 2 }); rx.forEach((p) => g.dot(p[0], p[1], P.sigma, 4.5, { ring: true, width: 1.6 }));
      g.vline(k, P.amber, { alpha: 0.6 }); g.dot(k, ex[k], P.amber, 4.5);
      g.legend([[P.dim, L('A 的偏差 x − θ*，逐拍', 'A: x − θ*, every beat')], [P.sigma, L('每两拍取一次', 'every two beats')]]);
      $('pATitle').textContent = L('偏差：逐拍与逐轮', 'Deviation: beat by beat and round by round'); $('pAMeta').textContent = `x − θ* = ${sgn(ex[k], 4)}`;
      const es = ex.map((e, t) => Math.max(Math.abs(e), Math.abs(ey[t]))), pos = es.filter((e) => e > 0);
      const lo = Math.max(1e-12, Math.min(...pos) / 3), hi = Math.max(...es) * 3;
      const g2 = kit.plot(B, { x: [-0.4, NB + 0.4], y: [lo, hi], logY: true, pad: [40, 10, 10, 22] });
      const a = Math.ceil(Math.log10(lo)), b = Math.floor(Math.log10(hi)), yt = []; for (let e = b; e >= a; e--) yt.push(pow10(e));
      g2.axes({ yTicks: yt, xTicks: [0, 2, 4, 6, 8, 10, 12] });
      const ref = []; for (let t = 2; t <= NB; t++) ref.push([t, es[2] * Math.pow(LAM, t - 2)]);
      g2.line(ref, P.magenta, { dash: [5, 4], alpha: 0.85 });
      g2.line(es.map((e, t) => (e > 0 ? [t, e] : null)), P.dim, { width: 1.2 });
      es.forEach((e, t) => e > 0 && g2.dot(t, e, t % 2 ? P.dim : P.sigma, t % 2 ? 2.4 : 4.2, t % 2 ? {} : { ring: true, width: 1.5 }));
      g2.vline(k, P.amber, { alpha: 0.6 }); if (es[k] > 0) g2.dot(k, es[k], P.amber, 4.5);
      g2.legend([[P.dim, L('离 (θ*, θ*) 多远', 'distance to (θ*, θ*)')], [P.magenta, L('每拍 ×0.674 ＝ 每轮 ×0.454', '×0.674 a beat = ×0.454 a round'), 'dash']]);
      $('pBTitle').textContent = L('误差缩小：一轮恰是两拍', 'Shrinking: a round is exactly two beats'); $('pBMeta').textContent = es[k].toExponential(2).replace('-', '−');
      return;
    }
    const n = 200, sep = cuts(S.l1, S.l2, 1).sep, conn = [], env = [], mi = [];
    for (let i = 0; i <= n; i++) { const t = i / n, C = cuts(S.l1, S.l2, dOf(t)); conn.push([t, C.conn]); env.push([t, C.rt]); mi.push([t, C.I]); }
    const ys = conn.map((p) => p[1]).concat([sep]), y0 = Math.floor(Math.min(...ys)) - 0.3, y1 = Math.ceil(Math.max(...ys)) + 0.3;
    const xt = D_TICKS.map((d) => [tOf(d), String(d)]), tc = tOf(dCrit(S.l1, S.l2)), C = cuts(S.l1, S.l2, dNow());
    const g = kit.plot(A, { x: [0, 1], y: [y0, y1], pad: [34, 10, 10, 22] });
    const ytk = []; for (let v = Math.ceil(y0); v <= y1; v += 2) ytk.push(v);
    g.axes({ yTicks: ytk, xTicks: xt });
    g.line([[0, sep], [1, sep]], P.sigma, { dash: [5, 4] }); g.line(conn, P.sigma, { width: 1.3 });
    g.line(env, P.magenta, { width: 2.6, glow: 5 });
    if (tc >= 0 && tc <= 1) g.vline(tc, P.dim, { dash: [3, 3] });
    g.vline(clock.t, P.amber, { alpha: 0.7 }); g.dot(clock.t, C.rt, P.amber, 4.5);
    g.legend([[P.sigma, L('分开', 'separate'), 'dash'], [P.sigma, L('连通', 'connected')], [P.magenta, L('较短的那个', 'the shorter')]], { right: false, bottom: true });
    $('pATitle').textContent = L('两种割，谁短算谁', 'Two cuts: the shorter counts'); $('pAMeta').textContent = `d ${fix(dNow(), 3)}`;
    const top = Math.max(0.5, ...mi.map((p) => p[1])) * 1.15;
    const g2 = kit.plot(B, { x: [0, 1], y: [0, top], pad: [34, 10, 10, 22] });
    g2.axes({ yTicks: [0, [top / 1.15, fix(top / 1.15, 2)]], xTicks: xt });
    g2.area(mi, P.cyan, { alpha: 0.25 }); g2.line(mi, P.cyan, { width: 2 });
    if (tc >= 0 && tc <= 1) g2.vline(tc, P.dim, { dash: [3, 3] });
    g2.vline(clock.t, P.amber, { alpha: 0.7 }); g2.dot(clock.t, C.I, P.amber, 4.5);
    $('pBTitle').textContent = L('互信息何时点亮', 'When the mutual information lights up'); $('pBMeta').textContent = `I ${fix(C.I, 3)}`;
  }

  /* ---------- readouts, legend, HUD ---------- */
  function setRo(i, zh, en, val) { $(`roL${i}`).textContent = L(zh, en); $(`ro${i}`).textContent = val; }
  function mirrorNumbers() {
    const O = orb(), k = Math.min(beat(), NB), ex = (t) => O.xs[t] - THETA, ey = (t) => O.ys[t] - THETA;
    const round = k >= 2 && Math.abs(ex(k - 2)) > 1e-15 ? ex(k) / ex(k - 2) : null;
    const beatR = k >= 1 && Math.abs(ey(k - 1)) > 1e-15 ? ex(k) / ey(k - 1) : null;
    return { O, k, round, beatR, dist: Math.max(Math.abs(ex(k)), Math.abs(ey(k))) };
  }
  function drawText() {
    const leg = (items) => items.map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    let html;
    if (S.scene === 'mirror') {
      const M = mirrorNumbers(), { O, k } = M;
      $('roAside').textContent = L(`第 ${k} 拍`, `beat ${k}`);
      $('roKeyL').textContent = L('这一轮（两拍）误差之比', 'Error ratio over this round (two beats)');
      $('roKey').textContent = M.round == null ? '—' : sgn(M.round, 4);
      $('roKeySub').textContent = L(`→ +sin²θ* = +${fix(LAM2, 4)}`, `→ +sin²θ* = +${fix(LAM2, 4)}`);
      setRo(1, 'A 的读数 x', "A's reading x", fix(O.xs[k], 6));
      setRo(2, 'B 的读数 y', "B's reading y", fix(O.ys[k], 6));
      setRo(3, '一拍：A 读 B 时误差乘以', 'One beat: A reading B multiplies the error by', M.beatR == null ? '—' : `${sgn(M.beatR, 4)}  (→ −sin θ* = −${fix(LAM, 4)})`);
      setRo(4, '离 (θ*, θ*)', 'Off (θ*, θ*) by', M.dist.toExponential(2).replace('-', '−'));
      setRo(5, '每人已求余弦', 'Cosines each so far', String(k));
      const same = Math.abs(S.x0 - S.y0) < 1e-12;
      $('roNote').textContent = same
        ? L('两人起点相同：读数始终在对角线上，每拍都越过 θ*；两拍一轮取样却只从一侧逼近。', 'Both start alike: the pair stays on the diagonal and crosses θ* at every beat; sampled every two beats it closes in from one side only.')
        : L('两人起点不同：两条青色曲线只在 (θ*, θ*) 相交，两人的读数最终都停在那里。', 'Different starts: the two cyan curves meet only at (θ*, θ*), and both readings end up there.');
      $('hudBig').textContent = L(`互指 · 第 ${k} 拍`, `MIRRORS · BEAT ${k}`);
      $('hudSub').textContent = L(`A ${fix(O.xs[k], 4)} · B ${fix(O.ys[k], 4)} · 共识点 θ* ≈ ${fix(THETA, 6)}`, `A ${fix(O.xs[k], 4)} · B ${fix(O.ys[k], 4)} · consensus θ* ≈ ${fix(THETA, 6)}`);
      $('pillScene').querySelector('strong').textContent = L('互指', 'MIRRORS');
      $('pillNow').querySelector('strong').textContent = L(`第 ${k} 拍`, `beat ${k}`);
      $('pillKey').querySelector('strong').textContent = M.round == null ? '—' : sgn(M.round, 3);
      html = leg([['cy', '两人的读法 x = cos y、y = cos x', 'how each reads the other, x = cos y and y = cos x'], ['dm', '走过的每一拍', 'every beat so far'], ['ring', '每两拍取一次', 'every two beats'], ['am', '这一拍', 'this beat'], ['dash', '对角线 x = y', 'the diagonal x = y']]);
    } else {
      const d = dNow(), C = cuts(S.l1, S.l2, d), dc = dCrit(S.l1, S.l2);
      $('roAside').textContent = L('单位 c/3', 'units of c/3');
      $('roKeyL').textContent = L('互信息（领先阶）I = max(0, S分开 − S连通)', 'Mutual information (leading order) I = max(0, S_sep − S_conn)');
      $('roKey').textContent = fix(C.I, 4);
      $('roKeySub').textContent = C.I > 0 ? L('连通：点亮', 'connected: lit') : L('领先阶为零', 'zero at leading order');
      setRo(1, '分开的割', 'Separate cut', fix(C.sep, 4));
      setRo(2, '连通的割', 'Connected cut', fix(C.conn, 4));
      setRo(3, '间距 d · 临界间距 d_crit', 'Gap d · critical gap d_crit', `${fix(d, 4)} · ${fix(dc, 4)}`);
      setRo(4, 'd(l₁ + l₂ + d) − l₁l₂', 'd(l₁ + l₂ + d) − l₁l₂', sgn(d * (S.l1 + S.l2 + d) - S.l1 * S.l2, 4));
      setRo(5, '较短的是', 'Shorter', C.winner === 'conn' ? L('连通', 'connected') : C.winner === 'sep' ? L('分开', 'separate') : L('一样长', 'a tie'));
      $('roNote').textContent = C.winner === 'conn'
        ? L('两段靠得够近：连通的割更短，青色的纠缠楔连成一片。', 'Close enough: the connected cut is shorter and the cyan entanglement wedge is one piece.')
        : C.winner === 'sep' ? L('两段离得远：各自的割更短，纠缠楔是两块，领先阶互信息为零。', 'Far apart: the separate cuts are shorter, the wedge is two pieces and the leading-order mutual information is zero.')
          : L('恰在 d_crit：两种割一样长。', 'Exactly at d_crit: the two cuts are equally long.');
      $('hudBig').textContent = L(`极小割 · d = ${fix(d, 3)}`, `MIN CUT · d = ${fix(d, 3)}`);
      $('hudSub').textContent = L(`l₁ = ${fix(S.l1, 2)}，l₂ = ${fix(S.l2, 2)} · d_crit = ${fix(dc, 3)} · 互信息 ${fix(C.I, 3)}`, `l₁ = ${fix(S.l1, 2)}, l₂ = ${fix(S.l2, 2)} · d_crit = ${fix(dc, 3)} · mutual information ${fix(C.I, 3)}`);
      $('pillScene').querySelector('strong').textContent = L('极小割', 'MIN CUT');
      $('pillNow').querySelector('strong').textContent = `d ${fix(d, 3)}`;
      $('pillKey').querySelector('strong').textContent = `I ${fix(C.I, 3)}`;
      html = leg([['am', '两段区间 A、B', 'the intervals A and B'], ['mg', '较短的割', 'the shorter cut'], ['dash dm', '落选的割', 'the cut that loses'], ['cy box', '纠缠楔', 'entanglement wedge']]);
    }
    if ($('legend')._h !== html) { $('legend').innerHTML = html; $('legend')._h = html; }
  }

  const paint = kit.painter(() => { drawText(); drawStage(); drawPlots(); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- controls ---------- */
  let stopAt = null;
  const SC = { mirror: { max: NB, rate: 2.5, step: 1 }, cut: { max: 1, rate: 0.2, step: 0.05 } };
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: NB, rate: 2.5, step: 1,
    format: (t, max) => (S.scene === 'mirror'
      ? `${L('拍', 'beat')} ${Math.floor(t + 1e-9)} <small>/ ${max.toFixed(0)} · ${L('轮', 'round')} ${Math.floor(t / 2 + 1e-9)}</small>`
      : `d ${fix(dOf(t), 3)} <small>${L('从 2.5 拉近到 0.04', 'from 2.5 down to 0.04')}</small>`),
    onChange: (t, c) => { if (stopAt != null && c.playing && t >= stopAt) { const s = stopAt; stopAt = null; c.pause(); c.set(s); return; } paint(); }
  });
  function setScene(sc, t) {
    S.scene = sc; sceneChips.set(sc, true);
    document.querySelectorAll('section[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    clock.pause(); clock.rate = SC[sc].rate; clock.step = SC[sc].step; clock.setMax(SC[sc].max, true); clock.set(t == null ? 0 : t);
  }
  const leave = () => { cards.mark(null); stopAt = null; };
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  const viewChips = kit.chips($('viewChips'), 'view', (v) => { S.view = v; leave(); paint(); });
  const fX0 = kit.field($('x0'), { fmt: (v) => v.toFixed(2), onInput: (v) => { S.x0 = v; leave(); paint(); } });
  const fY0 = kit.field($('y0'), { fmt: (v) => v.toFixed(2), onInput: (v) => { S.y0 = v; leave(); paint(); } });
  const fL1 = kit.field($('l1'), { fmt: (v) => v.toFixed(2), onInput: (v) => { S.l1 = v; leave(); paint(); } });
  const fL2 = kit.field($('l2'), { fmt: (v) => v.toFixed(2), onInput: (v) => { S.l2 = v; leave(); paint(); } });
  $('rew').addEventListener('click', () => { stopAt = null; clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('mirror'); }, 2: () => { leave(); setScene('cut'); } });

  /* ---------- experiment cards ---------- */
  const CARDS = {
    alone: { scene: 'mirror', x0: 0.1, y0: 0.1, view: 'beat', to: 6, still: 5 },
    round: { scene: 'mirror', x0: 0.1, y0: 0.1, view: 'round', to: 10, still: 10 },
    apart: { scene: 'mirror', x0: 1.5, y0: 0, view: 'round', to: 12, still: 12 },
    transition: { scene: 'cut', l1: 1, l2: 1, to: 'crit', still: tOf(dCrit(1, 1)) },   // the still: d at d_crit
    connected: { scene: 'cut', l1: 1, l2: 1, at: tOf(0.2) }
  };
  const NOTES = {
    alone: ['两人从同一个读数 0.1 出发：琥珀色的点始终在灰色对角线上，每一拍都越过 (θ*, θ*)，0.1 → 0.995 → 0.544 → 0.855……与孤立的余弦迭代一模一样，误差每拍乘约 −0.674。下方条带的横轴是余弦求值次数：每根灰色细柱是那一拍的误差 x − θ*，一上一下地交替。', 'Both start from the same reading 0.1: the amber point stays on the grey diagonal and crosses (θ*, θ*) at every beat, 0.1 → 0.995 → 0.544 → 0.855 …, exactly like the lone cosine iteration, the error multiplied by about −0.674 a beat. Along the band below, the count is cosine evaluations: each grey bar is that beat\'s error x − θ*, and they alternate up and down.'],
    round: ['同一条轨道，每两拍取一次（空心的环）：0.1 → 0.544 → 0.656 → 0.702……全在 (θ*, θ*) 的同一侧单调逼近，每轮误差约乘 +0.454 = 0.674²。一轮含两次余弦求值：环只是“同一起点”那张卡里同一条轨道的偶数拍，同样多次余弦求值走到同一处——更稳，不是更快。下方条带里，带环的细柱落在偶数格上，全在零线下方。', 'The same orbit sampled every two beats (the hollow rings): 0.1 → 0.544 → 0.656 → 0.702 …, all on one side of (θ*, θ*), closing in monotonically, the error multiplied by about +0.454 = 0.674² a round. A round costs two cosine evaluations: the rings are just the even beats of the orbit in the “Same start” card, and the same number of cosine evaluations lands in the same place — steadier, not faster. In the band below, the ringed bars sit on the even counts, all below the zero line.'],
    apart: ['A 从 1.5、B 从 0 出发：两条青色曲线 x = cos y 与 y = cos x 只在对角线上的 (θ*, θ*) 相交。空心的环收进这一点：A 的读数逐轮从上方单调下降，B 的读数逐轮从下方单调上升，没有别的平衡。', 'A starts at 1.5, B at 0: the cyan curves x = cos y and y = cos x meet only at (θ*, θ*) on the diagonal. The hollow rings close in on that point, A\'s reading falling monotonically from above round by round and B\'s rising from below; there is no other balance.'],
    transition: ['两段长 1 的区间从 d = 2.5 拉近：品红的是分开的两条半圆。到 d = √2 − 1 ≈ 0.414，连通的两条（间隙上的小半圆与整段上的大半圆）恰好一样长，两组都是品红。', 'Two intervals of length 1 come closer from d = 2.5: magenta is the separate pair of semicircles. At d = √2 − 1 ≈ 0.414 the connected pair (the small semicircle over the gap and the large one over the whole span) is exactly as long, and both pairs are magenta.'],
    connected: ['d = 0.2，比 0.414 更近：连通的割更短（品红），青色的纠缠楔从 A 连到 B 成为一片，领先阶互信息 ln(1/(0.2 × 2.2)) ≈ 0.82 > 0。', 'd = 0.2, closer than 0.414: the connected cut is shorter (magenta) and the cyan entanglement wedge reaches from A to B in one piece; the leading-order mutual information is ln(1/(0.2 × 2.2)) ≈ 0.82 > 0.']
  };
  let booting = true;
  function applyPreset(id) {
    const c = CARDS[id]; stopAt = null;
    if (c.scene === 'mirror') { S.x0 = c.x0; S.y0 = c.y0; fX0.set(c.x0); fY0.set(c.y0); S.view = c.view; viewChips.set(c.view, true); }
    else { S.l1 = c.l1; S.l2 = c.l2; fL1.set(c.l1); fL2.set(c.l2); }
    const res = (v) => (v === 'crit' ? tOf(dCrit(S.l1, S.l2)) : v);
    setScene(c.scene, 0);
    if (c.at != null) { clock.set(c.at); return; }
    if (TRV.still || (booting && !TRV.embed)) { clock.set(c.still); return; }
    stopAt = res(c.to);
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { presets: CARDS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景，拖两人的起点或两段的长度，在舞台上点或拖，拖时间轴。随时可以再选一张卡。', 'Free play: switch scenes, move the two starts or the two lengths, press or drag on the stage, scrub the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.MOA_DEBUG = {
    get state() {
      const base = { scene: S.scene, t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current, theta: THETA };
      if (S.scene === 'mirror') {
        const M = mirrorNumbers();
        return Object.assign(base, { x0: S.x0, y0: S.y0, view: S.view, beat: M.k, xs: M.O.xs.slice(0, NB + 1), ys: M.O.ys.slice(0, NB + 1), x: M.O.xs[M.k], y: M.O.ys[M.k], roundRatio: M.round, beatRatio: M.beatR, readout: $('roKey').textContent, band: lastBand });
      }
      const d = dNow(), C = cuts(S.l1, S.l2, d);
      return Object.assign(base, { l1: S.l1, l2: S.l2, d, dcrit: dCrit(S.l1, S.l2), sep: C.sep, conn: C.conn, I: C.I, winner: C.winner, eps: EPS, readout: $('roKey').textContent });
    },
    seek: (t) => { stopAt = null; clock.pause(); clock.set(t); },
    /** Move a playing card forward without stopping it (lets a test reach the card's stop on slow frames). */
    jump: (t) => { if (clock.playing) clock.set(t); },
    tOf,
    /** Viewport point of the data point (x, y) on the stage (for pointer tests). */
    at: (x, y) => { const b = $('cv').getBoundingClientRect(); return [b.left + G.X(x), b.top + G.Y(y)]; }
  };
  window.TRV_THUMB = () => { S.x0 = 1.5; S.y0 = 0; S.view = 'round'; viewChips.set('round', true); setScene('mirror', NB); paint.now(); };
  cards.pick(cards.initial('apart'));
  booting = false;
  paint();
})();
