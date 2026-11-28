/* Film · Exact on a Coarse Grid · 粗网格上的精确积分 (book omega-math, chapter 9).
   Scenes for the shared engine theme/film/engine.js.

   What each scene shows, and where it rests:
     hook    fine slicing h → 0 with an O(h²) residue (the classical picture the chapter overturns, argued);
             a coarse two-triangle grid with nothing left over (argued, the chapter's thesis).
     fold    the heap law I [y, x, x] = y (definition def-ch09-heap-line-integral); the fold
             I(x₀, …, x_{k+1}) = [x_{k+1}, x_k, I(x₀, …, x_k)] collapses to x_n, and in a group
             (x₄x̄₃)(x₃x̄₂)(x₂x̄₁)(x₁x̄₀) = x₄x̄₀ (hand derivation, ARGUED) ..... sum_d0 (LEAN: for any vertex type
             and any commutative group, the chain sum of δ₀f is f(last) − f(first)); worked example
             f = 5, 1, 8, 3, 6: −4 + 7 − 5 + 3 = 1 = 6 − 5 (computed).
     glue    the four-vertex disk of example ex-ch09-coarse-two-plaquette-stokes with integer edge values
             Φ₀₁ = 2, Φ₁₂ = 5, Φ₂₃ = −1, Φ₃₀ = 3, Φ₁₃ = 4 (our choice): the triangles circulate 9 and 0, the inner
             diagonal cancels, the rim gives 9 (computed; the abelian Stokes statement is argued in the chapter).
     order   the chapter's rational unit quaternions on the five edges; W₁ = (−1/2, 1/2, 1/2, −1/2),
             W̃₂ = (−12/125, −91/125, −12/125, −84/125), W₁W̃₂ = (31/250, −17/250, 7/10, 7/10) = Hol(∂Σ),
             W̃₂W₁ = (31/250, 7/10, −7/10, 17/250) ≠ Hol(∂Σ); the path test i(−k) = j versus i·k = −j
             (all computed exactly in rationals on load; the peeling identity DCP = (DBP)(P⁻¹B⁻¹CP) is ARGUED).
     cone    δ₂δ₁ = 0 ..... d2_d1 (LEAN); the cone (H₂ b F)(x, y) = F(b, x, y) (definition def-ch09-cone-homotopy);
             δ₁(H₂ b F) + H₃ b (δ₂F) = F ..... d1_H2_add_H3_d2 (LEAN); closed ⇔ exact with witness H₂ b F
             ..... d2_eq_zero_iff (LEAN, empty axiom record in the lock). Worked example on the vertices 0…3 with
             e₀(x, y) = 3x − y + xy (our choice), F = δ₁e₀, F′ = F + 1 at (1, 2, 3) (computed).
     caps    the second-order osculating three-sphere manifold M_Ω: curved caps instead of flat plates, quaternion
             Möbius gluing (definition def-ch09-osculating-manifold, MODEL, ARGUED; the ellipse and its osculating
             circle are a schematic picture whose radius a²/b is computed); the solenoid thread z_{mn}ⁿ = z_m and
             logarithmicCharge(z) = ln‖z₁‖ = 0 ⇔ ∀ m, ‖z_m‖ = 1 ..... logarithmicCharge_eq_zero_iff (LEAN);
             the drifting row |z₁| = 2, |z_m| = 2^(1/m) is computed (angles schematic).
     ledger  the Volume III table of section 9.4 (argued: the book's synthesis), the M_Ω row marked MODEL.

   On load, FILM.init checks DATA.lean against the five theorems and re-derives every number shown on screen by an
   independent route; any disagreement goes to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const EC_SX = 'D5/S3/Quantum/AURICOmega/OmegaSimplicialExactness.';
const EC_LEAN = {
  sum_d0: [EC_SX + 'sum_d0', 'sum_d0'],
  d2_d1: [EC_SX + 'd2_d1', 'd2_d1'],
  d1_H2_add_H3_d2: [EC_SX + 'd1_H2_add_H3_d2', 'd1_H2_add_H3_d2'],
  d2_eq_zero_iff: [EC_SX + 'd2_eq_zero_iff', 'd2_eq_zero_iff'],
  logarithmicCharge_eq_zero_iff: ['D5/S1/Solenoid/ComplexPowerSolenoidDecomposition.logarithmicCharge_eq_zero_iff', 'logarithmicCharge_eq_zero_iff']
};

/* exact rationals [n, d], d > 0 */
const ecG = (a, b) => (b ? ecG(b, a % b) : Math.abs(a));
const fr = (n, d = 1) => { if (d < 0) { n = -n; d = -d; } const g = ecG(n, d) || 1; return [n / g, d / g]; };
const fAdd = (a, b) => fr(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const fSub = (a, b) => fr(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
const fMul = (a, b) => fr(a[0] * b[0], a[1] * b[1]);
const fEq = (a, b) => a[0] * b[1] === b[0] * a[1];
const fStr = a => (a[1] === 1 ? String(a[0]) : `${a[0]}/${a[1]}`).replace('-', '−');
/* quaternions [w, x, y, z] of rationals */
const qMul = (a, b) => [
  fSub(fSub(fSub(fMul(a[0], b[0]), fMul(a[1], b[1])), fMul(a[2], b[2])), fMul(a[3], b[3])),
  fSub(fAdd(fAdd(fMul(a[0], b[1]), fMul(a[1], b[0])), fMul(a[2], b[3])), fMul(a[3], b[2])),
  fAdd(fAdd(fSub(fMul(a[0], b[2]), fMul(a[1], b[3])), fMul(a[2], b[0])), fMul(a[3], b[1])),
  fAdd(fSub(fAdd(fMul(a[0], b[3]), fMul(a[1], b[2])), fMul(a[2], b[1])), fMul(a[3], b[0]))];
const qInv = a => [a[0], fr(-a[1][0], a[1][1]), fr(-a[2][0], a[2][1]), fr(-a[3][0], a[3][1])]; /* unit: inverse = conjugate */
const qN = (...c) => c.map(x => (Array.isArray(x) ? fr(x[0], x[1]) : fr(x, 1)));
const qStr = q => '(' + q.map(fStr).join(', ') + ')';
const qEq = (a, b) => a.every((c, i) => fEq(c, b[i]));
const prod = (...qs) => qs.reduce((p, q) => qMul(p, q));

/* the chapter's five edge rotors */
const U01 = qN([3, 5], [4, 5], 0, 0), U12 = qN([3, 5], 0, [4, 5], 0), U23 = qN([3, 5], 0, 0, [4, 5]);
const U30 = qN([1, 2], [1, 2], [1, 2], [1, 2]), U13 = qN([4, 5], [3, 5], 0, 0);
const W1 = prod(U30, U13, U01);
const F2 = prod(qInv(U13), U23, U12);
const W2 = prod(qInv(U01), F2, U01);
const HOL = prod(U30, U23, U12, U01);
const W12 = qMul(W1, W2), W21 = qMul(W2, W1);
/* the path test: U01 = U12 = U30 = 1, U23 = j, U13 = i */
const Q1 = qN(1, 0, 0, 0), QI = qN(0, 1, 0, 0), QJ = qN(0, 0, 1, 0), QK = qN(0, 0, 0, 1);
const PT_HOL = prod(Q1, QJ, Q1, Q1);           /* U30 U23 U12 U01 */
const PT_W1 = prod(Q1, QI, Q1);                /* U30 U13 U01 */
const PT_F2 = prod(qInv(QI), QJ, Q1);          /* U13⁻¹ U23 U12 */
const PT_A = qMul(PT_W1, prod(qInv(Q1), PT_F2, Q1));                /* anchored along 0 → 1 */
const PT_P = qMul(qInv(QI), Q1);               /* 0 → 3 → 1: U31 U03 = U13⁻¹ U30⁻¹ */
const PT_B = qMul(PT_W1, prod(qInv(PT_P), PT_F2, PT_P));            /* anchored along 0 → 3 → 1 */

/* the heap chain and the abelian heights */
const FD_F = [5, 1, 8, 3, 6];
const FD_STEPS = FD_F.slice(1).map((v, i) => v - FD_F[i]);
/* the integer edge values of the glued square (our choice) */
const GL = { '01': 2, '12': 5, '23': -1, '30': 3, '13': 4 };
const glv = (a, b) => (GL[`${a}${b}`] != null ? GL[`${a}${b}`] : -GL[`${b}${a}`]);
const GL_T1 = glv(0, 1) + glv(1, 3) + glv(3, 0), GL_T2 = glv(1, 2) + glv(2, 3) + glv(3, 1);
const GL_RIM = glv(0, 1) + glv(1, 2) + glv(2, 3) + glv(3, 0);

/* cochains on the vertices 0…3 with integer values */
const VS = [0, 1, 2, 3];
const e0 = (x, y) => 3 * x - y + x * y;
const d1 = e => (x, y, z) => (e(y, z) + e(x, y)) - e(x, z);
const d2 = F => (x, y, z, w) => (F(y, z, w) + F(x, y, w)) - (F(x, z, w) + F(x, y, z));
const H2 = (b, F) => (x, y) => F(b, x, y);
const H3 = (b, D) => (x, y, z) => D(b, x, y, z);
const CF = d1(e0);                                                         /* closed: F = δ₁e₀ */
const CF2 = (x, y, z) => CF(x, y, z) + (x === 1 && y === 2 && z === 3 ? 1 : 0); /* not closed */
const CE = H2(0, CF), CE2 = H2(0, CF2);
const CN = {
  F123: CF(1, 2, 3), e23: CE(2, 3), e12: CE(1, 2), e13: CE(1, 3), d1e: d1(CE)(1, 2, 3),
  F2_123: CF2(1, 2, 3), d1e2: d1(CE2)(1, 2, 3), defect: H3(0, d2(CF2))(1, 2, 3)
};

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('exact-on-a-coarse-grid film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(EC_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(EC_LEAN).length}`);
  for (const [short, [gid]] of Object.entries(EC_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. FOLD: heap law I in a group model (heap bracket [a, b, c] = a b⁻¹ c on rational quaternions) */
  {
    const br = (a, b, c) => prod(a, qInv(b), c);
    const pts = [U01, U12, U23, U30, U13];
    let I = pts[0];
    for (let k = 1; k < pts.length; k++) { I = br(pts[k], pts[k - 1], I); check(qEq(I, pts[k]), `heap fold step ${k} equals x_${k}`); }
    check(qEq(br(U12, U01, U01), U12) && qEq(br(U01, U01, U12), U12), 'law I: [y, x, x] = y and [x, x, y] = y');
    /* the group telescope (x₄x̄₃)…(x₁x̄₀) = x₄x̄₀ */
    let T = qN(1, 0, 0, 0);
    for (let k = pts.length - 1; k >= 1; k--) T = qMul(T, qMul(pts[k], qInv(pts[k - 1])));
    check(qEq(T, qMul(pts[4], qInv(pts[0]))), 'group telescope');
    check(FD_STEPS.join() === '-4,7,-5,3', 'steps −4, +7, −5, +3');
    check(FD_STEPS.reduce((s, c) => s + c, 0) === 1 && FD_F[4] - FD_F[0] === 1, 'sum of steps = 6 − 5 = 1');
  }

  /* 2. GLUE: the integer square */
  check(GL_T1 === 9 && GL_T2 === 0 && GL_T1 + GL_T2 === 9 && GL_RIM === 9, `triangles ${GL_T1}, ${GL_T2}, rim ${GL_RIM}`);
  check(glv(1, 3) + glv(3, 1) === 0, 'the diagonal cancels');

  /* 3. ORDER: the chapter's numbers, exactly */
  {
    const uq = q => fEq(q.reduce((s, c) => fAdd(s, fMul(c, c)), fr(0)), fr(1));
    [U01, U12, U23, U30, U13].forEach((q, i) => check(uq(q), `edge rotor ${i} is a unit quaternion`));
    check(qEq(qMul(U13, U01), QI), 'U13 U01 = i');
    check(qEq(W1, qN([-1, 2], [1, 2], [1, 2], [-1, 2])), `W1 = ${qStr(W1)}`);
    check(qEq(F2, qN([-12, 125], [-91, 125], [84, 125], [12, 125])), `F2 = ${qStr(F2)}`);
    check(qEq(W2, qN([-12, 125], [-91, 125], [-12, 125], [-84, 125])), `W̃2 = ${qStr(W2)}`);
    check(qEq(W12, qN([31, 250], [-17, 250], [7, 10], [7, 10])) && qEq(W12, HOL), `W1 W̃2 = ${qStr(W12)} = Hol`);
    check(qEq(W21, qN([31, 250], [7, 10], [-7, 10], [17, 250])) && !qEq(W21, HOL), `W̃2 W1 = ${qStr(W21)} ≠ Hol`);
    /* second route: the peeling identity D C P = (D B P)(P⁻¹ B⁻¹ C P) with P = U01, B = U13, C = U23 U12, D = U30 */
    const P = U01, B = U13, Cc = qMul(U23, U12), D = U30;
    check(qEq(prod(D, Cc, P), qMul(prod(D, B, P), prod(qInv(P), qInv(B), Cc, P))), 'peeling identity');
    check(qEq(PT_HOL, QJ) && qEq(PT_W1, QI), 'path test: Hol = j, W1 = i');
    check(qEq(PT_F2, qN(0, 0, 0, -1)), 'path test: F2 = −k');
    check(qEq(PT_A, QJ), 'anchored along 0 → 1: i(−k) = j');
    check(qEq(PT_P, qN(0, -1, 0, 0)) && qEq(prod(qInv(PT_P), PT_F2, PT_P), QK) && qEq(PT_B, qN(0, 0, -1, 0)), 'anchored along 0 → 3 → 1: −i, k, ik = −j');
  }

  /* 4. CONE: δ²=0 and the cone identity on all tuples; the worked numbers */
  {
    let okA = true, okB = true, okC = true;
    for (const x of VS) for (const y of VS) for (const z of VS) {
      if (d1(CE)(x, y, z) + H3(0, d2(CF2))(x, y, z) - CF2(x, y, z) !== 0) okA = false;
      if (d1(CE)(x, y, z) !== CF(x, y, z)) okB = false;
      for (const w of VS) if (d2(CF)(x, y, z, w) !== 0) okC = false;
    }
    check(okC, 'δ₂δ₁e₀ = 0 on all quadruples');
    check(okB, 'δ₁(H₂0 F) = F for closed F');
    /* note: CE = CE2 since the bump has first index 1 */
    check(okA && d1(CE2)(1, 2, 3) + H3(0, d2(CF2))(1, 2, 3) === CF2(1, 2, 3), 'cone identity for F′');
    check(CN.F123 === 9 && CN.e23 === 10 && CN.e12 === 4 && CN.e13 === 5 && CN.d1e === 9, `closed example ${JSON.stringify(CN)}`);
    check(CN.F2_123 === 10 && CN.d1e2 === 9 && CN.defect === 1, 'non-closed example 10 = 9 + 1');
    check(d2(CF2)(0, 1, 2, 3) === 1, 'δ₂F′(0, 1, 2, 3) = 1');
  }

  /* 5. CAPS: the osculating circle of the drawn ellipse, the drifting thread */
  {
    const a = CP_EA, b = CP_EB, R = a * a / b, t = Math.PI / 2, h = 1e-4;
    /* curvature of (a cos t, b sin t) at t = π/2 by finite differences */
    const P = s => [a * Math.cos(s), b * Math.sin(s)];
    const p0 = P(t - h), p1 = P(t), p2 = P(t + h);
    const dx = (p2[0] - p0[0]) / (2 * h), dy = (p2[1] - p0[1]) / (2 * h), ddx = (p2[0] - 2 * p1[0] + p0[0]) / (h * h), ddy = (p2[1] - 2 * p1[1] + p0[1]) / (h * h);
    const k = Math.abs(dx * ddy - dy * ddx) / Math.pow(dx * dx + dy * dy, 1.5);
    check(Math.abs(1 / k - R) < 1e-3 * R, `osculating radius ${1 / k} vs ${R}`);
    CP_MS.forEach(m => check(Math.abs(Math.pow(Math.pow(2, 1 / m), m) - 2) < 1e-12, `|z_${m}|^${m} = |z_1|`));
    check(Math.abs(Math.pow(2, 1 / 2) - Math.SQRT2) < 1e-15, '2^(1/2) = √2');
    /* compatibility z_{mn}ⁿ = z_m for the drawn thread z_m = r^(1/m) e^{iφ/m} */
    for (const m of [1, 2, 3]) for (const n of [1, 2, 3]) {
      const zm = cpZ(2, m), zmn = cpZ(2, m * n);
      let re = 1, im = 0; for (let i = 0; i < n; i++) [re, im] = [re * zmn[0] - im * zmn[1], re * zmn[1] + im * zmn[0]];
      check(Math.abs(re - zm[0]) < 1e-12 && Math.abs(im - zm[1]) < 1e-12, `z_${m * n}^${n} = z_${m}`);
    }
  }
});
Object.assign(FILM.speed, { hook: 0.02, fold: 0.014, glue: 0.014, order: 0.016, cone: 0.014, caps: 0.016, ledger: 0.014, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const ecFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function rich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  const tot = parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0);
  if (o.align === 'center') cx = x - tot / 2;
  else if (o.align === 'right') cx = x - tot;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a }); cx += tw(s, size, fam, w); }
  return cx;
}
const EC_MISSING = new Set();
function leanTag(x, y, key, a, o = {}) {
  if (a <= 0.003) return;
  const [gid, label] = EC_LEAN[key], r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!EC_MISSING.has(gid)) { EC_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 19, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(label, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a small violet or cyan tag naming the tier of the thing beside it */
function tierTag(x, y, s, col, a, size = 18) {
  if (a <= 0.003) return;
  const w = tw(s, size, F.mono, 700, 1) + 18;
  box(x, y - size * 1.05, w, size * 1.45, col, a, 1.5, 'rgba(0,0,0,0.5)');
  txt(s, x + 9, y - size * 0.05, { size, fam: F.mono, w: 700, c: col, a, ls: 1 });
}
function poly(pts, col, a, fill = 0.2, lw = 2) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.beginPath();
  pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath();
  if (fill) { ctx.fillStyle = rgba(col, fill); ctx.fill(); }
  if (lw) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); }
  ctx.restore();
}
/* an arrow from p toward q, shortened at both ends, offset sideways by off */
function edgeArrow(p, q, col, a, w = 3.5, off = 0, trim = 22) {
  const dx = q[0] - p[0], dy = q[1] - p[1], n = Math.hypot(dx, dy), ux = dx / n, uy = dy / n, nx = -uy * off, ny = ux * off;
  arrow(p[0] + ux * trim + nx, p[1] + uy * trim + ny, q[0] - ux * trim + nx, q[1] - uy * trim + ny, col, a, w);
}
function strike(x, y, w, col, a) { line(x - 4, y - 8, x + w + 4, y - 8, col, a, 3); }

/* ======================================================================= */
/*                          scene 1 · NO SLICING                             */
/* ======================================================================= */
function ecTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.3) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.4);
  txt(`${DATA.book.code} · FILM`, W / 2, 360, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 500, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('EXACT ON A COARSE GRID', p, 5), W / 2, 600, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('HEAP FOLD · HOLONOMY · CONE HOMOTOPY · OSCULATING CAPS', W / 2, 680, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 5 });
}
/* the four-vertex square: 0 bottom-left, 1 bottom-right, 2 top-right, 3 top-left */
const sq = (cx, cy, s) => [[cx - s, cy + s], [cx + s, cy + s], [cx + s, cy - s], [cx - s, cy - s]];
SCENES.hook = S => {
  const u = S.u;
  ecTitle(S);
  const a = clamp((u - lineAt(S, 0).s - 0.3) / 0.6) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* left: finer and finer slices under a curve */
  const fa = a;
  panel(140, 200, 780, 600, fa, C.mag, 'CLASSICAL · 越切越细');
  const curveY = x => 640 - 260 * Math.sin(Math.PI * (x - 200) / 660) * (0.75 + 0.25 * Math.cos(3 * (x - 200) / 660));
  const lvl = Math.min(4, Math.floor(at(S, 0, 4.5) * 5));
  const n = 4 * Math.pow(2, lvl);
  for (let i = 0; i < n; i++) {
    const x0 = 200 + 660 * i / n, x1 = 200 + 660 * (i + 1) / n, y = curveY((x0 + x1) / 2);
    box(x0, y, x1 - x0, 680 - y, C.mag, fa * 0.55, 1, rgba(C.mag, 0.12));
  }
  ctx.save(); ctx.globalAlpha = fa; ctx.strokeStyle = C.white; ctx.lineWidth = 3; ctx.beginPath();
  for (let i = 0; i <= 120; i++) { const x = 200 + 660 * i / 120; i ? ctx.lineTo(x, curveY(x)) : ctx.moveTo(x, curveY(x)); }
  ctx.stroke(); ctx.restore();
  txt(`h = 1/${n}   →   0`, 530, 740, { size: 32, fam: F.math, w: 700, align: 'center', c: C.white, a: fa });
  txt('residue O(h²) · 截断余项', 530, 785, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.mag, a: fa * Q(S, 0, 'still leaves a residue', 0.6) });
  /* right: a coarse grid of two triangles */
  const ra = a * at(S, 1, 0.6);
  panel(1000, 200, 780, 600, ra, C.cyan, 'THIS CHAPTER · 粗网格');
  if (ra > 0.003) {
    const P = sq(1390, 470, 170);
    poly([P[0], P[1], P[3]], C.cyan, ra, 0.14, 0);
    poly([P[1], P[2], P[3]], C.cyan, ra, 0.08, 0);
    const ca = Q(S, 2, 'nothing is left over', 0.8);
    [[0, 1], [1, 2], [2, 3], [3, 0]].forEach(([i, j]) => line(P[i][0], P[i][1], P[j][0], P[j][1], mix(C.cyan, C.now, ca), ra, 4));
    line(P[1][0], P[1][1], P[3][0], P[3][1], C.vio, ra * (1 - 0.8 * ca), 3);
    P.forEach((p, i) => { dot(p[0], p[1], 10, 'w', ra); });
    txt('two triangles, h stays large · 两块三角形', 1390, 700, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: ra });
    txt('0 left over · 分毫不剩', 1390, 760, { size: 34, fam: F.zh, w: 900, align: 'center', c: C.now, a: ra * ca });
  }
};

/* ======================================================================= */
/*                          scene 2 · HEAP FOLD                              */
/* ======================================================================= */
const FD_P = [[210, 650], [350, 450], [510, 610], [670, 410], [830, 570]];
SCENES.fold = S => {
  const a = ecFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [3, 'Lean checks', 'lean']]);
  /* line 0: law I */
  const la = a * at(S, 0, 0.6);
  panel(140, 190, 780, 150, la, C.argued, 'HEAP LAW I · 流群法则 I');
  rich([['[x, x, y] = y', C.white], ['        ', C.white], ['[y, ', C.white], ['x, x', C.mag], ['] = y', C.white]], 530, 282, { size: 40, align: 'center', a: la });
  txt('no origin, no zero · 无原点', 530, 326, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: la * Q(S, 0, 'no origin', 0.5) });
  /* the chain */
  const ca = a * at(S, 0, 0.6, 1.0);
  const hk = clamp((u - phraseAt(S, 1, 'Fold a chain')) / 5.5) * 4;
  if (ca > 0.003) {
    for (let i = 0; i < 4; i++) dashed(FD_P[i][0], FD_P[i][1], FD_P[i + 1][0], FD_P[i + 1][1], C.cyan, ca * 0.6, 2);
    const fa3 = Q(S, 3, 'commutative group', 0.6);
    FD_P.forEach((p, i) => {
      dot(p[0], p[1], 12, i === 0 || i === 4 ? 'c' : 'w', ca);
      txt(`x${'₀₁₂₃₄'[i]}`, p[0], p[1] + 46, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a: ca });
      txt(`f = ${FD_F[i]}`, p[0], p[1] + 84, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: a * fa3 });
    });
    /* the running result I, amber, hops from point to point */
    const fs = phraseAt(S, 1, 'Fold a chain');
    if (u >= fs) {
      const j = Math.min(4, Math.floor(hk)), t = ease(clamp((hk - j) * 2.5)), p = FD_P[j], q = FD_P[Math.min(4, j + 1)];
      const x = j < 4 ? lerp(p[0], q[0], t) : p[0], y = j < 4 ? lerp(p[1], q[1], t) : p[1];
      ring(x, y, 24, C.now, a * (1 - fa3), 3.5);
      txt('I', x + 30, y - 24, { size: 30, fam: F.math, w: 700, c: C.now, a: a * (1 - fa3) });
    }
  }
  /* right: the fold ledger */
  const ra = a * at(S, 1, 0.6);
  panel(980, 190, 820, 400, ra, C.cyan, 'FOLD · 折叠');
  if (ra > 0.003) {
    const n = Math.min(4, Math.max(0, Math.floor(hk + 0.6)));
    const fade = 1 - 0.55 * Q(S, 3, 'commutative group', 0.6);
    txt('I(x₀) = x₀', 1010, 260, { size: 28, fam: F.math, w: 700, c: C.white, a: ra * fade });
    for (let i = 1; i <= 4; i++) {
      const ia = ra * fade * clamp((hk + 0.6 - i) * 2);
      const cur = i === n && u < phraseAt(S, 3, 'Lean checks');
      const s = '₀₁₂₃₄';
      rich([[`I(…, x${s[i]}) = [x${s[i]}, `, C.white], [`x${s[i - 1]}, x${s[i - 1]}`, C.mag], ['] = ', C.white], [`x${s[i]}`, cur ? C.now : C.cyan]], 1010, 260 + 54 * i, { size: 28, a: ia });
    }
    const ga = ra * fade * Q(S, 2, 'a cancelling pair', 0.6);
    rich([['(x₄x̄₃)(x₃x̄₂)(x₂x̄₁)(x₁x̄₀) = ', C.white], ['x₄x̄₀', C.now]], 1010, 560, { size: 28, a: ga });
    tierTag(1560, 300, 'BY HAND · 手工推导', C.argued, ga, 17);
    stamp('= FINAL POINT', 1390, 470, Q(S, 2, 'its final point', 0.5) * (1 - Q(S, 3, 'commutative group', 0.4)), C.now, 34, -0.05);
  }
  /* line 3: Lean, the abelian telescope */
  const lz = a * Q(S, 3, 'Lean checks', 0.6);
  panel(980, 610, 820, 220, lz, C.lean);
  if (lz > 0.003) {
    rich([['sum over the chain of δ₀f = f(last) − f(first)', C.white]], 1005, 660, { size: 26, a: lz });
    leanTag(1005, 708, 'sum_d0', lz);
    txt('any vertex type · any commutative group · 任意顶点 · 任意交换群', 1005, 745, { size: 19, fam: F.zh, w: 700, c: C.lean, a: lz * 0.9 });
    const sa = a * Q(S, 3, 'last minus first', 0.6);
    rich([['−4 + 7 − 5 + 3 = ', C.cyan], ['1', C.now], [' = 6 − 5', C.cyan], ['   computed', C.dim]], 1005, 800, { size: 28, a: sa });
  }
};

/* ======================================================================= */
/*                          scene 3 · TWO TRIANGLES                          */
/* ======================================================================= */
const GL_P = sq(500, 515, 230);
const GL_EDGES = [[0, 1], [1, 2], [2, 3], [3, 0]];
function glSquare(a, o = {}) {
  const P = o.P || GL_P;
  poly([P[0], P[1], P[3]], C.cyan, a * (o.t1 == null ? 1 : o.t1), 0.16, 0);
  poly([P[1], P[2], P[3]], C.mag, a * (o.t2 == null ? 1 : o.t2), 0.14, 0);
  GL_EDGES.forEach(([i, j]) => edgeArrow(P[i], P[j], o.rim || C.cyan, a, 4));
  P.forEach((p, i) => {
    dot(p[0], p[1], 12, 'w', a);
    const ox = i === 0 || i === 3 ? -34 : 34, oy = i < 2 ? 42 : -22;
    txt(String(i), p[0] + ox, p[1] + oy, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.white, a });
  });
}
SCENES.glue = S => {
  const a = ecFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const P = GL_P, cancel = Q(S, 2, 'cancels', 0.8), rim = Q(S, 2, 'leaving the rim', 0.6);
  const ta = a * at(S, 0, 0.6);
  glSquare(ta, { rim: mix(C.cyan, C.now, rim) });
  /* the diagonal, walked both ways */
  if (ta > 0.003) {
    const da = ta * (1 - 0.85 * cancel);
    edgeArrow(P[1], P[3], C.vio, da, 3, 9, 30);
    edgeArrow(P[3], P[1], C.vio, da, 3, 9, 30);
    txt('diagonal 1–3 · 对角线', 500, 515 + 8, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.vio, a: ta * (1 - at(S, 1, 0.5)) });
  }
  /* edge values */
  const va = a * Q(S, 1, 'whole numbers on the edges', 0.6);
  if (va > 0.003) {
    const lab = (s, x, y, col, al = va) => txt(s, x, y, { size: 32, fam: F.mono, w: 700, align: 'center', c: col, a: al });
    const rc = mix(C.cyan, C.now, rim);
    lab('2', 500, P[0][1] + 48, rc); lab('5', P[1][0] + 44, 525, rc); lab('−1', 500, P[2][1] - 22, rc); lab('3', P[0][0] - 44, 525, rc);
    lab('+4', 500 + 46, 515 - 30, C.vio, va * (1 - 0.85 * cancel)); lab('−4', 500 - 40, 515 + 62, C.vio, va * (1 - 0.85 * cancel));
  }
  /* the ledger */
  const ra = a * Q(S, 1, 'the triangles circulate', 0.6);
  panel(1000, 200, 800, 620, ra, C.cyan, 'CIRCULATION · 环流');
  if (ra > 0.003) {
    rich([['Δ₁: 0→1→3→0   ', C.cyan], ['2 + 4 + 3 = 9', C.white]], 1030, 290, { size: 30, a: ra });
    rich([['Δ₂: 1→2→3→1   ', C.mag], ['5 − 1 − 4 = 0', C.white]], 1030, 350, { size: 30, a: ra });
    rich([['sum of the faces   ', C.white], ['9 + 0 = 9', C.now]], 1030, 420, { size: 30, a: ra * Q(S, 1, 'nine in total', 0.5) });
    const ca = a * cancel;
    rich([['inner edge  ', C.vio], ['+4 − 4 = 0', C.vio]], 1030, 510, { size: 30, a: ca });
    txt('walked once each way · 正反各走一次', 1030, 550, { size: 22, fam: F.zh, w: 700, c: C.vio, a: ca });
    const rr = a * rim;
    rich([['rim  0→1→2→3→0   ', C.now], ['2 + 5 − 1 + 3 = ', C.white], ['9', C.now]], 1030, 630, { size: 30, a: rr });
    stamp('FACES = RIM', 1400, 730, Q(S, 2, 'nine again', 0.5), C.now, 38, -0.04);
    tierTag(1030, 805, 'general abelian case: BY HAND · 手工推导', C.argued, rr, 16);
  }
};

/* ======================================================================= */
/*                         scene 4 · ORDER AND PATH                          */
/* ======================================================================= */
const OR_P = sq(470, 520, 215);
SCENES.order = S => {
  const a = ecFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'in a second example', 'computed']]);
  const P = OR_P;
  const t1 = a * Q(S, 1, 'The first loop', 0.6), t2 = a * Q(S, 1, 'the second is pulled back', 0.6);
  const sa = a * at(S, 0, 0.6);
  glSquare(sa, { P, t1: Q(S, 1, 'The first loop', 0.6), t2: Q(S, 1, 'the second is pulled back', 0.6) });
  if (sa > 0.003) {
    edgeArrow(P[1], P[3], C.vio, sa, 3, 0, 30);
    const lab = (s, x, y, col = C.white) => txt(s, x, y, { size: 26, fam: F.math, w: 700, align: 'center', c: col, a: sa });
    lab('U₀₁', 470, P[0][1] + 46); lab('U₁₂', P[1][0] + 56, 528); lab('U₂₃', 470, P[2][1] - 22); lab('U₃₀', P[0][0] - 58, 528); lab('U₁₃', 470 + 44, 520 - 20, C.vio);
  }
  /* the anchor path: 0 → 1 (amber), and in line 3 the other path 0 → 3 → 1 */
  const an = a * Q(S, 1, 'along edge zero one', 0.6) * (1 - Q(S, 3, 'anchor along another path', 0.5) * 0.6);
  if (an > 0.003) { line(P[0][0], P[0][1] + 14, P[1][0], P[1][1] + 14, C.now, an, 6); txt('anchor 0→1 · 锚定', 470, P[0][1] + 86, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.now, a: an }); }
  const an2 = a * Q(S, 3, 'anchor along another path', 0.6);
  if (an2 > 0.003) {
    ctx.save(); ctx.setLineDash([12, 9]);
    line(P[0][0] - 16, P[0][1], P[3][0] - 16, P[3][1], C.now, an2, 5);
    line(P[3][0] + 6, P[3][1] - 14, P[1][0] + 6, P[1][1] - 14, C.now, an2, 5);
    ctx.restore();
    txt('other path 0→3→1 · 另一条路径', 470, P[3][1] - 66, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.now, a: an2 });
  }
  /* the ledger */
  const ra = a * at(S, 0, 0.6, 0.4);
  panel(900, 190, 900, 640, ra, C.cyan, 'RATIONAL UNIT QUATERNIONS · 有理单位四元数');
  if (ra > 0.003) {
    const sz = 23, ea = ra * Q(S, 0, 'three fifths plus four fifths i', 0.6);
    rich([['U₀₁ = ', C.white], [qStr(U01), C.now]], 925, 255, { size: sz, a: ra });
    rich([['U₁₂ = ' + qStr(U12), C.white]], 1365, 255, { size: sz, a: ea });
    rich([['U₂₃ = ' + qStr(U23), C.white]], 925, 292, { size: sz, a: ea });
    rich([['U₃₀ = ' + qStr(U30), C.white]], 1365, 292, { size: sz, a: ea });
    rich([['U₁₃ = ' + qStr(U13), C.vio]], 925, 329, { size: sz, a: ea });
    const w1 = t1 * clamp(ra * 9);
    rich([['W₁ = U₃₀U₁₃U₀₁ = ', C.cyan], [qStr(W1), C.white]], 925, 395, { size: 25, a: w1 });
    rich([['W̃₂ = U₀₁⁻¹(U₁₃⁻¹U₂₃U₁₂)U₀₁', C.mag]], 925, 445, { size: 25, a: t2 });
    rich([['   = ' + qStr(W2), C.white]], 925, 482, { size: 25, a: t2 });
    const pa = a * Q(S, 2, 'First times second', 0.6);
    rich([['W₁W̃₂ = ', C.white], [qStr(W12), C.now]], 925, 552, { size: 28, a: pa });
    rich([['= U₃₀U₂₃U₁₂U₀₁ = Hol(∂Σ)  ✓', C.now]], 925, 592, { size: 26, a: a * Q(S, 2, 'equals the rim holonomy', 0.6) });
    const xa = a * Q(S, 3, 'Swap the order', 0.6);
    rich([['W̃₂W₁ = ' + qStr(W21) + '  ≠ Hol', C.mag]], 925, 645, { size: 25, a: xa });
    const ba = a * Q(S, 3, 'in a second example', 0.6);
    if (ba > 0.003) {
      line(925, 672, 1775, 672, C.dim, ba * 0.6, 1);
      rich([['U₀₁ = U₁₂ = U₃₀ = 1, U₂₃ = j, U₁₃ = i:  Hol = j', C.white]], 925, 708, { size: 23, a: ba });
      rich([['via 0→1:  i · (−k) = ', C.white], ['j', C.now], ['  ✓', C.now]], 925, 752, { size: 25, a: ba });
      rich([['via 0→3→1:  i · k = ', C.white], ['−j', C.mag], ['  ✗', C.mag]], 1365, 752, { size: 25, a: a * Q(S, 3, 'j turns into minus j', 0.5) });
      tierTag(925, 808, 'computed · peeling identity DCP = (DBP)(P⁻¹B⁻¹CP): BY HAND · 手工推导', C.argued, ba, 16);
    }
  }
};

/* ======================================================================= */
/*                         scene 5 · CONE FROM A BASE                        */
/* ======================================================================= */
const CN_P = { b: [480, 260], 1: [220, 720], 2: [760, 720], 3: [560, 560] };
SCENES.cone = S => {
  const a = ecFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, 'Lean checks', 'lean']]);
  /* left: the face (1, 2, 3) and the cone from b */
  const fa = a * at(S, 0, 0.6);
  const P = CN_P, ba = a * Q(S, 1, 'Pick a base vertex b', 0.6);
  poly([P[1], P[2], P[3]], C.cyan, fa, 0.18, 3);
  if (ba > 0.003) {
    poly([P.b, P[1], P[2]], C.now, ba, 0.04, 0);
    [1, 2, 3].forEach(i => dashed(P.b[0], P.b[1], P[i][0], P[i][1], C.now, ba, 3));
    dot(P.b[0], P.b[1], 16, 'g', ba);
    txt('b', P.b[0] + 26, P.b[1] - 12, { size: 36, fam: F.math, w: 700, c: C.now, a: ba });
  }
  [1, 2, 3].forEach(i => {
    dot(P[i][0], P[i][1], 12, 'w', fa);
    txt(String(i), P[i][0] + (i === 1 ? -30 : 30), P[i][1] + (i === 3 ? -14 : 40), { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: fa });
  });
  const na = a * Q(S, 2, 'F splits exactly', 0.6);
  txt('example: b = 0, vertices 0…3, e₀(x, y) = 3x − y + xy', 140, 790, { size: 22, fam: F.math, w: 700, c: C.white, a: na * 0.75 });
  txt('F = δ₁e₀ is closed;  F′ = F + 1 at (1, 2, 3) is not', 140, 826, { size: 22, fam: F.math, w: 700, c: C.white, a: na * 0.75 });
  /* right: three Lean panels */
  const l0 = a * Q(S, 0, 'Lean checks', 0.6);
  panel(900, 190, 900, 150, l0, C.lean, 'δ² = 0 · 上边缘幂零');
  if (l0 > 0.003) {
    rich([['δ₂(δ₁e)(x, y, z, w) = 0   for every e : C¹(V, A)', C.white]], 925, 262, { size: 26, a: l0 });
    leanTag(925, 312, 'd2_d1', l0);
  }
  const l1 = a * Q(S, 1, 'The cone of a two-cochain', 0.6);
  panel(900, 360, 900, 90, l1, C.cyan);
  rich([['(H₂ b F)(x, y) := F(', C.white], ['b', C.now], [', x, y)', C.white], ['     cone · 锥', C.dim]], 925, 418, { size: 28, a: l1 });
  const l2 = a * Q(S, 2, 'F splits exactly', 0.6);
  panel(900, 470, 900, 165, l2, C.lean);
  if (l2 > 0.003) {
    rich([['F = δ₁(H₂ b F) + H₃ b (δ₂F)', C.white]], 925, 520, { size: 28, a: l2 });
    leanTag(925, 566, 'd1_H2_add_H3_d2', l2);
    rich([['F′(1, 2, 3) = ', C.white], [String(CN.F2_123), C.now], [' = ', C.white], [String(CN.d1e2), C.cyan], [' + ', C.white], [String(CN.defect), C.mag], ['   defect δ₂F′(0, 1, 2, 3) = 1', C.mag]], 925, 612, { size: 23, a: a * Q(S, 2, 'the cone of its defect', 0.6) });
  }
  const l3 = a * Q(S, 3, 'So a closed F is exact', 0.6);
  panel(900, 655, 900, 175, l3, C.lean);
  if (l3 > 0.003) {
    rich([['δ₂F = 0  ⇔  F = δ₁e,   witness e := H₂ b F', C.white]], 925, 703, { size: 27, a: l3 });
    leanTag(925, 750, 'd2_eq_zero_iff', l3);
    txt('axiom record [ ] · no choice · 不用选择公理', 1240, 750, { size: 20, fam: F.zh, w: 700, c: C.lean, a: a * Q(S, 3, 'no axiom of choice', 0.6) });
    rich([[`F = δ₁e₀:  e(2,3) + e(1,2) − e(1,3) = ${CN.e23} + ${CN.e12} − ${CN.e13} = `, C.white], [String(CN.d1e), C.now], [` = F(1, 2, 3)`, C.white]], 925, 800, { size: 22, a: a * Q(S, 3, 'the witness written down from b', 0.6) });
  }

};

/* ======================================================================= */
/*                         scene 6 · OSCULATING CAPS                         */
/* ======================================================================= */
const CP_EA = 1.6, CP_EB = 1.0, CP_MS = [1, 2, 3, 4];
/* the drawn thread: z_m = r^(1/m) e^{iφ/m}, φ = 1.1 (schematic angle) */
const cpZ = (r, m) => { const rr = Math.pow(r, 1 / m), ph = 1.1 / m; return [rr * Math.cos(ph), rr * Math.sin(ph)]; };
SCENES.caps = S => {
  const a = ecFade(S), u = S.u;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [3, 'Lean checks', 'lean']]);
  /* left: a curve, its flat plate and its osculating cap (schematic) */
  const la = a * at(S, 0, 0.6);
  panel(140, 190, 720, 640, la, C.argued, 'MODEL · M_Ω · 吻合三元球流形');
  if (la > 0.003) {
    const cx = 500, cy = 620, s = 190, R = CP_EA * CP_EA / CP_EB;
    ctx.save(); ctx.globalAlpha = la; ctx.strokeStyle = C.white; ctx.lineWidth = 3; ctx.beginPath();
    for (let i = 0; i <= 100; i++) { const t = Math.PI * (0.12 + 0.76 * i / 100); const x = cx + s * CP_EA * Math.cos(t), y = cy - s * CP_EB * Math.sin(t); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke(); ctx.restore();
    const px = cx, py = cy - s * CP_EB;
    const pl = la * (1 - 0.6 * Q(S, 0, 'not a flat tangent plate', 0.6));
    line(px - 230, py, px + 230, py, C.mag, pl, 4);
    txt('flat plate TₚM', px + 150, py - 18, { size: 22, fam: F.math, w: 700, align: 'center', c: C.mag, a: pl });
    const ca = la * Q(S, 0, 'curved rational three-sphere cap', 0.7);
    ctx.save(); ctx.globalAlpha = ca; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3.5; ctx.beginPath();
    ctx.arc(px, py + s * R, s * R, -Math.PI / 2 - 0.62, -Math.PI / 2 + 0.62); ctx.stroke(); ctx.restore();
    dot(px, py, 14, 'g', la);
    txt('p', px - 8, py - 22, { size: 30, fam: F.math, w: 700, c: C.now, a: la });
    txt('cap 𝕋₃⁽ᵖ⁾(ℚ) · 球冠', px, py + 140, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: ca });
    txt('second-order contact · 二阶吻合', px, py + 180, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: ca });
    /* line 1: gluing */
    const ga = a * Q(S, 1, 'glued by quaternion', 0.6);
    rich([['q ↦ (aq + b)(cq + d)⁻¹', C.vio]], 500, 700, { size: 34, align: 'center', a: ga });
    txt('a, b, c, d ∈ ℍ(ℚ) · no bump functions · 不用隆起函数', 500, 740, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ga });
    txt('schematic · 示意', 840, 815, { size: 18, fam: F.zh, w: 700, align: 'right', c: C.dim, a: la });
  }
  /* right: the solenoid thread */
  const ta = a * Q(S, 2, 'compatible powers', 0.6);
  panel(920, 190, 880, 640, ta, C.cyan, 'SOLENOID THREAD · 螺线管线程');
  if (ta > 0.003) {
    rich([['zₘₙⁿ = zₘ', C.white], ['   for all m, n ≥ 1', C.dim]], 950, 255, { size: 30, a: ta });
    const r0 = 46, cols = CP_MS.map((m, i) => 1060 + i * 205);
    const rows = [{ y: 385, r: 2, col: C.mag, lab: '|z₁| = 2: charge ln 2 ≠ 0 · 发散' }, { y: 600, r: 1, col: C.cyan, lab: '|z₁| = 1: charge 0 · 锁在单位圆上' }];
    const vals = ['2', '√2', '∛2', '⁴√2'];
    rows.forEach((row, ri) => {
      const ra = ri === 0 ? ta : a * Q(S, 3, 'every level sits on the unit circle', 0.6);
      CP_MS.forEach((m, i) => {
        const x = cols[i];
        ctx.save(); ctx.setLineDash([6, 6]); ring(x, row.y, r0, C.dim, ra * 0.9, 1.5); ctx.restore();
        const z = cpZ(row.r, m);
        line(x, row.y, x + r0 * z[0], row.y - r0 * z[1], row.col, ra * 0.7, 2);
        dot(x + r0 * z[0], row.y - r0 * z[1], 10, ri ? 'c' : 'm', ra);
        txt(ri ? `|z${'₁₂₃₄'[i]}| = 1` : `|z${'₁₂₃₄'[i]}| = ${vals[i]}`, x, row.y + r0 + 38, { size: 24, fam: F.math, w: 700, align: 'center', c: ri ? C.cyan : C.mag, a: ra });
      });
      txt(row.lab, 950, row.y + r0 + 76, { size: 21, fam: F.zh, w: 700, c: row.col, a: ra });
    });
    const lz = a * Q(S, 3, 'Lean checks', 0.6);
    if (lz > 0.003) {
      fillBox(940, 752, 840, 70, C.bg, lz * 0.7);
      rich([['logarithmicCharge(z) = ln‖z₁‖ = 0  ⇔  ∀ m, ‖zₘ‖ = 1', C.white]], 950, 778, { size: 24, a: lz });
      leanTag(950, 815, 'logarithmicCharge_eq_zero_iff', lz, { size: 18 });
    }
  }
};

/* ======================================================================= */
/*                            scene 7 · VOLUME III                           */
/* ======================================================================= */
const LG_ROWS = [
  ['derivatives · 导数', 'ε-δ limits, lim h → 0', 'nilpotent jets ℚ[η]/(η³)'],
  ['sphere stepping · 球面演化', 'explicit Euler tangent step', 'midpoint Cayley step α = 1/2'],
  ['transcendentals, π · 超越数', 'infinite series, real π and e', 'D-finite jets, rational recurrences'],
  ['integration, Stokes · 积分', 'h → 0 Riemann sums, O(h²)', 'heap telescoping, holonomy, cone'],
  ['manifold · 流形', 'flat plates, C∞ bump patches', 'osculating caps, Möbius gluing (MODEL)']
];
SCENES.ledger = S => {
  const a = ecFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const ha = a * at(S, 0, 0.6);
  panel(130, 190, 1660, 640, ha, C.argued, 'VOLUME III · 第三卷 · CALCULUS WITHOUT LIMITS');
  if (ha <= 0.003) return;
  const X = [160, 610, 1150], Y0 = 290, DY = 104;
  txt('TOPIC', X[0], 255, { size: 18, fam: F.mono, w: 700, c: C.dim, a: ha, ls: 2 });
  txt('CLASSICAL · 经典', X[1], 255, { size: 18, fam: F.zh, w: 700, c: C.mag, a: ha, ls: 2 });
  txt('VOLUME III · 第三卷', X[2], 255, { size: 18, fam: F.zh, w: 700, c: C.cyan, a: ha, ls: 2 });
  const cur = S.u >= phraseAt(S, 2, 'Flat plates') ? 4 : S.u >= phraseAt(S, 1, 'and integrals exact') ? 3 : S.u >= phraseAt(S, 1, 'transcendental functions') ? 2 : S.u >= phraseAt(S, 1, 'Derivatives became jets') ? 0 : -1;
  LG_ROWS.forEach((r, i) => {
    const y = Y0 + i * DY + 40, ra = ha * clamp((S.u - 0.4 - 0.25 * i) / 0.5);
    if (i === cur) box(145, y - 48, 1630, 76, C.now, ra, 2, rgba(C.now, 0.06));
    line(150, y + 34, 1770, y + 34, C.dim, ra * 0.4, 1);
    txt(r[0], X[0], y, { size: 24, fam: F.zh, w: 700, c: i === cur ? C.now : C.white, a: ra });
    txt(r[1], X[1], y, { size: 24, fam: F.math, w: 700, c: C.mag, a: ra * 0.9 });
    txt(r[2], X[2], y, { size: 24, fam: F.math, w: 700, c: i === 3 ? C.cyan : C.white, a: ra });
  });
  tierTag(160, 812, 'the book\'s synthesis, section 9.4 · M_Ω is a model reading · 本书综述，M_Ω 为模型诠释', C.argued, a * Q(S, 2, "in the book's model", 0.6), 16);
};

/* ======================================================================= */
/*                               scene 8 · close                              */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 290 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[2], t = sc.start + 6;
  background(t, sc, 2, 6);
  const P = sq(1380, 520, 200);
  poly([P[0], P[1], P[3]], C.cyan, 0.95, 0.18, 0);
  poly([P[1], P[2], P[3]], C.mag, 0.95, 0.16, 0);
  GL_EDGES.forEach(([i, j]) => edgeArrow(P[i], P[j], C.now, 0.95, 4));
  edgeArrow(P[1], P[3], C.vio, 0.35, 3, 9, 30); edgeArrow(P[3], P[1], C.vio, 0.35, 3, 9, 30);
  P.forEach(p => dot(p[0], p[1], 12, 'w', 1));
  txt(DATA.film.title_zh, 600, 430, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('EXACT ON A', 600, 540, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('COARSE GRID', 600, 610, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 5 });
  rich([['[y, x, x] = y     W₁W̃₂ = Hol(∂Σ)', C.white]], 600, 700, { size: 30, align: 'center' });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 600, 770, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 2, sc);
  post(0);
};
