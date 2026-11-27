/* Film · Rotation Without Exponentials · 不用指数的转动 (book omega-math, chapter 5).
   Scenes for the shared engine theme/film/engine.js.

   What each scene shows, and where it rests (chapter 5 of the book):
     bridge   exp(X) as an endless series (argued); the Cayley bridge R(σ) = (I − X)⁻¹(I + X) and
              det(I − X) = 1 + |σ|² (definition def-ch05-rational-cayley-bridge and the derivation before it, argued);
              σ = (½, ½, 0): X = [σ]ₓ, R = ⅓[[2, 1, 2], [1, 2, −2], [−2, 2, 1]], RᵀR = I, det R = 1, (I − X)R = I + X
              (example ex-ch05-cayley-vs-taylor; computed here in exact integers).
     orbit    R¹²(0, 0, 1) = (302680, −302680, −314959)/3¹², squared length 1 (computed here with BigInt, and again
              through Ad(2, 1, 1, 0)); the second-order Taylor step T₂ = I + X + X²/2 multiplies the squared length by
              17/16 and (17/16)¹² > 2.069 (example ex-ch05-cayley-vs-taylor, computed here)
              ..... OmegaCayleyRotation.cayley_iterate_norm (LEAN: every s, v, n).
     charts   the single-chart Rodrigues product divides by 1 − a·b (argued); the dual chart's D₊, D₋ and the
              selected output (definition def-ch05-dual-chart-star); the shares D₊/(D₊ + D₋), D₋/(D₊ + D₋) sum to 1
              and the larger is ≥ ½ (manual derivation in 5.2, argued); examples A = ((½,0,0), (0,½,0)) and
              B = ((1,0,0), (½,½,0)): shares 17/25 | 8/25 and 1/6 | 5/6, outputs (6/17, 6/17, 8/17) and
              (−1/5, 0, −2/5) inside the unit ball (computed here from the definition and again from the spinor lift
              of the Lean statement) ..... OmegaLieTripleAndFreeGroup.dual_chart_denom_ge_half (LEAN: ½ ≤ denomPlus ∨
              ½ ≤ denomMinus for every u, v).
     adjoint  pHalf = (1, 1, 0, 0), N = 2; Ad(pHalf) = ½[[2,0,0],[0,0,−2],[0,2,0]] = the integer quarter turn
              (x, y, z) ↦ (x, −z, y); Ad(1, 1, 1, 1) = (x, y, z) ↦ (z, x, y); Ad(1, 2, 0, 0) = ⅕[[5,0,0],[0,−3,−4],[0,4,−3]]
              (example ex-ch05-phalf-integer-rotation; computed here by quaternion products and by the matrix formula of
              def-ch05-rational-adjoint) ..... OmegaCayleyRotation.ad_dot (LEAN: Ad p keeps the rational dot product).
     beats    x₀ = 1, x₁ = (3/5, 4/5, 0, 0), c = 3/5, x_{n+1} = (6/5)x_n − x_{n−1}; beats 0…4 with T_n(3/5) and
              κ = (1 + T_n)/2 (example ex-ch05-rational-harmonic-stepping, computed); beat 20 =
              (91004468168113, −28515500892816)/5²⁰ with squared norm 1 (computed here with BigInt, and again by the cubic
              heap step x_{n+1} x̄_n x_{n+1}) ..... OmegaCayleyRotation.heap_norm_preserved (LEAN, signed spinors) and
              QuaternionHeapRecurrence.normSq_and_chebyshev (LEAN, classical real quaternions).
     pi       t ↦ exp(tX), the continuous-ray classification φ(exp tX) = cos²(t√(h(X,X)/2)), h(X,X) = 2π²/T²
              ..... RoundTripPeriodMetric.comparison_classification_of_continuous_rays (LEAN, classical side); six norm-5
              axes and caps 2⟨x, axisᵢ⟩² > 5 ..... RationalSixAxisCover.rational_six_axis_open_cover (LEAN, classical
              side); the rational point (2, 2, 1)/3 scores 8 > 5 on (1, 2, 0) (computed); "π is the price of a real
              clock" (remark rem-ch05-where-pi-enters, the chapter's reading, argued). The sphere picture is drawn in
              floating point; covering and the no-perpendicular-pair property are re-checked on a sample on load.
     close    closing card.

   On load, FILM.init checks DATA.lean against the seven theorems and re-derives every number shown on screen by an
   independent route; any disagreement goes to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const RW_P = 'D5/S3/Quantum/AURICOmega/';
const RW_LEAN = {
  iter: [RW_P + 'OmegaCayleyRotation.cayley_iterate_norm', 'cayley_iterate_norm'],
  half: [RW_P + 'OmegaLieTripleAndFreeGroup.dual_chart_denom_ge_half', 'dual_chart_denom_ge_half'],
  addot: [RW_P + 'OmegaCayleyRotation.ad_dot', 'ad_dot'],
  heap: [RW_P + 'OmegaCayleyRotation.heap_norm_preserved', 'heap_norm_preserved'],
  cheb: ['D5/S3/Quantum/Algebra/Comparison/QuaternionHeapRecurrence.normSq_and_chebyshev', 'normSq_and_chebyshev'],
  rays: ['D5/S3/Quantum/Algebra/Comparison/RoundTripPeriodMetric.comparison_classification_of_continuous_rays', 'comparison_classification_of_continuous_rays'],
  six: ['D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover', 'rational_six_axis_open_cover']
};

/* exact rationals as [n, d] with BigInt, d > 0, reduced */
const bgcd = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) { [a, b] = [b, a % b]; } return a; };
const fq = (n, d = 1n) => { n = BigInt(n); d = BigInt(d); if (d < 0n) { n = -n; d = -d; } const g = bgcd(n, d) || 1n; return [n / g, d / g]; };
const fAdd = (a, b) => fq(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const fSub = (a, b) => fq(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
const fMul = (a, b) => fq(a[0] * b[0], a[1] * b[1]);
const fDiv = (a, b) => fq(a[0] * b[1], a[1] * b[0]);
const fEq = (a, b) => a[0] * b[1] === b[0] * a[1];
const fLe = (a, b) => a[0] * b[1] <= b[0] * a[1];
const fStr = a => (a[1] === 1n ? `${a[0]}` : `${a[0]}/${a[1]}`).replace('-', '−');
const fNum = a => Number(a[0]) / Number(a[1]);
const vDot = (a, b) => a.reduce((s, x, i) => fAdd(s, fMul(x, b[i])), fq(0));
const vCross = (a, b) => [fSub(fMul(a[1], b[2]), fMul(a[2], b[1])), fSub(fMul(a[2], b[0]), fMul(a[0], b[2])), fSub(fMul(a[0], b[1]), fMul(a[1], b[0]))];
const vScale = (k, a) => a.map(x => fMul(k, x));
const vAdd = (a, b) => a.map((x, i) => fAdd(x, b[i]));

/* integer quaternions [w, x, y, z] (BigInt) */
const qMul = (a, b) => [
  a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
  a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
  a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
  a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
const qConj = a => [a[0], -a[1], -a[2], -a[3]];
const qN2 = a => a.reduce((s, x) => s + x * x, 0n);
const Bq = a => a.map(BigInt);
/* Ad(p) as an integer numerator matrix over N = |p|², column j = p e_j p̄ */
function adNum(p) {
  const cols = [[1n, 0n, 0n], [0n, 1n, 0n], [0n, 0n, 1n]].map(e => qMul(qMul(p, [0n, ...e]), qConj(p)));
  return [0, 1, 2].map(i => [0, 1, 2].map(j => cols[j][i + 1]));
}
/* the matrix formula of def-ch05-rational-adjoint, entrywise */
function adFormula(p) {
  const [w, x, y, z] = p;
  return [[w * w + x * x - y * y - z * z, 2n * (x * y - w * z), 2n * (x * z + w * y)],
    [2n * (x * y + w * z), w * w - x * x + y * y - z * z, 2n * (y * z - w * x)],
    [2n * (x * z - w * y), 2n * (y * z + w * x), w * w - x * x - y * y + z * z]];
}
const mMul = (A, B) => A.map(r => [0, 1, 2].map(j => r[0] * B[0][j] + r[1] * B[1][j] + r[2] * B[2][j]));
const mVec = (A, v) => A.map(r => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);
const mT = A => [0, 1, 2].map(i => [0, 1, 2].map(j => A[j][i]));
const det3 = A => A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);

/* --- scene bridge / orbit: σ = (½, ½, 0) --- */
const RW_M = [[2n, 1n, 2n], [1n, 2n, -2n], [-2n, 2n, 1n]];        // R = M / 3 (chapter's example)
const RW_ORBIT = (() => { const out = [[0n, 0n, 1n]]; for (let n = 1; n <= 12; n++) out.push(mVec(RW_M, out[n - 1])); return out; })();
/* plane ⊥ σ: e₁ = (0, 0, 1), e₂ = (1, −1, 0)/√2; drawing coordinates only */
const rwPlane = v => [(v[0] - v[1]) / Math.SQRT2, v[2]];
const RW_CAY_PTS = RW_ORBIT.map((v, n) => rwPlane(v.map(c => Number(c) / Math.pow(3, n))));
/* T₂ = I + X + X²/2 with X = [σ]ₓ, in floats for the picture (exact factor 17/16 checked on load) */
const RW_X = [[0, 0, 0.5], [0, 0, -0.5], [-0.5, 0.5, 0]];
const RW_T2 = (() => {
  const X2 = [0, 1, 2].map(i => [0, 1, 2].map(j => RW_X[i][0] * RW_X[0][j] + RW_X[i][1] * RW_X[1][j] + RW_X[i][2] * RW_X[2][j]));
  return [0, 1, 2].map(i => [0, 1, 2].map(j => (i === j ? 1 : 0) + RW_X[i][j] + X2[i][j] / 2));
})();
const RW_TAY_PTS = (() => { let v = [0, 0, 1]; const out = [rwPlane(v)]; for (let n = 1; n <= 12; n++) { v = RW_T2.map(r => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]); out.push(rwPlane(v)); } return out; })();

/* --- scene charts: the two examples --- */
function dualChart(a, b) {
  const one = fq(1), na = vDot(a, a), nb = vDot(b, b), ab = vDot(a, b);
  const Dp = fSub(fAdd(one, fMul(na, nb)), fMul(fq(2), ab));
  const s = vAdd(a, b), Dm = vDot(s, s);
  const N = vAdd(vAdd(vScale(fSub(one, na), b), vScale(fSub(one, nb), a)), vScale(fq(2), vCross(a, b)));
  const tot = fAdd(Dp, Dm), plus = !fLe(Dp, Dm) || fEq(Dp, Dm);
  const out = plus ? vScale(fDiv(one, Dp), N) : vScale(fDiv(fq(-1), Dm), N);
  return { Dp, Dm, N, tot, sp: fDiv(Dp, tot), sm: fDiv(Dm, tot), plus, out, out2: vDot(out, out) };
}
/* the Lean side's route: lift u = x/d to the spinor ((d² − |x|², 2dx); d² + |x|²), multiply, read w_p and r_p */
function liftShares(x, d, y, e) {
  const X = Bq(x), Y = Bq(y), D = BigInt(d), E = BigInt(e);
  const n2 = v => v.reduce((s, c) => s + c * c, 0n);
  const la = [D * D - n2(X), 2n * D * X[0], 2n * D * X[1], 2n * D * X[2]], ra = D * D + n2(X);
  const lb = [E * E - n2(Y), 2n * E * Y[0], 2n * E * Y[1], 2n * E * Y[2]], rb = E * E + n2(Y);
  const p = qMul(la, lb), r = ra * rb, w = p[0];
  const out = (w >= 0n ? [p[1], p[2], p[3]] : [-p[1], -p[2], -p[3]]).map(c => fq(c, r + (w >= 0n ? w : -w)));
  return { plus: fq(r + w, 2n * r), minus: fq(r - w, 2n * r), out, rad2: qN2(p) === r * r };
}
const RW_H = fq(1, 2);
const RW_EX = [
  { name: 'A', a: [RW_H, fq(0), fq(0)], b: [fq(0), RW_H, fq(0)], ia: [[1, 0, 0], 2], ib: [[0, 1, 0], 2] },
  { name: 'B', a: [fq(1), fq(0), fq(0)], b: [RW_H, RW_H, fq(0)], ia: [[1, 0, 0], 1], ib: [[1, 1, 0], 2] }
].map(e => Object.assign(e, dualChart(e.a, e.b)));

/* --- scene adjoint --- */
const RW_AD = [[1, 1, 0, 0], [1, 1, 1, 1], [1, 2, 0, 0]].map(p => { const q = Bq(p); return { p, N: qN2(q), M: adNum(q) }; });

/* --- scene beats: x_n = (a_n, b_n, 0, 0) / 5ⁿ --- */
const RW_BEATS = (() => { const a = [[1n, 0n], [3n, 4n]]; for (let n = 2; n <= 20; n++) a.push([6n * a[n - 1][0] - 25n * a[n - 2][0], 6n * a[n - 1][1] - 25n * a[n - 2][1]]); return a; })();
const RW_KAPPA = RW_BEATS.map((p, n) => fq(5n ** BigInt(n) + p[0], 2n * 5n ** BigInt(n)));
/* Chebyshev T_n(3/5) by T_{n+1} = 2c T_n − T_{n−1} */
const RW_T = (() => { const c = fq(3, 5), t = [fq(1), c]; for (let n = 2; n <= 20; n++) t.push(fSub(fMul(fMul(fq(2), c), t[n - 1]), t[n - 2])); return t; })();

/* --- scene pi: the six norm-5 axes --- */
const RW_AXES = [[1, 2, 0], [1, -2, 0], [0, 1, 2], [0, 1, -2], [2, 0, 1], [-2, 0, 1]];
const RW_XPT = [2, 2, 1];   // (2, 2, 1)/3, a rational unit vector

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('rotation-without-exponentials film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(RW_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(RW_LEAN).length}`);
  for (const [gid, short] of Object.values(RW_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. BRIDGE: the Cayley numerator C(d, s₀) = (d² − |s₀|²)I + 2d[s₀]ₓ + 2 s₀s₀ᵀ over N, with s₀ = (1, 1, 0), d = 2 */
  {
    const s = [1n, 1n, 0n], d = 2n, n2 = 2n, N = d * d + n2;
    const K = [[0n, -s[2], s[1]], [s[2], 0n, -s[0]], [-s[1], s[0], 0n]];
    const C = [0, 1, 2].map(i => [0, 1, 2].map(j => (i === j ? d * d - n2 : 0n) + 2n * d * K[i][j] + 2n * s[i] * s[j]));
    check(N === 6n && C.every((r, i) => r.every((c, j) => c * 3n === RW_M[i][j] * N)), 'C(2, (1,1,0))/6 = M/3');
    const MtM = mMul(mT(RW_M), RW_M);
    check(MtM.every((r, i) => r.every((c, j) => c === (i === j ? 9n : 0n))), 'RᵀR = I');
    check(det3(RW_M) === 27n, 'det R = 1');
    /* (I − X) R = I + X, with 2X = K: (2I − K) M = 3 (2I + K) */
    const I2mK = [0, 1, 2].map(i => [0, 1, 2].map(j => (i === j ? 2n : 0n) - K[i][j]));
    const I2pK = [0, 1, 2].map(i => [0, 1, 2].map(j => (i === j ? 2n : 0n) + K[i][j]));
    const L = mMul(I2mK, RW_M);
    check(L.every((r, i) => r.every((c, j) => c === 3n * I2pK[i][j])), '(I − X)R = I + X');
    /* det(I − X) = 1 + |σ|² = 3/2: det(2I − K) = 8 · 3/2 = 12 */
    check(det3(I2mK) === 12n, 'det(I − X) = 3/2');
    /* Cayley = Ad(q), q = (d, s₀) = (2, 1, 1, 0) */
    const A = adNum([2n, 1n, 1n, 0n]);
    check(A.every((r, i) => r.every((c, j) => c * 3n === RW_M[i][j] * 6n)), 'R(σ) = Ad(2, 1, 1, 0)');
  }

  /* 2. ORBIT: R¹²v₀, its denominator and length; again through Ad(2, 1, 1, 0) with |q|² = 6 and halving */
  {
    const v12 = RW_ORBIT[12];
    check(v12.join(',') === '302680,-302680,-314959', `R¹²v₀ numerators ${v12.join(',')}`);
    check(bgcd(bgcd(v12[0], v12[1]), v12[2]) % 3n !== 0n, 'denominator stays 3¹²');
    check(3n ** 12n === 531441n && v12.reduce((s, c) => s + c * c, 0n) === 3n ** 24n, '|R¹²v₀|² = 1');
    for (let n = 0; n <= 12; n++) check(RW_ORBIT[n].reduce((s, c) => s + c * c, 0n) === 9n ** BigInt(n), `|Rⁿv₀|² = 1 at ${n}`);
    let v = [0n, 0n, 1n]; const A = adNum([2n, 1n, 1n, 0n]);
    for (let n = 0; n < 12; n++) v = mVec(A, v).map(c => c / 2n);      // A = 2M exactly
    check(v.join(',') === v12.join(','), 'R¹²v₀ through Ad(q)');
    /* Taylor: 8T₂ is an integer matrix; |8T₂ v₀|² = 64 · 17/16 = 68 */
    const T8 = RW_T2.map(r => r.map(c => Math.round(8 * c)));
    check(T8.every((r, i) => r.every((c, j) => Math.abs(c - 8 * RW_T2[i][j]) < 1e-12)), '8T₂ is integral');
    const w = T8.map(r => r[2]);
    check(w[0] * w[0] + w[1] * w[1] + w[2] * w[2] === 68, '|T₂v₀|² = 17/16');
    check(17n ** 12n * 1000n > 2069n * 16n ** 12n, '(17/16)¹² > 2.069');
    const t12 = RW_TAY_PTS[12]; check(Math.abs(t12[0] ** 2 + t12[1] ** 2 - Math.pow(17 / 16, 12)) < 1e-9, 'Taylor spiral radius');
  }

  /* 3. CHARTS: definition route against the spinor-lift route; ½ floor; ball */
  {
    const want = { A: ['17/25', '8/25', '6/17,6/17,8/17', '8/17'], B: ['1/6', '5/6', '−1/5,0,−2/5', '1/5'] };
    for (const e of RW_EX) {
      const L = liftShares(e.ia[0], e.ia[1], e.ib[0], e.ib[1]);
      check(L.rad2, `${e.name}: |p|² = r²`);
      check(fEq(L.plus, e.sp) && fEq(L.minus, e.sm), `${e.name}: denomPlus/Minus = D±/(D₊ + D₋)`);
      check(fEq(fAdd(e.sp, e.sm), fq(1)), `${e.name}: shares sum to 1`);
      check(fLe(RW_H, e.sp) || fLe(RW_H, e.sm), `${e.name}: a share ≥ ½`);
      check(L.out.every((c, i) => fEq(c, e.out[i])), `${e.name}: output = N/D`);
      check(fLe(e.out2, fq(1)), `${e.name}: output in the ball`);
      check(fEq(vDot(e.N, e.N), fMul(e.Dp, e.Dm)), `${e.name}: |N|² = D₊D₋`);
      const w0 = want[e.name];
      check(fStr(e.sp) === w0[0] && fStr(e.sm) === w0[1] && e.out.map(fStr).join(',') === w0[2] && fStr(e.out2) === w0[3], `${e.name}: shown values`);
    }
    check(RW_EX[0].plus && !RW_EX[1].plus, 'A uses D₊, B uses D₋');
  }

  /* 4. ADJOINT: quaternion products against the matrix formula; the three shown matrices; dot products kept */
  {
    const shown = ['2,0,0,0,0,-2,0,2,0', '0,0,4,4,0,0,0,4,0', '5,0,0,0,-3,-4,0,4,-3'];
    RW_AD.forEach((r, k) => {
      const F2 = adFormula(Bq(r.p));
      check(r.M.every((row, i) => row.every((c, j) => c === F2[i][j])), `Ad${r.p} formula`);
      check(r.M.flat().join(',') === shown[k], `Ad${r.p} numerators ${r.M.flat().join(',')}`);
      check(mMul(mT(r.M), r.M).every((row, i) => row.every((c, j) => c === (i === j ? r.N * r.N : 0n))), `Ad${r.p} orthogonal`);
      check(det3(r.M) === r.N ** 3n, `Ad${r.p} det 1`);
    });
    check(RW_AD.map(r => r.N).join(',') === '2,4,5', 'norms 2, 4, 5');
    /* quarter turn: (x, y, z) ↦ (x, −z, y); cycle: (x, y, z) ↦ (z, x, y) */
    const v = [3n, 5n, 7n], q1 = mVec(RW_AD[0].M, v).map(c => c / 2n), q2 = mVec(RW_AD[1].M, v).map(c => c / 4n);
    check(q1.join(',') === '3,-7,5' && q2.join(',') === '7,3,5', 'quarter turn and cycle');
    /* −p gives the same matrix */
    check(adNum(Bq([-1, -1, 0, 0])).flat().join(',') === shown[0], 'Ad(−p) = Ad(p)');
  }

  /* 5. BEATS: two-term rule against the cubic heap step, Chebyshev values, κ, beat 20 */
  {
    const b = RW_BEATS;
    const tab = [['1', '0'], ['3/5', '4/5'], ['−7/25', '24/25'], ['−117/125', '44/125'], ['−527/625', '−336/625']];
    for (let n = 0; n <= 4; n++) check(fStr(fq(b[n][0], 5n ** BigInt(n))) === tab[n][0] && fStr(fq(b[n][1], 5n ** BigInt(n))) === tab[n][1], `beat ${n}`);
    for (let n = 0; n <= 20; n++) {
      check(b[n][0] * b[n][0] + b[n][1] * b[n][1] === 25n ** BigInt(n), `|x_${n}|² = 1`);
      check(fEq(RW_T[n], fq(b[n][0], 5n ** BigInt(n))), `⟨x₀, x_${n}⟩ = T_${n}(3/5)`);
    }
    /* cubic heap step x_{n+1} x̄_n x_{n+1} over 5^{3n+3}... compare to x_{n+2} over 5^{n+2} */
    for (let n = 0; n + 2 <= 20; n++) {
      const A = [b[n + 1][0], b[n + 1][1], 0n, 0n], B = [b[n][0], b[n][1], 0n, 0n], P = qMul(qMul(A, qConj(B)), A);
      const sc = 5n ** BigInt(2 * (n + 1) + n - (n + 2));
      check(P[0] === b[n + 2][0] * sc && P[1] === b[n + 2][1] * sc && P[2] === 0n && P[3] === 0n, `heap step ${n}`);
    }
    const kap = ['1', '4/5', '9/25', '4/125', '49/625'];
    for (let n = 0; n <= 4; n++) check(fStr(RW_KAPPA[n]) === kap[n], `κ_${n}`);
    check(fEq(RW_KAPPA[2], fMul(fSub(fMul(fq(2), RW_KAPPA[1]), fq(1)), fSub(fMul(fq(2), RW_KAPPA[1]), fq(1)))), 'κ₂ = (2κ₁ − 1)²');
    check(b[20].join(',') === '91004468168113,-28515500892816' && 5n ** 20n === 95367431640625n, 'beat 20');
  }

  /* 6. PI: the axes have squared norm 5; (2, 2, 1)/3 scores 8 on (1, 2, 0); cover and no orthogonal pair on a sample */
  {
    check(RW_AXES.every(a => a[0] * a[0] + a[1] * a[1] + a[2] * a[2] === 5), 'axes of squared norm 5');
    const d = RW_XPT[0] + 2 * RW_XPT[1];
    check(2 * d * d === 8 * 9 && RW_XPT.reduce((s, c) => s + c * c, 0) === 9, '2⟨x, (1,2,0)⟩² = 8 for x = (2,2,1)/3');
    const score = (x, a) => 2 * Math.pow(x[0] * a[0] + x[1] * a[1] + x[2] * a[2], 2);
    let miss = 0, orth = 0;
    for (let k = 0; k < 4000; k++) {
      const z = 2 * rnd(k, 11) - 1, th = TAU * rnd(k, 12), r = Math.sqrt(1 - z * z), x = [r * Math.cos(th), r * Math.sin(th), z];
      const ok = RW_AXES.map(a => score(x, a) > 5);
      if (!ok.some(Boolean)) miss++;
      /* a unit y ⊥ x */
      const t = Math.abs(x[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
      let y = [x[1] * t[2] - x[2] * t[1], x[2] * t[0] - x[0] * t[2], x[0] * t[1] - x[1] * t[0]];
      const yn = Math.hypot(...y); y = y.map(c => c / yn);
      const ph = TAU * rnd(k, 13), xy = [x[1] * y[2] - x[2] * y[1], x[2] * y[0] - x[0] * y[2], x[0] * y[1] - x[1] * y[0]];
      const yy = y.map((c, i) => Math.cos(ph) * c + Math.sin(ph) * xy[i]);
      RW_AXES.forEach((a, i) => { if (ok[i] && score(yy, a) > 5) orth++; });
    }
    check(miss === 0, `${miss} sample points outside every cap`);
    check(orth === 0, `${orth} perpendicular pairs inside one cap`);
  }
});
Object.assign(FILM.speed, { bridge: 0.02, orbit: 0.014, charts: 0.016, adjoint: 0.016, beats: 0.018, pi: 0.014, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
const sup = n => String(n).split('').map(c => SUP[c]).join('');
const neg = s => String(s).replace(/-/g, '−');
function rich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  const tot = parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0);
  let cx = o.align === 'center' ? x - tot / 2 : o.align === 'right' ? x - tot : x;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a }); cx += tw(s, size, fam, w); }
  return cx;
}
const RW_MISSING = new Set();
function leanChip(x, y, key, a, o = {}) {
  if (a <= 0.003) return;
  const [gid, label] = RW_LEAN[key], r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!RW_MISSING.has(gid)) { RW_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(label, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a 3×3 matrix with square brackets; cells: strings; cw: column width */
function matrix(cells, x, y, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0.003) return;
  const size = o.size || 30, cw = o.cw || 70, rh = o.rh || size * 1.35, col = o.c || C.white;
  const w = cw * cells[0].length, h = rh * cells.length;
  const by = y - size * 0.95, bh = h + size * 0.3;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = o.bc || col; ctx.lineWidth = 2.5; ctx.beginPath();
  ctx.moveTo(x + 10, by); ctx.lineTo(x, by); ctx.lineTo(x, by + bh); ctx.lineTo(x + 10, by + bh);
  ctx.moveTo(x + w + 10, by); ctx.lineTo(x + w + 20, by); ctx.lineTo(x + w + 20, by + bh); ctx.lineTo(x + w + 10, by + bh);
  ctx.stroke(); ctx.restore();
  cells.forEach((r, i) => r.forEach((s, j) => {
    const cc = o.cellC ? o.cellC(i, j, s) : col;
    txt(neg(s), x + 10 + cw * (j + 0.5), y + rh * i, { size, fam: F.math, w: 700, align: 'center', c: cc, a });
  }));
  return x + w + 20;
}
const fade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function titleCard(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.3) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.4);
  txt(`${DATA.book.code} · FILM`, W / 2, 360, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 500, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('ROTATION WITHOUT EXPONENTIALS', p, 5), W / 2, 600, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('CAYLEY · DUAL CHARTS · ADJOINT · CHEBYSHEV · SIX AXES', W / 2, 680, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 5 });
}

/* ======================================================================= */
/*                       scene 1 · THE CAYLEY BRIDGE                         */
/* ======================================================================= */
SCENES.bridge = S => {
  const u = S.u;
  titleCard(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, null, 'computed']]);
  /* line 0: the endless series, cut short */
  const s0 = a * Q(S, 0, 'endless series', 0.8);
  panel(140, 200, 1640, 150, a, C.dim, 'THE TEXTBOOK MAP · 教科书的指数映射');
  const terms = ['exp(X) = I', ' + X', ' + X²/2!', ' + X³/3!', ' + X⁴/4!', ' + X⁵/5!', ' + …'];
  let cx = 180;
  terms.forEach((t, i) => {
    const ai = a * clamp(s0 * 7 - i);
    txt(t, cx, 295, { size: 40, fam: F.math, w: 700, c: i < 3 ? C.white : C.dim, a: ai });
    cx += tw(t, 40, F.math, 700);
  });
  const cut = a * Q(S, 0, 'cut short', 0.6);
  if (cut > 0.003) {
    const xc = 180 + tw(terms.slice(0, 3).join(''), 40, F.math, 700) + 5;
    dashed(xc, 230, xc, 330, C.mag, cut, 3);
    txt('cut here → |v|² drifts · 截断即漂移', xc + 24, 335 - 4, { size: 20, fam: F.zh, w: 700, c: C.mag, a: cut * 0.9 });
  }
  /* lines 1–2: the bridge and its divisor */
  const b1 = a * at(S, 1, 0.7);
  panel(140, 385, 800, 440, b1, C.cyan, 'CAYLEY BRIDGE · 有理凯莱桥');
  rich([['R(σ) = ', C.white], ['(I − X)⁻¹', C.now], ['(I + X)', C.cyan]], 540, 480, { size: 44, align: 'center', a: b1 });
  txt('X = [σ]ₓ :  X v = σ × v,  Xᵀ = −X', 540, 545, { size: 26, fam: F.math, w: 700, align: 'center', c: C.dim, a: b1 });
  const b2 = a * Q(S, 1, 'whose determinant', 0.7);
  rich([['det(I − X) = 1 + |σ|²', C.white]], 540, 640, { size: 40, align: 'center', a: b2 });
  rich([['≥ 1 > 0', C.now]], 540, 705, { size: 40, align: 'center', a: b2 * Q(S, 1, 'never zero', 0.6) });
  txt('one division, never by zero · 一次除法，除数永不为零', 540, 780, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: b2 * Q(S, 1, 'never zero', 0.6, 0.4) });
  /* line 3: the worked example */
  const b3 = a * at(S, 2, 0.7);
  panel(980, 385, 800, 440, b3, C.cyan, 'σ = (½, ½, 0)');
  txt('R(½, ½, 0) =', 1010, 500, { size: 32, fam: F.math, w: 700, c: C.white, a: b3 });
  txt('⅓', 1240, 500, { size: 44, fam: F.math, w: 700, c: C.now, a: b3 });
  const cells = RW_M.map(r => r.map(c => String(c)));
  matrix(cells, 1300, 455, { size: 36, cw: 84, a: b3 * Q(S, 2, 'matrix of thirds', 0.6) });
  const b4 = a * Q(S, 2, 'orthogonal', 0.6);
  txt('RᵀR = I', 1100, 715, { size: 36, fam: F.math, w: 700, align: 'center', c: C.white, a: b4 });
  txt('det R = 1', 1430, 715, { size: 36, fam: F.math, w: 700, align: 'center', c: C.white, a: a * Q(S, 2, 'determinant one', 0.6) });
  txt('exact fractions, no series · 精确分数，没有级数', 1380, 785, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: b4 });
};

/* ======================================================================= */
/*                          scene 2 · TWELVE TURNS                           */
/* ======================================================================= */
SCENES.orbit = S => {
  const u = S.u, a = fade(S);
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean']]);
  const cx = 520, cy = 500, R = 210;
  /* steps so far: Cayley in line 0, Taylor in line 1 */
  const pc = Q(S, 0, 'twelve times', 3.6), nc = Math.floor(12 * pc + 1e-9);
  const pt = Q(S, 1, 'multiplies', 3.2), nt = Math.floor(12 * pt + 1e-9);
  ring(cx, cy, R, C.cyan, a * 0.6, 2);
  line(cx - R - 40, cy, cx + R + 40, cy, C.dim, a * 0.35, 1); line(cx, cy - R - 40, cx, cy + R + 40, C.dim, a * 0.35, 1);
  txt('unit circle ⊥ σ · 垂直于 σ 的单位圆', cx, cy + R + 60 + 40 * 0, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a * (1 - pt) });
  const P = p => [cx + R * p[0], cy - R * p[1]];
  /* the Taylor spiral (magenta) */
  if (nt > 0 || pt > 0) {
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = C.mag; ctx.lineWidth = 2.5; ctx.beginPath();
    for (let n = 0; n <= nt; n++) { const q = P(RW_TAY_PTS[n]); if (n) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); }
    ctx.stroke(); ctx.restore();
    for (let n = 1; n <= nt; n++) { const q = P(RW_TAY_PTS[n]); dot(q[0], q[1], 9, 'm', a); }
  }
  /* the Cayley orbit (cyan), current point amber */
  for (let n = 0; n <= nc; n++) { const q = P(RW_CAY_PTS[n]); dot(q[0], q[1], n === nc ? 16 : 10, n === nc && pt <= 0 ? 'g' : 'c', a); }
  if (nc >= 1) { const q = P(RW_CAY_PTS[nc]); if (pt <= 0) arrow(cx, cy, q[0], q[1], C.now, a, 3); }
  const q0 = P(RW_CAY_PTS[0]);
  txt('v₀ = (0, 0, 1)', q0[0], q0[1] + 48, { size: 22, fam: F.math, w: 700, align: 'center', c: C.white, a });
  /* the ledger */
  panel(1000, 200, 790, 620, a, C.cyan, 'R(½, ½, 0)ⁿ v₀ · 凯莱迭代');
  rich([['n = ', C.white], [String(nc), C.now]], 1030, 280, { size: 40, a });
  const v = RW_ORBIT[nc];
  txt('Rⁿv₀ =', 1030, 350, { size: 30, fam: F.math, w: 700, c: C.white, a });
  txt(`(${v.map(c => neg(c)).join(', ')})`, 1150, 350, { size: nc >= 10 ? 26 : 30, fam: F.mono, w: 700, c: C.cyan, a });
  rich([['        / 3', C.white], [sup(nc), C.white], ['  =  ', C.dim], [String(3 ** nc), C.white]], 1030, 400, { size: 28, a });
  rich([['|Rⁿv₀|² = ', C.white], ['1/1', C.now]], 1030, 470, { size: 36, a });
  /* Taylor */
  const ta = a * at(S, 1, 0.6);
  line(1030, 515, 1760, 515, C.dim, ta * 0.5, 1);
  txt('T₂ = I + X + X²/2', 1030, 570, { size: 30, fam: F.math, w: 700, c: C.mag, a: ta });
  rich([['|T₂ⁿv₀|² = (17/16)', C.white], [sup(nt), C.white], [' ≈ ', C.dim], [Math.pow(17 / 16, nt).toFixed(4), C.mag]], 1030, 630, { size: 32, a: ta });
  txt('(17/16)¹² > 2.069', 1030, 690, { size: 30, fam: F.math, w: 700, c: C.mag, a: a * Q(S, 1, 'past two', 0.6) });
  if (nt >= 1) txt('drifts off the sphere · 脱离球面', 1030, 735, { size: 22, fam: F.zh, w: 700, c: C.mag, a: ta });
  leanChip(1030, 795, 'iter', a * Q(S, 2, 'Lean checks', 0.6), { size: 22 });
};

/* ======================================================================= */
/*                           scene 3 · TWO CHARTS                            */
/* ======================================================================= */
function shareBar(x, y, w, e, a, focus) {
  if (a <= 0.003) return;
  const sp = fNum(e.sp), hgt = 54;
  fillBox(x, y, w * sp, hgt, C.cyan, a * (e.plus ? 0.75 : 0.3));
  fillBox(x + w * sp, y, w * (1 - sp), hgt, C.mag, a * (e.plus ? 0.3 : 0.75));
  box(x, y, w, hgt, focus ? C.now : C.dim, a, focus ? 2.5 : 1.5);
  dashed(x + w / 2, y - 6, x + w / 2, y + hgt + 6, C.white, a * 0.9, 2);
  txt(fStr(e.sp), x + Math.max(w * sp / 2, 50), y + 37, { size: 28, fam: F.mono, w: 700, align: 'center', c: e.plus ? C.bg : C.white, a });
  txt(fStr(e.sm), x + w * sp + Math.max(w * (1 - sp) / 2, 50), y + 37, { size: 28, fam: F.mono, w: 700, align: 'center', c: e.plus ? C.white : C.bg, a });
}
SCENES.charts = S => {
  const u = S.u, a = fade(S);
  badgeQ(S, [[0, null, 'argued'], [2, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* line 0: one chart, one divisor */
  panel(140, 200, 800, 250, a, C.dim, 'ONE CHART · 单卡合成');
  rich([['a ∘ b = ', C.white], ['(a + b + a × b)', C.white], [' / ', C.dim], ['(1 − a·b)', C.now]], 540, 300, { size: 34, align: 'center', a });
  const z0 = a * Q(S, 0, 'reach zero', 0.6);
  rich([['a·b = 1  ⇒  ', C.white], ['÷ 0', C.now]], 540, 385, { size: 36, align: 'center', a: z0 });
  txt('a half-turn breaks the chart · 半周转动处卡片失效', 540, 430, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: z0 });
  /* line 1: the two denominators */
  const d1 = a * at(S, 1, 0.6);
  panel(140, 480, 800, 345, d1, C.cyan, 'DUAL CHART · 双卡');
  rich([['D₊ = 1 + |a|²|b|² − 2 a·b', C.cyan]], 170, 560, { size: 32, a: d1 });
  rich([['D₋ = |a + b|²', C.mag]], 170, 615, { size: 32, a: d1 });
  rich([['a ⋆ b = ', C.white], ['+N/D₊', C.cyan], ['  or  ', C.dim], ['−N/D₋', C.mag]], 170, 680, { size: 32, a: d1 * Q(S, 1, 'divides by the larger', 0.6) });
  const d2 = a * Q(S, 1, 'shares add to one', 0.6);
  rich([['D₊ + D₋ = (1 + |a|²)(1 + |b|²) ≥ 1', C.white]], 170, 745, { size: 28, a: d2 });
  rich([['max share ≥ ½', C.now]], 170, 800, { size: 30, a: d2 * Q(S, 1, 'never below one half', 0.6) });
  /* right: the share bars for the two examples */
  const r = a * Q(S, 1, 'shares add to one', 0.6);
  panel(980, 200, 810, 625, a * at(S, 1, 0.6), C.cyan, 'SHARES · 两份额');
  const bx = 1030, bw = 700;
  txt('D₊ share', bx, 270, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: r });
  txt('D₋ share', bx + bw, 270, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.mag, a: r });
  txt('½', bx + bw / 2, 270, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: r });
  const eA = RW_EX[0], eB = RW_EX[1];
  const fB = a * at(S, 2, 0.6);
  txt('A:  a = (½, 0, 0),  b = (0, ½, 0)', bx, 325, { size: 24, fam: F.math, w: 700, c: C.white, a: r });
  shareBar(bx, 345, bw, eA, r, r > 0 && fB <= 0);
  txt('→ D₊ chart · a ⋆ b = (6/17, 6/17, 8/17)', bx, 440, { size: 22, fam: F.math, w: 700, c: C.cyan, a: r });
  txt('B:  a = (1, 0, 0),  b = (½, ½, 0)', bx, 510, { size: 24, fam: F.math, w: 700, c: C.white, a: fB });
  shareBar(bx, 530, bw, eB, fB, true);
  const fB2 = a * Q(S, 2, 'shadow chart', 0.6);
  txt('→ D₋ chart · a ⋆ b = (−1/5, 0, −2/5)', bx, 625, { size: 22, fam: F.math, w: 700, c: C.mag, a: fB2 });
  /* the unit ball (x–z slice) with the outputs */
  const ballA = a * Q(S, 2, 'unit ball', 0.6);
  const ox = 1100, oy = 712, rr = 46;
  ring(ox, oy, rr, C.white, ballA * 0.8, 2);
  dot(ox + rr * fNum(eB.out[0]), oy - rr * fNum(eB.out[2]), 11, 'g', ballA);
  txt('|a ⋆ b|² = 1/5 ≤ 1', 1180, 708, { size: 26, fam: F.math, w: 700, c: C.white, a: ballA });
  txt('inside the closed unit ball · 落在单位闭球内', 1180, 745, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ballA });
  leanChip(1010, 810, 'half', a * Q(S, 3, 'Lean checks', 0.6), { size: 20 });
};

/* ======================================================================= */
/*                          scene 4 · NO SQUARE ROOT                         */
/* ======================================================================= */
/* oblique projection of three axes for the quarter turn */
function axP(v, cx, cy, s) { return [cx + s * (v[1] - 0.45 * v[0]), cy - s * (v[2] - 0.32 * v[0])]; }
SCENES.adjoint = S => {
  const u = S.u, a = fade(S);
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* left: p and its norm; the root that is not needed */
  panel(140, 200, 820, 270, a, C.cyan, 'p = (1, 1, 0, 0) · pHalf');
  rich([['|p|² = 1² + 1² = ', C.white], ['2', C.now]], 170, 280, { size: 36, a });
  const r1 = a * Q(S, 1, 'root two', 0.6);
  rich([['p / |p| = (1 + i)/√2', C.dim]], 170, 345, { size: 32, a: r1 });
  if (r1 > 0.003) line(170, 334, 170 + tw('p / |p| = (1 + i)/√2', 32, F.math, 700), 334, C.mag, r1 * Q(S, 1, 'but p and p bar', 0.6), 3);
  const r2 = a * Q(S, 1, 'p bar', 0.6);
  rich([['Ad(p) v = p v p̄ / |p|²', C.white]], 170, 410, { size: 32, a: r2 });
  rich([['√2 · √2 = ', C.dim], ['2', C.now]], 640, 410, { size: 32, a: a * Q(S, 1, 'plain two', 0.6) });
  /* the matrix */
  const m1 = a * at(S, 2, 0.6);
  panel(140, 500, 820, 325, m1, C.cyan, 'Ad(1, 1, 0, 0)');
  txt('½', 175, 645, { size: 44, fam: F.math, w: 700, c: C.now, a: m1 * (1 - Q(S, 2, 'Every entry', 0.8)) });
  const M0 = RW_AD[0].M, coll = Q(S, 2, 'Every entry', 0.8);
  matrix(M0.map(r => r.map(c => String(c))), 220, 600, { size: 34, cw: 70, a: m1 * (1 - coll) });
  matrix(M0.map(r => r.map(c => String(c / 2n))), 220, 600, { size: 34, cw: 70, a: m1 * coll, c: C.cyan });
  txt('=', 485, 645, { size: 40, fam: F.math, w: 700, c: C.white, a: m1 * coll });
  txt('(x, y, z) ↦ (x, −z, y)', 530, 625, { size: 30, fam: F.math, w: 700, c: C.white, a: m1 * Q(S, 2, 'quarter turn', 0.6) });
  txt('SO(3, ℤ) · 90° about x', 530, 680, { size: 26, fam: F.mono, w: 700, c: C.now, a: m1 * Q(S, 2, 'quarter turn', 0.6) });
  stamp('90°', 830, 770, a * Q(S, 2, 'quarter turn', 0.5), C.now, 44, -0.06);
  /* right: the axes turning */
  const cx = 1180, cy = 470, s = 190;
  const tq = ease(Q(S, 2, 'quarter turn', 1.6)), th = tq * Math.PI / 2;
  const ax = [[[1, 0, 0], 'x', C.white], [[0, Math.cos(th), Math.sin(th)], 'y', C.cyan], [[0, -Math.sin(th), Math.cos(th)], 'z', C.mag]];
  const al = a * at(S, 0, 0.8);
  panel(1000, 200, 790, 400, al, C.dim, 'AXES · 坐标轴');
  const o = axP([0, 0, 0], cx, cy, s);
  [[1, 0, 0], [0, 1, 0], [0, 0, 1]].forEach(e => { const p = axP(e, cx, cy, s); dashed(o[0], o[1], p[0], p[1], C.dim, al * 0.5, 1.5); });
  ax.forEach(([v, n, col]) => {
    const p = axP(v, cx, cy, s);
    arrow(o[0], o[1], p[0], p[1], col, al, 4);
    txt(n + (tq > 0.02 && n !== 'x' ? '′' : ''), p[0] + (n === 'x' ? -34 : 14), p[1] + (n === 'x' ? 28 : -10), { size: 30, fam: F.math, w: 700, c: col, a: al });
  });
  if (tq > 0.01) { ctx.save(); ctx.globalAlpha = al; ctx.strokeStyle = C.now; ctx.lineWidth = 3; ctx.beginPath(); for (let k = 0; k <= 30; k++) { const t = th * k / 30, p = axP([0, 0.55 * Math.cos(t), 0.55 * Math.sin(t)], cx, cy, s); if (k) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); } ctx.stroke(); ctx.restore(); }
  /* line 3: the other two examples */
  const e3 = a * at(S, 2, 0.6, 3.2);
  panel(1000, 625, 790, 200, e3, C.cyan, 'MORE · 另两例');
  rich([['(1, 1, 1, 1):  N = 4,  ', C.white], ['(x, y, z) ↦ (z, x, y)', C.cyan]], 1025, 685, { size: 26, a: e3 });
  rich([['(1, 2, 0, 0):  N = 5,  ⅕', C.white]], 1025, 748, { size: 26, a: e3 });
  matrix(RW_AD[2].M.map(r => r.map(c => String(c))), 1360, 718, { size: 20, cw: 46, rh: 24, a: e3, c: C.cyan });
  leanChip(1025, 812, 'addot', a * Q(S, 3, 'Lean checks', 0.6), { size: 20 });
};

/* ======================================================================= */
/*                         scene 5 · CHEBYSHEV BEATS                         */
/* ======================================================================= */
SCENES.beats = S => {
  const u = S.u, a = fade(S);
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  const cx = 470, cy = 430, R = 215;
  ring(cx, cy, R, C.cyan, a * 0.55, 2);
  line(cx - R - 30, cy, cx + R + 30, cy, C.dim, a * 0.35, 1); line(cx, cy - R - 30, cx, cy + R + 30, C.dim, a * 0.35, 1);
  txt('1', cx + R + 12, cy + 36, { size: 22, fam: F.math, w: 700, c: C.dim, a });
  txt('i', cx + 10, cy - R - 34, { size: 22, fam: F.math, w: 700, c: C.dim, a });
  /* beats shown so far: 1 during line 0, then up to 4 in lines 1–2, then 20 in line 3 */
  let nb = 1 + (Q(S, 0, 'three fifths plus', 0.3) > 0 ? 0 : -1);
  nb = Math.max(nb, 1 + Math.floor(3 * Q(S, 1, 'six fifths', 2.4) + 1e-9));
  if (at(S, 2, 1) > 0) nb = Math.max(nb, 4 + Math.floor(16 * Q(S, 2, 'Twenty beats on', 2.6) + 1e-9));
  const pos = n => { const p = RW_BEATS[n], d = Math.pow(5, n); return [cx + R * Number(p[0]) / d, cy - R * Number(p[1]) / d]; };
  for (let n = 0; n <= nb; n++) { const q = pos(n); dot(q[0], q[1], n === nb ? 15 : 9, n === nb ? 'g' : 'c', a * (n === nb ? 1 : 0.8)); }
  if (nb >= 1) { const q = pos(nb); arrow(cx, cy, q[0], q[1], C.now, a, 3); }
  if (nb <= 4) for (let n = 0; n <= nb; n++) { const q = pos(n), dx = q[0] - cx, dy = q[1] - cy, k = Math.hypot(dx, dy) || 1; txt('x' + '₀₁₂₃₄'[n], q[0] + dx / k * 34, q[1] + dy / k * 34 + 8, { size: 22, fam: F.math, w: 700, align: 'center', c: C.white, a }); }
  /* κ bars under the circle: the rational harmonic */
  const kb = a * Q(S, 1, 'Chebyshev value', 0.8);
  const bx = 150, by = 812, bw = 34, bh = 120;
  txt('κ(x₀, xₙ) = (1 + Tₙ)/2', bx, by - bh - 14, { size: 22, fam: F.math, w: 700, c: C.white, a: kb });
  for (let n = 0; n <= Math.min(nb, 20); n++) { const k = fNum(RW_KAPPA[n]); fillBox(bx + n * bw, by - bh * k, bw - 8, bh * k, n === nb ? C.now : C.cyan, kb * 0.85); }
  line(bx, by, bx + 21 * bw, by, C.dim, kb * 0.6, 1);
  /* the ledger */
  panel(980, 200, 810, 625, a, C.cyan, 'HEAP BEATS · 流群节拍');
  rich([['x₀ = 1,  x₁ = 3/5 + 4/5 i,  c = ', C.white], ['3/5', C.now]], 1005, 265, { size: 28, a });
  rich([['xₙ₊₁ = ', C.white], ['6/5', C.now], [' xₙ − xₙ₋₁', C.white]], 1005, 320, { size: 30, a: a * Q(S, 1, 'turns linear', 0.6) });
  const tab = a * Q(S, 1, 'six fifths', 0.6);
  const col = [1005, 1060, 1380, 1620];
  ['n', 'xₙ', 'Tₙ(3/5)', 'κ'].forEach((h, i) => txt(h, col[i], 375, { size: 22, fam: F.mono, w: 700, c: C.dim, a: tab }));
  for (let n = 0; n <= 4; n++) {
    const ra = tab * (n <= nb ? 1 : 0.15), y = 420 + n * 42, p = RW_BEATS[n], d = 5n ** BigInt(n);
    const cc = n === nb && nb <= 4 ? C.now : C.white;
    txt(String(n), col[0], y, { size: 24, fam: F.mono, w: 700, c: cc, a: ra });
    txt(`(${fStr(fq(p[0], d))}, ${fStr(fq(p[1], d))})`, col[1], y, { size: 24, fam: F.mono, w: 700, c: cc, a: ra });
    txt(fStr(RW_T[n]), col[2], y, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: ra * kb });
    txt(fStr(RW_KAPPA[n]), col[3], y, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: ra * kb });
  }
  /* line 3: beat n up to 20 */
  const b3 = a * at(S, 2, 0.6);
  const n20 = Math.max(4, Math.min(20, nb)), p = RW_BEATS[n20];
  rich([['beat ', C.white], [String(n20), C.now], [':  ( ', C.white]], 1005, 660, { size: 26, a: b3 });
  txt(`${neg(p[0])},`, 1005, 700, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: b3 });
  txt(`${neg(p[1])} ) / 5${sup(n20)}`, 1005, 735, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: b3 });
  rich([['|xₙ|² = ', C.white], ['1/1', C.now]], 1530, 700, { size: 30, a: b3 });
  leanChip(1005, 790, 'heap', a * Q(S, 3, 'Lean checks', 0.6), { size: 18 });
  leanChip(1395, 790, 'cheb', a * Q(S, 3, 'classical side', 0.6), { size: 18 });
};

/* ======================================================================= */
/*                          scene 6 · WHERE PI ENTERS                        */
/* ======================================================================= */
function sphP(v, cx, cy, s, yaw, pitch) {
  const x1 = v[0] * Math.cos(yaw) - v[1] * Math.sin(yaw), y1 = v[0] * Math.sin(yaw) + v[1] * Math.cos(yaw), z1 = v[2];
  return [cx + s * x1, cy - s * (z1 * Math.cos(pitch) - y1 * Math.sin(pitch)), y1 * Math.cos(pitch) + z1 * Math.sin(pitch)];
}
/* a circle on the unit sphere at angular radius 45° around the unit axis n, front part solid, back part faint */
function capCircle(n, cx, cy, s, yaw, pitch, col, a, lw = 2.5) {
  const t = Math.abs(n[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
  let e1 = [n[1] * t[2] - n[2] * t[1], n[2] * t[0] - n[0] * t[2], n[0] * t[1] - n[1] * t[0]]; const k = Math.hypot(...e1); e1 = e1.map(c => c / k);
  const e2 = [n[1] * e1[2] - n[2] * e1[1], n[2] * e1[0] - n[0] * e1[2], n[0] * e1[1] - n[1] * e1[0]];
  const c45 = Math.SQRT1_2;
  let prev = null;
  for (let i = 0; i <= 72; i++) {
    const th = TAU * i / 72, v = [0, 1, 2].map(j => c45 * n[j] + c45 * (Math.cos(th) * e1[j] + Math.sin(th) * e2[j]));
    const p = sphP(v, cx, cy, s, yaw, pitch);
    if (prev) line(prev[0], prev[1], p[0], p[1], col, a * (p[2] > 0 && prev[2] > 0 ? 1 : 0.2), lw);
    prev = p;
  }
}
SCENES.pi = S => {
  const u = S.u, a = fade(S);
  badgeQ(S, [[0, null, 'argued'], [1, 'Lean checks', 'lean'], [2, null, 'computed'], [3, 'Lean checks', 'lean'], [4, null, 'argued']]);
  /* right top: the continuous ray */
  panel(980, 200, 810, 330, a, C.dim, 'A REAL CLOCK · 实数时钟');
  rich([['t ↦ exp(tX)', C.white]], 1010, 270, { size: 34, a });
  rich([['φ(g²) = (2φ(g) − 1)²', C.white], ['   continuous in t', C.dim]], 1010, 330, { size: 28, a: a * Q(S, 0, 'doubling reading', 0.6) });
  const c2 = a * Q(S, 1, 'cosine squared', 0.6);
  rich([['φ(exp tX) = cos²(t √(h(X,X)/2))', C.white]], 1010, 395, { size: 30, a: c2 });
  rich([['h(X, X) = ', C.white], ['2π²', C.now], [' / T²', C.white]], 1010, 455, { size: 32, a: a * Q(S, 1, 'two pi squared', 0.6) });
  leanChip(1010, 510, 'rays', a * Q(S, 1, 'Lean checks', 0.6), { size: 17 });
  /* left: a line stretched along t, before the sphere */
  const st = a * (1 - at(S, 2, 0.8));
  if (st > 0.003) {
    const ox = 170, oy = 520, L = 720;
    arrow(ox, oy, ox + L, oy, C.dim, st, 2);
    txt('t', ox + L + 16, oy + 8, { size: 28, fam: F.math, w: 700, c: C.dim, a: st });
    const pr = Q(S, 0, 'stretched', 2.4);
    /* the reading cos²(πt/T) with T = 240 px drawn as it unrolls */
    curve(k => { const x = k * L * pr; return [ox + x, oy - 200 * Math.pow(Math.cos(Math.PI * x / 240), 2)]; }, 160, C.cyan, st * (pr > 0 ? 1 : 0), 3);
    for (let m = 1; m <= 3; m++) { const x = ox + 240 * m; if (x <= ox + L * pr) { line(x, oy - 10, x, oy + 10, C.now, st, 3); txt(m === 1 ? 'T' : `${m}T`, x, oy + 42, { size: 24, fam: F.math, w: 700, align: 'center', c: C.now, a: st }); } }
    txt('a turn read on a real line · 在实数轴上读一次转动', ox, oy + 110, { size: 22, fam: F.zh, w: 700, c: C.dim, a: st * pr });
    txt('schematic · 示意', ox + L, oy + 110, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.argued, a: st * pr });
  }
  /* left: the sphere with six caps */
  const sa = a * at(S, 2, 0.8);
  if (sa > 0.003) {
    const cx = 540, cy = 470, s = 245, yaw = -0.55 + 0.012 * u, pitch = 0.42;
    ring(cx, cy, s, C.white, sa * 0.5, 1.5);
    for (let k = -2; k <= 2; k++) { const z = k / 3; let prev = null; for (let i = 0; i <= 60; i++) { const th = TAU * i / 60, r = Math.sqrt(1 - z * z), p = sphP([r * Math.cos(th), r * Math.sin(th), z], cx, cy, s, yaw, pitch); if (prev) line(prev[0], prev[1], p[0], p[1], C.dim, sa * (p[2] > 0 ? 0.35 : 0.1), 1); prev = p; } }
    const hl = Q(S, 2, 'twice the overlap', 0.6);
    RW_AXES.forEach((ax, i) => {
      /* the cap U_i is the pair of 45° caps around ±axis_i; draw the end that faces the viewer */
      let n = ax.map(c => c / Math.sqrt(5));
      if (sphP(n, cx, cy, s, yaw, pitch)[2] < 0) n = n.map(c => -c);
      const col = i % 2 ? C.mag : C.cyan, focus = i === 0 && hl > 0;
      const ca = sa * Q(S, 2, 'six integer axes', 1.6, i * 0.18);
      capCircle(n, cx, cy, s, yaw, pitch, focus ? C.now : col, ca, focus ? 3.5 : 2.2);
      const pc = sphP(n, cx, cy, s, yaw, pitch);
      dot(pc[0], pc[1], 6, focus ? 'g' : i % 2 ? 'm' : 'c', ca);
    });
    const xp = RW_XPT.map(c => c / 3), pp = sphP(xp, cx, cy, s, yaw, pitch);
    dot(pp[0], pp[1], 13, 'g', sa * hl);
    const xl = sa * hl * (1 - at(S, 4, 0.5));
    const lw0 = tw('x = (2, 2, 1)/3', 22, F.math, 700);
    fillBox(cx - lw0 / 2 - 10, cy + s + 22, lw0 + 20, 34, C.bg, xl * 0.8);
    txt('x = (2, 2, 1)/3', cx, cy + s + 47, { size: 22, fam: F.math, w: 700, align: 'center', c: C.now, a: xl });
    line(cx, cy + s + 22, pp[0], pp[1] + 10, C.now, xl * 0.6, 1.5);
    txt('amber cap: axis (1, 2, 0)', 150, 200, { size: 20, fam: F.mono, w: 700, c: C.now, a: sa * hl });
  }
  /* right bottom: the six-axis cover */
  const sb = a * at(S, 2, 0.6);
  panel(980, 555, 810, 270, sb, C.cyan, 'SIX AXES OF NORM 5 · 六根整轴');
  rich([['axisᵢ ∈ {(1, ±2, 0), (0, 1, ±2), (±2, 0, 1)}', C.white]], 1005, 620, { size: 26, a: sb });
  rich([['Uᵢ = { x ∈ S² : 2⟨x, axisᵢ⟩² > 5 }', C.white]], 1005, 670, { size: 26, a: a * Q(S, 2, 'each capped', 0.6) });
  rich([['x = (2, 2, 1)/3:  2·⟨x, (1, 2, 0)⟩² = ', C.white], ['8 > 5', C.now]], 1005, 720, { size: 24, a: a * Q(S, 2, 'twice the overlap', 0.6) });
  rich([['⋃ Uᵢ = S²,  no x ⊥ y inside one Uᵢ', C.white]], 1005, 765, { size: 24, a: a * at(S, 3, 0.6) });
  leanChip(1005, 808, 'six', a * Q(S, 3, 'Lean checks', 0.6), { size: 18 });
  /* line 5: the chapter's reading */
  const r5 = a * at(S, 4, 0.6);
  if (r5 > 0.003) {
    fillBox(140, 760, 760, 70, C.bg, r5 * 0.85);
    box(140, 760, 760, 70, C.argued, r5, 2);
    txt('π = the price of a real clock · π 是实数时钟的代价', 520, 805, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.argued, a: r5 });
  }
};

/* ======================================================================= */
/*                                 closing                                   */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 245 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[1], t = sc.start + 6;
  background(t, sc, 1, 6);
  const cx = 1340, cy = 540, R = 230;
  ring(cx, cy, R, C.cyan, 0.6, 2);
  ctx.save(); ctx.strokeStyle = C.mag; ctx.lineWidth = 3; ctx.beginPath();
  RW_TAY_PTS.forEach((p, n) => { const q = [cx + R * p[0], cy - R * p[1]]; if (n) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); });
  ctx.stroke(); ctx.restore();
  RW_TAY_PTS.forEach((p, n) => { if (n) dot(cx + R * p[0], cy - R * p[1], 10, 'm', 1); });
  RW_CAY_PTS.forEach((p, n) => dot(cx + R * p[0], cy - R * p[1], n === 12 ? 18 : 11, n === 12 ? 'g' : 'c', 1));
  txt(DATA.film.title_zh, 600, 440, { size: 104, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('ROTATION WITHOUT', 600, 550, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('EXPONENTIALS', 600, 620, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 5 });
  txt('R = ⅓ [[2, 1, 2], [1, 2, −2], [−2, 2, 1]]', 600, 720, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white });
  txt(`${DATA.book.code}`, 600, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 10 });
};
