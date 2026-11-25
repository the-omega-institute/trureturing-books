/* Film · Ten parts, one arc, and why it stops · 十部一条弧，以及它为什么会停下
   (book quantum-geometry, the coda, C.2). Scenes for theme/film/engine.js.

   The film walks the ten parts of the book as ten beads on one arc (a reading of the book, argued) and picks up one
   frozen theorem from a chapter of each part; then it lands on the coda's anchor, the finite contracting stability.

     arc      the ten beads, I–X, with a short name each (argued: a way to read the book).
     first    I    ch. 2   two unit arrows at 60°: weight = (cos 60°)² = 1/4 (computed)
                      ..... BornReduction.rank_one_pure_state_modulus_square_reduction (LEAN)
              II   ch. 6   u = (3, 0), v = (1, 2): 9 × 5 = 45 = 3² + 6² (computed) ..... lagrange_gram_identity (LEAN)
              III  ch. 9   R_y(90°) = R_z(90°) R_x(90°) R_z(−90°) (computed) ..... two_axis_finite_word (LEAN)
              IV   ch. 13  settings Z, X and (Z ± X)/√2 on the Bell state: 3 cos 45° − cos 135° = 2√2 (computed)
                      ..... TsirelsonTightness.bell_chsh_state_expectation_is_greatest (LEAN)
              V    ch. 17  S = 3(t² − x²) vanishes on light, S(1, 0) = 3; t² − 2x² does not (computed)
                      ..... MinkowskiNullConeRigidity.eq_smul_minkowski_of_null (LEAN)
     second   VI   ch. 24  iterates 1, 2, 1.5, 1.667, 1.6, 1.625 of x ↦ 1 + 1/x (computed, not the theorem)
                      ..... GoldenFixedPoint.golden_fixed_point_unique (LEAN)
              VII  ch. 25  unit records at 36.87° overlap 0.8, coinciding records overlap 1 (computed)
                      ..... UnitGramIndistinguishability.unit_gram_overlap_characterization (LEAN)
              VIII ch. 29  six terms of exp(i): 0.54167 + 0.84167 i, miss 0.00138 ≤ e/720 ≈ 0.00378 (computed)
                      ..... ExactTaylorObservationRemainder.exp_tail_le (LEAN)
              IX   ch. 36  a 3 × 3 table, f(y) = 2 − y, row 2 = f(diagonal) forces f(1) = 1 (computed)
                      ..... EscapeCount.diagonal_landing_fixed (LEAN)
              X    ch. 38  z ↦ z²: one turn below lifts from 1 to −1 above (LEAN); a second turn returns to 1 (hand step)
                      ..... CircleDoubleCoverHistoryLift.circle_double_cover_history_lift (LEAN)
     stop     six marbles {1, 2, 3, 5, 7, 8}, U(A) = {a ∈ A : a ≤ |A|}: 6, 4, 3, 3; N = 2, two changes (computed)
                      ..... FiniteContractingStability.finite_contracting_updates_stabilize (LEAN)
     edge     the arc is a reading (argued); the cosine fixed point uses Banach (literature); P vs NP and 3D
              Navier–Stokes smoothness are open (red).

   On load, FILM.init checks DATA.lean against the eleven theorems and re-derives every number on screen by an
   independent route. Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const TP_DEG = Math.PI / 180;
const TP_LEAN = {
  rank_one_pure_state_modulus_square_reduction: 'D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction',
  lagrange_gram_identity: 'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  two_axis_finite_word: 'D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word',
  bell_chsh_state_expectation_is_greatest: 'D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest',
  eq_smul_minkowski_of_null: 'D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null',
  golden_fixed_point_unique: 'D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique',
  unit_gram_overlap_characterization: 'D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization',
  exp_tail_le: 'D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le',
  diagonal_landing_fixed: 'D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed',
  circle_double_cover_history_lift: 'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift',
  finite_contracting_updates_stabilize: 'D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize'
};
const TP_PARTS = [
  ['I', 'pairwise', '两子丈量'], ['II', 'line & area', '线与面'], ['III', 'two axes', '两根轴'],
  ['IV', 'entangled', '纠缠'], ['V', 'spacetime', '时空'], ['VI', 'self-reference', '自指'],
  ['VII', 'comparison', '比较'], ['VIII', 'tiny arcs', '极小圆弧'], ['IX', 'observers', '观察者'], ['X', 'return', '归元']
];
/* II: two arrows in the plane */
const TP_U = [3, 0], TP_V = [1, 2];
/* III: 3 × 3 rotations */
const tpRot = (ax, t) => {
  const c = Math.cos(t), s = Math.sin(t);
  if (ax === 'x') return [[1, 0, 0], [0, c, -s], [0, s, c]];
  if (ax === 'y') return [[c, 0, s], [0, 1, 0], [-s, 0, c]];
  return [[c, -s, 0], [s, c, 0], [0, 0, 1]];
};
const tpMul = (A, B) => A.map((r, i) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const tpApp = (A, v) => A.map(r => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);
/* VI: the iterates of x ↦ 1 + 1/x from 1 */
const TP_GOLD = (() => { const xs = [1]; for (let k = 0; k < 5; k++) xs.push(1 + 1 / xs[xs.length - 1]); return xs; })();
const TP_PHI = (1 + Math.sqrt(5)) / 2;
/* VII: the angle of overlap 0.8 */
const TP_ALPHA = Math.acos(0.8);
/* VIII: partial sums of exp(i): the k-th term is i^k / k! */
const TP_EXP = (() => {
  const pts = [[0, 0]]; let re = 0, im = 0, f = 1;
  const ik = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  for (let k = 0; k < 6; k++) { if (k) f *= k; re += ik[k % 4][0] / f; im += ik[k % 4][1] / f; pts.push([re, im]); }
  return pts;
})();
const TP_EI = [Math.cos(1), Math.sin(1)];
const TP_MISS = Math.hypot(TP_EXP[6][0] - TP_EI[0], TP_EXP[6][1] - TP_EI[1]);
const TP_BOUND = Math.E / 720;
/* IX: the table g(row, col) and the twist f */
const TP_G = [[0, 2, 1], [1, 0, 2], [2, 2, 1]];
const tpF = y => 2 - y;
/* the coda: six marbles and the delete-only rule U(A) = {a ∈ A : a ≤ |A|} */
const TP_S0 = [1, 2, 3, 5, 7, 8];
const tpU = A => A.filter(a => a <= A.length);
const TP_RUN = (() => { const r = [TP_S0]; for (let k = 0; k < 4; k++) r.push(tpU(r[r.length - 1])); return r; })();

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('ten-parts-one-arc film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(TP_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(TP_LEAN).length}`);
  for (const [short, gid] of Object.entries(TP_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* I. two unit arrows at 60°: the record weight Tr(ρP) of P = φφ*, ρ = ψψ* equals |⟨φ, ψ⟩|² */
  {
    const psi = [1, 0], phi = [Math.cos(60 * TP_DEG), Math.sin(60 * TP_DEG)];
    const P = [[phi[0] * phi[0], phi[0] * phi[1]], [phi[1] * phi[0], phi[1] * phi[1]]];
    const rho = [[1, 0], [0, 0]];
    const tr = rho[0][0] * P[0][0] + rho[0][1] * P[1][0] + rho[1][0] * P[0][1] + rho[1][1] * P[1][1];
    check(near(tr, 0.25) && near(Math.pow(phi[0] * psi[0] + phi[1] * psi[1], 2), 0.25), 'I: weight 1/4');
  }
  /* II. 9 × 5 = 45 = 9 + 36 */
  {
    const n2 = v => v[0] * v[0] + v[1] * v[1], dot = TP_U[0] * TP_V[0] + TP_U[1] * TP_V[1], ar = TP_U[0] * TP_V[1] - TP_U[1] * TP_V[0];
    check(n2(TP_U) === 9 && n2(TP_V) === 5 && dot === 3 && ar === 6 && 9 * 5 === 45 && dot * dot + ar * ar === 45, 'II: 45 = 9 + 36');
  }
  /* III. R_y(90°) = R_z(90°) R_x(90°) R_z(−90°), and e_x travels to −e_z */
  {
    const W3 = tpMul(tpRot('z', Math.PI / 2), tpMul(tpRot('x', Math.PI / 2), tpRot('z', -Math.PI / 2)));
    const Ry = tpRot('y', Math.PI / 2);
    check(W3.every((r, i) => r.every((x, j) => near(x, Ry[i][j]))), 'III: the three-letter word');
    const e = tpApp(Ry, [1, 0, 0]);
    check(near(e[0], 0) && near(e[1], 0) && near(e[2], -1), 'III: e_x goes to −e_z');
  }
  /* IV. the fixed CHSH operator Z⊗B0 + Z⊗B1 + X⊗B0 − X⊗B1, B0,1 = (Z ± X)/√2, on Φ⁺ and its top eigenvalue */
  {
    const Z = [[1, 0], [0, -1]], X = [[0, 1], [1, 0]], r2 = Math.SQRT2;
    const add = (A, B, s = 1) => A.map((r, i) => r.map((x, j) => x + s * B[i][j]));
    const sc = (A, s) => A.map(r => r.map(x => x * s));
    const kron = (A, B) => { const M = []; for (let i = 0; i < 4; i++) { M.push([]); for (let j = 0; j < 4; j++) M[i].push(A[i >> 1][j >> 1] * B[i & 1][j & 1]); } return M; };
    const B0 = sc(add(Z, X), 1 / r2), B1 = sc(add(Z, X, -1), 1 / r2);
    const O = add(add(add(kron(Z, B0), kron(Z, B1)), kron(X, B0)), kron(X, B1), -1);
    const bell = [1 / r2, 0, 0, 1 / r2];
    const ev = bell.reduce((s, x, i) => s + x * O[i].reduce((t, y, j) => t + y * bell[j], 0), 0);
    check(near(ev, 2 * r2), `IV: Bell expectation ${ev}`);
    const cos45 = Math.cos(45 * TP_DEG), cos135 = Math.cos(135 * TP_DEG);
    check(near(3 * cos45 - cos135, 2 * r2), 'IV: 3 cos 45° − cos 135° = 2√2');
    /* the largest eigenvalue, by power iteration on O + 4 (O is real symmetric) */
    let v = [1, 0.3, -0.2, 0.7];
    for (let k = 0; k < 400; k++) { const w = v.map((_, i) => O[i].reduce((t, y, j) => t + y * v[j], 0) + 4 * v[i]); const n = Math.hypot(...w); v = w.map(x => x / n); }
    const lam = v.reduce((s, x, i) => s + x * O[i].reduce((t, y, j) => t + y * v[j], 0), 0);
    check(near(lam, 2 * r2, 1e-7), `IV: top eigenvalue ${lam}`);
  }
  /* V. a form vanishing on the null cone */
  {
    const S = (t, x) => 3 * (t * t - x * x), T = (t, x) => t * t - 2 * x * x;
    check(S(1, 1) === 0 && S(1, -1) === 0 && S(2, 2) === 0 && S(1, 0) === 3 && T(1, 1) === -1, 'V: 3(t² − x²) and t² − 2x²');
  }
  /* VI. the iterates and the unique positive fixed point */
  {
    const want = [1, 2, 1.5, 5 / 3, 1.6, 1.625];
    check(want.every((x, k) => near(TP_GOLD[k], x)), 'VI: iterates');
    check(near(1 + 1 / TP_PHI, TP_PHI) && TP_PHI > 0, 'VI: φ is fixed');
    let sign = 0;
    for (let k = 1; k <= 20000; k++) { const x = k / 1000, s = Math.sign(1 + 1 / x - x); if (k > 1 && s !== sign) check(Math.abs(x - TP_PHI) < 2e-3, `VI: sign change at ${x}`); sign = s; }
  }
  /* VII. unit overlaps */
  {
    check(near(Math.cos(TP_ALPHA), 0.8) && Math.abs(TP_ALPHA / TP_DEG - 36.87) < 0.005, 'VII: 0.8 at 36.87°');
    for (let k = 0; k < 40; k++) {
      const t = 2 * Math.PI * rnd(k, 3), s = 2 * Math.PI * rnd(k, 5), a = [Math.cos(t), Math.sin(t)], b = [Math.cos(s), Math.sin(s)];
      const ip = a[0] * b[0] + a[1] * b[1];
      check((Math.abs(ip - 1) < 1e-12) === (Math.hypot(a[0] - b[0], a[1] - b[1]) < 1e-6), `VII: random unit pair ${k}`);
    }
  }
  /* VIII. six terms of exp(i) */
  {
    check(near(TP_EXP[6][0], 1 - 1 / 2 + 1 / 24) && near(TP_EXP[6][1], 1 - 1 / 6 + 1 / 120), 'VIII: partial sum');
    check(Math.abs(TP_MISS - 0.001378) < 5e-6 && TP_MISS <= TP_BOUND && Math.abs(TP_BOUND - 0.003775) < 5e-6, `VIII: miss ${TP_MISS} ≤ ${TP_BOUND}`);
    /* the same with the real series of cos and sin */
    let c = 0, s = 0, f = 1;
    for (let k = 0; k < 6; k++) { if (k) f *= k; if (k % 2 === 0) c += (k % 4 === 0 ? 1 : -1) / f; else s += (k % 4 === 1 ? 1 : -1) / f; }
    check(near(c, TP_EXP[6][0]) && near(s, TP_EXP[6][1]), 'VIII: by cos and sin');
  }
  /* IX. the table */
  {
    const d = [0, 1, 2].map(i => TP_G[i][i]), fd = d.map(tpF);
    check(d.join() === '0,0,1' && fd.join() === '2,2,1' && TP_G[2].join() === fd.join(), 'IX: row 2 is the twisted diagonal');
    check(tpF(TP_G[2][2]) === TP_G[2][2] && TP_G[2][2] === 1 && [0, 1, 2].filter(y => tpF(y) === y).join() === '1', 'IX: f(1) = 1, the only fixed point');
    check(TP_G[0].join() !== fd.join() && TP_G[1].join() !== fd.join(), 'IX: rows 0 and 1 escape');
  }
  /* X. the lift of a full turn under z ↦ z² */
  {
    for (let k = 0; k <= 64; k++) {
      const th = 2 * Math.PI * k / 64, up = th / 2, z = [Math.cos(up), Math.sin(up)];
      check(near(z[0] * z[0] - z[1] * z[1], Math.cos(th)) && near(2 * z[0] * z[1], Math.sin(th)), `X: square of the lift ${k}`);
    }
    check(near(Math.cos(Math.PI), -1) && near(Math.cos(2 * Math.PI), 1), 'X: one turn ends at −1, two at +1');
  }
  /* the coda: the marbles */
  {
    const counts = TP_RUN.map(r => r.length);
    check(counts.join() === '6,4,3,3,3', `coda: counts ${counts}`);
    check(TP_RUN.every((r, k) => !k || r.every(a => TP_RUN[k - 1].includes(a))), 'coda: U(A) ⊆ A');
    const changes = TP_RUN.slice(1).filter((r, k) => r.length !== TP_RUN[k].length).length;
    const N = TP_RUN.findIndex((r, k) => TP_RUN.slice(k).every(q => q.join() === r.join()));
    check(changes === 2 && N === 2 && N <= TP_S0.length && changes <= TP_S0.length, 'coda: N = 2, two changes');
    check(TP_RUN[1].join() === '1,2,3,5' && TP_RUN[2].join() === '1,2,3', 'coda: who leaves');
  }
});
Object.assign(FILM.speed, { arc: 0.02, first: 0.014, second: 0.014, stop: 0.012, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                 helpers                                   */
/* ======================================================================= */
const tpFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const tpNum = (v, n = 2) => (v < -0.5 * Math.pow(10, -n) ? '−' : '') + Math.abs(v).toFixed(n);
function tpRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, p[2] || fam, w), 0) / 2;
  for (const [s, col, f] of parts) { txt(s, cx, y, { size, fam: f || fam, w, c: col, a, ab: o.ab }); cx += tw(s, size, f || fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const TP_MISSING = new Set();
function tpLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!TP_MISSING.has(gid)) { TP_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 18, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
function tpPoly(pts, col, a, fill = 0.25, lw = 2.5, dash = null) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a;
  ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath();
  if (fill) { ctx.fillStyle = rgba(col, fill); ctx.fill(); }
  if (lw) { if (dash) ctx.setLineDash(dash); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); }
  ctx.restore();
}
function tpPath(pts, col, a, lw = 3, dash = null) {
  if (a <= 0.003 || pts.length < 2) return;
  ctx.save(); ctx.globalAlpha = a; if (dash) ctx.setLineDash(dash);
  ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke();
  ctx.restore();
}
function tpArcPath(cx, cy, r, a0, a1, col, a, lw = 2, dash = null) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; if (dash) ctx.setLineDash(dash);
  ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(cx, cy, r, a0, a1, a1 < a0); ctx.stroke(); ctx.restore();
}

/* the ten beads on one arc; cur: index of the current part (amber), or -1; o: y, lift, x0, x1, labels, a per bead */
function tpBeads(o = {}) {
  const x0 = o.x0 || 210, x1 = o.x1 || 1710, y = o.y || 270, lift = o.lift || 70;
  return TP_PARTS.map((_, k) => { const s = k / 9; return [lerp(x0, x1, s), y - lift * Math.sin(Math.PI * s)]; });
}
function tpArc(a, cur, o = {}) {
  if (a <= 0.003) return;
  const P = tpBeads(o), r = o.r || 13, lab = o.labels !== false, vis = o.vis || (() => 1);
  const pts = []; for (let i = 0; i <= 90; i++) { const s = i / 90; pts.push([lerp(P[0][0], P[9][0], s), (o.y || 270) - (o.lift || 70) * Math.sin(Math.PI * s)]); }
  tpPath(pts, o.arcCol || C.dim, a * 0.7, 2, o.dash || null);
  P.forEach((p, k) => {
    const v = a * vis(k);
    if (v <= 0.003) return;
    const isCur = k === cur, past = cur >= 0 && k < cur;
    const col = isCur ? C.now : past ? C.white : C.dim;
    if (isCur) ring(p[0], p[1], r + 9, C.now, v, 2.5);
    ctx.save(); ctx.globalAlpha = v; ctx.fillStyle = isCur ? C.now : rgba(col, past ? 0.85 : 0.35);
    ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, TAU); ctx.fill(); ctx.restore();
    txt(TP_PARTS[k][0], p[0], p[1] - r - 12, { size: o.rs || 20, fam: F.orb, w: 900, align: 'center', c: col, a: v });
    if (lab) {
      txt(TP_PARTS[k][1], p[0], p[1] + r + 30, { size: o.ls || 18, fam: F.mono, w: 700, align: 'center', c: col, a: v * 0.95 });
      txt(TP_PARTS[k][2], p[0], p[1] + r + 58, { size: (o.ls || 18) + 2, fam: F.zh, w: 700, align: 'center', c: col, a: v * 0.95 });
    }
  });
}

/* ======================================================================= */
/*                               scene 1 · ONE ARC                           */
/* ======================================================================= */
function tpTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 78, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('TEN PARTS, ONE ARC', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('AND WHY IT STOPS · THE CODA', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}
SCENES.arc = S => {
  const u = S.u;
  tpTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* line 0: the beads come in one by one; line 1: I–VI climb, VII–X turn back */
  const t0 = lineAt(S, 0).s;
  const vis = k => clamp((u - t0 - 0.25 * k) / 0.4);
  const climb = Q(S, 1, 'Point to line', 4.0), back = Q(S, 1, 'Later parts', 1.2);
  const cur = at(S, 2, 0.01) > 0 ? 0 : -1;
  tpArc(a, cur, { y: 560, lift: 170, x0: 220, x1: 1700, r: 16, rs: 24, ls: 20, vis });
  const P = tpBeads({ y: 560, lift: 170, x0: 220, x1: 1700 });
  /* the climb of I–VI: each icon is where the part arrives: line, area, sphere, two spheres, the spacetime sphere,
     the sphere beyond */
  for (let k = 0; k < 6; k++) {
    const ka = a * clamp(climb * 6 - k);
    if (ka <= 0.003) continue;
    const [x, y] = P[k], yy = y - 92;
    if (k === 0) line(x - 26, yy, x + 26, yy, C.cyan, ka, 4);
    if (k === 1) tpPoly([[x - 22, yy + 18], [x + 22, yy + 18], [x + 30, yy - 18], [x - 14, yy - 18]], C.mag, ka, 0.3, 2);
    if (k === 2) { ring(x, yy, 22, C.white, ka, 2); ctx.save(); ctx.globalAlpha = ka * 0.6; ctx.strokeStyle = C.white; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.ellipse(x, yy, 22, 7, 0, 0, TAU); ctx.stroke(); ctx.restore(); }
    if (k === 3) { ring(x - 12, yy, 15, C.white, ka, 2); ring(x + 12, yy, 15, C.white, ka, 2); }
    if (k === 4) { ring(x, yy, 22, C.white, ka, 2); line(x - 16, yy - 16, x + 16, yy + 16, C.cyan, ka, 2); line(x - 16, yy + 16, x + 16, yy - 16, C.cyan, ka, 2); }
    if (k === 5) { ring(x, yy, 14, C.white, ka, 2); ring(x, yy, 28, C.mag, ka, 2); arrow(x, yy, x, yy - 44, C.mag, ka, 2.5); }
  }
  /* VII–X: an arrow curling back toward the looker */
  if (back > 0.003) {
    const ba = a * back, p7 = P[6], p10 = P[9];
    ctx.save(); ctx.globalAlpha = ba; ctx.strokeStyle = C.argued; ctx.lineWidth = 2.5; ctx.setLineDash([8, 7]);
    ctx.beginPath(); ctx.moveTo(p7[0], p7[1] + 100); ctx.quadraticCurveTo((p7[0] + p10[0]) / 2, p7[1] + 230, p10[0], p10[1] + 100); ctx.stroke(); ctx.restore();
    dot(p10[0] + 70, p10[1] + 180, 14, 'v', ba);
    txt('the one who looks · 看的人', p10[0] + 40, p10[1] + 230, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.argued, a: ba });
  }
  const ra = a * clamp((u - t0 - 2.6) / 0.6);
  txt('a reading of the book · 全书的一种读法', W / 2, 820, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ra * 0.95 });
};

/* ======================================================================= */
/*                     the right-hand card of one stop                       */
/* ======================================================================= */
const CD = { x: 1030, y: 360, w: 780, h: 450 };
function tpCard(a, k, rows, gid, scope) {
  if (a <= 0.003) return;
  const [ro, en, zh] = TP_PARTS[k];
  panel(CD.x, CD.y, CD.w, CD.h, a, C.cyan, `PART ${ro} · ${en.toUpperCase()} · ${zh}`);
  let y = CD.y + 78;
  for (const rw of rows) {
    const ra = a * (rw.a == null ? 1 : rw.a);
    if (ra > 0.003) {
      if (rw.parts) tpRich(rw.parts, CD.x + 28, y, { size: rw.size || 28, a: ra });
      else txt(rw.s, CD.x + 28, y, { size: rw.size || 28, fam: rw.fam || F.math, w: 700, c: rw.c || C.white, a: ra });
    }
    y += rw.gap || 52;
  }
  const la = a * (scope.a == null ? 1 : scope.a);
  tpLean(CD.x + 28, CD.y + CD.h - 74, gid, la, { size: 17 });
  if (la > 0.003) txt(scope.s, CD.x + 28, CD.y + CD.h - 30, { size: 20, fam: F.zh, w: 700, c: C.lean, a: la });
}
/* the window of the stop spoken on line k of the scene: fade in at the line, out before the next one */
function tpWin(S, k) {
  const s0 = lineAt(S, k).s - 0.3, s1 = k + 1 < S.L.length ? lineAt(S, k + 1).s - 0.25 : S.d;
  return clamp((S.u - s0) / 0.4) * clamp((s1 - S.u) / 0.35);
}
/* progress through the stop's line, running 45% fast so that every card is complete well before the line ends */
const tpProg = (S, k, dur) => 1.45 * clamp((S.u - lineAt(S, k).s) / (dur || Math.max(0.5, lineAt(S, k).e - lineAt(S, k).s)));
function tpTag(s, x, y, col, a, size = 22) { txt(s, x, y, { size, fam: F.zh, w: 700, c: col, a }); }

/* ---------------- I · two arrows at 60° and the weight 1/4 ---------------- */
function stop1(S, a) {
  const O = [230, 790], R = 470, p = tpProg(S, 0);
  const th = 60 * TP_DEG, B = [O[0] + R * Math.cos(th), O[1] - R * Math.sin(th)], foot = [O[0] + R * 0.5, O[1]];
  arrow(O[0], O[1], O[0] + R, O[1], C.white, a, 5);
  arrow(O[0], O[1], B[0], B[1], C.now, a, 5);
  txt('ψ', O[0] + R + 14, O[1] + 10, { size: 34, fam: F.math, w: 700, c: C.white, a });
  txt('φ', B[0] + 12, B[1] - 8, { size: 34, fam: F.math, w: 700, c: C.now, a });
  tpArcPath(O[0], O[1], 70, 0, -th, C.white, a * 0.7, 1.5);
  txt('60°', O[0] + 84, O[1] - 26, { size: 24, fam: F.mono, w: 700, c: C.white, a: a * 0.9 });
  const la = a * clamp(p * 3 - 0.4);
  if (la > 0.003) {
    dashed(B[0], B[1], foot[0], foot[1], C.white, la * 0.5, 1.5);
    line(O[0], O[1], foot[0], foot[1], C.cyan, la, 9);
    txt('overlap 1/2 · 重叠', (O[0] + foot[0]) / 2, O[1] + 44, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: la });
  }
  /* the weight as a square: side 1/2 inside the unit square */
  const sa = a * clamp(p * 3 - 1.2), Q0 = [600, 370], side = 200;
  if (sa > 0.003) {
    box(Q0[0], Q0[1], side, side, C.white, sa * 0.6, 1.5);
    fillBox(Q0[0], Q0[1] + side / 2, side / 2, side / 2, C.cyan, sa * 0.55);
    box(Q0[0], Q0[1] + side / 2, side / 2, side / 2, C.cyan, sa, 2);
    txt('1/4', Q0[0] + side / 4, Q0[1] + side * 0.8, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: sa });
    txt('(1/2)²', Q0[0] + side + 18, Q0[1] + side * 0.8, { size: 26, fam: F.math, w: 700, c: C.cyan, a: sa });
  }
  tpCard(a, 0, [
    { parts: [['weight = |⟨φ, ψ⟩|²', C.white]], size: 32 },
    { parts: [['⟨φ, ψ⟩ = cos 60° = ', C.white], ['1/2', C.cyan]], a: clamp(p * 3 - 0.4) },
    { parts: [['weight = (1/2)² = ', C.white], ['1/4', C.cyan]], a: clamp(p * 3 - 1.2) },
    { s: 'two unit arrows, compared directly · 两支单位箭头直接比', fam: F.zh, size: 20, c: C.dim }
  ], TP_LEAN.rank_one_pure_state_modulus_square_reduction, { s: 'any rank-one record, any pure state · 任意秩一记录、任意纯态', a: clamp(p * 2 - 0.6) });
}
/* ---------------- II · line² + area² = |u|²|v|² ---------------- */
function stop2(S, a) {
  const O = [250, 790], k = 120, p = tpProg(S, 1);
  const P = v => [O[0] + k * v[0], O[1] - k * v[1]];
  for (let i = 0; i <= 5; i++) { line(O[0] + k * i, O[1] - 3 * k + 20, O[0] + k * i, O[1] + 6, C.dim, a * 0.25, 1); }
  for (let j = 0; j <= 3; j++) if (O[1] - k * j > 380) line(O[0] - 6, O[1] - k * j, O[0] + 5 * k, O[1] - k * j, C.dim, a * 0.25, 1);
  const pu = P(TP_U), pv = P(TP_V), puv = P([4, 2]), foot = P([1, 0]);
  tpPoly([O, pu, puv, pv], C.mag, a * clamp(p * 3 - 0.9), 0.25, 2);
  const la = a * clamp(p * 3 - 0.3);
  if (la > 0.003) { dashed(pv[0], pv[1], foot[0], foot[1], C.white, la * 0.5, 1.5); line(O[0], O[1], foot[0], foot[1], C.cyan, la, 9); }
  arrow(O[0], O[1], pu[0], pu[1], C.white, a, 5);
  arrow(O[0], O[1], pv[0], pv[1], C.now, a, 5);
  txt('u = (3, 0)', pu[0] + 10, pu[1] + 44, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a });
  txt('v = (1, 2)', pv[0] - 14, pv[1] - 14, { size: 26, fam: F.math, w: 700, align: 'right', c: C.now, a });
  txt('area 6 · 面积', (O[0] + puv[0]) / 2 + 30, (O[1] + puv[1]) / 2 + 8, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.mag, a: a * clamp(p * 3 - 0.9) });
  txt('line · 线', (O[0] + foot[0]) / 2, O[1] + 44, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: la });
  tpCard(a, 1, [
    { parts: [['|u|² |v|² = 9 × 5 = 45', C.white]], size: 30 },
    { parts: [['line²  (u·v)² = 3² = ', C.cyan], ['9', C.cyan]], a: clamp(p * 3 - 0.3) },
    { parts: [['area²  (3·2 − 0·1)² = ', C.mag], ['36', C.mag]], a: clamp(p * 3 - 0.9) },
    { parts: [['9 + 36 = 45', C.white]], a: clamp(p * 3 - 1.5) }
  ], TP_LEAN.lagrange_gram_identity, { s: 'any two lists of real numbers · 任意两组实数', a: clamp(p * 3 - 1.5) });
}
/* ---------------- III · two axes, a three-letter word ---------------- */
function tpView3(cx, cy, k) {
  const yaw = -0.62, el = 0.32, cw = Math.cos(yaw), sw = Math.sin(yaw), ce = Math.cos(el), se = Math.sin(el);
  return p => { const X = p[0] * cw - p[1] * sw, Y = p[0] * sw + p[1] * cw; return [cx + X * k, cy - (p[2] * ce + Y * se) * k]; };
}
function stop3(S, a) {
  const V = tpView3(520, 610, 230), p = tpProg(S, 2);
  ring(520, 610, 230, C.dim, a * 0.35, 1.5);
  const o = V([0, 0, 0]);
  for (const [e, l, col] of [[[1.35, 0, 0], 'b = x', C.vio], [[0, 1.3, 0], 'y', C.dim], [[0, 0, 1.35], 'a = z', C.vio]]) {
    const q = V(e), mq = V(e.map(x => -x));
    line(mq[0], mq[1], o[0], o[1], col, a * 0.45, col === C.dim ? 1.5 : 3);
    arrow(o[0], o[1], q[0], q[1], col, a, col === C.dim ? 2 : 4);
    txt(l, q[0] + 12, q[1] - 6, { size: 26, fam: F.math, w: 700, c: col, a });
  }
  /* e_x and e_y under R_z(−90°), then R_x(90°), then R_z(90°): e_x moves in turns 1, 2, e_y in turns 1, 3 */
  const ph = clamp(p * 1.25) * 3;
  const posOf = v0 => s => {
    let v = tpApp(tpRot('z', -Math.PI / 2 * clamp(s)), v0);
    if (s > 1) v = tpApp(tpRot('x', Math.PI / 2 * clamp(s - 1)), v);
    if (s > 2) v = tpApp(tpRot('z', Math.PI / 2 * clamp(s - 2)), v);
    return v;
  };
  const pos = posOf([1, 0, 0]), posY = posOf([0, 1, 0]), seg = [], segY = [];
  for (let i = 0; i <= 90; i++) { const s = ph * i / 90; seg.push(V(pos(s))); segY.push(V(posY(s))); }
  /* the direct turn R_y(90°): e_x to −e_z, dashed */
  const dir = []; for (let i = 0; i <= 40; i++) dir.push(V(tpApp(tpRot('y', Math.PI / 2 * i / 40), [1, 0, 0])));
  tpPath(dir, C.white, a * 0.5, 2, [6, 7]);
  tpPath(seg, C.now, a, 4);
  tpPath(segY, C.white, a * 0.9, 3);
  const pe = V(pos(ph)), py = V(posY(ph));
  dot(pe[0], pe[1], 13, 'g', a);
  dot(py[0], py[1], 11, 'w', a);
  txt('e_x', pe[0] - 16, pe[1] - 14, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.now, a });
  txt('e_y', py[0] - 14, py[1] + 30, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.white, a });
  const turn = Math.min(3, Math.floor(ph) + 1);
  if (ph > 0.02) txt(`turn ${turn} of 3 · 第 ${turn} 次`, 160, 360, { size: 24, fam: F.zh, w: 700, c: C.now, a });
  const s0 = V([1, 0, 0]), s1 = V([0, 0, -1]);
  txt('start', s0[0] + 14, s0[1] + 30, { size: 20, fam: F.mono, w: 700, c: C.white, a: a * 0.85 });
  txt('end', s1[0] + 16, s1[1] + 8, { size: 20, fam: F.mono, w: 700, c: C.white, a: a * 0.85 * clamp(ph - 1.6) });
  tpCard(a, 2, [
    { parts: [['R_y(90°) =', C.white]], size: 30 },
    { parts: [['R_z(90°) · R_x(90°) · R_z(−90°)', C.now]], size: 30, a: clamp(p * 2.5 - 0.2) },
    { s: 'three turns about only a and b · 只绕 a、b 转三次', fam: F.zh, size: 22, c: C.dim, a: clamp(p * 2.5 - 0.6) },
    { s: 'both e_x and e_y land where R_y(90°) sends them · 两个基向量都落到 R_y(90°) 的位置', fam: F.zh, size: 19, c: C.dim, a: clamp(p * 2.5 - 0.6) }
  ], TP_LEAN.two_axis_finite_word, { s: 'any rotation, any two non-parallel axes · 任意转动、任意两根不平行的轴', a: clamp(p * 2.5 - 1.2) });
}
/* ---------------- IV · CHSH on the Bell state ---------------- */
function stop4(S, a) {
  const O = [470, 680], R = 190, p = tpProg(S, 3);
  ring(O[0], O[1], R, C.dim, a * 0.5, 1.5);
  /* directions in the x–z plane, measured from +z (up) toward +x (right) */
  const dirs = [[0, 'A₀ = Z', C.white], [90, 'A₁ = X', C.white], [45, 'B₀', C.cyan], [-45, 'B₁', C.cyan]];
  dirs.forEach(([d, l, col], i) => {
    const da = a * clamp(p * 4 - 0.3 * i);
    const q = [O[0] + R * Math.sin(d * TP_DEG), O[1] - R * Math.cos(d * TP_DEG)];
    arrow(O[0], O[1], q[0], q[1], col, da, 4.5);
    txt(l, q[0] + (d < 0 ? -14 : d === 0 ? 18 : 14), q[1] + (d === 90 ? 34 : d === 0 ? 26 : -10), { size: 26, fam: F.math, w: 700, align: d < 0 ? 'right' : 'left', c: col, a: da });
  });
  txt('45°', O[0] + 30, O[1] - 90, { size: 22, fam: F.mono, w: 700, c: C.white, a: a * clamp(p * 4 - 1.2) });
  txt('Alice: white · Bob: cyan', 160, 450, { size: 20, fam: F.mono, w: 700, align: 'left', c: C.dim, a });
  /* a gauge 0 … 3 with the score */
  const gx = 160, gy = 350, gw = 640, sc = clamp(p * 2 - 0.7) * 2 * Math.SQRT2;
  box(gx, gy, gw, 26, C.white, a * 0.5, 1.2);
  fillBox(gx, gy, gw * sc / 3, 26, C.cyan, a * 0.55);
  for (const t of [0, 1, 2, 3]) txt(String(t), gx + gw * t / 3, gy - 10, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  txt(`score ${tpNum(sc, 3)}`, gx + gw * sc / 3 + 10, gy + 52, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: a * clamp(p * 2 - 0.7) });
  tpCard(a, 3, [
    { parts: [['S = A₀B₀ + A₀B₁ + A₁B₀ − A₁B₁', C.white]], size: 28 },
    { s: 'Bell state: each pair gives cos(angle) · 贝尔态：每对给出夹角余弦', fam: F.zh, size: 20, c: C.dim, a: clamp(p * 3 - 0.6) },
    { parts: [['= 3 cos 45° − cos 135° = ', C.white], ['2√2', C.cyan]], size: 28, a: clamp(p * 3 - 0.9) },
    { parts: [['≈ 2.828', C.cyan]], size: 28, a: clamp(p * 3 - 1.2) }
  ], TP_LEAN.bell_chsh_state_expectation_is_greatest, { s: 'these settings: max over all states = 2√2 · 全体态上最大值', a: clamp(p * 3 - 1.4) });
}
/* ---------------- V · the light cone fixes the form ---------------- */
function stop5(S, a) {
  const O = [520, 620], k = 200, p = tpProg(S, 4);
  const P = (x, t) => [O[0] + k * x, O[1] - k * t];
  arrow(O[0] - 1.6 * k, O[1], O[0] + 1.7 * k, O[1], C.dim, a, 2);
  arrow(O[0], O[1] + 1.15 * k, O[0], O[1] - 1.2 * k, C.dim, a, 2);
  txt('x', O[0] + 1.75 * k, O[1] + 8, { size: 26, fam: F.math, w: 700, c: C.dim, a });
  txt('t', O[0] - 30, O[1] - 1.2 * k + 10, { size: 26, fam: F.math, w: 700, c: C.dim, a });
  const ca = a * clamp(p * 3 - 0.2);
  for (const s of [1, -1]) { const q0 = P(-1.1 * s, -1.1), q1 = P(1.1 * s, 1.1); line(q0[0], q0[1], q1[0], q1[1], C.cyan, ca, 3.5); }
  txt('light · 光', P(-1.12, 1.12)[0] - 150, P(-1.12, 1.12)[1] - 6, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: ca });
  /* S = 3(t² − x²) = 3 on the hyperbola t² − x² = 1, zero on the light lines */
  const ha = a * clamp(p * 3 - 0.8);
  curve(s => { const r = lerp(-0.62, 0.62, s); return P(Math.sinh(r), Math.cosh(r)); }, 80, C.white, ha * 0.7, 2);
  txt('S = 3', P(-0.66, 1.2)[0] - 12, P(-0.66, 1.2)[1] + 8, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.white, a: ha * 0.8 });
  for (const [x, t, dx, dy] of [[0.85, 0.85, 20, 26], [-0.6, 0.6, 12, -10], [0.5, -0.5, 12, -10]]) { const q = P(x, t); dot(q[0], q[1], 9, 'c', ca); txt('S = 0', q[0] + dx, q[1] + dy, { size: 18, fam: F.mono, w: 700, c: C.cyan, a: ca }); }
  const q = P(0, 1);
  dot(q[0], q[1], 11, 'g', ha);
  txt('S(1, 0) = 3', q[0] + 40, q[1] - 86, { size: 22, fam: F.mono, w: 700, c: C.now, a: ha });
  tpCard(a, 4, [
    { s: 'S = 0 on every light ray ⟹', size: 28 },
    { parts: [['S = S(1, 0) · (t² − |x|²)', C.white]], size: 30, a: clamp(p * 3 - 0.3) },
    { parts: [['S = 3t² − 3x²: ', C.white], ['S(1, ±1) = 0, S(1, 0) = 3', C.cyan]], size: 24, a: clamp(p * 3 - 0.8) },
    { parts: [['t² − 2x²: (1, 1) ↦ −1 ≠ 0', C.mag]], size: 24, a: clamp(p * 3 - 1.3) }
  ], TP_LEAN.eq_smul_minkowski_of_null, { s: 'any real form, any space dimension · 任意实二次型、任意空间维数', a: clamp(p * 3 - 1.1) });
}

/* ---------------- VI · the golden fixed point ---------------- */
function stop6(S, a) {
  const p = tpProg(S, 0), x0 = 260, y0 = 820, k = 400, lo = 0.9;
  const P = (x, y) => [x0 + k * (x - lo), y0 - k * (y - lo)];
  arrow(P(lo, lo)[0], P(lo, lo)[1], P(2.15, lo)[0], P(2.15, lo)[1], C.dim, a, 2);
  arrow(P(lo, lo)[0], P(lo, lo)[1], P(lo, 2.15)[0], P(lo, 2.15)[1], C.dim, a, 2);
  for (const t of [1, 1.5, 2]) { const q = P(t, lo); txt(String(t), q[0], q[1] + 30, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a }); }
  tpPath([P(lo, lo), P(2.1, 2.1)], C.white, a * 0.5, 2, [6, 6]);
  txt('y = x', P(2.1, 2.1)[0] + 8, P(2.1, 2.1)[1] - 6, { size: 20, fam: F.math, w: 700, c: C.dim, a });
  curve(s => { const x = lerp(0.9, 2.1, s); return P(x, Math.min(2.12, 1 + 1 / x)); }, 120, C.cyan, a, 3.5);
  txt('y = 1 + 1/x', P(1.62, 1.3)[0], P(1.62, 1.3)[1] + 6, { size: 22, fam: F.math, w: 700, c: C.cyan, a });
  /* the cobweb */
  const n = clamp(p * 1.3) * 5, pts = [P(TP_GOLD[0], lo)];
  for (let i = 0; i < 5; i++) {
    const f = clamp(n - i); if (f <= 0) break;
    const x = TP_GOLD[i], y = TP_GOLD[i + 1];
    pts.push(P(x, lerp(i ? x : lo, y, clamp(f * 2))));
    if (f > 0.5) pts.push(P(lerp(x, y, clamp(f * 2 - 1)), y));
  }
  tpPath(pts, C.now, a, 3);
  const fp = P(TP_PHI, TP_PHI);
  ring(fp[0], fp[1], 12, C.white, a * clamp(p * 2 - 1), 2.5);
  txt('φ ≈ 1.618', fp[0] + 22, fp[1] + 40, { size: 26, fam: F.math, w: 700, align: 'left', c: C.white, a: a * clamp(p * 2 - 1) });
  const show = TP_GOLD.map((x, i) => (i === 3 ? '1.667' : String(+x.toFixed(3)))).slice(0, 1 + Math.floor(n + 0.5)).join(' → ');
  tpCard(a, 5, [
    { parts: [['x ↦ 1 + 1/x', C.white]], size: 32 },
    { parts: [[show, C.cyan]], size: 24, a: clamp(p * 4) },
    { s: 'iterates computed here, not the theorem · 迭代为屏幕计算，非定理内容', fam: F.zh, size: 19, c: C.dim, a: clamp(p * 4) },
    { parts: [['only positive fixed point: φ = (1 + √5)/2', C.white]], size: 25, a: clamp(p * 2 - 1) }
  ], TP_LEAN.golden_fixed_point_unique, { s: 'unique among all positive reals · 在全体正实数中唯一', a: clamp(p * 2 - 1) });
}
/* ---------------- VII · unit records ---------------- */
function stop7(S, a) {
  const O = [230, 760], R = 520, p = tpProg(S, 1);
  const ang = TP_ALPHA * (1 - ease(clamp(p * 1.6 - 0.45)));
  const A = [O[0] + R, O[1]], B = [O[0] + R * Math.cos(ang), O[1] - R * Math.sin(ang)], foot = [O[0] + R * Math.cos(ang), O[1]];
  dashed(B[0], B[1], foot[0], foot[1], C.white, a * 0.4, 1.5);
  line(O[0], O[1], foot[0], foot[1], C.cyan, a, 9);
  arrow(O[0], O[1], A[0], A[1], C.white, a, 5);
  arrow(O[0], O[1], B[0], B[1], C.now, a, 5);
  txt('r₁', A[0] + 14, A[1] + 10, { size: 30, fam: F.math, w: 700, c: C.white, a });
  txt('r₂', B[0] + 12, B[1] - 14, { size: 30, fam: F.math, w: 700, c: C.now, a });
  const ov = Math.cos(ang);
  txt(`overlap ${tpNum(ov)} · 重叠`, O[0] + R * 0.45, O[1] + 46, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.cyan, a });
  txt(`${tpNum(ang / TP_DEG, 1)}°`, O[0] + 110, O[1] - 30, { size: 22, fam: F.mono, w: 700, c: C.white, a: a * clamp(ang / (5 * TP_DEG)) });
  const same = clamp((1 - ang / TP_ALPHA) * 20 - 19);
  if (same > 0.003) txt('the same record · 同一条记录', O[0] + R * 0.6, O[1] - 80, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.now, a: a * same });
  tpCard(a, 6, [
    { parts: [['⟨r₁, r₂⟩ = 1  ⟺  r₁ = r₂', C.white]], size: 32 },
    { s: '|r₁| = |r₂| = 1 · 单位记录', fam: F.zh, size: 22, c: C.dim },
    { parts: [['now: ⟨r₁, r₂⟩ = ', C.white], [tpNum(ov), C.cyan]], size: 28 },
    { s: '"same record" is an equivalence · “同一条记录”是等价关系', fam: F.zh, size: 21, c: C.white, a: clamp(p * 2 - 0.8) }
  ], TP_LEAN.unit_gram_overlap_characterization, { s: 'any family of unit records · 任意一族单位记录', a: clamp(p * 2 - 0.6) });
}
/* ---------------- VIII · six terms of exp(i) ---------------- */
function stop8(S, a) {
  const O = [210, 790], R = 470, p = tpProg(S, 2);
  const P = z => [O[0] + R * z[0], O[1] - R * z[1]];
  arrow(O[0] - 10, O[1], O[0] + 1.15 * R, O[1], C.dim, a, 1.5);
  arrow(O[0], O[1] + 10, O[0], O[1] - 1.05 * R, C.dim, a, 1.5);
  tpArcPath(O[0], O[1], R, 0, -1.45, C.white, a * 0.7, 2);
  const ei = P(TP_EI);
  ring(ei[0], ei[1], 10, C.white, a, 2.5);
  txt('eⁱ', ei[0] - 20, ei[1] + 34, { size: 30, fam: F.math, w: 700, align: 'right', c: C.white, a });
  /* the polygon of partial sums */
  const n = clamp(p * 1.4) * 6, pts = [P(TP_EXP[0])];
  for (let i = 0; i < 6; i++) { const f = clamp(n - i); if (f <= 0) break; pts.push(P([lerp(TP_EXP[i][0], TP_EXP[i + 1][0], f), lerp(TP_EXP[i][1], TP_EXP[i + 1][1], f)])); }
  tpPath(pts, C.cyan, a, 4);
  const end = pts[pts.length - 1];
  dot(end[0], end[1], 9, 'g', a);
  const labs = ['1', 'i', '−1/2', '−i/6', '1/24', 'i/120'];
  for (let i = 0; i < 4; i++) {
    const la = a * clamp(n - i);
    const m = P([(TP_EXP[i][0] + TP_EXP[i + 1][0]) / 2, (TP_EXP[i][1] + TP_EXP[i + 1][1]) / 2]);
    txt(labs[i], m[0] + (i % 2 ? 14 : 0), m[1] + (i % 2 ? 6 : 34), { size: 22, fam: F.math, w: 700, align: i % 2 ? 'left' : 'center', c: C.cyan, a: la });
  }
  /* an inset, magnified 150 times around e^{i} */
  const ia = a * clamp(n - 5.2);
  if (ia > 0.003) {
    const cx = 820, cy = 430, mag = 150 * R, sz = 140;
    box(cx - sz, cy - sz, 2 * sz, 2 * sz, C.white, ia * 0.6, 1.2);
    const Pm = z => [cx + mag * (z[0] - TP_EI[0]) - 40, cy - mag * (z[1] - TP_EI[1])];
    const e = Pm(TP_EI), s6 = Pm(TP_EXP[6]);
    ring(e[0], e[1], 10, C.white, ia, 2.5);
    dot(s6[0], s6[1], 10, 'g', ia);
    dashed(e[0], e[1], s6[0], s6[1], C.cyan, ia, 2);
    txt('× 150', cx - sz + 10, cy - sz + 26, { size: 18, fam: F.mono, w: 700, c: C.dim, a: ia });
    txt(`miss ${TP_MISS.toFixed(4)}`, cx, cy + sz - 16, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ia });
    line(ei[0] + 12, ei[1] - 4, cx - sz, cy + 40, C.white, ia * 0.4, 1);
  }
  tpCard(a, 7, [
    { parts: [['eⁱ = 0.5403 + 0.8415 i', C.white]], size: 28 },
    { parts: [['1 + i − 1/2 − i/6 + 1/24 + i/120', C.cyan]], size: 26, a: clamp(p * 2) },
    { parts: [['= 0.5417 + 0.8417 i   miss ', C.white], [TP_MISS.toFixed(4), C.cyan]], size: 26, a: clamp(p * 2 - 0.8) },
    { parts: [['≤ 1⁶/6! · e¹ = e/720 ≈ ', C.white], [TP_BOUND.toFixed(4), C.cyan]], size: 26, a: clamp(p * 2 - 1.0) }
  ], TP_LEAN.exp_tail_le, { s: 'any n, any |z| ≤ r, in any complete normed algebra · 任意阶、任意 |z| ≤ r', a: clamp(p * 2 - 1.0) });
}
/* ---------------- IX · the table that lists itself ---------------- */
function stop9(S, a) {
  const x0 = 290, y0 = 400, c = 112, p = tpProg(S, 3);
  for (let j = 0; j < 3; j++) txt(`col ${j}`, x0 + c * j + c / 2, y0 - 16, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  const hi = clamp(p * 3 - 1.4);
  for (let i = 0; i < 3; i++) {
    txt(`row ${i}`, x0 - 18, y0 + c * i + c / 2 + 8, { size: 20, fam: F.mono, w: 700, align: 'right', c: i === 2 ? mix(C.dim, C.now, hi) : C.dim, a });
    for (let j = 0; j < 3; j++) {
      const diag = i === j, X = x0 + c * j, Y = y0 + c * i;
      box(X, Y, c, c, C.white, a * 0.35, 1.2);
      if (diag) box(X + 4, Y + 4, c - 8, c - 8, C.cyan, a * clamp(p * 4), 3);
      const isFix = i === 2 && j === 2;
      txt(String(TP_G[i][j]), X + c / 2, Y + c / 2 + 14, { size: 40, fam: F.mono, w: 700, align: 'center', c: isFix && hi > 0.5 ? C.now : C.white, a });
    }
  }
  if (hi > 0.003) box(x0 - 4, y0 + 2 * c - 4, 3 * c + 8, c + 8, C.now, a * hi, 3);
  /* the diagonal and its twist, under the table */
  const da = a * clamp(p * 4), fa = a * clamp(p * 3 - 0.7);
  const yb = y0 + 3 * c + 56;
  tpRich([['diagonal  (0, 0, 1)', C.cyan]], x0 - 40, yb, { size: 26, a: da });
  tpRich([['twisted f(d) = (2, 2, 1)', C.mag]], x0 - 40, yb + 44, { size: 26, a: fa });
  txt('= row 2', x0 + 330, yb + 44, { size: 26, fam: F.math, w: 700, c: C.now, a: a * hi });
  tpCard(a, 8, [
    { parts: [['twist  f(y) = 2 − y', C.white]], size: 30 },
    { parts: [['row 2 = f(diagonal) = (2, 2, 1)', C.white]], size: 26, a: hi },
    { parts: [['⟹ f(g₂₂) = g₂₂ :  f(1) = ', C.white], ['1', C.now]], size: 28, a: clamp(p * 3 - 1.8) },
    { s: 'rows 0, 1 ≠ f(d) · 0、1 行与 f(d) 不同', fam: F.zh, size: 20, c: C.dim, a: clamp(p * 3 - 2) }
  ], TP_LEAN.diagonal_landing_fixed, { s: 'any table, any twist f · 任意表格、任意扭法 f', a: clamp(p * 3 - 1.8) });
}
/* ---------------- X · one turn below, half a turn above ---------------- */
function stop10(S, a) {
  const p = tpProg(S, 4), Bc = [270, 620], Uc = [790, 620], R = 160;
  const th = TAU * ease(clamp(p * 1.25 - 0.1));
  ring(Bc[0], Bc[1], R, C.white, a * 0.6, 2);
  ring(Uc[0], Uc[1], R, C.white, a * 0.6, 2);
  txt('below · 下面', Bc[0], Bc[1] + R + 48, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
  txt('above · 上面', Uc[0], Uc[1] + R + 48, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
  arrow(Uc[0] - R - 20, Uc[1] - R - 10, Bc[0] + R + 20, Bc[1] - R - 10, C.vio, a, 2.5);
  txt('z ↦ z²', (Bc[0] + Uc[0]) / 2, Bc[1] - R - 26, { size: 26, fam: F.math, w: 700, align: 'center', c: C.vio, a });
  /* the trails */
  tpArcPath(Bc[0], Bc[1], R, 0, -th, C.now, a, 5);
  tpArcPath(Uc[0], Uc[1], R, 0, -th / 2, C.now, a, 5);
  const pb = [Bc[0] + R * Math.cos(th), Bc[1] - R * Math.sin(th)], pu = [Uc[0] + R * Math.cos(th / 2), Uc[1] - R * Math.sin(th / 2)];
  dot(pb[0], pb[1], 13, 'g', a); dot(pu[0], pu[1], 13, 'g', a);
  txt('1', Bc[0] + R + 16, Bc[1] + 8, { size: 24, fam: F.math, w: 700, c: C.white, a });
  txt('1', Uc[0] + R + 16, Uc[1] + 8, { size: 24, fam: F.math, w: 700, c: C.white, a });
  txt('−1', Uc[0] - R - 16, Uc[1] + 8, { size: 24, fam: F.math, w: 700, align: 'right', c: C.white, a });
  txt(`${Math.round(th / TP_DEG)}°`, Bc[0], Bc[1] + 10, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.now, a });
  txt(`${Math.round(th / 2 / TP_DEG)}°`, Uc[0], Uc[1] + 10, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.now, a });
  tpCard(a, 9, [
    { parts: [['one turn below: 1 → 1', C.white]], size: 28 },
    { parts: [['its lift above: 1 → ', C.white], ['−1', C.now]], size: 28, a: clamp(p * 1.25 - 0.9) },
    { s: 'no continuous √ on the whole circle · 整圆上没有连续的平方根', fam: F.zh, size: 20, c: C.dim, a: clamp(p * 2 - 0.8) },
    { s: 'a second turn: −1 → 1, so 720° (hand step · 手工推导)', fam: F.zh, size: 20, c: C.dim, a: clamp(p * 2 - 1.2) }
  ], TP_LEAN.circle_double_cover_history_lift, { s: 'the lift is unique once its start is chosen · 起点定了，提升唯一', a: clamp(p * 1.25 - 0.9) });
}

function tpStops(S, list, base) {
  const a = tpFade(S);
  if (a <= 0) return;
  let cur = 0;
  for (let k = 0; k < list.length; k++) if (S.u >= lineAt(S, k).s - 0.3) cur = k;
  /* the badge: NUM while the stop's numbers are worked, LEAN ✓ once its theorem card is up (the last 45% of the line) */
  const L = lineAt(S, cur), turn = L.s + 0.55 * (L.e - L.s), kind = S.u < turn ? 'computed' : 'lean';
  const since = S.u < turn ? Math.max(0, L.s - 0.3) : turn;
  badge(clamp((S.u - since) / 0.4) * clamp(S.u / 0.8) * clamp((S.d - S.u) / 0.5), kind);
  tpArc(a, base + cur, { y: 262, lift: 54, x0: 230, x1: 1690, r: 11, rs: 18, labels: false });
  for (let k = 0; k < list.length; k++) { const w = a * tpWin(S, k); if (w > 0.003) list[k](S, w); }
}
SCENES.first = S => tpStops(S, [stop1, stop2, stop3, stop4, stop5], 0);
SCENES.second = S => tpStops(S, [stop6, stop7, stop8, stop9, stop10], 5);

/* ======================================================================= */
/*                             scene 4 · WHERE IT STOPS                      */
/* ======================================================================= */
/* the round shown at time u: 0 before "four", 1 after it, 2 after "three, three", 3 after "three. Two" */
function tpRound(S) {
  return (S.u >= phraseAt(S, 2, 'four') ? 1 : 0) + (S.u >= phraseAt(S, 2, 'three, three') ? 1 : 0) + (S.u >= phraseAt(S, 2, 'three. Two') ? 1 : 0);
}
const TP_BAG = { c: [400, 470], r: 200 };
const tpSlot = (m, i) => { const ang = -Math.PI / 2 + TAU * i / 6; return [TP_BAG.c[0] + 110 * Math.cos(ang), TP_BAG.c[1] + 110 * Math.sin(ang)]; };
SCENES.stop = S => {
  const u = S.u, a = tpFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [3, 'Lean checks', 'lean'], [4, null, 'argued']]);
  /* line 0: the arc ends, and no grand finale is waiting after bead X */
  const qa = a * at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (qa > 0.003) {
    tpArc(qa, 9, { y: 560, lift: 150, x0: 260, x1: 1300, r: 12, rs: 18, labels: false });
    const fx = 1560, fy = 470;
    txt('GRAND FINALE?', fx, fy, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.argued, a: qa });
    txt('宏大结局？', fx, fy + 56, { size: 34, fam: F.zh, w: 900, align: 'center', c: C.argued, a: qa });
    const sa = qa * Q(S, 0, 'Shrinking', 0.5);
    line(fx - 200, fy + 20, fx + 200, fy - 10, C.white, sa, 4);
    txt('shrinking needs none · 只会缩小的，不需要', fx, fy + 140, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: sa });
  }
  const ba = a * at(S, 1, 0.6);
  /* the bag */
  if (ba > 0.003) {
    ctx.save(); ctx.globalAlpha = ba; ctx.strokeStyle = C.white; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(TP_BAG.c[0], TP_BAG.c[1], TP_BAG.r, -Math.PI * 0.38, Math.PI * 1.38); ctx.stroke(); ctx.restore();
    txt('bag · 袋', TP_BAG.c[0] + TP_BAG.r + 20, TP_BAG.c[1] + TP_BAG.r - 30, { size: 22, fam: F.zh, w: 700, align: 'left', c: C.dim, a: ba });
    const round = tpRound(S);
    const leaveT = [phraseAt(S, 2, 'four'), phraseAt(S, 2, 'three, three')];
    TP_S0.forEach((m, i) => {
      const p0 = tpSlot(m, i);
      let x = p0[0], y = p0[1], col = 'c', ma = ba;
      /* who leaves in which round */
      const r = !TP_RUN[1].includes(m) ? 0 : !TP_RUN[2].includes(m) ? 1 : -1;
      if (r >= 0) {
        const f = ease(clamp((u - leaveT[r]) / 1.0));
        if (u >= leaveT[r]) { x = lerp(p0[0], p0[0] + 60, f); y = lerp(p0[1], TP_BAG.c[1] - TP_BAG.r - 120, f); col = 'm'; ma = ba * (1 - f); }
      }
      dot(x, y, 30, col, ma);
      txt(String(m), x, y + 11, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.bg, a: ma });
    });
    /* the rule */
    const rule = a * Q(S, 1, 'every marble', 0.6);
    panel(1000, 190, 820, 200, rule, C.cyan, 'THE RULE · 规则');
    tpRich([['keep a marble only if  number ≤ count', C.white]], 1028, 262, { size: 28, a: rule });
    tpRich([['编号 ≤ 袋中颗数 才留下；只删不添', C.white, F.zh]], 1028, 312, { size: 26, a: rule });
    tpRich([['U(A) = { a ∈ A : a ≤ |A| } ⊆ A', C.cyan]], 1028, 360, { size: 26, a: rule });
    /* the staircase: count per round */
    const ch = { x: 150, y: 690, w: 620, h: 120 };
    const sa = a * Q(S, 2, 'Six', 0.6);
    if (sa > 0.003) {
      line(ch.x, ch.y + ch.h, ch.x + ch.w, ch.y + ch.h, C.dim, sa, 1.5);
      const cnt = TP_RUN.map(q => q.length), shown = Math.min(4, round + 1);
      for (let k = 0; k < 4; k++) {
        const x = ch.x + 20 + k * 150, hh = ch.h * cnt[k] / 6;
        const ka = sa * (k < shown ? 1 : 0.0);
        if (ka <= 0.003) continue;
        fillBox(x, ch.y + ch.h - hh, 110, hh, C.cyan, ka * 0.45); box(x, ch.y + ch.h - hh, 110, hh, C.cyan, ka, 1.5);
        txt(String(cnt[k]), x + 55, ch.y + ch.h - hh - 10, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: ka });
        txt(`S(${k})`, x + 55, ch.y + ch.h + 30, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ka });
      }
    }
  }
  /* line 3: Lean */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1000, 420, 820, 330, la, C.lean, 'ANY FINITE SET · 任意有限集合');
    tpRich([['U(A) ⊆ A,  S(n+1) = U(S(n))  ⟹', C.white]], 1028, 492, { size: 26, a: la });
    tpRich([['∃ N ≤ |S(0)| :  S(n) = S(N) for n ≥ N', C.white]], 1028, 540, { size: 26, a: la * Q(S, 3, 'stops within', 0.5) });
    tpRich([['#{ n : S(n+1) ≠ S(n) } ≤ |S(0)|', C.white]], 1028, 588, { size: 26, a: la * Q(S, 3, 'stops within', 0.5, 0.6) });
    tpLean(1028, 646, TP_LEAN.finite_contracting_updates_stabilize, la, { size: 17 });
    tpRich([['here · 这里：N = 2 ≤ 6，changes · 改变 2 ≤ 6', C.cyan, F.zh]], 1028, 712, { size: 24, a: la * Q(S, 3, 'stops within', 0.5, 1.0) });
  }
  /* the end state is not empty */
  const ea = a * Q(S, 2, 'still', 0.6);
  txt('stopped, not empty · 停下，不是清空', TP_BAG.c[0], TP_BAG.c[1] - TP_BAG.r - 30, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.now, a: ea * (1 - at(S, 4, 0.4)) });
  /* line 4: the maxim */
  const ma = a * at(S, 4, 0.5);
  if (ma > 0.003) {
    fillBox(0, 770, W, 110, C.bg, ma * 0.85);
    txt('Take only from a finite bag, and it must come to rest.', W / 2, 818, { size: 40, fam: F.disp, w: 700, align: 'center', c: C.white, a: ma, ab: 2 });
    txt('有限的袋子只拿不放，终将停下。', W / 2, 866, { size: 34, fam: F.zh, w: 900, align: 'center', c: C.argued, a: ma });
  }
};

/* ======================================================================= */
/*                          scene 5 · WHAT IT DOES NOT SAY                   */
/* ======================================================================= */
SCENES.edge = S => {
  const a = tpFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, null, 'open']]);
  /* the ten beads, the road between them dashed purple: a reading */
  tpArc(a, -1, { y: 560, lift: 150, x0: 150, x1: 790, r: 10, rs: 16, labels: false, arcCol: C.argued, dash: [8, 7] });
  txt('the road: a reading · 路：一种读法', 470, 660, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.argued, a });
  txt('each stop: one LEAN ✓ · 每一站：一条 LEAN ✓', 470, 702, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.lean, a });
  const rows = [
    { k: 0, col: C.argued, en: 'the arc through ten parts', zh: '贯穿十部的弧：一种读法，不是定理', note: 'argued · 诠释' },
    { k: 1, col: C.argued, en: 'cos θ = θ: Banach contraction', zh: '停下不等于清空；余弦不动点另有来路', note: 'literature result, not formalized here · 文献结果，本书未形式化' },
    { k: 2, col: C.open, en: 'P ≠ NP · 3D Navier–Stokes smoothness', zh: 'P 与 NP、三维纳维—斯托克斯光滑性', note: 'OPEN · 开放问题' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 200 + i * 210;
    panel(900, y, 920, 180, ra, rw.col);
    txt(rw.en, 930, y + 58, { size: 30, fam: F.math, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 930, y + 104, { size: 28, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 930, y + 148, { size: 20, fam: F.zh, w: 700, c: rw.col, a: ra * 0.95 });
  });
};

/* ======================================================================= */
/*                                scene 6 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  const from = 0.1, a = clamp((S.u - from) / 1.0) * clamp((S.d - S.u) / 1.2);
  if (a <= 0) return;
  const b = DATA.book, f = DATA.film, cx = W / 2;
  drawHyper(CUBE4, [[0, 3, S.t * 0.21], [1, 2, S.t * 0.13], [2, 3, S.t * 0.17]], { scale: 1.0, a: 0.25 * a, cx, cy: 250, camZ: 7, lw: 1.3, dots: false });
  txt(b.code, cx, 210, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a, ls: 10 });
  txt(b.title.zh, cx, 286, { size: 60, fam: F.zh, w: 900, align: 'center', c: C.white, a, ab: 3 });
  txt(b.title.en, cx, 340, { size: 32, fam: F.disp, w: 700, align: 'center', c: C.white, a: a * 0.92, ls: 2 });
  const p2 = clamp((S.u - from - 0.8) / 0.8) * a;
  txt(f.title.toUpperCase(), cx, 398, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: p2, ls: 3 });
  txt(f.title_zh, cx, 436, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: p2 * 0.85 });
  /* the eleven citations in two columns */
  const p3 = clamp((S.u - from - 1.6) / 0.8) * a;
  if (p3 > 0.003) {
    const list = DATA.lean.filter(z => z.kind === 'theorem'), size = 20;
    list.forEach((r, i) => {
      const col = i < 6 ? 0 : 1, row = i < 6 ? i : i - 6;
      const x = col ? 1000 : 150, y = 500 + row * 46;
      const head = STR.en.lean || 'LEAN ✓', wh = tw(head, size * 0.78, F.mono, 700, 1) + 16;
      fillBox(x, y - size, wh, size * 1.35, C.lean, p3 * 0.95);
      txt(head, x + 8, y - size * 0.1, { size: size * 0.78, fam: F.mono, w: 700, c: C.bg, a: p3, ls: 1 });
      txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a: p3 });
    });
  }
  const pin = DATA.pin || {};
  if (pin.commit) txt(`github.com/${pin.repo} @ ${pin.commit.slice(0, 12)}`, cx, 800, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: p3, ls: 1 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[0], t = sc.end - 1.0;
  background(t, sc, 0, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.12, cx: 960, cy: 420, camZ: 7, lw: 1.3, dots: false });
  tpArc(1, 9, { y: 880, lift: 290, x0: 200, x1: 1720, r: 18, rs: 26, ls: 20 });
  txt(DATA.film.title_zh, W / 2, 300, { size: 74, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('TEN PARTS, ONE ARC', W / 2, 395, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('AND WHY IT STOPS', W / 2, 455, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 4 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM · THE CODA`, W / 2, 520, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
