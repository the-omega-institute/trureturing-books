/* Film · Turn the block, read the corner · 转动方块，读出角落
   (book quantum-geometry, chapter 16.1). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     hook    a dial: a hand turned by θ casts the shadow x = cos θ on the floor (x = 0.6); the dial is a picture (argued).
     block   the signal block W(x) = [[x, i√(1−x²)], [i√(1−x²), x]] = exp(iθσ_X); its powers W^m = [[cos mθ, i sin mθ],
             [i sin mθ, cos mθ]], read at x = 0.6 for m = 0…4, beside a clock hand stepping by θ (computed; chapter 16.1).
     hand    the corner readings T_0…T_4 at x = 0.6 by the rule T_{m+2} = 2x T_{m+1} − T_m:
             1, 0.6, −0.28, −0.936, −0.8432 (computed); the knitting pattern is an analogy (argued).
     pair    the eigenvalues a = e^{iθ}, b = e^{−iθ}: ab = 1, a + b = 2x; a^m + b^m = 2 cos mθ on the real axis
             ..... NormOneTraceAddition.trace_recurrence (LEAN): in any commutative ring, ab = 1 gives
             a^{m+2} + b^{m+2} = (a + b)(a^{m+1} + b^{m+1}) − (a^m + b^m); halving the power sums is a hand step (computed).
     phases  one 2×2 block per singular value is the QSVT literature (argued); the same turns on blocks at x = 0.9,
             0.6, 0.2 read T_3 = 0.216, −0.936, −0.568 (computed); phase twists between turns, then
             ..... PhaseSynthesis.exists_phases (LEAN): degree, parity and PP# + (1 − X²)QQ# = 1 give φ₀ and a list Φ of
             length k with qspPolyW φ₀ Φ = (P, Q); with all phases zero and k = 3 the fold gives (4x³ − 3x, 4x² − 1) (computed).
     edge    the recurrence carries no matrix; existence of phases is not a solver, not uniqueness, not the shortest list;
             the "grand unification" of algorithms is a literature result (argued).

   On load, FILM.init checks DATA.lean against the two theorems and re-derives every number on screen by an
   independent route (matrix powers, cosines, complex powers, the polynomial fold of the definition). Any
   disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const CB_LEAN = {
  trace_recurrence: 'D5/S1/Recurrence/NormOneTraceAddition.trace_recurrence',
  exists_phases: 'D5/S3/ContinuousObservables/PhaseSynthesis.exists_phases'
};
const CB_X = 0.6, CB_S = 0.8, CB_TH = Math.acos(CB_X);
const CB_DEG = 180 / Math.PI;
/* T_0 … T_n at x by the recurrence */
function cbCheb(x, n) { const t = [1, x]; for (let m = 2; m <= n; m++) t.push(2 * x * t[m - 1] - t[m - 2]); return t.slice(0, n + 1); }
const CB_T = cbCheb(CB_X, 5);
const CB_SIG = [0.9, 0.6, 0.2];
/* 2×2 complex matrices as [[[re, im], [re, im]], [[re, im], [re, im]]] */
const cbMul = (A, B) => [0, 1].map(i => [0, 1].map(j => {
  let re = 0, im = 0;
  for (let k = 0; k < 2; k++) { const p = A[i][k], q = B[k][j]; re += p[0] * q[0] - p[1] * q[1]; im += p[0] * q[1] + p[1] * q[0]; }
  return [re, im];
}));
const cbW = x => { const s = Math.sqrt(1 - x * x); return [[[x, 0], [0, s]], [[0, s], [x, 0]]]; };
const cbPow = (A, m) => { let R = [[[1, 0], [0, 0]], [[0, 0], [1, 0]]]; for (let k = 0; k < m; k++) R = cbMul(R, A); return R; };
/* polynomials as coefficient arrays (index = power), complex coefficients [re, im] */
const pAdd = (p, q) => Array.from({ length: Math.max(p.length, q.length) }, (_, i) => [(p[i] || [0, 0])[0] + (q[i] || [0, 0])[0], (p[i] || [0, 0])[1] + (q[i] || [0, 0])[1]]);
const pMulX = p => [[0, 0]].concat(p);
const pScale = (p, z) => p.map(c => [c[0] * z[0] - c[1] * z[1], c[0] * z[1] + c[1] * z[0]]);
const pMul = (p, q) => { const r = Array.from({ length: p.length + q.length - 1 }, () => [0, 0]); p.forEach((a, i) => q.forEach((b, j) => { r[i + j][0] += a[0] * b[0] - a[1] * b[1]; r[i + j][1] += a[0] * b[1] + a[1] * b[0]; })); return r; };
const pConj = p => p.map(c => [c[0], -c[1]]);
const pTrim = p => { const r = p.slice(); while (r.length > 1 && Math.hypot(r[r.length - 1][0], r[r.length - 1][1]) < 1e-12) r.pop(); return r; };
/* stepW φ (R, S) = (e(φ)[X R + (X² − 1) S], e(−φ)[X S + R]) and the left fold qspPolyW of the definition */
function cbStepW(phi, R, S) {
  const e = [Math.cos(phi), Math.sin(phi)], ei = [Math.cos(phi), -Math.sin(phi)];
  return [pScale(pAdd(pMulX(R), pMul([[-1, 0], [0, 0], [1, 0]], S)), e), pScale(pAdd(pMulX(S), R), ei)];
}
function cbFold(phi0, list) { let R = [[Math.cos(phi0), Math.sin(phi0)]], S = [[0, 0]]; for (const ph of list) [R, S] = cbStepW(ph, R, S); return [pTrim(R), pTrim(S)]; }

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('chebyshev-blocks film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(CB_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(CB_LEAN).length}`);
  for (const [short, gid] of Object.entries(CB_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }
  /* 1. the readings at x = 0.6: recurrence, cosines and the corner of W^m agree */
  const shown = [1, 0.6, -0.28, -0.936, -0.8432, -0.07584];
  shown.forEach((v, m) => {
    check(near(CB_T[m], v, 1e-12), `T_${m}(0.6) = ${v}`);
    check(near(Math.cos(m * CB_TH), v, 1e-12), `cos ${m}θ = ${v}`);
    const P = cbPow(cbW(CB_X), m);
    check(near(P[0][0][0], v, 1e-12) && near(P[0][0][1], 0, 1e-12), `corner of W^${m}`);
    check(near(P[0][1][1], Math.sin(m * CB_TH), 1e-12) && near(P[0][1][0], 0, 1e-12), `off-diagonal of W^${m}`);
  });
  check(near(CB_S, Math.sqrt(1 - CB_X * CB_X)), '√(1 − 0.36) = 0.8');
  check(near(Math.sin(2 * CB_TH), 0.96) && near(Math.sin(3 * CB_TH), 0.352) && near(Math.sin(4 * CB_TH), -0.5376), 'sin mθ');
  check(Math.abs(CB_TH * CB_DEG - 53.13) < 0.005, 'θ ≈ 53.13°');
  check(near(1.2 * -0.28 - 0.6, -0.936) && near(1.2 * -0.936 + 0.28, -0.8432), 'the two lines of arithmetic');
  /* 2. the eigenvalues: product 1, sum 2x, power sums 2 cos mθ; the ring identity on random complex pairs */
  for (let m = 0; m <= 6; m++) {
    const am = [Math.cos(m * CB_TH), Math.sin(m * CB_TH)], bm = [Math.cos(m * CB_TH), -Math.sin(m * CB_TH)];
    check(near(am[0] + bm[0], 2 * Math.cos(m * CB_TH), 1e-12) && near(am[1] + bm[1], 0), `a^${m} + b^${m}`);
    if (m <= 5) check(near(am[0] + bm[0], 2 * CB_T[m], 1e-12), `a^${m} + b^${m} = 2T_${m}`);
  }
  for (let k = 0; k < 40; k++) {
    const a = [3 * rnd(k, 1) - 1.5, 3 * rnd(k, 2) - 1.5], n2 = a[0] * a[0] + a[1] * a[1], b = [a[0] / n2, -a[1] / n2];
    const pw = (z, m) => { let r = [1, 0]; for (let i = 0; i < m; i++) r = [r[0] * z[0] - r[1] * z[1], r[0] * z[1] + r[1] * z[0]]; return r; };
    const m = k % 6, s = j => [pw(a, j)[0] + pw(b, j)[0], pw(a, j)[1] + pw(b, j)[1]], ab = [a[0] + b[0], a[1] + b[1]];
    const rhs = [ab[0] * s(m + 1)[0] - ab[1] * s(m + 1)[1] - s(m)[0], ab[0] * s(m + 1)[1] + ab[1] * s(m + 1)[0] - s(m)[1]];
    check(near(s(m + 2)[0], rhs[0], 1e-8) && near(s(m + 2)[1], rhs[1], 1e-8), `ring identity ${k}`);
  }
  /* 3. one block per singular value: T_3 at 0.9, 0.6, 0.2 */
  const t3 = [0.216, -0.936, -0.568];
  CB_SIG.forEach((x, j) => { check(near(cbCheb(x, 3)[3], t3[j], 1e-12) && near(cbPow(cbW(x), 3)[0][0][0], t3[j], 1e-12), `T_3(${x})`); });
  /* 4. the fold of the definition with all phases zero, k = 3: (4x³ − 3x, 4x² − 1), and its balance */
  const [P, Qp] = cbFold(0, [0, 0, 0]);
  const want = [[0, -3, 0, 4], [-1, 0, 4]];
  check(P.length === 4 && P.every((c, i) => near(c[0], want[0][i]) && near(c[1], 0)), 'P = 4x³ − 3x');
  check(Qp.length === 3 && Qp.every((c, i) => near(c[0], want[1][i]) && near(c[1], 0)), 'Q = 4x² − 1');
  const bal = pTrim(pAdd(pMul(P, pConj(P)), pMul(pMul([[1, 0], [0, 0], [-1, 0]], Qp), pConj(Qp))));
  check(bal.length === 1 && near(bal[0][0], 1) && near(bal[0][1], 0), 'PP# + (1 − X²)QQ# = 1');
  /* the fold with nonzero phases still balances (a sanity check of the picture, not of the theorem) */
  const [P2, Q2] = cbFold(0.3, [0.7, -1.1, 0.4]);
  const bal2 = pTrim(pAdd(pMul(P2, pConj(P2)), pMul(pMul([[1, 0], [0, 0], [-1, 0]], Q2), pConj(Q2))));
  check(bal2.length === 1 && near(bal2[0][0], 1, 1e-9), 'balance with nonzero phases');
});
Object.assign(FILM.speed, { hook: 0.02, block: 0.014, hand: 0.014, pair: 0.016, phases: 0.018, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const cbFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const cbNum = (v, n = 2) => (v < -0.5 * Math.pow(10, -n) ? '−' : '') + Math.abs(v).toFixed(n);
/* shortest decimal that is exact for the values on screen */
const cbDec = v => { const s = (Math.round(Math.abs(v) * 1e6) / 1e6).toString(); return (v < -1e-9 ? '−' : '') + s; };
function cbRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const CB_MISSING = new Set();
function cbLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!CB_MISSING.has(gid)) { CB_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a small violet tag that says "this is a picture / literature", in both languages */
function cbTag(x, y, en, zh, a, o = {}) {
  if (a <= 0.003) return;
  txt(en, x, y, { size: o.size || 18, fam: F.mono, w: 700, c: C.argued, a, align: o.align });
  txt(zh, x, y + (o.size || 18) + 8, { size: (o.size || 18) + 1, fam: F.zh, w: 700, c: C.argued, a, align: o.align });
}
/* an arc of angle from a0 to a1 (radians, counter-clockwise on screen) */
function cbArc(O, r, a0, a1, col, a, lw = 3) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw;
  ctx.beginPath(); ctx.arc(O[0], O[1], r, -a0, -a1, a1 > a0); ctx.stroke(); ctx.restore();
}
/* a dial: ring, floor line, hand at angle ang, shadow on the floor (cyan) */
function cbDial(O, R, ang, a, o = {}) {
  if (a <= 0.003) return;
  ring(O[0], O[1], R, C.dim, a * 0.7, 2);
  for (let k = 0; k < 12; k++) { const t = k * TAU / 12; line(O[0] + 0.92 * R * Math.cos(t), O[1] - 0.92 * R * Math.sin(t), O[0] + R * Math.cos(t), O[1] - R * Math.sin(t), C.dim, a * 0.6, 2); }
  line(O[0] - R - 40, O[1], O[0] + R + 40, O[1], C.white, a * 0.35, 1.5);
  const tip = [O[0] + R * Math.cos(ang), O[1] - R * Math.sin(ang)];
  if (o.shadow !== false) {
    dashed(tip[0], tip[1], tip[0], O[1], C.white, a * 0.4, 1.5);
    line(O[0], O[1], tip[0], O[1], C.cyan, a * (o.shadow == null ? 1 : o.shadow), 9);
  }
  if (o.arc !== false && Math.abs(ang) > 0.02) cbArc(O, R * 0.28, 0, ang, C.vio, a, 3);
  arrow(O[0], O[1], tip[0], tip[1], o.col || C.now, a, o.lw || 6);
  dot(O[0], O[1], 9, 'w', a);
  return tip;
}
/* a 2×2 matrix with brackets; cells: [[s, col], …] row-major */
function cbMatrix(x, y, cw, ch, cells, a, o = {}) {
  if (a <= 0.003) return;
  const w = 2 * cw, h = 2 * ch, k = 22;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = C.white; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x + k, y); ctx.lineTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + k, y + h); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + w - k, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w - k, y + h); ctx.stroke();
  ctx.restore();
  if (o.corner) { box(x + 10, y + 8, cw - 20, ch - 16, C.cyan, a * o.corner, 2, rgba(C.cyan, 0.10)); }
  cells.forEach(([s, col, al], i) => {
    const cx = x + (i % 2 + 0.5) * cw, cy = y + (Math.floor(i / 2) + 0.5) * ch;
    txt(s, cx, cy + (o.size || 34) * 0.36, { size: o.size || 34, fam: F.math, w: 700, align: 'center', c: col, a: a * (al == null ? 1 : al) });
  });
}
/* opening title */
function cbTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('TURN THE BLOCK, READ THE CORNER', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('DIAL · BLOCK · RECURRENCE · EIGENVALUES · PHASES · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                            scene 1 · A NUMBER AS A TURN                   */
/* ======================================================================= */
const HK_O = [640, 600], HK_R = 300;
SCENES.hook = S => {
  const u = S.u;
  cbTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const turn = ease(Q(S, 1, 'Turn its hand', 1.6));
  const again = ease(Q(S, 2, 'turning the same dial again', 1.6));
  const ang = CB_TH * (turn + again);
  const sh = Q(S, 1, 'shadow on the floor', 0.6);
  cbDial(HK_O, HK_R, ang, a, { shadow: sh, arc: false });
  cbArc(HK_O, HK_R * 0.28, 0, Math.min(ang, CB_TH), C.vio, a, 3);
  if (ang > CB_TH + 0.01) cbArc(HK_O, HK_R * 0.36, CB_TH, ang, C.vio, a, 3);
  /* the first turn stays drawn as a ghost once the dial turns again */
  if (again > 0.01) arrow(HK_O[0], HK_O[1], HK_O[0] + HK_R * Math.cos(CB_TH), HK_O[1] - HK_R * Math.sin(CB_TH), C.white, a * 0.35 * again, 3);
  const ta = Math.min(ang, CB_TH) / 2;
  txt('θ', HK_O[0] + 112 * Math.cos(ta) + 4, HK_O[1] - 112 * Math.sin(ta) + 10, { size: 30, fam: F.math, w: 700, c: C.vio, a: a * clamp(turn * 3) });
  if (ang > CB_TH + 0.2) txt('θ', HK_O[0] + 175 * Math.cos((CB_TH + ang) / 2) - 14, HK_O[1] - 175 * Math.sin((CB_TH + ang) / 2) + 10, { size: 30, fam: F.math, w: 700, align: 'center', c: C.vio, a: a * again });
  if (again > 0.01) {
    line(HK_O[0], HK_O[1] + 16, HK_O[0] + HK_R * CB_X, HK_O[1] + 16, C.dim, a * again, 4);
    txt('x = 0.6', HK_O[0] + HK_R * CB_X + 14, HK_O[1] + 24, { size: 24, fam: F.math, w: 700, c: C.dim, a: a * again });
  }
  if (sh > 0.01) {
    const lx = again > 0.5 ? 'cos 2θ = −0.28' : 'x';
    const la2 = again > 0.5 ? clamp((again - 0.5) * 4) : clamp((0.5 - again) * 4) * clamp(Math.abs(Math.cos(ang)) * 4);
    txt(lx, HK_O[0] + HK_R * Math.cos(ang) / 2, HK_O[1] + 60, { size: 32, fam: F.math, w: 700, align: 'center', c: C.cyan, a: a * sh * (again > 0 ? la2 : clamp(Math.abs(Math.cos(ang)) * 4)) });
  }
  txt('−1', HK_O[0] - HK_R - 40, HK_O[1] + 40, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a * sh });
  txt('1', HK_O[0] + HK_R + 34, HK_O[1] + 40, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a * sh });
  cbTag(130, 240, 'a dial: a picture of the turn', '表盘：转动的比方', a * clamp(turn * 2));
  /* the readout */
  panel(1160, 230, 640, 420, a, C.cyan, 'A NUMBER AS A TURN · 数藏在转动里');
  cbRich([['x = cos θ', C.cyan]], 1190, 310, { size: 38, a: a * sh });
  cbRich([['−1 ≤ x ≤ 1', C.white]], 1190, 368, { size: 30, a: a * sh });
  cbRich([['here · 这里  x = 0.6,  θ = ', C.white], [`${cbNum(CB_TH * CB_DEG)}°`, C.vio]], 1190, 424, { size: 26, a: a * sh, fam: F.zh });
  const qa = a * at(S, 2, 0.6);
  txt('only move: turn the same dial again', 1190, 512, { size: 24, fam: F.mono, w: 700, c: C.now, a: qa });
  txt('唯一一招：把同一个表盘再转一次', 1190, 550, { size: 26, fam: F.zh, w: 700, c: C.now, a: qa });
  txt('what can you compute? · 能算出什么？', 1190, 610, { size: 26, fam: F.zh, w: 700, c: C.white, a: a * Q(S, 2, 'What can you compute', 0.6) });
};

/* ======================================================================= */
/*                              scene 2 · THE 2×2 BLOCK                      */
/* ======================================================================= */
const BK_O = [1440, 500], BK_R = 240;
/* the tick count: 0 → 4 over lines 1 and 2, one tick at a time */
function bkTicks(S) {
  const s0 = lineAt(S, 1).s, s1 = lineAt(S, 2).e;
  const p = clamp((S.u - s0 - 0.6) / Math.max(1, s1 - s0 - 1.2)) * 4;
  const m = Math.min(4, Math.floor(p)), f = m >= 4 ? 0 : ease(clamp((p - m) * 2.2));
  return { m, f, v: m + f };
}
SCENES.block = S => {
  const u = S.u, a = cbFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const tk = bkTicks(S), m = Math.round(tk.v);
  const showM = at(S, 1, 0.5);
  /* the matrix: W(x) on line 0, W(x)^m from line 1 */
  const c = Math.cos(m * CB_TH), s = Math.sin(m * CB_TH);
  const cells = showM > 0.5
    ? [[cbDec(c), C.cyan], [`${cbDec(s)}i`, C.mag], [`${cbDec(s)}i`, C.mag], [cbDec(c), C.white, 0.55]]
    : [['0.6', C.cyan], ['0.8i', C.mag], ['0.8i', C.mag], ['0.6', C.white, 0.55]];
  txt(showM > 0.5 ? 'W(0.6)' : 'W(0.6)', 200, 262, { size: 40, fam: F.math, w: 700, c: C.white, a });
  if (showM > 0.5) txt(`${m}`, 200 + tw('W(0.6)', 40, F.math, 700) + 4, 238, { size: 30, fam: F.math, w: 700, c: C.now, a });
  cbMatrix(200, 300, 270, 125, cells, a, { corner: Q(S, 0, 'Its corner', 0.6), size: 38 });
  txt('← corner · 角落', 470, 262, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: a * Q(S, 0, 'Its corner', 0.6) });
  /* the symbolic block */
  const sa = a * (1 - at(S, 3, 0.5));
  cbRich([['W(x) = ', C.white], ['[ x', C.cyan], ['   i√(1−x²) ; ', C.mag], ['i√(1−x²)', C.mag], ['   x ]', C.white]], 200, 640, { size: 28, a: sa });
  cbRich([['W(x)ᵐ = [ ', C.white], ['cos mθ', C.cyan], ['   i sin mθ ; ', C.mag], ['i sin mθ', C.mag], ['   cos mθ ]', C.white]], 200, 700, { size: 28, a: sa * Q(S, 2, 'corner reads the cosine', 0.6) });
  txt('x = 0.6 = cos θ,  √(1 − 0.36) = 0.8', 200, 760, { size: 22, fam: F.mono, w: 700, c: C.dim, a: sa });
  /* line 3: the polynomial */
  const pa = a * at(S, 3, 0.6);
  if (pa > 0.003) {
    panel(170, 580, 820, 230, pa, C.cyan, 'CHEBYSHEV · 切比雪夫多项式');
    cbRich([['Tₘ(x) = cos(m · arccos x)', C.cyan]], 200, 650, { size: 32, a: pa });
    cbRich([['T₂ = 2x² − 1', C.white]], 200, 710, { size: 28, a: pa * Q(S, 3, 'polynomial', 0.6) });
    cbRich([['T₃ = 4x³ − 3x', C.white]], 520, 710, { size: 28, a: pa * Q(S, 3, 'polynomial', 0.6, 0.4) });
    txt('a polynomial in x · 关于 x 的多项式', 200, 770, { size: 22, fam: F.zh, w: 700, c: C.dim, a: pa });
  }
  /* the clock: hand at tk.v θ, past ticks as violet dots */
  const ca = a * clamp(at(S, 1, 0.6) + 0.35 * at(S, 0, 0.6));
  const tip = cbDial(BK_O, BK_R, tk.v * CB_TH, ca, { shadow: 1, arc: false });
  for (let k = 1; k <= tk.m + (tk.f > 0.5 ? 1 : 0); k++) {
    const t = k * CB_TH;
    dot(BK_O[0] + BK_R * Math.cos(t), BK_O[1] - BK_R * Math.sin(t), 11, 'v', ca);
    if (k <= 4) cbArc(BK_O, BK_R * 0.3, (k - 1) * CB_TH + 0.04, Math.min(k, tk.v) * CB_TH - 0.04, C.vio, ca * 0.9, 4);
  }
  if (ca > 0.01) {
    txt(`m = ${m}`, BK_O[0] - BK_R, BK_O[1] - BK_R - 30, { size: 34, fam: F.mono, w: 700, c: C.now, a: ca });
    txt(`angle · 角度 ${m}θ = ${cbNum(m * CB_TH * CB_DEG, 1)}°`, BK_O[0] - BK_R, BK_O[1] + BK_R + 70, { size: 24, fam: F.zh, w: 700, c: C.vio, a: ca });
    cbRich([['corner · 角落  cos ', C.white], [`${m}θ`, C.vio], [' = ', C.white], [cbDec(c), C.cyan]], BK_O[0] - BK_R, BK_O[1] + BK_R + 116, { size: 28, a: ca * Q(S, 2, 'corner reads', 0.6), fam: F.zh });
    cbTag(BK_O[0] + BK_R - 10, BK_O[1] - BK_R - 30, 'clock hand: a picture', '时针：比方', ca * Q(S, 1, 'like a clock hand', 0.6), { size: 17, align: 'right' });
  }
};

/* ======================================================================= */
/*                              scene 3 · COUNT BY HAND                      */
/* ======================================================================= */
const HD = { x0: 220, dx: 165, y0: 520, k: 210, bw: 86 };
SCENES.hand = S => {
  const u = S.u, a = cbFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, null, 'argued']]);
  const appear = [
    Q(S, 0, 'reads one', 0.5), Q(S, 0, 'one, zero point six', 0.5), Q(S, 0, 'minus zero point two eight', 0.5),
    Q(S, 2, 'you get minus', 0.5), at(S, 3, 0.5, 0.6)
  ];
  let cur = 0;
  appear.forEach((p, m) => { if (p > 0.02) cur = m; });
  /* the axis */
  line(HD.x0 - 70, HD.y0, HD.x0 + 4 * HD.dx + 90, HD.y0, C.white, a * 0.5, 1.5);
  for (const v of [1, -1]) { dashed(HD.x0 - 70, HD.y0 - v * HD.k, HD.x0 + 4 * HD.dx + 90, HD.y0 - v * HD.k, C.dim, a * 0.35, 1); txt(v > 0 ? '1' : '−1', HD.x0 - 82, HD.y0 - v * HD.k + 8, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.dim, a }); }
  CB_T.slice(0, 5).forEach((v, m) => {
    const p = appear[m], ba = a * p;
    const cx = HD.x0 + m * HD.dx, h = HD.k * v * eo(p), col = m === cur ? C.now : C.cyan;
    if (ba > 0.003) {
      fillBox(cx - HD.bw / 2, Math.min(HD.y0, HD.y0 - h), HD.bw, Math.abs(h), col, ba * 0.5);
      box(cx - HD.bw / 2, Math.min(HD.y0, HD.y0 - h), HD.bw, Math.max(2, Math.abs(h)), col, ba, 1.6);
      txt(cbDec(v), cx, v >= 0 ? HD.y0 - h - 16 : HD.y0 - h + 36, { size: 26, fam: F.mono, w: 700, align: 'center', c: col, a: ba });
    }
    txt(`T${'₀₁₂₃₄'[m]}`, cx, HD.y0 + (v >= 0 ? 44 : -18), { size: 28, fam: F.math, w: 700, align: 'center', c: C.white, a: a * clamp(p * 3) });
  });
  /* line 1: the rule as two arrows into T₂ */
  const ra = a * Q(S, 1, 'Each new reading', 0.6) * (1 - at(S, 2, 0.6, 1.2));
  if (ra > 0.003) {
    const xt = HD.x0 + 2 * HD.dx;
    for (const [m, lab, col, lx, ly] of [[1, '× 2x', C.cyan, 452, 606], [0, '−', C.mag, 300, 684]]) {
      const xs = HD.x0 + m * HD.dx;
      ctx.save(); ctx.globalAlpha = ra; ctx.strokeStyle = col; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(xs, HD.y0 + 80); ctx.quadraticCurveTo((xs + xt) / 2, HD.y0 + (m ? 170 : 200), xt - 10, HD.y0 + 120); ctx.stroke(); ctx.restore();
      txt(lab, lx, ly, { size: m ? 28 : 36, fam: F.math, w: 700, align: 'center', c: col, a: ra });
    }
  }
  chip(250, 210, 200, 56, 'x = 0.6', C.cyan, a * at(S, 0, 0.5), 30, F.math);
  /* the ledger */
  panel(1150, 200, 670, 560, a, C.cyan, 'THE LEDGER · 账本');
  cbRich([['Tₘ₊₂ = ', C.white], ['2x', C.now], [' · Tₘ₊₁ − Tₘ', C.white]], 1180, 280, { size: 34, a: a * Q(S, 1, 'Each new reading', 0.6) });
  txt('no angle needed · 用不着角度', 1180, 324, { size: 22, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 1, 'never need the angle', 0.6) });
  cbRich([['2x = ', C.white], ['1.2', C.now]], 1180, 384, { size: 30, a: a * Q(S, 1, 'two x times', 0.6) });
  cbRich([['T₂ = 1.2 × 0.6 − 1 = ', C.white], ['−0.28', C.cyan]], 1180, 444, { size: 28, a: a * Q(S, 1, 'minus the one before', 0.6) });
  cbRich([['T₃ = 1.2 × (−0.28) − 0.6 = ', C.white], ['−0.936', C.cyan]], 1180, 500, { size: 28, a: a * Q(S, 2, 'Run the rule', 0.6) });
  cbRich([['T₄ = 1.2 × (−0.936) + 0.28 = ', C.white], ['−0.8432', C.cyan]], 1180, 556, { size: 26, a: a * at(S, 3, 0.6, 0.6) });
  txt(`check · 对照  cos 3θ = ${cbDec(Math.cos(3 * CB_TH))}`, 1180, 612, { size: 22, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 2, 'you get minus', 0.6) });
  cbTag(1180, 680, 'knitting pattern: an analogy, not a proof', '织毛衣的花样：比方，不是证明', a * at(S, 3, 0.6));
  stamp('−0.936', 1640, 500, Q(S, 2, 'you get minus', 0.5, 0.4) * (1 - at(S, 3, 0.5)), C.cyan, 26, -0.06);
};

/* ======================================================================= */
/*                            scene 4 · WHY THE RULE HOLDS                   */
/* ======================================================================= */
const PR_O = [580, 520], PR_R = 200;
SCENES.pair = S => {
  const u = S.u, a = cbFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'computed']]);
  const P = z => [PR_O[0] + PR_R * z[0], PR_O[1] - PR_R * z[1]];
  /* axes and unit circle */
  line(PR_O[0] - PR_R - 70, PR_O[1], PR_O[0] + 1.4 * PR_R + 40, PR_O[1], C.white, a * 0.5, 1.5);
  line(PR_O[0], PR_O[1] - PR_R - 50, PR_O[0], PR_O[1] + PR_R + 50, C.white, a * 0.3, 1.5);
  ring(PR_O[0], PR_O[1], PR_R, C.dim, a * 0.8, 2);
  txt('1', P([1, 0])[0] - 26, PR_O[1] - 12, { size: 22, fam: F.mono, w: 700, c: C.dim, a });
  txt('Re', PR_O[0] + 1.4 * PR_R + 30, PR_O[1] - 14, { size: 20, fam: F.mono, w: 700, c: C.dim, a });
  txt('Im', PR_O[0] + 12, PR_O[1] - PR_R - 30, { size: 20, fam: F.mono, w: 700, c: C.dim, a });
  /* line 3: powers a^m, b^m step around; before it, m = 1 */
  const pp = at(S, 3, 0.5) > 0 ? clamp((u - lineAt(S, 3).s - 0.4) / Math.max(1, lineAt(S, 3).e - lineAt(S, 3).s - 1.2)) * 4 : 0;
  const pk = Math.min(3, Math.floor(pp)), pf = pp >= 4 ? 1 : ease(clamp((pp - pk) * 2.2));
  const mv = 1 + (at(S, 3, 0.5) > 0 ? pk + pf : 0), mi = Math.round(mv);
  /* labels with numbers only while the hands rest on a whole step */
  const rest = at(S, 3, 0.5) > 0 ? clamp((Math.abs(pf - 0.5) - 0.38) / 0.12) : 1;
  const ang = (at(S, 3, 0.5) > 0 ? mv : 1) * CB_TH;
  const A = [Math.cos(ang), Math.sin(ang)], B = [Math.cos(ang), -Math.sin(ang)];
  const pa = P(A), pb = P(B);
  cbArc(PR_O, 60, 0, ang, C.vio, a, 3); cbArc(PR_O, 60, 0, -ang, C.vio, a, 3);
  arrow(PR_O[0], PR_O[1], pa[0], pa[1], C.now, a, 4);
  arrow(PR_O[0], PR_O[1], pb[0], pb[1], C.now, a * 0.75, 4);
  dot(pa[0], pa[1], 12, 'g', a); dot(pb[0], pb[1], 12, 'g', a);
  const lab = at(S, 3, 0.5) > 0 ? [`a${'⁰¹²³⁴⁵'[mi]}`, `b${'⁰¹²³⁴⁵'[mi]}`] : ['a = e^(iθ)', 'b = e^(−iθ)'];
  txt(lab[0], pa[0] + 18, pa[1] - 10, { size: 28, fam: F.math, w: 700, c: C.now, a: a * rest });
  txt(lab[1], pb[0] + 18, pb[1] + 30, { size: 28, fam: F.math, w: 700, c: C.now, a: a * 0.85 * rest });
  /* line 1: the sum (a parallelogram closing on the real axis) */
  const sa = a * Q(S, 1, 'their sum is two x', 0.8);
  if (sa > 0.003) {
    const ps = P([A[0] + B[0], 0]);
    dashed(pa[0], pa[1], ps[0], ps[1], C.white, sa * 0.5, 1.5); dashed(pb[0], pb[1], ps[0], ps[1], C.white, sa * 0.5, 1.5);
    line(PR_O[0], PR_O[1], ps[0], ps[1], C.cyan, sa, 8);
    dot(ps[0], ps[1], 12, 'c', sa);
    const sl = at(S, 3, 0.5) > 0 ? `a${'⁰¹²³⁴⁵'[mi]} + b${'⁰¹²³⁴⁵'[mi]} = ${cbDec(2 * Math.cos(mi * CB_TH))}` : 'a + b = 2x = 1.2';
    txt(sl, PR_O[0], PR_O[1] + PR_R + 70, { size: 28, fam: F.math, w: 700, align: 'center', c: C.cyan, a: sa * rest });
  }
  /* readout */
  panel(1000, 190, 820, 210, a, C.cyan, 'THE EIGENVALUES · 特征值');
  cbRich([['a · b = 1', C.white]], 1030, 260, { size: 34, a: a * Q(S, 1, 'Their product is one', 0.6) });
  cbRich([['det W = 1', C.dim]], 1360, 260, { size: 26, a: a * Q(S, 1, 'Their product is one', 0.6) });
  cbRich([['a + b = ', C.white], ['2x', C.cyan]], 1030, 318, { size: 34, a: a * Q(S, 1, 'their sum is two x', 0.6) });
  cbRich([['tr W = 2x', C.dim]], 1360, 318, { size: 26, a: a * Q(S, 1, 'their sum is two x', 0.6) });
  txt('turn forward × turn back = no turn · 正转 × 倒转 = 不转', 1030, 370, { size: 21, fam: F.zh, w: 700, c: C.argued, a: a * Q(S, 1, 'turn forward', 0.6) });
  /* line 2: Lean */
  const la = a * Q(S, 2, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1000, 420, 820, 230, la, C.lean, 'ANY COMMUTATIVE RING · 任意交换环');
    txt('a, b ∈ R,  a · b = 1,  m ∈ ℕ', 1030, 486, { size: 26, fam: F.math, w: 700, c: C.white, a: la });
    cbRich([['aᵐ⁺² + bᵐ⁺² = (a + b)(aᵐ⁺¹ + bᵐ⁺¹) − (aᵐ + bᵐ)', C.white]], 1030, 546, { size: 28, a: la });
    cbLean(1030, 612, CB_LEAN.trace_recurrence, la, { size: 19 });
  }
  /* line 3: halving */
  const ha = a * at(S, 3, 0.6);
  if (ha > 0.003) {
    panel(1000, 670, 820, 150, ha, C.cyan, 'HALVE · 除以 2');
    cbRich([['aᵐ + bᵐ = 2 cos mθ = 2Tₘ', C.cyan]], 1030, 730, { size: 28, a: ha });
    cbRich([['⟹  Tₘ₊₂ = 2x · Tₘ₊₁ − Tₘ', C.white]], 1030, 786, { size: 28, a: ha * Q(S, 3, 'Chebyshev rule', 0.6) });
  }
  stamp('a · b = 1', 330, 215, Q(S, 2, 'Lean checks', 0.5, 0.6) * (1 - at(S, 3, 0.5)), C.white, 28, -0.06);
  const ma = a * Q(S, 3, 'The angle was scaffolding', 0.8);
  if (ma > 0.003) {
    txt('the angle was scaffolding;', 150, 205, { size: 26, fam: F.disp, w: 700, c: C.white, a: ma });
    txt('ab = 1 is the building', 150, 241, { size: 26, fam: F.disp, w: 700, c: C.white, a: ma });
  }
};

/* ======================================================================= */
/*                          scene 5 · PHASES BETWEEN TURNS                   */
/* ======================================================================= */
SCENES.phases = S => {
  const u = S.u, a = cbFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [2, null, 'argued'], [3, 'Lean checks', 'lean']]);
  /* three blocks, one per singular value; the same turns, m = 0 → 3 on line 1 */
  const tp = clamp((u - lineAt(S, 1).s - 0.3) / Math.max(1, lineAt(S, 1).e - lineAt(S, 1).s - 0.8)) * 3;
  const mi = Math.min(3, Math.floor(tp + 0.5));
  CB_SIG.forEach((x, j) => {
    const ra = a * at(S, 0, 0.5, 0.2 + 0.6 * j);
    if (ra <= 0.003) return;
    const y = 220 + j * 200, th = Math.acos(x), O = [240, y + 80];
    cbDial(O, 70, th * tp, ra, { shadow: 1, arc: false, lw: 4 });
    const c = Math.cos(mi * th);
    cbMatrix(370, y + 10, 150, 70, [[cbDec(c), C.cyan], ['·', C.dim], ['·', C.dim], ['·', C.dim]], ra, { corner: 1, size: 28 });
    txt(`σ${'₁₂₃'[j]} = ${x}`, 700, y + 60, { size: 30, fam: F.math, w: 700, c: C.white, a: ra });
    txt(`T${'₀₁₂₃'[mi]}(${x}) = ${cbDec(c)}`, 700, y + 104, { size: 26, fam: F.math, w: 700, c: C.cyan, a: ra * at(S, 1, 0.5) });
  });
  cbTag(170, 840 - 40, 'one block per singular value: QSVT literature, not formalized here', '每个奇异值一块：文献结果，本书未形式化', a * Q(S, 0, 'QSVT literature', 0.6), { size: 20 });
  /* line 2: the strip D(φ₀) · W D(φ₁) · W D(φ₂) · W D(φ₃) */
  const sa = a * at(S, 2, 0.6);
  if (sa > 0.003) {
    panel(1000, 190, 820, 190, sa, C.vio, 'PHASES BETWEEN TURNS · 转动之间插相位');
    const items = ['φ₀', 'W', 'φ₁', 'W', 'φ₂', 'W', 'φ₃'];
    items.forEach((s, i) => {
      const x = 1040 + i * 108, isW = s === 'W', ia = sa * Q(S, 2, 'phase twist', 0.4, 0.15 * i);
      box(x, 240, 86, 70, isW ? C.cyan : C.vio, ia, 2, rgba(isW ? C.cyan : C.vio, 0.14));
      txt(s, x + 43, 287, { size: 32, fam: F.math, w: 700, align: 'center', c: isW ? C.cyan : C.vio, a: ia });
    });
    txt('φ = diag(e^(iφ), e^(−iφ)) · a picture of the order · 示意', 1040, 354, { size: 21, fam: F.zh, w: 700, c: C.argued, a: sa });
  }
  /* line 3: Lean */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1000, 400, 820, 420, la, C.lean, 'EXACT PHASES EXIST · 相位存在');
    const rows = [
      ['deg P ≤ k,   deg Q ≤ k − 1,   k = 0 ⟹ Q = 0', 'right degree', 466],
      ['P has the parity of k,  Q of k − 1', 'parity', 516],
      ['P P# + (1 − x²) Q Q# = 1', 'balance', 566]
    ];
    rows.forEach(([s, ph, y]) => txt(s, 1030, y, { size: 25, fam: F.math, w: 700, c: C.white, a: la * Q(S, 3, ph, 0.5) }));
    cbRich([['⟹ ∃ φ₀, Φ:  ', C.lean], ['length Φ = k,  ', C.white], ['fold(φ₀, Φ) = (P, Q)', C.white]], 1030, 626, { size: 26, a: la * Q(S, 3, 'phases exist', 0.5) });
    cbLean(1030, 686, CB_LEAN.exists_phases, la * Q(S, 3, 'phases exist', 0.5), { size: 19 });
    txt('all φ = 0, k = 3:  P = 4x³ − 3x = T₃,  Q = 4x² − 1', 1030, 750, { size: 24, fam: F.math, w: 700, c: C.cyan, a: la * Q(S, 3, 'phases exist', 0.5, 0.6) });
    txt('相位全为 0 · computed here · 屏幕上的计算', 1030, 790, { size: 22, fam: F.zh, w: 700, c: C.dim, a: la * Q(S, 3, 'phases exist', 0.5, 0.6) });
  }
};

/* ======================================================================= */
/*                         scene 6 · WHAT IT DOES NOT SAY                    */
/* ======================================================================= */
SCENES.edge = S => {
  const a = cbFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const rows = [
    { k: 0, col: C.cyan, en: 'ab = 1 in a ring: no matrix in the theorem', zh: '定理里没有矩阵；接到方块上是一步手算', note: 'hand calculation · 手算桥接' },
    { k: 1, col: C.cyan, lean: 'phases exist: φ₀ plus exactly k more', zh: '只说存在：不给求法，不说唯一，不说最短', note: 'existence, not an algorithm · 存在性不是算法' },
    { k: 2, col: C.argued, en: 'search, filtering, inversion as polynomials', zh: '把各种算法统一成多项式变换', note: 'literature result, not formalized here · 文献结果，本书未形式化' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 200 + i * 210;
    panel(360, y, 1200, 180, ra, rw.col);
    txt(rw.en || rw.lean, 390, y + 58, { size: 30, fam: F.math, w: 700, c: rw.lean ? C.lean : rw.col, a: ra });
    txt(rw.zh, 390, y + 104, { size: 28, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 390, y + 148, { size: 20, fam: F.zh, w: 700, c: rw.col === C.argued ? C.argued : C.dim, a: ra * 0.95 });
  });
};

/* ======================================================================= */
/*                                scene 7 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 290 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[1], t = sc.end - 1.0;
  background(t, sc, 1, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.12, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  const O = [470, 600], R = 300;
  cbDial(O, R, 3 * CB_TH, 1, { shadow: 1, arc: false });
  for (let k = 1; k <= 3; k++) { dot(O[0] + R * Math.cos(k * CB_TH), O[1] - R * Math.sin(k * CB_TH), 12, 'v', 1); cbArc(O, R * (0.18 + 0.05 * k), (k - 1) * CB_TH, k * CB_TH, C.vio, 0.9, 3); }
  txt('cos 3θ = −0.936', O[0] - 120, O[1] + 70, { size: 30, fam: F.math, w: 700, align: 'center', c: C.cyan });
  txt(DATA.film.title_zh, 1340, 400, { size: 80, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('TURN THE BLOCK,', 1340, 500, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.vio, ab: 3, ls: 5 });
  txt('READ THE CORNER', 1340, 560, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 2, ls: 5 });
  cbRich([['Tₘ₊₂ = 2x · Tₘ₊₁ − Tₘ', C.white]], 1340, 660, { size: 42, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1340, 750, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 1, sc);
  post(0);
};
