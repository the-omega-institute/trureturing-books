/* Film · The Normal Comes From Outside: A Sphere Beyond the Sphere · 法线从外面来：球外之球
   (book quantum-geometry, the prelude, §0.4 “球外之球”; the prelude series, film 4 of 5). Scenes for theme/film/engine.js.

   One question carries the film, asked aloud in SHEET and answered in NORMAL and RECAP: living inside a flat sheet,
   can you point to the sheet's own “up”? Every picture is an orthographic view of ℝ³ (x right, z up; the camera turns
   by `az` about z and looks down by `el`), drawn with the shared 2D primitives; the sphere is a wireframe of the unit
   sphere. The colours follow the prelude's figures prelude-normal and prelude-average and the lab cards `normal` and
   `average` of viz/prelude-dimensions: cyan the arrows and circles that stay inside, magenta the oriented area
   e₁∧e₂, violet the normal, the axes and the volume, amber only the current arrow or point, green only the cited
   Lean theorem.

   What each scene shows, and on what footing:
     SHEET    the magenta patch e₁∧e₂ (loop Î) seen face-on; an amber arrow sweeps once round and leaves cyan arrows
              a e₁ + b e₂, none with an e₃ component; the question “the sheet's own up = ?” ......... picture, no claim
     NORMAL   the camera tilts, the patch sits in a room; the violet e₃ rises from the centre, at right angles to the
              cyan e₁ and e₂: e₁ = (1,0,0), e₂ = (0,1,0), e₃ = e₁ × e₂ = (0,0,1) = ⋆₃(e₁∧e₂), e₃·e₁ = e₃·e₂ = 0
              ........................................................................................ computed (NUM)
     BEYOND   the whole room: I₃ = e₁∧e₂∧e₃ and ⋆₃I₃ = det[e₁ e₂ e₃] = 1, a number, not a fourth arrow; one dimension
              down, the cyan unit circle in a plane becomes the equator of the unit sphere once the violet ±e₃ is
              added; the amber point climbs a meridian to height 3/5, where the slice is a circle of radius 4/5 and
              (3/5)² + (4/5)² = 1: the radius stays 1 ............................................. computed (NUM)
     BLIND    one axis o = +e₃; a direction at angle θ to o reads cos θ (its height along o): 0° → 1, 60° → ½,
              90° → 0 (the whole equator), 180° → −1 ................................................ computed (NUM)
     AVERAGE  six cyan directions ±x, ±y, ±z; the weights spread from all on +z to 1/6 each and the amber mean
              (0, 0, 1 − w) falls to the centre; with ρ = ½[[1+z, x−iy], [x+iy, 1−z]] (the inverse of the Lean
              `bloch`, checked below) the centre arrow 0 gives ρ = ½I; two directions 60° apart mixed half and half
              give an arrow of length cos 30° = √3/2 ≈ 0.866 < 1 ................................... computed (NUM);
              ‖bloch M‖ ≤ Re tr M for every positive semidefinite 2 × 2 complex M, so a state (tr ρ = 1) has an
              arrow of length at most 1 ..... ActualPureQubitGeometry.norm_bloch_le_trace_of_posSemidef (LEAN, once)
     RECAP    three takeaways; “the echo of Gödel” is the book's analogy, its exact theorems in chapter 21 (ARGUED);
              the next film of the series; the closing card
   The film cites exactly one Lean declaration (film.json "lean") and claims nothing beyond its statement. On load,
   FILM.init recomputes every number printed on screen by an independent route and checks the projections drawn;
   any disagreement is pushed to window.FILM_ERRORS, which stops the render. Every frame is a pure function of the
   scene time. */
'use strict';

const NE_DEG = Math.PI / 180;
const NE_GID = 'D5/S3/Quantum/Information/ActualPureQubitGeometry.norm_bloch_le_trace_of_posSemidef';
const NE = {
  face: { cx: 760, cy: 500, R: 290, az: 0, el: 90 * NE_DEG },             // SHEET: the patch seen face-on
  room: { cx: 760, cy: 562, R: 228, az: 32 * NE_DEG, el: 22 * NE_DEG },   // NORMAL, BEYOND (the room)
  ball: { cx: 760, cy: 505, R: 250, az: 32 * NE_DEG, el: 20 * NE_DEG },   // BEYOND (the sphere), BLIND, AVERAGE
  patch: 0.82,                                       // the patch is the square [−0.82, 0.82]² in the plane z = 0
  box: { lo: [-1, -1, -0.35], hi: [1, 1, 1.15] },    // the room around it
  merid: -18 * NE_DEG,                               // azimuth of the meridian the amber point uses (near, right)
  lift: [3, 4, 5],                                   // BEYOND: height 3/5, slice radius 4/5, distance 5/5
  px: 1230, pw: 560                                  // the panel column
};
/* SHEET: the arrows the amber arrow leaves behind, [angle in the sheet (deg), length]; the first two are e₁ and e₂ */
const NE_ARROWS = [[0, 0.78], [90, 0.78], [38, 0.7], [140, 0.72], [205, 0.74], [258, 0.66], [318, 0.72]];
const NE_SWEEP = [-25, 380];                        // the amber arrow's one slow turn: from −25° on, by 380°
const NE_WIRE = mix(C.dim, C.white, 0.3);
const NE_LABEL = mix(C.dim, C.white, 0.45);
const NE_MATH = F.math;

/* ---------- exact numbers shown on screen ---------- */
/* the readings of BLIND: angle to o (deg) → cos as printed */
const NE_READ = [[0, '1', 'north · 北极'], [60, '½', ''], [90, '0', 'equator · 赤道'], [180, '−1', 'south · 南极']];
/* AVERAGE: the six directions and their weights, spreading from all on +z (w = 0) to 1/6 each (w = 1) */
const NE_AXES = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
const NE_AXNAME = ['+x', '−x', '+y', '−y', '+z', '−z'];
const neWeights = w => NE_AXES.map(d => w / 6 + (d[2] === 1 ? 1 - w : 0));
const neMean = w => { const ws = neWeights(w); return NE_AXES.reduce((m, d, i) => [m[0] + ws[i] * d[0], m[1] + ws[i] * d[1], m[2] + ws[i] * d[2]], [0, 0, 0]); };
/* AVERAGE: two directions 60° apart on the meridian, mixed half and half */
const NE_A = [0, 0, 1];
const NE_B = [Math.sin(60 * NE_DEG) * Math.cos(NE.merid), Math.sin(60 * NE_DEG) * Math.sin(NE.merid), Math.cos(60 * NE_DEG)];
const NE_AB = [0, 1, 2].map(i => (NE_A[i] + NE_B[i]) / 2);
/* a signed decimal with a true minus sign */
function neFmt(v, n = 2) { const s = Math.abs(v).toFixed(n); return (v < 0 && Number(s) !== 0 ? '−' : '') + s; }
/* the Lean definitions, written out: bloch M = (2 Re M₀₁, −2 Im M₀₁, Re M₀₀ − Re M₁₁) and its inverse
   blochMatrix a r = ½[[a + r₂, r₀ − i r₁], [r₀ + i r₁, a − r₂]]; complex entries as [re, im] */
const neBloch = M => [2 * M[0][1][0], -2 * M[0][1][1], M[0][0][0] - M[1][1][0]];
const neBlochMatrix = (a, r) => [[[(a + r[2]) / 2, 0], [r[0] / 2, -r[1] / 2]], [[r[0] / 2, r[1] / 2], [(a - r[2]) / 2, 0]]];

/* ---------- the view: an orthographic camera on ℝ³ ---------- */
/* screen position and depth (> 0 towards the viewer) of p in the view v = { cx, cy, R, az, el } */
function neP(v, p) {
  const ca = Math.cos(v.az), sa = Math.sin(v.az), ce = Math.cos(v.el), se = Math.sin(v.el);
  const x1 = p[0] * ca + p[1] * sa, y1 = -p[0] * sa + p[1] * ca;
  return { x: v.cx + v.R * x1, y: v.cy - v.R * (p[2] * ce + y1 * se), d: p[2] * se - y1 * ce };
}
const neView = (a, b, k) => ({ cx: lerp(a.cx, b.cx, k), cy: lerp(a.cy, b.cy, k), R: lerp(a.R, b.R, k), az: lerp(a.az, b.az, k), el: lerp(a.el, b.el, k) });
/* points of the circle c + r (cos t n1 + sin t n2), t from t0 to t1 (radians) */
function neCircle(c, n1, n2, r, t0 = 0, t1 = TAU, N = 96) {
  const pts = [];
  for (let i = 0; i <= N; i++) {
    const t = t0 + (t1 - t0) * i / N, a = r * Math.cos(t), b = r * Math.sin(t);
    pts.push([c[0] + a * n1[0] + b * n2[0], c[1] + a * n1[1] + b * n2[1], c[2] + a * n1[2] + b * n2[2]]);
  }
  return pts;
}

/* ---------- drawing helpers ---------- */
/* an arrow whose head scales with its length */
function neVec(x1, y1, x2, y2, col, a, w = 4, hmax = 18) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
  if (a <= 0.003 || L < 1) return;
  const h = Math.min(hmax, L * 0.45), ux = dx / L, uy = dy / L, bx = x2 - ux * h, by = y2 - uy * h;
  line(x1, y1, bx, by, col, a, w);
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath();
  ctx.moveTo(x2, y2); ctx.lineTo(bx - uy * h * 0.55, by + ux * h * 0.55); ctx.lineTo(bx + uy * h * 0.55, by - ux * h * 0.55);
  ctx.closePath(); ctx.fill(); ctx.restore();
}
function neArrow(v, p0, p1, col, a, w = 4, hmax = 18) { const A = neP(v, p0), B = neP(v, p1); neVec(A.x, A.y, B.x, B.y, col, a, w, hmax); }
/* a point: soft glow, solid fill, white core */
function neDot(x, y, r, col, a) {
  if (a <= 0.003) return;
  ctx.save();
  ctx.globalAlpha = a * 0.22; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, TAU); ctx.fill();
  ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  ctx.strokeStyle = C.bg; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(x, y, r * 0.36, 0, TAU); ctx.fill();
  ctx.restore();
}
function neDot3(v, p, r, col, a) { const q = neP(v, p); neDot(q.x, q.y, r, col, a); }
/* a polyline in 3D; with o.depth the far half (depth < 0) is dashed and fainter (curves on the unit sphere) */
function nePath(v, pts, col, a, w = 2, o = {}) {
  if (a <= 0.003 || pts.length < 2) return;
  const P = pts.map(p => neP(v, p));
  for (const near of o.depth ? [false, true] : [true]) {
    ctx.save();
    ctx.globalAlpha = a * (near ? 1 : (o.far == null ? 0.35 : o.far));
    ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (!near || o.dash) ctx.setLineDash(o.dash || [7, 8]);
    ctx.beginPath();
    let pen = false;
    for (let i = 0; i < P.length - 1; i++) {
      const isNear = !o.depth || P[i].d + P[i + 1].d >= 0;
      if (isNear !== near) { pen = false; continue; }
      if (!pen) { ctx.moveTo(P[i].x, P[i].y); pen = true; }
      ctx.lineTo(P[i + 1].x, P[i + 1].y);
    }
    ctx.stroke(); ctx.restore();
  }
}
/* a filled and stroked polygon in 3D */
function nePoly(v, pts, fill, fa, stroke, sa, w = 2) {
  if (fa <= 0.003 && sa <= 0.003) return;
  const P = pts.map(p => neP(v, p));
  ctx.save(); ctx.beginPath();
  P.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
  ctx.closePath();
  if (fa > 0.003) { ctx.globalAlpha = fa; ctx.fillStyle = fill; ctx.fill(); }
  if (sa > 0.003) { ctx.globalAlpha = sa; ctx.strokeStyle = stroke; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.stroke(); }
  ctx.restore();
}
function neTag(s, x, y, col, a, align = 'left', size = 24, fam = NE_MATH) {
  txt(s, x, y, { size, fam, w: 700, c: col, a, align, ls: fam === F.mono ? 2 : 0 });
}
/* a label next to the projection of p */
function neTag3(v, p, s, col, a, dx = 12, dy = 8, align = 'left', size = 24, fam = NE_MATH) {
  if (a <= 0.003) return;
  const q = neP(v, p); neTag(s, q.x + dx, q.y + dy, col, a, align, size, fam);
}
/* an English line and its Chinese line under it */
function neTwo(en, zh, x, y, col, a, size = 22, align = 'left') {
  txt(en, x, y, { size, fam: F.disp, w: 600, c: col, a, align });
  txt(zh, x, y + size * 1.45, { size: size + 2, fam: F.zh, w: 700, c: col, a: a * 0.92, align });
}
/* a panel whose title has an English part (mono) and a Chinese part (the self-hosted CJK face) */
function nePanel(x, y, w, h, a, col, en, zh) {
  if (a <= 0.003) return;
  panel(x, y, w, h, a, col, en + ' ·');
  txt(zh, x + 16 + tw(en + ' · ', 15, F.mono, 700, 2), y + 23, { size: 17, fam: F.zh, w: 700, c: col, a, ls: 1 });
}
/* the series marker under the HUD, top left */
function neSeries(S) {
  const a = 0.85 * clamp(S.u / 0.6) * clamp((S.d - S.u) / 0.5);
  if (a <= 0.003) return;
  const col = mix(C.cyan, C.dim, 0.45), head = 'PRELUDE · 4/5 · ';
  txt(head, 60, 134, { size: 16, fam: F.mono, w: 700, c: col, a, ls: 2 });
  txt('序曲', 60 + tw(head, 16, F.mono, 700, 2), 135, { size: 17, fam: F.zh, w: 700, c: col, a, ls: 1 });
}

/* ---------- the objects ---------- */
/* the oriented patch e₁∧e₂ with its orientation loop Î (counterclockwise from e₁ towards e₂) */
function nePatch(v, a, o = {}) {
  if (a <= 0.003) return;
  const s = NE.patch;
  nePoly(v, [[-s, -s, 0], [s, -s, 0], [s, s, 0], [-s, s, 0]], C.mag, 0.13 * a, C.mag, 0.9 * a, 2.6);
  const la = a * (o.label == null ? 1 : o.label);
  const loop = neCircle([-0.5, -0.5, 0], [1, 0, 0], [0, 1, 0], 0.13, 200 * NE_DEG, 470 * NE_DEG, 30);
  nePath(v, loop.slice(0, -3), C.mag, la, 2.4);
  const p = neP(v, loop[loop.length - 4]), q = neP(v, loop[loop.length - 1]);
  neVec(p.x, p.y, q.x, q.y, C.mag, la, 2.4, 11);
  neTag3(v, [-0.3, -0.56, 0], 'Î', C.mag, la, 0, 8, 'left', 26);
  neTag3(v, [s, -s, 0], 'e₁∧e₂', C.mag, la, 0, 40, 'right', 30);
}
/* the room: twelve edges of the box, optionally its faces filled */
function neBox(v, b, col, a, w = 1.6, fill = 0) {
  if (a <= 0.003) return;
  const X = [b.lo[0], b.hi[0]], Y = [b.lo[1], b.hi[1]], Z = [b.lo[2], b.hi[2]];
  const P = (i, j, k) => [X[i], Y[j], Z[k]];
  if (fill > 0) {
    const faces = [[P(0, 0, 0), P(1, 0, 0), P(1, 1, 0), P(0, 1, 0)], [P(0, 0, 1), P(1, 0, 1), P(1, 1, 1), P(0, 1, 1)],
      [P(0, 0, 0), P(1, 0, 0), P(1, 0, 1), P(0, 0, 1)], [P(0, 1, 0), P(1, 1, 0), P(1, 1, 1), P(0, 1, 1)],
      [P(0, 0, 0), P(0, 1, 0), P(0, 1, 1), P(0, 0, 1)], [P(1, 0, 0), P(1, 1, 0), P(1, 1, 1), P(1, 0, 1)]];
    for (const f of faces) nePoly(v, f, col, fill * a, col, 0, 0);
  }
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
    nePath(v, [P(i, j, 0), P(i, j, 1)], col, a, w);
    nePath(v, [P(0, i, j), P(1, i, j)], col, a, w);
    nePath(v, [P(i, 0, j), P(i, 1, j)], col, a, w);
  }
}
/* the unit sphere as a wireframe: silhouette, three meridians, two latitudes (±60°, clear of BEYOND's slice at 3/5) */
function neSphere(v, a) {
  if (a <= 0.003) return;
  ring(v.cx, v.cy, v.R, NE_WIRE, a * 0.6, 2);
  for (const m of [0, 60, 120]) {
    const t = m * NE_DEG;
    nePath(v, neCircle([0, 0, 0], [Math.cos(t), Math.sin(t), 0], [0, 0, 1], 1), NE_WIRE, a * 0.42, 1.4, { depth: true });
  }
  for (const lat of [-60, 60]) {
    const t = lat * NE_DEG;
    nePath(v, neCircle([0, 0, Math.sin(t)], [1, 0, 0], [0, 1, 0], Math.cos(t)), NE_WIRE, a * 0.36, 1.3, { depth: true });
  }
}
/* the unit circle in the plane z = 0: the old circle, then the equator */
function neEquator(v, a, w = 3.4, glow = 0) {
  if (a <= 0.003) return;
  const pts = neCircle([0, 0, 0], [1, 0, 0], [0, 1, 0], 1);
  if (glow > 0) nePath(v, pts, C.cyan, a * 0.3 * glow, 16, { depth: true, far: 0.5 });
  nePath(v, pts, C.cyan, a, w, { depth: true, far: 0.5 });
}
/* the axis through the poles ±e₃, with the two poles */
function neAxis(v, a, len = 1.18, poles = 1) {
  if (a <= 0.003) return;
  nePath(v, [[0, 0, -len], [0, 0, len]], C.vio, a, 2.6);
  neDot3(v, [0, 0, 1], 8, C.vio, a * poles);
  neDot3(v, [0, 0, -1], 8, C.vio, a * poles);
}
/* a small right-angle mark at the origin between the unit directions u and w */
function neRight(v, u, w, s, col, a) {
  if (a <= 0.003) return;
  nePath(v, [[s * u[0], s * u[1], s * u[2]], [s * (u[0] + w[0]), s * (u[1] + w[1]), s * (u[2] + w[2])], [s * w[0], s * w[1], s * w[2]]], col, a, 2);
}
/* a point on the meridian NE.merid at angle th from the north pole */
const neMer = th => [Math.sin(th) * Math.cos(NE.merid), Math.sin(th) * Math.sin(NE.merid), Math.cos(th)];
/* a 2 × 2 matrix in brackets; cells[r][c] strings; returns the right edge */
function neMatrix(x, y, cells, cw, rh, size, col, a) {
  if (a <= 0.003) return x;
  const h = rh * 2 + 10, top = y - size * 0.95, w = cw * 2 + 24;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(x + 10, top); ctx.lineTo(x, top); ctx.lineTo(x, top + h); ctx.lineTo(x + 10, top + h);
  ctx.moveTo(x + w - 10, top); ctx.lineTo(x + w, top); ctx.lineTo(x + w, top + h); ctx.lineTo(x + w - 10, top + h);
  ctx.stroke(); ctx.restore();
  cells.forEach((row, r) => row.forEach((s, c) => txt(s, x + 12 + cw * (c + 0.5), y + r * rh, { size, fam: NE_MATH, w: 700, align: 'center', c: col, a })));
  return x + w;
}

/* ======================================================================= */
/*  SHEET · inside a flat sheet, every arrow stays in the sheet              */
/* ======================================================================= */
SCENES.sheet = S => {
  const u = S.u, L0 = lineAt(S, 0);
  /* title card during the lead */
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.5) / 0.7));
  if (ta > 0) {
    const p = clamp(u / 1.4);
    txt(`${DATA.book.code} · FILM`, W / 2, 380, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
    txt(DATA.film.title_zh, W / 2, 500, { size: 88, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 3 });
    const en = DATA.film.title.toUpperCase(), es = Math.min(40, 40 * 1560 / Math.max(1, tw(en, 40, F.orb, 900, 4)));
    txt(scramble(en, p, 11), W / 2, 586, { size: es, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
    txt('PRELUDE · 4/5 · 序曲 · 第四部', W / 2, 660, { size: 24, fam: F.zh, w: 700, align: 'center', c: mix(C.cyan, C.dim, 0.35), a: ta * clamp((u - 0.8) / 0.6) });
  }
  neSeries(S);
  const da = clamp((u - L0.s + 0.2) / 1.0) * clamp((S.d - u) / 0.5);
  if (da <= 0) return;
  const v = NE.face;
  nePatch(v, da, { label: Q(S, 0, 'a flat sheet', 0.8) });
  /* the amber arrow: one slow turn while line 0 is spoken; a cyan arrow stays behind at each direction it passes */
  const s0 = phraseAt(S, 0, 'a flat sheet'), s1 = L0.e + 0.3;
  const ang = NE_SWEEP[0] + NE_SWEEP[1] * ease(clamp((u - s0) / (s1 - s0)));
  NE_ARROWS.forEach(([deg, len], i) => {
    const qa = clamp((ang - deg) / 20) * da;
    if (qa <= 0) return;
    const t = deg * NE_DEG, tip = [len * Math.cos(t), len * Math.sin(t), 0];
    neArrow(v, [0, 0, 0], tip, C.cyan, qa, 3.6, 16);
    if (i < 2) neTag3(v, tip, i ? 'e₂' : 'e₁', C.cyan, qa, i ? 16 : 6, i ? 6 : 36, 'left', 28);
  });
  const am = clamp((u - s0) / 0.4) * (1 - clamp((u - s1) / 0.5)) * da;
  if (am > 0) {
    const t = ang * NE_DEG;
    neArrow(v, [0, 0, 0], [0.62 * Math.cos(t), 0.62 * Math.sin(t), 0], C.now, am, 5, 20);
  }
  neDot3(v, [0, 0, 0], 6, C.white, da);
  /* the right column: what every arrow is, and the question */
  const x = NE.px - 30;
  const qe = Q(S, 0, 'every arrow', 0.6) * da;
  neTag('EVERY ARROW YOU DRAW', x, 300, NE_LABEL, qe, 'left', 18, F.mono);
  txt('a e₁ + b e₂', x, 372, { size: 50, fam: NE_MATH, w: 700, c: C.cyan, a: qe });
  neTwo('stays in the sheet: nothing points off it', '都留在薄片之内，没有一支离开它', x, 430, C.white, Q(S, 0, 'lies in it', 0.6) * da, 22);
  const qq = Q(S, 1, 'the question', 0.6) * da;
  if (qq > 0) {
    nePanel(x - 20, 540, 560, 190, qq, C.white, 'THE QUESTION', '问题');
    txt("the sheet's own up = ?", x + 10, 628, { size: 38, fam: F.disp, w: 700, c: C.white, a: qq });
    txt('薄片自己的“上” = ？', x + 10, 690, { size: 34, fam: F.zh, w: 900, c: C.white, a: qq * Q(S, 1, "sheet's own up", 0.6) });
  }
  /* at the centre: “up” would point straight at us, off the sheet; from inside there is no such arrow */
  const qu = Q(S, 1, "sheet's own up", 0.5) * da;
  if (qu > 0) {
    const c = neP(v, [0, 0, 0]), pulse = (u - phraseAt(S, 1, "sheet's own up")) % 1.6 / 1.6;
    ctx.save(); ctx.setLineDash([6, 7]); ring(c.x, c.y, 46, C.white, qu * 0.85, 2.4); ctx.restore();
    ring(c.x, c.y, 46 + 40 * pulse, C.white, qu * 0.5 * (1 - pulse), 2);
    txt('?', c.x + 62, c.y - 40, { size: 50, fam: F.disp, w: 700, c: C.white, a: qu });
  }
};

/* ======================================================================= */
/*  NORMAL · the sheet in a room: the normal e₃ stands up from outside      */
/* ======================================================================= */
SCENES.normal = S => {
  const u = S.u, fade = clamp(u / 0.4) * clamp((S.d - u) / 0.5);
  neSeries(S);
  badge(Q(S, 1, 'at right angles', 0.5) * fade, 'computed');
  const k = ease(Q(S, 0, 'place the sheet', 2.6));
  const v = neView(NE.face, NE.room, k);
  neBox(v, NE.box, NE_WIRE, Q(S, 0, 'three-dimensional room', 0.9) * fade * 0.75, 1.6);
  nePatch(v, fade, { label: 1 - 0.4 * k });
  /* the other arrows of the sheet, dimmed: they are still in it */
  NE_ARROWS.forEach(([deg, len], i) => {
    const t = deg * NE_DEG, tip = [len * Math.cos(t), len * Math.sin(t), 0];
    neArrow(v, [0, 0, 0], tip, C.cyan, fade * (i < 2 ? 1 : lerp(1, 0.25, k)), i < 2 ? 4 : 3.2, 16);
  });
  neTag3(v, [0.78, 0, 0], 'e₁', C.cyan, fade, 8, 34, 'left', 28);
  neTag3(v, [0, 0.78, 0], 'e₂', C.cyan, fade, 14, 4, 'left', 28);
  /* the normal rises */
  const g = ease(Q(S, 1, 'stands straight up', 1.4));
  if (g > 0.01) neArrow(v, [0, 0, 0], [0, 0, g], C.vio, fade, 5.5, 22);
  const qr = Q(S, 1, 'at right angles', 0.5) * fade;
  neRight(v, [1, 0, 0], [0, 0, 1], 0.2, C.white, qr * 0.85);
  neRight(v, [0, 1, 0], [0, 0, 1], 0.2, C.white, qr * 0.85);
  neTag3(v, [0, 0, 1], 'e₃', C.vio, clamp((g - 0.8) / 0.2) * fade, 16, 10, 'left', 30);
  neDot3(v, [0, 0, 0], 6, C.white, fade);
  const qn = Q(S, 2, 'the normal', 0.6) * fade;
  neTag3(v, [0, 0, 1], 'normal · 法线', C.vio, qn, -18, 10, 'right', 26, F.zh);
  /* the hand computation */
  const pa = Q(S, 1, 'at right angles', 0.6) * fade, x = NE.px, y = 225;
  nePanel(x, y, NE.pw, 280, pa, C.cyan, 'BY HAND', '手算');
  txt('e₁ = (1, 0, 0)', x + 30, y + 86, { size: 32, fam: NE_MATH, w: 700, c: C.cyan, a: pa });
  txt('e₂ = (0, 1, 0)', x + 30, y + 134, { size: 32, fam: NE_MATH, w: 700, c: C.cyan, a: pa });
  txt('e₃ = (0, 0, 1)', x + 30, y + 182, { size: 32, fam: NE_MATH, w: 700, c: C.vio, a: pa });
  txt('e₃·e₁ = 0    e₃·e₂ = 0', x + 30, y + 240, { size: 30, fam: NE_MATH, w: 700, c: C.white, a: pa * Q(S, 1, 'both cyan arrows', 0.6) });
  const pb = qn, y2 = 535;
  nePanel(x, y2, NE.pw, 200, pb, C.vio, 'THE NORMAL', '法线');
  txt('e₃ = ⋆₃(e₁∧e₂)', x + 30, y2 + 92, { size: 40, fam: NE_MATH, w: 700, c: C.vio, a: pb });
  neTwo('names the whole sheet, and comes from outside', '指认整张薄片，而它来自薄片之外', x + 30, y2 + 138, C.white, Q(S, 2, 'comes from outside', 0.6) * fade, 23);
};

/* ======================================================================= */
/*  BEYOND · the whole room has no fourth arrow; one dimension down: circle → equator */
/* ======================================================================= */
SCENES.beyond = S => {
  const u = S.u, fade = clamp(u / 0.4) * clamp((S.d - u) / 0.5);
  neSeries(S);
  badgeQ(S, [[0, null, 'computed']]);
  /* the whole room and its volume I₃ */
  const ia = fade * (1 - Q(S, 1, 'step down one', 0.7));
  if (ia > 0) {
    const v = NE.room, qv = Q(S, 0, 'the whole room', 0.9);
    neBox(v, NE.box, C.vio, ia * (0.4 + 0.5 * qv), 2, 0.07 * qv);
    neArrow(v, [0, 0, 0], [1, 0, 0], C.cyan, ia, 4, 18);
    neArrow(v, [0, 0, 0], [0, 1, 0], C.cyan, ia, 4, 18);
    neArrow(v, [0, 0, 0], [0, 0, 1], C.vio, ia, 5, 20);
    neTag3(v, [1, 0, 0], 'e₁', C.cyan, ia, 8, 34, 'left', 28);
    neTag3(v, [0, 1, 0], 'e₂', C.cyan, ia, 14, 4, 'left', 28);
    neTag3(v, [0, 0, 1], 'e₃', C.vio, ia, 16, 10, 'left', 28);
    neDot3(v, [0, 0, 0], 6, C.white, ia);
    const q4 = Q(S, 0, 'inside it', 0.6) * ia;
    neTag3(v, [-1, -1, 1.15], 'e₄ = ?', NE_LABEL, q4, -20, -10, 'right', 30);
    const x = NE.px, y = 260;
    nePanel(x, y, NE.pw, 300, ia * qv, C.vio, 'THE WHOLE ROOM', '整间房间');
    txt('I₃ = e₁∧e₂∧e₃', x + 30, y + 90, { size: 34, fam: NE_MATH, w: 700, c: C.vio, a: ia * qv });
    txt('⋆₃ I₃ = 1', x + 30, y + 170, { size: 56, fam: NE_MATH, w: 700, c: C.white, a: q4, ab: 1 });
    neTwo('a number, not a fourth arrow', '只是一个数，不是第四根箭头', x + 30, y + 222, C.white, q4, 22);
  }
  /* one dimension down: a circle in a plane, then one new direction */
  const v = NE.ball, ca = Q(S, 1, 'step down one', 0.8, 0.5) * fade;
  if (ca <= 0) return;
  const sa = Q(S, 2, 'Add one new direction', 0.9) * fade, wa = Q(S, 2, 'becomes the', 1.0) * fade;
  const s = 1.2;
  nePoly(v, [[-s, -s, 0], [s, -s, 0], [s, s, 0], [-s, s, 0]], C.cyan, ca * 0.05 * (1 - 0.5 * wa), NE_WIRE, ca * 0.5 * (1 - 0.6 * wa), 1.4);
  neSphere(v, wa);
  /* the new direction grows out of the plane */
  const g = ease(Q(S, 2, 'Add one new direction', 1.4));
  if (sa > 0) {
    nePath(v, [[0, 0, -1.18 * g], [0, 0, 1.18 * g]], C.vio, sa, 2.8);
    neDot3(v, [0, 0, g], 8, C.vio, sa * clamp((g - 0.8) / 0.2));
    neDot3(v, [0, 0, -g], 8, C.vio, sa * clamp((g - 0.8) / 0.2));
    neTag3(v, [0, 0, 1], '+e₃', C.vio, sa * clamp((g - 0.9) / 0.1), 16, -8, 'left', 26);
    neTag3(v, [0, 0, -1], '−e₃', C.vio, sa * clamp((g - 0.9) / 0.1), 16, 22, 'left', 26);
  }
  neEquator(v, ca, 3.6, Q(S, 2, 'its equator', 0.5) * (1 - Q(S, 2, 'its equator', 0.8, 1.2)));
  neTag3(v, [Math.cos(212 * NE_DEG), Math.sin(212 * NE_DEG), 0], 'equator · 赤道', C.cyan, Q(S, 2, 'its equator', 0.6) * fade, -16, 26, 'right', 26, F.zh);
  neTag3(v, [Math.cos(212 * NE_DEG), Math.sin(212 * NE_DEG), 0], 'S¹ ⊂ ℝ²', C.cyan, ca * (1 - Q(S, 2, 'its equator', 0.5)), -16, 26, 'right', 28);
  /* the amber point climbs the meridian to height 3/5 */
  const [h, r, d] = NE.lift, eta = Math.asin(h / d);
  const lift = ease(Q(S, 2, "the sphere's middle belt", 2.2));
  const pa = Q(S, 2, 'and the circle becomes', 0.6) * fade, th = Math.PI / 2 - eta * lift, P = neMer(th);
  const base = neMer(Math.PI / 2);
  if (pa > 0) {
    const arc = []; for (let i = 0; i <= 30; i++) arc.push(neMer(Math.PI / 2 - eta * lift * i / 30));
    nePath(v, arc, C.now, pa * 0.8, 2.4);
    /* L3: the radius stays 1 — the old radius (cyan) and the point's radius (amber) */
    const q1 = Q(S, 3, 'The radius stays one', 0.6) * fade;
    nePath(v, [[0, 0, 0], base], C.cyan, q1, 3);
    nePath(v, [[0, 0, 0], P], C.now, pa * (0.35 + 0.65 * q1), 3);
    neTag3(v, base.map(x => x / 2), '1', C.cyan, q1, 2, 34, 'center', 28);
    neTag3(v, P.map(x => x / 2), '1', C.now, q1, -10, -12, 'right', 28);
    /* the quiet annotation: the slice through the point is a circle of radius 4/5 at height 3/5 */
    const qs = Q(S, 3, 'The radius stays one', 0.8, 0.4) * fade;
    nePath(v, neCircle([0, 0, h / d], [1, 0, 0], [0, 1, 0], r / d), C.now, qs * 0.45, 1.6, { depth: true, far: 0.5, dash: [5, 7] });
    neDot3(v, P, 10, C.now, pa);
  }
  /* the panel: what was added, and what stayed */
  const x = NE.px, y = 225;
  nePanel(x, y, NE.pw, 330, ca, C.cyan, 'ONE MORE DIRECTION', '多一个方向');
  txt('a circle S¹ in a plane ℝ²', x + 30, y + 82, { size: 28, fam: NE_MATH, w: 700, c: C.cyan, a: ca });
  txt('+ one direction ±e₃', x + 30, y + 128, { size: 28, fam: NE_MATH, w: 700, c: C.vio, a: sa });
  const qe = Q(S, 2, 'its equator', 0.6) * fade;
  txt('S¹ = equator of S² ⊂ ℝ³', x + 30, y + 174, { size: 28, fam: NE_MATH, w: 700, c: C.cyan, a: qe });
  txt('one step up: S² = equator of S³ ⊂ ℝ⁴', x + 30, y + 214, { size: 22, fam: NE_MATH, w: 700, c: NE_LABEL, a: qe });
  neTwo('bigger = one more direction', '“更大” = 多一个方向，不是半径变长', x + 30, y + 266, C.white, Q(S, 3, 'bigger means', 0.6) * fade, 24);
  const qn = Q(S, 3, 'The radius stays one', 0.7) * fade, y2 = 580;
  nePanel(x, y2, NE.pw, 150, qn, C.cyan, 'CHECK', '核对');
  txt('height 3/5 → slice radius 4/5', x + 30, y2 + 78, { size: 27, fam: NE_MATH, w: 700, c: C.now, a: qn });
  txt('(3/5)² + (4/5)² = 9/25 + 16/25 = 1', x + 30, y2 + 124, { size: 27, fam: NE_MATH, w: 700, c: C.white, a: qn });
};

/* ======================================================================= */
/*  BLIND · one axis reads each direction by its cosine: the equator reads 0 */
/* ======================================================================= */
SCENES.blind = S => {
  const u = S.u, fade = clamp(u / 0.4) * clamp((S.d - u) / 0.5);
  neSeries(S);
  badgeQ(S, [[0, null, 'computed']]);
  const v = NE.ball;
  neSphere(v, fade);
  const qb = Q(S, 2, 'blind ring', 0.6) * fade, glow = Q(S, 2, 'The whole equator', 0.6);
  neEquator(v, fade, 3.4 + 2 * glow, glow);
  /* the axis o */
  neAxis(v, fade);
  neTag3(v, [0, 0, 1], 'axis o', C.vio, Q(S, 0, 'one axis', 0.5) * fade, 18, -12, 'left', 30);
  /* the amber direction: from the north pole down to 60° (line 0), then to the equator (line 2) */
  const th = (60 * ease(Q(S, 0, 'each direction', 1.6)) + 30 * ease(Q(S, 2, 'The whole equator', 1.4))) * NE_DEG;
  const pa = Q(S, 0, 'each direction', 0.5) * fade, P = neMer(th), c = Math.cos(th);
  if (pa > 0) {
    /* how far it points along o: drop the point onto the axis */
    const foot = [0, 0, c], qd = Q(S, 0, 'points along it', 0.6) * pa;
    nePath(v, [P, foot], C.now, qd * 0.8, 2, { dash: [6, 6] });
    neDot3(v, foot, 6, C.now, qd);
    const arc = []; for (let i = 0; i <= 24; i++) arc.push(neMer(th * i / 24).map(x => x * 0.3));
    nePath(v, arc, C.now, pa * 0.9, 2.4);
    nePath(v, [[0, 0, 0], P], C.now, pa, 3.4);
    neDot3(v, P, 10, C.now, pa);
    neTag3(v, neMer(th / 2).map(x => x * 0.42), `${Math.round(th / NE_DEG)}°`, C.now, pa * clamp((th / NE_DEG - 12) / 10), 6, 8, 'left', 26);
  }
  /* the poles' readings */
  const qp = Q(S, 1, 'The north pole reads one', 0.5) * fade, qs = Q(S, 1, 'the south pole', 0.5) * fade;
  neTag3(v, [0, 0, 1], '1', C.white, qp, -20, -8, 'right', 34);
  neTag3(v, [0, 0, -1], '−1', C.white, qs, -20, 26, 'right', 34);
  neTag3(v, [Math.cos(212 * NE_DEG), Math.sin(212 * NE_DEG), 0], '0 all round · 一整圈都是 0', C.cyan, glow * fade, -18, 30, 'right', 24, F.zh);
  /* the readout */
  const x = NE.px, y = 225, ra = Q(S, 0, 'each direction', 0.6) * fade;
  nePanel(x, y, NE.pw, 420, ra, C.cyan, 'READING', '读数');
  txt('reading = cos (angle to o)', x + 30, y + 82, { size: 28, fam: NE_MATH, w: 700, c: C.white, a: Q(S, 0, 'points along it', 0.6) * fade });
  txt(`cos ${Math.round(th / NE_DEG)}° = ${neFmt(c)}`, x + 30, y + 138, { size: 34, fam: NE_MATH, w: 700, c: C.now, a: pa });
  const shown = [Q(S, 1, 'The north pole', 0.5), Q(S, 0, 'its cosine', 0.5), Q(S, 2, 'The whole equator', 0.5), Q(S, 1, 'the south pole', 0.5)];
  NE_READ.forEach(([deg, val, name], i) => {
    const a = shown[i] * fade, yy = y + 206 + i * 52;
    txt(`${deg}°`, x + 40, yy, { size: 28, fam: NE_MATH, w: 700, c: C.white, a, align: 'left' });
    txt('→', x + 140, yy, { size: 28, fam: NE_MATH, w: 700, c: NE_LABEL, a });
    txt(val, x + 230, yy, { size: 30, fam: NE_MATH, w: 700, c: i === 2 ? C.cyan : C.white, a, align: 'right' });
    txt(name, x + 270, yy, { size: 20, fam: F.zh, w: 700, c: NE_LABEL, a });
  });
  neTwo('from this axis: a blind ring', '从这根轴看：一圈盲区', x + 10, y + 474, C.cyan, qb, 26);
};

/* ======================================================================= */
/*  AVERAGE · mix every direction equally: the mean falls to the centre     */
/* ======================================================================= */
SCENES.average = S => {
  const u = S.u, fade = clamp(u / 0.4) * clamp((S.d - u) / 0.5);
  neSeries(S);
  badgeQ(S, [[0, null, 'computed'], [4, 'checked by the Lean kernel', 'lean']]);
  const v = NE.ball;
  neSphere(v, fade * 0.8);
  neEquator(v, fade * 0.45, 2.4);
  /* the weights spread from all on +z (w = 0) to 1/6 each (w = 1) */
  const w0 = phraseAt(S, 0, 'give up'), w1 = phraseAt(S, 1, 'falls to the centre') + 0.4;
  const w = ease(clamp((u - w0) / (w1 - w0)));
  const ws = neWeights(w), m = neMean(w);
  const six = fade * (1 - Q(S, 3, 'Mixing only pulls inward', 0.7));
  if (six > 0) {
    const pair = Q(S, 1, 'cancel in pairs', 0.5) * (1 - Q(S, 2, 'There sits', 0.6));
    for (let i = 0; i < 6; i += 2) nePath(v, [NE_AXES[i], NE_AXES[i + 1]], C.white, six * pair * 0.5, 1.6, { dash: [5, 7] });
    const order = NE_AXES.map((d, i) => i).sort((a, b) => neP(v, NE_AXES[a]).d - neP(v, NE_AXES[b]).d);
    for (const i of order) {
      const wi = ws[i];
      neArrow(v, [0, 0, 0], NE_AXES[i], C.cyan, six * (0.3 + 0.7 * Math.sqrt(wi)), 1.6 + 5 * wi, 12 + 8 * Math.sqrt(wi));
      neTag3(v, NE_AXES[i].map(x => x * 1.13), NE_AXNAME[i], NE_LABEL, six * 0.9, 0, 9, 'center', 22);
    }
    const len = Math.hypot(m[0], m[1], m[2]);
    if (len > 0.01) { nePath(v, [[0, 0, 0], m.map(x => x * 0.9)], C.bg, six * 0.85, 12); neArrow(v, [0, 0, 0], m, C.now, six, 5, 20); }
    neDot3(v, m, 10, C.now, six);
    neTag3(v, m, 'average', C.now, six * Q(S, 1, 'the average', 0.5) * (1 - Q(S, 2, 'There sits', 0.5)), 18, 34, 'left', 24, F.disp);
    const qc = Q(S, 2, 'There sits', 0.6) * six;
    if (qc > 0) {
      const c = neP(v, [0, 0, 0]), pulse = (u - phraseAt(S, 2, 'There sits')) % 1.8 / 1.8;
      ring(c.x, c.y, 16 + 30 * pulse, C.now, qc * (1 - pulse) * 0.8, 2.4);
      neTag('ρ = ½ I', c.x + 22, c.y + 44, C.now, qc, 'left', 30);
    }
  }
  /* line 3: two directions 60° apart, mixed half and half: the mean lies inside the ball */
  const qt = Q(S, 3, 'Mixing only pulls inward', 0.7) * fade;
  if (qt > 0) {
    const g = ease(Q(S, 3, 'pulls inward', 1.4));
    neArrow(v, [0, 0, 0], NE_A, C.cyan, qt, 4.5, 18);
    neArrow(v, [0, 0, 0], NE_B, C.cyan, qt, 4.5, 18);
    neTag3(v, NE_A, 'a', C.cyan, qt, 14, -6, 'left', 28);
    neTag3(v, NE_B, 'b', C.cyan, qt, 14, 6, 'left', 28);
    const arc = []; for (let i = 0; i <= 20; i++) arc.push(neMer(60 * NE_DEG * i / 20).map(x => x * 0.32));
    nePath(v, arc, C.white, qt * 0.8, 2);
    neTag3(v, neMer(30 * NE_DEG).map(x => x * 0.4), '60°', C.white, qt, 6, 4, 'left', 22);
    nePath(v, [NE_A, NE_B], C.white, qt * 0.7, 1.8, { dash: [6, 6] });
    const M = NE_AB.map(x => x * g);
    if (g > 0.02) neArrow(v, [0, 0, 0], M, C.now, qt, 5, 20);
    neDot3(v, M, 9, C.now, qt * g);
    neTag3(v, NE_AB, '√3/2 ≈ 0.866', C.now, qt * clamp((g - 0.85) / 0.15), 20, 30, 'left', 26);
  }
  /* slot A: the weights, then the two-direction example */
  const x = NE.px, yA = 220, wa = Q(S, 0, 'give up', 0.6) * six;
  nePanel(x, yA, NE.pw, 270, wa, C.cyan, 'EQUAL MIX', '等量混合');
  NE_AXNAME.forEach((s, i) => {
    const col = i % 2, row = Math.floor(i / 2), xx = x + 30 + col * 270, yy = yA + 84 + row * 46;
    const val = w > 1 - 1e-9 ? '1/6' : neFmt(ws[i]);
    txt(`${s}  ${val}`, xx, yy, { size: 28, fam: NE_MATH, w: 700, c: C.cyan, a: wa });
  });
  txt(`average = (0, 0, ${w > 1 - 1e-9 ? '0' : neFmt(m[2])})`, x + 30, yA + 236, { size: 28, fam: NE_MATH, w: 700, c: C.now, a: wa });
  const ea = qt;
  nePanel(x, yA, NE.pw, 270, ea, C.cyan, 'TWO DIRECTIONS', '两个方向');
  txt('a, b at 60°, half and half', x + 30, yA + 84, { size: 26, fam: NE_MATH, w: 700, c: C.cyan, a: ea });
  txt('½ a + ½ b', x + 30, yA + 136, { size: 32, fam: NE_MATH, w: 700, c: C.now, a: ea });
  txt('length = cos 30° = √3/2', x + 30, yA + 188, { size: 28, fam: NE_MATH, w: 700, c: C.white, a: ea * Q(S, 3, 'never longer', 0.6) });
  txt('≈ 0.866 < 1', x + 30, yA + 236, { size: 28, fam: NE_MATH, w: 700, c: C.white, a: ea * Q(S, 3, 'never longer', 0.6) });
  /* slot B: the centre state, then the Lean bound */
  const yB = 515, mb = Q(S, 2, 'its matrix', 0.6) * fade * (1 - Q(S, 4, 'That bound', 0.5));
  nePanel(x, yB, NE.pw, 290, mb, C.cyan, 'THE CENTRE STATE', '球心的态');
  const h1 = 'ρ = ½', x1 = x + 30 + tw(h1, 30, NE_MATH, 700) + 12;
  txt(h1, x + 30, yB + 130, { size: 30, fam: NE_MATH, w: 700, c: C.white, a: mb });
  const xe = neMatrix(x1, yB + 110, [['1+z', 'x−iy'], ['x+iy', '1−z']], 100, 42, 26, C.white, mb);
  txt('the arrow', xe + 18, yB + 112, { size: 20, fam: NE_MATH, w: 700, c: NE_LABEL, a: mb });
  txt('(x, y, z)', xe + 18, yB + 140, { size: 20, fam: NE_MATH, w: 700, c: NE_LABEL, a: mb });
  const mz = mb * Q(S, 2, 'half the identity', 0.6);
  const h2 = '(0, 0, 0)  →  ρ = ½', x2 = x + 30 + tw(h2, 26, NE_MATH, 700) + 12;
  txt(h2, x + 30, yB + 245, { size: 26, fam: NE_MATH, w: 700, c: C.now, a: mz });
  const xr = neMatrix(x2, yB + 224, [['1', '0'], ['0', '1']], 40, 36, 24, C.now, mz);
  txt('= ½ I', xr + 14, yB + 245, { size: 26, fam: NE_MATH, w: 700, c: C.now, a: mz });
  const la = Q(S, 4, 'That bound', 0.6) * fade;
  if (la > 0) {
    panel(x, yB, NE.pw, 305, la, C.lean, 'LEAN ✓');
    const r = leanCite(NE_GID) || {}, gid = r.gid || NE_GID, dotAt = gid.lastIndexOf('.');
    txt(gid.slice(0, dotAt + 1), x + 22, yB + 62, { size: 16, fam: F.mono, w: 700, c: NE_LABEL, a: la });
    txt(gid.slice(dotAt + 1), x + 22, yB + 92, { size: 22, fam: F.mono, w: 700, c: C.lean, a: la });
    txt('M: 2 × 2 complex, positive semidefinite', x + 22, yB + 134, { size: 20, fam: NE_MATH, w: 700, c: NE_LABEL, a: la });
    txt('‖bloch M‖ ≤ Re tr M', x + 22, yB + 176, { size: 32, fam: NE_MATH, w: 700, c: C.white, a: la });
    txt('bloch M: the arrow (x, y, z) of M', x + 22, yB + 210, { size: 20, fam: NE_MATH, w: 700, c: NE_LABEL, a: la });
    txt('a state ρ:  ‖bloch ρ‖ ≤ tr ρ = 1', x + 22, yB + 252, { size: 26, fam: NE_MATH, w: 700, c: C.lean, a: la });
    txt('态的箭头长度不超过 1', x + 22, yB + 286, { size: 24, fam: F.zh, w: 700, c: C.lean, a: la * 0.92 });
  }
};

/* ======================================================================= */
/*  RECAP · three takeaways, the analogy, the next film                     */
/* ======================================================================= */
/* the small pictures of the takeaways, centred at (x, y) */
function neIcon(i, x, y, a) {
  if (a <= 0.003) return;
  const v = { cx: x, cy: y + 8, R: 46, az: 32 * NE_DEG, el: 22 * NE_DEG };
  if (i === 0) {
    const s = 0.8;
    nePoly(v, [[-s, -s, 0], [s, -s, 0], [s, s, 0], [-s, s, 0]], C.mag, 0.18 * a, C.mag, a, 2);
    neArrow(v, [0, 0, 0], [0, 0, 1.05], C.vio, a, 3.5, 12);
  } else if (i === 1) {
    ring(x, y + 8, 46, NE_WIRE, a * 0.7, 1.6);
    nePath(v, neCircle([0, 0, 0], [1, 0, 0], [0, 1, 0], 1), C.cyan, a, 2.6, { depth: true, far: 0.5 });
    nePath(v, [[0, 0, -1.15], [0, 0, 1.15]], C.vio, a, 2);
  } else {
    ring(x, y + 8, 46, NE_WIRE, a * 0.7, 1.6);
    NE_AXES.forEach(d => neArrow(v, [0, 0, 0], d.map(c => c * 0.8), C.cyan, a * 0.8, 2, 8));
    neDot3(v, [0, 0, 0], 6, C.now, a);
  }
}
const NE_TAKE = [
  ['To name a whole, you need one more direction.', '要把整体指认出来，需要多一个方向。'],
  ['The old sphere becomes the equator of a new one; the radius stays 1.', '旧球成为新球的赤道；半径仍是 1。'],
  ['Averaging every direction lands at the centre: ρ = I/2.', '把所有方向平均，落回球心：ρ = I/2。']
];
SCENES.recap = S => {
  const u = S.u, fade = clamp(u / 0.4) * clamp((S.d - u) / 0.5);
  neSeries(S);
  const L4 = lineAt(S, 4), out = 1 - clamp((u - L4.e - 0.1) / 0.6);
  badge(Q(S, 3, 'an echo of Gödel', 0.5) * (1 - Q(S, 4, 'Next in the prelude', 0.4)) * fade * out, 'argued');
  const a0 = fade * out;
  if (a0 > 0) {
    neTag('RECAP ·', 250, 222, NE_LABEL, a0 * clamp(u / 0.6), 'left', 20, F.mono);
    txt('回顾', 250 + tw('RECAP · ', 20, F.mono, 700, 2), 223, { size: 21, fam: F.zh, w: 700, c: NE_LABEL, a: a0 * clamp(u / 0.6) });
    NE_TAKE.forEach(([en, zh], i) => {
      const q = at(S, i, 0.6) * a0;
      if (q <= 0) return;
      const cur = i === 2 ? u < lineAt(S, 3).s : u < lineAt(S, i + 1).s;
      const y = 300 + i * 120;
      neIcon(i, 310, y, q);
      box(392, y - 46, 44, 44, cur ? C.now : NE_LABEL, q, 2);
      txt(String(i + 1), 414, y - 13, { size: 26, fam: F.mono, w: 700, align: 'center', c: cur ? C.now : NE_LABEL, a: q });
      txt(en, 470, y - 12, { size: 34, fam: F.disp, w: 600, c: C.white, a: q * (cur ? 1 : 0.78) });
      txt(zh, 470, y + 36, { size: 30, fam: F.zh, w: 700, c: C.white, a: q * (cur ? 0.95 : 0.7) });
    });
    const qa = Q(S, 3, 'an echo of Gödel', 0.6) * a0, y = 668;
    if (qa > 0) {
      nePanel(250, y - 54, 1420, 118, qa, C.argued, "ARGUED · THE BOOK'S ANALOGY", '本书的类比');
      txt('the echo of Gödel: an analogy; its exact diagonal theorems come in Chapter 21', 280, y + 20, { size: 27, fam: F.disp, w: 600, c: C.argued, a: qa });
      txt('哥德尔的回声：类比；严格的对角线定理见第 21 章', 280, y + 52, { size: 24, fam: F.zh, w: 700, c: C.argued, a: qa * 0.92 });
    }
    const qn = Q(S, 4, 'Next in the prelude', 0.6) * a0;
    chip(W / 2, 776, 900, 56, 'NEXT · 下一部：a ruler that measures itself · 量自己的尺子', C.cyan, qn, 24, F.zh);
  }
  closingCard(S, { from: L4.e + 0.6, y: 330, hyper: false });
};

/* ======================================================================= */
/*                      checks of everything drawn                          */
/* ======================================================================= */
FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const check = (ok, msg) => { if (!ok && bad++ < 12) E.push('prelude-normal-escape: ' + msg); };
  const tol = 1e-9, near = (x, y) => Math.abs(x - y) < tol;
  const dot = (p, q) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2];
  const cross = (p, q) => [p[1] * q[2] - p[2] * q[1], p[2] * q[0] - p[0] * q[2], p[0] * q[1] - p[1] * q[0]];
  /* the one Lean citation: a theorem, and the only one */
  const lean = DATA.lean || [];
  check(lean.length === 1 && lean[0].gid === NE_GID && lean[0].kind === 'theorem', 'film.json must cite exactly the theorem ' + NE_GID);
  check(!!leanCite(NE_GID), 'leanCite does not find the cited theorem');
  /* NORMAL: e₃ = e₁ × e₂ = (0, 0, 1), at right angles to e₁ and e₂; every arrow left in the sheet has no e₃ part */
  const e1 = [1, 0, 0], e2 = [0, 1, 0], e3 = cross(e1, e2);
  check(e3[0] === 0 && e3[1] === 0 && e3[2] === 1, 'e₁ × e₂ is not (0, 0, 1)');
  check(dot(e3, e1) === 0 && dot(e3, e2) === 0, 'e₃ is not at right angles to e₁ and e₂');
  NE_ARROWS.forEach(([deg, len]) => {
    const t = deg * NE_DEG, p = [len * Math.cos(t), len * Math.sin(t), 0];
    check(Math.abs(dot(p, e3)) < tol, `the arrow at ${deg}° leaves the sheet`);
    check(Math.abs(p[0]) < NE.patch && Math.abs(p[1]) < NE.patch, `the arrow at ${deg}° leaves the patch`);
  });
  check(near(NE_ARROWS[0][0], 0) && near(NE_ARROWS[1][0], 90), 'the first two arrows are not e₁ and e₂');
  /* BEYOND: ⋆₃I₃ = det[e₁ e₂ e₃] = 1, a scalar */
  check(dot(cross(e1, e2), e3) === 1, '⋆₃ I₃ = det[e₁ e₂ e₃] is not 1');
  /* BEYOND: height 3/5, slice radius 4/5: 9 + 16 = 25, and the drawn point sits at distance 1 and height 0.6 */
  const [h, r, d] = NE.lift;
  check(h * h + r * r === d * d && h === 3 && r === 4 && d === 5, 'the lift is not the 3-4-5 triangle');
  const P = neMer(Math.PI / 2 - Math.asin(h / d));
  check(near(Math.hypot(P[0], P[1], P[2]), 1) && near(P[2], 0.6) && near(Math.hypot(P[0], P[1]), 0.8), 'the lifted point is not at height 3/5 on the unit sphere');
  check(9 / 25 + 16 / 25 === 1, '9/25 + 16/25 ≠ 1');
  /* the equator and every point of the meridian lie on the unit sphere; orthographic views keep them inside the outline */
  for (let k = 0; k <= 72; k++) {
    const t = k * 5 * NE_DEG, q = [Math.cos(t), Math.sin(t), 0], m = neMer(t / 2);
    check(near(Math.hypot(...q), 1) && near(Math.hypot(...m), 1), 'a drawn point is off the unit sphere');
    for (const v of [NE.ball, NE.face, NE.room]) {
      const p = neP(v, q), dr = Math.hypot(p.x - v.cx, p.y - v.cy) / v.R;
      check(Math.abs(dr * dr + p.d * p.d - 1) < 1e-9, 'the projection is not orthographic');
    }
  }
  /* the projection is right-handed: e₁, e₂, e₃ on screen (right, up, towards the viewer) have determinant +1 */
  for (const v of [NE.ball, NE.room]) {
    const s = p => { const q = neP(v, p); return [(q.x - v.cx) / v.R, (v.cy - q.y) / v.R, q.d]; };
    check(near(dot(cross(s(e1), s(e2)), s(e3)), 1), 'the view is not a rotation');
  }
  check(neP(NE.face, e2).y < NE.face.cy && near(neP(NE.face, e1).y, NE.face.cy) && neP(NE.face, e3).d > 0, 'the face-on view does not show e₁ right, e₂ up, e₃ towards us');
  check(neP(NE.ball, neMer(Math.PI / 2)).d > 0, 'the meridian of the amber point is on the far side');
  /* BLIND: the readings printed: cos 0° = 1, cos 60° = ½, cos 90° = 0, cos 180° = −1 */
  const val = { '1': 1, '½': 0.5, '0': 0, '−1': -1 };
  NE_READ.forEach(([deg, s]) => check(Math.abs(Math.cos(deg * NE_DEG) - val[s]) < 1e-12, `cos ${deg}° is not ${s}`));
  check(neFmt(Math.cos(60 * NE_DEG)) === '0.50' && neFmt(Math.cos(90 * NE_DEG)) === '0.00' && neFmt(Math.cos(0)) === '1.00', 'the live cosine readout misprints');
  /* AVERAGE: the six directions cancel; 1/6 each sums to 1; the mean of the spreading weights is (0, 0, 1 − w) */
  const sum = NE_AXES.reduce((s, q) => [s[0] + q[0], s[1] + q[1], s[2] + q[2]], [0, 0, 0]);
  check(sum[0] === 0 && sum[1] === 0 && sum[2] === 0, 'the six directions do not cancel');
  for (let k = 0; k <= 20; k++) {
    const w = k / 20, ws = neWeights(w), m = neMean(w);
    check(near(ws.reduce((s, x) => s + x, 0), 1) && ws.every(x => x >= 0), `the weights at w = ${w} are not a mixture`);
    check(near(m[0], 0) && near(m[1], 0) && near(m[2], 1 - w), `the mean at w = ${w} is not (0, 0, 1 − w)`);
  }
  check(neWeights(1).every(x => near(x, 1 / 6)), 'the final weights are not 1/6');
  /* AVERAGE: ρ = ½[[1+z, x−iy], [x+iy, 1−z]] is the inverse of the Lean bloch: bloch(blochMatrix 1 r) = r */
  const rho0 = neBlochMatrix(1, [0, 0, 0]);
  check(rho0[0][0][0] === 0.5 && rho0[1][1][0] === 0.5 && rho0[0][1][0] === 0 && rho0[1][0][0] === 0 && rho0[0][1][1] === 0 && rho0[1][0][1] === 0, 'ρ at the centre is not ½I');
  check(near(rho0[0][0][0] + rho0[1][1][0], 1), 'tr ρ at the centre is not 1');
  for (const rv of [[0, 0, 0], NE_AB, [0.3, -0.4, 0.5], NE_B]) {
    const b = neBloch(neBlochMatrix(1, rv));
    check(near(b[0], rv[0]) && near(b[1], rv[1]) && near(b[2], rv[2]), 'bloch (blochMatrix 1 r) ≠ r');
    /* the matrix on screen, entry by entry, against the formula ½[[1+z, x−iy], [x+iy, 1−z]] */
    const M = neBlochMatrix(1, rv);
    check(near(M[0][0][0], (1 + rv[2]) / 2) && near(M[0][1][0], rv[0] / 2) && near(M[0][1][1], -rv[1] / 2) &&
      near(M[1][0][0], rv[0] / 2) && near(M[1][0][1], rv[1] / 2) && near(M[1][1][0], (1 - rv[2]) / 2), 'the matrix formula on screen is wrong');
    /* tr = 1 and det = (1 − |r|²)/4 ≥ 0 for these arrows of length ≤ 1: the Lean bound holds on the examples */
    const det = M[0][0][0] * M[1][1][0] - (M[0][1][0] * M[1][0][0] - M[0][1][1] * M[1][0][1]);
    check(near(det, (1 - dot(rv, rv)) / 4) && det >= -tol, 'det ρ ≠ (1 − |r|²)/4');
  }
  /* AVERAGE: two directions 60° apart, half and half: length √3/2 = cos 30° ≈ 0.866 < 1 */
  check(near(Math.hypot(...NE_B), 1) && near(dot(NE_A, NE_B), 0.5), 'a and b are not unit arrows 60° apart');
  const L = Math.hypot(...NE_AB);
  check(near(L * L, 3 / 4) && near(L, Math.sqrt(3) / 2) && near(L, Math.cos(30 * NE_DEG)) && L.toFixed(3) === '0.866' && L < 1, 'the half-and-half mean is not √3/2 ≈ 0.866');
  check(near(dot(NE_AB, NE_AB), 3 / 16 + 9 / 16), 'the half-and-half mean is not (√3/4, ·, 3/4)');
});
Object.assign(FILM.speed, { sheet: 0.008, normal: 0.01, beyond: 0.012, blind: 0.012, average: 0.014, recap: 0.02 });

/* ---------- poster: the sheet inside the equator, its normal, and the lifted point ---------- */
FILM.poster = () => {
  const t = 60, si = 2;
  background(t, TL.scenes[si], si, 4);
  const v = { cx: 600, cy: 520, R: 270, az: 32 * NE_DEG, el: 20 * NE_DEG };
  neSphere(v, 1);
  const s = 0.62;
  nePoly(v, [[-s, -s, 0], [s, -s, 0], [s, s, 0], [-s, s, 0]], C.mag, 0.16, C.mag, 0.95, 2.6);
  neEquator(v, 1, 3.6, 0.6);
  nePath(v, [[0, 0, -1.15], [0, 0, 0]], C.vio, 0.8, 2.6);
  neArrow(v, [0, 0, 0], [0, 0, 1], C.vio, 1, 6, 24);
  neDot3(v, [0, 0, -1], 8, C.vio, 1);
  neArrow(v, [0, 0, 0], [0.6, 0, 0], C.cyan, 1, 4, 16);
  neArrow(v, [0, 0, 0], [0, 0.6, 0], C.cyan, 1, 4, 16);
  const P = neMer(Math.PI / 2 - Math.asin(0.6));
  const arc = []; for (let i = 0; i <= 30; i++) arc.push(neMer(Math.PI / 2 - Math.asin(0.6) * i / 30));
  nePath(v, arc, C.now, 0.85, 2.6);
  neDot3(v, P, 11, C.now, 1);
  neTag3(v, [0, 0, 1], 'e₃ = ⋆₃(e₁∧e₂)', C.vio, 1, 18, 4, 'left', 28);
  neTag3(v, [-0.42, 0.15, 0], 'e₁∧e₂', C.mag, 1, 0, 10, 'center', 28);
  const tx = 1340;
  txt('法线从外面来', tx, 400, { size: 104, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('球外之球', tx, 510, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 3 });
  bloom(0.55);
  txt('THE NORMAL COMES FROM OUTSIDE', tx, 610, { size: 38, fam: F.orb, w: 900, align: 'center', c: C.white, ls: 4, ab: 2 });
  txt('A SPHERE BEYOND THE SPHERE', tx, 664, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.cyan, ls: 4 });
  txt(`${DATA.book.code} · FILM · PRELUDE 4/5`, tx, 770, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 6 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, tx, 820, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * FPS), si, TL.scenes[si]);
  post(3);
};
