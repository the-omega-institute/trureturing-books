/* FIXED//CONVERGE · 不动点的收束: how an iteration closes in on its fixed point, and how fast, on the cobweb plane.
     iter    x_{k+1} = f(x_k) for f = cos or f = 1 + 1/x: the path goes to the curve and back to the line y = x; near
             the fixed point x* the error is multiplied by f′(x*) at each step (−sin θ* ≈ −0.6736, −1/φ² ≈ −0.382)
     newton  x_{k+1} = x_k − (x_k − f(x_k))/(1 − f′(x_k)): follow the tangent of the curve to the line; digits double
     read    the convergents a/b of θ*: the residual |cos q − q| is the drop from the line to the curve at q; it stays
             in the wedge between slope 0 and slope −sin 1 through the fixed point, and b²·|cos q − q| < 1 + sin 1
   All orbits and residuals are computed with 70-digit fixed-point BigInt arithmetic; the stage is drawn in coordinates
   measured from the fixed point (u = x − x*), so errors of 10⁻²⁰ can still be drawn.
   Colours: cyan = the curve y = f(x) (the plain reading) and the line component θ*; magenta = the slope/area component
   (the tangent, λ = sin θ*, the residual seam); amber = the current step or reading; the walked path is neutral.
   Read-only probe for the browser suite: window.FPC_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const SUP = { '−': '⁻', '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const SUB = '₀₁₂₃₄₅₆₇₈₉', sub = (n) => String(n).split('').map((d) => SUB[+d]).join('');
  const sci = (x) => {
    if (x === 0) return '0';
    const a = Math.abs(x), e = Math.floor(Math.log10(a));
    if (e >= -3 && e < 3) return fix(x, Math.max(0, 3 - e));
    const m = x / Math.pow(10, e);
    return `${fix(m, 2)}×10${String(e).split('').map((c) => SUP[c]).join('')}`;
  };

  /* ---------- 70-digit fixed-point arithmetic ---------- */
  const DIG = 70, ONE = 10n ** BigInt(DIG), HALF = ONE / 2n;
  const big = (n, d = 1) => (BigInt(n) * ONE) / BigInt(d);
  const mul = (a, b) => (a * b) / ONE;
  const div = (a, b) => (a * ONE) / b;
  const absB = (a) => (a < 0n ? -a : a);
  /** Fixed-point → double, with full relative precision however small the value. */
  function num(a) {
    if (a === 0n) return 0;
    const neg = a < 0n, s = (neg ? -a : a).toString(), k = Math.min(17, s.length);
    const v = Number(s.slice(0, k)) * Math.pow(10, s.length - k - DIG);
    return neg ? -v : v;
  }
  /** Fixed-point → decimal string with d digits after the point (truncated). */
  function str(a, d) {
    const neg = a < 0n, s = absB(a).toString().padStart(DIG + 1, '0'), cut = s.length - DIG;
    return `${neg ? '−' : ''}${s.slice(0, cut)}.${s.slice(cut, cut + d)}`;
  }
  function atanInv(n) { const N = BigInt(n), n2 = N * N; let p = ONE / N, s = 0n, k = 0n; while (p !== 0n) { const t = p / (2n * k + 1n); s += k % 2n ? -t : t; p /= n2; k++; } return s; }
  const PI = 16n * atanInv(5) - 4n * atanInv(239), TWO_PI = 2n * PI;
  const reduce = (x) => x - BigInt(Math.round(num(x) / (2 * Math.PI))) * TWO_PI;
  function cosB(x) { x = reduce(x); const x2 = mul(x, x); let t = ONE, s = ONE, n = 1n; while (t !== 0n) { t = (-t * x2) / ONE / ((2n * n - 1n) * (2n * n)); s += t; n++; } return s; }
  function sinB(x) { x = reduce(x); const x2 = mul(x, x); let t = x, s = x, n = 1n; while (t !== 0n) { t = (-t * x2) / ONE / ((2n * n) * (2n * n + 1n)); s += t; n++; } return s; }
  function isqrt(n) { let x = BigInt(Math.ceil(Math.sqrt(Number(n)) * (1 + 1e-12))) + 1n; for (;;) { const y = (x + n / x) / 2n; if (y >= x) return x; x = y; } }

  /* ---------- the two fixed points ---------- */
  let THETA = big(739, 1000);
  for (let i = 0; i < 8; i++) THETA -= div(THETA - cosB(THETA), ONE + sinB(THETA));
  const LAM = sinB(THETA), PHI = (ONE + isqrt(5n * ONE * ONE)) / 2n;
  const XS = num(THETA), LAMd = num(LAM), PHId = num(PHI), SIN1 = Math.sin(1);
  const MAPS = {
    cos: { f: cosB, fp: (x) => -sinB(x), star: THETA, s: XS, slope: -LAMd, name: ['余弦', 'COSINE'], curve: 'y = cos x', sym: 'θ*', range: [-1.5, 3],
      g: (u) => -2 * XS * Math.sin(u / 2) ** 2 - LAMd * Math.sin(u), gp: (u) => -(LAMd * Math.cos(u) + XS * Math.sin(u)), quad: XS / (2 * (1 + LAMd)) },
    golden: { f: (x) => ONE + div(ONE, x), fp: (x) => -div(ONE, mul(x, x)), star: PHI, s: PHId, slope: -1 / (PHId * PHId), name: ['1 + 1/x', '1 + 1/x'], curve: 'y = 1 + 1/x', sym: 'φ', range: [0.2, 5],
      g: (u) => (PHId + u > 1e-9 ? -u / (PHId * (PHId + u)) : null), gp: (u) => -1 / (PHId + u) ** 2, quad: -1 / (PHId * (PHId * PHId + 1)) }
  };

  /* ---------- orbits (cached) ---------- */
  const KMAX = { iter: 60, newton: 5 };
  const cache = new Map();
  function orbit(map, x0c, kind, K) {
    const key = `${map}|${x0c}|${kind}|${K}`;
    if (cache.has(key)) return cache.get(key);
    const M = MAPS[map], xs = [big(x0c, 100)], fs = [];
    for (let k = 0; k < K; k++) {
      const x = xs[k], y = M.f(x); fs.push(y);
      if (kind === 'newton') { const d = ONE - M.fp(x); xs.push(d === 0n ? x : x - div(x - y, d)); } else xs.push(y);
    }
    fs.push(M.f(xs[K]));
    const o = { xs, u: xs.map((x) => num(x - M.star)), v: fs.map((y) => num(y - M.star)) };
    if (cache.size > 40) cache.clear();
    cache.set(key, o);
    return o;
  }
  const S = { scene: 'iter', map: 'cos', x0c: 100, cam: 'follow', D: 0 };
  const orb = () => orbit(S.map, S.x0c, S.scene === 'newton' ? 'newton' : 'iter', KMAX[S.scene === 'newton' ? 'newton' : 'iter']);
  /** How many plain iterations reach the accuracy of each Newton step (counted on a 300-step orbit). */
  function picardSteps(map, x0c) {
    const pic = orbit(map, x0c, 'iter', 300), nw = orbit(map, x0c, 'newton', KMAX.newton);
    return nw.u.map((e) => { const a = Math.abs(e); const j = pic.u.findIndex((p) => Math.abs(p) <= a); return j < 0 ? null : j; });
  }

  /* ---------- rational readings: the convergents of θ* ---------- */
  function convergents(x) {
    let p = x, q = ONE, h0 = 0n, h1 = 1n, k0 = 1n, k1 = 0n; const quot = [], out = [];
    for (let i = 0; i < 24 && q !== 0n; i++) {
      const a = p / q; quot.push(Number(a)); [p, q] = [q, p - a * q];
      const h = a * h1 + h0, k = a * k1 + k0; h0 = h1; h1 = h; k0 = k1; k1 = k; out.push([h, k]);
    }
    return { quot, out };
  }
  function reading(a, b) {
    const q = (a * ONE) / b, c = cosB(q);
    const err = num(q - THETA), res = num(c - q), bb = Number(b);
    return { a: String(a), b: String(b), q: num(q), u: err, v: num(c - THETA), res, b2res: bb * bb * Math.abs(res), ratio: Math.abs(res) / Math.abs(err) };
  }
  const CF = convergents(THETA);
  const READS = CF.out.filter(([, k]) => k >= 3n).slice(0, 10).map(([h, k]) => reading(h, k));
  const NR = READS.length;
  const rulerReading = (D) => (D > 0 ? reading((THETA * BigInt(D) + HALF) / ONE, BigInt(D)) : null);

  /* ---------- scenes ---------- */
  const SC = {
    iter: { max: () => KMAX.iter, rate: 3, name: ['迭代', 'ITERATE'] },
    newton: { max: () => KMAX.newton, rate: 0.8, name: ['牛顿', 'NEWTON'] },
    read: { max: () => NR - 1, rate: 0.7, name: ['读数', 'READINGS'] }
  };
  const step = () => Math.floor(clock.t + 1e-9), frac = () => clock.t - step();
  const lerpLog = (a, b, f) => Math.exp(Math.log(a) * (1 - f) + Math.log(b) * f);
  let lastG = null;

  function view() {
    const k = step(), f = frac();
    if (S.scene === 'read') {
      const e = (j) => Math.max(Math.abs(READS[Math.min(j, NR - 1)].u) * 2.6, 1e-300);
      return { cx: 0, cy: 0, h: lerpLog(e(k), e(k + 1), f), zoomed: true };
    }
    const O = orb(), M = MAPS[S.map], K = O.u.length - 1;
    if (S.cam === 'follow') {
      const hAt = (j) => {
        let m = 0;
        if (S.scene === 'newton') { const i = Math.min(j, K); m = Math.max(Math.abs(O.u[i]), Math.abs(O.v[i]), Math.abs(O.u[Math.min(i + 1, K)])) * 1.6; }
        else for (let i = Math.max(0, j - 2); i <= Math.min(K, j + 2); i++) m = Math.max(m, Math.abs(O.u[i]) * 1.5);
        return Math.max(m, 1e-300);
      };
      return { cx: 0, cy: 0, h: lerpLog(hAt(k), hAt(Math.min(K, k + 1)), f), zoomed: true };
    }
    if (S.cam === 'circle' && S.map === 'cos') return { cx: 0.52 - XS, cy: 0.52 - XS, h: 0.62, zoomed: false };
    let lo = 0, hi = 0;
    for (let j = 0; j <= Math.min(K, 14); j++) { for (const w of [O.u[j], O.v[j]]) if (isFinite(w)) { lo = Math.min(lo, w); hi = Math.max(hi, w); } }
    const pad = (hi - lo) * 0.12 + 0.05 * (M === MAPS.golden ? 2 : 1);
    return { cx: (lo + hi) / 2, cy: (lo + hi) / 2, h: (hi - lo) / 2 + pad, zoomed: false };
  }

  /* ---------- the stage ---------- */
  function drawStage() {
    const V = view(), k = step(), f = frac(), M = MAPS[S.scene === 'read' ? 'cos' : S.map], th = TRV.thumbMode ? 2 : 1;
    const g = kit.plot($('cv'), { x: [V.cx - V.h, V.cx + V.h], y: [V.cy - V.h, V.cy + V.h], pad: TRV.thumbMode ? [20, 20, 20, 20] : [30, 30, 74, 60], equal: true });
    lastG = g;
    const c = g.ctx, x0 = g.x0, x1 = g.x1, y0 = g.y0, y1 = g.y1, span = x1 - x0;
    c.save(); c.beginPath(); c.rect(g.pl, g.pt, g.iw, g.ih); c.clip();
    const lineThrough = (slope, col, s) => g.line([[x0, slope * x0], [x1, slope * x1]], col, s);
    const circle = S.scene !== 'read' && S.cam === 'circle' && S.map === 'cos';
    if (circle) {
      const ox = -XS;   // the origin x = 0, y = 0 in coordinates measured from the fixed point
      g.line([[x0, ox], [x1, ox]], P.faint, { width: 1 });
      const arc = []; for (let i = 0; i <= 90; i++) { const a = (Math.PI / 2) * i / 90; arc.push([Math.cos(a) - XS, Math.sin(a) - XS]); }
      g.line(arc, P.sigma, { width: 1.3 * th, alpha: 0.7 });
      g.line([[ox, ox], [0, LAMd - XS]], P.sigma, { width: 1 * th, alpha: 0.6 });
      g.line([[ox, ox], [0, ox]], P.cyan, { width: 4 * th });
      g.line([[0, ox], [0, LAMd - XS]], P.magenta, { width: 4 * th });
      g.line([[0, LAMd - XS], [0, 0]], P.dim, { width: 1, dash: [3, 4] });
      g.dot(0, LAMd - XS, P.magenta, 5 * th);
    }
    g.line([[Math.min(x0, y0), Math.min(x0, y0)], [Math.max(x1, y1), Math.max(x1, y1)]], P.dim, { width: 1.2 * th });
    if (S.scene === 'read') {
      lineThrough(0, P.dim, { width: 1.1 * th, dash: [6, 5] });
      lineThrough(-SIN1, P.dim, { width: 1.1 * th, dash: [6, 5] });
    } else {
      if (S.map === 'cos' && S.scene === 'iter') lineThrough(-SIN1, P.dim, { width: 1.1 * th, dash: [6, 5] });
      if (S.scene === 'iter') lineThrough(M.slope, P.magenta, { width: 1.4 * th, dash: [7, 5], alpha: 0.85 });
    }
    // the curve y = f(x), in coordinates measured from the fixed point
    const n = clamp(Math.ceil(span / 0.02), 360, 4000), pts = [];
    for (let i = 0; i <= n; i++) { const u = x0 + span * i / n, w = M.g(u); pts.push(w == null ? null : [u, w]); }
    g.line(pts, P.cyan, { width: 2.2 * th });

    if (S.scene === 'read') {
      const cur = READS[Math.min(k, NR - 1)];
      READS.forEach((r, j) => {
        if (r.u < x0 || r.u > x1 || j === Math.min(k, NR - 1)) return;
        g.line([[r.u, r.u], [r.u, r.v]], P.magenta, { width: 1.6 * th, alpha: 0.5 }); g.dot(r.u, r.u, P.cyan, 3.5 * th);
      });
      const R = rulerReading(S.D);
      if (R && R.u >= x0 && R.u <= x1) { g.line([[R.u, R.u], [R.u, R.v]], P.sigma, { width: 1.8 * th, dash: [4, 3] }); g.dot(R.u, R.u, P.sigma, 4 * th); }
      g.line([[cur.u, cur.u], [cur.u, cur.v]], P.magenta, { width: 3 * th, glow: 8 });
      g.dot(0, 0, P.sigma, 6 * th, { ring: true, width: 2 });
      g.dot(cur.u, cur.u, P.amber, 5.5 * th, { glow: 12 });
      c.restore();
      if (!TRV.thumbMode) {
        const right = cur.u > 0;
        g.text(cur.u, cur.u, `${cur.a}/${cur.b}`, P.amber, { align: right ? 'left' : 'right', base: 'middle', dx: right ? 12 : -12, size: 13, face: 'data' });
        g.text(cur.u, cur.u + 0.75 * (cur.v - cur.u), L('残差', 'residual'), P.magenta, { align: right ? 'left' : 'right', dx: right ? 10 : -10, size: 11.5, face: 'body' });
        if (R && R.u >= x0 && R.u <= x1) g.text(R.u, R.u, `${R.a}/${R.b}`, P.sigma, { align: R.u > 0 ? 'left' : 'right', base: 'top', dx: R.u > 0 ? 10 : -10, dy: 6, size: 12, face: 'data' });
        g.text(0, 0, 'θ*', P.ink, { align: 'center', base: 'bottom', dy: -12, size: 13 });
        g.text(x0 + span * 0.04, 0, L('斜率 0', 'slope 0'), P.dim, { align: 'left', base: 'bottom', dy: -4, size: 11, face: 'body' });
        const us = clamp(-(y0 + 0.1 * span) / SIN1, x0, x1 - span * 0.04);
        g.text(us, -SIN1 * us, L('斜率 −sin 1', 'slope −sin 1'), P.dim, { align: 'right', base: 'top', dx: -10, dy: 4, size: 11, face: 'body' });
      }
      return;
    }

    const O = orb(), K = O.u.length - 1, kk = Math.min(k, K), last = [O.u[kk], O.u[kk]];
    let curPt = last;
    if (S.scene === 'iter') {
      const web = [[O.u[0], O.u[0]]];
      for (let j = 0; j < kk; j++) { web.push([O.u[j], O.u[j + 1]]); web.push([O.u[j + 1], O.u[j + 1]]); }
      g.line(web, P.sigma, { width: 1.4 * th, alpha: 0.75 });
      if (kk < K && f > 0) {
        const a = Math.min(1, f * 2), b = Math.max(0, f * 2 - 1), u = O.u[kk], w = O.u[kk + 1], seg = [[u, u], [u, u + (w - u) * a]];
        if (b > 0) seg.push([u + (w - u) * b, w]);
        g.line(seg, P.amber, { width: 2.2 * th }); curPt = seg[seg.length - 1];
      }
    } else {
      for (let j = 0; j < kk; j++) {
        g.line([[O.u[j], O.u[j]], [O.u[j], O.v[j]]], P.sigma, { width: 1.3 * th, alpha: 0.7 });
        g.line([[O.u[j], O.v[j]], [O.u[j + 1], O.u[j + 1]]], P.magenta, { width: 1.8 * th, alpha: 0.75 });
      }
      if (kk < K) {
        const u = O.u[kk], v = O.v[kk], w = O.u[kk + 1], s = M.gp(u);
        // the whole tangent line at x_k, thin, then the step along it
        g.line([[x0, v + s * (x0 - u)], [x1, v + s * (x1 - u)]], P.magenta, { width: 1, alpha: 0.45, dash: [5, 4] });
        if (f > 0) {
          const a = Math.min(1, f * 2), b = Math.max(0, f * 2 - 1), seg = [[u, u], [u, u + (v - u) * a]];
          if (b > 0) seg.push([u + (w - u) * b, v + (w - v) * b]);
          g.line(seg, P.amber, { width: 2.2 * th }); curPt = seg[seg.length - 1];
        }
      }
    }
    g.dot(0, 0, P.sigma, 6 * th, { ring: true, width: 2 });
    g.dot(curPt[0], curPt[1], P.amber, 5.5 * th, { glow: 12 });
    c.restore();
    if (TRV.thumbMode) return;
    // labels
    const xl = x0 + span * 0.05, xr = x1 - span * 0.05;
    g.text(xr, xr, 'y = x', P.dim, { align: 'right', base: 'top', dx: -6, dy: 8, size: 11.5 });
    const cu = x0 + span * 0.08, cw = M.g(cu);
    if (!circle && cw != null && cw > y0 && cw < y1 && Math.abs(cw - M.slope * cu) > span * 0.12) g.text(cu, cw, M.curve, P.cyan, { align: 'left', base: 'bottom', dx: 6, dy: -8, size: 12 });
    g.text(0, 0, M.sym, P.ink, { align: 'center', base: 'bottom', dy: -12, size: 13.5 });
    if (S.scene === 'iter') {
      const yt = M.slope * xl;
      if (yt > y0 && yt < y1) g.text(xl, yt, `${L('切线斜率', 'tangent slope')} ${fix(M.slope, 3)}`, P.magenta, { align: 'left', base: 'top', dy: 8, size: 11.5, face: 'body' });
      if (S.map === 'cos') { const ys = -SIN1 * xl; if (ys > y0 && ys < y1) g.text(xl, ys, L('最陡 −sin 1', 'steepest −sin 1'), P.dim, { align: 'left', base: 'bottom', dy: -6, size: 11, face: 'body' }); }
    }
    if (circle) {
      g.text(-XS / 2, -XS, 'θ*', P.cyan, { align: 'center', base: 'top', dy: 8, size: 13 });
      g.text(0, (LAMd - 2 * XS) / 2, 'λ = sin θ*', P.magenta, { align: 'left', dx: 10, size: 12.5 });
      g.text(0, LAMd - XS, 'P', P.magenta, { align: 'left', base: 'top', dx: 9, dy: 4, size: 13 });
      g.text(-XS, -XS, 'O', P.dim, { align: 'left', base: 'top', dx: 4, dy: 8, size: 11.5 });
    }
  }

  /* ---------- HUD, readouts, plots ---------- */
  function drawText() {
    const k = step(), set = (i, lab, val) => { $(`roL${i}`).textContent = lab; $(`ro${i}`).innerHTML = val; };
    const V = view(); let pill = '—';
    if (S.scene === 'read') {
      const r = READS[Math.min(k, NR - 1)], R = rulerReading(S.D);
      $('hudBig').textContent = L(`渐近分数 ${r.a}/${r.b}`, `CONVERGENT ${r.a}/${r.b}`);
      $('hudSub').textContent = L(`残差 |cos q − q| = ${sci(Math.abs(r.res))} > 0；分母² × 残差 = ${fix(r.b2res, 3)} < 1 + sin 1 · 视野宽 ${sci(2 * V.h)}`, `Residual |cos q − q| = ${sci(Math.abs(r.res))} > 0; denominator² × residual = ${fix(r.b2res, 3)} < 1 + sin 1 · view width ${sci(2 * V.h)}`);
      $('roKeyL').textContent = L('分母² × 残差', 'denominator² × residual');
      $('roKey').innerHTML = `${fix(r.b2res, 4)} <span class="chk">&lt; 1 + sin 1 ✓</span>`; $('roKeySub').textContent = `b²·|cos(a/b) − a/b|, 1 + sin 1 = ${fix(1 + SIN1, 4)}`;
      set(1, L('读数 q = a/b', 'reading q = a/b'), `${r.a}/${r.b} = ${r.q.toFixed(10)}`);
      set(2, L('离 θ* 多远 |q − θ*|', 'distance to θ*, |q − θ*|'), sci(Math.abs(r.u)));
      set(3, L('残差 |cos q − q|', 'residual |cos q − q|'), sci(Math.abs(r.res)));
      set(4, L('残差 ÷ 距离', 'residual ÷ distance'), fix(r.ratio, 4));
      set(5, R ? L(`尺子 ${R.a}/${R.b} 的残差`, `residual of the ruler ${R.a}/${R.b}`) : L('尺子', 'ruler'), R ? L(`${sci(Math.abs(R.res))}（本读数的 ${fix(Math.abs(R.res) / Math.abs(r.res), 2)} 倍）`, `${sci(Math.abs(R.res))} (${fix(Math.abs(R.res) / Math.abs(r.res), 2)}× this reading)`) : L('不用（D = 0）', 'none (D = 0)'));
      $('roNote').textContent = L('残差总在 |q − θ*| 与 (1 + sin 1)|q − θ*| 之间，比值趋于 1 + sin θ* ≈ 1.6736；缝随分母的平方收窄，却从不为零。', 'The residual always lies between |q − θ*| and (1 + sin 1)|q − θ*|, and the ratio tends to 1 + sin θ* ≈ 1.6736; the seam narrows like one over the square of the denominator and is never zero.');
      pill = sci(Math.abs(r.res));
    } else {
      const O = orb(), M = MAPS[S.map], K = O.u.length - 1, kk = Math.min(k, K), e = Math.abs(O.u[kk]);
      const zoom = V.zoomed ? ` · ${L('视野宽', 'view width')} ${sci(2 * V.h)}` : '';
      if (S.scene === 'iter') {
        $('hudBig').textContent = L(`${M.name[0]} · 第 ${kk} 步`, `${M.name[1]} · STEP ${kk}`);
        $('hudSub').textContent = L(`离 ${M.sym} 还差 ${sci(e)}`, `${sci(e)} from ${M.sym}`) + (kk > 0 && O.u[kk - 1] !== 0 ? L(`；这一步误差乘以 ${fix(O.u[kk] / O.u[kk - 1], 3)}`, `; this step multiplied the error by ${fix(O.u[kk] / O.u[kk - 1], 3)}`) : '') + zoom;
        $('roKeyL').textContent = L('这一步误差乘以', 'this step multiplied the error by');
        $('roKey').innerHTML = kk > 0 && O.u[kk - 1] !== 0 ? fix(O.u[kk] / O.u[kk - 1], 4) : '—';
        $('roKeySub').textContent = L(`→ 不动点处的斜率 ${fix(M.slope, 4)}`, `→ the slope at the fixed point, ${fix(M.slope, 4)}`);
        set(1, L(`当前读数 x${sub(kk)}`, `current reading x${sub(kk)}`), str(O.xs[kk], 14));
        set(2, L(`离不动点 |x${sub(kk)} − ${M.sym}|`, `distance |x${sub(kk)} − ${M.sym}|`), sci(e));
        set(3, L('不动点处的斜率', 'slope at the fixed point'), fix(M.slope, 4));
        set(4, S.map === 'cos' ? L('[0, 1] 上最陡的斜率', 'steepest slope on [0, 1]') : L('不动点 φ', 'fixed point φ'), S.map === 'cos' ? fix(-SIN1, 4) : str(PHI, 10));
        set(5, L('每多一位十进制要走', 'steps per extra decimal digit'), `${fix(Math.log(10) / Math.abs(Math.log(Math.abs(M.slope))), 2)}${L(' 步', '')}`);
        $('roNote').textContent = S.map === 'cos'
          ? L('靠近 θ* 之后，每步误差乘以接近 −0.674 的数，而不是全局界的 0.8415；负号让折线一左一右地夹住不动点。', 'Near θ* each step multiplies the error by a number close to −0.674, not by the global 0.8415; the minus sign makes the path close in from alternating sides.')
          : L('从 1 出发，读数依次是 2、3/2、5/3、8/5……，相邻斐波那契数之比；每步误差乘以接近 −1/φ² ≈ −0.382 的数。', 'From 1 the readings are 2, 3/2, 5/3, 8/5, …, ratios of consecutive Fibonacci numbers; each step multiplies the error by a number close to −1/φ² ≈ −0.382.');
      } else {
        const ps = picardSteps(S.map, S.x0c), dig = (x) => (x > 0 ? Math.max(0, Math.floor(-Math.log10(x))) : 70), digits = dig(e);
        const trail = O.u.slice(0, kk + 1).map((x) => dig(Math.abs(x))).join(' → ');
        $('hudBig').textContent = L(`牛顿 · 第 ${kk} 步`, `NEWTON · STEP ${kk}`);
        $('hudSub').textContent = L(`离 ${M.sym} 还差 ${sci(e)}；正确位数 ${trail}；单纯迭代要走 ${ps[kk] == null ? '300 多' : ps[kk]} 步才到这么近`, `${sci(e)} from ${M.sym}; correct digits ${trail}; the plain iteration needs ${ps[kk] == null ? 'over 300' : ps[kk]} steps to get this close`) + zoom;
        $('roKeyL').textContent = L(`|δ${sub(kk)}| ÷ δ${sub(Math.max(kk - 1, 0))}²`, `|δ${sub(kk)}| ÷ δ${sub(Math.max(kk - 1, 0))}²`);
        $('roKey').innerHTML = kk > 0 && O.u[kk - 1] !== 0 ? fix(Math.abs(O.u[kk]) / (O.u[kk - 1] * O.u[kk - 1]), 6) : '—';
        $('roKeySub').textContent = L(`→ ${fix(Math.abs(M.quad), 4)}：误差每步约平方一次`, `→ ${fix(Math.abs(M.quad), 4)}: the error is roughly squared at each step`);
        set(1, L(`当前读数 x${sub(kk)}`, `current reading x${sub(kk)}`), str(O.xs[kk], 24));
        set(2, L('离不动点 |δₖ|', 'distance |δₖ|'), sci(e));
        set(3, L('正确的十进制位数', 'correct decimal digits'), String(digits));
        set(4, L('单纯迭代要走几步', 'plain iteration needs'), ps[kk] == null ? '> 300' : `${ps[kk]}${L(' 步', ' steps')}`);
        set(5, L(`切线的斜率 f′(x${sub(kk)})`, `slope of the tangent, f′(x${sub(kk)})`), fix(num(MAPS[S.map].fp(O.xs[kk])), 6));
        $('roNote').textContent = L('牛顿每一步除了读曲线的高度，还读它的斜率（对余弦就是 sin xₖ）；沿切线走到直线 y = x，正确位数每步约翻一倍。', 'Besides the height of the curve, each Newton step reads its slope (sin xₖ for the cosine); following the tangent to the line y = x roughly doubles the correct digits at each step.');
      }
      pill = sci(e);
    }
    $('roAside').textContent = S.scene === 'read' ? 'q = a/b' : MAPS[S.map].curve;
    $('pillScene').querySelector('strong').textContent = SC[S.scene].name[1];
    $('pillStep').querySelector('strong').textContent = String(step());
    $('pillGap').querySelector('strong').textContent = pill;
    const map = S.scene === 'read' ? 'cos' : S.map;
    document.querySelectorAll('[data-map].lean').forEach((el) => { el.hidden = el.dataset.map !== map; });
    const cv = [['cy', MAPS[map].curve, MAPS[map].curve], ['dm', 'y = x', 'y = x']];
    const LEG = {
      iter: cv.concat([['ink', '走过的路', 'the path so far'], ['am', '这一步', 'this step'], ['dash', '不动点处的切线', 'tangent at the fixed point']]),
      newton: cv.concat([['ink', '竖着读高度', 'up to the curve'], ['mg', '沿切线走', 'along the tangent'], ['am', '这一步', 'this step']]),
      read: cv.concat([['mg', '残差 |cos q − q|', 'residual |cos q − q|'], ['am', '当前读数', 'current reading'], ['dash dm', '楔形边界', 'the wedge']])
    };
    let leg = LEG[S.scene];
    if (S.scene === 'iter' && S.cam === 'circle' && S.map === 'cos') leg = [cv[0], ['cy', 'θ*：停在哪里', 'θ*: where it stops'], ['mg', 'λ = sin θ*：合拢多快', 'λ = sin θ*: how fast it closes'], ['dash', '斜率 −λ 的切线', 'tangent of slope −λ'], ['am', '这一步', 'this step']];
    if (S.scene === 'read' && S.D > 0) leg = leg.concat([['ink', `尺子 a/${S.D}`, `ruler a/${S.D}`]]);
    const html = leg.map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== html) { $('legend').innerHTML = html; $('legend')._h = html; }
  }

  const POW = (e) => [Math.pow(10, e), e === 0 ? '1' : `10${String(e).split('').map((c) => SUP[c]).join('')}`];
  function logTicks(lo, hi, n) { const a = Math.ceil(Math.log10(lo)), b = Math.floor(Math.log10(hi)), st = Math.max(1, Math.ceil((b - a) / n)); const t = []; for (let e = b; e >= a; e -= st) t.push(POW(e)); return t; }
  function drawPlots() {
    const k = step(), A = $('plotA'), B = $('plotB');
    if (S.scene === 'read') {
      const g = kit.plot(A, { x: [-0.6, NR - 0.4], y: [0, 2.1], pad: [34, 10, 10, 22] });
      g.axes({ yTicks: [0, 1, [1 + SIN1, '1.84']], xTicks: READS.map((r, j) => [j, j % 2 ? '' : r.b]) });
      READS.forEach((r, j) => g.rect(j - 0.3, 0, j + 0.3, r.b2res, j === Math.min(k, NR - 1) ? P.amber : P.magenta, { alpha: j === k ? 0.9 : 0.55 }));
      g.hline(1 + SIN1, P.dim, { dash: [5, 4] });
      $('pATitle').textContent = L('残差乘分母的平方', 'Residual times denominator squared'); $('pAMeta').textContent = `< 1 + sin 1`;
      const g2 = kit.plot(B, { x: [-0.6, NR - 0.4], y: [0.8, 2], pad: [34, 10, 10, 22] });
      g2.axes({ yTicks: [[1, '1'], [1 + LAMd, '1.67'], [1 + SIN1, '1.84']], xTicks: READS.map((r, j) => [j, j % 2 ? '' : r.b]) });
      g2.hline(1, P.dim, { dash: [5, 4] }); g2.hline(1 + SIN1, P.dim, { dash: [5, 4] }); g2.hline(1 + LAMd, P.magenta, { dash: [3, 3], alpha: 0.8 });
      READS.forEach((r, j) => g2.dot(j, r.ratio, j === Math.min(k, NR - 1) ? P.amber : P.magenta, j === k ? 5 : 3.5));
      $('pBTitle').textContent = L('残差是距离的几倍', 'Residual over distance'); $('pBMeta').textContent = `→ 1 + sin θ*`;
      return;
    }
    const O = orb(), M = MAPS[S.map], K = O.u.length - 1, kk = Math.min(k, K);
    if (S.scene === 'iter') {
      const r = []; for (let j = 0; j < K; j++) r.push(O.u[j] !== 0 ? [j + 1, O.u[j + 1] / O.u[j]] : null);
      const vals = r.filter(Boolean).map((p) => p[1]), lo = Math.max(-3, Math.min(-1, ...vals) - 0.05), hi = Math.min(1, Math.max(0, ...vals) + 0.05);
      const g = kit.plot(A, { x: [0, K], y: [lo, hi], pad: [40, 10, 10, 22] });
      g.axes({ yTicks: [[0, '0'], [M.slope, fix(M.slope, 3)], ...(S.map === 'cos' ? [[-SIN1, fix(-SIN1, 3)]] : []), [lo < -1.5 ? -2 : -1, lo < -1.5 ? '−2' : '−1']], xTicks: [0, 10, 20, 30, 40, 50, 60] });
      g.hline(M.slope, P.magenta, { dash: [5, 4] }); if (S.map === 'cos') g.hline(-SIN1, P.dim, { dash: [5, 4] });
      r.forEach((p) => p && g.dot(p[0], clamp(p[1], lo, hi), p[0] === kk ? P.amber : P.sigma, p[0] === kk ? 4.5 : 2.2));
      g.vline(kk, P.amber, { alpha: 0.6 });
      $('pATitle').textContent = L('每步误差乘以多少', 'What each step multiplies the error by'); $('pAMeta').textContent = `→ ${fix(M.slope, 4)}`;
      const es = O.u.map((u) => Math.abs(u)), pos = es.filter((x) => x > 0), ylo = Math.max(1e-60, Math.min(...pos) / 4), yhi = Math.max(10, Math.max(...es) * 4);
      const g2 = kit.plot(B, { x: [0, K], y: [ylo, yhi], logY: true, pad: [40, 10, 10, 22] });
      g2.axes({ yTicks: logTicks(ylo, yhi, 4), xTicks: [0, 10, 20, 30, 40, 50, 60] });
      const ref = []; for (let j = 0; j <= K; j++) ref.push([j, es[0] * Math.pow(Math.abs(M.slope), j)]);
      if (S.map === 'cos') { const bnd = []; for (let j = 1; j <= K; j++) bnd.push([j, es[1] * Math.pow(SIN1, j - 1)]); g2.line(bnd, P.dim, { dash: [5, 4] }); }
      g2.line(ref, P.magenta, { dash: [5, 4], alpha: 0.8 });
      g2.line(es.map((e, j) => (e > 0 ? [j, e] : null)), P.sigma, { width: 1.6 });
      g2.vline(kk, P.amber, { alpha: 0.6 }); if (es[kk] > 0) g2.dot(kk, es[kk], P.amber, 4.5);
      g2.legend([[P.sigma, L('实际误差', 'actual error')], [P.magenta, L('按切线斜率', 'at the tangent slope'), 'dash'], ...(S.map === 'cos' ? [[P.dim, L('全局界 (sin 1)ᵏ⁻¹', 'global bound (sin 1)ᵏ⁻¹'), 'dash']] : [])]);
      $('pBTitle').textContent = L('离不动点还有多远', 'Distance to the fixed point'); $('pBMeta').textContent = sci(es[kk]);
    } else {
      const pic = orbit(S.map, S.x0c, 'iter', 300), dg = (e) => (e > 0 ? Math.min(70, -Math.log10(e)) : 70);
      const nd = O.u.map((u, j) => [j, dg(Math.abs(u))]), pd = pic.u.slice(0, K + 1).map((u, j) => [j, dg(Math.abs(u))]);
      const top = Math.max(10, ...nd.map((p) => p[1])) * 1.1;
      const g = kit.plot(A, { x: [0, K], y: [Math.min(0, ...nd.map((p) => p[1]), ...pd.map((p) => p[1])) - 0.5, top], pad: [34, 10, 10, 22] });
      g.axes({ yTicks: [0, 10, 20, 30, 40].filter((v) => v < top), xTicks: [0, 1, 2, 3, 4, 5] });
      g.line(pd, P.cyan); pd.forEach((p) => g.dot(p[0], p[1], P.cyan, 2.5));
      g.line(nd, P.magenta); nd.forEach((p) => g.dot(p[0], p[1], p[0] === kk ? P.amber : P.magenta, p[0] === kk ? 4.5 : 3));
      g.legend([[P.magenta, L('牛顿', 'Newton')], [P.cyan, L('单纯迭代', 'plain iteration')]], { right: false });
      $('pATitle').textContent = L('正确的位数', 'Correct digits'); $('pAMeta').textContent = `${Math.floor(nd[kk][1])}`;
      const q = []; for (let j = 0; j < K; j++) q.push(O.u[j] !== 0 && O.u[j + 1] !== 0 ? [j + 1, Math.abs(O.u[j + 1]) / (O.u[j] * O.u[j])] : null);
      const qm = Math.max(Math.abs(M.quad) * 2, ...q.filter(Boolean).map((p) => p[1])) * 1.1;
      const g2 = kit.plot(B, { x: [0.5, K + 0.5], y: [0, Math.min(qm, 5)], pad: [40, 10, 10, 22] });
      g2.axes({ yTicks: [0, [Math.abs(M.quad), fix(Math.abs(M.quad), 3)]], xTicks: [1, 2, 3, 4, 5] });
      g2.hline(Math.abs(M.quad), P.magenta, { dash: [5, 4] });
      q.forEach((p) => p && g2.dot(p[0], Math.min(p[1], 5), p[0] === kk ? P.amber : P.sigma, p[0] === kk ? 4.5 : 3));
      $('pBTitle').textContent = L('误差 ÷ 上一步误差的平方', 'Error over the previous error squared'); $('pBMeta').textContent = `→ ${fix(Math.abs(M.quad), 4)}`;
    }
  }

  const paint = kit.painter(() => { drawStage(); drawPlots(); drawText(); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- controls ---------- */
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: KMAX.iter, rate: 3, step: 1,
    format: (t, max) => {
      const k = Math.floor(t + 1e-9);
      if (S.scene === 'read') { const r = READS[Math.min(k, NR - 1)]; return `${r.a}/${r.b} <small>${L(`第 ${k + 1} / ${max + 1} 个渐近分数`, `convergent ${k + 1} of ${max + 1}`)}</small>`; }
      return `${L('步', 'step')} ${k} <small>/ ${max.toFixed(0)}</small>`;
    },
    onChange: (t, c) => { if (stopAt != null && c.playing && t >= stopAt) { const at = stopAt; stopAt = null; c.pause(); c.set(at); return; } paint(); }
  });
  function setScene(sc, t) {
    S.scene = sc; sceneChips.set(sc, true);
    if (sc === 'read' && S.map !== 'cos') { S.map = 'cos'; mapChips.set('cos', true); setRange(); }
    document.querySelectorAll('section[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    clock.pause(); clock.rate = SC[sc].rate; clock.setMax(SC[sc].max(), true); clock.set(t == null ? 0 : t);
  }
  const leave = () => cards.mark(null);
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); stopAt = null; setScene(v); });
  function setRange() { const r = MAPS[S.map].range, el = $('x0'); el.min = String(r[0]); el.max = String(r[1]); document.querySelector('[data-cam="circle"]').toggleAttribute('disabled', S.map !== 'cos'); }
  const fX0 = kit.field($('x0'), { fmt: (v) => v.toFixed(2), onInput: (v) => { S.x0c = Math.round(v * 100); leave(); paint(); } });
  const mapChips = kit.chips($('mapChips'), 'map', (v) => {
    S.map = v; S.x0c = 100; setRange(); fX0.set(1);
    if (v !== 'cos' && S.cam === 'circle') { S.cam = 'whole'; camChips.set('whole', true); }
    leave(); paint();
  });
  const camChips = kit.chips($('camChips'), 'cam', (v) => { S.cam = v; leave(); paint(); });
  const fRuler = kit.field($('ruler'), { fmt: (v) => (v > 0 ? String(v) : L('关', 'off')), onInput: (v) => { S.D = v; leave(); paint(); } });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  // drag the start along the line y = x
  let dragging = false;
  const dragTo = (ev) => {
    if (!lastG || S.scene === 'read') return;
    const b = $('cv').getBoundingClientRect(), r = MAPS[S.map].range;
    const x = clamp(Math.round((lastG.invX(ev.clientX - b.left) + MAPS[S.map].s) * 100) / 100, r[0], r[1]);
    if (S.cam === 'follow') { S.cam = 'whole'; camChips.set('whole', true); }
    S.x0c = Math.round(x * 100); fX0.set(x); leave(); paint();
  };
  $('cv').addEventListener('pointerdown', (ev) => { if (S.scene === 'read') return; if (S.cam === 'follow') { S.cam = 'whole'; camChips.set('whole', true); paint.now(); } dragging = true; $('cv').setPointerCapture(ev.pointerId); dragTo(ev); });
  $('cv').addEventListener('pointermove', (ev) => { if (dragging) dragTo(ev); });
  const drop = () => { dragging = false; };
  $('cv').addEventListener('pointerup', drop); $('cv').addEventListener('pointercancel', drop);
  kit.keys({ 1: () => { leave(); setScene('iter'); }, 2: () => { leave(); setScene('newton'); }, 3: () => { leave(); setScene('read'); },
    m: () => { if (S.scene !== 'read') mapChips.set(S.map === 'cos' ? 'golden' : 'cos'); } });

  /* ---------- experiment cards ---------- */
  const CARDS = {
    golden: { scene: 'iter', map: 'golden', x0: 1, cam: 'whole', to: 8, still: 6 },
    far: { scene: 'iter', map: 'cos', x0: 3, cam: 'whole', to: 12, still: 5 },
    rate: { scene: 'iter', map: 'cos', x0: 1, cam: 'follow', to: 20, still: 8 },
    circle: { scene: 'iter', map: 'cos', x0: 1, cam: 'circle', to: 14, still: 14 },
    newton: { scene: 'newton', map: 'cos', x0: 1, cam: 'follow', to: 2, still: 2 },
    rational: { scene: 'read', D: 0, to: NR - 1, still: 6 },
    ruler: { scene: 'read', D: 1000, at: 3 }
  };
  const NOTES = {
    golden: ['从 x₀ = 1 反复按 1 + 1/x：折线依次落在 2、3/2、5/3、8/5……，一左一右夹住青色曲线与灰线的交点 φ ≈ 1.618。每一圈的宽度约是上一圈的 0.382 倍，正是品红切线斜率的大小。', 'Press 1 + 1/x again and again from x₀ = 1: the path lands on 2, 3/2, 5/3, 8/5, …, closing on φ ≈ 1.618, where the cyan curve meets the grey line, from alternating sides. Each turn is about 0.382 times as wide as the one before, the size of the slope of the magenta tangent.'],
    far: ['从很远的 x₀ = 3 出发反复取余弦：第一步就落进 [−1, 1]（cos 3 ≈ −0.990），此后一圈圈绕向同一个 θ* ≈ 0.739。终点与起点无关。', 'Take the cosine again and again from a far start, x₀ = 3: the first step already lands in [−1, 1] (cos 3 ≈ −0.990), and from there the path winds in on the same θ* ≈ 0.739. The end does not depend on the start.'],
    rate: ['从 θ₀ = 1 反复取余弦，画面跟着误差放大。放大之后曲线与品红切线重合，每一圈的形状都一样：误差每步乘以约 −0.674，比灰色虚线（最陡的 −sin 1 ≈ −0.84）平缓。', 'Take the cosine again and again from θ₀ = 1 while the view zooms with the error. Zoomed in, the curve lies on the magenta tangent and every turn has the same shape: the error is multiplied by about −0.674 per step, gentler than the dashed grey line (the steepest, −sin 1 ≈ −0.84).'],
    circle: ['同一张图加上单位圆。圆上的点 P = (θ*, sin θ*)：青色的横坐标是蛛网收进去的位置 θ*，品红的高度 λ = sin θ* ≈ 0.674 是每步缩小的比例，也是品红切线斜率的大小。', 'The same plane with the unit circle. The point P = (θ*, sin θ*) on it: its cyan abscissa is θ*, where the cobweb closes in, and its magenta height λ = sin θ* ≈ 0.674 is the ratio by which each step shrinks the error, the size of the slope of the magenta tangent.'],
    newton: ['同样从 θ₀ = 1 出发，每一步先竖着读曲线的高度，再沿品红切线走到灰线。画面跟着放大，停在第 2 步：视野宽约 10⁻⁴，琥珀色的 x₂ 刚沿上一步的品红切线落到灰线上，正确位数 0 → 1 → 4，误差约每步平方一次。拖时间轴看第 3、4 步：9 位、20 位。', 'Again from θ₀ = 1: each step reads the height of the curve, then follows the magenta tangent to the grey line. The view zooms along and stops at step 2, about 10⁻⁴ wide: the amber x₂ has just come down the magenta tangent of the previous step onto the grey line; correct digits 0 → 1 → 4, the error roughly squared at each step. Scrub the rail for steps 3 and 4: 9 and 20 digits.'],
    rational: ['θ* 的渐近分数 2/3、3/4、14/19、17/23、694/939……一个个落在灰线上（琥珀色是当前这个）。品红竖线是到余弦曲线的落差，即残差 |cos q − q|：它总停在两条灰色虚线张成的楔形里，画面放大了千万倍，它仍在。', 'The convergents of θ*, 2/3, 3/4, 14/19, 17/23, 694/939, …, land one by one on the grey line (amber is the current one). The magenta upright is the drop to the cosine curve, the residual |cos q − q|: it always stays inside the wedge of the two dashed grey lines, and with the view magnified ten million times it is still there.'],
    ruler: ['琥珀色的 17/23 与虚线标出的尺子读数 739/1000 并排：一千等分的尺子离 θ* 最近的一格，残差约是二十三等分那一格的两倍。', 'The amber 17/23 next to the dashed ruler reading 739/1000: the tick nearest θ* on a ruler of a thousand divisions leaves about twice the residual of the tick on a ruler of twenty-three.']
  };
  let booting = true;
  function run(sc, to, still) {
    setScene(sc, 0);
    if (TRV.still || (booting && !TRV.embed)) { clock.set(still == null ? to : still); return; }
    stopAt = to;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  function applyPreset(id) {
    const c = CARDS[id]; stopAt = null;
    if (c.scene === 'read') { S.D = c.D; fRuler.set(c.D); }
    else { S.map = c.map; mapChips.set(c.map, true); setRange(); S.x0c = Math.round(c.x0 * 100); fX0.set(c.x0); S.cam = c.cam; camChips.set(c.cam, true); }
    if (c.at != null) { setScene(c.scene, c.at); return; }
    run(c.scene, c.to, c.still);
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换映射、拖起点、换镜头、拖时间轴。随时可以再选一张卡。', 'Free play: switch the map, drag the start, change the camera, scrub the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  window.FPC_DEBUG = {
    get state() {
      const k = step(), V = view(), base = { scene: S.scene, map: S.map, cam: S.cam, x0: S.x0c / 100, D: S.D, step: k, t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current, viewHalf: V.h, xstar: str(THETA, 60), lambda: str(LAM, 60), phi: str(PHI, 60) };
      if (S.scene === 'read') { const r = READS[Math.min(k, NR - 1)]; return Object.assign(base, { reading: r, reads: READS.map((x) => `${x.a}/${x.b}`), quotients: CF.quot.slice(0, 14), ruler: rulerReading(S.D) }); }
      const O = orb(), kk = Math.min(k, O.u.length - 1);
      return Object.assign(base, { xk: str(O.xs[kk], 60), u: O.u.slice(), uk: O.u[kk], ratio: kk > 0 ? O.u[kk] / O.u[kk - 1] : null, slope: MAPS[S.map].slope, picardSteps: S.scene === 'newton' ? picardSteps(S.map, S.x0c) : null });
    },
    seek: (t) => { stopAt = null; clock.pause(); clock.set(t); },
    /** Screen point of the actual value x on the line y = x (for pointer tests). */
    at: (x) => { const b = $('cv').getBoundingClientRect(), u = x - MAPS[S.map].s; return [b.left + lastG.X(u), b.top + lastG.Y(u)]; }
  };
  window.TRV_THUMB = () => { S.map = 'cos'; mapChips.set('cos', true); setRange(); S.x0c = 100; S.cam = 'circle'; camChips.set('circle', true); setScene('iter', 14); paint.now(); };
  setRange();
  cards.pick(cards.initial('rate'));
  booting = false;
  paint();
})();
