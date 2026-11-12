/* PHASE//GEARS · 相位齿轮与周期 · Phase gears and the period
   A register of Q = 2^q cells holds the equal superposition of the n cells of a comb {x₀ + jr < Q}. After the
   positive-exponent unitary QFT the amplitude of frequency k is α_k = Σ_x e^{2πikx/Q} / √(Qn). The stage has four
   parts that answer one question each:
     gears     one gear per binary digit 2^j of k, turning 2^j/Q of a turn per cell; lit when k uses that digit
     chain     the phase arrows e^{2πikx/Q} of the comb's cells laid head to tail for the chosen k, and their sum
     register  the Q cells, the comb (cyan) and the cell the sweep has reached (amber)
     spectrum  |α_k|² for every k from the cells swept so far; magenta marks at sQ/r; the chosen k framed in amber
   The rail is the cell x of the sweep: a cell of the comb counts once the rail has reached it.
   Read-only probe for the browser suite: window.PHASE_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI;
  const TH = TRV.thumbMode ? 2 : 1;

  /* ---------- the model ---------- */
  const S = { Q: 16, r: 4, x0: 0, k: 1, read: false };
  const comb = () => { const c = []; for (let x = S.x0; x < S.Q; x += S.r) c.push(x); return c; };
  const bits = () => Math.round(Math.log2(S.Q));
  const phase = (k, x) => TAU * (((k * x) % S.Q) / S.Q);
  /** Σ e^{2πikx/Q} over the comb cells x ≤ t. */
  function sum(k, t) { let re = 0, im = 0; for (const x of comb()) { if (x > t + 1e-9) break; const a = phase(k, x); re += Math.cos(a); im += Math.sin(a); } return [re, im]; }
  const prob = (k, t) => { const s = sum(k, t); return (s[0] * s[0] + s[1] * s[1]) / (S.Q * comb().length); };
  const spectrum = (t) => Array.from({ length: S.Q }, (_, k) => prob(k, t));
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  /** The convergents of k/Q; the last one with denominator ≤ √Q. */
  function readOrder(k) {
    let a = k, b = S.Q, h0 = 0, h1 = 1, k0 = 1, k1 = 0, best = [0, 1];
    const lim = Math.sqrt(S.Q) + 1e-9;
    while (b) {
      const q = Math.floor(a / b);
      const h2 = q * h1 + h0, k2 = q * k1 + k0;
      if (k2 > lim) break;
      best = [h2, k2]; h0 = h1; h1 = h2; k0 = k1; k1 = k2;
      [a, b] = [b, a - q * b];
    }
    return { s: best[0], d: best[1] };
  }
  /** Local maxima of the full spectrum carrying at least half the highest bar. */
  function peaks(sp) { const m = Math.max(...sp), out = []; sp.forEach((p, k) => { const l = sp[(k - 1 + S.Q) % S.Q], r = sp[(k + 1) % S.Q]; if (p >= 0.5 * m && p >= l - 1e-12 && p >= r - 1e-12) out.push(k); }); return out; }
  const lastCell = () => S.Q - 1;
  /** Angle as a multiple of π, written as a reduced fraction. */
  function piFrac(num, den) { // the angle 2π·num/den
    let p = (2 * num) % (2 * den), q = den; const g = gcd(p, q) || 1; p /= g; q /= g;
    if (p === 0) return '0';
    return `${p === 1 ? '' : p}π${q === 1 ? '' : '/' + q}`;
  }

  /* ---------- layout ---------- */
  let boxes = null, specG = null, regBox = null;
  function layout(W, H) {
    const st = $('stage').getBoundingClientRect(), below = (el) => (el ? el.getBoundingClientRect().bottom - st.top : 0);
    const top = TRV.thumbMode ? 20 : Math.max(46, below($('hudBig').parentElement)) + 6;
    const bottom = TRV.thumbMode ? 20 : Math.max(18, $('legend').offsetHeight + 16);
    const h = Math.max(220, H - top - bottom), x = 10, w = W - 20;
    if (W >= 620) {
      const gh = h * 0.4, rh = Math.max(26, h * 0.08), cw = Math.min(w * 0.34, gh * 1.25);
      return { gears: { x, y: top, w: w - cw - 10, h: gh }, chain: { x: x + w - cw, y: top, w: cw, h: gh }, reg: { x, y: top + gh + 8, w, h: rh }, spec: { x, y: top + gh + rh + 16, w, h: h - gh - rh - 16 } };
    }
    const gh = h * 0.24, rh = 24, rest = h - gh - rh - 16, cw = Math.min(w * 0.4, rest);
    return { gears: { x, y: top, w, h: gh }, reg: { x, y: top + gh + 8, w, h: rh }, spec: { x, y: top + gh + rh + 16, w: w - cw - 8, h: rest }, chain: { x: x + w - cw, y: top + gh + rh + 16, w: cw, h: rest } };
  }

  /* ---------- drawing helpers on the raw canvas ---------- */
  let ctx = null;
  function line(pts, color, w, o) {
    o = o || {}; ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w * TH; ctx.globalAlpha = o.alpha == null ? 1 : o.alpha; ctx.setLineDash(o.dash || []); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (o.glow) { ctx.shadowColor = color; ctx.shadowBlur = o.glow; }
    ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); if (o.close) ctx.closePath(); ctx.stroke(); ctx.restore();
  }
  function arrow(a, b, color, w, o) {
    o = o || {}; const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy);
    line([a, b], color, w, o);
    if (l > 5) {
      const hs = Math.min((o.head || 8) * TH, l * 0.45), ux = dx / l, uy = dy / l;
      ctx.save(); ctx.fillStyle = color; ctx.globalAlpha = o.alpha == null ? 1 : o.alpha; ctx.beginPath(); ctx.moveTo(b[0], b[1]);
      ctx.lineTo(b[0] - ux * hs - uy * hs * 0.45, b[1] - uy * hs + ux * hs * 0.45); ctx.lineTo(b[0] - ux * hs + uy * hs * 0.45, b[1] - uy * hs - ux * hs * 0.45); ctx.closePath(); ctx.fill(); ctx.restore();
    }
  }
  function dot(p, r, color, o) { o = o || {}; ctx.save(); ctx.globalAlpha = o.alpha == null ? 1 : o.alpha; ctx.beginPath(); ctx.arc(p[0], p[1], r * TH, 0, TAU); if (o.ring) { ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke(); } else { if (o.glow) { ctx.shadowColor = color; ctx.shadowBlur = o.glow; } ctx.fillStyle = color; ctx.fill(); } ctx.restore(); }
  const tag = (key, x, y, html, cls) => stage.tag(key, [x, y], html, cls, { screen: true });

  /* ---------- gears ---------- */
  function drawGears(t) {
    const b = boxes.gears, q = bits(), cell = Math.floor(t + 1e-9);
    const slot = b.w / q, labelH = TRV.thumbMode ? 0 : (b.h > 120 ? 34 : 26);
    const R = Math.max(10, Math.min(slot * 0.36, (b.h - labelH) * 0.42));
    for (let i = 0; i < q; i++) {
      const j = q - 1 - i, cx = b.x + slot * (i + 0.5), cy = b.y + (b.h - labelH) / 2 + 2, teeth = S.Q >> j;
      const on = ((S.k >> j) & 1) === 1, col = P.violet, al = on ? 1 : 0.35;
      // the gear: twelve teeth round the rim; inside, one dot per position the pointer rests in at whole cells
      const pts = [], NT = 12, tw = PI / NT * 0.5;
      for (let m = 0; m < NT; m++) {
        const a0 = TAU * m / NT + PI / NT;
        for (const [da, rr] of [[-PI / NT, R * 0.86], [-tw, R * 0.86], [-tw * 0.65, R], [tw * 0.65, R], [tw, R * 0.86]]) pts.push([cx + rr * Math.cos(a0 + da), cy - rr * Math.sin(a0 + da)]);
      }
      ctx.save(); ctx.fillStyle = col; ctx.globalAlpha = on ? 0.14 : 0.05; ctx.beginPath(); pts.forEach((p, n) => (n ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); ctx.fill(); ctx.restore();
      line(pts, col, on ? 1.6 : 1, { alpha: al, close: true });
      for (let m = 0; m < teeth; m++) { const a1 = TAU * m / teeth; dot([cx + R * 0.66 * Math.cos(a1), cy - R * 0.66 * Math.sin(a1)], teeth > 16 ? 1.1 : 1.8, col, { alpha: al * 0.8 }); }
      dot([cx, cy], 2.4, col, { alpha: al });
      // the pointer at the continuous rail position: 2^j/Q of a turn per cell
      const a = TAU * ((Math.pow(2, j) * t) % S.Q) / S.Q;
      arrow([cx, cy], [cx + R * 0.62 * Math.cos(a), cy - R * 0.62 * Math.sin(a)], col, on ? 2.6 : 1.6, { alpha: al, glow: on ? 8 : 0, head: 7 });
      if (!TRV.thumbMode) {
        const turns = S.Q >> j;
        tag(`gT${i}`, cx, cy + R * 1.12 + 9, slot >= 110 ? L(`1/${turns} 圈/格`, `1/${turns} turn/cell`) : `1/${turns}`, `raw ${on ? 'vi' : ''}`);
        if (slot >= 110) tag(`gA${i}`, cx, cy + R * 1.12 + 24, `${L('位', 'digit')} ${Math.pow(2, j)} · ${piFrac(Math.pow(2, j) * cell, S.Q)}`, 'num');
      }
    }
  }

  /* ---------- chain ---------- */
  let chainPts = [], chainInk = false;
  function drawChain(t) {
    const b = boxes.chain, c = comb(), k = S.k;
    // fit the whole chain (all cells) so that the scale does not jump during the sweep
    const all = [[0, 0]]; let re = 0, im = 0;
    for (const x of c) { const a = phase(k, x); re += Math.cos(a); im += Math.sin(a); all.push([re, im]); }
    let ext = 1; for (const p of all) ext = Math.max(ext, Math.abs(p[0]), Math.abs(p[1]));
    const cx = b.x + b.w / 2, cy = b.y + b.h / 2 + (TRV.thumbMode ? 0 : 8), sc = Math.min(b.w, b.h - (TRV.thumbMode ? 0 : 18)) / 2 / (ext * 1.12);
    const X = (p) => [cx + p[0] * sc, cy - p[1] * sc];
    line([[b.x + 4, cy], [b.x + b.w - 4, cy]], P.faint, 1); line([[cx, b.y + 16], [cx, b.y + b.h - 2]], P.faint, 1);
    const shown = all.filter((_, i) => i === 0 || c[i - 1] <= t + 1e-9);
    chainPts = shown;
    for (let i = 1; i < shown.length; i++) arrow(X(shown[i - 1]), X(shown[i]), P.cyan, 1.8, { alpha: 0.9, head: 7 });
    const end = shown[shown.length - 1];
    // the ink sum, unless the chain is a single cyan arrow (then the sum is that arrow and would only cover it)
    chainInk = shown.length !== 2;
    if (chainInk) {
      if (Math.hypot(end[0], end[1]) > 1e-9) arrow(X([0, 0]), X(end), P.ink, 2.6, { head: 10 }); else dot(X([0, 0]), 4, P.ink, { ring: true });
    }
    dot(X([0, 0]), 2.5, P.ink);
    if (!TRV.thumbMode) {
      tag('cT', cx, b.y + 6, b.w < 200 ? `k = ${k}` : L(`k = ${k} 的相位箭头首尾相接`, `phase arrows of k = ${k}, head to tail`), 'raw');
      tag('cL', X(end)[0] + 4, Math.max(X(end)[1] - 12, b.y + 30), `|Σ| = ${fix(Math.hypot(end[0], end[1]), 3)}`, 'num');
    }
  }

  /* ---------- register ---------- */
  function drawRegister(t) {
    const b = boxes.reg, w = b.w / S.Q, c = new Set(comb()), cell = Math.floor(t + 1e-9);
    regBox = b;
    for (let x = 0; x < S.Q; x++) {
      const x0 = b.x + x * w + 1, inC = c.has(x), done = x <= t + 1e-9;
      ctx.save();
      ctx.fillStyle = P.cyan; ctx.globalAlpha = inC ? (done ? 0.85 : 0.3) : 0;
      if (inC) ctx.fillRect(x0, b.y + 3, w - 2, b.h - 6);
      ctx.globalAlpha = 0.7; ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1; ctx.strokeRect(x0 + 0.5, b.y + 3.5, w - 3, b.h - 7);
      ctx.restore();
    }
    ctx.save(); ctx.strokeStyle = P.amber; ctx.lineWidth = 2.2 * TH; ctx.shadowColor = P.amber; ctx.shadowBlur = 8;
    ctx.strokeRect(b.x + cell * w - 0.5, b.y + 0.5, w + 1, b.h - 1); ctx.restore();
    if (!TRV.thumbMode && w >= 16) for (let x = 0; x < S.Q; x += Math.max(1, S.Q / 8)) tag(`rX${x}`, b.x + (x + 0.5) * w, b.y + b.h / 2, String(x), 'num');
    if (!TRV.thumbMode && w < 16) for (let x = 0; x < S.Q; x += S.Q / 8) tag(`rX${x}`, b.x + (x + 0.5) * w, b.y - 4, String(x), 'tick');
  }

  /* ---------- spectrum ---------- */
  function drawSpectrum(t) {
    const b = boxes.spec, n = comb().length, top = n / S.Q, cv = $('cv'), W = cv.clientWidth, H = cv.clientHeight;
    const g = kit.plot(cv, { x: [-0.6, S.Q - 0.4], y: [0, top * 1.12], pad: [b.x + 34, W - b.x - b.w + 4, b.y + 14, H - b.y - b.h + 20], clear: false });
    specG = g;
    const xt = []; for (let k = 0; k < S.Q; k += Math.max(1, S.Q / 8)) xt.push([k, String(k)]);
    g.axes({ yTicks: TRV.thumbMode ? [] : [[0, '0'], [top, fix(top, 3)]], xTicks: TRV.thumbMode ? [] : xt, xLabel: TRV.thumbMode ? '' : 'k' });
    g.hline(top, P.faint, { dash: [3, 4] });
    const sp = spectrum(t), wb = 0.36;
    sp.forEach((p, k) => { if (p > 1e-12) g.rect(k - wb, 0, k + wb, p, P.cyan, { alpha: 0.8 }); });
    // where the peaks belong: sQ/r
    if (S.r < S.Q) for (let s = 0; s < S.r; s++) { const xk = s * S.Q / S.r; if (xk > S.Q - 0.5) continue; const px = g.X(xk), py = g.Y(0); ctx.save(); ctx.fillStyle = P.magenta; ctx.beginPath(); ctx.moveTo(px, py + 2); ctx.lineTo(px - 4 * TH, py + 9 * TH); ctx.lineTo(px + 4 * TH, py + 9 * TH); ctx.closePath(); ctx.fill(); ctx.restore(); }
    const k = S.k;
    g.rect(k - wb - 0.14, 0, k + wb + 0.14, Math.max(sp[k], top * 0.04) + top * 0.03, P.amber, { fill: false, stroke: P.amber, width: 2 * TH, glow: 8 });
    if (!TRV.thumbMode) {
      tag('sK', g.X(k), g.Y(Math.max(sp[k], top * 0.04) + top * 0.03) - 10, `${fix(sp[k], 4)}`, 'num hot');
      const done = t >= lastCell() - 1e-9;
      if (S.read && done) {
        const pk = peaks(sp), narrow = b.w < 520;
        pk.forEach((kk) => {
          if (narrow && kk !== k) return;
          const ro = readOrder(kk), txt = kk === 0 ? L('0：无信息', '0: nothing') : `${kk}/${S.Q} → ${ro.s}/${ro.d}`;
          tag(`sR${kk}`, g.X(kk), g.Y(sp[kk]) - (kk === k ? 26 : 12), txt, kk === k ? 'raw hot' : 'raw cy');
        });
      }
    }
    return sp;
  }

  /* ---------- stage ---------- */
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), rotate: false,
    onPick: (ev) => { const w = where(ev); if (!w) return false; aim(w, ev); return true; },
    onDrag: () => {}, onDrop: () => {}
  });
  const local = (ev) => { const r = $('cv').getBoundingClientRect(); return [ev.clientX - r.left, ev.clientY - r.top]; };
  function where(ev) {
    if (!boxes) return null;
    const [x, y] = local(ev), inB = (B) => B && x >= B.x && x <= B.x + B.w && y >= B.y && y <= B.y + B.h;
    return inB(boxes.spec) ? 'spec' : inB(boxes.reg) ? 'reg' : null;
  }
  function aim(w, ev) {
    const [x] = local(ev);
    cards.mark(null);
    if (w === 'spec' && specG) setK(clamp(Math.round(specG.invX(x)), 0, S.Q - 1));
    else if (w === 'reg') { const cell = clamp(Math.floor((x - regBox.x) / (regBox.w / S.Q)), 0, S.Q - 1); setX0(cell % S.r); }
  }
  let lastSp = [];
  function drawStage() {
    const cv = $('cv'), W = cv.clientWidth, H = cv.clientHeight;
    boxes = layout(W, H);
    ctx = stage.begin();
    const t = clock.t;
    drawGears(t); drawChain(t); drawRegister(t);
    lastSp = drawSpectrum(t);
    stage.end();
  }

  /* ---------- strip: the length of the chosen sum along the sweep ---------- */
  function drawPlot() {
    const n = comb().length, g = kit.plot($('plot'), { x: [0, S.Q - 1], y: [0, n * 1.08], pad: [30, 10, 8, 22] });
    $('plotTitle').innerHTML = L('选中频率的合成箭头有多长', 'How long the chosen sum is');
    g.axes({ yTicks: [[0, '0'], [n, String(n)]], xTicks: [[0, '0'], [S.Q / 2, String(S.Q / 2)], [S.Q - 1, String(S.Q - 1)]], xLabel: 'x' });
    const pts = []; for (let x = 0; x < S.Q; x++) { const s = sum(S.k, x); pts.push([x, Math.hypot(s[0], s[1])]); if (x + 1 < S.Q) pts.push([x + 1, Math.hypot(s[0], s[1])]); }
    g.line(pts, P.ink, { width: 1.6 });
    g.vline(clock.t, P.amber, { alpha: 0.85 });
    const s = sum(S.k, clock.t);
    $('plotMeta').textContent = `k = ${S.k} · |Σ| = ${fix(Math.hypot(s[0], s[1]), 3)}`;
  }

  /* ---------- readouts, HUD, legend ---------- */
  const row = (cls, zh, en, val) => `<div class="${cls}"><dt>${L(zh, en)}</dt><dd>${val}</dd></div>`;
  function drawText() {
    const t = clock.t, c = comb(), n = c.length, cell = Math.floor(t + 1e-9), done = t >= lastCell() - 1e-9;
    const fin = spectrum(lastCell()), pk = fin[S.k], g = gcd(S.k, S.Q), ro = readOrder(S.k);
    const near = new Set(); for (let s = 0; s < S.r && S.r <= S.Q; s++) near.add(Math.round(s * S.Q / S.r) % S.Q);
    const nearSum = [...near].reduce((a, k) => a + fin[k], 0);
    $('hudBig').innerHTML = L(`Q = ${S.Q} · 周期 ${S.r} · 扫到 x = ${cell}`, `Q = ${S.Q} · period ${S.r} · swept to x = ${cell}`);
    // a comb through 0 with r | Q is the subgroup H of ZMod Q: |H| = Q/r cells, |H⊥| = r frequencies, peaks Q/r apart
    const sub = S.Q % S.r === 0 && S.x0 === 0;
    $('hudSub').innerHTML = `<span class="c-cy">P(k = ${S.k}) = ${fix(prob(S.k, t), 5)}</span> · `
      + (sub ? `|H| = ${n} · |H⊥| = ${S.r} · ${L('峰距', 'peak spacing')} Q/r = ${S.Q / S.r}` : L(`梳子 ${n} 格`, `${n} comb cells`))
      + `${done || !clock.playing ? '' : L('（扫描中）', ' (sweeping)')}`;
    $('ro').innerHTML = `<div class="key"><dt>${L(`扫完后频率 k = ${S.k} 的概率`, `Probability of k = ${S.k} after the full sweep`)}</dt><dd><b>${fix(pk, 6)}</b></dd></div>`
      + row('', '寄存器 Q · 周期 r · 起点 x₀', 'Register Q · period r · offset x₀', `${S.Q} · ${S.r} · ${S.x0}`)
      + row('c', '梳齿数 n', 'Comb cells n', String(n))
      + row('', 'k/Q 约分', 'k/Q reduced', S.k === 0 ? '0' : `${S.k / g}/${S.Q / g}`)
      + row('', '连分数读出（分母 ≤ √Q）', 'Continued fraction (denominator ≤ √Q)', S.k === 0 ? '—' : `${ro.s}/${ro.d}`)
      + row('m', '离 sQ/r 最近的频点上的概率合计', 'Probability on the integers nearest sQ/r', fix(nearSum, 4))
      + row('', '非零的频点数', 'Frequencies with nonzero probability', String(fin.filter((p) => p > 1e-12).length));
    const res = S.Q % S.r === 0 && S.x0 === 0;
    $('roNote').textContent = res
      ? (S.k % (S.Q / S.r) === 0 ? L(`k 是 Q/r = ${S.Q / S.r} 的倍数：箭头全部同向，链长 ${n}。`, `k is a multiple of Q/r = ${S.Q / S.r}: all arrows point the same way and the chain has length ${n}.`)
        : L(`k 不是 Q/r = ${S.Q / S.r} 的倍数：扫完后链首尾相接，合成为 0。`, `k is not a multiple of Q/r = ${S.Q / S.r}: after the sweep the chain closes and sums to 0.`))
      : S.Q % S.r === 0 ? L('起点不为 0：每格多一个公共相位，谱的高度不变。', 'A nonzero offset multiplies every arrow by one common phase; the bar heights stay the same.')
        : L(`r = ${S.r} 不整除 Q = ${S.Q}：品红的 sQ/r 落在整数之间，峰摊开。`, `r = ${S.r} does not divide Q = ${S.Q}: the magenta marks sQ/r fall between integers and the peaks spread.`);
    $('pillQ').querySelector('strong').textContent = `${S.Q} · ${S.r}`;
    $('pillK').querySelector('strong').textContent = `${S.k} · ${fix(prob(S.k, t), 3)}`;
    $('legend').innerHTML = [['vi', '齿轮：k 的一个二进制位', 'gear: one binary digit of k'], ['cy', '梳子、相位箭头与谱', 'comb, phase arrows and spectrum'], ['mg', 'sQ/r', 'sQ/r'], ['am', '扫到的格 · 选中的 k', 'swept cell · chosen k']]
      .map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    $('readBtn').setAttribute('aria-pressed', String(S.read));
  }

  const paint = kit.painter(() => { drawText(); drawStage(); drawPlot(); }, [$('stage'), $('plot')]);

  /* ---------- the rail: the cell x of the sweep ---------- */
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: S.Q - 1, rate: 2.5, step: 1, t: 0,
    // the label is first drawn while the clock is being built: it reads t, max and S only
    format: (t, max) => `x = ${Math.floor(t + 1e-9)} <small>/ ${Math.round(max)}</small>`,
    onChange: (t, c) => {
      if (stopAt != null && c.playing && t >= stopAt - 1e-9) { const s = stopAt; stopAt = null; c.pause(); c.set(s); return; }
      paint();
    }
  });

  /* ---------- controls ---------- */
  const leave = () => cards.mark(null);
  const fR = kit.field($('r'), { onInput: (v) => { leave(); setR(v); } });
  const fX0 = kit.field($('x0'), { onInput: (v) => { leave(); setX0(v); } });
  const fK = kit.field($('k'), { onInput: (v) => { leave(); setK(v); } });
  const qChips = kit.chips($('qChips'), 'q', (v) => { leave(); setQ(Number(v)); });
  function syncInputs() {
    $('r').max = String(S.Q); $('x0').max = String(S.Q - 1); $('k').max = String(S.Q - 1);
    fR.set(S.r); fX0.set(S.x0); fK.set(S.k); qChips.set(String(S.Q), true);
  }
  function setQ(Q, keep) {
    S.Q = Q; S.r = clamp(S.r, 1, Q); S.x0 = clamp(S.x0, 0, Q - 1); S.k = clamp(S.k, 0, Q - 1);
    clock.rate = Q / 6; clock.setMax(Q - 1, true);
    syncInputs();
    if (!keep) { clock.pause(); clock.set(Q - 1); } else paint();
  }
  function setR(r) { S.r = clamp(Math.round(r), 1, S.Q); if (S.x0 >= S.Q) S.x0 = 0; syncInputs(); paint(); }
  function setX0(x) { S.x0 = clamp(Math.round(x), 0, S.Q - 1); syncInputs(); paint(); }
  function setK(k) { S.k = clamp(Math.round(k), 0, S.Q - 1); syncInputs(); paint(); }
  $('readBtn').addEventListener('click', () => { leave(); S.read = !S.read; paint(); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    basis: { Q: 8, r: 8, x0: 5, k: 7, read: false, to: 5 },
    cancel: { Q: 16, r: 4, x0: 0, k: 1, read: false, to: 15 },
    four: { Q: 16, r: 4, x0: 0, k: 4, read: false, to: 15 },
    dual: { Q: 32, r: 8, x0: 0, k: 4, read: false, to: 31 },
    read: { Q: 16, r: 4, x0: 0, k: 8, read: true, to: 15 },
    leak: { Q: 64, r: 6, x0: 0, k: 11, read: true, to: 63 }
  };
  const NOTES = {
    basis: ['Q = 8，只有一格 x = 5。时间轴走到 5 时，三只紫色齿轮停在 π、π/2、5π/4（每格转 1/2、1/4、1/8 圈）；k = 7 用上全部三只，链上唯一一支青色箭头指向它们的和 3π/4。谱是平的：每根柱子都是 1/8。', 'Q = 8 with the single cell x = 5. When the rail reaches 5 the three violet gears rest at π, π/2 and 5π/4 (turning 1/2, 1/4 and 1/8 of a turn per cell); k = 7 uses all three, and the one cyan arrow of the chain points at their sum, 3π/4. The spectrum is flat: every bar is 1/8.'],
    cancel: ['Q = 16，梳子 {0, 4, 8, 12}，看 k = 1：只有最慢的那只齿轮亮着，每过一格梳齿转 90°。四支青色箭头 1、i、−1、−i 首尾相接围成正方形，回到原点；第 1 根柱子扫描中先长出来，最后缩回 0。', 'Q = 16, comb {0, 4, 8, 12}, following k = 1: only the slowest gear is lit, turning 90° from one tooth of the comb to the next. The four cyan arrows 1, i, −1, −i close into a square and return to the start; bar 1 grows during the sweep and shrinks back to 0 at the end.'],
    four: ['同一把梳子，看 k = 4：四支箭头全部朝右，链长 4。扫完之后谱上只剩 0、4、8、12 四根等高的柱子，每根 1/4，正好落在品红的 sQ/r 上；其余十二根都是 0。', 'The same comb, following k = 4: all four arrows point right and the chain has length 4. After the sweep only the four bars at 0, 4, 8 and 12 remain, each 1/4, right on the magenta marks sQ/r; the other twelve are 0.'],
    dual: ['Q = 32、周期 r = 8：寄存器上青色的梳子 H = {0, 8, 16, 24} 只有 4 格，间距 8。看 k = 4：四支箭头全部朝右，链长 4。扫完之后谱上留下 8 根等高的柱子，每根 1/8，落在 0、4、8、…、28，也就是 H⊥ 的 8 个频率：峰距是 Q/r = 4，不是 r = 8；4 × 8 = 32 = Q。', 'Q = 32 and period r = 8: the cyan comb H = {0, 8, 16, 24} on the register has only 4 cells, 8 apart. Following k = 4, all four arrows point right and the chain has length 4. After the sweep the spectrum keeps 8 equal bars, each 1/8, at 0, 4, 8, …, 28, the 8 frequencies of H⊥: the peaks are Q/r = 4 apart, not r = 8, and 4 × 8 = 32 = Q.'],
    read: ['从峰读出阶：k = 4 与 12 给出 4/16 = 1/4、12/16 = 3/4，分母是阶 4；琥珀色框住的 k = 8 只给出 1/2，分母 2 是阶的真因子，要再检验；k = 0 不含信息。', 'Reading the order from the peaks: k = 4 and 12 give 4/16 = 1/4 and 12/16 = 3/4, whose denominator is the order 4; the amber-framed k = 8 only gives 1/2, and 2 is a proper divisor of the order that must be checked again; k = 0 carries nothing.'],
    leak: ['Q = 64，周期 6 不整除 Q。品红的 sQ/r 落在 10.67、21.33 … 之间，峰摊到相邻格：k = 11 高 0.115、k = 10 只有 0.026，离 sQ/r 最近的六格合计 0.80。k = 11 的连分数读出 1/6，得到阶 6。', 'Q = 64 and the period 6 does not divide Q. The magenta marks sQ/r fall at 10.67, 21.33, … between integers and the peaks spread: k = 11 has 0.115, k = 10 only 0.026, and the six cells nearest sQ/r carry 0.80 together. The continued fraction of k = 11 reads 1/6, giving the order 6.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause(); stopAt = null;
    Object.assign(S, { r: p.r, x0: p.x0, k: p.k, read: p.read });
    setQ(p.Q, true);
    if (TRV.still || (booting && !TRV.embed)) { clock.set(p.to); return; }
    clock.set(0);
    stopAt = p.to < clock.max - 1e-9 ? p.to : null;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换 Q、周期 r 与起点，点谱上的柱子选频率 k，点寄存器的格挪动起点；打开“由峰读出阶”看连分数。随时可以再选一张卡。', 'Free play: change Q, the period r and the offset, click a bar to choose the frequency k or a cell to move the offset, and switch on “Read the order” for the continued fractions. Pick a card again at any time.'] });
  kit.keys({ k: () => { leave(); setK((S.k + 1) % S.Q); } });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.PHASE_DEBUG = {
    get state() {
      const t = clock.t, cell = Math.floor(t + 1e-9), q = bits();
      return {
        Q: S.Q, r: S.r, x0: S.x0, k: S.k, read: S.read, t, max: clock.max, playing: clock.playing, preset: cards.current, cell,
        comb: comb(), probs: spectrum(t), finalProbs: spectrum(lastCell()), chain: chainPts.map((p) => p.slice()), chainInk, sum: sum(S.k, t),
        gears: Array.from({ length: q }, (_, i) => { const j = q - 1 - i; return { weight: Math.pow(2, j), lit: ((S.k >> j) & 1) === 1, angle: TAU * ((Math.pow(2, j) * t) % S.Q) / S.Q }; }),
        peaks: peaks(spectrum(lastCell())), readOrder: readOrder(S.k)
      };
    },
    readOrder: (k) => readOrder(k),
    seek: (t) => { clock.pause(); clock.set(t); },
    /** Viewport coordinates of bar k and of register cell x, for pointer tests. */
    barPoint: (k) => { const b = $('cv').getBoundingClientRect(); return specG ? [b.left + specG.X(k), b.top + specG.Y(0) - 4] : null; },
    cellPoint: (x) => { const b = $('cv').getBoundingClientRect(); return regBox ? [b.left + regBox.x + (x + 0.5) * regBox.w / S.Q, b.top + regBox.y + regBox.h / 2] : null; }
  };
  window.TRV_THUMB = () => { applyPreset('four'); cards.mark('four'); paint.now(); };
  cards.pick(cards.initial('basis'));
  booting = false;
  paint();
})();
