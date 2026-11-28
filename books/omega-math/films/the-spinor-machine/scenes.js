/* Film · The Spinor Machine · 旋子机 (book omega-math, chapter 16).
   Scenes for the shared engine theme/film/engine.js.

   What each scene shows, and where it rests:
     machine    Conway's scalar FRACTRAN: one positive integer state, an ordered list of fractions, one rule (multiply
                by the first fraction whose denominator divides the state; halt when none does). The rule is the
                chapter's definition (16.1, a literature construction); the scan of 2¹⁷ against P_Ω and the halting
                check at 22 are computed here.
     registers  N = ∏ p^v_p(N): each prime is a register; a rule a/b is the update vector r(a) − r(b); the guard b | N is
                "no exponent below zero" (16.1, computed for the drawn cases).
     trace      P_Ω = [11/49, 7/25, 5/9, 3/4] from 2¹⁷ = 131 072: 15 transitions, 16 states, halt at 22 = 2·11
                (example ex-om-ch16-sixteen-state-fractran-trace, recomputed here two ways and checked against the
                chapter's table) ..... OmegaComposeAndWitnesses.p_omega_halts_at_22 (LEAN: Follows pOmega pOmegaTrace
                pOmegaStart, run 15 = 22, Halts 22, no halt before step 15); OmegaMatrixAndFractran.fractran_stable
                (LEAN: a halted run stays put for any extra steps).
     tax        scalar products commute (computed); flag primes as the scalar workaround (chapter's prose, argued);
                the integer quaternion state and its double encoding (definition def-om-ch16-omega-fractran-machine,
                MODEL, argued); the multiplicativity of the squared length for the drawn pair (computed).
     orders     X = 1 + 2i, Y = 1 + 2j; XY = (1, 2, 2, 4), YX = (1, 2, 2, −4), both of squared length 25 (computed).
     gate       right multiplication by gateUnwindY = (1, 0, −2, 0) and division by 5: XY → (5, 10, 0, 0) → X; YX →
                (5, −6, 0, −8), remainders (0, 4, 0, 2), blocked; gateUnwindX = (1, −2, 0, 0) takes YX → (5, 0, 10, 0)
                → Y (example ex-om-ch16-nonabelian-stack-proof, computed); last-in-first-out reading (MODEL, argued)
                ..... OmegaBargmannHaarHecke.quaternion_fractran_order_separation (LEAN: both normSq = 5·5,
                Step psiXY gateUnwindY 5 psiX, ¬ Enabled psiYX gateUnwindY 5).
     matrix     Mat2 with trace a + d, det ad − bc; A = (2 3; 1 4), B = (1 −2; 5 3): AB = (17 5; 21 10), BA = (0 −5;
                13 27), traces 27, det AB = 65 = 5·13, A² − 6A + 5I = 0 (example ex-om-ch16-mat2-numeric-audit,
                computed) ..... OmegaMatrixAndFractran.trace_mul_comm, OmegaComposeAndWitnesses.mat2_det_mul,
                OmegaMatrixAndFractran.cayley_hamilton (LEAN, for every A, B : Mat2).

   On load, FILM.init checks DATA.lean against the six theorems and re-derives every number shown on screen by an
   independent route; any disagreement goes to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const SM_LEAN = {
  p_omega_halts_at_22: 'D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.p_omega_halts_at_22',
  fractran_stable: 'D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.fractran_stable',
  quaternion_fractran_order_separation: 'D5/S3/Quantum/AURICOmega/OmegaBargmannHaarHecke.quaternion_fractran_order_separation',
  trace_mul_comm: 'D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.trace_mul_comm',
  mat2_det_mul: 'D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.mat2_det_mul',
  cayley_hamilton: 'D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.cayley_hamilton'
};

/* scalar FRACTRAN: P_Ω in priority order, as [numerator, denominator] */
const PO = [[11, 49], [7, 25], [5, 9], [3, 4]];
const PO_NAME = ['11/49', '7/25', '5/9', '3/4'];
const PRIMES = [2, 3, 5, 7, 11];
const START = 131072;
/* one step: index of the first rule whose denominator divides n, or −1 */
const fireIdx = n => PO.findIndex(([, b]) => n % b === 0);
function runTrace(n0) {
  const out = [{ n: n0, rule: -1 }];
  let n = n0;
  for (let k = 0; k < 100; k++) {
    const i = fireIdx(n);
    if (i < 0) break;
    n = n / PO[i][1] * PO[i][0];
    out.push({ n, rule: i });
  }
  return out;
}
const TRACE = runTrace(START);
const vexp = n => PRIMES.map(p => { let v = 0; while (n % p === 0) { n /= p; v++; } return v; });
TRACE.forEach(s => { s.v = vexp(s.n); });
const VMAX = 17;

/* integer quaternions [w, x, y, z] = w + x i + y j + z k */
const qMul = (a, b) => [
  a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
  a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
  a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
  a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
const qN2 = a => a.reduce((s, c) => s + c * c, 0);
const mod = (a, p) => ((a % p) + p) % p;
const QX = [1, 2, 0, 0], QY = [1, 0, 2, 0];
const GUY = [1, 0, -2, 0], GUX = [1, -2, 0, 0];
const XY = qMul(QX, QY), YX = qMul(QY, QX);
const XY_G = qMul(XY, GUY), YX_G = qMul(YX, GUY), YX_GX = qMul(YX, GUX);

/* 2×2 integer matrices [a, b, c, d] = (a b; c d) */
const mMul = (A, B) => [A[0] * B[0] + A[1] * B[2], A[0] * B[1] + A[1] * B[3], A[2] * B[0] + A[3] * B[2], A[2] * B[1] + A[3] * B[3]];
const mTr = A => A[0] + A[3], mDet = A => A[0] * A[3] - A[1] * A[2];
const MA = [2, 3, 1, 4], MB = [1, -2, 5, 3];
const MAB = mMul(MA, MB), MBA = mMul(MB, MA), MA2 = mMul(MA, MA);
const MCH = MA2.map((x, i) => x - mTr(MA) * MA[i] + mDet(MA) * [1, 0, 0, 1][i]);

/* the chapter's table (ex-om-ch16-sixteen-state-fractran-trace), copied verbatim: state and exponent vector */
const BOOK_TABLE = [
  [131072, [17, 0, 0, 0, 0]], [98304, [15, 1, 0, 0, 0]], [73728, [13, 2, 0, 0, 0]], [40960, [13, 0, 1, 0, 0]],
  [30720, [11, 1, 1, 0, 0]], [23040, [9, 2, 1, 0, 0]], [12800, [9, 0, 2, 0, 0]], [3584, [9, 0, 0, 1, 0]],
  [2688, [7, 1, 0, 1, 0]], [2016, [5, 2, 0, 1, 0]], [1120, [5, 0, 1, 1, 0]], [840, [3, 1, 1, 1, 0]],
  [630, [1, 2, 1, 1, 0]], [350, [1, 0, 2, 1, 0]], [98, [1, 0, 0, 2, 0]], [22, [1, 0, 0, 0, 1]]];
const BOOK_RULES = [4, 4, 3, 4, 4, 3, 2, 4, 4, 3, 4, 4, 3, 2, 1];

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('the-spinor-machine film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const eq = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(SM_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(SM_LEAN).length}`);
  for (const [short, gid] of Object.entries(SM_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. the trace, by an independent route: exponent vectors with the "no negative register" guard */
  check(START === 2 ** 17, '131072 = 2¹⁷');
  const D = PO.map(([a, b]) => { const va = vexp(a), vb = vexp(b); return va.map((x, i) => x - vb[i]); });
  let v = vexp(START).slice(); const route = [v.slice()], rules = [];
  for (let k = 0; k < 100; k++) {
    const i = D.findIndex(d => d.every((x, j) => v[j] + x >= 0));
    if (i < 0) break;
    v = v.map((x, j) => x + D[i][j]); route.push(v.slice()); rules.push(i + 1);
  }
  const val = e => e.reduce((s, x, j) => s * PRIMES[j] ** x, 1);
  check(TRACE.length === 16 && route.length === 16, `16 states, got ${TRACE.length} / ${route.length}`);
  check(TRACE.length - 1 === 15, '15 transitions');
  TRACE.forEach((s, k) => {
    check(val(route[k]) === s.n, `state ${k}: ${s.n} vs exponent route ${val(route[k])}`);
    check(BOOK_TABLE[k] && s.n === BOOK_TABLE[k][0] && eq(s.v, BOOK_TABLE[k][1]), `state ${k} differs from the chapter's table`);
  });
  check(eq(rules, BOOK_RULES) && eq(TRACE.slice(1).map(s => s.rule + 1), BOOK_RULES), 'rule sequence matches the chapter');
  check(TRACE[15].n === 22 && fireIdx(22) === -1 && [49, 25, 9, 4].every(b => 22 % b !== 0), 'halts at 22: 49, 25, 9, 4 ∤ 22');
  for (let k = 0; k < 15; k++) check(fireIdx(TRACE[k].n) >= 0, `no halt at step ${k}`);
  check(17 === 16 + 1 && eq(vexp(22), [1, 0, 0, 0, 1]), '17 = 16 + 1, 22 = 2 · 11');
  check(eq(D[3], [-2, 1, 0, 0, 0]), '3/4 is the update (−2, +1, 0, 0, 0)');
  check(fireIdx(START) === 3 && TRACE[1].n === 98304, 'first beat: only 4 divides 2¹⁷, 2¹⁷ · 3/4 = 98304');
  check(START * 5 / 9 % 1 !== 0, '5/9 on 2¹⁷ is not whole');
  check(3 * 5 === 5 * 3 && 3 * 5 === 15, '3 · 5 = 5 · 3');

  /* 2. quaternions: a second route through the basis table i² = j² = k² = ijk = −1 */
  const T = { '11': [1, ''], '1i': [1, 'i'], '1j': [1, 'j'], '1k': [1, 'k'], 'i1': [1, 'i'], 'j1': [1, 'j'], 'k1': [1, 'k'],
    ii: [-1, ''], jj: [-1, ''], kk: [-1, ''], ij: [1, 'k'], jk: [1, 'i'], ki: [1, 'j'], ji: [-1, 'k'], kj: [-1, 'i'], ik: [-1, 'j'] };
  const B = ['1', 'i', 'j', 'k'];
  const qMul2 = (a, b) => { const r = [0, 0, 0, 0]; a.forEach((x, s) => b.forEach((y, t) => { const [sg, e] = T[B[s] + B[t]]; r[B.indexOf(e || '1')] += sg * x * y; })); return r; };
  for (let t = 0; t < 40; t++) {
    const p = [0, 1, 2, 3].map(i => Math.floor(rnd(t, i) * 13) - 6), q = [0, 1, 2, 3].map(i => Math.floor(rnd(t, i + 9) * 13) - 6);
    check(eq(qMul(p, q), qMul2(p, q)), `quaternion product route ${t}`);
    check(qN2(qMul(p, q)) === qN2(p) * qN2(q), `four-square identity ${t}`);
  }
  check(qN2(QX) === 5 && qN2(QY) === 5, '|X|² = |Y|² = 5');
  check(eq(XY, [1, 2, 2, 4]) && eq(YX, [1, 2, 2, -4]), 'XY = (1, 2, 2, 4), YX = (1, 2, 2, −4)');
  check(qN2(XY) === 25 && qN2(YX) === 25, 'both of squared length 25');
  check(eq(XY_G, [5, 10, 0, 0]) && XY_G.every(c => mod(c, 5) === 0) && eq(XY_G.map(c => c / 5), QX), 'XY · (1 − 2j) = (5, 10, 0, 0) = 5X');
  check(eq(YX_G, [5, -6, 0, -8]) && eq(YX_G.map(c => mod(c, 5)), [0, 4, 0, 2]), 'YX · (1 − 2j) = (5, −6, 0, −8), remainders (0, 4, 0, 2)');
  check(eq(YX_GX, [5, 0, 10, 0]) && eq(YX_GX.map(c => c / 5), QY), 'YX · (1 − 2i) = (5, 0, 10, 0) = 5Y');
  check(eq(qMul(QX, QY), qMul2(QX, QY)) && eq(qMul(XY_G.map(c => c / 5), QY), XY), 'X · Y restores XY');

  /* 3. matrices: the worked numbers, and the four laws on a grid of integer matrices */
  check(mTr(MA) === 6 && mDet(MA) === 5 && mTr(MB) === 4 && mDet(MB) === 13, 'tr A = 6, det A = 5, tr B = 4, det B = 13');
  check(eq(MAB, [17, 5, 21, 10]) && eq(MBA, [0, -5, 13, 27]), 'AB = (17 5; 21 10), BA = (0 −5; 13 27)');
  check(mTr(MAB) === 27 && mTr(MBA) === 27 && mDet(MAB) === 65 && 65 === 5 * 13, 'traces 27, det AB = 65 = 5 · 13');
  check(eq(MA2, [7, 18, 6, 19]) && eq(MCH, [0, 0, 0, 0]), 'A² = (7 18; 6 19), A² − 6A + 5I = 0');
  for (let t = 0; t < 60; t++) {
    const P = [0, 1, 2, 3].map(i => Math.floor(rnd(t, i + 20) * 15) - 7), R = [0, 1, 2, 3].map(i => Math.floor(rnd(t, i + 30) * 15) - 7);
    check(mTr(mMul(P, R)) === mTr(mMul(R, P)), `trace cycles ${t}`);
    check(mDet(mMul(P, R)) === mDet(P) * mDet(R), `det multiplies ${t}`);
    const P2 = mMul(P, P);
    check(P2.every((x, i) => x - mTr(P) * P[i] + mDet(P) * [1, 0, 0, 1][i] === 0), `Cayley–Hamilton ${t}`);
  }
});
Object.assign(FILM.speed, { machine: 0.02, registers: 0.014, trace: 0.018, tax: 0.012, orders: 0.014, gate: 0.016, matrix: 0.014, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const smFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const sgn = n => (n < 0 ? '−' + -n : String(n));
const qStr = q => '(' + q.map(sgn).join(', ') + ')';
function rich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  const tot = parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0);
  if (o.align === 'center') cx = x - tot / 2;
  else if (o.align === 'right') cx = x - tot;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a }); cx += tw(s, size, fam, w); }
  return cx;
}
const SM_MISSING = new Set();
function smLean(x, y, key, a, o = {}) {
  if (a <= 0.003) return;
  const gid = SM_LEAN[key], r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!SM_MISSING.has(gid)) { SM_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 19, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(key, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a 2×2 matrix with brackets; entries centred in columns */
function mat(M, x, y, a, o = {}) {
  if (a <= 0.003) return;
  const size = o.size || 32, cw = o.cw || 66, rh = o.rh || 46, col = o.c || C.white, bc = o.bc || C.white;
  const hgt = rh * 2 + 6;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = bc; ctx.lineWidth = 2.2; ctx.beginPath();
  ctx.moveTo(x + 10, y - 6); ctx.lineTo(x, y - 6); ctx.lineTo(x, y + hgt); ctx.lineTo(x + 10, y + hgt);
  const xr = x + cw * 2 + 14;
  ctx.moveTo(xr - 10, y - 6); ctx.lineTo(xr, y - 6); ctx.lineTo(xr, y + hgt); ctx.lineTo(xr - 10, y + hgt);
  ctx.stroke(); ctx.restore();
  M.forEach((v, i) => txt(sgn(v), x + 7 + cw * (i % 2) + cw / 2, y + rh * Math.floor(i / 2) + rh * 0.72, { size, fam: F.math, w: 700, align: 'center', c: (o.cols && o.cols[i]) || col, a }));
  return xr;
}
function smTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.3) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.4);
  txt(`${DATA.book.code} · FILM`, W / 2, 360, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 500, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('THE SPINOR MACHINE', p, 5), W / 2, 600, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('PRIME REGISTERS · DIVISIBILITY GATES · ORDER · MAT₂(ℤ)', W / 2, 680, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 5 });
}

/* ======================================================================= */
/*                          scene 1 · ONE NUMBER                             */
/* ======================================================================= */
SCENES.machine = S => {
  const u = S.u;
  smTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* the state */
  const sa = a * Q(S, 0, 'one whole number', 0.6);
  panel(140, 200, 700, 300, sa, C.cyan, 'STATE · 状态');
  /* the program */
  const pa = a * Q(S, 0, 'list of fractions', 0.6);
  panel(940, 200, 840, 300, pa, C.mag, 'PROGRAM PΩ · 程序');
  const cx = i => 1050 + i * 205;
  PO_NAME.forEach((n, i) => chip(cx(i), 300, 170, 76, n, C.mag, pa * clamp(Q(S, 0, 'list of fractions', 0.4, 0.15 * i)), 36, F.math));
  if (pa > 0.003) PO_NAME.forEach((n, i) => txt(`rule ${i + 1}`, cx(i), 372, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: pa }));
  /* line 1: one beat at 2¹⁷: scan 49, 25, 9, 4 */
  const sc = a * at(S, 1, 0.6);
  const scan = clamp((u - phraseAt(S, 1, 'first fraction')) / 2.4);
  const halt = a * at(S, 2, 0.6);
  let n = START;
  if (sc > 0.003 && halt <= 0.003) {
    const k = Math.min(3, Math.floor(scan * 4));
    for (let i = 0; i <= k && scan > 0; i++) {
      const ok = START % PO[i][1] === 0, last = i === k;
      if (last) box(cx(i) - 92, 254, 184, 92, C.now, sc, 3);
      txt(ok ? `${PO[i][1]} | 2¹⁷ ✓` : `${PO[i][1]} ∤ 2¹⁷`, cx(i), 440, { size: 24, fam: F.math, w: 700, align: 'center', c: ok ? C.now : C.dim, a: sc });
    }
    if (scan >= 1) n = TRACE[1].n;
  }
  if (halt > 0.003) {
    n = 22;
    PO.forEach(([, b], i) => txt(`${b} ∤ 22`, cx(i), 440, { size: 24, fam: F.math, w: 700, align: 'center', c: C.mag, a: halt }));
  }
  if (sa > 0.003) {
    txt('N =', 180, 330, { size: 40, fam: F.math, w: 700, c: C.dim, a: sa });
    txt(fmt(n), 490, 350, { size: 92, fam: F.math, w: 700, align: 'center', c: n === START ? C.white : C.now, a: sa });
    const sub = n === START ? '= 2¹⁷' : n === 22 ? '= 2 · 11' : '= 2¹⁷ · 3/4 = 2¹⁵ · 3';
    txt(sub, 490, 430, { size: 32, fam: F.math, w: 700, align: 'center', c: C.white, a: sa * 0.85 });
  }
  /* the rule, written once */
  const ra = a * at(S, 1, 0.8);
  panel(140, 560, 1640, 230, ra, C.cyan, 'ONE RULE · 唯一规则');
  if (ra > 0.003) {
    rich([['N  ←  N · a', C.white], ['ᵢ', C.white], ['/b', C.white], ['ᵢ', C.white], ['     for the first i with  ', C.dim], ['bᵢ | N', C.now]], 180, 650, { size: 38, a: ra });
    txt('从左到右扫描，取第一枚分母整除 N 的分数；乘完回到表头', 180, 715, { size: 26, fam: F.zh, w: 700, c: C.white, a: ra * 0.9 });
    if (halt > 0.003) {
      rich([['no bᵢ divides N  ⇒  ', C.white], ['HALT', C.mag]], 180, 770, { size: 32, a: halt });
      txt('无分母整除 → 停机', 1740, 770, { size: 26, fam: F.zh, w: 700, align: 'right', c: C.mag, a: halt });
    }
  }
};

/* ======================================================================= */
/*                        scene 2 · PRIME REGISTERS                          */
/* ======================================================================= */
/* five registers as columns of unit cells; v = exponents, ghost = cells being removed (mag) or added (amber) */
const RG = { x0: 200, dx: 150, base: 760, cell: 28, cw: 90 };
function registers(v, a, o = {}) {
  if (a <= 0.003) return;
  const { x0, dx, base, cell, cw } = { ...RG, ...(o.geo || {}) }, lo = o.labelOff || 40;
  PRIMES.forEach((p, j) => {
    const x = x0 + j * dx;
    line(x - cw / 2 - 6, base + 2, x + cw / 2 + 6, base + 2, C.dim, a, 2);
    txt(String(p), x, base + lo, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a });
    const n = v[j];
    for (let k = 0; k < n; k++) {
      const rem = o.remove && o.remove[j] && k >= n - o.remove[j];
      const col = rem ? C.mag : j === 0 ? C.cyan : mix(C.cyan, C.white, 0.25 * j);
      fillBox(x - cw / 2, base - (k + 1) * cell + 3, cw, cell - 5, col, a * (rem ? o.removeA : 0.85));
    }
    if (o.add && o.add[j]) for (let k = 0; k < o.add[j]; k++) {
      const y = base - (n + k + 1) * cell + 3;
      fillBox(x - cw / 2, y, cw, cell - 5, C.now, a * o.addA);
    }
    if (o.neg && o.neg[j]) for (let k = 0; k < o.neg[j]; k++) {
      ctx.save(); ctx.setLineDash([6, 6]); box(x - cw / 2, base + 8 + k * cell, cw, cell - 5, C.mag, a * o.negA, 2); ctx.restore();
    }
    if (o.count !== false) txt(String(n), x, base - n * cell - 14, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: a * 0.9 });
  });
}
SCENES.registers = S => {
  const a = smFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* line 0: 131072 = 2¹⁷ and the factorisation */
  const fa = a * Q(S, 0, 'Factor the number', 0.6);
  const ra = a * Q(S, 0, 'own register', 0.8);
  const ua = a * at(S, 1, 0.6), mv = clamp(Q(S, 1, 'take two', 1.2));
  const ga = a * at(S, 2, 0.6);
  panel(120, 180, 860, 650, ra, C.cyan, 'PRIME REGISTERS · 素数寄存器');
  /* during line 1 show 2¹⁷ → 2¹⁵·3, during line 2 the blocked rule 5/9 */
  const v = mv >= 1 ? [15, 1, 0, 0, 0] : [17, 0, 0, 0, 0];
  registers(v, ra, {
    remove: mv > 0 && mv < 1 ? [2, 0, 0, 0, 0] : null, removeA: 1 - mv * 0.85,
    add: mv > 0 && mv < 1 ? [0, 1, 0, 0, 0] : null, addA: mv,
    neg: ga > 0.003 ? [0, 1, 0, 0, 0] : null, negA: ga, count: true,
    remove2: null, geo: { base: 690, cell: 26 }, labelOff: 82
  });
  if (fa > 0.003) {
    rich([['131 072 = ', C.white], ['2¹⁷', C.cyan], [' · 3⁰ · 5⁰ · 7⁰ · 11⁰', C.dim]], 1020, 250, { size: 36, a: fa });
    txt('N = ∏ pᵛᵖ  ·  r(N) = (v₂, v₃, v₅, v₇, v₁₁)', 1020, 310, { size: 28, fam: F.math, w: 700, c: C.white, a: ra });
    rich([['r(2¹⁷) = (17, 0, 0, 0, 0)', C.cyan]], 1020, 360, { size: 28, a: ra });
  }
  /* line 1: the update vector of 3/4 */
  panel(1000, 410, 800, 190, ua, C.mag, 'UPDATE · 更新向量');
  if (ua > 0.003) {
    rich([['3/4 = 3¹ / 2²   →   Δ = (', C.white], ['−2', C.mag], [', ', C.white], ['+1', C.now], [', 0, 0, 0)', C.white]], 1030, 485, { size: 30, a: ua });
    rich([['(17, 0, 0, 0, 0) + Δ = ', C.white], ['(15, 1, 0, 0, 0)', C.now]], 1030, 540, { size: 30, a: ua * mv });
    txt('= 98 304', 1770, 585, { size: 26, fam: F.math, w: 700, align: 'right', c: C.white, a: ua * mv });
  }
  /* line 2: the guard */
  panel(1000, 620, 800, 210, ga, C.cyan, 'GUARD · 整除守卫');
  if (ga > 0.003) {
    rich([['b | N   ⇔   every vₚ + Δₚ ≥ 0', C.white]], 1030, 695, { size: 32, a: ga });
    rich([['5/9 on (15, 1, 0, 0, 0):  v₃ = 1 − 2 = ', C.white], ['−1', C.mag], ['  blocked', C.mag]], 1030, 750, { size: 26, a: ga * Q(S, 2, 'below zero', 0.6) });
    txt('寄存器不许为负 · 否则规则被跳过', 1030, 800, { size: 24, fam: F.zh, w: 700, c: C.white, a: ga * Q(S, 2, 'below zero', 0.6) });
    txt('−1', RG.x0 + RG.dx + 70, 718, { size: 24, fam: F.math, w: 700, c: C.mag, a: ga });
  }
};

/* ======================================================================= */
/*                        scene 3 · SIXTEEN STATES                           */
/* ======================================================================= */
SCENES.trace = S => {
  const a = smFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [4, 'Lean checks', 'lean']]);
  /* playback: from the start of line 0 + 2.5 s to the end of line 2 */
  const t0 = lineAt(S, 0).s + 2.2, t1 = phraseAt(S, 2, 'stops at twenty-two');
  const pr = clamp((u - t0) / Math.max(1, t1 - t0));
  const k = Math.min(15, Math.floor(pr * 15.999));
  const cur = TRACE[k];
  /* left: the registers of the current state */
  panel(120, 180, 800, 650, a, C.cyan, 'REGISTERS · 寄存器');
  rich([['N = ', C.dim], [fmt(cur.n), C.now]], 160, 255, { size: 44, a });
  txt(`step ${k}`, 880, 252, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.white, a });
  if (k > 0) txt(`rule ${cur.rule + 1}: × ${PO_NAME[cur.rule]}`, 880, 290, { size: 24, fam: F.math, w: 700, align: 'right', c: C.mag, a });
  registers(cur.v, a, { geo: { x0: 230, dx: 145, base: 740, cell: 24, cw: 86 } });
  /* line 3: 17 = 16 + 1 */
  const la = a * at(S, 3, 0.6) * (1 - Q(S, 4, 'Lean checks', 0.6));
  if (la > 0.003) {
    panel(160, 320, 720, 110, la, C.now);
    rich([['17 = ', C.white], ['16', C.cyan], [' + ', C.white], ['1', C.now], ['   →   22 = ', C.white], ['2', C.now], [' · ', C.white], ['11', C.cyan]], 190, 390, { size: 38, a: la });
  }
  /* right: the 16-row ledger */
  const ta = a * Q(S, 0, 'and run', 0.6);
  panel(960, 180, 840, 650, ta, C.mag, 'LEDGER · PΩ = [11/49, 7/25, 5/9, 3/4]');
  if (ta > 0.003) {
    const y0 = 238, rh = 34;
    txt('k', 1000, y0, { size: 19, fam: F.mono, w: 700, c: C.dim, a: ta });
    txt('rule', 1100, y0, { size: 19, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ta });
    txt('N', 1330, y0, { size: 19, fam: F.mono, w: 700, align: 'right', c: C.dim, a: ta });
    txt('(v₂, v₃, v₅, v₇, v₁₁)', 1580, y0, { size: 19, fam: F.math, w: 700, align: 'center', c: C.dim, a: ta });
    TRACE.forEach((s, i) => {
      const y = y0 + 34 + i * rh, shown = i <= k, now = i === k;
      const ra = ta * (shown ? 1 : 0.18);
      if (now) fillBox(985, y - 25, 800, rh - 2, C.now, ta * 0.16);
      const col = now ? C.now : C.white;
      txt(String(i), 1000, y, { size: 21, fam: F.mono, w: 700, c: col, a: ra });
      txt(i === 0 ? 'seed' : PO_NAME[s.rule], 1100, y, { size: 21, fam: F.math, w: 700, align: 'center', c: now ? C.now : C.mag, a: ra });
      txt(fmt(s.n), 1330, y, { size: 21, fam: F.math, w: 700, align: 'right', c: col, a: ra });
      txt('(' + s.v.join(', ') + ')', 1580, y, { size: 21, fam: F.math, w: 700, align: 'center', c: col, a: ra });
    });
    const ha = a * Q(S, 2, 'stops at twenty-two', 0.6);
    if (ha > 0.003) txt('49, 25, 9, 4 ∤ 22  ·  HALT', 1770, 812, { size: 21, fam: F.math, w: 700, align: 'right', c: C.now, a: ha });
  }
  /* line 4: Lean */
  const l1 = a * Q(S, 4, 'Lean checks', 0.6), l2 = a * Q(S, 4, 'stays put', 0.6);
  if (l1 > 0.003) {
    panel(140, 320, 760, 130, l1, C.lean);
    txt('run 15 (2¹⁷) = 22 · Halts 22 · ∀ k < 15, ¬ Halts', 165, 368, { size: 23, fam: F.math, w: 700, c: C.white, a: l1 });
    smLean(165, 418, 'p_omega_halts_at_22', l1);
  }
  if (l2 > 0.003) {
    panel(140, 465, 760, 125, l2, C.lean);
    txt('Halts (run k n)  ⇒  run (k + extra) n = run k n', 165, 513, { size: 23, fam: F.math, w: 700, c: C.white, a: l2 });
    smLean(165, 563, 'fractran_stable', l2);
  }
};

/* ======================================================================= */
/*                         scene 4 · THE ORDER TAX                           */
/* ======================================================================= */
SCENES.tax = S => {
  const a = smFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, null, 'argued']]);
  /* line 0: 3 then 5 = 5 then 3 */
  const c0 = a * at(S, 0, 0.6), p0 = clamp(Q(S, 0, 'is times five', 0.8));
  panel(140, 190, 780, 330, c0, C.cyan, 'SCALARS COMMUTE · 标量可交换');
  if (c0 > 0.003) {
    const row = (y, f1, f2, c1, c2, al) => {
      chip(230, y, 110, 64, '1', C.white, al, 30, F.math);
      arrow(290, y, 360, y, c1, al, 3); chip(420, y, 110, 64, `× ${f1}`, c1, al, 28, F.math);
      arrow(480, y, 550, y, c2, al, 3); chip(610, y, 110, 64, `× ${f2}`, c2, al, 28, F.math);
      arrow(670, y, 740, y, C.white, al, 3); chip(810, y, 120, 64, '15', C.now, al, 32, F.math);
    };
    row(300, 3, 5, C.cyan, C.mag, c0);
    row(420, 5, 3, C.mag, C.cyan, c0 * p0);
    txt('3 · 5 = 5 · 3', 170, 495, { size: 28, fam: F.math, w: 700, c: C.now, a: c0 * p0 });
    txt('the order is erased · 次序被抹去', 880, 495, { size: 24, fam: F.zh, w: 700, align: 'right', c: C.now, a: c0 * p0 });
  }
  /* line 1: flag primes (schematic) */
  const c1 = a * at(S, 1, 0.6);
  panel(140, 550, 780, 280, c1, C.argued, 'FLAG PRIMES · 标志素数 (schematic)');
  if (c1 > 0.003) {
    ['f₁', 'f₂', 'f₃', 'f₄', 'f₅'].forEach((p, i) => {
      const x = 230 + i * 140, y = 650, al = c1 * clamp(Q(S, 1, 'flag primes', 0.4, 0.15 * i));
      ring(x, y, 34, C.argued, al, 3); dot(x, y, 16, i % 2 ? 'm' : 'v', al);
      txt(p, x, y + 70, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: al });
    });
    txt('extra registers that only say "whose turn" · 只为记录“轮到谁”', 170, 805, { size: 22, fam: F.zh, w: 700, c: C.white, a: c1 * Q(S, 1, 'traffic lights', 0.6) });
  }
  /* line 2: the integer quaternion state */
  const c2 = a * at(S, 2, 0.6);
  panel(980, 190, 800, 640, c2, C.vio, 'MODEL · Ψ ∈ ℤ⁴ · 整四元数状态');
  if (c2 > 0.003) {
    const names = ['w', 'x', 'y', 'z'], basis = ['', 'i', 'j', 'k'];
    names.forEach((n, i) => {
      const x = 1080 + i * 180, al = c2 * clamp(Q(S, 2, 'integer quaternion', 0.4, 0.12 * i));
      box(x - 60, 270, 120, 100, C.cyan, al, 2.5, 'rgba(0,0,0,0.5)');
      txt(n, x, 336, { size: 50, fam: F.math, w: 700, align: 'center', c: C.white, a: al });
      txt(basis[i] ? `· ${basis[i]}` : '· 1', x, 400, { size: 24, fam: F.math, w: 700, align: 'center', c: C.dim, a: al });
    });
    txt('Ψ = w + x i + y j + z k', 1380, 470, { size: 36, fam: F.math, w: 700, align: 'center', c: C.white, a: c2 });
    const nr = c2 * Q(S, 2, 'squared length', 0.6);
    rich([['|Ψ|² = w² + x² + y² + z² = ', C.white], ['∏ pᵛᵖ', C.cyan]], 1010, 545, { size: 30, a: nr });
    rich([['|Ψ₁Ψ₂|² = |Ψ₁|² · |Ψ₂|²', C.cyan], ['  e.g. 5 · 5 = 25', C.dim]], 1010, 600, { size: 28, a: nr });
    txt('radius → prime registers · 半径：素数寄存器', 1010, 680, { size: 26, fam: F.zh, w: 700, c: C.cyan, a: nr });
    txt('direction → order of operations · 方向：操作次序', 1010, 730, { size: 26, fam: F.zh, w: 700, c: C.mag, a: nr });
    txt('MODEL · 本章的模型诠释', 1010, 800, { size: 22, fam: F.zh, w: 700, c: C.argued, a: nr });
  }
};

/* ======================================================================= */
/*                          scene 5 · TWO ORDERS                             */
/* ======================================================================= */
SCENES.orders = S => {
  const a = smFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const g = a * at(S, 0, 0.6);
  chip(330, 230, 300, 70, 'X = 1 + 2i', C.cyan, g, 34, F.math);
  chip(730, 230, 300, 70, 'Y = 1 + 2j', C.mag, g * Q(S, 0, 'and Y', 0.5), 34, F.math);
  if (g > 0.003) txt('|X|² = |Y|² = 1 + 4 = 5', 530, 315, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: g * Q(S, 0, 'squared length five', 0.5) });
  /* line 1: the two products, term by term */
  const p1 = a * at(S, 1, 0.6), p2 = a * Q(S, 1, 'Y times X', 0.6);
  panel(140, 350, 800, 210, p1, C.cyan, 'X · Y');
  rich([['(1 + 2i)(1 + 2j) = 1 + 2i + 2j + 4', C.white], ['ij', C.now]], 170, 425, { size: 30, a: p1 });
  rich([['ij = k   ⇒   ', C.dim], ['(1, 2, 2, 4)', C.cyan]], 170, 490, { size: 32, a: p1 });
  panel(140, 580, 800, 210, p2, C.mag, 'Y · X');
  rich([['(1 + 2j)(1 + 2i) = 1 + 2i + 2j + 4', C.white], ['ji', C.now]], 170, 655, { size: 30, a: p2 });
  rich([['ji = −k   ⇒   ', C.dim], ['(1, 2, 2, ', C.mag], ['−4', C.now], [')', C.mag]], 170, 720, { size: 32, a: p2 });
  /* right: the imaginary parts (2, 2, ±4) drawn as two arrows on a sphere of radius √24 */
  const sa = a * at(S, 1, 0.6, 0.3);
  const ox = 1400, oy = 450, R = 205, yaw = -0.7 + 0.03 * u, pitch = 0.38;
  const P = v => {
    const s = R / Math.sqrt(24);
    const x1 = v[0] * Math.cos(yaw) - v[1] * Math.sin(yaw), y1 = v[0] * Math.sin(yaw) + v[1] * Math.cos(yaw);
    return [ox + s * x1, oy - s * (v[2] * Math.cos(pitch) - y1 * Math.sin(pitch))];
  };
  if (sa > 0.003) {
    ring(ox, oy, R, C.dim, sa * 0.6, 1.5);
    ctx.save(); ctx.globalAlpha = sa * 0.4; ctx.strokeStyle = C.dim; ctx.lineWidth = 1.2; ctx.beginPath();
    for (let i = 0; i <= 72; i++) { const t = TAU * i / 72, p = P([Math.sqrt(24) * Math.cos(t), Math.sqrt(24) * Math.sin(t), 0]); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }
    ctx.stroke(); ctx.restore();
    [[[5.6, 0, 0], 'i'], [[0, 5.6, 0], 'j'], [[0, 0, 5.6], 'k']].forEach(([e, n]) => {
      const p0 = P(e.map(c => -c * 0.8)), p1 = P(e);
      line(p0[0], p0[1], p1[0], p1[1], C.dim, sa * 0.6, 1.4);
      txt(n, p1[0] + 10, p1[1] - 8, { size: 26, fam: F.math, w: 700, c: C.dim, a: sa });
    });
    const o = P([0, 0, 0]), a1 = P([2, 2, 4]), a2 = P([2, 2, -4]);
    arrow(o[0], o[1], a1[0], a1[1], C.cyan, sa, 5);
    dot(a1[0], a1[1], 12, 'c', sa);
    txt('XY → (2, 2, 4)', a1[0] + 18, a1[1] - 10, { size: 26, fam: F.math, w: 700, c: C.cyan, a: sa });
    arrow(o[0], o[1], a2[0], a2[1], C.mag, sa * p2 / Math.max(a, 1e-6), 5);
    dot(a2[0], a2[1], 12, 'm', sa * p2 / Math.max(a, 1e-6));
    txt('YX → (2, 2, −4)', a2[0] + 18, a2[1] + 30, { size: 26, fam: F.math, w: 700, c: C.mag, a: sa * p2 / Math.max(a, 1e-6) });
    txt('imaginary parts · 虚部', 1010, 215, { size: 22, fam: F.zh, w: 700, c: C.white, a: sa });
  }
  /* line 2: same norm */
  const n2 = a * at(S, 2, 0.6);
  if (n2 > 0.003) {
    panel(1000, 690, 780, 140, n2, C.now);
    rich([['|XY|² = |YX|² = 1 + 4 + 4 + 16 = ', C.white], ['25', C.now]], 1025, 745, { size: 28, a: n2 });
    txt('同一个数，两个方向 · one number, two directions', 1025, 800, { size: 24, fam: F.zh, w: 700, c: C.white, a: n2 * Q(S, 2, 'two directions', 0.5) });
  }
};

/* ======================================================================= */
/*                        scene 6 · THE DIVISIBILITY GATE                    */
/* ======================================================================= */
function cells(q, x, y, a, o = {}) {
  if (a <= 0.003) return;
  const cw = o.cw || 92, h = o.h || 58, size = o.size || 30;
  q.forEach((c, i) => {
    const col = (o.cols && o.cols[i]) || o.c || C.white;
    box(x + i * (cw + 10), y, cw, h, o.bc || col, a, 2, 'rgba(0,0,0,0.5)');
    txt(sgn(c), x + i * (cw + 10) + cw / 2, y + h / 2 + size * 0.36, { size, fam: F.math, w: 700, align: 'center', c: col, a });
  });
}
SCENES.gate = S => {
  const a = smFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'last in, first out', 'argued'], [4, 'Lean checks', 'lean']]);
  /* line 0: the gate */
  const g0 = a * at(S, 0, 0.6);
  panel(560, 180, 800, 92, g0, C.vio);
  rich([['Ψ  →  Ψ · (1 − 2j) / 5', C.white], ['   if all four ≡ 0 mod 5', C.vio]], 590, 238, { size: 30, a: g0 });
  /* two lanes */
  const lane = (x, name, q, prod, col, al, prodA, verdictA, pass) => {
    if (al <= 0.003) return;
    rich([[name + ' = ', C.white], [qStr(q), col]], x, 350, { size: 30, a: al });
    txt('· (1 − 2j)', x, 392, { size: 26, fam: F.math, w: 700, c: C.vio, a: al });
    cells(prod, x, 412, prodA, { c: C.white, bc: col });
    const rem = prod.map(c => mod(c, 5));
    cells(rem, x, 490, prodA, { cols: rem.map(r => (r ? C.mag : C.cyan)), bc: C.dim, size: 26, h: 50 });
    txt('mod 5', x + 4 * 102 + 8, 524, { size: 22, fam: F.mono, w: 700, c: C.dim, a: prodA });
    if (verdictA > 0.003) {
      if (pass) rich([['÷ 5 = ', C.white], ['(1, 2, 0, 0) = X', C.now], ['   PASS · 放行', C.cyan]], x, 595, { size: 30, a: verdictA });
      else rich([['remainders (0, 4, 0, 2)', C.mag], ['   SHUT · 阻塞', C.mag]], x, 595, { size: 30, a: verdictA });
    }
  };
  const l1 = a * at(S, 1, 0.6), l1p = a * Q(S, 1, 'five, ten', 0.5), l1v = a * Q(S, 1, 'the gate opens', 0.5);
  const l2 = a * at(S, 2, 0.6), l2p = a * Q(S, 2, 'minus six', 0.5), l2v = a * Q(S, 2, 'Remainders', 0.5);
  panel(140, 285, 800, 340, l1, C.cyan);
  lane(170, 'XY', XY, XY_G, C.cyan, l1, l1p, l1v, true);
  panel(980, 285, 800, 340, l2, C.mag);
  lane(1010, 'YX', YX, YX_G, C.mag, l2, l2p, l2v, false);
  if (l2v > 0.003) stamp('BLOCKED', 1610, 455, Q(S, 2, 'stays shut', 0.6), C.mag, 34, -0.08);
  /* line 3: the other gate unwinds YX */
  const l3 = a * at(S, 3, 0.6), l3v = a * Q(S, 3, 'to Y', 0.5);
  panel(980, 645, 800, 185, l3, C.vio, 'GATE 1 − 2i');
  if (l3 > 0.003) {
    rich([['YX · (1 − 2i) = (5, 0, 10, 0)', C.white]], 1010, 715, { size: 28, a: l3 });
    rich([['÷ 5 = ', C.white], ['(1, 0, 2, 0) = Y', C.now]], 1010, 762, { size: 28, a: l3v });
    txt('last in, first out · 后进先出 (MODEL)', 1765, 812, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.argued, a: a * Q(S, 3, 'last in, first out', 0.5) });
  }
  if (l3 > 0.003) txt('push Y back:  X · Y = (1, 2, 2, 4)', 170, 665, { size: 23, fam: F.math, w: 700, c: C.cyan, a: l3 });
  /* line 4: Lean */
  const l4 = a * Q(S, 4, 'Lean checks', 0.6);
  if (l4 > 0.003) {
    panel(140, 690, 800, 140, l4, C.lean);
    txt('|XY|² = |YX|² = 5 · 5', 165, 730, { size: 22, fam: F.math, w: 700, c: C.white, a: l4 });
    txt('Step XY gateUnwindY 5 X  ·  ¬ Enabled YX gateUnwindY 5', 165, 765, { size: 20, fam: F.math, w: 700, c: C.white, a: l4 });
    smLean(165, 810, 'quaternion_fractran_order_separation', l4, { size: 18 });
  }
};

/* ======================================================================= */
/*                          scene 7 · TWO BY TWO                             */
/* ======================================================================= */
SCENES.matrix = S => {
  const a = smFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [4, 'Lean checks', 'lean']]);
  /* line 0: the definitions */
  const d0 = a * at(S, 0, 0.6);
  panel(140, 180, 700, 210, d0, C.cyan, 'MAT₂(ℤ) · 二阶整数矩阵');
  if (d0 > 0.003) {
    mat(['a', 'b', 'c', 'd'], 170, 230, d0);
    rich([['tr = a + d', C.cyan]], 360, 270, { size: 32, a: d0 * Q(S, 0, 'trace', 0.5) });
    rich([['det = ad − bc', C.mag]], 360, 330, { size: 32, a: d0 * Q(S, 0, 'determinant', 0.5) });
  }
  /* line 1: A and B */
  const d1 = a * at(S, 1, 0.6);
  panel(880, 180, 900, 210, d1, C.white, 'A, B');
  if (d1 > 0.003) {
    txt('A =', 910, 290, { size: 34, fam: F.math, w: 700, c: C.white, a: d1 });
    mat(MA, 995, 230, d1);
    txt(`tr ${mTr(MA)} · det ${mDet(MA)}`, 1165, 290, { size: 24, fam: F.math, w: 700, c: C.dim, a: d1 });
    const b = d1 * Q(S, 1, 'and B', 0.5);
    txt('B =', 1340, 290, { size: 34, fam: F.math, w: 700, c: C.white, a: b });
    mat(MB, 1420, 230, b);
    txt(`tr ${mTr(MB)} · det ${mDet(MB)}`, 1595, 290, { size: 24, fam: F.math, w: 700, c: C.dim, a: b });
  }
  /* line 2: AB, BA */
  const d2 = a * at(S, 2, 0.6), d2b = a * Q(S, 2, 'determinant sixty-five', 0.5);
  panel(140, 410, 1000, 220, d2, C.cyan, 'AB ≠ BA');
  if (d2 > 0.003) {
    txt('AB =', 170, 520, { size: 32, fam: F.math, w: 700, c: C.white, a: d2 });
    mat(MAB, 275, 460, d2, { cols: [C.now, C.white, C.white, C.now] });
    txt('BA =', 580, 520, { size: 32, fam: F.math, w: 700, c: C.white, a: d2 });
    mat(MBA, 685, 460, d2, { cols: [C.now, C.white, C.white, C.now] });
    rich([['tr AB = ', C.white], ['27', C.now]], 920, 490, { size: 30, a: d2 * Q(S, 2, 'trace twenty-seven', 0.5) });
    rich([['tr BA = ', C.white], ['27', C.now]], 920, 545, { size: 30, a: d2 * Q(S, 2, 'trace twenty-seven', 0.5) });
    rich([['det AB = 170 − 105 = ', C.white], ['65', C.now], [' = 5 · 13 = det A · det B', C.white]], 170, 605, { size: 26, a: d2b });
  }
  /* line 3: Cayley–Hamilton */
  const d3 = a * at(S, 3, 0.6), d3b = a * Q(S, 3, 'zero matrix', 0.5);
  panel(1180, 410, 600, 225, d3, C.mag, 'CAYLEY–HAMILTON');
  if (d3 > 0.003) {
    txt('A² =', 1210, 512, { size: 30, fam: F.math, w: 700, c: C.white, a: d3 });
    mat(MA2, 1290, 460, d3, { size: 26, cw: 56, rh: 38 });
    txt(`${mTr(MA)}A = (${MA.slice(0, 2).map(x => mTr(MA) * x).join(' ')}; ${MA.slice(2).map(x => mTr(MA) * x).join(' ')})`, 1450, 490, { size: 22, fam: F.math, w: 700, c: C.dim, a: d3 });
    txt(`${mDet(MA)}I = (${mDet(MA)} 0; 0 ${mDet(MA)})`, 1450, 528, { size: 22, fam: F.math, w: 700, c: C.dim, a: d3 });
    rich([['A² − 6A + 5I = ', C.white]], 1210, 598, { size: 28, a: d3b });
    mat(MCH, 1450, 560, d3b, { size: 24, cw: 44, rh: 30, c: C.now, bc: C.now });
  }
  /* line 4: Lean, for every integer matrix */
  const l4 = a * Q(S, 4, 'Lean checks', 0.6);
  panel(140, 655, 1640, 175, l4, C.lean);
  if (l4 > 0.003) {
    const r1 = l4, r2 = a * Q(S, 4, 'determinants multiply', 0.5), r3 = a * Q(S, 4, 'Cayley-Hamilton holds', 0.5);
    txt('∀ A B : Mat2', 170, 700, { size: 24, fam: F.math, w: 700, c: C.white, a: l4 });
    txt('tr(AB) = tr(BA)', 170, 750, { size: 24, fam: F.math, w: 700, c: C.white, a: r1 });
    smLean(170, 800, 'trace_mul_comm', r1, { size: 18 });
    txt('det(AB) = det A · det B', 720, 750, { size: 24, fam: F.math, w: 700, c: C.white, a: r2 });
    smLean(720, 800, 'mat2_det_mul', r2, { size: 18 });
    txt('A² − tr(A)·A + det(A)·I = 0', 1250, 750, { size: 24, fam: F.math, w: 700, c: C.white, a: r3 });
    smLean(1250, 800, 'cayley_hamilton', r3, { size: 18 });
  }
};

/* ======================================================================= */
/*                                scene 8 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 255 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[5], t = sc.start + 6;
  background(t, sc, 5, 6);
  txt(DATA.film.title_zh, 560, 420, { size: 110, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('THE SPINOR', 560, 540, { size: 60, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('MACHINE', 560, 615, { size: 60, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 5 });
  txt('XY ≠ YX  ·  |XY|² = |YX|² = 25', 560, 700, { size: 32, fam: F.math, w: 700, align: 'center', c: C.white });
  cells(XY_G, 1080, 330, 1, { c: C.white, bc: C.cyan });
  cells(XY_G.map(c => mod(c, 5)), 1080, 410, 1, { cols: [C.cyan, C.cyan, C.cyan, C.cyan], bc: C.dim, size: 26, h: 50 });
  cells(YX_G, 1080, 560, 1, { c: C.white, bc: C.mag });
  cells(YX_G.map(c => mod(c, 5)), 1080, 640, 1, { cols: YX_G.map(c => (mod(c, 5) ? C.mag : C.cyan)), bc: C.dim, size: 26, h: 50 });
  txt('XY · (1 − 2j)', 1080, 315, { size: 26, fam: F.math, w: 700, c: C.cyan });
  txt('YX · (1 − 2j)', 1080, 545, { size: 26, fam: F.math, w: 700, c: C.mag });
  bloom(0.55);
  txt(`${DATA.book.code} · FILM`, 560, 780, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 5, sc);
  post(0);
};
