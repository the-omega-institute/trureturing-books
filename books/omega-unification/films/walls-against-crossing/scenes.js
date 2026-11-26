/* Film · Walls Against the Crossing · 交汇之墙
   (book omega-unification, Volume II: chapter 4). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     gap       the three inverse couplings α₁⁻¹, α₂⁻¹, α₃⁻¹ run from the Z mass with the minimal Standard Model one-loop
               slopes b = (41/10, −19/6, −7), dα⁻¹/dlnμ = −b/2π, from α̂⁻¹ = 127.930, sin²θ̂ = 0.23129, α_s = 0.1180,
               α₁⁻¹ = (3/5)·α̂⁻¹·cos²θ̂ (inputs of chapter 4.1). The three pairwise crossings form a triangle; at the
               α₁ = α₃ crossing α₂⁻¹ − α₁⁻¹ = 3.664 (the chapter's central gap ≈ 3.664; computed here).
     blind     C = α₁⁻¹ − 3α₂⁻¹ + 2α₃⁻¹: (1,−3,2)·(1,1,1) = (1,−3,2)·(0,2,3) = (1,−3,2)·(5,3,2) = 0 and (1,−3,2)·b = −2/5,
               so dC/dlnμ = 1/(5π); C(M_Z) = −12.81, C(10¹⁷ GeV) = −10.61 (example ex-ou-ch04-gap-invariant; computed).
     shell     the two-step reading h(λ) = λ|λ − c| with c = tr(L₀)/18 = 270/18 = 15 for unit edge weights, drawn for
               0 ≤ λ ≤ 30.386 (the chapter's bound λ_max(L_U) < 30.38580); the weak-centre parity sectors
               (definition def-ou-ch04-magnetic-laplacian; the curve is computed, the shell model is the book's model).
     walls     the four no-go walls of chapter 4.2, quoted from the chapter: spread > 2.936; α_s(M_Z) < 0.076;
               shared monotone mass: spread > 0.7048 / 0.2426; Planck calibration: spread > 2.037 / 3.334 (model-
               internal interval certificates; NUM).
     monotone  the shared non-decreasing mass rule m = f(h) (the curves drawn are schematic examples); certified
               spread > 0.7048 (sharp, 19 heavy scalars) / > 0.2426 (finite subtraction); K_min = 106.75467;
               log-convex span > 115.64515 / 82.58089, against ln(M̄_P/M_Z) = 37.82 computed here.
     keys      the conditional crossings of chapter 4.3, quoted: weak-centre multiplier 32, κ = M̄_P/724² = 4.645·10¹²
               GeV (computed here), zero #11661, α_s ∈ (0.1183797, 0.1183860); dyadic N = 32 at zero #11431,
               α_s ∈ (0.1188844, 0.1189006), finite-momentum matching 0.1532183; all model rules (ARGUED).
     bedrock   LagrangeGramIdentity.lagrange_gram_identity (LEAN) with u = (1,2,3), v = (4,5,6): 14·77 − 32² = 54 =
               9 + 36 + 9 (computed); OmegaChebyshevHecke.lps_ramanujan_margins (LEAN): 0 < 20 − λ² on every shell and
               branch, here λ² = 36/5, 4/25, 324/125, 2916/625, 5476/625 with margins 64/5 … 7024/625 (values from the
               chapter's proof, recomputed here).

   On load, FILM.init checks DATA.lean against the two theorems and re-derives every number on screen by a second
   route: the crossings by Cramer's rule, C by its slope formula, the dot products in integers, the margins as
   integer numerators, both sides of the Lagrange–Gram example. Disagreements go to window.FILM_ERRORS. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const WA_LEAN = {
  lagrange_gram_identity: 'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  lps_ramanujan_margins: 'D5/S3/Quantum/AURICOmega/OmegaChebyshevHecke.lps_ramanujan_margins'
};
const WA_IN = { ainv: 127.930, s2: 0.23129, as: 0.1180, MZ: 91.1876, MPbar: 2.435e18 };
const WA_B = [41 / 10, -19 / 6, -7];
const WA_K = WA_B.map(b => b / (2 * Math.PI));
const WA_A0 = [0.6 * WA_IN.ainv * (1 - WA_IN.s2), WA_IN.ainv * WA_IN.s2, 1 / WA_IN.as];
const LN10 = Math.log(10), LMZ = Math.log10(WA_IN.MZ);
/* inverse couplings at t = ln(μ/M_Z) */
const waRun = t => WA_A0.map((a, i) => a - WA_K[i] * t);
const waC = t => { const a = waRun(t); return a[0] - 3 * a[1] + 2 * a[2]; };
const waT = lg => (lg - LMZ) * LN10;          // log10(μ/GeV) → ln(μ/M_Z)
const waLg = t => LMZ + t / LN10;
function waCross(i, j) { const t = (WA_A0[i] - WA_A0[j]) / (WA_K[i] - WA_K[j]); return { t, lg: waLg(t), a: waRun(t) }; }
const X12 = waCross(0, 1), X23 = waCross(1, 2), X13 = waCross(0, 2);
const WA_GAP = X13.a[1] - X13.a[0];
/* LPS norm-5 branches (scaled eigenvalue, degree) and the Lagrange–Gram example */
const WA_LPS = [[6, 1], [-2, 2], [-18, 3], [54, 4], [-74, 4]];
const WA_U = [1, 2, 3], WA_V = [4, 5, 6];
const fmt = (x, n) => x.toFixed(n);

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const check = (ok, m) => { if (!ok && bad++ < 12) E.push('walls-against-crossing film: ' + m); };

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === 2, `film.json cites ${lean.length} declarations, expected 2`);
  for (const [short, gid] of Object.entries(WA_LEAN)) {
    const r = leanCite(gid);
    check(r && r.kind === 'theorem', `${gid} is not a cited theorem`);
    if (r) check(r.short === short, `${gid} resolves to ${r.name}`);
  }

  /* 1. the gap: crossings by Cramer's rule on the lines a_i − k_i t, compared with the closed form */
  const cram = (i, j) => { const det = -WA_K[i] + WA_K[j]; return (WA_A0[j] - WA_A0[i]) / det; };
  check(Math.abs(cram(0, 2) - X13.t) < 1e-9 && Math.abs(cram(0, 1) - X12.t) < 1e-9, 'crossings');
  check(fmt(WA_GAP, 3) === '3.664', `gap ${WA_GAP}`);
  /* the thresholdless sin²θ prediction (three lines through one point, α̂ and α_s fixed) is ≈ 0.2076 */
  const k = WA_K, a0inv = WA_IN.ainv;
  const det = a0inv * (-k[0] + k[1]) - (-k[1] + k[2]) * (-1.6 * a0inv);
  const sPred = (WA_A0[2] * (-k[0] + k[1]) - (-k[1] + k[2]) * (-0.6 * a0inv)) / det;
  check(fmt(sPred, 4) === '0.2076', `sin² prediction ${sPred}`);

  /* 2. the blind combination, in integers (b scaled by 30) */
  const c = [1, -3, 2], dotc = v => v.reduce((s, x, i) => s + x * c[i], 0);
  check(dotc([1, 1, 1]) === 0 && dotc([0, 2, 3]) === 0 && dotc([5, 3, 2]) === 0, 'blind directions');
  check(dotc([123, -95, -210]) === -12, '(1,−3,2)·b = −2/5');       // 30·b = (123, −95, −210), −12/30 = −2/5
  const slope = 1 / (5 * Math.PI);
  check(Math.abs((waC(10) - waC(0)) / 10 - slope) < 1e-12, 'dC/dlnμ = 1/(5π)');
  check(fmt(waC(0), 2) === '-12.81', `C(M_Z) ${waC(0)}`);
  check(waC(waT(13)) > -11.195 && waC(waT(17)) < -10.6083 && waC(waT(17)) > -10.61, 'C in the window');
  check(fmt(waT(17) * slope, 2) === '2.20', 'climb 2.20');

  /* 3. the shell: c = 270/18 = 15, the fold of h */
  check(270 / 18 === 15, 'c = 15');
  const h = l => l * Math.abs(l - 15);
  check(h(15) === 0 && h(7.5) === 56.25, 'h folds at 15');

  /* 4. scales */
  check(Math.log(WA_IN.MPbar / WA_IN.MZ) < 38 && Math.log(WA_IN.MPbar / WA_IN.MZ) > 37.8, 'ln(M̄_P/M_Z)');
  check(fmt(WA_IN.MPbar / 724 ** 2 / 1e12, 3) === '4.645', 'κ = M̄_P/724²');

  /* 5. Lagrange–Gram example, both sides */
  const s = (f) => [0, 1, 2].reduce((a, i) => a + f(i), 0);
  const lhs = s(i => WA_U[i] ** 2) * s(i => WA_V[i] ** 2) - s(i => WA_U[i] * WA_V[i]) ** 2;
  let dbl = 0; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) dbl += (WA_U[i] * WA_V[j] - WA_U[j] * WA_V[i]) ** 2;
  check(lhs === 54 && dbl / 2 === 54, 'Lagrange–Gram 54');

  /* 6. LPS margins: (20·5^d − λ_sc²) / 5^d */
  const want = [[64, 5], [496, 25], [2176, 125], [9584, 625], [7024, 625]];
  WA_LPS.forEach(([l, d], i) => check(20 * 5 ** d - l * l === want[i][0] && 5 ** d === want[i][1] && want[i][0] > 0, `margin ${i}`));
});
Object.assign(FILM.speed, { gap: 0.02, blind: 0.014, shell: 0.016, walls: 0.012, monotone: 0.014, keys: 0.016, bedrock: 0.014, close: 0.025 });

/* ======================================================================= */
/*                                  helpers                                  */
/* ======================================================================= */
function waRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, p[2] || fam, w), 0) / 2;
  for (const [s, col, f2] of parts) { txt(s, cx, y, { size, fam: f2 || fam, w, c: col, a }); cx += tw(s, size, f2 || fam, w); }
  return cx;
}
/* a plot frame: returns maps from data to pixels */
function waAxes(x, y, w, h, xr, yr, a, o = {}) {
  const X = v => x + (v - xr[0]) / (xr[1] - xr[0]) * w;
  const Y = v => y + h - (v - yr[0]) / (yr[1] - yr[0]) * h;
  if (a > 0) {
    line(x, y + h, x + w, y + h, C.dim, a, 2); line(x, y, x, y + h, C.dim, a, 2);
    for (const v of o.xt || []) { line(X(v), y + h, X(v), y + h + 8, C.dim, a, 2); txt(String(v), X(v), y + h + 34, { size: 20, fam: F.mono, align: 'center', c: C.dim, a }); }
    for (const v of o.yt || []) { line(x - 8, Y(v), x, Y(v), C.dim, a, 2); txt(String(v), x - 14, Y(v) + 7, { size: 20, fam: F.mono, align: 'right', c: C.dim, a }); }
    if (o.xl) txt(o.xl, x + w, y + h + 64, { size: 20, fam: F.math, align: 'right', c: C.dim, a });
    if (o.yl) txt(o.yl, x, y - 16, { size: 22, fam: F.math, w: 700, c: C.dim, a });
  }
  return { X, Y };
}
const WA_COL = [C.cyan, C.mag, C.white];
const WA_NAME = ['α₁⁻¹', 'α₂⁻¹', 'α₃⁻¹'];
function waTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('WALLS AGAINST THE CROSSING', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('GAP · BLIND SPOT · SHELL · WALLS · KEYS · BEDROCK', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}
const waFade = (S, k) => clamp((S.u - lineAt(S, k).s + 0.3) / 0.7) * clamp((S.d - S.u) / 0.5);

/* ======================================================================= */
/*                              scene 1 · THE MISS                           */
/* ======================================================================= */
function waLines(ax, lg0, lg1, a, o = {}) {
  for (let i = 0; i < 3; i++) {
    const p = o.p == null ? 1 : o.p;
    const lgE = lerp(LMZ, lg1, p);
    if (lgE <= lg0) continue;
    const s0 = Math.max(lg0, LMZ);
    curve(t => { const lg = lerp(s0, lgE, t); return [ax.X(lg), ax.Y(waRun(waT(lg))[i])]; }, 2, WA_COL[i], a, o.lw || 4);
  }
}
SCENES.gap = S => {
  waTitle(S);
  const a = waFade(S, 0);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* main plot */
  const ax = waAxes(220, 230, 860, 500, [2, 17], [0, 64], a, { xt: [2, 5, 8, 11, 14, 17], yt: [0, 20, 40, 60], xl: 'log₁₀ (μ / GeV)', yl: 'α⁻¹  inverse coupling · 逆耦合' });
  const p = ease(Q(S, 1, 'upward', 4.0));
  waLines(ax, 2, 17, a, { p });
  for (let i = 0; i < 3; i++) {
    const y0 = ax.Y(WA_A0[i]);
    dot(ax.X(LMZ), y0, 9, ['c', 'm', 'w'][i], a);
    txt(`${WA_NAME[i]} ${fmt(WA_A0[i], 2)}`, ax.X(LMZ) + 20, y0 + (i === 0 ? -14 : 40), { size: 24, fam: F.math, w: 700, c: WA_COL[i], a: a * at(S, 1, 0.6) });
  }
  txt('M_Z', ax.X(LMZ), 790, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.now, a: a * at(S, 1, 0.6) * (1 - Q(S, 2, 'They miss', 0.6)) });
  /* the triangle on the main plot */
  const tri = Q(S, 2, 'They miss', 0.8);
  const P = [X12, X23, X13].map(X => [ax.X(X.lg), ax.Y(X.a[X === X23 ? 1 : 0])]);
  if (tri > 0) {
    ctx.save(); ctx.globalAlpha = a * tri * 0.35; ctx.fillStyle = C.now; ctx.beginPath();
    P.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath(); ctx.fill(); ctx.restore();
    box(ax.X(12.5), ax.Y(49), ax.X(17.2) - ax.X(12.5), ax.Y(38) - ax.Y(49), C.now, a * tri, 2);
  }
  /* right: inputs, then the zoom */
  const pin = a * (1 - tri);
  if (pin > 0) {
    panel(1160, 240, 620, 470, pin, C.cyan, 'INPUTS AT THE Z MASS · Z 质量处的输入');
    const rows = [['M_Z = 91.1876 GeV', C.white], ['α̂⁻¹ = 127.930', C.white], ['sin²θ̂_W = 0.23129', C.white], ['α_s = 0.1180', C.white],
      ['b = (41/10, −19/6, −7)', C.cyan], ['dα⁻¹/d ln μ = −b / 2π', C.cyan]];
    rows.forEach(([s, col], i) => txt(s, 1200, 320 + i * 62, { size: 30, fam: F.math, w: 700, c: col, a: pin * at(S, 0, 0.5, 0.4 + 0.3 * i) }));
  }
  if (tri > 0) {
    panel(1160, 240, 620, 500, a * tri, C.now, 'ZOOM · 放大');
    const zx = waAxes(1250, 300, 480, 380, [12.5, 17.2], [38, 49], a * tri, { xt: [13, 14, 15, 16, 17], yt: [40, 45] });
    ctx.save(); ctx.beginPath(); ctx.rect(1250, 300, 480, 380); ctx.clip();
    waLines(zx, 12.5, 17.2, a * tri, { lw: 5 });
    const ZP = [X12, X23, X13].map(X => [zx.X(X.lg), zx.Y(X.a[X === X23 ? 1 : 0])]);
    ctx.globalAlpha = a * tri * 0.25; ctx.fillStyle = C.now; ctx.beginPath();
    ZP.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath(); ctx.fill(); ctx.restore();
    ZP.forEach(q => dot(q[0], q[1], 8, 'g', a * tri));
    /* the gap at the α₁ = α₃ crossing */
    const g = Q(S, 2, 'three point six six', 0.8);
    const gx = zx.X(X13.lg), y1 = zx.Y(X13.a[0]), y2 = zx.Y(X13.a[1]);
    arrow(gx, y1, gx, y2 + 4, C.now, a * g, 4); arrow(gx, y2, gx, y1 - 4, C.now, a * g, 4);
    txt(`Δα⁻¹ = ${fmt(WA_GAP, 3)}`, 1270, 360, { size: 40, fam: F.math, w: 700, c: C.now, a: a * g });
    txt('at α₁⁻¹ = α₃⁻¹ · 交点处', 1270, 398, { size: 20, fam: F.zh, w: 700, c: C.now, a: a * g * 0.85 });
    dashed(1330, 410, gx - 6, (y1 + y2) / 2, C.now, a * g * 0.8, 2);
  }
};

/* ======================================================================= */
/*                          scene 2 · THE BLIND COMBINATION                  */
/* ======================================================================= */
SCENES.blind = S => {
  const a = waFade(S, 0);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  waRich([['C = ', C.white], ['α₁⁻¹', C.cyan], [' − 3', C.white], ['α₂⁻¹', C.mag], [' + 2', C.white], ['α₃⁻¹', C.white]], W / 2, 235, { size: 46, align: 'center', a });
  /* the dot products */
  panel(140, 290, 800, 520, a * at(S, 1, 0.5), C.cyan, '(1, −3, 2) · DIRECTION · 点积');
  const rows = [
    ['shared coupling · 共同耦合', '(1, 1, 1)', '0', 'complete family · 完整家族'],
    ['neutral heavy vectors · 中性重矢量', '(0, 2, 3)', '0', null],
    ['charged X, Y vectors · 带荷重矢量', '(5, 3, 2)', '0', null],
    ['light fields b · 轻场', '(41/10, −19/6, −7)', '−2/5', null]
  ];
  rows.forEach((r, i) => {
    const ra = a * (i < 3 ? at(S, 1, 0.5, 0.2 + 0.9 * i) : Q(S, 2, 'Light fields', 0.5));
    const y = 380 + i * 110, col = i < 3 ? C.cyan : C.now;
    txt(r[0], 175, y, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ra });
    txt(r[1], 175, y + 44, { size: 32, fam: F.math, w: 700, c: C.white, a: ra });
    txt(`→ ${r[2]}`, 900, y + 44, { size: 40, fam: F.math, w: 700, align: 'right', c: col, a: ra });
    if (r[3]) txt(r[3], 560, y, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: ra * 0.8 });
  });
  /* C(μ) along the window */
  const pa = a * Q(S, 2, 'Light fields', 0.6);
  const ax = waAxes(1100, 330, 660, 400, [2, 17], [-14, 1], pa, { xt: [2, 7, 13, 17], yt: [-12, -8, -4, 0], xl: 'log₁₀ (μ / GeV)', yl: 'C(μ)' });
  if (pa > 0) {
    ctx.save(); ctx.globalAlpha = pa * 0.14; ctx.fillStyle = C.cyan; ctx.fillRect(ax.X(13), 330, ax.X(17) - ax.X(13), 400); ctx.restore();
    txt('10¹³–10¹⁷ GeV', (ax.X(13) + ax.X(17)) / 2, 712, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: pa });
    dashed(1100, ax.Y(0), 1760, ax.Y(0), C.white, pa * 0.7, 2);
    txt('C = 0 · needed · 所需', 1120, ax.Y(0) - 12, { size: 20, fam: F.zh, w: 700, c: C.white, a: pa * 0.8 });
    const g = ease(Q(S, 2, 'minus twelve point eight', 2.5));
    curve(t => { const lg = lerp(LMZ, lerp(LMZ, 17, g), t); return [ax.X(lg), ax.Y(waC(waT(lg)))]; }, 2, C.now, pa, 5);
    txt(`dC/d ln μ = 1/(5π) ≈ ${fmt(1 / (5 * Math.PI), 4)}`, W - 140, 280, { size: 26, fam: F.math, w: 700, align: 'right', c: C.now, a: pa });
    const q = Q(S, 2, 'minus twelve point eight', 0.6);
    dot(ax.X(LMZ), ax.Y(waC(0)), 9, 'g', pa * q);
    txt(fmt(waC(0), 2).replace('-', '−'), ax.X(LMZ) + 18, ax.Y(waC(0)) - 22, { size: 30, fam: F.math, w: 700, c: C.now, a: pa * q });
    const e = Q(S, 2, 'two point two', 0.6);
    dot(ax.X(17), ax.Y(waC(waT(17))), 9, 'g', pa * e);
    txt(`${fmt(waC(waT(17)), 2).replace('-', '−')}  (+${fmt(waT(17) / (5 * Math.PI), 2)})`, ax.X(17) - 10, ax.Y(waC(waT(17))) - 22, { size: 28, fam: F.math, w: 700, align: 'right', c: C.now, a: pa * e });
  }
};

/* ======================================================================= */
/*                            scene 3 · THE MAGNETIC SHELL                   */
/* ======================================================================= */
const WA_LMAX = 30.386;
SCENES.shell = S => {
  const a = waFade(S, 0);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [2, null, 'argued']]);
  txt('heavy spectrum must split multiplets · 重谱必须撕开多重态', W / 2, 225, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.white, a: a * (1 - Q(S, 0, 'Its nonzero', 0.6)) });
  /* the operator */
  const oa = a * Q(S, 0, 'Its nonzero', 0.6);
  waRich([['(L', C.cyan], ['q', C.cyan], ['ψ)', C.cyan], ['ᵤ = Σ w (ψᵤ − z^q ψᵥ)', C.white]], 160, 240, { size: 30, a: oa });
  txt(`c = tr(L₀) / 18 = 270 / 18 = 15`, 160, 290, { size: 30, fam: F.math, w: 700, c: C.now, a: oa * Q(S, 0, 'average fifteen', 0.6) });
  /* the curve h(λ) = λ|λ − 15| */
  const pa = a * Q(S, 1, 'two-step mass reading', 0.6);
  const ax = waAxes(220, 360, 820, 400, [0, 31], [0, 480], pa, { xt: [0, 5, 10, 15, 20, 25, 30], yt: [0, 100, 200, 300, 400], xl: 'λ  eigenvalue · 本征值', yl: 'h(λ) = λ |λ − 15|' });
  if (pa > 0) {
    const g = ease(Q(S, 1, 'two-step mass reading', 2.4));
    curve(t => { const l = t * WA_LMAX * g; return [ax.X(l), ax.Y(l * Math.abs(l - 15))]; }, 240, C.cyan, pa, 5);
    const f = Q(S, 1, 'folds back', 0.6);
    dashed(ax.X(15), ax.Y(0), ax.X(15), ax.Y(300), C.now, pa * f, 2);
    dot(ax.X(15), ax.Y(0), 11, 'g', pa * f);
    txt('fold at c = 15 · 折返', ax.X(15), ax.Y(300) - 14, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.now, a: pa * f });
    txt('light near c · 近 c 变轻', ax.X(15), ax.Y(300) - 48, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: pa * f });
    txt('m = κ h(λ)', ax.X(4), ax.Y(420), { size: 28, fam: F.math, w: 700, c: C.white, a: pa });
  }
  /* weak-centre parity */
  const za = a * at(S, 2, 0.6);
  panel(1150, 360, 640, 190, za, C.mag, 'CENTRE-ODD · 中心奇 (−1)');
  txt('Q_L   L_L   H', 1180, 455, { size: 40, fam: F.math, w: 700, c: C.mag, a: za });
  txt('weak doublets · 弱二重态', 1180, 515, { size: 22, fam: F.zh, w: 700, c: C.dim, a: za });
  const zb = a * at(S, 2, 0.6, 1.6);
  panel(1150, 580, 640, 190, zb, C.cyan, 'CENTRE-EVEN · 中心偶 (+1)');
  txt('u_Rᶜ  d_Rᶜ  e_Rᶜ  V⁰', 1180, 675, { size: 40, fam: F.math, w: 700, c: C.cyan, a: zb });
  txt('singlets, neutral vectors · 弱单态与中性矢量', 1180, 735, { size: 22, fam: F.zh, w: 700, c: C.dim, a: zb });
  txt('the shell model of this book · 本书的球壳模型', 1150, 330, { size: 20, fam: F.zh, w: 700, c: C.argued, a: za });
};

/* ======================================================================= */
/*                              scene 4 · FOUR WALLS                         */
/* ======================================================================= */
const WA_WALLS = [
  { en: 'NATIVE 12 GENERATORS', zh: '原生生成元 + 共用高模', big: 'spread > 2.936', small: 'any magnetic phases', line: 1 },
  { en: '0/1/2-STEP FACE WEIGHTS', zh: '短步正面权', big: 'α_s(M_Z) < 0.076', small: 'shortfall > 4.6833', line: 2 },
  { en: 'SHARED MONOTONE MASS', zh: '共用单调质量', big: 'spread > 0.7048', small: 'whole double-clock torus', line: -1 },
  { en: 'PLANCK CALIBRATION', zh: '普朗克标定', big: 'spread > 2.037', small: 'finite subtr. > 3.334', line: 3 }
];
function waWall(i, x, y, w, h, a, hot, o = {}) {
  const wl = WA_WALLS[i], col = hot ? C.now : C.cyan;
  panel(x, y, w, h, a, col);
  /* brick texture */
  ctx.save(); ctx.beginPath(); ctx.rect(x + 6, y + 6, w - 12, h - 12); ctx.clip();
  ctx.globalAlpha = a * 0.12; ctx.strokeStyle = col; ctx.lineWidth = 1.5;
  for (let r = 0; r * 34 < h; r++) {
    const yy = y + r * 34; ctx.beginPath(); ctx.moveTo(x, yy); ctx.lineTo(x + w, yy); ctx.stroke();
    for (let cx = x + (r % 2 ? 0 : 36); cx < x + w; cx += 72) { ctx.beginPath(); ctx.moveTo(cx, yy); ctx.lineTo(cx, yy + 34); ctx.stroke(); }
  }
  ctx.restore();
  txt(`WALL ${i + 1}`, x + w / 2, y + 60, { size: 26, fam: F.orb, w: 900, align: 'center', c: col, a, ls: 3 });
  txt(wl.en, x + w / 2, y + 115, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a });
  txt(wl.zh, x + w / 2, y + 152, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: a * 0.85 });
  const bs = o.bs || 40;
  fillBox(x + 18, y + h / 2 + 10, w - 36, 90, C.bg, a * 0.75);
  txt(wl.big, x + w / 2, y + h / 2 + 70, { size: bs, fam: F.math, w: 700, align: 'center', c: col, a });
  txt(wl.small, x + w / 2, y + h - 40, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
}
SCENES.walls = S => {
  const a = waFade(S, 0);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  txt('interval certificates, inside the model · 模型内区间证书', W / 2, 220, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.cyan, a });
  for (let i = 0; i < 4; i++) {
    const wl = WA_WALLS[i];
    const rise = wl.line < 0 ? at(S, 0, 0.8, 1.2) : Q(S, wl.line, wl.line === 1 ? 'Native generators' : wl.line === 2 ? 'Short-step' : 'Planck-pinned', 0.8);
    const hot = wl.line > 0 && S.u >= lineAt(S, wl.line).s && (wl.line === 3 || S.u < lineAt(S, wl.line + 1).s);
    const x = 140 + i * 415, w = 380, h = 520, y = 260 + 60 * (1 - ease(rise));
    waWall(i, x, y, w, h, a * (wl.line < 0 ? 0.45 * rise : clamp(rise * 1.5)), hot, { bs: wl.big.length > 14 ? 36 : 40 });
  }
  txt('next · 下一幕', 140 + 2 * 415 + 190, 815, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a * at(S, 0, 0.8, 1.2) * 0.8 });
};

/* ======================================================================= */
/*                            scene 5 · THE MONOTONE WALL                    */
/* ======================================================================= */
/* schematic non-decreasing rules m = f(h) on [0, 1] (shape only; the certificate covers every such rule) */
const WA_RULES = [h => h, h => Math.pow(h, 3), h => 0.15 + 0.85 * Math.floor(h * 4.999) / 4, h => Math.sqrt(h)];
SCENES.monotone = S => {
  const a = waFade(S, 0);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, 'leaves a sharp-threshold spread', 'computed']]);
  /* left: the shared rule, morphing between schematic shapes */
  panel(140, 230, 760, 590, a, C.now, 'ONE SHARED RULE m = f(h) · 共用一条规则');
  const ax = waAxes(230, 300, 600, 400, [0, 1], [0, 1.05], a, { yl: 'm' });
  txt('h', 850, 708, { size: 26, fam: F.math, w: 700, c: C.dim, a });
  const ph = (S.u * 0.35) % WA_RULES.length, i0 = Math.floor(ph), fr = ease(clamp((ph - i0) * 2 - 0.6));
  const f = h => lerp(WA_RULES[i0](h), WA_RULES[(i0 + 1) % WA_RULES.length](h), fr);
  curve(t => [ax.X(t), ax.Y(f(t))], 200, C.now, a, 5);
  /* every heavy field, odd and even alike, sits on the same curve */
  for (let k = 0; k < 14; k++) {
    const h = 0.05 + 0.9 * rnd(k, 3);
    dot(ax.X(h), ax.Y(f(h)), 9, k % 2 ? 'm' : 'c', a * at(S, 0, 0.5, 1.5 + 0.1 * k));
  }
  txt('odd · 奇', 250, 790, { size: 20, fam: F.zh, w: 700, c: C.mag, a });
  txt('even · 偶', 360, 790, { size: 20, fam: F.zh, w: 700, c: C.cyan, a });
  txt('never decreasing · schematic · 示意', 860, 790, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.argued, a });
  /* right: the certified bounds */
  const r1 = a * Q(S, 1, 'leaves a sharp-threshold spread', 0.6);
  panel(960, 230, 830, 190, r1, C.cyan, 'EVERY PHASE OF THE TORUS · 全环面');
  txt('spread > 0.7048', 990, 320, { size: 44, fam: F.math, w: 700, c: C.cyan, a: r1 });
  txt('sharp · 尖阈值', 1420, 320, { size: 22, fam: F.zh, w: 700, c: C.dim, a: r1 });
  txt('spread > 0.2426', 990, 385, { size: 34, fam: F.math, w: 700, c: C.cyan, a: r1 * 0.9 });
  txt('finite subtraction · 有限减法', 1420, 385, { size: 22, fam: F.zh, w: 700, c: C.dim, a: r1 });
  const r2 = a * Q(S, 2, 'log slope', 0.6);
  panel(960, 440, 830, 130, r2, C.cyan);
  waRich([['K_min = ', C.white], ['106.75467', C.cyan]], 990, 505, { size: 44, a: r2 });
  txt('min Lipschitz slope of ln m / ln λ · one 18-layer tower, zero #11431', 990, 548, { size: 18, fam: F.mono, w: 700, c: C.dim, a: r2 });
  /* spans in natural-log units */
  const r3 = a * Q(S, 3, 'log-convex', 0.6);
  panel(960, 590, 830, 230, r3, C.cyan, 'LOG-CONVEX SPAN · 对数凸跨度 (ln)');
  const sc = 480 / 120, bx = 1150;
  const bars = [['sharp', 115.64515, C.cyan, '> 115.65'], ['finite', 82.58089, C.cyan, '> 82.58'], ['M_Z → M̄_P', Math.log(WA_IN.MPbar / WA_IN.MZ), C.now, fmt(Math.log(WA_IN.MPbar / WA_IN.MZ), 2)]];
  bars.forEach(([lab, v, col, s], j) => {
    const y = 638 + j * 58, g = ease(clamp((r3 / a) * 1.2 - 0.2 * j)) * (j === 2 ? Q(S, 3, 'Z mass to reduced Planck', 0.8) : 1);
    txt(lab, bx - 14, y + 26, { size: 20, fam: F.mono, w: 700, align: 'right', c: col, a: r3 });
    fillBox(bx, y + 4, v * sc * g, 30, col, r3 * 0.7);
    txt(s, bx + v * sc * g + 12, y + 30, { size: 26, fam: F.math, w: 700, c: col, a: r3 * g });
  });
};

/* ======================================================================= */
/*                          scene 6 · CONDITIONAL CROSSINGS                  */
/* ======================================================================= */
SCENES.keys = S => {
  const a = waFade(S, 0);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, 'gives', 'computed'], [3, null, 'argued']]);
  const k1 = a * at(S, 0, 0.6, 1.5), k2 = a * Q(S, 2, 'Key two', 0.6);
  const hot1 = S.u < lineAt(S, 2).s, hot2 = S.u >= lineAt(S, 2).s && S.u < lineAt(S, 3).s;
  panel(140, 220, 800, 260, k1, hot1 ? C.now : C.cyan, 'KEY 1 · WEAK-CENTRE SPLIT · 弱中心分档');
  txt('even sector × 32 · 偶扇区 × 32', 170, 300, { size: 30, fam: F.zh, w: 700, c: C.white, a: k1 });
  txt(`κ = M̄_P / 724² ≈ ${fmt(WA_IN.MPbar / 724 ** 2 / 1e12, 3)} × 10¹² GeV`, 170, 355, { size: 28, fam: F.math, w: 700, c: C.white, a: k1 * at(S, 1, 0.6) });
  txt('zero #11661 · 16 heavy scalars · two loops', 170, 405, { size: 22, fam: F.mono, w: 700, c: C.dim, a: k1 * at(S, 1, 0.6) });
  txt('α_s ∈ (0.1183797, 0.1183860)', 170, 455, { size: 30, fam: F.math, w: 700, c: C.cyan, a: k1 * Q(S, 1, 'gives', 0.6) });
  panel(980, 220, 800, 260, k2, hot2 ? C.now : C.cyan, 'KEY 2 · POSITIVE ONE-STEP · 正一步收缩');
  txt('T = I − L / N ⪰ 0,  N = 2⁵ = 32', 1010, 300, { size: 30, fam: F.math, w: 700, c: C.white, a: k2 });
  txt('min N: 31 any phase, 23 native · dyadic → 32', 1010, 355, { size: 22, fam: F.mono, w: 700, c: C.dim, a: k2 });
  txt('zero #11431 · sharp, two loops', 1010, 405, { size: 22, fam: F.mono, w: 700, c: C.dim, a: k2 });
  txt('α_s ∈ (0.1188844, 0.1189006)', 1010, 455, { size: 30, fam: F.math, w: 700, c: C.cyan, a: k2 * Q(S, 2, 'It reads', 0.6) });
  /* the α_s number line */
  const na = a * at(S, 1, 0.6, 1.0);
  const X = v => 300 + (v - 0.110) / (0.160 - 0.110) * 1400, y = 650;
  if (na > 0) {
    line(300, y, 1700, y, C.dim, na, 2);
    for (const v of [0.11, 0.12, 0.13, 0.14, 0.15, 0.16]) { line(X(v), y - 8, X(v), y + 8, C.dim, na, 2); txt(v.toFixed(2), X(v), y + 40, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: na }); }
    txt('α_s(M_Z)', 140, y + 8, { size: 22, fam: F.math, w: 700, c: C.dim, a: na });
    fillBox(X(0.117), y - 30, X(0.119) - X(0.117), 60, C.cyan, na * 0.25);
    txt('window [0.117, 0.119] · 实验窗', X(0.117) - 10, y - 46, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.cyan, a: na });
    const m1 = a * Q(S, 1, 'gives', 0.5), m2 = a * Q(S, 2, 'It reads', 0.5);
    line(X(0.11838), y - 26, X(0.11838), y + 26, C.cyan, m1, 4);
    txt('key 1 · 0.1184', X(0.11838) - 10, y + 78, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: m1 });
    line(X(0.11889), y - 26, X(0.11889), y + 26, C.white, m2, 4);
    txt('key 2 · 0.1189', X(0.11889) + 10, y + 78, { size: 22, fam: F.mono, w: 700, c: C.white, a: m2 });
    /* the scheme swap */
    const j = Q(S, 3, 'another matching rule', 1.2);
    if (j > 0) {
      const xs = lerp(X(0.11889), X(0.1532183), ease(j));
      ctx.save(); ctx.setLineDash([8, 8]);
      curve(t => [lerp(X(0.11889), xs, t), y - 40 - 70 * Math.sin(Math.PI * t) * (xs - X(0.11889)) / (X(0.1532183) - X(0.11889))], 40, C.mag, a, 3);
      ctx.restore();
      line(xs, y - 26, xs, y + 26, C.mag, a, 4);
      txt('finite-momentum matching · 0.1532183', xs, y + 78, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: a * clamp(j * 2 - 1) });
    }
    txt('model rules, not derivations · 模型规则，不是推导', W / 2, 810, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.argued, a: a * at(S, 3, 0.6) });
  }
};

/* ======================================================================= */
/*                              scene 7 · THE BEDROCK                        */
/* ======================================================================= */
function waLeanChip(x, y, gid, a) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r) return;
  const size = 20, head = STR.en.lean || 'LEAN ✓', wh = tw(head, 16, F.mono, 700, 1) + 18;
  fillBox(x, y - 21, wh, 28, C.lean, a);
  txt(head, x + 9, y - 1, { size: 16, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
SCENES.bedrock = S => {
  const a = waFade(S, 0);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'lean']]);
  const fin = at(S, 3, 0.6);
  /* Lagrange–Gram */
  const la = a * Q(S, 1, 'Lagrange and Gram', 0.6) * (1 - 0.6 * fin);
  panel(140, 220, 800, 470, la, C.lean, 'LAGRANGE–GRAM · 拉格朗日—格拉姆');
  waLeanChip(170, 290, WA_LEAN.lagrange_gram_identity, la);
  txt('(Σu²)(Σv²) − (Σuv)² = ½ Σᵢ Σⱼ (uᵢvⱼ − uⱼvᵢ)²', 170, 350, { size: 27, fam: F.math, w: 700, c: C.lean, a: la });
  const ea = la * Q(S, 1, 'Here both sides', 0.6);
  txt('u = (1, 2, 3),  v = (4, 5, 6)', 170, 420, { size: 28, fam: F.math, w: 700, c: C.white, a: ea });
  txt('14 · 77 − 32² = 1078 − 1024 = 54', 170, 480, { size: 30, fam: F.math, w: 700, c: C.cyan, a: ea });
  txt('(5 − 8)² + (6 − 12)² + (12 − 15)² = 9 + 36 + 9 = 54', 170, 540, { size: 26, fam: F.math, w: 700, c: C.cyan, a: ea });
  txt('example computed here · 屏幕算例', 170, 650, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: ea * 0.8 });
  /* LPS margins */
  const pa = a * Q(S, 2, 'norm five', 0.6) * (1 - 0.6 * fin);
  panel(980, 220, 800, 470, pa, C.lean, 'NORM-5 LPS SHELL · 模方 5 LPS 壳层');
  waLeanChip(1010, 290, WA_LEAN.lps_ramanujan_margins, pa);
  txt('0 < 20 − λ²   ∀ shell, branch', 1010, 345, { size: 28, fam: F.math, w: 700, c: C.lean, a: pa });
  const bx = 1010, by = 640, bw = 120, gap = 30, sc = 220 / 20;
  dashed(bx - 10, by - 20 * sc, bx + 5 * (bw + gap), by - 20 * sc, C.lean, pa, 2);
  txt('20', bx + 5 * (bw + gap) - 6, by - 20 * sc - 8, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.lean, a: pa });
  const labs = ['36/5', '4/25', '324/125', '2916/625', '5476/625'];
  WA_LPS.forEach(([l, d], i) => {
    const v = l * l / 5 ** d, x = bx + i * (bw + gap), g = ease(clamp(Q(S, 2, 'norm five', 1.6) * 1.5 - 0.12 * i));
    fillBox(x, by - v * sc * g, bw, v * sc * g, C.cyan, pa * 0.75);
    txt(labs[i], x + bw / 2, by + 28, { size: 19, fam: F.math, w: 700, align: 'center', c: C.cyan, a: pa });
    txt(`j=${d / 2}`, x + bw / 2, by - v * sc * g - 10, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.dim, a: pa * g });
  });
  txt('bars: λ² per branch, values recomputed · 各分支 λ²', 1010, 385, { size: 18, fam: F.zh, w: 700, c: C.cyan, a: pa * 0.8 });
  /* the three tiers */
  const tiers = [['Kernel-checked: the tools', '内核检验：工具', C.lean, 'Kernel-checked'], ['Certified in the model: the walls', '模型内证书：墙', C.cyan, 'Certified in the model'],
    ['Conditional: every crossing so far', '有条件：迄今每次交汇', C.argued, 'Conditional']];
  tiers.forEach(([en, zh, col, ph], i) => {
    const ta = a * Q(S, 3, ph, 0.5), x = 140 + i * 555;
    panel(x, 710, 530, 120, ta, col);
    txt(en, x + 265, 760, { size: 24, fam: F.disp, w: 700, align: 'center', c: col, a: ta });
    txt(zh, x + 265, 805, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: ta * 0.9 });
  });
};

/* ======================================================================= */
/*                                scene 8 · WALLS                            */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 290 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const si = 0, sc = TL.scenes[si], t = sc.end - 1.0;
  background(t, sc, si, sc.end - sc.start - 1.0);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.1, a: 0.12, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  /* the three lines and the triangle on the left */
  const ax = waAxes(160, 260, 860, 520, [2, 17], [0, 64], 0.8, { xt: [2, 8, 14], yt: [0, 30, 60], xl: 'log₁₀ (μ / GeV)', yl: 'α⁻¹' });
  waLines(ax, 2, 17, 1, { lw: 5 });
  const P = [X12, X23, X13].map(X => [ax.X(X.lg), ax.Y(X.a[X === X23 ? 1 : 0])]);
  ctx.save(); ctx.globalAlpha = 0.5; ctx.fillStyle = C.now; ctx.beginPath();
  P.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath(); ctx.fill(); ctx.restore();
  txt(DATA.film.title_zh, 1440, 420, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('WALLS AGAINST', 1440, 520, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('THE CROSSING', 1440, 582, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 5 });
  txt(`Δα⁻¹ = ${fmt(WA_GAP, 3)}`, 1440, 680, { size: 44, fam: F.math, w: 700, align: 'center', c: C.now });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1440, 760, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), si, sc);
  post(0);
};
