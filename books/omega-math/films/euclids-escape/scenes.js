/* Film · Euclid's Escape · 欧几里得的逃逸 (book omega-math, chapter 13). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests (all in chapter 13 of the book):
     horizon   the chapter's opening question: a completed infinite set versus finite lists and terminating loops
               (the chapter's framing, no claim).
     bezout    Euclidean division a = q b + r, 0 ≤ r < b, on 30031 and 13: quotient 2310, remainder 1, the trace
               (30031, 13) → (13, 1) → (1, 0) and the certificate 1 · 30031 − 2310 · 13 = 1 (computed here);
               thm-ch13-bezout-identity (LEAN, bezout_identity; the chapter records an empty axiom list on the
               strict backend).
     escape    the ledger of example ex-ch13-euclid-escape-chain: N_S = 1 + ∏S for the prime prefixes, all prime up to
               2311, then 30031 = 59 × 509 with remainder 1 for every listed prime and the bounded divisor scan
               d = 2 … 59 (computed here); thm-ch13-euclid-prime-escape (LEAN, euclid_prime_escape).
     fraction  example ex-ch13-fibonacci-convergents: Euclid's ladder of 34/21 = [1; 1, 1, 1, 1, 1, 2], the Euler–Wallis
               convergents 1/1 … 34/21 and the two-step sums 13 + 8 ≤ 21, 5 + 3 ≤ 8 (computed here);
               thm-ch13-convergents-length-log (LEAN, convergents_length_log): 7 ≤ 2 · 4 + 1 = 9.
     unit      the step matrices M(a) = [a 1; 1 0] with det −1, the product M(1)⁶ M(2) = [34 13; 21 8], the cross
               products ±1 (computed here); thm-ch13-cf-convergent-determinant and thm-ch13-cf-convergent-coprime
               (LEAN); the gaps (−1)ⁿ / (qₙ qₙ₊₁) are the chapter's hand derivation (argued), their values computed.
     depth     example ex-ch13-quarter-depth-worked: 7/2, 1/10, 70, 2, 35, ⌊log₄ 35⌋ = 2, 70 < 128, 7/128 < 1/10, and
               N = 1 failing (computed here); thm-ch13-omega-quarter-depth-integer (LEAN, quarterDepth_integer_sound;
               the chapter records an empty axiom list on the strict backend) and thm-ch13-quarter-depth-real (LEAN,
               rationalQuarterDepth_real_sound, the classical Mathlib shadow).
     close     the end card: book, film, the seven cited theorems and the pinned commit.
   On load, FILM.init recomputes every number on screen by a second route; any disagreement is pushed to
   window.FILM_ERRORS, which stops the render. */
'use strict';

const EE_P = 'D5/S3/Quantum/AURICOmega/OmegaArithmeticHorizon.';
const EE_LEAN = {
  bezout: EE_P + 'bezout_identity',
  escape: EE_P + 'euclid_prime_escape',
  length: 'D5/S1/Depth/ContinuedFractions/FiniteRationalConvergentsLength.convergents_length_log',
  det: EE_P + 'cf_convergent_determinant',
  coprime: EE_P + 'cf_convergent_coprime',
  depth: EE_P + 'quarterDepth_integer_sound',
  real: 'D5/S3/Weil/BurnolGram/BurnolRationalDepthBudget.rationalQuarterDepth_real_sound'
};

/* ---------------- exact integer arithmetic (all numbers on screen come from here) ---------------- */
const isPrime = n => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
const minPrimeDiv = n => { for (let d = 2; d <= n; d++) if (n % d === 0) return d; return n; };
const gcdN = (a, b) => { while (b) [a, b] = [b, a % b]; return a; };

/* 1. Euclid's division and the certificate */
const DIV = { a: 30031, b: 13 };
DIV.q = Math.floor(DIV.a / DIV.b); DIV.r = DIV.a % DIV.b;
const TRACE = (() => { const t = []; let a = DIV.a, b = DIV.b; t.push([a, b]); while (b) { [a, b] = [b, a % b]; t.push([a, b]); } return t; })();

/* 2. the escape ledger: prefixes of the first six primes */
const PRIMES6 = []; for (let n = 2; PRIMES6.length < 6; n++) if (isPrime(n)) PRIMES6.push(n);
const LEDGER = [];
for (let k = 0; k <= 6; k++) {
  const S = PRIMES6.slice(0, k), prod = S.reduce((s, p) => s * p, 1), N = prod + 1;
  LEDGER.push({ S, prod, N, q: minPrimeDiv(N), prime: isPrime(N), rem: S.map(p => N % p) });
}
const LAST = LEDGER[6], Q59 = LAST.q, COF = LAST.N / Q59;

/* 3. the continued fraction of 34/21 by Euclid's ladder, and the Euler–Wallis convergents */
const CFX = [34, 21];
const LADDER = (() => { const r = []; let a = CFX[0], b = CFX[1]; while (b) { r.push([a, Math.floor(a / b), b, a % b]); [a, b] = [b, a % b]; } return r; })();
const COEF = LADDER.map(s => s[1]);
const CONV = (() => { let p2 = 0, p1 = 1, q2 = 1, q1 = 0; return COEF.map(a => { const p = a * p1 + p2, q = a * q1 + q2; p2 = p1; p1 = p; q2 = q1; q1 = q; return [p, q]; }); })();
const CROSS = CONV.slice(0, -1).map((c, n) => CONV[n + 1][0] * c[1] - c[0] * CONV[n + 1][1]);
const log2f = d => { let k = 0; while (2 ** (k + 1) <= d) k++; return k; };
const LEN = { n: CONV.length, lg: log2f(CFX[1]) }; LEN.bound = 2 * LEN.lg + 1;
/* the product of the step matrices M(a) = [a 1; 1 0] */
const mMul = (A, B) => [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]], [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]];
const PROD = COEF.reduce((M, a) => mMul(M, [[a, 1], [1, 0]]), [[1, 0], [0, 1]]);
const PDET = PROD[0][0] * PROD[1][1] - PROD[0][1] * PROD[1][0];

/* 4. the quarter-depth budget of example ex-ch13-quarter-depth-worked */
const QD = { c: 7, d: 2, p: 1, q: 10 };
QD.cq = QD.c * QD.q; QD.dp = QD.d * QD.p; QD.m = Math.floor(QD.cq / QD.dp);
QD.N = (() => { let k = 0; while (4 ** (k + 1) <= QD.m) k++; return k; })();
QD.rhs = QD.dp * 4 ** (QD.N + 1); QD.rhs1 = QD.dp * 4 ** QD.N;      // depth N and depth N − 1
QD.den = QD.d * 4 ** (QD.N + 1); QD.den1 = QD.d * 4 ** QD.N;         // (1/4)^(N+1) · c/d = c / den

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  const check = (ok, m) => { if (!ok) E.push('euclids-escape film: ' + m); };
  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === 7, `film.json cites ${lean.length} declarations, expected 7`);
  for (const gid of Object.values(EE_LEAN)) { const r = leanCite(gid); check(r && r.kind === 'theorem', `${gid} is not a cited theorem`); }
  /* 1. division: 30031 = 2310 · 13 + 1, the trace and the certificate, gcd by subtraction */
  check(DIV.q === 2310 && DIV.r === 1 && DIV.q * DIV.b + DIV.r === DIV.a, 'division 30031 / 13');
  check(TRACE.map(t => t.join()).join(' ') === '30031,13 13,1 1,0', 'Euclid trace');
  check(1 * DIV.a - DIV.q * DIV.b === 1, 'Bezout certificate');
  let x = DIV.a, y = DIV.b; while (x !== y) { if (x > y) x -= y; else y -= x; } check(x === 1 && gcdN(DIV.a, DIV.b) === 1, 'gcd 1');
  /* 2. the ledger, against the chapter's table and by multiplying back */
  check(LEDGER.map(r => r.N).join() === '2,3,7,31,211,2311,30031', 'witnesses N_S');
  check(LEDGER.map(r => r.prod).join() === '1,2,6,30,210,2310,30030', 'products');
  check(LEDGER.slice(0, 6).every(r => r.prime && r.q === r.N), 'first six witnesses prime');
  check(LEDGER.every(r => r.rem.every(v => v === 1)), 'remainder 1 for every listed prime');
  check(Q59 === 59 && COF === 509 && isPrime(59) && isPrime(509) && 59 * 509 === 30031 && !LAST.prime, '30031 = 59 · 509');
  check(!PRIMES6.includes(Q59), '59 is off the list');
  for (let d = 2; d < 59; d++) check(30031 % d !== 0, `no divisor ${d}`);
  check(DIV.q === LEDGER[5].prod, '2310 is the product of 2 … 11');
  /* 3. continued fraction: coefficients, convergents, evaluation back from the tail */
  check(COEF.join() === '1,1,1,1,1,1,2', 'coefficients of 34/21');
  check(CONV.map(c => c.join('/')).join(' ') === '1/1 2/1 3/2 5/3 8/5 13/8 34/21', 'convergents');
  const back = cs => { let n = cs[cs.length - 1], d = 1; for (let i = cs.length - 2; i >= 0; i--) [n, d] = [cs[i] * n + d, n]; return [n, d]; };
  for (let k = 1; k <= COEF.length; k++) check(back(COEF.slice(0, k)).join() === CONV[k - 1].join(), `prefix ${k} evaluates back`);
  check(CROSS.join() === '1,-1,1,-1,1,-1', 'cross products ±1');
  check(CROSS.every((v, n) => v === (n % 2 ? -1 : 1)), 'cross product (−1)^n');
  check(CONV.every(c => gcdN(c[0], c[1]) === 1), 'convergents coprime');
  check(PROD.flat().join() === '34,13,21,8' && PDET === -1 && PDET === (-1) ** COEF.length, 'matrix product and det');
  check(LEN.n === 7 && LEN.lg === 4 && LEN.bound === 9 && 2 ** 4 <= 21 && 21 < 2 ** 5 && LEN.n <= LEN.bound, 'length bound 7 ≤ 9');
  check(8 + 13 <= 21 && 3 + 5 <= 8 && CONV[5][1] + CONV[4][1] === 13 && LADDER[3][0] === 8, 'two-step sums');
  const gaps = CONV.slice(0, -1).map((c, n) => c[1] * CONV[n + 1][1]);
  check(gaps.join() === '1,2,6,15,40,168', 'gap denominators');
  /* 4. quarter depth */
  check(QD.cq === 70 && QD.dp === 2 && QD.m === 35 && 16 <= 35 && 35 < 64 && QD.N === 2, 'quarter depth 2');
  check(QD.rhs === 128 && QD.cq < QD.rhs && QD.rhs1 === 32 && !(QD.cq < QD.rhs1), '70 < 128, not < 32');
  check(QD.den === 128 && QD.c * QD.q < QD.den * QD.p, '7/128 < 1/10');
  check(QD.den1 === 32 && QD.c * QD.q > QD.den1 * QD.p, '7/32 > 1/10');
  check(Math.abs(QD.c / QD.den - 0.0546875) < 1e-15 && Math.abs(QD.c / QD.den1 - 0.21875) < 1e-15, 'decimals');
});
Object.assign(FILM.speed, { horizon: 0.02, bezout: 0.014, escape: 0.016, fraction: 0.014, unit: 0.014, depth: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  helpers                                  */
/* ======================================================================= */
const fade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
/* runs of [text, colour] side by side; o.align 'center' centres the whole run */
function rich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a }); cx += tw(s, size, fam, w); }
  return cx;
}
const EE_MISSING = new Set();
function leanChip(x, y, gid, a, size = 20) {
  if (a <= 0.003) return x;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!EE_MISSING.has(gid)) { EE_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return x;
  }
  const head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  const name = (r.name || r.label).split('.').slice(-1)[0];
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(name, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  return x + wh + 12 + tw(name, size, F.mono, 700);
}
function tag(x, y, s, col, a) {
  if (a <= 0.003) return;
  const w = tw(s, 18, F.zh, 700, 1) + 20;
  box(x, y - 21, w, 30, col, a, 1.5, 'rgba(0,0,0,0.5)');
  txt(s, x + 10, y, { size: 18, fam: F.zh, w: 700, c: col, a, ls: 1 });
}
/* a stacked fraction n / d centred at x, bar at y */
function frac(x, y, n, d, size, col, a) {
  if (a <= 0.003) return;
  const w = Math.max(tw(String(n), size, F.mono, 700), tw(String(d), size, F.mono, 700)) + 12;
  txt(String(n), x, y - 10, { size, fam: F.mono, w: 700, align: 'center', c: col, a });
  line(x - w / 2, y, x + w / 2, y, col, a, 2.5);
  txt(String(d), x, y + size * 0.82 + 8, { size, fam: F.mono, w: 700, align: 'center', c: col, a });
}
/* a 2 × 2 integer matrix with brackets, top-left corner (x, y) */
function mat2(x, y, M, a, o = {}) {
  if (a <= 0.003) return x;
  const size = o.size || 34, cw = o.cw || 70, rh = size * 1.35, col = o.col || C.white;
  const w = cw * 2 + 20, h = rh * 2 + 10;
  [[x, 1], [x + w, -1]].forEach(([bx, s]) => { line(bx, y, bx, y + h, C.cyan, a, 2.5); line(bx, y, bx + 12 * s, y, C.cyan, a, 2.5); line(bx, y + h, bx + 12 * s, y + h, C.cyan, a, 2.5); });
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
    const c = o.cols ? o.cols[i][j] : col;
    txt(String(M[i][j]), x + 10 + cw * j + cw / 2, y + rh * (i + 1) - 4, { size, fam: F.mono, w: 700, align: 'center', c, a });
  }
  return x + w;
}
const listStr = S => `[${S.join(', ')}]`;

/* opening title, during the lead of the first scene */
function title(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble("EUCLID'S ESCAPE", p, 5), W / 2, 580, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 6, ab: 2 });
  txt('30031 = 59 × 509 · 34/21 · 70 < 128', W / 2, 660, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 5 });
}

/* ======================================================================= */
/*                             scene 1 · THE HORIZON                         */
/* ======================================================================= */
SCENES.horizon = S => {
  title(S);
  const a = clamp((S.u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - S.u) / 0.5);
  if (a <= 0) return;
  /* line 0: the completed sets, trailing off */
  const ia = a * at(S, 0, 0.7), dim = 1 - 0.65 * at(S, 1, 0.8);
  if (ia > 0.003) {
    txt('ℕ = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, … }', 160, 300, { size: 56, fam: F.math, w: 700, c: C.white, a: ia * dim });
    const pa = a * Q(S, 0, 'all the primes', 0.6);
    txt('ℙ = { 2, 3, 5, 7, 11, 13, 17, 19, 23, … }', 160, 400, { size: 56, fam: F.math, w: 700, c: C.mag, a: pa * dim });
    const pEnd = 160 + tw('ℙ = { 2, 3, 5, 7, 11, 13, 17, 19, 23, … }', 56, F.math, 700) + 20;
    dashed(pEnd, 382, pEnd + (1760 - pEnd) * ease(Q(S, 0, 'lined up forever', 1.2)), 382, C.mag, pa * dim * 0.8, 2.5);
    txt('completed infinite set · 已完成的无穷集', 160, 468, { size: 26, fam: F.zh, w: 700, c: C.dim, a: pa * dim });
    const xa = a * at(S, 1, 0.8);
    line(150, 300 - 18, pEnd, 400 - 18, C.dim, xa * 0.8, 3);
  }
  /* line 1: finite list, a loop that stops, the three pillars */
  const la = a * at(S, 1, 0.6);
  if (la > 0.003) {
    txt('finite list · 有限清单', 160, 560, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: la });
    PRIMES6.forEach((p, i) => chip(200 + i * 96, 620, 78, 56, String(p), C.cyan, la * clamp(at(S, 1, 0.3, 0.12 * i) * 1.5), 30));
    const sa = a * Q(S, 1, 'loops that stop', 0.6);
    txt('loop that stops · 会停下的循环', 860, 560, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: sa });
    const sw = ease(Q(S, 1, 'loops that stop', 1.4));
    ctx.save(); ctx.globalAlpha = sa; ctx.strokeStyle = C.cyan; ctx.lineWidth = 4; ctx.beginPath();
    ctx.arc(960, 625, 42, -Math.PI / 2, -Math.PI / 2 + sw * TAU * 0.82); ctx.stroke(); ctx.restore();
    if (sw > 0.97) { fillBox(1040, 600, 50, 50, C.cyan, sa * 0.9); txt('STOP', 1110, 636, { size: 28, fam: F.orb, w: 900, c: C.cyan, a: sa }); }
    const P = [['PRIMES', '素数', 'primes'], ['FRACTIONS', '分数', 'fractions'], ['ERROR BUDGETS', '误差预算', 'error budgets']];
    P.forEach(([en, zh, ph], i) => {
      const pa = a * Q(S, 1, ph, 0.5), cx = 420 + i * 540;
      if (pa <= 0.003) return;
      box(cx - 250, 710, 500, 90, C.now, pa, 2, 'rgba(0,0,0,0.5)');
      txt(`${en} · ${zh}`, cx, 766, { size: 30, fam: F.zh, w: 900, align: 'center', c: C.now, a: pa });
    });
  }
};

/* ======================================================================= */
/*                          scene 2 · DIVISION, THEN BACK                    */
/* ======================================================================= */
SCENES.bezout = S => {
  const a = fade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* line 0: the rule */
  const ra = a * at(S, 0, 0.6);
  rich([['a = ', C.white], ['q', C.now], [' · b + ', C.white], ['r', C.mag], [',     0 ≤ ', C.white], ['r', C.mag], [' < b', C.white]], W / 2, 250, { size: 54, align: 'center', a: ra });
  /* line 1: the bar of 2310 blocks of 13 and its remainder, zoomed */
  const ba = a * at(S, 1, 0.6);
  if (ba > 0.003) {
    const x0 = 160, x1 = 1280, y0 = 320, h = 60, grow = ease(at(S, 1, 2.2, 0.3));
    fillBox(x0, y0, (x1 - x0) * grow, h, C.cyan, ba * 0.12);
    box(x0, y0, (x1 - x0) * grow, h, C.cyan, ba, 1.5);
    const nT = Math.floor(231 * grow);
    for (let i = 1; i < nT; i++) line(x0 + i * (x1 - x0) / 231, y0 + 8, x0 + i * (x1 - x0) / 231, y0 + h - 8, C.cyan, ba * 0.45, 1);
    txt('2310 blocks of 13 · 2310 段 13（刻度每 10 段）', x0, y0 + h + 36, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ba * grow });
    const za = a * Q(S, 1, 'remainder one', 0.6);
    if (za > 0.003) {
      const zx = 1380;
      dashed(x1, y0, zx, y0 - 10, C.mag, za * 0.7, 1.5); dashed(x1, y0 + h, zx, y0 + h + 10, C.mag, za * 0.7, 1.5);
      [0, 1].forEach(i => { box(zx + i * 130, y0 - 10, 124, h + 20, C.cyan, za, 1.5, 'rgba(0,0,0,0.5)'); txt('13', zx + i * 130 + 62, y0 + 42, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: za }); });
      fillBox(zx + 260, y0 - 10, 50, h + 20, C.mag, za * 0.25); box(zx + 260, y0 - 10, 50, h + 20, C.mag, za, 2.5);
      txt('1', zx + 285, y0 + 42, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.mag, a: za });
      txt('zoom · 放大', zx, y0 + h + 36, { size: 20, fam: F.zh, w: 700, c: C.dim, a: za });
    }
    rich([['30031 = ', C.white], [String(DIV.q), C.now], [' · 13 + ', C.white], [String(DIV.r), C.mag]], 160, 500, { size: 48, a: a * Q(S, 1, 'quotient', 0.5) });
  }
  /* line 2: the trace and the certificate */
  const ca = a * at(S, 2, 0.6);
  if (ca > 0.003) {
    txt(TRACE.map(t => `(${t[0]}, ${t[1]})`).join('  →  ') + '     gcd = 1', 160, 590, { size: 30, fam: F.mono, w: 700, c: C.cyan, a: ca });
    const ka = a * Q(S, 2, 'certificate', 0.6);
    panel(1050, 455, 730, 170, ka, C.now, 'CERTIFICATE · 证书');
    rich([['1 · 30031 − ', C.white], [String(DIV.q), C.now], [' · 13 = 1', C.white]], 1080, 570, { size: 44, a: ka });
  }
  /* line 3: Lean */
  const la = a * at(S, 3, 0.6);
  if (la > 0.003) {
    panel(140, 650, 1640, 175, la, C.lean, 'FROZEN THEOREM · 冻结定理');
    leanChip(170, 724, EE_LEAN.bezout, la * Q(S, 3, 'Lean checks', 0.5), 22);
    txt('∀ a b ∈ ℕ,  ∃ x y ∈ ℤ :  a·x + b·y = gcd(a, b)', 720, 724, { size: 36, fam: F.math, w: 700, c: C.white, a: la * Q(S, 3, 'every pair', 0.5) });
    tag(170, 790, 'strict backend · axioms: [ ] · 严格后端零公理', C.lean, la * Q(S, 3, 'every pair', 0.5, 0.8));
    txt('this pair: x = 1, y = −2310 · 本例', 720, 790, { size: 26, fam: F.zh, w: 700, c: C.dim, a: la * Q(S, 3, 'integer mix', 0.5) });
  }
};

/* ======================================================================= */
/*                            scene 3 · EUCLID'S ESCAPE                      */
/* ======================================================================= */
SCENES.escape = S => {
  const a = fade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [4, 'Lean checks', 'lean']]);
  /* the ledger */
  const ta = a * at(S, 0, 0.6);
  panel(130, 185, 900, 450, ta, C.cyan, 'ESCAPE LEDGER · 逃逸账本');
  const hy = 250;
  [['S', 155, 'left'], ['∏S', 590, 'right'], ['N = ∏S + 1', 760, 'right'], ['q', 840, 'right'], ['N is', 870, 'left']].forEach(([s, x, al]) =>
    txt(s, x, hy, { size: 22, fam: F.math, w: 700, align: al, c: C.dim, a: ta }));
  txt('q = minPrimeDiv N: least d ≥ 2 dividing N · 最小素因子', 155, 622, { size: 18, fam: F.zh, w: 700, c: C.dim, a: ta });
  LEDGER.forEach((r, k) => {
    const rowA = k < 6 ? a * (k === 0 ? at(S, 0, 0.5, 0.6) : at(S, 1, 0.4, 0.55 * (k - 1))) : a * Q(S, 2, 'thirty thousand and thirty-one', 0.5);
    if (rowA <= 0.003) return;
    const y = hy + 48 + k * 48, last = k === 6;
    if (last) fillBox(140, y - 33, 880, 44, C.now, rowA * 0.12);
    txt(r.S.length ? listStr(r.S) : '[ ]', 155, y, { size: 24, fam: F.mono, w: 700, c: C.white, a: rowA });
    txt(String(r.prod), 590, y, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.white, a: rowA });
    txt(String(r.N), 760, y, { size: 26, fam: F.mono, w: 700, align: 'right', c: last ? C.now : C.cyan, a: rowA });
    const qa = last ? a * Q(S, 3, 'stops at fifty-nine', 0.4, 1.2) : rowA;
    txt(String(r.q), 840, y, { size: 26, fam: F.mono, w: 700, align: 'right', c: last ? C.now : C.white, a: qa });
    txt(r.prime ? 'prime' : '59 × 509', 870, y, { size: 24, fam: F.mono, w: 700, c: last ? C.now : C.dim, a: last ? a * Q(S, 3, 'fifty-nine times', 0.4) : rowA });
  });
  /* right: the recipe, the remainders, the bounded scan */
  const pa = a * at(S, 0, 0.6, 0.4);
  panel(1070, 185, 710, 450, pa, C.mag, 'BOUNDED SEARCH · 有界搜索');
  rich([['N', C.now], ['  =  1 + ∏ S', C.white]], 1100, 270, { size: 46, a: pa });
  const rma = a * Q(S, 2, 'remainder one', 0.5);
  if (rma > 0.003) {
    txt('30031 mod p', 1100, 330, { size: 22, fam: F.mono, w: 700, c: C.dim, a: rma });
    PRIMES6.forEach((p, i) => {
      const x = 1100 + i * 110;
      txt(String(p), x + 40, 372, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: rma });
      txt('→ 1', x + 40, 404, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: rma * clamp(Q(S, 2, 'remainder one', 0.3, 0.15 * i) * 2) });
    });
  }
  const sa = a * at(S, 3, 0.5);
  if (sa > 0.003) {
    const prog = ease(Q(S, 3, 'stops at fifty-nine', 1.6)), dMax = 2 + Math.floor(prog * 57);
    for (let d = 2; d <= 59; d++) {
      const i = d - 2, cx = 1100 + (i % 20) * 31, cy = 442 + Math.floor(i / 20) * 40;
      if (d > dMax) { box(cx, cy, 28, 32, C.dim, sa * 0.25, 1); continue; }
      const hit = d === 59, listed = PRIMES6.includes(d);
      box(cx, cy, 28, 32, hit ? C.now : listed ? C.cyan : C.dim, sa * (hit ? 1 : 0.7), hit ? 2.5 : 1, hit ? rgba(C.now, 0.25) : null);
      txt(String(d), cx + 14, cy + 22, { size: 14, fam: F.mono, w: 700, align: 'center', c: hit ? C.now : listed ? C.cyan : C.dim, a: sa });
    }
    txt(`d = ${dMax}   30031 mod d = ${30031 % dMax}`, 1100, 580, { size: 24, fam: F.mono, w: 700, c: dMax === 59 ? C.now : C.white, a: sa });
    rich([['30031 = ', C.white], ['59', C.now], [' × 509', C.white]], 1100, 622, { size: 34, a: a * Q(S, 3, 'fifty-nine times', 0.5) });
    tag(1500, 615, '59 ∉ S', C.now, a * Q(S, 3, 'never listed', 0.5));
  }
  /* line 4: Lean */
  const la = a * at(S, 4, 0.6);
  if (la > 0.003) {
    panel(130, 665, 1650, 160, la, C.lean, 'FROZEN THEOREM · 冻结定理');
    leanChip(160, 735, EE_LEAN.escape, la, 22);
    txt('0 < ∏s  →  ∃ p,  IsPrime p ∧ p ∣ ∏s + 1 ∧ p ∉ s', 720, 735, { size: 34, fam: F.math, w: 700, c: C.white, a: la * Q(S, 4, 'positive product', 0.5) });
    tag(160, 798, 'strict backend · axioms: [ ] · 严格后端零公理', C.lean, la * Q(S, 4, 'prime factor', 0.5));
    txt('the witness itself need not be prime · 见证数本身不必是素数', 760, 798, { size: 24, fam: F.zh, w: 700, c: C.dim, a: la * Q(S, 4, 'prime factor', 0.5) });
  }
};

/* ======================================================================= */
/*                         scene 4 · A FRACTION THAT STOPS                   */
/* ======================================================================= */
SCENES.fraction = S => {
  const a = fade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean bounds', 'lean']]);
  /* left: Euclid's ladder on 34 and 21 */
  const la0 = a * at(S, 0, 0.6);
  panel(130, 185, 760, 455, la0, C.cyan, "EUCLID'S LADDER · 辗转相除");
  const rows = LADDER.length;
  LADDER.forEach(([x, q, y, r], i) => {
    const ra = a * at(S, 0, 0.4, 0.8 + 0.55 * i);
    if (ra <= 0.003) return;
    const yy = 262 + i * 54;
    txt(String(x), 260, yy, { size: 32, fam: F.mono, w: 700, align: 'right', c: C.white, a: ra });
    txt('=', 290, yy, { size: 32, fam: F.mono, w: 700, c: C.dim, a: ra });
    txt(String(q), 360, yy, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.now, a: ra });
    txt('·', 395, yy, { size: 32, fam: F.mono, w: 700, c: C.dim, a: ra });
    txt(String(y), 470, yy, { size: 32, fam: F.mono, w: 700, align: 'right', c: C.white, a: ra });
    txt('+', 495, yy, { size: 32, fam: F.mono, w: 700, c: C.dim, a: ra });
    txt(String(r), 590, yy, { size: 32, fam: F.mono, w: 700, align: 'right', c: r ? C.mag : C.cyan, a: ra });
    if (!r) txt('stop · 停', 640, yy, { size: 26, fam: F.zh, w: 700, c: C.cyan, a: ra });
  });
  /* right: the coefficients and the convergents */
  const ca = a * at(S, 0, 0.6, 0.5);
  panel(930, 185, 850, 455, ca, C.mag, 'CONVERGENTS · 渐近分数');
  rich([['34/21 = [', C.white], [`${COEF[0]}; ${COEF.slice(1).join(', ')}`, C.now], [']', C.white]], 960, 260, { size: 42, a: a * Q(S, 0, 'becomes one', 0.5) });
  txt('Fibonacci: 34, 21, 13, 8, 5, 3, 2, 1 · 斐波那契', 960, 305, { size: 24, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 1, 'Fibonacci', 0.5) });
  const ea = a * at(S, 2, 0.6);
  if (ea > 0.003) {
    rich([['pₙ = ', C.white], ['aₙ', C.now], [' pₙ₋₁ + pₙ₋₂     qₙ = ', C.white], ['aₙ', C.now], [' qₙ₋₁ + qₙ₋₂', C.white]], 960, 360, { size: 28, a: ea });
    CONV.forEach(([p, q], n) => {
      const fa = a * Q(S, 2, 'build the convergents', 0.4, 0.3 * n);
      const x = 990 + n * 113;
      txt(`a${'₀₁₂₃₄₅₆'[n]} = ${COEF[n]}`, x, 420, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.now, a: fa * 0.9 });
      frac(x, 480, p, q, 32, n === CONV.length - 1 ? C.now : C.cyan, fa);
    });
    const ha = a * Q(S, 3, 'twice the binary log', 0.5);
    txt('two steps at least halve the denominator · 每两步分母至少减半', 960, 576, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ha });
    txt('13 + 8 ≤ 21,    5 + 3 ≤ 8', 960, 614, { size: 28, fam: F.mono, w: 700, c: C.cyan, a: ha });
  }
  /* line 3: Lean length bound */
  const lb = a * at(S, 3, 0.6);
  if (lb > 0.003) {
    panel(130, 670, 1650, 155, lb, C.lean, 'FROZEN THEOREM · 冻结定理');
    leanChip(160, 740, EE_LEAN.length, lb, 22);
    txt('length (convergents x) ≤ 2 ⌊log₂ den x⌋ + 1', 760, 740, { size: 32, fam: F.math, w: 700, c: C.white, a: lb });
    const na = a * Q(S, 3, 'here seven', 0.5);
    rich([['16 ≤ 21 < 32:    ', C.dim], [String(LEN.n), C.now], [' ≤ 2 · 4 + 1 = ', C.white], [String(LEN.bound), C.now]], 160, 800, { size: 34, a: na });
  }
};

/* ======================================================================= */
/*                               scene 5 · UNIT AREA                         */
/* ======================================================================= */
SCENES.unit = S => {
  const a = fade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'argued']]);
  /* left: the step matrix and the product */
  const ma = a * at(S, 0, 0.6);
  panel(130, 185, 700, 320, ma, C.cyan, 'STEP MATRIX · 单步矩阵');
  txt('M(a) =', 160, 290, { size: 34, fam: F.math, w: 700, c: C.white, a: ma });
  const xe = mat2(318, 228, [['a', 1], [1, 0]], ma, { size: 34, cw: 64, cols: [[C.now, C.white], [C.white, C.white]] });
  rich([['det = a·0 − 1·1 = ', C.white], ['−1', C.now]], xe + 22, 290, { size: 26, a: a * Q(S, 0, 'determinant', 0.5) });
  const pa = a * Q(S, 1, 'neighbours', 0.5);
  txt('M(1)⁶ · M(2) =', 160, 430, { size: 30, fam: F.math, w: 700, c: C.white, a: pa });
  const xp = mat2(420, 368, PROD, pa, { size: 32, cw: 64, cols: [[C.cyan, C.cyan], [C.mag, C.mag]] });
  txt(`det = ${String(PDET).replace('-', '−')} = (−1)⁷`, xp + 20, 430, { size: 24, fam: F.math, w: 700, c: C.now, a: pa });
  /* right: the chain of convergents with their cross products */
  const ra = a * at(S, 1, 0.6);
  panel(870, 185, 910, 320, ra, C.mag, 'NEIGHBOURS · 相邻交叉积');
  CONV.forEach(([p, q], n) => frac(925 + n * 133, 285, p, q, 32, C.cyan, ra));
  CROSS.forEach((v, n) => {
    const x = 925 + n * 133 + 66, sa = a * Q(S, 1, 'plus or minus one', 0.4, 0.25 * n);
    txt(v > 0 ? '+1' : '−1', x, 395, { size: 30, fam: F.mono, w: 700, align: 'center', c: n === 5 ? C.now : C.white, a: sa });
    curve(t => [x - 52 + 104 * t, 350 + 12 * Math.sin(Math.PI * t)], 16, C.dim, sa * 0.8, 1.5);
  });
  const xa = a * Q(S, 1, 'thirty-four times eight', 0.5);
  rich([['34 · 8 − 13 · 21 = 272 − 273 = ', C.white], ['−1', C.now]], 900, 470, { size: 32, a: xa });
  /* line 2: Lean, two chips */
  const la = a * at(S, 2, 0.6);
  if (la > 0.003) {
    panel(130, 530, 1650, 140, la, C.lean, 'FROZEN THEOREMS · 冻结定理');
    leanChip(160, 598, EE_LEAN.det, la, 20);
    txt('det (convergentPair coeffs) = (−1) ^ coefficientCount', 650, 598, { size: 26, fam: F.math, w: 700, c: C.white, a: la });
    const ka = a * Q(S, 2, 'lowest terms', 0.5);
    leanChip(160, 648, EE_LEAN.coprime, ka, 20);
    txt('d ∣ num ∧ d ∣ den  →  d = 1', 650, 648, { size: 26, fam: F.math, w: 700, c: C.white, a: ka });
    tag(1300, 646, 'strict backend · axioms: [ ]', C.lean, ka);
  }
  /* line 3: the alternating approach on a number line (values computed, the identity argued) */
  const na = a * at(S, 3, 0.6);
  if (na > 0.003) {
    const X = v => 220 + (v - 0.9) / 1.2 * 1480, y = 745;
    line(X(0.9), y, X(2.1), y, C.dim, na, 2);
    [1, 1.5, 2].forEach(v => { line(X(v), y - 8, X(v), y + 8, C.dim, na, 2); });
    const tgt = X(34 / 21);
    line(tgt, y - 46, tgt, y + 46, C.now, na, 2.5);
    txt('34/21', tgt + 10, y + 70, { size: 22, fam: F.mono, w: 700, c: C.now, a: na });
    const labs = ['1/1', '2/1', '3/2', '5/3', '8/5', '13/8'];
    CONV.slice(0, 6).forEach(([p, q], n) => {
      const da = a * Q(S, 3, 'Divided out', 0.4, 0.45 * n), up = n % 2 === 1, x = X(p / q);
      dot(x, y + (up ? -22 : 22), 9, up ? 'm' : 'c', da);
      const ly = up ? y - 36 : y + 50, side = n === 4 || n === 5;
      txt(labs[n], x + (side ? -10 : 0), ly, { size: 20, fam: F.mono, w: 700, align: side ? 'right' : 'center', c: up ? C.mag : C.cyan, a: da });
    });
    txt('gap = 1 / (qₙ qₙ₊₁):  1, 1/2, 1/6, 1/15, 1/40, 1/168', 160, 836, { size: 22, fam: F.math, w: 700, c: C.argued, a: a * Q(S, 3, 'one over their product', 0.5) });
  }
};

/* ======================================================================= */
/*                              scene 6 · QUARTER DEPTH                      */
/* ======================================================================= */
SCENES.depth = S => {
  const a = fade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* top left: from the limit to integers */
  const ta = a * at(S, 0, 0.6);
  panel(130, 185, 800, 330, ta, C.cyan, 'THE BUDGET · 误差预算');
  rich([['(¼)ᴺ⁺¹ · C  <  ε', C.white]], 160, 270, { size: 40, a: ta * (1 - 0.6 * at(S, 1, 0.6)) });
  txt('(¼)ᴺ → 0 ?  limit · 极限', 560, 270, { size: 24, fam: F.zh, w: 700, c: C.argued, a: a * Q(S, 0, 'shrinks to zero', 0.5) * (1 - 0.6 * at(S, 1, 0.6)) });
  const ia = a * at(S, 1, 0.6);
  if (ia > 0.003) {
    rich([['C ≤ c/d = ', C.white], ['7/2', C.now], ['     ε = p/q = ', C.white], ['1/10', C.now]], 160, 340, { size: 34, a: ia });
    rich([['c·q = 70     d·p = 2     ⌊70 / 2⌋ = ', C.white], ['35', C.now]], 160, 410, { size: 34, a: a * Q(S, 1, 'seventy over two', 0.5) });
    txt('only natural numbers · 只用自然数', 160, 470, { size: 22, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 1, 'thirty-five', 0.5) });
  }
  /* top right: the power ladder of 4 */
  const pa = a * at(S, 2, 0.6);
  panel(970, 185, 810, 330, pa, C.mag, 'POWERS OF 4 · 四的幂');
  if (pa > 0.003) {
    const X = e => 1010 + e * 230, y = 330;
    line(X(0), y, X(3.15), y, C.dim, pa, 2);
    [0, 1, 2, 3].forEach(e => {
      line(X(e), y - 12, X(e), y + 12, C.mag, pa, 2.5);
      txt(`4${'⁰¹²³'[e]}`, X(e), y - 26, { size: 24, fam: F.math, w: 700, align: 'center', c: C.mag, a: pa });
      txt(String(4 ** e), X(e), y + 46, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: pa });
    });
    const e35 = Math.log(35) / Math.log(4);
    const ma = a * Q(S, 2, 'between sixteen and sixty-four', 0.5);
    fillBox(X(2), y - 6, X(3) - X(2), 12, C.now, ma * 0.25);
    dot(X(e35), y, 13, 'o', ma);
    txt('35', X(e35), y - 26, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.now, a: ma });
    rich([['quarterDepth (7, 2, 1, 10) = ⌊log₄ 35⌋ = ', C.white], [String(QD.N), C.now]], 1000, 460, { size: 30, a: a * Q(S, 2, 'quarter depth is two', 0.5) });
  }
  /* bottom left: the integer inequality (Omega core) */
  const la = a * at(S, 3, 0.6);
  if (la > 0.003) {
    panel(130, 540, 800, 290, la, C.lean, 'OMEGA CORE · 整数核心');
    leanChip(160, 605, EE_LEAN.depth, la, 20);
    txt('quarterDepth c d p q ≤ N  →  c·q < d·p · 4ᴺ⁺¹', 160, 650, { size: 26, fam: F.math, w: 700, c: C.white, a: la });
    tag(160, 692, 'strict backend · axioms: [ ] · 严格后端零公理', C.lean, a * Q(S, 3, 'empty axiom list', 0.5));
    const ba = a * Q(S, 3, 'seventy is below', 0.5), sc = 3.2;
    fillBox(160, 722, 70 * sc * ease(ba), 26, C.cyan, ba * 0.85);
    txt('70', 160 + 70 * sc + 12, 744, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: ba });
    fillBox(160, 762, 128 * sc * ease(ba), 26, C.lean, ba * 0.6);
    txt('2 · 4³ = 128', 160 + 128 * sc + 12, 784, { size: 26, fam: F.mono, w: 700, c: C.lean, a: ba });
    stamp('70 < 128', 780, 702, Q(S, 3, 'one hundred twenty-eight', 0.5), C.lean, 26, -0.05);
  }
  /* bottom right: the classical real shadow, and depth one failing */
  const ra = a * at(S, 4, 0.6);
  if (ra > 0.003) {
    panel(970, 540, 810, 290, ra, C.lean, 'CLASSICAL SHADOW · 经典阴影');
    leanChip(1000, 605, EE_LEAN.real, ra, 20);
    txt('C ≤ c/d  →  (¼)ᴺ⁺¹ · C < p/q   (C ∈ ℝ, Mathlib)', 1000, 650, { size: 24, fam: F.math, w: 700, c: C.white, a: ra });
    rich([['(¼)³ · 7/2 = ', C.white], ['7/128', C.lean], [' < 1/10', C.white]], 1000, 712, { size: 36, a: a * Q(S, 4, 'under one tenth', 0.5) });
    const fa = a * Q(S, 4, 'Depth one fails', 0.5);
    txt('N = 1:  2 · 4² = 32 < 70,   (¼)² · 7/2 = 7/32 > 1/10', 1000, 770, { size: 24, fam: F.math, w: 700, c: C.dim, a: fa });
    txt('depth 1 fails · 深度 1 不够（屏幕计算）', 1000, 808, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: fa });
  }
};

/* ======================================================================= */
/*                                 scene 7 · LEDGER                          */
/* ======================================================================= */
/* the engine's closingCard stacks one citation per row, which does not fit seven; this end card shows the same
   items (book, film, every cited theorem, the pinned commit) with the citations in one tighter column */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  const a = clamp((S.u - 0.1) / 1.0) * clamp((S.d - S.u) / 1.2);
  if (a <= 0) return;
  const b = DATA.book, f = DATA.film, cx = W / 2, cy = 260;
  drawHyper(CUBE4, [[0, 3, S.t * 0.21], [1, 2, S.t * 0.13], [2, 3, S.t * 0.17]], { scale: 1.0, a: 0.3 * a, cx, cy: cy - 30, camZ: 7, lw: 1.4, dots: false });
  txt(b.code, cx, cy - 60, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a, ls: 10 });
  txt(b.title.zh, cx, cy + 20, { size: 66, fam: F.zh, w: 900, align: 'center', c: C.white, a, ab: 3 });
  txt(b.subtitle ? b.subtitle.en : b.title.en, cx, cy + 74, { size: 26, fam: F.disp, w: 700, align: 'center', c: C.white, a: a * 0.85, ls: 1 });
  const p2 = clamp((S.u - 0.9) / 0.8) * a;
  txt(`FILM · ${f.title.toUpperCase()}`, cx, cy + 135, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: p2, ls: 3 });
  txt(f.title_zh, cx, cy + 175, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: p2 * 0.85 });
  const p3 = clamp((S.u - 1.7) / 0.8) * a;
  const rows = DATA.lean.filter(z => z.kind === 'theorem');
  const head = STR.en.lean || 'LEAN ✓';
  let size = 20;
  const widest = Math.max(1, ...rows.map(r => tw(r.label || r.name, size, F.mono, 700)));
  const wh = tw(head, size * 0.72, F.mono, 700, 1) + 14, maxW = SAFE.x1 - SAFE.x0;
  if (wh + 10 + widest > maxW) size *= (maxW - wh - 10) / widest;
  const total = wh + 10 + Math.min(widest, maxW - wh - 10), x = cx - total / 2, gap = 38, y0 = cy + 250;
  rows.forEach((r, i) => {
    const y = y0 + i * gap;
    fillBox(x, y - size * 0.95, wh, size * 1.25, C.lean, p3 * 0.95);
    txt(head, x + 7, y - size * 0.12, { size: size * 0.72, fam: F.mono, w: 700, c: C.bg, a: p3, ls: 1 });
    txt(r.label || r.name, x + wh + 10, y, { size, fam: F.mono, w: 700, c: C.lean, a: p3 });
  });
  const pin = DATA.pin || {};
  if (pin.commit) txt(`github.com/${pin.repo} @ ${pin.commit.slice(0, 12)}`, cx, y0 + rows.length * gap + 10, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: p3, ls: 1 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[2], t = sc.start + 8;
  background(t, sc, 2, 8);
  grid(t, 0.4);
  txt(DATA.film.title_zh, W / 2, 260, { size: 100, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt("EUCLID'S ESCAPE", W / 2, 360, { size: 58, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 2, ls: 6 });
  rich([['1 + 2·3·5·7·11·13 = 30031 = ', C.white], ['59', C.now], [' × 509', C.white]], W / 2, 500, { size: 54, align: 'center' });
  txt('59 ∉ [2, 3, 5, 7, 11, 13]', W / 2, 570, { size: 34, fam: F.math, w: 700, align: 'center', c: C.now });
  txt('34/21 = [1; 1, 1, 1, 1, 1, 2]   ·   34·8 − 13·21 = −1   ·   70 < 2·4³', W / 2, 680, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.mag });
  bloom(0.5);
  txt(`${DATA.book.code} · FILM`, W / 2, 880, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.subtitle ? DATA.book.subtitle.zh : ''}`, W / 2, 960, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 2, sc);
  post(0);
};
