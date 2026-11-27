/* Film · A Ruler for Every Prime · 每个素数一把尺 (book omega-math, chapter 14). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests (all in chapter 14 of the book):
     rulers   the flat ruler |n|∞ = n and the prime rulers |n|_p = p^(−v_p(n)) for n = 2 … 6 (definition of 14.1,
              computed here); the bars are drawn on a log scale; "primes as curvature-recovery nuclei" is the
              chapter's MODEL reading (argued).
     closure  the product |n|∞ ∏ |n|_p = 1 for 2 … 6 and the escape witness 31 (example ex-ch14-adelic-nucleation-audit,
              recomputed here); thm-ch14-adelic-product-formula (LEAN, rational_padic_product_formula) and
              thm-ch14-prime-log-independence (LEAN, prime_log_rational_independence).
     spinor   (1 + 2i)(1 − 2i) = 5 and the six canonical spinors S₅ (definition def-ch14-hurwitz-prime-spinors, computed
              here); thm-ch14-lps-norm-five (LEAN, lps_norm_five: normSq 5, κ = 1/5); the 3-4-5 rotation 5R(1 + 2i)
              recomputed here by quaternion conjugation (computed).
     split    split(w, x, y, z) = [[w + 2x, y + 2z], [2z − y, w − 2x]] mod 5 of thm-ch14-hurwitz-mod5-splitting; the six
              images, their rank-one factors and the 36 products are recomputed here; LEAN: mod_five_rank_one,
              mod_five_product_zero.
     words    the reduced word (1 + 2i)(1 + 2j)(1 + 2k), its running product and norms 5, 25, 125, the link scalars
              of the mod-5 chain and the residues (3, 1, 3, 1) (computed here); thm-ch14-reduced-word-non-scalar parts 1
              and 2 (LEAN, reduced_word_split5_nonzero, reduced_word_normSq); the link picture is the proof idea (argued).
     tree     reduced-word counts 6, 30, 150 (table of 14.5, recomputed by enumeration; all 187 words of length ≤ 3 give
              distinct rotations, computed); thm-ch14-reduced-words-adjoint-injective (LEAN); bit height ½ log₂ 5
              ≈ 1.160964 (computed).
     cover    the six norm-5 axes of thm-ch14-six-axis-open-cover (LEAN, rational_six_axis_open_cover); the 45° caps
              and the sampled covering are computed here (a picture, not the proof).
   On load, FILM.init re-derives every number on screen by an independent route; any disagreement is pushed to
   window.FILM_ERRORS, which stops the render. */
'use strict';

const RP_LEAN = {
  adele: 'D5/S3/Factorization/Embeddings/RationalPadicProductFormula.rational_padic_product_formula',
  logs: 'D5/S3/Weil/PrimeAddress/PrimeLogIndependence.prime_log_rational_independence',
  norm5: 'D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_norm_five',
  rank1: 'D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.mod_five_rank_one',
  zero: 'D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.mod_five_product_zero',
  nonzero: 'D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_word_split5_nonzero',
  normL: 'D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_word_normSq',
  inject: 'D5/S3/Quantum/AURICOmega/OmegaLieTripleAndFreeGroup.reduced_words_adjoint_injective',
  cover: 'D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover'
};

/* ---------------- exact arithmetic ---------------- */
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
const fr = (n, d = 1) => { const g = gcd(n, d) * (d < 0 ? -1 : 1); return [n / g, d / g]; };
const fMul = (x, y) => fr(x[0] * y[0], x[1] * y[1]);
const fStr = x => (x[1] === 1 ? String(x[0]) : `${x[0]}/${x[1]}`);
const vp = (n, p) => { let v = 0; n = Math.abs(n); while (n % p === 0) { n /= p; v++; } return v; };
const isPrime = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
const md = (x, m = 5) => ((x % m) + m) % m;
const sgn = x => (x < 0 ? '−' + Math.abs(x) : String(x));
/* the prime readings of a nonzero integer n: [[p, v_p(n), |n|_p], …] for the primes dividing n */
function readings(n) {
  const out = [];
  for (let p = 2; p <= Math.abs(n); p++) if (isPrime(p) && n % p === 0) { const v = vp(n, p); out.push([p, v, fr(1, p ** v)]); }
  return out;
}
const RP_ROWS = [2, 3, 4, 5, 6];
const RP_ESC = 31;

/* quaternion (w, x, y, z) = w + x i + y j + z k */
const qMul = (p, q) => [
  p[0] * q[0] - p[1] * q[1] - p[2] * q[2] - p[3] * q[3],
  p[0] * q[1] + p[1] * q[0] + p[2] * q[3] - p[3] * q[2],
  p[0] * q[2] - p[1] * q[3] + p[2] * q[0] + p[3] * q[1],
  p[0] * q[3] + p[1] * q[2] - p[2] * q[1] + p[3] * q[0]
];
const qConj = p => [p[0], -p[1], -p[2], -p[3]];
const qN = p => p.reduce((s, v) => s + v * v, 0);
/* the six canonical spinors of S₅, in the order 1 ± 2i, 1 ± 2j, 1 ± 2k */
const GENS = [
  { q: [1, 2, 0, 0], lab: '1 + 2i', ax: 0 }, { q: [1, -2, 0, 0], lab: '1 − 2i', ax: 0 },
  { q: [1, 0, 2, 0], lab: '1 + 2j', ax: 1 }, { q: [1, 0, -2, 0], lab: '1 − 2j', ax: 1 },
  { q: [1, 0, 0, 2], lab: '1 + 2k', ax: 2 }, { q: [1, 0, 0, -2], lab: '1 − 2k', ax: 2 }
];
const opp = (g, h) => g !== h && GENS[g].ax === GENS[h].ax;
/* 5R(π): columns π e π̄ for e = i, j, k (integer entries) */
function adj(q) {
  const cols = [[0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]].map(e => qMul(qMul(q, e), qConj(q)).slice(1));
  return [0, 1, 2].map(r => cols.map(c => c[r]));
}
/* the integer splitting map of thm-ch14-hurwitz-mod5-splitting, reduced mod 5 */
const split5 = ([w, x, y, z]) => [[md(w + 2 * x), md(y + 2 * z)], [md(2 * z - y), md(w - 2 * x)]];
const m2mul = (A, B) => [[md(A[0][0] * B[0][0] + A[0][1] * B[1][0]), md(A[0][0] * B[0][1] + A[0][1] * B[1][1])],
  [md(A[1][0] * B[0][0] + A[1][1] * B[1][0]), md(A[1][0] * B[0][1] + A[1][1] * B[1][1])]];
const m2zero = A => A.every(r => r.every(v => v === 0));
const inv5 = a => [0, 1, 3, 2, 4][md(a)];
/* M = u vᵀ over F₅: u = the first nonzero column, v from a row where u is nonzero */
function factor(M) {
  const j = M[0][0] || M[1][0] ? 0 : 1;
  const u = [M[0][j], M[1][j]], i = u[0] ? 0 : 1, c = inv5(u[i]);
  return { u, v: [md(M[i][0] * c), md(M[i][1] * c)] };
}
const SPL = GENS.map(g => split5(g.q));
const FAC = SPL.map(factor);
const PROD0 = GENS.map((_, g) => GENS.map((__, h) => m2zero(m2mul(SPL[g], SPL[h]))));
/* the sample word (1 + 2i)(1 + 2j)(1 + 2k) */
const WORD = [0, 2, 4];
const RUN = []; { let q = [1, 0, 0, 0]; for (const g of WORD) { q = qMul(q, GENS[g].q); RUN.push(q.slice()); } }
const LINKS = WORD.slice(1).map((h, i) => { const g = WORD[i]; return md(FAC[g].v[0] * FAC[h].u[0] + FAC[g].v[1] * FAC[h].u[1]); });
/* reduced words of length ≤ 3 */
function reducedWords(L) {
  let cur = [[]]; const all = [[]];
  for (let k = 1; k <= L; k++) {
    const nxt = [];
    for (const w of cur) for (let g = 0; g < 6; g++) if (!w.length || !opp(w[w.length - 1], g)) nxt.push(w.concat([g]));
    all.push(...nxt); cur = nxt;
  }
  return all;
}
const WORDS3 = reducedWords(3);
const COUNTS = [0, 1, 2, 3].map(L => WORDS3.filter(w => w.length === L).length);
const BITS = Math.log2(5) / 2;
/* the six axes of thm-ch14-six-axis-open-cover */
const AXES = [[1, 2, 0], [1, -2, 0], [0, 1, 2], [0, 1, -2], [2, 0, 1], [-2, 0, 1]];
const dot3 = (x, a) => x[0] * a[0] + x[1] * a[1] + x[2] * a[2];
const SPH = [];
{ const n = 900, ga = Math.PI * (3 - Math.sqrt(5)); for (let i = 0; i < n; i++) { const z = 1 - 2 * (i + 0.5) / n, r = Math.sqrt(1 - z * z); SPH.push([r * Math.cos(ga * i), r * Math.sin(ga * i), z]); } }
const capOf = x => { let best = -1, bi = -1; AXES.forEach((a, i) => { const v = 2 * dot3(x, a) ** 2; if (v > best) { best = v; bi = i; } }); return [bi, best]; };

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  const check = (ok, m) => { if (!ok) E.push('a-ruler-for-every-prime film: ' + m); };
  /* 0. the cited theorems */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(RP_LEAN).length, `film.json cites ${lean.length} declarations`);
  for (const gid of Object.values(RP_LEAN)) { const r = leanCite(gid); check(r && r.kind === 'theorem', `${gid} is not a cited theorem`); }
  /* 1. the adelic product for 2 … 6 and 31, and for −18/35 of the chapter's table, by prime exponents */
  for (const n of RP_ROWS.concat([RP_ESC])) {
    let prod = fr(n);
    for (const [, , r] of readings(n)) prod = fMul(prod, r);
    check(fStr(prod) === '1', `product for ${n} is ${fStr(prod)}`);
    let back = 1; for (const [p, v] of readings(n)) back *= p ** v;
    check(back === n, `factorisation of ${n}`);
  }
  check(readings(RP_ESC).length === 1 && [2, 3, 5].every(p => RP_ESC % p === 1), '31 is blind to 2, 3, 5 (remainder 1)');
  check(2 * 3 * 5 + 1 === RP_ESC, '31 = 2·3·5 + 1');
  check(readings(6).map(r => fStr(r[2])).join() === '1/2,1/3', 'readings of 6');
  /* 2. the split 5 = (1 + 2i)(1 − 2i) and S₅ */
  check(qMul([1, 2, 0, 0], [1, -2, 0, 0]).join() === '5,0,0,0', '(1 + 2i)(1 − 2i) = 5');
  const sols = [];
  for (let w = -2; w <= 2; w++) for (let x = -2; x <= 2; x++) for (let y = -2; y <= 2; y++) for (let z = -2; z <= 2; z++)
    if (w * w + x * x + y * y + z * z === 5 && w > 0 && w % 2 === 1 && x % 2 === 0 && y % 2 === 0 && z % 2 === 0) sols.push([w, x, y, z].join());
  check(sols.length === 6 && GENS.every(g => sols.includes(g.q.join())), 'S₅ = the six canonical solutions');
  check(GENS.every(g => qN(g.q) === 5 && g.q[0] === 1), 'norm 5, κ = 1²/5');
  const M = adj(GENS[0].q);
  check(JSON.stringify(M) === JSON.stringify([[5, 0, 0], [0, -3, -4], [0, 4, -3]]), `5R(1 + 2i) = ${JSON.stringify(M)}`);
  check(GENS.every(g => { const A = adj(g.q); return A[0][0] + A[1][1] + A[2][2] === 5 + 2 * -3; }), 'cos θ = −3/5 for all six');
  /* 3. mod-5 images: rank one, nonzero, factors reproduce, zero products exactly on opposite pairs */
  SPL.forEach((S5m, g) => {
    check(!m2zero(S5m) && md(S5m[0][0] * S5m[1][1] - S5m[0][1] * S5m[1][0]) === 0, `split5 of generator ${g} is rank one`);
    const f = FAC[g];
    check([0, 1].every(i => [0, 1].every(j => md(f.u[i] * f.v[j]) === S5m[i][j])), `factor of generator ${g}`);
  });
  check(JSON.stringify(SPL[0]) === '[[0,0],[0,2]]', 'split5(1 + 2i) = [[0,0],[0,2]]');
  let zeros = 0;
  for (let g = 0; g < 6; g++) for (let h = 0; h < 6; h++) { if (PROD0[g][h]) zeros++; check(PROD0[g][h] === opp(g, h), `product ${g}·${h}`); }
  check(zeros === 6, `${zeros} zero products`);
  /* 4. the sample word, by multiplying the other way (right to left) and by the split homomorphism */
  check(RUN.map(qN).join() === '5,25,125', 'norms 5, 25, 125');
  const rl = qMul(GENS[0].q, qMul(GENS[2].q, GENS[4].q));
  check(rl.join() === '-7,6,-2,6' && RUN[2].join() === '-7,6,-2,6', `word value ${rl}`);
  check(RUN[2].map(v => md(v)).join() === '3,1,3,1', 'residues 3, 1, 3, 1');
  check(JSON.stringify(m2mul(m2mul(SPL[0], SPL[2]), SPL[4])) === JSON.stringify(split5(RUN[2])), 'split5 is multiplicative on the word');
  check(!m2zero(split5(RUN[2])) && LINKS.every(l => l !== 0), 'links nonzero');
  /* 5. reduced word counts and distinct rotations (5^L R scaled to a common denominator 125) */
  check(COUNTS.join() === '1,6,30,150', `counts ${COUNTS}`);
  check([1, 2, 3, 4, 5].map(L => 6 * 5 ** (L - 1)).join() === '6,30,150,750,3750', '6·5^(L−1)');
  const keys = new Set();
  for (const w of WORDS3) {
    let q = [1, 0, 0, 0]; for (const g of w) q = qMul(q, GENS[g].q);
    check(qN(q) === 5 ** w.length, 'norm 5^L');
    if (w.length) check(!q.every(v => v % 5 === 0), '5-primitive');
    keys.add(JSON.stringify(adj(q).map(r => r.map(v => v * 5 ** (2 * (3 - w.length))))));
  }
  check(keys.size === WORDS3.length && WORDS3.length === 187, `${keys.size} distinct rotations of ${WORDS3.length}`);
  check(BITS.toFixed(6) === '1.160964', `bits ${BITS}`);
  /* 6. the six axes: squared length 5, every sampled point lies in some cap (max 2⟨x, a⟩² ≥ 6) */
  check(AXES.every(a => dot3(a, a) === 5), 'axes of squared length 5');
  check(SPH.every(x => capOf(x)[1] >= 6 - 1e-9), 'sampled cover');
  check(Math.abs(Math.cos(Math.PI / 4) ** 2 * 2 * 5 - 5) < 1e-12, 'cap edge at 45°');
});
Object.assign(FILM.speed, { rulers: 0.02, closure: 0.016, spinor: 0.016, split: 0.014, words: 0.016, tree: 0.018, cover: 0.014, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const fade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const RP_MISSING = new Set();
function leanChip(x, y, gid, a, size = 20) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!RP_MISSING.has(gid)) { RP_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt((r.name || r.label).split('.').slice(-1)[0], x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
function tag(x, y, s, col, a, size = 18) {
  if (a <= 0.003) return;
  const w = tw(s, size, F.zh, 700, 1) + 22;
  box(x, y - size - 4, w, size + 14, col, a, 1.5, 'rgba(0,0,0,0.5)');
  txt(s, x + 11, y, { size, fam: F.zh, w: 700, c: col, a, ls: 1 });
  return w;
}
/* a 2 × 2 matrix of residues with brackets */
function mat2(M, x, y, a, col = C.white, cell = 46, size = 30) {
  if (a <= 0.003) return;
  const w = cell * 2 + 20, h = cell * 2;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 2.5; ctx.beginPath();
  ctx.moveTo(x + 10, y); ctx.lineTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + 10, y + h);
  ctx.moveTo(x + w - 10, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w - 10, y + h); ctx.stroke(); ctx.restore();
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++)
    txt(String(M[i][j]), x + 10 + cell * j + cell / 2, y + cell * i + cell * 0.72, { size, fam: F.mono, w: 700, align: 'center', c: M[i][j] ? col : C.dim, a });
}

/* opening title */
function title(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('A RULER FOR EVERY PRIME', p, 5), W / 2, 580, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 6, ab: 2 });
  txt('|r|∞ · ∏ |r|ₚ = 1 · (1 + 2i)(1 − 2i) = 5 · F₃ ⊂ SO(3, ℚ)', W / 2, 660, { size: 26, fam: F.math, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 2 });
}

/* ======================================================================= */
/*                    the ruler table (scenes 1 and 2)                       */
/* ======================================================================= */
/* one row per number: the flat reading as a cyan bar to the right of the axis, the prime readings as magenta bars
   to the left, both on a log scale, so equal lengths mean the product is one */
const RT = { x0: 960, k: 140, y0: 300, dy: 84 };
function rulerRow(n, y, o) {
  const a = o.a; if (a <= 0.003) return;
  const cur = o.cur, colF = cur ? C.now : C.cyan;
  if (cur) fillBox(150, y - 40, 1640, 72, C.now, a * 0.08);
  txt(String(n), 200, y + 14, { size: 44, fam: F.orb, w: 900, align: 'center', c: cur ? C.now : C.white, a });
  const fl = RT.k * Math.log(n) * clamp(o.grow == null ? 1 : o.grow);
  fillBox(RT.x0, y - 18, fl, 36, colF, a * 0.55);
  box(RT.x0, y - 18, Math.max(fl, 1), 36, colF, a, 1.5);
  txt(`|${n}|∞ = ${n}`, RT.x0 + fl + 16, y + 10, { size: 26, fam: F.math, w: 700, c: colF, a: a * clamp((o.grow == null ? 1 : o.grow) * 2) });
  const pa = a * clamp(o.primes || 0);
  if (pa > 0.003) {
    let x = RT.x0;
    const rs = readings(n);
    rs.forEach(([p, v, r], i) => {
      const len = RT.k * v * Math.log(p) * ease(clamp(o.primes));
      x -= len;
      fillBox(x, y - 18, len, 36, C.mag, pa * (i % 2 ? 0.35 : 0.55));
      box(x, y - 18, Math.max(len, 1), 36, C.mag, pa, 1.5);
      txt(`|${n}|${sub(p)} = ${fStr(r)}`, x + len / 2, y - 26, { size: 22, fam: F.math, w: 700, align: 'center', c: C.mag, a: pa });
    });
    if (o.blind) txt(o.blind, RT.x0 - 30, y + 10, { size: 22, fam: F.math, w: 700, align: 'right', c: C.dim, a: pa * clamp(o.blindA == null ? 1 : o.blindA) });
  }
  if (o.prod > 0.003) {
    chip(1715, y, 120, 54, '= 1', C.cyan, a * o.prod, 28);
  }
}
const SUBD = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };
const sub = n => String(n).split('').map(c => SUBD[c]).join('');
function rulerHeader(a, prods) {
  if (a <= 0.003) return;
  line(RT.x0, 222, RT.x0, RT.y0 + RT.dy * 5 + 90, C.dim, a * 0.7, 2);
  txt('← prime rulers |n|ₚ = p⁻ᵛ · 素数尺', RT.x0 - 20, 232, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.mag, a });
  txt('flat ruler |n|∞ · 平直尺 →', RT.x0 + 20, 232, { size: 22, fam: F.zh, w: 700, c: C.cyan, a });
  txt('n', 200, 232, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  txt('log scale · 对数刻度', RT.x0, 838, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a * 0.9 });
  if (prods > 0.003) txt('product · 总积', 1715, 232, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: a * prods });
}

/* ======================================================================= */
/*                          scene 1 · ONE RULER PER PRIME                    */
/* ======================================================================= */
SCENES.rulers = S => {
  title(S);
  const a = clamp((S.u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - S.u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, null, 'argued']]);
  const ph = ['two', 'three', 'four', 'five', 'six'];
  const pr = at(S, 1, 0.9, 0.4), focus = at(S, 2, 0.01) > 0 && at(S, 3, 0.01) === 0;
  rulerHeader(a * at(S, 0, 0.5), 0);
  RP_ROWS.forEach((n, i) => {
    const g = Q(S, 0, ph[i], 0.6);
    rulerRow(n, RT.y0 + i * RT.dy, { a: a * clamp(g * 3), grow: ease(g), primes: clamp(pr * 1.4 - i * 0.1), cur: focus && n === 6 });
  });
  const ma = a * at(S, 3, 0.6);
  if (ma > 0.003) {
    panel(1180, 690, 600, 132, ma, C.argued, 'MODEL · 本书诠释');
    txt('primes as curvature-recovery nuclei', 1206, 762, { size: 25, fam: F.disp, w: 700, c: C.white, a: ma });
    txt('素数：曲率回收核（诠释，非定理）', 1206, 800, { size: 22, fam: F.zh, w: 700, c: C.argued, a: ma });
  }
};

/* ======================================================================= */
/*                          scene 2 · THE PRODUCT IS ONE                     */
/* ======================================================================= */
SCENES.closure = S => {
  const a = fade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, null, 'lean']]);
  const ta = a * (1 - at(S, 2, 0.6));
  if (ta > 0.003) {
    rulerHeader(ta, 1);
    const esc = at(S, 1, 0.6);
    RP_ROWS.forEach((n, i) => rulerRow(n, RT.y0 + i * RT.dy, {
      a: ta * (n === 6 || esc > 0 ? 1 : 0.55), primes: 1, cur: n === 6 && esc === 0,
      prod: n === 6 ? Q(S, 0, 'is exactly one', 0.4) : Q(S, 0, 'Multiply the readings', 0.6, 0.3 + i * 0.15)
    }));
    const y31 = RT.y0 + 5 * RT.dy + 20;
    rulerRow(RP_ESC, y31, { a: ta * esc, primes: Q(S, 1, 'Only ruler thirty-one', 0.8), cur: true,
      blind: '|31|₂ = |31|₃ = |31|₅ = 1', blindA: Q(S, 1, 'is blind', 0.4), prod: Q(S, 1, 'answers', 0.4) });
    if (esc > 0) txt('31 = 2·3·5 + 1', 200, y31 + 50, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ta * esc });
    const ea = ta * Q(S, 0, 'times one half', 0.5) * (1 - esc);
    txt('6 × 1/2 × 1/3 = 1', 600, 196, { size: 34, fam: F.math, w: 700, align: 'center', c: C.now, a: ea });
  }
  /* line 2: the frozen product formula */
  const la = a * at(S, 2, 0.6, 0.3);
  if (la > 0.003) {
    panel(200, 200, 1520, 270, la, C.lean, 'RATIONAL ADELIC PRODUCT · 有理阿代尔乘积归元');
    txt('|r|∞ · ∏ₚ |r|ₚ = 1', W / 2, 322, { size: 64, fam: F.math, w: 700, align: 'center', c: C.white, a: la });
    txt('for every r ∈ ℚ, r ≠ 0 · finitely many factors ≠ 1 · 任意非零有理数，只有有限个因子不为 1', W / 2, 380, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.dim, a: la });
    leanChip(240, 440, RP_LEAN.adele, la, 22);
    stamp('= 1', 1610, 300, Q(S, 2, 'is exactly one', 0.5), C.lean, 50, -0.06);
  }
  /* line 3: prime logarithms as independent axes */
  const ga = a * at(S, 3, 0.6);
  if (ga > 0.003) {
    panel(200, 500, 1520, 330, ga, C.lean, 'PRIME LOGARITHMS · 素数对数');
    const ox = 470, oy = 760, axes = [[2, [330, 0]], [3, [-110, -165]], [5, [150, -180]]];
    axes.forEach(([p, d], i) => {
      const q = ga * at(S, 3, 0.5, 0.3 + i * 0.3);
      arrow(ox, oy, ox + d[0] * ease(q), oy + d[1] * ease(q), [C.cyan, C.mag, C.vio][i], q, 3);
      txt(`ln ${p}`, ox + d[0] + (d[0] < 0 ? -16 : 12), oy + d[1] + (d[1] < 0 ? -8 : 30), { size: 28, fam: F.math, w: 700, align: d[0] < 0 ? 'right' : 'left', c: [C.cyan, C.mag, C.vio][i], a: q });
    });
    const sa = ga * Q(S, 3, 'independent over the rationals', 0.5);
    txt('Σ cₚ ln p = 0,  cₚ ∈ ℚ   ⟹   every cₚ = 0', 920, 640, { size: 34, fam: F.math, w: 700, c: C.white, a: sa });
    txt('e.g. a ln 2 + b ln 3 = 0 ⟹ a = b = 0 · 每个素数一根独立的轴', 920, 696, { size: 22, fam: F.zh, w: 700, c: C.dim, a: sa });
    leanChip(920, 780, RP_LEAN.logs, sa, 22);
  }
};

/* ======================================================================= */
/*                                scene 3 · FIVE SPLITS                      */
/* ======================================================================= */
function genChip(g, x, y, w, h, a, o = {}) {
  if (a <= 0.003) return;
  const col = o.col || C.cyan;
  box(x, y, w, h, col, a, o.cur ? 3 : 1.5, 'rgba(0,0,0,0.5)');
  txt(GENS[g].lab, x + w / 2, y + 48, { size: 36, fam: F.math, w: 700, align: 'center', c: o.cur ? C.now : C.white, a });
  txt('(' + GENS[g].q.map(sgn).join(', ') + ')', x + w / 2, y + 82, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  if (o.norm > 0.003) txt('‖·‖² = 5 · κ = 1/5', x + w / 2, y + h - 14, { size: 20, fam: F.math, w: 700, align: 'center', c: C.lean, a: a * o.norm });
}
SCENES.spinor = S => {
  const a = fade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, null, 'lean'], [3, null, 'computed']]);
  /* line 0 */
  const ca = a * at(S, 0, 0.5);
  txt('2 · 3 = 3 · 2', 160, 240, { size: 40, fam: F.math, w: 700, c: C.cyan, a: ca });
  txt('integers commute · 整数可交换', 160, 280, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ca });
  const sa = a * Q(S, 0, 'five splits', 0.6);
  txt('(1 + 2i)(1 − 2i) = 5', 160, 380, { size: 56, fam: F.math, w: 700, c: C.white, a: sa, ab: 1 });
  txt('a prime splits in the whole quaternions · 素数在整四元数中分裂', 160, 424, { size: 22, fam: F.zh, w: 700, c: C.dim, a: sa });
  /* line 1: six spinors */
  const ba = a * at(S, 1, 0.5);
  txt('5 = 1² + 2² + 0² + 0²', 160, 500, { size: 34, fam: F.math, w: 700, c: C.white, a: ba });
  txt('S₅ · six spinors · 六枚素旋子', 560, 500, { size: 22, fam: F.zh, w: 700, c: C.mag, a: ba * Q(S, 1, 'six spinors', 0.5) });
  const norm = Q(S, 2, 'squared norm five', 0.6);
  for (let g = 0; g < 6; g++) {
    const col = g % 2, row = Math.floor(g / 2);
    const q = a * Q(S, 1, 'Put the two', 0.4, g * 0.18);
    genChip(g, 160 + row * 262, 530 + col * 140, 246, 126, q, { norm, cur: g === 0 && at(S, 3, 0.01) > 0 });
  }
  leanChip(160, 836, RP_LEAN.norm5, a * norm, 20);
  /* line 3: the 3-4-5 turn of 1 + 2i, computed by conjugation */
  const ra = a * at(S, 3, 0.6);
  if (ra > 0.003) {
    panel(1000, 200, 780, 630, ra, C.cyan, 'ADJOINT ROTATION · v ↦ π v π⁻¹ · π = 1 + 2i');
    const M = adj(GENS[0].q);
    txt('5R =', 1040, 340, { size: 32, fam: F.math, w: 700, c: C.white, a: ra });
    ctx.save(); ctx.globalAlpha = ra; ctx.strokeStyle = C.white; ctx.lineWidth = 2.5; ctx.beginPath();
    ctx.moveTo(1150, 240); ctx.lineTo(1138, 240); ctx.lineTo(1138, 420); ctx.lineTo(1150, 420);
    ctx.moveTo(1390, 240); ctx.lineTo(1402, 240); ctx.lineTo(1402, 420); ctx.lineTo(1390, 420); ctx.stroke(); ctx.restore();
    M.forEach((r, i) => r.forEach((v, j) => txt(sgn(v), 1190 + j * 80, 280 + i * 58, { size: 30, fam: F.mono, w: 700, align: 'center', c: i && j ? C.now : C.dim, a: ra })));
    txt('rotation about', 1440, 312, { size: 20, fam: F.disp, w: 700, c: C.dim, a: ra });
    txt('the x axis · 绕 x 轴', 1440, 342, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ra });
    /* the angle on a circle */
    const cx = 1280, cy = 640, R = 150, ang = Math.atan2(4, -3) * ease(at(S, 3, 1.2, 0.4));
    line(cx - R - 20, cy, cx + R + 20, cy, C.dim, ra * 0.6, 1.5); line(cx, cy - R - 20, cx, cy + R + 20, C.dim, ra * 0.6, 1.5);
    ring(cx, cy, R, C.cyan, ra * 0.7, 2);
    ctx.save(); ctx.globalAlpha = ra; ctx.strokeStyle = C.now; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, 52, 0, -ang, true); ctx.stroke(); ctx.restore();
    const px = cx + R * Math.cos(ang), py = cy - R * Math.sin(ang);
    line(cx, cy, cx + R, cy, C.cyan, ra, 3); line(cx, cy, px, py, C.now, ra, 3);
    dashed(px, py, px, cy, C.mag, ra * 0.8, 2);
    dot(px, py, 12, 'o', ra);
    const fa = ra * Q(S, 3, 'cosine minus three fifths', 0.5);
    txt('cos θ = −3/5', 1500, 600, { size: 30, fam: F.math, w: 700, c: C.now, a: fa });
    txt('sin θ = 4/5', 1500, 648, { size: 30, fam: F.math, w: 700, c: C.mag, a: fa });
    txt('3² + 4² = 5²', 1500, 708, { size: 24, fam: F.math, w: 700, c: C.dim, a: fa });
    txt('θ', cx + 62, cy - 34, { size: 26, fam: F.math, w: 700, c: C.now, a: ra });
  }
};

/* ======================================================================= */
/*                                 scene 4 · MOD FIVE                        */
/* ======================================================================= */
SCENES.split = S => {
  const a = fade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, null, 'lean']]);
  const ha = a * at(S, 0, 0.5);
  txt('split(w, x, y, z) = [[w + 2x, y + 2z], [2z − y, w − 2x]]  mod 5', W / 2, 205, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a: ha });
  txt('2² = 4 ≡ −1 (mod 5) · 模 5 下 2² ≡ −1', W / 2, 245, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ha });
  const grid = at(S, 3, 0.6);
  const mx0 = 175, mdx = 270, my = 300;
  const rk = Q(S, 2, 'rank one', 0.5);
  for (let g = 0; g < 6; g++) {
    const q = a * Q(S, 0, 'two by two matrix', 0.4, g * 0.15);
    if (q <= 0.003) continue;
    const x = mx0 + g * mdx, cur = g === 0 && at(S, 1, 0.01) > 0 && grid === 0;
    const col = cur ? C.now : C.cyan;
    txt(GENS[g].lab, x + 112, my, { size: 30, fam: F.math, w: 700, align: 'center', c: cur ? C.now : C.white, a: q });
    mat2(SPL[g], x + 56, my + 22, q, col, 46, 30);
    /* the rank-one factors u vᵀ */
    const fa = q * (g === 0 ? Q(S, 1, 'a single column', 0.5) : rk);
    if (fa > 0.003) {
      const f = FAC[g], yy = my + 160;
      txt('=', x + 20, yy + 40, { size: 30, fam: F.math, w: 700, c: C.white, a: fa });
      box(x + 46, yy, 44, 82, C.cyan, fa, 1.5);
      txt(String(f.u[0]), x + 68, yy + 32, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: fa });
      txt(String(f.u[1]), x + 68, yy + 70, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: fa });
      box(x + 104, yy + 20, 98, 42, C.mag, fa, 1.5);
      txt(f.v[0] + '  ' + f.v[1], x + 153, yy + 51, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.mag, a: fa });
    }
  }
  const la = a * rk * (1 - grid);
  if (la > 0.003) {
    txt('column u · 列', 300, 600, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: la });
    txt('row vᵀ · 行', 520, 600, { size: 22, fam: F.zh, w: 700, c: C.mag, a: la });
    txt('six nonzero rank-one outer products · 六个非零秩一外积', 300, 660, { size: 30, fam: F.zh, w: 700, c: C.white, a: la });
    leanChip(300, 740, RP_LEAN.rank1, la, 22);
  }
  /* line 3: the 6 × 6 product table */
  const ga = a * grid;
  if (ga > 0.003) {
    const gx = 520, gy = 590, cw = 104, ch = 38;
    txt('split5(g) ·', 160, gy + 90, { size: 22, fam: F.mono, w: 700, c: C.white, a: ga });
    txt('split5(h) = 0 ?', 160, gy + 124, { size: 22, fam: F.mono, w: 700, c: C.white, a: ga });
    txt('g ↓   h →', 160, gy + 170, { size: 20, fam: F.mono, w: 700, c: C.dim, a: ga });
    for (let h = 0; h < 6; h++) txt(GENS[h].lab, gx + h * cw + cw / 2, gy - 4, { size: 18, fam: F.math, w: 700, align: 'center', c: C.dim, a: ga });
    for (let g = 0; g < 6; g++) {
      txt(GENS[g].lab, gx - 14, gy + 30 + g * ch, { size: 18, fam: F.math, w: 700, align: 'right', c: C.dim, a: ga });
      for (let h = 0; h < 6; h++) {
        const z = PROD0[g][h], q = ga * clamp((S.u - lineAt(S, 3).s - 0.2 - (g * 6 + h) * 0.035) / 0.2);
        const x = gx + h * cw, y = gy + 6 + g * ch;
        fillBox(x + 2, y, cw - 4, ch - 4, z ? C.mag : C.cyan, q * (z ? 0.45 : 0.12));
        txt(z ? '0' : '≠ 0', x + cw / 2, y + 26, { size: 20, fam: F.mono, w: 700, align: 'center', c: z ? C.white : C.cyan, a: q });
      }
    }
    const za = ga * Q(S, 3, 'exactly six vanish', 0.5);
    txt('6 zeros · 6 个零', 1180, gy + 80, { size: 36, fam: F.zh, w: 900, c: C.mag, a: za });
    txt('exactly g, then its inverse', 1180, gy + 130, { size: 24, fam: F.disp, w: 700, c: C.white, a: za });
    txt('恰是 g 紧接它的逆', 1180, gy + 166, { size: 22, fam: F.zh, w: 700, c: C.dim, a: za });
    leanChip(1180, gy + 230, RP_LEAN.zero, za, 20);
  }
};

/* ======================================================================= */
/*                               scene 5 · NEVER HOME                        */
/* ======================================================================= */
SCENES.words = S => {
  const a = fade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [2, null, 'lean'], [3, null, 'computed']]);
  /* line 0: the chain of rank-one links */
  const xs = [260, 760, 1260], y0 = 240;
  WORD.forEach((g, i) => {
    const q = a * at(S, 0, 0.5, i * 0.5);
    const cur = at(S, 1, 0.01) > 0 && at(S, 2, 0.01) === 0 && Q(S, 1, ['One plus two i', 'then j', 'then k'][i], 0.01) > 0 &&
      (i === 2 || Q(S, 1, ['then j', 'then k'][i], 0.01) === 0);
    box(xs[i], y0, 300, 150, cur ? C.now : C.cyan, q, cur ? 3 : 1.5, 'rgba(0,0,0,0.5)');
    txt(GENS[g].lab, xs[i] + 150, y0 + 46, { size: 34, fam: F.math, w: 700, align: 'center', c: cur ? C.now : C.white, a: q });
    const f = FAC[g];
    txt(`u = (${f.u.join(', ')})ᵀ`, xs[i] + 150, y0 + 94, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: q });
    txt(`vᵀ = (${f.v.join(', ')})`, xs[i] + 150, y0 + 128, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: q });
    if (i < 2) {
      const la = a * at(S, 0, 0.5, 0.8 + i * 0.6);
      arrow(xs[i] + 310, y0 + 75, xs[i + 1] - 10, y0 + 75, C.white, la, 2.5);
      txt(`vᵀu = ${LINKS[i]}`, (xs[i] + 300 + xs[i + 1]) / 2, y0 + 58, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: la });
      txt('≠ 0', (xs[i] + 300 + xs[i + 1]) / 2, y0 + 112, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: la });
    }
  });
  txt('link scalars mod 5 · 模 5 衔接标量', 160, 440, { size: 20, fam: F.zh, w: 700, c: C.dim, a: a * at(S, 0, 0.5, 1.6) });
  /* line 1: the running product */
  const ph = ['One plus two i', 'then j', 'then k'];
  RUN.forEach((q, i) => {
    const r = a * Q(S, 1, ph[i], 0.5);
    const y = 500 + i * 62, last = i === 2;
    txt(['π₁', 'π₁π₂', 'π₁π₂π₃'][i] + ' =', 400, y, { size: 28, fam: F.math, w: 700, align: 'right', c: C.dim, a: r });
    txt('(' + q.map(sgn).join(', ') + ')', 430, y, { size: 30, fam: F.mono, w: 700, c: last ? C.now : C.white, a: r });
    txt(`‖·‖² = ${qN(q)} = 5${['¹', '²', '³'][i]}`, 900, y, { size: 30, fam: F.math, w: 700, c: last ? C.now : C.cyan, a: r * (last ? Q(S, 1, 'squared norm', 0.4) : 1) });
  });
  /* line 2: the two frozen laws */
  const la = a * at(S, 2, 0.5);
  if (la > 0.003) {
    panel(1300, 470, 480, 220, la, C.lean, 'EVERY WORD · 任意词');
    txt('‖evalQuat w‖² = 5ᴸ', 1326, 548, { size: 28, fam: F.math, w: 700, c: C.white, a: la });
    txt('reduced w: split5 ≠ 0', 1326, 600, { size: 28, fam: F.math, w: 700, c: C.white, a: la * Q(S, 2, 'every reduced word', 0.5) });
    txt('既约词模 5 不为零', 1326, 642, { size: 22, fam: F.zh, w: 700, c: C.dim, a: la * Q(S, 2, 'every reduced word', 0.5) });
    leanChip(160, 770, RP_LEAN.normL, la, 20);
    leanChip(760, 770, RP_LEAN.nonzero, la * Q(S, 2, 'every reduced word', 0.5), 20);
  }
  /* line 3: residues mod 5 */
  const ra = a * at(S, 3, 0.5);
  if (ra > 0.003) {
    const res = RUN[2].map(v => md(v));
    txt('mod 5 →', 900, 690, { size: 26, fam: F.math, w: 700, c: C.dim, a: ra });
    res.forEach((v, i) => chip(1085 + i * 60, 680, 50, 50, String(v), C.now, ra, 26));
    txt('5 ∤ any coordinate · 5 一个也整除不了', 900, 730, { size: 20, fam: F.zh, w: 700, c: C.now, a: ra * Q(S, 3, 'five divides none', 0.4) });
  }
};

/* ======================================================================= */
/*                               scene 6 · A FREE TREE                       */
/* ======================================================================= */
/* the Cayley tree of reduced words up to length 3, drawn radially */
const TREE = (() => {
  const nodes = [{ w: [], ang: 0, span: TAU, depth: 0 }];
  let cur = [nodes[0]];
  for (let L = 1; L <= 3; L++) {
    const nxt = [];
    for (const n of cur) {
      const kids = [];
      for (let g = 0; g < 6; g++) if (!n.w.length || !opp(n.w[n.w.length - 1], g)) kids.push(g);
      const span = n.span / kids.length;
      kids.forEach((g, i) => { const c = { w: n.w.concat([g]), ang: n.ang - n.span / 2 + span * (i + 0.5), span, depth: L, parent: n }; nodes.push(c); nxt.push(c); });
    }
    cur = nxt;
  }
  return nodes;
})();
SCENES.tree = S => {
  const a = fade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, null, 'lean'], [3, null, 'computed']]);
  const cx = 560, cy = 500, R = [0, 110, 215, 318];
  const ph = ['six of length one', 'thirty of length two', 'one hundred fifty'];
  const rot = S.u * 0.03;
  const pos = n => [cx + R[n.depth] * Math.cos(n.ang + rot), cy + R[n.depth] * Math.sin(n.ang + rot)];
  for (const n of TREE) {
    if (!n.depth) continue;
    const q = a * Q(S, 0, ph[n.depth - 1], 0.8);
    if (q <= 0.003) continue;
    const g = n.w[n.w.length - 1], col = [C.cyan, C.mag, C.vio][GENS[g].ax];
    const [x, y] = pos(n), [px, py] = pos(n.parent);
    line(px, py, lerp(px, x, ease(q)), lerp(py, y, ease(q)), col, q * (n.depth === 3 ? 0.55 : 0.85), n.depth === 3 ? 1.2 : 2.2);
    dot(lerp(px, x, ease(q)), lerp(py, y, ease(q)), [9, 6, 3.5][n.depth - 1], ['c', 'm', 'v'][GENS[g].ax], q);
  }
  dot(cx, cy, 14, 'w', a);
  txt('1', cx + 14, cy - 12, { size: 22, fam: F.mono, w: 700, c: C.white, a });
  txt('i · j · k axes: cyan · magenta · violet', cx, 862 - 20, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a * 0.9 });
  /* the count table */
  const tx = 1040, ty = 220;
  panel(tx, ty - 30, 740, 330, a * at(S, 0, 0.5), C.cyan, 'REDUCED WORDS · 既约词');
  const hd = ['L', 'words', '≤ L', '‖q‖²'];
  hd.forEach((h, j) => txt(h, tx + 60 + j * 170, ty + 40, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a * at(S, 0, 0.5) }));
  let cum = 0;
  for (let L = 0; L <= 3; L++) {
    cum += COUNTS[L];
    const q = a * (L === 0 ? at(S, 0, 0.5) : Q(S, 0, ph[L - 1], 0.5));
    const y = ty + 90 + L * 52, cur = L === 3 && at(S, 1, 0.01) === 0 && q > 0.5;
    [L, COUNTS[L], cum, 5 ** L].forEach((v, j) => txt(String(v), tx + 60 + j * 170, y, { size: 32, fam: F.mono, w: 700, align: 'center', c: j === 1 ? (cur ? C.now : C.white) : C.cyan, a: q }));
  }
  txt('6 · 5ᴸ⁻¹: five fresh choices each step · 每步五个新选择', tx + 30, ty + 286, { size: 20, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 0, 'one hundred fifty', 0.5) });
  /* line 1–2: injectivity and the free group */
  const ia = a * at(S, 1, 0.5);
  if (ia > 0.003) {
    panel(tx, 540, 740, 250, ia, C.lean, 'ADJOINT INJECTIVITY · 伴随单射');
    txt('Ad(u)·x = Ad(v)·x,  Ad(u)·y = Ad(v)·y  ⟹  u = v', tx + 26, 610, { size: 25, fam: F.math, w: 700, c: C.white, a: ia });
    leanChip(tx + 26, 660, RP_LEAN.inject, ia, 20);
    const fa = a * Q(S, 2, 'freely generate', 0.5);
    txt('S₅ ⟶ F₃ ⊂ SO(3, ℚ)', tx + 26, 728, { size: 34, fam: F.math, w: 700, c: C.lean, a: fa });
    txt('187 reduced words ≤ 3 → 187 distinct rotations (computed here)', tx + 26, 772, { size: 18, fam: F.mono, w: 700, c: C.cyan, a: fa });
  }
  const ba = a * at(S, 3, 0.5);
  if (ba > 0.003) {
    txt(`½ log₂ 5 ≈ ${BITS.toFixed(6)} bits per gate · 比特/门`, tx, 834, { size: 26, fam: F.zh, w: 700, c: C.now, a: ba });
  }
};

/* ======================================================================= */
/*                                scene 7 · SIX AXES                         */
/* ======================================================================= */
const AX_COL = () => [C.cyan, C.cyan, C.mag, C.mag, C.vio, C.vio];
function basis(n) {
  const t = Math.abs(n[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
  const e1 = [n[1] * t[2] - n[2] * t[1], n[2] * t[0] - n[0] * t[2], n[0] * t[1] - n[1] * t[0]];
  const l1 = Math.hypot(...e1); e1.forEach((v, i) => { e1[i] = v / l1; });
  const e2 = [n[1] * e1[2] - n[2] * e1[1], n[2] * e1[0] - n[0] * e1[2], n[0] * e1[1] - n[1] * e1[0]];
  return [e1, e2];
}
SCENES.cover = S => {
  const a = fade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, null, 'lean']]);
  const cx = 560, cy = 500, R = 300, yaw = 0.5 + S.u * 0.12, pitch = -0.45;
  const view = v => rotX(rotZ(v, yaw), pitch);   // z out of the screen after rotation: use [x, y] and depth v[2]
  const P = v => { const r = view(v); return [cx + R * r[0], cy - R * r[2], r[1]]; };
  ring(cx, cy, R, C.dim, a * 0.6, 2);
  const cols = AX_COL();
  /* sample points coloured by the cap that holds them (line 1 on) */
  const pa = a * Q(S, 1, 'keep the points', 0.8);
  if (pa > 0.003) {
    for (let i = 0; i < SPH.length; i++) {
      const [x, y, d] = P(SPH[i]); if (d > 0) continue;   // front hemisphere only (d < 0 faces the viewer)
      const ci = capOf(SPH[i])[0];
      ctx.globalAlpha = pa * 0.75; ctx.fillStyle = cols[ci]; ctx.fillRect(x - 2, y - 2, 4, 4);
    }
    ctx.globalAlpha = 1;
  }
  /* the six axes and their 45° caps (both ends) */
  AXES.forEach((ax, i) => {
    const q = a * at(S, 0, 0.5, 0.4 + i * 0.25);
    if (q <= 0.003) return;
    const n = ax.map(v => v / Math.sqrt(5));
    for (const s of [1, -1]) {
      const m = n.map(v => v * s), [p, d] = [P(m), P(m)[2]];
      line(cx, cy, p[0], p[1], cols[i], q * (d < 0 ? 0.9 : 0.3), d < 0 ? 2.5 : 1.2);
      if (pa > 0.003) {
        const [e1, e2] = basis(m), k = Math.SQRT1_2;
        ctx.save(); ctx.strokeStyle = cols[i]; ctx.lineWidth = 2.2;
        for (let j = 0; j < 72; j++) {
          const t0 = j / 72 * TAU, t1 = (j + 1) / 72 * TAU;
          const v0 = m.map((v, r) => k * v + k * (Math.cos(t0) * e1[r] + Math.sin(t0) * e2[r]));
          const v1 = m.map((v, r) => k * v + k * (Math.cos(t1) * e1[r] + Math.sin(t1) * e2[r]));
          const A0 = P(v0), A1 = P(v1);
          ctx.globalAlpha = pa * (A0[2] < 0 ? 0.95 : 0.18); ctx.beginPath(); ctx.moveTo(A0[0], A0[1]); ctx.lineTo(A1[0], A1[1]); ctx.stroke();
        }
        ctx.restore();
      }
      if (s === 1 && d < 0) txt('a' + sub(i), p[0] + 10, p[1] - 10, { size: 22, fam: F.math, w: 700, c: cols[i], a: q });
    }
  });
  /* the statement */
  const px = 1000;
  panel(px, 190, 780, 270, a * at(S, 0, 0.5), C.cyan, 'SIX NORM-5 AXES IN ℝ³ · 六根模方 5 的轴');
  const ta = a * at(S, 0, 0.5);
  AXES.forEach((ax, i) => txt(`a${sub(i)} = (${ax.map(sgn).join(', ')})`, px + 30 + (i % 2) * 370, 262 + Math.floor(i / 2) * 50, { size: 28, fam: F.math, w: 700, c: cols[i], a: ta * at(S, 0, 0.5, 0.4 + i * 0.25) }));
  txt('‖aᵢ‖² = 5 · a different carrier from S₅ ⊂ ℤ⁴', px + 30, 428, { size: 20, fam: F.mono, w: 700, c: C.dim, a: ta * Q(S, 0, 'squared length five', 0.5) });
  const ca = a * at(S, 1, 0.5);
  txt('Cᵢ = { x ∈ S² : 5 < 2⟨x, aᵢ⟩² }', px + 30, 530, { size: 34, fam: F.math, w: 700, c: C.white, a: ca });
  txt('a cap of half-angle 45° around ±aᵢ (computed) · 半角 45° 的球冠', px + 30, 574, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ca });
  const la = a * at(S, 2, 0.5);
  if (la > 0.003) {
    panel(px, 610, 780, 220, la, C.lean, 'OPEN · COVERING · NO RIGHT ANGLE');
    txt('each Cᵢ open · ⋃ Cᵢ = S² · x, y ∈ Cᵢ ⟹ ⟨x, y⟩ ≠ 0', px + 26, 690, { size: 25, fam: F.math, w: 700, c: C.white, a: la });
    txt('开集 · 盖满球面 · 片内无正交对', px + 26, 734, { size: 22, fam: F.zh, w: 700, c: C.dim, a: la });
    leanChip(px + 26, 800, RP_LEAN.cover, la * Q(S, 2, 'none holds a right angle', 0.5), 20);
  }
};

/* ======================================================================= */
/*                                 scene 8 · LEDGER                          */
/* ======================================================================= */
SCENES.close = S => {
  closingCard(S, { from: 1.3, y: 200 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const si = 5, sc = TL.scenes[si], t = sc.start + 9;
  background(t, sc, si, 9);
  const cx = W / 2, cy = 620, R = [0, 120, 235, 345];
  const pos = n => [cx + R[n.depth] * Math.cos(n.ang), cy + R[n.depth] * Math.sin(n.ang) * 0.78];
  for (const n of TREE) {
    if (!n.depth) continue;
    const g = n.w[n.w.length - 1], col = [C.cyan, C.mag, C.vio][GENS[g].ax];
    const [x, y] = pos(n), [px, py] = pos(n.parent);
    line(px, py, x, y, col, n.depth === 3 ? 0.45 : 0.8, n.depth === 3 ? 1.2 : 2.2);
    dot(x, y, [9, 6, 3.5][n.depth - 1], ['c', 'm', 'v'][GENS[g].ax], 1);
  }
  dot(cx, cy, 14, 'w', 1);
  bloom(0.5);
  txt(DATA.film.title_zh, W / 2, 240, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('A RULER FOR EVERY PRIME', W / 2, 330, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 2, ls: 6 });
  txt('|r|∞ · ∏ |r|ₚ = 1 · (1 + 2i)(1 − 2i) = 5 · F₃ ⊂ SO(3, ℚ)', W / 2, 400, { size: 30, fam: F.math, w: 700, align: 'center', c: C.mag });
  txt(`${DATA.book.code} · FILM`, W / 2, 1000, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  hud(t, Math.round(t * 30), si, sc);
  post(0);
};
