/* CHSH//DIAL · CHSH 角度盘 · The CHSH angle dial
   Two qubits in the Bell state |Φ⁺⟩. Alice sets two directions A₀, A₁ and Bob two directions B₀, B₁ in the (Z, X)
   plane, angles measured from Z (up) towards X (right). On |Φ⁺⟩ two coplanar directions correlate as cos(a − b), and
   the CHSH value is ⟨S⟩ = E₀₀ + E₀₁ + E₁₀ − E₁₁.
   The stage has two parts:
     dial    the four arrows (Alice solid, Bob dashed) and the magenta rhombi of the areas each pair opens;
             in the hidden scene a ring of 360 hidden directions, each coloured by its CHSH value +2 (cyan) or −2 (magenta)
     gauge   the four terms stacked from 0 (cyan steps), the CHSH value (amber bar), the classical bound ±2 (dashed),
             the top line ±2√2, and the four spectrum points ±√(4 ± N) of these directions (magenta)
   In the arc scene the dial gives way to the cosine arc against the polyline of the hidden-direction model.
   The rail turns Bob's pair as a whole: B₀ points at φ and B₁ at φ − β.
   Read-only probe for the browser suite: window.CHSH_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, sgn, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, DEG = PI / 180, R2 = Math.SQRT2, TOP = 2 * R2;
  const TH = TRV.thumbMode ? 2 : 1;            // thicker strokes on the wordless cover
  const NF = 360;                              // hidden directions λ = 0.5°, 1.5°, …, 359.5°, weight 1/360 each
  const YG = [-3.15, 3.15];                    // the gauge
  const RH = 0.55;                             // the rhombi are spanned by the arrows scaled to this length

  /* ---------- the model ---------- */
  /** An angle in degrees brought to (−180°, 180°]. */
  const wrap = (d) => { let x = ((d + 180) % 360 + 360) % 360 - 180; if (x === -180) x = 180; return x; };
  const dirs = () => ({ a0: S.a0, a1: S.a1, b0: S.phi, b1: S.phi - S.beta });
  /** On |Φ⁺⟩, coplanar directions a, b in the (Z, X) plane: E = cos(a − b). */
  const corr = (a, b) => Math.cos((a - b) * DEG);
  function quantum(d) {
    const E = [corr(d.a0, d.b0), corr(d.a0, d.b1), corr(d.a1, d.b0), corr(d.a1, d.b1)];
    return { E, S: E[0] + E[1] + E[2] - E[3] };
  }
  /** N = 4 |sin α sin β| and the four spectrum points ±√(4 ± N). */
  function areas(d) {
    const sa = Math.sin((d.a1 - d.a0) * DEG), sb = Math.sin((d.b0 - d.b1) * DEG), N = 4 * Math.abs(sa * sb);
    return { sa, sb, N, hi: Math.sqrt(4 + N), lo: Math.sqrt(Math.max(0, 4 - N)), reach: Math.sqrt(Math.max(0, 4 + 4 * sa * sb)) };
  }
  /** The answer ±1 of the toy model: sgn(cos(λ − θ)), a value of 0 counted as +1. */
  const out = (th, lam) => (Math.cos((lam - th) * DEG) >= 0 ? 1 : -1);
  const LAMBDA = Array.from({ length: NF }, (_, k) => k + 0.5);
  function classical(d) {
    const per = new Int8Array(NF), E = [0, 0, 0, 0];
    let plus = 0, sum = 0;
    for (let k = 0; k < NF; k++) {
      const l = LAMBDA[k], A0 = out(d.a0, l), A1 = out(d.a1, l), B0 = out(d.b0, l), B1 = out(d.b1, l);
      const c = A0 * B0 + A0 * B1 + A1 * B0 - A1 * B1;
      per[k] = c; sum += c; if (c > 0) plus++;
      E[0] += A0 * B0; E[1] += A0 * B1; E[2] += A1 * B0; E[3] += A1 * B1;
    }
    return { per, plus, S: sum / NF, E: E.map((x) => x / NF) };
  }
  /** The correlation of the toy model for directions 0 and Δ. */
  const toyCorr = (delta) => { let s = 0; for (const l of LAMBDA) s += out(0, l) * out(delta, l); return s / NF; };
  const TOY_LINE = Array.from({ length: 361 }, (_, i) => [i / 2, toyCorr(i / 2)]);

  /* ---------- state ---------- */
  const S = { scene: 'dial', a0: 0, a1: 90, beta: 90, phi: 45 };
  let drag = null;                             // the arrow being dragged: 'a0' | 'a1' | 'b0' | 'b1'

  /* ---------- layout: dial (or arc) on the left, gauge on the right ---------- */
  let boxes = null, dialG = null, gaugeG = null;
  function layout(W, H) {
    const st = $('stage').getBoundingClientRect(), below = (el) => (el ? el.getBoundingClientRect().bottom - st.top : 0);
    const thumb = TRV.thumbMode;
    const top = thumb ? 24 : Math.max(46, below($('hudBig').parentElement), below($('sceneChips'))) + 6;
    const bottom = thumb ? 24 : Math.max(16, $('legend').offsetHeight + 16);
    const h = Math.max(140, H - top - bottom);
    const gw = W < 560 ? clamp(W * 0.3, 104, 140) : clamp(W * 0.22, 150, 210);
    return { d: { x: 8, y: top, w: W - gw - 22, h }, g: { x: W - gw - 8, y: top, w: gw, h } };
  }
  const padOf = (bx, W, H, l, r, t, b) => [bx.x + l, W - bx.x - bx.w + r, bx.y + t, H - bx.y - bx.h + b];
  const tagAt = (key, g, x, y, html, cls, dx, dy) => stage.tag(key, [g.X(x), g.Y(y)], html, cls, { screen: true, dx: dx || 0, dy: dy || 0 });
  const pt = (deg, r) => [r * Math.sin(deg * DEG), r * Math.cos(deg * DEG)];
  function arrow2(g, x1, y1, color, w, dash) {
    const c = g.ctx, ax = g.X(0), ay = g.Y(0), bx = g.X(x1), by = g.Y(y1), dx = bx - ax, dy = by - ay, l = Math.hypot(dx, dy);
    c.save(); c.strokeStyle = c.fillStyle = color; c.lineWidth = w * TH; c.lineCap = 'round'; c.setLineDash(dash ? [7 * TH, 5 * TH] : []);
    c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx, by); c.stroke(); c.setLineDash([]);
    if (l > 6) { const hs = Math.min(12 * TH, l * 0.5), ux = dx / l, uy = dy / l; c.beginPath(); c.moveTo(bx, by); c.lineTo(bx - ux * hs - uy * hs * 0.45, by - uy * hs + ux * hs * 0.45); c.lineTo(bx - ux * hs + uy * hs * 0.45, by - uy * hs - ux * hs * 0.45); c.closePath(); c.fill(); }
    c.restore();
  }
  const NAME = { a0: 'A₀', a1: 'A₁', b0: 'B₀', b1: 'B₁' };

  /* ---------- dial ---------- */
  function drawDial(W, H, d, cl) {
    const b = boxes.d, cv = $('cv'), hidden = S.scene === 'hidden';
    const g = kit.plot(cv, { x: [-1.36, 1.36], y: [-1.3, 1.3], equal: true, pad: padOf(b, W, H, 4, 4, 4, 4), clear: false });
    dialG = g;
    // the measurement plane: Z up, X right
    g.line([[0, -1.04], [0, 1.04]], P.faint, { width: TH }); g.line([[-1.04, 0], [1.04, 0]], P.faint, { width: TH });
    const ring = []; for (let i = 0; i <= 180; i++) ring.push(pt(i * 2, 1));
    g.line(ring, P.lineHot, { width: 1.4 * TH });
    if (hidden) {
      // one tick per hidden direction, cyan where its CHSH value is +2 and magenta where it is −2
      const c = g.ctx; c.save(); c.lineWidth = 2 * TH; c.lineCap = 'butt';
      for (let k = 0; k < NF; k++) {
        const p0 = pt(LAMBDA[k], 1.04), p1 = pt(LAMBDA[k], 1.13);
        c.strokeStyle = cl.per[k] > 0 ? P.cyan : P.magenta; c.globalAlpha = 0.9;
        c.beginPath(); c.moveTo(g.X(p0[0]), g.Y(p0[1])); c.lineTo(g.X(p1[0]), g.Y(p1[1])); c.stroke();
      }
      c.restore();
    } else {
      // the areas each side opens: the parallelogram of the two arrows scaled to RH
      const rh = (u, v) => { const p = pt(u, RH), q = pt(v, RH); return [[0, 0], p, [p[0] + q[0], p[1] + q[1]], q]; };
      g.poly(rh(d.a0, d.a1), P.magenta, { alpha: 0.24, stroke: P.magenta, width: 1.4 * TH });
      g.poly(rh(d.b0, d.b1), P.magenta, { alpha: 0.14, stroke: P.magenta, width: 1.2 * TH, strokeAlpha: 0.7 });
    }
    // the arrows: Alice solid, Bob dashed; the one being dragged in amber
    for (const k of ['b0', 'b1', 'a0', 'a1']) {
      const p = pt(d[k], 1), col = drag === k ? P.amber : P.ink;
      arrow2(g, p[0], p[1], col, k[0] === 'a' ? 2.6 : 2, k[0] === 'b');
      g.dot(p[0], p[1], col, (k[0] === 'a' ? 4.2 : 3.4) * TH, k[0] === 'b' ? { ring: true, width: 1.6 * TH } : {});
    }
    g.dot(0, 0, P.ink, 2.5 * TH);
    if (!TRV.thumbMode) {
      tagAt('zAx', g, 0, 0.9, 'Z', 'raw dim', -12, 0); tagAt('xAx', g, 0.9, 0, 'X', 'raw dim', 0, 12);
      // names at the tips; directions closer than 12° share one label
      const list = ['a0', 'a1', 'b0', 'b1'].map((k) => ({ k, a: wrap(d[k]) })).sort((u, v) => u.a - v.a), groups = [];
      for (const it of list) { const gr = groups.find((x) => Math.abs(wrap(x.a - it.a)) < 12); if (gr) gr.ks.push(it.k); else groups.push({ a: it.a, ks: [it.k] }); }
      const R = hidden ? 1.25 : 1.15;
      groups.forEach((gr, i) => { const p = pt(gr.a, R); tagAt('n' + gr.ks[0], g, p[0], p[1], gr.ks.map((k) => NAME[k]).join(' '), drag && gr.ks.includes(drag) ? 'raw hot' : 'raw ink'); });
      if (!hidden) {
        // the two areas, read off below the circle (never on top of the arrows' names)
        const ar = areas(d);
        tagAt('arAB', g, 0, -1.19, `${L('面积', 'areas')} |sin α| ${fix(Math.abs(ar.sa), 2)} · |sin β| ${fix(Math.abs(ar.sb), 2)}`, 'raw mg');
      }
    }
  }

  /* ---------- arc against polyline ---------- */
  function pairs(d) {
    return [['a0', 'b0', 1, 'E₀₀'], ['a0', 'b1', 1, 'E₀₁'], ['a1', 'b0', 1, 'E₁₀'], ['a1', 'b1', -1, '−E₁₁']]
      .map(([u, v, s, n]) => ({ n, s, x: Math.abs(wrap(d[u] - d[v])), q: corr(d[u], d[v]) }));
  }
  function drawArc(W, H, d, cl) {
    const b = boxes.d, cv = $('cv');
    const g = kit.plot(cv, { x: [0, 180], y: [-1.12, 1.12], pad: padOf(b, W, H, 30, 10, 6, 20), clear: false });
    dialG = null;
    g.axes({ yTicks: TRV.thumbMode ? [] : [[-1, '−1'], [-0.5, '−½'], [0, '0'], [0.5, '½'], [1, '1']], xTicks: TRV.thumbMode ? [] : [[0, '0°'], [45, '45°'], [90, '90°'], [135, '135°'], [180, '180°']], xLabel: TRV.thumbMode ? '' : L('两方向的夹角', 'angle between the two') });
    g.hline(0, P.faint, {});
    g.line(TOY_LINE, P.dim, { width: 2 * TH });
    const arc = []; for (let i = 0; i <= 360; i++) arc.push([i / 2, Math.cos(i / 2 * DEG)]);
    g.line(arc, P.cyan, { width: 2.4 * TH, glow: 6 });
    const pr = pairs(d), cE = cl.E;
    pr.forEach((p, i) => {
      const t = cE[i];
      g.line([[p.x, t], [p.x, p.q]], P.magenta, { width: 3.2 * TH, alpha: 0.85 });
      g.dot(p.x, t, P.dim, 4 * TH); g.dot(p.x, p.q, P.cyan, 5 * TH, { glow: 10 });
    });
    if (!TRV.thumbMode) {
      // one label per angle: the names of the pairs that sit there
      const at = []; pr.forEach((p) => { const a = at.find((x) => Math.abs(x.x - p.x) < 6); if (a) a.n.push(p.n); else at.push({ x: p.x, q: p.q, n: [p.n] }); });
      at.forEach((a, i) => tagAt('pr' + i, g, a.x, a.q, a.n.join(' '), 'raw cy', 0, a.q >= 0 ? -16 : 16));
    }
  }

  /* ---------- gauge ---------- */
  function drawGauge(W, H, q, cl, ar) {
    const b = boxes.g, cv = $('cv'), hidden = S.scene === 'hidden';
    const g = kit.plot(cv, { x: [0, 5], y: YG, pad: padOf(b, W, H, 34, 4, 4, 20), clear: false });
    gaugeG = g;
    g.axes({ yTicks: TRV.thumbMode ? [] : [[-TOP, '−2√2'], [-2, '−2'], [0, '0'], [2, '2'], [TOP, '2√2']], xTicks: TRV.thumbMode ? [] : [[0.5, '00'], [1.5, '01'], [2.5, '10'], [3.5, '−11'], [4.5, 'S']] });
    g.rect(0, -2, 5, 2, P.ink, { alpha: 0.05 });
    g.hline(2, P.ink, { dash: [5, 4], alpha: 0.75, width: 1.3 * TH }); g.hline(-2, P.ink, { dash: [5, 4], alpha: 0.75, width: 1.3 * TH });
    g.hline(TOP, P.ink, { alpha: 0.45, width: 1.3 * TH }); g.hline(-TOP, P.ink, { alpha: 0.45, width: 1.3 * TH });
    if (!hidden) {
      // the four spectrum points of these directions
      for (const y of [ar.hi, -ar.hi]) g.line([[0.05, y], [4.95, y]], P.magenta, { width: 2.4 * TH, glow: 6 });
      if (ar.N > 1e-9) for (const y of [ar.lo, -ar.lo]) g.line([[0.05, y], [4.95, y]], P.magenta, { width: 1.2 * TH, dash: [3, 4], alpha: 0.6 });
    }
    // the four terms stacked from 0
    const terms = hidden ? [cl.E[0], cl.E[1], cl.E[2], -cl.E[3]] : [q.E[0], q.E[1], q.E[2], -q.E[3]], col = hidden ? P.dim : P.cyan;
    let cum = 0, barTop = 0, barBot = 0;
    terms.forEach((t, i) => {
      barTop = Math.max(barTop, cum, cum + t); barBot = Math.min(barBot, cum, cum + t);
      g.rect(i + 0.18, cum, i + 0.82, cum + t, col, { alpha: hidden ? 0.45 : 0.55, stroke: col, strokeAlpha: 0.9 });
      if (i < 3) g.line([[i + 0.82, cum + t], [i + 1.18, cum + t]], col, { width: TH, alpha: 0.7 });
      cum += t;
    });
    const val = hidden ? cl.S : q.S;
    g.line([[3.82, val], [4.18, val]], P.amber, { width: TH, alpha: 0.7 });
    g.rect(4.18, 0, 4.82, val, P.amber, { alpha: 0.28 });
    g.line([[0.05, val], [4.95, val]], P.amber, { width: 2.6 * TH, glow: 12 });
    if (hidden) g.line([[0.05, q.S], [4.95, q.S]], P.ink, { width: 1.3 * TH, dash: [2, 3], alpha: 0.8 });
    if (!TRV.thumbMode) {
      // the value sits on the side of the bar away from a magenta mark just beyond it (e.g. 2.5 under √7)
      const crowd = !hidden && Math.abs(val) > 1e-9 && ar.hi - Math.abs(val) > 0.02 && ar.hi - Math.abs(val) < 0.4;
      // on the hidden scene the Bell-state label clears the stacked bars on its side of the amber bar, and the amber value takes the other side
      const qUp = hidden && q.S >= cl.S;
      const up = hidden ? !qUp : (val >= 0) !== crowd;
      tagAt('gS', g, 4.5, val, fix(val, 3), 'raw hot', 0, up ? -11 : 11);
      if (hidden) tagAt('gQ', g, 2, qUp ? Math.max(q.S, barTop) : Math.min(q.S, barBot), L(`贝尔态 ${fix(q.S, 3)}`, `Bell state ${fix(q.S, 3)}`), 'raw ink', 0, qUp ? -10 : 12);
      const hiTxt = Math.abs(ar.hi - TOP) < 1e-3 ? '' : `√(4+N) ${fix(ar.hi, 3)}`;
      if (!hidden && hiTxt && Math.abs(ar.hi - val) > 0.18 && Math.abs(ar.hi - 2) > 0.12) tagAt('gHi', g, 2, ar.hi, hiTxt, 'raw mg', 0, ar.hi > val ? -10 : 10);
    }
  }

  /* ---------- stage ---------- */
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), rotate: false,
    onPick: (ev) => { const k = which(ev); if (!k) return false; drag = k; aim(ev); return true; },
    onDrag: (ev) => { if (drag) aim(ev); },
    onDrop: () => { drag = null; paint(); }
  });
  /** The arrow nearest the pointer (by angle) when the pointer is on the dial, away from its centre. */
  function which(ev) {
    if (S.scene === 'arc' || !dialG) return null;
    const r = $('cv').getBoundingClientRect(), x = dialG.invX(ev.clientX - r.left), y = dialG.invY(ev.clientY - r.top), rr = Math.hypot(x, y);
    if (rr < 0.25 || rr > 1.32) return null;
    const a = Math.atan2(x, y) / DEG, d = dirs();
    let best = null, bd = 1e9;
    for (const k of ['a0', 'a1', 'b0', 'b1']) { const e = Math.abs(wrap(d[k] - a)); if (e < bd - 1e-9) { bd = e; best = k; } }
    return bd < 30 ? best : null;
  }
  function aim(ev) {
    if (!dialG) return;
    const r = $('cv').getBoundingClientRect(), x = dialG.invX(ev.clientX - r.left), y = dialG.invY(ev.clientY - r.top);
    if (Math.hypot(x, y) < 0.08) return;
    const a = Math.round(Math.atan2(x, y) / DEG);
    cards.mark(null);
    const d = dirs();
    if (drag === 'a0') S.a0 = wrap(a);
    else if (drag === 'a1') S.a1 = wrap(a);
    else if (drag === 'b0') { S.beta = wrap(a - d.b1); setPhi(wrap(a)); return; }
    else if (drag === 'b1') S.beta = wrap(d.b0 - a);
    syncFields(); paint();
  }
  let last = {};
  function drawStage() {
    const cv = $('cv'), W = cv.clientWidth, H = cv.clientHeight;
    boxes = layout(W, H);
    const d = dirs(), q = quantum(d), cl = classical(d), ar = areas(d);
    stage.begin();
    if (S.scene === 'arc') drawArc(W, H, d, cl); else drawDial(W, H, d, cl);
    drawGauge(W, H, q, cl, ar);
    stage.end();
    last = { d, q, cl, ar };
  }

  /* ---------- strip: the CHSH value as Bob's pair turns ---------- */
  let curveKey = '', curve = null;
  function sweepCurves() {
    const key = [S.a0, S.a1, S.beta].join('|');
    if (key === curveKey) return curve;
    const qs = [], cs = [];
    for (let i = 0; i <= 360; i++) {
      const phi = -180 + i, d = { a0: S.a0, a1: S.a1, b0: phi, b1: phi - S.beta };
      qs.push([phi, quantum(d).S]); cs.push([phi, classical(d).S]);
    }
    curveKey = key; curve = { qs, cs };
    return curve;
  }
  function drawPlot() {
    const cv = $('plot'), ar = areas(dirs()), cu = sweepCurves();
    $('plotTitle').innerHTML = L('转动 Bob 的一对方向', 'Turning Bob\'s pair');
    const g = kit.plot(cv, { x: [-180, 180], y: [-3.1, 3.1], pad: [34, 10, 8, 22] });
    g.axes({ yTicks: [[-TOP, '−2√2'], [-2, '−2'], [0, '0'], [2, '2'], [TOP, '2√2']], xTicks: [[-180, '−180°'], [-90, '−90°'], [0, '0°'], [45, '45°'], [90, '90°'], [180, '180°']] });
    g.hline(2, P.ink, { dash: [5, 4], alpha: 0.7 }); g.hline(-2, P.ink, { dash: [5, 4], alpha: 0.7 });
    g.hline(ar.hi, P.magenta, { alpha: 0.8, width: 1.4 }); g.hline(-ar.hi, P.magenta, { alpha: 0.8, width: 1.4 });
    g.line(cu.cs, P.dim, { width: 1.8 });
    g.line(cu.qs, P.cyan, { width: 2 });
    g.vline(S.phi, P.amber, { alpha: 0.85 });
    let mq = -9, mc = -9; for (const p of cu.qs) mq = Math.max(mq, p[1]); for (const p of cu.cs) mc = Math.max(mc, p[1]);
    $('plotMeta').innerHTML = `<i class="sw cy"></i> ${L('贝尔态', 'Bell state')} ≤ ${fix(mq, 3)} · <i class="sw dm"></i> ${L('隐方向', 'hidden')} ≤ ${fix(mc, 3)} · <i class="sw mg"></i> ±√(4+N)`;
  }

  /* ---------- readouts, HUD, legend ---------- */
  const row = (cls, zh, en, val) => `<div class="${cls}"><dt>${L(zh, en)}</dt><dd>${val}</dd></div>`;
  const deg = (x) => `${fix(x, 0)}°`;
  const LEGEND = {
    dial: [['cy', '四个余弦的加减', 'the four cosines, added and subtracted'], ['mg', '两侧张开的面积 · √(4 ± N)', 'the areas the two sides open · √(4 ± N)'], ['am', 'CHSH 值', 'CHSH value'], ['dm', '实线 Alice · 虚线 Bob · 虚线 ±2', 'solid Alice · dashed Bob · dashed ±2']],
    hidden: [['cy', '给 +2 的隐方向', 'hidden directions giving +2'], ['mg', '给 −2 的隐方向', 'hidden directions giving −2'], ['am', '经典模型的 S', 'S of the classical model'], ['dm', '虚线 ±2 · 点线 贝尔态', 'dashed ±2 · dotted Bell state']],
    arc: [['cy', '余弦弧（贝尔态）', 'cosine arc (Bell state)'], ['dm', '隐方向模型的折线', 'polyline of the hidden-direction model'], ['mg', '弧与折线之差', 'arc minus line'], ['am', 'CHSH 值', 'CHSH value']]
  };
  function drawText() {
    const d = dirs(), q = quantum(d), cl = classical(d), ar = areas(d);
    const alpha = wrap(d.a1 - d.a0), beta = wrap(S.beta);
    let big, sub, key, keyName, note, pill;
    const angles = `α ${deg(alpha)} · β ${deg(beta)} · φ ${deg(S.phi)}`;
    if (S.scene === 'hidden') {
      big = `S = ${fix(cl.S, 3)}`;
      sub = L(`隐方向模型 · ${cl.plus}/360 个给 +2 · ${angles}`, `hidden-direction model · ${cl.plus}/360 give +2 · ${angles}`);
      keyName = L('经典模型的 S', 'S of the classical model'); key = fix(cl.S, 4);
      note = L(`360 个隐方向里 ${cl.plus} 个给 +2、${NF - cl.plus} 个给 −2，平均 ${fix(cl.S, 3)}；同样四个方向在贝尔态上是 ${fix(q.S, 3)}。`, `Of the 360 hidden directions ${cl.plus} give +2 and ${NF - cl.plus} give −2, mean ${fix(cl.S, 3)}; on the Bell state the same four directions give ${fix(q.S, 3)}.`);
      pill = [L('经典 S', 'CLASSICAL S'), fix(cl.S, 3)];
    } else if (S.scene === 'arc') {
      big = `${L('弧', 'arc')} ${fix(q.S, 3)} · ${L('折线', 'line')} ${fix(cl.S, 3)}`;
      sub = L(`四段之差加起来 ${sgn(q.S - cl.S, 3)} · ${angles}`, `the four gaps add up to ${sgn(q.S - cl.S, 3)} · ${angles}`);
      keyName = L('弧 − 折线', 'arc − line'); key = sgn(q.S - cl.S, 4);
      note = L('品红的竖段是同一个夹角下余弦弧与折线之差；第四项带减号，弧低于折线时它也往 S 上加。', 'Each magenta segment is the gap between the cosine arc and the line at one angle; the fourth term carries a minus sign, so where the arc dips below the line it still adds to S.');
      pill = [L('差', 'GAP'), sgn(q.S - cl.S, 3)];
    } else {
      big = `⟨S⟩ = ${fix(q.S, 3)}`;
      sub = `${angles} · <span class="c-mg">√(4+N) = ${fix(ar.hi, 3)}</span>`;
      keyName = L('贝尔态上的 CHSH 值', 'CHSH value on the Bell state'); key = fix(q.S, 4);
      note = ar.N < 1e-9 ? L('有一侧的两个方向重合或相反：面积为 0，品红的刻度落在 2，怎么转 Bob 都越不过。', 'One side\'s two directions coincide or are opposite: the area is 0, the magenta mark sits at 2, and no turn of Bob gets past it.')
        : L(`转动 Bob 的一对方向，琥珀色的横线最高到 ${fix(ar.reach, 3)}${ar.reach > ar.hi - 1e-9 ? '，正好是品红的刻度' : '（sin α 与 sin β 异号，只到内侧的刻度）'}。`, `Turning Bob's pair lifts the amber bar at most to ${fix(ar.reach, 3)}${ar.reach > ar.hi - 1e-9 ? ', exactly the magenta mark' : ' (sin α and sin β differ in sign, so only the inner mark is reached)'}.`);
      pill = ['⟨S⟩', fix(q.S, 3)];
    }
    const Es = (E) => E.map((x) => fix(x, 3)).join(' · ');
    const rows = row('c', '四个关联 E₀₀ · E₀₁ · E₁₀ · E₁₁', 'four correlations E₀₀ · E₀₁ · E₁₀ · E₁₁', Es(S.scene === 'hidden' ? cl.E : q.E))
      + row('', '张角 α · β', 'openings α · β', `${deg(alpha)} · ${deg(beta)}`)
      + row('m', '面积参数 N = 4|sin α sin β|', 'area parameter N = 4|sin α sin β|', fix(ar.N, 3))
      + row('m', '这组方向的天花板 √(4 + N)', 'ceiling of these directions √(4 + N)', fix(ar.hi, 4))
      + (S.scene === 'hidden' ? row('', '贝尔态上的 ⟨S⟩', '⟨S⟩ on the Bell state', fix(q.S, 4)) : row('', '隐方向模型的 S', 'S of the hidden-direction model', fix(cl.S, 4)));
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('ro').innerHTML = `<div class="key"><dt>${keyName}</dt><dd><b>${key}</b></dd></div>${rows}`;
    $('roNote').textContent = note; $('roAside').textContent = 'S = E₀₀ + E₀₁ + E₁₀ − E₁₁';
    $('pillScene').querySelector('strong').textContent = { dial: L('角度盘', 'DIAL'), hidden: L('隐方向', 'HIDDEN'), arc: L('弧与折线', 'ARC') }[S.scene];
    $('pillKeyName').textContent = pill[0]; $('pillKey').querySelector('strong').textContent = pill[1];
    $('legend').innerHTML = LEGEND[S.scene].map(([c, zh, en]) => `<span><i class="sw ${c}"></i>${L(zh, en)}</span>`).join('');
  }

  const paint = kit.painter(() => { drawText(); drawStage(); drawPlot(); }, [$('stage'), $('plot')]);

  /* ---------- the rail: φ, the direction of B₀ (B₁ follows at φ − β) ---------- */
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 360, rate: 45, step: 5, t: S.phi + 180,
    // the label is first drawn while the clock is being built: it reads t only
    format: (t) => `φ = ${fix(t - 180, 1)}° <small>/ ±180°</small>`,
    onChange: (t, c) => {
      if (stopAt != null && c.playing && t >= stopAt - 1e-9) { const s = stopAt; stopAt = null; c.pause(); c.set(s); return; }
      S.phi = t - 180;
      paint();
    }
  });
  function setPhi(p) { clock.pause(); stopAt = null; clock.set(p + 180); }
  function setScene(sc) {
    S.scene = sc; sceneChips.set(sc, true);
    paint();
  }

  /* ---------- controls ---------- */
  const leave = () => cards.mark(null);
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  const fA = kit.field($('alpha'), { fmt: (v) => `${v}°`, onInput: (v) => { leave(); S.a1 = wrap(S.a0 + v); paint(); } });
  const fB = kit.field($('beta'), { fmt: (v) => `${v}°`, onInput: (v) => { leave(); S.beta = v; paint(); } });
  function syncFields() { fA.set(Math.round(wrap(S.a1 - S.a0))); fB.set(Math.round(wrap(S.beta))); }
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('dial'); }, 2: () => { leave(); setScene('hidden'); }, 3: () => { leave(); setScene('arc'); } });

  /* ---------- experiment cards ---------- */
  /** φ at which turning Bob's pair gives the largest ⟨S⟩: the argument of Z = e^{ia₀} + e^{i(a₀+β)} + e^{ia₁} − e^{i(a₁+β)}. */
  function bestPhi(a0, a1, b) {
    const re = Math.cos(a0 * DEG) + Math.cos((a0 + b) * DEG) + Math.cos(a1 * DEG) - Math.cos((a1 + b) * DEG);
    const im = Math.sin(a0 * DEG) + Math.sin((a0 + b) * DEG) + Math.sin(a1 * DEG) - Math.sin((a1 + b) * DEG);
    return Math.atan2(im, re) / DEG;
  }
  const PRESETS = {
    collinear: { scene: 'dial', a0: 0, a1: 0, beta: 60, from: -90, to: 90, still: -40 },
    sixty: { scene: 'dial', a0: 0, a1: 60, beta: 60, from: 0, to: bestPhi(0, 60, 60), still: 0 },
    sweep: { scene: 'dial', a0: 0, a1: 90, beta: 90, from: 0, to: 90, still: 20 },
    tsirelson: { scene: 'dial', a0: 0, a1: 90, beta: 90, still: 45 },
    hidden: { scene: 'hidden', a0: 0, a1: 90, beta: 90, from: 0, to: 180, still: 120 },
    arc: { scene: 'arc', a0: 0, a1: 90, beta: 90, still: 45 }
  };
  const NOTES = {
    collinear: ['Alice 的两支实线箭头重合在 Z 上，她那块品红面积缩成一条线，量尺上品红的刻度落到 2，和经典上界的虚线重合。时间轴转动 Bob 的一对虚线箭头：琥珀色的横线按 2 cos φ 起落，在 φ = 0° 碰到 2，从不越过；停在 φ = −40° 时它是 1.532，在品红的刻度之下。', 'Alice\'s two solid arrows coincide on Z; her magenta area shrinks to a line, and the magenta mark on the gauge drops to 2, onto the dashed classical bound. The rail turns Bob\'s dashed pair: the amber bar rises and falls as 2 cos φ, touches 2 at φ = 0° and never goes past; stopped at φ = −40° it reads 1.532, below the magenta mark.'],
    sixty: ['两侧各张 60°，两块品红面积相同，N = 3。φ = 0° 时四段青色 1 + ½ + ½ + ½ 叠到 2.5，越过了虚线 2，离品红的刻度 √7 ≈ 2.646 还差一截；内侧的品红点线在 ±1。Bob 的一对方向转到 19.1°，琥珀色的横线正好碰到 √7。', 'Both sides open 60°, two equal magenta areas, N = 3. At φ = 0° the four cyan steps 1 + ½ + ½ + ½ stack to 2.5, past the dashed 2 but short of the magenta mark √7 ≈ 2.646; the inner dotted magenta marks sit at ±1. Turn Bob\'s pair to 19.1° and the amber bar just touches √7.'],
    sweep: ['两侧都是直角，两块品红面积都是整个正方形，品红的刻度在 2√2。起点 0° 时 Bob 的十字架与 Alice 的对齐（B₀ 在 A₀ 上，B₁ 与 A₁ 相反），四段青色只是 1 + 0 + 0 + 1 = 2。时间轴把 Bob 的十字架从 0° 转到 90°：琥珀色的横线按 2√2 cos(φ − 45°) 起落，在 0° 与 90° 是 2，只在 45° 碰到品红的刻度 2√2。停在 20° 时，它是 2.563。', 'Both sides at right angles, both magenta areas full squares, the magenta mark at 2√2. At the start, 0°, Bob\'s cross is aligned with Alice\'s (B₀ on A₀, B₁ opposite A₁) and the four cyan steps are just 1 + 0 + 0 + 1 = 2. The rail turns Bob\'s cross from 0° to 90°. The amber bar rises and falls as 2√2 cos(φ − 45°): 2 at 0° and at 90°, touching the magenta mark 2√2 only at 45°. Stopped at 20° it reads 2.563.'],
    tsirelson: ['Bob 的十字架转过 45°：B₀ 在 A₀ 与 A₁ 正中，B₁ 在 −45°。三对方向夹 45°，第四对 A₁、B₁ 夹 135°。四段青色各长 0.707，最后一段的余弦是负的、前面又是减号，也往上叠，合计 2√2 ≈ 2.828，正好顶到品红的刻度与量尺顶上的线。', 'Bob\'s cross turned by 45°: B₀ halfway between A₀ and A₁, B₁ at −45°. Three pairs meet at 45°, the fourth pair A₁, B₁ at 135°. Each cyan step is 0.707; the last cosine is negative and carries a minus sign, so it stacks upward too, for 2√2 ≈ 2.828 in all, right at the magenta mark and the line at the top of the gauge.'],
    hidden: ['同样的两个十字架，换成经典的隐方向模型：环上 360 个刻度，每个隐方向的 CHSH 值只能是 +2（青色）或 −2（品红）。Bob 的十字架从 0° 转到 180°：到 90° 为止 360 个刻度全是青色，琥珀色的横线钉在 2；再往后品红的刻度越来越多，横线跟着往下落，到 180° 是 −2。停在 120° 时 240 个青色、120 个品红，横线在 (240 · 2 − 120 · 2)/360 ≈ 0.667。点线是贝尔态上的 ⟨S⟩，在 45° 升到 2.828，在 120° 是 0.732。', 'The same two crosses against the classical hidden-direction model: 360 ticks on the ring, and each hidden direction gives a CHSH value of only +2 (cyan) or −2 (magenta). As Bob\'s cross turns from 0° to 180°, up to 90° all 360 ticks stay cyan and the amber bar stays pinned at 2; after that more and more ticks turn magenta and the bar sinks with them, to −2 at 180°. Stopped at 120° there are 240 cyan and 120 magenta ticks, and the bar sits at (240 · 2 − 120 · 2)/360 ≈ 0.667. The dotted line is ⟨S⟩ on the Bell state: 2.828 at 45°, 0.732 at 120°.'],
    arc: ['横轴是两方向的夹角。三对方向落在 45°，青色的弧比暗色的折线高 0.207；第四对落在 135°，弧比折线低 0.207，这一项带减号，也算 +0.207。四段品红合计 0.828 = 2√2 − 2：弧上的四个点叠成 2.828，折线上的叠成 2。在 0°、90°、180° 弧与折线重合。', 'The horizontal axis is the angle between two directions. Three pairs land at 45°, where the cyan arc stands 0.207 above the dark polyline; the fourth lands at 135°, where the arc is 0.207 below it, and with its minus sign that also counts +0.207. The four magenta segments add up to 0.828 = 2√2 − 2: the points on the arc stack to 2.828, those on the line to 2. Arc and line meet at 0°, 90° and 180°.']
  };
  let booting = true, tw = null;
  function applyPreset(id) {
    const p = PRESETS[id];
    if (tw) { tw.cancel(); tw = null; }
    clock.pause(); stopAt = null;
    setScene(p.scene);
    const startPhi = (TRV.still || (booting && !TRV.embed) || p.from == null) ? p.still : p.from;
    const go = () => {
      syncFields();
      // a still (cover, cited figure shot) and the opening view of the full page show the card's telling frame;
      // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
      if (p.from == null || TRV.still || (booting && !TRV.embed)) return;
      stopAt = p.to + 180;
      if (booting) kit.autoplay(clock, $('stage')); else clock.play();
    };
    if (booting || TRV.still) { S.a0 = p.a0; S.a1 = p.a1; S.beta = p.beta; clock.set(startPhi + 180); go(); return; }
    // a click: the arrows swing to the card's directions, then the card plays
    const s0 = { a0: S.a0, a1: S.a1, beta: S.beta, phi: S.phi }, s1 = { a0: p.a0, a1: p.a1, beta: p.beta, phi: startPhi };
    const shortest = (u, v) => u + wrap(v - u);
    const t1 = { a0: shortest(s0.a0, s1.a0), a1: shortest(s0.a1, s1.a1), beta: shortest(s0.beta, s1.beta), phi: shortest(s0.phi, s1.phi) };
    tw = kit.tween(600, (e) => {
      S.a0 = s0.a0 + (t1.a0 - s0.a0) * e; S.a1 = s0.a1 + (t1.a1 - s0.a1) * e; S.beta = s0.beta + (t1.beta - s0.beta) * e;
      clock.set(wrap(s0.phi + (t1.phi - s0.phi) * e) + 180);
    }, () => { tw = null; S.a0 = p.a0; S.a1 = p.a1; S.beta = p.beta; clock.set(startPhi + 180); go(); });
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖动盘上的任何一支箭头，改两侧的张角，或用时间轴转动 Bob 的一对方向。随时可以再选一张卡。', 'Free play: drag any arrow on the dial, change the two openings, or turn Bob\'s pair with the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.CHSH_DEBUG = {
    get state() {
      const d = dirs(), q = quantum(d), cl = classical(d), ar = areas(d);
      return {
        scene: S.scene, preset: cards.current, t: clock.t, max: clock.max, playing: clock.playing, phi: S.phi,
        dirs: d, alpha: wrap(d.a1 - d.a0), beta: wrap(S.beta), E: q.E.slice(), S: q.S, N: ar.N, hi: ar.hi, lo: ar.lo, reach: ar.reach,
        classical: { S: cl.S, plus: cl.plus, E: cl.E.slice(), per: Array.from(cl.per) },
        fields: { alpha: Number($('alpha').value), beta: Number($('beta').value) }
      };
    },
    /** The quantum and classical CHSH value over a full turn of Bob's pair (the strip's two curves). */
    sweep: () => { const c = sweepCurves(); return { q: c.qs.map((p) => p.slice()), c: c.cs.map((p) => p.slice()) }; },
    /** The polyline of the arc scene: the toy correlation at 0°, 0.5°, …, 180°. */
    toyLine: () => TOY_LINE.map((p) => p.slice()),
    seek: (phi) => setPhi(phi),
    /** Viewport y of the value v on the gauge (null before the first draw). */
    gaugeY: (v) => { if (!gaugeG) return null; return $('cv').getBoundingClientRect().top + gaugeG.Y(v); },
    /** Viewport coordinates of the point at angle `a` and radius `r` on the dial (null outside the dial scenes). */
    dialPoint: (a, r) => { const b = $('cv').getBoundingClientRect(); if (!dialG || S.scene === 'arc') return null; const p = pt(a, r); return [b.left + dialG.X(p[0]), b.top + dialG.Y(p[1])]; }
  };
  window.TRV_THUMB = () => { applyPreset('tsirelson'); cards.mark('tsirelson'); paint.now(); };
  cards.pick(cards.initial('tsirelson'));
  booting = false;
  paint();
})();
