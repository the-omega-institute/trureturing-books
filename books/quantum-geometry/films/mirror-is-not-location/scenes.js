/* Film · A mirror is not a location · 镜子不等于定位
   (book quantum-geometry, part VIII: chapter 31). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     mirror   the critical line Re s = 1/2 as a mirror: a walker s and its twin 1 − s̄ (argued: the room is a picture).
     lamps    lamps at 0 and 1; the ratio r(s) = |s − 1| / |s| of the two distances: r(2) = 1/2, r(−1) = 2, the mirror
              s ↦ 1 − s̄ swaps the two distances so r(1 − s̄) = 1 / r(s), and r = 1 on the bisector (computed).
     ruler    CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line (LEAN): ‖(s − 1)/s‖ = 1 ↔ Re s = 1/2 for every
              s ∈ ℂ (s = 0 included through Lean's total division); the skeleton |s − 1|² − |s|² = 1 − 2 Re s;
              CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion (LEAN): RiemannHypothesis ↔ every zero
              ρ of riemannZeta with ρ ∉ {−2(n + 1)} and ρ ≠ 1 has log ‖(ρ − 1)/ρ‖ = 0;
              RightHalfStripRiemannReduction.golden_right_half_strip_implies_rh (LEAN): no zero with 1/2 < Re ρ < 1
              implies RiemannHypothesis.
     forgery  F(s) = ((z − δ)² + γ²)((z + δ)² + γ²), z = s − 1/2, δ = 1/4, γ = 14: zeros 1/2 ± 1/4 ± 14i, F(1 − s) = F(s),
              F(s̄) = conj F(s); ratios 0.998727 (Re 3/4) and 1.001274 (Re 1/4); F(1/2 + it) = (δ² + γ² − t²)² + 4δ²t² ≥ 49
              (computed) ..... FullSymmetryNonlocalization.full_symmetry_not_fixed_line_localization (LEAN), for every
              δ ≠ 0, γ ≠ 0.
     idol     symmetry does not seat the zeros (argued; the formal content is the forgery above).
     edge     the Riemann hypothesis: external Lean proof, independently replayed, not frozen in the pinned repository
              (no badge colour of its own); the lamps are a picture (argued); prob-ch34-arithmetic-pivot-area-law (open).

   On load, FILM.init checks DATA.lean against the four theorems and re-derives every number on screen by an independent
   route (complex arithmetic on random points, the quartic expanded by its four linear factors, a dense scan of the line).
   Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const MI_LEAN = {
  cayley_ratio_norm_one_iff_critical_line: 'D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line',
  cayley_critical_line_zeta_criterion: 'D5/S3/Midline/Cayley/CayleyCriticalLineZetaCriterion.cayley_critical_line_zeta_criterion',
  golden_right_half_strip_implies_rh: 'D5/S3/Weil/ZetaBridge/RightHalfStripRiemannReduction.golden_right_half_strip_implies_rh',
  full_symmetry_not_fixed_line_localization: 'D5/S3/Zeros/SymmetricPolynomial/FullSymmetryNonlocalization.full_symmetry_not_fixed_line_localization'
};
/* complex numbers as [re, im] */
const mc = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1]],
  sub: (a, b) => [a[0] - b[0], a[1] - b[1]],
  mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
  div: (a, b) => { const n = b[0] * b[0] + b[1] * b[1]; return n === 0 ? [0, 0] : [(a[0] * b[0] + a[1] * b[1]) / n, (a[1] * b[0] - a[0] * b[1]) / n]; },
  abs: a => Math.hypot(a[0], a[1]),
  conj: a => [a[0], -a[1]]
};
const miMirror = s => [1 - s[0], s[1]];                       // s ↦ 1 − s̄
const miRatio = s => mc.abs(mc.div(mc.sub(s, [1, 0]), s));    // ‖(s − 1)/s‖, with Lean's total division at s = 0
const MI_D = 0.25, MI_G = 14;
const miF = s => { const z = mc.sub(s, [0.5, 0]); const a = mc.sub(z, [MI_D, 0]), b = mc.add(z, [MI_D, 0]);
  return mc.mul(mc.add(mc.mul(a, a), [MI_G * MI_G, 0]), mc.add(mc.mul(b, b), [MI_G * MI_G, 0])); };
const MI_ZEROS = [[0.5 + MI_D, MI_G], [0.5 - MI_D, MI_G], [0.5 + MI_D, -MI_G], [0.5 - MI_D, -MI_G]];
const MI_RIN = miRatio(MI_ZEROS[0]), MI_ROUT = miRatio(MI_ZEROS[1]);

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('mirror-is-not-location film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(MI_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(MI_LEAN).length}`);
  for (const [short, gid] of Object.entries(MI_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. LAMPS: the hand computations */
  check(near(miRatio([2, 0]), 0.5) && near(miRatio([-1, 0]), 2), 'r(2) = 1/2, r(−1) = 2');
  check(near(miMirror([2, 0])[0], -1), 'the mirror image of 2 is −1');
  check(near(miRatio([0.5, 1]), 1) && near(miRatio([0.5, -0.7]), 1), 'r = 1 on the bisector');
  check(miRatio([0, 0]) === 0, 'total division: r(0) = 0');
  /* the ratio flips under the mirror and is 1 exactly on Re s = 1/2; the skeleton |s − 1|² − |s|² = 1 − 2 Re s */
  for (let k = 0; k < 200; k++) {
    const s = [6 * rnd(k, 1) - 3, 6 * rnd(k, 2) - 3];
    check(near(miRatio(miMirror(s)) * miRatio(s), 1, 1e-9), `flip ${k}`);
    const d = Math.pow(mc.abs(mc.sub(s, [1, 0])), 2) - Math.pow(mc.abs(s), 2);
    check(near(d, 1 - 2 * s[0], 1e-9), `skeleton ${k}`);
    check((Math.abs(miRatio(s) - 1) < 1e-12) === (Math.abs(s[0] - 0.5) < 1e-12), `iff ${k}`);
  }

  /* 2. FORGERY: zeros, symmetries, ratios, the minimum on the line */
  MI_ZEROS.forEach((z, i) => check(mc.abs(miF(z)) < 1e-9, `zero ${i}`));
  const fac = s => MI_ZEROS.reduce((p, z) => mc.mul(p, mc.sub(s, z)), [1, 0]);
  for (let k = 0; k < 80; k++) {
    const s = [3 * rnd(k, 5) - 1, 40 * rnd(k, 6) - 20], f = miF(s);
    const g = fac(s), m = miF(mc.sub([1, 0], s)), c = miF(mc.conj(s));
    const sc = Math.max(1, mc.abs(f));
    check(mc.abs(mc.sub(f, g)) / sc < 1e-12, `factorization ${k}`);
    check(mc.abs(mc.sub(f, m)) / sc < 1e-12, `reflection ${k}`);
    check(mc.abs(mc.sub(c, mc.conj(f))) / sc < 1e-12, `conjugation ${k}`);
  }
  MI_ZEROS.forEach((z, i) => check(z[0] !== 0.5, `zero ${i} is off the line`));
  check(MI_RIN.toFixed(6) === '0.998727' && MI_ROUT.toFixed(6) === '1.001274', `ratios ${MI_RIN} ${MI_ROUT}`);
  check(near(MI_RIN * MI_ROUT, 1, 1e-12), 'the two ratios are a mirror pair');
  let lo = Infinity;
  for (let i = 0; i <= 40000; i++) {
    const t = -30 + 60 * i / 40000, f = miF([0.5, t]);
    check(Math.abs(f[1]) < 1e-6 * Math.max(1, f[0]), `real on the line ${t}`);
    check(near(f[0], Math.pow(MI_D * MI_D + MI_G * MI_G - t * t, 2) + 4 * MI_D * MI_D * t * t, 1e-6 * Math.max(1, f[0])), `closed form ${t}`);
    lo = Math.min(lo, f[0]);
  }
  check(near(4 * MI_D * MI_D * MI_G * MI_G, 49) && lo >= 49 - 1e-9 && lo < 49.001, `minimum on the line ${lo}`);
  check(near(miF([0.5, Math.sqrt(MI_G * MI_G - MI_D * MI_D)])[0], 49, 1e-6), 'minimum 49 at t² = γ² − δ²');
  check(near(MI_D * MI_D + MI_G * MI_G, 196.0625), 'δ² + γ² = 196.0625');
});
Object.assign(FILM.speed, { mirror: 0.02, lamps: 0.014, ruler: 0.014, forgery: 0.018, idol: 0.02, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const miFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function miRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al) }); cx += tw(s, size, fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const MI_MISSING = new Set();
function miLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!MI_MISSING.has(gid)) { MI_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 18, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a plane: real part across, imaginary part up */
function miPlane(ox, oy, kx, ky) { return s => [ox + s[0] * kx, oy - s[1] * ky]; }
/* the glass: the line Re s = 1/2 drawn as a glowing mirror between y0 and y1 */
function miGlass(P, y0, y1, a, col = C.cyan) {
  if (a <= 0.003) return;
  const x = P([0.5, 0])[0];
  fillBox(x - 7, y0, 14, y1 - y0, col, a * 0.08);
  line(x, y0, x, y1, col, a * 0.9, 3);
  for (let y = y0 + 20; y < y1; y += 46) line(x - 8, y + 10, x + 8, y - 10, col, a * 0.3, 1.5);
}
function miLamp(p, lab, a) {
  if (a <= 0.003) return;
  dot(p[0], p[1], 46, 'g', a * 0.35);
  dot(p[0], p[1], 18, 'w', a);
  txt(lab, p[0], p[1] + 52, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a });
}
/* opening title */
function miTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('A MIRROR IS NOT A LOCATION', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('MIRROR · LAMPS · RATIO · FORGERY · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                               scene 1 · THE MIRROR                        */
/* ======================================================================= */
const MR_P = miPlane(440, 560, 300, 300);
SCENES.mirror = S => {
  const u = S.u;
  miTitle(S);
  const a = clamp((u - lineAt(S, 0).s - 0.7) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const P = MR_P;
  /* the strip 0 < Re s < 1, faint */
  const x0 = P([0, 0])[0], x1 = P([1, 0])[0];
  fillBox(x0, 200, x1 - x0, 640, C.vio, a * 0.06 * Q(S, 1, 'zeta function', 0.8));
  miGlass(P, 200, 840, a * Q(S, 0, 'mirror wall', 0.8));
  txt('Re s = ½', P([0.5, 0])[0], 186, { size: 26, fam: F.math, w: 700, align: 'center', c: C.cyan, a: a * Q(S, 1, 'one half', 0.6) });
  /* the walker and its twin */
  const t = S.u * 0.45;
  const s = [0.5 + 0.55 + 0.35 * Math.sin(t * 1.3), 0.7 * Math.sin(t)];
  const m = miMirror(s), ps = P(s), pm = P(m);
  const wa = a * Q(S, 0, 'your twin', 0.8);
  ctx.save(); ctx.setLineDash([6, 8]); line(ps[0], ps[1], pm[0], pm[1], C.white, wa * 0.35, 1.5); ctx.restore();
  dot(ps[0], ps[1], 22, 'g', a);
  txt('you · 你  s', ps[0] + 26, ps[1] - 18, { size: 24, fam: F.zh, w: 700, c: C.now, a });
  dot(pm[0], pm[1], 18, 'w', wa * 0.8);
  txt('twin · 镜像  1 − s̄', pm[0] - 26, pm[1] - 18, { size: 24, fam: F.zh, w: 700, align: 'right', c: C.white, a: wa * 0.85 });
  /* line 2: the question */
  panel(1120, 260, 680, 360, a * Q(S, 1, 'zeta function', 0.8), C.cyan, 'THE MIRROR OF ZETA · ζ 的镜子');
  const pa = a * Q(S, 1, 'zeta function', 0.8);
  miRich([['s  ↔  1 − s̄', C.white]], 1150, 340, { size: 36, a: pa });
  txt('nontrivial zeros pair up · 非平凡零点成对', 1150, 400, { size: 24, fam: F.zh, w: 700, c: C.white, a: pa * Q(S, 2, 'mirror pairs', 0.6) });
  txt('must a zero stand on the glass?', 1150, 480, { size: 26, fam: F.disp, w: 700, c: C.now, a: pa * Q(S, 2, 'does a mirror', 0.6) });
  txt('零点非得站在玻璃上吗？', 1150, 526, { size: 28, fam: F.zh, w: 700, c: C.now, a: pa * Q(S, 2, 'does a mirror', 0.6) });
  txt('a room is a picture · 房间只是比方', 1150, 590, { size: 22, fam: F.zh, w: 700, c: C.argued, a: pa * 0.9 });
};

/* ======================================================================= */
/*                               scene 2 · TWO LAMPS                         */
/* ======================================================================= */
const LP_P = miPlane(560, 560, 260, 260);
/* where the point is: 2 (line 2, first half), −1 (line 2, second half, and line 3), then up the bisector (line 4) */
function lpPoint(S) {
  const tm = phraseAt(S, 2, 'At minus one'), tb = lineAt(S, 4).s;
  const m1 = ease(clamp((S.u - tm + 0.2) / 0.9));
  let s = [lerp(2, -1, m1), 0];
  const b = ease(clamp((S.u - tb) / 1.4));
  if (b > 0) {
    const y = lerp(0, 0.8, b) + 0.2 * Math.sin(clamp((S.u - tb - 1.4) / 4) * Math.PI);
    s = [lerp(-1, 0.5, b), y];
  }
  return s;
}
SCENES.lamps = S => {
  const u = S.u, a = miFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, null, 'computed']]);
  const P = LP_P;
  /* axis */
  const ax0 = P([-1.6, 0]), ax1 = P([2.6, 0]);
  arrow(ax0[0], ax0[1], ax1[0], ax1[1], C.dim, a * 0.7, 2);
  for (const k of [-1, 0, 1, 2]) { const q = P([k, 0]); line(q[0], q[1] - 8, q[0], q[1] + 8, C.dim, a, 2); txt(k < 0 ? '−1' : String(k), q[0], q[1] + 92, { size: 24, fam: F.math, w: 700, align: 'center', c: C.dim, a }); }
  /* the bisector (line 4) */
  const ga = a * Q(S, 4, 'halfway', 0.8);
  miGlass(P, 190, 900, ga);
  if (ga > 0.01) txt('ratio = 1 on this line · 此线上比值为 1', P([0.5, 0])[0] + 18, 870, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: ga });
  /* the lamps */
  const la = a * at(S, 0, 0.6);
  miLamp(P([0, 0]), 'lamp 0 · 灯 0', la);
  miLamp(P([1, 0]), 'lamp 1 · 灯 1', la * Q(S, 0, 'one lamp at one', 0.6));
  /* the point and its two distances (line 1 onward) */
  const da = a * at(S, 1, 0.6);
  if (da > 0.003) {
    const s = lpPoint(S), ps = P(s), l0 = P([0, 0]), l1 = P([1, 0]);
    const off = s[1] === 0 ? 1 : 0;   // on the axis the two segments overlap: lift them apart
    const d1 = mc.abs(mc.sub(s, [1, 0])), d0 = mc.abs(s), r = d1 / d0;
    line(ps[0], ps[1] - 14 * off, l1[0], l1[1] - 14 * off, C.white, da, 4);
    ctx.save(); ctx.setLineDash([10, 8]); line(ps[0], ps[1] + 14 * off, l0[0], l0[1] + 14 * off, C.white, da * 0.8, 3); ctx.restore();
    dot(ps[0], ps[1], 22, 'g', da);
    txt('s', ps[0] + 10, ps[1] - 30, { size: 30, fam: F.math, w: 700, c: C.now, a: da });
    /* readout */
    panel(1240, 200, 580, 600, da, C.cyan, 'THE RATIO · 比值');
    miRich([['r = ', C.white], ['to lamp 1', C.white], [' ÷ ', C.dim], ['to lamp 0', C.white, 0.7]], 1266, 270, { size: 26, a: da, fam: F.disp });
    txt('solid ─ lamp 1 · dashed ┄ lamp 0', 1266, 306, { size: 18, fam: F.mono, w: 700, c: C.dim, a: da });
    const rc = Math.abs(r - 1) < 5e-3 ? C.cyan : r < 1 ? C.cyan : C.mag;
    miRich([['s = ', C.white], [`${s[0] < 0 ? '−' : ''}${Math.abs(s[0]).toFixed(2)}${s[1] > 0.005 ? ' + ' + s[1].toFixed(2) + 'i' : ''}`, C.now]], 1266, 366, { size: 30, a: da });
    miRich([['r = ', C.white], [`${d1.toFixed(2)} ÷ ${d0.toFixed(2)} = `, C.white], [r.toFixed(3), rc]], 1266, 420, { size: 30, a: da });
    /* the ledger of the two hand computations */
    const h1 = a * Q(S, 2, 'At two', 0.5), h2 = a * Q(S, 2, 'At minus one', 0.5);
    miRich([['r(2) = 1 ÷ 2 = ', C.white], ['½', C.cyan]], 1266, 500, { size: 30, a: h1 });
    miRich([['r(−1) = 2 ÷ 1 = ', C.white], ['2', C.mag]], 1266, 554, { size: 30, a: h2 });
    const fa = a * Q(S, 3, 'swaps', 0.6);
    miRich([['mirror · 镜像  2 ↔ −1', C.white]], 1266, 624, { size: 26, a: a * at(S, 3, 0.6), fam: F.zh });
    miRich([['r(1 − s̄) = 1 / r(s)', C.white]], 1266, 676, { size: 30, a: fa });
    miRich([['½ × 2 = 1', C.white]], 1266, 728, { size: 26, a: fa });
    txt('lamps are a picture · 灯只是比方', 1266, 778, { size: 22, fam: F.zh, w: 700, c: C.argued, a: da * 0.9 });
  }
};

/* ======================================================================= */
/*                         scene 3 · THE RULER IS A THEOREM                  */
/* ======================================================================= */
const RU_P = miPlane(250, 540, 420, 300);
SCENES.ruler = S => {
  const u = S.u, a = miFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, 'Lean checks', 'lean']]);
  const P = RU_P;
  /* the strip with the mirror; line 3 shades the right half 1/2 < Re < 1 */
  const x0 = P([0, 0])[0], xh = P([0.5, 0])[0], x1 = P([1, 0])[0];
  line(x0, 220, x0, 860, C.dim, a * 0.8, 2); line(x1, 220, x1, 860, C.dim, a * 0.8, 2);
  txt('Re 0', x0, 896, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  txt('Re 1', x1, 896, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  txt('Re ½', xh, 896, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a });
  const ha = a * Q(S, 3, 'strictly between', 0.8);
  fillBox(xh + 8, 220, x1 - xh - 8, 640, C.cyan, ha * 0.10);
  if (ha > 0.003) {
    txt('if no zero', (xh + x1) / 2, 520, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: ha });
    txt('若此处无零点', (xh + x1) / 2, 556, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: ha });
    txt('⟹ RH', (xh + x1) / 2, 600, { size: 28, fam: F.math, w: 700, align: 'center', c: C.lean, a: ha });
  }
  miGlass(P, 220, 860, a);
  /* the ratio formula */
  panel(820, 190, 1000, 160, a, C.cyan, 'THE RATIO · 比值');
  miRich([['r(s) = ', C.white], ['|s − 1| / |s|', C.white], ['  =  ', C.dim], ['‖(s − 1)/s‖', C.cyan]], 850, 262, { size: 34, a: a * Q(S, 0, 'The ratio is', 0.6) });
  miRich([['skeleton · 骨架:  |s − 1|² − |s|² = 1 − 2 Re s', C.white]], 850, 318, { size: 24, a: a * Q(S, 0, 'size of s minus one', 0.6), fam: F.zh });
  /* line 1: the Cayley equivalence */
  const l1 = a * Q(S, 1, 'Lean checks', 0.6);
  if (l1 > 0.003) {
    panel(820, 370, 1000, 150, l1, C.lean, 'EVERY COMPLEX s · 每个复数 s');
    miRich([['‖(s − 1)/s‖ = 1   ⟺   Re s = ½', C.white]], 850, 440, { size: 32, a: l1 });
    miLean(850, 494, MI_LEAN.cayley_ratio_norm_one_iff_critical_line, l1);
  }
  const l2 = a * Q(S, 2, 'Lean also checks', 0.6);
  if (l2 > 0.003) {
    panel(820, 540, 1000, 170, l2, C.lean, 'EVERY NONTRIVIAL ZERO · 每个非平凡零点');
    miRich([['RH  ⟺  ∀ρ: ζ(ρ) = 0, ρ ≠ −2, −4, …, ρ ≠ 1  ⟹  ln‖(ρ − 1)/ρ‖ = 0', C.white]], 850, 606, { size: 23, a: l2 });
    txt('ratio one · 比值为 1', 850, 644, { size: 20, fam: F.zh, w: 700, c: C.dim, a: l2 });
    miLean(850, 688, MI_LEAN.cayley_critical_line_zeta_criterion, l2);
  }
  if (ha > 0.003) {
    panel(820, 730, 1000, 130, ha, C.lean, 'HALF THE STRIP IS ENOUGH · 半条带就够');
    miRich([['no ζ zero with ½ < Re ρ < 1   ⟹   RH', C.white]], 850, 794, { size: 28, a: ha });
    miLean(850, 840, MI_LEAN.golden_right_half_strip_implies_rh, ha);
  }
  stamp('r = 1 ⟺ Re s = ½', 470, 330, Q(S, 1, 'Lean checks', 0.5, 0.8) * (1 - at(S, 2, 0.5, 1.5)), C.lean, 30, -0.06);
};

/* ======================================================================= */
/*                             scene 4 · A PERFECT FORGERY                   */
/* ======================================================================= */
const FG_P = miPlane(140, 540, 640, 19);
SCENES.forgery = S => {
  const u = S.u, a = miFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [4, 'Lean checks', 'lean']]);
  const P = FG_P;
  /* the strip and the glass */
  const x0 = P([0, 0])[0], x1 = P([1, 0])[0];
  fillBox(x0, 200, x1 - x0, 680, C.vio, a * 0.05);
  line(x0, 200, x0, 880, C.dim, a * 0.6, 1.5); line(x1, 200, x1, 880, C.dim, a * 0.6, 1.5);
  miGlass(P, 200, 880, a);
  const oy = P([0, 0])[1];
  ctx.save(); ctx.setLineDash([4, 8]); line(x0 - 40, oy, x1 + 40, oy, C.dim, a * 0.6, 1.5); ctx.restore();
  for (const g of [14, -14]) { const q = P([0, g]); txt(`${g > 0 ? '' : '−'}14i`, x1 + 50, q[1] + 8, { size: 24, fam: F.math, w: 700, c: C.dim, a }); }
  txt('Re ¼', P([0.25, 0])[0], 576, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a });
  txt('Re ½', P([0.5, 0])[0] + 44, 612, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a });
  txt('Re ¾', P([0.75, 0])[0], 576, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a });
  /* the four zeros: inside the unit circle of the ratio (Re ¾) cyan, outside (Re ¼) magenta */
  const za = a * Q(S, 0, 'four zeros', 0.8);
  MI_ZEROS.forEach((z, i) => {
    const q = P(z), ka = za * clamp((u - phraseAt(S, 0, 'four zeros') - 0.25 * i) / 0.4);
    dot(q[0], q[1], 22, z[0] > 0.5 ? 'c' : 'm', ka);
    if (ka > 0.01) txt(`${z[0] > 0.5 ? '¾' : '¼'} ${z[1] > 0 ? '+' : '−'} 14i`, q[0] + (z[0] > 0.5 ? 28 : -28), q[1] + (z[1] > 0 ? -22 : 40), { size: 22, fam: F.math, w: 700, align: z[0] > 0.5 ? 'left' : 'right', c: C.white, a: ka });
  });
  /* line 1: the two symmetries as arrows between zeros */
  const ta = a * Q(S, 1, 'half-turn', 0.7), fa = a * Q(S, 1, 'up–down flip', 0.7), sa = a * Q(S, 1, 'Together', 0.7);
  if (ta > 0.003) { const p = P(MI_ZEROS[0]), q = P(MI_ZEROS[3]); ctx.save(); ctx.setLineDash([12, 8]); arrow(p[0] - 14, p[1] + 22, q[0] + 14, q[1] - 22, C.white, ta * 0.7, 2); ctx.restore(); txt('s ↦ 1 − s · 半圈转动', P([0.5, 0])[0] + 30, oy + 150, { size: 22, fam: F.zh, w: 700, c: C.white, a: ta }); }
  if (sa > 0.003) { const p = P(MI_ZEROS[0]), q = P(MI_ZEROS[1]); arrow(p[0] - 26, p[1] + 84, q[0] + 26, q[1] + 84, C.white, sa, 2.5); arrow(q[0] + 26, q[1] + 102, p[0] - 26, p[1] + 102, C.white, sa * 0.6, 2); txt('1 − s̄ · mirror · 镜像', P([0.5, 0])[0] - 16, p[1] + 140, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.white, a: sa }); }
  if (fa > 0.003) { const p = P(MI_ZEROS[0]), q = P(MI_ZEROS[2]); ctx.save(); ctx.setLineDash([8, 8]); arrow(p[0] + 190, p[1] + 30, q[0] + 190, q[1] - 30, C.white, fa * 0.8, 2); ctx.restore(); txt('s ↦ s̄ · 翻转', p[0] + 204, oy - 14, { size: 22, fam: F.zh, w: 700, c: C.white, a: fa }); }
  /* the readout */
  panel(1000, 180, 820, 290, a, C.cyan, 'THE FORGERY · 赝品');
  miRich([['F(s) = ((z − ¼)² + 14²)((z + ¼)² + 14²)', C.white]], 1024, 246, { size: 28, a: a * at(S, 0, 0.6) });
  txt('z = s − ½', 1024, 284, { size: 22, fam: F.math, w: 700, c: C.dim, a: a * at(S, 0, 0.6) });
  miRich([['F(1 − s) = F(s)   F(s̄) = conj F(s)', C.white]], 1024, 336, { size: 26, a: a * Q(S, 1, 'half-turn', 0.6) });
  miRich([['⟹  F(1 − s̄) = conj F(s)', C.white]], 1024, 372, { size: 22, a: a * Q(S, 1, 'Together', 0.6) });
  const ra = a * Q(S, 2, 'Their ratios', 0.6);
  miRich([['ratio · 比值  ', C.white], [MI_RIN.toFixed(6), C.cyan], ['  ·  ', C.dim], [MI_ROUT.toFixed(6), C.mag]], 1024, 410, { size: 28, a: ra, fam: F.zh });
  /* the ratio label next to each zero */
  if (ra > 0.003) MI_ZEROS.forEach(z => { if (z[1] < 0) return; const q = P(z); txt(miRatio(z).toFixed(6), q[0] + (z[0] > 0.5 ? 28 : -28), q[1] + 50, { size: 20, fam: F.mono, w: 700, align: z[0] > 0.5 ? 'left' : 'right', c: z[0] > 0.5 ? C.cyan : C.mag, a: ra }); });
  miRich([['product · 乘积  = 1', C.white]], 1024, 452, { size: 24, a: a * Q(S, 2, 'a mirror pair', 0.5), fam: F.zh });
  const la = a * at(S, 3, 0.6) * (1 - 0.65 * Q(S, 4, 'Lean checks', 0.6));
  if (la > 0.003) {
    panel(1000, 490, 820, 150, la, C.cyan, 'ALONG THE LINE · 沿临界线');
    miRich([['F(½ + it) = (196.0625 − t²)² + t²/4  ≥  ', C.white], ['49', C.cyan]], 1024, 560, { size: 27, a: la });
    txt('real · only for δ = ¼, γ = 14 · computed · 仅此组参数，屏幕计算', 1024, 610, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: la });
  }
  const le = a * Q(S, 4, 'Lean checks', 0.6);
  if (le > 0.003) {
    panel(1000, 660, 820, 200, le, C.lean, 'ANY δ ≠ 0, γ ≠ 0 · 任意非零偏移与高度');
    txt('entire · both symmetries · exactly 4 zeros', 1024, 722, { size: 24, fam: F.mono, w: 700, c: C.white, a: le });
    txt('none with Re s = ½ · 没有一个在线上', 1024, 762, { size: 24, fam: F.zh, w: 700, c: C.white, a: le });
    miLean(1024, 822, MI_LEAN.full_symmetry_not_fixed_line_localization, le, { size: 20 });
  }
  stamp('NONE ON THE LINE', 470, 482, Q(S, 2, 'none of its zeros', 0.5, 0.6) * (1 - at(S, 3, 0.4, -0.4)), C.mag, 34, -0.06);
};

/* ======================================================================= */
/*                            scene 5 · WHY WE BELIEVED IT                   */
/* ======================================================================= */
const ID_P = miPlane(360, 560, 260, 260);
SCENES.idol = S => {
  const u = S.u, a = miFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const P = ID_P;
  miGlass(P, 220, 880, a);
  /* two twins, both off the glass */
  const t = S.u * 0.5, s = [1.05 + 0.15 * Math.sin(t), 0.6 * Math.sin(0.7 * t) + 0.1];
  const m = miMirror(s), ps = P(s), pm = P(m);
  ctx.save(); ctx.setLineDash([6, 8]); line(ps[0], ps[1], pm[0], pm[1], C.white, a * 0.35, 1.5); ctx.restore();
  dot(ps[0], ps[1], 22, 'g', a);
  dot(pm[0], pm[1], 18, 'w', a * 0.8);
  txt('you · 你', ps[0] + 26, ps[1] - 16, { size: 24, fam: F.zh, w: 700, c: C.now, a });
  txt('twin · 镜像', pm[0] - 26, pm[1] - 16, { size: 24, fam: F.zh, w: 700, align: 'right', c: C.white, a: a * 0.85 });
  /* the idol, crossed out */
  const ia = a * at(S, 0, 0.6);
  txt('symmetry  ⟹  location ?', 1300, 290, { size: 40, fam: F.disp, w: 700, align: 'center', c: C.white, a: ia });
  txt('对称 ⟹ 定位？', 1300, 346, { size: 36, fam: F.zh, w: 700, align: 'center', c: C.white, a: ia });
  const xa = a * Q(S, 0, 'It is not', 0.4);
  if (xa > 0.003) { line(1050, 284, 1555, 262, C.white, xa, 3); line(1160, 340, 1420, 322, C.white, xa, 3); txt('symmetry  ⇏  location', 1300, 420, { size: 34, fam: F.disp, w: 700, align: 'center', c: C.cyan, a: xa }); }
  /* the aphorism */
  const qa = a * at(S, 1, 0.8);
  if (qa > 0.003) {
    panel(900, 470, 860, 200, qa, C.argued);
    txt('A mirror tells you where your twin stands,', 1330, 540, { size: 30, fam: F.disp, w: 700, align: 'center', c: C.white, a: qa });
    txt('never where you stand.', 1330, 580, { size: 30, fam: F.disp, w: 700, align: 'center', c: C.now, a: qa });
    txt('镜子只告诉你镜中人站在哪，从不告诉你自己站在哪。', 1330, 636, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: qa });
  }
  const ba = a * Q(S, 2, 'beyond these two symmetries', 0.6);
  if (ba > 0.003) {
    chip(1080, 750, 300, 56, 's ↦ 1 − s', C.white, ba, 26, F.math);
    chip(1420, 750, 300, 56, 's ↦ s̄', C.white, ba, 26, F.math);
    txt('+ something beyond · 还需对称之外的东西', 1250, 826, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: ba });
  }
};

/* ======================================================================= */
/*                          scene 6 · WHAT IT DOES NOT SAY                   */
/* ======================================================================= */
SCENES.edge = S => {
  const u = S.u, a = miFade(S);
  if (a <= 0) return;
  /* line 0 has no badge colour: the Riemann hypothesis is an external formal fact, not frozen here */
  const b1 = clamp((u - lineAt(S, 1).s) / 0.5) * (1 - clamp((u - lineAt(S, 2).s) / 0.3)) * clamp((S.d - u) / 0.5);
  badge(b1, 'argued');
  badge(clamp((u - lineAt(S, 2).s) / 0.5) * clamp((S.d - u) / 0.5), 'open');
  const rows = [
    { k: 0, col: C.white, frame: C.dim, en: 'Riemann hypothesis: external Lean proof (2026)', zh: '黎曼猜想：外部 Lean 证明，经多方独立重放', note: "not frozen in this book's repository · 未冻结于本书所钉仓库" },
    { k: 1, col: C.argued, frame: C.argued, en: 'lamps and mirror: pictures, not proofs', zh: '灯与镜子：比方，不是证明', note: 'interpretation · 诠释' },
    { k: 2, col: C.open, frame: C.open, en: 'arithmetic area law of the pivots', zh: '算术枢轴面积律', note: 'open problem · 开放问题  (prob-ch34-arithmetic-pivot-area-law)' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 190 + i * 230;
    panel(260, y, 1400, 190, ra, rw.frame);
    txt(rw.en, 300, y + 62, { size: 32, fam: F.disp, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 300, y + 112, { size: 30, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 300, y + 160, { size: 20, fam: F.zh, w: 700, c: rw.k === 0 ? C.dim : rw.col, a: ra * 0.95 });
  });
};

/* ======================================================================= */
/*                                scene 7 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 300 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[0], t = sc.end - 1.0;
  background(t, sc, 0, 6);
  const P = miPlane(300, 560, 300, 300);
  miGlass(P, 180, 900, 1);
  const s = [1.15, 0.35], m = miMirror(s), ps = P(s), pm = P(m);
  ctx.save(); ctx.setLineDash([6, 8]); line(ps[0], ps[1], pm[0], pm[1], C.white, 0.4, 1.5); ctx.restore();
  dot(ps[0], ps[1], 26, 'g', 1); dot(pm[0], pm[1], 22, 'w', 0.85);
  miLamp(P([0, 0]), '', 0.9); miLamp(P([1, 0]), '', 0.9);
  txt(DATA.film.title_zh, 1300, 420, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('A MIRROR IS NOT', 1300, 520, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('A LOCATION', 1300, 582, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 5 });
  miRich([['‖(s − 1)/s‖ = 1  ⟺  Re s = ½', C.white]], 1300, 680, { size: 40, align: 'center' });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1300, 760, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
