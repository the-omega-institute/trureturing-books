/* Film · The Ruler Measures Itself: ψ = ψ(ψ) · 尺子量自己：ψ = ψ(ψ)
   (book quantum-geometry, the prelude, §0.5 “从球外回到 ψ = ψ(ψ)”; the fifth film of the prelude series).
   Scenes for theme/film/engine.js.

   One question carries the film: if every view hides something, what happens when the ruler measures itself?
   One rule answers it: read the cosine of an angle (in radians) and use the reading as the next angle,
   θₖ₊₁ = cos θₖ from θ₀ = 1, drawn as in figure prelude-cos-cobweb and lab card `cosine` of prelude-dimensions:
   the cyan curve y = cos θ, the grey diagonal y = θ, the amber path. A dial makes the reading concrete: a fixed
   white arrow (the ruler), an amber arrow at angle θ, the amber arc of that angle (length θ on the unit circle)
   and the cyan shadow of the amber arrow on the ruler, of length cos θ (the shadow of the prelude §0.2).

   What each scene shows, and on what footing:
     TOWER   S¹ tilts into the equator of S² (same radius; violet poles ±e₃); S³, S⁴, ⋯ are dashed schematic
             shells, one more dimension each and not a larger radius, as §0.4 says (a note on screen says so).
             The trapped climber, the eye outside and the author's line “one seems to stand beyond the sphere”
             are the book's reading ......................................................................... ARGUED
     RULE    the dial: θ₀ = 1 rad ≈ 57.3°, the shadow cos 1 ≈ 0.540; on the plot the first step goes up from
             (1, 0) to the curve ........................................................................ computed (NUM)
     COBWEB  the cobweb from θ₀ = 1; the table θ₁ … θ₆ = 0.540, 0.858, 0.654, 0.793, 0.701, 0.764 swings above and
             below θ* ≈ 0.739 (θ* by Newton's method here, |cos θ* − θ*| < 1e−12) ...................... computed (NUM)
     CROSS   the zoom onto the crossing: there is θ* with 0 < θ* < 1 and cos θ* = θ*, and every t > 0 with
             cos t = t equals θ* ..... DottieInverseSeries.rational_inverse_endpoint (LEAN; the same theorem also
             sums a rational series in powers of π to θ*, which the film does not show). That the zigzag reaches
             θ* from every start (Banach) is the literature result of remark rem-prelude-dottie-literature .. ARGUED
     NEVER   the gaps |cos θₖ − θₖ| for k = 0 … 8 (0.460, 0.317, …, 0.019) and the inscribed 6-, 12- and 24-gons,
             perimeter ÷ diameter 3, 3.106, 3.133 against π ............................................ computed (NUM);
             “no finite step lands exactly” and |cos q − q| > 0 for every rational q are literature results
             (remark rem-prelude-finite-literature item 4, remark rem-prelude-dottie-literature); “every sphere
             we hold is an approximation” is the book's reading ............................................ ARGUED
     PSI     at θ*: the angle and the reading on the plot, and on the dial the arc of length θ* unrolled beside
             the shadow cos θ*, the same length 0.739 ................................................... computed (NUM);
             θ* = cos(θ*) written as ψ = ψ(ψ) is the book's notation for self-reference .................... ARGUED
     RECAP   three takeaways (the rule; the LEAN fact with θ* ≈ 0.739; the literature result read by the book),
             the next step of the book (chapter 1 begins with two arrows), the closing card.
   On load, FILM.init checks DATA.lean and recomputes every number printed on screen by a second route (a Taylor
   series for cos, bisection for θ*, Liu Hui's side doubling for the polygons); any disagreement is pushed to
   window.FILM_ERRORS, which stops the render. Every frame is a pure function of the scene time. */
'use strict';

const SM_GID = 'D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint';
const SM_DEG = Math.PI / 180;
/* θ, ψ, ≈, ⊂ and the subscripts: the self-hosted Noto Sans SC draws them, as it draws the subtitles */
const SM_MATH = F.zh;
const SM_LABEL = mix(C.dim, C.white, 0.45);
const SM_AXIS = mix(C.dim, C.white, 0.2);
const SM_SERIES = mix(C.cyan, C.dim, 0.45);
const SM_SUBS = '₀₁₂₃₄₅₆₇₈₉';
const smSub = n => String(n).split('').map(d => SM_SUBS[+d]).join('');

/* ======================================================================= */
/*                               the numbers                               */
/* ======================================================================= */
const SM = (() => {
  const N = 14;
  const iterate = t0 => { const s = [t0]; for (let k = 0; k < N; k++) s.push(Math.cos(s[k])); return s; };
  const th = iterate(1);                                       // θ₀ = 1, θₖ₊₁ = cos θₖ
  let star = 0.75;                                             // Newton's method for cos t − t = 0
  for (let i = 0; i < 40; i++) star -= (Math.cos(star) - star) / (-Math.sin(star) - 1);
  const gap = th.slice(0, 9).map(t => Math.abs(Math.cos(t) - t));   // NEVER: k = 0 … 8
  const sides = [6, 12, 24];
  const ratio = sides.map(n => n * Math.sin(Math.PI / n));     // perimeter ÷ diameter of the inscribed n-gon
  return { N, th, star, gap, sides, ratio, alt: [0.95, 0.55].map(iterate) };
})();
const smF3 = v => v.toFixed(3);
const smRatio = r => (Math.abs(r - Math.round(r)) < 1e-9 ? String(Math.round(r)) : r.toFixed(3));

/* ======================================================================= */
/*                             drawing helpers                              */
/* ======================================================================= */
/* the series marker: the fifth of five films of the prelude, inside the safe area under the HUD */
function smSeries() {
  const s = 'PRELUDE · 5/5 ·', x = SAFE.x0, y = SAFE.y0 + 16;
  txt(s, x, y, { size: 17, fam: F.mono, w: 700, c: SM_SERIES, a: 0.9, ls: 2 });
  txt('序曲', x + tw(s, 17, F.mono, 700, 2) + 8, y + 1, { size: 18, fam: F.zh, w: 700, c: SM_SERIES, a: 0.9 });
}
function smDot(x, y, r, col, a) {
  if (a <= 0.003) return;
  ctx.save();
  ctx.globalAlpha = a * 0.22; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, TAU); ctx.fill();
  ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  ctx.strokeStyle = C.bg; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(x, y, r * 0.36, 0, TAU); ctx.fill();
  ctx.restore();
}
/* an arrow whose head scales with its length */
function smVec(x1, y1, x2, y2, col, a, w = 4) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
  if (a <= 0.003 || L < 1) return;
  const h = Math.min(20, L * 0.5), ux = dx / L, uy = dy / L, bx = x2 - ux * h, by = y2 - uy * h;
  line(x1, y1, bx, by, col, a, w);
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath();
  ctx.moveTo(x2, y2); ctx.lineTo(bx - uy * h * 0.55, by + ux * h * 0.55); ctx.lineTo(bx + uy * h * 0.55, by - ux * h * 0.55);
  ctx.closePath(); ctx.fill(); ctx.restore();
}
function smDash(x1, y1, x2, y2, col, a, w = 1.8) {
  if (a <= 0.003) return;
  ctx.save(); ctx.setLineDash([8, 8]); line(x1, y1, x2, y2, col, a, w); ctx.restore();
}
/* a circular arc for math angles a0 → a1 (counterclockwise on screen, y up) */
function smArc(cx, cy, r, a0, a1, col, a, w = 3, dash = null) {
  if (a <= 0.003 || Math.abs(a1 - a0) < 1e-4) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round';
  if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); ctx.arc(cx, cy, r, -a0, -a1, a1 > a0); ctx.stroke(); ctx.restore();
}
function smTag(s, x, y, col, a, align = 'left', size = 22, fam = SM_MATH, w = 700) {
  txt(s, x, y, { size, fam, w, c: col, a, align });
}
/* a label on a dark plate, readable over lines */
function smPlate(s, x, y, col, a, align = 'left', size = 24, fam = SM_MATH) {
  if (a <= 0.003) return;
  const wd = tw(s, size, fam, 700), x0 = align === 'center' ? x - wd / 2 : align === 'right' ? x - wd : x;
  fillBox(x0 - 8, y - size * 0.95, wd + 16, size * 1.3, C.bg, 0.72 * a);
  smTag(s, x, y, col, a, align, size, fam);
}
/* a rise-and-fall pulse from a rise p (0 → 1) and a later fall q (0 → 1) */
const smBump = (p, q) => clamp(p) * (1 - clamp(q));

/* ---------- the plot: a square window [x0, x1]² on screen; z = 0 the full view, z = 1 zoomed onto θ* ---------- */
const PL = { L: 360, B: 790, S: 570 };
const SM_ZOOM = 0.22;
function smPlot(z = 0, R = PL) {
  const k = ease(z), c = SM.star;
  const x0 = lerp(0, c - SM_ZOOM, k), x1 = lerp(1.1, c + SM_ZOOM, k), sc = R.S / (x1 - x0);
  return { R, L: R.L, B: R.B, z: k, x0, x1, X: x => R.L + (x - x0) * sc, Y: y => R.B - (y - x0) * sc };
}
function smClip(P, fn) {
  ctx.save(); ctx.beginPath(); ctx.rect(P.R.L, P.R.B - P.R.S, P.R.S, P.R.S); ctx.clip(); fn(); ctx.restore();
}
function smAxes(P, a, size = 22) {
  if (a <= 0.003) return;
  const { L, B, S } = P.R;
  line(L, B, L + S + 26, B, SM_AXIS, a, 2);
  line(L, B, L, B - S - 26, SM_AXIS, a, 2);
  smVec(L + S + 10, B, L + S + 34, B, SM_AXIS, a, 2);
  smVec(L, B - S - 10, L, B - S - 34, SM_AXIS, a, 2);
  for (let i = Math.ceil(P.x0 * 10 - 1e-9); i <= Math.floor(P.x1 * 10 + 1e-9); i++) {
    const v = i / 10, x = P.X(v), y = P.Y(v);
    line(x, B, x, B + 8, SM_AXIS, a, 2);
    line(L - 8, y, L, y, SM_AXIS, a, 2);
    const edge = lerp(1, clamp((v - P.x0) / 0.025) * clamp((P.x1 - v) / 0.025), P.z);
    const la = a * edge * (i % 5 === 0 ? 1 : clamp((0.1 * P.R.S / (P.x1 - P.x0) - 80) / 40));
    if (i === 0) { txt('0', L - 14, B + 32, { size, fam: F.mono, w: 700, align: 'right', c: SM_LABEL, a: la }); continue; }
    const s = i % 10 === 0 ? String(i / 10) : v.toFixed(1);
    txt(s, x, B + 34, { size, fam: F.mono, w: 700, align: 'center', c: SM_LABEL, a: la });
    txt(s, L - 16, y + 8, { size, fam: F.mono, w: 700, align: 'right', c: SM_LABEL, a: la });
  }
  smTag('θ', L + S + 44, B + 10, SM_LABEL, a, 'left', 30);
  smTag('y', L + 20, B - S - 14, SM_LABEL, a, 'left', 30);
}
/* the grey diagonal y = θ and the cyan curve y = cos θ, clipped to the window */
function smCurves(P, a, ca = 1, da = 1) {
  if (a <= 0.003) return;
  smClip(P, () => {
    line(P.X(P.x0), P.Y(P.x0), P.X(P.x1), P.Y(P.x1), C.dim, a * da, 3);
    if (a * ca <= 0.003) return;
    ctx.save(); ctx.strokeStyle = C.cyan; ctx.lineJoin = 'round'; ctx.beginPath();
    for (let i = 0; i <= 160; i++) {
      const x = lerp(P.x0 - 0.02, P.x1 + 0.02, i / 160), X = P.X(x), Y = P.Y(Math.cos(x));
      if (i) ctx.lineTo(X, Y); else ctx.moveTo(X, Y);
    }
    ctx.globalAlpha = a * ca * 0.22; ctx.lineWidth = 14; ctx.stroke();
    ctx.globalAlpha = a * ca; ctx.lineWidth = 4.5; ctx.stroke();
    ctx.restore();
  });
}
function smCurveLabels(P, a, ca = 1, da = 1) {
  if (a <= 0.003) return;
  const xc = lerp(0.1, SM.star - 0.19, P.z), xd = P.x0 + 0.88 * (P.x1 - P.x0);
  smTag('y = cos θ', P.X(xc) + 6, P.Y(Math.cos(xc)) - 22, C.cyan, a * ca, 'left', 28);
  smTag('y = θ', P.X(xd) + 18, P.Y(xd) + 34, mix(C.dim, C.white, 0.35), a * da, 'left', 26);
}
/* the cobweb of seq after s steps: step j goes up (or down) from the diagonal to the curve, then across to the
   diagonal; the very first step of the main path starts on the θ-axis. Returns the points. */
function smCobPts(s, seq, fromAxis) {
  const n = Math.min(Math.floor(s + 1e-9), seq.length - 1), f = s - n;
  const pts = [[seq[0], fromAxis ? 0 : seq[0]]];
  for (let j = 1; j <= n; j++) pts.push([seq[j - 1], seq[j]], [seq[j], seq[j]]);
  if (n < seq.length - 1 && f > 1e-9) {
    const A = pts[pts.length - 1], Bp = [seq[n], seq[n + 1]], Cp = [seq[n + 1], seq[n + 1]];
    if (f <= 0.5) pts.push([A[0], lerp(A[1], Bp[1], f * 2)]);
    else pts.push(Bp, [lerp(Bp[0], Cp[0], f * 2 - 1), Bp[1]]);
  }
  return pts;
}
function smCob(P, s, a, o = {}) {
  const pts = smCobPts(s, o.seq || SM.th, o.fromAxis !== false);
  if (a > 0.003) {
    smClip(P, () => {
      ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = o.col || C.now; ctx.lineWidth = o.w || 3.4; ctx.lineJoin = 'round';
      ctx.beginPath(); pts.forEach((p, i) => { const X = P.X(p[0]), Y = P.Y(p[1]); if (i) ctx.lineTo(X, Y); else ctx.moveTo(X, Y); });
      ctx.stroke(); ctx.restore();
    });
  }
  return pts[pts.length - 1];
}

/* ---------- the dial: the ruler (white), the angle θ (amber arrow and arc), the reading cos θ (cyan shadow) ---------- */
const DL = { cx: 1250, cy: 690, R: 290 };
function smDial(o) {
  const { cx, cy, R } = DL, th = o.th, a = o.a;
  const tx = cx + R * Math.cos(th), ty = cy - R * Math.sin(th);   // returned even when nothing is drawn
  if (a <= 0.003) return { tx, ty };
  smArc(cx, cy, R, -0.04, Math.PI / 2 + 0.06, C.dim, 0.55 * a, 1.6, [6, 7]);
  smVec(cx, cy, cx + R + 40, cy, C.white, 0.85 * a, 3.5);
  const arcA = a * (o.arc == null ? 1 : o.arc);
  if (!(o.unroll > 0)) smArc(cx, cy, R, 0, th, C.now, arcA, 7);
  smVec(cx, cy, tx, ty, C.now, a, 4);
  const sh = a * (o.shadow || 0);
  if (sh > 0) {
    smDash(tx, ty, tx, cy, C.white, 0.6 * sh, 1.8);
    line(cx, cy, tx, cy, C.cyan, sh, 10);
  }
  if (o.unroll > 0) {                                          // the arc laid out straight just under the ruler
    const k = ease(o.unroll), N = 48, y1 = cy + 30;
    ctx.save(); ctx.globalAlpha = arcA; ctx.strokeStyle = C.now; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath();
    for (let i = 0; i <= N; i++) {
      const s = th * i / N, x = lerp(cx + R * Math.cos(s), cx + R * s, k), y = lerp(cy - R * Math.sin(s), y1, k);
      if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
    }
    ctx.stroke(); ctx.restore();
  }
  smDot(cx, cy, 7, C.white, a);
  return { tx, ty };
}

/* ---------- the tower: S¹ as the equator of S², then schematic shells ---------- */
const TWR = { cx: 690, cy: 480, R: 140, el: 22 * SM_DEG, shells: [212, 284] };
/* a circle on the unit sphere, rotated by the elevation el about the x-axis and projected; the far half dashed */
function smSphereCurve(f, el, col, a, w = 2, far = 0.4) {
  if (a <= 0.003) return;
  const { cx, cy, R } = TWR, N = 120, pts = [];
  for (let i = 0; i <= N; i++) {
    const [X, Y, Z] = f(i / N * TAU);
    const y = Y * Math.cos(el) - Z * Math.sin(el), z = Y * Math.sin(el) + Z * Math.cos(el);
    pts.push([cx + R * X, cy - R * y, z >= -1e-9]);
  }
  for (const near of [false, true]) {
    ctx.save(); ctx.globalAlpha = a * (near ? 1 : far); ctx.strokeStyle = col; ctx.lineWidth = w;
    if (!near && far < 0.99) ctx.setLineDash([6, 7]);
    ctx.beginPath();
    for (let i = 0; i < N; i++) {
      if (pts[i][2] !== near || pts[i + 1][2] !== near) continue;
      ctx.moveTo(pts[i][0], pts[i][1]); ctx.lineTo(pts[i + 1][0], pts[i + 1][1]);
    }
    ctx.stroke(); ctx.restore();
  }
}
/* o: a, tilt (0: S¹ face-on → 1: the equator of S²), sph, poles, shells [a3, a4], more */
function smTower(o) {
  const { cx, cy, R, el, shells } = TWR, a = o.a;
  if (a <= 0.003) return;
  const tilt = ease(o.tilt || 0), view = lerp(90 * SM_DEG, el, tilt), sph = a * (o.sph || 0);
  /* the schematic outer shells: S³, S⁴, and the start of the next */
  shells.forEach((r, i) => {
    const sa = a * ((o.shells || [])[i] || 0);
    if (sa <= 0.003) return;
    ctx.save(); ctx.setLineDash([10, 9]); ring(cx, cy, r, C.white, 0.5 * sa, 2); ctx.restore();
    smDot(cx, cy - r, 6, C.vio, sa); smDot(cx, cy + r, 6, C.vio, sa);
    const ang = (132 - 6 * i) * SM_DEG;
    smTag(`S${'³⁴'[i]}`, cx + (r + 18) * Math.cos(ang), cy - (r + 18) * Math.sin(ang), C.white, sa, 'right', 30);
    smTag(`±e${smSub(4 + i)}`, cx + 14, cy - r - 12, C.vio, 0.9 * sa, 'left', 20);
  });
  const ma = a * (o.more || 0);
  if (ma > 0.003) {
    smArc(cx, cy, 350, -38 * SM_DEG, 38 * SM_DEG, C.white, 0.3 * ma, 2, [10, 9]);
    smArc(cx, cy, 350, 142 * SM_DEG, 218 * SM_DEG, C.white, 0.3 * ma, 2, [10, 9]);
    smTag('⋯', cx + 372, cy + 10, C.white, 0.7 * ma, 'left', 34);
  }
  /* S²: outline, a meridian, the violet axis through ±e₃ */
  if (sph > 0.003) {
    ring(cx, cy, R, C.white, 0.75 * sph, 2.5);
    const B = 105 * SM_DEG;
    smSphereCurve(t => [Math.sin(t) * Math.cos(B), Math.cos(t), Math.sin(t) * Math.sin(B)], el, C.white, 0.35 * sph, 1.6);
    smSphereCurve(t => [Math.cos(35 * SM_DEG) * Math.cos(t), Math.sin(35 * SM_DEG), Math.cos(35 * SM_DEG) * Math.sin(t)], el, C.white, 0.25 * sph, 1.4);
    smTag('S²', cx + (R + 16) * Math.cos(118 * SM_DEG), cy - (R + 16) * Math.sin(118 * SM_DEG), C.white, sph, 'right', 30);
  }
  const pa = a * (o.poles || 0);
  if (pa > 0.003) {
    const py = R * Math.cos(el);
    smDash(cx, cy - py, cx, cy + py, C.vio, 0.6 * pa, 2);
    line(cx, cy - py, cx, cy - py - 34, C.vio, pa, 3);
    line(cx, cy + py, cx, cy + py + 34, C.vio, pa, 3);
    smDot(cx, cy - py, 6, C.vio, pa); smDot(cx, cy + py, 6, C.vio, pa);
    smTag('±e₃', cx + 14, cy - py - 14, C.vio, pa, 'left', 20);
  }
  /* S¹: face-on, then tilted into the equator of S² (same radius) */
  smSphereCurve(t => [Math.cos(t), 0, Math.sin(t)], view, C.cyan, a, 4, lerp(1, 0.45, clamp(o.sph || 0)));
  smTag('S¹', cx, cy + R * Math.sin(view) + 40, C.cyan, a, 'center', 30);
}
/* a small eye: the one who looks from outside */
function smEye(x, y, s, col, a) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 2.4;
  ctx.beginPath(); ctx.moveTo(x - s, y); ctx.quadraticCurveTo(x, y - s * 0.8, x + s, y); ctx.quadraticCurveTo(x, y + s * 0.8, x - s, y); ctx.stroke();
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, s * 0.3, 0, TAU); ctx.fill(); ctx.restore();
}

/* ======================================================================= */
/*  TOWER · spheres beyond spheres; the question                            */
/* ======================================================================= */
SCENES.tower = S => {
  const u = S.u, L0 = lineAt(S, 0), fade = clamp((S.d - u) / 0.5);
  smSeries();
  /* title card during the lead */
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.5) / 0.7));
  if (ta > 0) {
    const p = clamp(u / 1.4), parts = DATA.film.title.split(':');
    txt(`${DATA.book.code} · FILM`, W / 2, 390, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
    txt(DATA.film.title_zh, W / 2, 510, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 3 });
    /* the words in capitals, the formula as written: upper-casing would turn ψ into Ψ */
    const en = parts[0].toUpperCase() + ':', fx = parts.slice(1).join(':').trim();
    const we = tw(en, 40, F.orb, 900, 4), wf = tw(fx, 44, SM_MATH, 700), x = W / 2 - (we + 24 + wf) / 2;
    txt(scramble(en, p, 11), x, 596, { size: 40, fam: F.orb, w: 900, c: C.white, a: ta, ls: 4, ab: 2 });
    txt(fx, x + we + 24, 598, { size: 44, fam: SM_MATH, w: 700, c: C.white, a: ta * clamp(p * 1.6) });
  }
  const ga = clamp((u - L0.s + 0.2) / 0.8) * fade;
  if (ga <= 0) return;
  /* line 3: everything steps back for the question */
  const ask = Q(S, 3, 'So here is the question', 1.0), back = 1 - 0.85 * ask, side = 1 - ask;
  badge(Q(S, 1, 'A climber', 0.5) * (1 - Q(S, 3, 'So here', 0.6)) * fade, 'argued');
  const o = {
    a: ga * back,
    tilt: Q(S, 0, 'a larger sphere', 1.6),
    sph: Q(S, 0, 'a larger sphere', 1.2),
    poles: Q(S, 0, 'one dimension up', 0.8),
    shells: [Q(S, 0, 'closed around', 0.8), Q(S, 0, 'closed around', 0.8, 0.8)],
    more: Q(S, 0, 'closed around', 0.8, 1.6)
  };
  smTower(o);
  txt('outer shells drawn schematically: each adds one dimension, the radius stays 1 · 外层为示意：每层多一维，半径不变',
    TWR.cx, 846, { size: 17, fam: F.zh, w: 700, align: 'center', c: C.dim, a: o.more * ga * back });
  /* the climber: an amber point walking round a latitude of S², never leaving it */
  const qc = Q(S, 1, 'A climber', 0.6) * ga * back;
  if (qc > 0) {
    const t = 0.9 * (u - phraseAt(S, 1, 'A climber')), lat = 35 * SM_DEG;
    const X = Math.cos(lat) * Math.cos(t + 2.2), Y = Math.sin(lat), Z = Math.cos(lat) * Math.sin(t + 2.2);
    const y = Y * Math.cos(TWR.el) - Z * Math.sin(TWR.el), z = Y * Math.sin(TWR.el) + Z * Math.cos(TWR.el);
    smDot(TWR.cx + TWR.R * X, TWR.cy - TWR.R * y, 10, C.now, qc * (z >= 0 ? 1 : 0.45));
  }
  /* the eye outside, and the rule it reads */
  const qe = Q(S, 1, 'yet we just did', 0.6) * ga * side;
  if (qe > 0) {
    const ex = 1130, ey = 292;
    smEye(ex, ey, 24, C.white, qe);
    smDash(ex - 30, ey + 12, TWR.cx + 230, TWR.cy - 190, C.white, 0.45 * qe, 1.6);
    smTag('S¹ ⊂ S² ⊂ S³ ⊂ S⁴ ⊂ ⋯', ex + 44, ey + 16, C.white, qe, 'left', 46);
    smTag('each sphere is the equator of the next', ex - 24, ey + 76, SM_LABEL, qe, 'left', 24, F.disp);
    smTag('每一颗球都是下一颗的赤道', ex - 24, ey + 112, SM_LABEL, qe, 'left', 24, F.zh);
  }
  /* the book's reading: the author's line */
  const qr = Q(S, 2, "The book's reading", 0.6) * ga * side;
  if (qr > 0) {
    const x = 1086, y = 470;
    panel(x, y, 680, 262, qr, C.argued, "THE BOOK'S READING · 本书的诠释");
    txt('当人可以不断地理解球外之球的时候，', x + 28, y + 84, { size: 30, fam: F.zh, w: 700, c: C.white, a: qr });
    txt('实际上人似乎在球外。', x + 28, y + 128, { size: 30, fam: F.zh, w: 700, c: C.white, a: qr });
    txt('When one can continually comprehend spheres beyond spheres,', x + 28, y + 178, { size: 20, fam: F.disp, w: 600, c: C.argued, a: qr });
    txt('one seems, in fact, to stand beyond the sphere.', x + 28, y + 206, { size: 20, fam: F.disp, w: 600, c: C.argued, a: qr });
    txt('the author · prelude §0.5 · 作者原话', x + 28, y + 244, { size: 16, fam: F.zh, w: 700, c: C.dim, a: qr });
  }
  /* the question */
  const qq = Q(S, 3, 'what happens', 0.8) * fade;
  if (qq > 0) {
    txt('What happens when the ruler measures itself?', W / 2, 478, { size: 56, fam: F.disp, w: 700, align: 'center', c: C.white, a: qq, ab: 1 });
    txt('尺子量自己，会怎样？', W / 2, 568, { size: 50, fam: F.zh, w: 900, align: 'center', c: C.cyan, a: qq });
  }
};

/* ======================================================================= */
/*  RULE · read the cosine, use the reading as the next angle               */
/* ======================================================================= */
SCENES.rule = S => {
  const u = S.u, fade = clamp(u / 0.4) * clamp((S.d - u) / 0.5);
  smSeries();
  badge(at(S, 1, 0.5) * clamp((S.d - u) / 0.5), 'computed');
  const P = smPlot(0), ga = clamp(u / 0.8) * fade;
  smAxes(P, ga);
  smCurves(P, ga);
  smCurveLabels(P, ga);
  /* the angle on the dial: swept during line 0, settled at 1 rad during line 1 */
  const L0 = lineAt(S, 0);
  const sweep = ease(clamp((u - L0.s) / Math.max(1, 0.7 * (L0.e - L0.s))));
  const th = lerp(lerp(0.35, 1.08, sweep), 1, ease(at(S, 1, 1.4)));
  const da = at(S, 0, 0.8, -0.3) * fade;
  const d = smDial({ th, a: da, shadow: Q(S, 0, 'read the cosine', 0.6) });
  const { cx, cy, R } = DL;
  smTag('ruler', cx + R + 46, cy + 8, SM_LABEL, da, 'left', 22, F.disp);
  const qa = Q(S, 0, 'of an angle', 0.5) * fade;
  smTag('angle θ', cx + (R + 20) * Math.cos(th / 2) + 8, cy - (R + 20) * Math.sin(th / 2), C.now, qa * (1 - at(S, 1, 0.5)), 'left', 26);
  const qrd = Q(S, 0, 'read the cosine', 0.6) * fade;
  smTag('reading cos θ', (cx + d.tx) / 2, cy + 50, C.cyan, qrd, 'center', 26);
  /* the rule written once */
  const qf = Q(S, 0, 'then use that reading', 0.7) * fade;
  smTag('θₖ₊₁ = cos θₖ', 1010, 286, C.white, qf, 'left', 52);
  smTag('the next angle is the reading of this one', 1012, 334, SM_LABEL, qf, 'left', 22, F.disp);
  smTag('下一个角 = 这一个角的余弦读数', 1012, 368, SM_LABEL, qf, 'left', 22, F.zh);
  /* on the plot: the same reading, (θ, cos θ) on the cyan curve, while the angle sweeps */
  const qm = Q(S, 0, 'read the cosine', 0.6) * (1 - at(S, 1, 0.6)) * ga;
  if (qm > 0) {
    smDash(P.X(th), P.Y(Math.cos(th)), P.X(th), P.B, C.white, 0.5 * qm, 1.6);
    smDot(P.X(th), P.Y(Math.cos(th)), 10, C.now, qm);
  }
  /* line 1: radians, θ₀ = 1 */
  const q1 = Q(S, 1, 'radians', 0.6) * fade;
  smTag('θ₀ = 1 rad ≈ 57.3°', cx + (R + 22) * Math.cos(0.5) + 6, cy - (R + 22) * Math.sin(0.5), C.now, q1, 'left', 28);
  smTag('arc length 1 on a circle of radius 1', cx + 4, cy + 104, SM_LABEL, q1 * (1 - at(S, 2, 0.5)), 'left', 20, F.disp);
  const q0 = Q(S, 1, 'we start at one', 0.5) * fade;
  smDot(P.X(1), P.B, 10, C.now, q0);
  smTag('θ₀ = 1', P.X(1) + 16, P.B - 16, C.now, q0, 'left', 26);
  /* line 2: the first reading, on the plot and on the dial */
  const s = 0.5 * ease(at(S, 2, 1.6, 0.2));
  if (s > 0) smCob(P, s, fade);
  const q2 = Q(S, 2, 'about zero point five four', 0.6) * fade;
  smPlate(`cos 1 ≈ ${smF3(Math.cos(1))}`, P.X(1) + 18, P.Y(Math.cos(1)) + 10, C.cyan, q2, 'left', 28);
  smPlate(`≈ ${smF3(Math.cos(1))}`, (cx + d.tx) / 2, cy + 96, C.cyan, q2, 'center', 30);
};

/* ======================================================================= */
/*  COBWEB · up to the curve, across to the diagonal; the table of readings */
/* ======================================================================= */
const TB = { x: 1020, y: 226, w: 620, h: 486, row: 54, ax0: 1340, ax1: 1600 };
const smTbX = v => TB.ax0 + (v - 0.5) / 0.5 * (TB.ax1 - TB.ax0);
function smCobS(S) {
  const u = S.u, L1 = lineAt(S, 1), L2 = lineAt(S, 2);
  let s = 0.5 + 0.5 * ease(Q(S, 0, 'then across to the diagonal', 1.2));
  s += 5 * clamp((u - L1.s - 0.1) / Math.max(1, L1.e - L1.s + 0.4));
  s += 6 * ease(clamp((u - L2.s) / 2.8));
  return s;
}
SCENES.cobweb = S => {
  const u = S.u, fade = clamp((S.d - u) / 0.5);
  smSeries();
  badgeQ(S, [[0, null, 'computed']]);
  const P = smPlot(0);
  smAxes(P, fade);
  smCurves(P, fade);
  smCurveLabels(P, fade);
  const s = smCobS(S);
  const tip = smCob(P, s, fade);
  /* line 0: read (up to the curve), reuse (across to the diagonal, then down to the θ-axis) */
  const qread = smBump(Q(S, 0, 'up to the curve', 0.5), at(S, 1, 0.6));
  smTag('read ↑', P.X(1) + 16, P.Y(0.27), C.cyan, qread * fade, 'left', 26);
  const qreuse = smBump(Q(S, 0, 'to reuse', 0.5), at(S, 1, 0.8, 0.6));
  if (qreuse > 0) {
    const t1 = SM.th[1];
    smTag('← reuse', P.X((1 + t1) / 2), P.Y(t1) + 36, C.now, qreuse * fade, 'center', 26);
    smDash(P.X(t1), P.Y(t1), P.X(t1), P.B, C.white, 0.6 * qreuse * fade, 1.8);
    smDot(P.X(t1), P.B, 8, C.now, qreuse * fade);
    smTag('θ₁', P.X(t1), P.B - 18, C.now, qreuse * fade, 'center', 26);
  }
  smDot(P.X(tip[0]), P.Y(tip[1]), 9, C.now, fade * (1 - Q(S, 2, 'one number', 0.8)));
  /* the table θ₀ … θ₆, each with its place on a small axis [0.5, 1] */
  const ta = clamp(u / 0.6) * fade;
  panel(TB.x, TB.y, TB.w, TB.h, ta, C.cyan, 'READINGS · 读数 (radians)');
  const shown = Math.min(6, Math.floor(s + 0.5 + 1e-9)), cur = s < 6.6 ? shown : -1;
  const qs = Q(S, 2, 'one number', 0.6) * fade;
  const yAx = TB.y + 74 + 7 * TB.row;
  line(TB.ax0, TB.y + 52, TB.ax0, yAx - 30, C.dim, 0.5 * ta, 1);
  line(TB.ax1, TB.y + 52, TB.ax1, yAx - 30, C.dim, 0.5 * ta, 1);
  txt('0.5', TB.ax0, yAx, { size: 18, fam: F.mono, w: 700, align: 'center', c: SM_LABEL, a: ta });
  txt('1', TB.ax1, yAx, { size: 18, fam: F.mono, w: 700, align: 'center', c: SM_LABEL, a: ta });
  if (qs > 0) {
    smDash(smTbX(SM.star), TB.y + 46, smTbX(SM.star), yAx - 30, C.white, 0.8 * qs, 2);
    txt(`θ* ≈ ${smF3(SM.star)}`, smTbX(SM.star), yAx, { size: 22, fam: SM_MATH, w: 700, align: 'center', c: C.white, a: qs });
  }
  for (let k = 0; k <= shown; k++) {
    const y = TB.y + 84 + k * TB.row, ra = ta * (k <= 1 ? 1 : clamp((s - k + 0.5) / 0.25));
    const col = k === cur ? C.now : C.white;
    txt(`θ${smSub(k)}`, TB.x + 36, y, { size: 30, fam: SM_MATH, w: 700, c: col, a: ra });
    txt(k === 0 ? '1' : smF3(SM.th[k]), TB.x + 120, y, { size: 30, fam: F.mono, w: 700, c: col, a: ra });
    line(TB.ax0, y - 10, TB.ax1, y - 10, C.dim, 0.35 * ra, 1);
    smDot(smTbX(SM.th[k]), y - 10, k === cur ? 8 : 6, col, ra);
  }
  /* the crossing, found: θ* by Newton's method */
  if (qs > 0) {
    const cx = P.X(SM.star), cy = P.Y(SM.star);
    ring(cx, cy, 20, C.white, qs, 2.5);
    const lab = `θ* ≈ ${smF3(SM.star)}`, lx = P.X(0.08) + tw(lab, 30, SM_MATH, 700) + 14;
    line(lx, P.Y(0.60) - 10, cx - 20, cy + 6, C.white, 0.6 * qs, 1.5);
    smPlate(lab, P.X(0.08), P.Y(0.60), C.white, qs, 'left', 30);
  }
};

/* ======================================================================= */
/*  CROSS · one positive crossing (LEAN); from any start (literature)       */
/* ======================================================================= */
SCENES.cross = S => {
  const u = S.u, fade = clamp((S.d - u) / 0.5);
  smSeries();
  badgeQ(S, [[0, null, 'computed'], [0, 'at exactly one positive point', 'lean'], [2, null, 'argued']]);
  const z = Q(S, 0, 'at exactly one positive point', 2.0, 0.6), P = smPlot(z);
  smAxes(P, fade);
  smCurves(P, fade);
  smCurveLabels(P, fade);
  const main = 1 - 0.55 * ease(Q(S, 0, 'at exactly one positive point', 1.0));
  smCob(P, 12, fade * main, { w: 3 });
  const cx = P.X(SM.star), cy = P.Y(SM.star);
  /* between zero and one: the interval on the θ-axis, before the zoom */
  const qb = smBump(Q(S, 0, 'cross between zero and one', 0.5), Q(S, 0, 'at exactly one positive point', 0.5, 0.4)) * fade;
  if (qb > 0) {
    line(P.X(0), P.B, P.X(1), P.B, C.white, qb, 6);
    smDash(cx, cy, cx, P.B, C.white, 0.6 * qb, 1.8);
    smDot(cx, P.B, 8, C.white, qb);
    smPlate('0 < θ* < 1', P.X(0.5), P.B - 22, C.white, qb, 'center', 30);
  }
  /* the crossing: white, then green while the Lean fact is on screen */
  const qg = Q(S, 0, 'at exactly one positive point', 0.6, 0.8);
  const col = qg > 0.5 ? C.lean : C.white;
  ring(cx, cy, 22 + 6 * Math.sin(u * 3), col, fade * (0.6 + 0.4 * qg), 3);
  smDot(cx, cy, 9, col, fade);
  const qt = Q(S, 0, 'at exactly one positive point', 0.6, 2.3);
  if (qt > 0) {
    const lx = P.X(SM.star + 0.126), ly = P.Y(SM.star - 0.174);
    line(cx + 14, cy + 14, lx - 6, ly - 28, col, 0.7 * fade * qt, 1.5);
    smPlate('θ*', lx, ly, col, fade * qt, 'left', 32);
  }
  /* line 2: other starts reach θ* too (violet: the literature result, not formalized) */
  const qv = at(S, 2, 0.5) * fade;
  if (qv > 0) {
    SM.alt.forEach((seq, i) => {
      const sv = 10 * ease(clamp((u - lineAt(S, 2).s - 0.3 - 0.5 * i) / 3.4));
      smCob(P, sv, qv, { seq, fromAxis: false, col: C.argued, w: 3 });
      smDot(P.X(seq[0]), P.Y(seq[0]), 8, C.argued, qv);
      smPlate(`θ₀ = ${seq[0].toFixed(2)}`, P.X(seq[0]) + (i ? 16 : -18), P.Y(seq[0]) + (i ? -18 : 8), C.argued, qv, i ? 'left' : 'right', 24);
    });
  }
  /* the Lean statement, as the theorem says it */
  const ql = Q(S, 0, 'at exactly one positive point', 0.6, 0.6) * fade, x = 990, y = 230;
  if (ql > 0) {
    panel(x, y, 740, 290, ql, C.lean, 'LEAN ✓ · CHECKED BY THE KERNEL · 内核检查');
    txt('there is θ* with 0 < θ* < 1 and cos θ* = θ*', x + 30, y + 92, { size: 28, fam: SM_MATH, w: 700, c: C.white, a: ql });
    txt('every t > 0 with cos t = t equals θ*', x + 30, y + 142, { size: 28, fam: SM_MATH, w: 700, c: C.white, a: ql });
    txt('存在 θ*，0 < θ* < 1，cos θ* = θ*；正解只有它一个', x + 30, y + 190, { size: 24, fam: F.zh, w: 700, c: SM_LABEL, a: ql });
    const r = leanCite(SM_GID), lq = Q(S, 1, 'checked by the Lean kernel', 0.6) * fade;
    if (r) txt(r.label || r.name, x + 30, y + 250, { size: 16, fam: F.mono, w: 700, c: C.lean, a: lq });
  }
  const qa = at(S, 2, 0.6, 0.3) * fade, y2 = 556;
  if (qa > 0) {
    panel(x, y2, 740, 230, qa, C.argued, 'LITERATURE · 文献结果 · NOT FORMALIZED HERE');
    txt('from any start θ₀, the zigzag tends to θ*', x + 30, y2 + 90, { size: 30, fam: SM_MATH, w: 700, c: C.white, a: qa });
    txt('Banach fixed-point theorem, cited in the prelude', x + 30, y2 + 140, { size: 22, fam: F.disp, w: 600, c: C.argued, a: qa });
    txt('任意初值都收敛到 θ*：巴拿赫不动点定理，本书引用、未形式化', x + 30, y2 + 186, { size: 22, fam: F.zh, w: 700, c: C.argued, a: qa });
  }
};

/* ======================================================================= */
/*  NEVER · the gap shrinks and never vanishes; polygons inside a circle    */
/* ======================================================================= */
const BR = { x0: 250, dx: 88, w: 56, base: 742, sc: 820 };
const PG = { cx: 1470, cy: 402, R: 168 };
function smPolygon(n, col, a, w) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const t = Math.PI / 2 + i * TAU / n, x = PG.cx + PG.R * Math.cos(t), y = PG.cy - PG.R * Math.sin(t);
    if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y);
  }
  ctx.stroke(); ctx.restore();
}
SCENES.never = S => {
  const u = S.u, fade = clamp(u / 0.4) * clamp((S.d - u) / 0.5);
  smSeries();
  badgeQ(S, [[0, null, 'computed'], [0, 'it never reaches zero', 'argued'], [1, null, 'computed'], [2, null, 'argued']]);
  const last = Q(S, 2, 'The book reads this', 0.8), dim = 1 - 0.8 * last;
  /* the bars: the gap between the reading and the angle, step by step */
  const ba = fade * dim, L0 = lineAt(S, 0);
  txt('the gap between reading and angle · 读数与角之差', BR.x0 - 30, 250, { size: 26, fam: F.zh, w: 700, c: SM_LABEL, a: ba });
  txt('|cos θₖ − θₖ|', BR.x0 - 30, 302, { size: 40, fam: SM_MATH, w: 700, c: C.white, a: ba });
  line(BR.x0 - 40, BR.base, BR.x0 + 9 * BR.dx, BR.base, C.white, 0.8 * ba, 2.5);
  txt('0', BR.x0 - 52, BR.base + 8, { size: 22, fam: F.mono, w: 700, align: 'right', c: SM_LABEL, a: ba });
  const grow = clamp((u - 0.3) / Math.max(1, L0.s + 0.6 * (L0.e - L0.s) - 0.3));
  const nb = 9 * grow;
  for (let k = 0; k < 9; k++) {
    const g = clamp(nb - k), x = BR.x0 + k * BR.dx, h = SM.gap[k] * BR.sc * ease(g);
    if (g <= 0) break;
    const newest = k === Math.min(8, Math.floor(nb)) && grow < 1;
    const col = newest ? C.now : C.white;
    fillBox(x, BR.base - h, BR.w, h, col, (newest ? 0.85 : 0.5) * ba);
    line(x, BR.base - h, x + BR.w, BR.base - h, col, ba, 2.5);
    txt(smF3(SM.gap[k]), x + BR.w / 2, BR.base - h - 12, { size: 21, fam: F.mono, w: 700, align: 'center', c: col, a: ba * clamp(g * 2 - 1) });
    txt(String(k), x + BR.w / 2, BR.base + 32, { size: 20, fam: F.mono, w: 700, align: 'center', c: SM_LABEL, a: ba * g });
  }
  txt('step k · 步数', BR.x0 + 9 * BR.dx - 20, BR.base + 32, { size: 20, fam: F.zh, w: 700, c: SM_LABEL, a: ba });
  /* never zero at a finite step (literature) */
  const qn = Q(S, 0, 'it never reaches zero', 0.6) * fade * dim;
  if (qn > 0) {
    const xl = BR.x0 + 8 * BR.dx + BR.w / 2, yl = BR.base - SM.gap[8] * BR.sc;
    ring(xl, yl - 2, 22, C.argued, qn, 2.5);
    line(xl - 14, yl - 22, 860, 610, C.argued, 0.7 * qn, 1.5);
    smPlate('never 0 at a finite step', 860, 600, C.argued, qn, 'right', 24, F.disp);
    smPlate('literature · 文献结果，未形式化', 860, 568, C.argued, qn, 'right', 20, F.zh);
  }
  /* polygons inside a circle: 6, 12, 24 sides */
  const qp = Q(S, 1, 'Like polygons', 0.6) * fade * dim;
  if (qp > 0) {
    const steps = [Q(S, 1, 'Like polygons', 0.6), Q(S, 1, 'closer with every side', 0.6), Q(S, 1, 'every side', 0.6, 1.0)];
    const curN = steps[2] > 0 ? 2 : steps[1] > 0 ? 1 : 0;
    const qcir = Q(S, 1, 'never the circle itself', 0.6);
    ctx.save(); ctx.setLineDash([7, 7]); ring(PG.cx, PG.cy, PG.R, C.white, (0.45 + 0.45 * qcir) * qp, 2.5); ctx.restore();
    SM.sides.forEach((n, i) => smPolygon(n, i === curN ? C.now : C.cyan, qp * steps[i] * (i === curN ? 1 : 0.45), i === curN ? 3.5 : 2));
    txt('perimeter ÷ diameter · 周长 ÷ 直径', PG.cx, PG.cy + PG.R + 56, { size: 22, fam: F.zh, w: 700, align: 'center', c: SM_LABEL, a: qp });
    SM.sides.forEach((n, i) => {
      const y = PG.cy + PG.R + 98 + i * 40, col = i === curN ? C.now : C.cyan;
      txt(`${n} sides`, PG.cx - 30, y, { size: 26, fam: F.mono, w: 700, align: 'right', c: col, a: qp * steps[i] });
      txt(smRatio(SM.ratio[i]), PG.cx + 10, y, { size: 26, fam: F.mono, w: 700, c: col, a: qp * steps[i] });
    });
    txt('circle', PG.cx - 30, PG.cy + PG.R + 98 + 3 * 40, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.white, a: qp * qcir });
    txt(`π = ${Math.PI.toFixed(5)}…`, PG.cx + 10, PG.cy + PG.R + 98 + 3 * 40, { size: 26, fam: SM_MATH, w: 700, c: C.white, a: qp * qcir });
  }
  /* the book's reading */
  const qa = last * fade;
  if (qa > 0) {
    const x = 440, y = 340, w = 1040;
    panel(x, y, w, 270, qa, C.argued, "THE BOOK'S READING · 本书的诠释");
    txt('实际上球永远只是近似，', x + w / 2, y + 92, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.white, a: qa });
    txt('我们以为我们得到了一个球，但实际只是近似得到一个球。', x + w / 2, y + 140, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.white, a: qa });
    txt('In truth, every sphere is only an approximation: we think we have obtained', x + w / 2, y + 196, { size: 24, fam: F.disp, w: 600, align: 'center', c: C.argued, a: qa });
    txt('a sphere, when all we ever hold is an approximate sphere.', x + w / 2, y + 230, { size: 24, fam: F.disp, w: 600, align: 'center', c: C.argued, a: qa });
  }
};

/* ======================================================================= */
/*  PSI · at the crossing the reading is the angle: ψ = ψ(ψ)                 */
/* ======================================================================= */
/* θ* = cos(θ*) and ψ = ψ(ψ), piece by piece, so one can turn into the other */
const SM_FROM = ['θ*', ' = ', 'cos', '(', 'θ*', ')'], SM_TO = ['ψ', ' = ', 'ψ', '(', 'ψ', ')'];
function smFormula(parts, x, y, size, align = 'left') {
  const ws = parts.map(p => tw(p, size, SM_MATH, 700)), total = ws.reduce((s, v) => s + v, 0);
  let cx = align === 'center' ? x - total / 2 : x;
  return parts.map((p, i) => { const o = { x: cx + ws[i] / 2, y, size }; cx += ws[i]; return o; });
}
SCENES.psi = S => {
  const u = S.u, fade = clamp(u / 0.4) * clamp((S.d - u) / 0.5);
  smSeries();
  badgeQ(S, [[0, null, 'computed'], [2, null, 'argued']]);
  const m = Q(S, 2, 'psi equals psi of psi', 1.6), back = 1 - 0.84 * ease(m);
  const P = smPlot(0), ga = clamp(u / 0.6) * fade * back;
  smAxes(P, ga);
  smCurves(P, ga);
  smCob(P, 12, 0.3 * ga, { w: 2.5 });
  const c = SM.star, cx = P.X(c), cy = P.Y(c);
  /* line 0: the angle on the θ-axis and the reading on the y-axis are the same number */
  const q0 = Q(S, 0, 'the reading and the angle', 0.6) * ga;
  if (q0 > 0) {
    smDash(cx, cy, cx, P.B, C.white, 0.7 * q0, 2);
    smDash(cx, cy, P.R.L, cy, C.cyan, 0.8 * q0, 2);
    line(P.R.L, P.B, cx, P.B, C.now, q0, 6);
    line(P.R.L, P.B, P.R.L, cy, C.cyan, q0, 6);
    smPlate(`angle ${smF3(c)}`, (P.R.L + cx) / 2, P.B - 18, C.now, q0, 'center', 26);
    smPlate(`reading ${smF3(Math.cos(c))}`, P.R.L + 16, cy - 16, C.cyan, q0, 'left', 26);
  }
  for (let i = 0; i < 3; i++) ring(cx, cy, 14 + 12 * i + 6 * Math.sin(u * 2.4 - i), C.now, ga * (0.55 - 0.15 * i), 3);
  smDot(cx, cy, 12, C.now, ga);
  /* line 1: the dial at θ*: the opening (the arc, unrolled) beside the reading (the shadow) */
  const q1 = Q(S, 1, 'The ruler measures', 0.7) * fade * back;
  const un = Q(S, 1, 'its own opening', 1.6, 0.3);
  if (q1 > 0) {
    const { cx: dx, cy: dy, R } = DL;
    smDial({ th: c, a: q1, shadow: 1, unroll: un });
    smTag('ruler', dx + R + 46, dy + 8, SM_LABEL, q1, 'left', 22, F.disp);
    smTag('opening θ*', dx + (R + 18) * Math.cos(c / 2) + 6, dy - (R + 18) * Math.sin(c / 2), C.now, q1 * (1 - un), 'left', 26);
    const qe = Q(S, 1, 'the answer is itself', 0.6) * q1;
    smTag('reading', dx - 18, dy + 8, C.cyan, q1, 'right', 24);
    smTag('opening', dx - 18, dy + 40, C.now, q1 * un, 'right', 24);
    const xe = dx + R * c;
    smDash(xe, dy - 22, xe, dy + 52, C.white, 0.8 * qe, 2);
    smPlate(`both ${smF3(c)}`, xe + 18, dy + 88, C.white, qe, 'left', 28);
  }
  /* the label at the crossing, then ψ = ψ(ψ) */
  const ql = Q(S, 0, 'the same number', 0.6) * fade;
  if (ql > 0) {
    const from = smFormula(SM_FROM, P.X(0.86) - 30, P.Y(0.25), 40), to = smFormula(SM_TO, W / 2, 500, 150, 'center');
    const k = ease(m);
    if (k < 1) line(cx + 10, cy + 12, from[0].x - 10, from[0].y - 32, C.white, 0.6 * ql * (1 - k), 1.5);
    SM_FROM.forEach((p, i) => {
      const x = lerp(from[i].x, to[i].x, k), y = lerp(from[i].y, to[i].y, k), size = lerp(40, 150, k);
      const col = p === 'cos' ? C.cyan : p === 'θ*' ? C.now : C.white;
      txt(p, x, y, { size, fam: SM_MATH, w: 700, align: 'center', c: col, a: ql * (1 - clamp(k * 1.6)) });
      txt(SM_TO[i], x, y, { size, fam: SM_MATH, w: 700, align: 'center', c: C.white, a: ql * clamp(k * 1.6 - 0.6), ab: k > 0.9 ? 3 : 0 });
    });
  }
  const qc = Q(S, 2, 'psi equals psi of psi', 0.6, 1.4) * fade;
  txt("θ* = cos(θ*) in the book's notation for self-reference", W / 2, 600, { size: 24, fam: SM_MATH, w: 700, align: 'center', c: C.argued, a: qc });
  txt('本书表示自指的记号：算子与状态合一', W / 2, 644, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.argued, a: qc });
};

/* ======================================================================= */
/*  RECAP · three takeaways, the next step, the closing card                 */
/* ======================================================================= */
const SM_RECAP = [
  ['Feed each reading back in as the next angle.', '把每次读数当作下一次的角。', null],
  [`cos θ = θ has exactly one positive solution, θ* ≈ ${smF3(SM.star)}.`, `cos θ = θ 恰有一个正解 θ* ≈ ${smF3(SM.star)}。`, 'lean'],
  ['Finite steps come close but never land: the sphere is always approximate.', '有限步只能逼近、不会落上：球永远只是近似。', 'argued']
];
/* closingCard upper-cases the English title, which would turn ψ into Ψ: it gets the words, the Chinese title keeps ψ */
function smClosing(S, from) {
  const f = DATA.film, title = f.title;
  f.title = title.split(':')[0];
  try { closingCard(S, { from, y: 300, hyper: false }); } finally { f.title = title; }
}
SCENES.recap = S => {
  const u = S.u, fade = clamp(u / 0.4);
  smSeries();
  const out = 1 - Q(S, 3, 'The prelude ends here', 0.8);
  txt('RECAP · 小结', 300, 236, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: fade * out, ls: 4 });
  SM_RECAP.forEach(([en, zh, kind], i) => {
    const a = at(S, i, 0.7) * fade * out, y = 330 + i * 150;
    if (a <= 0) return;
    ring(326, y - 12, 26, C.cyan, a, 2.5);
    txt(String(i + 1), 326, y - 1, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a });
    txt(en, 380, y, { size: 36, fam: F.disp, w: 700, c: C.white, a });
    txt(zh, 380, y + 50, { size: 30, fam: F.zh, w: 700, c: SM_LABEL, a });
    /* the footing of each takeaway: the Lean theorem gives 0 < θ* < 1 and uniqueness; the decimal is computed here */
    const tags = kind === 'lean' ? [['LEAN ✓', C.lean], [`NUM · ${smF3(SM.star)}`, C.cyan]] : kind === 'argued' ? [['LITERATURE · ARGUED', C.argued]] : [];
    let xr = 1640;
    tags.forEach(([head, col]) => {
      const wt = tw(head, 18, F.mono, 700, 2) + 28, x = xr - wt;
      fillBox(x, y + 26, wt, 32, col, 0.9 * a);
      txt(head, x + 14, y + 49, { size: 18, fam: F.mono, w: 700, c: C.bg, a, ls: 2 });
      xr = x - 14;
    });
  });
  /* the next step: chapter 1 begins with two arrows */
  const qn = smBump(Q(S, 3, 'The prelude ends here', 0.6, 0.9), clamp((u - lineAt(S, 3).e + 0.2) / 0.5)) * fade;
  if (qn > 0) {
    const x0 = 860, y0 = 560, r = 190, b = 38 * SM_DEG;
    smVec(x0, y0, x0 + r, y0, C.white, qn, 4);
    smVec(x0, y0, x0 + r * Math.cos(b), y0 - r * Math.sin(b), C.now, qn, 4);
    smDot(x0, y0, 7, C.white, qn);
    txt('NEXT · CHAPTER 1 · 第一章', W / 2, 400, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: qn, ls: 2 });
    txt('two arrows, measured against each other · 两支箭头，彼此丈量', W / 2, 660, { size: 26, fam: F.zh, w: 700, align: 'center', c: SM_LABEL, a: qn });
  }
  smClosing(S, lineAt(S, 3).e + 0.4);
};

/* ======================================================================= */
/*                      checks of everything drawn                          */
/* ======================================================================= */
FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const check = (ok, msg) => { if (!ok && bad++ < 12) E.push('prelude-self-measure: ' + msg); };
  /* the one Lean citation: the theorem behind the CROSS panel and the recap's LEAN tag */
  const lean = DATA.lean || [];
  check(lean.length === 1 && lean[0].gid === SM_GID && lean[0].kind === 'theorem', `film.json "lean" must be exactly [${SM_GID}] (a theorem)`);
  check(!!leanCite(SM_GID), 'the Lean citation is missing from DATA.lean');
  check(DATA.film.title.split(':').slice(1).join(':').trim() === 'ψ = ψ(ψ)', 'the English title does not end in ": ψ = ψ(ψ)"');
  /* cos by its Taylor series (|x| ≤ 1.1 here), independent of Math.cos */
  const cosT = x => { let s = 0, t = 1; for (let k = 0; k < 30; k++) { s += t; t *= -x * x / ((2 * k + 1) * (2 * k + 2)); } return s; };
  const near = (x, y, tol = 1e-12) => Math.abs(x - y) < tol;
  let t = 1;
  for (let k = 0; k <= 12; k++) { check(near(SM.th[k], t), `θ${k} differs from the Taylor-series iterate`); t = cosT(t); }
  /* the table: θ₁ … θ₆ as printed, and cos 1 on the dial */
  const table = ['0.540', '0.858', '0.654', '0.793', '0.701', '0.764'];
  table.forEach((s, i) => check(smF3(cosT(SM.th[i])) === s && smF3(SM.th[i + 1]) === s, `θ${i + 1} does not print ${s}`));
  check(smF3(cosT(1)) === '0.540', 'cos 1 does not print 0.540');
  check((180 / Math.PI).toFixed(1) === '57.3', '1 rad does not print 57.3°');
  /* θ*: Newton's method against bisection of cos t − t on [0, 1] */
  let lo = 0, hi = 1;
  check(cosT(lo) - lo > 0 && cosT(hi) - hi < 0, 'cos t − t does not change sign on [0, 1]');
  for (let i = 0; i < 80; i++) { const mid = (lo + hi) / 2; if (cosT(mid) - mid > 0) lo = mid; else hi = mid; }
  check(near(SM.star, (lo + hi) / 2, 1e-12), 'Newton and bisection disagree on θ*');
  check(Math.abs(Math.cos(SM.star) - SM.star) < 1e-12 && 0 < SM.star && SM.star < 1, '|cos θ* − θ*| ≥ 1e−12, or θ* is not in (0, 1)');
  check(SM.star.toFixed(10) === '0.7390851332' && smF3(SM.star) === '0.739', 'θ* does not print 0.7390851332 / 0.739');
  /* a sampled picture of the Lean statement (not a proof): cos t − t > 0 below θ*, < 0 above, on (0, 6] */
  for (let i = 1; i <= 600; i++) {
    const x = i / 100, f = Math.cos(x) - x;
    if (Math.abs(x - SM.star) > 1e-3) check(Math.sign(f) === Math.sign(SM.star - x), `cos t − t has the wrong sign at t = ${x}`);
  }
  /* the iterates swing above and below θ* and close in */
  for (let k = 0; k < 10; k++) {
    check(Math.sign(SM.th[k] - SM.star) === (k % 2 ? -1 : 1), `θ${k} is on the wrong side of θ*`);
    check(Math.abs(SM.th[k + 1] - SM.star) < Math.abs(SM.th[k] - SM.star), `θ${k + 1} is not closer to θ* than θ${k}`);
  }
  /* NEVER: the gaps |cos θₖ − θₖ| = |θₖ₊₁ − θₖ|, as printed, shrinking, never zero */
  const gaps = ['0.460', '0.317', '0.203', '0.139', '0.092', '0.063', '0.042', '0.028', '0.019'];
  gaps.forEach((s, k) => {
    check(smF3(Math.abs(cosT(SM.th[k]) - SM.th[k])) === s && smF3(SM.gap[k]) === s, `the gap at k = ${k} does not print ${s}`);
    check(near(SM.gap[k], Math.abs(SM.th[k + 1] - SM.th[k])), `the gap at k = ${k} is not |θₖ₊₁ − θₖ|`);
    check(SM.gap[k] > 0 && (k === 0 || SM.gap[k] < SM.gap[k - 1]), `the gap at k = ${k} is not positive and shrinking`);
  });
  /* NEVER: the polygons by Liu Hui's doubling of the hexagon (unit radius: side 1), against n sin(π/n) */
  let side = 1, n = 6;
  const printed = ['3', '3.106', '3.133'];
  for (let i = 0; i < 3; i++) {
    const r = n * side / 2;
    check(near(r, SM.ratio[i], 1e-12) && SM.sides[i] === n, `the ${n}-gon ratio differs from Liu Hui's`);
    check(smRatio(SM.ratio[i]) === printed[i], `the ${n}-gon ratio does not print ${printed[i]}`);
    check(r < Math.PI && (i === 0 || r > SM.ratio[i - 1]), `the ${n}-gon ratio is not below π and growing`);
    side = Math.sqrt(2 - Math.sqrt(4 - side * side)); n *= 2;
  }
  check(Math.PI.toFixed(5) === '3.14159', 'π does not print 3.14159');
  /* PSI: on the dial the arc of length θ* and the shadow cos θ* have the same length */
  check(near(DL.R * SM.star, DL.R * Math.cos(SM.star), 1e-9), 'the unrolled arc and the shadow differ at θ*');
  check(SM.alt.every(seq => Math.abs(seq[10] - SM.star) < 1e-2), 'the other starts of CROSS do not come close to θ*');
  /* the plot: the crossing lies on both curves, and the zoomed window keeps it in the middle */
  [0, 0.5, 1].forEach(z => {
    const P = smPlot(z);
    check(near(P.Y(Math.cos(SM.star)), P.Y(SM.star), 1e-6), 'the crossing is not on both curves');
    check(P.x0 <= SM.star && SM.star <= P.x1, 'θ* leaves the plot window');
  });
});
Object.assign(FILM.speed, { tower: 0.008, rule: 0.01, cobweb: 0.012, cross: 0.012, never: 0.014, psi: 0.016, recap: 0.02 });

/* ---------- poster: the cobweb winding into the crossing, and the title ---------- */
FILM.poster = () => {
  const t = 60;
  background(t, TL.scenes[2], 2, 4);
  const P = smPlot(0, { L: 170, B: 860, S: 640 });
  smAxes(P, 1, 22);
  smCurves(P, 1);
  smCurveLabels(P, 1);
  smCob(P, 12, 1, { w: 3.6 });
  const cx = P.X(SM.star), cy = P.Y(SM.star);
  for (let i = 0; i < 3; i++) ring(cx, cy, 16 + 12 * i, C.now, 0.6 - 0.15 * i, 3);
  smDot(cx, cy, 12, C.now, 1);
  smDot(P.X(1), P.B, 10, C.now, 1);
  smTag('θ₀ = 1', P.X(1) + 16, P.B - 16, C.now, 1, 'left', 26);
  const tx = 1370;
  txt('尺子量自己', tx, 330, { size: 116, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('ψ = ψ(ψ)', tx, 490, { size: 124, fam: SM_MATH, w: 700, align: 'center', c: C.white, ab: 3 });
  bloom(0.55);
  txt('THE RULER MEASURES ITSELF', tx, 600, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, ls: 5, ab: 2 });
  txt(`cos θ* = θ* ≈ ${smF3(SM.star)}`, tx, 672, { size: 40, fam: SM_MATH, w: 700, align: 'center', c: C.cyan });
  txt(`PRELUDE · 5/5 · ${DATA.book.code} · FILM`, tx, 780, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 6 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, tx, 830, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * FPS), 2, TL.scenes[2]);
  post(3);
};
