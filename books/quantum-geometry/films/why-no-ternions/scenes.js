/* Film · Why three won't multiply · 三维乘不拢
   (book quantum-geometry, part VIII: chapter 32.2). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     hook     Hamilton's breakfast question of October 1843 (his letter of 1865; literature, argued); triplets add and
              subtract slot by slot; the cross product of two arrows (its definition).
     leak     solid shot: the three-slot box, a = (1, 2, 2), b = (0, 3, 4), |a| = 3, |b| = 5; a × b = (2, −4, 3) stands
              out of their plane, |a × b| = √29 ≈ 5.39 is the parallelogram's area; squared, 29 of (|a||b|)² = 225;
              the shadow of b on a is 14/3 and a·b = |a| × 14/3 = 14 (196 = 14² fills the gap) has no slot in
              the cross product; a × a = 0 (computed).
     receipt  the receipt analogy (argued); 14² + 29 = 196 + 29 = 225 = 15² (computed)
              ..... LagrangeGramIdentity.lagrange_gram_identity (LEAN); in three dimensions the plane areas
              a_i b_j − a_j b_i are the components of a × b: 2, −4, 3 (computed); dot and cross are two legs of one
              right triangle with hypotenuse |a||b|.
     fourth   one more slot, a number: (s, v)(t, w) = (st − v·w, sw + tv + v × w) (Hamilton 1843; literature);
              a b = (−14; 2, −4, 3), length √(196 + 29) = 15 = 3 × 5, a a = (−9; 0, 0, 0) (computed).
     forced   on E = ℝ × ℝ³, every relation D with P2 D and PB D equals ±(0, a⃗ × b⃗), and the Pauli images multiply as
              φ(a) φ(b) = φ(a ∘ b) − i φ(D a b), with a ∘ b = (a₀b₀ + a⃗·b⃗, a₀b⃗ + b₀a⃗) and φ(m, v) = m 𝟙 + v·σ
              ..... OriginalClassification.complete_consequences (LEAN); the pure-arrow example is computed.
     edge     Frobenius (1878, associative), Hurwitz (1898, normed) and Hopf (1940, any): literature, not formalized in the book; what Lean checks here;
              the reading of the triplet as a closed arc body S³ is the book's model (argued).

   On load, FILM.init checks DATA.lean against the two theorems and re-derives every number on screen by an
   independent route (2×2 Pauli matrices for the quaternion product, the identity on random lists, the minors).
   Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const WT_LEAN = {
  lagrange_gram_identity: 'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  complete_consequences: 'D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences'
};
const WT_A = [1, 2, 2], WT_B = [0, 3, 4];
const wtDot = (u, v) => u.reduce((s, x, i) => s + x * v[i], 0);
const wtCross = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
const wtAdd = (u, v) => u.map((x, i) => x + v[i]);
const wtSc = (u, k) => u.map(x => x * k);
/* quaternions as [s, x, y, z] */
const wtQmul = (p, q) => {
  const s = p[0], v = p.slice(1), t = q[0], w = q.slice(1);
  const vw = wtAdd(wtAdd(wtSc(w, s), wtSc(v, t)), wtCross(v, w));
  return [s * t - wtDot(v, w), ...vw];
};
const WT_CR = wtCross(WT_A, WT_B);                       // (2, −4, 3)
const WT_DOT = wtDot(WT_A, WT_B);                        // 14
const WT_AB = wtQmul([0, ...WT_A], [0, ...WT_B]);        // (−14; 2, −4, 3)
const WT_AA = wtQmul([0, ...WT_A], [0, ...WT_A]);        // (−9; 0, 0, 0)

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('why-no-ternions film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(WT_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(WT_LEAN).length}`);
  for (const [short, gid] of Object.entries(WT_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. LEAK: the numbers on screen */
  check(wtDot(WT_A, WT_A) === 9 && wtDot(WT_B, WT_B) === 25, '|a| = 3, |b| = 5');
  check(WT_CR[0] === 2 && WT_CR[1] === -4 && WT_CR[2] === 3, 'a × b = (2, −4, 3)');
  check(wtDot(WT_CR, WT_CR) === 29 && near(Math.sqrt(29), 5.385164807134504) && Math.sqrt(29).toFixed(2) === '5.39', '|a × b| = √29 ≈ 5.39');
  check(wtDot(WT_CR, WT_A) === 0 && wtDot(WT_CR, WT_B) === 0, 'a × b is perpendicular to a and b');
  check(WT_DOT === 14, 'a·b = 14');
  check(wtCross(WT_A, WT_A).every(x => x === 0), 'a × a = 0');
  /* 2. RECEIPT: 196 + 29 = 225 = 15², and the plane areas a_i b_j − a_j b_i are the cross components */
  check(14 * 14 === 196 && 196 + 29 === 225 && 15 * 15 === 225 && 3 * 5 === 15, '196 + 29 = 225 = 15²');
  let half = 0;
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) half += Math.pow(WT_A[i] * WT_B[j] - WT_A[j] * WT_B[i], 2);
  check(half / 2 === 29, 'half the double sum is 29');
  check(WT_A[1] * WT_B[2] - WT_A[2] * WT_B[1] === 2 && WT_A[2] * WT_B[0] - WT_A[0] * WT_B[2] === -4 && WT_A[0] * WT_B[1] - WT_A[1] * WT_B[0] === 3, 'minors yz, zx, xy = 2, −4, 3');
  for (let k = 0; k < 60; k++) {
    const n = 1 + (k % 7), u = [], v = [];
    for (let i = 0; i < n; i++) { u.push(4 * rnd(k, i) - 2); v.push(4 * rnd(k, i + 20) - 2); }
    let h = 0; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) h += Math.pow(u[i] * v[j] - u[j] * v[i], 2);
    check(near(wtDot(u, u) * wtDot(v, v) - Math.pow(wtDot(u, v), 2), h / 2, 1e-9), `Lagrange identity ${k}`);
    if (n === 3) { const c = wtCross(u, v); check(near(wtDot(c, c), h / 2, 1e-9), `3D areas are the cross product ${k}`); }
  }
  /* 3. FOURTH: the quaternion product, cross-checked with 2×2 complex matrices q ↦ s 𝟙 − i (x σx + y σy + z σz) */
  check(WT_AB[0] === -14 && WT_AB[1] === 2 && WT_AB[2] === -4 && WT_AB[3] === 3, 'a b = (−14; 2, −4, 3)');
  check(wtDot(WT_AB, WT_AB) === 225, '|a b|² = 225');
  check(WT_AA[0] === -9 && WT_AA.slice(1).every(x => x === 0), 'a a = −9');
  const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mat = q => [[[q[0], -q[3]], [-q[2], -q[1]]], [[q[2], -q[1]], [q[0], q[3]]]];
  const mmul = (A, B) => [0, 1].map(i => [0, 1].map(j => cadd(cm(A[i][0], B[0][j]), cm(A[i][1], B[1][j]))));
  for (let k = 0; k < 40; k++) {
    const p = [0, 1, 2, 3].map(i => 4 * rnd(k, 90 + i) - 2), q = [0, 1, 2, 3].map(i => 4 * rnd(k, 99 + i) - 2);
    const L = mmul(mat(p), mat(q)), R = mat(wtQmul(p, q));
    let ok = true; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) for (let c = 0; c < 2; c++) ok = ok && near(L[i][j][c], R[i][j][c], 1e-9);
    check(ok, `quaternion product matches 2×2 matrices ${k}`);
    check(near(wtDot(wtQmul(p, q), wtQmul(p, q)), wtDot(p, p) * wtDot(q, q), 1e-9), `|pq| = |p||q| ${k}`);
  }
  /* 4. FORCED: Pauli products of pure arrows, (a·σ)(b·σ) = (a·b) 𝟙 + i (a × b)·σ */
  const pauli = v => [[[v[2], 0], [v[0], -v[1]]], [[v[0], v[1]], [-v[2], 0]]];
  const PP = mmul(pauli(WT_A), pauli(WT_B)), PC = pauli(WT_CR);
  const want = [0, 1].map(i => [0, 1].map(j => cadd([i === j ? WT_DOT : 0, 0], cm([0, 1], PC[i][j]))));
  let ok4 = true; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) for (let c = 0; c < 2; c++) ok4 = ok4 && near(PP[i][j][c], want[i][j][c]);
  check(ok4, '(a·σ)(b·σ) = 14 𝟙 + i (2, −4, 3)·σ');
});
Object.assign(FILM.speed, { hook: 0.02, leak: 0.012, receipt: 0.014, fourth: 0.016, forced: 0.014, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const wtFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const wtVec = v => `(${v.map(x => (x < 0 ? '−' : '') + Math.abs(x)).join(', ')})`;
function wtRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, p[2] || fam, w), 0) / 2;
  for (const [s, col, fm] of parts) { txt(s, cx, y, { size, fam: fm || fam, w, c: col, a, ab: o.ab }); cx += tw(s, size, fm || fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const WT_MISSING = new Set();
function wtLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!WT_MISSING.has(gid)) { WT_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a small tag under a panel: what kind of statement this is */
function wtTag(x, y, en, zh, col, a, size = 18) {
  if (a <= 0.003) return;
  const t = `${en} · `;
  txt(t, x, y, { size, fam: F.mono, w: 700, c: col, a });
  txt(zh, x + tw(t, size, F.mono, 700), y + 1, { size: size + 1, fam: F.zh, w: 700, c: col, a });
}
/* a row of slot cells: labels and values, the receipt / carrier drawing */
function wtSlots(x, y, cw, ch, cells, a) {
  if (a <= 0.003) return;
  cells.forEach((c, i) => {
    const ca = a * (c.a == null ? 1 : c.a);
    if (ca <= 0.003) return;
    const cx = x + i * (cw + 12);
    fillBox(cx, y, cw, ch, c.col, ca * 0.16);
    box(cx, y, cw, ch, c.col, ca, 2);
    if (c.head) txt(c.head, cx + cw / 2, y - 14, { size: 20, fam: F.zh, w: 700, align: 'center', c: c.col, a: ca });
    if (c.v != null) txt(c.v, cx + cw / 2, y + ch / 2 + 15, { size: 42, fam: F.mono, w: 700, align: 'center', c: C.white, a: ca });
  });
}
/* opening title */
function wtTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble("WHY THREE WON'T MULTIPLY", p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('TRIPLETS · CROSS · SHADOW · RECEIPT · FOURTH SLOT · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                               scene 1 · BREAKFAST                         */
/* ======================================================================= */
SCENES.hook = S => {
  const u = S.u;
  wtTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, 'arrows in space', 'computed']]);
  /* the question, as a quote card (literature) */
  panel(150, 200, 760, 300, a, C.argued, 'DUBLIN · OCTOBER 1843');
  txt('“Well, Papa, can you', 190, 300, { size: 44, fam: F.disp, w: 700, c: C.white, a });
  txt('multiply triplets?”', 190, 360, { size: 44, fam: F.disp, w: 700, c: C.white, a });
  const na = a * Q(S, 1, 'He shook his head', 0.6);
  txt('“No, I can only add and subtract them.”', 190, 440, { size: 28, fam: F.disp, w: 700, c: C.argued, a: na });
  wtTag(170, 535, 'Hamilton, letter to his son, 1865', '文献', C.argued, a * 0.95, 18);
  /* add, subtract, multiply */
  panel(1010, 200, 780, 460, a, C.cyan, 'TRIPLETS · 三元组');
  const rows = [
    ['(x, y, z) + (x′, y′, z′)', 'slot by slot · 逐位相加', C.cyan, 0],
    ['(x, y, z) − (x′, y′, z′)', 'slot by slot · 逐位相减', C.cyan, 0],
    ['(x, y, z) × (x′, y′, z′)', '?', C.white, 1]
  ];
  rows.forEach(([f, note, col, k], i) => {
    const ra = a * (k ? Q(S, 1, 'only add', 0.6) : 1);
    txt(f, 1040, 290 + i * 80, { size: 32, fam: F.math, w: 700, c: C.white, a: ra });
    txt(note, 1760, 290 + i * 80, { size: k ? 40 : 22, fam: k ? F.orb : F.zh, w: 700, align: 'right', c: col, a: ra });
  });
  const ca = a * Q(S, 2, 'the cross product', 0.7);
  if (ca > 0.003) {
    line(1040, 520, 1760, 520, C.dim, ca * 0.6, 1.2);
    txt('cross product · 叉乘', 1040, 562, { size: 24, fam: F.zh, w: 700, c: C.mag, a: ca });
    txt('a × b = (a₂b₃ − a₃b₂,  a₃b₁ − a₁b₃,  a₁b₂ − a₂b₁)', 1040, 616, { size: 28, fam: F.math, w: 700, c: C.mag, a: ca });
  }
  const wa = a * Q(S, 2, "Why isn't", 0.6);
  if (wa > 0.003) chip(530, 680, 600, 76, "why isn't that enough? · 为何不够？", C.now, wa, 28, F.zh);
};

/* ======================================================================= */
/*                          scene 2 · WHAT THE CROSS DROPS                   */
/* ======================================================================= */
const LK = { x: 110, y: 170, w: 960, h: 680, cx: 560, cy: 540, unit: 78 };
const LK_BOX = { vertices: [], faces: [[0, 1, 3, 2], [4, 6, 7, 5], [0, 4, 5, 1], [2, 3, 7, 6], [0, 2, 6, 4], [1, 5, 7, 3]] };
for (const x of [-0.5, 2.5]) for (const y of [-4.5, 3.5]) for (const z of [0, 4.6]) LK_BOX.vertices.push([x, y, z]);
SCENES.leak = S => {
  const u = S.u, a = wtFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const yaw = 2.74 + 0.003 * u, pitch = 0.6;
  const O = [0, 0, 0], AB = wtAdd(WT_A, WT_B);
  const pa = Q(S, 0, 'Take two arrows', 0.8), pb = Q(S, 0, 'b is', 0.8);
  const pc = Q(S, 1, 'stands up', 1.0), pr = Q(S, 1, 'their area', 0.8);
  const ps = Q(S, 3, 'shadow on a', 0.8), pd = Q(S, 3, 'throws it away', 1.2);
  const foot = wtSc(WT_A, WT_DOT / 9);                    // the shadow of b on the line of a
  const sh = solid('leak', { x: LK.x, y: LK.y, w: LK.w, h: LK.h, yaw, pitch, unit: LK.unit, cx: LK.cx, cy: LK.cy, px: true });
  sh.begin();
  sh.poly('box', LK_BOX, { color: C.blue, alpha: 0.06, edges: C.cyan });
  sh.line([[-0.5, 0, 0], [2.5, 0, 0]], { color: C.dim, width: 1.2, alpha: 0.5 });
  sh.line([[0, -4.5, 0], [0, 3.5, 0]], { color: C.dim, width: 1.2, alpha: 0.5 });
  sh.line([[0, 0, 0], [0, 0, 4.6]], { color: C.dim, width: 1.2, alpha: 0.5 });
  if (pr > 0.003) sh.fan([O, WT_A, AB, WT_B], { fill: C.mag, alpha: 0.28 * pr, color: C.mag, width: 2, strokeAlpha: 0.8 * pr });
  if (pa > 0.003) sh.arrow(O, WT_A, { color: C.white, width: 5, headSize: 22, alpha: pa });
  if (pb > 0.003) sh.arrow(O, WT_B, { color: C.white, width: 5, headSize: 22, alpha: pb });
  if (pc > 0.003) sh.arrow(O, wtSc(WT_CR, ease(pc)), { color: C.mag, width: 6, headSize: 24, alpha: 1 });
  if (ps > 0.003) {
    sh.line([O, foot], { color: C.cyan, width: 9, alpha: ps * (1 - 0.6 * pd) });
    sh.line([WT_B, foot], { color: C.white, width: 1.5, alpha: 0.6 * ps, dash: [8, 8] });
  }
  sh.end(a);
  /* 2D labels on the solid */
  const lA = sh.anchor(WT_A), lB = sh.anchor(WT_B), lC = sh.anchor(WT_CR), lO = sh.anchor(O);
  txt('a = (1, 2, 2)', lA.x - 22, lA.y + 34, { size: 26, fam: F.math, w: 700, align: 'right', c: C.white, a: a * pa });
  txt('b = (0, 3, 4)', lB.x - 22, lB.y - 14, { size: 26, fam: F.math, w: 700, align: 'right', c: C.white, a: a * pb });
  if (pc > 0.5) txt('a × b = (2, −4, 3)', lC.x + 22, lC.y + 10, { size: 26, fam: F.math, w: 700, c: C.mag, a: a * clamp((pc - 0.5) * 2) });
  if (pc > 0.5) txt('⊥ plane · 垂直于平面', lC.x + 22, lC.y + 44, { size: 20, fam: F.zh, w: 700, c: C.mag, a: a * 0.85 * clamp((pc - 0.5) * 2) });
  /* the dropped dot product: a cyan 14 falling out of the box, clear of the arrow labels */
  if (ps > 0.003) {
    const fall = ei(pd);
    const fx = lO.x + 150, fy = lerp(lO.y + 50, LK.y + LK.h - 40, fall);
    txt('a·b = 14', fx, fy, { size: 30, fam: F.math, w: 700, align: 'center', c: C.cyan, a: a * Q(S, 3, 'which makes fourteen', 0.6) });
    if (pd > 0.6) txt('no slot · 无处安放', fx, fy + 34, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: a * clamp((pd - 0.6) * 2.5) });
  }
  txt('the three-slot box · 三格方盒', LK.x + 40, LK.y + 30, { size: 20, fam: F.zh, w: 700, c: C.dim, a });
  /* readouts */
  panel(1150, 190, 660, 420, a, C.cyan, 'LENGTHS · 长度');
  wtRich([['|a| = 3     |b| = 5', C.white]], 1180, 262, { size: 32, a: a * pb });
  wtRich([['|a × b| = √29 ≈ 5.39', C.mag]], 1180, 322, { size: 32, a: a * pr });
  txt('area of the parallelogram · 平行四边形面积', 1180, 356, { size: 19, fam: F.zh, w: 700, c: C.mag, a: a * pr * 0.9 });
  /* line 2: everything squared; the gap is 196 = 14², filled on line 3 */
  const pq = Q(S, 2, 'Now square everything', 0.6);
  wtRich([['(|a| |b|)² = 15² = 225', C.white]], 1180, 420, { size: 32, a: a * pq });
  if (pq > 0.003) {
    const bw = 560, bx = 1180, by = 440, w29 = bw * 29 / 225;
    box(bx, by, bw, 38, C.white, a * pq * 0.6, 1.2);
    fillBox(bx, by, w29, 38, C.mag, a * pq * 0.6);
    txt('29', bx + w29 / 2, by + 27, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: a * pq });
    const fill = Q(S, 3, 'which makes fourteen', 0.8);
    if (fill > 0.003) {
      fillBox(bx + w29, by, (bw - w29) * fill, 38, C.cyan, a * 0.5);
      txt('196 = 14²', bx + w29 + (bw - w29) / 2, by + 27, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: a * fill });
    }
    txt('?', bx + bw - 26, by + 29, { size: 30, fam: F.orb, w: 900, c: C.now, a: a * Q(S, 2, 'Where did', 0.5) * (1 - fill) });
  }
  wtRich([['shadow of b on a = 14/3 ≈ 4.67', C.cyan]], 1180, 530, { size: 24, a: a * Q(S, 3, 'shadow on a', 0.6) });
  wtRich([['a·b = |a| × shadow = 3 × 14/3 = 14', C.cyan]], 1180, 580, { size: 27, a: a * Q(S, 3, 'which makes fourteen', 0.6) });
  /* line 4: a × a = 0 */
  const za = a * at(S, 4, 0.6);
  if (za > 0.003) {
    panel(1150, 640, 660, 190, za, C.now, 'SQUARE IT · 自乘');
    wtRich([['a × a = (0, 0, 0)', C.now]], 1180, 712, { size: 34, a: za });
    txt('nonzero × nonzero = 0  ⇒  no division · 无法做除法', 1180, 770, { size: 21, fam: F.zh, w: 700, c: C.white, a: za * Q(S, 4, 'so you can never divide', 0.6) });
  }
};

/* ======================================================================= */
/*                            scene 3 · AN HONEST RECEIPT                    */
/* ======================================================================= */
SCENES.receipt = S => {
  const u = S.u, a = wtFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'computed'], [4, null, 'argued']]);
  /* the receipt (an analogy) */
  const rx = 150, ry = 190, rw = 640, rh = 470;
  panel(rx, ry, rw, rh, a, C.white, 'RECEIPT · 收据');
  wtTag(rx + 20, ry + rh + 34, 'analogy', '比方', C.argued, a);
  const l1 = Q(S, 0, 'a receipt', 0.6), l2 = at(S, 1, 0.6);
  const row = (y, lab, val, col, ra) => {
    if (ra <= 0.003) return;
    txt(lab, rx + 30, y, { size: 26, fam: F.zh, w: 700, c: col, a: ra });
    ctx.save(); ctx.setLineDash([3, 8]); line(rx + 240, y - 8, rx + rw - 200, y - 8, C.dim, ra * 0.6, 1.5); ctx.restore();
    txt(val, rx + rw - 30, y, { size: 30, fam: F.mono, w: 700, align: 'right', c: col, a: ra });
  };
  row(ry + 100, 'dot · 点积', '14', C.cyan, a * l1);
  row(ry + 160, 'cross · 叉乘', '(2, −4, 3)', C.mag, a * l1);
  row(ry + 240, 'squared · 平方', '196 + 29', C.white, a * l2);
  line(rx + 30, ry + 280, rx + rw - 30, ry + 280, C.white, a * l1 * 0.7, 2);
  row(ry + 330, 'total · 合计', '225', C.white, a * Q(S, 1, 'is two twenty-five', 0.6));
  row(ry + 400, '|a|²|b|² = 3²·5²', '225 ✓', C.white, a * Q(S, 1, 'fifteen squared', 0.6));
  /* the right triangle: legs 14 (cyan) and √29 (magenta), hypotenuse 15 */
  const tk = 36, T0 = [960, 770], tx = T0[0] + 14 * tk, ty = T0[1] - Math.sqrt(29) * tk;
  const tr = a * Q(S, 1, 'One ninety-six', 0.8);
  if (tr > 0.003) {
    line(T0[0], T0[1], tx, T0[1], C.cyan, tr, 8);
    line(tx, T0[1], tx, ty, C.mag, tr, 8);
    line(T0[0], T0[1], tx, ty, C.white, tr, 3);
    box(tx - 22, T0[1] - 22, 22, 22, C.dim, tr * 0.8, 1.5);
    txt('14', (T0[0] + tx) / 2 - 60, T0[1] + 38, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: tr });
    txt('√29', tx + 18, (T0[1] + ty) / 2 + 10, { size: 30, fam: F.mono, w: 700, c: C.mag, a: tr });
    txt('15 = 3 × 5', (T0[0] + tx) / 2 - 40, (T0[1] + ty) / 2 - 22, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: tr });
  }
  const lg = a * at(S, 3, 0.6);
  if (lg > 0.003) {
    txt('dot · 点积', (T0[0] + tx) / 2 - 20, T0[1] + 37, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: lg });
    txt('cross · 叉乘', tx + 18, (T0[1] + ty) / 2 + 44, { size: 22, fam: F.zh, w: 700, c: C.mag, a: lg });
  }
  /* lines 2–3: Lean */
  const la = a * Q(S, 2, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(880, 190, 930, 200, la, C.lean, 'ANY TWO LISTS OF REAL NUMBERS · 任意两组实数');
    wtRich([['(Σaᵢ²)(Σbᵢ²) − (Σaᵢbᵢ)² = ½ ΣᵢΣⱼ (aᵢbⱼ − aⱼbᵢ)²', C.white]], 905, 268, { size: 29, a: la * Q(S, 2, 'lengths squared', 0.6) });
    wtLean(905, 336, WT_LEAN.lagrange_gram_identity, la, { size: 20 });
  }
  /* line 4: in three dimensions the areas are the cross product */
  if (lg > 0.003) {
    wtRich([['3D: areas ', C.white], ['yz 2, zx −4, xy 3', C.mag], [' → 4 + 16 + 9 = 29 = |a × b|²', C.white]], 905, 444, { size: 25, a: lg });
  }
  const ha = a * Q(S, 4, 'not wrong', 0.5);
  stamp('HALF A RECEIPT', 1250, 530, ha, C.mag, 34, -0.05);
  stamp('196 + 29 = 225', 470, 790, Q(S, 2, 'Lean checks', 0.5, 0.6) * (1 - at(S, 3, 0.5)), C.cyan, 30, -0.05);
};

/* ======================================================================= */
/*                             scene 4 · ONE MORE LINE                       */
/* ======================================================================= */
SCENES.fourth = S => {
  const u = S.u, a = wtFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [3, null, 'argued']]);
  const add = Q(S, 0, 'one more line', 0.9);
  /* four slots: the number slot slides in */
  const cw = 170, ch = 96, y0 = 300, x0 = 260;
  const cells = [
    { head: 'number · 数', col: C.cyan, a: add, v: at(S, 1, 0.6) > 0 ? '−14' : 's' },
    { head: 'i', col: C.mag, v: at(S, 1, 0.6) > 0 ? '2' : 'x' },
    { head: 'j', col: C.mag, v: at(S, 1, 0.6) > 0 ? '−4' : 'y' },
    { head: 'k', col: C.mag, v: at(S, 1, 0.6) > 0 ? '3' : 'z' }
  ];
  const shift = (1 - ease(add)) * (cw + 12);
  wtSlots(x0 - shift, y0, cw, ch, cells, a);
  txt('quaternion · 四元数   s + x i + y j + z k', x0, 250, { size: 24, fam: F.zh, w: 700, c: C.white, a: a * add });
  wtTag(x0, 452, 'Hamilton, 16 October 1843: i² = j² = k² = ijk = −1', '文献', C.argued, a * add);
  /* the product rule and the example */
  panel(160, 500, 900, 300, a * at(S, 1, 0.6), C.cyan, 'MULTIPLY a AND b AGAIN · 再乘一次');
  const p1 = at(S, 1, 0.6);
  wtRich([['(s, v)(t, w) = (st − ', C.white], ['v·w', C.cyan], [',  sw + tv + ', C.white], ['v × w', C.mag], [')', C.white]], 190, 574, { size: 30, a: a * p1 });
  wtRich([['(0, a)(0, b) = (', C.white], ['−14', C.cyan], ['; ', C.white], ['2, −4, 3', C.mag], [')', C.white]], 190, 640, { size: 32, a: a * Q(S, 1, 'gets minus fourteen', 0.6) });
  wtRich([['length √(196 + 29) = 15 = 3 × 5', C.white]], 190, 704, { size: 30, a: a * Q(S, 2, 'Length fifteen', 0.6) });
  wtRich([['(0, a)(0, a) = (', C.white], ['−9', C.cyan], ['; 0, 0, 0)   not zero · 不是零', C.white, F.zh]], 190, 764, { size: 28, a: a * Q(S, 2, 'minus nine', 0.6) });
  /* right: the receipt balances */
  const ba = a * Q(S, 2, 'Nothing leaks', 0.6);
  panel(1160, 300, 650, 260, a * p1, C.white, 'THE RECEIPT · 收据');
  if (p1 > 0.003) {
    const bw = 560, bx = 1190, by = 380;
    box(bx, by, bw, 48, C.white, a * p1 * 0.6, 1.2);
    fillBox(bx, by, bw * 196 / 225, 48, C.cyan, a * p1 * 0.5);
    fillBox(bx + bw * 196 / 225, by, bw * 29 / 225, 48, C.mag, a * p1 * 0.55);
    txt('196', bx + bw * 98 / 225, by + 34, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: a * p1 });
    txt('29', bx + bw * 210.5 / 225, by + 34, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: a * p1 });
    txt('= 225 = 15²', bx, by + 100, { size: 30, fam: F.mono, w: 700, c: C.white, a: ba });
    txt('nothing leaks · 一分不漏', bx, by + 146, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: ba });
  }
  const ga = a * at(S, 3, 0.5);
  if (ga > 0.003) {
    panel(1160, 600, 650, 200, ga, C.argued);
    txt('To multiply in three,', 1190, 668, { size: 36, fam: F.disp, w: 700, c: C.white, a: ga });
    txt('keep a fourth.', 1190, 714, { size: 36, fam: F.disp, w: 700, c: C.now, a: ga });
    txt('三维要乘拢，得留第四行。', 1190, 768, { size: 26, fam: F.zh, w: 700, c: C.white, a: ga * 0.9 });
  }
};

/* ======================================================================= */
/*                           scene 5 · THE CROSS IS FORCED                   */
/* ======================================================================= */
SCENES.forced = S => {
  const u = S.u, a = wtFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'lean']]);
  /* the carrier: one number slot and three arrow slots */
  const cw = 130, ch = 80;
  wtSlots(180, 260, cw, ch, [
    { head: 'ℝ', col: C.cyan, v: 'a₀' }, { head: 'ℝ³', col: C.white, v: 'a₁' }, { col: C.white, v: 'a₂' }, { col: C.white, v: 'a₃' }
  ], a * Q(S, 0, 'one number slot', 0.6));
  txt('E = ℝ × ℝ³', 180, 400, { size: 32, fam: F.math, w: 700, c: C.white, a: a * Q(S, 0, 'one number slot', 0.6) });
  panel(820, 200, 990, 300, a * at(S, 1, 0.6), C.lean, 'ANY RELATION D ON E · E 上的任意关系 D');
  const p1 = at(S, 1, 0.6);
  wtRich([['P2 D', C.white], ['  (two-point positivity · 两点正性)', C.dim, F.zh]], 850, 276, { size: 26, a: a * Q(S, 1, 'positivity', 0.5) });
  wtRich([['PB D', C.white], ['  (phase balance · 相位平衡)', C.dim, F.zh]], 850, 320, { size: 26, a: a * Q(S, 1, 'phase balance', 0.5) });
  wtRich([['⇒  ∃ ε ∈ {+, −}:  D(a, b) = (0, ', C.white], ['ε a⃗ × b⃗', C.mag], [')  for all a, b', C.white]], 850, 386, { size: 30, a: a * Q(S, 1, 'must be the cross product', 0.6) });
  wtLean(850, 452, WT_LEAN.complete_consequences, a * p1, { size: 20 });
  /* line 2: the Pauli interface */
  const p2 = at(S, 2, 0.6);
  panel(820, 530, 990, 290, a * p2, C.lean, 'PAULI MATRICES · 泡利矩阵 (one fixed order · 固定次序)');
  wtRich([['φ(a) φ(b) = φ(a ∘ b) − i φ(D(a, b))', C.white]], 850, 604, { size: 30, a: a * p2 });
  wtRich([['φ(m, v) = m 𝟙 + v·σ     a ∘ b = (a₀b₀ + ', C.white], ['a⃗·b⃗', C.cyan], [', a₀b⃗ + b₀a⃗)', C.white]], 850, 656, { size: 24, a: a * p2 });
  const pe = a * Q(S, 2, 'the dot in', 0.6);
  wtRich([['pure arrows: (a·σ)(b·σ) = ', C.white], ['14 𝟙', C.cyan], [' + i ', C.white], ['(2, −4, 3)·σ', C.mag]], 850, 724, { size: 26, a: pe });
  wtTag(850, 772, 'in this order D(a, b) = −a × b (ε = −); example computed', '此例为屏幕上的计算', C.cyan, pe, 17);
  /* the slots light up: dot in the number slot, cross in the arrow slots */
  if (pe > 0.003) {
    wtSlots(180, 560, cw, ch, [
      { head: 'dot · 点积', col: C.cyan, v: '14' }, { head: 'cross · 叉乘', col: C.mag, v: '2' }, { col: C.mag, v: '−4' }, { col: C.mag, v: '3' }
    ], pe);
  }
  stamp('CROSS, UP TO SIGN', 450, 790, Q(S, 1, 'up to sign', 0.5) * (1 - at(S, 2, 0.5, 2.5)), C.lean, 28, -0.05);
};

/* ======================================================================= */
/*                          scene 6 · WHAT IT DOES NOT SAY                   */
/* ======================================================================= */
SCENES.edge = S => {
  const u = S.u, a = wtFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, 'Here Lean checks', 'lean'], [2, null, 'argued']]);
  const rows = [
    { k: 0, col: C.argued, head: 'LITERATURE · 文献结果', en: 'no 3-dimensional real division algebra', zh: '实数上没有能做除法的三维数系', note: 'Frobenius 1878 (associative) · Hurwitz 1898 (normed) · Hopf 1940 (any) — not formalized here · 本书未形式化' },
    { k: 1, q: 'Here Lean checks', col: C.lean, head: 'LEAN ✓ · 内核检验', en: 'Lagrange identity · cross forced on ℝ × ℝ³', zh: '拉格朗日恒等式；四位载体上叉乘被锁定', note: 'lagrange_gram_identity · complete_consequences' },
    { k: 2, col: C.argued, head: 'MODEL · 模型', en: 'the missing triplet = a closed arc body, S³', zh: '缺席的三元数 = 闭合的圆弧体 S³', note: 'interpretation, not a theorem · 诠释，不是定理' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * (rw.q ? Q(S, rw.k, rw.q, 0.6) : at(S, rw.k, 0.6));
    if (ra <= 0.003) return;
    const y = 190 + i * 215;
    panel(200, y, 1520, 190, ra, rw.col, rw.head);
    txt(rw.en, 230, y + 84, { size: 32, fam: F.math, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 230, y + 130, { size: 28, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 230, y + 170, { size: 19, fam: F.zh, w: 700, c: rw.col === C.lean ? C.lean : C.argued, a: ra * 0.95 });
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
  const sc = TL.scenes[3], t = sc.end - 1.0;
  background(t, sc, 3, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  /* the right triangle of the receipt */
  const tk = 46, T0 = [170, 760], tx = T0[0] + 14 * tk, ty = T0[1] - Math.sqrt(29) * tk;
  line(T0[0], T0[1], tx, T0[1], C.cyan, 1, 10);
  line(tx, T0[1], tx, ty, C.mag, 1, 10);
  line(T0[0], T0[1], tx, ty, C.white, 1, 4);
  txt('a·b = 14', (T0[0] + tx) / 2, T0[1] + 50, { size: 36, fam: F.math, w: 700, align: 'center', c: C.cyan });
  txt('|a×b| = √29', tx + 22, (T0[1] + ty) / 2 + 12, { size: 34, fam: F.math, w: 700, c: C.mag });
  txt('15 = 3 × 5', (T0[0] + tx) / 2 - 50, (T0[1] + ty) / 2 - 26, { size: 36, fam: F.mono, w: 700, align: 'center', c: C.white });
  txt(DATA.film.title_zh, 1380, 400, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('WHY THREE', 1380, 500, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 3, ls: 5 });
  txt("WON'T MULTIPLY", 1380, 566, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 2, ls: 4 });
  wtRich([['14²', C.cyan], [' + ', C.white], ['29', C.mag], [' = 15²', C.white]], 1380, 670, { size: 46, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1380, 750, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 3, sc);
  post(0);
};
