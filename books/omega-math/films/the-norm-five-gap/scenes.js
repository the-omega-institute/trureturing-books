/* Film · The Norm-Five Spectral Gap · 模方五的谱隙 (book omega-math, chapter 15).
   Scenes for the shared engine theme/film/engine.js.

   What each scene shows, and where it rests:
     stir      the six norm-5 integer quaternions S₅ = {1 ± 2i, 1 ± 2j, 1 ± 2k} (chapter 14 / 15.3), the spherical
               Hecke sum (T̂₅ f)(q) = Σ f(q s_π), s_π = π/√5, and the squared Ramanujan test 20 − λ̂² ≥ 0
               (definition def-ch15-spherical-hecke-psd; the equivalence with |λ̂| ≤ 2√5 is argued in 15.1);
               the constant fails it: 20 − 6² = −16 (computed). The fading pattern is schematic.
     circle    the Satake split 1 − λ̂X + 5X² = (1 − αX)(1 − βX), u = α/√5, β/√5, u₁u₂ = 1, the 2 × 2 power-sum
               Toeplitz matrix with determinant (20 − λ̂²)/5 (hand derivation in 15.2, ARGUED; the drawn
               parameters are recomputed every frame) ..... FinitePowerSumToeplitzCircleCriterion.
               toeplitz_posSemidef_iff_norm_eq_one (LEAN: inversion-closed nonzero finite family, N + 1 ≥ number
               of distinct values ⇒ Toeplitz PSD ⟺ all |u_j| = 1).
     boundary  remark rem-ch15-rh-epistemology: what is frozen (LEAN), the LPS full bound (literature, ARGUED),
               the critical-line reading (the book's MODEL, ARGUED), and the open problems (OPEN).
     eigen     χ₁ = (3w² − x² − y² − z²)/‖q‖²; at q = (2, 1, 3, −1): scalar parts 0, 4, −4, 8, 4, 0, sum of squares
               112 = 8·15 − 2·4, Σκ = 112/75, T̂₅χ₁(q) = −2/75 = −2/5 · χ₁(q) (computed here) .....
               OmegaBargmannHaarHecke.heckeT5_chi1_eigenvalue (LEAN: every nonzero q : Quad4) and
               heckeT5_ramanujan_margin (LEAN: 20 − (−2/5)² ≡ 496/25 and 0 < 496/25).
     traces    a₀ = 1, a₁ = −1, a_{n+2} = −6a_{n+1} − 25a_n and E_n(1/5) = a_n/5ⁿ ..... OmegaChebyshevHecke.
               lps_hecke_trace_formula (LEAN, every n) and lps_hecke_traces (LEAN, the six values); the reading
               Tr(T₅|V_ℓ) = E_ℓ(1/5) is the chapter's representation-theory derivation (ARGUED).
     matrix    six Gaussian-integer matrices summed on Sym^d: 6I₂, −2I₃, −18I₄ and M⁽⁴⁾ (recomputed on load by
               expanding the substitution), eigenlines +54 (twice), −74 (three times), margins 64/5, 496/25,
               2176/125, 9584/625, 7024/625 ..... OmegaChebyshevHecke.lps_ramanujan_margins and
               lps_degree_four_eigenbasis (LEAN); V₃…V₆ by exact leading minors (the chapter's NUM check).
     graph     S₅ mod 13 with i ≡ 5 in PGL₂(𝔽₁₃): 2184 = 1092 + 1092 vertices, bipartite since (5/13) = −1,
               6-regular, girth 8 with witness (287, 416, 364, 52) of norm 5⁸ (example ex-ch15-x513-certificate;
               the drawn ball and the highlighted 8-cycle are computed on load by breadth-first search in
               PGL₂(𝔽₁₃)); the bound σ² < 19 for the 1091 nontrivial squared singular values is the chapter's
               exact shift certificate (NUM), copied, not recomputed here.

   On load, FILM.init checks DATA.lean against the seven theorems and re-derives every number shown on screen by an
   independent route; any disagreement goes to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const NF_LEAN = {
  toeplitz: ['D5/S3/Weil/TestFunctions/FinitePowerSumToeplitzCircleCriterion.toeplitz_posSemidef_iff_norm_eq_one', 'toeplitz_posSemidef_iff_norm_eq_one'],
  chi1: ['D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.heckeT5_chi1_eigenvalue', 'heckeT5_chi1_eigenvalue'],
  margin: ['D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.heckeT5_ramanujan_margin', 'heckeT5_ramanujan_margin'],
  formula: ['D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_hecke_trace_formula', 'lps_hecke_trace_formula'],
  traces: ['D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_hecke_traces', 'lps_hecke_traces'],
  margins: ['D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_ramanujan_margins', 'lps_ramanujan_margins'],
  eigenbasis: ['D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_degree_four_eigenbasis', 'lps_degree_four_eigenbasis']
};
/* exact fractions [n, d], d > 0, reduced */
const nfG = (a, b) => (b ? nfG(b, a % b) : Math.abs(a));
const fr = (n, d = 1) => { const g = nfG(n, d) || 1, s = d < 0 ? -1 : 1; return [s * n / g, s * d / g]; };
const fAdd = (a, b) => fr(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const fSub = (a, b) => fr(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
const fMul = (a, b) => fr(a[0] * b[0], a[1] * b[1]);
const fEq = (a, n, d = 1) => a[0] * d === n * a[1];
const fStr = a => (a[1] === 1 ? `${a[0]}` : `${a[0]}/${a[1]}`).replace('-', '−');

/* quaternions [w, x, y, z]; the six generators, letters k and k ^ 1 conjugate */
const qMul = (a, b) => [
  a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
  a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
  a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
  a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
const qN2 = a => a[0] * a[0] + a[1] * a[1] + a[2] * a[2] + a[3] * a[3];
const S5 = [[1, 2, 0, 0], [1, -2, 0, 0], [1, 0, 2, 0], [1, 0, -2, 0], [1, 0, 0, 2], [1, 0, 0, -2]];
const S5N = ['1+2i', '1−2i', '1+2j', '1−2j', '1+2k', '1−2k'];

/* χ₁(q) = 4κ − 1, κ = w²/‖q‖²; T̂₅χ₁(q) = Σ χ₁(q·π) (scale-free, so π need not be divided by √5) */
const chi1 = q => fr(3 * q[0] * q[0] - q[1] * q[1] - q[2] * q[2] - q[3] * q[3], qN2(q));
const heckeChi1 = q => S5.reduce((s, p) => fAdd(s, chi1(qMul(q, p))), fr(0));
const EQ = [2, 1, 3, -1];                                 /* the worked point */
const EQ_W = S5.map(p => qMul(EQ, p)[0]);                 /* scalar parts 0, 4, −4, 8, 4, 0 */
const EQ_SQ = EQ_W.reduce((s, w) => s + w * w, 0);        /* 112 */

/* the integer recurrence a_{n+2} = −6 a_{n+1} − 25 a_n and E_n(1/5) = a_n / 5ⁿ */
const NF_A = (() => { const a = [1, -1]; for (let n = 2; n <= 6; n++) a.push(-6 * a[n - 1] - 25 * a[n - 2]); return a; })();
const NF_E = NF_A.map((a, n) => fr(a, Math.pow(5, n)));

/* the six Gaussian-integer defining matrices, summed on Sym^d in the monomial basis u^{d−r} v^r */
const cMul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
function pMul(p, q) { const r = Array.from({ length: p.length + q.length - 1 }, () => [0, 0]); p.forEach((a, i) => q.forEach((b, j) => { const m = cMul(a, b); r[i + j][0] += m[0]; r[i + j][1] += m[1]; })); return r; }
function symSum(d) {
  const M = Array.from({ length: d + 1 }, () => Array.from({ length: d + 1 }, () => [0, 0]));
  for (const [w, x, y, z] of S5) {
    const A = [w, x], B = [y, z], Cc = [-y, z], D = [w, -x];   /* u ↦ A u + B v, v ↦ C u + D v */
    for (let r = 0; r <= d; r++) {
      let p = [[1, 0]];
      for (let k = 0; k < d - r; k++) p = pMul(p, [A, B]);
      for (let k = 0; k < r; k++) p = pMul(p, [Cc, D]);
      for (let k = 0; k <= d; k++) { M[k][r][0] += p[k][0]; M[k][r][1] += p[k][1]; }
    }
  }
  return M;
}
const M4 = [[-10, 0, 0, 0, 64], [0, -74, 0, 0, 0], [0, 0, 54, 0, 0], [0, 0, 0, -74, 0], [64, 0, 0, 0, -10]];
const EIG_LINES = [[[1, 0, 0, 0, 1], 54], [[0, 0, 1, 0, 0], 54], [[1, 0, 0, 0, -1], -74], [[0, 1, 0, 0, 0], -74], [[0, 0, 0, 1, 0], -74]];
const MARGINS = [[1, 6], [2, -2], [3, -18], [4, 54], [4, -74]].map(([d, l]) => fr(20 * Math.pow(5, d) - l * l, Math.pow(5, d)));

/* ---------------- X^{5,13}: S₅ in PGL₂(𝔽₁₃), i ≡ 5 ---------------- */
const P13 = 13, I13 = 5, md = a => ((a % P13) + P13) % P13;
const toMat = ([a, b, c, d]) => [md(a + b * I13), md(c + d * I13), md(-c + d * I13), md(a - b * I13)];
const inv13 = a => { for (let k = 1; k < P13; k++) if (md(a * k) === 1) return k; return 0; };
function norm13(m) {                                         /* projective class: first nonzero entry 1 */
  const f = m.find(v => v !== 0), k = inv13(f);
  return m.map(v => md(v * k));
}
const mMul = (a, b) => [md(a[0] * b[0] + a[1] * b[2]), md(a[0] * b[1] + a[1] * b[3]), md(a[2] * b[0] + a[3] * b[2]), md(a[2] * b[1] + a[3] * b[3])];
const GEN13 = S5.map(toMat);
const SQ13 = new Set(Array.from({ length: 12 }, (_, k) => md((k + 1) * (k + 1))));
/* breadth-first search from the identity: vertices, depths, parents, the radius-3 ball and one 8-cycle */
const GR = (() => {
  const key = m => m.join(','), id = [1, 0, 0, 1];
  const depth = new Map([[key(id), 0]]), par = new Map([[key(id), null]]), parity = new Map([[key(id), 0]]);
  const via = new Map([[key(id), -1]]);
  let layer = [id], girth = Infinity, edges = 0;
  const ball = [[{ k: key(id), letter: -1, parent: null }]];
  const twoParents = [];
  while (layer.length) {
    const next = [];
    for (const v of layer) {
      const kv = key(v);
      GEN13.forEach((g, gi) => {
        const w = norm13(mMul(v, g)), kw = key(w);
        edges++;
        if (!depth.has(kw)) { depth.set(kw, depth.get(kv) + 1); par.set(kw, kv); via.set(kw, gi); next.push(w); }
        else if (par.get(kv) !== kw) {
          girth = Math.min(girth, depth.get(kv) + depth.get(kw) + 1);
          if (depth.get(kw) === depth.get(kv) + 1 && depth.get(kw) === 4) twoParents.push([kw, kv]);
        }
      });
    }
    layer = next;
  }
  /* parity by the square class of the determinant */
  const det = k => { const m = k.split(',').map(Number); return md(m[0] * m[3] - m[1] * m[2]); };
  let side0 = 0;
  for (const k of depth.keys()) if (SQ13.has(det(k))) side0++;
  return { depth, par, via, girth, n: depth.size, side0, twoParents, det, edges };
})();
/* the drawn ball: depth ≤ 3 as a radial tree, children ordered by generator letter */
const BALL = (() => {
  const kids = new Map();
  for (const [k, p] of GR.par) if (p !== null && GR.depth.get(k) <= 3) { if (!kids.has(p)) kids.set(p, []); kids.get(p).push(k); }
  for (const v of kids.values()) v.sort((a, b) => GR.via.get(a) - GR.via.get(b));
  const pos = new Map(), nodes = [];
  const place = (k, a0, a1, dep) => {
    pos.set(k, { ang: (a0 + a1) / 2, dep }); nodes.push(k);
    const c = kids.get(k) || [];
    c.forEach((ch, i) => place(ch, a0 + (a1 - a0) * i / c.length, a0 + (a1 - a0) * (i + 1) / c.length, dep + 1));
  };
  place('1,0,0,1', -Math.PI / 2, 1.5 * Math.PI, 0);
  return { pos, nodes };
})();
/* one 8-cycle: a depth-4 vertex with a second depth-3 neighbour, both branches in adjacent sectors if possible */
const CYCLE = (() => {
  const branch = k => { let b = k; while (GR.depth.get(b) > 1) b = GR.par.get(b); return b; };
  let pick = null;
  for (const [x, b] of GR.twoParents) {
    const a = GR.par.get(x);
    const sa = BALL.pos.get(branch(a)), sb = BALL.pos.get(branch(b));
    if (!sa || !sb || branch(a) === branch(b)) continue;
    const gap = Math.abs(Math.atan2(Math.sin(sa.ang - sb.ang), Math.cos(sa.ang - sb.ang)));
    if (!pick || gap < pick.gap - 1e-9) pick = { x, a, b, gap };
  }
  if (!pick) return null;
  const up = k => { const out = []; while (k !== null) { out.push(k); k = GR.par.get(k); } return out; };
  return { x: pick.x, left: up(pick.a), right: up(pick.b) };
})();

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('the-norm-five-gap film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(NF_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(NF_LEAN).length}`);
  for (const [gid, short] of Object.values(NF_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. STIR: six generators of norm 5, conjugate-paired, the constant fails the squared test */
  S5.forEach((p, k) => check(qN2(p) === 5, `‖${S5N[k]}‖² = 5`));
  for (let k = 0; k < 6; k += 2) { const pr = qMul(S5[k], S5[k + 1]); check(pr[0] === 5 && !pr[1] && !pr[2] && !pr[3], 'π π̄ = 5'); }
  check(20 - 36 === -16 && -Math.pow(5 - 1, 2) === -16, 'Q₅(1) = −(p − 1)² = −16');

  /* 2. CIRCLE: Satake parameters multiply to 1; Toeplitz det = (20 − λ̂²)/5; on the circle iff λ̂² ≤ 20 */
  for (let k = 0; k <= 40; k++) {
    const lam = -7 + 14 * k / 40, s = satake(lam);
    check(Math.abs(s.u1[0] * s.u2[0] - s.u1[1] * s.u2[1] - 1) < 1e-9 && Math.abs(s.u1[0] * s.u2[1] + s.u1[1] * s.u2[0]) < 1e-9, `u₁u₂ = 1 at λ̂ = ${lam}`);
    check(Math.abs(s.u1[0] + s.u2[0] - lam / Math.sqrt(5)) < 1e-9, `u₁ + u₂ = λ̂/√5 at ${lam}`);
    const det = 4 - lam * lam / 5;
    check(Math.abs(det - (20 - lam * lam) / 5) < 1e-12, 'det T₁ = (20 − λ̂²)/5');
    const onC = Math.abs(Math.hypot(...s.u1) - 1) < 1e-9 && Math.abs(Math.hypot(...s.u2) - 1) < 1e-9;
    if (Math.abs(lam * lam - 20) > 1e-6) check(onC === (det >= 0), `on circle ⟺ det ≥ 0 at ${lam}`);
  }

  /* 3. EIGEN: the worked point, then the identity at many integer points by exact fractions */
  check(EQ_W.join() === '0,4,-4,8,4,0', `scalar parts ${EQ_W.join()}`);
  check(EQ_W.join() === [EQ[0] - 2 * EQ[1], EQ[0] + 2 * EQ[1], EQ[0] - 2 * EQ[2], EQ[0] + 2 * EQ[2], EQ[0] - 2 * EQ[3], EQ[0] + 2 * EQ[3]].join(), 'w ∓ 2x, w ∓ 2y, w ∓ 2z');
  check(EQ_SQ === 112 && 8 * qN2(EQ) - 2 * EQ[0] * EQ[0] === 112, '112 = 8·15 − 2·4');
  check(qN2(EQ) === 15 && fEq(fr(EQ[0] * EQ[0], qN2(EQ)), 4, 15) && fEq(chi1(EQ), 1, 15), '‖q‖² = 15, κ = 4/15, χ₁ = 1/15');
  check(fEq(fr(EQ_SQ, 5 * qN2(EQ)), 112, 75), 'Σκ = 112/75');
  check(fEq(heckeChi1(EQ), -2, 75) && fEq(fSub(fMul(fr(4), fr(112, 75)), fr(6)), -2, 75), 'T̂₅χ₁(q) = −2/75');
  check(fEq(fMul(fr(-2, 5), chi1(EQ)), -2, 75), '−2/5 · 1/15 = −2/75');
  /* the chapter's own example q = (3, 1, −2, 4): −2/25 */
  check(fEq(heckeChi1([3, 1, -2, 4]), -2, 25), 'chapter example (3, 1, −2, 4) gives −2/25');
  for (let k = 0; k < 60; k++) {
    const q = [0, 1, 2, 3].map(j => Math.floor(rnd(k, j) * 19) - 9);
    if (!qN2(q)) continue;
    const L = heckeChi1(q), R = fMul(fr(-2, 5), chi1(q));
    check(L[0] * R[1] === R[0] * L[1], `T̂₅χ₁ = −2/5 χ₁ at (${q.join(', ')})`);
  }
  check(fEq(fSub(fr(20), fMul(fr(-2, 5), fr(-2, 5))), 496, 25), '20 − (−2/5)² = 496/25');

  /* 4. TRACES: numerators, and E_n(1/5) by the Chebyshev recursion in fractions (independent route) */
  check(NF_A.slice(1).join() === '-1,-19,139,-359,-1321,16901', `numerators ${NF_A.join()}`);
  {
    const k = fr(1, 5), c = fSub(fMul(fr(4), k), fr(2));            /* 4κ − 2 = −6/5 */
    const Ech = [fr(1), fSub(fMul(fr(4), k), fr(1))];
    for (let n = 2; n <= 6; n++) Ech.push(fSub(fMul(c, Ech[n - 1]), Ech[n - 2]));
    Ech.forEach((e, n) => check(e[0] === NF_E[n][0] && e[1] === NF_E[n][1], `E_${n}(1/5) = ${fStr(NF_E[n])}`));
    /* the trace as the complete homogeneous sum h_{2ℓ}(α, β), α + β = 2/√5, αβ = 1 (floating) */
    const s = 2 / Math.sqrt(5), disc = s * s - 4, re = s / 2, im = Math.sqrt(-disc) / 2;
    const th = Math.atan2(im, re);
    for (let l = 1; l <= 6; l++) check(Math.abs(Math.sin((2 * l + 1) * th) / Math.sin(th) - NF_E[l][0] / NF_E[l][1]) < 1e-12, `U_${2 * l}(1/√5) = E_${l}(1/5)`);
    [-6, -114, 834, -2154, -7926, 101406].forEach((n, i) => check(fEq(fMul(fr(6), NF_E[i + 1]), n, Math.pow(5, i + 1)), `6E_${i + 1} = ${n}/5^${i + 1}`));
  }

  /* 5. MATRIX: expand the six substitutions; eigenlines; margins; the V₂ trace */
  {
    const want = [null, 6, -2, -18];
    for (let d = 1; d <= 4; d++) {
      const M = symSum(d);
      let okIm = true, okRe = true;
      M.forEach((row, i) => row.forEach((e, j) => {
        if (e[1] !== 0) okIm = false;
        const w = d < 4 ? (i === j ? want[d] : 0) : M4[i][j];
        if (e[0] !== w) okRe = false;
      }));
      check(okIm, `degree ${d}: imaginary parts cancel`);
      check(okRe, `degree ${d}: integer matrix as shown`);
    }
    EIG_LINES.forEach(([v, l]) => { const Mv = M4.map(r => r.reduce((s, x, j) => s + x * v[j], 0)); check(Mv.every((x, i) => x === l * v[i]), `M⁽⁴⁾ (${v.join(',')}) = ${l}·v`); });
    check(2 * 54 - 3 * 74 === -114 && M4.reduce((s, r, i) => s + r[i], 0) === -114 && fEq(fMul(fr(150), NF_E[2]), -114), 'trace −114 = 25·6·(−19/25)');
    const want2 = [[64, 5], [496, 25], [2176, 125], [9584, 625], [7024, 625]];
    MARGINS.forEach((m, i) => check(fEq(m, ...want2[i]) && m[0] > 0, `margin ${fStr(m)}`));
  }

  /* 6. GRAPH: the finite field, the group, the bipartition, the girth and the witness */
  check(md(I13 * I13) === P13 - 1, '5² ≡ −1 (mod 13)');
  check([...SQ13].sort((a, b) => a - b).join() === '1,3,4,9,10,12' && !SQ13.has(5), 'squares mod 13 omit 5');
  GEN13.forEach((g, k) => check(md(g[0] * g[3] - g[1] * g[2]) === 5, `det of ${S5N[k]} mod 13 = 5`));
  check(GR.n === 2184 && 13 * (13 * 13 - 1) === 2184, `|PGL₂(𝔽₁₃)| reached: ${GR.n}`);
  check(GR.side0 === 1092, `square side ${GR.side0}`);
  let flips = true;
  for (const k of GR.depth.keys()) {
    const m = k.split(',').map(Number), s = SQ13.has(GR.det(k));
    for (const g of GEN13) if (SQ13.has(GR.det(norm13(mMul(m, g)).join(','))) === s) flips = false;
  }
  check(flips, 'every step changes the square class (bipartite)');
  check(GR.edges === 6 * 2184, '6-regular');
  check(GR.girth === 8, `girth ${GR.girth}`);
  check(!!CYCLE && CYCLE.left.length === 4 && CYCLE.right.length === 4, 'an 8-cycle is drawn');
  const wit = [287, 416, 364, 52];
  check(qN2(wit) === 390625 && 390625 === Math.pow(5, 8) && wit[0] % 5 !== 0, 'witness norm 5⁸');
  check(wit.slice(1).every(x => x % 26 === 0) && wit[0] % 2 === 1, 'witness (w, 13x′, 13y′, 13z′), w odd, x′ y′ z′ even');
  check(625 * 625 - 287 * 287 === 676 * 456 && 456 === 16 * 16 + 14 * 14 + 2 * 2, '625² − 287² = 676·456');
  check(Math.pow(5, 4) < 676 && 169 - 125 === 44 && (125 + 44) % 169 === 0, 'k = 2 and k = 3 excluded');
  check(20 - 36 + 17 === 1, 'M𝟏 = 𝟏');
});
Object.assign(FILM.speed, { stir: 0.02, circle: 0.014, boundary: 0.012, eigen: 0.016, traces: 0.016, matrix: 0.016, graph: 0.02, close: 0.025 });

/* Satake parameters of 1 − λ̂X + 5X², scaled by √5: complex pair on the circle, or a real pair r, 1/r */
function satake(lam) {
  const s = lam / Math.sqrt(5), D = s * s - 4;
  if (D <= 0) { const im = Math.sqrt(-D) / 2; return { u1: [s / 2, im], u2: [s / 2, -im], on: true }; }
  const r = (s + Math.sign(s || 1) * Math.sqrt(D)) / 2;
  return { u1: [r, 0], u2: [1 / r, 0], on: false };
}

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const nfFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function rich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  if (a <= 0.003) return x;
  const tot = parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0);
  let cx = o.align === 'center' ? x - tot / 2 : o.align === 'right' ? x - tot : x;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a }); cx += tw(s, size, fam, w); }
  return cx;
}
const NF_MISSING = new Set();
function leanChip(x, y, key, a, o = {}) {
  if (a <= 0.003) return;
  const [gid, label] = NF_LEAN[key], r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!NF_MISSING.has(gid)) { NF_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 19, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(label, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a small tag for a tier other than Lean, e.g. NUM or ARGUED */
function tierTag(x, y, s, col, a, size = 17) {
  if (a <= 0.003) return 0;
  const w = tw(s, size, F.mono, 700, 1) + 16;
  box(x, y - size - 2, w, size + 12, col, a, 1.5, 'rgba(0,0,0,0.4)');
  txt(s, x + 8, y + 3, { size, fam: F.mono, w: 700, c: col, a, ls: 1 });
  return w;
}
function wrapped(s, x, y, maxW, o = {}) {
  const size = o.size || 22, fam = o.fam || F.disp, w = o.w || 600, lh = o.lh || size * 1.32;
  const rows = wrap(s, size, fam, w, maxW);
  rows.forEach((r, i) => txt(r, x, y + i * lh, { size, fam, w, c: o.c || C.white, a: o.a == null ? 1 : o.a }));
  return y + rows.length * lh;
}
function nfTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.3) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.4);
  txt(`${DATA.book.code} · FILM`, W / 2, 360, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 500, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('THE NORM-FIVE SPECTRAL GAP', p, 5), W / 2, 600, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('HECKE · TOEPLITZ · −2/5 · SHELLS · X⁵ʼ¹³', W / 2, 680, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 5 });
}

/* ======================================================================= */
/*                          scene 1 · SIX TURNS                              */
/* ======================================================================= */
const ST_O = [560, 505], ST_R = 250;
SCENES.stir = S => {
  const u = S.u;
  nfTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Ramanujan bound', 'argued']]);
  const [ox, oy] = ST_O;
  /* line 2: a mean-zero pattern around q, fading under repeated averaging (schematic) */
  const pa = a * Q(S, 2, 'How fast', 0.6);
  if (pa > 0.003) {
    const steps = clamp((u - phraseAt(S, 2, 'flatten')) / 3.2) * 4;
    for (let k = 0; k <= Math.floor(steps); k++) {
      const amp = 0.42 * Math.pow(Math.sqrt(5) / 3, k), al = pa * (k === Math.floor(steps) ? 1 : 0.22);
      curve(t => { const th = TAU * t; const r = 120 * (1 + amp * Math.cos(3 * th) * Math.cos(th + 0.4)); return [ox + r * Math.cos(th), oy + r * Math.sin(th)]; }, 180, k === Math.floor(steps) ? C.now : C.cyan, al, 2.5);
    }
    txt('schematic · 示意', ox + 215, oy + 205, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.dim, a: pa });
  }
  /* the six generators around q */
  const ga = a * at(S, 0, 0.8);
  const ra = a * Q(S, 1, 'Right-multiply', 0.8);
  S5N.forEach((n, k) => {
    const th = -Math.PI / 2 + k * Math.PI / 3, gx = ox + ST_R * Math.cos(th), gy = oy + ST_R * Math.sin(th);
    const ak = ga * clamp(at(S, 0, 2.4) * 6 - k);
    if (ra > 0.003) { const e = eo(clamp(ra * 1.3 - k * 0.06)), off = Math.abs(Math.sin(th)) > 0.9 ? 36 : 82, r1 = 60 + (ST_R - off - 60) * e; arrow(ox + 60 * Math.cos(th), oy + 60 * Math.sin(th), ox + r1 * Math.cos(th), oy + r1 * Math.sin(th), k % 2 ? C.mag : C.cyan, ra, 2.5); }
    chip(gx, gy, 132, 52, n, k % 2 ? C.mag : C.cyan, ak, 26, F.math);
  });
  chip(ox, oy, 84, 56, 'q', C.now, ga, 32, F.math);
  if (ga > 0.003) txt('1² + 2² = 5', ox, 838, { size: 24, fam: F.math, w: 700, align: 'center', c: C.white, a: ga * 0.9 });
  /* the ledger */
  panel(1000, 200, 800, 630, a, C.cyan, 'HECKE · 赫克算子');
  const r0 = a * at(S, 0, 0.6), r1 = a * Q(S, 1, 'six values', 0.6), r2 = a * Q(S, 2, 'Hecke operator', 0.6);
  const r3 = a * Q(S, 3, 'squared, twenty', 0.6), r4 = a * Q(S, 3, 'never negative', 0.6);
  rich([['S₅ = { 1 ± 2i, 1 ± 2j, 1 ± 2k }', C.white]], 1035, 280, { size: 32, a: r0 });
  rich([['‖π‖² = 5,   π π̄ = 5', C.white]], 1035, 330, { size: 26, a: r0 });
  rich([['(T̂₅ f)(q) = ', C.white], ['Σ', C.cyan], [' f(q · π/√5)', C.white]], 1035, 410, { size: 32, a: r1 });
  rich([['π ∈ S₅,     T₅ = T̂₅ / 6', C.dim]], 1035, 455, { size: 24, a: r1 });
  if (r2 > 0.003) txt('mean-zero shells · 零均值壳层', 1035, 510, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: r2 });
  rich([['|λ̂| ≤ 2√5', C.white], ['   ⟹   ', C.dim], ['λ̂² ≤ 20', C.white]], 1035, 590, { size: 34, a: r3 });
  rich([['20 − λ̂² ≥ 0', C.now]], 1400, 680, { size: 54, align: 'center', a: r4 });
  rich([['no root, no i · 无根号，无复数', C.cyan]], 1400, 730, { size: 22, fam: F.zh, align: 'center', a: r4 });
  rich([['constant f = 1:  λ̂ = 6,  20 − 36 = −16 < 0', C.dim]], 1035, 795, { size: 22, a: r4 });
};

/* ======================================================================= */
/*                          scene 2 · THE UNIT CIRCLE                        */
/* ======================================================================= */
const CI_O = [540, 480], CI_R = 200;
function ciLam(S) {
  const t0 = lineAt(S, 0).s;
  return 5.4 * Math.sin(0.42 * Math.max(0, S.u - t0) + 0.5);
}
SCENES.circle = S => {
  const a = nfFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, 'Lean checks', 'lean']]);
  const [ox, oy] = CI_O, lam = ciLam(S), sat = satake(lam);
  /* axes, the unit circle */
  line(ox - 410, oy, ox + 410, oy, C.dim, a * 0.6, 1.4); line(ox, oy + 250, ox, oy - 250, C.dim, a * 0.6, 1.4);
  ring(ox, oy, CI_R, C.cyan, a * 0.8, 2.5);
  txt('|u| = 1', ox + CI_R * 0.72 + 14, oy - CI_R * 0.72 - 10, { size: 24, fam: F.math, w: 700, c: C.cyan, a: a * 0.9 });
  txt('Re', ox + 405, oy + 30, { size: 20, fam: F.math, w: 700, c: C.dim, a, align: 'right' });
  txt('Im', ox + 12, oy - 238, { size: 20, fam: F.math, w: 700, c: C.dim, a });
  const pa = a * at(S, 0, 1.0);
  if (pa > 0.003) {
    const P = z => [ox + CI_R * z[0], oy - CI_R * z[1]];
    const col = sat.on ? C.cyan : C.mag;
    const p1 = P(sat.u1), p2 = P(sat.u2);
    const cl = (p) => [clamp(p[0], ox - 400, ox + 400), p[1]];
    const q1 = cl(p1), q2 = cl(p2);
    dashed(q1[0], q1[1], q2[0], q2[1], col, pa * 0.6, 1.5);
    dot(q1[0], q1[1], 14, sat.on ? 'c' : 'm', pa); dot(q2[0], q2[1], 14, sat.on ? 'c' : 'm', pa);
    txt('u₁', q1[0] + 14, q1[1] - 18, { size: 28, fam: F.math, w: 700, c: col, a: pa });
    txt('u₂', q2[0] + 14, q2[1] + 38, { size: 28, fam: F.math, w: 700, c: col, a: pa });
    /* readouts */
    const det = (20 - lam * lam) / 5;
    rich([['λ̂ = ', C.white], [(lam < 0 ? '−' : '') + Math.abs(lam).toFixed(2), C.now]], 140, 790, { size: 30, a: pa });
    rich([['det T₁ = (20 − λ̂²)/5 = ', C.white], [(det < 0 ? '−' : '') + Math.abs(det).toFixed(2), det >= 0 ? C.cyan : C.mag]], 400, 790, { size: 30, a: pa });
    txt(sat.on ? 'on the circle · 落在圆上' : 'off the circle: r and 1/r · 离开圆周', 140, 834, { size: 22, fam: F.zh, w: 700, c: col, a: pa });
  }
  /* the ledger */
  panel(1000, 200, 800, 630, a, C.cyan, 'SATAKE · TOEPLITZ · 佐武与托普利茨');
  const r0 = a * at(S, 0, 0.6), r1 = a * Q(S, 0, 'scale both roots', 0.6), r2 = a * at(S, 1, 0.6), r3 = a * Q(S, 1, 'Toeplitz determinant', 0.6);
  rich([['1 − λ̂X + 5X² = (1 − αX)(1 − βX)', C.white]], 1035, 275, { size: 30, a: r0 });
  rich([['u₁ = α/√5,   u₂ = β/√5', C.white]], 1035, 325, { size: 30, a: r1 });
  rich([['u₁ u₂ = 1,   u₁ + u₂ = λ̂/√5', C.white]], 1035, 385, { size: 30, a: r2 });
  if (r3 > 0.003) {
    const mx = 1040, my = 460;
    txt('T₁ =', mx, my + 30, { size: 30, fam: F.math, w: 700, c: C.white, a: r3 });
    const bx = mx + 90;
    line(bx, my - 12, bx, my + 72, C.white, r3, 2); line(bx + 300, my - 12, bx + 300, my + 72, C.white, r3, 2);
    [['2', 'λ̂/√5'], ['λ̂/√5', '2']].forEach((row, i) => row.forEach((s, j) => txt(s, bx + 75 + j * 150, my + 14 + i * 44, { size: 28, fam: F.math, w: 700, align: 'center', c: s === '2' ? C.dim : C.white, a: r3 })));
    rich([['det = ', C.white], ['(20 − λ̂²)/5', C.now]], 1460, my + 30, { size: 30, a: r3 });
  }
  /* Lean: the general finite criterion */
  const l1 = a * Q(S, 2, 'Lean checks', 0.6);
  if (l1 > 0.003) {
    line(1030, 590, 1770, 590, C.lean, l1 * 0.5, 1.2);
    rich([['u(σ j) = (ūⱼ)⁻¹,  uⱼ ≠ 0,  N + 1 ≥ #{uⱼ}:', C.white]], 1035, 635, { size: 26, a: l1 });
    rich([['Toeplitz_N(u) ⪰ 0  ⟺  ∀ j, |uⱼ| = 1', C.lean]], 1035, 690, { size: 34, a: l1 });
    leanChip(1035, 745, 'toeplitz', l1, { size: 19 });
    tierTag(1035, 800, 'N = 1 CASE · HAND DERIVATION · ARGUED', C.argued, l1 * Q(S, 2, 'unit circle', 0.6));
  }
};

/* ======================================================================= */
/*                          scene 3 · THE BOUNDARY                           */
/* ======================================================================= */
SCENES.boundary = S => {
  const a = nfFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'lean'], [1, 'Lubotzky', 'argued'], [2, null, 'open']]);
  const cols = [
    { x: 120, col: C.lean, head: 'FROZEN · 已冻结', a: a * at(S, 0, 0.7), rows: [
      ['finite Toeplitz PSD ⟺ unit circle', '有限托普利茨半正定 ⟺ 单位圆'],
      ['T̂₅χ₁ ≡ −2/5 · χ₁, margin 496/25', '本征值 −2/5，裕度 496/25'],
      ['shell recurrence, degree 1–4 matrices', '壳层递推与 1–4 次矩阵']] },
    { x: 700, col: C.argued, head: 'LITERATURE · MODEL · 文献与模型', a: a * Q(S, 1, 'Lubotzky', 0.7), rows: [
      ['LPS 1987: |λ̂| ≤ 2√p on every nonconstant SO(3) shell', '全谱界：文献结果'],
      ['LPS 1988: Ramanujan Cayley graphs X(p, q)', '拉马努金凯莱图：文献结果'],
      ['reading: critical-line optimality, internalised', '临界线最优性的内化：模型诠释']] },
    { x: 1280, col: C.open, head: 'OPEN · 开放', a: a * at(S, 2, 0.7), rows: [
      ['Ramanujan–Petersson for GLₙ, n ≥ 3, and Maass forms', '高秩拉马努金—彼得松猜想'],
      ['ERH for Dedekind zeta functions; Grand RH', '扩展黎曼猜想与全广义黎曼猜想'],
      ['ζ spectral theory rebuilt inside OmegaMath', '在 OmegaMath 内重建 ζ 谱理论']] }
  ];
  cols.forEach(c => {
    if (c.a <= 0.003) return;
    panel(c.x, 215, 520, 520, c.a, c.col, c.head);
    let y = 300;
    c.rows.forEach(([en, zh]) => {
      y = wrapped(en, c.x + 30, y, 460, { size: 25, fam: F.disp, w: 700, c: C.white, a: c.a });
      txt(zh, c.x + 30, y + 2, { size: 21, fam: F.zh, w: 700, c: c.col, a: c.a });
      y += 62;
    });
  });
  const na = a * Q(S, 0, 'not about', 0.6);
  if (na > 0.003) {
    rich([['criterion ≠ zeros of ζ(s)', C.now]], W / 2, 800, { size: 34, align: 'center', a: na });
  }
};

/* ======================================================================= */
/*                          scene 4 · MINUS TWO FIFTHS                       */
/* ======================================================================= */
SCENES.eigen = S => {
  const a = nfFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* left: the character and the six products */
  panel(120, 200, 820, 630, a, C.cyan, 'χ₁ AT q = (2, 1, 3, −1)');
  const r0 = a * at(S, 0, 0.6), r0b = a * Q(S, 0, 'over the norm', 0.6);
  rich([['χ₁(q) = ', C.white], ['(3w² − x² − y² − z²)', C.cyan], [' / ‖q‖²', C.white]], 150, 280, { size: 32, a: r0 });
  rich([['q = (2, 1, 3, −1):  ‖q‖² = 15,  κ = 4/15,  χ₁ = ', C.white], ['1/15', C.now]], 150, 335, { size: 26, a: r0b });
  const r1 = a * Q(S, 1, 'six scalar parts', 0.6);
  if (r1 > 0.003) {
    txt('π', 180, 400, { size: 22, fam: F.math, w: 700, c: C.dim, a: r1 });
    txt('scalar part of q · π', 420, 400, { size: 22, fam: F.math, w: 700, align: 'center', c: C.dim, a: r1 });
    txt('square', 680, 400, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: r1 });
    const forms = ['w − 2x', 'w + 2x', 'w − 2y', 'w + 2y', 'w − 2z', 'w + 2z'];
    EQ_W.forEach((w, k) => {
      const y = 448 + k * 52, ak = r1 * Q(S, 1, 'scalar parts', 0.4, k * 0.35);
      const col = k % 2 ? C.mag : C.cyan;
      txt(S5N[k], 150, y, { size: 26, fam: F.math, w: 700, c: col, a: ak });
      txt(`${forms[k]} = ${String(w).replace('-', '−')}`, 420, y, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: ak });
      txt(String(w * w), 680, y, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: ak * Q(S, 2, 'squares add', 0.5) });
    });
    const sa = r1 * Q(S, 2, 'squares add', 0.6);
    if (sa > 0.003) { line(600, 760, 760, 760, C.white, sa, 1.5); rich([['Σ = ', C.white], ['112', C.now]], 680, 800, { size: 30, align: 'center', a: sa }); }
  }
  /* right: the sum and the Lean statements */
  panel(980, 200, 820, 630, a, C.cyan, 'T̂₅ χ₁ · 赫克作用');
  const s1 = a * Q(S, 2, 'squares add', 0.6), s2 = a * Q(S, 2, 'minus two fifths', 0.6);
  rich([['112 = 8 · 15 − 2 · 4 = 8‖q‖² − 2w²', C.white]], 1010, 275, { size: 26, a: s1 });
  rich([['Σ κ(q · π) = 112/75', C.white]], 1010, 320, { size: 26, a: s1 });
  rich([['T̂₅χ₁(q) = 4 · 112/75 − 6 = ', C.white], ['−2/75', C.now]], 1010, 375, { size: 28, a: s2 });
  rich([['= −2/5 · 1/15 = ', C.white], ['−2/5 · χ₁(q)', C.now]], 1010, 425, { size: 32, a: s2 });
  tierTag(1010, 470, 'NUM · COMPUTED HERE', C.cyan, s2);
  const l1 = a * Q(S, 3, 'Lean checks', 0.6), l2 = a * Q(S, 3, 'positive margin', 0.6);
  if (l1 > 0.003) {
    line(1010, 505, 1770, 505, C.lean, l1 * 0.5, 1.2);
    rich([['∀ q ∈ ℤ⁴ \\ {0}:  T̂₅χ₁(q) ≡ −2/5 · χ₁(q)', C.lean]], 1010, 555, { size: 28, a: l1 });
    leanChip(1010, 605, 'chi1', l1);
  }
  if (l2 > 0.003) {
    rich([['20 − (−2/5)² = ', C.lean], ['496/25', C.now], [' > 0', C.lean]], 1010, 690, { size: 36, a: l2 });
    leanChip(1010, 745, 'margin', l2);
    rich([['normalised: λ = −1/15,  5 − 9λ² = 124/25', C.dim]], 1010, 800, { size: 22, a: l2 });
  }
};

/* ======================================================================= */
/*                          scene 5 · SHELL TRACES                           */
/* ======================================================================= */
SCENES.traces = S => {
  const a = nfFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'Lean checks', 'lean'], [2, 'Representation theory', 'argued']]);
  /* bar chart of E_ℓ(1/5), ℓ = 1…6 */
  const x0 = 170, y0 = 500, sc = 210, dx = 150;
  const ca = a * at(S, 0, 0.6);
  if (ca > 0.003) {
    line(x0 - 30, y0, x0 + 6 * dx - 20, y0, C.dim, ca, 1.5);
    txt('0', x0 - 44, y0 + 8, { size: 20, fam: F.math, w: 700, c: C.dim, a: ca, align: 'right' });
    [1, -1].forEach(s => { dashed(x0 - 30, y0 - s * sc, x0 + 6 * dx - 20, y0 - s * sc, C.dim, ca * 0.35, 1); txt(s > 0 ? '1' : '−1', x0 - 44, y0 - s * sc + 8, { size: 20, fam: F.math, w: 700, c: C.dim, a: ca, align: 'right' }); });
    txt('Eₗ(1/5) = aₗ / 5ˡ', x0 - 30, 215, { size: 26, fam: F.math, w: 700, c: C.white, a: ca });
  }
  for (let l = 1; l <= 6; l++) {
    const ak = a * Q(S, 0, 'minus six times', 0.5, (l - 1) * 0.55);
    if (ak <= 0.003) continue;
    const v = NF_E[l][0] / NF_E[l][1], cx = x0 + (l - 1) * dx + 45, h = v * sc * eo(ak);
    const cur = l === 1 + Math.min(5, Math.floor(clamp((S.u - phraseAt(S, 0, 'minus six times')) / 0.55)));
    fillBox(cx - 34, Math.min(y0, y0 - h), 68, Math.abs(h), v > 0 ? C.cyan : C.mag, ak * 0.55);
    box(cx - 34, Math.min(y0, y0 - h), 68, Math.abs(h) || 1, v > 0 ? C.cyan : C.mag, ak, 1.5);
    /* the exact fraction, stacked */
    const ty = v > 0 ? y0 - h - 66 : y0 - h + 34;
    const col = cur && S.u < lineAt(S, 1).s ? C.now : C.white;
    txt(String(NF_A[l]).replace('-', '−'), cx, ty, { size: 24, fam: F.math, w: 700, align: 'center', c: col, a: ak });
    line(cx - 40, ty + 9, cx + 40, ty + 9, col, ak, 1.2);
    txt(String(NF_E[l][1]), cx, ty + 36, { size: 22, fam: F.math, w: 700, align: 'center', c: col, a: ak });
    /* the shell and its dimension */
    const sa = a * Q(S, 2, 'trace on a shell', 0.5);
    txt(`V${'₀₁₂₃₄₅₆'[l]}`, cx, 790, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: ak });
    txt(`dim ${2 * l + 1}`, cx, 826, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.argued, a: sa });
  }
  /* the ledger */
  panel(1100, 200, 700, 630, a, C.cyan, 'RECURRENCE · 整数递推');
  const r0 = a * at(S, 0, 0.6);
  rich([['a₀ = 1,   a₁ = −1', C.white]], 1130, 280, { size: 30, a: r0 });
  rich([['aₙ₊₂ = −6 aₙ₊₁ − 25 aₙ', C.now]], 1130, 335, { size: 32, a: r0 });
  rich([['−1, −19, 139, −359, −1321, 16901', C.white]], 1130, 390, { size: 26, a: a * Q(S, 0, 'the one before', 0.6) });
  const l1 = a * Q(S, 1, 'Lean checks', 0.6);
  if (l1 > 0.003) {
    rich([['∀ n:  Eₙ(1/5) ≡ aₙ / 5ⁿ', C.lean]], 1130, 455, { size: 28, a: l1 });
    leanChip(1130, 500, 'formula', l1, { size: 18 });
    rich([['n = 1…6:  −1/5, …, 16901/15625', C.lean]], 1130, 555, { size: 26, a: a * Q(S, 1, 'six values', 0.6) });
    leanChip(1130, 600, 'traces', a * Q(S, 1, 'six values', 0.6), { size: 18 });
  }
  const g = a * Q(S, 2, 'Representation theory', 0.6);
  if (g > 0.003) {
    line(1130, 640, 1770, 640, C.argued, g * 0.5, 1.2);
    rich([['Tr(T₅ | Vₗ) = Eₗ(1/5)', C.white]], 1130, 690, { size: 28, a: g });
    rich([['Tr(T̂₅ | Vₗ) = 6 Eₗ(1/5)', C.white]], 1130, 735, { size: 26, a: g });
    tierTag(1130, 790, 'ARGUED · REPRESENTATION THEORY', C.argued, g);
  }
};

/* ======================================================================= */
/*                          scene 6 · DEGREE FOUR                            */
/* ======================================================================= */
SCENES.matrix = S => {
  const a = nfFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean']]);
  /* line 0: the three scalar shells */
  [['d = 1', '6 · I₂'], ['d = 2', '−2 · I₃'], ['d = 3', '−18 · I₄']].forEach(([d, m], k) => {
    const ak = a * Q(S, 0, 'sum to six', 0.5, k * 0.6);
    const x = 140 + k * 290;
    box(x, 200, 260, 92, C.cyan, ak, 1.5, 'rgba(0,0,0,0.4)');
    txt(d, x + 18, 236, { size: 20, fam: F.mono, w: 700, c: C.dim, a: ak });
    txt(m, x + 130, 274, { size: 32, fam: F.math, w: 700, align: 'center', c: C.white, a: ak });
  });
  if (a * at(S, 0, 0.6) > 0.003) txt('Σ over S₅ of Symᵈ of [w+ix  y+iz; −y+iz  w−ix]', 140, 335, { size: 22, fam: F.math, w: 700, c: C.dim, a: a * at(S, 0, 0.6) });
  /* line 1: M⁽⁴⁾ */
  const ma = a * at(S, 1, 0.6), hi = a * Q(S, 1, 'sixty-four', 0.6);
  if (ma > 0.003) {
    const mx = 250, my = 400, cw = 120, ch = 76;
    txt('M⁽⁴⁾ =', 120, my + 2.5 * ch + 10, { size: 30, fam: F.math, w: 700, c: C.white, a: ma });
    line(mx, my, mx, my + 5 * ch, C.white, ma, 2); line(mx + 5 * cw, my, mx + 5 * cw, my + 5 * ch, C.white, ma, 2);
    M4.forEach((row, i) => row.forEach((v, j) => {
      const corner = (i === 0 && j === 4) || (i === 4 && j === 0);
      if (corner && hi > 0.003) fillBox(mx + j * cw + 14, my + i * ch + 8, cw - 28, ch - 16, C.now, hi * 0.18);
      const col = corner ? mix(C.white, C.now, hi) : v === 0 ? C.dim : C.white;
      txt(String(v).replace('-', '−'), mx + j * cw + cw / 2, my + i * ch + ch / 2 + 11, { size: 30, fam: F.math, w: 700, align: 'center', c: col, a: ma * (v === 0 ? 0.5 : 1) });
    }));
    if (hi > 0.003) {
      ctx.save(); ctx.globalAlpha = hi; ctx.strokeStyle = C.now; ctx.lineWidth = 2.5; ctx.setLineDash([8, 7]);
      ctx.beginPath(); ctx.moveTo(mx + 4.5 * cw, my + 0.5 * ch + 22); ctx.quadraticCurveTo(mx + 5 * cw + 70, my + 2.5 * ch, mx + 4.5 * cw, my + 4.5 * ch - 30); ctx.stroke(); ctx.restore();
      txt('u⁴ ↔ v⁴', mx + 5 * cw + 30, my + 2.5 * ch + 10, { size: 24, fam: F.math, w: 700, c: C.now, a: hi });
    }
  }
  /* right: the eigenlines and the margins */
  panel(1060, 200, 740, 630, a, C.cyan, 'EIGENLINES · 本征线');
  const ea = a * Q(S, 1, 'splitting into', 0.6);
  EIG_LINES.forEach(([v, l], k) => {
    const ak = ea * clamp((S.u - phraseAt(S, 1, 'splitting into')) / 0.4 - k * 0.6);
    const col = l > 0 ? C.cyan : C.mag;
    txt(`(${v.map(x => String(x).replace('-', '−')).join(', ')})`, 1090, 275 + k * 46, { size: 26, fam: F.math, w: 700, c: C.white, a: ak });
    txt(`↦ ${l > 0 ? '+' : '−'}${Math.abs(l)} · v`, 1420, 275 + k * 46, { size: 26, fam: F.math, w: 700, c: col, a: ak });
  });
  rich([['trace: 2 · 54 − 3 · 74 = −114 = 150 · (−19/25)', C.dim]], 1090, 515, { size: 22, a: ea * Q(S, 1, 'three times', 0.6) });
  const l1 = a * Q(S, 2, 'Lean checks', 0.6);
  if (l1 > 0.003) {
    line(1090, 545, 1770, 545, C.lean, l1 * 0.5, 1.2);
    rich([['20 − λ̂² > 0:', C.lean]], 1090, 590, { size: 26, a: l1 });
    rich([['64/5 · 496/25 · 2176/125 · 9584/625 · 7024/625', C.white]], 1090, 630, { size: 23, a: l1 });
    leanChip(1090, 675, 'margins', l1, { size: 18 });
    leanChip(1090, 715, 'eigenbasis', a * Q(S, 2, 'eigenlines', 0.6), { size: 18 });
    const na = a * Q(S, 2, 'exact minors', 0.6);
    rich([['V₃ … V₆ (d = 6, 8, 10, 12): leading minors > 0', C.white]], 1090, 765, { size: 22, a: na });
    tierTag(1090, 806, 'NUM · CHAPTER’S EXACT CHECK', C.cyan, na);
  }
};

/* ======================================================================= */
/*                          scene 7 · A FINITE GRAPH                         */
/* ======================================================================= */
const GR_O = [530, 500], GR_RAD = [0, 78, 168, 268, 330];
function grPos(k) {
  const p = BALL.pos.get(k);
  if (!p) return null;
  return [GR_O[0] + GR_RAD[p.dep] * Math.cos(p.ang), GR_O[1] + GR_RAD[p.dep] * Math.sin(p.ang)];
}
SCENES.graph = S => {
  const a = nfFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* the radius-3 ball, grown layer by layer; even depth = square side (cyan), odd = non-square side (magenta) */
  const grow = a * clamp((S.u - lineAt(S, 0).s) / 4.0) * 3;
  const dimmed = 1 - 0.55 * Q(S, 1, 'No cycle', 0.8);
  for (const k of BALL.nodes) {
    const p = BALL.pos.get(k), par = GR.par.get(k);
    if (p.dep === 0) continue;
    const ak = a * clamp(grow - (p.dep - 1)) * dimmed;
    if (ak <= 0.003) continue;
    const P = grPos(k), Q0 = grPos(par);
    line(Q0[0], Q0[1], P[0], P[1], p.dep % 2 ? C.mag : C.cyan, ak * 0.45, p.dep === 3 ? 0.8 : 1.4);
  }
  for (const k of BALL.nodes) {
    const p = BALL.pos.get(k), P = grPos(k);
    const ak = p.dep === 0 ? a : a * clamp(grow - (p.dep - 1)) * dimmed;
    if (ak <= 0.003) continue;
    dot(P[0], P[1], p.dep === 0 ? 14 : p.dep === 3 ? 4 : 8, p.dep % 2 ? 'm' : 'c', ak);
  }
  const ga = a * at(S, 0, 0.6);
  if (ga > 0.003) {
    txt('1 + 6 + 30 + 150 · radius 3 is a tree', 140, 822, { size: 22, fam: F.mono, w: 700, c: C.dim, a: ga });
  }
  /* the highlighted 8-cycle */
  const ca = a * Q(S, 1, 'five to the eighth', 0.8);
  if (CYCLE && ca > 0.003) {
    const X = (() => { const pa = grPos(CYCLE.left[0]), pb = grPos(CYCLE.right[0]); const ang = Math.atan2(pa[1] + pb[1] - 2 * GR_O[1], pa[0] + pb[0] - 2 * GR_O[0]); return [GR_O[0] + GR_RAD[4] * Math.cos(ang), GR_O[1] + GR_RAD[4] * Math.sin(ang)]; })();
    const path = [...CYCLE.left.slice().reverse().map(grPos), X, ...CYCLE.right.map(grPos)];
    ctx.save(); ctx.globalAlpha = ca; ctx.strokeStyle = C.now; ctx.lineWidth = 4; ctx.beginPath();
    path.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.restore();
    path.forEach(p => dot(p[0], p[1], 9, 'g', ca));
    txt('8-cycle', X[0] + 18, X[1] + 8, { size: 24, fam: F.mono, w: 700, c: C.now, a: ca });
  }
  /* the ledger */
  panel(1000, 200, 800, 630, a, C.cyan, 'X⁵ʼ¹³ = Cay(PGL₂(𝔽₁₃), S₅)');
  const r0 = a * at(S, 0, 0.6), r1 = a * Q(S, 0, 'not a square', 0.6), r1b = a * Q(S, 0, 'twenty-one eighty-four', 0.6);
  rich([['i ≡ 5 (mod 13):  5² = 25 ≡ −1', C.white]], 1030, 268, { size: 26, a: r0 });
  rich([['det [a+bi  c+di; −c+di  a−bi] = a²+b²+c²+d² = 5', C.dim]], 1030, 306, { size: 20, a: r0 });
  rich([['squares mod 13: {1, 3, 4, 9, 10, 12} ∌ 5', C.white]], 1030, 360, { size: 24, a: r1 });
  rich([['|PGL₂(𝔽₁₃)| = 13 · 168 = ', C.white], ['2184', C.now], [' = 1092 + 1092', C.white]], 1030, 404, { size: 26, a: r1b });
  rich([['6-regular · bipartite', C.cyan]], 1030, 442, { size: 22, a: r1b });
  const r2 = a * Q(S, 1, 'No cycle', 0.6), r2b = a * Q(S, 1, 'five to the eighth', 0.6);
  rich([['2k-cycle ⟹ w² + 676(u² + v² + t²) = 5²ᵏ', C.white]], 1030, 498, { size: 23, a: r2 });
  rich([['k = 1, 2:  25, 625 < 676  ✗      k = 3:  w = 44, even  ✗', C.dim]], 1030, 536, { size: 21, a: r2 });
  rich([['k = 4:  ', C.white], ['(287, 416, 364, 52)', C.now], ['  ‖·‖² = 5⁸  ✓', C.white]], 1030, 578, { size: 25, a: r2b });
  rich([['girth = 8', C.now]], 1030, 618, { size: 26, a: r2b });
  /* line 3: the squared spectrum strip */
  const r3 = a * at(S, 2, 0.6);
  if (r3 > 0.003) {
    const sx = 1050, sw = 700, sy = 700, X = v => sx + sw * v / 36;
    line(sx, sy, sx + sw, sy, C.dim, r3, 1.5);
    fillBox(X(0), sy - 16, X(19) - X(0), 16, C.cyan, r3 * 0.45);
    txt('1091 nontrivial σ² < 19', X(0), sy - 26, { size: 21, fam: F.mono, w: 700, c: C.cyan, a: r3 });
    [[0, '0', C.dim], [19, '19', C.cyan], [20, '20', C.white], [36, '36', C.mag]].forEach(([v, s, col]) => {
      line(X(v), sy - 4, X(v), sy + 10, col, r3, 2);
      txt(s, X(v), sy + 34, { size: 20, fam: F.math, w: 700, align: v === 19 ? 'right' : v === 20 ? 'left' : 'center', c: col, a: r3 });
    });
    dashed(X(20), sy - 50, X(20), sy + 10, C.white, r3 * 0.8, 1.5);
    txt('4p', X(20) + 8, sy - 34, { size: 20, fam: F.math, w: 700, c: C.white, a: r3 });
    dot(X(36), sy - 8, 9, 'm', r3);
    txt('trivial', X(36), sy - 26, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.mag, a: r3 });
    rich([['20I − BᵀB + (17/1092)J ⪰ I', C.white]], 1030, 790, { size: 23, a: r3 });
    tierTag(1460, 794, 'NUM · CHAPTER’S CERTIFICATE', C.cyan, r3, 15);
  }
};

/* ======================================================================= */
/*                                 the end                                   */
/* ======================================================================= */
SCENES.close = S => {
  closingCard(S, { from: 0.1, y: 232 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[1], t = sc.start + 6;
  background(t, sc, 1, 6);
  const ox = 1380, oy = 520, R = 230;
  line(ox - 330, oy, ox + 330, oy, C.dim, 0.6, 1.4); line(ox, oy + 270, ox, oy - 270, C.dim, 0.6, 1.4);
  ring(ox, oy, R, C.cyan, 0.9, 3);
  const s = satake(-2 / 5);
  [s.u1, s.u2].forEach(z => dot(ox + R * z[0], oy - R * z[1], 16, 'c', 1));
  const s2 = satake(6);
  [s2.u1, s2.u2].forEach(z => dot(ox + R * z[0], oy - R * z[1], 14, 'm', 1));
  txt(DATA.film.title_zh, 600, 430, { size: 104, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('THE NORM-FIVE', 600, 540, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('SPECTRAL GAP', 600, 610, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 5 });
  rich([['20 − λ̂² ≥ 0', C.now]], 600, 700, { size: 40, align: 'center' });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 600, 770, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 1, sc);
  post(0);
};
