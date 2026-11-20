/* Film · The ball only shrinks · 球只缩不长
   (book quantum-geometry, part I: chapter 4, §4.2). Scenes for theme/film/engine.js.

   A qubit state is the density matrix ρ(r) = (I + x σx + y σy + z σz) / 2 of a point r = (x, y, z) of the closed unit
   ball. Every noise below is an affine map of the ball, r ↦ (λx, λy, a z + h), written { lam, a, h }.

   What each scene shows, and where it rests:
     ball     pure states on the skin |r| = 1, mixed states inside (chapter 4); a squeeze-and-lift of the whole ball
              (a schematic map, not one of the named noises).
     pinch    ρ = [[0.9, 0.3], [0.3, 0.1]] = ρ(0.6, 0, 0.8); pinching keeps the diagonal: ⟨ρ, ρ⟩ = 1.00 = 0.82 + 0.18
              (computed) ..... PinchingProjection.pinching_hilbert_schmidt_pythagorean and
              PinchingProjection.pinching_discarded_coherence_mass (LEAN); on the ball, r ↦ (0, 0, z): the foot and the
              rest of r against the z axis (QG_QUBIT.split). Phase damping multiplies the off-diagonal by c each step
              ..... QubitWitnesses.phaseDampingIterate_apply (LEAN); c = 0.6: 0.300, 0.180, 0.108, 0.065, 0.039
              (computed); on the ball (c^N x, c^N y, z).
     drift    amplitude damping in its textbook Bloch form (√(1−γ) x, √(1−γ) y, (1−γ) z + γ) (chapter 4's table:
              literature, not formalized in the book; re-derived below from the Kraus operators); γ = 0.36: south pole
              −1 ↦ −0.28, equator (1, 0, 0) ↦ (0.8, 0, 0.36), north pole fixed (computed).
     wide     F(x, y, z) = (λx, λy, a z + 1 − a), a = 0.64: the point (0.6, 0, 0.8) goes to squared radius 0.991 at
              λ = 0.8 and 1.052 at λ = 0.9 (computed); the whole ball stays inside iff λ² ≤ a
              ..... NorthPoleBallCriterion.north_pole_ball_preserving_iff (LEAN); 0.8² = 0.64 (computed).
     closer   the trace distance of two qubit states is half the distance of their points (chapter 4: a hand
              computation; argued); the pair (0.6, 0, ±0.8): 0.800, pinching 0.800, γ = 0.36 0.512; the pair
              (±0.6, 0, 0.8): 0.600, 0.000, 0.480 (computed) ..... FiniteTraceDistance.traceDistance_contract (LEAN).
     edge     a rotation keeps every distance (computed); keeping the ball inside itself does not make a map a channel
              (chapter 4; argued); the Bloch forms of the named noises are textbook results (argued).

   On load, FILM.init checks DATA.lean against the five theorems and re-derives every number shown on screen by an
   independent route (2×2 complex matrices for pinching and phase damping, Kraus operators for amplitude damping,
   eigenvalues of ρ − σ for the trace distance, a dense scan of the sphere for the ball test). Any disagreement is
   pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const NB_LEAN = {
  pinching_hilbert_schmidt_pythagorean: 'D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean',
  pinching_discarded_coherence_mass: 'D5/S3/QuantumChannels/PinchingProjection.pinching_discarded_coherence_mass',
  phaseDampingIterate_apply: 'D5/S3/Quantum/QubitWitnesses.phaseDampingIterate_apply',
  north_pole_ball_preserving_iff: 'D5/S3/QuantumChannels/ContractionGeometry/NorthPoleBallCriterion.north_pole_ball_preserving_iff',
  traceDistance_contract: 'D5/S3/Quantum/Foundation/FiniteTraceDistance.traceDistance_contract'
};
/* the affine maps of the ball: r ↦ (lam x, lam y, a z + h) */
const NB_ID = { lam: 1, a: 1, h: 0 };
const nbApply = (m, r) => [m.lam * r[0], m.lam * r[1], m.a * r[2] + m.h];
const nbPinch = { lam: 0, a: 1, h: 0 };
const nbDephase = c => ({ lam: c, a: 1, h: 0 });
const nbAmp = g => ({ lam: Math.sqrt(1 - g), a: 1 - g, h: g });
/* the map of the north-pole criterion, F(x, y, z) = (λx, λy, a z + 1 − a) */
const nbNorth = (a, lam) => ({ lam, a, h: 1 - a });
const nbMix = (m, n, k) => ({ lam: lerp(m.lam, n.lam, k), a: lerp(m.a, n.a, k), h: lerp(m.h, n.h, k) });
/* the largest squared radius of the image of the closed unit ball (it lies on the image of the sphere) */
function nbFarthest(m, n = 4000) {
  let best = -Infinity;
  for (let i = 0; i <= n; i++) { const z = -1 + 2 * i / n, q = m.lam * m.lam * (1 - z * z) + Math.pow(m.a * z + m.h, 2); if (q > best) best = q; }
  return best;
}
const nbDist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
/* the trace distance of two qubit states, as half the distance of their points (scene closer) */
const nbT = (r, s) => nbDist(r, s) / 2;
/* the state of scene pinch and the pairs of scene closer */
const NB_R = [0.6, 0, 0.8];
const NB_PAIR = [[0.6, 0, 0.8], [0.6, 0, -0.8]];
const NB_SIDE = [[0.6, 0, 0.8], [-0.6, 0, 0.8]];
const NB_G = 0.36, NB_C = 0.6;

/* complex 2×2 matrices [m00, m01, m10, m11] of complex numbers [re, im] (the checks only) */
const nbC = {
  add: (p, q) => [p[0] + q[0], p[1] + q[1]], sub: (p, q) => [p[0] - q[0], p[1] - q[1]],
  mul: (p, q) => [p[0] * q[0] - p[1] * q[1], p[0] * q[1] + p[1] * q[0]], conj: p => [p[0], -p[1]],
  n2: p => p[0] * p[0] + p[1] * p[1], sc: (p, k) => [p[0] * k, p[1] * k]
};
const nbM = {
  mul: (A, B) => [0, 1, 2, 3].map(q => { const i = q >> 1, j = q & 1; return nbC.add(nbC.mul(A[2 * i], B[j]), nbC.mul(A[2 * i + 1], B[2 + j])); }),
  dag: A => [nbC.conj(A[0]), nbC.conj(A[2]), nbC.conj(A[1]), nbC.conj(A[3])],
  add: (A, B) => A.map((z, k) => nbC.add(z, B[k])), sub: (A, B) => A.map((z, k) => nbC.sub(z, B[k])),
  tr: A => nbC.add(A[0], A[3]),
  /* the Hilbert–Schmidt inner product Tr(A* B) */
  hs: (A, B) => nbM.tr(nbM.mul(nbM.dag(A), B)),
  pinch: A => [A[0], [0, 0], [0, 0], A[3]],
  rho: r => [[(1 + r[2]) / 2, 0], [r[0] / 2, -r[1] / 2], [r[0] / 2, r[1] / 2], [(1 - r[2]) / 2, 0]],
  bloch: A => [2 * A[2][0], 2 * A[2][1], A[0][0] - A[3][0]],
  /* the trace norm of a Hermitian 2×2 matrix: the sum of the absolute values of its two eigenvalues */
  trnormH: A => { const p = A[0][0], s = A[3][0], m = (p + s) / 2, d = Math.sqrt(Math.pow((p - s) / 2, 2) + nbC.n2(A[1])); return Math.abs(m + d) + Math.abs(m - d); }
};
const nbTD = (A, B) => nbM.trnormH(nbM.sub(A, B)) / 2;
/* the channels as maps of density matrices */
const nbKraus = (Ks, A) => Ks.reduce((S, K) => nbM.add(S, nbM.mul(nbM.mul(K, A), nbM.dag(K))), [[0, 0], [0, 0], [0, 0], [0, 0]]);
const nbAmpKraus = g => [[[1, 0], [0, 0], [0, 0], [Math.sqrt(1 - g), 0]], [[0, 0], [Math.sqrt(g), 0], [0, 0], [0, 0]]];
const nbPhaseMat = (A, c, N = 1) => { const k = Math.pow(c, N); return [A[0], nbC.sc(A[1], k), nbC.sc(A[2], k), A[3]]; };
const nbDepolMat = (A, l) => A.map((z, k) => nbC.add(nbC.sc(z, 1 - l), k === 0 || k === 3 ? [l / 2, 0] : [0, 0]));
const nbRotZ = (r, t) => [r[0] * Math.cos(t) - r[1] * Math.sin(t), r[0] * Math.sin(t) + r[1] * Math.cos(t), r[2]];
const nbRotY = (r, t) => [r[0] * Math.cos(t) + r[2] * Math.sin(t), r[1], -r[0] * Math.sin(t) + r[2] * Math.cos(t)];

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('noise film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;
  const nearV = (p, q, eps = 1e-12) => nbDist(p, q) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(NB_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(NB_LEAN).length}`);
  for (const [short, gid] of Object.entries(NB_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }
  /* the shared models the scenes call */
  check(typeof QG_SPHERE === 'object' && typeof QG_SPHERE.ball === 'function', 'QG_SPHERE (viz/two-angle-addressing/model.js) is missing');
  check(typeof QG_QUBIT === 'object' && typeof QG_QUBIT.split === 'function', 'QG_QUBIT (viz/qubit-geometry/model.js) is missing');

  /* 1. PINCH: the matrix of the state, its Hilbert–Schmidt split and the Bloch picture of pinching */
  const R = nbM.rho(NB_R);
  check(near(R[0][0], 0.9) && near(R[1][0], 0.3) && near(R[2][0], 0.3) && near(R[3][0], 0.1) && R.every(z => near(z[1], 0)), 'ρ(0.6, 0, 0.8) = [[0.9, 0.3], [0.3, 0.1]]');
  const PR = nbM.pinch(R), DR = nbM.sub(R, PR);
  check(near(nbM.hs(R, R)[0], 1) && near(nbM.hs(PR, PR)[0], 0.82) && near(nbM.hs(DR, DR)[0], 0.18), 'squared sizes 1, 0.82, 0.18');
  check(near(0.81 + 0.09 + 0.09 + 0.01, 1) && near(0.81 + 0.01, 0.82) && near(0.09 + 0.09, 0.18), 'the sums on screen');
  const sp = QG_QUBIT.split(QG_QUBIT.AXES.z, NB_R);
  check(nearV(sp.foot, [0, 0, 0.8]) && near(sp.area, 0.6) && nearV(nbM.bloch(PR), sp.foot) && nearV(nbApply(nbPinch, NB_R), sp.foot), 'pinching drops r onto its foot on the z axis');
  for (let k = 0; k < 40; k++) {
    /* any complex 2×2 matrix: the Pythagorean split and the discarded mass */
    const A = [0, 1, 2, 3].map(q => [2 * rnd(k, q) - 1, 2 * rnd(k, q + 9) - 1]);
    const P = nbM.pinch(A), D = nbM.sub(A, P);
    const lhs = nbM.hs(A, A), rhs = nbC.add(nbM.hs(P, P), nbM.hs(D, D));
    check(near(lhs[0], rhs[0]) && near(lhs[1], rhs[1]), `Pythagorean split ${k}`);
    check(near(nbM.hs(D, D)[0], nbC.n2(A[1]) + nbC.n2(A[2])) && near(nbM.hs(D, D)[1], 0), `discarded mass ${k}`);
    /* any state: pinching and phase damping in the matrix agree with the maps of the ball */
    const r = QG_SPHERE.v3.scale(QG_SPHERE.v3.sph(Math.PI * rnd(k, 30), 2 * Math.PI * rnd(k, 31)), Math.sqrt(rnd(k, 32)));
    check(nearV(nbM.bloch(nbM.pinch(nbM.rho(r))), nbApply(nbPinch, r)), `pinching on the ball ${k}`);
    for (let N = 0; N <= 4; N++) check(nearV(nbM.bloch(nbPhaseMat(nbM.rho(r), NB_C, N)), nbApply(nbDephase(Math.pow(NB_C, N)), r)), `phase damping on the ball ${k}, ${N}`);
  }
  /* phase damping step by step: c^N times the off-diagonal entry, by repeating one step */
  let A = R;
  const offs = [];
  for (let N = 0; N <= 4; N++) { offs.push(A[1][0]); A = nbPhaseMat(A, NB_C); }
  [0.3, 0.18, 0.108, 0.0648, 0.03888].forEach((v, N) => check(near(offs[N], v) && near(offs[N], 0.3 * Math.pow(NB_C, N)), `phase damping step ${N}`));
  check(['0.300', '0.180', '0.108', '0.065', '0.039'].every((s, N) => offs[N].toFixed(3) === s), 'phase damping readouts');

  /* 2. DRIFT: the textbook Bloch form of amplitude damping from its Kraus operators |0⟩⟨0| + √(1−γ)|1⟩⟨1|, √γ|0⟩⟨1| */
  for (let k = 0; k < 40; k++) {
    const g = rnd(k, 50), r = QG_SPHERE.v3.scale(QG_SPHERE.v3.sph(Math.PI * rnd(k, 51), 2 * Math.PI * rnd(k, 52)), Math.sqrt(rnd(k, 53)));
    const out = nbKraus(nbAmpKraus(g), nbM.rho(r));
    check(near(nbM.tr(out)[0], 1) && nearV(nbM.bloch(out), nbApply(nbAmp(g), r)), `amplitude damping on the ball ${k}`);
  }
  const amp = nbAmp(NB_G);
  check(near(amp.lam, 0.8) && near(amp.a, 0.64) && near(amp.h, 0.36), 'γ = 0.36: widths 0.8, heights 0.64 z + 0.36');
  check(nearV(nbApply(amp, [0, 0, -1]), [0, 0, -0.28]) && nearV(nbApply(amp, [0, 0, 1]), [0, 0, 1]) && nearV(nbApply(amp, [1, 0, 0]), [0.8, 0, 0.36]), 'south pole, north pole, equator under γ = 0.36');

  /* 3. WIDE: the tracked point, and the criterion λ² ≤ a against a dense scan of the sphere */
  const q8 = nbApply(nbNorth(0.64, 0.8), NB_R), q9 = nbApply(nbNorth(0.64, 0.9), NB_R);
  const n2 = p => p[0] * p[0] + p[1] * p[1] + p[2] * p[2];
  check(nearV(q8, [0.48, 0, 0.872]) && nearV(q9, [0.54, 0, 0.872]), 'images of (0.6, 0, 0.8)');
  check(near(n2(q8), 0.990784) && near(n2(q9), 1.051984), 'squared radii 0.991 and 1.052');
  check(n2(q8).toFixed(3) === '0.991' && n2(q9).toFixed(3) === '1.052', 'squared radius readouts');
  check(nbFarthest(nbNorth(0.64, 0.8)) <= 1 + 1e-12 && nbFarthest(nbNorth(0.64, 0.9)) > 1.05, 'λ = 0.8 stays inside, λ = 0.9 pokes out');
  for (let ia = 0; ia <= 20; ia++) for (let il = -24; il <= 24; il++) {
    const a = ia / 20, l = il / 20;
    if (Math.abs(l * l - a) < 1e-9) { check(nbFarthest(nbNorth(a, l)) <= 1 + 1e-12, `edge case a = ${a}, λ = ${l}`); continue; }
    check((nbFarthest(nbNorth(a, l)) <= 1 + 1e-12) === (l * l <= a), `ball test against λ² ≤ a at a = ${a}, λ = ${l}`);
  }
  /* on the edge λ = √a the image touches the skin only at the north pole: |F|² = 1 − a(1 − a)(1 − z)² */
  for (let i = 0; i <= 40; i++) { const z = -1 + i / 20, m = nbNorth(0.64, 0.8), q = 0.64 * (1 - z * z) + Math.pow(m.a * z + m.h, 2); check(near(q, 1 - 0.64 * 0.36 * Math.pow(1 - z, 2)), `edge identity at z = ${z}`); }
  /* amplitude damping is the edge of the criterion with a = 1 − γ */
  check(near(amp.lam * amp.lam, amp.a) && near(nbNorth(amp.a, amp.lam).h, amp.h), 'amplitude damping sits on λ² = a');

  /* 4. CLOSER: trace distance = half the distance of the points; the numbers; contraction for four channels */
  for (let k = 0; k < 40; k++) {
    const pt = j => QG_SPHERE.v3.scale(QG_SPHERE.v3.sph(Math.PI * rnd(k, 60 + j), 2 * Math.PI * rnd(k, 62 + j)), Math.sqrt(rnd(k, 64 + j)));
    const r = pt(0), s = pt(1), A0 = nbM.rho(r), B0 = nbM.rho(s), T0 = nbTD(A0, B0);
    check(near(T0, nbT(r, s)), `trace distance as half the distance ${k}`);
    const g = rnd(k, 70), c = rnd(k, 71), l = rnd(k, 72);
    for (const [name, f] of [['pinching', X => nbM.pinch(X)], ['phase damping', X => nbPhaseMat(X, c)], ['amplitude damping', X => nbKraus(nbAmpKraus(g), X)], ['depolarizing', X => nbDepolMat(X, l)]])
      check(nbTD(f(A0), f(B0)) <= T0 + 1e-12, `${name} does not increase the trace distance ${k}`);
  }
  const td = (pair, f) => nbTD(f(nbM.rho(pair[0])), f(nbM.rho(pair[1])));
  const idm = X => X, pin = X => nbM.pinch(X), ampm = X => nbKraus(nbAmpKraus(NB_G), X);
  check(near(td(NB_PAIR, idm), 0.8) && near(td(NB_PAIR, pin), 0.8) && near(td(NB_PAIR, ampm), 0.512), 'the pair: 0.8, 0.8, 0.512');
  check(near(td(NB_SIDE, idm), 0.6) && near(td(NB_SIDE, pin), 0) && near(td(NB_SIDE, ampm), 0.48), 'the side pair: 0.6, 0, 0.48');
  check(near(nbT(nbApply(amp, NB_PAIR[0]), nbApply(amp, NB_PAIR[1])), 0.512), 'the pair on the ball under γ = 0.36');

  /* 5. EDGE: a rotation keeps the distance of the pair */
  for (let i = 0; i <= 24; i++) {
    const t = i * Math.PI / 12;
    check(near(nbT(nbRotY(NB_PAIR[0], t), nbRotY(NB_PAIR[1], t)), 0.8) && near(nbT(nbRotZ(NB_PAIR[0], t), nbRotZ(NB_PAIR[1], t)), 0.8), `rotation keeps 0.8 at ${i}`);
  }
});
Object.assign(FILM.speed, { ball: 0.02, pinch: 0.014, drift: 0.016, wide: 0.014, closer: 0.016, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const nbFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const nbNum = (v, n = 3) => (v < -0.5 * Math.pow(10, -n) ? '−' : '') + Math.abs(v).toFixed(n);
function nbRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const NB_MISSING = new Set();
function nbLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!NB_MISSING.has(gid)) { NB_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* orthographic view of the ball: world (x, y, z), z up → [screen x, screen y, depth] (depth > 0: behind the centre
   plane). A solid shot made with nbShot has the same camera, so 2D labels placed with V sit on the solid. */
function nbView(cx, cy, R, yaw, el) {
  const cw = Math.cos(yaw), sw = Math.sin(yaw), ce = Math.cos(el), se = Math.sin(el);
  const V = p => {
    const X = p[0] * cw - p[1] * sw, Y = p[0] * sw + p[1] * cw, Z = p[2];
    return [cx + X * R, cy - (Z * ce + Y * se) * R, Y * ce - Z * se];
  };
  Object.assign(V, { cx, cy, R, yaw, el, ce, se });
  return V;
}
function nbShot(key, V, r) {
  return solid(key, { x: r[0], y: r[1], w: r[2], h: r[3], yaw: V.yaw, pitch: V.el, unit: V.R, cx: V.cx - r[0], cy: V.cy - r[1], px: true });
}
/* a curve through world points, its part behind the centre plane dashed and fainter */
function nbPath(V, pts, col, a, w = 2, back = 0.35) {
  if (a <= 0.003) return;
  const P = pts.map(V);
  for (let i = 1; i < P.length; i++) {
    const bk = P[i - 1][2] + P[i][2] > 0;
    ctx.save(); ctx.globalAlpha = a * (bk ? back : 1); ctx.strokeStyle = col; ctx.lineWidth = w;
    if (bk) ctx.setLineDash([8, 8]);
    ctx.beginPath(); ctx.moveTo(P[i - 1][0], P[i - 1][1]); ctx.lineTo(P[i][0], P[i][1]); ctx.stroke(); ctx.restore();
  }
}
const nbRing = (n, f) => { const pts = []; for (let i = 0; i <= n; i++) pts.push(f(TAU * i / n)); return pts; };
/* the image of the unit ball under m, drawn as a wire: its outline, its equator and one meridian */
function nbWire(V, m, col, a, o = {}) {
  if (a <= 0.003) return;
  const c = V([0, 0, m.h]), rx = Math.abs(m.lam) * V.R, ry = Math.sqrt(m.lam * m.lam * V.se * V.se + m.a * m.a * V.ce * V.ce) * V.R;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = o.w || 2.5;
  if (o.fill) { ctx.fillStyle = rgba(col, o.fill); ctx.beginPath(); ctx.ellipse(c[0], c[1], Math.max(rx, 0.5), Math.max(ry, 0.5), 0, 0, TAU); ctx.fill(); }
  ctx.beginPath(); ctx.ellipse(c[0], c[1], Math.max(rx, 0.5), Math.max(ry, 0.5), 0, 0, TAU); ctx.stroke(); ctx.restore();
  if (o.inner === false) return;
  nbPath(V, nbRing(96, t => nbApply(m, [Math.cos(t), Math.sin(t), 0])), col, a * 0.8, 1.6);
  nbPath(V, nbRing(96, t => nbApply(m, [Math.sin(t), 0, Math.cos(t)])), col, a * 0.55, 1.4);
}
/* the vertical axis (violet when it is the set of fixed points) and the two poles */
function nbAxis(V, a, o = {}) {
  if (a <= 0.003) return;
  const p = V([0, 0, -1.25]), q = V([0, 0, 1.25]);
  if (o.fixed) { ctx.save(); ctx.setLineDash([12, 9]); line(p[0], p[1], q[0], q[1], C.vio, a * o.fixed, 3.5); ctx.restore(); }
  line(p[0], p[1], q[0], q[1], C.dim, a * 0.6 * (1 - (o.fixed || 0)), 1.5);
  txt('z', q[0] + 14, q[1] + 6, { size: 24, fam: F.math, w: 700, c: C.dim, a });
}
/* a cross-section of the ball (the x–z plane): centre (cx, cy), R pixels per unit */
const nbXZ = (cx, cy, R) => { const f = p => [cx + p[0] * R, cy - p[2] * R]; return Object.assign(f, { cx, cy, R }); };
function nbSection(X, m, a, o = {}) {
  if (a <= 0.003) return;
  const { cx, cy, R } = X;
  ring(cx, cy, R, C.white, a * 0.55, 1.6);
  line(cx - R * 1.15, cy, cx + R * 1.15, cy, C.dim, a * 0.5, 1.2);
  line(cx, cy + R * 1.15, cx, cy - R * 1.15, C.dim, a * 0.5, 1.2);
  if (!m) return;
  const c = X([0, 0, m.h]), rx = Math.abs(m.lam) * R, ry = m.a * R;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = o.col || C.cyan; ctx.lineWidth = o.w || 3.5;
  ctx.fillStyle = rgba(o.col || C.cyan, o.fill == null ? 0.08 : o.fill);
  ctx.beginPath(); ctx.ellipse(c[0], c[1], Math.max(rx, 0.6), Math.max(ry, 0.6), 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
}
/* opening title */
function nbTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('THE BALL ONLY SHRINKS', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('BALL · PINCH · DRIFT · WIDTH · DISTANCE · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                               scene 1 · THE BALL                          */
/* ======================================================================= */
/* pure states on the skin (polar angle, azimuth) and mixed states inside (radius, polar angle, azimuth) */
const BL_PURE = [[0.55, 0.3], [1.25, 1.9], [2.2, 3.6], [1.0, 4.4], [1.75, 5.5], [2.6, 0.9]];
const BL_MIXED = [[0.35, 1.2, 2.4], [0.55, 2.0, 5.0], [0.62, 0.7, 3.4], [0.25, 2.4, 0.4], [0.45, 1.5, 1.2]];
const BL_RHO = [0.75, -0.6], BL_SIG = [2.1, 4.3];
/* a squeeze-and-lift of the whole ball (schematic) */
const blMap = s => ({ lam: 1 - 0.42 * s, a: 1 - 0.3 * s, h: 0.24 * s });
SCENES.ball = S => {
  const u = S.u;
  nbTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'each noise', 'argued'], [2, null, 'computed']]);
  const V = nbView(960, 520, 290, -0.62 + 0.05 * u, 0.3);
  const pa = Q(S, 0, 'Pure states', 0.8), ma = Q(S, 0, 'mixed states', 0.8);
  /* line 1: the whole ball moves at once, and comes back */
  const s = ease(Q(S, 1, 'each noise', 1.4)) * (1 - ease(Q(S, 1, 'at once', 1.4, 0.6)));
  const m = blMap(s);
  const sph = (t, f, r = 1) => QG_SPHERE.v3.scale(QG_SPHERE.v3.sph(t, f), r);
  const pure = BL_PURE.map(([t, f]) => nbApply(m, sph(t, f))), mixed = BL_MIXED.map(([r, t, f]) => nbApply(m, sph(t, f, r)));
  const q = Q(S, 2, 'two states', 0.8), rho = nbApply(m, sph(...BL_RHO)), sig = nbApply(m, sph(...BL_SIG));
  const sh = nbShot('ball', V, [460, 200, 1000, 720]);
  sh.begin();
  QG_SPHERE.ball(sh, { glass: C.cyan, ink: C.blue, width: 1.5, alpha: 0.6, back: 0.35, shell: { alpha: 0.08, rim: 0.5 } });
  if (s > 0.004) sh.surface('image', (uu, vv) => nbApply(m, [Math.sin(Math.PI * vv) * Math.cos(TAU * uu), Math.sin(Math.PI * vv) * Math.sin(TAU * uu), Math.cos(Math.PI * vv)]),
    { u: [0, 1], v: [0, 1], nu: 72, nv: 36, color: C.cyan, alpha: 0.16 * clamp(s * 3), grid: { every: [6, 6], color: C.cyan, alpha: 0.35 * clamp(s * 3) }, pick: false });
  pure.forEach(p => sh.bead(p, { color: C.white, r: 7, alpha: pa * (1 - 0.6 * q) }));
  mixed.forEach(p => sh.bead(p, { color: C.cyan, r: 6, alpha: ma * (1 - 0.6 * q) }));
  if (q > 0.01) {
    sh.bead(rho, { color: C.now, r: 9, alpha: q });
    sh.bead(sig, { color: C.white, r: 9, alpha: q });
    sh.line([rho, sig], { color: C.white, width: 3, alpha: q });
  }
  sh.end(a);
  /* labels */
  const lp = V(pure[0]), lm = V(mixed[2]);
  if (pa > 0.01) {
    txt('pure · 纯态', lp[0] + 22, lp[1] - 16, { size: 26, fam: F.zh, w: 700, c: C.white, a: a * pa * (1 - q) });
    txt('on the skin · 球皮上', 140, 300, { size: 26, fam: F.zh, w: 700, c: C.white, a: a * pa });
    txt('|r| = 1', 140, 340, { size: 28, fam: F.math, w: 700, c: C.white, a: a * pa });
  }
  if (ma > 0.01) {
    txt('mixed · 混合态', lm[0] + 20, lm[1] + 34, { size: 26, fam: F.zh, w: 700, c: C.cyan, a: a * ma * (1 - q) });
    txt('inside · 球里面', 140, 410, { size: 26, fam: F.zh, w: 700, c: C.cyan, a: a * ma });
    txt('|r| < 1', 140, 450, { size: 28, fam: F.math, w: 700, c: C.cyan, a: a * ma });
  }
  const na = a * at(S, 1, 0.6) * (1 - at(S, 2, 0.6));
  if (na > 0.01) {
    panel(1420, 300, 400, 150, na, C.argued, 'NOISE · 噪声');
    txt('the whole ball moves', 1440, 372, { size: 24, fam: F.mono, w: 700, c: C.white, a: na });
    txt('整颗球一起动', 1440, 414, { size: 26, fam: F.zh, w: 700, c: C.white, a: na });
    txt('schematic squeeze · 示意', 1440, 490, { size: 18, fam: F.mono, w: 700, c: C.argued, a: na * 0.9 });
  }
  if (q > 0.01) {
    const pr = V(rho), ps = V(sig);
    txt('ρ', pr[0] + 18, pr[1] - 10, { size: 34, fam: F.math, w: 700, c: C.now, a: a * q });
    txt('σ', ps[0] + 16, ps[1] + 30, { size: 34, fam: F.math, w: 700, c: C.white, a: a * q });
    const qa = a * Q(S, 2, 'further apart', 0.6);
    chip(1620, 380, 340, 70, 'farther apart ?', C.now, qa, 30, F.mono);
    txt('拉得更远？', 1620, 460, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.now, a: qa });
  }
};

/* ======================================================================= */
/*                         scene 2 · SQUEEZE TO THE AXIS                     */
/* ======================================================================= */
const PN_V = { cx: 470, cy: 545, R: 265, yaw: -0.5, el: 0.28 };
/* a 2×2 matrix of numbers with brackets; col(i, j) → [colour, alpha] */
function pnMatrix(x, y, vals, col, a, o = {}) {
  if (a <= 0.003) return;
  const cw = o.cw || 120, rh = o.rh || 62, size = o.size || 34;
  const bx0 = x - 18, bx1 = x + 2 * cw + 18, by0 = y - rh * 0.9, by1 = y + rh * 1.35;
  for (const [bx, d] of [[bx0, 1], [bx1, -1]]) {
    line(bx, by0, bx, by1, C.white, a * 0.85, 2.5);
    line(bx, by0, bx + 14 * d, by0, C.white, a * 0.85, 2.5);
    line(bx, by1, bx + 14 * d, by1, C.white, a * 0.85, 2.5);
  }
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
    const [c, al] = col(i, j);
    txt(vals[i][j], x + cw * (j + 0.5), y + rh * i + size * 0.35, { size, fam: F.mono, w: 700, align: 'center', c, a: a * al });
  }
  if (o.name) txt(o.name, bx0 - 20, y + rh * 0.5 + size * 0.35, { size: 36, fam: F.math, w: 700, align: 'right', c: o.nameCol || C.white, a });
}
SCENES.pinch = S => {
  const u = S.u, a = nbFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean'], [4, null, 'lean']]);
  const V = nbView(PN_V.cx, PN_V.cy, PN_V.R, PN_V.yaw, PN_V.el);
  /* line 0–1: pinching squeezes the ball onto the axis; line 4: back to the ball, then phase damping in steps */
  const sqRaw = ease(Q(S, 1, 'slides sideways', 1.6)), back = ease(at(S, 4, 0.9));
  /* L4: the pinching panels fade out; P4: the phase-damping panel fades in after them */
  const L4 = at(S, 4, 0.45), P4 = at(S, 4, 0.5, 0.4), sq = sqRaw * (1 - back);
  const steps = clamp((u - phraseAt(S, 4, 'multiplying') ) / 0.9, 0, 4.4);
  const N = Math.min(4, Math.floor(steps)), fr = ease(clamp((steps - N) / 0.7));
  const lamPD = Math.pow(NB_C, N + (N < 4 ? fr : 0));
  const m = nbDephase(lerp(1 - sqRaw, lamPD, back));
  const ga = 1 - 0.5 * Math.max(sq, clamp(steps));
  nbWire(V, NB_ID, C.white, a * ga * 0.5, { w: 1.6 });
  nbAxis(V, a, { fixed: Q(S, 1, 'vertical axis', 0.8) });
  if (m.lam < 0.999) nbWire(V, m, C.cyan, a, { w: 3, fill: 0.06 });
  /* the state and its split against the axis (QG_QUBIT.split): the foot (kept, cyan) and the rest (magenta) */
  const sp = QG_QUBIT.split(QG_QUBIT.AXES.z, NB_R), r = nbApply(m, NB_R);
  const o = V([0, 0, 0]), f = V(sp.foot), pr = V(r), p0 = V(NB_R);
  const ka = a * Q(S, 1, 'onto the vertical', 0.8) * (1 - L4);
  if (ka > 0.01) {
    line(o[0], o[1], f[0], f[1], C.cyan, ka, 6);
    line(f[0], f[1], p0[0], p0[1], C.mag, ka * (0.35 + 0.65 * (1 - sq)), 5);
    txt('kept · 留下', o[0] - 22, (o[1] + f[1]) / 2 + 8, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.cyan, a: ka });
    txt('thrown away · 丢掉', p0[0] + 20, p0[1] + 30, { size: 22, fam: F.zh, w: 700, c: C.mag, a: ka });
  }
  if (sq > 0.01) dot(p0[0], p0[1], 9, 'g', a * 0.35 * sq * (1 - L4));
  dot(pr[0], pr[1], 13, 'g', a);
  txt('ρ', pr[0] + 14, pr[1] - 16, { size: 34, fam: F.math, w: 700, c: C.now, a });
  txt('r = (0.6, 0, 0.8)', 120, 250, { size: 26, fam: F.math, w: 700, c: C.now, a: a * (1 - L4) });

  /* the matrices: ρ, then pinching keeps the diagonal */
  const ma = a * (1 - L4), pk = ease(Q(S, 0, 'Pinching', 1.0));
  if (ma > 0.003) {
    panel(900, 180, 900, 250, ma, C.cyan, 'THE MATRIX · 矩阵');
    pnMatrix(1010, 280, [['0.9', '0.3'], ['0.3', '0.1']], (i, j) => (i === j ? [C.white, 1] : [C.mag, 1 - 0.75 * pk]), ma, { name: 'ρ =' });
    if (pk > 0.01) {
      arrow(1300, 310, 1400, 310, C.white, ma * pk, 3);
      txt('pinching', 1350, 292, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.white, a: ma * pk });
      pnMatrix(1470, 280, [['0.9', '0'], ['0', '0.1']], (i, j) => (i === j ? [C.cyan, 1] : [C.dim, 1]), ma * pk, { cw: 120 });
      txt('keep the diagonal · 保留对角元', 1350, 410, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: ma * pk });
    }
  }
  /* line 2: the squared sizes (Hilbert–Schmidt) */
  const ha = a * at(S, 2, 0.6) * (1 - L4);
  if (ha > 0.003) {
    panel(900, 455, 900, 255, ha, C.cyan, 'SQUARED SIZE · 平方大小  ⟨A, A⟩ = Tr(A*A)');
    nbRich([['⟨ρ, ρ⟩ = 0.81 + 0.09 + 0.09 + 0.01 = ', C.white], ['1.00', C.white]], 930, 525, { size: 28, a: ha });
    nbRich([['diagonal · 对角  0.81 + 0.01 = ', C.cyan], ['0.82', C.cyan]], 930, 573, { size: 28, a: ha * Q(S, 2, 'eight two kept', 0.5), fam: F.zh });
    nbRich([['off-diagonal · 非对角  0.09 + 0.09 = ', C.mag], ['0.18', C.mag]], 930, 621, { size: 28, a: ha * Q(S, 2, 'one eight thrown', 0.5), fam: F.zh });
    const ea = ha * Q(S, 2, 'thrown away', 0.6);
    nbRich([['1.00', C.white], [' = ', C.white], ['0.82', C.cyan], [' + ', C.white], ['0.18', C.mag]], 930, 684, { size: 36, a: ea });
  }
  /* line 3: Lean */
  const la = a * Q(S, 3, 'Lean checks', 0.6) * (1 - L4);
  if (la > 0.003) {
    txt('every 2×2 matrix · 任意 2×2 复矩阵', 904, 746, { size: 20, fam: F.zh, w: 700, c: C.lean, a: la });
    nbLean(904, 782, NB_LEAN.pinching_hilbert_schmidt_pythagorean, la, { size: 18 });
    nbLean(904, 816, NB_LEAN.pinching_discarded_coherence_mass, la * Q(S, 3, 'off-diagonal mass', 0.5), { size: 18 });
  }
  /* line 4: phase damping, step by step */
  if (P4 > 0.003) {
    const pa = a * P4;
    panel(900, 190, 900, 620, pa, C.cyan, 'PHASE DAMPING · 相位阻尼   c = 0.6');
    const off = 0.3 * Math.pow(NB_C, N);
    pnMatrix(1020, 300, [['0.9', nbNum(off)], [nbNum(off), '0.1']], (i, j) => (i === j ? [C.white, 1] : [C.cyan, 1]), pa, { name: 'ρ =', cw: 150 });
    txt('each step · 每一步：off-diagonal × c', 1380, 330, { size: 22, fam: F.zh, w: 700, c: C.white, a: pa });
    const rows = ['0.300', '0.180', '0.108', '0.065', '0.039'];
    for (let k = 0; k <= 4; k++) {
      const ra = pa * (k === 0 ? 1 : clamp(steps - k + 1 + 0.3));
      const y = 470 + k * 54, cur = k === N;
      txt(`N = ${k}`, 960, y, { size: 26, fam: F.mono, w: 700, c: cur ? C.now : C.dim, a: ra });
      txt(k === 0 ? '0.3' : `0.3 × 0.6${['', '', '²', '³', '⁴'][k] || ''}`, 1110, y, { size: 26, fam: F.math, w: 700, c: cur ? C.now : C.white, a: ra });
      txt(`= ${rows[k]}`, 1340, y, { size: 26, fam: F.mono, w: 700, c: cur ? C.now : C.cyan, a: ra });
    }
    nbLean(940, 780, NB_LEAN.phaseDampingIterate_apply, pa * Q(S, 4, 'multiplying', 0.6), { size: 18 });
    txt('cigar · 雪茄', V([0, 0, 0])[0] + 70, V([0, 0, 0])[1] + 8, { size: 26, fam: F.zh, w: 700, c: C.cyan, a: a * Q(S, 4, 'slims into', 0.6) });
  }
  if (Q(S, 3, 'Lean checks', 1, 0.8) > 0 && L4 <= 0) stamp('PYTHAGORAS', 1615, 600, Q(S, 3, 'Lean checks', 0.5, 0.8) * (1 - at(S, 3, 0.5, 3.4)), C.lean, 26, -0.08);
};

/* ======================================================================= */
/*                           scene 3 · SHRINK AND RISE                       */
/* ======================================================================= */
const DR_V = { cx: 600, cy: 540, R: 285, yaw: -0.55, el: 0.26 };
SCENES.drift = S => {
  const u = S.u, a = nbFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed']]);
  const V = nbView(DR_V.cx, DR_V.cy, DR_V.R, DR_V.yaw + 0.04 * u, DR_V.el);
  const g = NB_G * ease(Q(S, 1, 'heights are scaled', 3.2));
  const m = nbAmp(g);
  const south = nbApply(m, [0, 0, -1]), eq = nbApply(m, [1, 0, 0]);
  const sh = nbShot('drift', V, [150, 190, 900, 740]);
  sh.begin();
  QG_SPHERE.ball(sh, { glass: C.cyan, ink: C.blue, width: 1.5, alpha: 0.6, back: 0.35, shell: { alpha: 0.08, rim: 0.5 } });
  sh.surface('image', (uu, vv) => nbApply(m, [Math.sin(Math.PI * vv) * Math.cos(TAU * uu), Math.sin(Math.PI * vv) * Math.sin(TAU * uu), Math.cos(Math.PI * vv)]),
    { u: [0, 1], v: [0, 1], nu: 96, nv: 48, color: C.cyan, alpha: 0.26, grid: { every: [8, 6], color: C.cyan, alpha: 0.75 }, pick: false });
  sh.line([[0, 0, -1.25], [0, 0, 1.3]], { color: C.dim, width: 1.5, alpha: 0.6, dash: [10, 9] });
  sh.line([[0, 0, -1], south], { color: C.now, width: 3, alpha: 0.6 * clamp(g / 0.05), dash: [8, 8] });
  sh.bead([0, 0, 1], { color: C.vio, r: 10 });
  sh.bead(south, { color: C.now, r: 10 });
  sh.bead(eq, { color: C.white, r: 8, alpha: Q(S, 1, 'widths shrink', 0.6) });
  sh.end(a);
  const pn = V([0, 0, 1]), ps = V(south), pe = V(eq);
  txt('north pole · 北极 |0⟩', pn[0] - 24, pn[1] - 44, { size: 24, fam: F.zh, w: 700, align: 'right', c: C.vio, a });
  txt('ground state · 基态', pn[0] - 24, pn[1] - 14, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.vio, a: a * 0.85 });
  const lx = V.cx - V.R - 30;
  ctx.save(); ctx.setLineDash([5, 6]); line(ps[0] - 12, ps[1], lx + 8, ps[1], C.now, a * 0.7, 1.5); ctx.restore();
  txt(`z = ${nbNum(south[2], 2)}`, lx, ps[1] + 9, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.now, a });
  if (Q(S, 1, 'widths shrink', 0.6) > 0.01) txt(`(${nbNum(eq[0], 2)}, ${nbNum(eq[2], 2)})`, pe[0] + 18, pe[1] - 14, { size: 22, fam: F.mono, w: 700, c: C.white, a: a * Q(S, 1, 'widths shrink', 0.6) });
  /* line 0: the picture */
  panel(1150, 200, 650, 200, a, C.argued, 'ENERGY LOSS · 能量耗散');
  txt('excited ↓ falls back to the ground state', 1172, 270, { size: 22, fam: F.mono, w: 700, c: C.white, a });
  txt('激发态往北极的基态跌落', 1172, 310, { size: 26, fam: F.zh, w: 700, c: C.white, a });
  txt('ball form: textbook result · 文献结果，未在本书形式化', 1172, 370, { size: 17, fam: F.zh, w: 700, c: C.argued, a: a * 0.95 });
  /* line 1: the numbers */
  const na = a * at(S, 1, 0.6);
  if (na > 0.003) {
    panel(1150, 430, 650, 380, na, C.cyan, 'γ = 0.36');
    nbRich([['height · 高度   z → ', C.white], ['0.64', C.cyan], [' z + ', C.white], ['0.36', C.cyan]], 1172, 500, { size: 28, a: na * Q(S, 1, 'heights are scaled', 0.5), fam: F.zh });
    nbRich([['width · 宽度   x → ', C.white], ['0.8', C.cyan], [' x', C.white]], 1172, 556, { size: 28, a: na * Q(S, 1, 'widths shrink', 0.5), fam: F.zh });
    const sa = na * at(S, 2, 0.6);
    nbRich([['south · 南极   −1 → ', C.white], ['−0.28', C.now]], 1172, 630, { size: 28, a: sa, fam: F.zh });
    nbRich([['north · 北极   1 → ', C.white], ['1', C.vio]], 1172, 686, { size: 28, a: sa * Q(S, 2, 'north pole stays', 0.5), fam: F.zh });
    txt('0.64 × (−1) + 0.36 = −0.28', 1172, 750, { size: 22, fam: F.mono, w: 700, c: C.dim, a: sa });
  }
};

/* ======================================================================= */
/*                               scene 4 · HOW WIDE                          */
/* ======================================================================= */
const WD = nbXZ(560, 520, 290);
SCENES.wide = S => {
  const u = S.u, a = nbFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'computed']]);
  /* λ: 0.8, then 0.9 on "width zero point nine", back to 0.8 on line 3 */
  const up = ease(Q(S, 1, 'width zero point nine', 1.2)) * (1 - ease(at(S, 3, 1.2)));
  const lam = 0.8 + 0.1 * up, m = nbNorth(0.64, lam);
  nbSection(WD, null, a);
  txt('x', WD.cx + WD.R * 1.15 + 12, WD.cy + 8, { size: 24, fam: F.math, w: 700, c: C.dim, a });
  txt('z', WD.cx + 10, WD.cy - WD.R * 1.15 - 6, { size: 24, fam: F.math, w: 700, c: C.dim, a });
  /* the image: cyan inside the ball, magenta where it pokes out */
  const c = WD([0, 0, m.h]), rx = lam * WD.R, ry = m.a * WD.R;
  ctx.save(); ctx.globalAlpha = a;
  ctx.beginPath(); ctx.ellipse(c[0], c[1], rx, ry, 0, 0, TAU); ctx.fillStyle = rgba(C.cyan, 0.1); ctx.fill();
  ctx.strokeStyle = C.cyan; ctx.lineWidth = 3.5; ctx.stroke();
  ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.arc(WD.cx, WD.cy, WD.R, 0, TAU, true); ctx.clip('evenodd');
  ctx.beginPath(); ctx.ellipse(c[0], c[1], rx, ry, 0, 0, TAU); ctx.fillStyle = rgba(C.mag, 0.35); ctx.fill();
  ctx.strokeStyle = C.mag; ctx.lineWidth = 5; ctx.stroke();
  ctx.restore();
  /* the fixed north pole */
  const pn = WD([0, 0, 1]);
  dot(pn[0], pn[1], 11, 'v', a);
  txt('fixed · 不动', pn[0] + 20, pn[1] - 16, { size: 22, fam: F.zh, w: 700, c: C.vio, a });
  /* line 1: the tracked point */
  const ta = a * Q(S, 1, 'Follow one point', 0.6);
  const P = WD(NB_R), FP = nbApply(m, NB_R), pf = WD(FP), out = FP[0] * FP[0] + FP[2] * FP[2];
  if (ta > 0.003) {
    dot(P[0], P[1], 9, 'w', ta * 0.8);
    txt('(0.6, 0.8)', P[0] + 16, P[1] - 12, { size: 22, fam: F.mono, w: 700, c: C.white, a: ta });
    arrow(P[0], P[1], pf[0] + 10, pf[1] + 4, C.white, ta * 0.5, 2);
    dot(pf[0], pf[1], 12, out > 1 ? 'm' : 'g', ta);
  }
  /* readout */
  panel(1000, 200, 800, 300, a, C.cyan, 'ONE POINT · 一个点   a = 0.64');
  nbRich([['F(x, y, z) = (λx, λy, 0.64 z + 0.36)', C.white]], 1024, 270, { size: 28, a });
  if (ta > 0.003) {
    const col = out > 1 ? C.mag : C.cyan;
    nbRich([['λ = ', C.white], [lam.toFixed(2), C.now]], 1024, 330, { size: 30, a: ta });
    nbRich([[`(0.6λ)² + 0.872² = `, C.white], [out.toFixed(3), col]], 1024, 390, { size: 30, a: ta });
    txt(out > 1 ? 'outside · 刺出球皮' : 'inside · 在球里', 1024, 450, { size: 26, fam: F.zh, w: 700, c: col, a: ta });
    if (out > 1) txt('a map, not a channel · 只是映射，不是信道', 1340, 450, { size: 18, fam: F.zh, w: 700, c: C.argued, a: ta * clamp((out - 1) / 0.03) });
  }
  /* line 2: the criterion */
  const la = a * Q(S, 2, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1000, 530, 800, 270, la, C.lean, 'THE EXACT RULE · 精确判据');
    nbRich([['whole ball inside  ', C.white], ['⟺', C.lean], ['  λ² ≤ a', C.lean]], 1024, 610, { size: 34, a: la });
    txt('整颗球留在球里，当且仅当 λ² ≤ a', 1024, 660, { size: 24, fam: F.zh, w: 700, c: C.white, a: la });
    nbLean(1024, 720, NB_LEAN.north_pole_ball_preserving_iff, la, { size: 17 });
    /* line 3: amplitude damping is the edge */
    const ea = la * at(S, 3, 0.6);
    nbRich([['0.8² = 0.64 = a', C.now], ['  → on the edge · 恰在边界', C.white]], 1024, 776, { size: 26, a: ea, fam: F.zh });
  }
  if (at(S, 3, 0.6) > 0) {
    txt('touches only here · 只在这里相切', pn[0] - 20, pn[1] + 8, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.cyan, a: a * at(S, 3, 0.6, 1.2) });
  }
  stamp('λ² ≤ a', 1500, 330, Q(S, 2, 'if and only if', 0.5) * (1 - at(S, 3, 0.4)), C.lean, 34, -0.06);
};

/* ======================================================================= */
/*                            scene 5 · NEVER FARTHER                        */
/* ======================================================================= */
const CL_X = [330, 960, 1590], CL_Y = 490, CL_R = 190;
SCENES.closer = S => {
  const u = S.u, a = nbFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [3, 'Lean checks', 'lean']]);
  const cols = [
    { m: NB_ID, name: 'start · 起初', show: 1 },
    { m: nbPinch, name: 'pinching · 捏合', show: Q(S, 1, 'Pinching leaves', 0.7) },
    { m: nbAmp(NB_G), name: 'energy loss · 能量耗散  γ = 0.36', show: Q(S, 2, 'Energy loss', 0.7) }
  ];
  const pa = Q(S, 1, 'This pair', 0.6);
  cols.forEach((cl, k) => {
    const ca = a * cl.show;
    if (ca <= 0.003) return;
    const X = nbXZ(CL_X[k], CL_Y, CL_R);
    nbSection(X, k === 0 ? null : cl.m, ca, { w: 3 });
    txt(cl.name, CL_X[k], CL_Y + CL_R + 56, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: ca });
    if (pa <= 0.003) return;
    const r = nbApply(cl.m, NB_PAIR[0]), s = nbApply(cl.m, NB_PAIR[1]), pr = X(r), ps = X(s);
    line(pr[0], pr[1], ps[0], ps[1], C.white, ca * pa, 3);
    dot(pr[0], pr[1], 11, 'g', ca * pa);
    dot(ps[0], ps[1], 11, 'w', ca * pa);
    txt('ρ', pr[0] + 16, pr[1] - 8, { size: 28, fam: F.math, w: 700, c: C.now, a: ca * pa });
    txt('σ', ps[0] + 16, ps[1] + 24, { size: 28, fam: F.math, w: 700, c: C.white, a: ca * pa });
    txt(`T = ${nbNum(nbT(r, s))}`, CL_X[k], CL_Y + CL_R + 104, { size: 32, fam: F.mono, w: 700, align: 'center', c: k === 0 ? C.white : C.cyan, a: ca * pa });
    if (k > 0) arrow(CL_X[k - 1] + CL_R + 40, CL_Y, CL_X[k] - CL_R - 40, CL_Y, C.dim, ca * 0.8, 2.5);
  });
  /* line 0: the formula */
  const fa = a * (1 - at(S, 3, 0.6));
  nbRich([['T(ρ, σ) = ', C.white], ['½ |r − s|', C.cyan]], W / 2, 210, { size: 36, a: fa, align: 'center' });
  txt('half the straight distance · 直线距离的一半（手算）', W / 2, 252, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.argued, a: fa * 0.95 });
  /* another pair (side by side), on screen only */
  const sa = a * at(S, 2, 0.6, 1.4) * (1 - at(S, 3, 0.6));
  if (sa > 0.003) {
    const v = NB_SIDE, f = m => nbNum(nbT(nbApply(m, v[0]), nbApply(m, v[1])));
    txt(`side-by-side pair · 并排的一对：${f(NB_ID)}  →  捏合 ${f(nbPinch)}  ·  耗散 ${f(nbAmp(NB_G))}`, W / 2, 822, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.dim, a: sa });
  }
  /* line 3: Lean */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(560, 158, 800, 134, la, C.lean, 'EVERY QUANTUM CHANNEL Φ · 任意量子信道');
    nbRich([['T(Φ(ρ), Φ(σ)) ', C.white], ['≤', C.lean], [' T(ρ, σ)', C.white]], W / 2, 226, { size: 32, a: la, align: 'center' });
    nbLean(760, 274, NB_LEAN.traceDistance_contract, la, { size: 17 });
    stamp('NEVER FARTHER', 1600, 236, Q(S, 3, 'never grows', 0.5), C.lean, 24, -0.05);
  }
};

/* ======================================================================= */
/*                         scene 6 · WHAT IT DOES NOT SAY                    */
/* ======================================================================= */
const ED = nbXZ(420, 470, 220);
SCENES.edge = S => {
  const u = S.u, a = nbFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, null, 'argued']]);
  /* line 0: a rotation about y carries the pair round; the distance stays 0.800 */
  const th = 1.4 * ease(clamp((u - lineAt(S, 0).s) / 3.2));
  const r = nbRotY(NB_PAIR[0], th), s = nbRotY(NB_PAIR[1], th);
  nbSection(ED, null, a);
  const pr = ED(r), ps = ED(s), p0 = ED(NB_PAIR[0]), q0 = ED(NB_PAIR[1]);
  line(p0[0], p0[1], q0[0], q0[1], C.white, a * 0.25, 2);
  line(pr[0], pr[1], ps[0], ps[1], C.white, a, 3);
  dot(pr[0], pr[1], 11, 'g', a);
  dot(ps[0], ps[1], 11, 'w', a);
  txt('ρ', pr[0] + 16, pr[1] - 8, { size: 28, fam: F.math, w: 700, c: C.now, a });
  txt('σ', ps[0] + 16, ps[1] + 24, { size: 28, fam: F.math, w: 700, c: C.white, a });
  txt('rotation · 转动', ED.cx, ED.cy + ED.R + 60, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a });
  txt(`T = ${nbNum(nbT(r, s))}`, ED.cx, ED.cy + ED.R + 108, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.cyan, a });
  /* the three limits */
  const rows = [
    { k: 0, col: C.cyan, en: 'never grows ≠ always shrinks', zh: '“不变大”不等于“一定变小”', note: 'a rotation keeps 0.800 · 转动保持 0.800' },
    { k: 1, col: C.argued, en: 'inside the ball ≠ a channel', zh: '留在球里，不等于就是信道', note: 'complete positivity asks more · 完全正性还有条件' },
    { k: 2, col: C.argued, en: 'ball pictures of named noises', zh: '各种噪声在球上的样子', note: 'textbook results, not formalized here · 教科书结果，本书未形式化' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 220 + i * 210;
    panel(860, y, 940, 180, ra, rw.col);
    txt(rw.en, 890, y + 56, { size: 30, fam: F.mono, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 890, y + 104, { size: 28, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 890, y + 148, { size: 20, fam: F.zh, w: 700, c: rw.col === C.cyan ? C.dim : C.argued, a: ra * 0.95 });
  });
};

/* ======================================================================= */
/*                                scene 7 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 260 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[0], t = sc.end - 1.0;
  background(t, sc, 0, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  /* the ball, and its image under energy loss */
  const V = nbView(560, 540, 330, -0.55, 0.28), m = nbAmp(NB_G);
  nbWire(V, NB_ID, C.white, 0.5, { w: 1.8 });
  nbAxis(V, 0.9);
  nbWire(V, m, C.cyan, 1, { w: 3.5, fill: 0.08 });
  const pn = V([0, 0, 1]), ps0 = V([0, 0, -1]), ps = V(nbApply(m, [0, 0, -1]));
  ctx.save(); ctx.setLineDash([8, 8]); line(ps0[0], ps0[1], ps[0], ps[1], C.now, 0.8, 3); ctx.restore();
  dot(pn[0], pn[1], 13, 'v', 1);
  dot(ps[0], ps[1], 13, 'g', 1);
  txt(DATA.film.title_zh, 1340, 430, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('THE BALL', 1340, 528, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 5 });
  txt('ONLY SHRINKS', 1340, 590, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 2, ls: 4 });
  nbRich([['T(Φρ, Φσ) ', C.white], ['≤', C.lean], [' T(ρ, σ)', C.white]], 1340, 690, { size: 40, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1340, 770, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
