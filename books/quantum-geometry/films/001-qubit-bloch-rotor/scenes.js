/* Film 001 · Half-Angle Rotors and the Bloch Sphere · 半角旋子与布洛赫球 (book quantum-geometry, part II).
   Scenes for theme/film/engine.js.

   Lean citations (film.json "lean", at the pinned trureturing commit) and the four themes of the film:
     1. Bloch unit norm ............ QubitBloch.B_formula_core
          B a = a 0 • σX + a 1 • σY + a 2 • σZ = [[a 2, a 0 − i·a 1], [a 0 + i·a 1, −a 2]].
          B(v)² = |v|² I₂ = I₂ for a unit v is computed exactly here, not cited.
     2. Born half-angle ............ BornReduction.rank_one_pure_state_modulus_square_reduction
          recordWeight P ρ k = Tr(ρ · P k) = |φ†ψ|² when P k = φφ† and ρ = ψψ†.
          p₀ = cos²(θ/2) = (1 + cos θ)/2 for φ = |0⟩ is computed exactly here.
        (geometric product) ........ LagrangeGramIdentity.lagrange_gram_identity
          |u|²|v|² − (u·v)² = ½ Σ_ij (u_i v_j − u_j v_i)²: the dot part cos θ and the wedge part sin θ of the
          geometric product AB of unit vectors satisfy cos²θ + sin²θ = 1.
     3. Rotor axis invariance and bivector square
                                     BalancedUnitaryComplexStructure.relativeComplexStructure_square
          J = 2·A·Bᴴ satisfies J·J = −1 when A·Bᴴ + B·Aᴴ = 0, A·Aᴴ = ½ and Bᴴ·B = ½. With A = ½(1+i) I₂ and
          B = ½(1+i) Î, where Î = i n̂·σ, the hypotheses hold and J = −Î: the bivector squares to −I₂ and generates
          the rotor R(α) = cos(α/2) I₂ − Î sin(α/2) = exp(−iα n̂·σ/2). Axis invariance R B(n̂) R† = B(n̂) and the
          full-angle turn of the plane are computed exactly here, not cited.
     4. Spinor double cover ........ CircleDoubleCoverHistoryLift.circle_double_cover_history_lift
          the fixed-plane case: the squaring map of the circle is a covering, a loop turning once lifts to a path
          from 1 to −1, and there is no continuous square root on the circle (chapter 5, thm-circle-double-cover-
          history-lift). R(2π) = −I₂ and R(4π) = +I₂ for the 2×2 rotors are computed exactly here, not cited.

   On load, FILM.init checks DATA.lean against these five theorems (present, kind theorem, statement digest) and
   re-derives every identity shown on screen in exact Gaussian-rational 2×2 matrix arithmetic (BigInt fractions)
   over rational unit vectors (Pythagorean quadruples) and rational half-angles (Pythagorean triples), then sweeps
   the floating-point rotors the animation draws. Any disagreement is pushed to window.FILM_ERRORS, which stops the
   render. */
'use strict';

/* ======================================================================= */
/*        exact arithmetic: rationals, Gaussian rationals, 2×2 matrices      */
/* ======================================================================= */
const QX = (() => {
  const ab = x => (x < 0n ? -x : x);
  const gcd = (a, b) => { a = ab(a); b = ab(b); while (b) { const r = a % b; a = b; b = r; } return a; };
  const q = (n, d = 1) => {
    n = BigInt(n); d = BigInt(d);
    if (d === 0n) throw new Error('rational with zero denominator');
    if (d < 0n) { n = -n; d = -d; }
    const g = gcd(n, d);
    return g > 1n ? { n: n / g, d: d / g } : { n, d };
  };
  const add = (a, b) => q(a.n * b.d + b.n * a.d, a.d * b.d);
  const neg = a => ({ n: -a.n, d: a.d });
  const sub = (a, b) => add(a, neg(b));
  const mul = (a, b) => q(a.n * b.n, a.d * b.d);
  const eq = (a, b) => a.n === b.n && a.d === b.d;
  const O = q(0), ONE = q(1), HALF = q(1, 2), TWO = q(2), MINUS = q(-1);
  /* Gaussian rationals re + i·im */
  const c = (re, im = O) => ({ re, im });
  const C0 = c(O), C1 = c(ONE), CI = c(O, ONE);
  const re = r => c(r);
  const cadd = (a, b) => c(add(a.re, b.re), add(a.im, b.im));
  const cneg = a => c(neg(a.re), neg(a.im));
  const csub = (a, b) => cadd(a, cneg(b));
  const cmul = (a, b) => c(sub(mul(a.re, b.re), mul(a.im, b.im)), add(mul(a.re, b.im), mul(a.im, b.re)));
  const conj = a => c(a.re, neg(a.im));
  const ceq = (a, b) => eq(a.re, b.re) && eq(a.im, b.im);
  const abs2 = a => add(mul(a.re, a.re), mul(a.im, a.im));
  /* 2×2 complex matrices [m00, m01, m10, m11] */
  const M = (a, b, cc, d) => [a, b, cc, d];
  const madd = (A, B) => A.map((x, i) => cadd(x, B[i]));
  const msub = (A, B) => A.map((x, i) => csub(x, B[i]));
  const mmul = (A, B) => [
    cadd(cmul(A[0], B[0]), cmul(A[1], B[2])), cadd(cmul(A[0], B[1]), cmul(A[1], B[3])),
    cadd(cmul(A[2], B[0]), cmul(A[3], B[2])), cadd(cmul(A[2], B[1]), cmul(A[3], B[3]))];
  const dag = A => [conj(A[0]), conj(A[2]), conj(A[1]), conj(A[3])];
  const msc = (s, A) => A.map(x => cmul(s, x));
  const meq = (A, B) => A.every((x, i) => ceq(x, B[i]));
  const tr = A => cadd(A[0], A[3]);
  const det = A => csub(cmul(A[0], A[3]), cmul(A[1], A[2]));
  const I2 = M(C1, C0, C0, C1), Z2 = M(C0, C0, C0, C0), NEG_I2 = M(cneg(C1), C0, C0, cneg(C1));
  const SX = M(C0, C1, C1, C0), SY = M(C0, cneg(CI), CI, C0), SZ = M(C1, C0, C0, cneg(C1));
  /* rational 3-vectors */
  const vec = (x, y, z, d = 1) => [q(x, d), q(y, d), q(z, d)];
  const dot = (u, v) => add(add(mul(u[0], v[0]), mul(u[1], v[1])), mul(u[2], v[2]));
  const cross = (u, v) => [sub(mul(u[1], v[2]), mul(u[2], v[1])), sub(mul(u[2], v[0]), mul(u[0], v[2])), sub(mul(u[0], v[1]), mul(u[1], v[0]))];
  const vsc = (s, v) => v.map(x => mul(s, x));
  const vadd = (u, v) => u.map((x, i) => add(x, v[i]));
  const vsub = (u, v) => u.map((x, i) => sub(x, v[i]));
  const veq = (u, v) => u.every((x, i) => eq(x, v[i]));
  /* trureturing QubitBloch.B and the right-hand side of B_formula_core */
  const B = v => madd(madd(msc(re(v[0]), SX), msc(re(v[1]), SY)), msc(re(v[2]), SZ));
  const Bcore = v => M(re(v[2]), c(v[0], neg(v[1])), c(v[0], v[1]), re(neg(v[2])));
  const rho = v => msc(re(HALF), madd(I2, B(v)));                         // (I₂ + B(v)) / 2
  const ket = v => [re(add(ONE, v[2])), c(v[0], v[1])];                    // ∝ (cos θ/2, e^(iφ) sin θ/2), z ≠ −1
  const outer = (a, b) => M(cmul(a[0], conj(b[0])), cmul(a[0], conj(b[1])), cmul(a[1], conj(b[0])), cmul(a[1], conj(b[1])));  // vecMulVec a (star b)
  const braket = (a, b) => cadd(cmul(conj(a[0]), b[0]), cmul(conj(a[1]), b[1]));                                          // star a ⬝ᵥ b
  const norm2 = a => add(abs2(a[0]), abs2(a[1]));
  /* bivector Î = i n̂·σ and rotor R = cos(α/2) I₂ − Î sin(α/2), given (cos α/2, sin α/2) = (co, si) */
  const biv = n => msc(CI, B(n));
  const rotor = (n, co, si) => msub(msc(re(co), I2), msc(re(si), biv(n)));
  const double = (co, si) => [sub(mul(co, co), mul(si, si)), mul(TWO, mul(co, si))];   // (cos α, sin α)
  const rodrigues = (n, co, si, v) => {
    const [ca, sa] = double(co, si);
    return vadd(vadd(vsc(ca, v), vsc(sa, cross(n, v))), vsc(mul(dot(n, v), sub(ONE, ca)), n));
  };
  /* ρ = ½[[1 + z, x − iy], [x + iy, 1 − z]] → (x, y, z) */
  const blochOf = A => [mul(TWO, A[2].re), mul(TWO, A[2].im), sub(A[0].re, A[3].re)];
  return {
    q, add, sub, mul, neg, eq, O, ONE, HALF, TWO, MINUS, c, C0, C1, CI, re, cadd, csub, cmul, cneg, conj, ceq, abs2,
    M, madd, msub, mmul, dag, msc, meq, tr, det, I2, Z2, NEG_I2, SX, SY, SZ, vec, dot, cross, vsc, vadd, vsub, veq,
    B, Bcore, rho, ket, outer, braket, norm2, biv, rotor, double, rodrigues, blochOf
  };
})();

/* ======================================================================= */
/*              floating point: 3-vectors and 2×2 complex rotors             */
/* ======================================================================= */
const QF = (() => {
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const sc = (s, a) => [s * a[0], s * a[1], s * a[2]];
  const norm = a => Math.hypot(a[0], a[1], a[2]);
  const unit = a => sc(1 / norm(a), a);
  const rot = (n, al, v) => { const c = Math.cos(al), s = Math.sin(al); return add(add(sc(c, v), sc(s, cross(n, v))), sc(dot(n, v) * (1 - c), n)); };
  const sph = (th, ph) => [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
  const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const ca = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mm = (A, B) => [ca(cm(A[0], B[0]), cm(A[1], B[2])), ca(cm(A[0], B[1]), cm(A[1], B[3])),
    ca(cm(A[2], B[0]), cm(A[3], B[2])), ca(cm(A[2], B[1]), cm(A[3], B[3]))];
  const dg = A => [[A[0][0], -A[0][1]], [A[2][0], -A[2][1]], [A[1][0], -A[1][1]], [A[3][0], -A[3][1]]];
  const Bm = v => [[v[2], 0], [v[0], -v[1]], [v[0], v[1]], [-v[2], 0]];
  /* R(n̂, α) = cos(α/2) I₂ − i sin(α/2) n̂·σ */
  const rotor = (n, al) => { const c = Math.cos(al / 2), s = Math.sin(al / 2); return [[c, -s * n[2]], [-s * n[1], -s * n[0]], [s * n[1], -s * n[0]], [c, s * n[2]]]; };
  const dist = (A, B) => Math.max(...A.map((x, i) => Math.hypot(x[0] - B[i][0], x[1] - B[i][1])));
  const I2 = [[1, 0], [0, 0], [0, 0], [1, 0]], NEG_I2 = [[-1, 0], [0, 0], [0, 0], [-1, 0]];
  return { dot, cross, add, sub, sc, norm, unit, rot, sph, mm, dg, Bm, rotor, dist, I2, NEG_I2 };
})();

/* the five cited theorems, by short name (film.json "lean") */
const QB_LEAN = {
  B_formula_core: 'D5/S3/Quantum/Measurement/Bloch/QubitBloch.B_formula_core',
  rank_one_pure_state_modulus_square_reduction: 'D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction',
  relativeComplexStructure_square: 'D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square',
  lagrange_gram_identity: 'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  circle_double_cover_history_lift: 'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift'
};
/* rational unit vectors (Pythagorean quadruples) [x, y, z, d] and rational half-angles [cos α/2, sin α/2, d] */
const QB_UNITS = [[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [2, 6, 9, 11], [4, 4, 7, 9], [2, 10, 11, 15], [0, 3, 4, 5],
  [1, 0, 0, 1], [0, 1, 0, 1], [0, 0, 1, 1], [-2, 1, -2, 3], [6, -2, 3, 7], [-1, -8, 4, 9], [0, 0, -1, 1]];
const QB_HALVES = [[1, 0, 1], [0, 1, 1], [-1, 0, 1], [3, 4, 5], [4, -3, 5], [5, 12, 13], [-8, 15, 17], [7, 24, 25]];
const QB_AXIS = QF.unit([1, 2, 2]);      // the rotor axis n̂ = (1, 2, 2)/3 of the SANDWICH ROTOR scene
const QB_STATS = { exact: 0, float: 0 };

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('qubit film: ' + m); };
  const X = QX;
  const check = (ok, m) => { QB_STATS.exact++; if (!ok) fail(m); };

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  if (lean.length !== Object.keys(QB_LEAN).length) fail(`film.json cites ${lean.length} declarations, expected ${Object.keys(QB_LEAN).length}`);
  for (const [short, gid] of Object.entries(QB_LEAN)) {
    const r = lean.find(z => z.gid === gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    if (r.kind !== 'theorem') fail(`${gid} is a ${r.kind || 'missing'} declaration, not a theorem, at the pinned commit`);
    if (r.short !== short) fail(`${gid} resolves to ${r.name}, expected the short name ${short}`);
    if (!/^sha256:[0-9a-f]{64}$/.test(r.statement_id || '')) fail(`${gid} has no statement digest in the lock`);
  }

  /* 1. Pauli algebra */
  const I2 = X.I2, mI = X.NEG_I2;
  for (const [s, nm] of [[X.SX, 'σx'], [X.SY, 'σy'], [X.SZ, 'σz']]) {
    check(X.meq(X.mmul(s, s), I2), `${nm}² ≠ I₂`);
    check(X.meq(X.dag(s), s) && X.ceq(X.tr(s), X.C0), `${nm} is not Hermitian and traceless`);
  }
  check(X.meq(X.mmul(X.SX, X.SY), X.msc(X.CI, X.SZ)), 'σxσy ≠ iσz');
  check(X.meq(X.mmul(X.SY, X.SZ), X.msc(X.CI, X.SX)), 'σyσz ≠ iσx');
  check(X.meq(X.mmul(X.SZ, X.SX), X.msc(X.CI, X.SY)), 'σzσx ≠ iσy');

  /* 2. Bloch matrices: B(v) = B_formula_core right-hand side, B(v)² = |v|² I₂ */
  const units = QB_UNITS.map(([x, y, z, d]) => X.vec(x, y, z, d));
  const ints = [[1, 2, 2], [3, -1, 4], [0, 5, -2], [2, 0, 0], [-3, 1, 1], [1, 1, 1], [7, -4, 0]].map(([x, y, z]) => X.vec(x, y, z));
  units.forEach((v, k) => {
    check(X.eq(X.dot(v, v), X.ONE), `unit vector ${k} has |v|² ≠ 1`);
    const Bv = X.B(v);
    check(X.meq(Bv, X.Bcore(v)), `B(v) differs from [[z, x − iy], [x + iy, −z]] at ${k}`);
    check(X.meq(X.mmul(Bv, Bv), I2), `B(v)² ≠ I₂ at ${k}`);
    check(X.meq(X.dag(Bv), Bv) && X.ceq(X.tr(Bv), X.C0), `B(v) not Hermitian and traceless at ${k}`);
    check(X.veq(X.blochOf(X.rho(v)), v), `ρ(v) does not read back v at ${k}`);
  });
  ints.forEach((a, k) => check(X.meq(X.mmul(X.B(a), X.B(a)), X.msc(X.re(X.dot(a, a)), I2)), `B(a)² ≠ |a|² I₂ at ${k}`));

  /* 3. Born weights: Tr(ψψ† φφ†) = |φ†ψ|² (the Lean shape), and for the normalised states (1 + u·v)/2 */
  units.forEach((u, i) => units.forEach((v, j) => {
    check(X.ceq(X.tr(X.mmul(X.rho(u), X.rho(v))), X.re(X.mul(X.HALF, X.add(X.ONE, X.dot(u, v))))), `Tr ρ(u)ρ(v) ≠ (1 + u·v)/2 at ${i}, ${j}`);
    if (X.eq(u[2], X.MINUS) || X.eq(v[2], X.MINUS)) return;
    const ph = X.ket(u), ps = X.ket(v), P = X.outer(ph, ph), R = X.outer(ps, ps), bk = X.braket(ph, ps);
    check(X.ceq(X.tr(X.mmul(R, P)), X.re(X.abs2(bk))), `Tr(ψψ† · φφ†) ≠ |φ†ψ|² at ${i}, ${j}`);
    check(X.meq(X.msc(X.re(X.norm2(ps)), X.rho(v)), R), `ρ(v) ≠ ψψ†/‖ψ‖² at ${j}`);
    check(X.eq(X.abs2(bk), X.mul(X.mul(X.norm2(ph), X.norm2(ps)), X.mul(X.HALF, X.add(X.ONE, X.dot(u, v))))),
      `|φ†ψ|² ≠ ‖φ‖²‖ψ‖²(1 + u·v)/2 at ${i}, ${j}`);
  }));
  /* p₀ against |0⟩: (1 + z)/2, i.e. cos²(θ/2) with cos θ = z */
  const ket0 = [X.C1, X.C0];
  units.forEach((v, j) => {
    if (X.eq(v[2], X.MINUS)) return;
    const ps = X.ket(v), w = X.abs2(X.braket(ket0, ps));
    check(X.eq(w, X.mul(X.norm2(ps), X.mul(X.HALF, X.add(X.ONE, v[2])))), `p₀ ≠ (1 + cos θ)/2 at ${j}`);
  });

  /* 4. geometric product (a·σ)(b·σ) = (a·b) I₂ + i (a×b)·σ, and the Lagrange identity */
  const vs = ints.concat(units.slice(0, 7));
  vs.forEach((a, i) => vs.forEach((b, j) => {
    const gp = X.mmul(X.B(a), X.B(b)), want = X.madd(X.msc(X.re(X.dot(a, b)), I2), X.msc(X.CI, X.B(X.cross(a, b))));
    check(X.meq(gp, want), `(a·σ)(b·σ) ≠ (a·b) I₂ + i (a×b)·σ at ${i}, ${j}`);
    const ab = X.dot(a, b), lhs = X.sub(X.mul(X.dot(a, a), X.dot(b, b)), X.mul(ab, ab));
    let dbl = X.O;
    for (let p = 0; p < 3; p++) for (let r = 0; r < 3; r++) { const m = X.sub(X.mul(a[p], b[r]), X.mul(a[r], b[p])); dbl = X.add(dbl, X.mul(m, m)); }
    const cr = X.cross(a, b);
    check(X.eq(lhs, X.mul(X.HALF, dbl)) && X.eq(lhs, X.dot(cr, cr)), `Lagrange identity fails at ${i}, ${j}`);
  }));

  /* 5. the relative complex structure J = 2·A·Bᴴ of A = ½(1+i) I₂, B = ½(1+i) Î is −Î, and J·J = −I₂ */
  const h = X.c(X.HALF, X.HALF);
  units.forEach((n, k) => {
    const Ib = X.biv(n), A = X.msc(h, I2), Bm = X.msc(h, Ib), half = X.msc(X.re(X.HALF), I2);
    check(X.meq(X.madd(X.mmul(A, X.dag(Bm)), X.mmul(Bm, X.dag(A))), X.Z2), `hCross fails at ${k}`);
    check(X.meq(X.mmul(A, X.dag(A)), half) && X.meq(X.mmul(X.dag(Bm), Bm), half), `hA or hB fails at ${k}`);
    const J = X.msc(X.re(X.TWO), X.mmul(A, X.dag(Bm)));
    check(X.meq(J, X.msc(X.re(X.MINUS), Ib)), `J ≠ −Î at ${k}`);
    check(X.meq(X.mmul(J, J), mI) && X.meq(X.mmul(Ib, Ib), mI), `J² or Î² ≠ −I₂ at ${k}`);
  });

  /* 6. rotors: SU(2), half angle in the matrix, axis fixed, plane turned by the full angle, composition */
  const halves = QB_HALVES.map(([a, b, d]) => [X.q(a, d), X.q(b, d)]);
  units.forEach((n, i) => {
    const Ib = X.biv(n), Bn = X.B(n);
    halves.forEach(([co, si], k) => {
      check(X.eq(X.add(X.mul(co, co), X.mul(si, si)), X.ONE), `half-angle ${k} is not on the unit circle`);
      const R = X.rotor(n, co, si), Rd = X.dag(R), [ca, sa] = X.double(co, si);
      check(X.meq(X.mmul(R, Rd), I2) && X.ceq(X.det(R), X.C1), `R is not in SU(2) at ${i}, ${k}`);
      check(X.ceq(X.tr(R), X.re(X.mul(X.TWO, co))), `Tr R ≠ 2 cos(α/2) at ${i}, ${k}`);
      check(X.meq(X.mmul(X.mmul(R, Bn), Rd), Bn), `R B(n̂) R† ≠ B(n̂) at ${i}, ${k}`);
      units.slice(0, 9).forEach((v, j) => {
        const out = X.mmul(X.mmul(R, X.B(v)), Rd);
        check(X.meq(out, X.B(X.rodrigues(n, co, si, v))), `R B(v) R† ≠ B(rotated v) at ${i}, ${k}, ${j}`);
        const vpar = X.vsc(X.dot(n, v), n), vp = X.vsub(v, vpar), Bp = X.B(vp), Bq = X.B(vpar);
        check(X.meq(X.mmul(Bq, Ib), X.mmul(Ib, Bq)), `v∥ does not commute with Î at ${i}, ${j}`);
        check(X.meq(X.mmul(Bp, Ib), X.msc(X.re(X.MINUS), X.mmul(Ib, Bp))), `v⊥ does not anti-commute with Î at ${i}, ${j}`);
        check(X.meq(X.mmul(X.mmul(R, Bp), Rd), X.mmul(Bp, X.mmul(Rd, Rd))), `R v⊥ R† ≠ v⊥ (R†)² at ${i}, ${k}, ${j}`);
        const vp2 = X.rodrigues(n, co, si, vp), L = X.dot(vp, vp);
        check(X.eq(X.dot(vp2, vp), X.mul(ca, L)) && X.eq(X.dot(X.cross(n, vp), vp2), X.mul(sa, L)), `v⊥ is not turned by the full angle at ${i}, ${k}, ${j}`);
      });
      halves.forEach(([c2, s2], m) => {
        const R12 = X.rotor(n, X.sub(X.mul(co, c2), X.mul(si, s2)), X.add(X.mul(si, c2), X.mul(co, s2)));
        check(X.meq(X.mmul(R, X.rotor(n, c2, s2)), R12), `R(α)R(β) ≠ R(α + β) at ${i}, ${k}, ${m}`);
      });
    });
    /* 7. spinor sign: R(π)² = R(2π) = −I₂ fixes every B(v); R(2π)² = R(4π) = +I₂ */
    const Rpi = X.rotor(n, X.O, X.ONE), R2 = X.rotor(n, X.MINUS, X.O), R4 = X.rotor(n, X.ONE, X.O);
    check(X.meq(R2, mI) && X.meq(X.mmul(Rpi, Rpi), mI), `R(2π) ≠ −I₂ at ${i}`);
    check(X.meq(R4, I2) && X.meq(X.mmul(R2, R2), I2), `R(4π) ≠ +I₂ at ${i}`);
    units.forEach((v, j) => check(X.meq(X.mmul(X.mmul(R2, X.B(v)), X.dag(R2)), X.B(v)), `R(2π) moves v at ${i}, ${j}`));
  });

  /* 8. the floating-point rotors the animation draws */
  const fcheck = (ok, m) => { QB_STATS.float++; if (!ok) fail(m); };
  const axes = [QB_AXIS, [0, 0, 1], QF.unit([2, -1, 2]), QF.unit([-1, 4, 8])];
  const probes = [[0, 0, 1], [1, 0, 0], QF.unit([2, 3, 6]), QF.unit([-1, -8, 4])];
  for (const n of axes) {
    for (let k = 0; k <= 96; k++) {
      const al = 4 * Math.PI * k / 96, R = QF.rotor(n, al), Rd = QF.dg(R);
      fcheck(QF.dist(QF.mm(R, Rd), QF.I2) < 1e-12, `float rotor not unitary at α = ${al.toFixed(3)}`);
      fcheck(QF.dist(QF.mm(QF.mm(R, QF.Bm(n)), Rd), QF.Bm(n)) < 1e-12, `float axis moved at α = ${al.toFixed(3)}`);
      for (const v of probes) fcheck(QF.dist(QF.mm(QF.mm(R, QF.Bm(v)), Rd), QF.Bm(QF.rot(n, al, v))) < 1e-12, `float sandwich ≠ rotation at α = ${al.toFixed(3)}`);
    }
    fcheck(QF.dist(QF.rotor(n, 2 * Math.PI), QF.NEG_I2) < 1e-12, 'float R(2π) ≠ −I₂');
    fcheck(QF.dist(QF.rotor(n, 4 * Math.PI), QF.I2) < 1e-12, 'float R(4π) ≠ +I₂');
  }
});
Object.assign(FILM.speed, { bloch: 0.02, geometric: 0.012, rotor: 0.018, spinor: 0.024, close: 0.025 });

/* ======================================================================= */
/*                              drawing helpers                              */
/* ======================================================================= */
const QB_DEG = Math.PI / 180;
const qbNum = (x, d = 3) => { const v = Math.abs(x) < 0.5 * Math.pow(10, -d) ? 0 : x; return (v < 0 ? '−' : '+') + Math.abs(v).toFixed(d); };
const qbCx = (re, im, d = 2) => { const i = Math.abs(im) < 0.5 * Math.pow(10, -d) ? 0 : im; return `${qbNum(re, d)} ${i < 0 ? '−' : '+'} ${Math.abs(i).toFixed(d)}i`; };
const qbDeg = (r, d = 1) => (r / QB_DEG).toFixed(d) + '°';
const qbMod = (x, m) => ((x % m) + m) % m;

/* orthographic view of the unit sphere: world (x, y, z), z up → [screen x, screen y, depth] (depth > 0 behind) */
function qbView(cx, cy, R, yaw, el) {
  const cw = Math.cos(yaw), sw = Math.sin(yaw), ce = Math.cos(el), se = Math.sin(el);
  const V = p => {
    const X = p[0] * cw - p[1] * sw, Y = p[0] * sw + p[1] * cw, Z = p[2];
    return [cx + X * R, cy - (Z * ce + Y * se) * R, Y * ce - Z * se];
  };
  V.cx = cx; V.cy = cy; V.R = R;
  return V;
}
/* a parametric 3-D curve: front runs bright, back runs faint */
function qbPath(V, fn, n, col, aF, aB, lw = 2) {
  if (aF <= 0.003 && aB <= 0.003) return;
  const pts = [];
  for (let i = 0; i <= n; i++) pts.push(V(fn(i / n)));
  let run = [pts[0]], back = pts[0][2] > 0;
  const flush = () => {
    if (run.length < 2) return;
    const r = run;
    curve(k => r[Math.round(k * (r.length - 1))], r.length - 1, col, back ? aB : aF, back ? lw * 0.7 : lw);
  };
  for (let i = 1; i < pts.length; i++) {
    const b = pts[i][2] > 0;
    run.push(pts[i]);
    if (b !== back) { flush(); run = [pts[i]]; back = b; }
  }
  flush();
}
/* circular arc centre + r (cos t e1 + sin t e2), t ∈ [t0, t1] */
function qbArc(V, c0, e1, e2, r, t0, t1, col, aF, aB, lw = 2) {
  const n = Math.max(6, Math.ceil(Math.abs(t1 - t0) * 20));
  qbPath(V, s => { const t = t0 + (t1 - t0) * s; return QF.add(c0, QF.add(QF.sc(r * Math.cos(t), e1), QF.sc(r * Math.sin(t), e2))); }, n, col, aF, aB, lw);
}
function qbAxes(V, a, o = {}) {
  const c0 = V([0, 0, 0]);
  for (const [e, l] of [[[1, 0, 0], 'x'], [[0, 1, 0], 'y'], [[0, 0, 1], 'z']]) {
    const pn = V(QF.sc(-1.22, e)), pp = V(QF.sc(1.28, e)), pl = V(QF.sc(1.42, e));
    dashed(pn[0], pn[1], c0[0], c0[1], C.dim, 0.45 * a, 1.4);
    arrow(c0[0], c0[1], pp[0], pp[1], C.dim, 0.7 * a, 1.6);
    txt(l, pl[0], pl[1] + 9, { size: 26, fam: F.math, w: 700, align: 'center', c: C.dim, a: 0.95 * a });
  }
  if (o.poles === false) return;
  const N = V([0, 0, 1]), Sp = V([0, 0, -1]);
  dot(N[0], N[1], 11, 'w', a); dot(Sp[0], Sp[1], 11, 'w', a);
  txt('|0⟩', N[0] + 22, N[1] - 10, { size: 30, fam: F.math, w: 700, c: C.white, a });
  txt('|1⟩', Sp[0] + 22, Sp[1] + 30, { size: 30, fam: F.math, w: 700, c: C.white, a });
}
function qbSphere(V, a, o = {}) {
  if (a <= 0.003) return;
  const col = o.col || C.blue;
  if (o.ring !== false) {
    dot(V.cx - V.R * 0.18, V.cy - V.R * 0.22, V.R * 1.25, 'b', 0.08 * a);
    ring(V.cx, V.cy, V.R, C.cyan, 0.8 * a, 2.4);
    ring(V.cx, V.cy, V.R + 8, C.cyan, 0.16 * a, 1);
  }
  for (const lat of [-60, -30, 0, 30, 60]) {
    const r = Math.cos(lat * QB_DEG), z = Math.sin(lat * QB_DEG), eq = lat === 0;
    qbPath(V, s => [r * Math.cos(TAU * s), r * Math.sin(TAU * s), z], 72, eq ? (o.eq || C.cyan) : col, a * (eq ? 0.7 : 0.38), a * (eq ? 0.22 : 0.1), eq ? 2 : 1.3);
  }
  for (let k = 0; k < 6; k++) {
    const ph = k * Math.PI / 6;
    qbPath(V, s => [Math.sin(TAU * s) * Math.cos(ph), Math.sin(TAU * s) * Math.sin(ph), Math.cos(TAU * s)], 72, col, a * 0.32, a * 0.09, 1.2);
  }
  if (o.axes !== false) qbAxes(V, a, o);
}
/* an arrow from the centre to v with a glowing tip */
function qbVec(V, v, col, a, o = {}) {
  if (a <= 0.003) return;
  const c0 = o.from ? V(o.from) : V([0, 0, 0]), p = V(v);
  arrow(c0[0], c0[1], p[0], p[1], col, a, o.lw || 4);
  if (o.tip !== false) dot(p[0], p[1], o.r || 14, o.pearl || 'g', a);
  if (!o.label) return;
  if (o.side) {
    /* label beside the tip, perpendicular to the arrow (clear of labels placed along radial directions) */
    const dx = p[0] - c0[0], dy = p[1] - c0[1], L = Math.hypot(dx, dy) || 1;
    txt(o.label, p[0] - dy / L * o.side + dx / L * 10, p[1] + dx / L * o.side + dy / L * 10 + 10, { size: o.size || 32, fam: F.math, w: 700, align: 'center', c: col, a });
  } else txt(o.label, p[0] + (o.dx == null ? 20 : o.dx), p[1] + (o.dy == null ? -16 : o.dy), { size: o.size || 32, fam: F.math, w: 700, c: col, a });
}
/* coloured runs of text on one baseline: parts = [[text, colour], …] */
function qbRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a, ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* a 2×2 matrix with bracket rails; y is the baseline of the first row */
function qbMat(x, y, cells, a, o = {}) {
  if (a <= 0.003) return x;
  const size = o.size || 24, cw = o.cw || 200, rh = o.rh || 46, col = o.c || C.white, fam = o.fam || F.math;
  const top = y - size * 1.1, bot = y + rh + size * 0.5, xr = x + 20 + cw * 2;
  for (const [x0, d] of [[x, 1], [xr, -1]]) {
    line(x0, top, x0, bot, col, a * 0.85, 2);
    line(x0, top, x0 + 12 * d, top, col, a * 0.85, 2);
    line(x0, bot, x0 + 12 * d, bot, col, a * 0.85, 2);
  }
  cells.forEach((row, i) => row.forEach((s, j) => txt(s, x + 10 + cw * j + cw / 2, y + rh * i,
    { size, fam, w: 700, align: 'center', c: (o.cols && o.cols[i][j]) || col, a })));
  return xr;
}
/* LEAN ✓ chip for one cited theorem, by short name */
const QB_MISSING = new Set();
function qbLean(x, y, short, a, o = {}) {
  if (a <= 0.003) return;
  const r = (DATA.lean || []).find(z => z.short === short && z.kind === 'theorem');
  if (!r) {
    if (!QB_MISSING.has(short)) { QB_MISSING.add(short); window.FILM_ERRORS.push(`film.json does not cite the theorem ${short}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  if (o.module) txt(r.gid.split('.')[0], x + wh + 12, y + size * 1.1, { size: size * 0.72, fam: F.mono, c: C.dim, a: a * 0.9 });
}
/* NUM tag: computed on screen, not a proof */
function qbNumTag(x, y, a) { chip(x + 32, y - 9, 64, 26, 'NUM', C.cyan, a * 0.9, 14); }

/* ======================================================================= */
/*                          scene 1 · BLOCH SPHERE                           */
/* ======================================================================= */
/* line 0: v wanders over the sphere; line 1: v is brought to the front-left (φ + yaw = π + 0.4) and θ sweeps 20° → 117° */
const qbBlochYaw = u => -2.05 + 0.05 * u;
function qbBlochAngles(S) {
  const u = S.u, L0 = lineAt(S, 0), L1 = lineAt(S, 1), yaw = qbBlochYaw(u);
  const th0 = 1.05 + 0.3 * Math.sin(0.8 * Math.max(0, u - L0.s));
  const sweep = lerp(0.35, 2.05, ease(clamp((u - L1.s - 0.3) / Math.max(1, (L1.e - L1.s) * 0.85))));
  const k = ease(clamp((u - L1.s + 0.5) / 0.9));
  return { th: lerp(th0, sweep, k), ph: lerp(0.55 + 0.42 * u, Math.PI + 0.4 - yaw, k), yaw };
}
SCENES.bloch = S => {
  const u = S.u, L0 = lineAt(S, 0);
  /* opening title, decoding in during the lead */
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta > 0) {
    const p = clamp(u / 1.3);
    txt(`${DATA.book.code} · FILM ${DATA.film.number}`, W / 2, 340, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
    txt(DATA.film.title_zh, W / 2, 490, { size: 116, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
    txt(scramble(DATA.film.title.toUpperCase(), p, 5), W / 2, 590, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 6, ab: 2 });
    txt('BLOCH · BORN · ROTOR · SPINOR', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 8 });
  }
  const ma = at(S, 0, 0.9, -0.15) * clamp((S.d - u) / 0.5);
  if (ma <= 0) return;
  if (u >= L0.s) badgeQ(S, [[0, 'Pure', 'computed'], [1, 'Born weight', 'lean']]);
  const { th, ph, yaw } = qbBlochAngles(S), v = QF.sph(th, ph);
  const V = qbView(560, 505, 280, yaw, 0.3);
  qbSphere(V, ma);
  /* Born geometry: chord from |1⟩ at half the angle, projection 1 + cos θ on the axis */
  const b1 = Q(S, 1, 'Born weight', 0.6) * ma, hz = QF.unit([Math.cos(ph), Math.sin(ph), 0]);
  if (b1 > 0) {
    const Sp = V([0, 0, -1]), Pz = V([0, 0, Math.cos(th)]), pv = V(v);
    line(Sp[0], Sp[1], Pz[0], Pz[1], C.cyan, b1, 7);
    dashed(pv[0], pv[1], Pz[0], Pz[1], C.cyan, 0.8 * b1, 2);
    dashed(Sp[0], Sp[1], pv[0], pv[1], C.mag, 0.9 * b1, 2.5);
    qbArc(V, [0, 0, -1], [0, 0, 1], hz, 0.3, 0, th / 2, C.mag, b1, 0.6 * b1, 2.5);
    const ha = V(QF.add([0, 0, -1], QF.add(QF.sc(0.42 * Math.cos(th / 4), [0, 0, 1]), QF.sc(0.42 * Math.sin(th / 4), hz))));
    txt('θ/2', ha[0] + 6, ha[1] + 10, { size: 26, fam: F.math, w: 700, c: C.mag, a: b1 });
    const mid = [(Sp[0] + Pz[0]) / 2, (Sp[1] + Pz[1]) / 2];
    txt('1 + cos θ', mid[0] + 20, mid[1] + 8, { size: 24, fam: F.math, w: 700, c: C.cyan, a: b1 });
    /* chord label: off the chord's midpoint along its normal, on the side away from the sphere's centre */
    const cm = [(Sp[0] + pv[0]) / 2, (Sp[1] + pv[1]) / 2], cdx = pv[0] - Sp[0], cdy = pv[1] - Sp[1], cL = Math.hypot(cdx, cdy) || 1;
    let nx = -cdy / cL, ny = cdx / cL;
    if (nx * (V.cx - cm[0]) + ny * (V.cy - cm[1]) > 0) { nx = -nx; ny = -ny; }
    txt('2 cos(θ/2)', cm[0] + nx * 30, cm[1] + ny * 30 + 9, { size: 24, fam: F.math, w: 700, align: nx < 0 ? 'right' : 'left', c: C.mag, a: b1 * Q(S, 1, 'cosine squared', 0.5) });
  }
  /* the angle θ from |0⟩ and the state arrow */
  qbArc(V, [0, 0, 0], [0, 0, 1], hz, 0.3, 0, th, C.now, 0.95 * ma, 0.5 * ma, 2.5);
  const tl = V(QF.add(QF.sc(0.42 * Math.cos(th / 2), [0, 0, 1]), QF.sc(0.42 * Math.sin(th / 2), hz)));
  txt('θ', tl[0], tl[1] + 8, { size: 28, fam: F.math, w: 700, align: 'center', c: C.now, a: ma });
  qbVec(V, v, C.now, ma, { label: 'v', side: -30 });
  /* p₀ gauge */
  const p0 = Math.cos(th / 2) ** 2, gx = 905, gt = 250, gb = 760, gh = gb - gt;
  if (b1 > 0) {
    box(gx - 4, gt - 4, 40, gh + 8, C.dim, b1 * 0.7, 1.2);
    fillBox(gx, gb - gh * p0, 32, gh * p0, C.cyan, 0.75 * b1);
    fillBox(gx, gt, 32, gh * (1 - p0), C.mag, 0.35 * b1);
    txt(`p₀ ${p0.toFixed(3)}`, gx + 16, gb + 40, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: b1 });
    txt(`p₁ ${(1 - p0).toFixed(3)}`, gx + 16, gt - 18, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: b1 });
  }
  qbBlochPanel(S, v, th, ph, ma);
  qbBornPanel(S, th, b1);
};
function qbBlochPanel(S, v, th, ph, a) {
  const x = 1010, y = 180, w = 790, a0 = a;
  panel(x, y, w, 440, a0, C.cyan, 'BLOCH MATRIX · 布洛赫矩阵');
  qbRich([['v = (', C.white], ['sin θ cos φ', C.now], [', ', C.white], ['sin θ sin φ', C.now], [', ', C.white], ['cos θ', C.now], [')', C.white]], x + 28, y + 86, { size: 30, a: a0 });
  txt(`θ = ${qbDeg(th)}   φ = ${qbDeg(qbMod(ph, TAU))}   v = (${qbNum(v[0], 2)}, ${qbNum(v[1], 2)}, ${qbNum(v[2], 2)})`, x + 28, y + 128,
    { size: 21, fam: F.mono, w: 700, c: C.cyan, a: a0 });
  const qa = a0 * Q(S, 0, 'Bloch matrix', 0.6, -0.4);
  txt('B(v) = v·σ =', x + 28, y + 206, { size: 30, fam: F.math, w: 700, c: C.white, a: qa });
  qbMat(x + 262, y + 194, [[qbNum(v[2], 2), qbCx(v[0], -v[1])], [qbCx(v[0], v[1]), qbNum(-v[2], 2)]], qa, { size: 24, cw: 232 });
  txt('B a = [[a 2, a 0 − i·a 1], [a 0 + i·a 1, −a 2]]', x + 28, y + 300, { size: 20, fam: F.mono, w: 700, c: C.dim, a: qa });
  qbLean(x + 28, y + 344, 'B_formula_core', qa, { size: 20 });
  const qs = a0 * Q(S, 0, 'squares to one', 0.6);
  const ex = qbRich([['B(v)² = |v|² I₂ = ', C.white], ['I₂', C.cyan]], x + 28, y + 412, { size: 30, a: qs });
  qbNumTag(ex + 20, y + 410, qs);
}
function qbBornPanel(S, th, a) {
  if (a <= 0.003) return;
  const x = 1010, y = 640, w = 790;
  panel(x, y, w, 196, a, C.cyan, 'BORN WEIGHT · 玻恩权重');
  txt('Tr(ρ · P₀) = |φ†ψ|²    P₀ = φφ†, ρ = ψψ†', x + 28, y + 76, { size: 26, fam: F.math, w: 700, c: C.white, a });
  qbLean(x + 28, y + 118, 'rank_one_pure_state_modulus_square_reduction', a, { size: 18 });
  const q2 = a * Q(S, 1, 'cosine squared', 0.6);
  qbRich([['p₀ = ', C.white], ['cos²(θ/2)', C.mag], [' = ', C.white], ['(1 + cos θ)/2', C.cyan], [` = ${(Math.cos(th / 2) ** 2).toFixed(3)}`, C.now]], x + 28, y + 172, { size: 28, a: q2 });
  qbNumTag(x + w - 110, y + 25, q2);
}

/* ======================================================================= */
/*                       scene 2 · GEOMETRIC PRODUCT                         */
/* ======================================================================= */
SCENES.geometric = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'their squares', 'lean']]);
  const th = 0.42 + 0.5 * ease(clamp((u - 0.4) / 4.2)) + 0.07 * Math.sin(0.9 * u);
  const ox = 330, oy = 650, U = 380;
  const A = [ox + U, oy], Bt = [ox + U * Math.cos(th), oy - U * Math.sin(th)], AB = [A[0] + Bt[0] - ox, A[1] + Bt[1] - oy];
  /* the oriented area A∧B: hatched parallelogram */
  const wa = a * Q(S, 0, 'sine theta as', 0.7, -0.6);
  if (wa > 0) {
    for (let k = 1; k < 22; k++) {
      const s = k / 22;
      line(ox + U * s, oy, ox + U * s + (Bt[0] - ox), oy + (Bt[1] - oy), C.mag, 0.28 * wa, 1.5);
    }
    line(A[0], A[1], AB[0], AB[1], C.mag, 0.8 * wa, 2);
    line(Bt[0], Bt[1], AB[0], AB[1], C.mag, 0.8 * wa, 2);
    /* orientation: from A towards B */
    curve(s => [ox + U * 0.62 * Math.cos(th * (0.15 + 0.7 * s)), oy - U * 0.62 * Math.sin(th * (0.15 + 0.7 * s))], 30, C.mag, wa, 2.5);
    const e0 = th * 0.85, e1 = th * 0.8;
    arrow(ox + U * 0.62 * Math.cos(e1), oy - U * 0.62 * Math.sin(e1), ox + U * 0.62 * Math.cos(e0), oy - U * 0.62 * Math.sin(e0), C.mag, wa, 2.5);
    const cxp = (ox + A[0] + Bt[0] + AB[0]) / 4, cyp = (oy + A[1] + Bt[1] + AB[1]) / 4;
    txt('A∧B = sin θ Î', cxp + 30, cyp - 6, { size: 30, fam: F.math, w: 700, align: 'center', c: C.mag, a: wa, ab: 1 });
    txt(`area ${Math.sin(th).toFixed(3)}`, cxp + 30, cyp + 30, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a: wa * 0.9 });
  }
  /* the collinear shadow A·B */
  const da = a * Q(S, 0, 'cosine theta', 0.7, -0.6);
  if (da > 0) {
    const px = ox + U * Math.cos(th);
    dashed(Bt[0], Bt[1], px, oy, C.cyan, 0.8 * da, 2);
    line(ox, oy + 16, px, oy + 16, C.cyan, da, 8);
    txt('A·B = cos θ', (ox + px) / 2, oy + 62, { size: 30, fam: F.math, w: 700, align: 'center', c: C.cyan, a: da, ab: 1 });
    txt(Math.cos(th).toFixed(3), (ox + px) / 2, oy + 94, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: da * 0.9 });
  }
  /* the two unit vectors and the angle */
  curve(s => [ox + 70 * Math.cos(th * s), oy - 70 * Math.sin(th * s)], 24, C.now, a, 2.5);
  txt('θ', ox + 92 * Math.cos(th / 2), oy - 92 * Math.sin(th / 2) + 10, { size: 28, fam: F.math, w: 700, align: 'center', c: C.now, a });
  arrow(ox, oy, A[0], A[1], C.white, a, 4);
  arrow(ox, oy, Bt[0], Bt[1], C.now, a, 4);
  dot(ox, oy, 10, 'w', a);
  txt('A', A[0] + 18, A[1] + 10, { size: 34, fam: F.math, w: 700, c: C.white, a });
  txt('B', Bt[0] + 14, Bt[1] - 12, { size: 34, fam: F.math, w: 700, c: C.now, a });
  const lp = a * Q(S, 1, 'Particle', 0.6), lw = a * Q(S, 1, 'wave', 0.6);
  txt('PARTICLE · 粒子', ox, oy + 150, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: lp, ls: 3 });
  txt('WAVE · 波', ox + U * 0.55, oy - U * 1.02, { size: 24, fam: F.mono, w: 700, c: C.mag, a: lw, ls: 3 });
  /* formulas */
  const x = 1010, y = 180, w = 790;
  panel(x, y, w, 330, a, C.cyan, 'GEOMETRIC PRODUCT · 几何积');
  const f1 = a * at(S, 0, 0.6, -0.2);
  txt('AB = A·B + A∧B', x + 28, y + 96, { size: 46, fam: F.math, w: 700, c: C.white, a: f1, ab: 1 });
  qbRich([['   = ', C.white], ['cos θ', C.cyan], [' + ', C.white], ['sin θ Î', C.mag]], x + 28, y + 160, { size: 46, a: a * Q(S, 0, 'cosine theta', 0.6) });
  txt(`θ = ${qbDeg(th)}   Î² = −1`, x + 28, y + 212, { size: 22, fam: F.mono, w: 700, c: C.now, a: f1 });
  const f3 = a * Q(S, 0, 'sine theta as', 0.6, 0.4);
  txt('(a·σ)(b·σ) = (a·b) I₂ + i (a×b)·σ', x + 28, y + 280, { size: 26, fam: F.math, w: 700, c: C.dim, a: f3 });
  qbNumTag(x + 560, y + 278, f3);
  const g = a * at(S, 1, 0.6, -0.2);
  if (g > 0) {
    const y2 = 532;
    panel(x, y2, w, 304, g, C.cyan, 'LAGRANGE · 拉格朗日恒等式');
    txt('|u|²|v|² − (u·v)² = ½ Σ_ij (u_i v_j − u_j v_i)²', x + 28, y2 + 82, { size: 25, fam: F.math, w: 700, c: C.white, a: g });
    qbLean(x + 28, y2 + 128, 'lagrange_gram_identity', g, { size: 20 });
    const g2 = a * Q(S, 1, 'their squares', 0.6);
    qbRich([['⇒  ', C.white], ['cos²θ', C.cyan], [' + ', C.white], ['sin²θ', C.mag], [' = 1', C.white]], x + 28, y2 + 194, { size: 36, a: g2, ab: 1 });
    const c2 = Math.cos(th) ** 2, bw = 720, bx = x + 34, by = y2 + 226;
    fillBox(bx, by, bw * c2, 38, C.cyan, 0.8 * g2);
    fillBox(bx + bw * c2, by, bw * (1 - c2), 38, C.mag, 0.55 * g2);
    box(bx - 3, by - 3, bw + 6, 44, C.dim, 0.7 * g2, 1.2);
    txt(c2.toFixed(3), bx + 12, by + 28, { size: 22, fam: F.mono, w: 700, c: C.bg, a: g2 });
    txt((1 - c2).toFixed(3), bx + bw - 12, by + 28, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.white, a: g2 });
  }
};

/* ======================================================================= */
/*                         scene 3 · SANDWICH ROTOR                          */
/* ======================================================================= */
/* the rotor figure: axis n̂, the bivector plane ⊥ n̂, v = |0⟩ split into v∥ (fixed) and v⊥ (turned by α) */
function qbRotorFigure(V, al, a, o = {}) {
  if (a <= 0.003) return;
  const n = QB_AXIS, v0 = [0, 0, 1], par = QF.sc(QF.dot(n, v0), n), perp0 = QF.sub(v0, par), w0 = QF.cross(n, perp0);
  const tip = t => QF.add(par, QF.add(QF.sc(Math.cos(t), perp0), QF.sc(Math.sin(t), w0)));
  const e1 = QF.unit(perp0), e2 = QF.cross(n, e1), c0 = V([0, 0, 0]);
  /* the plane of Î: a great circle with faint spokes */
  const pa = a * (o.plane == null ? 1 : o.plane);
  for (let k = 0; k < 36; k++) {
    const t = k * TAU / 36, p = V(QF.add(QF.sc(Math.cos(t), e1), QF.sc(Math.sin(t), e2)));
    line(c0[0], c0[1], p[0], p[1], C.mag, (p[2] > 0 ? 0.05 : 0.12) * pa, 1.2);
  }
  qbPath(V, s => QF.add(QF.sc(Math.cos(TAU * s), e1), QF.sc(Math.sin(TAU * s), e2)), 96, C.mag, 0.75 * pa, 0.25 * pa, 2.2);
  /* label the plane at its left-most screen point, outside the sphere */
  let pl = null;
  for (let k = 0; k < 72; k++) { const p = V(QF.add(QF.sc(Math.cos(k * TAU / 72), e1), QF.sc(Math.sin(k * TAU / 72), e2))); if (!pl || p[0] < pl[0]) pl = p; }
  txt('Î = i n̂·σ', Math.min(pl[0], V.cx - V.R) - 18, pl[1] + 10, { size: 26, fam: F.math, w: 700, align: 'right', c: C.mag, a: pa });
  /* the axis */
  const nB = V(QF.sc(-1.3, n)), nA = V(QF.sc(1.34, n)), nl = V(QF.sc(1.48, n));
  dashed(nB[0], nB[1], c0[0], c0[1], C.cyan, 0.5 * a, 2);
  arrow(c0[0], c0[1], nA[0], nA[1], C.cyan, 0.9 * a, 3);
  txt('n̂', nl[0] + 8, nl[1] + 8, { size: 34, fam: F.math, w: 700, align: 'center', c: C.cyan, a });
  /* the cone traced by v and the swept angle */
  qbPath(V, s => tip(TAU * s), 96, C.cyan, 0.35 * a, 0.14 * a, 1.6);
  if (al > 0.01) qbPath(V, s => tip(al * s), Math.max(8, Math.ceil(al * 24)), C.now, 0.95 * a, 0.5 * a, 4);
  const pv0 = V(v0);
  dashed(c0[0], c0[1], pv0[0], pv0[1], C.white, 0.4 * a, 1.6);
  /* v∥ (fixed) and v⊥ (turning) */
  const v = tip(al), pp = V(par), pv = V(v), hl = a * (o.axisHi || 0), hp = a * (o.planeHi || 0);
  arrow(c0[0], c0[1], pp[0], pp[1], C.cyan, a, 5 + 3 * hl);
  if (hl > 0) dot(pp[0], pp[1], 16 + 10 * hl, 'c', hl);
  arrow(pp[0], pp[1], pv[0], pv[1], C.mag, a, 3 + 2 * hp);
  qbVec(V, v, C.now, a, { label: o.label || 'v′', side: o.label ? 60 : 32 });
  txt('v∥', (c0[0] + pp[0]) / 2 - 34, (c0[1] + pp[1]) / 2 + 6, { size: 28, fam: F.math, w: 700, align: 'right', c: C.cyan, a });
  txt('v⊥', (pp[0] + pv[0]) / 2 + 14, (pp[1] + pv[1]) / 2 + 30, { size: 28, fam: F.math, w: 700, c: C.mag, a });
}
function qbRotorAngle(S) {
  const L0 = lineAt(S, 0);
  return 0.43 * Math.max(0, S.u - L0.s - 0.2) * ease(clamp((S.u - L0.s) / 1.2)) + 0.02;
}
SCENES.rotor = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [0, 'half the angle', 'lean'], [1, 'The axis', 'computed']]);
  const al = qbRotorAngle(S);
  const V = qbView(540, 510, 280, -2.2 + 0.05 * u, 0.32);
  qbSphere(V, a * 0.85, { poles: true });
  qbRotorFigure(V, al, a, { axisHi: Q(S, 1, 'The axis', 0.6) * (1 - Q(S, 2, 'The plane', 0.6)), planeHi: Q(S, 2, 'The plane', 0.6) });
  /* the sandwich: R(α) · v · R(α)† */
  const x0 = 1130, x1 = 1400, x2 = 1670, cy = 262, sa = a * at(S, 0, 0.6, -0.2);
  chip(x0, cy, 180, 66, 'R(α)', C.now, sa, 32, F.math);
  chip(x1, cy, 110, 66, 'v', C.white, sa, 32, F.math);
  chip(x2, cy, 180, 66, 'R(α)†', C.now, sa, 32, F.math);
  const h1 = a * Q(S, 0, 'half the angle', 0.6), h2 = a * Q(S, 0, 'both sides', 0.6);
  curve(s => [lerp(x0, x1, s), cy - 40 - 34 * Math.sin(Math.PI * s)], 30, C.now, h1, 2.5);
  curve(s => [lerp(x1, x2, s), cy - 40 - 34 * Math.sin(Math.PI * s)], 30, C.now, h2, 2.5);
  txt(`α/2 = ${qbDeg(al / 2)}`, (x0 + x1) / 2, cy - 84, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.now, a: h1 });
  txt(`α/2 = ${qbDeg(al / 2)}`, (x1 + x2) / 2, cy - 84, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.now, a: h2 });
  const hf = a * Q(S, 2, 'two halves', 0.6);
  curve(s => [lerp(x0, x2, s), cy + 40 + 30 * Math.sin(Math.PI * s)], 40, C.mag, hf, 3);
  txt(`α/2 + α/2 = α = ${qbDeg(al)}`, x1, cy + 106, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: hf });
  /* the rotor */
  const x = 1010, w = 790, y = 392;
  panel(x, y, w, 214, sa, C.cyan, 'ROTOR · 旋子');
  qbRich([['R(α) = ', C.white], ['cos(α/2)', C.now], [' I₂ − Î ', C.white], ['sin(α/2)', C.now]], x + 28, y + 80, { size: 32, a: sa });
  txt('= exp(−iα n̂·σ/2)    n̂ = (1, 2, 2)/3', x + 28, y + 124, { size: 24, fam: F.math, w: 700, c: C.white, a: sa * 0.95 });
  const la = a * Q(S, 0, 'half the angle', 0.6);
  qbLean(x + 28, y + 166, 'relativeComplexStructure_square', la, { size: 18 });
  txt('J = 2·A·Bᴴ, J·J = −1', x + 470, y + 166, { size: 20, fam: F.math, w: 700, c: C.lean, a: la });
  txt('A = ½(1+i) I₂, B = ½(1+i) Î  ⇒  J = −Î, Î² = −I₂', x + 28, y + 198, { size: 19, fam: F.mono, w: 700, c: C.dim, a: la });
  qbNumTag(x + w - 110, y + 25, sa);
  /* commutation */
  const ca = a * at(S, 1, 0.6, -0.2), pa = a * at(S, 2, 0.6, -0.2), y2 = 624;
  panel(x, y2, w, 212, Math.max(ca, pa), C.cyan, 'SANDWICH · 夹心作用');
  qbRich([['v∥ Î = Î v∥', C.cyan], ['   ⇒   ', C.white], ['R v∥ R† = v∥', C.cyan]], x + 28, y2 + 76, { size: 28, a: ca });
  qbRich([['v⊥ Î = −Î v⊥', C.mag], ['   ⇒   ', C.white], ['R v⊥ = v⊥ R†', C.mag]], x + 28, y2 + 124, { size: 28, a: pa });
  qbRich([['R v⊥ R† = v⊥ (R†)² = v⊥ (', C.white], ['cos α', C.now], [' + Î ', C.white], ['sin α', C.now], [')', C.white]], x + 28, y2 + 172, { size: 28, a: pa });
  qbNumTag(x + w - 110, y2 + 25, Math.max(ca, pa));
};

/* ======================================================================= */
/*                         scene 4 · SPINOR 2π SIGN                          */
/* ======================================================================= */
const QB_SPIN_TH = 1.1, QB_SPIN_PH = -0.5;
function qbSpinAngle(S) {
  const L0 = lineAt(S, 0), L1 = lineAt(S, 1);
  const e0 = phraseAt(S, 0, 'but the rotor'), e1 = phraseAt(S, 1, 'plus one');
  const k0 = ease(clamp((S.u - L0.s - 0.1) / Math.max(0.8, e0 - L0.s - 0.1)));
  const k1 = ease(clamp((S.u - L1.s) / Math.max(0.8, e1 - L1.s)));
  return TAU * (k0 + k1);
}
/* a dial: marker at angle ang (counter-clockwise from the right) with the swept trail */
function qbDial(cx, cy, r, ang, col, a, marks) {
  if (a <= 0.003) return;
  ring(cx, cy, r, C.dim, 0.6 * a, 2);
  ring(cx, cy, r + 10, C.cyan, 0.15 * a, 1);
  for (let k = 0; k < 24; k++) {
    const t = k * TAU / 24, l = k % 6 === 0 ? 16 : 7;
    line(cx + (r - l) * Math.cos(t), cy - (r - l) * Math.sin(t), cx + r * Math.cos(t), cy - r * Math.sin(t), C.dim, 0.7 * a, 1.5);
  }
  for (const [t, s, c] of marks) {
    dot(cx + r * Math.cos(t), cy - r * Math.sin(t), 9, 'w', a);
    txt(s, cx + (r + 46) * Math.cos(t), cy - (r + 46) * Math.sin(t) + 10, { size: 26, fam: F.math, w: 700, align: 'center', c: c, a });
  }
  const turns = Math.floor(ang / TAU), rest = ang - turns * TAU;
  if (turns > 0) ring(cx, cy, r, col, 0.85 * a, 4);
  if (rest > 0.01) curve(s => [cx + r * Math.cos(rest * s), cy - r * Math.sin(rest * s)], Math.ceil(rest * 20), col, a, 5);
  line(cx, cy, cx + r * 0.82 * Math.cos(ang), cy - r * 0.82 * Math.sin(ang), col, a, 3);
  dot(cx + r * Math.cos(ang), cy - r * Math.sin(ang), 18, 'g', a);
  dot(cx, cy, 7, 'w', a);
}
SCENES.spinor = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const al = qbSpinAngle(S);
  const V = qbView(520, 505, 270, -2.05 + 0.04 * u, 0.32);
  qbSphere(V, a, { poles: true });
  const ph = QB_SPIN_PH + al, v = QF.sph(QB_SPIN_TH, ph), zc = Math.cos(QB_SPIN_TH), rr = Math.sin(QB_SPIN_TH);
  /* the orbit of v about z and the swept turns */
  qbPath(V, s => [rr * Math.cos(TAU * s), rr * Math.sin(TAU * s), zc], 96, C.cyan, 0.35 * a, 0.14 * a, 1.6);
  const sweep = Math.min(al, TAU), extra = Math.max(0, al - TAU);
  if (sweep > 0.01) qbPath(V, s => [rr * Math.cos(QB_SPIN_PH + sweep * s), rr * Math.sin(QB_SPIN_PH + sweep * s), zc], 96, C.now, 0.8 * a, 0.4 * a, 3.5);
  if (extra > 0.01) qbPath(V, s => [1.04 * rr * Math.cos(QB_SPIN_PH + extra * s), 1.04 * rr * Math.sin(QB_SPIN_PH + extra * s), zc], 96, C.mag, 0.9 * a, 0.45 * a, 3.5);
  qbVec(V, v, C.now, a, { label: 'v' });
  const turns = al / TAU;
  txt(`α = ${qbDeg(al, 0)}   ·   ${turns.toFixed(2)} turns`, 520, 860, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.now, a });
  /* dials and the rotor matrix */
  const da = a * at(S, 0, 0.6, -0.2);
  if (da > 0) {
    txt('ROTOR · R(α) PHASE α/2', 1170, 205, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.now, a: da, ls: 2 });
    txt('BLOCH VECTOR · α', 1600, 205, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: da, ls: 2 });
    qbDial(1170, 400, 140, al / 2, C.now, da, [[0, '+I₂', C.cyan], [Math.PI, '−I₂', C.mag]]);
    qbDial(1600, 400, 110, al, C.cyan, da, [[0, 'home', C.cyan]]);
    const cs = Math.cos(al / 2), sn = Math.sin(al / 2);
    txt('R(α) =', 1010, 660, { size: 30, fam: F.math, w: 700, c: C.white, a: da });
    qbMat(1130, 646, [[qbCx(cs, -sn), qbCx(0, 0)], [qbCx(0, 0), qbCx(cs, sn)]], da, { size: 24, cw: 240 });
    txt('= cos(α/2) I₂ − i sin(α/2) σz      (n̂ = z)', 1010, 760, { size: 22, fam: F.math, w: 700, c: C.dim, a: da });
    /* the two landmarks: the formula in the math face, and an ASCII stamp (the display face has no π or subscripts) */
    const m1 = Q(S, 0, 'minus one', 0.4) * (1 - at(S, 1, 0.5)), m2 = Q(S, 1, 'plus one', 0.4);
    qbRich([['R(2π) = ', C.white], ['−I₂', C.mag]], 1170, 596, { size: 40, align: 'center', a: m1 * da, ab: 2 });
    qbRich([['R(4π) = ', C.white], ['+I₂', C.cyan]], 1170, 596, { size: 40, align: 'center', a: m2 * da, ab: 2 });
    stamp('SIGN FLIP', 1610, 588, m1 * da, C.mag, 34, -0.06);
    stamp('BACK TO +1', 1610, 588, m2 * da, C.cyan, 34, -0.06);
    /* the matrices are computed; the theorem behind the sign is the fixed-plane circle case */
    const la = da * Q(S, 0, 'minus one', 0.6, 0.4);
    qbLean(1010, 830, 'circle_double_cover_history_lift', la, { size: 18 });
    txt('fixed-plane case · 固定平面情形', 1010, 866, { size: 18, fam: F.zh, w: 700, c: C.dim, a: la });
  }
};

/* ======================================================================= */
/*                              scene 5 · LEDGER                             */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 290 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const t = 41.0;
  background(t, TL.scenes[3], 3, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.3, a: 0.22, cx: 1320, cy: 400, camZ: 7, lw: 1.3, dots: false });
  const V = qbView(520, 420, 275, -2.2, 0.32);
  qbSphere(V, 1, { poles: true });
  qbRotorFigure(V, 2.35, 1, { label: 'R v R†' });
  txt(DATA.film.title_zh, 1310, 282, { size: 104, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('HALF-ANGLE ROTORS', 1310, 380, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 6 });
  txt('AND THE BLOCH SPHERE', 1310, 440, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 6 });
  qbRich([['R(2π) = ', C.white], ['−I₂', C.mag], ['   ·   R(4π) = ', C.white], ['+I₂', C.cyan]], 1310, 534, { size: 40, align: 'center', ab: 1 });
  qbRich([['p₀ = ', C.white], ['cos²(θ/2)', C.mag], ['   ·   R(α) v R(α)†', C.now]], 1310, 596, { size: 34, align: 'center' });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM ${DATA.film.number}`, 1310, 662, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  leanList(W / 2, 790, 1, { align: 'center', size: 19, gap: 36 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1000, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 3, TL.scenes[3]);
  post(3);
};
