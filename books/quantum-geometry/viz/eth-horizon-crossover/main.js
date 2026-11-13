/* ORTHO//HORIZON: the ETH section of chapter 30, in three scenes.
   rates  the schematic exponent rate r(n) = c·log₂log₂n/√log₂n against the constant rate of PPSZ for k-SAT
          (k = 3 … 6; 0.386 for k = 3), over log₂ n from 2 to 800, with the scale of the observable universe (2^266) shaded
   cut    the bridge graph of width three: flow = Σ_r M_r ⊗ N_r with M_r of size a×b and N_r of size d×c; its four
          cuts a·d, b·c, 3·a·c and 3·b·d (one for each side of the two inner tensors; the frozen QMinCut takes the
          first three), the exact rank of a random integer instance and its singular values
   modes  a nonnegative spectrum of total RW/π (the trace budget of chapter 12): at most RW/(πτ) of its terms reach the
          threshold τ
   The rail is log₂ n (rates), the draw (cut) or the threshold (modes).
   Read-only probe for the browser suite: window.HORIZON_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const ATOMS = 266, LMAX = 800;
  /** The PPSZ exponent rate for unique k-SAT: time 2^((1 − μ_k/(k−1))·n) with μ_k = Σ_{j≥1} 1/(j(j + 1/(k−1))).
      μ_k/(k−1) = Σ x/(j(j + x)) with x = 1/(k−1): summed to J, the tail Σ_{j>J} by its integral from J + ½ (error O(J⁻³)). */
  const ppszRates = {};
  function ppsz(k) {
    if (ppszRates[k] == null) { const x = 1 / (k - 1), J = 20000; let s = 0; for (let j = J; j >= 1; j--) s += x / (j * (j + x)); ppszRates[k] = 1 - (s + Math.log1p(x / (J + 0.5))); }
    return ppszRates[k];
  }
  const ASYM = (k) => 1 - Math.PI * Math.PI / (6 * k);   // the leading term for large k: k·(1 − r_k) → μ_∞ = π²/6
  const S = { scene: 'rates', c: 1, k: 3, dims: [2, 3, 2, 3], prof: 'plateau' };
  const PPSZ = () => ppsz(S.k);
  const face = (f) => (f === 'body' ? TRV.fonts.body : f === 'display' ? TRV.fonts.display : TRV.fonts.data);
  function text(ctx, str, x, y, color, o) {
    o = o || {};
    ctx.font = `${o.weight ? o.weight + ' ' : ''}${o.size || 11}px ${face(o.face)}`; ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'middle'; ctx.globalAlpha = o.alpha == null ? 1 : o.alpha;
    if (o.halo) { ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.strokeStyle = P.stage; ctx.strokeText(str, x, y); }
    ctx.fillStyle = color; ctx.fillText(str, x, y); ctx.globalAlpha = 1;
  }
  const sup = (n) => String(n).split('').map((d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d]).join('');

  /* ---------- rates ---------- */
  const rate = (c, l) => c * Math.log2(l) / Math.sqrt(l);                       // l = log₂ n
  /** log₂ n at which the curve falls to the PPSZ rate p (on its falling branch, past l = e²), or null if it is below everywhere. */
  function crossover(c, p = PPSZ()) {
    const top = Math.E * Math.E; if (rate(c, top) <= p) return null;
    let lo = top, hi = 1e7; for (let i = 0; i < 80; i++) { const mid = (lo + hi) / 2; if (rate(c, mid) > p) lo = mid; else hi = mid; }
    return (lo + hi) / 2;
  }
  const scaleL = () => clamp(clock.t, 2, LMAX);
  function drawRates(l) {
    const g = kit.plot($('cv'), { x: [0, LMAX], y: [0, Math.max(1.3, 1.12 * rate(S.c, Math.E * Math.E))], pad: [44, 24, box.top + 4, box.bottom + 24] }), x = crossover(S.c);
    g.rect(0, g.y0, ATOMS, g.y1, P.lineHot, { alpha: 0.14 });
    g.axes({ yTicks: [0, 0.25, 0.5, 0.75, 1, 1.25].filter((v) => v <= g.y1), xTicks: [0, 100, 200, 300, 400, 500, 600, 700, 800], xLabel: 'log₂ n', yLabel: L('每个变量的指数 r', 'exponent per variable r') });
    g.vline(ATOMS, P.ink, { alpha: 0.55, dash: [3, 4] });
    g.hline(1, P.dim, { dash: [2, 4] }); g.hline(PPSZ(), P.magenta, { width: 2 });
    const pts = []; for (let i = 0; i <= 400; i++) { const ll = 2 + (LMAX - 2) * Math.pow(i / 400, 2); pts.push([ll, rate(S.c, ll)]); }
    g.line(pts, P.cyan, { width: 2.4, glow: 8 });
    if (x != null && x <= LMAX) { g.vline(x, P.ink, { alpha: 0.8 }); g.dot(x, PPSZ(), P.ink, 4.5); }
    g.vline(l, P.amber, { alpha: 0.9 }); g.dot(l, rate(S.c, l), P.amber, 6.5, { glow: 12 });
    if (!TRV.thumbMode) {
      const atomsLab = L('宇宙原子数 2²⁶⁶ 以内', 'within the atoms of the universe, 2²⁶⁶'); g.ctx.font = `11.5px ${TRV.fonts.body}`;
      const atomsFits = g.ctx.measureText(atomsLab).width + 16 <= g.X(ATOMS) - g.X(0);   // on a narrow stage it starts at the axis instead
      g.text(atomsFits ? ATOMS : 0, g.y1, atomsLab, P.ink, { align: atomsFits ? 'right' : 'left', base: 'top', dx: atomsFits ? -8 : 8, dy: 26, face: 'body', size: 11.5, alpha: 0.9 });   // below the axis label
      g.text(LMAX, PPSZ(), `PPSZ ${S.k}-SAT ${fix(PPSZ(), 3)}`, P.magenta, { align: 'right', base: 'bottom', dx: -6, dy: -5, size: 11.5 });
      g.text(LMAX, 1, L('穷举 2ⁿ：r = 1', 'brute force 2ⁿ: r = 1'), P.dim, { align: 'right', base: 'bottom', dx: -6, dy: -4, face: 'body', size: 11 });
      // at the foot of the crossover line: the curve stays above r ≈ 0.13 on the drawn range for every c with a crossover
      if (x != null && x <= LMAX) {
        g.ctx.font = `11.5px ${TRV.fonts.body}`;
        const crossLab = L(`交叉 n ≈ 2${sup(Math.round(x))}`, `crossover n ≈ 2${sup(Math.round(x))}`), left = g.X(x) + 8 + g.ctx.measureText(crossLab).width + 60 > g.X(LMAX);   // keep clear of the axis name at the right end
        g.text(x, g.y0, crossLab, P.ink, { align: left ? 'right' : 'left', base: 'bottom', dx: left ? -8 : 8, dy: -8, face: 'body', size: 11.5, halo: true });
      }
      g.text(l, rate(S.c, l), fix(rate(S.c, l), 3), P.amber, { align: l > 700 ? 'right' : 'left', base: 'bottom', dx: l > 700 ? -10 : 10, dy: -8, size: 12.5, weight: 600, halo: true });
    }
  }

  /* ---------- the bridge graph ---------- */
  let inst = null, cutGeo = null;
  /** A seeded random instance: M_r (a×b) and N_r (d×c) with entries in {−2 … 2}, and flow = Σ_r M_r ⊗ N_r ((a·d) × (b·c)). */
  function instance(a, b, c, d, seed) {
    const rng = TRV.mulberry32(7919 * (seed + 1) + 31 * a + 131 * b + 17 * c + 257 * d), R = () => Math.floor(rng() * 5) - 2;
    const M = [0, 1, 2].map(() => Array.from({ length: a }, () => Array.from({ length: b }, R))), N = [0, 1, 2].map(() => Array.from({ length: d }, () => Array.from({ length: c }, R)));
    const F = Array.from({ length: a * d }, () => new Array(b * c).fill(0));
    for (let r = 0; r < 3; r++) for (let i = 0; i < a; i++) for (let l = 0; l < d; l++) for (let j = 0; j < b; j++) for (let k = 0; k < c; k++) F[i * d + l][j * c + k] += M[r][i][j] * N[r][l][k];
    return { a, b, c, d, seed, M, N, F, rank: rankExact(F), sv: singular(F) };
  }
  /** Rank over the rationals by fraction-free (Bareiss) elimination with BigInt: exact. */
  function rankExact(F) {
    const A = F.map((row) => row.map((v) => BigInt(v))), rows = A.length, cols = rows ? A[0].length : 0; let rank = 0, prev = 1n;
    for (let col = 0; col < cols && rank < rows; col++) {
      let piv = -1; for (let i = rank; i < rows; i++) if (A[i][col] !== 0n) { piv = i; break; }
      if (piv < 0) continue;
      [A[rank], A[piv]] = [A[piv], A[rank]];
      for (let i = rank + 1; i < rows; i++) { for (let j = col + 1; j < cols; j++) A[i][j] = (A[i][j] * A[rank][col] - A[i][col] * A[rank][j]) / prev; A[i][col] = 0n; }
      prev = A[rank][col]; rank++;
    }
    return rank;
  }
  /** Singular values: square roots of the eigenvalues of the smaller Gram matrix, by cyclic Jacobi rotations. */
  function singular(F) {
    const rows = F.length, cols = F[0].length, tall = rows > cols, n = Math.min(rows, cols), G = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let i = 0; i < n; i++) for (let j = i; j < n; j++) { let s = 0; if (tall) for (let k = 0; k < rows; k++) s += F[k][i] * F[k][j]; else for (let k = 0; k < cols; k++) s += F[i][k] * F[j][k]; G[i][j] = G[j][i] = s; }
    for (let sweep = 0; sweep < 60; sweep++) {
      let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += G[i][j] * G[i][j];
      if (off < 1e-22) break;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
        if (Math.abs(G[p][q]) < 1e-300) continue;
        const th = (G[q][q] - G[p][p]) / (2 * G[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), cs = 1 / Math.sqrt(t * t + 1), sn = t * cs;
        for (let k = 0; k < n; k++) { const gp = G[k][p], gq = G[k][q]; G[k][p] = cs * gp - sn * gq; G[k][q] = sn * gp + cs * gq; }
        for (let k = 0; k < n; k++) { const gp = G[p][k], gq = G[q][k]; G[p][k] = cs * gp - sn * gq; G[q][k] = sn * gp + cs * gq; }
      }
    }
    return G.map((row, i) => Math.sqrt(Math.max(0, row[i]))).sort((x, y) => y - x);
  }
  /** The four cuts of the whole graph, one for each way of putting the inner tensors M and N on the input side (with
      b and c) or the output side (with a and d): both in cut a and d (a·d), both out cut b and c (b·c), M in and N out
      cut a, the bond of the three bridges and c (3·a·c), M out and N in cut b, the bond and d (3·b·d).
      min is QMinCut of the frozen theorem, min(3ac, ad, bc); full is the minimal cut of the whole graph. */
  const cuts = (a, b, c, d) => { const min = Math.min(3 * a * c, a * d, b * c), bd = 3 * b * d; return { rows: a * d, cols: b * c, bridges: 3 * a * c, bridgesBD: bd, min, full: Math.min(min, bd) }; };
  const inCone = (a, b, c, d) => a > 0 && a <= b && c > 0 && c <= d && a * a + b * b <= 3 * a * b && c * c + d * d <= 3 * c * d;
  const draw = () => Math.floor(clock.t + 1e-9);
  function fresh() { const [a, b, c, d] = S.dims, seed = draw(); if (!inst || inst.a !== a || inst.b !== b || inst.c !== c || inst.d !== d || inst.seed !== seed) inst = instance(a, b, c, d, seed); return inst; }
  function drawCut() {
    const g = kit.plot($('cv'), { x: [0, 1], y: [0, 1], pad: [0, 0, 0, 0] }), ctx = g.ctx, W = g.W, H = g.H, I = fresh(), k = cuts(I.a, I.b, I.c, I.d), words = !TRV.thumbMode;
    const x0 = 18, y0 = box.top, w = W - 36, h = H - box.top - box.bottom, wide = w > 560, dw = wide ? w * 0.44 : w, dh = wide ? h : h * 0.42;
    // no room for the diagram (a frame still loading, hidden or in mid-resize): the canvas stays as kit.plot cleared it and
    // there is no geometry to report; the painter's ResizeObserver draws the diagram again once the stage has its room back
    if (!(w > 0 && h > 0)) { cutGeo = null; return; }
    // the diagram: two nodes, the bond of three bridges, four outer legs (a and b on M, d and c on N); the four cuts as dashed lines
    const mx = x0 + dw * 0.3, nx = x0 + dw * 0.7, cy = y0 + dh * 0.5, r = Math.min(38, dh * 0.13, dw * 0.085), mid = (mx + nx) / 2;
    const leg = (xa, ya, xb, yb, col, wd) => { ctx.strokeStyle = col; ctx.lineWidth = wd; ctx.beginPath(); ctx.moveTo(xa, ya); ctx.lineTo(xb, yb); ctx.stroke(); };
    const LEGS = { a: [[mx - r * 0.7, cy - r * 0.7], [mx - r * 2.2, cy - r * 2.4]], b: [[mx - r * 0.7, cy + r * 0.7], [mx - r * 2.2, cy + r * 2.4]], d: [[nx + r * 0.7, cy - r * 0.7], [nx + r * 2.2, cy - r * 2.4]], c: [[nx + r * 0.7, cy + r * 0.7], [nx + r * 2.2, cy + r * 2.4]] };
    const BRIDGES = [-r * 0.55, 0, r * 0.55].map((dy) => [[mx + r, cy + dy], [nx - r, cy + dy]]);
    for (const [[xa, ya], [xb, yb]] of BRIDGES.concat(Object.values(LEGS))) leg(xa, ya, xb, yb, P.ink, 1.6);
    for (const [x, lab] of [[mx, 'M'], [nx, 'N']]) { ctx.fillStyle = P.stage; ctx.strokeStyle = P.cyan; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, cy, r, 0, kit.TAU); ctx.fill(); ctx.stroke(); text(ctx, lab, x, cy + 1, P.ink, { align: 'center', size: 14, weight: 600 }); }
    text(ctx, `a = ${I.a}`, mx - r * 2.3, cy - r * 2.8, P.ink, { align: 'center', size: 12 }); text(ctx, `b = ${I.b}`, mx - r * 2.3, cy + r * 2.8, P.ink, { align: 'center', size: 12 });
    text(ctx, `d = ${I.d}`, nx + r * 2.3, cy - r * 2.8, P.ink, { align: 'center', size: 12 }); text(ctx, `c = ${I.c}`, nx + r * 2.3, cy + r * 2.8, P.ink, { align: 'center', size: 12 });
    // every cut runs from the left (between legs a and b) to the right (between legs d and c), leaving the ends of a and d
    // above it and the ends of b and c below; the two through the bridges pass over one tensor and under the other
    const flip = ([x, y]) => [x, 2 * cy - y], over = [mx + r * 0.2, cy - r * 1.85];
    const upper = [[mx - r * 2.7, cy - r * 1.9], [mid, cy - r * 2.9], [nx + r * 2.7, cy - r * 1.9]], ac = [[mx - r * 2.6, cy - r * 0.9], over, [nx - r * 0.2, cy + r * 1.85], [nx + r * 2.6, cy + r * 0.9]];
    const SEP = [
      { id: 'ad', value: k.rows, pts: upper, label: `a·d = ${k.rows}`, at: [mid, cy - r * 3.5], align: 'center' },
      { id: 'bc', value: k.cols, pts: upper.map(flip), label: `b·c = ${k.cols}`, at: [mid, cy + r * 3.5], align: 'center' },
      { id: 'ac', value: k.bridges, pts: ac, label: `3·a·c = ${k.bridges}`, at: [over[0] + 12, over[1] - 4], align: 'left' },
      { id: 'bd', value: k.bridgesBD, pts: ac.map(flip), label: `3·b·d = ${k.bridgesBD}`, at: flip([over[0] + 12, over[1] - 4]), align: 'left' }
    ].map((q) => ({ ...q, hot: q.value === k.full }));
    for (const q of SEP.filter((z) => !z.hot).concat(SEP.filter((z) => z.hot))) {
      ctx.strokeStyle = q.hot ? P.magenta : P.dim; ctx.lineWidth = q.hot ? 2.4 : 1.2; ctx.setLineDash([5, 4]); if (q.hot) { ctx.shadowColor = P.magenta; ctx.shadowBlur = 8; }
      ctx.beginPath(); q.pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.setLineDash([]); ctx.shadowBlur = 0;
      text(ctx, q.label, q.at[0], q.at[1], q.hot ? P.magenta : P.dim, { align: q.align, size: 12, weight: q.hot ? 600 : 0, halo: true });
    }
    cutGeo = { r, M: [mx, cy], N: [nx, cy], legs: LEGS, bridges: BRIDGES, cuts: SEP.map((q) => ({ id: q.id, value: q.value, hot: q.hot, label: q.label, pts: q.pts.map((p) => p.slice()) })) };
    // the flow matrix and its singular values
    const gx = wide ? x0 + dw + 14 : x0, gy = wide ? y0 + 16 : y0 + dh + 14, gw = wide ? w - dw - 14 : w, gh = (wide ? h : h - dh) - 16 - 54;
    const rows = I.F.length, cols = I.F[0].length, cell = Math.max(3, Math.min(gw / cols, gh / rows, 46)), ox = gx + (gw - cell * cols) / 2, oy = gy + Math.max(0, (gh - cell * rows) / 2);
    let top = 1; for (const row of I.F) for (const v of row) top = Math.max(top, Math.abs(v));
    for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) { const v = I.F[i][j]; ctx.fillStyle = v ? TRV.alpha(v > 0 ? P.cyan : P.ink, (v > 0 ? 0.2 : 0.15) + (v > 0 ? 0.8 : 0.6) * Math.abs(v) / top) : TRV.alpha(P.lineHot, 0.25); ctx.fillRect(ox + j * cell, oy + i * cell, cell - Math.max(1, cell * 0.08), cell - Math.max(1, cell * 0.08)); }
    if (words) text(ctx, L(`flow：${rows} 行 × ${cols} 列`, `flow: ${rows} rows × ${cols} columns`), ox, oy - 9, P.dim, { size: 11, face: 'body' });
    const n = I.sv.length, by = oy + cell * rows + 46, bw = Math.min(26, (cell * cols) / n), smax = I.sv[0] || 1;
    for (let i = 0; i < n; i++) { const hh = 34 * I.sv[i] / smax, on = i < I.rank; ctx.fillStyle = on ? P.cyan : P.faint; ctx.fillRect(ox + i * bw, by - Math.max(hh, 1.5), Math.max(2, bw - 3), Math.max(hh, 1.5)); }
    ctx.strokeStyle = P.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ox + I.rank * bw - 1.5, by - 40); ctx.lineTo(ox + I.rank * bw - 1.5, by + 3); ctx.stroke();
    if (words) text(ctx, L(`奇异值：前 ${I.rank} 个非零`, `singular values: the first ${I.rank} are nonzero`), ox + n * bw + 8, by - 14, P.dim, { size: 11, face: 'body' });
  }

  /* ---------- modes ---------- */
  const NM = 40;
  const SPEC = {
    plateau: (j) => 1 / (1 + Math.exp((j - 7.5) / 0.55)),
    geometric: (j) => Math.pow(2, -(j + 1)),   // chapter 12, example step 5: λⱼ = 2^−(j+1), total RW/π = 1
    power: (j) => 1 / ((1 + j * 0.5) * (1 + j * 0.5))
  };
  const lam = (j) => SPEC[S.prof](j);
  /** The total of the spectrum over the indices the page draws and beyond (the tails are summed far enough to converge). */
  const totals = {};
  const total = () => { if (totals[S.prof] == null) { let s = 0; for (let j = 0; j < 200000; j++) s += lam(j); totals[S.prof] = s; } return totals[S.prof]; };
  const theta = () => clamp(1 - 0.98 * clock.t, 0.02, 1);
  /** The threshold as printed: three decimals below 0.1, so that the printed τ and the printed wall RW/(πτ) agree. */
  const fixTau = (x) => fix(x, x < 0.1 - 1e-12 ? 3 : 2);
  const countAbove = (th) => { let n = 0; while (n < 200000 && lam(n) >= th - 1e-12) n++; return n; };   // the three spectra decrease
  /** τ as the chapter writes it: 1/8 rather than 0.125 when it is the reciprocal of a whole number. */
  const fmtTau = (th) => { const r = Math.round(1 / th); return r > 1 && r <= 64 && Math.abs(1 / th - r) < 1e-9 ? `1/${r}` : fixTau(th); };
  let view = null;
  function drawModes() {
    const short = S.prof === 'geometric', nm = short ? 12 : NM, yTop = short ? 0.6 : 1.1;   // the halving spectrum: twelve modes fill the stage
    const th = theta(), T = total(), wall = T / th, g = kit.plot($('cv'), { x: [0, nm], y: [0, yTop], pad: [44, 24, box.top + 4, box.bottom + 24] }); view = g;
    g.axes({ yTicks: short ? [0, 0.125, 0.25, 0.5] : [0, 0.25, 0.5, 0.75, 1], xTicks: short ? [0, 2, 4, 6, 8, 10, 12] : [0, 10, 20, 30, 40], yLabel: 'λⱼ', yFmt: short ? (v) => (v ? `1/${Math.round(1 / v)}` : '0') : undefined });
    // the axis name sits between the ticks 30 and 40, under the axis, where neither the threshold nor the wall can cross it
    if (!TRV.thumbMode && !(short && g.W < 520)) g.text(short ? 11 : 35, 0, L('模态序号 j', 'mode index j'), P.dim, { align: 'center', base: 'top', dy: 5, size: 10.5, face: 'body' });
    for (let j = 0; j < nm; j++) { const v = lam(j), on = v >= th - 1e-12; g.rect(j + 0.12, 0, j + 0.88, v, on ? P.cyan : P.dim, { alpha: on ? 0.95 : 0.5 }); }
    g.hline(th, P.amber, { width: 2, glow: 8 });
    // each bar that clears the line pays at least τ out of the budget: an amber notch at the height τ on it
    for (let j = 0; j < nm && lam(j) >= th - 1e-12; j++) g.line([[j + 0.06, th], [j + 0.94, th]], P.amber, { width: 4 });
    if (wall <= nm) { g.vline(wall, P.magenta, { width: 2.4 }); }
    if (!TRV.thumbMode) {
      // the threshold's label ends short of the wall when the wall stands near the right edge
      const thX = wall <= nm && wall > nm * 0.75 ? wall : nm;
      g.text(thX, th, `τ = ${fmtTau(th)}`, P.amber, { align: 'right', base: 'bottom', dx: -8, dy: -5, size: 12, weight: 600 });
      if (wall <= nm) g.text(wall, yTop, `RW/(πτ) = ${fix(wall, 1)}`, P.magenta, { align: wall > nm * 0.75 ? 'right' : 'left', base: 'top', dx: wall > nm * 0.75 ? -7 : 7, dy: 6, size: 12 });
      else g.text(nm, yTop, L(`墙在 RW/(πτ) = ${fix(wall, 1)}，画面之外`, `the wall is at RW/(πτ) = ${fix(wall, 1)}, off the picture`), P.magenta, { align: 'right', base: 'top', dx: -6, dy: 6, size: 11.5, face: 'body' });
    }
  }

  /* ---------- the stage ---------- */
  const box = { top: 70, bottom: 44 };
  function drawStage() {
    const sr = $('stage').getBoundingClientRect(), below = (el) => el.getBoundingClientRect().bottom - sr.top;
    box.top = TRV.thumbMode ? 30 : Math.max(46, below($('hudBig').parentElement), below($('sceneChips'))) + 10; box.bottom = TRV.thumbMode ? 30 : Math.max(18, $('legend').offsetHeight + 20);
    if (S.scene === 'rates') drawRates(scaleL()); else if (S.scene === 'cut') drawCut(); else drawModes();
  }
  function drawPlots() {
    if (TRV.still || TRV.figure) return;
    const A = $('plotA'), B = $('plotB');
    if (S.scene === 'rates') {
      const g = kit.plot(A, { x: [0.3, 2], y: [0, 800], pad: [36, 12, 10, 20] }), pts = [];
      for (let i = 0; i <= 170; i++) { const c = 0.3 + i * 0.01, x = crossover(c); pts.push([c, x == null ? 0 : Math.min(x, 5000)]); }
      g.axes({ yTicks: [0, 266, 558, 800], xTicks: [0.5, 1, 1.5, 2], xLabel: 'c' }); g.rect(0.3, 0, 2, ATOMS, P.lineHot, { alpha: 0.14 });
      g.line(pts.map(([c, x]) => [c, Math.min(x, 800)]), P.cyan); g.vline(S.c, P.amber, { alpha: 0.8 }); const x = crossover(S.c); if (x != null && x <= 800) g.dot(S.c, x, P.amber, 4.5);
      $('pATitle').textContent = L('常数 c 决定交叉点', 'The constant c decides the crossover'); $('pAMeta').textContent = x == null ? L('没有交叉：处处更低', 'no crossover: lower everywhere') : `log₂ n ≈ ${fix(x, 0)}`;
      const h = kit.plot(B, { x: [2.5, 12.5], y: [0.3, 1.05], pad: [30, 12, 10, 20] }), asym = [];
      for (let i = 0; i <= 100; i++) { const kk = 3 + i * 0.095; asym.push([kk, ASYM(kk)]); }
      h.axes({ yTicks: [0.4, 0.6, 0.8, 1], xTicks: [3, 4, 5, 6, 8, 10, 12], xLabel: 'k' }); h.hline(1, P.dim, { dash: [2, 4] });
      h.line(asym, P.dim, { dash: [4, 3] });
      for (let kk = 3; kk <= 12; kk++) h.dot(kk, ppsz(kk), kk === S.k ? P.amber : P.magenta, kk === S.k ? 5 : 3, kk === S.k ? { glow: 8 } : undefined);
      $('pBTitle').textContent = L('子句越宽，PPSZ 的指数率越高', 'Wider clauses, a higher PPSZ rate'); $('pBMeta').textContent = L(`虚线 1 − π²/(6k)`, `dashed: 1 − π²/(6k)`);
    } else if (S.scene === 'cut') {
      // a logarithmic axis: 3·b·d can be some twenty times the other cuts, and the rank must stay readable beside it
      const I = fresh(), k = cuts(I.a, I.b, I.c, I.d), most = Math.max(k.rows, k.cols, k.bridges, k.bridgesBD), floor = 0.8, bar = (v) => Math.max(v, floor);
      const g = kit.plot(A, { x: [0, 5], y: [floor, most * 1.6], pad: [30, 12, 10, 20], logY: true });
      g.axes({ yTicks: [...new Set([1, k.full, most])].map((v) => [v, String(v)]), xTicks: [[0.5, 'a·d'], [1.5, 'b·c'], [2.5, '3·a·c'], [3.5, '3·b·d'], [4.5, L('秩', 'rank')]] });
      [[k.rows, 0], [k.cols, 1], [k.bridges, 2], [k.bridgesBD, 3]].forEach(([v, i]) => g.rect(i + 0.2, floor, i + 0.8, bar(v), v === k.full ? P.magenta : P.dim, { alpha: v === k.full ? 0.9 : 0.5 }));
      g.rect(4.2, floor, 4.8, bar(I.rank), P.cyan, { alpha: 0.95 }); g.hline(k.full, P.magenta, { dash: [4, 3], alpha: 0.8 });
      $('pATitle').textContent = L('四道割与这个实例的秩', 'Four cuts and the rank of this instance'); $('pAMeta').textContent = `min = ${k.full} · QMinCut = ${k.min}`;
      const h = kit.plot(B, { x: [0.9, 6.1], y: [0.9, 6.1], pad: [30, 12, 10, 20], equal: true }), phi2 = (3 + Math.sqrt(5)) / 2;
      h.axes({ xTicks: [1, 2, 3, 4, 5, 6], yTicks: [1, 2, 3, 4, 5, 6], xLabel: 'a', yLabel: 'b' });
      h.poly([[0.9, 0.9], [6.1, 6.1], [6.1 / phi2, 6.1], [0.9, 0.9 * phi2]], P.cyan, { alpha: 0.14 });
      for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) h.dot(a, b, a <= b && a * a + b * b <= 3 * a * b ? P.cyan : P.dim, 3);
      h.dot(I.a, I.b, P.amber, 5.5, { glow: 8 }); h.dot(I.c, I.d, P.amber, 5.5, { ring: true, width: 2 });
      $('pBTitle').textContent = L('锥域：a ≤ b ≤ φ²·a', 'The cone: a ≤ b ≤ φ²·a'); $('pBMeta').textContent = L('实心 (a, b)，空心 (c, d)', 'solid (a, b), ring (c, d)');
    } else {
      const T = total(), g = kit.plot(A, { x: [0.02, 1], y: [0.5, 2000], pad: [36, 12, 10, 20], logY: true, logX: true }), cn = [], bd = [];
      for (let i = 0; i <= 120; i++) { const th = 0.02 * Math.pow(50, i / 120); cn.push([th, Math.max(0.5, countAbove(th))]); bd.push([th, T / th]); }
      g.axes({ yTicks: [[1, '1'], [10, '10'], [100, '100'], [1000, '1000']], xTicks: [[0.02, '0.02'], [0.1, '0.1'], [1, '1']], xLabel: 'τ' });
      g.line(bd, P.magenta); g.line(cn, P.cyan); g.vline(theta(), P.amber, { alpha: 0.8 });
      g.legend([[P.cyan, L('不小于 τ 的个数', 'number of terms ≥ τ')], [P.magenta, L('上界 RW/(πτ)', 'the bound RW/(πτ)')]]);
      $('pATitle').textContent = L('个数永远在墙下', 'The count stays under the wall'); $('pAMeta').textContent = `RW/π = ${fix(T, 3)}`;
      const h = kit.plot(B, { x: [0, NM], y: [0, 1.05], pad: [30, 12, 10, 20] });
      h.axes({ yTicks: [0, 0.5, 1], xTicks: [0, 20, 40], xLabel: 'j' });
      for (const [name, col] of [['plateau', P.cyan], ['geometric', P.violet], ['power', P.sigma]]) { const pts = []; for (let j = 0; j < NM; j++) pts.push([j, SPEC[name](j)]); h.line(pts, name === S.prof ? P.cyan : P.dim, { width: name === S.prof ? 2.2 : 1.1 }); }
      $('pBTitle').textContent = L('三种谱', 'Three spectra'); $('pBMeta').textContent = L('亮的是当前这条', 'the bright one is current');
    }
  }

  /* ---------- words ---------- */
  const SC = {
    rates: { name: ['指数率', 'RATES'], max: () => LMAX, rate: 60, step: 50, start: 266 },
    cut: { name: ['桥图', 'BRIDGE'], max: () => 12, rate: 1.2, step: 1, start: 0 },
    modes: { name: ['模态', 'MODES'], max: () => 1, rate: 0.12, step: 0.05, start: 0.5 }
  };
  const LEGEND = {
    rates: [['cy', '示意曲线 r(n)', 'the schematic curve r(n)'], ['mg', 'PPSZ 基准', 'the PPSZ baseline'], ['am', '当前规模', 'the current scale'], ['dm box', '宇宙原子数以内', 'within the atoms of the universe']],
    cut: [['mg', '最小的那道割', 'the smallest cut'], ['cy box', '流矩阵的正项与非零奇异值', 'positive entries of flow, nonzero singular values'], ['ik box', '灰色：负项 · 白线：秩的位置', 'grey: negative entries · white line: where the rank ends']],
    modes: [['cy box', '不小于 τ 的模态', 'modes that reach τ'], ['am', '阈值 τ', 'the threshold τ'], ['mg', '墙：RW/(πτ)', 'the wall: RW/(πτ)'], ['dm box', '低于 τ 的模态', 'modes below τ']]
  };
  function drawText() {
    const set = (i, lab, val) => { $(`roL${i}`).textContent = lab; $(`ro${i}`).innerHTML = val; };
    let big, hud, what, key, note;
    if (S.scene === 'rates') {
      const l = scaleL(), r = rate(S.c, l), p = PPSZ(), pp = fix(p, 3), x = crossover(S.c), wins = r < p;
      big = L(`指数率 · n = 2${sup(Math.round(l))}`, `Exponent rate · n = 2${sup(Math.round(l))}`);
      hud = L(`示意曲线 ${fix(r, 3)}，${S.k}-SAT 的 PPSZ ${pp}：这个规模上${wins ? '示意曲线更低' : 'PPSZ 更低'}`, `schematic curve ${fix(r, 3)}, PPSZ for ${S.k}-SAT ${pp}: at this scale ${wins ? 'the schematic curve is lower' : 'PPSZ is lower'}`);
      $('roKeyL').textContent = L('这个规模上示意曲线的指数率', 'rate of the schematic curve at this scale'); $('roKey').innerHTML = `<span class="${wins ? 'c-cy' : 'c-am'}">${fix(r, 3)}</span>`; $('roKeySub').textContent = L(`是 PPSZ 的 ${fix(r / p, 2)} 倍`, `${fix(r / p, 2)} times that of PPSZ`);
      set(1, 'log₂ n', fix(l, 0)); set(2, L(`${S.k}-SAT 的 PPSZ 指数率`, `PPSZ rate for ${S.k}-SAT`), fix(p, 4));
      set(3, L('交叉点 log₂ n', 'crossover log₂ n'), x == null ? L('无：处处更低', 'none: lower everywhere') : fix(x, 0)); set(4, L('交叉点与 2²⁶⁶ 相比', 'crossover against 2²⁶⁶'), x == null ? '—' : x > ATOMS ? L('在视界之外', 'beyond the horizon') : L('在视界之内', 'inside the horizon'));
      note = L('曲线趋于零，所以渐近地它一定更好；但“渐近”从哪里开始，由常数 c 决定。', 'The curve tends to zero, so asymptotically it must be better; but where “asymptotically” begins is decided by the constant c.');
      what = `k = ${S.k} · log₂ n = ${fix(l, 0)}`; key = `r = ${fix(r, 3)}`;
    } else if (S.scene === 'cut') {
      const I = fresh(), k = cuts(I.a, I.b, I.c, I.d), cone = inCone(I.a, I.b, I.c, I.d);
      big = L(`桥图 (${I.a}, ${I.b}, ${I.c}, ${I.d}) · 第 ${I.seed} 次抽样`, `Bridge (${I.a}, ${I.b}, ${I.c}, ${I.d}) · draw ${I.seed}`);
      hud = L(`这个实例的秩 ${I.rank}，最小割 ${k.full}：${I.rank === k.full ? '相等' : '秩更小'}`, `rank of this instance ${I.rank}, minimal cut ${k.full}: ${I.rank === k.full ? 'equal' : 'the rank is smaller'}`);
      // the page compares this instance's rank with the frozen bound QMinCut (QMaxFlow ≤ QMinCut) itself: a neutral mark, the
      // green ✓ stays in the LEAN ✓ box; the fourth cut is shown beside it, not under the mark
      $('roKeyL').textContent = L('这个随机实例的秩', 'rank of this random instance'); $('roKey').innerHTML = `<span class="c-cy">${I.rank}</span> <span class="nummark">${I.rank <= k.min ? `≤ ${k.min} ✓` : '✗'}</span>`; $('roKeySub').textContent = L(`Lean 的 QMinCut = min(3ac, ad, bc) = ${k.min}；四道割最小 ${k.full}`, `Lean's QMinCut = min(3ac, ad, bc) = ${k.min}; smallest of the four cuts ${k.full}`);
      set(1, L('行数 a·d', 'rows a·d'), String(k.rows)); set(2, L('列数 b·c', 'columns b·c'), String(k.cols)); set(3, L('穿桥的割 3·a·c、3·b·d', 'cuts through the bridges, 3·a·c and 3·b·d'), L(`${k.bridges}、${k.bridgesBD}`, `${k.bridges}, ${k.bridgesBD}`));
      set(4, L('在定理的锥域内？', 'inside the cone of the theorem?'), cone ? L('是', 'yes') : L('否', 'no'));
      // the theorem is about the greatest attainable rank; the draw on the stage is one instance and may fall short
      note = cone ? L(`四个维数在锥域内：Lean 定理说能达到的最大秩恰好是 min(a·d, b·c) = ${k.min}；这一次抽样的秩是 ${I.rank}${I.rank < k.min ? '，没有达到它' : '，达到了它'}。`, `The four dimensions lie in the cone: the Lean theorem says the greatest attainable rank is exactly min(a·d, b·c) = ${k.min}; this draw has rank ${I.rank}${I.rank < k.min ? ', short of it' : ', reaching it'}.`)
        : L(`四个维数不在锥域内：Lean 只保证秩不超过 QMinCut = min(3ac, ad, bc) = ${k.min}${k.full < k.min ? `；整张图的最小割是第四道 3bd = ${k.full}（初等的矩阵分解，不在冻结定理里）` : ''}；这一次抽样的秩是 ${I.rank}${I.rank === k.full ? '，等于最小割，等号只是对这个实例的观察' : '，比最小割低'}。`, `The four dimensions lie outside the cone: Lean only guarantees that the rank does not exceed QMinCut = min(3ac, ad, bc) = ${k.min}${k.full < k.min ? `; the minimal cut of the whole graph is the fourth, 3bd = ${k.full} (an elementary matrix factorization, not in the frozen theorem)` : ''}; this draw has rank ${I.rank}${I.rank === k.full ? ', equal to the minimal cut, and the equality is an observation on this instance only' : ', below the minimal cut'}.`);
      what = `(${[I.a, I.b, I.c, I.d].join(', ')})`; key = L(`秩 ${I.rank}`, `RANK ${I.rank}`);
    } else {
      const th = theta(), T = total(), n = countAbove(th);
      big = L(`模态 · τ = ${fmtTau(th)}`, `Modes · τ = ${fmtTau(th)}`);
      hud = L(`不小于 τ 的模态有 ${n} 个，上界 RW/(πτ) = ${fix(T / th, 1)}`, `${n} mode${n === 1 ? '' : 's'} reach τ; the bound is RW/(πτ) = ${fix(T / th, 1)}`);
      $('roKeyL').textContent = L('不小于 τ 的模态个数', 'number of modes that reach τ'); $('roKey').innerHTML = `<span class="c-cy">${n}</span> ${n <= T / th ? `≤ ${fix(T / th, 1)}` : '&gt;'}`; $('roKeySub').textContent = L('否则它们的和就超过 RW/π', 'or their sum would exceed RW/π');
      set(1, L('阈值 τ', 'threshold τ'), fix(th, 3)); set(2, L('墙 RW/(πτ)', 'the wall RW/(πτ)'), fix(T / th, 2)); set(3, L('总和 RW/π = Σλⱼ', 'total RW/π = Σλⱼ'), fix(T, 4)); set(4, L('个数 × τ', 'count × τ'), `${fix(n * th, 3)} ${n * th <= T ? '≤' : '&gt;'} RW/π`);
      note = L('这是马尔可夫不等式的计数形式：谱越集中，承重的模态越少。', 'This is the counting form of Markov’s inequality: the more concentrated the spectrum, the fewer modes carry the weight.');
      what = `τ = ${fmtTau(th)}`; key = `${n} ≤ ${fix(T / th, 1)}`;
    }
    $('hudBig').textContent = big; $('hudSub').textContent = hud; $('roNote').textContent = note; $('roAside').textContent = L(SC[S.scene].name[0], SC[S.scene].name[1]);
    $('pillScene').querySelector('strong').textContent = SC[S.scene].name[1]; $('pillWhat').querySelector('strong').textContent = what; $('pillKey').querySelector('strong').textContent = key;
    const leg = LEGEND[S.scene].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== leg) { $('legend').innerHTML = leg; $('legend')._h = leg; }
  }
  const paint = kit.painter(() => { drawText(); TRV.hudFit(); drawStage(); drawPlots(); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: LMAX, rate: 60, step: 50, t: 266,
    format: (t) => (S.scene === 'rates' ? `log₂ n ${clamp(t, 2, LMAX).toFixed(0)} <small>/ ${LMAX}</small>` : S.scene === 'cut' ? `${L('抽样 ', 'DRAW ')}${Math.floor(t + 1e-9)} <small>/ 12</small>` : `τ ${fixTau(clamp(1 - 0.98 * t, 0.02, 1))} <small>/ 0.02</small>`),
    onChange: () => paint()
  });
  function fitClock(t) { const sc = SC[S.scene]; clock.pause(); clock.rate = sc.rate; clock.step = sc.step; clock.setMax(sc.max(), true); clock.set(t == null ? sc.start : t); }
  function setScene(sc, t) {
    S.scene = sc; sceneChips.set(sc, true);
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    fitClock(t);
  }
  const leave = () => cards.mark(null);
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  const fC = kit.field($('cc'), { fmt: (v) => fix(v, 2), onInput: (v) => { S.c = v; leave(); paint(); } });
  const dimFields = ['da', 'db', 'dc', 'dd'].map((id, i) => kit.field($(id), { out: $('o' + id.toUpperCase()), onInput: (v) => { S.dims[i] = v; leave(); paint(); } }));
  const profChips = kit.chips($('profChips'), 'prof', (v) => { S.prof = v; leave(); paint(); });
  const kChips = kit.chips($('kChips'), 'k', (v) => { S.k = Number(v); leave(); paint(); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('rates'); }, 2: () => { leave(); setScene('cut'); }, 3: () => { leave(); setScene('modes'); } });
  // drag the threshold on the stage
  let dragging = false;
  const toTheta = (ev) => { if (S.scene !== 'modes' || !view) return; const b = $('cv').getBoundingClientRect(), th = clamp(view.invY(ev.clientY - b.top), 0.02, 1); leave(); clock.pause(); clock.set((1 - th) / 0.98); };
  $('cv').addEventListener('pointerdown', (ev) => { if (S.scene !== 'modes') return; dragging = true; try { $('cv').setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events */ } toTheta(ev); });
  $('cv').addEventListener('pointermove', (ev) => { if (dragging) toTheta(ev); });
  for (const type of ['pointerup', 'pointercancel']) $('cv').addEventListener(type, () => { dragging = false; });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    human: { scene: 'rates', c: 1, k: 3, at: 16 }, atoms: { scene: 'rates', c: 1, k: 3, at: 266 }, cross: { scene: 'rates', c: 1, k: 3, play: true, from: 2, still: 558 }, constant: { scene: 'rates', c: 0.5, k: 3, at: 57 },
    bridge: { scene: 'cut', dims: [2, 3, 2, 3], at: 0 }, narrow: { scene: 'cut', dims: [1, 5, 1, 5], at: 0 },
    geometric: { scene: 'modes', prof: 'geometric', at: (1 - 1 / 8) / 0.98 }
  };
  const NOTES = {
    human: ['n = 2¹⁶，六万多个变量：c = 1 的示意曲线在这里才降回 1，也就是每个变量付出的指数与穷举相同。PPSZ 是 0.386。', 'n = 2¹⁶, some sixty-five thousand variables: for c = 1 the schematic curve is only back at 1 here, the same exponent per variable as brute force. PPSZ pays 0.386.'],
    atoms: ['n = 2²⁶⁶，可观测宇宙的原子数：示意曲线是 0.494，仍高于 0.386。阴影以内的任何规模上，它都还没有赢。', 'n = 2²⁶⁶, the number of atoms in the observable universe: the schematic curve stands at 0.494, still above 0.386. At no scale inside the shaded part has it won yet.'],
    cross: ['让规模一路增大：曲线缓缓下降，直到 n ≈ 2⁵⁵⁸ 才与 0.386 相交，远在阴影之外。', 'Let the scale grow: the curve sinks slowly and meets 0.386 only at n ≈ 2⁵⁵⁸, far outside the shaded part.'],
    constant: ['把常数 c 减半：交叉点从 2⁵⁵⁸ 回到 2⁵⁷ 附近，落进阴影里。大 O 记号不告诉我们 c；交叉点在视界的哪一边，全看它。', 'Halve the constant c: the crossover moves from 2⁵⁵⁸ back to about 2⁵⁷, inside the shaded part. The big O does not tell us c, and on which side of the horizon the crossover lies depends on it alone.'],
    bridge: ['a = c = 2、b = d = 3：两道外割都是 6，三条桥能过 12，不是瓶颈。第 0 次抽样的流矩阵有 6 行 6 列，秩是 6，达到了最小割；Lean 证明在这个锥域内能达到的最大秩恰好是最小割，个别抽样仍可能更低。这条定理只讲桥图上的流与割，与第 30 章转述的亚指数 3-SAT 预印本的算法主张无关，既不检验也不支持它。', 'a = c = 2, b = d = 3: both outer cuts are 6 and the three bridges could carry 12, so they are no bottleneck. The flow matrix of draw 0 has 6 rows and 6 columns and rank 6, reaching the minimal cut; Lean proves that inside the cone the greatest attainable rank is exactly the minimal cut, though a single draw can still fall lower. The theorem is about flows and cuts on the bridge graph only: it has nothing to do with the algorithmic claim of the sub-exponential 3-SAT preprint that chapter 30 reports, and neither tests nor supports it.'],
    narrow: ['a = c = 1、b = d = 5：外割都是 5，三条桥却只能过 3。流矩阵是 5 × 5 的，秩至多是 3；第 0 次抽样恰好是 3：奇异值在第三个之后归零。这组维数在锥域之外。', 'a = c = 1, b = d = 5: the outer cuts are 5 but the three bridges carry only 3. The flow matrix is 5 × 5 and its rank is at most 3; draw 0 has exactly 3: the singular values vanish after the third. These dimensions lie outside the cone.'],
    geometric: ['第十二章例题第 5 步的几何谱 λⱼ = 2^−(j+1)，总和 RW/π = 1。琥珀色的阈值 τ = 1/8：过线的青色柱子是 j = 0、1、2 三根，每根在高度 τ 处有一道琥珀色刻线，表示它至少付出 τ；三道刻线加起来不超过总预算 1，所以过线的柱子不会超过品红的墙 RW/(πτ) = 8。', 'The geometric spectrum λⱼ = 2^−(j+1) of chapter 12, example step 5, with total RW/π = 1. At the amber threshold τ = 1/8 three cyan bars clear the line, j = 0, 1, 2, each with an amber notch at the height τ to show that it pays at least τ; the notches add up to no more than the whole budget 1, so the bars that clear the line cannot pass the magenta wall RW/(πτ) = 8.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    if (p.c != null) { S.c = p.c; fC.set(p.c); }
    if (p.k != null) { S.k = p.k; kChips.set(p.k, true); }
    if (p.dims) { S.dims = p.dims.slice(); dimFields.forEach((f, i) => f.set(p.dims[i])); }
    if (p.prof) { S.prof = p.prof; profChips.set(p.prof, true); }
    setScene(p.scene, p.at);
    // a still (cover, cited figure shot) and the opening view of the full page show the card's telling frame;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed)) { if (p.still != null) clock.set(p.still === 'end' ? clock.max : p.still); return; }
    if (!p.play) return;
    clock.set(p.from || 0);
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  // Cited figures use a single sentence; the full laboratory keeps the detailed card notes.
  const FIGURE_NOTES = {
    "human": ["c = 1、n = 2¹⁶：示意曲线才降到穷举指数 1，PPSZ 指数为 0.386。", "At c = 1 and n = 2¹⁶, the schematic exponent only reaches brute force’s 1; PPSZ pays 0.386."],
    "atoms": ["n = 2²⁶⁶ 时示意指数约 0.494，仍高于 PPSZ 的 0.386。", "At n = 2²⁶⁶, the schematic exponent is still 0.494, above PPSZ’s 0.386."],
    "cross": ["c = 1 时示意曲线直到 n ≈ 2⁵⁵⁸ 才与 0.386 相交。", "For c = 1, the schematic curve meets 0.386 only at n ≈ 2⁵⁵⁸."],
    "constant": ["c 减半，示意交叉点从 2⁵⁵⁸ 移至约 2⁵⁷；大 O 不决定这个常数。", "Halving c moves the schematic crossover from 2⁵⁵⁸ to about 2⁵⁷; big O does not fix c."],
    "bridge": ["桥图锥域内最大秩等于最小割 6；单次抽样可更低，此定理不支持 3-SAT 算法主张。", "In the bridge-graph cone, maximum rank equals min-cut 6; samples may be lower, and this gives no 3-SAT algorithm."],
    "narrow": ["外割为 5，三桥只容 3：5 × 5 流矩阵的秩至多为 3，这组维数在锥域外。", "Outer cuts are 5, but bridges carry only 3: the 5 × 5 flow matrix has rank at most 3, outside the cone."],
    "geometric": ["λⱼ = 2^−(j+1)、τ = 1/8：三根柱过线，总预算 1 给出柱数上界 8。", "For λⱼ = 2^−(j+1) and τ = 1/8, three bars clear the line; budget 1 bounds their count by 8."],
  };
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景、调常数、换子句宽度 k、改维数、拖阈值。随时可以再选一张卡。', 'Free play: switch scenes, change the constant or the clause width k, change the dimensions, drag the threshold. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  window.HORIZON_DEBUG = {
    get state() {
      const I = fresh(), k = cuts(I.a, I.b, I.c, I.d), th = theta(), T = total();
      return { scene: S.scene, t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current, c: S.c, l: scaleL(), rate: rate(S.c, scaleL()), crossover: crossover(S.c), k: S.k, ppsz: PPSZ(), atoms: ATOMS,
        dims: [I.a, I.b, I.c, I.d], seed: I.seed, rank: I.rank, cuts: k, cone: inCone(I.a, I.b, I.c, I.d), sv: I.sv.slice(), flow: I.F.map((r) => r.slice()), M: I.M, N: I.N,
        prof: S.prof, theta: th, total: T, count: countAbove(th), wall: T / th };
    },
    /** The bridge diagram as last drawn, in CSS pixels of the stage canvas: tensors (centre, radius r), legs, bridges and cuts
        (null when the last frame of the bridge had no room for it). */
    get geometry() { return cutGeo && JSON.parse(JSON.stringify(cutGeo)); },
    seek: (t) => { clock.pause(); clock.set(t); }, rate: (c, l) => rate(c, l), crossoverOf: (c) => crossover(c), ppszOf: (k) => ppsz(k), lambda: (prof, j) => SPEC[prof](j),
    at: (j, v) => { const b = $('cv').getBoundingClientRect(); return [b.left + view.X(j), b.top + view.Y(v)]; }
  };
  window.TRV_THUMB = () => { S.c = 1; fC.set(1); S.k = 3; kChips.set(3, true); setScene('rates', 266); paint.now(); };
  cards.pick(cards.initial('atoms'));
  booting = false;
  paint();
})();
