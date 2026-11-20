/* OMEGA//RELATIONS · 二元·关系·未来 · Dyad, relation, future (Chapter 39, §39.5)
   World (kit.solid): z up. The ternion 𝕋₃ ≅ S³(1) of unit quaternions [w, x, y, z] is drawn in the chordal azimuthal
   chart around the present state x_t: when x_t⁻¹ q = cos θ + sin θ n (n a unit pure quaternion, read as the world vector
   (x, y, z)), q is drawn at 2 sin(θ/2) n. The distance d to the centre reads κ(x_t, q) = 1 − d²/4, great circles through
   x_t are diameters, and the whole sphere of radius 2 stands for the antipode −x_t.
   The page computes in the frame x_t = 1 (every number is invariant under the base-point changes q ↦ g_L q g_R of SO(4),
   checked on 16 pairs). The two relations at x_t: ω₁ = θ₁ e₁ along world x, ω_ctx = θ_ctx (cos ψ e₁ + sin ψ e₂) with
   e₂ = world z, and e₃ = e₁ × e₂ = −world y.
     beat 1   R₁ = exp ω₁ carries x_{t−1} = exp(−ω₁) to x_t = 1;
     beat 2   the free step x_{t+1}^free = [x_t, x_{t−1}, x_t] = x_t x_{t−1}⁻¹ x_t (a point reflection through the centre),
              refracted by the Lie triple Ω₂ = {ω₁, ω_ctx, ω₁} = [[ω₁, ω_ctx], ω₁] ([a, b] = a × b):
              x_{t+1} = x_{t+1}^free ⋆_{x_t} exp_{x_t}(Ω₂), x ⋆_{x_t} y = x x_t⁻¹ y, exp_{x_t}(Ω) = x_t exp Ω.
   The rail is θ₁ ∈ [0, 2π/3]. Five scenes share the ball:
     dyad     E₁, E₂ (cyan), E₃ = [E₁, E₂] (magenta), their violet volume and the triangle of directions;
     zeno     beat 1 from the frozen point θ₁ = 0, and the open chain as a tree;
     free     the free heap step on the κ = 0.75 sphere, with the next free step;
     curve    the magenta order sheet swept by exp(sω₁) exp(uω_ctx) and exp(uω_ctx) exp(sω₁) (an illustration of
              rotor-order noncommutativity, not an evaluated field F; within 5° of the antipode only its outline is
              drawn), the refraction arc and the closed triangle;
     bianchi  the tetrahedron Λ³ on the sphere of directions and the Jacobi triangle on a workbench.
   Every number is computed here; the instances of the cited Lean theorems are in instances().
   Read-only probe: window.DYAD_RELATION_DEBUG. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI,
    TAU = 2 * PI,
    deg = PI / 180,
    SQ2 = Math.SQRT2;
  const TH_MAX = (2 * PI) / 3;
  const cs = Math.cos,
    sn = Math.sin,
    hypot = Math.hypot;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, u) => a + (b - a) * u;
  const add = (a, b) => a.map((x, i) => x + b[i]);
  const sub = (a, b) => a.map((x, i) => x - b[i]);
  const scale = (a, k) => a.map((x) => x * k);
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const norm = (a) => Math.sqrt(dot(a, a));
  const unit = (a) => {
    const n = norm(a);
    return n > 0 ? scale(a, 1 / n) : a.slice();
  };
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  const fmt = (x, d = 4) => (!Number.isFinite(x) ? '∞' : kit.fix(x, d));
  const signed = (x, d = 4) => kit.sgn(x, d);

  /* ---------- quaternions [w, x, y, z]; the vector part is a world vector ---------- */
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
  ];
  const qinv = (a) => scale([a[0], -a[1], -a[2], -a[3]], 1 / dot(a, a));
  const pure = (v) => [0, v[0], v[1], v[2]];
  const vec = (q) => [q[1], q[2], q[3]];
  const ONE = [1, 0, 0, 0];
  /** exp of a pure quaternion v: cos‖v‖ + sin‖v‖ v/‖v‖. */
  function qexp(v) {
    const t = norm(v);
    if (t < 1e-15) return [1, v[0], v[1], v[2]];
    const s = sn(t) / t;
    return [cs(t), v[0] * s, v[1] * s, v[2] * s];
  }
  /** The ternary transfer of the unit-quaternion model: tri x y z = x y⁻¹ z. */
  const tri = (x, y, z) => qmul(qmul(x, qinv(y)), z);
  /** The reading κ(x, y) = (1 + ⟨x, y⟩)/2. */
  const kappa = (x, y) => (1 + dot(x, y)) / 2;
  /** Where q is drawn: x_t = 1 at the centre, 2 sin(θ/2) n for q = cos θ + sin θ n. The antipode −x_t is the whole
      boundary sphere; it is drawn at 2·hint (by default on the diameter of ω₁). */
  function chart(q, hint = [1, 0, 0]) {
    const v = vec(q),
      s = norm(v);
    if (s < 1e-13) return q[0] > 0 ? [0, 0, 0] : scale(hint, 2);
    const th = Math.atan2(s, q[0]);
    return scale(v, (2 * sn(th / 2)) / s);
  }
  /** The unit direction of the vector part of q, or null where the vector part vanishes (q = ±1). */
  const udir = (q) => {
    const v = vec(q),
      s = norm(v);
    return s >= 1e-12 ? scale(v, 1 / s) : null;
  };
  /** The chart without a fallback: null at the antipode −x_t (the whole boundary sphere), the centre at x_t. */
  const chartPure = (q) => (norm(vec(q)) < 1e-12 ? (q[0] < 0 ? null : [0, 0, 0]) : chart(q));
  const unit4 = (q) => scale(q, 1 / norm(q));
  /** A sampled curve of S³ as drawn polylines. Every caller samples a great circle, so the normalized midpoint of two
      neighbouring samples lies on the curve: a drawn segment longer than 0.35 is halved (at most 10 times), and a curve
      that passes close to the antipode stays one run that swings round near the boundary sphere. A run is cut only where
      the curve reaches the antipode itself: at a sample equal to −x_t, or between two samples whose vector parts point
      in opposite directions on the far side; there the run ends on the boundary sphere in the direction it was going and
      the next run starts on the boundary sphere in the direction it comes from. */
  function chartRuns(qs) {
    const runs = [];
    let cur = [];
    const close = () => {
      if (cur.length > 1) runs.push(cur);
      cur = [];
    };
    const segment = (qa, qb, pa, pb, depth) => {
      if (!pa && !pb) return;
      const ua = udir(qa),
        ub = udir(qb);
      if (!pa) {
        close();
        cur = ub ? [scale(ub, 2), pb] : [pb];
        return;
      }
      if (!pb) {
        if (ua) cur.push(scale(ua, 2));
        close();
        return;
      }
      if (qa[0] < 0 && qb[0] < 0 && ua && ub && dot(ua, ub) < -1 + 1e-9) {
        cur.push(scale(ua, 2));
        close();
        cur = [scale(ub, 2), pb];
        return;
      }
      const mid = add(qa, qb);
      if (norm(sub(pb, pa)) > 0.35 && depth < 10 && norm(mid) > 1e-12) {
        const qm = unit4(mid),
          pm = chartPure(qm);
        segment(qa, qm, pa, pm, depth + 1);
        segment(qm, qb, pm, pb, depth + 1);
        return;
      }
      cur.push(pb);
    };
    const ps = qs.map(chartPure);
    if (ps.length && ps[0]) cur = [ps[0]];
    for (let i = 1; i < qs.length; i++) segment(qs[i - 1], qs[i], ps[i - 1], ps[i], 0);
    close();
    return runs;
  }

  /* ---------- the relation frame at x_t ---------- */
  const E1 = [1, 0, 0],
    EZ = [0, 0, 1],
    E3HAT = cross(E1, EZ);
  const dirE2 = (psi) => [cs(psi), 0, sn(psi)];
  /** The Lie triple {a, b, c} = [[a, b], c] with [a, b] = a × b. */
  const triple = (a, b, c) => cross(cross(a, b), c);
  /** One second-order beat: from θ₁ (rad), θ_ctx (rad) and ψ (rad), the five states and their readings. */
  function beatOf(th1, thc, psi) {
    const om1 = scale(E1, th1),
      omc = scale(dirE2(psi), thc);
    const omega2 = triple(om1, omc, om1);
    const xNow = ONE,
      xPrev = qexp(scale(om1, -1));
    const xFree = tri(xNow, xPrev, xNow);
    const xNext = tri(xFree, xNow, qmul(xNow, qexp(omega2)));
    return { om1, omc, omega2, xPrev, xNow, xFree, xNext };
  }
  /** Signed phase of the shortest-gate triangle a → b → c, −atan2(D, S), in degrees. */
  const triPhase = (a, b, c) => (-Math.atan2(dot(a, cross(b, c)), 1 + dot(a, b) + dot(b, c) + dot(c, a)) * 180) / PI;
  /** A deterministic stream of unit quaternions. */
  function units4(seed, n) {
    let s = seed;
    const rand = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648) * 2 - 1;
    return Array.from({ length: n }, () => unit([rand(), rand(), rand(), rand()]));
  }
  const SHIFTS = (() => {
    const a = units4(20261120, 32);
    return Array.from({ length: 16 }, (_, k) => [a[2 * k], a[2 * k + 1]]);
  })();
  const BASES = units4(39528, 16);

  /** Everything the page shows that depends on θ₁, θ_ctx and ψ. */
  function compute(th1, thc, psi) {
    const b = beatOf(th1, thc, psi);
    const phi = norm(b.omega2);
    // the dyad and its relation, as unit pure quaternions
    const e1 = E1,
      e2 = dirE2(psi);
    const comm = scale(sub(qmul(pure(e1), pure(e2)), qmul(pure(e2), pure(e1))), 0.5);
    const e3 = vec(comm);
    const lagrangeLeft = dot(e1, e1) * dot(e2, e2) - dot(e1, e2) ** 2;
    let lagrangeRight = 0;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) lagrangeRight += (e1[i] * e2[j] - e1[j] * e2[i]) ** 2;
    lagrangeRight /= 2;
    // the polar form of x_t⁻¹ x_{t+1} (exists_eq_cos_arccos_add_sin_smul): n = vec/‖vec‖, a unit pure quaternion; where
    // the vector part vanishes (θ = 0 at θ₁ = 0, or θ = π) the witness is i, as in the Lean proof, so ‖n‖ = 1 everywhere
    const rel = qmul(qinv(b.xNow), b.xNext),
      polarTh = Math.acos(clamp(rel[0], -1, 1)),
      relVec = norm(vec(rel)),
      polarN = sn(polarTh) > 1e-12 && relVec > 0 ? scale(vec(rel), 1 / relVec) : [1, 0, 0];
    // the triangle of directions E₁, E₂, Ê₃ (shortest_gate_triangle_holonomy)
    const hS = 1 + dot(e1, e2) + dot(e2, E3HAT) + dot(E3HAT, e1),
      hD = dot(e1, cross(e2, E3HAT));
    // the order sheet exp(sω₁) exp(uω_ctx) is filled only where it stays clear of the antipode: a patch that comes within
    // 5° of −x_t would be torn across the ball by the chart, so only its outline is drawn. At ψ = 0° the two relations are
    // collinear and there is no sheet (rank 1). One predicate for the surface, the stage label and the HUD.
    // The real part of exp(sω₁) exp(uω_ctx) is w(α, β) = cos α cos β − cos ψ sin α sin β with α = sθ₁, β = uθ_ctx. For
    // sin ψ ≠ 0 its only critical point in (0, π)² is the saddle (π/2, π/2) (Hessian determinant −sin²ψ < 0), so the
    // continuous minimum over [0, θ₁] × [0, θ_ctx] lies on the four edges. On an edge, A cos t + B sin t has its least value
    // −√(A² + B²) at t = atan2(−B, −A) (mod 2π) when that point is on the edge, and at an end of the edge otherwise
    let sheetFilled = false;
    if (th1 > 1e-6 && thc > 1e-6 && Math.abs(sn(psi)) > 1e-6) {
      const c = cs(psi),
        edgeMin = (a, L) => {
          const A = cs(a),
            B = -c * sn(a),
            tMin = (Math.atan2(-B, -A) + 2 * Math.PI) % (2 * Math.PI);
          return tMin <= L ? -Math.hypot(A, B) : Math.min(A, A * cs(L) + B * sn(L));
        };
      let lowest = Math.min(cs(th1), cs(thc), edgeMin(th1, thc), edgeMin(thc, th1));
      if (th1 >= Math.PI / 2 && thc >= Math.PI / 2) lowest = Math.min(lowest, -c);
      sheetFilled = lowest > cs(175 * deg);
    }
    return {
      th1,
      thc,
      psi,
      sheetFilled,
      th1Deg: th1 / deg,
      thcDeg: thc / deg,
      psiDeg: psi / deg,
      ...b,
      phi,
      phiDeg: phi / deg,
      kPrevNow: kappa(b.xPrev, b.xNow),
      kNowFree: kappa(b.xNow, b.xFree),
      kPrevFree: kappa(b.xPrev, b.xFree),
      kFreeNext: kappa(b.xFree, b.xNext),
      kNowNext: kappa(b.xNow, b.xNext),
      normNext2: dot(b.xNext, b.xNext),
      bend: Math.acos(clamp(dot(b.xFree, b.xNext), -1, 1)) / deg,
      dyad: {
        e1,
        e2,
        e3,
        scalar: comm[0],
        norm2: dot(e3, e3),
        dot31: dot(e3, e1),
        dot32: dot(e3, e2),
        crossGap: norm(sub(e3, cross(e1, e2))),
        lagrangeLeft,
        lagrangeRight,
        b23: cross(e2, e3),
        b31: cross(e3, e1),
        volume: Math.abs(dot(e1, cross(e2, e3)))
      },
      polar: { theta: polarTh / deg, n: polarN, nNorm: norm(polarN), nRe: 0, gap: norm(sub([cs(polarTh), ...scale(polarN, sn(polarTh))], rel)) },
      holo: { S: hS, D: hD, phase: triPhase(e1, e2, E3HAT) }
    };
  }

  /* ---------- 2 × 2 complex matrices for the holonomy and the balanced sum: entries [re, im] ---------- */
  const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mmul = (A, B) => [0, 1].map((i) => [0, 1].map((j) => cadd(cm(A[i][0], B[0][j]), cm(A[i][1], B[1][j]))));
  const madd = (A, B) => A.map((r, i) => r.map((z, j) => cadd(z, B[i][j])));
  const msc = (A, k) => A.map((r) => r.map((z) => [z[0] * k, z[1] * k]));
  const mcsc = (A, k) => A.map((r) => r.map((z) => cm(z, k)));
  const dag = (A) => [0, 1].map((i) => [0, 1].map((j) => [A[j][i][0], -A[j][i][1]]));
  const mgap = (A, B) => Math.max(...A.flatMap((r, i) => r.map((z, j) => hypot(z[0] - B[i][j][0], z[1] - B[i][j][1]))));
  const ID2 = [
    [
      [1, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [1, 0]
    ]
  ];
  /** σ·a = a₀σx + a₁σy + a₂σz. */
  const sigmaOf = (a) => [
    [
      [a[2], 0],
      [a[0], -a[1]]
    ],
    [
      [a[0], a[1]],
      [-a[2], 0]
    ]
  ];
  /** The unit quaternion w + xi + yj + zk as w·1 − i(xσx + yσy + zσz). */
  const su2 = (q) => [
    [
      [q[0], -q[3]],
      [-q[2], -q[1]]
    ],
    [
      [q[2], -q[1]],
      [q[0], q[3]]
    ]
  ];
  const rotorOf = (a, b) => msc(madd(ID2, mmul(sigmaOf(b), sigmaOf(a))), 1 / Math.sqrt(2 * (1 + dot(a, b))));
  const mvec = (A, v) => [0, 1].map((i) => cadd(cm(A[i][0], v[0]), cm(A[i][1], v[1])));
  /** The normalized projection of ψ onto the Bloch direction b. */
  function shortestGate(b, psi) {
    const Pb = msc(madd(ID2, sigmaOf(b)), 0.5),
      w = mvec(Pb, psi);
    const amp = psi[0][0] * w[0][0] + psi[0][1] * w[0][1] + psi[1][0] * w[1][0] + psi[1][1] * w[1][1];
    const k = 1 / Math.sqrt(amp);
    return w.map((z) => [z[0] * k, z[1] * k]);
  }
  /** The +1 eigenvector of σ·a. */
  function eigenUp(a) {
    const th = Math.acos(clamp(a[2], -1, 1)),
      ph = Math.atan2(a[1], a[0]);
    return [
      [cs(th / 2), 0],
      [cs(ph) * sn(th / 2), sn(ph) * sn(th / 2)]
    ];
  }

  /* ---------- the instances of the cited Lean theorems, computed here ---------- */
  function instances(m) {
    const { xPrev, xNow, xFree, xNext } = m;
    // SO(4) base-point changes q ↦ g_L q g_R; the context relation is a vector at x_t and turns with g_R
    let so4 = 0;
    for (const [gL, gR] of SHIFTS) {
      const move = (q) => qmul(qmul(gL, q), gR);
      const P1 = move(xPrev),
        N1 = move(xNow);
      const om1 = vec(qmul(qinv(P1), N1)),
        th = Math.atan2(norm(om1), qmul(qinv(P1), N1)[0]);
      const w1 = norm(om1) > 1e-15 ? scale(om1, th / norm(om1)) : [0, 0, 0];
      const wc = vec(qmul(qmul(qinv(gR), pure(m.omc)), gR));
      const F1 = tri(N1, P1, N1),
        X1 = tri(F1, N1, qmul(N1, qexp(triple(w1, wc, w1))));
      so4 = Math.max(
        so4,
        norm(sub(X1, move(xNext))),
        norm(sub(F1, move(xFree))),
        Math.abs(kappa(P1, N1) - m.kPrevNow),
        Math.abs(kappa(N1, F1) - m.kNowFree),
        Math.abs(kappa(P1, F1) - m.kPrevFree),
        Math.abs(kappa(F1, X1) - m.kFreeNext),
        Math.abs(kappa(N1, X1) - m.kNowNext)
      );
    }
    // tri_eq_mul_inv_mul: in the group at o, x ⋆ₒ y = x o⁻¹ y and the inverse is o x⁻¹ o
    let triBase = 0;
    for (const o of BASES) {
      const star = (x, y) => qmul(qmul(x, qinv(o)), y),
        inv = (x) => qmul(qmul(o, qinv(x)), o);
      triBase = Math.max(triBase, norm(sub(star(star(xNow, inv(xPrev)), xNow), tri(xNow, xPrev, xNow))));
    }
    // reflectionSeq_eq_pow and kappa_reflectionSeq_add with a = x_{t−1}, b = x_t
    const seq = [xPrev, xNow];
    while (seq.length < 7) seq.push(tri(seq[seq.length - 1], seq[seq.length - 2], seq[seq.length - 1]));
    const pow = [xPrev];
    for (let n = 1; n < 7; n++) pow.push(qmul(qmul(pow[n - 1], qinv(xPrev)), xNow));
    const powGap = Math.max(...seq.map((x, n) => norm(sub(x, pow[n]))));
    let kAdd = 0;
    for (let a = 0; a <= 3; a++) for (let n = 0; n <= 3; n++) kAdd = Math.max(kAdd, Math.abs(kappa(seq[a], seq[a + n]) - kappa(seq[0], seq[n])));
    // policy_change_implies_memory_change: the next step [x_t, m, x_t] for the memories x_t and x_{t−1}
    const policy = (mem) => tri(xNow, mem, xNow);
    const policyInst = { frozen: norm(sub(policy(xNow), xNow)), actionChange: norm(sub(policy(xPrev), policy(xNow))), memoryChange: norm(sub(xPrev, xNow)) };
    // selected_tree_transport on the open chain x_{t−1} — x_t — x_{t+1}^free, root x_t, edge phases e^{iθ₁}
    const u = [cs(m.th1), sn(m.th1)],
      root = { now: [1, 0], free: u, prev: [u[0], -u[1]] };
    const cinv = (z) => [z[0], -z[1]];
    const gauged = [cm(cm(cinv(root.now), u), root.prev), cm(cm(cinv(root.free), u), root.now)];
    const tree = { edges: 2, vertices: 3, rootPhase: root.now, gap: Math.max(...gauged.map((z) => hypot(z[0] - 1, z[1]))), phases: root };
    // anchored_phase_classification: c = m + 1 − n
    const loops = { chain: 2 + 1 - 3, triangle: 3 + 1 - 3, tetra: 6 + 1 - 4 };
    // shortest_gate_triangle_holonomy on E₁, E₂, Ê₃
    const a = m.dyad.e1,
      bb = m.dyad.e2,
      c = E3HAT;
    const S = 1 + dot(a, bb) + dot(bb, c) + dot(c, a),
      D = dot(a, cross(bb, c)),
      R = Math.sqrt(S * S + D * D);
    const loopRotor = mmul(mmul(rotorOf(c, a), rotorOf(bb, c)), rotorOf(a, bb));
    const want = msc(madd(msc(ID2, S), mcsc(sigmaOf(a), [0, -D])), 1 / R);
    const up = eigenUp(a),
      back = shortestGate(a, shortestGate(c, shortestGate(bb, up))),
      ph = [S / R, -D / R],
      wantState = up.map((z) => cm(ph, z));
    const holonomy = {
      S,
      D,
      sum: S * S + D * D,
      product: 2 * (1 + dot(a, bb)) * (1 + dot(bb, c)) * (1 + dot(c, a)),
      rotorGap: mgap(loopRotor, want),
      stateGap: Math.max(...back.map((z, i) => hypot(z[0] - wantState[i][0], z[1] - wantState[i][1]))),
      phase: (-Math.atan2(D, S) * 180) / PI
    };
    // crossProduct_is_skewAdjoint_of_balanced_sum: A = 1/√2, B = Ê₃/√2, S = A + B
    const A = msc(ID2, 1 / SQ2),
      B = msc(su2(pure(E3HAT)), 1 / SQ2),
      Ssum = madd(A, B),
      AB = mmul(A, dag(B));
    const balanced = {
      unitary: mgap(mmul(Ssum, dag(Ssum)), ID2),
      halfA: mgap(mmul(A, dag(A)), msc(ID2, 0.5)),
      halfB: mgap(mmul(B, dag(B)), msc(ID2, 0.5)),
      skew: mgap(madd(dag(AB), AB), msc(ID2, 0))
    };
    // tetra_defects_incidence_repair_and_exactness on n₀, E₁, E₂, Ê₃ with F = the triangle phase
    const n0 = unit(add(add(a, bb), c)),
      V = [n0, a, bb, c],
      idx = [0, 1, 2, 3];
    const F = idx.map((i) => idx.map((j) => idx.map((k) => triPhase(V[i], V[j], V[k]))));
    const tol = 1e-9;
    let defects = 0,
      edgeErrors = 0,
      worst = 0,
      quadruples = 0;
    const faceErrors = [0, 0, 0, 0];
    for (const r of idx)
      for (const i of idx)
        for (const j of idx)
          for (const k of idx) {
            const cob = F[i][j][k] - F[r][j][k] + F[r][i][k] - F[r][i][j];
            quadruples++;
            worst = Math.max(worst, Math.abs(cob));
            if (Math.abs(cob) > tol) defects++;
            if (Math.abs(F[i][j][k] - (F[r][j][k] - F[r][i][k] + F[r][i][j])) > tol) faceErrors[r]++;
          }
    const edge = (j, k) => F[0][j][k];
    for (const i of idx) for (const j of idx) for (const k of idx) if (Math.abs(F[i][j][k] - (edge(j, k) - edge(i, k) + edge(i, j))) > tol) edgeErrors++;
    const tetra = {
      F123: F[1][2][3],
      F023: F[0][2][3],
      F013: F[0][1][3],
      F012: F[0][1][2],
      alternating: F[1][2][3] - F[0][2][3] + F[0][1][3] - F[0][1][2],
      defects,
      faceErrors,
      edgeErrors,
      worst,
      quadruples,
      triplesPerAnchor: quadruples / idx.length
    };
    // the Jacobi identity for a = ω₁, b = ω_ctx, c = (π/2) n₀
    const ja = m.om1,
      jb = m.omc,
      jc = scale(n0, PI / 2);
    const terms = [triple(ja, jb, jc), triple(jb, jc, ja), triple(jc, ja, jb)];
    const jacobi = { a: ja, b: jb, c: jc, terms, sum: norm(terms.reduce(add, [0, 0, 0])), lengths: terms.map(norm) };
    return {
      so4: { pairs: SHIFTS.length, drift: so4 },
      triBase: { bases: BASES.length, drift: triBase },
      reflection: { steps: seq.length, powGap, kAdd, kappas: seq.slice(0, 4).map((x, n) => kappa(seq[0], x)) },
      policy: policyInst,
      tree,
      loops,
      holonomy,
      balanced,
      tetra,
      jacobi,
      lagrange: { left: m.dyad.lagrangeLeft, right: m.dyad.lagrangeRight },
      polar: m.polar,
      dyad: { scalar: m.dyad.scalar, crossGap: m.dyad.crossGap, dot31: m.dyad.dot31, dot32: m.dyad.dot32 },
      model: { tri: 'x y⁻¹ z', kappa: '(1 + ⟨x, y⟩)/2', unitNow: norm(sub(xNow, ONE)) }
    };
  }

  /* ---------- the strip plots: along θ₁, and the energy floor ---------- */
  const kNextAt = (th1, thc, psi) => {
    const phi = th1 * th1 * thc * sn(psi);
    return (1 + cs(th1) * cs(phi)) / 2;
  };

  /* ---------- scenes and their layers; a card change blends the layers and the two angles ---------- */
  const SCENES = {
    dyad: { triad: 1, holo: 0, geo: 0.3, shell: 0, zeno: 0, heap: 0, plaq: 0, refr: 0, tetra: 0, jac: 0 },
    zeno: { triad: 0, holo: 0, geo: 1, shell: 0, zeno: 1, heap: 0, plaq: 0, refr: 0, tetra: 0, jac: 0 },
    free: { triad: 0, holo: 0, geo: 1, shell: 1, zeno: 0, heap: 1, plaq: 0, refr: 0, tetra: 0, jac: 0 },
    curve: { triad: 0, holo: 1, geo: 1, shell: 0, zeno: 0, heap: 0, plaq: 1, refr: 1, tetra: 0, jac: 0 },
    bianchi: { triad: 0, holo: 0, geo: 0.3, shell: 0, zeno: 0, heap: 0, plaq: 0, refr: 0, tetra: 1, jac: 1 }
  };
  const state = { scene: 'curve', thc: 45 * deg, psi: 90 * deg, cam: 'panorama', lens: 0, from: null, blend: 1 };
  function layers() {
    const to = SCENES[state.scene];
    if (!state.from || state.blend >= 1) return { ...to };
    const out = {};
    for (const k of Object.keys(to)) out[k] = lerp(state.from[k], to[k], state.blend);
    return out;
  }
  const cams = { panorama: [-0.6, -0.25, 1], face: [-0.1, -0.05, 1], top: [-0.8, 0.4, 1] };
  const presets = Object.fromEntries(
    [
      ['dyad-orthogonal-relation-span', 'dyad', 45, 60, 'top'],
      ['first-order-zeno-vs-transport', 'zeno', 45, 90, 'face'],
      ['second-order-free-heap-geodesic', 'free', 0, 90, 'face'],
      ['curvature-lie-triple-refraction', 'curve', 45, 90, 'panorama'],
      ['bianchi-jacobi-second-order-cap', 'bianchi', 45, 90, 'panorama']
    ].map(([id, scene, thcDeg, psiDeg, cam]) => [id, { scene, thcDeg, psiDeg, cam, play: true, still: PI / 3 }])
  );
  const DEFAULT = 'curvature-lie-triple-refraction';

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    handle = $('relHandle');
  const opts = { canvas: $('cv'), yaw: cams.panorama[0], pitch: cams.panorama[1], radius: 0.2, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const BALL = 2,
    LD = 0.92,
    LT = 1.3;
  const basis = (yaw, pitch) => {
    const cy = cs(yaw),
      sy = sn(yaw),
      cp = cs(pitch),
      sp = sn(pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  /** Fit the ball into the stage between the title and the legend. */
  function fit() {
    const W = stage.clientWidth,
      H = stage.clientHeight;
    if (!W || !H) return;
    const box = stage.getBoundingClientRect();
    const tl = $('hudTl'),
      bl = $('legend');
    const shown = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
    const top = shown(tl) ? Math.max(12, tl.getBoundingClientRect().bottom - box.top + 6) : 12;
    const bottom = shown(bl) ? Math.max(12, box.bottom - bl.getBoundingClientRect().top + 6) : 12;
    const room = Math.max(40, H - top - bottom),
      side = 14,
      R = BALL * 1.03;
    const u = Math.max(8, Math.min((W - 2 * side) / (2 * R), room / (2 * R)));
    opts.radius = u / Math.min(W, H);
    opts.cx = 0.5;
    opts.cy = (top + room / 2) / H;
  }
  /** The far hemisphere of the ball about the view direction: the inner wall the glass shows. It is shaded by a tilted
      linear coordinate n·p, so the shading moves when the camera turns. */
  const TILT = unit([0.5, -0.32, 0.8]);
  function backWall(D) {
    const e1 = unit(cross(D, Math.abs(D[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])),
      e2 = cross(D, e1);
    const at = (u, v) => {
      const th = (PI / 2) * u,
        ph = TAU * v;
      return scale(add(scale(D, -cs(th)), add(scale(e1, sn(th) * cs(ph)), scale(e2, sn(th) * sn(ph)))), BALL * 0.985);
    };
    // the ramp runs from the stage colour to violet; only its darker part is used, so the marks inside stay legible
    sc.surface('wall', at, { u: [0, 1], v: [0, 1], nu: 18, nv: 64, colors: [P.stage, P.violet], range: [-1.25, 2.75], value: (u, v) => dot(TILT, at(u, v)) / BALL, grid: { every: [3, 8], alpha: 0.16 } });
  }
  const tube = (key, pts, color, r, extra = {}) => sc.tube(key, pts, { color, r, glow: 0.3, occlude: false, ...extra });
  /** A geodesic arc on the sphere of directions of radius LD, from direction a to direction b. */
  function dirArc(a, b, n = 24) {
    const om = Math.acos(clamp(dot(a, b), -1, 1));
    if (om < 1e-9) return [scale(a, LD), scale(b, LD)];
    return sample(n, (t) => scale(add(scale(a, sn((1 - t) * om) / sn(om)), scale(b, sn(t * om) / sn(om))), LD * 1.004));
  }

  function drawBall(m, w, D) {
    backWall(D);
    sc.glass('ballGlass', [0, 0, 0], BALL, { color: P.violet, alpha: 0.05, rim: 0.3 });
    sc.circle([0, 0, 0], D, BALL, { fade: false, color: P.violet, width: 1.4, alpha: 0.5 });
    // the great circle through x_t along ω₁: a diameter; both ends are the antipode −x_t
    sc.line([scale(E1, -BALL), scale(E1, BALL)], { color: P.cyan, width: 1, dash: [4, 5], alpha: 0.22 + 0.3 * w.geo });
    sc.bead(scale(E1, BALL * 1.005), { color: P.sigma, r: 3.6, key: 'antiA' });
    sc.bead(scale(E1, -BALL * 1.005), { color: P.sigma, r: 3.6, key: 'antiB' });
  }
  function drawBeat(m, w, D) {
    const pPrev = chart(m.xPrev),
      pFree = chart(m.xFree);
    const a = 0.25 + 0.75 * w.geo;
    if (m.th1 > 1e-6) {
      tube('beat1', [pPrev, [0, 0, 0]], P.cyan, 0.022, { alpha: a });
      if (w.refr < 0.99 || w.heap > 0.01) tube('beat2', [[0, 0, 0], pFree], P.cyan, 0.022, { alpha: a * (1 - 0.45 * w.refr) });
    }
    sc.bead(pPrev, { color: P.sigma, r: 6, key: 'past' });
    sc.bead(pFree, { color: P.cyan, r: 5.6, alpha: Math.max(0.35, a), key: 'free' });
    // the κ sphere of the spacing through x_{t−1} and x_{t+1}^free
    if (w.shell > 0.01 && m.th1 > 1e-6) sc.circle([0, 0, 0], D, norm(pPrev), { fade: false, color: P.cyan, width: 1.3, dash: [6, 5], alpha: 0.75 * w.shell });
    if (w.heap > 0.01 && m.th1 > 1e-6) {
      // the next free step x_{t+2}^free = [x_{t+1}^free, x_t, x_{t+1}^free]
      const x2 = tri(m.xFree, m.xNow, m.xFree);
      chartRuns(sample(48, (t) => qexp(scale(m.om1, 1 + t)))).forEach((run, k) => sc.line(run, { color: P.cyan, width: 1.4, dash: [3, 4], alpha: 0.75 * w.heap }));
      sc.bead(chart(x2), { color: P.cyan, r: 3.6, alpha: w.heap, key: 'free2' });
    }
    if (w.zeno > 0.01) sc.ring([0, 0, 0], { color: P.magenta, r: 13, alpha: w.zeno, key: 'zenoRing' });
  }
  function drawTriad(m, w) {
    const a = w.triad;
    if (a < 0.01) return;
    const { e1, e2, e3 } = m.dyad;
    const A = scale(e1, LD),
      B = scale(e2, LD),
      C = scale(e3, LD);
    sc.fan([[0, 0, 0], A, add(A, B), B], { fill: P.magenta, alpha: 0.42 * a, color: P.magenta, width: 1.2, strokeAlpha: 0.8 * a });
    if (m.dyad.norm2 > 1e-6) {
      const V = [[0, 0, 0], A, add(A, B), B, C, add(A, C), add(add(A, B), C), add(B, C)];
      sc.poly('cell', { vertices: V, faces: [[0, 1, 2, 3], [4, 7, 6, 5], [0, 4, 5, 1], [1, 5, 6, 2], [2, 6, 7, 3], [3, 7, 4, 0]] }, { color: P.violet, alpha: 0.3 * a, edges: P.violet });
    }
    sc.arrow([0, 0, 0], A, { color: P.cyan, width: 2.4, headSize: 11, alpha: a });
    sc.arrow([0, 0, 0], B, { color: P.cyan, width: 2.4, headSize: 11, alpha: a });
    if (norm(C) > 0.02) sc.arrow([0, 0, 0], C, { color: P.magenta, width: 3.2, headSize: 12, alpha: a });
  }
  function drawHolo(m, w) {
    const a = w.holo;
    if (a < 0.01) return;
    const { e1, e2 } = m.dyad;
    const vs = [e1, e2, E3HAT];
    // the triangle of directions E₁ → E₂ → Ê₃ on the sphere of directions: three geodesic arcs
    for (let k = 0; k < 3; k++) sc.line(dirArc(vs[k], vs[(k + 1) % 3]), { color: P.magenta, width: 1.4, dash: [5, 4], alpha: 0.8 * a });
    vs.forEach((v, k) => sc.bead(scale(v, LD * 1.004), { color: P.magenta, r: 2.8, alpha: a, key: 'dir' + k }));
  }
  function drawCurve(m, w, D) {
    const a = w.plaq;
    if (a > 0.01 && m.th1 > 1e-6 && m.thc > 1e-6) {
      const at = (s, u) => qmul(qexp(scale(m.om1, s)), qexp(scale(m.omc, u))),
        patch = (s, u) => chart(at(s, u));
      // m.sheetFilled (computed once in compute): a patch that reaches the antipode would be torn across the ball by the
      // chart, so then only its edges are drawn, the order outline; at ψ = 0° ω₁ and ω_ctx are collinear, both orders run
      // along one great circle and there is no sheet to draw (rank 1)
      if (m.sheetFilled)
        sc.surface('plaquette', patch, { u: [0, 1], v: [0, 1], nu: 20, nv: 20, color: P.magenta, alpha: 0.86 * a, grid: { every: [5, 5], alpha: 0.3 }, pick: false });
      else
        for (const edge of [(t) => at(t, 1), (t) => at(1, t)])
          chartRuns(sample(48, edge)).forEach((run) => sc.line(run, { color: P.magenta, width: 1.8, alpha: 0.9 * a }));
      // the other order exp(uω_ctx) exp(sω₁): its two far edges, dashed, and the gap between the far corners; like the
      // edges above they are charted point by point and cut where they cross the antipode (the boundary sphere)
      const otherQ = (s, u) => qmul(qexp(scale(m.omc, u)), qexp(scale(m.om1, s)));
      for (const edge of [(t) => otherQ(t, 1), (t) => otherQ(1, t)])
        chartRuns(sample(24, edge)).forEach((run) => sc.line(run, { color: P.magenta, width: 1.3, dash: [4, 4], alpha: 0.8 * a }));
      sc.arrow([0, 0, 0], chart(qexp(m.omc)), { color: P.sigma, width: 2, headSize: 9, alpha: a });
    }
    const r = w.refr;
    if (r > 0.01) {
      const pFree = chart(m.xFree),
        pNext = chart(m.xNext);
      if (m.phi > 1e-6) {
        const arc = chartRuns(sample(64, (t) => qmul(m.xFree, qexp(scale(m.omega2, t)))));
        arc.forEach((run, k) => tube('refr' + k, run, P.magenta, 0.022, { alpha: r }));
        // the closed triangle x_t → x_{t+1}^free → x_{t+1} → x_t: its third side is the geodesic from x_{t+1} back to x_t
        sc.line([pNext, [0, 0, 0]], { color: P.magenta, width: 1.2, dash: [3, 4], alpha: 0.7 * r });
      }
      sc.bead(pNext, { color: P.magenta, r: 6, alpha: r, key: 'next' });
    }
  }
  const J0 = [-1.02, 0.42, -0.62];
  function drawCap(m, w, I) {
    const a = w.tetra;
    if (a > 0.01) {
      const { e1, e2 } = m.dyad;
      const n0 = unit(add(add(e1, e2), E3HAT));
      const V = [n0, e1, e2, E3HAT].map((v) => scale(v, LT));
      sc.poly('tetra', { vertices: V, faces: [[1, 2, 3], [0, 2, 3], [0, 1, 3], [0, 1, 2]] }, { color: P.violet, alpha: a >= 0.99 ? 1 : 0.6 * a, edges: P.magenta });
      sc.glass('dirGlassCap', [0, 0, 0], LT, { color: P.violet, alpha: 0.04 * a, rim: 0.22 * a });
      V.forEach((p, k) => sc.bead(p, { color: P.magenta, r: 3.4, alpha: a, key: 'v' + k }));
    }
    const j = w.jac;
    if (j > 0.01) {
      const terms = I.jacobi.terms;
      const longest = Math.max(...terms.map(norm));
      // θ₁ = 0 or θ_ctx = 0: a = 0 or b = 0 and all three terms are 0; no arrow, only the violet start. At ψ = 0
      // (ω₁ ∥ ω_ctx) only [[a, b], c] is 0: the other two are drawn as opposite arrows, and a zero term draws nothing
      if (longest > 1e-9) {
        const k = Math.min(1, 0.95 / longest);
        let p = J0;
        for (const t of terms) {
          const q = add(p, scale(t, k));
          if (norm(t) > 1e-9) sc.arrow(p, q, { color: P.magenta, width: 2.2, headSize: 10, alpha: j });
          p = q;
        }
      }
      sc.bead(J0, { color: P.violet, r: 4, alpha: j, key: 'jacobiStart' });
    }
  }

  /* ---------- labels ---------- */
  const SCENE_NAME = {
    dyad: [['二元配关系', 'DYAD + RELATION'], ['两条 1-胞张出 2-胞', 'TWO 1-CELLS SPAN A 2-CELL']],
    zeno: [['一阶输运', 'FIRST-ORDER TRANSPORT'], ['0-胞与 1-形式', '0-CELLS AND A 1-FORM']],
    free: [['二阶自由', 'FREE SECOND ORDER'], ['平坦输运 F = 0', 'FLAT TRANSPORT F = 0']],
    curve: [['曲率折射', 'REFRACTION BY CURVATURE'], ['曲率类比（MODEL）', 'CURVATURE ANALOGY (MODEL)']],
    bianchi: [['二阶选型（MODEL）', 'SECOND-ORDER CHOICE (MODEL)'], ['单纯上边缘', 'SIMPLICIAL COBOUNDARY']]
  };
  const LENS_NAME = [
    ['关系本体', 'ONTOLOGY'],
    ['规范·2-范畴类比 (MODEL)', 'GAUGE · 2-CAT (MODEL)']
  ];
  function tags(m, w, I) {
    const g = state.lens === 1;
    const { U, R } = basis(sc.cam.yaw, sc.cam.pitch);
    const off = (p, ku, kr = 0) => add(add(p, scale(U, ku)), scale(R, kr));
    const T = (key, p, html, cls = 'raw backed c-ik') => p && sc.tag(key, p, html, cls);
    // a compact stage (a phone, a narrow cited figure) names only the states and the relations; the rest is in the HUD
    const compact = stage.clientWidth < 480;
    const pPrev = chart(m.xPrev),
      pFree = chart(m.xFree);
    T('now', off([0, 0, 0], -0.2, -0.12), g ? L('0-胞 v₁', '0-cell v₁') : 'x<sub>t</sub>', 'raw backed c-ik');
    // below 20° the past, the free step and the next step all sit on the centre: only x_t is named there
    const apart = m.th1 > 20 * deg;
    if (w.triad < 0.5 && w.tetra < 0.5 && apart) {
      T('prev', off(pPrev, 0.2), g ? L('0-胞 v₀', '0-cell v₀') : 'x<sub>t−1</sub>', 'raw backed c-sg');
      T('free', off(pFree, -0.22, 0.05), g ? L('0-胞 v₂', '0-cell v₂') : 'x<sup>free</sup><sub>t+1</sub>', 'raw backed c-cy');
      if (m.th1 > 0.05 && !compact) T('om1', off(scale(pPrev, 0.5), -0.17), g ? 'A<sub>t</sub>' : 'R₁ = exp ω₁', 'raw backed c-cy');
    }
    T('anti', off(scale(E1, BALL), 0.16), g ? L('边界 = −v₁', 'boundary = −v₁') : '−x<sub>t</sub>', 'raw backed c-sg');
    if (!compact) T('ball', [0, 0, BALL * 1.06], g ? L('规范群 SU(2)', 'gauge group SU(2)') : '𝕋₃ ≅ S³(1)', 'raw backed c-vi');
    if (w.zeno > 0.5) {
      T('zeno', off([0, 0, 0], 0.36, 0.25), L('θ₁ = 0：[x<sub>t</sub>, x<sub>t</sub>, x<sub>t</sub>] = x<sub>t</sub>', 'θ₁ = 0: [x<sub>t</sub>, x<sub>t</sub>, x<sub>t</sub>] = x<sub>t</sub>'), 'raw backed c-mg');
      T('tree', off(scale(pFree, 0.55), 0.3), g ? L('树：c = 0', 'tree: c = 0') : L('开链是树：c = 0', 'open chain is a tree: c = 0'), 'raw backed c-cy');
    }
    if (w.shell > 0.5 && apart) T('shell', off([0, 0, 0], norm(pPrev) + 0.16), `κ = ${fmt(m.kPrevNow)}`, 'raw backed c-cy');
    if (w.heap > 0.5 && apart) T('free2', off(chart(tri(m.xFree, m.xNow, m.xFree)), 0.2), g ? L('0-胞 v₃', '0-cell v₃') : 'x<sup>free</sup><sub>t+2</sub>', 'raw backed c-cy');
    if (w.triad > 0.5) {
      const { e1, e2, e3 } = m.dyad;
      T('E1', off(scale(e1, LD), 0.12, 0.1), g ? 'A<sub>1</sub>' : 'E₁', 'raw backed c-cy');
      T('E2', off(scale(e2, LD), 0.14), g ? 'A<sub>2</sub>' : 'E₂', 'raw backed c-cy');
      // the drawn E₃ is the half commutator ½(E₁E₂ − E₂E₁) = E₁ × E₂; the ordinary commutator AB − BA is twice as long
      if (norm(e3) > 0.02) T('E3', off(scale(e3, LD), 0.1, -0.12), g ? '½[A<sub>1</sub>, A<sub>2</sub>]' : compact ? 'E₃' : 'E₃ = [E₁, E₂]', 'raw backed c-mg');
      T('vol', off(scale(add(add(e1, e2), e3), LD * 0.5), -0.5, 0.4), g ? L('2-胞 · 体积', '2-cell · volume') + ` ${fmt(m.dyad.volume)}` : `Λ³ · ${fmt(m.dyad.volume)}`, 'raw backed c-vi');
    }
    // the sheet is swept by the two orders exp(sω₁) exp(uω_ctx) and exp(uω_ctx) exp(sω₁); no connection is differentiated
    // on it, so the gauge lens calls it a proxy of F. At ψ = 0° the two relations are collinear and there is no sheet.
    // Where the patch nears the antipode (m.sheetFilled false) only its outline is drawn and the label says so; it sits at
    // the centre of the patch (s = u = ½, at most 105° from x_t), well inside the ball
    if (w.plaq > 0.5 && apart && m.thc > 1e-6) {
      if (!compact && Math.abs(sn(m.psi)) > 1e-6) {
        if (m.sheetFilled)
          T('patch', off(chart(qmul(qexp(scale(m.om1, 0.55)), qexp(scale(m.omc, 0.55)))), 0.05, 0.1), g ? L('换序片（F 示意）', 'order sheet (F proxy)') : L('换序片', 'order sheet'), 'raw backed c-mg');
        else T('patch', off(chart(qmul(qexp(scale(m.om1, 0.5)), qexp(scale(m.omc, 0.5)))), 0.05, 0.1), g ? L('换序轮廓（F 示意）', 'order outline (F proxy)') : L('换序轮廓', 'order outline'), 'raw backed c-mg');
      }
      T('omc', off(chart(qexp(m.omc)), 0.16, -0.05), g ? 'A<sub>ctx</sub>' : 'ω<sub>ctx</sub>', 'raw backed c-sg');
    }
    if (w.refr > 0.5 && apart) {
      T('next', off(chart(m.xNext), 0.2, 0.12), g ? L('0-胞 v₂′', '0-cell v₂′') : 'x<sub>t+1</sub>', 'raw backed c-mg');
      if (m.phi > 1e-3) {
        const midArc = chart(qmul(m.xFree, qexp(scale(m.omega2, 0.5))));
        // with F_{t,ctx} = [A_t, A_ctx] = AB − BA = 2[ω₁, ω_ctx]_×, [F_{t,ctx}, A_t] = 4 Ω₂
        T('triple', off(midArc, 0.02, compact ? 0.3 : 0.62), g ? (compact ? '¼[F, A<sub>t</sub>]' : 'Ω₂ = ¼[F<sub>t,ctx</sub>, A<sub>t</sub>]') : compact ? 'Ω₂' : 'Ω₂ = {ω₁, ω<sub>ctx</sub>, ω₁}', 'raw backed c-mg');
      }
    }
    if (w.holo > 0.5 && !compact) T('holo', off(scale(unit(add(add(m.dyad.e1, m.dyad.e2), E3HAT)), LD), -0.05, -0.62), `(S, D) = (${fmt(m.holo.S, 2)}, ${fmt(m.holo.D, 2)})`, 'raw backed c-mg');
    if (w.tetra > 0.5) {
      T('cell', off(scale(unit(add(add(m.dyad.e1, m.dyad.e2), E3HAT)), LT), 0.24, 0.1), g ? 'δF = ' + fmt(Math.abs(I.tetra.alternating)) : `F₁₂₃ − F₀₂₃ + F₀₁₃ − F₀₁₂ = ${fmt(Math.abs(I.tetra.alternating))}`, 'raw backed c-vi');
      if (!compact) T('cellName', off(scale(m.dyad.e1, LT), -0.2, 0.15), g ? L('3-胞 Λ³', '3-cell Λ³') : 'Λ³ (0, 1, 2, 3)', 'raw backed c-vi');
    }
    if (w.jac > 0.5) T('jac', off(J0, -0.2), g ? `Σ<sub>cyc</sub>[[A, B], C] = ${fmt(I.jacobi.sum)}` : `${L('雅可比轮换和', 'cyclic Jacobi sum')} ${fmt(I.jacobi.sum)}`, 'raw backed c-mg');
  }
  /** All three Jacobi terms are 0 (θ₁ = 0 or θ_ctx = 0 makes a = 0 or b = 0). */
  const jacobiVanishes = (I) => Math.max(...I.jacobi.terms.map(norm)) <= 1e-9;
  /** The Jacobi state of the frame: 'zero' when all three terms are 0; 'collinear' at ψ = 0 with θ₁ > 0 and θ_ctx > 0,
      where ω₁ ∥ ω_ctx makes [[a, b], c] = 0 and the other two terms are nonzero and opposite; else 'three', three
      nonzero terms head to tail. The HUD line, the card note and the free-play note all read this one value. */
  function jacobiRegime(m, I) {
    if (jacobiVanishes(I)) return 'zero';
    return Math.abs(sn(m.psi)) <= 1e-6 ? 'collinear' : 'three';
  }
  function subline(m, I) {
    const s = state.scene;
    if (s === 'dyad') {
      // ψ = 0: E₂ = E₁, the bracket vanishes and the span is one line
      if (m.dyad.norm2 <= 1e-6)
        return L(
          `ψ = ${fmt(m.psiDeg, 0)}°：E₂ = E₁，关系 E₃ = [E₁, E₂] = 0，‖E₃‖² = ${fmt(m.dyad.norm2)}；两者共线，张成退化为一维。`,
          `ψ = ${fmt(m.psiDeg, 0)}°: E₂ = E₁ and their relation E₃ = [E₁, E₂] = 0, ‖E₃‖² = ${fmt(m.dyad.norm2)}; the two are collinear, a one-dimensional span.`
        );
      return L(
        `两个关系方向 E₁、E₂ 夹 ψ = ${fmt(m.psiDeg, 0)}°；关系 E₃ = [E₁, E₂] 垂直于两者，‖E₃‖² = ${fmt(m.dyad.norm2)}，三者张满三维。`,
        `Two relation directions E₁, E₂ at ψ = ${fmt(m.psiDeg, 0)}°; their relation E₃ = [E₁, E₂] is perpendicular to both, ‖E₃‖² = ${fmt(m.dyad.norm2)}, and the three fill three dimensions.`
      );
    }
    if (s === 'zeno') {
      if (m.th1 < 1e-9) return L('θ₁ = 0：过去就是现在，下一步 [x<sub>t</sub>, x<sub>t</sub>, x<sub>t</sub>] = x<sub>t</sub>，什么都不动。', 'θ₁ = 0: the past is the present, and the next step [x<sub>t</sub>, x<sub>t</sub>, x<sub>t</sub>] = x<sub>t</sub> does not move.');
      return L(`R₁ = exp ω₁ 把 x<sub>t−1</sub> 送到 x<sub>t</sub>：θ₁ = ${fmt(m.th1Deg, 2)}°，κ = ${fmt(m.kPrevNow)}。`, `R₁ = exp ω₁ carries x<sub>t−1</sub> to x<sub>t</sub>: θ₁ = ${fmt(m.th1Deg, 2)}°, κ = ${fmt(m.kPrevNow)}.`);
    }
    if (s === 'free')
      return L(
        `自由一步 x<sup>free</sup><sub>t+1</sub> 是过球心的点反射：两步都在 κ = ${fmt(m.kPrevNow)} 的青色球面上，隔一步 ${fmt(m.kPrevFree)}。`,
        `The free step x<sup>free</sup><sub>t+1</sub> is the point reflection through the centre: both steps lie on the cyan sphere κ = ${fmt(m.kPrevNow)}, ${fmt(m.kPrevFree)} two apart.`
      );
    if (s === 'curve') {
      // the three boundaries where the Lie triple vanishes: no first-order relation, no context, collinear relations
      if (m.th1 <= 1e-6)
        return L(
          `θ₁ = 0°：冻在 x<sub>t</sub>，Ω₂ = 0，κ(x<sub>t</sub>, x<sub>t+1</sub>) = ${fmt(m.kNowNext)}。`,
          `θ₁ = 0°: frozen at x<sub>t</sub>, Ω₂ = 0, κ(x<sub>t</sub>, x<sub>t+1</sub>) = ${fmt(m.kNowNext)}.`
        );
      if (m.thc <= 1e-6)
        return L(
          `θ<sub>ctx</sub> = 0°：没有横向关系，Ω₂ = 0，x<sub>t+1</sub> = x<sup>free</sup><sub>t+1</sub> 留在测地线上，κ(x<sub>t</sub>, x<sub>t+1</sub>) = ${fmt(m.kNowNext)}。`,
          `θ<sub>ctx</sub> = 0°: no transverse relation, Ω₂ = 0, and x<sub>t+1</sub> = x<sup>free</sup><sub>t+1</sub> stays on the geodesic, κ(x<sub>t</sub>, x<sub>t+1</sub>) = ${fmt(m.kNowNext)}.`
        );
      if (Math.abs(sn(m.psi)) <= 1e-6)
        return L(
          `ψ = 0°：ω₁ 与 ω<sub>ctx</sub> 共线，沿同一条大圆，没有二维的片；Ω₂ = 0，x<sub>t+1</sub> = x<sup>free</sup><sub>t+1</sub> 留在测地线上，κ(x<sub>t</sub>, x<sub>t+1</sub>) = ${fmt(m.kNowNext)}。`,
          `ψ = 0°: ω₁ and ω<sub>ctx</sub> are collinear, along one great circle, with no two-dimensional sheet; Ω₂ = 0, and x<sub>t+1</sub> = x<sup>free</sup><sub>t+1</sub> stays on the geodesic, κ(x<sub>t</sub>, x<sub>t+1</sub>) = ${fmt(m.kNowNext)}.`
        );
      // at a whole number of half turns exp(Ω₂) = ±1: the end lands back on the geodesic, at ±x^free_{t+1}
      // the sheet is filled, or near the antipode drawn as its outline: the same m.sheetFilled as the stage
      const sweepZh = m.sheetFilled ? '扫出品红换序片' : '贴近对跖边界改绘品红换序轮廓',
        sweepEn = m.sheetFilled ? 'sweep the magenta order sheet' : 'trace the magenta order outline near the antipode';
      if (m.phi > 1e-6 && Math.abs(sn(m.phi)) <= 1e-6) {
        const sign = cs(m.phi) > 0 ? '' : '−';
        return L(
          `ω₁ 与 ω<sub>ctx</sub> ${sweepZh}；Ω₂ 沿垂直大圆转过 ${fmt(m.phiDeg, 2)}°，终点落回原测地线（x<sub>t+1</sub> = ${sign}x<sup>free</sup><sub>t+1</sub>），κ(x<sub>t</sub>, x<sub>t+1</sub>) = ${fmt(m.kNowNext)}。`,
          `ω₁ and ω<sub>ctx</sub> ${sweepEn}; Ω₂ turns by ${fmt(m.phiDeg, 2)}° along the perpendicular great circle, landing back on the geodesic (x<sub>t+1</sub> = ${sign}x<sup>free</sup><sub>t+1</sub>), κ(x<sub>t</sub>, x<sub>t+1</sub>) = ${fmt(m.kNowNext)}.`
        );
      }
      // ‖Ω₂‖ is the unwrapped arc along the perpendicular great circle; bend is the shortest angle from x^free to the end
      return L(
        `ω₁ 与 ω<sub>ctx</sub> ${sweepZh}；Ω₂ 沿垂直大圆展开弧长 ${fmt(m.phiDeg, 2)}°（距 x<sup>free</sup><sub>t+1</sub> 最短测地角 ${fmt(m.bend, 2)}°），偏离原测地线，κ(x<sub>t</sub>, x<sub>t+1</sub>) = ${fmt(m.kNowNext)}。`,
        `ω₁ and ω<sub>ctx</sub> ${sweepEn}; Ω₂ turns along the perpendicular great circle by unwrapped arc ${fmt(m.phiDeg, 2)}° (endpoint angle ${fmt(m.bend, 2)}° from x<sup>free</sup><sub>t+1</sub>), off the geodesic, κ(x<sub>t</sub>, x<sub>t+1</sub>) = ${fmt(m.kNowNext)}.`
      );
    }
    const regime = jacobiRegime(m, I);
    if (regime === 'zero')
      return L(
        'θ₁ = 0 或 θ<sub>ctx</sub> = 0：雅可比三项本身均为 0；四面体四个面的相位交错相消。',
        'θ₁ = 0 or θ<sub>ctx</sub> = 0: all three Jacobi terms vanish; the four face phases of the tetrahedron cancel.'
      );
    if (regime === 'collinear')
      return L(
        'ψ = 0°：ω₁ 与 ω<sub>ctx</sub> 共线，首项 [[a, b], c] = 0，其余两项反向相消回到起点；四面体四个面的相位交错相消。',
        'ψ = 0°: ω₁ and ω<sub>ctx</sub> are collinear, so [[a, b], c] = 0 and the other two opposite terms cancel back to the start; the four face phases of the tetrahedron cancel.'
      );
    return L('雅可比三项首尾相接回到起点；四面体四个面的相位交错相消。', 'The three Jacobi terms return head to tail to their start; the four face phases of the tetrahedron cancel.');
  }
  function bigline(m, I) {
    const name = L(...SCENE_NAME[state.scene][state.lens]);
    const key = {
      dyad: `‖E₃‖² = ${fmt(m.dyad.norm2)}`,
      zeno: `κ = ${fmt(m.kPrevNow)}`,
      free: `κ = ${fmt(m.kPrevNow)} = ${fmt(m.kNowFree)}`,
      curve: `‖Ω₂‖ = ${fmt(m.phi)}`,
      bianchi: `δF = ${fmt(Math.abs(I.tetra.alternating))}`
    }[state.scene];
    return `${name} · ${key}`;
  }
  function legendItems(m) {
    const g = state.lens === 1,
      s = state.scene;
    const items = [['vi', g ? L('规范群 SU(2) 的球', 'the ball of SU(2)') : L('三元数 𝕋₃', 'the ternion 𝕋₃')], ['am', L('当下 x<sub>t</sub>', 'the present x<sub>t</sub>')]];
    if (s === 'dyad') items.push(['cy', L('两个关系方向', 'two relation directions')], ['mg', L('它们的关系与面积', 'their relation and area')]);
    else if (s === 'zeno') items.push(['cy', L('一阶关系 R₁', 'first-order relation R₁')], ['mg', L('冻结点 θ₁ = 0', 'the frozen point θ₁ = 0')]);
    else if (s === 'free') items.push(['cy', L('测地线与间距球', 'geodesic and spacing sphere')], ['sg', L('过去 x<sub>t−1</sub>', 'the past x<sub>t−1</sub>')]);
    else if (s === 'curve') items.push(['cy', L('测地线', 'geodesic')], ['mg', m.sheetFilled ? L('换序片与折射', 'sheet and refraction') : L('换序轮廓与折射', 'outline and refraction')]);
    else items.push(['mg', L('雅可比三项', 'Jacobi terms')], ['sg', L('对跖点', 'antipode')]);
    return items;
  }
  function hud(m, I) {
    $('hudBig').innerHTML = bigline(m, I);
    $('hudSub').innerHTML = subline(m, I);
    $('legend').innerHTML = legendItems(m)
      .map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`)
      .join('');
  }
  // labels keep near their anchors and stay off the title, the legend, the handle and each other
  function fitLabels() {
    if (TRV.thumbMode) return;
    const bounds = stage.getBoundingClientRect();
    const occupied = [$('hudTl'), $('legend'), handle].filter((el) => !el.hidden).map((el) => el.getBoundingClientRect());
    const list = [...stage.querySelectorAll('.tags .tag:not([hidden])')];
    for (const tag of list) tag.style.translate = '';
    const boxes = list.map((tag) => tag.getBoundingClientRect());
    // the place of a label shifted by (dx, dy), or null when it leaves the stage or meets an occupied box
    const free = (box, dx, dy) => {
      const left = box.left + dx,
        right = box.right + dx,
        top = box.top + dy,
        bottom = box.bottom + dy;
      if (left < bounds.left + 4 || right > bounds.right - 4 || top < bounds.top + 4 || bottom > bounds.bottom - 4) return null;
      if (occupied.some((r) => left < r.right + 3 && right > r.left - 3 && top < r.bottom + 3 && bottom > r.top - 3)) return null;
      return { left, right, top, bottom };
    };
    const place = (i, dx, dy, at) => {
      list[i].style.translate = dx + 'px ' + dy + 'px';
      occupied.push(at);
    };
    // each label takes the free place nearest its anchor: rows straight above and below and steps to either side are
    // weighed together by their distance (a side step costs half a pixel more, so a tie keeps the column), and a crowded
    // column no longer sends a label to the far edge of the stage while a free place waits right beside it
    const STEP = 20;
    const cols = 2 * Math.ceil(bounds.width / STEP);
    for (const [i, box] of boxes.entries()) {
      const dx = kit.clamp(0, bounds.left + 5 - box.left, bounds.right - 5 - box.right);
      const here = free(box, dx, 0);
      if (here) {
        place(i, dx, 0, here);
        continue;
      }
      const row = box.height + 4,
        rows = 2 * Math.ceil(bounds.height / row);
      let best = null;
      for (let k = 0; k <= cols; k++) {
        const sx = Math.ceil(k / 2) * STEP * (k % 2 ? -1 : 1),
          extra = sx === 0 ? 0 : 0.5;
        // no row of this column can beat the best place so far
        if (best && Math.abs(dx + sx) + extra >= best.cost) continue;
        // rows in order of distance (below before above on a tie): the first free row is the best of the column
        for (let j = 0; j <= rows; j++) {
          const dy = Math.ceil(j / 2) * row * (j % 2 ? 1 : -1),
            cost = Math.hypot(dx + sx, dy) + extra;
          if (best && cost >= best.cost) break;
          const at = free(box, dx + sx, dy);
          if (at) {
            best = { cost, dx: dx + sx, dy, at };
            break;
          }
        }
      }
      if (best) place(i, best.dx, best.dy, best.at);
    }
  }
  /** Where the handle sits for an angle θ₁: on the past state x_{t−1}. */
  const handleWorld = (th1) => chart(qexp(scale(E1, -th1)));
  function drawStage(m, I) {
    const w = layers();
    fit();
    sc.begin();
    const D = basis(sc.cam.yaw, sc.cam.pitch).D;
    drawBall(m, w, D);
    drawBeat(m, w, D);
    drawTriad(m, w);
    drawHolo(m, w);
    drawCurve(m, w, D);
    drawCap(m, w, I);
    sc.bead([0, 0, 0], { color: P.amber, r: 6.6, key: 'present' });
    tags(m, w, I);
    sc.end();
    const q = sc.p(handleWorld(m.th1));
    handle.hidden = TRV.still;
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
    fitLabels();
  }

  /* ---------- strip: along θ₁ the spacing is kept and the curvature pulls the next step off; the energy floor ---------- */
  const spacing = sample(240, (t) => {
    const x = t * 120;
    return [x, cs((x * deg) / 2) ** 2];
  });
  /** A strip title that breaks only between its pieces: each piece stays on one line (a hyphenated word, δF = 0, a
      bracket), the separators between them stay ordinary. The text content is the plain sentence. */
  function setPieces(el, pieces, sep) {
    if (el.textContent === pieces.join(sep)) return;
    el.replaceChildren(
      ...pieces.flatMap((text, i) => {
        const piece = document.createElement('span');
        piece.className = 'nb';
        piece.textContent = text;
        return i && sep ? [sep, piece] : [piece];
      })
    );
  }
  function drawPlots(m) {
    if (TRV.thumbMode) return;
    const cv = $('plot');
    if (cv.clientWidth && cv.clientHeight) {
      $('plotTitle').textContent = L('沿 θ₁：自由一步保持间距，曲率把下一步拉开', 'Along θ₁: the free step keeps the spacing, curvature pulls the next step off');
      $('plotMeta').textContent = 'κ = cos²(θ₁/2)';
      const g = kit.plot(cv, { x: [0, 120], y: [0, 1.3], pad: [34, 14, 12, 22] });
      g.axes({ xTicks: [[0, '0°'], [30, '30°'], [60, '60°'], [90, '90°'], [120, '120°']], yTicks: [0, 0.25, 0.5, 0.75, 1], xLabel: 'θ₁' });
      g.line(spacing, P.cyan, { width: 2 });
      g.line(sample(240, (t) => [t * 120, kNextAt(t * 120 * deg, state.thc, state.psi)]), P.magenta, { width: 2 });
      g.vline(m.th1Deg, P.amber);
      g.dot(m.th1Deg, m.kNowNext, P.amber, 3.5);
      g.legend([
        [P.cyan, 'κ(x_{t−1}, x_{t}) = κ(x_{t}, x^{free}_{t+1})'],
        [P.magenta, 'κ(x_{t}, x_{t+1})']
      ]);
    }
    const cb = $('plotB');
    if (cb.clientWidth && cb.clientHeight) {
      setPieces(
        $('plotTitleB'),
        L(
          ['二阶选型（MODEL）：', '雅可比轮换和', '与四面体 δF = 0；', '非退化高阶玩具', '（四阶方程）', '无能量下界'],
          ['Second-order', 'choice', '(MODEL):', 'cyclic Jacobi &', 'tetrahedral', 'δF = 0;', 'non-degenerate', 'higher-derivative toy', '(4th-order EOM):', 'no floor']
        ),
        L('', ' ')
      );
      $('plotMetaB').textContent = L('L = q̈²/2 · H = P₁Q₂ + P₂²/2 · 切片 Q₂ = 1, P₂ = 0', 'L = q̈²/2 · H = P₁Q₂ + P₂²/2 · slice Q₂ = 1, P₂ = 0');
      // the top of the range is headroom: the three-row legend sits above E = p²/2, which reaches 2.42 at the edges; on the
      // shortest 118 px strip (84 px plot) 9.6 puts that edge at y ≈ 62 px, so a deeper system-font descent still clears it
      const g = kit.plot(cb, { x: [-2.2, 2.2], y: [-2.4, 9.6], pad: [34, 14, 12, 22] });
      g.axes({ xTicks: [-2, -1, 0, 1, 2], yTicks: [-2, 0, 2, 4, 6], xLabel: 'P₁' });
      g.line(sample(200, (t) => [-2.2 + 4.4 * t, 0]), P.violet, { width: 2 });
      g.line(sample(200, (t) => {
        const p = -2.2 + 4.4 * t;
        return [p, (p * p) / 2];
      }), P.cyan, { width: 2 });
      g.line(sample(2, (t) => {
        const p = -2.2 + 4.4 * t;
        return [p, p];
      }), P.magenta, { width: 2 });
      g.arrow([-1.7, -1.7], [-2.15, -2.15], { color: P.magenta, width: 2, head: true, headSize: 8 });
      g.vline(m.th1, P.amber);
      g.dot(m.th1, (m.th1 * m.th1) / 2, P.amber, 3.5);
      g.legend([
        [P.cyan, L('二阶 E = p²/2 ≥ 0', 'second order E = p²/2 ≥ 0')],
        // the title carries (4th-order EOM); the legend stays one short row so it fits a 390 px phone strip
        [P.magenta, L('非退化高阶玩具 H = P₁', 'non-degenerate higher-derivative toy H = P₁')],
        [P.violet, L('雅可比轮换和、四面体 δF = 0', 'cyclic Jacobi, tetrahedral δF = 0')]
      ], { right: false });
    }
  }

  /* ---------- readouts ---------- */
  function note(m, I) {
    const s = state.scene;
    if (s === 'dyad') {
      if (m.dyad.norm2 <= 1e-6)
        return L(
          `拉格朗日恒等式：1 − cos²ψ = ${fmt(I.lagrange.left)} = ${fmt(I.lagrange.right)}；E₂ = E₁（共线），E₃ = 0，[E₂, E₃] = [E₃, E₁] = 0：张成退化为一维，Ê₃ 改用固定的辅助单位轴。`,
          `Lagrange identity: 1 − cos²ψ = ${fmt(I.lagrange.left)} = ${fmt(I.lagrange.right)}; E₂ = E₁ (collinear), E₃ = 0 and [E₂, E₃] = [E₃, E₁] = 0: the span is one-dimensional, and Ê₃ falls back to the fixed auxiliary unit axis.`
        );
      return L(
        `拉格朗日恒等式：1 − cos²ψ = ${fmt(I.lagrange.left)} = ${fmt(I.lagrange.right)}；[E₂, E₃] 与 [E₃, E₁] 仍落在 E₁、E₂ 的平面里。`,
        `Lagrange identity: 1 − cos²ψ = ${fmt(I.lagrange.left)} = ${fmt(I.lagrange.right)}; [E₂, E₃] and [E₃, E₁] stay in the plane of E₁ and E₂.`
      );
    }
    if (s === 'zeno')
      return L(
        `开链 n = 3、m = 2：c = ${I.loops.chain}；规范后两条树边的相位偏差 ${fmt(I.tree.gap)}。改变下一步（${fmt(I.policy.actionChange)}）必须改变记忆（${fmt(I.policy.memoryChange)}）。`,
        `Open chain n = 3, m = 2: c = ${I.loops.chain}; after the gauge both tree edges are off by ${fmt(I.tree.gap)}. Changing the next step (${fmt(I.policy.actionChange)}) needs a change of memory (${fmt(I.policy.memoryChange)}).`
      );
    if (s === 'free')
      return L(
        `反射序列与 b 的幂相差 ${fmt(I.reflection.powGap)}；κ(xₘ, xₘ₊ₙ) 与 κ(x₀, xₙ) 相差 ${fmt(I.reflection.kAdd)}；${I.triBase.bases} 个基点 o 下偏差 ${fmt(I.triBase.drift)}；${I.so4.pairs} 组抽样 SO(4) 变换偏差 ${fmt(I.so4.drift)}。`,
        `The reflection sequence differs from the powers of b by ${fmt(I.reflection.powGap)}; κ(xₘ, xₘ₊ₙ) from κ(x₀, xₙ) by ${fmt(I.reflection.kAdd)}; drift over ${I.triBase.bases} base points o ${fmt(I.triBase.drift)}; ${fmt(I.so4.drift)} drift across ${I.so4.pairs} sampled SO(4) transforms.`
      );
    if (s === 'curve') {
      // the refraction triangle x_t → x^free_{t+1} → x_{t+1} → x_t closes only when the refraction moves the step off the line
      const loop =
        m.th1 <= 1e-6
          ? L('θ₁ = 0° 时三点重合于 x<sub>t</sub>（退化无环，有效环路 0）', 'at θ₁ = 0° all three points coincide at x<sub>t</sub> (degenerate, 0 active loops)')
          : norm(sub(m.xNext, m.xFree)) <= 1e-6
            ? L(
                `x<sub>t+1</sub> = x<sup>free</sup><sub>t+1</sub>，折射三角形退化为开线段（有效环路 0；参考三角形图 c = ${I.loops.triangle}）`,
                `x<sub>t+1</sub> = x<sup>free</sup><sub>t+1</sub>, so the refraction triangle collapses to an open segment (0 active loops; reference 3-cycle c = ${I.loops.triangle})`
              )
            : Math.abs(sn(m.phi)) <= 1e-6
              ? L(
                  `x<sub>t+1</sub> = −x<sup>free</sup><sub>t+1</sub> 落在同一大圆上（参考 3 顶点闭路图 c = ${I.loops.triangle}）`,
                  `x<sub>t+1</sub> = −x<sup>free</sup><sub>t+1</sub> lies on the same great circle (reference 3-vertex cycle graph c = ${I.loops.triangle})`
                )
              : L(`非退化闭合三角形 c = ${I.loops.triangle}`, `the non-degenerate closed triangle has c = ${I.loops.triangle}`);
      return L(
        `x<sub>t</sub>⁻¹x<sub>t+1</sub> = cos θ + sin θ·n，θ = ${fmt(I.polar.theta, 2)}°，‖n‖ = ${fmt(I.polar.nNorm)}；${loop}。`,
        `x<sub>t</sub>⁻¹x<sub>t+1</sub> = cos θ + sin θ·n, θ = ${fmt(I.polar.theta, 2)}°, ‖n‖ = ${fmt(I.polar.nNorm)}; ${loop}.`
      );
    }
    return L(
      `四面体：tetraDefects = ${I.tetra.defects}，边上链复原误差 ${I.tetra.edgeErrors}，c = ${I.loops.tetra}；F₁₂₃ = ${fmt(I.tetra.F123, 2)}°。`,
      `Tetrahedron: tetraDefects = ${I.tetra.defects}, edge-cochain errors ${I.tetra.edgeErrors}, c = ${I.loops.tetra}; F₁₂₃ = ${fmt(I.tetra.F123, 2)}°.`
    );
  }
  function readings(m, I) {
    $('roKey').textContent = fmt(m.kNowNext);
    $('roKeySub').textContent = ` · θ₁ = ${fmt(m.th1Deg, 2)}° · θ_ctx = ${fmt(m.thcDeg, 0)}° · ψ = ${fmt(m.psiDeg, 0)}°`;
    $('roSpacing').textContent = `${fmt(m.kPrevNow)} · ${fmt(m.kNowFree)} · ${fmt(m.kPrevFree)} · ${fmt(I.so4.drift)}`;
    $('roTriple').textContent = `${fmt(m.phi)} rad = ${fmt(m.phiDeg, 2)}° · κ ${fmt(m.kFreeNext)} · ‖x‖² ${fmt(m.normNext2)}`;
    $('roDyad').textContent = `${fmt(m.dyad.norm2)} · ${fmt(Math.abs(m.dyad.dot31))} · ${fmt(Math.abs(m.dyad.dot32))} · ${fmt(Math.abs(m.dyad.scalar))}`;
    $('roHolo').textContent = `(${fmt(I.holonomy.S)}, ${fmt(I.holonomy.D)}) · ${signed(I.holonomy.phase, 2)}° · c = ${I.loops.chain} / ${I.loops.triangle} / ${I.loops.tetra}`;
    $('roCap').textContent = `${fmt(I.jacobi.sum)} · ${fmt(Math.abs(I.tetra.alternating))}`;
    $('roNote').innerHTML = note(m, I);
    $('scenePill').innerHTML = `${L(...LENS_NAME[state.lens])} <strong>${L(...SCENE_NAME[state.scene][state.lens])}</strong>`;
    $('keyPill').innerHTML = `κ(x<sub>t</sub>, x<sub>t+1</sub>) <strong>${fmt(m.kNowNext)}</strong>`;
    $('hint').textContent = L('拖琥珀手柄改 θ₁ · 拖空白处转视角 · 空格播放', 'drag the amber handle to set θ₁ · drag empty space to orbit · Space plays');
    $('formula').textContent = 'x_{t+1} = [x_t, x_{t−1}, x_t] ⋆ exp{ω₁, ω_ctx, ω₁}';
    for (const id of ['lensToggleBtn', 'mobileLensBtn']) $(id).setAttribute('aria-pressed', String(state.lens === 1));
    t1f.set(Math.round(m.th1Deg));
    $('theta1Out').textContent = fmt(m.th1Deg, 0) + '°';
  }
  const calc = () => compute(clock.t, state.thc, state.psi);
  // set once the cards exist: keeps the Jacobi card note and the free-play note true to the live frame (see capNote)
  let capNote = null;
  const paint = kit.painter(() => {
    const m = calc(),
      I = instances(m);
    hud(m, I);
    if (capNote) capNote(m, I);
    TRV.hudFit();
    drawStage(m, I);
    readings(m, I);
    drawPlots(m);
  }, [stage, $('plot'), $('plotB')]);

  /* ---------- the rail: the first-order angle θ₁ ---------- */
  const playBtn = $('playBtn');
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: true,
    rate: TH_MAX / 6,
    step: deg,
    max: TH_MAX,
    format: (t) => `θ₁ ${(t / deg).toFixed(2)}°`,
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      // a card plays from θ₁ = 0 up to its still and parks there
      if (stopAt != null && c.playing && t >= stopAt - 1e-12) {
        const s = stopAt;
        stopAt = null;
        c.pause();
        c.set(s);
        return;
      }
      if (!c.playing) stopAt = null;
      paint();
    }
  });
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

  /* a card that plays inside a book starts once the stage is half in view and pauses when it leaves; the first touch
     of the reader ends this for good */
  let bootIO = null;
  function bootAutoplay(target) {
    if (TRV.still || !window.IntersectionObserver) return;
    let started = false;
    bootIO = new IntersectionObserver(
      (entries) => {
        const seen = entries[entries.length - 1].intersectionRatio >= 0.5;
        if (seen && !started) {
          started = true;
          stopAt = target;
          clock.play();
        } else if (!seen && clock.playing) clock.pause();
      },
      { threshold: [0, 0.5, 1] }
    );
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
  document.addEventListener(
    'keydown',
    (ev) => {
      if ([' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) stopBootPlay();
    },
    true
  );

  /* ---------- controls ---------- */
  let transition = null,
    booting = true;
  /** Blend the layers and the two angles from `from` to the state over ms. */
  function startBlend(from, ms) {
    if (transition) transition.cancel();
    state.from = from;
    state.blend = 0;
    const token = {};
    transition = token;
    const end = () => {
      state.blend = 1;
      state.from = null;
      state.thc = state.target.thc;
      state.psi = state.target.psi;
    };
    token.cancel = () => {
      if (token.run) token.run.cancel();
      end();
    };
    token.run = kit.tween(
      ms,
      (e) => {
        state.blend = e;
        state.thc = lerp(from.thc, state.target.thc, e);
        state.psi = lerp(from.psi, state.target.psi, e);
        paint();
      },
      () => {
        if (transition === token) transition = null;
        end();
        paint();
      }
    );
  }
  function setScene(scene, thc, psi, ms) {
    const before = { ...layers(), thc: state.thc, psi: state.psi };
    state.scene = scene;
    state.target = { thc, psi };
    if (ms > 0 && !TRV.still) startBlend(before, ms);
    else {
      if (transition) transition.cancel();
      transition = null;
      state.from = null;
      state.blend = 1;
      state.thc = thc;
      state.psi = psi;
    }
    cf.set(Math.round(thc / deg));
    pf.set(Math.round(psi / deg));
  }
  /** The reader takes over: the clock pauses and no card is marked; the scene stays. */
  function leave() {
    stopBootPlay();
    stopAt = null;
    cards.mark(null);
    clock.pause();
    if (transition) {
      transition.cancel();
      transition = null;
    }
  }
  const t1f = kit.field($('theta1Range'), {
    fmt: (v) => v + '°',
    onInput: (v) => {
      leave();
      clock.set(v * deg);
    }
  });
  const cf = kit.field($('ctxRange'), {
    fmt: (v) => v + '°',
    onInput: (v) => {
      leave();
      // the free card has no context relation; turning one on shows the curvature scene and the refracted future at once
      if (v > 0 && state.scene === 'free') setScene('curve', v * deg, state.psi, 0);
      else state.thc = v * deg;
      paint();
    }
  });
  const pf = kit.field($('planeRange'), {
    fmt: (v) => v + '°',
    onInput: (v) => {
      leave();
      state.psi = v * deg;
      paint();
    }
  });
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = cams[v] ? v : 'panorama';
    sc.view(cams[state.cam], TRV.still || booting ? 0 : 600);
    paint();
  });
  // the lens renames the picture and keeps the state; the rail switch and its mirror in the tour bar (narrow pages,
  // where the rail sits below the evidence) both flip it
  function setLens(v) {
    state.lens = v ? 1 : 0;
    paint();
  }
  for (const id of ['lensToggleBtn', 'mobileLensBtn']) $(id).addEventListener('click', () => setLens(state.lens ? 0 : 1));

  /* ---------- experiment cards ---------- */
  const NOTES = {
    'dyad-orthogonal-relation-span': [
      '青色的 E₁、E₂ 是两个关系方向，夹 ψ = 60°；品红的 E₃ = [E₁, E₂] 垂直于两者，品红面积的平方 ‖E₃‖² = 0.7500。紫色的体积由三者张成，再取括号也长不出第四个方向。',
      'The cyan E₁ and E₂ are two relation directions at ψ = 60°; the magenta E₃ = [E₁, E₂] is perpendicular to both, and the magenta area squared is ‖E₃‖² = 0.7500. The violet volume is spanned by the three; brackets grow no fourth direction.'
    ],
    'first-order-zeno-vs-transport': [
      '时间轴把 θ₁ 从 0 推到 60°：开始时银白的 x<sub>t−1</sub> 压在琥珀的 x<sub>t</sub> 上，品红圈是冻结点；之后青色的 R₁ 把 x<sub>t−1</sub> 送到 x<sub>t</sub>，κ = 0.7500。这条开链是一棵树，没有环路。',
      'The rail pushes θ₁ from 0 to 60°: at first the silver x<sub>t−1</sub> sits on the amber x<sub>t</sub>, and the magenta ring marks the frozen point; then the cyan R₁ carries x<sub>t−1</sub> to x<sub>t</sub>, κ = 0.7500. The open chain is a tree, with no loop.'
    ],
    'second-order-free-heap-geodesic': [
      '青色的下一步是过球心的点反射：x<sub>t−1</sub> 与 x<sup>free</sup><sub>t+1</sub> 都在 κ = 0.75 的青色虚线球面上，隔一步读数 0.2500；青色虚线继续给出再下一步；16 组抽样 SO(4) 变换偏差 0.0000。',
      'The cyan next step is the point reflection through the centre: x<sub>t−1</sub> and x<sup>free</sup><sub>t+1</sub> both lie on the dashed cyan sphere κ = 0.75, and two apart read 0.2500; the dashed cyan line gives the step after, with 0.0000 drift across 16 sampled SO(4) transforms.'
    ],
    'curvature-lie-triple-refraction': [
      '品红的换序片由 ω₁ 与 ω<sub>ctx</sub>（45°，ψ = 90°）的两种先后次序扫出，在远角留下缺口；品红弧 Ω₂ = {ω₁, ω<sub>ctx</sub>, ω₁} 把 x<sup>free</sup><sub>t+1</sub> 折到 x<sub>t+1</sub>。θ₁ = 60° 时：49.35°，κ = 0.8257，κ(x<sub>t</sub>, x<sub>t+1</sub>) = 0.6629。',
      'The magenta order sheet is swept by the two orders of ω₁ and ω<sub>ctx</sub> (45°, ψ = 90°), which leave a gap at the far corner; the magenta arc Ω₂ = {ω₁, ω<sub>ctx</sub>, ω₁} refracts x<sup>free</sup><sub>t+1</sub> to x<sub>t+1</sub>. At θ₁ = 60°: 49.35°, κ = 0.8257, κ(x<sub>t</sub>, x<sub>t+1</sub>) = 0.6629.'
    ],
    'bianchi-jacobi-second-order-cap': [
      '紫色四面体 Λ³ 的四个面的相位交错相加为 0.0000，即单形上的面相位上边缘 δF = 0（连续情形的比安基恒等式 d<sub>A</sub>F = 0 是文献中的对应）；一旁，θ₁ > 0、θ<sub>ctx</sub> > 0 且 ψ > 0°（如停帧的 60°、45°、ψ = 90°）时三支品红箭头 [[a, b], c]、[[b, c], a]、[[c, a], b] 各自不为零，却首尾相接回到紫色起点，雅可比轮换和为 0.0000（θ₁ = 0 或 θ<sub>ctx</sub> = 0 时三项均为 0；ψ = 0° 共线时首项为 0、其余两项反向相消）。',
      'The four face phases of the violet tetrahedron Λ³ add up alternately to 0.0000, the face-phase coboundary on the simplex δF = 0 (the continuum Bianchi identity d<sub>A</sub>F = 0 is its counterpart in the literature); to one side, for θ₁ > 0, θ<sub>ctx</sub> > 0 and ψ > 0° (such as the parked 60°, 45°, ψ = 90° frame) none of the three magenta arrows [[a, b], c], [[b, c], a] and [[c, a], b] is zero, yet they return head to tail to the violet start with cyclic Jacobi sum 0.0000 (at θ₁ = 0 or θ<sub>ctx</sub> = 0 all three terms vanish; at collinear ψ = 0° the first term is 0 and the other two cancel opposite to each other).'
    ]
  };
  // the same card at θ₁ = 0 (⏮, or the start of its sweep): a = ω₁ = 0, the three terms are 0 and no arrow is drawn
  const CAP = 'bianchi-jacobi-second-order-cap',
    CAP_LIVE = NOTES[CAP],
    CAP_ZERO = [
      '紫色四面体 Λ³ 的四个面的相位交错相加为 0.0000，即单形上的面相位上边缘 δF = 0（连续情形的比安基恒等式 d<sub>A</sub>F = 0 是文献中的对应）；此刻 θ₁ = 0 或 θ<sub>ctx</sub> = 0，雅可比三项 [[a, b], c]、[[b, c], a]、[[c, a], b] 本身均为 0，没有品红箭头，只剩紫色起点，雅可比轮换和为 0.0000。推动时间轴或按 ▶，三支箭头随 θ₁ 长出。',
      'The four face phases of the violet tetrahedron Λ³ add up alternately to 0.0000, the face-phase coboundary on the simplex δF = 0 (the continuum Bianchi identity d<sub>A</sub>F = 0 is its counterpart in the literature); right now θ₁ = 0 or θ<sub>ctx</sub> = 0, so all three Jacobi terms [[a, b], c], [[b, c], a] and [[c, a], b] vanish: no magenta arrow, only the violet start, cyclic Jacobi sum 0.0000. Move the rail or press ▶ and the three arrows grow with θ₁.'
    ];
  // a cited figure has a fixed frame: one short sentence per card, no sub- or superscripts
  const FIGURE_NOTES = {
    'dyad-orthogonal-relation-span': ['ψ = 60°：‖E₃‖² = 0.7500，E₃ 与 E₁、E₂ 都垂直。', 'ψ = 60°: ‖E₃‖² = 0.7500, and E₃ is perpendicular to E₁ and E₂.'],
    'first-order-zeno-vs-transport': ['θ₁ = 60°：κ = 0.7500；θ₁ = 0 时两点重合、不动。', 'θ₁ = 60°: κ = 0.7500; at θ₁ = 0 the two points coincide and stay.'],
    'second-order-free-heap-geodesic': ['间距不变：0.7500 与 0.7500，隔一步 0.2500。', 'The spacing is kept: 0.7500 and 0.7500, two apart 0.2500.'],
    'curvature-lie-triple-refraction': ['θ₁ = 60°：折射 0.8613 rad = 49.35°，下一步的 κ = 0.6629。', 'θ₁ = 60° — Refraction 0.8613 rad = 49.35°, κ of the next step 0.6629.'],
    'bianchi-jacobi-second-order-cap': ['雅可比轮换和 0.0000，四个面的交错和 0.0000。', 'Cyclic Jacobi sum 0.0000, alternating face sum 0.0000.']
  };
  // the cited Jacobi figure after ⏮ (θ₁ = 0): the same one short sentence, no sub- or superscripts
  const FIG_CAP_LIVE = FIGURE_NOTES[CAP],
    FIG_CAP_ZERO = ['θ₁ = 0：雅可比三项均为 0，四个面的交错和 0.0000。', 'θ₁ = 0: all three Jacobi terms are 0, alternating face sum 0.0000.'];
  // free play (no card marked): the plain hint, or on the Jacobi scene the hint after the Jacobi state of the frame
  const HINT = [
      '拖琥珀手柄、时间轴或滑块改 θ₁、θ<sub>ctx</sub> 与 ψ，换透镜或视角。随时可以再选一张卡。',
      'Drag the amber handle, the rail or the sliders to set θ₁, θ<sub>ctx</sub> and ψ; switch the lens or the view. Pick a card again at any time.'
    ],
    IDLE_DEFAULT = [
      '自由探索：拖琥珀手柄、时间轴或滑块改 θ₁、θ<sub>ctx</sub> 与 ψ，换透镜或视角。随时可以再选一张卡。',
      'Free play: drag the amber handle, the rail or the sliders to set θ₁, θ<sub>ctx</sub> and ψ; switch the lens or the view. Pick a card again at any time.'
    ],
    IDLE_CAP_ZERO = [
      '自由探索：此刻 θ₁ = 0 或 θ<sub>ctx</sub> = 0，雅可比三项 [[a, b], c]、[[b, c], a]、[[c, a], b] 本身均为 0，没有品红箭头，只剩紫色起点；四面体四个面的相位交错相消。' + HINT[0],
      'Free play: right now θ₁ = 0 or θ<sub>ctx</sub> = 0, so all three Jacobi terms [[a, b], c], [[b, c], a] and [[c, a], b] vanish: no magenta arrow, only the violet start; the four face phases of the tetrahedron cancel. ' + HINT[1]
    ],
    IDLE_CAP_COLLINEAR = [
      '自由探索：此刻 ψ = 0°，ω₁ 与 ω<sub>ctx</sub> 共线，首项 [[a, b], c] = 0；其余两支品红箭头 [[b, c], a]、[[c, a], b] 方向相反，相消回到紫色起点；四面体四个面的相位交错相消。' + HINT[0],
      'Free play: right now ψ = 0°, ω₁ and ω<sub>ctx</sub> are collinear, so the first term [[a, b], c] = 0; the other two magenta arrows [[b, c], a] and [[c, a], b] point opposite ways and cancel back to the violet start; the four face phases of the tetrahedron cancel. ' + HINT[1]
    ],
    IDLE_CAP_THREE = [
      '自由探索：此刻 θ₁ > 0、θ<sub>ctx</sub> > 0 且 ψ > 0°，三支品红箭头 [[a, b], c]、[[b, c], a]、[[c, a], b] 各自不为零，首尾相接回到紫色起点；四面体四个面的相位交错相消。' + HINT[0],
      'Free play: right now θ₁ > 0, θ<sub>ctx</sub> > 0 and ψ > 0°, so none of the three magenta arrows [[a, b], c], [[b, c], a] and [[c, a], b] is zero, yet they return head to tail to the violet start; the four face phases of the tetrahedron cancel. ' + HINT[1]
    ];
  const IDLE_BY_REGIME = { zero: IDLE_CAP_ZERO, collinear: IDLE_CAP_COLLINEAR, three: IDLE_CAP_THREE };
  function applyPreset(id) {
    const p = presets[id];
    stopBootPlay();
    stopAt = null;
    clock.pause();
    setScene(p.scene, p.thcDeg * deg, p.psiDeg * deg, booting || TRV.still ? 0 : 600);
    state.cam = p.cam;
    camChips.set(p.cam, true);
    sc.view(cams[p.cam], booting || TRV.still ? 0 : 600);
    // a still, a reader who asked for reduced motion and a freshly opened full page park on the declared frame
    const parked = TRV.still || TRV.reduceMotion || !p.play || (booting && !TRV.embed);
    clock.set(parked ? p.still : 0);
    if (!parked) {
      if (booting) bootAutoplay(p.still);
      else {
        stopAt = p.still;
        clock.play();
      }
    }
    paint();
  }
  // kit.cards reads both tables when it writes a note, so the page swaps their entries in place
  const notesObj = TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES,
    idlePair = [...IDLE_DEFAULT];
  const cards = kit.cards($('presets'), {
    presets,
    notes: notesObj,
    noteEl: $('presetNote'),
    tour: $('tour'),
    onPick: applyPreset,
    idle: idlePair
  });
  /* the notes follow the Jacobi state of the live frame, as the HUD line does (jacobiRegime). The marked Jacobi card says
     at θ₁ = 0 (⏮, the start of its sweep) that the three terms vanish, otherwise its qualified sentence (a cited figure:
     one short sentence either way); free play on the Jacobi scene names the state of the frame before the hint. The key
     holds the marked card too: a slider that leaves the card rewrites the free-play note in the same frame */
  let capKey = null;
  capNote = (m, I) => {
    const regime = state.scene === 'bianchi' ? jacobiRegime(m, I) : 'other',
      key = (cards.current || 'idle') + ':' + regime;
    if (key === capKey) return;
    capKey = key;
    const zero = regime === 'zero';
    notesObj[CAP] = TRV.figure ? (zero ? FIG_CAP_ZERO : FIG_CAP_LIVE) : zero ? CAP_ZERO : CAP_LIVE;
    const idle = IDLE_BY_REGIME[regime] || IDLE_DEFAULT;
    idlePair[0] = idle[0];
    idlePair[1] = idle[1];
    if (cards.current === CAP || cards.current === null) cards.mark(cards.current);
  };
  const tourBody = $('tourBody');
  const markStep = () => {
    const b = tourBody.querySelector('b');
    if (b && b.id !== 'tourStep') b.id = 'tourStep';
  };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });

  /* ---------- the amber handle: drag the past state along the diameter, or arrow keys ---------- */
  const viewportPoint = (th1) => {
    const q = sc.p(handleWorld(th1)),
      b = $('cv').getBoundingClientRect();
    return { x: b.left + q[0], y: b.top + q[1] };
  };
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
    const b = $('cv').getBoundingClientRect(),
      x = ev.clientX - b.left,
      y = ev.clientY - b.top;
    let best = clock.t,
      gap = Infinity;
    for (let k = 0; k <= 1200; k++) {
      const th = (k / 1200) * TH_MAX,
        p = sc.p(handleWorld(th)),
        d = hypot(p[0] - x, p[1] - y) + Math.abs(clock.t - th) * 1e-6;
      if (d < gap) {
        gap = d;
        best = th;
      }
    }
    clock.set(best);
  };
  handle.onpointerup = (ev) => {
    if (handle.hasPointerCapture(ev.pointerId)) handle.releasePointerCapture(ev.pointerId);
  };
  handle.onpointercancel = handle.onpointerup;
  handle.onlostpointercapture = () => {
    dragging = null;
    handle.classList.remove('dragging');
  };
  handle.onkeydown = (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(ev.key)) return;
    ev.stopPropagation();
    ev.preventDefault();
    leave();
    const up = ev.key === 'ArrowRight' || ev.key === 'ArrowUp';
    clock.set(ev.key === 'Home' ? 0 : ev.key === 'End' ? TH_MAX : clock.t + (up ? 1 : -1) * deg);
  };
  // the drawer repeats every evidence box of the panel
  $('drawerEvidence').append(...[...document.querySelectorAll('#basis .lean')].map((el) => el.cloneNode(true)));
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));
  TRV.onLang(paint);

  /* ---------- probe, cover, start ---------- */
  window.DYAD_RELATION_DEBUG = Object.freeze({
    get state() {
      const m = calc();
      return JSON.parse(
        JSON.stringify({
          ...m,
          scene: state.scene,
          lens: state.lens,
          cam: state.cam,
          layers: layers(),
          t: clock.t,
          playing: clock.playing,
          preset: cards.current,
          blending: !!(state.from && state.blend < 1),
          camera: { ...sc.cam },
          chart: { prev: chart(m.xPrev), free: chart(m.xFree), next: chart(m.xNext) },
          leanInstances: instances(m)
        })
      );
    },
    /** The mathematics at θ₁ (rad), θ_ctx and ψ (degrees), without touching the page. */
    calc: (th1, thcDeg = 45, psiDeg = 90) => {
      const m = compute(th1, thcDeg * deg, psiDeg * deg);
      return JSON.parse(JSON.stringify({ ...m, leanInstances: instances(m) }));
    },
    presets: JSON.parse(JSON.stringify(presets)),
    /** Viewport coordinates of the amber handle at the angle θ₁, for drag targets. */
    dragTarget: viewportPoint,
    /** Viewport coordinates of a world point of the stage. */
    project: (p) => {
      const q = sc.p(p),
        b = $('cv').getBoundingClientRect();
      return { x: b.left + q[0], y: b.top + q[1] };
    }
  });
  window.TRV_THUMB = () => {
    cards.pick(DEFAULT);
    clock.pause();
    clock.set(PI / 3);
    paint.now();
  };
  cards.pick(cards.initial(DEFAULT));
  booting = false;
  paint.now();
})();
