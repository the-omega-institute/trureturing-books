/* ORTHO//HORIZON: the ETH section of chapter 30, in three scenes.
   rates  the schematic exponent rate r(n) = c·log₂log₂n/√log₂n against the constant rate of PPSZ for k-SAT
          (k = 3 … 6; 0.386 for k = 3), over log₂ n from 2 to 800, with the scale of the observable universe (2^266) shaded
   cut    the bridge graph of width three: flow = Σ_r M_r ⊗ N_r with M_r of size a×b and N_r of size d×c; its three
          cuts a·d, b·c and 3·a·c, the exact rank of a random integer instance and its singular values
   modes  a nonnegative spectrum of total T: at most T/θ of its terms reach the threshold θ
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
  let inst = null;
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
  const cuts = (a, b, c, d) => ({ rows: a * d, cols: b * c, bridges: 3 * a * c, min: Math.min(3 * a * c, a * d, b * c) });
  const inCone = (a, b, c, d) => a > 0 && a <= b && c > 0 && c <= d && a * a + b * b <= 3 * a * b && c * c + d * d <= 3 * c * d;
  const draw = () => Math.floor(clock.t + 1e-9);
  function fresh() { const [a, b, c, d] = S.dims, seed = draw(); if (!inst || inst.a !== a || inst.b !== b || inst.c !== c || inst.d !== d || inst.seed !== seed) inst = instance(a, b, c, d, seed); return inst; }
  function drawCut() {
    const g = kit.plot($('cv'), { x: [0, 1], y: [0, 1], pad: [0, 0, 0, 0] }), ctx = g.ctx, W = g.W, H = g.H, I = fresh(), k = cuts(I.a, I.b, I.c, I.d), words = !TRV.thumbMode;
    const x0 = 18, y0 = box.top, w = W - 36, h = H - box.top - box.bottom, wide = w > 560, dw = wide ? w * 0.44 : w, dh = wide ? h : h * 0.42;
    // the diagram: two nodes, three bridges, four outer legs; the three cuts as dashed lines
    const mx = x0 + dw * 0.3, nx = x0 + dw * 0.7, cy = y0 + dh * 0.5, r = Math.min(38, dh * 0.13, dw * 0.085);
    const leg = (xa, ya, xb, yb, col, wd) => { ctx.strokeStyle = col; ctx.lineWidth = wd; ctx.beginPath(); ctx.moveTo(xa, ya); ctx.lineTo(xb, yb); ctx.stroke(); };
    for (const dy of [-r * 0.55, 0, r * 0.55]) leg(mx + r, cy + dy, nx - r, cy + dy, P.ink, 1.6);
    leg(mx - r * 0.7, cy - r * 0.7, mx - r * 2.2, cy - r * 2.4, P.ink, 1.6); leg(mx - r * 0.7, cy + r * 0.7, mx - r * 2.2, cy + r * 2.4, P.ink, 1.6);
    leg(nx + r * 0.7, cy - r * 0.7, nx + r * 2.2, cy - r * 2.4, P.ink, 1.6); leg(nx + r * 0.7, cy + r * 0.7, nx + r * 2.2, cy + r * 2.4, P.ink, 1.6);
    for (const [x, lab] of [[mx, 'M'], [nx, 'N']]) { ctx.fillStyle = P.stage; ctx.strokeStyle = P.cyan; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, cy, r, 0, kit.TAU); ctx.fill(); ctx.stroke(); text(ctx, lab, x, cy + 1, P.ink, { align: 'center', size: 14, weight: 600 }); }
    text(ctx, `a = ${I.a}`, mx - r * 2.3, cy - r * 2.8, P.ink, { align: 'center', size: 12 }); text(ctx, `b = ${I.b}`, mx - r * 2.3, cy + r * 2.8, P.ink, { align: 'center', size: 12 });
    text(ctx, `d = ${I.d}`, nx + r * 2.3, cy - r * 2.8, P.ink, { align: 'center', size: 12 }); text(ctx, `c = ${I.c}`, nx + r * 2.3, cy + r * 2.8, P.ink, { align: 'center', size: 12 });
    const cutLine = (pts, val, lab, lx, ly, al) => {
      const hot = val === k.min; ctx.strokeStyle = hot ? P.amber : P.dim; ctx.lineWidth = hot ? 2.2 : 1.2; ctx.setLineDash([5, 4]); if (hot) { ctx.shadowColor = P.amber; ctx.shadowBlur = 8; }
      ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.setLineDash([]); ctx.shadowBlur = 0;
      text(ctx, lab, lx, ly, hot ? P.amber : P.dim, { align: al, size: 12, weight: hot ? 600 : 0, halo: true });
    };
    cutLine([[mx - r * 2.7, cy - r * 1.9], [(mx + nx) / 2, cy - r * 2.9], [nx + r * 2.7, cy - r * 1.9]], k.rows, `a·d = ${k.rows}`, (mx + nx) / 2, cy - r * 3.5, 'center');
    cutLine([[mx - r * 2.7, cy + r * 1.9], [(mx + nx) / 2, cy + r * 2.9], [nx + r * 2.7, cy + r * 1.9]], k.cols, `b·c = ${k.cols}`, (mx + nx) / 2, cy + r * 3.5, 'center');
    cutLine([[(mx + nx) / 2, cy - r * 1.5], [(mx + nx) / 2, cy + r * 1.5]], k.bridges, `3·a·c = ${k.bridges}`, (mx + nx) / 2 + 6, cy - r * 1.9, 'center');
    // the flow matrix and its singular values
    const gx = wide ? x0 + dw + 14 : x0, gy = wide ? y0 + 16 : y0 + dh + 14, gw = wide ? w - dw - 14 : w, gh = (wide ? h : h - dh) - 16 - 54;
    const rows = I.F.length, cols = I.F[0].length, cell = Math.max(3, Math.min(gw / cols, gh / rows, 46)), ox = gx + (gw - cell * cols) / 2, oy = gy + Math.max(0, (gh - cell * rows) / 2);
    let top = 1; for (const row of I.F) for (const v of row) top = Math.max(top, Math.abs(v));
    for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) { const v = I.F[i][j]; ctx.fillStyle = v ? TRV.alpha(v > 0 ? P.cyan : P.magenta, 0.2 + 0.8 * Math.abs(v) / top) : TRV.alpha(P.lineHot, 0.25); ctx.fillRect(ox + j * cell, oy + i * cell, cell - Math.max(1, cell * 0.08), cell - Math.max(1, cell * 0.08)); }
    if (words) text(ctx, L(`flow：${rows} 行 × ${cols} 列`, `flow: ${rows} rows × ${cols} columns`), ox, oy - 9, P.dim, { size: 11, face: 'body' });
    const n = I.sv.length, by = oy + cell * rows + 46, bw = Math.min(26, (cell * cols) / n), smax = I.sv[0] || 1;
    for (let i = 0; i < n; i++) { const hh = 34 * I.sv[i] / smax, on = i < I.rank; ctx.fillStyle = on ? P.cyan : P.faint; ctx.fillRect(ox + i * bw, by - Math.max(hh, 1.5), Math.max(2, bw - 3), Math.max(hh, 1.5)); }
    ctx.strokeStyle = P.amber; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ox + I.rank * bw - 1.5, by - 40); ctx.lineTo(ox + I.rank * bw - 1.5, by + 3); ctx.stroke();
    if (words) text(ctx, L(`奇异值：前 ${I.rank} 个非零`, `singular values: the first ${I.rank} are nonzero`), ox + n * bw + 8, by - 14, P.dim, { size: 11, face: 'body' });
  }

  /* ---------- modes ---------- */
  const NM = 40;
  const SPEC = {
    plateau: (j) => 1 / (1 + Math.exp((j - 7.5) / 0.55)),
    geometric: (j) => Math.pow(0.82, j),
    power: (j) => 1 / ((1 + j * 0.5) * (1 + j * 0.5))
  };
  const lam = (j) => SPEC[S.prof](j);
  /** The total of the spectrum over the indices the page draws and beyond (the tails are summed far enough to converge). */
  const totals = {};
  const total = () => { if (totals[S.prof] == null) { let s = 0; for (let j = 0; j < 200000; j++) s += lam(j); totals[S.prof] = s; } return totals[S.prof]; };
  const theta = () => clamp(1 - 0.98 * clock.t, 0.02, 1);
  const countAbove = (th) => { let n = 0; while (n < 200000 && lam(n) >= th) n++; return n; };   // the three spectra decrease
  let view = null;
  function drawModes() {
    const th = theta(), T = total(), wall = T / th, g = kit.plot($('cv'), { x: [0, NM], y: [0, 1.1], pad: [44, 24, box.top + 4, box.bottom + 24] }); view = g;
    g.axes({ yTicks: [0, 0.25, 0.5, 0.75, 1], xTicks: [0, 10, 20, 30, 40], xLabel: L('模态序号 j', 'mode index j'), yLabel: 'λⱼ' });
    for (let j = 0; j < NM; j++) { const v = lam(j), on = v >= th; g.rect(j + 0.12, 0, j + 0.88, v, on ? P.cyan : P.dim, { alpha: on ? 0.95 : 0.5 }); }
    g.hline(th, P.amber, { width: 2, glow: 8 });
    if (wall <= NM) { g.vline(wall, P.magenta, { width: 2.4 }); }
    if (!TRV.thumbMode) {
      g.text(NM, th, `θ = ${fix(th, 2)}`, P.amber, { align: 'right', base: 'bottom', dx: -6, dy: -5, size: 12, weight: 600 });
      if (wall <= NM) g.text(wall, 1.1, `T/θ = ${fix(wall, 1)}`, P.magenta, { align: wall > 32 ? 'right' : 'left', base: 'top', dx: wall > 32 ? -7 : 7, dy: 6, size: 12 });
      else g.text(NM, 1.1, L(`墙在 T/θ = ${fix(wall, 1)}，画面之外`, `the wall is at T/θ = ${fix(wall, 1)}, off the picture`), P.magenta, { align: 'right', base: 'top', dx: -6, dy: 6, size: 11.5, face: 'body' });
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
      const I = fresh(), k = cuts(I.a, I.b, I.c, I.d), g = kit.plot(A, { x: [0, 4], y: [0, Math.max(k.rows, k.cols, k.bridges) * 1.2], pad: [30, 12, 10, 20] });
      g.axes({ yTicks: [0, k.min], xTicks: [[0.5, 'a·d'], [1.5, 'b·c'], [2.5, '3·a·c'], [3.5, L('秩', 'rank')]] });
      [[k.rows, 0], [k.cols, 1], [k.bridges, 2]].forEach(([v, i]) => g.rect(i + 0.2, 0, i + 0.8, v, v === k.min ? P.amber : P.dim, { alpha: v === k.min ? 0.9 : 0.5 }));
      g.rect(3.2, 0, 3.8, I.rank, P.cyan, { alpha: 0.95 }); g.hline(k.min, P.amber, { dash: [4, 3], alpha: 0.8 });
      $('pATitle').textContent = L('三道割与这个实例的秩', 'Three cuts and the rank of this instance'); $('pAMeta').textContent = `min = ${k.min}`;
      const h = kit.plot(B, { x: [0.9, 6.1], y: [0.9, 6.1], pad: [30, 12, 10, 20], equal: true }), phi2 = (3 + Math.sqrt(5)) / 2;
      h.axes({ xTicks: [1, 2, 3, 4, 5, 6], yTicks: [1, 2, 3, 4, 5, 6], xLabel: 'a', yLabel: 'b' });
      h.poly([[0.9, 0.9], [6.1, 6.1], [6.1 / phi2, 6.1], [0.9, 0.9 * phi2]], P.cyan, { alpha: 0.14 });
      for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) h.dot(a, b, a <= b && a * a + b * b <= 3 * a * b ? P.cyan : P.dim, 3);
      h.dot(I.a, I.b, P.amber, 5.5, { glow: 8 }); h.dot(I.c, I.d, P.amber, 5.5, { ring: true, width: 2 });
      $('pBTitle').textContent = L('锥域：a ≤ b ≤ φ²·a', 'The cone: a ≤ b ≤ φ²·a'); $('pBMeta').textContent = L('实心 (a, b)，空心 (c, d)', 'solid (a, b), ring (c, d)');
    } else {
      const T = total(), g = kit.plot(A, { x: [0.02, 1], y: [0.5, 2000], pad: [36, 12, 10, 20], logY: true, logX: true }), cn = [], bd = [];
      for (let i = 0; i <= 120; i++) { const th = 0.02 * Math.pow(50, i / 120); cn.push([th, Math.max(0.5, countAbove(th))]); bd.push([th, T / th]); }
      g.axes({ yTicks: [[1, '1'], [10, '10'], [100, '100'], [1000, '1000']], xTicks: [[0.02, '0.02'], [0.1, '0.1'], [1, '1']], xLabel: 'θ' });
      g.line(bd, P.magenta); g.line(cn, P.cyan); g.vline(theta(), P.amber, { alpha: 0.8 });
      g.legend([[P.cyan, L('不小于 θ 的个数', 'number of terms ≥ θ')], [P.magenta, L('上界 T/θ', 'the bound T/θ')]]);
      $('pATitle').textContent = L('个数永远在墙下', 'The count stays under the wall'); $('pAMeta').textContent = `T = ${fix(T, 3)}`;
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
    cut: [['am', '最小的那道割', 'the smallest cut'], ['cy box', '流矩阵的正项与非零奇异值', 'positive entries of flow, nonzero singular values'], ['mg box', '负项', 'negative entries']],
    modes: [['cy box', '不小于 θ 的模态', 'modes that reach θ'], ['am', '阈值 θ', 'the threshold θ'], ['mg', '墙：T/θ', 'the wall: T/θ'], ['dm box', '低于 θ 的模态', 'modes below θ']]
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
      hud = L(`这个实例的秩 ${I.rank}，最小割 ${k.min}：${I.rank === k.min ? '相等' : '秩更小'}`, `rank of this instance ${I.rank}, minimal cut ${k.min}: ${I.rank === k.min ? 'equal' : 'the rank is smaller'}`);
      $('roKeyL').textContent = L('这个随机实例的秩', 'rank of this random instance'); $('roKey').innerHTML = `<span class="c-cy">${I.rank}</span> <span class="okmark">${I.rank <= k.min ? `≤ ${k.min} ✓` : '✗'}</span>`; $('roKeySub').textContent = L(`最小割 min(3ac, ad, bc) = ${k.min}`, `minimal cut min(3ac, ad, bc) = ${k.min}`);
      set(1, L('行数 a·d', 'rows a·d'), String(k.rows)); set(2, L('列数 b·c', 'columns b·c'), String(k.cols)); set(3, L('三条桥 3·a·c', 'three bridges 3·a·c'), String(k.bridges));
      set(4, L('在定理的锥域内？', 'inside the cone of the theorem?'), cone ? `${L('是', 'yes')} <span class="okmark">✓</span>` : L('否', 'no'));
      note = cone ? L('四个维数在锥域内：Lean 定理说最大秩恰好是 min(a·d, b·c)。', 'The four dimensions lie in the cone: the Lean theorem says the greatest rank is exactly min(a·d, b·c).') : L('四个维数不在锥域内：Lean 只保证秩不超过最小割，等号是这个实例的观察。', 'The four dimensions lie outside the cone: Lean only guarantees that the rank does not exceed the minimal cut; equality is an observation on this instance.');
      what = `(${[I.a, I.b, I.c, I.d].join(', ')})`; key = L(`秩 ${I.rank}`, `RANK ${I.rank}`);
    } else {
      const th = theta(), T = total(), n = countAbove(th);
      big = L(`模态 · θ = ${fix(th, 2)}`, `Modes · θ = ${fix(th, 2)}`);
      hud = L(`不小于 θ 的模态有 ${n} 个，上界 T/θ = ${fix(T / th, 1)}`, `${n} mode${n === 1 ? '' : 's'} reach θ; the bound is T/θ = ${fix(T / th, 1)}`);
      $('roKeyL').textContent = L('不小于 θ 的模态个数', 'number of modes that reach θ'); $('roKey').innerHTML = `<span class="c-cy">${n}</span> <span class="okmark">${n <= T / th ? `≤ ${fix(T / th, 1)} ✓` : '✗'}</span>`; $('roKeySub').textContent = L('否则它们的和就超过 T', 'or their sum would exceed T');
      set(1, L('阈值 θ', 'threshold θ'), fix(th, 3)); set(2, L('墙 T/θ', 'the wall T/θ'), fix(T / th, 2)); set(3, L('总和 T = Σλⱼ', 'total T = Σλⱼ'), fix(T, 4)); set(4, L('个数 × θ', 'count × θ'), `${fix(n * th, 3)} <span class="okmark">≤ T ✓</span>`);
      note = L('这是马尔可夫不等式的计数形式：谱越集中，承重的模态越少。', 'This is the counting form of Markov’s inequality: the more concentrated the spectrum, the fewer modes carry the weight.');
      what = `θ = ${fix(th, 2)}`; key = `${n} ≤ ${fix(T / th, 1)}`;
    }
    $('hudBig').textContent = big; $('hudSub').textContent = hud; $('roNote').textContent = note; $('roAside').textContent = L(SC[S.scene].name[0], SC[S.scene].name[1]);
    $('pillScene').querySelector('strong').textContent = SC[S.scene].name[1]; $('pillWhat').querySelector('strong').textContent = what; $('pillKey').querySelector('strong').textContent = key;
    const leg = LEGEND[S.scene].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== leg) { $('legend').innerHTML = leg; $('legend')._h = leg; }
  }
  const paint = kit.painter(() => { drawText(); drawStage(); drawPlots(); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: LMAX, rate: 60, step: 50, t: 266,
    format: (t) => (S.scene === 'rates' ? `log₂ n ${clamp(t, 2, LMAX).toFixed(0)} <small>/ ${LMAX}</small>` : S.scene === 'cut' ? `${L('抽样 ', 'DRAW ')}${Math.floor(t + 1e-9)} <small>/ 12</small>` : `θ ${clamp(1 - 0.98 * t, 0.02, 1).toFixed(2)} <small>/ 0.02</small>`),
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
    human: { scene: 'rates', c: 1, k: 3, at: 16 }, atoms: { scene: 'rates', c: 1, k: 3, at: 266 }, cross: { scene: 'rates', c: 1, k: 3, at: 558, play: true, from: 2 }, constant: { scene: 'rates', c: 0.5, k: 3, at: 57 },
    bridge: { scene: 'cut', dims: [2, 3, 2, 3], at: 0 }, narrow: { scene: 'cut', dims: [1, 5, 1, 5], at: 0 },
    plateau: { scene: 'modes', prof: 'plateau', at: 0.5 / 0.98 }, tail: { scene: 'modes', prof: 'power', at: 0.95, play: true }
  };
  const NOTES = {
    human: ['n = 2¹⁶，六万多个变量：c = 1 的示意曲线在这里才降回 1，也就是每个变量付出的指数与穷举相同。PPSZ 是 0.386。', 'n = 2¹⁶, some sixty-five thousand variables: for c = 1 the schematic curve is only back at 1 here, the same exponent per variable as brute force. PPSZ pays 0.386.'],
    atoms: ['n = 2²⁶⁶，可观测宇宙的原子数：示意曲线是 0.494，仍高于 0.386。阴影以内的任何规模上，它都还没有赢。', 'n = 2²⁶⁶, the number of atoms in the observable universe: the schematic curve stands at 0.494, still above 0.386. At no scale inside the shaded part has it won yet.'],
    cross: ['让规模一路增大：曲线缓缓下降，直到 n ≈ 2⁵⁵⁸ 才与 0.386 相交，远在阴影之外。', 'Let the scale grow: the curve sinks slowly and meets 0.386 only at n ≈ 2⁵⁵⁸, far outside the shaded part.'],
    constant: ['把常数 c 减半：交叉点从 2⁵⁵⁸ 回到 2⁵⁷ 附近，落进阴影里。大 O 记号不告诉我们 c；交叉点在视界的哪一边，全看它。', 'Halve the constant c: the crossover moves from 2⁵⁵⁸ back to about 2⁵⁷, inside the shaded part. The big O does not tell us c, and on which side of the horizon the crossover lies depends on it alone.'],
    bridge: ['a = c = 2、b = d = 3：两道外割都是 6，三条桥能过 12，不是瓶颈。随机实例的流矩阵有 6 行 6 列，秩是 6，等于最小割；Lean 证明在这个锥域内总是如此。', 'a = c = 2, b = d = 3: both outer cuts are 6 and the three bridges could carry 12, so they are no bottleneck. The flow matrix of the random instance has 6 rows and 6 columns and rank 6, the minimal cut; Lean proves that this always holds inside the cone.'],
    narrow: ['a = c = 1、b = d = 5：外割都是 5，三条桥却只能过 3。流矩阵是 5 × 5 的，秩只有 3：奇异值在第三个之后归零。这组维数在锥域之外。', 'a = c = 1, b = d = 5: the outer cuts are 5 but the three bridges carry only 3. The flow matrix is 5 × 5 and its rank is just 3: the singular values vanish after the third. These dimensions lie outside the cone.'],
    plateau: ['平台形的谱：前八个模态接近 1，之后迅速掉到零。阈值取 0.5 时有 8 个模态过线，而墙在 T/θ = 16：承重的模态屈指可数。', 'A plateau: the first eight modes are close to 1 and then the spectrum drops to zero. At the threshold 0.5 eight modes clear the line while the wall stands at T/θ = 16: only a handful of modes carry the weight.'],
    tail: ['换成拖着长尾的幂律谱，再把阈值一路降低：过线的模态越来越多，但青色的柱子始终到不了品红的墙。', 'Switch to a power law with a long tail and lower the threshold all the way: more and more modes clear the line, but the cyan bars never reach the magenta wall.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    if (p.c != null) { S.c = p.c; fC.set(p.c); }
    if (p.k != null) { S.k = p.k; kChips.set(p.k, true); }
    if (p.dims) { S.dims = p.dims.slice(); dimFields.forEach((f, i) => f.set(p.dims[i])); }
    if (p.prof) { S.prof = p.prof; profChips.set(p.prof, true); }
    setScene(p.scene, p.at);
    if (!p.play || TRV.still || (booting && !TRV.embed)) return;
    clock.set(p.from || 0);
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
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
    seek: (t) => { clock.pause(); clock.set(t); }, rate: (c, l) => rate(c, l), crossoverOf: (c) => crossover(c), ppszOf: (k) => ppsz(k), lambda: (prof, j) => SPEC[prof](j),
    at: (j, v) => { const b = $('cv').getBoundingClientRect(); return [b.left + view.X(j), b.top + view.Y(v)]; }
  };
  window.TRV_THUMB = () => { S.c = 1; fC.set(1); S.k = 3; kChips.set(3, true); setScene('rates', 266); paint.now(); };
  cards.pick(cards.initial('atoms'));
  booting = false;
  paint();
})();
