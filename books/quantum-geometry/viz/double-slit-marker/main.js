/* SLIT//MARKER · 双缝与路径标记 (chapter 6, §6.3).
   The stage has two parts that move together:
     screen  hits arriving one by one on the screen of a double slit, the expected law env(x)·(1 + c·cos kx) drawn
             over them, and the cyan band between env·(1 − V) and env·(1 + V) whose thickness is the fringe contrast;
             once the marker is read, the same hits are copied into two rows, one for each reading
     circle  the two unit marker states as arrows: r_L lies along the horizontal axis, r_R is turned by α; the cyan
             shadow of r_R on r_L is V = cos α, its magenta height is D = sin α, and the point (V, D) stays on the
             quarter circle; a mixed marker with pure-state weight λ puts the point at (cos α, λ·sin α), so that
             D² + V² = 1 − (1 − λ²)·sin²α: inside the circle for α > 0, on it at α = 0
   Model: the marker is a real 2-vector; r_R = R(α) r_L. A mixed marker is the state λ|e₀⟩⟨e₀| + (1 − λ)·I/2 put
   through the same two turns, i.e. e₀ with weight (1 + λ)/2 and e₁ with weight (1 − λ)/2. λ is the weight of the pure
   part, not the purity: Tr ρ² = (1 + λ²)/2. (The control keeps the id "purity" for compatibility.) Reading the marker in the
   orthonormal pair (m₁, m₂) gives P(x, m) = Σ w·½·env(x)·(a² + b² + 2ab·cos kx) with a = ⟨m, r_L⟩, b = ⟨m, r_R⟩.
   The rail is the number of hits. Read-only probe for the browser suite: window.SLIT_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const DEG = Math.PI / 180, NMAX = 1600, K = 8 * Math.PI, SIG = 0.45, GRID = 1201;
  const env = (x) => Math.exp(-x * x / (2 * SIG * SIG));
  const S = { alpha: 60, lambda: 1, reader: 'none', hold: false, split: 0 };

  /* ---------- the law on the screen ---------- */
  const XS = Array.from({ length: GRID }, (_, i) => -1 + 2 * i / (GRID - 1));
  // E0 = ∫env, E1 = ∫env·cos kx, E2 = ∫env·cos² kx over the screen (Simpson): the contrast is solved back from ⟨cos kx⟩
  const simpson = (f) => { let s = 0; const h = 2 / (GRID - 1); for (let i = 0; i < GRID; i++) s += (i === 0 || i === GRID - 1 ? 1 : i % 2 ? 4 : 2) * f(XS[i]); return s * h / 3; };
  const E0 = simpson(env), E1 = simpson((x) => env(x) * Math.cos(K * x)), E2 = simpson((x) => env(x) * Math.cos(K * x) ** 2);
  const contrast = () => Math.cos(S.alpha * DEG);                       // V = |⟨r_L, r_R⟩| = cos α for α in [0°, 90°]
  const disting = () => S.lambda * Math.sin(S.alpha * DEG);             // D = ½‖ρ_L − ρ_R‖₁ = λ·sin α
  const total = (x) => env(x) * (1 + contrast() * Math.cos(K * x));
  /** The two reading directions (angles of m₁, m₂ in the marker plane) for the current reader. */
  const basis = () => { const h = S.alpha * DEG / 2; return S.reader === 'path' ? [h - Math.PI / 4, h + Math.PI / 4] : [h, h + Math.PI / 2]; };
  const INITS = () => [[0, (1 + S.lambda) / 2], [Math.PI / 2, (1 - S.lambda) / 2]];
  function joint(x, m) {
    let s = 0;
    for (const [th, w] of INITS()) { if (!w) continue; const a = Math.cos(m - th), b = Math.cos(m - th - S.alpha * DEG); s += w * 0.5 * (a * a + b * b + 2 * a * b * Math.cos(K * x)); }
    return env(x) * s;
  }
  const FMAX = 2;                                                     // the law never exceeds 2·env(0) = 2: one scale for every band

  /* ---------- the hits: fixed random numbers, positions by the inverse distribution ---------- */
  const rng = TRV.mulberry32(20261111);
  const U = new Float64Array(NMAX), W = new Float64Array(NMAX), Y = new Float64Array(NMAX);
  for (let i = 0; i < NMAX; i++) { U[i] = rng(); W[i] = rng(); Y[i] = rng(); }
  let xsKey = null, HX = new Float64Array(NMAX), rowKey = null, ROW = new Uint8Array(NMAX);
  function hitsX() {
    const key = contrast().toFixed(12);
    if (key === xsKey) return HX;
    const cdf = new Float64Array(GRID); let acc = 0;
    for (let i = 1; i < GRID; i++) { acc += (total(XS[i - 1]) + total(XS[i])) / 2; cdf[i] = acc; }
    for (let i = 0; i < NMAX; i++) {
      const u = U[i] * acc; let lo = 0, hi = GRID - 1;
      while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (cdf[mid] < u) lo = mid; else hi = mid; }
      const f = cdf[hi] > cdf[lo] ? (u - cdf[lo]) / (cdf[hi] - cdf[lo]) : 0;
      HX[i] = XS[lo] + f * (XS[hi] - XS[lo]);
    }
    xsKey = key; rowKey = null;
    return HX;
  }
  /** Row of each hit once the marker is read: 0 for m₁, 1 for m₂, drawn from P(m₁ | x). */
  function hitsRow() {
    const X = hitsX(), key = [S.alpha.toFixed(9), S.lambda.toFixed(9), S.reader].join();
    if (key === rowKey) return ROW;
    const [m1] = basis();
    for (let i = 0; i < NMAX; i++) ROW[i] = W[i] < joint(X[i], m1) / total(X[i]) ? 0 : 1;
    rowKey = key;
    return ROW;
  }
  const shown = () => Math.floor(clock.t + 1e-9);
  /** The contrast solved back from the mean of cos kx over the first n hits: ⟨cos⟩ = (E1 + V·E2)/(E0 + V·E1). */
  function counted(n) {
    if (n < 1) return null;
    const X = hitsX(); let m = 0; for (let i = 0; i < n; i++) m += Math.cos(K * X[i]); m /= n;
    return (m * E0 - E1) / (E2 - m * E1);
  }

  /* ---------- drawing ---------- */
  const face = (f) => (f === 'body' ? TRV.fonts.body : TRV.fonts.data);
  function text(ctx, str, x, y, color, o) {
    o = o || {};
    ctx.font = `${o.weight ? o.weight + ' ' : ''}${o.size || 11.5}px ${face(o.face)}`; ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'middle';
    ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.strokeStyle = P.stage; ctx.strokeText(str, x, y);
    ctx.fillStyle = color; ctx.fillText(str, x, y);
  }
  const box = { top: 70, bottom: 44 };
  let circleView = null, circleRect = null;
  const thick = () => (TRV.thumbMode ? 2 : 1);

  function band(ctx, r, o) {
    ctx.strokeStyle = P.panelEdge; ctx.lineWidth = 1; ctx.globalAlpha = 0.9; ctx.strokeRect(r.x + 0.5, r.y + 0.5, r.w - 1, r.h - 1); ctx.globalAlpha = 1;
    const px = (x) => r.x + (x + 1) / 2 * r.w, py = (f) => r.y + r.h - 2 - f / FMAX * (r.h - 16);
    if (o.fringeBand) {
      const V = contrast(); ctx.beginPath();
      for (let i = 0; i <= 240; i++) { const x = -1 + i / 120; const p = [px(x), py(env(x) * (1 + V))]; i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }
      for (let i = 240; i >= 0; i--) { const x = -1 + i / 120; ctx.lineTo(px(x), py(env(x) * (1 - V))); }
      ctx.closePath(); ctx.fillStyle = TRV.alpha(P.cyan, TRV.thumbMode ? 0.22 : 0.16); ctx.fill();
    }
    ctx.fillStyle = o.dot; ctx.globalAlpha = o.dotAlpha;
    const rad = TRV.thumbMode ? 2.6 : r.h < 90 ? 1.25 : 1.5;
    for (const i of o.hits) { ctx.beginPath(); ctx.arc(px(HX[i]), r.y + 4 + Y[i] * (r.h - 8), rad, 0, kit.TAU); ctx.fill(); }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = o.line; ctx.lineWidth = 2 * thick(); ctx.shadowColor = o.line; ctx.shadowBlur = 8; ctx.beginPath();
    for (let i = 0; i <= 400; i++) { const x = -1 + i / 200, p = [px(x), py(o.f(x))]; i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }
    ctx.stroke(); ctx.shadowBlur = 0;
    if (o.label && !TRV.thumbMode) text(ctx, o.label, r.x + 8, r.y + 11, o.labelColor || P.ink, { size: 11.5, face: 'body' });
  }

  function arrow(ctx, g, x0, y0, x1, y1, color, w, glow) {
    const a = [g.X(x0), g.Y(y0)], b = [g.X(x1), g.Y(y1)], dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy);
    ctx.strokeStyle = ctx.fillStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round';
    if (glow) { ctx.shadowColor = color; ctx.shadowBlur = glow; }
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
    if (len > 8) { const h = Math.min(12 * thick(), len * 0.5), ux = dx / len, uy = dy / len; ctx.beginPath(); ctx.moveTo(b[0], b[1]); ctx.lineTo(b[0] - ux * h - uy * h * 0.42, b[1] - uy * h + ux * h * 0.42); ctx.lineTo(b[0] - ux * h + uy * h * 0.42, b[1] - uy * h - ux * h * 0.42); ctx.closePath(); ctx.fill(); }
    ctx.shadowBlur = 0;
  }

  function drawCircle(rect) {
    const g = kit.plot($('cv'), { x: [-0.1, 1.24], y: [-0.14, 1.16], pad: [rect.x, rect.W - rect.x - rect.w, rect.y, rect.H - rect.y - rect.h], equal: true, clear: false });
    circleView = g; circleRect = rect;
    const ctx = g.ctx, a = S.alpha * DEG, c = Math.cos(a), s = Math.sin(a), V = contrast(), D = disting(), words = !TRV.thumbMode, tk = thick();
    g.line([[0, 0], [1.14, 0]], P.faint, { width: 1 }); g.line([[0, 0], [0, 1.1]], P.faint, { width: 1 });
    const arc = []; for (let i = 0; i <= 90; i++) arc.push([Math.cos(i * DEG), Math.sin(i * DEG)]);
    g.line(arc, P.ink, { width: 1.6 * tk, alpha: 0.6 });
    if (S.lambda < 1) { const inner = []; for (let i = 0; i <= 90; i++) inner.push([Math.cos(i * DEG), S.lambda * Math.sin(i * DEG)]); g.line(inner, P.magenta, { width: 1.3 * tk, alpha: 0.6, dash: [4, 4] }); }
    if (S.lambda >= 1 && s > 1e-6) g.poly([[0, 0], [1, 0], [c, s]], P.magenta, { alpha: 0.12 });
    arrow(ctx, g, 0, 0, 1, 0, P.ink, 2 * tk);
    g.line([[0, 0], [V, 0]], P.cyan, { width: 5.5 * tk, glow: 10 });
    if (S.lambda < 1 && s > 1e-6) g.line([[c, D], [c, s]], P.magenta, { width: 1.4 * tk, alpha: 0.7, dash: [2, 4] });
    arrow(ctx, g, 0, 0, c, s, P.amber, 2.6 * tk, 10);
    if (D > 1e-6) g.line([[c, 0], [c, Math.max(0, D - (s - D < 0.05 ? 0.07 : 0))]], P.magenta, { width: 3.6 * tk });   // drawn over the arrow: at α = 90° they coincide; the amber head stays visible
    g.dot(V, D, P.amber, 6.5 * (TRV.thumbMode ? 1.5 : 1), { glow: 14 });
    if (!words) return;
    const lab = (x, y, str, col, al, dx, dy) => text(ctx, str, g.X(x) + (dx || 0), g.Y(y) + (dy || 0), col, { align: al || 'center', size: 12 });
    // r with a true subscript (L or R), not an underscore
    const labR = (x, y, sub, col, dx, dy) => {
      const X = g.X(x) + dx, Y = g.Y(y) + dy;
      text(ctx, 'r', X, Y, col, { size: 13 });
      const w = ctx.measureText('r').width;
      text(ctx, sub, X + w + 0.5, Y + 4, col, { size: 9.5 });
    };
    labR(1, 0, 'L', P.ink, 4, -12);
    if (s < 0.15) labR(c, s, 'R', P.amber, 4, -30);                 // near α = 0 the two labels would sit on each other: stack r_R above r_L
    else labR(c, s, 'R', P.amber, 10, -10);
    lab(V / 2, 0, `V = ${fix(V, 2)}`, P.cyan, 'center', 0, 16);
    if (D > 0.04) lab(c, D / 2, `D = ${fix(D, 2)}`, P.magenta, c > 0.82 ? 'right' : 'left', c > 0.82 ? -10 : 10, 0);
    else lab(c, 0, `D = ${fix(D, 2)}`, P.magenta, 'right', -6, -14);
    // strictly inside only when the mixed marker has recorded something (λ < 1 and α > 0); at α = 0 it stays on the circle
    const gap = (1 - S.lambda * S.lambda) * s * s, sumTxt = gap <= 1e-12 ? 'D² + V² = 1' : fix(D * D + V * V, 2) === '1.00' ? 'D² + V² < 1' : `D² + V² = ${fix(D * D + V * V, 2)} < 1`;
    text(ctx, sumTxt, Math.min(g.X(1.2), rect.x + rect.w - 4), g.Y(-0.1), P.ink, { align: 'right', size: 12 });
  }

  function drawStage() {
    const sr = $('stage').getBoundingClientRect(), below = (el) => el.getBoundingClientRect().bottom - sr.top;
    box.top = TRV.thumbMode ? 24 : Math.max(46, below($('hudSub'))) + 10; box.bottom = TRV.thumbMode ? 24 : Math.max(18, $('legend').offsetHeight + 20);
    const g0 = kit.plot($('cv'), { x: [0, 1], y: [0, 1], pad: [0, 0, 0, 0] }), ctx = g0.ctx, Wd = g0.W, Ht = g0.H;
    const x0 = 16, y0 = box.top, w = Wd - 32, h = Math.max(60, Ht - box.top - box.bottom), wide = w >= 560;
    const scr = wide ? { x: x0, y: y0, w: w * 0.6, h } : { x: x0, y: y0, w, h: h * 0.56 };
    const cir = wide ? { x: x0 + w * 0.6 + 14, y: y0, w: w * 0.4 - 14, h } : { x: x0, y: y0 + h * 0.56 + 10, w, h: h * 0.44 - 10 };
    // the screen: all hits on top; when the marker has been read, the same hits copied into two rows below
    const n = shown(), X = hitsX(), sp = S.split, gap = 10;
    const topH = sp > 0 ? scr.h - sp * (scr.h * 0.62) : scr.h;
    const top = { x: scr.x, y: scr.y, w: scr.w, h: topH };
    const all = []; for (let i = 0; i < n; i++) all.push(i);
    band(ctx, top, { hits: all, f: total, dot: P.ink, dotAlpha: TRV.thumbMode ? 0.75 : 0.55, line: P.ink, fringeBand: true, label: L(`全部落点 ${n}`, `all hits ${n}`) });
    if (sp > 0 && S.reader !== 'none') {
      const R = hitsRow(), [m1, m2] = basis(), col = S.reader === 'path' ? P.magenta : P.cyan;
      const rh = (scr.h - topH - 2 * gap * sp) / 2, rows = [{ x: scr.x, y: scr.y + topH + gap * sp, w: scr.w, h: rh }, { x: scr.x, y: scr.y + topH + gap * sp + rh + gap * sp, w: scr.w, h: rh }];
      const names = S.reader === 'path' ? [L('读作“左缝”', 'read as “left”'), L('读作“右缝”', 'read as “right”')] : [L('读作 +', 'read as +'), L('读作 −', 'read as −')];
      if (sp >= 1) {
        rows.forEach((r, k) => {
          const hs = all.filter((i) => R[i] === k), mm = k ? m2 : m1;
          band(ctx, r, { hits: hs, f: (x) => joint(x, mm), dot: col, dotAlpha: TRV.thumbMode ? 0.85 : 0.7, line: col, label: `${names[k]} ${hs.length}`, labelColor: col });
        });
      } else {
        // the copies fly from the top plate to their rows
        ctx.fillStyle = col; ctx.globalAlpha = 0.7;
        for (const i of all) {
          const r = rows[R[i]], yA = top.y + 4 + Y[i] * (top.h - 8), yB = r.y + 4 + Y[i] * (r.h - 8);
          ctx.beginPath(); ctx.arc(scr.x + (X[i] + 1) / 2 * scr.w, yA + (yB - yA) * sp, 1.5, 0, kit.TAU); ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
    }
    drawCircle({ x: cir.x, y: cir.y, w: cir.w, h: cir.h, W: Wd, H: Ht });
  }

  function drawPlots() {
    if (TRV.still || TRV.figure) return;
    const A = kit.plot($('plotA'), { x: [0, 90], y: [0, 1.08], pad: [30, 12, 10, 20] });
    A.axes({ yTicks: [0, 0.5, 1], xTicks: [[0, '0°'], [30, '30°'], [60, '60°'], [90, '90°']] });
    const vs = [], ds = [], dp = []; for (let d = 0; d <= 90; d++) { vs.push([d, Math.cos(d * DEG)]); ds.push([d, S.lambda * Math.sin(d * DEG)]); dp.push([d, Math.sin(d * DEG)]); }
    if (S.lambda < 1) A.line(dp, P.magenta, { width: 1, alpha: 0.5, dash: [3, 3] });
    A.line(vs, P.cyan, { width: 2 }); A.line(ds, P.magenta, { width: 2 }); A.vline(S.alpha, P.amber, { alpha: 0.8 });
    A.dot(S.alpha, contrast(), P.cyan, 4); A.dot(S.alpha, disting(), P.magenta, 4);
    A.legend([[P.cyan, L('对比度 V = cos α', 'contrast V = cos α')], [P.magenta, L('可辨度 D', 'distinguishability D')]]);
    $('pAMeta').textContent = `α = ${fix(S.alpha, 0)}°`;
    const B = kit.plot($('plotB'), { x: [0, NMAX], y: [-0.1, 1.1], pad: [30, 12, 10, 20] }), n = shown();
    B.axes({ yTicks: [0, 0.5, 1], xTicks: [0, 400, 800, 1200, 1600] });
    B.hline(contrast(), P.cyan, { dash: [4, 3], alpha: 0.7 });
    const X = hitsX(), pts = []; let m = 0;
    for (let i = 0; i < n; i++) { m += Math.cos(K * X[i]); if ((i + 1) % 10 === 0 || i === n - 1) { const mm = m / (i + 1); if (i >= 19) pts.push([i + 1, (mm * E0 - E1) / (E2 - mm * E1)]); } }
    B.line(pts, P.cyan, { width: 1.8 }); B.vline(Math.max(n, 0.5), P.amber, { alpha: 0.8 });
    const v = counted(n); $('pBMeta').textContent = v == null ? '—' : L(`${n} 个落点：${fix(v, 2)}`, `${n} hits: ${fix(v, 2)}`);
  }

  const LEG = {
    none: [['cy box', '条纹对比度 V（影子与带宽）', 'fringe contrast V (shadow, band)'], ['mg', '路径可辨度 D（高）', 'path distinguishability D (height)'], ['am', '<bdi>当前的标记 r<sub>R</sub></bdi>', '<bdi>the current marker r<sub>R</sub></bdi>']],
    path: [['cy box', '条纹对比度 V', 'fringe contrast V'], ['mg', '按路径读出的两行与 D', 'rows read for the path, and D'], ['am', '<bdi>当前的标记 r<sub>R</sub></bdi>', '<bdi>the current marker r<sub>R</sub></bdi>']],
    erase: [['cy', '擦除后分拣的两行与 V', 'rows read to erase, and V'], ['mg', '路径可辨度 D', 'path distinguishability D'], ['am', '<bdi>当前的标记 r<sub>R</sub></bdi>', '<bdi>the current marker r<sub>R</sub></bdi>']]
  };
  function drawText() {
    const V = contrast(), D = disting(), sum = V * V + D * D, n = shown(), pure = S.lambda >= 1;
    $('hudBig').textContent = `α = ${fix(S.alpha, 0)}° · V = ${fix(V, 2)} · D = ${fix(D, 2)}`;
    const how = S.reader === 'none' ? L('标记没读', 'marker not read') : S.hold ? L('落点先到，标记稍后再读', 'hits first; the marker is read afterwards') : S.reader === 'path' ? L('按路径读了标记', 'marker read for the path') : L('按擦除方向读了标记', 'marker read to erase');
    $('hudSub').textContent = L(`屏上 ${n} 个落点 · ${how}`, `${n} hits on the screen · ${how}`);
    $('roSum').innerHTML = `<span class="c-mg">${fix(D * D, 3)}</span> + <span class="c-cy">${fix(V * V, 3)}</span> = ${fix(sum, 3)}`;
    $('roSumSub').textContent = pure ? L('纯态标记：无论 α 是多少都等于 1', 'pure marker: 1 whatever α is')
      : sum < 1 - 1e-12 ? L('混合标记、α > 0：小于 1，点在圆内', 'mixed marker, α > 0: below 1, the point is inside the circle')
        : L('混合标记、α = 0：标记什么也没记下，仍等于 1，点在圆上', 'mixed marker, α = 0: nothing is recorded, still 1, the point is on the circle');
    $('roV').textContent = fix(V, 3); $('roD').textContent = fix(D, 3); $('roA').textContent = `${fix(S.alpha, 0)}°`; $('roL').textContent = `${fix(S.lambda, 2)} · ${fix((1 + S.lambda * S.lambda) / 2, 3)}`;
    $('roM').textContent = `${fix(V * V / 2, 3)} = V²/2`;
    $('roNote').textContent = V > 0.995 ? L('两支箭头重合：标记什么也没记下，条纹满对比度。', 'The arrows coincide: the marker has recorded nothing, and the fringes have full contrast.')
      : V < 0.005 && pure ? L('两支箭头垂直：路径完全写进了标记，条纹消失。', 'The arrows are square: the path is fully written into the marker, and the fringes are gone.')
        : pure ? L(`影子 ${fix(V, 2)}，高 ${fix(D, 2)}：一个变长，另一个就变短。`, `Shadow ${fix(V, 2)}, height ${fix(D, 2)}: as one grows, the other shrinks.`)
          : L(`标记带噪声：对比度仍是 ${fix(V, 2)}，能读出的可辨度只有 ${fix(D, 2)}。`, `A noisy marker: the contrast is still ${fix(V, 2)}, but only ${fix(D, 2)} of distinguishability can be read.`);
    $('pillAngle').querySelector('strong').textContent = `${fix(S.alpha, 0)}°`;
    $('pillVD').querySelector('strong').textContent = `V ${fix(V, 2)} · D ${fix(D, 2)}`;
    $('pillSum').querySelector('strong').textContent = fix(sum, 3);
    const leg = LEG[S.reader === 'none' || S.split <= 0 ? 'none' : S.reader].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== leg) { $('legend').innerHTML = leg; $('legend')._h = leg; }
  }
  const paint = kit.painter(() => { drawText(); drawStage(); drawPlots(); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- controls ---------- */
  let splitTween = null;
  function splitTo(target, ms) {
    if (splitTween) splitTween.cancel();
    const from = S.split;
    if (from === target) { paint(); return; }
    splitTween = kit.tween(TRV.still ? 0 : ms == null ? 700 : ms, (e) => { S.split = from + (target - from) * e; paint(); }, () => { splitTween = null; });
  }
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: NMAX, t: NMAX, rate: 400, step: 100, rangeStep: '1',
    format: (t, max) => `${L('落点 ', 'HITS ')}${Math.floor(t + 1e-9)} <small>/ ${max}</small>`,
    onChange: (t) => { if (S.hold && t >= NMAX - 1e-9) { S.hold = false; splitTo(1); } paint(); }
  });
  const leave = () => cards.mark(null);
  let angTween = null;
  function setAlpha(v, quiet) { if (angTween) { angTween.cancel(); angTween = null; } S.alpha = clamp(v, 0, 90); fA.set(Math.round(S.alpha)); if (!quiet) leave(); paint(); }
  const fA = kit.field($('alpha'), { fmt: (v) => `${v}°`, onInput: (v) => setAlpha(v) });
  const fL = kit.field($('purity'), { fmt: (v) => fix(v, 2), onInput: (v) => { S.lambda = v; leave(); paint(); } });
  function setReader(v, late) {
    S.reader = v; readerChips.set(v, true);
    S.hold = !!late && v !== 'none';
    if (S.hold) { if (splitTween) splitTween.cancel(); S.split = 0; paint(); } else splitTo(v === 'none' ? 0 : 1);
  }
  const readerChips = kit.chips($('readerChips'), 'reader', (v) => { leave(); setReader(v); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });

  // drag the amber arrow round the quarter circle
  let dragging = false;
  const inCircle = (ev) => { if (!circleRect) return false; const b = $('cv').getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top; return x >= circleRect.x - 10 && x <= circleRect.x + circleRect.w + 10 && y >= circleRect.y - 10 && y <= circleRect.y + circleRect.h + 10; };
  const toAlpha = (ev) => { const b = $('cv').getBoundingClientRect(), x = circleView.invX(ev.clientX - b.left), y = circleView.invY(ev.clientY - b.top); return clamp(Math.atan2(Math.max(y, 0), Math.max(x, 0)) / DEG, 0, 90); };
  $('cv').addEventListener('pointerdown', (ev) => { if (!inCircle(ev)) return; dragging = true; try { $('cv').setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events */ } setAlpha(toAlpha(ev)); });
  $('cv').addEventListener('pointermove', (ev) => { if (dragging) setAlpha(toAlpha(ev)); else $('cv').style.cursor = inCircle(ev) ? 'grab' : 'default'; });
  for (const type of ['pointerup', 'pointercancel']) $('cv').addEventListener(type, () => { dragging = false; });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    wave: { alpha: 0, lambda: 1, reader: 'none' },
    partial: { alpha: 60, lambda: 1, reader: 'none' },
    which: { alpha: 90, lambda: 1, reader: 'none' },
    delayed: { alpha: 90, lambda: 1, reader: 'path', late: true },
    erase: { alpha: 90, lambda: 1, reader: 'erase', late: true },
    mixed: { alpha: 60, lambda: 0.5, reader: 'none' }
  };
  const NOTES = {
    wave: ['α = 0°：两支箭头重合，影子是整条半径，高为零。落点一个个堆出满对比度的条纹：暗纹处几乎没有落点。', 'α = 0°: the two arrows coincide, the shadow is the whole radius and the height is zero. The hits pile up into fringes of full contrast: almost none land in the dark fringes.'],
    partial: ['α = 60°：青色的影子 V = 0.5，品红的高 D = 0.87，点仍在圆上。条纹还在，只是暗纹不再全黑，青色的带子变窄了一半。', 'α = 60°: the cyan shadow is V = 0.5, the magenta height D = 0.87, and the point is still on the circle. The fringes remain, but the dark ones are no longer black and the cyan band is half as thick.'],
    which: ['α = 90°：两支箭头垂直，影子缩成零，点停在圆顶。落点堆成一个平滑的鼓包，没有条纹。', 'α = 90°: the arrows are square, the shadow shrinks to nothing and the point sits at the top of the circle. The hits pile up into a smooth hump without fringes.'],
    delayed: ['α = 90°。落点先到齐，然后才按路径读标记：同一批落点按读数分成两行，“左缝”一行与“右缝”一行加起来正好是全部落点，都是没有条纹的品红鼓包。', 'α = 90°. All hits arrive first, and only then is the marker read for the path: the same hits are split into two rows that add up to all of them, and both the “left” row and the “right” row are magenta humps without fringes.'],
    erase: ['同样 α = 90°、同一批落点，这回按擦除方向读标记，分出的两行都画成青色：“读作 +”一行是条纹，“读作 −”一行是错开半格的反条纹，两行合起来仍是上面那个鼓包。', 'Again α = 90° and the same hits, but this time the marker is read to erase, and both rows are drawn in cyan: the “read as +” row shows fringes, the “read as −” row anti-fringes shifted by half a period, and together they are still the hump above.'],
    mixed: ['标记本身带噪声（纯态权重 λ = 0.5，纯度 Tr ρ² = 0.625）：对比度仍是 V = 0.5，能读出的可辨度只剩 D = 0.43，点落进圆内，沿品红的虚弧走：D² + V² = 0.44 < 1。', 'A noisy marker (pure-state weight λ = 0.5, purity Tr ρ² = 0.625): the contrast is still V = 0.5, but only D = 0.43 of distinguishability can be read; the point falls inside the circle and moves along the dashed magenta arc: D² + V² = 0.44 < 1.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause();
    if (angTween) angTween.cancel();
    const a0 = S.alpha, l0 = S.lambda;
    angTween = kit.tween(TRV.still || booting ? 0 : 650, (e) => { S.alpha = a0 + (p.alpha - a0) * e; S.lambda = l0 + (p.lambda - l0) * e; fA.set(Math.round(S.alpha)); fL.set(+S.lambda.toFixed(2)); paint(); }, () => { angTween = null; });
    const settled = TRV.still || (booting && !TRV.embed);
    if (settled) {
      // a still and the opening view of the full page show the telling frame: every hit in, the marker already read
      setReader(p.reader, false); if (splitTween) splitTween.cancel(); S.split = p.reader === 'none' ? 0 : 1; clock.set(NMAX);
      return;
    }
    setReader(p.reader, p.late);
    clock.set(0);
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：在圆上拖琥珀色的箭头，调标记的纯态权重 λ，换一种读法，或拖动时间轴。随时可以再选一张卡。', 'Free play: drag the amber arrow on the circle, change the marker\'s pure-state weight λ, read it another way, or scrub the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  window.SLIT_DEBUG = {
    get state() {
      const V = contrast(), D = disting(), n = shown();
      return { alpha: S.alpha, lambda: S.lambda, reader: S.reader, hold: S.hold, split: S.split, t: clock.t, n, max: clock.max, playing: clock.playing, preset: cards.current,
        V, D, sum: V * V + D * D, mass: V * V / 2, counted: counted(n), basis: basis() };
    },
    /** The hits on the screen now: positions, and the row each one is sorted into (null while the marker is unread). */
    hits() { const X = hitsX(), n = shown(), R = S.reader === 'none' ? null : hitsRow(); return Array.from({ length: n }, (_, i) => ({ x: X[i], row: R ? R[i] : null })); },
    /** The curves the stage draws, sampled at xs: the whole screen and, once the marker is read, its two rows. */
    curves(xs) { const [m1, m2] = basis(); return { total: xs.map(total), rows: S.reader === 'none' ? null : [xs.map((x) => joint(x, m1)), xs.map((x) => joint(x, m2))] }; },
    seek: (t) => { clock.pause(); clock.set(t); },
    /** Viewport coordinates of the point at angle `deg` on the quarter circle (for pointer tests). */
    at: (deg) => { const b = $('cv').getBoundingClientRect(); return [b.left + circleView.X(Math.cos(deg * DEG)), b.top + circleView.Y(Math.sin(deg * DEG))]; }
  };
  window.TRV_THUMB = () => { clock.pause(); S.alpha = 90; S.lambda = 1; setReader('erase'); if (splitTween) splitTween.cancel(); S.split = 1; clock.set(NMAX); paint.now(); };
  cards.pick(cards.initial('partial'));
  booting = false;
  paint();
})();
