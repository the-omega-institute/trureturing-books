/* EULER//SIEVE: the Euler product over the first K primes against ζ(s) on the real axis s > 1.
   Top of the stage: ζ(s) (ink) and the partial product ∏_{p ≤ p_K} (1 − p^−s)^−1 (cyan) for 1 < s ≤ 4, the magenta gap
   between them, and a magnifier that splits the gap at the current s into the terms n^−s of the integers it consists of.
   Bottom of the stage: the integers 1 … 96, cyan when all their prime factors are on the list (the product's expansion
   contains them), magenta otherwise. The rail drives K, the number of primes on the list; s is a slider and the amber
   line on the stage. Read-only probe for the browser suite: window.EULER_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const KMAX = 25, NGRID = 96, SMIN = 1.05, SMAX = 4, LIMIT = 2000000, NSEG = 4000;

  /* ---------- arithmetic ---------- */
  const PR = (() => { const m = new Uint8Array(LIMIT + 1), out = []; for (let i = 2; i <= LIMIT; i++) { if (m[i]) continue; out.push(i); for (let j = i * i; j <= LIMIT; j += i) m[j] = 1; } return out; })();
  const GPF = (() => { const g = new Int32Array(NSEG + 1); g[1] = 1; for (const p of PR) { if (p > NSEG) break; for (let m = p; m <= NSEG; m += p) g[m] = p; } return g; })();
  /** ζ(s) for real s > 1: Euler–Maclaurin with the terms n < 12 and the Bernoulli corrections B₂ … B₁₄. */
  const BERN = [1 / 6, -1 / 30, 1 / 42, -1 / 30, 5 / 66, -691 / 2730, 7 / 6];
  function zeta(s) {
    const N = 12;
    let sum = 0;
    for (let n = 1; n < N; n++) sum += Math.pow(n, -s);
    sum += Math.pow(N, 1 - s) / (s - 1) + 0.5 * Math.pow(N, -s);
    let poch = s, pw = Math.pow(N, -s - 1), fact = 2;
    for (let k = 1; k <= BERN.length; k++) {
      if (k > 1) { poch *= (s + 2 * k - 3) * (s + 2 * k - 2); pw /= N * N; fact *= (2 * k - 1) * (2 * k); }
      sum += BERN[k - 1] / fact * poch * pw;
    }
    return sum;
  }
  const lnProd = (K, s) => { let a = 0; for (let i = 0; i < K; i++) a -= Math.log1p(-Math.pow(PR[i], -s)); return a; };
  const prod = (K, s) => Math.exp(lnProd(K, s));
  const prodAt1 = (K) => { let a = 1; for (let i = 0; i < K; i++) a *= PR[i] / (PR[i] - 1); return a; };
  /** n is in the expansion of the product over the first K primes when its largest prime factor is on the list. */
  const inList = (n, K) => n === 1 || (K > 0 && GPF[n] <= PR[K - 1]);
  /** How many primes the product needs to come within 1% of ζ(s); null beyond the primes of the sieve. */
  const needCache = new Map();
  function need(s) {
    const key = s.toFixed(3);
    if (needCache.has(key)) return needCache.get(key);
    const target = Math.log(zeta(s)) + Math.log(0.99);
    let a = 0, k = null;
    for (let i = 0; i < PR.length; i++) { a -= Math.log1p(-Math.pow(PR[i], -s)); if (a >= target) { k = i + 1; break; } }
    needCache.set(key, k);
    return k;
  }
  /** The gap at (K, s) split into the integers it consists of: the first magenta integers, then the rest. */
  function slices(K, s, gap) {
    const out = [];
    let acc = 0;
    for (let n = 2; n <= NSEG && out.length < 14; n++) {
      if (inList(n, K)) continue;
      const w = Math.pow(n, -s);
      if (out.length >= 3 && w < gap * 0.012) break;
      out.push({ n, w }); acc += w;
    }
    return { list: out, rest: Math.max(0, gap - acc) };
  }
  const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻', '−': '⁻' };
  const sci = (x) => {
    if (x === 0) return '0';
    if (x >= 1e-3) return x < 0.1 ? x.toFixed(4) : x.toFixed(x < 10 ? 4 : 2);
    const e = Math.floor(Math.log10(x)), m = x / Math.pow(10, e);
    return `${m.toFixed(2)}×10${String(e).split('').map((c) => SUP[c] || c).join('')}`;
  };
  const listText = (K) => (K === 0 ? L('空', 'empty') : K <= 6 ? PR.slice(0, K).join(', ') : `2, 3, 5, … , ${PR[K - 1]}`);
  const thousands = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  /* ---------- state ---------- */
  const S = { s: 2 };
  const cv = $('cv');
  const Kof = () => Math.floor(clock.t + 1e-9);
  const thumb = TRV.thumbMode, LW = thumb ? 2 : 1;
  let geo = null;

  /* ---------- the stage ---------- */
  const YT = [[0.05, '1.05'], [0.1, '1.1'], [0.25, '1.25'], [0.5, '1.5'], [1, '2'], [3, '4'], [7, '8'], [15, '16']];
  function layout(W, H) {
    const narrow = W < 600;
    const hud = document.querySelector('#stage .hud-tl'), leg = document.querySelector('#stage .hud-bl');
    const top = thumb ? 26 : Math.max(narrow ? 70 : 60, (hud ? hud.offsetTop + hud.offsetHeight : 0) + 10);
    const bottom = thumb ? 24 : Math.max(30, (leg ? leg.offsetHeight + 18 : 34));
    const rows = narrow ? 8 : 4, cols = NGRID / rows;
    const cell = Math.max(9, Math.min((W - (narrow ? 24 : 70)) / cols, 34, (H - top - bottom) * (narrow ? 0.4 : 0.31) / rows));
    const gw = cell * cols, gh = cell * rows, gx = (W - gw) / 2, gy = H - bottom - gh;
    const lensW = narrow ? Math.max(84, W * 0.25) : Math.min(210, W * 0.25);
    const lens = { x: W - lensW - (narrow ? 8 : 18), y: top + 4, w: lensW, h: Math.max(60, gy - (narrow ? 22 : 28) - top - 4) };
    const pad = [narrow ? 36 : 44, W - lens.x + (narrow ? 22 : 34), top, H - (gy - (narrow ? 22 : 26))];
    return { W, H, narrow, rows, cols, cell, gx, gy, lens, pad };
  }
  /** Samples of s, denser near the pole. */
  const SS = (() => { const a = []; for (let i = 0; i <= 260; i++) a.push(1 + 3 * Math.pow(i / 260, 1.7)); return a; })();
  function drawStage() {
    const K = Kof(), s = S.s, z = zeta(s), pr = prod(K, s), gap = z - pr, next = PR[K];
    const g0 = kit.plot(cv, { x: [0, 1], y: [0, 1], pad: [0, 0, 0, 0] });
    geo = layout(g0.W, g0.H);
    const g = kit.plot(cv, { x: [1, SMAX], y: [0.04, 21], logY: true, pad: geo.pad, clear: false });
    const c = g.ctx, yv = (v) => Math.max(v - 1, 0.04);
    geo.X = g.X; geo.Y = (v) => g.Y(yv(v)); geo.invX = g.invX; geo.plot = { l: g.pl, t: g.pt, r: g.pl + g.iw, b: g.pt + g.ih };
    if (!thumb) g.axes({ yTicks: geo.narrow ? YT.filter((t, i) => i % 2 === 1) : YT, xTicks: geo.narrow ? [1, 2, 3, 4] : [1, 1.5, 2, 2.5, 3, 3.5, 4], xLabel: 's' });
    c.save(); c.beginPath(); c.rect(g.pl, g.pt - 2, g.iw, g.ih + 2); c.clip();
    g.vline(1, P.dim, { dash: [3, 4], alpha: 0.8 });
    const zs = SS.filter((x) => x > 1.0015).map((x) => [x, yv(zeta(x))]), ps = (k) => SS.map((x) => [x, yv(x === 1 ? prodAt1(k) : prod(k, x))]);
    // the gap: between the product and ζ
    const cur = ps(K), band = zs.concat(cur.filter((p) => p[0] > 1.0015).reverse());
    g.poly(band, P.magenta, { alpha: thumb ? 0.42 : 0.26 });
    for (let k = 1; k < K; k++) g.line(ps(k), P.cyan, { width: 1 * LW, alpha: 0.16 });
    g.line(cur, P.cyan, { width: 2.4 * LW, glow: thumb ? 0 : 6 });
    // the floor of the gap: product + p_{K+1}^−s, drawn over the product so that it stays visible next to it
    g.line(SS.filter((x) => x > 1.0015).map((x) => [x, yv(prod(K, x) + Math.pow(next, -x))]), P.magenta, { width: 1.7 * LW, dash: [5, 4] });
    g.line(zs, P.ink, { width: 2 * LW });
    c.restore();
    // the pole and the value of the product at s = 1
    g.dot(1, yv(prodAt1(K)), P.cyan, 3.5 * LW);
    if (!thumb) {
      g.text(1, 20, L('s = 1：ζ → ∞', 's = 1: ζ → ∞'), P.dim, { align: 'left', base: 'top', dx: 30, dy: 2, size: 11 });
      g.text(1, 20, `∏ = ${prodAt1(K).toFixed(2)}`, P.cyan, { align: 'left', base: 'top', dx: 30, dy: 17, size: 11 });
      const lz = 1.28; g.text(lz, yv(zeta(lz)), 'ζ(s)', P.ink, { align: 'left', base: 'bottom', dx: 8, dy: -2, size: 12, face: 'data' });
    }
    // the current s
    const xs = g.X(s);
    c.save(); c.strokeStyle = P.amber; c.lineWidth = 1.6 * LW; c.shadowColor = P.amber; c.shadowBlur = thumb ? 0 : 8; c.beginPath(); c.moveTo(xs, g.pt); c.lineTo(xs, g.pt + g.ih); c.stroke(); c.restore();
    g.dot(s, yv(z), P.ink, 3.5 * LW); g.dot(s, yv(pr), P.cyan, 4 * LW, { glow: thumb ? 0 : 10 });
    if (!thumb) g.text(s, 0.04, `s = ${s.toFixed(2)}`, P.amber, { align: xs > g.pl + g.iw - 60 ? 'right' : 'left', base: 'bottom', dx: xs > g.pl + g.iw - 60 ? -6 : 6, dy: -4, size: 11, face: 'data' });
    drawLens(c, s, pr, z, gap, K, xs, g);
    drawGrid(c, K);
  }
  function drawLens(c, s, pr, z, gap, K, xs, g) {
    const { x, y, w, h } = geo.lens, top = y + (thumb ? 10 : 24), bot = y + h - (thumb ? 10 : 22), ppu = (bot - top) / gap;
    // dashed leaders from the gap at s to the lens
    const ya = g.Y(Math.max(z - 1, 0.04)), yb = g.Y(Math.max(pr - 1, 0.04));
    c.save(); c.strokeStyle = TRV.alpha(P.amber, 0.7); c.lineWidth = 1; c.setLineDash([3, 4]);
    c.beginPath(); c.moveTo(xs + 5, Math.max(g.pt, ya)); c.lineTo(x, top); c.moveTo(xs + 5, Math.min(g.pt + g.ih, yb)); c.lineTo(x, bot); c.stroke(); c.setLineDash([]);
    c.strokeStyle = P.amber; c.lineWidth = 1.4; c.strokeRect(xs - 5, Math.max(g.pt, ya) - 3, 10, Math.min(g.pt + g.ih, yb) - Math.max(g.pt, ya) + 6);
    c.fillStyle = TRV.alpha(P.void, 0.55); c.fillRect(x, y, w, h); c.strokeStyle = P.amber; c.lineWidth = 1.2; c.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
    const bx = x + (geo.narrow ? 8 : 14), bw = Math.min(geo.narrow ? 30 : 46, w * 0.34);
    const sl = slices(K, s, gap);
    let yy = bot;
    sl.list.forEach((q, i) => {
      const hh = q.w * ppu, y1 = yy - hh;
      c.fillStyle = TRV.alpha(P.magenta, i === 0 ? 0.9 : i % 2 ? 0.5 : 0.66); c.fillRect(bx, y1, bw, hh);
      if (hh > 2.5) { c.strokeStyle = TRV.alpha(P.void, 0.9); c.lineWidth = 1; c.beginPath(); c.moveTo(bx, y1 + 0.5); c.lineTo(bx + bw, y1 + 0.5); c.stroke(); }
      if (!thumb && hh >= 9.5) {
        c.fillStyle = i === 0 ? P.magenta : TRV.alpha(P.ink, 0.85); c.font = `${i === 0 ? 600 : 400} ${hh >= 11 ? 11 : 9.5}px ${TRV.fonts.data}`; c.textAlign = 'left'; c.textBaseline = 'middle';
        c.fillText(geo.narrow ? `${q.n}` : `${q.n}⁻ˢ ${i === 0 ? '= ' + sci(q.w) : ''}`, bx + bw + 6, y1 + hh / 2);
      }
      yy = y1;
    });
    if (sl.rest > 0) {
      const hh = sl.rest * ppu;
      c.fillStyle = TRV.alpha(P.magenta, 0.34); c.fillRect(bx, yy - hh, bw, hh);
      if (!thumb && hh >= 11) { c.fillStyle = P.dim; c.font = `11px ${TRV.fonts.body}`; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(L('其余', 'the rest'), bx + bw + 6, yy - hh / 2); }
    }
    c.save(); c.shadowColor = P.magenta; c.shadowBlur = thumb ? 0 : 10; c.strokeStyle = P.magenta; c.lineWidth = 1.8 * LW; c.strokeRect(bx + 0.5, bot - (sl.list[0] ? sl.list[0].w * ppu : 0), bw - 1, sl.list[0] ? sl.list[0].w * ppu : 0); c.restore();
    c.strokeStyle = P.cyan; c.lineWidth = 2.2 * LW; c.beginPath(); c.moveTo(bx - 4, bot); c.lineTo(bx + bw + 4, bot); c.stroke();
    c.strokeStyle = P.ink; c.lineWidth = 2 * LW; c.beginPath(); c.moveTo(bx - 4, top); c.lineTo(bx + bw + 4, top); c.stroke();
    if (!thumb) {
      c.font = `11px ${TRV.fonts.data}`; c.textBaseline = 'bottom'; c.textAlign = 'left';
      c.fillStyle = P.ink; c.fillText(`ζ ${z.toFixed(4)}`, x + 6, top - 4);
      c.fillStyle = P.cyan; c.textBaseline = 'top'; c.fillText(`∏ ${pr.toFixed(4)}`, x + 6, bot + 4);
      c.fillStyle = P.amber; c.textBaseline = 'top'; c.textAlign = 'right'; c.fillText(L('放大', 'zoom'), x + w - 5, y + 4);
    }
  }
  function drawGrid(c, K) {
    const { rows, cols, cell, gx, gy } = geo, next = PR[K], newest = K ? PR[K - 1] : 0;
    for (let n = 1; n <= NGRID; n++) {
      const r = Math.floor((n - 1) / cols), q = (n - 1) % cols, x = gx + q * cell, y = gy + r * cell, inP = inList(n, K);
      const col = inP ? P.cyan : P.magenta;
      c.fillStyle = TRV.alpha(col, inP ? 0.3 : n === next ? 0.62 : 0.4); c.fillRect(x + 1.5, y + 1.5, cell - 3, cell - 3);
      c.strokeStyle = TRV.alpha(col, 0.75); c.lineWidth = 1; c.strokeRect(x + 2, y + 2, cell - 4, cell - 4);
      if (n > 1 && newest && GPF[n] === newest) { c.strokeStyle = P.amber; c.lineWidth = 1.8 * LW; c.strokeRect(x + 1.5, y + 1.5, cell - 3, cell - 3); }
      if (n === next) { c.save(); c.shadowColor = P.magenta; c.shadowBlur = 12; c.strokeStyle = P.magenta; c.lineWidth = 2.2 * LW; c.strokeRect(x + 1, y + 1, cell - 2, cell - 2); c.restore(); }
      if (!thumb && cell >= 15) {
        c.fillStyle = n === next ? P.ink : TRV.alpha(P.ink, inP ? 0.85 : 0.7); c.font = `${n === next ? 600 : 400} ${Math.round(Math.min(13, cell * 0.44))}px ${TRV.fonts.data}`;
        c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(String(n), x + cell / 2, y + cell / 2 + 0.5);
      }
    }
    void rows;
  }

  /* ---------- the plots under the stage ---------- */
  const NEED = (() => { const a = []; for (let s = 1.2; s <= 4.0001; s += 0.05) a.push([s, need(s)]); return a; })();
  function drawPlots() {
    const K = Kof(), s = S.s;
    const g = kit.plot($('plotA'), { x: [1, 3], y: [0, 1.6], pad: [34, 10, 10, 22] });
    g.axes({ yTicks: [0, 0.5, 1, 1.5], xTicks: [1, 1.5, 2, 2.5, 3] });
    g.hline(1, P.ok, { dash: [5, 3], width: 1.4 });
    const xs = []; for (let i = 0; i <= 160; i++) xs.push(1 + 2 * Math.pow(i / 160, 1.5));
    g.line(xs.map((x) => [x, x === 1 ? 1 : (x - 1) * zeta(x)]), P.ink, { width: 1.8 });
    g.line(xs.map((x) => [x, (x - 1) * (x === 1 ? prodAt1(K) : prod(K, x))]), P.cyan, { width: 1.8 });
    if (s <= 3) { g.vline(s, P.amber); g.dot(s, (s - 1) * prod(K, s), P.cyan, 3.5); g.dot(s, (s - 1) * zeta(s), P.ink, 3.5); }
    g.legend([[P.ink, L('(s − 1)·ζ(s)', '(s − 1)·ζ(s)')], [P.cyan, L('(s − 1)·乘积', '(s − 1)·product')], [P.ok, L('留数 1', 'residue 1'), 'dash']], { right: true, bottom: true });
    $('pAMeta').textContent = `s = ${s.toFixed(2)} · ${fix((s - 1) * zeta(s), 3)} / ${fix((s - 1) * prod(K, s), 3)}`;
    const top = 3e5, gb = kit.plot($('plotB'), { x: [1.2, 4], y: [1, top], logY: true, pad: [40, 10, 10, 22] });
    gb.axes({ yTicks: [[1, '1'], [10, '10'], [100, '100'], [1e3, '10³'], [1e4, '10⁴'], [1e5, '10⁵']], xTicks: [1.2, 1.5, 2, 2.5, 3, 3.5, 4] });
    gb.hline(PR.length, P.dim, { dash: [3, 3] });
    gb.line(NEED.map(([x, k]) => (k ? [x, k] : null)), P.cyan, { width: 1.8 });
    NEED.forEach(([x, k]) => { if (!k) gb.dot(x, top * 0.8, P.magenta, 2.6); });
    if (K > 0) gb.hline(K, P.amber, { dash: [4, 3], alpha: 0.8 });
    const nk = need(s);
    if (s >= 1.2) gb.dot(s, nk || top * 0.8, nk ? P.amber : P.magenta, 4.5, { glow: 8 });
    gb.text(4, PR.length, L('筛出的素数 148 933 个', 'primes in the sieve: 148 933'), P.dim, { align: 'right', base: 'top', dy: 3, size: 10 });
    $('pBMeta').textContent = nk ? L(`s = ${s.toFixed(2)}：${nk} 个`, `s = ${s.toFixed(2)}: ${nk}`) : L(`s = ${s.toFixed(2)}：超出`, `s = ${s.toFixed(2)}: beyond`);
  }

  /* ---------- readouts ---------- */
  function drawText() {
    const K = Kof(), s = S.s, z = zeta(s), pr = prod(K, s), gap = z - pr, next = PR[K], fl = Math.pow(next, -s), nk = need(s);
    $('roGap').innerHTML = `${sci(gap)} <span class="chk">&gt; ${next}⁻ˢ ✓</span>`;
    $('roGapSub').textContent = `${next}⁻ˢ = ${sci(fl)} · ${L(`第一个漏网的整数是 ${next}`, `the first integer to slip through is ${next}`)}`;
    $('roList').textContent = `${listText(K)}${K ? L(`（${K} 个）`, ` (${K})`) : ''}`;
    $('roProd').textContent = pr.toFixed(6); $('roZeta').textContent = z.toFixed(6);
    $('roShare').textContent = `${(100 * pr / z).toFixed(K >= 11 ? 3 : 2)}%`;
    $('roNeed').textContent = nk ? `${thousands(nk)} (p ≤ ${thousands(PR[nk - 1])})` : L('超过 148 933', 'more than 148 933');
    $('roNote').textContent = s < 1.25 ? L('s 越靠近 1，缺口越宽：s = 1 处乘积停在有限值，ζ 却趋于无穷。', 'The closer s is to 1, the wider the gap: at s = 1 the product stops at a finite value while ζ goes to infinity.')
      : L('每加一个素数，缺口就缩一截；可它垫底的那一段总是下一个素数的 p⁻ˢ。', 'Each prime added shrinks the gap, yet its lowest slice is always p⁻ˢ of the next prime.');
    $('hudBig').textContent = `${L('清单', 'LIST')} ${listText(K)} · s = ${s.toFixed(2)}`;
    $('hudSub').textContent = L(`乘积 ${pr.toFixed(4)}，ζ ${z.toFixed(4)}，缺口 ${sci(gap)} > ${next}⁻ˢ = ${sci(fl)}`, `Product ${pr.toFixed(4)}, ζ ${z.toFixed(4)}, gap ${sci(gap)} > ${next}⁻ˢ = ${sci(fl)}`);
    $('pillK').querySelector('strong').textContent = `${K} · p ≤ ${K ? PR[K - 1] : '—'}`;
    $('pillS').querySelector('strong').textContent = s.toFixed(2);
    $('pillGap').querySelector('strong').textContent = sci(gap);
  }

  const paint = kit.painter(() => { drawText(); drawStage(); drawPlots(); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- controls ---------- */
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: KMAX, t: 3, rate: 3, step: 1,
    format: (t, max) => { const k = Math.floor(t + 1e-9); return `K = ${k} <small>${k ? `· p ≤ ${PR[k - 1]}` : ''} / ${max}</small>`; },
    onChange: (t, c) => { if (stopAt != null && c.playing && t >= stopAt) { const at = stopAt; stopAt = null; c.pause(); c.set(at); return; } paint(); }
  });
  let sTween = null;
  const setS = (v, quiet) => { S.s = Math.min(SMAX, Math.max(SMIN, v)); fS.set(S.s.toFixed(2)); if (!quiet) paint(); };
  const fS = kit.field($('sval'), { fmt: (v) => v.toFixed(2), onInput: (v) => { if (sTween) sTween.cancel(); cards.mark(null); setS(v); } });
  function tweenS(from, to, ms) {
    if (sTween) sTween.cancel();
    sTween = kit.tween(ms, (e) => setS(from + (to - from) * e), () => { sTween = null; });
  }
  $('rew').addEventListener('click', () => { stopAt = null; clock.pause(); clock.set(0); });
  // the stage: drag the amber line (anywhere over the plot) or click a cell of the grid
  let dragging = false;
  const ptr = (ev) => { const b = cv.getBoundingClientRect(); return [ev.clientX - b.left, ev.clientY - b.top]; };
  function cellUnder(p) {
    if (!geo) return 0;
    const q = Math.floor((p[0] - geo.gx) / geo.cell), r = Math.floor((p[1] - geo.gy) / geo.cell);
    return q >= 0 && q < geo.cols && r >= 0 && r < geo.rows ? r * geo.cols + q + 1 : 0;
  }
  cv.addEventListener('pointerdown', (ev) => {
    if (!geo) return;
    const p = ptr(ev), n = cellUnder(p);
    if (n) {
      if (n === 1) { TRV.toast($('toast'), L('1 是空乘积：它总在乘积的展开里。', '1 is the empty product: it is always in the expansion.')); return; }
      const k = PR.indexOf(GPF[n]) + 1;
      cards.mark(null); stopAt = null; clock.pause(); clock.set(Math.max(Kof(), k));
      TRV.toast($('toast'), L(`${n} 的最大素因子是 ${GPF[n]}`, `The largest prime factor of ${n} is ${GPF[n]}`));
      return;
    }
    const pl = geo.plot;
    if (p[0] >= pl.l - 10 && p[0] <= pl.r + 10 && p[1] >= pl.t - 10 && p[1] <= pl.b + 10) {
      dragging = true; try { cv.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events */ }
      if (sTween) sTween.cancel(); cards.mark(null); setS(geo.invX(p[0]));
    }
  });
  cv.addEventListener('pointermove', (ev) => { if (dragging) setS(geo.invX(ptr(ev)[0])); });
  const drop = () => { dragging = false; };
  cv.addEventListener('pointerup', drop); cv.addEventListener('pointercancel', drop);

  /* ---------- experiment cards ---------- */
  const CARDS = {
    two: { K: 1, s: 2, still: 1 },
    near: { K: 11, s: 1.1, still: 11 },
    all: { K: 25, s: 1.2, still: 25 },
    five: { K: 3, s: 2, sweep: [4, 1.3], still: 3 },
    thirtyone: { K: 11, s: 2, still: 11 }
  };
  const NOTES = {
    two: ['清单上只有 2。青色曲线是这一根轴上的等比级数 1 + 2⁻ˢ + 4⁻ˢ + … = (1 − 2⁻ˢ)⁻¹，在 s = 2 处是 4/3；下方只有 2 的幂 1、2、4、8、16、32、64 是青色，其余全是品红，第一个是 3。',
      'Only 2 is on the list. The cyan curve is the geometric series along this one axis, 1 + 2⁻ˢ + 4⁻ˢ + … = (1 − 2⁻ˢ)⁻¹, which is 4/3 at s = 2; below, only the powers of 2 (1, 2, 4, 8, 16, 32, 64) are cyan, everything else is magenta, and the first magenta cell is 3.'],
    near: ['清单是到 31 为止的 11 个素数，琥珀色的竖线在 s = 1.1：青色曲线只到 4.93，墨色的 ζ 是 10.58，品红的缺口比乘积还大。越往左缺口越宽：s = 1 处青色曲线停在 6.54，ζ 冲出了画面。',
      'The list holds the 11 primes up to 31 and the amber line stands at s = 1.1: the cyan curve reaches only 4.93, the ink ζ is 10.58, and the magenta gap is larger than the product. Further left the gap only widens: at s = 1 the cyan curve stops at 6.54 while ζ leaves the picture.'],
    all: ['素数一个个加进清单，直到 97：1 到 96 的格子全部变青。琥珀色的竖线在 s = 1.2：青色的乘积只有 4.37，墨色的 ζ(1.2) = 5.59，品红的缺口 1.23 仍占 ζ 的五分之一以上；放大镜里垫底的一段是 101⁻ˢ。',
      'Primes join the list one by one up to 97 and every cell from 1 to 96 turns cyan. The amber line stands at s = 1.2: the cyan product is only 4.37 against ζ(1.2) = 5.59, and the magenta gap of 1.23 is still more than a fifth of ζ; its lowest slice in the magnifier is 101⁻ˢ.'],
    five: ['清单是 2、3、5：青色的格子 1、2、3、4、5、6、8、9、10、12 … 是乘积展开出来的项，7 是第一个品红格。s = 2 处青色曲线是 25/16 = 1.5625，ζ(2) = 1.6449；放大镜把缺口 0.0824 自下而上拆成 7⁻ˢ、11⁻ˢ、13⁻ˢ 和更薄的一段段。点这张卡，琥珀色的竖线从 s = 4 扫到 1.3：缺口越来越宽，垫底的始终是 7⁻ˢ，缺口从不比品红虚线更窄。',
      'The list is 2, 3, 5: the cyan cells 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 … are the terms the product expands into, and 7 is the first magenta cell. At s = 2 the cyan curve is 25/16 = 1.5625 against ζ(2) = 1.6449; the magnifier splits the gap of 0.0824, from the bottom up, into 7⁻ˢ, 11⁻ˢ, 13⁻ˢ and ever thinner slices. Click the card and the amber line sweeps from s = 4 down to 1.3: the gap widens, its lowest slice is always 7⁻ˢ, and it never gets narrower than the dashed magenta curve.'],
    thirtyone: ['清单到 31，共 11 个素数：1 到 36 全是青色，第一个品红格是 37，此后只零星几个。s = 2 处缺口缩到 0.0102，放大镜里垫底的仍是 37⁻ˢ。',
      'The list runs up to 31, eleven primes: 1 to 36 are all cyan, the first magenta cell is 37, and only a few more follow. At s = 2 the gap has shrunk to 0.0102, and its lowest slice in the magnifier is still 37⁻ˢ.']
  };
  let booting = true;
  function applyPreset(id) {
    const c = CARDS[id];
    stopAt = null; clock.pause();
    if (sTween) sTween.cancel();
    if (TRV.still || (booting && !TRV.embed)) { setS(c.s, true); clock.set(c.still); return; }
    if (c.sweep && !booting) { clock.set(c.K, true); setS(c.sweep[0], true); tweenS(c.sweep[0], c.sweep[1], 2600); paint(); return; }
    if (booting) setS(c.s, true); else tweenS(S.s, c.s, 500);
    clock.set(0); stopAt = c.K;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { presets: CARDS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖时间轴加减素数，拖琥珀色竖线改 s，点一个品红格把它的最大素因子放进清单。', 'Free play: scrub the rail to add or drop primes, drag the amber line to move s, click a magenta cell to put its largest prime factor on the list.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe for the browser suite, cover, start ---------- */
  window.EULER_DEBUG = {
    get state() {
      const K = Kof(), s = S.s, z = zeta(s), pr = prod(K, s), gap = z - pr, sl = slices(K, s, gap);
      return {
        K, t: clock.t, s, playing: clock.playing, preset: cards.current, target: stopAt, primes: PR.slice(0, K), next: PR[K],
        product: pr, zeta: z, gap, floor: Math.pow(PR[K], -s), productAt1: prodAt1(K), need: need(s), sieved: PR.length,
        cyan: Array.from({ length: NGRID }, (_, i) => inList(i + 1, K)), slices: sl.list.map((q) => [q.n, q.w]), rest: sl.rest,
        hud: $('hudSub').textContent, gapText: $('roGap').textContent
      };
    },
    zeta, seek: (t) => { stopAt = null; clock.pause(); clock.set(t); }, setS: (v) => { if (sTween) sTween.cancel(); setS(v); },
    /** Viewport coordinates of the point of the plot at s (half-way down) and of the centre of cell n. */
    plotPoint: (s) => { const b = cv.getBoundingClientRect(); return [b.left + geo.X(s), b.top + (geo.plot.t + geo.plot.b) / 2]; },
    cellAt: (n) => { const b = cv.getBoundingClientRect(), r = Math.floor((n - 1) / geo.cols), q = (n - 1) % geo.cols; return [b.left + geo.gx + (q + 0.5) * geo.cell, b.top + geo.gy + (r + 0.5) * geo.cell]; }
  };
  window.TRV_THUMB = () => { stopAt = null; clock.pause(); if (sTween) sTween.cancel(); setS(1.3, true); clock.set(3); paint.now(); };
  cards.pick(cards.initial('five'));
  booting = false;
  paint();
})();
