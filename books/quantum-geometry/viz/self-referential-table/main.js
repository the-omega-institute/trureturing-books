/* ORTHO//TABLE · 同像自指表: one N × N table T = Σₐ vₐvₐᵀ (a = 1 … r), vₐ the first r discrete cosine vectors of ℝᴺ.
   T is real symmetric and idempotent, so row i used as a ruler on column j gives back Σₖ TᵢₖTₖⱼ = Tᵢⱼ.
     rank  the rail is the rank r = 1 … N; the diagonal Tₖₖ adds up to the trace, which equals r; at r = N, T = I.
     read  the rail adds the products TᵢₖTₖⱼ one at a time; for a diagonal cell every term is the square Tₖⱼ².
     heal  clicks add ε to Tᵢⱼ and Tⱼᵢ (Δ stays symmetric); T₀ = T + Δ, Tₘ₊₁ = 3Tₘ² − 2Tₘ³; the side panel shows the
           eigenvalues of Tₘ (Jacobi rotations), pulled towards 0 and 1 by x ↦ 3x² − 2x³.
     perp  ψ(θ) = cos θ·v₁ + sin θ·w with w = v_{r+1} orthogonal to every vₐ; ‖Tψ‖ = cos θ, zero at 90°.
   Colours: cyan = positive entries, the part kept by T (eigenvalues above ½); magenta = negative entries, the
   complement (eigenvalues below ½); amber = the current cell, term, step or rank. Read-only probe: TABLE_DEBUG.
   The solid (kit.solid, the left or upper part of the stage): a glass unit ball of a 3D slice span{q₁, q₂, q₃} of ℝᴺ
   whose directions the matrix on the stage maps into themselves, and inside it the image of that ball, drawn as
   computed: q ↦ λq with λ = qᵀAq, so the image is the rod, disc or whole ball of a projection (λ ∈ {0, 1}), or the
   ellipsoid of semi-axes |λ| of a healing step. The slice of each scene:
     rank, perp, heal untouched   basis vectors: r = 1 → {v₂, v₃ | v₁}, r < N → {v₁, v₂ | v_{r+1}}, r = N → the last three
     read, r ≥ 3                  the plane of row i and column j (both in Im T) | v_{r+1} (in ker T), or any third at r = N
     heal with knocks             three eigenvectors of T₀ (Jacobi), common to every Tₘ, the most knocked ones
   The odd direction (after |) stands along the tilted normal n; the other two lie in the tilted plane. The table and
   the side panels are drawn on the flat canvas #flat over the WebGL canvas; #cv only keeps the parked frame. */
(() => {
  'use strict';
  const { kit, L } = TRV, { clamp, fix, v3, TAU } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const MINUS = '−', M = 8, DEG = Math.PI / 180, HEAL_SAFE = (Math.sqrt(3) - 1) / 2;

  /* ---------- linear algebra ---------- */
  const zeros = (n) => Array.from({ length: n }, () => new Array(n).fill(0));
  const mul = (A, B) => { const n = A.length, C = zeros(n); for (let i = 0; i < n; i++) for (let k = 0; k < n; k++) { const a = A[i][k]; if (a) for (let j = 0; j < n; j++) C[i][j] += a * B[k][j]; } return C; };
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
  /** Eigenpairs of a symmetric matrix by the same cyclic Jacobi rotations, accumulated: [{ val, vec }], ascending. */
  function eigsys(A0) {
    const n = A0.length, A = A0.map((r) => r.slice()), V = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (__, j) => (i === j ? 1 : 0)));
    for (let sweep = 0; sweep < 60; sweep++) {
      let off = 0; for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += A[p][q] * A[p][q];
      if (off < 1e-30) break;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
        if (Math.abs(A[p][q]) < 1e-300) continue;
        const th = (A[q][q] - A[p][p]) / (2 * A[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1));
        const c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < n; k++) { const akp = A[k][p], akq = A[k][q]; A[k][p] = c * akp - s * akq; A[k][q] = s * akp + c * akq; }
        for (let k = 0; k < n; k++) { const apk = A[p][k], aqk = A[q][k]; A[p][k] = c * apk - s * aqk; A[q][k] = s * apk + c * aqk; }
        for (let k = 0; k < n; k++) { const vkp = V[k][p], vkq = V[k][q]; V[k][p] = c * vkp - s * vkq; V[k][q] = s * vkp + c * vkq; }
      }
    }
    return A.map((r, i) => ({ val: r[i], vec: V.map((row) => row[i]) })).sort((a, b) => a.val - b.val);
  }
  const dotv = (a, b) => a.reduce((s, x, k) => s + x * b[k], 0);
  const unitv = (v) => { const n = norm(v); return v.map((x) => x / n); };
  /** v minus its components along the orthonormal vectors of `basis`. */
  const orth = (v, basis) => basis.reduce((w, b) => { const d = dotv(w, b); return w.map((x, k) => x - d * b[k]); }, v.slice());
  /** The Rayleigh quotient qᵀAq of a unit vector q. */
  const rayl = (A, q) => dotv(q, matvec(A, q));
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
    cache = { key: key(), T, D, its, eigs, errs, dnorm, rankErrs, err: idemErr(T), sym: symErr(T), tr: trace(T) };
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
    const th = thetaOf() * DEG, v = dct(S.N, 0), w = hasPerp() ? dct(S.N, S.r) : new Array(S.N).fill(0);
    const psi = v.map((x, k) => Math.cos(th) * x + Math.sin(th) * w[k]);
    return { v, w, psi, Tpsi: matvec(derive().T, psi), Tw: matvec(derive().T, w) };
  };

  /* ---------- the 3D slice: three orthonormal directions of ℝᴺ that the matrix on the stage maps into themselves ---------- */
  const SUBD = '₀₁₂₃₄₅₆₇₈₉', subs = (n) => String(n).replace(/\d/g, (d) => SUBD[d]);
  /** Indices of the discrete cosine vectors of the canonical slice [in the plane, in the plane, along the normal]. */
  const canonIdx = (r, N) => (r === 1 ? [1, 2, 0] : r < N ? [0, 1, r] : [N - 3, N - 2, N - 1]);
  /** The healing slice of the current knocks: three eigenvectors of T₀ (so of every Tₘ), the most knocked ones; two
      the iteration keeps (eigenvalue above ½ at the last step) in the plane and one it drops along the normal. */
  function healPick() {
    const D = derive();
    if (D.hs) return D.hs;
    const es = eigsys(D.its[0]).map((e) => ({ vec: e.vec, l0: e.val, lm: D.its.map((X) => rayl(X, e.vec)) }));
    const K = es.filter((e) => e.lm[M] > 0.5).sort((a, b) => Math.abs(b.l0 - 1) - Math.abs(a.l0 - 1));
    const Z = es.filter((e) => e.lm[M] <= 0.5).sort((a, b) => Math.abs(b.l0) - Math.abs(a.l0));
    const pick = K.length >= 2 && Z.length ? [K[0], K[1], Z[0]] : K.length === 1 ? [Z[0], Z[1], K[0]] : !Z.length ? [K[0], K[1], K[2]] : [Z[0], Z[1], Z[2]];
    D.hs = { pick, scale: Math.max(1, ...pick.map((e) => Math.max(...e.lm.map(Math.abs)))) };
    return D.hs;
  }
  /** The slice of the scene: Q = [q_a, q_b, q_c] (q_c along the normal), the matrix A on the stage, λ = qᵀAq along each
      (A maps each q to λq), kept = which of them the table keeps, names, and the scale the ball is drawn at. */
  function sliceNow() {
    const N = S.N, r = S.r, sc = S.scene, T = derive().T, A = shown();
    if (sc === 'heal' && S.kicks.length) {
      const H = healPick(), m = mOf();
      return { kind: 'heal', Q: H.pick.map((e) => e.vec), A, lam: H.pick.map((e) => e.lm[m]), kept: H.pick.map((e) => e.lm[M] > 0.5), names: ['q₁', 'q₂', 'q₃'], scale: H.scale, idx: null };
    }
    let Q, names, idx = null;
    if (sc === 'read' && r >= 3) {   // the plane of row i and column j (both in Im T), and one free direction (in ker T)
      const ri = T[S.i], cj = T.map((row) => row[S.j]), u1 = unitv(ri);
      let w2 = orth(cj, [u1]);
      for (let k = 0; norm(w2) < 1e-6 && k < r; k++) { const w = orth(dct(N, k), [u1]); if (norm(w) > 0.3) w2 = w; }
      const u2 = unitv(w2);
      let q3 = r < N ? dct(N, r) : null;
      for (let k = 0; !q3 && k < N; k++) { const w = orth(dct(N, k), [u1, u2]); if (norm(w) > 0.3) q3 = unitv(w); }
      Q = [u1, u2, q3]; names = ['', '', r < N ? `v${subs(r + 1)}` : ''];
    } else { idx = canonIdx(r, N); Q = idx.map((k) => dct(N, k)); names = idx.map((k) => `v${subs(k + 1)}`); }
    const lam = Q.map((q) => rayl(A, q));
    return { kind: 'proj', Q, A, lam, kept: lam.map((x) => x > 0.5), names, scale: 1, idx };
  }
  /** A vector of ℝᴺ in slice coordinates. */
  const sliceOf = (sl, v) => sl.Q.map((q) => dotv(q, v));
  /** Semi-axes of the image of the slice's unit ball: 1 or 0 for a projection, |λ| for a healing step. */
  const semiOf = (sl) => (sl.kind === 'proj' ? sl.kept.map((k) => (k ? 1 : 0)) : sl.lam.map(Math.abs));
  const FLAT = 0.004;   // a semi-axis below this (in units of the ball) is drawn flat
  const shapeOf = (sl) => { const nb = semiOf(sl).filter((x) => x > FLAT).length; return sl.kind === 'proj' && nb === 3 ? 'ball' : ['point', 'rod', 'disk', 'ellipsoid'][nb]; };

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
  /** A cited figure in a phone's frame (about 334 × 500): style.css tightens the same frames with the same query. */
  const compact = () => TRV.figure && !TRV.still && window.matchMedia('(max-width: 480px)').matches;
  /** str in lines no wider than w: one line at the largest size from fs down to minFs that fits, else broken at
      spaces (and between CJK characters) at minFs. Returns { lines, fs }. */
  function fitLines(ctx, str, w, fs, minFs, f) {
    const wid = (s, z) => { ctx.font = `${z}px ${face(f || 'body')}`; return ctx.measureText(s).width; };
    for (let z = fs; z >= minFs - 1e-9; z -= 0.5) if (wid(str, z) <= w) return { lines: [str], fs: z };
    const lines = []; let cur = '';
    for (const tk of str.match(/[⺀-鿿＀-￯]|[^\s⺀-鿿＀-￯]+|\s+/g) || []) {
      const t = cur + tk;
      if (cur.trim() && wid(t.trim(), minFs) > w) { lines.push(cur.trim()); cur = tk.trim() ? tk : ''; } else cur = t;
    }
    if (cur.trim()) lines.push(cur.trim());
    return { lines, fs: minFs };
  }
  /** Lines from fitLines at x (centred unless o.align says otherwise), from y down (or, with o.up, up to y), one line
      every fs + 2 pixels. */
  const drawLines = (ctx, fl, x, y, color, o) => fl.lines.forEach((s, k) => text(ctx, s, x, (o && o.up) ? y - (fl.lines.length - 1 - k) * (fl.fs + 2) : y + k * (fl.fs + 2), color,
    Object.assign({ size: fl.fs, face: 'body', align: 'center', base: (o && o.up) ? 'bottom' : 'top' }, o)));

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
    const a = Math.max(0.02, ...p.map(Math.abs), Math.abs(T[S.i][S.j]), Math.abs(sum)) * 1.18, cmp = words && geo.layout.mode === 'compact';
    // a phone's narrow panel: the title over it broken into lines that fit, the plot under them
    const ttl = cmp ? fitLines(cv.getContext('2d'), L(`第 ${S.i + 1} 行 × 第 ${S.j + 1} 列，逐项`, `row ${S.i + 1} × column ${S.j + 1}, term by term`), b.w - 4, 9.5, 8.5) : null;
    const g = kit.plot(cv, { x: [0.3, n + 3.2], y: [-a, a], pad: padOf(b, W, H, words ? (cmp ? 2 : 8) : 0, 0, cmp ? 6 + ttl.lines.length * (ttl.fs + 2) : words ? 18 : 0, words ? (cmp ? 16 : 22) : 0), clear: false });
    g.hline(0, P.lineHot, { width: 1 });
    for (let q = 0; q < n; q++) {
      const done = q < k, col = p[q] >= 0 ? P.cyan : P.magenta;
      g.rect(q + 0.62, 0, q + 1.38, p[q], col, { alpha: done ? 0.85 : 0.18 });
      if (q === k - 1) g.rect(q + 0.58, 0, q + 1.42, p[q] || 1e-9, P.amber, { fill: false, stroke: P.amber, width: lw(1.6) });
    }
    g.rect(n + 1.05, 0, n + 1.85, sum || 1e-9, P.amber, { alpha: 0.55, stroke: P.amber, width: lw(1.6), glow: 8 });
    g.rect(n + 2.15, 0, n + 2.95, T[S.i][S.j] || 1e-9, P.ink, { fill: false, stroke: P.ink, width: lw(1.4), strokeAlpha: 0.9 });
    if (words) {
      const fs = cmp ? 9 : clamp(b.w / 34, 9.5, 12);
      if (cmp) drawLines(g.ctx, ttl, b.x + b.w / 2, g.Y(a) - 3, P.dim, { up: true });
      else g.text(n / 2 + 0.5, a, L(`第 ${S.i + 1} 行 × 第 ${S.j + 1} 列，逐项`, `row ${S.i + 1} × column ${S.j + 1}, term by term`), P.dim, { align: 'center', base: 'bottom', dy: -4, size: fs, face: 'body' });
      for (let q = 0; q < n; q++) if (n <= 8 || q % 2 === 0 || q === k - 1) g.text(q + 1, -a, String(q + 1), q === k - 1 ? P.amber : P.dim, { align: 'center', base: 'top', dy: 4, size: fs });
      g.text(n + 1.45, -a, 'Σ', P.amber, { align: 'center', base: 'top', dy: 4, size: fs + 1 });
      g.text(n + 2.55, -a, 'Tᵢⱼ', P.ink, { align: 'center', base: 'top', dy: 4, size: fs + 1, face: 'body' });
    }
  }
  function drawRank(cv, b, W, H, words) {
    const T = derive().T, n = S.N, d = T.map((row, k) => row[k]), tr = d.reduce((s, x) => s + x, 0), cmp = words && geo.layout.mode === 'compact';
    const line = L(`N = ${n} 个地址，占了 r = ${S.r} 个；对角格加起来 = ${fix(tr, 3)}`, `N = ${n} addresses, r = ${S.r} taken; the diagonal adds up to ${fix(tr, 3)}`);
    // a phone's narrow panel: the sentence under the slots is broken into lines, and the two plots share what is left
    const fl = cmp ? fitLines(cv.getContext('2d'), line, b.w, 9.5, 8.5) : null, ch = cmp ? b.h - fl.lines.length * (fl.fs + 2) - 4 : b.h;
    const top = { x: b.x, y: b.y, w: b.w, h: ch * (cmp ? 0.66 : 0.62) }, bot = cmp ? { x: b.x, y: b.y + ch * 0.72, w: b.w, h: ch * 0.28 } : { x: b.x, y: b.y + b.h * 0.7, w: b.w, h: b.h * 0.3 };
    const g = kit.plot(cv, { x: [0.3, n + 0.7], y: [0, 1.12], pad: padOf(top, W, H, words ? (cmp ? 2 : 8) : 0, 0, words ? (cmp ? 14 : 18) : 0, words ? (cmp ? 14 : 18) : 0), clear: false });
    g.hline(1, P.lineHot, { dash: [4, 3] });
    for (let q = 0; q < n; q++) g.rect(q + 0.62, 0, q + 1.38, d[q], P.cyan, { alpha: 0.8 });
    const h = kit.plot(cv, { x: [0, n], y: [0, 1], pad: padOf(bot, W, H, words ? (cmp ? 2 : 8) : 0, words ? (cmp ? 2 : 8) : 0, 0, words && !cmp ? 18 : 0), clear: false });
    for (let q = 0; q < n; q++) h.rect(q + 0.06, 0.15, q + 0.94, 0.85, q < S.r ? P.cyan : P.dim, { alpha: q < S.r ? 0.75 : 0.1, stroke: q < S.r ? undefined : P.lineHot });
    h.rect(0, 0.04, tr, 0.96, P.amber, { fill: false, stroke: P.amber, width: lw(2), glow: 8 });
    if (words) {
      const fs = cmp ? 9 : clamp(b.w / 34, 9.5, 12);
      g.text((n + 1) / 2, 1.12, L('对角格 Tₖₖ', 'diagonal cells Tₖₖ'), P.dim, { align: 'center', base: 'bottom', dy: -2, size: fs, face: 'body' });
      for (let q = 0; q < n; q++) if (n <= 8 || q % 2 === 0) g.text(q + 1, 0, String(q + 1), P.dim, { align: 'center', base: 'top', dy: cmp ? 3 : 4, size: fs });
      if (cmp) { drawLines(h.ctx, fl, b.x, bot.y + bot.h + 4, P.ink, { align: 'left' }); return; }
      h.ctx.font = `${fs}px ${face('body')}`;
      const wl = h.ctx.measureText(line).width, fit = wl > b.w ? Math.max(8, fs * b.w / wl) : fs;   // shrunk to the width of the panel
      h.text(0, 0, line, P.ink, { base: 'top', dy: 4, size: fit, face: 'body' });
    }
  }
  function drawHeal(cv, b, W, H, words) {
    const D = derive(), m = mOf(), cmp = words && geo.layout.mode === 'compact';
    const g = kit.plot(cv, { x: [-0.58, 1.58], y: [-0.6, M + 0.6], pad: padOf(b, W, H, words ? (cmp ? 28 : 34) : 0, 4, words ? (cmp ? 15 : 18) : 0, words ? (cmp ? 14 : 18) : 0), clear: false });
    for (const x of [0, 1]) g.vline(x, P.lineHot, { width: 1.2 });
    g.vline(0.5, P.dim, { dash: [3, 3] });
    const yOf = (q) => M - q;
    g.rect(-0.58, yOf(m) - 0.42, 1.58, yOf(m) + 0.42, P.amber, { alpha: 0.07, stroke: P.amber, strokeAlpha: 0.6, width: lw(1) });
    const r = TRV.thumbMode ? 7 : clamp(b.h / 80, 3, 5);
    for (let q = 0; q <= m; q++) for (const x of D.eigs[q]) g.dot(clamp(x, -0.58, 1.58), yOf(q), x > 0.5 ? P.cyan : P.magenta, r, { alpha: q === m ? 1 : 0.5 });
    if (words) {
      const fs = cmp ? 9 : clamp(b.w / 34, 9.5, 12), every = cmp && Math.abs(g.Y(0) - g.Y(1)) < fs + 2 ? 2 : 1;   // rows too close: every other step named
      for (const [x, s] of [[0, '0'], [0.5, '½'], [1, '1']]) g.text(x, -0.6, s, P.dim, { align: 'center', base: 'top', dy: cmp ? 2 : 4, size: fs });
      for (let q = 0; q <= M; q++) if (q % every === 0 || q === m) g.text(-0.58, yOf(q), `m=${q}`, q === m ? P.amber : P.dim, { align: 'right', dx: -4, size: fs - 0.5 });
      g.text(0.5, M + 0.6, L('Tₘ 的本征值', 'eigenvalues of Tₘ'), P.dim, { align: 'center', base: 'bottom', dy: -2, size: fs, face: 'body' });
    }
  }
  function drawPerp(cv, b, W, H, words) {
    const n = S.N, th = thetaOf(), V = perpVecs(), cmp = words && geo.layout.mode === 'compact';
    const cap = L('灰：状态 ψ 的分量 · 青：读出 Tψ', 'grey: the entries of ψ · cyan: the reading Tψ');
    // a phone's narrow panel: the caption in lines over the bars, the two readings in lines of their own under them
    const ctx0 = cv.getContext('2d'), fcap = cmp ? fitLines(ctx0, cap, b.w - 2, 9.5, 8.5) : null;
    const rd = cmp ? [fitLines(ctx0, `‖Tψ‖ = cos θ = ${fix(Math.cos(th * DEG), 3)}`, b.w, 9, 8, 'data'), fitLines(ctx0, `‖(I − T)ψ‖ = sin θ = ${fix(Math.sin(th * DEG), 3)}`, b.w, 9, 8, 'data')] : null;
    const capH = cmp ? fcap.lines.length * (fcap.fs + 2) + 4 : 0, rdH = cmp ? rd.reduce((s, f) => s + f.lines.length * (f.fs + 2), 0) : 0;
    const top = cmp ? { x: b.x, y: b.y + capH, w: b.w, h: (b.h - capH - rdH - 12) * 0.72 } : { x: b.x, y: b.y, w: b.w, h: b.h * 0.7 };
    const bot = cmp ? { x: b.x, y: top.y + top.h + 4, w: b.w, h: (b.h - capH - rdH - 12) * 0.28 } : { x: b.x, y: b.y + b.h * 0.76, w: b.w, h: b.h * 0.24 };
    const a = Math.max(0.2, ...V.psi.map(Math.abs), ...V.v.map(Math.abs)) * 1.15;
    const g = kit.plot(cv, { x: [-a, a], y: [n + 0.6, 0.4], pad: padOf(top, W, H, words ? (cmp ? 14 : 22) : 0, 4, words && !cmp ? 18 : 0, cmp ? 0 : 4), clear: false });
    g.vline(0, P.lineHot, { width: 1 });
    for (let q = 0; q < n; q++) {
      g.rect(0, q + 0.62, V.psi[q], q + 0.98, P.ink, { alpha: 0.45 });
      g.rect(0, q + 1.02, V.Tpsi[q], q + 1.38, P.cyan, { alpha: 0.85 });
    }
    const h = kit.plot(cv, { x: [0, 1.05], y: [0, 3], pad: padOf(bot, W, H, words ? (cmp ? 14 : 22) : 0, 4, 0, words && !cmp ? 2 : 0), clear: false });
    h.rect(0, 1.75, Math.cos(th * DEG), 2.35, P.cyan, { alpha: 0.85 });
    h.rect(0, 0.2, Math.sin(th * DEG), 0.8, P.magenta, { alpha: 0.85 });
    h.vline(1, P.lineHot, { dash: [3, 3] });
    if (words) {
      const fs = cmp ? 9 : clamp(b.w / 34, 9.5, 12);
      if (cmp) {
        drawLines(g.ctx, fcap, b.x + b.w / 2, b.y, P.dim);
        for (let q = 0; q < n; q++) if (n <= 8 || q % 2 === 0) g.text(-a, q + 1, String(q + 1), P.dim, { align: 'right', dx: -3, size: fs });
        let y = bot.y + bot.h + 4;
        rd.forEach((f, k) => { drawLines(h.ctx, f, b.x, y, k ? P.magenta : P.cyan, { align: 'left', face: 'data' }); y += f.lines.length * (f.fs + 2); });
        return;
      }
      g.ctx.font = `${fs}px ${face('body')}`;
      const wc = g.ctx.measureText(cap).width, fc = wc > b.w - 22 ? Math.max(8, fs * (b.w - 22) / wc) : fs;   // shrunk to the width of the panel
      g.text(0, 0.4, cap, P.dim, { align: 'center', base: 'bottom', dy: -2, size: fc, face: 'body' });   // above row 1 (y runs down)
      for (let q = 0; q < n; q++) if (n <= 8 || q % 2 === 0) g.text(-a, q + 1, String(q + 1), P.dim, { align: 'right', dx: -4, size: fs });
      h.text(0, 2.4, `‖Tψ‖ = cos θ = ${fix(Math.cos(th * DEG), 3)}`, P.cyan, { base: 'bottom', size: fs });
      h.text(0, 0.85, `‖(I − T)ψ‖ = sin θ = ${fix(Math.sin(th * DEG), 3)}`, P.magenta, { base: 'bottom', size: fs });
    }
  }

  /* ---------- the solid: a glass unit ball of the slice and the image of that ball inside it (kit.solid) ----------
     The plane of q_a, q_b is tilted by TILT about the world y axis (towards +x), q_c stands along its normal NRM; the
     default camera looks down from about 42° (VIEW), 54° in azimuth to one side of that tilt. Seen from within about
     70° in azimuth of the tilt (the cos of the angle between the view and the normal stays above 1/√2), the plane (an
     opaque disc, ellipsoid or cut ball) lies between the viewer and the lower pole −q_c: that pole is hidden and the
     upper one seen, from the default view and after turning it some 105° the other way. Nothing of the solid is drawn
     outside its own box of the stage. */
  const TILT = 0.3, VIEW = [-0.62, 0.74];
  const NRM = [Math.sin(TILT), 0, Math.cos(TILT)], P1 = [Math.cos(TILT), 0, -Math.sin(TILT)], P2 = [0, 1, 0];
  const EA = v3.scale(v3.add(P1, P2), Math.SQRT1_2), EB = v3.scale(v3.sub(P2, P1), Math.SQRT1_2), FRAME = [EA, EB, NRM];
  /** Slice coordinates (along q_a, q_b, q_c) → world point. */
  const toW = (c) => [0, 1, 2].map((d) => c[0] * EA[d] + c[1] * EB[d] + c[2] * NRM[d]);
  const AX = [[1, 0, 0], [0, 1, 0], [0, 0, 1]], ax = (k, t) => AX[k].map((x) => x * t);
  const L3 = { cxF: 0.5, cyF: 0.5, radF: 0.36 };   // where drawStage puts the ball (fractions of the stage), read by kit.solid
  const stage = kit.solid($('stage'), {
    canvas: $('cv'), wheel: false, yaw: VIEW[0], pitch: VIEW[1], onChange: () => paint(),
    get cx() { return L3.cxF; }, get cy() { return L3.cyF; }, get radius() { return L3.radF; },
    // a press on a cell of the table belongs to the table (selecting or knocking it); anywhere else it turns the ball
    onPick: (ev) => !!cellAt(ev)
  });

  /** Draw the slice: the glass unit ball, the image of the ball (opaque, lit), its axes, arrows, beads and labels.
      Returns what it drew, in slice and world coordinates, for the probe. */
  function drawSolid(st, sl, shape) {
    const sc = S.scene, D3 = st.facing(), u = st.unit, s = semiOf(sl), kp = sl.kept, T = derive().T;
    const out = { scene: sc, kind: sl.kind, shape, Q: sl.Q.map((q) => q.slice()), lam: sl.lam.slice(), kept: kp.slice(), semi: s.slice(), scale: sl.scale,
      names: sl.names.slice(), frame: FRAME.map((e) => e.slice()), beads: [], read: null, perp: null };
    const near = (p, px) => v3.add(p, v3.scale(D3, px / u));   // moved towards the viewer: the same place on the screen, in front
    const bead = (key, c, color, r) => { const p = toW(c); st.bead(p, { key, color, r: r || 5 }); out.beads.push({ key, p, c: c.slice() }); };
    const O = [0, 0, 0], box = geo.ballBox;
    /** A label at a world point, moved sideways (never across the point) so that it stays inside the ball's box. */
    const tagIn = (key, p, html, cls, o) => {
      const q = st.p(p), half = 3.4 * String(html).replace(/<[^>]*>/g, '').length + 4, dx = (o && o.dx) || 0;
      const x = box ? clamp(q[0] + dx, box.x + half, box.x + box.w - half) : q[0] + dx;
      st.tag(key, p, html, cls, Object.assign({}, o, { dx: x - q[0] }));
    };
    /** An arrow lying on a disc: a halo of the stage colour under it, the arrow itself a few pixels in front. */
    const onDisc = (a, b, color, o, lift) => {
      const h = lift || 2.5, w = (o && o.width) || 2.4;
      st.line([near(toW(a), h - 2), near(toW(b), h - 2)], { color: P.stage, width: w + 3.4 });
      st.arrow(near(toW(a), h), near(toW(b), h), Object.assign({ color, width: w, headSize: 11 }, o));
    };
    const full = shape === 'ball';
    st.glass('glass', O, 1, { color: P.cyan, alpha: full ? 0.14 : 0.07, rim: full ? 0.65 : 0.5 });
    // in the read scene row i colours the image: cyan where it reads positive, magenta where negative
    const rc = sc === 'read' ? sliceOf(sl, T[S.i]) : null, rn = rc ? Math.hypot(rc[0], rc[1], rc[2]) : 1;
    const ramp = (c3) => (rc ? { colors: [P.magenta, P.cyan], range: [0, 1], value: (uu, vv) => clamp(0.5 + 8 * v3.dot(rc, c3(uu, vv)) / rn, 0, 1) } : { color: P.cyan });
    const grid = { every: [8, 3], alpha: 0.42 };   // spokes every 30°, rings at radius ¼, ½, ¾ and 1
    const discAt = (i, j, si, sj) => (uu, vv) => v3.add(ax(i, si * vv * Math.cos(uu)), ax(j, sj * vv * Math.sin(uu)));
    if (sl.kind === 'proj') {
      if (kp[0] && kp[1] && kp[2]) {          // the whole ball, cut open along the plane: the lower half and the cut lit
        const hemi = (uu, vv) => [Math.sin(vv) * Math.cos(uu), Math.sin(vv) * Math.sin(uu), -Math.cos(vv)], cut = discAt(0, 1, 1, 1);
        st.surface('body', (uu, vv) => toW(hemi(uu, vv)), Object.assign({ u: [0, TAU], v: [0, Math.PI / 2], nu: 96, nv: 24, alpha: 1 }, ramp(hemi)));
        st.surface('cut', (uu, vv) => toW(cut(uu, vv)), Object.assign({ u: [0, TAU], v: [0, 1], nu: 96, nv: 12, alpha: 1, grid }, ramp(cut)));
      } else if (kp[0] && kp[1]) {            // a disc: the plane is the image, the normal is read as 0
        const d = discAt(0, 1, 1, 1);
        st.surface('body', (uu, vv) => toW(d(uu, vv)), Object.assign({ u: [0, TAU], v: [0, 1], nu: 96, nv: 12, alpha: 1, grid }, ramp(d)));
        st.line([toW(ax(2, -1)), toW(ax(2, 1))], { color: P.magenta, width: 1.6, dash: [6, 4], alpha: 0.9 });
      } else if (kp[2]) {                     // a rod along the normal: the plane is read as 0
        const d = discAt(0, 1, 1, 1);
        st.surface('kernel', (uu, vv) => toW(d(uu, vv)), { u: [0, TAU], v: [0, 1], nu: 96, nv: 12, alpha: 1, color: P.magenta, grid });
        st.tube('rod', [toW(ax(2, -1)), toW(ax(2, 1))], { color: P.cyan, width: sc === 'read' ? 5 : 8, glow: 0.25 });
      }
    } else {                                  // a healing step: the ellipsoid of semi-axes |λ|, flat where |λ| vanishes
      const big = s.map((x) => x > FLAT), nb = big.filter(Boolean).length;
      // the colour of a point x of the image: the share of x/|x| that the limit keeps (cyan) or drops (magenta)
      const kw = (x) => { const n2 = x[0] * x[0] + x[1] * x[1] + x[2] * x[2]; return n2 > 0 ? x.reduce((t, y, k) => t + y * y * (kp[k] ? 1 : 0), 0) / n2 : 0.5; };
      if (nb === 3) {
        const pt = (uu, vv) => [s[0] * Math.sin(vv) * Math.cos(uu), s[1] * Math.sin(vv) * Math.sin(uu), s[2] * Math.cos(vv)];
        st.surface('body', (uu, vv) => toW(pt(uu, vv)), { u: [0, TAU], v: [0, Math.PI], nu: 96, nv: 48, alpha: 1, colors: [P.magenta, P.cyan], range: [0, 1], value: (uu, vv) => kw(pt(uu, vv)) });
      } else if (nb === 2) {
        const [i, j] = [0, 1, 2].filter((k) => big[k]), d = discAt(i, j, s[i], s[j]);
        st.surface('body', (uu, vv) => toW(d(uu, vv)), { u: [0, TAU], v: [0, 1], nu: 96, nv: 12, alpha: 1, grid, colors: [P.magenta, P.cyan], range: [0, 1], value: (uu) => kw(d(uu, 1)) });
      } else if (nb === 1) {
        const i = big.indexOf(true);
        st.tube('rod', [toW(ax(i, -s[i])), toW(ax(i, s[i]))], { color: kp[i] ? P.cyan : P.magenta, width: 8, glow: 0.25 });
      }
      // the three eigen-directions through the whole glass (dashed), and the principal semi-axes ±|λ| as lit rods:
      // inside the ellipsoid they are hidden by it; once it is flat they lie on the disc, just in front of it
      for (let k = 0; k < 3; k++) {
        st.line([toW(ax(k, -1)), toW(ax(k, 1))], { color: kp[k] ? P.cyan : P.magenta, width: 1.3, dash: [4, 4], alpha: 0.85 });
        if (s[k] > FLAT && nb < 3 && nb !== 1) st.tube(`semi${k}`, [near(toW(ax(k, -s[k])), 2), near(toW(ax(k, s[k])), 2)], { color: kp[k] ? P.cyan : P.magenta, width: 3.5, glow: 0.3 });
      }
    }
    // the two poles of the normal: the upper one in front of the plane, the lower one behind it
    const newest = (k) => sc === 'rank' && sl.idx && sl.idx[k] + 1 === S.r;
    const poleCol = kp[2] ? (newest(2) ? P.amber : P.cyan) : P.magenta;
    bead('pole+', [0, 0, 1], poleCol, 5); bead('pole-', [0, 0, -1], poleCol, 5);
    const tip = (c, t) => { const n = Math.hypot(c[0], c[1], c[2]) || 1; return c.map((x) => x * (1 + t / n)); };
    if (sl.kind === 'heal') {                 // the eigenvalues of Tₘ along the three directions; amber: where Tₘ sends q₃
      bead('step', ax(2, sl.lam[2]), P.amber, 5.5);
      for (let k = 0; k < 3; k++) tagIn(`n${k}`, toW(ax(k, Math.max(1, s[k]) + 0.17)), `<span class="${kp[k] ? 'c-cy' : 'c-mg'}">λ = ${fix(sl.lam[k], 3)}</span>`, 'num');
    } else if (sc === 'read') {               // row i and column j of the table, and the shadow of the column on the row
      const cc = sliceOf(sl, T.map((row) => row[S.j])), tij = T[S.i][S.j], sh = rc.map((x) => x * tij / (rn * rn));
      const lift = kp[0] && kp[1] ? 2.5 : 7;
      onDisc(O, cc, P.ink, { dash: [6, 4], width: 2 }, lift);
      onDisc(O, rc, P.ink, {}, lift + 1);
      if (Math.abs(tij) > 1e-9) st.line([near(toW(O), lift + 2), near(toW(sh), lift + 2)], { color: P.amber, width: 4.5 });
      st.line([near(toW(cc), lift), near(toW(sh), lift)], { color: P.ink, width: 1.2, dash: [3, 3], alpha: 0.6 });
      bead('read', sh, P.amber, 4.5);
      // “=” only where row i and column j are the same N numbers (a diagonal cell; or rank 1, every cell 1/N): tested
      // on all of ℝᴺ, not on the arrows. Arrows that merely land close together share one label, which says “≠”.
      const cj = T.map((row) => row[S.j]), equal = T[S.i].every((x, k) => Math.abs(x - cj[k]) <= 1e-12);
      const near3 = Math.hypot(rc[0] - cc[0], rc[1] - cc[1], rc[2] - cc[2]) < 0.15, label = equal ? 'equal' : near3 ? 'shared' : 'apart';
      if (label !== 'apart') {
        const rel = equal ? '=' : '≠', mid = rc.map((x, k) => (x + cc[k]) / 2);
        tagIn('row', toW(tip(equal ? rc : mid, 0.2)), L(`第 ${S.i + 1} 行 ${rel} 第 ${S.j + 1} 列`, `row ${S.i + 1} ${rel} column ${S.j + 1}`), 'raw ink');
      } else {
        tagIn('row', toW(tip(rc, 0.2)), L(`第 ${S.i + 1} 行`, `row ${S.i + 1}`), 'raw ink');
        tagIn('col', toW(tip(cc, 0.2)), L(`第 ${S.j + 1} 列`, `column ${S.j + 1}`), 'raw ink');
      }
      out.read = { i: S.i, j: S.j, rc: rc.slice(), cc, shadow: sh, tij, equal, label };
    } else if (sc === 'perp' && hasPerp()) {  // ψ(θ), its reading Tψ = cos θ·v₁ and the part sin θ·w in the complement
      const V = perpVecs(), ps = sliceOf(sl, V.psi), tp = sliceOf(sl, V.Tpsi), v1 = sliceOf(sl, V.v), w = sliceOf(sl, V.w), th = thetaOf() * DEG;
      const arc = [];
      for (let t = 0; t <= 30; t++) { const a = t / 30 * Math.PI / 2; arc.push(toW(v1.map((x, k) => Math.cos(a) * x + Math.sin(a) * w[k]))); }
      st.line(arc, { color: P.ink, width: 1.2, dash: [3, 4], alpha: 0.5 });
      // the sector ψ has swept, each radius coloured by how much of it the table reads (cos² of its angle)
      if (th > 0.02) st.surface('fan', (uu, vv) => toW(v1.map((x, k) => vv * (Math.cos(uu) * x + Math.sin(uu) * w[k]))),
        { u: [0, th], v: [0, 1], nu: Math.max(4, Math.round(th / DEG / 3)), nv: 6, alpha: 1, colors: [P.magenta, P.cyan], range: [0, 1], value: (uu) => Math.cos(uu) ** 2 });
      const lift = kp[0] && kp[1] ? 2.5 : 7;
      if (Math.hypot(tp[0], tp[1], tp[2]) > 0.02) onDisc(O, tp, P.cyan, { width: 3 }, lift);
      st.arrow(near(O, 1), near(toW(ps), 1), { color: P.ink, width: 2.4, headSize: 11 });
      if (Math.sin(th) > 0.01) st.tube('sin', [toW(tp), toW(ps)], { color: P.magenta, width: 4.5, glow: 0.3 });
      bead('psi', ps, P.ink, 4.5); bead('Tpsi', tp, P.cyan, 4.5);
      const wk = kp[0] && kp[1] ? 2 : 0;   // which slice axis w is: the normal (r ≥ 2) or the plane (r = 1)
      tagIn('psi', toW(ps), 'ψ', 'raw ink', { dx: -16, dy: -4 });
      tagIn('Tpsi', toW(tp), 'Tψ', 'raw c-cy', { dy: 15 });
      tagIn('w', toW(ax(wk, 1.12)), 'w', 'raw c-mg', { dx: 16 });
      out.perp = { theta: thetaOf(), ps, tp, v1, w, tube: [tp, ps] };
    } else {                                  // the basis vectors of the slice: kept ones as arrows, free ones dashed
      for (let k = 0; k < 3; k++) {
        const col = newest(k) ? P.amber : P.ink;
        if (kp[k] && !(k === 2 && !kp[0])) { if (k < 2) onDisc(O, ax(k, 1), col); else st.arrow(near(O, 1), near(toW(ax(2, 1)), 1), { color: col, width: 2.4, headSize: 11 }); }
        else if (!kp[k] && k < 2) st.line([near(O, 2), near(toW(ax(k, 1)), 2)], { color: P.ink, width: 1.6, dash: [5, 4], alpha: 0.8 });
        tagIn(`n${k}`, toW(ax(k, 1.17)), sl.names[k], newest(k) ? 'raw c-am' : kp[k] ? 'raw c-cy' : 'raw c-mg', k === 2 ? { dx: 14 } : undefined);
      }
    }
    return out;
  }

  /** The words under the ball: which slice it is and what the image is. */
  function captionOf(sl, shape) {
    const sc = S.scene, SH = { point: ['一点', 'a point'], rod: ['杆', 'a rod'], disk: ['圆盘', 'a disc'], ball: ['整个球', 'the whole ball'], ellipsoid: ['椭球', 'an ellipsoid'] }[shape];
    const span = `⟨${sl.names.join(', ')}⟩`;
    if (sl.kind === 'heal') { const m = mOf(); return L(`示意切片：T₀ 的三条本征方向 · T${subs(m)} 的像：${SH[0]}`, `model slice: three eigen-directions of T₀ · image under T${subs(m)}: ${SH[1]}`); }
    if (sc === 'read') {
      const tij = num(derive().T[S.i][S.j]);
      return S.r >= 3 ? L(`示意切片：第 ${S.i + 1} 行与第 ${S.j + 1} 列所张的面${sl.names[2] ? ` + ${sl.names[2]}` : ''} · 内积 ${tij}`, `model slice: plane of row ${S.i + 1} and column ${S.j + 1}${sl.names[2] ? ` + ${sl.names[2]}` : ''} · dot product ${tij}`)
        : L(`示意切片 ${span} · 第 ${S.i + 1} 行 · 第 ${S.j + 1} 列 = ${tij}`, `model slice ${span} · row ${S.i + 1} · column ${S.j + 1} = ${tij}`);
    }
    if (sc === 'perp' && hasPerp()) return L(`示意切片 ${span}，w = ${S.r >= 2 ? sl.names[2] : sl.names[0]} · ‖Tψ‖ = cos θ = ${fix(Math.cos(thetaOf() * DEG), 3)}`, `model slice ${span}, w = ${S.r >= 2 ? sl.names[2] : sl.names[0]} · ‖Tψ‖ = cos θ = ${fix(Math.cos(thetaOf() * DEG), 3)}`);
    return L(`示意切片 ${span} · 单位球的像：${SH[0]}`, `model slice ${span} · image of the unit ball: ${SH[1]}`);
  }
  /** The caption centred under the ball in `w` pixels: one line, or two (split at the last " · ") if one does not fit. */
  function captionLines(ctx, str, w) {
    const fits = (s, fs) => { ctx.font = `${fs}px ${face('body')}`; return ctx.measureText(s).width <= w; };
    for (let fs = 11; fs >= 9; fs -= 0.5) if (fits(str, fs)) return { lines: [str], fs };
    const k = str.lastIndexOf(' · '), two = k > 0 ? [str.slice(0, k), str.slice(k + 3)] : [str];
    for (let fs = 10.5; fs >= 8; fs -= 0.5) if (two.every((s) => fits(s, fs))) return { lines: two, fs };
    // a narrow column (a phone's cited figure): each part broken at its spaces, so no line runs out of the column
    const lines = two.flatMap((s) => fitLines(ctx, s, w, 8.5, 8.5).lines);
    return { lines, fs: 8.5 };
  }

  /* ---------- the stage: the ball in its own box, the table and the side panel on the flat canvas ---------- */
  let geo = {};
  /** The three boxes of the stage (CSS pixels of the canvas): the ball on the left (wide) or on top (narrow). */
  function layoutOf(W, H, words) {
    if (!words) return { mode: 'cover', solid: { x: W * 0.02, y: H * 0.08, w: W * 0.36, h: H * 0.84 }, table: { x: W * 0.4, y: H * 0.08, w: W * 0.33, h: H * 0.84 }, panel: { x: W * 0.76, y: H * 0.1, w: W * 0.21, h: H * 0.8 } };
    const st = $('stage').getBoundingClientRect(), below = (el) => (el && el.getClientRects().length ? el.getBoundingClientRect().bottom - st.top : 0);
    if (compact()) {                          // a phone's cited figure: the ball as large as the width allows on the left,
      // the table over its side panel in the column on the right, between the title and the legend
      const top = below($('hudBig').parentElement) + 6, bottom = $('legend').offsetHeight + 22;
      const bx = { x: 10, y: top, w: W - 20, h: Math.max(120, H - top - bottom) };
      const w3 = Math.round(bx.w * 0.6), rx = bx.x + w3 + 8, rw = bx.w - w3 - 8, side = Math.min(rw, bx.h * 0.56);
      return { mode: 'compact', solid: { x: bx.x, y: bx.y, w: w3, h: bx.h }, table: { x: rx, y: bx.y, w: rw, h: side }, panel: { x: rx, y: bx.y + side + 8, w: rw, h: bx.h - side - 8 } };
    }
    const stEl = $('stage');
    stEl.classList.remove('legend-right');    // the legend is measured across the whole stage first
    const top = Math.max(46, below($('hudBig').parentElement), below($('sceneChips'))) + 10, bottom = Math.max(18, $('legend').offsetHeight + 20);
    const bx = { x: 18, y: top, w: W - 36, h: Math.max(80, H - top - bottom) };
    const wide = bx.w >= 520 && bx.w >= bx.h * 1.2;
    if (wide && bx.w >= bx.h * 2.05 && TRV.figure && !TRV.still) {
      // a cited figure in a book page: the ball's column runs from under the title to the foot of the stage, and the
      // legend keeps to the right of it, under the table and the side panel
      const cb = { x: bx.x, y: bx.y - 6, w: bx.w, h: H - bx.y - 12 };
      const w3 = Math.round(clamp(cb.h - 20, bx.w * 0.36, bx.w * 0.42)), rx = bx.x + w3 + 16, rw = bx.w - w3 - 16;
      stEl.style.setProperty('--fig-legend-left', `${rx}px`); stEl.classList.add('legend-right');
      const bh = Math.max(80, H - top - Math.max(18, $('legend').offsetHeight + 20)), pw = Math.round(bx.w * 0.27), side = Math.min(bh, rw - pw - 22);
      return { mode: 'columns', solid: { x: cb.x, y: cb.y, w: w3, h: cb.h }, table: { x: rx, y: bx.y, w: side, h: bh }, panel: { x: rx + side + 22, y: bx.y + 4, w: rw - side - 22, h: bh - 8 } };
    }
    if (wide && bx.w >= bx.h * 2.05) {        // short and wide (a cited figure, a still): ball | table | panel
      // the height decides the ball here: its column takes a little less from the HUD and the legend, and is as wide
      // as the ball can be tall; the side panel keeps its share of the width and the table takes what is left
      const cb = { x: bx.x, y: bx.y - 6, w: bx.w, h: bx.h + 10 };
      const w3 = Math.round(clamp(cb.h - 20, bx.w * 0.36, bx.w * 0.42)), rx = bx.x + w3 + 16, rw = bx.w - w3 - 16;
      const pw = Math.round(bx.w * 0.27), side = Math.min(bx.h, rw - pw - 22);
      return { mode: 'columns', solid: { x: cb.x, y: cb.y, w: w3, h: cb.h }, table: { x: rx, y: bx.y, w: side, h: bx.h }, panel: { x: rx + side + 22, y: bx.y + 4, w: rw - side - 22, h: bx.h - 8 } };
    }
    if (wide) {                               // the ball on the left, the table over the panel on the right
      const w3 = Math.round(bx.w * 0.54), rx = bx.x + w3 + 16, rw = bx.w - w3 - 16, side = Math.min(rw, bx.h * 0.54);
      return { mode: 'left', solid: { x: bx.x, y: bx.y, w: w3, h: bx.h }, table: { x: rx, y: bx.y, w: rw, h: side }, panel: { x: rx, y: bx.y + side + 14, w: rw, h: bx.h - side - 14 } };
    }
    const h3 = Math.round(clamp(bx.h * 0.42, 110, 270)), ry = bx.y + h3 + 10, rh = bx.h - h3 - 10, solid = { x: bx.x, y: bx.y, w: bx.w, h: h3 };
    if (rh >= bx.w * 0.95) { const side = Math.min(bx.w, rh * 0.56); return { mode: 'top', solid, table: { x: bx.x, y: ry, w: bx.w, h: side }, panel: { x: bx.x, y: ry + side + 14, w: bx.w, h: rh - side - 14 } }; }
    const side = Math.min(rh, bx.w * 0.5);
    return { mode: 'top', solid, table: { x: bx.x, y: ry, w: side, h: rh }, panel: { x: bx.x + side + 14, y: ry + 4, w: bx.w - side - 14, h: rh - 8 } };
  }
  function drawStage() {
    const flat = $('flat'), g0 = kit.plot(flat, { x: [0, 1], y: [0, 1], pad: [0, 0, 0, 0] }), ctx = g0.ctx, W = g0.W, H = g0.H, cv = flat;
    const words = !TRV.thumbMode, lay = layoutOf(W, H, words);
    geo.layout = Object.assign({ W, H }, lay);
    // the ball: sized to its box less the caption under it, centred in what is left
    const sl = sliceNow(), shape = shapeOf(sl), cap = words ? captionLines(ctx, captionOf(sl, shape), lay.solid.w) : { lines: [], fs: 0 };
    const capH = cap.lines.length * (cap.fs + 4) + (words ? 6 : 0), ball = { x: lay.solid.x, y: lay.solid.y, w: lay.solid.w, h: lay.solid.h - capH };
    // the glass and anything the image pokes out of it; a short stage lets the ball fill its column almost to the edge
    const tight = lay.mode === 'columns' || lay.mode === 'compact', unit = Math.max(16, Math.min(ball.w, ball.h) / 2 * Math.min(tight ? 0.97 : 0.9, (tight ? 1 : 0.97) / sl.scale));
    geo.ballBox = lay.solid;
    L3.cxF = (ball.x + ball.w / 2) / W; L3.cyF = (ball.y + ball.h / 2) / H; L3.radF = unit / (Math.min(W, H) * stage.cam.zoom);
    stage.begin();
    geo.solid = Object.assign(drawSolid(stage, sl, shape), { unit: stage.unit, center: [stage.cx, stage.cy], ball, caption: cap.lines.slice() });
    stage.end();
    cap.lines.forEach((s, k) => text(ctx, s, ball.x + ball.w / 2, ball.y + ball.h + 6 + (k + 0.5) * (cap.fs + 4), P.dim, { align: 'center', size: cap.fs, face: 'body' }));
    if (TRV.thumbMode) {   // wordless cover: the ball, the table and its eigenvalues snapping to 0 and 1
      const gx = lay.table.x + lay.table.w / 2, gr = gx - (lay.solid.x + lay.solid.w), glow = ctx.createRadialGradient(gx, H * 0.5, 0, gx, H * 0.5, gr);   // fades out before the ball
      glow.addColorStop(0, TRV.alpha(P.cyan, 0.08)); glow.addColorStop(1, TRV.alpha(P.cyan, 0)); ctx.fillStyle = glow; ctx.fillRect(gx - gr, 0, 2 * gr, H);
      geo.table = drawTable(ctx, lay.table, shown(), false);
      drawHeal(cv, lay.panel, W, H, false);
      return;
    }
    geo.table = drawTable(ctx, lay.table, shown(), true);
    const pb = lay.panel;
    if (pb.h < 40) return;
    if (S.scene === 'read') drawRead(cv, pb, W, H, true);
    else if (S.scene === 'rank') drawRank(cv, pb, W, H, true);
    else if (S.scene === 'heal') drawHeal(cv, pb, W, H, true);
    else if (hasPerp()) drawPerp(cv, pb, W, H, true);
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
    g.line(pts, P.cyan, { width: 2 });
    for (const p of pts) if (sc === 'heal' || sc === 'rank') g.dot(p[0], p[1], P.cyan, 3);
    g.vline(now, P.amber, { alpha: 0.8 });
    g.legend([[P.cyan, L('‖T² − T‖（对数）', '‖T² − T‖ (log)')]]);
    $('plotMeta').textContent = `${L(sc === 'heal' ? `第 ${now} 步` : '当前', sc === 'heal' ? `step ${now}` : 'now')} · ${nowV.toExponential(1).replace('-', MINUS)}`;
  }

  /* ---------- words ---------- */
  const LEGEND = {
    read: [['cy box', '正的格、正的乘积；圆盘上行读为正的一半', 'positive cells and products; the half disc the row reads as positive'], ['mg box', '负的格、负的乘积；读为负的一半', 'negative cells and products; the half read as negative'], ['am', '选中的格、刚加进来的一项；列在行上的影子', 'the chosen cell, the term just added; the column’s shadow on the row'], ['dm', '虚线：行（尺子）与列（被量）', 'dashed: the row (ruler) and the column (measured)']],
    rank: [['cy box', '正的格、对角格（越亮越大）；球里：像', 'positive cells, diagonal cells (brighter is larger); in the ball: the image'], ['mg box', '负的格；读成 0 的方向', 'negative cells; directions read as 0'], ['am', '对角格之和（迹）；刚写进的一行', 'the sum of the diagonal (trace); the newest row'], ['dm', '虚线框：对角线', 'dashed: the diagonal']],
    heal: [['cy box', '正的格；½ 以上的本征值及其方向', 'positive cells; eigenvalues above ½, their directions'], ['mg box', '负的格；½ 以下的本征值及其方向', 'negative cells; eigenvalues below ½, their directions'], ['am', '被碰的格、当前这一步', 'the knocked cell, the current step']],
    perp: [['cy box', '读出 Tψ、留在表里的 cos θ；圆盘：像', 'the reading Tψ, the cos θ kept by the table; the disc: the image'], ['mg box', '落在正交补里的 sin θ', 'the sin θ in the complement'], ['dm', '状态 ψ', 'the state ψ']]
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
      const m = mOf(), r0 = Math.round(trace(D.its[M]));
      big = S.kicks.length ? L(`第 ${m} 步 · 幂等误差 ${ex(D.errs[m])}`, `Step ${m} · idempotency error ${ex(D.errs[m])}`) : L('还没碰：点表里的一格', 'Untouched: click a cell of the table');
      hud = !S.kicks.length ? L('点一格，Tᵢⱼ 与 Tⱼᵢ 各加 ε，然后迭代 3T² − 2T³', 'a click adds ε to Tᵢⱼ and Tⱼᵢ, then 3T² − 2T³ is iterated')
        : L(`本征值被拉向 0 与 1 · 迭代后迹 = ${fix(trace(D.its[M]), 4)}（原表 ${S.r}）`, `eigenvalues pulled to 0 and 1 · trace after the iteration ${fix(trace(D.its[M]), 4)} (the table had ${S.r})`);
      note = !S.kicks.length ? L('没有扰动时 T 已经幂等，迭代一步也不动它。', 'Without a knock T is already idempotent and the iteration does not move it.')
        : D.dnorm < HEAL_SAFE ? L(`‖Δ‖₂ = ${fix(D.dnorm, 3)} < 0.366：回到一张秩 ${r0} 的幂等表，离原表 ${fix(frob(lin(1, D.its[M], -1, D.T)), 3)}（很近，但一般不是原表）。`, `‖Δ‖₂ = ${fix(D.dnorm, 3)} < 0.366: back to an idempotent table of rank ${r0}, at distance ${fix(frob(lin(1, D.its[M], -1, D.T)), 3)} from the original (close, but in general not the original).`)
          : D.dnorm < 0.5 ? L(`‖Δ‖₂ = ${fix(D.dnorm, 3)}，介于 0.366 与 ½ 之间：仍回到某个投影，秩是 ${r0}${r0 !== S.r ? '，变了' : ''}。`, `‖Δ‖₂ = ${fix(D.dnorm, 3)}, between 0.366 and ½: it still returns to some projection, of rank ${r0}${r0 !== S.r ? ' — changed' : ''}.`)
            : L(`‖Δ‖₂ = ${fix(D.dnorm, 3)} ≥ ½：不在保证收敛的范围里。`, `‖Δ‖₂ = ${fix(D.dnorm, 3)} ≥ ½: outside the range where convergence is guaranteed.`);
      setLabel('roKeyLabel', `幂等误差 ‖Tₘ² − Tₘ‖（第 ${m} 步）`, `Idempotency error ‖Tₘ² − Tₘ‖ (step ${m})`); $('roKey').textContent = ex(D.errs[m]);
      $('roKeySub').textContent = m > 0 && D.errs[m - 1] > 1e-14 ? L(`上一步 ${ex(D.errs[m - 1])}`, `previous step ${ex(D.errs[m - 1])}`) : '';
      setLabel('ro1Label', '扰动的大小 ‖Δ‖₂（谱范数）', 'Size of the knock ‖Δ‖₂ (spectral norm)'); $('ro1').textContent = `${fix(D.dnorm, 3)} · ${S.kicks.length} ${L('次', S.kicks.length === 1 ? 'knock' : 'knocks')}`;
    } else {
      const th = thetaOf(), V = perpVecs();
      big = hasPerp() ? `θ = ${fix(th, 0)}° · ‖Tψ‖ = ${fix(norm(V.Tpsi), 3)}` : L('表写满了：没有正交补', 'The table is full: no complement');
      hud = !hasPerp() ? L('r = N 时 T = I，任何状态都原样读回', 'at r = N, T = I and every state reads back unchanged') : th > 89.999 ? L('ψ 整个落在正交补里：读出 Tψ = 0', 'ψ lies entirely in the complement: the reading Tψ = 0') : L(`ψ = cos θ·v₁ + sin θ·w，w 与表里每一行正交`, `ψ = cos θ·v₁ + sin θ·w, with w orthogonal to every row of the table`);
      note = L('只有留在表里的那一份 cos θ 被读出来；转到 90°，表对 ψ 一个字也读不出。', 'Only the part cos θ that lies in the table gets read; at 90° the table reads nothing at all from ψ.');
      setLabel('roKeyLabel', '读出的长度 ‖Tψ‖', 'Length of the reading ‖Tψ‖'); $('roKey').textContent = hasPerp() ? `${fix(norm(V.Tpsi), 6)}` : '—';
      $('roKeySub').textContent = hasPerp() ? `cos ${fix(th, 1)}° = ${fix(Math.cos(th * DEG), 6)}` : '';
      setLabel('ro1Label', '正交补里的 w：‖Tw‖', 'The complement vector w: ‖Tw‖'); $('ro1').textContent = hasPerp() ? ex(norm(V.Tw)) : '—';
    }
    setLabel('ro2Label', '表的大小 · 秩', 'Size · rank'); $('ro2').textContent = `${S.N} × ${S.N} · r = ${S.r}`;
    setLabel('ro3Label', '迹（舞台上这张表）', 'Trace (the table on the stage)'); $('ro3').textContent = fix(trace(A), 4);
    setLabel('ro4Label', '‖T² − T‖ · ‖T − Tᵀ‖（舞台上这张表）', '‖T² − T‖ · ‖T − Tᵀ‖ (the table on the stage)'); $('ro4').textContent = `${ex(idemErr(A))} · ${ex(symErr(A))}`;
    $('roAside').textContent = sc === 'heal' ? 'Tₘ₊₁ = 3Tₘ² − 2Tₘ³' : 'T² = T, Tᵀ = T';
    $('hudBig').textContent = big; $('hudSub').textContent = hud; $('roNote').textContent = note;
    $('pillSize').querySelector('strong').textContent = `${S.N} × ${S.r}`;
    $('pillErr').querySelector('strong').textContent = ex(idemErr(A));
    const leg = LEGEND[sc].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
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
  function setN(n) {
    S.N = n; S.r = Math.min(S.r, n); S.i = Math.min(S.i, n - 1); S.j = Math.min(S.j, n - 1);
    S.kicks = S.kicks.filter((k) => k.i < n && k.j < n);
    $('rank').max = String(n); fRank.set(S.r); sizeChips.set(String(n), true);
    fitClock(S.scene === 'rank' ? S.r - 1 : undefined);
  }
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

  /* ---------- direct manipulation: click a cell (the stage listens: #flat never takes the pointer) ---------- */
  const cellAt = (ev) => {
    const g = geo.table; if (!g) return null;
    const b = $('flat').getBoundingClientRect(), j = Math.floor((ev.clientX - b.left - g.ox) / g.c), i = Math.floor((ev.clientY - b.top - g.oy) / g.c);
    return i >= 0 && j >= 0 && i < g.n && j < g.n ? [i, j] : null;
  };
  let downAt = null;
  $('stage').addEventListener('pointerdown', (ev) => { downAt = [ev.clientX, ev.clientY]; });
  $('stage').addEventListener('click', (ev) => {
    if (ev.target.closest('button, a, input, .chip')) return;
    if (downAt && Math.hypot(ev.clientX - downAt[0], ev.clientY - downAt[1]) > 6) return;   // the end of a turn of the ball
    const c = cellAt(ev); if (!c) return;
    leave();
    if (S.scene === 'heal') { kick(c[0], c[1]); clock.play(); }
    else if (S.scene === 'rank' || S.scene === 'perp') { S.i = c[0]; S.j = c[1]; setScene('read'); fitClock(); }
    else select(c[0], c[1]);
  });
  $('stage').addEventListener('pointermove', (ev) => {
    const c = ev.target.closest('button, a, input, .chip') ? null : cellAt(ev);
    $('stage').classList.toggle('on-cell', !!c);
    if (String(c) !== String(S.hover)) { S.hover = c; paint(); }
  });
  $('stage').addEventListener('pointerleave', () => { $('stage').classList.remove('on-cell'); if (S.hover) { S.hover = null; paint(); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    reset: { scene: 'rank', N: 8, r: 1 },
    expand_table: { scene: 'rank', N: 8, r: 1, play: true, still: 3 },
    full: { scene: 'rank', N: 8, r: 8 },
    dual_read: { scene: 'read', N: 4, r: 2, cell: [0, 3], play: true, still: 'end' },
    heal: { scene: 'heal', N: 8, r: 3, kicks: [{ i: 1, j: 4, eps: 0.3 }], play: true, still: 'end' },
    orthogonal_zero: { scene: 'perp', N: 8, r: 3, play: true, still: 'end' }
  };
  const NOTES = {
    reset: ['清空到一行：只写进常值向量，T 的每一格都是 1/8，八个对角格加起来是 1。下面八个地址槽只占了一个。', 'Cleared to one row: only the constant vector is written in, every cell of T is 1/8, and the eight diagonal cells add up to 1. Of the eight address slots below, one is taken.'],
    expand_table: ['一行一行写进两两正交的余弦向量：每多一行，对角格的和（琥珀色的框）就多 1，地址槽多占一个；条带里的幂等误差始终贴在机器精度上。', 'Orthogonal cosine vectors are written in one row at a time: each new row adds 1 to the sum of the diagonal (the amber frame) and takes one more address slot; the idempotency error in the strip stays at machine precision.'],
    full: ['r = N = 8：八个地址全被占满，表成了单位阵，青色只剩对角线。再也找不出与这八行都正交的第九个方向。', 'r = N = 8: all eight addresses are taken, the table is the identity, and cyan is left only on the diagonal. There is no ninth direction orthogonal to all eight rows.'],
    dual_read: ['第 1 行（横读，尺子）去读第 4 列（竖读，被量的状态）：四个乘积 T₁ₖTₖ₄ 有青有品红，逐项加起来（琥珀色的条）正好等于这一格 T₁₄（空心框）。点一个对角格，第 k 行与第 k 列是同一串数，乘积全是平方、全是青色，加起来回到 Tₖₖ 本身：这只是 T² = T 落在对角格上的一项，不是 Lawvere 对角线定理（无不动点时对角线逃出列表）的演示。', 'Row 1 (read across, the ruler) reads column 4 (read down, the state being measured): the four products T₁ₖTₖ₄, some cyan, some magenta, add up term by term (the amber bar) to exactly this cell T₁₄ (the hollow frame). Click a diagonal cell: row k and column k are the same numbers, so every product is a square, all cyan, and they add up to Tₖₖ itself. This is only T² = T read on a diagonal cell, not a picture of Lawvere’s diagonal theorem (the diagonal escaping every listing when there is no fixed point).'],
    heal: ['往 (2, 5) 与 (5, 2) 各加 0.3，表不再幂等。每迭代一步 3T² − 2T³，右边的本征值就向 0 与 1 靠拢，条带里的误差一步比一步小得多，几步就到机器精度。', 'Add 0.3 to (2, 5) and (5, 2) and the table is no longer idempotent. With each step of 3T² − 2T³ the eigenvalues on the right move towards 0 and 1, and the error in the strip drops much faster each step, reaching machine precision in a few steps.'],
    orthogonal_zero: ['ψ 从表里的常值向量 v₁ 转向与表里每一行都正交的 w：读出 Tψ（青色）随 cos θ 缩短，落在正交补里的 sin θ（品红）随之变长；到 90°，读出归零。', 'ψ turns from the constant vector v₁, which is in the table, towards w, which is orthogonal to every row of it: the reading Tψ (cyan) shrinks with cos θ while the part sin θ in the complement (magenta) grows; at 90° the reading is zero.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    S.N = p.N; $('rank').max = String(p.N); sizeChips.set(String(p.N), true);
    S.r = p.r; fRank.set(p.r);
    S.kicks = (p.kicks || []).map((k) => Object.assign({}, k));
    if (p.cell) { S.i = p.cell[0]; S.j = p.cell[1]; } else if (p.kicks) { S.i = p.kicks[0].i; S.j = p.kicks[0].j; }
    if (Math.abs(stage.cam.yaw - VIEW[0]) + Math.abs(stage.cam.pitch - VIEW[1]) + Math.abs(stage.cam.zoom - 1) > 1e-6) stage.view(VIEW, 450);   // a card shows its frame from the default view
    setScene(p.scene);
    if (!p.play) return;
    // a still (cover, cited figure for PDF/EPUB) and the opening view of the full page show the telling frame;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed)) { clock.set(p.still === 'end' ? clock.max : p.still); return; }
    clock.set(0);
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：点表里的一格、换场景、改 N 与秩、拖时间轴。随时可以再选一张卡。', 'Free play: click a cell, switch scenes, change N and the rank, scrub the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe for the browser suite, cover, start ---------- */
  const at = (x, y) => { const b = $('flat').getBoundingClientRect(); return { x: b.left + x, y: b.top + y }; };
  const plain = (o) => JSON.parse(JSON.stringify(o));
  const copy = (A) => A.map((r) => r.slice());
  window.TABLE_DEBUG = {
    get state() {
      const D = derive();
      return { scene: S.scene, N: S.N, r: S.r, i: S.i, j: S.j, eps: S.eps, kicks: S.kicks.map((k) => Object.assign({}, k)), t: clock.t, max: clock.max, playing: clock.playing,
        preset: cards.current, k: kOf(), m: mOf(), theta: thetaOf(), trace: D.tr, err: D.err, sym: D.sym, dnorm: D.dnorm, errs: D.errs.slice(), partial: partial(kOf()) };
    },
    T: () => copy(derive().T), shown: () => copy(shown()), delta: () => copy(derive().D), iterates: () => derive().its.map(copy), eigs: (m) => derive().eigs[m == null ? mOf() : m].slice(),
    basis: () => Array.from({ length: S.r }, (_, k) => dct(S.N, k)), products: () => products(), perp: () => { const V = perpVecs(); return { v: V.v, w: V.w, psi: V.psi, Tpsi: V.Tpsi, Tw: V.Tw, has: hasPerp() }; },
    seek: (t) => { clock.pause(); clock.set(t); }, scene: (sc, t) => setScene(sc, t), setN: (n) => setN(n), setR: (r) => setR(r), select: (i, j) => select(i, j), kick: (i, j, e) => kick(i, j, e),
    point: { cell: (i, j) => (geo.table ? at(geo.table.X(j) + geo.table.c / 2, geo.table.Y(i) + geo.table.c / 2) : null) },
    /** The solid as last drawn: slice Q (columns of ℝᴺ), λ = qᵀAq, kept, semi-axes drawn, frame (world axes of the
        slice), beads (world p, slice c), the read arrows or the ψ arrows (slice coordinates), unit, centre, boxes. */
    solid: () => (geo.solid ? plain(geo.solid) : null),
    /** The boxes of the stage (canvas CSS pixels): the ball, the table, the side panel; with the table's cell grid. */
    layout: () => (geo.layout ? plain(Object.assign({}, geo.layout, { cells: geo.table ? { ox: geo.table.ox, oy: geo.table.oy, c: geo.table.c, n: geo.table.n } : null })) : null)
  };
  /** Cover: an N = 12 table knocked out of shape, beside its eigenvalues snapping back to 0 and 1. */
  window.TRV_THUMB = () => { S.N = 12; S.r = 5; S.kicks = [{ i: 2, j: 7, eps: 0.3 }, { i: 9, j: 9, eps: -0.25 }]; S.i = 2; S.j = 7; setScene('heal', M); paint.now(); };
  cards.pick(cards.initial('dual_read'));   // a chapter may cite another card: ::: {.viz src="self-referential-table" preset="heal"}
  booting = false;
  paint();
})();
