/* GRAM//CONSENSUS · 格拉姆窗口与共识 · Gram-window consensus (§34.18)
   The stage is the unit sphere S² of directions, drawn as a lit solid. An observer keeps a window of its M most recent
   records v₁ (the newest) … v_M (the oldest still kept), the golden-angle spiral v_j at colatitude 12° + 6°(j − 1) and
   azimuth (j − 1)·π(3 − √5). Each record lets the next direction x lie only in its coherence cap x·v_j ≥ cos α_coh; the
   corridor Ω_M is the intersection of the M caps (cyan), the arcs that squeeze it magenta, the candidate x amber (drag
   it). The rail is the memory depth t: between two integers the oldest cap closes in (a MODEL of the transition), at
   integers the window is exact. Forgetting the oldest record releases its cap and the corridor reopens by
   q_M = ln(|Ω_{M−1}|/|Ω_M|). Observer B keeps w_j = R_y(η) v_j (violet); their consensus is Ω_A ∩ Ω_B. The side panel
   shows the bordered Gram matrix G_{M+1} of x (or the 2M × 2M block Gram K_M of both observers) and the Schur margin
   Δ = 1 − cᵀG⁺c for the drawn caps, for an equicorrelated family r = 1/3 or for orthonormal records.
   Areas are exact (Gauss–Bonnet), the spectra come from Jacobi rotations; every number is computed here.
   Read-only probe for the browser suite: window.GRAM_WINDOW_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180;

  // @@GEOMETRY-BEGIN  (pure: no DOM, no TRV; the browser suite re-derives every number by other algorithms)
  const GW = (() => {
    const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180, GOLDEN = PI * (3 - Math.sqrt(5)), MAX = 10;
    const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
    const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
    const scale = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
    const norm = (a) => Math.hypot(a[0], a[1], a[2]);
    const unit = (a) => { const n = norm(a); return n > 1e-15 ? scale(a, 1 / n) : [0, 0, 1]; };
    const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
    const ease = (f) => { const u = clamp(f, 0, 1); return u * u * (3 - 2 * u); };
    /** The record v_j (j ≥ 1): colatitude 12° + 6°(j − 1), azimuth (j − 1)γ, γ = π(3 − √5) the golden angle. */
    const anchor = (j) => { const b = (12 + 6 * (j - 1)) * DEG, p = (j - 1) * GOLDEN; return [Math.sin(b) * Math.cos(p), Math.sin(b) * Math.sin(p), Math.cos(b)]; };
    /** Right-handed R_y(η): (x, y, z) ↦ (cos η x + sin η z, y, −sin η x + cos η z). */
    const ry = (eta, x) => [Math.cos(eta) * x[0] + Math.sin(eta) * x[2], x[1], -Math.sin(eta) * x[0] + Math.cos(eta) * x[2]];
    /** An orthonormal tangent pair (e₁, e₂) at the unit vector n with e₁ × e₂ = n. */
    const frame = (n) => { const e1 = unit(cross(n, Math.abs(n[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])); return [e1, cross(n, e1)]; };
    /** The point at angle t on the boundary circle x·n = h of a prepared cap; t grows counterclockwise about n. */
    const onCircle = (c, t) => add(scale(c.n, c.h), add(scale(c.e1, c.s * Math.cos(t)), scale(c.e2, c.s * Math.sin(t))));

    /** The caps of the window at memory depth t ∈ [0, MAX] with coherence half-angle alpha (radians): the records
        v₁ … v_⌈t⌉ (observer A) and/or w_j = R_y(η) v_j (observer B). At an integer t the window is exact. Between two
        integers the oldest cap, of v_⌈t⌉, closes in: its half-angle eases from the smallest one that still holds the
        observer's previous corridor (it touches it) down to alpha, so the corridor shrinks all the way through. */
    function caps(t, alpha, o) {
      o = o || {};
      const out = [], k = Math.min(MAX, Math.ceil(t - 1e-9)), f = t - (k - 1), eta = o.eta || 0, sides = [];
      if (o.A !== false) sides.push(['A', (j) => anchor(j)]);
      if (o.B) sides.push(['B', (j) => ry(eta, anchor(j))]);
      for (const [obs, at] of sides) {
        for (let j = 1; j < k; j++) out.push({ n: at(j), h: Math.cos(alpha), j, obs });
        if (k < 1) continue;
        let h = Math.cos(alpha);
        if (f < 1 - 1e-12) {
          const prev = region(Array.from({ length: k - 1 }, (_, q) => ({ n: at(q + 1), h: Math.cos(alpha), j: q + 1, obs })));
          const start = prev.empty ? alpha : Math.max(alpha, Math.acos(clamp(minDot(prev, at(k)), -1, 1)));
          h = Math.cos(start - (start - alpha) * ease(f));
        }
        out.push({ n: at(k), h, j: k, obs });
      }
      return out;
    }
    /** min of x·v over a region (−1 when it holds −v or is the whole sphere): attained on the boundary otherwise,
        exactly on each arc (A + B cos(t − τ) is least at t = τ + π when that falls inside the arc). */
    function minDot(R, v) {
      if (R.full) return -1;
      if (R.empty) return 1;
      if (margin(R.caps, scale(v, -1)) >= 0) return -1;
      let m = Infinity;
      for (const a of R.arcs) {
        const c = R.caps[a.cap], A0 = c.h * dot(c.n, v), b1 = c.s * dot(c.e1, v), b2 = c.s * dot(c.e2, v);
        const val = (t) => A0 + b1 * Math.cos(t) + b2 * Math.sin(t);
        m = Math.min(m, val(a.t0), val(a.t1));
        let tm = Math.atan2(b2, b1) + PI;
        while (tm < a.t0) tm += TAU;
        while (tm > a.t0 + TAU) tm -= TAU;
        if (tm <= a.t1) m = Math.min(m, A0 - Math.hypot(b1, b2));
      }
      return m;
    }
    /** Prepare caps: drop the ones without a constraint (h ≤ −1) and repeated ones (B = A at η = 0). */
    function prepare(list) {
      const cs = [];
      for (const c of list) {
        if (!(c.h > -1 + 1e-9)) continue;
        if (cs.some((d) => Math.abs(d.h - c.h) < 1e-12 && norm(sub(d.n, c.n)) < 1e-12)) continue;
        const [e1, e2] = frame(c.n);
        cs.push({ n: c.n, h: c.h, j: c.j, obs: c.obs, s: Math.sqrt(Math.max(0, 1 - c.h * c.h)), e1, e2, ts: [] });
      }
      return cs;
    }
    /** min over the caps of x·n − h: ≥ 0 exactly when x lies in every cap (+∞ without caps). */
    const margin = (cs, x) => cs.reduce((m, c) => Math.min(m, dot(x, c.n) - c.h), Infinity);

    /** The region ⋂ {x ∈ S² : x·n ≥ h} and its exact area by Gauss–Bonnet:
          area = 2πχ − Σ_arcs h Δt − Σ_vertices turn,
        where the boundary arcs are the parts of the circles x·n = h that lie inside every other cap (Δt their angle
        about n, so ∫ k_g ds = h Δt), the turn at a vertex is the angle between the two inward normals, arccos((n_i·n_j
        − h_i h_j)/(s_i s_j)), and χ = #components − #holes (see below: it follows from the boundary loops). */
    function region(list) {
      const cs = prepare(list), none = { caps: cs, vertices: [], arcs: [], used: new Set(), loops: 0, active: [], turns: 0, sumH: 0 };
      if (!cs.length) return Object.assign(none, { area: 4 * PI, full: true, empty: false, center: null });
      const inAll = (p, skip, tol) => cs.every((c, l) => skip.includes(l) || dot(p, c.n) >= c.h - tol);
      const angle = (c, p) => Math.atan2(dot(p, c.e2), dot(p, c.e1));
      const vertices = [];
      for (let i = 0; i < cs.length; i++) for (let j = i + 1; j < cs.length; j++) {
        const A = cs[i], B = cs[j], g = dot(A.n, B.n), den = 1 - g * g;
        if (den < 1e-14) continue;
        const a = (A.h - B.h * g) / den, b = (B.h - A.h * g) / den, r2 = (1 - (a * a + b * b + 2 * a * b * g)) / den;
        if (!(r2 > 0)) continue;
        const r = Math.sqrt(r2), nn = cross(A.n, B.n);
        for (const sg of [1, -1]) {
          const p = [0, 1, 2].map((k) => a * A.n[k] + b * B.n[k] + sg * r * nn[k]);
          if (!inAll(p, [i, j], 1e-11)) continue;
          const v = { p, i, j, id: vertices.length };
          vertices.push(v); A.ts.push({ t: angle(A, p), v: v.id }); B.ts.push({ t: angle(B, p), v: v.id });
        }
      }
      const arcs = [];
      cs.forEach((c, i) => {
        if (!c.ts.length) { if (inAll(onCircle(c, 0), [i], -1e-12)) arcs.push({ cap: i, t0: 0, t1: TAU, full: true, from: -1, to: -1 }); return; }
        const ts = c.ts.slice().sort((x, y) => x.t - y.t);
        for (let k = 0; k < ts.length; k++) {
          const s0 = ts[k], s1 = ts[(k + 1) % ts.length], t0 = s0.t, t1 = k + 1 < ts.length ? s1.t : s1.t + TAU;
          if (t1 - t0 < 1e-12) continue;
          if (inAll(onCircle(c, (t0 + t1) / 2), [i], -1e-12)) arcs.push({ cap: i, t0, t1, full: false, from: s0.v, to: s1.v });
        }
      });
      if (!arcs.length) {
        // no boundary at all: either the caps leave nothing, or (never with caps of half-angle < π) everything
        return Object.assign(none, { area: 0, full: false, empty: true, center: null });
      }
      // boundary loops: each arc ends at a vertex where the next arc (on the other circle) starts
      const startAt = new Map();
      arcs.forEach((a, k) => { if (!a.full) startAt.set(a.from, k); });
      const seen = new Set();
      let loops = 0;
      arcs.forEach((a, k) => {
        if (seen.has(k)) return;
        loops += 1; seen.add(k);
        if (a.full) return;
        for (let cur = k, guard = 0; guard <= arcs.length; guard++) {
          const nx = startAt.get(arcs[cur].to);
          if (nx == null || seen.has(nx)) break;
          seen.add(nx); cur = nx;
        }
      });
      const used = new Set();
      arcs.forEach((a) => { if (!a.full) { used.add(a.from); used.add(a.to); } });
      let sumH = 0, turns = 0;
      for (const a of arcs) sumH += cs[a.cap].h * (a.t1 - a.t0);
      for (const v of vertices) if (used.has(v.id)) { const A = cs[v.i], B = cs[v.j]; turns += Math.acos(clamp((dot(A.n, B.n) - A.h * B.h) / (A.s * B.s), -1, 1)); }
      // each boundary loop L bounds a disc on its left of area A_L = 2π − (Σ h Δt + Σ turns over L); every component is
      // a sphere with b_c holes, of area Σ_c A_L − 4π(b_c − 1), so the region has area Σ A_L − 4πm with the integer m
      // that puts it in [0, 4π): an annulus (two caps of half-angle near π, observer B on) as well as discs
      const raw = 2 * PI * loops - sumH - turns, wraps = Math.max(0, Math.floor((raw + 1e-9) / (4 * PI)));
      const area = Math.max(0, raw - 4 * PI * wraps), chi = loops - 2 * wraps;
      // a point well inside, for drawing: the mean of the corners and the arc midpoints (the caps are convex for
      // half-angles below 90°, so it lies inside), pushed inwards while any cap is still violated
      const pts = [];
      for (const v of vertices) if (used.has(v.id)) pts.push(v.p);
      for (const a of arcs) pts.push(a.full ? cs[a.cap].n : onCircle(cs[a.cap], (a.t0 + a.t1) / 2));
      let c = unit(pts.reduce((s, p) => add(s, p), [0, 0, 0]));
      for (let it = 0; it < 80; it++) {
        let worst = Infinity, wl = 0;
        cs.forEach((q, l) => { const m = (dot(c, q.n) - q.h) / Math.max(q.s, 1e-9); if (m < worst) { worst = m; wl = l; } });
        if (worst > 1e-3) break;
        c = unit(add(c, scale(cs[wl].n, 0.08)));
      }
      const active = [...new Set(arcs.map((a) => a.cap))].map((i) => ({ obs: cs[i].obs, j: cs[i].j })).sort((x, y) => (x.obs + x.j).localeCompare(y.obs + y.j));
      return { caps: cs, vertices, arcs, used, loops, chi, active, turns, sumH, area, full: false, empty: area <= 0, center: c };
    }

    /** The first distance at which the great circle cos t·c + sin t·d leaves one of the caps (c inside all). */
    function exitAlong(cs, c, d) {
      let best = PI;
      for (const q of cs) {
        const a = dot(c, q.n), b = dot(d, q.n), R = Math.hypot(a, b);
        if (R < 1e-12) { if (q.h > 0) best = 0; continue; }
        const r = q.h / R;
        if (r <= -1) continue;
        if (r >= 1) { best = 0; continue; }
        const t = Math.atan2(b, a) + Math.acos(r);
        if (t >= 0 && t < best) best = t;
      }
      return best;
    }
    /** Rows of points of the region, star-shaped about its centre (exact for the convex windows at integer depth):
        rows[j][i] at angle ψ_j about the centre and radial fraction i/nu; ψ includes the corner directions. */
    function patchRows(R, lift, nu, nPsi) {
      const c = R.center, [e1, e2] = frame(c), k = 1 + lift;
      let ang = [];
      for (let q = 0; q < nPsi; q++) ang.push(TAU * q / nPsi);
      for (const v of R.vertices) if (R.used.has(v.id)) { let a = Math.atan2(dot(v.p, e2), dot(v.p, e1)); if (a < 0) a += TAU; ang.push(a); }
      ang.sort((x, y) => x - y);
      ang = ang.filter((a, q) => q === 0 || a - ang[q - 1] > 1e-6);
      ang.push(ang[0] + TAU);
      return ang.map((psi) => {
        const d = add(scale(e1, Math.cos(psi)), scale(e2, Math.sin(psi))), rho = exitAlong(R.caps, c, d), row = [];
        for (let i = 0; i <= nu; i++) { const r = rho * i / nu; row.push(scale(add(scale(c, Math.cos(r)), scale(d, Math.sin(r))), k)); }
        return row;
      });
    }
    /** Points along one boundary arc, lifted off the sphere. */
    function arcPolyline(R, a, lift, stepDeg) {
      const c = R.caps[a.cap], n = Math.max(2, Math.ceil((a.t1 - a.t0) / ((stepDeg || 1.5) * DEG))), out = [];
      for (let q = 0; q <= n; q++) out.push(scale(onCircle(c, a.t0 + (a.t1 - a.t0) * q / n), 1 + lift));
      return out;
    }
    /** The whole boundary circle of a cap, lifted. */
    function circlePolyline(c, lift, n) {
      const q = prepare([c])[0], out = [];
      if (!q) return out;
      for (let k = 0; k <= n; k++) out.push(scale(onCircle(q, TAU * k / n), 1 + lift));
      return out;
    }

    /* ---------- linear algebra (small symmetric matrices) ---------- */
    /** Eigenvalues (ascending) and eigenvectors of a symmetric matrix, by cyclic Jacobi rotations. */
    function jacobi(A0) {
      const n = A0.length, A = A0.map((r) => r.slice()), V = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
      for (let sweep = 0; sweep < 80; sweep++) {
        let off = 0;
        for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += A[i][j] * A[i][j];
        if (off < 1e-32) break;
        for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
          const apq = A[p][q];
          if (Math.abs(apq) < 1e-300) continue;
          const th = (A[q][q] - A[p][p]) / (2 * apq), t = (th >= 0 ? 1 : -1) / (Math.abs(th) + Math.sqrt(th * th + 1));
          const c = 1 / Math.sqrt(t * t + 1), s = t * c;
          for (let k = 0; k < n; k++) { const x = A[k][p], y = A[k][q]; A[k][p] = c * x - s * y; A[k][q] = s * x + c * y; }
          for (let k = 0; k < n; k++) { const x = A[p][k], y = A[q][k]; A[p][k] = c * x - s * y; A[q][k] = s * x + c * y; }
          for (let k = 0; k < n; k++) { const x = V[k][p], y = V[k][q]; V[k][p] = c * x - s * y; V[k][q] = s * x + c * y; }
        }
      }
      const idx = [...Array(n).keys()].sort((a, b) => A[a][a] - A[b][b]);
      return { values: idx.map((i) => A[i][i]), vectors: idx.map((i) => V.map((r) => r[i])) };
    }
    /** Determinant by Gaussian elimination with partial pivoting. */
    function det(A0) {
      const n = A0.length;
      if (!n) return 1;
      const A = A0.map((r) => r.slice());
      let d = 1;
      for (let k = 0; k < n; k++) {
        let p = k;
        for (let i = k + 1; i < n; i++) if (Math.abs(A[i][k]) > Math.abs(A[p][k])) p = i;
        if (Math.abs(A[p][k]) < 1e-300) return 0;
        if (p !== k) { const tmp = A[p]; A[p] = A[k]; A[k] = tmp; d = -d; }
        d *= A[k][k];
        for (let i = k + 1; i < n; i++) { const f = A[i][k] / A[k][k]; for (let j = k; j < n; j++) A[i][j] -= f * A[k][j]; }
      }
      return d;
    }
    const rankOf = (values) => { const top = Math.max(1, ...values.map(Math.abs)); return values.filter((l) => Math.abs(l) > 1e-10 * top).length; };
    /** Moore–Penrose pseudoinverse of a symmetric matrix from its spectrum. */
    function pinv(G) {
      const n = G.length;
      if (!n) return { P: [], rank: 0, values: [] };
      const { values, vectors } = jacobi(G), top = Math.max(1, ...values.map(Math.abs)), P = Array.from({ length: n }, () => new Array(n).fill(0));
      let rank = 0;
      values.forEach((l, k) => {
        if (Math.abs(l) <= 1e-10 * top) return;
        rank += 1;
        const u = vectors[k];
        for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) P[i][j] += u[i] * u[j] / l;
      });
      return { P, rank, values };
    }
    /** The Gram data of a window of M records and the overlaps c of the candidate x:
          caps   the drawn records v₁ … v_M on S² (c_j = v_j·x),
          equi   the equicorrelated family G = (2/3)I + (1/3)11ᵀ (r = 1/3) with c = ½1,
          ortho  orthonormal records G = I_M with c = ½1 (both live in an ambient space of dimension ≥ M + 1). */
    function family(kind, M, x) {
      if (kind === 'caps') {
        const V = Array.from({ length: M }, (_, k) => anchor(k + 1));
        return { G: V.map((a) => V.map((b) => dot(a, b))), c: V.map((a) => dot(a, x)), V };
      }
      const r = kind === 'equi' ? 1 / 3 : 0;
      return { G: Array.from({ length: M }, (_, i) => Array.from({ length: M }, (_, j) => (i === j ? 1 : r))), c: new Array(M).fill(0.5) };
    }
    /** The bordered Gram matrix H = [[G, c], [cᵀ, 1]] and its Schur margin Δ = 1 − cᵀG⁺c (Q = cᵀG⁺c). */
    function schur(kind, M, x) {
      const { G, c } = family(kind, M, x), pi = pinv(G), Pm = pi.P;
      let Q = 0;
      for (let i = 0; i < M; i++) for (let j = 0; j < M; j++) Q += c[i] * Pm[i][j] * c[j];
      let range = 0;   // ‖(I − G G⁺) c‖∞: c must lie in the range of G
      for (let i = 0; i < M; i++) {
        let s = c[i];
        for (let k = 0; k < M; k++) { let gp = 0; for (let j = 0; j < M; j++) gp += G[i][j] * Pm[j][k]; s -= gp * c[k]; }
        range = Math.max(range, Math.abs(s));
      }
      const H = G.map((row, i) => row.concat([c[i]]));
      H.push(c.concat([1]));
      const eH = jacobi(H).values, rankH = rankOf(eH);
      return { kind, M, G, c, H, Q, delta: 1 - Q, rank: pi.rank, rankH, range, detG: pi.rank < M ? 0 : det(G), detH: rankH < M + 1 ? 0 : det(H), lambdaMinH: eH[0], eigG: pi.values, eigH: eH };
    }
    /** The block Gram matrix K = W Wᵀ of the records of A (and of B), W the 2M × 3 matrix of their coordinates. Its
        nonzero eigenvalues are those of the 3 × 3 matrix WᵀW, so rank K ≤ 3 and λ_min(K) = 0 exactly when 2M > 3. */
    function blockGram(M, eta, dual) {
      const rows = [];
      for (let j = 1; j <= M; j++) rows.push(anchor(j));
      if (dual) for (let j = 1; j <= M; j++) rows.push(ry(eta, anchor(j)));
      const n = rows.length, K = rows.map((a) => rows.map((b) => dot(a, b)));
      if (!n) return { n: 0, K, rank: 0, nullity: 0, lambdaMin: null, lambdaPlus: null, positive: [], rawMin: null };
      const WtW = [0, 1, 2].map((i) => [0, 1, 2].map((k) => rows.reduce((s, r) => s + r[i] * r[k], 0)));
      const ev = jacobi(WtW).values, top = Math.max(1, ...ev), positive = ev.filter((l) => l > 1e-10 * top), rank = positive.length;
      return { n, K, rank, nullity: n - rank, lambdaMin: n > rank ? 0 : Math.min(...positive), lambdaPlus: rank ? Math.min(...positive) : null, positive, rawMin: jacobi(K).values[0] };
    }
    /** Deterministic Fibonacci quadrature: 4π × (share of N spiral points inside every cap). */
    function fibonacci(list, N) {
      const cs = prepare(list);
      let hit = 0;
      for (let i = 0; i < N; i++) {
        const z = 1 - 2 * (i + 0.5) / N, r = Math.sqrt(Math.max(0, 1 - z * z)), ph = i * GOLDEN, p = [r * Math.cos(ph), r * Math.sin(ph), z];
        if (cs.every((c) => dot(p, c.n) >= c.h)) hit += 1;
      }
      return 4 * PI * hit / N;
    }
    return { MAX, GOLDEN, DEG, anchor, ry, frame, caps, prepare, margin, minDot, region, exitAlong, patchRows, arcPolyline, circlePolyline, onCircle,
      jacobi, det, pinv, rankOf, family, schur, blockGram, fibonacci, ease, dot, cross, add, sub, scale, norm, unit };
  })();
  // @@GEOMETRY-END

  /* ---------- constants of the cards ---------- */
  const SUBS = '₀₁₂₃₄₅₆₇₈₉';
  const sub = (n) => String(n).split('').map((d) => SUBS[Number(d)] || d).join('');
  const LN2 = Math.log(2), A60 = 60 * DEG, E10 = 10 * DEG;
  const { dot, cross, add, sub: vsub, scale, unit } = GW;
  const regionOf = (t, alpha, o) => GW.region(GW.caps(t, alpha, o));
  const R3 = regionOf(3, A60), R9 = regionOf(9, A60), RD9 = regionOf(9, A60, { B: true, eta: E10 });
  /** The lens of v₁, v₂ is symmetric about the great circle through them: x sits 25° off it, towards the normal n. */
  const LENS = (() => {
    const v1 = GW.anchor(1), v2 = GW.anchor(2), m = unit(add(v1, v2)), n = unit(cross(v1, v2));
    const at = (deg) => unit(add(scale(m, Math.cos(deg * DEG)), scale(n, Math.sin(deg * DEG))));
    return { x: at(25), look: at(32) };
  })();
  /** A camera that looks at the direction c from a little below and to one side (c sits just above the centre). */
  const viewFor = (c) => [Math.atan2(-c[0], -c[1]) + 0.16, clamp(Math.asin(clamp(c[2], -1, 1)) - 0.26, -1.25, 1.25)];
  const PRESETS = {
    'schur-cap-corridor': { to: 2, dual: false, eta: 10, gram: 'caps', x: LENS.x, view: viewFor(LENS.look), play: false, still: 2 },
    'golden-triangle-m3': { from: 0, to: 3, dual: false, eta: 10, gram: 'caps', x: R3.center, view: viewFor(R3.center), play: true, still: 3 },
    'overconstrained-lock-m9': { from: 3, to: 10, dual: false, eta: 10, gram: 'ortho', x: R9.center, view: viewFor(R9.center), play: true, still: 9 },
    'forgetting-reopen': { from: 9, to: 8, dual: false, eta: 10, gram: 'caps', x: R9.center, view: viewFor(R9.center), release: true, still: 8 },
    'dual-window-consensus': { from: 9, to: 3, dual: true, eta: 10, gram: 'caps', x: RD9.center, view: viewFor(RD9.center), release: true, still: 3 }
  };
  const FAMILY_NAME = { caps: ['S² 黄金螺旋帽', 'S² golden caps'], equi: ['等相关 r = 1/3', 'equicorrelated r = 1/3'], ortho: ['正交 I<sub>M</sub>', 'orthonormal I<sub>M</sub>'] };

  /* ---------- state ---------- */
  const S = { t: 3, alpha: 60, dual: false, eta: 10, gram: 'caps', x: R3.center.slice(), trace: null, sel: null, stopAt: null };
  const ALPHA = () => S.alpha * DEG, ETA = () => S.eta * DEG;
  const mOf = (t) => clamp(Math.ceil(t - 1e-9), 0, GW.MAX);
  let lastCenter = R9.center.slice();

  const cache = new Map();
  function memo(key, make) {
    if (cache.has(key)) { const v = cache.get(key); cache.delete(key); cache.set(key, v); return v; }
    const v = make();
    cache.set(key, v);
    if (cache.size > 240) cache.delete(cache.keys().next().value);
    return v;
  }
  /** The corridor of observer 'A', of 'B', or their consensus 'AB', at memory depth t for the current α and η. */
  const regionAt = (t, who) => memo(`R|${who}|${t.toFixed(9)}|${S.alpha}|${who === 'A' ? '' : S.eta}`,
    () => GW.region(GW.caps(t, ALPHA(), { A: who !== 'B', B: who !== 'A', eta: ETA() })));
  /** q = ln(|Ω_{M−1}| / |Ω_M|): ∞ once the corridor is empty, undefined when both are. */
  const qOf = (prev, cur) => (!prev || !cur ? null : cur.area > 0 ? Math.log(prev.area / cur.area) : prev.area > 0 ? Infinity : null);

  /** Everything the page shows, from the state. */
  function model() {
    const t = S.t, M = mOf(t);
    const liveA = regionAt(t, 'A'), liveB = S.dual ? regionAt(t, 'B') : null, liveAB = S.dual ? regionAt(t, 'AB') : null;
    const shown = S.dual ? liveAB : liveA;
    const winA = regionAt(M, 'A'), prevA = M > 0 ? regionAt(M - 1, 'A') : null, winAB = regionAt(M, 'AB'), prevAB = M > 0 ? regionAt(M - 1, 'AB') : null;
    const win = S.dual ? winAB : winA, prev = S.dual ? prevAB : prevA;
    const sch = GW.schur(S.gram, M, S.x), block = memo(`K|${M}|${S.eta}|${S.dual}`, () => GW.blockGram(M, ETA(), S.dual));
    if (!shown.empty && !shown.full && shown.center) lastCenter = shown.center;
    return { t, M, integer: Math.abs(t - Math.round(t)) < 1e-9, liveA, liveB, liveAB, shown, winA, prevA, winAB, prevAB, win, prev,
      q: qOf(prev, win), sch, block, marginX: GW.margin(shown.caps, S.x) };
  }

  /* ---------- the instances of the cited theorems (checked live, exposed to the suite) ---------- */
  const I3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  const mmul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
  const maxAbs = (A, B) => A.reduce((m, r, i) => Math.max(m, ...r.map((x, j) => Math.abs(x - (B ? B[i][j] : 0)))), 0);
  const gram3 = (a, b, c) => [a, b, c].map((p) => [a, b, c].map((q) => dot(p, q)));
  const formula3 = (a, b, c) => { const uu = dot(a, a), vv = dot(b, b), ww = dot(c, c), uv = dot(a, b), uw = dot(a, c), vw = dot(b, c); return uu * vv * ww + 2 * uv * uw * vw - uu * vw * vw - vv * uw * uw - ww * uv * uv; };
  /** Q = OᵀO with O = Λ^{1/2}Vᵀ when Q ≥ 0 (its spectrum), else no factor. */
  function factor(H) {
    const { values, vectors } = GW.jacobi(H);
    if (values[0] < -1e-10) return { psd: false, lambdaMin: values[0] };
    const O = values.map((l, k) => vectors[k].map((x) => Math.sqrt(Math.max(0, l)) * x));
    const OtO = H.map((_, i) => H.map((__, j) => O.reduce((s, r) => s + r[i] * r[j], 0)));
    return { psd: true, lambdaMin: values[0], residual: maxAbs(OtO, H) };
  }
  function instances(Mo) {
    return memo(`I|${Mo.M}|${S.alpha}|${S.eta}|${S.dual}|${S.x.join(',')}`, () => {
      const m = Math.max(Mo.M, 1), eta = ETA(), V = Array.from({ length: Math.max(m, 3) }, (_, k) => GW.anchor(k + 1)), W = V.map((v) => GW.ry(eta, v));
      const win = V.slice(0, m), winB = W.slice(0, m), x = S.x, [v1, v2, v3] = V;
      const GA = win.map((a) => win.map((b) => dot(a, b))), GB = winB.map((a) => winB.map((b) => dot(a, b)));
      let off = -Infinity;
      GA.forEach((r, i) => r.forEach((g, j) => { if (i !== j) off = Math.max(off, g); }));
      const crossDiag = win.map((v, j) => dot(v, winB[j]));
      const unitGram = { unitResidual: Math.max(...V.map((v) => Math.abs(GW.norm(v) - 1))), offDiagonalMax: m > 1 ? off : null,
        crossDiagonalMax: Math.max(...crossDiag), crossAllOne: crossDiag.every((c) => Math.abs(c - 1) < 1e-12), sameAnchors: winB.every((w, j) => GW.norm(vsub(w, win[j])) < 1e-12) };
      const c12 = dot(v1, v2), det2 = GW.det([[dot(v1, v1), c12], [c12, dot(v2, v2)]]), f2 = dot(v1, v1) * dot(v2, v2) - c12 * c12, cr2 = GW.norm(cross(v1, v2)) ** 2;
      const twoAnchor = { det: det2, formula: f2, cross2: cr2, residual: Math.max(Math.abs(det2 - f2), Math.abs(det2 - cr2)), positive: det2 > 0, independent: Math.sqrt(cr2) > 1e-12 };
      const dX = GW.det(gram3(v1, v2, x)), fX = formula3(v1, v2, x), tX = dot(v1, cross(v2, x)) ** 2, d3 = GW.det(gram3(v1, v2, v3)), f33 = formula3(v1, v2, v3), t3 = dot(v1, cross(v2, v3)) ** 2;
      const threeAnchor = { detX: dX, formulaX: fX, tripleX: tX, det3: d3, formula3: f33, triple3: t3, residual: Math.max(Math.abs(dX - fX), Math.abs(d3 - f33), Math.abs(dX - tX), Math.abs(d3 - t3)), det3Positive: d3 > 0 };
      const realize = ['equi', 'ortho'].map((k) => { const s = GW.schur(k, m, x), f = factor(s.H); return { kind: k, M: m, delta: s.delta, lambdaMin: f.lambdaMin, psd: f.psd, residual: f.psd ? f.residual : null }; });
      const R = [[Math.cos(eta), 0, Math.sin(eta)], [0, 1, 0], [-Math.sin(eta), 0, Math.cos(eta)]], Rt = R[0].map((_, j) => R.map((r) => r[j]));
      const rotRes = Math.max(...win.map((v, j) => GW.norm(vsub(R.map((r) => dot(r, v)), winB[j]))));
      const unitary = { gramResidual: maxAbs(GA, GB), rotationResidual: rotRes, orthogonalResidual: maxAbs(mmul(Rt, R), I3) };
      const { P: Gp, rank } = GW.pinv(GA), PS = I3.map((_, i) => I3.map((__, j) => { let s = 0; win.forEach((a, p) => win.forEach((b, q) => { s += a[i] * Gp[p][q] * b[j]; })); return s; }));
      const Pp = I3.map((r, i) => r.map((e, j) => e - PS[i][j])), Ppx = Pp.map((r) => dot(r, x));
      const sch = GW.schur('caps', m, x), deltaProj = dot(Ppx, Ppx);
      const projection = { rank, idempotentS: maxAbs(mmul(PS, PS), PS), idempotentPerp: maxAbs(mmul(Pp, Pp), Pp), crossSP: maxAbs(mmul(PS, Pp)), crossPS: maxAbs(mmul(Pp, PS)),
        sumResidual: maxAbs(PS.map((r, i) => r.map((e, j) => e + Pp[i][j])), I3), deltaProjection: deltaProj, deltaSchur: sch.delta, deltaResidual: Math.abs(deltaProj - sch.delta) };
      let escape = { exists: false, rank };
      if (rank < 3) {
        const ev = GW.jacobi(Pp), e = unit(ev.vectors[ev.vectors.length - 1]), PSe = PS.map((r) => dot(r, e));
        escape = { exists: true, rank, e, norm: GW.norm(e), projection: GW.norm(PSe), distance: GW.norm(vsub(e, PSe)), operatorNorm: ev.values[ev.values.length - 1] };
      }
      let pairOff = 0;
      win.forEach((a, i) => win.forEach((b, j) => { if (i !== j) pairOff = Math.max(pairOff, dot(a, b) ** 2); }));
      const capacity = { d: 3, basisPairing: maxAbs(I3.map((a) => I3.map((b) => dot(a, b) ** 2)), I3), records: 3, windowPairingOffMax: m > 1 ? pairOff : null, orthonormalFitsInR3: m <= 3 };
      // a qubit coherence ρ₀₁ = ½ copied into m records: phases e^{iγl} for the newer ones, cos α_coh for the oldest
      const rho = 0.5, h = Math.cos(ALPHA()), phases = Array.from({ length: m - 1 }, (_, l) => [Math.cos(GW.GOLDEN * (l + 1)), Math.sin(GW.GOLDEN * (l + 1))]);
      const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
      let after = [rho * h, 0];
      for (const z of phases) after = cm(after, z);
      let back = after;
      for (const z of phases) back = cm(back, [z[0], -z[1]]);
      const surviving = { copies: m, oldestOverlap: h, recovered: back, target: rho, gap: Math.hypot(back[0] - rho, back[1]), residual: Math.hypot(back[0] - rho * h, back[1]) };
      let spread = 0;
      for (let k = 0; k <= 12; k++) {
        const e2 = k < 12 ? 5 * k * DEG : eta, G = win.map((a) => win.map((b) => dot(GW.ry(e2, a), GW.ry(e2, b))));
        spread = Math.max(spread, maxAbs(G, GA));
      }
      const common = { contexts: 13, spread };
      // a balance β·Q = −ΔS + I + D with I, D ≥ 0: −ΔS is the reopening q_M of the window (ln 2 while it is undefined,
      // infinite or 0), I and D two fixed non-negative terms; the bound −ΔS ≤ β·Q holds with slack I + D
      const fromQ = Number.isFinite(Mo.q) && Mo.q > 0, negDeltaS = fromQ ? Mo.q : LN2, mutual = 0.08, divergence = 0.12;
      const betaQ = negDeltaS + mutual + divergence, slackL = betaQ - negDeltaS;
      const landauer = { fromQ, negDeltaS, I: mutual, D: divergence, betaQ, slack: slackL, reversibleBetaQ: negDeltaS,
        nonNegative: mutual >= 0 && divergence >= 0, bound: negDeltaS <= betaQ, residual: Math.abs(slackL - (mutual + divergence)) };
      return { unitGram, twoAnchor, threeAnchor, realize, unitary, projection, escape, capacity, surviving, common, landauer };
    });
  }

  /* ---------- stage ---------- */
  const stageEl = $('stageWrap'), canvas = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; probe.style.position = 'absolute'; tagBox.appendChild(probe);
  const V0 = PRESETS['golden-triangle-m3'].view;
  const options = { canvas, yaw: V0[0], pitch: V0[1], wheel: false, radius: 0.36, cx: 0.5, cy: 0.5, onChange: () => paint() };
  const sc = kit.solid(stageEl, options);
  const loupeCv = sc.overlay();
  stageEl.insertBefore(loupeCv, tagBox);   // the magnifier lies under the labels
  if (TRV.still) stageEl.classList.add('still');

  function boxOf(el, sr) {
    if (!el || el.hidden || !el.getClientRects().length) return null;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return null;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return null;
    return { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
  }
  function hudBoxes() {
    const sr = stageEl.getBoundingClientRect(), out = [];
    for (const el of [$('hudTl'), $('observerChips'), $('legend')]) { const b = boxOf(el, sr); if (b && (el.id !== 'legend' || el.textContent.trim())) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 8); else bottom = Math.min(bottom, b.y - 8); }
    return { x: 12, y: top, w: Math.max(40, W - 24), h: Math.max(60, bottom - top) };
  }
  /** The sphere between the title and the legend; on a wide stage it keeps the bottom-right corner for the magnifier,
      whether or not the magnifier is shown, so the sphere does not jump when it appears. */
  function fitSphere(W, H, huds) {
    const area = TRV.thumbMode ? { x: 16, y: 16, w: W - 32, h: H - 32 } : safeRect(W, H, huds);
    const s = Math.round(clamp(0.34 * Math.min(area.w, area.h), 0, 184)), side = s >= 84 && area.w >= 1.45 * area.h;
    const box = side ? { x: area.x, y: area.y, w: area.w - s - 10, h: area.h } : area;
    const R = Math.max(30, 0.47 * Math.min(box.w, box.h));
    return { area, R, cx: box.x + box.w / 2, cy: box.y + box.h / 2, loupe: s >= 84 ? { x: area.x + area.w - s, y: area.y + area.h - s, s } : null };
  }

  /* labels: placed after drawing by priority, off each other, the HUD, the magnifier and the handle */
  const sizes = new Map();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizes.clear(); paint(); });
  TRV.onLang(() => sizes.clear());
  function sizeOf(html, cls) {
    const k = `${TRV.lang()}|${cls}|${html}`;
    let s = sizes.get(k);
    if (!s) { probe.className = 'tag ' + cls; probe.innerHTML = html; probe.hidden = false; s = [probe.offsetWidth, probe.offsetHeight]; probe.hidden = true; if (s[0] > 0) sizes.set(k, s); }
    return s;
  }
  let LB = [], OBST = [], BOUNDS = null, PLACED = [];
  const want = (key, q, html, cls, o = {}) => LB.push({ key, q, html, cls, pri: o.pri || 0, dir: o.dir || [0, -1], r: o.r == null ? 10 : o.r });
  const meets = (a, b, m) => a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m;
  function placeLabels() {
    const placed = [];
    LB.sort((a, b) => b.pri - a.pri);
    for (const l of LB) {
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      const base = Math.atan2(l.dir[1], l.dir[0]), cands = [];
      for (const r of [l.r, l.r + 10, l.r + 24, l.r + 40]) for (const da of [0, 0.5, -0.5, 1.0, -1.0, 1.6, -1.6, 2.3, -2.3, PI]) {
        const ux = Math.cos(base + da), uy = Math.sin(base + da), ext = Math.abs(ux) * w / 2 + Math.abs(uy) * h / 2;
        cands.push([ux * (r + ext), uy * (r + ext)]);
      }
      let ok = null;
      for (const [dx, dy] of cands) {
        const b = { x: l.q[0] + dx - w / 2, y: l.q[1] + dy - h / 2, w, h };
        if (b.x < BOUNDS.x || b.y < BOUNDS.y || b.x + w > BOUNDS.x + BOUNDS.w || b.y + h > BOUNDS.y + BOUNDS.h) continue;
        if (placed.some((p) => meets(p, b, 3)) || OBST.some((p) => meets(p, b, 2))) continue;
        ok = b; break;
      }
      if (!ok) continue;
      placed.push(Object.assign({ key: l.key }, ok));
      sc.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
    }
    PLACED = placed;
  }

  let FIT = null, FRAME = null, LOUPE = null, dragging = null;
  const greatCircle = (n, lift, N) => { const [e1, e2] = GW.frame(n), out = []; for (let k = 0; k <= N; k++) { const a = TAU * k / N; out.push(scale(add(scale(e1, Math.cos(a)), scale(e2, Math.sin(a))), 1 + lift)); } return out; };
  const arcBetween = (a, b, lift, N) => Array.from({ length: N + 1 }, (_, k) => scale(v3.slerp(a, b, k / N), 1 + lift));
  /** The region as a lit patch on the sphere: exact (star-shaped about its centre) for the corridors of an integer
      window and for a single cap; during the first half-second of observer B a region can be most of the sphere with
      two holes, drawn then as a faint veil over the whole sphere. */
  function fill(key, R, color, lift, alpha, grid) {
    if (!R || R.empty) return;
    const disc = R.loops === 1 && R.chi === 1 && (R.area <= 2 * PI || (R.arcs.length === 1 && R.arcs[0].full));
    // the patch is star-shaped about R.center only while that point lies in every cap; in the rare frames where it
    // does not (a corridor about to shut, below a pixel, or a near-hemisphere consensus) no fan is drawn from it
    const inside = !!R.center && GW.margin(R.caps, R.center) >= 0;
    if (!R.full && disc && !inside && R.area < 1e-3) return;
    if (R.full || !disc || !inside) { sc.surface(key, (u, v) => scale(v3.sph(u, v), 1 + lift), { u: [0, PI], v: [0, TAU], nu: 24, nv: 48, color, alpha: Math.min(alpha, 0.3), pick: false }); return; }
    sc.surface(key, GW.patchRows(R, lift, 28, 180), { color, alpha, grid, pick: false });
  }
  /** The Schur construction is drawn for the caps of the sphere while their span is not yet all of ℝ³. */
  const schurShown = (Mo) => S.gram === 'caps' && !S.dual && (Mo.M === 1 || Mo.M === 2);
  function schurGeometry(Mo) {
    const v1 = GW.anchor(1), x = S.x;
    if (Mo.M === 2) {
      const n = unit(cross(v1, GW.anchor(2))), sgn = dot(x, n) >= 0 ? 1 : -1, foot = unit(vsub(x, scale(n, dot(x, n))));
      return { plane: n, pole: scale(n, sgn), foot, delta: Math.asin(clamp(Math.abs(dot(x, n)), 0, 1)) };
    }
    const foot = dot(x, v1) >= 0 ? v1 : scale(v1, -1);
    return { plane: null, pole: null, foot, delta: Math.acos(clamp(Math.abs(dot(x, v1)), -1, 1)) };
  }

  function drawStage(Mo) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes();
    if (!dragging || !FIT) FIT = fitSphere(W, H, huds);
    options.radius = FIT.R / Math.max(1, Math.min(W, H));
    options.cx = FIT.cx / Math.max(1, W);
    options.cy = FIT.cy / Math.max(1, H);
    const small = Mo.shown.empty || (!Mo.shown.full && Mo.shown.area < 0.6);
    LOUPE = !thumb && small && FIT.loupe ? FIT.loupe : null;
    OBST = huds.slice();
    if (LOUPE) OBST.push({ x: LOUPE.x - 4, y: LOUPE.y - 4, w: LOUPE.s + 8, h: LOUPE.s + 8 });
    BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = [];
    const tags = [], M = Mo.M;
    sc.begin();
    const facing = sc.facing(), front = (p) => dot(p, facing) > 0.06;
    const at = (p, html, cls, pri, dir) => { if (!thumb && front(p)) tags.push({ p, html, cls, pri, dir }); };
    /* the sphere of directions */
    sc.surface('sphere', (u, v) => v3.sph(u, v), { u: [0, PI], v: [0, TAU], nu: 36, nv: 72, color: P.lineHot, grid: { every: [6, 6], color: P.ink, alpha: 0.1 }, pick: false });
    /* the path of the records, newest first, and their cap boundaries; a cap that squeezes the corridor is bright */
    const active = new Set(Mo.shown.active.map((a) => a.obs + a.j));
    const capLines = (R, color) => {
      if (!R) return;
      for (const c of R.caps) {
        const on = active.has(c.obs + c.j), entering = !Mo.integer && c.j === M;
        // the cap that is closing in is drawn wider and softer; solid lines, since every dash would be its own mesh
        sc.line(GW.circlePolyline(c, 0.005, 144), { color, width: entering ? 2.2 : on ? 1.7 : 1.1, alpha: entering ? 0.7 : on ? 0.95 : 0.42 });
      }
    };
    capLines(Mo.liveA, P.cyan);
    if (S.dual) capLines(Mo.liveB, P.violet);
    const path = [];
    for (let j = 1; j < Math.max(M, 1); j++) path.push(...arcBetween(GW.anchor(j), GW.anchor(j + 1), 0.009, 10));
    if (path.length > 1) sc.line(path, { color: P.cyan, width: 1, alpha: 0.38 });
    /* the corridors */
    if (S.dual) {
      fill('omegaA', Mo.liveA, P.cyan, 0.008, 1);
      fill('omegaB', Mo.liveB, P.violet, 0.011, 0.45);
      fill('consensus', Mo.liveAB, P.violet, 0.014, 1, { every: [4, 24], color: P.ink, alpha: 0.2 });
    } else fill('omegaA', Mo.liveA, P.cyan, 0.008, 1, { every: [4, 24], color: P.ink, alpha: 0.2 });
    if (!Mo.shown.empty && !Mo.shown.full) Mo.shown.arcs.forEach((a, k) => sc.tube(`edge${k}`, GW.arcPolyline(Mo.shown, a, 0.018, 1.5), { color: P.magenta, width: 2.6, glow: 0.35, pick: false, occlude: false }));
    /* the records */
    for (const c of Mo.liveA.caps) sc.bead(scale(c.n, 1.016), { key: `v${c.j}`, color: P.cyan, r: c.j === 1 ? 4.4 : 3.3 });
    if (S.dual && Mo.liveB) for (const c of Mo.liveB.caps) sc.bead(scale(c.n, 1.016), { key: `w${c.j}`, color: P.violet, r: c.j === 1 ? 4.4 : 3.3 });
    if (M >= 1) at(scale(GW.anchor(1), 1.028), 'v₁', 'raw c-cy backed', 8, null);
    if (M >= 2) at(scale(GW.anchor(M), 1.028), `v${sub(M)}`, 'raw c-cy backed', 7, null);
    if (S.dual && M >= 1) at(scale(GW.ry(ETA(), GW.anchor(1)), 1.028), 'w₁', 'raw c-vi backed', 6, null);
    /* the Schur margin of x: its height above the plane of the records */
    if (schurShown(Mo)) {
      const g = schurGeometry(Mo);
      if (g.plane) {
        sc.line(greatCircle(g.plane, 0.006, 180), { color: P.cyan, width: 1.5, dash: [10, 7], alpha: 0.95 });
        sc.bead(scale(g.pole, 1.016), { key: 'pole', color: P.ink, r: 4 });
        at(scale(g.pole, 1.035), 'n', 'raw backed', 6, null);
      }
      if (g.delta > 1e-3) {
        const arc = arcBetween(g.foot, S.x, 0.021, 32);
        sc.tube('escape', arc, { color: P.magenta, width: 3.2, glow: 0.5, pick: false, occlude: false });
        sc.bead(scale(g.foot, 1.021), { key: 'foot', color: P.magenta, r: 3.2 });
        at(arc[16], `δ · Δ = sin²δ = ${fix(Math.sin(g.delta) ** 2, 4)}`, 'raw c-mg backed', 9, null);
      }
    }
    /* what forgetting released: the old corridor and the released cap, dashed */
    const tr = S.trace && Math.abs(S.trace.t - S.t) < 1e-9 ? S.trace : null;
    if (tr) {
      const B0 = tr.before;
      if (B0 && !B0.empty && !B0.full) B0.arcs.forEach((a) => sc.line(GW.arcPolyline(B0, a, 0.022, 1), { color: P.magenta, width: 1.7, dash: [5, 4], alpha: 0.95 }));
      if (tr.released.length <= 2) for (const j of tr.released) {
        sc.line(GW.circlePolyline({ n: GW.anchor(j), h: Math.cos(ALPHA()) }, 0.006, 144), { color: P.magenta, width: 1.3, dash: [9, 6], alpha: 0.8 });
        if (tr.dual) sc.line(GW.circlePolyline({ n: GW.ry(ETA(), GW.anchor(j)), h: Math.cos(ALPHA()) }, 0.006, 144), { color: P.magenta, width: 1.3, dash: [9, 6], alpha: 0.8 });
      }
    }
    /* the heatmap's selection: the two records of the chosen inner product */
    for (const p of selectedPoints(Mo)) sc.ring(scale(p, 1.018), { key: 'sel', color: P.amber, r: 7, normal: p });
    /* the candidate x */
    sc.bead(scale(S.x, 1.022), { key: 'x', color: P.amber, r: 5.6, glow: 0.7 });
    sc.ring(scale(S.x, 1.016), { key: 'x-ring', color: P.amber, r: 9.5, normal: S.x });
    at(scale(S.x, 1.03), 'x', 'raw c-am backed', 10, [1, -0.6]);
    if (!Mo.shown.empty && !Mo.shown.full && Mo.shown.center) at(scale(Mo.shown.center, 1.028), areaTag(Mo), `raw ${S.dual ? 'c-vi' : 'c-cy'} backed`, 9, null);
    if (Mo.shown.empty) at(scale(lastCenter, 1.028), `Ω${sub(M)} = ∅`, 'raw c-mg backed', 9, null);
    sc.end();

    const hq = !thumb && front(S.x) ? sc.p(scale(S.x, 1.022)) : null;
    if (hq) OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    placeHandle(hq);
    if (!thumb) {
      const cen = sc.p([0, 0, 0]);
      tags.forEach((t, k) => { const q = sc.p(t.p), dir = t.dir ? t.dir : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1]; want(`t${k}`, q, t.html, t.cls, { pri: t.pri, dir, r: 12 }); });
      placeLabels();
    }
    drawLoupe(Mo, tr);
    FRAME = { W, H, area: FIT.area, R: FIT.R, unit: sc.unit, cx: sc.cx, cy: sc.cy, handle: hq ? { x: hq[0], y: hq[1] } : null, loupe: LOUPE };
  }
  const areaTag = (Mo) => {
    const n = Mo.integer ? sub(Mo.M) : '';
    return S.dual ? `|Ω<sub>A</sub> ∩ Ω<sub>B</sub>| = ${fix(Mo.shown.area, 6)} sr` : `|Ω${n}| = ${fix(Mo.shown.area, 6)} sr`;
  };

  /* ---------- the magnifier: a gnomonic close-up of a small corridor, oriented as the stage ---------- */
  function drawLoupe(Mo, tr) {
    const cv = loupeCv, dpr = TRV.fitCanvas(cv), ctx = cv.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
    if (!LOUPE) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const { x: lx, y: ly, s } = LOUPE, ox = lx + s / 2, oy = ly + s / 2, rad = s / 2 - 1;
    const R = Mo.shown, c0 = R.empty ? lastCenter : R.center, Rc = sc.cam;
    const camR = [Math.cos(Rc.yaw), -Math.sin(Rc.yaw), 0], camU = [Math.sin(Rc.yaw) * Math.sin(Rc.pitch), Math.cos(Rc.yaw) * Math.sin(Rc.pitch), Math.cos(Rc.pitch)];
    const e1 = unit(vsub(camR, scale(c0, dot(camR, c0)))), e2 = unit(vsub(vsub(camU, scale(c0, dot(camU, c0))), scale(e1, dot(camU, e1))));
    const gp = (p) => { const d = dot(p, c0); return d > 0.08 ? [dot(p, e1) / d, dot(p, e2) / d] : null; };
    const outline = (Rg) => (!Rg || Rg.empty || Rg.full ? [] : GW.patchRows(Rg, 0, 1, 240).map((row) => row[1]));
    const ring = outline(R), old = tr ? outline(tr.before) : [];
    let ext = 0.03;
    for (const p of ring.concat(old)) { const q = gp(p); if (q) ext = Math.max(ext, Math.hypot(q[0], q[1])); }
    const k = (rad - 12) / (ext * 1.18), X = (q) => ox + k * q[0], Y = (q) => oy - k * q[1];
    // leader from the magnifier to the corridor on the sphere
    const tq = sc.p(c0);
    if (dot(c0, sc.facing()) > 0.05) {
      const dx = tq[0] - ox, dy = tq[1] - oy, dl = Math.hypot(dx, dy);
      if (dl > rad + 6) {
        ctx.strokeStyle = P.dim; ctx.globalAlpha = 0.75; ctx.lineWidth = 1; ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(ox + dx / dl * rad, oy + dy / dl * rad); ctx.lineTo(tq[0], tq[1]); ctx.stroke(); ctx.setLineDash([]);
        ctx.globalAlpha = 1; ctx.beginPath(); ctx.arc(tq[0], tq[1], 3, 0, TAU); ctx.fillStyle = P.dim; ctx.fill();
      }
    }
    ctx.save();
    ctx.beginPath(); ctx.arc(ox, oy, rad, 0, TAU); ctx.closePath();
    ctx.fillStyle = TRV.alpha(P.void, 0.9); ctx.fill();
    ctx.clip();
    const poly = (pts, close) => { ctx.beginPath(); let pen = false; for (const p of pts) { const q = gp(p); if (!q) { pen = false; continue; } if (pen) ctx.lineTo(X(q), Y(q)); else { ctx.moveTo(X(q), Y(q)); pen = true; } } if (close) ctx.closePath(); };
    // the cap boundaries near the corridor: A cyan, B violet
    const capsShown = (Rg, color) => { if (!Rg) return; for (const c of Rg.caps) { ctx.strokeStyle = color; ctx.globalAlpha = 0.7; ctx.lineWidth = 1.2; poly(GW.circlePolyline(c, 0, 240), false); ctx.stroke(); } };
    capsShown(Mo.liveA, P.cyan);
    if (S.dual) capsShown(Mo.liveB, P.violet);
    ctx.globalAlpha = 1;
    if (ring.length > 2) {
      ctx.fillStyle = S.dual ? P.violet : P.cyan; ctx.globalAlpha = 0.42; poly(ring, true); ctx.fill();
      ctx.globalAlpha = 1; ctx.strokeStyle = P.magenta; ctx.lineWidth = 2; poly(ring, true); ctx.stroke();
    }
    if (old.length > 2) { ctx.strokeStyle = P.magenta; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3]); poly(old, true); ctx.stroke(); ctx.setLineDash([]); }
    const xq = gp(S.x);
    if (xq && Math.hypot(X(xq) - ox, Y(xq) - oy) < rad - 4) { ctx.fillStyle = P.amber; ctx.beginPath(); ctx.arc(X(xq), Y(xq), 4, 0, TAU); ctx.fill(); }
    if (R.empty) { ctx.fillStyle = P.magenta; ctx.font = `600 ${Math.round(s * 0.16)}px ${TRV.fonts.data}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('∅', ox, oy); }
    ctx.restore();
    ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1.5; ctx.globalAlpha = 1; ctx.beginPath(); ctx.arc(ox, oy, rad, 0, TAU); ctx.stroke();
    ctx.fillStyle = P.dim; ctx.font = `10px ${TRV.fonts.data}`; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.fillText(`×${Math.max(1, Math.round(k / Math.max(1, sc.unit)))}`, ox, ly + s - 7);
    LOUPE.zoom = k / Math.max(1, sc.unit);
  }

  /* ---------- the candidate handle: a button on the stage, dragged over the sphere ---------- */
  const handle = $('candidateHandle');
  function placeHandle(q) {
    const show = !!q && !TRV.still;
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
  }
  const endDrag = (ev) => {
    if (!dragging || (ev && ev.pointerId != null && ev.pointerId !== dragging.pointer)) return;
    try { if (handle.hasPointerCapture(dragging.pointer)) handle.releasePointerCapture(dragging.pointer); } catch (e) { /* already released */ }
    dragging = null; handle.classList.remove('dragging'); paint();
  };
  handle.addEventListener('pointerdown', (ev) => {
    if (ev.button > 0 || TRV.still) return;
    ev.preventDefault(); ev.stopPropagation();
    leave();
    dragging = { pointer: ev.pointerId }; handle.classList.add('dragging');
    try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events carry no capture */ }
  });
  handle.addEventListener('pointermove', (ev) => {
    if (!dragging || ev.pointerId !== dragging.pointer) return;
    ev.preventDefault();
    S.x = unit(sc.pick(ev)); paint();
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    const k = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [1, 1], ArrowDown: [1, -1] }[ev.key];
    if (!k) return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    const cam = sc.cam, axis = k[0] ? [Math.cos(cam.yaw), -Math.sin(cam.yaw), 0] : [Math.sin(cam.yaw) * Math.sin(cam.pitch), Math.cos(cam.yaw) * Math.sin(cam.pitch), Math.cos(cam.pitch)];
    S.x = unit(v3.rot(S.x, axis, (k[0] ? -k[1] : k[1]) * 3 * DEG)); paint();
  });

  /* ---------- HUD, legend, readouts ---------- */
  const legendItems = (Mo) => {
    const out = [];
    if (S.dual) {
      out.push(['cy', L('A：相干帽与走廊 Ω<sub>A</sub>', 'A: coherence caps and corridor Ω<sub>A</sub>')]);
      out.push(['vi', L('B：相干帽、Ω<sub>B</sub> 与共识 Ω<sub>A</sub> ∩ Ω<sub>B</sub>', 'B: caps, Ω<sub>B</sub> and consensus Ω<sub>A</sub> ∩ Ω<sub>B</sub>')]);
    } else out.push(['cy', L('相干帽与走廊 Ω<sub>M</sub>', 'coherence caps and corridor Ω<sub>M</sub>')]);
    out.push(['mg', schurShown(Mo) ? L('收紧走廊的边界 · x 离记录张成空间的角 δ', 'boundary that squeezes it · angle δ of x off the span of the records')
      : L('收紧走廊的边界 · 虚线：遗忘的痕迹', 'boundary that squeezes it · dashed: what was forgotten')]);
    if (schurShown(Mo) && Mo.M === 2) out.push(['ik', L('法向 n · 虚线大圆：span(v₁, v₂)', 'normal n · dashed circle: span(v₁, v₂)')]);
    out.push(['am', L('候选态 x（可拖动）', 'candidate x (drag it)')]);
    return out;
  };
  const sr = (a) => `${fix(a, 6)} sr`;
  const pct4 = (a) => `${fix(100 * a / (4 * PI), 4)}%`;
  const qText = (q) => (q == null ? '—' : q === Infinity ? L('∞（走廊已空）', '∞ (the corridor is empty)') : `${fix(q, 6)} nats = ${fix(q / LN2, 6)} bits`);
  const tLabel = (Mo) => (Mo.integer ? String(Mo.M) : fix(Mo.t, 2));
  function hudText(Mo) {
    const area = Mo.shown.area, tr = S.trace && Math.abs(S.trace.t - S.t) < 1e-9 ? S.trace : null;
    const big = S.dual ? `M = ${tLabel(Mo)} · |Ω<sub>A</sub> ∩ Ω<sub>B</sub>| = ${sr(area)}` : `M = ${tLabel(Mo)} · |Ω| = ${sr(area)}`;
    let sub2;
    if (tr) {
      const q = traceQ(tr, area);
      sub2 = `${L('遗忘', 'forgot')} ${tr.released.map((j) => `v${sub(j)}`).join(' ')}${tr.dual ? L('（双方）', ' (both)') : ''} · ${fix(tr.beforeArea, 6)} → ${sr(area)}${q != null ? ` · q = ${fix(q, 6)} nats` : ''}`;
    } else if (Mo.shown.empty) sub2 = L(`Ω${sub(Mo.M)} = ∅：再没有方向同时落在所有帽里`, `Ω${sub(Mo.M)} = ∅: no direction lies in every cap any more`);
    else if (schurShown(Mo)) sub2 = `Δ = 1 − cᵀG⁻¹c = sin²δ = ${fix(Mo.sch.delta, 6)} · det G${sub(Mo.M + 1)} = det G${sub(Mo.M)} · Δ = ${fix(Mo.sch.detH, 6)}`;
    else if (S.dual) sub2 = `η = ${fix(S.eta, 0)}° · ${L('占 A 走廊的', 'share of the A corridor')} ${Mo.liveA.area > 0 ? fix(100 * area / Mo.liveA.area, 4) : '0'}%`;
    else if (Mo.integer && Mo.M === 3 && S.gram === 'caps') sub2 = `det G₃(v₁, v₂, v₃) = ${fix(Mo.sch.detG, 6)} > 0 · ${pct4(area)} ${L('的球面', 'of the sphere')}`;
    else sub2 = `${pct4(area)} ${L('的球面', 'of the sphere')}${Mo.M >= 1 && Mo.integer ? ` · q${sub(Mo.M)} = ${qText(Mo.q)}` : ''}`;
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub2;
    $('legend').innerHTML = legendItems(Mo).map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  const famName = () => L(...FAMILY_NAME[S.gram]);
  /** The reopening of the forgetting that the trace shows: q = ln(|Ω after| / |Ω before|). */
  const traceQ = (tr, area) => (!tr || !(tr.beforeArea > 0) || !(area > 0) ? null : Math.log(area / tr.beforeArea));
  function drawText(Mo) {
    const area = Mo.shown.area, M = Mo.M, s = Mo.sch, b = Mo.block, tr = S.trace && Math.abs(S.trace.t - S.t) < 1e-9 ? S.trace : null;
    $('roArea').textContent = sr(area);
    $('roAreaSub').innerHTML = ` · ${fix(area / (4 * PI), 6)} × 4π${S.dual ? ` · Ω<sub>A</sub> ∩ Ω<sub>B</sub>` : ''}`;
    // after a forgetting the readout reports that step first: q = ln(|Ω after| / |Ω before|); then the next one
    let qLine = M >= 1 ? `q${sub(M)} = ${qText(Mo.q)}` : L('M = 0：没有可遗忘的记录', 'M = 0: no record to forget');
    const tq = traceQ(tr, area);
    if (tr) qLine = `${L('刚才遗忘', 'just forgot')} ${tr.released.map((j) => `v${sub(j)}`).join(' ')}: q = ${tq == null ? '—' : qText(tq)} · ${fix(tr.beforeArea, 6)} → ${fix(area, 6)} sr${M >= 1 ? ` · ${L('下一步', 'next')} q${sub(M)} = ${Mo.q == null ? '—' : Number.isFinite(Mo.q) ? `${fix(Mo.q, 6)} nats` : '∞'}` : ''}`;
    $('roQ').innerHTML = qLine;
    const rankNote = s.rank < M ? ` · ${L('秩', 'rank')} ${s.rank} < ${M}` : '';
    $('roSchur').innerHTML = `${famName()} · Δ = ${fix(s.delta, 6)} · det G${sub(M)} = ${fix(s.detG, 6)} · det G${sub(M + 1)} = ${fix(s.detH, 6)}${rankNote}`;
    const ratio = Mo.winA.area > 0 ? Mo.winAB.area / Mo.winA.area : 0;
    $('roConsensus').innerHTML = `${S.dual ? '' : L('若 B 转 η：', 'if B turns by η: ')}${sr(Mo.winAB.area)} · ${fix(100 * ratio, 4)}% ${L('的 A 走廊', 'of the A corridor')} · η = ${fix(S.eta, 0)}°`;
    if (!b.n) $('roBlock').innerHTML = L('空窗口', 'empty window');
    else $('roBlock').innerHTML = `${S.dual ? 'K' : 'G<sub>A</sub>'} ${b.n}×${b.n} · ${L('秩', 'rank')} ${b.rank} · ${b.nullity > 0 ? `λ<sub>min</sub> = 0 (${L('精确，零化度', 'exact, nullity')} ${b.nullity})` : `λ<sub>min</sub> = ${fix(b.lambdaMin, 6)}`} · λ<sub>min</sub><sup>+</sup> = ${b.lambdaPlus == null ? '—' : fix(b.lambdaPlus, 6)}`;
    $('roMargin').innerHTML = Number.isFinite(Mo.marginX) ? `${kit.sgn(Mo.marginX, 6)} ${Mo.marginX >= 0 ? L('（在走廊里）', '(inside the corridor)') : L('（在走廊外）', '(outside the corridor)')}` : L('+∞（窗口里还没有记录）', '+∞ (no record in the window yet)');
    const act = Mo.shown.active.map((a) => `${a.obs === 'A' ? 'v' : 'w'}${sub(a.j)}`).join(' ');
    let note;
    if (Mo.shown.empty) note = L('x 无处可落：窗口里的帽没有公共点。遗忘最旧的记录，走廊才会重开。', 'x has nowhere to go: the caps of the window have no common point. Forgetting the oldest record reopens the corridor.');
    else if (tr && tr.forget && tr.beforeArea > 0 && Math.abs(area - tr.beforeArea) < 1e-12) note = L(`遗忘的 ${tr.released.map((j) => `v${sub(j)}`).join(' ')} 那顶帽不在走廊边界上（冗余），面积一点没变：q = 0。`, `The released cap of ${tr.released.map((j) => `v${sub(j)}`).join(' ')} was not on the boundary of the corridor (redundant): the area did not change, q = 0.`);
    else if (Mo.shown.full) note = L('还没有记录：整个球面都是走廊，4π sr。', 'No record yet: the whole sphere is the corridor, 4π sr.');
    else note = L(`只有落在边界上的帽在挤压走廊：现在是 ${act}。`, `Only the caps on the boundary squeeze the corridor: now ${act}.`);
    $('roNote').innerHTML = note;
    $('areaPill').innerHTML = `|Ω| <strong>${fix(area, 6)}</strong>`;
    $('windowPill').innerHTML = `M <strong>${tLabel(Mo)}</strong>`;
    $('hint').innerHTML = L('拖琥珀色的 x · 拖空白处转视角 · F 遗忘最旧记录', 'drag the amber x · drag empty space to orbit · F forgets the oldest record');
    $('formula').innerHTML = 'Ω<sub>M</sub> = ⋂ {x : x·v<sub>j</sub> ≥ cos α} · q<sub>M</sub> = ln(|Ω<sub>M−1</sub>|/|Ω<sub>M</sub>|) · Δ = 1 − cᵀG⁺c';
    const fb = $('forgetBtn'), label = M >= 1 ? `${L('遗忘最旧的记录', 'Forget the oldest record')} v${sub(M)}` : L('遗忘最旧的记录', 'Forget the oldest record');
    fb.disabled = M < 1;
    if (fb._label !== label) { fb.innerHTML = label; fb._label = label; }   // rewrite only on change: a press while the rail plays still lands
    fb.title = M >= 1 ? `Tr_{v${sub(M)}}` : '';
    $('windowSize').value = String(clamp(Math.max(1, M), 1, GW.MAX));
    fWindow.show(); fAlpha.show(); fEta.show();
  }

  /* ---------- strip: the corridor against the window, and the Schur margin of three families ---------- */
  function drawPlot(Mo) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    $('plotTitle').textContent = L('记得越多，走廊越窄', 'The more it remembers, the narrower the corridor');
    const g = kit.plot(cv, { x: [-0.4, 10.4], y: [1e-3, 16], logY: true, pad: [40, 12, 10, 22] });
    g.axes({ xTicks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], yTicks: [[1e-3, '0.001'], [0.01, '0.01'], [0.1, '0.1'], [1, '1'], [4 * PI, '4π']], xLabel: 'M' });
    const series = (who) => Array.from({ length: GW.MAX + 1 }, (_, m) => [m, regionAt(m, who).area]);
    const draw = (pts, color, w) => {
      g.line(pts.map(([m, a]) => (a > 0 ? [m, a] : null)), color, { width: w });
      for (const [m, a] of pts) { if (a > 0) g.dot(m, a, color, 2.6); else g.text(m, 1.6e-3, '∅', P.magenta, { align: 'center', size: 11 }); }
    };
    draw(series('A'), P.cyan, S.dual ? 1.6 : 2.2);
    if (S.dual) draw(series('AB'), P.violet, 2.2);
    g.vline(Mo.t, P.amber, { alpha: 0.85 });
    if (Mo.shown.area > 0) g.dot(Mo.t, Math.max(1e-3, Mo.shown.area), P.amber, 4);
    $('plotMeta').innerHTML = `${S.dual ? `|Ω<sub>A</sub> ∩ Ω<sub>B</sub>|` : '|Ω|'} = ${sr(Mo.shown.area)}${Mo.M >= 1 ? ` · q${sub(Mo.M)} = ${qText(Mo.q)}` : ''}`;
  }
  const deltaOf = (kind, m) => (kind === 'equi' ? (m + 8) / (4 * (m + 2)) : kind === 'ortho' ? 1 - m / 4 : GW.schur('caps', m, S.x).delta);
  function drawSchurPlot(Mo) {
    const cv = $('schurPlot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    $('schurTitle').textContent = L('加边格拉姆还剩多少余量 Δ', 'How much room the bordered Gram leaves: Δ');
    const g = kit.plot(cv, { x: [0.6, 10.4], y: [-1.6, 1.12], pad: [40, 12, 10, 22] });
    g.axes({ xTicks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], yTicks: [-1.5, -1, -0.5, 0, 0.5, 1], xLabel: 'M' });
    g.hline(0, P.ink, { alpha: 0.55, dash: [3, 3] });
    const fams = [['equi', P.cyan, 'r = 1/3'], ['ortho', P.magenta, 'I_{M}'], ['caps', P.ink, 'S²']];
    for (const [kind, color, label] of fams) {
      const pts = Array.from({ length: GW.MAX }, (_, k) => [k + 1, deltaOf(kind, k + 1)]), on = kind === S.gram;
      g.line(pts, color, { width: on ? 2.6 : 1.4, alpha: on ? 1 : 0.6, dash: kind === 'caps' ? [5, 3] : undefined });
      for (const [m, d] of pts) g.dot(m, d, color, on ? 2.8 : 1.8, { alpha: on ? 1 : 0.6 });
      const end = pts[pts.length - 1];
      g.text(end[0] - 0.15, end[1] + (kind === 'ortho' ? 0.16 : 0.14), label, color, { align: 'right', size: 10 });
    }
    if (Mo.M >= 1) { g.vline(Mo.M, P.amber, { alpha: 0.85 }); g.dot(Mo.M, Mo.sch.delta, P.amber, 4.2); }
    $('schurMeta').innerHTML = `${famName()} · Δ${sub(Mo.M)} = ${fix(Mo.sch.delta, 6)}`;
  }

  /* ---------- side panel: the Gram matrix of the window as a heatmap (click a cell) ---------- */
  let GRAM = null;
  function gramMatrix(Mo) {
    if (S.dual && S.gram === 'caps' && Mo.M > 0) {
      const labels = [];
      for (let j = 1; j <= Mo.M; j++) labels.push(`v${sub(j)}`);
      for (let j = 1; j <= Mo.M; j++) labels.push(`w${sub(j)}`);
      return { kind: 'block', mat: Mo.block.K, labels };
    }
    const labels = [];
    for (let j = 1; j <= Mo.M; j++) labels.push(S.gram === 'caps' ? `v${sub(j)}` : `r${sub(j)}`);
    labels.push('x');
    return { kind: 'bordered', mat: Mo.sch.H, labels };
  }
  function selectedPoints(Mo) {
    if (!S.sel || S.gram !== 'caps') return [];
    const gm = gramMatrix(Mo), pts = [];
    for (const i of S.sel) {
      if (i >= gm.labels.length) return [];
      const lab = gm.labels[i];
      if (lab === 'x') continue;
      const j = i % Math.max(1, Mo.M) + 1, isB = gm.kind === 'block' && i >= Mo.M;
      pts.push(isB ? GW.ry(ETA(), GW.anchor(j)) : GW.anchor(j));
    }
    return pts;
  }
  function drawGram(Mo) {
    const cv = $('gramMap');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    const gm = gramMatrix(Mo), n = gm.mat.length, dpr = TRV.fitCanvas(cv), W = cv.clientWidth, H = cv.clientHeight, ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    if (S.sel && (S.sel[0] >= n || S.sel[1] >= n)) S.sel = null;
    const padL = 30, padT = 18, cell = Math.max(3, Math.floor(Math.min((W - padL - 6) / n, (H - padT - 6) / n))), x0 = padL + Math.max(0, Math.floor((W - padL - 6 - cell * n) / 2)), y0 = padT;
    GRAM = { x0, y0, cell, n };
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const v = gm.mat[i][j];
      ctx.fillStyle = v >= 0 ? P.cyan : P.magenta; ctx.globalAlpha = 0.08 + 0.82 * Math.min(1, Math.abs(v));
      ctx.fillRect(x0 + j * cell + 0.5, y0 + i * cell + 0.5, cell - 1, cell - 1);
    }
    ctx.globalAlpha = 1;
    const frame = (i0, j0, ni, nj, color, w) => { ctx.strokeStyle = color; ctx.lineWidth = w; ctx.strokeRect(x0 + j0 * cell + 0.5, y0 + i0 * cell + 0.5, nj * cell - 1, ni * cell - 1); };
    if (gm.kind === 'block' && Mo.M) { frame(0, 0, Mo.M, Mo.M, P.cyan, 1.4); frame(Mo.M, Mo.M, Mo.M, Mo.M, P.violet, 1.4); }
    else { frame(n - 1, 0, 1, n, P.amber, 1.2); frame(0, n - 1, n, 1, P.amber, 1.2); }
    if (S.sel) frame(S.sel[0], S.sel[1], 1, 1, P.amber, 2.2);
    ctx.fillStyle = P.dim; ctx.font = `${cell >= 13 ? 10 : 9}px ${TRV.fonts.data}`;
    const every = cell >= 12 ? 1 : cell >= 7 ? 2 : 4;
    for (let i = 0; i < n; i++) {
      if (i % every && i !== n - 1) continue;
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle'; ctx.fillText(gm.labels[i], x0 - 4, y0 + (i + 0.5) * cell);
      ctx.textAlign = 'center'; ctx.textBaseline = 'bottom'; ctx.fillText(gm.labels[i], x0 + (i + 0.5) * cell, y0 - 3);
    }
    $('gramTitle').innerHTML = gm.kind === 'block' ? L(`块格拉姆 K${sub(Mo.M)} = WWᵀ（${n}×${n}）`, `Block Gram K${sub(Mo.M)} = WWᵀ (${n}×${n})`)
      : L(`加边格拉姆 G${sub(Mo.M + 1)}（${famName()}）`, `Bordered Gram G${sub(Mo.M + 1)} (${famName()})`);
    let cap;
    if (!S.sel) cap = L('点一个格子：它是两条记录（或记录与 x）的内积。青色为正，品红为负，越亮绝对值越大。', 'Click a cell: the inner product of two records (or of a record and x). Cyan is positive, magenta negative; brighter means larger.');
    else {
      const [i, j] = S.sel, v = gm.mat[i][j], h = Math.cos(ALPHA());
      cap = `${gm.labels[i]} · ${gm.labels[j]} = ${fix(v, 6)}`;
      if (S.gram === 'caps' && i !== j) cap += ` · ${L('夹角', 'angle')} ${fix(Math.acos(clamp(v, -1, 1)) / DEG, 2)}° · ${v >= h ? L('不小于 cos α：在相干帽里', 'at least cos α: inside the coherence cap') : L('小于 cos α：在相干帽外', 'below cos α: outside the coherence cap')}`;
    }
    $('gramCaption').innerHTML = cap;
  }
  $('gramMap').addEventListener('click', (ev) => {
    if (!GRAM) return;
    const b = $('gramMap').getBoundingClientRect(), j = Math.floor((ev.clientX - b.left - GRAM.x0) / GRAM.cell), i = Math.floor((ev.clientY - b.top - GRAM.y0) / GRAM.cell);
    if (i < 0 || j < 0 || i >= GRAM.n || j >= GRAM.n) S.sel = null;
    else S.sel = S.sel && S.sel[0] === i && S.sel[1] === j ? null : [i, j];
    paint();
  });

  const paint = kit.painter(() => {
    const Mo = model();
    hudText(Mo); TRV.hudFit();
    drawStage(Mo); drawText(Mo); drawPlot(Mo); drawSchurPlot(Mo); drawGram(Mo);
  }, [stageEl, $('plot'), $('schurPlot'), $('gramMap')]);

  /* ---------- the rail: the memory depth t ---------- */
  let internal = 0, anim = null, booting = true, seenToken = null;
  const setT = (t) => { internal += 1; try { clock.set(t); } finally { internal -= 1; } };
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: GW.MAX, t: 3, rate: 0.85, step: 1,
    format: (t) => `M ${fix(t, 2)} <small>/ ${GW.MAX}</small>`,
    onChange: (t, C) => {
      S.t = t;
      if (!internal) {
        if (S.trace && Math.abs(t - S.trace.t) > 1e-9) S.trace = null;
        if (anim && C.playing) cancelAnim();
      }
      if (S.stopAt != null && C.playing && t >= S.stopAt - 1e-9) {
        const to = S.stopAt;
        S.stopAt = null; internal += 1;
        try { C.pause(); C.set(to); } finally { internal -= 1; }
        return;
      }
      paint();
    }
  });
  $('rew').addEventListener('click', () => { leave(); setT(0); });

  /* ---------- controls ---------- */
  function cancelAnim() { if (anim) { if (anim.tw) anim.tw.cancel(); anim = null; } }
  /** The reader moved a control: leave the card, stop the story, drop the trace of a forgetting. */
  function leave() { stopBootPlay(); clock.pause(); cancelAnim(); seenToken = null; S.stopAt = null; S.trace = null; cards.mark(null); }
  const fWindow = kit.field($('windowSize'), { fmt: () => fix(S.t, Math.abs(S.t - Math.round(S.t)) < 1e-9 ? 0 : 2), onInput: (v) => { leave(); setT(clamp(Math.round(v), 1, GW.MAX)); paint(); } });
  const fAlpha = kit.field($('coherenceAngle'), { fmt: (v) => `${fix(v, 0)}°`, onInput: (v) => { leave(); S.alpha = clamp(v, 35, 75); paint(); } });
  const fEta = kit.field($('tiltAngle'), { fmt: (v) => `${fix(v, 0)}°`, onInput: (v) => { leave(); S.eta = clamp(v, 0, 60); if (!S.dual) setDual(true, true); paint(); } });
  function setDual(on, quiet) {
    S.dual = !!on; S.trace = null;
    obsStage.set(S.dual ? 'dual' : 'single', true); obsPanel.set(S.dual ? 'dual' : 'single', true);
    if (!quiet) paint();
  }
  const pickObserver = (v) => { stopBootPlay(); cards.mark(null); S.stopAt = null; setDual(v === 'dual'); };
  const obsStage = kit.chips($('observerChips'), 'observer', pickObserver);
  const obsPanel = kit.chips($('observerPanel'), 'observer', pickObserver);
  const gramChips = kit.chips($('gramChips'), 'gram', (v) => { stopBootPlay(); cards.mark(null); S.gram = v; S.sel = null; paint(); });
  $('forgetBtn').addEventListener('click', () => forgetOldest());
  kit.keys({ f: () => forgetOldest(), b: () => pickObserver(S.dual ? 'single' : 'dual') });
  function syncControls() {
    fWindow.set(clamp(Math.max(1, mOf(S.t)), 1, GW.MAX)); fAlpha.set(S.alpha); fEta.set(S.eta);
    obsStage.set(S.dual ? 'dual' : 'single', true); obsPanel.set(S.dual ? 'dual' : 'single', true); gramChips.set(S.gram, true);
  }
  /** Run a forgetting: the depth eases from `from` down to `to` (the released caps open out), then the trace stays. */
  function runRelease(from, to, ms, trace) {
    cancelAnim();
    const token = {};
    anim = token;
    setT(from);
    token.tw = kit.tween(ms, (e) => { if (anim === token) { setT(from + (to - from) * e); } }, () => {
      if (anim !== token) return;
      anim = null; setT(to); S.trace = trace; paint();
    });
  }
  const traceFor = (from, to, dual, forget) => {
    const who = dual ? 'AB' : 'A', before = regionAt(from, who), released = [];
    for (let j = Math.ceil(from - 1e-9); j > to; j--) released.push(j);
    return { t: to, from, released, dual, forget: !!forget, before, beforeArea: before.area };
  };
  /** Tr over the oldest record v_M: its cap is released and the window shrinks by one. */
  function forgetOldest() {
    const M = mOf(S.t);
    if (M < 1) return;
    const from = S.t, to = M - 1, dual = S.dual;
    leave();
    syncControls();
    runRelease(from, to, 700, traceFor(from, to, dual, true));
  }
  /** The boot card that plays: at once on a full page; inside a book (?embed=1) once the stage is at least half in view,
      pausing it again while it is out of view. Any move of the reader (a card, a control, ▶/❚❚, the rail, the keys of
      the clock) disconnects the observer and drops a pending whenSeen, so neither can start the clock or a forgetting
      after the reader has touched it. */
  let bootIO = null;
  function stopBootPlay() { seenToken = null; if (bootIO) { bootIO.disconnect(); bootIO = null; } }
  function bootPlay() {
    stopBootPlay();
    if (TRV.still) return;
    if (!TRV.embed || !window.IntersectionObserver) { clock.play(); return; }
    let started = false;
    const io = new IntersectionObserver((entries) => {
      if (bootIO !== io) return;
      const seen = entries[entries.length - 1].intersectionRatio >= 0.5;
      if (seen && !started) { started = true; clock.play(); } else if (!seen && clock.playing) clock.pause();
    }, { threshold: [0, 0.5, 1] });
    bootIO = io;
    io.observe(stageEl);
  }
  $('play').addEventListener('click', stopBootPlay, true);
  $('now').addEventListener('input', stopBootPlay, true);
  document.addEventListener('keydown', (ev) => { if ([' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) stopBootPlay(); }, true);
  /** Run fn once the stage is at least half in view (at once on a full page). */
  function whenSeen(fn) {
    const token = {};
    seenToken = token;
    if (!TRV.embed || !window.IntersectionObserver) { fn(); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries[entries.length - 1].intersectionRatio < 0.5) return;
      io.disconnect();
      if (seenToken === token) { seenToken = null; fn(); }
    }, { threshold: [0, 0.5, 1] });
    io.observe(stageEl);
  }

  /* ---------- experiment cards ---------- */
  const NOTES = {
    'schur-cap-corridor': ['M = 2：两顶 60° 相干帽交成青色透镜。虚线大圆是锚点平面 span(v₁, v₂)，琥珀色 x 离开它的品红高度 δ 给出舒尔补 Δ = 1 − cᵀG₂⁻¹c = sin²δ = 0.1786，det G₃ = det G₂ · Δ = 0.0394。把 x 拖到虚线上，Δ 与 det G₃ 都变成 0。',
      'M = 2: two 60° coherence caps meet in a cyan lens. The dashed great circle is the anchor plane span(v₁, v₂); the magenta height δ of the amber x above it gives the Schur margin Δ = 1 − cᵀG₂⁻¹c = sin²δ = 0.1786, and det G₃ = det G₂ · Δ = 0.0394. Drag x onto the dashes and both Δ and det G₃ become 0.'],
    'golden-triangle-m3': ['第三顶帽合拢：三段品红圆弧围成青色曲边三角 Ω₃ = 1.802272 sr，占球面 14.3420%。三条记录不共面，det G₃(v₁, v₂, v₃) = 0.0411 > 0，张满 ℝ³。',
      'The third cap closes in: three magenta arcs bound the cyan curved triangle Ω₃ = 1.802272 sr, 14.3420% of the sphere. The three records are not coplanar: det G₃(v₁, v₂, v₃) = 0.0411 > 0, they span ℝ³.'],
    'overconstrained-lock-m9': ['记得越深，走廊越窄：每多一顶更旧的帽，品红边界就再勒紧一圈。M = 9 时只剩 0.054604 sr（球面的 0.4345%），第十顶帽合上就是空集（0 sr）。侧栏换成正交族 G = I<sub>M</sub>：Δ = 1 − M/4 在 M = 4 时为 0，M = 5 起为负。',
      'The deeper the memory, the narrower the corridor: each older cap pulls the magenta boundary tighter. At M = 9 only 0.054604 sr is left (0.4345% of the sphere); the tenth cap shuts it (0 sr). The side panel shows orthonormal records G = I<sub>M</sub>: Δ = 1 − M/4 is 0 at M = 4 and negative from M = 5.'],
    'forgetting-reopen': ['遗忘最旧的记录 v₉：它那道品红虚线帽撤掉，走廊从 0.054604 sr（品红虚线轮廓）重开到 0.208320 sr，q₉ = ln(0.208320/0.054604) = 1.338960 nats = 1.931710 bits。',
      'Forget the oldest record v₉: its dashed magenta cap is released and the corridor reopens from 0.054604 sr (the dashed magenta outline) to 0.208320 sr, q₉ = ln(0.208320/0.054604) = 1.338960 nats = 1.931710 bits.'],
    'dual-window-consensus': ['B 的记录是 A 的记录绕 y 轴转 η = 10°。两人各记 9 条时，紫色共识只剩 0.010419 sr（品红虚线轮廓）；双方同时遗忘最旧的 6 条、回到 M = 3，共识重开到 1.570105 sr，是 A 走廊的 87.1181%。',
      'The records of B are those of A turned by η = 10° about y. With 9 records each, the violet consensus is only 0.010419 sr (the dashed magenta outline); when both forget their 6 oldest and return to M = 3 it reopens to 1.570105 sr, 87.1181% of the corridor of A.']
  };
  // a cited figure has a fixed frame: one short sentence per card, no sub- or superscripts
  const FIGURE_NOTES = {
    'schur-cap-corridor': ['琥珀色 x 离虚线锚点平面的品红高度 δ：Δ = sin²δ = 0.1786；落到虚线上 det G₃ = 0。', 'The amber x sits a magenta height δ off the dashed anchor plane: Δ = sin²δ = 0.1786; on the dashes det G₃ = 0.'],
    'golden-triangle-m3': ['三顶帽围成青色曲边三角 Ω₃ = 1.802272 sr（球面的 14.34%），det G₃ > 0。', 'Three caps bound the cyan curved triangle Ω₃ = 1.802272 sr (14.34% of the sphere), det G₃ > 0.'],
    'overconstrained-lock-m9': ['九顶帽把走廊勒到 0.054604 sr；第十顶帽一合上就是空集。', 'Nine caps squeeze the corridor to 0.054604 sr; the tenth shuts it.'],
    'forgetting-reopen': ['撤掉最旧记录 v₉ 的帽：0.054604 → 0.208320 sr，q₉ = 1.338960 nats。', 'Release the cap of the oldest record v₉: 0.054604 → 0.208320 sr, q₉ = 1.338960 nats.'],
    'dual-window-consensus': ['回到 M = 3：紫色共识 1.570105 sr；品红虚线是 M = 9 时仅 0.010419 sr 的共识。', 'Back to M = 3: violet consensus 1.570105 sr; the dashed magenta outline is the 0.010419 sr left at M = 9.']
  };
  function applyPreset(id) {
    const p = PRESETS[id];
    stopBootPlay(); clock.pause(); cancelAnim(); seenToken = null;
    S.stopAt = null; S.trace = null; S.sel = null;
    S.alpha = 60; S.eta = p.eta; S.dual = p.dual; S.gram = p.gram; S.x = p.x.slice();
    sc.view(p.view, booting || TRV.still ? 0 : 650);
    const staticFrame = TRV.still || (booting && !TRV.embed);
    if (p.release) {
      if (staticFrame) { setT(p.still); S.trace = traceFor(p.from, p.to, p.dual, false); }
      else { setT(p.from); whenSeen(() => runRelease(p.from, p.to, 650 + 320 * (p.from - p.to), traceFor(p.from, p.to, p.dual, false))); }
    } else if (p.play) {
      if (staticFrame) setT(p.still);
      else { setT(p.from); S.stopAt = p.to; if (booting) bootPlay(); else clock.play(); }
    } else setT(p.to);
    syncControls();
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拉窗口长度 M、相干半角 α 与 B 的转角 η，拖琥珀色的 x，或遗忘最旧的记录。随时可以再选一张卡。', 'Free play: pull the window length M, the coherence half-angle α and the tilt η of B, drag the amber x, or forget the oldest record. Pick a card again at any time.']
  });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  const info = (R) => (R ? { area: R.area, empty: !!R.empty, full: !!R.full, loops: R.loops, chi: R.chi == null ? (R.full ? 2 : 0) : R.chi, vertices: R.used ? R.used.size : 0, arcs: R.arcs.length, active: R.active, center: R.center } : null);
  window.GRAM_WINDOW_DEBUG = Object.freeze({
    get state() {
      const Mo = model(), s = Mo.sch, b = Mo.block, fin = (x) => (Number.isFinite(x) ? x : null);
      return JSON.parse(JSON.stringify({
        preset: cards.current, t: clock.t, playing: clock.playing, M: Mo.M, integer: Mo.integer, alphaDeg: S.alpha, etaDeg: S.eta, dual: S.dual, gram: S.gram, x: S.x,
        area: Mo.shown.area, fraction: Mo.shown.area / (4 * PI), areaA: Mo.winA.area, areaAPrev: Mo.prevA ? Mo.prevA.area : null,
        consensus: Mo.winAB.area, consensusPrev: Mo.prevAB ? Mo.prevAB.area : null, consensusRatio: Mo.winA.area > 0 ? Mo.winAB.area / Mo.winA.area : null,
        qNats: fin(Mo.q), qBits: Mo.q != null && Number.isFinite(Mo.q) ? Mo.q / LN2 : null, qInfinite: Mo.q === Infinity,
        schur: { kind: s.kind, M: s.M, Q: s.Q, delta: s.delta, detG: s.detG, detH: s.detH, rank: s.rank, rankH: s.rankH, range: s.range, lambdaMinH: s.lambdaMinH, H: s.H },
        block: { n: b.n, rank: b.rank, nullity: b.nullity, lambdaMin: b.lambdaMin, lambdaPlus: b.lambdaPlus, positive: b.positive, rawMin: b.rawMin },
        marginX: fin(Mo.marginX), insideX: Mo.marginX >= 0,
        regions: { liveA: info(Mo.liveA), liveB: info(Mo.liveB), liveAB: info(Mo.liveAB), shown: info(Mo.shown), window: info(Mo.win), previous: info(Mo.prev) },
        trace: S.trace ? { t: S.trace.t, from: S.trace.from, released: S.trace.released, dual: S.trace.dual, forget: S.trace.forget, beforeArea: S.trace.beforeArea, q: traceQ(S.trace, Mo.shown.area) } : null,
        anchors: Array.from({ length: Mo.M }, (_, k) => GW.anchor(k + 1)), schurShown: schurShown(Mo), selected: S.sel,
        camera: Object.assign({}, sc.cam), handle: FRAME ? FRAME.handle : null, labels: PLACED, stageFrame: FRAME, loupe: LOUPE ? { x: LOUPE.x, y: LOUPE.y, s: LOUPE.s, zoom: LOUPE.zoom } : null,
        gramGrid: GRAM ? { n: GRAM.n, cell: GRAM.cell } : null, leanInstances: instances(Mo)
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock). */
    setState(o) {
      leave();
      if (o.alpha != null) S.alpha = clamp(o.alpha, 35, 75);
      if (o.eta != null) S.eta = clamp(o.eta, 0, 60);
      if (o.dual != null) S.dual = !!o.dual;
      if (o.gram) S.gram = o.gram;
      if (o.x) S.x = unit(o.x);
      if (o.t != null) setT(clamp(o.t, 0, GW.MAX));
      syncControls();
      paint();
    },
    /** Viewport coordinates of the handle of x, or null when hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates of a point of the sphere (for drag targets) and whether it faces the viewer. */
    spherePoint(p) { const b = canvas.getBoundingClientRect(), u = unit(p), q = sc.p(scale(u, 1.022)); return { x: b.left + q[0], y: b.top + q[1], front: dot(u, sc.facing()) > 0 }; },
    /** Viewport coordinates of the centre of heatmap cell (i, j). */
    gramCell(i, j) { if (!GRAM) return null; const b = $('gramMap').getBoundingClientRect(); return { x: b.left + GRAM.x0 + (j + 0.5) * GRAM.cell, y: b.top + GRAM.y0 + (i + 0.5) * GRAM.cell }; },
    /** The page's own Fibonacci cross-check of the shown region (N points). */
    fibonacci(N) { return GW.fibonacci(GW.caps(S.t, ALPHA(), { A: true, B: S.dual, eta: ETA() }), N || 200000); }
  });
  window.TRV_THUMB = () => { cards.pick('golden-triangle-m3'); clock.pause(); setT(3); sc.view([V0[0], V0[1], 1], 0); paint.now(); };
  cards.pick(cards.initial('golden-triangle-m3'));
  booting = false;
  paint();
})();
