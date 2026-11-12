/* ORTHO//ATTRACTOR: the coda's "ruins as spatial attractors", shown with the Lorenz system
     ẋ = σ(y − x),  ẏ = x(ρ − z) − y,  ż = xy − βz,   σ = 10, β = 8/3, ρ ∈ {14, 28, 160}.
   rounds     two orbits with different starts and the same parameters; visits to the ε-ball around a fixed point of
              the attractor ("the ruin"); the latest return, a passage of each round with ‖x₁(t_a) − x₂(t_b)‖ < ε, and
              the inner product cos δθ = v̂₁·v̂₂ of the unit tangents F/‖F‖ there; the two equilibria
              C₊ = (+√(β(ρ−1)), +√(β(ρ−1)), ρ−1) and C₋ = (−√(β(ρ−1)), −√(β(ρ−1)), ρ−1) with the eigenvalues of the Jacobian;
              where both are stable (ρ = 14), the one each round falls into, which depends on the basin of its start
   shrink     500 points from a cube: phase volume shrinks like e^(−(σ + 1 + β)t) = e^(−41t/3)
   dimension  running Lyapunov exponents along one orbit and the Kaplan–Yorke dimension they give
   The rail is the time t (rounds, shrink) or the integration time T (dimension).
   Everything is fourth-order Runge–Kutta with step 0.01. Read-only probe for the browser suite: ATTRACTOR_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const SIG = 10, BETA = 8 / 3, H = 0.01, EPS = 2, TR = 40, TS = 2, TD = 100, NP = 500, DIV = -(SIG + 1 + BETA);
  const S = { scene: 'rounds', rho: 28, seed: 0, settle: 0 };   // settle: the time before which the rounds are drawn faint (a card's choice)
  const F = (p, rho) => [SIG * (p[1] - p[0]), p[0] * (rho - p[2]) - p[1], p[0] * p[1] - BETA * p[2]];
  function rk4(p, h, rho) {
    const k1 = F(p, rho), k2 = F([p[0] + h * k1[0] / 2, p[1] + h * k1[1] / 2, p[2] + h * k1[2] / 2], rho), k3 = F([p[0] + h * k2[0] / 2, p[1] + h * k2[1] / 2, p[2] + h * k2[2] / 2], rho), k4 = F([p[0] + h * k3[0], p[1] + h * k3[1], p[2] + h * k3[2]], rho);
    return [p[0] + h * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]) / 6, p[1] + h * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]) / 6, p[2] + h * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]) / 6];
  }
  const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  const unit = (v) => { const n = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / n, v[1] / n, v[2] / n]; };

  /* ---------- the two non-zero equilibria and their linearization ---------- */
  /** C₊ and C₋: the same sign in x and y, height ρ − 1. The Jacobian there has the characteristic polynomial
      λ³ + (σ + 1 + β)λ² + β(σ + ρ)λ + 2σβ(ρ − 1) (the same at both, by the symmetry (x, y, z) ↦ (−x, −y, z));
      its roots by Cardano: one real root and a complex pair, or three real roots. */
  function equilibria(rho) {
    const r = Math.sqrt(BETA * (rho - 1)), a = SIG + 1 + BETA, b = BETA * (SIG + rho), c = 2 * SIG * BETA * (rho - 1);
    const p = b - a * a / 3, q = 2 * a * a * a / 27 - a * b / 3 + c, disc = (q / 2) ** 2 + (p / 3) ** 3;
    let eig;
    if (disc > 0) {
      const u = Math.cbrt(-q / 2 + Math.sqrt(disc)), v = Math.cbrt(-q / 2 - Math.sqrt(disc));
      eig = [{ re: u + v - a / 3, im: 0 }, { re: -(u + v) / 2 - a / 3, im: Math.sqrt(3) * (u - v) / 2 }, { re: -(u + v) / 2 - a / 3, im: -Math.sqrt(3) * (u - v) / 2 }];
    } else {
      const m = 2 * Math.sqrt(-p / 3), th = Math.acos(clamp(3 * q / (p * m), -1, 1)) / 3;
      eig = [0, 1, 2].map((k) => ({ re: m * Math.cos(th - 2 * Math.PI * k / 3) - a / 3, im: 0 }));
    }
    const unstable = eig.some((e) => e.re > 0), focus = eig.some((e) => e.im !== 0);
    return { pts: [{ name: 'C₊', p: [r, r, rho - 1] }, { name: 'C₋', p: [-r, -r, rho - 1] }], eig, unstable, focus };
  }

  /* ---------- what each ρ needs, computed once ---------- */
  const cache = {};
  /** For a ρ: a reference orbit on the attractor, the box it fills (for the picture) and the ruin: one of its points. */
  function world(rho) {
    if (cache[rho]) return cache[rho];
    let p = [1, 1, 1]; for (let i = 0; i < 3000; i++) p = rk4(p, H, rho);
    const ref = [p], lo = p.slice(), hi = p.slice();
    for (let i = 0; i < 6000; i++) { p = rk4(p, H, rho); ref.push(p); for (let k = 0; k < 3; k++) { lo[k] = Math.min(lo[k], p[k]); hi[k] = Math.max(hi[k], p[k]); } }
    const c = [0, 0, (lo[2] + hi[2]) / 2], half = 1.12 * Math.max(Math.abs(lo[0]), Math.abs(hi[0]), Math.abs(lo[1]), Math.abs(hi[1]), (hi[2] - lo[2]) / 2, 1);
    return (cache[rho] = { rho, ref, c, half, ruin: ref[1700], rounds: {}, cloud: null, lyap: null });
  }
  const toStage = (W, p) => [(p[0] - W.c[0]) / W.half, (p[1] - W.c[1]) / W.half, (p[2] - W.c[2]) / W.half];
  /** The two rounds for a seed: starts far apart (seed 0 is fixed, others are drawn), orbits over [0, TR], visits to the ruin. */
  function rounds(W, seed) {
    if (W.rounds[seed]) return W.rounds[seed];
    const rng = TRV.mulberry32(977 * seed + 13), at = () => [W.c[0] + (rng() * 2 - 1) * W.half * 0.8, W.c[1] + (rng() * 2 - 1) * W.half * 0.8, W.c[2] + (rng() * 2 - 1) * W.half * 0.8];
    const starts = seed === 0 ? [[-0.55 * W.half, -0.75 * W.half, W.c[2] - 0.8 * W.half], [0.7 * W.half, 0.8 * W.half, W.c[2] + 0.75 * W.half]] : [at(), at()];
    const out = starts.map((s0) => {
      const pts = [s0]; let p = s0; for (let i = 0; i < TR / H; i++) { p = rk4(p, H, W.rho); pts.push(p); }
      const visits = []; for (let i = 1; i < pts.length - 1; i++) { const d = dist(pts[i], W.ruin); if (d < EPS && d <= dist(pts[i - 1], W.ruin) && d < dist(pts[i + 1], W.ruin)) visits.push({ i, t: i * H, d, dir: unit(F(pts[i], W.rho)) }); }
      return { start: s0, pts, visits };
    });
    return (W.rounds[seed] = out);
  }
  /** 500 points from a cube, stored every 0.02 up to TS; and the tangent map along one orbit (determinant and stretches). */
  function cloud(W) {
    if (W.cloud) return W.cloud;
    const rng = TRV.mulberry32(4242), n = Math.round(TS / 0.02), frames = [[]], side = 0.75 * W.half;
    for (let k = 0; k < NP; k++) frames[0].push([W.c[0] + (rng() * 2 - 1) * side, W.c[1] + (rng() * 2 - 1) * side, W.c[2] + (rng() * 2 - 1) * side]);
    for (let f = 1; f <= n; f++) frames.push(frames[f - 1].map((p) => rk4(rk4(p, H, W.rho), H, W.rho)));
    // the tangent map along one orbit: three tangent vectors by RK4, re-orthonormalized every step; the determinant of
    // the map is the product of the lengths taken out (the raw 3 × 3 determinant would cancel catastrophically)
    let p = [W.c[0] + 0.2 * side, W.c[1] - 0.1 * side, W.c[2] + 0.1 * side], Q = [[1, 0, 0], [0, 1, 0], [0, 0, 1]], logdet = 0; const det = [1];
    for (let i = 1; i <= TS / H; i++) {
      [p, Q] = tangentStep(p, Q, W.rho);
      for (let a = 0; a < 3; a++) { for (let b = 0; b < a; b++) { const d = Q[a][0] * Q[b][0] + Q[a][1] * Q[b][1] + Q[a][2] * Q[b][2]; Q[a] = [Q[a][0] - d * Q[b][0], Q[a][1] - d * Q[b][1], Q[a][2] - d * Q[b][2]]; } const n = Math.hypot(Q[a][0], Q[a][1], Q[a][2]); logdet += Math.log(n); Q[a] = [Q[a][0] / n, Q[a][1] / n, Q[a][2] / n]; }
      det.push(Math.exp(logdet));
    }
    const thick = []; for (let f = 0; f < frames.length; f += 2) thick.push(thickness(frames[f]));
    return (W.cloud = { frames, side, det, thick });
  }
  const jac = (p, rho) => [[-SIG, SIG, 0], [rho - p[2], -1, -p[0]], [p[1], p[0], -BETA]];
  const mv = (A, v) => [A[0][0] * v[0] + A[0][1] * v[1] + A[0][2] * v[2], A[1][0] * v[0] + A[1][1] * v[1] + A[1][2] * v[2], A[2][0] * v[0] + A[2][1] * v[1] + A[2][2] * v[2]];
  /** One RK4 step of the state and of the three tangent vectors (the rows of Q) under the linearized flow. */
  function tangentStep(p, Q, rho) {
    const ax = (a, b, s) => [a[0] + s * b[0], a[1] + s * b[1], a[2] + s * b[2]];
    const k1 = F(p, rho), p2 = ax(p, k1, H / 2), k2 = F(p2, rho), p3 = ax(p, k2, H / 2), k3 = F(p3, rho), p4 = ax(p, k3, H), k4 = F(p4, rho);
    const J1 = jac(p, rho), J2 = jac(p2, rho), J3 = jac(p3, rho), J4 = jac(p4, rho);
    const out = Q.map((q) => { const a1 = mv(J1, q), a2 = mv(J2, ax(q, a1, H / 2)), a3 = mv(J3, ax(q, a2, H / 2)), a4 = mv(J4, ax(q, a3, H)); return [q[0] + H * (a1[0] + 2 * a2[0] + 2 * a3[0] + a4[0]) / 6, q[1] + H * (a1[1] + 2 * a2[1] + 2 * a3[1] + a4[1]) / 6, q[2] + H * (a1[2] + 2 * a2[2] + 2 * a3[2] + a4[2]) / 6]; });
    return [[p[0] + H * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]) / 6, p[1] + H * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]) / 6, p[2] + H * (k1[2] + 2 * k2[2] + 2 * k3[2] + k4[2]) / 6], out];
  }
  /** Running Lyapunov exponents along the reference orbit (Benettin: tangent vectors, Gram–Schmidt every step), sampled every 0.5. */
  function lyap(W) {
    if (W.lyap) return W.lyap;
    let p = W.ref[0], Q = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]; const sum = [0, 0, 0], samples = [[0, 0, 0, 0]], orbit = [p];
    for (let s = 1; s <= TD / H; s++) {
      [p, Q] = tangentStep(p, Q, W.rho);
      for (let i = 0; i < 3; i++) { for (let j = 0; j < i; j++) { const d = Q[i][0] * Q[j][0] + Q[i][1] * Q[j][1] + Q[i][2] * Q[j][2]; Q[i] = [Q[i][0] - d * Q[j][0], Q[i][1] - d * Q[j][1], Q[i][2] - d * Q[j][2]]; } const n = Math.hypot(Q[i][0], Q[i][1], Q[i][2]); sum[i] += Math.log(n); Q[i] = [Q[i][0] / n, Q[i][1] / n, Q[i][2] / n]; }
      if (s % 2 === 0) orbit.push(p);
      if (s % 50 === 0) samples.push([s * H, sum[0] / (s * H), sum[1] / (s * H), sum[2] / (s * H)]);
    }
    return (W.lyap = { samples, orbit });
  }
  /** The Kaplan–Yorke dimension of a spectrum λ₁ ≥ λ₂ ≥ λ₃ (an exponent within 0.02 of zero counts as zero). */
  function kaplanYorke(l) {
    const z = l.map((v) => (Math.abs(v) < 0.02 ? 0 : v)); let j = 0, s = 0;
    while (j < 3 && s + z[j] >= 0) { s += z[j]; j++; }
    return j === 3 ? 3 : j === 0 ? 0 : j + s / Math.abs(z[j]);
  }

  /* ---------- the stage ---------- */
  const EQ_R = 4.5, EQ_PAD = 8;   // px: the ring of an equilibrium C₊ or C₋, and the margin its label keeps from the canvas edge
  const st = kit.stage3($('stage'), { canvas: $('cv'), yaw: -0.42, pitch: 0.14, zoom: 1, radius: 0.44, wheel: false, onChange: () => paint() });
  /** An orbit up to step upTo; the steps before `from` (the transient a card wants out of the way) are drawn faint. */
  const trail = (W, pts, upTo, color, width, from = 0) => {
    const n = Math.min(pts.length, upTo + 1), cut = Math.min(n, Math.max(0, from)), out = []; for (let i = 0; i < n; i++) out.push(toStage(W, pts[i]));
    if (cut > 1) st.path(out.slice(0, cut + (cut < n ? 1 : 0)), { color, width: width * 0.8, back: 0.45, alpha: 0.16 });
    if (n - cut > 1) st.path(out.slice(cut), { color, width, back: 0.45 });
  };
  /** Where an equilibrium falls on the canvas: [x, y] in CSS pixels and the side (−1 left, 1 right, 0 neither) on which its ring is not wholly inside. */
  const eqView = (v) => { const p = st.p(v); return { x: p[0], y: p[1], off: p[0] < EQ_R ? -1 : p[0] > st.W - EQ_R ? 1 : 0 }; };
  /** The label of the equilibrium e, kept whole inside the canvas: placed by the ring, then moved in by its measured size.
      When both are stable (ρ = 14) it says so, sits under the ring and takes the colour of the round that falls into it; on a
      narrow stage the fixed camera leaves the point itself just past the edge, and the label then carries an arrow towards it. */
  function eqTag(k, e, v, ends) {
    const stable = !!ends, at = eqView(v), dy = stable ? 26 : -13, key = `eq${k}`;
    const name = stable ? L(`稳定点 ${e.name}`, `stable point ${e.name}`) : e.name, text = at.off < 0 ? `← ${name}` : at.off > 0 ? `${name} →` : name;
    const cls = !stable ? 'num ink' : ends[0] === e.name ? 'cy raw' : ends[1] === e.name ? 'mg raw' : 'raw';
    st.tag(key, v, text, cls, { dy, fade: false });
    const el = [...$('stage').querySelectorAll('.tags .tag')].find((t) => !t.hidden && t.textContent === text); if (!el) return;
    const w = el.offsetWidth / 2 + EQ_PAD, h = el.offsetHeight / 2 + EQ_PAD, x = clamp(at.x, w, Math.max(w, st.W - w)), y = clamp(at.y + dy, h, Math.max(h, st.H - h));
    if (x !== at.x || y !== at.y + dy) st.tag(key, v, text, cls, { dx: x - at.x, dy: y - at.y, fade: false });
  }
  const state = () => {      // what the current frame shows, for the picture, the words and the probe
    const W = world(S.rho);
    if (S.scene === 'rounds') {
      const R = rounds(W, S.seed), i = Math.round(clamp(clock.t, 0, TR) / H), last = R.map((r) => r.visits.filter((v) => v.i <= i)), a = last[0][last[0].length - 1], b = last[1][last[1].length - 1];
      // the latest return: a passage of each round so far whose two points are less than ε apart (the later of the two
      // passage times as large as possible, then the earlier); cos δθ is the inner product of the unit tangents there
      let ret = null;
      for (const u of last[0]) for (const w of last[1]) {
        const sep = dist(R[0].pts[u.i], R[1].pts[w.i]), hi = Math.max(u.i, w.i), lo = Math.min(u.i, w.i);
        if (sep < EPS && (!ret || hi > ret.hi || (hi === ret.hi && lo > ret.lo))) ret = { a: u, b: w, sep, hi, lo };
      }
      const cos = ret ? clamp(ret.a.dir[0] * ret.b.dir[0] + ret.a.dir[1] * ret.b.dir[1] + ret.a.dir[2] * ret.b.dir[2], -1, 1) : null;
      // when C₊ and C₋ are stable (ρ = 14), the one each round has fallen into by the end of the rail, t = 40
      const eq = equilibria(S.rho), ends = eq.unstable ? null : R.map((r) => { const e = r.pts[r.pts.length - 1]; return dist(e, eq.pts[0].p) < dist(e, eq.pts[1].p) ? eq.pts[0].name : eq.pts[1].name; });
      return { W, R, i, counts: last.map((v) => v.length), latest: [a || null, b || null], ret, cos, angle: cos == null ? null : Math.acos(cos) * 180 / Math.PI, gap: dist(R[0].pts[i], R[1].pts[i]), now: [R[0].pts[i], R[1].pts[i]], eq, ends };
    }
    if (S.scene === 'shrink') { const C = cloud(W), t = clamp(clock.t, 0, TS); return { W, C, t, frame: Math.round(t / 0.02), exact: Math.exp(DIV * t), det: C.det[Math.round(t / H)] }; }
    const Ly = lyap(W), T = clamp(clock.t, 0, TD), k = Math.max(1, Math.min(Ly.samples.length - 1, Math.round(T / 0.5))), l = Ly.samples[k].slice(1);
    return { W, Ly, T, k, l, sum: l[0] + l[1] + l[2], dky: kaplanYorke(l) };
  };
  function drawStage(q) {
    const ctx = st.begin(), W = q.W, words = !TRV.thumbMode;
    if (S.scene === 'rounds') {
      const from = Math.round(S.settle / H); trail(W, q.R[0].pts, q.i, P.cyan, 1.1, from); trail(W, q.R[1].pts, q.i, P.magenta, 1.1, from);
      const rp = st.p(toStage(W, W.ruin)), rr = EPS / W.half * st.unit;
      ctx.strokeStyle = P.amber; ctx.lineWidth = 2; ctx.shadowColor = P.amber; ctx.shadowBlur = 10; ctx.beginPath(); ctx.arc(rp[0], rp[1], Math.max(rr, 5), 0, kit.TAU); ctx.stroke(); ctx.shadowBlur = 0;
      q.eq.pts.forEach((e) => st.dot(toStage(W, e.p), 4.5, P.ink, { ring: true, fade: false }));
      if (q.ret) [[q.ret.a, 0], [q.ret.b, 1]].forEach(([v, k]) => { const x = q.R[k].pts[v.i], L0 = 2.5 * EPS; st.arrow(toStage(W, x), toStage(W, [x[0] + L0 * v.dir[0], x[1] + L0 * v.dir[1], x[2] + L0 * v.dir[2]]), { color: k ? P.magenta : P.cyan, width: 2, headSize: 8, fade: false }); });
      q.R.forEach((r, k) => { r.visits.filter((v) => v.i <= q.i).forEach((v) => st.dot(toStage(W, r.pts[v.i]), 2.6, P.amber, { fade: false })); st.dot(toStage(W, r.start), 4, k ? P.magenta : P.cyan, { ring: true, fade: false }); st.dot(toStage(W, q.now[k]), 5, k ? P.magenta : P.cyan, { glow: 12, fade: false }); });
      if (words) { st.tag('ruin', toStage(W, W.ruin), L('遗迹的邻域', 'around the ruin'), 'hot raw', { dy: -Math.max(rr, 5) - 12 }); st.tag('s0', toStage(W, q.R[0].start), L('第 k 轮起点', 'start of round k'), 'cy raw', { dy: 14 }); st.tag('s1', toStage(W, q.R[1].start), L('第 k+1 轮起点', 'start of round k+1'), 'mg raw', { dy: -14 }); q.eq.pts.forEach((e, k) => eqTag(k, e, toStage(W, e.p), q.ends)); }
    } else if (S.scene === 'shrink') {
      const c = q.C, s = c.side, corner = (a, b, d) => toStage(W, [W.c[0] + a * s, W.c[1] + b * s, W.c[2] + d * s]);
      for (const [a, b] of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) { st.line(corner(a, b, -1), corner(a, b, 1), { color: P.dim, width: 1, dash: [3, 4], alpha: 0.7 }); st.line(corner(a, -1, b), corner(a, 1, b), { color: P.dim, width: 1, dash: [3, 4], alpha: 0.7 }); st.line(corner(-1, a, b), corner(1, a, b), { color: P.dim, width: 1, dash: [3, 4], alpha: 0.7 }); }
      for (const p of c.frames[q.frame]) st.dot(toStage(W, p), 2.1, P.cyan, { alpha: 0.9 });
      if (words) st.tag('cube', corner(-1, -1, 1), L('出发时的立方体', 'the cube they start in'), 'raw', { dy: -12 });
    } else {
      trail(W, q.Ly.orbit, Math.round(q.T / (2 * H)), P.cyan, 0.9);
      st.dot(toStage(W, q.Ly.orbit[Math.min(q.Ly.orbit.length - 1, Math.round(q.T / (2 * H)))]), 5, P.amber, { glow: 12, fade: false });
    }
    st.end();
  }

  /* ---------- strips ---------- */
  function drawPlots(q) {
    if (TRV.still || TRV.figure) return;
    const A = $('plotA'), B = $('plotB');
    if (S.scene === 'rounds') {
      const g = kit.plot(A, { x: [0, TR], y: [0.05, 80], pad: [34, 12, 10, 20], logY: true });
      g.axes({ yTicks: [[0.1, '0.1'], [1, '1'], [10, '10']], xTicks: [0, 10, 20, 30, 40], xLabel: 't' }); g.hline(EPS, P.amber, { dash: [4, 3] });
      q.R.forEach((r, k) => { const pts = []; for (let i = 0; i <= q.i; i += 2) pts.push([i * H, Math.max(0.05, dist(r.pts[i], q.W.ruin))]); g.line(pts, k ? P.magenta : P.cyan, { width: 1.2 }); });
      g.vline(q.i * H, P.amber, { alpha: 0.7 });
      $('pATitle').textContent = L('到遗迹的距离', 'Distance to the ruin'); $('pAMeta').textContent = L(`虚线 ε = ${EPS}`, `dashed: ε = ${EPS}`);
      const h = kit.plot(B, { x: [0, TR], y: [-q.W.half, q.W.half], pad: [34, 12, 10, 20] });
      h.axes({ yTicks: [-Math.round(q.W.half * 0.7), 0, Math.round(q.W.half * 0.7)], xTicks: [0, 10, 20, 30, 40], xLabel: 't', yLabel: 'x' }); h.hline(0, P.faint);
      q.R.forEach((r, k) => { const pts = []; for (let i = 0; i <= q.i; i += 2) pts.push([i * H, r.pts[i][0]]); h.line(pts, k ? P.magenta : P.cyan, { width: 1.2 }); });
      $('pBTitle').textContent = L('同一对翅膀，各走各的步子', 'The same wings, each at its own pace'); $('pBMeta').textContent = L(`此刻相距 ${fix(q.gap, 1)}`, `now ${fix(q.gap, 1)} apart`);
    } else if (S.scene === 'shrink') {
      const C = q.C, g = kit.plot(A, { x: [0, TS], y: [1e-13, 3], pad: [42, 12, 10, 20], logY: true }), ex = [], nu = [];
      for (let i = 0; i <= 100; i++) { const t = TS * i / 100; ex.push([t, Math.exp(DIV * t)]); if (i % 5 === 0) nu.push([t, Math.abs(C.det[Math.round(t / H)])]); }
      g.axes({ yTicks: [[1, '1'], [1e-4, '10⁻⁴'], [1e-8, '10⁻⁸'], [1e-12, '10⁻¹²']], xTicks: [0, 1, 2], xLabel: 't' }); g.line(ex, P.cyan); nu.forEach(([t, v]) => g.dot(t, Math.max(v, 1e-13), P.ink, 2.6)); g.vline(q.t, P.amber, { alpha: 0.8 });
      g.legend([[P.cyan, 'e^(−41t/3)'], [P.ink, L('切映射的行列式（点）', 'determinant of the tangent map (dots)')]], { bottom: true, right: false });
      $('pATitle').textContent = L('体积按指数缩小', 'Volume shrinks exponentially'); $('pAMeta').textContent = L('对数坐标', 'log scale');
      const h = kit.plot(B, { x: [0, TS], y: [0, 1.05], pad: [34, 12, 10, 20] }), sp = [];
      for (let k = 0; k < C.thick.length; k++) sp.push([k * 0.04, C.thick[k] / C.thick[0]]);
      h.axes({ yTicks: [0, 0.5, 1], xTicks: [0, 1, 2], xLabel: 't' }); h.line(sp, P.cyan); h.vline(q.t, P.amber, { alpha: 0.8 });
      $('pBTitle').textContent = L('每个点与近邻所成薄片的厚度', 'Thickness of the sheet each point forms with its neighbours'); $('pBMeta').textContent = L('相对出发时', 'relative to the start');
    } else {
      const Ly = q.Ly, g = kit.plot(A, { x: [0, TD], y: [-2.2, 2.2], pad: [34, 12, 10, 20] });
      g.axes({ yTicks: [-2, -1, 0, 1, 2], xTicks: [0, 50, 100], xLabel: 'T' }); g.hline(0, P.faint);
      g.line(Ly.samples.slice(1, q.k + 1).map((s) => [s[0], clamp(s[1], -2.2, 2.2)]), P.cyan); g.line(Ly.samples.slice(1, q.k + 1).map((s) => [s[0], clamp(s[2], -2.2, 2.2)]), P.magenta); g.vline(q.T, P.amber, { alpha: 0.8 });
      g.legend([[P.cyan, 'λ₁'], [P.magenta, 'λ₂']], { right: true });
      $('pATitle').textContent = L('两个较大的指数', 'The two greater exponents'); $('pAMeta').textContent = `λ₃ ≈ ${fix(q.l[2], 2)}`;
      const h = kit.plot(B, { x: [0, TD], y: [0, 3.1], pad: [34, 12, 10, 20] });
      h.axes({ yTicks: [[0, L('点 0', 'point 0')], [1, L('线 1', 'line 1')], [2, L('面 2', 'surface 2')], [3, L('体 3', 'solid 3')]], xTicks: [0, 50, 100], xLabel: 'T' });
      h.line(Ly.samples.slice(2, q.k + 1).map((s) => [s[0], kaplanYorke(s.slice(1))]), P.cyan, { width: 2 }); h.vline(q.T, P.amber, { alpha: 0.8 });
      $('pBTitle').textContent = L('卡普兰—约克维数的估计', 'The Kaplan–Yorke estimate'); $('pBMeta').textContent = `D ≈ ${fix(q.dky, 3)}`;
    }
  }
  /** Local thickness of a cloud: for a sample of its points, the smallest principal standard deviation of the point
      together with its 12 nearest neighbours (Jacobi on the 3 × 3 covariance), averaged. A sheet has thickness ≈ 0. */
  function thickness(pts) {
    let total = 0, count = 0;
    for (let i0 = 0; i0 < pts.length; i0 += 6) {
      const o = pts[i0], near = pts.map((p) => [(p[0] - o[0]) ** 2 + (p[1] - o[1]) ** 2 + (p[2] - o[2]) ** 2, p]).sort((a, b) => a[0] - b[0]).slice(0, 13).map((e) => e[1]);
      const m = [0, 0, 0]; for (const p of near) for (let k = 0; k < 3; k++) m[k] += p[k] / near.length;
      const C = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; for (const p of near) for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) C[i][j] += (p[i] - m[i]) * (p[j] - m[j]) / near.length;
      for (let sweep = 0; sweep < 30; sweep++) for (let a = 0; a < 3; a++) for (let b = a + 1; b < 3; b++) {
        if (Math.abs(C[a][b]) < 1e-14) continue;
        const th = (C[b][b] - C[a][a]) / (2 * C[a][b]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < 3; k++) { const x = C[k][a], y = C[k][b]; C[k][a] = c * x - s * y; C[k][b] = s * x + c * y; }
        for (let k = 0; k < 3; k++) { const x = C[a][k], y = C[b][k]; C[a][k] = c * x - s * y; C[b][k] = s * x + c * y; }
      }
      total += Math.sqrt(Math.max(0, Math.min(C[0][0], C[1][1], C[2][2]))); count++;
    }
    return total / count;
  }

  /* ---------- words ---------- */
  const SC = {
    rounds: { name: ['两轮', 'ROUNDS'], max: TR, rate: 2.4, step: 1, start: TR },
    shrink: { name: ['收缩', 'CONTRACTION'], max: TS, rate: 0.22, step: 0.1, start: 0.6 },
    dimension: { name: ['维数', 'DIMENSION'], max: TD, rate: 9, step: 5, start: TD }
  };
  const LEGEND = {
    rounds: [['cy', '第 k 轮', 'round k'], ['mg', '第 k+1 轮', 'round k+1'], ['am', '遗迹的邻域与每次经过', 'around the ruin, and each passage']],
    shrink: [['cy', '500 个点', '500 points'], ['dm', '出发时的立方体', 'the cube they start in']],
    dimension: [['cy', '一条长轨道', 'one long orbit'], ['am', '此刻', 'now']]
  };
  const kind = (rho) => (rho === 28 ? L('奇异吸引子', 'a strange attractor') : rho === 14 ? L('两个稳定不动点之一', 'one of two stable fixed points') : L('闭合的环', 'a closed loop'));
  function drawText(q) {
    const set = (i, lab, val) => { $(`roL${i}`).innerHTML = lab; $(`ro${i}`).innerHTML = val; };
    $('ro5w').hidden = S.scene !== 'rounds';
    let big, hud, what, key, note;
    if (S.scene === 'rounds') {
      const t = q.i * H;
      big = L(`两轮 · ρ = ${S.rho} · t = ${fix(t, 1)}`, `Two rounds · ρ = ${S.rho} · t = ${fix(t, 1)}`);
      hud = q.cos == null ? L(`经过遗迹的次数：第 k 轮 ${q.counts[0]} 次，第 k+1 轮 ${q.counts[1]} 次`, `passages by the ruin: round k ${q.counts[0]}, round k+1 ${q.counts[1]}`)
        : L(`经过遗迹：${q.counts[0]} 次与 ${q.counts[1]} 次 · 最近一次重返的方向夹角 ${fix(q.angle, 1)}°`, `passages by the ruin: ${q.counts[0]} and ${q.counts[1]} · at the latest return the directions differ by ${fix(q.angle, 1)}°`);
      $('roKeyL').textContent = L('重返处两条切向的内积 cos δθ = v̂₁·v̂₂', 'inner product of the two tangents at the return, cos δθ = v̂₁·v̂₂'); $('roKey').innerHTML = q.cos == null ? '—' : `<span class="c-am">${fix(q.cos, 4)}</span>`; $('roKeySub').innerHTML = q.cos == null ? L('还没有一次重返', 'no return yet') : `δθ = ${fix(q.angle, 2)}° · t<sub>a</sub> = ${fix(q.ret.a.t, 2)}, t<sub>b</sub> = ${fix(q.ret.b.t, 2)}`;
      set(1, L('第 k 轮经过次数', 'passages of round k'), String(q.counts[0])); set(2, L('第 k+1 轮经过次数', 'passages of round k+1'), String(q.counts[1]));
      set(3, L('两轮此刻相距', 'distance between the rounds now'), fix(q.gap, 2));
      if (q.ends) set(4, L('t = 40 时落到的稳定点', 'stable point reached by t = 40'), `<span class="c-cy">${q.ends[0]}</span> · <span class="c-mg">${q.ends[1]}</span>`); else set(4, L('两个起点相距', 'distance between the starts'), fix(dist(q.R[0].start, q.R[1].start), 1));
      set(5, L('重返处两点相距', 'the two points of the return are apart by'), q.ret ? `${fix(q.ret.sep, 3)} < ε = ${EPS}` : '—');
      note = S.rho === 28 ? L('两条轨道从不重合，也不同步；它们共享的只是这对翅膀，和每次路过遗迹时的方向。', 'The two orbits never coincide and do not keep step; what they share is the pair of wings, and the direction in which they pass the ruin.') : S.rho === 14 ? (q.ends[0] !== q.ends[1] ? L(`ρ = 14：参数相同，却有两个稳定点 C₊、C₋；第 k 轮落进 ${q.ends[0]}，第 k+1 轮落进 ${q.ends[1]}，然后不再动。参数只给出可去的吸引子，去哪一个由起点所在的吸引域决定。`, `ρ = 14: the same parameters, yet two stable points C₊ and C₋; round k falls into ${q.ends[0]}, round k+1 into ${q.ends[1]}, and both then stay. The parameters only offer the attractors; which one is reached depends on the basin of the start.`)
        : L(`ρ = 14：两个稳定点 C₊、C₋；这两轮都落进 ${q.ends[0]}，然后不再动。去哪一个由起点所在的吸引域决定。`, `ρ = 14: two stable points C₊ and C₋; both rounds fall into ${q.ends[0]} and then stay. Which one is reached depends on the basin of the start.`)) : L('ρ = 160：两轮落到同一条闭合的环上，一圈圈重复同样的路。', 'ρ = 160: both rounds land on the same closed loop and repeat the same path, lap after lap.');
      what = `t = ${fix(t, 1)}`; key = q.cos == null ? '—' : `cos δθ = ${fix(q.cos, 3)}`;
    } else if (S.scene === 'shrink') {
      big = L(`体积收缩 · t = ${fix(q.t, 2)}`, `Contraction of volume · t = ${fix(q.t, 2)}`);
      hud = L(`任何一团点的体积此刻只剩 e^(−41t/3) = ${q.exact.toExponential(2).replace('-', '−')}`, `the volume of any cloud is now down to e^(−41t/3) = ${q.exact.toExponential(2).replace('-', '−')}`);
      $('roKeyL').textContent = L('体积是出发时的', 'the volume, as a fraction of the start'); $('roKey').innerHTML = `<span class="c-cy">${q.exact.toExponential(3).replace('-', '−')}</span>`; $('roKeySub').textContent = 'e^(−41t/3)';
      set(1, L('散度 ∇·F', 'divergence ∇·F'), `−41/3 = ${fix(DIV, 4)}`); set(2, L('切映射的行列式', 'determinant of the tangent map'), q.det.toExponential(3).replace('-', '−'));
      set(3, L('两者相对误差', 'relative difference of the two'), `${Math.abs(q.det / q.exact - 1).toExponential(1).replace('-', '−')} <span class="c-cy">${Math.abs(q.det / q.exact - 1) < 2e-3 ? '✓' : '✗'}</span>`); set(4, L('点数', 'points'), String(NP));
      note = L('体积趋于零，所以吸引子不可能是一块实心体；但它也不必缩成一个点或一条线。', 'The volume tends to zero, so the attractor cannot be a solid; yet it need not shrink to a point or a line.');
      what = `t = ${fix(q.t, 2)}`; key = q.exact.toExponential(1).replace('-', '−');
    } else {
      big = L(`维数 · ρ = ${S.rho} · T = ${fix(q.T, 0)}`, `Dimension · ρ = ${S.rho} · T = ${fix(q.T, 0)}`);
      hud = L(`λ ≈ (${fix(q.l[0], 3)}, ${fix(q.l[1], 3)}, ${fix(q.l[2], 2)}) · 卡普兰—约克维数 ≈ ${fix(q.dky, 3)}：${kind(S.rho)}`, `λ ≈ (${fix(q.l[0], 3)}, ${fix(q.l[1], 3)}, ${fix(q.l[2], 2)}) · Kaplan–Yorke dimension ≈ ${fix(q.dky, 3)}: ${kind(S.rho)}`);
      $('roKeyL').textContent = L('卡普兰—约克维数的估计', 'the Kaplan–Yorke estimate'); $('roKey').innerHTML = `<span class="c-cy">${fix(q.dky, 3)}</span>`; $('roKeySub').textContent = kind(S.rho);
      set(1, 'λ₁', fix(q.l[0], 4)); set(2, 'λ₂', fix(q.l[1], 4)); set(3, 'λ₃', fix(q.l[2], 3)); set(4, 'λ₁ + λ₂ + λ₃', `${fix(q.sum, 4)} <span class="c-cy">${Math.abs(q.sum - DIV) < 0.01 ? '= −41/3 ✓' : ''}</span>`);
      note = L('三个指数之和总是 −41/3；它们怎样分配，决定了吸引子是点、是环，还是比面略厚的一层。', 'The three exponents always add up to −41/3; how they are shared decides whether the attractor is a point, a loop, or a layer slightly thicker than a surface.');
      what = `T = ${fix(q.T, 0)}`; key = `D ≈ ${fix(q.dky, 2)}`;
    }
    $('hudBig').textContent = big; $('hudSub').textContent = hud; $('roNote').textContent = note; $('roAside').textContent = L(SC[S.scene].name[0], SC[S.scene].name[1]); $('seedTag').textContent = `#${S.seed}`;
    $('pillScene').querySelector('strong').textContent = SC[S.scene].name[1]; $('pillWhat').querySelector('strong').textContent = what; $('pillKey').querySelector('strong').textContent = key;
    const leg = LEGEND[S.scene].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== leg) { $('legend').innerHTML = leg; $('legend')._h = leg; }
  }
  const paint = kit.painter(() => { const q = state(); drawText(q); drawStage(q); drawPlots(q); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: TR, rate: 2.4, step: 1, t: TR,
    format: (t, max) => (S.scene === 'dimension' ? `T ${t.toFixed(0)} <small>/ ${max.toFixed(0)}</small>` : `t ${t.toFixed(S.scene === 'shrink' ? 2 : 1)} <small>/ ${max.toFixed(0)}</small>`),
    onChange: () => paint()
  });
  function fitClock(t) { const sc = SC[S.scene]; clock.pause(); clock.rate = sc.rate; clock.step = sc.step; clock.setMax(sc.max, true); clock.set(t == null ? sc.start : t); }
  function setScene(sc, t) {
    S.scene = sc; sceneChips.set(sc, true);
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    fitClock(t);
  }
  const leave = () => { S.settle = 0; cards.mark(null); };
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  const rhoChips = kit.chips($('rhoChips'), 'rho', (v) => { S.rho = Number(v); leave(); paint(); });
  $('forgetBtn').addEventListener('click', () => { S.seed += 1; leave(); clock.set(0); clock.play(); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('rounds'); }, 2: () => { leave(); setScene('shrink'); }, 3: () => { leave(); setScene('dimension'); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    butterfly: { scene: 'rounds', rho: 28, seed: 0, at: TR, play: true }, forget: { scene: 'rounds', rho: 28, seed: 3, at: TR, play: true }, return: { scene: 'rounds', rho: 28, seed: 0, at: 22 },
    shrink: { scene: 'shrink', rho: 28, at: 1, play: true }, dimension: { scene: 'dimension', rho: 28, at: TD },
    fixed: { scene: 'rounds', rho: 14, seed: 0, at: TR, play: true }, cycle: { scene: 'rounds', rho: 160, seed: 0, at: TR, play: true, settle: 30 }
  };
  const NOTES = {
    butterfly: ['两条轨道从相距很远的两点出发，参数相同。短暂游荡之后，它们落到同一对翅膀上；琥珀色的小点是每次经过遗迹邻域的地方。', 'Two orbits start from two distant points with the same parameters. After a short wander they land on the same pair of wings; the small amber dots mark each passage through the neighbourhood of the ruin.'],
    forget: ['换一对完全不同的起点：前面走过的路全忘了。参数没变，轨道还是落回同一对翅膀，照样一次次经过同一处。', 'Take two entirely different starts: everything walked before is forgotten. The parameters are the same, and the orbits fall back onto the same wings and pass the same place again and again.'],
    return: ['停在 t = 22：两轮都已经过遗迹。它们经过时的弧段并不重合，方向却几乎平行，内积 cos δθ 接近 1。', 'Stopped at t = 22: both rounds have passed the ruin. The arcs along which they passed do not coincide, yet their directions are nearly parallel and the inner product cos δθ is close to 1.'],
    shrink: ['500 个点从一个立方体里出发。不到一个时间单位，它们就被压到一张薄片上：体积按 e^(−41t/3) 缩小。', '500 points start inside a cube. In less than one unit of time they are pressed onto a thin sheet: the volume shrinks like e^(−41t/3).'],
    dimension: ['沿一条长轨道估计三个李雅普诺夫指数：一个为正，一个为零，一个约 −14.57。由它们算出的维数约 2.06：比一张面多一点，远不到一块体。', 'Estimate the three Lyapunov exponents along one long orbit: one positive, one zero, one about −14.57. The dimension they give is about 2.06: a little more than a surface, far from a solid.'],
    fixed: ['把参数换成 ρ = 14：翅膀没有了，只剩两个稳定点 C₊ 与 C₋。两轮参数相同，却螺旋落进相反的两个点，然后不再动：参数给出可去的吸引子，起点所在的吸引域决定去哪一个。', 'Change the parameter to ρ = 14: the wings are gone, and only two stable points C₊ and C₋ remain. The two rounds share the parameters yet spiral into opposite points and then stay: the parameters offer the attractors, and the basin of the start decides which one is reached.'],
    cycle: ['ρ = 160：两轮落到同一条闭合的环上，每一圈都踩在同一处。t = 30 之前的过渡画得很淡，亮的是最后十个时间单位。这是一维的吸引子：重复，但没有余地。', 'ρ = 160: both rounds land on the same closed loop and tread the same place on every lap. The transient before t = 30 is drawn faint; the bright part is the last ten units of time. This is a one-dimensional attractor: it repeats, with no room to spare.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    S.rho = p.rho; rhoChips.set(String(p.rho), true); if (p.seed != null) S.seed = p.seed; S.settle = p.settle || 0;
    setScene(p.scene, p.at);
    if (!p.play || TRV.still || (booting && !TRV.embed)) return;
    clock.set(0);
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换参数、换起点、换场景、拖时间轴，或拖动舞台转动吸引子。随时可以再选一张卡。', 'Free play: change the parameter, the starts or the scene, scrub the rail, or drag the stage to turn the attractor. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  window.ATTRACTOR_DEBUG = {
    get state() {
      const q = state(), out = { scene: S.scene, t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current, rho: S.rho, seed: S.seed, settle: S.settle, ruin: q.W.ruin.slice(), half: q.W.half, eps: EPS, div: DIV };
      if (S.scene === 'rounds') Object.assign(out, { ends: q.ends, eqViews: q.eq.pts.map((e) => eqView(toStage(q.W, e.p))), canvas: [st.W, st.H], counts: q.counts, cos: q.cos, angle: q.angle, gap: q.gap, now: q.now, starts: q.R.map((r) => r.start), visits: q.R.map((r) => r.visits.map((v) => ({ t: v.t, d: v.d, dir: v.dir }))),
        ret: q.ret && { ta: q.ret.a.t, tb: q.ret.b.t, sep: q.ret.sep, dirs: [q.ret.a.dir, q.ret.b.dir] }, equilibria: q.eq.pts.map((e) => ({ name: e.name, p: e.p.slice() })), eig: q.eq.eig, unstable: q.eq.unstable, focus: q.eq.focus,
        labels: [...document.querySelectorAll('#stage .tag')].filter((t) => !t.hidden).map((t) => (t.textContent.match(/C[₊₋]/) || [])[0]).filter(Boolean) });
      else if (S.scene === 'shrink') Object.assign(out, { exact: q.exact, det: q.det, frame: q.frame, thickness: q.C.thick[Math.round(q.frame / 2)] / q.C.thick[0] });
      else Object.assign(out, { lyap: q.l, sum: q.sum, dky: q.dky });
      return out;
    },
    seek: (t) => { clock.pause(); clock.set(t); },
    /** The point of round k at step i (the suite integrates the same system on its own and compares). */
    point: (k, i) => rounds(world(S.rho), S.seed)[k].pts[i],
    cloudPoint: (k, f) => cloud(world(S.rho)).frames[f][k]
  };
  window.TRV_THUMB = () => { S.rho = 28; S.seed = 0; S.settle = 0; rhoChips.set('28', true); st.cam.zoom = 1.25; setScene('rounds', TR); paint.now(); };
  cards.pick(cards.initial('butterfly'));
  booting = false;
  paint();
})();
