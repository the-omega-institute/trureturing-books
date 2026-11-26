/* Film · Folding the Mixing Matrix · 折出混合矩阵
   (book omega-unification, chapter 8). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     lock     the 19 non-negative integer points of x² + y² + z² = 867, seen down the (1, 1, 1) axis; the coordinate
              cycle P(x, y, z) = (y, z, x) turns them by a third of a turn, fixes (17, 17, 17) and has six orbits of
              three (computed, Definition def-ou-ch08-cyclic-rotation); if H_u and H_d both commute with T the CKM
              matrix is a permutation times phases (the chapter's written argument, ARGUED).
     floor    distinct cube roots of unity are √3 apart (computed) so ‖[T, X]‖ = √3 ‖X − E(X)‖; with |V_cb| > 0.035,
              |V_tb| > 0.98 (0.035 × 0.98 = 0.0343, computed) the chapter's five-line derivation gives
              ‖[A, B]‖ > 0.0479 and max ‖[T, X]‖ > 0.0414 (Example ex-ou-ch08-commutator-floor, ARGUED; the product
              0.0479 · √3/2 = 0.04148… is computed).
     walls    the chapter's obstruction atlas (§8.2 table, interval certificates, NUM): m_c/m_t > 0.0272 vs 0.00361;
              m_t/m_b < 2.690 on #11431 and < 30 on all 1238 zeros vs > 40; m_u/m_ℓ < 3.34 vs 84.98; three-leg
              transport: heavy block > 16.63, vacuum coefficient > 3.45 × 10³⁴ GeV², three zeros < 98.7 %; minimal
              support ≥ 8 sites (m_t/m_b), ≥ 16 sites (stationarity). Numbers copied verbatim from the chapter.
     cayley   worked example s = (1/3, 2/3, 2/3): the standard Cayley form ((1 − |s|²) I + 2ssᵀ + 2[s]×)/(1 + |s|²)
              is (1/9)[[1, −4, 8], [8, 4, 1], [−4, 7, 4]], a 90° turn about (1, 2, 2)/3 (computed, re-checked by
              Rodrigues) ..... OmegaCayleyRotation.cayley_orthogonal (LEAN): Cayley(s)ᵀ Cayley(s) ≡ I for every
              s : RatVec3; OmegaCayleyRotation.ad_hom (LEAN): Ad(pq) v ≡ Ad p (Ad q v) for nonzero p, q.
     gram     A = [(2, 0), (1, 2)], B = U A with U the rational rotation (3/5, 4/5): both Gram matrices are
              [[4, 2], [2, 5]] (computed) ..... GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq
              (LEAN): Bᴴ B = Aᴴ A ⇒ ∃ unitary U, B = U A. Dimension floors 42 / 48 / 45 per side (§8.3, the
              chapter's replay results, ARGUED).
     calib    §8.4: mirror triangle (28325, 48067, 58214) needs exactly 28 windings (baseline 42); (I + T¹⁶)⁻¹ matches
              all seven triple-window zeros to 10⁻¹¹ with leakage < 1.70 × 10⁻³⁰, strengths calibrated on #28325
              (NUM certificates; calibration in amber = the chosen input); rigidity ladder 2 / 5 / 7 zeros (Remark
              rem-ou-ch08-rigidity-ladder, NUM); "a spectral operator, not a constant" is the chapter's reading (ARGUED).
     horizon  Problem prob-ou-ch08-common-flavor-law (OPEN).

   On load, FILM.init checks DATA.lean against the three theorems and re-derives every computed number on screen by
   an independent route. Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const FM_LEAN = {
  cayley_orthogonal: ['D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.cayley_orthogonal', 'cayley_orthogonal'],
  ad_hom: ['D5/S3/Quantum/AURICOmega/OmegaCayleyRotation.ad_hom', 'ad_hom'],
  gram: ['D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq', 'exists_unitary_mul_eq_of_conjTranspose_mul_eq']
};
const FM_DEG = Math.PI / 180;

/* LOCK: the 19-point shell, the cycle, the view down (1, 1, 1) */
const LK_R2 = 867;
const LK_PTS = [];
for (let x = 0; x * x <= LK_R2; x++) for (let y = 0; x * x + y * y <= LK_R2; y++) {
  const z2 = LK_R2 - x * x - y * y, z = Math.round(Math.sqrt(z2));
  if (z * z === z2) LK_PTS.push([x, y, z]);
}
const lkCyc = p => [p[1], p[2], p[0]];
const lkKey = p => p.join(',');
const LK_E1 = [1 / Math.SQRT2, -1 / Math.SQRT2, 0], LK_E2 = [1 / Math.sqrt(6), 1 / Math.sqrt(6), -2 / Math.sqrt(6)];
const lkUV = p => { const n = Math.sqrt(LK_R2); return [(p[0] * LK_E1[0] + p[1] * LK_E1[1] + p[2] * LK_E1[2]) / n, (p[0] * LK_E2[0] + p[1] * LK_E2[1] + p[2] * LK_E2[2]) / n]; };
/* orbits: lists of three points closed under the cycle (the pole alone) */
const LK_ORBITS = [];
{
  const seen = new Set();
  for (const p of LK_PTS) {
    if (seen.has(lkKey(p))) continue;
    const orb = [p]; let q = lkCyc(p);
    while (lkKey(q) !== lkKey(p)) { orb.push(q); q = lkCyc(q); }
    orb.forEach(r => seen.add(lkKey(r)));
    LK_ORBITS.push(orb);
  }
}

/* FLOOR */
const FL_VCB = 0.035, FL_VTB = 0.98, FL_AB = 0.0479, FL_FLOOR = 0.0414;

/* CAYLEY: s = (1/3, 2/3, 2/3) as integers over 3 */
const CY_SN = [1, 2, 2], CY_SD = 3;
const CY_NUM = [[1, -4, 8], [8, 4, 1], [-4, 7, 4]], CY_DEN = 9;     // Cayley(s) = CY_NUM / 9
function cyCayley(s) {                                               // floating: ((1 − |s|²) I + 2ssᵀ + 2[s]×)/(1 + |s|²)
  const n2 = s[0] * s[0] + s[1] * s[1] + s[2] * s[2], X = [[0, -s[2], s[1]], [s[2], 0, -s[0]], [-s[1], s[0], 0]];
  return [0, 1, 2].map(i => [0, 1, 2].map(j => ((i === j ? 1 - n2 : 0) + 2 * s[i] * s[j] + 2 * X[i][j]) / (1 + n2)));
}
function cyRod(k, th) {                                              // Rodrigues: rotation by th about unit k
  const c = Math.cos(th), s = Math.sin(th), X = [[0, -k[2], k[1]], [k[2], 0, -k[0]], [-k[1], k[0], 0]];
  return [0, 1, 2].map(i => [0, 1, 2].map(j => (i === j ? c : 0) + s * X[i][j] + (1 - c) * k[i] * k[j]));
}
const CY_K = [1 / 3, 2 / 3, 2 / 3];
const mv = (M, v) => M.map(r => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);
/* quaternions [w, x, y, z]; Ad p v = p v p̄ / |p|² */
const qm = (a, b) => [a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3], a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
  a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1], a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
const qAd = (p, v) => { const n = p.reduce((s, x) => s + x * x, 0), r = qm(qm(p, [0, ...v]), [p[0], -p[1], -p[2], -p[3]]); return [r[1] / n, r[2] / n, r[3] / n]; };

/* GRAM: A columns, the rational rotation U = (3/5, 4/5), B = U A */
const GR_A = [[2, 0], [1, 2]];                                        // columns a1, a2
const GR_U = [[3 / 5, -4 / 5], [4 / 5, 3 / 5]];
const grRot = (th, v) => [Math.cos(th) * v[0] - Math.sin(th) * v[1], Math.sin(th) * v[0] + Math.cos(th) * v[1]];
const GR_TH = Math.atan2(4, 3);
const GR_B = GR_A.map(v => [GR_U[0][0] * v[0] + GR_U[0][1] * v[1], GR_U[1][0] * v[0] + GR_U[1][1] * v[1]]);
const grGram = cols => cols.map(a => cols.map(b => a[0] * b[0] + a[1] * b[1]));

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('folding-the-mixing-matrix film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(FM_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(FM_LEAN).length}`);
  for (const [gid, short] of Object.values(FM_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. LOCK: a brute-force count, the pole, six orbits of three, the cycle as a 120° turn of the view */
  {
    let n = 0;
    for (let x = 0; x <= 30; x++) for (let y = 0; y <= 30; y++) for (let z = 0; z <= 30; z++) if (x * x + y * y + z * z === 867) n++;
    check(n === 19 && LK_PTS.length === 19, `the shell has ${n} / ${LK_PTS.length} points, expected 19`);
    check(867 === 3 * 17 * 17, '867 = 3 · 17²');
    const fixed = LK_PTS.filter(p => lkKey(lkCyc(p)) === lkKey(p));
    check(fixed.length === 1 && lkKey(fixed[0]) === '17,17,17', 'the only fixed point is (17, 17, 17)');
    const sizes = LK_ORBITS.map(o => o.length).sort();
    check(LK_ORBITS.length === 7 && sizes.filter(s => s === 3).length === 6 && sizes.filter(s => s === 1).length === 1, 'one pole and six orbits of three');
    const set = new Set(LK_PTS.map(lkKey));
    check(LK_PTS.every(p => set.has(lkKey(lkCyc(p)))), 'the cycle maps the shell to itself');
    for (const p of LK_PTS) {
      const a = lkUV(p), b = lkUV(lkCyc(p)), ra = Math.hypot(a[0], a[1]), rb = Math.hypot(b[0], b[1]);
      check(near(ra, rb, 1e-12), 'the cycle keeps the distance from the axis');
      if (ra > 1e-9) { const c = (a[0] * b[0] + a[1] * b[1]) / (ra * rb); check(near(c, -0.5, 1e-12), 'the cycle is a third of a turn'); }
    }
  }

  /* 2. FLOOR: chords of cube roots, the inputs, the floor */
  {
    for (let j = 0; j < 3; j++) for (let k = j + 1; k < 3; k++) {
      const d = Math.hypot(Math.cos(TAU * j / 3) - Math.cos(TAU * k / 3), Math.sin(TAU * j / 3) - Math.sin(TAU * k / 3));
      check(near(d, Math.sqrt(3), 1e-12), `|ω^${j} − ω^${k}| = √3`);
    }
    check(near(FL_VCB * FL_VTB, 0.0343, 1e-12), '0.035 × 0.98 = 0.0343');
    const f = FL_AB * Math.sqrt(3) / 2;
    check(f > FL_FLOOR && Math.abs(f - 0.04148) < 5e-6, `0.0479 · √3/2 = ${f}`);
  }

  /* 3. WALLS: the gap factors quoted on screen */
  check(0.0272 / 0.00361 > 7 && 0.0272 / 0.00361 < 8, 'charm/top gap > 7×');
  check(84.98 / 3.34 > 25, 'up/lepton gap > 25×');
  check(30 < 40 && 2.690 < 30, 'density walls below the target');

  /* 4. CAYLEY: the integer matrix against the formula, exact orthogonality, Rodrigues, a quaternion check */
  {
    const s = CY_SN.map(x => x / CY_SD), Mf = cyCayley(s);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) check(near(Mf[i][j], CY_NUM[i][j] / CY_DEN, 1e-14), `Cayley entry ${i}${j}`);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      let g = 0; for (let k = 0; k < 3; k++) g += CY_NUM[k][i] * CY_NUM[k][j];          // exact integers: NᵀN = 81 I
      check(g === (i === j ? 81 : 0), `NᵀN entry ${i}${j} = ${g}`);
      let h = 0; for (let k = 0; k < 3; k++) h += CY_NUM[i][k] * CY_NUM[j][k];
      check(h === (i === j ? 81 : 0), `N Nᵀ entry ${i}${j} = ${h}`);
    }
    check(1 + 16 + 64 === 81 && 8 - 16 + 8 === 0, 'row length and row orthogonality on screen');
    const R = cyRod(CY_K, Math.PI / 2);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) check(near(R[i][j], CY_NUM[i][j] / CY_DEN, 1e-14), `Rodrigues 90° entry ${i}${j}`);
    const p = [1, 1, 2, 0], q = [2, 0, 1, 3], v = [1, -2, 5];
    const l = qAd(qm(p, q), v), r = qAd(p, qAd(q, v));
    check(l.every((x, i) => near(x, r[i], 1e-12)), 'Ad(pq) v = Ad p (Ad q v) on a sample');
    const c = qAd([1, ...s], [1, 0, 0]);                                                  // Ad(1 + s) is the Cayley turn
    check(c.every((x, i) => near(x, CY_NUM[i][0] / CY_DEN, 1e-14)), 'Ad(1 + s) e₁ = first Cayley column');
  }

  /* 5. GRAM: B = U A with rational entries, equal Gram matrices, U unitary, the angle */
  {
    check(near(GR_B[0][0], 6 / 5) && near(GR_B[0][1], 8 / 5) && near(GR_B[1][0], -1) && near(GR_B[1][1], 2), 'B = U A');
    const ga = grGram(GR_A), gb = grGram(GR_B);
    check(near(ga[0][0], 4) && near(ga[0][1], 2) && near(ga[1][1], 5), 'AᵀA = [[4, 2], [2, 5]]');
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) check(near(ga[i][j], gb[i][j], 1e-12), `BᵀB = AᵀA (${i}${j})`);
    check(near(9 / 25 + 16 / 25, 1), 'U is orthogonal');
    GR_A.forEach((a, k) => { const b = grRot(GR_TH, a); check(near(b[0], GR_B[k][0], 1e-12) && near(b[1], GR_B[k][1], 1e-12), 'the drawn turn lands on B'); });
  }
});
Object.assign(FILM.speed, { lock: 0.016, floor: 0.014, walls: 0.016, cayley: 0.016, gram: 0.014, calib: 0.018, horizon: 0.012, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const fmFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function fmRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  if (a <= 0.003) return x;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a }); cx += tw(s, size, fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const FM_MISSING = new Set();
function fmLean(x, y, key, a, o = {}) {
  if (a <= 0.003) return;
  const [gid, label] = FM_LEAN[key], r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!FM_MISSING.has(gid)) { FM_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 18, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(label, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* the scene tab, top left: a number, the English and the Chinese name */
function fmTab(k, en, zh, a) {
  if (a <= 0.003) return;
  fillBox(120, 176, 66, 66, C.cyan, a * 0.12); box(120, 176, 66, 66, C.cyan, a, 2);
  txt(String(k), 153, 225, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, a });
  txt(en, 204, 205, { size: 24, fam: F.orb, w: 900, c: C.white, a, ls: 2 });
  txt(zh, 204, 237, { size: 22, fam: F.zh, w: 700, c: C.cyan, a });
}
function fmArc(cx, cy, r, a0, a1, col, a, lw = 2, dash = null) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); ctx.arc(cx, cy, r, a0, a1, a1 < a0); ctx.stroke(); ctx.restore();
}
/* a matrix of strings with brackets; cells w × h, top-left (x, y) */
function fmMatrix(cells, x, y, cw, ch, a, o = {}) {
  if (a <= 0.003) return;
  const n = cells.length, m = cells[0].length, size = o.size || 36, col = o.col || C.white;
  const W0 = m * cw, H0 = n * ch;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = o.br || C.dim; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x + 14, y); ctx.lineTo(x, y); ctx.lineTo(x, y + H0); ctx.lineTo(x + 14, y + H0);
  ctx.moveTo(x + W0 - 14, y); ctx.lineTo(x + W0, y); ctx.lineTo(x + W0, y + H0); ctx.lineTo(x + W0 - 14, y + H0); ctx.stroke();
  ctx.restore();
  cells.forEach((row, i) => row.forEach((s, j) => {
    const cc = typeof s === 'object' ? s : { s, c: col };
    txt(cc.s, x + (j + 0.5) * cw, y + (i + 0.5) * ch + size * 0.36, { size, fam: F.math, w: 700, align: 'center', c: cc.c, a: a * (cc.a == null ? 1 : cc.a) });
  }));
}

/* opening title */
function fmTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.2) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('FOLDING THE MIXING MATRIX', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
  txt('CYCLE · FLOOR · WALLS · CAYLEY · GRAM · RIGIDITY', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                         scene 1 · THE LOCK OF THREE                       */
/* ======================================================================= */
const LK_O = [500, 500], LK_S = 340;
function lkScreen(uv) { return [LK_O[0] + LK_S * uv[0], LK_O[1] - LK_S * uv[1]]; }
/* draw the shell turned by the fraction k of the cycle (k = 0 rest, k = 1 every point on its image) */
function lkShell(a, k, orbA) {
  if (a <= 0.003) return;
  ring(LK_O[0], LK_O[1], LK_S * 0.25, C.dim, a * 0.25, 1);
  ring(LK_O[0], LK_O[1], LK_S * 0.5, C.dim, a * 0.25, 1);
  ring(LK_O[0], LK_O[1], LK_S * 0.75, C.dim, a * 0.25, 1);
  const pos = p => {
    const u0 = lkUV(p), u1 = lkUV(lkCyc(p)), r = Math.hypot(u0[0], u0[1]);
    if (r < 1e-9) return lkScreen(u0);
    let a0 = Math.atan2(u0[1], u0[0]), a1 = Math.atan2(u1[1], u1[0]);
    let d = a1 - a0; while (d > Math.PI) d -= TAU; while (d <= -Math.PI) d += TAU;
    const th = a0 + d * ease(k);
    return lkScreen([r * Math.cos(th), r * Math.sin(th)]);
  };
  for (const orb of LK_ORBITS) {
    if (orb.length < 3) continue;
    const ps = orb.map(pos);
    if (orbA <= 0.003) continue;
    ctx.save();
    ctx.globalAlpha = a * orbA * 0.85; ctx.strokeStyle = C.cyan; ctx.lineWidth = 2;
    ctx.beginPath(); ps.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath(); ctx.stroke(); ctx.restore();
  }
  for (const p of LK_PTS) {
    const q = pos(p), pole = lkKey(p) === '17,17,17';
    dot(q[0], q[1], pole ? 16 : 11, pole ? 'g' : 'c', a);
  }
}
SCENES.lock = S => {
  const u = S.u;
  fmTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, null, 'argued']]);
  fmTab(1, 'THE LOCK OF THREE', '三重轮换之锁', a);
  const turn = Q(S, 1, 'Cycling the coordinates', 2.6);
  const orbA = Q(S, 1, 'six orbits', 0.6);
  lkShell(a, turn, orbA);
  /* the pole label */
  const pa = a * Q(S, 1, 'fixes one pole', 0.6);
  if (pa > 0.003) { fillBox(LK_O[0] - 92, LK_O[1] + 22, 184, 34, C.bg, pa * 0.85); txt('(17, 17, 17)', LK_O[0], LK_O[1] + 48, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.now, a: pa }); }
  txt('view down the (1, 1, 1) axis · 沿 (1,1,1) 方向俯视', LK_O[0], 822, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
  /* a turning arrow around the axis while the cycle acts */
  const ta = a * clamp(turn * 4) * (1 - clamp((turn - 0.75) * 5));
  fmArc(LK_O[0], LK_O[1], LK_S * 0.86, -Math.PI * 0.75, -Math.PI * 0.75 + TAU / 3 * ease(turn), C.now, ta, 4);
  /* the ledger page */
  panel(1000, 280, 800, 540, a, C.cyan, 'THE SHELL · 十九点球壳');
  fmRich([['x² + y² + z² = 867 = 3 · 17²', C.white]], 1030, 350, { size: 30, a });
  fmRich([['points  ', C.dim], ['19 = 1 + 6 × 3', C.cyan]], 1030, 405, { size: 30, a: a * Q(S, 0, 'Nineteen', 0.6) });
  fmRich([['P : (x, y, z) ↦ (y, z, x)', C.white]], 1030, 460, { size: 30, a: pa });
  /* line 2: the CKM pattern collapses to a permutation with phases */
  const ca = a * at(S, 2, 0.6);
  if (ca > 0.003) {
    txt('[H_u, T] = [H_d, T] = 0  ⇒', 1030, 520, { size: 26, fam: F.math, w: 700, c: C.white, a: ca });
    const k = ease(Q(S, 2, 'can only be', 1.6));
    const gen = [[0.97, 0.22, 0.004], [0.22, 0.97, 0.04], [0.009, 0.04, 0.999]];
    const perm = [[0, 1, 0], [0, 0, 1], [1, 0, 0]];
    const x0 = 1060, y0 = 545, cw = 110, ch = 76;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      const v = lerp(gen[i][j], perm[i][j], k);
      fillBox(x0 + j * cw + 6, y0 + i * ch + 6, cw - 12, ch - 12, C.cyan, ca * 0.6 * v);
      box(x0 + j * cw + 6, y0 + i * ch + 6, cw - 12, ch - 12, C.cyan, ca * 0.35, 1);
      if (perm[i][j] && k > 0.5) txt('eⁱᵅ', x0 + j * cw + cw / 2, y0 + i * ch + ch / 2 + 9, { size: 24, fam: F.math, w: 700, align: 'center', c: C.white, a: ca * clamp((k - 0.5) * 3) });
    }
    txt('|V_CKM|', x0 + 1.5 * cw, y0 + 3 * ch + 28, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ca });
    const la = a * Q(S, 2, 'permutation with phases', 0.6);
    txt('permutation × phases', 1420, 610, { size: 26, fam: F.disp, w: 700, c: C.white, a: la });
    txt('置换乘相位', 1420, 648, { size: 24, fam: F.zh, w: 700, c: C.white, a: la });
    txt('for any edge phases z_i', 1420, 690, { size: 20, fam: F.mono, w: 700, c: C.dim, a: la });
    txt('written argument · 书面论证', 1420, 730, { size: 20, fam: F.zh, w: 700, c: C.argued, a: la });
  }
  stamp('MUST BREAK · 必须破缺', 1400, 232, Q(S, 3, 'must break', 0.5), C.mag, 30, -0.05);
};

/* ======================================================================= */
/*                         scene 2 · THE BREAKING FLOOR                      */
/* ======================================================================= */
const FL_O = [440, 500], FL_R = 220;
SCENES.floor = S => {
  const a = fmFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, null, 'argued']]);
  fmTab(2, 'THE BREAKING FLOOR', '破缺下界', a);
  /* the three cube roots and their chords */
  ring(FL_O[0], FL_O[1], FL_R, C.dim, a * 0.45, 1.5);
  const P = k => [FL_O[0] + FL_R * Math.cos(-Math.PI / 2 + TAU * k / 3), FL_O[1] + FL_R * Math.sin(-Math.PI / 2 + TAU * k / 3)];
  const cha = a * Q(S, 0, 'root three apart', 0.8);
  for (let j = 0; j < 3; j++) {
    const p = P(j), q = P((j + 1) % 3);
    line(p[0], p[1], lerp(p[0], q[0], ease(cha)), lerp(p[1], q[1], ease(cha)), C.cyan, a, 3);
    const m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], o = [m[0] - FL_O[0], m[1] - FL_O[1]], ol = Math.hypot(o[0], o[1]);
    txt('√3', m[0] - o[0] / ol * 34, m[1] - o[1] / ol * 34 + 10, { size: 28, fam: F.math, w: 700, align: 'center', c: C.cyan, a: cha });
  }
  for (let j = 0; j < 3; j++) { const p = P(j); dot(p[0], p[1], 14, 'w', a); }
  const lab = ['ω⁰', 'ω¹', 'ω²'];
  for (let j = 0; j < 3; j++) { const p = P(j), o = [p[0] - FL_O[0], p[1] - FL_O[1]]; txt(lab[j], p[0] + o[0] * 0.2, p[1] + o[1] * 0.2 + 10, { size: 28, fam: F.math, w: 700, align: 'center', c: C.white, a }); }
  txt('eigenvalues of T: three cube roots', FL_O[0], FL_O[1] + FL_R + 70, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  txt('T 的本征值：同一相位的三个立方根', FL_O[0], FL_O[1] + FL_R + 102, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
  /* the ledger */
  panel(840, 280, 960, 540, a, C.cyan, 'FIVE LINES · 五行手算');
  fmRich([['‖[T, X]‖ = ', C.white], ['√3', C.cyan], [' · ‖X − E(X)‖', C.white]], 870, 345, { size: 30, a: a * Q(S, 0, 'so the commutator', 0.6) });
  fmRich([['|V_cb| > 0.035,  |V_tb| > 0.98', C.white]], 870, 410, { size: 28, a: a * Q(S, 1, 'V c b', 0.6) });
  fmRich([['|V_cb V_tb| > 0.035 × 0.98 = ', C.white], ['0.0343', C.cyan]], 870, 460, { size: 28, a: a * Q(S, 1, 'V t b', 0.6) });
  const l2 = a * Q(S, 2, 'Five lines', 0.6);
  fmRich([['‖[A, B]‖ > ', C.white], ['0.0479', C.now]], 870, 525, { size: 30, a: l2 });
  txt('A, B: normalised H_u, H_d at 1 TeV · (c,t) and (t,c) entries', 870, 560, { size: 18, fam: F.mono, w: 700, c: C.dim, a: l2 });
  const l3 = a * Q(S, 2, 'at least one sector', 0.6);
  fmRich([['max ‖[T, X]‖ ≥ (√3/2) · 0.0479 = 0.04148…', C.white]], 870, 620, { size: 28, a: l3 });
  /* the excluded near-symmetric zone on a ruler 0 … 0.08 */
  const ra = a * Q(S, 2, 'break the cycle', 0.6);
  if (ra > 0.003) {
    const x0 = 880, x1 = 1760, y = 720, X = v => x0 + (x1 - x0) * v / 0.08;
    fillBox(X(0), y - 22, X(FL_FLOOR) - X(0), 44, C.mag, ra * 0.28);
    box(X(0), y - 22, X(FL_FLOOR) - X(0), 44, C.mag, ra, 1.5);
    txt('near-symmetric zone excluded · 近对称区被排除', X(FL_FLOOR / 2), y + 8, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.white, a: ra });
    line(x0, y + 22, x1, y + 22, C.dim, ra, 1.5);
    [0, 0.02, 0.04, 0.06, 0.08].forEach(v => { line(X(v), y + 22, X(v), y + 30, C.dim, ra, 1.5); txt(String(v), X(v), y + 54, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ra }); });
    line(X(FL_FLOOR), y - 34, X(FL_FLOOR), y + 30, C.now, ra, 3);
    txt('0.0414', X(FL_FLOOR) + 10, y - 34, { size: 22, fam: F.mono, w: 700, c: C.now, a: ra });
    txt('hand derivation in the chapter · arithmetic on screen', 870, 800, { size: 18, fam: F.mono, w: 700, c: C.argued, a: ra });
  }
  stamp('> 0.0414', 1440, 250, Q(S, 2, 'more than', 0.5), C.now, 34, -0.05);
};

/* ======================================================================= */
/*                              scene 3 · FIVE WALLS                         */
/* ======================================================================= */
const WL = { x0: 640, x1: 1760, lo: -3, hi: 2 };
const wlX = v => WL.x0 + (WL.x1 - WL.x0) * (Math.log10(v) - WL.lo) / (WL.hi - WL.lo);
function wlRow(y, a, r) {
  if (a <= 0.003) return;
  txt(r.en, 140, y - 6, { size: 24, fam: F.disp, w: 700, c: C.white, a });
  txt(r.zh + '  ·  ' + r.q, 140, y + 24, { size: 20, fam: F.zh, w: 700, c: C.dim, a });
  line(WL.x0, y + 4, WL.x1, y + 4, C.dim, a * 0.5, 1);
  /* reachable region (cyan), gap to the target (magenta), target (white outline) */
  const [r0, r1] = r.reach;
  fillBox(wlX(r0), y - 12, wlX(r1) - wlX(r0), 32, C.cyan, a * 0.35); box(wlX(r0), y - 12, wlX(r1) - wlX(r0), 32, C.cyan, a, 1.5);
  const [g0, g1] = r.gap;
  fillBox(wlX(g0), y - 4, wlX(g1) - wlX(g0), 16, C.mag, a * 0.7);
  const [t0, t1] = r.target;
  if (t1 > t0) box(wlX(t0), y - 18, Math.max(6, wlX(t1) - wlX(t0)), 44, C.white, a, 2);
  else { line(wlX(t0), y - 22, wlX(t0), y + 30, C.white, a, 3); }
  txt(r.wall, wlX(r.wallAt) + (r.wallLeft ? -10 : 10), y - 20, { size: 20, fam: F.mono, w: 700, align: r.wallLeft ? 'right' : 'left', c: C.cyan, a });
  txt(r.tgt, wlX(r.tgtAt) + (r.tgtLeft ? -10 : 10), y + 44, { size: 20, fam: F.mono, w: 700, align: r.tgtLeft ? 'right' : 'left', c: C.white, a });
  if (r.gapLab) txt(r.gapLab, (wlX(g0) + wlX(g1)) / 2, y - 20, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.mag, a });
}
const WL_ROWS = [
  { en: 'single light Higgs', zh: '单轻希格斯', q: 'm_c / m_t', reach: [0.0272, 100], gap: [0.00361, 0.0272], target: [0.00361, 0.00361],
    wall: '> 0.0272', wallAt: 0.0272, tgt: 'target 0.00361', tgtAt: 0.00361, tgtLeft: true, gapLab: '> 7×' },
  { en: 'any site-density potential', zh: '任意密度势', q: 'm_t / m_b', reach: [0.001, 30], gap: [30, 40], target: [40, 100],
    wall: '< 30 on 1238 zeros  (< 2.690 on #11431)', wallAt: 30, wallLeft: true, tgt: 'target > 40', tgtAt: 100, tgtLeft: true },
  { en: '7-orbit non-negative weights', zh: '七轨道非负权', q: 'm_u / m_ℓ', reach: [0.001, 3.34], gap: [3.34, 84.98], target: [84.98, 84.98],
    wall: '< 3.34', wallAt: 3.34, wallLeft: true, tgt: 'floor 84.98', tgtAt: 84.98, tgtLeft: true, gapLab: '> 25×' }
];
SCENES.walls = S => {
  const a = fmFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  fmTab(3, 'FIVE WALLS', '五堵禁行墙', a);
  txt('interval certificates · 区间证书 · numbers from the chapter', 1800, 205, { size: 18, fam: F.zh, w: 700, align: 'right', c: C.cyan, a });
  /* the shared log ruler */
  const ax = a * at(S, 0, 0.6);
  if (ax > 0.003) {
    [-3, -2, -1, 0, 1, 2].forEach(e => {
      const x = wlX(Math.pow(10, e));
      line(x, 290, x, 540, C.dim, ax * 0.25, 1);
      txt(['0.001', '0.01', '0.1', '1', '10', '100'][e + 3], x, 280, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ax });
    });
  }
  wlRow(340, a * Q(S, 1, 'single light Higgs', 0.6), WL_ROWS[0]);
  wlRow(430, a * Q(S, 2, 'Density potentials', 0.6), WL_ROWS[1]);
  wlRow(520, a * Q(S, 2, 'thirty-eight zeros', 0.6, 0.8), WL_ROWS[2]);
  /* card: three-leg transport */
  const ta = a * Q(S, 3, 'Richer transport', 0.6);
  if (ta > 0.003) {
    panel(140, 590, 860, 230, ta, C.mag, 'THREE-LEG TRANSPORT · 三腿八系数输运');
    txt('fits 9 masses + CKM on one zero  ·  单枚零点可拟', 166, 660, { size: 22, fam: F.zh, w: 700, c: C.white, a: ta });
    fmRich([['heavy block  ', C.dim], ['> 16.63', C.mag]], 166, 708, { size: 26, a: ta * Q(S, 3, 'but at a vacuum cost', 0.6) });
    fmRich([['vacuum coefficient  ', C.dim], ['> 3.45 × 10³⁴ GeV²', C.mag]], 166, 752, { size: 26, a: ta * Q(S, 3, 'vacuum cost', 0.6, 0.5) });
    fmRich([['three zeros together: some ratio  ', C.dim], ['< 98.7 %', C.mag]], 166, 796, { size: 22, a: ta * Q(S, 3, 'vacuum cost', 0.6, 1.2) });
  }
  /* card: minimal site support, after the line */
  const sa = a * Q(S, 3, 'Richer transport', 0.6, 1.2);
  if (sa > 0.003) {
    panel(1040, 590, 760, 230, sa, C.cyan, 'MINIMAL SITE SUPPORT · 最小站点支撑');
    const rows = [[8, 'm_t / m_b needs ≥ 8 sites'], [16, 'stationarity needs ≥ 16 sites']];
    rows.forEach(([n, lab], i) => {
      const y = 672 + i * 72;
      for (let k = 0; k < 19; k++) dot(1070 + k * 34, y, k < n ? 10 : 6, k < n ? 'c' : 'w', sa * (k < n ? 1 : 0.3));
      txt(lab, 1066, y + 36, { size: 20, fam: F.mono, w: 700, c: C.white, a: sa });
    });
    txt('of 19 sites (count only)', 1780, 800, { size: 16, fam: F.mono, w: 700, align: 'right', c: C.dim, a: sa });
  }
};

/* ======================================================================= */
/*                            scene 4 · RATIONAL CAYLEY                      */
/* ======================================================================= */
const CY_O = [480, 520], CY_SC = 230;
function cyProj(v) {
  const p = rotX(rotY([v[0], v[2], v[1]], -0.6), 0.32);          // z up on screen
  return [CY_O[0] + CY_SC * p[0], CY_O[1] - CY_SC * p[1]];
}
SCENES.cayley = S => {
  const a = fmFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean']]);
  fmTab(4, 'RATIONAL CAYLEY', '有理凯莱旋转', a);
  /* the rotation axis (violet), the original axes (dim), the turned axes (cyan) */
  const k = ease(Q(S, 1, 'Take s equal', 3.0));
  const R = cyRod(CY_K, Math.PI / 2 * k);
  const o = cyProj([0, 0, 0]);
  const ka = cyProj(CY_K.map(x => x * 1.35)), kb = cyProj(CY_K.map(x => -x * 0.7));
  dashed(kb[0], kb[1], ka[0], ka[1], C.vio, a * 0.9, 2.5);
  txt('axis s/|s|', ka[0] + 10, ka[1] - 8, { size: 20, fam: F.mono, w: 700, c: C.vio, a });
  const names = ['e₁', 'e₂', 'e₃'];
  for (let i = 0; i < 3; i++) {
    const e = [0, 0, 0]; e[i] = 1;
    const p = cyProj(e);
    dashed(o[0], o[1], p[0], p[1], C.dim, a * 0.7, 2);
    txt(names[i], p[0] + 8, p[1] + 24, { size: 22, fam: F.math, w: 700, c: C.dim, a });
    const r = cyProj(mv(R, e));
    arrow(o[0], o[1], r[0], r[1], C.cyan, a, 4);
    txt('R' + names[i], r[0] + 10, r[1] - 10, { size: 24, fam: F.math, w: 700, c: C.cyan, a: a * clamp(k * 3) });
  }
  txt(`turn ${Math.round(90 * k)}° about s`, CY_O[0], 800, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: a * at(S, 1, 0.6) });
  /* the ledger page */
  panel(900, 280, 900, 540, a, C.cyan, 'CAYLEY(s) · 凯莱旋转');
  const s1 = a * Q(S, 1, 'Take s equal', 0.6);
  fmRich([['s = (1/3, 2/3, 2/3)', C.now], ['    1 + |s|² = 2', C.white]], 930, 340, { size: 28, a: s1 });
  txt('((1 − |s|²) I + 2ssᵀ + 2[s]×) / (1 + |s|²) · worked example', 930, 374, { size: 18, fam: F.mono, w: 700, c: C.dim, a: s1 });
  const ma = a * Q(S, 1, 'whole number of ninths', 0.6);
  txt('1/9 ×', 1000, 470, { size: 36, fam: F.math, w: 700, align: 'right', c: C.white, a: ma });
  fmMatrix(CY_NUM.map(r => r.map(x => (x < 0 ? '−' : '') + Math.abs(x))), 1030, 392, 96, 50, ma, { size: 34, col: C.cyan });
  fmRich([['1 + 16 + 64 = 81 = 9²', C.white]], 1370, 430, { size: 24, a: ma });
  fmRich([['8 − 16 + 8 = 0', C.white]], 1370, 470, { size: 24, a: ma });
  txt('rows: length 1, perpendicular', 1370, 506, { size: 18, fam: F.mono, w: 700, c: C.dim, a: ma });
  const l2 = a * Q(S, 2, 'Lean checks', 0.6);
  if (l2 > 0.003) {
    box(920, 572, 860, 112, C.lean, l2, 1.5, 'rgba(0,0,0,0.6)');
    txt('∀ s : RatVec3,   Cayley(s)ᵀ · Cayley(s) ≡ I₃', 940, 616, { size: 26, fam: F.math, w: 700, c: C.white, a: l2 });
    fmLean(940, 664, 'cayley_orthogonal', l2, { size: 18 });
  }
  const l3 = a * Q(S, 3, 'turning by p times q', 0.6);
  if (l3 > 0.003) {
    box(920, 698, 860, 112, C.lean, l3, 1.5, 'rgba(0,0,0,0.6)');
    txt('p, q ≠ 0:   Ad(p q)(v) ≡ Ad(p)(Ad(q)(v))', 940, 742, { size: 26, fam: F.math, w: 700, c: C.white, a: l3 });
    fmLean(940, 790, 'ad_hom', l3, { size: 18 });
  }
  stamp('Cᵀ C ≡ I', 1480, 250, Q(S, 2, 'is the identity', 0.5) * (1 - at(S, 3, 0.5)), C.lean, 32, -0.05);
};

/* ======================================================================= */
/*                          scene 5 · SAME GRAM, ONE TURN                    */
/* ======================================================================= */
const GR_O = [400, 650], GR_SC = 120;
const grP = v => [GR_O[0] + GR_SC * v[0], GR_O[1] - GR_SC * v[1]];
SCENES.gram = S => {
  const a = fmFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'Lean checks', 'lean'], [2, null, 'argued']]);
  fmTab(5, 'SAME GRAM, ONE TURN', '同一格拉姆，一次幺正', a);
  /* the plane */
  arrow(GR_O[0] - 260, GR_O[1], GR_O[0] + 360, GR_O[1], C.dim, a * 0.7, 1.8);
  arrow(GR_O[0], GR_O[1] + 60, GR_O[0], GR_O[1] - 360, C.dim, a * 0.7, 1.8);
  /* A (white) and B (cyan); on line 1 a copy of A turns onto B by U (violet arc) */
  const ba = a * Q(S, 0, 'one Gram matrix', 0.6);
  const lab = ['1', '2'];
  GR_A.forEach((v, i) => { const p = grP(v); arrow(GR_O[0], GR_O[1], p[0], p[1], C.white, a, 4); txt('a' + ['₁', '₂'][i], p[0] + 10, p[1] + (i ? -8 : 30), { size: 26, fam: F.math, w: 700, c: C.white, a }); });
  GR_B.forEach((v, i) => { const p = grP(v); arrow(GR_O[0], GR_O[1], p[0], p[1], C.cyan, ba, 4); txt('b' + ['₁', '₂'][i], p[0] + (i ? -40 : 12), p[1] - 10, { size: 26, fam: F.math, w: 700, c: C.cyan, a: ba }); });
  const k = ease(Q(S, 1, 'some unitary U', 2.0));
  if (k > 0.001) {
    GR_A.forEach(v => { const p = grP(grRot(GR_TH * k, v)); arrow(GR_O[0], GR_O[1], p[0], p[1], C.now, a * (1 - 0.6 * clamp((k - 0.95) * 20)), 3); });
    fmArc(GR_O[0], GR_O[1], 300, 0, -GR_TH * k, C.vio, a, 3);
    txt('U', GR_O[0] + 300 * Math.cos(GR_TH * k * 0.5) + 14, GR_O[1] - 300 * Math.sin(GR_TH * k * 0.5), { size: 30, fam: F.math, w: 700, c: C.vio, a });
  }
  txt('|a₁| = |b₁| = 2   |a₂| = |b₂| = √5   a₁·a₂ = b₁·b₂ = 2', GR_O[0] + 40, 790, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: ba });
  /* the ledger page */
  panel(900, 280, 900, 330, a, C.cyan, 'GRAM MATRICES · 格拉姆矩阵');
  const ga = a * Q(S, 0, 'Second tool', 0.6);
  txt('AᵀA =', 1050, 420, { size: 30, fam: F.math, w: 700, align: 'right', c: C.white, a: ga });
  fmMatrix([['4', '2'], ['2', '5']], 1070, 360, 70, 52, ga, { size: 32, col: C.white });
  txt('BᵀB =', 1430, 420, { size: 30, fam: F.math, w: 700, align: 'right', c: C.cyan, a: ba });
  fmMatrix([['4', '2'], ['2', '5']], 1450, 360, 70, 52, ba, { size: 32, col: C.cyan });
  txt('A = [a₁ a₂] = [(2, 0), (1, 2)],   B = [(6/5, 8/5), (−1, 2)]', 930, 520, { size: 20, fam: F.mono, w: 700, c: C.dim, a: ga });
  txt('here U = rotation by (3/5, 4/5) · computed', 930, 560, { size: 20, fam: F.mono, w: 700, c: C.dim, a: a * Q(S, 1, 'some unitary U', 0.6) });
  const l1 = a * Q(S, 1, 'Lean checks', 0.6);
  if (l1 > 0.003) {
    box(900, 630, 900, 96, C.lean, l1, 1.5, 'rgba(0,0,0,0.6)');
    txt('Bᴴ B = Aᴴ A   ⇒   ∃ U ∈ U(m, ℂ),  B = U A', 920, 670, { size: 26, fam: F.math, w: 700, c: C.white, a: l1 });
    fmLean(920, 712, 'gram', l1, { size: 17 });
  }
  /* line 2: the folding dimension floors */
  const fa = a * Q(S, 2, 'forty-two dimensions', 0.6);
  if (fa > 0.003) {
    chip(1050, 778, 300, 48, '≥ 42 per side', C.argued, fa, 22);
    chip(1365, 778, 300, 48, '≥ 48 with doublets', C.argued, fa * Q(S, 2, 'forty-two dimensions', 0.6, 0.8), 22);
    chip(1680, 778, 240, 48, '≥ 45 at H = 0', C.argued, fa * Q(S, 2, 'forty-two dimensions', 0.6, 1.6), 22);
    txt('folding dimensions: the chapter\'s replay results, not Lean · 折叠维数：本章复算结果', 900, 830, { size: 16, fam: F.zh, w: 700, c: C.argued, a: fa });
  }
};

/* ======================================================================= */
/*                        scene 6 · CALIBRATED, THEN RIGID                   */
/* ======================================================================= */
SCENES.calib = S => {
  const a = fmFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, null, 'argued']]);
  fmTab(6, 'CALIBRATED, THEN RIGID', '先校准，再刚性', a);
  /* card 1: the mirror triangle and its winding counter */
  const m = a * at(S, 0, 0.6);
  panel(140, 280, 820, 270, m, C.cyan, 'MIRROR TRIANGLE · 镜像三角');
  if (m > 0.003) {
    const tri = [[300, 360], [200, 510], [400, 510]], names = ['#28325', '#48067', '#58214'];
    ctx.save(); ctx.globalAlpha = m; ctx.strokeStyle = C.cyan; ctx.lineWidth = 2.5; ctx.beginPath();
    tri.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); ctx.stroke(); ctx.restore();
    tri.forEach((p, i) => { dot(p[0], p[1], 12, 'c', m); txt(names[i], p[0] + (i === 0 ? 20 : i === 1 ? -10 : 10), p[1] + (i === 0 ? 6 : 34), { size: 18, fam: F.mono, w: 700, align: i === 1 ? 'center' : 'left', c: C.white, a: m }); });
    const w0 = phraseAt(S, 0, 'mirror triangle'), w1 = phraseAt(S, 0, 'twenty-eight windings') + 0.8;
    const n = Math.round(28 * ease(clamp((S.u - w0) / Math.max(0.5, w1 - w0))));
    txt(String(n), 680, 450, { size: 96, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: m });
    txt('windings · 圈', 680, 494, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: m });
    txt('baseline needs 42', 680, 528, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: m * Q(S, 0, 'twenty-eight windings', 0.6) });
  }
  /* card 2: the rational response on seven zeros */
  const r = a * Q(S, 1, 'A finite rational response', 0.6);
  panel(1000, 280, 800, 270, r, C.cyan, 'RATIONAL RESPONSE · 有限有理响应');
  if (r > 0.003) {
    fmRich([['R = (I + T¹⁶)⁻¹', C.white]], 1030, 345, { size: 30, a: r });
    const sl = Q(S, 1, 'matches all seven', 1.4);
    for (let i = 0; i < 7; i++) {
      const x = 1040 + i * 104, on = clamp(sl * 7 - i);
      box(x, 375, 84, 70, C.cyan, r * 0.6, 1.5);
      if (on > 0) { fillBox(x + 6, 381, 72, 58, C.cyan, r * 0.3 * on); txt('✓', x + 42, 422, { size: 28, fam: F.math, w: 700, align: 'center', c: C.white, a: r * on }); }
    }
    fmRich([['error < 10⁻¹¹ on all 7 zeros', C.cyan]], 1030, 488, { size: 22, a: r * sl });
    fmRich([['light → heavy leakage < 1.70 × 10⁻³⁰', C.cyan]], 1030, 522, { size: 22, a: r * sl });
    const ca = a * Q(S, 1, 'calibrated on one zero', 0.6);
    chip(1640, 345, 260, 44, 'calibrated #28325', C.now, ca, 20);
  }
  /* the rigidity ladder */
  const la = a * at(S, 2, 0.6);
  if (la > 0.003) {
    const steps = [
      { n: 2, en: 'fixed unitary ⇒ no mixing', zh: '固定酉矩阵：禁止代际混合', ph: 'No fixed matrix' },
      { n: 5, en: 'local generators ⇒ ℂ I', zh: '固定局域生成元：只剩标量', ph: 'five zeros shrink' },
      { n: 7, en: 'any fixed matrix ⇒ quadratic in P', zh: '任意固定矩阵：轮换的二次多项式', ph: 'seven shrink' }
    ];
    steps.forEach((st, i) => {
      const sa = a * Q(S, 2, st.ph, 0.6);
      if (sa <= 0.003) return;
      const x = 140 + i * 375, y = 760 - i * 60, w = 360;
      box(x, y - 60, w, 128 + 0, C.cyan, sa, 1.5, 'rgba(0,0,0,0.55)');
      txt(`${st.n} zeros`, x + 18, y - 22, { size: 26, fam: F.orb, w: 900, c: C.cyan, a: sa });
      txt(st.en, x + 18, y + 14, { size: 17, fam: F.mono, w: 700, c: C.white, a: sa });
      txt(st.zh, x + 18, y + 48, { size: 18, fam: F.zh, w: 700, c: C.dim, a: sa });
    });
    txt('rigidity ladder · 刚性阶梯 (certificates)', 140, 590, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: la });
  }
  const sp = a * at(S, 3, 0.6);
  if (sp > 0.003) {
    panel(1270, 600, 530, 220, sp, C.argued);
    txt('a spectral operator', 1300, 668, { size: 30, fam: F.disp, w: 700, c: C.white, a: sp });
    txt('that moves with the background', 1300, 708, { size: 24, fam: F.disp, w: 700, c: C.white, a: sp });
    txt('随背景协变的谱算子，不是常数', 1300, 752, { size: 24, fam: F.zh, w: 700, c: C.white, a: sp });
    txt('the chapter\'s reading · 本章的结论读法', 1300, 796, { size: 18, fam: F.zh, w: 700, c: C.argued, a: sp });
  }
};

/* ======================================================================= */
/*                      scene 7 · THE OPEN FLAVOUR HORIZON                   */
/* ======================================================================= */
SCENES.horizon = S => {
  const a = fmFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'open']]);
  const rows = [
    { k: 0, en: 'a first-principles flavour action', zh: '第一性原理的味作用律', note: 'every reconstruction is calibrated to reference CKM data · 每个重构都由参考 CKM 校准' },
    { k: 1, en: 'one folding for quarks, leptons, neutrinos, PMNS', zh: '同一折叠给出夸克、轻子、中微子与 PMNS', note: 'without m_u/m_ℓ collapse or a 10³⁴ GeV² heavy-block trace · 不引发反噬' }
  ];
  txt('OPEN · prob-ou-ch08-common-flavor-law', W / 2, 220, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.open, a, ls: 2 });
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 260 + i * 200;
    panel(260, y, 1400, 175, ra, C.open);
    txt(rw.en, 300, y + 62, { size: 34, fam: F.disp, w: 700, c: C.open, a: ra });
    txt(rw.zh, 300, y + 110, { size: 28, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 300, y + 150, { size: 19, fam: F.zh, w: 700, c: C.dim, a: ra });
  });
  const fa = a * at(S, 2, 0.8);
  txt('The walls are measured. The door is not yet found.', W / 2, 740, { size: 40, fam: F.disp, w: 700, align: 'center', c: C.white, a: fa });
  txt('墙已量清，门还没找到。', W / 2, 800, { size: 32, fam: F.zh, w: 700, align: 'center', c: C.white, a: fa * 0.9 });
};

/* ======================================================================= */
/*                                scene 8 · LEDGER                           */
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
  background(t, sc, 3, 6);
  /* the 19-point shell, left */
  const save = [LK_O[0], LK_O[1]];
  LK_O[0] = 420; LK_O[1] = 560;
  lkShell(1, 0, 1);
  LK_O[0] = save[0]; LK_O[1] = save[1];
  /* the ninths matrix, right */
  txt('1/9 ×', 1300, 790, { size: 34, fam: F.math, w: 700, align: 'right', c: C.white });
  fmMatrix(CY_NUM.map(r => r.map(x => (x < 0 ? '−' : '') + Math.abs(x))), 1320, 712, 90, 46, 1, { size: 32, col: C.cyan });
  txt(DATA.film.title_zh, 1240, 420, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('FOLDING THE', 1240, 520, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('MIXING MATRIX', 1240, 588, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 3, ls: 5 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1240, 660, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 3, sc);
  post(0);
};
