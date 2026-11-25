/* Film · X and Z share no answer · X 与 Z 没有共同答案
   (book quantum-geometry, part I: chapter 1, §1.2). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     sheet    an answer sheet χ that writes a number against every 2×2 complex matrix and keeps χ(I) = 1, sums,
              multiples and products (the analogy of the chapter's "全能属性账本"; argued). The question "why before
              anyone asks?" is the chapter's genealogical prompt (argued).
     rules    X = [[0,1],[1,0]], Z = [[1,0],[0,−1]]: X² = Z² = I, ZX = [[0,1],[−1,0]] = −XZ (computed)
              ..... FiniteDimensional.qubit_weyl_star (LEAN); χ(X)² = χ(X²) = χ(I) = 1, so χ(X), χ(Z) ∈ {+1, −1}.
     table    numbers commute: χ(X)χ(Z) = χ(Z)χ(X) = χ(ZX) = χ(−XZ) = −χ(X)χ(Z); the four sign rows (±1, ±1) give
              xz = ±1 ≠ −xz; only 0 equals its negative and 0² ≠ 1 (computed).
     theorem  no unital ℂ-algebra map M₂(ℂ) → ℂ: IsEmpty (QubitMatrix →ₐ[ℂ] ℂ)
              ..... FiniteDimensional.qubit_matrix_algebra_has_no_character (LEAN).
     sphere   Z's eigenvectors are the multiples of (1, 0) and (0, 1); X(1, 0) = (0, 1), X(0, 1) = (1, 0) (computed)
              ..... QubitWitnesses.pauli_observables_have_no_common_eigenvector (LEAN): Xψ = xψ and Zψ = zψ force ψ = 0.
              On the Bloch sphere ρ = ½(I + B(a)) the Z eigenstates sit at ±e₃, the X eigenstates at ±e₁ (computed from
              the Bloch formula of §1.3); ψ = 0 has no Bloch point and is not the maximally mixed state I/2 at the centre.
     edge     the theorem forbids a global homomorphism on all matrices, which is stronger than value rules on
              compatible observables; it does not exclude every hidden-variable model; "answers made in the meeting"
              is the book's interpretation (argued).

   On load, FILM.init checks DATA.lean against the three theorems and re-derives every number on screen by an
   independent route (2×2 complex matrix products, the four sign rows, eigenvector tests on random complex vectors,
   Bloch vectors of the four eigenstates from ρ = ψψ*). Any disagreement is pushed to window.FILM_ERRORS. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const NC_LEAN = {
  qubit_weyl_star: 'D5/S3/Quantum/FiniteDimensional.qubit_weyl_star',
  qubit_matrix_algebra_has_no_character: 'D5/S3/Quantum/FiniteDimensional.qubit_matrix_algebra_has_no_character',
  pauli_observables_have_no_common_eigenvector: 'D5/S3/Quantum/QubitWitnesses.pauli_observables_have_no_common_eigenvector'
};
/* real 2×2 matrices as [[a, b], [c, d]] */
const NC_X = [[0, 1], [1, 0]], NC_Z = [[1, 0], [0, -1]], NC_I = [[1, 0], [0, 1]];
const ncMul = (A, B) => [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
  [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]];
const ncNeg = A => A.map(r => r.map(x => -x));
const ncEq = (A, B) => A.every((r, i) => r.every((x, j) => x === B[i][j]));
const NC_ZX = ncMul(NC_Z, NC_X), NC_XZ = ncMul(NC_X, NC_Z);
/* the four rows of the sheet: x = χ(X), z = χ(Z) */
const NC_ROWS = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
/* complex numbers [re, im] */
const ncc = {
  mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
  conj: a => [a[0], -a[1]],
  abs: a => Math.hypot(a[0], a[1])
};
/* the Bloch vector of a nonzero ψ = (ψ0, ψ1): ρ = ψψ† / |ψ|², a = (2 Re ρ10, 2 Im ρ10, ρ00 − ρ11) */
function ncBloch(p) {
  const n = ncc.abs(p[0]) ** 2 + ncc.abs(p[1]) ** 2, r10 = ncc.mul(p[1], ncc.conj(p[0]));
  return [2 * r10[0] / n, 2 * r10[1] / n, (ncc.abs(p[0]) ** 2 - ncc.abs(p[1]) ** 2) / n];
}

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('no-common-answer film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(NC_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(NC_LEAN).length}`);
  for (const [short, gid] of Object.entries(NC_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. RULES: the five facts of qubit_weyl_star on the matrices drawn */
  check(ncEq(ncMul(NC_X, NC_X), NC_I) && ncEq(ncMul(NC_Z, NC_Z), NC_I), 'X² = Z² = I');
  check(ncEq(NC_ZX, [[0, 1], [-1, 0]]) && ncEq(NC_XZ, [[0, -1], [1, 0]]) && ncEq(NC_ZX, ncNeg(NC_XZ)), 'ZX = −XZ');
  check(!ncEq(NC_ZX, NC_XZ), 'X and Z do not commute');

  /* 2. TABLE: every ±1 row fails xz = −xz, and only 0 equals its own negative */
  for (const [x, z] of NC_ROWS) {
    check(x * x === 1 && z * z === 1, `row ${x}, ${z}: the squares are 1`);
    check(x * z !== -(x * z), `row ${x}, ${z}: xz ≠ −xz`);
  }
  check(NC_ROWS.filter(([x, z]) => x * z === -(x * z)).length === 0, 'no row fits');
  for (let k = 0; k < 40; k++) { const w = [4 * rnd(k, 1) - 2, 4 * rnd(k, 2) - 2]; if (Math.hypot(...w) > 1e-9) check(!(near(w[0], -w[0]) && near(w[1], -w[1])), 'w = −w only for w = 0'); }

  /* 3. SPHERE: X moves both Z eigenvectors; random ψ are never common eigenvectors; the four poles */
  const app = (M, p) => [[M[0][0] * p[0][0] + M[0][1] * p[1][0], M[0][0] * p[0][1] + M[0][1] * p[1][1]], [M[1][0] * p[0][0] + M[1][1] * p[1][0], M[1][0] * p[0][1] + M[1][1] * p[1][1]]];
  /* is Mψ a multiple of ψ (ψ ≠ 0)? the 2×2 determinant of the columns ψ, Mψ vanishes */
  const parallel = (p, q) => ncc.abs([ncc.mul(p[0], q[1])[0] - ncc.mul(p[1], q[0])[0], ncc.mul(p[0], q[1])[1] - ncc.mul(p[1], q[0])[1]]) < 1e-12;
  const e0 = [[1, 0], [0, 0]], e1 = [[0, 0], [1, 0]];
  check(parallel(e0, app(NC_Z, e0)) && parallel(e1, app(NC_Z, e1)), 'Z keeps (1, 0) and (0, 1)');
  check(!parallel(e0, app(NC_X, e0)) && !parallel(e1, app(NC_X, e1)), 'X moves (1, 0) and (0, 1)');
  check(app(NC_X, e0)[1][0] === 1 && app(NC_X, e0)[0][0] === 0 && app(NC_X, e1)[0][0] === 1, 'X swaps the entries');
  for (let k = 0; k < 200; k++) {
    const p = [[2 * rnd(k, 11) - 1, 2 * rnd(k, 12) - 1], [2 * rnd(k, 13) - 1, 2 * rnd(k, 14) - 1]];
    check(!(parallel(p, app(NC_X, p)) && parallel(p, app(NC_Z, p))), `random ψ ${k} is a common eigenvector`);
  }
  const s = Math.SQRT1_2, poles = [[[[1, 0], [0, 0]], [0, 0, 1]], [[[0, 0], [1, 0]], [0, 0, -1]], [[[s, 0], [s, 0]], [1, 0, 0]], [[[s, 0], [-s, 0]], [-1, 0, 0]]];
  for (const [p, a] of poles) { const b = ncBloch(p); check(b.every((v, i) => near(v, a[i], 1e-12)), `Bloch point of ${JSON.stringify(p)}`); }
  check(parallel(poles[2][0], app(NC_X, poles[2][0])) && parallel(poles[3][0], app(NC_X, poles[3][0])), '|±⟩ are X eigenvectors');
  /* on the x–z great circle the state is sure for Z only at z = ±1 and for X only at x = ±1, never both */
  for (let d = 0; d < 360; d++) { const t = d * Math.PI / 180, x = Math.sin(t), z = Math.cos(t); check(!(near(Math.abs(x), 1, 1e-9) && near(Math.abs(z), 1, 1e-9)), `pole overlap at ${d}°`); }
});
Object.assign(FILM.speed, { sheet: 0.02, rules: 0.014, table: 0.016, theorem: 0.012, sphere: 0.014, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const ncFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const ncSgn = v => (v > 0 ? '+1' : '−1');
function ncRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, p[3] || fam, w), 0) / 2;
  for (const [s, col, al, fm] of parts) { txt(s, cx, y, { size, fam: fm || fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fm || fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const NC_MISSING = new Set();
function ncLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!NC_MISSING.has(gid)) { NC_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a 2×2 matrix with brackets: (x, y) its left edge and vertical centre; cell colours optional */
function ncMat(M, x, y, a, o = {}) {
  if (a <= 0.003) return x;
  const size = o.size || 34, cw = o.cw || size * 1.5, rh = o.rh || size * 1.25, col = o.c || C.white;
  const w = cw * 2 + 20, top = y - rh, bot = y + rh;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(x + 10, top); ctx.lineTo(x, top); ctx.lineTo(x, bot); ctx.lineTo(x + 10, bot); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + w - 10, top); ctx.lineTo(x + w, top); ctx.lineTo(x + w, bot); ctx.lineTo(x + w - 10, bot); ctx.stroke();
  ctx.restore();
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
    const v = M[i][j], s = v < 0 ? '−' + Math.abs(v) : String(v);
    const cc = o.cell ? o.cell(i, j, v) : col;
    txt(s, x + 10 + cw * (j + 0.5), y + (i ? rh * 0.62 : -rh * 0.28), { size, fam: F.math, w: 700, align: 'center', c: cc, a });
  }
  return x + w;
}
/* a column vector (p0, p1) with brackets */
function ncVec(v, x, y, a, o = {}) {
  if (a <= 0.003) return x;
  const size = o.size || 30, cw = size * 1.3, rh = size * 1.15, col = o.c || C.white, w = cw + 16;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 2.2;
  ctx.beginPath(); ctx.moveTo(x + 8, y - rh); ctx.lineTo(x, y - rh); ctx.lineTo(x, y + rh); ctx.lineTo(x + 8, y + rh); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + w - 8, y - rh); ctx.lineTo(x + w, y - rh); ctx.lineTo(x + w, y + rh); ctx.lineTo(x + w - 8, y + rh); ctx.stroke();
  ctx.restore();
  txt(String(v[0]), x + w / 2, y - rh * 0.25, { size, fam: F.math, w: 700, align: 'center', c: col, a });
  txt(String(v[1]), x + w / 2, y + rh * 0.65, { size, fam: F.math, w: 700, align: 'center', c: col, a });
  return x + w;
}
/* the answer sheet: a card with question rows and answer boxes. rows [[question, answer | null, colour]] */
function ncSheet(x, y, w, rows, a, o = {}) {
  if (a <= 0.003) return;
  const rh = o.rh || 74, h = 70 + rows.length * rh + 24;
  panel(x, y, w, h, a, o.frame || C.argued, o.title || 'ANSWER SHEET · 答卷 · χ');
  rows.forEach(([q, ans, col, ra], i) => {
    const yy = y + 70 + i * rh + rh * 0.55, al = a * (ra == null ? 1 : ra);
    if (al <= 0.003) return;
    txt(q, x + 36, yy + 12, { size: 34, fam: F.math, w: 700, c: C.white, a: al });
    line(x + 170, yy + 20, x + w - 150, yy + 20, C.dim, al * 0.5, 1.2);
    const bx = x + w - 130, by = yy - 26;
    box(bx, by, 100, 58, col || C.dim, al, 1.6, 'rgba(0,0,0,0.35)');
    if (ans != null) txt(ans, bx + 50, by + 41, { size: 32, fam: F.math, w: 700, align: 'center', c: col || C.white, a: al });
  });
  return h;
}
/* opening title */
function ncTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('X AND Z SHARE NO ANSWER', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('SHEET · SQUARES · SIGN · ROWS · NO CHARACTER · POLES · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                            scene 1 · THE ANSWER SHEET                     */
/* ======================================================================= */
SCENES.sheet = S => {
  const u = S.u;
  ncTitle(S);
  const a = clamp((u - lineAt(S, 0).s - 0.35) / 0.6) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* the sheet: every question already has an answer written in (we do not yet know which) */
  const wa = Q(S, 0, 'already written', 0.8);
  const ink = k => clamp((u - phraseAt(S, 0, 'already written') - 0.25 * k) / 0.4);
  const qa = Q(S, 2, 'But can', 0.6);
  const rows = [
    ['I', wa > 0 ? '1' : null, C.white, 1],
    ['X', ink(1) > 0 ? '?' : null, C.white, 1],
    ['Z', ink(2) > 0 ? '?' : null, C.white, 1],
    ['ZX', ink(3) > 0 ? '?' : null, C.white, 1],
    ['A', ink(4) > 0 ? 'χ(A)' : null, C.white, 1]
  ];
  const sx = 200 + 12 * Math.sin(qa * 20) * (1 - qa) * clamp(qa * 4);
  ncSheet(sx, 190, 620, rows, a);
  txt('analogy · 比方：答卷 = 预先写好的数值账本 χ', sx, 700 + 40, { size: 22, fam: F.zh, w: 700, c: C.argued, a: a * 0.95 });
  /* line 1: the rules of arithmetic */
  const ra = a * at(S, 1, 0.6);
  if (ra > 0.003) {
    panel(1000, 190, 820, 400, ra, C.cyan, 'PLAYS FAIR WITH ARITHMETIC · 守算术规矩');
    const rules = [
      ['one stays one', [['χ(I) = 1', C.white]]],
      ['sums', [['χ(A + B) = χ(A) + χ(B)', C.white]]],
      ['multiples', [['χ(cA) = c χ(A)', C.white]]],
      ['products carry over', [['χ(AB) = χ(A) χ(B)', C.white]]]
    ];
    rules.forEach(([ph, parts], i) => ncRich(parts, 1036, 270 + i * 76, { size: 36, a: ra * Q(S, 1, ph, 0.5) }));
    txt('every 2×2 complex matrix A, B · 任意 2×2 复矩阵；c 为复数', 1036, 566, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ra * Q(S, 1, 'products carry over', 0.6) });
  }
  /* line 2: the genealogical question */
  if (qa > 0.003) {
    panel(1000, 630, 820, 150, a * qa, C.argued);
    txt('can such a sheet be written before anyone asks?', 1036, 694, { size: 34, fam: F.disp, w: 700, c: C.white, a: a * qa });
    txt('这样一张答卷，真能在没人提问之前写好吗？', 1036, 744, { size: 30, fam: F.zh, w: 700, c: C.argued, a: a * qa });
  }
};

/* ======================================================================= */
/*                            scene 2 · TWO QUESTIONS                        */
/* ======================================================================= */
SCENES.rules = S => {
  const a = ncFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* line 0: the two matrices */
  const ma = a * Q(S, 0, 'two by two', 0.6);
  txt('X', 200, 330, { size: 52, fam: F.math, w: 700, c: C.white, a: ma });
  txt('=', 260, 330, { size: 44, fam: F.math, w: 700, c: C.white, a: ma });
  ncMat(NC_X, 310, 315, ma);
  txt('Z', 620, 330, { size: 52, fam: F.math, w: 700, c: C.white, a: ma });
  txt('=', 680, 330, { size: 44, fam: F.math, w: 700, c: C.white, a: ma });
  ncMat(NC_Z, 730, 315, ma);
  txt('flip · 翻转', 400, 430, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ma });
  txt('up / down · 上下', 820, 430, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ma });
  /* line 1: squares */
  const qa = a * Q(S, 1, 'Square either', 0.6);
  if (qa > 0.003) {
    panel(1080, 200, 740, 300, qa, C.cyan, 'SQUARES · 自乘');
    ncRich([['X² = Z² = I', C.white]], 1116, 282, { size: 38, a: qa });
    const sa = qa * Q(S, 1, 'So each answer', 0.6);
    ncRich([['χ(X)² = χ(X²) = χ(I) = 1', C.white]], 1116, 352, { size: 32, a: sa });
    ncRich([['χ(X), χ(Z) ∈ {', C.white], ['+1', C.white], [', ', C.white], ['−1', C.white], ['}', C.white]], 1116, 420, { size: 32, a: qa * Q(S, 1, 'plus one or minus one', 0.6) });
    txt('computed here · 此处手算', 1116, 470, { size: 18, fam: F.zh, w: 700, c: C.dim, a: sa });
  }
  /* line 2: the swap and its sign */
  const wa = a * Q(S, 2, 'swap the order', 0.6);
  if (wa > 0.003) {
    const y = 640;
    ncRich([['ZX =', C.white]], 160, y + 12, { size: 40, a: wa });
    ncMat(NC_ZX, 290, y, wa);
    const sg = Q(S, 2, 'Z times X', 0.6);
    const ex = ncRich([['=  ', C.white], ['−', C.white], [' XZ  =  ', C.white], ['−', C.white]], 530, y + 12, { size: 40, a: wa * sg });
    ncMat(NC_XZ, ex + 14, y, wa * sg);
    txt('one sign, nothing else changes · 只差一个负号', 160, y + 150, { size: 24, fam: F.zh, w: 700, c: C.dim, a: wa * sg });
  }
  /* line 3: Lean */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1080, 540, 740, 250, la, C.lean, 'X AND Z · 五条性质');
    ncRich([['ZX = −XZ,  X* = X,  Z* = Z', C.white]], 1116, 620, { size: 28, a: la });
    ncRich([['X² = I,  Z² = I', C.white]], 1116, 670, { size: 28, a: la });
    ncLean(1116, 740, NC_LEAN.qubit_weyl_star, la, { size: 20 });
  }
};

/* ======================================================================= */
/*                            scene 3 · FILL IN THE SHEET                    */
/* ======================================================================= */
SCENES.table = S => {
  const u = S.u, a = ncFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* line 0: the chain on the sheet */
  const ca = a * at(S, 0, 0.6);
  panel(140, 180, 1640, 170, ca, C.cyan, 'ON THE SHEET · 答卷上');
  ncRich([['χ(X)χ(Z) = χ(Z)χ(X) = χ(ZX) = χ(−XZ) = −χ(X)χ(Z)', C.white]], 180, 262, { size: 34, a: ca });
  ncRich([['x z = − x z', C.white]], 180, 318, { size: 34, a: a * Q(S, 0, 'must obey', 0.6) });
  txt('numbers commute · 纸上的数可交换', 1740, 318, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.dim, a: a * Q(S, 0, 'numbers commute', 0.6) });
  /* the table of the four rows */
  const ta = a * at(S, 1, 0.6);
  if (ta > 0.003) {
    const X0 = 220, Y0 = 410, cols = [0, 170, 340, 540, 760], rowH = 84;
    const heads = ['x = χ(X)', 'z = χ(Z)', 'x z', '− x z', 'x z = − x z ?'];
    heads.forEach((h, i) => txt(h, X0 + cols[i], Y0, { size: 26, fam: F.math, w: 700, c: C.dim, a: ta }));
    line(X0 - 20, Y0 + 20, X0 + 1080, Y0 + 20, C.dim, ta * 0.6, 1.2);
    NC_ROWS.forEach(([x, z], i) => {
      const ra = i === 0 ? a * Q(S, 1, 'Try plus one', 0.5) : a * clamp((u - phraseAt(S, 2, 'three rows') - 0.35 * (i - 1)) / 0.4);
      if (ra <= 0.003) return;
      const y = Y0 + 80 + i * rowH, cur = i === 0 ? 1 - at(S, 2, 0.6) : 0;
      if (cur > 0.01) fillBox(X0 - 24, y - 52, 1110, 74, C.now, ra * 0.12 * cur);
      txt(ncSgn(x), X0 + cols[0], y, { size: 34, fam: F.math, w: 700, c: C.white, a: ra });
      txt(ncSgn(z), X0 + cols[1], y, { size: 34, fam: F.math, w: 700, c: C.white, a: ra });
      const pa = i === 0 ? ra * Q(S, 1, 'The product is one', 0.5) : ra;
      txt(ncSgn(x * z), X0 + cols[2], y, { size: 34, fam: F.math, w: 700, c: C.cyan, a: pa });
      const na = i === 0 ? ra * Q(S, 1, 'asks for minus one', 0.5) : ra;
      txt(ncSgn(-x * z), X0 + cols[3], y, { size: 34, fam: F.math, w: 700, c: C.white, a: na });
      txt(`${ncSgn(x * z)} ≠ ${ncSgn(-x * z)}   ✗`, X0 + cols[4], y, { size: 34, fam: F.math, w: 700, c: C.white, a: na });
    });
  }
  /* line 2: only zero equals its own negative */
  const za = a * Q(S, 2, 'Only zero', 0.6);
  if (za > 0.003) {
    panel(1340, 420, 440, 340, za, C.cyan, 'THE ONLY WAY OUT · 唯一出路');
    ncRich([['w = −w  ⇒  w = 0', C.white]], 1370, 500, { size: 32, a: za });
    ncRich([['x z = 0', C.white]], 1370, 570, { size: 32, a: za });
    ncRich([['but · 但  (x z)² = 1', C.white]], 1370, 640, { size: 30, a: a * Q(S, 2, 'zero squared', 0.6), fam: F.zh });
    ncRich([['0 = 1  ✗', C.white]], 1370, 714, { size: 38, a: a * Q(S, 2, 'is not one', 0.6) });
  }
  stamp('NO ROW FITS · 无一行能填', 760, 820, Q(S, 2, 'fail the same way', 0.5, 1.2) * (1 - at(S, 2, 0.5, 6)), C.white, 34, -0.04);
};

/* ======================================================================= */
/*                               scene 4 · NO SUCH SHEET                     */
/* ======================================================================= */
SCENES.theorem = S => {
  const u = S.u, a = ncFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'lean'], [1, null, 'argued']]);
  const la = a * (1 - 0.35 * at(S, 1, 0.8));
  panel(200, 190, 1520, 360, la, C.lean, 'NO CHARACTER ON 2×2 MATRICES · 单比特矩阵代数无特征标');
  ncRich([['there is no  χ : M₂(ℂ) → ℂ  with', C.white]], 250, 280, { size: 38, a: la * Q(S, 0, 'no map', 0.6) });
  ncRich([['χ(I) = 1,  χ(A + B) = χ(A) + χ(B),  χ(cA) = c χ(A),  χ(AB) = χ(A) χ(B)', C.white]], 250, 350, { size: 30, a: la * Q(S, 0, 'keeps one', 0.6) });
  ncRich([['IsEmpty (QubitMatrix →ₐ[ℂ] ℂ)', C.lean]], 250, 420, { size: 28, a: la * Q(S, 0, 'keeps one', 0.6), fam: F.mono });
  ncLean(250, 496, NC_LEAN.qubit_matrix_algebra_has_no_character, la * at(S, 0, 0.6), { size: 22 });
  stamp('NO χ', 1500, 470, Q(S, 0, 'Lean checks', 0.5, 0.8) * (1 - at(S, 1, 0.5)), C.lean, 34, -0.06);
  /* line 1: the aphorism — the sheet comes apart at the sign */
  const pa = a * at(S, 1, 0.6);
  if (pa > 0.003) {
    const burn = ease(clamp((u - lineAt(S, 1).s) / 2.6));
    const rows = [['I', '1'], ['X', '±1'], ['Z', '±1'], ['ZX', '?']];
    ctx.save();
    rows.forEach(([q, v], i) => {
      const y = 650 + i * 50, dx = (i % 2 ? 1 : -1) * 120 * burn * (i + 1) / 4, dy = -60 * burn * (1 + i * 0.3);
      txt(scramble(`${q}  →  ${v}`, 1 - burn * 0.8, i + 7), 360 + dx, y + dy, { size: 30, fam: F.math, w: 700, c: C.argued, a: pa * (1 - burn * 0.85) });
    });
    ctx.restore();
    txt('Squares allow only ±1; one minus sign then bankrupts the ledger.', 1150, 700, { size: 36, fam: F.disp, w: 700, align: 'center', c: C.white, a: pa });
    txt('平方只许 ±1，一个负号就让整本账破产。', 1150, 770, { size: 40, fam: F.zh, w: 900, align: 'center', c: C.white, a: pa, ab: 2 });
  }
};

/* ======================================================================= */
/*                              scene 5 · NO SHARED STATE                    */
/* ======================================================================= */
/* orthographic view of the ball: world (x, y, z), z up → [screen x, screen y, depth] */
function ncView(cx, cy, R, yaw, el) {
  const cw = Math.cos(yaw), sw = Math.sin(yaw), ce = Math.cos(el), se = Math.sin(el);
  const V = p => {
    const X = p[0] * cw - p[1] * sw, Y = p[0] * sw + p[1] * cw, Z = p[2];
    return [cx + X * R, cy - (Z * ce + Y * se) * R, Y * ce - Z * se];
  };
  Object.assign(V, { cx, cy, R, yaw, el, ce, se });
  return V;
}
function ncShot(key, V, r) {
  return solid(key, { x: r[0], y: r[1], w: r[2], h: r[3], yaw: V.yaw, pitch: V.el, unit: V.R, cx: V.cx - r[0], cy: V.cy - r[1], px: true });
}
/* the travelling state: N → E → S → W → N on the x–z great circle, dwelling at each pole */
function ncTour(S, t0) {
  const p = Math.max(0, S.u - t0) / 2.6, k = Math.floor(p), f = p - k;
  const ang = (k + ease(clamp((f - 0.45) / 0.55))) * Math.PI / 2;
  /* dwell: the first 45% of each step, when the state sits exactly on a pole */
  return { v: [Math.sin(ang), 0, Math.cos(ang)], dwell: f <= 0.45 };
}
SCENES.sphere = S => {
  const u = S.u, a = ncFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'computed']]);
  /* line 0: the question */
  const q0 = a * at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  ncRich([['ψ ≠ 0 :   Xψ = xψ   and · 且   Zψ = zψ  ?', C.white]], 120, 240, { size: 40, a: q0, fam: F.math });
  /* line 1: X swaps the entries of Z's two sure directions */
  const va = a * at(S, 1, 0.6) * (1 - at(S, 3, 0.6));
  if (va > 0.003) {
    panel(1060, 430, 760, 380, va, C.cyan, 'Z IS SURE HERE · Z 在这里确定');
    const rowsY = [560, 690];
    [[[1, 0], [0, 1]], [[0, 1], [1, 0]]].forEach(([v, w], i) => {
      const y = rowsY[i], ra = va * (i === 0 ? Q(S, 1, 'two basis directions', 0.5) : Q(S, 1, 'two basis directions', 0.5, 0.5));
      if (ra <= 0.003) return;
      ncRich([['X', C.white]], 1096, y + 12, { size: 38, a: ra });
      let x = ncVec(v, 1146, y, ra, { c: C.cyan });
      const sw = va * Q(S, 1, 'X swaps them', 0.6);
      txt('=', x + 24, y + 12, { size: 38, fam: F.math, w: 700, c: C.white, a: ra * sw });
      x = ncVec(w, x + 70, y, ra * sw, { c: C.white });
      txt(`≠ λ (${v[0]}, ${v[1]})ᵀ`, x + 30, y + 12, { size: 32, fam: F.math, w: 700, c: C.white, a: ra * Q(S, 1, 'it moves both', 0.5) });
    });
    txt('sure states of Z, up to scale ·Z 的本征方向（差一个倍数）', 1096, 784, { size: 20, fam: F.zh, w: 700, c: C.dim, a: va });
  }
  /* line 2: Lean */
  const la = a * Q(S, 2, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1060, 190, 760, 200, la, C.lean, 'NO COMMON EIGENVECTOR · 无公共本征向量');
    ncRich([['Xψ = xψ,  Zψ = zψ   ⇒   ψ = 0', C.white]], 1096, 280, { size: 32, a: la });
    txt('ψ ∈ ℂ², x, z ∈ ℂ', 1096, 322, { size: 26, fam: F.math, w: 700, c: C.dim, a: la });
    ncLean(1096, 368, NC_LEAN.pauli_observables_have_no_common_eigenvector, la, { size: 20 });
  }
  /* lines 3–4: the Bloch sphere */
  const ba = a * at(S, 0, 0.8), tourOn = at(S, 3, 0.6);
  if (ba > 0.003) {
    const V = ncView(560, 600, 250, -0.55 + 0.03 * (u - lineAt(S, 3).s), 0.28);
    const tour = tourOn > 0 ? ncTour(S, lineAt(S, 3).s + 0.6) : { v: [0, 0, 1], dwell: true }, st = tour.v;
    const ca = a * at(S, 4, 0.6);
    const sh = ncShot('bloch', V, [200, 300, 720, 600]);
    sh.begin();
    QG_SPHERE.ball(sh, { glass: C.cyan, ink: C.blue, width: 1.4, alpha: 0.5, back: 0.35, shell: { alpha: 0.07, rim: 0.5 } });
    sh.line([[0, 0, -1.22], [0, 0, 1.22]], { color: C.cyan, width: 2.5, alpha: 0.8 });
    sh.line([[-1.22, 0, 0], [1.22, 0, 0]], { color: C.white, width: 2.5, alpha: 0.8 });
    sh.bead([0, 0, 1], { color: C.cyan, r: 11 }); sh.bead([0, 0, -1], { color: C.cyan, r: 11 });
    sh.bead([1, 0, 0], { color: C.white, r: 11 }); sh.bead([-1, 0, 0], { color: C.white, r: 11 });
    sh.arrow([0, 0, 0], st, { color: C.now, width: 4, headSize: 16, alpha: tour.dwell ? 1 : 0.5 });
    if (ca > 0.01) sh.bead([0, 0, 0], { color: C.white, r: 7, alpha: ca });
    sh.end(ba);
    const lab = (p, s, col, dx, dy) => { const q = sh.anchor(p); txt(s, q.x + dx, q.y + dy, { size: 24, fam: F.zh, w: 700, c: col, a: ba * (q.hidden ? 0.35 : 1) }); };
    lab([0, 0, 1], 'Z = +1 · 北极 |0⟩', C.cyan, 22, -12);
    lab([0, 0, -1], 'Z = −1 · 南极 |1⟩', C.cyan, 22, 30);
    lab([1, 0, 0], 'X = +1 · 东 |+⟩', C.white, 18, 34);
    lab([-1, 0, 0], 'X = −1 · 西 |−⟩', C.white, -190, 34);
    if (ca > 0.01) { const o = sh.anchor([0, 0, 0]); txt('centre · 球心 I/2', o.x - 22, o.y + 34, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.white, a: ca }); }
    /* the readout: where the amber state is sure for Z, for X */
    const ra = ba * tourOn;
    panel(1060, 430, 760, 220, ra, C.cyan, 'IS THE ANSWER SURE? · 答案确定吗');
    const zs = tour.dwell && Math.abs(st[2]) > 0.9999, xs = tour.dwell && Math.abs(st[0]) > 0.9999;
    txt('Z', 1100, 510, { size: 34, fam: F.math, w: 700, c: C.cyan, a: ra });
    txt(zs ? `sure · 确定  ${st[2] > 0 ? '+1' : '−1'}` : 'not sure · 不确定', 1160, 510, { size: 28, fam: F.zh, w: 700, c: zs ? C.now : C.dim, a: ra });
    txt('X', 1100, 570, { size: 34, fam: F.math, w: 700, c: C.white, a: ra });
    txt(xs ? `sure · 确定  ${st[0] > 0 ? '+1' : '−1'}` : 'not sure · 不确定', 1160, 570, { size: 28, fam: F.zh, w: 700, c: xs ? C.now : C.dim, a: ra });
    txt('never both · 从不同时', 1100, 626, { size: 22, fam: F.zh, w: 700, c: C.white, a: ra * Q(S, 3, 'never meet', 0.6) });
    if (ca > 0.003) {
      panel(1060, 680, 760, 130, ca, C.cyan);
      ncRich([['ψ = 0', C.white], ['  is no state · 不是态', C.white, 1, F.zh]], 1096, 736, { size: 28, a: ca });
      ncRich([['centre I/2 ≠ ψ = 0', C.white], ['  球心是最大混合态', C.dim, 1, F.zh]], 1096, 784, { size: 24, a: ca });
    }
  }
};

/* ======================================================================= */
/*                            scene 6 · WHAT IT DOES NOT SAY                 */
/* ======================================================================= */
SCENES.edge = S => {
  const a = ncFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const rows = [
    { k: 0, col: C.cyan, en: 'forbids: one global table keeping every product', zh: '排除的是：守住所有乘积的全局数表', note: 'not every hidden-variable model · 并不排除所有隐变量模型', q: 'It does not' },
    { k: 1, col: C.argued, en: 'answers made in the meeting', zh: '答案在相遇时生成，而非揣在口袋里', note: "this book's reading, not a theorem · 本书的诠释，不是定理", q: "this book's reading" }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 220 + i * 290;
    panel(260, y, 1400, 230, ra, rw.col);
    txt(rw.en, 300, y + 72, { size: 38, fam: F.disp, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 300, y + 132, { size: 32, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 300, y + 192, { size: 24, fam: F.zh, w: 700, c: i ? C.argued : C.white, a: ra * Q(S, rw.k, rw.q, 0.6) });
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
  const sc = TL.scenes[0], t = sc.end - 1.0;
  background(t, sc, 0, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  ncSheet(180, 230, 600, [['I', '1', C.white], ['X', '±1', C.white], ['Z', '±1', C.white], ['ZX', '✗', C.white]], 1);
  txt(DATA.film.title_zh, 1380, 420, { size: 80, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('X AND Z', 1380, 520, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('SHARE NO ANSWER', 1380, 582, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 2, ls: 4 });
  ncRich([['ZX = −XZ', C.white]], 1380, 680, { size: 48, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1380, 760, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
