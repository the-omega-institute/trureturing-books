/* ORTHO//CUT: the coda's golden cut, in five scenes.
   cut      the golden integers a + bφ as the lattice (a + bφ, a + bψ); the window [φ − 2, φ − 1] + u selects points and
            their projections are φ or φ² apart; fixing a small patch leaves only a short range of admissible shifts
   cassini  the powers φᵏ⁺¹ = Fₖ + Fₖ₊₁φ in the same lattice: the rectangle between the origin and (φᵏ⁺¹, ψᵏ⁺¹) has
            signed area Fₖ·Fₖ₊₂ − Fₖ₊₁² = (−1)ᵏ⁺¹, and no other lattice point lies between the hyperbolas x·x′ = ±1
   returns  the rotation by the golden angle seen through h(x) = cos 2πx: visits to (u₁, u₂) over the first N steps; the
            longest gap between two visits so far and its reciprocal are sample statistics, not the theorem's M
   window3  the rhombic triacontahedron as the zonohedron of the six fivefold axes, a lit solid cut open towards the card's
            camera so that the inside shows; the margin d∂ of a point inside, and for comparison a point near the boundary
            on the same ray
   gaps     the first N points {ia} of a rotation on a circle of length 1: the arcs between neighbours have at most three
            lengths (the three-gap theorem); a = 1/φ² (the golden angle) or π − 3
   The rail is the shift u (cut), k (cassini), the number of steps N (returns), the position of the point (window3) or
   the number of points N (gaps).
   Read-only probe for the browser suite: window.CUT_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, sgn, clamp, TAU } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PHI = (1 + Math.sqrt(5)) / 2, PSI = 1 - PHI, R5 = Math.sqrt(5), LO = PHI - 2, HI = PHI - 1, MID = (LO + HI) / 2;
  const EDGE = 0.08, PATCH = 4, KMAX = 6, KN = 12, NMAX = 233, SMAX = 1.2, TOL = 1e-12;
  const S = { scene: 'cut', patch: null, wc: 0.5, ww: 0.6, rot: 'golden' };
  const GMIN = 2, GMAX = 400, ROT = { golden: 2 - PHI, pi: Math.PI - 3 }, EDGE_S = 0.93;
  const face = (f) => (f === 'body' ? TRV.fonts.body : f === 'display' ? TRV.fonts.display : TRV.fonts.data);
  function text(ctx, str, x, y, color, o) {
    o = o || {};
    ctx.font = `${o.weight ? o.weight + ' ' : ''}${o.size || 11}px ${face(o.face)}`; ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'middle'; ctx.globalAlpha = o.alpha == null ? 1 : o.alpha;
    if (o.halo !== false) { ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.strokeStyle = P.stage; ctx.strokeText(str, x, y); }
    ctx.fillStyle = color; ctx.fillText(str, x, y); ctx.globalAlpha = 1;
  }

  /* ---------- cut: the lattice of golden integers and the window ---------- */
  /** The golden integers a + bφ with |a + bφ| ≤ xmax and |a + bψ| ≤ cmax as { a, b, x, c }, sorted by x. */
  function lattice(xmax, cmax) {
    const out = [], bmax = Math.ceil((xmax + cmax) / R5);
    for (let b = -bmax; b <= bmax; b++) for (let a = Math.ceil(-b * PSI - cmax); a <= Math.floor(-b * PSI + cmax); a++) { const x = a + b * PHI; if (Math.abs(x) <= xmax) out.push({ a, b, x, c: a + b * PSI }); }
    return out.sort((p, q) => p.x - q.x);
  }
  const NEAR = lattice(60, 2.3);
  const inWin = (c, u) => c >= LO + u - TOL && c <= HI + u + TOL;           // the closed window [φ − 2, φ − 1] + u
  const margin = (c, u) => Math.min(c - LO - u, HI + u - c);
  /** The Zeckendorf code of n by the greedy rule: digit i (from the lowest) stands for the Fibonacci number F_{i+2} = 1, 2, 3, 5, … */
  function zeck(n) {
    const F = [1, 2]; while (F[F.length - 1] <= n) F.push(F[F.length - 1] + F[F.length - 2]);
    const d = F.map(() => 0); let r = n;
    for (let i = F.length - 1; i >= 0; i--) if (F[i] <= r) { r -= F[i]; d[i] = 1; }
    while (d.length > 1 && !d[d.length - 1]) d.pop();
    return d;
  }
  const fibW = (i) => { let a = 1, b = 2; for (let k = 0; k < i; k++) [a, b] = [b, a + b]; return a; };     // F_{i+2}
  /** betaGolden(n): the Zeckendorf digits of n read in base φ, as the golden integer [a, b] (so that b = n). */
  function beta(n) {
    let a = 0, b = 0;
    zeck(n).forEach((x, i) => { if (x) { a += i ? fibW(i - 1) : 1; b += fibW(i); } });   // φ^(i+2) = F_{i+1} + F_{i+2}·φ
    return [a, b];
  }
  /** The strip of Zeckendorf codes for n = 0 … ZN: adjacent pairs of 1s and codes whose weights do not add up to n. */
  const ZN = 54, ZROWS = 8;
  const ZSTRIP = (() => {
    const codes = [], adjacent = [], wrong = [];
    for (let n = 0; n <= ZN; n++) {
      const d = zeck(n); codes.push(d);
      for (let i = 1; i < d.length; i++) if (d[i] && d[i - 1]) adjacent.push([n, i]);
      if (d.reduce((t, x, i) => t + x * fibW(i), 0) !== n) wrong.push(n);
    }
    return { codes, adjacent, wrong };
  })();
  /** The shifts that leave the selection among the points with |x| ≤ PATCH as it is at the shift u: the interval (lo, hi). */
  function patchAt(u) {
    let lo = -Infinity, hi = Infinity;
    for (const p of NEAR) {
      if (Math.abs(p.x) > PATCH) continue;
      if (inWin(p.c, u)) { lo = Math.max(lo, p.c - HI); hi = Math.min(hi, p.c - LO); } else if (p.c > HI + u) hi = Math.min(hi, p.c - HI); else lo = Math.max(lo, p.c - LO);
    }
    return { lo, hi, ref: u };
  }
  const uOf = (t) => (S.patch ? S.patch.lo + (S.patch.hi - S.patch.lo) * (0.01 + 0.98 * t) : t - 0.5);
  const tOf = (u) => (S.patch ? ((u - S.patch.lo) / (S.patch.hi - S.patch.lo) - 0.01) / 0.98 : u + 0.5);
  const halfX = () => (TRV.thumbMode ? 6.4 : clamp(($('stage').clientWidth || 720) / 76, 5.2, 9.6));
  function cutState(t) {
    const u = uOf(t), half = halfX(), sel = NEAR.filter((p) => inWin(p.c, u)), gaps = [];
    for (let i = 1; i < sel.length; i++) gaps.push(sel[i].x - sel[i - 1].x);
    const kinds = [...new Set(gaps.map((d) => d.toFixed(6)))].map(Number).sort((a, b) => a - b);
    const seen = sel.filter((p) => Math.abs(p.x) <= half), deep = seen.reduce((m, p) => (m && margin(m.c, u) >= margin(p.c, u) ? m : p), null);
    const q = { u, half, sel, gaps, kinds, seen, deep, minGap: Math.min(...gaps), edge: seen.filter((p) => margin(p.c, u) < EDGE).length };
    if (S.patch) {
      const a = LO + S.patch.hi, b = HI + S.patch.lo, far = NEAR.filter((p) => Math.abs(p.x) > PATCH && Math.abs(p.x) <= half);
      q.emp = [a, b];
      q.forced = far.filter((p) => p.c >= a - TOL && p.c <= b + TOL);
      q.free = far.filter((p) => (p.c > LO + S.patch.lo && p.c < a - TOL) || (p.c > b + TOL && p.c < HI + S.patch.hi));
    }
    return q;
  }
  /* MIN_H: a chart's readable height (two 10px label rows and a 4px gap), declared to kit.plot as minHeight. A lab stage
     grows to the height its charts declare (kit.plot publishes it). A cited figure or a still keeps its frame: when the
     free box (between the HUD and the legend) is shorter than a scene needs (its chart's readable height and the rows it
     draws around the chart), the scene keeps that, centred on the box, and the HUD text, drawn with a halo, runs over
     its edges. */
  const MIN_H = 24;
  function fitBand(H, top, bottom, need) {
    if (!(TRV.figure || TRV.still) || H - top - bottom >= need) return { top, bottom };
    const t = clamp((top + H - bottom - need) / 2, 0, Math.max(0, H - need));
    return { top: t, bottom: Math.max(0, H - t - need) };
  }
  function drawCut(q) {
    const words = !TRV.thumbMode, u = q.u, K = words ? 1 : 2.2;      // the cover is drawn bolder: it is read at card size
    /* the physical line and its ticks go under the chart. A narrow cited figure has a short band: the row of tiles sits
       closer, its tick numbers stay only while the chart keeps 44px, and the chart shows a little less of the conjugate
       axis around the window, so the window and its points keep their height */
    const tight = words && narrowFigure(), band = $('flat').clientHeight - box.top - box.bottom, ticks = !tight || band - 31 >= 44;
    const rows = !words ? 36 : !tight ? 46 : ticks ? 31 : 20, span = tight ? 1.55 : 1.9, b = fitBand($('flat').clientHeight, box.top, box.bottom, MIN_H + rows);
    const g = kit.plot($('flat'), { x: [-q.half, q.half], y: [MID - span, MID + span], pad: [words ? 30 : 8, 10, b.top, b.bottom + rows], minHeight: MIN_H }), ctx = g.ctx; view = g;
    const lo = LO + u, hi = HI + u, rowY = g.pt + g.ih + (tight ? 10 : 15), rowH = !words ? 22 : tight ? 11 : 12, inView = (p) => p.x >= g.x0 && p.x <= g.x1 && p.c >= g.y0 && p.c <= g.y1;
    g.rect(g.x0, lo, g.x1, hi, P.amber, { alpha: words ? 0.09 : 0.14 });
    if (q.emp) g.rect(g.x0, q.emp[0], g.x1, q.emp[1], P.cyan, { alpha: 0.13 });
    g.hline(lo, P.amber, { width: 1.4 * K }); g.hline(hi, P.amber, { width: 1.4 * K });
    g.hline(0, P.ink, { alpha: 0.45 }); g.vline(0, P.faint, { alpha: 0.7 });
    if (S.patch) for (const x of [-PATCH, PATCH]) g.vline(x, P.ink, { dash: [4, 4], alpha: 0.75 });
    for (const p of NEAR) if (inView(p) && !inWin(p.c, u)) g.dot(p.x, p.c, P.dim, 2.4 * K, { alpha: 0.8 });
    const flips = (p) => (S.patch ? q.free.includes(p) : margin(p.c, u) < EDGE);
    if (S.patch) for (const p of q.free) if (!inWin(p.c, u) && inView(p)) g.dot(p.x, p.c, P.magenta, 4.6 * K, { ring: true, width: 1.6 });
    for (const p of q.sel) {
      if (p.x < g.x0 || p.x > g.x1) continue;
      const col = flips(p) ? P.magenta : P.cyan, X = g.X(p.x);
      ctx.strokeStyle = col; ctx.globalAlpha = words ? 0.3 : 0.45; ctx.lineWidth = K; ctx.beginPath(); ctx.moveTo(X, g.Y(p.c)); ctx.lineTo(X, rowY - rowH / 2); ctx.stroke(); ctx.globalAlpha = 1;
      g.dot(p.x, p.c, col, 4.6 * K, p === q.deep && !S.patch ? { glow: 12 * K } : null);
      if (S.patch && q.forced.includes(p)) g.dot(p.x, p.c, P.ink, 8, { ring: true, width: 1.3 });
    }
    if (!S.patch && Math.abs(u) < 1e-9) for (let n = 0; n < 12; n++) { const [a, b] = beta(n), x = a + b * PHI; if (x <= g.x1) g.dot(x, a + b * PSI, P.ok, 9, { ring: true, width: 1.8 }); }
    // the physical line below: the tiles between neighbouring selected points
    for (let i = 1; i < q.sel.length; i++) {
      const a = q.sel[i - 1].x, b = q.sel[i].x; if (b < g.x0 || a > g.x1) continue;
      const x0 = Math.max(g.X(a), g.pl) + 1.5, x1 = Math.min(g.X(b), g.pl + g.iw) - 1.5, d = b - a, kind = d < 1.3 ? '1' : d < 2 ? 'φ' : 'φ²', col = kind === '1' ? P.magenta : P.cyan;
      if (x1 <= x0) continue;
      ctx.globalAlpha = kind === 'φ²' ? 0.2 : 0.8; ctx.fillStyle = col; ctx.fillRect(x0, rowY - rowH / 2, x1 - x0, rowH);
      ctx.globalAlpha = 1; ctx.strokeStyle = col; ctx.lineWidth = 1; ctx.strokeRect(x0 + 0.5, rowY - rowH / 2 + 0.5, x1 - x0 - 1, rowH - 1);
      if (words && x1 - x0 > 24 && a >= g.x0 && b <= g.x1) text(ctx, kind, (x0 + x1) / 2, rowY + 0.5, kind === 'φ²' ? P.ink : P.stage, { size: 10, align: 'center', halo: false, weight: 600 });
    }
    if (!words) return;
    for (const v of [-1, 0, 1]) text(ctx, String(v).replace('-', '−'), g.pl - 6, g.Y(v), P.dim, { align: 'right', size: 10, halo: false });
    if (ticks) for (let v = -8; v <= 8; v += 2) if (Math.abs(v) < q.half - 0.3) text(ctx, String(v).replace('-', '−'), g.X(v), rowY + (tight ? 14 : 17), P.dim, { align: 'center', size: 10, halo: false });
    const patchLab = L(`固定的一小片 |x| ≤ ${PATCH}`, `the fixed patch |x| ≤ ${PATCH}`);
    if (tight) {
      /* a short chart: the row just above the window's top edge carries the window's name and then the deepest point (or
         the patch); both axis names share the row under the window's lower edge, one at each end */
      const yA = Math.max(g.pt + 6, g.Y(hi) - 9), yB = Math.min(g.pt + g.ih - 6, Math.max(g.Y(lo) + 9, g.pt + g.ih - 8));
      text(ctx, 'W + u', g.pl + 4, yA, P.amber, { size: 11.5 });
      ctx.font = `11.5px ${face()}`; const after = g.pl + 4 + ctx.measureText('W + u').width + 10;
      text(ctx, L('↑ 共轭 a + bψ', '↑ the conjugate a + bψ'), g.pl + 4, yB, P.dim, { size: 10.5, face: 'body' });
      text(ctx, L('a + bφ 本身 →', 'a + bφ itself →'), g.pl + g.iw - 4, yB, P.dim, { align: 'right', size: 10.5, face: 'body' });
      if (S.patch) text(ctx, patchLab, after, yA, P.ink, { size: 11, face: 'body' });
      else if (q.deep) {
        const deepLab = L(`最深的点 · 离边 ${fix(margin(q.deep.c, u), 2)}`, `deepest point · ${fix(margin(q.deep.c, u), 2)} from the edge`);
        ctx.font = `11px ${TRV.fonts.body}`; const dw = ctx.measureText(deepLab).width;
        text(ctx, deepLab, clamp(g.X(q.deep.x) - dw / 2, after, g.pl + g.iw - dw), yA, P.cyan, { size: 11, face: 'body' });
      }
      return;
    }
    text(ctx, 'W + u', g.pl + 8, g.Y(hi) - 10, P.amber, { size: 11.5 });
    text(ctx, L('a + bφ 本身 →', 'a + bφ itself →'), g.pl + g.iw - 6, g.pt + g.ih - 9, P.dim, { align: 'right', size: 10.5, face: 'body' });
    text(ctx, L('↑ 共轭 a + bψ', '↑ the conjugate a + bψ'), g.X(0) + 6, g.pt + 8, P.dim, { size: 10.5, face: 'body' });
    if (S.patch) text(ctx, patchLab, g.X(0), g.pt + g.ih - 10, P.ink, { align: 'center', size: 11, face: 'body' });
    else if (q.deep) {
      // centred over the deepest point, kept inside the stage by its own half-width (the English label is the longer one)
      const deepLab = L(`最深的点 · 离边 ${fix(margin(q.deep.c, u), 2)}`, `deepest point · ${fix(margin(q.deep.c, u), 2)} from the edge`);
      ctx.font = `11px ${TRV.fonts.body}`; const dh = ctx.measureText(deepLab).width / 2 + 4;
      const dLo = Math.max(g.pl + 70, dh), dHi = Math.min(g.pl + g.iw - 70, g.W - dh);
      text(ctx, deepLab, dLo <= dHi ? clamp(g.X(q.deep.x), dLo, dHi) : g.W / 2, g.Y(q.deep.c) - 15 * K - 8, P.cyan, { align: 'center', size: 11, face: 'body' });
    }
  }

  /* ---------- cassini: the powers of φ in the same lattice ---------- */
  const FIB = [0n, 1n]; for (let i = 2; i <= KN + 3; i++) FIB.push(FIB[i - 1] + FIB[i - 2]);
  const fibN = (i) => Number(FIB[i]);
  const cassini = (k) => FIB[k] * FIB[k + 2] - FIB[k + 1] * FIB[k + 1];
  const kOf = (t) => 1 + Math.round(clamp(t, 0, KMAX - 1));
  const slope = (k) => fibN(k) / fibN(k + 1) - 1 / PHI;                                    // the integer point (x, y) = (Fₖ₊₁, Fₖ): slope y/x → φ⁻¹
  const power = (k) => [fibN(k) + fibN(k + 1) * PHI, fibN(k) + fibN(k + 1) * PSI];        // φ^(k+1) = F_k + F_(k+1)·φ as the lattice point (itself, conjugate)
  const sub = (n) => String(n).replace(/\d/g, (d) => '₀₁₂₃₄₅₆₇₈₉'[d]), sup = (n) => String(n).replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
  function drawCassini(k) {
    const words = !TRV.thumbMode, rows = words ? 20 : 4, b = fitBand($('flat').clientHeight, box.top, box.bottom, MIN_H + rows);
    const g = kit.plot($('flat'), { x: [-2, 31], y: [-1.3, 1.3], pad: [words ? 30 : 8, 12, b.top, b.bottom + rows], minHeight: MIN_H }), ctx = g.ctx; view = g;
    if (words) g.axes({ xTicks: [0, 5, 10, 15, 20, 25, 30], yTicks: [[-1, '−1'], [0, '0'], [1, '1']], frame: false });
    g.hline(0, P.ink, { alpha: 0.45 }); g.vline(0, P.faint, { alpha: 0.7 });
    for (const sg of [1, -1]) { const col = sg > 0 ? P.cyan : P.magenta, right = [], left = []; for (let i = 0; i <= 200; i++) { const x = 1 / 1.3 + (31 - 1 / 1.3) * Math.pow(i / 200, 2); right.push([x, sg / x]); } for (let i = 0; i <= 40; i++) { const x = -2 + (2 - 1 / 1.3) * i / 40; left.push([x, sg / x]); } g.line(right, col, { width: 1.1, alpha: 0.5 }); g.line(left, col, { width: 1.1, alpha: 0.5 }); }
    for (const p of NEAR) if (p.x >= g.x0 && p.x <= g.x1 && Math.abs(p.c) <= 1.3) g.dot(p.x, p.c, P.dim, 2.4, { alpha: 0.8 });
    for (let j = 1; j <= k; j++) { const [x, y] = power(j), col = cassini(j) > 0n ? P.cyan : P.magenta, now = j === k; g.rect(0, 0, x, y, col, { alpha: now ? 0.3 : 0.07, stroke: col, strokeAlpha: now ? 1 : 0.55, width: now ? 2 : 1 }); }
    g.dot(0, 0, P.ink, 3.2);
    /* a narrow cited figure: the current power's label also carries its x·x′ (the two would share a row beside a flat
       rectangle), the two hyperbolas are named by the legend alone, and the conjugate axis is named at the top right */
    const tight = words && narrowFigure();
    for (let j = 0; j <= k; j++) {
      const [x, y] = power(j), col = y > 0 ? P.cyan : P.magenta, now = j === k;
      g.dot(x, y, col, now ? 5.5 : 3.6, now ? { glow: 12 } : null);
      if (words && !(tight && now)) text(ctx, now ? `φ${sup(j + 1)} = ${FIB[j]} + ${FIB[j + 1]}φ` : `φ${sup(j + 1)}`, clamp(g.X(x), g.pl + 20, g.pl + g.iw - (now ? 62 : 14)), g.Y(y) + (y > 0 ? -13 : 14), now ? P.ink : col, { align: 'center', size: now ? 12 : 10.5 });
    }
    if (!words) return;
    if (tight) {
      const [x, y] = power(k), a = `φ${sup(k + 1)} = ${FIB[k]} + ${FIB[k + 1]}φ`, b = `  x·x′ = ${cassini(k) > 0n ? '+1' : '−1'}`;
      ctx.font = `12px ${face()}`; const wa = ctx.measureText(a).width; ctx.font = `600 12px ${face()}`; const wb = ctx.measureText(b).width;
      const x0 = clamp(g.X(x) - (wa + wb) / 2, g.pl + 4, g.pl + g.iw - wa - wb), yy = g.Y(y) + (y > 0 ? -13 : 14);
      text(ctx, a, x0, yy, P.ink, { size: 12 }); text(ctx, b, x0 + wa, yy, y > 0 ? P.cyan : P.magenta, { size: 12, weight: 600 });
      text(ctx, L('a + bφ 本身 →', 'a + bφ itself →'), g.pl + g.iw - 6, g.pt + g.ih - 8, P.dim, { align: 'right', size: 10.5, face: 'body' });
      text(ctx, L('↑ 共轭 a + bψ', '↑ the conjugate a + bψ'), g.pl + g.iw - 6, g.pt + 8, P.dim, { align: 'right', size: 10.5, face: 'body' });
      return;
    }
    const [x, y] = power(k), tall = Math.abs(g.Y(y) - g.Y(0)) > 26;
    text(ctx, `x·x′ = ${cassini(k) > 0n ? '+1' : '−1'}`, g.X(x / 2), tall ? g.Y(y / 2) : g.Y(y) + (y > 0 ? -12 : 13), tall ? P.ink : (y > 0 ? P.cyan : P.magenta), { align: 'center', size: 12, weight: 600 });
    text(ctx, L('a + bφ 本身 →', 'a + bφ itself →'), g.pl + g.iw - 6, g.pt + g.ih - 8, P.dim, { align: 'right', size: 10.5, face: 'body' });
    text(ctx, L('↑ 共轭 a + bψ', '↑ the conjugate a + bψ'), g.X(0) + 6, g.pt + 8, P.dim, { size: 10.5, face: 'body' });
    text(ctx, 'x·x′ = +1', g.X(1.3), g.Y(0.95), P.cyan, { size: 10.5, alpha: 0.9 }); text(ctx, 'x·x′ = −1', g.X(1.3), g.Y(-0.95), P.magenta, { size: 10.5, alpha: 0.9 });
  }

  /* ---------- returns: the golden rotation through an observation window ---------- */
  const orbitX = (n) => { const x = n * PHI; return x - Math.floor(x); };
  const obs = (n) => Math.cos(TAU * orbitX(n));
  const win = () => [S.wc - S.ww / 2, S.wc + S.ww / 2];
  function returnsState(t) {
    const N = 1 + Math.round(clamp(t, 0, NMAX - 1)), [u1, u2] = win(), hits = [];
    for (let n = 1; n <= N; n++) { const e = obs(n); if (e > u1 && e < u2) hits.push(n); }
    const waits = []; for (let i = 1; i < hits.length; i++) waits.push(hits[i] - hits[i - 1]);
    // the longest completed gap between two consecutive visits in these N steps (null before the second visit): a description
    // of this finite sample only; it is not the theorem's M + 1 and bounds neither later gaps nor the share at this N
    const longest = waits.length ? Math.max(...waits) : null, open = N - (hits.length ? hits[hits.length - 1] : 0);
    const measure = (Math.acos(clamp(u1, -1, 1)) - Math.acos(clamp(u2, -1, 1))) / Math.PI;
    return { N, u1, u2, hits, waits, longest, open, share: hits.length / N, ratio: longest ? 1 / longest : null, measure, kinds: [...new Set(waits)].sort((a, b) => a - b) };
  }
  function drawReturns(q) {
    const cv = $('flat'), W = cv.clientWidth, H = cv.clientHeight, words = !TRV.thumbMode;
    // a narrow stage leaves the chart beside the circle too small to carry its axis name inside: that name gets a line of
    // its own above the chart (8 more pixels on top), so it no longer sits on the dots, the top tick or the window's label
    const narrow = words && W < 520, b = fitBand(H, box.top, box.bottom, 6 + MIN_H + 22 + (narrow ? 8 : 0));
    let top = b.top + 6 + (narrow ? 8 : 0), bottom = b.bottom + 22; const spare = H - top - bottom - 2.3 * W * 0.2;
    if (spare > 0) { top += spare / 2; bottom += spare / 2; }
    const R = (H - top - bottom) / 2.3, cx = 14 + R * 1.1, nView = Math.max(55, q.N);
    const g = kit.plot(cv, { x: [0, nView + 1], y: [-1.15, 1.15], pad: [cx + R * 1.1 + 34, 16, top, bottom], minHeight: MIN_H }), ctx = g.ctx, cy = g.Y(0); view = g;
    const y1 = g.Y(clamp(q.u1, -1.15, 1.15)), y2 = g.Y(clamp(q.u2, -1.15, 1.15));
    ctx.fillStyle = P.amber; ctx.globalAlpha = 0.11; ctx.fillRect(cx - R - 8, y2, g.pl + g.iw - (cx - R - 8), y1 - y2); ctx.globalAlpha = 1;
    ctx.strokeStyle = P.amber; ctx.lineWidth = 1.3; for (const y of [y1, y2]) { ctx.beginPath(); ctx.moveTo(cx - R - 8, Math.round(y) + 0.5); ctx.lineTo(g.pl + g.iw, Math.round(y) + 0.5); ctx.stroke(); }
    g.axes({ yTicks: [-1, 0, 1], xTicks: [1, 21, 55, 89, 144, 233].filter((v) => v <= nView), xLabel: 'n', yLabel: words && !narrow ? 'e(n) = cos 2πnφ' : '' });
    const pts = []; for (let n = 1; n <= q.N; n++) pts.push([n, obs(n)]);
    g.line(pts, P.dim, { width: 1, alpha: 0.28 });
    const isHit = new Set(q.hits);
    for (const [n, e] of pts) g.dot(n, e, isHit.has(n) ? P.cyan : P.dim, isHit.has(n) ? 3 : 1.7);
    for (const n of q.hits) { ctx.fillStyle = P.cyan; ctx.fillRect(Math.round(g.X(n)) - 0.5, g.pt + g.ih - 7, 1.5, 7); }
    // the circle: the height of the point is the observed value
    ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke();
    const at = (n) => { const a = TAU * orbitX(n); return [cx + R * Math.sin(a), cy - R * Math.cos(a)]; };
    for (let n = 1; n < q.N; n++) { const [x, y] = at(n); ctx.fillStyle = isHit.has(n) ? P.cyan : P.dim; ctx.globalAlpha = isHit.has(n) ? 1 : 0.7; ctx.beginPath(); ctx.arc(x, y, isHit.has(n) ? 2.8 : 1.8, 0, TAU); ctx.fill(); }
    ctx.globalAlpha = 1;
    const [px, py] = at(q.N);
    ctx.strokeStyle = P.amber; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();
    ctx.setLineDash([3, 4]); ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(g.X(q.N), py); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
    ctx.fillStyle = P.amber; ctx.shadowColor = P.amber; ctx.shadowBlur = 10; ctx.beginPath(); ctx.arc(px, py, 5, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
    g.dot(q.N, obs(q.N), P.amber, 4.5, { glow: 8 });
    if (!words) return;
    const winLab = `(${fix(q.u1, 2)}, ${fix(q.u2, 2)})`;
    let winY = y2 - 9;
    if (narrow) {
      // the axis name on its own line above the chart; the window's label stays above the band's upper edge inside the
      // chart, or, when that edge is too close to the top, on the axis name's line at the right end (if both fit there),
      // or else just under that edge
      const nameY = g.pt - 9, nameLab = 'e(n) = cos 2πnφ';
      text(ctx, nameLab, g.pl, nameY, P.dim, { size: 10.5, face: 'body', halo: false });
      if (y2 - 16 < g.pt) {
        ctx.font = `10.5px ${TRV.fonts.body}`; const nameW = ctx.measureText(nameLab).width;
        ctx.font = `11px ${TRV.fonts.data}`; const winW = ctx.measureText(winLab).width;
        winY = g.pl + nameW + 10 <= g.pl + g.iw - 4 - winW ? nameY : y2 + 10;
      }
    }
    text(ctx, winLab, g.pl + g.iw - 4, winY, P.amber, { align: 'right', size: 11 });
    if (q.waits.length) {
      const i = q.waits.indexOf(Math.max(...q.waits)), a = q.hits[i], b = q.hits[i + 1], y = g.pt + g.ih - 15;
      ctx.strokeStyle = P.magenta; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(g.X(a), y + 4); ctx.lineTo(g.X(a), y); ctx.lineTo(g.X(b), y); ctx.lineTo(g.X(b), y + 4); ctx.stroke();
      text(ctx, L(`目前最长的间隔 ${b - a} 步`, `longest gap so far: ${b - a} steps`), clamp((g.X(a) + g.X(b)) / 2, g.pl + 56, g.pl + g.iw - 56), y - 10, P.magenta, { align: 'center', size: 11, face: 'body' });
    }
  }


  /* ---------- gaps: the first N points of a rotation on the circle ---------- */
  const frac = (x) => x - Math.floor(x);
  /** The arcs cut by {ia}, 0 ≤ i < N (repeated points once): sorted points, the arc after each, and the kinds of
      length (within 1e-9) with their counts; η⁺ the least positive point and η⁻ one minus the greatest. */
  function gapsAt(a, N) {
    const pts = []; for (let i = 0; i < N; i++) pts.push({ i, x: frac(i * a) });
    pts.sort((p, q) => p.x - q.x);
    const P0 = pts.filter((p, k) => k === 0 || p.x - pts[k - 1].x > 1e-12), arcs = P0.map((p, k) => (k + 1 < P0.length ? P0[k + 1].x - p.x : P0[0].x + 1 - p.x));
    const kinds = []; for (const g of [...arcs].sort((x, y) => x - y)) { const last = kinds[kinds.length - 1]; if (last && g - last.len < 1e-9) last.n++; else kinds.push({ len: g, n: 1 }); }
    const pos = P0.filter((p) => p.x > 0), etaP = pos.length ? pos[0].x : null, etaM = pos.length ? 1 - pos[pos.length - 1].x : null;
    const kindOf = (g) => kinds.findIndex((k) => Math.abs(g - k.len) < 1e-9);
    return { N, a, pts: P0, arcs, kinds, kindOf, etaP, etaM, min: kinds[0].len, max: kinds[kinds.length - 1].len, ratio: kinds[kinds.length - 1].len / kinds[0].len, nmin: N * kinds[0].len };
  }
  const nOf = (t) => GMIN + Math.round(clamp(t, 0, GMAX - GMIN));
  const gapsState = (t) => Object.assign(gapsAt(ROT[S.rot], nOf(t)), { rot: S.rot });
  /** Colours of the kinds: with two kinds cyan (short) and magenta (long); with three, violet in the middle. */
  const kindColor = (q, k) => (k === 0 ? P.cyan : k === q.kinds.length - 1 ? P.magenta : P.violet);
  function drawGaps(q) {
    const cv = $('flat'), W = cv.clientWidth, H = cv.clientHeight, words = !TRV.thumbMode, ctx = kit.plot(cv, { x: [0, 1], y: [0, 1] }).ctx;   // fitted and cleared
    const top = box.top + 4, bottom = box.bottom + 8, R = Math.max(40, Math.min((H - top - bottom) / 2 - 14, W / 2 - 40)), cx = W / 2, cy = top + (H - top - bottom) / 2;
    const ang = (x) => -Math.PI / 2 + TAU * x, at = (x, r) => [cx + r * Math.cos(ang(x)), cy + r * Math.sin(ang(x))];
    ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1; ctx.globalAlpha = 0.5; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.stroke(); ctx.globalAlpha = 1;
    const lw = TRV.thumbMode ? 9 : Math.max(5, Math.min(9, R / 22));
    q.pts.forEach((p, k) => { const g = q.arcs[k], col = kindColor(q, q.kindOf(g)); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.arc(cx, cy, R, ang(p.x), ang(p.x + g)); ctx.stroke(); });
    ctx.strokeStyle = P.stage; ctx.lineWidth = 1.2; for (const p of q.pts) { const a = at(p.x, R - lw / 2 - 1), b = at(p.x, R + lw / 2 + 1); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); }
    const r0 = R - lw / 2 - 7; ctx.fillStyle = P.ink;
    for (const p of q.pts) { if (p.i === q.N - 1) continue; const [x, y] = at(p.x, r0); ctx.globalAlpha = 0.75; ctx.beginPath(); ctx.arc(x, y, q.N > 150 ? 1.2 : 2, 0, TAU); ctx.fill(); }
    ctx.globalAlpha = 1;
    const last = q.pts.find((p) => p.i === q.N - 1), [lx, ly] = at(last.x, r0);
    ctx.fillStyle = P.amber; ctx.shadowColor = P.amber; ctx.shadowBlur = 10; ctx.beginPath(); ctx.arc(lx, ly, 4.5, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
    // an arc too short to see: ring it and say how long it is
    const ki = q.arcs.indexOf(Math.min(...q.arcs)), short = q.pts[ki], tiny = TAU * q.min * R < 3;
    if (tiny) { const [sx, sy] = at(short.x + q.min / 2, R); ctx.strokeStyle = P.cyan; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(sx, sy, 11, 0, TAU); ctx.stroke(); }
    if (!words) return;
    /* the ringed arc's label and the newest point's label sit inside the circle; when they would meet (the newest point
       is the one that cut the tiny arc, as with π − 3 at N = 114), or the point's label would run into the key in the
       middle, both go outside the ring, one on each side of it */
    const shortLab = L(`最短的弧 ${sci(q.min)}`, `shortest arc ${sci(q.min)}`), pointLab = L(`第 ${q.N - 1} 个点`, `point ${q.N - 1}`);
    let [tx, ty] = at(last.x, r0 - 24), sxy = tiny ? at(short.x + q.min / 2, R * 0.6) : null;
    const wOf = (str, size) => { ctx.font = `${size}px ${TRV.fonts.body}`; return ctx.measureText(str).width; };
    const keyHalf = 9 * q.kinds.length + 2, keyW = 120;
    const meet = (sxy && Math.abs(sxy[1] - ty) < 16 && Math.abs(clamp(sxy[0], 90, W - 90) - tx) < (wOf(shortLab, 12) + wOf(pointLab, 11.5)) / 2 + 6)
      || (Math.abs(ty - cy) < keyHalf + 8 && Math.abs(tx - cx) < keyW / 2 + wOf(pointLab, 11.5) / 2);
    if (tiny && meet) {
      const [rx, ry] = at(short.x + q.min / 2, R), ux = (rx - cx) / R, uy = (ry - cy) / R, bx = rx + ux * 16, by = ry + uy * 16;
      text(ctx, shortLab, bx + 14, by, P.cyan, { size: 12, face: 'body' });
      text(ctx, pointLab, bx - 14, by, P.amber, { align: 'right', size: 11.5, face: 'body' });
    } else {
      if (sxy) text(ctx, shortLab, clamp(sxy[0], 90, W - 90), sxy[1], P.cyan, { align: 'center', size: 12, face: 'body' });
      text(ctx, pointLab, tx, ty, P.amber, { align: 'center', size: 11.5, face: 'body' });
    }
    text(ctx, `0`, cx, cy - R - lw - 8, P.dim, { align: 'center', size: 10.5 });
    // the kinds, as a key in the middle of the circle: length (count)
    const lines = q.kinds.map((k, j) => [`${fmtLen(k.len)} × ${k.n}`, kindColor(q, j)]);
    // a small circle (a narrow frame): the key's lines step down to 10px so that they stay inside the ring
    ctx.font = `12.5px ${face()}`; const keyMax = Math.max(...lines.map(([str]) => ctx.measureText(str).width)), keySize = clamp(12.5 * 2 * (r0 - 8) / keyMax, 10, 12.5);
    lines.forEach(([str, col], j) => text(ctx, str, cx, cy + (j - (lines.length - 1) / 2) * (keySize + 5.5), col, { align: 'center', size: keySize }));
  }
  /** 3.0 × 10⁻⁵ */
  const sci = (x) => { const [m, e] = x.toExponential(1).split('e'); return `${m} × 10${[...e].map((c) => ({ '-': '⁻', '+': '' }[c] ?? '⁰¹²³⁴⁵⁶⁷⁸⁹'[c])).join('')}`; };
  const fmtLen = (x) => (x >= 1e-3 ? fix(x, 4) : sci(x));

  /* ---------- window3: the rhombic triacontahedron ---------- */
  const v3 = { add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], scale: (a, s) => [a[0] * s, a[1] * s, a[2] * s], dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]], unit: (a) => { const n = Math.hypot(a[0], a[1], a[2]); return [a[0] / n, a[1] / n, a[2] / n]; } };
  /** The zonohedron Σ tᵢ gᵢ, tᵢ ∈ [−½, ½], of the six fivefold axes gᵢ (unit vectors): the shadow of a six-dimensional
      cube whose edges project to the gᵢ. Faces come in pairs, one pair for each pair of axes. */
  const TRIA = (() => {
    const G = [[0, 1, PHI], [0, -1, PHI], [1, PHI, 0], [-1, PHI, 0], [PHI, 0, 1], [PHI, 0, -1]].map(v3.unit), faces = [];
    for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) {
      const n = v3.unit(v3.cross(G[i], G[j])); let c = [0, 0, 0];
      for (let k = 0; k < 6; k++) if (k !== i && k !== j) c = v3.add(c, v3.scale(G[k], 0.5 * Math.sign(v3.dot(G[k], n))));
      for (const s of [1, -1]) { const cc = v3.scale(c, s), a = v3.scale(G[i], 0.5), b = v3.scale(G[j], 0.5); faces.push({ n: v3.scale(n, s), c: cc, v: [v3.sub(v3.sub(cc, a), b), v3.sub(v3.add(cc, a), b), v3.add(v3.add(cc, a), b), v3.add(v3.sub(cc, a), b)] }); }
    }
    const key = (p) => p.map((x) => Math.round(x * 1e6)).join(','), ids = new Map(), verts = [], edges = new Map();
    for (const f of faces) {
      f.i = f.v.map((p) => { const k = key(p); if (!ids.has(k)) { ids.set(k, verts.length); verts.push({ p, deg: 0 }); } return ids.get(k); });
      f.i.forEach((a, m) => { const b = f.i[(m + 1) % 4], e = a < b ? `${a}-${b}` : `${b}-${a}`; if (!edges.has(e)) edges.set(e, { a, b, faces: [] }); edges.get(e).faces.push(f); });
    }
    for (const e of edges.values()) { verts[e.a].deg++; verts[e.b].deg++; }
    const rin = v3.dot(faces[0].c, faces[0].n), rout = Math.max(...verts.map((v) => Math.hypot(...v.p)));
    const dir = v3.unit(v3.add(faces[0].c, v3.add(v3.scale(G[0], 0.22), v3.scale(G[1], 0.1))));
    const exit = Math.min(...faces.map((f) => v3.dot(f.n, dir)).filter((d) => d > 1e-9).map((d) => rin / d));
    return { G, faces, verts, edges: [...edges.values()], rin, rout, dir, exit };
  })();
  /** The signed distance of p to the boundary (negative outside) and the face that realises it. */
  function depth(p) { let d = Infinity, f = null; for (const g of TRIA.faces) { const e = TRIA.rin - v3.dot(g.n, p); if (e < d) { d = e; f = g; } } return { d, f }; }
  function windowState(t) {
    const s = clamp(t, 0, SMAX), p = v3.scale(TRIA.dir, s * TRIA.exit), { d, f } = depth(p);
    const out = { s, p, d, face: f, inside: d > 0, share: d > 0 ? Math.pow(1 - d / TRIA.rin, 3) : 1 };
    if (s < EDGE_S - 0.1) { const pe = v3.scale(TRIA.dir, EDGE_S * TRIA.exit); out.edgePt = { s: EDGE_S, p: pe, d: depth(pe).d }; }
    return out;
  }
  /* The solid is lit and opaque, so the card's camera looks into it through a cut: the faces whose outward normal leans
     towards OPEN_DIR (the direction the card looks from, fixed in the world) are left open and only their edges drawn;
     the rest is a bowl that turns with the solid when the camera turns, so its faces catch the light differently. */
  const WIN_CAM = { yaw: -0.55, pitch: 0.32, zoom: 1 };
  const OPEN_DIR = v3.unit([Math.sin(0.55) * Math.cos(0.32), -Math.cos(0.55) * Math.cos(0.32), Math.sin(0.32)]);
  const isOpen = (f) => v3.dot(f.n, OPEN_DIR) > 0.18;
  /** The vertex indices of a face in order around its outward normal. */
  const outward = (f) => (v3.dot(v3.cross(v3.sub(f.v[1], f.v[0]), v3.sub(f.v[2], f.v[0])), f.n) > 0 ? f.i : f.i.slice().reverse());
  /** The vertex at the bottom of the bowl, farthest from the cut. */
  const BACK_V = TRIA.verts.reduce((m, v, j) => (v3.dot(v.p, OPEN_DIR) < v3.dot(TRIA.verts[m].p, OPEN_DIR) ? j : m), 0);
  /** n points on the circle of radius r about c in the plane normal to the unit vector u. */
  function circlePts(c, u, r, n) {
    const a = v3.unit(v3.cross(u, Math.abs(u[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])), b = v3.cross(u, a), out = [];
    n = n || 72;
    for (let i = 0; i < n; i++) { const t = TAU * i / n; out.push(v3.add(c, v3.add(v3.scale(a, r * Math.cos(t)), v3.scale(b, r * Math.sin(t))))); }
    return out;
  }
  function drawWindow3(q) {
    SOLID.radius = 0.34; SOLID.cy = 0.52;
    if (!TRV.thumbMode) {
      // the solid's outline (the unit sphere through its vertices, the labels above the point inside it) fitted to the band
      const W = $('cv').clientWidth, H = $('cv').clientHeight, m = Math.min(W, H) || 1, band = H - box.top - box.bottom, R0 = 0.34 * m;
      if (W < 520 && (0.52 * H - R0 < box.top || 0.52 * H + R0 > H - box.bottom)) {
        const R = Math.max(24, Math.min(R0, band / 2 - 2, W / 2 - 12));
        SOLID.radius = R / m; SOLID.cy = (box.top + band / 2) / H;
      }
    }
    st.begin();
    const D = st.facing(), k = 1 / TRIA.rout, sc = (p) => v3.scale(p, k), words = !TRV.thumbMode;
    const V = TRIA.verts.map((v) => sc(v.p)), nV = V.length;
    // the bowl: each face twice, the inner wall wound towards the centre and the outer wall a hair outside it
    const faces = [], colors = [];
    for (const f of TRIA.faces) {
      if (isOpen(f)) continue;
      const ring = outward(f), col = f === q.face ? P.magenta : P.dim;
      faces.push(ring.slice().reverse(), ring.map((j) => j + nV)); colors.push(col, col);
    }
    st.poly('bowl', { vertices: V.concat(V.map((p) => v3.scale(p, 1.003))), faces }, { colors, edges: P.ink, id: 'bowl' });
    if (isOpen(q.face)) st.fan(q.face.i.map((j) => V[j]), { fill: P.magenta, alpha: 0.28, color: P.magenta, width: 2 });
    // the whole frame: 60 edges, 12 fivefold vertices (cyan) and 20 threefold ones
    for (const e of TRIA.edges) st.line([V[e.a], V[e.b]], { color: P.cyan, width: 1.15, alpha: 0.65 });
    TRIA.verts.forEach((v, j) => st.bead(V[j], v.deg === 5 ? { color: P.cyan, r: 3.6, key: `v${j}` } : { color: P.ink, r: 2.2, glow: 0.3, key: `v${j}` }));
    st.bead(v3.scale(V[BACK_V], 1.02), { color: P.dim, r: 2.5, key: 'backV' });     // just outside the bottom of the bowl
    st.line([[0, 0, 0], sc(v3.scale(TRIA.dir, TRIA.exit))], { color: P.ink, width: 1.2, dash: [3, 3], alpha: 0.6 });
    if (q.inside && q.d > 1e-3) {      // the largest ball about the point inside the window
      st.glass('margin', sc(q.p), q.d * k, { color: P.amber, alpha: 0.18, rim: 0.7 });
      st.line(circlePts(sc(q.p), D, q.d * k), { color: P.amber, width: 1.6, dash: [4, 3], alpha: 0.9, close: true });
    }
    if (q.inside) {
      const foot = v3.add(q.p, v3.scale(q.face.n, q.d));
      st.line([sc(q.p), sc(foot)], { color: P.magenta, width: 2.2 });
      st.bead(sc(foot), { color: P.magenta, r: 4, key: 'foot' });
    }
    st.bead(sc(q.p), { color: q.inside ? P.amber : P.magenta, r: 6.5, glow: 1, key: 'p' });
    // a solid fitted small into a short band: the two labels stand beside it, the amber one on the left, the magenta on
    // the right, level with their points, instead of over the solid
    const ctr = st.p([0, 0, 0]), Rpx = SOLID.radius * Math.min($('cv').clientWidth, $('cv').clientHeight), small = !TRV.thumbMode && Rpx < 45;
    if (words) st.tag('p', sc(q.p), q.inside ? `d∂ = ${fix(q.d, 3)}` : L('已在窗口之外', 'outside the window'), q.inside ? 'hot raw' : 'mg raw', small ? { dx: ctr[0] - Rpx - 40 - st.p(sc(q.p))[0] } : { dy: -16 });
    if (q.edgePt) {     // for comparison: a point on the same ray near the boundary, with its small ball and its way to the face
      const e = q.edgePt, ne = depth(e.p), ef = v3.add(e.p, v3.scale(ne.f.n, ne.d));
      st.line(circlePts(sc(e.p), D, e.d * k, 40), { color: P.magenta, width: 1.4, alpha: 0.95, close: true });
      st.line([sc(e.p), sc(ef)], { color: P.magenta, width: 1.6 });
      st.bead(sc(e.p), { color: P.magenta, r: 5.5, glow: 0.8, key: 'edgePt' });
      // on a narrow stage the two points' labels would meet above them: this one goes under its point
      const pa = st.p(sc(q.p)), pe = st.p(sc(e.p)), meet = $('cv').clientWidth < 520 && Math.abs(pa[0] - pe[0]) < 80 && Math.abs((pa[1] - 16) - (pe[1] - 30)) < 18;
      if (words) st.tag('edge', sc(e.p), `d∂ ≈ ${fix(e.d, 2)}`, 'mg raw', small ? { dx: ctr[0] + Rpx + 36 - pe[0] } : { dy: meet ? 16 : -30 });
    }
    st.end();
  }

  /* ---------- the stage ---------- */
  const box = { top: 70, bottom: 44 };
  let view = null;
  // the triacontahedron is a lit solid (kit.solid on #cv); the other four scenes are flat plots on #flat, laid over it
  /* SOLID: the solid's placement (kit.solid reads it every frame). The default circle (radius 0.34, centre at 0.52 of the
     height) holds wide frames and the stills; on a narrow stage where it would run under the title block or the legend,
     drawWindow3 fits it to the band between them. */
  const SOLID = { radius: 0.34, cy: 0.52 };
  const st = kit.solid($('stage'), Object.assign(SOLID, { canvas: $('cv'), yaw: WIN_CAM.yaw, pitch: WIN_CAM.pitch, zoom: WIN_CAM.zoom, wheel: false, onChange: () => paint(),
    onPick: (ev) => { if (S.scene === 'window3') return false; if (S.scene !== 'cassini') { leave(); drag(ev); } return true; }, onDrag: (ev) => { if (S.scene !== 'cassini') drag(ev); } }));
  function drag(ev) {
    if (!view) return;
    const y = view.invY(ev.clientY - $('flat').getBoundingClientRect().top);
    if (S.scene === 'cut') { clock.pause(); clock.set(tOf(clamp(y - MID, -0.5, 0.5))); } else { S.wc = clamp(Math.round(y * 20) / 20, -0.9, 0.9); fWC.set(S.wc); paint(); }
  }
  const cassiniState = (t) => { const k = kOf(t), [x, y] = power(k); return { k, x, y, value: Number(cassini(k)) }; };
  const state = () => (S.scene === 'cut' ? cutState(clock.t) : S.scene === 'cassini' ? cassiniState(clock.t) : S.scene === 'returns' ? returnsState(clock.t) : S.scene === 'gaps' ? gapsState(clock.t) : windowState(clock.t));
  function drawStage(q) {
    const sr = $('stage').getBoundingClientRect(), below = (el) => el.getBoundingClientRect().bottom - sr.top;
    const tight = narrowFigure();     // the legend sits 12px above the stage's bottom edge: keep 4px (wide: 8px) clear of it
    box.top = TRV.thumbMode ? 26 : Math.max(46, below($('hudBig').parentElement), below($('sceneChips'))) + (tight ? 6 : 10); box.bottom = TRV.thumbMode ? 26 : Math.max(18, $('legend').offsetHeight + (tight ? 16 : 20));
    $('flat').hidden = S.scene === 'window3';
    if (S.scene === 'window3') return drawWindow3(q);
    st.begin(); st.end();
    if (S.scene === 'cut') drawCut(q); else if (S.scene === 'cassini') drawCassini(q.k); else if (S.scene === 'gaps') drawGaps(q); else drawReturns(q);
  }

  /* ---------- strips ---------- */
  function drawPlots(q) {
    if (TRV.still || TRV.figure) return;
    const A = $('plotA'), B = $('plotB'), title = (a, am, b, bm) => { $('pATitle').textContent = a; $('pAMeta').textContent = am; $('pBTitle').textContent = b; $('pBMeta').textContent = bm; };
    if (S.scene === 'cut') {
      // for each lattice point near the window: the shifts u at which it is selected (a bar of length 1 in u)
      const g = kit.plot(A, { x: [-0.5, 0.5], y: [-q.half, q.half], pad: [30, 10, 8, 20] });
      g.axes({ xTicks: [-0.5, 0, 0.5], yTicks: [-8, -4, 0, 4, 8].filter((v) => Math.abs(v) <= q.half), xLabel: 'u', yLabel: 'x' });
      if (S.patch) g.rect(S.patch.lo, -q.half, S.patch.hi, q.half, P.ink, { alpha: 0.14 });
      for (const p of NEAR) { if (Math.abs(p.x) > q.half) continue; const a = Math.max(-0.5, p.c - HI), b = Math.min(0.5, p.c - LO); if (b > a) g.line([[a, p.x], [b, p.x]], b - a > 0.999 ? P.cyan : P.magenta, { width: 2, alpha: b - a > 0.999 ? 1 : 0.85 }); }
      g.vline(q.u, P.amber);
      // the Zeckendorf codes of n = 0 … 54, one column each, the rows weighted 1, 2, 3, 5, …, 34 from the bottom
      const h = kit.plot(B, { x: [-0.7, ZN + 0.7], y: [-0.6, ZROWS - 0.4], pad: [30, 10, 8, 20] }), bad = new Set(ZSTRIP.adjacent.map(([n, i]) => `${n},${i}`));
      h.axes({ xTicks: [0, 10, 20, 30, 40, ZN], yTicks: [[0, '1'], [3, '5'], [7, '34']], xLabel: 'n' });
      ZSTRIP.codes.forEach((d, n) => d.forEach((x, i) => { if (x) { const hit = bad.has(`${n},${i}`) || bad.has(`${n},${i + 1}`); h.rect(n - 0.36, i - 0.36, n + 0.36, i + 0.36, hit ? P.magenta : P.cyan, { alpha: 0.9 }); } }));
      title(L('每个点在哪些平移下被选中', 'The shifts at which each point is selected'), L('整条青色：怎么挪都在', 'full cyan bars never leave'),
        L('齐肯多夫码里有相邻的 1 吗', 'Adjacent ones in Zeckendorf codes?'),
        L(`n ≤ ${ZN} · 相邻的 1：${ZSTRIP.adjacent.length} 处 · 求和不等于 n：${ZSTRIP.wrong.length} 个`, `n ≤ ${ZN} · adjacent 1s: ${ZSTRIP.adjacent.length} · sums ≠ n: ${ZSTRIP.wrong.length}`));
    } else if (S.scene === 'cassini') {
      const g = kit.plot(A, { x: [0.4, KN + 0.6], y: [1e-6, 1], pad: [38, 10, 8, 20], logY: true });
      g.axes({ xTicks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], yTicks: [[1, '1'], [1e-2, '10⁻²'], [1e-4, '10⁻⁴']], xLabel: 'k' });
      for (let k = 1; k <= KN; k++) { const e = slope(k); g.line([[k, 1e-6], [k, Math.abs(e)]], e > 0 ? P.cyan : P.magenta, { width: k === q.k ? 5 : 3, alpha: k === q.k ? 1 : 0.7 }); }
      g.legend([[P.cyan, L('大于 φ⁻¹', 'above φ⁻¹')], [P.magenta, L('小于 φ⁻¹', 'below φ⁻¹')]], { right: true });
      const h = kit.plot(B, { x: [0.4, KN + 0.6], y: [-1.5, 1.5], pad: [38, 10, 8, 20] });
      h.axes({ xTicks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], yTicks: [[-1, '−1'], [0, '0'], [1, '+1']], xLabel: 'k' }); h.hline(0, P.faint);
      for (let k = 1; k <= KN; k++) { const c = Number(cassini(k)), col = c > 0 ? P.cyan : P.magenta; h.line([[k, 0], [k, c]], col, { width: 2 }); h.dot(k, c, col, k === q.k ? 5.5 : 3.5, k === q.k ? { glow: 8 } : null); }
      title(L('斐波那契斜率离它的极限还有多远', 'How far the Fibonacci slope is from its limit'), L('y/x = Fₖ/Fₖ₊₁ → φ⁻¹ · 对数坐标', 'y/x = Fₖ/Fₖ₊₁ → φ⁻¹ · log scale'), L('卡西尼式的值', 'The value of Cassini’s expression'), L('用大整数逐项算出', 'term by term with big integers'));
    } else if (S.scene === 'returns') {
      const n = Math.max(q.waits.length, 12), top = Math.max(8, ...q.waits) * 1.15, g = kit.plot(A, { x: [0, n + 1], y: [0, top], pad: [30, 10, 8, 20] });
      g.axes({ yTicks: [0, Math.round(top / 2.3), Math.round(top / 1.15)], xTicks: [1, Math.round(n / 2), n], xLabel: L('第几次回来', 'return number') });
      const big = Math.max(...q.waits, 0); q.waits.forEach((w, i) => g.line([[i + 1, 0], [i + 1, w]], w === big ? P.magenta : P.cyan, { width: Math.max(1.5, Math.min(5, 160 / n)) }));
      const h = kit.plot(B, { x: [0, Math.max(55, q.N)], y: [0, clamp(q.measure * 2.4, 0.1, 1)], pad: [34, 10, 8, 20] }), run = []; let c = 0, hi = 0;
      for (let m = 1; m <= q.N; m++) { if (q.hits[hi] === m) { c++; hi++; } run.push([m, Math.min(c / m, h.y1)]); }
      h.axes({ yTicks: [0, Number((h.y1 / 2).toFixed(2)), Number(h.y1.toFixed(2))], xTicks: [1, 21, 55, 89, 144, 233].filter((v) => v <= Math.max(55, q.N)), xLabel: 'N' });
      h.hline(q.measure, P.ink, { dash: [4, 3], alpha: 0.7 }); h.line(run, P.cyan);
      h.legend([[P.cyan, L('已进入的比例', 'share of steps inside')], [P.ink, L('窗口占圆周的份额', 'the window’s share of the circle'), 'dash']], { right: true });
      title(L('相邻两次回来之间的步数', 'Steps between consecutive returns'), q.kinds.length ? L(`出现过：${q.kinds.join('、')}`, `seen: ${q.kinds.join(', ')}`) : L('还没有完整的间隔', 'no completed gap yet'), L('落在窗口里的比例', 'Share of steps in the window'), L(`前 ${q.N} 步：${fix(q.share, 3)}`, `first ${q.N} steps: ${fix(q.share, 3)}`));
    } else if (S.scene === 'gaps') {
      const g = kit.plot(A, { x: [GMIN, GMAX], y: [0.5, 3.5], pad: [30, 10, 8, 20] }), fibs = new Set([2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377]);
      g.axes({ yTicks: [1, 2, 3], xTicks: [2, 100, 200, 300, 400], xLabel: 'N' });
      for (let n = GMIN; n <= q.N; n++) { const c = gapsAt(q.a, n).kinds.length; g.dot(n, c, c === 2 ? P.cyan : P.dim, c === 2 ? 3 : 1.4); }
      g.vline(q.N, P.amber, { alpha: 0.7 });
      const h = kit.plot(B, { x: [GMIN, GMAX], y: [0, 1.05], pad: [34, 10, 8, 20] }), pts = [];
      for (let n = GMIN; n <= q.N; n++) pts.push([n, Math.min(1.05, gapsAt(q.a, n).nmin)]);
      h.axes({ yTicks: [0, 0.447, 1], xTicks: [2, 100, 200, 300, 400], xLabel: 'N' }); h.hline(1 / R5, P.magenta, { dash: [4, 3] }); h.line(pts, P.cyan, { width: 1.4 }); h.vline(q.N, P.amber, { alpha: 0.7 });
      title(L('弧长有几种', 'How many kinds of arc'), L(`青点：两种（${[...fibs].filter((v) => v <= q.N).length} 个 N）`, `cyan: two kinds (${[...fibs].filter((v) => v <= q.N).length} values of N)`), L('N × 最短弧', 'N × the shortest arc'), L('虚线 1/√5', 'dashed: 1/√5'));
    } else {
      const g = kit.plot(A, { x: [0, SMAX], y: [-0.25, 1.05], pad: [34, 10, 8, 20] }), pts = [];
      for (let i = 0; i <= 120; i++) { const s = SMAX * i / 120; pts.push([s, depth(v3.scale(TRIA.dir, s * TRIA.exit)).d / TRIA.rin]); }
      g.axes({ yTicks: [0, 0.5, 1], xTicks: [0, 0.5, 1], xLabel: L('走了多远（1 = 边界）', 'how far along (1 = the boundary)') }); g.hline(0, P.magenta, { dash: [4, 3] }); g.line(pts, P.amber, { width: 2 }); g.vline(q.s, P.amber, { alpha: 0.7 });
      const h = kit.plot(B, { x: [0, 1], y: [0, 1.05], pad: [34, 10, 8, 20] }), cur = [];
      for (let i = 0; i <= 60; i++) cur.push([i / 60, Math.pow(1 - i / 60, 3)]);
      h.axes({ yTicks: [0, 0.5, 1], xTicks: [0, 0.5, 1], xLabel: 'd / r' }); h.line(cur, P.cyan, { width: 2 });
      if (q.inside) h.dot(q.d / TRIA.rin, Math.pow(1 - q.d / TRIA.rin, 3), P.amber, 5, { glow: 8 });
      title(L('到边界的距离 ÷ 内切球半径', 'Distance to the boundary ÷ the inradius'), L('虚线：边界', 'dashed: the boundary'), L('至少这么深的部分占窗口体积的', 'Share of the window’s volume at least this deep'), '(1 − d/r)³');
    }
  }

  /* ---------- words ---------- */
  const SC = {
    cut: { name: ['切投', 'CUT'], max: 1, rate: 0.085, step: 0.05, start: 0.5 },
    cassini: { name: ['卡西尼', 'CASSINI'], max: KMAX - 1, rate: 0.55, step: 1, start: 3 },
    returns: { name: ['回归', 'RETURNS'], max: NMAX - 1, rate: 13, step: 1, start: 88 },
    window3: { name: ['接受窗', 'WINDOW'], max: SMAX, rate: 0.1, step: 0.05, start: 0.15 },
    gaps: { name: ['缝', 'GAPS'], max: GMAX - GMIN, rate: 12, step: 1, start: 11 }
  };
  const legend = (q) => (S.scene === 'cut'
    ? (S.patch ? [['am', '窗口 W + u', 'the window W + u'], ['cy', '被这一小片定住的点（带圈）', 'points fixed by the patch (ringed)'], ['mg', '仍未定的点', 'points still undecided']]
      : [['am', '窗口 W + u', 'the window W + u'], ['cy', '窗口里的点，投到下面的直线上', 'points in the window, projected to the line below'], ['mg', '离边不到 0.08 的点', 'points less than 0.08 from an edge']].concat(Math.abs(q.u) < 1e-9 ? [['ok', '绿圈：自然数的黄金展开 β(n)', 'green rings: the golden expansions β(n)']] : []))
    : S.scene === 'cassini' ? [['cy', 'x·x′ = +1：点在横轴上方', 'x·x′ = +1: the point lies above the axis'], ['mg', 'x·x′ = −1：点在横轴下方', 'x·x′ = −1: the point lies below the axis'], ['dm', '其余格点，都在两条双曲线之外', 'the other lattice points, all outside the two hyperbolas']]
      : S.scene === 'returns' ? [['am', '观测窗与此刻的点', 'the window and the current point'], ['cy', '落在窗口里的步', 'steps inside the window'], ['mg', '目前最长的间隔（只是样本）', 'the longest gap so far (sample only)']]
        : S.scene === 'gaps' ? (q.kinds.length === 3 ? [['cy', '最短的一种弧', 'the shortest kind of arc'], ['vi', '中间的一种', 'the middle kind'], ['mg', '最长的一种 = 另两种之和', 'the longest kind = the sum of the other two'], ['am', '最新的点', 'the newest point']]
          : [['cy', '短的一种弧', 'the short kind of arc'], ['mg', '长的一种', 'the long kind'], ['am', '最新的点', 'the newest point']])
          : [['cy', '棱与 12 个五重顶点（圆点）', 'the edges, and the 12 fivefold vertices (dots)'], ['dm', '后半个壳；前半切开，露出里面', 'back shell; front cut away to show the inside'], ['am', '窗口里的点与半径 d∂ 的球', 'the point and the ball of radius d∂'], ['mg', q.edgePt ? '离它最近的面，与贴近这个面的点' : '离它最近的面', q.edgePt ? 'the face nearest to it, and a point close to that face' : 'the face nearest to it']]);
  /* A cited figure in a narrow column (a phone page): a long note under the figure leaves the stage little height, and the
     title block and the legend would leave the drawing none. There the line under the title keeps every number of the
     wide line in fewer words (the quantity already in the title is not repeated), the legend sits closer (style.css),
     and the drawing takes the band between them, measured each frame. */
  const narrowFigure = () => TRV.figure && !TRV.thumbMode && $('stage').clientWidth < 520;
  function drawText(q) {
    const tight = narrowFigure();
    const set = (i, lab, val) => { $(`roL${i}`).textContent = lab; $(`ro${i}`).innerHTML = val; };
    const keyRO = (lab, val, subText) => { $('roKeyL').textContent = lab; $('roKey').innerHTML = val; $('roKeySub').textContent = subText; };
    let big, hud, what, key, note;
    if (S.scene === 'cut') {
      const u = q.u, names = q.kinds.map((d) => (Math.abs(d - PHI) < 1e-6 ? 'φ' : Math.abs(d - PHI * PHI) < 1e-6 ? 'φ²' : Math.abs(d - 1) < 1e-6 ? '1' : fix(d, 3))).join(L('、', ', ')), only = q.kinds.every((d) => Math.abs(d - PHI) < 1e-6 || Math.abs(d - PHI * PHI) < 1e-6);
      big = L(`切投 · u = ${sgn(u, 2)}`, `Cut · u = ${sgn(u, 2)}`);
      hud = S.patch ? L(`u 只能取 (${sgn(S.patch.lo, 3)}, ${sgn(S.patch.hi, 3)})；另有 ${q.forced.length} 个点被定住，${q.free.length} 个未定`, `u is confined to (${sgn(S.patch.lo, 3)}, ${sgn(S.patch.hi, 3)}); ${q.forced.length} more points fixed, ${q.free.length} undecided`)
        : tight ? L(`选中 ${q.seen.length} 个点 · 相邻间隔 ${names} · ${q.edge} 个离边不到 0.08`, `${q.seen.length} points in view · gaps ${names} · ${q.edge} within 0.08 of an edge`)
          : L(`窗口平移 u · 视野里选中 ${q.seen.length} 个点 · 相邻间隔：${names} · ${q.edge} 个离边不到 0.08`, `the window is shifted by u · ${q.seen.length} points selected in view · gaps between neighbours: ${names} · ${q.edge} less than 0.08 from an edge`);
      keyRO(L('相邻两点的间隔', 'gaps between neighbouring points'), `<span class="c-cy">${names}</span>`, only ? L('只有两种', 'two kinds only') : L('闭窗口两端各有一个格点', 'a lattice point on each end of the closed window'));
      set(1, L('窗口 W + u', 'the window W + u'), `[${fix(LO + u, 3)}, ${fix(HI + u, 3)}]`);
      set(2, L('最小间隔', 'smallest gap'), `${fix(q.minGap, 3)} ${q.minGap >= 1 - 1e-9 ? '≥ 1 ✓' : '✗'}`);
      if (S.patch) { set(3, L('容许的平移', 'admissible shifts'), `(${sgn(S.patch.lo, 3)}, ${sgn(S.patch.hi, 3)})`); set(4, L('小片以外：定住 / 未定', 'beyond the patch: fixed / undecided'), `${q.forced.length} / ${q.free.length}`); }
      else { set(3, L('视野里选中的点', 'points selected in view'), String(q.seen.length)); set(4, L('最深的点离边', 'deepest point, distance from the edge'), q.deep ? `${fix(margin(q.deep.c, u), 3)} <small>x = ${fix(q.deep.x, 2)}</small>` : '—'); }
      note = S.patch ? L('带圈的点在容许范围内怎么挪窗口都留在里面：中间这一小片把它们定住了，再远也一样。', 'The ringed points stay inside however the window moves within the admissible range: the small patch in the middle fixes them, however far away they are.')
        : L('一个点离窗口的边有多远，它就经得起多大的平移；窗口长为 1，所以没有哪个点能超过 0.5。', 'A point withstands exactly as much shift as its distance from the edge of the window; the window has length 1, so no point can exceed 0.5.');
      what = `u = ${sgn(u, 2)}`; key = S.patch ? L(`定住 ${q.forced.length}`, `${q.forced.length} FIXED`) : names;
    } else if (S.scene === 'cassini') {
      const k = q.k, a = FIB[k], b = FIB[k + 1], c = FIB[k + 2], sv = q.value > 0 ? '+1' : '−1';
      big = L(`卡西尼 · k = ${k}`, `Cassini · k = ${k}`);
      hud = tight ? L(`φ${sup(k + 1)} = ${a} + ${b}φ 在 (${fix(q.x, 3)}, ${fix(q.y, 4)})：矩形面积 = F${sub(k)}·F${sub(k + 2)} − F${sub(k + 1)}² = ${a}·${c} − ${b}² = ${sv}`, `φ${sup(k + 1)} = ${a} + ${b}φ at (${fix(q.x, 3)}, ${fix(q.y, 4)}): rectangle area = F${sub(k)}·F${sub(k + 2)} − F${sub(k + 1)}² = ${a}·${c} − ${b}² = ${sv}`)
        : L(`φ${sup(k + 1)} = ${a} + ${b}φ 在格点图里是 (${fix(q.x, 3)}, ${fix(q.y, 4)})：矩形面积 = F${sub(k)}·F${sub(k + 2)} − F${sub(k + 1)}² = ${a}·${c} − ${b}² = ${sv}`, `φ${sup(k + 1)} = ${a} + ${b}φ sits at (${fix(q.x, 3)}, ${fix(q.y, 4)}) in the lattice: area of the rectangle = F${sub(k)}·F${sub(k + 2)} − F${sub(k + 1)}² = ${a}·${c} − ${b}² = ${sv}`);
      keyRO('Fₖ·Fₖ₊₂ − Fₖ₊₁²', `<span class="${q.value > 0 ? 'c-cy' : 'c-mg'}">${sv}</span>`, `${a}·${c} − ${b}²`);
      set(1, '(Fₖ, Fₖ₊₁, Fₖ₊₂)', `(${a}, ${b}, ${c})`); set(2, L('本身 × 共轭', 'itself × conjugate'), `${fix(q.x, 3)} × ${fix(q.y, 4)} = ${fix(q.x * q.y, 6)}`);
      set(3, L('矩形的长', 'length of the rectangle'), fix(q.x, 3)); set(4, L('斜率 Fₖ/Fₖ₊₁ − φ⁻¹', 'slope Fₖ/Fₖ₊₁ − φ⁻¹'), sgn(slope(k), 6));
      note = L('矩形一次在横轴上方，一次在下方，越来越扁长，面积不变。两条双曲线之间除了原点没有别的格点：非零黄金整数的范数至少是 1。', 'The rectangles lie above and below the axis in turn, ever longer and flatter, with the same area. Between the two hyperbolas there is no lattice point but the origin: the norm of a nonzero golden integer is at least 1.');
      what = `k = ${k}`; key = sv;
    } else if (S.scene === 'returns') {
      const none = !q.hits.length, gap = q.longest != null;
      big = L(`回归 · N = ${q.N}`, `Returns · N = ${q.N}`);
      hud = none ? L(`观测窗 (${fix(q.u1, 2)}, ${fix(q.u2, 2)})：前 ${q.N} 步还没有进入过`, `window (${fix(q.u1, 2)}, ${fix(q.u2, 2)}): not entered in the first ${q.N} steps`)
        : gap && tight ? L(`观测窗 (${fix(q.u1, 2)}, ${fix(q.u2, 2)})：${q.N} 步进入 ${q.hits.length} 次 · 目前最长间隔 ${q.longest} 步（只是样本）`, `window (${fix(q.u1, 2)}, ${fix(q.u2, 2)}): ${q.hits.length} visits in ${q.N} steps · longest gap so far ${q.longest} steps (sample only)`)
        : gap ? L(`观测窗 (${fix(q.u1, 2)}, ${fix(q.u2, 2)})：前 ${q.N} 步进入 ${q.hits.length} 次 · 两次进入之间目前最长隔 ${q.longest} 步（只是样本）`, `window (${fix(q.u1, 2)}, ${fix(q.u2, 2)}): entered ${q.hits.length} times in the first ${q.N} steps · longest gap between two visits so far: ${q.longest} steps (sample only)`)
          : L(`观测窗 (${fix(q.u1, 2)}, ${fix(q.u2, 2)})：前 ${q.N} 步只进入 1 次 · 还没有完整的间隔，上次进入后已过 ${q.open} 步`, `window (${fix(q.u1, 2)}, ${fix(q.u2, 2)}): entered once in the first ${q.N} steps · no completed gap yet, ${q.open} ${q.open === 1 ? 'step' : 'steps'} since that visit`);
      keyRO(L('目前最长的间隔（样本）', 'longest gap so far (sample)'), gap ? `<span class="c-mg">${q.longest}</span>` : '—', gap ? L('步，只描述前 N 步', 'steps, describes the first N steps only') : L('还没有完整的间隔', 'no completed gap yet'));
      set(1, L('进入窗口的次数', 'visits to the window'), String(q.hits.length)); set(2, L('前 N 步中所占比例', 'share of the first N steps'), fix(q.share, 4));
      set(3, L('1 ÷ 目前最长的间隔（描述）', '1 ÷ longest gap so far (descriptive)'), gap ? fix(q.ratio, 4) : '—'); set(4, L('窗口占圆周的份额', 'the window’s share of the circle'), fix(q.measure, 4));
      note = L('这些都是前 N 步的样本读数。定理只断言存在某个 n₀ 与 M：n₀ 之后每连续 M + 1 步至少进入一次，并且对每个 ε > 0，N 足够大时比例不低于 1/(M + 1) − ε。页面没有算出 n₀ 或 M；目前最长的间隔不是 M + 1，不限制以后的间隔，也不给出此刻比例的下界。', 'These are sample readouts of the first N steps. The theorem only asserts that some n₀ and M exist: after n₀ every M + 1 consecutive steps contain a visit, and for each ε > 0 the share is at least 1/(M + 1) − ε once N is large. The page computes neither n₀ nor M; the longest gap so far is not M + 1, does not bound later gaps and gives no lower bound on the share at this N.');
      what = `N = ${q.N}`; key = gap ? L(`最长间隔 ${q.longest}`, `GAP ${q.longest}`) : '—';
    } else if (S.scene === 'gaps') {
      const nm = S.rot === 'golden' ? L('黄金角', 'golden angle') : 'π − 3', three = q.kinds.length === 3;
      big = L(`缝 · ${nm} · N = ${q.N}`, `Gaps · ${S.rot === 'golden' ? 'golden angle' : 'π − 3'} · N = ${q.N}`);
      hud = L(`${q.kinds.length} 种弧${three ? `：${fmtLen(q.kinds[0].len)} + ${fmtLen(q.kinds[1].len)} = ${fmtLen(q.kinds[2].len)}` : ''} · 最长 ÷ 最短 = ${fix(q.ratio, 3)} · N × 最短 = ${q.nmin >= 1e-3 ? fix(q.nmin, 4) : sci(q.nmin)}（1/√5 = 0.4472）`,
        `${q.kinds.length} kinds of arc${three ? `: ${fmtLen(q.kinds[0].len)} + ${fmtLen(q.kinds[1].len)} = ${fmtLen(q.kinds[2].len)}` : ''} · longest ÷ shortest = ${fix(q.ratio, 3)} · N × shortest = ${q.nmin >= 1e-3 ? fix(q.nmin, 4) : sci(q.nmin)} (1/√5 = 0.4472)`);
      keyRO(L('弧长的种数', 'kinds of arc length'), `<span class="${three ? 'c-mg' : 'c-cy'}">${q.kinds.length}</span>`, q.kinds.map((k) => `${fmtLen(k.len)} × ${k.n}`).join(' · '));
      set(1, L('最长 ÷ 最短', 'longest ÷ shortest'), fix(q.ratio, 3)); set(2, L('N × 最短弧', 'N × the shortest arc'), q.nmin >= 1e-3 ? fix(q.nmin, 4) : q.nmin.toExponential(2));
      set(3, 'η⁺ · η⁻', `${fmtLen(q.etaP)} · ${fmtLen(q.etaM)}`); set(4, L('点数', 'points'), String(q.pts.length));
      note = S.rot === 'golden' ? L('黄金角：弧长都是 φ 的相邻负幂，只在 N 是斐波那契数时剩两种；N × 最短弧始终高于 1/√5。', 'The golden angle: the arcs are adjacent negative powers of φ, two kinds only when N is a Fibonacci number; N × the shortest arc stays above 1/√5.')
        : L('π − 3：355/113 离 π 太近，第 113 个点几乎落回 0，N 一过 113 就切出一段极短的弧。种数仍不超过三。', 'π − 3: 355/113 is very close to π, so point 113 falls almost back onto 0 and from N = 114 on there is a tiny arc. There are still no more than three kinds.');
      what = `N = ${q.N}`; key = L(`${q.kinds.length} 种`, `${q.kinds.length} kinds`);
    } else {
      const five = TRIA.verts.filter((v) => v.deg === 5).length, three = TRIA.verts.filter((v) => v.deg === 3).length;
      big = L(`接受窗 · s = ${fix(q.s, 2)}`, `Window · s = ${fix(q.s, 2)}`);
      hud = !q.inside ? L('点已经越过菱形三十面体最近的那个面：它不在窗口里了', 'the point has crossed the nearest face of the rhombic triacontahedron: it is no longer in the window')
        : tight ? L(`离边界 d∂ = ${fix(q.d, 3)}（棱长 1）：更小的扰动推不出窗口`, `d∂ = ${fix(q.d, 3)} from the boundary (edge 1): no smaller push takes it out`)
          : L(`菱形三十面体里的点离边界 d∂ = ${fix(q.d, 3)}（棱长为 1）：比这更小的扰动推不出窗口`, `a point in the rhombic triacontahedron, d∂ = ${fix(q.d, 3)} from the boundary (edge length 1): no smaller disturbance takes it out of the window`);
      keyRO(L('到边界的距离 d∂', 'distance to the boundary, d∂'), q.inside ? `<span class="c-am">${fix(q.d, 3)}</span>` : `<span class="c-mg">${L('窗外', 'outside')}</span>`, q.inside ? `= ${fix(q.d / TRIA.rin, 2)} r` : '');
      set(1, L('面 · 棱 · 顶点', 'faces · edges · vertices'), `${TRIA.faces.length} · ${TRIA.edges.length} · ${TRIA.verts.length}`); set(2, L('五重 · 三重顶点', 'fivefold · threefold vertices'), `${five} · ${three}`);
      set(3, L('内切球半径 r', 'inradius r'), fix(TRIA.rin, 4)); set(4, L('至少这么深的部分', 'the part at least this deep'), q.inside ? `${fix(100 * q.share, 1)}%` : '—');
      note = L('窗口里离边界至少 d 的部分是它自己缩小 1 − d/r 倍的副本，所以深处的点很少：离边界半个 r 以上的只占八分之一。', 'The part of the window at least d from the boundary is a copy of the window shrunk by 1 − d/r, so deep points are few: only one eighth lies more than half of r from the boundary.');
      what = `s = ${fix(q.s, 2)}`; key = q.inside ? `d∂ = ${fix(q.d, 2)}` : L('窗外', 'OUTSIDE');
    }
    $('hudBig').textContent = big; $('hudSub').textContent = hud; $('roNote').textContent = note; $('roAside').textContent = L(SC[S.scene].name[0], SC[S.scene].name[1]);
    $('pillScene').querySelector('strong').textContent = SC[S.scene].name[1]; $('pillWhat').querySelector('strong').textContent = what; $('pillKey').querySelector('strong').textContent = key;
    const leg = legend(q).map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== leg) { $('legend').innerHTML = leg; $('legend')._h = leg; }
  }
  // the HUD is written first and the theme places the title block (under the scene buttons or not, TRV.hudFit); the
  // stage then measures the band between the title block and the legend as they are shown in this very frame
  const paint = kit.painter(() => { const q = state(); drawText(q); TRV.hudFit(); drawStage(q); drawPlots(q); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, rate: 0.085, step: 0.05, t: 0.5,
    format: (t, max) => (S.scene === 'cut' ? `u ${sgn(uOf(t), 2)}` : S.scene === 'cassini' ? `k ${kOf(t)} <small>/ ${KMAX}</small>` : S.scene === 'returns' ? `N ${1 + Math.round(t)} <small>/ ${NMAX}</small>` : S.scene === 'gaps' ? `N ${nOf(t)} <small>/ ${GMAX}</small>` : `s ${t.toFixed(2)} <small>/ ${max.toFixed(1)}</small>`),
    onChange: () => paint()
  });
  function fitClock(t) { const sc = SC[S.scene]; clock.pause(); clock.rate = sc.rate; clock.step = sc.step; clock.setMax(sc.max, true); clock.set(t == null ? sc.start : t); }
  function setScene(sc, t) {
    S.scene = sc; sceneChips.set(sc, true); $('stage').classList.toggle('still', sc !== 'window3');
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    fitClock(t);
  }
  /** Fix (or release) the middle patch at the current shift, keeping the shift where it is. */
  function setPatch(on, u) {
    if (u == null) u = uOf(clock.t);
    S.patch = null;
    if (on) { for (const du of [0, 0.04, -0.04, 0.09, -0.09]) { const p = patchAt(clamp(u + du, -0.49, 0.49)); if (p.hi - p.lo > 0.03) { S.patch = p; u = p.ref; break; } } }
    patchChips.set(S.patch ? 'on' : 'off', true); clock.pause(); clock.set(clamp(tOf(clamp(u, -0.5, 0.5)), 0, 1));
  }
  const leave = () => cards.mark(null);
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  const patchChips = kit.chips($('patchChips'), 'patch', (v) => { leave(); setPatch(v === 'on'); });
  const rotChips = kit.chips($('rotChips'), 'rot', (v) => { S.rot = v; leave(); paint(); });
  const fWC = kit.field($('wc'), { fmt: (v) => sgn(v, 2), onInput: (v) => { S.wc = v; leave(); paint(); } });
  const fWW = kit.field($('ww'), { fmt: (v) => fix(v, 2), onInput: (v) => { S.ww = v; leave(); paint(); } });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('cut'); }, 2: () => { leave(); setScene('cassini'); }, 3: () => { leave(); setScene('returns'); }, 4: () => { leave(); setScene('window3'); }, 5: () => { leave(); setScene('gaps'); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    cut: { scene: 'cut', u: 0 }, phason: { scene: 'cut', u: 0.3, play: true, still: 0.8 }, empire: { scene: 'cut', u: 0.15, patch: true, at: 0.5, play: true, still: 0.5 },
    cassini: { scene: 'cassini', at: 3, play: true, still: 3 }, returns: { scene: 'returns', wc: 0.5, ww: 0.6, at: 88, play: true, still: 88 },
    narrow: { scene: 'returns', wc: 0.5, ww: 0.1, at: NMAX - 1, play: true, still: NMAX - 1 },
    window: { scene: 'window3', at: 0.15 },
    gaps: { scene: 'gaps', rot: 'golden', at: 13 - GMIN }, pi: { scene: 'gaps', rot: 'pi', at: 114 - GMIN }
  };
  const NOTES = {
    cut: ['黄金整数 a + bφ 画成平面上的格点：横坐标是它本身，纵坐标是共轭 a + bψ。琥珀色的窗口长为 1，选出青色的点，投到下面的直线上，相邻两点只相距 φ 或 φ²。此刻窗口是闭区间 [φ − 2, φ − 1]，两个端点上各有一个格点，所以原点左边多出一段长为 1 的间隔。绿圈是自然数的黄金展开 β(n)。', 'The golden integers a + bφ drawn as lattice points: across, the number itself; up, its conjugate a + bψ. The amber window has length 1; it selects the cyan points, and projected to the line below, neighbours are φ or φ² apart. Here the window is the closed interval [φ − 2, φ − 1] with a lattice point on each end, so one extra gap of length 1 appears left of the origin. The green rings are the golden expansions β(n) of the natural numbers.'],
    phason: ['窗口从 u = −0.5 挪到 +0.5。贴着边的点（品红）进进出出，下面那排砖里相邻的一长一短随之对调；离边远的点一直留在原地。', 'The window moves from u = −0.5 to +0.5. Points at its edge (magenta) come and go, and in the row of tiles below a long and a short neighbour swap each time; points far from the edge stay where they are.'],
    empire: ['把中间一小片（|x| ≤ 4 的点）固定下来：窗口只能在一小段范围里挪动。在这段范围里始终留在窗口内的点都被这一小片定住，包括很远的；只有品红色的点还悬而未决。', 'Fix the small patch in the middle (the points with |x| ≤ 4): the window can now move only within a short range. Every point that stays inside the window over that whole range is fixed by the patch, however far away; only the magenta points are still undecided.'],
    cassini: ['还是那张格点图。φ 的幂 φ², φ³, … 一个在横轴上方、一个在下方，越来越贴近横轴；它与原点围成的矩形越来越扁长，面积却永远恰好是 1。这个面积就是卡西尼式 Fₖ·Fₖ₊₂ − Fₖ₊₁²。', 'The same lattice again. The powers φ², φ³, … lie above and below the horizontal axis in turn, ever closer to it; the rectangle each spans with the origin grows longer and flatter, and yet its area is always exactly 1. That area is Cassini’s expression Fₖ·Fₖ₊₂ − Fₖ₊₁².'],
    returns: ['圆上的点每一步转过黄金角；它的高度 cos 2πnφ 就是观测值。琥珀色的带子是观测窗 (0.2, 0.8)。轨道一次次回到带子里；洋红的括号标出这些步里两次进入之间最长的间隔，它只描述画出的这些步。', 'A point on the circle turns by the golden angle at each step; its height cos 2πnφ is what is observed. The amber band is the observation window (0.2, 0.8). The orbit comes back into the band again and again; the magenta bracket marks the longest gap between two visits among the steps drawn, and describes those steps only.'],
    narrow: ['把窗口收窄到 (0.45, 0.55)：进入得更少，画出的间隔更长。图上的最长间隔只是这 233 步的样本，不是定理里的 M；定理只保证存在某个 M，图上不读出它。', 'Narrow the window to (0.45, 0.55): visits are rarer and the gaps drawn are longer. The longest gap on the picture is a sample of these 233 steps, not the M of the theorem; the theorem only guarantees that some M exists, and the picture does not read it off.'],
    window: ['菱形三十面体：六条五重轴各出一条棱，拼成 30 个菱形面、60 条棱、32 个顶点。靠近中心的琥珀色点离每个面都远，球的半径 d∂ 就是它经得起的扰动；同一条虚线上贴近边界的品红点只剩 d∂ ≈ 0.10，再推一点就出窗。拖动可以转动它。', 'The rhombic triacontahedron: each of the six fivefold axes supplies an edge, giving 30 rhombic faces, 60 edges and 32 vertices. The amber point near the centre is far from every face, and the radius d∂ of its ball is the disturbance it can withstand; the magenta point on the same dashed line, near the boundary, has only d∂ ≈ 0.10 left and a small push takes it out. Drag to turn it.'],
    gaps: ['黄金角的前 13 个点切出两种弧：5 段短的（青）与 8 段长的（品红）。拖动时间轴改变 N：弧长从不超过三种，恰在斐波那契数处只剩两种。', 'The first 13 points at the golden angle cut two kinds of arc: 5 short ones (cyan) and 8 long ones (magenta). Drag the rail to change N: there are never more than three kinds, and exactly at the Fibonacci numbers only two.'],
    pi: ['换成 π − 3，停在 N = 114：第 113 个点几乎落回 0，在那里切出一段只有 3.0 × 10⁻⁵ 的弧（圈出）。弧长仍不超过三种，但最长与最短之比约 294。', 'Switch to π − 3 and stop at N = 114: point 113 falls almost back onto 0 and cuts an arc of only 3.0 × 10⁻⁵ there (ringed). There are still at most three kinds of arc, but the longest is about 294 times the shortest.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    S.patch = null; patchChips.set('off', true);
    if (p.rot) { S.rot = p.rot; rotChips.set(p.rot, true); }
    if (p.wc != null) { S.wc = p.wc; S.ww = p.ww; fWC.set(p.wc); fWW.set(p.ww); }
    if (p.scene === 'window3') Object.assign(st.cam, WIN_CAM);      // the card looks in through the cut
    setScene(p.scene, p.scene === 'cut' ? p.u + 0.5 : p.at);
    if (p.patch) { setPatch(true, p.u); clock.set(p.at); }
    // a still (cover, cited figure shot) and the opening view of the full page show the card's declared frame
    if (TRV.still || (booting && !TRV.embed)) { if (p.still != null) clock.set(p.still); return; }
    if (!p.play) return;
    clock.set(0);
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  // Cited figures use a single sentence; the full laboratory keeps the detailed card notes.
  const FIGURE_NOTES = {
    "cut": ["黄金格点经长度 1 的闭窗筛选：投影通常间隔 φ 或 φ²，双端点入窗另生一段 1。", "Closed window of length 1: gaps φ or φ²; both endpoints add one gap of length 1."],
    "empire": ["固定 |x| ≤ 4 的小片会限制窗口移动，连远方始终留在窗内的点也随之固定。", "Fixing the patch |x| ≤ 4 restricts the window; even distant points that stay inside throughout are fixed."],
    "cassini": ["φ 的幂交替贴近横轴，长方形面积始终为 |FₖFₖ₊₂ − Fₖ₊₁²| = 1。", "Powers of φ approach the axis alternately; each rectangle has area |FₖFₖ₊₂ − Fₖ₊₁²| = 1."],
    "returns": ["黄金角轨道反复进入 (0.2, 0.8)；品红括号仅标出已画步骤中的最长回归间隔。", "Orbit revisits (0.2, 0.8); magenta marks the longest gap in the drawn steps only."],
    "narrow": ["窄窗 (0.45, 0.55) 使回归更稀；图中 233 步的最长间隔不是定理所保证的 M。", "The narrow window (0.45, 0.55) makes visits rarer; the sample’s longest gap is not the theorem’s M."],
    "window": ["菱形三十面体内，点到边界的距离 d∂ 是可容扰动的半径；靠边时半径缩小。", "Rhombic triacontahedron: boundary distance d∂ is the disturbance radius."],
    "phason": ["移动窗口：品红边界点进出，相邻长短砖对调；内部点不动。", "Edge points enter or leave; long and short tiles swap, while inner points stay."],
    "gaps": ["黄金角前 13 点：5 段青色短弧、8 段品红长弧，弧长只有两种。", "13 golden-angle points: 5 short cyan arcs and 8 long magenta arcs, two lengths."],
    "pi": ["π − 3、N = 114：圈内短弧约 3×10⁻⁵，最长弧约为它的 294 倍。", "π − 3, N = 114: ringed arc ≈ 3×10⁻⁵; longest/shortest ≈ 294."],
  };
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：上下拖动窗口，拖时间轴，换场景，固定一小片，或改观测窗。随时可以再选一张卡。', 'Free play: drag the window up and down, scrub the rail, change the scene, fix a patch or change the observation window. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  window.CUT_DEBUG = {
    get state() {
      const q = state(), out = { scene: S.scene, t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current };
      const pt = (p) => ({ a: p.a, b: p.b, x: p.x, c: p.c });
      if (S.scene === 'cut') Object.assign(out, { u: q.u, window: [LO + q.u, HI + q.u], half: q.half, selected: q.sel.map(pt), kinds: q.kinds, minGap: q.minGap, seen: q.seen.length, edge: q.edge, deep: q.deep && Object.assign(pt(q.deep), { margin: margin(q.deep.c, q.u) }), patch: S.patch && { lo: S.patch.lo, hi: S.patch.hi, ref: S.patch.ref, radius: PATCH, emp: q.emp, forced: q.forced.map(pt), free: q.free.map(pt) }, beta: Array.from({ length: 40 }, (_, n) => beta(n)) });
      else if (S.scene === 'cassini') Object.assign(out, { k: q.k, fib: [FIB[q.k], FIB[q.k + 1], FIB[q.k + 2]].map(String), value: q.value, point: [q.x, q.y], all: Array.from({ length: KN }, (_, i) => Number(cassini(i + 1))), slopes: Array.from({ length: KN }, (_, i) => slope(i + 1)) });
      else if (S.scene === 'returns') Object.assign(out, { N: q.N, u1: q.u1, u2: q.u2, hits: q.hits, waits: q.waits, longest: q.longest, open: q.open, share: q.share, ratio: q.ratio, measure: q.measure });
      else if (S.scene === 'gaps') Object.assign(out, { N: q.N, rot: q.rot, a: q.a, kinds: q.kinds.map((k) => ({ len: k.len, n: k.n })), ratio: q.ratio, nmin: q.nmin, min: q.min, etaP: q.etaP, etaM: q.etaM });
      else Object.assign(out, { s: q.s, p: q.p, d: q.d, inside: q.inside, share: q.share, rin: TRIA.rin, rout: TRIA.rout, counts: [TRIA.faces.length, TRIA.edges.length, TRIA.verts.length], nearest: q.face.n, edgePt: q.edgePt ? { s: q.edgePt.s, p: q.edgePt.p, d: q.edgePt.d } : null });
      return out;
    },
    seek: (t) => { clock.pause(); clock.set(t); },
    /** The polyhedron as the page built it: vertices with their degree, faces as four vertex indices with the outward normal. */
    solid: () => ({ verts: TRIA.verts.map((v) => ({ p: v.p, deg: v.deg })), faces: TRIA.faces.map((f) => ({ i: f.i, n: f.n })), edges: TRIA.edges.map((e) => [e.a, e.b]) }),
    /** The Zeckendorf code of n as the page computes it (digit i stands for F_{i+2}), and the strip it draws for n ≤ 54. */
    zeck: (n) => zeck(n),
    zstrip: () => ({ n: ZN, codes: ZSTRIP.codes, adjacent: ZSTRIP.adjacent, wrong: ZSTRIP.wrong }),
    /** The orbit point and the observed value at step n. */
    orbit: (n) => [orbitX(n), obs(n)],
    /** The lattice points the page works with: every golden integer with |a + bφ| ≤ 60 and |a + bψ| ≤ 2.3. */
    lattice: () => NEAR.map((p) => ({ a: p.a, b: p.b, x: p.x, c: p.c }))
  };
  window.TRV_THUMB = () => { S.patch = null; patchChips.set('off', true); setScene('cut', 0.62); paint.now(); };
  cards.pick(cards.initial('phason'));
  booting = false;
  paint();
})();
