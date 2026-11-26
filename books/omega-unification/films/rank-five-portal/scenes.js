/* Film · The Rank-Five Portal · 秩五门户
   (book omega-unification, Volume II: chapter 6). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests (all numbers are the chapter's, from its pinned replay certificates,
   or are computed here from definitions the chapter states):
     hook       the matching targets of def-ou-ch06-higgs-portal: m_H = 125.25 GeV, v = 246.22 GeV, the tree
                boundary λ(M_Z) = m_H²/(2v²) ≈ 0.12938 and the contact ceiling 8π ≈ 25.13274 (computed); the
                pure electroweak two-loop wall on the crossings #11661 and #11934, (1.0496, 1.0503) × 10²⁶ and
                (1.0428, 1.0440) × 10²⁶ GeV², against the tree parameter 125.25²/2 GeV² (certificate; the ratio
                1.34 × 10²² is recomputed here). The three meeting couplings are a schematic (argued).
     traceless  the species-traceless portal (−F, 3F) on 12 coloured and 4 uncoloured real components:
                12(−F) + 4(3F) = 0 (computed); the necessary spectral width log(Q/m_min) > 3.45 is the chapter's
                written argument (argued); the widths 3.272 (#35 window) and 1.787583 (172 layers), and
                Δ_pole > 6.8122 × 10²³ GeV² are certificate values (computed).
     rank       the floor A_neg ≥ D(λ_H − λ_low) / (2 λ_H (d − 1) t_max) (argued); at d = 4 the chapter's
                certificate gives > 31.97519, so for d = 2, 3 the floor is at least 31.97519 · 3/(d − 1) (computed
                here from the 1/(d − 1) form); the rank-five portal P = p(5vv* − I)/4 has eigenvalues +p and
                fourfold −p/4 and trace 0 (computed here from the 5 × 5 matrix); its negative radial diagonal lies in
                (24.27098, 24.93094) < 8π (certificate); #78 and #288 raise the minimal rank to 6 (certificate).
     schur      SchurMinimum.schur_quadratic_is_least (LEAN): for A Hermitian and C positive definite the least
                value of the block quadratic form over y is x*(A − B C⁻¹ Bᴴ)x; the 1 × 1 instance A = 3, B = 2,
                C = 4, x = 1 is a worked example with chosen numbers (computed); the Schur margin > 3.11842 for
                8π I ± 𝒜 is the chapter's certificate (computed).
     pinch      the low-energy partners of the broken-vacuum balance in this model: 20 charged assignments add
                17.5920–17.7478 MeV to the tree Z width (LEP 2495.2 ± 2.3 MeV); 6 neutral assignments give
                CLEO χ² ≈ 6.05 against 13.5372–29.2980 (certificate, computed); the 80.38 GeV charged singlet against
                OPAL's 98.0 GeV long-lived limit (argued: a literature bound compared with a model choice).
     open       prob-ou-ch06-question1-open: Question 1 is open (open).

   On load, FILM.init checks DATA.lean against the cited theorem and recomputes every number derived on screen;
   any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

const RF_LEAN = 'D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least';
/* the chapter's numbers (def-ou-ch06-higgs-portal and the replay certificates it cites) */
const RF = {
  mH: 125.25, v: 246.22, lamMZ: 0.12938, eightPi: 25.13274,
  wall: [[1.0496e26, 1.0503e26], [1.0428e26, 1.0440e26]], wallRatio: 1.34e22,
  needW: 3.45, eNeed: 31.50039, w35: 3.272, w172: 1.787583, quart172: 1.794796, dPole: 6.8122e23,
  floor4: 31.97519, diag5: [24.27098, 24.93094], margin: 3.11842,
  zAdd: [17.5920, 17.7478], zLEP: 2495.2, zErr: 2.3, chiN: 6.05, chiC: [13.5372, 29.2980],
  mS: 80.38, opal: 98.0
};
/* the rank-five portal: P = p(5 v v* − I)/4 with v_i = 1/√5, p = 1 (eigenvalues scale with p) */
function rfPortal(p = 1) {
  const n = 5, P = [];
  for (let i = 0; i < n; i++) { P.push([]); for (let j = 0; j < n; j++) P[i].push(p * (5 * (1 / 5) - (i === j ? 1 : 0)) / 4); }
  return P;
}
const rfMul = (M, x) => M.map(r => r.reduce((s, m, j) => s + m * x[j], 0));
/* the 1 × 1 worked Schur instance: q(y) = A x² + 2 B x y + C y², x = 1 */
const RFX = { A: 3, B: 2, C: 4, x: 1 };
const rfQ = y => RFX.A * RFX.x * RFX.x + 2 * RFX.B * RFX.x * y + RFX.C * y * y;
const RF_S = RFX.A - RFX.B * RFX.B / RFX.C, RF_YSTAR = -RFX.B * RFX.x / RFX.C;
const rfFloor = d => RF.floor4 * 3 / (d - 1);

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  const check = (ok, m) => { if (!ok) E.push('rank-five-portal film: ' + m); };
  const r = leanCite(RF_LEAN);
  check(r && r.kind === 'theorem', `${RF_LEAN} is not a cited theorem at the pinned commit`);
  check((DATA.lean || []).length === 1, 'film.json should cite exactly one declaration');
  /* hook: tree boundary, 8π and the wall ratio */
  const lam = RF.mH * RF.mH / (2 * RF.v * RF.v);
  check(Math.abs(lam - RF.lamMZ) < 5e-6, `λ(M_Z) = ${lam}`);
  check(Math.abs(8 * Math.PI - RF.eightPi) < 5e-6, '8π');
  const tree = RF.mH * RF.mH / 2;
  /* the chapter's ratio 1.34 × 10²² is that of the rounded wall 1.05 × 10²⁶ (and of the #11661 interval) */
  check((1.05e26 / tree).toExponential(2) === '1.34e+22', `wall ratio ${1.05e26 / tree}`);
  check(RF.wall[0].every(z => (z / tree).toExponential(2) === '1.34e+22'), '#11661 ratio');
  for (const [lo, hi] of RF.wall) check(lo > 1.04e26 && hi < 1.06e26, 'wall ≈ 1.05 × 10²⁶');
  check(Math.abs(tree - 7843.78125) < 1e-9, 'tree parameter 125.25²/2');
  /* traceless: tadpole and widths */
  check(12 * -1 + 4 * 3 === 0, '12(−F) + 4(3F) = 0');
  check(Math.exp(RF.needW) > RF.eNeed && Math.exp(RF.needW) < RF.eNeed + 1e-5, 'e^3.45 > 31.50039');
  check(RF.w35 < RF.needW && RF.w172 < RF.quart172, 'widths below the need');
  /* rank: floors, the portal spectrum, the rank-five fit */
  check(Math.abs(rfFloor(4) - RF.floor4) < 1e-12 && rfFloor(5) < RF.eightPi && rfFloor(4) > RF.eightPi, 'floor at d = 4, 5');
  for (let d = 2; d <= 4; d++) check(rfFloor(d) > RF.eightPi, `rank ${d} floor above 8π`);
  check(rfFloor(5) < RF.diag5[0], 'the rank-five diagonal sits above its floor');
  check(RF.diag5[1] < RF.eightPi, 'the rank-five diagonal sits below 8π');
  const P = rfPortal(1), v = [1, 1, 1, 1, 1].map(z => z / Math.sqrt(5));
  const Pv = rfMul(P, v), w = [1, -1, 0, 0, 0].map(z => z / Math.SQRT2), Pw = rfMul(P, w);
  check(Pv.every((z, i) => Math.abs(z - v[i]) < 1e-12), 'P v = +p v');
  check(Pw.every((z, i) => Math.abs(z + w[i] / 4) < 1e-12), 'P w = −p/4 w on v⊥');
  check(Math.abs(P.reduce((s, row, i) => s + row[i], 0)) < 1e-12, 'tr P = 0');
  check(Math.abs(1 - 4 / 4) < 1e-12, 'p − 4 · p/4 = 0');
  /* schur: the worked instance */
  check(RF_S === 2 && RF_YSTAR === -0.5 && rfQ(RF_YSTAR) === RF_S, 'q(−1/2) = 2 = A − B²/C');
  for (let k = -40; k <= 40; k++) { const y = k / 10; check(rfQ(y) >= RF_S - 1e-12, `q(${y}) ≥ 2`); check(Math.abs(rfQ(y) - (RF_S + RFX.C * (y + 0.5) ** 2)) < 1e-12, `square at ${y}`); }
  /* pinch */
  check(Math.abs(RF.zAdd[0] / RF.zErr - 7.649) < 1e-3, 'added Z width ≈ 7.6 × the LEP error');
  check(RF.chiN < RF.chiC[0] && RF.mS < RF.opal, 'CLEO and OPAL orderings');
});
Object.assign(FILM.speed, { hook: 0.02, traceless: 0.016, rank: 0.014, schur: 0.014, pinch: 0.018, open: 0.012, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const rfFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function rfRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  /* a part [s, col, 'sub'] is set as a subscript */
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], p[2] ? size * 0.6 : size, fam, w), 0) / 2;
  for (const [s, col, sub] of parts) {
    const sz = sub ? size * 0.6 : size;
    txt(s, cx, y + (sub ? size * 0.2 : 0), { size: sz, fam, w, c: col, a, ab: o.ab }); cx += tw(s, sz, fam, w);
  }
  return cx;
}
/* LEAN ✓ chip for the cited theorem, looked up by its whole GID */
let RF_MISSING = false;
function rfLean(x, y, a, size = 20) {
  if (a <= 0.003) return;
  const r = leanCite(RF_LEAN);
  if (!r || r.kind !== 'theorem') { if (!RF_MISSING) { RF_MISSING = true; window.FILM_ERRORS.push(`film.json does not cite ${RF_LEAN}`); } return; }
  const head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.label || r.name, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
function rfTag(x, y, s, col, a, size = 18) { txt(s, x, y, { size, fam: F.zh, w: 700, c: col, a }); }
function rfTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('THE RANK-FIVE PORTAL', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('MATCHING · TRACELESS · RANK FIVE · SCHUR · COLLIDERS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}
const sup = n => String(n).split('').map(c => '⁰¹²³⁴⁵⁶⁷⁸⁹'['0123456789'.indexOf(c)] || (c === '-' ? '⁻' : c)).join('');

/* ======================================================================= */
/*                            scene 1 · THE SECOND EXAM                      */
/* ======================================================================= */
SCENES.hook = S => {
  rfTitle(S);
  const a = clamp((S.u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - S.u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed']]);
  /* line 0: three couplings meeting high up (schematic) */
  const ca = a * at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  if (ca > 0.003) {
    const x0 = 420, x1 = 1500, mx = 1380, my = 330, ys = [700, 560, 430], cols = [C.cyan, C.mag, C.white];
    const g = ease(at(S, 0, 2.4));
    ys.forEach((y0, i) => curve(k => { const s = k * g; return [lerp(x0, mx, s), lerp(y0, my, Math.pow(s, 0.8))]; }, 60, cols[i], ca, 3.5));
    if (g > 0.95) { ring(mx, my, 26, C.now, ca, 3); dot(mx, my, 10, 'w', ca); }
    txt('high energy · 高能交汇', mx, my - 46, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: ca * clamp((g - 0.8) * 5) });
    txt('half the exam · 半张考卷', W / 2, 790, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.now, a: ca * Q(S, 0, 'half the exam', 0.5) });
    rfTag(x0, 760, 'schematic · 示意', C.argued, ca);
  }
  /* line 1: the targets */
  const ta = a * at(S, 1, 0.6);
  if (ta > 0.003) {
    panel(130, 200, 760, 420, ta, C.cyan, 'ELECTROWEAK TARGETS · 电弱匹配目标');
    rfRich([['m', C.white], ['H', C.white, 'sub'], [' = 125.25 GeV', C.now]], 170, 300, { size: 44, a: ta });
    rfRich([['v = 246.22 GeV', C.white]], 170, 370, { size: 40, a: ta * Q(S, 1, 'Higgs mass', 0.5) });
    const ra = ta * Q(S, 1, 'Higgs mass', 0.5, 0.8);
    rfRich([['λ(M', C.white], ['Z', C.white, 'sub'], [') = m', C.white], ['H', C.white, 'sub'], ['²/(2v²) ≈ ', C.white], ['0.12938', C.cyan]], 170, 440, { size: 32, a: ra });
    rfRich([['‖𝒜‖ < 8π ≈ ', C.white], ['25.13274', C.cyan]], 170, 500, { size: 32, a: ra });
    txt('tree boundary · contact unitarity · 树级边界 · 接触幺正界', 170, 580, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ra });
  }
  /* lines 2–3: the two-loop wall on a log ladder of GeV² */
  const la = a * at(S, 2, 0.6);
  if (la > 0.003) {
    const X0 = 1080, Y0 = 790, Ht = 560, top = 27, Y = e => Y0 - e / top * Ht;
    panel(980, 180, 820, 650, la, C.mag, 'HIGGS MASS² · 希格斯质量平方  (log₁₀ GeV²)');
    line(X0, Y0, X0, Y(top), C.dim, la, 2);
    for (let e = 0; e <= 25; e += 5) { line(X0 - 8, Y(e), X0, Y(e), C.dim, la, 2); txt(`10${sup(e)}`, X0 - 16, Y(e) + 7, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: la }); }
    const eTree = Math.log10(RF.mH * RF.mH / 2), BT = X0 + 40, BW = X0 + 200, LX = X0 + 400;
    fillBox(BT, Y(eTree), 120, Y0 - Y(eTree), C.cyan, la * 0.55); box(BT, Y(eTree), 120, Y0 - Y(eTree), C.cyan, la, 2);
    txt('125.25²/2', BT + 60, Y(eTree) - 40, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: la });
    txt('tree · 树级', BT + 60, Y(eTree) - 12, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: la });
    const grow = ease(Q(S, 2, 'push the Higgs mass squared', 2.6));
    const eWall = Math.log10(1.05e26), eNow = lerp(eTree, eWall, grow);
    if (grow > 0) {
      fillBox(BW, Y(eNow), 120, Y0 - Y(eNow), C.mag, la * 0.5); box(BW, Y(eNow), 120, Y0 - Y(eNow), C.mag, la, 2);
      txt('two-loop · 两圈', BW + 60, Y(eNow) - 14, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.mag, a: la });
    }
    const wa = la * Q(S, 3, 'every term', 0.5);
    if (wa > 0.003) {
      txt('#11661 (1.0496, 1.0503)', LX, 290, { size: 20, fam: F.mono, w: 700, c: C.white, a: wa });
      txt('#11934 (1.0428, 1.0440)', LX, 322, { size: 20, fam: F.mono, w: 700, c: C.white, a: wa });
      txt('× 10²⁶ GeV²', LX, 354, { size: 20, fam: F.mono, w: 700, c: C.white, a: wa });
      txt('every term > 0 · 每一项为正', LX, 398, { size: 20, fam: F.zh, w: 700, c: C.mag, a: wa });
      const ka = la * Q(S, 3, 'about 1.05', 0.5, 0.6);
      arrow(X0 + 360, Y(eTree), X0 + 360, Y(eWall), C.now, ka, 3);
      txt('× 1.34 × 10²²', LX, 560, { size: 34, fam: F.mono, w: 700, c: C.now, a: ka });
      txt('the tree value · 树级值', LX, 598, { size: 20, fam: F.zh, w: 700, c: C.white, a: ka });
      txt('NUM · certificate · 证书', LX, 640, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: ka });
    }
  }
};

/* ======================================================================= */
/*                           scene 2 · TRACELESS PORTAL                      */
/* ======================================================================= */
SCENES.traceless = S => {
  const a = rfFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, null, 'argued'], [3, null, 'computed']]);
  /* left: 16 real components, 12 coloured at −F (cyan, down), 4 uncoloured at +3F (magenta, up) */
  const X0 = 170, Y0 = 470, bw = 34, gap = 10, unit = 70;
  panel(120, 190, 860, 560, a, C.cyan, 'ONE (4, 2, 1) LAYER · 一个标量层');
  line(X0 - 20, Y0, X0 + 16 * (bw + gap) + 10, Y0, C.dim, a, 2);
  const g = ease(at(S, 0, 1.6));
  for (let i = 0; i < 16; i++) {
    const col = i < 12 ? C.cyan : C.mag, h = (i < 12 ? -1 : 3) * unit * g, x = X0 + i * (bw + gap) + (i >= 12 ? 24 : 0);
    const ya = Math.min(Y0, Y0 - h), hh = Math.abs(h);
    fillBox(x, ya, bw, hh, col, a * 0.5); box(x, ya, bw, hh, col, a, 2);
  }
  txt('12 coloured · 有色  −F', X0, Y0 + unit + 50, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: a * g });
  txt('4 uncoloured · 无色  +3F', X0 + 12 * (bw + gap) + 24, Y0 - 3 * unit - 18, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.mag, a: a * g });
  const sa = a * at(S, 1, 0.6);
  if (sa > 0.003) {
    rfRich([['12·(−F) + 4·(3F) = ', C.white], ['0', C.now]], X0, 690, { size: 40, a: sa });
    txt('one-loop tadpole cancels layer by layer · 一圈蝌蚪逐层抵消', X0, 730, { size: 20, fam: F.zh, w: 700, c: C.dim, a: sa });
  }
  /* right: the width the portal would need, against what the crossings have */
  const wa = a * at(S, 2, 0.6);
  if (wa > 0.003) {
    const AX = 1080, AW = 680, AY = 470, Xw = w => AX + w / 4 * AW;
    panel(1030, 190, 780, 560, wa, C.argued, 'SPECTRAL WIDTH · 谱宽  log(Q / m_min)');
    arrow(AX, AY, AX + AW + 30, AY, C.dim, wa, 2);
    for (let k = 0; k <= 4; k++) { line(Xw(k), AY - 8, Xw(k), AY + 8, C.dim, wa, 2); txt(String(k), Xw(k), AY + 36, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: wa }); }
    dashed(Xw(RF.needW), AY - 160, Xw(RF.needW), AY + 10, C.white, wa, 3);
    txt('need > 3.45 · 需要', Xw(RF.needW) + 110, AY - 210, { size: 26, fam: F.zh, w: 700, align: 'right', c: C.white, a: wa });
    txt('Q/m_min > e^3.45 > 31.50039', Xw(RF.needW) + 110, AY - 176, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: wa });
    const ha = a * at(S, 3, 0.6);
    if (ha > 0.003) {
      const gr = ease(at(S, 3, 1.4));
      fillBox(AX, AY - 120, (Xw(RF.w35) - AX) * gr, 44, C.cyan, ha * 0.5); box(AX, AY - 120, (Xw(RF.w35) - AX) * gr, 44, C.cyan, ha, 2);
      txt('#35 window  < 3.272', AX + 12, AY - 88, { size: 22, fam: F.mono, w: 700, c: C.white, a: ha * clamp(gr * 2 - 1) });
      fillBox(AX, AY - 64, (Xw(RF.w172) - AX) * gr, 44, C.cyan, ha * 0.3); box(AX, AY - 64, (Xw(RF.w172) - AX) * gr, 44, C.cyan, ha, 2);
      txt('172 layers < 1.787583', AX + 10, AY - 34, { size: 19, fam: F.mono, w: 700, c: C.white, a: ha * clamp(gr * 2 - 1) });
      const ea = a * Q(S, 3, 'Every traceless', 0.5);
      txt('any arc inertia ρ > 0 · 任意弧内惯性', AX, AY + 100, { size: 22, fam: F.zh, w: 700, c: C.white, a: ha });
      rfRich([['Δ', C.white], ['pole', C.white, 'sub'], [' > 6.8122 × 10²³ GeV²', C.white]], AX, AY + 160, { size: 30, a: ea });
      txt('NUM · interval certificate · 区间证书', AX, AY + 200, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: ea });
      stamp('EXCLUDED', 1650, 566, Q(S, 3, 'Every traceless', 0.5), C.mag, 30, -0.06);
    }
  }
};

/* ======================================================================= */
/*                            scene 3 · RANK FIVE FLOOR                      */
/* ======================================================================= */
SCENES.rank = S => {
  const a = rfFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, '31.975', 'computed']]);
  /* left: the rank-five portal spectrum */
  panel(120, 190, 640, 620, a, C.cyan, 'NEUTRAL PORTAL · 中性无迹门户');
  rfRich([['P = p (5 v v* − I) / 4', C.white]], 160, 270, { size: 34, a });
  txt('|vᵢ| = 1/√5 · rank d = 5 · 秩 5', 160, 312, { size: 22, fam: F.zh, w: 700, c: C.dim, a });
  const ea = a * Q(S, 2, 'Rank five fits', 0.6);
  const EY = 560, U = 150, ex = [220, 330, 420, 510, 600];
  line(170, EY, 720, EY, C.dim, a, 2);
  txt('0', 150, EY + 8, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a });
  const ev = [1, -0.25, -0.25, -0.25, -0.25];
  ev.forEach((e, i) => {
    const y = EY - e * U * ease(at(S, 0, 1.4));
    line(ex[i], EY, ex[i], y, e > 0 ? C.mag : C.cyan, a, 3);
    dot(ex[i], y, 12, e > 0 ? 'm' : 'c', a);
  });
  txt('+p', ex[0] + 22, EY - U + 8, { size: 28, fam: F.mono, w: 700, c: C.mag, a });
  txt('4 × (−p/4)', 465, EY - 0.25 * -U + 50, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a });
  rfRich([['tr P = p − 4·(p/4) = ', C.white], ['0', C.now]], 160, 700, { size: 32, a: a * at(S, 0, 0.6, 1.2) });
  if (ea > 0.003) {
    txt('p ∈ (1.90453, 1.93017)', 160, 760, { size: 24, fam: F.mono, w: 700, c: C.white, a: ea });
  }
  /* right: the contact floor against 8π, by rank */
  const X0 = 940, Y0 = 760, H0 = 520, lo = 22, hi = 34, Y = z => Y0 - (z - lo) / (hi - lo) * H0;
  const fa = a * at(S, 1, 0.6);
  panel(820, 190, 990, 620, fa, C.white, 'CONTACT FLOOR · 接触强度下界  ∝ 1/(d − 1)');
  if (fa <= 0.003) return;
  line(X0, Y0, X0, Y(hi), C.dim, fa, 2);
  for (let z = 22; z <= 34; z += 2) { line(X0 - 8, Y(z), X0, Y(z), C.dim, fa, 2); txt(String(z), X0 - 14, Y(z) + 7, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: fa }); }
  const cl = a * Q(S, 2, 'eight pi', 0.5);
  if (cl > 0.003) {
    dashed(X0, Y(RF.eightPi), 1780, Y(RF.eightPi), C.white, cl, 3);
    txt('unitarity ceiling · 幺正天花板', 1780, Y(RF.eightPi) - 46, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.white, a: cl });
    txt('8π ≈ 25.133', 1780, Y(RF.eightPi) - 14, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.white, a: cl });
  }
  const cols = { 2: 990, 3: 1140, 4: 1290, 5: 1450 }, bw = 110;
  for (let d = 2; d <= 5; d++) {
    const da = fa * (d < 5 ? Q(S, 1, 'Up to rank four', 0.5, (d - 2) * 0.25) : ea);
    if (da <= 0.003) continue;
    const fl = rfFloor(d), x = cols[d], yt = Math.max(Y(hi), Y(fl)), live = d === 5 ? C.cyan : C.mag;
    fillBox(x, yt, bw, Y0 - yt, live, da * 0.35); box(x, yt, bw, Y0 - yt, live, da, 2);
    if (fl > hi) { arrow(x + bw / 2, yt + 40, x + bw / 2, yt - 6, live, da, 3); }
    const ly = d === 5 ? Y0 - 16 : fl > hi ? yt + 70 : yt - 14;
    txt(`≥ ${fl.toFixed(d === 4 ? 3 : 2)}`, x + bw / 2, ly, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: da });
    txt(`d = ${d}`, x + bw / 2, Y0 + 34, { size: 24, fam: F.mono, w: 700, align: 'center', c: d === 5 ? C.now : C.white, a: da });
  }
  if (ea > 0.003) {
    /* the constructed rank-five diagonal, amber: the current case */
    const x = cols[5] - 15, y1 = Y(RF.diag5[1]), y0 = Y(RF.diag5[0]);
    fillBox(x, y1, bw + 30, y0 - y1, C.now, ea * 0.55); box(x, y1, bw + 30, y0 - y1, C.now, ea, 2.5);
    txt('24.271 – 24.931', x + bw + 46, y0 - 6, { size: 20, fam: F.mono, w: 700, c: C.now, a: ea });
    txt('rank-five fit · 秩五解', x + bw + 46, y0 + 24, { size: 18, fam: F.zh, w: 700, c: C.now, a: ea });
  }
  const ma = a * at(S, 3, 0.6);
  if (ma > 0.003) {
    panel(980, 420, 440, 130, ma, C.now, null, { fill: 'rgba(4,10,24,0.94)' });
    txt('minimal rank = 5 · 最小秩 5', 1200, 478, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.now, a: ma });
    txt('#78, #288 windows → 6 · 升为 6', 1200, 522, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: a * Q(S, 3, 'other zero windows', 0.5) });
  }
};

/* ======================================================================= */
/*                              scene 4 · SCHUR CHECK                        */
/* ======================================================================= */
SCENES.schur = S => {
  const a = rfFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, 'Lean', 'lean'], [3, null, 'computed']]);
  /* the theorem, green */
  const la = a * Q(S, 0, 'block Schur theorem', 0.6);
  panel(120, 190, 1680, 270, la, C.lean, 'BLOCK SCHUR MINIMUM · 分块舒尔补极小值');
  if (la > 0.003) {
    /* the block matrix */
    const mx = 190, my = 250;
    ctx.save(); ctx.globalAlpha = la; ctx.strokeStyle = C.white; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(mx + 14, my); ctx.lineTo(mx, my); ctx.lineTo(mx, my + 140); ctx.lineTo(mx + 14, my + 140);
    ctx.moveTo(mx + 216, my); ctx.lineTo(mx + 230, my); ctx.lineTo(mx + 230, my + 140); ctx.lineTo(mx + 216, my + 140); ctx.stroke(); ctx.restore();
    txt('A', mx + 60, my + 56, { size: 40, fam: F.math, w: 700, align: 'center', c: C.white, a: la });
    txt('B', mx + 170, my + 56, { size: 40, fam: F.math, w: 700, align: 'center', c: C.white, a: la });
    txt('Bᴴ', mx + 60, my + 120, { size: 40, fam: F.math, w: 700, align: 'center', c: C.white, a: la });
    txt('C', mx + 170, my + 120, { size: 40, fam: F.math, w: 700, align: 'center', c: C.now, a: la });
    const ha = la * at(S, 1, 0.6);
    txt('A = Aᴴ ,  C ≻ 0', 480, 280, { size: 32, fam: F.math, w: 700, c: C.white, a: ha });
    txt('min over y · 对内部变量 y 取最小', 480, 322, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ha });
    const ra = la * Q(S, 2, 'The least value', 0.6);
    rfRich([['least value = x* S x ,   S = A − B C⁻¹ Bᴴ', C.lean]], 480, 392, { size: 34, a: ra });
    txt('IsLeast', 1660, 280, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.lean, a: ra });
    rfLean(160, 440, la * Q(S, 0, 'Lean has checked', 0.5), 18);
  }
  /* the 1 × 1 worked instance: q(y) = 3 + 4y + 4y², least value 2 at y = −1/2 */
  const wa = a * at(S, 1, 0.6, 1.0);
  panel(120, 490, 980, 340, wa, C.cyan, 'WORKED EXAMPLE · 手算  A = 3, B = 2, C = 4, x = 1');
  if (wa > 0.003) {
    const PX = 180, PW = 460, PY = 800, PH = 250, ylo = -1.75, yhi = 0.75, qmax = 9;
    const gx = y => PX + (y - ylo) / (yhi - ylo) * PW, gy = q => PY - q / qmax * PH;
    line(PX, PY, PX + PW, PY, C.dim, wa, 2);
    txt('y', PX + PW + 14, PY + 6, { size: 22, fam: F.math, w: 700, c: C.dim, a: wa });
    curve(k => { const y = lerp(ylo, yhi, k); return [gx(y), gy(Math.min(qmax, rfQ(y)))]; }, 80, C.cyan, wa, 3);
    dashed(PX, gy(RF_S), PX + PW, gy(RF_S), C.lean, wa * 0.9, 2);
    /* the amber point slides down to the minimum as line 2 is spoken */
    const s = ease(at(S, 2, 2.2)), yy = lerp(0.6, RF_YSTAR, s);
    dot(gx(yy), gy(rfQ(yy)), 14, 'g', wa);
    ring(gx(yy), gy(rfQ(yy)), 16, C.now, wa, 2.5);
    txt('q(y) = 3 + 4y + 4y²', 700, 570, { size: 30, fam: F.math, w: 700, c: C.white, a: wa });
    const ca = wa * at(S, 2, 0.6, 0.6);
    rfRich([['= 2 + 4(y + ½)²', C.white]], 700, 620, { size: 30, a: ca });
    rfRich([['min = ', C.white], ['2', C.now], [' = 3 − 2²/4', C.white]], 700, 690, { size: 30, a: ca });
    txt('at y = −½ · 在 y = −½ 处取到', 700, 732, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ca });
    txt('NUM · numbers chosen · 数值为示例', 700, 800, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: wa });
  }
  /* line 3: the chapter's certificate for 8π I ± 𝒜 */
  const ma = a * at(S, 3, 0.6);
  panel(1140, 490, 660, 340, ma, C.cyan, 'RANK-FIVE CHECK · 秩五检验');
  if (ma > 0.003) {
    txt('8π I ± 𝒜  ≻ 0 ?', 1180, 580, { size: 36, fam: F.math, w: 700, c: C.white, a: ma });
    txt('eliminate the heavy block C · 消去重场块', 1180, 626, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ma });
    rfRich([['Schur margin > ', C.white], ['3.11842', C.now]], 1180, 704, { size: 38, a: a * Q(S, 3, 'margin above', 0.5) });
    txt('NUM · the chapter\'s certificate · 本章证书', 1180, 760, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: ma });
    txt('‖𝒜‖ < 8π', 1180, 800, { size: 24, fam: F.math, w: 700, c: C.white, a: a * Q(S, 3, 'margin above', 0.5) });
  }
};

/* ======================================================================= */
/*                            scene 5 · LOW-ENERGY PINCH                     */
/* ======================================================================= */
SCENES.pinch = S => {
  const a = rfFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [3, null, 'argued']]);
  const ia = a * at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (ia > 0.003) {
    txt('broken vacuum balance → light partners', W / 2, 420, { size: 44, fam: F.disp, w: 700, align: 'center', c: C.white, a: ia });
    txt('破缺真空配平 → 轻伙伴 → 对撞机', W / 2, 480, { size: 32, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ia });
    txt('in this model · 在这个模型里', W / 2, 560, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ia });
  }
  const PW = 820, PH = 300, PXs = [120, 980], PYs = [190, 520];
  /* LEP: Z width */
  const za = a * at(S, 1, 0.6);
  panel(PXs[0], PYs[0], PW, PH, za, C.mag, 'LEP · Z WIDTH · Z 宽度');
  if (za > 0.003) {
    const sc = 36, x0 = 170;
    const g = ease(at(S, 1, 1.6, 0.6));
    fillBox(x0, 270, RF.zAdd[0] * sc * g, 50, C.mag, za * 0.5); box(x0, 270, RF.zAdd[0] * sc * g, 50, C.mag, za, 2);
    txt('+17.59 – 17.75 MeV  (20 charged · 带电)', x0, 352, { size: 22, fam: F.zh, w: 700, c: C.mag, a: za });
    fillBox(x0, 390, RF.zErr * sc, 50, C.cyan, za * 0.5); box(x0, 390, RF.zErr * sc, 50, C.cyan, za, 2);
    txt('±2.3 MeV  LEP  (2495.2)', x0 + RF.zErr * sc + 20, 424, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: za });
    txt('≈ 7.6 × the error · 误差的 7.6 倍', x0, 474, { size: 22, fam: F.zh, w: 700, c: C.white, a: za * Q(S, 1, "LEP's error", 0.5) });
  }
  /* CLEO: χ² */
  const ca = a * at(S, 2, 0.6);
  panel(PXs[1], PYs[0], PW, PH, ca, C.cyan, 'CLEO · 7 POINTS 6.964–10.538 GeV · χ²');
  if (ca > 0.003) {
    const x0 = 1030, sc = 22;
    fillBox(x0, 270, RF.chiN * sc, 50, C.cyan, ca * 0.5); box(x0, 270, RF.chiN * sc, 50, C.cyan, ca, 2);
    txt('6 neutral · 中性  χ² ≈ 6.05', x0 + RF.chiN * sc + 20, 304, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: ca });
    const ra = a * Q(S, 2, 'against at least', 0.5);
    fillBox(x0, 370, RF.chiC[0] * sc, 50, C.mag, ra * 0.5); box(x0, 370, RF.chiC[0] * sc, 50, C.mag, ra, 2);
    dashed(x0 + RF.chiC[0] * sc, 395, x0 + RF.chiC[1] * sc, 395, C.mag, ra, 3);
    ring(x0 + RF.chiC[1] * sc, 395, 6, C.mag, ra, 2);
    txt('20 charged · 带电  13.54 – 29.30', x0, 466, { size: 22, fam: F.zh, w: 700, c: C.mag, a: ra });
  }
  /* OPAL: the charged singlet at 80.38 GeV */
  const oa = a * at(S, 3, 0.6);
  panel(PXs[0], PYs[1], 1680, PH, oa, C.argued, 'OPAL · CHARGED SINGLET S · 带电单态 (|Q| = 1)');
  if (oa > 0.003) {
    const MX = 200, MW = 1100, MY = 700, M = m => MX + (m - 60) / 50 * MW;
    arrow(MX, MY, MX + MW + 20, MY, C.dim, oa, 2);
    for (const m of [60, 70, 80, 90, 100, 110]) { line(M(m), MY - 6, M(m), MY + 6, C.dim, oa, 2); txt(String(m), M(m), MY + 32, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: oa }); }
    const xa = oa * Q(S, 3, 'OPAL excludes', 0.5);
    fillBox(M(60), MY - 50, M(RF.opal) - M(60), 40, C.mag, xa * 0.3);
    line(M(RF.opal), MY - 70, M(RF.opal), MY + 8, C.mag, xa, 3);
    txt('98.0 GeV long-lived limit · 长寿命下限', M(RF.opal) - 8, MY - 80, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.mag, a: xa });
    dot(M(RF.mS), MY - 30, 13, 'g', oa);
    txt('S · 80.38 GeV', M(RF.mS), MY + 74, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.now, a: oa });
    txt('purely gauge-produced, τ > 1 μs: excluded', 1360, 620, { size: 20, fam: F.zh, w: 700, c: C.white, a: xa });
    txt('仅靠规范产生且寿命 > 1 μs 的分支：排除', 1360, 656, { size: 20, fam: F.zh, w: 700, c: C.white, a: xa });
    txt('a prompt decay is needed · 须迅速衰变', 1360, 720, { size: 20, fam: F.zh, w: 700, c: C.argued, a: xa });
  }
};

/* ======================================================================= */
/*                             scene 6 · QUESTION ONE                        */
/* ======================================================================= */
SCENES.open = S => {
  const a = rfFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'open']]);
  const wa = a * at(S, 0, 0.6) * (1 - at(S, 2, 0.6));
  if (wa > 0.003) {
    panel(120, 190, 640, 230, wa, C.argued, 'WHAT WE HAVE · 已有的');
    txt('model-internal witnesses', 150, 280, { size: 32, fam: F.disp, w: 700, c: C.white, a: wa });
    txt('模型内见证 · 输入是选定与拟合的', 150, 324, { size: 24, fam: F.zh, w: 700, c: C.argued, a: wa });
    txt('not derivations · 不是推导', 150, 380, { size: 26, fam: F.zh, w: 700, c: C.white, a: wa * Q(S, 0, 'not derivations', 0.5) });
  }
  const oa = a * at(S, 1, 0.6) * (1 - at(S, 2, 0.6));
  if (oa > 0.003) {
    panel(820, 190, 980, 600, oa, C.open, 'OPEN · QUESTION 1 · 第一问');
    const rows = [
      ['thresholds & matching from the partition function', '配分函数内生阈值与匹配处方'],
      ['UV take-over above the perturbative ceilings', '微扰封顶之上的紫外接管'],
      ['EW scale & portal rank without 10²¹⁻²³ tuning', '无精细调节的电弱标度与门户秩'],
      ['broken vacuum vs. collider data', '破缺真空配平与对撞机数据自洽']
    ];
    rows.forEach(([en, zh], i) => {
      const ra = oa * at(S, 1, 0.5, 0.8 + 0.7 * i);
      const y = 290 + i * 122;
      txt(`${i + 1}`, 860, y + 14, { size: 44, fam: F.orb, w: 900, c: C.open, a: ra });
      txt(en, 920, y, { size: 28, fam: F.disp, w: 700, c: C.white, a: ra });
      txt(zh, 920, y + 40, { size: 24, fam: F.zh, w: 700, c: C.open, a: ra });
    });
    txt('prob-ou-ch06-question1-open', 860, 770, { size: 18, fam: F.mono, w: 700, c: C.dim, a: oa });
  }
  const qa = a * at(S, 2, 0.7);
  if (qa > 0.003) {
    txt('The walls are measured.', W / 2, 440, { size: 64, fam: F.disp, w: 700, align: 'center', c: C.white, a: qa, ab: 2 });
    txt('The door is not yet found.', W / 2, 540, { size: 64, fam: F.disp, w: 700, align: 'center', c: C.open, a: qa * Q(S, 2, 'The door', 0.6), ab: 2 });
    txt('墙都量清了，门还没有找到。', W / 2, 630, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.dim, a: qa });
  }
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
  const sc = TL.scenes[0], t = sc.end - 1.0;
  background(t, sc, 0, 6);
  txt(DATA.film.title_zh, W / 2, 300, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('THE RANK-FIVE PORTAL', W / 2, 390, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 2, ls: 5 });
  /* the floor chart in miniature: ranks 2–5 against 8π */
  const X0 = 560, Y0 = 820, H0 = 320, lo = 22, hi = 34, Y = z => Y0 - (z - lo) / (hi - lo) * H0;
  for (let d = 2; d <= 5; d++) {
    const fl = rfFloor(d), x = X0 + (d - 2) * 220, yt = Math.max(Y(hi), Y(fl)), col = d === 5 ? C.cyan : C.mag;
    fillBox(x, yt, 120, Y0 - yt, col, 0.35); box(x, yt, 120, Y0 - yt, col, 1, 2);
    txt(`d = ${d}`, x + 60, Y0 + 34, { size: 26, fam: F.mono, w: 700, align: 'center', c: d === 5 ? C.now : C.white });
  }
  const x5 = X0 + 3 * 220 - 20;
  fillBox(x5, Y(RF.diag5[1]), 160, Y(RF.diag5[0]) - Y(RF.diag5[1]), C.now, 0.6);
  dashed(X0 - 40, Y(RF.eightPi), X0 + 3 * 220 + 180, Y(RF.eightPi), C.white, 1, 3);
  txt('8π', X0 - 56, Y(RF.eightPi) + 8, { size: 30, fam: F.math, w: 700, align: 'right', c: C.white });
  bloom(0.5);
  txt(`${DATA.book.code} · FILM`, W / 2, 920, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
