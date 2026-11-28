/* Film · Closing a Spherical Triangle · 球面三角的有理闭合 (book omega-math, chapter 6).
   Scenes for the shared engine theme/film/engine.js.

   What each scene shows, and where it rests (chapter 6, ch06-bargmann-gram-spherical-trigonometry.md):
     loop      a = 1, b = 1 + i, c = 1 + j as integer quaternions (rays [1:0:0:0], [1:1:0:0], [1:0:1:0]); the single
               direction cosine ⟨a,b⟩/(|a||b|) = 1/√2 is irrational and flips sign under a → −a (6.1, computed);
               the Bargmann loop invariant B = ⟨a,b⟩⟨b,c⟩⟨c,a⟩/(|a|²|b|²|c|²) = 1/4, unchanged under a → −a, and
               B² = κ_ab κ_bc κ_ca = 1/16 (definition def-ch06-bargmann-and-gram3 and its structure laws, computed).
     closure   the raw Gram matrix [[1,1,1],[1,2,1],[1,1,2]], det 1, over |a|²|b|²|c|² = 4 gives det G₃ = 1/4, equal to
               1 + 2B − (κ_ab + κ_bc + κ_ca) (6.1 closure equation, computed) ..... OmegaComposeAndWitnesses.
               orthogonal_triad_excess_quarter (LEAN: detGram3 o pHalf qHalf ≡ 1/4).
     nonneg    A = [1+i | 1+j | 1+k] ∈ ℤ^{4×3}; its four 3×3 minors 1, −1, 1, 1; Σ minors² = 4 = det(AᵀA);
               4/8 = 1/2 = det G₃ (Cauchy–Binet, the chapter's manual derivation 6.2; the numbers computed) .....
               OmegaBargmannHaarHecke.detGram3_nonneg (LEAN: three nonzero Quad4, 0 ≤ detGram3 a b c).
     circle    a = 1, b = 2 + i, c = b ā b = 3 + 4i on one great circle: κ = 4/5, 4/5, 9/25, B = 12/25, det G₃ = 0;
               b = 1 + 2i, c = −3 + 4i: κ = 1/5, 1/5, 9/25, B = −3/25, det G₃ = 0 (example ex-ch06-collinear-doubling,
               computed) ..... OmegaBargmannHaarHecke.geodesic_doubling_detGram3_zero (LEAN: detGram3 a b (triad b a b)
               ≡ 0 for nonzero a, b).
     doubling  κ(a, b ā b) = (2κ(a, b) − 1)²; the collinear quadratic factors as (κ₂ − 1)(κ₂ − (2κ₁ − 1)²) (6.3,
               written derivation); the cases b = 2 + i, 3 + i, 1 + i give 4/5 → 9/25, 9/10 → 16/25, 1/2 → 0 (computed)
               ..... OmegaBargmannHaarHecke.geodesic_doubling_kappa (LEAN: kappa a (triad b a b) ≡ doublingReadout²,
               the readout being 2κ(a, b) − 1 as stated in the chapter).
     excess    spreads s = 1 − κ = (1/2, 3/4, 1/2); vertex spreads S_a = det G₃/(s_ab s_ca) = 1, S_b = S_c = 2/3 above
               the flat 1/2 (example ex-ch06-spherical-excess-triads, computed; the flat comparison is the chapter's);
               sine-law ratios all 4/3 and κ_bc = 1/4 = κ_ab κ_ca at the right vertex (computed) .....
               OmegaSphericalHaarMidpoint.rational_spherical_sine_law and .rational_spherical_pythagorean (LEAN).
     gallery   four triads: doubling 0, half steps 1/4, equal-sided [1:1:0:0], [1:0:1:0], [1:0:0:1] gives 1/2 with
               S = 8/9 against the flat 3/4, three orthogonal rays give 1 with S = 1 (example item 2 and 3, computed);
               that 1 is the largest value is the chapter's statement (argued); the classical shadow
               det G₃ = sin²α sin²β sin²C (remark rem-ch06-classical-shadow, argued, one-way shadow; Wildberger's
               rational trigonometry is literature).
     close     closingCard: book, film title, the six Lean theorems and the pinned commit.

   The spheres are drawings: the three rays are placed in ℝ³ with the same inner products (Gram–Schmidt, floating
   point, used for the picture only). Every number written on screen is computed below in exact integer fractions,
   and FILM.init re-derives each one by an independent route; any disagreement goes to window.FILM_ERRORS. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const ST_P = 'D5/S3/Quantum/AURICOmega/';
const ST_LEAN = {
  quarter: [ST_P + 'OmegaComposeAndWitnesses.orthogonal_triad_excess_quarter', 'orthogonal_triad_excess_quarter'],
  nonneg: [ST_P + 'OmegaBargmannHaarHecke.detGram3_nonneg', 'detGram3_nonneg'],
  zero: [ST_P + 'OmegaBargmannHaarHecke.geodesic_doubling_detGram3_zero', 'geodesic_doubling_detGram3_zero'],
  kappa: [ST_P + 'OmegaBargmannHaarHecke.geodesic_doubling_kappa', 'geodesic_doubling_kappa'],
  sine: [ST_P + 'OmegaSphericalHaarMidpoint.rational_spherical_sine_law', 'rational_spherical_sine_law'],
  pyth: [ST_P + 'OmegaSphericalHaarMidpoint.rational_spherical_pythagorean', 'rational_spherical_pythagorean']
};

/* fractions [n, d], d > 0, reduced; small integers only */
const stGcd = (a, b) => (b ? stGcd(b, a % b) : Math.abs(a));
const fr = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = stGcd(n, d) || 1; return [n / g, d / g]; };
const fAdd = (a, b) => fr(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const fSub = (a, b) => fr(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
const fMul = (a, b) => fr(a[0] * b[0], a[1] * b[1]);
const fDiv = (a, b) => fr(a[0] * b[1], a[1] * b[0]);
const fEq = (a, b) => a[0] * b[1] === b[0] * a[1];
const fS = a => (a[1] === 1 ? String(a[0]) : `${a[0] < 0 ? '−' : ''}${Math.abs(a[0])}/${a[1]}`);

/* quaternions [w, x, y, z] = w + x i + y j + z k */
const qMul = (a, b) => [
  a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
  a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
  a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
  a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
const qConj = a => [a[0], -a[1], -a[2], -a[3]];
const qDot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
const qN2 = a => qDot(a, a);
/* the equal-step heap continuation [b, a, b] = b ā b (triad b a b) */
const triad = (b, a) => qMul(qMul(b, qConj(a)), b);

/* the full rational readout of a triad: κ = ⟨u,v⟩²/(|u|²|v|²), B, det G₃ = 1 + 2B − Σκ, spreads, vertex spreads */
function readout(a, b, c) {
  const k = (p, q) => fr(qDot(p, q) ** 2, qN2(p) * qN2(q));
  const kab = k(a, b), kbc = k(b, c), kca = k(c, a);
  const B = fr(qDot(a, b) * qDot(b, c) * qDot(c, a), qN2(a) * qN2(b) * qN2(c));
  const det = fSub(fAdd(fr(1), fMul(fr(2), B)), fAdd(fAdd(kab, kbc), kca));
  const one = fr(1), sab = fSub(one, kab), sbc = fSub(one, kbc), sca = fSub(one, kca);
  const vs = (d, s1, s2) => (s1[0] && s2[0] ? fDiv(d, fMul(s1, s2)) : null);
  return { kab, kbc, kca, B, det, sab, sbc, sca, Sa: vs(det, sab, sca), Sb: vs(det, sbc, sab), Sc: vs(det, sca, sbc) };
}

const Q1 = [1, 0, 0, 0], QI = [1, 1, 0, 0], QJ = [1, 0, 1, 0], QK = [1, 0, 0, 1];
/* the half-step triad of 6.4 item 1 and of orthogonal_triad_excess_quarter */
const HALF = { a: Q1, b: QI, c: QJ };
const HR = readout(Q1, QI, QJ);
/* the equal-sided triad (6.4 item 2) and the orthogonal octant (item 3) */
const EQ = { a: QI, b: QJ, c: QK }, ER = readout(QI, QJ, QK);
const OCT = { a: [1, 0, 0, 0], b: [0, 1, 0, 0], c: [0, 0, 1, 0] }, OR = readout(OCT.a, OCT.b, OCT.c);
/* the doubling triads (ex-ch06-collinear-doubling) */
const DB1 = { a: Q1, b: [2, 1, 0, 0] }; DB1.c = triad(DB1.b, DB1.a); const DR1 = readout(DB1.a, DB1.b, DB1.c);
const DB2 = { a: Q1, b: [1, 2, 0, 0] }; DB2.c = triad(DB2.b, DB2.a); const DR2 = readout(DB2.a, DB2.b, DB2.c);
/* the doubling table: b = 2 + i, 3 + i, 1 + i (and 1 + 2i) */
const DT = [[2, 1], [3, 1], [1, 1], [1, 2]].map(([w, x]) => {
  const b = [w, x, 0, 0], c = triad(b, Q1), r = readout(Q1, b, c);
  return { b, c, k1: r.kab, k2: r.kca, law: fMul(fSub(fMul(fr(2), r.kab), fr(1)), fSub(fMul(fr(2), r.kab), fr(1))) };
});

/* the raw Gram matrix and a 3×3 determinant by cofactors */
const gram = (u, v, w) => [u, v, w].map(p => [u, v, w].map(q => qDot(p, q)));
const det3 = m => m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
/* the 4×3 matrix with columns u, v, w and its four 3×3 minors, rows kept in increasing order (Cauchy–Binet) */
const KEEP = [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]];
const minors = (u, v, w) => KEEP.map(rows => det3(rows.map(r => [u[r], v[r], w[r]])));
const EQ_MIN = minors(QI, QJ, QK);

/* ---------- drawing geometry (floating point, picture only) ---------- */
const v3 = { dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], add: (a, b) => a.map((x, i) => x + b[i]), scl: (k, a) => a.map(x => k * x) };
v3.unit = a => v3.scl(1 / Math.hypot(...a), a);
v3.cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
/* place three quaternion rays in ℝ³ with the same inner products (Gram–Schmidt on a, b, c) */
function embed3(a, b, c) {
  const basis = [];
  for (const p of [a, b, c]) {
    let r = p.slice();
    for (const e of basis) { const t = qDot(r, e); r = r.map((x, i) => x - t * e[i]); }
    const n = Math.sqrt(qDot(r, r));
    if (n > 1e-9) basis.push(r.map(x => x / n));
  }
  const co = p => { const s = [0, 0, 0]; basis.forEach((e, i) => { s[i] = qDot(p, e); }); return v3.unit(s); };
  return [co(a), co(b), co(c)];
}
/* an orthographic camera looking along −d (d points at the viewer), z-up hint */
function cam(cx, cy, R, d) {
  const f = v3.unit(d), upH = Math.abs(f[2]) > 0.95 ? [0, 1, 0] : [0, 0, 1];
  const r = v3.unit(v3.cross(upH, f)), up = v3.cross(f, r);
  const P = v => [cx + R * v3.dot(v, r), cy - R * v3.dot(v, up), v3.dot(v, f)];
  P.cx = cx; P.cy = cy; P.R = R; P.f = f; P.r = r; P.up = up;
  return P;
}
const slerp = (u, v, t) => {
  const c = clamp(v3.dot(u, v), -1, 1), th = Math.acos(c);
  if (th < 1e-6) return u.slice();
  const s = Math.sin(th);
  return v3.add(v3.scl(Math.sin((1 - t) * th) / s, u), v3.scl(Math.sin(t * th) / s, v));
};
function stSphere(P, a) {
  if (a <= 0.003) return;
  ring(P.cx, P.cy, P.R, C.vio, a * 0.75, 2);
  /* a few faint great circles for depth */
  for (let k = 0; k < 6; k++) {
    const n = v3.unit([Math.cos(k * Math.PI / 6), Math.sin(k * Math.PI / 6), 0.35]);
    stCircle(P, n, C.vio, a * 0.16, 1);
  }
  stCircle(P, [0, 0, 1], C.vio, a * 0.16, 1);
}
/* the great circle with normal n; back half dimmer */
function stCircle(P, n, col, a, lw = 2, dash = null) {
  if (a <= 0.003) return;
  const e1 = v3.unit(Math.abs(n[0]) < 0.9 ? v3.cross(n, [1, 0, 0]) : v3.cross(n, [0, 1, 0])), e2 = v3.cross(n, e1);
  ctx.save(); if (dash) ctx.setLineDash(dash);
  ctx.strokeStyle = col; ctx.lineWidth = lw;
  let prev = null;
  for (let i = 0; i <= 120; i++) {
    const t = TAU * i / 120, v = v3.add(v3.scl(Math.cos(t), e1), v3.scl(Math.sin(t), e2)), p = P(v);
    if (prev) { ctx.globalAlpha = a * (p[2] >= 0 ? 1 : 0.3); ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(p[0], p[1]); ctx.stroke(); }
    prev = p;
  }
  ctx.restore();
}
/* the minor arc u → v, drawn up to fraction t; returns the projected samples */
function stArc(P, u, v, col, a, lw = 4, t = 1) {
  const pts = [];
  for (let i = 0; i <= 40; i++) pts.push(P(slerp(u, v, t * i / 40)));
  if (a > 0.003) {
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round';
    for (let i = 1; i < pts.length; i++) {
      ctx.globalAlpha = a * (pts[i][2] >= 0 ? 1 : 0.3);
      ctx.beginPath(); ctx.moveTo(pts[i - 1][0], pts[i - 1][1]); ctx.lineTo(pts[i][0], pts[i][1]); ctx.stroke();
    }
    ctx.restore();
  }
  return pts;
}
function stFill(pts, col, a, fill = 0.22) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.beginPath();
  pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath();
  ctx.fillStyle = rgba(col, fill); ctx.fill(); ctx.restore();
}
/* a spherical triangle on the unit vectors U = [ua, ub, uc] */
function stTriangle(P, U, a, o = {}) {
  const t = o.t == null ? 1 : o.t;
  const p1 = stArc(P, U[0], U[1], o.col || C.cyan, a, o.lw || 4, clamp(t * 3));
  const p2 = stArc(P, U[1], U[2], o.col || C.cyan, a, o.lw || 4, clamp(t * 3 - 1));
  const p3 = stArc(P, U[2], U[0], o.col || C.cyan, a, o.lw || 4, clamp(t * 3 - 2));
  if (o.fill) stFill([...p1, ...p2, ...p3], C.mag, a * o.fill, 0.28);
}
function stLabel(P, v, s, col, a, o = {}) {
  const p = P(v), size = o.size || 30;
  dot(p[0], p[1], o.r || 11, o.pearl || 'w', a);
  const dx = p[0] - P.cx, dy = p[1] - P.cy, n = Math.hypot(dx, dy) || 1, off = o.off || 34;
  txt(s, p[0] + dx / n * off, p[1] + dy / n * off + size * 0.35, { size, fam: F.math, w: 700, align: Math.abs(dx / n) < 0.3 ? 'center' : dx > 0 ? 'left' : 'right', c: col, a });
  return p;
}

/* ======================================================================= */
/*                                init checks                                */
/* ======================================================================= */
FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('closing-a-spherical-triangle film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const is = (x, n, d = 1) => x && fEq(x, fr(n, d));

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(ST_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(ST_LEAN).length}`);
  for (const [gid, short] of Object.values(ST_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. LOOP: the irrational cosine, the sign flip, B and B² */
  {
    const cosAB = qDot(Q1, QI) / Math.sqrt(qN2(Q1) * qN2(QI));
    check(Math.abs(cosAB - Math.SQRT1_2) < 1e-15, 'cos(a, b) = 1/√2');
    const na = Q1.map(x => -x);
    check(qDot(na, QI) === -qDot(Q1, QI), 'cos flips under a → −a');
    check(is(HR.B, 1, 4) && fEq(readout(na, QI, QJ).B, HR.B), 'B = 1/4, unchanged under a → −a');
    check(is(HR.kab, 1, 2) && is(HR.kbc, 1, 4) && is(HR.kca, 1, 2), 'κ = 1/2, 1/4, 1/2');
    check(fEq(fMul(HR.B, HR.B), fMul(fMul(HR.kab, HR.kbc), HR.kca)) && is(fMul(HR.B, HR.B), 1, 16), 'B² = κκκ = 1/16');
    /* scale invariance: (2a, 3b, −5c) gives the same B and det */
    const s = readout([2, 0, 0, 0], [3, 3, 0, 0], [-5, 0, -5, 0]);
    check(fEq(s.B, HR.B) && fEq(s.det, HR.det), 'B and det G₃ are scale and sign invariant');
  }

  /* 2. CLOSURE: raw Gram determinant against the closure equation */
  {
    const G = gram(Q1, QI, QJ);
    check(G.flat().join() === '1,1,1,1,2,1,1,1,2', 'raw Gram matrix [[1,1,1],[1,2,1],[1,1,2]]');
    check(det3(G) === 1 && qN2(Q1) * qN2(QI) * qN2(QJ) === 4, 'det = 1, |a|²|b|²|c|² = 4');
    check(is(HR.det, 1, 4) && fEq(HR.det, fr(det3(G), 4)), 'det G₃ = 1/4 both ways');
  }

  /* 3. NONNEG: four minors, Cauchy–Binet, the equal-sided triad; and random integer triads are never negative */
  {
    check(EQ_MIN.join() === '1,-1,1,1', `minors of [1+i | 1+j | 1+k]: ${EQ_MIN.join()}`);
    const sq = EQ_MIN.reduce((s, m) => s + m * m, 0);
    check(sq === 4 && det3(gram(QI, QJ, QK)) === 4, 'Σ minors² = 4 = det(AᵀA)');
    check(qN2(QI) * qN2(QJ) * qN2(QK) === 8 && is(ER.det, 1, 2) && is(ER.B, 1, 8), 'det G₃ = 4/8 = 1/2, B = 1/8');
    for (let t = 0; t < 60; t++) {
      const v = s => [0, 1, 2, 3].map(i => Math.floor(rnd(t, s + i) * 7) - 3);
      const a = v(0), b = v(10), c = v(20);
      if (!qN2(a) || !qN2(b) || !qN2(c)) continue;
      const m = minors(a, b, c), g = det3(gram(a, b, c));
      check(g === m.reduce((s, x) => s + x * x, 0), `Cauchy–Binet triad ${t}`);
      check(readout(a, b, c).det[0] >= 0 && fEq(readout(a, b, c).det, fr(g, qN2(a) * qN2(b) * qN2(c))), `det G₃ ≥ 0 and closure equation, triad ${t}`);
    }
  }

  /* 4. CIRCLE: the two doubling examples, and b ā b = 2⟨a,b⟩b − |b|²a */
  {
    check(DB1.c.join() === '3,4,0,0' && DB2.c.join() === '-3,4,0,0', 'b ā b = 3 + 4i and −3 + 4i');
    check(is(DR1.kab, 4, 5) && is(DR1.kbc, 4, 5) && is(DR1.kca, 9, 25) && is(DR1.B, 12, 25) && is(DR1.det, 0), 'κ = 4/5, 4/5, 9/25; B = 12/25; det 0');
    check(is(DR2.kab, 1, 5) && is(DR2.kbc, 1, 5) && is(DR2.kca, 9, 25) && is(DR2.B, -3, 25) && is(DR2.det, 0), 'κ = 1/5, 1/5, 9/25; B = −3/25; det 0');
    check(fEq(readout(Q1, [1, 2, 0, 0], [3, -4, 0, 0]).B, DR2.B), 'B with the representative 3 − 4i is still −3/25');
    for (let t = 0; t < 40; t++) {
      const v = s => [0, 1, 2, 3].map(i => Math.floor(rnd(t, s + i) * 9) - 4);
      const a = v(40), b = v(50);
      if (!qN2(a) || !qN2(b)) continue;
      const c = triad(b, a), lin = b.map((x, i) => 2 * qDot(a, b) * x - qN2(b) * a[i]);
      check(c.join() === lin.join(), `b ā b = 2⟨a,b⟩b − |b|²a, pair ${t}`);
      check(qN2(c) === qN2(a) * qN2(b) ** 2, `|b ā b|² = |a|²|b|⁴, pair ${t}`);
      const r = readout(a, b, c);
      check(r.det[0] === 0, `doubling triad closes to zero, pair ${t}`);
      check(fEq(r.kca, fMul(fSub(fMul(fr(2), r.kab), fr(1)), fSub(fMul(fr(2), r.kab), fr(1)))), `κ₂ = (2κ₁ − 1)², pair ${t}`);
      /* the factored quadratic (κ₂ − 1)(κ₂ − (2κ₁ − 1)²) vanishes */
      check(fMul(fSub(r.kca, fr(1)), fSub(r.kca, fMul(fSub(fMul(fr(2), r.kab), fr(1)), fSub(fMul(fr(2), r.kab), fr(1)))))[0] === 0, `factored law, pair ${t}`);
    }
  }

  /* 5. DOUBLING: the table */
  {
    const want = [[4, 5, 9, 25], [9, 10, 16, 25], [1, 2, 0, 1], [1, 5, 9, 25]];
    DT.forEach((r, i) => check(is(r.k1, want[i][0], want[i][1]) && is(r.k2, want[i][2], want[i][3]) && fEq(r.k2, r.law), `doubling row ${i}: ${fS(r.k1)} → ${fS(r.k2)}`));
    check(DT[1].c.join() === '8,6,0,0' && DT[2].c.join() === '0,2,0,0', '(3 + i)² = 8 + 6i, (1 + i)² = 2i');
    /* return to the start: c = a gives κ₂ = 1 and B = κ₁ */
    const ret = readout(Q1, [2, 1, 0, 0], Q1);
    check(is(ret.kca, 1) && fEq(ret.B, ret.kab) && ret.det[0] === 0, 'returning to a: κ₂ = 1, B = κ₁, det 0');
  }

  /* 6. EXCESS: spreads, vertex spreads, sine law, right angle */
  {
    check(is(HR.sab, 1, 2) && is(HR.sbc, 3, 4) && is(HR.sca, 1, 2), 's = 1/2, 3/4, 1/2');
    check(is(HR.Sa, 1) && is(HR.Sb, 2, 3) && is(HR.Sc, 2, 3), 'S(a) = 1, S(b) = S(c) = 2/3');
    const r1 = fDiv(HR.Sa, HR.sbc), r2 = fDiv(HR.Sb, HR.sca), r3 = fDiv(HR.Sc, HR.sab);
    check(is(r1, 4, 3) && is(r2, 4, 3) && is(r3, 4, 3), 'sine-law ratios 4/3');
    check(qN2(Q1) * qDot(QI, QJ) === qDot(Q1, QI) * qDot(Q1, QJ), 'right angle at a: ⟨a,a⟩⟨b,c⟩ = ⟨a,b⟩⟨a,c⟩');
    check(fEq(HR.kbc, fMul(HR.kab, HR.kca)), 'κ(b,c) = κ(a,b) κ(c,a)');
    /* the completed square s(a,b) s(c,a) − det G₃ = (|a|²⟨b,c⟩ − ⟨a,b⟩⟨a,c⟩)²/(|a|⁴|b|²|c|²) */
    const lhs = fSub(fMul(HR.sab, HR.sca), HR.det), num = qN2(Q1) * qDot(QI, QJ) - qDot(Q1, QI) * qDot(Q1, QJ);
    check(fEq(lhs, fr(num * num, qN2(Q1) ** 2 * qN2(QI) * qN2(QJ))), 'completed square at a');
  }

  /* 7. GALLERY: equal-sided and octant */
  {
    check(is(ER.kab, 1, 4) && is(ER.kbc, 1, 4) && is(ER.kca, 1, 4), 'equal-sided κ = 1/4');
    check(is(ER.Sa, 8, 9) && is(ER.Sb, 8, 9) && is(ER.Sc, 8, 9) && is(fSub(ER.Sa, fr(3, 4)), 5, 36), 'S = 8/9, surplus 5/36 over 3/4');
    check(is(OR.det, 1) && is(OR.B, 0) && is(OR.Sa, 1) && is(OR.Sb, 1) && is(OR.Sc, 1), 'octant det 1, S = 1');
    /* classical shadow on the half-step triad: det G₃ = sin²α sin²β sin²C, angles by floating point */
    const U = embed3(Q1, QI, QJ), ang = (p, q) => Math.acos(v3.dot(p, q));
    const al = ang(U[1], U[2]), be = ang(U[2], U[0]);
    const tb = v3.unit(v3.add(U[1], v3.scl(-v3.dot(U[1], U[2]), U[2]))), ta = v3.unit(v3.add(U[0], v3.scl(-v3.dot(U[0], U[2]), U[2])));
    const Cang = Math.acos(v3.dot(ta, tb));
    check(Math.abs(Math.sin(al) ** 2 * Math.sin(be) ** 2 * Math.sin(Cang) ** 2 - 0.25) < 1e-12, 'shadow: sin²α sin²β sin²C = 1/4');
    check(Math.abs(Math.sin(Cang) ** 2 - 2 / 3) < 1e-12, 'shadow: S(c) = sin²C = 2/3');
  }
});
Object.assign(FILM.speed, { loop: 0.02, closure: 0.014, nonneg: 0.016, circle: 0.016, doubling: 0.018, excess: 0.014, gallery: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const stFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function rich(parts, x, y, o = {}) {
  const size = o.size || 30, w = o.w || 700, a = o.a == null ? 1 : o.a;
  const fam = p => p[2] || o.fam || F.math;
  let cx = x;
  const tot = parts.reduce((s, p) => s + tw(p[0], size, fam(p), w), 0);
  if (o.align === 'center') cx = x - tot / 2;
  else if (o.align === 'right') cx = x - tot;
  if (a > 0.003) for (const p of parts) { txt(p[0], cx, y, { size, fam: fam(p), w, c: p[1], a }); cx += tw(p[0], size, fam(p), w); }
  return cx;
}
const ST_MISSING = new Set();
function leanChip(x, y, key, a, o = {}) {
  if (a <= 0.003) return x;
  const [gid, label] = ST_LEAN[key], r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!ST_MISSING.has(gid)) { ST_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return x;
  }
  const size = o.size || 19, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(label, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  return x + wh + 12 + tw(label, size, F.mono, 700);
}
function title(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.3) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.4);
  txt(`${DATA.book.code} · FILM`, W / 2, 360, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 500, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('CLOSING A SPHERICAL TRIANGLE', p, 5), W / 2, 600, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('LOOP · GRAM · GREAT CIRCLE · DOUBLING · EXCESS', W / 2, 680, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 5 });
}
/* a 3×3 (or 4×3) integer matrix with brackets; hi: row index → colour, dimRows: set of dimmed rows */
function matrix(rows, x, y, a, o = {}) {
  if (a <= 0.003) return;
  const cw = o.cw || 80, rh = o.rh || 58, size = o.size || 38, n = rows.length, m = rows[0].length;
  const h = n * rh, wd = m * cw;
  const br = (xx, s) => { line(xx, y - rh * 0.72, xx, y - rh * 0.72 + h, C.white, a, 2.5); line(xx, y - rh * 0.72, xx + 14 * s, y - rh * 0.72, C.white, a, 2.5); line(xx, y - rh * 0.72 + h, xx + 14 * s, y - rh * 0.72 + h, C.white, a, 2.5); };
  br(x, 1); br(x + wd + 20, -1);
  rows.forEach((r, i) => r.forEach((v, j) => {
    const col = o.hi && o.hi[i] ? o.hi[i] : C.white, al = o.dim && o.dim.has(i) ? 0.22 : 1;
    txt(String(v).replace('-', '−'), x + 10 + cw * (j + 0.5), y + i * rh, { size, fam: F.math, w: 700, align: 'center', c: col, a: a * al });
  }));
}

/* ======================================================================= */
/*                          scene 1 · ROOTS CANCEL                           */
/* ======================================================================= */
const HALF_U = embed3(Q1, QI, QJ);
const SPH = [500, 520, 270];
SCENES.loop = S => {
  const u = S.u;
  title(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const P = cam(SPH[0], SPH[1], SPH[2], [0.62 + 0.05 * Math.sin(u * 0.3), 0.55, 0.62]);
  stSphere(P, a);
  const [ua, ub, uc] = HALF_U;
  const show = at(S, 0, 0.8);
  /* line 1: the single side a–b in magenta; line 3: the walk around the loop */
  const side = Q(S, 1, 'One side alone', 0.6) * (1 - at(S, 3, 0.6));
  stArc(P, ua, ub, C.mag, a * side, 6);
  const walk = clamp((u - phraseAt(S, 3, 'Walk the loop')) / 3.6);
  const tri = at(S, 3, 0.6);
  stTriangle(P, HALF_U, a * show * (0.35 + 0.65 * tri), { lw: 3 });
  if (walk > 0) {
    stTriangle(P, HALF_U, a, { t: walk, col: C.cyan, lw: 6 });
    const seg = Math.min(2, Math.floor(walk * 3)), tt = walk * 3 - seg;
    const U3 = [ua, ub, uc, ua], pos = walk >= 1 ? ua : slerp(U3[seg], U3[seg + 1], tt);
    const p = P(pos);
    if (walk < 1) dot(p[0], p[1], 15, 'g', a);
  }
  /* each corner lights twice: when the walker arrives and when it leaves */
  const hits = i => { const ts = [[0, 1], [1 / 3, 1 / 3], [2 / 3, 2 / 3]][i]; return walk > 0 && ts.some(t => Math.abs(walk - t) < 0.05) ? 1 : 0; };
  const labs = [['a', ua], ['b', ub], ['c', uc]];
  labs.forEach(([n, v], i) => stLabel(P, v, n, C.white, a * show, { pearl: hits(i) ? 'g' : 'w', r: hits(i) ? 16 : 11 }));
  /* line 2: −a, the same ray */
  const fl = Q(S, 2, 'Flip a to minus a', 0.6) * (1 - at(S, 3, 0.8));
  if (fl > 0.003) {
    const na = v3.scl(-1, ua), p0 = P(ua), p1 = P(na);
    dashed(p0[0], p0[1], p1[0], p1[1], C.now, a * fl, 2);
    stLabel(P, na, '−a', C.now, a * fl, { pearl: 'g' });
    txt('the same ray · 同一条射线', P.cx, P.cy + P.R + 58, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.now, a: a * fl });
  }
  /* the ledger */
  const X0 = 960;
  panel(X0 - 20, 190, 840, 640, a * show, C.cyan, 'ONE SIDE vs THE LOOP · 一条边与一个环');
  rich([['a = 1', C.white], ['    b = 1 + i', C.white], ['    c = 1 + j', C.white]], X0 + 10, 262, { size: 32, a: a * show });
  rich([['|a|² = 1    |b|² = 2    |c|² = 2    ⟨a,b⟩ = ⟨b,c⟩ = ⟨c,a⟩ = 1', C.dim]], X0 + 10, 306, { size: 22, a: a * Q(S, 0, 'c is one plus j', 0.6) });
  const r1 = Q(S, 1, 'the cosine of a and b', 0.6);
  rich([['cos(a, b) = ⟨a,b⟩ / (|a||b|) = ', C.white], ['1/√2', C.mag]], X0 + 10, 378, { size: 30, a: a * r1 });
  if (r1 > 0.003) txt('irrational · 无理数', X0 + 10, 418, { size: 22, fam: F.zh, w: 700, c: C.mag, a: a * r1 });
  const r2 = Q(S, 2, 'flips sign', 0.6);
  rich([['cos(−a, b) = ', C.white], ['−1/√2', C.now], ['   sign not defined on rays', C.dim, F.disp]], X0 + 10, 474, { size: 28, a: a * r2 });
  if (r2 > 0.003) txt('射线上符号不良定', X0 + 10, 510, { size: 22, fam: F.zh, w: 700, c: C.dim, a: a * r2 });
  const r3 = Q(S, 3, 'each corner is met twice', 0.6);
  line(X0 + 10, 545, X0 + 780, 545, C.cyan, a * r3 * 0.5, 1.5);
  rich([['B = ⟨a,b⟩⟨b,c⟩⟨c,a⟩ / (|a|²|b|²|c|²)', C.cyan]], X0 + 10, 600, { size: 30, a: a * r3 });
  const r4 = Q(S, 3, 'roots and signs cancel', 0.6);
  rich([['   = 1·1·1 / (1·2·2) = ', C.white], ['1/4', C.now]], X0 + 10, 656, { size: 32, a: a * r4 });
  rich([['−a:  (−1)·1·(−1) / 4 = 1/4', C.white], ['   unchanged · 不变', C.dim, F.zh]], X0 + 10, 712, { size: 26, a: a * r4 });
  rich([['B² = κ(a,b) κ(b,c) κ(c,a) = ½ · ¼ · ½ = 1/16', C.dim]], X0 + 10, 770, { size: 24, a: a * Q(S, 3, 'the Bargmann number', 0.6) });
  if (r4 > 0.003) txt('every vertex twice · 每个顶点出现两次', X0 + 770, 812, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.cyan, a: a * r4 });
};

/* ======================================================================= */
/*                          scene 2 · THE CLOSING LAW                        */
/* ======================================================================= */
SCENES.closure = S => {
  const a = stFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean']]);
  const P = cam(SPH[0], SPH[1], SPH[2], [0.62 + 0.05 * Math.sin(u * 0.3), 0.55, 0.62]);
  stSphere(P, a);
  const fillA = Q(S, 1, 'closing number is one quarter', 0.8);
  stTriangle(P, HALF_U, a, { fill: fillA, lw: 4 });
  HALF_U.forEach((v, i) => stLabel(P, v, 'abc'[i], C.white, a));
  if (fillA > 0.003) txt('det G₃ = 1/4', P.cx, 230, { size: 40, fam: F.math, w: 700, align: 'center', c: C.mag, a: a * fillA });

  const X0 = 960;
  const g = at(S, 0, 0.7);
  panel(X0 - 20, 190, 840, 300, a * g, C.cyan, 'GRAM MATRIX · 格拉姆矩阵');
  const G = gram(Q1, QI, QJ);
  txt('G =', X0 + 10, 330, { size: 30, fam: F.math, w: 700, c: C.white, a: a * g });
  matrix(G, X0 + 150, 290, a * g, { cw: 74, rh: 56, size: 36, hi: null });
  ['a', 'b', 'c'].forEach((n, i) => txt(n, X0 + 160 + 74 * (i + 0.5), 245, { size: 22, fam: F.math, w: 700, align: 'center', c: C.dim, a: a * g }));
  const d1 = Q(S, 0, 'determinant one', 0.6);
  rich([['det G = ', C.white], [String(det3(G)), C.now]], X0 + 440, 310, { size: 32, a: a * d1 });
  const d2 = Q(S, 0, 'squared lengths four', 0.6);
  rich([['|a|²|b|²|c|² = 1·2·2 = 4', C.white]], X0 + 440, 370, { size: 26, a: a * d2 });
  rich([['det G₃ = 1/4', C.mag]], X0 + 440, 440, { size: 34, a: a * Q(S, 1, 'So the closing number', 0.6) });

  const f = at(S, 1, 0.6);
  panel(X0 - 20, 510, 840, 170, a * f, C.cyan, 'THE CLOSING LAW · 闭合律');
  rich([['det G₃ = 1 + 2B − (κ(a,b) + κ(b,c) + κ(c,a))', C.white]], X0 + 10, 572, { size: 30, a: a * Q(S, 1, 'one plus two B', 0.6) });
  rich([['= 1 + 2·¼ − (½ + ¼ + ½) = ', C.white], ['1/4', C.mag]], X0 + 10, 630, { size: 30, a: a * Q(S, 1, 'minus the three kappas', 0.6) });

  const l = Q(S, 2, 'Lean checks', 0.6);
  panel(X0 - 20, 700, 840, 130, a * l, C.lean);
  rich([['detGram3 o pHalf qHalf ≡ 1/4', C.white]], X0 + 10, 750, { size: 26, a: a * l });
  leanChip(X0 + 10, 800, 'quarter', a * l, { size: 19 });
  const st = Q(S, 2, 'no sine', 0.4);
  stamp('NO sin · cos · √', P.cx, 828, st * a, C.now, 30, -0.04);
};

/* ======================================================================= */
/*                          scene 3 · NEVER NEGATIVE                         */
/* ======================================================================= */
SCENES.nonneg = S => {
  const a = stFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  const A = [0, 1, 2, 3].map(r => [QI[r], QJ[r], QK[r]]);
  const m0 = at(S, 0, 0.7);
  panel(120, 190, 760, 640, a * m0, C.cyan, 'A = [ a | b | c ] · 4 × 3');
  /* which minor is current: cycles through the four during line 1 */
  const t1 = phraseAt(S, 1, 'the four minors'), t2 = lineAt(S, 1).e;
  const cyc = u >= t1 ? Math.min(3, Math.floor((u - t1) / Math.max(0.6, (t2 - t1 + 0.3) / 4))) : -1;
  const allDone = u >= lineAt(S, 2).s;
  const dim = cyc >= 0 && !allDone ? new Set([0, 1, 2, 3].filter(r => !KEEP[cyc].includes(r))) : new Set();
  const hi = cyc >= 0 && !allDone ? Object.fromEntries(KEEP[cyc].map(r => [r, C.now])) : null;
  const ex = Q(S, 1, 'For one plus i', 0.6);
  ['1 + i', '1 + j', '1 + k'].forEach((n, j) => txt(n, 330 + 120 * (j + 0.5), 270, { size: 26, fam: F.math, w: 700, align: 'center', c: C.cyan, a: a * m0 * (0.4 + 0.6 * ex) }));
  ['1', 'i', 'j', 'k'].forEach((n, i) => txt(n, 270, 340 + i * 72, { size: 28, fam: F.math, w: 700, align: 'center', c: dim.has(i) ? C.dim : C.white, a: a * m0 * (dim.has(i) ? 0.35 : 0.8) }));
  matrix(A, 320, 340, a * m0, { cw: 120, rh: 72, size: 44, hi, dim });
  /* the four minors in a row */
  const mm = Q(S, 1, 'are one, minus one', 0.5);
  EQ_MIN.forEach((v, k) => {
    const on = k <= cyc || allDone;
    const x = 210 + k * 170, col = k === cyc && !allDone ? C.now : C.white;
    chip(x, 690, 140, 60, String(v).replace('-', '−'), col, a * (on ? 1 : 0) * clamp(mm + (k <= cyc ? 1 : 0)), 34, F.math);
    txt(['{1,i,j}', '{1,i,k}', '{1,j,k}', '{i,j,k}'][k], x, 750, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a * (on ? 1 : 0) });
  });
  if (cyc >= 0) txt('3 × 3 minors · 三阶子式', 500, 800, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a });

  const X0 = 960;
  const s = at(S, 2, 0.6);
  panel(X0 - 20, 190, 840, 380, a * clamp(ex + s), C.cyan, 'CAUCHY–BINET · 子式平方和');
  rich([['κ = ¼, ¼, ¼     B = 1/8', C.dim]], X0 + 10, 256, { size: 26, a: a * ex });
  rich([['1 + 2·(1/8) − 3·(1/4) = ', C.white], ['1/2', C.mag]], X0 + 10, 302, { size: 28, a: a * ex * at(S, 1, 0.6, 1.2) });
  rich([['1² + (−1)² + 1² + 1² = ', C.white], ['4', C.now], ['  = det(AᵀA)', C.white]], X0 + 10, 380, { size: 30, a: a * s });
  rich([['÷ |a|²|b|²|c|² = 2·2·2 = 8', C.white]], X0 + 10, 436, { size: 28, a: a * Q(S, 2, 'over eight', 0.6) });
  rich([['det G₃ = 4/8 = ', C.white], ['1/2', C.mag], ['   a sum of squares', C.dim, F.disp]], X0 + 10, 496, { size: 32, a: a * Q(S, 2, 'is one half', 0.6) });
  if (s > 0.003) txt('Cauchy–Binet identity: written derivation · 书面推导;  numbers computed here', X0 + 10, 548, { size: 18, fam: F.zh, w: 700, c: C.argued, a: a * s * 0.95 });

  const l = Q(S, 3, 'Lean checks', 0.6);
  panel(X0 - 20, 590, 840, 240, a * l, C.lean);
  rich([['a, b, c : Quad4,  a, b, c ≠ 0', C.white]], X0 + 10, 650, { size: 28, a: a * l });
  rich([['⇒   0 ≤ detGram3 a b c', C.white]], X0 + 10, 705, { size: 32, a: a * l });
  leanChip(X0 + 10, 765, 'nonneg', a * l, { size: 20 });
  if (l > 0.003) txt('order IntRatio.Le · 有号分数序', X0 + 10, 808, { size: 20, fam: F.zh, w: 700, c: C.dim, a: a * l });
};

/* ======================================================================= */
/*                          scene 4 · ONE GREAT CIRCLE                       */
/* ======================================================================= */
/* points of the (w, x) plane drawn on a sphere whose equator is that plane */
const eqv = q => v3.unit([q[0], q[1], 0]);
SCENES.circle = S => {
  const a = stFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'computed']]);
  const P = cam(440, 500, 250, [0.35 + 0.04 * Math.sin(u * 0.25), 0.6, 0.62]);
  stSphere(P, a * 0.9);
  stCircle(P, [0, 0, 1], C.cyan, a * at(S, 0, 0.8), 2.5, [9, 8]);
  /* the two examples: k = 0 (b = 2 + i) and k = 1 (b = 1 + 2i), morphing on line 3 */
  const mg = ease(Q(S, 3, 'one plus two i', 1.2));
  const ang = q => Math.atan2(q[1], q[0]);
  const lerpA = (q1, q2) => { const t = lerp(ang(q1), ang(q2), mg); return [Math.cos(t), Math.sin(t), 0]; };
  const va = [1, 0, 0], vb = lerpA(DB1.b, DB2.b), vc = lerpA(DB1.c, DB2.c);
  const sb = Q(S, 0, 'b is two plus i', 0.6), sc = Q(S, 0, 'three plus four i', 0.6);
  stArc(P, va, vb, C.cyan, a * sb, 6);
  stArc(P, vb, vc, C.cyan, a * sc, 6);
  stLabel(P, va, 'a = 1', C.white, a * at(S, 0, 0.6), { size: 28 });
  stLabel(P, vb, mg < 0.5 ? 'b = 2 + i' : 'b = 1 + 2i', C.white, a * sb, { size: 28 });
  stLabel(P, vc, mg < 0.5 ? 'c = 3 + 4i' : 'c = −3 + 4i', C.now, a * sc, { size: 28, pearl: 'g' });
  if (sc > 0.003) txt('equal steps · 等步', P.cx, P.cy + P.R + 58, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: a * sc });

  const X0 = 960;
  const p0 = at(S, 0, 0.6);
  panel(X0 - 20, 190, 840, 370, a * p0, C.cyan, 'b ā b ON ONE GREAT CIRCLE · 同一大圆');
  rich([['c = b ā b = 2⟨a,b⟩ b − |b|² a', C.white]], X0 + 10, 254, { size: 28, a: a * sc });
  const k1 = Q(S, 1, 'The kappas are', 0.6);
  rich([['κ(a,b) = 4/5   κ(b,c) = 4/5   κ(c,a) = 9/25', C.white]], X0 + 10, 312, { size: 28, a: a * k1 });
  rich([['B = 2·10·3 / (1·5·25) = ', C.white], ['12/25', C.cyan]], X0 + 10, 364, { size: 28, a: a * Q(S, 1, 'B is twelve', 0.6) });
  rich([['det G₃ = 1 + 24/25 − (4/5 + 4/5 + 9/25) = ', C.white], ['0', C.now]], X0 + 10, 420, { size: 27, a: a * Q(S, 1, 'closing number is zero', 0.6) });
  const r3 = Q(S, 3, 'B turns negative', 0.6);
  line(X0 + 10, 450, X0 + 790, 450, C.cyan, a * r3 * 0.5, 1.5);
  rich([['b = 1 + 2i:  κ = 1/5, 1/5, 9/25    B = ', C.white], ['−3/25', C.now], ['    det G₃ = 0', C.white]], X0 + 10, 494, { size: 25, a: a * r3 });
  rich([['κ forgets the sign, B keeps it · κ 丢掉符号，B 保住它', C.dim, F.zh]], X0 + 10, 538, { size: 22, a: a * Q(S, 3, 'the loop keeps a sign', 0.6) });

  const l = Q(S, 2, 'Lean checks', 0.6);
  panel(X0 - 20, 580, 840, 250, a * l, C.lean);
  rich([['a, b : Quad4,  a, b ≠ 0', C.white]], X0 + 10, 640, { size: 28, a: a * l });
  rich([['⇒   detGram3 a b (triad b a b) ≡ 0', C.white]], X0 + 10, 696, { size: 30, a: a * l });
  leanChip(X0 + 10, 756, 'zero', a * l, { size: 20 });
  if (l > 0.003) txt('three rays in one plane · 三射线共面', X0 + 10, 806, { size: 20, fam: F.zh, w: 700, c: C.dim, a: a * l });
};

/* ======================================================================= */
/*                          scene 5 · ARC DOUBLING                           */
/* ======================================================================= */
const DC = [500, 480, 240];
SCENES.doubling = S => {
  const a = stFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean']]);
  /* the great circle seen face on: a at angle 0, b at θ, c = b ā b at 2θ; a ray is a diameter */
  const [cx, cy, R] = DC;
  ring(cx, cy, R, C.cyan, a * 0.8, 2.5);
  txt('the great circle through a and b · 过 a、b 的大圆', cx, cy + R + 60, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
  /* current row: 0 during line 0, then rows 0, 1, 2 at the spoken phrases of line 1 */
  const row = u < phraseAt(S, 1, 'nine tenths') ? 0 : u < phraseAt(S, 1, 'one half to zero') ? 1 : 2;
  const prev = row === 0 ? 0 : row - 1;
  const tr = row === 0 ? 1 : ease(clamp((u - phraseAt(S, 1, row === 1 ? 'nine tenths' : 'one half to zero')) / 0.9));
  const ang = q => Math.atan2(q[1], q[0]);
  const th = lerp(ang(DT[prev].b), ang(DT[row].b), tr);
  const pt = t => [cx + R * Math.cos(t), cy - R * Math.sin(t)];
  const diam = (t, col, al, lw) => { const p = pt(t), q = pt(t + Math.PI); dashed(p[0], p[1], q[0], q[1], col, al, lw); };
  diam(0, C.white, a * 0.35, 1.5); diam(th, C.white, a * 0.35, 1.5); diam(2 * th, C.now, a * 0.45, 1.5);
  const arc = (t0, t1, col, lw) => { ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(cx, cy, R, -t0, -t1, true); ctx.stroke(); ctx.restore(); };
  arc(0, th, C.cyan, 8); arc(th, 2 * th, C.cyan, 8);
  const lab = (t, s, col, pearl) => { const p = pt(t); dot(p[0], p[1], 13, pearl, a); txt(s, cx + (R + 44) * Math.cos(t), cy - (R + 44) * Math.sin(t) + 10, { size: 28, fam: F.math, w: 700, align: Math.cos(t) > 0.3 ? 'left' : Math.cos(t) < -0.3 ? 'right' : 'center', c: col, a }); };
  const cur = DT[row];
  lab(0, 'a = 1', C.white, 'w');
  lab(th, `b = ${cur.b[0]} + ${cur.b[1] === 1 ? '' : cur.b[1]}i`, C.white, 'w');
  const cs = cur.c[0] === 0 ? `${cur.c[1]}i` : `${cur.c[0]} + ${cur.c[1]}i`;
  lab(2 * th, `b ā b = ${cs}`, C.now, 'g');
  if (row === 2 && tr > 0.9) txt('b ā b ⟂ a: a quarter turn · 四分之一圈', cx, cy + R + 100, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.now, a });

  const X0 = 960;
  const p0 = at(S, 0, 0.6);
  panel(X0 - 20, 190, 840, 210, a * p0, C.cyan, 'THE DOUBLING LAW · 倍增律');
  rich([['κ(a, b ā b) = ', C.white], ['(2κ(a, b) − 1)²', C.now]], X0 + 10, 262, { size: 36, a: a * Q(S, 0, 'two kappa minus one', 0.6) });
  rich([['collinear: (κ₂ − 1)(κ₂ − (2κ₁ − 1)²) = 0', C.white]], X0 + 10, 320, { size: 26, a: a * Q(S, 0, 'an integer law', 0.6) });
  rich([['root κ₂ = 1: back to a    other root: the doubled step', C.dim]], X0 + 10, 366, { size: 21, a: a * Q(S, 0, 'the doubled overlap', 0.6) });

  /* the table */
  const t0 = at(S, 1, 0.6);
  panel(X0 - 20, 420, 840, 250, a * clamp(t0 + Q(S, 0, 'two kappa minus one', 0.6)), C.cyan, 'κ₁ → κ₂');
  const hx = [X0 + 10, X0 + 190, X0 + 360, X0 + 560];
  ['b', 'κ₁ = κ(a, b)', 'b ā b', 'κ₂ = (2κ₁ − 1)²'].forEach((h, j) => txt(h, hx[j], 470, { size: 20, fam: F.math, w: 700, c: C.dim, a: a * p0 }));
  [0, 1, 2].forEach(i => {
    const r = DT[i], on = i === 0 ? Q(S, 0, 'two kappa minus one', 0.6) : i === 1 ? Q(S, 1, 'nine tenths', 0.6) : Q(S, 1, 'one half to zero', 0.6);
    const y = 524 + i * 52, col = i === row ? C.now : C.white;
    const cS = r.c[0] === 0 ? `${r.c[1]}i` : `${r.c[0]} + ${r.c[1]}i`;
    [`${r.b[0]} + i`, fS(r.k1), cS, fS(r.k2)].forEach((s, j) => txt(s, hx[j], y, { size: 30, fam: F.math, w: 700, c: j === 3 ? (i === row ? C.now : C.cyan) : col, a: a * on }));
  });
  const l = Q(S, 2, 'Lean checks', 0.6);
  panel(X0 - 20, 690, 840, 140, a * l, C.lean);
  rich([['a, b : Quad4 ≠ 0  ⇒  κ(a, triad b a b) ≡ (2κ(a, b) − 1)²', C.white]], X0 + 10, 744, { size: 24, a: a * l });
  leanChip(X0 + 10, 796, 'kappa', a * l, { size: 20 });
};

/* ======================================================================= */
/*                          scene 6 · SPHERICAL EXCESS                       */
/* ======================================================================= */
SCENES.excess = S => {
  const a = stFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean']]);
  const P = cam(SPH[0], SPH[1], SPH[2] + 20, [0.62 + 0.04 * Math.sin(u * 0.3), 0.55, 0.62]);
  stSphere(P, a);
  stTriangle(P, HALF_U, a, { fill: 1, lw: 4 });
  const [ua, ub, uc] = HALF_U;
  /* the right angle at a: two short tangent ticks */
  const ra = Q(S, 1, 'a right angle', 0.6);
  if (ra > 0.003) {
    const tb = v3.unit(v3.add(ub, v3.scl(-v3.dot(ub, ua), ua))), tc = v3.unit(v3.add(uc, v3.scl(-v3.dot(uc, ua), ua)));
    const k = 0.13, p1 = P(v3.unit(v3.add(ua, v3.scl(k, tb)))), p2 = P(v3.unit(v3.add(v3.add(ua, v3.scl(k, tb)), v3.scl(k, tc)))), p3 = P(v3.unit(v3.add(ua, v3.scl(k, tc))));
    ctx.save(); ctx.globalAlpha = a * ra; ctx.strokeStyle = C.now; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.lineTo(p3[0], p3[1]); ctx.stroke(); ctx.restore();
  }
  const sv = Q(S, 1, 'At a it is one', 0.6), sbc = Q(S, 1, 'at b and c', 0.6);
  stLabel(P, ua, sv > 0.5 ? 'S(a) = 1' : 'a', sv > 0.5 ? C.now : C.white, a, { size: 28 });
  stLabel(P, ub, sbc > 0.5 ? 'S(b) = 2/3' : 'b', sbc > 0.5 ? C.now : C.white, a, { size: 28 });
  stLabel(P, uc, sbc > 0.5 ? 'S(c) = 2/3' : 'c', sbc > 0.5 ? C.now : C.white, a, { size: 28 });
  txt('det G₃ = 1/4', P.cx, 220, { size: 34, fam: F.math, w: 700, align: 'center', c: C.mag, a });

  const X0 = 960;
  const p0 = at(S, 0, 0.6);
  panel(X0 - 20, 190, 840, 330, a * p0, C.cyan, 'VERTEX SPREADS · 顶点展开度');
  rich([['s = 1 − κ:   s(a,b) = ½   s(b,c) = ¾   s(c,a) = ½', C.white]], X0 + 10, 254, { size: 27, a: a * Q(S, 0, 'two side spreads', 0.6) });
  rich([['S(a) = det G₃ / (s(a,b) s(c,a))', C.cyan]], X0 + 10, 306, { size: 28, a: a * Q(S, 0, 'divide by', 0.6) });
  rich([['S(a) = ¼ / (½·½) = ', C.white], ['1', C.now], ['   right angle · 直角', C.dim, F.zh]], X0 + 10, 362, { size: 28, a: a * sv });
  rich([['S(b) = S(c) = ¼ / (½·¾) = ', C.white], ['2/3', C.now]], X0 + 10, 416, { size: 28, a: a * sbc });
  const fl = Q(S, 1, 'above the flat', 0.6);
  rich([['flat right isosceles: ½  →  sphere: 2/3 > ½', C.mag]], X0 + 10, 466, { size: 25, a: a * fl });
  if (fl > 0.003) txt('the surplus is the excess · 多出的就是球面角盈', X0 + 10, 502, { size: 20, fam: F.zh, w: 700, c: C.mag, a: a * Q(S, 1, 'that is the excess', 0.6) });

  const l1 = Q(S, 2, 'Lean checks', 0.6);
  panel(X0 - 20, 540, 840, 140, a * l1, C.lean);
  rich([['S(a) / s(b,c) ≡ S(b) / s(c,a) ≡ S(c) / s(a,b)', C.white], ['   = 4/3', C.now]], X0 + 10, 592, { size: 27, a: a * l1 });
  leanChip(X0 + 10, 646, 'sine', a * l1, { size: 20 });
  const l2 = Q(S, 3, 'the right-angle law', 0.6);
  panel(X0 - 20, 690, 840, 140, a * l2, C.lean);
  rich([['⟨a,a⟩⟨b,c⟩ = ⟨a,b⟩⟨a,c⟩  ⇒  κ(b,c) ≡ κ(a,b) κ(c,a)', C.white]], X0 + 10, 740, { size: 25, a: a * l2 });
  rich([['¼ = ½ · ½', C.now]], X0 + 600, 796, { size: 28, a: a * Q(S, 3, 'one quarter is', 0.6) });
  leanChip(X0 + 10, 796, 'pyth', a * l2, { size: 20 });
};

/* ======================================================================= */
/*                          scene 7 · FOUR TRIADS                            */
/* ======================================================================= */
const GAL = [
  { name: 'doubled arc · 倍增弧', U: [[1, 0, 0], v3.unit([2, 1, 0]), v3.unit([3, 4, 0])], d: DR1.det, rays: '1, 2 + i, 3 + 4i', S: null },
  { name: 'half steps · 正交半步', U: HALF_U, d: HR.det, rays: '1, 1 + i, 1 + j', S: 'S = 1, 2/3, 2/3' },
  { name: 'equal-sided · 等边', U: embed3(QI, QJ, QK), d: ER.det, rays: '1 + i, 1 + j, 1 + k', S: 'S = 8/9, 8/9, 8/9' },
  { name: 'octant · 三正交', U: embed3(OCT.a, OCT.b, OCT.c), d: OR.det, rays: '1, i, j', S: 'S = 1, 1, 1' }
];
SCENES.gallery = S => {
  const a = stFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'largest value', 'argued'], [3, 'Cast onto the reals', 'argued']]);
  const on = [Q(S, 0, 'doubled arc', 0.6), Q(S, 0, 'half steps', 0.6), at(S, 1, 0.6), at(S, 2, 0.6)];
  const focus = u < lineAt(S, 0).s + 0 ? -1 : u < phraseAt(S, 0, 'half steps') ? 0 : u < lineAt(S, 1).s ? 1 : u < lineAt(S, 2).s ? 2 : u < lineAt(S, 3).s ? 3 : -1;
  GAL.forEach((g, i) => {
    const x = 130 + i * 418, w = 392, al = a * on[i];
    panel(x, 190, w, 430, al, i === focus ? C.now : C.cyan, g.name);
    if (al <= 0.003) return;
    const c3 = g.U.reduce((s, v) => v3.add(s, v), [0, 0, 0]);
    const d = i === 0 ? [0.25, -0.55, 0.8] : v3.unit(v3.add(v3.unit(c3), [0.0, -0.25, 0.25]));
    const P = cam(x + w / 2, 410, 130, v3.add(d, [0.04 * Math.sin(u * 0.4 + i), 0, 0]));
    stSphere(P, al * 0.8);
    if (i === 0) stCircle(P, [0, 0, 1], C.cyan, al * 0.6, 1.5, [7, 6]);
    stTriangle(P, g.U, al, { fill: i === 0 ? 0 : 0.9, lw: 3 });
    g.U.forEach(v => { const p = P(v); dot(p[0], p[1], 8, 'w', al); });
    txt(g.rays, x + w / 2, 582, { size: 20, fam: F.math, w: 700, align: 'center', c: C.dim, a: al });
    rich([['det G₃ = ', C.white], [fS(g.d), i === focus ? C.now : C.mag]], x + w / 2, 266, { size: 28, a: al, align: 'center' });
    if (g.S) txt(g.S, x + w / 2, 612, { size: 18, fam: F.math, w: 700, align: 'center', c: C.white, a: al * 0.9 });
  });
  /* the meter 0 … 1 */
  const mA = a * on[0];
  if (mA > 0.003) {
    const x0 = 200, x1 = 1000, y = 680;
    line(x0, y, x1, y, C.dim, mA, 2);
    [0, 0.25, 0.5, 1].forEach(v => txt(v === 0.25 ? '1/4' : v === 0.5 ? '1/2' : String(v), x0 + (x1 - x0) * v, y + 38, { size: 22, fam: F.math, w: 700, align: 'center', c: C.dim, a: mA }));
    GAL.forEach((g, i) => { if (on[i] > 0.003) { const v = g.d[0] / g.d[1]; dot(x0 + (x1 - x0) * v, y, i === focus ? 15 : 10, i === focus ? 'g' : 'm', a * on[i]); } });
    txt('det G₃', x0 - 20, y + 8, { size: 22, fam: F.math, w: 700, align: 'right', c: C.white, a: mA });
  }
  const eq = Q(S, 1, 'eight ninths', 0.6);
  rich([['equal-sided: S = 8/9 vs flat 3/4,  surplus 5/36', C.white]], 1080, 676, { size: 22, a: a * eq });
  const mx = Q(S, 2, 'largest value', 0.6) * (1 - at(S, 3, 0.5));
  if (mx > 0.003) txt('det G₃ ≤ 1 · the chapter’s statement (argued)', 1080, 716, { size: 20, fam: F.disp, w: 700, c: C.argued, a: a * mx });
  const sh = Q(S, 3, 'Cast onto the reals', 0.6);
  panel(1060, 730, 740, 100, a * sh, C.argued, 'REAL SHADOW · 实数影子 (ARGUED)');
  rich([['det G₃ = sin²α sin²β sin²C     S(c) = sin²C', C.white]], 1080, 792, { size: 24, a: a * sh });
};

/* ======================================================================= */
/*                                 scene 8 · close                          */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 250 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[5], t = sc.start + 6;
  background(t, sc, 5, 6);
  const P = cam(1380, 520, 300, [0.62, 0.55, 0.62]);
  stSphere(P, 1);
  stTriangle(P, HALF_U, 1, { fill: 1, lw: 5 });
  HALF_U.forEach((v, i) => stLabel(P, v, 'abc'[i], C.white, 1));
  txt('det G₃ = 1/4', 1380, 180 + 30, { size: 40, fam: F.math, w: 700, align: 'center', c: C.mag });
  txt(DATA.film.title_zh, 600, 430, { size: 100, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('CLOSING A', 600, 540, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('SPHERICAL TRIANGLE', 600, 610, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 5 });
  rich([['det G₃ = 1 + 2B − (κ(a,b) + κ(b,c) + κ(c,a))', C.white]], 600, 700, { size: 32, align: 'center' });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 600, 770, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 5, sc);
  post(0);
};
