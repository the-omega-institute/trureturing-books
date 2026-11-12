/* ORTHO//ELLIPTOPE · Gram windows with memory.
   A history P₀ (now), P₋₁, …, P₋₄ of unit vectors and a candidate next step Q. The Gram table is ordered
   Q, P₀, P₋₁, …, P₋₍M−1₎; its first row is (1, z, y, b₂, b₃, b₄) with z = Q·P₀, y = Q·P₋₁ and b_j = Q_ref·P₋ⱼ held
   at a reference step. With M anchors the table must be positive semidefinite; with x = P₀·P₋₁ fixed by the history
   that cuts out an ellipse in the (y, z) plane, nested inside the one for M − 1.
   The events live on S⁵ ⊂ ℝ⁶ = E∥³ ⊕ E⊥³ (coordinates 0–2 are E∥), so every depth M = 1 … 5 has an inside; the ℝ³
   comparison keeps only the normalized E∥ projections, where four or more vectors have a singular Gram matrix.
   Stage: the three-element elliptope 1 − x² − y² − z² + 2xyz ≥ 0 drawn in (x, y, z), its slice at the history's x,
   the rings of each depth, the window for z through the candidate.
   Read-only probe for the browser suite: window.ELLIPTOPE_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, sgn } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const MMAX = 5, K = 0.7, TOL = 1e-9;
  const SUB = ['₀', '₁', '₂', '₃', '₄', '₅', '₆'];
  const ANCHOR = ['P₀', 'P₋₁', 'P₋₂', 'P₋₃', 'P₋₄'];

  /* ---------- the history: P₋₄, P₋₃, P₋₂, P₋₁, P₀ and a reference next step, one radian apart, in ℝ⁶ ---------- */
  const RAW = [
    [0.855, -0.267, 0.058, 0.068, 0.431, 0.07], [0.345, 0.179, 0.175, 0.234, 0.705, -0.516], [0.015, 0.164, -0.699, 0.215, 0.554, -0.363],
    [-0.181, 0.08, -0.354, -0.607, 0.675, -0.109], [0.196, 0.34, -0.846, -0.094, 0.31, 0.159], [0.602, 0.358, -0.102, -0.24, 0.66, -0.079]
  ];
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const unit = (a) => { const n = Math.sqrt(dot(a, a)); return a.map((x) => x / n); };
  function space(dim) {
    const ev = RAW.map((v) => unit(v.slice(0, dim)));
    const anchors = [ev[4], ev[3], ev[2], ev[1], ev[0]], ref = ev[5];
    const b = anchors.map((a) => dot(ref, a));          // b[0] = z_ref, b[1] = y_ref, b[2..4] held
    return { dim, anchors, ref, b, x: dot(anchors[0], anchors[1]), yRef: b[1], zRef: b[0] };
  }
  const SPACES = { r6: space(6), r3: space(3) };

  /* ---------- small dense linear algebra ---------- */
  function det(A) {
    const n = A.length, M = A.map((r) => r.slice()); let d = 1;
    for (let c = 0; c < n; c++) {
      let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
      if (Math.abs(M[p][c]) < 1e-300) return 0;
      if (p !== c) { [M[c], M[p]] = [M[p], M[c]]; d = -d; }
      d *= M[c][c];
      for (let r = c + 1; r < n; r++) { const f = M[r][c] / M[c][c]; for (let j = c; j < n; j++) M[r][j] -= f * M[c][j]; }
    }
    return d;
  }
  function inv(A) {
    const n = A.length, M = A.map((r, i) => [...r, ...A.map((_, j) => (i === j ? 1 : 0))]);
    for (let c = 0; c < n; c++) {
      let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
      [M[c], M[p]] = [M[p], M[c]]; const v = M[c][c];
      for (let j = 0; j < 2 * n; j++) M[c][j] /= v;
      for (let r = 0; r < n; r++) if (r !== c) { const f = M[r][c]; for (let j = 0; j < 2 * n; j++) M[r][j] -= f * M[c][j]; }
    }
    return M.map((r) => r.slice(n));
  }
  /** Semidefiniteness by LDLᵀ with a tolerance: a pivot below −tol fails; a zero pivot needs a zero column below it. */
  function ldl(G, tol) {
    const n = G.length, Lm = G.map(() => new Array(n).fill(0)), d = new Array(n).fill(0);
    tol = tol == null ? TOL : tol;
    for (let j = 0; j < n; j++) {
      let s = G[j][j]; for (let k = 0; k < j; k++) s -= Lm[j][k] * Lm[j][k] * d[k];
      d[j] = s;
      if (s < -tol) return { psd: false, fail: j + 1, pivots: d.slice(0, j + 1) };
      for (let i = j + 1; i < n; i++) {
        let t = G[i][j]; for (let k = 0; k < j; k++) t -= Lm[i][k] * Lm[j][k] * d[k];
        if (s <= tol) { if (Math.abs(t) > Math.sqrt(tol)) return { psd: false, fail: j + 2, pivots: d.slice(0, j + 1) }; Lm[i][j] = 0; } else Lm[i][j] = t / s;
      }
    }
    return { psd: true, fail: 0, pivots: d, edge: d.some((v) => Math.abs(v) <= tol) };
  }

  /* ---------- the table and its rings ---------- */
  const S = { space: 'r6', y: 0, z: 0 };
  const sp = () => SPACES[S.space];
  /** The (M+1) × (M+1) Gram table for the candidate (y, z) with M anchors. */
  function table(M, y, z) {
    const s = sp(), row = [1, z, y, ...s.b.slice(2)];
    const G = [];
    for (let i = 0; i <= M; i++) {
      G.push([]);
      for (let j = 0; j <= M; j++) G[i].push(i === 0 ? row[j] : j === 0 ? row[i] : dot(s.anchors[i - 1], s.anchors[j - 1]));
    }
    return G;
  }
  const minors = (G) => G.map((_, k) => det(G.slice(0, k + 1).map((r) => r.slice(0, k + 1))));
  /** Depth m ≥ 2: the PSD condition on (z, y) is (u − u₀)ᵀ Pm (u − u₀) ≤ ρ², u = (z, y). Needs the m anchors independent. */
  const RINGS = new Map();
  function ring(m) {
    const key = `${S.space}|${m}`; if (RINGS.has(key)) return RINGS.get(key);
    const s = sp(), A = [];
    for (let i = 0; i < m; i++) { A.push([]); for (let j = 0; j < m; j++) A[i].push(dot(s.anchors[i], s.anchors[j])); }
    const Ai = inv(A), Pm = [[Ai[0][0], Ai[0][1]], [Ai[1][0], Ai[1][1]]], bb = s.b.slice(2, m);
    const Qb = [0, 0]; for (let k = 2; k < m; k++) { Qb[0] += Ai[0][k] * bb[k - 2]; Qb[1] += Ai[1][k] * bb[k - 2]; }
    const Pi = inv(Pm), u0 = [-(Pi[0][0] * Qb[0] + Pi[0][1] * Qb[1]), -(Pi[1][0] * Qb[0] + Pi[1][1] * Qb[1])];
    let rho2 = 1;
    if (m > 2) { const Ab = A.slice(2).map((r) => r.slice(2)), Bi = inv(Ab); for (let i = 0; i < m - 2; i++) for (let j = 0; j < m - 2; j++) rho2 -= bb[i] * Bi[i][j] * bb[j]; }
    const l11 = Math.sqrt(Pm[0][0]), l21 = Pm[1][0] / l11, l22 = Math.sqrt(Pm[1][1] - l21 * l21), r = Math.sqrt(Math.max(0, rho2));
    const pts = [];
    for (let i = 0; i <= 96; i++) {
      const t = kit.TAU * i / 96, a = r * Math.cos(t), c = r * Math.sin(t);
      const z = u0[0] + a / l11 - c * l21 / (l11 * l22), y = u0[1] + c / l22;
      pts.push([z, y]);
    }
    const R = { u0, P: Pm, rho2, pts };
    RINGS.set(key, R); return R;
  }
  /** Unit vectors of ℝ³ with Q·P₋₁ = y and Q·P₋₂ = b₂ (a line through the sphere): at most two. */
  function realize3(y) {
    const s = SPACES.r3, a1 = s.anchors[1], a2 = s.anchors[2], g = dot(a1, a2), d = 1 - g * g, rhs = [y, s.b[2]];
    const c1 = (rhs[0] - g * rhs[1]) / d, c2 = (rhs[1] - g * rhs[0]) / d, p = a1.map((v, i) => c1 * v + c2 * a2[i]);
    const n = unit([a1[1] * a2[2] - a1[2] * a2[1], a1[2] * a2[0] - a1[0] * a2[2], a1[0] * a2[1] - a1[1] * a2[0]]), h = 1 - dot(p, p);
    if (h < -1e-12) return [];
    const t = Math.sqrt(Math.max(0, h));
    return t < 1e-12 ? [p] : [p.map((v, i) => v + t * n[i]), p.map((v, i) => v - t * n[i])];
  }
  /** The window for z at height y with m anchors: { lo, hi, open } (open: every value between is realizable). */
  function windowAt(m, y) {
    if (m <= 1) return { lo: -1, hi: 1, open: true, pts: [-1, 1] };
    if (S.space === 'r3' && m >= 3) {
      const s = SPACES.r3, ok = realize3(y).filter((w) => { for (let j = 3; j < m; j++) if (Math.abs(dot(w, s.anchors[j]) - s.b[j]) > 1e-7) return false; return true; });
      const zs = ok.map((w) => dot(w, s.anchors[0])).sort((p, q) => p - q);
      return zs.length ? { lo: zs[0], hi: zs[zs.length - 1], open: false, pts: zs } : null;
    }
    const R = ring(m), dy = y - R.u0[1], a = R.P[0][0], bq = 2 * R.P[0][1] * dy, c = R.P[1][1] * dy * dy - R.rho2, disc = bq * bq - 4 * a * c;
    if (disc < 0) return null;
    const sq = Math.sqrt(disc), lo = R.u0[0] + (-bq - sq) / (2 * a), hi = R.u0[0] + (-bq + sq) / (2 * a);
    return { lo, hi, open: true, pts: [lo, hi] };
  }
  /** The (y, z) points that vectors of ℝ³ can realize at depth m ≥ 4: the two of depth 3 that also meet P₋₃ (and P₋₄). */
  function points3(m) {
    const s = SPACES.r3, a2 = s.anchors[2], a3 = s.anchors[3];
    // Q·P₋₂ = b₂ and Q·P₋₃ = b₃ on the unit sphere: a line through the sphere
    const g = dot(a2, a3), d = 1 - g * g, c1 = (s.b[2] - g * s.b[3]) / d, c2 = (s.b[3] - g * s.b[2]) / d, p = a2.map((v, i) => c1 * v + c2 * a3[i]);
    const n = unit([a2[1] * a3[2] - a2[2] * a3[1], a2[2] * a3[0] - a2[0] * a3[2], a2[0] * a3[1] - a2[1] * a3[0]]), t = Math.sqrt(Math.max(0, 1 - dot(p, p)));
    return [p.map((v, i) => v + t * n[i]), p.map((v, i) => v - t * n[i])]
      .filter((w) => m < 5 || Math.abs(dot(w, s.anchors[4]) - s.b[4]) < 1e-7)
      .map((w) => [dot(w, s.anchors[1]), dot(w, s.anchors[0])]);
  }

  /** The default candidate in ℝ⁶: the centre of the depth-5 ellipse, inside every ring. */
  function home() { const save = S.space; S.space = 'r6'; const c = ring(MMAX).u0; S.space = save; return { y: c[1], z: c[0] }; }
  const HOME = home(); S.y = HOME.y; S.z = HOME.z;

  /* ---------- the state of one frame ---------- */
  const depth = (t) => Math.min(MMAX, 1 + Math.floor(t + 1e-9));
  function frame() {
    const t = clock.t, M = depth(t), G = table(M, S.y, S.z), D = minors(G), C = ldl(G);
    const firstNeg = D.findIndex((v) => v < -TOL) + 1;
    const wins = []; for (let m = 1; m <= MMAX; m++) wins.push(windowAt(m, S.y));
    return { t, M, frac: Math.min(1, t + 1 - M), G, D, C, firstNeg, det: D[D.length - 1], win: wins[M - 1], wins };
  }

  /* ---------- stage ---------- */
  const W = (x, y, z) => [K * x, K * y, K * z];
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), radius: TRV.thumbMode ? 0.42 : 0.38, cy: 0.53, yaw: -1.3, pitch: 0.2,
    onChange: () => paint(),
    onPick: (ev, st) => S.space === 'r6' && st.near(ev, W(sp().x, S.y, S.z)) < 26,
    onDrag: (ev) => { const q = planeAt(ev.clientX, ev.clientY); if (q) { leave(); setQ(q[0], q[1]); } }
  });
  /** Screen point → (y, z) on the slice x = x_history. */
  function planeAt(cx, cy) {
    const b = $('cv').getBoundingClientRect(), cam = stage.cam;
    const cyw = Math.cos(cam.yaw), syw = Math.sin(cam.yaw), cp = Math.cos(cam.pitch), spp = Math.sin(cam.pitch);
    const R = [cyw, -syw, 0], U = [syw * spp, cyw * spp, cp], D = [-syw * cp, -cyw * cp, spp];
    const a = (cx - b.left - stage.cx) / stage.unit, c = (stage.cy - (cy - b.top)) / stage.unit;
    if (Math.abs(D[0]) < 0.05) return null;
    const tt = (K * sp().x - a * R[0] - c * U[0]) / D[0];
    const v = [0, 1, 2].map((i) => a * R[i] + c * U[i] + tt * D[i]);
    return [kit.clamp(v[1] / K, -1, 1), kit.clamp(v[2] / K, -1, 1)];
  }
  function ellipseSlice(axis, c0) {
    // points of 1 − c0² − p² − q² + 2c0pq = 0: p = (u + v)/√2, q = (u − v)/√2, u = √(1 + c0) cos t, v = √(1 − c0) sin t
    const pts = [];
    for (let i = 0; i <= 72; i++) {
      const t = kit.TAU * i / 72, u = Math.sqrt(1 + c0) * Math.cos(t), v = Math.sqrt(1 - c0) * Math.sin(t), p = (u + v) / Math.SQRT2, q = (u - v) / Math.SQRT2;
      pts.push(axis === 'x' ? W(c0, p, q) : axis === 'y' ? W(p, c0, q) : W(p, q, c0));
    }
    return pts;
  }
  function drawStage(f) {
    const st = stage, s = sp(), x = s.x, thumb = TRV.thumbMode, lw = thumb ? 1.7 : 1;
    st.begin();
    // the elliptope: slices and the six edges of its tetrahedron
    for (const c0 of [-0.75, -0.4, 0, 0.4, 0.75]) { st.path(ellipseSlice('z', c0), { color: P.violet, width: 0.7 * lw, alpha: 0.32, close: true }); }
    const V = [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]];
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) st.line(W(...V[i]), W(...V[j]), { color: P.violet, width: 1.1 * lw, alpha: 0.6 });
    // axes
    st.line(W(-1.2, 0, 0), W(1.25, 0, 0), { color: P.faint, width: 0.8 }); st.line(W(0, -1.2, 0), W(0, 1.25, 0), { color: P.faint, width: 0.8 }); st.line(W(0, 0, -1.2), W(0, 0, 1.25), { color: P.faint, width: 0.8 });
    // the slice at the history's x: the square is the one-step window |z| ≤ 1
    st.path([W(x, -1, -1), W(x, 1, -1), W(x, 1, 1), W(x, -1, 1)], { color: P.lineHot, width: 1, alpha: 0.9, close: true, fade: false });
    const ringPath = (m) => ring(m).pts.map(([z, y]) => W(x, y, z));
    for (let m = 2; m <= MMAX; m++) {
      if (m > f.M + 1 || (m === f.M + 1 && f.frac <= 0.001)) continue;
      const cur = m === f.M, incoming = m === f.M + 1, refuses = f.firstNeg && m === f.firstNeg - 1;
      if (S.space === 'r3' && m >= 4) {
        for (const [y, z] of points3(m)) st.dot(W(x, y, z), (cur ? 5 : 3.5) * (thumb ? 1.3 : 1), P.magenta, { alpha: incoming ? f.frac : cur ? 1 : 0.5, fade: false });
        continue;
      }
      const pts = ringPath(m), r3open = S.space === 'r3' && m === 3;
      if (cur && !r3open) st.poly(pts, { fill: P.cyan, alpha: thumb ? 0.16 : 0.1 });
      st.path(pts, { color: P.magenta, width: (refuses ? 3.2 : cur ? 2.4 : 1.4) * lw, alpha: incoming ? 0.85 * f.frac : cur || refuses ? 1 : 0.6, dash: r3open ? [5, 4] : [], fade: false });
    }
    // the window for z through the candidate (it narrows smoothly while the next ring fades in)
    const w0 = f.win, w1 = f.M < MMAX && f.frac > 0.001 ? f.wins[f.M] : null, e = TRV.smooth(f.frac);
    if (w0) {
      const lo = w1 ? w0.lo + (w1.lo - w0.lo) * e : w0.lo, hi = w1 ? w0.hi + (w1.hi - w0.hi) * e : w0.hi;
      if (w0.open && hi - lo > 1e-6) st.line(W(x, S.y, lo), W(x, S.y, hi), { color: P.cyan, width: 4.5 * lw, fade: false });
      for (const z of (w0.open ? [lo, hi] : w0.pts)) st.dot(W(x, S.y, z), 4.2 * (thumb ? 1.3 : 1), P.magenta, { fade: false });
    }
    // the candidate
    const q = W(x, S.y, S.z), inside = f.C.psd;
    if (inside) st.dot(q, 6.5, P.amber, { glow: 14, fade: false }); else st.dot(q, 7, P.amber, { ring: true, width: 2.4, fade: false });
    // labels
    st.tag('ay', W(0, 1.34, 0), 'y', 'num'); st.tag('az', W(0, 0, 1.33), 'z', 'num');
    st.tag('q', q, 'Q', 'hot', { dx: 16, dy: -12 });
    if (f.firstNeg) {
      const m = f.firstNeg - 1, side = ring(Math.max(2, m)).pts.reduce((a, p) => (p[1] > a[1] ? p : a));
      st.tag('neg', W(x, side[1], side[0]), `D${SUB[f.firstNeg]} &lt; 0`, 'mg', { dx: 30 });
    }
    st.end();
  }

  /* ---------- strips ---------- */
  function drawPlots(f) {
    const ga = kit.plot($('plotA'), { x: [0.5, 5.5], y: [-1.08, 1.08], pad: [34, 10, 8, 20] });
    ga.axes({ yTicks: [-1, 0, 1], xTicks: [[1, 'M 1'], [2, '2'], [3, '3'], [4, '4'], [5, '5']] });
    f.wins.forEach((w, i) => {
      const m = i + 1; if (!w) return;
      const col = m <= f.M ? P.cyan : P.faint, al = m === f.M ? 1 : m < f.M ? 0.55 : 0.5;
      if (w.open) ga.line([[m, w.lo], [m, w.hi]], col, { width: m === f.M ? 5 : 3, alpha: al });
      w.pts.forEach((z) => ga.dot(m, z, m <= f.M ? P.magenta : P.faint, 3, { alpha: al }));
    });
    ga.hline(S.z, P.amber, { dash: [4, 3], alpha: 0.9 });
    $('pAMeta').textContent = f.win ? L(`宽 ${fix(f.win.open ? f.win.hi - f.win.lo : 0, 3)}`, `width ${fix(f.win.open ? f.win.hi - f.win.lo : 0, 3)}`) : '—';
    const gb = kit.plot($('plotB'), { x: [0.4, 6.6], y: [-0.45, 1.08], pad: [34, 10, 8, 20] });
    gb.axes({ yTicks: [0, 0.5, 1], xTicks: [1, 2, 3, 4, 5, 6].map((k) => [k, `D${SUB[k]}`]) });
    gb.hline(0, P.lineHot);
    // each rung as a pivot D_k / D_{k−1}: the squared length of the newcomer left outside the span of those before it
    f.D.forEach((v, i) => {
      const k = i + 1, prev = i ? f.D[i - 1] : 1;
      if (k > (f.firstNeg || 99)) return;
      const piv = Math.abs(prev) < 1e-14 ? 0 : v / prev, neg = v < -TOL, top = Math.max(-0.45, Math.min(1.08, piv));
      gb.rect(k - 0.3, 0, k + 0.3, top, neg ? P.magenta : P.cyan, { alpha: neg ? 0.9 : 0.55 });
    });
    $('pBMeta').textContent = f.firstNeg ? L(`D${SUB[f.firstNeg]} 先变负`, `D${SUB[f.firstNeg]} turns negative first`) : L('全部 ≥ 0', 'all ≥ 0');
  }

  /* ---------- text ---------- */
  function drawText(f) {
    const s = sp(), w = f.win, width = w ? (w.open ? w.hi - w.lo : 0) : 0;
    const winTxt = !w ? '∅' : w.open ? `[${sgn(w.lo, 3)}, ${sgn(w.hi, 3)}]` : w.pts.length > 1 ? `{${w.pts.map((z) => sgn(z, 3)).join(', ')}}` : `{${sgn(w.pts[0], 3)}}`;
    $('roKey').textContent = winTxt;
    $('roKeySub').textContent = !w ? '' : w.open ? L(` 宽 ${fix(width, 3)}`, ` width ${fix(width, 3)}`) : L(' 只剩孤立的值，中间没有', ' isolated values, nothing between');
    $('roM').textContent = `${f.M}  (${ANCHOR.slice(0, f.M).join(', ')})`;
    $('roSize').textContent = `${f.M + 1} × ${f.M + 1}`;
    $('roDet').textContent = Math.abs(f.det) < 1e-12 ? '0' : sgn(f.det, 5);
    $('roNeg').textContent = f.firstNeg ? `D${SUB[f.firstNeg]} = ${sgn(f.D[f.firstNeg - 1], 4)}` : L('无', 'none');
    $('roQ').textContent = `(${sgn(S.y, 3)}, ${sgn(S.z, 3)})`;
    $('roX').textContent = sgn(s.x, 4);
    const r3flat = S.space === 'r3' && f.M >= 3;
    $('roNote').innerHTML = !f.C.psd
      ? L(`<b class="c-mg">这张表装不进任何内积空间。</b>前 ${f.firstNeg - 1} 级都还非负，D${SUB[f.firstNeg]} 先变负：只记 ${f.firstNeg - 2} 层时这个候选还可以，记到第 ${f.firstNeg - 1} 层（${ANCHOR[f.firstNeg - 2]}）就被拒绝了。`, `<b class="c-mg">This table fits in no inner-product space.</b> The first ${f.firstNeg - 1} rungs are still nonnegative and D${SUB[f.firstNeg]} turns negative first: with ${f.firstNeg - 2} remembered the candidate was fine, the ${['', 'first', 'second', 'third', 'fourth', 'fifth'][f.firstNeg - 1]} anchor (${ANCHOR[f.firstNeg - 2]}) refuses it.`)
      : r3flat ? L(`ℝ³ 里 ${f.M + 1} 根向量撑不出体积：det G = 0，候选被钉在窗口的边上，窗口没有内部。`, `In ℝ³, ${f.M + 1} vectors span no volume: det G = 0, the candidate is pinned to the edge of the window, and the window has no inside.`)
        : f.C.edge ? L('候选正贴着这一层的边：det G = 0，Q 落在历史张成的子空间里。', 'The candidate sits on the edge of this depth: det G = 0, and Q lies in the span of the history.')
          : L(`全部 ${f.M + 1} 级主子式为正：这张表是 ${s.dim === 6 ? 'ℝ⁶' : 'ℝ³'} 里一组真实单位向量的格拉姆表。多记一层，窗口还会再收窄。`, `All ${f.M + 1} minors are positive: the table is the Gram table of actual unit vectors in ${s.dim === 6 ? 'ℝ⁶' : 'ℝ³'}. One more depth would narrow the window again.`);
    $('hudBig').textContent = `M = ${f.M} · z ∈ ${winTxt}`;
    $('hudSub').textContent = L(`记住 ${f.M} 步历史 · 表 ${f.M + 1} × ${f.M + 1} · det G ${Math.abs(f.det) < 1e-12 ? '0' : sgn(f.det, 4)}`, `${f.M} steps remembered · table ${f.M + 1} × ${f.M + 1} · det G ${Math.abs(f.det) < 1e-12 ? '0' : sgn(f.det, 4)}`);
    $('pillDepth').querySelector('strong').textContent = String(f.M);
    $('pillSpace').querySelector('strong').textContent = s.dim === 6 ? 'ℝ⁶' : 'ℝ³';
    $('pillKey').querySelector('strong').textContent = f.C.psd ? `Δz ${fix(width, 2)}` : `D${SUB[f.firstNeg]} < 0`;
    const html = [['box vi', '三元椭圆体 det G₃ ≥ 0', 'the elliptope det G₃ ≥ 0'], ['mg', '每层记忆的边界', 'the boundary at each depth'], ['cy', 'z 的窗口', 'the window for z'], ['am', '候选的下一步 Q', 'the candidate next step Q']]
      .map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== html) { $('legend').innerHTML = html; $('legend')._h = html; }
    fY.set(Math.round(S.y * 100) / 100); fZ.set(Math.round(S.z * 100) / 100);
    $('oY').textContent = sgn(S.y, 2); $('oZ').textContent = sgn(S.z, 2);
    depthChips.set(String(f.M), true);
  }

  const paint = kit.painter(() => { const f = frame(); drawStage(f); drawPlots(f); drawText(f); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: MMAX - 1, t: MMAX - 1, rate: 0.7, step: 1,
    format: (t) => `M ${depth(t)} <small>/ ${MMAX}</small>`,
    onChange: () => paint()
  });
  const leave = () => cards.mark(null);
  let qTween = null;
  function setQ(y, z, ms) {
    if (qTween) { qTween.cancel(); qTween = null; }
    if (!ms) { S.y = y; S.z = z; paint(); return; }
    const y0 = S.y, z0 = S.z;
    qTween = kit.tween(ms, (e) => { S.y = y0 + (y - y0) * e; S.z = z0 + (z - z0) * e; paint(); });
  }
  function setSpace(v) {
    S.space = v; spaceChips.set(v, true);
    const r3 = v === 'r3';
    $('fy').disabled = r3; $('fz').disabled = r3;
    if (r3) { S.y = SPACES.r3.yRef; S.z = SPACES.r3.zRef; }
    paint();
  }
  const depthChips = kit.chips($('depthChips'), 'depth', (v) => { leave(); clock.pause(); clock.set(Number(v) - 1); });
  const spaceChips = kit.chips($('spaceChips'), 'space', (v) => { leave(); setSpace(v); if (v === 'r6') setQ(HOME.y, HOME.z); if (v === 'r3' && !TRV.still) TRV.toast($('toast'), L('ℝ³ 里候选只能取参考步：四根以上的向量已经没有第四个方向可用。', 'In ℝ³ the candidate can only be the reference step: four or more vectors have no fourth direction left.')); });
  const fY = kit.field($('fy'), { fmt: (v) => sgn(v, 2), onInput: (v) => { leave(); setQ(v, S.z); } });
  const fZ = kit.field($('fz'), { fmt: (v) => sgn(v, 2), onInput: (v) => { leave(); setQ(S.y, v); } });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });

  /* ---------- experiment cards ---------- */
  /** z for the VIOLATE card: inside the depth-3 window but above the depth-4 window, at the reference y. */
  const zViolate = () => { const save = S.space; S.space = 'r6'; const w3 = windowAt(3, HOME.y), w4 = windowAt(4, HOME.y); S.space = save; return (w3.hi + w4.hi) / 2; };
  const NOTES = {
    elliptope: ['只记两步：紫色的鼓胀四面体是三元格拉姆表 det G₃ ≥ 0 的全体，历史定下 x = P₀·P₋₁，候选 Q 的 (y, z) 只能落在 x 处的截面里，品红的椭圆是它的边。竖着穿过琥珀色 Q 的青色线段就是 z 的窗口 [xy − √((1−x²)(1−y²)), xy + √((1−x²)(1−y²))]。', 'Two steps remembered: the violet swollen tetrahedron is every three-element Gram table with det G₃ ≥ 0. The history fixes x = P₀·P₋₁, so the candidate Q can only put its (y, z) in the slice at x, bounded by the magenta ellipse. The cyan segment through the amber Q is the window for z, [xy − √((1−x²)(1−y²)), xy + √((1−x²)(1−y²))].'],
    narrow: ['时间轴从只记一步走到记五步。每多记一个更早的锚点，截面里就多一圈品红的椭圆，套在上一圈里面；穿过琥珀色 Q 的青色窗口一圈圈收窄，从整个 [−1, 1] 缩到约原来的四分之一，但 Q 始终在里面。', 'The rail goes from one step remembered to five. Each older anchor adds a magenta ellipse in the slice, nested inside the last; the cyan window through the amber Q narrows ring by ring, from all of [−1, 1] to about a quarter of it, and Q stays inside.'],
    flat: ['把同一段历史压回三维（只留 E∥）：时间轴从记两步走到记五步。四根以上的向量撑不出体积，记到第三层，品红的泡泡只剩虚线的边界，琥珀色的 Q 被钉在窗口边上；记到第四、五层，能实现的只剩孤立的点，z 的窗口缩成一个值，Q 就钉在那里，det G = 0。', 'The same history squeezed back into three dimensions (only E∥): the rail goes from two steps remembered to five. Four or more vectors span no volume: at the third depth the magenta bubble keeps only its dashed edge and the amber Q is pinned to the edge of the window; at the fourth and fifth only isolated points can be realized, the window for z shrinks to one value with Q pinned there, and det G = 0.'],
    violate: ['记住五步，却把 z 填在第三圈之内、第四圈之外：琥珀色的 Q 成了空心圈。阶梯上 D₁ 到 D₄ 都还非负，D₅ 先变负，正是加粗的第四圈（记到 P₋₃ 时）拒绝了它；这张表装不进任何内积空间。', 'Five steps remembered, but z filled in inside the third ring and outside the fourth: the amber Q becomes a hollow ring. On the ladder D₁ to D₄ are still nonnegative and D₅ turns negative first: the thickened fourth ring (memory reaching P₋₃) is the one that refuses it. This table fits in no inner-product space.']
  };
  let booting = true;
  function run(play, still) { if (TRV.still || (booting && !TRV.embed)) clock.set(still); else if (play) { if (booting) kit.autoplay(clock, $('stage')); else clock.play(); } }
  function applyPreset(id) {
    clock.pause();
    if (S.space !== 'r6') setSpace('r6');
    const ms = TRV.still || booting ? 0 : 500, s = HOME;
    if (id === 'elliptope') { setQ(s.y, s.z, ms); clock.set(1); }
    else if (id === 'narrow') { setQ(s.y, s.z, ms); clock.set(0); run(true, MMAX - 1); }
    else if (id === 'flat') { setSpace('r3'); clock.set(1); run(true, MMAX - 1); }
    else if (id === 'violate') {
      setQ(s.y, zViolate(), ms); clock.set(MMAX - 1);
      if (!TRV.still && !booting) TRV.toast($('toast'), L('D₅ < 0：第四层记忆拒绝了这个候选', 'D₅ < 0: the fourth depth of memory refuses this candidate'));
    }
    if (!TRV.still && !booting) stage.view([-1.3, 0.2]);
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：在截面里拖动琥珀色的 Q，或拖滑块、换记忆深度、换空间。拖动空白处旋转舞台。随时可以再选一张卡。', 'Free play: drag the amber Q in the slice, or move the sliders, change the depth of memory or the space. Drag empty space to rotate the stage. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  window.ELLIPTOPE_DEBUG = {
    get state() {
      const f = frame();
      return { t: f.t, M: f.M, playing: clock.playing, preset: cards.current, space: S.space, x: sp().x, y: S.y, z: S.z,
        table: f.G, minors: f.D, psd: f.C.psd, fail: f.C.fail, edge: !!f.C.edge, firstNeg: f.firstNeg, det: f.det,
        windows: f.wins.map((w) => (w ? { lo: w.lo, hi: w.hi, open: w.open, pts: w.pts.slice() } : null)) };
    },
    vectors: (v) => { const s = SPACES[v || S.space]; return { anchors: s.anchors.map((a) => a.slice()), ref: s.ref.slice(), b: s.b.slice(), x: s.x }; },
    /** The PSD verdict of the page (LDLᵀ with tolerance) for any symmetric table. */
    psd: (G) => { const r = ldl(G); return { psd: r.psd, fail: r.fail }; },
    seek: (t) => { clock.pause(); clock.set(t); },
    /** Move a playing clock forward without stopping it (for the suite: no need to wait for a whole run). */
    advance: (t) => { if (clock.playing && clock.t < t) clock.set(t); },
    setQ: (y, z) => { leave(); setQ(y, z); },
    zViolate,
    /** Viewport coordinates of the candidate, and of a point (y, z) of the slice. */
    at: (y, z) => { const q = stage.p(W(sp().x, y == null ? S.y : y, z == null ? S.z : z)), b = $('cv').getBoundingClientRect(); return [b.left + q[0], b.top + q[1]]; }
  };
  window.TRV_THUMB = () => { setSpace('r6'); clock.pause(); S.y = HOME.y; S.z = HOME.z; clock.set(MMAX - 1); stage.cam.yaw = -1.3; stage.cam.pitch = 0.2; paint.now(); };
  cards.pick(cards.initial('narrow'));
  booting = false;
  paint();
})();
