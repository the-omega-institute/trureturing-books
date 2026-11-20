/* OMEGA//CASCADE · AXIOM-Ω 五阶大一统演绎级联沙盘 · The AXIOM-Ω five-tier deduction cascade (Chapter 39, §39.2)
   World (kit.solid): z up. A violet helical axiom column stands on the axis; five platforms (tiers) wind up around it at
   azimuth φₖ = −90° + 72°(k − 1), height (k − 1)·DZ and distance RHO from the axis. Each platform carries one object,
   drawn in the platform's own frame (x to the right and y away from a viewer standing outside the tower, z up):
     T1 gram     vᵢ = (cos iε, sin iε, 1)/√2 (i = 0, 1, 2): the cyan tetrahedron on 0, v₀, v₁, v₂ has volume V with
                 det G₃(ε) = det[cos²((i − j)ε/2)] = (6V)² = ½ sin²ε (1 − cos ε)²; the silver circle carries the tips;
                 the magenta stretch is the step sagitta v_ε = 1 − cos ε. Rail: ε (0–180°). Handle: the tip of v₂.
     T2 budget   the violet octant of the unit sphere; the point (dτ/dt, η_kin,eff, η_grav) on it with its three
                 orthogonal legs (cyan, magenta, magenta); the arc θ* and its cosine shadow (cyan, equal lengths).
                 Rail: β (0–0.99); control: r_s/r. Handle: the point.
     T3 frame    N points (triangle, tetrahedron, bipyramids) with the 3N − 6 cyan edges of a triangulation and the
                 ΔE(N) = (N − 3)(N − 4)/2 magenta edges that complete K_N; the trace columns Tr T₃² (cyan) and Tr Q²
                 (silver) of one chiral Weyl generation. Rail: N − 3 (N = 3 … 8).
     T4 stairs   one step per prime p ≤ P rising by 1 − cos p^−σ (magenta), the cyan ring at the σ = 1 total over
                 p ≤ 10⁶, the σ ruler with the cyan fin of the critical line σ = ½. Rail: number of primes − 1 (P ≤ 97);
                 control: σ. Handle: σ on the ruler.
     T5 ball     (chart (a, b, c) drawn at (−b, a, c), so the turn about e₁ sweeps across the screen) the pointer R(σ)e₃ of the rational ternions σ_t of the heap geodesic σ_{t+1} = [σ_t, σ_{t−1}, σ_t]
                 (cyan beats) against a jump of 120° (magenta); the reference bridge y with tilt ε (violet, drawn with
                 opacity ε/ε₀) and the residue of [y, y_ε, z] (magenta). Rail: beats 0 … N, then the tilt rolls back.
   Every number is computed here; the instances of the cited Lean theorems are in instances().
   Read-only probe: window.OMEGA_CASCADE_DEBUG = { state, calc, presets }. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI,
    TAU = 2 * PI,
    DEG = PI / 180,
    SQ2 = Math.SQRT2;
  const cs = Math.cos,
    sn = Math.sin,
    hypot = Math.hypot,
    clamp = kit.clamp;
  const lerp = (a, b, u) => a + (b - a) * u;
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const scale = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = (a) => Math.sqrt(dot(a, a));
  const unit = (a) => scale(a, 1 / (norm(a) || 1));
  const mix = (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u), lerp(a[2], b[2], u)];
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  /** 1 − cos x without cancellation. */
  const vers = (x) => 2 * sn(x / 2) ** 2;
  const det3 = (M) =>
    M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) -
    M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) +
    M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
  const f8 = (x) => (Math.abs(x) < 5e-9 ? 0 : x).toFixed(8);
  const f4 = (x) => (Math.abs(x) < 5e-5 ? 0 : x).toFixed(4);

  /* ---------- constants computed once ---------- */
  // the cosine fixed point θ* by Newton's method
  let STAR = 0.75;
  for (let i = 0; i < 8; i++) STAR -= (cs(STAR) - STAR) / (-sn(STAR) - 1);
  // the primes up to 10⁶ (sieve of Eratosthenes)
  const SIEVE = 1e6;
  const PRIMES = (() => {
    const comp = new Uint8Array(SIEVE + 1),
      out = [];
    for (let i = 2; i <= SIEVE; i++) {
      if (comp[i]) continue;
      out.push(i);
      for (let j = i * i; j <= SIEVE; j += i) comp[j] = 1;
    }
    return out;
  })();
  const RAIL_PRIMES = 25; // the rail of tier 4 runs over the primes 2 … 97
  let SUM_ONE = 0, // Σ_{p ≤ 10⁶} (1 − cos 1/p): the σ = 1 total (the tail beyond is below 4·10⁻⁸)
    DELTA_C = 0; // Σ_{p ≤ 10⁶} (1 − cos p^−½ − 1/(2p)): the correction to ½ Σ 1/p at σ = ½
  for (const p of PRIMES) {
    SUM_ONE += vers(1 / p);
    DELTA_C += vers(1 / Math.sqrt(p)) - 1 / (2 * p);
  }
  const MERTENS = 0.2614972128476428; // the Meissel–Mertens constant (a literature value)
  const C_SAG = MERTENS / 2 + DELTA_C;
  /** The error of Mertens.E₂p.bound' (cited by the text; shown under NUM): Σ_{p ≤ x} 1/p − ln ln x − M at x = 97, 10⁴ and 10⁶. */
  const MERTENS_ERRORS = [97, 1e4, 1e6].map((x) => {
    let s = 0;
    for (const p of PRIMES) {
      if (p > x) break;
      s += 1 / p;
    }
    return { x, error: s - Math.log(Math.log(x)) - MERTENS };
  });

  /* ---------- exact rationals for the Weyl ledger ---------- */
  const gcd = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) [a, b] = [b, a % b];
    return a || 1;
  };
  const Q = (n, d = 1) => {
    const g = gcd(n, d),
      s = d < 0 ? -1 : 1;
    return { n: (s * n) / g, d: (s * d) / g };
  };
  const qadd = (a, b) => Q(a.n * b.d + b.n * a.d, a.d * b.d);
  const qmul = (a, b) => Q(a.n * b.n, a.d * b.d);
  const qdiv = (a, b) => Q(a.n * b.d, a.d * b.n);
  const qstr = (a) => (a.d === 1 ? String(a.n) : `${a.n}/${a.d}`);
  /** One chiral Weyl generation: [family, T₃, Q, colours, chirality]. */
  const WEYL = [
    ['lepton', Q(1, 2), Q(0), 1, 'L'],
    ['lepton', Q(-1, 2), Q(-1), 1, 'L'],
    ['lepton', Q(0), Q(-1), 1, 'R'],
    ['up', Q(1, 2), Q(2, 3), 3, 'L'],
    ['down', Q(-1, 2), Q(-1, 3), 3, 'L'],
    ['up', Q(0), Q(2, 3), 3, 'R'],
    ['down', Q(0), Q(-1, 3), 3, 'R']
  ];
  const FAMILIES = ['lepton', 'up', 'down'];
  function ledger() {
    const sumT = {},
      sumQ = {};
    for (const f of FAMILIES) {
      sumT[f] = Q(0);
      sumQ[f] = Q(0);
    }
    for (const [f, t3, q, n] of WEYL) {
      sumT[f] = qadd(sumT[f], qmul(Q(n), qmul(t3, t3)));
      sumQ[f] = qadd(sumQ[f], qmul(Q(n), qmul(q, q)));
    }
    const trT = FAMILIES.reduce((s, f) => qadd(s, sumT[f]), Q(0)),
      trQ = FAMILIES.reduce((s, f) => qadd(s, sumQ[f]), Q(0));
    const ratio = qdiv(trT, trQ);
    return { sumT, sumQ, trT, trQ, ratio, value: ratio.n / ratio.d };
  }
  const LEDGER = ledger();

  /* ---------- tier 3: a triangulated convex frame on N points, and the edges that complete K_N ---------- */
  function frame(N) {
    let V, F;
    if (N === 3) {
      V = [0, 1, 2].map((i) => [cs((-90 + 120 * i + 30) * DEG), sn((-90 + 120 * i + 30) * DEG), 0]);
      F = [[0, 1, 2]];
    } else if (N === 4) {
      const r = Math.sqrt(8 / 9);
      V = [[0, 0, 1], ...[0, 1, 2].map((i) => [r * cs((-60 + 120 * i) * DEG), r * sn((-60 + 120 * i) * DEG), -1 / 3])];
      F = [
        [0, 1, 2],
        [0, 2, 3],
        [0, 3, 1],
        [1, 3, 2]
      ];
    } else {
      const n = N - 2,
        off = (n % 2 ? -90 : -90 + 180 / n) * DEG;
      V = [[0, 0, 1], [0, 0, -1], ...Array.from({ length: n }, (_, i) => [cs(off + (TAU * i) / n), sn(off + (TAU * i) / n), 0])];
      F = [];
      for (let i = 0; i < n; i++) {
        const a = 2 + i,
          b = 2 + ((i + 1) % n);
        F.push([0, a, b], [1, b, a]);
      }
    }
    const key = (a, b) => (a < b ? a + '-' + b : b + '-' + a);
    const edges = new Map();
    for (const f of F) for (let i = 0; i < f.length; i++) edges.set(key(f[i], f[(i + 1) % f.length]), [Math.min(f[i], f[(i + 1) % f.length]), Math.max(f[i], f[(i + 1) % f.length])]);
    const diagonals = [];
    for (let a = 0; a < N; a++) for (let b = a + 1; b < N; b++) if (!edges.has(key(a, b))) diagonals.push([a, b]);
    return { V, F, edges: [...edges.values()], diagonals };
  }

  /* ---------- tier 5: rational ternions (modified Rodrigues parameters) with the two-denominator product ⋆ ---------- */
  let starLog = null; // while computing, every max(D₊, D₋) the product picks
  function star(a, b) {
    const a2 = dot(a, a),
      b2 = dot(b, b),
      ab = dot(a, b);
    const N = add(add(scale(b, 1 - a2), scale(a, 1 - b2)), scale(cross(a, b), 2));
    const Dp = 1 + a2 * b2 - 2 * ab,
      Dm = dot(add(a, b), add(a, b));
    if (starLog) starLog.push(Math.max(Dp, Dm));
    return Dp >= Dm ? scale(N, 1 / Dp) : scale(N, -1 / Dm);
  }
  const neg = (a) => [-a[0], -a[1], -a[2]];
  /** The origin-free ternary operation [x, y, z] = x ⋆ y⁻¹ ⋆ z (the inverse of σ is −σ). */
  const heap = (x, y, z) => star(star(x, neg(y)), z);
  const mrp = (axis, angle) => scale(unit(axis), Math.tan(angle / 4));
  /** The rotation of the rational ternion σ applied to v (through its unit quaternion). */
  function rotate(s, v) {
    const s2 = dot(s, s),
      q0 = (1 - s2) / (1 + s2),
      qv = scale(s, 2 / (1 + s2));
    const t = scale(cross(qv, v), 2);
    return add(add(v, scale(t, q0)), cross(qv, t));
  }
  const E3 = [0, 0, 1];
  const THETA_TOTAL = 120 * DEG; // the total turn of tier 5
  const TILT0 = 18 * DEG; // the tilt of the reference bridge before the rollback
  // the reference bridge y: the rotation taking e₃ to a pointer in front, upper left of the tier-5 ball
  const BRIDGE_Q = unit([-0.62, 0.55, 0.5]);
  const BRIDGE_Y = mrp(cross(E3, BRIDGE_Q), Math.acos(BRIDGE_Q[2]));

  /* ---------- the state ---------- */
  const RAIL = {
    1: { max: () => 180, rate: 18, step: 15 },
    2: { max: () => 0.99, rate: 0.1, step: 0.05 },
    3: { max: () => 5, rate: 0.55, step: 1 },
    4: { max: () => RAIL_PRIMES - 1, rate: 2.2, step: 1 },
    5: { max: () => state.beats + 1, rate: 0.55, step: 1 }
  };
  const state = {
    tier: 2,
    view: 'focus',
    lens: 0,
    rsr: 0.36,
    sigma: 0.5,
    beats: 4,
    rail: { 1: 60, 2: 0.5, 3: 3, 4: 4, 5: 5 }
  };
  const presets = Object.freeze({
    'tier1-numbers-arc-calculus': Object.freeze({ tier: 1, rail: 60, play: false, still: 60 }),
    'tier2-dottie-dual-relativity': Object.freeze({ tier: 2, rail: 0.5, rsr: 0.36, play: false, still: 0.5 }),
    'tier3-afgut-weinberg-three-eighths': Object.freeze({ tier: 3, rail: 3, play: false, still: 3 }),
    'tier4-prime-sagitta-critical-ridge': Object.freeze({ tier: 4, rail: 4, sigma: 0.5, play: false, still: 4 }),
    'tier5-geodesic-mind-bridge-erasure': Object.freeze({ tier: 5, rail: 5, beats: 4, play: true, still: 'end' })
  });
  const ids = Object.keys(presets);

  /** Everything the page shows, from a parameter set (pure: the probe exposes it as calc). */
  function calc(s) {
    /* tier 1: the Gram matrix of γ(0), γ(ε), γ(2ε) on a great circle of S³ with κ = cos²(d/2) */
    const eps = s.eps * DEG;
    const G = [0, 1, 2].map((i) => [0, 1, 2].map((j) => cs(((i - j) * eps) / 2) ** 2));
    const vecs = [0, 1, 2].map((i) => [cs(i * eps) / SQ2, sn(i * eps) / SQ2, 1 / SQ2]);
    const M = 4096;
    const t1 = {
      eps: s.eps,
      G,
      det: det3(G),
      closed: 0.5 * sn(eps) ** 2 * vers(eps) ** 2,
      vecs,
      volume: det3(vecs),
      tetra: det3(vecs) / 6,
      vers: vers(eps),
      arc: { M, half: M * vers(Math.sqrt(1 / M)), one: M * vers(1 / M) }
    };
    /* tier 2: the shared-clock budget and the cosine fixed point */
    const beta = s.beta,
      r = s.rsr;
    const grav2 = r,
      kin2 = (1 - r) * beta * beta,
      dtau2 = (1 - r) * (1 - beta * beta);
    const t2 = {
      beta,
      rsr: r,
      grav2,
      kin2,
      dtau2,
      dtau: Math.sqrt(dtau2),
      sum: dtau2 + kin2 + grav2,
      point: [Math.sqrt(dtau2), Math.sqrt(kin2), Math.sqrt(grav2)],
      thetaStar: STAR,
      cos2Star: cs(STAR) ** 2
    };
    /* tier 3: the frame on N points and the Weyl ledger */
    const N = 3 + Math.floor(s.n3 + 1e-9);
    const fr = frame(N);
    const t3 = {
      N,
      frame: fr,
      pairs: (N * (N - 1)) / 2,
      rigid: fr.edges.length,
      dE: fr.diagonals.length,
      formula: ((N - 3) * (N - 4)) / 2,
      table: [3, 4, 5, 6].map((n) => [n, frame(n).diagonals.length]),
      ledger: LEDGER
    };
    /* tier 4: the prime-rotor sagitta */
    const count = 1 + Math.floor(s.k4 + 1e-9),
      sigma = s.sigma;
    const primes = PRIMES.slice(0, count);
    const steps = primes.map((p) => vers(p ** -sigma));
    const total = steps.reduce((a, b) => a + b, 0);
    const P11 = PRIMES.slice(0, 5);
    const t4 = {
      sigma,
      count,
      P: primes[primes.length - 1],
      primes,
      steps,
      total,
      lead: 0.5 * primes.reduce((a, p) => a + p ** (-2 * sigma), 0),
      totalOne: primes.reduce((a, p) => a + vers(1 / p), 0),
      eleven: { half: P11.reduce((a, p) => a + vers(1 / Math.sqrt(p)), 0), one: P11.reduce((a, p) => a + vers(1 / p), 0) },
      ceiling: SUM_ONE,
      guide: 0.5 * Math.log(Math.log(primes[primes.length - 1])) + C_SAG,
      cSag: C_SAG
    };
    /* tier 5: the heap geodesic, the jump and the bridge */
    const beats = s.beats,
      step = THETA_TOTAL / beats,
      t = clamp(s.t5, 0, beats + 1);
    starLog = [];
    const sig = [[0, 0, 0], mrp([1, 0, 0], step)];
    for (let i = 1; i < beats; i++) sig.push(heap(sig[i], sig[i - 1], sig[i]));
    const pointers = sig.map((x) => rotate(x, E3));
    const sagGeo = pointers.slice(1).reduce((a, p, i) => a + (1 - dot(pointers[i], p)), 0);
    const sagJump = 1 - dot(pointers[0], pointers[beats]);
    const done = Math.min(t, beats);
    const zNow = done >= beats ? sig[beats] : mrp([1, 0, 0], step * done);
    const tilt = t <= beats ? TILT0 : TILT0 * (beats + 1 - t);
    const yEps = star(BRIDGE_Y, mrp([1, 0, 0], tilt));
    const composite = heap(BRIDGE_Y, yEps, zNow);
    const exact = heap(BRIDGE_Y, BRIDGE_Y, zNow);
    const dMin = Math.min(...starLog);
    starLog = null;
    const t5 = {
      beats,
      t,
      step: step / DEG,
      sigmas: sig,
      pointers,
      sagGeo,
      sagJump,
      ratio: sagJump / sagGeo,
      done,
      sagDone: pointers.slice(1, Math.floor(done + 1e-9) + 1).reduce((a, p, i) => a + (1 - dot(pointers[i], p)), 0),
      zNow,
      pointer: rotate(zNow, E3),
      tilt: tilt / DEG,
      bridge: { y: BRIDGE_Y, yEps, composite, exact, residue: norm(sub(composite, zNow)), exactResidue: norm(sub(exact, zNow)), anchor: rotate(BRIDGE_Y, E3), anchorEps: rotate(yEps, E3), landing: rotate(composite, E3) },
      dMin
    };
    return { t1, t2, t3, t4, t5 };
  }
  const params = () => ({ eps: state.rail[1], beta: state.rail[2], rsr: state.rsr, n3: state.rail[3], k4: state.rail[4], sigma: state.sigma, beats: state.beats, t5: state.rail[5] });

  /* ---------- the instances of the cited Lean theorems, at the current state ---------- */
  function instances(m) {
    const { t2, t3, t4, t5 } = m;
    // record_time_lower_bound with ħ = 1, E = π/4, m₀ = |0⟩, m₁ = |1⟩, a = |+⟩, τ = 1
    const fs = Math.acos(1 / SQ2),
      E = PI / 4,
      tau = 1;
    // bogoliubov: the rapidity of β
    const rap = Math.atanh(t2.beta);
    // anchored phases on K_N: random edge phases, a random anchored gauge (g_r = 0), the loop phases before and after
    let seed = 7 + t3.N;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) * TAU;
    const N = t3.N,
      A = {},
      g = [0];
    for (let a = 0; a < N; a++) for (let b = a + 1; b < N; b++) A[a + '-' + b] = rnd();
    for (let v = 1; v < N; v++) g.push(rnd());
    const wrap = (x) => Math.atan2(sn(x), cs(x));
    const loops = (phase) => {
      const out = [];
      for (let a = 1; a < N; a++) for (let b = a + 1; b < N; b++) out.push(wrap(phase('0-' + a) + phase(a + '-' + b) - phase('0-' + b)));
      return out;
    };
    const before = loops((e) => A[e]);
    const after = loops((e) => {
      const [a, b] = e.split('-').map(Number);
      return A[e] + g[b] - g[a];
    });
    // the Schur complement on the Gram matrix of the rotors 2, 3 | 5, 7
    const th = [2, 3, 5, 7].map((p) => p ** -t4.sigma);
    const K = th.map((a) => th.map((b) => cs((a - b) / 2) ** 2));
    const Ab = [
        [K[0][0], K[0][1]],
        [K[1][0], K[1][1]]
      ],
      Bb = [
        [K[0][2], K[0][3]],
        [K[1][2], K[1][3]]
      ],
      Cb = [
        [K[2][2], K[2][3]],
        [K[3][2], K[3][3]]
      ];
    const dC = Cb[0][0] * Cb[1][1] - Cb[0][1] * Cb[1][0];
    const Ci = [
      [Cb[1][1] / dC, -Cb[0][1] / dC],
      [-Cb[1][0] / dC, Cb[0][0] / dC]
    ];
    const mv = (X, v) => X.map((row) => row[0] * v[0] + row[1] * v[1]);
    const tr = (X) => [
      [X[0][0], X[1][0]],
      [X[0][1], X[1][1]]
    ];
    const x = [1, -1];
    const y = mv(Ci, mv(tr(Bb), x)).map((v) => -v);
    const form = (yy) => {
      const z = [x[0], x[1], yy[0], yy[1]];
      let s = 0;
      for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) s += z[i] * K[i][j] * z[j];
      return s;
    };
    const BCB = mv(Bb, mv(Ci, mv(tr(Bb), x)));
    const xSx = x[0] * (mv(Ab, x)[0] - BCB[0]) + x[1] * (mv(Ab, x)[1] - BCB[1]);
    let worst = Infinity;
    for (let i = 0; i < 24; i++) {
      const d = [cs(i * 0.7) * 0.3, sn(i * 1.3) * 0.3];
      worst = Math.min(worst, form([y[0] + d[0], y[1] + d[1]]) - form(y));
    }
    // the Euler product at s = 2 over p ≤ P
    const euler = t4.primes.reduce((a, p) => a / (1 - p ** -2), 1);
    // the shortest-gate triangles on the pointer sphere
    const tri = (a, b, c) => {
      const S = 1 + dot(a, b) + dot(b, c) + dot(c, a),
        D = dot(a, cross(b, c));
      return { S, D, lhs: S * S + D * D, rhs: 2 * (1 + dot(a, b)) * (1 + dot(b, c)) * (1 + dot(c, a)), omega: 2 * Math.atan2(D, S) };
    };
    const ps = t5.pointers;
    // the observable Krylov dimensions: T = one beat (rotation about e₁), C reads the third coordinate
    const Rt = (v) => rotate(neg(t5.sigmas[1]), v); // T* = Tᵀ, the inverse beat
    const dims = [];
    const basis = [];
    let gen = [0, 0, 1];
    for (let mStep = 0; mStep <= 7; mStep++) {
      let w = gen.slice();
      for (const b of basis) w = sub(w, scale(b, dot(w, b)));
      if (norm(w) > 1e-9) basis.push(unit(w));
      dims.push(basis.length);
      gen = Rt(gen);
    }
    // the diagonal argument on the five tiers
    const g5 = (a, b) => a === b,
      diag = [0, 1, 2, 3, 4].map((a) => !g5(a, a));
    const escapes = [0, 1, 2, 3, 4].every((row) => [0, 1, 2, 3, 4].some((b) => diag[b] !== g5(row, b)));
    const g0 = true,
      f0 = (v) => v;
    // the lift of the tier-5 turn and of one full turn
    const theta = (t5.done * t5.step) * DEG;
    return {
      fixedPoint: { thetaStar: STAR, residual: Math.abs(cs(STAR) - STAR) },
      recordTime: { angle0: fs, angle1: fs, bound: (PI * 1) / (4 * E), tau, holds: fs <= (E * tau) / 1 + 1e-12 && fs <= (E * tau) / 1 + 1e-12 },
      minkowski: { beta: t2.beta, form: 1 - t2.beta * t2.beta, flat: (1 - 0) * (1 - t2.beta * t2.beta) },
      bogoliubov: { rapidity: rap, cosh: Math.cosh(rap), sinh: Math.sinh(rap), identity: Math.abs(Math.cosh(rap)) ** 2 - Math.abs(Math.sinh(rap)) ** 2, factor: 1 / Math.cosh(rap) },
      anchored: { n: N, m: (N * (N - 1)) / 2, c: before.length, before, after, gap: Math.max(...before.map((v, i) => Math.abs(wrap(v - after[i])))) },
      lift: { theta: theta / DEG, z: [cs(theta / 2), sn(theta / 2)], base: [cs(theta), sn(theta)], fullTurn: [cs(PI), sn(PI)] },
      schur: { K, y, min: form(y), xSx, worst },
      euler: { P: t4.P, product: euler, gap: PI ** 2 / 6 - euler },
      mertens: MERTENS_ERRORS,
      holonomy: { line: tri(ps[0], ps[Math.floor(t5.beats / 2)], ps[t5.beats]), bridge: tri(ps[0], t5.bridge.anchor, ps[t5.beats]) },
      krylov: { dims },
      lawvere: { diag, escapes, fixed: f0(g0) === g0 }
    };
  }

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    handle = $('omegaHandle');
  const RHO = 2.35,
    DZ = 1.3,
    RP = 0.98;
  const tierPhi = (k) => (-90 + 72 * (k - 1)) * DEG;
  const tierBase = (k) => [RHO * cs(tierPhi(k)), RHO * sn(tierPhi(k)), (k - 1) * DZ];
  const tierEx = (k) => [-sn(tierPhi(k)), cs(tierPhi(k)), 0];
  const tierEy = (k) => [-cs(tierPhi(k)), -sn(tierPhi(k)), 0];
  const FOCUS_Z = 0.6;
  const YAW_OFF = -0.62;
  const focusYaw = (k) => Math.atan2(-cs(tierPhi(k)), -sn(tierPhi(k))) + YAW_OFF;
  const VIEWS = {
    focus: (k) => ({ F: add(tierBase(k), [0, 0, FOCUS_Z]), sx: 1.3, sy: 1.02, yaw: focusYaw(k), pitch: 0.3 }),
    tower: () => ({ F: [0, 0, 3.0], sx: 3.55, sy: TRV.thumbMode ? 3.82 : 4.1, yaw: -0.3, pitch: 0.24 })
  };
  const view = { ...VIEWS.focus(state.tier) };
  const opts = { canvas: $('cv'), yaw: view.yaw, pitch: view.pitch, radius: 0.3, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');

  const toWorld = (k, p) => add(add(add(tierBase(k), scale(tierEx(k), p[0])), scale(tierEy(k), p[1])), [0, 0, p[2]]);
  const W = (k, p) => sub(toWorld(k, p), view.F);
  const Wa = (p) => sub(p, view.F);
  /** The camera's direction towards the viewer, in world and in a tier's frame. */
  const camD = () => {
    const y = sc.cam.yaw,
      p = sc.cam.pitch;
    return [-sn(y) * cs(p), -cs(y) * cs(p), sn(p)];
  };
  const localD = (k) => {
    const D = camD();
    return [dot(D, tierEx(k)), dot(D, tierEy(k)), D[2]];
  };
  const tube = (key, pts, color, r, extra = {}) => sc.tube(key, pts, { color, r, glow: 0.18, ...extra });
  const ring3 = (center, r, n1, n2, count = 64) => sample(count, (u) => add(center, add(scale(n1, r * cs(TAU * u)), scale(n2, r * sn(TAU * u)))));
  const box = (key, k, c, half, color, alpha = 1) => {
    const corners = Array.from({ length: 8 }, (_, i) => W(k, [c[0] + (i & 1 ? half[0] : -half[0]), c[1] + (i & 2 ? half[1] : -half[1]), c[2] + (i & 4 ? half[2] : -half[2])]));
    sc.poly(key, { vertices: corners, faces: [[0, 2, 3, 1], [4, 5, 7, 6], [0, 1, 5, 4], [2, 6, 7, 3], [0, 4, 6, 2], [1, 3, 7, 5]] }, { color, edges: color, alpha });
  };
  const tags = [];
  const tag = (key, p, html, cls) => tags.push([key, p, html, cls]);

  /** In the focused view a tier far from the camera's centre is out of the frame and is not drawn. */
  const nearTier = (k) => state.view !== 'focus' || TRV.thumbMode || k === state.tier || norm(sub(add(tierBase(k), [0, 0, FOCUS_Z]), view.F)) <= 2.9;
  /* the axiom column, the ramp, the arms and the platforms */
  const Z0 = -0.42,
    Z1 = 4 * DZ + 1.5,
    RC = 0.27;
  const coreR = (a, z) => RC * (1 + 0.22 * cs(3 * (a - (TAU * (z - Z0)) / (Z1 - Z0) * 1.15)));
  function tower(m) {
    const coreAt = (u, v) => {
      const z = lerp(Z0, Z1, v),
        a = TAU * u,
        r = coreR(a, z);
      return Wa([r * cs(a), r * sn(a), z]);
    };
    sc.surface('core', coreAt, { u: [0, 1], v: [0, 1], nu: 72, nv: 54, color: P.violet, grid: { every: [6, 6], alpha: 0.2 } });
    sc.surface('coreTop', (u, v) => {
      const a = TAU * u,
        r = coreR(a, Z1) * v;
      return Wa([r * cs(a), r * sn(a), Z1]);
    }, { u: [0, 1], v: [0, 1], nu: 72, nv: 3, color: P.violet });
    // the ramp: one helix that passes every tier at its own azimuth and height
    tube('ramp', sample(220, (u) => {
      const z = lerp(Z0 + 0.12, Z1 - 0.5, u),
        a = tierPhi(1) + (z / DZ) * 72 * DEG;
      return Wa([0.5 * cs(a), 0.5 * sn(a), z]);
    }), P.sigma, 0.012);
    for (let k = 1; k <= 5; k++) {
      if (!nearTier(k)) continue;
      const a = tierPhi(k),
        z = (k - 1) * DZ - 0.04;
      tube('arm' + k, [Wa([0.2 * cs(a), 0.2 * sn(a), z]), Wa([(RHO - RP + 0.12) * cs(a), (RHO - RP + 0.12) * sn(a), z])], P.violet, 0.042);
      sc.surface('plat' + k, (u, v) => W(k, [RP * u * cs(TAU * v), RP * u * sn(TAU * v), 0.03 * (1 - u * u)]), { u: [0, 1], v: [0, 1], nu: 6, nv: 60, color: P.violet, grid: { every: [2, 5], alpha: 0.22 } });
      sc.surface('rim' + k, (u, v) => W(k, [RP * cs(TAU * u), RP * sn(TAU * u), -0.09 + 0.09 * v]), { u: [0, 1], v: [0, 1], nu: 60, nv: 1, color: P.violet });
    }
    tube('activeRing', sample(96, (u) => W(state.tier, [(RP + 0.035) * cs(TAU * u), (RP + 0.035) * sn(TAU * u), 0.012])), P.amber, 0.011, { glow: 0.35 });
    // a mark on the near side of the column and one on its far side: the column hides the second one
    const D = camD(),
      Dh = unit([D[0], D[1], 0]),
      Rh = [cs(sc.cam.yaw), -sn(sc.cam.yaw), 0];
    const zMark = clamp(view.F[2] - 0.1, Z0 + 0.4, Z1 - 0.4);
    sc.bead(Wa(add(scale(unit(add(Dh, scale(Rh, -1.1))), RC * 1.32), [0, 0, zMark])), { color: P.violet, r: 4.2, key: 'coreFront' });
    sc.bead(Wa(add(scale(Dh, -RC * 1.32), [0, 0, zMark])), { color: P.violet, r: 4.2, key: 'coreBack' });
  }

  /* T1: the Gram tetrahedron */
  const T1S = 1.0; // world size of one unit of the Gram chart
  const T1PSI = PI / 6; // turns the chart so that γ(60°) points away from the viewer and the solid stands behind the centre
  const t1Local = (v) => [T1S * (v[0] * cs(T1PSI) - v[1] * sn(T1PSI)), T1S * (v[0] * sn(T1PSI) + v[1] * cs(T1PSI)) + 0.1, T1S * v[2] * 0.92];
  /** The tip of v₂ = γ(2ε), where the handle sits. */
  const t1Tip = (eps) => {
    const e = 2 * eps * DEG;
    return t1Local([cs(e) / SQ2, sn(e) / SQ2, 1 / SQ2]);
  };
  function tierGram(k, m, active) {
    const { t1 } = m;
    const v = t1.vecs.map(t1Local);
    const o = t1Local([0, 0, 0]);
    // the tetrahedron 0, v₀, v₁, v₂: its base is the triangle γ(0), γ(ε), γ(2ε) inscribed in the silver circle
    if (t1.det > 1e-12) sc.poly('gram', { vertices: [o, ...v].map((p) => W(k, p)), faces: [[0, 1, 2], [0, 2, 3], [0, 3, 1], [1, 3, 2]] }, { color: P.cyan, edges: P.cyan, alpha: 1 });
    const c0 = t1Local([0, 0, 1 / SQ2]);
    tube('gramCircle', sample(96, (u) => W(k, t1Local([cs(TAU * u) / SQ2, sn(TAU * u) / SQ2, 1 / SQ2]))), P.sigma, 0.011);
    for (let i = 0; i < 3; i++) tube('gramV' + i, [W(k, o), W(k, v[i])], P.cyan, 0.013, { glow: 0.35, occlude: false });
    // the step sagitta v_ε = 1 − cos ε along the radius of v₀ (the circle has radius 1/√2 in the chart)
    const e = t1.eps * DEG;
    const foot = t1Local([cs(e) / SQ2, 0, 1 / SQ2]);
    if (t1.vers > 1e-6) tube('gramVers', [W(k, foot), W(k, v[0])], P.magenta, 0.018, { glow: 0.3 });
    sc.line([W(k, v[1]), W(k, foot)], { color: P.magenta, width: 1.2, dash: [3, 3], alpha: 0.8 });
    sc.line([W(k, c0), W(k, v[0])], { color: P.sigma, width: 1, alpha: 0.55 });
    v.forEach((p, i) => sc.bead(W(k, p), { color: P.cyan, r: 3.8, key: 'gramTip' + i }));
    if (active) {
      const lift = (p, d) => add(p, scale(unit(sub(p, c0)), d));
      tag('v0', W(k, lift(v[0], 0.14)), 'v₀', 'raw backed c-cy');
      tag('v2', W(k, lift(v[2], 0.14)), 'v₂', 'raw backed c-cy');
      tag('vers', W(k, add(mix(foot, v[0], 0.5), [0.02, -0.08, 0.1])), 'v<sub>ε</sub>', 'raw backed c-mg');
      tag('det', W(k, add(v[1], [0, 0, 0.16])), `det G₃ = (6V)² = ${f4(t1.det)}`, 'raw backed c-cy');
    }
    return { handle: t1Tip(t1.eps) };
  }

  /* T2: the unit budget sphere and the cosine fixed point */
  // the corner of the octant is in front, dτ/dt runs back to the left, η_kin back to the right, η_grav up: the reader
  // looks into the inside of the sphere, so the point and its three legs stay in view
  const T2O = [0.06, -0.74, 0.04],
    T2S = 1.05,
    T2AX = [[-SQ2 / 2, SQ2 / 2, 0], [SQ2 / 2, SQ2 / 2, 0], [0, 0, 1]];
  const t2Local = (p) => add(T2O, scale(add(add(scale(T2AX[0], p[0]), scale(T2AX[1], p[1])), scale(T2AX[2], p[2])), T2S));
  const DOTTIE_C = [-0.86, -0.3, 0.05],
    DOTTIE_R = 0.3;
  const t2Point = (beta, r) => [Math.sqrt((1 - r) * (1 - beta * beta)), Math.sqrt(1 - r) * beta, Math.sqrt(r)];
  function tierBudget(k, m, active) {
    const { t2 } = m;
    const oct = (u, v) => {
      const a = (u * PI) / 2,
        b = (v * PI) / 2;
      return W(k, t2Local([sn(a) * cs(b), sn(a) * sn(b), cs(a)]));
    };
    // coloured by the share (dτ/dt)² = x² of the budget: cyan where the clock keeps it all, magenta where load takes it
    const share = (u, v) => (sn((u * PI) / 2) * cs((v * PI) / 2)) ** 2;
    sc.surface('octant', oct, { u: [0, 1], v: [0, 1], nu: 30, nv: 30, value: share, colors: [P.magenta, P.violet, P.cyan], range: [0, 1], grid: { every: [5, 5], alpha: 0.26 } });
    // the three axes
    const axes = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ];
    axes.forEach((a, i) => sc.line([W(k, t2Local([0, 0, 0])), W(k, t2Local(scale(a, 1.12)))], { color: P.sigma, width: 1.2, alpha: 0.75, key: 'axis' + i }));
    const B = t2.point;
    const p1 = [B[0], 0, 0],
      p2 = [B[0], B[1], 0];
    tube('legTau', [W(k, t2Local([0, 0, 0])), W(k, t2Local(p1))], P.cyan, 0.026, { glow: 0.35 });
    if (B[1] > 1e-4) tube('legKin', [W(k, t2Local(p1)), W(k, t2Local(p2))], P.magenta, 0.022, { glow: 0.3 });
    if (B[2] > 1e-4) tube('legGrav', [W(k, t2Local(p2)), W(k, t2Local(B))], P.magenta, 0.022, { glow: 0.3 });
    sc.line([W(k, t2Local([0, 0, 0])), W(k, t2Local(B))], { color: P.sigma, width: 1.1, dash: [4, 4], alpha: 0.7 });
    sc.bead(W(k, t2Local(B)), { color: P.amber, r: 4.6, key: 'activePoint' });
    // beside the octant, a standing quarter circle: the arc θ* and its cosine shadow on the floor have equal lengths
    const dc = DOTTIE_C,
      dr = DOTTIE_R;
    const onDisc = (a) => add(dc, [dr * cs(a), 0, dr * sn(a)]);
    tube('starQuarter', sample(30, (u) => W(k, onDisc((u * PI) / 2))), P.sigma, 0.008);
    tube('starArc', sample(30, (u) => W(k, onDisc(u * STAR))), P.cyan, 0.016, { glow: 0.4 });
    tube('starShadow', [W(k, dc), W(k, add(dc, [dr * cs(STAR), 0, 0]))], P.cyan, 0.016, { glow: 0.4 });
    sc.line([W(k, onDisc(STAR)), W(k, add(dc, [dr * cs(STAR), 0, 0]))], { color: P.cyan, width: 1, dash: [3, 3], alpha: 0.75 });
    sc.line([W(k, dc), W(k, onDisc(STAR))], { color: P.sigma, width: 1, alpha: 0.6 });
    if (active) {
      tag('tau', W(k, add(t2Local([B[0] * 0.55, 0, 0]), [-0.1, -0.1, 0.08])), 'dτ/dt', 'raw backed c-cy');
      if (B[1] > 0.05) tag('kin', W(k, add(t2Local([B[0], B[1] * 0.5, 0]), [0.08, -0.12, 0.08])), 'η<sub>kin</sub>', 'raw backed c-mg');
      if (B[2] > 0.05) tag('grav', W(k, add(t2Local([B[0], B[1], B[2] * 0.5]), [0.14, -0.04, 0])), 'η<sub>grav</sub>', 'raw backed c-mg');
      tag('star', W(k, add(DOTTIE_C, [DOTTIE_R * cs(STAR) + 0.08, 0, DOTTIE_R * sn(STAR) + 0.1])), 'θ* = cos θ*', 'raw backed c-cy');
    }
    return { handle: t2Local(B) };
  }

  /* T3: the frame on N points and the trace columns */
  const T3C = [-0.2, 0.08, 0.62],
    T3R = 0.5;
  const t3Local = (p) => add(T3C, scale(p, T3R));
  function tierFrame(k, m, active) {
    const { t3 } = m,
      fr = t3.frame;
    const Dl = localD(k);
    const backF = [],
      frontF = [];
    for (const f of fr.F) {
      const c = scale(f.reduce((s, i) => add(s, fr.V[i]), [0, 0, 0]), 1 / f.length);
      (fr.F.length > 1 && dot(c, Dl) < 0 ? backF : frontF).push(f);
    }
    const verts = fr.V.map((p) => W(k, t3Local(p)));
    if (backF.length) sc.poly('frameBack', { vertices: verts, faces: backF }, { color: P.violet, edges: P.violet, alpha: 1 });
    if (frontF.length) sc.poly('frameFront', { vertices: verts, faces: frontF }, { color: P.violet, edges: P.violet, alpha: fr.F.length > 1 ? 0.16 : 0.42 });
    fr.edges.forEach(([a, b], i) => tube('edge' + i, [verts[a], verts[b]], P.cyan, 0.014, { glow: 0.35, occlude: false }));
    fr.diagonals.forEach(([a, b], i) => tube('diag' + i, [verts[a], verts[b]], P.magenta, 0.018, { glow: 0.45, occlude: false }));
    verts.forEach((p, i) => sc.bead(p, { color: P.sigma, r: 3, key: 'node' + i }));
    // the trace columns: Tr T₃² (cyan) and Tr Q² (silver), lepton, up and down blocks; the ring marks 3/8 of Tr Q²
    const H = 0.17,
      gap = 0.012;
    const colA = [0.66, -0.12],
      colB = [0.66, 0.2];
    let za = 0,
      zb = 0;
    FAMILIES.forEach((f, i) => {
      const ha = (H * t3.ledger.sumT[f].n) / t3.ledger.sumT[f].d,
        hb = (H * t3.ledger.sumQ[f].n) / t3.ledger.sumQ[f].d;
      box('colT' + i, k, [colA[0], colA[1], 0.03 + za + ha / 2], [0.085, 0.085, Math.max(0.002, ha / 2 - gap / 2)], P.cyan);
      box('colQ' + i, k, [colB[0], colB[1], 0.03 + zb + hb / 2], [0.085, 0.085, Math.max(0.002, hb / 2 - gap / 2)], P.sigma);
      za += ha;
      zb += hb;
    });
    const mark = 0.03 + H * t3.ledger.value * (t3.ledger.trQ.n / t3.ledger.trQ.d);
    tube('ratioRing', ring3(W(k, [colB[0], colB[1], mark]), 0.13, tierEx(k), tierEy(k)), P.cyan, 0.01, { glow: 0.5 });
    sc.line([W(k, [colA[0], colA[1], 0.03 + za]), W(k, [colB[0], colB[1], mark])], { color: P.cyan, width: 1.2, dash: [3, 3], alpha: 0.85 });
    if (active) {
      const mid = fr.diagonals.length ? fr.diagonals[0] : null;
      if (mid) tag('dE', W(k, add(mix(t3Local(fr.V[mid[0]]), t3Local(fr.V[mid[1]]), 0.3), [-0.16, -0.08, 0])), `ΔE = ${t3.dE}`, 'raw backed c-mg');
      else tag('dE', W(k, add(t3Local([0, 0, 1]), [0, 0, 0.13])), 'ΔE = 0', 'raw backed c-cy');
      tag('trT', W(k, [colA[0], colA[1] - 0.12, 0.03 + za + 0.1]), 'Tr T₃² = 2', 'raw backed c-cy');
      tag('trQ', W(k, [colB[0], colB[1], 0.03 + zb + 0.1]), 'Tr Q² = 16/3', 'raw backed c-sg');
    }
    return { handle: null };
  }

  /* T4: the staircase of prime sagittas, the σ = 1 ring and the σ ruler */
  const T4C = [0.02, 0.2],
    T4H = 1.0,
    SIG_LO = 0.3,
    SIG_HI = 1.2;
  const rulerAt = (sigma) => [lerp(-0.6, 0.6, (sigma - SIG_LO) / (SIG_HI - SIG_LO)), -0.7, 0.05];
  function tierStairs(k, m, active) {
    const { t4 } = m;
    let z = 0;
    const da = 15 * DEG,
      a0 = -150 * DEG,
      r0 = 0.1,
      r1 = 0.6;
    for (let i = 0; i < t4.count; i++) {
      const h = T4H * t4.steps[i],
        a = a0 + i * da,
        lo = 0.035 + z,
        hi = 0.035 + z + Math.max(h, 0.004);
      const pt = (r, ang, zz) => W(k, [T4C[0] + r * cs(ang), T4C[1] + r * sn(ang), zz]);
      const A = a - da * 0.46,
        B = a + da * 0.46;
      const vtx = [pt(r0, A, lo), pt(r1, A, lo), pt(r1, B, lo), pt(r0, B, lo), pt(r0, A, hi), pt(r1, A, hi), pt(r1, B, hi), pt(r0, B, hi)];
      sc.poly('step' + i, { vertices: vtx, faces: [[0, 3, 2, 1], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]] }, { color: P.magenta, edges: P.magenta, alpha: 1 });
      z += h;
    }
    tube('stairPole', [W(k, [T4C[0], T4C[1], 0.03]), W(k, [T4C[0], T4C[1], 0.06 + Math.max(z, T4H * t4.ceiling)])], P.sigma, 0.016);
    tube('ceiling', ring3(W(k, [T4C[0], T4C[1], 0.035 + T4H * t4.ceiling]), 0.7, tierEx(k), tierEy(k), 80), P.cyan, 0.011, { glow: 0.5 });
    // the σ ruler: the cyan fin is the critical line σ = ½, the silver tick σ = 1
    tube('ruler', [W(k, rulerAt(SIG_LO)), W(k, rulerAt(SIG_HI))], P.sigma, 0.012);
    const fin = rulerAt(0.5);
    sc.poly('fin', { vertices: [W(k, add(fin, [0, -0.03, 0])), W(k, add(fin, [0, 0.03, 0])), W(k, add(fin, [0, 0.03, 0.17])), W(k, add(fin, [0, -0.03, 0.17]))], faces: [[0, 1, 2, 3]] }, { color: P.cyan, edges: P.cyan, alpha: 0.9 });
    const one = rulerAt(1);
    sc.line([W(k, one), W(k, add(one, [0, 0, 0.09]))], { color: P.sigma, width: 2 });
    if (active) {
      tag('ridge', W(k, add(fin, [-0.1, -0.06, 0.12])), 'σ = ½', 'raw backed c-cy');
      tag('ceil', W(k, [T4C[0] + 0.72, T4C[1] - 0.1, 0.035 + T4H * t4.ceiling + 0.02]), `σ = 1 · Σ<sub>p</sub> ${f4(t4.ceiling)}`, 'raw backed c-cy');
      tag('stair', W(k, [T4C[0] - 0.55, T4C[1], 0.06 + z + 0.08]), `Σ<sub>sag</sub> = ${f4(t4.total)}`, 'raw backed c-mg');
    }
    return { handle: rulerAt(t4.sigma) };
  }

  /* T5: the pointer ball, the geodesic beats, the jump and the bridge */
  const T5C = [0, 0.1, 0.62],
    T5R = 0.55;
  const t5Local = (p) => add(T5C, scale([-p[1], p[0], p[2]], T5R));
  const slerpPts = (a, b, n, r = 1) => {
    const om = Math.acos(clamp(dot(a, b), -1, 1));
    if (om < 1e-9) return [scale(a, r), scale(b, r)];
    return sample(n, (u) => scale(add(scale(a, sn((1 - u) * om) / sn(om)), scale(b, sn(u * om) / sn(om))), r));
  };
  function tierBall(k, m, active) {
    const { t5 } = m;
    const Dl = unit(localD(k));
    // the half of the ball away from the viewer, opaque; a glass shell over the whole ball
    const e1 = unit(cross(Math.abs(Dl[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], Dl)),
      e2 = cross(Dl, e1);
    sc.surface('bowl', (u, v) => {
      const a = (u * PI) / 2,
        b = TAU * v;
      return W(k, add(T5C, scale(add(scale(add(scale(e1, cs(b)), scale(e2, sn(b))), sn(a)), scale(Dl, -cs(a))), 0.985 * T5R)));
    }, { u: [0, 1], v: [0, 1], nu: 16, nv: 64, color: P.violet, grid: { every: [4, 8], alpha: 0.22 } });
    sc.glass('ballGlass', W(k, T5C), T5R, { color: P.violet, alpha: 0.07 });
    tube('ballCircle', sample(96, (u) => W(k, t5Local([0, sn(TAU * u) * 1.004, cs(TAU * u) * 1.004]))), P.sigma, 0.008);
    const ps = t5.pointers;
    // the jump: one leap of the whole turn off the sphere, and its sagitta 1 − cos 120° = 1.5 down the start radius
    const hop = sample(48, (u) => {
      const th = u * THETA_TOTAL;
      return W(k, t5Local(scale([0, -sn(th), cs(th)], 1 + 0.3 * sn(PI * u))));
    });
    sc.line(hop, { color: P.magenta, width: 1.6, dash: [5, 4], alpha: 0.9 });
    const jumpFoot = scale(ps[0], dot(ps[0], ps[t5.beats]));
    tube('jumpVers', [W(k, t5Local(ps[0])), W(k, t5Local(jumpFoot))], P.magenta, 0.016, { glow: 0.35 });
    sc.line([W(k, t5Local(ps[t5.beats])), W(k, t5Local(jumpFoot))], { color: P.magenta, width: 1, dash: [3, 3], alpha: 0.7 });
    // the beats so far along the great circle, and the sagitta of each completed beat
    const thNow = t5.done * t5.step * DEG;
    if (thNow > 1e-6) tube('geodesic', sample(Math.max(4, Math.ceil(thNow / (2 * DEG))), (u) => W(k, t5Local(scale([0, -sn(u * thNow), cs(u * thNow)], 1.012)))), P.cyan, 0.02, { glow: 0.4 });
    for (let i = 0; i <= Math.floor(t5.done + 1e-9); i++) sc.bead(W(k, t5Local(scale(ps[i], 1.03))), { color: P.cyan, r: 4.6, key: 'beat' + i });
    // the sagitta of each completed beat: a short magenta stretch on the radius of the beat's start
    for (let i = 0; i < Math.floor(t5.done + 1e-9); i++) {
      const foot = scale(ps[i], dot(ps[i], ps[i + 1]));
      sc.line([W(k, t5Local(ps[i])), W(k, t5Local(foot))], { color: P.magenta, width: 2.6 });
    }
    // the bridge to y (opacity ε/ε₀), the tilted copy y_ε, and where [y, y_ε, z] lands
    const fade = clamp(t5.tilt / (TILT0 / DEG), 0, 1);
    const pz = t5.pointer,
      b = t5.bridge;
    if (fade > 0.01) {
      tube('bridge', slerpPts(pz, b.anchor, 40, 1.03).map((p) => W(k, t5Local(p))), P.violet, 0.016, { alpha: Math.max(0.05, fade), glow: 0.5 });
      sc.bead(W(k, t5Local(scale(b.anchor, 1.03))), { color: P.violet, r: 4, key: 'bridgeY', alpha: fade });
      sc.line(slerpPts(b.anchor, b.anchorEps, 12, 1.03).map((p) => W(k, t5Local(p))), { color: P.magenta, width: 2, alpha: fade });
      sc.bead(W(k, t5Local(scale(b.anchorEps, 1.03))), { color: P.magenta, r: 3, key: 'bridgeYeps', alpha: fade });
    }
    if (b.residue > 1e-9) {
      sc.line(slerpPts(pz, b.landing, 12, 1.02).map((p) => W(k, t5Local(p))), { color: P.magenta, width: 2.2 });
      sc.ring(W(k, t5Local(scale(b.landing, 1.02))), { color: P.magenta, r: 5, normal: unit(sub(W(k, t5Local(b.landing)), W(k, T5C))) });
    } else sc.ring(W(k, t5Local(scale(pz, 1.03))), { color: P.cyan, r: 6.5, normal: unit(sub(W(k, t5Local(pz)), W(k, T5C))) });
    if (active) {
      tag('jump', W(k, t5Local([0.12, 0.05, 0.2])), 'S<sub>jump</sub> = 1.5', 'raw backed c-mg');
      tag('geo', W(k, t5Local(scale([0, -sn(THETA_TOTAL * 0.45), cs(THETA_TOTAL * 0.45)], 1.3))), `S<sub>geo</sub> = ${f4(t5.sagGeo)}`, 'raw backed c-cy');
      if (fade > 0.01) tag('bridgeTag', W(k, t5Local(scale(b.anchor, 1.25))), 'y', 'raw backed c-vi');
      if (b.residue < 1e-9) tag('erase', W(k, t5Local(add(scale(pz, 1.28), [0.25, 0, 0]))), '[y, y, z] = z', 'raw backed c-cy');
    }
    return { handle: null };
  }

  const DRAW = { 1: tierGram, 2: tierBudget, 3: tierFrame, 4: tierStairs, 5: tierBall };

  /* ---------- names, HUD and legend ---------- */
  const TIER_NAMES = [
    null,
    [['几何与微积分', 'GEOMETRY & CALCULUS'], ['格拉姆正定', 'GRAM POSITIVITY']],
    [['观察与双相对论', 'OBSERVER & RELATIVITY'], ['勾股总预算', 'PYTHAGOREAN BUDGET']],
    [['四力大统一', 'FOUR FORCES'], ['迹比与过约束', 'TRACE RATIO & OVERCONSTRAINT']],
    [['算术临界谱', 'ARITHMETIC SPECTRUM'], ['矢高相变', 'SAGITTA ONSET']],
    [['测地智能与撤桥', 'GEODESIC MIND & BRIDGE'], ['消去律 [x, x, z] = z', 'CANCELLATION [x, x, z] = z']]
  ];
  const tierName = (k) => L(...TIER_NAMES[k][state.lens]);
  const tierWord = (k) => L(`第 ${k} 阶`, `Tier ${k}`);
  function keyOf(m, k = state.tier) {
    if (k === 1) return { label: L('det G₃(ε) = ½ sin²ε (1 − cos ε)²', 'det G₃(ε) = ½ sin²ε (1 − cos ε)²'), value: f8(m.t1.det), sub: ` · ε = ${m.t1.eps.toFixed(2)}°` };
    if (k === 2) return { label: L('(dτ/dt)² + η<sub>kin</sub>² + η<sub>grav</sub>²', '(dτ/dt)² + η<sub>kin</sub>² + η<sub>grav</sub>²'), value: f8(m.t2.sum), sub: ` · dτ/dt = ${f8(m.t2.dtau)}` };
    if (k === 3) return { label: L('sin²θ<sub>W</sub> = Tr T₃² / Tr Q²', 'sin²θ<sub>W</sub> = Tr T₃² / Tr Q²'), value: f8(m.t3.ledger.value), sub: ` = ${qstr(m.t3.ledger.ratio)} · ΔE(${m.t3.N}) = ${m.t3.dE}` };
    if (k === 4) return { label: L('Σ<sub>sag</sub>(σ; P) = Σ (1 − cos p<sup>−σ</sup>)', 'Σ<sub>sag</sub>(σ; P) = Σ (1 − cos p<sup>−σ</sup>)'), value: f8(m.t4.total), sub: ` · σ = ${m.t4.sigma.toFixed(2)} · P = ${m.t4.P}` };
    return { label: L('S<sub>geo</sub> &lt; S<sub>jump</sub>', 'S<sub>geo</sub> &lt; S<sub>jump</sub>'), value: f8(m.t5.sagGeo), sub: ` < ${f8(m.t5.sagJump)}` };
  }
  function subline(m) {
    const k = state.tier;
    if (k === 1) {
      const t = m.t1;
      if (t.det < 5e-9) return L(`ε = ${t.eps.toFixed(1)}°：三个顶点落在一条线上，青色四面体压扁，det G₃ = 0。`, `ε = ${t.eps.toFixed(1)}°: the three tips fall on one line, the cyan tetrahedron is flat and det G₃ = 0.`);
      return L(`ε = ${t.eps.toFixed(1)}°：青色四面体的体积 V 满足 det G₃ = (6V)²，品红一段是 v<sub>ε</sub> = ${f4(t.vers)}。`, `ε = ${t.eps.toFixed(1)}°: the cyan tetrahedron has volume V with det G₃ = (6V)²; the magenta stretch is v<sub>ε</sub> = ${f4(t.vers)}.`);
    }
    if (k === 2) {
      const t = m.t2;
      const pt = '(' + t.point.map((x) => f4(x)).join(', ') + ')';
      return L(`平方份额 ${f4(t.dtau2)} + ${f4(t.kin2)} + ${f4(t.grav2)} = 1：琥珀点 ${pt} 只能在单位球面上走。`, `Squared shares ${f4(t.dtau2)} + ${f4(t.kin2)} + ${f4(t.grav2)} = 1: the amber point ${pt} can only move on the unit sphere.`);
    }
    if (k === 3) {
      const t = m.t3;
      return L(`N = ${t.N}：${t.pairs} 根边里 ${t.rigid} 根撑起三角化，多出的品红 ΔE = ${t.dE}；青色柱到银白柱的 3/8。`, `N = ${t.N}: of ${t.pairs} edges, ${t.rigid} make the triangulation and ΔE = ${t.dE} are magenta extras; the cyan column reaches 3/8 of the silver one.`);
    }
    if (k === 4) {
      const t = m.t4,
        above = t.total > t.ceiling;
      return above
        ? L(`σ = ${t.sigma.toFixed(2)}，p ≤ ${t.P}：品红台阶越过青色环（σ = 1 的全素数总和）继续上升。`, `σ = ${t.sigma.toFixed(2)}, p ≤ ${t.P}: the magenta staircase passes the cyan ring (the σ = 1 total over all primes) and keeps climbing.`)
        : L(`σ = ${t.sigma.toFixed(2)}，p ≤ ${t.P}：品红台阶还在青色环下面。`, `σ = ${t.sigma.toFixed(2)}, p ≤ ${t.P}: the magenta staircase is still below the cyan ring.`);
    }
    const t = m.t5;
    if (t.t <= t.beats) return L(`第 ${f4(t.done).replace(/\.?0+$/, '')} / ${t.beats} 拍，每拍 ${t.step.toFixed(1)}°：青色矢高和 ${f4(t.sagDone)}，跳步要付 1.5。`, `Beat ${f4(t.done).replace(/\.?0+$/, '')} of ${t.beats}, ${t.step.toFixed(1)}° each: cyan sagitta so far ${f4(t.sagDone)}; the jump costs 1.5.`);
    if (t.bridge.residue > 1e-9) return L(`倾角 ε = ${t.tilt.toFixed(1)}° 回推中：[y, y<sub>ε</sub>, z] 离 z 还差 ${f4(t.bridge.residue)}，桥在变淡。`, `Rolling the tilt back, ε = ${t.tilt.toFixed(1)}°: [y, y<sub>ε</sub>, z] still misses z by ${f4(t.bridge.residue)}; the bridge fades.`);
    return L('ε = 0：[y, y, z] = z，残差 0.00000000，参照桥不留痕迹。', 'ε = 0: [y, y, z] = z, residue 0.00000000; the reference bridge leaves no trace.');
  }
  function legendItems() {
    return [
      ['vi', L('公理柱与阶台', 'axiom column, tiers')],
      ['cy', L('守恒的不变量', 'conserved invariants')],
      ['mg', L('负载、余项与税', 'load, remainder, tax')],
      ['sg', L('参照圆、轴与坡道', 'reference circles, ramp')]
    ];
  }
  function hud(m) {
    const k = keyOf(m);
    $('hudBig').innerHTML = `${tierWord(state.tier)} · ${state.tier === 3 ? 'sin²θ<sub>W</sub> = 3/8' : state.tier === 5 ? `S<sub>geo</sub> = ${f4(m.t5.sagGeo)} &lt; 1.5` : state.tier === 4 ? `Σ<sub>sag</sub> = ${f4(m.t4.total)}` : state.tier === 2 ? `${L('预算和', 'budget')} = ${f4(m.t2.sum)}` : `det G₃ = ${f4(m.t1.det)}`}`;
    $('hudSub').innerHTML = subline(m);
    $('legend').innerHTML = legendItems().map(([c, s]) => `<span><i class="sw ${c}"></i>${s}</span>`).join('');
    return k;
  }

  /* ---------- labels: keep each caption near its anchor, clear of the HUD and the handle ---------- */
  function fitLabels() {
    if (TRV.thumbMode) return;
    const bounds = stage.getBoundingClientRect();
    const occupied = [$('hudTl'), $('legend'), handle].filter((el) => !el.hidden).map((el) => el.getBoundingClientRect());
    const els = [...stage.querySelectorAll('.tags .tag:not([hidden])')];
    for (const el of els) el.style.translate = '';
    const boxes = els.map((el) => el.getBoundingClientRect());
    for (const [i, b] of boxes.entries()) {
      const dx = clamp(0, bounds.left + 5 - b.left, bounds.right - 5 - b.right);
      const row = b.height + 4;
      for (let j = 0; j <= 2 * Math.ceil(bounds.height / row); j++) {
        const dy = Math.ceil(j / 2) * row * (j % 2 ? 1 : -1);
        const left = b.left + dx,
          right = b.right + dx,
          top = b.top + dy,
          bottom = b.bottom + dy;
        if (top < bounds.top + 4 || bottom > bounds.bottom - 4) continue;
        if (occupied.some((r) => left < r.right + 3 && right > r.left - 3 && top < r.bottom + 3 && bottom > r.top - 3)) continue;
        els[i].style.translate = dx + 'px ' + dy + 'px';
        occupied.push({ left, right, top, bottom });
        break;
      }
    }
  }

  /* ---------- drawing the stage ---------- */
  let handleLocal = null;
  function fit() {
    const Wd = stage.clientWidth || 300,
      Hd = stage.clientHeight || 200;
    // the HUD takes the top rows and the legend the bottom one; the cover has neither
    const top = TRV.thumbMode ? 16 : Wd < 560 ? 74 : 64,
      bottom = TRV.thumbMode ? 12 : Wd < 560 ? 44 : 36;
    // a narrow, tall stage is limited by its width: give the focused tier less side margin there
    const sx = view.sx * (Wd < 560 && Hd > Wd ? 0.88 : 1);
    const unitPx = Math.max(20, Math.min((Wd - 24) / (2 * sx), (Hd - top - bottom) / (2 * view.sy)));
    opts.radius = unitPx / Math.min(Wd, Hd);
    opts.cy = (top + (Hd - top - bottom) / 2) / Hd;
    opts.cx = 0.5;
  }
  function drawStage(m) {
    fit();
    tags.length = 0;
    sc.begin();
    tower(m);
    let h = null;
    for (let k = 1; k <= 5; k++) {
      const active = k === state.tier && state.view === 'focus';
      if (!nearTier(k)) continue;
      const out = DRAW[k](k, m, active);
      if (k === state.tier) h = out.handle;
      if (state.view === 'tower' || TRV.thumbMode) {
        const cap = [null, 'det G₃', 'Σ = 1', '3/8', 'σ = ½', '[x, x, z] = z'][k];
        // the caption hangs under the rim on the side that faces the camera
        const D = camD(),
          Dh = unit([D[0], D[1], 0]);
        tag('cap' + k, Wa(add(add(tierBase(k), scale(Dh, RP + 0.12)), [0, 0, -0.22])), `${k} · ${cap}`, 'raw backed ' + (k === state.tier ? 'c-ik' : 'c-sg'));
      }
    }
    for (const [key, p, html, cls] of tags) sc.tag(key, p, html, cls);
    sc.end();
    handleLocal = h;
    const showHandle = !!h && !TRV.still && state.view === 'focus';
    handle.hidden = !showHandle;
    if (showHandle) {
      const q = sc.p(W(state.tier, h));
      handle.style.left = q[0] + 'px';
      handle.style.top = q[1] + 'px';
    }
    fitLabels();
  }

  /* ---------- the strip: along this tier's rail, what changes and what does not ---------- */
  function drawPlot(m) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    const k = state.tier;
    let g;
    if (k === 1) {
      $('plotTitle').textContent = L('沿 ε：det G₃ 只在 0° 与 180° 为零', 'Along ε: det G₃ vanishes only at 0° and 180°');
      $('plotMeta').textContent = '½ sin²ε (1 − cos ε)² · 3/32 @ 60° · 1/2 @ 90°';
      g = kit.plot(cv, { x: [0, 180], y: [0, 0.92], pad: [36, 14, 12, 22] });
      g.axes({ xTicks: [0, 30, 60, 90, 120, 150, 180], yTicks: [0, 0.25, 0.5, 0.75], xLabel: 'ε (°)' });
      const curve = sample(180, (u) => [180 * u, 0.5 * sn(PI * u) ** 2 * vers(PI * u) ** 2]);
      g.area(curve, P.cyan, { alpha: 0.12 });
      g.line(curve, P.cyan, { width: 2 });
      g.dot(60, 3 / 32, P.sigma, 3.2);
      g.dot(90, 0.5, P.sigma, 3.2);
      g.vline(m.t1.eps, P.amber);
      g.dot(m.t1.eps, m.t1.det, P.amber, 3.5);
      g.legend([[P.cyan, 'det G₃(ε)'], [P.sigma, '3/32, 1/2']], { right: false });
    } else if (k === 2) {
      const r = m.t2.rsr;
      $('plotTitle').textContent = L('沿 β：三份加起来总是 1', 'Along β: the three shares always add up to 1');
      $('plotMeta').textContent = `r_s/r = ${r.toFixed(2)} · (dτ/dt)² = (1 − r_s/r)(1 − β²)`;
      g = kit.plot(cv, { x: [0, 1], y: [0, 1.6], pad: [36, 14, 12, 22] });
      g.axes({ xTicks: [0, 0.25, 0.5, 0.75, 1], yTicks: [0, 0.5, 1], xLabel: 'β' });
      const lo = sample(100, (u) => [u, r]),
        mid = sample(100, (u) => [u, r + (1 - r) * u * u]);
      g.area(lo, P.magenta, { alpha: 0.32 });
      g.area(mid, P.magenta, { alpha: 0.14 });
      g.line(mid, P.magenta, { width: 1.4 });
      g.line(lo, P.magenta, { width: 1.4 });
      g.line(sample(10, (u) => [u, 1]), P.cyan, { width: 2.2 });
      g.vline(m.t2.beta, P.amber);
      g.dot(m.t2.beta, 1, P.amber, 3.5);
      g.legend([[P.cyan, L('总和 = 1', 'sum = 1')], [P.magenta, 'η² (grav, kin)']], { right: false });
    } else if (k === 3) {
      $('plotTitle').textContent = L('沿 N：三角化用 3N − 6 根，多出的 ΔE(N) 是品红', 'Along N: a triangulation uses 3N − 6 edges; the extra ΔE(N) are magenta');
      $('plotMeta').textContent = 'N(N − 1)/2 = (3N − 6) + (N − 3)(N − 4)/2';
      g = kit.plot(cv, { x: [2.4, 8.6], y: [0, 30], pad: [36, 14, 12, 22] });
      g.axes({ xTicks: [3, 4, 5, 6, 7, 8], yTicks: [0, 10, 20, 30], xLabel: 'N' });
      for (let n = 3; n <= 8; n++) {
        const rigid = 3 * n - 6,
          extra = ((n - 3) * (n - 4)) / 2;
        g.poly([[n - 0.3, 0], [n + 0.3, 0], [n + 0.3, rigid], [n - 0.3, rigid]], P.cyan, { alpha: 0.5 });
        if (extra) g.poly([[n - 0.3, rigid], [n + 0.3, rigid], [n + 0.3, rigid + extra], [n - 0.3, rigid + extra]], P.magenta, { alpha: 0.7 });
      }
      g.vline(m.t3.N, P.amber);
      g.legend([[P.cyan, '3N − 6'], [P.magenta, 'ΔE(N)']], { right: false });
    } else if (k === 4) {
      $('plotTitle').textContent = L('沿 P：σ = ½ 一路上升，σ = 1 停在青线下', 'Along P: σ = ½ keeps rising, σ = 1 stays under the cyan line');
      $('plotMeta').textContent = `σ = ${m.t4.sigma.toFixed(2)} · ½ ln ln P + C_sag (σ = ½)`;
      const xs = PRIMES.slice(0, RAIL_PRIMES);
      let a = 0,
        b = 0;
      const cur = xs.map((p) => [p, (a += vers(p ** -m.t4.sigma))]),
        ref = xs.map((p) => [p, (b += vers(1 / p))]);
      const top = Math.max(1, Math.ceil(cur[cur.length - 1][1] * 5 + 0.5) / 5);
      g = kit.plot(cv, { x: [0, 100], y: [0, top], pad: [36, 14, 12, 22] });
      g.axes({ xTicks: [2, 11, 25, 50, 75, 97], yTicks: [0, 0.5, 1, 1.5, 2].filter((v) => v <= top), xLabel: 'P' });
      g.line(sample(80, (u) => [3 + 94 * u, 0.5 * Math.log(Math.log(3 + 94 * u)) + C_SAG]), P.sigma, { width: 1.2, dash: [4, 4], alpha: 0.8 });
      g.hline(SUM_ONE, P.cyan, { alpha: 0.6, dash: [3, 3] });
      g.line(ref, P.cyan, { width: 1.8 });
      g.line(cur, P.magenta, { width: 2 });
      g.vline(m.t4.P, P.amber);
      g.dot(m.t4.P, m.t4.total, P.amber, 3.5);
      g.legend([[P.magenta, `σ = ${m.t4.sigma.toFixed(2)}`], [P.cyan, 'σ = 1'], [P.sigma, '½ ln ln P + C']], { right: true, bottom: true, dy: -12 });
    } else {
      const t = m.t5;
      $('plotTitle').textContent = L('沿拍数：测地线每拍付一点，跳步在最后一拍付 1.5', 'Along the beats: the geodesic pays a little each beat, the jump pays 1.5 at the last');
      $('plotMeta').textContent = `N = ${t.beats} · ${t.step.toFixed(1)}° · S_geo = ${f4(t.sagGeo)}`;
      g = kit.plot(cv, { x: [0, t.beats + 1], y: [0, 1.65], pad: [36, 14, 12, 22] });
      g.axes({ xTicks: Array.from({ length: t.beats + 2 }, (_, i) => i), yTicks: [0, 0.5, 1, 1.5], xLabel: L('拍 · 撤桥', 'beat · rollback') });
      const per = 1 - cs(t.step * DEG);
      const geo = [];
      for (let i = 0; i <= t.beats; i++) geo.push([i, per * i]);
      geo.push([t.beats + 1, per * t.beats]);
      const jump = [[0, 0], [t.beats - 1, 0], [t.beats, t.sagJump], [t.beats + 1, t.sagJump]];
      g.line(jump, P.magenta, { width: 2, dash: [5, 4] });
      g.line(geo, P.cyan, { width: 2 });
      const res = sample(30, (u) => {
        const tilt = TILT0 * (1 - u);
        const z = t.sigmas[t.beats],
          ye = star(BRIDGE_Y, mrp([1, 0, 0], tilt));
        return [t.beats + u, norm(sub(heap(BRIDGE_Y, ye, z), z))];
      });
      g.line(res, P.magenta, { width: 1.6 });
      g.vline(t.t, P.amber);
      g.legend([[P.cyan, 'S_geo'], [P.magenta, L('跳步 · 残差', 'jump · residue')]], { right: false });
    }
  }

  /* ---------- readouts ---------- */
  function readings(m, I) {
    const k = keyOf(m);
    $('roKeyLabel').innerHTML = `${tierWord(state.tier)} · ${k.label}`;
    $('roKey').textContent = k.value;
    $('roKeySub').textContent = k.sub;
    $('roT1').textContent = `ε = ${m.t1.eps.toFixed(2)}° · det = ${f8(m.t1.det)} · v_ε = ${f8(m.t1.vers)}`;
    $('roT2').textContent = `${f8(m.t2.dtau2)} + ${f8(m.t2.kin2)} + ${f8(m.t2.grav2)} = ${f8(m.t2.sum)} · θ* = ${f8(STAR)}`;
    $('roT3').textContent = `${qstr(m.t3.ledger.trT)} / (${qstr(m.t3.ledger.trQ)}) = ${qstr(m.t3.ledger.ratio)} = ${f8(m.t3.ledger.value)} · ΔE(${m.t3.N}) = ${m.t3.dE}`;
    $('roT4').textContent = `σ = ${m.t4.sigma.toFixed(2)} · p ≤ ${m.t4.P}: ${f8(m.t4.total)} · σ = 1: ${f8(m.t4.totalOne)}`;
    $('roT5').textContent = `${f8(m.t5.sagGeo)} < ${f8(m.t5.sagJump)} · min max(D₊, D₋) = ${f4(m.t5.dMin)}`;
    $('roBridge').textContent = `ε = ${m.t5.tilt.toFixed(2)}° · ${f8(m.t5.bridge.residue)}`;
    document.querySelectorAll('#readouts dl.ro > div[data-row]').forEach((el) => el.classList.toggle('now', Number(el.dataset.row) === state.tier));
    const notes = {
      1: L(`弧微积分：M = ${m.t1.arc.M} 步、步幅 h<sup>α</sup> 时矢高和 α = ½ 为 ${f8(m.t1.arc.half)}（锁在 ½），α = 1 为 ${f8(m.t1.arc.one)}（趋于 0）。`, `Arc calculus: over M = ${m.t1.arc.M} steps of size h<sup>α</sup> the sagitta sum is ${f8(m.t1.arc.half)} at α = ½ (locked at ½) and ${f8(m.t1.arc.one)} at α = 1 (going to 0).`),
      2: L(`cos²θ* = ${f8(m.t2.cos2Star)}；r = artanh β = ${f4(I.bogoliubov.rapidity)}，1/cosh r = ${f4(I.bogoliubov.factor)} = √(1 − β²)。`, `cos²θ* = ${f8(m.t2.cos2Star)}; r = artanh β = ${f4(I.bogoliubov.rapidity)}, 1/cosh r = ${f4(I.bogoliubov.factor)} = √(1 − β²).`),
      3: L(`Tr T₃²：轻子 ${qstr(m.t3.ledger.sumT.lepton)} + 上夸克 ${qstr(m.t3.ledger.sumT.up)} + 下夸克 ${qstr(m.t3.ledger.sumT.down)}；Tr Q²：${qstr(m.t3.ledger.sumQ.lepton)} + ${qstr(m.t3.ledger.sumQ.up)} + ${qstr(m.t3.ledger.sumQ.down)}；K<sub>${m.t3.N}</sub> 的回路相位 ${I.anchored.c} 个。`, `Tr T₃²: leptons ${qstr(m.t3.ledger.sumT.lepton)} + up ${qstr(m.t3.ledger.sumT.up)} + down ${qstr(m.t3.ledger.sumT.down)}; Tr Q²: ${qstr(m.t3.ledger.sumQ.lepton)} + ${qstr(m.t3.ledger.sumQ.up)} + ${qstr(m.t3.ledger.sumQ.down)}; K<sub>${m.t3.N}</sub> has ${I.anchored.c} loop phases.`),
      4: L(`舒尔枢轴 {5, 7}：最小值 ${f8(I.schur.min)} = x*Sx ${f8(I.schur.xSx)}；领头项 ½ Σ p<sup>−2σ</sup> = ${f8(m.t4.lead)}；s = 2 的截断欧拉乘积离 π²/6 还差 ${f8(I.euler.gap)}。`, `Schur pivot {5, 7}: least value ${f8(I.schur.min)} = x*Sx ${f8(I.schur.xSx)}; leading term ½ Σ p<sup>−2σ</sup> = ${f8(m.t4.lead)}; the truncated Euler product at s = 2 is ${f8(I.euler.gap)} short of π²/6.`),
      5: L(`σ<sub>${m.t5.beats}</sub> = (${f8(m.t5.sigmas[m.t5.beats][0])}, 0, 0) = tan 30° e₁；跳步是测地线的 ${f4(m.t5.ratio)} 倍；dim 𝒪<sub>m</sub> = ${I.krylov.dims.join(', ')}。`, `σ<sub>${m.t5.beats}</sub> = (${f8(m.t5.sigmas[m.t5.beats][0])}, 0, 0) = tan 30° e₁; the jump costs ${f4(m.t5.ratio)} times the geodesic; dim 𝒪<sub>m</sub> = ${I.krylov.dims.join(', ')}.`)
    };
    $('roNote').innerHTML = notes[state.tier];
    $('scenePill').innerHTML = `Ω <strong>${tierName(state.tier)}</strong>`;
    $('keyPill').innerHTML = `T${state.tier} <strong>${k.value}</strong>`;
    $('hint').textContent = L('拖琥珀手柄改本阶参数 · 拖空白处转视角 · 空格播放', 'drag the amber handle for this tier · drag empty space to orbit · Space plays');
    $('formula').textContent = ['', 'G₃ = [cos²((i − j)ε/2)]', '(dτ/dt)² + η² + η² ≡ 1', 'ΔE(N) = (N − 3)(N − 4)/2', 'v_p = 1 − cos p^−σ', 'σ_{t+1} = [σ_t, σ_{t−1}, σ_t]'][state.tier];
    $('lensToggleBtn').setAttribute('aria-pressed', String(state.lens === 1));
    for (const el of document.querySelectorAll('.tier-ctl')) el.hidden = Number(el.dataset.tier) !== state.tier;
  }
  const paint = kit.painter(() => {
    const m = calc(params()),
      I = instances(m);
    hud(m);
    TRV.hudFit();
    drawStage(m);
    readings(m, I);
    drawPlot(m);
  }, [stage, $('plot')]);

  /* ---------- the rail: this tier's own parameter ---------- */
  const playBtn = $('playBtn');
  function railLabel(t) {
    const k = state.tier;
    if (k === 1) return `ε ${t.toFixed(1)}°`;
    if (k === 2) return `β ${t.toFixed(2)}`;
    if (k === 3) return `N ${3 + Math.floor(t + 1e-9)}`;
    if (k === 4) return `P ${PRIMES[Math.min(RAIL_PRIMES - 1, Math.floor(t + 1e-9))]}`;
    if (t <= state.beats) return `${L('拍', 'beat')} ${t.toFixed(2)} / ${state.beats}`;
    return `ε ${(TILT0 * (state.beats + 1 - t) / DEG).toFixed(1)}° → 0`;
  }
  const clock = kit.clock({
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: true,
    rate: RAIL[2].rate,
    step: RAIL[2].step,
    max: RAIL[2].max(),
    t: state.rail[2],
    format: (t) => railLabel(t),
    onChange: (t, c) => {
      state.rail[state.tier] = t;
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      paint();
    }
  });
  /** Point the rail at tier k: its range, speed and step, and its saved value. */
  function useRail(k, value) {
    const r = RAIL[k];
    clock.rate = r.rate;
    clock.step = r.step;
    clock.setMax(r.max(), true);
    clock.set(value == null ? state.rail[k] : value, true);
    state.rail[k] = clock.t;
  }
  playBtn.addEventListener('click', () => {
    stopBootPlay();
    clock.toggle();
  });
  for (const id of ['rew', 'rewindBtn'])
    $(id).addEventListener('click', () => {
      stopBootPlay();
      clock.pause();
      clock.set(0);
    });

  /* a page-local start for a card that plays inside a book: play once the stage is half in view, pause when it leaves,
     and let go for good as soon as the reader touches anything */
  let bootIO = null;
  function bootAutoplay() {
    if (TRV.still || !window.IntersectionObserver) return;
    let started = false;
    bootIO = new IntersectionObserver((entries) => {
      const seen = entries[entries.length - 1].intersectionRatio >= 0.5;
      if (seen && !started) {
        started = true;
        clock.play();
      } else if (!seen && clock.playing) clock.pause();
    }, { threshold: [0, 0.5, 1] });
    bootIO.observe(stage);
  }
  function stopBootPlay() {
    if (bootIO) {
      bootIO.disconnect();
      bootIO = null;
    }
  }
  $('play').addEventListener('click', stopBootPlay, true);
  $('now').addEventListener('input', stopBootPlay, true);
  document.addEventListener('keydown', (ev) => {
    if ([' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) stopBootPlay();
  }, true);

  /* ---------- transitions: the camera glides between tiers, the rail blends within a tier ---------- */
  let camTween = null,
    railTween = null;
  const wrapAngle = (a) => Math.atan2(sn(a), cs(a));
  function glide(target, ms) {
    if (camTween) camTween.cancel();
    camTween = null;
    const from = { F: view.F.slice(), sx: view.sx, sy: view.sy, yaw: sc.cam.yaw, pitch: sc.cam.pitch };
    const dyaw = wrapAngle(target.yaw - from.yaw);
    // the token exists before the tween: under reduced motion kit.tween runs step(1) and done() inside the call
    const token = { run: null, cancel: () => { if (token.run) token.run.cancel(); if (camTween === token) camTween = null; } };
    camTween = token;
    token.run = kit.tween(ms || 0, (e) => {
      view.F = mix(from.F, target.F, e);
      view.sx = lerp(from.sx, target.sx, e);
      view.sy = lerp(from.sy, target.sy, e);
      sc.cam.yaw = from.yaw + dyaw * e;
      sc.cam.pitch = lerp(from.pitch, target.pitch, e);
      if (ms) paint();
    }, () => {
      if (camTween === token) camTween = null;
      if (ms) paint();
    });
  }
  function blendRail(from, to, ms) {
    if (railTween) railTween.cancel();
    railTween = null;
    if (!ms || Math.abs(from - to) < 1e-12) {
      clock.set(to);
      return;
    }
    const token = { run: null, cancel: () => { if (token.run) token.run.cancel(); if (railTween === token) railTween = null; } };
    railTween = token;
    token.run = kit.tween(ms, (e) => clock.set(lerp(from, to, e)), () => {
      if (railTween === token) railTween = null;
      clock.set(to);
    });
  }
  const blending = () => !!(camTween || railTween);
  /** The reader takes over: the clock pauses, no card is marked, transitions stop where they are. */
  function leave() {
    stopBootPlay();
    if (railTween) railTween.cancel();
    railTween = null;
    cards.mark(null);
    clock.pause();
  }
  function setTier(k) {
    if (state.tier === k) return;
    state.rail[state.tier] = clock.t;
    state.tier = k;
    useRail(k);
  }

  /* ---------- controls ---------- */
  const rsrF = kit.field($('rsrField'), {
    fmt: (v) => v.toFixed(2),
    onInput: (v) => {
      leave();
      state.rsr = v;
      paint();
    }
  });
  const snapSigma = (v) => (Math.abs(v - 0.5) < 0.012 ? 0.5 : Math.abs(v - 1) < 0.012 ? 1 : Math.round(v * 1000) / 1000);
  const sigmaF = kit.field($('sigmaField'), {
    fmt: (v) => v.toFixed(2),
    onInput: (v) => {
      leave();
      state.sigma = snapSigma(v);
      paint();
    }
  });
  const beatsF = kit.field($('beatsField'), {
    fmt: (v) => String(v),
    onInput: (v) => {
      leave();
      state.beats = Math.round(v);
      clock.setMax(RAIL[5].max(), true);
      clock.set(Math.min(clock.t, clock.max));
      paint();
    }
  });
  function syncFields() {
    rsrF.set(state.rsr);
    sigmaF.set(state.sigma);
    beatsF.set(state.beats);
  }
  const viewChips = kit.chips($('viewChips'), 'view', (v) => {
    state.view = v === 'tower' ? 'tower' : 'focus';
    glide(state.view === 'tower' ? VIEWS.tower() : VIEWS.focus(state.tier), TRV.still ? 0 : 700);
    paint();
  });
  $('lensToggleBtn').addEventListener('click', () => {
    state.lens = state.lens ? 0 : 1;
    paint();
  });

  /* ---------- experiment cards ---------- */
  const NOTES = {
    'tier1-numbers-arc-calculus': ['ε = 60°：青色四面体的 (6V)² = det G₃ = 3/32，品红的单步矢高 v<sub>ε</sub> = 0.5。', 'ε = 60°: the cyan tetrahedron has (6V)² = det G₃ = 3/32; the magenta step sagitta is v<sub>ε</sub> = 0.5.'],
    'tier2-dottie-dual-relativity': ['r<sub>s</sub>/r = 0.36、β = 0.5：琥珀点 (√0.48, 0.40, 0.60) 在单位球面上，平方份额 0.48 + 0.16 + 0.36 = 1；青色弧与它的影一样长。', 'r<sub>s</sub>/r = 0.36, β = 0.5: the amber point (√0.48, 0.40, 0.60) sits on the unit sphere, its squared shares 0.48 + 0.16 + 0.36 = 1; the cyan arc is as long as its shadow.'],
    'tier3-afgut-weinberg-three-eighths': ['N = 6：十二根青色边撑起八面体，三根品红对角线是多出的 ΔE = 3；青色柱到银白柱的 3/8。', 'N = 6: twelve cyan edges hold the octahedron, three magenta diagonals are the extra ΔE = 3; the cyan column reaches 3/8 of the silver one.'],
    'tier4-prime-sagitta-critical-ridge': ['σ = ½，p ≤ 11：五级品红台阶高 0.6159，第一级就越过青色环（σ = 1 的全素数总和 0.2229）。', 'σ = ½, p ≤ 11: five magenta steps rise 0.6159 and pass the cyan ring (the σ = 1 total, 0.2229) at the first step.'],
    'tier5-geodesic-mind-bridge-erasure': ['四拍青色测地线各走 30°，矢高和 0.5359；品红跳步付 1.5。倾角回推到 0，参照桥消失。', 'Four cyan beats of 30° cost 0.5359 in sagitta; the magenta jump costs 1.5. The tilt rolls back to 0 and the bridge is gone.']
  };
  // a cited figure has a fixed frame: one short sentence per card, no sub- or superscripts
  const FIGURE_NOTES = {
    'tier1-numbers-arc-calculus': ['ε = 60°：青色四面体的 (6V)² = 3/32。', 'ε = 60°: the cyan tetrahedron has (6V)² = 3/32.'],
    'tier2-dottie-dual-relativity': ['平方份额 0.48 + 0.16 + 0.36 = 1：琥珀点留在球面上。', 'Squared shares 0.48 + 0.16 + 0.36 = 1: the amber point stays on the sphere.'],
    'tier3-afgut-weinberg-three-eighths': ['N = 6：三根品红对角线多出来；青色柱到 3/8。', 'N = 6: three magenta diagonals are extra; the cyan column reaches 3/8.'],
    'tier4-prime-sagitta-critical-ridge': ['σ = ½，p ≤ 11：品红台阶高 0.6159，越过青色环。', 'σ = ½, p ≤ 11: the magenta steps rise 0.6159, past the cyan ring.'],
    'tier5-geodesic-mind-bridge-erasure': ['四拍测地线 0.5359，跳步 1.5；倾角归零，桥消失。', 'Four beats cost 0.5359, the jump 1.5; at zero tilt the bridge is gone.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = presets[id];
    stopBootPlay();
    clock.pause();
    const sameTier = state.tier === p.tier,
      before = clock.t;
    if (railTween) railTween.cancel();
    railTween = null;
    if (p.rsr != null) state.rsr = p.rsr;
    if (p.sigma != null) state.sigma = p.sigma;
    if (p.beats != null) state.beats = p.beats;
    state.view = 'focus';
    viewChips.set('focus', true);
    setTier(p.tier);
    useRail(p.tier);
    syncFields();
    glide(VIEWS.focus(p.tier), booting || TRV.still ? 0 : 750);
    const max = clock.max;
    const park = p.still === 'end' ? max : p.still;
    // a card that does not play, a still and a freshly opened full page all park on the declared frame
    if (TRV.still || !p.play || (booting && !TRV.embed)) {
      if (!booting && !TRV.still && sameTier) blendRail(before, park, 600);
      else clock.set(park);
    } else clock.set(0);
    if (p.play && !TRV.still && (!booting || TRV.embed)) {
      if (booting) bootAutoplay();
      else clock.play();
    }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets,
    notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES,
    noteEl: $('presetNote'),
    tour: $('tour'),
    onPick: applyPreset,
    idle: ['自由探索：拖琥珀手柄或拉本阶的参数，换视角或透镜；时间轴推本阶自己的量。随时可以再选一张卡。', 'Free play: drag the amber handle or pull this tier\'s control, switch the view or the lens; the rail drives this tier\'s own quantity. Pick a card again at any time.']
  });
  // the tour bar's card title carries the id #tourStep
  const tourBody = $('tourBody');
  const markStep = () => {
    const b = tourBody.querySelector('b');
    if (b && b.id !== 'tourStep') b.id = 'tourStep';
  };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });

  /* ---------- the amber handle: drag, or the arrow keys ---------- */
  const toViewport = (local) => {
    const q = sc.p(W(state.tier, local)),
      r = $('cv').getBoundingClientRect();
    return { x: r.left + q[0], y: r.top + q[1] };
  };
  /** Where the handle would sit for a value of this tier's parameter (viewport coordinates, for drag targets). */
  function dragTarget(value) {
    if (state.tier === 1) return toViewport(t1Tip(value));
    if (state.tier === 2) return toViewport(t2Local(t2Point(value[0], value[1])));
    if (state.tier === 4) return toViewport(rulerAt(value));
    return null;
  }
  function nearest(x, y) {
    const k = state.tier;
    const d = (local) => {
      const p = toViewport(local);
      return hypot(p.x - x, p.y - y);
    };
    if (k === 1) {
      let best = state.rail[1],
        gap = Infinity;
      for (let e = 0.5; e <= 179.5; e += 0.25) {
        const g = d(t1Tip(e)) + Math.abs(e - state.rail[1]) * 1e-7;
        if (g < gap) [gap, best] = [g, e];
      }
      return { rail: best };
    }
    if (k === 2) {
      let best = [state.rail[2], state.rsr],
        gap = Infinity;
      for (let i = 0; i <= 99; i++)
        for (let j = 0; j <= 95; j++) {
          const b = i / 100,
            r = j / 100,
            g = d(t2Local(t2Point(b, r)));
          if (g < gap) [gap, best] = [g, [b, r]];
        }
      return { rail: best[0], rsr: best[1] };
    }
    if (k === 4) {
      let best = state.sigma,
        gap = Infinity;
      for (let s = SIG_LO; s <= SIG_HI + 1e-9; s += 0.005) {
        const g = d(rulerAt(s));
        if (g < gap) [gap, best] = [g, s];
      }
      return { sigma: snapSigma(best) };
    }
    return {};
  }
  function applyNearest(n) {
    if (n.rsr != null) {
      state.rsr = n.rsr;
      rsrF.set(n.rsr);
    }
    if (n.sigma != null) {
      state.sigma = n.sigma;
      sigmaF.set(n.sigma);
    }
    if (n.rail != null) clock.set(n.rail);
    else paint();
  }
  let dragging = null;
  handle.onpointerdown = (ev) => {
    if (ev.button !== 0 || TRV.still) return;
    ev.preventDefault();
    leave();
    dragging = ev.pointerId;
    handle.setPointerCapture(dragging);
    handle.classList.add('dragging');
  };
  handle.onpointermove = (ev) => {
    if (ev.pointerId !== dragging) return;
    applyNearest(nearest(ev.clientX, ev.clientY));
  };
  const release = (ev) => {
    if (ev && handle.hasPointerCapture && handle.hasPointerCapture(ev.pointerId)) handle.releasePointerCapture(ev.pointerId);
    dragging = null;
    handle.classList.remove('dragging');
  };
  handle.onpointerup = release;
  handle.onpointercancel = release;
  handle.onlostpointercapture = () => {
    dragging = null;
    handle.classList.remove('dragging');
  };
  handle.onkeydown = (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(ev.key)) return;
    ev.stopPropagation();
    ev.preventDefault();
    leave();
    const sgn = ev.key === 'ArrowLeft' || ev.key === 'ArrowDown' ? -1 : 1;
    const k = state.tier;
    if (k === 1) clock.set(ev.key === 'Home' ? 0 : ev.key === 'End' ? 180 : clamp(state.rail[1] + sgn * 0.5, 0, 180));
    else if (k === 2) {
      if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') applyNearest({ rsr: Math.round(clamp(state.rsr + sgn * 0.01, 0, 0.95) * 100) / 100 });
      else clock.set(ev.key === 'Home' ? 0 : ev.key === 'End' ? 0.99 : clamp(Math.round((state.rail[2] + sgn * 0.01) * 100) / 100, 0, 0.99));
    } else if (k === 4) applyNearest({ sigma: ev.key === 'Home' ? SIG_LO : ev.key === 'End' ? SIG_HI : snapSigma(clamp(state.sigma + sgn * 0.01, SIG_LO, SIG_HI)) });
  };
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));
  TRV.onLang(paint);

  /* ---------- probe, cover, start ---------- */
  const json = (x) => JSON.parse(JSON.stringify(x));
  window.OMEGA_CASCADE_DEBUG = Object.freeze({
    get state() {
      const m = calc(params());
      return json({
        tier: state.tier,
        view: state.view,
        lens: state.lens,
        rsr: state.rsr,
        sigma: state.sigma,
        beats: state.beats,
        rail: state.rail,
        ...m,
        t: clock.t,
        max: clock.max,
        playing: clock.playing,
        preset: cards.current,
        blending: blending(),
        camera: { ...sc.cam },
        focus: view.F,
        handle: handle.hidden ? null : handleLocal,
        leanInstances: instances(m)
      });
    },
    /** The page's own computation for a parameter set { eps, beta, rsr, n3, k4, sigma, beats, t5 }. */
    calc: (s) => json(calc({ ...params(), ...s })),
    presets,
    dragTarget
  });
  window.TRV_THUMB = () => {
    cards.pick(ids[4]);
    clock.pause();
    state.view = 'tower';
    viewChips.set('tower', true);
    glide(VIEWS.tower(), 0);
    paint.now();
  };
  useRail(state.tier);
  cards.pick(cards.initial(ids[1]));
  booting = false;
  paint.now();
})();
