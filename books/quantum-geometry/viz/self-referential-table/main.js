/* ORTHO//TABLE · 同像自指表: one N × N table T = Σₐ vₐvₐᵀ (a = 1 … r), vₐ the first r discrete cosine vectors of ℝᴺ.
   T is real symmetric and idempotent, so row i used as a ruler on column j gives back Σₖ TᵢₖTₖⱼ = Tᵢⱼ.
     rank  the rail is the rank r = 1 … N; the diagonal Tₖₖ adds up to the trace, which equals r; at r = N, T = I.
     read  the rail adds the products TᵢₖTₖⱼ one at a time; for a diagonal cell every term is the square Tₖⱼ².
     heal  clicks add ε to Tᵢⱼ and Tⱼᵢ (Δ stays symmetric, every click accumulates); T₀ = T + Δ, Tₘ₊₁ = 3Tₘ² − 2Tₘ³; the
           side panel shows the eigenvalues of Tₘ (Jacobi rotations), each moved by x ↦ 3x² − 2x³. The words report the
           computed error of the step shown; "approximately idempotent" only when it is ≤ HEAL_TOL, and the one
           asymptotic statement (same-rank projection) only under the sufficient condition ‖Δ‖₂ < HEAL_SAFE (strict).
     perp  r < N: ψ(θ) = cos θ·v₁ + sin θ·w with w = v_{r+1} orthogonal to every vₐ; ‖Tψ‖ = cos θ, zero at 90°.
           r = N: T = I has no nonzero complement; ψ = v₁ for every θ and Tψ = ψ.
   Colours: cyan = positive entries, the part kept by T (eigenvalues above ½); magenta = negative entries, the
   complement (eigenvalues below ½); amber = the current cell, term, step or rank. Read-only probe: TABLE_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { clamp, fix } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const MINUS = '−', M = 8, DEG = Math.PI / 180, HEAL_SAFE = (Math.sqrt(3) - 1) / 2, HEAL_TOL = 1e-12;

  /* ---------- linear algebra ---------- */
  const zeros = (n) => Array.from({ length: n }, () => new Array(n).fill(0));
  // skip exact zeros only: an entry that has overflowed (±∞, NaN) must spread to the product, never count as 0
  const mul = (A, B) => { const n = A.length, C = zeros(n); for (let i = 0; i < n; i++) for (let k = 0; k < n; k++) { const a = A[i][k]; if (a !== 0) for (let j = 0; j < n; j++) C[i][j] += a * B[k][j]; } return C; };
  const lin = (a, A, b, B) => A.map((row, i) => row.map((x, j) => a * x + b * B[i][j]));
  const frob = (A) => Math.sqrt(A.reduce((s, row) => s + row.reduce((t, x) => t + x * x, 0), 0));
  const idemErr = (A) => frob(lin(1, mul(A, A), -1, A));
  const symErr = (A) => frob(A.map((row, i) => row.map((x, j) => x - A[j][i])));
  const trace = (A) => A.reduce((s, row, i) => s + row[i], 0);
  const matvec = (A, v) => A.map((row) => row.reduce((s, x, k) => s + x * v[k], 0));
  const norm = (v) => Math.sqrt(v.reduce((s, x) => s + x * x, 0));
  /** Eigenvalues of a symmetric matrix by cyclic Jacobi rotations, ascending. */
  function eig(A0) {
    const n = A0.length, A = A0.map((r) => r.slice());
    for (let sweep = 0; sweep < 60; sweep++) {
      let off = 0; for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += A[p][q] * A[p][q];
      if (off < 1e-30) break;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
        if (Math.abs(A[p][q]) < 1e-300) continue;
        const th = (A[q][q] - A[p][p]) / (2 * A[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1));
        const c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < n; k++) { const akp = A[k][p], akq = A[k][q]; A[k][p] = c * akp - s * akq; A[k][q] = s * akp + c * akq; }
        for (let k = 0; k < n; k++) { const apk = A[p][k], aqk = A[q][k]; A[p][k] = c * apk - s * aqk; A[q][k] = s * apk + c * aqk; }
      }
    }
    return A.map((r, i) => r[i]).sort((a, b) => a - b);
  }
  /** The k-th orthonormal discrete cosine vector of ℝᴺ (k = 0 is the constant vector). */
  const dct = (N, k) => Array.from({ length: N }, (_, n) => Math.sqrt((k ? 2 : 1) / N) * Math.cos(Math.PI * (n + 0.5) * k / N));
  const tableOf = (N, r) => { const V = Array.from({ length: r }, (_, k) => dct(N, k)), T = zeros(N); for (const v of V) for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) T[i][j] += v[i] * v[j]; return T; };

  /* ---------- state ---------- */
  const S = { scene: 'read', N: 8, r: 3, i: 0, j: 3, eps: 0.3, kicks: [], hover: null };
  let cache = {};
  const key = () => `${S.N}|${S.r}|${JSON.stringify(S.kicks)}`;
  function derive() {
    if (cache.key === key()) return cache;
    const T = tableOf(S.N, S.r), D = zeros(S.N);
    for (const k of S.kicks) { D[k.i][k.j] += k.eps; if (k.i !== k.j) D[k.j][k.i] += k.eps; }
    const its = [lin(1, T, 1, D)];
    for (let m = 0; m < M; m++) { const X = its[m], X2 = mul(X, X); its.push(lin(3, X2, -2, mul(X2, X))); }
    const eigs = its.map(eig), errs = its.map(idemErr), de = eig(D), dnorm = Math.max(Math.abs(de[0]), Math.abs(de[de.length - 1]));
    const rankErrs = Array.from({ length: S.N }, (_, k) => idemErr(tableOf(S.N, k + 1)));
    // the sufficient condition is strict: at ‖Δ‖₂ = (√3 − 1)/2 an eigenvalue 1 + ‖Δ‖₂ lands on the repelling ½ and stays
    cache = { key: key(), T, D, its, eigs, errs, dnorm, safe: dnorm < HEAL_SAFE, rankErrs, err: idemErr(T), sym: symErr(T), tr: trace(T) };
    return cache;
  }
  const kOf = () => Math.min(S.N, Math.floor(clock.t + 1e-9));            // read: terms added so far
  const mOf = () => Math.min(M, Math.floor(clock.t + 1e-9));              // heal: the step shown
  const thetaOf = () => clamp(clock.t, 0, 90);                            // perp: the angle in degrees
  const hasPerp = () => S.r < S.N;
  const shown = () => (S.scene === 'heal' ? derive().its[mOf()] : derive().T);
  const products = () => { const T = derive().T; return T.map((_, k) => T[S.i][k] * T[k][S.j]); };
  const partial = (k) => products().slice(0, k).reduce((s, x) => s + x, 0);
  const perpVecs = () => {
    const T = derive().T, v = dct(S.N, 0);
    // r = N: T = I and no nonzero vector is orthogonal to every row, so there is nothing to turn ψ into: ψ stays the unit v₁
    if (!hasPerp()) return { v, w: null, psi: v.slice(), Tpsi: matvec(T, v), Tw: null };
    const th = thetaOf() * DEG, w = dct(S.N, S.r), psi = v.map((x, k) => Math.cos(th) * x + Math.sin(th) * w[k]);
    return { v, w, psi, Tpsi: matvec(T, psi), Tw: matvec(T, w) };
  };
  /** What the words may say about step m of the healing iteration: the computed error against HEAL_TOL, else nothing. */
  const healStatus = (m) => { const D = derive(), e = D.errs[m]; return !S.kicks.length ? 'none' : !Number.isFinite(e) ? 'overflow' : e <= HEAL_TOL ? 'tol' : 'open'; };

  /* ---------- canvas helpers ---------- */
  const face = (f) => (f === 'body' ? TRV.fonts.body : TRV.fonts.data);
  function text(ctx, str, x, y, color, o) {
    o = o || {};
    ctx.font = `${o.weight ? o.weight + ' ' : ''}${o.size || 11}px ${face(o.face)}`; ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'middle';
    ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.strokeStyle = P.stage; ctx.strokeText(str, x, y);
    ctx.fillStyle = color; ctx.fillText(str, x, y);
  }
  const glowRect = (ctx, col, w, x, y, a, b) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.shadowColor = col; ctx.shadowBlur = 10; ctx.strokeRect(x, y, a, b); ctx.shadowBlur = 0; };
  const padOf = (b, W, H, l, r, t, bt) => [b.x + l, W - b.x - b.w + r, b.y + t, H - b.y - b.h + bt];
  const lw = (x) => (TRV.thumbMode ? 2 * x : x);

  /* ---------- the table ---------- */
  function drawTable(ctx, box, A, words) {
    const n = A.length, side = Math.min(box.w, box.h), c = side / (n + (words ? 0.9 : 0)), off = words ? c * 0.9 : 0;
    const ox = box.x + (box.w - side) / 2 + off, oy = box.y + (box.h - side) / 2 + off;
    const X = (j) => ox + j * c, Y = (i) => oy + i * c, gap = Math.max(1, c * 0.07);
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const x = A[i][j], a = Math.abs(x) < 1e-12 ? 0 : 0.07 + 0.88 * Math.sqrt(Math.min(1, Math.abs(x)));
      ctx.fillStyle = P.dim; ctx.globalAlpha = 0.07; ctx.fillRect(X(j) + gap / 2, Y(i) + gap / 2, c - gap, c - gap);
      if (a) { ctx.fillStyle = x > 0 ? P.cyan : P.magenta; ctx.globalAlpha = a; ctx.fillRect(X(j) + gap / 2, Y(i) + gap / 2, c - gap, c - gap); }
      ctx.globalAlpha = 1;
    }
    // the diagonal: each cell reads itself
    ctx.strokeStyle = P.ink; ctx.globalAlpha = 0.5; ctx.lineWidth = lw(1); ctx.setLineDash([3, 3]);
    for (let k = 0; k < n; k++) ctx.strokeRect(X(k) + 2.5, Y(k) + 2.5, c - 5, c - 5);
    ctx.setLineDash([]); ctx.globalAlpha = 1;
    ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1; ctx.strokeRect(ox + 0.5, oy + 0.5, n * c, n * c);
    if (S.scene === 'read' && !TRV.thumbMode) {                 // row i (the ruler) and column j (the state)
      ctx.strokeStyle = P.ink; ctx.globalAlpha = 0.85; ctx.lineWidth = 1.4; ctx.setLineDash([5, 3]);
      ctx.strokeRect(X(0) - 2, Y(S.i) - 2, n * c + 4, c + 4); ctx.strokeRect(X(S.j) - 2, Y(0) - 2, c + 4, n * c + 4);
      ctx.setLineDash([]); ctx.globalAlpha = 1;
      const k = kOf();
      if (k > 0 && k <= n) { ctx.strokeStyle = P.amber; ctx.lineWidth = 1.5; ctx.globalAlpha = 0.9; ctx.strokeRect(X(k - 1) + 1, Y(S.i) + 1, c - 2, c - 2); ctx.strokeRect(X(S.j) + 1, Y(k - 1) + 1, c - 2, c - 2); ctx.globalAlpha = 1; }
    }
    if (words) {
      const fs = clamp(c / 2.6, 9, 13);
      for (let k = 0; k < n; k++) {
        const on = S.scene === 'read' || S.scene === 'heal', hr = on && k === S.i, hc = on && k === S.j;
        if (n <= 8 || k % 2 === 0 || hr || hc) {
          text(ctx, String(k + 1), ox - 6, Y(k) + c / 2, hr ? P.amber : P.dim, { align: 'right', size: fs });
          text(ctx, String(k + 1), X(k) + c / 2, oy - 5, hc ? P.amber : P.dim, { align: 'center', base: 'bottom', size: fs });
        }
      }
    }
    if (S.scene !== 'perp' && (S.scene !== 'rank')) glowRect(ctx, P.amber, lw(2.4), X(S.j) + 1, Y(S.i) + 1, c - 2, c - 2);
    if (S.hover && !TRV.thumbMode) { const [i, j] = S.hover; ctx.strokeStyle = P.ink; ctx.globalAlpha = 0.6; ctx.lineWidth = 1; ctx.strokeRect(X(j) + 1.5, Y(i) + 1.5, c - 3, c - 3); ctx.globalAlpha = 1; }
    return { X, Y, c, n, ox, oy };
  }

  /* ---------- the side panels ---------- */
  function drawRead(cv, b, W, H, words) {
    const T = derive().T, p = products(), n = S.N, k = kOf(), sum = partial(k);
    const a = Math.max(0.02, ...p.map(Math.abs), Math.abs(T[S.i][S.j]), Math.abs(sum)) * 1.18;
    const g = kit.plot(cv, { x: [0.3, n + 3.2], y: [-a, a], pad: padOf(b, W, H, words ? 8 : 0, 0, words ? 18 : 0, words ? 22 : 0), clear: false });
    g.hline(0, P.lineHot, { width: 1 });
    for (let q = 0; q < n; q++) {
      const done = q < k, col = p[q] >= 0 ? P.cyan : P.magenta;
      g.rect(q + 0.62, 0, q + 1.38, p[q], col, { alpha: done ? 0.85 : 0.18 });
      if (q === k - 1) g.rect(q + 0.58, 0, q + 1.42, p[q] || 1e-9, P.amber, { fill: false, stroke: P.amber, width: lw(1.6) });
    }
    g.rect(n + 1.05, 0, n + 1.85, sum || 1e-9, P.amber, { alpha: 0.55, stroke: P.amber, width: lw(1.6), glow: 8 });
    g.rect(n + 2.15, 0, n + 2.95, T[S.i][S.j] || 1e-9, P.ink, { fill: false, stroke: P.ink, width: lw(1.4), strokeAlpha: 0.9 });
    if (words) {
      const fs = clamp(b.w / 34, 9.5, 12);
      g.text(n / 2 + 0.5, a, L(`第 ${S.i + 1} 行 × 第 ${S.j + 1} 列，逐项`, `row ${S.i + 1} × column ${S.j + 1}, term by term`), P.dim, { align: 'center', base: 'bottom', dy: -4, size: fs, face: 'body' });
      for (let q = 0; q < n; q++) if (n <= 8 || q % 2 === 0 || q === k - 1) g.text(q + 1, -a, String(q + 1), q === k - 1 ? P.amber : P.dim, { align: 'center', base: 'top', dy: 4, size: fs });
      g.text(n + 1.45, -a, 'Σ', P.amber, { align: 'center', base: 'top', dy: 4, size: fs + 1 });
      g.text(n + 2.55, -a, 'Tᵢⱼ', P.ink, { align: 'center', base: 'top', dy: 4, size: fs + 1, face: 'body' });
    }
  }
  function drawRank(cv, b, W, H, words) {
    const T = derive().T, n = S.N, d = T.map((row, k) => row[k]), tr = d.reduce((s, x) => s + x, 0);
    const top = { x: b.x, y: b.y, w: b.w, h: b.h * 0.62 }, bot = { x: b.x, y: b.y + b.h * 0.7, w: b.w, h: b.h * 0.3 };
    const g = kit.plot(cv, { x: [0.3, n + 0.7], y: [0, 1.12], pad: padOf(top, W, H, words ? 8 : 0, 0, words ? 18 : 0, words ? 18 : 0), clear: false });
    g.hline(1, P.lineHot, { dash: [4, 3] });
    for (let q = 0; q < n; q++) g.rect(q + 0.62, 0, q + 1.38, d[q], P.cyan, { alpha: 0.8 });
    const h = kit.plot(cv, { x: [0, n], y: [0, 1], pad: padOf(bot, W, H, words ? 8 : 0, words ? 8 : 0, 0, words ? 18 : 0), clear: false });
    for (let q = 0; q < n; q++) h.rect(q + 0.06, 0.15, q + 0.94, 0.85, q < S.r ? P.cyan : P.dim, { alpha: q < S.r ? 0.75 : 0.1, stroke: q < S.r ? undefined : P.lineHot });
    h.rect(0, 0.04, tr, 0.96, P.amber, { fill: false, stroke: P.amber, width: lw(2), glow: 8 });
    if (words) {
      const fs = clamp(b.w / 34, 9.5, 12);
      g.text((n + 1) / 2, 1.12, L('对角格 Tₖₖ', 'diagonal cells Tₖₖ'), P.dim, { align: 'center', base: 'bottom', dy: -2, size: fs, face: 'body' });
      for (let q = 0; q < n; q++) if (n <= 8 || q % 2 === 0) g.text(q + 1, 0, String(q + 1), P.dim, { align: 'center', base: 'top', dy: 4, size: fs });
      h.text(0, 0, L(`N = ${n} 个地址，占了 r = ${S.r} 个；对角格加起来 = ${fix(tr, 3)}`, `N = ${n} addresses, r = ${S.r} taken; the diagonal adds up to ${fix(tr, 3)}`), P.ink, { base: 'top', dy: 4, size: fs, face: 'body' });
    }
  }
  function drawHeal(cv, b, W, H, words) {
    const D = derive(), m = mOf();
    const g = kit.plot(cv, { x: [-0.58, 1.58], y: [-0.6, M + 0.6], pad: padOf(b, W, H, words ? 34 : 0, 4, words ? 18 : 0, words ? 18 : 0), clear: false });
    for (const x of [0, 1]) g.vline(x, P.lineHot, { width: 1.2 });
    g.vline(0.5, P.dim, { dash: [3, 3] });
    const yOf = (q) => M - q;
    g.rect(-0.58, yOf(m) - 0.42, 1.58, yOf(m) + 0.42, P.amber, { alpha: 0.07, stroke: P.amber, strokeAlpha: 0.6, width: lw(1) });
    const r = TRV.thumbMode ? 7 : clamp(b.h / 80, 3, 5);
    for (let q = 0; q <= m; q++) for (const x of D.eigs[q]) g.dot(clamp(x, -0.58, 1.58), yOf(q), x > 0.5 ? P.cyan : P.magenta, r, { alpha: q === m ? 1 : 0.5 });
    if (words) {
      const fs = clamp(b.w / 34, 9.5, 12);
      for (const [x, s] of [[0, '0'], [0.5, '½'], [1, '1']]) g.text(x, -0.6, s, P.dim, { align: 'center', base: 'top', dy: 4, size: fs });
      for (let q = 0; q <= M; q++) g.text(-0.58, yOf(q), `m=${q}`, q === m ? P.amber : P.dim, { align: 'right', dx: -4, size: fs - 0.5 });
      g.text(0.5, M + 0.6, L('Tₘ 的本征值', 'eigenvalues of Tₘ'), P.dim, { align: 'center', base: 'bottom', dy: -2, size: fs, face: 'body' });
    }
  }
  function drawPerp(cv, b, W, H, words) {
    const n = S.N, th = thetaOf(), V = perpVecs();
    const top = { x: b.x, y: b.y, w: b.w, h: b.h * 0.7 }, bot = { x: b.x, y: b.y + b.h * 0.76, w: b.w, h: b.h * 0.24 };
    const a = Math.max(0.2, ...V.psi.map(Math.abs), ...V.v.map(Math.abs)) * 1.15;
    const g = kit.plot(cv, { x: [-a, a], y: [n + 0.6, 0.4], pad: padOf(top, W, H, words ? 22 : 0, 4, words ? 18 : 0, 4), clear: false });
    g.vline(0, P.lineHot, { width: 1 });
    for (let q = 0; q < n; q++) {
      g.rect(0, q + 0.62, V.psi[q], q + 0.98, P.ink, { alpha: 0.45 });
      g.rect(0, q + 1.02, V.Tpsi[q], q + 1.38, P.cyan, { alpha: 0.85 });
    }
    const full = !hasPerp(), kept = full ? norm(V.Tpsi) : Math.cos(th * DEG), lost = full ? norm(V.psi.map((x, k) => x - V.Tpsi[k])) : Math.sin(th * DEG);
    const h = kit.plot(cv, { x: [0, 1.05], y: [0, 3], pad: padOf(bot, W, H, words ? 22 : 0, 4, 0, words ? 2 : 0), clear: false });
    h.rect(0, 1.75, kept, 2.35, P.cyan, { alpha: 0.85 });
    if (lost > 1e-12) h.rect(0, 0.2, lost, 0.8, P.magenta, { alpha: 0.85 });
    h.vline(1, P.lineHot, { dash: [3, 3] });
    if (words) {
      const fs = clamp(b.w / 34, 9.5, 12);
      // in the top margin the panel keeps for it, so the last row's bars (cyan at every θ when r = N) never cover it
      g.text(0, 0.4, L('灰：状态 ψ 的分量 · 青：读出 Tψ', 'grey: the entries of ψ · cyan: the reading Tψ'), P.dim, { align: 'center', base: 'bottom', dy: -2, size: fs, face: 'body' });
      for (let q = 0; q < n; q++) if (n <= 8 || q % 2 === 0) g.text(-a, q + 1, String(q + 1), P.dim, { align: 'right', dx: -4, size: fs });
      if (full) {   // T = I: the whole unit state is read back, and I − T = 0 leaves no complement
        h.text(0, 2.4, `‖Tψ‖ = ‖ψ‖ = ${fix(kept, 3)}`, P.cyan, { base: 'bottom', size: fs });
        h.text(0, 0.85, L(`‖(I − T)ψ‖ = ${fix(lost, 3)} · 没有正交补`, `‖(I − T)ψ‖ = ${fix(lost, 3)} · no complement`), P.magenta, { base: 'bottom', size: fs, face: 'body' });
      } else {
        h.text(0, 2.4, `‖Tψ‖ = cos θ = ${fix(kept, 3)}`, P.cyan, { base: 'bottom', size: fs });
        h.text(0, 0.85, `‖(I − T)ψ‖ = sin θ = ${fix(lost, 3)}`, P.magenta, { base: 'bottom', size: fs });
      }
    }
  }

  /* ---------- the stage ---------- */
  let geo = {};
  function drawStage() {
    const g0 = kit.plot($('cv'), { x: [0, 1], y: [0, 1], pad: [0, 0, 0, 0] }), ctx = g0.ctx, W = g0.W, H = g0.H, cv = $('cv');
    if (TRV.thumbMode) {   // wordless cover: the table beside its eigenvalues snapping to 0 and 1
      const glow = ctx.createRadialGradient(W * 0.3, H * 0.5, 0, W * 0.3, H * 0.5, W * 0.55);
      glow.addColorStop(0, TRV.alpha(P.cyan, 0.08)); glow.addColorStop(1, TRV.alpha(P.cyan, 0)); ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
      geo.table = drawTable(ctx, { x: W * 0.05, y: H * 0.07, w: W * 0.48, h: H * 0.86 }, shown(), false);
      drawHeal(cv, { x: W * 0.6, y: H * 0.1, w: W * 0.34, h: H * 0.8 }, W, H, false);
      return;
    }
    const st = $('stage').getBoundingClientRect(), below = (el) => (el ? el.getBoundingClientRect().bottom - st.top : 0);
    const top = Math.max(46, below($('hudBig').parentElement), below($('sceneChips'))) + 10, bottom = Math.max(18, $('legend').offsetHeight + 20);
    const bx = { x: 18, y: top, w: W - 36, h: Math.max(80, H - top - bottom) };
    const wide = bx.w >= 520 && bx.w >= bx.h * 1.2;
    let tb, pb;
    if (wide) { const side = Math.min(bx.h, bx.w * 0.54); tb = { x: bx.x, y: bx.y, w: side, h: bx.h }; pb = { x: bx.x + side + 30, y: bx.y + 4, w: bx.w - side - 30, h: bx.h - 8 }; }
    else { const side = Math.min(bx.w, bx.h * 0.58); tb = { x: bx.x, y: bx.y, w: bx.w, h: side }; pb = { x: bx.x, y: bx.y + side + 14, w: bx.w, h: bx.h - side - 14 }; }
    geo.table = drawTable(ctx, tb, shown(), true);
    if (pb.h < 40) return;
    if (S.scene === 'read') drawRead(cv, pb, W, H, true);
    else if (S.scene === 'rank') drawRank(cv, pb, W, H, true);
    else if (S.scene === 'heal') drawHeal(cv, pb, W, H, true);
    else drawPerp(cv, pb, W, H, true);
  }

  /* ---------- the strip: is the table still idempotent ---------- */
  const FLOOR = 1e-17, fl = (x) => Math.max(FLOOR, x);
  function drawPlot() {
    const D = derive(), sc = S.scene;
    let xr, pts, now, nowV;
    if (sc === 'heal') { xr = [0, M]; pts = D.errs.map((e, q) => [q, fl(e)]); now = mOf(); nowV = D.errs[now]; }
    else if (sc === 'rank') { xr = [1, S.N]; pts = D.rankErrs.map((e, q) => [q + 1, fl(e)]); now = S.r; nowV = D.err; }
    else if (sc === 'read') { xr = [0, S.N]; pts = [[0, fl(D.err)], [S.N, fl(D.err)]]; now = kOf(); nowV = D.err; }
    else { xr = [0, 90]; pts = [[0, fl(D.err)], [90, fl(D.err)]]; now = thetaOf(); nowV = D.err; }
    const g = kit.plot($('plot'), { x: xr, y: [FLOOR, 10], logY: true, pad: [44, 12, 10, 22] });
    const xt = sc === 'perp' ? [[0, '0°'], [45, '45°'], [90, '90°']] : Array.from({ length: xr[1] - xr[0] + 1 }, (_, q) => q + xr[0]).filter((v) => xr[1] - xr[0] <= 8 || v % 2 === 0);
    g.axes({ yTicks: [[1e-16, '10⁻¹⁶'], [1e-8, '10⁻⁸'], [1, '1']], xTicks: xt });
    if (sc === 'heal') g.hline(HEAL_TOL, P.dim, { dash: [4, 3] });   // the named tolerance of "approximately idempotent"
    g.line(pts, P.cyan, { width: 2 });
    for (const p of pts) if (sc === 'heal' || sc === 'rank') g.dot(p[0], p[1], P.cyan, 3);
    g.vline(now, P.amber, { alpha: 0.8 });
    g.legend(sc === 'heal' ? [[P.cyan, L('‖T² − T‖（对数）', '‖T² − T‖ (log)')], [P.dim, L('虚线：容差 10⁻¹²', 'dashed: tolerance 10⁻¹²')]] : [[P.cyan, L('‖T² − T‖（对数）', '‖T² − T‖ (log)')]]);
    $('plotMeta').textContent = `${L(sc === 'heal' ? `第 ${now} 步` : '当前', sc === 'heal' ? `step ${now}` : 'now')} · ${nowV.toExponential(1).replace('-', MINUS)}`;
  }

  /* ---------- words ---------- */
  const LEGEND = {
    read: [['cy box', '正的格、正的乘积', 'positive cells and products'], ['mg box', '负的格、负的乘积', 'negative cells and products'], ['am', '选中的格、刚加进来的一项', 'the chosen cell, the term just added'], ['dm', '虚线：行（尺子）与列（被量）', 'dashed: the row (ruler) and the column (measured)']],
    rank: [['cy box', '正的格、对角格（越亮越大）', 'positive cells, diagonal cells (brighter is larger)'], ['mg box', '负的格', 'negative cells'], ['am', '对角格之和（迹）', 'the sum of the diagonal (trace)'], ['dm', '虚线框：对角线', 'dashed: the diagonal']],
    heal: [['cy box', '正的格；½ 以上的本征值', 'positive cells; eigenvalues above ½'], ['mg box', '负的格；½ 以下的本征值', 'negative cells; eigenvalues below ½'], ['am', '被碰的格、当前这一步', 'the knocked cell, the current step']],
    perp: [['cy box', '读出 Tψ、留在表里的 cos θ', 'the reading Tψ, the cos θ kept by the table'], ['mg box', '落在正交补里的 sin θ', 'the sin θ in the complement'], ['dm', '状态 ψ', 'the state ψ']],
    perpFull: [['cy box', '读出 Tψ = ψ（T = I）', 'the reading Tψ = ψ (T = I)'], ['dm', '状态 ψ = v₁', 'the state ψ = v₁']]
  };
  const setLabel = (id, zh, en) => { const h = `<span class="zh">${zh}</span><span class="en">${en}</span>`; if ($(id)._h !== h) { $(id).innerHTML = h; $(id)._h = h; } };
  const ex = (x) => (x === 0 ? '0' : x.toExponential(1).replace('-', MINUS));
  const num = (x, d) => fix(x, d == null ? 4 : d);
  function drawText() {
    const D = derive(), sc = S.scene, A = shown();
    let big, hud, note;
    if (sc === 'read') {
      const k = kOf(), T = D.T, s = partial(k), diag = S.i === S.j;
      big = diag ? L(`对角格 (${S.i + 1}, ${S.i + 1})：自己读自己`, `Diagonal cell (${S.i + 1}, ${S.i + 1}): reading itself`) : L(`第 ${S.i + 1} 行读第 ${S.j + 1} 列`, `Row ${S.i + 1} reads column ${S.j + 1}`);
      hud = k < S.N ? L(`已读 ${k} / ${S.N} 项 · 至此 ${num(s)}`, `${k} of ${S.N} terms read · so far ${num(s)}`) : L(`读完：Σₖ TᵢₖTₖⱼ = ${num(s)} = Tᵢⱼ`, `done: Σₖ TᵢₖTₖⱼ = ${num(s)} = Tᵢⱼ`);
      note = diag ? L(`第 ${S.i + 1} 行与第 ${S.i + 1} 列是同一串数，所以每一项都是平方（全是青色），加起来是这一行的长度平方，正好等于对角格本身。`, `Row ${S.i + 1} and column ${S.i + 1} are the same numbers, so every term is a square (all cyan); they add up to the squared length of the row, which is the diagonal cell itself.`)
        : L('青色与品红的乘积有正有负，相加后不多不少落回这一格：表拿自己读自己，读回的还是它。', 'Cyan and magenta products, positive and negative, add up to exactly this cell: the table reading itself gives itself back.');
      setLabel('roKeyLabel', `第 i 行读第 j 列（i = ${S.i + 1}, j = ${S.j + 1}）`, `Row i reads column j (i = ${S.i + 1}, j = ${S.j + 1})`);
      $('roKey').textContent = `${num(partial(S.N))} = ${num(T[S.i][S.j])}`;
      $('roKeySub').textContent = L('(T²)ᵢⱼ 与 Tᵢⱼ', '(T²)ᵢⱼ and Tᵢⱼ');
      setLabel('ro1Label', '逐项乘积之和（已读的项）', 'Sum of the products (terms read)'); $('ro1').textContent = `${k} / ${S.N} · ${num(s)}`;
    } else if (sc === 'rank') {
      big = L(`写进 r = ${S.r} 行 · 迹 = ${fix(D.tr, 3)}`, `r = ${S.r} rows written · trace = ${fix(D.tr, 3)}`);
      hud = S.r === S.N ? L('写满了：T 是单位阵，再没有和它们都正交的方向', 'full: T is the identity, and no direction is orthogonal to all of them') : L(`对角格加起来正好是 ${S.r}；还有 ${S.N - S.r} 个方向空着`, `the diagonal adds up to exactly ${S.r}; ${S.N - S.r} directions are still free`);
      note = S.r === 1 ? L('秩 1：只有常值向量一行，每一格都是 1/N。', 'Rank 1: just the constant vector, every cell is 1/N.') : S.r === S.N ? L('r = N：每个地址只读自己，表就是单位阵；第 N + 1 行写不进来。', 'r = N: each address reads only itself, the table is the identity; an (N + 1)-th row cannot go in.') : L('每多写一行，迹就多 1；表一直对称、一直幂等。', 'Each new row adds 1 to the trace; the table stays symmetric and idempotent.');
      setLabel('roKeyLabel', '迹 = 秩', 'Trace = rank'); $('roKey').textContent = `${fix(D.tr, 6)} = ${S.r}`; $('roKeySub').textContent = L(`N = ${S.N} 个地址里占了 ${S.r} 个`, `${S.r} of N = ${S.N} addresses taken`);
      setLabel('ro1Label', '还空着的正交方向', 'Orthogonal directions still free'); $('ro1').textContent = String(S.N - S.r);
    } else if (sc === 'heal') {
      // finite facts first: the computed error of the step shown; then the one sufficient condition, and only when it holds
      const m = mOf(), e = D.errs[m], st = healStatus(m), dn = fix(D.dnorm, 3);
      big = S.kicks.length ? L(`第 ${m} 步 · 幂等误差 ${ex(e)}`, `Step ${m} · idempotency error ${ex(e)}`) : L('还没碰：点表里的一格', 'Untouched: click a cell of the table');
      hud = st === 'none' ? L('点一格，Tᵢⱼ 与 Tⱼᵢ 各加 ε，然后迭代 3T² − 2T³', 'a click adds ε to Tᵢⱼ and Tⱼᵢ, then 3T² − 2T³ is iterated')
        : st === 'overflow' ? L('数值溢出：这一步页面报告不了误差', 'overflow: the page cannot report this step’s error')
          : st === 'tol' ? L('误差 ≤ 10⁻¹²：这一步在这个容差下近似幂等', 'error ≤ 10⁻¹²: approximately idempotent at this tolerance')
            : D.safe ? L(`‖Δ‖₂ < (√3 − 1)/2：再迭代会趋向秩 ${S.r} 的投影；这一步还不幂等`, `‖Δ‖₂ < (√3 − 1)/2: further steps tend to a rank-${S.r} projection; not idempotent yet`)
              : L('‖Δ‖₂ ≥ (√3 − 1)/2：不在充分条件内，只看实算的误差', '‖Δ‖₂ ≥ (√3 − 1)/2: outside the sufficient condition, only the computed error counts');
      const cond = D.safe
        ? L(`‖Δ‖₂ = ${dn}，严格小于 (√3 − 1)/2 ≈ 0.366：按文献结果，继续迭代会渐近趋向秩 ${S.r} 的投影（T₀ 在 ½ 以上本征值的谱投影，不一定是原表）。`, `‖Δ‖₂ = ${dn} is strictly below (√3 − 1)/2 ≈ 0.366: by the literature result, further steps tend asymptotically to a projection of rank ${S.r} (the spectral projection of T₀ onto its eigenvalues above ½, not necessarily the original table).`)
        : L(`‖Δ‖₂ = ${dn}，不小于 (√3 − 1)/2 ≈ 0.366：这个充分条件不适用，页面既不预言极限，也不预言秩（‖Δ‖₂ < ½ 也不够）。`, `‖Δ‖₂ = ${dn} is not below (√3 − 1)/2 ≈ 0.366: the sufficient condition does not apply, and the page predicts neither a limit nor a rank (‖Δ‖₂ < ½ is not enough either).`);
      const step = st === 'overflow' ? L(`第 ${m} 步的数已超出双精度范围，页面给不出误差。`, `At step ${m} the numbers have left the double-precision range; the page cannot give an error.`)
        : st === 'tol' ? L(`第 ${m} 步实算的幂等误差 ${ex(e)} ≤ 10⁻¹²：在这个容差下近似幂等。`, `The computed idempotency error at step ${m}, ${ex(e)}, is ≤ 10⁻¹²: approximately idempotent at this tolerance.`)
          : L(`第 ${m} 步实算的幂等误差是 ${ex(e)}，高于容差 10⁻¹²：这一步的表还不幂等。`, `The computed idempotency error at step ${m} is ${ex(e)}, above the tolerance 10⁻¹²: the table at this step is not idempotent yet.`);
      note = st === 'none' ? L('没有扰动时 T 已经幂等，迭代一步也不动它。', 'Without a knock T is already idempotent and the iteration does not move it.') : `${cond} ${step}`;
      setLabel('roKeyLabel', `幂等误差 ‖Tₘ² − Tₘ‖（第 ${m} 步）`, `Idempotency error ‖Tₘ² − Tₘ‖ (step ${m})`); $('roKey').textContent = ex(e);
      $('roKeySub').textContent = m > 0 && D.errs[m - 1] > 1e-14 ? L(`上一步 ${ex(D.errs[m - 1])}`, `previous step ${ex(D.errs[m - 1])}`) : '';
      setLabel('ro1Label', '扰动的大小 ‖Δ‖₂（谱范数）', 'Size of the knock ‖Δ‖₂ (spectral norm)'); $('ro1').textContent = `${fix(D.dnorm, 3)} · ${S.kicks.length} ${L('次', S.kicks.length === 1 ? 'knock' : 'knocks')}`;
    } else {
      const th = thetaOf(), V = perpVecs(), full = !hasPerp(), len = norm(V.Tpsi);
      big = full ? L('表写满了：没有正交补', 'The table is full: no complement') : `θ = ${fix(th, 0)}° · ‖Tψ‖ = ${fix(len, 3)}`;
      hud = full ? L('T = I：没有非零的正交补，单位态原样读回；ψ = v₁ 不随 θ 转', 'T = I: no nonzero complement, a unit state reads back unchanged; ψ = v₁ does not turn with θ')
        : th > 89.999 ? L('ψ 整个落在正交补里：读出 Tψ = 0', 'ψ lies entirely in the complement: the reading Tψ = 0') : L(`ψ = cos θ·v₁ + sin θ·w，w 与表里每一行正交`, `ψ = cos θ·v₁ + sin θ·w, with w orthogonal to every row of the table`);
      note = full ? L('写满的表 T = I 没有非零的正交补：任何单位态都原样读回，Tψ = ψ，‖Tψ‖ = 1。cos θ 与 sin θ 的拆分要 r < N 才有；这里 ψ 停在 v₁，时间轴上的 θ 不改变它。', 'The full table T = I has no nonzero complement: every unit state reads back unchanged, Tψ = ψ and ‖Tψ‖ = 1. The split into cos θ and sin θ needs r < N; here ψ stays at v₁ and the angle θ on the rail does not change it.')
        : L('只有留在表里的那一份 cos θ 被读出来；转到 90°，表对 ψ 一个字也读不出。', 'Only the part cos θ that lies in the table gets read; at 90° the table reads nothing at all from ψ.');
      setLabel('roKeyLabel', '读出的长度 ‖Tψ‖', 'Length of the reading ‖Tψ‖'); $('roKey').textContent = fix(len, 6);
      $('roKeySub').textContent = full ? L('= ‖ψ‖：T = I 原样读回', '= ‖ψ‖: T = I reads it back unchanged') : `cos ${fix(th, 1)}° = ${fix(Math.cos(th * DEG), 6)}`;
      if (full) { setLabel('ro1Label', '正交补', 'The complement'); $('ro1').textContent = L('没有：维数 0', 'none: dimension 0'); }
      else { setLabel('ro1Label', '正交补里的 w：‖Tw‖', 'The complement vector w: ‖Tw‖'); $('ro1').textContent = ex(norm(V.Tw)); }
    }
    setLabel('ro2Label', '表的大小 · 秩', 'Size · rank'); $('ro2').textContent = `${S.N} × ${S.N} · r = ${S.r}`;
    setLabel('ro3Label', '迹（舞台上这张表）', 'Trace (the table on the stage)'); $('ro3').textContent = fix(trace(A), 4);
    setLabel('ro4Label', '‖T² − T‖ · ‖T − Tᵀ‖（舞台上这张表）', '‖T² − T‖ · ‖T − Tᵀ‖ (the table on the stage)'); $('ro4').textContent = `${ex(idemErr(A))} · ${ex(symErr(A))}`;
    $('roAside').textContent = sc === 'heal' ? 'Tₘ₊₁ = 3Tₘ² − 2Tₘ³' : 'T² = T, Tᵀ = T';
    $('hudBig').textContent = big; $('hudSub').textContent = hud; $('roNote').textContent = note;
    $('pillSize').querySelector('strong').textContent = `${S.N} × ${S.r}`;
    $('pillErr').querySelector('strong').textContent = ex(idemErr(A));
    const leg = LEGEND[sc === 'perp' && !hasPerp() ? 'perpFull' : sc].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== leg) { $('legend').innerHTML = leg; $('legend')._h = leg; }
    $('oRank').textContent = String(S.r);
  }

  const paint = kit.painter(() => { drawText(); drawStage(); drawPlot(); }, [$('stage'), $('plot')]);

  /* ---------- the rail ---------- */
  const RAIL = {
    rank: () => ({ max: S.N - 1, rate: 1.6, step: 1 }), read: () => ({ max: S.N, rate: S.N / 3.2, step: 1 }),
    heal: () => ({ max: M, rate: 1.4, step: 1 }), perp: () => ({ max: 90, rate: 30, step: 15 })
  };
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 8, t: 8, rate: 2.5, step: 1,
    format: (t, max) => (S.scene === 'rank' ? `r = ${1 + Math.min(S.N - 1, Math.floor(t + 1e-9))} <small>/ ${S.N}</small>`
      : S.scene === 'read' ? `${Math.min(S.N, Math.floor(t + 1e-9))} <small>/ ${S.N} ${L('项', 'terms')}</small>`
        : S.scene === 'heal' ? `${L('第 ', 'STEP ')}${Math.min(M, Math.floor(t + 1e-9))}${L(' 步', '')} <small>/ ${M}</small>`
          : `θ ${Math.round(clamp(t, 0, max))}° <small>/ 90°</small>`),
    onChange: (t) => { if (S.scene === 'rank') { const r = 1 + Math.min(S.N - 1, Math.floor(t + 1e-9)); if (r !== S.r) { S.r = r; fRank.set(r); } } paint(); }
  });
  function fitClock(t) { const R = RAIL[S.scene](); clock.pause(); clock.rate = R.rate; clock.step = R.step; clock.setMax(R.max, true); clock.set(t == null ? R.max : t); }
  function setScene(sc, t) {
    S.scene = sc; S.hover = null; sceneChips.set(sc, true);
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    fitClock(sc === 'rank' && t == null ? S.r - 1 : t);
  }
  /** The one owner of a size change (size chips, cards, cover): every index the state keeps stays inside the new table,
      and a choice that is still valid is kept as it is. */
  function resize(n) {
    S.N = n; S.r = Math.min(S.r, n); S.i = Math.min(S.i, n - 1); S.j = Math.min(S.j, n - 1);
    S.kicks = S.kicks.filter((k) => k.i < n && k.j < n);
    if (S.hover && (S.hover[0] >= n || S.hover[1] >= n)) S.hover = null;
    $('rank').max = String(n); fRank.set(S.r); sizeChips.set(String(n), true);
  }
  function setN(n) { resize(n); fitClock(S.scene === 'rank' ? S.r - 1 : undefined); }
  function setR(r) { S.r = clamp(Math.round(r), 1, S.N); fRank.set(S.r); if (S.scene === 'rank') { clock.pause(); clock.set(S.r - 1); } else paint(); }
  function select(i, j) { S.i = clamp(i, 0, S.N - 1); S.j = clamp(j, 0, S.N - 1); if (S.scene === 'read') fitClock(); else paint(); }
  function kick(i, j, eps) {
    if (i > j) [i, j] = [j, i];
    S.kicks.push({ i, j, eps: eps == null ? S.eps : eps }); S.i = i; S.j = j;
    fitClock(0);
  }
  const leave = () => cards.mark(null);
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  const sizeChips = kit.chips($('sizeChips'), 'size', (v) => { leave(); setN(+v); });
  const fRank = kit.field($('rank'), { onInput: (v) => { leave(); setR(v); } });
  const fKick = kit.field($('kick'), { fmt: (v) => (v < 0 ? MINUS : '') + Math.abs(v).toFixed(2), onInput: (v) => { leave(); S.eps = v; } });
  $('clearBtn').addEventListener('click', () => { leave(); S.kicks = []; if (S.scene === 'heal') fitClock(0); else paint(); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('rank'); }, 2: () => { leave(); setScene('read'); }, 3: () => { leave(); setScene('heal'); }, 4: () => { leave(); setScene('perp'); } });

  /* ---------- direct manipulation: click a cell ---------- */
  const cellAt = (ev) => {
    const g = geo.table; if (!g) return null;
    const b = $('cv').getBoundingClientRect(), j = Math.floor((ev.clientX - b.left - g.ox) / g.c), i = Math.floor((ev.clientY - b.top - g.oy) / g.c);
    return i >= 0 && j >= 0 && i < g.n && j < g.n ? [i, j] : null;
  };
  $('cv').addEventListener('click', (ev) => {
    const c = cellAt(ev); if (!c) return;
    leave();
    if (S.scene === 'heal') { kick(c[0], c[1]); clock.play(); }
    else if (S.scene === 'rank' || S.scene === 'perp') { S.i = c[0]; S.j = c[1]; setScene('read'); fitClock(); }
    else select(c[0], c[1]);
  });
  $('cv').addEventListener('pointermove', (ev) => { const c = cellAt(ev); if (String(c) !== String(S.hover)) { S.hover = c; paint(); } });
  $('cv').addEventListener('pointerleave', () => { if (S.hover) { S.hover = null; paint(); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    reset: { scene: 'rank', N: 8, r: 1 },
    expand_table: { scene: 'rank', N: 8, r: 1, play: true, still: 4 },
    full: { scene: 'rank', N: 8, r: 8 },
    dual_read: { scene: 'read', N: 4, r: 2, cell: [0, 3], play: true },
    heal: { scene: 'heal', N: 8, r: 3, kicks: [{ i: 1, j: 4, eps: 0.3 }], play: true },
    orthogonal_zero: { scene: 'perp', N: 8, r: 3, play: true }
  };
  const NOTES = {
    reset: ['清空到一行：只写进常值向量，T 的每一格都是 1/8，八个对角格加起来是 1。下面八个地址槽只占了一个。', 'Cleared to one row: only the constant vector is written in, every cell of T is 1/8, and the eight diagonal cells add up to 1. Of the eight address slots below, one is taken.'],
    expand_table: ['一行一行写进两两正交的余弦向量：每多一行，对角格的和（琥珀色的框）就多 1，地址槽多占一个；条带里的幂等误差始终贴在机器精度上。', 'Orthogonal cosine vectors are written in one row at a time: each new row adds 1 to the sum of the diagonal (the amber frame) and takes one more address slot; the idempotency error in the strip stays at machine precision.'],
    full: ['r = N = 8：八个地址全被占满，表成了单位阵，青色只剩对角线。再也找不出与这八行都正交的第九个方向。', 'r = N = 8: all eight addresses are taken, the table is the identity, and cyan is left only on the diagonal. There is no ninth direction orthogonal to all eight rows.'],
    dual_read: ['第 1 行（横读，尺子）去读第 4 列（竖读，被量的状态）：四个乘积 T₁ₖTₖ₄ 有青有品红，逐项加起来（琥珀色的条）正好等于这一格 T₁₄（空心框）。点一个对角格，第 k 行与第 k 列是同一串数，乘积全是平方、全是青色，加起来回到 Tₖₖ 本身：这只是 T² = T 落在对角格上的一项，不是 Lawvere 对角线定理（无不动点时对角线逃出列表）的演示。', 'Row 1 (read across, the ruler) reads column 4 (read down, the state being measured): the four products T₁ₖTₖ₄, some cyan, some magenta, add up term by term (the amber bar) to exactly this cell T₁₄ (the hollow frame). Click a diagonal cell: row k and column k are the same numbers, so every product is a square, all cyan, and they add up to Tₖₖ itself. This is only T² = T read on a diagonal cell, not a picture of Lawvere’s diagonal theorem (the diagonal escaping every listing when there is no fixed point).'],
    heal: ['往 (2, 5) 与 (5, 2) 各加 0.3，表不再幂等。每迭代一步 3T² − 2T³，右边的本征值就向 0 与 1 靠拢；这一次，条带里的误差一步比一步小得多，第 7 步降到 10⁻¹² 以下。', 'Add 0.3 to (2, 5) and (5, 2) and the table is no longer idempotent. With each step of 3T² − 2T³ the eigenvalues on the right move towards 0 and 1; for this knock the error in the strip drops much faster each step, below 10⁻¹² by step 7.'],
    orthogonal_zero: ['ψ 从表里的常值向量 v₁ 转向与表里每一行都正交的 w：读出 Tψ（青色）随 cos θ 缩短，落在正交补里的 sin θ（品红）随之变长；到 90°，读出归零。', 'ψ turns from the constant vector v₁, which is in the table, towards w, which is orthogonal to every row of it: the reading Tψ (cyan) shrinks with cos θ while the part sin θ in the complement (magenta) grows; at 90° the reading is zero.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    resize(p.N);                                   // a card may shrink the table: the kept cell must stay inside it
    S.r = p.r; fRank.set(p.r);
    S.kicks = (p.kicks || []).map((k) => Object.assign({}, k));
    if (p.cell) { S.i = p.cell[0]; S.j = p.cell[1]; } else if (p.kicks) { S.i = p.kicks[0].i; S.j = p.kicks[0].j; }
    setScene(p.scene);
    if (!p.play) return;
    const R = RAIL[p.scene]();
    // a still (cover, cited figure for PDF/EPUB) and the opening view of the full page show the telling frame;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed)) { clock.set(p.still != null ? p.still - (p.scene === 'rank' ? 1 : 0) : R.max); return; }
    clock.set(0);
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：点表里的一格、换场景、改 N 与秩、拖时间轴。随时可以再选一张卡。', 'Free play: click a cell, switch scenes, change N and the rank, scrub the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe for the browser suite, cover, start ---------- */
  const at = (x, y) => { const b = $('cv').getBoundingClientRect(); return { x: b.left + x, y: b.top + y }; };
  const copy = (A) => A.map((r) => r.slice());
  window.TABLE_DEBUG = {
    get state() {
      const D = derive();
      return { scene: S.scene, N: S.N, r: S.r, i: S.i, j: S.j, eps: S.eps, kicks: S.kicks.map((k) => Object.assign({}, k)), t: clock.t, max: clock.max, playing: clock.playing,
        preset: cards.current, k: kOf(), m: mOf(), theta: thetaOf(), trace: D.tr, err: D.err, sym: D.sym, dnorm: D.dnorm, errs: D.errs.slice(), partial: partial(kOf()),
        safe: D.safe, safeBound: HEAL_SAFE, tol: HEAL_TOL, heal: healStatus(mOf()) };
    },
    T: () => copy(derive().T), shown: () => copy(shown()), delta: () => copy(derive().D), iterates: () => derive().its.map(copy), eigs: (m) => derive().eigs[m == null ? mOf() : m].slice(),
    basis: () => Array.from({ length: S.r }, (_, k) => dct(S.N, k)), products: () => products(), perp: () => { const V = perpVecs(); return { v: V.v, w: V.w, psi: V.psi, Tpsi: V.Tpsi, Tw: V.Tw, has: hasPerp() }; },
    seek: (t) => { clock.pause(); clock.set(t); }, scene: (sc, t) => setScene(sc, t), setN: (n) => setN(n), setR: (r) => setR(r), select: (i, j) => select(i, j), kick: (i, j, e) => kick(i, j, e),
    point: { cell: (i, j) => (geo.table ? at(geo.table.X(j) + geo.table.c / 2, geo.table.Y(i) + geo.table.c / 2) : null) }
  };
  /** Cover: an N = 12 table knocked out of shape (‖Δ‖₂ = 0.3), beside the eigenvalues of its eight computed steps. */
  window.TRV_THUMB = () => { resize(12); S.r = 5; fRank.set(5); S.kicks = [{ i: 2, j: 7, eps: 0.3 }, { i: 9, j: 9, eps: -0.25 }]; S.i = 2; S.j = 7; setScene('heal', M); paint.now(); };
  cards.pick(cards.initial('dual_read'));   // a chapter may cite another card: ::: {.viz src="self-referential-table" preset="heal"}
  booting = false;
  paint();
})();
