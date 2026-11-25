/* Film · Which numbers are two squares? · 哪些数是两个平方之和
   (book quantum-geometry, chapter 23.2.1). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     hook     the numbers 1 … 50 as tiles; the sums of two squares (a, b ≥ 0) light up cyan, 25 = 9 + 16 (computed).
     mirror   the Gaussian grid: 3 + 2i and its mirror 3 − 2i; the turns cancel and the product is 13 = 3² + 2² on the
              real line (computed) ..... GaussianIntegerNorm.gaussian_integer_mul_conj_eq_sq_add_sq (LEAN).
     turn     multiplying adds angles and multiplies lengths (the dial is an analogy): (2 + i)(3 + 2i) = 4 + 7i,
              65 = 4² + 7²; (2 + i)(3 − 2i) = 8 − i, 65 = 8² + 1² (computed).
     primes   primes ≡ 1 (mod 4) with their two squares ..... SumTwoSquares.prime_eq_sq_add_sq_of_mod_four_eq_one (LEAN);
              squares mod 4 are 0 or 1 and a² + b² mod 4 ≠ 3 ..... QuadraticResidues.square_residues_and_sum_obstruction
              (LEAN); the names plane / line prime are the book's (argued).
     ledger   n = a² + b² ⟺ every prime q ≡ 3 (mod 4) has even exponent
              ..... SumTwoSquaresClassification.eq_sq_add_sq_iff_even_factorization (LEAN);
              9 = 3² + 0², 2025 = 3⁴·5² = 27² + 36², 2024 = 2³·11·23 is not (computed; the socks are an analogy).
     edge     existence, not a search; not a count of representations; splitting in ℤ[i] is a literature result.

   On load, FILM.init checks DATA.lean against the four theorems and re-derives every number on screen by brute force
   (sums of two squares up to 3000 against the factor criterion, every prime ≡ 1 (mod 4) below 2000, the residues,
   the products and angles). Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const IS_DEG = Math.PI / 180;
const IS_LEAN = {
  gaussian_integer_mul_conj_eq_sq_add_sq: 'D5/S3/PrimeForms/GaussianIntegers/GaussianIntegerNorm.gaussian_integer_mul_conj_eq_sq_add_sq',
  prime_eq_sq_add_sq_of_mod_four_eq_one: 'D5/S3/PrimeForms/SumTwoSquares.prime_eq_sq_add_sq_of_mod_four_eq_one',
  square_residues_and_sum_obstruction: 'D5/S3/PrimeForms/QuadraticResidues.square_residues_and_sum_obstruction',
  eq_sq_add_sq_iff_even_factorization: 'D5/S3/PrimeForms/SumTwoSquaresClassification.eq_sq_add_sq_iff_even_factorization'
};
/* all (a, b) with a ≤ b, a, b ≥ 0, a² + b² = n */
function isReps(n) { const r = []; for (let a = 0; 2 * a * a <= n; a++) { const b = Math.round(Math.sqrt(n - a * a)); if (b >= a && a * a + b * b === n) r.push([a, b]); } return r; }
const isTwoSq = n => isReps(n).length > 0;
const isPrime = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
/* the factorization of n ≥ 1 as [[prime, exponent], …] */
function isFactor(n) { const f = []; for (let p = 2; p * p <= n; p++) { let e = 0; while (n % p === 0) { n /= p; e++; } if (e) f.push([p, e]); } if (n > 1) f.push([n, 1]); return f; }
const isCrit = n => isFactor(n).every(([q, e]) => q % 4 !== 3 || e % 2 === 0);
/* Gaussian integers as [re, im] */
const gMul = (z, w) => [z[0] * w[0] - z[1] * w[1], z[0] * w[1] + z[1] * w[0]];
const gConj = z => [z[0], -z[1]];
const gN = z => z[0] * z[0] + z[1] * z[1];
const gArg = z => Math.atan2(z[1], z[0]);
const IS_Z = [3, 2], IS_A = [2, 1], IS_B = [3, 2];
const IS_AB = gMul(IS_A, IS_B), IS_ABm = gMul(IS_A, gConj(IS_B));
const IS_FACE = [5, 13, 17, 29, 37, 41], IS_LINE = [3, 7, 11, 19, 23, 31];

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('integer-skeleton film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(IS_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(IS_LEAN).length}`);
  for (const [short, gid] of Object.entries(IS_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }
  /* 1. HOOK: the tiles */
  check(isTwoSq(25) && 9 + 16 === 25, '25 = 9 + 16');
  check([5, 6, 7, 8].map(isTwoSq).join() === 'true,false,false,true', '5 yes, 6 no, 7 no, 8 yes');
  /* 2. MIRROR */
  const zz = gMul(IS_Z, gConj(IS_Z));
  check(zz[0] === 13 && zz[1] === 0 && gN(IS_Z) === 13, '(3 + 2i)(3 − 2i) = 13');
  for (let a = -9; a <= 9; a++) for (let b = -9; b <= 9; b++) { const p = gMul([a, b], gConj([a, b])); check(p[1] === 0 && p[0] === a * a + b * b, `z·z̄ at ${a}, ${b}`); }
  /* 3. TURN */
  check(IS_AB[0] === 4 && IS_AB[1] === 7 && gN(IS_AB) === 65 && 16 + 49 === 65, '(2 + i)(3 + 2i) = 4 + 7i');
  check(IS_ABm[0] === 8 && IS_ABm[1] === -1 && gN(IS_ABm) === 65 && 64 + 1 === 65, '(2 + i)(3 − 2i) = 8 − i');
  check(Math.abs(gArg(IS_A) + gArg(IS_B) - gArg(IS_AB)) < 1e-12, 'the angles add');
  check([Math.round(gArg(IS_A) / IS_DEG * 10), Math.round(gArg(IS_B) / IS_DEG * 10), Math.round(gArg(IS_AB) / IS_DEG * 10)].join() === '266,337,603', 'angles 26.6°, 33.7°, 60.3°');
  check(isReps(65).map(r => r.join()).join(';') === '1,8;4,7', '65 has exactly the two ways 1² + 8², 4² + 7²');
  /* 4. PRIMES */
  check(IS_FACE.every(p => isPrime(p) && p % 4 === 1) && IS_LINE.every(p => isPrime(p) && p % 4 === 3), 'the prime columns');
  for (let p = 2; p < 2000; p++) if (isPrime(p)) {
    if (p % 4 === 1) check(isTwoSq(p), `prime ${p} ≡ 1 is two squares`);
    if (p % 4 === 3) check(!isTwoSq(p), `prime ${p} ≡ 3 is not two squares`);
  }
  for (let n = 0; n < 60; n++) check((n * n) % 4 === n % 2, `n² mod 4 at ${n}`);
  for (let a = 0; a < 40; a++) for (let b = 0; b < 40; b++) check((a * a + b * b) % 4 !== 3, `a² + b² mod 4 at ${a}, ${b}`);
  /* 5. LEDGER */
  for (let n = 1; n <= 3000; n++) check(isTwoSq(n) === isCrit(n), `criterion at ${n}`);
  check(isFactor(2025).map(f => f.join('^')).join() === '3^4,5^2' && 27 * 27 + 36 * 36 === 2025, '2025');
  check(isFactor(2024).map(f => f.join('^')).join() === '2^3,11^1,23^1' && !isTwoSq(2024) && 2024 % 4 === 0, '2024');
  check(isFactor(9).map(f => f.join('^')).join() === '3^2' && isTwoSq(9), '9');
});
Object.assign(FILM.speed, { hook: 0.02, mirror: 0.014, turn: 0.016, primes: 0.018, ledger: 0.014, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const isFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function isRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const IS_MISSING = new Set();
function isLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!IS_MISSING.has(gid)) { IS_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* the Gaussian grid: origin O (screen), unit U pixels, x in [x0, x1], y in [y0, y1] */
function isGrid(O, U, xr, yr, a) {
  if (a <= 0.003) return;
  for (let x = xr[0]; x <= xr[1]; x++) for (let y = yr[0]; y <= yr[1]; y++) {
    const px = O[0] + x * U, py = O[1] - y * U;
    ctx.globalAlpha = a * (x === 0 || y === 0 ? 0.55 : 0.35); ctx.fillStyle = C.white;
    ctx.beginPath(); ctx.arc(px, py, 3, 0, TAU); ctx.fill(); ctx.globalAlpha = 1;
  }
  line(O[0] + (xr[0] - 0.4) * U, O[1], O[0] + (xr[1] + 0.4) * U, O[1], C.dim, a * 0.8, 1.5);
  line(O[0], O[1] - (yr[1] + 0.4) * U, O[0], O[1] - (yr[0] - 0.4) * U, C.dim, a * 0.8, 1.5);
}
const isP = (O, U, z) => [O[0] + z[0] * U, O[1] - z[1] * U];
function isArc(O, r, a0, a1, col, a, lw = 3) {
  if (a <= 0.003 || Math.abs(a1 - a0) < 1e-4) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw;
  ctx.beginPath(); ctx.arc(O[0], O[1], r, -a0, -a1, a1 > a0); ctx.stroke(); ctx.restore();
}
/* opening title */
function isTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 88, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('WHICH NUMBERS ARE TWO SQUARES?', p, 5), W / 2, 580, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
  txt('TILES · GRID · MIRROR · TURNS · PRIMES · LEDGER', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                               scene 1 · TWO SQUARES                       */
/* ======================================================================= */
const HK = { x0: 540, y0: 250, s: 76, g: 8 };
SCENES.hook = S => {
  const u = S.u;
  isTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, null, 'argued']]);
  const board = a * (1 - Q(S, 2, 'second direction', 0.9));
  const t1 = lineAt(S, 1).s;
  const hi = [[5, 'Five yes'], [6, 'six no'], [7, 'seven no'], [8, 'eight yes']];
  let cur = 25;
  if (u >= t1) { cur = null; for (const [n, ph] of hi) if (u >= phraseAt(S, 1, ph)) cur = n; }
  if (u >= lineAt(S, 2).s - 0.2) cur = null;
  for (let n = 1; n <= 50; n++) {
    const i = (n - 1) % 10, j = Math.floor((n - 1) / 10);
    const x = HK.x0 + i * (HK.s + HK.g), y = HK.y0 + j * (HK.s + HK.g);
    const yes = isTwoSq(n);
    const lit = n === 25 ? 1 : clamp((u - t1 - 0.03 * n) / 0.4);
    const col = yes ? C.cyan : C.dim;
    fillBox(x, y, HK.s, HK.s, yes ? C.cyan : C.white, board * (yes ? 0.08 + 0.22 * lit : 0.04));
    box(x, y, HK.s, HK.s, col, board * (yes ? 0.3 + 0.6 * lit : 0.35), 1.5);
    txt(String(n), x + HK.s / 2, y + HK.s / 2 + 11, { size: 30, fam: F.mono, w: 700, align: 'center', c: yes ? (lit > 0.5 ? C.white : C.dim) : C.dim, a: board * (yes ? 1 : 0.6) });
    if (n === cur) box(x - 5, y - 5, HK.s + 10, HK.s + 10, C.now, board, 3.5);
  }
  /* line 0: 25 = 9 + 16 */
  const c0 = a * at(S, 0, 0.5) * (1 - at(S, 1, 0.5));
  if (c0 > 0.003) { chip(W / 2, 730, 420, 70, '25 = 3² + 4² = 9 + 16', C.now, c0, 32, F.math); }
  /* line 1: the verdicts */
  if (u >= t1 && cur && u < lineAt(S, 2).s) {
    const yes = isTwoSq(cur), r = isReps(cur)[0];
    chip(W / 2, 730, 420, 70, yes ? `${cur} = ${r[0]}² + ${r[1]}²  ✓` : `${cur}  ✗`, yes ? C.cyan : C.mag, a * at(S, 1, 0.4), 32, F.math);
  }
  txt('sum of two squares · 两平方和', HK.x0, HK.y0 - 30, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: board * at(S, 1, 0.5) });
  txt('a, b = 0, 1, 2, …', HK.x0 + 840 - 8, HK.y0 - 30, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.dim, a: board * at(S, 1, 0.5) });
  /* line 2: the grid appears */
  const ga = a * Q(S, 2, 'second direction', 1.0, 0.9);
  if (ga > 0.003) {
    isGrid([W / 2, 520], 84, [-9, 9], [-3, 3], ga);
    txt('a + b i', W / 2 + 3 * 84 + 14, 520 - 2 * 84 - 14, { size: 30, fam: F.math, w: 700, c: C.white, a: ga });
    dot(W / 2 + 3 * 84, 520 - 2 * 84, 12, 'g', ga);
    txt('a + bi: numbers on a grid · 数添上第二个方向', W / 2, 840, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: ga });
  }
};

/* ======================================================================= */
/*                            scene 2 · A POINT AND ITS MIRROR               */
/* ======================================================================= */
const MI_O = [230, 600], MI_U = 78;
SCENES.mirror = S => {
  const u = S.u, a = isFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean'], [4, null, 'computed']]);
  isGrid(MI_O, MI_U, [-1, 13], [-3, 3], a);
  txt('real · 实轴', MI_O[0] + 11.6 * MI_U, MI_O[1] + 40, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.dim, a });
  txt('i', MI_O[0] + 14, MI_O[1] - 3.3 * MI_U, { size: 26, fam: F.math, w: 700, c: C.dim, a });
  const z = isP(MI_O, MI_U, IS_Z), zb = isP(MI_O, MI_U, gConj(IS_Z)), th = gArg(IS_Z);
  const pa = a * at(S, 0, 0.6), ma = a * Q(S, 0, 'mirror image', 0.6);
  arrow(MI_O[0], MI_O[1], z[0], z[1], C.now, pa, 5);
  txt('3 + 2i', z[0] + 14, z[1] - 10, { size: 30, fam: F.math, w: 700, c: C.now, a: pa });
  if (ma > 0.003) {
    ctx.save(); ctx.setLineDash([10, 8]); line(MI_O[0] - 60, MI_O[1], MI_O[0] + 6.4 * MI_U, MI_O[1], C.white, ma * 0.6, 2.5); ctx.restore();
    txt('mirror · 镜子', MI_O[0] + 5.2 * MI_U, MI_O[1] + 40, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ma });
    arrow(MI_O[0], MI_O[1], zb[0], zb[1], C.white, ma, 4);
    txt('3 − 2i', zb[0] + 14, zb[1] + 30, { size: 30, fam: F.math, w: 700, c: C.white, a: ma });
  }
  /* line 1: the turns cancel, the product lands at 13 */
  const ta = a * Q(S, 1, 'the turns cancel', 0.6);
  isArc(MI_O, 110, 0, th, C.now, ta, 3);
  isArc(MI_O, 110, 0, -th, C.white, ta, 3);
  if (ta > 0.003) {
    txt('+33.7°', MI_O[0] + 120, MI_O[1] - 42, { size: 22, fam: F.mono, w: 700, c: C.now, a: ta });
    txt('−33.7°', MI_O[0] + 120, MI_O[1] + 58, { size: 22, fam: F.mono, w: 700, c: C.white, a: ta });
  }
  const la = ease(Q(S, 1, 'land on the real line', 1.2));
  if (la > 0.003) {
    const e = [MI_O[0] + 13 * MI_U * la, MI_O[1]];
    line(MI_O[0], MI_O[1], e[0], e[1], C.cyan, a, 9);
    dot(e[0], e[1], 14, 'c', a);
    txt('13', MI_O[0] + 13 * MI_U, MI_O[1] - 30, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: a * clamp((la - 0.8) / 0.2) });
  }
  /* line 2: the legs */
  const lg = a * at(S, 2, 0.6);
  if (lg > 0.003) {
    ctx.save(); ctx.setLineDash([6, 6]);
    line(MI_O[0], MI_O[1] + 3, z[0], MI_O[1] + 3, C.white, lg * 0.8, 2); line(z[0], MI_O[1], z[0], z[1], C.white, lg * 0.8, 2); ctx.restore();
    txt('3', MI_O[0] + 2.3 * MI_U, MI_O[1] - 14, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: lg });
    txt('2', z[0] + 12, (MI_O[1] + z[1]) / 2 + 8, { size: 24, fam: F.mono, w: 700, c: C.white, a: lg });
  }
  /* the readout */
  panel(1340, 180, 480, 300, a, C.cyan, 'POINT × MIRROR · 点乘镜像');
  isRich([['(3 + 2i)(3 − 2i)', C.white]], 1364, 250, { size: 28, a: a * Q(S, 1, 'Multiply', 0.5) });
  isRich([['= 9 − 6i + 6i + 4', C.white]], 1364, 300, { size: 28, a: a * Q(S, 1, 'the turns cancel', 0.5) });
  isRich([['= ', C.white], ['13', C.cyan]], 1364, 350, { size: 30, a: a * Q(S, 1, 'land on', 0.5) });
  isRich([['= 3² + 2²', C.white]], 1364, 410, { size: 30, a: a * at(S, 2, 0.5) });
  txt('turns cancel · 转角抵消', 1364, 456, { size: 20, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 1, 'the turns cancel', 0.5) });
  /* lines 3–4: Lean */
  const lean = a * Q(S, 3, 'Lean checks', 0.6);
  if (lean > 0.003) {
    panel(1340, 500, 480, 230, lean, C.lean, 'EVERY GRID POINT · 每个格点');
    isRich([['(a + bi)(a − bi) = a² + b²', C.white]], 1364, 572, { size: 28, a: lean * Q(S, 3, 'times its mirror', 0.5) });
    txt('a, b integers · 整数', 1364, 614, { size: 20, fam: F.zh, w: 700, c: C.lean, a: lean });
    isLean(1364, 676, IS_LEAN.gaussian_integer_mul_conj_eq_sq_add_sq, lean, { size: 15 });
  }
  const da = a * at(S, 4, 0.6);
  if (da > 0.003) chip(MI_O[0] + 9.6 * MI_U, 790, 620, 64, 'a² + b² = distance² · 距离的平方', C.cyan, da, 26, F.zh);
  stamp('z · z̄ = a² + b²', 760, 300, Q(S, 3, 'Lean checks', 0.5, 0.8) * (1 - at(S, 4, 0.5)), C.lean, 34, -0.06);
};

/* ======================================================================= */
/*                              scene 3 · TURN AND STRETCH                   */
/* ======================================================================= */
const TU_O = [250, 720], TU_U = 62;
SCENES.turn = S => {
  const u = S.u, a = isFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed']]);
  isGrid(TU_O, TU_U, [-1, 9], [-1, 8], a);
  const pA = isP(TU_O, TU_U, IS_A), pB = isP(TU_O, TU_U, IS_B), pAB = isP(TU_O, TU_U, IS_AB), pM = isP(TU_O, TU_U, IS_ABm), pBm = isP(TU_O, TU_U, gConj(IS_B));
  const aA = gArg(IS_A), aB = gArg(IS_B);
  /* line 0: the dial — the two angles stacked */
  const da = a * at(S, 0, 0.6);
  arrow(TU_O[0], TU_O[1], pA[0], pA[1], C.white, da, 4);
  txt('2 + i', pA[0] + 12, pA[1] + 26, { size: 26, fam: F.math, w: 700, c: C.white, a: da });
  arrow(TU_O[0], TU_O[1], pB[0], pB[1], C.white, da, 4);
  txt('3 + 2i', pB[0] + 14, pB[1] + 6, { size: 26, fam: F.math, w: 700, c: C.white, a: da });
  const sa = Q(S, 0, 'angles add', 1.0);
  isArc(TU_O, 95, 0, aA, C.white, a * sa, 4);
  isArc(TU_O, 95, aA, aA + aB * ease(sa), C.argued, a * sa, 4);
  if (da > 0.003) txt('a dial plus a zoom · 转盘加变焦', TU_O[0] + 6.3 * TU_U, TU_O[1] - 7.6 * TU_U, { size: 22, fam: F.zh, w: 700, c: C.argued, a: da });
  /* line 1: the product (current, amber), until line 3 makes the mirror product current */
  const ma = a * Q(S, 3, 'Swap one factor', 0.6);
  const pa = a * Q(S, 1, 'is four plus seven', 0.8);
  arrow(TU_O[0], TU_O[1], pAB[0], pAB[1], ma > 0.5 ? C.cyan : C.now, pa, 5);
  txt('4 + 7i', pAB[0] + 14, pAB[1] - 6, { size: 30, fam: F.math, w: 700, c: ma > 0.5 ? C.cyan : C.now, a: pa });
  if (ma > 0.003) {
    ctx.save(); ctx.setLineDash([7, 7]); line(TU_O[0], TU_O[1], pBm[0], pBm[1], C.white, ma * 0.6, 2.5); ctx.restore();
    txt('3 − 2i', pBm[0] - 12, pBm[1] + 28, { size: 22, fam: F.math, w: 700, c: C.white, a: ma * 0.8 });
    arrow(TU_O[0], TU_O[1], pM[0], pM[1], C.now, ma, 5);
    txt('8 − i', pM[0] + 14, pM[1] - 8, { size: 30, fam: F.math, w: 700, c: C.now, a: ma });
  }
  /* the readout */
  panel(1020, 180, 800, 640, a, C.cyan, 'TURN AND STRETCH · 转动与伸缩');
  isRich([['angles · 角度   26.6° + 33.7° = 60.3°', C.white]], 1046, 250, { size: 26, a: a * Q(S, 0, 'angles add', 0.5), fam: F.zh });
  isRich([['lengths² · 长度²   5 × 13 = 65', C.white]], 1046, 300, { size: 26, a: a * Q(S, 0, 'lengths multiply', 0.5), fam: F.zh });
  isRich([['(2 + i)(3 + 2i) = 6 + 4i + 3i − 2 = ', C.white], ['4 + 7i', C.now]], 1046, 380, { size: 28, a: a * at(S, 1, 0.5) });
  isRich([['65 = ', C.white], ['4² + 7²', C.cyan], [' = 16 + 49', C.white]], 1046, 440, { size: 30, a: a * at(S, 2, 0.5) });
  isRich([['(2 + i)(3 − 2i) = 6 − 4i + 3i + 2 = ', C.white], ['8 − i', C.now]], 1046, 520, { size: 28, a: ma });
  isRich([['65 = ', C.white], ['1² + 8²', C.cyan], [' = 1 + 64', C.white]], 1046, 580, { size: 30, a: a * Q(S, 3, 'one squared plus eight', 0.5) });
  const ia = a * at(S, 2, 0.6);
  txt('two squares × two squares = two squares', 1046, 676, { size: 22, fam: F.mono, w: 700, c: C.dim, a: ia });
  txt('两平方和 × 两平方和 = 两平方和', 1046, 712, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ia });
  txt('(x² + y²)(u² + v²) = (xu − yv)² + (xv + yu)²', 1046, 756, { size: 24, fam: F.math, w: 700, c: C.white, a: ia * 0.85 });
  txt('identity: expand both sides · 恒等式，展开即得', 1046, 794, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ia });
};

/* ======================================================================= */
/*                              scene 4 · TWO KINDS OF PRIME                 */
/* ======================================================================= */
SCENES.primes = S => {
  const u = S.u, a = isFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'Lean checks', 'lean'], [3, null, 'argued']]);
  const fa = a * Q(S, 1, 'remainder one', 0.6), la = a * Q(S, 2, 'remainder three', 0.6), na = a * at(S, 3, 0.6);
  /* headers */
  txt('p = 4k + 1', 420, 220, { size: 34, fam: F.math, w: 700, align: 'center', c: C.cyan, a: a * at(S, 0, 0.5) });
  txt('p = 4k + 3', 1500, 220, { size: 34, fam: F.math, w: 700, align: 'center', c: C.mag, a: a * at(S, 0, 0.5) });
  if (na > 0.003) {
    txt('plane primes · 面素数', 420, 262, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: na });
    txt('line primes · 线素数', 1500, 262, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.mag, a: na });
    txt("the names are the book's reading · 叫法是本书的诠释", W / 2, 840, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.argued, a: na });
  }
  /* the columns */
  IS_FACE.forEach((p, k) => {
    const r = isReps(p)[0], ka = a * clamp((u - lineAt(S, 0).s - 0.35 * k) / 0.5);
    const y = 320 + k * 66;
    box(200, y - 34, 440, 54, C.cyan, ka * 0.6, 1.4);
    txt(`${p} = ${r[0]}² + ${r[1]}²`, 230, y + 4, { size: 30, fam: F.math, w: 700, c: C.white, a: ka });
    txt('✓', 610, y + 4, { size: 30, fam: F.math, w: 700, align: 'right', c: C.cyan, a: ka * fa });
  });
  IS_LINE.forEach((p, k) => {
    const ka = a * clamp((u - lineAt(S, 0).s - 0.35 * k) / 0.5);
    const y = 320 + k * 66;
    box(1280, y - 34, 440, 54, C.mag, ka * 0.6, 1.4);
    txt(`${p} = ?`, 1310, y + 4, { size: 30, fam: F.math, w: 700, c: C.white, a: ka });
    txt('✗', 1690, y + 4, { size: 30, fam: F.math, w: 700, align: 'right', c: C.mag, a: ka * la });
  });
  if (fa > 0.003) isLean(200, 745, IS_LEAN.prime_eq_sq_add_sq_of_mod_four_eq_one, fa, { size: 17 });
  /* the middle: squares mod 4 */
  const ra = a * Q(S, 2, 'squares leave', 0.6);
  if (ra > 0.003) {
    panel(720, 290, 480, 410, ra, C.mag, 'SQUARES MOD 4 · 平方除以 4');
    for (let n = 0; n < 6; n++) {
      const y = 360 + n * 40;
      txt(`${n}² = ${n * n}`, 760, y, { size: 26, fam: F.mono, w: 700, c: C.white, a: ra });
      txt(`→ ${(n * n) % 4}`, 940, y, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: ra });
    }
    isRich([['0, 1 + 0, 1 → 0, 1, 2   ', C.cyan], ['never 3', C.mag]], 750, 640, { size: 24, a: a * Q(S, 2, 'never reach three', 0.5) });
    txt('永远余不出 3', 750, 676, { size: 22, fam: F.zh, w: 700, c: C.mag, a: a * Q(S, 2, 'never reach three', 0.5) });
    isLean(1280, 745, IS_LEAN.square_residues_and_sum_obstruction, ra, { size: 17 });
  }
};

/* ======================================================================= */
/*                              scene 5 · THE FACTOR LEDGER                  */
/* ======================================================================= */
/* one ledger row: n, factor tokens (line primes magenta, paired ones joined cyan), verdict */
function lgRow(y, n, toks, verdict, ok, a, pairA) {
  if (a <= 0.003) return;
  panel(140, y - 52, 1640, 104, a, ok ? C.cyan : C.mag);
  txt(String(n), 200, y + 14, { size: 40, fam: F.mono, w: 700, c: C.white, a });
  txt('=', 340, y + 14, { size: 36, fam: F.math, w: 700, c: C.dim, a });
  let x = 400;
  const pos = [];
  toks.forEach(([p, kind]) => {
    const s = String(p), w = Math.max(48, tw(s, 30, F.mono, 700) + 22);
    const col = kind === 'line' ? C.mag : kind === 'face' ? C.cyan : C.white;
    box(x, y - 22, w, 46, col, a * 0.9, 1.6);
    txt(s, x + w / 2, y + 11, { size: 30, fam: F.mono, w: 700, align: 'center', c: col, a });
    pos.push([x + w / 2, kind]); x += w + 10;
  });
  /* pair the line primes two by two */
  const lines = pos.filter(p => p[1] === 'line');
  for (let k = 0; k + 1 < lines.length; k += 2) {
    if (lines[k + 1] && pairA > 0.003) {
      ctx.save(); ctx.globalAlpha = a * pairA; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(lines[k][0], y + 28); ctx.quadraticCurveTo((lines[k][0] + lines[k + 1][0]) / 2, y + 50, lines[k + 1][0], y + 28); ctx.stroke(); ctx.restore();
    }
  }
  txt(verdict, 1750, y + 14, { size: 32, fam: F.math, w: 700, align: 'right', c: ok ? C.cyan : C.mag, a });
}
SCENES.ledger = S => {
  const u = S.u, a = isFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'Lean checks', 'lean'], [2, null, 'computed']]);
  /* line 0–1: the rule */
  const ra = a * at(S, 0, 0.6);
  panel(140, 170, 1640, 150, ra, Q(S, 1, 'Lean checks', 0.5) > 0.5 ? C.lean : C.cyan, 'THE FACTOR LEDGER · 素因子账本');
  isRich([['n = a² + b²', C.white], ['   ⟺   ', C.dim], ['every prime q ≡ 3 (mod 4) appears an even number of times', C.white]], 170, 240, { size: 26, a: a * Q(S, 0, 'remainder three', 0.5) });
  txt('n = a² + b²  ⟺  每个除以 4 余 3 的素数都出现偶数次', 170, 284, { size: 22, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 0, 'remainder three', 0.5) });
  const la = a * Q(S, 1, 'Lean checks', 0.6);
  if (la > 0.003) isLean(1240, 292, IS_LEAN.eq_sq_add_sq_iff_even_factorization, la, { size: 17 });
  /* the rows */
  const r9 = a * at(S, 2, 0.6), r25 = a * at(S, 3, 0.6), r24 = a * at(S, 4, 0.6);
  lgRow(420, 9, [[3, 'line'], [3, 'line']], '3² + 0²', true, r9, Q(S, 2, 'its own twin', 0.8));
  if (r9 > 0.003) txt('socks: each kind needs its own twin · 同款才成双（比方）', 960, 494, { size: 20, fam: F.zh, w: 700, c: C.argued, a: r9 * Q(S, 2, 'like socks', 0.5) });
  lgRow(580, 2025, [[3, 'line'], [3, 'line'], [3, 'line'], [3, 'line'], [5, 'face'], [5, 'face']], '27² + 36²', true, r25, 1);
  lgRow(740, 2024, [[2, 'two'], [2, 'two'], [2, 'two'], [11, 'line'], [23, 'line']], 'not · 不是', false, r24, 0);
  if (r24 > 0.003) {
    txt('11 ×1, 23 ×1: odd counts · 各出现奇数次', 760, 734, { size: 22, fam: F.zh, w: 700, c: C.mag, a: r24 });
    txt('two odd socks, not a pair · 两只单袜，配不成一双', 760, 768, { size: 20, fam: F.zh, w: 700, c: C.argued, a: r24 * Q(S, 4, 'two odd socks', 0.5) });
  }
  /* line 5: the aphorism */
  const fa = a * at(S, 5, 0.6);
  if (fa > 0.003) {
    fillBox(0, 340, W, 310, C.bg, fa * 0.78);
    txt('FACTORS, NOT SIZE', W / 2, 458, { size: 72, fam: F.orb, w: 900, align: 'center', c: C.white, a: fa, ls: 6, ab: 3 });
    txt('决定它的是因子，不是大小', W / 2, 548, { size: 46, fam: F.zh, w: 900, align: 'center', c: C.cyan, a: fa });
    txt('2024 ≈ 2025 · one is, one is not', W / 2, 616, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.dim, a: fa });
  }
  stamp('even ⟺ two squares', W / 2, 580, Q(S, 1, 'Lean checks', 0.5, 0.8) * (1 - at(S, 2, 0.5)), C.lean, 34, -0.06);
};

/* ======================================================================= */
/*                         scene 6 · WHAT IT DOES NOT SAY                    */
/* ======================================================================= */
SCENES.edge = S => {
  const a = isFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [2, null, 'argued']]);
  const rows = [
    { k: 0, col: C.cyan, en: 'p prime, p ≡ 1 (mod 4)  ⟹  ∃ a, b : p = a² + b²', zh: '断言两个平方存在，不给找它们的快办法', note: 'existence, not a search · 存在，不是算法' },
    { k: 1, col: C.cyan, en: '65 = 1² + 8² = 4² + 7²', zh: '不数有几种拆法', note: 'two ways, computed here; no count is claimed · 两种拆法是屏幕上的计算' },
    { k: 2, col: C.argued, en: 'primes split into mirror pairs in ℤ[i]', zh: '素数在高斯整数中分裂成镜像对', note: "literature result; plane / line are the book's names · 文献结果；“面”“线”是本书起的名字" }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 190 + i * 210;
    panel(260, y, 1400, 180, ra, rw.col);
    txt(rw.en, 300, y + 62, { size: 34, fam: F.math, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 300, y + 108, { size: 28, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 300, y + 150, { size: 20, fam: F.zh, w: 700, c: rw.col === C.argued ? C.argued : C.dim, a: ra * 0.95 });
  });
};

/* ======================================================================= */
/*                                scene 7 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 270 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[1], t = sc.end - 1.0;
  background(t, sc, 1, 6);
  const O = [200, 600], U = 70;
  isGrid(O, U, [-1, 13], [-3, 3], 1);
  const z = isP(O, U, IS_Z), zb = isP(O, U, gConj(IS_Z));
  ctx.save(); ctx.setLineDash([10, 8]); line(O[0] - 50, O[1], O[0] + 6 * U, O[1], C.white, 0.6, 2.5); ctx.restore();
  arrow(O[0], O[1], z[0], z[1], C.now, 1, 6);
  arrow(O[0], O[1], zb[0], zb[1], C.white, 1, 5);
  line(O[0], O[1], O[0] + 13 * U, O[1], C.cyan, 1, 9);
  dot(O[0] + 13 * U, O[1], 16, 'c', 1);
  txt('3 + 2i', z[0] + 14, z[1] - 10, { size: 34, fam: F.math, w: 700, c: C.now });
  txt('3 − 2i', zb[0] + 14, zb[1] + 34, { size: 34, fam: F.math, w: 700, c: C.white });
  txt('13 = 3² + 2²', O[0] + 13 * U, O[1] + 56, { size: 34, fam: F.math, w: 700, align: 'center', c: C.cyan });
  txt(DATA.film.title_zh, W / 2, 230, { size: 80, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('WHICH NUMBERS ARE TWO SQUARES?', W / 2, 320, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 4 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, W / 2, 900, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 1, sc);
  post(0);
};
