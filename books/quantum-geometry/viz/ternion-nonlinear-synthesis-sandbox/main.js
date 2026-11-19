/* TERNION//NONLINEAR · 三元数的五种非线性无损表示沙盘 · Five nonlinear lossless representations of the ternion (Chapter 32, §32.4)
   World (kit.solid): z up. One ball fills the stage: its far half is an opaque violet shell (lit from inside, darker
   below the plane of û_A and û_B), its near half is glass. Two rotors share the three sliders: A turns by θ_A about
   û_A, B by θ_B about û_B, and χ is the angle between the axes. The five cards read the same pair on the same ball:
     bch    the exponential ball B_2π (û_A = x, û_B in the xy-plane), drawn so that the shell is ‖θ‖ = π, the half turns
            w = 0; π < ‖θ‖ ≤ 2π lies outside it. The flat sum θ_A + θ_B stays in the plane, the BCH product
            θ_C = log(q_A q_B) leaves it along û_A × û_B; W² + ‖V‖² = 1.
     mrp    the bounded MRP ball B_1, whose shell ‖σ‖ = 1 is the same set w = 0: σ_A ⋆ σ_B by the rational formula (numerator, cross part,
            denominator); the rail turns a probe once about û_A and folds it into the shadow with ε = −1 past 180°.
     hopf   the Bloch sphere as the Hopf base: the triangle P₁ → P₂ → P₃ (P₁ = +z, P₂ on the xz meridian, arcs θ_B/2 and
            θ_A/2, angle π − χ at P₂); the spinor carried by shortest gates turns its fibre phase by −Ω/2.
     turns  the same triangle as Hamilton turns T(P₁↷P₂) = P₁·P₂ + P₁ × P₂: the product of the turns walked so far is
            the single turn T(P₁↷b), +1 when the loop closes, while the shortest gates return the phase e^{−iΩ/2}.
     heap   the exponential ball again: x = q_A, z = q_B and the bridge y on the path x → 1 → z; [x, y, z] = x y⁻¹ z
            carries the arc from y to x over to z; {a, b, a} = (a·a) b − (b·a) a gives K = +1.
   The rail τ ∈ [0, 1] walks each card's path; θ_A, θ_B and χ do not move with it. Every number is computed here; the
   instances of the cited Lean theorems are in instances(). Read-only probe: window.TERNION_NONLINEAR_DEBUG. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI,
    TAU = 2 * PI,
    deg = PI / 180;
  const cs = Math.cos,
    sn = Math.sin,
    hypot = Math.hypot;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, u) => a + (b - a) * u;
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));

  /* ---------- vectors of ℝ³ ---------- */
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const scale = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
  const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const len = (a) => hypot(a[0], a[1], a[2]);
  const unit = (a, fallback) => {
    const n = len(a);
    return n > 1e-12 ? scale(a, 1 / n) : fallback || [0, 0, 1];
  };
  const arc = (a, b) => Math.atan2(len(cross(a, b)), dot3(a, b));
  /** The point a fraction f of the way along the shorter great circle from a to b (unit vectors). An antipodal pair
      (π − arc < 1e-11; the atan2 arc puts exact antipodes within 1e-15 of π, while the nearest distinct vertices the
      sliders reach keep π − arc above 1e-6, where sin(arc) is far from singular) has no shorter great circle: a turns
      by f·π about a fixed unit axis perpendicular to it, as kit.v3.slerp does, so the point stays on the unit sphere. */
  function slerp(a, b, f) {
    const w = arc(a, b);
    if (w < 1e-9) return a.slice();
    if (PI - w < 1e-11) {
      const p = unit(cross(a, Math.abs(a[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])),
        t = f * PI;
      return add(scale(a, cs(t)), scale(cross(p, a), sn(t)));
    }
    const s = sn(w);
    return add(scale(a, sn((1 - f) * w) / s), scale(b, sn(f * w) / s));
  }

  /* ---------- quaternions [w, x, y, z], i j = +k ---------- */
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
  ];
  const qconj = (q) => [q[0], -q[1], -q[2], -q[3]];
  const qvec = (q) => [q[1], q[2], q[3]];
  const qdot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  const qdist = (a, b) => Math.acos(clamp(qdot(a, b), -1, 1));
  /** exp(θ û·e) = cos(θ/2) 1 + sin(θ/2) û·(i, j, k) for the arc vector v = θ û (radians). */
  function qexp(v) {
    const t = len(v);
    if (t < 1e-15) return [1, 0, 0, 0];
    const k = sn(t / 2) / t;
    return [cs(t / 2), v[0] * k, v[1] * k, v[2] * k];
  }
  /** The principal arc vector 2γ V/‖V‖, γ = atan2(‖V‖, W); on the boundary (V = 0, W = −1) along `hint`. */
  function qlog(q, hint) {
    const v = qvec(q),
      s = len(v);
    if (s < 1e-12) return q[0] > 0 ? [0, 0, 0] : scale(unit(hint || [1, 0, 0]), TAU);
    return scale(v, (2 * Math.atan2(s, q[0])) / s);
  }
  /** Shadow MRP: σ in the closed unit ball and the sheet bit ε with q = ε Q(σ); ε = sign(w), +1 on the equator. */
  function mrp(q) {
    const eps = q[0] >= 0 ? 1 : -1;
    return { s: scale(qvec(q), eps / (1 + eps * q[0])), eps };
  }
  /** The inverse stereographic lift Q(σ) = ((1 − ‖σ‖²) 1 + 2σ)/(1 + ‖σ‖²). */
  function Qof(s) {
    const n2 = dot3(s, s),
      d = 1 + n2;
    return [(1 - n2) / d, (2 * s[0]) / d, (2 * s[1]) / d, (2 * s[2]) / d];
  }
  /** The rational composition σ_A ⋆ σ_B (the primary MRP of Q(σ_A) Q(σ_B)). */
  function mrpCompose(a, b) {
    const na = dot3(a, a),
      nb = dot3(b, b);
    const inPlane = add(scale(a, 1 - nb), scale(b, 1 - na)),
      crossPart = scale(cross(a, b), 2);
    const num = add(inPlane, crossPart),
      den = 1 + na * nb - 2 * dot3(a, b);
    return { inPlane, crossPart, num, den, s: Math.abs(den) > 1e-15 ? scale(num, 1 / den) : null };
  }
  /** R(σ) = I + (4(1 − ‖σ‖²)[σ]× + 8[σ]×²)/(1 + ‖σ‖²)². */
  function Rof(s) {
    const n2 = dot3(s, s),
      d = (1 + n2) ** 2,
      X = [
        [0, -s[2], s[1]],
        [s[2], 0, -s[0]],
        [-s[1], s[0], 0]
      ];
    const X2 = X.map((row, i) => row.map((_, j) => row.reduce((acc, x, k) => acc + x * X[k][j], 0)));
    return X.map((row, i) => row.map((x, j) => (i === j ? 1 : 0) + (4 * (1 - n2) * x + 8 * X2[i][j]) / d));
  }
  /** A Hamilton turn T(a↷b) = b a⁻¹ = a·b + a × b for pure unit quaternions a, b. */
  const turn = (a, b) => [dot3(a, b), ...cross(a, b)];

  /* ---------- 2 × 2 complex matrices (Pauli model) and qubit states, entries [re, im] ---------- */
  const C = (re, im = 0) => [re, im];
  const cmul = (x, y) => [x[0] * y[0] - x[1] * y[1], x[0] * y[1] + x[1] * y[0]];
  const cadd = (x, y) => [x[0] + y[0], x[1] + y[1]];
  const cconj = (x) => [x[0], -x[1]];
  const mmul = (X, Y) => X.map((row) => [0, 1].map((j) => cadd(cmul(row[0], Y[0][j]), cmul(row[1], Y[1][j]))));
  const madd = (X, Y) => X.map((row, i) => row.map((x, j) => cadd(x, Y[i][j])));
  const mscale = (X, z) => X.map((row) => row.map((x) => cmul(x, z)));
  const madj = (X) => [0, 1].map((i) => [0, 1].map((j) => cconj(X[j][i])));
  const mgap = (X, Y) => Math.max(...X.flatMap((row, i) => row.map((x, j) => hypot(x[0] - Y[i][j][0], x[1] - Y[i][j][1]))));
  const mv = (M, v) => [cadd(cmul(M[0][0], v[0]), cmul(M[0][1], v[1])), cadd(cmul(M[1][0], v[0]), cmul(M[1][1], v[1]))];
  const vdot = (u, v) => cadd(cmul(cconj(u[0]), v[0]), cmul(cconj(u[1]), v[1]));
  const vgap = (u, v) => Math.max(hypot(u[0][0] - v[0][0], u[0][1] - v[0][1]), hypot(u[1][0] - v[1][0], u[1][1] - v[1][1]));
  const I2 = [
    [C(1), C(0)],
    [C(0), C(1)]
  ];
  const pauli = (r) => [
    [C(r[2]), C(r[0], -r[1])],
    [C(r[0], r[1]), C(-r[2])]
  ];
  const projector = (r) => mscale(madd(I2, pauli(r)), C(0.5));
  /** rotor(a, b) = (1 + (b·σ)(a·σ))/√(2(1 + a·b)); null when b = −a. */
  function rotor(a, b) {
    const d = 2 * (1 + dot3(a, b));
    return d > 1e-12 ? mscale(madd(I2, mmul(pauli(b), pauli(a))), C(1 / Math.sqrt(d))) : null;
  }
  /** The north-chart spinor z₊ = (cos(ϑ/2), e^{iφ} sin(ϑ/2)) of the Bloch direction a: the +1 eigenstate of a·σ. */
  function northSpinor(a) {
    const th = Math.acos(clamp(a[2], -1, 1)),
      ph = Math.atan2(a[1], a[0]);
    return [C(cs(th / 2)), C(cs(ph) * sn(th / 2), sn(ph) * sn(th / 2))];
  }
  /** Normalized projection P_b ψ / √⟨ψ|P_b|ψ⟩. */
  function shortestGate(b, psi) {
    const w = mv(projector(b), psi),
      n = vdot(psi, w)[0];
    return n > 1e-15 ? w.map((x) => [x[0] / Math.sqrt(n), x[1] / Math.sqrt(n)]) : null;
  }
  const dyad = (v) => v.map((x) => v.map((y) => cmul(x, cconj(y))));
  const trace = (X) => cadd(X[0][0], X[1][1]);

  /* ---------- state, cards and views ---------- */
  const MRP_HALF = (4 * Math.atan(0.5)) / deg; // tan(θ/4) = 1/2: θ = 106.2602°
  const SCENES = ['bch', 'mrp', 'hopf', 'turns', 'heap'];
  const state = { scene: 'bch', thetaADeg: 90, thetaBDeg: 90, chiDeg: 90, cam: 'ball', lens: 0, from: null, blend: 1 };
  function eff() {
    if (!state.from || state.blend >= 1) return { thetaADeg: state.thetaADeg, thetaBDeg: state.thetaBDeg, chiDeg: state.chiDeg };
    const b = state.blend,
      f = state.from;
    return { thetaADeg: lerp(f.thetaADeg, state.thetaADeg, b), thetaBDeg: lerp(f.thetaBDeg, state.thetaBDeg, b), chiDeg: lerp(f.chiDeg, state.chiDeg, b) };
  }
  const cams = { panorama: [-0.74, 0.36, 1], ball: [-0.8, 0.44, 1.16], sphere: [-2.36, 0.5, 1.02] };
  const presets = Object.fromEntries(
    [
      ['bch-curved-ball-synthesis', 'bch', 90, 90, 90, 'ball', true, 'end'],
      ['dual-chart-rational-mrp', 'mrp', MRP_HALF, MRP_HALF, 90, 'panorama', true, 0.75],
      ['hopf-fiber-berry-twist', 'hopf', 180, 180, 90, 'sphere', true, 'end'],
      ['hamilton-spherical-turns', 'turns', 180, 180, 90, 'sphere', true, 'end'],
      ['prufer-baer-heap-torsor', 'heap', 180, 180, 90, 'panorama', true, 0.5]
    ].map(([id, scene, thetaADeg, thetaBDeg, chiDeg, cam, play, still]) => [id, { scene, thetaADeg, thetaBDeg, chiDeg, cam, play, still }])
  );
  const ids = Object.keys(presets);

  /* ---------- the shared pair, its triangle and the five paths ---------- */
  /** The Hamilton-turn triangle of the pair: P₁ = +z, P₂ at arc θ_B/2 on the xz meridian, P₃ at arc θ_A/2 from P₂ with
      angle ψ = π − χ at P₂ from the direction towards P₁. Then T(P₁↷P₂) is B and T(P₂↷P₃) is A, up to a rotation. */
  function triangle(thA, thB, chi) {
    const lB = thB / 2,
      lA = thA / 2,
      psi = PI - chi;
    const P1 = [0, 0, 1],
      P2 = [sn(lB), 0, cs(lB)],
      t1 = [-cs(lB), 0, sn(lB)];
    const P3 = add(scale(P2, cs(lA)), scale(add(scale(t1, cs(psi)), [0, sn(psi), 0]), sn(lA)));
    return { V: [P1, P2, P3], t1 };
  }
  /** Where the loop P₁ → P₂ → P₃ → P₁ is at τ (by arc length): the base point b, the edge k and how far along it. */
  function loopAt(V, tau) {
    const lens = [0, 1, 2].map((k) => arc(V[k], V[(k + 1) % 3])),
      total = lens[0] + lens[1] + lens[2];
    if (total < 1e-9) return { b: V[0].slice(), k: 0, f: 0, lens };
    let s = clamp(tau, 0, 1) * total,
      k = 0;
    while (k < 2 && s > lens[k]) s -= lens[k++];
    const f = lens[k] > 1e-12 ? clamp(s / lens[k], 0, 1) : 1;
    return { b: slerp(V[k], V[(k + 1) % 3], f), k, f, lens };
  }
  /** The spinor carried from z₊(P₁) by shortest gates along the loop to τ (horizontal: ⟨ψ|dψ⟩ = 0); null at b = −a. */
  function liftAt(V, tau) {
    const at = loopAt(V, tau);
    let psi = northSpinor(V[0]);
    for (let j = 0; j < at.k; j++) {
      const R = rotor(V[j], V[j + 1]);
      if (!R) return null;
      psi = mv(R, psi);
    }
    const R = rotor(V[at.k], at.b);
    return R ? { psi: mv(R, psi), at } : null;
  }
  const arg = (z) => Math.atan2(z[1], z[0]);
  /** The fibre coordinates of a spinor: ψ₊ = arg z₁ (north chart), ψ₋ = arg z₂ (south chart); ψ₋ − ψ₊ = φ. */
  const fibre = (psi) => ({ plus: hypot(...psi[0]) > 1e-9 ? arg(psi[0]) : null, minus: hypot(...psi[1]) > 1e-9 ? arg(psi[1]) : null });
  /** The bridge y on the heap path x → 1 → z (straight in the exponential chart). */
  function bridgeAt(e, tau) {
    const thA = e.thetaADeg * deg,
      thB = e.thetaBDeg * deg,
      uB = [cs(e.chiDeg * deg), sn(e.chiDeg * deg), 0];
    return tau <= 0.5 ? qexp([(1 - 2 * tau) * thA, 0, 0]) : qexp(scale(uB, (2 * tau - 1) * thB));
  }
  /** The product word path: first A (arc θ_A about û_A), then B; by angle. */
  function wordAt(e, tau) {
    const thA = e.thetaADeg * deg,
      thB = e.thetaBDeg * deg,
      uB = [cs(e.chiDeg * deg), sn(e.chiDeg * deg), 0],
      s = clamp(tau, 0, 1) * (thA + thB);
    const qA = qexp([thA, 0, 0]);
    if (s <= thA) return { q: qexp([s, 0, 0]), flat: [s, 0, 0] };
    return { q: qmul(qA, qexp(scale(uB, s - thA))), flat: add([thA, 0, 0], scale(uB, s - thA)) };
  }
  const spinAt = (tau) => qexp([TAU * clamp(tau, 0, 1), 0, 0]);

  /** Everything the page shows, from the (blended) state and the rail. */
  function calculate(tauIn) {
    const e = eff(),
      tau = tauIn == null ? clock.t : tauIn;
    const thA = e.thetaADeg * deg,
      thB = e.thetaBDeg * deg,
      chi = e.chiDeg * deg;
    const uA = [1, 0, 0],
      uB = [cs(chi), sn(chi), 0];
    const qA = qexp(scale(uA, thA)),
      qB = qexp(scale(uB, thB)),
      qC = qmul(qA, qB);
    // the closed BCH form, written out
    const al = thA / 2,
      be = thB / 2;
    const W = cs(al) * cs(be) - dot3(uA, uB) * sn(al) * sn(be);
    const crossTerm = scale(cross(uA, uB), sn(al) * sn(be));
    const V = add(add(scale(uA, sn(al) * cs(be)), scale(uB, cs(al) * sn(be))), crossTerm);
    const hint = len(cross(uA, uB)) > 1e-9 ? cross(uA, uB) : uA;
    const thetaC = qlog(qC, hint),
      thetaLin = add(scale(uA, thA), scale(uB, thB)),
      qLin = qexp(thetaLin);
    // MRP: the bounded pair and their rational product
    const mA = mrp(qA),
      mB = mrp(qB),
      comp = mrpCompose(mA.s, mB.s);
    let sAB = comp.s,
      epsAB = mA.eps * mB.eps,
      folded = false;
    if (sAB && dot3(sAB, sAB) > 1) {
      sAB = scale(sAB, -1 / dot3(sAB, sAB));
      epsAB = -epsAB;
      folded = true;
    }
    // the triangle and its shortest-gate holonomy
    const tri = triangle(thA, thB, chi),
      [a, b, c] = tri.V;
    const S = 1 + dot3(a, b) + dot3(b, c) + dot3(c, a),
      D = dot3(a, cross(b, c)),
      SD = S * S + D * D,
      // |S + iD| itself, not its square: a near-antipodal loop such as (0.04°, 359.96°, 1°) has |S + iD| ≈ 2.1e-9
      // and a well-defined return phase, while exact antipodes leave only rounding (|S + iD| < 1e-15)
      SDabs = hypot(S, D);
    const holo = SDabs >= 1e-12 ? { re: S / SDabs, im: -D / SDabs } : null;
    const omega = SDabs >= 1e-12 ? 2 * Math.atan2(D, S) : null;
    const T12 = turn(a, b),
      T23 = turn(b, c),
      T31 = turn(c, a),
      T13 = turn(a, c);
    // the heap
    const x = qA,
      z = qB,
      y = bridgeAt(e, tau);
    const heap = qmul(qmul(x, qconj(y)), z),
      mirror = qmul(qmul(z, qconj(y)), x);
    const bracket = sub(scale(uB, dot3(uA, uA)), scale(uA, dot3(uB, uA))),
      area2 = dot3(cross(uA, uB), cross(uA, uB));
    // the cursor of the current card's path
    let cursor;
    if (state.scene === 'bch') {
      const w = wordAt(e, tau);
      cursor = { q: w.q, flat: w.flat };
    } else if (state.scene === 'mrp') cursor = { q: spinAt(tau), spinDeg: 360 * clamp(tau, 0, 1) };
    else if (state.scene === 'heap') cursor = { q: y };
    else {
      const at = loopAt(tri.V, tau);
      cursor = { q: turn(a, at.b), base: at.b, edge: at.k };
    }
    const lifted = state.scene === 'hopf' || state.scene === 'turns' ? liftAt(tri.V, tau) : null;
    return {
      scene: state.scene,
      lens: state.lens,
      cam: state.cam,
      tau,
      thetaADeg: e.thetaADeg,
      thetaBDeg: e.thetaBDeg,
      chiDeg: e.chiDeg,
      uA,
      uB,
      qA,
      qB,
      qC,
      W,
      V,
      unitNorm: W * W + dot3(V, V),
      crossTerm,
      thetaC,
      thetaCDeg: len(thetaC) / deg,
      thetaLin,
      gap: len(sub(thetaLin, thetaC)),
      geodesic: qdist(qLin, qC),
      chord: 2 + 2 * qdot(qA, qB),
      mrp: { A: mA, B: mB, ...comp, sAB, epsAB, folded, R: sAB ? Rof(sAB) : null },
      cursor: { ...cursor, ...mrp(cursor.q) },
      triangle: tri.V,
      S,
      D,
      SD,
      omega,
      holonomy: holo,
      turns: { T12, T23, T31, T13, T23T12: qmul(T23, T12), loop: qmul(T31, qmul(T23, T12)) },
      fibre: lifted ? { ...fibre(lifted.psi), psi: lifted.psi } : null,
      heap: { x, y, z, xyz: heap, zyx: mirror, gap: qdist(heap, mirror), carried: qdist(z, heap), original: qdist(y, x) },
      lie: { bracket, curvature: area2 > 1e-12 ? dot3(bracket, uB) / area2 : null },
      twoAxis: cs(chi) ** 2 < 1 - 1e-12
    };
  }

  /* ---------- the instances of the cited Lean theorems, computed here ---------- */
  function instances(m) {
    const [a, b, c] = m.triangle;
    // 1 · the product of two pure unit quaternions carries the cross product with ε = + (i j = +k), and the BCH closed
    //     form (W, V) agrees with the quaternion product q_A q_B
    const ij = qmul([0, 1, 0, 0], [0, 0, 1, 0]);
    const closed = Math.max(Math.abs(m.W - m.qC[0]), ...sub(m.V, qvec(m.qC)).map(Math.abs));
    // 2 · Lagrange–Gram on u = û_A, v = û_B
    const u = m.uA,
      v = m.uB;
    let half = 0;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) half += (u[i] * v[j] - u[j] * v[i]) ** 2;
    const lagrange = { lhs: dot3(u, u) * dot3(v, v) - dot3(u, v) ** 2, rhs: half / 2, unit: dot3(u, v) ** 2 + dot3(cross(u, v), cross(u, v)) };
    // 3 · rotor(a, b) on the three edges: unitary, carries a·σ to b·σ, equals the normalized projection on z₊(a)
    const edges = [
      [a, b],
      [b, c],
      [c, a]
    ].map(([p, q]) => {
      const R = rotor(p, q);
      if (!R) return null;
      const psi = northSpinor(p),
        G = shortestGate(q, psi);
      return {
        unitary: mgap(mmul(R, madj(R)), I2),
        conj: mgap(mmul(mmul(R, pauli(p)), madj(R)), pauli(q)),
        projection: G ? vgap(mv(R, psi), G) : null
      };
    });
    // 4 · the three rotors around the loop and the three sequential projections
    let holonomy = null;
    const Rab = rotor(a, b),
      Rbc = rotor(b, c),
      Rca = rotor(c, a);
    if (Rab && Rbc && Rca && m.holonomy) {
      const prod = mmul(Rca, mmul(Rbc, Rab)),
        k = 1 / hypot(m.S, m.D);
      const want = mscale(madd(mscale(I2, C(m.S)), mscale(pauli(a), C(0, -m.D))), C(k));
      const psi = northSpinor(a),
        back = shortestGate(a, shortestGate(c, shortestGate(b, psi)) || psi);
      const phase = C(m.S * k, -m.D * k);
      holonomy = {
        gram: Math.abs(m.SD - 2 * (1 + dot3(a, b)) * (1 + dot3(b, c)) * (1 + dot3(c, a))),
        product: mgap(prod, want),
        phase,
        returned: back ? vgap(back, psi.map((x) => cmul(x, phase))) : null
      };
    }
    // 5 · Tr(P₁P₂P₃) = (S + iD)/4
    const tr = trace(mmul(projector(a), mmul(projector(b), projector(c))));
    // 6 · the Bargmann trace of the three north-chart spinors is the cyclic product of overlaps
    const sa = northSpinor(a),
      sb = northSpinor(b),
      sc3 = northSpinor(c);
    const chain = trace(mmul(dyad(sa), mmul(dyad(sb), dyad(sc3))));
    const overlaps = cmul(cmul(vdot(sa, sb), vdot(sb, sc3)), vdot(sc3, sa));
    // 8 · the lift z = e^{iϑ/2} of the base path z² = e^{iϑ}; ϑ = 360° ends at −1
    const spin = m.scene === 'mrp' ? m.cursor.spinDeg * deg : 0;
    return {
      cross: { ij, closed, epsilon: ij[3] > 0 ? 1 : -1 },
      lagrange,
      rotor: edges,
      holonomy,
      bargmann3: { trace: tr, want: [m.S / 4, m.D / 4], gap: hypot(tr[0] - m.S / 4, tr[1] - m.D / 4) },
      bargmannPath: { trace: chain, product: overlaps, gap: hypot(chain[0] - overlaps[0], chain[1] - overlaps[1]) },
      twoAxis: { hypothesis: m.twoAxis, cos2: cs(m.chiDeg * deg) ** 2 },
      lift: { z: [cs(spin / 2), sn(spin / 2)], base: [cs(spin), sn(spin)], sheet: m.scene === 'mrp' ? m.cursor.eps : null }
    };
  }

  /* ---------- formatting ---------- */
  const f4 = (x) => kit.fix(x, 4);
  const s4 = (x) => kit.sgn(x, 4);
  const vec = (v, d = 4) => '(' + v.map((x) => kit.fix(x, d)).join(', ') + ')';
  /** p/q with q ≤ 999 when x is that rational to 1e-9, else null. */
  function frac(x) {
    if (Math.abs(x - Math.round(x)) < 1e-9) return kit.fix(Math.round(x), 0);
    for (let q = 2; q < 1000; q++) {
      const p = Math.round(x * q);
      if (Math.abs(x - p / q) < 1e-9) return (p < 0 ? '−' : '') + Math.abs(p) + '/' + q;
    }
    return null;
  }
  const fracVec = (v) => (v.every((x) => frac(x) != null) ? '(' + v.map(frac).join(', ') + ')' : null);
  /** ±1, ±i, ±j, ±k by name, else the four components. */
  function quatName(q) {
    const names = ['1', 'i', 'j', 'k'];
    for (let k = 0; k < 4; k++)
      if (Math.abs(Math.abs(q[k]) - 1) < 1e-9) return (q[k] < 0 ? '−' : '+') + names[k];
    return '(' + q.map((x) => kit.fix(x, 3)).join(', ') + ')';
  }
  // the composition star: ⋆ is a dot at text size, so the page sets a black star (.star)
  const STAR = '<span class="star">★</span>';
  const complex = (z) => kit.fix(z[0], 4) + (z[1] < -5e-5 ? ' − ' : ' + ') + kit.fix(Math.abs(z[1]), 4) + 'i';

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    handle = $('ternionHandle');
  const opts = { canvas: $('cv'), yaw: cams.ball[0], pitch: cams.ball[1], zoom: cams.ball[2], radius: 0.3, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const tube = (key, points, color, width, extra = {}) => sc.tube(key, points, { color, width, glow: 0.25, occlude: false, ...extra });
  // the shell sits a little outside the unit sphere, so that points that lie exactly on w = 0 (or on S²) stay in front
  // of its opaque half; a fixed antipodal pair of beads just outside it: one in front of the opening frame, one behind
  const SHELL = 1.035;
  const SEAM = unit([0.14, -0.98, -0.08]);
  /** The far half of the ball, opaque and lit from inside; darker below the plane of û_A and û_B (z < 0). */
  function shell() {
    const D = sc.facing(),
      pole = scale(D, -1),
      e1 = unit(cross(Math.abs(pole[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0], pole)),
      e2 = cross(pole, e1);
    const at = (u, v) => {
      const a = TAU * u,
        b = (PI / 2) * v;
      return scale(add(scale(pole, cs(b)), scale(add(scale(e1, cs(a)), scale(e2, sn(a))), sn(b))), SHELL);
    };
    sc.surface('shell', at, { nu: 96, nv: 22, value: (u, v) => at(u, v)[2] / SHELL, colors: [P.panelEdge, P.violet], range: [-1.1, 1.75] });
    sc.glass('glass', [0, 0, 0], SHELL, { color: P.sigma, alpha: 0.035, rim: 0.26 });
    // the equator and two meridians, a hair inside the shell so that the far halves stay in front of it
    const ring = (n, r, alpha) => sc.circle([0, 0, 0], n, r, { color: P.sigma, width: 1, alpha, fade: false });
    ring([0, 0, 1], 1, 0.32);
    if (state.lens) {
      ring([1, 0, 0], 1, 0.16);
      ring([0, 1, 0], 1, 0.16);
    }
    sc.bead(scale(SEAM, SHELL + 0.035), { color: P.violet, r: 3.6, key: 'seamFront', glow: 0.4 });
    sc.bead(scale(SEAM, -(SHELL + 0.035)), { color: P.violet, r: 3.6, key: 'seamBack', glow: 0.4 });
    if (state.lens) {
      const seam = { bch: '±π û', heap: '±π û', mrp: '(σ, +1) ∼ (−σ, −1)', hopf: 'T(P↷−P) = −1', turns: 'T(P↷−P) = −1' }[state.scene];
      sc.tag('seam', scale(SEAM, SHELL + 0.16), seam, 'raw backed c-vi');
    }
  }
  function axes() {
    if (!state.lens) return; // the origin-free reading draws no coordinate axes
    // the ball cards chart S³ by the generators i, j, k; the sphere cards are the Bloch sphere with x, y, z
    const names = state.scene === 'hopf' || state.scene === 'turns' ? ['x', 'y', 'z'] : ['i', 'j', 'k'];
    [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ].forEach((d, k) => {
      sc.line([scale(d, -0.98), scale(d, 0.98)], { color: P.dim, width: 1, alpha: 0.5, dash: [3, 4] });
      sc.tag('axis' + k, scale(d, 1.1), names[k], 'raw c-dm');
    });
  }
  /** A stage label; a label whose point lies inside the shell is never dimmed (only the opaque far half of the shell,
      outside the content, could hide anything), even when its anchor is set a little outside. */
  const label = (key, p, zh, en, color, base) => sc.tag(key, p, L(zh, en), 'raw backed c-' + color, base && len(base) <= 1.0001 ? { occlude: false } : undefined);

  /* scene: the exponential ball B_2π; the shell is ‖θ‖ = π (w = 0), so the chart is drawn at 1/π */
  const ballBCH = (v) => scale(v, 1 / PI);
  function drawBCH(m) {
    const wA = ballBCH(scale(m.uA, m.thetaADeg * deg)),
      wB = ballBCH(scale(m.uB, m.thetaBDeg * deg));
    const wC = ballBCH(m.thetaC),
      wLin = ballBCH(m.thetaLin);
    sc.arrow([0, 0, 0], wA, { color: P.sigma, width: 2.6 });
    sc.arrow([0, 0, 0], wB, { color: P.sigma, width: 2.6 });
    // flat: the parallelogram and its diagonal stay in the plane
    sc.line([wA, wLin], { color: P.magenta, width: 1.4, dash: [4, 4], alpha: 0.85 });
    sc.line([wB, wLin], { color: P.magenta, width: 1.4, dash: [4, 4], alpha: 0.5 });
    sc.arrow([0, 0, 0], wLin, { color: P.magenta, width: 2.4 });
    // curved: the word path 1 → A → AB in the exponential chart, and the product
    const path = sample(72, (t) => wordAt(m, t)),
      hintOf = (q) => (len(qvec(q)) > 1e-9 ? qvec(q) : m.uA);
    const curve = path.map((w) => ballBCH(qlog(w.q, hintOf(w.q))));
    tube('wordPath', curve, P.violet, 1.6, { alpha: 0.55 });
    const k = Math.round(clamp(m.tau, 0, 1) * 72);
    if (k > 0) tube('wordDone', curve.slice(0, k + 1), P.violet, 3.2, { glow: 0.45 });
    sc.arrow([0, 0, 0], wC, { color: P.violet, width: 3 });
    sc.bead(wC, { color: P.violet, r: 4.6, key: 'product' });
    // the lift out of the plane (along û_A × û_B) and the gap to the flat sum
    const foot = [wC[0], wC[1], 0];
    if (Math.abs(wC[2]) > 1e-4) sc.line([foot, wC], { color: P.magenta, width: 1.2, dash: [2, 3], alpha: 0.8 });
    if (m.gap > 1e-6) sc.line([wLin, wC], { color: P.magenta, width: 2, dash: [5, 3] });
    // the cursor on the curved word, its flat twin on the flat word
    sc.bead(ballBCH(m.cursor.flat), { color: P.magenta, r: 3, key: 'flatTwin' });
    sc.bead(ballBCH(qlog(m.cursor.q, hintOf(m.cursor.q))), { color: P.amber, r: 4.4, key: 'cursor' });
    const lens = state.lens;
    label('A', add(wA, [0.02, -0.05, -0.05]), lens ? 'θ<sub>A</sub>' : 'A', lens ? 'θ<sub>A</sub>' : 'A', 'sg', wA);
    label('B', add(wB, [-0.04, 0.04, 0.05]), lens ? 'θ<sub>B</sub>' : 'B', lens ? 'θ<sub>B</sub>' : 'B', 'sg', wB);
    label('sum', add(wLin, [0.05, 0.02, -0.06]), lens ? 'θ<sub>A</sub> + θ<sub>B</sub>' : '平直和', lens ? 'θ<sub>A</sub> + θ<sub>B</sub>' : 'flat sum', 'mg', wLin);
    label('prod', add(wC, [0, 0, 0.1]), lens ? 'θ<sub>C</sub> = log(q<sub>A</sub>q<sub>B</sub>)' : 'A ' + STAR + ' B', lens ? 'θ<sub>C</sub> = log(q<sub>A</sub>q<sub>B</sub>)' : 'A ' + STAR + ' B', 'vi', wC);
    if (m.gap > 1e-6) label('gap', scale(add(wLin, wC), 0.5), f4(m.gap) + ' rad', f4(m.gap) + ' rad', 'mg', scale(add(wLin, wC), 0.5));
  }

  /* scene: the bounded MRP ball B_1 */
  function drawMRP(m) {
    const M = m.mrp,
      sA = M.A.s,
      sB = M.B.s;
    sc.arrow([0, 0, 0], sA, { color: P.sigma, width: 2.4 });
    sc.arrow([0, 0, 0], sB, { color: P.sigma, width: 2.4 });
    if (M.sAB) {
      if (!M.folded && Math.abs(M.den) > 1e-9 && len(M.num) < 1.6) {
        // numerator: the two flat parts (cyan), then the cross part (magenta); the denominator shrinks it onto σ_A ⋆ σ_B
        sc.line([scale(sA, 1 - dot3(sB, sB)), M.inPlane], { color: P.cyan, width: 1, dash: [3, 3], alpha: 0.7 });
        sc.line([scale(sB, 1 - dot3(sA, sA)), M.inPlane], { color: P.cyan, width: 1, dash: [3, 3], alpha: 0.7 });
        sc.arrow([0, 0, 0], M.inPlane, { color: P.cyan, width: 1.8 });
        if (len(M.crossPart) > 1e-6) sc.arrow(M.inPlane, M.num, { color: P.magenta, width: 2.2 });
        sc.line([M.sAB, M.num], { color: P.cyan, width: 1.6, dash: [2, 3] });
        label('den', add(M.num, [0.03, 0, 0.07]), state.lens ? '÷ (1 + ‖σ<sub>A</sub>‖²‖σ<sub>B</sub>‖² − 2σ<sub>A</sub>·σ<sub>B</sub>)' : '÷ ' + (frac(M.den) || f4(M.den)), state.lens ? '÷ (1 + ‖σ<sub>A</sub>‖²‖σ<sub>B</sub>‖² − 2σ<sub>A</sub>·σ<sub>B</sub>)' : '÷ ' + (frac(M.den) || f4(M.den)), 'cy');
      }
      sc.arrow([0, 0, 0], M.sAB, { color: P.violet, width: 3 });
      sc.bead(M.sAB, { color: P.violet, r: 4.6, key: 'product' });
      const exact = fracVec(M.sAB);
      label('prod', add(M.sAB, [-0.05, -0.02, 0.1]), exact || 'σ<sub>A</sub> ' + STAR + ' σ<sub>B</sub>', exact || 'σ<sub>A</sub> ' + STAR + ' σ<sub>B</sub>', 'vi');
    }
    label('A', add(sA, [0.04, -0.06, -0.06]), 'σ<sub>A</sub>', 'σ<sub>A</sub>', 'sg');
    label('B', add(sB, [-0.02, 0.05, 0.06]), 'σ<sub>B</sub>', 'σ<sub>B</sub>', 'sg');
    // the probe: once round û_A; the primary half in cyan, the shadow half in magenta, the jump over the top
    sc.line([[-1, 0, 0], [1, 0, 0]], { color: P.sigma, width: 1, dash: [2, 4], alpha: 0.55 });
    const spin = m.cursor.spinDeg;
    const s1 = Math.min(spin, 180);
    if (s1 > 0.05) tube('primary', sample(40, (t) => [Math.tan((t * s1 * deg) / 4), 0, 0]), P.cyan, 3.2);
    if (spin > 180) {
      const s2 = spin - 180;
      tube('shadow', sample(40, (t) => [-1 / Math.tan(((180 + t * s2) * deg) / 4), 0, 0]), P.magenta, 3.2);
      sc.line(sample(48, (t) => [cs(PI * t) * 1.05, -0.18 * sn(PI * t), sn(PI * t) * 1.05]), { color: P.magenta, width: 1.4, dash: [5, 4] });
    }
    sc.bead(m.cursor.s, { color: P.amber, r: 4.4, key: 'cursor' });
    label('sheet', add(m.cursor.s, [0, -0.08, -0.12]), 'ε = ' + (m.cursor.eps > 0 ? '+1' : '−1'), 'ε = ' + (m.cursor.eps > 0 ? '+1' : '−1'), m.cursor.eps > 0 ? 'cy' : 'mg');
  }

  /* the triangle on the unit sphere, shared by the Hopf and the turn cards */
  const onSphere = (p, r = 1.004) => scale(unit(p), r);
  function excessPatch(V) {
    const [A, B, Cc] = V;
    if (len(cross(sub(B, A), sub(Cc, A))) < 1e-6) return;
    sc.surface(
      'excess',
      (u, v) => {
        const inner = add(scale(A, 1 - u), scale(B, u));
        return onSphere(add(scale(inner, 1 - v), scale(Cc, v)), 1.003);
      },
      { nu: 18, nv: 14, color: P.magenta, alpha: 0.26, pick: false }
    );
  }
  const greatArc = (a, b, n = 40, r = 1.006) => sample(n, (t) => scale(slerp(a, b, t), r));
  /** The screen axes of the camera: right R and up U. */
  function screenAxes() {
    const y = sc.cam.yaw,
      p = sc.cam.pitch;
    return { R: [cs(y), -sn(y), 0], U: [sn(y) * sn(p), cs(y) * sn(p), cs(p)] };
  }
  /** The fibre S¹ over the base point bp, drawn as a dial that faces the reader at the upper right of the sphere with a
      dashed lead to bp: the zero tick points up, the pointer stands at the fibre angle ψ (counter-clockwise positive)
      and the magenta stretch runs from the tick to the pointer. Returns the centre of the dial. */
  const DIAL = { right: 1.38, up: 0.72, radius: 0.21 };
  function fibreDial(key, bp, psi) {
    const { R, U } = screenAxes(),
      radius = DIAL.radius,
      c = add(scale(R, DIAL.right), scale(U, DIAL.up)),
      at = (t) => add(c, add(scale(U, radius * cs(t)), scale(R, -radius * sn(t))));
    tube(key + 'Ring', sample(64, (t) => at(t * TAU)), P.violet, 2, { glow: 0.3 });
    sc.line([scale(bp, 1.01), add(c, scale(unit(sub(scale(bp, 1.01), c)), radius))], { color: P.violet, width: 1, dash: [2, 3], alpha: 0.7 });
    sc.line([add(c, scale(U, radius * 0.7)), add(c, scale(U, radius * 1.25))], { color: P.sigma, width: 2.2 });
    if (psi == null) return c;
    if (Math.abs(psi) > 1e-4) tube(key + 'Phase', sample(24, (t) => at(t * psi)), P.magenta, 4, { glow: 0.45 });
    sc.arrow(c, add(c, scale(sub(at(psi), c), 0.92)), { color: P.violet, width: 2.4, headSize: 9 });
    return c;
  }
  function vertices(V, names) {
    V.forEach((p, k) => {
      sc.bead(onSphere(p, 1.008), { color: P.sigma, r: 3.8, key: 'P' + (k + 1) });
      label('P' + k, scale(p, 1.13), names[k], names[k], 'sg');
    });
  }
  const vertexNames = (V) =>
    V.map((p, k) => {
      const name = 'P<sub>' + (k + 1) + '</sub>';
      if (!state.lens) return name;
      const axis = [0, 1, 2].find((j) => Math.abs(Math.abs(p[j]) - 1) < 1e-9);
      return axis == null ? name : name + ' = ' + (p[axis] > 0 ? '+' : '−') + 'xyz'[axis];
    });
  function drawHopf(m) {
    const V = m.triangle;
    excessPatch(V);
    for (let k = 0; k < 3; k++) tube('edge' + k, greatArc(V[k], V[(k + 1) % 3]), P.cyan, 1.4, { alpha: 0.5 });
    const at = loopAt(V, m.tau);
    const walked = [];
    for (let k = 0; k < at.k; k++) walked.push(...greatArc(V[k], V[k + 1], 30));
    walked.push(...greatArc(V[at.k], at.b, Math.max(2, Math.round(30 * at.f))));
    if (m.tau > 1e-4) tube('walked', walked, P.cyan, 3.4, { glow: 0.4 });
    vertices(V, vertexNames(V));
    const plus = m.fibre ? m.fibre.plus : null;
    const dial = fibreDial('fibre', at.b, plus);
    sc.bead(onSphere(at.b, 1.01), { color: P.amber, r: 4.6, key: 'cursor' });
    if (m.omega != null && Math.abs(m.omega) > 1e-6)
      label('omega', onSphere(add(add(V[0], V[1]), V[2]), 1.02), 'Ω = ' + f4(m.omega) + ' sr', 'Ω = ' + f4(m.omega) + ' sr', 'mg');
    if (plus != null) label('phase', add(dial, scale(screenAxes().U, -0.3)), (state.lens ? 'ψ₊ = ' : '纤维相位 ') + s4(plus), (state.lens ? 'ψ₊ = ' : 'fibre phase ') + s4(plus), 'vi');
  }
  function drawTurns(m) {
    const V = m.triangle;
    excessPatch(V);
    const arrowArc = (key, a, b, dashed) => {
      const pts = greatArc(a, b, 40, 1.008);
      if (arc(a, b) < 1e-6) return;
      if (dashed) sc.line(pts, { color: P.cyan, width: 2, dash: [5, 4] });
      else tube(key, pts, P.cyan, 2.6, { glow: 0.3 });
      sc.arrow(pts[33], pts[38], { color: P.cyan, width: 2.2, headSize: 11 });
    };
    arrowArc('T12', V[0], V[1]);
    arrowArc('T23', V[1], V[2]);
    arrowArc('T31', V[2], V[0], true);
    // the product of the turns walked so far is the single turn from P₁ to the current point
    const at = loopAt(V, m.tau);
    if (arc(V[0], at.b) > 1e-4) tube('product', greatArc(V[0], at.b, 40, 1.016), P.violet, 3.6, { glow: 0.45 });
    vertices(V, vertexNames(V));
    sc.bead(onSphere(at.b, 1.012), { color: P.amber, r: 4.6, key: 'cursor' });
    // the phase dial at P₁: the spinor carried by shortest gates, read in the north chart
    const dial = fibreDial('dial', V[0], m.fibre ? m.fibre.plus : null);
    const lens = state.lens;
    const name = (k) => ['T(P<sub>1</sub>↷P<sub>2</sub>)', 'T(P<sub>2</sub>↷P<sub>3</sub>)', 'T(P<sub>3</sub>↷P<sub>1</sub>)'][k];
    [
      [0, 1],
      [1, 2],
      [2, 0]
    ].forEach(([i, j], k) => {
      if (arc(V[i], V[j]) < 1e-6) return;
      const mid = onSphere(slerp(V[i], V[j], 0.5), 1.08);
      label('turn' + k, mid, lens ? name(k) : 'T<sub>' + (i + 1) + (j + 1) + '</sub>', lens ? name(k) : 'T<sub>' + (i + 1) + (j + 1) + '</sub>', 'cy');
    });
    if (m.holonomy) label('dialTag', add(dial, scale(screenAxes().U, -0.34)), 'e<sup>−iΩ/2</sup> = ' + complex([m.holonomy.re, m.holonomy.im]), 'e<sup>−iΩ/2</sup> = ' + complex([m.holonomy.re, m.holonomy.im]), 'vi');
  }

  /* scene: the heap on the exponential ball */
  function drawHeap(m) {
    const H = m.heap,
      at = (q) => ballBCH(qlog(q, len(qvec(q)) > 1e-9 ? qvec(q) : [0, 0, 1]));
    const L0 = qlog(qmul(H.x, qconj(H.y)), [0, 0, 1]);
    const carry = (base) => sample(40, (t) => at(qmul(qexp(scale(L0, t)), base)));
    // the bridge path x → 1 → z, the arc from y to x and the same arc carried to z
    sc.line([at(H.x), [0, 0, 0], at(H.z)], { color: P.sigma, width: 1, dash: [2, 4], alpha: 0.6 });
    if (len(L0) > 1e-6) {
      sc.line(carry(H.y), { color: P.sigma, width: 1.6, dash: [5, 3] });
      tube('carried', carry(H.z), P.violet, 2.8, { glow: 0.4 });
    }
    if (m.tau > 0.01) tube('trace', sample(48, (t) => at(qmul(qmul(H.x, qconj(bridgeAt(m, t * m.tau))), H.z))), P.violet, 1.4, { alpha: 0.5 });
    // the tangent space at 1: a, b, a × b and the Lie triple bracket {a, b, a}
    const r = 0.3;
    sc.arrow([0, 0, 0], scale(m.uA, r), { color: P.sigma, width: 1.6, headSize: 7 });
    sc.arrow([0, 0, 0], scale(m.uB, r), { color: P.sigma, width: 1.6, headSize: 7 });
    if (len(cross(m.uA, m.uB)) > 1e-6) sc.arrow([0, 0, 0], scale(cross(m.uA, m.uB), r), { color: P.magenta, width: 1.6, headSize: 7 });
    if (len(m.lie.bracket) > 1e-6) sc.arrow([0, 0, 0], scale(m.lie.bracket, r * 0.86), { color: P.cyan, width: 2.6, headSize: 8 });
    sc.bead(at(H.x), { color: P.sigma, r: 4, key: 'x' });
    sc.bead(at(H.z), { color: P.sigma, r: 4, key: 'z' });
    sc.bead(at(H.zyx), { color: P.magenta, r: 4.4, key: 'mirror' });
    sc.bead(at(H.xyz), { color: P.violet, r: 4.8, key: 'product' });
    sc.bead(at(H.y), { color: P.amber, r: 4.4, key: 'cursor' });
    label('x', add(at(H.x), [0.05, -0.04, -0.07]), 'x', 'x', 'sg', at(H.x));
    label('z', add(at(H.z), [-0.03, 0.05, -0.08]), 'z', 'z', 'sg', at(H.z));
    label('y', add(at(H.y), [-0.06, -0.06, 0.06]), 'y', 'y', 'ik', at(H.y));
    label('xyz', add(at(H.xyz), [0.04, 0, 0.09]), '[x, y, z] = ' + quatName(H.xyz), '[x, y, z] = ' + quatName(H.xyz), 'vi', at(H.xyz));
    label('zyx', add(at(H.zyx), [0.04, 0, -0.09]), '[z, y, x] = ' + quatName(H.zyx), '[z, y, x] = ' + quatName(H.zyx), 'mg', at(H.zyx));
    if (state.lens && len(m.lie.bracket) > 1e-6) label('lie', scale(m.lie.bracket, r * 1.35), '{a, b, a}', '{a, b, a}', 'cy');
  }

  /* ---------- HUD, legend and labels ---------- */
  const LENS_NAME = [
    ['无原点合成', 'ORIGIN-FREE'],
    ['非线性几何', 'GEOMETRY']
  ];
  const SCENE_NAME = {
    bch: [['弯曲合成', 'CURVED PRODUCT'], ['BCH 指数球', 'BCH BALL']],
    mrp: [['有理双卡', 'RATIONAL CHARTS'], ['MRP 单位球', 'MRP BALL']],
    hopf: [['盲区纤维', 'BLIND FIBRE'], ['霍普夫丛', 'HOPF BUNDLE']],
    turns: [['球面转角', 'SPHERICAL TURNS'], ['汉密尔顿转角', 'HAMILTON TURNS']],
    heap: [['无原点搬运', 'ORIGIN-FREE TRANSPORT'], ['流群与李三元系', 'HEAP AND LIE TRIPLE']]
  };
  function keyText(m) {
    switch (m.scene) {
      case 'bch':
        return state.lens ? 'W² + ‖V‖² = ' + f4(m.unitNorm) : kit.fix(m.thetaCDeg, 2) + '°';
      case 'mrp':
        return 'ε = ' + (m.cursor.eps > 0 ? '+1' : '−1');
      case 'hopf':
        return m.fibre && m.fibre.plus != null ? 'ψ₊ = ' + s4(m.fibre.plus) : 'ψ₊ —';
      case 'turns':
        return 'T₃₁T₂₃T₁₂ = ' + quatName(m.turns.loop);
      default:
        return '[x, y, z] = ' + quatName(m.heap.xyz);
    }
  }
  function subline(m) {
    switch (m.scene) {
      case 'bch':
        return L(`平直和偏离 ${f4(m.gap)} rad，S³ 上差 ${kit.fix(m.geodesic / deg, 2)}°；四维弦和 ‖q<sub>A</sub> + q<sub>B</sub>‖² = ${f4(m.chord)}。`, `The flat sum is ${f4(m.gap)} rad off, ${kit.fix(m.geodesic / deg, 2)}° on S³; the chord sum has ‖q<sub>A</sub> + q<sub>B</sub>‖² = ${f4(m.chord)}.`);
      case 'mrp': {
        const s = fracVec(m.mrp.sAB || [NaN, 0, 0]) || vec(m.mrp.sAB || [0, 0, 0]);
        return L(`σ<sub>A</sub> ${STAR} σ<sub>B</sub> = ${s}；琥珀点绕 û<sub>A</sub> 转到 ${kit.fix(m.cursor.spinDeg, 0)}°，σ = ${vec(m.cursor.s)}。`, `σ<sub>A</sub> ${STAR} σ<sub>B</sub> = ${s}; the amber probe has turned ${kit.fix(m.cursor.spinDeg, 0)}° about û<sub>A</sub>, σ = ${vec(m.cursor.s)}.`);
      }
      case 'hopf':
        return m.omega == null
          ? L('三角形有一对对径顶点，最短门没有定义。', 'Two vertices are antipodal; the shortest gate is undefined.')
          : L(`回路围出 Ω = ${f4(m.omega)} sr；走完一圈，纤维相位转过 −Ω/2 = ${s4(-m.omega / 2)}。`, `The loop encloses Ω = ${f4(m.omega)} sr; after one round the fibre phase has turned by −Ω/2 = ${s4(-m.omega / 2)}.`);
      case 'turns':
        return m.holonomy
          ? L(`转角之积只看端点，回到起点为 +1；最短门带回相位 ${complex([m.holonomy.re, m.holonomy.im])}。`, `The product of turns sees only the endpoints and closes at +1; the shortest gates return ${complex([m.holonomy.re, m.holonomy.im])}.`)
          : L('转角之积只看端点；有一对对径顶点，最短门没有定义。', 'The product of turns sees only the endpoints; two vertices are antipodal, so the shortest gate is undefined.');
      default:
        return L(`[x, y, z] = x y⁻¹ z 与 [z, y, x] 相距 ${f4(m.heap.gap)} rad；切空间里 K = ${m.lie.curvature == null ? '—' : s4(m.lie.curvature)}。`, `[x, y, z] = x y⁻¹ z is ${f4(m.heap.gap)} rad from [z, y, x]; in the tangent space K = ${m.lie.curvature == null ? '—' : s4(m.lie.curvature)}.`);
    }
  }
  function legendItems(m) {
    const amber = { bch: ['合成路径上的当前点', 'current point of the word'], mrp: ['绕 û<sub>A</sub> 转的探针', 'probe turning about û<sub>A</sub>'], hopf: ['底点', 'base point'], turns: ['当前点', 'current point'], heap: ['中继桥 y', 'bridge y'] }[m.scene];
    const items = [
      ['vi', { bch: ['弯曲合成 A ' + STAR + ' B', 'curved product A ' + STAR + ' B'], mrp: ['σ<sub>A</sub> ' + STAR + ' σ<sub>B</sub>', 'σ<sub>A</sub> ' + STAR + ' σ<sub>B</sub>'], hopf: ['纤维 S¹', 'fibre S¹'], turns: ['转角之积', 'product of turns'], heap: ['[x, y, z]', '[x, y, z]'] }[m.scene]],
      ['cy', { bch: null, mrp: ['分子与分母', 'numerator, denominator'], hopf: ['底路径', 'base path'], turns: ['有向转角', 'directed turns'], heap: ['{a, b, a}', '{a, b, a}'] }[m.scene]],
      ['mg', { bch: ['平直和与偏离', 'flat sum and its gap'], mrp: ['叉乘与影子', 'cross part, shadow'], hopf: ['角盈 Ω 与 −Ω/2', 'excess Ω and −Ω/2'], turns: ['角盈 Ω', 'excess Ω'], heap: ['[z, y, x]', '[z, y, x]'] }[m.scene]],
      ['am', amber]
    ];
    return items.filter(([, t]) => t).map(([k, t]) => [k, L(t[0], t[1])]);
  }
  function hud(m) {
    $('hudBig').innerHTML = `${L(...SCENE_NAME[m.scene][state.lens])} · ${keyText(m)}`;
    $('hudSub').innerHTML = subline(m);
    $('legend').innerHTML = legendItems(m).map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  // Keep each caption near its anchor, inside the stage and off the HUD, the legend and the handle.
  function fitLabels() {
    if (TRV.thumbMode) return;
    const bounds = stage.getBoundingClientRect();
    const occupied = [$('hudTl'), $('legend'), handle].filter((el) => !el.hidden).map((el) => el.getBoundingClientRect());
    const tags = [...stage.querySelectorAll('.tags .tag:not([hidden])')];
    for (const tag of tags) tag.style.translate = '';
    const boxes = tags.map((tag) => tag.getBoundingClientRect());
    for (const [i, box] of boxes.entries()) {
      const dx = kit.clamp(0, bounds.left + 5 - box.left, bounds.right - 5 - box.right);
      const row = box.height + 3;
      for (let j = 0; j <= 2 * Math.ceil(bounds.height / row); j++) {
        const dy = Math.ceil(j / 2) * row * (j % 2 ? 1 : -1);
        const left = box.left + dx,
          right = box.right + dx,
          top = box.top + dy,
          bottom = box.bottom + dy;
        if (top < bounds.top + 4 || bottom > bounds.bottom - 4) continue;
        if (occupied.some((r) => left < r.right + 3 && right > r.left - 3 && top < r.bottom + 3 && bottom > r.top - 3)) continue;
        tags[i].style.translate = dx + 'px ' + dy + 'px';
        occupied.push({ left, right, top, bottom });
        break;
      }
    }
  }
  /** Where the handle sits: the tip of B in the ball cards, P₃ on the sphere cards (world point). */
  function handlePoint(m) {
    if (m.scene === 'hopf' || m.scene === 'turns') return onSphere(m.triangle[2], 1.008);
    if (m.scene === 'mrp') return scale(m.uB, Math.min(1, Math.tan((m.thetaBDeg * deg) / 4)));
    return ballBCH(scale(m.uB, m.thetaBDeg * deg));
  }
  /** How far from the centre the drawing reaches (world units): the shell, or what the chart puts outside it. */
  function extent(m) {
    if (m.scene === 'hopf' || m.scene === 'turns') return 1.26;
    if (m.scene === 'mrp') return 1.12;
    const r = (q) => len(qlog(q, [0, 0, 1])) / PI;
    const reach = m.scene === 'bch' ? [m.thetaADeg / 180, m.thetaBDeg / 180, len(m.thetaC) / PI, len(m.thetaLin) / PI] : [m.heap.x, m.heap.z, m.heap.xyz, m.heap.zyx].map(r);
    return clamp(Math.max(...reach) + 0.14, 1.12, 2.2);
  }
  let frozenExtent = null; // kept while the handle is dragged, so that the view does not move under the pointer
  function drawStage(m) {
    const W = stage.clientWidth,
      H = stage.clientHeight,
      top = 64,
      bottom = 40,
      reach = frozenExtent || extent(m);
    sc.reach = reach;
    const wide = m.scene === 'hopf' || m.scene === 'turns' ? 2 * (DIAL.right + DIAL.radius + 0.04) : 2 * reach + 0.3;
    opts.radius = Math.min((W - 40) / wide, (H - top - bottom) / (2 * reach)) / Math.min(W, H);
    opts.cy = (top + (H - top - bottom) / 2) / H;
    opts.cx = 0.5;
    // the cover has no labels: come closer and centre the arrows of the exponential ball
    if (TRV.thumbMode && m.scene === 'bch') {
      opts.radius *= 1.42;
      opts.cx = 0.5 - (0.36 * opts.radius * Math.min(W, H) * sc.cam.zoom) / W;
      opts.cy = 0.56;
    }
    sc.begin();
    shell();
    axes();
    ({ bch: drawBCH, mrp: drawMRP, hopf: drawHopf, turns: drawTurns, heap: drawHeap })[m.scene](m);
    sc.end();
    const q = sc.p(handlePoint(m));
    handle.hidden = TRV.still;
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
    fitLabels();
  }

  /* ---------- strip plot: along the rail, what stays and what accumulates ---------- */
  const stripCache = new Map();
  function stripData(m) {
    const key = [m.scene, m.thetaADeg, m.thetaBDeg, m.chiDeg].join('|');
    if (stripCache.has(key)) return stripCache.get(key);
    const N = 160,
      e = { thetaADeg: m.thetaADeg, thetaBDeg: m.thetaBDeg, chiDeg: m.chiDeg };
    const ts = sample(N, (t) => t);
    let rows;
    if (m.scene === 'bch')
      rows = ts.map((t) => {
        const w = wordAt(e, t),
          q = w.q;
        return [t, qdot(q, q), len(sub(w.flat, qlog(q, len(qvec(q)) > 1e-9 ? qvec(q) : [1, 0, 0])))];
      });
    else if (m.scene === 'mrp') rows = ts.map((t) => [t, len(mrp(spinAt(t)).s), Math.min(4, Math.abs(Math.tan(PI * t)))]);
    else if (m.scene === 'heap')
      rows = ts.map((t) => {
        const y = bridgeAt(e, t),
          xyz = qmul(qmul(m.heap.x, qconj(y)), m.heap.z),
          zyx = qmul(qmul(m.heap.z, qconj(y)), m.heap.x);
        return [t, qdist(y, m.heap.x), qdist(xyz, zyx), qdist(m.heap.z, xyz)];
      });
    else {
      const V = m.triangle;
      rows = ts.map((t) => {
        const lift = liftAt(V, t),
          plus = lift ? fibre(lift.psi).plus : null;
        const stay = m.scene === 'turns' ? dot3(V[0], loopAt(V, t).b) : lift ? hypot(...lift.psi[0]) ** 2 + hypot(...lift.psi[1]) ** 2 : null;
        return [t, stay, plus == null ? null : -plus];
      });
    }
    const out = { rows };
    stripCache.set(key, out);
    if (stripCache.size > 64) stripCache.delete(stripCache.keys().next().value);
    return out;
  }
  const STRIP = {
    bch: { title: ['沿合成路径：弯曲合成始终在单位球面上，平直路径越走越偏', 'Along the word: the curved product stays on the unit sphere, the flat path drifts off'], cyan: 'W² + ‖V‖²', magenta: '‖θ_{flat} − θ‖ (rad)', y: [0, 2.1] },
    mrp: { title: ['绕 û_A 一整圈：双卡坐标 ‖σ‖ ≤ 1，单卡吉布斯坐标在 180° 发散', 'One turn about û_A: the two-chart ‖σ‖ stays ≤ 1, the one-chart Gibbs coordinate diverges at 180°'], cyan: '‖σ‖', magenta: 'min(4, |tan(ϑ/2)|)', y: [0, 4.1] },
    hopf: { title: ['沿基底回路：旋量始终是单位向量，纤维相位只在纬向段累积', 'Along the base loop: the spinor stays a unit vector, the fibre phase builds up only where φ changes'], cyan: '|z_{1}|² + |z_{2}|²', magenta: '−ψ_{+} (rad)', y: [-0.1, 1.9] },
    turns: { title: ['沿三角回路：转角之积只看端点，回到 +1；最短门的相位记住 Ω/2', 'Around the triangle: the turn product sees only endpoints and returns to +1; the gate phase keeps Ω/2'], cyan: 'Re T(P_{1}↷b) = P_{1}·b', magenta: '−ψ_{+} (rad)', y: [-1.1, 2.1] },
    heap: { title: ['沿中继桥 y：搬运的弧长不变，[x, y, z] 与 [z, y, x] 在 y = 1 处分得最开', 'Along the bridge y: the carried arc keeps its length; [x, y, z] and [z, y, x] are furthest apart at y = 1'], cyan: 'd(y, x) = d(z, [x, y, z])', magenta: 'd([x, y, z], [z, y, x])', y: [0, 4.2] }
  };
  function drawPlot(m) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    const spec = STRIP[m.scene],
      data = stripData(m);
    $('plotTitle').textContent = L(...spec.title).replace(/_\{?([A-Z0-9+]+)\}?/g, (_, s) => s);
    $('plotMeta').textContent = m.scene === 'mrp' ? 'ϑ = 360° τ' : 'τ';
    const g = kit.plot(cv, { x: [0, 1], y: spec.y, pad: [32, 14, 12, 22] });
    const yTicks = { bch: [0, 0.5, 1, 1.5, 2], mrp: [0, 1, 2, 3, 4], hopf: [0, 0.5, 1, 1.5], turns: [-1, 0, 1, 2], heap: [0, 1, 2, 3, 4] }[m.scene];
    g.axes({ xTicks: m.scene === 'mrp' ? [[0, '0°'], [0.25, '90°'], [0.5, '180°'], [0.75, '270°'], [1, '360°']] : [0, 0.25, 0.5, 0.75, 1], yTicks, xLabel: m.scene === 'mrp' ? 'ϑ' : 'τ' });
    if (m.scene === 'mrp') g.vline(0.5, P.magenta, { alpha: 0.4, dash: [3, 4] });
    if ((m.scene === 'hopf' || m.scene === 'turns') && m.omega != null) g.hline(m.omega / 2, P.magenta, { alpha: 0.45, dash: [3, 4] });
    g.line(data.rows.map((r) => [r[0], r[1]]), P.cyan, { width: 2 });
    if (m.scene === 'heap') g.line(data.rows.map((r) => [r[0], r[3]]), P.violet, { width: 1.6, dash: [5, 4] });
    g.line(data.rows.map((r) => [r[0], r[2]]), P.magenta, { width: 1.8 });
    g.vline(m.tau, P.amber);
    g.legend([
      [P.cyan, spec.cyan],
      [P.magenta, spec.magenta]
    ]);
  }

  /* ---------- readouts ---------- */
  function readings(m, I) {
    $('roKey').textContent = s4(m.W);
    $('roKeySub').textContent = ` · ‖V‖ = ${f4(len(m.V))} · W² + ‖V‖² = ${f4(m.unitNorm)}`;
    $('roBch').textContent = `${vec(m.thetaC)} · ${kit.fix(m.thetaCDeg, 2)}° · ‖θ_lin − θ_C‖ = ${f4(m.gap)}`.replace('θ_lin', 'θlin').replace('θ_C', 'θC');
    $('roChord').textContent = `${f4(m.chord)} · ${L('S³ 上', 'on S³')} ${f4(m.geodesic)} rad = ${kit.fix(m.geodesic / deg, 2)}°`;
    const M = m.mrp;
    $('roMrp').textContent = M.sAB ? `${fracVec(M.sAB) || vec(M.sAB)} · ${L('分母', 'den.')} ${frac(M.den) || f4(M.den)}` : L('分母为 0：乘积是 −1', 'denominator 0: the product is −1');
    $('roSheet').textContent = `${vec(m.cursor.s)} · ε = ${m.cursor.eps > 0 ? '+1' : '−1'}`;
    $('roTri').textContent = `S = ${f4(m.S)} · D = ${f4(m.D)} · ` + (m.holonomy ? `Ω = ${f4(m.omega)} sr · ${complex([m.holonomy.re, m.holonomy.im])}` : L('对径顶点：无定义', 'antipodal vertices: undefined'));
    $('roHeap').textContent = `${quatName(m.heap.xyz)} · ${quatName(m.heap.zyx)} · K = ${m.lie.curvature == null ? '—' : s4(m.lie.curvature)}`;
    const R = M.R,
      R625 = R && R.flat().every((x) => Math.abs(625 * x - Math.round(625 * x)) < 1e-7) ? R.map((row) => row.map((x) => kit.fix(Math.round(625 * x), 0))) : null;
    const notes = {
      bch: L(`闭式 (W, V) 与四元数乘积相差 ${I.cross.closed.toExponential(1)}；(û<sub>A</sub>·û<sub>B</sub>)² + ‖û<sub>A</sub> × û<sub>B</sub>‖² = ${f4(I.lagrange.unit)}。`, `The closed form (W, V) and the quaternion product differ by ${I.cross.closed.toExponential(1)}; (û<sub>A</sub>·û<sub>B</sub>)² + ‖û<sub>A</sub> × û<sub>B</sub>‖² = ${f4(I.lagrange.unit)}.`),
      mrp: R625 ? L(`625 R(σ<sub>AB</sub>) = [${R625.map((r) => r.join(', ')).join('; ')}]，全是整数。`, `625 R(σ<sub>AB</sub>) = [${R625.map((r) => r.join(', ')).join('; ')}], all integers.`) : L(`ε Q(σ) 还原游标：ε = ${m.cursor.eps > 0 ? '+1' : '−1'}。`, `ε Q(σ) gives back the cursor: ε = ${m.cursor.eps > 0 ? '+1' : '−1'}.`),
      hopf: m.fibre ? L(`ψ₊ = ${m.fibre.plus == null ? '—' : s4(m.fibre.plus)}，ψ₋ = ${m.fibre.minus == null ? '—' : s4(m.fibre.minus)}，二者之差是底点的经度 φ。`, `ψ₊ = ${m.fibre.plus == null ? '—' : s4(m.fibre.plus)}, ψ₋ = ${m.fibre.minus == null ? '—' : s4(m.fibre.minus)}; their difference is the longitude φ of the base point.`) : L('有一对对径顶点：最短门没有定义。', 'Two vertices are antipodal: the shortest gate is undefined.'),
      turns: L(`T₂₃T₁₂ = ${quatName(m.turns.T23T12)} = T₁₃，T₃₁T₂₃T₁₂ = ${quatName(m.turns.loop)}；Tr(P₁P₂P₃) = ${complex(I.bargmann3.trace)}。`, `T₂₃T₁₂ = ${quatName(m.turns.T23T12)} = T₁₃ and T₃₁T₂₃T₁₂ = ${quatName(m.turns.loop)}; Tr(P₁P₂P₃) = ${complex(I.bargmann3.trace)}.`),
      heap: L(`{a, b, a} = ${vec(m.lie.bracket)}；[x, x, z] = z、[x, z, z] = x 两条马尔采夫律都成立。`, `{a, b, a} = ${vec(m.lie.bracket)}; both Mal'cev laws [x, x, z] = z and [x, z, z] = x hold.`)
    };
    $('roNote').innerHTML = notes[m.scene];
    $('scenePill').innerHTML = `S³ <strong>${L(...SCENE_NAME[m.scene][state.lens])}</strong>`;
    $('keyPill').innerHTML = `W <strong>${s4(m.W)}</strong>`;
    $('hint').textContent = L('拖琥珀手柄改 B（球面卡改 P₃）· 拖空白处转视角 · 空格播放', 'drag the amber handle to move B (P₃ on the sphere cards) · drag empty space to orbit · Space plays');
    $('formula').textContent = 'q = cos(θ/2) 1 + sin(θ/2) û·(i, j, k) · W² + ‖V‖² = 1';
    $('lensToggleBtn').setAttribute('aria-pressed', String(state.lens === 1));
  }
  const paint = kit.painter(() => {
    const m = calculate(),
      I = instances(m);
    hud(m);
    TRV.hudFit();
    drawStage(m);
    readings(m, I);
    drawPlot(m);
  }, [stage, $('plot')]);

  /* ---------- the rail: how far along the card's path ---------- */
  const playBtn = $('playBtn');
  const clock = kit.clock({
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: true,
    rate: 0.125,
    step: 0.05,
    max: 1,
    format: (t) => 'τ ' + t.toFixed(2),
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
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

  /* a card that plays inside a book starts once its stage is half in view, pauses when it leaves, and lets go for good
     as soon as the reader touches anything */
  let bootIO = null;
  function bootAutoplay() {
    if (TRV.still || !window.IntersectionObserver) return;
    let started = false;
    bootIO = new IntersectionObserver(
      (entries) => {
        const seen = entries[entries.length - 1].intersectionRatio >= 0.5;
        if (seen && !started) {
          started = true;
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
  /** Blend θ_A, θ_B and χ from `from` to the state over ms. */
  function startBlend(from, ms) {
    if (transition) transition.cancel();
    state.from = from;
    state.blend = 0;
    const token = {};
    transition = token;
    token.cancel = () => {
      if (token.run) token.run.cancel();
      state.blend = 1;
      state.from = null;
    };
    token.run = kit.tween(
      ms,
      (e) => {
        state.blend = e;
        syncFields();
        paint();
      },
      () => {
        if (transition === token) transition = null;
        state.blend = 1;
        state.from = null;
        syncFields();
        paint();
      }
    );
  }
  /** The reader takes over: the shown values become the state, the clock pauses, no card is marked. */
  function leave() {
    stopBootPlay();
    const e = eff();
    if (transition) transition.cancel();
    transition = null;
    Object.assign(state, { thetaADeg: e.thetaADeg, thetaBDeg: e.thetaBDeg, chiDeg: e.chiDeg, from: null, blend: 1 });
    cards.mark(null);
    clock.pause();
  }
  const snap = (v) => (Math.round(v * 100) === 10626 ? MRP_HALF : clamp(Math.round(v * 100) / 100, 0, 360));
  function setPair(next) {
    if (next.thetaADeg != null) state.thetaADeg = snap(next.thetaADeg);
    if (next.thetaBDeg != null) state.thetaBDeg = snap(next.thetaBDeg);
    if (next.chiDeg != null) state.chiDeg = clamp(Math.round(next.chiDeg * 100) / 100, 0, 180);
    syncFields();
    paint();
  }
  const fA = kit.field($('thetaADeg'), { fmt: (v) => v.toFixed(2) + '°', onInput: (v) => { leave(); setPair({ thetaADeg: v }); } });
  const fB = kit.field($('thetaBDeg'), { fmt: (v) => v.toFixed(2) + '°', onInput: (v) => { leave(); setPair({ thetaBDeg: v }); } });
  const fX = kit.field($('axisAngleDeg'), { fmt: (v) => v.toFixed(0) + '°', onInput: (v) => { leave(); setPair({ chiDeg: v }); } });
  function syncFields() {
    const e = eff();
    fA.set(Math.round(e.thetaADeg * 100) / 100);
    fB.set(Math.round(e.thetaBDeg * 100) / 100);
    fX.set(Math.round(e.chiDeg));
  }
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = cams[v] ? v : 'panorama';
    sc.view(cams[state.cam], TRV.still ? 0 : 600);
    paint();
  });
  $('lensToggleBtn').addEventListener('click', () => {
    state.lens = state.lens ? 0 : 1;
    paint();
  });

  /* ---------- experiment cards ---------- */
  const NOTES = {
    'bch-curved-ball-synthesis': [
      '两段 90° 圆弧：品红的平直和留在 A、B 的平面里，紫色的弯曲合成被叉乘抬出平面，转角 120°，两者相距 1.3129 rad。',
      'Two 90° arcs: the magenta flat sum stays in the plane of A and B, the violet curved product is lifted out of it by the cross product, a 120° turn, 1.3129 rad away.'
    ],
    'dual-chart-rational-mrp': [
      'σ<sub>A</sub> = (1/2, 0, 0)、σ<sub>B</sub> = (0, 1/2, 0)：青色分子加品红叉乘，再除以 17/16，得紫色的 (6/17, 6/17, 8/17)；琥珀探针绕 û<sub>A</sub> 转过 180° 后跳进影子，ε = −1。',
      'σ<sub>A</sub> = (1/2, 0, 0), σ<sub>B</sub> = (0, 1/2, 0): the cyan numerator plus the magenta cross part, divided by 17/16, is the violet (6/17, 6/17, 8/17); past 180° the amber probe jumps into the shadow with ε = −1.'
    ],
    'hopf-fiber-berry-twist': [
      '沿第一卦限 +z → +x → +y → +z 走一圈：底点回到 +z，紫色纤维环上的指针却转了 −Ω/2 = −45°，品红一段就是它。',
      'Round the first octant +z → +x → +y → +z: the base point is back at +z, but the pointer on the violet fibre ring has turned by −Ω/2 = −45°, the magenta stretch.'
    ],
    'hamilton-spherical-turns': [
      '同一个三角形的青色转角首尾相接：紫色弧只连起点与当前点，回到 +z 时转角之积为 +1；+z 处的相位盘记下最短门的 (1 − i)/√2。',
      'The cyan turns of the same triangle meet head to tail: the violet arc only joins the start to the current point and the product is +1 back at +z; the dial at +z keeps the shortest-gate phase (1 − i)/√2.'
    ],
    'prufer-baer-heap-torsor': [
      '琥珀中继桥 y 从 x 经 1 走到 z：紫色的 [x, y, z] 从 z 走到 x，y = 1 时是 +k，品红的 [z, y, x] 是 −k；中心青色箭头 {a, b, a} = b 给出 K = +1。',
      'The amber bridge y runs from x through 1 to z: the violet [x, y, z] runs from z to x and is +k at y = 1, the magenta [z, y, x] is −k; the cyan arrow at the centre, {a, b, a} = b, gives K = +1.'
    ]
  };
  // a cited figure has a fixed frame: one short sentence per card, no sub- or superscripts
  const FIGURE_NOTES = {
    'bch-curved-ball-synthesis': ['90° 加 90°：紫色合成转 120°，与品红平直和相距 1.3129 rad。', '90° and 90°: the violet product turns 120°, 1.3129 rad from the magenta flat sum.'],
    'dual-chart-rational-mrp': ['紫色 (6/17, 6/17, 8/17)；270° 时探针在影子里，ε = −1。', 'Violet (6/17, 6/17, 8/17); at 270° the probe is in the shadow, ε = −1.'],
    'hopf-fiber-berry-twist': ['绕第一卦限一圈，纤维相位转过 −45°。', 'Once round the first octant, the fibre phase turns by −45°.'],
    'hamilton-spherical-turns': ['转角之积回到 +1，相位盘停在 (1 − i)/√2。', 'The turns multiply back to +1; the dial rests at (1 − i)/√2.'],
    'prufer-baer-heap-torsor': ['y = 1：[x, y, z] = +k，[z, y, x] = −k。', 'At y = 1, [x, y, z] = +k and [z, y, x] = −k.']
  };
  function applyPreset(id) {
    const p = presets[id];
    stopBootPlay();
    clock.pause();
    const before = eff();
    if (transition) transition.cancel();
    transition = null;
    Object.assign(state, { scene: p.scene, thetaADeg: p.thetaADeg, thetaBDeg: p.thetaBDeg, chiDeg: p.chiDeg, cam: p.cam, from: null, blend: 1 });
    camChips.set(p.cam, true);
    sc.view(cams[p.cam], booting || TRV.still ? 0 : 600);
    // a still, a card that does not play and a freshly opened full page all park on the declared frame
    if (TRV.still || !p.play || (booting && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still);
    else clock.set(0);
    if (!booting && !TRV.still) startBlend(before, 600);
    syncFields();
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
    idle: [
      '自由探索：拉 θ<sub>A</sub>、θ<sub>B</sub> 与 χ，或拖琥珀手柄；换透镜或视角。时间轴沿当前卡的路径走。随时可以再选一张卡。',
      'Free play: pull θ<sub>A</sub>, θ<sub>B</sub> and χ or drag the amber handle; switch the lens or the view. The rail walks the path of the current card. Pick a card again at any time.'
    ]
  });
  const tourBody = $('tourBody');
  const markStep = () => {
    const b = tourBody.querySelector('b');
    if (b && b.id !== 'tourStep') b.id = 'tourStep';
  };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });

  /* ---------- the amber handle: B in the ball cards, P₃ on the sphere cards; or the arrow keys ---------- */
  const sphereCard = () => state.scene === 'hopf' || state.scene === 'turns';
  /** The pair that puts the handle at a viewport point. */
  function pairFromPointer(ev) {
    const rect = $('cv').getBoundingClientRect(),
      sx = ev.clientX - rect.left,
      sy = ev.clientY - rect.top;
    const D = sc.facing(),
      cy = Math.cos(sc.cam.yaw),
      sy0 = Math.sin(sc.cam.yaw),
      cp = Math.cos(sc.cam.pitch),
      sp = Math.sin(sc.cam.pitch);
    const R = [cy, -sy0, 0],
      U = [sy0 * sp, cy * sp, cp];
    const plane = add(scale(R, (sx - sc.cx) / sc.unit), scale(U, (sc.cy - sy) / sc.unit));
    if (sphereCard()) {
      const r2 = Math.min(1, dot3(plane, plane)),
        p = unit(add(plane, scale(D, Math.sqrt(1 - r2))));
      const e = eff(),
        tri = triangle(e.thetaADeg * deg, e.thetaBDeg * deg, e.chiDeg * deg),
        P2 = tri.V[1];
      const lA = arc(P2, p),
        psi = Math.atan2(Math.max(0, p[1]), dot3(p, tri.t1));
      return { thetaADeg: (2 * lA) / deg, chiDeg: 180 - psi / deg };
    }
    if (Math.abs(D[2]) < 1e-3) return null;
    const b = sub(plane, scale(D, plane[2] / D[2])),
      r = Math.hypot(b[0], b[1]);
    const chiDeg = Math.atan2(b[1], b[0]) < 0 ? (b[0] >= 0 ? 0 : 180) : Math.atan2(b[1], b[0]) / deg;
    const thetaBDeg = state.scene === 'mrp' ? (4 * Math.atan(Math.min(1, r))) / deg : 180 * Math.min(2, r);
    return { thetaBDeg, chiDeg };
  }
  let dragging = null;
  handle.onpointerdown = (ev) => {
    if (ev.button !== 0 || TRV.still) return;
    ev.preventDefault();
    leave();
    frozenExtent = sc.reach;
    dragging = ev.pointerId;
    handle.setPointerCapture(dragging);
    handle.classList.add('dragging');
  };
  handle.onpointermove = (ev) => {
    if (ev.pointerId !== dragging) return;
    const next = pairFromPointer(ev);
    if (next) setPair(next);
  };
  const release = (ev) => {
    if (handle.hasPointerCapture(ev.pointerId)) handle.releasePointerCapture(ev.pointerId);
  };
  handle.onpointerup = release;
  handle.onpointercancel = release;
  handle.onlostpointercapture = () => {
    dragging = null;
    frozenExtent = null;
    paint();
    handle.classList.remove('dragging');
  };
  handle.onkeydown = (ev) => {
    const step = { ArrowLeft: -0.5, ArrowRight: 0.5 }[ev.key],
      turnStep = { ArrowDown: -1, ArrowUp: 1 }[ev.key];
    if (step == null && turnStep == null) return;
    ev.stopPropagation();
    ev.preventDefault();
    leave();
    if (turnStep != null) setPair({ chiDeg: state.chiDeg + turnStep });
    else if (sphereCard()) setPair({ thetaADeg: state.thetaADeg + step });
    else setPair({ thetaBDeg: state.thetaBDeg + step });
  };
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));
  TRV.onLang(paint);

  /* ---------- probe, cover, start ---------- */
  /** Viewport coordinates of the handle for a target pair (in the current card), for drag tests. */
  function dragTarget(target) {
    const e = { ...eff(), ...target },
      chi = e.chiDeg * deg,
      uB = [cs(chi), sn(chi), 0];
    let w;
    if (sphereCard()) w = onSphere(triangle(e.thetaADeg * deg, e.thetaBDeg * deg, chi).V[2], 1.008);
    else if (state.scene === 'mrp') w = scale(uB, Math.min(1, Math.tan((e.thetaBDeg * deg) / 4)));
    else w = ballBCH(scale(uB, e.thetaBDeg * deg));
    const q = sc.p(w),
      r = $('cv').getBoundingClientRect();
    return { x: r.left + q[0], y: r.top + q[1] };
  }
  const snapshot = (m) => JSON.parse(JSON.stringify(m));
  window.TERNION_NONLINEAR_DEBUG = Object.freeze({
    get state() {
      return snapshot({
        scene: state.scene,
        lens: state.lens,
        cam: state.cam,
        thetaADeg: eff().thetaADeg,
        thetaBDeg: eff().thetaBDeg,
        chiDeg: eff().chiDeg,
        t: clock.t,
        playing: clock.playing,
        preset: cards.current,
        blending: !!(state.from && state.blend < 1),
        camera: { ...sc.cam }
      });
    },
    get calc() {
      const m = calculate();
      return snapshot({ ...m, leanInstances: instances(m), strip: { ...STRIP[m.scene], rows: stripData(m).rows } });
    },
    presets: Object.freeze(JSON.parse(JSON.stringify(presets))),
    scenes: SCENES,
    dragTarget
  });
  window.TRV_THUMB = () => {
    cards.pick(ids[0]);
    clock.pause();
    clock.set(1);
    paint.now();
  };
  cards.pick(cards.initial(ids[0]));
  booting = false;
  paint.now();
})();
