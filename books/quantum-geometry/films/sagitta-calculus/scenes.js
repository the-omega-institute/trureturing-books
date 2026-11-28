/* Film · Turns, not differences: the sagitta adds up · 以旋代差：攒起来的矢高
   (book quantum-geometry, part VIII: chapter 30, §30.3). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     bow      a point on a unit circle turned by θ: the move splits into a sideways part sin θ (cyan) and a drop
              1 − cos θ (magenta); the bow picture: the string is the chord, the arrow from string to bow is the
              sagitta 1 − cos θ (θ drawn exaggerated; the decomposition is a hand derivation, §30.3.1).
     step     θ = 0.1: sin θ = 0.0998334, 1 − cos θ = 0.0049958 ≈ θ²/2, (1 − v)² + c² = 1 (computed).
     ledger   N = 100 equal steps: α = 1 (θ = 0.01) gives Σ = 0.0049999…, α = 1/2 (θ = 0.1) gives
              Σ = 0.4995835 (computed; σ = T = 1).
     squeeze  N(θ²/2 − θ⁴/24) ≤ Σ_N ≤ Nθ²/2 for all real σ, T, α and every N
              ..... AccumulatedSagittaPhases.accumulated_sagitta_bounds (LEAN); for the hundred steps
              0.4995833 ≤ 0.4995835 ≤ 0.5 (computed).
     fates    T > 0, N → ∞: α > 1/2 → 0; α = 1/2 → σ²T/2; σ ≠ 0, 0 < α < 1/2 → +∞
              ..... AccumulatedSagittaPhases.accumulated_sagitta_phases (LEAN); the curves are computed for σ = T = 1.
     edge     α ≤ 0 is not covered (α = 0, σ = 2π gives Σ ≡ 0, hand derivation); equal deterministic steps only; the
              Itô reading is a literature result and the arc-body calculus is the chapter's MODEL (argued).

   On load, FILM.init checks DATA.lean against the two theorems and re-derives every number on screen, and checks
   the two-sided bound and the three limits numerically on a grid of σ, T, α, N. Any disagreement is pushed to
   window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const SG_LEAN = {
  accumulated_sagitta_bounds: 'D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_bounds',
  accumulated_sagitta_phases: 'D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_phases'
};
/* the Lean definitions: stepAngle σ T α N = σ (T/N)^α, accumulatedSagitta = N (1 − cos stepAngle) */
const sgStep = (s, T, al, N) => s * Math.pow(T / N, al);
const sgVers = x => 2 * Math.pow(Math.sin(x / 2), 2);           // 1 − cos x without cancellation
const sgSum = (s, T, al, N) => N * sgVers(sgStep(s, T, al, N));
const sgLo = (s, T, al, N) => { const t = sgStep(s, T, al, N); return N * (t * t / 2 - Math.pow(t, 4) / 24); };
const sgHi = (s, T, al, N) => { const t = sgStep(s, T, al, N); return N * t * t / 2; };
const SG_TH = 0.1;
const SG_C = Math.sin(SG_TH), SG_V = sgVers(SG_TH);
const SG_SMOOTH = sgSum(1, 1, 1, 100), SG_ROUGH = sgSum(1, 1, 0.5, 100);
const SG_ALPHAS = [[1, '1'], [0.75, '3/4'], [0.5, '1/2'], [1 / 3, '1/3']];
const sgF = (v, n) => v.toFixed(n);

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('sagitta-calculus film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(SG_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(SG_LEAN).length}`);
  for (const [short, gid] of Object.entries(SG_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. STEP: θ = 0.1 */
  check(sgF(SG_C, 7) === '0.0998334' && sgF(SG_V, 7) === '0.0049958', 'sin 0.1, 1 − cos 0.1');
  check(near(SG_V, 1 - Math.cos(SG_TH), 1e-15), 'half-angle versine');
  check(near(Math.pow(1 - SG_V, 2) + SG_C * SG_C, 1, 1e-15), '(1 − v)² + c² = 1');
  check(sgF(Math.pow(1 - SG_V, 2), 7) === '0.9900333' && sgF(SG_C * SG_C, 7) === '0.0099667', 'the two squares');
  check(Math.abs(SG_V - SG_TH * SG_TH / 2) < 5e-6, 'v ≈ θ²/2');

  /* 2. LEDGER and the hundred-step bound (σ = T = 1) */
  check(near(sgStep(1, 1, 1, 100), 0.01) && near(sgStep(1, 1, 0.5, 100), 0.1), 'step angles 0.01 and 0.1');
  check(sgF(SG_SMOOTH, 8) === '0.00499996', 'smooth total');
  check(sgF(SG_ROUGH, 7) === '0.4995835', 'rough total');
  check(sgF(sgLo(1, 1, 0.5, 100), 7) === '0.4995833' && near(sgHi(1, 1, 0.5, 100), 0.5, 1e-12), 'the hundred-step bound');
  /* the table of §30.3.4 (σ = T = 1) */
  const table = { 1: ['0.04995835', '0.00499996', '0.00005000', '0.00000050'], 0.75: ['0.15769766', '0.04999583', '0.00500000', '0.00050000'],
    0.5: ['0.49584720', '0.49958347', '0.49999583', '0.49999996'], [1 / 3]: ['1.05801575', '2.31183148', '10.77023959', '49.99958333'] };
  SG_ALPHAS.forEach(([al]) => [10, 100, 1e4, 1e6].forEach((N, i) => check(sgF(sgSum(1, 1, al, N), 8) === table[al][i], `table α = ${al}, N = ${N}`)));

  /* 3. the two-sided bound for real σ, T, α (any sign) and natural N, and the pointwise versine bound */
  for (let k = 0; k < 400; k++) {
    const s = 8 * rnd(k, 1) - 4, T = 6 * rnd(k, 2) - 1, al = 3 * rnd(k, 3) - 1, N = 1 + Math.floor(300 * rnd(k, 4));
    if (T <= 0) continue;                                             // JS has no Mathlib convention for negative bases
    const v = sgSum(s, T, al, N), lo = sgLo(s, T, al, N), hi = sgHi(s, T, al, N), tol = 1e-9 * (1 + Math.abs(hi));
    check(lo <= v + tol && v <= hi + tol, `two-sided bound ${k}`);
  }
  for (let x = -6; x <= 6; x += 0.01) check(x * x / 2 - Math.pow(x, 4) / 24 <= sgVers(x) + 1e-12 && sgVers(x) <= x * x / 2 + 1e-12, `versine bound at ${x}`);

  /* 4. FATES: the three limits, read off large N */
  check(sgSum(1, 1, 0.75, 1e12) < 1e-3 && sgSum(2, 3, 1, 1e12) < 1e-9, 'α > 1/2 → 0');
  check(Math.abs(sgSum(2, 3, 0.5, 1e9) - 2 * 2 * 3 / 2) < 1e-6 && Math.abs(sgSum(1, 1, 0.5, 1e9) - 0.5) < 1e-9, 'α = 1/2 → σ²T/2');
  check(sgSum(0.5, 2, 0.25, 1e12) > 1e3, 'α < 1/2 → ∞');
  /* 5. EDGE: α = 0, σ = 2π: every step is a full turn */
  for (const N of [1, 5, 100, 1e6]) check(Math.abs(sgSum(TAU, 1, 0, N)) < 1e-9 * N, `full turns N = ${N}`);
});
Object.assign(FILM.speed, { bow: 0.02, step: 0.014, ledger: 0.016, squeeze: 0.014, fates: 0.016, edge: 0.014, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const sgFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function sgRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
const SG_MISSING = new Set();
function sgLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!SG_MISSING.has(gid)) { SG_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
function sgArc(cx, cy, r, a0, a1, col, a, lw = 3, dash = null) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); ctx.arc(cx, cy, r, a0, a1, a1 < a0); ctx.stroke(); ctx.restore();
}
function sgTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 88, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('TURNS, NOT DIFFERENCES', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('THE SAGITTA ADDS UP · STEP · LEDGER · BOUND · THREE FATES', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 5 });
}

/* ======================================================================= */
/*                          scene 1 · A STEP ON A CIRCLE                     */
/* ======================================================================= */
const BW_O = [600, 1010], BW_R = 620, BW_TH = 0.55;
/* screen point of the circle at angle t from the top, clockwise */
const bwPt = t => [BW_O[0] + BW_R * Math.sin(t), BW_O[1] - BW_R * Math.cos(t)];
SCENES.bow = S => {
  const u = S.u;
  sgTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const P = bwPt(0);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 150, W, 740); ctx.clip();
  sgArc(BW_O[0], BW_O[1], BW_R, -Math.PI / 2 - 1.0, -Math.PI / 2 + 1.0, C.white, a * 0.55, 2.5);
  /* line 0: the straight step leaves the circle */
  const sa = a * at(S, 0, 0.8, 1.2) * (1 - at(S, 1, 0.6));
  if (sa > 0.003) {
    const L = BW_R * BW_TH;
    dashed(P[0], P[1], P[0] + L, P[1], C.white, sa, 3);
    arrow(P[0] + L - 4, P[1], P[0] + L, P[1], C.white, sa, 3);
    txt('straight step · 直线步', P[0] + L + 16, P[1] + 8, { size: 26, fam: F.zh, w: 700, c: C.white, a: sa });
    const E = bwPt(BW_TH);
    ctx.save(); ctx.setLineDash([4, 6]); line(P[0] + L, P[1], E[0], E[1], C.mag, sa * 0.7, 2); ctx.restore();
    txt('off the circle · 离开了圆', P[0] + L + 16, (P[1] + E[1]) / 2 + 14, { size: 22, fam: F.zh, w: 700, c: C.mag, a: sa * 0.9 });
  }
  /* lines 1–2: the turn and its two parts */
  const ta = a * at(S, 1, 0.5);
  const th = BW_TH * ease(Q(S, 1, 'small angle', 1.6));
  const Qp = bwPt(th), bowA = a * Q(S, 3, 'Think of a bow', 0.8);
  if (ta > 0.003) {
    ctx.save(); ctx.globalAlpha = ta * 0.25; ctx.fillStyle = C.argued; ctx.beginPath(); ctx.moveTo(BW_O[0], BW_O[1]); ctx.arc(BW_O[0], BW_O[1], 110, -Math.PI / 2, -Math.PI / 2 + th); ctx.closePath(); ctx.fill(); ctx.restore();
    line(BW_O[0], BW_O[1], P[0], P[1], C.dim, ta * 0.5, 1.5);
    line(BW_O[0], BW_O[1], Qp[0], Qp[1], C.dim, ta * 0.5, 1.5);
    sgArc(BW_O[0], BW_O[1], BW_R, -Math.PI / 2, -Math.PI / 2 + th, C.now, ta, 7);
    if (th > 0.05) txt('θ', BW_O[0] + 34, BW_O[1] - 140, { size: 30, fam: F.math, w: 700, c: C.argued, a: ta });
    const pa = a * Q(S, 2, 'Sideways', 0.6), da = a * Q(S, 2, 'Downward', 0.6);
    line(P[0], P[1], Qp[0], P[1], C.cyan, pa * (1 - bowA), 6);
    if (pa > 0.01) txt('sin θ', (P[0] + Qp[0]) / 2, P[1] - 18, { size: 30, fam: F.math, w: 700, align: 'center', c: C.cyan, a: pa * (1 - bowA) });
    line(Qp[0], P[1], Qp[0], Qp[1], C.mag, da, 6);
    if (da > 0.01) txt('1 − cos θ', Qp[0] + 18, (P[1] + Qp[1]) / 2 + 10, { size: 30, fam: F.math, w: 700, c: C.mag, a: da });
    dot(P[0], P[1], 13, 'w', ta);
    dot(Qp[0], Qp[1], 15, 'o', ta);
  }
  /* line 3: the bow, its string and its arrow */
  if (bowA > 0.003) {
    const Qm = bwPt(-th);
    sgArc(BW_O[0], BW_O[1], BW_R, -Math.PI / 2 - th, -Math.PI / 2 + th, C.white, bowA, 5);
    line(Qm[0], Qm[1], Qp[0], Qp[1], C.cyan, bowA, 3);
    arrow(BW_O[0], Qp[1], P[0], P[1] + 4, C.mag, bowA, 5);
    txt('string · 弓弦 = chord = 2 sin θ', Qm[0] - 10, Qm[1] + 40, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: bowA });
    line(BW_O[0] - 6, (P[1] + Qp[1]) / 2, BW_O[0] - 70, P[1] - 50, C.mag, bowA * 0.6, 1.5);
    txt('arrow · 箭 = sagitta 矢高', BW_O[0] - 76, P[1] - 60, { size: 26, fam: F.zh, w: 700, align: 'right', c: C.mag, a: bowA });
  }
  ctx.restore();
  if (ta > 0.003) txt('θ drawn large · 角度放大示意', 130, 870, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ta });
  /* the readout */
  const ra = a * Q(S, 2, 'Sideways', 0.6);
  if (ra > 0.003) {
    panel(1240, 250, 580, 380, ra, C.cyan, 'ONE TURN · 转一下');
    sgRich([['sideways · 横向  ', C.white], ['sin θ', C.cyan]], 1270, 330, { size: 28, a: ra, fam: F.zh });
    sgRich([['drop · 下落  ', C.white], ['1 − cos θ', C.mag]], 1270, 390, { size: 28, a: ra * Q(S, 2, 'Downward', 0.6), fam: F.zh });
    sgRich([['(1 − ', C.white], ['drop', C.mag], [')² + ', C.white], ['sideways', C.cyan], ['² = 1', C.white]], 1270, 470, { size: 26, a: ra * Q(S, 2, 'Downward', 0.6, 0.8) });
    txt('still on the circle · 仍在圆上', 1270, 520, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ra * Q(S, 2, 'Downward', 0.6, 0.8) });
    txt('the bow is a picture · 弓是比方', 1270, 590, { size: 19, fam: F.zh, w: 700, c: C.argued, a: bowA });
  }
};

/* ======================================================================= */
/*                            scene 2 · ONE STEP BY HAND                     */
/* ======================================================================= */
SCENES.step = S => {
  const a = sgFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* two bars on one scale: the sideways part and the drop */
  const x0 = 160, k = 6000, ya = 330, yb = 520;
  txt('θ = 0.1', x0, 240, { size: 40, fam: F.math, w: 700, c: C.now, a });
  const ca = a * Q(S, 0, 'Sideways', 0.6), va = a * Q(S, 1, 'The drop', 0.6);
  txt('sideways · 横向  sin θ', x0, ya - 18, { size: 26, fam: F.zh, w: 700, c: C.cyan, a: ca });
  fillBox(x0, ya, k * SG_C * ease(Q(S, 0, 'Sideways', 1.0)), 64, C.cyan, ca * 0.7);
  txt(sgF(SG_C, 7), x0 + k * SG_C + 20, ya + 44, { size: 34, fam: F.mono, w: 700, c: C.cyan, a: ca });
  const thrown = Q(S, 3, 'throws the drop away', 0.6);
  txt('drop · 下落  1 − cos θ', x0, yb - 18, { size: 26, fam: F.zh, w: 700, c: C.mag, a: va });
  fillBox(x0, yb, k * SG_V * ease(Q(S, 1, 'The drop', 1.0)), 64, C.mag, va * 0.8 * (1 - 0.6 * thrown));
  txt(sgF(SG_V, 7), x0 + k * SG_V + 20, yb + 44, { size: 34, fam: F.mono, w: 700, c: C.mag, a: va });
  txt('≈ θ²/2 = 0.005', x0 + k * SG_V + 220, yb + 44, { size: 30, fam: F.math, w: 700, c: C.white, a: va * Q(S, 1, 'half of theta', 0.6) });
  if (thrown > 0.003) {
    line(x0 - 20, yb - 4, x0 + k * SG_V + 20, yb + 68, C.white, a * thrown, 4);
    txt('thrown away? · 扔掉？', x0, yb + 120, { size: 30, fam: F.zh, w: 700, c: C.white, a: a * thrown });
    txt('second order · 二阶小量', x0, yb + 164, { size: 24, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 3, 'second order', 0.6) });
  }
  /* line 2: back on the circle */
  const ia = a * Q(S, 2, 'Together', 0.6);
  if (ia > 0.003) {
    panel(1100, 230, 720, 330, ia, C.cyan, 'BACK ON THE CIRCLE · 落回圆上');
    sgRich([['(1 − ', C.white], [sgF(SG_V, 7), C.mag], [')²', C.white]], 1130, 310, { size: 30, a: ia });
    sgRich([['≈ ', C.white], [sgF(Math.pow(1 - SG_V, 2), 7), C.white]], 1430, 360, { size: 30, a: ia });
    sgRich([['+ ', C.white], [sgF(SG_C, 7), C.cyan], ['²', C.white]], 1130, 420, { size: 30, a: ia * Q(S, 2, 'land exactly', 0.5) });
    sgRich([['≈ ', C.white], [sgF(SG_C * SG_C, 7), C.white]], 1430, 470, { size: 30, a: ia * Q(S, 2, 'land exactly', 0.5) });
    line(1130, 492, 1780, 492, C.white, ia * Q(S, 2, 'No rounding', 0.5) * 0.6, 1.5);
    sgRich([['exactly · 精确地  cos²θ + sin²θ = 1', C.white]], 1130, 536, { size: 28, a: ia * Q(S, 2, 'No rounding', 0.5), fam: F.zh });
  }
  stamp('NO LIMIT', 1460, 690, Q(S, 2, 'No rounding', 0.5, 0.4) * (1 - at(S, 3, 0.5, 1.5)), C.cyan, 34, -0.06);
};

/* ======================================================================= */
/*                            scene 3 · ADD UP THE DROPS                     */
/* ======================================================================= */
/* a jar of height h holding total value v on the scale k px per unit, filled coin by coin */
function lgJar(x, y, w, h, n, per, kpx, col, a, label, zh) {
  if (a <= 0.003) return;
  box(x, y, w, h, C.white, a * 0.7, 2);
  const fill = Math.min(h - 4, n * per * kpx);
  fillBox(x + 4, y + h - 2 - fill, w - 8, fill, col, a * 0.45);
  /* the current coin, falling */
  if (n > 0 && n < 100) { const cy = y + h - 2 - fill - 22 + 14 * (n % 1); dot(x + w / 2, cy, 8, 'o', a); }
  txt(label, x + w / 2, y + h + 44, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a });
  txt(zh, x + w / 2, y + h + 80, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
}
SCENES.ledger = S => {
  const a = sgFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [0, 'like loose change', 'argued'], [1, 'A smooth path', 'computed'], [3, null, 'argued']]);
  const kpx = 1000;                                                // 0.5 ↦ 500 px
  const ns = 100 * clamp(Q(S, 1, 'A smooth path', 3.0)), nr = 100 * clamp(Q(S, 2, 'Here each', 3.0));
  const ja = a * at(S, 0, 0.6);
  /* the scale */
  for (const [v, s] of [[0, '0'], [0.1, '0.1'], [0.2, '0.2'], [0.3, '0.3'], [0.4, '0.4'], [0.5, '0.5']]) {
    const y = 770 - v * kpx;
    line(200, y, 1000, y, C.dim, ja * (v === 0.5 ? 0.55 : 0.2), 1);
    txt(s, 186, y + 8, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: ja });
  }
  lgJar(320, 250, 220, 520, ns, sgVers(0.01), kpx, C.mag, ja * clamp(at(S, 1, 0.5) + 0.35), 'smooth · θ = 0.01', '光滑的路 · 每步 0.01');
  lgJar(680, 250, 220, 520, nr, SG_V, kpx, C.mag, ja * clamp(at(S, 2, 0.5) + 0.35), 'rough · θ = 0.1', '粗糙的路 · 每步 0.1');
  if (ns > 0) txt(sgF(Math.round(ns) * sgVers(0.01), 4), 430, 770 - ns * sgVers(0.01) * kpx - 48, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ja });
  if (nr > 0) txt(sgF(Math.round(nr) * SG_V, 4), 790, Math.max(296, 770 - nr * SG_V * kpx + 40), { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: ja });
  txt('jar of drops: a picture · 罐子是比方', 600, 210, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ja });
  /* the ledger */
  panel(1110, 230, 710, 440, ja, C.cyan, 'THE LEDGER · 账本   N = 100');
  const r1 = a * at(S, 1, 0.5);
  sgRich([['smooth  ', C.white], ['α = 1', C.dim]], 1140, 300, { size: 26, a: r1 });
  sgRich([[`steps ${Math.round(ns)}`, C.now]], 1560, 300, { size: 26, a: r1 });
  sgRich([[`${Math.round(ns)} × `, C.white], [sgF(sgVers(0.01), 8), C.mag], [' = ', C.white], [sgF(Math.round(ns) * sgVers(0.01), 5), C.mag]], 1140, 350, { size: 28, a: r1 });
  const r2 = a * at(S, 2, 0.5);
  sgRich([['rough  ', C.white], ['α = 1/2,  θ = 1/√N', C.dim]], 1140, 440, { size: 26, a: r2 });
  sgRich([[`steps ${Math.round(nr)}`, C.now]], 1560, 440, { size: 26, a: r2 });
  sgRich([[`${Math.round(nr)} × `, C.white], [sgF(SG_V, 7), C.mag], [' = ', C.white], [sgF(Math.round(nr) * SG_V, 4), C.mag]], 1140, 490, { size: 28, a: r2 });
  txt('equal steps · σ = T = 1 · 等步长', 1140, 560, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ja });
  txt('total turn N·θ: 1 and 10 · 总转角 1 与 10', 1140, 600, { size: 20, fam: F.zh, w: 700, c: C.dim, a: r2 });
  /* line 3: the aphorism */
  const qa = a * at(S, 3, 0.6);
  if (qa > 0.003) {
    panel(1110, 690, 710, 150, qa, C.argued);
    txt('Negligible, because never added up.', 1140, 750, { size: 28, fam: F.disp, w: 700, c: C.white, a: qa });
    txt('说它可以忽略，只因从没加起来。', 1140, 800, { size: 28, fam: F.zh, w: 700, c: C.argued, a: qa });
  }
};

/* ======================================================================= */
/*                           scene 4 · A TWO-SIDED BOUND                     */
/* ======================================================================= */
const SQ_G = { x0: 150, y0: 800, w: 820, h: 580, xm: 2.6, ym: 2.2 };
const sqP = (x, y) => [SQ_G.x0 + SQ_G.w * x / SQ_G.xm, SQ_G.y0 - SQ_G.h * y / SQ_G.ym];
SCENES.squeeze = S => {
  const a = sgFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [0, 'Lean checks', 'lean'], [3, null, 'computed']]);
  /* axes */
  const o = sqP(0, 0);
  arrow(o[0], o[1], o[0] + SQ_G.w + 30, o[1], C.dim, a, 2);
  arrow(o[0], o[1], o[0], o[1] - SQ_G.h - 30, C.dim, a, 2);
  txt('θ', o[0] + SQ_G.w + 40, o[1] + 10, { size: 30, fam: F.math, w: 700, c: C.white, a });
  for (const x of [1, 2]) { const p = sqP(x, 0); line(p[0], p[1], p[0], p[1] + 10, C.dim, a, 2); txt(String(x), p[0], p[1] + 38, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a }); }
  for (const y of [1, 2]) { const p = sqP(0, y); line(p[0] - 10, p[1], p[0], p[1], C.dim, a, 2); txt(String(y), p[0] - 18, p[1] + 8, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.dim, a }); }
  ctx.save(); ctx.beginPath(); ctx.rect(SQ_G.x0, SQ_G.y0 - SQ_G.h - 10, SQ_G.w + 20, SQ_G.h + 12); ctx.clip();
  /* the band between the two bounds (line 1) */
  const ba = a * Q(S, 1, 'two curves', 0.8);
  if (ba > 0.003) {
    const hi = x => x * x / 2, lo = x => x * x / 2 - Math.pow(x, 4) / 24, n = 160;
    ctx.save(); ctx.globalAlpha = ba * 0.16; ctx.fillStyle = C.lean; ctx.beginPath();
    for (let i = 0; i <= n; i++) { const x = SQ_G.xm * i / n, p = sqP(x, hi(x)); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); }
    for (let i = n; i >= 0; i--) { const x = SQ_G.xm * i / n, p = sqP(x, lo(x)); ctx.lineTo(p[0], p[1]); }
    ctx.closePath(); ctx.fill(); ctx.restore();
    curve(s => sqP(SQ_G.xm * s, hi(SQ_G.xm * s)), n, C.lean, ba, 2.5);
    curve(s => sqP(SQ_G.xm * s, lo(SQ_G.xm * s)), n, C.lean, ba * Q(S, 1, 'the same minus', 0.6), 2.5);
  }
  /* the drop 1 − cos θ */
  curve(s => sqP(SQ_G.xm * s, sgVers(SQ_G.xm * s)), 160, C.mag, a * at(S, 0, 0.8), 5);
  ctx.restore();
  if (ba > 0.003) {
    const p1 = sqP(1.95, 1.95 * 1.95 / 2), p2 = sqP(2.2, 2.2 * 2.2 / 2 - Math.pow(2.2, 4) / 24);
    txt('θ²/2', p1[0] - 20, p1[1] - 6, { size: 28, fam: F.math, w: 700, align: 'right', c: C.lean, a: ba });
    txt('θ²/2 − θ⁴/24', p2[0] + 20, p2[1] + 70, { size: 26, fam: F.math, w: 700, align: 'center', c: C.lean, a: ba * Q(S, 1, 'the same minus', 0.6) });
  }
  const pv = sqP(1.5, sgVers(1.5));
  txt('1 − cos θ', pv[0] + 40, pv[1] + 70, { size: 28, fam: F.math, w: 700, c: C.mag, a: a * at(S, 0, 0.8) });
  /* the statement */
  const la = a * Q(S, 0, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1080, 210, 740, 360, la, C.lean, 'ANY REAL σ, T, α · EVERY N · 任意实数');
    sgRich([['θ_N = σ (T/N)^α     Σ_N = N (1 − cos θ_N)', C.white]], 1104, 284, { size: 25, a: la });
    sgRich([['N(θ_N²/2 − θ_N⁴/24) ≤ ', C.lean], ['Σ_N', C.mag], [' ≤ N θ_N²/2', C.lean]], 1104, 350, { size: 28, a: la * at(S, 2, 0.6) });
    txt('Lean conventions at N = 0 · N = 0 时按 Lean 约定', 1104, 400, { size: 18, fam: F.zh, w: 700, c: C.dim, a: la * at(S, 2, 0.6) });
    sgLean(1104, 460, SG_LEAN.accumulated_sagitta_bounds, la, { size: 20 });
  }
  const na = a * at(S, 3, 0.6);
  if (na > 0.003) {
    panel(1080, 600, 740, 220, na, C.cyan, 'OUR HUNDRED STEPS · θ = 0.1, N = 100');
    sgRich([[sgF(sgLo(1, 1, 0.5, 100), 7), C.white], ['  ≤  ', C.white], [sgF(SG_ROUGH, 7), C.mag], ['  ≤  ', C.white], [sgF(sgHi(1, 1, 0.5, 100), 7), C.white]], 1104, 690, { size: 30, a: na });
    txt('lower · 下界        ledger · 账        upper · 上界', 1104, 744, { size: 20, fam: F.zh, w: 700, c: C.dim, a: na });
  }
  stamp('PINNED', 420, 420, Q(S, 2, 'is pinned', 0.5, 0.2) * (1 - at(S, 2, 0.5, 3.0)), C.lean, 36, -0.06);
};

/* ======================================================================= */
/*                               scene 5 · THREE FATES                       */
/* ======================================================================= */
const FT_G = { x0: 190, y0: 800, w: 760, h: 560, lx0: 1, lx1: 6, ly0: -7, ly1: 2 };
/* log₁₀ N across, log₁₀ Σ_N up */
const ftP = (lx, ly) => [FT_G.x0 + FT_G.w * (lx - FT_G.lx0) / (FT_G.lx1 - FT_G.lx0), FT_G.y0 - FT_G.h * (ly - FT_G.ly0) / (FT_G.ly1 - FT_G.ly0)];
SCENES.fates = S => {
  const a = sgFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'Lean checks', 'lean']]);
  /* axes: log₁₀ N across, Σ_N up (σ = T = 1) */
  const o = ftP(FT_G.lx0, FT_G.ly0);
  arrow(o[0], o[1], o[0] + FT_G.w + 30, o[1], C.dim, a, 2);
  arrow(o[0], o[1], o[0], o[1] - FT_G.h - 30, C.dim, a, 2);
  for (let e = 1; e <= 6; e++) { const p = ftP(e, FT_G.ly0); line(p[0], p[1], p[0], p[1] + 10, C.dim, a, 2); txt(`10${'⁰¹²³⁴⁵⁶'[e]}`, p[0], p[1] + 40, { size: 22, fam: F.math, w: 700, align: 'center', c: C.dim, a }); }
  txt('N', o[0] + FT_G.w + 40, o[1] + 10, { size: 28, fam: F.math, w: 700, c: C.white, a });
  txt('Σ_N  (log scale · 对数刻度)', o[0] - 20, o[1] - FT_G.h - 44, { size: 26, fam: F.zh, w: 700, c: C.mag, a });
  for (const [ly, s] of [[-6, '10⁻⁶'], [-4, '10⁻⁴'], [-2, '10⁻²'], [Math.log10(0.5), '0.5'], [2, '10²']]) { const p = ftP(1, ly); line(p[0] - 10, p[1], p[0] + FT_G.w, p[1], C.dim, a * 0.2, 1); txt(s, p[0] - 18, p[1] + 8, { size: 22, fam: F.math, w: 700, align: 'right', c: C.dim, a }); }
  txt('σ = T = 1 · computed here · 屏幕上算出', o[0] + FT_G.w, 230, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.cyan, a });
  /* which fate is current */
  const cur = at(S, 3, 0.01) > 0 ? 3 : at(S, 2, 0.01) > 0 ? 2 : at(S, 1, 0.01) > 0 ? 1 : 0;
  const grow = clamp(at(S, 0, 3.0));
  ctx.save(); ctx.beginPath(); ctx.rect(FT_G.x0, FT_G.y0 - FT_G.h - 30, FT_G.w + 10, FT_G.h + 34); ctx.clip();
  SG_ALPHAS.forEach(([al, lab], i) => {
    const fate = al > 0.5 ? 1 : al === 0.5 ? 2 : 3;
    const col = fate === cur ? C.now : C.mag;
    curve(s => { const lx = FT_G.lx0 + (FT_G.lx1 - FT_G.lx0) * s * grow; return ftP(lx, Math.log10(sgSum(1, 1, al, Math.pow(10, lx)))); }, 200, col, a * (fate === cur ? 1 : 0.55), fate === cur ? 5 : 3);
  });
  ctx.restore();
  if (grow > 0.98) SG_ALPHAS.forEach(([al, s]) => {
    const fate = al > 0.5 ? 1 : al === 0.5 ? 2 : 3, p = ftP(6, Math.log10(sgSum(1, 1, al, 1e6)));
    txt('α = ' + s, p[0] + 14, p[1] + 8, { size: 24, fam: F.math, w: 700, c: fate === cur ? C.now : C.mag, a });
  });
  /* the three verdicts */
  const rows = [
    [1, 'α > 1/2', 'Σ_N → 0', '趋于零'],
    [2, 'α = 1/2', 'Σ_N → σ²T/2', '停在 σ²T/2（此处 0.5）'],
    [3, '0 < α < 1/2, σ ≠ 0', 'Σ_N → +∞', '无限增长（N = 10⁶ 时 ' + sgF(sgSum(1, 1, 1 / 3, 1e6), 4) + '）']
  ];
  const la = a * Q(S, 1, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1080, 210, 740, 600, la, C.lean, 'T > 0,  N → ∞');
    rows.forEach(([k, cond, lim, zh], i) => {
      const ra = la * (k === 1 ? Q(S, 1, 'When alpha', 0.6) : at(S, k, 0.6));
      const y = 300 + i * 140, col = cur === k ? C.now : C.white;
      txt(cond, 1110, y, { size: 28, fam: F.math, w: 700, c: col, a: ra });
      txt(lim, 1500, y, { size: 30, fam: F.math, w: 700, c: C.lean, a: ra });
      txt(zh, 1110, y + 44, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ra });
    });
    sgLean(1110, 760, SG_LEAN.accumulated_sagitta_phases, la, { size: 20 });
  }
  /* line 0: the step rule */
  const sa = a * at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (sa > 0.003) chip(1450, 420, 520, 90, 'θ_N = σ (T/N)^α', C.now, sa, 40, F.math);
};

/* ======================================================================= */
/*                          scene 6 · WHAT IT DOES NOT SAY                   */
/* ======================================================================= */
SCENES.edge = S => {
  const a = sgFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, null, 'argued']]);
  /* a full turn: the point comes back, the drop is zero */
  const cx = 420, cy = 470, r = 190, sp = clamp(at(S, 0, 2.5));
  ring(cx, cy, r, C.white, a * 0.5, 2.5);
  sgArc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + TAU * ease(sp) * 0.999, C.now, a * at(S, 0, 0.5), 6);
  dot(cx, cy - r, 15, 'o', a);
  txt('α = 0, σ = 2π', cx, cy + r + 60, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a });
  txt('every step a full turn · 每步转满一圈', cx, cy + r + 100, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
  txt('drop 1 − cos 2π = 0', cx, cy + r + 140, { size: 26, fam: F.math, w: 700, align: 'center', c: C.mag, a: a * Q(S, 0, 'every drop is zero', 0.6) });
  const rows = [
    { k: 0, col: C.cyan, en: 'α ≤ 0: no claim', zh: 'α ≤ 0 不在定理之内；α > 0 不能去掉', note: 'Σ_N ≡ 0 here · hand derivation · 手工推导' },
    { k: 1, col: C.cyan, en: 'equal, fixed steps only', zh: '只讲等长、确定的步子', note: 'not random, not uneven · 不是随机的，也不是长短不一的' },
    { k: 2, col: C.argued, en: '½ as Itô’s correction · arc calculus', zh: '伊藤修正项的读法 · 极小圆弧体微积分', note: 'literature result · MODEL of the chapter · 文献结果与本章模型' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 210 + i * 210;
    panel(860, y, 960, 180, ra, rw.col);
    txt(rw.en, 890, y + 58, { size: 30, fam: F.math, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 890, y + 104, { size: 28, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 890, y + 148, { size: 20, fam: F.zh, w: 700, c: rw.col === C.argued ? C.argued : C.dim, a: ra * 0.95 });
  });
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
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  const O = [560, 1040], R = 640, th = 0.6, P = [O[0], O[1] - R], Qp = [O[0] + R * Math.sin(th), O[1] - R * Math.cos(th)], Qm = [O[0] - R * Math.sin(th), Qp[1]];
  sgArc(O[0], O[1], R, -Math.PI / 2 - 0.95, -Math.PI / 2 + 0.95, C.white, 0.5, 2.5);
  sgArc(O[0], O[1], R, -Math.PI / 2 - th, -Math.PI / 2 + th, C.white, 1, 6);
  line(Qm[0], Qm[1], Qp[0], Qp[1], C.cyan, 1, 4);
  arrow(O[0], Qp[1], P[0], P[1] + 4, C.mag, 1, 6);
  dot(Qp[0], Qp[1], 16, 'o', 1);
  txt('sagitta · 矢高', O[0] + 26, (P[1] + Qp[1]) / 2 + 12, { size: 34, fam: F.zh, w: 700, c: C.mag });
  txt(DATA.film.title_zh, 1380, 420, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('TURNS, NOT', 1380, 520, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('DIFFERENCES', 1380, 582, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 4 });
  sgRich([['N θ²/2 − N θ⁴/24 ≤ ', C.lean], ['Σ', C.mag], [' ≤ N θ²/2', C.lean]], 1380, 680, { size: 38, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1380, 760, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
