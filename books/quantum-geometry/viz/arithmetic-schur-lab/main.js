/* ARITH//SCHUR · 整除图上的标量舒尔消元 · Scalar Schur elimination on the divisor graph
   The graph: vertices 2…N, an edge between unequal d and n when d | n; W its adjacency, L = diag(deg) − W, G = L + αI
   (α = 0.25). Vertex n sits at (v₂(n), v₃(n), log(n / 2^{v₂} 3^{v₃})), each coordinate centred and scaled.
   Two scenes on one 3D stage (kit.stage3, x right, z up):
     elim    the terminals (4n > 3N) are kept, the other vertices are eliminated one scalar at a time in the natural
             order or leaf-first (smallest current degree, ties to the larger label): G_ij ← G_ij − G_ip G_pj / G_pp over
             the neighbours of the pivot p, every new nonzero a fill edge (magenta). The counts are those of the Schur
             updates only (one division per neighbour, one multiplication and one subtraction per neighbour pair);
             building G, reducing b, the terminal solve, back substitution, the residual, the caches and the painting
             are not counted. The rail is the step k; the amber ring sits on the pivot of step k and can be dragged
             onto another vertex of the order. b = e_N is reduced along the same elimination, S x_T = b_T is solved,
             the rest back-substituted, and ‖Gx − b‖ is computed with the original G. ε drops the small off-diagonal
             entries of the final S (an approximation; no positive-definiteness or error bound is claimed). The DROP
             card uses N = 16, terminals 13…16, whose S has the couplings ≈ −0.125, −0.417, −0.285: ε = 0.2 removes the
             one between 14 and 15, so the discarded mass and the residual of the original system are visibly nonzero
             (at N = 12 the only coupling, ≈ −0.542, survives every ε ≤ 0.5).
     square  P = I − τL, τ = 1/(1 + max deg), squared d times by dense products: P^{2^d} as a weighted graph; the rail,
             the amber dot drawn on the violet gauge (also in stills) and the amber ring over it are d. The counts d·n³ and d·n²(n − 1) are those of the d dense
             products of the displayed algorithm; n² is the number of entries of one output matrix. The page itself
             computes and caches all levels 0…6 at once, so neither is the page's total work or storage, and no
             running-time claim is made.
     budget  the necessary budget of one signed orbit (a written derivation, not formalized): a complex smooth even g
             supported in [−R, R], F(z) = ∫ e^{−izx} g(x) dx, targets F(t + iη) ≈ +a and F(t − iη) ≈ −a with absolute
             error e = εa force ‖g‖₁·S ≥ a(1 − ε), S = min(1, R|t|)·sinh(R|η|). The stage is the window
             R ∈ [0, 8], |η| ∈ [0, 1/2], B ∈ [0, 32] in linear coordinates, B = L/a the normalized budget: the violet
             sheet is the necessary boundary B = (1 − ε)/S, the magenta region below it is excluded by this bound, and
             where the boundary is above the window the top of the window is magenta and labelled so. Above the sheet
             is only "not excluded by this bound". The rail is β (η = 1/2 − β, signed; the sheet uses |η|); the amber
             point is (R, |η|, B), its ring is dragged in the upright plane of fixed |η| (R sideways, B up and down),
             and dragging empty space orbits the camera of both canvases. The sheet is drawn with kit.solid on its own
             canvas under the camera of kit.stage3; at t = 0 or η = 0, S = 0 and the targets are incompatible.
   Every number is computed here. Read-only probe: window.ARITHMETIC_SCHUR_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp, v3 } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI;
  const ALPHA = 0.25, DMAX = 6;
  const sci = (x) => (x === 0 ? '0' : Math.abs(x) < 1e-3 ? x.toExponential(1).replace('e-', 'e−') : fix(x, 6));

  /* ---------- the divisor graph ---------- */
  const val = (n, p) => { let k = 0; while (n % p === 0) { n /= p; k++; } return k; };
  function buildGraph(N) {
    const labels = []; for (let n = 2; n <= N; n++) labels.push(n);
    const m = labels.length, W = Array.from({ length: m }, () => new Array(m).fill(0)), edges = [];
    for (let i = 0; i < m; i++) for (let j = i + 1; j < m; j++) if (labels[j] % labels[i] === 0) { W[i][j] = W[j][i] = 1; edges.push([i, j]); }
    const deg = W.map((r) => r.reduce((a, b) => a + b, 0));
    const G = W.map((r, i) => r.map((w, j) => (i === j ? deg[i] + ALPHA : -w)));
    const terminals = [], free = [];
    labels.forEach((n, i) => (4 * n > 3 * N ? terminals : free).push(i));
    const raw = labels.map((n) => { const a = val(n, 2), b = val(n, 3); return [a, b, Math.log(n / 2 ** a / 3 ** b)]; });
    const span = [0, 1, 2].map((k) => { const v = raw.map((r) => r[k]); return [Math.min(...v), Math.max(...v)]; });
    const scale = [2.4, 1.6, 2.0].map((s, k) => s / Math.max(1, span[k][1] - span[k][0]));
    const pos = raw.map((r) => r.map((x, k) => (x - (span[k][0] + span[k][1]) / 2) * scale[k]));
    const ext = [0, 1, 2].map((k) => [Math.min(...pos.map((p) => p[k])), Math.max(...pos.map((p) => p[k]))]);
    return { N, labels, m, W, deg, G, edges, terminals, free, raw, pos, ext, maxdeg: Math.max(...deg) };
  }

  /** Dense Gaussian elimination with partial pivoting: the solution of M x = r. */
  function gauss(M, r) {
    const n = r.length, A = M.map((row, i) => [...row, r[i]]);
    for (let c = 0; c < n; c++) {
      let piv = c; for (let i = c + 1; i < n; i++) if (Math.abs(A[i][c]) > Math.abs(A[piv][c])) piv = i;
      [A[c], A[piv]] = [A[piv], A[c]];
      for (let i = c + 1; i < n; i++) { const f = A[i][c] / A[c][c]; if (f) for (let j = c; j <= n; j++) A[i][j] -= f * A[c][j]; }
    }
    const x = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) { let s = A[i][n]; for (let j = i + 1; j < n; j++) s -= A[i][j] * x[j]; x[i] = s / A[i][i]; }
    return x;
  }

  /* ---------- scalar Schur elimination of the non-terminals ---------- */
  function eliminate(gr, rule) {
    const m = gr.m, A = gr.G.map((r) => Float64Array.from(r)), pat = gr.W.map((r) => r.map((w) => w !== 0)), alive = new Array(m).fill(true);
    const snap = () => ({ A: A.map((r) => Float64Array.from(r)), pat: pat.map((r) => r.slice()), alive: alive.slice() });
    const steps = [], snaps = [snap()];
    let fill = 0, mul = 0, add = 0, div = 0, minPivot = Infinity;
    for (let k = 0; k < gr.free.length; k++) {
      let p;
      if (rule === 'natural') p = gr.free[k];
      else {
        let best = -1, bd = Infinity;
        for (const i of gr.free) {
          if (!alive[i]) continue;
          let d = 0; for (let j = 0; j < m; j++) if (j !== i && alive[j] && pat[i][j]) d++;
          if (d < bd || (d === bd && gr.labels[i] > gr.labels[best])) { bd = d; best = i; }
        }
        p = best;
      }
      const nb = []; for (let j = 0; j < m; j++) if (j !== p && alive[j] && pat[p][j]) nb.push(j);
      const piv = A[p][p];
      minPivot = Math.min(minPivot, piv);
      const l = nb.map((i) => A[i][p] / piv); div += nb.length;
      const row = nb.map((j) => A[p][j]);
      for (let a = 0; a < nb.length; a++) for (let b = 0; b < nb.length; b++) { A[nb[a]][nb[b]] -= l[a] * row[b]; mul++; add++; }
      const created = [];
      for (let a = 0; a < nb.length; a++) for (let b = a + 1; b < nb.length; b++) {
        const i = nb[a], j = nb[b];
        if (!pat[i][j]) { pat[i][j] = pat[j][i] = true; fill++; created.push([i, j]); }
      }
      alive[p] = false;
      steps.push({ pivot: p, label: gr.labels[p], value: piv, degree: nb.length, nb, l, row, created, fill, mul, add, div, minPivot });
      snaps.push(snap());
    }
    const T = gr.terminals, S = T.map((i) => T.map((j) => A[i][j]));
    // b = e_N, reduced along the elimination; solve on the terminals, back-substitute, residual with the original G
    const b = new Array(m).fill(0); b[m - 1] = 1;
    const y = b.slice();
    for (const s of steps) for (let a = 0; a < s.nb.length; a++) y[s.nb[a]] -= s.l[a] * y[s.pivot];
    const solveWith = (Smat) => {
      const xT = gauss(Smat, T.map((i) => y[i])), x = new Array(m).fill(0);
      T.forEach((i, a) => { x[i] = xT[a]; });
      for (let k = steps.length - 1; k >= 0; k--) { const s = steps[k]; let r = y[s.pivot]; for (let a = 0; a < s.nb.length; a++) r -= s.row[a] * x[s.nb[a]]; x[s.pivot] = r / s.value; }
      const res = gr.G.map((g, i) => g.reduce((acc, v, j) => acc + v * x[j], 0) - b[i]);
      return { x, residual: Math.hypot(...res) };
    };
    const exact = solveWith(S);
    function drop(eps) {
      const Se = S.map((r) => r.slice()), dropped = [];
      let fro2 = 0;
      for (let a = 0; a < T.length; a++) for (let c = a + 1; c < T.length; c++) {
        const v = (S[a][c] + S[c][a]) / 2;
        if (v !== 0 && Math.abs(v) < eps) { fro2 += S[a][c] ** 2 + S[c][a] ** 2; Se[a][c] = Se[c][a] = 0; dropped.push([gr.labels[T[a]], gr.labels[T[c]]]); }
      }
      return { eps, S: Se, discarded: Math.sqrt(fro2), dropped, ...solveWith(Se) };
    }
    return { rule, steps, snaps, S, y, b, x: exact.x, residual: exact.residual, drop, fill, mul, add, div, minPivot: steps.length ? minPivot : null };
  }

  /* ---------- repeated squaring of P = I − τL ---------- */
  function squaring(gr) {
    const n = gr.m, tau = 1 / (1 + gr.maxdeg);
    const P0 = gr.W.map((r, i) => r.map((w, j) => (i === j ? 1 - tau * gr.deg[i] : tau * w)));
    const levels = [{ M: P0, mul: 0, add: 0 }];
    let mul = 0, add = 0;
    for (let d = 1; d <= DMAX; d++) {
      const A = levels[d - 1].M, C = Array.from({ length: n }, () => new Array(n).fill(0));
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        let s = A[i][0] * A[0][j]; mul++;
        for (let k = 1; k < n; k++) { s += A[i][k] * A[k][j]; mul++; add++; }
        C[i][j] = s;
      }
      levels.push({ M: C, mul, add });
    }
    for (const lv of levels) {
      let nnz = 0, minE = Infinity, rowErr = 0, inf = 0;
      for (const r of lv.M) { let s = 0, a = 0; for (const v of r) { if (v > 0) nnz++; minE = Math.min(minE, v); s += v; a += Math.abs(v); } rowErr = Math.max(rowErr, Math.abs(s - 1)); inf = Math.max(inf, a); }
      Object.assign(lv, { nnz, minEntry: minE, rowErr, infNorm: inf });
    }
    return { tau, n, levels };
  }

  const cache = new Map();
  function dataOf(N) {
    let D = cache.get(N);
    if (!D) {
      const gr = buildGraph(N);
      D = { gr, natural: eliminate(gr, 'natural'), leaf: eliminate(gr, 'leaf'), sq: null };
      cache.set(N, D);
    }
    return D;
  }
  const squareOf = (N) => { const D = dataOf(N); if (!D.sq) D.sq = squaring(D.gr); return D.sq; };

  /* ---------- the necessary budget of one signed orbit (ARGUED derivation; every value NUM) ---------- */
  const BUD_DOM = { R: [0.25, 8], t: [0, 4], beta: [0, 1], B: [0.25, 32], eps: [0, 0.95], a: [0.1, 10] };
  const WIN = { R: 8, h: 0.5, B: 32 };                                  // the window shown, all coordinates linear
  const BOX = { x: [-1.25, 1.25], y: [0.8, -0.8], z: [-0.8, 0.8] };    // |η| = 0 at the back, |η| = 1/2 in front
  const Xw = (R) => BOX.x[0] + (BOX.x[1] - BOX.x[0]) * R / WIN.R;
  const Yw = (h) => BOX.y[0] + (BOX.y[1] - BOX.y[0]) * h / WIN.h;
  const Zw = (B) => BOX.z[0] + (BOX.z[1] - BOX.z[0]) * B / WIN.B;
  const Rof = (x) => (x - BOX.x[0]) / (BOX.x[1] - BOX.x[0]) * WIN.R;
  const Bof = (z) => (z - BOX.z[0]) / (BOX.z[1] - BOX.z[0]) * WIN.B;
  const wpt = (R, h, B) => [Xw(R), Yw(h), Zw(B)];
  /** η = 1/2 − β on the grid of 10⁻⁴ that the rail and the slider share: exactly 0 at β = 1/2, signed. */
  const etaOf = (beta) => (5000 - Math.round(beta * 10000)) / 10000;
  const mOf = (R, t) => Math.min(1, R * Math.abs(t));
  const Sof = (R, t, h) => mOf(R, t) * Math.sinh(R * h);
  function budget(p) {
    const eta = etaOf(p.beta), h = Math.abs(eta), m = mOf(p.R, p.t), S = m * Math.sinh(p.R * h), need = 1 - p.eps;
    const collision = p.t === 0 ? 'even' : h === 0 ? 'coincident' : null;
    const Bmin = S > 0 ? need / S : null, product = p.B * S;
    const t2 = p.t * p.t, e2 = eta * eta, jet = Math.max(0, Math.abs(t2 - e2) - (t2 + e2) * p.eps);
    return {
      R: p.R, t: p.t, beta: p.beta, eta, h, B: p.B, eps: p.eps, a: p.a, m, S, need, Bmin, product, collision,
      verdict: S > 0 ? (product >= need ? 'not-excluded' : 'excluded') : 'incompatible',
      aboveWindow: Bmin != null && Bmin > WIN.B,
      abs: { a: p.a, L: p.a * p.B, e: p.eps * p.a, targets: [p.a, -p.a], Lmin: Bmin == null ? null : p.a * Bmin,
        L2min: S > 0 ? p.a * jet / S : null, sumMin: S > 0 ? p.a * (need + jet) / S : null },
      jet
    };
  }
  /** The boundary over the whole window for given t and ε (independent of R, β, B, a): the violet sheet where it lies
      in the window, the magenta top where it is above the window, the four magenta walls of the region it bounds and
      the data of each vertex [R, |η|, B]. The sheet runs over the columns R ≥ R_in (where it enters the window at
      |η| = 1/2) and in each column from |η|_clip(R) (B = 32 there) to 1/2 on a geometric grid, so that its steep part
      is sampled as finely as its flat part; the kink of m at R = 1/|t| is a column of its own. */
  const meshCache = new Map();
  function budgetMesh(t, eps) {
    const key = `${t}|${eps}`;
    let M = meshCache.get(key);
    if (M) return M;
    const need = 1 - eps, top = WIN.B, H = WIN.h, NU = 40, NV = 28, NC = 10, NVC = 8;
    const Bm = (R, h) => { const S = Sof(R, t, h); return S > 0 ? need / S : Infinity; };
    const hClip = (R) => { const m = mOf(R, t); return m > 0 && R > 0 ? Math.asinh(need / (m * top)) / R : Infinity; };
    let Rin = null;
    if (Bm(WIN.R, H) <= top) { let lo = 0, hi = WIN.R; for (let i = 0; i < 64; i++) { const mid = (lo + hi) / 2; if (Bm(mid, H) <= top) hi = mid; else lo = mid; } Rin = hi; }
    const kink = t !== 0 ? 1 / Math.abs(t) : null;
    const uniq = (xs) => xs.sort((a, b) => a - b).filter((x, i, a) => i === 0 || x - a[i - 1] > 1e-9);
    const cols = Rin == null ? [] : uniq(Array.from({ length: NU + 1 }, (_, i) => (i === NU ? WIN.R : Rin + (WIN.R - Rin) * i / NU)).concat(kink != null && kink > Rin && kink < WIN.R ? [kink] : []));
    const left = Rin == null ? Array.from({ length: NU + 1 }, (_, i) => WIN.R * i / NU) : Array.from({ length: NC }, (_, i) => Rin * i / NC);
    const capCols = uniq(left.concat(kink != null && kink > 0 && (Rin == null ? kink < WIN.R : kink < Rin) ? [kink] : []).concat(cols));
    const depth = (R) => Math.min(hClip(R), H);
    const sheet = Rin == null ? null : Array.from({ length: NV + 1 }, (_, j) => cols.map((R) => {
      const hc = depth(R), h = j === NV ? H : hc * Math.pow(H / hc, j / NV);
      return [R, h, Math.min(Bm(R, h), top)];
    }));
    const cap = Array.from({ length: NVC + 1 }, (_, j) => capCols.map((R) => [R, depth(R) * j / NVC, top]));
    const front = [capCols.map((R) => [R, H, 0]), capCols.map((R) => [R, H, Math.min(Bm(R, H), top)])];
    const hs = Rin == null ? Array.from({ length: NV + 1 }, (_, j) => H * j / NV)
      : cap.map((r) => r[r.length - 1][1]).concat(sheet.slice(1).map((r) => r[r.length - 1][1]));
    const right = [hs.map((h) => [WIN.R, h, 0]), hs.map((h) => [WIN.R, h, Math.min(Bm(WIN.R, h), top)])];
    const back = [[[0, 0, 0], [WIN.R, 0, 0]], [[0, 0, top], [WIN.R, 0, top]]];
    const side = [[[0, 0, 0], [0, H, 0]], [[0, 0, top], [0, H, top]]];
    const W = (rows) => rows && rows.map((r) => r.map((q) => wpt(q[0], q[1], q[2])));
    M = { t, eps, Rin, kink, sheet, cap, front, right, back, side, world: { sheet: W(sheet), cap: W(cap), front: W(front), right: W(right), back: W(back), side: W(side) } };
    meshCache.set(key, M);
    return M;
  }
  /** The excluded region between the planes |η| = a and |η| = b (0 ≤ a ≤ b ≤ 1/2) as a closed body, in data rows
      [R, |η|, B]: its top (the violet sheet B = B_min where the boundary lies in the window, the magenta top B = 32
      where it is above it), the faces |η| = a and |η| = b (excluded from B = 0 up to min(B_min, 32)), the walls R = 0
      (S = 0 there: excluded up to the top) and R = 8, and the floor B = 0 (B·S = 0 < 1 − ε). The same B_min as
      budgetMesh; the sheet runs in each column from where it leaves the top (or from a) to b on a geometric grid, and
      the columns where the boundary crosses B = 32 in the planes a and b, and the kink R = 1/|t|, are columns of
      their own. With a = b only the face is drawn. */
  const bodyCache = new Map();
  function bodyOf(t, eps, a, b) {
    const key = `${t}|${eps}|${a}|${b}`;
    let Y = bodyCache.get(key);
    if (Y) return Y;
    const need = 1 - eps, top = WIN.B, H = WIN.h, NU = 40, NV = 24, NC = 10, NVC = 6, NS = 96, NW = 24;
    const Bm = (R, h) => { const S = Sof(R, t, h); return S > 0 ? need / S : Infinity; };
    const hClip = (R) => { const m = mOf(R, t); return m > 0 && R > 0 ? Math.asinh(need / (m * top)) / R : Infinity; };
    const depth = (R) => Math.min(hClip(R), H), at = (R, h) => Math.min(Bm(R, h), top);
    const kink = t !== 0 ? 1 / Math.abs(t) : null;
    const uniq = (xs) => xs.sort((x, y) => x - y).filter((x, i, s) => i === 0 || x - s[i - 1] > 1e-9);
    const lin = (lo, hi, n) => Array.from({ length: n + 1 }, (_, i) => (i === n ? hi : lo + (hi - lo) * i / n));
    const inside = (x, lo, hi) => x != null && x > lo && x < hi;
    // the column where the boundary of the plane |η| = h comes down through B = 32 (null: above the window throughout)
    const enter = (h) => {
      if (!(Bm(WIN.R, h) <= top)) return null;
      let lo = 0, hi = WIN.R; for (let i = 0; i < 64; i++) { const mid = (lo + hi) / 2; if (Bm(mid, h) <= top) hi = mid; else lo = mid; }
      return hi;
    };
    const face = (h) => {
      const e = enter(h), Rs = uniq(lin(0, WIN.R, NS).concat(inside(kink, 0, WIN.R) ? [kink] : [], inside(e, 0, WIN.R) ? [e] : []));
      return [Rs.map((R) => [R, h, 0]), Rs.map((R) => [R, h, at(R, h)])];
    };
    Y = { t, eps, a, b, sheet: null, cap: null, faceA: face(a), faceB: a < b ? face(b) : null, r0: null, r8: null, floor: null };
    if (a < b) {
      // the sheet lies over the columns R > R_b (depth(R) < b), the top B = 32 over R < R_a (depth(R) > a)
      const Rb = enter(b), Ra = enter(a);
      const cs = Rb == null ? [] : uniq(lin(Rb, WIN.R, NU).concat(inside(kink, Rb, WIN.R) ? [kink] : [], inside(Ra, Rb, WIN.R) ? [Ra] : []));
      if (cs.length) Y.sheet = Array.from({ length: NV + 1 }, (_, j) => cs.map((R) => {
        const lo = Math.max(depth(R), a), h = j === NV ? b : j === 0 ? lo : lo * Math.pow(b / lo, j / NV);
        return [R, h, at(R, h)];
      }));
      const capEnd = Ra == null ? WIN.R : Ra, full = Rb == null ? capEnd : Math.min(Rb, capEnd);
      const cc = uniq(lin(0, full, Rb == null ? NU : NC).concat(cs.filter((R) => R <= capEnd), Ra != null ? [Ra] : [], inside(kink, 0, capEnd) ? [kink] : []));
      if (capEnd > 0) Y.cap = Array.from({ length: NVC + 1 }, (_, j) => cc.map((R) => {
        const hi = Math.max(a, Math.min(depth(R), b)), h = j === NVC ? hi : a + (hi - a) * j / NVC;
        return [R, h, top];
      }));
      const d8 = depth(WIN.R), g0 = Math.max(a, d8);
      const hs = uniq(lin(a, b, NW).concat(inside(d8, a, b) ? [d8] : [], g0 > 0 && g0 < b ? Array.from({ length: NW + 1 }, (_, j) => g0 * Math.pow(b / g0, j / NW)) : []));
      Y.r8 = [hs.map((h) => [WIN.R, h, 0]), hs.map((h) => [WIN.R, h, at(WIN.R, h)])];
      Y.r0 = [[[0, a, 0], [0, b, 0]], [[0, a, top], [0, b, top]]];
      Y.floor = [[[0, a, 0], [WIN.R, a, 0]], [[0, b, 0], [WIN.R, b, 0]]];
    }
    if (bodyCache.size > 48) bodyCache.clear();
    bodyCache.set(key, Y);
    return Y;
  }
  /** B_min clipped to the window top along a line of the window: the slice at fixed |η| (over R) and the rail (over β). */
  function sliceR(t, eps, h) {
    const out = [], kink = t !== 0 ? 1 / Math.abs(t) : null, Rs = Array.from({ length: 97 }, (_, i) => WIN.R * i / 96);
    if (kink != null && kink < WIN.R) Rs.push(kink);
    Rs.sort((a, b) => a - b);
    for (const R of Rs) { const S = Sof(R, t, h); out.push([R, S > 0 ? Math.min((1 - eps) / S, WIN.B) : WIN.B, S > 0 && (1 - eps) / S <= WIN.B]); }
    return out;
  }
  function sliceBeta(R, t, eps) {
    const out = [];
    for (let i = 0; i <= 200; i++) { const beta = i / 200, S = Sof(R, t, Math.abs(etaOf(beta))); out.push([beta, S > 0 ? Math.min((1 - eps) / S, WIN.B) : WIN.B, S > 0 && (1 - eps) / S <= WIN.B]); }
    return out;
  }
  /** 4 significant digits, U+2212 minus, an exponent for the very large or small (never Infinity or NaN). */
  const sig = (x, d = 4) => {
    if (x == null || !isFinite(x)) return '—';
    if (x === 0) return '0';
    const a = Math.abs(x);
    if (a >= 1e5 || a < 1e-3) return x.toExponential(d - 2).replace('e+', 'e').replace('e-', 'e−').replace(/^-/, '−');
    return fix(x, Math.max(0, d - 1 - Math.floor(Math.log10(a))));
  };
  /** sig() without trailing zeros: 8 → "8", 0.75 → "0.75", 19.9917 → "19.99". */
  const trim = (x) => sig(x).replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
  const signed = (x, d) => (x > 0 ? '+' : '') + fix(x, d);
  const betaDigits = (beta) => (Math.round(beta * 10000) % 10 ? 4 : 3);

  /* ---------- state ---------- */
  const S = { scene: 'elim', N: 12, order: 'natural', eps: 0, bud: { R: 1, t: 1, beta: 0.45, B: 8, eps: 0, a: 1 } };
  const VIEWS = { elim: [-0.72, 0.4], square: [-0.72, 0.4], budget: [-0.38, 0.3] };
  const kNow = (D) => clamp(Math.floor(clock.t + 1e-9), 0, D.gr.free.length);
  const dNow = () => clamp(Math.floor(clock.t + 1e-9), 0, DMAX);
  /** β on the rail of the budget scene, on the grid of 10⁻⁴ (the rail itself is continuous). */
  const betaNow = () => clamp(Math.round(clock.t * 10000) / 10000, 0, 1);
  const railOf = (sc) => {
    if (sc === 'square') return { max: DMAX, rate: 0.7, step: 1 };
    if (sc === 'budget') return { max: 1, rate: 0.1, step: 0.01 };
    const f = dataOf(S.N).gr.free.length; return { max: f, rate: Math.max(0.5, f / 8), step: 1 };
  };
  const REF = v3.unit([0.35, 0.45, 0.82]);
  function arc(a, b, h) {
    const d = v3.sub(b, a), len = v3.len(d);
    let nrm = v3.cross(d, REF); if (v3.len(nrm) < 1e-6 * len) nrm = v3.cross(d, [1, 0, 0]);
    const c = v3.add(v3.lerp(a, b, 0.5), v3.scale(v3.unit(nrm), h * len));
    return Array.from({ length: 13 }, (_, i) => { const t = i / 12, u = 1 - t; return [0, 1, 2].map((k) => u * u * a[k] + 2 * u * t * c[k] + t * t * b[k]); });
  }
  const bulge = (gr, i, j) => { const a = gr.raw[i], b = gr.raw[j], steps = Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + (Math.abs(a[2] - b[2]) > 1e-9 ? 1 : 0); return 0.1 + 0.11 * Math.max(0, steps - 1); };
  const gauge = (gr) => { const x = gr.ext[0][1] + 0.55, y = gr.ext[1][0], z0 = gr.ext[2][0], z1 = Math.max(gr.ext[2][1], z0 + 1.2); return { x, y, z0, z1, at: (d) => [x, y, z0 + (z1 - z0) * d / DMAX] }; };
  function boxOf3(gr, withGauge) {
    const e = gr.ext, xs = [e[0][0] - 0.3, (withGauge ? gauge(gr).x : e[0][1]) + 0.3], ys = [e[1][0] - 0.3, e[1][1] + 0.3], zs = [e[2][0] - 0.3, Math.max(e[2][1], withGauge ? gauge(gr).z1 : e[2][1]) + 0.3];
    return xs.flatMap((x) => ys.flatMap((y) => zs.map((z) => [x, y, z])));
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; probe.style.position = 'absolute'; tagBox.appendChild(probe);
  const opts = { canvas: $('cv'), yaw: VIEWS.elim[0], pitch: VIEWS.elim[1], wheel: false, radius: 0.3, cx: 0.5, cy: 0.5, onChange: () => paint() };
  const st = kit.stage3(stageEl, opts);
  stageEl.classList.toggle('still', !!TRV.still);
  let FITCAM = VIEWS.elim.slice(), FIT = null, FRAME = null, BODY = null, dragging = null;
  /* The budget scene draws its body with kit.solid, under the camera of kit.stage3 (the solid does not orbit by
     itself: rotate false; the orbit of stage3 is copied over each frame). It is made the first time the budget scene
     is shown, so that the other cards fetch no three.js. #sv, the 2D canvas that keeps the solid's frame as a picture
     while its WebGL context rests, then becomes the first canvas of the stage, as kit.solid expects of its picture
     canvas; it sits behind #cv (style.css), which keeps the current point, the gap to the boundary and the labels on
     top. */
  const sopts = { canvas: $('sv'), rotate: false, wheel: false, onChange: () => paint() };
  let solid = null;
  const ensureSolid = () => {
    if (solid) return solid;
    stageEl.insertBefore($('sv'), $('cv'));
    return (solid = kit.solid(stageEl, sopts));
  };
  function solidOff() {
    if (!solid || !solid.active()) return;
    solid.active(false);
    const sv = $('sv'), c = sv.getContext('2d');
    c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, sv.width, sv.height);
  }

  function boxOf(el, sr) {
    if (!el || el.hidden || !el.getClientRects().length) return null;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return null;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return null;
    return { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
  }
  function hudBoxes() {
    const sr = stageEl.getBoundingClientRect(), out = [];
    for (const el of [$('hudTl'), $('sceneChips'), ...$('legend').children]) { const b = boxOf(el, sr); if (b) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 6); else bottom = Math.min(bottom, b.y - 6); }
    return { x: 16, y: top + 4, w: Math.max(40, W - 32), h: Math.max(60, bottom - top - 8) };
  }
  const basis = (cam) => { const cy = Math.cos(cam[0]), sy = Math.sin(cam[0]), cp = Math.cos(cam[1]), sp = Math.sin(cam[1]); return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp] }; };
  function fitTo(box, area, W, H) {
    const { R, U } = basis(FITCAM);
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const p of box) { const a = v3.dot(p, R), b = -v3.dot(p, U); x0 = Math.min(x0, a); x1 = Math.max(x1, a); y0 = Math.min(y0, b); y1 = Math.max(y1, b); }
    const unit = Math.max(16, Math.min(area.w / (x1 - x0), area.h / (y1 - y0)));
    opts.radius = unit / Math.max(1, Math.min(W, H));
    opts.cx = (area.x + area.w / 2 - unit * (x0 + x1) / 2) / Math.max(1, W);
    opts.cy = (area.y + area.h / 2 - unit * (y0 + y1) / 2) / Math.max(1, H);
  }

  const sizes = new Map();
  TRV.onLang(() => sizes.clear());
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizes.clear(); paint(); });
  function sizeOf(html, cls) {
    const k = `${TRV.lang()}|${cls}|${html}`;
    let s = sizes.get(k);
    if (!s) { probe.className = 'tag ' + cls; probe.innerHTML = html; probe.hidden = false; s = [probe.offsetWidth, probe.offsetHeight]; probe.hidden = true; if (s[0] > 0) sizes.set(k, s); }
    return s;
  }
  let LB = [], OBST = [], BOUNDS = null, PLACED = [];
  const meets = (a, b, m) => a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m;
  function want(key, world, html, cls, pri, dir) { if (!TRV.thumbMode) LB.push({ key, q: st.p(world), html, cls, pri, dir }); }
  function placeLabels(center) {
    const placed = [];
    LB.sort((a, b) => b.pri - a.pri);
    for (const l of LB) {
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      const d = l.dir || [l.q[0] - center[0] || 0.01, l.q[1] - center[1] || -1], base = Math.atan2(d[1], d[0]);
      let ok = null;
      for (const r of [6, 13, 22, 34]) {
        for (const da of [0, 0.5, -0.5, 1.0, -1.0, 1.6, -1.6, 2.3, -2.3, PI]) {
          const ux = Math.cos(base + da), uy = Math.sin(base + da), ext = Math.abs(ux) * w / 2 + Math.abs(uy) * h / 2;
          const b = { x: l.q[0] + ux * (r + ext) - w / 2, y: l.q[1] + uy * (r + ext) - h / 2, w, h };
          if (b.x < BOUNDS.x || b.y < BOUNDS.y || b.x + w > BOUNDS.x + BOUNDS.w || b.y + h > BOUNDS.y + BOUNDS.h) continue;
          if (placed.some((p) => meets(p, b, 2)) || OBST.some((p) => meets(p, b, 2))) continue;
          ok = b; break;
        }
        if (ok) break;
      }
      if (!ok) continue;
      placed.push(Object.assign({ key: l.key }, ok));
      st.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
    }
    PLACED = placed.map((p) => ({ key: p.key, x: p.x, y: p.y, w: p.w, h: p.h }));
  }

  /* ---------- drawing ---------- */
  function drawAxes(gr) {
    const e = gr.ext, o = [e[0][0] - 0.25, e[1][0] - 0.25, e[2][0] - 0.25];
    st.path([o, [e[0][1] + 0.15, o[1], o[2]]], { color: P.violet, width: 1.1, alpha: 0.7, fade: false });
    st.path([o, [o[0], e[1][1] + 0.15, o[2]]], { color: P.violet, width: 1.1, alpha: 0.7, fade: false });
    st.path([o, [o[0], o[1], e[2][1] + 0.15]], { color: P.violet, width: 1.1, alpha: 0.7, fade: false });
    want('ax2', [e[0][1] + 0.15, o[1], o[2]], 'v₂', 'raw c-vi', 2);
    want('ax3', [o[0], e[1][1] + 0.15, o[2]], 'v₃', 'raw c-vi', 2);
    want('axr', [o[0], o[1], e[2][1] + 0.15], 'log r', 'raw c-vi', 2);
  }
  function drawElim(M) {
    const { gr, E, k } = M, snap = E.snaps[k], pos = gr.pos, alive = snap.alive, isT = new Set(gr.terminals);
    drawAxes(gr);
    const step = k > 0 ? E.steps[k - 1] : null, cur = new Set(step ? step.created.map(([i, j]) => `${i}|${j}`) : []);
    const created = new Map(); E.steps.slice(0, k).forEach((s, idx) => s.created.forEach(([i, j]) => created.set(`${Math.min(i, j)}|${Math.max(i, j)}`, idx + 1)));
    const dropped = M.dropSet;
    // original edges: cyan between kept vertices, dim and dashed where a vertex is gone
    for (const [i, j] of gr.edges) {
      const pts = arc(pos[i], pos[j], bulge(gr, i, j));
      if (alive[i] && alive[j]) {
        const dz = dropped.has(`${i}|${j}`);
        st.path(pts, dz ? { color: P.cyan, width: 1.2, alpha: 0.5, dash: [4, 4], fade: false } : { color: P.cyan, width: 1.7, alpha: 0.9, fade: false });
      } else st.path(pts, { color: P.dim, width: 1, alpha: 0.4, dash: [3, 4], fade: false });
    }
    // fill edges created so far (magenta); those of this step are bold
    for (const [key] of created) {
      const [i, j] = key.split('|').map(Number);
      const pts = arc(pos[i], pos[j], bulge(gr, i, j));
      const isCur = cur.has(`${i}|${j}`) || cur.has(`${j}|${i}`), dz = dropped.has(key);
      if (alive[i] && alive[j]) st.path(pts, dz ? { color: P.magenta, width: 1.2, alpha: 0.55, dash: [4, 4], fade: false } : { color: P.magenta, width: isCur ? 3 : 2, alpha: 0.95, fade: false });
      else st.path(pts, { color: P.magenta, width: 1, alpha: 0.3, dash: [3, 4], fade: false });
    }
    // the pivot of step k: its star to the neighbours it had (amber)
    if (step) for (const j of step.nb) st.path([pos[step.pivot], pos[j]], { color: P.amber, width: 1.4, dash: [4, 3], fade: false });
    // vertices
    gr.labels.forEach((n, i) => {
      const isPiv = step && step.pivot === i;
      if (isPiv) st.dot(pos[i], 6, P.amber, { glow: 12, fade: false });
      else if (!alive[i]) st.dot(pos[i], 3, P.dim, { fade: false, alpha: 0.7 });
      else if (isT.has(i)) { st.dot(pos[i], 5, P.ink, { fade: false }); st.dot(pos[i], 8.5, P.ink, { ring: true, width: 1.4, fade: false }); }
      else st.dot(pos[i], 4.6, P.cyan, { fade: false });
      want(`n${n}`, pos[i], String(n), isPiv ? 'num c-am backed' : !alive[i] ? 'num dm backed' : isT.has(i) ? 'num backed' : 'num c-cy backed', isPiv ? 10 : isT.has(i) ? 8 : alive[i] ? 6 : 3);
    });
    const hIdx = step ? step.pivot : E.steps.length ? E.steps[0].pivot : null;
    return { handle: hIdx == null ? null : pos[hIdx] };
  }
  function drawSquare(M) {
    const { gr, sq, d } = M, pos = gr.pos, A = sq.levels[d].M, n = gr.m;
    drawAxes(gr);
    let wmax = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) wmax = Math.max(wmax, A[i][j]);
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      const w = A[i][j];
      if (!(w > 0)) continue;
      const r = Math.sqrt(w / wmax), orig = gr.W[i][j] === 1;
      st.path(arc(pos[i], pos[j], bulge(gr, i, j)), { color: orig ? P.cyan : P.magenta, width: 0.7 + 3 * r, alpha: 0.3 + 0.65 * r, fade: false });
    }
    gr.labels.forEach((lab, i) => {
      st.dot(pos[i], 2.5 + 5 * A[i][i], P.ink, { fade: false, alpha: 0.9 });
      want(`n${lab}`, pos[i], String(lab), 'num backed', 5);
    });
    // the violet gauge of d with its ticks
    const g = gauge(gr);
    st.path([g.at(0), g.at(DMAX)], { color: P.violet, width: 1.6, fade: false });
    for (let k = 0; k <= DMAX; k++) st.path([v3.add(g.at(k), [-0.06, 0, 0]), v3.add(g.at(k), [0.06, 0, 0])], { color: P.violet, width: 1.2, fade: false });
    want('g0', g.at(0), 'd = 0', 'raw c-vi', 4, [1, 0.2]);
    want('g6', g.at(DMAX), `d = ${DMAX}`, 'raw c-vi', 4, [1, -0.2]);
    // the current d on the gauge (amber), drawn on the canvas so that stills and the cover keep it when the HTML
    // handle is hidden; the labels keep clear of it
    const cur = g.at(d), cq = st.p(cur);
    st.dot(cur, 5.5, P.amber, { glow: 12, fade: false });
    OBST.push({ x: cq[0] - 10, y: cq[1] - 10, w: 20, h: 20 });
    return { handle: cur, marker: { x: cq[0], y: cq[1] } };
  }
  /** The window box of the budget scene and its twelve edges. */
  const budgetBox = (pad = 0) => [BOX.x[0] - pad, BOX.x[1] + pad].flatMap((x) => [BOX.y[0] + pad, BOX.y[1] - pad].flatMap((y) => [BOX.z[0] - pad, BOX.z[1] + pad].map((z) => [x, y, z])));
  const BOX_EDGES = (() => {
    const c = budgetBox(), out = [];
    for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) { const d = [0, 1, 2].filter((k) => c[i][k] !== c[j][k]); if (d.length === 1) out.push([c[i], c[j]]); }
    return out;
  })();
  function drawBudget(M) {
    const b = M.b, mesh = M.mesh, top = WIN.B, sc = ensureSolid();
    if (!sc.active()) sc.active(true);
    // the solid under the camera of stage3, fitted to the same box
    sopts.radius = opts.radius; sopts.cx = opts.cx; sopts.cy = opts.cy;
    Object.assign(sc.cam, { yaw: st.cam.yaw, pitch: st.cam.pitch, zoom: st.cam.zoom });
    const P0 = wpt(b.R, b.h, b.B), edge = b.Bmin == null ? null : wpt(b.R, b.h, Math.min(b.Bmin, top));
    sc.begin();
    for (const e of BOX_EDGES) sc.line(e, { color: P.dim, width: 1, alpha: 0.6 });
    // B ticks on the front-right upright edge: 8, 16, 24
    for (const B of [8, 16, 24]) sc.line([wpt(WIN.R, WIN.h, B), wpt(WIN.R - 0.18, WIN.h, B)], { color: P.dim, width: 1, alpha: 0.7 });
    // The excluded region is a lit, opaque body, cut open along the plane of fixed |η| where the handle moves: the part
    // on the far side of that plane from the camera is solid, and its cut face shows the excluded part of the plane
    // (magenta, below the boundary, up to the top of the window where the boundary is above it); the part on the
    // reader's side is only a veil. So the current point, which lies in that plane, is never inside the solid part.
    // The side follows the camera: |η| = 1/2 is in front (towards the reader) when cos(yaw) > 0.
    const near = Math.cos(st.cam.yaw) >= 0, solidPart = near ? [0, b.h] : [b.h, WIN.h], veilPart = near ? [b.h, WIN.h] : [0, b.h];
    const body = bodyOf(b.t, b.eps, solidPart[0], solidPart[1]), veil = bodyOf(b.t, b.eps, veilPart[0], veilPart[1]);
    const Wr = (rows) => rows.map((r) => r.map((q) => wpt(q[0], q[1], q[2])));
    const lit = (key, rows, color, s) => { if (rows) sc.surface(key, Wr(rows), Object.assign({ color, back: color, pick: false }, s)); };
    const cutFace = near ? (body.faceB || body.faceA) : body.faceA, farFace = near ? (body.faceB ? body.faceA : null) : body.faceB;
    lit('bSheet', body.sheet, P.violet, { grid: { every: [8, 6], alpha: 0.18 } });
    lit('bCap', body.cap, P.magenta);
    lit('bCut', cutFace, P.magenta);
    lit('bFar', farFace, P.magenta);
    lit('bRight', body.r8, P.magenta);
    lit('bSide', body.r0, P.magenta);
    lit('bFloor', body.floor, P.magenta);
    const veilOut = near ? veil.faceB : (veil.faceB ? veil.faceA : null);
    lit('vSheet', veil.sheet, P.violet, { alpha: 0.24, grid: { every: [8, 6], alpha: 0.22 } });
    lit('vCap', veil.cap, P.magenta, { alpha: 0.2 });
    lit('vOut', veilOut, P.magenta, { alpha: 0.1 });
    lit('vRight', veil.r8, P.magenta, { alpha: 0.1 });
    lit('vSide', veil.r0, P.magenta, { alpha: 0.07 });
    BODY = { near, solidPart, veilPart, body, veil };
    // in the plane of fixed |η|: the boundary (violet) along the top of the cut face, and the outline of the plane
    const cut = sliceR(b.t, b.eps, b.h);
    const slice = cut.filter((q) => q[2]).map((q) => wpt(q[0], b.h, q[1]));
    if (slice.length > 1) sc.line(slice, { color: P.violet, width: 2.6 });
    sc.line([wpt(0, b.h, 0), wpt(WIN.R, b.h, 0), wpt(WIN.R, b.h, top), wpt(0, b.h, top)], { color: P.dim, width: 1, alpha: 0.5, dash: [4, 4], close: true });
    // the current point, its foot on the floor, and the boundary above or below it
    sc.line([wpt(b.R, b.h, 0), P0], { color: P.amber, width: 1, alpha: 0.45, dash: [3, 4] });
    if (edge) sc.ring(edge, { color: P.violet, r: 7, normal: sc.facing(), key: 'bmin' });
    sc.bead(P0, { color: P.amber, r: 6, glow: 0.8, key: 'cur' });
    sc.end();
    // on the 2D canvas above the solid: the gap from B to the boundary (amber, dashed) and the point itself
    if (edge) st.path([P0, edge], { color: P.amber, width: 1.6, dash: [5, 4], fade: false });
    const q = st.p(P0);
    st.dot(P0, 3.2, P.amber, { fade: false });
    if (TRV.still || TRV.thumbMode) st.dot(P0, 9, P.amber, { ring: true, width: 2, fade: false });
    OBST.push({ x: q[0] - 12, y: q[1] - 12, w: 24, h: 24 });
    // labels: the actual values at the point and at the boundary, the window and the clipped top
    want('bP', P0, `B = ${fix(b.B, 2)}`, 'num c-am backed', 12, [1, 0.35]);
    if (b.Bmin == null) want('bM', P0, L(`S = 0：${b.collision === 'even' ? 't = 0，偶性' : 'η = 0，节点重合'}，目标不相容`, `S = 0: ${b.collision === 'even' ? 't = 0, evenness' : 'η = 0, nodes coincide'}; targets incompatible`), 'raw c-mg backed', 11, [-1, -0.6]);
    else want('bM', edge, b.aboveWindow ? `B<sub>min</sub> = ${sig(b.Bmin)} &gt; 32` : `B<sub>min</sub> = ${sig(b.Bmin)}`, 'num c-vi backed', 11, [-1, -0.5]);
    const capAt = mesh.cap[Math.floor(mesh.cap.length / 2)][Math.floor(mesh.cap[0].length / 4)];
    want('bCap', wpt(capAt[0], capAt[1], top), L('边界高于窗口 B = 32', 'boundary above the window B = 32'), 'raw c-mg backed', 3, [-0.4, -1]);
    want('axR', wpt(WIN.R * 0.5, WIN.h, 0), 'R ∈ [0, 8]', 'raw c-dm', 5, [0, 1]);
    want('axH', wpt(WIN.R, WIN.h * 0.5, 0), '|η| ∈ [0, 0.5]', 'raw c-dm', 5, [1, 0.5]);
    want('axB', wpt(0, WIN.h, top * 0.5), L('B ∈ [0, 32]，线性', 'B ∈ [0, 32], linear'), 'raw c-dm', 5, [-1, 0]);
    return { handle: P0, marker: { x: q[0], y: q[1] } };
  }

  function drawStage(M) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 24, y: 24, w: W - 48, h: H - 48 } : safeRect(W, H, huds);
    if (!dragging || !FIT) { FIT = { area }; fitTo(S.scene === 'budget' ? budgetBox(0.18) : boxOf3(M.gr, S.scene === 'square'), area, W, H); }
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = [];
    st.begin();
    if (S.scene !== 'budget') solidOff();
    const out = S.scene === 'elim' ? drawElim(M) : S.scene === 'square' ? drawSquare(M) : drawBudget(M);
    const hq = !thumb && !TRV.still && out.handle ? st.p(out.handle) : null;
    if (hq) OBST.push({ x: hq[0] - 16, y: hq[1] - 16, w: 32, h: 32 });
    placeHandle(hq);
    if (!thumb) placeLabels(st.p([0, 0, 0]));
    st.end();
    FRAME = { W, H, area: FIT.area, handle: hq ? { x: hq[0], y: hq[1] } : null, marker: out.marker || null, unit: st.unit, cx: st.cx, cy: st.cy };
  }

  /* ---------- the handle: the pivot of step k (elim), the gauge of d (square) ---------- */
  const handle = $('handle');
  function placeHandle(q) {
    handle.hidden = !q;
    const zh = S.scene === 'elim' ? '拖到另一个待消顶点上改变步数 k（← → 一步）' : S.scene === 'square' ? '沿紫色标尺拖动改变平方次数 d（← → 一次）' : '在 |η| 固定的竖直面里拖动：左右改 R，上下改 B（← → 改 R，↑ ↓ 改 B）';
    const en = S.scene === 'elim' ? 'Drag onto another vertex of the order to change the step k (← → one step)' : S.scene === 'square' ? 'Drag along the violet gauge to change the number of squarings d (← → one)' : 'Drag in the upright plane of fixed |η|: sideways for R, up and down for B (← → R, ↑ ↓ B)';
    if (handle.dataset.ariaEn !== en) { handle.dataset.ariaZh = zh; handle.dataset.ariaEn = en; }
    handle.setAttribute('aria-label', L(zh, en));
    if (q) { handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`; }
  }
  const local = (ev) => { const b = stageEl.getBoundingClientRect(); return [ev.clientX - b.left - stageEl.clientLeft, ev.clientY - b.top - stageEl.clientTop]; };
  /** The point (R, B) of the upright plane |η| = const under a stage pixel: the orthographic ray through the pixel
      meets the plane where the two projected axes of the plane, x and z, add up to the pixel. When the plane is seen
      edge-on (the two axes nearly parallel on screen), only B moves, along the projected z axis. */
  function budgetAt(pt) {
    const b = S.bud, h = Math.abs(etaOf(b.beta)), y0 = Yw(h), o = st.p([0, y0, 0]), ex = st.p([1, y0, 0]), ez = st.p([0, y0, 1]);
    const ax = ex[0] - o[0], ay = ex[1] - o[1], bx = ez[0] - o[0], by = ez[1] - o[1], det = ax * by - ay * bx;
    const rx = pt[0] - o[0], ry = pt[1] - o[1];
    let x = Xw(b.R), z;
    if (Math.abs(det) > 0.12 * Math.hypot(ax, ay) * Math.hypot(bx, by)) { x = (rx * by - ry * bx) / det; z = (ax * ry - ay * rx) / det; }
    else { const b2 = bx * bx + by * by, sx = rx - ax * x, sy = ry - ay * x; z = b2 > 1e-9 ? (sx * bx + sy * by) / b2 : Zw(b.B); }
    const r2 = (v) => Math.round(v * 100) / 100;
    return { R: clamp(r2(Rof(x)), BUD_DOM.R[0], BUD_DOM.R[1]), B: clamp(r2(Bof(z)), BUD_DOM.B[0], BUD_DOM.B[1]) };
  }
  function dragTo(pt) {
    const D = dataOf(S.N), gr = D.gr;
    if (S.scene === 'budget') { const q = budgetAt(pt); S.bud.R = q.R; S.bud.B = q.B; syncFields(); paint(); return; }
    if (S.scene === 'elim') {
      const E = D[S.order];
      let best = -1, bd = Infinity;
      E.steps.forEach((s, idx) => { const q = st.p(gr.pos[s.pivot]), d2 = (q[0] - pt[0]) ** 2 + (q[1] - pt[1]) ** 2; if (d2 < bd) { bd = d2; best = idx; } });
      if (best >= 0) clock.set(best + 1);
    } else {
      const g = gauge(gr), a = st.p(g.at(0)), b = st.p(g.at(DMAX)), dx = b[0] - a[0], dy = b[1] - a[1], d2 = dx * dx + dy * dy;
      if (d2 < 9) return;
      const s = ((pt[0] - a[0]) * dx + (pt[1] - a[1]) * dy) / d2;
      clock.set(clamp(Math.round(s * DMAX), 0, DMAX));
    }
    syncFields(); paint();
  }
  handle.addEventListener('pointerdown', (ev) => {
    if (ev.button > 0 || TRV.still) return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    dragging = { id: ev.pointerId }; handle.classList.add('dragging');
    try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events carry no capture */ }
  });
  handle.addEventListener('pointermove', (ev) => { if (!dragging || ev.pointerId !== dragging.id) return; ev.preventDefault(); dragTo(local(ev)); });
  const endDrag = (ev) => {
    if (!dragging || (ev && ev.pointerId != null && ev.pointerId !== dragging.id)) return;
    const id = dragging.id; dragging = null; handle.classList.remove('dragging');
    try { if (handle.hasPointerCapture(id)) handle.releasePointerCapture(id); } catch (e) { /* already released */ }
    paint();
  };
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    const k = ev.key;
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(k)) return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    const sgn = k === 'ArrowRight' || k === 'ArrowUp' ? 1 : -1;
    if (S.scene === 'budget') {
      const r2 = (v) => Math.round(v * 100) / 100;
      if (k === 'ArrowLeft' || k === 'ArrowRight') S.bud.R = clamp(r2(S.bud.R + 0.05 * sgn), BUD_DOM.R[0], BUD_DOM.R[1]);
      else S.bud.B = clamp(r2(S.bud.B + 0.25 * sgn), BUD_DOM.B[0], BUD_DOM.B[1]);
    } else clock.set(clamp(Math.floor(clock.t + 1e-9) + sgn, 0, clock.max));
    syncFields(); paint();
  });

  /* ---------- HUD, legend, readouts ---------- */
  const legendHtml = (items) => items.map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  const ORDER = { natural: ['自然次序', 'natural order'], leaf: ['叶优先', 'leaf first'] };
  function model() {
    if (S.scene === 'budget') return { budget: true, b: budget(S.bud), mesh: budgetMesh(S.bud.t, S.bud.eps) };
    const D = dataOf(S.N), gr = D.gr;
    if (S.scene === 'square') { const sq = squareOf(S.N); return { gr, sq, d: dNow() }; }
    const E = D[S.order], k = kNow(D), done = k === gr.free.length;
    const dr = E.drop(S.eps), dropSet = new Set();
    if (done && S.eps > 0) for (const [a, b] of dr.dropped) { const i = gr.labels.indexOf(a), j = gr.labels.indexOf(b); dropSet.add(`${Math.min(i, j)}|${Math.max(i, j)}`); }
    return { gr, D, E, k, done, dr, dropSet };
  }
  const nnzOf = (snap) => { let c = 0; snap.alive.forEach((a, i) => { if (!a) return; snap.alive.forEach((b, j) => { if (b && (i === j || snap.pat[i][j])) c++; }); }); return c; };
  const VERDICT = { excluded: ['此界排除', 'excluded by this bound'], 'not-excluded': ['此界未排除', 'not excluded by this bound'], incompatible: ['目标不相容', 'targets incompatible'] };
  const COLLIDE = { even: ['t = 0：z₋ = −z₊，偶性 F(z) = F(−z) 与 ±1 矛盾', 't = 0: z₋ = −z₊, and evenness F(z) = F(−z) contradicts ±1'], coincident: ['η = 0：两节点重合', 'η = 0: the two nodes coincide'] };
  function budgetHud(M) {
    const b = M.b, ineq = b.verdict === 'excluded' ? '&lt;' : '≥';
    const big = b.S > 0 ? `${L('必要预算', 'Necessary budget')} · B·S = ${sig(b.product)} ${ineq} 1 − ε = ${fix(b.need, 2)}` : `${L('必要预算', 'Necessary budget')} · S = 0 · ${L(...VERDICT.incompatible)}`;
    const head = `β = ${fix(b.beta, betaDigits(b.beta))} → η = ${signed(b.eta, betaDigits(b.beta))} · R = ${fix(b.R, 2)} · t = ${fix(b.t, 2)}`;
    const sub = b.S > 0 ? `${head} · B<sub>min</sub> = ${sig(b.Bmin)}${b.aboveWindow ? L('（高于窗口）', ' (above the window)') : ''} · ${L(...VERDICT[b.verdict])}` : `${head} · ${L(...COLLIDE[b.collision])}`;
    const legend = [['vi', L('必要边界 B·S = 1 − ε', 'necessary boundary B·S = 1 − ε')], ['mg', L('此界排除', 'excluded by this bound')],
      ['am', L('当前 (R, |η|, B) · 手柄', 'current (R, |η|, B) · handle')]];
    return { big, sub, legend };
  }
  function hudText(M) {
    if (M.budget) {
      const h = budgetHud(M);
      $('hudBig').innerHTML = h.big; $('hudSub').innerHTML = h.sub;
      const html = legendHtml(h.legend);
      if ($('legend').innerHTML !== html) $('legend').innerHTML = html;
      return;
    }
    let big, sub, legend;
    const gr = M.gr, tl = gr.terminals.map((i) => gr.labels[i]).join(', ');
    if (S.scene === 'elim') {
      const st0 = M.k ? M.E.steps[M.k - 1] : null, fillNow = st0 ? st0.fill : 0;
      big = `${L('舒尔消元', 'Schur elimination')} · ${L('填充', 'fill')} ${fillNow} · k = ${M.k}/${gr.free.length}`;
      sub = `${L(...ORDER[S.order])} · ${L('终端', 'terminals')} {${tl}} · ‖Gx − b‖ = ${sci(M.done && S.eps > 0 ? M.dr.residual : M.E.residual)}${M.done && S.eps > 0 ? ` · ε = ${fix(S.eps, 3)}` : ''}`;
      legend = [['cy', L('原边 · 未消去的点', 'original edges · kept vertices')], ['mg', L('填充边', 'fill edges')], ['ik', L('终端，保留到底', 'terminals, kept')],
        ['am', L('当前主元 · 手柄', 'current pivot · handle')], ['vi', L('轴 v₂ · v₃ · log r', 'axes v₂ · v₃ · log r')]];
    } else {
      const lv = M.sq.levels[M.d];
      big = `${L('反复平方', 'Repeated squaring')} · P<sup>${2 ** M.d}</sup> · nnz ${lv.nnz}/${gr.m * gr.m}`;
      sub = `d = ${M.d} · τ = 1/${1 + gr.maxdeg} · ${L('行和误差', 'row-sum error')} ${sci(lv.rowErr)} · ${L('不放大', 'no amplification')}`;
      legend = [['cy', L('P 原有的边（按权重）', 'edges of P (by weight)')], ['mg', L('P 没有的新非零元', 'new nonzeros, not in P')], ['vi', L('d 的标尺 · 轴', 'gauge of d · axes')], ['am', L('当前 d · 手柄', 'current d · handle')]];
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    const html = legendHtml(legend);
    if ($('legend').innerHTML !== html) $('legend').innerHTML = html;
  }
  const row = (cls, dt, dd) => `<div class="${cls}"><dt>${dt}</dt><dd>${dd}</dd></div>`;
  const matText = (Mx) => Mx.map((r) => r.map((v) => (v < 0 ? '−' : ' ') + Math.abs(v).toFixed(3)).join(' ')).join('\n');
  function budgetText(M) {
    const b = M.b, A = b.abs, d = betaDigits(b.beta), keyCls = b.verdict === 'not-excluded' ? 'key' : 'key ex';
    const keyB = b.S > 0 ? `${sig(b.product)} ${b.verdict === 'excluded' ? '&lt;' : '≥'} ${fix(b.need, 2)}` : 'S = 0';
    const rows = [
      `<div class="${keyCls}"><dt>${L('B·S 对 1 − ε（必要条件）', 'B·S against 1 − ε (a necessary condition)')}</dt><dd><b>${keyB}</b><span>${L(...VERDICT[b.verdict])}${b.collision ? ` · ${L(...COLLIDE[b.collision])}` : ''}</span></dd></div>`,
      row('', L('η = 1/2 − β（带号）· |η|', 'η = 1/2 − β (signed) · |η|'), `${signed(b.eta, d)} · ${fix(b.h, d)}`),
      row('', L('S = min(1, R|t|)·sinh(R|η|)', 'S = min(1, R|t|)·sinh(R|η|)'), `${fix(b.m, 3)} × ${sig(Math.sinh(b.R * b.h))} = ${sig(b.S)}`),
      row('v wide', L('必要下界 B<sub>min</sub> = (1 − ε)/S', 'Necessary floor B<sub>min</sub> = (1 − ε)/S'), b.Bmin == null ? L('无有限值：目标不相容', 'no finite value: targets incompatible') : `${sig(b.Bmin)}${b.aboveWindow ? L('（高于窗口 32）', ' (above the window, 32)') : ''}`),
      row('wide', L('绝对量：a · L = aB · e = εa · 目标 ±a · aB<sub>min</sub>', 'Absolute: a · L = aB · e = εa · targets ±a · aB<sub>min</sub>'),
        `${trim(A.a)} · ${trim(A.L)} · ${trim(A.e)} · ±${trim(A.a)} · ${A.Lmin == null ? '—' : trim(A.Lmin)}`),
      row('wide', L('二阶：‖g″‖<sub>1</sub> ≥ a·max(0, |t² − η²| − (t² + η²)ε)/S', 'Second order: ‖g″‖<sub>1</sub> ≥ a·max(0, |t² − η²| − (t² + η²)ε)/S'), A.L2min == null ? '—' : sig(A.L2min)),
      row('wide', L('实际对象 ρ = β + it · γ = t + iη', 'Actual object ρ = β + it · γ = t + iη'), `${fix(b.beta, d)} + ${fix(b.t, 2)}i · ${fix(b.t, 2)} ${b.eta < 0 ? '−' : '+'} ${fix(Math.abs(b.eta), d)}i`)
    ];
    const note = L('紫色边界之上只表示“未被此界排除”，不是存在、可行或算法的证明。改 a 时 L 与 e 一起缩放，归一化边界不动（韦伊二次型按 a² 缩放）。节点是通用的条件谱节点，不是 ζ 零点。',
      'Above the violet boundary means only “not excluded by this bound”, no proof of existence, feasibility or an algorithm. Changing a rescales L and e together and leaves the normalized boundary where it is (the Weil quadratic value scales by a²). The nodes are generic conditional spectral nodes, not zeta zeros.');
    $('roList').innerHTML = rows.join('');
    $('roNote').innerHTML = note;
    $('pillParam').innerHTML = `η <strong>${signed(b.eta, d)}</strong>`;
    $('pillKey').innerHTML = `B<sub>min</sub> <strong>${b.Bmin == null ? '—' : sig(b.Bmin)}</strong>`;
  }
  function drawText(M) {
    if (M.budget) { budgetText(M); return; }
    let rows, note, pill1, pill2;
    const gr = M.gr;
    if (S.scene === 'elim') {
      const E = M.E, k = M.k, s = k ? E.steps[k - 1] : null, D = M.D;
      const ops = s ? s : { mul: 0, add: 0, div: 0, fill: 0, minPivot: null };
      const Sdiff = Math.max(...D.natural.S.flatMap((r, i) => r.map((v, j) => Math.abs(v - D.leaf.S[i][j]))));
      rows = [
        `<div class="key"><dt>${L('填充边（本次序 · 至今 / 全程）', 'Fill edges (this order · so far / in all)')}</dt><dd><b>${ops.fill} / ${E.fill}</b><span>${L('自然', 'natural')} ${D.natural.fill} · ${L('叶优先', 'leaf')} ${D.leaf.fill}</span></dd></div>`,
        row('', L('当前舒尔块的非零元', 'Nonzeros of the current Schur block'), `${nnzOf(E.snaps[k])} · ${E.snaps[k].alive.filter(Boolean).length}²`),
        row('wide', L('舒尔更新的标量运算 × · − · ÷（至今；只计这些更新）', 'Schur-update scalar operations × · − · ÷ (so far; these updates only)'), `${ops.mul} · ${ops.add} · ${ops.div} ${L('（全程', '(in all ')}${E.mul} · ${E.add} · ${E.div})`),
        row('c', L('最小主元', 'Smallest pivot'), ops.minPivot == null ? '—' : fix(ops.minPivot, 6)),
        row('wide', L('精确消元：‖Gx − b‖ · 两种次序的 S 之差', 'Exact elimination: ‖Gx − b‖ · S of the two orders differ by'), `${sci(E.residual)} · ${sci(Sdiff)}`),
        row('m wide', L(`丢弃 ε = ${fix(S.eps, 3)}：丢掉的 ‖S − S̃‖<sub>F</sub> · 原方程残差 ‖Gx̃ − b‖ · 丢掉的对`, `Drop ε = ${fix(S.eps, 3)}: discarded ‖S − S̃‖<sub>F</sub> · residual ‖Gx̃ − b‖ of the original system · pairs dropped`),
          `${fix(M.dr.discarded, 6)} · ${sci(M.dr.residual)} · ${M.dr.dropped.length ? M.dr.dropped.map((p) => p.join('–')).join(', ') : L('无', 'none')}`),
        row('mat wide', L(`终端上的舒尔补 S（{${gr.terminals.map((i) => gr.labels[i]).join(', ')}}）`, `Schur complement S on the terminals ({${gr.terminals.map((i) => gr.labels[i]).join(', ')}})`), matText(E.S))
      ];
      const scope = L('运算数只计舒尔更新本身，不含建 G、约化 b、终端求解、回代、残差、缓存与绘制。', 'The operation counts cover the Schur updates only, not building G, reducing b, the terminal solve, back substitution, the residual, caches or painting.');
      note = (S.eps > 0 && M.dr.dropped.length
        ? L('丢弃是近似：丢掉的质量与原方程残差都离开零；页面不证明丢弃后的矩阵半正定，也不给误差定理。', 'Dropping is an approximation: the discarded mass and the residual of the original system both leave zero; the page proves no positive semidefiniteness after dropping and gives no error theorem.')
        : S.eps > 0
          ? L(`ε = ${fix(S.eps, 3)} 下没有非零耦合小于 ε：什么也没丢，残差仍在舍入量级。`, `At ε = ${fix(S.eps, 3)} no nonzero coupling is below ε: nothing is dropped and the residual stays at rounding level.`)
          : L('终端上的 S 与次序无关（代数恒等式）；填充与运算量随次序而变，这里只是这个例子。', 'S on the terminals does not depend on the order (an algebraic identity); fill and work depend on it, as this example shows.')) + L('', ' ') + scope;
      pill1 = `N <strong>${S.N}</strong>`; pill2 = `${L('填充', 'fill')} <strong>${ops.fill}</strong>`;
    } else {
      const sq = M.sq, lv = sq.levels[M.d], n = sq.n;
      rows = [
        `<div class="key"><dt>${L(`P<sup>${2 ** M.d}</sup> 的非零元（共 n² = ${n * n}）`, `Nonzeros of P<sup>${2 ** M.d}</sup> (of n² = ${n * n})`)}</dt><dd><b>${lv.nnz}</b><span>${L('P 本身', 'P itself')} ${sq.levels[0].nnz}</span></dd></div>`,
        row('', L('平方次数 d · 指数 2<sup>d</sup>', 'Squarings d · exponent 2<sup>d</sup>'), `${M.d} · ${2 ** M.d}`),
        row('wide', L('所示算法 d 次稠密乘积的标量运算：乘 d·n³ · 加 d·n²(n − 1)', 'Scalar operations of the d dense products of the displayed algorithm: × d·n³ · + d·n²(n − 1)'), `${lv.mul} · ${lv.add}`),
        row('', L('一个输出矩阵的元数 n²', 'Entries of one output matrix, n²'), `${n * n}`),
        row('wide', L('行和误差 max |Σ<sub>j</sub> − 1| · 最小元', 'Row-sum error max |Σ<sub>j</sub> − 1| · smallest entry'), `${sci(lv.rowErr)} · ${sci(lv.minEntry)}`),
        row('v wide', L('‖P<sup>2<sup>d</sup></sup>‖<sub>∞</sub>（非负、行随机 ⇒ 谱半径 ≤ 1，标准界）', '‖P<sup>2<sup>d</sup></sup>‖<sub>∞</sub> (nonnegative, row-stochastic ⇒ spectral radius ≤ 1, a standard bound)'), fix(lv.infNorm, 12))
      ];
      note = L('平方让权重在每个连通分支里摊开并收缩，不放大；不保证任何“共振爆发”，与黎曼猜想只是有条件的类比。运算数只计所示算法的 d 次稠密乘积，n² 只是一个输出矩阵的元数；页面实际一次算好并缓存了 d = 0…6 的全部层，所以这些数不是页面的总工作量或总存储，也不是任何运行时间的断言。',
        'Squaring spreads and contracts the weights inside each component and does not amplify them; no “resonance explosion” is guaranteed, and the analogy with the Riemann hypothesis is conditional. The counts are those of the d dense products of the displayed algorithm, and n² is only the number of entries of one output matrix; the page actually computes and caches all levels d = 0…6 at once, so these are not the total work or storage of the page, nor any running-time claim.');
      pill1 = `d <strong>${M.d}</strong>`; pill2 = `nnz <strong>${lv.nnz}</strong>`;
    }
    $('roList').innerHTML = rows.join('');
    $('roNote').innerHTML = note;
    $('pillParam').innerHTML = pill1; $('pillKey').innerHTML = pill2;
  }

  /* ---------- the strip ---------- */
  const PAD = [42, 12, 10, 22];
  function heat(cv, labels, value, kind, mark) {
    const n = labels.length, g = kit.plot(cv, { x: [0, n], y: [0, n], pad: [26, 8, 6, 16], equal: true });
    let vmax = 0; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) vmax = Math.max(vmax, Math.abs(value(i, j)));
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const v = value(i, j); if (!v) continue;
      const kd = kind(i, j), col = kd === 'diag' ? P.ink : kd === 'fill' ? P.magenta : P.cyan;
      g.rect(j + 0.06, n - i - 0.94, j + 0.94, n - i - 0.06, col, { alpha: 0.25 + 0.7 * Math.sqrt(Math.abs(v) / vmax) });
    }
    if (mark != null) g.rect(0, n - mark - 1, n, n - mark, P.amber, { fill: false, stroke: P.amber, width: 1.4 });
    const every = n > 14 ? 3 : n > 8 ? 2 : 1;
    labels.forEach((lab, i) => { if (i % every === 0) { g.text(-0.2, n - i - 0.5, String(lab), P.dim, { align: 'right', size: 9 }); g.text(i + 0.5, -0.15, String(lab), P.dim, { align: 'center', base: 'top', size: 9 }); } });
  }
  function budgetPlots(M, ca, cb) {
    const b = M.b, top = WIN.B;
    const curve = (g, pts) => {
      g.area(pts.map((q) => [q[0], q[1]]), P.magenta, { alpha: 0.22 });
      g.line(pts.map((q) => (q[2] ? [q[0], q[1]] : null)), P.violet, { width: 2 });
    };
    $('plotATitle').innerHTML = L('|η| 固定的切片：B 与 B<sub>min</sub>(R)', 'Fixed |η|: B against B<sub>min</sub>(R)');
    let g = kit.plot(ca, { x: [0, WIN.R], y: [0, top], pad: PAD });
    g.axes({ xTicks: [0, 2, 4, 6, 8], yTicks: [0, 16, 32], xLabel: 'R' });
    curve(g, sliceR(b.t, b.eps, b.h));
    g.dot(b.R, b.B, P.amber, 4.5);
    $('plotAMeta').textContent = `|η| = ${fix(b.h, betaDigits(b.beta))}`;
    $('plotBTitle').innerHTML = L('沿时间轴 β：β = 1/2 处没有有限的 B<sub>min</sub>', 'Along the rail β: no finite B<sub>min</sub> at β = 1/2');
    g = kit.plot(cb, { x: [0, 1], y: [0, top], pad: PAD });
    g.axes({ xTicks: [0, 0.25, 0.5, 0.75, 1], yTicks: [0, 16, 32], xLabel: 'β' });
    curve(g, sliceBeta(b.R, b.t, b.eps));
    g.vline(b.beta, P.amber, { alpha: 0.8 });
    g.dot(b.beta, b.B, P.amber, 4.5);
    $('plotBMeta').textContent = `B = ${fix(b.B, 2)}`;
  }
  function drawPlots(M) {
    const ca = $('plotA'), cb = $('plotB');
    if (TRV.thumbMode || !ca.clientWidth || !ca.clientHeight) return;
    if (M.budget) { budgetPlots(M, ca, cb); return; }
    const gr = M.gr;
    if (S.scene === 'elim') {
      const E = M.E, snap = E.snaps[M.k], idx = gr.labels.map((_, i) => i).filter((i) => snap.alive[i]);
      const pivNext = M.k < E.steps.length ? idx.indexOf(E.steps[M.k].pivot) : null;
      $('plotATitle').textContent = L('当前舒尔块（未消去的顶点）', 'The current Schur block (vertices not yet eliminated)');
      heat(ca, idx.map((i) => gr.labels[i]), (a, b) => snap.A[idx[a]][idx[b]], (a, b) => (a === b ? 'diag' : gr.W[idx[a]][idx[b]] ? 'orig' : 'fill'), pivNext >= 0 ? pivNext : null);
      $('plotAMeta').textContent = `${idx.length} × ${idx.length} · nnz ${nnzOf(snap)}`;
      $('plotBTitle').textContent = L('累计填充：自然次序与叶优先', 'Cumulative fill: natural order and leaf first');
      const f = gr.free.length, nat = M.D.natural.steps.map((s, i) => [i + 1, s.fill]), lf = M.D.leaf.steps.map((s, i) => [i + 1, s.fill]);
      const ymax = Math.max(1, M.D.natural.fill, M.D.leaf.fill) * 1.15;
      const g = kit.plot(cb, { x: [0, Math.max(1, f)], y: [0, ymax], pad: PAD });
      g.axes({ xTicks: Array.from({ length: f + 1 }, (_, i) => i).filter((i) => f <= 12 || i % 2 === 0), yTicks: [0, Math.round(ymax / 1.15)], xLabel: 'k' });
      g.line([[0, 0], ...nat], S.order === 'natural' ? P.ink : P.dim, { width: S.order === 'natural' ? 2.2 : 1.4, dash: S.order === 'natural' ? [] : [5, 3] });
      g.line([[0, 0], ...lf], S.order === 'leaf' ? P.ink : P.dim, { width: S.order === 'leaf' ? 2.2 : 1.4, dash: S.order === 'leaf' ? [] : [5, 3] });
      g.vline(M.k, P.amber, { alpha: 0.8 });
      g.legend([[S.order === 'natural' ? P.ink : P.dim, L('自然次序', 'natural'), S.order === 'natural' ? undefined : 'dash'], [S.order === 'leaf' ? P.ink : P.dim, L('叶优先', 'leaf first'), S.order === 'leaf' ? undefined : 'dash']], { right: false });
      $('plotBMeta').textContent = `${L('自然', 'natural')} ${M.D.natural.fill} · ${L('叶优先', 'leaf')} ${M.D.leaf.fill}`;
    } else {
      const sq = M.sq, A = sq.levels[M.d].M;
      $('plotATitle').textContent = L(`P 的 ${2 ** M.d} 次幂`, `P to the power ${2 ** M.d}`);
      heat(ca, gr.labels, (a, b) => A[a][b], (a, b) => (a === b ? 'diag' : gr.W[a][b] ? 'orig' : 'fill'), null);
      $('plotAMeta').textContent = `nnz ${sq.levels[M.d].nnz} / ${sq.n * sq.n}`;
      $('plotBTitle').textContent = L('非零元随 d 增加，行和一直是 1', 'The nonzeros grow with d, the row sums stay 1');
      const g = kit.plot(cb, { x: [-0.5, DMAX + 0.5], y: [0, sq.n * sq.n * 1.08], pad: PAD });
      g.axes({ xTicks: [0, 1, 2, 3, 4, 5, 6], yTicks: [0, sq.n * sq.n], xLabel: 'd' });
      sq.levels.forEach((lv, d) => g.rect(d - 0.32, 0, d + 0.32, lv.nnz, d === M.d ? P.amber : P.magenta, { alpha: d === M.d ? 0.85 : 0.45 }));
      g.hline(sq.n * sq.n, P.dim, { dash: [4, 3] });
      $('plotBMeta').textContent = `${L('行和误差', 'row-sum error')} ${sci(sq.levels[M.d].rowErr)}`;
    }
  }

  const paint = kit.painter(() => {
    const M = model();
    hudText(M); TRV.hudFit();
    drawStage(M); drawText(M); drawPlots(M);
  }, [stageEl, $('plotA'), $('plotB')]);

  /* ---------- the rail: the step k (elim), the number of squarings d (square) or β (budget) ---------- */
  // a card may stop its own playback at its still frame (BUDGET: at β = 0.45); any pause by the reader drops the stop
  let STOP = null;
  const railText = (t, max) => {
    if (S.scene === 'elim') return `k = ${Math.floor(t + 1e-9)} <small>/ ${Math.round(max)} ${L('步', 'steps')}</small>`;
    if (S.scene === 'square') return `d = ${Math.floor(t + 1e-9)} <small>P<sup>${2 ** Math.floor(t + 1e-9)}</sup></small>`;
    const be = clamp(Math.round(t * 10000) / 10000, 0, 1), dg = betaDigits(be);
    return `β = ${fix(be, dg)} <small>η = ${signed(etaOf(be), dg)}</small>`;
  };
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 9, t: 1, rate: 1, step: 1,
    format: railText,
    onChange: () => {
      if (S.scene === 'square') fD.set(dNow());
      if (S.scene === 'budget') {
        if (STOP != null && !clock.playing) STOP = null;
        else if (STOP != null && clock.t >= STOP - 1e-9) { const s = STOP; STOP = null; clock.pause(); clock.set(s); return; }
        S.bud.beta = betaNow(); fBbeta.set(S.bud.beta);
      }
      paint();
    }
  });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });

  /* ---------- controls ---------- */
  let booting = true;
  const leave = () => { STOP = null; cards.mark(null); clock.pause(); };
  const fN = kit.field($('size'), { fmt: (v) => String(Math.round(v)), onInput: (v) => { leave(); setSize(Math.round(v)); } });
  const fE = kit.field($('eps'), { fmt: (v) => fix(v, 3), onInput: (v) => { leave(); S.eps = clamp(v, 0, 0.5); paint(); } });
  const fD = kit.field($('depth'), { fmt: (v) => String(Math.round(v)), onInput: (v) => { leave(); clock.set(clamp(Math.round(v), 0, DMAX)); } });
  const orderChips = kit.chips($('orderChips'), 'order', (v) => { leave(); const end = clock.t >= clock.max - 1e-9; S.order = v === 'leaf' ? 'leaf' : 'natural'; if (end) clock.set(clock.max); paint(); });
  const r2 = (v) => Math.round(v * 100) / 100;
  const budField = (id, key, digits, round) => kit.field($(id), { fmt: (v) => fix(v, digits), onInput: (v) => { leave(); S.bud[key] = clamp(round(v), BUD_DOM[key][0], BUD_DOM[key][1]); paint(); } });
  const fBR = budField('bR', 'R', 2, r2), fBt = budField('bT', 't', 2, r2), fBB = budField('bB', 'B', 2, r2), fBe = budField('bEps', 'eps', 2, r2), fBa = budField('bA', 'a', 2, r2);
  const fBbeta = kit.field($('bBeta'), { fmt: (v) => fix(v, betaDigits(v)), onInput: (v) => {
    leave(); S.bud.beta = clamp(Math.round(v * 10000) / 10000, 0, 1);
    if (S.scene === 'budget') clock.set(S.bud.beta); else paint();
  } });
  function syncFields() {
    fN.set(S.N); fE.set(S.eps); fD.set(dNow()); orderChips.set(S.order, true);
    fBR.set(S.bud.R); fBt.set(S.bud.t); fBbeta.set(S.bud.beta); fBB.set(S.bud.B); fBe.set(S.bud.eps); fBa.set(S.bud.a);
  }
  function setSize(N) {
    const end = clock.t >= clock.max - 1e-9;
    S.N = clamp(N, 6, 24);
    const R = railOf(S.scene); clock.rate = R.rate; clock.setMax(R.max, true); if (end && S.scene === 'elim') clock.set(R.max);
    FIT = null; fN.set(S.N); paint();
  }
  function setScene(sc, ms) {
    S.scene = sc === 'square' || sc === 'budget' ? sc : 'elim';
    if (S.scene === 'budget') ensureSolid();
    const R = railOf(S.scene);
    clock.rate = R.rate; clock.step = R.step; clock.setMax(R.max, true);
    sceneChips.set(S.scene, true);
    // controls and evidence that belong to other scenes step aside (data-scene lists the scenes of each group)
    document.querySelectorAll('#ctlPanel .grp, #leanPanel .evset').forEach((g) => { g.hidden = !(g.dataset.scene || '').split(' ').includes(S.scene); });
    $('ctlAside').textContent = S.scene === 'budget' ? 'S = min(1, R|t|)·sinh(R|η|)' : 'G = L + αI · α = 0.25';
    FITCAM = VIEWS[S.scene].slice(); FIT = null;
    st.view(VIEWS[S.scene], ms);
    paint();
  }
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v, 600); clock.set(v === 'square' ? 3 : v === 'budget' ? S.bud.beta : clock.max); syncFields(); });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    natural: { scene: 'elim', N: 6, order: 'natural', eps: 0, at: 0, play: true, still: 1 },
    leaf: { scene: 'elim', N: 6, order: 'leaf', eps: 0, at: 0, play: true, still: 'end' },
    drop: { scene: 'elim', N: 16, order: 'leaf', eps: 0.2, at: 0, play: true, still: 'end' },
    square: { scene: 'square', N: 12, at: 0, play: true, still: 3 },
    budget: { scene: 'budget', bud: { R: 1, t: 1, B: 8, eps: 0, a: 1 }, at: 0.05, stop: 0.45, play: true, still: 0.45 }
  };
  const NOTES = {
    natural: ['N = 6，终端 5 与 6：自然次序先消 2（琥珀），它的两个邻居 4 与 6 之间长出一条品红的填充边。全程只有这一条填充。', 'N = 6, terminals 5 and 6: the natural order eliminates 2 first (amber), and a magenta fill edge grows between its two neighbours 4 and 6. It is the only fill of the whole run.'],
    leaf: ['叶优先：4 与 3 都是叶，平局取大的，先消 4，再消 3、2；一条填充边也没有。终端 5、6 上的舒尔补 S 与自然次序得到的相同。', 'Leaf first: 4 and 3 are both leaves, the tie goes to the larger, so 4 goes first, then 3 and 2; not a single fill edge. The Schur complement S on the terminals 5 and 6 equals the one of the natural order.'],
    drop: ['N = 16，终端 13…16，叶优先，ε = 0.2：最终 S 的三个耦合约为 −0.125、−0.417、−0.285，只有 14 与 15 之间的 −0.125 小于 ε，被置零并画成虚线；丢掉部分的弗罗贝尼乌斯范数约 0.177，原方程残差 ‖Gx̃ − b‖ 离开零。这是近似，没有误差定理。', 'N = 16, terminals 13…16, leaf first, ε = 0.2: the final S has three couplings, about −0.125, −0.417 and −0.285; only the −0.125 between 14 and 15 is below ε, so it is set to zero and drawn dashed; the discarded Frobenius norm is about 0.177 and the residual ‖Gx̃ − b‖ of the original system leaves zero. An approximation, with no error theorem.'],
    square: ['N = 12：P = I − τL 平方三次得到 P⁸。品红的新边在每个连通分支内部摊开，青色的原边变细；行和始终是 1，平方不放大。', 'N = 12: P = I − τL squared three times gives P⁸. Magenta new edges spread inside each component and the cyan original edges thin out; the row sums stay 1, and squaring does not amplify.'],
    budget: ['R = 1、t = 1、ε = 0、a = 1、B = 8：时间轴把 β 从 0.05 推到 0.45，η = 1/2 − β 从 +0.45 缩到 +0.05。紫色边界 B<sub>min</sub> = 1/sinh|η| 从约 2.149 升到约 19.99；琥珀点 B = 8 在 β ≈ 0.375 处穿过它，落进品红的区域：B·S ≈ 0.4002 &lt; 1，此界排除。点在紫色边界之上只是未被此界排除，不说明任何东西存在。',
      'R = 1, t = 1, ε = 0, a = 1, B = 8: the rail pushes β from 0.05 to 0.45, so η = 1/2 − β shrinks from +0.45 to +0.05. The violet boundary B<sub>min</sub> = 1/sinh|η| rises from about 2.149 to about 19.99; the amber point B = 8 crosses it near β ≈ 0.375 and ends in the magenta region: B·S ≈ 0.4002 &lt; 1, excluded by this bound. A point above the violet boundary is only not excluded by this bound; it does not show that anything exists.']
  };
  const FIGURE_NOTES = {
    natural: ['N = 6：先消 2，4 与 6 之间长出一条品红填充边。', 'N = 6: eliminating 2 first grows one magenta fill edge between 4 and 6.'],
    leaf: ['叶优先依次消 4、3、2：没有填充边，终端 5、6 上的舒尔补与自然次序相同。', 'Leaf first, 4 then 3 then 2: no fill edge, and the same Schur complement on 5 and 6.'],
    drop: ['ε = 0.2：14 与 15 之间的小元被丢掉（虚线），残差离开舍入量级，没有误差定理。', 'ε = 0.2: the small entry between 14 and 15 is dropped (dashed); the residual leaves roundoff, with no error theorem.'],
    square: ['P 的 8 次幂：新边在各分支内摊开，行和仍是 1，没有放大。', 'P to the power 8: new edges spread inside each component, the row sums stay 1, nothing is amplified.'],
    budget: ['R = 1、t = 1、ε = 0、β = 0.45（η = +0.05）：紫色边界在 B<sub>min</sub> ≈ 19.99，琥珀点 B = 8 在它下方的品红区域里，此界排除。', 'R = 1, t = 1, ε = 0, β = 0.45 (η = +0.05): the violet boundary is at B<sub>min</sub> ≈ 19.99, and the amber point B = 8 lies below it in the magenta region, excluded by this bound.']
  };
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause(); STOP = null;
    if (p.N != null) S.N = p.N;
    if (p.order) S.order = p.order; if (p.eps != null) S.eps = p.eps;
    if (p.bud) Object.assign(S.bud, p.bud, { beta: p.still });
    setScene(p.scene, booting || TRV.still ? 0 : 600);
    const still = p.still === 'end' ? clock.max : p.still;
    if (TRV.still || (booting && !TRV.embed)) clock.set(still);
    else clock.set(p.at);
    if (p.play && !TRV.still && (!booting || TRV.embed)) { STOP = p.stop == null ? null : p.stop; if (booting) kit.autoplay(clock, stageEl); else clock.play(); }
    syncFields(); paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：改 N、换次序、拉 ε、拖琥珀环、拖空白处转视角；预算场景里推 β、拖琥珀点。随时可以再选一张卡。', 'Free play: change N, switch the order, move ε, drag the amber ring, drag empty space to orbit; in the budget scene push β and drag the amber point. Pick a card again at any time.']
  });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe for the browser suite, cover, start ---------- */
  const viewport = (v) => { const b = stageEl.getBoundingClientRect(), q = st.p(v); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1], depth: q[2] }; };
  const lab = (gr, list) => list.map((i) => gr.labels[i]);
  window.ARITHMETIC_SCHUR_DEBUG = Object.freeze({
    get state() {
      const D = dataOf(S.N), gr = D.gr, E = D[S.order], k = S.scene === 'elim' ? kNow(D) : gr.free.length, snap = E.snaps[k], s = k ? E.steps[k - 1] : null;
      const remaining = gr.labels.filter((_, i) => snap.alive[i]), ri = gr.labels.map((_, i) => i).filter((i) => snap.alive[i]);
      const dr = E.drop(S.eps), sq = squareOf(S.N), d = S.scene === 'square' ? dNow() : 0, lv = sq.levels[d];
      const summary = (X) => ({ order: X.steps.map((t) => t.label), fill: X.fill, mul: X.mul, add: X.add, div: X.div, minPivot: X.minPivot, S: X.S, residual: X.residual, x: X.x,
        fillEdges: X.steps.flatMap((t, i) => t.created.map(([a, b]) => [gr.labels[a], gr.labels[b], i + 1])) });
      return JSON.parse(JSON.stringify({
        scene: S.scene, preset: cards.current, playing: clock.playing, t: clock.t, max: clock.max, step: clock.step,
        params: { N: S.N, order: S.order, eps: S.eps, k, d, alpha: ALPHA },
        graph: { labels: gr.labels, G: gr.G, W: gr.W, deg: gr.deg, edges: gr.edges.map(([i, j]) => [gr.labels[i], gr.labels[j]]), terminals: lab(gr, gr.terminals), free: lab(gr, gr.free), raw: gr.raw, positions: gr.pos },
        elim: {
          order: E.steps.map((t) => t.label), eliminated: E.steps.slice(0, k).map((t) => t.label), remaining, pivot: s ? s.label : null,
          current: ri.map((i) => ri.map((j) => snap.A[i][j])), nnz: nnzOf(snap), fill: s ? s.fill : 0, ops: s ? { mul: s.mul, add: s.add, div: s.div } : { mul: 0, add: 0, div: 0 },
          minPivot: s ? s.minPivot : null, steps: E.steps.map((t) => ({ label: t.label, value: t.value, degree: t.degree, nb: lab(gr, t.nb), created: t.created.map(([a, b]) => [gr.labels[a], gr.labels[b]]), fill: t.fill, mul: t.mul, add: t.add, div: t.div })),
          b: E.b, reduced: E.y, S: E.S, x: E.x, residual: E.residual,
          drop: { eps: dr.eps, S: dr.S, discarded: dr.discarded, dropped: dr.dropped, x: dr.x, residual: dr.residual },
          natural: summary(D.natural), leaf: summary(D.leaf)
        },
        // mul, add: the d dense products of the displayed algorithm; outputEntries: one output matrix (the page caches 0…DMAX)
        square: { d, exponent: 2 ** d, tau: sq.tau, n: sq.n, nnz: lv.nnz, nnzP: sq.levels[0].nnz, mul: lv.mul, add: lv.add, outputEntries: sq.n * sq.n, cachedLevels: sq.levels.length, rowErr: lv.rowErr, minEntry: lv.minEntry, infNorm: lv.infNorm, P: sq.levels[0].M, M: lv.M },
        // the budget scene: parameters, the values the page shows, the world point and the data of every vertex drawn
        budget: (() => {
          const b = budget(S.bud), mesh = budgetMesh(S.bud.t, S.bud.eps);
          return {
            params: { R: b.R, t: b.t, beta: b.beta, eta: b.eta, absEta: b.h, B: b.B, eps: b.eps, a: b.a }, domains: BUD_DOM,
            window: { R: [0, WIN.R], absEta: [0, WIN.h], B: [0, WIN.B], box: BOX },
            m: b.m, S: b.S, need: b.need, Bmin: b.Bmin, product: b.product, verdict: b.verdict, collision: b.collision, aboveWindow: b.aboveWindow,
            abs: b.abs, jet: b.jet, stop: STOP,
            point: wpt(b.R, b.h, b.B), boundary: b.Bmin == null ? null : wpt(b.R, b.h, Math.min(b.Bmin, WIN.B)),
            mesh: { Rin: mesh.Rin, kink: mesh.kink, sheet: mesh.sheet, cap: mesh.cap, front: mesh.front, right: mesh.right, back: mesh.back, side: mesh.side },
            world: { sheet: mesh.world.sheet, cap: mesh.world.cap },
            slice: sliceR(b.t, b.eps, b.h), rail: sliceBeta(b.R, b.t, b.eps),
            hud: S.scene === 'budget' ? { big: $('hudBig').textContent, sub: $('hudSub').textContent, legend: $('legend').textContent } : null,
            solid: solid ? { active: solid.active(), mode: solid.mode } : null,
            // what the last frame drew of the excluded region: the solid part (the far side of the plane |η| from the
            // camera) and the veil on the reader's side, every vertex as [R, |η|, B]
            drawn: S.scene === 'budget' && BODY ? { near: BODY.near, solidPart: BODY.solidPart, veilPart: BODY.veilPart, body: BODY.body, veil: BODY.veil } : null
          };
        })(),
        camera: { yaw: st.cam.yaw, pitch: st.cam.pitch, zoom: st.cam.zoom }, handle: FRAME ? FRAME.handle : null, labels: PLACED, frame: FRAME
      }));
    },
    /** Set parameters as a reader would with the controls (leaves the card, pauses the clock). */
    setParams(o) {
      leave();
      if (o.bud) for (const k of Object.keys(o.bud)) if (BUD_DOM[k]) S.bud[k] = clamp(k === 'beta' ? Math.round(o.bud[k] * 10000) / 10000 : r2(o.bud[k]), BUD_DOM[k][0], BUD_DOM[k][1]);
      if (o.scene) { setScene(o.scene, 0); if (o.scene === 'budget') clock.set(S.bud.beta); }
      else if (o.bud && o.bud.beta != null && S.scene === 'budget') clock.set(S.bud.beta);
      if (o.N != null) setSize(Math.round(o.N));
      if (o.order) S.order = o.order === 'leaf' ? 'leaf' : 'natural';
      if (o.eps != null) S.eps = clamp(o.eps, 0, 0.5);
      if (o.k != null && S.scene === 'elim') clock.set(o.k);
      if (o.d != null && S.scene === 'square') clock.set(o.d);
      if (o.t != null) clock.set(o.t);
      syncFields(); paint();
    },
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport point where dropping the handle sets the step k (the pivot of step k) or d (its gauge tick). */
    dragTarget(o) {
      if (S.scene === 'budget') return viewport(wpt(o.R, Math.abs(etaOf(S.bud.beta)), o.B));
      const D = dataOf(S.N), gr = D.gr;
      if (S.scene === 'elim') { const s = D[S.order].steps[o.k - 1]; return s ? viewport(gr.pos[s.pivot]) : null; }
      return viewport(gauge(gr).at(o.d));
    },
    /** The pure numerical methods of the page (for coverage only; the suite checks them with its own mathematics). */
    methods: { buildGraph, eliminate: (N, rule) => { const X = eliminate(buildGraph(N), rule); return { order: X.steps.map((t) => t.label), S: X.S, residual: X.residual }; }, squaring: (N) => squaring(buildGraph(N)).levels.map((l) => l.nnz) }
  });
  window.TRV_THUMB = () => { cards.pick('drop'); clock.pause(); clock.set(clock.max); paint.now(); };
  cards.pick(cards.initial('natural'));
  booting = false;
  paint();
})();
