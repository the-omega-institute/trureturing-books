/* Film 003 · One orthogonal step, then another: two-angle addressing and the Berry phase
   正交一次、正交两次：两角寻址与贝里相位 (book quantum-geometry, part III: chapters 9–10).
   Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     one    A single kind of turn, R_y(θ) N for θ ∈ [0, 2π], traces one meridian circle (ch. 9, opening; computed).
     two    Tilt then twist: r(θ, φ) = R_z(φ) R_y(θ) N = (sin θ cos φ, sin θ sin φ, cos θ); θ = 60°, φ = 45° lands on
            (√6/4, √6/4, 1/2); at θ = 180° the twist leaves the point fixed (ch. 9 §9.2; computed here by rotation).
     skew   Axes a = e₃ and b at 30°: a greedy word (b by π, a to the far side, b to colatitude 110°, a to the target
            azimuth) reaches the target in four turns; the word is built here (NUM). Any rotation is a finite word in
            two non-collinear axes ..... TwoAxisFiniteRotation.two_axis_finite_word (ch. 9, LEAN; existence only).
     order  R_x(90°) R_y(90°) N = +X and R_y(90°) R_x(90°) N = −Y, 90° apart; in each second step the point is fixed
            and the carried tangent arrow turns 90° (ch. 10 §10.1; computed by rotation).
     loop   Parallel transport around N → +X → +Y → N (exact rotations along great arcs) turns the arrow by 90°; the
            enclosed solid angle is Ω = π/2 (Van Oosterom–Strackee, cross-checked by Girard's angle excess); turn = area
            (Gauss–Bonnet) and the Berry phase γ_B = −Ω/2 = −π/4 are literature results (ARGUED; ch. 10 remark).
     pairs  latitude(t, z) = (√(1 − t), √t z); ⟨latitude(½, 1), latitude(½, i)⟩ = (1 − t) + t z̄ w = (1 + i)/2
            ..... BargmannImaginaryMaximizers.Latitude.latitude_dot (ch. 10, LEAN); the three-point product
            Δ = G₀₁ G₁₂ G₂₀ = (1 + i)/4, arg Δ = π/4, and its invariance under local re-phasing are computed here;
            arg Δ = Ω/2 is the literature result of the ch. 10 remark (ARGUED).

   On load, FILM.init checks DATA.lean against the two theorems and re-derives every number shown on screen by an
   independent route (closed forms against rotations, exact transport against a fine projection transport, solid
   angle two ways, complex overlaps against the latitude formula). Any disagreement is pushed to window.FILM_ERRORS,
   which stops the render. */
'use strict';

/* ======================================================================= */
/*                               vector algebra                              */
/* ======================================================================= */
const TB_DEG = Math.PI / 180;
const V3 = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  sc: (k, a) => [k * a[0], k * a[1], k * a[2]],
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  norm: a => Math.hypot(a[0], a[1], a[2]),
  unit: a => { const n = Math.hypot(a[0], a[1], a[2]); return [a[0] / n, a[1] / n, a[2] / n]; },
  /* right-handed rotation of v about the unit axis k by ang (Rodrigues) */
  rot: (v, k, ang) => {
    const c = Math.cos(ang), s = Math.sin(ang), kv = k[0] * v[0] + k[1] * v[1] + k[2] * v[2];
    const x = [k[1] * v[2] - k[2] * v[1], k[2] * v[0] - k[0] * v[2], k[0] * v[1] - k[1] * v[0]];
    return [0, 1, 2].map(i => v[i] * c + x[i] * s + k[i] * kv * (1 - c));
  },
  ang: (a, b) => Math.atan2(Math.hypot(...[a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]), a[0] * b[0] + a[1] * b[1] + a[2] * b[2])
};
const E1 = [1, 0, 0], E2 = [0, 1, 0], E3 = [0, 0, 1], NP = E3;
const colat = p => Math.acos(clamp(p[2], -1, 1));
const azim = p => Math.atan2(p[1], p[0]);
const wrapPi = x => { x = ((x + Math.PI) % TAU + TAU) % TAU - Math.PI; return x; };
/* complex numbers [re, im] */
const CX = {
  mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
  conj: a => [a[0], -a[1]],
  add: (a, b) => [a[0] + b[0], a[1] + b[1]],
  expi: t => [Math.cos(t), Math.sin(t)],
  abs: a => Math.hypot(a[0], a[1]),
  arg: a => Math.atan2(a[1], a[0]),
  /* ⟨u, v⟩ = Σ conj(u_k) v_k, conjugate-linear in the first slot (star u ⬝ᵥ v) */
  inner: (u, v) => u.reduce((s, uk, k) => [s[0] + uk[0] * v[k][0] + uk[1] * v[k][1], s[1] + uk[0] * v[k][1] - uk[1] * v[k][0]], [0, 0])
};

/* ======================================================================= */
/*                     numbers shown on screen (computed)                    */
/* ======================================================================= */
/* TWO: the addressed point */
const TB_ADDR = { th: 60 * TB_DEG, ph: 45 * TB_DEG };
TB_ADDR.r = V3.rot(V3.rot(NP, E2, TB_ADDR.th), E3, TB_ADDR.ph);

/* SKEW: a = e₃, b at α = 30° from a; the greedy four-turn word to a target at colatitude 110° */
const TB_SKEW = (() => {
  const al = 30 * TB_DEG, bAz = 150 * TB_DEG, thT = 110 * TB_DEG, phT = -12 * TB_DEG;
  const a = E3, b = [Math.sin(al) * Math.cos(bAz), Math.sin(al) * Math.sin(bAz), Math.cos(al)];
  const target = [Math.sin(thT) * Math.cos(phT), Math.sin(thT) * Math.sin(phT), Math.cos(thT)];
  const word = [];
  let p = NP;
  const push = (axis, name, ang) => { const q = V3.rot(p, axis, ang); word.push({ axis, name, ang, from: p, to: q }); p = q; };
  push(b, 'b', Math.PI);                                         // 1. as far from N as one b-turn allows: 2α
  push(a, 'a', wrapPi(bAz + Math.PI - azim(p)));                // 2. to the side of a away from b
  /* 3. about b until the colatitude is 110° (monotone in ψ on [0, π]); of ±ψ take the one nearer the target azimuth */
  const solve = sgn => {
    let lo = 0, hi = Math.PI;
    for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; if (colat(V3.rot(p, b, sgn * m)) < thT) lo = m; else hi = m; }
    return sgn * (lo + hi) / 2;
  };
  const cands = [solve(1), solve(-1)];
  const psi = cands.reduce((best, c) => (Math.abs(wrapPi(azim(V3.rot(p, b, c)) - phT)) < Math.abs(wrapPi(azim(V3.rot(p, b, best)) - phT)) ? c : best));
  push(b, 'b', psi);
  push(a, 'a', wrapPi(phT - azim(p)));                           // 4. about a to the target azimuth
  return { al, a, b, target, thT, phT, word, end: p };
})();

/* ORDER: the two routes and the carried tangent arrow (the image of e₁) */
const TB_ORDER = (() => {
  const q = Math.PI / 2;
  const routeA = [{ axis: E2, name: 'Y' }, { axis: E1, name: 'X' }];
  const routeB = [{ axis: E1, name: 'X' }, { axis: E2, name: 'Y' }];
  const run = route => {
    const pts = [NP], flags = [E1];
    route.forEach(st => { pts.push(V3.rot(pts[pts.length - 1], st.axis, q)); flags.push(V3.rot(flags[flags.length - 1], st.axis, q)); });
    return { route, pts, flags, end: pts[2], flagTurn: V3.ang(flags[1], flags[2]), pointMove: V3.norm(V3.sub(pts[2], pts[1])) };
  };
  const A = run(routeA), B = run(routeB);
  return { A, B, gap: V3.ang(A.end, B.end) };
})();

/* LOOP: exact parallel transport along the great arcs N → +X → +Y → N */
const TB_LOOP = (() => {
  const verts = [NP, E1, E2];
  const edges = [0, 1, 2].map(i => {
    const p = verts[i], q = verts[(i + 1) % 3];
    return { p, q, axis: V3.unit(V3.cross(p, q)), ang: V3.ang(p, q) };
  });
  const v0 = E1;
  const starts = [v0];
  edges.forEach((e, i) => starts.push(V3.rot(starts[i], e.axis, e.ang)));
  /* s ∈ [0, 3]: position and transported arrow */
  const at = s => {
    const i = Math.min(2, Math.floor(clamp(s, 0, 3 - 1e-9))), f = clamp(s - i), e = edges[i];
    return { p: V3.rot(e.p, e.axis, f * e.ang), v: V3.rot(starts[i], e.axis, f * e.ang) };
  };
  const vEnd = starts[3];
  const turn = Math.atan2(V3.dot(V3.cross(v0, vEnd), NP), V3.dot(v0, vEnd));    // signed, about the outward normal at N
  /* solid angle: Van Oosterom–Strackee */
  const [a, b, c] = verts;
  const omega = 2 * Math.atan2(V3.dot(a, V3.cross(b, c)), 1 + V3.dot(a, b) + V3.dot(b, c) + V3.dot(c, a));
  return { verts, edges, at, v0, vEnd, turn, omega };
})();

/* PAIRS: the three spinors on the loop's corners, their overlaps and the three-point product */
const tbLatitude = (t, z) => [[Math.sqrt(1 - t), 0], CX.mul([Math.sqrt(t), 0], z)];
const TB_PAIRS = (() => {
  const psi = [tbLatitude(0, [1, 0]), tbLatitude(0.5, [1, 0]), tbLatitude(0.5, [0, 1])];    // N, +X, +Y
  const G = (i, j, al = [0, 0, 0]) => {
    const u = psi[i].map(z => CX.mul(CX.expi(al[i]), z)), v = psi[j].map(z => CX.mul(CX.expi(al[j]), z));
    return CX.inner(u, v);
  };
  const delta = (al = [0, 0, 0]) => CX.mul(CX.mul(G(0, 1, al), G(1, 2, al)), G(2, 0, al));
  /* the latitude formula of the cited corollary, (1 − t) + t·conj(z)·w */
  const latDot = (t, z, w) => CX.add([1 - t, 0], CX.mul([t, 0], CX.mul(CX.conj(z), w)));
  return { psi, G, delta, latDot, D: delta() };
})();
/* the local phases of the re-phasing in the PAIRS scene, as functions of the scene time */
const tbGauge = (u, k) => 1.4 * Math.sin(0.8 * u * (k + 1) + 1.3 * k);

/* the two cited theorems, by short name (film.json "lean") */
const TB_LEAN = {
  two_axis_finite_word: 'D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word',
  latitude_dot: 'D5/S3/Quantum/Information/BargmannImaginaryMaximizers.Latitude.latitude_dot'
};

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('two-angle film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;
  const nearV = (a, b, eps = 1e-12) => V3.norm(V3.sub(a, b)) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(TB_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(TB_LEAN).length}`);
  for (const [short, gid] of Object.entries(TB_LEAN)) {
    const r = lean.find(z => z.gid === gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. ONE / TWO: rotations against the closed forms, on a grid of angles */
  for (let i = 0; i <= 36; i++) for (let j = 0; j <= 36; j++) {
    const th = i * 5 * TB_DEG, ph = j * 10 * TB_DEG;
    const r = V3.rot(V3.rot(NP, E2, th), E3, ph);
    check(nearV(r, [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)]), `r(θ, φ) at ${i}, ${j}`);
    check(nearV(rotZ(rotY(NP, th), ph), r), `engine rotY/rotZ disagree at ${i}, ${j}`);
  }
  for (let i = 0; i <= 72; i++) check(near(V3.rot(NP, E2, i * 5 * TB_DEG)[1], 0), 'a single y-turn leaves the xz circle');
  check(nearV(TB_ADDR.r, [Math.sqrt(6) / 4, Math.sqrt(6) / 4, 0.5]), 'θ = 60°, φ = 45° does not land on (√6/4, √6/4, 1/2)');
  for (let j = 0; j <= 36; j++) check(nearV(V3.rot(V3.rot(NP, E2, Math.PI), E3, j * 10 * TB_DEG), [0, 0, -1]), 'the twist moves the south pole');

  /* 2. SKEW: the word has four turns about a, b alternately, lands on the target, and stays inside the 2jα bound */
  const S = TB_SKEW;
  check(near(V3.ang(S.a, S.b), 30 * TB_DEG), 'skew axes are not 30° apart');
  check(V3.dot(S.a, S.b) ** 2 < V3.dot(S.a, S.a) * V3.dot(S.b, S.b), 'skew axes fail the strict Cauchy–Schwarz hypothesis');
  check(S.word.length === 4 && S.word.map(w => w.name).join('') === 'baba', 'skew word is not b a b a');
  check(nearV(S.end, S.target, 1e-9), 'skew word misses the target');
  check(near(colat(S.word[0].to), 60 * TB_DEG, 1e-12), 'first b-turn does not reach 2α');
  let nb = 0;
  S.word.forEach(w => {
    if (w.name === 'b') nb++;
    for (let k = 0; k <= 40; k++) check(colat(V3.rot(w.from, w.axis, w.ang * k / 40)) <= Math.min(Math.PI, 2 * nb * S.al) + 1e-9, 'skew word leaves the 2jα bound');
  });

  /* 3. ORDER: end points, the gap, fixed points and turned arrows; the products of the 3×3 matrices differ */
  const O = TB_ORDER;
  check(nearV(O.A.end, E1) && nearV(O.B.end, [0, -1, 0]), 'order end points are not +X and −Y');
  check(nearV(rotX(rotY(NP, Math.PI / 2), Math.PI / 2), E1) && nearV(rotY(rotX(NP, Math.PI / 2), Math.PI / 2), [0, -1, 0]), 'engine rotations disagree on the order example');
  check(near(O.gap, Math.PI / 2), 'order end points are not 90° apart');
  check(near(O.A.pointMove, 0) && near(O.B.pointMove, 0), 'second step moves the point');
  check(near(O.A.flagTurn, Math.PI / 2) && near(O.B.flagTurn, Math.PI / 2), 'second step does not turn the arrow by 90°');
  [O.A, O.B].forEach(R => R.flags.forEach((f, i) => check(near(V3.dot(f, R.pts[i]), 0), 'carried arrow is not tangent')));

  /* 4. LOOP: exact transport against a fine projection transport; Ω two ways */
  const L = TB_LOOP;
  check(near(L.turn, Math.PI / 2), `transport turns by ${L.turn}, not π/2`);
  check(near(L.omega, Math.PI / 2), `Van Oosterom–Strackee Ω = ${L.omega}`);
  const ang3 = L.verts.map((A, i) => {
    const B = L.verts[(i + 1) % 3], C0 = L.verts[(i + 2) % 3];
    const tb = V3.unit(V3.sub(B, V3.sc(V3.dot(A, B), A))), tc = V3.unit(V3.sub(C0, V3.sc(V3.dot(A, C0), A)));
    return V3.ang(tb, tc);
  });
  check(near(ang3[0] + ang3[1] + ang3[2] - Math.PI, L.omega), 'Girard excess ≠ Ω');
  check(near(L.omega / (4 * Math.PI), 1 / 8), 'Ω is not an eighth of the sphere');
  let v = L.v0;
  const n = 20000;
  for (let k = 1; k <= 3 * n; k++) { const p = L.at(k / n).p; v = V3.unit(V3.sub(v, V3.sc(V3.dot(v, p), p))); }
  check(V3.ang(v, L.vEnd) < 1e-3, 'projection transport disagrees with the exact transport');
  for (let k = 0; k <= 300; k++) { const st = L.at(3 * k / 300); check(near(V3.norm(st.p), 1) && near(V3.dot(st.p, st.v), 0), 'transported arrow leaves the tangent plane'); }

  /* 5. PAIRS: the latitude formula, the product, its phase, and gauge invariance */
  const P = TB_PAIRS, s2 = Math.SQRT1_2;
  const g12 = P.G(1, 2), g01 = P.G(0, 1), g20 = P.G(2, 0);
  const lat = P.latDot(0.5, [1, 0], [0, 1]);
  check(near(g12[0], lat[0]) && near(g12[1], lat[1]), 'overlap ≠ latitude formula');
  check(near(g12[0], 0.5) && near(g12[1], 0.5), '⟨+X, +Y⟩ ≠ (1 + i)/2');
  check(near(g01[0], s2) && near(g01[1], 0) && near(g20[0], s2) && near(g20[1], 0), 'G₀₁, G₂₀ ≠ 1/√2');
  check(near(P.D[0], 0.25) && near(P.D[1], 0.25), 'Δ ≠ (1 + i)/4');
  check(near(CX.arg(P.D), Math.PI / 4) && near(CX.arg(P.D), L.omega / 2), 'arg Δ ≠ π/4 = Ω/2');
  for (let t = 0; t <= 1.00001; t += 0.125) for (let k = 0; k < 8; k++) {
    const z = CX.expi(k), w = CX.expi(2.3 * k + 0.4), lhs = CX.inner(tbLatitude(t, z), tbLatitude(t, w)), rhs = P.latDot(t, z, w);
    check(near(lhs[0], rhs[0]) && near(lhs[1], rhs[1]), `latitude formula fails at t = ${t}`);
  }
  for (let k = 0; k <= 200; k++) {
    const u = k * 0.1, al = [0, 1, 2].map(j => tbGauge(u, j)), d = P.delta(al);
    check(near(d[0], P.D[0]) && near(d[1], P.D[1]), `Δ moves under re-phasing at u = ${u}`);
  }
  /* the corners are the Bloch points N, +X, +Y */
  const bloch = s => { const a = s[0], b = s[1]; const ab = CX.mul(CX.conj(a), b); return [2 * ab[0], 2 * ab[1], CX.abs(a) ** 2 - CX.abs(b) ** 2]; };
  P.psi.forEach((s, i) => check(nearV(bloch(s), L.verts[i]), `ψ${i} is not on corner ${i}`));
});
Object.assign(FILM.speed, { one: 0.02, two: 0.016, skew: 0.018, order: 0.02, loop: 0.014, pairs: 0.016, close: 0.025 });

/* ======================================================================= */
/*                              drawing helpers                              */
/* ======================================================================= */
const tbNum = (x, d = 3) => { const v = Math.abs(x) < 0.5 * Math.pow(10, -d) ? 0 : x; return (v < 0 ? '−' : '+') + Math.abs(v).toFixed(d); };
const tbDeg = (r, d = 1) => { const v = r / TB_DEG; return (Math.abs(v) < 0.05 ? 0 : v).toFixed(d).replace('-', '−') + '°'; };
const tbVec = (p, d = 3) => `(${tbNum(p[0], d)}, ${tbNum(p[1], d)}, ${tbNum(p[2], d)})`;
const tbCx = (z, d = 3) => { const im = Math.abs(z[1]) < 0.5 * Math.pow(10, -d) ? 0 : z[1]; return `${tbNum(z[0], d)} ${im < 0 ? '−' : '+'} ${Math.abs(im).toFixed(d)}i`; };
const tbInt = p => `(${p.map(v => { const r = Math.round(v); return (r < 0 ? '−' : '') + Math.abs(r); }).join(', ')})`;
const tbFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
/* piecewise eased path through keyframes [[time, value], …] */
function tbKeys(keys, u) {
  if (u <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t0, v0] = keys[i - 1], [t1, v1] = keys[i];
    if (u <= t1) return lerp(v0, v1, ease((u - t0) / Math.max(1e-6, t1 - t0)));
  }
  return keys[keys.length - 1][1];
}

/* orthographic view of the unit sphere: world (x, y, z), z up → [screen x, screen y, depth] (depth > 0 behind) */
function tbView(cx, cy, R, yaw, el) {
  const cw = Math.cos(yaw), sw = Math.sin(yaw), ce = Math.cos(el), se = Math.sin(el);
  const V = p => {
    const X = p[0] * cw - p[1] * sw, Y = p[0] * sw + p[1] * cw, Z = p[2];
    return [cx + X * R, cy - (Z * ce + Y * se) * R, Y * ce - Z * se];
  };
  V.cx = cx; V.cy = cy; V.R = R;
  return V;
}
const tbVis = (V, p) => (V(p)[2] > 0.02 ? 0.35 : 1);
/* a parametric 3-D curve: front runs bright, back runs faint */
function tbPath(V, fn, n, col, aF, aB, lw = 2, dash = false) {
  if (aF <= 0.003 && aB <= 0.003) return;
  const pts = [];
  for (let i = 0; i <= n; i++) pts.push(V(fn(i / n)));
  let run = [pts[0]], back = pts[0][2] > 0;
  const flush = () => {
    if (run.length < 2) return;
    const r = run;
    if (dash) { ctx.save(); ctx.setLineDash([10, 9]); }
    curve(k => r[Math.round(k * (r.length - 1))], r.length - 1, col, back ? aB : aF, back ? lw * 0.7 : lw);
    if (dash) ctx.restore();
  };
  for (let i = 1; i < pts.length; i++) {
    const b = pts[i][2] > 0;
    run.push(pts[i]);
    if (b !== back) { flush(); run = [pts[i]]; back = b; }
  }
  flush();
}
/* the circle swept by p about the unit axis k, from angle t0 to t1 */
function tbSweep(V, p, k, t0, t1, col, aF, aB, lw = 2, dash = false) {
  if (Math.abs(t1 - t0) < 1e-4) return;
  tbPath(V, s => V3.rot(p, k, t0 + (t1 - t0) * s), Math.max(8, Math.ceil(Math.abs(t1 - t0) * 30)), col, aF, aB, lw, dash);
}
/* a latitude circle at colatitude th */
function tbLatitudeRing(V, th, col, aF, aB, lw = 2, dash = false) {
  tbPath(V, s => [Math.sin(th) * Math.cos(TAU * s), Math.sin(th) * Math.sin(TAU * s), Math.cos(th)], 96, col, aF, aB, lw, dash);
}
function tbSphere(V, a, o = {}) {
  if (a <= 0.003) return;
  dot(V.cx - V.R * 0.18, V.cy - V.R * 0.22, V.R * 1.25, 'b', 0.08 * a);
  ring(V.cx, V.cy, V.R, C.cyan, 0.7 * a, 2.2);
  ring(V.cx, V.cy, V.R + 8, C.cyan, 0.14 * a, 1);
  for (const lat of [-60, -30, 0, 30, 60]) {
    const r = Math.cos(lat * TB_DEG), z = Math.sin(lat * TB_DEG);
    tbPath(V, s => [r * Math.cos(TAU * s), r * Math.sin(TAU * s), z], 72, C.blue, a * (lat === 0 ? 0.5 : 0.28), a * 0.08, lat === 0 ? 1.6 : 1.1);
  }
  for (let k = 0; k < 6; k++) {
    const ph = k * Math.PI / 6;
    tbPath(V, s => [Math.sin(TAU * s) * Math.cos(ph), Math.sin(TAU * s) * Math.sin(ph), Math.cos(TAU * s)], 72, C.blue, a * 0.24, a * 0.07, 1.1);
  }
  const N = V(NP);
  dot(N[0], N[1], 10, 'w', a);
  if (o.N !== false) txt('N', N[0] - 34, N[1] - 12, { size: 30, fam: F.math, w: 700, c: C.white, a });
}
/* a rotation axis through the sphere, in violet; label at the positive end */
function tbAxis(V, k, label, a, o = {}) {
  if (a <= 0.003) return;
  const L = o.len || 1.32, p = V(V3.sc(L, k)), q = V(V3.sc(-L, k)), c0 = V([0, 0, 0]);
  dashed(q[0], q[1], c0[0], c0[1], C.vio, 0.5 * a, 2);
  arrow(c0[0], c0[1], p[0], p[1], C.vio, 0.9 * a, o.lw || 2.6);
  if (label) {
    const l = V(V3.sc(L + 0.14, k));
    txt(label, l[0] + (o.dx || 0), l[1] + 10 + (o.dy || 0), { size: o.size || 28, fam: F.math, w: 700, align: 'center', c: C.vio, a });
  }
}
/* a point on the sphere with a glowing pearl */
function tbPoint(V, p, a, pearl = 'g', r = 14) { const s = V(p); dot(s[0], s[1], r, pearl, a * tbVis(V, p)); return s; }
/* a tangent arrow ("flag") at p in the unit tangent direction v */
function tbFlag(V, p, v, col, a, len = 0.34, lw = 3.5, dash = false) {
  if (a <= 0.003) return;
  const s = V(p), e = V(V3.add(p, V3.sc(len, v))), k = a * tbVis(V, p);
  if (dash) dashed(s[0], s[1], e[0], e[1], col, k, lw * 0.7);
  else arrow(s[0], s[1], e[0], e[1], col, k, lw);
}
/* an arc on the sphere about the point p (as axis), from the tangent u0 by the angle ang */
function tbTurnArc(V, p, u0, ang, r, col, a, lw = 3) {
  if (a <= 0.003 || Math.abs(ang) < 1e-3) return;
  tbPath(V, s => V3.unit(V3.add(p, V3.sc(r, V3.rot(u0, p, ang * s)))), 24, col, a, a * 0.4, lw);
}
/* fill a closed spherical polygon given by its boundary points */
function tbFill(V, pts, col, a) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath();
  pts.forEach((p, i) => { const s = V(p); if (i) ctx.lineTo(s[0], s[1]); else ctx.moveTo(s[0], s[1]); });
  ctx.closePath(); ctx.fill(); ctx.restore();
}
/* coloured runs of text on one baseline: parts = [[text, colour], …] */
function tbRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a, ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, by short name */
const TB_MISSING = new Set();
function tbLean(x, y, short, a, o = {}) {
  if (a <= 0.003) return;
  const r = (DATA.lean || []).find(z => z.short === short && z.kind === 'theorem');
  if (!r) {
    if (!TB_MISSING.has(short)) { TB_MISSING.add(short); window.FILM_ERRORS.push(`film.json does not cite the theorem ${short}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* NUM tag (computed on screen, not a proof) and ARGUED tag (literature result, not formalized in this book) */
function tbNumTag(x, y, a) { chip(x + 32, y - 9, 64, 26, 'NUM', C.cyan, a * 0.9, 14); }
function tbArguedTag(x, y, a) { chip(x + 46, y - 9, 92, 26, 'ARGUED', C.argued, a * 0.95, 14); }
/* opening title */
function tbTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM ${DATA.film.number}`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 84, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('ONE ORTHOGONAL STEP, THEN ANOTHER', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 6, ab: 2 });
  txt(scramble('TWO-ANGLE ADDRESSING AND THE BERRY PHASE', p, 7), W / 2, 640, { size: 28, fam: F.orb, w: 700, align: 'center', c: C.white, a: ta * 0.9, ls: 5 });
  txt('TILT · TWIST · ORDER · LOOP · OVERLAP', W / 2, 712, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 8 });
}
const TB_PX = 1080, TB_PW = 720;   // the right-hand panel column

/* ======================================================================= */
/*                             scene 1 · ONE TURN                            */
/* ======================================================================= */
SCENES.one = S => {
  tbTitle(S);
  const u = S.u, a = at(S, 0, 0.8, -0.2) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const V = tbView(560, 500, 285, -1.0 + 0.02 * u, 0.3);
  tbSphere(V, a);
  const ka = Q(S, 0, 'turn about a single axis', 0.6);
  tbAxis(V, E2, 'e₂', a * ka);
  /* θ runs once round, from the end of line 0 to "comes back home" */
  const t0 = lineAt(S, 0).e - 0.4, t1 = phraseAt(S, 1, 'comes back home') + 0.6;
  const th = TAU * ease(clamp((u - t0) / (t1 - t0)));
  tbSweep(V, NP, E2, 0, TAU, C.vio, 0.35 * a * ka, 0.12 * a * ka, 1.6, true);
  tbSweep(V, NP, E2, 0, th, C.white, a, 0.4 * a, 3.5);
  const p = V3.rot(NP, E2, th);
  tbPoint(V, p, a, 'g', 15);
  /* panel */
  const x = TB_PX, w = TB_PW, y = 200, pa = a * at(S, 0, 0.6, 0.3);
  panel(x, y, w, 470, pa, C.cyan, 'ONE AXIS · 只绕一根轴');
  tbRich([['R', C.white], ['y', C.vio], ['(θ) N = (sin θ, 0, cos θ)', C.white]], x + 28, y + 88, { size: 34, a: pa });
  txt(`θ = ${tbDeg(th)}`, x + 28, y + 158, { size: 28, fam: F.mono, w: 700, c: C.now, a: pa });
  txt(`r = ${tbVec(p)}`, x + 28, y + 206, { size: 28, fam: F.mono, w: 700, c: C.now, a: pa });
  txt('the y-component never leaves 0', x + 28, y + 252, { size: 22, fam: F.mono, w: 700, c: C.dim, a: pa });
  tbNumTag(x + w - 110, y + 25, pa);
  const q = Q(S, 1, 'One kind of turn', 0.6);
  txt('one turn → one circle S¹', x + 28, y + 340, { size: 36, fam: F.math, w: 700, c: C.white, a: pa * q, ab: 1 });
  txt('只转一种，只画得出一个圆', x + 28, y + 400, { size: 30, fam: F.zh, w: 700, c: C.white, a: pa * q * 0.9 });
};

/* ======================================================================= */
/*                            scene 2 · TWO ANGLES                           */
/* ======================================================================= */
function tbTwoState(S) {
  const tTilt = phraseAt(S, 0, 'tilt'), tTwist = phraseAt(S, 1, 'twist');
  const tAll = phraseAt(S, 3, 'Two angles'), tPole = phraseAt(S, 3, 'Only at the poles');
  const th = tbKeys([[tTilt, 0], [tTilt + 2.4, 60], [tAll + 0.2, 60], [tPole - 0.1, 180]], S.u) * TB_DEG;
  const ph = tbKeys([[tTwist, 0], [tTwist + 2.4, 45], [tPole + 0.2, 45], [S.d - 0.6, 405]], S.u) * TB_DEG;
  return { th, ph, tTilt, tTwist, tPole };
}
SCENES.two = S => {
  const a = tbFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const V = tbView(560, 505, 285, -1.0 + 0.02 * u, 0.3);
  const { th, ph, tTwist, tPole } = tbTwoState(S);
  tbSphere(V, a);
  const step2 = clamp((u - tTwist + 0.4) / 0.6), pole = clamp((u - tPole + 0.3) / 0.5);
  /* step 1: the y-axis and the meridian; step 2: the vertical axis and the latitude */
  tbAxis(V, E2, 'e₂', a * (1 - 0.75 * step2));
  tbAxis(V, E3, 'e₃', a * at(S, 1, 0.6, -0.4), { len: 1.14, dx: 40, dy: 34 });
  const p1 = V3.rot(NP, E2, th);
  tbSweep(V, NP, E2, 0, Math.PI, C.vio, 0.4 * a * (1 - step2), 0.12 * a, 1.6, true);
  tbLatitudeRing(V, th, C.vio, 0.5 * a * step2, 0.15 * a * step2, 1.8, true);
  /* the target ring around (√6/4, √6/4, 1/2) */
  const tr = at(S, 2, 0.6, -0.6) * (1 - pole);
  if (tr > 0) tbPath(V, s => V3.unit(V3.add(TB_ADDR.r, V3.sc(0.09, V3.rot(V3.unit(V3.cross(TB_ADDR.r, E3)), TB_ADDR.r, TAU * s)))), 40, C.white, a * tr, 0.3 * a * tr, 2.4);
  /* trails: tilt (along the meridian at φ) and twist (along the latitude) */
  const thA = TB_ADDR.th, phA = TB_ADDR.ph, pA = V3.rot(NP, E2, thA);
  tbSweep(V, NP, E2, 0, Math.min(th, thA), C.white, 0.85 * a, 0.35 * a, 3);                   // the tilt, at φ = 0
  if (ph > 0) tbSweep(V, pA, E3, 0, Math.min(ph, phA), C.white, 0.85 * a, 0.35 * a, 3);       // the twist, at θ = 60°
  if (th > thA + 1e-6) tbPath(V, s => V3.rot(V3.rot(NP, E2, lerp(thA, th, s)), E3, phA), 30, C.white, 0.85 * a, 0.35 * a, 3);
  const r = V3.rot(p1, E3, ph);
  /* the carried flag: the image of e₁; at the poles it alone turns */
  const flag = V3.rot(V3.rot(E1, E2, th), E3, ph);
  tbFlag(V, r, flag, C.white, a * clamp(0.35 + pole), 0.3, 3);
  tbPoint(V, r, a, 'g', 15);
  /* height marker: the drop to cos θ */
  const hz = V([0, 0, r[2]]), rs = V(r);
  dashed(hz[0], hz[1], rs[0], rs[1], C.now, 0.5 * a, 1.6);
  txt(`cos θ = ${tbNum(Math.cos(th))}`, V.cx - V.R - 70, hz[1] + 8, { size: 22, fam: F.mono, w: 700, c: C.now, a: a * clamp(th / 0.2) });
  /* panel */
  const x = TB_PX, w = TB_PW, y = 190, pa = a * at(S, 0, 0.6, 0.2);
  panel(x, y, w, 640, pa, C.cyan, 'TWO-ANGLE ADDRESS · 两角寻址');
  const s1 = at(S, 0, 0.6, 0.6), s2 = at(S, 1, 0.6, 0.3);
  txt('1 · 正交一次  tilt θ about e₂', x + 28, y + 76, { size: 22, fam: F.zh, w: 700, c: C.white, a: pa * s1 });
  tbRich([['R', C.white], ['y', C.vio], ['(θ) N = (sin θ, 0, cos θ)', C.white]], x + 28, y + 124, { size: 30, a: pa * s1 });
  txt('2 · 正交两次  twist φ about e₃', x + 28, y + 186, { size: 22, fam: F.zh, w: 700, c: C.white, a: pa * s2 });
  tbRich([['R', C.white], ['z', C.vio], ['(φ) R', C.white], ['y', C.vio], ['(θ) N =', C.white]], x + 28, y + 234, { size: 30, a: pa * s2 });
  txt('(sin θ cos φ, sin θ sin φ, cos θ)', x + 60, y + 282, { size: 30, fam: F.math, w: 700, c: C.white, a: pa * s2 });
  txt(`θ = ${tbDeg(th)}   φ = ${tbDeg(ph)}`, x + 28, y + 352, { size: 26, fam: F.mono, w: 700, c: C.now, a: pa });
  txt(`r = ${tbVec(r)}`, x + 28, y + 396, { size: 26, fam: F.mono, w: 700, c: C.now, a: pa });
  tbNumTag(x + w - 110, y + 25, pa);
  const q3 = Q(S, 2, 'we land at', 0.6) * (1 - pole);
  tbRich([['θ = 60°, φ = 45°  →  ', C.white], ['(√6/4, √6/4, 1/2)', C.now]], x + 28, y + 470, { size: 30, a: pa * q3, ab: 1 });
  txt(`√6/4 = ${(Math.sqrt(6) / 4).toFixed(3)}   ·   height cos 60° = ${Math.cos(TB_ADDR.th).toFixed(3)}`, x + 28, y + 512, { size: 20, fam: F.mono, w: 700, c: C.dim, a: pa * q3 });
  const q4 = Q(S, 3, 'Only at the poles', 0.6);
  txt('θ = 180°:  r = (0, 0, −1) for every φ', x + 28, y + 470, { size: 28, fam: F.math, w: 700, c: C.white, a: pa * q4 });
  txt('在两极，第二步白拧：只有小旗在转', x + 28, y + 520, { size: 26, fam: F.zh, w: 700, c: C.white, a: pa * q4 * 0.9 });
  const q5 = Q(S, 3, 'Two angles reach', 0.6);
  txt('θ ∈ [0, π] picks the latitude, φ ∈ [0, 2π) the meridian', x + 28, y + 600, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: pa * q5 });
};

/* ======================================================================= */
/*                            scene 3 · SKEW AXES                            */
/* ======================================================================= */
SCENES.skew = S => {
  const a = tbFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'Lean checks', 'lean']]);
  const K = TB_SKEW, V = tbView(560, 500, 280, -1.0 + 0.015 * u, 0.32);
  tbSphere(V, a, { N: false });
  { const n0 = V(NP); txt('N', n0[0] - 62, n0[1] + 6, { size: 30, fam: F.math, w: 700, c: C.white, a }); }
  /* the word: four turns between "Thirty degrees" and the end of line 0 */
  const t0 = phraseAt(S, 0, 'Thirty degrees'), t1 = lineAt(S, 0).e + 0.4, n = K.word.length, beat = (t1 - t0) / n;
  const k = clamp((u - t0) / beat, 0, n), cur = Math.min(n - 1, Math.floor(k)), f = ease(k - cur);
  const curAxis = u < t0 ? null : K.word[cur].name;
  tbAxis(V, K.a, 'a', a * (curAxis === 'a' ? 1 : 0.55), { len: 1.14, dx: 36, dy: 34 });
  tbAxis(V, K.b, 'b', a * (curAxis === 'b' ? 1 : 0.55), { len: 1.14, dx: -30, dy: 20 });
  /* the 2jα bound after j turns about b */
  let nb = 0;
  K.word.forEach((w, i) => {
    if (w.name !== 'b' || i > cur || u < t0) return;
    nb++;
    const bd = Math.min(Math.PI, 2 * nb * K.al);
    tbLatitudeRing(V, bd, C.cyan, 0.55 * a, 0.15 * a, 1.6, true);
  });
  /* target ring */
  tbPath(V, s => V3.unit(V3.add(K.target, V3.sc(0.09, V3.rot(V3.unit(V3.cross(K.target, E3)), K.target, TAU * s)))), 40, C.white, a, 0.3 * a, 2.4);
  /* trails of the finished turns (white) and the current turn (amber) */
  let p = NP;
  K.word.forEach((w, i) => {
    if (u < t0 || i > cur) return;
    const ff = i < cur ? 1 : f;
    tbSweep(V, w.from, w.axis, 0, w.ang * ff, i < cur ? C.white : C.now, (i < cur ? 0.7 : 1) * a, 0.3 * a, 3);
    p = V3.rot(w.from, w.axis, w.ang * ff);
  });
  tbPoint(V, p, a, 'g', 15);
  /* panel */
  const x = TB_PX, w = TB_PW, y = 190, pa = a * at(S, 0, 0.6, 0.2);
  panel(x, y, w, 640, pa, C.cyan, 'SKEW AXES · 斜交两轴');
  tbRich([['∠(', C.white], ['a', C.vio], [', ', C.white], ['b', C.vio], [`) = ${tbDeg(V3.ang(K.a, K.b), 0)}`, C.white], ['    target: 110° from N', C.white]], x + 28, y + 78, { size: 26, a: pa });
  K.word.forEach((wd, i) => {
    const on = u >= t0 + beat * i, now = on && i === cur && k < n;
    const yy = y + 136 + i * 46;
    txt(`${i + 1}. about ${wd.name} by ${tbDeg(Math.abs(wd.ang))}`, x + 28, yy, { size: 24, fam: F.mono, w: 700, c: now ? C.now : C.white, a: pa * (on ? 1 : 0.3) });
    txt(`→ ${tbDeg(colat(wd.to))} from N`, x + 400, yy, { size: 24, fam: F.mono, w: 700, c: now ? C.now : C.white, a: pa * (on ? 1 : 0.3) });
  });
  txt(`now ${tbDeg(colat(p))} from N  ·  bound after j b-turns: 2j·30°`, x + 28, y + 346, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: pa });
  txt('word built here by a greedy rule, not the shortest', x + 28, y + 380, { size: 18, fam: F.mono, w: 700, c: C.dim, a: pa });
  tbNumTag(x + w - 110, y + 25, pa);
  const q = at(S, 1, 0.6, -0.1), ql = Q(S, 1, 'Lean checks', 0.6);
  tbRich([['⟨a, b⟩² < ‖a‖²‖b‖²', C.white]], x + 28, y + 456, { size: 28, a: pa * q });
  tbRich([['⇒ ∀ R ∈ SO(3), ∃ word l in ', C.white], ['a', C.vio], [', ', C.white], ['b', C.vio], [' : l.prod = R', C.white]], x + 28, y + 506, { size: 28, a: pa * q });
  tbLean(x + 28, y + 566, 'two_axis_finite_word', pa * ql, { size: 20 });
  txt('existence only: no length, no algorithm', x + 28, y + 610, { size: 18, fam: F.mono, w: 700, c: C.dim, a: pa * ql });
};

/* ======================================================================= */
/*                              scene 4 · ORDER                              */
/* ======================================================================= */
function tbRoute(V, R, p1, p2, a, done) {
  /* p1, p2 ∈ [0, 1]: progress of the two quarter turns; done: the route is no longer the current one */
  const q = Math.PI / 2, [s1, s2] = R.route;
  const col = done ? C.white : C.now;
  tbSweep(V, NP, s1.axis, 0, q * p1, col, (done ? 0.7 : 1) * a, 0.3 * a, 3);
  const pt = p1 < 1 ? V3.rot(NP, s1.axis, q * p1) : R.pts[1];
  const fl = p1 < 1 ? V3.rot(E1, s1.axis, q * p1) : V3.rot(R.flags[1], s2.axis, q * p2);
  tbFlag(V, pt, fl, col, a, 0.36, 3.5);
  tbPoint(V, pt, a, done ? 'w' : 'g', 14);
  return { pt, fl };
}
SCENES.order = S => {
  const a = tbFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const O = TB_ORDER, V = tbView(560, 505, 285, -Math.PI / 4 + 0.02 * Math.sin(0.3 * u), 0.38);
  tbSphere(V, a);
  tbAxis(V, E1, 'X', a, { dx: -10, dy: 6 });
  tbAxis(V, E2, 'Y', a, { dx: 10, dy: 6 });
  const pA1 = Q(S, 0, 'Quarter turn about Y', 1.4), pA2 = Q(S, 0, 'then about X', 1.0);
  const pB1 = Q(S, 1, 'About X first', 1.4), pB2 = Q(S, 1, 'then Y', 1.0);
  const bOn = at(S, 1, 0.4, -0.2);
  tbRoute(V, O.A, pA1, pA2, a, bOn > 0.5);
  if (bOn > 0) tbRoute(V, O.B, pB1, pB2, a * bOn, false);
  /* end labels and the 90° between them */
  const eA = V(E1), eB = V([0, -1, 0]);
  txt('+X', eA[0] - 64, eA[1] + 52, { size: 28, fam: F.math, w: 700, c: C.white, a: a * Q(S, 0, 'we end on plus X', 0.5) });
  txt('−Y', eB[0] - 56, eB[1] + 44, { size: 28, fam: F.math, w: 700, c: C.white, a: a * Q(S, 1, 'minus Y', 0.5) });
  const g = Q(S, 1, 'ninety degrees away', 0.8);
  if (g > 0) {
    tbSweep(V, E1, E3, 0, -Math.PI / 2 * g, C.white, a, 0.3 * a, 2, true);
    const m = V([Math.SQRT1_2, -Math.SQRT1_2, 0]);
    txt(tbDeg(O.gap * g, 0), m[0], m[1] + 44, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: a * g });
  }
  /* line 2: the flags' quarter turn at the fixed points, before (dashed) and after */
  const fl = Q(S, 2, 'the arrow it carries', 0.6);
  if (fl > 0) for (const R of [O.A, O.B]) {
    tbFlag(V, R.pts[2], R.flags[1], C.now, a * fl, 0.36, 3, true);
    tbTurnArc(V, R.pts[2], R.flags[1], Math.PI / 2 * ease(Q(S, 2, 'turns a quarter', 1.0)), 0.22, C.now, a * fl, 3);
  }
  /* panel */
  const x = TB_PX, w = TB_PW, y = 190, pa = a * at(S, 0, 0.6, 0.2);
  panel(x, y, w, 640, pa, C.cyan, 'ORDER · 转序');
  const qa = Q(S, 0, 'we end on plus X', 0.6), qb = Q(S, 1, 'minus Y', 0.6);
  tbRich([['R', C.white], ['x', C.vio], ['(90°) R', C.white], ['y', C.vio], ['(90°) N = ', C.white], ['+X', C.white]], x + 28, y + 86, { size: 32, a: pa * Math.max(0.25, qa) });
  txt(`= ${tbInt(O.A.end)}`, x + 470, y + 86, { size: 26, fam: F.mono, w: 700, c: C.white, a: pa * qa });
  tbRich([['R', C.white], ['y', C.vio], ['(90°) R', C.white], ['x', C.vio], ['(90°) N = ', C.white], ['−Y', C.white]], x + 28, y + 150, { size: 32, a: pa * Math.max(0.25, qb) });
  txt(`= ${tbInt(O.B.end)}`, x + 470, y + 150, { size: 26, fam: F.mono, w: 700, c: C.white, a: pa * qb });
  txt(`angle between the end points: ${tbDeg(O.gap * g)}`, x + 28, y + 220, { size: 24, fam: F.mono, w: 700, c: C.white, a: pa * g });
  tbRich([['R', C.white], ['x', C.vio], ['R', C.white], ['y', C.vio], [' ≠ R', C.white], ['y', C.vio], ['R', C.white], ['x', C.vio]], x + 28, y + 290, { size: 40, a: pa * g, ab: 1 });
  const q2 = at(S, 2, 0.6);
  txt('second step, both routes:', x + 28, y + 370, { size: 22, fam: F.mono, w: 700, c: C.dim, a: pa * q2 });
  txt(`point moves ${O.A.pointMove.toFixed(3)}   ·   arrow turns ${tbDeg(O.A.flagTurn * ease(Q(S, 2, 'turns a quarter', 1.0)))}`, x + 28, y + 412, { size: 24, fam: F.mono, w: 700, c: C.now, a: pa * q2 });
  txt('点不动，带着的箭头转了四分之一圈', x + 28, y + 470, { size: 28, fam: F.zh, w: 700, c: C.white, a: pa * Q(S, 2, 'turns a quarter', 0.6) });
  tbNumTag(x + w - 110, y + 25, pa);
};

/* ======================================================================= */
/*                            scene 5 · OCTANT LOOP                          */
/* ======================================================================= */
const TB_LOOP_BOUNDARY = (() => {
  const pts = [];
  TB_LOOP.edges.forEach(e => { for (let k = 0; k < 40; k++) pts.push(V3.rot(e.p, e.axis, e.ang * k / 40)); });
  return pts;
})();
function tbLoopFigure(V, a, s, o = {}) {
  /* s ∈ [0, 3]: progress along the loop; o.area: the magenta fill; o.turn: the magenta turn arc at N */
  const L = TB_LOOP;
  tbFill(V, TB_LOOP_BOUNDARY, C.mag, 0.3 * a * (o.area || 0));
  /* the loop, drawn as far as s */
  L.edges.forEach((e, i) => { const f = clamp(s - i); if (f > 0) tbSweep(V, e.p, e.axis, 0, e.ang * f, C.cyan, a, 0.35 * a, 3.5); });
  if (o.ghost) L.edges.forEach(e => tbSweep(V, e.p, e.axis, 0, e.ang, C.cyan, 0.25 * a, 0.1 * a, 1.6, true));
  /* the start direction at N, dashed */
  tbFlag(V, NP, L.v0, C.white, 0.8 * a, 0.44, 2.6, true);
  const st = L.at(s);
  if (o.turn > 0) {
    tbTurnArc(V, NP, L.v0, L.turn * o.turn, 0.28, C.mag, a, 3.5);
    const m = V(V3.unit(V3.add(NP, V3.sc(0.5, V3.rot(L.v0, NP, L.turn / 2)))));
    txt(tbDeg(L.turn * o.turn, 0), m[0], m[1] + 10, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.mag, a: a * o.turn });
  }
  tbFlag(V, st.p, st.v, C.now, a, 0.36, 4);
  tbPoint(V, st.p, a, 'g', 14);
  for (const [p, l, dx, dy] of [[E1, '+X', -48, 40], [E2, '+Y', 18, 40]]) { const q = V(p); dot(q[0], q[1], 9, 'w', a); txt(l, q[0] + dx, q[1] + dy, { size: 28, fam: F.math, w: 700, c: C.white, a }); }
  return st;
}
SCENES.loop = S => {
  const a = tbFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'The literature', 'argued']]);
  const L = TB_LOOP, V = tbView(560, 520, 290, -3 * Math.PI / 4 + 0.05 * Math.sin(0.25 * u), 0.5);
  tbSphere(V, a, { N: false });
  /* one trip round the loop from "north" (line 0) to "comes back" (line 1) */
  const t0 = phraseAt(S, 0, 'north'), t1 = phraseAt(S, 1, 'It comes back') + 0.3;
  const s = 3 * clamp((u - t0) / (t1 - t0));
  const turn = Q(S, 1, 'turned by ninety', 0.9), area = Q(S, 2, 'That is the enclosed area', 1.2);
  const N = V(NP);
  txt('N', N[0] - 14, N[1] - 52, { size: 30, fam: F.math, w: 700, c: C.white, a });
  const st = tbLoopFigure(V, a, s, { area, turn, ghost: true });
  /* panel */
  const x = TB_PX, w = TB_PW, y = 190, pa = a * at(S, 0, 0.6, 0.2);
  panel(x, y, w, 640, pa, C.cyan, 'PARALLEL TRANSPORT · 平行搬运');
  txt('N → +X → +Y → N   along great circles', x + 28, y + 80, { size: 26, fam: F.math, w: 700, c: C.cyan, a: pa });
  const turnNow = Math.atan2(V3.dot(V3.cross(L.v0, st.v), NP), V3.dot(L.v0, st.v));
  txt(s >= 3 ? `arrow back at N, turned by ${tbDeg(L.turn, 3)}` : `leg ${Math.min(3, Math.floor(s) + 1)} of 3`, x + 28, y + 140, { size: 24, fam: F.mono, w: 700, c: s >= 3 ? C.mag : C.now, a: pa * at(S, 1, 0.6, -0.4) });
  void turnNow;
  const qa = Q(S, 2, 'That is the enclosed area', 0.6);
  tbRich([['Ω = ', C.white], [`${tbDeg(L.omega, 3)} = π/2`, C.mag]], x + 28, y + 222, { size: 34, a: pa * qa, ab: 1 });
  txt(`Ω / 4π = ${(L.omega / (4 * Math.PI)).toFixed(3)} = 1/8   ·   Girard: 3·90° − 180°`, x + 28, y + 268, { size: 20, fam: F.mono, w: 700, c: C.dim, a: pa * qa });
  tbNumTag(x + w - 110, y + 25, pa);
  txt('turn = enclosed area (Gauss–Bonnet)', x + 28, y + 320, { size: 22, fam: F.mono, w: 700, c: C.white, a: pa * qa });
  tbArguedTag(x + 520, y + 320, pa * qa);
  const qb = Q(S, 3, 'Berry phase', 0.6);
  panel(x + 20, y + 380, w - 40, 230, pa * qb, C.argued, 'LITERATURE · 文献结果');
  txt('γ', x + 48, y + 466, { size: 40, fam: F.math, w: 700, c: C.white, a: pa * qb });
  txt('B', x + 48 + tw('γ', 40, F.math, 700) + 2, y + 478, { size: 24, fam: F.math, w: 700, c: C.white, a: pa * qb });
  tbRich([[' = −Ω/2 = ', C.white], ['−π/4', C.argued]], x + 92, y + 466, { size: 40, a: pa * qb, ab: 1 });
  txt('Berry 1984 · spin-up branch convention', x + 48, y + 516, { size: 20, fam: F.mono, w: 700, c: C.white, a: pa * qb });
  txt('文献结果，未在本书形式化', x + 48, y + 566, { size: 24, fam: F.zh, w: 700, c: C.argued, a: pa * qb });
};

/* ======================================================================= */
/*                          scene 6 · PAIRWISE PHASE                         */
/* ======================================================================= */
/* a complex-plane dial: unit circle, axes, and a pointer for z (drawn at |z| scaled by `scale`) */
function tbDial(cx, cy, r, z, col, a, o = {}) {
  if (a <= 0.003) return;
  ring(cx, cy, r, C.dim, 0.6 * a, 1.4);
  line(cx - r - 8, cy, cx + r + 8, cy, C.dim, 0.5 * a, 1.2);
  line(cx, cy - r - 8, cx, cy + r + 8, C.dim, 0.5 * a, 1.2);
  const L = o.unit ? r : r * Math.min(1, CX.abs(z) * (o.scale || 1));
  const ang = CX.arg(z);
  arrow(cx, cy, cx + L * Math.cos(ang), cy - L * Math.sin(ang), col, a, o.lw || 3.5);
  if (o.label) txt(o.label, cx, cy + r + 34, { size: o.ls || 22, fam: F.math, w: 700, align: 'center', c: col, a });
}
SCENES.pairs = S => {
  const a = tbFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'Lean checks', 'lean'], [2, 'Multiply', 'computed']]);
  const P = TB_PAIRS, V = tbView(400, 470, 220, -3 * Math.PI / 4, 0.5);
  tbSphere(V, a, { N: false });
  tbLoopFigure(V, a, 3, { area: 0.6, turn: 0 });
  const N = V(NP);
  /* corner names */
  txt('ψ₀', N[0] + 20, N[1] - 20, { size: 28, fam: F.math, w: 700, c: C.cyan, a });
  const X = V(E1), Y = V(E2);
  txt('ψ₁', X[0] - 52, X[1] + 76, { size: 28, fam: F.math, w: 700, c: C.cyan, a });
  txt('ψ₂', Y[0] + 18, Y[1] + 76, { size: 28, fam: F.math, w: 700, c: C.cyan, a });
  /* re-phasing (line 3) */
  const gz = Q(S, 3, 'Re-phase', 0.8), gu = Math.max(0, u - phraseAt(S, 3, 'Re-phase'));
  const al = [0, 1, 2].map(k => gz * tbGauge(gu, k) - (gz > 0 ? gz * tbGauge(0, k) : 0));
  /* panel 1: the states and the overlaps */
  const x = 760, w = 1040, y = 180, pa = a * at(S, 0, 0.6, 0.2);
  panel(x, y, w, 330, pa, C.cyan, 'PAIRWISE OVERLAPS · 两两内积');
  txt('latitude(t, z) = (√(1 − t), √t · z)', x + 28, y + 76, { size: 26, fam: F.math, w: 700, c: C.white, a: pa });
  txt('ψ₀ = (1, 0)    ψ₁ = latitude(½, 1)    ψ₂ = latitude(½, i)', x + 28, y + 122, { size: 26, fam: F.math, w: 700, c: C.cyan, a: pa });
  const q1 = Q(S, 1, 'overlap formula', 0.6), q1b = Q(S, 1, 'gives one plus i', 0.6);
  txt('⟨latitude(t, z), latitude(t, w)⟩ = (1 − t) + t · z̄ · w', x + 28, y + 184, { size: 26, fam: F.math, w: 700, c: C.white, a: pa * q1 });
  tbLean(x + 28, y + 228, 'latitude_dot', pa * q1, { size: 19 });
  const g12 = P.latDot(0.5, [1, 0], [0, 1]);
  tbRich([['G₁₂ = ⟨ψ₁, ψ₂⟩ = ½ + ½ · i = ', C.white], ['(1 + i)/2', C.cyan]], x + 28, y + 290, { size: 30, a: pa * q1b, ab: 1 });
  txt(`= ${tbCx(g12)}`, x + 700, y + 290, { size: 24, fam: F.mono, w: 700, c: C.dim, a: pa * q1b });
  /* panel 2: the product, built factor by factor on a dial; then the re-phasing */
  const y2 = 530, pb = a * at(S, 2, 0.6, -0.2);
  panel(x, y2, w, 300, pb, C.cyan, 'THREE-POINT PRODUCT · 三点连乘');
  const G = [P.G(0, 1, al), P.G(1, 2, al), P.G(2, 0, al)], names = ['G₀₁', 'G₁₂', 'G₂₀'];
  const tM = phraseAt(S, 2, 'Multiply'), mk = [0, 1, 2].map(i => clamp((u - tM - 0.5 - 0.8 * i) / 0.6));
  G.forEach((z, i) => {
    const cx = x + 84 + i * 150, cy = y2 + 130;
    tbDial(cx, cy, 52, z, C.cyan, pb * Math.max(0.35, mk[i]), { scale: 1, label: names[i] });
    txt(tbCx(z, 2), cx, cy + 120, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.white, a: pb * mk[i] });
  });
  /* running product */
  let run = [1, 0];
  mk.forEach((m, i) => { if (m > 0) { const ang = CX.arg(G[i]) * ease(m), r = Math.pow(CX.abs(G[i]), ease(m)); run = CX.mul(run, [r * Math.cos(ang), r * Math.sin(ang)]); } });
  const D = P.delta(al), dcx = x + 560, dcy = y2 + 160;
  tbDial(dcx, dcy, 88, run, C.cyan, pb, { unit: true, lw: 5 });
  txt('arg Δ', dcx, dcy - 102, { size: 22, fam: F.math, w: 700, align: 'center', c: C.cyan, a: pb });
  const q2 = Q(S, 2, 'Its phase', 0.6);
  if (q2 > 0) curve(t => [dcx + 44 * Math.cos(-CX.arg(D) * t), dcy + 44 * Math.sin(-CX.arg(D) * t)], 16, C.cyan, pb * q2, 2.5);
  tbRich([['Δ = G₀₁G₁₂G₂₀ = ', C.white], ['(1 + i)/4', C.cyan]], dcx + 120, dcy - 50, { size: 24, a: pb * mk[2] });
  txt(`Δ = ${tbCx(D)}`, dcx + 120, dcy - 6, { size: 22, fam: F.mono, w: 700, c: C.white, a: pb * mk[2] });
  txt(`arg Δ = ${tbDeg(CX.arg(D), 1)} = π/4`, dcx + 120, dcy + 38, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: pb * q2 });
  txt('= Ω/2', dcx + 120, dcy + 80, { size: 22, fam: F.mono, w: 700, c: C.argued, a: pb * q2 });
  tbArguedTag(dcx + 210, dcy + 80, pb * q2);
  tbNumTag(x + w - 110, y2 + 25, pb);
  if (gz > 0) txt(`ψₖ ↦ e^(iαₖ) ψₖ :   α = (${al.map(v => tbNum(v, 2)).join(', ')})`, x + 28, y2 + 284, { size: 20, fam: F.math, w: 700, c: C.now, a: pb * gz });
};

/* ======================================================================= */
/*                               scene 7 · LEDGER                            */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 290 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[4], t = sc.start + 1.0;
  background(t, sc, 4, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.3, a: 0.2, cx: 1320, cy: 420, camZ: 7, lw: 1.3, dots: false });
  const V = tbView(480, 560, 330, -3 * Math.PI / 4, 0.5);
  tbSphere(V, 1, { N: false });
  /* the two-angle trail from N, then the octant loop with the transported arrow */
  tbSweep(V, NP, E2, 0, TB_ADDR.th, C.white, 0.5, 0.2, 2, true);
  tbLoopFigure(V, 1, 2.35, { area: 1, turn: 0 });
  const N = V(NP);
  txt('N', N[0] - 14, N[1] - 52, { size: 32, fam: F.math, w: 700, c: C.white });
  txt(DATA.film.title_zh, 1320, 300, { size: 50, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('ONE ORTHOGONAL STEP, THEN ANOTHER', 1330, 392, { size: 38, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 4 });
  txt('TWO-ANGLE ADDRESSING AND THE BERRY PHASE', 1330, 446, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.white, ab: 2, ls: 3 });
  tbRich([['r(θ, φ) = R', C.white], ['z', C.vio], ['(φ) R', C.white], ['y', C.vio], ['(θ) N', C.white]], 1330, 548, { size: 40, align: 'center', ab: 1 });
  tbRich([['Ω = ', C.white], ['π/2', C.mag], ['    arg Δ = ', C.white], ['π/4', C.cyan]], 1330, 620, { size: 38, align: 'center' });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM ${DATA.film.number}`, 1330, 700, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  leanList(1330, 770, 1, { align: 'center', size: 18, gap: 34 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 4, sc);
  post(4);
};
