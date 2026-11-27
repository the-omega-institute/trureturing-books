/* Film · Addition Without an Origin · 没有原点的加法 (book omega-math, chapter 4).
   Scenes for the shared engine theme/film/engine.js.

   What each scene shows, and where it rests (chapter 4, books/omega-math/zh/ch04-heaps-and-lie-triple-curvature.md):
     sum    flat points a = (4, 5), b = (6, 3), c = (3, 2) on a grid; the point O + (a − O) + (b − O) = a + b − O
            follows the origin O, while O + (a − O) − (b − O) + (c − O) = a − b + c = (1, 4) does not (computed for
            every drawn O, §4.1); |i + j|² = 2 and |[i, 1, j]|² = |k|² = 1 (computed).
     heap   [a, b, c] = a · b̄ · c on integer quaternions (§4.1); worked example [1 + i, 1 + j, k] = (1, −1, −1, 1)
            with |·|² = 4 = 2 · 2 · 1 (computed); x x̄ z = |x|² z and x z̄ z = |z|² x (computed: the heap laws
            hold exactly on unit quaternions); [i, 1, j] = k, [j, 1, i] = −k (computed) .....
            TernaryComparison.tri_eq_mul_inv_mul (LEAN: in groupAt o, [x, y, z] = x ⋆ y⁻¹ ⋆ z).
     curve  u = (1, 1, 0), v = (1, 0, 2), w = (0, 1, 1) (example ex-ch04-lie-triple-sectional-curvature):
            [u, v] = 2(u × v) = (4, −4, −2), {u, v, w} = ⟨u, w⟩v − ⟨v, w⟩u = (−1, −2, 2), the cyclic sum 0,
            ⟨{u, v, u}, v⟩ = 9 = 2 · 5 − 1² (computed) ..... lieTriple_jacobi (LEAN, all Vec3) and
            lieTriple_sectional_ratio (LEAN: ratio ≡ 1 on every nondegenerate RatVec3 plane).
     rank   κ_proj = ⟨p, q⟩² / (|p|²|q|²) = Tr P(p)P(q), Sym₄ has 4 + 6 = 10 slots (§4.3.1); the ten rays e_i,
            e_i + e_j give det G₁₀ = 1/64, adding (1, 1, 1, 1) gives det G₁₁ = 0; the five lifted spinors give
            det G₅ = 1/32, the sixth Φ(1, 1, 1, 1) gives det G₆ = 0 (computed here by exact rational elimination and
            re-checked by integer Bareiss elimination) ..... OmegaTernionHeap.quadratic_kernel (LEAN:
            κ_proj ≡ (2κ_spin − 1)² for all PythSpinor).
     walk   x₀ = e, x₁ = g = (1, 1, 1, 1; 2), x_{n+2} = [x_{n+1}, x_n, x_{n+1}] computed on PythSpinor and reduced;
            drawn on the great circle through 1 and (i + j + k)/√3 at the exact angles 60° · n (computed) .....
            TernaryComparisonReflection.reflectionSeq_eq_pow (LEAN: x_n = b^n in groupAt a, for every ternary
            comparison structure; here groupAt e is ordinary multiplication).
     spin   the rotation of g^n is 120° · n about the diagonal (computed); κ_spin(e, gⁿ) = 3/4, 1/4, 0, 1/4, 3/4, 1 and
            κ_proj = 1/4, 1/4, 1, 1/4, 1/4, 1 (computed) ..... OmegaComposeAndWitnesses.g120_spin_six_beat_orbit
            (LEAN: the six signed powers and κ_spin(e, g³) ≡ 0, κ_spin(e, g⁶) ≡ 1).
     hopf   on real unit quaternions (§4.4): R(e, g) = (1/2)² + (−1/2)² = 1/2, h(e) = i, h(g) = g i ḡ = j,
            (1 + ⟨i, j⟩)/2 = 1/2 (computed) ..... QuaternionRayKernel.rayKernel_eq_hopf (LEAN); the pair (e, g) is
            carried onto (e, ½(1, 1, −1, −1)) by p = i, q = −i, both with κ = 3/4 (computed) .....
            QuaternionTwoPointHomogeneity.exists_mul_mul_eq_of_kappa_eq (LEAN). "No point is special" is the
            chapter's reading of homogeneity (argued).

   On load, FILM.init checks DATA.lean against the cited theorems and re-derives every number on screen by an
   independent route; any disagreement goes to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const AK_P = 'D5/S3/Quantum/AURICOmega/';
const AK_LEAN = {
  tri: [AK_P + 'TernaryComparisonGroup.TernaryComparison.tri_eq_mul_inv_mul', 'tri_eq_mul_inv_mul'],
  refl: [AK_P + 'TernaryComparisonReflection.reflectionSeq_eq_pow', 'reflectionSeq_eq_pow'],
  jacobi: [AK_P + 'OmegaLieTripleAndFreeGroup.lieTriple_jacobi', 'lieTriple_jacobi'],
  ratio: [AK_P + 'OmegaLieTripleAndFreeGroup.lieTriple_sectional_ratio', 'lieTriple_sectional_ratio'],
  bridge: [AK_P + 'OmegaTernionHeap.quadratic_kernel', 'quadratic_kernel'],
  orbit: [AK_P + 'OmegaComposeAndWitnesses.g120_spin_six_beat_orbit', 'g120_spin_six_beat_orbit'],
  hopf: [AK_P + 'QuaternionRayKernel.rayKernel_eq_hopf', 'rayKernel_eq_hopf'],
  homog: [AK_P + 'QuaternionTwoPointHomogeneity.exists_mul_mul_eq_of_kappa_eq', 'exists_mul_mul_eq_of_kappa_eq']
};

/* exact fractions [n, d], d > 0, in lowest terms */
const akG = (a, b) => (b ? akG(b, a % b) : Math.abs(a));
const fr = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = akG(n, d) || 1; return [n / g, d / g]; };
const fAdd = (a, b) => fr(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const fSub = (a, b) => fr(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
const fMul = (a, b) => fr(a[0] * b[0], a[1] * b[1]);
const fDiv = (a, b) => fr(a[0] * b[1], a[1] * b[0]);
const fEq = (a, b) => a[0] * b[1] === b[0] * a[1];
const fStr = a => (a[1] === 1 ? String(a[0]).replace('-', '−') : `${a[0] < 0 ? '−' : ''}${Math.abs(a[0])}/${a[1]}`);
const sgn = x => (x < 0 ? '−' + (-x) : String(x));
const vStr = v => '(' + v.map(sgn).join(', ') + ')';

/* quaternions [w, x, y, z] = w + x i + y j + z k */
const qMul = (a, b) => [
  a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
  a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
  a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
  a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
const qConj = a => [a[0], -a[1], -a[2], -a[3]];
const qN2 = a => a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3];
const qDot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
const qTri = (a, b, c) => qMul(qMul(a, qConj(b)), c);
const Q1 = [1, 0, 0, 0], QI = [0, 1, 0, 0], QJ = [0, 0, 1, 0], QK = [0, 0, 0, 1];

/* PythSpinor (p; r): integer numerator, positive radius, |p|² = r²; reduce divides by the positive gcd of all five */
const spRed = (p, r) => { const g = [...p, r].reduce((s, c) => akG(s, c), 0); return { p: p.map(c => c / g), r: r / g }; };
const spTri = (a, b, c) => spRed(qTri(a.p, b.p, c.p), a.r * b.r * c.r);
const spMul = (a, b) => spRed(qMul(a.p, b.p), a.r * b.r);
const spKs = (a, b) => fr(a.r * b.r + qDot(a.p, b.p), 2 * a.r * b.r);
const spKp = (a, b) => fr(qDot(a.p, b.p) ** 2, qN2(a.p) * qN2(b.p));
const spStr = s => `(${s.p.map(sgn).join(', ')}; ${s.r})`;
const SP_E = { p: [1, 0, 0, 0], r: 1 }, SP_G = { p: [1, 1, 1, 1], r: 2 };
/* the stereographic Cayley lift Φ(a, b, c, d) = reduce(a² − s, 2ab, 2ac, 2ad; a² + s) */
const spLift = (a, b, c, d) => { const s = b * b + c * c + d * d; return spRed([a * a - s, 2 * a * b, 2 * a * c, 2 * a * d], a * a + s); };

/* scene 1: the flat points and the wandering origin (lattice points, so every readout is an integer) */
const SUM = { a: [4, 5], b: [6, 3], c: [3, 2], O: [[2, 1], [3, 1], [3, 2], [1, 2], [1, 1], [2, 1]] };
const sumPt = O => [SUM.a[0] + SUM.b[0] - O[0], SUM.a[1] + SUM.b[1] - O[1]];
const heapPt = O => [O[0] + (SUM.a[0] - O[0]) - (SUM.b[0] - O[0]) + (SUM.c[0] - O[0]), O[1] + (SUM.a[1] - O[1]) - (SUM.b[1] - O[1]) + (SUM.c[1] - O[1])];

/* scene 2: the worked bracket */
const HP = { a: [1, 1, 0, 0], b: [1, 0, 1, 0], c: [0, 0, 0, 1] };
HP.t = qTri(HP.a, HP.b, HP.c);

/* scene 3: the Lie triple example */
const d3 = (p, q) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2];
const cr3 = (p, q) => [p[1] * q[2] - p[2] * q[1], p[2] * q[0] - p[0] * q[2], p[0] * q[1] - p[1] * q[0]];
const lt = (u, v, w) => v.map((x, i) => d3(u, w) * x - d3(v, w) * u[i]);
const LT = { u: [1, 1, 0], v: [1, 0, 2], w: [0, 1, 1] };
LT.com = cr3(LT.u, LT.v).map(c => 2 * c);
LT.uvw = lt(LT.u, LT.v, LT.w); LT.vwu = lt(LT.v, LT.w, LT.u); LT.wuv = lt(LT.w, LT.u, LT.v);
LT.sum = LT.uvw.map((c, i) => c + LT.vwu[i] + LT.wuv[i]);
LT.uvu = lt(LT.u, LT.v, LT.u);
LT.num = d3(LT.uvu, LT.v);
LT.area = d3(LT.u, LT.u) * d3(LT.v, LT.v) - d3(LT.u, LT.v) ** 2;

/* scene 4: Gram matrices, exact */
const RAYS = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1],
  [1, 1, 0, 0], [1, 0, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0], [0, 1, 0, 1], [0, 0, 1, 1], [1, 1, 1, 1]];
const SPINS = [spLift(1, 0, 0, 0), spLift(1, 1, 0, 0), spLift(1, 0, 1, 0), spLift(1, 0, 0, 1), spLift(3, 1, 1, 1), spLift(1, 1, 1, 1)];
const gram = (xs, k) => xs.map(x => xs.map(y => k(x, y)));
/* rational Gaussian elimination: determinant and leading principal minors */
function detMinors(M) {
  const n = M.length, A = M.map(r => r.slice()); let det = fr(1), mins = [];
  for (let i = 0; i < n; i++) {
    let piv = i; while (piv < n && A[piv][i][0] === 0) piv++;
    if (piv === n) { mins.push(fr(0)); det = fr(0); for (let k = i + 1; k < n; k++) mins.push(null); break; }
    if (piv !== i) { [A[i], A[piv]] = [A[piv], A[i]]; det = fMul(det, fr(-1)); }
    det = fMul(det, A[i][i]); mins.push(det);
    for (let r = i + 1; r < n; r++) {
      const f = fDiv(A[r][i], A[i][i]);
      if (f[0]) for (let c = i; c < n; c++) A[r][c] = fSub(A[r][c], fMul(f, A[i][c]));
    }
  }
  return { det, mins };
}
const GP = gram(RAYS, (p, q) => fr(qDot(p, q) ** 2, qN2(p) * qN2(q)));
const GS = gram(SPINS, spKs);
const GP10 = detMinors(GP.slice(0, 10).map(r => r.slice(0, 10))), GP11 = detMinors(GP);
const GS5 = detMinors(GS.slice(0, 5).map(r => r.slice(0, 5))), GS6 = detMinors(GS);

/* scene 5: the reflection walk x₀ = e, x₁ = g, x_{n+2} = [x_{n+1}, x_n, x_{n+1}] */
const WALK = [SP_E, SP_G];
for (let n = 2; n <= 6; n++) WALK.push(spTri(WALK[n - 1], WALK[n - 2], WALK[n - 1]));
const POW = [SP_E]; for (let n = 1; n <= 6; n++) POW.push(spMul(POW[n - 1], SP_G));

/* scene 6: kernels along the orbit */
const ORB = POW.slice(1).map(s => ({ s, ks: spKs(SP_E, s), kp: spKp(SP_E, s) }));

/* scene 7: Hopf, on unit quaternions g = ½(1, 1, 1, 1) */
const HQ_G = [1, 1, 1, 1].map(c => c / 2);
const hopfImg = x => qMul(qMul(x, QI), qConj(x)).slice(1);
const HO = {
  k1: qDot(Q1, HQ_G), k2: qDot(Q1, qMul(HQ_G, QI)),
  he: hopfImg(Q1), hg: hopfImg(HQ_G),
  p: QI, q: [0, -1, 0, 0]
};
HO.R = HO.k1 ** 2 + HO.k2 ** 2;
HO.y2 = qMul(qMul(HO.p, HQ_G), HO.q);
HO.x2 = qMul(qMul(HO.p, Q1), HO.q);

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('addition-without-an-origin film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const same = (x, y) => x.length === y.length && x.every((c, i) => Math.abs(c - y[i]) < 1e-12);

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(AK_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(AK_LEAN).length}`);
  for (const [gid, short] of Object.values(AK_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short || (r.name || '').endsWith('.' + short), `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. SUM: the sum follows the origin, the heap point does not (vector route: positions relative to O) */
  const rel = (P, O) => [P[0] - O[0], P[1] - O[1]];
  const outs = new Set();
  for (const O of SUM.O) {
    const A = rel(SUM.a, O), B = rel(SUM.b, O), Cc = rel(SUM.c, O);
    const s = [O[0] + A[0] + B[0], O[1] + A[1] + B[1]], h = [O[0] + A[0] - B[0] + Cc[0], O[1] + A[1] - B[1] + Cc[1]];
    check(same(s, sumPt(O)), `a + b from O = ${O}`);
    check(same(h, [1, 4]) && same(heapPt(O), [1, 4]), `a − b + c from O = ${O}`);
    outs.add(s.join());
  }
  check(outs.size === 5, 'the drawn origins give five different points a + b');
  check(qN2([0, 1, 1, 0]) === 2 && same(qTri(QI, Q1, QJ), QK), '|i + j|² = 2, [i, 1, j] = k');

  /* 2. HEAP: the worked bracket, norm multiplicativity, the laws, order */
  check(same(HP.t, [1, -1, -1, 1]), '[1 + i, 1 + j, k] = (1, −1, −1, 1)');
  check(qN2(HP.t) === qN2(HP.a) * qN2(HP.b) * qN2(HP.c) && qN2(HP.t) === 4, '|a b̄ c|² = 4 = 2 · 2 · 1');
  for (let t = 0; t < 20; t++) {
    const x = [0, 1, 2, 3].map(i => Math.floor(rnd(t, i) * 7) - 3), z = [0, 1, 2, 3].map(i => Math.floor(rnd(t, i + 9) * 7) - 3);
    check(same(qTri(x, x, z), z.map(c => c * qN2(x))) && same(qTri(x, z, z), x.map(c => c * qN2(z))), `heap laws up to |·|², sample ${t}`);
  }
  check(same(qTri(QJ, Q1, QI), [0, 0, 0, -1]), '[j, 1, i] = −k');

  /* 3. CURVE: cross-product route for every bracket */
  check(same(LT.com, [4, -4, -2]) && d3(LT.com, LT.u) === 0 && d3(LT.com, LT.v) === 0, '[u, v] = (4, −4, −2) ⊥ u, v');
  check(same(LT.uvw, [-1, -2, 2]) && same(cr3(cr3(LT.u, LT.v), LT.w), LT.uvw), '{u, v, w} = (u × v) × w = (−1, −2, 2)');
  check(same(LT.uvw, cr3(LT.com, LT.w).map(c => c / 2)), '{u, v, w} = ¼[[u, v], w]  ([a, b] = 2a × b)');
  check(same(LT.vwu, [-1, 1, -1]) && same(LT.wuv, [2, 1, -1]) && same(LT.sum, [0, 0, 0]), 'Bianchi: the cyclic sum is 0');
  check(same(LT.uvu, [1, -1, 4]) && LT.num === 9 && LT.area === 9, '⟨{u, v, u}, v⟩ = 9 = 2 · 5 − 1');

  /* 4. RANK: Gram determinants, by integer Bareiss elimination on scaled matrices */
  function bareiss(M) {
    const n = M.length, A = M.map(r => r.slice()); let sign = 1, prev = 1;
    for (let k = 0; k < n - 1; k++) {
      if (A[k][k] === 0) { let s = k + 1; while (s < n && A[s][k] === 0) s++; if (s === n) return 0; [A[k], A[s]] = [A[s], A[k]]; sign = -sign; }
      for (let i = k + 1; i < n; i++) for (let j = k + 1; j < n; j++) A[i][j] = (A[i][j] * A[k][k] - A[i][k] * A[k][j]) / prev;
      prev = A[k][k];
    }
    return sign * A[n - 1][n - 1];
  }
  /* trace route for κ_proj: Tr(P(p) P(q)) with P = p pᵀ / |p|² */
  const tr = (p, q) => { let s = 0; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) s += p[i] * p[j] * q[j] * q[i]; return s / (qN2(p) * qN2(q)); };
  RAYS.forEach((p, i) => RAYS.forEach((q, j) => check(Math.abs(tr(p, q) - GP[i][j][0] / GP[i][j][1]) < 1e-12, `Tr P P at ${i}, ${j}`)));
  const sc = (M, s) => M.map(r => r.map(x => Math.round(x[0] * s / x[1])));
  const p10 = bareiss(sc(GP.slice(0, 10).map(r => r.slice(0, 10)), 4)), p11 = bareiss(sc(GP, 4));
  check(p10 === Math.pow(4, 10) / 64 && fEq(GP10.det, fr(1, 64)), `det G₁₀ = 1/64 (${p10} / 4¹⁰)`);
  check(p11 === 0 && GP11.det[0] === 0, 'det G₁₁ = 0');
  const mp = [1, 1, 1, 1, 2, 4, 8, 16, 32, 64].map(d => fr(1, d));
  check(GP10.mins.every((m, i) => fEq(m, mp[i])), 'leading minors 1, 1, 1, 1, 1/2, …, 1/64');
  check(spStr(SPINS[4]) === '(1, 1, 1, 1; 2)' && spStr(SPINS[5]) === '(−1, 1, 1, 1; 2)', 'Φ(3, 1, 1, 1), Φ(1, 1, 1, 1)');
  SPINS.forEach((s, i) => check(qN2(s.p) === s.r * s.r, `lifted spinor ${i} lies on S³(Q)`));
  const s5 = bareiss(sc(GS.slice(0, 5).map(r => r.slice(0, 5)), 4)), s6 = bareiss(sc(GS, 4));
  check(s5 === Math.pow(4, 5) / 32 && fEq(GS5.det, fr(1, 32)), `det G₅ = 1/32 (${s5} / 4⁵)`);
  check(s6 === 0 && GS6.det[0] === 0, 'det G₆ = 0');
  const ms = [fr(1), fr(3, 4), fr(1, 2), fr(5, 16), fr(1, 32)];
  check(GS5.mins.every((m, i) => fEq(m, ms[i])), 'spinor minors 1, 3/4, 1/2, 5/16, 1/32');
  /* the bridge on random Pythagorean spinors from the lift */
  for (let t = 0; t < 20; t++) {
    const A = spLift(...[0, 1, 2, 3].map(i => Math.floor(rnd(t, i) * 9) - 4 || 1)), B = spLift(...[0, 1, 2, 3].map(i => Math.floor(rnd(t, i + 5) * 9) - 4 || 2));
    const ks = spKs(A, B), lhs = spKp(A, B), rhs = fMul(fSub(fMul(fr(2), ks), fr(1)), fSub(fMul(fr(2), ks), fr(1)));
    check(fEq(lhs, rhs), `κ_proj = (2κ_spin − 1)², sample ${t}`);
  }

  /* 5. WALK = powers */
  check(WALK.every((s, n) => spStr(s) === spStr(POW[n])), 'reflection walk x_n = gⁿ');
  const expect = ['(1, 0, 0, 0; 1)', '(1, 1, 1, 1; 2)', '(−1, 1, 1, 1; 2)', '(−1, 0, 0, 0; 1)', '(−1, −1, −1, −1; 2)', '(1, −1, −1, −1; 2)', '(1, 0, 0, 0; 1)'];
  check(POW.every((s, n) => spStr(s) === expect[n]), 'the six beats as in the chapter table');
  POW.forEach((s, n) => check(Math.abs(s.p[0] / s.r - Math.cos(n * Math.PI / 3)) < 1e-12, `beat ${n} sits at 60° · n`));

  /* 6. SPIN: kernels per beat, rotation angle per beat */
  const KS = [[3, 4], [1, 4], [0, 1], [1, 4], [3, 4], [1, 1]], KP = [[1, 4], [1, 4], [1, 1], [1, 4], [1, 4], [1, 1]];
  ORB.forEach((o, i) => { check(fEq(o.ks, KS[i]) && fEq(o.kp, KP[i]), `κ at beat ${i + 1}`); check(fEq(o.kp, fMul(fSub(fMul(fr(2), o.ks), fr(1)), fSub(fMul(fr(2), o.ks), fr(1)))), `bridge at beat ${i + 1}`); });
  {
    /* g rotates i → j → k: a turn of 120° about (1, 1, 1) */
    const rot = x => qMul(qMul(HQ_G, [0, ...x]), qConj(HQ_G)).slice(1);
    check(same(rot([1, 0, 0]), [0, 1, 0]) && same(rot([0, 1, 0]), [0, 0, 1]) && same(rot([1, 1, 1]), [1, 1, 1]), 'g turns space 120° about the diagonal');
  }

  /* 7. HOPF */
  check(Math.abs(HO.k1 - 0.5) < 1e-12 && Math.abs(HO.k2 + 0.5) < 1e-12 && Math.abs(HO.R - 0.5) < 1e-12, 'R(e, g) = 1/4 + 1/4 = 1/2');
  check(same(HO.he, [1, 0, 0]) && same(HO.hg, [0, 1, 0]) && Math.abs((1 + d3(HO.he, HO.hg)) / 2 - HO.R) < 1e-12, 'h(e) = i, h(g) = j, (1 + 0)/2 = R');
  check(same(HO.x2, Q1) && same(HO.y2, [0.5, 0.5, -0.5, -0.5]), 'i · e · (−i) = e, i · g · (−i) = ½(1, 1, −1, −1)');
  check(Math.abs(qDot(HO.x2, HO.y2) - qDot(Q1, HQ_G)) < 1e-12, 'the carried pair keeps κ = 3/4');
});
Object.assign(FILM.speed, { sum: 0.02, heap: 0.014, curve: 0.014, rank: 0.016, walk: 0.016, spin: 0.018, hopf: 0.014, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const akFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function rich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  const tot = parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0);
  if (o.align === 'center') cx = x - tot / 2;
  else if (o.align === 'right') cx = x - tot;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a }); cx += tw(s, size, fam, w); }
  return cx;
}
const AK_MISSING = new Set();
function akLean(x, y, key, a, o = {}) {
  if (a <= 0.003) return x;
  const [gid, label] = AK_LEAN[key], r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!AK_MISSING.has(gid)) { AK_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return x;
  }
  const size = o.size || 19, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(label, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  return x + wh + 12 + tw(label, size, F.mono, 700);
}
function poly(pts, col, a, fill = 0.2, lw = 2) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.beginPath();
  pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath();
  if (fill) { ctx.fillStyle = rgba(col, fill); ctx.fill(); }
  if (lw) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); }
  ctx.restore();
}
/* orthographic view: yaw about the vertical axis, then pitch; returns [sx, sy, depth] */
function view(cx, cy, s, yaw, pitch) {
  return v => {
    const x1 = v[0] * Math.cos(yaw) - v[1] * Math.sin(yaw), y1 = v[0] * Math.sin(yaw) + v[1] * Math.cos(yaw), z1 = v[2];
    return [cx + s * x1, cy - s * (z1 * Math.cos(pitch) - y1 * Math.sin(pitch)), y1 * Math.cos(pitch) + z1 * Math.sin(pitch)];
  };
}
/* a label just beyond the tip of a segment, away from its foot */
function tipTag(o, p, s, col, al, size = 26, off = 26) {
  const dx = p[0] - o[0], dy = p[1] - o[1], n = Math.hypot(dx, dy) || 1;
  txt(s, p[0] + dx / n * off, p[1] + dy / n * off + size * 0.35, { size, fam: F.math, w: 700, align: dx > 4 ? 'left' : dx < -4 ? 'right' : 'center', c: col, a: al });
}
const SUP = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶'], SUB = ['₀', '₁', '₂', '₃', '₄', '₅', '₆'];

function akTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.3) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.4);
  txt(`${DATA.book.code} · FILM`, W / 2, 360, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 500, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('ADDITION WITHOUT AN ORIGIN', p, 5), W / 2, 600, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('HEAP · LIE TRIPLE · RANK 10 / 5 · 720° · HOPF', W / 2, 680, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 5 });
}

/* ======================================================================= */
/*                     scene 1 · A SUM NEEDS AN ORIGIN                       */
/* ======================================================================= */
SCENES.sum = S => {
  const u = S.u;
  akTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* the flat sheet */
  panel(130, 190, 800, 640, a, C.cyan, 'FLAT PAPER · 平面');
  const gx = 205, gy = 770, k = 60;
  const P = q => [gx + q[0] * k, gy - q[1] * k];
  for (let i = 0; i <= 11; i++) line(gx + i * k, gy, gx + i * k, gy - 8 * k, C.dim, a * 0.16, 1);
  for (let j = 0; j <= 8; j++) line(gx, gy - j * k, gx + 11 * k, gy - j * k, C.dim, a * 0.16, 1);
  /* the origin hops through the lattice points of SUM.O while line 1 is spoken */
  const hop = clamp((u - phraseAt(S, 1, 'Move the origin')) / 0.75, 0, SUM.O.length - 1);
  const i0 = Math.floor(hop), i1 = Math.min(i0 + 1, SUM.O.length - 1), f = ease(clamp((hop - i0) * 2.2));
  const O = [lerp(SUM.O[i0][0], SUM.O[i1][0], f), lerp(SUM.O[i0][1], SUM.O[i1][1], f)];
  const On = f > 0.5 ? SUM.O[i1] : SUM.O[i0];
  const Op = P(O), pa = P(SUM.a), pb = P(SUM.b), pc = P(SUM.c);
  const ls = at(S, 0, 0.6), l1 = at(S, 1, 0.6), l2 = at(S, 2, 0.6);
  /* position arrows from O */
  for (const q of [pa, pb]) arrow(Op[0], Op[1], q[0], q[1], C.dim, a * ls * 0.8, 2);
  ring(Op[0], Op[1], 14, C.now, a * ls, 3);
  txt('O', Op[0] - 22, Op[1] + 30, { size: 28, fam: F.math, w: 700, align: 'right', c: C.now, a: a * ls });
  /* a + b measured from O: O + (a − O) + (b − O) */
  const sp = P([SUM.a[0] + SUM.b[0] - O[0], SUM.a[1] + SUM.b[1] - O[1]]);
  const sa = a * ls;
  ctx.save(); ctx.setLineDash([8, 7]); arrow(pa[0], pa[1], sp[0], sp[1], C.mag, sa * 0.8, 2.5); ctx.restore();
  dot(sp[0], sp[1], 13, 'm', sa);
  txt('a + b', sp[0] + 18, sp[1] - 12, { size: 28, fam: F.math, w: 700, c: C.mag, a: sa });
  /* a − b + c: the step b → a, repeated from c */
  const ha = a * l2, hp = P(heapPt(O));
  if (ha > 0.003) {
    arrow(pb[0], pb[1], pa[0], pa[1], C.cyan, ha, 3.5);
    ctx.save(); ctx.setLineDash([10, 7]); arrow(pc[0], pc[1], hp[0], hp[1], C.cyan, ha * Q(S, 2, 'repeated from c', 0.8), 3.5); ctx.restore();
    dot(hp[0], hp[1], 14, 'c', ha);
    txt('a − b + c', hp[0] - 10, hp[1] - 26, { size: 28, fam: F.math, w: 700, c: C.cyan, a: ha });
  }
  for (const [q, nm] of [[pa, 'a'], [pb, 'b'], [pc, 'c']]) {
    if (nm === 'c' && l2 <= 0.003) continue;
    const off = nm === 'a' ? [-34, -10] : [16, 34];
    dot(q[0], q[1], 11, 'w', a * (nm === 'c' ? l2 : 1)); txt(nm, q[0] + off[0], q[1] + off[1], { size: 30, fam: F.math, w: 700, c: C.white, a: a * (nm === 'c' ? l2 : 1) });
  }
  /* the ledger */
  panel(990, 190, 800, 300, a, C.cyan, 'LEDGER · 账本');
  rich([['a = (4, 5)   b = (6, 3)   c = (3, 2)', C.white]], 1020, 265, { size: 30, a });
  rich([['O = ', C.now], [vStr(On), C.now]], 1020, 330, { size: 32, a: a * ls });
  rich([['a + b  (from O)  = ', C.white], [vStr(sumPt(On)), C.mag]], 1020, 390, { size: 32, a: a * l1 });
  rich([['a − b + c  (from O)  = ', C.white], [vStr(heapPt(On)), C.cyan]], 1020, 450, { size: 32, a: a * l2 });
  /* the unit circle in the (i, j) plane: i + j pokes out */
  const ca = a * at(S, 3, 0.6);
  panel(990, 520, 800, 310, ca, C.mag, 'UNIT SPHERE · 单位球面');
  if (ca > 0.003) {
    const cx = 1160, cy = 700, R = 105;
    ring(cx, cy, R, C.cyan, ca * 0.8, 2);
    line(cx - R - 20, cy, cx + R + 60, cy, C.dim, ca * 0.5, 1); line(cx, cy + R + 10, cx, cy - R - 20, C.dim, ca * 0.5, 1);
    const pi = [cx + R, cy], pj = [cx, cy - R], pij = [cx + R, cy - R];
    arrow(cx, cy, pi[0], pi[1], C.white, ca, 3); arrow(cx, cy, pj[0], pj[1], C.white, ca, 3);
    txt('i', pi[0] + 10, pi[1] + 28, { size: 28, fam: F.math, w: 700, c: C.white, a: ca });
    txt('j', pj[0] - 34, pj[1] + 30, { size: 28, fam: F.math, w: 700, c: C.white, a: ca });
    const pk = Q(S, 3, 'pokes out', 0.6);
    arrow(cx, cy, pij[0], pij[1], C.mag, ca * pk, 3.5); dot(pij[0], pij[1], 12, 'm', ca * pk);
    txt('i + j', pij[0] + 16, pij[1] - 4, { size: 26, fam: F.math, w: 700, c: C.mag, a: ca * pk });
    const q2 = Q(S, 3, 'squared length is two', 0.6);
    rich([['|i + j|² = ', C.white], ['2', C.mag], ['  ≠ 1', C.white]], 1360, 650, { size: 32, a: ca * q2 });
    rich([['off the sphere · 刺破球壳', C.mag]], 1360, 700, { size: 24, fam: F.zh, a: ca * q2 });
    rich([['[i, 1, j] = i · 1̄ · j = k,  |k|² = 1', C.cyan]], 1360, 770, { size: 24, a: ca * q2 });
  }
};

/* ======================================================================= */
/*                             scene 2 · THE HEAP                            */
/* ======================================================================= */
SCENES.heap = S => {
  const a = akFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean']]);
  /* left: the i → j → k cycle */
  panel(130, 190, 760, 640, a, C.cyan, 'ORDER · 次序 · ij = k, ji = −k');
  const cx = 510, cy = 470, R = 165, an = [-Math.PI / 2, -Math.PI / 2 + TAU / 3, -Math.PI / 2 + 2 * TAU / 3];
  const pts = an.map(t => [cx + R * Math.cos(t), cy + R * Math.sin(t)]);
  ring(cx, cy, R, C.dim, a * 0.4, 1.5);
  const oa = a * at(S, 1, 0.6), ob = a * Q(S, 1, 'but j, one, i', 0.6);
  for (let k = 0; k < 3; k++) {
    const t0 = an[k] + 0.32, t1 = an[k] + TAU / 3 - 0.32;
    ctx.save(); ctx.globalAlpha = a * (0.4 + 0.6 * oa); ctx.strokeStyle = C.cyan; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, R, t0, t1); ctx.stroke(); ctx.restore();
    const e = [cx + R * Math.cos(t1), cy + R * Math.sin(t1)], d = [-Math.sin(t1), Math.cos(t1)];
    arrow(e[0] - d[0] * 18, e[1] - d[1] * 18, e[0], e[1], C.cyan, a * (0.4 + 0.6 * oa), 4);
  }
  ['i', 'j', 'k'].forEach((n, k) => { chip(pts[k][0], pts[k][1], 74, 64, n, C.white, a, 36, F.math); });
  rich([['i · j = ', C.white], ['+k', C.cyan]], cx, cy + 4, { size: 34, align: 'center', a: oa });
  rich([['j · i = ', C.white], ['−k', C.mag]], cx, cy + 50, { size: 34, align: 'center', a: ob });
  txt('along the arrows: +  ·  against them: −', cx, 760, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: oa });
  txt('顺着箭头为正，逆着为负', cx, 796, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: oa });

  /* right column */
  const X0 = 960, r0 = a * at(S, 0, 0.6);
  panel(X0 - 20, 190, 860, 640, a, C.cyan, 'THE HEAP · 流群');
  rich([['[a, b, c] := a · b̄ · c', C.white]], X0 + 10, 272, { size: 46, a: r0 });
  const e0 = a * Q(S, 0, 'in whole numbers', 0.6);
  rich([['[1 + i, 1 + j, k] = ', C.white], [vStr(HP.t), C.cyan]], X0 + 10, 335, { size: 28, a: e0 });
  rich([['|·|² = ' + qN2(HP.t) + ' = ' + qN2(HP.a) + ' · ' + qN2(HP.b) + ' · ' + qN2(HP.c), C.white], ['   never 0 · 永不为零', C.dim]], X0 + 10, 380, { size: 24, a: e0 });
  const r1 = a * Q(S, 0, 'with x, x, z', 0.6);
  rich([['[x, x, z] = |x|² z', C.white]], X0 + 10, 450, { size: 30, a: r1 });
  rich([['[x, z, z] = |z|² x', C.white]], X0 + 430, 450, { size: 30, a: r1 * Q(S, 0, 'giving z', 0.5, 0.4) });
  txt('|x| = |z| = 1: exactly z and x · 单位四元数上恰为 z 与 x', X0 + 10, 490, { size: 20, fam: F.zh, w: 700, c: C.dim, a: r1 });
  const r2 = a * at(S, 1, 0.6);
  rich([['[i, 1, j] = ', C.white], ['k', C.cyan], ['     [j, 1, i] = ', C.white], ['−k', C.mag]], X0 + 10, 555, { size: 30, a: r2 });
  /* line 3: home o */
  const r3 = a * at(S, 2, 0.6);
  if (r3 > 0.003) {
    rich([['x ⋆ₒ z := [x, o, z]     x⁻¹ := [o, x, o]', C.white]], X0 + 10, 620, { size: 26, a: r3 });
    rich([['[x, y, z] = x ⋆ₒ y⁻¹ ⋆ₒ z', C.now]], X0 + 10, 680, { size: 38, a: a * Q(S, 2, 'the bracket splits', 0.6) });
    akLean(X0 + 10, 740, 'tri', a * Q(S, 2, 'Lean checks', 0.6));
    txt('for every home o, in every heap · 对任意基点、任意流群', X0 + 10, 785, { size: 20, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 2, 'Lean checks', 0.6) });
    /* the home ring hops: any point can be home */
    const hk = Math.floor(Math.max(0, u - lineAt(S, 2).s) / 1.1) % 3;
    ring(pts[hk][0], pts[hk][1], 52, C.now, r3, 3);
    txt('o', pts[hk][0] + 50, pts[hk][1] - 34, { size: 30, fam: F.math, w: 700, c: C.now, a: r3 });
  }
};

/* ======================================================================= */
/*                      scene 3 · RELATION OF RELATIONS                      */
/* ======================================================================= */
SCENES.curve = S => {
  const a = akFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'computed'], [4, 'Lean checks', 'lean']]);
  panel(130, 190, 740, 640, a, C.cyan, 'TANGENT SPACE · 切空间 ℚ³');
  const V = view(490, 540, 80, 1.9 + 0.004 * u, 0.45);
  const o = V([0, 0, 0]);
  [[[3.2, 0, 0], 'x'], [[0, 3.2, 0], 'y'], [[0, 0, 3.6], 'z']].forEach(([e, n]) => {
    const p0 = V(e.map(c => -c * 0.6)), p1 = V(e);
    line(p0[0], p0[1], p1[0], p1[1], C.dim, a * 0.5, 1.4); tipTag(o, p1, n, C.dim, a * 0.8, 22, 12);
  });
  const vec = (v, col, al, lab, lw = 4) => { if (al <= 0.003) return; const p = V(v); arrow(o[0], o[1], p[0], p[1], col, al, lw); tipTag(o, p, lab, col, al, 26, 18); };
  const l0 = a * at(S, 0, 0.6);
  vec(LT.u, C.cyan, l0, 'u'); vec(LT.v, C.cyan, l0, 'v');
  /* u × v = ½[u, v]: the commutator direction, perpendicular to both */
  const cm = a * Q(S, 0, 'the commutator', 0.6);
  if (cm > 0.003) {
    poly([o, V(LT.u), V(LT.u.map((c, i) => c + LT.v[i])), V(LT.v)], C.mag, cm * 0.8, 0.14, 1.2);
    vec(LT.com.map(c => c / 2), C.mag, cm, '½[u, v]');
  }
  const l1 = a * at(S, 1, 0.6);
  vec(LT.w, C.white, l1, 'w', 3);
  const b1 = a * Q(S, 1, 'the Lie triple bracket', 0.6) * (1 - at(S, 3, 0.6));
  vec(LT.uvw, C.now, b1, '{u, v, w}');
  const l3 = a * at(S, 3, 0.6);
  vec(LT.uvu, C.now, l3, '{u, v, u}');

  /* the ledger */
  const X0 = 930;
  panel(X0 - 20, 190, 880, 640, a, C.cyan, 'RELATION OF RELATIONS · 关系之关系');
  rich([['u = (1, 1, 0)   v = (1, 0, 2)', C.cyan], ['   w = (0, 1, 1)', C.white]], X0 + 10, 262, { size: 28, a: l0 });
  rich([['[u, v] = uv − vu = 2 u × v = ', C.white], [vStr(LT.com), C.mag]], X0 + 10, 318, { size: 28, a: cm });
  txt('⊥ u and v: ⟨[u, v], u⟩ = ⟨[u, v], v⟩ = 0 · 与 u、v 都垂直', X0 + 10, 354, { size: 20, fam: F.zh, w: 700, c: C.dim, a: cm });
  rich([['{u, v, w} := ¼[[u, v], w] = ⟨u, w⟩v − ⟨v, w⟩u', C.white]], X0 + 10, 410, { size: 26, a: l1 });
  rich([['         = 1·v − 2·u = ', C.white], [vStr(LT.uvw), C.now]], X0 + 10, 452, { size: 28, a: a * Q(S, 1, 'the Lie triple bracket', 0.6) });
  const l2 = a * at(S, 2, 0.6);
  rich([['{v, w, u} = ' + vStr(LT.vwu) + '   {w, u, v} = ' + vStr(LT.wuv), C.white]], X0 + 10, 510, { size: 24, a: l2 });
  rich([['sum = ', C.white], [vStr(LT.sum), C.now], ['   Bianchi · 比安基', C.dim]], X0 + 10, 552, { size: 28, a: a * Q(S, 2, 'zero', 0.5) });
  akLean(X0 + 10, 596, 'jacobi', a * Q(S, 2, 'Lean checks', 0.6), { size: 18 });
  rich([['{u, v, u} = ' + vStr(LT.uvu) + ',  ⟨{u, v, u}, v⟩ = ', C.white], [String(LT.num), C.now]], X0 + 10, 660, { size: 26, a: l3 });
  rich([['|u|²|v|² − ⟨u, v⟩² = 2·5 − 1² = ', C.white], [String(LT.area), C.mag]], X0 + 10, 700, { size: 26, a: a * Q(S, 3, 'the squared area', 0.5) });
  const l4 = a * at(S, 4, 0.6);
  rich([['K = 9/9 = ', C.white], ['1', C.lean]], X0 + 10, 760, { size: 36, a: l4 });
  akLean(X0 + 270, 755, 'ratio', a * Q(S, 4, 'every nondegenerate rational plane', 0.6), { size: 18 });
  txt('every nondegenerate rational plane · no charts · 不用坐标卡', X0 + 10, 806, { size: 20, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 4, 'curvature exactly one', 0.6) });
};

/* ======================================================================= */
/*                           scene 4 · TEN VERSUS FIVE                       */
/* ======================================================================= */
function gramGrid(G, n, x, y, cs, col, a, extra = 0) {
  if (a <= 0.003) return;
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const v = G[i][j][0] / G[i][j][1], ex = (i >= n - extra || j >= n - extra);
    fillBox(x + j * cs + 1, y + i * cs + 1, cs - 2, cs - 2, ex ? C.now : col, a * (0.06 + 0.8 * v) * (ex ? 0.9 : 1));
  }
  box(x, y, n * cs, n * cs, C.white, a * 0.6, 1.2);
}
SCENES.rank = S => {
  const a = akFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* left: the projective ray layer */
  panel(130, 190, 800, 540, a, C.cyan, 'RAYS · 射线 · κ_proj');
  const l0 = a * at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (l0 > 0.003) {
    const x0 = 230, y0 = 300, cs = 64;
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
      const diag = i === j, up = j > i;
      box(x0 + j * cs, y0 + i * cs, cs - 6, cs - 6, diag ? C.cyan : C.mag, l0 * (up || diag ? 1 : 0.3), 2, up || diag ? rgba(diag ? C.cyan : C.mag, 0.18) : null);
    }
    txt('Sym₄', x0 + 2 * cs - 3, y0 - 22, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: l0 });
    rich([['4', C.cyan], [' + ', C.white], ['6', C.mag], [' = 10', C.white]], 690, 400, { size: 48, align: 'center', a: l0 * Q(S, 0, 'ten slots', 0.5) });
    txt('slots · 槽位', 690, 446, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.dim, a: l0 * Q(S, 0, 'ten slots', 0.5) });
    rich([['κ_proj(p, q) = ⟨p, q⟩² / (|p|²|q|²) = Tr P(p) P(q)', C.white]], 160, 640, { size: 24, a: l0 * Q(S, 0, 'are one ray', 0.5) });
    rich([['p and −p give the same P · p 与 −p 是同一条射线', C.dim]], 160, 685, { size: 21, fam: F.zh, a: l0 });
  }
  const l1 = a * at(S, 1, 0.6);
  if (l1 > 0.003) {
    const x0 = 180, y0 = 245, cs = 37, ex = Q(S, 1, 'An eleventh', 0.6);
    gramGrid(GP, ex > 0.5 ? 11 : 10, x0, y0, cs, C.cyan, l1, ex > 0.5 ? 1 : 0);
    const tx = 610;
    txt('ten rays · 十条射线', tx, 300, { size: 22, fam: F.zh, w: 700, c: C.white, a: l1 });
    txt('eᵢ  and  eᵢ + eⱼ', tx, 340, { size: 26, fam: F.math, w: 700, c: C.cyan, a: l1 });
    rich([['det G₁₀ = ', C.white], [fStr(GP10.det), C.now]], tx, 420, { size: 34, a: l1 * Q(S, 1, 'Gram determinant', 0.6) });
    rich([['+ (1, 1, 1, 1)', C.now]], tx, 500, { size: 26, a: l1 * ex });
    rich([['det G₁₁ = ', C.white], [fStr(GP11.det), C.now]], tx, 550, { size: 34, a: l1 * ex });
    txt('rank 10 · 秩 10', tx, 620, { size: 30, fam: F.zh, w: 900, c: C.cyan, a: l1 * ex });
  }
  /* right: the signed spinor layer */
  panel(990, 190, 800, 540, a, C.mag, 'SIGNED SPINORS · 有号旋量 · κ_spin');
  const r0 = a * at(S, 0, 0.6) * (1 - at(S, 2, 0.6));
  if (r0 > 0.003) {
    const cx = 1390, cy = 470;
    dashed(cx - 300, cy + 120, cx + 300, cy - 120, C.cyan, r0 * 0.8, 2.5);
    dot(cx + 180, cy - 72, 14, 'w', r0); dot(cx - 180, cy + 72, 14, 'w', r0);
    txt('p', cx + 200, cy - 92, { size: 32, fam: F.math, w: 700, c: C.white, a: r0 });
    txt('−p', cx - 200, cy + 115, { size: 32, fam: F.math, w: 700, align: 'right', c: C.white, a: r0 });
    txt('one ray · 同一条射线', cx, cy - 170, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: r0 * Q(S, 0, 'are one ray', 0.5) });
  }
  const r2 = a * at(S, 2, 0.6);
  if (r2 > 0.003) {
    const x0 = 1025, y0 = 290, cs = 50, ex = Q(S, 2, 'five spinors give', 0.6, 1.8);
    gramGrid(GS, ex > 0.5 ? 6 : 5, x0, y0, cs, C.mag, r2, ex > 0.5 ? 1 : 0);
    const tx = 1360;
    rich([['κ_spin = ½⟨(1, v₁), (1, v₂)⟩', C.white]], tx, 290, { size: 22, a: r2 });
    rich([['1 + 4 = 5 slots · 槽位', C.mag]], tx, 340, { size: 26, fam: F.zh, a: r2 * Q(S, 2, 'five slots', 0.5) });
    txt('Φ(1,0,0,0), Φ(1,1,0,0), …, Φ(3,1,1,1)', tx, 395, { size: 18, fam: F.math, w: 700, c: C.dim, a: r2 });
    rich([['det G₅ = ', C.white], [fStr(GS5.det), C.now]], tx, 450, { size: 34, a: r2 * Q(S, 2, 'five spinors give', 0.6) });
    rich([['+ Φ(1, 1, 1, 1) = ' + spStr(SPINS[5]), C.now]], tx, 520, { size: 22, a: r2 * ex });
    rich([['det G₆ = ', C.white], [fStr(GS6.det), C.now]], tx, 570, { size: 34, a: r2 * ex });
    txt('rank 5 · 秩 5', tx, 640, { size: 30, fam: F.zh, w: 900, c: C.mag, a: r2 * ex });
  }
  /* the bridge */
  const l3 = a * at(S, 3, 0.6);
  panel(130, 750, 1660, 82, l3, C.lean);
  if (l3 > 0.003) {
    rich([['κ_proj ≡ (2κ_spin − 1)²', C.white]], 160, 803, { size: 34, a: l3 });
    akLean(620, 800, 'bridge', a * Q(S, 3, 'Lean checks', 0.6), { size: 20 });
    txt('every PythSpinor pair · 一切毕达哥拉斯旋量对', 1100, 800, { size: 22, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 3, 'square two kappa-spin', 0.6) });
  }
};

/* ======================================================================= */
/*                         scene 5 · THE REFLECTION WALK                     */
/* ======================================================================= */
const WK = { cx: 520, cy: 500, R: 225 };
const wkPt = n => [WK.cx + WK.R * Math.cos(n * Math.PI / 3), WK.cy - WK.R * Math.sin(n * Math.PI / 3)];
function walkCircle(a, shown, cur, o = {}) {
  const { cx, cy, R } = WK;
  ring(cx, cy, R, C.dim, a * 0.6, 1.6);
  line(cx - R - 40, cy, cx + R + 40, cy, C.dim, a * 0.4, 1.2); line(cx, cy + R + 30, cx, cy - R - 30, C.dim, a * 0.4, 1.2);
  if (o.axes) {
    txt('→ real part 1 · ↑ along (i + j + k)/√3', 160, 806, { size: 20, fam: F.math, w: 700, c: C.dim, a });
  }
  for (let n = 0; n <= 6; n++) {
    const s = clamp(shown - n);
    if (s <= 0.003) continue;
    const p = wkPt(n), now = n === cur, anti = n === 3;
    dot(p[0], p[1], now ? 16 : 12, now ? 'g' : anti ? 'm' : 'c', a * s);
    if (now) ring(p[0], p[1], 26, C.now, a * s, 3);
    if (n < 6) {
      const lab = o.labels ? `x${SUB[n]}` : '', dx = Math.cos(n * Math.PI / 3), dy = -Math.sin(n * Math.PI / 3);
      if (lab) txt(lab, p[0] + dx * 46, p[1] + dy * 46 + 9, { size: 26, fam: F.math, w: 700, align: 'center', c: now ? C.now : anti ? C.mag : C.white, a: a * s });
    }
  }
}
SCENES.walk = S => {
  const a = akFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean']]);
  panel(130, 190, 780, 640, a, C.cyan, 'GREAT CIRCLE · 大圆 · 60° per step');
  /* x₀, x₁ on line 0; x₂ … x₆ from line 1 */
  const s1 = Q(S, 0, 'step to g', 0.6);
  const t2 = phraseAt(S, 1, 'x two is'), step = 1.05;
  const grow = clamp((u - t2) / step, 0, 5);
  const shown = 1 + s1 + grow;
  const cur = grow > 0 ? Math.min(6, 1 + Math.ceil(grow - 0.001)) : (s1 > 0.5 ? 1 : 0);
  walkCircle(a, shown, cur, { axes: true, labels: true });
  /* the reflection of x_{n−2} through x_{n−1} */
  if (grow > 0 && cur >= 2) {
    const pA = wkPt(cur - 2), pB = wkPt(cur - 1), pC = wkPt(cur), f = clamp((grow - (cur - 2)) * 1.6);
    dashed(pA[0], pA[1], pB[0], pB[1], C.now, a * 0.8, 2.5);
    ctx.save(); ctx.setLineDash([10, 8]); arrow(pB[0], pB[1], lerp(pB[0], pC[0], f), lerp(pB[1], pC[1], f), C.now, a, 3); ctx.restore();
  }
  /* the ledger */
  const X0 = 990;
  panel(X0 - 20, 190, 820, 640, a, C.cyan, 'REFLECTION WALK · 反射之路 · xₙ₊₂ = [xₙ₊₁, xₙ, xₙ₊₁]');
  for (let n = 0; n <= 6; n++) {
    const s = clamp(shown - n);
    if (s <= 0.003) continue;
    const y = 262 + n * 58, now = n === cur, col = now ? C.now : n === 3 ? C.mag : C.white;
    txt(`x${SUB[n]}`, X0 + 10, y, { size: 30, fam: F.math, w: 700, c: col, a: a * s });
    txt(n === 0 ? 'e' : n === 1 ? 'g' : `[x${SUB[n - 1]}, x${SUB[n - 2]}, x${SUB[n - 1]}]`, X0 + 80, y, { size: 26, fam: F.math, w: 700, c: C.dim, a: a * s });
    txt('= ' + spStr(WALK[n]), X0 + 320, y, { size: 26, fam: F.math, w: 700, c: col, a: a * s });
    const ok = a * s * Q(S, 2, 'x n is b to the n', 0.5);
    txt(`= g${SUP[n]}`, X0 + 690, y, { size: 28, fam: F.math, w: 700, c: C.lean, a: ok });
  }
  const l2 = a * at(S, 2, 0.6);
  akLean(X0 + 10, 702, 'refl', a * Q(S, 2, 'Lean checks', 0.6));
  rich([['xₙ = bⁿ  in groupAt a', C.white], ['  · every heap · 任意流群', C.dim]], X0 + 10, 750, { size: 26, fam: F.zh, a: l2 });
  txt('here a = e, b = g: groupAt e is plain multiplication · 此处即普通乘法', X0 + 10, 795, { size: 19, fam: F.zh, w: 700, c: C.dim, a: l2 });
};

/* ======================================================================= */
/*                        scene 6 · SEVEN HUNDRED TWENTY                     */
/* ======================================================================= */
const CUBE_V = []; for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) CUBE_V.push([x, y, z]);
const CUBE_E = []; for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) if (CUBE_V[i].filter((c, k) => c !== CUBE_V[j][k]).length === 1) CUBE_E.push([i, j]);
function rodr(p, n, t) {
  const c = Math.cos(t), s = Math.sin(t), d = d3(n, p), x = cr3(n, p);
  return p.map((pi, i) => pi * c + x[i] * s + n[i] * d * (1 - c));
}
SCENES.spin = S => {
  const a = akFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* beat times */
  const T = [phraseAt(S, 0, 'a hundred and twenty'), phraseAt(S, 1, 'three quarters'), phraseAt(S, 1, 'one quarter'), phraseAt(S, 1, 'zero at beat three')];
  const t6 = phraseAt(S, 3, 'seven hundred twenty'), t4 = lineAt(S, 3).s + 1.0;
  T.push(t4, (t4 + t6) / 2, t6);
  /* beat 1 is reached by the time T[1]; the turn to beat n runs over the 1.2 s before T[n] */
  let beat = 0;
  for (let n = 1; n <= 6; n++) beat += ease(clamp((S.u - (T[n] - 1.2)) / 1.2));
  const cur = Math.floor(beat + 0.02);
  /* the cube */
  panel(130, 190, 700, 640, a, C.cyan, 'SPACE · 空间 · 120° per beat');
  const n3 = [1, 1, 1].map(c => c / Math.sqrt(3)), th = beat * TAU / 3;
  const V = view(480, 525, 120, -0.62, 0.42);
  const pts = CUBE_V.map(p => V(rodr(p, n3, th)));
  const dA = V(n3.map(c => c * 2.1)), dB = V(n3.map(c => -c * 2.1));
  line(dB[0], dB[1], dA[0], dA[1], C.vio, a * 0.9, 3);
  txt('diagonal · 体对角线', 160, dB[1] + 52, { size: 20, fam: F.zh, w: 700, c: C.vio, a });
  /* the face x = +1 filled, so the turn shows */
  poly([4, 5, 7, 6].map(i => pts[i]), C.mag, a, 0.22, 0);
  for (const [i, j] of CUBE_E) line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], C.white, a * 0.85, 2.5);
  txt(`${Math.round(beat * 120)}°`, 480, 800, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.now, a });
  /* the two readouts per beat as bars */
  const X0 = 900, BW = 120, base = 560, Hh = 260;
  panel(X0 - 20, 190, 910, 640, a, C.cyan, 'κ(e, gⁿ) · SIGNED vs RAY · 有号 vs 射线');
  line(X0 + 60, base, X0 + 60 + 6 * BW, base, C.dim, a * 0.7, 1.5);
  line(X0 + 60, base - Hh, X0 + 60 + 6 * BW, base - Hh, C.dim, a * 0.3, 1);
  txt('1', X0 + 40, base - Hh + 8, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a });
  txt('0', X0 + 40, base + 8, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a });
  for (let k = 0; k < 6; k++) {
    const o = ORB[k], done = clamp(beat - k), now = cur === k + 1;
    const x = X0 + 60 + k * BW + 14, ks = o.ks[0] / o.ks[1], kp = o.kp[0] / o.kp[1];
    const h1 = Hh * ks * done, h2 = Hh * kp * done;
    fillBox(x, base - h1, 42, h1, now ? C.now : C.mag, a * (now ? 0.9 : 0.7));
    fillBox(x + 48, base - h2, 42, h2, C.cyan, a * 0.6);
    const al = a * (done > 0.02 ? 1 : 0.3);
    txt(String(k + 1), x + 45, base + 36, { size: 24, fam: F.mono, w: 700, align: 'center', c: now ? C.now : C.white, a: al });
    if (done > 0.5) {
      txt(fStr(o.ks), x + 21, base - h1 - 12, { size: 22, fam: F.math, w: 700, align: 'center', c: now ? C.now : C.mag, a });
      txt(fStr(o.kp), x + 69, base - h2 - 12, { size: 22, fam: F.math, w: 700, align: 'center', c: C.cyan, a });
    }
  }
  fillBox(X0 + 60, 616, 22, 22, C.mag, a * 0.8); txt('κ_spin  signed · 有号', X0 + 92, 634, { size: 22, fam: F.zh, w: 700, c: C.mag, a });
  fillBox(X0 + 400, 616, 22, 22, C.cyan, a * 0.7); txt('κ_proj  ray · 射线', X0 + 432, 634, { size: 22, fam: F.zh, w: 700, c: C.cyan, a });
  if (cur >= 1) rich([[`g${SUP[cur]} = ${spStr(POW[cur])}`, C.now]], X0 + 60, 690, { size: 30, a });
  /* beat three: the spinor is at −e */
  const m3 = Q(S, 2, 'the spinor sits at minus e', 0.6) * (1 - at(S, 3, 0.6));
  stamp('−e', X0 + 700, 700, m3, C.now, 50, -0.08);
  const l3 = a * Q(S, 3, 'Lean checks', 0.6);
  if (l3 > 0.003) {
    akLean(X0 + 60, 758, 'orbit', l3);
    txt('six beats · κ_spin(e, g³) ≡ 0 · κ_spin(e, g⁶) ≡ 1', X0 + 60, 800, { size: 22, fam: F.math, w: 700, c: C.white, a: l3 });
  }
};

/* ======================================================================= */
/*                          scene 7 · NO SPECIAL POINT                       */
/* ======================================================================= */
SCENES.hopf = S => {
  const a = akFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'argued']]);
  panel(130, 190, 680, 640, a, C.cyan, 'HOPF SPHERE S² · 霍普夫球面');
  const V = view(470, 520, 220, -0.6 + 0.015 * u, 0.38), o = V([0, 0, 0]);
  /* the sphere: a few latitude and longitude circles */
  for (let k = -2; k <= 2; k++) {
    const z = k / 3, r = Math.sqrt(1 - z * z), pts = [];
    for (let i = 0; i <= 64; i++) { const t = TAU * i / 64; pts.push(V([r * Math.cos(t), r * Math.sin(t), z])); }
    ctx.save(); ctx.globalAlpha = a * (k === 0 ? 0.5 : 0.25); ctx.strokeStyle = C.cyan; ctx.lineWidth = 1.2; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.restore();
  }
  for (let m = 0; m < 4; m++) {
    const ph = m * Math.PI / 4, pts = [];
    for (let i = 0; i <= 64; i++) { const t = TAU * i / 64; pts.push(V([Math.cos(ph) * Math.cos(t), Math.sin(ph) * Math.cos(t), Math.sin(t)])); }
    ctx.save(); ctx.globalAlpha = a * 0.2; ctx.strokeStyle = C.cyan; ctx.lineWidth = 1.2; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.restore();
  }
  const l1 = a * at(S, 1, 0.6);
  const pe = V(HO.he), pg = V(HO.hg), pk = V([0, 0, 1]);
  arrow(o[0], o[1], pk[0], pk[1], C.dim, a * 0.6, 1.6); tipTag(o, pk, 'k', C.dim, a, 24, 12);
  arrow(o[0], o[1], pe[0], pe[1], C.white, a, 4); txt('h(e) = i', pe[0] - 6, pe[1] - 42, { size: 26, fam: F.math, w: 700, align: 'right', c: C.white, a });
  arrow(o[0], o[1], pg[0], pg[1], C.now, l1, 4); tipTag(o, pg, 'h(g) = j', C.now, l1, 26, 18);
  if (l1 > 0.003) {
    const q1 = V(HO.he.map(c => c * 0.18)), q2 = V(HO.hg.map(c => c * 0.18)), q3 = V(HO.he.map((c, i) => (c + HO.hg[i]) * 0.18));
    poly([o, q1, q3, q2], C.now, l1 * Q(S, 1, 'are perpendicular', 0.5), 0, 2);
  }
  txt('h(x) = x · i · x̄', 470, 762, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a });
  txt('real unit quaternions Sp(1) · 实单位四元数', 470, 805, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a });

  const X0 = 870;
  panel(X0 - 20, 190, 940, 640, a, C.cyan, 'RAY KERNEL · 射线核');
  const l0 = a * at(S, 0, 0.6);
  rich([['R(x, y) = (2κ(x, y) − 1)² + (2κ(x, y i) − 1)²', C.white]], X0 + 10, 262, { size: 28, a: l0 });
  rich([['x = e,  y = g = ½(1, 1, 1, 1):', C.white]], X0 + 10, 318, { size: 26, a: l1 });
  rich([['R = (1/2)² + (−1/2)² = ', C.white], ['1/2', C.now]], X0 + 10, 362, { size: 28, a: l1 });
  rich([['(1 + ⟨i, j⟩)/2 = (1 + 0)/2 = ', C.white], ['1/2', C.now]], X0 + 10, 410, { size: 28, a: a * Q(S, 1, 'are perpendicular', 0.6) });
  const l2 = a * at(S, 2, 0.6);
  akLean(X0 + 10, 465, 'hopf', a * Q(S, 2, 'Lean checks', 0.6));
  rich([['R(x, y) = (1 + ⟨h(x), h(y)⟩)/2', C.white]], X0 + 480, 465, { size: 22, a: a * Q(S, 2, 'Lean checks', 0.6) });
  rich([['κ(x, y) = κ(x′, y′)  ⇒  ∃ p, q:  p x q = x′,  p y q = y′', C.white]], X0 + 10, 530, { size: 26, a: l2 });
  rich([['p = i, q = −i:  (e, g) ↦ (e, ½(1, 1, −1, −1)),  κ = 3/4 both', C.cyan]], X0 + 10, 578, { size: 23, a: a * Q(S, 2, 'carried onto each other', 0.6) });
  akLean(X0 + 10, 630, 'homog', a * Q(S, 2, 'Lean checks', 0.6));
  const l3 = a * at(S, 3, 0.6);
  txt('No point is special.', X0 + 10, 712, { size: 46, fam: F.disp, w: 700, c: C.white, a: l3, ab: 1 });
  txt('没有哪个点是特殊的。', X0 + 10, 760, { size: 30, fam: F.zh, w: 700, c: C.white, a: l3 * 0.9 });
  txt('a reading of homogeneity, not a theorem · 对齐性的诠释，不是定理', X0 + 10, 806, { size: 20, fam: F.zh, w: 700, c: C.argued, a: l3 });
};

/* ======================================================================= */
/*                                 scene 8 · close                           */
/* ======================================================================= */
SCENES.close = S => {
  /* no status banner here: the card's eight LEAN ✓ rows need the room under the HUD */
  closingCard(S, { from: 0.1, y: 205 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[4], t = sc.start + 6;
  background(t, sc, 4, 6);
  const save = { cx: WK.cx, cy: WK.cy, R: WK.R };
  Object.assign(WK, { cx: 1380, cy: 540, R: 270 });
  walkCircle(0.95, 7, 3, { axes: false, labels: false });
  for (let n = 0; n < 6; n++) { const p = wkPt(n), q = wkPt(n + 1); line(p[0], p[1], q[0], q[1], C.cyan, 0.5, 2); }
  txt('g = (1, 1, 1, 1; 2)', 1380, 545, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white });
  Object.assign(WK, save);
  txt(DATA.film.title_zh, 600, 430, { size: 104, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('ADDITION WITHOUT', 600, 540, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('AN ORIGIN', 600, 610, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 5 });
  rich([['[a, b, c] = a · b̄ · c', C.white]], 600, 700, { size: 36, align: 'center' });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 600, 770, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 4, sc);
  post(0);
};
