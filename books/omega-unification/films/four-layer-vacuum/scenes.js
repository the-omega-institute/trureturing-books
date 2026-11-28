/* Film · The Four-Layer Vacuum · 四层真空配平
   (book omega-unification, Volume IV: chapter 11). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     hook      Sakharov's induced-gravity idea and the one-loop proper-time prescription of definition
               def-ou-ch11-four-layer-vacuum: rho, K = G^-1 / M_P^2, C = Lambda G; targets K = 1, C = 10^-122
               (a modelling prescription, argued; the loops on screen are schematic).
     gap       11.1: the light layer 24 + 4 - 90 = -62; the visible supertrace -62 + 16 (-24 -12 -12 -4 -4) + 18 (36)
               = -310 (computed here); every mass prefix keeps a negative deficit and Lambda G > 0.01180,
               G^-1 / M_P^2 < 6.688e-6 (the chapter's interval certificates; the order of the layers on screen
               is schematic).
     singlets  11.2: <= 310 real singlets force Lambda G > 1.5e-7; 311 equal-mass singlets hit both targets with
               Delta u in (1.2030, 1.2031) e-122; the slope combination 6 alpha - g = 0 for each singlet (computed);
               a relative cutoff raise of about 4.22e-120 flips the sign (certificates).
     gram      thm-ou-ch11-three-anchor-gram (LEAN): the 3 x 3 real Gram determinant formula; two integer examples
               are evaluated both by the formula and by cofactor expansion (computed).
     stencil   the four-layer weights (-1, 3, -3, 1) on (0, mu^2, 2 mu^2, 3 mu^2): moments 0, 1, 2 vanish, the third
               is 6 (computed); the heat trace -(1 - e^-at)^3 and I(0) = (9 ln 3 - 12 ln 2)/2 (computed here by
               quadrature as well); with D = 4 and the chosen rule mu = v^2/M the best readings 0.979478, 0.991359,
               0.967553 of the target (certificates, conditional on chosen inputs, argued).
     higgs     11.3.2: the tree drop -m_h^2 v^2 / 8 gives Delta(Lambda G) = -pi m_h^2 v^2 / M_P^4 at K = 1, recomputed
               here as -1.3448e-67 against the chapter's -1.34476e-67; 55 orders above 10^-122; replication forces
               Q < 4.18 eV (certificate).
     ledger    11.4: the balance sheet; prob-ou-ch11-noncircular-gravity (OPEN).

   On load, FILM.init checks the cited theorem and re-derives every number computed on screen by a second route;
   any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

const FV_GRAM = 'D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula';

/* ---------------- exact arithmetic used on screen ---------------- */
const FV_W = [-1, 3, -3, 1];                                  /* four-layer net polarization weights */
const fvMoment = k => FV_W.reduce((s, w, j) => s + w * Math.pow(j, k), 0);
const FV_LIGHT = { vec: 24, higgs: 4, weyl: -90 };            /* 12 gauge vectors, Higgs doublet, 45 Weyl fermions */
const FV_CHARGED = [-24, -12, -12, -4, -4];                   /* merged net weights per charge level, 16 levels each */
const FV_NEUTRAL = 36;                                        /* each of 18 neutral heavy vector layers */
const fvSum = a => a.reduce((s, x) => s + x, 0);
const fvLight = () => FV_LIGHT.vec + FV_LIGHT.higgs + FV_LIGHT.weyl;
const fvStr = () => fvLight() + 16 * fvSum(FV_CHARGED) + 18 * FV_NEUTRAL;
/* the integral I(0) = int_0^inf (1 - e^-t)^3 / t^3 dt, closed form and quadrature */
const FV_I0 = (9 * Math.log(3) - 12 * Math.log(2)) / 2;
function fvI0Quad() {
  const f = t => (t < 1e-6 ? 1 - 1.5 * t : Math.pow(-Math.expm1(-t), 3) / (t * t * t));
  const T = 200, n = 400000, h = T / n;
  let s = f(0) + f(T);
  for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(i * h);
  return s * h / 3 + 1 / (2 * T * T);                         /* tail: int_T^inf t^-3 dt (e^-T negligible) */
}
/* Gram matrices */
const fvDot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const fvGram = (u, v, w) => [u, v, w].map(p => [u, v, w].map(q => fvDot(p, q)));
const fvDet3 = m => m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
function fvFormula(u, v, w) {
  const a = fvDot(u, u), b = fvDot(v, v), c = fvDot(w, w), x = fvDot(u, v), y = fvDot(u, w), z = fvDot(v, w);
  return { a, b, c, x, y, z, det: a * b * c + 2 * x * y * z - a * z * z - b * y * y - c * x * x };
}
const FV_U = [1, 2, 0], FV_V = [0, 1, 1], FV_WV = [2, 0, 1];
const FV_WD = FV_U.map((x, i) => x + FV_V[i]);                /* the dependent third vector u + v */
/* Higgs tree drop at K = 1: Delta C = 8 pi (-m_h^2 v^2 / 8) / M_P^4 */
const FV_MH = 125.25, FV_VEV = 246.22, FV_MP = 1.22089e19;
const fvHiggs = () => -Math.PI * FV_MH * FV_MH * FV_VEV * FV_VEV / Math.pow(FV_MP, 4);

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const check = (ok, m) => { if (!ok && bad++ < 12) E.push('four-layer-vacuum film: ' + m); };
  const r = leanCite(FV_GRAM);
  check((DATA.lean || []).length === 1, 'film.json should cite exactly one theorem');
  check(r && r.kind === 'theorem', `${FV_GRAM} is not a cited theorem at the pinned commit`);
  /* polarization bookkeeping */
  check(fvLight() === -62, 'light layer 24 + 4 - 90 = -62');
  check(FV_LIGHT.weyl === -2 * 15 * 3, '45 Weyl fermions = 90 polarizations');
  check(16 * fvSum(FV_CHARGED) === -896 && 18 * FV_NEUTRAL === 648, '-896 and +648');
  check(fvStr() === -310, 'Str 1 = -310');
  check(62 + 896 === 958 && 18 * 9 === 162 && 9 * 4 === FV_NEUTRAL, '958 scalars + 162 Dirac singlets');
  check(6 * (1 / 6) - 1 === 0, '6 alpha - g = 0 for a real singlet');
  /* the four-layer stencil */
  check(fvMoment(0) === 0 && fvMoment(1) === 0 && fvMoment(2) === 0 && fvMoment(3) === 6, 'moments 0, 0, 0, 6');
  for (const s of [0.01, 0.3, 1, 2.5, 7]) {
    const lhs = FV_W.reduce((acc, w, j) => acc + w * Math.exp(-j * s), 0), rhs = -Math.pow(1 - Math.exp(-s), 3);
    check(Math.abs(lhs - rhs) < 1e-12, `heat trace identity at ${s}`);
  }
  const q = fvI0Quad();
  check(Math.abs(q - FV_I0) < 1e-6, `I(0): quadrature ${q} vs closed form ${FV_I0}`);
  check(FV_I0.toFixed(5) === '0.78487', 'I(0) = 0.78487');
  /* Gram examples: formula = cofactor expansion of the Gram matrix = (det [u v w])^2 */
  const g1 = fvFormula(FV_U, FV_V, FV_WV), g2 = fvFormula(FV_U, FV_V, FV_WD);
  check(g1.det === fvDet3(fvGram(FV_U, FV_V, FV_WV)) && g1.det === Math.pow(fvDet3([FV_U, FV_V, FV_WV]), 2) && g1.det === 25, 'Gram example 25');
  check(g2.det === fvDet3(fvGram(FV_U, FV_V, FV_WD)) && g2.det === 0, 'dependent Gram example 0');
  /* the Higgs tree cliff and the visible floor */
  const h = fvHiggs();
  check(Math.abs(h / -1.34476e-67 - 1) < 2e-5, `Higgs shift ${h}`);
  check(Math.abs(Math.log10(-h / 1e-122) - 55.13) < 0.01, '55 orders above 10^-122');
  check(0.01180 / 1e-122 > 1e120, 'floor is more than 10^120 times the target');
  check(Math.abs(-h / 1.00030008e-122 / 1.344e55 - 1) < 1e-3, 'copies P ~ 1.344e55');
});
Object.assign(FILM.speed, { hook: 0.02, gap: 0.016, singlets: 0.016, gram: 0.014, stencil: 0.016, higgs: 0.016, ledger: 0.012, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const fvFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
const sup = n => String(n).split('').map(ch => SUP[ch] || ch).join('');
function fvRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a, ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
function fvLean(x, y, a, size = 20) {
  if (a <= 0.003) return;
  const r = leanCite(FV_GRAM);
  if (!r) return;
  const head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt((r.name || r.label).split('.').slice(-2).join('.'), x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
function fvDisc(x, y, r, col, a) { if (a <= 0.003) return; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
/* a small tag: kind colour, short text */
function fvTag(x, y, s, col, a, size = 18) {
  if (a <= 0.003) return;
  const w = tw(s, size, F.zh, 700) + 22;
  box(x, y - size - 4, w, size + 14, col, a, 1.5, 'rgba(0,0,0,0.5)');
  txt(s, x + 11, y + 2, { size, fam: F.zh, w: 700, c: col, a });
}
/* the vacuum ladder: |Lambda G| on a log scale from 10^0 (top) to 10^-125 (bottom).
   marks: [{ e: log10 value, label, col, a, side }] */
const LAD = { x: 300, y0: 215, y1: 800, eMin: -125 };
const ladY = e => LAD.y0 + (e / LAD.eMin) * (LAD.y1 - LAD.y0);
function fvLadder(a, marks = [], o = {}) {
  if (a <= 0.003) return;
  const x = o.x || LAD.x;
  txt('|ΛG|', x, LAD.y0 - 26, { size: 24, fam: F.math, w: 700, align: 'center', c: C.white, a });
  line(x, LAD.y0, x, LAD.y1, C.dim, a * 0.8, 2);
  for (let e = 0; e >= -120; e -= 20) {
    const y = ladY(e);
    line(x - 8, y, x, y, C.dim, a, 2);
    txt(`10${sup(e)}`, x - 16, y + 7, { size: 20, fam: F.math, w: 700, align: 'right', c: C.dim, a });
  }
  for (const m of marks) {
    const ma = a * (m.a == null ? 1 : m.a);
    if (ma <= 0.003) continue;
    const y = ladY(m.e);
    line(x - 14, y, x + 30, y, m.col, ma, 3);
    dot(x, y, 9, 'c', ma);
    txt(m.label, x + 40, y + 8, { size: m.size || 22, fam: F.math, w: 700, c: m.col, a: ma });
    if (m.sub) txt(m.sub, x + 40, y + 36, { size: 18, fam: F.zh, w: 700, c: C.dim, a: ma });
  }
}
const TARGET = (a, label = '10⁻¹²² target · 目标') => ({ e: -122, label, col: C.now, a, sub: null });

/* opening title */
function fvTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('THE FOUR-LAYER VACUUM', p, 5), W / 2, 580, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('INDUCED GRAVITY · SINGLETS · (−1, 3, −3, 1) · HIGGS CLIFF · LEDGER', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 4 });
}

/* ======================================================================= */
/*                          scene 1 · INDUCED GRAVITY                        */
/* ======================================================================= */
/* schematic one-loop bubbles on a curved sheet */
function fvLoops(S, x0, y0, w, h, a) {
  if (a <= 0.003) return;
  for (let i = 0; i <= 8; i++) {
    const yy = y0 + i * h / 8;
    curve(k => { const xx = x0 + k * w; return [xx, yy + 26 * Math.sin(k * Math.PI) * (1 - Math.abs(i - 4) / 6)]; }, 40, C.dim, a * 0.35, 1.2);
  }
  for (let i = 0; i <= 10; i++) {
    const xx = x0 + i * w / 10;
    curve(k => [xx + 18 * Math.sin(k * Math.PI) * (1 - Math.abs(i - 5) / 7), y0 + k * h], 40, C.dim, a * 0.35, 1.2);
  }
  for (let i = 0; i < 26; i++) {
    const px = x0 + 30 + rnd(i, 1) * (w - 60), py = y0 + 30 + rnd(i, 2) * (h - 60);
    const ph = S.t * (0.9 + rnd(i, 3)) + rnd(i, 4) * 6.283, r = 10 + 14 * (0.5 + 0.5 * Math.sin(ph));
    ring(px, py, r, i % 3 ? C.cyan : C.mag, a * (0.35 + 0.45 * (0.5 + 0.5 * Math.cos(ph))), 2);
  }
  txt('schematic · 示意：一圈涨落', x0, y0 + h + 40, { size: 20, fam: F.zh, w: 700, c: C.argued, a });
}
SCENES.hook = S => {
  fvTitle(S);
  const a = clamp((S.u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - S.u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  fvLoops(S, 150, 230, 720, 470, a);
  const fa = a * at(S, 1, 0.6);
  if (fa > 0.003) {
    panel(960, 210, 840, 270, fa, C.cyan, 'ONE LOOP · 一圈固有时热核');
    txt('ρ = −(Q⁴ / 32π²) Σ gₖ E₃(zₖ / x)', 990, 290, { size: 30, fam: F.math, w: 700, c: C.white, a: fa });
    txt('K = G⁻¹ / M_P² = (x / 2π) Σ αₖ E₂(zₖ / x)', 990, 350, { size: 30, fam: F.math, w: 700, c: C.white, a: fa });
    txt('C = ΛG = (8πρ / M_P⁴) / K²', 990, 410, { size: 30, fam: F.math, w: 700, c: C.white, a: fa });
    txt('bare G and Λ set to zero · 裸牛顿项与裸宇宙学项取零', 990, 458, { size: 20, fam: F.zh, w: 700, c: C.dim, a: fa });
  }
  const ta = a * at(S, 2, 0.6);
  if (ta > 0.003) {
    panel(960, 520, 840, 230, ta, C.now, 'TWO TARGETS · 两个目标');
    chip(1170, 630, 340, 76, 'K = 1', C.now, ta * Q(S, 2, "Newton's constant", 0.5), 40, F.math);
    chip(1590, 630, 340, 76, 'C = 10⁻¹²²', C.now, ta * Q(S, 2, 'Lambda G', 0.5), 40, F.math);
    txt('Newton · 牛顿标定', 1170, 708, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ta });
    txt('dark energy · 暗能量', 1590, 708, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ta });
  }
};

/* ======================================================================= */
/*                             scene 2 · VISIBLE GAP                         */
/* ======================================================================= */
SCENES.gap = S => {
  const a = fvFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'Fermion layers', 'argued'], [2, null, 'computed']]);
  const fl = Q(S, 2, 'zero point zero one one eight', 0.6);
  fvLadder(a, [
    { e: Math.log10(0.01180), label: '> 0.01180  visible floor', sub: '可见重谱下界', col: C.mag, a: fl },
    TARGET(at(S, 0, 0.6))
  ]);
  const ra = a * fl;
  if (ra > 0.003) {
    const y1 = ladY(Math.log10(0.0118)) + 50, y2 = ladY(-122) - 30;
    arrow(LAD.x + 60, y1, LAD.x + 60, y2, C.mag, ra, 2.5);
    txt('× > 10¹²⁰', LAD.x + 76, (y1 + y2) / 2, { size: 30, fam: F.math, w: 700, c: C.mag, a: ra });
  }
  /* line 0: the polarization count */
  const pa = a * at(S, 0, 0.6);
  if (pa > 0.003) {
    panel(660, 200, 1140, 210, pa, C.cyan, 'NET POLARIZATIONS · 净偏振（玻色 − 费米）');
    fvRich([['light · 轻层  ', C.dim], ['24 + 4 − 90 = ', C.white], [String(fvLight()), C.cyan]], 690, 272, { size: 28, a: pa, fam: F.zh });
    txt('12 gauge vectors · Higgs doublet · 45 Weyl fermions', 690, 306, { size: 18, fam: F.mono, w: 700, c: C.dim, a: pa });
    fvRich([['visible total · 可见合计  ', C.dim], ['−62 + 16 × (−56) + 18 × 36 = ', C.white], [String(fvStr()), C.cyan]], 690, 372, { size: 28, a: pa * at(S, 0, 0.6, 2.2), fam: F.zh });
  }
  /* line 1: the deficit staircase (layer order schematic) */
  const sa = a * at(S, 1, 0.6) * (1 - at(S, 2, 0.5));
  if (sa > 0.003) {
    const bx = 700, by = 600, bw = 46, gap = 8, k = 1.2;
    const steps = [-62, -24, -12, -12, -4, -4, -24, -12, 36, -12, 36, 36];
    let cum = 0;
    line(bx - 10, by, bx + steps.length * (bw + gap) + 20, by, C.dim, sa, 1.5);
    txt('0', bx - 22, by + 7, { size: 18, fam: F.math, w: 700, align: 'right', c: C.dim, a: sa });
    steps.forEach((s, i) => {
      const pa2 = sa * clamp((S.u - lineAt(S, 1).s - i * 0.22) / 0.4);
      cum += s;
      const x = bx + i * (bw + gap), yb = by - Math.max(0, cum) * k, hgt = Math.abs(cum) * k;
      fillBox(x, cum < 0 ? by : yb, bw, hgt, cum < 0 ? C.mag : C.cyan, pa2 * 0.5);
      box(x, cum < 0 ? by : yb, bw, hgt, cum < 0 ? C.mag : C.cyan, pa2, 1.5);
    });
    txt('light → heavy · 由轻到重', bx, by - 40, { size: 20, fam: F.zh, w: 700, c: C.white, a: sa });
    txt('every prefix < 0 · 每个前缀都为负', 1400, 520, { size: 24, fam: F.zh, w: 700, c: C.mag, a: sa * Q(S, 1, 'every mass prefix', 0.5) });
    txt('ρ ≥ dQ⁴ / 64π²', 1400, 570, { size: 28, fam: F.math, w: 700, c: C.white, a: sa * Q(S, 1, 'negative deficit', 0.5) });
    fvTag(1400, 640, 'layer order schematic · 次序示意', C.argued, sa);
  }
  /* lines 2–3: the two misses */
  const ma = a * at(S, 2, 0.6);
  if (ma > 0.003) {
    panel(660, 450, 540, 220, ma, C.mag, 'CURVATURE · 曲率');
    txt('ΛG > 0.01180', 690, 540, { size: 46, fam: F.math, w: 700, c: C.mag, a: ma });
    txt('any G > 0 · any cutoff mix', 690, 590, { size: 20, fam: F.mono, w: 700, c: C.dim, a: ma });
    txt('任意 G > 0、任意截止混合', 690, 630, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ma });
  }
  const na = a * at(S, 3, 0.6);
  if (na > 0.003) {
    panel(1240, 450, 560, 220, na, C.mag, 'NEWTON · 牛顿倒数');
    txt('G⁻¹ / M_P² < 6.688 × 10⁻⁶', 1270, 540, { size: 34, fam: F.math, w: 700, c: C.mag, a: na });
    txt('target · 目标  K = 1', 1270, 600, { size: 22, fam: F.zh, w: 700, c: C.now, a: na });
  }
  const ca = a * at(S, 2, 0.6, 0.8);
  if (ca > 0.003) txt('NUM · interval certificates of the chapter · 本章区间证书  (R = 32, 16 heavy scalars)', 660, 730, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: ca });
};

/* ======================================================================= */
/*                             scene 3 · 311 SINGLETS                        */
/* ======================================================================= */
SCENES.singlets = S => {
  const a = fvFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const n310 = Q(S, 1, 'three hundred ten', 2.2), hit = Q(S, 2, 'Three hundred eleven can', 0.6);
  const flip = Q(S, 3, 'turns negative', 0.6);
  fvLadder(a, [
    { e: Math.log10(1.5e-7), label: '> 1.5 × 10⁻⁷  (≤ 310)', sub: '不超过 310 份', col: C.mag, a: Q(S, 1, 'forces Lambda G', 0.6) },
    TARGET(at(S, 0, 0.6), hit > 0.5 ? '10⁻¹²²  hit · 命中 (311)' : '10⁻¹²² target · 目标')
  ]);
  /* the singlet grid: 18 columns */
  const gx = 660, gy = 230, cs = 25, cols = 18;
  const ga = a * at(S, 0, 0.6);
  if (ga > 0.003) {
    txt('real singlets · 实单态  6α − g = 6 · ⅙ − 1 = 0', gx, gy - 20, { size: 22, fam: F.zh, w: 700, c: C.white, a: ga });
    const shown = Math.floor(310 * ease(n310));
    for (let i = 0; i < 311; i++) {
      const x = gx + (i % cols) * cs + cs / 2, y = gy + 20 + Math.floor(i / cols) * cs;
      if (i < 310) dot(x, y, i < shown ? 7 : 4, 'c', ga * (i < shown ? 0.95 : 0.25));
      else if (hit > 0) { ring(x, y, 11, C.now, ga * hit, 3); fillBox(x - 5, y - 5, 10, 10, C.now, ga * hit); }
    }
    txt(`${hit > 0.5 ? 311 : shown}`, gx + cols * cs / 2, gy + 20 + 18 * cs + 40, { size: 48, fam: F.orb, w: 900, align: 'center', c: hit > 0.5 ? C.now : C.cyan, a: ga });
  }
  /* line 2: the match and its tuning */
  const ma = a * hit;
  if (ma > 0.003) {
    panel(1150, 200, 650, 250, ma, C.cyan, '311 EQUAL MASSES · 311 份等质量');
    txt('Q / M_P ≈ 0.42929', 1180, 270, { size: 28, fam: F.math, w: 700, c: C.white, a: ma });
    txt('M_s / M_P ≈ 0.017260', 1180, 315, { size: 28, fam: F.math, w: 700, c: C.white, a: ma });
    txt('Δu ∈ (1.2030, 1.2031) × 10⁻¹²²', 1180, 380, { size: 28, fam: F.math, w: 700, c: C.now, a: ma * Q(S, 2, 'only with tuning', 0.5) });
    txt('122-digit tuning · 122 位精细微调', 1180, 425, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ma * Q(S, 2, 'only with tuning', 0.5) });
  }
  /* line 3: the cutoff cliff */
  const ca = a * at(S, 3, 0.6);
  if (ca > 0.003) {
    panel(1150, 490, 650, 270, ca, C.mag, 'UV CLIFF · 紫外悬崖');
    txt('Q → Q (1 + 4.22 × 10⁻¹²⁰)', 1180, 565, { size: 30, fam: F.math, w: 700, c: C.white, a: ca });
    fvRich([['ΛG :  10⁻¹²²  →  ', C.white], ['< 0', C.mag]], 1180, 625, { size: 32, a: ca * flip });
    txt('any matched singlet spectrum: < 7.2 × 10⁻¹¹⁷', 1180, 680, { size: 20, fam: F.mono, w: 700, c: C.dim, a: ca });
    txt('任意已匹配单态谱的通用转负上界', 1180, 714, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ca });
  }
  const na = a * at(S, 1, 0.6, 1.0);
  if (na > 0.003) txt('NUM · certificates · 证书', 660, 790, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: na });
};

/* ======================================================================= */
/*                             scene 4 · THREE ANCHORS                       */
/* ======================================================================= */
function fvMatrix(x, y, m, a, o = {}) {
  if (a <= 0.003) return;
  const cw = o.cw || 74, rh = o.rh || 52, size = o.size || 30, n = m.length;
  const wd = cw * m[0].length, ht = rh * n;
  const br = (xx, dir) => { line(xx, y - 6, xx, y + ht - 6, C.white, a, 2); line(xx, y - 6, xx + dir * 10, y - 6, C.white, a, 2); line(xx, y + ht - 6, xx + dir * 10, y + ht - 6, C.white, a, 2); };
  br(x, 1); br(x + wd, -1);
  m.forEach((row, i) => row.forEach((v, j) => txt(String(v), x + cw * j + cw / 2, y + rh * i + rh / 2 + 6, { size, fam: F.math, w: 700, align: 'center', c: o.hi && o.hi(i, j) ? C.now : (i === j ? C.cyan : C.white), a })));
}
SCENES.gram = S => {
  const a = fvFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, 'Lean kernel', 'lean'], [2, null, 'computed'], [3, 'Pure algebra', 'argued']]);
  const la = a * Q(S, 0, 'Lean kernel', 0.6);
  panel(140, 200, 1660, 230, la, C.lean, 'THREE-ANCHOR GRAM · 三锚格拉姆行列式');
  txt('u, v, w ∈ E,  E any real inner-product space · 任意实内积空间', 175, 270, { size: 24, fam: F.zh, w: 700, c: C.dim, a: la * at(S, 1, 0.5) });
  txt('det G(u,v,w) = ‖u‖²‖v‖²‖w‖² + 2⟨u,v⟩⟨u,w⟩⟨v,w⟩ − ‖u‖²⟨v,w⟩² − ‖v‖²⟨u,w⟩² − ‖w‖²⟨u,v⟩²', 175, 335, { size: 30, fam: F.math, w: 700, c: C.white, a: la * at(S, 1, 0.6) });
  fvLean(175, 400, la, 20);
  stamp('LEAN ✓', 1610, 395, Q(S, 1, 'Gram determinant', 0.5, 0.4) * (1 - at(S, 2, 0.5, 1.5)), C.lean, 30, -0.06);
  /* line 1: the symbolic Gram matrix */
  const sa = a * at(S, 1, 0.6) * (1 - at(S, 2, 0.4));
  if (sa > 0.003) {
    txt('G(u, v, w) =', 520, 640, { size: 34, fam: F.math, w: 700, c: C.white, a: sa });
    fvMatrix(760, 520, [['⟨u,u⟩', '⟨u,v⟩', '⟨u,w⟩'], ['⟨v,u⟩', '⟨v,v⟩', '⟨v,w⟩'], ['⟨w,u⟩', '⟨w,v⟩', '⟨w,w⟩']], sa, { cw: 150, rh: 70, size: 32 });
    txt('pairwise real inner products · 两两实内积', 760, 780, { size: 22, fam: F.zh, w: 700, c: C.dim, a: sa });
  }
  /* lines 2–3: the worked examples */
  const ea = a * at(S, 2, 0.6);
  if (ea <= 0.003) return;
  const dep = Q(S, 3, 'sum of the first two', 0.6);
  const w3 = dep > 0.5 ? FV_WD : FV_WV, g = fvFormula(FV_U, FV_V, w3), M = fvGram(FV_U, FV_V, w3);
  panel(140, 470, 820, 330, ea, dep > 0.5 ? C.now : C.cyan, dep > 0.5 ? 'w = u + v · 依赖' : 'THREE INTEGER VECTORS · 三个整数向量');
  txt(`u = (${FV_U.join(', ')})`, 175, 545, { size: 26, fam: F.math, w: 700, c: C.white, a: ea });
  txt(`v = (${FV_V.join(', ')})`, 175, 590, { size: 26, fam: F.math, w: 700, c: C.white, a: ea });
  txt(`w = (${w3.join(', ')})`, 175, 635, { size: 26, fam: F.math, w: 700, c: dep > 0.5 ? C.now : C.white, a: ea });
  txt('G =', 520, 615, { size: 30, fam: F.math, w: 700, c: C.white, a: ea });
  fvMatrix(590, 540, M, ea, { cw: 106, rh: 62, size: 30, hi: dep > 0.5 ? ((i, j) => i === 2 || j === 2) : null });
  txt('NUM · computed on screen · 屏幕计算', 175, 770, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: ea });
  panel(1000, 470, 800, 330, ea, C.cyan, 'FORMULA = MATRIX · 公式与矩阵');
  txt(`${g.a}·${g.b}·${g.c} + 2·${g.x}·${g.y}·${g.z}`, 1030, 550, { size: 30, fam: F.math, w: 700, c: C.white, a: ea });
  txt(`− ${g.a}·${g.z}² − ${g.b}·${g.y}² − ${g.c}·${g.x}²`, 1030, 600, { size: 30, fam: F.math, w: 700, c: C.white, a: ea });
  fvRich([['= ', C.white], [String(g.det), dep > 0.5 ? C.now : C.cyan]], 1030, 680, { size: 52, a: ea });
  txt(`cofactor expansion of G · 按行展开：${fvDet3(M)}`, 1030, 740, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ea });
  const pa = a * Q(S, 3, 'Pure algebra', 0.5);
  fvTag(1300, 680, 'pure algebra · 纯代数', C.argued, pa, 20);
};

/* ======================================================================= */
/*                             scene 5 · FOUR LAYERS                         */
/* ======================================================================= */
SCENES.stencil = S => {
  const a = fvFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [4, 'chosen light scale', 'argued'], [4, 'one zero reaches', 'computed']]);
  /* line 0: the question */
  const qa = a * (1 - at(S, 1, 0.5));
  if (qa > 0.003) {
    txt('one lucky cutoff  →  every cutoff ?', W / 2, 450, { size: 54, fam: F.disp, w: 700, align: 'center', c: C.white, a: qa, ab: 2 });
    txt('从一个截止的偶然相消，到每一个截止都相消？', W / 2, 520, { size: 32, fam: F.zh, w: 700, align: 'center', c: C.dim, a: qa });
  }
  const ba = a * at(S, 1, 0.6);
  if (ba <= 0.003) return;
  /* the weights on the mass axis */
  const bx = 220, by = 375, sp = 210, k = 44;
  const ea = ba * (1 - at(S, 2, 0.4));
  if (ea > 0.003) {
    txt('equally spaced squared masses', 1100, 330, { size: 30, fam: F.disp, w: 700, c: C.white, a: ea });
    txt('等距平方质量  0, μ², 2μ², 3μ²', 1100, 380, { size: 28, fam: F.zh, w: 700, c: C.dim, a: ea });
    txt('net polarization = bosons − fermions · 净偏振 = 玻色 − 费米', 1100, 440, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ea });
  }
  panel(140, 200, 880, 330, ba, C.cyan, 'WEIGHTS · 净偏振权重 D(−1, 3, −3, 1)');
  line(bx - 40, by, bx + 3 * sp + 80, by, C.dim, ba, 2);
  const lbl = ['0', 'μ²', '2μ²', '3μ²'];
  FV_W.forEach((w, j) => {
    const pa = ba * clamp((S.u - lineAt(S, 1).s - 1.6 - j * 0.5) / 0.4), x = bx + j * sp;
    const col = w > 0 ? C.cyan : C.mag, h = Math.abs(w) * k;
    fillBox(x - 26, w > 0 ? by - h : by, 52, h, col, pa * 0.5); box(x - 26, w > 0 ? by - h : by, 52, h, col, pa, 2);
    txt((w > 0 ? '+' : '') + w, x + 44, w > 0 ? by - h + 24 : by + h - 6, { size: 30, fam: F.math, w: 700, c: col, a: pa });
    txt(lbl[j], x, by + (w > 0 ? 40 : -16), { size: 24, fam: F.math, w: 700, align: 'center', c: C.white, a: ba });
  });
  txt('m²', bx + 3 * sp + 96, by + 8, { size: 24, fam: F.math, w: 700, c: C.dim, a: ba });
  /* line 2: the moments */
  const ma = a * at(S, 2, 0.5);
  if (ma > 0.003) {
    panel(1060, 200, 740, 330, ma, C.cyan, 'MOMENTS · 质量平方矩  Σ wⱼ jᵏ');
    const rows = [0, 1, 2, 3].map(kk => ({ kk, terms: FV_W.map((w, j) => w * Math.pow(j, kk)), m: fvMoment(kk) }));
    rows.forEach((r, i) => {
      const ra = a * at(S, 2, 0.4, 0.9 * i);
      const cur = i === Math.min(3, Math.floor((S.u - lineAt(S, 2).s) / 0.9)) && at(S, 3, 0.01) === 0;
      const s = r.terms.map((t, j) => (j && t >= 0 ? '+ ' : j ? '− ' : t < 0 ? '−' : '') + Math.abs(t)).join(' ');
      txt(`k = ${r.kk}:`, 1090, 280 + i * 58, { size: 28, fam: F.math, w: 700, c: C.dim, a: ra });
      txt(`${s} =`, 1220, 280 + i * 58, { size: 28, fam: F.math, w: 700, c: C.white, a: ra });
      txt(String(r.m), 1700, 280 + i * 58, { size: 34, fam: F.math, w: 700, align: 'right', c: cur ? C.now : (r.m ? C.mag : C.cyan), a: ra });
    });
  }
  /* line 3: the finite positive remainder */
  const fa = a * at(S, 3, 0.6);
  if (fa > 0.003) {
    panel(140, 560, 880, 250, fa, C.cyan, 'HEAT TRACE · 热迹  −D(1 − e⁻ᵃᵗ)³');
    const px = 180, py = 760, pw = 420, ph = 140, T = 10, f = t => (t < 1e-6 ? 1 : Math.pow(-Math.expm1(-t), 3) / (t * t * t));
    const pr = clamp((S.u - lineAt(S, 3).s) / 1.6);
    ctx.save(); ctx.globalAlpha = fa * 0.35; ctx.fillStyle = C.cyan; ctx.beginPath(); ctx.moveTo(px, py);
    for (let i = 0; i <= 80 * pr; i++) { const t = i / 80 * T; ctx.lineTo(px + t / T * pw, py - f(t) * ph); }
    ctx.lineTo(px + pr * pw, py); ctx.closePath(); ctx.fill(); ctx.restore();
    curve(kk => [px + kk * pr * pw, py - f(kk * pr * T) * ph], 80, C.cyan, fa, 2.5);
    line(px, py, px + pw + 10, py, C.dim, fa, 1.5);
    txt('(1 − e⁻ᵗ)³ / t³', px + 150, py - 110, { size: 20, fam: F.math, w: 700, c: C.cyan, a: fa });
    txt('I(0) = (9 ln 3 − 12 ln 2) / 2', 640, 650, { size: 24, fam: F.math, w: 700, c: C.white, a: fa });
    txt(`= ${FV_I0.toFixed(5)}… > 0`, 640, 705, { size: 34, fam: F.math, w: 700, c: C.cyan, a: fa * Q(S, 3, 'strictly positive', 0.5) });
    txt('every cutoff · 任意截止', 640, 760, { size: 20, fam: F.zh, w: 700, c: C.dim, a: fa * Q(S, 3, 'whatever the cutoff', 0.5) });
  }
  /* line 4: readings at three zeros */
  const ra = a * at(S, 4, 0.6);
  if (ra > 0.003) {
    panel(1060, 560, 740, 250, ra, C.cyan, 'D = 4,  μ = v² / M · best C / c');
    const vals = [['#11661', 0.979478], ['#11934', 0.991359], ['#12207', 0.967553]];
    const x0 = 1090, x1 = 1560, X = v => x0 + (v - 0.95) / 0.05 * (x1 - x0);
    dashed(X(1), 600, X(1), 760, C.now, ra, 2);
    txt('1', X(1), 790, { size: 20, fam: F.math, w: 700, align: 'center', c: C.now, a: ra });
    txt('0.95', x0, 790, { size: 18, fam: F.math, w: 700, align: 'center', c: C.dim, a: ra });
    vals.forEach(([z, v], i) => {
      const y = 625 + i * 48, best = i === 1;
      const va = ra * Q(S, 4, 'one zero reaches', 0.5);
      fillBox(x0, y - 18, X(v) - x0, 26, best ? C.now : C.cyan, va * 0.45);
      txt(z, x0 + 6, y + 2, { size: 18, fam: F.mono, w: 700, c: C.white, a: va });
      txt(v.toFixed(6), x1 + 24, y + 2, { size: 22, fam: F.math, w: 700, c: best ? C.now : C.cyan, a: va });
    });
    fvTag(1230, 800, 'chosen inputs · 选定输入', C.argued, ra * Q(S, 4, 'chosen light scale', 0.5), 16);
  }
};

/* ======================================================================= */
/*                             scene 6 · HIGGS CLIFF                         */
/* ======================================================================= */
SCENES.higgs = S => {
  const a = fvFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed']]);
  const h = fvHiggs(), eh = Math.log10(-h);
  const ha = Q(S, 1, 'about ten to the minus sixty-seven', 0.6);
  fvLadder(a, [
    { e: eh, label: `−${(-h * 1e67).toFixed(3)} × 10⁻⁶⁷  Higgs tree`, sub: '希格斯树势', col: C.now, a: ha },
    { e: -122, label: '≈ 10⁻¹²²  four-layer · 四层项', col: C.cyan, a: at(S, 0, 0.6) }
  ]);
  const oa = a * Q(S, 2, 'fifty-five orders', 0.6);
  if (oa > 0.003) {
    const y1 = ladY(eh) + 46, y2 = ladY(-122) - 18;
    arrow(LAD.x + 60, y1, LAD.x + 60, y2, C.mag, oa, 3);
    txt(`× ${(-h / 1.0e-122 / 1e55).toFixed(3)} × 10⁵⁵`, LAD.x + 76, (y1 + y2) / 2, { size: 30, fam: F.math, w: 700, c: C.mag, a: oa });
    txt('55 orders · 55 个数量级', LAD.x + 76, (y1 + y2) / 2 + 38, { size: 20, fam: F.zh, w: 700, c: C.mag, a: oa });
  }
  /* line 0: the potential and the rolling field */
  const pa = a * at(S, 0, 0.6);
  if (pa > 0.003) {
    panel(700, 200, 500, 360, pa, C.cyan, 'HIGGS TREE POTENTIAL · 希格斯树势');
    const cx = 950, cy = 330, sx = 150, sy = 140, V = s => (s * s - 1) * (s * s - 1) - 1;   /* shape only, origin at 0 */
    curve(kk => { const s = -1.45 + 2.9 * kk; return [cx + s * sx, cy - V(s) * sy * 0.6 + 0]; }, 90, C.cyan, pa, 2.5);
    const roll = ease(at(S, 0, 2.2, 1.0)), s0 = 0.02 + 0.98 * roll;
    fvDisc(cx + s0 * sx, cy - V(s0) * sy * 0.6 - 12, 10, C.now, pa);
    ring(cx + s0 * sx, cy - V(s0) * sy * 0.6 - 12, 15, C.now, pa, 2.5);
    txt('0', cx, cy + 40, { size: 22, fam: F.math, w: 700, align: 'center', c: C.white, a: pa });
    txt('v', cx + sx, cy + sy * 0.6 + 44, { size: 22, fam: F.math, w: 700, align: 'center', c: C.white, a: pa });
    txt('shape schematic · 形状示意', 730, 540, { size: 18, fam: F.zh, w: 700, c: C.argued, a: pa });
  }
  /* line 1: the drop, recomputed */
  const da = a * at(S, 1, 0.6);
  if (da > 0.003) {
    panel(1240, 200, 560, 360, da, C.now, 'TREE DROP · 树势落差');
    txt('ρ_H(v) − ρ_H(0) = −m_h² v² / 8', 1270, 275, { size: 26, fam: F.math, w: 700, c: C.white, a: da });
    txt('ΔC = 8πΔρ / M_P⁴ = −π m_h² v² / M_P⁴', 1270, 330, { size: 22, fam: F.math, w: 700, c: C.white, a: da });
    txt(`m_h = ${FV_MH},  v = ${FV_VEV} GeV`, 1270, 385, { size: 22, fam: F.math, w: 700, c: C.dim, a: da });
    txt('M_P = 1.22089 × 10¹⁹ GeV', 1270, 420, { size: 22, fam: F.math, w: 700, c: C.dim, a: da });
    txt(`= −${(-h * 1e67).toFixed(4)} × 10⁻⁶⁷`, 1270, 495, { size: 38, fam: F.math, w: 700, c: C.now, a: da * ha });
    txt('NUM · computed here · 屏幕计算 (K = 1)', 1270, 538, { size: 18, fam: F.zh, w: 700, c: C.cyan, a: da * ha });
  }
  /* line 3: replication */
  const ra = a * at(S, 3, 0.6);
  if (ra > 0.003) {
    panel(700, 600, 1100, 200, ra, C.mag, 'CANCEL BY COPIES · 复制四层去抵消');
    txt('P > 1.344 × 10⁵⁵ copies of D = 4', 730, 680, { size: 30, fam: F.math, w: 700, c: C.white, a: ra });
    fvRich([['K = 1  ⟹  Q < ', C.white], ['4.18 eV', C.mag]], 730, 745, { size: 36, a: ra * Q(S, 3, 'below four point one eight', 0.5) });
    txt('certificate · 证书', 1560, 745, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: ra });
  }
};

/* ======================================================================= */
/*                            scene 7 · QUESTION FOUR                        */
/* ======================================================================= */
SCENES.ledger = S => {
  const a = fvFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'Green', 'lean'], [1, 'Cyan', 'computed'], [2, null, 'open']]);
  txt('QUESTION 4 · 第四问 · LEDGER 总账', W / 2, 220, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, a: a * at(S, 0, 0.6), ls: 3 });
  const ga = a * Q(S, 1, 'Green', 0.5);
  panel(140, 260, 520, 400, ga, C.lean, 'LEAN ✓ · 内核验证');
  if (ga > 0.003) {
    txt('three-anchor Gram', 170, 340, { size: 28, fam: F.disp, w: 700, c: C.lean, a: ga });
    txt('determinant formula', 170, 378, { size: 28, fam: F.disp, w: 700, c: C.lean, a: ga });
    txt('三锚格拉姆行列式恒等式', 170, 425, { size: 22, fam: F.zh, w: 700, c: C.white, a: ga });
    txt('pure algebra · 纯代数', 170, 600, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ga });
  }
  const ca = a * Q(S, 1, 'Cyan', 0.5);
  panel(700, 260, 520, 400, ca, C.cyan, 'NUM · CERTIFICATES · 证书');
  const rows = ['ΛG > 0.01180 (visible)', '311 singlets · Δu ~ 10⁻¹²²', 'cliff 4.22 × 10⁻¹²⁰', '(−1, 3, −3, 1): 0.991359', 'Higgs −1.345 × 10⁻⁶⁷', 'Q < 4.18 eV'];
  rows.forEach((r, i) => txt(r, 730, 335 + i * 50, { size: 24, fam: F.math, w: 700, c: C.cyan, a: a * Q(S, 1, 'Cyan', 0.4, 0.35 * i) }));
  const oa = a * at(S, 2, 0.5);
  panel(1260, 260, 540, 400, oa, C.open, 'OPEN · 开放问题');
  if (oa > 0.003) {
    txt('non-circular derivation', 1290, 340, { size: 26, fam: F.disp, w: 700, c: C.open, a: oa });
    txt('无循环推导', 1290, 380, { size: 24, fam: F.zh, w: 700, c: C.open, a: oa });
    txt('· Newton constant G_N', 1290, 440, { size: 22, fam: F.math, w: 700, c: C.white, a: oa });
    txt('· sign and size of Λ', 1290, 480, { size: 22, fam: F.math, w: 700, c: C.white, a: oa });
    txt('no hand-placed singlets,', 1290, 540, { size: 20, fam: F.mono, w: 700, c: C.dim, a: oa });
    txt('cutoff Q or tree potential', 1290, 570, { size: 20, fam: F.mono, w: 700, c: C.dim, a: oa });
    txt('不靠手工放入的单态、截止或树势', 1290, 610, { size: 20, fam: F.zh, w: 700, c: C.dim, a: oa });
  }
  const qa = a * at(S, 3, 0.7);
  if (qa > 0.003) {
    txt('Reaching 10⁻¹²² in a model is a witness, not a derivation.', W / 2, 740, { size: 38, fam: F.math, w: 700, align: 'center', c: C.white, a: qa });
    txt('在模型里够到 10⁻¹²²，是见证，不是推导。', W / 2, 795, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.dim, a: qa });
  }
};

/* ======================================================================= */
/*                                scene 8 · LEDGER                           */
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
  txt('THE FOUR-LAYER VACUUM', W / 2, 390, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 2, ls: 5 });
  const bx = W / 2 - 315, by = 710, sp = 210, k = 40;
  line(bx - 60, by, bx + 3 * sp + 60, by, C.dim, 1, 2);
  FV_W.forEach((w, j) => {
    const x = bx + j * sp, col = w > 0 ? C.cyan : C.mag, h = Math.abs(w) * k;
    fillBox(x - 26, w > 0 ? by - h : by, 52, h, col, 0.5); box(x - 26, w > 0 ? by - h : by, 52, h, col, 1, 2);
    txt((w > 0 ? '+' : '') + w, x + 44, w > 0 ? by - h + 24 : by + h - 6, { size: 30, fam: F.math, w: 700, c: col });
  });
  txt('Σ w = Σ w j = Σ w j² = 0', W / 2, 480, { size: 40, fam: F.math, w: 700, align: 'center', c: C.white, ab: 1 });
  bloom(0.5);
  txt(`${DATA.book.code} · FILM`, W / 2, 900, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
