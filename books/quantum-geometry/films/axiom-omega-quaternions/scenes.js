/* Film · No ruler, only comparisons: the quaternions · 没有尺子，只有比较：四元数
   (book quantum-geometry, chapter 39: §39.1, with the ray kernel of §39.3 and the two-point homogeneity of §39.4).
   Scenes for theme/film/engine.js.

   Quaternions are arrays [q0, q1, q2, q3] = q0 + q1 i + q2 j + q3 k. The unit quaternion model carries the transfer
   [x, y, z] = x y⁻¹ z and the reading κ(x, y) = (1 + ⟨x, y⟩) / 2.

   What each scene shows, and where it rests:
     ruler   the two primitives of AXIOM-Ω (transfer and reading) and two of its rules (MODEL: argued); the transfer is
             drawn as a flat sketch z ↦ z + (x − y) (argued).
     five    the five points 1, −1, i, j, k: their 5×5 reading table has ones, halves and two zeros and determinant 1/8
             (computed), so the readings need five columns; the feature map (1, q0, q1, q2, q3)/√2 (computed)
             ..... TernaryComparisonRankFive.five_le_of_hasFeatureRank (LEAN).
     quat    noncommutative, chain-connected, touching zero, rank five, reading complete ⟹ a bijection onto Sp(1) that
             carries o to 1, the transfer to u(x)u(y)⁻¹u(z) and the reading to (1 + ⟨u x, u y⟩)/2
             ..... TernaryComparisonIsomorphism.exists_unitQuaternion_equiv (LEAN); the picture puts the images on one
             great circle of S³ (schematic: argued); "the origin was only chosen" (argued).
     born    x = 1, y = 0.6 + 0.8 j, phase c = cos χ + i sin χ: the readings 2κ(x, y c) − 1 = 0.6 cos χ and
             2κ(x, y c i) − 1 = −0.6 sin χ, squares summing to 0.36 (computed); the Hopf images (0, 0, 1) and
             (−0.96, 0, −0.28) on the Bloch sphere, the second one fixed while χ turns (computed); the sum ignores the
             phase ..... QuaternionRayKernel.rayKernel_mul_phase_right (LEAN) and equals |⟨s(x)|s(y)⟩|² with
             s(x) = (1, 0), s(y) = (0.6, −0.8) ..... QuaternionRayKernel.rayKernel_eq_bornProbability_spinor (LEAN);
             reading it as a probability is MODEL (argued).
     homog   (x, y) = (1, 0.6 + 0.8 j), (x′, y′) = (j, 0.64 i + 0.6 j − 0.48 k): both readings 0.8, quotients
             0.6 + 0.8 j and 0.6 + 0.48 i + 0.64 k, imaginary arrows of length 0.8 turned onto each other by conjugation
             with c = w/|w|, w = 0.64 − v′v, a quarter turn about (0.8, 0, −0.6); p = x′ c x⁻¹, q = c⁻¹ (computed)
             ..... QuaternionTwoPointHomogeneity.exists_mul_mul_eq_of_kappa_eq (LEAN).
     edge    rational points (a/c, b/c) of the circle cos t + i sin t, with c ≤ 65, and the missing point (1 + i)/√2
             (computed); the rational unit quaternions pass the other conditions (hand derivation in §39.1.2: argued);
             the axiom, the probability reading and the minimal rank are MODEL (argued).

   On load, FILM.init checks DATA.lean against the five theorems and re-derives every number on screen by an independent
   route (Gaussian elimination for the determinant, complex spinors for the Born weight, quaternion products for the
   Hopf images and for p x q = x′, p y q = y′). Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const AO_LEAN = {
  five_le_of_hasFeatureRank: 'D5/S3/Quantum/AURICOmega/TernaryComparisonRankFive.five_le_of_hasFeatureRank',
  exists_unitQuaternion_equiv: 'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv',
  rayKernel_mul_phase_right: 'D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_mul_phase_right',
  rayKernel_eq_bornProbability_spinor: 'D5/S3/Quantum/AURICOmega/QuaternionRayKernel.rayKernel_eq_bornProbability_spinor',
  exists_mul_mul_eq_of_kappa_eq: 'D5/S3/Quantum/AURICOmega/QuaternionTwoPointHomogeneity.exists_mul_mul_eq_of_kappa_eq'
};
const aoQ = {
  mul: (a, b) => [a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3], a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1], a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]],
  conj: a => [a[0], -a[1], -a[2], -a[3]],
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3],
  norm: a => Math.hypot(a[0], a[1], a[2], a[3]),
  sc: (a, k) => a.map(v => v * k),
  sub: (a, b) => a.map((v, i) => v - b[i])
};
const aoK = (p, q) => (1 + aoQ.dot(p, q)) / 2;
const AO_ONE = [1, 0, 0, 0], AO_I = [0, 1, 0, 0], AO_J = [0, 0, 1, 0], AO_K = [0, 0, 0, 1];
/* scene five: the five points and their reading table */
const AO_FIVE = [AO_ONE, [-1, 0, 0, 0], AO_I, AO_J, AO_K];
const AO_FIVE_NAMES = ['1', '−1', 'i', 'j', 'k'];
const AO_TABLE = AO_FIVE.map(p => AO_FIVE.map(q => aoK(p, q)));
function aoDet(M) {
  const A = M.map(r => r.slice()), n = A.length;
  let d = 1;
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    if (Math.abs(A[p][c]) < 1e-15) return 0;
    if (p !== c) { [A[p], A[c]] = [A[c], A[p]]; d = -d; }
    d *= A[c][c];
    for (let r = c + 1; r < n; r++) { const f = A[r][c] / A[c][c]; for (let k = c; k < n; k++) A[r][k] -= f * A[c][k]; }
  }
  return d;
}
/* scene born: x = 1, y = 0.6 + 0.8 j, the phase c(χ) = cos χ + i sin χ */
const AO_BX = AO_ONE, AO_BY = [0.6, 0, 0.8, 0];
const aoPhase = chi => [Math.cos(chi), Math.sin(chi), 0, 0];
const aoRead1 = chi => 2 * aoK(AO_BX, aoQ.mul(AO_BY, aoPhase(chi))) - 1;
const aoRead2 = chi => 2 * aoK(AO_BX, aoQ.mul(aoQ.mul(AO_BY, aoPhase(chi)), AO_I)) - 1;
const aoHopf = x => aoQ.mul(aoQ.mul(x, AO_I), aoQ.conj(x));
/* the Bloch vector of the spinor of x: (h3, h2, h1) of its Hopf image (rayKernel_eq_bornProbability_spinor) */
const aoBloch = x => { const h = aoHopf(x); return [h[3], h[2], h[1]]; };
/* the spinor s(q) = (q0 + q1 î, −q2 + q3 î), complex numbers [re, im] */
const aoSpinor = q => [[q[0], q[1]], [-q[2], q[3]]];
const aoOverlap2 = (v, w) => { const re = v[0][0] * w[0][0] + v[0][1] * w[0][1] + v[1][0] * w[1][0] + v[1][1] * w[1][1], im = v[0][0] * w[0][1] - v[0][1] * w[0][0] + v[1][0] * w[1][1] - v[1][1] * w[1][0]; return re * re + im * im; };
/* scene homog: two pairs with reading 0.8 */
const AO_HX = AO_ONE, AO_HY = [0.6, 0, 0.8, 0], AO_HX2 = AO_J, AO_HA2 = [0.6, 0.48, 0, 0.64];
const AO_HY2 = aoQ.mul(AO_HX2, AO_HA2);
const AO_HV = [0, 0.8, 0], AO_HV2 = [0.48, 0, 0.64];            /* imaginary parts (i, j, k) of the two quotients */
const AO_HW = aoQ.sub([0.64, 0, 0, 0], aoQ.mul([0, ...AO_HV2], [0, ...AO_HV]));
const AO_HC = aoQ.sc(AO_HW, 1 / aoQ.norm(AO_HW));
const AO_HP = aoQ.mul(aoQ.mul(AO_HX2, AO_HC), aoQ.conj(AO_HX)), AO_HQ = aoQ.conj(AO_HC);
const AO_AXIS = (() => { const v = AO_HC.slice(1), n = Math.hypot(...v); return v.map(t => t / n); })();
const AO_TURN = 2 * Math.acos(AO_HC[0]);
/* scene edge: the rational points of the circle cos t + i sin t with denominator at most 65 */
const AO_RAT = (() => {
  const out = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  for (let c = 2; c <= 65; c++) for (let a = 1; a < c; a++) {
    const b = Math.round(Math.sqrt(c * c - a * a));
    if (b > 0 && a * a + b * b === c * c) for (const [s, t] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) out.push([s * a / c, t * b / c]);
  }
  return out;
})();

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('axiom-omega film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;
  const nearQ = (p, q, eps = 1e-12) => p.every((v, i) => Math.abs(v - q[i]) < eps);

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(AO_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(AO_LEAN).length}`);
  for (const [short, gid] of Object.entries(AO_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }
  check(typeof QG_SPHERE === 'object' && typeof QG_SPHERE.seg === 'function', 'QG_SPHERE (viz/two-angle-addressing/model.js) is missing');

  /* 1. the unit quaternion model: the rules of the structure on samples */
  const rq = (k, j) => { const v = [0, 1, 2, 3].map(t => 2 * rnd(k, j + t) - 1), n = aoQ.norm(v); return aoQ.sc(v, 1 / n); };
  const tri = (x, y, z) => aoQ.mul(aoQ.mul(x, aoQ.conj(y)), z);
  for (let k = 0; k < 30; k++) {
    const x = rq(k, 0), y = rq(k, 10), z = rq(k, 20), u = rq(k, 30), v = rq(k, 40);
    check(nearQ(tri(x, x, z), z) && nearQ(tri(x, z, z), x), `[x, x, z] = z and [x, z, z] = x ${k}`);
    check(nearQ(tri(tri(x, y, z), u, v), tri(x, y, tri(z, u, v))), `associativity ${k}`);
    check(near(aoK(tri(x, u, v), tri(y, u, v)), aoK(x, y)) && near(aoK(tri(u, v, x), tri(u, v, y)), aoK(x, y)), `transfers keep the reading ${k}`);
    check(aoK(x, y) >= -1e-15 && aoK(x, y) <= 1 + 1e-15, `reading in [0, 1] ${k}`);
  }
  check(!nearQ(tri(AO_I, AO_ONE, AO_J), tri(AO_J, AO_ONE, AO_I)) && nearQ(aoQ.mul(AO_I, AO_J), AO_K) && nearQ(aoQ.mul(AO_J, AO_I), [0, 0, 0, -1]), 'i j = k, j i = −k');

  /* 2. FIVE: the table, its zeros, its determinant 1/8, and the feature map into five columns */
  const flat = AO_TABLE.flat();
  check(flat.filter(v => near(v, 0)).length === 2 && flat.filter(v => near(v, 1)).length === 5 && flat.filter(v => near(v, 0.5)).length === 18, 'the table: five ones, eighteen halves, two zeros');
  check(near(aoDet(AO_TABLE), 1 / 8), `determinant ${aoDet(AO_TABLE)} ≠ 1/8`);
  const phi = q => [1, ...q].map(v => v / Math.SQRT2);
  for (let k = 0; k < 20; k++) { const p = rq(k, 50), q = rq(k, 60); check(near(phi(p).reduce((s, v, i) => s + v * phi(q)[i], 0), aoK(p, q)), `feature map ${k}`); }

  /* 3. BORN: the two readings, their squares, the spinor overlap and the Hopf images */
  for (let i = 0; i <= 48; i++) {
    const chi = TAU * i / 48, a = aoRead1(chi), b = aoRead2(chi);
    check(near(a, 0.6 * Math.cos(chi)) && near(b, -0.6 * Math.sin(chi)), `readings at χ = ${i}`);
    check(near(a * a + b * b, 0.36), `ray kernel 0.36 at χ = ${i}`);
    const yc = aoQ.mul(AO_BY, aoPhase(chi));
    check(near(aoOverlap2(aoSpinor(AO_BX), aoSpinor(yc)), 0.36), `spinor overlap at χ = ${i}`);
    check(nearQ(aoBloch(yc), [-0.96, 0, -0.28]), `Hopf image fixed at χ = ${i}`);
  }
  check(nearQ(aoBloch(AO_BX), [0, 0, 1]) && near((1 + aoQ.dot(aoHopf(AO_BX), aoHopf(AO_BY))) / 2, 0.36), 'Hopf images and (1 + ⟨h x, h y⟩)/2 = 0.36');
  check(nearQ(aoSpinor(AO_BY).flat(), [0.6, 0, -0.8, 0]), 's(y) = (0.6, −0.8)');

  /* 4. HOMOG: both readings 0.8, the quotients, the turn, and p x q = x′, p y q = y′ */
  check(nearQ(AO_HY2, [0, 0.64, 0.6, -0.48]), 'y′ = 0.64 i + 0.6 j − 0.48 k');
  check(near(aoK(AO_HX, AO_HY), 0.8) && near(aoK(AO_HX2, AO_HY2), 0.8), 'both readings 0.8');
  const qa = aoQ.mul(aoQ.conj(AO_HX), AO_HY), qa2 = aoQ.mul(aoQ.conj(AO_HX2), AO_HY2);
  check(nearQ(qa, [0.6, ...AO_HV]) && nearQ(qa2, [0.6, ...AO_HV2]), 'the quotients');
  check(near(Math.hypot(...AO_HV), 0.8) && near(Math.hypot(...AO_HV2), 0.8), 'imaginary arrows of length 0.8');
  check(nearQ(aoQ.mul(AO_HC, qa), aoQ.mul(qa2, AO_HC)), 'c a = a′ c');
  check(nearQ(aoQ.mul(aoQ.mul(AO_HP, AO_HX), AO_HQ), AO_HX2) && nearQ(aoQ.mul(aoQ.mul(AO_HP, AO_HY), AO_HQ), AO_HY2), 'p x q = x′ and p y q = y′');
  check(nearQ(QG_SPHERE.v3.rot(AO_HV, AO_AXIS, AO_TURN), AO_HV2) && near(AO_TURN, Math.PI / 2) && nearQ(AO_AXIS, [0.8, 0, -0.6]), 'a quarter turn about (0.8, 0, −0.6)');
  check(nearQ(AO_HP, [0, -0.3 * Math.SQRT2, Math.SQRT1_2, -0.4 * Math.SQRT2]) && nearQ(AO_HQ, [Math.SQRT1_2, -0.4 * Math.SQRT2, 0, 0.3 * Math.SQRT2]), 'p and q');

  /* 5. EDGE: every listed point is rational and on the circle; (1 + i)/√2 is not among them */
  check(AO_RAT.every(([a, b]) => near(a * a + b * b, 1, 1e-12)), 'rational points on the circle');
  check(AO_RAT.every(([a, b]) => !(near(a, Math.SQRT1_2, 1e-9) && near(b, Math.SQRT1_2, 1e-9))), '(1 + i)/√2 is not listed');
});
Object.assign(FILM.speed, { ruler: 0.02, five: 0.014, quat: 0.016, born: 0.014, homog: 0.016, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const aoFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const aoNum = (v, n = 3) => (v < -0.5 * Math.pow(10, -n) ? '−' : '') + Math.abs(v).toFixed(n);
function aoRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, p[2] || fam, w), 0) / 2;
  for (const [s, col, fm] of parts) { txt(s, cx, y, { size, fam: fm || fam, w, c: col, a, ab: o.ab }); cx += tw(s, size, fm || fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const AO_MISSING = new Set();
function aoLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!AO_MISSING.has(gid)) { AO_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* orthographic view: world (x, y, z), z up → [screen x, screen y, depth]; a solid shot made with aoShot shares it */
function aoView(cx, cy, R, yaw, el) {
  const cw = Math.cos(yaw), sw = Math.sin(yaw), ce = Math.cos(el), se = Math.sin(el);
  const V = p => {
    const X = p[0] * cw - p[1] * sw, Y = p[0] * sw + p[1] * cw, Z = p[2];
    return [cx + X * R, cy - (Z * ce + Y * se) * R, Y * ce - Z * se];
  };
  Object.assign(V, { cx, cy, R, yaw, el });
  return V;
}
function aoShot(key, V, r) {
  return solid(key, { x: r[0], y: r[1], w: r[2], h: r[3], yaw: V.yaw, pitch: V.el, unit: V.R, cx: V.cx - r[0], cy: V.cy - r[1], px: true });
}
/* opening title */
function aoTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 84, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('NO RULER, ONLY COMPARISONS', p, 5), W / 2, 580, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('RULER · FIVE · QUATERNIONS · SHADOWS · PAIRS · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                               scene 1 · NO RULER                          */
/* ======================================================================= */
/* the cloud of points of a structure: no axes, no origin */
const RU_CLOUD = [[250, 330], [400, 270], [600, 300], [760, 360], [300, 480], [470, 420], [880, 470], [230, 650],
  [400, 760], [640, 790], [820, 700], [930, 600], [360, 590]];
const RU_Y = [520, 560], RU_X = [700, 430], RU_Z = [560, 700];
const RU_W = [RU_Z[0] + RU_X[0] - RU_Y[0], RU_Z[1] + RU_X[1] - RU_Y[1]];
SCENES.ruler = S => {
  const u = S.u;
  aoTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* line 0: the ruler, its zero mark and an outside frame; line 1: taken away */
  const gone = ease(Q(S, 1, 'Take the ruler away', 1.2));
  const ra = a * (1 - gone), dy = -120 * gone;
  if (ra > 0.003) {
    const x0 = 260, x1 = 1660, y = 470 + dy;
    fillBox(x0, y - 40, x1 - x0, 80, C.dim, ra * 0.12);
    box(x0, y - 40, x1 - x0, 80, C.white, ra * 0.7, 2);
    for (let k = 0; k <= 20; k++) {
      const x = x0 + 40 + k * (x1 - x0 - 80) / 20, big = k % 5 === 0;
      line(x, y - 40, x, y - 40 + (big ? 34 : 18), C.white, ra * 0.8, 2);
      if (big) txt(String(k / 5 * 5), x, y + 28, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: ra });
    }
    const za = ra * Q(S, 0, 'a zero mark', 0.6), zx = x0 + 40;
    ring(zx, y - 40, 22, C.now, za, 3);
    txt('0 · zero mark · 零刻度', zx - 10, y - 80, { size: 24, fam: F.zh, w: 700, c: C.now, a: za });
    const fa = ra * Q(S, 0, 'an outside frame', 0.6);
    if (fa > 0.003) {
      arrow(200, 820 + dy, 200, 620 + dy, C.dim, fa, 2.5);
      arrow(200, 820 + dy, 420, 820 + dy, C.dim, fa, 2.5);
      txt('outside frame · 外面的坐标架', 230, 800 + dy, { size: 22, fam: F.zh, w: 700, c: C.dim, a: fa });
    }
    const oa = ra * Q(S, 0, 'the origin', 0.6);
    if (oa > 0.003) { dot(200, 820 + dy, 12, 'g', oa); txt('origin · 原点', 200, 860 + dy, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.now, a: oa }); }
  }
  /* the cloud of points: only comparisons */
  const ca = a * Q(S, 1, 'Take the ruler away', 0.9, 0.6);
  if (ca <= 0.003) return;
  RU_CLOUD.forEach((p, k) => dot(p[0], p[1], 7, 'w', ca * (0.45 + 0.25 * rnd(k, 3))));
  txt('no axes, no zero · 没有坐标轴，没有零', 180, 220, { size: 24, fam: F.zh, w: 700, c: C.white, a: ca * (1 - at(S, 2, 0.6)) });
  /* line 2: the transfer [x, y, z], drawn as a flat sketch */
  const ta = a * Q(S, 2, 'carries the step', 0.8);
  if (ta > 0.003) {
    const cp = ease(Q(S, 2, 'carries the step', 1.4, 0.4));
    dot(RU_Y[0], RU_Y[1], 11, 'w', ta); dot(RU_X[0], RU_X[1], 11, 'w', ta); dot(RU_Z[0], RU_Z[1], 11, 'w', ta);
    txt('y', RU_Y[0] - 30, RU_Y[1] + 8, { size: 32, fam: F.math, w: 700, c: C.white, a: ta });
    txt('x', RU_X[0] + 18, RU_X[1] - 10, { size: 32, fam: F.math, w: 700, c: C.white, a: ta });
    txt('z', RU_Z[0] - 30, RU_Z[1] + 12, { size: 32, fam: F.math, w: 700, c: C.white, a: ta });
    arrow(RU_Y[0], RU_Y[1], RU_X[0] - 8, RU_X[1] + 6, C.white, ta, 3);
    const tip = [lerp(RU_Z[0], RU_W[0], cp), lerp(RU_Z[1], RU_W[1], cp)];
    if (cp > 0.02) arrow(RU_Z[0], RU_Z[1], tip[0], tip[1], C.now, ta, 3.5);
    dashed(RU_X[0], RU_X[1], RU_W[0], RU_W[1], C.dim, ta * cp * 0.6, 1.5);
    dashed(RU_Y[0], RU_Y[1], RU_Z[0], RU_Z[1], C.dim, ta * cp * 0.6, 1.5);
    if (cp > 0.9) {
      dot(RU_W[0], RU_W[1], 13, 'g', ta);
      txt('[x, y, z]', RU_W[0] + 20, RU_W[1] + 10, { size: 32, fam: F.math, w: 700, c: C.now, a: ta });
    }
    txt('flat sketch · 平面示意', 300, 845, { size: 20, fam: F.zh, w: 700, c: C.argued, a: ta * 0.95 });
  }
  /* line 3: the reading κ, from 1 down to 0 */
  const ka = a * at(S, 3, 0.6);
  if (ka > 0.003) {
    panel(1100, 200, 620, 260, ka, C.cyan, 'READING · 读数  κ(p, q)');
    const bx0 = 1150, bx1 = 1670, by = 320;
    line(bx0, by, bx1, by, C.white, ka * 0.6, 3);
    txt('0', bx0, by + 40, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: ka });
    txt('1', bx1, by + 40, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: ka });
    const k = 1 - ease(Q(S, 3, 'zero means', 1.0)), mx = lerp(bx0, bx1, k);
    dot(mx, by, 13, 'g', ka * Q(S, 3, 'how alike', 0.5));
    txt('same point · 同一个点', bx1, by - 28, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.white, a: ka * Q(S, 3, 'one means', 0.5) });
    txt('fully mismatched · 完全失配', bx0 + 34, by + 40, { size: 22, fam: F.zh, w: 700, c: C.white, a: ka * Q(S, 3, 'zero means', 0.5) });
    txt('κ(p, p) = 1      0 ≤ κ ≤ 1', 1150, 420, { size: 26, fam: F.math, w: 700, c: C.cyan, a: ka });
  }
  /* line 4: two of the rules */
  const la = a * at(S, 4, 0.6);
  if (la > 0.003) {
    panel(1100, 490, 620, 320, la, C.argued, 'RULES · 规则 (MODEL)');
    aoRich([['[x, x, z] = z', C.white]], 1130, 570, { size: 32, a: la * Q(S, 4, 'does nothing', 0.5) });
    txt('a step from a point to itself does nothing', 1130, 608, { size: 18, fam: F.mono, w: 700, c: C.dim, a: la * Q(S, 4, 'does nothing', 0.5) });
    aoRich([['κ([x, u, v], [y, u, v]) = κ(x, y)', C.white]], 1130, 670, { size: 30, a: la * Q(S, 4, 'carrying never changes', 0.5) });
    txt('carrying never changes a reading · 搬运不改读数', 1130, 708, { size: 18, fam: F.zh, w: 700, c: C.dim, a: la * Q(S, 4, 'carrying never changes', 0.5) });
    txt('+ symmetry · 1 iff equal · Gram ⪰ 0 · …', 1130, 768, { size: 20, fam: F.mono, w: 700, c: C.argued, a: la * at(S, 4, 0.6, 2.0) });
  }
};

/* ======================================================================= */
/*                              scene 2 · FIVE COLUMNS                       */
/* ======================================================================= */
const FV = { x0: 270, y0: 300, c: 92 };
SCENES.five = S => {
  const a = aoFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* line 0: the model and its reading */
  panel(860, 200, 940, 250, a, C.cyan, 'THE UNIT QUATERNIONS · 单位四元数');
  aoRich([['κ(p, q) = ', C.white], ['(1 + ⟨p, q⟩) / 2', C.cyan]], 890, 275, { size: 34, a: a * Q(S, 0, 'The unit quaternions', 0.6) });
  aoRich([['[x, y, z] = x y⁻¹ z', C.white]], 890, 330, { size: 28, a: a * Q(S, 0, 'The unit quaternions', 0.6, 0.5) });
  txt('obeys every rule · 守住全部规则', 890, 380, { size: 22, fam: F.zh, w: 700, c: C.white, a: a * at(S, 0, 0.6, 2.5) });
  txt('order matters: i j = k,  j i = −k', 890, 420, { size: 22, fam: F.math, w: 700, c: C.dim, a: a * at(S, 0, 0.6, 3.0) });
  /* line 1: the table */
  const ta = a * Q(S, 1, 'Take five', 0.6);
  if (ta > 0.003) {
    const z = Q(S, 1, 'two zeros', 0.5);
    for (let i = 0; i < 5; i++) {
      txt(AO_FIVE_NAMES[i], FV.x0 - 30, FV.y0 + FV.c * (i + 0.5) + 10, { size: 30, fam: F.math, w: 700, align: 'right', c: C.white, a: ta });
      txt(AO_FIVE_NAMES[i], FV.x0 + FV.c * (i + 0.5), FV.y0 - 22, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a: ta });
      for (let j = 0; j < 5; j++) {
        const ca = ta * clamp((S.u - lineAt(S, 1).s - 0.6 - 0.05 * (i * 5 + j)) / 0.4);
        if (ca <= 0.003) continue;
        const v = AO_TABLE[i][j], x = FV.x0 + FV.c * j, y = FV.y0 + FV.c * i;
        const isZ = Math.abs(v) < 1e-12, isOne = Math.abs(v - 1) < 1e-12;
        const col = isZ ? (z > 0 ? C.now : C.white) : isOne ? C.white : C.cyan;
        box(x + 4, y + 4, FV.c - 8, FV.c - 8, col, ca * (isZ ? 0.4 + 0.6 * z : 0.35), isZ ? 2 + 2 * z : 1.2);
        txt(isZ ? '0' : isOne ? '1' : '½', x + FV.c / 2, y + FV.c / 2 + 12, { size: 34, fam: F.math, w: 700, align: 'center', c: col, a: ca });
      }
    }
    txt('κ readings · 读数表', FV.x0 + FV.c * 2.5, FV.y0 + FV.c * 5 + 46, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: ta });
  }
  /* line 2: the determinant and the five columns */
  const da = a * at(S, 2, 0.6);
  if (da > 0.003) {
    panel(860, 480, 940, 180, da, C.cyan, 'FIVE COLUMNS · 五栏');
    aoRich([['det = ', C.white], ['1/8', C.now], [' ≠ 0', C.white]], 890, 550, { size: 36, a: da * Q(S, 2, 'one eighth', 0.5) });
    txt('→ rank 5, not 4 · 秩为 5，四栏不够', 1200, 550, { size: 24, fam: F.zh, w: 700, c: C.white, a: da * Q(S, 2, 'five columns', 0.5) });
    aoRich([['φ(q) = (', C.white], ['1', C.white], [', q₀, q₁, q₂, q₃', C.cyan], [') / √2', C.white]], 890, 616, { size: 28, a: da * Q(S, 2, 'five columns', 0.5, 0.4) });
    txt('1 shared + 4 quaternion columns', 1390, 616, { size: 18, fam: F.mono, w: 700, c: C.dim, a: da * Q(S, 2, 'five columns', 0.5, 0.8) });
  }
  /* line 3: Lean */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(860, 690, 940, 140, la, C.lean, 'ANY SUCH STRUCTURE · 任意这样的结构');
    aoRich([['order matters + small steps  ⟹  ', C.white, F.mono], ['r ≥ 5', C.lean]], 890, 752, { size: 26, a: la });
    aoLean(890, 802, AO_LEAN.five_le_of_hasFeatureRank, la, { size: 18 });
    stamp('≥ 5', 1640, 760, Q(S, 3, 'at least five', 0.5), C.lean, 34, -0.06);
  }
};

/* ======================================================================= */
/*                          scene 3 · FIVE MEANS QUATERNIONS                 */
/* ======================================================================= */
/* the points of the structure and the angle of their images on one great circle of S³ (schematic) */
const QU_PTS = [[260, 480], [420, 455], [560, 530], [330, 610], [500, 680], [650, 640], [700, 470], [230, 760], [420, 800], [610, 770]];
const QU_ANG = [0, 0.62, 1.35, 2.05, 2.7, 3.3, 3.95, 4.6, 5.15, 5.7];
const QU_C = { x: 1340, y: 600, r: 190 };
SCENES.quat = S => {
  const a = aoFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, 'Lean checks', 'lean'], [2, 'The origin was never', 'argued']]);
  /* line 0: the five conditions */
  const L1 = at(S, 1, 0.5);
  const cd = [['order matters', '讲先后', 0, null], ['small steps', '小步连通', 0, null], ['exactly 5 columns', '恰好五栏', 1, 'exactly five columns'],
    ['reaches 0', '读数降到零', 1, 'down to zero'], ['no gaps', '没有缺口', 1, 'no gaps']];
  const ca = a * (1 - L1);
  if (ca > 0.003) cd.forEach(([en, zh, now, ph], k) => {
    const x = 270 + k * 345, ka = ca * (ph ? Q(S, 0, ph, 0.5) : at(S, 0, 0.5));
    chip(x, 235, 320, 62, en, now ? C.now : C.white, ka, 22);
    txt(zh, x, 300, { size: 22, fam: F.zh, w: 700, align: 'center', c: now ? C.now : C.white, a: ka });
  });
  /* line 1: the theorem */
  if (L1 > 0.003) {
    const la = a * L1;
    panel(160, 182, 1640, 170, la, C.lean, 'THE STRUCTURE IS THE UNIT QUATERNIONS · 结构就是单位四元数');
    aoRich([['u : M → S³ = Sp(1)', C.white], ['   one-to-one and onto · 一一对应', C.white, F.zh]], 190, 250, { size: 28, a: la * Q(S, 1, 'point for point', 0.5) });
    aoRich([['u([x, y, z]) = u(x) u(y)⁻¹ u(z)', C.white], ['      κ(x, y) = (1 + ⟨u x, u y⟩) / 2', C.cyan]], 190, 300, { size: 28, a: la * Q(S, 1, 'point for point', 0.5, 0.6) });
    aoLean(190, 340, AO_LEAN.exists_unitQuaternion_equiv, la, { size: 17 });
  }
  /* the picture: M on the left, S³ on the right */
  const sa = a * at(S, 0, 0.8);
  /* the chosen base point: o = point 0, then point 6 on "any point you like" */
  const sw = ease(Q(S, 2, 'any point you like', 1.4)), o0 = 0, o1 = 6;
  const rot = -lerp(QU_ANG[o0], QU_ANG[o1], sw);
  const oi = sw < 0.5 ? o0 : o1;
  txt('M', 150, 520, { size: 40, fam: F.math, w: 700, c: C.white, a: sa });
  txt('points and readings only · 只有点和读数', 160, 405, { size: 20, fam: F.zh, w: 700, c: C.dim, a: sa });
  ring(QU_C.x, QU_C.y, QU_C.r, C.cyan, sa * 0.8, 3);
  txt('S³ ⊂ ℝ⁴', QU_C.x, QU_C.y - QU_C.r - 26, { size: 28, fam: F.math, w: 700, align: 'center', c: C.cyan, a: sa });
  txt('one great circle shown · 只画一个大圆（示意）', QU_C.x, QU_C.y + QU_C.r + 46, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.argued, a: sa * 0.95 });
  const one = [QU_C.x + QU_C.r, QU_C.y];
  txt('1', one[0] + 22, one[1] + 10, { size: 34, fam: F.math, w: 700, c: C.now, a: sa });
  txt('−1', QU_C.x - QU_C.r - 22, QU_C.y + 10, { size: 30, fam: F.math, w: 700, align: 'right', c: C.white, a: sa });
  const ma = a * Q(S, 1, 'point for point', 0.8);
  QU_PTS.forEach((p, k) => {
    const th = QU_ANG[k] + rot, q = [QU_C.x + QU_C.r * Math.cos(th), QU_C.y - QU_C.r * Math.sin(th)];
    const isO = k === oi, col = isO ? 'g' : 'w';
    dot(p[0], p[1], isO ? 13 : 9, col, sa);
    if (ma > 0.003) {
      if (isO) line(p[0], p[1], q[0], q[1], C.now, ma * 0.8, 2.5);
      else line(p[0], p[1], q[0], q[1], C.white, ma * 0.12, 1.2);
      dot(q[0], q[1], isO ? 13 : 9, col, ma);
    }
    if (isO) txt('o', p[0] - 16, p[1] - 18, { size: 32, fam: F.math, w: 700, align: 'right', c: C.now, a: sa });
  });
  /* line 2: any point can be sent to 1 */
  const oa = a * Q(S, 2, 'any point you like', 0.6);
  if (oa > 0.003) txt('u(o) = 1 · 任选 o', one[0] + 50, one[1] + 60, { size: 26, fam: F.zh, w: 700, c: C.now, a: oa });
  const pa = a * Q(S, 2, 'The origin was never', 0.8);
  txt('The origin was never out there. · 原点从来不在外面。', 520, 852, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.argued, a: pa });
  if (L1 > 0) stamp('ISOMORPHIC', 880, 400, Q(S, 1, 'Lean checks', 0.5, 0.4) * (1 - at(S, 2, 0.5)), C.lean, 30, -0.06);
};

/* ======================================================================= */
/*                              scene 4 · TWO SHADOWS                        */
/* ======================================================================= */
const BN_V = { cx: 430, cy: 530, R: 220, yaw: 0.6, el: 0.3 };
const BN_CL = { x: 1050, y: 520, r: 210 };
SCENES.born = S => {
  const u = S.u, a = aoFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* the phase: still on lines 0–1, turning on line 2 */
  const turn = clamp((u - phraseAt(S, 2, 'they trade')) / 4.2);
  const chi = TAU * 0.8 * ease(turn) + 0.9 * ease(Q(S, 0, 'slide one point', 2.0)) * (1 - ease(at(S, 1, 0.8)));
  const r1 = aoRead1(chi), r2 = aoRead2(chi);
  /* the Bloch sphere: the Hopf images of x and of y c */
  const V = aoView(BN_V.cx, BN_V.cy, BN_V.R, BN_V.yaw + 0.03 * u, BN_V.el);
  const hx = aoBloch(AO_BX), hy = aoBloch(aoQ.mul(AO_BY, aoPhase(chi)));
  const sh = aoShot('bloch', V, [130, 230, 600, 600]);
  sh.begin();
  QG_SPHERE.ball(sh, { glass: C.cyan, ink: C.blue, width: 1.5, alpha: 0.6, back: 0.35, shell: { alpha: 0.08, rim: 0.5 } });
  sh.bead(hx, { color: C.white, r: 9 });
  sh.bead(hy, { color: C.now, r: 10 });
  sh.end(a);
  const px = sh.anchor(hx), py = sh.anchor(hy);
  txt('h(x)', px.x + 16, px.y - 14, { size: 26, fam: F.math, w: 700, c: C.white, a: a * (px.hidden ? 0.35 : 1) });
  txt('h(y c)', py.x - 18, py.y + 38, { size: 26, fam: F.math, w: 700, align: 'right', c: C.now, a: a * (py.hidden ? 0.35 : 1) });
  txt('Bloch sphere · 布洛赫球', BN_V.cx, 230, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a });
  txt('Hopf images h(q) = q i q̄', BN_V.cx, 262, { size: 20, fam: F.math, w: 700, align: 'center', c: C.dim, a });
  const fa = a * Q(S, 0, 'slide one point', 0.6);
  txt('stays put as the phase turns · 相位转，点不动', BN_V.cx, 812, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: fa });
  /* the clock: the overlap ⟨s(x)|s(y c)⟩ = 0.6 e^{iχ}, its two shadows */
  const ka = a * Q(S, 1, 'a quarter turn apart', 0.6);
  const { x: cx, y: cy, r: cr } = BN_CL, rr = cr * 0.6;
  ring(cx, cy, cr, C.white, a * 0.5, 2);
  for (let k = 0; k < 12; k++) { const t = TAU * k / 12; line(cx + cr * 0.92 * Math.cos(t), cy - cr * 0.92 * Math.sin(t), cx + cr * Math.cos(t), cy - cr * Math.sin(t), C.white, a * 0.5, 2); }
  txt('phase circle · 相位圆', cx, cy - cr - 26, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a });
  /* the hand is the overlap ⟨s(y c)|s(x)⟩ = 0.6 e^{−iχ}: horizontal shadow 0.6 cos χ = ①, vertical shadow −0.6 sin χ = ② */
  const hxp = cx + rr * Math.cos(chi), hyp = cy + rr * Math.sin(chi);
  line(cx - cr, cy, cx + cr, cy, C.dim, a * 0.5, 1.2);
  line(cx, cy - cr, cx, cy + cr, C.dim, a * 0.5, 1.2);
  arrow(cx, cy, hxp, hyp, C.now, a, 4);
  dot(cx, cy, 7, 'w', a);
  txt(`χ = ${Math.round(chi * 180 / Math.PI) % 360}°`, cx - cr + 10, cy - cr + 10, { size: 26, fam: F.math, w: 700, align: 'right', c: C.now, a });
  if (ka > 0.003) {
    /* shadow ① on the horizontal axis, shadow ② on the vertical axis */
    line(cx, cy + 6, hxp, cy + 6, C.cyan, ka, 7);
    line(cx - 6, cy, cx - 6, hyp, C.cyan, ka * 0.75, 7);
    dashed(hxp, hyp, hxp, cy, C.cyan, ka * 0.5, 1.5);
    dashed(hxp, hyp, cx, hyp, C.cyan, ka * 0.5, 1.5);
    txt('①', hxp + (Math.cos(chi) >= 0 ? 10 : -34), cy + 38, { size: 24, fam: F.math, w: 700, c: C.cyan, a: ka });
    txt('②', cx - 40, hyp + (Math.sin(chi) <= 0 ? -6 : 24), { size: 24, fam: F.math, w: 700, c: C.cyan, a: ka * 0.85 });
    txt('clock hand · 钟表指针 (picture)', cx, cy + cr + 46, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.argued, a: a * Q(S, 2, 'clock hand', 0.6) });
  }
  /* the readouts */
  const pa = a * ka;
  if (pa > 0.003) {
    panel(1380, 200, 440, 400, pa, C.cyan, 'TWO READINGS · 两个读数');
    txt('x = 1,  y = 0.6 + 0.8 j', 1404, 262, { size: 22, fam: F.math, w: 700, c: C.white, a: pa });
    txt('① 2κ(x, y c) − 1', 1404, 316, { size: 22, fam: F.math, w: 700, c: C.cyan, a: pa });
    txt(`= ${aoNum(r1)}`, 1640, 352, { size: 28, fam: F.mono, w: 700, c: C.cyan, a: pa });
    txt('② 2κ(x, y c i) − 1', 1404, 400, { size: 22, fam: F.math, w: 700, c: C.cyan, a: pa });
    txt(`= ${aoNum(r2)}`, 1640, 436, { size: 28, fam: F.mono, w: 700, c: C.cyan, a: pa });
    const qa = pa * Q(S, 1, 'square both', 0.5);
    txt(`${aoNum(r1 * r1)} + ${aoNum(r2 * r2)}`, 1404, 500, { size: 26, fam: F.mono, w: 700, c: C.white, a: qa });
    aoRich([['= ', C.white], [aoNum(r1 * r1 + r2 * r2), C.now]], 1404, 556, { size: 36, a: pa * Q(S, 1, 'add them', 0.5), fam: F.mono });
  }
  /* line 3: Lean */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1380, 615, 440, 225, la, C.lean, 'RAY KERNEL · 射线核');
    aoLean(1400, 672, AO_LEAN.rayKernel_mul_phase_right, la * Q(S, 3, 'ignores the phase', 0.5), { size: 15 });
    aoLean(1400, 706, AO_LEAN.rayKernel_eq_bornProbability_spinor, la * Q(S, 3, 'equals', 0.5), { size: 15 });
    txt('s(x) = (1, 0),  s(y) = (0.6, −0.8)', 1400, 746, { size: 18, fam: F.math, w: 700, c: C.white, a: la * Q(S, 3, 'equals', 0.5, 0.3) });
    txt('|⟨s(x)|s(y)⟩|² = 0.36', 1400, 778, { size: 20, fam: F.math, w: 700, c: C.lean, a: la * Q(S, 3, 'equals', 0.5, 0.5) });
    txt('as a probability: MODEL · 读作概率是模型', 1400, 818, { size: 19, fam: F.zh, w: 700, c: C.argued, a: la * Q(S, 3, 'Born weight', 0.5, 0.3) });
  }
};

/* ======================================================================= */
/*                          scene 5 · SAME READING, SAME PAIR                */
/* ======================================================================= */
const HM_V = { cx: 560, cy: 560, R: 270, yaw: 0.7, el: 0.42 };
SCENES.homog = S => {
  const u = S.u, a = aoFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* line 0: two pins on a ball (an everyday picture) */
  const pa = a * (1 - at(S, 1, 0.6));
  if (pa > 0.003) {
    txt('two pins at one distance · 同样距离的两枚图钉', 1340, 300, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: pa * Q(S, 0, 'two pins', 0.6) });
    txt('no spot is special · 没有哪处特殊 (picture)', 1340, 345, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.argued, a: pa * Q(S, 0, 'two pins', 0.6) });
  }
  /* the space of imaginary parts (i, j, k): a ball of radius 0.8 */
  const V = aoView(HM_V.cx, HM_V.cy, HM_V.R, HM_V.yaw + 0.04 * u, HM_V.el);
  const ra = a * Q(S, 2, 'an arrow', 0.6);
  const tt = ease(Q(S, 2, 'one turn', 2.0));
  const vNow = QG_SPHERE.v3.rot(AO_HV, AO_AXIS, AO_TURN * tt);
  const sh = aoShot('imag', V, [180, 200, 760, 680]);
  sh.begin();
  sh.glass('shell', [0, 0, 0], 0.8, { color: C.cyan, alpha: 0.08, rim: 0.5 });
  for (const n of [[0, 0, 1], [0, 1, 0], [1, 0, 0]]) QG_SPHERE.seg(sh, QG_SPHERE.circlePts([0, 0, 0], n, 0.8), { color: C.blue, width: 1.4, alpha: 0.5, back: 0.35 });
  for (const e of [[1, 0, 0], [0, 1, 0], [0, 0, 1]]) sh.line([QG_SPHERE.v3.scale(e, -1.05), QG_SPHERE.v3.scale(e, 1.05)], { color: C.dim, width: 1.2, alpha: 0.6, dash: [8, 8] });
  if (ra > 0.003) {
    sh.arrow([0, 0, 0], AO_HV2, { color: C.white, width: 3, alpha: ra * 0.9 });
    sh.arrow([0, 0, 0], vNow, { color: C.now, width: 4, alpha: ra });
    if (tt > 0.003) {
      sh.line([QG_SPHERE.v3.scale(AO_AXIS, -1.0), QG_SPHERE.v3.scale(AO_AXIS, 1.0)], { color: C.vio, width: 3, alpha: ra * clamp(tt * 4) });
      sh.line(QG_SPHERE.arcAbout(AO_HV, AO_AXIS, AO_TURN * tt), { color: C.now, width: 2, alpha: ra * 0.7, dash: [8, 6] });
    }
  }
  sh.end(a);
  for (const [lab, e] of [['i', [1.12, 0, 0]], ['j', [0, 1.12, 0]], ['k', [0, 0, 1.12]]]) { const p = sh.anchor(e); txt(lab, p.x, p.y + 8, { size: 28, fam: F.math, w: 700, align: 'center', c: C.dim, a }); }
  txt('imaginary parts · 虚部空间  |v| = 0.8', HM_V.cx, 222, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: a * Q(S, 1, 'real part', 0.6) });
  if (ra > 0.003) {
    const pv = sh.anchor(vNow), p2 = sh.anchor(AO_HV2);
    txt(tt < 0.98 ? 'v' : 'v = v′', pv.x + 16, pv.y - 12, { size: 30, fam: F.math, w: 700, c: C.now, a: ra });
    if (tt < 0.98) txt('v′', p2.x + 16, p2.y - 12, { size: 30, fam: F.math, w: 700, c: C.white, a: ra });
    if (tt > 0.05) { const pa2 = sh.anchor(QG_SPHERE.v3.scale(AO_AXIS, 1.0)); txt('turn axis · 转轴', pa2.x + 14, pa2.y + 24, { size: 22, fam: F.zh, w: 700, c: C.vio, a: ra * clamp(tt * 4) }); }
  }
  /* line 1: the two pairs and their quotients */
  const qa = a * Q(S, 1, 'These two pairs', 0.6);
  if (qa > 0.003) {
    panel(1060, 200, 760, 300, qa, C.cyan, 'TWO PAIRS · 两对点');
    aoRich([['x = 1,  y = 0.6 + 0.8 j', C.white]], 1084, 262, { size: 24, a: qa });
    aoRich([['x′ = j,  y′ = 0.64 i + 0.6 j − 0.48 k', C.white]], 1084, 302, { size: 24, a: qa });
    aoRich([['κ(x, y) = κ(x′, y′) = ', C.white], ['0.8', C.now]], 1084, 352, { size: 26, a: qa });
    const ra2 = qa * Q(S, 1, 'real part', 0.5);
    aoRich([['x⁻¹y = ', C.white], ['0.6', C.cyan], [' + 0.8 j', C.white]], 1084, 408, { size: 26, a: ra2 });
    aoRich([['x′⁻¹y′ = ', C.white], ['0.6', C.cyan], [' + 0.48 i + 0.64 k', C.white]], 1084, 450, { size: 26, a: ra2 });
    txt('κ = (1 + real part) / 2', 1084, 486, { size: 18, fam: F.mono, w: 700, c: C.dim, a: ra2 });
  }
  const ta = a * Q(S, 2, 'one turn', 0.6);
  if (ta > 0.003) {
    txt('a quarter turn about (0.8, 0, −0.6) · 绕轴转四分之一圈', 1084, 540, { size: 22, fam: F.zh, w: 700, c: C.vio, a: ta });
    txt('p = −0.424 i + 0.707 j − 0.566 k,  q = 0.707 − 0.566 i + 0.424 k', 1084, 578, { size: 18, fam: F.math, w: 700, c: C.dim, a: ta * at(S, 2, 0.6, 2.0) });
  }
  /* line 3: Lean */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1060, 620, 760, 200, la, C.lean, 'EVERY PAIR · 任意两对点');
    aoRich([['κ(x, y) = κ(x′, y′)  ⟹  ∃ p, q:', C.white]], 1084, 684, { size: 24, a: la });
    aoRich([['p x q = x′,   p y q = y′', C.lean]], 1084, 728, { size: 28, a: la });
    aoLean(1084, 790, AO_LEAN.exists_mul_mul_eq_of_kappa_eq, la, { size: 16 });
  }
};

/* ======================================================================= */
/*                          scene 6 · WHAT IT DOES NOT SAY                   */
/* ======================================================================= */
const ED_C = { x: 430, y: 500, r: 250 };
SCENES.edge = S => {
  const a = aoFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [0, 'pass every other test', 'argued'], [1, null, 'argued']]);
  /* line 0: rational points of the circle cos t + i sin t, with a missing point */
  const pa = a * Q(S, 0, 'rational quaternions', 0.8);
  ring(ED_C.x, ED_C.y, ED_C.r, C.white, a * 0.25, 1.5);
  if (pa > 0.003) {
    AO_RAT.forEach(([c, s], k) => dot(ED_C.x + ED_C.r * c, ED_C.y - ED_C.r * s, 6, 'c', pa * clamp((S.u - phraseAt(S, 0, 'rational quaternions') - 0.01 * k) / 0.3)));
    const ha = a * Q(S, 0, 'leave holes', 0.6), hx = ED_C.x + ED_C.r * Math.SQRT1_2, hy = ED_C.y - ED_C.r * Math.SQRT1_2;
    ring(hx, hy, 16, C.now, ha, 3);
    txt('(1 + i)/√2 missing · 不在其中', hx - 30, hy + 52, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.now, a: ha });
    txt('cos t + i sin t:  (a/c, b/c),  c ≤ 65', ED_C.x, ED_C.y + ED_C.r + 50, { size: 22, fam: F.math, w: 700, align: 'center', c: C.cyan, a: pa });
    txt('denser as c grows, never the whole circle · c 越大越密，但永远铺不满', ED_C.x, ED_C.y + ED_C.r + 84, { size: 19, fam: F.zh, w: 700, align: 'center', c: C.dim, a: pa });
  }
  const rows = [
    { k: 0, col: C.cyan, en: 'no gaps cannot be dropped', zh: '“没有缺口”不能省', note: 'rational example: hand derivation · 有理例子：手工推导' },
    { k: 1, col: C.argued, en: 'rules: a model; probability: a reading', zh: '母公理是模型；读作概率是诠释', note: 'MODEL · not a proof · 不是证明' },
    { k: 1, off: 4.0, col: C.argued, en: 'fewest columns: our choice', zh: '栏数最少：是我们的选择', note: 'theorems say what follows · 定理只说由此推出什么' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6, rw.off || 0);
    if (ra <= 0.003) return;
    const y = 210 + i * 210;
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
  closingCard(S, { from: 0.1, y: 300 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[0], t = sc.end - 1.0;
  background(t, sc, 0, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  /* the five-column table */
  const x0 = 200, y0 = 300, c = 84;
  for (let i = 0; i < 5; i++) {
    txt(AO_FIVE_NAMES[i], x0 - 26, y0 + c * (i + 0.5) + 10, { size: 28, fam: F.math, w: 700, align: 'right', c: C.white });
    txt(AO_FIVE_NAMES[i], x0 + c * (i + 0.5), y0 - 20, { size: 28, fam: F.math, w: 700, align: 'center', c: C.white });
    for (let j = 0; j < 5; j++) {
      const v = AO_TABLE[i][j], isZ = Math.abs(v) < 1e-12, isOne = Math.abs(v - 1) < 1e-12, col = isZ ? C.now : isOne ? C.white : C.cyan;
      box(x0 + c * j + 4, y0 + c * i + 4, c - 8, c - 8, col, isZ ? 1 : 0.35, isZ ? 3 : 1.2);
      txt(isZ ? '0' : isOne ? '1' : '½', x0 + c * j + c / 2, y0 + c * i + c / 2 + 11, { size: 32, fam: F.math, w: 700, align: 'center', c: col });
    }
  }
  aoRich([['det = ', C.white], ['1/8', C.now], [' ≠ 0', C.white]], x0 + c * 2.5, y0 + c * 5 + 60, { size: 34, align: 'center' });
  txt(DATA.film.title_zh, 1300, 430, { size: 64, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('NO RULER,', 1300, 528, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 5 });
  txt('ONLY COMPARISONS', 1300, 590, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 2, ls: 4 });
  aoRich([['M ', C.white], ['≅', C.lean], [' S³ = Sp(1)', C.white]], 1300, 690, { size: 42, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1300, 770, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
