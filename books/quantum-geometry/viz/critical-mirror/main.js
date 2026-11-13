/* ORTHO//MIRROR: the mirror Re s = ½ and the Cayley circle.
   Left of the stage: the critical strip 0 < Re s < 1 in the s plane (vertical scale compressed), with a point
   ρ = ½ ± δ + iγ and its orbit under the two frozen symmetries of ξ: reflection s ↦ 1 − s and conjugation s ↦ s̄.
   Right: the w = (s − 1)/s plane, where the critical line is the unit circle and s ↦ 1 − s̄ is inversion in it; a
   log-polar magnifier (angle across, ln |w| up) keeps the radial offset of the four images visible however small.
   The QUARTIC scene replaces the w plane by two real curves along the critical line: the quartic F(½ + it) with the
   same four zeros, and ξ(½ + it). The rail is the distance δ of ρ from the mirror.
   Read-only probe for the browser suite: window.MIRROR_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const DMAX = 0.45, RAIL = 45;                       // the rail runs δ from 0.45 down to 0 in steps of 0.01
  const S = { scene: 'mirror', side: 1, gamma: 2 };
  const delta = () => Math.max(0, (RAIL - clock.t) / 100);
  const railOf = (d) => RAIL - 100 * d;

  /* ---------- complex arithmetic ---------- */
  const C = (re, im) => ({ re, im: im || 0 });
  const add = (a, b) => C(a.re + b.re, a.im + b.im), sub = (a, b) => C(a.re - b.re, a.im - b.im);
  const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
  const div = (a, b) => { const d = b.re * b.re + b.im * b.im; return C((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d); };
  const cexp = (a) => { const e = Math.exp(a.re); return C(e * Math.cos(a.im), e * Math.sin(a.im)); };
  const clog = (a) => C(Math.log(Math.hypot(a.re, a.im)), Math.atan2(a.im, a.re));
  const cabs = (a) => Math.hypot(a.re, a.im);
  const cpow = (x, s) => cexp(mul(C(Math.log(x)), s));   // x > 0 real, s complex: x^s
  const scale = (a, k) => C(a.re * k, a.im * k);

  /* ---------- w = (s − 1)/s and the orbit of a point ---------- */
  const cay = (s) => div(sub(s, C(1)), s);
  function orbit(d, side, gamma) {
    const sg = 0.5 + side * d, pts = [C(sg, gamma), C(sg, -gamma), C(1 - sg, -gamma), C(1 - sg, gamma)];   // ρ, ρ̄, 1 − ρ, 1 − ρ̄
    return pts.map((s) => ({ s, w: cay(s) }));
  }
  const distinct = (pts) => { const out = []; for (const p of pts) if (!out.some((q) => cabs(sub(q.s, p.s)) < 1e-12)) out.push(p); return out.length; };

  /* ---------- ζ, Γ and ξ on the critical line (for the QUARTIC scene) ---------- */
  const B2K = [1 / 6, -1 / 30, 1 / 42, -1 / 30, 5 / 66, -691 / 2730, 7 / 6, -3617 / 510, 43867 / 798];
  function zeta(s) {   // Euler–Maclaurin with N = 40 terms and nine Bernoulli corrections; fine for |Im s| ≤ 60
    const N = 40; let sum = C(0);
    for (let n = 1; n < N; n++) sum = add(sum, cpow(n, scale(s, -1)));
    const Ns = cpow(N, scale(s, -1));
    sum = add(sum, div(mul(Ns, C(N)), sub(s, C(1))));
    sum = add(sum, scale(Ns, 0.5));
    let poch = s, fact = 2, pw = scale(Ns, 1 / N);   // s(s+1)…(s+2k−2) / (2k)! · N^(−s−2k+1)
    for (let k = 1; k <= B2K.length; k++) {
      if (k > 1) { poch = mul(poch, mul(add(s, C(2 * k - 3)), add(s, C(2 * k - 2)))); fact *= (2 * k - 1) * (2 * k); pw = scale(pw, 1 / (N * N)); }
      sum = add(sum, scale(mul(poch, pw), B2K[k - 1] / fact));
    }
    return sum;
  }
  function lgamma(z) {   // Stirling after shifting the argument by 10
    let shift = C(0), w = z;
    for (let k = 0; k < 10; k++) { shift = add(shift, clog(w)); w = add(w, C(1)); }
    const iw = div(C(1), w), iw2 = mul(iw, iw);
    let ser = scale(iw, 1 / 12); let p = iw;
    for (const c of [-1 / 360, 1 / 1260, -1 / 1680]) { p = mul(p, iw2); ser = add(ser, scale(p, c)); }
    return sub(add(add(sub(mul(sub(w, C(0.5)), clog(w)), w), C(0.5 * Math.log(2 * Math.PI))), ser), shift);
  }
  /** ξ(½ + it) = ½ s(s − 1) π^(−s/2) Γ(s/2) ζ(s): real on the critical line; returns { re, im } for the check. */
  function xiLine(t) {
    const s = C(0.5, t), half = scale(s, 0.5);
    const g = cexp(add(lgamma(half), mul(scale(half, -1), C(Math.log(Math.PI)))));
    return mul(scale(mul(s, sub(s, C(1))), 0.5), mul(g, zeta(s)));
  }
  const quartic = (d, gamma, t) => { const a = d * d + gamma * gamma - t * t; return a * a + 4 * d * d * t * t; };   // F(½ + it), F = offCriticalQuartic δ γ
  const ZEROS = [14.134725142, 21.022039639, 25.010857580, 30.424876126, 32.935061588];   // the first five ordinates (numerical)

  /* ---------- the stage ---------- */
  /* Heights the panels are allotted from. MIN_H: a chart's readable height (two 10px label rows and a 4px gap), declared
     to kit.plot as minHeight. The magnifier: its caption row, its chart and a bottom margin, inset from the w panel.
     The quartic: two curves, each under a caption row, a gap between them and the row of t ticks under the lower one. */
  const MIN_H = 24, GAP = 18, MAG_HEAD = 22, MAG_FOOT = 8, MAG_EDGE = 4, Q_HEAD = 16, Q_GAP = 26, TICKS = 22;
  const MAG_MIN = MAG_HEAD + MIN_H + MAG_FOOT;
  const NEED = { s: MIN_H, mirror: MAG_MIN + 2 * MAG_EDGE, quartic: 2 * (Q_HEAD + MIN_H) + Q_GAP + TICKS };
  /** The free band of the stage: below the title block and the scene buttons, above the legend (46: the band of a
      one-line title; 10 and 20: the gap under it, and the legend's offset from the bottom edge plus a gap). */
  function hudBand() {
    if (TRV.thumbMode) return { top: 18, bottom: 18 };
    const sr = $('stage').getBoundingClientRect(), below = (el) => el.getBoundingClientRect().bottom - sr.top, legend = document.querySelector('#stage .hud-bl');
    return { top: Math.max(46, below(document.querySelector('#stage .hud-tl')), below($('sceneChips'))) + 10, bottom: Math.max(18, legend.offsetHeight + 20) };
  }
  /** A lab stage grows to the height its charts declare (kit.plot publishes it). A cited figure or a still keeps its
      frame: when the band is shorter than the panels need, they keep their full need, centred on the band, and the HUD
      text, drawn with a halo, runs over their edges. */
  function fitBand(H, top, bottom, need) {
    if (!(TRV.figure || TRV.still) || H - top - bottom >= need) return { top, bottom };
    const t = Math.max(0, Math.min(H - need, (top + H - bottom - need) / 2));
    return { top: t, bottom: Math.max(0, H - t - need) };
  }
  /** Side by side on a wide stage. On a narrow one the panels stack (the captions of the curves and the magnifier need
      the width), the lower one first getting what its charts need. */
  let geoS = null;
  function panels(W, H) {
    const narrow = W < 640, band = hudBand(), needR = NEED[S.scene];
    if (!narrow) {
      const mid = Math.round(W * 0.42), b = fitBand(H, band.top, band.bottom, Math.max(NEED.s, needR));
      return { narrow, s: [16, W - mid + 8, b.top, b.bottom], r: [mid + 24, 18, b.top, b.bottom], split: mid };
    }
    const b = fitBand(H, band.top, band.bottom, NEED.s + GAP + needR), ih = H - b.top - b.bottom;
    const hr = Math.max(needR, (ih - GAP) / 2), hs = ih - GAP - hr;
    return { narrow, s: [16, 16, b.top, b.bottom + hr + GAP], r: [16, 16, b.top + hs + GAP, b.bottom], split: null };
  }
  function drawS(cv, pad, O) {
    const d = delta(), Y = Math.max(S.gamma * 1.3, 3.2);
    const g = kit.plot(cv, { x: [-0.18, 1.18], y: [-Y, Y], pad, minHeight: MIN_H });
    geoS = g;
    const c = g.ctx, k = TRV.thumbMode ? 2 : 1;
    g.rect(0, g.y0, 1, g.y1, P.cyan, { alpha: 0.05 });
    g.line([[0, g.y0], [0, g.y1]], P.faint, { width: 1 }); g.line([[1, g.y0], [1, g.y1]], P.faint, { width: 1 });
    g.line([[g.x0, 0], [g.x1, 0]], P.faint, { width: 1, alpha: 0.6 });
    g.line([[0.5, g.y0], [0.5, g.y1]], P.cyan, { width: 1.4 * k, dash: [6, 4], alpha: 0.9 });
    // the pole of ζ at s = 1
    const px = g.X(1), py = g.Y(0); c.strokeStyle = P.dim; c.lineWidth = 1.5; c.beginPath(); c.moveTo(px - 5, py - 5); c.lineTo(px + 5, py + 5); c.moveTo(px - 5, py + 5); c.lineTo(px + 5, py - 5); c.stroke();
    for (const z of ZEROS) for (const sg of [1, -1]) if (z <= Y) g.dot(0.5, sg * z, P.dim, 3.2 * k);
    // the two symmetries: the mirror pairs ρ with 1 − ρ̄ (horizontally), conjugation pairs ρ with ρ̄ (vertically)
    if (d > 1e-9) {
      g.line([[O[0].s.re, O[0].s.im], [O[3].s.re, O[3].s.im]], P.magenta, { width: 1, alpha: 0.6, dash: [3, 3] });
      g.line([[O[1].s.re, O[1].s.im], [O[2].s.re, O[2].s.im]], P.magenta, { width: 1, alpha: 0.6, dash: [3, 3] });
    }
    g.line([[O[0].s.re, O[0].s.im], [O[1].s.re, O[1].s.im]], P.dim, { width: 1, alpha: 0.35, dash: [2, 4] });
    const off = d > 1e-9, col = off ? P.magenta : P.cyan;
    O.slice(1).forEach((p) => g.dot(p.s.re, p.s.im, col, 5 * k, { alpha: 0.95 }));
    g.dot(O[0].s.re, O[0].s.im, P.amber, 7 * k, { glow: TRV.thumbMode ? 0 : 12 });
    if (!TRV.thumbMode) {
      const lab = (p, txt, dx) => g.text(p.s.re, p.s.im, txt, P.ink, { align: dx > 0 ? 'left' : 'right', base: 'middle', dx, size: 12 });
      const r = O[0].s.re >= 0.5 ? 1 : -1;
      lab(O[0], 'ρ', 12 * r); lab(O[1], 'ρ̄', 12 * r);
      if (off) { lab(O[3], '1 − ρ̄', -12 * r); lab(O[2], '1 − ρ', -12 * r); }
      g.text(0.5, g.y1, 'Re s = ½', P.cyan, { align: 'left', base: 'top', dx: 6, dy: 4, size: 11 });
      g.text(1, 0, 's = 1', P.dim, { align: 'left', base: 'top', dx: 8, dy: 4, size: 11 });
      g.text(g.x0, g.y0, L('纵向压缩', 'vertical scale compressed'), P.dim, { align: 'left', base: 'bottom', dx: 4, dy: -4, size: 10, face: 'body' });
    }
  }
  function drawW(cv, pad, O) {
    const d = delta(), k = TRV.thumbMode ? 2 : 1;
    // the w plane declares the height its magnifier needs inside it (a lab stage grows to it in one step)
    const g = kit.plot(cv, { x: [-1.25, 1.25], y: [-1.25, 1.25], pad, equal: true, clear: false, minHeight: NEED.mirror });
    const c = g.ctx, circ = []; for (let i = 0; i <= 180; i++) circ.push([Math.cos(i * Math.PI / 90), Math.sin(i * Math.PI / 90)]);
    g.line([[g.x0, 0], [g.x1, 0]], P.faint, { width: 1, alpha: 0.6 }); g.line([[0, g.y0], [0, g.y1]], P.faint, { width: 1, alpha: 0.6 });
    g.line(circ, P.cyan, { width: 1.8 * k });
    for (const z of ZEROS) for (const sg of [1, -1]) { const w = cay(C(0.5, sg * z)); g.dot(w.re, w.im, P.dim, 3.2 * k); }
    // inversion in the circle: w and 1/w̄ on one ray, w̄ and 1/w on its mirror
    for (const p of [O[0], O[1]]) { const r = cabs(p.w) * 1.12; g.line([[0, 0], [p.w.re / cabs(p.w) * r, p.w.im / cabs(p.w) * r]], P.dim, { width: 1, alpha: 0.4, dash: [2, 4] }); }
    const off = d > 1e-9, col = off ? P.magenta : P.cyan;
    O.slice(1).forEach((p) => g.dot(p.w.re, p.w.im, col, 4.5 * k));
    g.dot(O[0].w.re, O[0].w.im, P.amber, 6.5 * k, { glow: TRV.thumbMode ? 0 : 12 });
    g.dot(0, 0, P.dim, 2.5);
    if (TRV.thumbMode) return;
    g.text(-0.71, 0.71, '|w| = 1', P.cyan, { align: 'right', base: 'bottom', dx: -6, dy: -4, size: 11 });
    g.text(O[0].w.re, O[0].w.im, 'w', P.amber, { align: 'left', base: 'bottom', dx: 8, dy: -6, size: 12 });
    g.text(1.25, -1.25, 'w = (s − 1)/s', P.dim, { align: 'right', base: 'bottom', dx: -2, dy: -2, size: 11 });
    // log-polar magnifier: angle across, ln|w| up; the unit circle is the line ln|w| = 0
    const th = Math.abs(Math.atan2(O[0].w.im, O[0].w.re)), lr = Math.abs(Math.log(cabs(O[0].w)));
    const A = Math.max(th * 1.6, 0.02), D = Math.max(lr * 2.4, 2.5e-4);
    // a third of the panel's height, never less than the magnifier's own rows need
    const mw = Math.min(210, g.iw * 0.46), mh = Math.max(MAG_MIN, Math.min(130, g.ih * 0.36)), mx = g.pl + MAG_EDGE, my = g.pt + g.ih - mh - MAG_EDGE;
    c.fillStyle = TRV.alpha(P.void, 0.82); c.fillRect(mx, my, mw, mh); c.strokeStyle = P.amber; c.lineWidth = 1; c.strokeRect(mx + 0.5, my + 0.5, mw - 1, mh - 1);
    const m = kit.plot(cv, { x: [-A, A], y: [-D, D], pad: [mx + 8, g.W - mx - mw + 8, my + MAG_HEAD, g.H - my - mh + MAG_FOOT], clear: false, minHeight: MIN_H });
    m.line([[-A, 0], [A, 0]], P.cyan, { width: 1.6 });
    for (const z of ZEROS) for (const sg of [1, -1]) { const a = sg * (Math.PI - 2 * Math.atan(2 * z)); if (Math.abs(a) <= A) m.dot(a, 0, P.dim, 2.8); }
    O.forEach((p, i) => { const a = Math.atan2(p.w.im, p.w.re), y = Math.log(cabs(p.w)); m.dot(a, y, i === 0 ? P.amber : col, i === 0 ? 5 : 4); });
    c.font = `10.5px ${TRV.fonts.data}`; c.textAlign = 'left'; c.textBaseline = 'top'; c.fillStyle = P.amber;
    c.fillText(L(`放大：角 ±${fix(A * 180 / Math.PI, 1)}° · ln|w| ±${sci(D)}`, `zoom: angle ±${fix(A * 180 / Math.PI, 1)}° · ln|w| ±${sci(D)}`), mx + 6, my + 5);
  }
  function drawQuartic(cv, pad) {
    const d = delta(), gm = S.gamma, t0 = Math.max(0.2, gm - 1.2), t1 = gm + 1.2;
    // the panel holds F under its caption, the gap, ξ under its caption, and the t ticks under ξ; its frame declares
    // all of that, so a lab stage grows to it in one step rather than by halves for each curve
    kit.plot(cv, { x: [0, 1], y: [0, 1], pad, clear: false, minHeight: NEED.quartic });
    const H = cv.clientHeight, ih = H - pad[2] - pad[3] - TICKS, gap = Q_GAP, h1 = (ih - gap) / 2;
    const Fs = [], Xs = []; let fmax = 0, xmax = 0;
    for (let i = 0; i <= 160; i++) { const t = t0 + (t1 - t0) * i / 160, f = quartic(d, gm, t), x = xiLine(t).re; Fs.push([t, f]); Xs.push([t, x]); fmax = Math.max(fmax, f); xmax = Math.max(xmax, Math.abs(x)); }
    const g1 = kit.plot(cv, { x: [t0, t1], y: [0, fmax * 1.08], pad: [pad[0] + 34, pad[1], pad[2] + Q_HEAD, H - pad[2] - h1], clear: false, minHeight: MIN_H });
    g1.axes({ yTicks: [[0, '0']], xTicks: [] });
    g1.line([[t0, 0], [t1, 0]], P.dim, { width: 1 });
    g1.line(Fs, P.cyan, { width: 2 });
    const fmin = 4 * d * d * gm * gm, tm = Math.sqrt(Math.max(0, gm * gm - d * d));
    g1.dot(tm, fmin, P.amber, 5);
    const g2 = kit.plot(cv, { x: [t0, t1], y: [-xmax * 1.15, xmax * 1.15], pad: [pad[0] + 34, pad[1], pad[2] + h1 + gap + Q_HEAD, pad[3] + TICKS], clear: false, minHeight: MIN_H });
    g2.axes({ yTicks: [[0, '0']], xTicks: [[Math.ceil(t0), String(Math.ceil(t0))], [Math.round(gm), String(Math.round(gm))], [Math.floor(t1), String(Math.floor(t1))]] });
    g2.line([[t0, 0], [t1, 0]], P.dim, { width: 1 });
    g2.line(Xs, P.magenta, { width: 2 });
    ZEROS.forEach((z) => { if (z > t0 && z < t1) g2.dot(z, 0, P.dim, 4.5); });
    if (TRV.thumbMode) return;
    const c = g1.ctx; c.font = `600 12px ${TRV.fonts.data}`; c.textAlign = 'left'; c.textBaseline = 'top';
    c.fillStyle = P.cyan; c.fillText(L(`F(½ + it)，最低 ${fix(fmin, fmin < 10 ? 3 : 1)}`, `F(½ + it), lowest ${fix(fmin, fmin < 10 ? 3 : 1)}`), g1.pl + 6, pad[2]);
    c.fillStyle = P.magenta; c.fillText(L('ξ(½ + it)（另一把标尺）', 'ξ(½ + it) (its own scale)'), g2.pl + 6, pad[2] + h1 + gap);
    g2.text(t1, -xmax * 1.15, 't', P.dim, { align: 'right', base: 'bottom', dx: -2, dy: -2, size: 11 });
  }
  const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
  function sci(x) {
    if (x === 0) return '0';
    const e = Math.floor(Math.log10(Math.abs(x)));
    if (e >= -3 && e < 4) return x.toPrecision(3);
    return `${(x / Math.pow(10, e)).toFixed(2)}×10${String(e).split('').map((ch) => SUP[ch]).join('')}`;
  }
  function drawStage() {
    const cv = $('cv'), W = cv.clientWidth || 1, H = cv.clientHeight || 1, pn = panels(W, H), O = orbit(delta(), S.side, S.gamma);
    drawS(cv, pn.s, O);
    if (S.scene === 'mirror') drawW(cv, pn.r, O); else drawQuartic(cv, pn.r);
    if (pn.split && !TRV.thumbMode) { const c = cv.getContext('2d'); c.strokeStyle = P.faint; c.lineWidth = 1; c.beginPath(); c.moveTo(pn.split + 8, pn.s[2]); c.lineTo(pn.split + 8, H - pn.s[3]); c.stroke(); }
    const d = delta(), w = O[0].w, n = distinct(O);
    if (S.scene === 'mirror') {
      $('hudBig').textContent = d > 1e-9 ? L(`四个点 · |w| = ${cabs(w).toFixed(6)}`, `FOUR POINTS · |w| = ${cabs(w).toFixed(6)}`) : L(`两个点 · |w| = 1`, `TWO POINTS · |w| = 1`);
      $('hudSub').textContent = L(`ρ = ${fix(O[0].s.re, 2)} + ${fix(S.gamma, 4)}i：镜像与共轭给出 ${n} 个点；w 的辐角 ${fix(Math.atan2(w.im, w.re) * 180 / Math.PI, 2)}°，ln|w| = ${sci(Math.log(cabs(w)))}`,
        `ρ = ${fix(O[0].s.re, 2)} + ${fix(S.gamma, 4)}i: mirror and conjugation give ${n} points; arg w = ${fix(Math.atan2(w.im, w.re) * 180 / Math.PI, 2)}°, ln|w| = ${sci(Math.log(cabs(w)))}`);
    } else {
      const fmin = 4 * d * d * S.gamma * S.gamma;
      $('hudBig').textContent = L(`伪造的四点组 · F 在线上最低 ${fix(fmin, fmin < 10 ? 3 : 1)}`, `MOCK QUARTET · F ON THE LINE AT LEAST ${fix(fmin, fmin < 10 ? 3 : 1)}`);
      $('hudSub').textContent = L(`零点 ½ ± ${fix(d, 2)} ± ${fix(S.gamma, 2)}i 不在线上；F 沿临界线取实值却不变号，ξ 在 14 与 15 之间变号`, `Zeros ½ ± ${fix(d, 2)} ± ${fix(S.gamma, 2)}i are off the line; F is real along the line and never changes sign, while ξ changes sign between 14 and 15`);
    }
  }

  /* ---------- the strip: how far off the circle, against the height ---------- */
  function drawPlot() {
    const d = delta(), g = kit.plot($('plot'), { x: [1, 40], y: [1e-5, 1], logY: true, pad: [44, 10, 10, 22] });
    g.axes({ yTicks: [[1, '1'], [0.1, '0.1'], [1e-2, '10⁻²'], [1e-3, '10⁻³'], [1e-4, '10⁻⁴']], xTicks: [1, 10, 20, 30, 40] });
    const dd = Math.max(d, 0.1), pts = [];
    for (let t = 1; t <= 40; t += 0.25) pts.push([t, Math.abs(Math.log(cabs(cay(C(0.5 + dd, t)))))]);
    g.line(pts, P.magenta, { dash: d > 1e-9 ? [] : [4, 3] });
    if (d > 1e-9) g.dot(S.gamma, Math.abs(Math.log(cabs(cay(C(0.5 + d, S.gamma))))), P.amber, 4.5);
    $('plotMeta').textContent = `δ = ${fix(dd, 2)}`;
  }

  /* ---------- readouts ---------- */
  function drawText() {
    const d = delta(), O = orbit(d, S.side, S.gamma), w = O[0].w, n = distinct(O);
    $('roKey').textContent = n === 4 ? L('四个点', 'four points') : L('两个点', 'two points');
    $('roKeySub').textContent = n === 4 ? 'ρ, ρ̄, 1 − ρ, 1 − ρ̄' : L('Re ρ = ½：ρ = 1 − ρ̄', 'Re ρ = ½: ρ = 1 − ρ̄');
    $('ro1').textContent = `${fix(O[0].s.re, 2)} + ${fix(S.gamma, 4)}i`;
    $('ro2').textContent = cabs(w).toFixed(6);
    $('ro3').textContent = sci(Math.log(cabs(w)));
    $('ro4').textContent = (cabs(O[0].w) * cabs(O[3].w)).toFixed(9);
    $('roNote').textContent = d > 1e-9 ? L('离开镜面：两个像在圆内，两个在圆外，两两互为反演。', 'Off the mirror: two images inside the circle and two outside, inverse to each other in pairs.')
      : L('在镜面上：四个点两两重合，像落在单位圆上。', 'On the mirror: the four points coincide in pairs and the images lie on the unit circle.');
    $('pillDelta').querySelector('strong').textContent = fix(d, 2);
    $('pillCount').querySelector('strong').textContent = String(n);
  }

  const paint = kit.painter(() => { drawStage(); drawPlot(); drawText(); }, [$('stage'), $('plot')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: RAIL, t: railOf(0.1), rate: 6, step: 1,
    format: (t) => `δ ${fix(Math.max(0, (RAIL - t) / 100), 2)} <small>→ 0</small>`,
    onChange: () => paint()
  });
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { cards.mark(null); S.scene = v; paint(); });
  const fGamma = kit.field($('gamma'), { fmt: (v) => fix(v, 2), onInput: (v) => { cards.mark(null); S.gamma = v; paint(); } });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  // drag ρ in the s plane
  let dragging = false;
  const dragTo = (ev) => {
    if (!geoS) return;
    const b = $('cv').getBoundingClientRect(), x = geoS.invX(ev.clientX - b.left), y = geoS.invY(ev.clientY - b.top);
    const d = Math.min(DMAX, Math.abs(x - 0.5)); S.side = x >= 0.5 ? 1 : -1;
    S.gamma = Math.min(40, Math.max(0.3, Math.abs(y))); fGamma.set(Math.round(S.gamma * 100) / 100);
    clock.set(railOf(Math.round(d * 100) / 100)); paint();
  };
  $('cv').addEventListener('pointerdown', (ev) => {
    if (!geoS) return;
    const b = $('cv').getBoundingClientRect(), px = ev.clientX - b.left, py = ev.clientY - b.top;
    if (px < geoS.pl || px > geoS.pl + geoS.iw || py < geoS.pt || py > geoS.pt + geoS.ih) return;
    dragging = true; try { $('cv').setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events */ }
    cards.mark(null); clock.pause(); dragTo(ev);
  });
  $('cv').addEventListener('pointermove', (ev) => { if (dragging) dragTo(ev); });
  for (const type of ['pointerup', 'pointercancel']) $('cv').addEventListener(type, () => { dragging = false; });
  kit.keys({ 1: () => { cards.mark(null); sceneChips.set('mirror'); }, 2: () => { cards.mark(null); sceneChips.set('quartic'); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    quartet: { scene: 'mirror', d: 0.1, gamma: 2, play: true, still: railOf(0.1) },   // the still: the quartet before the push
    cayley: { scene: 'mirror', d: 0, gamma: 14.134725142 },
    thin: { scene: 'mirror', d: 0.1, gamma: 14 },
    quartic: { scene: 'quartic', d: 0.25, gamma: 14, side: -1 }
  };
  const NOTES = {
    quartet: ['ρ = 0.6 + 2i（琥珀色）。镜像 s ↦ 1 − s̄ 与共轭各给出一个伴，四个点 ρ、ρ̄、1 − ρ、1 − ρ̄ 绕 ½ 成组（品红）；右边它们的像 w、w̄、1/w、1/w̄ 两个在单位圆内、两个在圆外。播放把 ρ 推向镜面：δ 到 0 时四点两两重合成两点（青色），像落到圆上。',
      'ρ = 0.6 + 2i (amber). The mirror s ↦ 1 − s̄ and conjugation each give it a partner, and the four points ρ, ρ̄, 1 − ρ, 1 − ρ̄ group around ½ (magenta); on the right their images w, w̄, 1/w, 1/w̄ lie two inside the unit circle and two outside. Playing pushes ρ onto the mirror: as δ reaches 0 the four points merge into two (cyan) and the images land on the circle.'],
    cayley: ['ρ = ½ + 14.134725i，第一个零点的高度。它在镜面上，像 w 落在单位圆上，辐角 4.05°；灰色是前五个零点（数值结果）在两个平面里的位置，在右边都落在圆上、靠近 1。',
      'ρ = ½ + 14.134725i, the height of the first zero. It is on the mirror, and its image w lies on the unit circle at an angle of 4.05°; in grey, the first five zeros (numerical) in both planes, all on the circle near 1 on the right.'],
    thin: ['ρ = 0.6 + 14i：离镜面 0.1，却在高度 14。右边的像只偏出圆周万分之五：|w| = 0.999491，它的反演 1.000510。左下的放大镜把角度与 ln|w| 拉开，看得见四个像夹着圆周（青线）成一个矩形。',
      'ρ = 0.6 + 14i: 0.1 off the mirror, but at height 14. On the right the images leave the circle by only five parts in ten thousand: |w| = 0.999491, its inverse 1.000510. The magnifier at the lower left stretches angle and ln|w| apart, and the four images straddle the circle (the cyan line) as the corners of a rectangle.'],
    quartic: ['伪造的四点组：δ = ¼，γ = 14，零点 ½ ± ¼ ± 14i 都不在线上。右边上图是同样有这四个零点、同样对称的四次式 F 沿临界线的值：实数、处处为正，最低 49；下图是 ξ(½ + it)，在 14 与 15 之间变号。两条曲线各用各的标尺。',
      'A mock quartet: δ = ¼, γ = 14, zeros ½ ± ¼ ± 14i, none on the line. Top right: the quartic F with these four zeros and the same symmetries, along the critical line: real, positive everywhere, lowest 49. Bottom right: ξ(½ + it), which changes sign between 14 and 15. Each curve has its own scale.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause(); S.scene = p.scene; sceneChips.set(p.scene, true); S.side = p.side || 1; S.gamma = p.gamma; fGamma.set(Math.round(p.gamma * 100) / 100);
    clock.set(railOf(p.d));
    // a still (cover, cited figure shot) and the opening view of the full page show the card's declared frame
    if (TRV.still || (booting && !TRV.embed)) { if (p.still != null) clock.set(p.still); paint(); return; }
    if (!p.play) { paint(); return; }
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：在左边拖动 ρ，或拖动时间轴把它推向镜面。随时可以再选一张卡。', 'Free play: drag ρ on the left, or scrub the rail to push it towards the mirror. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  window.MIRROR_DEBUG = {
    get state() {
      const d = delta(), O = orbit(d, S.side, S.gamma);
      return { scene: S.scene, delta: d, side: S.side, gamma: S.gamma, t: clock.t, playing: clock.playing, preset: cards.current, count: distinct(O),
        points: O.map((p) => [p.s.re, p.s.im]), images: O.map((p) => [p.w.re, p.w.im]), absW: O.map((p) => cabs(p.w)), lnW: Math.log(cabs(O[0].w)), argW: Math.atan2(O[0].w.im, O[0].w.re), fmin: 4 * d * d * S.gamma * S.gamma };
    },
    seek: (t) => { clock.pause(); clock.set(t); },
    xi: (t) => { const x = xiLine(t); return [x.re, x.im]; },
    quartic: (t) => quartic(delta(), S.gamma, t),
    /** Viewport coordinates of the s-plane point σ + it. */
    at: (sigma, t) => { const b = $('cv').getBoundingClientRect(); return [b.left + geoS.X(sigma), b.top + geoS.Y(t)]; }
  };
  window.TRV_THUMB = () => { clock.pause(); S.scene = 'mirror'; S.side = 1; S.gamma = 2; clock.set(railOf(0.1)); paint.now(); };
  cards.pick(cards.initial('quartet'));
  booting = false;
  paint();
})();
