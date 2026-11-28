/* Film · Four Integers, One Turn · 四个整数，一次转动 (book omega-math, chapter 3). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests (all in chapter 3 of the book):
     flat    3.1: in dimension one or two a bracket that keeps a left-nondegenerate invariant form is orthogonal to
             x and y, which span everything, so it vanishes (the chapter's two-line argument, ARGUED); in dimension
             three a positive invariant form locks the bracket to c (x × y), c > 0
             (thm-ch03-dim3-cross-bracket, LEAN, classical Mathlib side). The plane and the axes are schematic.
     root    3.2: p_Half = (1, 1, 0, 0) has squared norm 2, not a square; four integers up to scaling leave three
             degrees of freedom; Ad(p_Half)(x, y, z) = (x, −z, y) (example ex-ch03-five-anchors-and-closure item 2,
             recomputed here: computed).
     canon   3.2: the GCD-and-sign normalisation (−2, 2, 2, 2) → (−1, 1, 1, 1) → (1, −1, −1, −1) (computed; the
             canonical model itself is the chapter's definition, its bridge to rays is argued).
     laws    3.2: normSq_mul, triad_left_absorption, lagrange_identity, kappa_le_one (LEAN, Omega library) with the
             worked values |(1+i)(1+j)|² = 4, triad(p_Half, p_Half, g120) = (2, 2, 2, 2), κ(p0, p_Half) = 1/2,
             κ(p_Half, q_Half) = 1/4 and the six minors 1, 1, 0, 1, 0, 0 (computed here).
     beats   3.3 item 3: g120 = (1, 1, 1, 1): raw (−2, 2, 2, 2) → (1, −1, −1, −1), raw (4, 0, 0, 0) → p0; with signs
             kept the orbit has six beats (computed).
     order   3.3 item 4 and thm-ch03-phalf-qhalf-noncommutative (LEAN, Omega library): (1+i)(1+j) = (1, 1, 1, 1),
             (1+j)(1+i) = (1, 1, 1, −1), not on one ray; the adjoint rotations of both orders are the exact integer
             matrices Ad(p_Half) Ad(q_Half) and Ad(q_Half) Ad(p_Half) (computed).
     shadow  3.4: the rational unit points are dense with gaps (hand derivation, ARGUED; drawn as rational points of a
             circle, schematic); reading completeness gives a bijection onto Sp(1) (thm-ch03-rank-five-isomorphism,
             LEAN, classical side); rank 10 and antipodal identification for canonical ternions (remark
             rem-ch03-shadow-boundary, MODEL → ARGUED).
   FILM.init recomputes every number on screen by a second route; any disagreement goes to window.FILM_ERRORS. */
'use strict';

const FI_LEAN = {
  cross: 'D5/S3/Quantum/Algebra/InvariantMetric/LowDimensionInvariantMetric.exists_basis_bracket_eq_smul_cross',
  normSq: 'D5/S3/Quantum/AURICOmega/OmegaTernionHeap.normSq_mul',
  absorb: 'D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_left_absorption',
  lagrange: 'D5/S3/Quantum/AURICOmega/OmegaTernionHeap.lagrange_identity',
  kappa: 'D5/S3/Quantum/AURICOmega/OmegaTernionHeap.kappa_le_one',
  noncomm: 'D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.phalf_qhalf_noncommutative',
  equiv: 'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv'
};

/* ---------------- exact integer quaternions (w, x, y, z) = w + x i + y j + z k ---------------- */
const qMul = (p, q) => [
  p[0] * q[0] - p[1] * q[1] - p[2] * q[2] - p[3] * q[3],
  p[0] * q[1] + p[1] * q[0] + p[2] * q[3] - p[3] * q[2],
  p[0] * q[2] - p[1] * q[3] + p[2] * q[0] + p[3] * q[1],
  p[0] * q[3] + p[1] * q[2] - p[2] * q[1] + p[3] * q[0]
];
const qConj = p => [p[0], -p[1], -p[2], -p[3]];
const triad = (a, b, c) => qMul(qMul(a, qConj(b)), c);
const dot4 = (p, q) => p.reduce((s, v, i) => s + v * q[i], 0);
const n2 = p => dot4(p, p);
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const gcd4 = p => p.reduce((g, v) => gcd(g, v), 0);
/* the canonical name of a ray: divide by the gcd, then make the first nonzero entry positive */
const canon = p => { const g = gcd4(p); const r = p.map(v => v / g); const f = r.find(v => v !== 0); return f < 0 ? r.map(v => -v) : r; };
const fr = (n, d) => { const g = gcd(n, d) || 1; return [n / g, d / g]; };
const fStr = x => (x[1] === 1 ? String(x[0]) : `${x[0]}/${x[1]}`);
const kap = (a, b) => fr(dot4(a, b) ** 2, n2(a) * n2(b));
const neg = v => (v < 0 ? '−' + (-v) : String(v));
const qs = p => '(' + p.map(neg).join(', ') + ')';
const P0 = [1, 0, 0, 0], PH = [1, 1, 0, 0], QH = [1, 0, 1, 0], G120 = [1, 1, 1, 1];
/* adjoint rotation Ad(p)(v) = p v p̄ / |p|² on pure vectors, as an exact integer matrix when |p|² divides */
const adVec = (p, v) => { const r = qMul(qMul(p, [0, ...v]), qConj(p)); return r.slice(1).map(c => c / n2(p)); };
const adMat = p => [0, 1, 2].map(i => adVec(p, [0, 1, 2].map(j => (i === j ? 1 : 0))));   // rows = images of e_i
const matMul = (A, B) => A.map((_, i) => [0, 1, 2].map(j => A[i].reduce((s, _, k) => s + A[i][k] * B[k][j], 0)));
const matT = A => [0, 1, 2].map(i => [0, 1, 2].map(j => A[j][i]));
/* the six 2 × 2 minors a_i b_j − a_j b_i, i < j */
const minors = (a, b) => { const m = []; for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) m.push(a[i] * b[j] - a[j] * b[i]); return m; };

/* the worked values */
const FI = {
  phqh: qMul(PH, QH), qhph: qMul(QH, PH),
  absorb: triad(PH, PH, G120),
  beats: [], beatsRaw: [], spin: [],
  adPH: [0, 1, 2].map(j => adVec(PH, [[1, 0, 0], [0, 1, 0], [0, 0, 1]][j])),
  kP0PH: kap(P0, PH), kPHQH: kap(PH, QH), kNC: null,
  minors: minors(PH, QH)
};
FI.kNC = kap(FI.phqh, FI.qhph);
{ let g = P0; FI.beats.push(g); for (let k = 0; k < 3; k++) { const raw = qMul(g, G120); FI.beatsRaw.push(raw); g = canon(raw); FI.beats.push(g); } }
{ let g = P0; FI.spin.push(g); for (let k = 0; k < 6; k++) { const raw = qMul(g, G120); const d = gcd4(raw); g = raw.map(v => v / d); FI.spin.push(g); } }
/* exact rational points on the unit circle from rational slopes t = m/n (schematic stand-in for S³(Q)) */
const RATPTS = [];
{
  const seen = new Set();
  for (let n = 1; n <= 9; n++) for (let m = -3 * n; m <= 3 * n; m++) {
    if (gcd(m, n) !== 1) continue;
    const A = n * n - m * m, B = 2 * m * n, D = n * n + m * m;   // ((1 − t²)/(1 + t²), 2t/(1 + t²))
    for (const s of [1, -1]) { const key = `${s * A}/${D},${s * B}/${D}`; if (!seen.has(key)) { seen.add(key); RATPTS.push([s * A, s * B, D]); } }
  }
}

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  const check = (ok, m) => { if (!ok) E.push('four-integers-one-turn film: ' + m); };
  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(FI_LEAN).length, `film.json cites ${lean.length} declarations`);
  for (const gid of Object.values(FI_LEAN)) { const r = leanCite(gid); check(r && r.kind === 'theorem', `${gid} is not a cited theorem`); }
  /* 1. squared norms 1, 2, 2, 1, 4 and the four-square law on the example, by expanding the squares by hand */
  check([P0, PH, QH, [0, 1, 0, 0], G120].map(n2).join() === '1,2,2,1,4', 'squared norms');
  check(n2(FI.phqh) === 4 && n2(FI.phqh) === n2(PH) * n2(QH), 'four-square law on (1+i)(1+j)');
  /* 2. the two orders, written out from i j = k, j i = −k */
  check(qs(FI.phqh) === '(1, 1, 1, 1)' && qs(FI.qhph) === '(1, 1, 1, −1)', `orders ${qs(FI.phqh)} ${qs(FI.qhph)}`);
  check(qs(triad(PH, P0, QH)) === '(1, 1, 1, 1)' && qs(triad(QH, P0, PH)) === '(1, 1, 1, −1)', 'triads at p0');
  let ray = false;
  for (let k = -8; k <= 8; k++) for (let l = -8; l <= 8; l++) if (k && l && FI.phqh.every((v, i) => k * v === l * FI.qhph[i])) ray = true;
  check(!ray, 'the two orders on one ray');
  check(fStr(FI.kNC) === '1/4', 'mutual reading 1/4');
  /* 3. absorption: (1+i)(1−i) = 2, so the raw triad is 2 · g120 */
  check(qs(qMul(PH, qConj(PH))) === '(2, 0, 0, 0)' && qs(FI.absorb) === '(2, 2, 2, 2)' && qs(canon(FI.absorb)) === qs(G120), 'left absorption');
  /* 4. readings and the Lagrange identity on (p_Half, q_Half) */
  check(fStr(FI.kP0PH) === '1/2' && fStr(FI.kPHQH) === '1/4', 'readings 1/2, 1/4');
  check(FI.minors.map(v => v * v).join() === '1,1,0,1,0,0', `minor squares ${FI.minors}`);
  check(n2(PH) * n2(QH) - dot4(PH, QH) ** 2 === FI.minors.reduce((s, v) => s + v * v, 0), 'Lagrange identity 4 − 1 = 3');
  /* 5. normalisation of (−2, 2, 2, 2) and the three beats */
  check(gcd4([-2, 2, 2, 2]) === 2 && qs(canon([-2, 2, 2, 2])) === '(1, −1, −1, −1)', 'normalisation');
  check(FI.beatsRaw.map(qs).join(' ') === '(1, 1, 1, 1) (−2, 2, 2, 2) (4, 0, 0, 0)', `raw beats ${FI.beatsRaw.map(qs)}`);
  check(FI.beats.map(qs).join(' ') === '(1, 0, 0, 0) (1, 1, 1, 1) (1, −1, −1, −1) (1, 0, 0, 0)', 'canonical beats');
  check(qs(FI.spin[3]) === '(−1, 0, 0, 0)' && qs(FI.spin[6]) === '(1, 0, 0, 0)' && FI.spin.slice(1, 6).every(p => qs(p) !== '(1, 0, 0, 0)'), 'six signed beats');
  /* 6. Ad(p_Half)(x, y, z) = (x, −z, y), via (1+i)(x i + y j + z k)(1−i) = 2x i − 2z j + 2y k, at (2, 3, 5) */
  check(adVec(PH, [2, 3, 5]).join() === '2,-5,3', 'Ad(p_Half)');
  check(adVec(QH, [2, 3, 5]).join() === '5,3,-2', 'Ad(q_Half)');
  /* the adjoint is a homomorphism: Ad(pq) = Ad(p) Ad(q) (as maps), and the two orders differ */
  check(JSON.stringify(matT(adMat(FI.phqh))) === JSON.stringify(matMul(matT(adMat(PH)), matT(adMat(QH)))), 'Ad(pq) = Ad(p)Ad(q)');
  check(JSON.stringify(adMat(FI.phqh)) !== JSON.stringify(adMat(FI.qhph)), 'the two rotations differ');
  /* 7. rational points really are on the unit circle */
  check(RATPTS.length > 40 && RATPTS.every(([a, b, d]) => a * a + b * b === d * d), 'rational circle points');
});
Object.assign(FILM.speed, { flat: 0.02, root: 0.016, canon: 0.016, laws: 0.016, beats: 0.016, order: 0.014, shadow: 0.012, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const fade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const curLine = S => { let c = -1; for (let j = 0; j < S.L.length; j++) if (S.u >= S.L[j].s - 0.1) c = j; return c; };
const FI_MISSING = new Set();
function leanChip(x, y, gid, a, size = 20) {
  if (a <= 0.003) return 0;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!FI_MISSING.has(gid)) { FI_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return 0;
  }
  const head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  const name = (r.name || r.label).split('.').slice(-1)[0];
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(name, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  return wh + 12 + tw(name, size, F.mono, 700);
}
function tag(x, y, s, col, a, align = 'left') {
  if (a <= 0.003) return;
  const w = tw(s, 17, F.zh, 700, 1) + 20, x0 = align === 'right' ? x - w : x;
  box(x0, y - 21, w, 30, col, a, 1.5, 'rgba(0,0,0,0.5)');
  txt(s, x0 + 10, y, { size: 17, fam: F.zh, w: 700, c: col, a, ls: 1 });
}
/* a quadruple drawn entry by entry; o.hi = { index: colour } highlights entries */
function quad(p, x, y, o = {}) {
  const size = o.size || 44, a = o.a == null ? 1 : o.a, col = o.c || C.white, hi = o.hi || {};
  if (a <= 0.003) return x;
  const parts = ['('];
  p.forEach((v, i) => { parts.push([neg(v), i]); if (i < 3) parts.push(', '); });
  parts.push(')');
  let w = 0; for (const s of parts) w += tw(typeof s === 'string' ? s : s[0], size, F.mono, 700);
  let cx = o.align === 'center' ? x - w / 2 : o.align === 'right' ? x - w : x;
  for (const s of parts) {
    const str = typeof s === 'string' ? s : s[0], c = typeof s === 'string' ? col : (hi[s[1]] || col);
    txt(str, cx, y, { size, fam: F.mono, w: 700, c, a });
    cx += tw(str, size, F.mono, 700);
  }
  return cx;
}
/* a row of math text and quadruples, laid out by measured widths; items: [string | quadruple, colour?, alpha?] */
function eqRow(x, y, items, o = {}) {
  const size = o.size || 32;
  let cx = x;
  for (const it of items) {
    const [v, col, al] = it, a = (o.a == null ? 1 : o.a) * (al == null ? 1 : al);
    if (typeof v === 'string') { txt(v, cx, y, { size, fam: F.math, w: 700, c: col || C.white, a }); cx += tw(v, size, F.math, 700); }
    else cx = quad(v, cx, y, { size: size * 0.95, a, c: col || C.white }) + 6;
  }
  return cx;
}
/* 3D axes helper: orthographic-ish projection of a unit frame */
function view(v, cx, cy, s, yaw, pitch) {
  const p = rotX(rotY([v[0], -v[2], v[1]], yaw), pitch);   // z up on screen
  return [cx + p[0] * s, cy + p[1] * s];
}

/* opening title */
function title(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('FOUR INTEGERS, ONE TURN', p, 5), W / 2, 580, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 6, ab: 2 });
  txt('[w : x : y : z] · NO √2 · NO QUOTIENT · ORDER MATTERS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                            scene 1 · FLAT WORLDS                          */
/* ======================================================================= */
SCENES.flat = S => {
  title(S);
  const a = clamp((S.u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - S.u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [3, 'Lean checks', 'lean']]);
  const cl = curLine(S);
  /* left: the circle (line 0), then the plane where the bracket dies (lines 1–2) */
  const pa = a;
  panel(140, 190, 780, 600, pa, cl <= 2 ? C.now : C.cyan, cl === 0 ? 'ONE DIMENSION · 一维圆周' : 'TWO DIMENSIONS · 二维平面');
  const cx = 530, cy = 540;
  if (cl === 0 || S.u < lineAt(S, 1).s) {
    /* a circle: two turns α then β equal β then α */
    ring(cx, cy, 190, C.cyan, pa, 3);
    const sw = ease(at(S, 0, 2.2, 0.6));
    const ang = -Math.PI / 2 + sw * 1.4;
    dot(cx + 190 * Math.cos(ang), cy + 190 * Math.sin(ang), 18, 'o', pa);
    txt('α ∘ β = β ∘ α', cx, cy + 12, { size: 44, fam: F.math, w: 700, align: 'center', c: C.white, a: pa * at(S, 0, 0.6, 1.2) });
    txt('turns on a circle commute · 圆周转动可交换', cx, 760, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: pa });
  } else {
    /* axes x (cyan) and y (cyan) span the plane; the bracket must be orthogonal to both */
    const ax = 210, X = [cx + ax, cy], Y = [cx - 70, cy - ax + 30];
    const ga = pa * at(S, 1, 0.5);
    for (let i = -3; i <= 3; i++) { line(cx - 300, cy + i * 70, cx + 300, cy + i * 70, C.dim, ga * 0.25, 1); line(cx + i * 90, cy - 230, cx + i * 90, cy + 230, C.dim, ga * 0.25, 1); }
    arrow(cx, cy, X[0], X[1], C.cyan, ga, 4); txt('x', X[0] + 14, X[1] + 10, { size: 34, fam: F.math, w: 700, c: C.cyan, a: ga });
    arrow(cx, cy, Y[0], Y[1], C.cyan, ga, 4); txt('y', Y[0] - 30, Y[1] - 6, { size: 34, fam: F.math, w: 700, c: C.cyan, a: ga });
    txt('Φ([x, y], x) = 0     Φ([x, y], y) = 0', cx, 268, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a: pa * Q(S, 1, 'orthogonal to both', 0.6) });
    /* the candidate bracket: amber, searching for a direction orthogonal to both, then shrinking to 0 */
    const sh = Q(S, 2, 'orthogonal to everything', 1.2);
    const seek = at(S, 1, 3.0, 1.2);
    const len = 170 * (1 - ease(sh));
    const th = -0.6 + 2.4 * Math.sin(seek * 5.0 + S.u * 0.6) * (1 - sh);
    const ba = pa * clamp(seek * 3);
    if (len > 4) arrow(cx, cy, cx + len * Math.cos(th), cy + len * Math.sin(th), C.now, ba, 4);
    if (len > 4) txt('[x, y] ?', cx + (len + 30) * Math.cos(th) - 40, cy + (len + 30) * Math.sin(th) + 10, { size: 28, fam: F.math, w: 700, c: C.now, a: ba * (1 - sh) });
    const za = pa * Q(S, 2, 'it is zero', 0.5);
    dot(cx, cy, 16, 'o', za);
    txt('[x, y] = 0', cx, cy + 90, { size: 54, fam: F.math, w: 700, align: 'center', c: C.now, a: za, ab: 2 });
    txt('x, y span the plane · x、y 张满平面', cx, 760, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: pa * at(S, 2, 0.6) });
  }
  /* right: the third axis stands up, and the bracket becomes c (x × y) */
  const ra = a * at(S, 3, 0.7);
  if (ra > 0.003) {
    panel(1000, 190, 780, 600, ra, C.cyan, 'THREE DIMENSIONS · 三维 · ROOM');
    const c3 = [1390, 520], s = 200, yaw = 0.55 + 0.12 * Math.sin(S.u * 0.4), pitch = 0.32;
    const up = ease(at(S, 3, 1.4, 0.3));
    const O = view([0, 0, 0], c3[0], c3[1], s, yaw, pitch);
    const ex = view([1, 0, 0], c3[0], c3[1], s, yaw, pitch), ey = view([0, 1, 0], c3[0], c3[1], s, yaw, pitch), ez = view([0, 0, up], c3[0], c3[1], s, yaw, pitch);
    arrow(O[0], O[1], ex[0], ex[1], C.cyan, ra, 4); txt('x', ex[0] + 10, ex[1] + 28, { size: 32, fam: F.math, w: 700, c: C.cyan, a: ra });
    arrow(O[0], O[1], ey[0], ey[1], C.cyan, ra, 4); txt('y', ey[0] + 12, ey[1] + 8, { size: 32, fam: F.math, w: 700, c: C.cyan, a: ra });
    if (up > 0.02) { arrow(O[0], O[1], ez[0], ez[1], C.mag, ra, 5); txt('x × y', ez[0] + 16, ez[1] + 6, { size: 32, fam: F.math, w: 700, c: C.mag, a: ra * up }); }
    const fa = ra * Q(S, 3, 'locks the bracket', 0.6);
    txt('[x, y] = c · (x × y),   c > 0', 1390, 700, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a: fa });
    txt('in a Φ-orthonormal basis · 标准正交基坐标', 1390, 732, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: fa });
    txt('dim 3 · non-Abelian · Φ(x, x) > 0', 1390, 262, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ra });
    leanChip(1030, 772, FI_LEAN.cross, ra * Q(S, 3, 'Lean checks', 0.6), 19);
    tag(1770, 772, 'CLASSICAL · Mathlib', C.dim, ra * Q(S, 3, 'Lean checks', 0.6), 'right');
  }
  tag(150, 830, 'SCHEMATIC · 示意', C.argued, a * 0.9);
};

/* ======================================================================= */
/*                            scene 2 · NO ROOT TWO                          */
/* ======================================================================= */
SCENES.root = S => {
  const a = fade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const cl = curLine(S);
  /* left column: the quadruple, its squared length, the refused root, three degrees of freedom */
  panel(140, 190, 860, 600, a, C.cyan, 'p_Half = 1 + i');
  txt('1 + i', 570, 300, { size: 40, fam: F.math, w: 700, align: 'center', c: C.white, a: a * at(S, 0, 0.6) });
  quad(PH, 570, 380, { size: 64, align: 'center', a: a * Q(S, 0, 'one, one, zero, zero', 0.6), c: cl === 0 ? C.now : C.white });
  const na = a * at(S, 1, 0.6);
  txt('|p|² = 1² + 1² + 0² + 0² = 2', 570, 470, { size: 38, fam: F.math, w: 700, align: 'center', c: C.white, a: na });
  const ra = a * Q(S, 1, 'square root of two', 0.6);
  if (ra > 0.003) {
    txt('(1 + i) / √2', 570, 548, { size: 40, fam: F.math, w: 700, align: 'center', c: C.dim, a: ra });
    const w0 = tw('(1 + i) / √2', 40, F.math, 700);
    line(570 - w0 / 2 - 10, 534, 570 + w0 / 2 + 10, 534, C.mag, ra, 4);
    txt('not a rational point · 引入无理数', 570, 590, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.mag, a: ra });
  }
  const da = a * at(S, 2, 0.6);
  txt('[w : x : y : z]', 570, 670, { size: 48, fam: F.mono, w: 700, align: 'center', c: cl === 2 ? C.now : C.cyan, a: da });
  txt('4 integers − 1 scale = 3 degrees of freedom', 570, 722, { size: 26, fam: F.disp, w: 700, align: 'center', c: C.white, a: a * Q(S, 2, 'three degrees of freedom', 0.6) });
  txt('四个整数 − 一个缩放 = 三个自由度', 570, 760, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a * Q(S, 2, 'three degrees of freedom', 0.6) });
  /* right: the exact quarter turn about x, j → k, k → −j */
  const ta = a * at(S, 3, 0.6);
  if (ta > 0.003) {
    panel(1060, 190, 720, 600, ta, C.cyan, 'Ad(1 + i) · EXACT QUARTER TURN');
    const c3 = [1420, 470], s = 170, yaw = 0.5, pitch = 0.3;
    const sp = ease(Q(S, 3, 'divide by two', 1.6));
    const ang = sp * Math.PI / 2;
    const O = view([0, 0, 0], c3[0], c3[1], s, yaw, pitch);
    const ex = view([1.15, 0, 0], c3[0], c3[1], s, yaw, pitch);
    arrow(O[0], O[1], ex[0], ex[1], C.vio, ta, 4); txt('x · axis', ex[0] - 10, ex[1] + 34, { size: 24, fam: F.mono, w: 700, c: C.vio, a: ta });
    const ej0 = view([0, 1, 0], c3[0], c3[1], s, yaw, pitch), ek0 = view([0, 0, 1], c3[0], c3[1], s, yaw, pitch);
    dashed(O[0], O[1], ej0[0], ej0[1], C.dim, ta * 0.6, 2); dashed(O[0], O[1], ek0[0], ek0[1], C.dim, ta * 0.6, 2);
    txt('j', ej0[0] + 10, ej0[1] + 6, { size: 26, fam: F.math, w: 700, c: C.dim, a: ta * (1 - sp) });
    txt('k', ek0[0] + 10, ek0[1] - 4, { size: 26, fam: F.math, w: 700, c: C.dim, a: ta * (1 - sp) });
    /* rotate j and k about x by ang: (y, z) → (y cos − z sin, y sin + z cos) */
    const rj = view([0, Math.cos(ang), Math.sin(ang)], c3[0], c3[1], s, yaw, pitch);
    const rk = view([0, -Math.sin(ang), Math.cos(ang)], c3[0], c3[1], s, yaw, pitch);
    arrow(O[0], O[1], rj[0], rj[1], C.cyan, ta, 5); arrow(O[0], O[1], rk[0], rk[1], C.mag, ta, 5);
    if (sp > 0.95) {
      txt('j ↦ k', rj[0] + 14, rj[1] - 14, { size: 26, fam: F.math, w: 700, c: C.cyan, a: ta });
      txt('k ↦ −j', rk[0] - 110, rk[1] - 6, { size: 26, fam: F.math, w: 700, c: C.mag, a: ta });
    }
    txt('(1+i)(xi + yj + zk)(1−i) = 2x i − 2z j + 2y k', 1420, 690, { size: 24, fam: F.math, w: 700, align: 'center', c: C.white, a: ta * Q(S, 3, 'conjugate by one plus i', 0.6) });
    txt('÷ 2  ⟹  (x, y, z) ↦ (x, −z, y)', 1420, 740, { size: 32, fam: F.math, w: 700, align: 'center', c: C.now, a: ta * Q(S, 3, 'x, minus z, y', 0.6) });
  }
};

/* ======================================================================= */
/*                          scene 3 · ONE NAME PER RAY                       */
/* ======================================================================= */
SCENES.canon = S => {
  const a = fade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const cl = curLine(S);
  /* top: the three-step pipeline */
  const raw = [-2, 2, 2, 2], red = raw.map(v => v / gcd4(raw)), nm = canon(raw);
  const y = 300;
  const s0 = a * Q(S, 0, 'minus two, two, two, two', 0.6);
  chip(330, y - 14, 340, 96, '', cl === 0 ? C.now : C.cyan, s0);
  quad(raw, 330, y, { size: 40, align: 'center', a: s0, c: cl === 0 ? C.now : C.white });
  txt('raw · 原始', 330, y + 70, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: s0 });
  const s1 = a * Q(S, 1, 'greatest common divisor', 0.6);
  arrow(520, y - 14, 640, y - 14, C.cyan, s1, 3);
  txt('÷ gcd = 2', 580, y - 40, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: s1 });
  chip(840, y - 14, 340, 96, '', cl === 1 ? C.now : C.cyan, s1);
  quad(red, 840, y, { size: 40, align: 'center', a: s1, c: C.white, hi: { 0: C.mag } });
  txt('coprime · 互素', 840, y + 70, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: s1 });
  const s2 = a * Q(S, 1, 'flip signs', 0.6);
  arrow(1030, y - 14, 1150, y - 14, C.cyan, s2, 3);
  txt('× (−1)', 1090, y - 40, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: s2 });
  const s3 = a * Q(S, 1, 'first nonzero entry is positive', 0.6);
  chip(1440, y - 14, 420, 110, '', C.now, s2);
  quad(nm, 1440, y, { size: 44, align: 'center', a: s2, c: C.now });
  txt('first nonzero > 0 · 首非零为正', 1440, y + 76, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.now, a: s3 });
  /* bottom: the ray k · (1, −1, −1, −1), schematic, with the canonical point lit */
  const ba = a * at(S, 0, 0.6, 0.8);
  panel(140, 430, 1640, 360, ba, C.cyan, 'ONE RAY = ALL NONZERO MULTIPLES · 一条射线 = 全部非零整数倍');
  const x0 = 960, yr = 590, step = 230;
  line(220, yr, 1700, yr, C.cyan, ba * 0.6, 2);
  for (let k = -3; k <= 3; k++) {
    if (!k) { ring(x0, yr, 12, C.dim, ba * 0.6, 2); txt('0 excluded', x0, yr + 58, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ba }); continue; }
    const p = nm.map(v => v * k), isName = k === 1, x = x0 + k * step;
    const lit = isName && S.u > phraseAt(S, 2, 'Its name is');
    dot(x, yr, isName ? 22 : 14, lit ? 'o' : 'c', ba);
    quad(p, x, yr - 34, { size: 20, align: 'center', a: ba, c: lit ? C.now : C.white });
    txt(`k = ${neg(k)}`, x, yr + 46, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ba });
  }
  const ea = a * Q(S, 2, 'No quotient axiom', 0.6);
  txt('a = b  ⟺  four integer comparisons · 判等即逐个比较四个整数', 960, 712, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.white, a: ea });
  txt('no Quot.sound · DecidableEq', 960, 756, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ea });
  tag(160, 830, 'SCHEMATIC RAY · 示意', C.argued, ba * 0.9);
};

/* ======================================================================= */
/*                           scene 4 · FOUR SQUARES                          */
/* ======================================================================= */
SCENES.laws = S => {
  const a = fade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'lean'], [2, null, 'computed'], [3, 'never exceeds one', 'lean']]);
  const cl = curLine(S);
  const rows = [
    { y: 196, gid: [FI_LEAN.normSq] },
    { y: 352, gid: [FI_LEAN.absorb] },
    { y: 508, gid: [] },
    { y: 640, gid: [FI_LEAN.lagrange, FI_LEAN.kappa] }
  ];
  rows.forEach((r, i) => {
    const ra = a * at(S, i, 0.6);
    const h = i === 3 ? 196 : i === 2 ? 118 : 140;
    panel(140, r.y, 1640, h, ra, cl === i ? C.now : C.cyan, null);
  });
  /* row 1: four squares */
  const r0 = a * at(S, 0, 0.6);
  txt('|ab|² = |a|² |b|²', 180, 252, { size: 38, fam: F.math, w: 700, c: C.white, a: r0 });
  const q0 = Q(S, 0, 'one plus i', 0.5);
  eqRow(640, 252, [['(1 + i)(1 + j) = ', null, q0], [FI.phqh, null, q0], [`    |·|² = ${n2(FI.phqh)} = ${n2(PH)} × ${n2(QH)}`, C.now, Q(S, 0, 'two times two', 0.5)]], { size: 34, a: r0 });
  leanChip(180, 312, FI_LEAN.normSq, r0, 19);
  /* row 2: never zero, left absorption */
  const r1 = a * at(S, 1, 0.6);
  txt('triad(a, b, c) = a · b̄ · c ≠ 0', 180, 408, { size: 34, fam: F.math, w: 700, c: C.white, a: r1 });
  const q1 = Q(S, 1, 'x, x, z', 0.5);
  eqRow(780, 408, [['triad(1+i, 1+i, g₁₂₀) = ', null, q1], [FI.absorb, null, q1], ['  = 2 · g₁₂₀ ∼ g₁₂₀', C.now, Q(S, 1, 'ray of z', 0.5)]], { size: 30, a: r1 });
  leanChip(180, 468, FI_LEAN.absorb, r1 * Q(S, 1, 'x, x, z', 0.5), 19);
  txt('numbers: computed here · 数值为屏幕计算', 1760, 468, { size: 18, fam: F.zh, w: 700, align: 'right', c: C.cyan, a: r1 });
  /* row 3: the reading κ */
  const r2 = a * at(S, 2, 0.6);
  txt('κ(a, b) = ⟨a, b⟩² / (|a|² |b|²)', 180, 580, { size: 36, fam: F.math, w: 700, c: C.white, a: r2 });
  txt(`κ(1, 1 + i) = 1² / (1 · 2) = ${fStr(FI.kP0PH)}`, 1000, 580, { size: 34, fam: F.math, w: 700, c: C.now, a: r2 * Q(S, 2, 'a plain fraction', 0.5) });
  /* row 4: Lagrange identity on (1+i, 1+j): 2 · 2 − 1² = 3 = six squared minors */
  const r3 = a * at(S, 3, 0.6);
  txt('|a|²|b|² − ⟨a, b⟩² = Σ (aᵢbⱼ − aⱼbᵢ)²', 180, 696, { size: 34, fam: F.math, w: 700, c: C.white, a: r3 });
  const mq = FI.minors.map(v => v * v);
  const ma = r3 * Q(S, 3, 'six squared', 0.6);
  txt('a = 1 + i, b = 1 + j:', 180, 752, { size: 26, fam: F.math, w: 700, c: C.dim, a: ma });
  txt(`${n2(PH)} · ${n2(QH)} − ${dot4(PH, QH)}² = ${n2(PH) * n2(QH) - dot4(PH, QH) ** 2} = ` + mq.join(' + '), 470, 752, { size: 30, fam: F.math, w: 700, c: C.now, a: ma });
  txt(`⟹  κ = ${fStr(FI.kPHQH)} ≤ 1`, 1290, 752, { size: 30, fam: F.math, w: 700, c: C.now, a: r3 * Q(S, 3, 'six squared minors', 0.5) });
  const la = r3 * Q(S, 3, 'six squared minors', 0.5);
  const w1 = leanChip(180, 816, FI_LEAN.lagrange, la, 19);
  leanChip(180 + w1 + 40, 816, FI_LEAN.kappa, la, 19);
  txt('Omega library only · 仅 Omega 库', 1760, 816, { size: 18, fam: F.zh, w: 700, align: 'right', c: C.lean, a: la });
};

/* ======================================================================= */
/*                            scene 5 · THREE BEATS                          */
/* ======================================================================= */
SCENES.beats = S => {
  const a = fade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const cl = curLine(S);
  /* left: the projective orbit, three nodes on a triangle */
  panel(140, 190, 900, 600, a, C.cyan, 'CANONICAL NAMES · 规范名 · ×g₁₂₀');
  const cx = 590, cy = 530, R = 190;
  const pos = i => { const t = -Math.PI / 2 + i * TAU / 3; return [cx + R * Math.cos(t), cy + R * Math.sin(t)]; };
  const beat = cl <= 0 ? 0 : cl === 1 ? 1 : 2;
  const nodeA = [a * at(S, 0, 0.6), a * Q(S, 0, 'starting from one', 0.6), a * Q(S, 1, 'named one', 0.6)];
  for (let i = 0; i < 3; i++) {
    const [x, y] = pos(i), [x2, y2] = pos((i + 1) % 3);
    const ea = i === 0 ? nodeA[1] : i === 1 ? nodeA[2] : a * Q(S, 2, 'we are home', 0.6);
    if (ea > 0.003) arrow(lerp(x, x2, 0.16), lerp(y, y2, 0.16), lerp(x, x2, 0.84), lerp(y, y2, 0.84), C.cyan, ea, 3);
  }
  const labels = [FI.beats[0], FI.beats[1], FI.beats[2]];
  const curNode = cl === 2 && S.u > phraseAt(S, 2, 'we are home') ? 0 : beat;
  labels.forEach((p, i) => {
    const [x, y] = pos(i), na = nodeA[i];
    const on = i === curNode && cl <= 2;
    dot(x, y, on ? 22 : 15, on ? 'o' : 'c', na);
    const ly = i === 0 ? y - 30 : y + 52, lx = i === 0 ? x : i === 1 ? x + 30 : x - 30;
    quad(p, lx, ly, { size: 30, align: i === 0 ? 'center' : i === 1 ? 'center' : 'center', a: na, c: on ? C.now : C.white });
    const nm = ['p₀ = 1', 'g₁₂₀', 'g₂'][i];
    txt(nm, i === 0 ? lx + 190 : lx, i === 0 ? ly : ly + 38, { size: 24, fam: F.math, w: 700, align: 'center', c: C.dim, a: na });
  });
  /* raw products at the centre */
  const rawA1 = a * Q(S, 1, 'Beat two', 0.6), rawA2 = a * Q(S, 2, 'raw product', 0.6);
  if (cl === 1) { txt('raw', 300, cy - 150, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: rawA1 }); quad(FI.beatsRaw[1], 300, cy - 110, { size: 28, align: 'center', a: rawA1, c: C.mag }); txt('÷ 2, flip', 300, cy - 70, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: rawA1 }); }
  if (cl >= 2) { txt('raw', 300, cy - 150, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: rawA2 }); quad(FI.beatsRaw[2], 300, cy - 110, { size: 28, align: 'center', a: rawA2, c: C.mag }); txt('÷ 4', 300, cy - 70, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: rawA2 }); }
  stamp('3 BEATS', 590, 760, a * Q(S, 2, 'we are home', 0.5), C.now, 34, -0.05);
  /* right: signed orbit, six nodes */
  const sa = a * at(S, 3, 0.6);
  if (sa > 0.003) {
    panel(1100, 190, 680, 600, sa, C.vio, 'SIGNS KEPT · 保留符号 · 6 BEATS');
    const c2 = [1440, 490], R2 = 165;
    const pos2 = i => { const t = -Math.PI / 2 + i * TAU / 6; return [c2[0] + R2 * Math.cos(t), c2[1] + R2 * Math.sin(t)]; };
    const prog = Q(S, 3, 'six beats', 2.4);
    for (let i = 0; i < 6; i++) {
      const [x, y] = pos2(i), [x2, y2] = pos2((i + 1) % 6);
      const ea = sa * clamp(prog * 6 - i);
      if (ea > 0.003) arrow(lerp(x, x2, 0.2), lerp(y, y2, 0.2), lerp(x, x2, 0.8), lerp(y, y2, 0.8), C.vio, ea, 3);
      dot(x, y, 12, 'v', sa);
      const p = FI.spin[i], cs = Math.cos(-Math.PI / 2 + i * TAU / 6);
      const al = cs > 0.3 ? 'left' : cs < -0.3 ? 'right' : 'center';
      const lx = al === 'left' ? x + 18 : al === 'right' ? x - 18 : x, ly = al === 'center' ? (i === 0 ? y - 22 : y + 40) : y + 8;
      quad(p, lx, ly, { size: 18, align: al, a: sa, c: i === 3 ? C.mag : C.white });
    }
    const b3 = sa * Q(S, 3, 'six beats', 0.6);
    txt('beat 3:', c2[0], c2[1] - 8, { size: 22, fam: F.math, w: 700, align: 'center', c: C.mag, a: b3 });
    txt('(−1, 0, 0, 0) ≠ 1', c2[0], c2[1] + 24, { size: 22, fam: F.math, w: 700, align: 'center', c: C.mag, a: b3 });
    txt('signed double cover → ch. 4', c2[0], 776, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: sa * Q(S, 3, 'chapter four', 0.6) });
  }
};

/* ======================================================================= */
/*                        scene 6 · ORDER LEAVES A MARK                      */
/* ======================================================================= */
/* draw the image of the frame e1, e2, e3 under an exact integer rotation M (rows = images, from adMat) */
function frame(M, cx, cy, s, a, prog, ghost = true) {
  const yaw = 0.62, pitch = 0.34;
  const O = view([0, 0, 0], cx, cy, s, yaw, pitch);
  const cols = [C.cyan, C.mag, C.vio], names = ['e₁', 'e₂', 'e₃'];
  for (let i = 0; i < 3; i++) {
    const e = [0, 1, 2].map(j => (i === j ? 1 : 0));
    if (ghost) { const g = view(e, cx, cy, s, yaw, pitch); dashed(O[0], O[1], g[0], g[1], C.dim, a * 0.5, 1.5); }
    const v = e.map((c, j) => lerp(c, M[i][j], ease(prog)));
    const nv = Math.hypot(...v) || 1, vv = v.map(c => c / nv);
    const p = view(vv, cx, cy, s, yaw, pitch);
    arrow(O[0], O[1], p[0], p[1], cols[i], a, 4);
    const dx = p[0] - O[0], dy = p[1] - O[1], dl = Math.hypot(dx, dy) || 1;
    txt(names[i], p[0] + 26 * dx / dl, p[1] + 26 * dy / dl + 9, { size: 24, fam: F.math, w: 700, align: 'center', c: cols[i], a });
  }
}
SCENES.order = S => {
  const a = fade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  const cl = curLine(S);
  const M1 = adMat(FI.phqh), M2 = adMat(FI.qhph);
  const cols = [[140, 'ORDER 1 · (1 + i)(1 + j)', FI.phqh, M1], [980, 'ORDER 2 · (1 + j)(1 + i)', FI.qhph, M2]];
  cols.forEach(([x, ttl, p, M], idx) => {
    const pa = a * (idx === 0 ? at(S, 0, 0.6) : Q(S, 0, 'both orders', 0.6));
    panel(x, 190, 800, 420, pa, C.cyan, ttl);
    const prog = Q(S, 0, 'both orders', 2.2, 0.2 + idx * 0.4);
    frame(M, x + 230, 420, 140, pa, prog);
    const qa = a * (idx === 0 ? Q(S, 1, 'is one, one, one, one', 0.6) : Q(S, 1, 'reversed', 0.6));
    quad(p, x + 600, 400, { size: 42, align: 'center', a: qa, hi: { 3: C.now } });
    matT(M).forEach((row, r) => txt('[' + row.map(v => neg(v).padStart(2, ' ')).join(' ') + ' ]', x + 600, 470 + r * 34, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.dim, a: qa }));
    txt('Ad: exact integer rotation · 精确整数旋转', x + 600, 594, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.dim, a: qa });
  });
  /* the split and the proof */
  const sa = a * Q(S, 1, 'minus one', 0.6);
  txt(`4th entry: +1 ≠ −1   ·   κ = ${fStr(FI.kNC)}`, 960, 660, { size: 30, fam: F.math, w: 700, align: 'center', c: C.now, a: sa });
  const pa = a * at(S, 2, 0.6);
  if (pa > 0.003) {
    panel(140, 690, 1640, 140, pa, cl === 2 ? C.now : C.cyan, null);
    txt('k · (1, 1, 1, 1) = l · (1, 1, 1, −1) ?', 180, 750, { size: 30, fam: F.math, w: 700, c: C.white, a: pa });
    txt('w:  k = l', 820, 750, { size: 30, fam: F.math, w: 700, c: C.white, a: a * Q(S, 2, 'k equals l', 0.5) });
    txt('z:  k = −l', 1060, 750, { size: 30, fam: F.math, w: 700, c: C.white, a: a * Q(S, 2, 'k equals minus l', 0.5) });
    txt('⟹  l = 0  ✗', 1320, 750, { size: 30, fam: F.math, w: 700, c: C.now, a: a * Q(S, 2, 'so l is zero', 0.5) });
    const la = a * Q(S, 3, 'Lean checks', 0.6);
    const w = leanChip(180, 808, FI_LEAN.noncomm, la, 19);
    txt('¬ RayEquiv (triad pHalf p0 qHalf) (triad qHalf p0 pHalf) · Omega library only', 180 + w + 30, 806, { size: 18, fam: F.mono, w: 700, c: C.lean, a: la });
  }
  stamp('ORDER LEAVES A MARK', 1460, 300, a * Q(S, 3, 'Order leaves a mark', 0.5), C.now, 30, -0.06);
};

/* ======================================================================= */
/*                           scene 7 · THE REAL SHADOW                       */
/* ======================================================================= */
SCENES.shadow = S => {
  const a = fade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, 'Lean checks', 'lean'], [2, null, 'argued']]);
  const cl = curLine(S);
  panel(140, 190, 760, 610, a, cl === 2 ? C.cyan : C.now, 'RATIONAL POINTS · 有理点');
  const cx = 520, cy = 518, R = 215;
  const pa = a * at(S, 0, 0.6, 0.3);
  /* the rational points of the unit circle with denominators up to 9² + 27², exact */
  const comp = ease(Q(S, 1, 'reading completeness', 1.6));
  ring(cx, cy, R, C.cyan, a * comp, 4);
  RATPTS.forEach(([A, B, D], i) => {
    const show = clamp(pa * 2 - (i / RATPTS.length) * 0.8);
    dot(cx + R * A / D, cy - R * B / D, 7, 'c', a * show * (1 - 0.6 * comp));
  });
  const gp = Q(S, 0, 'leave gaps', 0.6);
  if (gp > 0) {
    /* the irrational point at angle π/4 is missed: (1/√2, 1/√2) has no rational coordinates */
    const gx = cx + R * Math.SQRT1_2, gy = cy - R * Math.SQRT1_2;
    ring(gx, gy, 18, C.mag, a * gp * (1 - comp), 3);
    txt('(1/√2, 1/√2) · gap', gx - 20, gy + 50, { size: 22, fam: F.math, w: 700, align: 'right', c: C.mag, a: a * gp * (1 - comp) });
  }
  txt(`${RATPTS.length} rational points · 有理点 (a/d, b/d), a² + b² = d²`, cx, 780, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: pa });
  txt(comp > 0.5 ? 'completed: Sp(1)' : 'S³(ℚ), drawn as a circle', cx, 262, { size: 24, fam: F.mono, w: 700, align: 'center', c: comp > 0.5 ? C.cyan : C.dim, a: pa });
  /* right column: two cards */
  const r1 = a * at(S, 0, 0.6, 1.2);
  panel(960, 190, 820, 300, r1, cl <= 1 ? C.now : C.cyan, 'REAL SHADOW · 实阴影 · RANK 5');
  txt('κ(u, v) = (1 + ⟨u, v⟩) / 2', 1000, 270, { size: 32, fam: F.math, w: 700, c: C.white, a: r1 });
  txt('rank 5 · noncommutative · chain-connected · touches 0', 1000, 316, { size: 21, fam: F.mono, w: 700, c: C.dim, a: r1 });
  txt('+ reading complete  ⟹  M ≃ Sp(1)', 1000, 384, { size: 32, fam: F.math, w: 700, c: C.now, a: a * Q(S, 1, 'reading completeness', 0.6) });
  const la = a * Q(S, 1, 'Lean checks', 0.6);
  leanChip(1000, 450, FI_LEAN.equiv, la, 19);
  tag(1760, 450, 'CLASSICAL · Mathlib', C.dim, la, 'right');
  const r2 = a * at(S, 2, 0.6);
  panel(960, 530, 820, 300, r2, cl === 2 ? C.now : C.cyan, 'INTEGER TERNIONS · 整三元数 · RANK 10');
  txt('κₚᵣₒⱼ = ⟨a, b⟩² / (|a|² |b|²)', 1000, 610, { size: 32, fam: F.math, w: 700, c: C.white, a: r2 });
  txt('feature rank 10 · 特征秩 10', 1000, 662, { size: 24, fam: F.zh, w: 700, c: C.white, a: a * Q(S, 2, 'rank ten', 0.5) });
  txt('+a and −a: one ray · 对径点粘合', 1000, 708, { size: 24, fam: F.zh, w: 700, c: C.white, a: a * Q(S, 2, 'antipode', 0.5) });
  txt('the chapter\'s hand derivation and reading · 本章手工推导与诠释', 1000, 790, { size: 18, fam: F.zh, w: 700, c: C.argued, a: r2 });
  tag(150, 836, 'SCHEMATIC · 示意', C.argued, pa * 0.9);
};

/* ======================================================================= */
/*                                scene 8 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  closingCard(S, { from: 0.1, y: 236 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[5], t = sc.start + 6;
  background(t, sc, 5, 6);
  txt(DATA.film.title_zh, W / 2, 250, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('FOUR INTEGERS, ONE TURN', W / 2, 340, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 2, ls: 6 });
  txt('(1 + i)(1 + j)  ≠  (1 + j)(1 + i)', W / 2, 430, { size: 40, fam: F.math, w: 700, align: 'center', c: C.mag });
  frame(adMat(FI.phqh), 640, 625, 140, 1, 1);
  frame(adMat(FI.qhph), 1280, 625, 140, 1, 1);
  quad(FI.phqh, 640, 870, { size: 42, align: 'center', hi: { 3: C.now } });
  quad(FI.qhph, 1280, 870, { size: 42, align: 'center', hi: { 3: C.now } });
  bloom(0.5);
  txt(`${DATA.book.code} · FILM`, W / 2, 940, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 5, sc);
  post(0);
};
