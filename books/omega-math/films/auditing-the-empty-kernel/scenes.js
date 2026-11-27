/* Film · Auditing the Empty Kernel · 空内核审计 (book omega-math, chapter 18).
   Scenes for the shared engine theme/film/engine.js.

   What each scene shows, and where it rests (chapter 18 and Appendix A of the book):
     title      the chapter's two questions: which strict library import closures replay in an empty kernel, and
                which axioms each cited theorem uses on each backend (chapter introduction).
     layers     the three-layer architecture (18.1, a MODEL division, argued). Layer 0: IntRatio stores integer
                pairs and IntRatio.Equivalent is cross multiplication, so 2/4 ~ 1/2 because 2·2 = 4·1 (computed);
                no quotient type, no Quot.sound (18.1). Layer 1: the model laws as OmegaSpace fields (18.1, argued).
                Layer 2: the one-way shadow functor Π_ℝ to Mathlib (18.1).
     circle     the pair (1, 2): normSq 5, cayleyX = (q² − p²)/(p² + q²) = 3/5, cayleyY = 2pq/(p² + q²) = 4/5,
                κ = q²/(p² + q²) = 4/5, spread = p²/(p² + q²) = 1/5 (definitions of chapter 2, computed); the pole
                [1 : 0] ↦ (−1, 0); (1, 2)·(1, 2) = (4, 3) under projectiveMul (p₁q₂ + q₁p₂, q₁q₂ − p₁p₂), normSq 25
                (computed) ..... OmegaCircleClosure.cayley_circle_unit, kappa_add_spread_eq_one,
                cayley_antipodal_closure, projective_circle_mul_normSq (LEAN, the theorem thm-om-ch18-wave1-zero-
                axiom-circle). The small cyan dots are Cayley images of all pairs with |p|, |q| ≤ 7 (computed).
     records    the six circle theorems of thm-om-ch18-wave1-zero-axiom-circle: strict records list the libraries
                OmegaInit, OmegaMath and the axioms [] (18.1, Appendix A §A.3); the official record of
                cayley_antipodal_closure lists propext alone (18.1, Appendix A §A.6). The official column for the
                other five rows is the `axioms` field of their declaration rows at the pinned commit (each propext).
     replay     the library audit of 18.2 remark rem-om-ch18-honest-compiler-audit item 3 and Appendix A §A.6:
                prelude files, import closure of OmegaMath.Projective.Circle, collectAxioms on every declaration,
                rejection of axioms, quotients and unsafe declarations, replay in mkEmptyEnvironment. A description
                of the check (argued); the import graph is schematic.
     bridge     OmegaShadowBridge (18.1, thm-ch18-omega-shadow-bridge): toRat sends fraction a d to a/(d + 1)
                and undefined to 0; toRat(2/4) = toRat(1/2) = 1/2 ..... OmegaShadowBridge.toRat_equivalent (LEAN);
                the real shadow of (3/5, 4/5) has squared length 1 ..... OmegaShadowBridge.cayley_circle_unit (LEAN);
                the four groups of official records of the eleven bridge theorems: [] (1), propext (1),
                Quot.sound + propext (3), Classical.choice + Quot.sound + propext (6) (18.1, Appendix A §A.4).
     prototype  the readable Init.Rat prototype omega_math_grand_kernel_verified of 18.2: its eight clauses are
                recomputed here in exact fractions and integers (computed); the Init.Rat axiom dependencies of
                Rat.add (propext, Classical.choice, Quot.sound) and the tier table of the honest audit remark
                (argued: the chapter's audit statement, not a frozen theorem).
     close      the closing card.

   On load, FILM.init checks DATA.lean against the six cited theorems and re-derives every number shown on screen by
   an independent route; any disagreement goes to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const AK_LEAN = {
  circle_unit: ['D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit', 'cayley_circle_unit', 'OmegaCircleClosure.cayley_circle_unit'],
  add_spread: ['D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_add_spread_eq_one', 'kappa_add_spread_eq_one', 'OmegaCircleClosure.kappa_add_spread_eq_one'],
  antipodal: ['D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure', 'cayley_antipodal_closure', 'OmegaCircleClosure.cayley_antipodal_closure'],
  mul_normSq: ['D5/S3/Quantum/AURICOmega/OmegaCircleClosure.projective_circle_mul_normSq', 'projective_circle_mul_normSq', 'OmegaCircleClosure.projective_circle_mul_normSq'],
  toRat_eq: ['D5/S3/Quantum/AURICOmega/OmegaShadowBridge.toRat_equivalent', 'toRat_equivalent', 'OmegaShadowBridge.toRat_equivalent'],
  bridge_unit: ['D5/S3/Quantum/AURICOmega/OmegaShadowBridge.cayley_circle_unit', 'cayley_circle_unit', 'OmegaShadowBridge.cayley_circle_unit']
};

/* reduced fractions [n, d], d > 0 */
const akG = (a, b) => (b ? akG(b, a % b) : Math.abs(a));
const fr = (n, d) => { if (d === 0) return null; const g = akG(n, d) || 1, s = d < 0 ? -1 : 1; return [s * n / g, s * d / g]; };
const frAdd = (a, b) => fr(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const frSub = (a, b) => fr(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
const frMul = (a, b) => fr(a[0] * b[0], a[1] * b[1]);
const frInv = a => fr(a[1], a[0]);
const frEq = (a, n, d) => a && a[0] * d === n * a[1];
const frS = a => (a[1] === 1 ? `${a[0]}` : `${a[0] < 0 ? '−' : ''}${Math.abs(a[0])}/${a[1]}`).replace(/^-/, '−');

/* chapter 2 definitions on integer pairs (p, q) */
const nsq = (p, q) => p * p + q * q;
const cayX = (p, q) => fr(q * q - p * p, nsq(p, q));
const cayY = (p, q) => fr(2 * p * q, nsq(p, q));
const kap = (p, q) => fr(q * q, nsq(p, q));
const spr = (p, q) => fr(p * p, nsq(p, q));
const pmul = (p1, q1, p2, q2) => [p1 * q2 + q1 * p2, q1 * q2 - p1 * p2];

/* IntRatio: fraction a d means a / (d + 1); Equivalent by cross multiplication; toRat reads it in ℚ */
const irEquiv = (x, y) => x[0] * (y[1] + 1) === y[0] * (x[1] + 1);
const toRat = x => (x === null ? [0, 1] : fr(x[0], x[1] + 1));
const IR_24 = [2, 3], IR_12 = [1, 1];

/* the Cayley images drawn as small dots: all pairs with |p|, |q| ≤ 7, not both zero */
const AK_DOTS = [];
for (let p = -7; p <= 7; p++) for (let q = -7; q <= 7; q++) if (p || q) { const X = cayX(p, q), Y = cayY(p, q); AK_DOTS.push([X[0] / X[1], Y[0] / Y[1]]); }

/* the readable Init.Rat prototype of 18.2, recomputed */
const qmul = (a, b) => [
  a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
  a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
  a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
  a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
const emod = (a, d) => ((a % d) + Math.abs(d)) % Math.abs(d);
const fracStep = (psi, gate, d) => { const pr = qmul(psi, gate); return (d !== 0 && pr.every(c => emod(c, d) === 0)) ? pr.map(c => c / d) : null; };
const detGram3 = (a, b, c) => frSub(frSub(frSub(frAdd(fr(1, 1), frMul(fr(2, 1), frMul(a, frMul(b, c)))), frMul(a, a)), frMul(b, b)), frMul(c, c));
const jetInv = j => { const i0 = frInv(j[0]), u1 = frMul(j[1], i0), u2 = frMul(j[2], i0); return [i0, frMul(fr(-1, 1), frMul(i0, u1)), frMul(i0, frSub(frMul(u1, u1), u2))]; };
const chi1 = k => frSub(frMul(fr(4, 1), k), fr(1, 1));
const PSI_XY = [1, 2, 2, 4], PSI_YX = [1, 2, 2, -4], GATE = [1, 0, -2, 0];
const PR_XY = qmul(PSI_XY, GATE), PR_YX = qmul(PSI_YX, GATE);
const ST_XY = fracStep(PSI_XY, GATE, 5), ST_YX = fracStep(PSI_YX, GATE, 5);
const HALF = fr(1, 2);
const PROTO = [
  ['I', 'pole [1 : 0] · kappa', frS(kap(1, 0))],
  ['I', 'pole [1 : 0] · spread', frS(spr(1, 0))],
  ['II', 'detGram3 (½, ½, ½)', frS(detGram3(HALF, HALF, HALF))],
  ['III', '(Jet2.inv ⟨2, 2, 1⟩).j2', frS(jetInv([fr(2, 1), fr(2, 1), fr(1, 1)])[2])],
  ['IV', 'chi1 (1/4)', frS(chi1(fr(1, 4)))],
  ['V', 'heckeT5Chi1 = chi1 (1/5)', frS(chi1(fr(1, 5)))],
  ['VI', 'step ψXY · gate ÷ 5', ST_XY ? `some ⟨${ST_XY.join(', ')}⟩` : 'none'],
  ['VI', 'step ψYX · gate ÷ 5', ST_YX ? `some ⟨${ST_YX.join(', ')}⟩` : 'none']
];
const PROTO_WANT = ['0', '1', '1/2', '1/4', '0', '−1/5', 'some ⟨1, 2, 0, 0⟩', 'none'];

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('auditing-the-empty-kernel film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };

  /* 0. the cited theorems at the pinned commit, and what their signatures talk about */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(AK_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(AK_LEAN).length}`);
  const sigHas = { circle_unit: ['cayleyX', 'cayleyY', 'Nonzero'], add_spread: ['kappa', 'spread', 'Nonzero'], antipodal: ['kappa p Int.zero', 'cayleyX p Int.zero'],
    mul_normSq: ['projectiveMul', 'normSq'], toRat_eq: ['IntRatio.Equivalent', 'toRat x = toRat y'], bridge_unit: ['toReal (cayleyX p q) ^ 2', '= 1'] };
  for (const [key, [gid, short]] of Object.entries(AK_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
    if (r.signature) for (const s of sigHas[key]) check(r.signature.includes(s), `${gid}: signature lacks ${s}`);
  }

  /* 1. LAYERS: cross multiplication */
  check(irEquiv(IR_24, IR_12) && 2 * 2 === 4 * 1, '2/4 ~ 1/2 by cross multiplication');
  check(!irEquiv(IR_24, [2, 2]), '2/4 is not equivalent to 2/3');

  /* 2. CIRCLE: the worked pair and the general laws on a grid, by the integer identity and by fractions */
  check(nsq(1, 2) === 5 && frEq(cayX(1, 2), 3, 5) && frEq(cayY(1, 2), 4, 5), '(1, 2) ↦ (3/5, 4/5), normSq 5');
  check(9 + 16 === 25 && frEq(frAdd(frMul(cayX(1, 2), cayX(1, 2)), frMul(cayY(1, 2), cayY(1, 2))), 1, 1), '(3/5)² + (4/5)² = 1');
  check(frEq(kap(1, 2), 4, 5) && frEq(spr(1, 2), 1, 5), 'κ(1, 2) = 4/5, spread = 1/5');
  for (let p = -9; p <= 9; p++) for (let q = -9; q <= 9; q++) {
    if (!p && !q) continue;
    const n = nsq(p, q);
    check((q * q - p * p) ** 2 + (2 * p * q) ** 2 === n * n, `Cayley integer identity at (${p}, ${q})`);
    check(frEq(frAdd(kap(p, q), spr(p, q)), 1, 1), `κ + spread = 1 at (${p}, ${q})`);
    const X = cayX(p, q), Y = cayY(p, q);
    check(frEq(frAdd(frMul(X, X), frMul(Y, Y)), 1, 1), `Cayley point on the circle at (${p}, ${q})`);
  }
  for (let p = -6; p <= 6; p++) if (p) check(frEq(kap(p, 0), 0, 1) && frEq(spr(p, 0), 1, 1) && frEq(cayX(p, 0), -1, 1) && frEq(cayY(p, 0), 0, 1), `antipodal closure at [${p} : 0]`);
  check(pmul(1, 2, 1, 2).join() === '4,3' && nsq(4, 3) === 25 && nsq(1, 2) * nsq(1, 2) === 25, '(1, 2)·(1, 2) = (4, 3), 25 = 5·5');
  for (let t = 0; t < 60; t++) {
    const v = [0, 1, 2, 3].map(i => Math.floor(rnd(t, i) * 19) - 9), m = pmul(v[0], v[1], v[2], v[3]);
    check(nsq(v[0], v[1]) * nsq(v[2], v[3]) === nsq(m[0], m[1]), `Brahmagupta–Fibonacci at ${v}`);
  }

  /* 3. RECORDS and 5. BRIDGE: the counts in the four official groups add up to eleven */
  check(AK_GROUPS.reduce((s, g) => s + g[1], 0) === 11, 'eleven bridge theorems in four groups');
  check(AK_ROWS.length === 6, 'six circle theorems');

  /* 4. BRIDGE: toRat on fractions and on undefined; the real shadow of (3/5, 4/5) */
  check(frEq(toRat(IR_24), 1, 2) && frEq(toRat(IR_12), 1, 2) && frEq(toRat(null), 0, 1), 'toRat(2/4) = toRat(1/2) = 1/2, toRat(undefined) = 0');
  check(Math.abs(0.6 * 0.6 + 0.8 * 0.8 - 1) < 1e-15, 'real shadow on the unit circle');
  for (let t = 0; t < 40; t++) {
    const a = Math.floor(rnd(t, 7) * 21) - 10, b = Math.floor(rnd(t, 8) * 9), k = 1 + Math.floor(rnd(t, 9) * 5);
    const x = [a, b], y = [a * k, (b + 1) * k - 1];
    check(irEquiv(x, y) && toRat(x).join() === toRat(y).join(), `equivalent fractions read alike (${x}, ${y})`);
  }

  /* 6. PROTOTYPE: the eight clauses, and a second route for each */
  PROTO.forEach((r, i) => check(r[2] === PROTO_WANT[i], `prototype clause ${i + 1}: ${r[2]} vs ${PROTO_WANT[i]}`));
  check(1 + 2 * 1 / 8 - 3 / 4 === 0.5, 'detGram3(½, ½, ½) = 1 + ¼ − ¾');
  {
    const j = [fr(2, 1), fr(2, 1), fr(1, 1)], iv = jetInv(j);
    const prod = [frMul(j[0], iv[0]), frAdd(frMul(j[0], iv[1]), frMul(j[1], iv[0])), frAdd(frAdd(frMul(j[0], iv[2]), frMul(j[1], iv[1])), frMul(j[2], iv[0]))];
    check(frEq(prod[0], 1, 1) && frEq(prod[1], 0, 1) && frEq(prod[2], 0, 1), 'Jet2 ⟨2, 2, 1⟩ · inverse = 1');
    check(frEq(iv[0], 1, 2) && frEq(iv[1], -1, 2) && frEq(iv[2], 1, 4), 'Jet2 inverse = (1/2, −1/2, 1/4)');
  }
  check(PR_XY.join() === '5,10,0,0' && PR_YX.join() === '5,-6,0,-8', 'the two gate products');
  {
    const n4 = a => a.reduce((s, c) => s + c * c, 0);
    check(n4(PR_XY) === n4(PSI_XY) * n4(GATE) && n4(PR_YX) === n4(PSI_YX) * n4(GATE) && n4(GATE) === 5 && n4(PSI_XY) === 25, 'quaternion norms multiply: 25 · 5 = 125');
  }
});
Object.assign(FILM.speed, { title: 0.02, layers: 0.016, circle: 0.016, records: 0.014, replay: 0.018, bridge: 0.016, prototype: 0.014, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const akFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function akRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  if (a <= 0.003) return x;
  let cx = x;
  const tot = parts.reduce((s, p) => s + tw(p[0], size, p[2] || fam, w), 0);
  if (o.align === 'center') cx = x - tot / 2;
  else if (o.align === 'right') cx = x - tot;
  for (const [s, col, f2] of parts) { txt(s, cx, y, { size, fam: f2 || fam, w, c: col, a }); cx += tw(s, size, f2 || fam, w); }
  return cx;
}
const AK_MISSING = new Set();
function akLean(x, y, key, a, o = {}) {
  if (a <= 0.003) return;
  const [gid, , label] = AK_LEAN[key], r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!AK_MISSING.has(gid)) { AK_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(label, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a small tier tag drawn in the colour of its tier */
function akTag(s, x, y, col, a, size = 16) {
  if (a <= 0.003) return;
  const w = tw(s, size, F.mono, 700, 1) + 16;
  box(x, y - size - 4, w, size + 12, col, a, 1.4, 'rgba(0,0,0,0.45)');
  txt(s, x + 8, y + 2, { size, fam: F.mono, w: 700, c: col, a, ls: 1 });
}

/* ======================================================================= */
/*                            scene 1 · THE AUDIT                            */
/* ======================================================================= */
SCENES.title = S => {
  const u = S.u, a = akFade(S);
  const p = clamp(u / 1.4);
  txt(`${DATA.book.code} · FILM`, W / 2, 285, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 410, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, a: a * clamp(p * 1.6), ab: 4 });
  txt(scramble('AUDITING THE EMPTY KERNEL', p, 5), W / 2, 500, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a, ls: 5, ab: 2 });
  txt('THREE LAYERS · TWO RECORDS · ONE-WAY BRIDGE', W / 2, 565, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: a * 0.9, ls: 5 });
  /* the two questions */
  const q1 = a * Q(S, 1, 'strict libraries', 0.6), q2 = a * Q(S, 1, 'which axioms', 0.6);
  panel(170, 620, 760, 190, q1, C.cyan, 'QUESTION 1 · 问题一');
  txt('Which strict import closures', 200, 700, { size: 30, fam: F.disp, w: 700, c: C.white, a: q1 });
  txt('replay in an empty kernel?', 200, 742, { size: 30, fam: F.disp, w: 700, c: C.white, a: q1 });
  txt('哪些严格库能在空内核中重放？', 200, 785, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: q1 });
  panel(990, 620, 760, 190, q2, C.mag, 'QUESTION 2 · 问题二');
  txt('Which axioms does each theorem', 1020, 700, { size: 30, fam: F.disp, w: 700, c: C.white, a: q2 });
  txt('use, backend by backend?', 1020, 742, { size: 30, fam: F.disp, w: 700, c: C.white, a: q2 });
  txt('每条定理在两端各用了哪些公理？', 1020, 785, { size: 24, fam: F.zh, w: 700, c: C.mag, a: q2 });
};

/* ======================================================================= */
/*                           scene 2 · THREE LAYERS                          */
/* ======================================================================= */
SCENES.layers = S => {
  const a = akFade(S);
  badgeQ(S, [[0, null, 'computed'], [2, null, 'argued']]);
  /* the stack, bottom up */
  const X0 = 140, WS = 800;
  const kA = a, l0 = a * clamp(S.u / 0.8), l1 = a * at(S, 2, 0.7), l2 = a * Q(S, 2, 'Layer two', 0.7);
  /* kernel */
  box(X0, 720, WS, 90, C.dim, kA * 0.9, 1.5, 'rgba(0,0,0,0.4)');
  txt('Lean kernel (CIC) · 内核', X0 + 24, 762, { size: 26, fam: F.zh, w: 700, c: C.white, a: kA * 0.85 });
  txt('unchanged · 不改动', X0 + WS - 24, 762, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.dim, a: kA * 0.85 });
  txt('no custom axiom · 不自添公理', X0 + WS - 24, 794, { size: 18, fam: F.zh, w: 700, align: 'right', c: C.dim, a: kA * 0.75 });
  /* layer 0 */
  const foc0 = S.u < lineAt(S, 2).s;
  panel(X0, 545, WS, 150, l0, foc0 ? C.now : C.cyan, 'LAYER 0 · 免商整数载体');
  txt('Omega.Nat  ·  Omega.Int  ·  Omega.IntRatio', X0 + 24, 612, { size: 26, fam: F.mono, w: 700, c: C.white, a: l0 });
  txt('module + prelude · 不导入官方 Init', X0 + 24, 660, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: l0 });
  /* layer 1 */
  const foc1 = !foc0 && S.u < phraseAt(S, 2, 'Layer two');
  panel(X0, 370, WS, 150, l1, foc1 ? C.now : C.cyan, 'LAYER 1 · 类型类字段');
  txt('OmegaSpace: laws as fields', X0 + 24, 437, { size: 26, fam: F.mono, w: 700, c: C.white, a: l1 });
  txt('模型定律写成实例必须证明的字段', X0 + 24, 485, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: l1 });
  /* layer 2 */
  const foc2 = S.u >= phraseAt(S, 2, 'Layer two');
  panel(X0, 195, WS, 150, l2, foc2 ? C.now : C.argued, 'LAYER 2 · 单向阴影函子');
  akRich([['Π', C.argued], ['ℝ', C.argued], [' : OmegaMath → Mathlib', C.white, F.mono]], X0 + 24, 262, { size: 28, a: l2 });
  txt('ℕ  ℤ  ℚ  ℝ  · one way · 单向', X0 + 24, 310, { size: 22, fam: F.zh, w: 700, c: C.argued, a: l2 });
  /* arrows between the layers */
  arrow(X0 + WS / 2, 545, X0 + WS / 2, 522, C.cyan, l1, 3);
  arrow(X0 + WS / 2, 370, X0 + WS / 2, 347, C.argued, l2, 3);

  /* right: the worked equivalence (lines 0–1), the fields (line 2), the bridge (line 3) */
  const RX = 1010, RW = 790;
  panel(RX, 195, RW, 615, a, C.cyan, 'IntRatio.Equivalent · 交叉相乘');
  const e0 = a * Q(S, 0, 'two fourths', 0.6), e1 = a * Q(S, 0, 'since two times', 0.6);
  akRich([['2/4', C.now], ['   ~   ', C.white], ['1/2', C.cyan]], RX + RW / 2, 300, { size: 64, align: 'center', a: e0 });
  akRich([['2 × 2', C.now], ['  =  4  =  ', C.white], ['4 × 1', C.cyan]], RX + RW / 2, 375, { size: 40, align: 'center', a: e1 });
  const e2 = a * at(S, 1, 0.6);
  txt('equal by cross multiplication', RX + RW / 2, 440, { size: 26, fam: F.disp, w: 700, align: 'center', c: C.white, a: e2 });
  if (e2 > 0.003) {
    const s = 'no quotient type · no Quot.sound', wq = tw(s, 26, F.mono, 700);
    txt(s, RX + RW / 2, 490, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.now, a: e2 });
    txt('不用商类型 · 不用 Quot.sound', RX + RW / 2, 528, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.now, a: e2 * 0.9 });
    void wq;
  }
  /* fields of the schematic OmegaSpace (chapter 1, quoted in 18.1) */
  const f = a * at(S, 2, 0.6);
  const FIELDS = ['cancel', 'assoc', 'refl', 'symm', 'invariance'];
  FIELDS.forEach((s, i) => {
    const fa = f * clamp((S.u - lineAt(S, 2).s - 0.25 * i) / 0.5);
    chip(RX + 95 + i * 150, 600, 140, 48, s, C.cyan, fa, 17);
  });
  txt('an instance must prove every field', RX + RW / 2, 665, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: f });
  const g = a * Q(S, 2, 'Layer two', 0.6);
  akRich([['OmegaMath', C.cyan, F.mono], ['  ──▶  ', C.argued], ['Mathlib ℝ', C.argued, F.mono], ['   ✕ ◀──', C.dim]], RX + RW / 2, 745, { size: 28, align: 'center', a: g });
  txt('one way only · 只出不回', RX + RW / 2, 785, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.argued, a: g });
};

/* ======================================================================= */
/*                         scene 3 · THE STRICT CIRCLE                       */
/* ======================================================================= */
SCENES.circle = S => {
  const a = akFade(S);
  badgeQ(S, [[0, null, 'computed'], [1, 'Lean checks', 'lean'], [3, null, 'computed'], [3, 'squared norm', 'lean']]);
  const ox = 500, oy = 500, R = 280;
  const P = (x, y) => [ox + R * x, oy - R * y];
  /* axes and circle */
  line(ox - R - 40, oy, ox + R + 40, oy, C.dim, a * 0.5, 1.2); line(ox, oy + R + 40, ox, oy - R - 40, C.dim, a * 0.5, 1.2);
  ring(ox, oy, R, C.cyan, a * 0.55, 2);
  txt('X', ox + R + 50, oy + 8, { size: 22, fam: F.math, w: 700, c: C.dim, a });
  txt('Y', ox + 8, oy - R - 48, { size: 22, fam: F.math, w: 700, c: C.dim, a });
  /* line 2: every integer pair lands on the circle */
  const da = a * Q(S, 1, 'every pair', 1.2);
  AK_DOTS.forEach((d, i) => { const q = P(d[0], d[1]); dot(q[0], q[1], 6, 'c', da * clamp((S.u - phraseAt(S, 1, 'every pair')) * 3 - (i % 25) * 0.04)); });
  /* the pair (1, 2) and its Cayley image (3/5, 4/5) */
  const p1 = a * Q(S, 0, 'three fifths', 0.8);
  const pt = P(0.6, 0.8);
  if (p1 > 0.003) {
    dashed(pt[0], pt[1], pt[0], oy, C.now, p1 * 0.7, 2); dashed(pt[0], pt[1], ox, pt[1], C.now, p1 * 0.7, 2);
    line(ox, oy, pt[0], pt[1], C.now, p1, 3);
    dot(pt[0], pt[1], 16, 'g', p1);
    txt('(3/5, 4/5)', pt[0] + 20, pt[1] - 22, { size: 30, fam: F.math, w: 700, c: C.now, a: p1 });
    txt('3/5', (ox + pt[0]) / 2, oy + 34, { size: 22, fam: F.math, w: 700, align: 'center', c: C.now, a: p1 });
    txt('4/5', ox - 14, pt[1] + 8, { size: 22, fam: F.math, w: 700, align: 'right', c: C.now, a: p1 });
  }
  /* the pole [1 : 0] ↦ (−1, 0) */
  const pa = a * Q(S, 2, 'the pole', 0.8), pp = P(-1, 0);
  if (pa > 0.003) {
    dot(pp[0], pp[1], 16, 'm', pa);
    txt('[1 : 0] ↦ (−1, 0)', pp[0] + 24, pp[1] + 44, { size: 26, fam: F.math, w: 700, c: C.mag, a: pa });
  }
  /* the ledger */
  const LX = 1000, LW = 800;
  panel(LX, 190, LW, 640, a, C.cyan, 'STRICT CORE · OmegaCircleClosure');
  const r0 = a * Q(S, 0, 'one, two', 0.6);
  akRich([['(p, q) = ', C.white], ['(1, 2)', C.now], ['    normSq = 1 + 4 = ', C.white], [`${nsq(1, 2)}`, C.now]], LX + 28, 262, { size: 30, a: r0 });
  const r1 = a * Q(S, 0, 'Cayley map', 0.6);
  akRich([['cayleyX = (q² − p²)/(p² + q²) = ', C.white], [frS(cayX(1, 2)), C.now]], LX + 28, 320, { size: 28, a: r1 });
  akRich([['cayleyY = 2pq/(p² + q²) = ', C.white], [frS(cayY(1, 2)), C.now]], LX + 28, 365, { size: 28, a: r1 });
  const r1b = a * Q(S, 0, 'nine plus sixteen', 0.6);
  akRich([['(3/5)² + (4/5)² = (9 + 16)/25 = ', C.white], ['1', C.now]], LX + 28, 415, { size: 28, a: r1b });
  akLean(LX + 28, 470, 'circle_unit', a * Q(S, 1, 'Lean checks', 0.6));
  const r3 = a * at(S, 2, 0.6);
  akRich([['κ = ', C.white], [frS(kap(1, 2)), C.now], ['   spread = ', C.white], [frS(spr(1, 2)), C.now], ['   κ + spread = 1', C.white]], LX + 28, 535, { size: 28, a: r3 });
  const r3b = a * Q(S, 2, 'the pole', 0.6);
  akRich([['[1 : 0]:  κ = 0,  spread = 1,  ↦ (−1, 0)', C.mag]], LX + 28, 580, { size: 28, a: r3b });
  akLean(LX + 28, 628, 'add_spread', r3);
  akLean(LX + 28, 666, 'antipodal', r3b);
  const r4 = a * at(S, 3, 0.6), r4b = a * Q(S, 3, 'squared norm', 0.6);
  const m = pmul(1, 2, 1, 2);
  akRich([['(1, 2) · (1, 2) = ', C.white], [`(${m[0]}, ${m[1]})`, C.now], [`    ${m[0]}² + ${m[1]}² = ${nsq(m[0], m[1])} = 5 · 5`, C.white]], LX + 28, 730, { size: 28, a: r4 });
  akLean(LX + 28, 790, 'mul_normSq', r4b);
  /* stamp: line 2, every pair lands exactly */
  const sp = Q(S, 1, 'lands exactly', 0.5);
  stamp('EXACT · 精确', ox, oy + R + 10, sp * a * (1 - at(S, 2, 0.6)), C.lean, 40, -0.06);
};

/* ======================================================================= */
/*                            scene 4 · TWO RECORDS                          */
/* ======================================================================= */
const AK_ROWS = [
  ['ProjectiveOverlapScaling.kappa_scale', 'propext'],
  ['OmegaCircleClosure.kappa_scale', 'propext'],
  ['OmegaCircleClosure.kappa_add_spread_eq_one', 'propext'],
  ['OmegaCircleClosure.cayley_circle_unit', 'propext'],
  ['OmegaCircleClosure.cayley_antipodal_closure', 'propext'],
  ['OmegaCircleClosure.projective_circle_mul_normSq', 'propext']
];
SCENES.records = S => {
  const a = akFade(S);
  badgeQ(S, [[0, null, 'lean']]);
  const X0 = 130, Y0 = 290, RH = 64;
  const cS = 1040, cA = 1370, cO = 1560;
  panel(110, 185, 1700, 640, a, C.cyan, `FROZEN RECORDS · 冻结记录 @ ${(DATA.pin && DATA.pin.commit || '').slice(0, 12)}`);
  const s1 = a * Q(S, 0, 'The strict one', 0.6), s2 = a * Q(S, 1, 'keeps its own', 0.6), s3 = a * at(S, 2, 0.6);
  txt('declaration · 声明', X0 + 20, Y0 - 24, { size: 20, fam: F.zh, w: 700, c: C.dim, a });
  txt('strict_omega.libraries', cS, Y0 - 24, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: s1 });
  txt('.axioms', cA, Y0 - 24, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: s1 });
  txt('axioms (official)', cO, Y0 - 24, { size: 20, fam: F.mono, w: 700, c: C.mag, a: s2 });
  line(X0, Y0 - 8, 1790, Y0 - 8, C.dim, a * 0.6, 1.2);
  AK_ROWS.forEach((r, i) => {
    const y = Y0 + 32 + i * RH, ra = a * clamp((S.u - 0.3 - 0.25 * i) / 0.5);
    const hot = i === 4;
    if (hot && s2 > 0.003) fillBox(X0, y - 38, 1660, RH - 6, rgba(C.now, 0.1), s2);
    txt(r[0], X0 + 20, y, { size: 24, fam: F.mono, w: 700, c: C.white, a: ra });
    txt('OmegaInit, OmegaMath', cS, y, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: s1 * clamp((S.u - phraseAt(S, 0, 'The strict one') - 0.15 * i) / 0.4) });
    txt('[]', cA + 30, y, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: s1 * clamp((S.u - phraseAt(S, 0, 'empty axiom list') - 0.12 * i) / 0.4) });
    txt(r[1], cO, y, { size: 24, fam: F.mono, w: 700, c: hot ? C.now : C.mag, a: s2 * (hot ? 1 : 0.85) });
  });
  /* line 3: the two columns stay apart */
  if (s3 > 0.003) {
    const xw = cO - 34;
    ctx.save(); ctx.setLineDash([8, 8]); line(xw, Y0 - 40, xw, Y0 + 6 * RH, C.now, s3, 3); ctx.restore();
    txt('strict · 严格端', xw - 20, Y0 + 6 * RH + 40, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.cyan, a: s3 });
    txt('official · 官方端', xw + 20, Y0 + 6 * RH + 40, { size: 22, fam: F.zh, w: 700, c: C.mag, a: s3 });
  }
  txt('Golden/Frozen/state/<module>.lean.json · declarations[]', X0 + 20, 800, { size: 18, fam: F.mono, w: 700, c: C.dim, a: a * 0.9 });
};

/* ======================================================================= */
/*                           scene 5 · EMPTY KERNEL                          */
/* ======================================================================= */
/* schematic import graph below the root module: nodes [x, y, label, parents] */
const AK_NODES = [
  [470, 270, 'OmegaMath.Projective.Circle', []],
  [300, 390, 'IntRatio', [0]],
  [640, 390, 'Ratio', [0]],
  [300, 490, 'Int', [1]],
  [470, 575, 'Nat', [2, 3]]
];
SCENES.replay = S => {
  const a = akFade(S);
  badgeQ(S, [[0, null, 'argued']]);
  const g0 = a * Q(S, 0, 'Pick a strict root', 0.6), g1 = a * Q(S, 0, 'follow its imports', 1.4);
  const fly = clamp((S.u - phraseAt(S, 2, 'then replays') - 0.6) / 1.6);
  /* the closure frame */
  box(150, 205, 660, 445, C.blue, g1 * (1 - 0.6 * fly), 2);
  txt('import closure · 导入闭包', 170, 636, { size: 20, fam: F.zh, w: 700, c: C.blue, a: g1 * (1 - 0.6 * fly) });
  txt('schematic · 示意', 790, 636, { size: 18, fam: F.zh, w: 700, align: 'right', c: C.argued, a: g1 * (1 - 0.6 * fly) });
  /* nodes fly into the empty environment on line 3 */
  const EX = 1375, EY = 700;
  const TG = [[EX, EY - 20], [EX - 300, EY + 55], [EX - 100, EY + 55], [EX + 100, EY + 55], [EX + 300, EY + 55]];
  const pos = (n, i) => { const f = ease(clamp(fly * 1.3 - i * 0.07)); return [lerp(n[0], TG[i][0], f), lerp(n[1], TG[i][1], f)]; };
  AK_NODES.forEach((n, i) => {
    const na = i === 0 ? g0 : g1 * clamp(g1 * 5 - i);
    const [x, y] = pos(n, i);
    for (const pi of n[3]) { const [px, py] = pos(AK_NODES[pi], pi); line(px, py + 22, x, y - 22, C.cyan, na * 0.7 * (1 - fly), 2); }
    const s = n[2], size = i === 0 ? 22 : 24, w = tw(s, size, F.mono, 700) + 30;
    const sz = 1 - 0.15 * ease(clamp(fly * 1.3 - i * 0.07));
    chip(x, y, w * sz, 46 * sz, s, i === 0 ? C.now : C.cyan, na, size * sz);
    /* line 1: each strict file opens with prelude */
    const pr = a * Q(S, 1, 'opens with prelude', 0.4, 0.15 * i) * (1 - clamp(fly * 5));
    if (pr > 0.003) txt('prelude', x + w / 2 + 6, y - 26, { size: 16, fam: F.mono, w: 700, c: C.cyan, a: pr });
  });
  /* official Init, kept out */
  const ia = a * Q(S, 1, 'nothing comes', 0.6) * (1 - fly);
  if (ia > 0.003) {
    chip(400, 740, 220, 50, 'official Init', C.dim, ia, 22);
    line(300, 720, 500, 760, C.open, ia, 3); line(300, 760, 500, 720, C.open, ia, 3);
    txt('不借官方 Init', 530, 748, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ia });
  }
  /* the auditor: checks on every declaration of the closure */
  const AX = 950, AW = 850;
  const ca = a * at(S, 2, 0.6);
  panel(AX, 205, AW, 330, ca * (1 - 0.5 * fly), C.cyan, 'OmegaChecks.Audit · 逐条声明');
  const CHECKS = [
    ['collectAxioms = ∅', '传递公理依赖为空'],
    ['no .axiomInfo', '没有公理声明'],
    ['no .quotInfo', '没有商类型'],
    ['no unsafe', '没有 unsafe 声明']
  ];
  CHECKS.forEach((c, i) => {
    const y = 280 + i * 62, ci = ca * Q(S, 2, i <= 1 ? 'rejects any axiom' : i === 2 ? 'any quotient' : 'anything unsafe', 0.5);
    txt('✓', AX + 30, y, { size: 30, fam: F.math, w: 700, c: C.cyan, a: ci });
    txt(c[0], AX + 80, y, { size: 26, fam: F.mono, w: 700, c: C.white, a: ci });
    txt(c[1], AX + AW - 30, y, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.cyan, a: ci * 0.9 });
  });
  /* the scanner sweeps the closure while line 2 plays */
  const sc = clamp((S.u - lineAt(S, 2).s) / Math.max(0.5, phraseAt(S, 2, 'then replays') - lineAt(S, 2).s));
  if (ca > 0.003 && sc < 1) line(160, 215 + 420 * sc, 800, 215 + 420 * sc, C.now, ca * 0.6, 2);
  /* the empty environment */
  const ea = a * at(S, 2, 0.6), eh = a * Q(S, 2, 'then replays', 0.6);
  box(950, 570, 850, 250, eh ? C.now : C.dim, Math.max(ea * 0.5, eh), 2.5, 'rgba(0,0,0,0.5)');
  txt('mkEmptyEnvironment', 975, 610, { size: 24, fam: F.mono, w: 700, c: eh > 0.003 ? C.now : C.dim, a: ea });
  txt('toKernelEnv.replay', 1775, 610, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: eh });
  txt('empty · 空', EX, EY + 20, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ea * (1 - clamp(fly * 4)) });
};

/* ======================================================================= */
/*                          scene 6 · ONE-WAY BRIDGE                         */
/* ======================================================================= */
const AK_GROUPS = [
  ['[]', 1, 'toStdNat_add'],
  ['propext', 1, 'toStdNat_mul'],
  ['Quot.sound, propext', 3, 'toStdInt_neg / add / mul'],
  ['Classical.choice, Quot.sound, propext', 6, 'toRat_* · cayley · kappa']
];
SCENES.bridge = S => {
  const a = akFade(S);
  badgeQ(S, [[0, null, 'lean']]);
  /* the wall */
  const WX = 900;
  fillBox(WX, 195, 36, 380, rgba(C.cyan, 0.18), a);
  box(WX, 195, 36, 380, C.cyan, a, 2);
  txt('OmegaMath · strict', 150, 225, { size: 22, fam: F.mono, w: 700, c: C.cyan, a });
  txt('Mathlib · ℚ ℝ', 1770, 225, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.argued, a });
  /* line 0: toRat */
  const t0 = a * Q(S, 0, 'toRat reads', 0.6), t1 = a * Q(S, 0, 'undefined as zero', 0.6);
  akRich([['fraction a d', C.cyan, F.mono], ['  ↦  ', C.white], ['a / (d + 1)', C.argued]], 520, 290, { size: 30, align: 'center', a: t0 });
  akRich([['undefined', C.cyan, F.mono], ['  ↦  ', C.white], ['0', C.argued]], 520, 340, { size: 30, align: 'center', a: t1 });
  arrow(WX - 40, 315, WX + 80, 315, C.argued, t0, 3);
  txt('toRat', WX + 96, 322, { size: 22, fam: F.mono, w: 700, c: C.argued, a: t0 });
  /* line 1: 2/4 and 1/2 land on one rational */
  const f1 = a * at(S, 1, 0.6), fl = ease(Q(S, 1, 'both read', 1.0));
  chip(380, 440, 120, 56, '2/4', C.now, f1, 30, F.math);
  chip(380, 520, 120, 56, '1/2', C.cyan, f1, 30, F.math);
  txt('~', 380, 490, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: f1 });
  if (fl > 0.003) {
    const tx = 1180, ty = 480;
    line(440, 440, lerp(440, tx - 60, fl), lerp(440, ty, fl), C.now, a, 2.5);
    line(440, 520, lerp(440, tx - 60, fl), lerp(520, ty, fl), C.cyan, a, 2.5);
    chip(tx, ty, 160, 60, '1/2 : ℚ', C.argued, a * fl, 30, F.math);
  }
  akLean(150, 610, 'toRat_eq', f1);
  /* line 2: the real shadow of the circle point */
  const c2 = a * Q(S, 1, 'and the point', 0.6);
  if (c2 > 0.003) {
    const cx = 1560, cy = 370, r = 110;
    ring(cx, cy, r, C.argued, c2 * 0.8, 2);
    line(cx - r - 20, cy, cx + r + 20, cy, C.dim, c2 * 0.5, 1); line(cx, cy - r - 20, cx, cy + r + 20, C.dim, c2 * 0.5, 1);
    line(cx, cy, cx + 0.6 * r, cy - 0.8 * r, C.now, c2, 3);
    dot(cx + 0.6 * r, cy - 0.8 * r, 12, 'g', c2);
    txt('(3/5)² + (4/5)² = 1 in ℝ', cx, cy + r + 52, { size: 24, fam: F.math, w: 700, align: 'center', c: C.white, a: c2 });
  }
  akLean(1000, 610, 'bridge_unit', c2);
  /* line 3: the four groups of official records */
  const g = a * at(S, 2, 0.6);
  txt('official axioms of the 11 bridge theorems · 十一条桥接定理的官方公理记录', 150, 678, { size: 20, fam: F.zh, w: 700, c: C.mag, a: g });
  const GX = [150, 470, 790, 1170], GW = [290, 290, 350, 630];
  AK_GROUPS.forEach((gr, i) => {
    const ga = g * Q(S, 2, i === 0 ? 'from nothing' : i === 1 ? 'to propext' : i === 2 ? 'up to choice' : 'quotients and propext', 0.5);
    const y = 770;
    box(GX[i], y - 62, GW[i], 76, C.mag, ga, 1.6, 'rgba(0,0,0,0.5)');
    txt(gr[0], GX[i] + 14, y - 26, { size: 22, fam: F.mono, w: 700, c: C.white, a: ga });
    txt(`×${gr[1]}  ${gr[2]}`, GX[i] + 14, y + 4, { size: 17, fam: F.mono, w: 700, c: C.mag, a: ga * 0.9 });
  });
  /* line 4: nothing flows back */
  const b4 = a * at(S, 3, 0.6);
  if (b4 > 0.003) {
    arrow(WX + 140, 380, WX - 100, 380, C.dim, b4, 3);
    line(WX - 20, 355, WX + 60, 405, C.open, b4, 4); line(WX - 20, 405, WX + 60, 355, C.open, b4, 4);
  }
};

/* ======================================================================= */
/*                           scene 7 · HONEST AUDIT                          */
/* ======================================================================= */
const AK_TIERS = [
  ['Init.Rat prototype', 'propext, Classical.choice, Quot.sound', C.argued],
  ['QRat prototype', '∅ · #print axioms', C.cyan],
  ['strict libraries', 'empty-kernel replay', C.cyan],
  ['D5 consumers', 'strict_omega.axioms | axioms', C.cyan],
  ['OmegaShadowBridge', '[] … choice, Quot.sound, propext', C.mag]
];
SCENES.prototype = S => {
  const a = akFade(S);
  badgeQ(S, [[0, null, 'computed'], [2, null, 'argued']]);
  /* left: the eight clauses */
  const LX = 120, LW = 800;
  panel(LX, 185, LW, 640, a, C.cyan, 'omega_math_grand_kernel_verified · Init.Rat');
  PROTO.forEach((r, i) => {
    const y = 252 + i * 62, ra = a * clamp((S.u - 0.3 - 0.35 * i) / 0.5);
    akTag(r[0], LX + 20, y, C.dim, ra, 16);
    txt(r[1], LX + 90, y, { size: 23, fam: F.mono, w: 700, c: C.white, a: ra });
    const ok = a * clamp((S.u - phraseAt(S, 1, 'all eight clauses') - 0.22 * i) / 0.4);
    txt(`= ${r[2]}`, LX + LW - 60, y, { size: 24, fam: F.math, w: 700, align: 'right', c: i >= 6 ? C.now : C.cyan, a: Math.max(ra * 0.25, ok) });
    txt('✓', LX + LW - 22, y, { size: 26, fam: F.math, w: 700, align: 'right', c: C.cyan, a: ok });
  });
  /* right top: the gate */
  const RX = 970, RW = 830;
  const ga = a * Q(S, 0, 'a gate that divides', 0.6);
  panel(RX, 185, RW, 300, ga, C.now, 'Ω-FRACTRAN GATE ÷ 5 · 闸门');
  const gp = a * Q(S, 1, 'the gate passes', 0.6), gb = a * Q(S, 1, 'blocks the other', 0.6);
  akRich([['⟨1, 2, 2, 4⟩ · ⟨1, 0, −2, 0⟩ = ', C.white], [`⟨${PR_XY.join(', ')}⟩`, C.now]], RX + 24, 260, { size: 25, a: ga });
  akRich([['÷ 5  →  ', C.white], [`⟨${ST_XY.join(', ')}⟩  pass · 放行`, C.cyan]], RX + 24, 305, { size: 25, a: gp });
  akRich([['⟨1, 2, 2, −4⟩ · ⟨1, 0, −2, 0⟩ = ', C.white], [`⟨${PR_YX.join(', ').replace(/-/g, '−')}⟩`, C.now]], RX + 24, 385, { size: 25, a: ga });
  akRich([['−6 mod 5 = 4 ≠ 0  →  ', C.white], ['blocked · 拦下', C.mag]], RX + 24, 430, { size: 25, a: gb });
  /* right bottom: the tiers of the honest audit remark */
  const ta = a * at(S, 2, 0.6);
  panel(RX, 515, RW, 310, ta, C.argued, 'HONEST AUDIT · 诚实审计');
  AK_TIERS.forEach((t, i) => {
    const y = 580 + i * 50, tia = i === 0 ? ta : a * Q(S, 3, 'honest audit', 0.4, 0.25 * i);
    txt(t[0], RX + 24, y, { size: 21, fam: F.mono, w: 700, c: i === 0 ? C.now : C.white, a: tia });
    txt(t[1], RX + RW - 24, y, { size: 19, fam: F.mono, w: 700, align: 'right', c: t[2], a: tia });
  });
  stamp('BLUEPRINT · 蓝图', LX + LW / 2, 775, a * Q(S, 3, 'as a blueprint', 0.5), C.argued, 36, -0.03);
};

/* ======================================================================= */
/*                                  closing                                  */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 250 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[3], t = sc.start + 6;
  background(t, sc, 1, 6);
  const ox = 1380, oy = 520, R = 250;
  ring(ox, oy, R, C.cyan, 0.6, 2);
  line(ox - R - 30, oy, ox + R + 30, oy, C.dim, 0.5, 1.2); line(ox, oy - R - 30, ox, oy + R + 30, C.dim, 0.5, 1.2);
  AK_DOTS.forEach(d => dot(ox + R * d[0], oy - R * d[1], 6, 'c', 0.9));
  line(ox, oy, ox + 0.6 * R, oy - 0.8 * R, C.now, 1, 3); dot(ox + 0.6 * R, oy - 0.8 * R, 16, 'g', 1);
  dot(ox - R, oy, 16, 'm', 1);
  txt(DATA.film.title_zh, 600, 440, { size: 110, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('AUDITING THE', 600, 550, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('EMPTY KERNEL', 600, 620, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 5 });
  akRich([['strict: []', C.cyan, F.mono], ['   ·   ', C.white], ['official: propext', C.mag, F.mono]], 600, 705, { size: 28, align: 'center' });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 600, 775, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 1, sc);
  post(0);
};
