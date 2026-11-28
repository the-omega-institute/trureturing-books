/* Film · The Four-Question Ledger · 四问总账 (book omega-unification, chapter 15).
   Scenes for the shared engine theme/film/engine.js.

   What each scene shows, and where it rests (all from chapter 15, §15.1–15.3):
     verdict   the book's verdict: 4/4 model-internal witnesses, 0/4 zero-fit first-principles derivations (argued:
               the book's own reading of its ledger; the counts are recomputed from the sheet rows below).
     sheet     the four-question balance sheet of §15.1, one key number per cell copied from the chapter table:
               α_s(M_Z) ≈ 0.1184 given d = 724, k = 32; 67 of the first 8,192 zeros at cut 9; |V_ub|², J to
               +1.33 / +0.81 ppm on zero #2,306,888,100,085; curvature 0.99941058 × target on #28325. Every left cell
               is a model-internal witness conditional on chosen inputs (argued, MODEL); every right cell is open.
     tensions  the five structural tensions of §15.2 with their certificate numbers (computed, interval or exact
               rational certificates of the replay archive): forced code 32071996606 against reference 32071992476
               (difference 4,130, recomputed); 27 → 105 windings and the 100-dimensional feasible family; five
               selection rules, five winners (distinctness recomputed); heavy Yukawa norm > 16.63 and quartic trace
               > 3.45 × 10³⁴ GeV²; ΛG > 0.01180 against Λℓ_P² ~ 10⁻¹²² (≈ 120 orders, recomputed). The floating-log
               picture is schematic (argued).
     problems  the four refined open problems of §15.3 (open: problem environments, no lean attribute).
     exam      the interlocking of §15.3's closing paragraph: Q1 → Q3, Q2 → Q1, Q2 → Q4, Q4 → Q1, Q4 → Q3 (argued),
               and the one exam any future master connection must pass (open).
   The chapter cites no Lean theorem of its own; film.json "lean" is empty and no green badge appears.

   On load, FILM.init re-derives every number recomputed on screen by an independent route; any disagreement is
   pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                               ledger data                               */
/* ======================================================================= */
const FQ_ROWS = [
  { tag: '[1] GAUGE', zh: '规范交汇与电弱尺度', wit: 'α_s(M_Z) ≈ 0.1184', witNote: 'given field table, thresholds, d = 724, k = 32',
    gap: 'm_H · v/M_P · thresholds', gapNote: 'from one partition function, no fit' },
  { tag: '[2] GENERATIONS', zh: '手征三代与四维格点', wit: '67 of 8,192 zeros', witNote: 'cut 9: three light modes in all five charges',
    gap: 'why exactly three?', gapNote: 'dynamics, not a chosen cut' },
  { tag: '[3] FLAVOR', zh: '味谱层级、混合与质子', wit: '+1.33 / +0.81 ppm', witNote: '|V_ub|² and J on zero #2,306,888,100,085',
    gap: 'one flavor law · c₆', gapNote: 'across zeros, no per-zero retuning' },
  { tag: '[4] GRAVITY', zh: '四维引力与暗能量', wit: '0.99941058 × target', witNote: 'spin-2 pole; layers (−1, 3, −3, 1) on #28325',
    gap: 'G_N · Λℓ_P² ~ 10⁻¹²²', gapNote: 'non-circular, radiatively stable' }
];
/* the witnesses reached and the zero-fit derivations completed, per row (chapter 15 §15.1) */
const FQ_WITNESSED = [true, true, true, true], FQ_DERIVED = [false, false, false, false];
const FQ_COUNT = arr => arr.filter(Boolean).length;
/* §15.2.1: forced 35-bit seventh-time code and its reference */
const FQ_CODE = 32071996606, FQ_REF = 32071992476;
/* §15.2.3: the five selection rules and their winners */
const FQ_WINNERS = [['#10875', 'bare spectral weight'], ['#11737', 'low-energy box volume'], ['#11488', 'six-mass bare weight'],
  ['#11431', 'minimal flavor port gain'], ['#11618', 'total many-body vacuum energy']];
/* §15.2.5: induced ΛG floor and the observed target */
const FQ_LG = 0.01180, FQ_TARGET_EXP = -122;
/* §15.1 row 4: four-layer curvature hit on #28325 and the "within 0.2 percent" claim */
const FQ_CURV = 0.99941058;
/* §15.3: which problem constrains which (closing paragraph of §15.3) */
const FQ_LINKS = [[1, 3, 'zero & background'], [2, 1, 'thresholds'], [2, 4, 'vacuum count'], [4, 1, 'Higgs portal'], [4, 3, 'heavy Yukawas']];

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  const check = (ok, m) => { if (!ok) E.push('four-question-ledger film: ' + m); };
  check((DATA.lean || []).length === 0, 'chapter 15 cites no Lean theorem: film.json "lean" must stay empty');
  check(FQ_ROWS.length === 4 && FQ_COUNT(FQ_WITNESSED) === 4 && FQ_COUNT(FQ_DERIVED) === 0, 'the verdict is 4/4 witnesses and 0/4 derivations');
  /* 4,130 steps: by digit-wise subtraction of the two decimal strings */
  {
    const a = String(FQ_CODE), b = String(FQ_REF);
    let borrow = 0, out = '';
    for (let i = a.length - 1; i >= 0; i--) { let d = (+a[i]) - (+b[i]) - borrow; borrow = d < 0 ? 1 : 0; out = String(d + 10 * borrow) + out; }
    check(Number(out) === 4130 && FQ_CODE - FQ_REF === 4130, 'forced code minus reference = 4,130');
    check(FQ_CODE < 2 ** 35 && FQ_CODE >= 2 ** 34, 'the forced code is a 35-bit code');
  }
  check(new Set(FQ_WINNERS.map(w => w[0])).size === 5, 'five selection rules crown five different zeros');
  check(Math.abs(1 - FQ_CURV) < 0.002, 'curvature hit within 0.2 percent');
  check(Math.abs(67 / 8192 - 0.008178711) < 1e-9, '67 / 8192');
  { const orders = Math.log10(FQ_LG) - FQ_TARGET_EXP; check(Math.floor(orders) === 120, `ΛG floor over target spans ${orders} orders`); }
  /* the five links of §15.3 touch every problem, and problems 2 and 4 each constrain two others */
  {
    const out = [0, 0, 0, 0, 0]; FQ_LINKS.forEach(([f]) => out[f]++);
    const touched = new Set(FQ_LINKS.flatMap(([f, t]) => [f, t]));
    check(touched.size === 4 && out[1] === 1 && out[2] === 2 && out[4] === 2 && out[3] === 0, 'interlocking links');
  }
});

/* ======================================================================= */
/*                                 helpers                                 */
/* ======================================================================= */
const fqFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const fqZh = (s, x, y, a, o = {}) => txt(s, x, y, Object.assign({ size: 24, fam: F.zh, w: 700, c: C.white, a }, o));

/* ======================================================================= */
/*                            scene 1 · THE VERDICT                         */
/* ======================================================================= */
SCENES.verdict = S => {
  const a = fqFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* fourteen chapters, feeding the ledger */
  const ca = a * clamp(S.u / 1.2);
  const dimK = 1 - 0.55 * at(S, 1, 0.8);
  for (let i = 0; i < 14; i++) {
    const x = 196 + i * 117;
    chip(x, 222, 92, 46, `CH${i + 1}`, i % 2 ? C.cyan : C.mag, ca * clamp(S.u * 2.2 - i * 0.12) * dimK, 20);
  }
  txt('fourteen chapters · one 19-point Behrend shell · 十四章 · 同一个十九点贝伦德球壳', W / 2, 292, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ca * dimK });
  /* the two counts */
  const la = a * at(S, 1, 0.7);
  panel(250, 340, 640, 400, la, C.argued, 'MODEL-INTERNAL WITNESSES · 模型内见证');
  txt(`${FQ_COUNT(FQ_WITNESSED)} / 4`, 570, 560, { size: 170, fam: F.orb, w: 900, align: 'center', c: C.argued, a: la, ab: 2 });
  for (let i = 0; i < 4; i++) { const sx = 420 + i * 82; fillBox(sx, 600, 56, 56, C.argued, la * 0.85 * clamp(at(S, 1, 0.4, 0.5 + i * 0.25) * 2)); box(sx, 600, 56, 56, C.argued, la, 2); }
  fqZh('explicit, certificate-backed, inside the model', 570, 705, la, { size: 22, align: 'center', c: C.white, fam: F.disp });

  const ra = a * at(S, 2, 0.5);
  panel(1030, 340, 640, 400, ra, C.open, 'ZERO-FIT DERIVATIONS · 无拟合推导');
  const sp = Q(S, 2, 'without fitting', 0.9);
  const pop = 1 + 0.35 * (1 - eo(sp));
  ctx.save(); ctx.translate(1350, 500); ctx.scale(pop, pop);
  txt(`${FQ_COUNT(FQ_DERIVED)} / 4`, 0, 60, { size: 170, fam: F.orb, w: 900, align: 'center', c: C.open, a: ra * clamp(sp * 1.5), ab: 2 });
  ctx.restore();
  for (let i = 0; i < 4; i++) box(1200 + i * 82, 600, 56, 56, C.open, ra, 2);
  fqZh('from one master connection, no post-hoc fit', 1350, 705, ra, { size: 22, align: 'center', c: C.white, fam: F.disp });

  const ba = a * at(S, 3, 0.7);
  txt('both true at once · 两个数字同时为真', W / 2, 805, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.now, a: ba });
};

/* ======================================================================= */
/*                          scene 2 · THE BALANCE SHEET                     */
/* ======================================================================= */
const SH = { x0: 140, xL: 450, wL: 640, xR: 1120, wR: 660, y0: 248, rh: 128 };
SCENES.sheet = S => {
  const a = fqFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [5, 'still open', 'open']]);
  /* header */
  txt('QUESTION · 统一问题', SH.x0, 222, { size: 20, fam: F.mono, w: 700, c: C.dim, a, ls: 2 });
  txt('WITNESS IN THE MODEL · 模型内见证  4/4', SH.xL, 222, { size: 20, fam: F.mono, w: 700, c: C.argued, a, ls: 2 });
  txt('ZERO-FIT GAP · 第一性原理缺口  0/4', SH.xR, 222, { size: 20, fam: F.mono, w: 700, c: C.open, a, ls: 2 });
  line(SH.x0, 234, SH.xR + SH.wR, 234, C.dim, a * 0.8, 1.5);
  const gapOn = Q(S, 5, 'still open', 0.6);
  let cur = -1; for (let k = 0; k < 4; k++) if (S.u >= lineAt(S, k).s) cur = k;
  if (S.u >= lineAt(S, 4).s) cur = -1;
  FQ_ROWS.forEach((r, k) => {
    const y = SH.y0 + k * SH.rh, ra = a * at(S, k, 0.6);
    /* row label */
    txt(r.tag, SH.x0, y + 52, { size: 26, fam: F.orb, w: 900, c: k === cur ? C.now : C.white, a: Math.max(ra, a * 0.35) });
    fqZh(r.zh, SH.x0, y + 88, Math.max(ra, a * 0.35) * 0.9, { size: 22, c: C.dim });
    /* witness cell */
    const lit = at(S, 4, 0.6);
    box(SH.xL, y + 8, SH.wL, SH.rh - 16, k === cur ? C.now : C.argued, ra * (k === cur ? 1 : 0.6 + 0.4 * lit), k === cur ? 2.5 : 1.5, 'rgba(4,10,24,0.6)');
    txt(r.wit, SH.xL + 22, y + 60, { size: 38, fam: F.math, w: 700, c: C.argued, a: ra });
    txt(r.witNote, SH.xL + 22, y + 96, { size: 20, fam: F.disp, w: 700, c: C.white, a: ra * 0.9 });
    /* gap cell: a placeholder until "still open" */
    box(SH.xR, y + 8, SH.wR, SH.rh - 16, C.open, a * (0.35 + 0.65 * gapOn * clamp(gapOn * 4 - k * 0.6)), 1.5, 'rgba(4,10,24,0.6)');
    const ga = a * clamp(gapOn * 3 - k * 0.5);
    if (ga < 1) txt('?', SH.xR + SH.wR / 2, y + 78, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.open, a: a * 0.4 * (1 - ga) });
    txt(r.gap, SH.xR + 22, y + 60, { size: 34, fam: F.math, w: 700, c: C.open, a: ga });
    txt(r.gapNote, SH.xR + 22, y + 96, { size: 20, fam: F.disp, w: 700, c: C.white, a: ga * 0.9 });
  });
  /* the footing of the left column */
  const na = a * at(S, 4, 0.6);
  txt('rests on chosen inputs · 依赖指定的输入', SH.xL, 790, { size: 21, fam: F.zh, w: 700, c: C.argued, a: na });
  txt('witness ≠ derivation', SH.xL, 826, { size: 24, fam: F.math, w: 700, c: C.white, a: na });
  txt('open · 开放', SH.xR, 808, { size: 26, fam: F.zh, w: 700, c: C.open, a: a * gapOn });
};

/* ======================================================================= */
/*                            scene 3 · FIVE TENSIONS                       */
/* ======================================================================= */
const TN = { cx: 500, cy: 500, R: 235 };
const TN_NAMES = [['CLOCK', '算术钟'], ['WINDING', '绕数深度'], ['SELECTION', '选点'], ['YUKAWA', '汤川层级'], ['UV · IR', '紫外·红外']];
const tnPos = (i, push = 0) => {
  const ang = -Math.PI / 2 + i * TAU / 5, r = TN.R + push;
  return [TN.cx + r * Math.cos(ang), TN.cy + r * Math.sin(ang)];
};
SCENES.tensions = S => {
  const a = fqFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [5, null, 'argued']]);
  let cur = 0; for (let k = 0; k < 6; k++) if (S.u >= lineAt(S, k).s) cur = k;
  /* floating log (line 5): press node 0 inward, the others spring out — a schematic */
  const lg = at(S, 5, 1.2, 0.4), wob = Math.sin(clamp((S.u - lineAt(S, 5).s - 0.4) / 2.2) * Math.PI);
  const push = i => lg <= 0 ? 0 : (i === 0 ? -70 : 34) * wob;
  const pos = TN_NAMES.map((_, i) => tnPos(i, push(i)));
  /* springs between every pair */
  for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) dashed(pos[i][0], pos[i][1], pos[j][0], pos[j][1], C.mag, a * 0.38, 1.6);
  TN_NAMES.forEach(([en, zh], i) => {
    const na = a * clamp(S.u / 0.8 - i * 0.12);
    const on = cur === i && cur < 5, col = on ? C.now : C.cyan;
    const [x, y] = pos[i];
    ctx.save(); ctx.globalAlpha = na; ctx.fillStyle = 'rgba(4,10,24,0.92)'; ctx.beginPath(); ctx.arc(x, y, 62, 0, TAU); ctx.fill(); ctx.restore();
    ring(x, y, 62, col, na, on ? 3.5 : 2);
    txt(String(i + 1), x, y - 8, { size: 40, fam: F.orb, w: 900, align: 'center', c: col, a: na });
    txt(en, x, y + 22, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.white, a: na });
    txt(zh, x, y + 46, { size: 17, fam: F.zh, w: 700, align: 'center', c: C.dim, a: na });
  });
  if (lg > 0) {
    txt('press one · another springs up', TN.cx, 840, { size: 22, fam: F.disp, w: 700, align: 'center', c: C.argued, a: a * lg });
    txt('schematic · 示意', TN.cx, TN.cy + 10, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.argued, a: a * lg });
  }
  /* the detail card of the current tension */
  const P = { x: 920, y: 205, w: 860, h: 600 };
  for (let k = 0; k < 6; k++) {
    const st = lineAt(S, k).s, en = k < 5 ? lineAt(S, k + 1).s : S.d;
    const ka = a * clamp((S.u - st) / 0.5) * clamp((en - S.u) / 0.35 + (k === 5 ? 1 : 0));
    if (ka > 0.003) tnCard(k, P, ka);
  }
};
function tnCard(k, P, a) {
  const titles = ['ARITHMETIC CLOCK vs FLAVOR WEIGHT · 算术钟与味谱权', 'WINDING DEPTH vs DEGENERACY · 绕数深度与连续简并',
    'SELECTION SPLIT · 选点分裂', 'YUKAWA HIERARCHY vs VACUUM · 汤川层级与真空回馈', 'UV THRESHOLD vs IR HORIZON · 紫外阈值与红外视界', 'FIVE INTERLOCKING TENSIONS · 五重咬合的张力'];
  panel(P.x, P.y, P.w, P.h, a, k === 5 ? C.argued : C.cyan, titles[k]);
  const x = P.x + 40;
  const cert = (y) => txt('interval / exact certificate · 区间与精确证书', x, y, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: a * 0.9 });
  if (k === 0) {
    txt('forced 35-bit seventh-time code', x, P.y + 92, { size: 24, fam: F.disp, w: 700, c: C.white, a });
    txt(String(FQ_CODE), x, P.y + 170, { size: 64, fam: F.mono, w: 700, c: C.now, a });
    txt(`${FQ_REF}  reference`, x, P.y + 240, { size: 40, fam: F.mono, w: 700, c: C.dim, a });
    txt(`difference = ${(FQ_CODE - FQ_REF).toLocaleString('en-US')} steps`, x, P.y + 320, { size: 40, fam: F.math, w: 700, c: C.cyan, a });
    txt('needs ≥ 44-bit input · held-out J deficit 6.0833%', x, P.y + 390, { size: 26, fam: F.disp, w: 700, c: C.white, a });
    cert(P.y + 560);
  } else if (k === 1) {
    txt('joint vacuum on the 529-triangle torus', x, P.y + 92, { size: 24, fam: F.disp, w: 700, c: C.white, a });
    txt('27  →  105 windings', x, P.y + 180, { size: 60, fam: F.math, w: 700, c: C.now, a });
    txt('three windows only → reference flavor too', x, P.y + 228, { size: 22, fam: F.disp, w: 700, c: C.dim, a });
    txt('then: a 100-dim feasible family', x, P.y + 320, { size: 40, fam: F.math, w: 700, c: C.cyan, a });
    txt('weights 2 × 10⁻⁹ apart, action gap < 1.690 × 10⁻⁷⁵', x, P.y + 390, { size: 26, fam: F.math, w: 700, c: C.white, a });
    cert(P.y + 560);
  } else if (k === 2) {
    txt('five selection rules, five different winning zeros', x, P.y + 92, { size: 24, fam: F.disp, w: 700, c: C.white, a });
    FQ_WINNERS.forEach(([z, rule], i) => {
      const y = P.y + 150 + i * 72;
      chip(x + 90, y, 170, 50, z, C.cyan, a, 26);
      txt(rule, x + 210, y + 9, { size: 26, fam: F.disp, w: 700, c: C.white, a });
    });
    txt(`${new Set(FQ_WINNERS.map(w => w[0])).size} distinct winners`, x, P.y + 560, { size: 22, fam: F.mono, w: 700, c: C.cyan, a });
  } else if (k === 3) {
    txt('fit 9 charged masses + full CKM (three-leg, eight terms)', x, P.y + 92, { size: 24, fam: F.disp, w: 700, c: C.white, a });
    txt('heavy–heavy Yukawa norm  > 16.63', x, P.y + 170, { size: 36, fam: F.math, w: 700, c: C.now, a });
    arrow(x + 200, P.y + 200, x + 200, P.y + 248, C.mag, a, 3);
    txt('quadratic Higgs background', x, P.y + 296, { size: 30, fam: F.disp, w: 700, c: C.mag, a });
    txt('> 3.45 × 10³⁴ GeV²', x, P.y + 356, { size: 48, fam: F.math, w: 700, c: C.mag, a });
    txt('→ breaks the vacuum balance of question 4', x, P.y + 420, { size: 26, fam: F.disp, w: 700, c: C.white, a });
    cert(P.y + 560);
  } else if (k === 4) {
    txt('zero-bare induced gravity on the full heavy spectrum', x, P.y + 92, { size: 24, fam: F.disp, w: 700, c: C.white, a });
    txt(`ΛG  >  ${FQ_LG.toFixed(5)}`, x, P.y + 180, { size: 60, fam: F.math, w: 700, c: C.now, a });
    txt(`target  Λℓ_P²  ~  10⁻¹²²`, x, P.y + 270, { size: 52, fam: F.math, w: 700, c: C.cyan, a });
    txt(`gap ≈ ${Math.floor(Math.log10(FQ_LG) - FQ_TARGET_EXP)} orders of magnitude`, x, P.y + 350, { size: 34, fam: F.math, w: 700, c: C.white, a });
    txt('cutoff shift 7.2 × 10⁻¹¹⁷ flips the curvature sign', x, P.y + 410, { size: 24, fam: F.disp, w: 700, c: C.dim, a });
    cert(P.y + 560);
  } else {
    txt('relieve one tension alone,', x, P.y + 120, { size: 40, fam: F.disp, w: 700, c: C.white, a });
    txt('the strain moves to a neighbor', x, P.y + 180, { size: 40, fam: F.disp, w: 700, c: C.white, a });
    fqZh('只修补一处，张力就挪到相邻的一处', x, P.y + 260, a, { size: 32 });
    txt('the five numbers above are certificates;', x, P.y + 400, { size: 24, fam: F.disp, w: 700, c: C.cyan, a });
    txt('the log is a picture of how they lock together', x, P.y + 440, { size: 24, fam: F.disp, w: 700, c: C.argued, a });
  }
}

/* ======================================================================= */
/*                          scene 4 · FOUR OPEN PROBLEMS                    */
/* ======================================================================= */
const PB = [
  { t: 'Gauge, Higgs, electroweak scale', zh: '规范阈值、希格斯质量与电弱标度', bars: ['α_s(M_Z) with no fitted thresholds', 'm_H = 125.25 GeV  ·  v/M_P ~ 10⁻¹⁷', 'one rule for choosing the zero'] },
  { t: 'Exactly three generations', zh: '三代截断与相互作用手征格点', bars: ['three out of {1, 3, 7, 15}, by dynamics', 'no external cut 9, no chosen min-cut', 'interacting 4D chiral lattice, no doubling'] },
  { t: 'One flavor law, proton fate', zh: '跨零点统一味律与质子算符', bars: ['9 masses + CKM + PMNS across zeros', 'fix 100 free coefficients (105 windings)', 'decide c₆:  ΔB ≡ 0 (mod 3)  or  QQQL'] },
  { t: 'Gravity and dark energy', zh: '洛伦兹引力、牛顿常数与暗能量', bars: ['Lorentzian spin-2 limit, helicity ±2', 'G_N and M_P with no pre-calibration', 'Λℓ_P² ~ 10⁻¹²², no 311 tuned singlets'] }
];
SCENES.problems = S => {
  const a = fqFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'open']]);
  let cur = -1; for (let k = 1; k <= 4; k++) if (S.u >= lineAt(S, k).s) cur = k - 1;
  PB.forEach((p, i) => {
    const ca = a * at(S, i + 1, 0.6);
    if (ca <= 0.003) return;
    const x = i % 2 ? 980 : 140, y = i < 2 ? 200 : 520, w = 800, h = 296;
    const on = i === cur;
    panel(x, y, w, h, ca, on ? C.now : C.open, `OPEN PROBLEM ${i + 1} · 开放问题 ${i + 1}`);
    txt(p.t, x + 28, y + 78, { size: 32, fam: F.disp, w: 700, c: C.open, a: ca });
    fqZh(p.zh, x + 28, y + 116, ca * 0.9, { size: 22, c: C.dim });
    p.bars.forEach((b, j) => {
      const by = y + 168 + j * 44;
      box(x + 28, by - 20, 20, 20, C.open, ca, 2);
      txt(b, x + 64, by, { size: 24, fam: F.math, w: 700, c: C.white, a: ca });
    });
  });
  /* the opening stamp */
  const sp = at(S, 0, 0.9, 0.3);
  const sa = 1 - at(S, 1, 0.5);
  if (sp > 0 && sa > 0) {
    ctx.save(); ctx.globalAlpha = sa; stamp('4 OPEN PROBLEMS', W / 2, 520, sp, C.open, 72, -0.05); ctx.restore();
    fqZh('四个精炼的开放问题 · refined, not solved', W / 2, 660, a * sa * clamp(sp * 2), { size: 28, align: 'center', c: C.open });
  }
};

/* ======================================================================= */
/*                              scene 5 · ONE EXAM                          */
/* ======================================================================= */
const EX_POS = { 1: [330, 300], 3: [800, 300], 2: [330, 700], 4: [800, 700] };
const EX_NAME = { 1: 'gauge · Higgs', 2: 'three generations', 3: 'flavor · proton', 4: 'gravity · Λ' };
SCENES.exam = S => {
  const a = fqFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, 'one exam', 'open'], [3, null, 'argued']]);
  /* links: the first at line 0, the other four at line 1 */
  FQ_LINKS.forEach(([f, t, lab], i) => {
    const la = a * (i === 0 ? Q(S, 0, 'fixes the background', 0.6) : at(S, 1, 0.6, (i - 1) * 0.9));
    if (la <= 0.003) return;
    const [x1, y1] = EX_POS[f], [x2, y2] = EX_POS[t];
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
    const sx = x1 + ux * 100, sy = y1 + uy * 62, ex = x2 - ux * 100, ey = y2 - uy * 62;
    arrow(sx, sy, ex, ey, C.mag, la, 3);
    const mx = (sx + ex) / 2, my = (sy + ey) / 2;
    const off = f === 4 && t === 1 ? [70, 40] : (dy === 0 ? [0, -16] : [18, 8]);
    txt(lab, mx + off[0], my + off[1], { size: 20, fam: F.mono, w: 700, align: dy === 0 ? 'center' : 'left', c: C.mag, a: la });
  });
  /* the four problem nodes */
  [1, 2, 3, 4].forEach(q => {
    const [x, y] = EX_POS[q];
    chip(x, y, 200, 110, '', C.open, a * clamp(S.u / 0.8), 20);
    txt(`OPEN ${q}`, x, y - 8, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.open, a });
    txt(EX_NAME[q], x, y + 30, { size: 20, fam: F.disp, w: 700, align: 'center', c: C.white, a });
  });
  /* the exam */
  const ea = a * at(S, 2, 0.6);
  panel(1060, 215, 720, 470, ea, C.open, 'THE EXAM FOR A MASTER CONNECTION · 主联络的考试');
  const items = ['the same connection for all four', 'no dial turned after the fact', 'every quantitative bar of problems 1–4', 'all of it at once'];
  items.forEach((s, i) => {
    const ia = ea * clamp(at(S, 2, 0.4, 0.8 + i * 0.5) * 2);
    const y = 315 + i * 86;
    box(1100, y - 30, 38, 38, C.open, ia, 2.5);
    txt(s, 1162, y, { size: 28, fam: F.disp, w: 700, c: C.white, a: ia });
  });
  txt('no candidate has passed yet · 尚无理论通过', 1100, 650, { size: 22, fam: F.zh, w: 700, c: C.open, a: ea * at(S, 2, 0.5, 2.8) });
  /* the closing line */
  const fa = a * at(S, 3, 0.7);
  const s1 = '4/4 witnesses', s2 = '0/4 shortcuts', fs = 36, w1 = tw(s1, fs, F.orb, 900);
  txt(s1, 1080, 775, { size: fs, fam: F.orb, w: 900, c: C.argued, a: fa });
  txt('·', 1080 + w1 + 24, 775, { size: fs, fam: F.orb, w: 900, align: 'center', c: C.dim, a: fa });
  txt(s2, 1080 + w1 + 48, 775, { size: fs, fam: F.orb, w: 900, c: C.open, a: fa });
  fqZh('四处见证 · 零条捷径', 1080, 826, fa, { size: 26, c: C.white });
};

/* ======================================================================= */
/*                                scene 6 · LEDGER                          */
/* ======================================================================= */
SCENES.close = S => {
  closingCard(S, { from: 0.1, y: 320 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[0], t = sc.end - 1.0;
  background(t, sc, 0, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  FQ_ROWS.forEach((r, i) => {
    const y = 240 + i * 150;
    box(150, y, 600, 120, C.argued, 0.9, 2, 'rgba(4,10,24,0.7)');
    txt(r.tag, 175, y + 42, { size: 24, fam: F.orb, w: 900, c: C.white });
    txt(r.wit, 175, y + 92, { size: 32, fam: F.math, w: 700, c: C.argued });
    box(770, y, 90, 120, C.open, 0.9, 2, 'rgba(4,10,24,0.7)');
    txt('?', 815, y + 80, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.open });
  });
  txt(DATA.film.title_zh, 1380, 430, { size: 110, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('THE FOUR-QUESTION LEDGER', 1360, 530, { size: 42, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 4 });
  txt('4/4', 1250, 650, { size: 72, fam: F.orb, w: 900, align: 'center', c: C.argued });
  txt('0/4', 1510, 650, { size: 72, fam: F.orb, w: 900, align: 'center', c: C.open });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1380, 730, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
