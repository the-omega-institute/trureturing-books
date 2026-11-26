/* Film · The Winding Ladder · 绕数阶梯 (book omega-unification, chapter 13). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests (all in chapter 13 of the book):
     hook     the multi-winding Wilson action S_w = Σ_k w_k Σ_△ s_△ (1 − cos k φ_△) on the 529 triangles of the
              19-point shell (definition def-ou-ch13-wilson-winding-action: a model choice, argued); the triangle is
              schematic; the harmonic curves 1 − cos(kφ) are computed here from the definition.
     order    thm-ou-ch13-noncommutative-witness (LEAN, two GIDs): triad(pHalf, p0, qHalf) and triad(qHalf, p0, pHalf)
              are not ray-equivalent; det G3(1, pHalf, qHalf) ≡ 1/4 (zero axioms). The quaternion products
              (1, 1, 1, 1), (1, 1, 1, −1) and the fidelities 1/2, 1/4, 1/2, B = 1/4 are recomputed here (computed);
              "loop phases would simply add" is the chapter's reading (argued).
     wall     the global angle bounds of 13.1 and the winding table of 13.2 for K ≤ 18, 19, 21, 27 (replay
              certificates, computed): ‖∇S_w‖ > 3.00565; saddle at zero #295,872,666,901; local minimum at zero
              #226,358; at 27, |V_ub|² ≤ 26.922 % and J ≤ 31.362 % of reference.
     summit   the table rows K = 31, 36, 105 (certificates, computed): the six-winding 26-part action, the 6899-part
              split (< 0.47 ppm, < 0.29 ppm), w104 > 0.6589 %, w105 > 6.8674 %, 100 free coefficients.
     damp     remark rem-ou-ch13-monotone-cone-geometry (certificates, computed): gap > 1/4 to a native competitor,
              10-bit code 1011 excludes, 9-bit code 505 admits a counterexample; the decaying bars and the energy
              levels are schematic (argued).
     flagship example ex-ou-ch13-flagship-zero (certificates, computed): zero #2,306,888,100,085, gap 4.857224e-8,
              +1.328335 ppm, +0.811085 ppm; zero #40,166,104,723 at −1.314 / −0.802 ppm; density > 1.82378e-13;
              "a witness inside the model, not a derivation" (argued, the book's verdict).
     cracks   the four stress tests of 13.4 (certificates, computed) with the chapter's verbatim numbers.
   On load, FILM.init re-derives every computed number on screen and checks the copied ones against each other by an
   independent route; any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

const WL_LEAN = {
  ray: 'D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.phalf_qhalf_noncommutative',
  gram: 'D5/S3/Quantum/AURICOmega/OmegaComposeAndWitnesses.orthogonal_triad_excess_quarter'
};

/* ---------------- exact arithmetic: integer quaternions and rationals ---------------- */
/* quaternion (a, b, c, d) = a + b i + c j + d k */
const qMul = (p, q) => [
  p[0] * q[0] - p[1] * q[1] - p[2] * q[2] - p[3] * q[3],
  p[0] * q[1] + p[1] * q[0] + p[2] * q[3] - p[3] * q[2],
  p[0] * q[2] - p[1] * q[3] + p[2] * q[0] + p[3] * q[1],
  p[0] * q[3] + p[1] * q[2] - p[2] * q[1] + p[3] * q[0]
];
const qConj = p => [p[0], -p[1], -p[2], -p[3]];
const triad = (a, b, c) => qMul(qMul(a, qConj(b)), c);
const P0 = [1, 0, 0, 0], PH = [1, 1, 0, 0], QH = [1, 0, 1, 0];
const dot4 = (p, q) => p.reduce((s, v, i) => s + v * q[i], 0);
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
const fr = (n, d = 1) => { const g = gcd(n, d) * (d < 0 ? -1 : 1); return [n / g, d / g]; };
const fAdd = (x, y) => fr(x[0] * y[1] + y[0] * x[1], x[1] * y[1]);
const fMul = (x, y) => fr(x[0] * y[0], x[1] * y[1]);
const fStr = x => (x[1] === 1 ? String(x[0]) : `${x[0]}/${x[1]}`);
/* fidelity κ(a, b) = ⟨a, b⟩² / (|a|² |b|²) and the Bargmann loop invariant */
const kap = (a, b) => fr(dot4(a, b) ** 2, dot4(a, a) * dot4(b, b));
const barg = (a, b, c) => fr(dot4(a, b) * dot4(b, c) * dot4(c, a), dot4(a, a) * dot4(b, b) * dot4(c, c));
const WL_KAB = kap(P0, PH), WL_KBC = kap(PH, QH), WL_KCA = kap(QH, P0), WL_B = barg(P0, PH, QH);
const WL_DET = fAdd(fAdd(fr(1), fMul(fr(2), WL_B)), fr(-(WL_KAB[0] * WL_KBC[1] * WL_KCA[1] + WL_KBC[0] * WL_KAB[1] * WL_KCA[1] + WL_KCA[0] * WL_KAB[1] * WL_KBC[1]), WL_KAB[1] * WL_KBC[1] * WL_KCA[1]));

/* ---------------- the chapter's certified numbers (verbatim) ---------------- */
const WL = {
  zero: 2306888100085, zeroNeigh: 40166104723,
  gap: '4.857224 × 10⁻⁸', gapV: 4.857224e-8, vub: 1.328335, jj: 0.811085, vubN: -1.314, jN: -0.802,
  dens: '1.82378 × 10⁻¹³', densV: 1.82378e-13, boxV: 2, boxJ: 1.2,
  grad: 3.00565, saddle: 295872666901, localMin: 226358,
  f27v: 26.922, f27j: 31.362,
  w36: [[1, 1], [2, 1], [30, 2], [32, 1], [33, 15], [36, 6]], parts: 26, res26: ['+0.4210 %', '+0.2567 %'], parts2: 6899,
  ppmV: 0.47, ppmJ: 0.29, w104: 0.6589, w105: 6.8674, free: 100,
  code10: 1011, code9: 505, code8: 252, cMin: 0.97561882,
  cliff: 1.690e-75, apart: 2e-9, leak: ['31.060', '31.097'], d: 724, k: 32, d2: 724.19, k2: 32.016797784
};
const commas = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const RUNGS = [
  { K: '≤ 18', en: 'no stationary', en2: 'point', zh: '三窗内无驻点' },
  { K: '19', en: 'first saddle', en2: '', zh: '首个鞍点' },
  { K: '21', en: 'first strict', en2: 'local minimum', zh: '首个局部极小' },
  { K: '27', en: 'global minimum', en2: 'flavor lost', zh: '全局极小·味塌缩' },
  { K: '31', en: 'local minimum', en2: '+ reference flavor', zh: '参考味局部极小' },
  { K: '36', en: 'global flavor', en2: 'weights track height', zh: '逐高度味全局真空' },
  { K: '105', en: 'one vacuum', en2: 'every height', zh: '统一全局真空' }
];

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  const check = (ok, m) => { if (!ok) E.push('winding-ladder film: ' + m); };
  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === 2, `film.json cites ${lean.length} declarations, expected 2`);
  for (const gid of Object.values(WL_LEAN)) {
    const r = leanCite(gid);
    check(r && r.kind === 'theorem', `${gid} is not a cited theorem`);
  }
  /* 1. the two triads of the noncommutativity witness, and that they are not proportional */
  const t1 = triad(PH, P0, QH), t2 = triad(QH, P0, PH);
  check(t1.join() === '1,1,1,1' && t2.join() === '1,1,1,-1', `triads ${t1} / ${t2}`);
  check(qMul(PH, QH).join() === t1.join() && qMul(QH, PH).join() === t2.join(), 'p0 = 1 drops out of the triads');
  let prop = false;
  for (let k = -6; k <= 6; k++) for (let l = -6; l <= 6; l++) if (k && l && t1.every((v, i) => k * v === l * t2[i])) prop = true;
  check(!prop, 'the two triads are not on one ray');
  /* 2. the quarter: fidelities, Bargmann invariant and the determinant, also by a floating 3 × 3 determinant */
  check(fStr(WL_KAB) === '1/2' && fStr(WL_KBC) === '1/4' && fStr(WL_KCA) === '1/2' && fStr(WL_B) === '1/4', 'fidelities');
  check(fStr(WL_DET) === '1/4', `det G3 = ${fStr(WL_DET)}`);
  const V = [P0, PH, QH], G = V.map(a => V.map(b => dot4(a, b) / Math.sqrt(dot4(a, a) * dot4(b, b))));
  const det = G[0][0] * (G[1][1] * G[2][2] - G[1][2] * G[2][1]) - G[0][1] * (G[1][0] * G[2][2] - G[1][2] * G[2][0]) + G[0][2] * (G[1][0] * G[2][1] - G[1][1] * G[2][0]);
  check(Math.abs(det - 0.25) < 1e-12, `numeric det ${det}`);
  /* 3. the codes are dyadic truncations of one another and sit in the corridor c > 0.97561882 */
  check(WL.code10 >> 1 === WL.code9 && WL.code9 >> 1 === WL.code8, 'codes 1011 → 505 → 252');
  check(WL.code10.toString(2).length === 10 && WL.code9.toString(2).length === 9, 'code lengths');
  check(WL.code10 / 1024 > WL.cMin && (WL.code10 + 1) / 1024 <= 1, 'code 1011 inside the corridor');
  /* 4. the 26-part action and the spoken roundings */
  check(WL.w36.reduce((s, [, m]) => s + m, 0) === WL.parts && WL.w36[WL.w36.length - 1][0] === 36, '26 parts, top winding 36');
  check(WL.ppmV < 0.5 && WL.ppmJ < 0.5, 'below half a ppm');
  check(WL.f27v < 100 / 3 && WL.f27j < 100 / 3, 'below a third of reference');
  check(WL.gapV < 5e-8 && Math.max(WL.vub, WL.jj) < 1.5, 'gap < 5e-8, flavor < 1.5 ppm');
  check(Math.abs(WL.vub) < WL.boxV && Math.abs(WL.jj) < WL.boxJ && Math.abs(WL.vubN) < WL.boxV && Math.abs(WL.jN) < WL.boxJ, 'both zeros inside the density box');
  check(WL.cliff < 1e-74 && Math.min(...WL.leak.map(Number)) > 31, 'cliff < 1e-74, leak > 31 %');
  check(Math.abs(WL.k / WL.d ** 2 - WL.k2 / WL.d2 ** 2) / (WL.k / WL.d ** 2) < 1e-9, 'k/d² unchanged by the joint shift');
  check(commas(WL.zero) === '2,306,888,100,085', 'zero number');
  check(2e12 + 306e9 + 888e6 + 100e3 + 85 === WL.zero, 'spoken zero number');
  check(RUNGS.length === 7, 'seven rungs');
});
Object.assign(FILM.speed, { hook: 0.02, order: 0.016, wall: 0.016, summit: 0.016, damp: 0.014, flagship: 0.014, cracks: 0.012, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const wlFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function rich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], p[2] ? size * 0.62 : size, fam, w), 0) / 2;
  for (const [s, col, sub] of parts) {
    const sz = sub ? size * 0.62 : size;
    txt(s, cx, y + (sub ? size * 0.22 : 0), { size: sz, fam, w, c: col, a, ab: o.ab }); cx += tw(s, sz, fam, w);
  }
  return cx;
}
const WL_MISSING = new Set();
function leanChip(x, y, gid, a, size = 20) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!WL_MISSING.has(gid)) { WL_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt((r.name || r.label).split('.').slice(-1)[0], x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
function tag(x, y, s, col, a) {
  if (a <= 0.003) return;
  const w = tw(s, 16, F.zh, 700, 1) + 20;
  box(x, y - 20, w, 28, col, a, 1.5, 'rgba(0,0,0,0.5)');
  txt(s, x + 10, y, { size: 16, fam: F.zh, w: 700, c: col, a, ls: 1 });
}

/* the staircase: seven rungs, o = { a, cur (index of the current rung, -1 none), upto (last revealed rung) } */
const ST = { x0: 160, w: 228, base: 820, top0: 722, rise: 42 };
const stTop = i => ST.top0 - i * ST.rise;
function stairs(o) {
  const a = o.a;
  if (a <= 0.003) return;
  for (let i = 0; i < RUNGS.length; i++) {
    const R = RUNGS[i], x = ST.x0 + i * ST.w, top = stTop(i), w = ST.w - 10;
    const shown = i <= o.upto, cur = i === o.cur;
    const ra = a * (shown ? clamp(o.rev == null ? 1 : o.rev[i]) : 0.25);
    const col = !shown ? C.dim : cur ? C.now : i === 0 ? C.dim : C.cyan;
    fillBox(x, top, w, ST.base - top, col, ra * (cur ? 0.22 : 0.1));
    box(x, top, w, ST.base - top, col, ra, cur ? 3 : 1.5);
    txt(shown ? R.K : '?', x + w / 2, top - 14, { size: 46, fam: F.orb, w: 900, align: 'center', c: shown ? (cur ? C.now : i === 0 ? C.white : C.cyan) : C.dim, a: ra });
    if (!shown) continue;
    txt(R.en, x + 12, top + 28, { size: 19, fam: F.disp, w: 700, c: C.white, a: ra });
    if (R.en2) txt(R.en2, x + 12, top + 52, { size: 19, fam: F.disp, w: 700, c: C.white, a: ra });
    txt(R.zh, x + 12, top + (R.en2 ? 80 : 56), { size: 19, fam: F.zh, w: 700, c: cur ? C.now : C.dim, a: ra });
  }
}

/* opening title */
function title(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('THE WINDING LADDER', p, 5), W / 2, 580, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 6, ab: 2 });
  txt('529 TRIANGLES · 18 → 105 · ONE ZERO · FOUR CRACKS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                            scene 1 · 529 TRIANGLES                        */
/* ======================================================================= */
const HP = { x0: 980, y0: 790, w: 780, h: 300, r: 0.6 };
SCENES.hook = S => {
  title(S);
  const a = clamp((S.u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - S.u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, null, 'computed']]);
  /* line 1+: one schematic triangle with its loop angle */
  const ta = a * at(S, 0, 0.6);
  if (ta > 0.003) {
    const A = [250, 740], B = [700, 740], Cc = [470, 340];
    line(A[0], A[1], B[0], B[1], C.cyan, ta, 3); line(B[0], B[1], Cc[0], Cc[1], C.cyan, ta, 3); line(Cc[0], Cc[1], A[0], A[1], C.cyan, ta, 3);
    [[A, 'i'], [B, 'j'], [Cc, 'l']].forEach(([p, n]) => { dot(p[0], p[1], 14, 'c', ta); txt(n, p[0] + (n === 'l' ? 22 : n === 'i' ? -30 : 20), p[1] + (n === 'l' ? 0 : 36), { size: 28, fam: F.math, w: 700, c: C.white, a: ta }); });
    const sweep = ease(at(S, 0, 2.0, 0.8));
    ctx.save(); ctx.globalAlpha = ta; ctx.strokeStyle = C.mag; ctx.lineWidth = 4; ctx.beginPath();
    ctx.arc(472, 632, 88, -Math.PI / 2, -Math.PI / 2 + sweep * TAU * 0.86); ctx.stroke(); ctx.restore();
    if (sweep > 0.95) arrow(472 + 88 * Math.cos(-Math.PI / 2 + TAU * 0.86 - 0.2), 632 + 88 * Math.sin(-Math.PI / 2 + TAU * 0.86 - 0.2), 472 + 88 * Math.cos(-Math.PI / 2 + TAU * 0.86), 632 + 88 * Math.sin(-Math.PI / 2 + TAU * 0.86), C.mag, ta, 4);
    txt('φ△(θ₁, θ₂)', 472, 641, { size: 24, fam: F.math, w: 700, align: 'center', c: C.mag, a: ta * sweep });
    tag(150, 230, 'SCHEMATIC · 示意', C.argued, ta);
    const ca = a * Q(S, 0, 'five hundred twenty-nine', 0.5);
    if (ca > 0.003) {
      txt('529', 740, 300, { size: 84, fam: F.orb, w: 900, c: C.cyan, a: ca, ab: 2 });
      txt('triangles · 三角面', 750, 346, { size: 24, fam: F.zh, w: 700, c: C.white, a: ca });
    }
  }
  /* line 2: the action */
  const fa = a * at(S, 1, 0.6);
  if (fa > 0.003) {
    panel(980, 200, 800, 200, fa, C.argued, 'THE MODEL · 模型 · S_w');
    rich([['S', C.white], ['w', C.white, 1], [' = Σ', C.white], ['k', C.now, 1], [' w', C.white], ['k', C.now, 1], [' Σ', C.white], ['△', C.cyan, 1], [' s', C.white], ['△', C.cyan, 1], [' (1 − cos ', C.white], ['k', C.now], [' φ', C.mag], ['△', C.mag, 1], [')', C.white]], 1010, 300, { size: 42, a: fa });
    txt('w_k ≥ 0,  Σ w_k = 1 · 非负归一权   k = winding · 绕数', 1010, 360, { size: 22, fam: F.zh, w: 700, c: C.dim, a: fa });
  }
  /* lines 2–3: the harmonics 1 − cos(kφ) near zero phase (computed) */
  const pa = a * at(S, 1, 0.6, 1.2);
  if (pa > 0.003) {
    const X = f => HP.x0 + (f + HP.r) / (2 * HP.r) * HP.w, Y = v => HP.y0 - v / 2 * HP.h;
    line(HP.x0, HP.y0, HP.x0 + HP.w, HP.y0, C.dim, pa, 2);
    line(X(0), HP.y0, X(0), HP.y0 - HP.h - 10, C.dim, pa * 0.6, 1.5);
    txt('φ', HP.x0 + HP.w + 14, HP.y0 + 8, { size: 26, fam: F.math, w: 700, c: C.white, a: pa });
    txt('0', X(0), HP.y0 + 30, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: pa });
    txt('1 − cos kφ', HP.x0, HP.y0 - HP.h - 14, { size: 22, fam: F.math, w: 700, c: C.white, a: pa });
    curve(t => { const f = -HP.r + 2 * HP.r * t; return [X(f), Y(1 - Math.cos(f))]; }, 120, C.cyan, pa, 3);
    txt('k = 1', X(HP.r) - 6, Y(1 - Math.cos(HP.r)) - 12, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: pa });
    const ka = a * Q(S, 2, 'sharper harmonics', 0.8);
    if (ka > 0.003) {
      curve(t => { const f = -HP.r + 2 * HP.r * t * ka; return [X(f), Y(1 - Math.cos(19 * f))]; }, 600, C.now, a, 2.5);
      txt('k = 19', HP.x0 + HP.w, HP.y0 - HP.h - 14, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.now, a: ka });
      txt('narrow pockets · 狭窄势阱', X(0), HP.y0 + 30 + 32, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.now, a: a * Q(S, 2, 'narrow pockets', 0.6) });
    }
  }
};

/* ======================================================================= */
/*                            scene 2 · ORDER MATTERS                        */
/* ======================================================================= */
function qRow(x, y, lab, v, a, flip) {
  if (a <= 0.003) return;
  txt(lab, x, y + 44, { size: 34, fam: F.math, w: 700, c: C.white, a });
  for (let i = 0; i < 4; i++) {
    const cx = x + 440 + i * 100, isF = flip && i === 3;
    box(cx, y, 86, 64, isF ? C.now : C.cyan, a, isF ? 3 : 1.5, 'rgba(0,0,0,0.5)');
    txt(String(v[i]), cx + 43, y + 44, { size: 34, fam: F.mono, w: 700, align: 'center', c: isF ? C.now : C.white, a });
  }
}
SCENES.order = S => {
  const a = wlFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [2, 'Lean checks', 'lean']]);
  /* line 0: commuting would make loops add */
  const ia = a * at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (ia > 0.003) {
    txt('Why can a triangle feel orientation? · 三角面凭什么分得出取向？', W / 2, 300, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.white, a: ia });
    rich([['a·b ', C.cyan], ['≠', C.now], [' b·a', C.mag]], W / 2, 450, { size: 72, align: 'center', a: ia * Q(S, 0, 'do not commute', 0.5) });
    panel(560, 560, 800, 150, ia * Q(S, 0, 'otherwise', 0.5), C.argued, 'OTHERWISE · 否则');
    txt('loop phases would simply add · 回路相位只会相加', 590, 650, { size: 28, fam: F.zh, w: 700, c: C.white, a: ia * Q(S, 0, 'otherwise', 0.5) });
  }
  /* line 1: the two products, computed */
  const pa = a * at(S, 1, 0.6);
  const xR = 260;
  if (pa > 0.003) {
    txt('a, b, c, d  in  a + b i + c j + d k', xR + 440, 236, { size: 22, fam: F.mono, w: 700, c: C.dim, a: pa });
    qRow(xR, 260, '(1 + i)(1 + j) =', triad(PH, P0, QH), pa, false);
    const ra = a * Q(S, 1, 'Reverse them', 0.5);
    qRow(xR, 360, '(1 + j)(1 + i) =', triad(QH, P0, PH), ra, Q(S, 1, 'flips', 0.3) > 0.5);
    txt('triad(a, b, c) = (a · b*) · c,   b = p₀ = 1', xR + 880, 300, { size: 22, fam: F.mono, w: 700, c: C.dim, a: pa });
    txt('not one ray · 不在同一射线', xR + 880, 404, { size: 26, fam: F.zh, w: 700, c: C.now, a: a * Q(S, 2, 'different rays', 0.5) });
  }
  /* line 2: the Gram quarter */
  const ga = a * at(S, 2, 0.6);
  if (ga > 0.003) {
    panel(220, 480, 1480, 330, ga, C.lean, 'TWO FROZEN FACTS · 两条冻结定理');
    leanChip(260, 556, WL_LEAN.ray, ga * Q(S, 2, 'different rays', 0.5), 22);
    txt('¬ (triad(p½, p₀, q½) ∼ray triad(q½, p₀, p½))', 1000, 556, { size: 24, fam: F.math, w: 700, c: C.white, a: ga * Q(S, 2, 'different rays', 0.5) });
    const qa = ga * Q(S, 2, 'Gram determinant', 0.5);
    txt('half-step triad 1, 1 + i, 1 + j:   κ = ' + fStr(WL_KAB) + ', ' + fStr(WL_KBC) + ', ' + fStr(WL_KCA) + '   B = ' + fStr(WL_B), 260, 630, { size: 26, fam: F.math, w: 700, c: C.white, a: qa });
    rich([['det G₃ = 1 + 2B − Σκ = 1 + 1/2 − 5/4 = ', C.white], [fStr(WL_DET), C.lean]], 260, 700, { size: 36, a: qa });
    leanChip(260, 776, WL_LEAN.gram, qa, 22);
    txt('axioms: [ ] · 零公理', 1000, 776, { size: 24, fam: F.zh, w: 700, c: C.lean, a: qa });
    stamp('1/4', 1560, 690, Q(S, 2, 'exactly one quarter', 0.5), C.lean, 54, -0.06);
  }
};

/* ======================================================================= */
/*                               scene 3 · THE WALL                          */
/* ======================================================================= */
function factPanel(x, y, w, h, a, col, head, rows) {
  if (a <= 0.003) return;
  panel(x, y, w, h, a, col, head);
  rows.forEach(([s, c, size, fam], i) => txt(s, x + 28, y + 76 + i * 46, { size: size || 28, fam: fam || F.zh, w: 700, c: c || C.white, a }));
}
SCENES.wall = S => {
  const a = wlFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const k1 = at(S, 0, 0.01) > 0, k2 = Q(S, 1, 'At nineteen', 0.01) > 0, k3 = Q(S, 1, 'At twenty-one', 0.01) > 0, k4 = at(S, 2, 0.01) > 0;
  const cur = k4 ? 3 : k3 ? 2 : k2 ? 1 : k1 ? 0 : -1;
  stairs({ a, cur, upto: cur });
  const fx = 500, fy = 190, fw = 1260, fh = 210;
  if (cur === 0) factPanel(fx, fy, fw, fh, a * at(S, 0, 0.5), C.dim, 'K ≤ 18 · 三窗内无驻点', [
    ['‖∇S_w‖ > ' + WL.grad + '   for every w ≥ 0', C.white, 40, F.math],
    ['任意非负归一权，三窗内梯度处处不为零', C.dim, 24]
  ]);
  if (cur === 1 || cur === 2) {
    const s1 = a * Q(S, 1, 'At nineteen', 0.5), s2 = a * Q(S, 1, 'At twenty-one', 0.5);
    factPanel(fx, fy, 610, fh, s1, cur === 1 ? C.now : C.cyan, 'K = 19 · 首个驻点', [
      ['saddle · 鞍点', C.white, 34],
      ['zero #' + commas(WL.saddle), C.dim, 24, F.mono]
    ]);
    factPanel(fx + 650, fy, 610, fh, s2, C.now, 'K = 21 · 首个严格局部极小', [
      ['local minimum · 局部极小', C.white, 34],
      ['zero #' + commas(WL.localMin) + ' · zero phase still lower', C.dim, 22, F.mono]
    ]);
  }
  if (cur === 3) {
    const fa = a * at(S, 2, 0.5);
    panel(fx, fy, fw, fh, fa, C.now, 'K = 27 · GLOBAL MINIMUM IN THE WINDOWS · 全局极小落进三窗');
    const ba = a * at(S, 2, 0.6, 0.6);
    [[[['|V', C.white], ['ub', C.white, 1], ['|²', C.white]], WL.f27v], [[['J', C.white]], WL.f27j]].forEach(([lab, v], i) => {
      const y = fy + 50 + i * 60, bx = fx + 200, bw = 760;
      rich(lab, fx + 30, y + 30, { size: 30, a: ba });
      box(bx, y, bw, 40, C.dim, ba, 1.5);
      fillBox(bx, y, bw * v / 100 * ease(ba), 40, C.now, ba * 0.7);
      txt('≤ ' + v + ' %', bx + bw * v / 100 + 16, y + 30, { size: 28, fam: F.mono, w: 700, c: C.now, a: ba });
      txt('100 % reference · 参考', bx + bw - 8, y + 30, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.dim, a: ba });
    });
    txt('flavor collapses · 味塌缩', fx + fw - 30, fy + 190, { size: 24, fam: F.zh, w: 700, align: 'right', c: C.now, a: ba });
  }
};

/* ======================================================================= */
/*                           scene 4 · ONE HUNDRED FIVE                      */
/* ======================================================================= */
SCENES.summit = S => {
  const a = wlFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const cur = at(S, 2, 0.01) > 0 ? 6 : at(S, 1, 0.01) > 0 ? 5 : 4;
  stairs({ a, cur, upto: cur });
  const fx = 160, fy = 190, fw = 1600;
  if (cur === 4) factPanel(fx, fy, 1040, 210, a * at(S, 0, 0.5), C.now, 'K = 31 · 参考味局部极小', [
    ['three positive weights needed · 需三项正权', C.white, 32],
    ['K ≤ 30: every reference-flavor point curves downward', C.dim, 22, F.mono]
  ]);
  if (cur === 5) {
    const fa = a * at(S, 1, 0.5);
    panel(fx, fy, 1300, 250, fa, C.now, 'K = 36 · WEIGHTS MAY TRACK HEIGHT · 权重随高度调整');
    rich([['w = (δ₁ + δ₂ + 2δ₃₀ + δ₃₂ + 15δ₃₃ + 6δ₃₆) / ', C.white], ['26', C.cyan]], fx + 28, fy + 90, { size: 34, a: fa });
    txt('residuals ' + WL.res26.join(' / ') + ' · 残差', fx + 28, fy + 140, { size: 24, fam: F.zh, w: 700, c: C.dim, a: fa });
    const pa = a * at(S, 1, 0.6, 3.0);
    rich([['same six windings, ', C.white], [String(WL.parts2), C.now], [' parts:  |V', C.white], ['ub', C.white, 1], ['|² < ' + WL.ppmV + ' ppm,  J < ' + WL.ppmJ + ' ppm', C.white]], fx + 28, fy + 204, { size: 30, a: pa });
  }
  if (cur === 6) {
    const fa = a * at(S, 2, 0.5);
    panel(fx, fy, 1180, 230, fa, C.now, 'K = 105 · ONE FIXED VACUUM FOR EVERY HEIGHT · 统一全局真空');
    txt('K ≤ 104: all four phase branches excluded · 四条相位支全部排除', fx + 28, fy + 80, { size: 24, fam: F.zh, w: 700, c: C.dim, a: fa });
    rich([['w₁₀₄ > ' + WL.w104 + ' %,   w₁₀₅ > ' + WL.w105 + ' %', C.white]], fx + 28, fy + 140, { size: 34, a: fa });
    const ra = a * Q(S, 2, 'one hundred coefficients', 0.6);
    rich([['still ', C.white], [String(WL.free), C.mag], [' free coefficients · 个连续自由系数', C.white]], fx + 28, fy + 200, { size: 32, a: ra, fam: F.zh });
    stamp('100 FREE', 1520, 300, ra, C.mag, 44, -0.06);
  }
};

/* ======================================================================= */
/*                               scene 5 · NO DAMPING                        */
/* ======================================================================= */
function bits(x, y, n, cw, a, label, col, verdict, vcol) {
  if (a <= 0.003) return;
  const s = n.toString(2);
  txt(label, x, y - 16, { size: 24, fam: F.zh, w: 700, c: C.white, a });
  for (let i = 0; i < s.length; i++) {
    box(x + i * cw, y, cw - 8, 56, col, a, 1.5, 'rgba(0,0,0,0.5)');
    txt(s[i], x + i * cw + (cw - 8) / 2, y + 40, { size: 32, fam: F.mono, w: 700, align: 'center', c: col, a });
  }
  txt(verdict, x + s.length * cw + 20, y + 40, { size: 28, fam: F.zh, w: 700, c: vcol, a });
}
SCENES.damp = S => {
  const a = wlFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [0, 'Interval certificates', 'computed']]);
  /* left: a decaying weight profile, schematic */
  const la = a * at(S, 0, 0.6);
  if (la > 0.003) {
    panel(140, 190, 760, 330, la, C.cyan, 'NON-INCREASING WEIGHTS · 随圈数不增的权');
    for (let k = 1; k <= 16; k++) {
      const hgt = 220 * Math.pow(0.82, k - 1) * clamp(at(S, 0, 0.8, 0.05 * k) * 1.5);
      fillBox(180 + (k - 1) * 42, 490 - hgt, 30, hgt, C.cyan, la * 0.55);
    }
    txt('w₁ ≥ w₂ ≥ w₃ ≥ … ≥ 0', 560, 260, { size: 28, fam: F.math, w: 700, c: C.white, a: la });
    tag(560, 310, 'SCHEMATIC · 示意', C.argued, la);
  }
  /* right: the gap to a native competitor */
  const ga = a * Q(S, 0, 'native shell competitor', 0.6);
  if (ga > 0.003) {
    panel(960, 190, 820, 330, ga, C.mag, 'ACTION · 作用量');
    const yTop = 290, yBot = 450;
    line(1000, yTop, 1380, yTop, C.white, ga, 3);
    txt('any 3-window reference-flavor point', 1400, yTop + 2, { size: 20, fam: F.disp, w: 700, c: C.white, a: ga });
    txt('任何合三窗且恢复参考味的相位', 1400, yTop + 30, { size: 18, fam: F.zh, w: 700, c: C.dim, a: ga });
    line(1000, yBot, 1380, yBot, C.mag, ga, 3);
    txt('native competitor', 1400, yBot + 2, { size: 20, fam: F.disp, w: 700, c: C.mag, a: ga });
    txt('原生竞争点', 1400, yBot + 30, { size: 18, fam: F.zh, w: 700, c: C.dim, a: ga });
    const gp = Q(S, 0, 'over one quarter', 0.6);
    arrow(1190, yTop + 8, 1190, yBot - 8, C.now, ga * gp, 3); arrow(1190, yBot - 8, 1190, yTop + 8, C.now, ga * gp, 3);
    txt('> 1/4', 1214, (yTop + yBot) / 2 + 14, { size: 40, fam: F.orb, w: 900, c: C.now, a: ga * gp });
    txt('levels schematic · 位置示意', 1000, 500, { size: 18, fam: F.zh, w: 700, c: C.dim, a: ga });
  }
  /* line 2: the codes */
  const ca = a * at(S, 1, 0.6);
  bits(300, 610, WL.code10, 60, ca, '10 binary digits · 十位码  ⌊2¹⁰ c⌋ = ' + WL.code10, C.cyan, 'all excluded · 全数排除', C.cyan);
  bits(300, 730, WL.code9, 60, a * Q(S, 1, 'With nine digits', 0.6), '9 binary digits · 九位码  ⌊2⁹ c⌋ = ' + WL.code9, C.now, 'counterexample · 反例', C.now);
};

/* ======================================================================= */
/*                            scene 6 · THE FLAGSHIP ZERO                    */
/* ======================================================================= */
const PP = { x0: 1000, w: 720, r: 2.2 };
SCENES.flagship = S => {
  const a = wlFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Yet this is', 'argued']]);
  const za = a * at(S, 0, 0.6);
  txt('RIEMANN ZERO · 黎曼零点', W / 2, 220, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: za, ls: 4 });
  txt('#' + commas(WL.zero), W / 2, 300, { size: 76, fam: F.orb, w: 900, align: 'center', c: C.now, a: za, ab: 2 });
  /* line 1: windows and the gap */
  const wa = a * at(S, 1, 0.6);
  if (wa > 0.003) {
    panel(160, 360, 760, 240, wa, C.cyan, 'ITS OWN TWO CLOCKS · 它自己的两只钟');
    ['[1]', '[2]', '[4]'].forEach((s, i) => { const p = clamp(at(S, 1, 0.4, 0.4 + 0.35 * i)); chip(240 + i * 130, 440, 110, 54, s + ' ✓', C.cyan, wa * p, 26); });
    txt('three windows · 三窗', 590, 450, { size: 24, fam: F.zh, w: 700, c: C.white, a: wa });
    const ga = a * Q(S, 1, 'with an action', 0.5);
    txt('105-winding gap · 能隙', 190, 530, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ga });
    txt(WL.gap, 190, 578, { size: 40, fam: F.math, w: 700, c: C.white, a: ga });
  }
  /* line 2: the ppm ruler with the density box */
  const pa = a * at(S, 2, 0.6);
  if (pa > 0.003) {
    panel(960, 360, 800, 240, pa, C.cyan, 'FLAVOR ERROR · 味偏差 (ppm)');
    const X = v => PP.x0 + (v + PP.r) / (2 * PP.r) * PP.w;
    [[[['|V', C.white], ['ub', C.white, 1], ['|²', C.white]], WL.vub, WL.vubN, WL.boxV, 450], [[['J', C.white]], WL.jj, WL.jN, WL.boxJ, 530]].forEach(([lab, v, vn, bx, y]) => {
      line(X(-PP.r), y, X(PP.r), y, C.dim, pa, 2);
      fillBox(X(-bx), y - 18, X(bx) - X(-bx), 36, C.cyan, pa * 0.12);
      box(X(-bx), y - 18, X(bx) - X(-bx), 36, C.cyan, pa * 0.6, 1);
      line(X(0), y - 24, X(0), y + 24, C.white, pa, 2);
      dot(X(vn), y, 11, 'c', pa * Q(S, 2, 'Both flavor readings', 0.5));
      dot(X(v), y, 14, 'g', pa);
      rich(lab, PP.x0 - 8, y - 26, { size: 22, a: pa });
      txt((v > 0 ? '+' : '') + v, X(v), y - 26, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.now, a: pa });
      txt('±' + bx, X(bx) + 8, y + 32, { size: 18, fam: F.mono, w: 700, c: C.cyan, a: pa });
    });
    txt('● #' + commas(WL.zero), 1000, 588, { size: 18, fam: F.mono, w: 700, c: C.now, a: pa });
    txt('● #' + commas(WL.zeroNeigh), 1390, 588, { size: 18, fam: F.mono, w: 700, c: C.cyan, a: pa });
  }
  /* line 3: density, and what kind of result this is */
  const da = a * at(S, 3, 0.6);
  if (da > 0.003) {
    panel(160, 640, 760, 170, da, C.cyan, 'JOINT NEAR-VACUUM ZEROS · 联合近真空零点');
    txt('natural lower density > ' + WL.dens, 190, 720, { size: 30, fam: F.math, w: 700, c: C.white, a: da });
    txt('gap < 10⁻⁷,  < 2 ppm,  < 1.2 ppm · 自然下密度', 190, 770, { size: 22, fam: F.zh, w: 700, c: C.dim, a: da });
    const ma = a * Q(S, 3, 'Yet this is', 0.5);
    panel(960, 640, 800, 170, ma, C.argued, 'WHAT KIND OF RESULT · 结论的身份');
    txt('a witness inside the model', 990, 718, { size: 32, fam: F.disp, w: 700, c: C.white, a: ma });
    txt('模型内部的见证 ≠ 夸克混合的推导', 990, 770, { size: 26, fam: F.zh, w: 700, c: C.argued, a: ma * Q(S, 3, 'not a derivation', 0.5) });
  }
};

/* ======================================================================= */
/*                              scene 7 · FOUR CRACKS                        */
/* ======================================================================= */
SCENES.cracks = S => {
  const a = wlFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  txt('#' + commas(WL.zero) + ' · FOUR STRESS TESTS · 四重压力测试', W / 2, 210, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.now, a: a * at(S, 0, 0.6) });
  const cells = [
    { x: 140, y: 250, head: 'TEST 1 · RESOLUTION CLIFF · 反演悬崖', rows: [['Δw = 2 × 10⁻⁹  ⟹  ΔS < 1.690 × 10⁻⁷⁵', C.white, 30, F.math], ['near the vacuum, weights become invisible', C.dim, 22, F.disp], ['真空附近，权重几乎读不出来', C.dim, 22]] },
    { x: 990, y: 250, head: 'TEST 2 · LIGHT-MODE LEAKAGE · 跨荷泄漏', rows: [['charge 1 → heavy states of 2, −4', C.white, 28, F.disp], ['> ' + WL.leak[0] + ' %  /  > ' + WL.leak[1] + ' %', C.white, 30, F.math], ['任意站点相位与重排之后仍然泄漏', C.dim, 22]] },
    { x: 140, y: 530, head: 'TEST 3 · PROTON SILENCE · 质子沉默', rows: [['orthogonal current:  ΔB ≡ 0 (mod 3)', C.white, 26, F.math], ['parallel current:  QQQL decay', C.white, 26, F.math], ['同一真空、同一树级谱，两者都容得下', C.dim, 22]] },
    { x: 990, y: 530, head: 'TEST 4 · ONE MISSING SCALE LAW · 缺失的尺度律', rows: [['(k, d) = (32, 724)  ~  (32.016797784, 724.19)', C.white, 26, F.math], ['the windows see only  k / d²', C.white, 28, F.disp], ['三窗只钉住 k/d²', C.dim, 22]] }
  ];
  let cl = 0;
  for (let j = 0; j < S.L.length; j++) if (S.u >= S.L[j].s) cl = j;
  cells.forEach((c, i) => factPanel(c.x, c.y, 790, 230, a * (i ? at(S, i, 0.6) : Q(S, 0, 'Near the vacuum', 0.6)), cl === i ? C.now : C.cyan, c.head, c.rows));
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
  const sc = TL.scenes[3], t = sc.start + 6;
  background(t, sc, 3, 6);
  txt(DATA.film.title_zh, W / 2, 250, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('THE WINDING LADDER', W / 2, 340, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 2, ls: 6 });
  txt('529 triangles · K ≤ 18 → 19 → 21 → 27 → 31 → 36 → 105', W / 2, 410, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.mag });
  stairs({ a: 1, cur: 6, upto: 6 });
  bloom(0.5);
  txt(`${DATA.book.code} · FILM`, W / 2, 900, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 3, sc);
  post(0);
};
