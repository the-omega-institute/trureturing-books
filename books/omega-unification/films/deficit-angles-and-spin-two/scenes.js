/* Film · Deficit Angles and Spin Two · 角亏与自旋二
   (book omega-unification, volume IV: chapter 10). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     hinge    the equilateral four-simplex of definition def-ou-ch10-regge-action: dihedral angle θ = arccos(1/4);
              the plane across one hinge sees q wedges of angle θ, deficit 2π − qθ (q = 4: +57.91°, q = 5: −17.61°)
              (computed here; "rigid origami" is the chapter's own picture).
     pachner  the weight W(T) = w(T) exp[−sV − bK] with b = −1/(8πG), s = Λ/(8πG); the boundary of the five-simplex
              (6, 20), a 1→5 move to (10, 30) and a 2→4 move to (12, 34), built here as sets of vertex 5-sets;
              row 1 − 2·row 2 of Δ is (0, 4πA), so d1 − 2d2 = −4πAb and G = A/(2(d1 − 2d2)) (computed);
              the two 24-simplex spheres with valence counts (33, 21, 3, 7) and 252 extra six-step dual closed walks
              (the chapter's replay certificate, NUM).
     spin     the flat background g = I − J/5 (15 edges, 50 hinges, 24 simplices per cell), the long-wave kernel
              20/k² (T:S − ½ tr T tr S) and the null-pole numerator ½|T¹¹ − T²²|² + 2|T¹²|² (the chapter's
              conserved-source certificate, NUM); a source rotated by θ turns the pair (T¹¹ − T²², 2T¹²) by 2θ
              (computed here on a rotated tensor).
     positive the 10 = C(5, 2) primitive time slices with T = AA† ≥ 0, and the inertia (1 positive, 10 negative,
              4 zero) at every one of the 255 nonzero momenta of the 4⁴ box, (0, 5, 10) at zero momentum; the lone
              opposite sign is the conformal mode (the chapter's replay certificates, NUM).
     wall     hinge loads N_h: first variation 3(Σ₄ N_h − √3 Σ₆ N_h) on the flat cell (30 four-valent, 20 six-valent
              hinges); √3 is irrational, totally real fields fail, the degree-4 amplitude 4β⁴ = 3 ((2β)⁴ = 12) gives
              p₄ = 4 − 2√3, p₆ = 2√3 − 3 (checked here); the Pell ground state (2911, 2521) on N = 5432 slots from
              zero #11366, and the loss of the massless pole once β ≥ 1/2 (certificates, NUM; a model of the chapter).
     anchors  OmegaSimplicialExactness.d1_d0 and .d2_d1 (LEAN, empty axiom closure): d¹(d⁰f) = 0 and d²(d¹e) = 0
              in any additive commutative group, shown on one triangle with integer values (computed);
              OmegaQuadraticAndSchur.sqrt_two_spinor (LEAN, propext): in QSqrt2, normSq u90 ≡ 1 and u90^(4+4) ≡ 1,
              the eight beats recomputed here in exact a + bδ arithmetic; deriving the Regge action from a single
              minimal arc is open (remark rem-ou-ch10-gravity-ledger).

   On load, FILM.init checks DATA.lean against the three theorems and recomputes every number on screen by a
   second route; any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                         the mathematics, recomputed                       */
/* ======================================================================= */
const DA_LEAN = {
  d1d0: 'D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d1_d0',
  d2d1: 'D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.d2_d1',
  spinor: 'D5/S3/Quantum/AURICOmega/OmegaQuadraticAndSchur.sqrt_two_spinor'
};
const DA_TH = Math.acos(0.25);                                   /* the dihedral angle of the regular 4-simplex */
const daDeg = r => r * 180 / Math.PI;
const daDef = q => 2 * Math.PI - q * DA_TH;                       /* deficit around a hinge of valence q */

/* triangulations as lists of sorted vertex 5-sets */
function daSubsets(arr, k) {
  const out = [], acc = [];
  (function go(i) {
    if (acc.length === k) { out.push(acc.slice()); return; }
    for (let j = i; j < arr.length; j++) { acc.push(arr[j]); go(j + 1); acc.pop(); }
  })(0);
  return out;
}
const daKey = s => s.slice().sort((x, y) => x - y).join(',');
function daCounts(T) {
  const hinge = new Map();
  for (const s of T) for (const h of daSubsets(s, 3)) hinge.set(daKey(h), (hinge.get(daKey(h)) || 0) + 1);
  return { N4: T.length, N2: hinge.size, q: [...hinge.values()] };
}
/* 1→5 move: replace simplex s by the cone from a new vertex over its five tetrahedra */
function daMove15(T, s, v) {
  const k = daKey(s), rest = T.filter(t => daKey(t) !== k);
  return rest.concat(daSubsets(s, 4).map(f => f.concat([v])));
}
/* 2→4 move: the two simplices on tetrahedron tet are replaced by the edge {a, b} joined to its four triangles */
function daMove24(T, tet, a, b) {
  const has = t => tet.every(x => t.includes(x));
  const rest = T.filter(t => !has(t));
  return rest.concat(daSubsets(tet, 3).map(f => f.concat([a, b])));
}
const DA_T0 = daSubsets([0, 1, 2, 3, 4, 5], 5);
const DA_T1 = daMove15(DA_T0, [0, 1, 2, 3, 4], 6);
const DA_T2 = daMove24(DA_T1, [0, 1, 2, 3], 5, 6);
const DA_TRI = [DA_T0, DA_T1, DA_T2].map(daCounts);

/* exact arithmetic in Q(δ), δ² = 2: numbers [a, b] = a + bδ with a, b rational as [num, den] pairs */
const daG = (a, b) => (b ? daG(b, a % b) : Math.abs(a));
const daR = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = daG(n, d) || 1; return [n / g, d / g]; };
const rAdd = (x, y) => daR(x[0] * y[1] + y[0] * x[1], x[1] * y[1]);
const rMul = (x, y) => daR(x[0] * y[0], x[1] * y[1]);
const rEq = (x, y) => x[0] === y[0] && x[1] === y[1];
const qAdd = (x, y) => [rAdd(x[0], y[0]), rAdd(x[1], y[1])];
const qNeg = x => [rMul(x[0], daR(-1)), rMul(x[1], daR(-1))];
const qMul = (x, y) => [rAdd(rMul(x[0], y[0]), rMul(rMul(x[1], y[1]), daR(2))), rAdd(rMul(x[0], y[1]), rMul(x[1], y[0]))];
const qEq = (x, y) => rEq(x[0], y[0]) && rEq(x[1], y[1]);
/* spinors = Gaussian numbers over Q(δ): [re, im] */
const zMul = (z, w) => [qAdd(qMul(z[0], w[0]), qNeg(qMul(z[1], w[1]))), qAdd(qMul(z[0], w[1]), qMul(z[1], w[0]))];
const Q0 = [daR(0), daR(0)], Q1 = [daR(1), daR(0)], HALF_D = [daR(0), daR(1, 2)];
const DA_U90 = [HALF_D, HALF_D];                                  /* u90 = (δ/2) + (δ/2) i */
const DA_POW = [[Q1, Q0]];
for (let k = 1; k <= 8; k++) DA_POW.push(zMul(DA_POW[k - 1], DA_U90));

/* the source tensor in the transverse plane, rotated by th: T = R diag(1, 0.35) Rᵀ */
const DA_EIG = [1, 0.35];
function daTensor(th) {
  const c = Math.cos(th), s = Math.sin(th), [l1, l2] = DA_EIG;
  return { t11: l1 * c * c + l2 * s * s, t22: l1 * s * s + l2 * c * c, t12: (l1 - l2) * c * s };
}
const daNum = T => 0.5 * (T.t11 - T.t22) ** 2 + 2 * T.t12 ** 2;

/* the triangle of the coboundary scene */
const DA_F = { x: 3, y: 7, z: 12 };

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('deficit-angles-and-spin-two film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (x, y, e = 1e-9) => Math.abs(x - y) <= e;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === 3, `film.json cites ${lean.length} declarations, expected 3`);
  for (const gid of Object.values(DA_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
  }
  /* 1. dihedral angle and deficits: cos θ = 1/4 from the Gram matrix of the regular simplex's facet normals */
  check(near(Math.cos(DA_TH), 0.25), 'cos θ = 1/4');
  check(daDeg(DA_TH).toFixed(2) === '75.52', 'θ ≈ 75.52°');
  check(daDeg(daDef(4)).toFixed(2) === '57.91' && daDeg(daDef(5)).toFixed(2) === '-17.61', 'deficits 57.91°, −17.61°');
  check(near(360 - 4 * daDeg(DA_TH), daDeg(daDef(4)), 1e-9), 'deficit in degrees');
  /* 2. the Pachner sequence, counted from the vertex sets; Σ q_h = 10 N4 on every closed 4-manifold */
  const want = [[6, 20], [10, 30], [12, 34]];
  DA_TRI.forEach((c, i) => {
    check(c.N4 === want[i][0] && c.N2 === want[i][1], `T${i}: (${c.N4}, ${c.N2})`);
    check(c.q.reduce((s, x) => s + x, 0) === 10 * c.N4, `T${i}: Σ q = 10 N4`);
  });
  check(DA_T1.filter(t => [0, 1, 2, 3].every(x => t.includes(x))).length === 2, 'two simplices on {0,1,2,3}');
  /* Δ rows and the elimination, with v = A = 1 (both cancel in the shape of the statement) */
  const r1 = [4, 20 * Math.PI - 40 * DA_TH], r2 = [2, 8 * Math.PI - 20 * DA_TH];
  check(DA_TRI[1].N4 - DA_TRI[0].N4 === 4 && DA_TRI[2].N4 - DA_TRI[1].N4 === 2, 'ΔN4 = 4, 2');
  check(near(2 * Math.PI * (DA_TRI[1].N2 - DA_TRI[0].N2) - 10 * DA_TH * 4, r1[1]) &&
        near(2 * Math.PI * (DA_TRI[2].N2 - DA_TRI[1].N2) - 10 * DA_TH * 2, r2[1]), 'ΔK rows');
  check(near(r1[0] - 2 * r2[0], 0) && near(r1[1] - 2 * r2[1], 4 * Math.PI), 'row1 − 2 row2 = (0, 4π A)');
  check(near(r1[0] * r2[1] - r2[0] * r1[1], -8 * Math.PI), 'det Δ = −8π v A');
  { const G = 0.37, A = 1.9, b = -1 / (8 * Math.PI * G), d = -4 * Math.PI * A * b; check(near(A / (2 * d), G), 'G = A / (2(d1 − 2d2))'); }
  /* the 24-simplex spheres: valences (33, 21, 3, 7) at q = 3..6 give N2 = 64 and Σ q = 240 = 10 · 24 */
  { const h = [33, 21, 3, 7]; check(h.reduce((s, x) => s + x, 0) === 64 && h.reduce((s, x, i) => s + x * (i + 3), 0) === 240, 'histogram (33,21,3,7)'); }
  /* 3. the pair (T11 − T22, 2T12) turns by 2θ, and the numerator is rotation invariant */
  for (let i = 0; i <= 12; i++) {
    const th = i * Math.PI / 12, T = daTensor(th), d = DA_EIG[0] - DA_EIG[1];
    check(near(T.t11 - T.t22, d * Math.cos(2 * th)) && near(2 * T.t12, d * Math.sin(2 * th)), `pair at ${i}`);
    check(near(daNum(T), 0.5 * d * d), `numerator at ${i}`);
  }
  /* 4. slices and momenta */
  check(daSubsets([1, 2, 3, 4, 5], 2).length === 10, 'C(5, 2) = 10 slices');
  check(4 ** 4 - 1 === 255 && 1 + 10 + 4 === 15 && 5 + 10 === 15, '255 momenta, 15 edge modes');
  /* 5. the √3 wall: flat loads N = CA with 30 A4 = √3 · 20 A6, degree-4 amplitude, Pell */
  const b4 = Math.pow(0.75, 0.25), p4 = 1 / (1 + b4 * b4), p6 = b4 * b4 / (1 + b4 * b4);
  check(near((2 * b4) ** 4, 12), '(2β)⁴ = 12');
  check(near(p4, 4 - 2 * Math.sqrt(3), 1e-12) && near(p6, 2 * Math.sqrt(3) - 3, 1e-12), 'p4, p6');
  check(near(30 * p4, Math.sqrt(3) * 20 * p6, 1e-12), 'p4 / p6 balances 30 four-valent against 20 six-valent');
  check(3n * 2911n * 2911n - 4n * 2521n * 2521n === -1n && 2911 + 2521 === 5432, '3·2911² − 4·2521² = −1');
  /* x⁴ − 12 has no rational root (±1, ±2, ±3, ±4, ±6, ±12) and no rational quadratic factor (x² ± a)(…) */
  check([1, 2, 3, 4, 6, 12].every(r => r ** 4 !== 12), 'x⁴ − 12 has no rational root');
  /* 6. coboundaries on the triangle, and the spinor beats */
  const e = (p, q) => DA_F[q] - DA_F[p];
  check(e('y', 'z') + e('x', 'y') - e('x', 'z') === 0, 'd1 d0 f = 0 on the triangle');
  const nrm = qAdd(qMul(DA_U90[0], DA_U90[0]), qMul(DA_U90[1], DA_U90[1]));
  check(qEq(nrm, Q1), 'normSq u90 = 1');
  check(qEq(DA_POW[2][0], Q0) && qEq(DA_POW[2][1], Q1), 'u90² = i');
  check(qEq(DA_POW[4][0], qNeg(Q1)) && qEq(DA_POW[4][1], Q0), 'u90⁴ = −1');
  check(qEq(DA_POW[8][0], Q1) && qEq(DA_POW[8][1], Q0), 'u90⁸ = 1');
  check([1, 2, 3, 4, 5, 6, 7].every(k => !(qEq(DA_POW[k][0], Q1) && qEq(DA_POW[k][1], Q0))), 'no earlier closure');
});
Object.assign(FILM.speed, { hinge: 0.02, pachner: 0.016, spin: 0.016, positive: 0.014, wall: 0.016, anchors: 0.014, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const daFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function daRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a, ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const DA_MISSING = new Set();
function daLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!DA_MISSING.has(gid)) { DA_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  const name = (r.name || r.label).split('.').slice(-2).join('.');
  txt(name, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a small certificate tag (cyan: a replay certificate of the chapter, not a proof) */
function daCert(x, y, s, a, align = 'left') {
  txt(s, x, y, { size: 19, fam: F.zh, w: 700, align, c: C.cyan, a: a * 0.9 });
}

/* one hinge seen end-on: q wedges of angle θ fan out from the hinge point.
   o: { cx, cy, r, q, a, grow (wedges shown, float), gap (alpha of the deficit), lab (alpha of θ label), hinge } */
function daFan(o) {
  const a = o.a;
  if (a <= 0.003) return;
  const { cx, cy, r, q } = o, start = -Math.PI / 2, n = o.grow == null ? q : o.grow;
  for (let i = 0; i < q; i++) {
    const p = clamp(n - i);
    if (p <= 0) continue;
    const a0 = start + i * DA_TH, a1 = a0 + DA_TH * ease(p);
    ctx.save(); ctx.globalAlpha = a * p;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, a0, a1); ctx.closePath();
    ctx.fillStyle = rgba(C.cyan, i % 2 ? 0.30 : 0.16); ctx.fill();
    ctx.strokeStyle = C.cyan; ctx.lineWidth = 2.5; ctx.stroke();
    ctx.restore();
  }
  /* the deficit: the gap (q θ < 2π) or the overlap past the start (q θ > 2π), magenta */
  const ga = a * (o.gap || 0);
  if (ga > 0.003) {
    const e = start + q * DA_TH, full = start + 2 * Math.PI;
    ctx.save(); ctx.globalAlpha = ga;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    if (e < full) ctx.arc(cx, cy, r * 1.04, e, full); else ctx.arc(cx, cy, r * 1.04, full, e);
    ctx.closePath(); ctx.fillStyle = rgba(C.mag, 0.42); ctx.fill();
    ctx.strokeStyle = C.mag; ctx.lineWidth = 3.5; ctx.stroke();
    ctx.restore();
  }
  /* θ on the first wedge */
  const la = a * (o.lab || 0);
  if (la > 0.003) {
    ctx.save(); ctx.globalAlpha = la; ctx.strokeStyle = C.white; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, r * 0.34, start, start + DA_TH); ctx.stroke(); ctx.restore();
    const m = start + DA_TH / 2;
    txt('θ', cx + Math.cos(m) * r * 0.5, cy + Math.sin(m) * r * 0.5 + 12, { size: 34, fam: F.math, w: 700, align: 'center', c: C.white, a: la });
  }
  const ha = a * (o.hinge == null ? 1 : o.hinge);
  dot(cx, cy, 12, 'o', ha);
  ring(cx, cy, 16, C.now, ha * (o.hingeHi || 0), 3);
}

/* opening title */
function daTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('DEFICIT ANGLES AND SPIN TWO', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('HINGES · PACHNER MOVES · HELICITY ±2 · √3 WALL · LEAN', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                              scene 1 · RIGID ORIGAMI                      */
/* ======================================================================= */
SCENES.hinge = S => {
  daTitle(S);
  const a = clamp((S.u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - S.u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, null, 'computed']]);
  const two = Q(S, 3, 'five overshoot', 0.8);
  const L = { cx: lerp(W / 2, 640, ease(two)), cy: 500, r: 230 };
  const grow = at(S, 0, 0.01) > 0 ? 4 * ease(at(S, 0, 2.2)) : 0;
  daFan({ ...L, q: 4, a, grow, gap: Q(S, 3, 'Four wedges', 0.6), lab: at(S, 2, 0.6), hinge: at(S, 1, 0.6), hingeHi: at(S, 1, 0.6) * (1 - at(S, 2, 0.5)) });
  /* line 0: flat inside */
  const fa = a * at(S, 0, 0.8, 1.2) * (1 - at(S, 1, 0.5));
  txt('each piece flat inside · 每块内部平直', W / 2, 820, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: fa });
  /* line 1: the hinge */
  const ha = a * at(S, 1, 0.6) * (1 - two);
  if (ha > 0.003) {
    line(L.cx - 16, L.cy, L.cx - L.r - 30, L.cy + 150, C.now, ha * 0.8, 2);
    txt('hinge · 铰链', L.cx - L.r - 40, L.cy + 150, { size: 30, fam: F.zh, w: 700, align: 'right', c: C.now, a: ha });
    txt('a triangle, seen end-on', L.cx - L.r - 40, L.cy + 190, { size: 22, fam: F.disp, w: 700, align: 'right', c: C.white, a: ha });
    txt('三角面的截面', L.cx - L.r - 40, L.cy + 224, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.white, a: ha });
  }
  /* line 2: θ */
  const ta = a * at(S, 2, 0.6);
  if (ta > 0.003) {
    panel(1180, 200, 620, 150, ta * (1 - two), C.cyan, 'DIHEDRAL ANGLE · 二面角');
    daRich([['θ = arccos(1/4) ≈ ', C.white], [`${daDeg(DA_TH).toFixed(2)}°`, C.cyan]], 1210, 300, { size: 38, a: ta * (1 - two) });
    txt('schematic cross-section · 示意截面', 1210, 380, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ta * (1 - two) });
  }
  /* line 3: two fans and their deficits */
  const ga = a * Q(S, 3, 'Four wedges', 0.6);
  if (ga > 0.003) {
    daRich([['q = 4:  δ = 2π − 4θ ≈ ', C.white], [`+${daDeg(daDef(4)).toFixed(2)}°`, C.mag]], L.cx, 800, { size: 30, align: 'center', a: ga });
  }
  const R = { cx: 1300, cy: 500, r: 230 };
  if (two > 0.003) {
    daFan({ ...R, q: 5, a: a * two, grow: 5 * ease(Q(S, 3, 'five overshoot', 1.6)), gap: Q(S, 3, 'seventeen point six', 0.6), lab: 1 });
    daRich([['q = 5:  δ = 2π − 5θ ≈ ', C.white], [`${daDeg(daDef(5)).toFixed(2)}°`.replace('-', '−'), C.mag]], R.cx, 800, { size: 30, align: 'center', a: a * Q(S, 3, 'seventeen point six', 0.6) });
  }
  const da = a * Q(S, 3, 'That mismatch', 0.6);
  if (da > 0.003) {
    panel(W / 2 - 330, 182, 660, 92, da, C.mag, 'CURVATURE · 曲率');
    txt('curvature = deficit angle · 曲率 = 角亏', W / 2, 250, { size: 32, fam: F.zh, w: 700, align: 'center', c: C.white, a: da });
  }
};

/* ======================================================================= */
/*                            scene 2 · READING THE DIALS                    */
/* ======================================================================= */
function daHist(x, y, a, lab) {
  if (a <= 0.003) return;
  const h = [33, 21, 3, 7], bw = 44, gap = 20, k = 3.2;
  txt(lab, x, y - 150, { size: 22, fam: F.mono, w: 700, c: C.white, a });
  h.forEach((n, i) => {
    const bx = x + i * (bw + gap);
    fillBox(bx, y - n * k, bw, n * k, C.cyan, a * 0.45); box(bx, y - n * k, bw, n * k, C.cyan, a, 1.5);
    txt(String(n), bx + bw / 2, y - n * k - 10, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a });
    txt(`q=${i + 3}`, bx + bw / 2, y + 26, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  });
}
SCENES.pachner = S => {
  const a = daFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [4, null, 'computed']]);
  /* line 0: the weight */
  panel(120, 190, 1680, 150, a, C.cyan, 'REGGE WEIGHT · 雷吉权重');
  daRich([['W(T) = w(T) · exp[ −s V − b K ]', C.white]], 160, 270, { size: 38, a });
  daRich([['b = −1/(8π', C.white], ['G', C.now], [')     s = ', C.white], ['Λ', C.now], ['/(8π', C.white], ['G', C.now], [')', C.white]], 940, 270, { size: 34, a: a * Q(S, 0, 'are the dials', 0.6) });
  txt('V = total four-volume · 总四体积     K = A · Σ (2π − q θ) · 总角亏', 160, 318, { size: 20, fam: F.zh, w: 700, c: C.dim, a });
  /* lines 1–2: the three spheres */
  const hide = at(S, 4, 0.6);
  const ca = a * (1 - hide);
  const xs = [380, 960, 1540], labs = ['T₀', 'T₁', 'T₂'];
  const show = [at(S, 1, 0.6), Q(S, 2, 'One Pachner move', 0.6), Q(S, 2, 'a second gives', 0.6)];
  DA_TRI.forEach((c, i) => {
    const sa = ca * show[i];
    if (sa <= 0.003) return;
    box(xs[i] - 180, 380, 360, 110, i === 0 && at(S, 2, 0.01) === 0 ? C.now : C.cyan, sa, 2, 'rgba(4,10,24,0.7)');
    txt(labs[i], xs[i] - 160, 420, { size: 26, fam: F.math, w: 700, c: C.white, a: sa });
    txt(`(N₄, N₂) = (${c.N4}, ${c.N2})`, xs[i], 466, { size: 25, fam: F.mono, w: 700, align: 'center', c: C.white, a: sa });
  });
  const m1 = ca * Q(S, 2, 'One Pachner move', 0.6), m2 = ca * Q(S, 2, 'a second gives', 0.6);
  arrow(574, 435, 766, 435, C.cyan, m1, 3); txt('1 → 5', 670, 420, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: m1 });
  arrow(1154, 435, 1346, 435, C.cyan, m2, 3); txt('2 → 4', 1250, 420, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: m2 });
  daCert(380, 525, 'boundary of the five-simplex · 五单纯形边界', ca * show[0], 'center');
  /* line 3: the elimination */
  const ea = ca * at(S, 3, 0.6);
  if (ea > 0.003) {
    panel(120, 560, 1680, 270, ea, C.cyan, 'ELIMINATION · 消元');
    daRich([['step 1:  ( 4v ,  A(20π − 40θ) )', C.white]], 160, 640, { size: 30, a: ea });
    daRich([['step 2:  ( 2v ,  A(8π − 20θ) )', C.white]], 160, 690, { size: 30, a: ea });
    const ra = ea * Q(S, 3, 'volume and angle cancel', 0.6);
    daRich([['step 1 − 2 · step 2 = ( ', C.white], ['0', C.mag], [' ,  4πA )', C.white]], 160, 750, { size: 30, a: ra });
    const ga = ea * Q(S, 3, 'can be read off', 0.6);
    daRich([['d₁ − 2d₂ = −4πA b', C.white]], 1040, 660, { size: 32, a: ga });
    daRich([['⟹  ', C.white], ['G', C.now], [' = A / (2(d₁ − 2d₂))', C.white]], 1040, 730, { size: 34, a: ga });
    daCert(1040, 790, 'counts built here from vertex sets · 计数由顶点集当场算出', ga);
  }
  /* line 4: matter hears six-step walks */
  const ha = a * hide;
  if (ha > 0.003) {
    panel(120, 380, 1680, 450, ha, C.cyan, 'SAME HINGE COUNTS · 铰链计数全同');
    daHist(220, 720, ha, 'path A · 24 simplices');
    daHist(620, 720, ha, 'path B · 24 simplices');
    txt('=', 560, 650, { size: 48, fam: F.math, w: 700, align: 'center', c: C.white, a: ha });
    const wa = ha * Q(S, 4, 'differ by', 0.6);
    txt('matter determinant · 物质行列式', 1080, 480, { size: 26, fam: F.zh, w: 700, c: C.dim, a: wa });
    txt('252', 1080, 600, { size: 96, fam: F.orb, w: 900, c: C.mag, a: wa, ab: 2 });
    txt('extra directed six-step', 1300, 560, { size: 26, fam: F.disp, w: 700, c: C.white, a: wa });
    txt('closed dual walks', 1300, 596, { size: 26, fam: F.disp, w: 700, c: C.white, a: wa });
    txt('多出的有向六步对偶闭走', 1080, 660, { size: 26, fam: F.zh, w: 700, c: C.white, a: wa });
    txt('log(p/r) = 42/x⁶ + O(x⁻⁷)', 1080, 724, { size: 28, fam: F.math, w: 700, c: C.white, a: wa });
    daCert(1080, 790, 'NUM · replay certificate of the chapter · 本章复算证书', wa);
  }
};

/* ======================================================================= */
/*                                 scene 3 · SPIN TWO                        */
/* ======================================================================= */
function daEllipse(cx, cy, r, th, a) {
  if (a <= 0.003) return;
  ring(cx, cy, r * 1.08, C.dim, a * 0.4, 1.5);
  ctx.save(); ctx.globalAlpha = a; ctx.translate(cx, cy); ctx.rotate(-th);
  ctx.beginPath(); ctx.ellipse(0, 0, r * DA_EIG[0], r * DA_EIG[1], 0, 0, TAU);
  ctx.fillStyle = rgba(C.cyan, 0.2); ctx.fill(); ctx.strokeStyle = C.cyan; ctx.lineWidth = 3; ctx.stroke();
  ctx.restore();
  const ex = Math.cos(th) * r, ey = -Math.sin(th) * r;
  line(cx - ex, cy - ey, cx + ex, cy + ey, C.now, a, 3);
  dot(cx + ex, cy + ey, 10, 'o', a);
}
SCENES.spin = S => {
  const a = daFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  panel(120, 190, 940, 470, a, C.cyan, 'LONG WAVES · 长波');
  daRich([['g = I − J/5', C.white]], 160, 280, { size: 40, a });
  txt('per cell: 15 edges · 50 hinges · 24 simplices · all δ = 0', 160, 320, { size: 21, fam: F.mono, w: 700, c: C.dim, a: a * at(S, 0, 0.6) });
  const ka = a * at(S, 1, 0.6);
  daRich([['(20 / k²) · ( T:S − ½ tr T · tr S )', C.white]], 160, 410, { size: 34, a: ka });
  txt('Fierz–Pauli · 菲尔茨—泡利 · massless spin-2 kernel', 160, 450, { size: 21, fam: F.zh, w: 700, c: C.dim, a: ka });
  const na = a * at(S, 2, 0.6);
  daRich([['½ |T¹¹ − T²²|² + 2 |T¹²|²', C.white], ['  ≥ 0', C.cyan]], 160, 545, { size: 34, a: na });
  txt('null pole numerator · rank 2 · 零锥极点分子，秩 2', 160, 590, { size: 21, fam: F.zh, w: 700, c: C.dim, a: na });
  daCert(160, 636, 'NUM · conserved-source certificate of the chapter · 本章守恒源证书', a * at(S, 1, 0.6));
  /* line 3: turn the source */
  const ra = a * at(S, 2, 0.6, 1.2);
  const th = Math.PI * ease(Q(S, 3, 'Turn the source', 5.0));
  const T = daTensor(th), d = DA_EIG[0] - DA_EIG[1];
  const E = { cx: 1290, cy: 400, r: 140 }, P = { cx: 1630, cy: 400, r: 140 };
  if (ra > 0.003) {
    panel(1100, 190, 700, 470, ra, C.cyan, 'TURN BY θ · 转过 θ');
    if (th > 0.01) { ctx.save(); ctx.globalAlpha = ra; ctx.strokeStyle = C.now; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(E.cx, E.cy, E.r * 1.08, -th, 0); ctx.stroke(); ctx.restore(); }
    daEllipse(E.cx, E.cy, E.r, th, ra);
    txt('source · 源', E.cx, 610, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: ra });
    /* the pair plane */
    ring(P.cx, P.cy, P.r, C.dim, ra * 0.5, 1.5);
    line(P.cx - P.r - 10, P.cy, P.cx + P.r + 10, P.cy, C.dim, ra * 0.5, 1.2); line(P.cx, P.cy - P.r - 10, P.cx, P.cy + P.r + 10, C.dim, ra * 0.5, 1.2);
    const vx = P.cx + (T.t11 - T.t22) / d * P.r, vy = P.cy - 2 * T.t12 / d * P.r;
    if (th > 0.01) { ctx.save(); ctx.globalAlpha = ra; ctx.strokeStyle = C.mag; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(P.cx, P.cy, P.r, -Math.min(2 * th, TAU - 1e-3), 0); ctx.stroke(); ctx.restore(); }
    arrow(P.cx, P.cy, vx, vy, C.mag, ra, 4);
    txt('(T¹¹ − T²², 2T¹²)', P.cx, 610, { size: 22, fam: F.math, w: 700, align: 'center', c: C.mag, a: ra });
  }
  const ta = a * at(S, 3, 0.6);
  if (ta > 0.003) {
    panel(120, 690, 1680, 140, ta, C.now, 'ROTATION · 转动');
    const dg = Math.round(daDeg(th));
    daRich([['θ = ', C.white], [`${dg}°`, C.now], ['   →   pair turns ', C.white], [`${2 * dg}°`, C.mag], ['   numerator unchanged', C.cyan]], 160, 776, { size: 32, a: ta, fam: F.mono });
    const ha = a * Q(S, 3, 'helicities plus', 0.6);
    chip(1640, 762, 260, 64, 'helicity ±2', C.mag, ha, 30);
  }
};

/* ======================================================================= */
/*                          scene 4 · POSITIVE, YET UNSTABLE                 */
/* ======================================================================= */
SCENES.positive = S => {
  const a = daFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* left: ten slices */
  panel(120, 190, 760, 640, a, C.cyan, 'TEN TIME SLICES · 十种时间切片');
  const pairs = daSubsets([1, 2, 3, 4, 5], 2);
  pairs.forEach(([i, j], n) => {
    const ca = a * at(S, 0, 0.3, 0.18 * n + 0.6);
    const x = 260 + (n % 5) * 140, y = 300 + Math.floor(n / 5) * 90;
    chip(x, y, 120, 56, `v${i}−v${j}`, C.cyan, ca, 24);
  });
  txt('h(x) = g(vᵢ − vⱼ, x),  1 ≤ i < j ≤ 5', 160, 500, { size: 26, fam: F.math, w: 700, c: C.white, a: a * at(S, 0, 0.6, 1.0) });
  const ta = a * Q(S, 0, 'A times A dagger', 0.6);
  txt('T = A A†  ≥  0', 500, 620, { size: 64, fam: F.math, w: 700, align: 'center', c: C.cyan, a: ta, ab: 1 });
  txt('reflection positive · 反射正性', 500, 680, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: ta });
  daCert(160, 800, 'NUM · slice certificate of the chapter · 本章切片证书', ta);
  /* right: 255 momenta, each with inertia (1, 10, 4) */
  const ra = a * at(S, 1, 0.6);
  if (ra <= 0.003) return;
  panel(920, 190, 880, 640, ra, C.cyan, '4⁴ BOX · ALL MOMENTA · 全部动量');
  const n = Math.floor(256 * ease(Q(S, 1, 'all two hundred', 3.0)));
  const gx = 960, gy = 250, sp = 21;
  for (let k = 0; k < 256; k++) {
    const x = gx + (k % 16) * sp + 8, y = gy + Math.floor(k / 16) * sp + 8;
    if (k === 0) { ring(x, y, 6, C.dim, ra, 2); continue; }
    dot(x, y, k < n ? 7 : 4, k < n ? 'c' : 'b', ra * (k < n ? 1 : 0.35));
  }
  txt(`${Math.max(0, n - 1)} / 255`, gx + 168, 620, { size: 40, fam: F.orb, w: 900, align: 'center', c: n >= 256 ? C.cyan : C.white, a: ra });
  txt('nonzero momenta · 非零动量', gx + 168, 660, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ra });
  txt('○ k = 0: 5 negative, 10 zero', gx, 720, { size: 20, fam: F.mono, w: 700, c: C.dim, a: ra });
  /* the 15 edge modes at one nonzero momentum */
  const ia = ra * Q(S, 1, 'one positive direction', 0.6);
  const bx = 1330, by = 250, cw = 26, conf = at(S, 2, 0.6);
  txt('15 edge modes · 15 个边长方向', bx, by + 10, { size: 22, fam: F.zh, w: 700, c: C.white, a: ia });
  for (let i = 0; i < 15; i++) {
    const y = by + 40 + i * 24, sgn = i === 0 ? '+' : i <= 10 ? '−' : '0';
    const col = i === 0 ? mix(C.white, C.now, conf) : i <= 10 ? C.cyan : C.dim;
    fillBox(bx, y, 120, 20, col, ia * (i === 0 ? 0.55 : 0.3));
    box(bx, y, 120, 20, col, ia, 1.2);
    txt(sgn, bx + 136, y + 17, { size: 20, fam: F.mono, w: 700, c: col, a: ia });
  }
  txt('1 + · 10 − · 4 zero', bx, by + 420, { size: 24, fam: F.mono, w: 700, c: C.white, a: ia });
  daCert(bx, by + 452, 'NUM · certificate · 逐动量证书', ia);
  const ca = ra * conf;
  if (ca > 0.003) {
    txt('◀ conformal mode · 共形模', bx + 150, by + 57, { size: 22, fam: F.zh, w: 700, c: C.now, a: ca });
    txt('Euclidean instability, reborn on the lattice', 960, 780, { size: 26, fam: F.disp, w: 700, c: C.now, a: ca });
    txt('欧氏引力的共形不稳定，在格点上重现', 960, 814, { size: 22, fam: F.zh, w: 700, c: C.white, a: ca });
  }
};

/* ======================================================================= */
/*                            scene 5 · THE ROOT-THREE WALL                  */
/* ======================================================================= */
SCENES.wall = S => {
  const a = daFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, null, 'computed']]);
  panel(120, 190, 1680, 170, a, C.cyan, 'HINGE LOADS · 铰链负载');
  daRich([['weight on hinge h  →  ', C.white], ['Nₕ ∈ ℕ', C.now]], 160, 262, { size: 34, a: a * at(S, 0, 0.6) });
  const sa = a * at(S, 1, 0.6);
  daRich([['∂S/∂η ∝ 3 ( Σ₄ Nₕ − ', C.white], ['√3', C.mag], [' · Σ₆ Nₕ )', C.white]], 160, 330, { size: 34, a: sa });
  txt('flat cell: 30 four-valent · 20 six-valent hinges', 1100, 262, { size: 22, fam: F.mono, w: 700, c: C.dim, a: sa });
  txt('平直胞：30 张四价面 · 20 张六价面', 1100, 300, { size: 22, fam: F.zh, w: 700, c: C.dim, a: sa });
  daCert(1100, 336, 'NUM · stationarity certificate · 驻点证书', sa);
  /* line 2: the number-field ladder */
  const la = a * at(S, 2, 0.6);
  if (la > 0.003) {
    panel(120, 390, 900, 440, la, C.cyan, 'NUMBER FIELD DEGREE · 数域次数');
    const rows = [
      ['degree 1 · ℚ', '√3 ∉ ℚ', 'rational counts', 0],
      ['degree 2 · totally real', '√3 ↦ −√3', 'some embedding flips it', 0],
      ['degree 4 · (2β)⁴ = 12', '4β⁴ = 3', 'p₄ = 4 − 2√3,  p₆ = 2√3 − 3', 1]
    ];
    rows.forEach(([h, m, n2], i) => {
      const ra = la * (i < 2 ? Q(S, 2, 'Nonzero rational', 0.5, 0.7 * i) : Q(S, 2, 'degree four', 0.6));
      if (ra <= 0.003) return;
      const y = 470 + i * 120, ok = rows[i][3];
      txt(h, 160, y, { size: 28, fam: F.mono, w: 700, c: C.white, a: ra });
      txt(m, 160, y + 40, { size: 26, fam: F.math, w: 700, c: ok ? C.cyan : C.mag, a: ra });
      txt(n2, 420, y + 40, { size: 22, fam: F.math, w: 700, c: C.dim, a: ra });
      txt(ok ? '✓' : '✗', 960, y + 20, { size: 44, fam: F.math, w: 700, align: 'center', c: ok ? C.cyan : C.mag, a: ra });
    });
  }
  /* lines 3–4: the curved Pell branch */
  const pa = a * at(S, 3, 0.6);
  if (pa > 0.003) {
    panel(1060, 390, 740, 440, pa, C.cyan, 'PELL BRANCH · 佩尔分支');
    txt('zero #11366 · 第 11366 枚零点', 1100, 460, { size: 26, fam: F.zh, w: 700, c: C.white, a: pa });
    const ga = a * Q(S, 3, 'integer ground state', 0.6);
    daRich([['(k₄, k₆) = ', C.white], ['(2911, 2521)', C.now]], 1100, 530, { size: 34, a: ga });
    daRich([['3·2911² − 4·2521² = ', C.white], ['−1', C.cyan]], 1100, 590, { size: 30, a: ga });
    daRich([['N = 2911 + 2521 = ', C.white], ['5432', C.cyan], [' slots', C.white]], 1100, 645, { size: 30, a: a * Q(S, 3, 'five thousand four hundred', 0.6) });
    daCert(1100, 685, 'NUM · integer ground-state certificate (a model) · 整数基态证书（模型内）', ga);
    const ma = a * at(S, 4, 0.6);
    if (ma > 0.003) {
      line(1100, 712, 1760, 712, C.mag, ma * 0.6, 1.5);
      daRich([['β ≥ 1/2  ⟹  ', C.white], ['no massless pole', C.mag]], 1100, 762, { size: 30, a: ma });
      txt('选得足够强 ⟹ 无质量极点消失', 1100, 800, { size: 22, fam: F.zh, w: 700, c: C.white, a: ma });
    }
  }
};

/* ======================================================================= */
/*                            scene 6 · TWO KERNEL FACTS                     */
/* ======================================================================= */
SCENES.anchors = S => {
  const a = daFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'lean'], [4, null, 'open']]);
  const op = at(S, 4, 0.6);
  stamp('LEAN ✓', W / 2, 470, Q(S, 0, 'checked by the Lean kernel', 0.5) * (1 - at(S, 1, 0.5)), C.lean, 64, -0.06);
  /* left: the triangle */
  const la = a * at(S, 1, 0.6);
  if (la > 0.003) {
    panel(120, 190, 800, 480, la, C.lean, 'd ∘ d = 0 · 上边缘的上边缘为零');
    const V = { x: [210, 500], y: [530, 500], z: [370, 280] };
    const ea = la * Q(S, 1, 'the differences', 0.6);
    line(V.x[0], V.x[1], V.y[0], V.y[1], C.cyan, ea, 3); line(V.y[0], V.y[1], V.z[0], V.z[1], C.cyan, ea, 3); line(V.x[0], V.x[1], V.z[0], V.z[1], C.cyan, ea, 3);
    for (const k of ['x', 'y', 'z']) {
      dot(V[k][0], V[k][1], 12, 'c', la);
      txt(`f(${k}) = ${DA_F[k]}`, V[k][0] + (k === 'z' ? 24 : 0), V[k][1] + (k === 'z' ? 8 : 42), { size: 24, fam: F.mono, w: 700, align: k === 'z' ? 'left' : 'center', c: C.white, a: la });
    }
    const e = (p, q) => DA_F[q] - DA_F[p];
    txt(`${e('x', 'y')}`, (V.x[0] + V.y[0]) / 2, V.x[1] - 12, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ea });
    txt(`${e('y', 'z')}`, (V.y[0] + V.z[0]) / 2 + 22, (V.y[1] + V.z[1]) / 2, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: ea });
    txt(`${e('x', 'z')}`, (V.x[0] + V.z[0]) / 2 - 26, (V.x[1] + V.z[1]) / 2, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: ea });
    const sa = la * Q(S, 1, 'cancel', 0.6);
    daRich([[`(${e('y', 'z')} + ${e('x', 'y')}) − ${e('x', 'z')} = `, C.white], ['0', C.now]], 730, 360, { size: 32, a: sa, align: 'center' });
    txt('d¹(d⁰f) = 0', 730, 424, { size: 30, fam: F.math, w: 700, align: 'center', c: C.lean, a: sa });
    txt('d²(d¹e) = 0', 730, 470, { size: 30, fam: F.math, w: 700, align: 'center', c: C.lean, a: sa });
    daLean(150, 606, DA_LEAN.d1d0, la, { size: 18 });
    daLean(150, 644, DA_LEAN.d2d1, la, { size: 18 });
  }
  /* right: the eight beats */
  const ra = a * at(S, 2, 0.6);
  if (ra > 0.003) {
    panel(960, 190, 840, 480, ra, C.lean, 'QSqrt2 · δ² = 2');
    const cx = 1200, cy = 420, r = 150;
    ring(cx, cy, r, C.dim, ra * 0.6, 1.5);
    line(cx - r - 16, cy, cx + r + 16, cy, C.dim, ra * 0.4, 1); line(cx, cy - r - 16, cx, cy + r + 16, C.dim, ra * 0.4, 1);
    const beats = 8 * ease(Q(S, 2, 'closes in eight beats', 3.0));
    for (let k = 0; k <= 8; k++) {
      const ka = clamp(beats - k + 1);
      if (ka <= 0) continue;
      const ang = k * Math.PI / 4, x = cx + Math.cos(ang) * r, y = cy - Math.sin(ang) * r;
      if (k > 0) { ctx.save(); ctx.globalAlpha = ra * ka; ctx.strokeStyle = C.vio; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, r, -(k - 1) * Math.PI / 4, -ang, true); ctx.stroke(); ctx.restore(); }
      const cur = k === Math.min(8, Math.floor(beats));
      dot(x, y, cur ? 12 : 8, cur ? 'o' : 'v', ra * ka);
    }
    txt('1', cx + r + 20, cy - 10, { size: 22, fam: F.math, w: 700, c: C.white, a: ra });
    txt('i', cx + 10, cy - r - 18, { size: 22, fam: F.math, w: 700, c: C.white, a: ra });
    txt('−1', cx - r - 50, cy - 10, { size: 22, fam: F.math, w: 700, c: C.white, a: ra });
    txt('u₉₀ = (δ/2) + (δ/2) i', 1400, 290, { size: 28, fam: F.math, w: 700, c: C.white, a: ra });
    const na = ra * Q(S, 2, 'unit norm', 0.6);
    txt('normSq u₉₀ ≡ 1', 1400, 360, { size: 28, fam: F.math, w: 700, c: C.lean, a: na });
    txt('u₉₀² ≡ i    u₉₀⁴ ≡ −1', 1400, 420, { size: 26, fam: F.math, w: 700, c: C.white, a: ra * clamp(beats - 3) });
    txt(`beat ${Math.min(8, Math.floor(beats))} / 8`, 1400, 480, { size: 26, fam: F.mono, w: 700, c: C.now, a: ra * clamp(beats) });
    txt('u₉₀⁴⁺⁴ ≡ 1', 1400, 540, { size: 30, fam: F.math, w: 700, c: C.lean, a: ra * clamp(beats - 7) });
    daLean(990, 644, DA_LEAN.spinor, ra, { size: 18 });
  }
  /* line 3: degree two against degree four; line 4: the open problem */
  const ca = a * at(S, 3, 0.6) * (1 - op);
  if (ca > 0.003) {
    panel(120, 694, 1680, 140, ca, C.cyan, 'DEGREE · 次数');
    daRich([['√2 spinor:  degree ', C.white], ['2', C.cyan], ['        flat hinge balance 4β⁴ = 3:  degree ', C.white], ['4', C.mag]], 160, 770, { size: 32, a: ca });
    txt('√2 旋量只要二次；平直铰链平衡要四次', 160, 812, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ca });
  }
  const oa = a * op;
  if (oa > 0.003) {
    panel(120, 694, 1680, 140, oa, C.open, 'OPEN · 未解');
    txt('Regge action, source normalization and area unit from one minimal arc', 160, 768, { size: 30, fam: F.disp, w: 700, c: C.open, a: oa });
    txt('从单一极小圆弧导出雷吉作用、源归一化与面积单位：仍未解决', 160, 812, { size: 24, fam: F.zh, w: 700, c: C.white, a: oa });
  }
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
  txt(DATA.film.title_zh, W / 2, 260, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('DEFICIT ANGLES AND SPIN TWO', W / 2, 350, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 2, ls: 5 });
  daFan({ cx: 640, cy: 640, r: 190, q: 4, a: 1, gap: 1, lab: 1 });
  daFan({ cx: 1280, cy: 640, r: 190, q: 5, a: 1, gap: 1, lab: 1 });
  daRich([['2π − 4θ ≈ ', C.white], [`+${daDeg(daDef(4)).toFixed(2)}°`, C.mag]], 640, 890, { size: 32, align: 'center' });
  daRich([['2π − 5θ ≈ ', C.white], [`${daDeg(daDef(5)).toFixed(2)}°`.replace('-', '−'), C.mag]], 1280, 890, { size: 32, align: 'center' });
  bloom(0.5);
  txt(`${DATA.book.code} · FILM`, W / 2, 960, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1020, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
