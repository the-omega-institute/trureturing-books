/* WALK//SPREAD · 游走扩散 · How walks spread
   Two walks on the cycle ZMod p, drawn as a line of positions x ∈ (−p/2, p/2], both from the origin:
     quantum    the Hadamard walk of the text (hadamardStep): new ψ(0, x) = (ψ(0, x + 1) + ψ(1, x + 1))/√2,
                new ψ(1, x) = (ψ(0, x − 1) − ψ(1, x − 1))/√2, started at the origin with the coin c = (√w, e^{iφ}√(1 − w));
                P(x) = |ψ(0, x)|² + |ψ(1, x)|², cyan bars above the axis
     classical  ±1 with probability ½ each per step, grey bars below the axis
   The rail is the number of steps n (0 … 60). Scene "dist" shows the two distributions; scene "width" their widths
   against n. Magenta marks what the quantum distribution has beyond its mirror image P(−x).
   Read-only probe for the browser suite: window.WALK_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const TH = TRV.thumbMode ? 2 : 1;
  const NMAX = 60, R2 = Math.SQRT1_2, DEG = Math.PI / 180;

  /* ---------- model ---------- */
  const S = { scene: 'dist', p: 121, w: 0.5, phi: 90 };
  const coin = () => { const a = Math.sqrt(clamp(S.w, 0, 1)), b = Math.sqrt(clamp(1 - S.w, 0, 1)); return [a, 0, b * Math.cos(S.phi * DEG), b * Math.sin(S.phi * DEG)]; };
  /** The representative of x mod p in (−p/2, p/2]. */
  const rep = (x, p) => { const r = ((x % p) + p) % p; return r > p / 2 ? r - p : r; };

  let RUN = null, runKey = '';
  /** Every step 0 … NMAX for the current p and coin: quantum amplitudes (re, im per coin) and classical probabilities. */
  function run() {
    const c = coin(), p = S.p, key = `${p}|${c.join(',')}`;
    if (key === runKey) return RUN;
    let re0 = new Float64Array(p), im0 = new Float64Array(p), re1 = new Float64Array(p), im1 = new Float64Array(p), cl = new Float64Array(p);
    re0[0] = c[0]; im0[0] = c[1]; re1[0] = c[2]; im1[0] = c[3]; cl[0] = 1;
    const steps = [];
    for (let n = 0; n <= NMAX; n++) {
      steps.push(facts(p, re0, im0, re1, im1, cl, n));
      const a0 = new Float64Array(p), b0 = new Float64Array(p), a1 = new Float64Array(p), b1 = new Float64Array(p), c2 = new Float64Array(p);
      for (let x = 0; x < p; x++) {
        const u = (x + 1) % p, d = (x - 1 + p) % p;
        a0[x] = (re0[u] + re1[u]) * R2; b0[x] = (im0[u] + im1[u]) * R2;
        a1[x] = (re0[d] - re1[d]) * R2; b1[x] = (im0[d] - im1[d]) * R2;
        c2[x] = 0.5 * (cl[u] + cl[d]);
      }
      re0 = a0; im0 = b0; re1 = a1; im1 = b1; cl = c2;
    }
    RUN = { p, coin: c, steps };
    runKey = key;
    return RUN;
  }
  /** What the page shows about one step: distributions by position, widths, mirror balance. */
  function facts(p, re0, im0, re1, im1, cl, n) {
    const xs = [], q = [], k = [], z0 = [], z1 = [];
    let mq = 0, mc = 0, tot = 0, ctot = 0;
    for (let i = 0; i < p; i++) {
      const x = rep(i, p), a = re0[i] * re0[i] + im0[i] * im0[i], b = re1[i] * re1[i] + im1[i] * im1[i];
      xs.push(x); q.push(a + b); k.push(cl[i]); z0.push(a); z1.push(b);
      mq += x * (a + b); mc += x * cl[i]; tot += a + b; ctot += cl[i];
    }
    let vq = 0, vc = 0, imb = 0, pair = 0;
    for (let i = 0; i < p; i++) {
      vq += (xs[i] - mq) ** 2 * q[i]; vc += (xs[i] - mc) ** 2 * k[i];
      const j = (p - i) % p;   // −x
      imb += Math.abs(q[i] - q[j]);
      pair = Math.max(pair, Math.abs(z0[i] - z1[j]));
    }
    return { n, xs, q, k, z0, z1, meanQ: mq, sigmaQ: Math.sqrt(Math.max(0, vq)), sigmaC: Math.sqrt(Math.max(0, vc)), imbalance: imb / 2, pairGap: pair, total: tot, ctotal: ctot };
  }
  const stepN = () => Math.min(NMAX, Math.floor(clock.t + 1e-9));
  const now = () => run().steps[stepN()];
  const isStar = () => Math.abs(S.w - 0.5) < 1e-9 && Math.abs(Math.abs(S.phi) - 90) < 1e-9;
  const coinName = () => {
    if (isStar()) return S.phi > 0 ? 'c* = (1, i)/√2' : '(1, −i)/√2';
    if (S.w > 1 - 1e-9) return '|0⟩';
    if (S.w < 1e-9) return '|1⟩';
    if (Math.abs(S.w - 0.5) < 1e-9 && Math.abs(S.phi) < 1e-9) return '(1, 1)/√2';
    if (Math.abs(S.w - 0.5) < 1e-9 && Math.abs(Math.abs(S.phi) - 180) < 1e-9) return '(1, −1)/√2';
    return `(${fix(Math.sqrt(S.w), 2)}, ${fix(Math.sqrt(1 - S.w), 2)}·e<sup>i${fix(S.phi, 0)}°</sup>)`;
  };

  /* ---------- stage ---------- */
  const stage = kit.stage3($('stage'), { canvas: $('cv'), rotate: false });
  function frame(W, H, extra) {
    const st = $('stage').getBoundingClientRect(), hud = document.querySelector('.hud-tl');
    const top = TRV.thumbMode ? 26 : Math.max(48, hud.getBoundingClientRect().bottom - st.top) + 10;
    const bottom = TRV.thumbMode ? 26 : Math.max(22, $('legend').offsetHeight + 22) + (extra || 0);
    return [TRV.thumbMode ? 26 : 42, TRV.thumbMode ? 26 : 18, top, bottom];
  }
  const tagAt = (key, g, x, y, html, cls, dx, dy) => stage.tag(key, [g.X(x), g.Y(y)], html, cls, { screen: true, dx: dx || 0, dy: dy || 0, fade: false });

  function drawDist(W, H, F) {
    const p = S.p, half = Math.floor(p / 2) + 0.5, n = F.n, thumb = TRV.thumbMode;
    const top = Math.max(1e-3, ...F.q), bot = Math.max(1e-3, ...F.k), ymax = Math.max(top, bot) * 1.12;
    const g = kit.plot($('cv'), { x: [-half, half], y: [-ymax, ymax], pad: frame(W, H), clear: false });
    const bw = Math.max(1, Math.min(14, g.scale * 0.72)), ctx = g.ctx;
    // the farthest reach ±n (only while the walk has not wrapped round the cycle)
    if (2 * n < p) for (const s of [-1, 1]) g.line([[s * n, -ymax * 0.98], [s * n, ymax * 0.98]], P.ink, { width: TH, dash: [4, 5], alpha: 0.45 });
    // the axis
    g.line([[-half, 0], [half, 0]], P.lineHot, { width: 1.2 * TH });
    const bar = (x, y0, y1, color, alpha) => { const a = g.Y(y0), b = g.Y(y1); ctx.globalAlpha = alpha; ctx.fillStyle = color; ctx.fillRect(g.X(x) - bw / 2, Math.min(a, b), bw, Math.max(Math.abs(a - b), y1 === y0 ? 0 : 0.8)); ctx.globalAlpha = 1; };
    const lop = F.imbalance > 1e-9;
    F.xs.forEach((x, i) => {
      const q = F.q[i], m = F.q[(p - i) % p];
      if (lop) { bar(x, 0, Math.min(q, m), P.cyan, 0.85); if (q > m) bar(x, m, q, P.magenta, 0.9); } else bar(x, 0, q, P.cyan, 0.85);
      bar(x, 0, -F.k[i], P.dim, 0.75);
    });
    // the mirror image P(−x), dashed, when it differs
    // (one silhouette through the bar tops of the occupied positions, so that it reads as a shape)
    if (lop) {
      const sil = F.xs.map((x, i) => [x, F.q[(p - i) % p], i]).filter(([x]) => 2 * n >= p || (Math.abs(x) <= n && (x - n) % 2 === 0)).sort((a, b) => a[0] - b[0]).map(([x, m]) => [x, m]);
      g.line(sil, P.ink, { width: 1.3 * TH, dash: [4, 3], alpha: 0.85 });
    }
    // the widths: brackets at mean ± σ, cyan above, grey below
    const bracket = (c, s, y, color) => {
      const yy = g.Y(y), a = g.X(c - s), b = g.X(c + s), tick = 5 * TH;
      ctx.strokeStyle = color; ctx.lineWidth = 1.6 * TH; ctx.beginPath();
      ctx.moveTo(a, yy - tick); ctx.lineTo(a, yy + tick); ctx.moveTo(a, yy); ctx.lineTo(b, yy); ctx.moveTo(b, yy - tick); ctx.lineTo(b, yy + tick); ctx.stroke();
    };
    if (n > 0) {
      bracket(F.meanQ, F.sigmaQ, ymax * 0.93, P.cyan);
      bracket(0, F.sigmaC, -ymax * 0.93, P.dim);
    }
    // where the two ends of the line are the same edge of the cycle
    if (p < 121 || 2 * n >= p) {
      const yA = g.Y(0), xa = g.X(-half), xb = g.X(half);
      ctx.strokeStyle = P.ink; ctx.globalAlpha = 0.6; ctx.lineWidth = TH; ctx.setLineDash([2, 4]);
      ctx.beginPath(); ctx.moveTo(xa, yA); ctx.lineTo(xa - 10, yA); ctx.moveTo(xb, yA); ctx.lineTo(xb + 10, yA); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
    }
    if (!thumb) {
      if (n > 0) {
        tagAt('sq', g, F.meanQ + F.sigmaQ, ymax * 0.93, `σ = ${fix(F.sigmaQ, 2)}`, 'num cy', 34, 0);
        tagAt('sc', g, F.sigmaC, -ymax * 0.93, `σ = ${fix(F.sigmaC, 2)}`, 'num', 34, 0);
      }
      tagAt('lq', g, -half, ymax * 0.62, L('量子', 'quantum'), 'raw cy', 30, 0);
      tagAt('lc', g, -half, -ymax * 0.62, L('经典', 'classical'), 'raw', 30, 0);
      if (2 * n < p && n > 0) { tagAt('cone', g, n, ymax * 0.98, `+${n}`, 'tick', 0, -8); tagAt('cone-', g, -n, ymax * 0.98, `−${n}`, 'tick', 0, -8); }
      if (p < 121 || 2 * n >= p) tagAt('wrap', g, half, -ymax * 0.75, L(`两端相接 · p = ${p}`, `ends joined · p = ${p}`), 'tick', -60, 0);
    }
  }

  function drawWidth(W, H) {
    const R = run(), n = stepN(), thumb = TRV.thumbMode;
    const ymax = Math.max(...R.steps.map((s) => Math.max(s.sigmaQ, s.sigmaC))) * 1.12 || 1;
    const g = kit.plot($('cv'), { x: [0, NMAX], y: [0, ymax], pad: frame(W, H, TRV.thumbMode ? 0 : 18), clear: false });
    g.axes({ xTicks: thumb ? [] : [0, 10, 20, 30, 40, 50, 60], yTicks: thumb ? [] : [0, 10, 20, 30].filter((v) => v < ymax), xLabel: thumb ? '' : L('步数 n', 'steps n'), yLabel: thumb ? '' : L('宽度 σ', 'width σ') });
    const q = R.steps.map((s) => [s.n, s.sigmaQ]), c = R.steps.map((s) => [s.n, s.sigmaC]);
    g.line(q, P.cyan, { width: 1.2 * TH, alpha: 0.3 }); g.line(c, P.dim, { width: 1.2 * TH, alpha: 0.4 });
    g.line(q.slice(0, n + 1), P.cyan, { width: 2.4 * TH }); g.line(c.slice(0, n + 1), P.dim, { width: 2.4 * TH });
    for (let k = 0; k <= n; k += 1) { g.dot(k, R.steps[k].sigmaQ, P.cyan, 1.6 * TH); g.dot(k, R.steps[k].sigmaC, P.dim, 1.6 * TH); }
    const F = R.steps[n];
    g.vline(n, P.amber, { alpha: 0.6 });
    g.dot(n, F.sigmaQ, P.amber, 4.5 * TH, { glow: 8 }); g.dot(n, F.sigmaC, P.amber, 4.5 * TH, { glow: 8 });
    if (!thumb) {
      // generic names: the straight line and √n belong to the line only; once the walk wraps round the cycle both widths stay below p/2
      tagAt('wq', g, 30, R.steps[30].sigmaQ, L('量子宽度', 'quantum width'), 'raw cy', -70, -18);
      tagAt('wc', g, 30, R.steps[30].sigmaC, L('经典宽度', 'classical width'), 'raw', 0, -16);
      if (n > 0) { tagAt('vq', g, n, F.sigmaQ, fix(F.sigmaQ, 1), 'num cy', -30, -12); tagAt('vc', g, n, F.sigmaC, fix(F.sigmaC, 1), 'num', -26, -14); }
    }
  }

  function drawStage() {
    const cv = $('cv'), W = cv.clientWidth, H = cv.clientHeight;
    stage.begin();
    if (S.scene === 'width') drawWidth(W, H); else drawDist(W, H, now());
    stage.end();
  }

  /* ---------- strip: lopsidedness against n ---------- */
  function drawPlot() {
    const R = run(), n = stepN(), g = kit.plot($('plot'), { x: [0, NMAX], y: [0, 1], pad: [32, 10, 8, 22] });
    g.axes({ yTicks: [0, 0.5, 1], xTicks: [0, 10, 20, 30, 40, 50, 60], xGrid: true });
    const pts = R.steps.map((s) => [s.n, s.imbalance]);
    g.area(pts, P.magenta, { alpha: 0.15 }); g.line(pts, P.magenta, { width: 2 });
    g.vline(n, P.amber); g.dot(n, R.steps[n].imbalance, P.amber, 4);
    g.legend([[P.magenta, L('量子分布与镜像之差', 'quantum vs its mirror image')]]);
    $('plotMeta').innerHTML = `${L('硬币', 'coin')} ${coinName()}`;
  }

  /* ---------- readouts, HUD, legend ---------- */
  function drawText() {
    const F = now(), n = F.n, ratio = n > 0 ? F.sigmaQ / F.sigmaC : null;
    $('hudBig').innerHTML = S.scene === 'width' ? L(`宽度 · 走到第 ${n} 步`, `Width · step ${n}`) : L(`分布 · 第 ${n} 步`, `Spread · step ${n}`);
    $('hudSub').innerHTML = S.scene === 'width'
      ? `<span class="c-cy">${L('量子', 'quantum')} σ = ${fix(F.sigmaQ, 2)}</span> · ${L('经典', 'classical')} σ = ${fix(F.sigmaC, 2)}${n > 0 ? ` · ${L('比', 'ratio')} ${fix(ratio, 2)}` : ''}`
      : `${L('硬币', 'coin')} ${coinName()} · <span class="c-cy">${L('量子', 'quantum')} σ = ${fix(F.sigmaQ, 2)}</span> · ${L('经典', 'classical')} σ = ${fix(F.sigmaC, 2)}${F.imbalance > 1e-9 ? ` · <span class="c-mg">${L('失衡', 'lopsided')} ${fix(F.imbalance, 3)}</span>` : ''}`;
    $('roRatio').textContent = ratio == null ? '—' : fix(ratio, 2);
    $('roRatioSub').innerHTML = n > 0 ? ` <small>= ${fix(F.sigmaQ, 2)} ÷ ${fix(F.sigmaC, 2)}</small>` : '';
    $('roN').textContent = `${n} · ${S.p}`;
    $('roQ').textContent = `${fix(F.sigmaQ, 3)} · ${n > 0 ? fix(F.sigmaQ / n, 3) : '—'}`;
    $('roC').textContent = `${fix(F.sigmaC, 3)} · ${fix(Math.sqrt(n), 3)}`;
    $('roImb').textContent = fix(F.imbalance, 4);
    $('roPair').textContent = `${F.pairGap < 1e-12 ? '0' : fix(F.pairGap, 4)} · ${fix(F.total, 6)}`;
    $('roAside').innerHTML = coinName();
    $('roNote').innerHTML = F.pairGap < 1e-12
      ? L('每一对镜像模式 (0, x) 与 (1, −x) 都均分了它们的概率，所以 P(x) = P(−x)：分布左右对称。', 'Every mirror pair of modes (0, x) and (1, −x) splits its probability evenly, so P(x) = P(−x): the distribution is symmetric.')
      : L(`这枚硬币没有均分镜像对：最大的一对差 ${fix(F.pairGap, 3)}，分布偏向${F.meanQ < 0 ? '左' : '右'}边，平均位置 ${fix(F.meanQ, 2)}。`, `This coin does not split the mirror pairs evenly: the largest gap is ${fix(F.pairGap, 3)}, and the distribution leans ${F.meanQ < 0 ? 'left' : 'right'}, with mean position ${fix(F.meanQ, 2)}.`);
    $('pillN').querySelector('strong').textContent = String(n);
    $('pillRatio').querySelector('strong').textContent = ratio == null ? '—' : fix(ratio, 2);
    const items = S.scene === 'width'
      ? [['cy', '量子游走的宽度', 'width of the quantum walk'], ['dm', '经典随机游走的宽度', 'width of the classical walk'], ['am', '当前的步数', 'the current step']]
      : [['cy', '量子游走：P(x) 与宽度 ±σ', 'quantum walk: P(x) and width ±σ'], ['dm', '经典随机游走（向下画）', 'classical random walk (drawn downwards)']]
        .concat(F.imbalance > 1e-9 ? [['mg', '比镜像 P(−x) 多出的部分（虚线）', 'beyond the mirror image P(−x) (dashed)']] : []);
    $('legend').innerHTML = items.map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
  }

  const paint = kit.painter(() => { drawText(); drawStage(); drawPlot(); }, [$('stage'), $('plot')]);

  /* ---------- the rail: steps ---------- */
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: NMAX, rate: 8, step: 1,
    format: (t, max) => `n = ${Math.floor(t + 1e-9)} <small>/ ${max.toFixed(0)}</small>`,
    onChange: (t, c) => {
      if (stopAt != null && c.playing && t >= stopAt - 1e-9) { const s = stopAt; stopAt = null; c.pause(); c.set(s); return; }
      paint();
    }
  });

  /* ---------- controls ---------- */
  const leave = () => { cards.mark(null); stopAt = null; };
  const fW = kit.field($('wt'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.w = v; paint(); } });
  const fPhi = kit.field($('phi'), { fmt: (v) => `${fix(v, 0)}°`, onInput: (v) => { leave(); S.phi = v; paint(); } });
  const fP = kit.field($('pp'), { fmt: (v) => String(v), onInput: (v) => { leave(); S.p = Math.round(v); paint(); } });
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); S.scene = v; paint(); });
  $('rew').addEventListener('click', () => { clock.pause(); stopAt = null; clock.set(0); });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    ten: { scene: 'dist', p: 121, w: 0.5, phi: 90, n: 10 },
    fifty: { scene: 'dist', p: 121, w: 0.5, phi: 90, n: 50 },
    width: { scene: 'width', p: 121, w: 0.5, phi: 90, n: 60 },
    coin: { scene: 'dist', p: 121, w: 0.5, phi: 0, n: 50 },
    ring: { scene: 'dist', p: 9, w: 0.5, phi: 90, n: 20 }
  };
  const NOTES = {
    ten: ['从原点出发、硬币取 c*，走 10 步：上方青色的量子分布左右对称，最高的两根柱在 ±6，全都落在虚线 ±10 之内；下方灰色的经典分布堆在中间。青色括号 ±σ 的 σ = 5.47，灰色的只有 √10 = 3.16。', 'From the origin with the coin c*, ten steps: above, the cyan quantum distribution is symmetric, its two tallest bars at ±6 and all of it inside the dashed lines ±10; below, the grey classical distribution piles up in the middle. The cyan bracket ±σ has σ = 5.47, the grey one only √10 = 3.16.'],
    fifty: ['走 50 步：青色的两个尖峰已经跑到 ±34，灰色的钟形只铺开到 ±7 左右。量子宽度 σ = 27.07，经典 σ = √50 = 7.07，差了 3.83 倍。', 'Fifty steps: the two cyan peaks have run out to ±34, while the grey bell spreads only to about ±7. Quantum width σ = 27.07, classical σ = √50 = 7.07: 3.83 times apart.'],
    width: ['宽度随步数：青色的量子宽度是一条直线（σ ÷ n 停在 0.54 附近），灰色的经典宽度是 √n 的抛物线。走到 60 步是 32.5 对 7.75：在一条线上，两者之差是平方关系，不是指数。', 'Width against the steps: the cyan quantum width is a straight line (σ ÷ n stays near 0.54), the grey classical width the parabola √n. At 60 steps it is 32.5 against 7.75: on a line the gap between them is a square, not an exponential.'],
    coin: ['换成实硬币 (1, 1)/√2，同样一半一半，只是没有那个 i：走 50 步，青色的分布偏向左边；虚线是它的镜像 P(−x) 的轮廓，品红是比镜像多出的部分，合计 0.51。', 'A real coin (1, 1)/√2, half and half as before but without the i: after fifty steps the cyan distribution leans left; the dashed outline is its mirror image P(−x), and magenta is what it has beyond them, 0.51 in all.'],
    ring: ['圈上只有 9 个点，硬币取 c*，走 20 步：游走早已绕回来，青色的柱和灰色的柱一样摊满了整圈，不再有往外跑的前沿；但青色的柱仍然左右成镜像，没有品红。', 'A cycle of only nine points, coin c*, twenty steps: the walk has long since wrapped round, and the cyan bars, like the grey ones, cover the whole ring with no front running outwards; yet the cyan bars are still mirror images of each other, with no magenta.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause(); stopAt = null;
    S.scene = p.scene; S.p = p.p; S.w = p.w; S.phi = p.phi;
    sceneChips.set(S.scene, true); fW.set(p.w); fPhi.set(p.phi); fP.set(p.p);
    clock.set(p.n);
    // a still (cover, cited figure shot) and the opening of the full page show the card's telling frame;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed)) return;
    clock.set(0);
    stopAt = p.n < NMAX ? p.n : null;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖时间轴改步数，改硬币的份额与相位，或把圈变短。随时可以再选一张卡。', 'Free play: drag the rail to change the steps, change the share and phase of the coin, or shorten the cycle. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.WALK_DEBUG = {
    get state() {
      const F = now();
      return { scene: S.scene, p: S.p, w: S.w, phi: S.phi, coin: run().coin.slice(), t: clock.t, n: F.n, max: clock.max, playing: clock.playing, preset: cards.current,
        xs: F.xs.slice(), q: F.q.slice(), k: F.k.slice(), z0: F.z0.slice(), z1: F.z1.slice(),
        sigmaQ: F.sigmaQ, sigmaC: F.sigmaC, meanQ: F.meanQ, imbalance: F.imbalance, pairGap: F.pairGap, total: F.total, ctotal: F.ctotal,
        widths: run().steps.map((s) => [s.sigmaQ, s.sigmaC]), imbalances: run().steps.map((s) => s.imbalance) };
    },
    seek: (t) => { clock.pause(); stopAt = null; clock.set(t); }
  };
  window.TRV_THUMB = () => { applyPreset('fifty'); cards.mark('fifty'); clock.pause(); clock.set(50); paint.now(); };
  cards.pick(cards.initial('fifty'));
  booting = false;
  paint();
})();
