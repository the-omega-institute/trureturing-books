/* NORM//LATTICE · 范数格 · Lattices and their norms
   Chapter 23: two integer lattices and the level curves of their norms.
   Eisenstein (Δ = −3). An integer pair (x, y) sits in the complex plane at z = x + y·e^{iπ/3}; its norm
     eisNorm(x, y) = x² + xy + y² = |z|², so the level curves are circles. The integer coordinates of the chapter's
     crossing form are (P, Q) = (x + (t + 1)y, y): then Qform(t, P, Q) = P² − (2t + 1)PQ + (t² + t + 1)Q² = eisNorm(x, y).
     The view mixes the two pictures with m ∈ [0, 1]: a point is drawn at
       X = P + m·Q·(−t − ½),   Y = Q·(1 − m + m·√3/2),
     so m = 0 is the (P, Q) grid (the level curves are slanted ellipses) and m = 1 is the complex plane (points and
     circles do not depend on t; only the basis vector u₂ = −(t + ½) + i√3/2 of the coordinates slides).
     The rail drives t ∈ [−1, 2].
   Golden (Δ = +5). g = a + bφ is drawn at (u, v) = (g, ḡ) = (a + bφ, a + bφ̄); norm(g) = a² + ab − b² = u·v, the signed
     area of the rectangle with corners 0 and (u, v); the level curves are hyperbolas. The trace 2a + b = u + v and
     √5·b = u − v are the coordinates along the two diagonals. The rail counts multiplications by φ:
     (a, b)·φ = (b, a + b).
   Read-only probe for the browser suite: window.NORM_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const R3 = Math.sqrt(3), R5 = Math.sqrt(5), PHI = (1 + R5) / 2, PHIB = (1 - R5) / 2;
  const lerp = (a, b, e) => a + (b - a) * e;
  const isInt = (x) => Math.abs(x - Math.round(x)) < 1e-9;
  /** An integer when it is one, otherwise d decimals; a true minus sign. */
  const num = (x, d) => (isInt(x) ? fix(Math.round(x), 0) : fix(x, d == null ? 2 : d));
  /** A + Bv + Cw with signs folded in, e.g. term(1, 'P²') … */
  function poly(a, b, c) {
    const part = (k, v, first) => {
      if (Math.abs(k) < 1e-12) return '';
      const s = k < 0 ? (first ? '−' : ' − ') : (first ? '' : ' + '), m = Math.abs(k);
      return s + (Math.abs(m - 1) < 1e-12 ? '' : num(m)) + v;
    };
    let out = part(a, 'P²', true); out += part(b, 'PQ', !out); out += part(c, 'Q²', !out);
    return out || '0';
  }

  /* ---------- the two lattices ---------- */
  const eisNorm = (x, y) => x * x + x * y + y * y;
  const qform = (t, p, q) => p * p - (2 * t + 1) * p * q + (t * t + t + 1) * q * q;
  const EIS = [];
  for (let y = -8; y <= 8; y++) for (let x = -36; x <= 36; x++) EIS.push({ x, y, n: eisNorm(x, y) });
  const goldNorm = (a, b) => a * a + a * b - b * b;
  const GOLD = [];
  for (let b = -14; b <= 14; b++) for (let a = -24; a <= 24; a++) {
    const u = a + b * PHI, v = a + b * PHIB;
    if (u > -7 && u < 13 && Math.abs(v) < 7) GOLD.push({ a, b, u, v, n: goldNorm(a, b) });
  }
  const timesPhi = (g) => [g[1], g[0] + g[1]];
  const uvOf = (g) => [g[0] + g[1] * PHI, g[0] + g[1] * PHIB];

  /* ---------- state ---------- */
  const S = { scene: 'eis', m: 1, cur: [-1, 3], cell: true, trails: false, t0: -1, frame: 0, alpha: 0, g0: [2, 1], smax: 2 };
  const tOf = () => (S.scene === 'eis' ? clock.t - 1 : 0);
  /** Where an Eisenstein pair is drawn at parameter t and view mix m. */
  function pos(x, y, t, m) {
    const p = x + (t + 1) * y, q = y;
    return [p + m * q * (-t - 0.5), q * (1 - m + m * R3 / 2)];
  }
  /** The window of the Eisenstein stage (half-widths) at view mix m. */
  function eisWin(m) {
    const thumb = TRV.thumbMode;
    return thumb ? [lerp(8, 4.2, m), lerp(3.4, 3.1, m)] : [lerp(10.4, 5.2, m), lerp(4.3, 3.6, m)];
  }
  /** The golden integers g0·φ^k for k = 0 … smax. */
  const hops = () => { const out = [S.g0.slice()]; for (let k = 0; k < S.smax; k++) out.push(timesPhi(out[k])); return out; };
  /** The drawn position of the golden point at rail value s: it rests at g0·φ^k and slides to the next late in each step. */
  function goldAt(s) {
    const H = hops(), k = clamp(Math.floor(s + 1e-9), 0, S.smax), f = s - k;
    if (k >= S.smax || f < 0.55) return { k, uv: uvOf(H[k]), g: H[k], moving: false };
    const e = TRV.smooth(clamp((f - 0.55) / 0.45, 0, 1)), a = uvOf(H[k]), b = uvOf(H[k + 1]);
    return { k: e < 0.5 ? k : k + 1, uv: [lerp(a[0], b[0], e), lerp(a[1], b[1], e)], g: H[e < 0.5 ? k : k + 1], moving: true };
  }
  /** The values ≤ 13 that Qform(T, ·, ·) takes on the integer points of the window, T an integer. */
  function valuesTaken(T) {
    const seen = new Set();
    for (let q = -4; q <= 4; q++) for (let p = -10; p <= 10; p++) { const v = qform(T, p, q); if (v <= 13) seen.add(v); }
    return [...seen].sort((a, b) => a - b);
  }

  /* ---------- the stage ---------- */
  const cv = $('cv');
  let geo = null;   // the plot of the last frame (for picking)
  const stage = kit.stage3($('stage'), {
    canvas: cv, rotate: false, wheel: false, onChange: () => paint(),
    onPick: (ev) => pick(ev), onDrag: () => {}, onDrop: () => {}
  });
  function frameBox() {
    const W = cv.clientWidth || 1, H = cv.clientHeight || 1, narrow = W < 560, thumb = TRV.thumbMode;
    const below = (el) => (el ? el.getBoundingClientRect().bottom - cv.getBoundingClientRect().top : 0);
    const top = thumb ? 24 : Math.max(52, below($('hudSub')), below($('sceneChips'))) + 8;
    const bottom = thumb ? 24 : Math.max(26, ($('legend').offsetHeight || 0) + 22);
    return { W, H, narrow, thumb, pad: [thumb ? 24 : (narrow ? 12 : 22), thumb ? 24 : (narrow ? 12 : 22), top, bottom] };
  }

  const onSkew = () => { try { return cards.current === 'skew'; } catch (e) { return false; } };
  function drawEis() {
    const b = frameBox(), t = tOf(), m = S.m, [wx, wy] = eisWin(m), k = b.thumb ? 2 : 1;
    const g = kit.plot(cv, { x: [-wx, wx], y: [-wy, wy], pad: b.pad, equal: true });
    geo = g;
    const ctx = g.ctx, inView = (p) => p[0] > g.x0 - 0.2 && p[0] < g.x1 + 0.2 && p[1] > g.y0 - 0.2 && p[1] < g.y1 + 0.2;
    const curN = eisNorm(S.cur[0], S.cur[1]);
    // the integer grid (P, Q): crosses, fading out towards the complex plane
    if (m < 0.999) {
      ctx.strokeStyle = P.faint; ctx.globalAlpha = 0.9 * (1 - m); ctx.lineWidth = 1;
      for (let q = -6; q <= 6; q++) for (let p = -16; p <= 16; p++) {
        const X = g.X(p + m * q * (-t - 0.5)), Y = g.Y(q * (1 - m + m * R3 / 2)), r = 4;
        ctx.beginPath(); ctx.moveTo(X - r, Y); ctx.lineTo(X + r, Y); ctx.moveTo(X, Y - r); ctx.lineTo(X, Y + r); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      // the axes P and Q
      g.line([[g.x0, 0], [g.x1, 0]], P.faint, { width: 1, alpha: 0.6 * (1 - m) });
      g.line([[m * -8 * (-t - 0.5), -8 * (1 - m + m * R3 / 2)], [m * 8 * (-t - 0.5), 8 * (1 - m + m * R3 / 2)]], P.faint, { width: 1, alpha: 0.6 * (1 - m) });
    }
    // level curves: the image of the circle |z|² = n
    const curve = (n) => {
      const pts = [];
      for (let i = 0; i <= 180; i++) {
        const th = 2 * Math.PI * i / 180, y = 2 * Math.sqrt(n) * Math.sin(th) / R3, x = Math.sqrt(n) * Math.cos(th) - y / 2;
        pts.push(pos(x, y, t, m));
      }
      return pts;
    };
    for (const n of [1, 2, 3, 4, 5, 6, 7, 9, 12, 13]) {
      if (n === curN) continue;
      const empty = !EIS.some((e) => e.n === n);
      if (empty) g.line(curve(n), P.dim, { width: 1, alpha: 0.45, dash: [3, 5] });
      else g.line(curve(n), P.dim, { width: 1.1, alpha: 0.55 });
    }
    if (curN > 0) g.line(curve(curN), P.cyan, { width: 2 * k, glow: b.thumb ? 0 : 6 });
    // the SKEW card: the same points where the complex plane puts them (dashed circle, faint dots), each joined to its integer-coordinate place
    if (onSkew() && m < 0.5) {
      for (const e of EIS) {
        if (e.n > 13) continue;
        const a = pos(e.x, e.y, t, m), c = pos(e.x, e.y, t, 1);
        if (!inView(c) && !inView(a)) continue;
        g.line([a, c], e.n === curN ? P.cyan : P.dim, { width: 1, alpha: e.n === curN ? 0.55 : 0.22 });
        if (inView(c)) g.dot(c[0], c[1], e.n === curN ? P.cyan : P.ink, (e.n === curN ? 3 : 1.8) * k, { alpha: 0.6 });
      }
      const circ = []; for (let i = 0; i <= 180; i++) { const th = 2 * Math.PI * i / 180, y = 2 * Math.sqrt(curN) * Math.sin(th) / R3, x = Math.sqrt(curN) * Math.cos(th) - y / 2; circ.push(pos(x, y, t, 1)); }
      g.line(circ, P.cyan, { width: 1.4 * k, alpha: 0.85, dash: [5, 4] });
      const gc = pos(S.cur[0], S.cur[1], t, 1), gp = pos(S.cur[0], S.cur[1], t, 0);
      g.line([gp, gc], P.amber, { width: 1.4 * k, alpha: 0.8, dash: [3, 3] });
      g.dot(gc[0], gc[1], P.amber, 5 * k, { ring: true, width: 2 });
      if (!b.thumb) stage.tag('ghost', [g.X(gc[0]), g.Y(gc[1]) + 20], `(x, y) = (${num(S.cur[0])}, ${num(S.cur[1])})`, 'num hot', { screen: true });
    }
    // trails: how far each row slid since t0 (the RANGE card)
    if (S.trails && t > S.t0 + 1e-6) {
      for (const e of EIS) {
        if (e.n > 13) continue;
        const a = pos(e.x, e.y, S.t0, m), c = pos(e.x, e.y, t, m);
        if (!inView(c) && !inView(a)) continue;
        g.line([a, c], e.n === curN ? P.cyan : P.dim, { width: 1, alpha: 0.4 });
      }
    }
    // the fundamental cell spanned by the (P, Q) basis: magenta, its area never changes in the plane
    const u1 = pos(1, 0, t, m), o = pos(0, 0, t, m), u2 = [m * (-t - 0.5), 1 - m + m * R3 / 2], u12 = [u1[0] + u2[0], u1[1] + u2[1]];
    if (S.cell) {
      if (t > S.t0 + 1e-6 && m > 0.5) {   // where the cell started
        const s2 = [m * (-S.t0 - 0.5), 1 - m + m * R3 / 2];
        g.poly([o, u1, [u1[0] + s2[0], u1[1] + s2[1]], s2], P.magenta, { alpha: 0, stroke: P.magenta, strokeAlpha: 0.45, width: 1 });
        ctx.setLineDash([]);
      }
      g.poly([o, u1, u12, u2], P.magenta, { alpha: 0.28, stroke: P.magenta, strokeAlpha: 0.95, width: 1.6 * k });
      // the row of u₂: u₂ slides along it as t moves
      g.line([[g.x0, u2[1]], [g.x1, u2[1]]], P.amber, { width: 1, alpha: 0.35, dash: [4, 5] });
    }
    // lattice points
    let onLevel = 0;
    for (const e of EIS) {
      const p = pos(e.x, e.y, t, m);
      if (!inView(p)) continue;
      const hit = e.n === curN && curN > 0;
      if (hit) onLevel++;
      g.dot(p[0], p[1], hit ? P.cyan : P.ink, (hit ? 4.2 : 2.6) * k, { alpha: hit ? 1 : 0.8 });
    }
    // basis arrows
    if (S.cell) {
      arrow(g, o, u1, P.ink, k); arrow(g, o, u2, P.amber, k);
    }
    // the current point
    const c = pos(S.cur[0], S.cur[1], t, m);
    g.dot(c[0], c[1], P.amber, 6.5 * k, { glow: b.thumb ? 0 : 12 });
    g.dot(c[0], c[1], P.stage || P.void, 2.4 * k);
    // the values strip (in the (P, Q) view): which of 0 … 13 the form takes on the integer points
    let taken = null;
    if (m < 0.5 && !b.thumb) taken = drawValues(g, b, Math.round(t));
    // labels
    if (!b.thumb) {
      const pq = [S.cur[0] + (t + 1) * S.cur[1], S.cur[1]];
      const lab = m > 0.5 ? `(x, y) = (${num(S.cur[0])}, ${num(S.cur[1])})` : `(P, Q) = (${num(pq[0], 1)}, ${num(pq[1], 1)})`;
      const lw = lab.length * 7 + 8, cx = g.X(c[0]), side = cx + 14 + lw > b.W - 12 ? -1 : 1;
      stage.tag('cur', [cx + side * (14 + lw / 2), g.Y(c[1]) - 16], lab, 'num hot', { screen: true });
      // the level label sits at the end of the curve farther from the amber point
      const pts = curve(curN), lo = pts.reduce((a, p) => (g.X(p[0]) < g.X(a[0]) ? p : a)), hi = pts.reduce((a, p) => (g.X(p[0]) > g.X(a[0]) ? p : a));
      const far = Math.hypot(lo[0] - c[0], lo[1] - c[1]) > Math.hypot(hi[0] - c[0], hi[1] - c[1]) ? lo : hi, fs = far === lo ? -1 : 1;
      stage.tag('lev', [g.X(far[0]) + fs * 34, g.Y(far[1]) - 14], `N = ${curN}`, 'num cy', { screen: true });
      if (S.cell) {
        stage.tag('u2', [g.X(u2[0]), g.Y(u2[1]) - 14], 'u₂', 'num hot', { screen: true, dx: -10 });
        stage.tag('u1', [g.X(u1[0]) + 4, g.Y(u1[1]) + 14], 'u₁', 'num', { screen: true });
      }
    }
    return { onLevel, taken, u1: [1, 0], u2: [-t - 0.5, R3 / 2], curN };
  }
  function arrow(g, a, b2, color, k) {
    const ctx = g.ctx, x0 = g.X(a[0]), y0 = g.Y(a[1]), x1 = g.X(b2[0]), y1 = g.Y(b2[1]), d = Math.hypot(x1 - x0, y1 - y0);
    if (d < 4) return;
    const ux = (x1 - x0) / d, uy = (y1 - y0) / d, h = 9 * k;
    ctx.strokeStyle = ctx.fillStyle = color; ctx.lineWidth = 2.2 * k; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 - ux * h * 0.6, y1 - uy * h * 0.6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - ux * h - uy * h * 0.45, y1 - uy * h + ux * h * 0.45); ctx.lineTo(x1 - ux * h + uy * h * 0.45, y1 - uy * h - ux * h * 0.45); ctx.closePath(); ctx.fill();
  }
  function drawValues(g, b, T) {
    const vals = valuesTaken(T), ctx = g.ctx, n = 14, cw = b.narrow ? 15 : 19, ch = b.narrow ? 15 : 18;
    const x0 = g.pl + g.iw - n * cw - 4, y0 = g.pt + g.ih - ch - 6;
    ctx.fillStyle = TRV.alpha(P.stage || P.void, 0.85); ctx.fillRect(x0 - 6, y0 - 18, n * cw + 12, ch + 24);
    ctx.font = `${b.narrow ? 9 : 10}px ${TRV.fonts.data}`; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = P.dim;
    ctx.fillText(L(`t = ${T} 时取到的值`, `values taken at t = ${T}`), x0, y0 - 5);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (let v = 0; v < n; v++) {
      const on = vals.includes(v), x = x0 + v * cw;
      ctx.strokeStyle = on ? P.cyan : P.faint; ctx.lineWidth = 1;
      if (on) { ctx.fillStyle = TRV.alpha(P.cyan, 0.25); ctx.fillRect(x + 1, y0, cw - 2, ch); }
      ctx.strokeRect(x + 1.5, y0 + 0.5, cw - 3, ch - 1);
      ctx.fillStyle = on ? P.ink : P.faint; ctx.fillText(String(v), x + cw / 2, y0 + ch / 2 + 0.5);
    }
    return vals;
  }

  function drawGold() {
    const b = frameBox(), s = clock.t, k = b.thumb ? 2 : 1, A = S.alpha;
    const g = kit.plot(cv, { x: [-4.6, 10.6], y: [-4.4, 4.4], pad: b.pad, equal: true });
    geo = g;
    const ctx = g.ctx, at = goldAt(s), H = hops(), N = goldNorm(at.g[0], at.g[1]);
    // the (g, ḡ) axes, and the two diagonals of the trace frame turning in with A
    g.line([[g.x0, 0], [g.x1, 0]], P.faint, { width: 1, alpha: 0.8 });
    g.line([[0, g.y0], [0, g.y1]], P.faint, { width: 1, alpha: 0.8 });
    const ang = A * Math.PI / 4, R = 30, d1 = [Math.cos(ang), Math.sin(ang)], d2 = [Math.sin(ang), -Math.cos(ang)];
    if (A > 0.001) {
      g.line([[-R * d1[0], -R * d1[1]], [R * d1[0], R * d1[1]]], P.cyan, { width: 1.4 * k, alpha: 0.75 * A });
      g.line([[-R * d2[0], -R * d2[1]], [R * d2[0], R * d2[1]]], P.dim, { width: 1, alpha: 0.7 * A, dash: [5, 5] });
      if (A > 0.99) {   // integer ticks of the trace along the diagonal: the foot of trace x is (x/2, x/2)
        for (let x = -8; x <= 20; x++) {
          const p = [x / 2, x / 2]; if (p[0] < g.x0 || p[0] > g.x1 || p[1] < g.y0 || p[1] > g.y1) continue;
          const X = g.X(p[0]), Y = g.Y(p[1]); ctx.strokeStyle = P.cyan; ctx.globalAlpha = 0.6; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(X - 3, Y + 3); ctx.lineTo(X + 3, Y - 3); ctx.stroke(); ctx.globalAlpha = 1;
        }
      }
    }
    // hyperbolas u·v = n: faint for the other norms, magenta for the current one (both signs)
    const hyper = (n) => {
      const out = [];
      for (const sgn of [1, -1]) {
        const pts = [];
        for (let i = 0; i <= 200; i++) { const u = sgn * Math.exp(lerp(Math.log(0.02), Math.log(40), i / 200)); pts.push([u, n / u]); }
        out.push(pts.filter((p) => Math.abs(p[1]) < 40));
      }
      return out;
    };
    const absN = Math.abs(N);
    for (const n of [1, 4, 5, 9, 11]) for (const sg of [1, -1]) {
      if (n === absN) continue;
      hyper(sg * n).forEach((pts) => g.line(pts, P.dim, { width: 1, alpha: 0.4 }));
    }
    if (absN > 0) for (const sg of [1, -1]) hyper(sg * absN).forEach((pts) => g.line(pts, P.magenta, { width: (sg * absN === N ? 1.9 : 1.1) * k, alpha: sg * absN === N ? 0.95 : 0.5 }));
    // the trail of earlier hops (UNITS) with their rectangles outlined
    if (S.smax > 0 && !TRV.thumbMode) {
      H.forEach((h, j) => {
        if (j > at.k || (j === at.k && !at.moving)) return;
        const p = uvOf(h); g.rect(0, 0, p[0], p[1], P.magenta, { alpha: 0, stroke: P.magenta, strokeAlpha: 0.35 });
      });
    }
    // the rectangle of the current point: its signed area is the norm
    g.rect(0, 0, at.uv[0], at.uv[1], P.magenta, { alpha: 0.26, stroke: P.magenta, strokeAlpha: 0.95, width: 1.4 * k });
    // lattice points
    for (const e of GOLD) {
      if (e.u < g.x0 - 0.2 || e.u > g.x1 + 0.2 || e.v < g.y0 - 0.2 || e.v > g.y1 + 0.2) continue;
      g.dot(e.u, e.v, P.ink, 2.6 * k, { alpha: 0.8 });
    }
    // visited hops
    H.forEach((h, j) => { if (j < at.k || (j === at.k && at.moving)) { const p = uvOf(h); g.dot(p[0], p[1], P.magenta, 4 * k, { alpha: 0.9 }); } });
    // the projection on the trace diagonal (cyan): the foot is ((u + v)/2, (u + v)/2)
    if (A > 0.001) {
      const tr = (at.uv[0] + at.uv[1]) / 2;
      g.line([at.uv, [tr, tr]], P.cyan, { width: 1.4 * k, alpha: A, dash: [3, 3] });
      g.dot(tr, tr, P.cyan, 4 * k, { alpha: A });
      const an = (at.uv[0] - at.uv[1]) / 2;
      g.line([at.uv, [an, -an]], P.dim, { width: 1, alpha: 0.7 * A, dash: [2, 4] });
    }
    g.dot(at.uv[0], at.uv[1], P.amber, 6.5 * k, { glow: b.thumb ? 0 : 12 });
    // labels
    if (!b.thumb) {
      const gl = at.g, ab = A > 0.5 ? `(2a + b, b) = (${2 * gl[0] + gl[1]}, ${gl[1]})` : `(a, b) = (${num(gl[0])}, ${num(gl[1])})`;
      // the current label sits up and to the right of the point, clear of the dashed drop to the trace diagonal (up-left)
      const up = at.uv[1] >= 0 ? -18 : 18, half = 4 + 3.9 * ab.length, room = g.X(at.uv[0]) + 2 * half + 16 < cv.clientWidth;
      stage.tag('cur', [g.X(at.uv[0]), g.Y(at.uv[1]) + up], ab, 'num hot', { screen: true, dx: room ? half + 10 : -(half + 10) });
      if (Math.abs(at.uv[1]) * g.scale > 30 || A < 0.5) stage.tag('area', [g.X(at.uv[0] / 2), g.Y(at.uv[1] / 2)], `${L('面积', 'area')} ${num(at.uv[0] * at.uv[1])}`, 'num mg', { screen: true });
      if (A > 0.5) {
        const tr = (at.uv[0] + at.uv[1]) / 2;
        // on the far side of the diagonal from the point, so it does not sit on the dashed drop
        stage.tag('trace', [g.X(tr), g.Y(tr)], `2a + b = ${num(gl[0] * 2 + gl[1])}`, 'num cy', { screen: true, dx: -62, dy: -16 });
      }
      if (S.smax > 0) {
        H.forEach((h, j) => {
          if (j >= at.k || j === 0 && at.k === 0) return;
          const p = uvOf(h), lab = `(${2 * h[0] + h[1]}, ${h[1]})`;
          // a hop on or above the cyan diagonal is labelled to its left, one below it above or below the point
          const onDiag = p[1] >= p[0] - 1e-9;
          stage.tag(`h${j}`, [g.X(p[0]), g.Y(p[1])], lab, 'num mg', onDiag ? { screen: true, dx: -44, dy: -4 } : { screen: true, dy: p[1] >= 0 ? -14 : 14 });
        });
      }
    }
    return { at, N };
  }

  function drawStage() {
    stage.begin();
    const info = S.scene === 'eis' ? drawEis() : drawGold();
    stage.end();
    S.last = info;
    const t = tOf();
    if (S.scene === 'eis') {
      const a = 1, bb = -(2 * t + 1), c = t * t + t + 1;
      // at t = −1 the integer coordinates are (x, y) themselves, and in the complex plane there is nothing to name t for yet
      $('hudBig').textContent = S.m > 0.5 && Math.abs(t + 1) < 1e-9 ? L('艾森斯坦整数 · 复平面', 'Eisenstein integers · complex plane') : `${L('艾森斯坦', 'Eisenstein')} · t = ${num(t)}`;
      $('hudSub').textContent = S.m > 0.5
        ? L(`复平面：圆是范数的等值线 · 格子面积 ${fix(R3 / 2, 3)}`, `Complex plane: circles are norm levels · cell area ${fix(R3 / 2, 3)}`)
        : `Qform = ${poly(a, bb, c)} · Δ = ${num(bb * bb - 4 * a * c)}`;
    } else {
      const { at, N } = info;
      $('hudBig').textContent = `${L('黄金整数', 'Golden integers')} · ${L(`乘 φ ${at.k} 次`, `${at.k} × φ`)}`;
      $('hudSub').textContent = S.alpha > 0.5
        ? L(`迹 ${2 * at.g[0] + at.g[1]} · (迹)² − 5b² = ${(2 * at.g[0] + at.g[1]) ** 2 - 5 * at.g[1] ** 2} = 4 × ${N}`, `trace ${2 * at.g[0] + at.g[1]} · trace² − 5b² = ${(2 * at.g[0] + at.g[1]) ** 2 - 5 * at.g[1] ** 2} = 4 × ${N}`)
        : L(`范数 = g · ḡ = 矩形面积 ${num(N)}`, `norm = g · ḡ = rectangle area ${num(N)}`);
    }
  }

  /* ---------- the strip ---------- */
  function drawPlot() {
    if (S.scene === 'eis') {
      $('plotTitle').innerHTML = `<span class="zh">系数在变，判别式不动</span><span class="en">Coefficients move, the discriminant stays</span>`;
      const g = kit.plot($('plot'), { x: [-1, 2], y: [-8, 8], pad: [30, 10, 10, 22] });
      g.axes({ yTicks: [[-8, '−8'], [-3, '−3'], [0, '0'], [4, '4'], [8, '8']], xTicks: [[-1, '−1'], [0, '0'], [1, '1'], [2, '2']] });
      const pts = (f) => { const out = []; for (let i = 0; i <= 90; i++) { const t = -1 + 3 * i / 90; out.push([t, f(t)]); } return out; };
      g.line(pts((t) => -(2 * t + 1)), P.dim, { width: 1.4 });
      g.line(pts((t) => t * t + t + 1), P.dim, { width: 1.4, dash: [5, 4] });
      g.line(pts((t) => (2 * t + 1) ** 2 - 4 * (t * t + t + 1)), P.magenta, { width: 2.6 });
      g.vline(tOf(), P.amber, { alpha: 0.8 });
      g.legend([[P.dim, L('PQ 的系数', 'PQ coefficient')], [P.dim, L('Q² 的系数', 'Q² coefficient'), 'dash'], [P.magenta, 'Δ']], { right: false });
      $('plotMeta').textContent = `t ${fix(tOf(), 2)}`;
    } else {
      $('plotTitle').innerHTML = `<span class="zh">每乘一次 φ，面积翻号，大小不变</span><span class="en">Each step flips the area and keeps its size</span>`;
      const H = hops(), ns = H.map((h) => goldNorm(h[0], h[1])), big = Math.max(1, ...ns.map(Math.abs));
      const g = kit.plot($('plot'), { x: [-0.3, Math.max(S.smax, 1) + 0.3], y: [-big * 1.3, big * 1.3], pad: [30, 10, 10, 22] });
      const xt = []; for (let j = 0; j <= Math.max(S.smax, 1); j++) xt.push([j, String(j)]);
      g.axes({ yTicks: [[-big, `−${big}`], [0, '0'], [big, String(big)]], xTicks: xt });
      g.hline(big, P.magenta, { alpha: 0.35, dash: [4, 4] }); g.hline(-big, P.magenta, { alpha: 0.35, dash: [4, 4] });
      ns.forEach((n, j) => { g.line([[j, 0], [j, n]], P.magenta, { width: 3 }); g.dot(j, n, P.magenta, 3.5); });
      g.vline(goldAt(clock.t).k, P.amber, { alpha: 0.8 });
      $('plotMeta').textContent = `× φ ${goldAt(clock.t).k}`;
    }
  }

  /* ---------- readouts ---------- */
  function drawText() {
    const set = (id, zh, en) => { const h = `<span class="zh">${zh}</span><span class="en">${en}</span>`; if ($(id).innerHTML !== h) $(id).innerHTML = h; };
    $('leanEis').hidden = S.scene !== 'eis'; $('leanGold').hidden = S.scene !== 'gold';
    if (S.scene === 'eis') {
      const t = tOf(), [x, y] = S.cur, p = x + (t + 1) * y, q = y, v = qform(t, p, q), bb = -(2 * t + 1), c = t * t + t + 1;
      set('roKeyLabel', '琥珀色点的 Qform(t, P, Q)', 'Qform(t, P, Q) at the amber point');
      $('roKey').innerHTML = `<span class="c-cy">${num(v, 3)}</span>`;
      $('roKeySub').textContent = L(` = eisNorm(${x}, ${y})`, ` = eisNorm(${x}, ${y})`);
      set('ro1Label', '琥珀色点 (P, Q) ↔ (x, y)', 'amber point (P, Q) ↔ (x, y)');
      $('ro1').textContent = `(${num(p, 2)}, ${num(q)}) ↔ (${x}, ${y})`;
      set('ro2Label', '二次型', 'the form');
      $('ro2').textContent = poly(1, bb, c);
      set('ro3Label', '判别式 b² − 4ac', 'discriminant b² − 4ac');
      $('ro3').innerHTML = `<span class="c-mg">${num(bb * bb - 4 * c, 3)}</span>`;
      set('ro4Label', '同一条青色曲线上的格点', 'lattice points on the cyan curve');
      $('ro4').textContent = String(S.last ? S.last.onLevel : 0);
      $('roAside').textContent = 'ℤ[ω]';
      $('roNote').textContent = isInt(t)
        ? L('t 是整数：每个格点都落在整数坐标上，定理所说的正是这一帧。', 't is an integer: every lattice point sits on integer coordinates, which is the frame the theorems speak of.')
        : L('t 不是整数：这是两个整数 t 之间的动画帧；格点与范数不变。', 't is not an integer: this is an animation frame between two integers; the points and their norms do not change.');
      $('pillNorm').querySelector('strong').textContent = num(v, 2);
      $('pillDisc').querySelector('strong').textContent = num(bb * bb - 4 * c, 2);
    } else {
      const { at, N } = S.last, [a, b] = at.g, tr = 2 * a + b;
      set('roKeyLabel', '范数 a² + ab − b²', 'norm a² + ab − b²');
      $('roKey').innerHTML = `<span class="c-mg">${N}</span>`;
      $('roKeySub').textContent = L(` = 矩形面积 g·ḡ`, ` = rectangle area g·ḡ`);
      set('ro1Label', 'g = a + bφ', 'g = a + bφ');
      $('ro1').textContent = `(${a}, ${b}) · g = ${fix(a + b * PHI, 3)} · ḡ = ${fix(a + b * PHIB, 3)}`;
      set('ro2Label', '迹 2a + b 与 b', 'trace 2a + b and b');
      $('ro2').innerHTML = `<span class="c-cy">${tr}</span> · ${b}`;
      set('ro3Label', '(2a + b)² − 5b²', '(2a + b)² − 5b²');
      $('ro3').innerHTML = `<span class="c-mg">${tr * tr - 5 * b * b} = 4 × ${N}</span>`;
      set('ro4Label', '乘 φ 的次数', 'multiplications by φ');
      $('ro4').textContent = `${at.k} / ${S.smax}`;
      $('roAside').textContent = 'ℤ[φ]';
      $('roNote').textContent = at.moving
        ? L('两次乘 φ 之间的滑动只是动画。', 'The slide between two multiplications by φ is animation only.')
        : L('乘 φ 把 (a, b) 变成 (b, a + b)：矩形一边拉长 φ 倍，另一边缩成 1/φ 并翻到另一侧。', 'Multiplying by φ sends (a, b) to (b, a + b): one side of the rectangle grows by φ, the other shrinks to 1/φ and flips over.');
      $('pillNorm').querySelector('strong').textContent = String(N);
      $('pillDisc').querySelector('strong').textContent = '+5';
    }
    const LEG = S.scene === 'eis'
      ? [['cy', `范数 ${S.last.curN} 的曲线与格点`, `norm ${S.last.curN}: curve and points`], ['mg', '格子（u₁, u₂ 张成）', 'cell spanned by u₁, u₂'], ['am', '当前的点与 u₂', 'current point and u₂'], ['dm', '其余范数；虚线上没有格点', 'other norms; none on dashed']]
      : [['mg', '矩形面积 = 范数', 'rectangle area = norm'], ['cy', '迹：对角线上的影子', 'trace: shadow on the diagonal'], ['am', '当前的 g', 'current g'], ['dm', '其余范数的双曲线', 'hyperbolas of other norms']];
    const html = LEG.filter(([cl]) => S.scene === 'eis' ? (cl !== 'mg' || S.cell) : (cl !== 'cy' || S.alpha > 0.5)).map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend').innerHTML !== html) $('legend').innerHTML = html;
  }

  const paint = kit.painter(() => { drawStage(); drawPlot(); drawText(); TRV.hudFit(); }, [$('stage'), $('plot')]);

  /* ---------- direct manipulation: click a lattice point ---------- */
  function pick(ev) {
    if (!geo) return false;
    const r = cv.getBoundingClientRect(), px = ev.clientX - r.left, py = ev.clientY - r.top;
    let best = null, bd = 16;
    if (S.scene === 'eis') {
      const t = tOf();
      for (const e of EIS) { const p = pos(e.x, e.y, t, S.m), d = Math.hypot(geo.X(p[0]) - px, geo.Y(p[1]) - py); if (d < bd) { bd = d; best = e; } }
      if (!best) return false;
      cards.mark(null); S.cur = [best.x, best.y];
    } else {
      for (const e of GOLD) { const d = Math.hypot(geo.X(e.u) - px, geo.Y(e.v) - py); if (d < bd) { bd = d; best = e; } }
      if (!best) return false;
      cards.mark(null); clock.pause(); S.g0 = [best.a, best.b]; S.smax = 2; clock.setMax(S.smax, true); clock.set(0);
    }
    paint();
    return true;
  }

  /* ---------- controls ---------- */
  function setScene(sc) {
    S.scene = sc; sceneChips.set(sc, true);
    $('eisCtl').hidden = sc !== 'eis'; $('goldCtl').hidden = sc !== 'gold';
    clock.step = 1; clock.rate = sc === 'eis' ? 0.6 : 0.8;
    clock.setMax(sc === 'eis' ? 3 : Math.max(S.smax, 1), true);
  }
  let tw = null;
  const sceneChips = kit.chips($('sceneChips'), 'scene', (sc) => {
    cards.mark(null); clock.pause(); if (tw) tw.cancel();
    if (sc === 'eis') { S.cell = true; S.trails = false; S.t0 = -1; S.m = 1; setScene('eis'); clock.set(0); }
    else { S.g0 = [2, 1]; S.smax = 2; S.alpha = 0; setScene('gold'); clock.set(0); }
    viewChips.set(String(Math.round(S.m)), true); frameChips.set(String(Math.round(S.alpha)), true); paint();
  });
  const viewChips = kit.chips($('viewChips'), 'view', (v) => {
    cards.mark(null); if (tw) tw.cancel(); const m0 = S.m, m1 = +v;
    tw = kit.tween(600, (e) => { S.m = lerp(m0, m1, e); paint(); });
  });
  const frameChips = kit.chips($('frameChips'), 'frame', (v) => {
    cards.mark(null); if (tw) tw.cancel(); const a0 = S.alpha, a1 = +v;
    tw = kit.tween(600, (e) => { S.alpha = lerp(a0, a1, e); paint(); });
  });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });

  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 3, t: 0, rate: 0.6, step: 1,
    format: (t, max) => (S.scene === 'eis' ? `t ${kit.sgn(t - 1, 2)} <small>/ +2</small>` : `× φ ${fix(t, 2)} <small>/ ${fix(max, 0)}</small>`),
    onChange: () => paint()
  });

  /* ---------- experiment cards: a played card declares the rail value its still shows (the rail of the
     Eisenstein scene reads t + 1) ---------- */
  const PRESETS = {
    hex: { scene: 'eis', m: 1, t: -1, cur: [-1, 3], cell: true, play: false },
    skew: { scene: 'eis', m: 0, t: 2, cur: [-1, 3], cell: false, play: false },
    shear: { scene: 'eis', m: 1, t: -1, t1: 2, still: 3, cur: [-1, 3], cell: true, play: true },
    range: { scene: 'eis', m: 0, t: -1, t1: 2, still: 2, cur: [-1, 3], cell: false, trails: true, play: true },
    norm: { scene: 'gold', alpha: 0, g0: [2, 1], smax: 2, play: false },
    pell: { scene: 'gold', alpha: 1, g0: [2, 1], smax: 2, play: false },
    units: { scene: 'gold', alpha: 1, g0: [1, 0], smax: 4, play: true, still: 4 }
  };
  const NOTES = {
    hex: ['艾森斯坦整数画在复平面上，排成六角格。范数 x² + xy + y² 是到原点距离的平方：实线圆 1、3、4、7、9、12、13 都穿过格点，虚线圆 2、5、6 一个格点也碰不到。琥珀色的点 (−1, 3) 与另外 11 个青色格点同在范数 7 的圆上。',
      'The Eisenstein integers drawn in the complex plane form a hexagonal lattice. The norm x² + xy + y² is the squared distance to the origin: the solid circles 1, 3, 4, 7, 9, 12, 13 pass through lattice points, the dashed circles 2, 5, 6 meet none. The amber point (−1, 3) shares the norm-7 circle with 11 other cyan points.'],
    skew: ['同一批格点改用整数坐标 (P, Q) 去读，t = 2：二次型成了 P² − 5PQ + 7Q²，范数 7 的圆被拉成一只又细又斜的青色椭圆，琥珀色的点在 (8, 3)。淡色的点与青色虚线圆是同一批格点在复平面里的位置，细线把每个格点的两处位置连起来：(8, 3) 连到 (−1, 3)。',
      'The same points read in the integer coordinates (P, Q) at t = 2: the form becomes P² − 5PQ + 7Q², the norm-7 circle is stretched into a long, slanted cyan ellipse, and the amber point sits at (8, 3). The faint dots and the dashed cyan circle are the same points where the complex plane puts them; thin lines join each point\'s two places, (8, 3) to (−1, 3).'],
    shear: ['复平面里，t 从 −1 走到 2：格点与圆一动不动，只有琥珀色的基矢 u₂ 沿着它那一行（琥珀色虚线）滑过去，品红的格子被剪斜，面积始终是 √3/2；每到整数 t，u₂ 正好落在一个格点上。',
      'In the complex plane t runs from −1 to 2: the points and the circles do not move; only the amber basis vector u₂ slides along its row (the amber dashed line), shearing the magenta cell while its area stays √3/2; at every integer t, u₂ lands exactly on a lattice point.'],
    range: ['整数坐标里，t 从 −1 走到 2：每一行格点沿着自己那一行滑动（细线是走过的路），青色椭圆越拉越斜；每到整数 t，所有格点又正好填满整数网格，右下角取到的值始终是 0、1、3、4、7、9、12、13。',
      'In integer coordinates t runs from −1 to 2: each row of points slides along itself (the thin lines are the paths), and the cyan ellipse slants more and more; at every integer t the points fill the integer grid again, and the values taken (bottom right) are always 0, 1, 3, 4, 7, 9, 12, 13.'],
    norm: ['黄金整数 g = a + bφ 画在 (g, ḡ) 平面上。琥珀色的 g = 2 + φ 与原点张成一块品红矩形，面积 g·ḡ = 2² + 2·1 − 1² = 5，正是它的范数；品红双曲线上每一点的矩形面积都是 5。',
      'A golden integer g = a + bφ is drawn in the (g, ḡ) plane. The amber g = 2 + φ and the origin span a magenta rectangle of area g·ḡ = 2² + 2·1 − 1² = 5, which is its norm; every point of the magenta hyperbola spans a rectangle of area 5.'],
    pell: ['把坐标轴转 45°：青色对角线上的影子是迹 2a + b = 5，虚线对角线上的是 √5·b。(迹)² − 5b² = 25 − 5 = 20 = 4 × 5：品红双曲线在新坐标里就是 x² − 5y² = 20。',
      'Turn the axes by 45°: the shadow on the cyan diagonal is the trace 2a + b = 5, the one on the dashed diagonal is √5·b. trace² − 5b² = 25 − 5 = 20 = 4 × 5: in the new axes the magenta hyperbola is x² − 5y² = 20.'],
    units: ['从 1 出发，每乘一次 φ，琥珀色的点就在 g·ḡ = +1 与 −1 两支品红双曲线之间跳一次：矩形越来越细长，面积在 +1 与 −1 之间翻转。点旁的数对是 (2a + b, b) = (Lₙ, Fₙ)：(1, 1)、(3, 1)、(4, 2)、(7, 3)。',
      'Starting from 1, each multiplication by φ makes the amber point hop between the magenta hyperbolas g·ḡ = +1 and −1: the rectangle grows long and thin while its area flips between +1 and −1. The pairs beside the points are (2a + b, b) = (Lₙ, Fₙ): (1, 1), (3, 1), (4, 2), (7, 3).']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause(); if (tw) tw.cancel();
    const same = S.scene === p.scene && !booting && !TRV.still;
    if (p.scene === 'eis') {
      S.cur = p.cur.slice(); S.cell = p.cell; S.trails = !!p.trails; S.t0 = p.t;
      const m0 = same ? S.m : p.m, c0 = same ? clock.t : p.t + 1;
      setScene('eis'); viewChips.set(String(p.m), true);
      const end = p.play ? p.t1 + 1 : p.t + 1;
      if (TRV.still || (booting && !TRV.embed)) { S.m = p.m; clock.set(p.still != null ? (p.still === 'end' ? clock.max : p.still) : end); return; }
      tw = kit.tween(same ? 650 : 0, (e) => { S.m = lerp(m0, p.m, e); clock.set(lerp(c0, p.t + 1, e)); }, () => {
        tw = null;
        if (!p.play) return;
        if (booting) kit.autoplay(clock, $('stage')); else clock.play();
      });
    } else {
      const a0 = same ? S.alpha : p.alpha;
      S.g0 = p.g0.slice(); S.smax = p.smax;
      setScene('gold'); frameChips.set(String(p.alpha), true); clock.set(0);
      if (TRV.still || (booting && !TRV.embed)) { S.alpha = p.alpha; clock.set(p.still != null ? (p.still === 'end' ? clock.max : p.still) : 0); return; }
      tw = kit.tween(same ? 650 : 0, (e) => { S.alpha = lerp(a0, p.alpha, e); paint(); }, () => {
        tw = null;
        if (!p.play) return;
        if (booting) kit.autoplay(clock, $('stage')); else clock.play();
      });
    }
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：切换场景与坐标，拖时间轴，点一个格点让它成为当前点。', 'Free play: switch scenes and coordinates, scrub the rail, click a lattice point to make it the current one.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe for the browser suite, cover, start ---------- */
  window.NORM_DEBUG = {
    get state() {
      const base = { scene: S.scene, preset: cards.current, playing: clock.playing, clock: clock.t, max: clock.max, key: $('roKey').textContent, note: $('roNote').textContent };
      if (S.scene === 'eis') {
        const t = tOf(), [wx, wy] = eisWin(S.m);
        const points = EIS.map((e) => { const p = pos(e.x, e.y, t, S.m); return { x: e.x, y: e.y, X: p[0], Y: p[1] }; })
          .filter((p) => Math.abs(p.X) <= wx && Math.abs(p.Y) <= wy);
        return Object.assign(base, {
          t, m: S.m, cur: S.cur.slice(), PQ: [S.cur[0] + (t + 1) * S.cur[1], S.cur[1]], value: qform(t, S.cur[0] + (t + 1) * S.cur[1], S.cur[1]),
          coef: [1, -(2 * t + 1), t * t + t + 1], disc: (2 * t + 1) ** 2 - 4 * (t * t + t + 1), basis: { u1: [1, 0], u2: [-t - 0.5, R3 / 2] },
          cell: S.cell, trails: S.trails, onLevel: S.last ? S.last.onLevel : null, taken: S.last ? S.last.taken : null, window: [wx, wy], points
        });
      }
      const at = goldAt(clock.t);
      return Object.assign(base, { s: clock.t, alpha: S.alpha, g0: S.g0.slice(), smax: S.smax, k: at.k, g: at.g.slice(), uv: at.uv.slice(), moving: at.moving, norm: goldNorm(at.g[0], at.g[1]),
        hops: hops().map((h) => h.slice()) });
    },
    seek: (c) => { clock.pause(); clock.set(c); },
    /** Viewport coordinates of an Eisenstein pair (x, y), or of a golden integer (a, b), as drawn now. */
    pointAt: (x, y) => {
      const r = cv.getBoundingClientRect();
      const p = S.scene === 'eis' ? pos(x, y, tOf(), S.m) : uvOf([x, y]);
      return [r.left + geo.X(p[0]), r.top + geo.Y(p[1])];
    }
  };
  window.TRV_THUMB = () => { clock.pause(); if (tw) tw.cancel(); S.cur = [-1, 3]; S.cell = true; S.trails = false; S.t0 = -1; setScene('eis'); S.m = 1; clock.set(1.5); paint.now(); };
  setScene('eis');
  cards.pick(cards.initial('hex'));
  booting = false;
  paint();
})();
