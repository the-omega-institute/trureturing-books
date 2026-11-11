/* EQUATOR//CROWD · 赤道集中 · Concentration at the equator
   Uniform points on the real unit sphere S^{d−1} ⊂ ℝ^d, seen through one coordinate x₁ (the measured axis).
     left    the section of the sphere through the measured axis: every random point sits on the circle at its height
             x₁, on a random side; the equator belt |x₁| < ε is shaded, points inside it cyan, outside magenta
     right   the distribution of x₁ drawn sideways on the same vertical axis: the exact density
             ∝ (1 − x²)^{(d−3)/2} and the histogram of the points
   The rail is the dimension: d = 2ⁿ with n from 1 to 20 (d = 3 at n = log₂ 3).
   Exact shares come from the regularized incomplete beta function in logarithms: x₁² ~ Beta(1/2, (d − 1)/2).
   Read-only probe for the browser suite: window.EQUATOR_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const TH = TRV.thumbMode ? 2 : 1;          // thicker strokes on the wordless cover
  const NPTS = 1500, NMAX = 20;
  const YC = [-1.16, 1.16];                  // the shared vertical x₁ scale

  /* ---------- special functions ---------- */
  const LG = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  function lgamma(x) {
    if (x < 0.5) return Math.log(Math.PI / Math.abs(Math.sin(Math.PI * x))) - lgamma(1 - x);
    x -= 1; let a = LG[0]; const t = x + 7.5;
    for (let i = 1; i < 9; i++) a += LG[i] / (x + i);
    return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
  }
  /** Continued fraction of the incomplete beta function (modified Lentz). */
  function betacf(a, b, x) {
    const TINY = 1e-300, qab = a + b, qap = a + 1, qam = a - 1;
    let c = 1, d = 1 - qab * x / qap; if (Math.abs(d) < TINY) d = TINY; d = 1 / d; let h = d;
    for (let m = 1; m <= 2000; m++) {
      const m2 = 2 * m; let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
      d = 1 + aa * d; if (Math.abs(d) < TINY) d = TINY; c = 1 + aa / c; if (Math.abs(c) < TINY) c = TINY; d = 1 / d; h *= d * c;
      aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
      d = 1 + aa * d; if (Math.abs(d) < TINY) d = TINY; c = 1 + aa / c; if (Math.abs(c) < TINY) c = TINY; d = 1 / d;
      const del = d * c; h *= del; if (Math.abs(del - 1) < 1e-15) break;
    }
    return h;
  }
  /** ln I_x(a, b), the regularized incomplete beta function, without underflow. */
  function lnBetaI(a, b, x) {
    if (x <= 0) return -Infinity;
    if (x >= 1) return 0;
    const lnBt = lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log1p(-x);
    if (x < (a + 1) / (a + b + 2)) return lnBt + Math.log(betacf(a, b, x) / a);
    return Math.log1p(-Math.exp(lnBt) * betacf(b, a, 1 - x) / b);
  }

  /* ---------- the distribution of x₁ on S^{d−1} ---------- */
  const dOf = (t) => Math.max(2, Math.round(Math.pow(2, t)));
  const lnC = (d) => lgamma(d / 2) - 0.5 * Math.log(Math.PI) - lgamma((d - 1) / 2);
  const density = (d, x) => (Math.abs(x) >= 1 ? (d === 3 ? 0.5 : d > 3 ? 0 : Infinity) : Math.exp(lnC(d) + (d - 3) / 2 * Math.log1p(-x * x)));
  /** ln Pr(|x₁| ≥ ε) = ln I_{1−ε²}((d − 1)/2, 1/2). */
  const lnOut = (d, e) => lnBetaI((d - 1) / 2, 0.5, 1 - e * e);
  /** |x₁| at the quantile u of its distribution: bisection on ln x₁² for I_y(1/2, (d − 1)/2) = u. */
  function quantile(d, u) {
    const b = (d - 1) / 2, lu = Math.log(u);
    let lo = -1400, hi = 0;
    for (let i = 0; i < 64; i++) { const mid = (lo + hi) / 2; if (lnBetaI(0.5, b, Math.exp(mid)) < lu) lo = mid; else hi = mid; }
    return Math.sqrt(Math.exp((lo + hi) / 2));
  }

  /* ---------- state and samples ---------- */
  const S = { t: 4, eps: 0.1, seed: 1 };
  let UNI = null;
  function mulberry32(a) { return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function draw() {
    const r = mulberry32(0xe9a7 + 104729 * S.seed);
    UNI = Array.from({ length: NPTS }, () => ({ u: Math.min(1 - 1e-12, Math.max(1e-12, r())), sign: r() < 0.5 ? -1 : 1, side: r() < 0.5 ? -1 : 1, jit: r() }));
  }
  draw();
  let SM = null, smKey = '';
  function samples() {
    const d = dOf(S.t), key = d + '|' + S.seed;
    if (key === smKey) return SM;
    SM = { d, x: UNI.map((p) => p.sign * quantile(d, p.u)) };
    smKey = key;
    return SM;
  }
  function facts() {
    const d = dOf(S.t), e = S.eps, lo = lnOut(d, e), sm = samples();
    const outN = sm.x.filter((x) => Math.abs(x) >= e).length;
    return { d, n: Math.log2(d), eps: e, lnOut: lo, out: Math.exp(lo), log10Out: lo / Math.LN10, inside: -Math.expm1(lo), bound: 1 / (d * e * e),
      width: 1 / Math.sqrt(d), meanSq: sm.x.reduce((a, x) => a + x * x, 0) / NPTS, sampleOut: outN / NPTS, outN };
  }
  const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻', '−': '⁻' };
  /** A share, as a decimal or as m × 10^k when it is small. */
  function share(lnp) {
    if (lnp > Math.log(1e-3)) return fix(Math.exp(lnp), 4);
    const l10 = lnp / Math.LN10, k = Math.floor(l10), m = Math.pow(10, l10 - k);
    return `${fix(m, 1)} × 10${String(k).split('').map((c) => SUP[c] || c).join('')}`;
  }
  const small = (v) => (v < 1e-3 ? share(Math.log(v)) : fix(v, 6));
  const dName = (d) => (d >= 4 && Number.isInteger(Math.log2(d)) ? `2${String(Math.log2(d)).split('').map((c) => SUP[c]).join('')} = ${d.toLocaleString('en-US')}` : String(d));

  /* ---------- layout: circle on the left, the density on the right (one x₁ scale) ---------- */
  let boxes = null;
  function layout(W, H) {
    const st = $('stage').getBoundingClientRect(), below = (el) => (el ? el.getBoundingClientRect().bottom - st.top : 0);
    const thumb = TRV.thumbMode;
    const top = thumb ? 30 : Math.max(46, below($('hudBig').parentElement)) + 8;
    const bottom = thumb ? 30 : Math.max(18, $('legend').offsetHeight + 18);
    const h = Math.max(140, H - top - bottom), side = W / h >= 1.3;
    if (side) { const cw = Math.min(h * 1.0, W * 0.48); return { side, c: { x: 10, y: top, w: cw, h }, p: { x: 10 + cw + 12, y: top, w: W - cw - 32, h } }; }
    const ch = h * 0.52;
    return { side, c: { x: 8, y: top, w: W - 16, h: ch }, p: { x: 8, y: top + ch + 8, w: W - 16, h: h - ch - 8 } };
  }
  const padOf = (bx, W, H, l, r, t, b) => [bx.x + l, W - bx.x - bx.w + r, bx.y + t, H - bx.y - bx.h + b];
  const tagAt = (key, g, x, y, html, cls, dx, dy) => stage.tag(key, [g.X(x), g.Y(y)], html, cls, { screen: true, dx: dx || 0, dy: dy || 0 });

  function drawCircle(W, H, F, sm) {
    const b = boxes.c, e = F.eps;
    const g = kit.plot($('cv'), { x: [-1.2, 1.2], y: YC, equal: true, pad: padOf(b, W, H, 4, 4, 4, 4), clear: false });
    g.rect(-1.2, -e, 1.2, e, P.cyan, { alpha: 0.1 });
    g.line([[-1.15, e], [1.15, e]], P.cyan, { width: TH, dash: [4, 4], alpha: 0.7 }); g.line([[-1.15, -e], [1.15, -e]], P.cyan, { width: TH, dash: [4, 4], alpha: 0.7 });
    const ring = []; for (let i = 0; i <= 180; i++) ring.push([Math.cos(i * 2 * Math.PI / 180), Math.sin(i * 2 * Math.PI / 180)]);
    g.line(ring, P.lineHot, { width: 1.3 * TH });
    g.line([[-1.15, 0], [1.15, 0]], P.faint, { width: TH });
    g.line([[0, YC[0] + 0.02], [0, YC[1] - 0.02]], P.cyan, { width: 1.3 * TH, alpha: 0.55 });
    const ctx = g.ctx, rr = 2.1 * TH;
    for (const inside of [false, true]) {
      ctx.fillStyle = inside ? P.cyan : P.magenta; ctx.globalAlpha = inside ? 0.7 : 0.8; ctx.beginPath();
      sm.x.forEach((x, i) => {
        if ((Math.abs(x) < e) !== inside) return;
        const p = UNI[i], r = 1 - 0.07 * p.jit, px = g.X(p.side * r * Math.sqrt(Math.max(0, 1 - x * x))), py = g.Y(r * x);
        ctx.moveTo(px + rr, py); ctx.arc(px, py, rr, 0, 2 * Math.PI);
      });
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (!TRV.thumbMode) {
      tagAt('axis', g, 0, YC[1] - 0.02, L('测量轴 x₁', 'measured axis x₁'), 'raw cy', 0, 4);
      tagAt('eq', g, 1.15, 0, L('赤道', 'equator'), 'tick', 0, -8);
      tagAt('band', g, -1.15, e, `ε = ${fix(e, 2)}`, 'raw cy', 30, -9);
    }
  }

  function drawDensity(W, H, F, sm) {
    const b = boxes.p, d = F.d, e = F.eps, c0 = Math.exp(lnC(d)), xmax = Math.max(0.8, (d === 2 ? 1.2 : c0) * 1.15);
    const g = kit.plot($('cv'), { x: [0, xmax], y: YC, pad: padOf(b, W, H, 30, 8, 4, 18), clear: false });
    const nice = (v) => { const p = Math.pow(10, Math.floor(Math.log10(v))), m = v / p; return (m >= 5 ? 5 : m >= 2 ? 2 : 1) * p; };
    const step = nice(xmax / 3), xt = []; for (let v = 0; v <= xmax + 1e-9; v += step) xt.push([v, v >= 10 ? String(Math.round(v)) : String(+v.toFixed(2))]);
    g.axes({ yTicks: TRV.thumbMode ? [] : [[-1, '−1'], [0, '0'], [1, '1']], xTicks: TRV.thumbMode ? [] : xt, xLabel: TRV.thumbMode ? '' : L('密度', 'density') });
    g.rect(0, -e, xmax, e, P.cyan, { alpha: 0.08 });
    // histogram of the points (fine bins around the bulk)
    const R = Math.min(1, 6 / Math.sqrt(d)), nb = 60, bw = 2 * R / nb, cnt = new Array(nb).fill(0);
    for (const x of sm.x) { const k = Math.floor((x + R) / bw); if (k >= 0 && k < nb) cnt[k]++; }
    cnt.forEach((n, k) => { if (!n) return; const y0 = -R + k * bw, hgt = n / (NPTS * bw); const ya = g.Y(y0), yb = g.Y(y0 + bw); g.ctx.globalAlpha = 0.5; g.ctx.fillStyle = P.dim; g.ctx.fillRect(g.X(0), Math.min(ya, yb) - 0.5, g.X(Math.min(hgt, xmax)) - g.X(0), Math.max(1, Math.abs(ya - yb) - 0.5)); g.ctx.globalAlpha = 1; });
    // the exact density, filled cyan inside the belt and magenta outside
    const K = 600, pts = [];
    for (let i = 0; i <= K; i++) {
      // dense sampling near the equator for large d
      const s = -1 + 2 * i / K, y = Math.sign(s) * Math.min(1, Math.pow(Math.abs(s), d > 64 ? 3 : 1));
      pts.push([Math.min(density(d, y), xmax), y]);
    }
    pts.sort((p, q) => p[1] - q[1]);
    const part = (lo, hi) => { const ps = pts.filter((p) => p[1] >= lo && p[1] <= hi); if (ps.length < 2) return null; return [[0, ps[0][1]], ...ps, [0, ps[ps.length - 1][1]]]; };
    const pin = part(-e, e), pu = part(e, 1), pd = part(-1, -e);
    if (pin) g.poly(pin, P.cyan, { alpha: 0.45 });
    for (const pp of [pu, pd]) if (pp) g.poly(pp, P.magenta, { alpha: 0.5 });
    g.line(pts.map((p) => [p[0], p[1]]), P.ink, { width: 1.6 * TH, alpha: 0.9 });
    // ±1/√d
    const w = F.width;
    for (const s of [-1, 1]) g.line([[0, s * w], [xmax * 0.06, s * w]], P.ink, { width: 2 * TH });
    if (!TRV.thumbMode) {
      tagAt('wd', g, xmax * 0.06, w, '±1/√d', 'num', 30, w > 0.12 ? 0 : -10);
      tagAt('cmp', g, xmax, YC[1] - 0.12, L(`带外 ${share(F.lnOut)} ≤ 界 ${F.bound < 1e-3 ? share(Math.log(F.bound)) : fix(F.bound, 4)}`, `outside ${share(F.lnOut)} ≤ bound ${F.bound < 1e-3 ? share(Math.log(F.bound)) : fix(F.bound, 4)}`), 'raw mg', -110, 0);
    }
  }

  const stage = kit.stage3($('stage'), { canvas: $('cv'), rotate: false });
  function drawStage() {
    const cv = $('cv'), W = cv.clientWidth, H = cv.clientHeight, F = facts(), sm = samples();
    boxes = layout(W, H);
    stage.begin();
    drawCircle(W, H, F, sm);
    drawDensity(W, H, F, sm);
    stage.end();
  }

  /* ---------- strip: width and outside share against d ---------- */
  function drawPlot() {
    const cv = $('plot'), e = S.eps, d0 = dOf(S.t);
    $('plotTitle').innerHTML = L('维数越高：带越窄，带外越空', 'Higher dimension: a narrower belt, an emptier outside');
    const g = kit.plot(cv, { x: [2, Math.pow(2, NMAX)], y: [1e-12, 1.5], logX: true, logY: true, pad: [36, 10, 8, 22] });
    g.axes({ yTicks: [[1e-12, '10⁻¹²'], [1e-8, '10⁻⁸'], [1e-4, '10⁻⁴'], [1, '1']], xTicks: [[2, '2'], [16, '2⁴'], [1024, '2¹⁰'], [32768, '2¹⁵'], [Math.pow(2, 20), '2²⁰']] });
    const wd = [], out = [], bd = [];
    for (let i = 0; i <= 190; i++) {
      const t = 1 + 19 * i / 190, d = dOf(t), lo = lnOut(d, e);
      wd.push([d, 1 / Math.sqrt(d)]); out.push([d, lo > Math.log(1e-12) ? Math.exp(lo) : null]); bd.push([d, Math.min(1, 1 / (d * e * e))]);
    }
    g.line(wd, P.cyan, { width: 1.8 });
    g.line(bd, P.magenta, { width: 1.4, dash: [5, 4] });
    g.line(out, P.magenta, { width: 2 });
    g.vline(d0, P.amber, { alpha: 0.85 });
    g.legend([[P.cyan, L('宽度 1/√d', 'width 1/√d')], [P.magenta, L('带外份额（精确）', 'outside share (exact)')], [P.magenta, L('马尔可夫上界 1/(dε²)', 'Markov bound 1/(dε²)'), 'dash']], { bottom: true, right: false });
    $('plotMeta').textContent = `ε = ${fix(e, 2)}`;
  }

  /* ---------- readouts, HUD, legend ---------- */
  const row = (cls, zh, en, val) => `<div class="${cls}"><dt>${L(zh, en)}</dt><dd>${val}</dd></div>`;
  function drawText() {
    const F = facts(), d = F.d;
    const qb = Number.isInteger(F.n) ? L(`${F.n} 个量子比特`, `${F.n} qubit${F.n === 1 ? '' : 's'}`) : L('普通球面', 'the ordinary sphere');
    $('hudBig').innerHTML = `d = ${dName(d)}`;
    $('hudSub').innerHTML = `${qb} · ${L('宽度', 'width')} 1/√d = ${fix(F.width, 4)} · <span class="c-mg">${L('带外', 'outside')} ${share(F.lnOut)}</span>`;
    const bound = F.bound < 1e-3 ? share(Math.log(F.bound)) : fix(F.bound, 4);
    $('ro').innerHTML = `<div class="key"><dt>${L(`带外份额 Pr(|x₁| ≥ ${fix(F.eps, 2)}) · 马尔可夫上界`, `outside share Pr(|x₁| ≥ ${fix(F.eps, 2)}) · Markov bound`)}</dt><dd><b>${share(F.lnOut)}</b> <small>≤ ${bound}</small></dd></div>`
      + row('', '维数 d', 'dimension d', d.toLocaleString('en-US'))
      + row('', 'E[x₁²] = 1/d · 样本均值', 'E[x₁²] = 1/d · sample mean', `${small(1 / d)} · ${small(F.meanSq)}`)
      + row('c', '带内份额（精确）', 'inside share (exact)', fix(F.inside, 6))
      + row('m', '带外的点（1500 个中）', 'points outside (of 1500)', String(F.outN))
      + row('', '宽度 1/√d', 'width 1/√d', fix(F.width, 5));
    $('roNote').textContent = F.bound >= 1 ? L('ε 太小、维数太低时马尔可夫上界大于 1，什么也没说。', 'With a small ε and a low dimension the Markov bound exceeds 1 and says nothing.')
      : L(`上界 1/(dε²) 只用到 E[x₁²] = 1/d，比实际份额大 ${F.lnOut > Math.log(1e-300) ? fix(F.bound / F.out, 1) : `10${String(Math.round(Math.log10(F.bound) - F.log10Out)).split('').map((c) => SUP[c] || c).join('')}`} 倍。`, `The bound 1/(dε²) uses only E[x₁²] = 1/d and is ${F.lnOut > Math.log(1e-300) ? fix(F.bound / F.out, 1) : `10${String(Math.round(Math.log10(F.bound) - F.log10Out)).split('').map((c) => SUP[c] || c).join('')}`} times the actual share.`);
    $('pillD').querySelector('strong').textContent = dName(d);
    $('pillOut').querySelector('strong').textContent = share(F.lnOut);
    $('legend').innerHTML = [['cy', '赤道带里的点；带内的密度', 'points in the equator belt; density inside'], ['mg', '带外的点；带外的密度', 'points outside; density outside'], ['dm', '精确密度；点的直方图', 'exact density; histogram of the points']]
      .map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
  }

  const paint = kit.painter(() => { drawText(); drawStage(); drawPlot(); }, [$('stage'), $('plot')]);

  /* ---------- the rail: n = log₂ d ---------- */
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: NMAX - 1, rate: 3, step: 1, t: S.t - 1,
    format: (t) => { const d = dOf(t + 1); return `d = ${d.toLocaleString('en-US')} <small>${Number.isInteger(Math.log2(d)) ? `n = ${Math.log2(d)}` : ''} / 2²⁰</small>`; },
    onChange: (t, c) => {
      if (stopAt != null && c.playing && t >= stopAt - 1e-9) { const s = stopAt; stopAt = null; c.pause(); c.set(s); return; }
      S.t = t + 1; paint();
    }
  });

  /* ---------- controls ---------- */
  const leave = () => cards.mark(null);
  const fEps = kit.field($('eps'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.eps = v; paint(); } });
  const redraw = () => { leave(); S.seed++; draw(); smKey = ''; paint(); };
  $('redraw').addEventListener('click', redraw);
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ r: redraw });

  /* ---------- experiment cards ---------- */
  const L3 = Math.log2(3);
  const PRESETS = {
    three: { t: L3, eps: 0.1 },
    four: { t: 4, eps: 0.1 },
    width: { t: 10, eps: 0.1 },
    bound: { t: 7, eps: 0.2 },
    twenty: { t: 20, eps: 0.1 }
  };
  const NOTES = {
    three: ['普通的三维球面，d = 3：圆上的点上下铺开，右边的密度是一条竖直的直线 1/2，直方图围着它起伏——点的高度 x₁ 在 −1 到 1 之间均匀分布。ε = 0.1 的赤道带里恰好是 10% 的点（青色），其余 90% 是品红。', 'The ordinary sphere, d = 3: the dots spread up and down the circle, and on the right the density is a vertical straight line at 1/2 with the histogram around it: the height x₁ is spread evenly between −1 and 1. The belt with ε = 0.1 holds exactly 10% of the points (cyan); the other 90% are magenta.'],
    four: ['四个量子比特，d = 16：点向赤道聚拢，密度变成一个鼓包，两道短横线标出 ±1/√d = ±0.25。ε = 0.1 的带里已有 30% 的点，品红的点只剩 70%。', 'Four qubits, d = 16: the dots gather towards the equator and the density becomes a bump; the two short ticks mark ±1/√d = ±0.25. The belt with ε = 0.1 already holds 30% of the points, and only 70% are left magenta.'],
    width: ['维数从 2 一路升到 2¹⁰ = 1024：点越来越挤向赤道，鼓包越来越窄、越来越高，±1/√d 的短横线一起向赤道收拢。到 d = 1024 时宽度是 0.031，带外只剩 0.13%。', 'The dimension rises from 2 to 2¹⁰ = 1024: the dots crowd ever closer to the equator, the bump grows narrower and taller, and the ±1/√d ticks close in with it. At d = 1024 the width is 0.031 and only 0.13% lies outside.'],
    bound: ['d = 2⁷ = 128，带宽 ε = 0.2：品红的带外份额是 0.023，马尔可夫上界 1/(dε²) = 0.195 在它之上，大了八倍多。', 'd = 2⁷ = 128 with ε = 0.2: the magenta outside share is 0.023, and the Markov bound 1/(dε²) = 0.195 lies above it, more than eight times larger.'],
    twenty: ['二十个量子比特，d = 2²⁰ = 1,048,576，ε = 0.1：所有的点都落在赤道上，密度是赤道上的一根细针。带外份额的马尔可夫上界是 9.54 × 10⁻⁵，精确值约为 3 × 10⁻²²⁹¹。', 'Twenty qubits, d = 2²⁰ = 1,048,576, ε = 0.1: every dot lands on the equator, and the density is a thin needle there. The Markov bound on the outside share is 9.54 × 10⁻⁵; the exact share is about 3 × 10⁻²²⁹¹.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id], still = p.t;
    S.eps = p.eps; fEps.set(p.eps);
    clock.pause(); stopAt = null;
    clock.set(still - 1);
    // a still (cover, cited figure shot) and the opening view of the full page show the card's telling frame;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed)) return;
    clock.set(0);
    stopAt = still - 1 < clock.max - 1e-9 ? still - 1 : null;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖时间轴改维数，改带宽 ε，或重新抽样。随时可以再选一张卡。', 'Free play: drag the rail to change the dimension, change the belt half-width ε, or redraw. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.EQUATOR_DEBUG = {
    get state() { const F = facts(); return Object.assign({ t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current, seed: S.seed }, F); },
    samples: () => samples().x.slice(),
    density: (x) => density(dOf(S.t), x),
    seek: (t) => { clock.pause(); clock.set(t); }
  };
  window.TRV_THUMB = () => { applyPreset('four'); cards.mark('four'); paint.now(); };
  cards.pick(cards.initial('four'));
  booting = false;
  paint();
})();
