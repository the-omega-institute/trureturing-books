/* Film · A Root as a Pair · 以数对为根 (book omega-math, chapter 12).
   Scenes for the shared engine theme/film/engine.js.

   What each scene shows, and where it rests (chapter 12 of the book):
     pair      an element of QuadPoly(b, c) is a pair (p, q) of fractions read as p + qα, with the single rule
               α² = bα + c; the product (p, q)(r, s) = (pr + cqs, ps + qr + bqs) (definition def-ch12-quadpoly);
               the expansion is shown and re-checked on load against real arithmetic (computed).
     norm      conjugate (p + bq, −q), the α-part of z·z̄ cancels, norm N = p² + bpq − cq², inverse z̄ / N
               (definition); the worked pair (1, 1) in QSqrt2: N = −1, inverse (−1, 1), product (1, 0)
               (example ex-ch12-quadpoly-ledger, computed) ..... OmegaQuadraticAndSchur.quadratic_mul_inv (LEAN:
               z · z⁻¹ ≡ 1 whenever the norm numerator is nonzero, for every integral b, c). The chapter records
               strict_omega.axioms: [] for its D5 declarations; the on-screen note says "strict backend".
     spinor    QSqrt2 (b = 0, c = 2, δ² = 2); u = (δ/2)(1 + i); normSq u = 1/2 + 1/2 = 1; u² = i, u⁴ = −1,
               u⁸ = 1; the adjoint turns 90° per beat (chapter 12.2.1). Every power is computed exactly in
               QSqrt2[i] ..... OmegaQuadraticAndSchur.sqrt_two_spinor (LEAN: normSq u90 ≡ 1 and u90⁸ ≡ 1).
     golden    QPhi (b = c = 1, φ² = φ + 1); multiplication by φ sends (p, q) to (q, p + q); φⁿ = (F_{n−1}, F_n)
               for n = 1…12, φ¹² = (89, 144), N(89, 144) = 7921 + 12816 − 20736 = 1 (computed) .....
               OmegaQuadraticAndSchur.phi_power_norm (LEAN: N(φⁿ) ≡ (−1)ⁿ for every n).
     pentagon  T₀ = 1, T₁ = x, T_{k+1} = 2x T_k − T_{k−1} at x = φ/2 = (0, 1/2), computed exactly as pairs for
               k = 0…10; T₅ = −1, T₁₀ = 1; also T₅((φ − 1)/2) = 1 (computed). The decagon drawing places the
               value T_k at angle k·36°, using φ ≈ 1.618 only to position points (picture, labelled); the match
               T_k = cos(kπ/5) is checked numerically on load ..... OmegaChebyshevHecke.pentagonal_chebyshev
               (LEAN: T₅(φ/2) ≡ −1, T₁₀(φ/2) ≡ 1, T₅((φ − 1)/2) ≡ 1 in QPhi).
     squares   the pairs (1, 2), (3, 1), (2, 5): Σu² = 14, Σv² = 30, Σuv = 15, gramDet = 420 − 225 = 195; minors
               −5, 1, 13 with squares summing to 195 (computed); the minors are drawn as signed parallelogram
               areas ..... OmegaQuadraticAndSchur.rational_lagrange_gram (LEAN: gramDet xs ≡ minorSquares xs);
               225 ≤ 420 (computed).
     gram      GramIsometryExtension.existsUnique_linearIsometryEquiv_of_gram_preserving (LEAN, classical real
               shadow: a Gram-preserving permutation of a spanning family extends to a unique linear isometry);
               the chapter's two hand examples: e₁, 2e₂ swapped (norm 1 → 2, no isometry) and e₁ alone (identity
               and the reflection across the e₁-axis both extend), computed.
     close     the closing card; the turn to Volume V is the chapter's closing paragraph (argued).

   On load, FILM.init checks DATA.lean against the six theorems and re-derives every number shown on screen by an
   independent route; any disagreement goes to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const RP_LEAN = {
  inv: 'D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.quadratic_mul_inv',
  spinor: 'D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.sqrt_two_spinor',
  phinorm: 'D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.phi_power_norm',
  penta: 'D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.pentagonal_chebyshev',
  lagrange: 'D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.rational_lagrange_gram',
  isometry: 'D5/S3/Quantum/AURICOmega/GramIsometryExtension.existsUnique_linearIsometryEquiv_of_gram_preserving'
};
const RP_SHORT = {
  inv: 'quadratic_mul_inv', spinor: 'sqrt_two_spinor', phinorm: 'phi_power_norm', penta: 'pentagonal_chebyshev',
  lagrange: 'rational_lagrange_gram', isometry: 'existsUnique_linearIsometryEquiv_of_gram_preserving'
};

/* exact rationals [n, d] with d > 0, in lowest terms */
const rgcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a || 1; };
const fr = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = rgcd(n, d); return [n / g, d / g]; };
const fadd = (x, y) => fr(x[0] * y[1] + y[0] * x[1], x[1] * y[1]);
const fneg = x => [-x[0], x[1]];
const fsub = (x, y) => fadd(x, fneg(y));
const fmul = (x, y) => fr(x[0] * y[0], x[1] * y[1]);
const fdiv = (x, y) => fr(x[0] * y[1], x[1] * y[0]);
const feq = (x, y) => x[0] * y[1] === y[0] * x[1];
const fnum = x => x[0] / x[1];
const fstr = x => (x[0] < 0 ? '−' : '') + (x[1] === 1 ? String(Math.abs(x[0])) : `${Math.abs(x[0])}/${x[1]}`);

/* QuadPoly(b, c): pairs (p, q) = p + qα with α² = bα + c, entries exact rationals */
const QP = (b, c) => {
  const B = fr(b), Cc = fr(c);
  const mul = (z, w) => [fadd(fmul(z[0], w[0]), fmul(Cc, fmul(z[1], w[1]))),
    fadd(fadd(fmul(z[0], w[1]), fmul(z[1], w[0])), fmul(B, fmul(z[1], w[1])))];
  const add = (z, w) => [fadd(z[0], w[0]), fadd(z[1], w[1])];
  const sub = (z, w) => [fsub(z[0], w[0]), fsub(z[1], w[1])];
  const conj = z => [fadd(z[0], fmul(B, z[1])), fneg(z[1])];
  const norm = z => fsub(fadd(fmul(z[0], z[0]), fmul(B, fmul(z[0], z[1]))), fmul(Cc, fmul(z[1], z[1])));
  const inv = z => { const N = norm(z), k = conj(z); return [fdiv(k[0], N), fdiv(k[1], N)]; };
  const eq = (z, w) => feq(z[0], w[0]) && feq(z[1], w[1]);
  const of = (p, q = 0) => [fr(p), fr(q)];
  return { b, c, mul, add, sub, conj, norm, inv, eq, of };
};
const Q2 = QP(0, 2), QF = QP(1, 1);
const pr = (p, q) => [typeof p === 'number' ? fr(p) : p, typeof q === 'number' ? fr(q) : q];
const pairStr = z => `(${fstr(z[0])}, ${fstr(z[1])})`;
/* p + qσ written the way the chapter writes it: φ/2, (φ − 1)/2, (1 − φ)/2, −φ/2, −1 */
function algStr(z, sym) {
  const d = z[0][1] * z[1][1] / rgcd(z[0][1], z[1][1]);
  const a = z[0][0] * d / z[0][1], b = z[1][0] * d / z[1][1];
  const term = (k, s) => (s ? (Math.abs(k) === 1 ? s : `${Math.abs(k)}${s}`) : String(Math.abs(k)));
  const parts = [];
  if (a) parts.push([a, term(a, '')]);
  if (b) parts.push([b, term(b, sym)]);
  if (!parts.length) return '0';
  if (parts.length === 2 && parts[0][0] < 0 && parts[1][0] > 0) parts.reverse();
  let s = (parts[0][0] < 0 ? '−' : '') + parts[0][1];
  if (parts.length === 2) s += (parts[1][0] < 0 ? ' − ' : ' + ') + parts[1][1];
  if (d === 1) return s;
  if (parts.length === 1) return `${s}/${d}`;
  return `(${s})/${d}`;
}

/* NORM: the worked pair (1, 1) of QSqrt2 */
const NM_Z = pr(1, 1), NM_N = Q2.norm(NM_Z), NM_INV = Q2.inv(NM_Z), NM_PROD = Q2.mul(NM_Z, NM_INV);

/* SPINOR: Gaussian numbers over QSqrt2, [re, im] with re, im pairs; u = (δ/2)(1 + i) */
const gmul = (x, y) => [Q2.sub(Q2.mul(x[0], y[0]), Q2.mul(x[1], y[1])), Q2.add(Q2.mul(x[0], y[1]), Q2.mul(x[1], y[0]))];
const SP_U = [pr(0, fr(1, 2)), pr(0, fr(1, 2))];
const SP_NORMSQ = Q2.add(Q2.mul(SP_U[0], SP_U[0]), Q2.mul(SP_U[1], SP_U[1]));
const SP_POW = [[Q2.of(1), Q2.of(0)]];
for (let k = 1; k <= 8; k++) SP_POW.push(gmul(SP_POW[k - 1], SP_U));
function gStr(g) {
  const re = g[0], im = g[1], z0 = Q2.eq(re, Q2.of(0)), z1 = Q2.eq(im, Q2.of(0));
  const s = z => algStr(z, 'δ');
  if (z1) return s(re);
  const imS = Q2.eq(im, Q2.of(1)) ? 'i' : Q2.eq(im, Q2.of(-1)) ? '−i' : `${s(im)}·i`;
  if (z0) return imS;
  return `${s(re)} ${imS[0] === '−' ? '− ' + imS.slice(1) : '+ ' + imS}`;
}

/* GOLDEN: φⁿ = φ^{n−1}·φ for n = 1…12, and the Fibonacci numbers by their own recurrence */
const PHI = pr(0, 1);
const GD_POW = [QF.of(1)];
for (let n = 1; n <= 12; n++) GD_POW.push(QF.mul(GD_POW[n - 1], PHI));
const FIB = [0, 1];
for (let n = 2; n <= 13; n++) FIB.push(FIB[n - 1] + FIB[n - 2]);

/* PENTAGON: first-kind Chebyshev T₀ = 1, T₁ = x, T_{k+1} = 2x·T_k − T_{k−1} in QPhi */
function cheb(x, K) {
  const T = [QF.of(1), x], two = QF.of(2);
  for (let k = 1; k < K; k++) T.push(QF.sub(QF.mul(QF.mul(two, x), T[k]), T[k - 1]));
  return T;
}
const PT_X1 = pr(0, fr(1, 2)), PT_X2 = pr(fr(-1, 2), fr(1, 2));
const PT_T = cheb(PT_X1, 10), PT_T2 = cheb(PT_X2, 5);
const PHI_NUM = (1 + Math.sqrt(5)) / 2;          // for placing points on the drawing only
const pnum = z => fnum(z[0]) + fnum(z[1]) * PHI_NUM;

/* SQUARES: three rational coordinate pairs, the Gram determinant and the squared minors */
const SQ_XS = [[1, 2], [3, 1], [2, 5]];
const SQ_U2 = SQ_XS.reduce((s, [u]) => s + u * u, 0), SQ_V2 = SQ_XS.reduce((s, [, v]) => s + v * v, 0);
const SQ_UV = SQ_XS.reduce((s, [u, v]) => s + u * v, 0);
const SQ_DET = SQ_U2 * SQ_V2 - SQ_UV * SQ_UV;
const SQ_MIN = [];
for (let i = 0; i < SQ_XS.length; i++) for (let j = i + 1; j < SQ_XS.length; j++)
  SQ_MIN.push({ i, j, m: SQ_XS[i][0] * SQ_XS[j][1] - SQ_XS[j][0] * SQ_XS[i][1] });
const SQ_MSUM = SQ_MIN.reduce((s, r) => s + r.m * r.m, 0);

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('a-root-as-a-pair film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(RP_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(RP_LEAN).length}`);
  for (const [k, gid] of Object.entries(RP_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === RP_SHORT[k], `${gid} resolves to ${r.name}`);
  }

  /* 1. PAIR: the product rule agrees with real arithmetic, α a root of α² = bα + c */
  for (const [b, c] of [[0, 2], [1, 1], [2, 3], [-1, 5]]) {
    const R = QP(b, c), al = (b + Math.sqrt(b * b + 4 * c)) / 2;
    check(near(al * al, b * al + c), `α² = bα + c for b = ${b}, c = ${c}`);
    for (let t = 0; t < 12; t++) {
      const z = pr(Math.floor(rnd(t, b + 1) * 13) - 6, Math.floor(rnd(t, c + 9) * 13) - 6);
      const w = pr(Math.floor(rnd(t, b + 3) * 13) - 6, Math.floor(rnd(t, c + 4) * 13) - 6);
      const val = x => fnum(x[0]) + fnum(x[1]) * al;
      check(near(val(R.mul(z, w)), val(z) * val(w), 1e-7), `product of pairs ${t} (b = ${b}, c = ${c})`);
      /* z·z̄ = (N, 0) and N(zw) = N(z)N(w) */
      const zz = R.mul(z, R.conj(z));
      check(feq(zz[1], fr(0)) && feq(zz[0], R.norm(z)), `z·z̄ = (N, 0) (${t})`);
      check(feq(R.norm(R.mul(z, w)), fmul(R.norm(z), R.norm(w))), `N(zw) = N(z)N(w) (${t})`);
      if (R.norm(z)[0] !== 0) check(R.eq(R.mul(z, R.inv(z)), R.of(1)), `z·z⁻¹ = 1 (${t})`);
    }
  }

  /* 2. NORM: (1, 1) in QSqrt2 */
  check(feq(NM_N, fr(-1)), 'N(1, 1) = −1');
  check(Q2.eq(NM_INV, pr(-1, 1)), 'inverse of (1, 1) is (−1, 1)');
  check(Q2.eq(NM_PROD, Q2.of(1)), '(1, 1)(−1, 1) = (1, 0)');
  check(near(1 / (1 + Math.SQRT2), -1 + Math.SQRT2), '1/(1 + √2) = −1 + √2');

  /* 3. SPINOR: normSq 1, the eight beats, and a floating-point look */
  check(Q2.eq(SP_NORMSQ, Q2.of(1)), 'normSq u = 1');
  const gEq = (g, re, im) => Q2.eq(g[0], Q2.of(re)) && Q2.eq(g[1], Q2.of(im));
  check(gEq(SP_POW[2], 0, 1) && gEq(SP_POW[4], -1, 0) && gEq(SP_POW[8], 1, 0), 'u² = i, u⁴ = −1, u⁸ = 1');
  for (let k = 1; k < 8; k++) check(!gEq(SP_POW[k], 1, 0), `u^${k} ≠ 1`);
  SP_POW.forEach((g, k) => {
    const re = fnum(g[0][0]) + fnum(g[0][1]) * Math.SQRT2, im = fnum(g[1][0]) + fnum(g[1][1]) * Math.SQRT2;
    check(near(re, Math.cos(k * Math.PI / 4)) && near(im, Math.sin(k * Math.PI / 4)), `u^${k} at ${45 * k}°`);
  });
  check(gStr(SP_POW[1]) === 'δ/2 + δ/2·i' && gStr(SP_POW[2]) === 'i' && gStr(SP_POW[4]) === '−1', `spinor labels ${gStr(SP_POW[1])}`);

  /* 4. GOLDEN: φⁿ = (F_{n−1}, F_n), norms (−1)ⁿ, the twelfth power */
  for (let n = 1; n <= 12; n++) {
    check(QF.eq(GD_POW[n], pr(FIB[n - 1], FIB[n])), `φ^${n} = (F_${n - 1}, F_${n})`);
    check(feq(QF.norm(GD_POW[n]), fr(n % 2 ? -1 : 1)), `N(φ^${n}) = (−1)^${n}`);
    check(FIB[n + 1] * FIB[n - 1] - FIB[n] * FIB[n] === (n % 2 ? -1 : 1), `Cassini at ${n}`);
    check(near(pnum(GD_POW[n]), Math.pow(PHI_NUM, n), 1e-6), `φ^${n} numerically`);
  }
  check(FIB[11] === 89 && FIB[12] === 144 && 89 * 89 === 7921 && 89 * 144 === 12816 && 144 * 144 === 20736 && 7921 + 12816 - 20736 === 1, 'N(89, 144) = 1');
  check(QF.eq(QF.mul(pr(5, 8), PHI), pr(8, 13)), '(p, q)·φ = (q, p + q)');

  /* 5. PENTAGON: the orbit, the closures, and the decagon picture */
  check(QF.eq(PT_T[5], QF.of(-1)) && QF.eq(PT_T[10], QF.of(1)) && QF.eq(PT_T2[5], QF.of(1)), 'T₅(φ/2) = −1, T₁₀(φ/2) = 1, T₅((φ − 1)/2) = 1');
  const wantT = ['1', 'φ/2', '(φ − 1)/2', '(1 − φ)/2', '−φ/2', '−1'];
  wantT.forEach((s, k) => check(algStr(PT_T[k], 'φ') === s, `T_${k} reads ${algStr(PT_T[k], 'φ')}, the chapter has ${s}`));
  PT_T.forEach((z, k) => check(near(pnum(z), Math.cos(k * Math.PI / 5)), `T_${k}(φ/2) = cos(${k}π/5)`));
  /* index doubling T₁₀ = 2T₅² − 1, and the factorisation T₅ + 1 = (x + 1)(4x² − 2x − 1)² at x = φ/2 */
  check(QF.eq(QF.sub(QF.mul(QF.of(2), QF.mul(PT_T[5], PT_T[5])), QF.of(1)), PT_T[10]), 'T₁₀ = 2T₅² − 1');
  const x = PT_X1, q4 = QF.sub(QF.sub(QF.mul(QF.of(4), QF.mul(x, x)), QF.mul(QF.of(2), x)), QF.of(1));
  check(QF.eq(q4, QF.of(0)), '4x² − 2x − 1 = 0 at x = φ/2');

  /* 6. SQUARES: the Lagrange identity by a second route, Cauchy–Schwarz, the Schur example */
  check(SQ_U2 === 14 && SQ_V2 === 30 && SQ_UV === 15 && SQ_DET === 195, 'Σu² = 14, Σv² = 30, Σuv = 15, det = 195');
  check(SQ_MIN.map(r => r.m).join() === '-5,1,13' && SQ_MSUM === 195, 'minors −5, 1, 13; squares 195');
  {
    /* half the full double sum over i, j */
    let s = 0;
    for (const p of SQ_XS) for (const q of SQ_XS) s += Math.pow(p[0] * q[1] - q[0] * p[1], 2);
    check(s / 2 === SQ_DET, 'gramDet = ½ Σᵢⱼ minors²');
    check(SQ_UV * SQ_UV <= SQ_U2 * SQ_V2 && SQ_UV * SQ_UV === 225 && SQ_U2 * SQ_V2 === 420, '225 ≤ 420');
  }

  /* 7. GRAM: the two hand examples */
  {
    const e1 = [1, 0], f2 = [0, 2], dot2 = (p, q) => p[0] * q[0] + p[1] * q[1];
    check(dot2(e1, e1) === 1 && dot2(f2, f2) === 4 && dot2(e1, f2) === 0, 'Gram matrix of e₁, 2e₂ is diag(1, 4)');
    check(dot2(f2, f2) !== dot2(e1, e1), 'the swap does not preserve the Gram matrix');
    const refl = v => [v[0], -v[1]];
    check(dot2(refl(e1), refl(e1)) === 1 && refl(e1).join() === e1.join() && refl([0, 1]).join() !== '0,1', 'the reflection fixes e₁ and moves e₂');
  }
});
Object.assign(FILM.speed, { pair: 0.02, norm: 0.014, spinor: 0.016, golden: 0.016, pentagon: 0.018, squares: 0.014, gram: 0.014, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const rpFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function rpRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  const tot = parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0);
  if (o.align === 'center') cx = x - tot / 2;
  else if (o.align === 'right') cx = x - tot;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a }); cx += tw(s, size, fam, w); }
  return cx;
}
const RP_MISSING = new Set();
function rpLean(x, y, key, a, o = {}) {
  if (a <= 0.003) return;
  const gid = RP_LEAN[key], r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!RP_MISSING.has(gid)) { RP_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(o.label || RP_SHORT[key], x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a free-standing grounds tag */
function rpTag(x, y, kind, text, a) {
  if (a <= 0.003) return;
  const K = { computed: ['NUM', C.cyan], argued: ['ARGUED', C.argued], picture: ['PICTURE', C.argued] }[kind];
  const [head, col] = K, hw = tw(head, 15, F.mono, 700, 2) + 20, bw = tw(text, 16, F.zh, 700) + 24;
  fillBox(x + hw, y - 22, bw, 30, mix(col, C.bg, 0.84), a * 0.9);
  box(x, y - 22, hw + bw, 30, col, a * 0.8, 1);
  fillBox(x, y - 22, hw, 30, col, a);
  txt(head, x + 10, y - 1, { size: 15, fam: F.mono, w: 700, c: C.bg, a, ls: 2 });
  txt(text, x + hw + 12, y - 1, { size: 16, fam: F.zh, w: 700, c: col, a });
}
function rpTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.3) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.4);
  txt(`${DATA.book.code} · FILM`, W / 2, 360, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 500, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('A ROOT AS A PAIR', p, 5), W / 2, 600, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('PAIRS · NORMS · SPINORS · GOLDEN POWERS · SQUARES · RIGIDITY', W / 2, 680, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 5 });
}
function poly(pts, col, a, fill = 0.2, lw = 2) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.beginPath();
  pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath();
  if (fill) { ctx.fillStyle = rgba(col, fill); ctx.fill(); }
  if (lw) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); }
  ctx.restore();
}

/* ======================================================================= */
/*                          scene 1 · A ROOT AS A PAIR                       */
/* ======================================================================= */
SCENES.pair = S => {
  const u = S.u;
  rpTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* line 0: the real line, struck out */
  const ra = a * (1 - 0.65 * at(S, 1, 0.8));
  {
    const y = 250, x0 = 160, x1 = 900;
    line(x0, y, x1, y, C.dim, ra, 2);
    for (let i = 0; i <= 24; i++) line(x0 + i * (x1 - x0) / 24, y - (i % 4 ? 6 : 12), x0 + i * (x1 - x0) / 24, y + (i % 4 ? 6 : 12), C.dim, ra * 0.7, 1);
    txt('ℝ · the real line · 实数轴', x0, y - 30, { size: 24, fam: F.zh, w: 700, c: C.dim, a: ra });
    const sx = x0 + (Math.SQRT2 + 1) / 4 * (x1 - x0) * 0.5;
    dot(sx, y, 9, 'm', ra); txt('√2 = 1.41421356…', sx, y + 46, { size: 24, fam: F.math, w: 700, align: 'center', c: C.mag, a: ra });
    const k = Q(S, 0, 'never need', 0.6);
    if (k > 0) line(x0 - 10, y, x0 - 10 + (x1 - x0 + 20) * k, y, C.mag, ra, 4);
    txt('not needed · 不需要', x1, y + 46, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.mag, a: ra * k });
  }
  /* line 1: the pair */
  const pa = a * at(S, 1, 0.6);
  panel(140, 340, 780, 220, pa, C.cyan, 'A PAIR OF FRACTIONS · 一对分数');
  if (pa > 0.003) {
    chip(300, 445, 220, 76, '(p, q)', C.cyan, pa, 40, F.math);
    txt('⟷', 470, 460, { size: 44, fam: F.math, w: 700, align: 'center', c: C.white, a: pa * Q(S, 1, 'read the pair', 0.5) });
    chip(680, 445, 300, 76, 'p + qα', C.white, pa * Q(S, 1, 'read the pair', 0.5), 40, F.math);
    txt('p, q ∈ ℚ    e.g. (3/2, −1) = 3/2 − α', 170, 530, { size: 24, fam: F.math, w: 700, c: C.dim, a: pa });
  }
  /* line 2: the rule and the product */
  const ka = a * at(S, 2, 0.6);
  panel(1000, 200, 800, 420, ka, C.now, 'ONE RULE · 一条规则');
  if (ka > 0.003) {
    txt('α² = bα + c', 1400, 300, { size: 60, fam: F.math, w: 700, align: 'center', c: C.now, a: ka, ab: 1.5 });
    const e1 = ka * Q(S, 2, 'Multiplying is', 0.6), e2 = ka * Q(S, 2, 'using the rule', 0.6);
    txt('(p + qα)(r + sα)', 1030, 380, { size: 30, fam: F.math, w: 700, c: C.white, a: e1 });
    rpRich([['  = pr + (ps + qr)α + qs·', C.white], ['α²', C.now]], 1030, 430, { size: 30, a: e1 });
    rpRich([['  = (pr + ', C.white], ['c', C.now], ['qs) + (ps + qr + ', C.white], ['b', C.now], ['qs)α', C.white]], 1030, 485, { size: 30, a: e2 });
    rpRich([['(p, q)·(r, s) = (pr + cqs, ps + qr + bqs)', C.cyan]], 1030, 570, { size: 31, a: e2 });
  }
  /* line 3: the name */
  const na = a * at(S, 3, 0.6);
  if (na > 0.003) {
    txt('QuadPoly(b, c)', 530, 680, { size: 66, fam: F.disp, w: 900, align: 'center', c: C.white, a: na, ab: 2 });
    txt('= ℚ[α] / (α² − bα − c)', 530, 740, { size: 30, fam: F.math, w: 700, align: 'center', c: C.cyan, a: na });
    const ta = na * Q(S, 3, 'finite arithmetic', 0.5);
    ['two fractions · 两个分数', 'finite steps · 有限步', 'no limits · 无极限'].forEach((s, i) => {
      chip(1140 + i * 275, 710, 255, 56, s, i === 2 ? C.mag : C.cyan, ta * clamp(Q(S, 3, 'finite arithmetic', 0.4, 0.35 * i)), 19, F.zh);
    });
  }
};

/* ======================================================================= */
/*                         scene 2 · CONJUGATE AND NORM                      */
/* ======================================================================= */
SCENES.norm = S => {
  const a = rpFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* the general formulas, left */
  panel(140, 190, 860, 470, a, C.cyan, 'QuadPoly(b, c) · 共轭与范数');
  const c0 = a * at(S, 0, 0.6);
  rpRich([['z = (p, q)     ', C.white], ['z̄ = (p + bq, −q)', C.mag]], 170, 270, { size: 32, a: c0 });
  const c1 = a * Q(S, 0, 'Multiply by it', 0.6);
  rpRich([['z · z̄', C.white], ['  :  α-part  ', C.dim]], 170, 335, { size: 30, a: c1 });
  rpRich([['−pq + q(p + bq) − bq² = ', C.white], ['0', C.now]], 200, 385, { size: 30, a: c1 });
  if (c1 > 0.003) {
    const k = Q(S, 0, 'cancels', 0.5);
    line(200, 375, 200 + tw('−pq + q(p + bq) − bq²', 30, F.math, 700) * k, 375, C.now, c1 * 0.6, 2);
  }
  const c2 = a * at(S, 1, 0.6);
  rpRich([['z · z̄ = (', C.white], ['N', C.now], [', 0)', C.white]], 170, 460, { size: 32, a: c2 });
  rpRich([['N(p, q) = p² + bpq − cq²  ∈ ℚ', C.now]], 170, 520, { size: 34, a: c2 * Q(S, 1, 'the norm', 0.5) });
  const c3 = a * at(S, 2, 0.6);
  rpRich([['z⁻¹ = z̄ / N = ( (p + bq)/N ,  −q/N )', C.cyan]], 170, 610, { size: 32, a: c3 });
  /* the worked pair in QSqrt2, right */
  const wa = a * Q(S, 2, 'in root two', 0.6);
  panel(1060, 190, 740, 470, wa, C.now, 'QSqrt2 · b = 0, c = 2');
  if (wa > 0.003) {
    rpRich([['z = (1, 1) = 1 + δ', C.white]], 1090, 270, { size: 34, a: wa });
    rpRich([['N = 1² + 0 − 2·1² = ', C.white], [fstr(NM_N), C.now]], 1090, 340, { size: 32, a: wa * Q(S, 2, 'has norm minus one', 0.5) });
    rpRich([['z̄ = (1, −1)', C.mag]], 1090, 400, { size: 32, a: wa * Q(S, 2, 'has norm minus one', 0.5) });
    rpRich([['z⁻¹ = (1, −1)/(−1) = ', C.white], [pairStr(NM_INV), C.now]], 1090, 470, { size: 32, a: wa * Q(S, 2, 'and inverse', 0.5) });
    const pa = wa * Q(S, 2, 'and inverse', 0.5, 0.9);
    rpRich([['(1, 1)·(−1, 1) = (−1 + 2, 1 − 1) = ', C.white]], 1090, 545, { size: 28, a: pa });
    rpRich([[pairStr(NM_PROD), C.now], ['  = 1', C.white]], 1090, 600, { size: 36, a: pa });
    rpTag(1090, 640, 'computed', 'hand check · 手算核验', pa);
  }
  /* Lean */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  panel(140, 690, 1660, 140, la, C.lean);
  if (la > 0.003) {
    rpRich([['∀ b c : ℤ,  ∀ z : RatQuadPoly b c,   N(z) ≠ 0  ⇒  z · z⁻¹ ≡ 1', C.white]], 170, 745, { size: 30, a: la });
    rpLean(170, 800, 'inv', la, { size: 21 });
    txt('strict backend record: axioms [ ]  (ch. 12) · 严格端公理记录为空', 1770, 800, { size: 19, fam: F.zh, w: 700, align: 'right', c: C.dim, a: la * Q(S, 3, 'not zero', 0.5) });
  }
};

/* ======================================================================= */
/*                           scene 3 · EIGHT BEATS                           */
/* ======================================================================= */
const SP_O = [520, 520], SP_R = 230, AD_O = [1000, 300], AD_R = 80;
SCENES.spinor = S => {
  const a = rpFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* line 0: the rule */
  const r0 = a * at(S, 0, 0.6);
  txt('QSqrt2:   δ² = 2', 1100, 230, { size: 40, fam: F.math, w: 700, c: C.now, a: r0 });
  txt('b = 0, c = 2 · Δ = 8 is not a square', 1100, 275, { size: 22, fam: F.mono, w: 700, c: C.dim, a: r0 });
  /* the beat counter: k advances with lines 2–3 */
  const b2 = at(S, 2, 0.5), b4 = Q(S, 2, 'Square again', 0.5), b8 = Q(S, 2, 'Once more', 0.5), b8b = Q(S, 3, 'Eight beats', 2.2);
  let kb = 1 + b2 + 2 * b4 + 2 * b8 + 2 * b8b;    // u^1 → u^2 → u^4 → u^6 → u^8, smoothly
  kb = Math.min(8, kb);
  const ua = a * at(S, 1, 0.6);
  /* the spinor plane */
  const [ox, oy] = SP_O;
  ring(ox, oy, SP_R, C.dim, a * 0.6, 1.5);
  line(ox - SP_R - 40, oy, ox + SP_R + 40, oy, C.dim, a * 0.5, 1.2); line(ox, oy + SP_R + 40, ox, oy - SP_R - 40, C.dim, a * 0.5, 1.2);
  txt('1', ox + SP_R + 14, oy - 10, { size: 22, fam: F.math, c: C.dim, a });
  txt('i', ox + 10, oy - SP_R - 16, { size: 22, fam: F.math, c: C.dim, a });
  for (let k = 0; k < 8; k++) {
    const th = k * Math.PI / 4, x = ox + SP_R * Math.cos(th), y = oy - SP_R * Math.sin(th);
    const reached = kb >= k + 0.999 || (k === 0 && kb >= 7.999);
    dot(x, y, reached ? 9 : 5, reached ? 'c' : 'w', ua * (reached ? 1 : 0.4));
  }
  if (ua > 0.003) {
    const th = kb * Math.PI / 4, x = ox + SP_R * Math.cos(th), y = oy - SP_R * Math.sin(th);
    arrow(ox, oy, x, y, C.now, ua, 5);
    dot(x, y, 14, 'g', ua);
    const ki = Math.round(kb), lbl = Math.abs(kb - ki) < 0.04 ? `u${['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸'][ki]} = ${gStr(SP_POW[ki])}` : '';
    const lx = x + 22 * Math.cos(th), ly = y - 22 * Math.sin(th);
    if (lbl) {
      const al = Math.cos(th) < -0.2 ? 'right' : 'left';
      const w0 = tw(lbl, 28, F.math, 700);
      fillBox(al === 'right' ? lx - w0 - 8 : lx - 4, ly - 30, w0 + 12, 40, C.bg, ua * 0.75);
      txt(lbl, lx, ly, { size: 28, fam: F.math, w: 700, align: al, c: C.now, a: ua });
    }
  }
  txt('spinor plane · 旋量平面   (45° per beat)', ox, oy + SP_R + 80, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ua });
  /* the adjoint frame: 90° per beat */
  const fa = a * Q(S, 2, 'a full turn', 0.6);
  if (fa > 0.003) {
    const [ax, ay] = AD_O, th = kb * Math.PI / 2;
    ring(ax, ay, AD_R, C.dim, fa * 0.6, 1.2);
    arrow(ax, ay, ax + AD_R * Math.cos(th), ay - AD_R * Math.sin(th), C.cyan, fa, 4);
    arrow(ax, ay, ax + AD_R * Math.cos(th + Math.PI / 2), ay - AD_R * Math.sin(th + Math.PI / 2), C.mag, fa, 3);
    txt('Ad frame', ax, ay + AD_R + 36, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: fa });
    txt(`${Math.round(90 * kb)}°`, ax, ay + AD_R + 66, { size: 24, fam: F.math, w: 700, align: 'center', c: C.cyan, a: fa });
  }
  /* the ledger, right */
  panel(1100, 320, 700, 500, ua, C.cyan, 'u = (δ/2)(1 + i) · 单位旋量');
  rpRich([['u = δ/2 + δ/2·i', C.white]], 1130, 400, { size: 32, a: ua });
  rpRich([['|u|² = δ²/4 + δ²/4 = 1/2 + 1/2 = ', C.white], ['1', C.now]], 1130, 455, { size: 28, a: ua * Q(S, 1, 'squared length', 0.5) });
  const rows = [[2, 'Square it', 2], [4, 'Square again', 2], [8, 'Once more', 2]];
  rows.forEach(([k, ph], i) => {
    const ra = ua * Q(S, 2, ph, 0.5);
    rpRich([[`u${['', '', '²', '', '⁴', '', '', '', '⁸'][k]} = `, C.white], [gStr(SP_POW[k]), C.now]], 1130, 530 + 55 * i, { size: 30, a: ra });
    txt(`Ad: ${90 * k}°`, 1420, 530 + 55 * i, { size: 28, fam: F.math, w: 700, c: C.cyan, a: ra * 0.85 });
  });
  if (ua > 0.003) {
    const ra = ua * Q(S, 2, 'Square again', 0.5);
    txt('360°: sign flips · 转满一圈翻号', 1130, 715, { size: 22, fam: F.zh, w: 700, c: C.mag, a: ra * (1 - 0.6 * Q(S, 2, 'Once more', 0.5)) });
  }
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  rpLean(1130, 780, 'spinor', la, { size: 21 });
  txt('normSq u90 ≡ 1  ∧  u90⁸ ≡ 1', 1130, 812, { size: 20, fam: F.math, w: 700, c: C.lean, a: la });
  const sa = Q(S, 3, 'home', 0.4);
  stamp('720° · HOME', 520, 640, sa * a, C.now, 34, -0.05);
};

/* ======================================================================= */
/*                           scene 4 · GOLDEN PAIRS                          */
/* ======================================================================= */
SCENES.golden = S => {
  const a = rpFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* left: the rule and the shift */
  const r0 = a * at(S, 0, 0.6);
  panel(140, 190, 820, 300, r0, C.now, 'QPhi · b = c = 1');
  txt('φ² = φ + 1', 550, 290, { size: 58, fam: F.math, w: 700, align: 'center', c: C.now, a: r0, ab: 1.5 });
  const sh = a * at(S, 1, 0.6);
  rpRich([['(p, q) · φ = (q, ', C.white], ['p + q', C.now], [')', C.white]], 170, 380, { size: 34, a: sh });
  txt('multiply by φ = add the two neighbours · 乘以 φ = 两邻相加', 170, 440, { size: 22, fam: F.zh, w: 700, c: C.dim, a: sh });
  /* Cassini */
  const ca = a * at(S, 2, 0.6);
  panel(140, 520, 820, 200, ca, C.cyan, 'N(p, q) = p² + pq − q² · 卡西尼');
  rpRich([['N(89, 144) = 7921 + 12816 − 20736 = ', C.white], ['1', C.now]], 170, 600, { size: 28, a: ca });
  txt('Fₙ₊₁Fₙ₋₁ − Fₙ² = (−1)ⁿ', 170, 670, { size: 32, fam: F.math, w: 700, c: C.cyan, a: ca * Q(S, 2, "Cassini's identity", 0.5) });
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  rpLean(160, 780, 'phinorm', la, { size: 22 });
  txt('∀ n,  N(φⁿ) ≡ (−1)ⁿ', 160, 822, { size: 26, fam: F.math, w: 700, c: C.lean, a: la });
  /* right: the ladder of powers */
  panel(1040, 180, 760, 650, a * at(S, 1, 0.4), C.cyan, 'n      φⁿ = (Fₙ₋₁, Fₙ)        N(φⁿ)');
  for (let n = 1; n <= 12; n++) {
    const y = 240 + (n - 1) * 48;
    const ra = a * clamp(Q(S, 1, 'Each power', 0.35, 0.22 * (n - 1)));
    if (ra <= 0.003) continue;
    const cur = n === 12;
    txt(String(n), 1080, y, { size: 26, fam: F.math, w: 700, c: C.dim, a: ra });
    const z = GD_POW[n];
    txt(pairStr(z), 1170, y, { size: 30, fam: F.math, w: 700, c: cur ? C.now : C.white, a: ra });
    const na = ra * clamp(Q(S, 2, 'Their norms', 0.3, 0.12 * (n - 1)));
    const N = QF.norm(z);
    txt(N[0] > 0 ? '+1' : '−1', 1700, y, { size: 30, fam: F.math, w: 700, align: 'right', c: N[0] > 0 ? C.cyan : C.mag, a: na });
  }
  const ha = a * Q(S, 1, 'the twelfth', 0.5);
  if (ha > 0.003) box(1155, 240 + 11 * 48 - 34, 260, 46, C.now, ha, 2);
};

/* ======================================================================= */
/*                     scene 5 · A DECAGON WITHOUT COSINE                    */
/* ======================================================================= */
const PT_O = [1380, 470], PT_R = 270;
SCENES.pentagon = S => {
  const a = rpFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean']]);
  /* left: the recurrence and the orbit table */
  const r0 = a * at(S, 0, 0.6);
  rpRich([['x = φ/2 = (0, 1/2)      2x = φ', C.white]], 150, 230, { size: 30, a: r0 });
  rpRich([['T', C.white], ['ₖ₊₁', C.white], [' = φ·T', C.white], ['ₖ', C.white], [' − T', C.white], ['ₖ₋₁', C.white]], 150, 285, { size: 30, a: r0 });
  /* steps advance from line 0's "Every value" to line 1's "ten steps" */
  const s0 = phraseAt(S, 0, 'every value'), s1 = phraseAt(S, 1, 'ten return') + 0.8;
  const kf = clamp((S.u - s0) / Math.max(0.5, s1 - s0)) * 10;
  for (let k = 0; k <= 10; k++) {
    const ra = a * clamp((kf - k + 1) / 0.6);
    if (ra <= 0.003) continue;
    const col = k <= 5 ? 0 : 1, row = col ? k - 6 : k;
    const x = 150 + col * 410, y = 360 + row * 58;
    const cur = Math.floor(kf) === k && kf < 10 || (k === 10 && kf >= 10);
    const z = PT_T[k], key = k === 5 || k === 10;
    rpRich([[`T${['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉', '₁₀'][k]} = `, C.dim], [algStr(z, 'φ'), key ? C.now : cur ? C.now : C.white]], x, y, { size: 30, a: ra });
  }
  const ka = a * Q(S, 1, 'land on', 0.5);
  if (ka > 0.003) txt('pairs: T₅ = (−1, 0), T₁₀ = (1, 0)', 150, 745, { size: 24, fam: F.math, w: 700, c: C.cyan, a: ka });
  /* right: the decagon */
  const da = a * at(S, 0, 0.6);
  const [ox, oy] = PT_O;
  ring(ox, oy, PT_R, C.dim, da * 0.4, 1.2);
  line(ox - PT_R - 40, oy, ox + PT_R + 40, oy, C.dim, da * 0.6, 1.4);
  [-1, 0, 1].forEach(v => txt(v === -1 ? '−1' : String(v), ox + v * (PT_R + 26), oy + 44, { size: 22, fam: F.math, w: 700, align: 'center', c: C.dim, a: da }));
  const pts = [];
  for (let k = 0; k <= 10; k++) {
    const th = k * Math.PI / 5, xv = pnum(PT_T[k]);
    pts.push([ox + PT_R * xv, oy - PT_R * Math.sin(th)]);
  }
  const pa = a * Q(S, 1, 'the corners', 0.8);
  if (pa > 0.003) {
    ctx.save(); ctx.globalAlpha = pa; ctx.strokeStyle = C.cyan; ctx.lineWidth = 2.5; ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.restore();
  }
  for (let k = 0; k <= 10; k++) {
    const ra = da * clamp((kf - k + 1) / 0.6);
    if (ra <= 0.003) continue;
    const [x, y] = pts[k];
    dashed(x, y, x, oy, C.dim, ra * 0.45, 1.2);
    const cur = (Math.floor(kf) === k && kf < 10) || (k === 10 && kf >= 10);
    dot(x, y, cur ? 13 : 8, cur ? 'g' : 'c', ra);
    dot(x, oy, 5, 'w', ra * 0.7);
  }
  if (da > 0.003) {
    txt('Tₖ(φ/2) placed at corner k · 第 k 个顶点', ox, oy + PT_R + 52, { size: 21, fam: F.zh, w: 700, align: 'center', c: C.dim, a: da });
    rpTag(ox - 300, oy + PT_R + 98, 'picture', 'φ ≈ 1.618 only to place points · 仅用于定位', da);
  }
  stamp('T₁₀ = 1', 700, 668, a * Q(S, 1, 'return to one', 0.4), C.now, 34, -0.06);
  /* Lean */
  const la = a * Q(S, 2, 'Lean checks', 0.6);
  rpLean(150, 790, 'penta', la, { size: 22 });
  txt('T₅(φ/2) ≡ −1,  T₁₀(φ/2) ≡ 1,  T₅((φ − 1)/2) ≡ 1', 150, 830, { size: 24, fam: F.math, w: 700, c: C.lean, a: la });
  const na = a * Q(S, 2, 'No cosine', 0.5);
  if (na > 0.003) txt('cos ✗   π ✗', 150, 698, { size: 30, fam: F.math, w: 700, c: C.mag, a: na });
};

/* ======================================================================= */
/*                     scene 6 · SQUARES, NOT ROOTS                    */
/* ======================================================================= */
SCENES.squares = S => {
  const a = rpFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  const t0 = a * at(S, 0, 0.6);
  txt('positivity from fractions · 用分数证明正定', 150, 220, { size: 30, fam: F.zh, w: 700, c: C.white, a: t0 });
  /* left: the ledger */
  const la1 = a * Q(S, 0, 'Take three pairs', 0.6);
  panel(140, 260, 840, 390, la1, C.cyan, 'xs = (1, 2), (3, 1), (2, 5)');
  if (la1 > 0.003) {
    const rows = SQ_XS.map(([p, q]) => `(${p}, ${q})`);
    rows.forEach((s, i) => chip(250 + i * 220, 335, 180, 56, s, C.cyan, la1, 30, F.math));
    rpRich([[`Σu² = ${SQ_U2}    Σv² = ${SQ_V2}    Σuv = ${SQ_UV}`, C.white]], 170, 420, { size: 30, a: la1 * Q(S, 1, 'Gram determinant', 0.5) });
    rpRich([[`gramDet = ${SQ_U2}·${SQ_V2} − ${SQ_UV}² = ${SQ_U2 * SQ_V2} − ${SQ_UV * SQ_UV} = `, C.white], [String(SQ_DET), C.now]], 170, 475, { size: 29, a: la1 * Q(S, 1, 'four twenty', 0.5) });
    const m2 = a * at(S, 2, 0.6);
    const ms = SQ_MIN.map(r => `${r.m < 0 ? '−' : ''}${Math.abs(r.m)}`);
    rpRich([['minors:  ', C.white], [ms.join(',  '), C.mag]], 170, 545, { size: 30, a: m2 });
    rpRich([[`${SQ_MIN.map(r => r.m * r.m).join(' + ')} = `, C.white], [String(SQ_MSUM), C.now], ['  = gramDet', C.white]], 170, 600, { size: 30, a: m2 * Q(S, 2, 'also add', 0.5) });
  }
  const l3 = a * Q(S, 3, 'Lean checks', 0.6);
  panel(140, 670, 840, 160, l3, C.lean);
  if (l3 > 0.003) {
    rpRich([['∀ xs,  gramDet xs ≡ minorSquares xs', C.white]], 170, 722, { size: 28, a: l3 });
    rpLean(170, 772, 'lagrange', l3, { size: 21 });
    txt('⇒ (Σuv)² ≤ Σu²·Σv² :  225 ≤ 420', 170, 812, { size: 22, fam: F.math, w: 700, c: C.dim, a: l3 * Q(S, 3, 'sum of squares', 0.5) });
  }
  /* right: the vectors and the minors as signed parallelogram areas */
  const va = a * Q(S, 0, 'Take three pairs', 0.6);
  if (va > 0.003) {
    const ox = 1160, oy = 800, sc = 86;
    const P = v => [ox + sc * v[0], oy - sc * v[1]];
    line(ox - 20, oy, ox + 6.8 * sc, oy, C.dim, va * 0.6, 1.2); line(ox, oy + 20, ox, oy - 6.4 * sc, C.dim, va * 0.6, 1.2);
    const mi = Math.min(2, Math.floor(clamp((S.u - lineAt(S, 2).s) / Math.max(0.5, lineAt(S, 2).e - lineAt(S, 2).s)) * 3));
    if (at(S, 2, 0.3) > 0) {
      const r = SQ_MIN[mi], p = SQ_XS[r.i], q = SQ_XS[r.j];
      poly([P([0, 0]), P(p), P([p[0] + q[0], p[1] + q[1]]), P(q)], C.mag, va, 0.25, 2);
      const c = P([(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]);
      txt(`${r.m < 0 ? '−' : ''}${Math.abs(r.m)}`, c[0], c[1] + 12, { size: 36, fam: F.math, w: 900, align: 'center', c: C.mag, a: va });
    }
    SQ_XS.forEach((v, i) => {
      const e = P(v); arrow(ox, oy, e[0], e[1], C.cyan, va, 4);
      txt(`(${v[0]}, ${v[1]})`, e[0] + 12, e[1] - 10, { size: 24, fam: F.math, w: 700, c: C.cyan, a: va });
    });
    txt('minor = signed area · 子式 = 有向面积', 1790, 230, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.mag, a: va * at(S, 2, 0.5) });
  }
};

/* ======================================================================= */
/*                           scene 7 · RIGID BY ITS GRAM                     */
/* ======================================================================= */
SCENES.gram = S => {
  const a = rpFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, 'Lean checks', 'lean'], [2, null, 'computed']]);
  /* the theorem */
  const ta = a * at(S, 0, 0.6);
  panel(140, 190, 1660, 190, ta, C.lean, 'CLASSICAL REAL SHADOW · 经典实数阴影层');
  if (ta > 0.003) {
    rpRich([['span φ = E,   ⟨φ(σa), φ(σb)⟩ = ⟨φa, φb⟩  ∀ a, b', C.white]], 170, 265, { size: 30, a: ta * Q(S, 1, 'A permutation', 0.6) });
    rpRich([['⇒  ∃! U : E ≃ E  linear isometry,   U(φa) = φ(σa)', C.white]], 170, 315, { size: 30, a: ta * Q(S, 1, 'exactly one isometry', 0.5) });
    rpLean(170, 362, 'isometry', ta, { size: 18 });
  }
  /* two planes: e₁, 2e₂ with the swap (line 2) and e₁ alone (line 3) */
  const plane = (cx, cy, al, title, dy) => {
    panel(cx - 380, cy - 200, 760, 440, al, C.cyan, title);
    line(cx - 300, cy + dy, cx + 300, cy + dy, C.dim, al * 0.6, 1.2);
    line(cx - 120, cy + 220, cx - 120, cy - 150, C.dim, al * 0.6, 1.2);
    return [cx - 120, cy + dy];
  };
  const s1 = a * Q(S, 1, 'spanning family', 0.6), sc = 120;
  if (s1 > 0.003) {
    const [ox, oy] = plane(530, 610, s1, 'e₁, 2e₂ · Gram diag(1, 4)', 120);
    arrow(ox, oy, ox + sc, oy, C.cyan, s1, 5);
    arrow(ox, oy, ox, oy - 2 * sc, C.white, s1, 4);
    txt('e₁', ox + sc + 14, oy + 8, { size: 26, fam: F.math, w: 700, c: C.cyan, a: s1 });
    txt('2e₂', ox + 14, oy - 2 * sc - 6, { size: 26, fam: F.math, w: 700, c: C.white, a: s1 });
    /* the swap asks e₁ to land on 2e₂: a length-1 arrow turned onto a length-2 arrow */
    const sw = s1 * at(S, 2, 0.6), k = ease(Q(S, 2, 'Swap', 1.2));
    if (sw > 0.003) {
      const th = k * Math.PI / 2;
      arrow(ox, oy, ox + sc * Math.cos(th), oy - sc * Math.sin(th), C.now, sw, 4);
      if (k > 0.98) {
        dashed(ox - 14, oy - sc, ox - 14, oy - 2 * sc, C.mag, sw, 3);
        txt('1 ≠ 2', ox - 24, oy - 1.5 * sc + 8, { size: 26, fam: F.math, w: 700, align: 'right', c: C.mag, a: sw });
      }
      txt('σ: e₁ ↦ 2e₂', ox + 26, oy - sc * 0.42, { size: 22, fam: F.math, w: 700, c: C.now, a: sw * Q(S, 2, 'Swap', 0.5) });
    }
    const na = s1 * Q(S, 2, 'length one becomes', 0.5);
    rpRich([['|e₁| = 1,  |2e₂| = 2', C.mag]], 620, 500, { size: 24, a: na });
    rpRich([['⟨e₁, e₁⟩ = 1 ≠ 4', C.mag]], 620, 545, { size: 24, a: na });
    txt('✗ no isometry · 无等距', 620, 600, { size: 24, fam: F.zh, w: 700, c: C.mag, a: s1 * Q(S, 2, 'no isometry', 0.4) });
  }
  const s2 = a * at(S, 3, 0.6);
  if (s2 > 0.003) {
    const [ox, oy] = plane(1390, 610, s2, 'e₁ alone · 只有 e₁', 40);
    arrow(ox, oy, ox + sc * 1.6, oy, C.cyan, s2, 5);
    txt('e₁', ox + sc * 1.6 + 12, oy + 8, { size: 26, fam: F.math, w: 700, c: C.cyan, a: s2 });
    const ra = s2 * Q(S, 3, 'the identity and a reflection', 0.6);
    /* a second vector and its two images */
    dashed(ox, oy, ox + sc * 0.9, oy - sc * 1.1, C.dim, s2, 2);
    dot(ox + sc * 0.9, oy - sc * 1.1, 8, 'w', s2);
    txt('w', ox + sc * 0.9 - 30, oy - sc * 1.1 - 6, { size: 24, fam: F.math, w: 700, c: C.white, a: s2 });
    arrow(ox, oy, ox + sc * 0.9, oy - sc * 1.1, C.now, ra, 3);
    arrow(ox, oy, ox + sc * 0.9, oy + sc * 1.1, C.now, ra, 3);
    txt('id: w ↦ w', ox + 160, oy - 120, { size: 24, fam: F.math, w: 700, c: C.now, a: ra });
    txt('reflect: (w₁, w₂) ↦ (w₁, −w₂)', ox + 130, oy + 120, { size: 22, fam: F.math, w: 700, c: C.now, a: ra });
    txt('two extensions · 延拓不唯一', 1040, 820, { size: 22, fam: F.zh, w: 700, c: C.mag, a: ra });
  }
  if (s1 > 0.003) rpTag(150, 830, 'computed', 'hand examples from ch. 12 · 本章手算反例', a * at(S, 2, 0.6));
};

/* ======================================================================= */
/*                                 scene 8 · END                             */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.2, y: 258 });
};

/* poster: titles, the pair and its one rule, and the six cited theorems (the default layout fits five) */
FILM.poster = () => {
  const t = 23.7, si = Math.min(1, TL.scenes.length - 1);
  resetCtx();
  background(t, TL.scenes[si], si, 4);
  drawHyper(CUBE5, [[0, 4, t * 0.21], [1, 3, t * 0.17], [2, 4, t * 0.13], [3, 4, t * 0.19], [0, 2, t * 0.07]], { scale: 2.0, rx: 0.3, ry: t * 0.05, a: 0.4, lw: 1.4, camZ: 7, cy: H / 2 - 60 });
  grid(t, 0.6);
  const b = DATA.book, f = DATA.film;
  txt(f.title_zh, W / 2, 260, { size: 84, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt(f.title.toUpperCase(), W / 2, 370, { size: 64, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 5, ls: 6 });
  bloom(0.65);
  rpRich([['(p, q)  ⟷  p + qα', C.cyan], ['      ', C.white], ['α² = bα + c', C.now]], W / 2, 480, { size: 46, align: 'center' });
  txt(`${b.code} · ${(STR.en.film || 'FILM').toUpperCase()}`, W / 2, 560, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  leanList(W / 2, 650, 1, { align: 'center', size: 22, gap: 42 });
  txt(`${b.title.zh} · ${b.title.en}`, W / 2, 960, { size: 32, fam: F.zh, w: 700, align: 'center', c: C.cyan });
  hud(t, 711, si, TL.scenes[si]);
  post(3);
};
