/* Film · The Bare Kernel and the Mother Axiom · 裸内核与母公理 (book omega-math, chapter 1).
   Scenes for the shared engine theme/film/engine.js.

   What each scene shows and where it rests
   (all in chapter 1 of the book, section numbers of the chapter):
     kernel   1.1: the bare CIC kernel, its three primitives and four reductions βδιζ, Nat = zero | succ; the
              metatheory is the literature result of rem-ch01-cic-hedberg-literature (argued).
     fees     1.1: the three classical axioms Classical.choice, Quot.sound, propext and how they enter (argued);
              decidable equality of exact fractions by cross-multiplication (the Omega.Ratio.Equivalent rule of
              chapter 2), two comparisons recomputed here (computed).
     horizon  1.2, def-ch01-observer-precision (MODEL, argued) and ex-ch01-finite-horizon-budget (NUM): the reduced
              fractions of [0, 1] with denominators ≤ 12 and their least gap 1/132, recomputed here (computed).
     lift     ex-ch01-finite-horizon-budget: [1 : 2] ⊙ [1 : 3] = (5, 5) ~ [1 : 1], [1 : 2] ⊙ [2 : 5] = [9 : 8], with the
              circle product (p₁q₂ + q₁p₂, q₁q₂ − p₁p₂) of chapter 2 and the Cayley points of chapter 2's table;
              recomputed here (computed).
     laws     def-ch01-axiom-omega (MODEL, argued): the two primitives and the three Mother Laws; the transport
              picture is schematic.
     free     1.3: κ ≤ 1 from the Gram form with weights (1, −1), and the local group x ⋆ₒ z = [x, o, z],
              x⁻¹ = [o, x, o] (the chapter's three-line derivations, argued).
     klass    1.4: a contradictory axiom, a blocked Nat match and an erasable Prop proof, the schematic class, and the
              chapter's Q₈ example with constant κ = 1 (argued; the Q₈ checks are recomputed here, computed).
   On load, FILM.init recomputes every number on screen by a second route; any disagreement is pushed to
   window.FILM_ERRORS, which stops the render. */
'use strict';

/* ---------------- exact integer arithmetic ---------------- */
const bkGcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
/* the reduced fractions a/b of [0, 1] with 1 ≤ b ≤ M, sorted by value (exact comparison by cross-multiplication) */
function farey(M) {
  const out = [];
  for (let b = 1; b <= M; b++) for (let a = 0; a <= b; a++) if (bkGcd(a, b) === 1) out.push([a, b]);
  return out.sort((x, y) => x[0] * y[1] - y[0] * x[1]);
}
const F12 = farey(12);
/* least gap between consecutive grid points, as an exact fraction [num, den] */
function leastGap(F) {
  let best = null;
  for (let i = 1; i < F.length; i++) {
    const [a, b] = F[i - 1], [c, d] = F[i];
    const g = [c * b - a * d, b * d];
    if (!best || g[0] * best[1] < best[0] * g[1]) best = g;
  }
  const k = bkGcd(best[0], best[1]);
  return [best[0] / k, best[1] / k];
}
const GAP12 = leastGap(F12);
/* the homogeneous circle product of chapter 2: (p₁, q₁) ⊙ (p₂, q₂) = (p₁q₂ + q₁p₂, q₁q₂ − p₁p₂) */
const pMul = (u, v) => [u[0] * v[1] + u[1] * v[0], u[1] * v[1] - u[0] * v[0]];
const nSq = u => u[0] * u[0] + u[1] * u[1];
const reduce = u => { const g = bkGcd(u[0], u[1]) || 1; return [u[0] / g, u[1] / g]; };
const height = u => Math.max(Math.abs(u[0]), Math.abs(u[1]));
/* Cayley point of [p : q] on the unit circle: ((q² − p²)/d, 2pq/d), d = p² + q² (chapter 2) */
const cay = u => { const d = nSq(u); return [(u[1] * u[1] - u[0] * u[0]) / d, 2 * u[0] * u[1] / d]; };
const cayStr = u => { const d = nSq(u), X = u[1] * u[1] - u[0] * u[0], Y = 2 * u[0] * u[1]; const r = (n) => { const g = bkGcd(n, d) || 1; return n === 0 ? '0' : d / g === 1 ? `${n / g}` : `${n / g}/${d / g}`; }; return `(${r(X)}, ${r(Y)})`; };
const A12 = [1, 2], A13 = [1, 3], A25 = [2, 5];
const P1 = pMul(A12, A13), P2 = pMul(A12, A25);
const P1r = reduce(P1), P2r = reduce(P2);

/* ---------------- the quaternion group Q₈ (chapter 1.4) ---------------- */
const qMul = (p, q) => [
  p[0] * q[0] - p[1] * q[1] - p[2] * q[2] - p[3] * q[3],
  p[0] * q[1] + p[1] * q[0] + p[2] * q[3] - p[3] * q[2],
  p[0] * q[2] - p[1] * q[3] + p[2] * q[0] + p[3] * q[1],
  p[0] * q[3] + p[1] * q[2] - p[2] * q[1] + p[3] * q[0]
];
const qInv = p => [p[0], -p[1], -p[2], -p[3]];          // unit quaternions: inverse = conjugate
const Q8 = [];
for (let i = 0; i < 4; i++) for (const s of [1, -1]) { const v = [0, 0, 0, 0]; v[i] = s; Q8.push(v); }
const tri = (x, y, z) => qMul(qMul(x, qInv(y)), z);
const qEq = (p, q) => p.every((v, i) => v === q[i]);
const ONE = [1, 0, 0, 0], MONE = [-1, 0, 0, 0], QI = [0, 1, 0, 0], QJ = [0, 0, 1, 0], QK = [0, 0, 0, 1];
const kapConst = () => 1;                              // the chapter's constant reading κ ≡ 1

/* ---------------- independent re-checks ---------------- */
FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  const check = (ok, m) => { if (!ok) E.push('the-bare-kernel film: ' + m); };
  check((DATA.lean || []).length === 0, 'unexpected Lean citation in this film\'s evidence table');
  /* horizon: count by Euler's totient, gap by brute force over all pairs */
  let phi = 0;
  for (let b = 1; b <= 12; b++) for (let a = 1; a <= b; a++) if (bkGcd(a, b) === 1) phi++;
  check(F12.length === phi + 1 && F12.length === 47, `|F12| = ${F12.length}`);
  let bn = 1, bd = 1;
  for (let i = 0; i < F12.length; i++) for (let j = i + 1; j < F12.length; j++) {
    const [a, b] = F12[i], [c, d] = F12[j], n = Math.abs(a * d - b * c), m = b * d;
    if (n * bd < bn * m) { bn = n; bd = m; }
  }
  const k = bkGcd(bn, bd);
  check(bn / k === 1 && bd / k === 132 && GAP12[0] === 1 && GAP12[1] === 132, `least gap ${bn}/${bd}, ${GAP12}`);
  check(1 * 12 - 1 * 11 === 1 && 11 * 12 === 132, 'gap between 1/12 and 1/11');
  /* lift: the circle products, by Gaussian integers q + i p as a second route */
  const gauss = (u, v) => { const re = u[1] * v[1] - u[0] * v[0], im = u[1] * v[0] + u[0] * v[1]; return [im, re]; };
  check(P1.join() === '5,5' && gauss(A12, A13).join() === '5,5', `[1:2]⊙[1:3] = ${P1}`);
  check(P1r.join() === '1,1' && height(P1) === 5 && height(P1r) === 1, 'reduction to [1:1]');
  check(P2.join() === '9,8' && gauss(A12, A25).join() === '9,8' && P2r.join() === '9,8' && height(P2) === 9, `[1:2]⊙[2:5] = ${P2}`);
  check(nSq(A12) * nSq(A13) === nSq(P1) && nSq(P1) === 50 && nSq(A12) * nSq(A25) === nSq(P2) && nSq(P2) === 145, 'norm products');
  check(Math.max(height(A12), height(A13)) === 3, 'both factors inside M = 3');
  for (const u of [A12, A13, A25, P1r, P2r]) {
    const d = nSq(u), X = u[1] * u[1] - u[0] * u[0], Y = 2 * u[0] * u[1];
    check(X * X + Y * Y === d * d, `Cayley point of [${u}] on the circle`);
  }
  check(cayStr(A12) === '(3/5, 4/5)' && cayStr(A13) === '(4/5, 3/5)' && cayStr(P1r) === '(0, 1)' && cayStr(P2r) === '(-17/145, 144/145)', `Cayley strings ${cayStr(A12)} ${cayStr(A13)} ${cayStr(P1r)} ${cayStr(P2r)}`);
  /* Q8: every listed field of the schematic class holds, and the two failures */
  let ok = true;
  for (const x of Q8) for (const z of Q8) { if (!qEq(tri(x, x, z), z) || !qEq(tri(x, z, z), x)) ok = false; }
  for (const x of Q8) for (const y of Q8) for (const z of Q8) for (const u of Q8) for (const v of Q8)
    if (!qEq(tri(tri(x, y, z), u, v), tri(x, y, tri(z, u, v)))) ok = false;
  check(ok && Q8.length === 8, 'Q8 satisfies cancellation and ternary associativity');
  check(qEq(qMul(QI, QJ), QK) && qEq(qMul(QJ, QI), [0, 0, 0, -1]), 'ij = k, ji = −k');
  check(!qEq(tri(QI, ONE, QJ), tri(QJ, ONE, QI)), '[i, 1, j] ≠ [j, 1, i]');
  check(kapConst(ONE, MONE) === 1 && !qEq(ONE, MONE), 'κ(1, −1) = 1 while 1 ≠ −1');
  /* free: the local group at every base point o of Q8 */
  let grp = true;
  for (const o of Q8) for (const x of Q8) {
    const inv = tri(o, x, o);
    if (!qEq(tri(x, o, inv), o) || !qEq(tri(inv, o, x), o) || !qEq(tri(o, o, x), x) || !qEq(tri(x, o, o), x)) grp = false;
  }
  check(grp, 'local group at every base point');
  /* Gram form with weights (1, −1): 1 + 1 − 2κ */
  for (const [n, d] of [[0, 1], [1, 3], [1, 2], [1, 1]]) {
    const c = [1, -1], G = [[1, n / d], [n / d, 1]];
    let s = 0; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) s += c[i] * c[j] * G[i][j];
    check(Math.abs(s - (2 - 2 * n / d)) < 1e-12, 'Gram form 2 − 2κ');
  }
  /* decidable equality demos: 12/18 vs 2/3 and 3/4 vs 2/3 by cross-multiplication */
  check(12 * 3 === 36 && 18 * 2 === 36 && 3 * 3 === 9 && 4 * 2 === 8, 'cross-multiplications');
});
Object.assign(FILM.speed, { kernel: 0.02, fees: 0.016, horizon: 0.014, lift: 0.016, laws: 0.016, free: 0.014, klass: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const bkFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function tag(x, y, s, col, a) {
  if (a <= 0.003) return;
  const w = tw(s, 18, F.zh, 700, 1) + 22;
  box(x, y - 22, w, 32, col, a, 1.5, 'rgba(0,0,0,0.5)');
  txt(s, x + 11, y, { size: 18, fam: F.zh, w: 700, c: col, a, ls: 1 });
}
/* a struck-through token: something the kernel or the laws do not contain */
function struck(s, x, y, a, size = 44) {
  if (a <= 0.003) return;
  txt(s, x, y, { size, fam: F.math, w: 700, align: 'center', c: C.dim, a });
  const w = Math.max(tw(s, size, F.math, 700), size * 0.6) / 2 + 10;
  line(x - w, y + 4 - size * 0.1, x + w, y - size * 0.55, C.mag, a, 4);
}
/* the scene currently narrated: index of the last line that has started */
const curLine = S => { let c = -1; for (let j = 0; j < S.L.length; j++) if (S.u >= S.L[j].s) c = j; return c; };

/* opening title over the lead of the first scene */
function title(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.2) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.4);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('THE BARE KERNEL AND THE MOTHER AXIOM', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
  txt('βδιζ · ε = 1/M · AXIOM-Ω · CLASS, NOT AXIOM', W / 2, 660, { size: 24, fam: F.math, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 4 });
}

/* ======================================================================= */
/*                            scene 1 · BARE KERNEL                          */
/* ======================================================================= */
const PRIMS = [
  ['Π', '(x : A) → B x', 'dependent functions · 依值函数', 'dependent functions'],
  ['𝒰', 'Type 0 : Type 1 : Type 2', 'universes · 宇宙层级', 'universes'],
  ['ℐ', 'inductive', 'finite inductive types · 有限归纳定义', 'inductive types']
];
const RULES = [['β', 'apply · 代换', 'beta'], ['δ', 'unfold · 展开', 'delta'], ['ι', 'eliminate · 消去', 'iota'], ['ζ', 'let · 绑定', 'zeta']];
SCENES.kernel = S => {
  title(S);
  const a = clamp((S.u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - S.u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* left: the three primitives */
  const pa = a * at(S, 0, 0.6);
  panel(140, 190, 940, 380, pa, C.cyan, 'BARE CIC · 裸内核 · 3 PRIMITIVES');
  PRIMS.forEach(([g, sig, cap, ph], i) => {
    const ra = a * Q(S, 1, ph, 0.5), y = 290 + i * 96;
    if (ra <= 0.003) return;
    chip(210, y - 12, 76, 70, g, C.cyan, ra, 40, F.math);
    txt(sig, 280, y - 4, { size: 30, fam: F.math, w: 700, c: C.white, a: ra });
    txt(cap, 280, y + 30, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ra });
  });
  /* left bottom: the four reductions */
  const rp = a * Q(S, 1, 'Four rules', 0.5);
  txt('4 REDUCTIONS · 四条归约', 140, 618, { size: 18, fam: F.mono, w: 700, c: C.cyan, a: rp, ls: 2 });
  RULES.forEach(([g, cap, ph], i) => {
    const ra = a * Q(S, 1, ph, 0.4), x = 140 + i * 240;
    if (ra <= 0.003) return;
    box(x, 640, 220, 170, C.cyan, ra, 1.5, 'rgba(0,0,0,0.5)');
    txt(g, x + 110, 740, { size: 72, fam: F.math, w: 700, align: 'center', c: C.white, a: ra, ab: 2 });
    txt(cap, x + 110, 790, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ra });
  });
  /* right: Nat and the finite tree of 3 */
  const na = a * at(S, 2, 0.6);
  if (na > 0.003) {
    panel(1160, 190, 620, 640, na, C.cyan, 'NAT · 自然数');
    txt('inductive Nat', 1190, 262, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: na });
    txt('| zero  | succ (n : Nat)', 1190, 298, { size: 24, fam: F.mono, w: 700, c: C.white, a: na });
    const nodes = ['succ', 'succ', 'succ', 'zero'], grow = Q(S, 2, 'Three is successor', 2.2);
    txt('3 =', 1250, 395, { size: 46, fam: F.orb, w: 900, c: C.now, a: a * Q(S, 2, 'Three is successor', 0.4) });
    nodes.forEach((s, i) => {
      const ra = a * clamp(grow * 4 - i), y = 380 + i * 92, x = 1490;
      if (ra <= 0.003) return;
      if (i) line(x, y - 92 + 26, x, y - 26, C.cyan, ra, 3);
      chip(x, y, 170, 52, s, i === 3 ? C.now : C.cyan, ra, 26);
    });
    txt('finite depth · 有限深度', 1490, 760, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a * clamp(grow * 4 - 3) });
  }
  /* "no infinite bag": what the kernel does not contain */
  const ba = a * Q(S, 2, 'no infinite bag', 0.5);
  if (ba > 0.003) {
    ['ℝ', '∞', 'π', 'e'].forEach((s, i) => struck(s, 1240 + i * 70, 810, ba, 38));
    txt('not in the kernel', 1530, 790, { size: 18, fam: F.disp, w: 700, c: C.mag, a: ba });
    txt('内核里没有', 1530, 815, { size: 18, fam: F.zh, w: 700, c: C.mag, a: ba });
  }
};

/* ======================================================================= */
/*                          scene 2 · THREE HIDDEN AXIOMS                    */
/* ======================================================================= */
const FEES = [
  { name: 'Classical.choice', math: 'Nonempty α  ⟶  α', en: 'a witness with no recipe', zh: '凭空抽出元素，不给算法', tag: 'noncomputable', ph: [0, 'Choice pulls'] },
  { name: 'Quot.sound', math: 'ℝ := Cauchy(ℚ) / ~', en: 'equivalent forms glued together', zh: '等价表示被粘成一个', tag: 'ℝ brings in both', ph: [1, 'Quotients glue'] },
  { name: 'propext', math: '(P ↔ Q)  ⟶  P = Q', en: 'equivalent statements made equal', zh: '等价命题被判为相等', tag: 'outside βδιζ', ph: [1, 'propositional extensionality'] }
];
SCENES.fees = S => {
  const a = bkFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, 'equality is decided', 'computed']]);
  const cl = curLine(S) >= 2 ? 3 : FEES.reduce((c, f, i) => (S.u >= phraseAt(S, f.ph[0], f.ph[1]) ? i : c), -1);
  FEES.forEach((f, i) => {
    const x = 140 + i * 560, ca = a * Q(S, f.ph[0], f.ph[1], 0.6);
    if (ca <= 0.003) return;
    const live = cl === i, col = live ? C.now : C.mag, dim = cl >= 3 ? 0.55 : 1;
    panel(x, 190, 520, 330, ca * dim, col, f.name);
    txt(f.math, x + 260, 300, { size: 36, fam: F.math, w: 700, align: 'center', c: C.white, a: ca * dim });
    txt(f.en, x + 260, 370, { size: 22, fam: F.disp, w: 700, align: 'center', c: C.white, a: ca * dim * 0.9 });
    txt(f.zh, x + 260, 404, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ca * dim });
    const tw0 = tw(f.tag, 20, F.mono, 700, 1) + 30;
    box(x + 260 - tw0 / 2, 446, tw0, 40, C.mag, ca * dim, 1.5, 'rgba(0,0,0,0.5)');
    txt(f.tag, x + 260, 473, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ca * dim, ls: 1 });
  });
  /* the strict floor: decidable equality by a halting cross-multiplication */
  const sa = a * at(S, 2, 0.6);
  if (sa > 0.003) {
    panel(140, 560, 1640, 270, sa, C.cyan, 'STRICT FLOOR · prelude · OmegaInit · OmegaMath');
    txt('DecidableEq :  a = b ?', 180, 650, { size: 32, fam: F.math, w: 700, c: C.white, a: sa });
    txt('→  proof   |   refutation', 180, 700, { size: 30, fam: F.math, w: 700, c: C.cyan, a: sa });
    txt('always halts · 必定停机', 180, 760, { size: 22, fam: F.zh, w: 700, c: C.dim, a: sa });
    const r1 = a * Q(S, 2, 'a program', 0.5), r2 = a * Q(S, 2, 'always halts', 0.5);
    txt('12/18 ≟ 2/3 :  12 × 3 = 36 = 18 × 2', 820, 660, { size: 30, fam: F.math, w: 700, c: C.white, a: r1 });
    txt('→ proof', 1600, 660, { size: 28, fam: F.mono, w: 700, c: C.cyan, a: r1 });
    txt('3/4 ≟ 2/3 :  3 × 3 = 9 ≠ 8 = 4 × 2', 820, 730, { size: 30, fam: F.math, w: 700, c: C.white, a: r2 });
    txt('→ refutation', 1600, 730, { size: 28, fam: F.mono, w: 700, c: C.cyan, a: r2 });
    txt('exact fractions compared by cross-multiplication · 交叉相乘判定', 820, 790, { size: 20, fam: F.zh, w: 700, c: C.dim, a: r2 });
  }
};

/* ======================================================================= */
/*                              scene 3 · ONE OVER M                         */
/* ======================================================================= */
const NL = { x0: 180, x1: 1740, y: 520 };
const nlX = (a, b) => NL.x0 + (NL.x1 - NL.x0) * a / b;
SCENES.horizon = S => {
  const a = bkFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed']]);
  /* the contract */
  const ea = a * at(S, 0, 0.6);
  txt('ε', W / 2 - 230, 270, { size: 64, fam: F.math, w: 700, c: C.white, a: ea });
  txt('self', W / 2 - 192, 286, { size: 26, fam: F.math, w: 700, c: C.white, a: ea });
  txt('= 1 / M', W / 2 - 120, 270, { size: 64, fam: F.math, w: 700, c: C.white, a: ea });
  const m12 = a * at(S, 1, 0.5);
  txt('·  M = 12', W / 2 + 150, 270, { size: 56, fam: F.orb, w: 900, c: C.now, a: m12 });
  txt('a finite precision contract · 有理精度契约（模型）', W / 2, 320, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ea });
  /* the grid of reduced fractions in [0, 1] with b ≤ 12 */
  const ga = a * at(S, 1, 0.5);
  if (ga > 0.003) {
    line(NL.x0 - 20, NL.y, NL.x1 + 20, NL.y, C.dim, ga, 2);
    const grow = at(S, 1, 2.6, 0.4);
    const hi = Q(S, 2, 'one twelfth', 0.5);
    F12.forEach(([p, q], i) => {
      const x = nlX(p, q), h = 26 + (13 - q) * 9, ra = ga * clamp(grow * F12.length - i * 0.6 + 1);
      const amb = (p === 1 && (q === 12 || q === 11)) && hi > 0;
      line(x, NL.y - h, x, NL.y + 6, amb ? C.now : C.cyan, ra * (amb ? 1 : 0.85), amb ? 3.5 : 2);
    });
    [[0, 1], [1, 1], [1, 2], [1, 3], [2, 3], [1, 4], [3, 4]].forEach(([p, q]) => {
      const s = q === 1 ? String(p) : `${p}/${q}`;
      txt(s, nlX(p, q), NL.y + 40, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: ga * grow });
    });
    txt(`${F12.length} reduced fractions in [0, 1] · 分母 ≤ 12 的既约分数共 ${F12.length} 个`, W / 2, 400, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: ga * clamp(grow * 1.2 - 0.2) });
  }
  /* the least gap, zoomed */
  const za = a * Q(S, 2, 'No gap', 0.6);
  if (za > 0.003) {
    const xa = nlX(1, 12), xb = nlX(1, 11);
    const Z = { x0: 640, x1: 1280, y0: 640, y1: 830 };
    dashed(xa, NL.y + 8, Z.x0, Z.y0, C.now, za * 0.6, 1.5);
    dashed(xb, NL.y + 8, Z.x1, Z.y0, C.now, za * 0.6, 1.5);
    box(Z.x0, Z.y0, Z.x1 - Z.x0, Z.y1 - Z.y0, C.now, za, 1.5, 'rgba(0,0,0,0.55)');
    const ha = a * Q(S, 2, 'No gap', 0.6, 0.6);
    line(Z.x0 + 110, 670, Z.x0 + 110, 760, C.now, ha, 4);
    line(Z.x1 - 110, 670, Z.x1 - 110, 760, C.now, ha, 4);
    txt('1/12', Z.x0 + 110, 795, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.now, a: ha });
    txt('1/11', Z.x1 - 110, 795, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.now, a: ha });
    arrow(W / 2 - 40, 715, Z.x0 + 120, 715, C.white, ha, 2);
    arrow(W / 2 + 40, 715, Z.x1 - 120, 715, C.white, ha, 2);
    txt(`1/${GAP12[1]}`, W / 2, 726, { size: 32, fam: F.math, w: 700, align: 'center', c: C.white, a: ha });
    txt(`least gap over all pairs = ${GAP12[0]}/${GAP12[1]} · 最小间距`, 180, 770, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: za });
    txt('= 1/(12 × 11)', 180, 810, { size: 24, fam: F.math, w: 700, c: C.cyan, a: za });
    stamp(`GAP ≥ 1/${GAP12[1]}`, 1540, 740, a * Q(S, 2, 'one hundred thirty-two', 0.6), C.cyan, 40, -0.06);
  }
};

/* ======================================================================= */
/*                           scene 4 · RAISE THE HORIZON                      */
/* ======================================================================= */
const CI = { x: 470, y: 530, r: 235 };
const cxy = u => { const [X, Y] = cay(u); return [CI.x + CI.r * X, CI.y - CI.r * Y]; };
function arcTo(u0, u1, col, a, lw = 4) {
  if (a <= 0.003) return;
  const t0 = Math.atan2(cay(u0)[1], cay(u0)[0]), t1 = Math.atan2(cay(u1)[1], cay(u1)[0]);
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw;
  ctx.beginPath(); ctx.arc(CI.x, CI.y, CI.r, -t0, -t1, true); ctx.stroke(); ctx.restore();
}
/* a Cayley point with its label (label alpha la, offset dx, dy) */
function cpt(u, lab, col, a, la, dx, dy, name = 'c') {
  if (a <= 0.003) return;
  const [x, y] = cxy(u);
  dot(x, y, 15, name, a);
  txt(lab, x + dx, y + dy, { size: 24, fam: F.mono, w: 700, c: col, a: la, align: dx < 0 ? 'right' : 'left' });
}
SCENES.lift = S => {
  const a = bkFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* the rational circle with its Cayley points */
  const ca = a * at(S, 0, 0.6);
  ring(CI.x, CI.y, CI.r, C.cyan, ca * 0.6, 2);
  line(CI.x - CI.r - 30, CI.y, CI.x + CI.r + 30, CI.y, C.dim, ca * 0.5, 1.5);
  line(CI.x, CI.y + CI.r + 30, CI.x, CI.y - CI.r - 30, C.dim, ca * 0.5, 1.5);
  txt('X² + Y² = 1', CI.x - 130, CI.y + 120, { size: 22, fam: F.math, w: 700, align: 'center', c: C.dim, a: ca });
  const s1 = Q(S, 0, 'one, two times', 0.5), s2 = Q(S, 0, 'gives five, five', 0.5);
  const third = at(S, 2, 0.6), keep = 1 - 0.7 * third, gone = 1 - third;
  arcTo([0, 1], A12, C.cyan, a * s1 * keep, 5);
  arcTo(A12, P1r, C.mag, a * s2 * keep, 5);
  cpt(A12, '[1 : 2]', C.cyan, a * s1, a * s1, 22, -14);
  cpt(A13, '[1 : 3]', C.cyan, a * s1 * keep, a * s1 * gone, 24, 22);
  cpt(P1r, '[1 : 1]', C.now, a * s2 * keep, a * s2 * gone, 24, -18, 'g');
  /* second product */
  const t1 = a * Q(S, 2, 'two, five', 0.5), t2 = a * Q(S, 2, 'gives nine, eight', 0.5);
  cpt(A25, '[2 : 5]', C.cyan, t1, t1, 24, 26);
  arcTo(A12, P2r, C.now, t2, 5);
  cpt(P2r, '[9 : 8]', C.now, t2, t2, -24, -18, 'g');
  /* Cayley coordinates, below the circle */
  txt('[1 : 2] ↦ (3/5, 4/5)    [1 : 1] ↦ (0, 1)', 150, 808, { size: 20, fam: F.mono, w: 700, c: C.dim, a: a * s2 * gone });
  txt('[9 : 8] ↦ (−17/145, 144/145)', 150, 808, { size: 20, fam: F.mono, w: 700, c: C.dim, a: t2 });
  /* right: the integer arithmetic */
  const pa = a * at(S, 0, 0.6, 0.4);
  if (pa <= 0.003) return;
  panel(880, 190, 900, 640, pa, C.cyan, 'CIRCLE PRODUCT · 齐次圆群乘法 (ch. 2)');
  txt('(p₁, q₁) ⊙ (p₂, q₂) = (p₁q₂ + q₁p₂,  q₁q₂ − p₁p₂)', 910, 262, { size: 26, fam: F.math, w: 700, c: C.white, a: pa });
  const r1 = a * Q(S, 0, 'one, two times', 0.5);
  txt('(1, 2) ⊙ (1, 3) = (1·3 + 2·1,  2·3 − 1·1) = (5, 5)', 910, 336, { size: 28, fam: F.math, w: 700, c: C.white, a: r1 });
  txt('norm 5 × 10 = 50 = 5² + 5²', 910, 376, { size: 22, fam: F.math, w: 700, c: C.dim, a: r1 });
  const r2 = a * Q(S, 0, 'at height five', 0.5), r3 = a * Q(S, 1, 'cancels', 0.5);
  txt('height 5', 910, 440, { size: 30, fam: F.mono, w: 700, c: C.now, a: r2 * (1 - 0.6 * r3) });
  txt('÷ 5  →  [1 : 1]   height 1', 1100, 440, { size: 30, fam: F.mono, w: 700, c: C.cyan, a: r3 });
  const r4 = a * Q(S, 2, 'two, five', 0.5);
  txt('(1, 2) ⊙ (2, 5) = (1·5 + 2·2,  2·5 − 1·2) = (9, 8)', 910, 530, { size: 28, fam: F.math, w: 700, c: C.white, a: r4 });
  txt('norm 5 × 29 = 145 = 9² + 8²   ·   gcd(9, 8) = 1', 910, 570, { size: 22, fam: F.math, w: 700, c: C.dim, a: r4 });
  /* horizon meter */
  const ma = a * at(S, 0, 0.6, 1.0), up = a * Q(S, 2, 'rises on demand', 0.6);
  txt('HORIZON · 视界', 910, 650, { size: 18, fam: F.mono, w: 700, c: C.cyan, a: ma, ls: 2 });
  chip(1010, 720, 200, 70, 'M = 3', up > 0.5 ? C.cyan : C.now, ma, 32);
  arrow(1130, 720, 1290, 720, C.white, up, 3);
  chip(1410, 720, 220, 70, 'M′ = 9', C.now, up, 32);
  txt('always a finite number · 永远是有限数', 1320, 800, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a * at(S, 2, 0.5, 3.0) });
};

/* ======================================================================= */
/*                           scene 5 · THREE MOTHER LAWS                      */
/* ======================================================================= */
const LAWS = [
  { y: 190, h: 200, head: 'LAW I · 无源消去与三元结合', rows: [['[x, x, z] = z        [x, z, z] = x', 34], ['[[x, y, z], u, v] = [x, y, [z, u, v]]', 34]] },
  { y: 405, h: 250, rowStep: 46, head: 'LAW II · 保真度 κ', rows: [['κ(x, y) = κ(y, x) ≥ 0     κ(x, y) = 1 ⇔ x = y', 27], ['κ([x,u,v], [y,u,v]) = κ([u,v,x], [u,v,y]) = κ(x, y)', 27], ['Σᵢⱼ cᵢ cⱼ κ(xᵢ, xⱼ) ≥ 0  (cᵢ ∈ ℚ)', 27], ['inf κ = 0 · zero or arbitrarily small readings · 读数为零或任意逼近零', 24]] },
  { y: 670, h: 160, head: 'LAW III · 极小非对易自锁', rows: [['∃ x, y, z :  [x, y, z] ≠ [z, y, x]', 36], ['+ minimal self-lock · 极小自锁', 20]] }
];
SCENES.laws = S => {
  const a = bkFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const cl = curLine(S);
  /* line 0: two props removed */
  const ra = a * at(S, 0, 0.5) * (1 - at(S, 1, 0.5));
  struck('1', 330, 520, ra * Q(S, 0, 'privileged origin', 0.5), 150);
  struck('+', 560, 520, ra * Q(S, 0, 'plus sign', 0.5), 150);
  txt('origin · 原点', 330, 600, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ra * Q(S, 0, 'privileged origin', 0.5) });
  txt('plus · 加号', 560, 600, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ra * Q(S, 0, 'plus sign', 0.5) });
  /* line 1: the two primitives, schematic */
  const da = a * at(S, 1, 0.6);
  if (da > 0.003) {
    panel(140, 190, 640, 640, da, C.cyan, 'TWO PRIMITIVES · 两个原语');
    tag(160, 250, 'SCHEMATIC · 示意', C.argued, da);
    const X = [440, 380], Y = [250, 300], Z = [260, 560], R = [Z[0] + X[0] - Y[0], Z[1] + X[1] - Y[1]];
    const t1 = a * Q(S, 1, 'the relation of x', 0.6), t2 = a * Q(S, 1, 'onto z', 0.8);
    dot(Y[0], Y[1], 15, 'c', da); txt('y', Y[0] - 34, Y[1] + 8, { size: 30, fam: F.math, w: 700, c: C.white, a: da });
    dot(X[0], X[1], 15, 'c', da); txt('x', X[0] + 22, X[1] + 8, { size: 30, fam: F.math, w: 700, c: C.white, a: da });
    arrow(Y[0] + 12, Y[1] + 8, X[0] - 14, X[1] - 9, C.mag, t1, 4);
    dot(Z[0], Z[1], 15, 'c', da * t1); txt('z', Z[0] - 34, Z[1] + 8, { size: 30, fam: F.math, w: 700, c: C.white, a: da * t1 });
    const ex = lerp(Z[0], R[0], t2), ey = lerp(Z[1], R[1], t2);
    if (t2 > 0.01) arrow(Z[0] + 12, Z[1] + 8, ex - 14 * t2, ey - 9 * t2, C.mag, t2, 4);
    dot(R[0], R[1], 17, 'g', t2); txt('[x, y, z]', R[0] + 26, R[1] + 10, { size: 30, fam: F.math, w: 700, c: C.now, a: t2 });
    const ka = a * Q(S, 1, 'a fidelity', 0.6);
    dot(220, 760, 13, 'c', ka); dot(690, 760, 13, 'c', ka);
    line(234, 760, 676, 760, C.cyan, ka, 3);
    txt('κ(x, y) ∈ ℚ', 455, 740, { size: 30, fam: F.math, w: 700, align: 'center', c: C.cyan, a: ka });
    txt('alignment · 对齐程度', 455, 800, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ka });
  }
  /* lines 2–4: the three laws */
  LAWS.forEach((L, i) => {
    const la = a * at(S, i + 2, 0.6);
    if (la <= 0.003) return;
    const col = cl === i + 2 ? C.now : C.argued;
    panel(830, L.y, 950, L.h, la, col, L.head);
    L.rows.forEach(([s, size], j) => txt(s, 860, L.y + 82 + j * (L.rowStep ?? 54), { size, fam: s.includes('·') ? F.zh : F.math, w: 700, c: size < 24 ? C.dim : C.white, a: la }));
  });
  tag(1560, 250, 'MODEL · 模型', C.argued, a * at(S, 2, 0.6) * (cl === 2 ? 0 : 1));
};

/* ======================================================================= */
/*                               scene 6 · FOR FREE                           */
/* ======================================================================= */
const ABSENT = ['π', 'e', 'φ', 'ℝ', '+', '1', '3'];
SCENES.free = S => {
  const a = bkFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const ta = a * at(S, 0, 0.6);
  ABSENT.forEach((s, i) => struck(s, 300 + i * 120, 260, ta * clamp(at(S, 0, 2.4) * 7 - i), 50));
  txt('not in the laws · 法则里没有', 1180, 250, { size: 24, fam: F.zh, w: 700, c: C.mag, a: ta });
  txt('yet derived · 却可推出', 1180, 286, { size: 22, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 0, 'yet bounds', 0.5) });
  /* left: κ ≤ 1 from the Gram form */
  const ga = a * at(S, 1, 0.6);
  if (ga > 0.003) {
    const cl = curLine(S);
    panel(140, 330, 800, 500, ga, cl === 1 ? C.now : C.argued, 'κ ≤ 1 FOR FREE · 上界白得');
    txt('n = 2,   (c₁, c₂) = (1, −1)', 180, 410, { size: 30, fam: F.math, w: 700, c: C.white, a: ga });
    const mx = 220, my = 450;
    txt('G =', mx - 40, my + 70, { size: 32, fam: F.math, w: 700, c: C.white, a: ga });
    line(mx + 40, my, mx + 40, my + 110, C.white, ga, 2.5); line(mx + 40, my, mx + 52, my, C.white, ga, 2.5); line(mx + 40, my + 110, mx + 52, my + 110, C.white, ga, 2.5);
    line(mx + 250, my, mx + 250, my + 110, C.white, ga, 2.5); line(mx + 250, my, mx + 238, my, C.white, ga, 2.5); line(mx + 250, my + 110, mx + 238, my + 110, C.white, ga, 2.5);
    [['1', 0, 0], ['κ', 1, 0], ['κ', 0, 1], ['1', 1, 1]].forEach(([s, c, r]) => txt(s, mx + 95 + c * 100, my + 45 + r * 50, { size: 32, fam: F.math, w: 700, align: 'center', c: s === 'κ' ? C.cyan : C.white, a: ga }));
    txt('κ(x, x) = κ(y, y) = 1', mx + 300, my + 70, { size: 24, fam: F.math, w: 700, c: C.dim, a: ga });
    const ea = a * Q(S, 1, 'two minus two kappa', 0.5);
    txt('1·1 + 1·1 − 2κ = 2 − 2κ ≥ 0', 180, 670, { size: 34, fam: F.math, w: 700, c: C.white, a: ea });
    const fa = a * Q(S, 1, 'kappa is at most one', 0.5);
    txt('⟹  κ(x, y) ≤ 1', 180, 760, { size: 44, fam: F.math, w: 700, c: C.now, a: fa, ab: 2 });
  }
  /* right: any point is home */
  const ha = a * at(S, 2, 0.6);
  if (ha > 0.003) {
    const cl = curLine(S);
    panel(980, 330, 800, 500, ha, cl >= 2 ? C.now : C.argued, 'ANY POINT IS HOME · 任一点皆可为家');
    const R0 = [1380, 492], rr = 84, n = 6;
    const hop = at(S, 3, Math.max(0.5, lineAt(S, 3).e - lineAt(S, 3).s - 0.6), 0.4);
    const home = Math.floor(hop * 5.999);
    for (let i = 0; i < n; i++) {
      const an = -Math.PI / 2 + i * TAU / n, x = R0[0] + rr * Math.cos(an), y = R0[1] + rr * Math.sin(an);
      const isH = i === home;
      dot(x, y, isH ? 17 : 12, isH ? 'g' : 'c', ha);
      if (isH) txt('o', x + (Math.cos(an) > 0.1 ? 24 : Math.cos(an) < -0.1 ? -40 : -8), y + (Math.sin(an) > 0.5 ? 42 : Math.sin(an) < -0.5 ? -22 : 10), { size: 30, fam: F.math, w: 700, c: C.now, a: ha });
    }
    const d1 = a * Q(S, 2, 'x star z', 0.5), d2 = a * Q(S, 2, 'x inverse', 0.5), d3 = a * Q(S, 3, 'a group', 0.5);
    txt('x ⋆ₒ z := [x, o, z]', 1010, 640, { size: 32, fam: F.math, w: 700, c: C.white, a: d1 });
    txt('x⁻¹ := [o, x, o]', 1430, 640, { size: 32, fam: F.math, w: 700, c: C.white, a: d2 });
    txt('x ⋆ₒ x⁻¹ = [[x, o, o], x, o] = [x, x, o] = o', 1010, 712, { size: 28, fam: F.math, w: 700, c: C.cyan, a: d3 });
    txt('[o, o, z] = z   ·   [x, o, o] = x   ·   identity o', 1010, 770, { size: 24, fam: F.math, w: 700, c: C.dim, a: d3 });
  }
};

/* ======================================================================= */
/*                            scene 7 · CLASS, NOT AXIOM                      */
/* ======================================================================= */
const CLASS_LINES = [
  ['class OmegaSpace (M : Type) where', C.cyan],
  ['  triad       : M → M → M → M', C.cyan],
  ['  kappa       : M → M → QRat', C.cyan],
  ['  idemp_left  : ∀ x z, triad x x z = z', C.white],
  ['  idemp_right : ∀ x z, triad x z z = x', C.white],
  ['  assoc_triad : triad (triad x y z) u v = …', C.white],
  ['  kappa_refl  : ∀ x, kappa x x = QRat.one', C.white],
  ['  kappa_symm  : ∀ x y, kappa x y = kappa y x', C.white],
  ['  kappa_inv_r, kappa_inv_l  -- transport invariance', C.white]
];
SCENES.klass = S => {
  const a = bkFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [3, 'the quaternion group', 'computed'], [4, null, 'argued']]);
  const cl = curLine(S);
  const later = 1 - 0.5 * at(S, 2, 0.6);
  /* left: the raw axiom and its explosion */
  const xa = a * at(S, 0, 0.6) * later;
  if (xa > 0.003) {
    panel(140, 190, 780, 335, xa, cl <= 0 ? C.now : C.mag, 'RAW AXIOM · 裸公理');
    txt('Lean trusts it unchecked · 内核无条件信任', 170, 262, { size: 22, fam: F.zh, w: 700, c: C.dim, a: xa });
    const b1 = a * Q(S, 0, 'declare kappa', 0.5) * later;
    txt('axiom kappa_refl : ∀ x, kappa x x = 1', 170, 330, { size: 26, fam: F.mono, w: 700, c: C.mag, a: b1 });
    const b2 = a * Q(S, 0, 'forget the zero quadruple', 0.5) * later;
    txt('x := z₀ = (0, 0, 0, 0)', 170, 400, { size: 28, fam: F.math, w: 700, c: C.white, a: b2 });
    txt('reading of z₀ is 0 · 零四元组读数为 0', 170, 440, { size: 22, fam: F.zh, w: 700, c: C.dim, a: b2 });
    const b3 = a * Q(S, 0, 'zero equals one', 0.5) * later;
    txt('⟹  0 = 1', 170, 500, { size: 44, fam: F.math, w: 700, c: C.now, a: b3, ab: 2 });
    stamp('FALSE', 690, 480, a * Q(S, 1, 'everything is provable', 0.6) * later, C.mag, 54, -0.08);
  }
  const ia = a * Q(S, 1, 'cannot compute', 0.6) * later;
  if (ia > 0.003) {
    panel(140, 550, 780, 280, ia, C.mag, 'DATA AND PROOF · 数据与证明');
    txt('axiom n : Nat', 170, 613, { size: 23, fam: F.mono, w: 700, c: C.white, a: ia });
    txt('match n with | 0 => 0 | Nat.succ k => k', 170, 644, { size: 23, fam: F.mono, w: 700, c: C.white, a: ia });
    txt('Match stuck · no implementation for n · n 无可执行实现', 170, 675, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ia });
    const pa = a * Q(S, 1, 'Project forty-two', 0.6) * later;
    txt('axiom h : 42 = 42', 170, 726, { size: 23, fam: F.mono, w: 700, c: C.white, a: pa });
    txt('(⟨42, h⟩ : {k : Nat // k = 42}).val  ↦  42', 170, 757, { size: 23, fam: F.mono, w: 700, c: C.white, a: pa });
    txt('Proof erases · Prop 证明可擦除', 170, 788, { size: 22, fam: F.zh, w: 700, c: C.dim, a: pa });
  }
  /* right: the schematic class */
  const ka = a * at(S, 2, 0.6);
  if (ka > 0.003) {
    panel(970, 190, 810, 370, ka, cl === 2 ? C.now : C.cyan, 'SCHEMATIC INTERFACE · 教学接口');
    CLASS_LINES.forEach(([s, c], i) => txt(s, 995, 252 + i * 34, { size: 21, fam: F.mono, w: 700, c, a: ka * clamp(at(S, 2, 1.6, 0.2) * 9 - i) }));
    txt('operations · 运算', 1600, 286, { size: 18, fam: F.zh, w: 700, c: C.cyan, a: ka * 0.9 });
    txt('certificates · 证书', 1600, 388, { size: 18, fam: F.zh, w: 700, c: C.white, a: ka * 0.9 });
  }
  /* right bottom: the Q8 test of the interface */
  const qa = a * at(S, 3, 0.6);
  if (qa > 0.003) {
    panel(970, 580, 810, 250, qa, C.cyan, 'TEST · Q₈,  [x, y, z] = x y⁻¹ z,  κ ≡ 1');
    const r1 = a * Q(S, 3, 'passes', 0.5), r2 = a * Q(S, 3, 'yet kappa', 0.5), r3 = a * at(S, 4, 0.5);
    txt('every listed field holds · checked here on all of Q₈', 995, 650, { size: 22, fam: F.disp, w: 700, c: C.cyan, a: r1 });
    txt('ij = k ≠ −k = ji   ·   order matters', 995, 692, { size: 24, fam: F.math, w: 700, c: C.cyan, a: r1 });
    txt('κ(1, −1) = 1  but  1 ≠ −1   ✗ separation', 995, 740, { size: 26, fam: F.math, w: 700, c: C.now, a: r2 });
    txt('inf κ = 1   ✗ zero-reaching', 995, 784, { size: 24, fam: F.math, w: 700, c: C.white, a: r3 });
    txt('prove each law on the carrier · 逐条补证', 995, 818, { size: 18, fam: F.zh, w: 700, c: C.dim, a: r3 });
  }
};

/* ======================================================================= */
/*                                 scene 8 · FLOOR                            */
/* ======================================================================= */
SCENES.close = S => {
  closingCard(S, { from: 0.1, y: 330 });
  const a = clamp((S.u - 2.0) / 0.8) * clamp((S.d - S.u) / 1.2);
  txt('On screen: computed examples, models and written arguments', W / 2, 720, { size: 22, fam: F.disp, w: 700, align: 'center', c: C.dim, a });
  txt('片中依据 · 可复算的例子、模型与书面论证', W / 2, 758, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
};

/* ======================================================================= */
/*                                    poster                                 */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[4], t = sc.start + 6;
  background(t, sc, 4, 6);
  txt(DATA.film.title_zh, W / 2, 250, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('THE BARE KERNEL AND THE MOTHER AXIOM', W / 2, 340, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 2, ls: 4 });
  txt('βδιζ  ·  ε = 1/M  ·  AXIOM-Ω  ·  class, not axiom', W / 2, 410, { size: 30, fam: F.math, w: 700, align: 'center', c: C.mag });
  ['succ', 'succ', 'succ', 'zero'].forEach((s, i) => { if (i) line(380, 480 + i * 90 - 64, 380, 480 + i * 90 - 26, C.cyan, 1, 3); chip(380, 480 + i * 90, 170, 52, s, i === 3 ? C.now : C.cyan, 1, 26); });
  panel(620, 470, 1160, 330, 1, C.argued, 'AXIOM-Ω · THREE MOTHER LAWS');
  txt('[x, x, z] = z     [x, z, z] = x', 660, 560, { size: 34, fam: F.math, w: 700, c: C.white });
  txt('κ([x,u,v], [y,u,v]) = κ(x, y)     Σ cᵢcⱼ κ(xᵢ, xⱼ) ≥ 0', 660, 640, { size: 30, fam: F.math, w: 700, c: C.white });
  txt('∃ x, y, z :  [x, y, z] ≠ [z, y, x]', 660, 720, { size: 34, fam: F.math, w: 700, c: C.white });
  bloom(0.5);
  txt(`${DATA.book.code} · FILM`, W / 2, 900, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 4, sc);
  post(0);
};
